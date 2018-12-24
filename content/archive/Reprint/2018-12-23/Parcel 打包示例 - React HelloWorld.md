---
title: 'Parcel 打包示例 - React HelloWorld' 
date: 2018-12-23 2:30:07
hidden: true
slug: ey21i90iajt
categories: [reprint]
---

{{< raw >}}

                    
<p>使用 <a href="https://parceljs.org/" rel="nofollow noreferrer" target="_blank">Parcel</a> 打包的 React HelloWorld 应用。GitHub 地址: <a href="https://github.com/justjavac/parcel-example/tree/master/react-helloworld" rel="nofollow noreferrer" target="_blank">https://github.com/justjavac/...</a></p>
<h2 id="articleHeader0">0. 新建目录</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir react-helloworld
cd react-helloworld
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">mkdir</span> react-helloworld
<span class="hljs-built_in">cd</span> react-helloworld
</code></pre>
<h2 id="articleHeader1">1. 初始化 npm</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn init -y
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">yarn init -y</span>
</code></pre>
<p>或</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init -y
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> init -y
</code></pre>
<p>此时会创建要给 package.json 文件，文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;parcel-example-react-helloworld&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;keywords&quot;: [],
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"parcel-example-react-helloworld"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"keywords"</span>: [],
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>
}</code></pre>
<h2 id="articleHeader2">2. 添加 React</h2>
<p>yarn：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add react react-dom
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">add</span><span class="bash"> react react-dom
</span></code></pre>
<p>npm:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react react-dom --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> react react-dom <span class="hljs-comment">--save</span>
</code></pre>
<p>package.json 文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
   &quot;name&quot;: &quot;parcel-example-react-helloworld&quot;,
   &quot;version&quot;: &quot;1.0.0&quot;,
   &quot;description&quot;: &quot;&quot;,
   &quot;main&quot;: &quot;index.js&quot;,
   &quot;scripts&quot;: {
     &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
   },
   &quot;keywords&quot;: [],
   &quot;author&quot;: &quot;&quot;,
-  &quot;license&quot;: &quot;ISC&quot;
+  &quot;license&quot;: &quot;ISC&quot;,
+  &quot;dependencies&quot;: {
+    &quot;react&quot;: &quot;^16.2.0&quot;,
+    &quot;react-dom&quot;: &quot;^16.2.0&quot;
+  }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"> {
   "name": "parcel-example-react-helloworld",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
     "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
   },
   "keywords": [],
   "author": "",
<span class="hljs-deletion">-  "license": "ISC"</span>
<span class="hljs-addition">+  "license": "ISC",</span>
<span class="hljs-addition">+  "dependencies": {</span>
<span class="hljs-addition">+    "react": "^16.2.0",</span>
<span class="hljs-addition">+    "react-dom": "^16.2.0"</span>
<span class="hljs-addition">+  }</span>
 }</code></pre>
<h2 id="articleHeader3">3. 添加 Babel</h2>
<p>新建 .babelrc 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch .babelrc
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>touch <span class="hljs-selector-class">.babelrc</span>
</code></pre>
<p>输入内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;react&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"react"</span>]
}</code></pre>
<p>添加 babel-preset-react：</p>
<p>yarn：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add babel-preset-react -D
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">add</span><span class="bash"> babel-preset-react -D
</span></code></pre>
<p>npm:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-preset-react --D
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-preset-react </span>--D
</code></pre>
<p>此时 package.json 文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
   &quot;name&quot;: &quot;parcel-example-react-helloworld&quot;,
   &quot;version&quot;: &quot;1.0.0&quot;,
   &quot;description&quot;: &quot;&quot;,
   &quot;main&quot;: &quot;index.js&quot;,
   &quot;scripts&quot;: {
     &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
   },
   &quot;keywords&quot;: [],
   &quot;author&quot;: &quot;&quot;,
   &quot;license&quot;: &quot;ISC&quot;,
   &quot;dependencies&quot;: {
     &quot;react&quot;: &quot;^16.2.0&quot;,
     &quot;react-dom&quot;: &quot;^16.2.0&quot;
-   }
+   },
+   &quot;devDependencies&quot;: {
+     &quot;babel-preset-react&quot;: &quot;^6.24.1&quot;
+   }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"> {
   "name": "parcel-example-react-helloworld",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
     "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "dependencies": {
     "react": "^16.2.0",
     "react-dom": "^16.2.0"
<span class="hljs-deletion">-   }</span>
<span class="hljs-addition">+   },</span>
<span class="hljs-addition">+   "devDependencies": {</span>
<span class="hljs-addition">+     "babel-preset-react": "^6.24.1"</span>
<span class="hljs-addition">+   }</span>
 }</code></pre>
<h2 id="articleHeader4">5. 添加 Parcel</h2>
<p>yarn：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add parcel-bundler -D
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">add</span><span class="bash"> parcel-bundler -D
</span></code></pre>
<p>npm:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install parcel-bundler --D
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span>parcel-<span class="hljs-keyword">bundler </span>--D
</code></pre>
<p>此时 package.json 文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
   &quot;name&quot;: &quot;parcel-example-react-helloworld&quot;,
   &quot;version&quot;: &quot;1.0.0&quot;,
   &quot;description&quot;: &quot;&quot;,
   &quot;main&quot;: &quot;index.js&quot;,
   &quot;scripts&quot;: {
     &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
   },
   &quot;keywords&quot;: [],
   &quot;author&quot;: &quot;&quot;,
   &quot;license&quot;: &quot;ISC&quot;,
   &quot;dependencies&quot;: {
     &quot;react&quot;: &quot;^16.2.0&quot;,
     &quot;react-dom&quot;: &quot;^16.2.0&quot;
    },
    &quot;devDependencies&quot;: {
-      &quot;babel-preset-react&quot;: &quot;^6.24.1&quot;
+      &quot;babel-preset-react&quot;: &quot;^6.24.1&quot;,
+      &quot;parcel-bundler&quot;: &quot;^1.0.3&quot;    
    }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"> {
   "name": "parcel-example-react-helloworld",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
     "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "dependencies": {
     "react": "^16.2.0",
     "react-dom": "^16.2.0"
    },
    "devDependencies": {
<span class="hljs-deletion">-      "babel-preset-react": "^6.24.1"</span>
<span class="hljs-addition">+      "babel-preset-react": "^6.24.1",</span>
<span class="hljs-addition">+      "parcel-bundler": "^1.0.3"    </span>
    }
 }</code></pre>
<h2 id="articleHeader5">6. 新建 index.html 文件</h2>
<p>内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>

<body>
    <div id=&quot;root&quot;></div>
    <script src=&quot;./index.js&quot;></script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader6">7. 新建 index.js 文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom&quot;;

const App = () => {
  return <h1>Hello World!</h1>;
};

ReactDOM.render(<App />, document.getElementById(&quot;root&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">"react-dom"</span>;

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
};

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById("root"));</span></code></pre>
<h2 id="articleHeader7">8. 添加打包命令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
   &quot;name&quot;: &quot;parcel-example-react-helloworld&quot;,
   &quot;version&quot;: &quot;1.0.0&quot;,
   &quot;description&quot;: &quot;&quot;,
   &quot;main&quot;: &quot;index.js&quot;,
   &quot;scripts&quot;: {
-    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
+    &quot;start&quot;: &quot;parcel index.html&quot;
   },
   &quot;keywords&quot;: [],
   &quot;author&quot;: &quot;&quot;,
   &quot;license&quot;: &quot;ISC&quot;,
   &quot;dependencies&quot;: {
     &quot;react&quot;: &quot;^16.2.0&quot;,
     &quot;react-dom&quot;: &quot;^16.2.0&quot;
    },
    &quot;devDependencies&quot;: {
       &quot;babel-preset-react&quot;: &quot;^6.24.1&quot;
       &quot;babel-preset-react&quot;: &quot;^6.24.1&quot;,
       &quot;parcel-bundler&quot;: &quot;^1.0.3&quot;    
    }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"> {
   "name": "parcel-example-react-helloworld",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
<span class="hljs-deletion">-    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
<span class="hljs-addition">+    "start": "parcel index.html"</span>
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "dependencies": {
     "react": "^16.2.0",
     "react-dom": "^16.2.0"
    },
    "devDependencies": {
       "babel-preset-react": "^6.24.1"
       "babel-preset-react": "^6.24.1",
       "parcel-bundler": "^1.0.3"    
    }
 }</code></pre>
<h2 id="articleHeader8">9. 完成</h2>
<p>运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>yarn <span class="hljs-literal">start</span>
</code></pre>
<p>或</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> start
</code></pre>
<p>在浏览器中打开 <a href="http://localhost:1234" rel="nofollow noreferrer" target="_blank">http://localhost:1234</a></p>
<p>打包过程会生产 .cache 和 dist 两个目录，如果是 git 工程，可以新建 .gitignore 文件忽略这两个目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cache
dist
node_modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>.<span class="hljs-keyword">cache
</span><span class="hljs-keyword">dist
</span>node_modules</code></pre>
<p>GitHub 地址: <a href="https://github.com/justjavac/parcel-example/tree/master/react-helloworld" rel="nofollow noreferrer" target="_blank">https://github.com/justjavac/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Parcel 打包示例 - React HelloWorld

## 原文链接
[https://segmentfault.com/a/1190000012327384](https://segmentfault.com/a/1190000012327384)

