---
title: 'Vue写一个Markdown编辑器' 
date: 2019-01-02 2:30:09
hidden: true
slug: l0ed1wg2nj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010899903" src="https://static.alili.tech/img/remote/1460000010899903" alt="vm-markdown" title="vm-markdown" style="cursor: pointer; display: inline;"></span></p>
<p>这是最近用Vue写的一个Markeddown编辑器, 主要目的是扩展<a href="https://github.com/luosijie/vue-manager" rel="nofollow noreferrer" target="_blank">Vue-Manager</a>的编辑器功能。核心功能引入了<a href="https://github.com/chjj/marked" rel="nofollow noreferrer" target="_blank">Marked</a>插件,将Markedown文档解析为html。样式基本沿用了<a href="https://github.com/luosijie/vm-editor" rel="nofollow noreferrer" target="_blank">vm-editor</a>，并增加了多种主题选择的功能。</p>
<p>项目已经打包上传到<a href="https://www.npmjs.com/package/vm-markdown" rel="nofollow noreferrer" target="_blank">npm</a>，欢迎使用。</p>
<table>
<thead><tr>
<th align="left">预览地址</th>
<th align="left"><a href="https://luosijie.github.io/vm-markdown/" rel="nofollow noreferrer" target="_blank">https://luosijie.github.io/vm-markdown/</a></th>
</tr></thead>
<tbody><tr>
<td align="left">源码地址</td>
<td align="left"><a href="https://github.com/luosijie/vm-markdown" rel="nofollow noreferrer" target="_blank">https://github.com/luosijie/vm-markdown</a></td>
</tr></tbody>
</table>
<h3 id="articleHeader0">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save vm-markdwon" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save vm-markdwon</code></pre>
<h3 id="articleHeader1">使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VmMarkdown from 'vm-markdwon'
export default {
  ...
  components: {
      VmMarkdown
  },
  methods: {
      showHtml (data) {
      console.log(data)
    }
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> VmMarkdown <span class="hljs-keyword">from</span> <span class="hljs-string">'vm-markdwon'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  ...
  components: {
      VmMarkdown
  },
  <span class="hljs-attr">methods</span>: {
      showHtml (data) {
      <span class="hljs-built_in">console</span>.log(data)
    }
  }
  ...
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<VmMarkdown :theme=&quot;theme&quot; 
            width=&quot;1000px&quot; 
            height=&quot;600px&quot; 
            v-on:getHtml=&quot;showHtml&quot;
            :defaultText=&quot;intro&quot;>
</VmMarkdown>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">VmMarkdown</span> <span class="hljs-attr">:theme</span>=<span class="hljs-string">"theme"</span> 
            <span class="hljs-attr">width</span>=<span class="hljs-string">"1000px"</span> 
            <span class="hljs-attr">height</span>=<span class="hljs-string">"600px"</span> 
            <span class="hljs-attr">v-on:getHtml</span>=<span class="hljs-string">"showHtml"</span>
            <span class="hljs-attr">:defaultText</span>=<span class="hljs-string">"intro"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">VmMarkdown</span>&gt;</span></code></pre>
<h1 id="articleHeader2">功能实现</h1>
<p><strong>vm-markdown</strong>作为一款 <strong>以简洁易用为目标</strong> 的编辑器, 核心解析功能由 <strong>Marked</strong> 来完成, 而其他功能主要为优化部分不熟悉<strong>Markdown语法</strong>用户的使用体验。<br>主要功能可以分为:</p>
<ul>
<li>将Markdown文本插入编辑框</li>
<li>将Mardown文本解析为html，并实时预览</li>
<li>将Makdown解析的html加入自定义样式</li>
<li>实现表格的的快速输入功能</li>
<li>实现编辑区域的缩放功能</li>
</ul>
<h2 id="articleHeader3">Markdown文本插入</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010899904" src="https://static.alili.tech/img/remote/1460000010899904" alt="Markdown文本输入" title="Markdown文本输入" style="cursor: pointer; display: inline;"></span></p>
<p>兼容Firefox浏览器的文本插入函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function insertText(dom,string) {
  if (document.execCommand('insertText', false, string)) {
    return
  }else{
    let start = dom.selectionStart
    let end = dom.selectionEnd
    dom.value = dom.value.substring(0, start) + string + dom.value.substring(end, dom.value.length)
    dom.selectionStart = start + string.length;
    dom.selectionEnd = start + string.length;
    dom.focus()
  }
}
export default insertText" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insertText</span>(<span class="hljs-params">dom,string</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'insertText'</span>, <span class="hljs-literal">false</span>, string)) {
    <span class="hljs-keyword">return</span>
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-keyword">let</span> start = dom.selectionStart
    <span class="hljs-keyword">let</span> end = dom.selectionEnd
    dom.value = dom.value.substring(<span class="hljs-number">0</span>, start) + string + dom.value.substring(end, dom.value.length)
    dom.selectionStart = start + string.length;
    dom.selectionEnd = start + string.length;
    dom.focus()
  }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> insertText</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import insertText from '../assets/js/insertText.js'
  ...
  methods: {
    insertText(string){
      let content = document.querySelector('.vm-markdown-content')
      insertText(content, string)
      this.$emit('textChange', content.value)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">import</span> insertText <span class="hljs-keyword">from</span> <span class="hljs-string">'../assets/js/insertText.js'</span>
  ...
  methods: {
    insertText(string){
      <span class="hljs-keyword">let</span> content = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.vm-markdown-content'</span>)
      insertText(content, string)
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'textChange'</span>, content.value)
    }
  }</code></pre>
<p>按钮绑定 <strong>insertText(string)</strong> 事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ...
  <VmMarkdownButton icon=&quot;iconfont icon-bold&quot; @click.native=&quot;insertText(' **Bold** ')&quot;></VmMarkdownButton>
  <VmMarkdownButton icon=&quot;iconfont icon-italic&quot; @click.native=&quot;insertText(' *Italic* ')&quot;></VmMarkdownButton>
  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  ...
  <span class="hljs-tag">&lt;<span class="hljs-name">VmMarkdownButton</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"iconfont icon-bold"</span> @<span class="hljs-attr">click.native</span>=<span class="hljs-string">"insertText(' **Bold** ')"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">VmMarkdownButton</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">VmMarkdownButton</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"iconfont icon-italic"</span> @<span class="hljs-attr">click.native</span>=<span class="hljs-string">"insertText(' *Italic* ')"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">VmMarkdownButton</span>&gt;</span>
  ...</code></pre>
<h2 id="articleHeader4">Markdown文本解析为html</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010899905" src="https://static.alili.tech/img/remote/1460000010899905" alt="解析Markdown为html" title="解析Markdown为html" style="cursor: pointer; display: inline;"></span></p>
<p>Dom结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &nbsp;...
  <div class=&quot;vm-markdown-edit&quot; :style=&quot;{backgroundColor: themeValue.bgLeft}&quot;>
    // 输入部分
    <textarea v-focus class=&quot;content-markdown&quot; v-model=&quot;markdString&quot;></textarea>
  </div>
  // 实时预览部分
  <div class=&quot;vm-markdown-html&quot; v-html=&quot;htmlString&quot; :style=&quot;{backgroundColor: themeValue.bgRight}&quot;>
  </div>
  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> &nbsp;...
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"vm-markdown-edit"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{backgroundColor: themeValue.bgLeft}"</span>&gt;</span>
    // 输入部分
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">v-focus</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content-markdown"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"markdString"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  // 实时预览部分
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"vm-markdown-html"</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"htmlString"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{backgroundColor: themeValue.bgRight}"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  ...</code></pre>
<p>引入 Marked 解析, 并实时预览</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import marked from 'marked'
  watch: {
    markdString(value){
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
      this.htmlString = marked(value)
      ...
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">import</span> marked <span class="hljs-keyword">from</span> <span class="hljs-string">'marked'</span>
  watch: {
    markdString(value){
      marked.setOptions({
        <span class="hljs-attr">renderer</span>: <span class="hljs-keyword">new</span> marked.Renderer(),
        <span class="hljs-attr">gfm</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">tables</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">breaks</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">pedantic</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">sanitize</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">smartLists</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">smartypants</span>: <span class="hljs-literal">false</span>
      })
      <span class="hljs-keyword">this</span>.htmlString = marked(value)
      ...
    }
  },</code></pre>
<h2 id="articleHeader5">增加自定义样式</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010899906" src="https://static.alili.tech/img/remote/1460000010899906" alt="样式化html" title="样式化html" style="cursor: pointer; display: inline;"></span></p>
<p>因为 Marked 解析出来的html，是不带任何样式的，所以需要自定义样式，并确保最后输出带样式的html字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  parseHtml: function () {
      let style = {
        ul: `
              margin: 10px 20px;
              list-style-type: square;
              padding: 0;
            `,
        ol: `
              margin: 10px 20px;
              list-style-type: decimal;
              padding: 0;
            `,
        li: `
              display: list-item;
              padding: 0;
            `,
        hr: `
              margin: 15px 0;
              border-top: 1px solid #eeeff1;
            `,
        pre: `
              display: block;
              margin: 10px 0;
              padding: 8px;
              border-radius: 4px;
              background-color: #f2f2f2;
              color: #656565;
              font-size: 14px;
             `,
        blockquote: `
                      display: block;
                      border-left: 4px solid #ddd;
                      margin: 15px 0;
                      padding: 0 15px;
                    `,
        img: `
               margin: 20px 0;
             `,
        a: `
            color: #41b883;
           `,
        table: `
                 border: 1px solid #eee;
                 border-collapse: collapse;
               `,
        tr: `
              border: 1px solid #eee;
            `,
        th: `
              padding: 8px 30px;
              border-right: 1px solid #eee;
              background-color: #f2f2f2;
            `,
        td: `
              padding: 8px 30px;
              border-right: 1px solid #eee;
            `
      }
      let html = document.getElementsByClassName('vm-markdown-html')[0]
      let tagNames = Object.keys(style)
      for (let i = 0; i < tagNames.length; i++) {
        let _tagNames = html.getElementsByTagName(tagNames[i])
        if (_tagNames.length > 0) {
          for (let j = 0; j < _tagNames.length; j++) {
            _tagNames[j].style = style[tagNames[i]]
          }
        }
      }
    },
    getHtml: function () {
      let html = document.querySelector('.vm-markdown-html')
      this.$emit('getHtml', html.innerHTML)
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  parseHtml: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">let</span> style = {
        <span class="hljs-attr">ul</span>: <span class="hljs-string">`
              margin: 10px 20px;
              list-style-type: square;
              padding: 0;
            `</span>,
        <span class="hljs-attr">ol</span>: <span class="hljs-string">`
              margin: 10px 20px;
              list-style-type: decimal;
              padding: 0;
            `</span>,
        <span class="hljs-attr">li</span>: <span class="hljs-string">`
              display: list-item;
              padding: 0;
            `</span>,
        <span class="hljs-attr">hr</span>: <span class="hljs-string">`
              margin: 15px 0;
              border-top: 1px solid #eeeff1;
            `</span>,
        <span class="hljs-attr">pre</span>: <span class="hljs-string">`
              display: block;
              margin: 10px 0;
              padding: 8px;
              border-radius: 4px;
              background-color: #f2f2f2;
              color: #656565;
              font-size: 14px;
             `</span>,
        <span class="hljs-attr">blockquote</span>: <span class="hljs-string">`
                      display: block;
                      border-left: 4px solid #ddd;
                      margin: 15px 0;
                      padding: 0 15px;
                    `</span>,
        <span class="hljs-attr">img</span>: <span class="hljs-string">`
               margin: 20px 0;
             `</span>,
        <span class="hljs-attr">a</span>: <span class="hljs-string">`
            color: #41b883;
           `</span>,
        <span class="hljs-attr">table</span>: <span class="hljs-string">`
                 border: 1px solid #eee;
                 border-collapse: collapse;
               `</span>,
        <span class="hljs-attr">tr</span>: <span class="hljs-string">`
              border: 1px solid #eee;
            `</span>,
        <span class="hljs-attr">th</span>: <span class="hljs-string">`
              padding: 8px 30px;
              border-right: 1px solid #eee;
              background-color: #f2f2f2;
            `</span>,
        <span class="hljs-attr">td</span>: <span class="hljs-string">`
              padding: 8px 30px;
              border-right: 1px solid #eee;
            `</span>
      }
      <span class="hljs-keyword">let</span> html = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'vm-markdown-html'</span>)[<span class="hljs-number">0</span>]
      <span class="hljs-keyword">let</span> tagNames = <span class="hljs-built_in">Object</span>.keys(style)
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; tagNames.length; i++) {
        <span class="hljs-keyword">let</span> _tagNames = html.getElementsByTagName(tagNames[i])
        <span class="hljs-keyword">if</span> (_tagNames.length &gt; <span class="hljs-number">0</span>) {
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; _tagNames.length; j++) {
            _tagNames[j].style = style[tagNames[i]]
          }
        }
      }
    },
    <span class="hljs-attr">getHtml</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">let</span> html = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.vm-markdown-html'</span>)
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'getHtml'</span>, html.innerHTML)
    }
  },</code></pre>
<h2 id="articleHeader6">表格的的快速输入</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010899907" src="https://static.alili.tech/img/remote/1460000010899907" alt="表格输入" title="表格输入" style="cursor: pointer;"></span></p>
<p>Markdown的表格是相对繁琐的输入，vm-markown借用图形化的操作实现快捷输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <ul class=&quot;vm-markdown-table&quot; v-insertTable:color=&quot;filterColor&quot;>
  </ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"vm-markdown-table"</span> <span class="hljs-attr">v-insertTable:color</span>=<span class="hljs-string">"filterColor"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  directives:{
    insertTable: {
      inserted: function(el,binding){
          // 定义总单元格数目 4*6 = 24
          let length = 24
          // 鼠标所在的单元格的坐标
          let x = 0, y = 0
          // 每个单元格赋值：行和列的坐标
          for(let i=0; i<length; i++){
            let setx = i%6 + 1
            let sety = parseInt(i/6) + 1
            let li = document.createElement('li')
            li.setAttribute('data-x', setx)
            li.setAttribute('data-y', sety)
            el.appendChild(li)
          }
          // 鼠标滑过改变颜色
          el.addEventListener('mouseover', function(evt){
            if (evt.target.tagName === 'LI') {
              x= evt.target.getAttribute('data-x')
              y= evt.target.getAttribute('data-y')
              let lis = el.querySelectorAll('li')
              for(let i=0; i<lis.length; i++){
                lis[i].style.backgroundColor = '#e0e0e0'
                if(lis[i].dataset.x <= x &amp;&amp; lis[i].dataset.y <= y){
                  lis[i].style.backgroundColor = binding.value
                }
              }
            }
          })
          // 单击插入表格字符串
          el.addEventListener('click', function(evt){
            if(x &amp;&amp; y){
              let th = '| Head '
              let td = '| Data '
              let tl = '| ---  '
              let str = ''
              let ths = '', tls = '', tds = ''
              for(let i=0; i<x; i++){
                ths = ths.concat(th)
                tls = tls.concat(tl)
              }
              for(let j=0; j<y; j++){
                for(let k=0; k<x; k++){
                  tds = tds.concat(td)
                }
                tds += ' |\n'
              }
              ths += ' |\n'
              tls += ' |\n'
              str += ths + tls + tds
              document.execCommand('insertText', false, str)
            }         
          })
       }
    }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  directives:{
    <span class="hljs-attr">insertTable</span>: {
      <span class="hljs-attr">inserted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,binding</span>)</span>{
          <span class="hljs-comment">// 定义总单元格数目 4*6 = 24</span>
          <span class="hljs-keyword">let</span> length = <span class="hljs-number">24</span>
          <span class="hljs-comment">// 鼠标所在的单元格的坐标</span>
          <span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>, y = <span class="hljs-number">0</span>
          <span class="hljs-comment">// 每个单元格赋值：行和列的坐标</span>
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;length; i++){
            <span class="hljs-keyword">let</span> setx = i%<span class="hljs-number">6</span> + <span class="hljs-number">1</span>
            <span class="hljs-keyword">let</span> sety = <span class="hljs-built_in">parseInt</span>(i/<span class="hljs-number">6</span>) + <span class="hljs-number">1</span>
            <span class="hljs-keyword">let</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>)
            li.setAttribute(<span class="hljs-string">'data-x'</span>, setx)
            li.setAttribute(<span class="hljs-string">'data-y'</span>, sety)
            el.appendChild(li)
          }
          <span class="hljs-comment">// 鼠标滑过改变颜色</span>
          el.addEventListener(<span class="hljs-string">'mouseover'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>)</span>{
            <span class="hljs-keyword">if</span> (evt.target.tagName === <span class="hljs-string">'LI'</span>) {
              x= evt.target.getAttribute(<span class="hljs-string">'data-x'</span>)
              y= evt.target.getAttribute(<span class="hljs-string">'data-y'</span>)
              <span class="hljs-keyword">let</span> lis = el.querySelectorAll(<span class="hljs-string">'li'</span>)
              <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;lis.length; i++){
                lis[i].style.backgroundColor = <span class="hljs-string">'#e0e0e0'</span>
                <span class="hljs-keyword">if</span>(lis[i].dataset.x &lt;= x &amp;&amp; lis[i].dataset.y &lt;= y){
                  lis[i].style.backgroundColor = binding.value
                }
              }
            }
          })
          <span class="hljs-comment">// 单击插入表格字符串</span>
          el.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>)</span>{
            <span class="hljs-keyword">if</span>(x &amp;&amp; y){
              <span class="hljs-keyword">let</span> th = <span class="hljs-string">'| Head '</span>
              <span class="hljs-keyword">let</span> td = <span class="hljs-string">'| Data '</span>
              <span class="hljs-keyword">let</span> tl = <span class="hljs-string">'| ---  '</span>
              <span class="hljs-keyword">let</span> str = <span class="hljs-string">''</span>
              <span class="hljs-keyword">let</span> ths = <span class="hljs-string">''</span>, tls = <span class="hljs-string">''</span>, tds = <span class="hljs-string">''</span>
              <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;x; i++){
                ths = ths.concat(th)
                tls = tls.concat(tl)
              }
              <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>; j&lt;y; j++){
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k=<span class="hljs-number">0</span>; k&lt;x; k++){
                  tds = tds.concat(td)
                }
                tds += <span class="hljs-string">' |\n'</span>
              }
              ths += <span class="hljs-string">' |\n'</span>
              tls += <span class="hljs-string">' |\n'</span>
              str += ths + tls + tds
              <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'insertText'</span>, <span class="hljs-literal">false</span>, str)
            }         
          })
       }
    }
  }
</code></pre>
<h2 id="articleHeader7">编辑区的缩放功能</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010899909" src="https://static.alili.tech/img/remote/1460000010899909" alt="缩放功能" title="缩放功能" style="cursor: pointer;"></span></p>
<p>实现缩放的layout函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  layout: function (event) {
      let VmMarkdown = document.querySelector('.vm-markdown')
      let VmMarkdownEdit = document.querySelector('.vm-markdown-edit')    
      function classHas(str){
        return event.target.classList.contains(str)
      }
      if(classHas('icon-layout-zoom')){
        
        if (VmMarkdown.style.position === 'fixed') {
          VmMarkdown.style = 'width:' + this.width + ';' +
                             'height:' + this.height + ';'
        }else{
          VmMarkdown.style.position = 'fixed'
          VmMarkdown.style.left = '0'
          VmMarkdown.style.top = '0'
          VmMarkdown.style.margin = '0'
          VmMarkdown.style.width = '100%'
          VmMarkdown.style.height = '100%'
        }   
      }else if (classHas('icon-layout-left')) {
        VmMarkdownEdit.style.width = '0'
      }else if (classHas('icon-layout-right')) {
        VmMarkdownEdit.style.width = '100%'
      }else if (classHas('icon-layout-default')) {
        VmMarkdownEdit.style.width = '50%'
      }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  layout: function (event) {
      let VmMarkdown = document.querySelector('.vm-markdown')
      let VmMarkdownEdit = document.querySelector('.vm-markdown-edit')    
      function classHas(str){
        return event.target.classList.contains(str)
      }
      if(classHas('icon-layout-zoom')){
        
        if (VmMarkdown.style.position === 'fixed') {
          VmMarkdown.style = 'width:' + this.width + ';' +
                             'height:' + this.height + ';'
        }else{
          VmMarkdown.style.position = 'fixed'
          VmMarkdown.style.left = '0'
          VmMarkdown.style.top = '0'
          VmMarkdown.style.margin = '0'
          VmMarkdown.style.width = '100%'
          VmMarkdown.style.height = '100%'
        }   
      }else if (classHas('icon-layout-left')) {
        VmMarkdownEdit.style.width = '0'
      }else if (classHas('icon-layout-right')) {
        VmMarkdownEdit.style.width = '100%'
      }else if (classHas('icon-layout-default')) {
        VmMarkdownEdit.style.width = '50%'
      }
    },</code></pre>
<p>将layout绑定到顶部菜单的点击事件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<VmMarkdownMenu  @click.native=&quot;layout&quot;></VmMarkdownMenu>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">VmMarkdownMenu</span>  @<span class="hljs-attr">click.native</span>=<span class="hljs-string">"layout"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">VmMarkdownMenu</span>&gt;</span></code></pre>
<blockquote><p>先这样了 欢迎star</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue写一个Markdown编辑器

## 原文链接
[https://segmentfault.com/a/1190000010899898](https://segmentfault.com/a/1190000010899898)

