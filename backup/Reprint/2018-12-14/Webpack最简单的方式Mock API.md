---
title: 'Webpack最简单的方式Mock API' 
date: 2018-12-14 2:30:11
hidden: true
slug: 3tlutcizm4y
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/jaywcjlove/webpack-api-mocker" rel="nofollow noreferrer" target="_blank">webpack-api-mocker</a> 是一个为 REST API 创建 mock 的 <a href="https://github.com/webpack/webpack-dev-server" rel="nofollow noreferrer" target="_blank">webpack-dev-server</a> 中间件。 当您尝试在没有实际的 REST API 服务器的情况下，测试您的应用程序时，这将会很有帮助。</p>
<h2 id="articleHeader0">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-api-mocker --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install webpack-api-mocker --save-dev</code></pre>
<h2 id="articleHeader1">使用</h2>
<p>定义API，假设我们讲API放到一个独立文件 <code>mocker/index.js</code> 中, 下面我们定义四个 <code>API</code>，每个 <code>API</code> 都放到 <code>json</code> 的 <code>key</code> 和 <code>value</code> 中，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const proxy = {
  'GET /api/user': {id: 1, username: 'kenny', sex: 6 },
  'GET /api/user/list': [
    {id: 1, username: 'kenny', sex: 6 },
    {id: 2, username: 'kenny', sex: 6 }
  ],
  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' &amp;&amp; username === 'admin') {
      return res.send({
        status: 'ok',
        code: 0,
        token: &quot;sdfsdfsdfdsf&quot;,
        data: {id: 1, username: 'kenny', sex: 6 }
      });
    } else {
      return res.send({status: 'error', code: 403 });
    }
  },
  'DELETE /api/user/:id': (req, res) => {
    console.log('---->', req.body)
    console.log('---->', req.params.id)
    res.send({ status: 'ok', message: '删除成功！' });
  }
}
module.exports = proxy;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> proxy = {
  <span class="hljs-string">'GET /api/user'</span>: {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">username</span>: <span class="hljs-string">'kenny'</span>, <span class="hljs-attr">sex</span>: <span class="hljs-number">6</span> },
  <span class="hljs-string">'GET /api/user/list'</span>: [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">username</span>: <span class="hljs-string">'kenny'</span>, <span class="hljs-attr">sex</span>: <span class="hljs-number">6</span> },
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">username</span>: <span class="hljs-string">'kenny'</span>, <span class="hljs-attr">sex</span>: <span class="hljs-number">6</span> }
  ],
  <span class="hljs-string">'POST /api/login/account'</span>: <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { password, username } = req.body;
    <span class="hljs-keyword">if</span> (password === <span class="hljs-string">'888888'</span> &amp;&amp; username === <span class="hljs-string">'admin'</span>) {
      <span class="hljs-keyword">return</span> res.send({
        <span class="hljs-attr">status</span>: <span class="hljs-string">'ok'</span>,
        <span class="hljs-attr">code</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">token</span>: <span class="hljs-string">"sdfsdfsdfdsf"</span>,
        <span class="hljs-attr">data</span>: {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">username</span>: <span class="hljs-string">'kenny'</span>, <span class="hljs-attr">sex</span>: <span class="hljs-number">6</span> }
      });
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> res.send({<span class="hljs-attr">status</span>: <span class="hljs-string">'error'</span>, <span class="hljs-attr">code</span>: <span class="hljs-number">403</span> });
    }
  },
  <span class="hljs-string">'DELETE /api/user/:id'</span>: <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'----&gt;'</span>, req.body)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'----&gt;'</span>, req.params.id)
    res.send({ <span class="hljs-attr">status</span>: <span class="hljs-string">'ok'</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">'删除成功！'</span> });
  }
}
<span class="hljs-built_in">module</span>.exports = proxy;</code></pre>
<p>上面的 <code>key</code> 比较特殊，由 <code>methd</code> 和 <code>path</code> 组合，中间一个空格间隔，如：<code>GET /api/user</code>。<code>value</code> 可以是 <code>json</code> 或者 <code>函数</code>。</p>
<h2 id="articleHeader2">在 Webpack 中使用</h2>
<p>要在你的 <code>Webpack</code> 项目中使用 <code>api mocker</code>，只需将设置选项，添加到你的 <a href="https://github.com/webpack/webpack-dev-server" rel="nofollow noreferrer" target="_blank">webpack-dev-server</a> 选项中即可：</p>
<p>改变你的配置文件，告诉dev服务器在哪里查找文件：webpack.config.js。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const apiMocker = require('webpack-api-mocker');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
+ devServer: {
+   ...
+   before(app){
+     apiMocker(app, path.resolve('./mocker/index.js'), {
+       proxy: {
+         '/repos/*': 'https://api.github.com/',
+       },
+       changeHost: true,
+     })
+   }
+ },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
<span class="hljs-addition">+ const apiMocker = require('webpack-api-mocker');</span>

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
<span class="hljs-addition">+ devServer: {</span>
<span class="hljs-addition">+   ...</span>
<span class="hljs-addition">+   before(app){</span>
<span class="hljs-addition">+     apiMocker(app, path.resolve('./mocker/index.js'), {</span>
<span class="hljs-addition">+       proxy: {</span>
<span class="hljs-addition">+         '/repos/*': 'https://api.github.com/',</span>
<span class="hljs-addition">+       },</span>
<span class="hljs-addition">+       changeHost: true,</span>
<span class="hljs-addition">+     })</span>
<span class="hljs-addition">+   }</span>
<span class="hljs-addition">+ },</span>
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};</code></pre>
<p>模拟API代理变得简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  before(app){
+   apiMocker(app, path.resolve('./mocker/index.js'), {
+     proxy: {
+       '/repos/*': 'https://api.github.com/',
+     },
+     changeHost: true,
+   })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">{
  before(app){
<span class="hljs-addition">+   apiMocker(app, path.resolve('./mocker/index.js'), {</span>
<span class="hljs-addition">+     proxy: {</span>
<span class="hljs-addition">+       '/repos/*': 'https://api.github.com/',</span>
<span class="hljs-addition">+     },</span>
<span class="hljs-addition">+     changeHost: true,</span>
<span class="hljs-addition">+   })</span>
  }
}
</code></pre>
<p>让我们添加一个脚本来轻松运行开发服务器：</p>
<p>修改 <code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;development&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;webpack.config.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;watch&quot;: &quot;webpack --progress --watch&quot;,
+   &quot;start&quot;: &quot;webpack-dev-server --open&quot;,
    &quot;build&quot;: &quot;webpack&quot;
  },
  &quot;keywords&quot;: [],
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;clean-webpack-plugin&quot;: &quot;^0.1.16&quot;,
    &quot;css-loader&quot;: &quot;^0.28.4&quot;,
    &quot;csv-loader&quot;: &quot;^2.1.1&quot;,
    &quot;file-loader&quot;: &quot;^0.11.2&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^2.29.0&quot;,
    &quot;style-loader&quot;: &quot;^0.18.2&quot;,
    &quot;webpack&quot;: &quot;^3.0.0&quot;,
    &quot;xml-loader&quot;: &quot;^1.2.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">{
  "name": "development",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",
    "watch": "webpack --progress --watch",
<span class="hljs-addition">+   "start": "webpack-dev-server --open",</span>
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.16",
    "css-loader": "^0.28.4",
    "csv-loader": "^2.1.1",
    "file-loader": "^0.11.2",
    "html-webpack-plugin": "^2.29.0",
    "style-loader": "^0.18.2",
    "webpack": "^3.0.0",
    "xml-loader": "^1.2.1"
  }
}</code></pre>
<p>运行下面命令，跑起来，通过工具测试一下你模拟的API是否能返回结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm run start</code></pre>
<h2 id="articleHeader3">Express 中使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const express = require('express');
+ const apiMocker = require('webpack-api-mocker');

const app = express();

+ apiMocker(app, path.resolve('./mocker/index.js'))
app.listen(8080);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">const path = require('path');
const express = require('express');
<span class="hljs-addition">+ const apiMocker = require('webpack-api-mocker');</span>

const app = express();

<span class="hljs-addition">+ apiMocker(app, path.resolve('./mocker/index.js'))</span>
app.listen(8080);</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack最简单的方式Mock API

## 原文链接
[https://segmentfault.com/a/1190000013220134](https://segmentfault.com/a/1190000013220134)

