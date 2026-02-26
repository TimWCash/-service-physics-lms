'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { PracticeSection, PracticeFormField, TableColumn } from '@/data/courseDataV3'
import { AuthService } from '@/lib/auth'

interface Props {
  sections: PracticeSection[]
  activityId: string
}

interface TableRow {
  [columnId: string]: string | number
}

interface WorksheetData {
  [fieldId: string]: string | number | TableRow[]
}

export default function PracticeWorksheet({ sections, activityId }: Props) {
  const [data, setData] = useState<WorksheetData>({})
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load saved data on mount
  useEffect(() => {
    const savedData = AuthService.getAnswers(activityId)
    if (savedData && Object.keys(savedData).length > 0) {
      setData(savedData as WorksheetData)
    } else {
      // Initialize with default values
      const initialData: WorksheetData = {}
      sections.forEach(section => {
        section.fields.forEach(field => {
          if (field.type === 'table') {
            // Initialize with minimum rows
            const minRows = field.minRows || 3
            const rows: TableRow[] = []
            for (let i = 0; i < minRows; i++) {
              const row: TableRow = {}
              field.columns?.forEach(col => {
                row[col.id] = col.type === 'number' ? 0 : ''
              })
              rows.push(row)
            }
            initialData[field.id] = rows
          } else if (field.type === 'number') {
            initialData[field.id] = 0
          } else {
            initialData[field.id] = ''
          }
        })
      })
      setData(initialData)
    }
  }, [activityId, sections])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current)
    }
  }, [])

  const saveData = useCallback((newData: WorksheetData) => {
    setSaveStatus('saving')
    AuthService.saveAnswers(activityId, newData)
    setSaveStatus('saved')
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current)
    statusTimeoutRef.current = setTimeout(() => setSaveStatus('idle'), 2000)
  }, [activityId])

  const handleFieldChange = (fieldId: string, value: string | number | TableRow[]) => {
    const newData = { ...data, [fieldId]: value }
    setData(newData)

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => saveData(newData), 500)
  }

  const handleTableRowChange = (fieldId: string, rowIndex: number, columnId: string, value: string | number) => {
    const tableData = (data[fieldId] as TableRow[]) || []
    const newTableData = [...tableData]
    if (!newTableData[rowIndex]) {
      newTableData[rowIndex] = {}
    }
    newTableData[rowIndex] = { ...newTableData[rowIndex], [columnId]: value }
    handleFieldChange(fieldId, newTableData)
  }

  const addTableRow = (field: PracticeFormField) => {
    const tableData = (data[field.id] as TableRow[]) || []
    if (field.maxRows && tableData.length >= field.maxRows) return

    const newRow: TableRow = {}
    field.columns?.forEach(col => {
      newRow[col.id] = col.type === 'number' ? 0 : ''
    })
    handleFieldChange(field.id, [...tableData, newRow])
  }

  const removeTableRow = (fieldId: string, rowIndex: number, minRows: number) => {
    const tableData = (data[fieldId] as TableRow[]) || []
    if (tableData.length <= minRows) return
    const newTableData = tableData.filter((_, i) => i !== rowIndex)
    handleFieldChange(fieldId, newTableData)
  }

  const renderField = (field: PracticeFormField) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={(data[field.id] as string) || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none"
          />
        )

      case 'textarea':
        return (
          <textarea
            value={(data[field.id] as string) || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none resize-y"
          />
        )

      case 'number':
        return (
          <input
            type="number"
            value={(data[field.id] as number) || 0}
            onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || 0)}
            placeholder={field.placeholder}
            className="w-32 p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none"
          />
        )

      case 'select':
        return (
          <select
            value={(data[field.id] as string) || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full p-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none bg-white"
          >
            <option value="">Select...</option>
            {field.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )

      case 'table':
        return renderTable(field)

      case 'upload':
        return (
          <div className="border-2 border-dashed border-surface-200 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
            <svg className="w-12 h-12 mx-auto text-surface-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-surface-600 mb-2">Drag & drop your image here, or click to browse</p>
            <p className="text-sm text-surface-500">{field.helpText || 'PNG, JPG up to 5MB'}</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`upload-${field.id}`}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // For now, store the filename - can be enhanced with actual upload
                  handleFieldChange(field.id, file.name)
                }
              }}
            />
            <label
              htmlFor={`upload-${field.id}`}
              className="inline-block mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700 transition-colors"
            >
              Choose File
            </label>
            {data[field.id] && (
              <p className="mt-2 text-sm text-primary-600">Selected: {data[field.id] as string}</p>
            )}
          </div>
        )

      case 'timing-scale':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={(data[field.id] as number) || field.scaleMin || 0}
                onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || 0)}
                min={field.scaleMin}
                max={field.scaleMax}
                className="w-24 p-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none text-center"
              />
              <span className="text-surface-600">{field.scaleUnit || 'sec'}</span>
            </div>
            <div className="relative pt-1">
              <div className="flex justify-between text-xs text-surface-500 mb-1">
                <span>{field.scaleMin || 0}{field.scaleUnit}</span>
                <span>{field.scaleMax || 600}{field.scaleUnit}</span>
              </div>
              <input
                type="range"
                min={field.scaleMin || 0}
                max={field.scaleMax || 600}
                value={(data[field.id] as number) || field.scaleMin || 0}
                onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderTable = (field: PracticeFormField) => {
    const tableData = (data[field.id] as TableRow[]) || []
    const columns = field.columns || []
    const minRows = field.minRows || 3

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-600 text-white">
              <th className="p-3 text-left font-semibold w-12">#</th>
              {columns.map(col => (
                <th key={col.id} className="p-3 text-left font-semibold" style={{ width: col.width }}>
                  {col.header}
                </th>
              ))}
              <th className="p-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-surface-50' : 'bg-white'}>
                <td className="p-2 border border-surface-200 text-center text-surface-500 font-medium">
                  {rowIndex + 1}
                </td>
                {columns.map(col => (
                  <td key={col.id} className="p-2 border border-surface-200">
                    {col.type === 'select' ? (
                      <select
                        value={(row[col.id] as string) || ''}
                        onChange={(e) => handleTableRowChange(field.id, rowIndex, col.id, e.target.value)}
                        className="w-full p-2 border border-surface-200 rounded focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none bg-white"
                      >
                        <option value="">Select...</option>
                        {col.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : col.type === 'number' ? (
                      <input
                        type="number"
                        value={(row[col.id] as number) || ''}
                        onChange={(e) => handleTableRowChange(field.id, rowIndex, col.id, parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border border-surface-200 rounded focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none text-center"
                      />
                    ) : (
                      <input
                        type="text"
                        value={(row[col.id] as string) || ''}
                        onChange={(e) => handleTableRowChange(field.id, rowIndex, col.id, e.target.value)}
                        placeholder="Enter text..."
                        className="w-full p-2 border border-surface-200 rounded focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none"
                      />
                    )}
                  </td>
                ))}
                <td className="p-2 border border-surface-200 text-center">
                  {tableData.length > minRows && (
                    <button
                      onClick={() => removeTableRow(field.id, rowIndex, minRows)}
                      className="text-danger-500 hover:text-danger-700 transition-colors"
                      title="Remove row"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => addTableRow(field)}
          disabled={field.maxRows ? tableData.length >= field.maxRows : false}
          className="mt-3 flex items-center gap-2 px-4 py-2 text-primary-600 border border-primary-500 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Row
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Save Status Indicator */}
      <div className="flex justify-end">
        {saveStatus === 'saved' && (
          <span className="text-sm text-success-700 flex items-center gap-1 bg-success-50 px-3 py-1 rounded-full font-sans">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Progress Saved
          </span>
        )}
        {saveStatus === 'saving' && (
          <span className="text-sm text-surface-600 bg-surface-50 px-3 py-1 rounded-full">Saving...</span>
        )}
      </div>

      {/* Render each section */}
      {sections.map((section) => (
        <div key={section.id} className="bg-white rounded-lg border border-surface-200 overflow-hidden">
          <div className="bg-primary-700 px-6 py-4">
            <h3 className="text-xl font-display text-white">{section.title}</h3>
            {section.description && (
              <p className="text-primary-200 text-sm mt-1 font-sans">{section.description}</p>
            )}
          </div>
          <div className="p-6 space-y-6">
            {section.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block font-semibold text-surface-700 font-sans text-sm">
                  {field.label}
                  {field.required && <span className="text-danger-500 ml-1">*</span>}
                </label>
                {field.helpText && (
                  <p className="text-sm text-surface-500 mb-2">{field.helpText}</p>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Completion Note */}
      <div className="bg-accent-50 border-l-4 border-accent-400 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <div>
            <h4 className="font-display text-accent-900">Next Steps</h4>
            <p className="text-accent-800 text-sm font-sans">
              Once you&apos;ve completed this worksheet, schedule time with your principal to review your process improvement and discuss what you learned.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
