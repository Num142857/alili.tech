---
title: '我的weex开发之路' 
date: 2019-01-11 2:30:08
hidden: true
slug: 3u5omb7xoka
categories: [reprint]
---

{{< raw >}}

                    
<h5>认识比较浅薄，单纯从使用方面入手，整理了两个半小时，有错误的地方还请指出。</h5>
<h1 id="articleHeader0">1. 构建项目</h1>
<p>创建一个项目之前，首先需要选取合适的工具，目前使用比较广的两个weex脚手架有weexpack和weex-toolkit。</p>
<h4>weex-toolkit（创建的weex项目没有ios和android包）</h4>
<ul>
<li><p>weex init weex 创建项目</p></li>
<li><p>修改weex.html文件，将<code>./node_modules/weex-vue-render/index.js</code>修改为<code>./node_modules/weex-vue-render/dist/index.js</code></p></li>
<li><p>cnpm install 加载依赖包</p></li>
<li><p>package.json中的scripts配置<code>"app": "npm run build &amp; npm run dev &amp; npm run server"</code></p></li>
<li><p>npm run app 启动项目</p></li>
</ul>
<p>目录结构如下图：<br><span class="img-wrap"><img data-src="/img/bVPAmL?w=420&amp;h=804" src="https://static.alili.tech/img/bVPAmL?w=420&amp;h=804" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>weexpack （创建的weex项目有ios和android包）</h4>
<ul>
<li><p>weexpack create weex 创建项目</p></li>
<li><p>weexpack platform add android 添加android</p></li>
<li><p>weexpack platform add ios 添加ios</p></li>
<li><p>weexpack run ios 模拟器运行</p></li>
</ul>
<p>目录结构如下图：<br><span class="img-wrap"><img data-src="/img/bVPAly?w=428&amp;h=1078" src="https://static.alili.tech/img/bVPAly?w=428&amp;h=1078" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>因为我们不打包android和ios，只需要将写好的页面打包成.weex.js文件供ios和android开发人员调用，所以采用了weex init的构建方式。</p>
<h1 id="articleHeader1">2. 工具</h1>
<h4>Weex Devtools</h4>
<p>Weex Devtools是Weex开发调试必备的神器，安装好后，终端进入到项目目录，运行weex debug 会自动打开页面</p>
<p><span class="img-wrap"><img data-src="/img/bVPAfS?w=1566&amp;h=1194" src="https://static.alili.tech/img/bVPAfS?w=1566&amp;h=1194" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>扫二维码后</p>
<p><span class="img-wrap"><img data-src="/img/bVPAgs?w=1332&amp;h=1068" src="https://static.alili.tech/img/bVPAgs?w=1332&amp;h=1068" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>点击Inspector可以看页面信息，我们打开Debugger，然后扫描打包好的js文件二维码就可以开始调试了。</p>
<p><span class="img-wrap"><img data-src="/img/bVPAgM?w=1774&amp;h=540" src="https://static.alili.tech/img/bVPAgM?w=1774&amp;h=540" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>注： 箭头所指处选debugger，我因为手贱选了个别的，导致好几天console里没有内容提示，还以为版本问题，后来研究了下，发现这里选错了。</p>
<h1 id="articleHeader2">3. 遇到的问题</h1>
<blockquote><p>官方demo跑不通</p></blockquote>
<h5>解决：</h5>
<p>高一点版本的weex-vue-render里index.js路径改变，导致。修改weex.html文件，将<code>./node_modules/weex-vue-render/index.js</code>修改为<code>./node_modules/weex-vue-render/dist/index.js</code></p>
<blockquote><p>使用vue-resources获取接口数据, weex web上好的，但是weex-playground中跑不通，一片空白，错误信息：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[undefined:344:31] ReferenceError: Can't find variable: document
addStyle
addStylesToDom
exports

__webpack_require__

__webpack_require__

__webpack_require__

__webpack_require__

anonymous
a@main.js:4:16690
main.js:7:8740" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>[undefined:344:31] ReferenceError: Can't find variable: document
addStyle
addStylesToDom
exports

<span class="hljs-strong">__webpack_require__</span>

<span class="hljs-strong">__webpack_require__</span>

<span class="hljs-strong">__webpack_require__</span>

<span class="hljs-strong">__webpack_require__</span>

anonymous
a@main.js:4:16690
main.js:7:8740</code></pre>
<h5>解决：</h5>
<p>weex中不支持document和window，换成其它方式。weex不支持vue-resources，改成weex支持的fetch</p>
<blockquote><p>&lt;scroll&gt;里loading一直没效果</p></blockquote>
<h5>解决：</h5>
<p>&lt;scroll&gt;中使用refresh就没法用loading，去掉refresh模块</p>
<blockquote><p>webpack报错，错误信息 <code>ERROR in Entry module not found: Error: Cannot resolve 'file' or 'directory' /Users/xx/xx/code/weex/app.js in /Users/xx/xx/code/weex</code></p></blockquote>
<h5>解决：</h5>
<p>开始一直以为是webpack入口没配置对，检查很多遍，各种测试后，发现这里真的没问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry: entries
entry: {
  app: path.resolve('./app.js')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// entry: entries</span>
<span class="hljs-attribute">entry</span>: {
  <span class="hljs-attribute">app</span>: path.resolve(<span class="hljs-string">'./app.js'</span>)
}</code></pre>
<p>后来找到问题出自</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  extensions: ['.js', '.vue', '.json']
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
  <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>]
},</code></pre>
<p>原因是修改了默认的这个配置后，第一个空项不能省略，应该配置为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  extensions: ['', '.js', '.vue', '.json']
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>]
},</code></pre>
<blockquote><p>错误信息 <code>Cannot resolve module 'sass-loader'</code></p></blockquote>
<h5>解决：</h5>
<p>缺少node-sass 或 sass-loader<br><code>npm install node-sass sass-loader --save-dev</code><br>把sass-loader安装成了"scss-loader": "0.0.1",也是服了我自己。</p>
<blockquote><p>接口地址只能获取本地数据，配置test环境失败</p></blockquote>
<h5>解决：</h5>
<p>server.js中加一层代理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('http-proxy-middleware')

// api代理
var proxyTable = config.test.proxyTable
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  server.use(proxyMiddleware(context, options))
})

// proxyTable数据
proxyTable: {
  '/api': {
    // 测试服务器
    target: 'http://ip地址:端口号/xx',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>)

<span class="hljs-comment">// api代理</span>
<span class="hljs-keyword">var</span> proxyTable = config.test.proxyTable
<span class="hljs-built_in">Object</span>.keys(proxyTable).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
  <span class="hljs-keyword">var</span> options = proxyTable[context]
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options === <span class="hljs-string">'string'</span>) {
    options = { <span class="hljs-attr">target</span>: options }
  }
  server.use(proxyMiddleware(context, options))
})

<span class="hljs-comment">// proxyTable数据</span>
proxyTable: {
  <span class="hljs-string">'/api'</span>: {
    <span class="hljs-comment">// 测试服务器</span>
    target: <span class="hljs-string">'http://ip地址:端口号/xx'</span>,
    <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">pathRewrite</span>: {
      <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
    }
  },
  ...
}</code></pre>
<blockquote><p>weex接口调用，fetch的headers某些字段始终设置不上</p></blockquote>
<h5>解决：</h5>
<p>fetch的headers只能设置下面这些字段<br>参考： <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>
<hr>
<p>● 人为设置了对CORS安全的首部字段集合之外的其他首部字段。该集合为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="○ Accept
○ Accept-Language
○ Content-Language
○ Content-Type (but note the additional requirements below)
○ DPR
○ Downlink
○ Save-Data
○ Viewport-Width
○ Width" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>○ Accept
○ Accept-Language
○ <span class="hljs-attribute">Content</span>-Language
○ <span class="hljs-attribute">Content</span>-Type (but note the additional requirements below)
○ DPR
○ Downlink
○ Save-Data
○ Viewport-<span class="hljs-attribute">Width</span>
○ <span class="hljs-attribute">Width</span></code></pre>
<p>●  Content-Type 的值不属于下列之一:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="○ application/x-www-form-urlencoded
○ multipart/form-data
○ text/plain" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>○ application/x-www-<span class="hljs-keyword">form</span>-urlencoded
○ multipart/<span class="hljs-keyword">form</span>-<span class="hljs-keyword">data</span>
○ text/plain</code></pre>
<hr>
<blockquote><p>stream的fetch使用get方式请求接口，url都会自动加上&amp;undefined，官网的例子也不例外。原本普通接口多加一个undefined也没太大影响，但是我们项目是需要根据url参数计算签名的，所以一直签名不通过。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVPAyC?w=1952&amp;h=886" src="https://static.alili.tech/img/bVPAyC?w=1952&amp;h=886" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h5>解决：</h5>
<p>找到源码出处<br><span class="img-wrap"><img data-src="/img/bVPz7b?w=640&amp;h=100" src="https://static.alili.tech/img/bVPz7b?w=640&amp;h=100" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVPz6u?w=1602&amp;h=528" src="https://static.alili.tech/img/bVPz6u?w=1602&amp;h=528" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVPABE?w=2332&amp;h=702" src="https://static.alili.tech/img/bVPABE?w=2332&amp;h=702" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>weex-vue-render第2753行对get进行了特别处理，第2764行的url拼接了body和hash，因为body没有传值，所以是undefined，注释掉url+=这行就没有undefined了，但是修改node_modules中的包内容显然不是一个合理的解决方案。<br>于是把get方式传值改为body传过来，web端好了，签名没有问题，但是真机上还是报错，排查后发现问题出在get中使用了body传值，找到开发文档，<br><a href="http://weex.apache.org/cn/references/modules/stream.html" rel="nofollow noreferrer" target="_blank">http://weex.apache.org/cn/ref...</a><br><span class="img-wrap"><img data-src="/img/bVPABf?w=1464&amp;h=738" src="https://static.alili.tech/img/bVPABf?w=1464&amp;h=738" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>然后我凌乱了，为什么明明不能传body你的源码里又要有那么一行代码<code>url += (config.url.indexOf('?') &lt;= -1 ? '?' : '&amp;') + body + hash;</code>。没办法，最后使用了一个超级笨的办法解决了。在签名计算的时候人为的给url加上“&amp;undefined",计算好签名后，web中fetch参数中的url也要加上“&amp;undefined"，但是真机上是不会有&amp;undefined的，所以真机上的url需要去掉undefined，好了问题解决了。</p>
<blockquote><p>storage中的<code>getItem(key, callback)</code>封装后，页面没拿到数据。</p></blockquote>
<h5>解决：</h5>
<p>storage异步造成的，使用promise解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const p1 = new Promise(function (resolve) {
    storage.getItem(key, event => {
      let ls = event.data || ''
      let d = secret.decrypt(ls) // 对密文字符串进行解密。
      d = typeof d === 'object' ? JSON.parse(d) : d
      resolve(d)
    })
  })
  Promise.all([p1]).then(function (result) {
    callback(result)
  }).catch(function(err){
    console.log('error', err)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    storage.getItem(key, event =&gt; {
      <span class="hljs-keyword">let</span> ls = event.data || <span class="hljs-string">''</span>
      <span class="hljs-keyword">let</span> d = secret.decrypt(ls) <span class="hljs-comment">// 对密文字符串进行解密。</span>
      d = <span class="hljs-keyword">typeof</span> d === <span class="hljs-string">'object'</span> ? <span class="hljs-built_in">JSON</span>.parse(d) : d
      resolve(d)
    })
  })
  <span class="hljs-built_in">Promise</span>.all([p1]).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
    callback(result)
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>, err)
  })</code></pre>
<blockquote><p>页面跳转外部非js链接，在网页上是好的，但真机上一片空白</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.push({
  url: 'https://segmentfault.com/write?freshman=1',
  animated: &quot;true&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">navigator</span><span class="hljs-selector-class">.push</span>({
  <span class="hljs-attribute">url</span>: <span class="hljs-string">'https://segmentfault.com/write?freshman=1'</span>,
  animated: <span class="hljs-string">"true"</span>
})</code></pre>
<h5>解决：</h5>
<p>新建一个vue文件，使用weex的web标签包一层，然后打包成weex.js格式，普通调用就好了。<br><code>&lt;web class="content" :src="url"&gt;&lt;/web&gt;</code></p>
<blockquote><p>跳转weex.js页面传参</p></blockquote>
<h5>解决：</h5>
<p>直接在url后面拼接参数，新页面使用this.$getConfig().bundleUrl获取url解析一下就好了。</p>
<blockquote><p>post提交数据的是后报错415</p></blockquote>
<h5>解决：</h5>
<p>头部信息一定要和后端协议好，不允许不一致。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我的weex开发之路

## 原文链接
[https://segmentfault.com/a/1190000009873690](https://segmentfault.com/a/1190000009873690)

