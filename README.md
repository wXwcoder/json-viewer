# JSON Viewer

一个基于React的JSON查看器，支持全屏显示、嵌套结构展开/折叠功能。

## 功能特性

- 📝 通过模态框输入JSON数据
- 🖥️ 支持全屏显示模式
- 🔄 JSON嵌套结构展开/折叠
- 🎨 语法高亮显示
- 📱 响应式设计
- 📦 静态文件嵌入可执行文件（无需外部dist目录）
- 🌐 自动打开浏览器访问应用

## 安装依赖

```bash
npm install
```

## 开发模式

```bash
npm run dev
```

## 构建项目

```bash
npm run build
```

## 使用Golang Gin框架部署

### 基于Gin框架的跨平台部署

除了批处理文件方式，我们还提供了基于Gin框架的Go语言部署方案，可以生成真正的跨平台可执行文件。

### 前提条件

- 安装 [Go](https://golang.org/dl/) (版本1.16+)
- 安装 Node.js 和 npm

### 构建可执行文件

#### 构建当前平台的可执行文件
```bash
npm run build-executable
```

#### 构建Windows可执行文件
```bash
npm run build-windows
```

#### 构建Linux可执行文件
```bash
npm run build-linux
```

#### 构建macOS可执行文件
```bash
npm run build-macos
```

### 生成的文件

构建完成后会根据不同平台生成相应的可执行文件：

- **Windows**: `JsonViewer.bat` - 批处理文件
- **Linux**: `JsonViewer` - Shell脚本
- **macOS**: `JsonViewer` - Shell脚本

### 使用Gin框架部署

1. 首先构建React项目：
```bash
npm run build
```

2. 安装Gin依赖：
```bash
go mod init json-viewer
go get github.com/gin-gonic/gin
```

3. 运行Go程序：
```bash
go run main.go
```

4. 访问应用：
应用启动后会自动打开浏览器访问 `http://localhost:8080`

### 嵌入静态文件功能

项目现在支持使用Go 1.16+的embed功能将静态文件直接嵌入可执行文件中：

- 无需外部`dist`目录，所有静态资源都包含在单一可执行文件中
- 使用`//go:embed dist/*`指令嵌入构建后的静态文件
- 支持跨平台自动打开浏览器功能（Windows、macOS、Linux）
- 部署更加简单，只需分发单个可执行文件

### 构建跨平台可执行文件

#### Windows:
```bash
go build -o JsonViewer.exe
```

#### Linux:
```bash
GOOS=linux GOARCH=amd64 go build -o JsonViewer
```

#### macOS:
```bash
GOOS=darwin GOARCH=amd64 go build -o JsonViewer
```

### 技术说明

- 使用Gin框架提供静态文件服务
- 使用Go 1.16+的embed功能将静态文件嵌入可执行文件
- 自动处理SPA路由（所有路由重定向到index.html）
- 支持真正的跨平台可执行文件
- 内置端口8080，可通过修改main.go更改
- 自动打开浏览器访问应用（支持Windows、macOS、Linux）
- 自动检测操作系统类型
- 生成平台特定的启动脚本
- 支持跨平台构建## 项目结构

```
jsonview/
├── src/
│   ├── components/
│   │   ├── DataInputModal.jsx
│   │   └── JsonViewer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── package.json
├── vite.config.js
└── index.html
```

## 许可证

MIT License
