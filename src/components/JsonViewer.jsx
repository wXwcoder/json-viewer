import React, { useState } from 'react'

function JsonViewer({ data, depth = 0 }) {
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (key) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const renderValue = (value, key) => {
    if (value === null) {
      return <span className="json-null">null</span>
    }
    
    if (typeof value === 'boolean') {
      return <span className="json-boolean">{value.toString()}</span>
    }
    
    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>
    }
    
    if (typeof value === 'string') {
      return <span className="json-string">"{value}"</span>
    }
    
    if (Array.isArray(value)) {
      const isExpanded = expanded[key]
      return (
        <div className="json-array">
          <span 
            className="toggle" 
            onClick={() => toggleExpand(key)}
          >
            [{isExpanded ? '−' : '+'}]
          </span>
          [
          {isExpanded ? (
            <div className="nested">
              {value.map((item, index) => (
                <div key={index} className="array-item">
                  <JsonViewer data={item} depth={depth + 1} />
                  {index < value.length - 1 && ','}
                </div>
              ))}
            </div>
          ) : value.length > 0 ? '...' : ''}
          ]
        </div>
      )
    }
    
    if (typeof value === 'object') {
      const isExpanded = expanded[key]
      const keys = Object.keys(value)
      return (
        <div className="json-object">
          <span 
            className="toggle" 
            onClick={() => toggleExpand(key)}
          >
            {isExpanded ? '−' : '+'}
          </span>
          {isExpanded ? (
            <div className="nested">
              {keys.map((k, index) => (
                <div key={k} className="object-item">
                  <span className="json-key">"{k}"</span>: 
                  <JsonViewer data={value[k]} depth={depth + 1} />
                  {index < keys.length - 1 && ','}
                </div>
              ))}
            </div>
          ) : keys.length > 0 ? '...' : ''}
        </div>
      )
    }
  }

  if (data === null || typeof data !== 'object') {
    return renderValue(data, 'root')
  }

  return (
    <div className="json-viewer">
      {renderValue(data, 'root')}
    </div>
  )
}

export default JsonViewer