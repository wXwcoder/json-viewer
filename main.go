package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os/exec"
	"runtime"

	"github.com/gin-gonic/gin"
)

//go:embed dist/*
var embeddedFS embed.FS

func main() {
	// 设置Gin模式
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// 从嵌入的文件系统中获取dist子目录
	fsys, err := fs.Sub(embeddedFS, "dist")
	if err != nil {
		log.Fatal("无法访问嵌入的dist目录:", err)
	}

	// 设置静态文件服务
	r.StaticFS("/", http.FS(fsys))

	// 处理所有路由到index.html（用于SPA路由）
	r.NoRoute(func(c *gin.Context) {
		file, err := fsys.Open("index.html")
		if err != nil {
			c.String(http.StatusNotFound, "页面未找到")
			return
		}
		defer file.Close()

		c.DataFromReader(http.StatusOK, -1, "text/html", file, nil)
	})

	// 启动服务器
	port := "8080"
	log.Printf("JSON Viewer 服务启动在 http://localhost:%s", port)
	log.Printf("使用嵌入的静态文件")

	// 自动打开浏览器
	openBrowser("http://localhost:" + port)

	if err := r.Run(":" + port); err != nil {
		log.Fatal("服务器启动失败:", err)
	}
}

// openBrowser 自动打开浏览器
func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("cmd", "/c", "start", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default: // linux, freebsd, etc.
		cmd = exec.Command("xdg-open", url)
	}

	if err := cmd.Start(); err != nil {
		log.Printf("无法自动打开浏览器: %v", err)
	} else {
		log.Printf("已自动打开浏览器访问: %s", url)
	}
}
