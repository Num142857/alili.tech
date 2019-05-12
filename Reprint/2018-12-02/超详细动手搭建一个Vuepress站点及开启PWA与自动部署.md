---
title: '超详细动手搭建一个Vuepress站点及开启PWA与自动部署' 
date: 2018-12-02 2:30:15
hidden: true
slug: 2oial1cia9z
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">超详细动手搭建一个Vuepress站点及开启PWA与自动部署</h1>
<blockquote>五一之前就想写一篇关于Vuepress的文章,结果朋友结婚就不了了之了。<p>记得最后一定要看注意事项！</p>
</blockquote>
<h2 id="articleHeader1">Vuepress介绍</h2>
<p>官网：<a href="https://vuepress.vuejs.org/" rel="nofollow noreferrer" target="_blank">https://vuepress.vuejs.org/</a></p>
<p>类似hexo一个极简的静态网站生成器,用来写技术文档不能在爽。当然搭建成博客也不成问题。</p>
<h2 id="articleHeader2">Vuepress特点</h2>
<ul>
<li>响应式,也可以自定义主题与hexo类似</li>
<li>内置markdown(还增加了一些扩展),并且可以在其使用Vue组件</li>
<li>Google Analytics 集成</li>
<li>PWA 自动生成Service Worker</li>
</ul>
<h2 id="articleHeader3">快速上手</h2>
<h3 id="articleHeader4">安装</h3>
<p>初始化项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn init -y
# 或者 npm init -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code class="shell"><span class="hljs-attribute">yarn</span> init -y
<span class="hljs-comment"># 或者 npm init -y</span></code></pre>
<p>安装vuepress</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add -D vuepress
# 或者 npm install -D vuepress" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell">yarn <span class="hljs-keyword">add</span><span class="bash"> -D vuepress
</span><span class="hljs-comment"># 或者 npm install -D vuepress</span></code></pre>
<p>全局安装vuepress</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn global add vuepress
# 或者 npm install -g vuepress" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell">yarn global <span class="hljs-keyword">add</span><span class="bash"> vuepress
</span><span class="hljs-comment"># 或者 npm install -g vuepress</span></code></pre>
<p>新建一个docs文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir docs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">mkdir</span> docs</code></pre>
<p>设置下package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;docs:dev&quot;: &quot;vuepress dev docs&quot;,
    &quot;docs:build&quot;: &quot;vuepress build docs&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code class="shell">{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"docs:dev"</span>: <span class="hljs-string">"vuepress dev docs"</span>,
    <span class="hljs-attr">"docs:build"</span>: <span class="hljs-string">"vuepress build docs"</span>
  }
}</code></pre>
<h3 id="articleHeader5">写作</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn docs:dev # 或者：npm run docs:dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">yarn</span> <span class="hljs-selector-tag">docs</span><span class="hljs-selector-pseudo">:dev</span> # 或者：<span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">run</span> <span class="hljs-selector-tag">docs</span><span class="hljs-selector-pseudo">:dev</span></code></pre>
<p>也就是运行开发环境,直接去docs文件下书写文章就可以,打开<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/可以预览</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014746661" src="https://static.alili.tech/img/remote/1460000014746661" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">构建</h3>
<p>build生成静态的HTML文件,默认会在 <code>.vuepress/dist</code> 文件夹下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn docs:build # 或者：npm run docs:build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">yarn</span> <span class="hljs-selector-tag">docs</span><span class="hljs-selector-pseudo">:build</span> # 或者：<span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">run</span> <span class="hljs-selector-tag">docs</span><span class="hljs-selector-pseudo">:build</span></code></pre>
<h2 id="articleHeader7">基本配置</h2>
<p>在 <code>.vuepress</code>目录下新建一个<code>config.js</code>,他导出一个对象</p>
<p>一些配置可以参考<a href="https://vuepress.vuejs.org/config/#base" rel="nofollow noreferrer" target="_blank">官方文档</a>,这里我配置常用及必须配置的</p>
<h3 id="articleHeader8">网站信息</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  title: '游魂的文档',
  description: 'Document library',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">'游魂的文档'</span>,
  <span class="hljs-attr">description</span>: <span class="hljs-string">'Document library'</span>,
  <span class="hljs-attr">head</span>: [
    [<span class="hljs-string">'link'</span>, { <span class="hljs-attr">rel</span>: <span class="hljs-string">'icon'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">`/favicon.ico`</span> }],
  ],
}</code></pre>
<h3 id="articleHeader9">导航栏配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '前端规范', link: '/frontEnd/' },
      { text: '开发环境', link: '/development/' },
      { text: '学习文档', link: '/notes/' },
      { text: '游魂博客', link: 'https://www.iyouhun.com' },
      // 下拉列表的配置
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'English', link: '/language/English' }
        ]
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">themeConfig</span>: {
    <span class="hljs-attr">nav</span>: [
      { <span class="hljs-attr">text</span>: <span class="hljs-string">'主页'</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">'/'</span> },
      { <span class="hljs-attr">text</span>: <span class="hljs-string">'前端规范'</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">'/frontEnd/'</span> },
      { <span class="hljs-attr">text</span>: <span class="hljs-string">'开发环境'</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">'/development/'</span> },
      { <span class="hljs-attr">text</span>: <span class="hljs-string">'学习文档'</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">'/notes/'</span> },
      { <span class="hljs-attr">text</span>: <span class="hljs-string">'游魂博客'</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">'https://www.iyouhun.com'</span> },
      <span class="hljs-comment">// 下拉列表的配置</span>
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">'Languages'</span>,
        <span class="hljs-attr">items</span>: [
          { <span class="hljs-attr">text</span>: <span class="hljs-string">'Chinese'</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">'/language/chinese'</span> },
          { <span class="hljs-attr">text</span>: <span class="hljs-string">'English'</span>, <span class="hljs-attr">link</span>: <span class="hljs-string">'/language/English'</span> }
        ]
      }
    ]
  }
}</code></pre>
<p>如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014746662" src="https://static.alili.tech/img/remote/1460000014746662" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">侧边栏配置</h3>
<p>可以省略<code>.md</code>扩展名,同时以 <code>/</code> 结尾的路径将会被视为 <code>*/README.md</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  themeConfig: {
    sidebar: {
      '/frontEnd/': genSidebarConfig('前端开发规范'),
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">themeConfig</span>: {
    <span class="hljs-attr">sidebar</span>: {
      <span class="hljs-string">'/frontEnd/'</span>: genSidebarConfig(<span class="hljs-string">'前端开发规范'</span>),
    }
  }
}</code></pre>
<p>上面封装的<code>genSidebarConfig</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function genSidebarConfig(title) {
  return [{
    title,
    collapsable: false,
    children: [
      '',
      'html-standard',
      'css-standard',
      'js-standard',
      'git-standard'
    ]
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">genSidebarConfig</span>(<span class="hljs-params">title</span>) </span>{
  <span class="hljs-keyword">return</span> [{
    title,
    <span class="hljs-attr">collapsable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">children</span>: [
      <span class="hljs-string">''</span>,
      <span class="hljs-string">'html-standard'</span>,
      <span class="hljs-string">'css-standard'</span>,
      <span class="hljs-string">'js-standard'</span>,
      <span class="hljs-string">'git-standard'</span>
    ]
  }]
}</code></pre>
<p>支持侧边栏分组(可以用来做博客文章分类)  collapsable是当前分组是否展开</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  themeConfig: {
    sidebar: {
      '/note': [
        {
          title:'前端',
          collapsable: true,
          children:[
            '/notes/frontEnd/VueJS组件编码规范',
            '/notes/frontEnd/vue-cli脚手架快速搭建项目',
            '/notes/frontEnd/深入理解vue中的slot与slot-scope',
            '/notes/frontEnd/webpack入门',
            '/notes/frontEnd/PWA介绍及快速上手搭建一个PWA应用',
          ]
        },
        {
          title:'后端',
          collapsable: true,
          children:[
            'notes/backEnd/nginx入门',
            'notes/backEnd/CentOS如何挂载磁盘',
          ]
        },
      ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">themeConfig</span>: {
    <span class="hljs-attr">sidebar</span>: {
      <span class="hljs-string">'/note'</span>: [
        {
          <span class="hljs-attr">title</span>:<span class="hljs-string">'前端'</span>,
          <span class="hljs-attr">collapsable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">children</span>:[
            <span class="hljs-string">'/notes/frontEnd/VueJS组件编码规范'</span>,
            <span class="hljs-string">'/notes/frontEnd/vue-cli脚手架快速搭建项目'</span>,
            <span class="hljs-string">'/notes/frontEnd/深入理解vue中的slot与slot-scope'</span>,
            <span class="hljs-string">'/notes/frontEnd/webpack入门'</span>,
            <span class="hljs-string">'/notes/frontEnd/PWA介绍及快速上手搭建一个PWA应用'</span>,
          ]
        },
        {
          <span class="hljs-attr">title</span>:<span class="hljs-string">'后端'</span>,
          <span class="hljs-attr">collapsable</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">children</span>:[
            <span class="hljs-string">'notes/backEnd/nginx入门'</span>,
            <span class="hljs-string">'notes/backEnd/CentOS如何挂载磁盘'</span>,
          ]
        },
      ]
    }
  }
}</code></pre>
<p>如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014746663" src="https://static.alili.tech/img/remote/1460000014746663" alt="成品图" title="成品图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">默认主题修改</h2>
<h3 id="articleHeader12">主题色修改</h3>
<p>在<code>.vuepress</code>目录下的创建一个<code>override.styl</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$accentColor = #3eaf7c // 主题色
$textColor = #2c3e50 // 文字颜色
$borderColor = #eaecef // 边框颜色
$codeBgColor = #282c34 // 代码背景颜色" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">$<span class="hljs-selector-tag">accentColor</span> = <span class="hljs-selector-id">#3eaf7c</span> // 主题色
$<span class="hljs-selector-tag">textColor</span> = <span class="hljs-selector-id">#2c3e50</span> // 文字颜色
$<span class="hljs-selector-tag">borderColor</span> = <span class="hljs-selector-id">#eaecef</span> // 边框颜色
$<span class="hljs-selector-tag">codeBgColor</span> = <span class="hljs-selector-id">#282c34</span> // 代码背景颜色</code></pre>
<h3 id="articleHeader13">自定义页面类</h3>
<p>有时需要在不同的页面应用不同的css,可以先在该页面中声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="---
pageClass: custom-page-class
---" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="yaml hljs"><code class="yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">pageClass:</span> <span class="hljs-string">custom-page-class</span>
<span class="hljs-meta">---</span></code></pre>
<p>然后在<code>override.styl</code>中书写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".theme-container.custom-page-class {
  /* 特定页面的 CSS */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.theme-container</span><span class="hljs-selector-class">.custom-page-class</span> {
  <span class="hljs-comment">/* 特定页面的 CSS */</span>
}</code></pre>
<h2 id="articleHeader14">PWA设置</h2>
<p>设置serviceWorker为true,然后提供Manifest 和 icons,可以参考我之前的《<a href="https://segmentfault.com/a/1190000014639473">PWA介绍及快速上手搭建一个PWA应用</a>》</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    //增加manifest.json
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
  serviceWorker: true,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">head</span>: [
    [<span class="hljs-string">'link'</span>, { <span class="hljs-attr">rel</span>: <span class="hljs-string">'icon'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">`/favicon.ico`</span> }],
    <span class="hljs-comment">//增加manifest.json</span>
    [<span class="hljs-string">'link'</span>, { <span class="hljs-attr">rel</span>: <span class="hljs-string">'manifest'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">'/manifest.json'</span> }],
  ],
  <span class="hljs-attr">serviceWorker</span>: <span class="hljs-literal">true</span>,
}</code></pre>
<h2 id="articleHeader15">部署上线</h2>
<h3 id="articleHeader16">设置基础路径</h3>
<p>在<code>config.js</code>设置base<br>例如：你想要部署在<a href="https://foo.github.io" rel="nofollow noreferrer" target="_blank">https://foo.github.io</a> 那么设置base为<code>/</code>,base默认就为<code>/</code>,所以可以不用设置<br>想要部署在<a href="https://foo.github.io/bar/,%E9%82%A3%E4%B9%88" rel="nofollow noreferrer" target="_blank">https://foo.github.io/bar/,那么</a> <code>base</code> 应该被设置成 <code>"/bar/"</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  base: '/documents/',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">base</span>: <span class="hljs-string">'/documents/'</span>,
}</code></pre>
<p><code>base</code> 将会自动地作为前缀插入到所有以 <code>/</code> 开始的其他选项的链接中,所以你只需要指定一次。</p>
<h3 id="articleHeader17">构建与自动部署</h3>
<p>用<a href="https://github.com" rel="nofollow noreferrer" target="_blank">gitHub</a>的pages或者<a href="https://coding.net/r/O5YOFA" rel="nofollow noreferrer" target="_blank">coding</a>的pages都可以,也可以搭建在自己的服务器上。<br>将<code>dist</code>文件夹中的内容提交到git上或者上传到服务器就好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn docs:build # 或者：npm run docs:build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">yarn</span> <span class="hljs-selector-tag">docs</span><span class="hljs-selector-pseudo">:build</span> # 或者：<span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">run</span> <span class="hljs-selector-tag">docs</span><span class="hljs-selector-pseudo">:build</span></code></pre>
<blockquote>另外可以弄一个脚本,设置持续集成,在每次 push 代码时自动运行脚本</blockquote>
<p>deploy.sh</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="sh"><span class="hljs-meta">#!/usr/bin/env sh
</span>
<span class="hljs-comment"># 确保脚本抛出遇到的错误</span>
<span class="hljs-built_in">set</span> <span class="hljs-_">-e</span>

<span class="hljs-comment"># 生成静态文件</span>
npm run docs:build

<span class="hljs-comment"># 进入生成的文件夹</span>
<span class="hljs-built_in">cd</span> docs/.vuepress/dist

<span class="hljs-comment"># 如果是发布到自定义域名</span>
<span class="hljs-comment"># echo 'www.example.com' &gt; CNAME</span>

git init
git add -A
git commit -m <span class="hljs-string">'deploy'</span>

<span class="hljs-comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io</span>
<span class="hljs-comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master</span>

<span class="hljs-comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span>
git push <span class="hljs-_">-f</span> git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages

<span class="hljs-built_in">cd</span> -</code></pre>
<h2 id="articleHeader18">注意事项(坑)</h2>
<ul>
<li>把你想引用的资源都放在<code>.vuepress</code>目录下的<code>public</code>文件夹</li>
<li>给git仓库绑定了独立域名后,记得修改<code>base</code>路径</li>
<li>设置侧边栏分组后默认会自动生成 上/下一篇链接</li>
<li>设置了自动生成侧边栏会把侧边栏分组覆盖掉</li>
<li>设置PWA记得开启SSL</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
超详细动手搭建一个Vuepress站点及开启PWA与自动部署

## 原文链接
[https://segmentfault.com/a/1190000014746656](https://segmentfault.com/a/1190000014746656)

