---
title: 'Vue学习笔记' 
date: 2018-12-26 2:30:14
hidden: true
slug: qpn454pc62g
categories: [reprint]
---

{{< raw >}}

                    
<p>github<a href="https://github.com/cd-dongzi/vue-example" rel="nofollow noreferrer" target="_blank">https://github.com/cd-dongzi/vue-example</a></p>
<h3 id="articleHeader0">1. 解决css背景图片打包路径错误的问题</h3>
<ol>
<li>在utils.js 文件中 找到 generateLoaders 方法</li>
<li>
<p>把以下代码进行更换</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    if (options.extract) {
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
        })
    } else {
        return ['vue-style-loader'].concat(loaders)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-keyword">if</span> (options.extract) {
        <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
            use: loaders,
            fallback: <span class="hljs-string">'vue-style-loader'</span>
        })
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }</code></pre>
<p>更换成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    if (options.extract) {
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader',
            publicPath: '../../'
        })
    } else {
        return ['vue-style-loader'].concat(loaders)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
    <span class="hljs-keyword">if</span> (options.extract) {
        <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
            use: loaders,
            fallback: <span class="hljs-string">'vue-style-loader'</span>,
            publicPath: <span class="hljs-string">'../../'</span>
        })
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }</code></pre>
</li>
<li>打包就可以看到效果咯!</li>
</ol>
<h3 id="articleHeader1">2. Vue引入全局less变量</h3>
<ol>
<li>用vue-cli初始化的vue项目</li>
<li>再build文件夹下创建一个globalLessVars.js文件</li>
<li>
<p>在globalLessVars.js文件中 放入如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    const fs = require('fs');
    module.exports = function getLessVariables(file) {
        var themeContent = fs.readFileSync(file, 'utf-8')
        var variables = {}
        themeContent.split('\n').forEach(function(item) {
            if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
                return
            }
            var _pair = item.split(':')
            if (_pair.length < 2) return;
            var key = _pair[0].replace('\r', '').replace('@', '')
            if (!key) return;
            var value = _pair[1].replace(';', '').replace('\r', '').replace(/^\s+|\s+$/g, '')
            variables[key] = value
        })
        return variables
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
    <span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
    <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLessVariables</span>(<span class="hljs-params">file</span>) </span>{
        <span class="hljs-keyword">var</span> themeContent = fs.readFileSync(file, <span class="hljs-string">'utf-8'</span>)
        <span class="hljs-keyword">var</span> variables = {}
        themeContent.split(<span class="hljs-string">'\n'</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
            <span class="hljs-keyword">if</span> (item.indexOf(<span class="hljs-string">'//'</span>) &gt; <span class="hljs-number">-1</span> || item.indexOf(<span class="hljs-string">'/*'</span>) &gt; <span class="hljs-number">-1</span>) {
                <span class="hljs-keyword">return</span>
            }
            <span class="hljs-keyword">var</span> _pair = item.split(<span class="hljs-string">':'</span>)
            <span class="hljs-keyword">if</span> (_pair.length &lt; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span>;
            <span class="hljs-keyword">var</span> key = _pair[<span class="hljs-number">0</span>].replace(<span class="hljs-string">'\r'</span>, <span class="hljs-string">''</span>).replace(<span class="hljs-string">'@'</span>, <span class="hljs-string">''</span>)
            <span class="hljs-keyword">if</span> (!key) <span class="hljs-keyword">return</span>;
            <span class="hljs-keyword">var</span> value = _pair[<span class="hljs-number">1</span>].replace(<span class="hljs-string">';'</span>, <span class="hljs-string">''</span>).replace(<span class="hljs-string">'\r'</span>, <span class="hljs-string">''</span>).replace(<span class="hljs-regexp">/^\s+|\s+$/g</span>, <span class="hljs-string">''</span>)
            variables[key] = value
        })
        <span class="hljs-keyword">return</span> variables
    }</code></pre>
</li>
<li>
<p>在utils.js 引入 globalLessVars.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const globalLessVars = require('./globalLessVars');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const globalLessVars</span> = require(<span class="hljs-string">'./globalLessVars'</span>);
</code></pre>
</li>
<li>在static文件中创建 color.less 文件</li>
<li>
<p>在 color.less 文件中 放入如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    @theme-color: #c1866a;
    @vice-color: rgba(186,164,119,0.99);
    @blue-color: #2e90fe;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-variable">@theme-color:</span> <span class="hljs-number">#c1866a</span>;
    <span class="hljs-variable">@vice-color:</span> rgba(<span class="hljs-number">186</span>,<span class="hljs-number">164</span>,<span class="hljs-number">119</span>,<span class="hljs-number">0.99</span>);
    <span class="hljs-variable">@blue-color:</span> <span class="hljs-number">#2e90fe</span>;
</code></pre>
</li>
<li>
<p>在util.js文件中如下解析 color.less 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const colorsLess = globalLessVars(path.join(__dirname, '../static/color.less'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">    const colorsLess = globalLessVars(<span class="hljs-name">path</span>.join(<span class="hljs-name">__dirname</span>, '../static/color.less'))<span class="hljs-comment">;</span></code></pre>
</li>
<li>
<p>再把util.js 文件中 cssLoaders方法中返回值改成以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less', {
            globalVars: colorsLess
        }),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">return</span> {
        <span class="hljs-attribute">css</span>: <span class="hljs-built_in">generateLoaders</span>(),
        postcss: <span class="hljs-built_in">generateLoaders</span>(),
        less: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'less'</span>, {
            globalVars: colorsLess
        }),
        sass: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'sass'</span>, { indentedSyntax: true }),
        scss: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'sass'</span>),
        stylus: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'stylus'</span>),
        styl: <span class="hljs-built_in">generateLoaders</span>(<span class="hljs-string">'stylus'</span>)
    }</code></pre>
<blockquote>大功告成</blockquote>
</li>
<li>
<p>引用多个文件的话  就这可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const colorsLess = getLessVariables(path.join(__dirname, '../static/color.less'));
    const stylesLess = getLessVariables(path.join(__dirname, '../static/style.less'));
    const allLess = Object.assign(colorsLess, stylesLess);
    
    less: generateLoaders('less', {
         globalVars: allLess
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>    <span class="hljs-keyword">const</span> colorsLess = getLessVariables(path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'../static/color.less'</span>));
    <span class="hljs-keyword">const</span> stylesLess = getLessVariables(path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'../static/style.less'</span>));
    <span class="hljs-keyword">const</span> allLess = <span class="hljs-keyword">Object</span>.assign(colorsLess, stylesLess);
    
    less: generateLoaders(<span class="hljs-string">'less'</span>, {
         globalVars: allLess
    })</code></pre>
</li>
</ol>
<blockquote>具体详情可以查看<a href="https://zhuanlan.zhihu.com/p/27439821" rel="nofollow noreferrer" target="_blank">使用webpack+vue+less开发，使用less-loader，配置全局less变量</a>
</blockquote>
<h3 id="articleHeader2">3. 去除vue项目中的 # --- History模式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    export default new Router({
        mode: 'history',
        routes: [
           ...
        ]
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
    <span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
        <span class="hljs-attribute">mode</span>: <span class="hljs-string">'history'</span>,
        routes: [
           ...
        ]
    })</code></pre>
<blockquote>如果后台没给前端的 history 模式 匹配路径的话， history 只适合在本地开发使用， 打包记得改回 hash 模式</blockquote>
<h3 id="articleHeader3">4. 自定义路径名</h3>
<p><code> import HelloWorld from '@/components/HelloWorld' </code></p>
<ol>
<li>制定像 @ 这样的自定义名称</li>
<li>
<p>可以前往 webpack.base.conf.js 中如下设置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'components': resolve('src/components'),
            'views': resolve('src/views')
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">resolve</span>: {
        <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
        alias: {
            <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
            <span class="hljs-string">'@'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>),
            <span class="hljs-string">'components'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src/components'</span>),
            <span class="hljs-string">'views'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src/views'</span>)
        }
    }</code></pre>
</li>
</ol>
<h3 id="articleHeader4">5. 不符合规范导致eslint代码检测工具报错</h3>
<p><span class="img-wrap"><img data-src="/img/bVXMmg?w=635&amp;h=264" src="https://static.alili.tech/img/bVXMmg?w=635&amp;h=264" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>如果出现类似以上的错误 , 前往 build 文件下 webpack.base.conf.js  中注释调 eslint-loader  这个loader  就行了</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXWYd?w=462&amp;h=179" src="https://static.alili.tech/img/bVXWYd?w=462&amp;h=179" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>如果你不想使用eslint 代码检测 你可以在用vue-cli直接在创建vue项目的时候就选择不生成代码检测这个eslint-loader<br><span class="img-wrap"><img data-src="/img/bVXWYi?w=1070&amp;h=542" src="https://static.alili.tech/img/bVXWYi?w=1070&amp;h=542" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</blockquote>
<h3 id="articleHeader5">6. 本地开发解决跨域请求的问题</h3>
<ol><li>
<p>在 config 文件下的 index.js 文件中修改以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {}
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">proxyTable</span>: {}
    </code></pre>
<p>设置成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
        '/api': {
            target: 'http://www.mytest.com', //这里放需要请求的接口
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    } 
    
    //  请求接口的时候 http://www.mytest.com/login  可以写成  /api/login" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-attribute">proxyTable</span>: {
        <span class="hljs-string">'/api'</span>: {
            <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://www.mytest.com'</span>, <span class="hljs-comment">//这里放需要请求的接口</span>
            <span class="hljs-attribute">changeOrigin</span>: true,
            <span class="hljs-attribute">pathRewrite</span>: {
                <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
            }
        }
    } 
    
    <span class="hljs-comment">//  请求接口的时候 http://www.mytest.com/login  可以写成  /api/login</span></code></pre>
<p>可以发起多个代理 (如下):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
        '/api': {
            target: 'http://www.mytest.com', 
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
        '/a': {
            target: 'http://www.test.com', 
            changeOrigin: true,
            pathRewrite: {
                '^/a': ''
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>    proxyTable: {
        <span class="hljs-string">'/api'</span>: {
            target: <span class="hljs-string">'http://www.mytest.com'</span>, 
            changeOrigin: true,
            pathRewrite: {
                <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
            }
        },
        <span class="hljs-string">'/a'</span>: {
            target: <span class="hljs-string">'http://www.test.com'</span>, 
            changeOrigin: true,
            pathRewrite: {
                <span class="hljs-string">'^/a'</span>: <span class="hljs-string">''</span>
            }
        }
    }</code></pre>
</li></ol>
<h3 id="articleHeader6">7. babel-polyfill 让ie上使用新语法的内置对象和API</h3>
<ol>
<li>npm i babel-polyfill --save 下载 babel-polyfill 模块</li>
<li>在webpack.base.conf.js 中做以下修改</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    module.exports = {
        entry: {
          app: ['babel-polyfill', './src/main.js']
        },
        ......
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>    <span class="hljs-keyword">module</span>.exports = {
        entry: {
          app: [<span class="hljs-string">'babel-polyfill'</span>, <span class="hljs-string">'./src/main.js'</span>]
        },
        ......
    }
    </code></pre>
<h3 id="articleHeader7">8. 前台拦截器</h3>
<p>一般在我们请求后台数据时,都会在请求过程中执行动画, 和统一管理请求错误,验证TOKEN 等等的情况;<br>当你使用 axios 做请求时,  你可以做如下设置来解决以上问题</p>
<ol>
<li>npm i axios qs --save 来下载这两个模块</li>
<li>创建fetch.js 文件，内容如下：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    import axios from 'axios'
    import qs from 'qs'  // 直接post请求后台取不到参数,()

    // 发起请求时,会执行该方法
    axios.interceptors.request.use(config => {
        //你可以在这里开始加载动画,  查询token  等等之类
        return config
    }, err => {
        return Promise.reject(err)
    })

    //接收到后台的数据时执行的方法
    axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))


    //检查状态码 status
    function checkStatus(res) {
        if (res.status === 200 || res.status === 304) { //当状态正常是返回原样的数据
            return res
        }
        return {  // 状态不正常时可以返回自己自定义的一些格式或者状态什么的
            ....
        }
    }

    //检查后台的code 值
    function checkCode(res) {
        if (res.data.code === 0) {  //code值错误时
            alert('出错了')
        }
        return res
    }


    export default {
        get(url, params) {  //返回封装后的 get 方法
            if (!url) return
            return axios({
                method: 'get',
                url,
                params,
                timeout: 10000
            }).then(checkStatus).then(checkCode)
        },
        post(url, data) { //返回封装后的 post 方法
            if (!url) return
            return axios({
                method: 'post',
                url,
                data: qs.stringify(data),
                timeout: 10000
            }).then(checkStatus).then(checkCode)
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>    
    <span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
    <span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>  <span class="hljs-comment">// 直接post请求后台取不到参数,()</span>

    <span class="hljs-comment">// 发起请求时,会执行该方法</span>
    axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
        <span class="hljs-comment">//你可以在这里开始加载动画,  查询token  等等之类</span>
        <span class="hljs-keyword">return</span> config
    }, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
    })

    <span class="hljs-comment">//接收到后台的数据时执行的方法</span>
    axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.resolve(err.response))


    <span class="hljs-comment">//检查状态码 status</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">res</span>) </span>{
        <span class="hljs-keyword">if</span> (res.status === <span class="hljs-number">200</span> || res.status === <span class="hljs-number">304</span>) { <span class="hljs-comment">//当状态正常是返回原样的数据</span>
            <span class="hljs-keyword">return</span> res
        }
        <span class="hljs-keyword">return</span> {  <span class="hljs-comment">// 状态不正常时可以返回自己自定义的一些格式或者状态什么的</span>
            ....
        }
    }

    <span class="hljs-comment">//检查后台的code 值</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkCode</span>(<span class="hljs-params">res</span>) </span>{
        <span class="hljs-keyword">if</span> (res.data.code === <span class="hljs-number">0</span>) {  <span class="hljs-comment">//code值错误时</span>
            alert(<span class="hljs-string">'出错了'</span>)
        }
        <span class="hljs-keyword">return</span> res
    }


    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-keyword">get</span>(url, params) {  <span class="hljs-comment">//返回封装后的 get 方法</span>
            <span class="hljs-keyword">if</span> (!url) <span class="hljs-keyword">return</span>
            <span class="hljs-keyword">return</span> axios({
                method: <span class="hljs-string">'get'</span>,
                url,
                params,
                timeout: <span class="hljs-number">10000</span>
            }).then(checkStatus).then(checkCode)
        },
        post(url, data) { <span class="hljs-comment">//返回封装后的 post 方法</span>
            <span class="hljs-keyword">if</span> (!url) <span class="hljs-keyword">return</span>
            <span class="hljs-keyword">return</span> axios({
                method: <span class="hljs-string">'post'</span>,
                url,
                data: qs.stringify(data),
                timeout: <span class="hljs-number">10000</span>
            }).then(checkStatus).then(checkCode)
        }
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   //在main.js中引入封装后的axios  
    import http from './utils/fetch'
    
    Vue.prototype.http = http;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>   <span class="hljs-comment">//在main.js中引入封装后的axios  </span>
    <span class="hljs-keyword">import</span> http <span class="hljs-keyword">from</span> <span class="hljs-string">'./utils/fetch'</span>
    
    Vue.prototype.http = http;</code></pre>
<blockquote>post请求直接放参数， 为何后台接收不到前端的参数 <a href="http://www.jianshu.com/p/042632dec9fb" rel="nofollow noreferrer" target="_blank">axios发送post请求，springMVC接收不到数据问题</a>
</blockquote>
<h3 id="articleHeader8">9. Vue数组更新, 却无法渲染问题</h3>
<p>可以使用Vue.$set(object, key, value)来解决这个问题</p>
<blockquote>具体可以参考这里 <a href="http://www.cnblogs.com/zhuzhenwei918/p/6893496.html" rel="nofollow noreferrer" target="_blank">变化检测问题（数组相关）</a>
</blockquote>
<h3 id="articleHeader9">10. 路由懒加载</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    export default new Router({
        routes: [
            {
                path: '/lazy',
                name: 'lazy-loading',
                component: (resolve) => {  //这里加载了 记得上面就不需要在import 这个组件了
                    require(['../components/lazy-loading'], resolve)
                }
            }
        ]
    })
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
        routes: [
            {
                path: <span class="hljs-string">'/lazy'</span>,
                name: <span class="hljs-string">'lazy-loading'</span>,
                component: <span class="hljs-function"><span class="hljs-params">(resolve)</span> =&gt;</span> {  <span class="hljs-regexp">//</span>这里加载了 记得上面就不需要在<span class="hljs-keyword">import</span> 这个组件了
                    <span class="hljs-built_in">require</span>([<span class="hljs-string">'../components/lazy-loading'</span>], resolve)
                }
            }
        ]
    })
    </code></pre>
<h3 id="articleHeader10">11.自定义组件</h3>
<ol><li>
<p>先创建一个vue的 loading 结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loading.vue

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>loading<span class="hljs-selector-class">.vue</span>

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    <template>
        <div class=&quot;loading-wrapper&quot;>
            <div class=&quot;aircle&quot;></div>
        </div>
    </template>
    <style lang=&quot;less&quot; scoped>
        .loading-wrapper {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0; top: 0;
            background: rgba(0, 0, 0, .5);
            .aircle {
                width: 300px;
                height: 300px;
                position: absolute;
                left:0;top:0;right:0;bottom:0;
                margin: auto;
                border-radius: 50%;
                background: linear-gradient(#000 50%, #fff 0%);
                display: flex;
                align-items: center;
                animation: rotate 2s linear infinite;
            }
    
            .aircle:after,
            .aircle:before {
                content: &quot;&quot;;
                flex: 1;
                height: calc(100% / 6);
                border-radius: 50%;
                border: 50px solid #000;
                transform-origin: 0 50%;
                transform: scale(0.5);
                animation: change 1s ease-in-out infinite alternate;
            }
    
            .aircle:after {
                background: #000;
                border-color: #fff;
                transform-origin: 100% 50%;
                animation-delay: -1s;
            }
            .aircle:before {
                background: #fff;
            }
    
            @keyframes change {
                100% {
                    transform: scale(1.5);
                }
            }
    
            @keyframes rotate {
                100% {
                    transform: rotate(360deg);
                }
            }
        }
    </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>
    <span class="hljs-params">&lt;template&gt;</span>
        <span class="hljs-params">&lt;div class="loading-wrapper"&gt;</span>
            <span class="hljs-params">&lt;div class="aircle"&gt;</span><span class="hljs-params">&lt;/div&gt;</span>
        <span class="hljs-params">&lt;/div&gt;</span>
    <span class="hljs-params">&lt;/template&gt;</span>
    <span class="hljs-params">&lt;style lang="less" scoped&gt;</span>
        .loading-<span class="hljs-class">wrapper </span>{
<span class="hljs-symbol">            position:</span> fixed;
<span class="hljs-symbol">            width:</span> <span class="hljs-number">100</span>%;
<span class="hljs-symbol">            height:</span> <span class="hljs-number">100</span>%;
<span class="hljs-symbol">            left:</span> <span class="hljs-number">0</span>; top: <span class="hljs-number">0</span>;
<span class="hljs-symbol">            background:</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">.5</span>);
            .<span class="hljs-class">aircle </span>{
<span class="hljs-symbol">                width:</span> <span class="hljs-number">300</span>px;
<span class="hljs-symbol">                height:</span> <span class="hljs-number">300</span>px;
<span class="hljs-symbol">                position:</span> absolute;
<span class="hljs-symbol">                left:</span><span class="hljs-number">0</span>;top:<span class="hljs-number">0</span>;right:<span class="hljs-number">0</span>;bottom:<span class="hljs-number">0</span>;
<span class="hljs-symbol">                margin:</span> auto;
                border-radius: <span class="hljs-number">50</span>%;
<span class="hljs-symbol">                background:</span> linear-gradient(<span class="hljs-meta">#000 50%, #fff 0%);</span>
<span class="hljs-symbol">                display:</span> flex;
                align-items: center;
<span class="hljs-symbol">                animation:</span> rotate <span class="hljs-number">2</span>s linear infinite;
            }
    
            .aircle:after,
            .aircle:<span class="hljs-class">before </span>{
<span class="hljs-symbol">                content:</span> <span class="hljs-string">""</span>;
<span class="hljs-symbol">                flex:</span> <span class="hljs-number">1</span>;
<span class="hljs-symbol">                height:</span> calc(<span class="hljs-number">100</span>% / <span class="hljs-number">6</span>);
                border-radius: <span class="hljs-number">50</span>%;
<span class="hljs-symbol">                border:</span> <span class="hljs-number">50</span>px solid <span class="hljs-meta">#000;</span>
                transform-origin: <span class="hljs-number">0</span> <span class="hljs-number">50</span>%;
<span class="hljs-symbol">                transform:</span> scale(<span class="hljs-number">0.5</span>);
<span class="hljs-symbol">                animation:</span> change <span class="hljs-number">1</span>s ease-in-out infinite alternate;
            }
    
            .aircle:<span class="hljs-class">after </span>{
<span class="hljs-symbol">                background:</span> <span class="hljs-meta">#000;</span>
                border-color: <span class="hljs-meta">#fff;</span>
                transform-origin: <span class="hljs-number">100</span>% <span class="hljs-number">50</span>%;
                animation-delay: <span class="hljs-number">-1</span>s;
            }
            .aircle:<span class="hljs-class">before </span>{
<span class="hljs-symbol">                background:</span> <span class="hljs-meta">#fff;</span>
            }
    
            @keyframes <span class="hljs-class">change </span>{
                <span class="hljs-number">100</span>% {
<span class="hljs-symbol">                    transform:</span> scale(<span class="hljs-number">1.5</span>);
                }
            }
    
            @keyframes <span class="hljs-class">rotate </span>{
                <span class="hljs-number">100</span>% {
<span class="hljs-symbol">                    transform:</span> rotate(<span class="hljs-number">360</span>deg);
                }
            }
        }
    <span class="hljs-params">&lt;/style&gt;</span></code></pre>
<p>2.在创建一个JS 文件引入这个loading.vue</p>
<p>index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import Vue from 'vue'
    import LoadingComponent from './loading.vue'
    
    
    //extend 是构造一个组件的语法器.传入参数，返回一个组件
    let LoadingConstructor = Vue.extend(LoadingComponent);
    let initComponent;
    
    //导出 显示loading组件
    export const showLoading = (option={}) => {
        initComponent = new LoadingConstructor();
        initComponent.$mount();
        document.querySelector(option.container || 'body').appendChild(initComponent.$el);
    }
    
    //导出 移除loading组件
    export const hideLoading = () => {
        initComponent.$el.parentNode.removeChild(initComponent.$el)
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
    <span class="hljs-keyword">import</span> LoadingComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./loading.vue'</span>
    
    
    <span class="hljs-comment">//extend 是构造一个组件的语法器.传入参数，返回一个组件</span>
    <span class="hljs-keyword">let</span> LoadingConstructor = Vue.extend(LoadingComponent);
    <span class="hljs-keyword">let</span> initComponent;
    
    <span class="hljs-comment">//导出 显示loading组件</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> showLoading = <span class="hljs-function">(<span class="hljs-params">option={}</span>) =&gt;</span> {
        initComponent = <span class="hljs-keyword">new</span> LoadingConstructor();
        initComponent.$mount();
        <span class="hljs-built_in">document</span>.querySelector(option.container || <span class="hljs-string">'body'</span>).appendChild(initComponent.$el);
    }
    
    <span class="hljs-comment">//导出 移除loading组件</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> hideLoading = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        initComponent.$el.parentNode.removeChild(initComponent.$el)
    }
</code></pre>
<p>3.最后创建一个js文件统一挂载所有自定义组件到vue原型上</p>
<p>output.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import Alert from './alert/index.js'  //alert组件
    import { showLoading, hideLoading } from './loading/index.js' //loading组件
    
    const install = function(Vue) { //通过install方法挂载到Vue原型上去
        Vue.prototype.$alert = Alert;
        Vue.prototype.$showLoading = showLoading;
        Vue.prototype.$hideLoading = hideLoading;
    }
    export default install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">import</span> Alert <span class="hljs-keyword">from</span> <span class="hljs-string">'./alert/index.js'</span>  <span class="hljs-comment">//alert组件</span>
    <span class="hljs-keyword">import</span> { showLoading, hideLoading } <span class="hljs-keyword">from</span> <span class="hljs-string">'./loading/index.js'</span> <span class="hljs-comment">//loading组件</span>
    
    <span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{ <span class="hljs-comment">//通过install方法挂载到Vue原型上去</span>
        Vue.prototype.$alert = Alert;
        Vue.prototype.$showLoading = showLoading;
        Vue.prototype.$hideLoading = hideLoading;
    }
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> install</code></pre>
<p>4.最后在main.js中引入 output.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import globalComponents from './components/output'

    Vue.use(globalComponents);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>    <span class="hljs-keyword">import</span> globalComponents <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/output'</span>

    Vue.use(globalComponents);</code></pre>
<blockquote>在别的组件中通过如下直接调用就行了</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    created () {
        this.$showLoading()
    
        setTimeout( () => {
            this.$hideLoading()
        }, 2000);

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    created () {
        <span class="hljs-keyword">this</span>.$showLoading()
    
        setTimeout( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.$hideLoading()
        }, <span class="hljs-number">2000</span>);

    }</code></pre>
</li></ol>
<h3 id="articleHeader11">12.路由之间的切换动画</h3>
<p>1.用transition元素来做动画， 通过绑定name元素来切换不同的动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;back&quot; @click=&quot;$router.goBack()&quot;>返回</div
    <transition :name=&quot;transition&quot;>
        <router-view class=&quot;view&quot; />
    </transition>   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"back"</span> @click=<span class="hljs-string">"$router.goBack()"</span>&gt;返回&lt;/<span class="hljs-selector-tag">div</span>
    &lt;<span class="hljs-attribute">transition</span> :name=<span class="hljs-string">"transition"</span>&gt;
        &lt;router-view class=<span class="hljs-string">"view"</span> /&gt;
    &lt;/<span class="hljs-attribute">transition</span>&gt;   </code></pre>
<p>2.动画样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .view {
      padding: 50px 300px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      transition: all 0.3s linear;
    }
    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      transform: translate(100%, 0);
    }
    
    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      transform: translate(-100%, 0);
    }    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.view</span> {
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">50px</span> <span class="hljs-number">300px</span>;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.3s</span> linear;
    }
    <span class="hljs-selector-class">.slide-left-enter</span>,
    <span class="hljs-selector-class">.slide-right-leave-active</span> {
      <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(100%, 0);
    }
    
    <span class="hljs-selector-class">.slide-left-leave-active</span>,
    <span class="hljs-selector-class">.slide-right-enter</span> {
      <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-100%, 0);
    }    
    </code></pre>
<p>3.给路由添加返回的状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import Vue from 'vue'
    import Router from 'vue-router'
    
    Router.prototype.back = false;
    Router.prototype.goBack = function () {
          this.back = true;
          this.go(-1)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
    <span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
    
    Router.prototype.back = <span class="hljs-literal">false</span>;
    Router.prototype.goBack = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.back = <span class="hljs-literal">true</span>;
          <span class="hljs-keyword">this</span>.go(<span class="hljs-number">-1</span>)
    }</code></pre>
<p>4.检测路由的改变来切换状态，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    export default {
      name: &quot;app&quot;,
        data() {
            return {
                transition: &quot;slide-left&quot;
            };
        },
        watch: {
            $route (to, from ) {
                var back = this.$router.back;
                if (back) { //点击了返回
                    this.transition = 'slide-right'
                }else{
                    this.transition = 'slide-left'
                }
                this.$router.back = false;
            }
        }
    
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    export <span class="hljs-keyword">default</span> {
      name: <span class="hljs-string">"app"</span>,
        <span class="hljs-keyword">data</span>() {
            <span class="hljs-keyword">return</span> {
                transition: <span class="hljs-string">"slide-left"</span>
            };
        },
        watch: {
            $route (to, from ) {
                <span class="hljs-keyword">var</span> back = <span class="hljs-keyword">this</span>.$router.back;
                <span class="hljs-keyword">if</span> (back) { <span class="hljs-comment">//点击了返回</span>
                    <span class="hljs-keyword">this</span>.transition = <span class="hljs-string">'slide-right'</span>
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">this</span>.transition = <span class="hljs-string">'slide-left'</span>
                }
                <span class="hljs-keyword">this</span>.$router.back = <span class="hljs-literal">false</span>;
            }
        }
    
    }</code></pre>
<h3 id="articleHeader12">13.生命周期的钩子函数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    beforeCreate () {
        console.log('--------------beforeCreate-------------------')
        console.log('在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回')
        console.log('但是还没有开始 DOM 编译，$el 还不存在,但是实例存在')
    },
    created () {
        console.log('--------------created-------------------')
        console.log('在实例创建完成后被立即调用,挂载阶段还没开始，$el属性目前不可见')
    },
    beforeMount () {
        console.log('--------------beforeMount-------------------')
        console.log('模板编译挂载之前')
    },
    mounted () {
        console.log('--------------mounted-------------------')
        console.log('模板编译挂载之后')
    },
    beforeUpdate () {
        console.log('--------------beforeUpdate-------------------')
        console.log('组件更新之前')
    },
    updated () {
        console.log('--------------updated-------------------')
        console.log('组件更新之后')
    },
    activated () {
        console.log('--------------activated-------------------')
        console.log('keep-alive 组件激活时调用')
    },
    deactivated () {
        console.log('--------------deactivated-------------------')
        console.log('keep-alive 组件停用时调用')
    },
    beforeDestroy () {
        console.log('--------------beforeDestroy-------------------')
        console.log('组件销毁之前')
    },
    destroyed () {
        console.log('--------------destroyed-------------------')
        console.log('组件销毁之后')
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-selector-tag">beforeCreate</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------beforeCreate-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'但是还没有开始 DOM 编译，$el 还不存在,但是实例存在'</span>)
    },
    <span class="hljs-selector-tag">created</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------created-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'在实例创建完成后被立即调用,挂载阶段还没开始，$el属性目前不可见'</span>)
    },
    <span class="hljs-selector-tag">beforeMount</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------beforeMount-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'模板编译挂载之前'</span>)
    },
    <span class="hljs-selector-tag">mounted</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------mounted-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'模板编译挂载之后'</span>)
    },
    <span class="hljs-selector-tag">beforeUpdate</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------beforeUpdate-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'组件更新之前'</span>)
    },
    <span class="hljs-selector-tag">updated</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------updated-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'组件更新之后'</span>)
    },
    <span class="hljs-selector-tag">activated</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------activated-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'keep-alive 组件激活时调用'</span>)
    },
    <span class="hljs-selector-tag">deactivated</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------deactivated-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'keep-alive 组件停用时调用'</span>)
    },
    <span class="hljs-selector-tag">beforeDestroy</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------beforeDestroy-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'组件销毁之前'</span>)
    },
    <span class="hljs-selector-tag">destroyed</span> () {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'--------------destroyed-------------------'</span>)
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'组件销毁之后'</span>)
    }</code></pre>
<h3 id="articleHeader13">14. 路由钩子函数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //全局钩子函数
    const router = new VueRouter({ ... })
    
    router.beforeEach((to, from, next) => {
        // do something  可以检测用户是否登录啥的
        next();
    });

    router.afterEach((to, from, next) => {
        console.log(to.path);
    });


    to: 即将要进入的目标 [路由对象]
    from: 当前导航正要离开的路由
    next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是confirmed （确认的）。
    next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from
    next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航

   


    //组件内的钩子
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 相对于组件来说的，而且应该是在路由进入之前开始准备的 所以beforeRouteEnter是调用ajax的时机
        // 不能获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建

        next();
    },

    beforeRouteLeave (to, from, next) {
        //在组件的生命周期完成后，且旧路由即将切换走，新路由beforeEach的时机执行
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>    <span class="hljs-comment">//全局钩子函数</span>
    const router = <span class="hljs-keyword">new</span> VueRouter({ ... })
    
    router.beforeEach((to, <span class="hljs-keyword">from</span>, <span class="hljs-keyword">next</span>) =&gt; {
        <span class="hljs-comment">// do something  可以检测用户是否登录啥的</span>
        <span class="hljs-keyword">next</span>();
    });

    router.afterEach((to, <span class="hljs-keyword">from</span>, <span class="hljs-keyword">next</span>) =&gt; {
        console.log(to.path);
    });


    to: 即将要进入的目标 [路由对象]
    <span class="hljs-keyword">from</span>: 当前导航正要离开的路由
    <span class="hljs-keyword">next</span>(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是confirmed （确认的）。
    <span class="hljs-keyword">next</span>(<span class="hljs-keyword">false</span>): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 <span class="hljs-keyword">from</span>
    <span class="hljs-keyword">next</span>(<span class="hljs-string">'/'</span>) 或者 <span class="hljs-keyword">next</span>({ path: <span class="hljs-string">'/'</span> }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航

   


    <span class="hljs-comment">//组件内的钩子</span>
    beforeRouteEnter (to, <span class="hljs-keyword">from</span>, <span class="hljs-keyword">next</span>) {
        <span class="hljs-comment">// 在渲染该组件的对应路由被 confirm 前调用</span>
        <span class="hljs-comment">// 相对于组件来说的，而且应该是在路由进入之前开始准备的 所以beforeRouteEnter是调用ajax的时机</span>
        <span class="hljs-comment">// 不能获取组件实例 `this`</span>
        <span class="hljs-comment">// 因为当钩子执行前，组件实例还没被创建</span>

        <span class="hljs-keyword">next</span>();
    },

    beforeRouteLeave (to, <span class="hljs-keyword">from</span>, <span class="hljs-keyword">next</span>) {
        <span class="hljs-comment">//在组件的生命周期完成后，且旧路由即将切换走，新路由beforeEach的时机执行</span>
    }
</code></pre>
<h3 id="articleHeader14">15. 打包事项</h3>
<ol>
<li>在config 文件下的 index.js 中 修改以下属性 (如果你想在本地打包能看到页面效果, 此步骤不要忘记哦)</li>
<li>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assetsPublicPath: '/' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">assetsPublicPath:</span> <span class="hljs-string">'/'</span> </code></pre>
<p>更改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assetsPublicPath: './' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">assetsPublicPath:</span> <span class="hljs-string">'./'</span> </code></pre>
</li>
<li>
<p>在构建生产环境版本时是否开启source map</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    productionSourceMap: true
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">    productionSourceMap:</span> <span class="hljs-literal">true</span>
    </code></pre>
<p>当把这个设置 置为 false 时,  文件体积会变得很小 <a href="http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html" rel="nofollow noreferrer" target="_blank">JavaScript Source Map 详解</a></p>
</li>
</ol>
<h3 id="articleHeader15">16. 简单文件介绍</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .babelrc

    {   
        // 此项指明，转码的规则
        &quot;presets&quot;: [
            // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
            [&quot;env&quot;, {
                &quot;modules&quot;: false,
                &quot;targets&quot;: {
                    &quot;browsers&quot;: [&quot;> 1%&quot;, &quot;last 2 versions&quot;, &quot;not ie <= 8&quot;]
                }
            }],
            // 下面这个是不同阶段出现的es语法，包含不同的转码插件
            &quot;stage-2&quot;
        ],

        // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
        &quot;plugins&quot;: [&quot;transform-runtime&quot;],

        // 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置
        &quot;env&quot;: {

            // test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development
            &quot;test&quot;: {
                &quot;presets&quot;: [&quot;env&quot;, &quot;stage-2&quot;],

                // instanbul是一个用来测试转码后代码的工具
                &quot;plugins&quot;: [&quot;istanbul&quot;]  
            }
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-selector-class">.babelrc</span>

    {   
        <span class="hljs-comment">// 此项指明，转码的规则</span>
        <span class="hljs-string">"presets"</span>: [
            <span class="hljs-comment">// env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码</span>
            [<span class="hljs-string">"env"</span>, {
                <span class="hljs-string">"modules"</span>: false,
                <span class="hljs-string">"targets"</span>: {
                    <span class="hljs-string">"browsers"</span>: [<span class="hljs-string">"&gt; 1%"</span>, <span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"not ie &lt;= 8"</span>]
                }
            }],
            <span class="hljs-comment">// 下面这个是不同阶段出现的es语法，包含不同的转码插件</span>
            <span class="hljs-string">"stage-2"</span>
        ],

        <span class="hljs-comment">// 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译</span>
        <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>],

        <span class="hljs-comment">// 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置</span>
        <span class="hljs-string">"env"</span>: {

            <span class="hljs-comment">// test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development</span>
            <span class="hljs-string">"test"</span>: {
                <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"env"</span>, <span class="hljs-string">"stage-2"</span>],

                <span class="hljs-comment">// instanbul是一个用来测试转码后代码的工具</span>
                <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"istanbul"</span>]  
            }
        }
    }
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .editorconfig

    charset = utf-8  //编码
    indent_style = space //缩进风格,基于空格做缩进
    indent_size = 2   //缩进大小是2格
    end_of_line = lf   //换行符的风格
    insert_final_newline = true  //当你创建一个文件，会自动在文件末尾插入新行
    trim_trailing_whitespace = true  //自动移除行尾多余空格" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>    .editorconfig

    charset = utf<span class="hljs-number">-8</span>  <span class="hljs-comment">//编码</span>
    indent_style = space <span class="hljs-comment">//缩进风格,基于空格做缩进</span>
    indent_size = <span class="hljs-number">2</span>   <span class="hljs-comment">//缩进大小是2格</span>
    end_of_line = lf   <span class="hljs-comment">//换行符的风格</span>
    insert_final_new<span class="hljs-type">line</span> = <span class="hljs-literal">true</span>  <span class="hljs-comment">//当你创建一个文件，会自动在文件末尾插入新行</span>
    trim_trailing_whitespace = <span class="hljs-literal">true</span>  <span class="hljs-comment">//自动移除行尾多余空格</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    package.json


      &quot;name&quot;: &quot;example&quot;,
      &quot;version&quot;: &quot;1.0.0&quot;,
      &quot;description&quot;: &quot;A Vue.js project&quot;,
      &quot;author&quot;: &quot;&quot;,
      &quot;private&quot;: true,
      &quot;scripts&quot;: {  
        // 例: &quot;dev&quot;: &quot;node build/dev-server.js&quot;
        // &quot;dev&quot;就相当于需要在命令行执行 npm run dev    所有我们执行的npm run dev 相当于执行了 &quot;node build/dev-server.js&quot;
        // 基本所有脚本命令 都需要 加上前缀 npm run ...  ,但是 &quot;start&quot; 这个脚本命令只需要执行 npm start 就行,  不需要中间的 run;

        &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
        &quot;start&quot;: &quot;npm run dev&quot;,
        &quot;build&quot;: &quot;node build/build.js&quot;
      },
      &quot;dependencies&quot;: {  //  生产环境所需要的依赖
        &quot;vue&quot;: &quot;^2.5.2&quot;,
        &quot;vue-router&quot;: &quot;^3.0.1&quot;
        ......
      },
      &quot;devDependencies&quot;: {  // 开发环境所需要的依赖
        &quot;autoprefixer&quot;: &quot;^7.1.2&quot;,
        &quot;babel-core&quot;: &quot;^6.22.1&quot;,
        .......
      },
      &quot;engines&quot;: {
        &quot;node&quot;: &quot;>= 4.0.0&quot;,
        &quot;npm&quot;: &quot;>= 3.0.0&quot;
      },
      &quot;browserslist&quot;: [
        &quot;> 1%&quot;,
        &quot;last 2 versions&quot;,
        &quot;not ie <= 8&quot;
      ]
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>    package.json


      <span class="hljs-string">"name"</span>: <span class="hljs-string">"example"</span>,
      <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
      <span class="hljs-string">"description"</span>: <span class="hljs-string">"A Vue.js project"</span>,
      <span class="hljs-string">"author"</span>: <span class="hljs-string">""</span>,
      <span class="hljs-string">"private"</span>: true,
      <span class="hljs-string">"scripts"</span>: {  
        <span class="hljs-comment">// 例: "dev": "node build/dev-server.js"</span>
        <span class="hljs-comment">// "dev"就相当于需要在命令行执行 npm run dev    所有我们执行的npm run dev 相当于执行了 "node build/dev-server.js"</span>
        <span class="hljs-comment">// 基本所有脚本命令 都需要 加上前缀 npm run ...  ,但是 "start" 这个脚本命令只需要执行 npm start 就行,  不需要中间的 run;</span>

        <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
        <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
        <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
      },
      <span class="hljs-string">"dependencies"</span>: {  <span class="hljs-comment">//  生产环境所需要的依赖</span>
        <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.5.2"</span>,
        <span class="hljs-string">"vue-router"</span>: <span class="hljs-string">"^3.0.1"</span>
        ......
      },
      <span class="hljs-string">"devDependencies"</span>: {  <span class="hljs-comment">// 开发环境所需要的依赖</span>
        <span class="hljs-string">"autoprefixer"</span>: <span class="hljs-string">"^7.1.2"</span>,
        <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.22.1"</span>,
        .......
      },
      <span class="hljs-string">"engines"</span>: {
        <span class="hljs-string">"node"</span>: <span class="hljs-string">"&gt;= 4.0.0"</span>,
        <span class="hljs-string">"npm"</span>: <span class="hljs-string">"&gt;= 3.0.0"</span>
      },
      <span class="hljs-string">"browserslist"</span>: [
        <span class="hljs-string">"&gt; 1%"</span>,
        <span class="hljs-string">"last 2 versions"</span>,
        <span class="hljs-string">"not ie &lt;= 8"</span>
      ]
    }
</code></pre>
<p>更多的文件配置可以参考 <a href="https://zhuanlan.zhihu.com/p/24322005" rel="nofollow noreferrer" target="_blank">vue-cli#2.0 webpack 配置分析</a></p>
<h2 id="articleHeader16">小结</h2>
<p><strong>希望能跟大家一起进步， O(∩_∩)O谢谢</strong><br><strong><a href="https://github.com/cd-dongzi/vue-example" rel="nofollow noreferrer" target="_blank">github地址</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue学习笔记

## 原文链接
[https://segmentfault.com/a/1190000011865847](https://segmentfault.com/a/1190000011865847)

