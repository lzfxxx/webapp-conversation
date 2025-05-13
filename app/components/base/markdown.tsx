import React, { useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import 'katex/dist/katex.min.css'
import RemarkMath from 'remark-math'
import RemarkBreaks from 'remark-breaks'
import RehypeKatex from 'rehype-katex'
import RemarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierHeathLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// 用 iframe 实现 HTML 预览，支持 tailwind 和外部资源
function HtmlPreviewWithIframe({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe) {
      const setHeight = () => {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document
          if (doc) {
            iframe.style.height = (doc.body.scrollHeight + 40) + 'px'
          }
        } catch (e) {
          // 跨域无法访问
        }
      }
      iframe.onload = setHeight
      // 兼容部分浏览器 srcDoc 立即加载
      setTimeout(setHeight, 100)
    }
  }, [html])

  const handleOpenNewTab = () => {
    const newWindow = window.open()
    if (newWindow) {
      newWindow.document.write(html)
      newWindow.document.close()
    }
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
        <button onClick={handleOpenNewTab} style={{ padding: '4px 12px', borderRadius: 4, background: '#00b96b', color: '#fff', border: 'none', fontSize: 12, cursor: 'pointer' }}>
          新页面打开
        </button>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        style={{
          width: '100%',
          border: '1px solid #eee',
          borderRadius: 4,
          background: '#fafbfc',
          minHeight: 600,
        }}
        sandbox="allow-scripts allow-same-origin"
        title="HTML 预览"
      />
    </div>
  )
}

export function Markdown(props: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          RehypeKatex,
        ]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            // 用 iframe 预览 html，不展示代码
            if (!inline && match && match[1] === 'html') {
              const codeString = String(children).replace(/\n$/, '')
              return (
                <div>
                  {/*
                  <SyntaxHighlighter
                    {...props}
                    children={codeString}
                    style={atelierHeathLight}
                    language="html"
                    showLineNumbers
                    PreTag="div"
                  />
                  */}
                  <div style={{ marginTop: 8, border: '1px solid #eee', borderRadius: 4, padding: 8, background: '#fafbfc' }}>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>HTML 预览：</div>
                    <HtmlPreviewWithIframe html={codeString} />
                  </div>
                </div>
              )
            }
            return (!inline && match)
              ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={atelierHeathLight}
                  language={match[1]}
                  showLineNumbers
                  PreTag="div"
                />
              )
              : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
          },
        }}
        linkTarget={'_blank'}
      >
        {props.content}
      </ReactMarkdown>
    </div>
  )
}
