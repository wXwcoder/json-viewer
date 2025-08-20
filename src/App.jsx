import React, { useState } from 'react'
import JsonViewer from './components/JsonViewer'
import DataInputModal from './components/DataInputModal'

function App() {
  const [jsonData, setJsonData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const removeEscapes = (str) => {
    // 移除开头和结尾的引号（如果存在）
    let cleaned = str.trim()
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = cleaned.slice(1, -1)
    }
    return cleaned.replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  }

  const handleDataSubmit = (data) => {
    try {
      const cleanedData = removeEscapes(data)
      const parsedData = JSON.parse(cleanedData)
      setJsonData(parsedData)
      setIsModalOpen(false)
    } catch (error) {
      alert('无效的JSON格式')
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('全屏请求失败:', err)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return (
    <div className={`app ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="controls">
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          输入JSON数据
        </button>
        <button 
          className="btn btn-secondary"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? '退出全屏' : '全屏显示'}
        </button>
      </div>

      <div className="json-container">
        {jsonData ? (
          <JsonViewer data={jsonData} />
        ) : (
          <div className="placeholder">
            <p>请点击"输入JSON数据"按钮来输入JSON数据</p>
          </div>
        )}
      </div>

      <DataInputModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDataSubmit}
      />
    </div>
  )
}

export default App