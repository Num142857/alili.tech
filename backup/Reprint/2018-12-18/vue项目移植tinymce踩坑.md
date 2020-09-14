---
title: 'vue项目移植tinymce踩坑' 
date: 2018-12-18 2:30:11
hidden: true
slug: j9gtsb1wa6q
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近因业务需求在项目中嵌入了<a href="https://www.tinymce.com" rel="nofollow noreferrer" target="_blank">tinymce</a>这个编辑器，用于满足平台给用户编辑各类新闻内容什么的业务需求，前后也花了不少时间体验和对比了市面上各类开源编辑器。</p>
<h2 id="articleHeader1">各大WYSIWYG编辑器的简单比较</h2>
<p><a href="http://ueditor.baidu.com/website/" rel="nofollow noreferrer" target="_blank">UEditor</a>： 因为已经不再维护了，需要大量修改源码，很多都是专门为jsp等服务器渲染项目写的代码需要删除， 然后越删越害怕越删越不敢用，依赖<code>jquery</code>，需要专门用js去parse编辑完成的内容，parse完的内容还可能污染全局css，兼容老浏览器还不错， 但是，我们不怎么考虑兼容IE。所以，告辞。</p>
<p><a href="http://www.wangeditor.com" rel="nofollow noreferrer" target="_blank">wangEditor</a>： 中文文档，上手快，依赖<code>jquery</code>，功能少点要花时间去写插件，需要单独为图片上传功能写个接口，老项目忙着上线临时用过，感觉并不适合当前业务这么重的编辑功能于是放弃了。</p>
<p><a href="https://quilljs.com" rel="nofollow noreferrer" target="_blank">Quill</a>：api友好, 功能少，需要特定的css去解析文本（这点我不大喜欢），ui好看，适合作为论坛回帖功能使用。</p>
<p><a href="https://ckeditor.com" rel="nofollow noreferrer" target="_blank">CKEditor</a>： CKEditor目前主流的还是<code>4.x</code>的版本，但是文档看着很瞎眼实在是提不起兴致去配置，草草用了下就放弃了，<code>5.x</code>版本刚从beta结束，需要指定专门的node以及npm版本，虽然功能强大配置灵活ui漂亮不过目前糟糕的兼容性基本是不可能出现在大众视野了。</p>
<p><a href="http://kindeditor.net/demo.php" rel="nofollow noreferrer" target="_blank">KingEditor</a>： 丑，不喜欢，不爱用</p>
<p><a href="https://draftjs.org/docs/overview.html" rel="nofollow noreferrer" target="_blank">Draft-js</a>： 知乎最近刚改的文本编辑器就是在draft的基础上开发的，依赖<code>react</code>， 弃。</p>
<p><a href="https://yabwe.github.io/medium-editor/" rel="nofollow noreferrer" target="_blank">Medium-editor</a>： 虽然看着感觉很酷炫，但是，不适合我们的业务场景啊， api也简陋可怕。 </p>
<p><a href="https://trix-editor.org" rel="nofollow noreferrer" target="_blank">trix</a>： 嗯，又一个小而美，放弃</p>
<p><a href="http://slatejs.org/#/rich-text" rel="nofollow noreferrer" target="_blank">Slate</a>： <code>react</code>，放弃</p>
<p><a href="http://mindmup.github.io/bootstrap-wysiwyg/" rel="nofollow noreferrer" target="_blank">Bootstrap-wysiwyg</a>： <code>bootstrap, jquery</code>, 放弃</p>
<p><a href="https://www.tinymce.com" rel="nofollow noreferrer" target="_blank">tinymce</a>： 文档好，功能强，bug少，无外部依赖，大家用了都说好，嗯，没错就是它了。</p>
<p>编辑器配置方面只要能看得懂英文耍起来还是比较简单的，适配中碰到的大部分问题都可以通过看文档解决，即便看文档解决不了网上也有大量的文章能告诉你怎么配置能解决。</p>
<p>当然了，主要是我这里需要解决一些别人觉得超简单自己一想都很烦人的需求，比如：</p>
<blockquote><ol>
<li>word文档粘贴进来要带格式</li>
<li>兼容移动端</li>
<li>word文档粘贴进来要正常显示并且还要兼容移动端</li>
<li>电脑网页里粘贴进来内容要正常显示并且排版还不能乱</li>
<li>电脑网页拷过来的内容还要兼容到移动端</li>
</ol></blockquote>
<h2 id="articleHeader2">初始化</h2>
<p>因为tinymce的<code>Plugins</code>是按需加载的<br>为了能先快速上手这个编辑器<br>就先在<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>的index.html中默认塞入一条在线cdn地址</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://cdn.bootcss.com/tinymce/4.7.4/tinymce.min.js&quot;></script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/tinymce/4.7.4/tinymce.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre>
<p>记得去下载<a href="https://www.tinymce.com/download/language-packages/" rel="nofollow noreferrer" target="_blank">语言包</a>到本地,<br>然后就在文件内引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './zh_CN.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'./zh_CN.js'</span></code></pre>
<p>后面有机会再写下单独打包的事项，毕竟这货体积还不小。</p>
<h2 id="articleHeader3">插入vue组件模板</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <textarea :id= &quot;Id&quot;></textarea>
  </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">:id</span>= <span class="hljs-string">"Id"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>记得一定要在<code>textarea</code>外面包一层div，不然...你自己试试看就知道了。</p>
<h2 id="articleHeader4">组件基础配置</h2>
<p>将tinymce通过指定的selector挂载到组件中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <textarea :id= &quot;Id&quot;></textarea>
  </div>
</template>
<script>
  import './zh_CN.js'
  export default {
    data () {
      const Id = Date.now()
      return {
        Id: Id,
        Editor: null,
        DefaultConfig: {}
      }
    },
    props: {
      value: {
        default: '',
        type: String
      },
      config: {
        type: Object,
        default: () => {
          return {
            theme: 'modern',
            height: 300
          }
        }
      }
    },
    mounted () {
      this.init()
    },
    beforeDestroy () {
      // 销毁tinymce
      this.$emit('on-destroy')
      window.tinymce.remove(`#${this.Id}`)
    },
    methods: {
       init () {
        const self = this
        this.Editor = window.tinymce.init({
          // 默认配置
          ...this.DefaultConfig,
          
          // prop内传入的的config
          ...this.config, 
          
          // 挂载的DOM对象
          selector: `#${this.Id}`,
          
          setup: (editor) => {
            // 抛出 'on-ready' 事件钩子
            editor.on(
              'init', () => {
                self.loading = false
                self.$emit('on-ready')
                editor.setContent(self.value)
              }
            )
            // 抛出 'input' 事件钩子，同步value数据
            editor.on(
              'input change undo redo', () => {
                self.$emit('input', editor.getContent())
              }
            )
          }
        })
      }
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">:id</span>= <span class="hljs-string">"Id"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> <span class="hljs-string">'./zh_CN.js'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">const</span> Id = <span class="hljs-built_in">Date</span>.now()
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">Id</span>: Id,
        <span class="hljs-attr">Editor</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">DefaultConfig</span>: {}
      }
    },
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">value</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
      },
      <span class="hljs-attr">config</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">theme</span>: <span class="hljs-string">'modern'</span>,
            <span class="hljs-attr">height</span>: <span class="hljs-number">300</span>
          }
        }
      }
    },
    mounted () {
      <span class="hljs-keyword">this</span>.init()
    },
    beforeDestroy () {
      <span class="hljs-comment">// 销毁tinymce</span>
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'on-destroy'</span>)
      <span class="hljs-built_in">window</span>.tinymce.remove(<span class="hljs-string">`#<span class="hljs-subst">${<span class="hljs-keyword">this</span>.Id}</span>`</span>)
    },
    <span class="hljs-attr">methods</span>: {
       init () {
        <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>
        <span class="hljs-keyword">this</span>.Editor = <span class="hljs-built_in">window</span>.tinymce.init({
          <span class="hljs-comment">// 默认配置</span>
          ...this.DefaultConfig,
          
          <span class="hljs-comment">// prop内传入的的config</span>
          ...this.config, 
          
          <span class="hljs-comment">// 挂载的DOM对象</span>
          selector: <span class="hljs-string">`#<span class="hljs-subst">${<span class="hljs-keyword">this</span>.Id}</span>`</span>,
          
          <span class="hljs-attr">setup</span>: <span class="hljs-function">(<span class="hljs-params">editor</span>) =&gt;</span> {
            <span class="hljs-comment">// 抛出 'on-ready' 事件钩子</span>
            editor.on(
              <span class="hljs-string">'init'</span>, () =&gt; {
                self.loading = <span class="hljs-literal">false</span>
                self.$emit(<span class="hljs-string">'on-ready'</span>)
                editor.setContent(self.value)
              }
            )
            <span class="hljs-comment">// 抛出 'input' 事件钩子，同步value数据</span>
            editor.on(
              <span class="hljs-string">'input change undo redo'</span>, () =&gt; {
                self.$emit(<span class="hljs-string">'input'</span>, editor.getContent())
              }
            )
          }
        })
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>好了，组件基本的初始化完成，后面正式开始踩坑之旅</p>
<h2 id="articleHeader5">API</h2>
<p>具体内容看<a href="https://www.tinymce.com/docs/demo/" rel="nofollow noreferrer" target="_blank">官网的API</a>就行，英语不好的用chrome翻译下对照着demo也能看个七七八八，当然主要原因还是我比较懒。</p>
<p>我这边根据自身业务需求在组件的<code>data</code>内写了个<code>默认配置</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
DefaultConfig: {
  // GLOBAL
  height: 500,
  theme: 'modern',
  menubar: false,
  toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `,
  plugins: `
    paste
    importcss
    image
    code
    table
    advlist
    fullscreen
    link
    media
    lists
    textcolor
    colorpicker
    hr
    preview
  `,

  
  // CONFIG

  forced_root_block: 'p',
  force_p_newlines: true,
  importcss_append: true,

 // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
  content_style: `
    *                         { padding:0; margin:0; }
    html, body                { height:100%; }
    img                       { max-width:100%; display:block;height:auto; }
    a                         { text-decoration: none; }
    iframe                    { width: 100%; }
    p                         { line-height:1.6; margin: 0px; }
    table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
    .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
    ul,ol                     { list-style-position:inside; }
  `,

  insert_button_items: 'image link | inserttable',

  // CONFIG: Paste
  paste_retain_style_properties: 'all',
  paste_word_valid_elements: '*[*]',        // word需要它
  paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
  paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
  paste_webkit_styles: 'all',
  paste_merge_formats: true,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,

  // CONFIG: Font
  fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',

  // CONFIG: StyleSelect
  style_formats: [
    {
      title: '首行缩进',
      block: 'p',
      styles: { 'text-indent': '2em' }
    },
    {
      title: '行高',
      items: [
        {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
        {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
        {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
        {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
        {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
      ]
    }
  ],

  // FontSelect
  font_formats: `
    微软雅黑=微软雅黑;
    宋体=宋体;
    黑体=黑体;
    仿宋=仿宋;
    楷体=楷体;
    隶书=隶书;
    幼圆=幼圆;
    Andale Mono=andale mono,times;
    Arial=arial, helvetica,
    sans-serif;
    Arial Black=arial black, avant garde;
    Book Antiqua=book antiqua,palatino;
    Comic Sans MS=comic sans ms,sans-serif;
    Courier New=courier new,courier;
    Georgia=georgia,palatino;
    Helvetica=helvetica;
    Impact=impact,chicago;
    Symbol=symbol;
    Tahoma=tahoma,arial,helvetica,sans-serif;
    Terminal=terminal,monaco;
    Times New Roman=times new roman,times;
    Trebuchet MS=trebuchet ms,geneva;
    Verdana=verdana,geneva;
    Webdings=webdings;
    Wingdings=wingdings,zapf dingbats`,

  // Tab
  tabfocus_elements: ':prev,:next',
  object_resizing: true,

  // Image
  imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
DefaultConfig: {
  <span class="hljs-comment">// GLOBAL</span>
  height: <span class="hljs-number">500</span>,
  <span class="hljs-attr">theme</span>: <span class="hljs-string">'modern'</span>,
  <span class="hljs-attr">menubar</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">toolbar</span>: <span class="hljs-string">`styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `</span>,
  <span class="hljs-attr">plugins</span>: <span class="hljs-string">`
    paste
    importcss
    image
    code
    table
    advlist
    fullscreen
    link
    media
    lists
    textcolor
    colorpicker
    hr
    preview
  `</span>,

  
  <span class="hljs-comment">// CONFIG</span>

  forced_root_block: <span class="hljs-string">'p'</span>,
  <span class="hljs-attr">force_p_newlines</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">importcss_append</span>: <span class="hljs-literal">true</span>,

 <span class="hljs-comment">// CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了</span>
  content_style: <span class="hljs-string">`
    *                         { padding:0; margin:0; }
    html, body                { height:100%; }
    img                       { max-width:100%; display:block;height:auto; }
    a                         { text-decoration: none; }
    iframe                    { width: 100%; }
    p                         { line-height:1.6; margin: 0px; }
    table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
    .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
    ul,ol                     { list-style-position:inside; }
  `</span>,

  <span class="hljs-attr">insert_button_items</span>: <span class="hljs-string">'image link | inserttable'</span>,

  <span class="hljs-comment">// CONFIG: Paste</span>
  paste_retain_style_properties: <span class="hljs-string">'all'</span>,
  <span class="hljs-attr">paste_word_valid_elements</span>: <span class="hljs-string">'*[*]'</span>,        <span class="hljs-comment">// word需要它</span>
  paste_data_images: <span class="hljs-literal">true</span>,                  <span class="hljs-comment">// 粘贴的同时能把内容里的图片自动上传，非常强力的功能</span>
  paste_convert_word_fake_lists: <span class="hljs-literal">false</span>,     <span class="hljs-comment">// 插入word文档需要该属性</span>
  paste_webkit_styles: <span class="hljs-string">'all'</span>,
  <span class="hljs-attr">paste_merge_formats</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">nonbreaking_force_tab</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">paste_auto_cleanup_on_paste</span>: <span class="hljs-literal">false</span>,

  <span class="hljs-comment">// CONFIG: Font</span>
  fontsize_formats: <span class="hljs-string">'10px 11px 12px 14px 16px 18px 20px 24px'</span>,

  <span class="hljs-comment">// CONFIG: StyleSelect</span>
  style_formats: [
    {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'首行缩进'</span>,
      <span class="hljs-attr">block</span>: <span class="hljs-string">'p'</span>,
      <span class="hljs-attr">styles</span>: { <span class="hljs-string">'text-indent'</span>: <span class="hljs-string">'2em'</span> }
    },
    {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'行高'</span>,
      <span class="hljs-attr">items</span>: [
        {<span class="hljs-attr">title</span>: <span class="hljs-string">'1'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'1'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>},
        {<span class="hljs-attr">title</span>: <span class="hljs-string">'1.5'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'1.5'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>},
        {<span class="hljs-attr">title</span>: <span class="hljs-string">'2'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'2'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>},
        {<span class="hljs-attr">title</span>: <span class="hljs-string">'2.5'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'2.5'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>},
        {<span class="hljs-attr">title</span>: <span class="hljs-string">'3'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'3'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>}
      ]
    }
  ],

  <span class="hljs-comment">// FontSelect</span>
  font_formats: <span class="hljs-string">`
    微软雅黑=微软雅黑;
    宋体=宋体;
    黑体=黑体;
    仿宋=仿宋;
    楷体=楷体;
    隶书=隶书;
    幼圆=幼圆;
    Andale Mono=andale mono,times;
    Arial=arial, helvetica,
    sans-serif;
    Arial Black=arial black, avant garde;
    Book Antiqua=book antiqua,palatino;
    Comic Sans MS=comic sans ms,sans-serif;
    Courier New=courier new,courier;
    Georgia=georgia,palatino;
    Helvetica=helvetica;
    Impact=impact,chicago;
    Symbol=symbol;
    Tahoma=tahoma,arial,helvetica,sans-serif;
    Terminal=terminal,monaco;
    Times New Roman=times new roman,times;
    Trebuchet MS=trebuchet ms,geneva;
    Verdana=verdana,geneva;
    Webdings=webdings;
    Wingdings=wingdings,zapf dingbats`</span>,

  <span class="hljs-comment">// Tab</span>
  tabfocus_elements: <span class="hljs-string">':prev,:next'</span>,
  <span class="hljs-attr">object_resizing</span>: <span class="hljs-literal">true</span>,

  <span class="hljs-comment">// Image</span>
  imagetools_toolbar: <span class="hljs-string">'rotateleft rotateright | flipv fliph | editimage imageoptions'</span>
}</code></pre>
<p>因为本人比较懒，以上配置导出的代码可能会有代码注入的风险，建议保存的时候再前后端都做下注入过滤，不过一般数据安全问题主要还是服务器那边的事情?。</p>
<p>后面的图片上传可以单独拆出来做个小配置，直接写到<code>props</code>里好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  url: {
    default: '',
    type: String
  },
  accept: {
    default: 'image/jpeg, image/png',
    type: String
  },
  maxSize: {
    default: 2097152,
    type: Number
  },
  withCredentials: {
    default: false,
    type: Boolean
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  url: {
    <span class="hljs-attr">default</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
  },
  <span class="hljs-attr">accept</span>: {
    <span class="hljs-attr">default</span>: <span class="hljs-string">'image/jpeg, image/png'</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
  },
  <span class="hljs-attr">maxSize</span>: {
    <span class="hljs-attr">default</span>: <span class="hljs-number">2097152</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>
  },
  <span class="hljs-attr">withCredentials</span>: {
    <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>
  }</code></pre>
<p>然后把这套东西塞到<code>init</code>配置里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  // 图片上传
  images_upload_handler: function (blobInfo, success, failure) {
    if (blobInfo.blob().size > self.maxSize) {
      failure('文件体积过大')
    }
    
    if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
      uploadPic()
    } else {
      failure('图片格式错误')
    }
    function uploadPic () {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()
      xhr.withCredentials = self.withCredentials
      xhr.open('POST', self.url)
      xhr.onload = function () {

        if (xhr.status !== 200) {
          // 抛出 'on-upload-fail' 钩子
          self.$emit('on-upload-fail')
          failure('上传失败: ' + xhr.status)
          return
        }

        const json = JSON.parse(xhr.responseText)
        // 抛出 'on-upload-success' 钩子
        self.$emit('on-upload-complete' , [
          json, success, failure
        ])
      }
      formData.append('file', blobInfo.blob())
      xhr.send(formData)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>
  <span class="hljs-comment">// 图片上传</span>
  images_upload_handler: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(blobInfo, success, failure)</span> </span>{
    <span class="hljs-keyword">if</span> (blobInfo.blob().size &gt; <span class="hljs-keyword">self</span>.maxSize) {
      failure(<span class="hljs-string">'文件体积过大'</span>)
    }
    
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">self</span>.accept.indexOf(blobInfo.blob().type) &gt;= <span class="hljs-number">0</span>) {
      uploadPic()
    } <span class="hljs-keyword">else</span> {
      failure(<span class="hljs-string">'图片格式错误'</span>)
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadPic</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
      <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> FormData()
      xhr.withCredentials = <span class="hljs-keyword">self</span>.withCredentials
      xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-keyword">self</span>.url)
      xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

        <span class="hljs-keyword">if</span> (xhr.status !== <span class="hljs-number">200</span>) {
          <span class="hljs-comment">// 抛出 'on-upload-fail' 钩子</span>
          <span class="hljs-keyword">self</span>.$emit(<span class="hljs-string">'on-upload-fail'</span>)
          failure(<span class="hljs-string">'上传失败: '</span> + xhr.status)
          <span class="hljs-keyword">return</span>
        }

        <span class="hljs-keyword">const</span> json = JSON.parse(xhr.responseText)
        <span class="hljs-comment">// 抛出 'on-upload-success' 钩子</span>
        <span class="hljs-keyword">self</span>.$emit(<span class="hljs-string">'on-upload-complete'</span> , [
          json, success, failure
        ])
      }
      formData.append(<span class="hljs-string">'file'</span>, blobInfo.blob())
      xhr.send(formData)
    }
  }</code></pre>
<p>至此， 一个组件的封装基本算是完成了</p>
<p>看下初阶成果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <textarea :id= &quot;Id&quot;></textarea>
  </div>
</template>
<script>
  import './zh_CN.js'
  export default {
    data () {
      const Id = Date.now()
      return {
        Id: Id,
        Editor: null,
        DefaultConfig: {
          // GLOBAL
          height: 500,
          theme: 'modern',
          menubar: false,
          toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `,
          plugins: `
            paste
            importcss
            image
            code
            table
            advlist
            fullscreen
            link
            media
            lists
            textcolor
            colorpicker
            hr
            preview
          `,

          
          // CONFIG

          forced_root_block: 'p',
          force_p_newlines: true,
          importcss_append: true,

        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
          content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,

          insert_button_items: 'image link | inserttable',

          // CONFIG: Paste
          paste_retain_style_properties: 'all',
          paste_word_valid_elements: '*[*]',        // word需要它
          paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
          paste_webkit_styles: 'all',
          paste_merge_formats: true,
          nonbreaking_force_tab: false,
          paste_auto_cleanup_on_paste: false,

          // CONFIG: Font
          fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',

          // CONFIG: StyleSelect
          style_formats: [
            {
              title: '首行缩进',
              block: 'p',
              styles: { 'text-indent': '2em' }
            },
            {
              title: '行高',
              items: [
                {title: '1', styles: { 'line-height': '1' }, inline: 'span'},
                {title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span'},
                {title: '2', styles: { 'line-height': '2' }, inline: 'span'},
                {title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span'},
                {title: '3', styles: { 'line-height': '3' }, inline: 'span'}
              ]
            }
          ],

          // FontSelect
          font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,

          // Tab
          tabfocus_elements: ':prev,:next',
          object_resizing: true,

          // Image
          imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'
        }
      }
    },
    props: {
      value: {
        default: '',
        type: String
      },
      config: {
        type: Object,
        default: () => {
          return {
            theme: 'modern',
            height: 300
          }
        }
      },
      url: {
        default: '',
        type: String
      },
      accept: {
        default: 'image/jpeg, image/png',
        type: String
      },
      maxSize: {
        default: 2097152,
        type: Number
      },
      withCredentials: {
        default: false,
        type: Boolean
      }
    },
    mounted () {
      this.init()
    },
    beforeDestroy () {
      // 销毁tinymce
      this.$emit('on-destroy')
      window.tinymce.remove(`$#{this.Id}`)
    },
    methods: {
       init () {
        const self = this
        
        this.Editor = window.tinymce.init({
          // 默认配置
          ...this.DefaultConfig,
          
          // 图片上传
          images_upload_handler: function (blobInfo, success, failure) {
            if (blobInfo.blob().size > self.maxSize) {
              failure('文件体积过大')
            }
            
            if (self.accept.indexOf(blobInfo.blob().type) > 0) {
              uploadPic()
            } else {
              failure('图片格式错误')
            }
            function uploadPic () {
              const xhr = new XMLHttpRequest()
              const formData = new FormData()
              xhr.withCredentials = self.withCredentials
              xhr.open('POST', self.url)
              xhr.onload = function () {

                if (xhr.status !== 200) {
                  // 抛出 'on-upload-fail' 钩子
                  self.$emit('on-upload-fail')
                  failure('上传失败: ' + xhr.status)
                  return
                }

                const json = JSON.parse(xhr.responseText)
                // 抛出 'on-upload-complete' 钩子
                self.$emit('on-upload-complete' , [
                  json, success, failure
                ])
              }
              formData.append('file', blobInfo.blob())
              xhr.send(formData)
            }
          },

          // prop内传入的的config
          ...this.config, 
          
          // 挂载的DOM对象
          selector: `#${this.Id}`,
          setup: (editor) => {
            // 抛出 'on-ready' 事件钩子
            editor.on(
              'init', () => {
                self.loading = false
                self.$emit('on-ready')
                editor.setContent(self.value)
              }
            )
            // 抛出 'input' 事件钩子，同步value数据
            editor.on(
              'input change undo redo', () => {
                self.$emit('input', editor.getContent())
              }
            )
          }
        })
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">:id</span>= <span class="hljs-string">"Id"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> <span class="hljs-string">'./zh_CN.js'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">const</span> Id = <span class="hljs-built_in">Date</span>.now()
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">Id</span>: Id,
        <span class="hljs-attr">Editor</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">DefaultConfig</span>: {
          <span class="hljs-comment">// GLOBAL</span>
          height: <span class="hljs-number">500</span>,
          <span class="hljs-attr">theme</span>: <span class="hljs-string">'modern'</span>,
          <span class="hljs-attr">menubar</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">toolbar</span>: <span class="hljs-string">`styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `</span>,
          <span class="hljs-attr">plugins</span>: <span class="hljs-string">`
            paste
            importcss
            image
            code
            table
            advlist
            fullscreen
            link
            media
            lists
            textcolor
            colorpicker
            hr
            preview
          `</span>,

          
          <span class="hljs-comment">// CONFIG</span>

          forced_root_block: <span class="hljs-string">'p'</span>,
          <span class="hljs-attr">force_p_newlines</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">importcss_append</span>: <span class="hljs-literal">true</span>,

        <span class="hljs-comment">// CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了</span>
          content_style: <span class="hljs-string">`
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `</span>,

          <span class="hljs-attr">insert_button_items</span>: <span class="hljs-string">'image link | inserttable'</span>,

          <span class="hljs-comment">// CONFIG: Paste</span>
          paste_retain_style_properties: <span class="hljs-string">'all'</span>,
          <span class="hljs-attr">paste_word_valid_elements</span>: <span class="hljs-string">'*[*]'</span>,        <span class="hljs-comment">// word需要它</span>
          paste_data_images: <span class="hljs-literal">true</span>,                  <span class="hljs-comment">// 粘贴的同时能把内容里的图片自动上传，非常强力的功能</span>
          paste_convert_word_fake_lists: <span class="hljs-literal">false</span>,     <span class="hljs-comment">// 插入word文档需要该属性</span>
          paste_webkit_styles: <span class="hljs-string">'all'</span>,
          <span class="hljs-attr">paste_merge_formats</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">nonbreaking_force_tab</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">paste_auto_cleanup_on_paste</span>: <span class="hljs-literal">false</span>,

          <span class="hljs-comment">// CONFIG: Font</span>
          fontsize_formats: <span class="hljs-string">'10px 11px 12px 14px 16px 18px 20px 24px'</span>,

          <span class="hljs-comment">// CONFIG: StyleSelect</span>
          style_formats: [
            {
              <span class="hljs-attr">title</span>: <span class="hljs-string">'首行缩进'</span>,
              <span class="hljs-attr">block</span>: <span class="hljs-string">'p'</span>,
              <span class="hljs-attr">styles</span>: { <span class="hljs-string">'text-indent'</span>: <span class="hljs-string">'2em'</span> }
            },
            {
              <span class="hljs-attr">title</span>: <span class="hljs-string">'行高'</span>,
              <span class="hljs-attr">items</span>: [
                {<span class="hljs-attr">title</span>: <span class="hljs-string">'1'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'1'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>},
                {<span class="hljs-attr">title</span>: <span class="hljs-string">'1.5'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'1.5'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>},
                {<span class="hljs-attr">title</span>: <span class="hljs-string">'2'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'2'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>},
                {<span class="hljs-attr">title</span>: <span class="hljs-string">'2.5'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'2.5'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>},
                {<span class="hljs-attr">title</span>: <span class="hljs-string">'3'</span>, <span class="hljs-attr">styles</span>: { <span class="hljs-string">'line-height'</span>: <span class="hljs-string">'3'</span> }, <span class="hljs-attr">inline</span>: <span class="hljs-string">'span'</span>}
              ]
            }
          ],

          <span class="hljs-comment">// FontSelect</span>
          font_formats: <span class="hljs-string">`
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`</span>,

          <span class="hljs-comment">// Tab</span>
          tabfocus_elements: <span class="hljs-string">':prev,:next'</span>,
          <span class="hljs-attr">object_resizing</span>: <span class="hljs-literal">true</span>,

          <span class="hljs-comment">// Image</span>
          imagetools_toolbar: <span class="hljs-string">'rotateleft rotateright | flipv fliph | editimage imageoptions'</span>
        }
      }
    },
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">value</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
      },
      <span class="hljs-attr">config</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">theme</span>: <span class="hljs-string">'modern'</span>,
            <span class="hljs-attr">height</span>: <span class="hljs-number">300</span>
          }
        }
      },
      <span class="hljs-attr">url</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
      },
      <span class="hljs-attr">accept</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-string">'image/jpeg, image/png'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
      },
      <span class="hljs-attr">maxSize</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-number">2097152</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>
      },
      <span class="hljs-attr">withCredentials</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>
      }
    },
    mounted () {
      <span class="hljs-keyword">this</span>.init()
    },
    beforeDestroy () {
      <span class="hljs-comment">// 销毁tinymce</span>
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'on-destroy'</span>)
      <span class="hljs-built_in">window</span>.tinymce.remove(<span class="hljs-string">`$#{this.Id}`</span>)
    },
    <span class="hljs-attr">methods</span>: {
       init () {
        <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>
        
        <span class="hljs-keyword">this</span>.Editor = <span class="hljs-built_in">window</span>.tinymce.init({
          <span class="hljs-comment">// 默认配置</span>
          ...this.DefaultConfig,
          
          <span class="hljs-comment">// 图片上传</span>
          images_upload_handler: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">blobInfo, success, failure</span>) </span>{
            <span class="hljs-keyword">if</span> (blobInfo.blob().size &gt; self.maxSize) {
              failure(<span class="hljs-string">'文件体积过大'</span>)
            }
            
            <span class="hljs-keyword">if</span> (self.accept.indexOf(blobInfo.blob().type) &gt; <span class="hljs-number">0</span>) {
              uploadPic()
            } <span class="hljs-keyword">else</span> {
              failure(<span class="hljs-string">'图片格式错误'</span>)
            }
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uploadPic</span> (<span class="hljs-params"></span>) </span>{
              <span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest()
              <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> FormData()
              xhr.withCredentials = self.withCredentials
              xhr.open(<span class="hljs-string">'POST'</span>, self.url)
              xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

                <span class="hljs-keyword">if</span> (xhr.status !== <span class="hljs-number">200</span>) {
                  <span class="hljs-comment">// 抛出 'on-upload-fail' 钩子</span>
                  self.$emit(<span class="hljs-string">'on-upload-fail'</span>)
                  failure(<span class="hljs-string">'上传失败: '</span> + xhr.status)
                  <span class="hljs-keyword">return</span>
                }

                <span class="hljs-keyword">const</span> json = <span class="hljs-built_in">JSON</span>.parse(xhr.responseText)
                <span class="hljs-comment">// 抛出 'on-upload-complete' 钩子</span>
                self.$emit(<span class="hljs-string">'on-upload-complete'</span> , [
                  json, success, failure
                ])
              }
              formData.append(<span class="hljs-string">'file'</span>, blobInfo.blob())
              xhr.send(formData)
            }
          },

          <span class="hljs-comment">// prop内传入的的config</span>
          ...this.config, 
          
          <span class="hljs-comment">// 挂载的DOM对象</span>
          selector: <span class="hljs-string">`#<span class="hljs-subst">${<span class="hljs-keyword">this</span>.Id}</span>`</span>,
          <span class="hljs-attr">setup</span>: <span class="hljs-function">(<span class="hljs-params">editor</span>) =&gt;</span> {
            <span class="hljs-comment">// 抛出 'on-ready' 事件钩子</span>
            editor.on(
              <span class="hljs-string">'init'</span>, () =&gt; {
                self.loading = <span class="hljs-literal">false</span>
                self.$emit(<span class="hljs-string">'on-ready'</span>)
                editor.setContent(self.value)
              }
            )
            <span class="hljs-comment">// 抛出 'input' 事件钩子，同步value数据</span>
            editor.on(
              <span class="hljs-string">'input change undo redo'</span>, () =&gt; {
                self.$emit(<span class="hljs-string">'input'</span>, editor.getContent())
              }
            )
          }
        })
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>直接引入组件调用就行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <mce-editor 
    :config           = &quot;Config&quot;
     v-model          = &quot;Value&quot;
    :url              = &quot;Url&quot;
    :max-size         = &quot;MaxSize&quot;
    :accept           = &quot;Accept&quot;
    :with-credentials = false
    @on-ready         = &quot;onEditorReady&quot;
    @on-destroy       = &quot;onEditorDestroy&quot;
    @on-upload-success= &quot;onEditorUploadComplete&quot;
    @on-upload-fail   = &quot;onEditorUploadFail&quot;
  ></mce-editor>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&lt;template&gt;
  &lt;mce-editor 
    :config           = <span class="hljs-string">"Config"</span>
     v-model          = <span class="hljs-string">"Value"</span>
    :url              = <span class="hljs-string">"Url"</span>
    :<span class="hljs-built_in">max</span>-size         = <span class="hljs-string">"MaxSize"</span>
    :accept           = <span class="hljs-string">"Accept"</span>
    :<span class="hljs-keyword">with</span>-credentials = <span class="hljs-literal">false</span>
    @<span class="hljs-keyword">on</span>-ready         = <span class="hljs-string">"onEditorReady"</span>
    @<span class="hljs-keyword">on</span>-destroy       = <span class="hljs-string">"onEditorDestroy"</span>
    @<span class="hljs-keyword">on</span>-upload-success= <span class="hljs-string">"onEditorUploadComplete"</span>
    @<span class="hljs-keyword">on</span>-upload-fail   = <span class="hljs-string">"onEditorUploadFail"</span>
  &gt;&lt;/mce-editor&gt;
&lt;/template&gt;
</code></pre>
<p>但是作为一名优秀的程序员，这怎么可能够嘛。 <br>下面说下打包的事情</p>
<h1 id="articleHeader6">塞入webpack</h1>
<p>为了加快页面载入速度就要首先解决载入文件过多的问题，而大部分时间用户并不需要每次打开页面都先加载一遍editor的核心文件，而editor本身也要按需加载内容，一开始想把每个plugin都搞成独立组件模块按需载入，但是这就要涉及到修改编辑器本身源码，或者说对window.tinymce删掉点特性，这些都太麻烦也都有风险，对后面的代码维护影响也大，索性就都先留着。<br>后面边做边改吧</p>
<p>还是以<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>为例<br>把官网下载的包塞到<code>stataic</code>文件夹中<br>然后删掉<code>index.html</code>模版中的cdn代码吧不需要了<br>当然这里有俩选择<br>要么做成一个<a href="https://cn.vuejs.org/v2/guide/components.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">异步组件</a>，单独打包，按需载入<br>要么直接引入到<code>main.js</code>中将包打成为一个巨无霸<br>所以我选择前者，</p>
<p>首先老规矩 引入编辑器主体</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import '../../static/tinymce/tinymce.min.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'../../static/tinymce/tinymce.min.js'</span></code></pre>
<p>然后刷新下页面，不出意外应该是报这么个错<code>Uncaught SyntaxError: Unexpected token &lt;</code><br>眼尖的朋友应该知道是怎么回事了<code>theme.js:1</code><br>在默认配置下， tinymce载入的theme的路径居然是这个<br><code>Request URL:http://localhost:8080/themes/modern/theme.js</code><br>然后我跑去官网搜了下api 只搜到一个叫<a href="https://www.tinymce.com/docs/configure/url-handling/#document_base_url" rel="nofollow noreferrer" target="_blank">document_base_url</a>的api，但是根据多年程序员的直觉经验告诉我 不是这货（嗯，我在这里卡住了），网上翻了下各地文献，都没有啊，<br>那怎么办呢<br>于是我就跑去看源码...但是4万行...算了...<br>然后我就在控台打印了下tinymce对象，然后发现了一个叫<code>baseURL</code>的<code>string</code>对象，嗯，有希望了。<br>在源码里搜了下baseURL<br>蹦出来这段代码 .... 算了有很多段...<br>大致思想就是通过当前URI拆出来个baseURL,改掉就行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.tinymce.baseURL = '/static/tinymce'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.tinymce.baseURL = <span class="hljs-string">'/static/tinymce'</span></code></pre>
<p>如果需要载入的地址是另一个比如自己公司的cdn的路径，那改成全路径就行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.tinymce.baseURL = 'http://cdn.xxx.com/static/tinymce'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.tinymce.baseURL = <span class="hljs-string">'http://cdn.xxx.com/static/tinymce'</span></code></pre>
<p>貌似路径的问题解决了</p>
<p>但是新的问题又出现了，<br>插件下过来都是带min的，但默认载入的插件都是不带min的，一定是我源码没看仔细，<br>然后我又搜了一下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!baseURL &amp;&amp; document.currentScript) {
  src = document.currentScript.src;
  if (src.indexOf('.min') != -1) {
    suffix = '.min';
  }

  baseURL = src.substring(0, src.lastIndexOf('/'));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!baseURL &amp;&amp; <span class="hljs-built_in">document</span>.currentScript) {
  src = <span class="hljs-built_in">document</span>.currentScript.src;
  <span class="hljs-keyword">if</span> (src.indexOf(<span class="hljs-string">'.min'</span>) != <span class="hljs-number">-1</span>) {
    suffix = <span class="hljs-string">'.min'</span>;
  }

  baseURL = src.substring(<span class="hljs-number">0</span>, src.lastIndexOf(<span class="hljs-string">'/'</span>));
}</code></pre>
<p>希望就在眼前，貌似是业务我载入的方式是直接导入到模块的，于是一个叫<code>suffix</code>的默认值为空了，于是我去又加了行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.tinymce.suffix = '.min'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">window<span class="hljs-selector-class">.tinymce</span><span class="hljs-selector-class">.suffix</span> = <span class="hljs-string">'.min'</span></code></pre>
<p>成功！<br>你看嘛，超级简单的是不是，根本不用改源码，网上说的动不动就去改源码什么的不要信啊不要信，大部分面向对象的事情改个默认值就行了。</p>
<p>对了,还记得前面的语言包嘛，<br>下过来塞到<code>/static/tinymce/langs</code>文件夹里<br>然后删掉</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './zh_CN.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'./zh_CN.js'</span></code></pre>
<p>这行代码<br>在<code>DefaultConfig</code>中放入一个新配置项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="language: 'zh_CN'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">language:</span> <span class="hljs-string">'zh_CN'</span></code></pre>
<p>好了，后面就是模块打包的事情了,</p>
<h2 id="articleHeader7">打包</h2>
<p>前面打的包有一个问题是默认配置是载入tinyMce本体，那么就会造成这个包大概有500k的体积，如果这个组件不做异步载入的处理，那么对于某些业务来说就是灾难。虽然这么做打开只用载入一个文件，业务比较稳定。<br>但我觉得这样不优雅所以最后还是把它单独拎出来了。<br>同理，根据这个库本身的特性，我们完全可以把这么多个必须的<code>plugin</code>按需要直接统一打成一个包，直接载入。这样，我们就又多了一个几百k的plugins包。<br>然后把<code>plugins包和tinyMce主体包</code>在不阻塞页面加载的情况下，做个懒加载提前缓存好文件方便后面使用，而组件本身在挂载前做个监听window.tinymce全局变量的方法，然后cdn控制下文件的过期时间即可。<br>这样，在保证了灵活度的前提下也保证了业务载入的速度。</p>
<p>完，感谢阅读。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目移植tinymce踩坑

## 原文链接
[https://segmentfault.com/a/1190000012791569](https://segmentfault.com/a/1190000012791569)

