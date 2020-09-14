---
title: '一段人人都应该知道的从Vue到React的过渡史' 
date: 2019-01-29 2:30:10
hidden: true
slug: r8cvm0t27vg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>以前写Vue写惯了，心血来潮，写起了react。并根据Vue官网文档的语法顺序，写了对应的React的语法，并附一个教程demo。</p>
<p><a href="https://github.com/AppianZ/Close2React" rel="nofollow noreferrer" target="_blank">教程的github地址：Close2React</a></p>
<p>项目使用框架版本主要有 <code>react(15.4.1)</code> + <code>react-dom(15.4.1)</code> + <code>webpack(1.13.3) + axios(0.15.3)</code> + <code>node(6.2.2)</code>, 详情具体可见下文的【环境配置】</p>
<p>目前该项目有两个分支, <code>half-es6</code> + <code>master</code></p>
<p>half-es6和master实现的功能一样, 实现了<strong>CURD + Axios + Others</strong></p>
<p><a href="https://github.com/AppianZ/Close2React/tree/half-es6" rel="nofollow noreferrer" target="_blank">half-es6</a>的写法并没有完全使用es6的class的概念, <a href="https://github.com/AppianZ/Close2React" rel="nofollow noreferrer" target="_blank">master</a>是完善了它</p>
<h2 id="articleHeader1">环境配置</h2>
<p>写react就需要先配置webpack还有jsx</p>
<p>首先，新建一个项目，npm init</p>
<p>然后在package中加入下面这些依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;dependencies&quot;: {
    &quot;react&quot;: &quot;^15.4.1&quot;,
    &quot;react-dom&quot;: &quot;^15.4.1&quot;,
  },
  &quot;devDependencies&quot;: {
    &quot;axios&quot;: &quot;^0.15.3&quot;,
    &quot;babel-core&quot;: &quot;^6.18.2&quot;,
    &quot;babel-loader&quot;: &quot;^6.2.8&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.18.0&quot;,
    &quot;babel-preset-react&quot;: &quot;^6.16.0&quot;,
    &quot;babel-preset-react-hmre&quot;: &quot;^1.1.1&quot;,
    &quot;bootstrap&quot;: &quot;^4.0.0-alpha.2&quot;,
    &quot;css-loader&quot;: &quot;^0.26.1&quot;,
    &quot;file-loader&quot;: &quot;^0.9.0&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^2.24.1&quot;,
    &quot;node-sass&quot;: &quot;^3.13.0&quot;,
    &quot;open-browser-webpack-plugin&quot;: &quot;0.0.3&quot;,
    &quot;sass-loader&quot;: &quot;^4.0.2&quot;,
    &quot;style-loader&quot;: &quot;^0.13.1&quot;,
    &quot;url-loader&quot;: &quot;^0.5.7&quot;,
    &quot;webpack&quot;: &quot;^1.13.3&quot;,
    &quot;webpack-dev-server&quot;: &quot;^1.16.2&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-attr">"react"</span>: <span class="hljs-string">"^15.4.1"</span>,
    <span class="hljs-attr">"react-dom"</span>: <span class="hljs-string">"^15.4.1"</span>,
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-attr">"axios"</span>: <span class="hljs-string">"^0.15.3"</span>,
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.18.2"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^6.2.8"</span>,
    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.18.0"</span>,
    <span class="hljs-attr">"babel-preset-react"</span>: <span class="hljs-string">"^6.16.0"</span>,
    <span class="hljs-attr">"babel-preset-react-hmre"</span>: <span class="hljs-string">"^1.1.1"</span>,
    <span class="hljs-attr">"bootstrap"</span>: <span class="hljs-string">"^4.0.0-alpha.2"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.26.1"</span>,
    <span class="hljs-attr">"file-loader"</span>: <span class="hljs-string">"^0.9.0"</span>,
    <span class="hljs-attr">"html-webpack-plugin"</span>: <span class="hljs-string">"^2.24.1"</span>,
    <span class="hljs-attr">"node-sass"</span>: <span class="hljs-string">"^3.13.0"</span>,
    <span class="hljs-attr">"open-browser-webpack-plugin"</span>: <span class="hljs-string">"0.0.3"</span>,
    <span class="hljs-attr">"sass-loader"</span>: <span class="hljs-string">"^4.0.2"</span>,
    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>,
    <span class="hljs-attr">"url-loader"</span>: <span class="hljs-string">"^0.5.7"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.13.3"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^1.16.2"</span>
  }</code></pre>
<p>有两个比较重要的指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server --progress --profile --hot&quot;,
    &quot;build&quot;: &quot;webpack --progress --profile --colors&quot;
  },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --progress --profile --hot"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack --progress --profile --colors"</span>
  },
</code></pre>
<h3 id="articleHeader2">webpack.config</h3>
<p>在webpack的配置中，我想要的目录结构是横向目录(自创词 •༝•，即所有index页面要用到的东西，包括sass和js都写在index目录下,底下会有目录示意图)，目的是达到，我在src下编辑我想要的文件，打包后生成到public下去。<br>写在配置最前面的是路径的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var PUBLIC_PATH = path.resolve(ROOT_PATH, 'Public');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ROOT_PATH = path.resolve(__dirname);
<span class="hljs-keyword">var</span> SRC_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'src'</span>);
<span class="hljs-keyword">var</span> PUBLIC_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'Public'</span>);</code></pre>
<p>配合着入口文件和输出文件的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    index: path.resolve(SRC_PATH, 'index/index.js'),
},
output: {
    path: PUBLIC_PATH,
    filename: '[name].bundle.js',
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
    <span class="hljs-attr">index</span>: path.resolve(SRC_PATH, <span class="hljs-string">'index/index.js'</span>),
},
<span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: PUBLIC_PATH,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].bundle.js'</span>,
},</code></pre>
<p>主要的插件就是这个html生成的插件和自动打开浏览器的插件，还有babel的配置，不管三七二十一都把他们的等级开到最大</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new HtmlwebpackPlugin({
        title: 'My first react-webpack'
    }),
    new OpenBrowserPlugin({
        url: 'http://localhost:8200'
    })
],
babel: { //配置babel
    &quot;presets&quot;: [&quot;es2015&quot;,'stage-0', 'react'],
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: [
    <span class="hljs-keyword">new</span> HtmlwebpackPlugin({
        <span class="hljs-attr">title</span>: <span class="hljs-string">'My first react-webpack'</span>
    }),
    <span class="hljs-keyword">new</span> OpenBrowserPlugin({
        <span class="hljs-attr">url</span>: <span class="hljs-string">'http://localhost:8200'</span>
    })
],
<span class="hljs-attr">babel</span>: { <span class="hljs-comment">//配置babel</span>
    <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"es2015"</span>,<span class="hljs-string">'stage-0'</span>, <span class="hljs-string">'react'</span>],
},</code></pre>
<p>npm run dev，会自动打开localhost:8200,就可以在浏览器上看到初始化的页面</p>
<h3 id="articleHeader3">jsx</h3>
<p>当你开始要写js的时候发现，怎么这么多警告，</p>
<p>不用担心 google 一下都能解决。</p>
<p>在这里下载react 和 react-native：<br><span class="img-wrap"><img data-src="https://ohovav7hg.qnssl.com/reactws1.png" src="https://static.alili.techhttps://ohovav7hg.qnssl.com/reactws1.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>并勾选对应项，保存：<br><span class="img-wrap"><img data-src="https://ohovav7hg.qnssl.com/reactws2.png" src="https://static.alili.techhttps://ohovav7hg.qnssl.com/reactws2.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>警告会少很多，但是还是有一些警告，怎么办呢</p>
<p>点击这个小灯泡，然后选择configure<br><span class="img-wrap"><img data-src="https://ohovav7hg.qnssl.com/reactws3.png" src="https://static.alili.techhttps://ohovav7hg.qnssl.com/reactws3.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>把这两项勾选掉，保存，就一片清净了。</p>
<p><span class="img-wrap"><img data-src="https://ohovav7hg.qnssl.com/reactws4.png" src="https://static.alili.techhttps://ohovav7hg.qnssl.com/reactws4.png" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">项目描述</h3>
<p>Public是打包后生成的目录，src是写目录</p>
<p>src采用横向目录结构(自创词 •༝•)，即所有index页面要用到的东西，包括sass和js都写在index目录下。</p>
<p><span class="img-wrap"><img data-src="https://ohovav7hg.qnssl.com/reactws5.png" src="https://static.alili.techhttps://ohovav7hg.qnssl.com/reactws5.png" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">指令运行项目</h3>
<ul>
<li><p><code>npm i</code></p></li>
<li><p><code>npm run build</code> 生成打包后的文件</p></li>
<li><p><code>npm run dev</code></p></li>
</ul>
<h2 id="articleHeader6">数据绑定</h2>
<h5>1 文本插值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>{text}\</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">{text}</span><span class="xml">\<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<h5>2 html 插值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div dangerouslySetInnerHTML="{{"__html: &quot;\<p>balabalabalabala.......\</p>&quot;"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">"{{"__html:</span> "\&lt;<span class="hljs-attr">p</span>&gt;</span>balabalabalabala.......\<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>""}}" /&gt;</span></code></pre>
<h5>3 属性赋值</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span id = {this.props.idName}>\</span>

<span className = &quot;nav-box&quot;>\</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">span</span> id = {this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.idName</span>}&gt;\&lt;/span&gt;

&lt;<span class="hljs-selector-tag">span</span> className = <span class="hljs-string">"nav-box"</span>&gt;\&lt;/span&gt;</code></pre>
<h5>4 带js表达式的插值 xxx = {三元表达式}</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span className={this.props.idx == this.props.choice? &quot;tab on&quot; : &quot;tab&quot;} >\</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">&lt;span className={<span class="hljs-keyword">this</span>.props.idx == <span class="hljs-keyword">this</span>.props.choice? <span class="hljs-string">"tab on"</span> : <span class="hljs-string">"tab"</span>} &gt;\&lt;/span&gt;</code></pre>
<h5>5 事件绑定</h5>
<p>事件绑定和属性绑定一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如果没有使用class继承的写法的话
getInitialState() {
    return {
        tabTxt: ['CURD', 'Axios', 'Others'],
        choice: 0,
    }
},
    
switchChoice(idx){
        this.setState({
            choice: idx
        })
    },
    
renderTabInit(text, idx) {
    return (<Tab key={idx} idx={idx}
             choose={this.switchChoice} // 绑定了switchChoice方法
             choice={this.state.choice} // 数据data的绑定，this.state可以获取到整个state 
             >{text}</Tab>)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 如果没有使用class继承的写法的话</span>
getInitialState() {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">tabTxt</span>: [<span class="hljs-string">'CURD'</span>, <span class="hljs-string">'Axios'</span>, <span class="hljs-string">'Others'</span>],
        <span class="hljs-attr">choice</span>: <span class="hljs-number">0</span>,
    }
},
    
switchChoice(idx){
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">choice</span>: idx
        })
    },
    
renderTabInit(text, idx) {
    <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Tab</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{idx}</span> <span class="hljs-attr">idx</span>=<span class="hljs-string">{idx}</span>
             <span class="hljs-attr">choose</span>=<span class="hljs-string">{this.switchChoice}</span> // 绑定了<span class="hljs-attr">switchChoice</span>方法
             <span class="hljs-attr">choice</span>=<span class="hljs-string">{this.state.choice}</span> // 数据<span class="hljs-attr">data</span>的绑定，<span class="hljs-attr">this.state</span>可以获取到整个<span class="hljs-attr">state</span> 
             &gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">Tab</span>&gt;</span></span>)
},</code></pre>
<p>有可能会遇到一些BOOM爆炸的bug，请看<a href="https://segmentfault.com/a/1190000007883489">react父子组件间的事件绑定</a></p>
<h2 id="articleHeader7">css和style的绑定</h2>
<h5>1 className</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="className={this.props.idx == this.props.choice? &quot;tab on&quot; : &quot;tab&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">className={<span class="hljs-keyword">this</span>.props.idx == <span class="hljs-keyword">this</span>.props.choice? <span class="hljs-string">"tab on"</span> : <span class="hljs-string">"tab"</span>}</code></pre>
<h5>2 style</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="第一个括号是插值，第二个括号表示style对象

style="{{"color: '#FEC264', fontSize: '40px'"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>第一个括号是插值，第二个括号表示style对象

style="{{"<span class="hljs-string">color:</span> <span class="hljs-string">'#FEC264'</span>, <span class="hljs-string">fontSize:</span> <span class="hljs-string">'40px'</span>"}}"</code></pre>
<h2 id="articleHeader8">列表渲染 &amp; 条件渲染</h2>
<p>在getInitalState中定义了一个数组tabTxt</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getInitialState() {
        return {
            tabTxt: ['CURD', 'Axios', 'Others'],
            choice: 0,
        }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">getInitialState() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tabTxt</span>: [<span class="hljs-string">'CURD'</span>, <span class="hljs-string">'Axios'</span>, <span class="hljs-string">'Others'</span>],
            <span class="hljs-attr">choice</span>: <span class="hljs-number">0</span>,
        }
    },</code></pre>
<p>循环渲染这个子组件，每个子组件有自己的唯一的key，作用和track-by（或v-bind:key）的作用类似</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderTabInit(text, idx) {
        return (<Tab key={idx} idx={idx}
                     choose={this.switchChoice}
                     choice={this.state.choice}
        >{text}</Tab>)
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">renderTabInit(text, idx) {
        <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Tab</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{idx}</span> <span class="hljs-attr">idx</span>=<span class="hljs-string">{idx}</span>
                     <span class="hljs-attr">choose</span>=<span class="hljs-string">{this.switchChoice}</span>
                     <span class="hljs-attr">choice</span>=<span class="hljs-string">{this.state.choice}</span>
        &gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">Tab</span>&gt;</span></span>)
    },</code></pre>
<p>列表渲染的v-for 在react中使用<code>map</code></p>
<p>v-if 的条件渲染可用三元，如复杂判断则需要在return前写逻辑代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    let currentPage = null;
    if(this.state.choice == 0) {
        currentPage = <PageA />
    } else if (this.state.choice == 1){
        currentPage = <PageB />
    } else {
        currentPage = <PageC />
    }
    return (
        <div id=&quot;content&quot;>
            <div id=&quot;navBox&quot;>
                {this.state.tabTxt.map(this.renderTabInit)}
            </div>
            <div id=&quot;pageBox&quot;>
                {currentPage}
            </div>
        </div>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
    <span class="hljs-keyword">let</span> currentPage = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.choice == <span class="hljs-number">0</span>) {
        currentPage = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">PageA</span> /&gt;</span>
    } else if (this.state.choice == 1){
        currentPage = <span class="hljs-tag">&lt;<span class="hljs-name">PageB</span> /&gt;</span>
    } else {
        currentPage = <span class="hljs-tag">&lt;<span class="hljs-name">PageC</span> /&gt;</span>
    }
    return (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"navBox"</span>&gt;</span>
                {this.state.tabTxt.map(this.renderTabInit)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pageBox"</span>&gt;</span>
                {currentPage}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
}</span></code></pre>
<h2 id="articleHeader9">表单控件</h2>
<p>表单组件有几个受用户影响的属性：</p>
<blockquote>
<p>value，用于input、textarea组件</p>
<p>checked， 用于类型为 checkbox 或者 radio 的 input 组件</p>
<p>selected，用于option组件</p>
</blockquote>
<p>每个表单控件都有一个onChange事件用来监听组件的变化:</p>
<blockquote>
<p>当 input 或 textarea 的value 发生变化时</p>
<p>input 的 checked 状态改变时</p>
<p>option 的 selected 状态改变时</p>
</blockquote>
<h3 id="articleHeader10">受限组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //es5
    render: function() {
        return <input type=&quot;text&quot; value=&quot;Hello!&quot; />;
     }
    // 在渲染出来的元素里输入任何值都不起作用，因为 React 已经赋值为 Hello!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code class="javescript">    <span class="hljs-comment">//es5</span>
    render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
        <span class="hljs-keyword">return</span> &lt;input <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> value=<span class="hljs-string">"Hello!"</span> /&gt;;
     }
    <span class="hljs-comment">// 在渲染出来的元素里输入任何值都不起作用，因为 React 已经赋值为 Hello!</span></code></pre>
<p>如果要让用户修改的值有用，则需要：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  getInitialState() {
    return {value: 'Hello!'};
  },
  handleChange(event) {
    this.setState({value: event.target.value});
  },
  render() {
    let value = this.state.value;
    return <input type=&quot;text&quot; value={value} onChange={this.handleChange} />;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  getInitialState() {
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">value</span>: <span class="hljs-string">'Hello!'</span>};
  },
  handleChange(event) {
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: event.target.value});
  },
  render() {
    <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">this</span>.state.value;
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleChange}</span> /&gt;</span>;
  }</span></code></pre>
<h3 id="articleHeader11">不受限组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //es5
   render: function() {
      return (
          <div>
            <input type=&quot;radio&quot; name=&quot;opt&quot; defaultChecked /> Option 1
            <input type=&quot;radio&quot; name=&quot;opt&quot; /> Option 2
            <select defaultValue=&quot;C&quot;>
              <option value=&quot;A&quot;>Apple</option>
              <option value=&quot;B&quot;>Banana</option>
              <option value=&quot;C&quot;>Cranberry</option>
            </select>
          </div>
      );
    }    
    // 用户输入将立即反应到元素上。
    // 和受限元素一样，使用 onChange 事件可以监听值的变化。
    // default 有一个初始值，但这个值用户可以改变并会反应到界面上。  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="javescript">    //es5
   render: function() {
      return (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"opt"</span> <span class="hljs-attr">defaultChecked</span> /&gt;</span> Option 1
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"opt"</span> /&gt;</span> Option 2
            <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">defaultValue</span>=<span class="hljs-string">"C"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"A"</span>&gt;</span>Apple<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"B"</span>&gt;</span>Banana<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"C"</span>&gt;</span>Cranberry<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      );
    }    
    // 用户输入将立即反应到元素上。
    // 和受限元素一样，使用 onChange 事件可以监听值的变化。
    // default 有一个初始值，但这个值用户可以改变并会反应到界面上。  </code></pre>
<h2 id="articleHeader12">父子组件通信</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 父组件，相当于最大的组件
// 子组件是一个tab，和三个page，切换tab 就能切换 page
const Content = React.createClass({
    getInitialState() {
        return {
            tabTxt: ['CURD', 'Axios', 'Others'],
            choice: 0, // 当前选中的tab下标
        }
    },
    
    switchChoice(idx){
        this.setState({ // 修改state    
            choice: idx
        })
    },
    
    renderTabInit(text, idx) {
        return (<Tab key={idx} idx={idx}
                 choice={this.state.choice}  // key\idx\choice 分别都是作为props传入tab子组件的参数名
                 choose={this.switchChoice}  // choose 作为props作为传入tab子组件的方法名
              >{text}</Tab>)
    },
    
    render() {
        let currentPage = null;
        if(this.state.choice == 0) { // 条件判断
            currentPage = <PageA />
        } else if (this.state.choice == 1){
            currentPage = <PageB />
        } else {
            currentPage = <PageC />
        }
        return (
            <div id=&quot;content&quot;>
                <div id=&quot;navBox&quot;>
                    {this.state.tabTxt.map(this.renderTabInit)} //循环输出
                </div>
                <div id=&quot;pageBox&quot;>
                    {currentPage}
                </div>
            </div>
        )
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 父组件，相当于最大的组件</span>
<span class="hljs-comment">// 子组件是一个tab，和三个page，切换tab 就能切换 page</span>
<span class="hljs-keyword">const</span> Content = React.createClass({
    getInitialState() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tabTxt</span>: [<span class="hljs-string">'CURD'</span>, <span class="hljs-string">'Axios'</span>, <span class="hljs-string">'Others'</span>],
            <span class="hljs-attr">choice</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// 当前选中的tab下标</span>
        }
    },
    
    switchChoice(idx){
        <span class="hljs-keyword">this</span>.setState({ <span class="hljs-comment">// 修改state    </span>
            choice: idx
        })
    },
    
    renderTabInit(text, idx) {
        <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Tab</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{idx}</span> <span class="hljs-attr">idx</span>=<span class="hljs-string">{idx}</span>
                 <span class="hljs-attr">choice</span>=<span class="hljs-string">{this.state.choice}</span>  // <span class="hljs-attr">key</span>\<span class="hljs-attr">idx</span>\<span class="hljs-attr">choice</span> 分别都是作为<span class="hljs-attr">props</span>传入<span class="hljs-attr">tab</span>子组件的参数名
                 <span class="hljs-attr">choose</span>=<span class="hljs-string">{this.switchChoice}</span>  // <span class="hljs-attr">choose</span> 作为<span class="hljs-attr">props</span>作为传入<span class="hljs-attr">tab</span>子组件的方法名
              &gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">Tab</span>&gt;</span></span>)
    },
    
    render() {
        <span class="hljs-keyword">let</span> currentPage = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.choice == <span class="hljs-number">0</span>) { <span class="hljs-comment">// 条件判断</span>
            currentPage = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">PageA</span> /&gt;</span>
        } else if (this.state.choice == 1){
            currentPage = <span class="hljs-tag">&lt;<span class="hljs-name">PageB</span> /&gt;</span>
        } else {
            currentPage = <span class="hljs-tag">&lt;<span class="hljs-name">PageC</span> /&gt;</span>
        }
        return (
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"navBox"</span>&gt;</span>
                    {this.state.tabTxt.map(this.renderTabInit)} //循环输出
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pageBox"</span>&gt;</span>
                    {currentPage}
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        )
    }
});</span></code></pre>
<blockquote>
<p>在使用事件绑定choose={this.switchChoice} 的时候，因为没有采用class的学法所以不用bind</p>
<p>class的写法的时候需要bind: choose={this.switchChoice.bind(this)}</p>
<p>不用class的写法的时候不绑定不会导致子组件的this指向错误，如果绑定了还会报错（如绑定this会有警告） </p>
<p>使用了class的写法的时候则需要手动bind, 这个在文章最后会详细解说</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// tab 子组件
const Tab = React.createClass({
    chooseTab() {
        this.props.choose(this.props.idx); //一定要将父组件的方法在子组件中做一个中转
    },
    
    render(){
        return (
            <span className={this.props.idx == this.props.choice? &quot;tab on&quot; : &quot;tab&quot;}
                  style="{{"color: '#FEC264', fontSize: '40px'"}}"
                  data-idx={this.props.idx}
                  onClick={this.chooseTab} // 调用子组件的方法
            >{this.props.children}</span>
        )
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// tab 子组件</span>
<span class="hljs-keyword">const</span> Tab = React.createClass({
    chooseTab() {
        <span class="hljs-keyword">this</span>.props.choose(<span class="hljs-keyword">this</span>.props.idx); <span class="hljs-comment">//一定要将父组件的方法在子组件中做一个中转</span>
    },
    
    render(){
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{this.props.idx</span> == <span class="hljs-string">this.props.choice?</span> "<span class="hljs-attr">tab</span> <span class="hljs-attr">on</span>" <span class="hljs-attr">:</span> "<span class="hljs-attr">tab</span>"}
                  <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"color:</span> '#<span class="hljs-attr">FEC264</span>', <span class="hljs-attr">fontSize:</span> '<span class="hljs-attr">40px</span>'"}}"
                  <span class="hljs-attr">data-idx</span>=<span class="hljs-string">{this.props.idx}</span>
                  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.chooseTab}</span> // 调用子组件的方法
            &gt;</span>{this.props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
        )
    }
});</code></pre>
<h2 id="articleHeader13">获取dom元素</h2>
<blockquote>
<p>当你的组件还没有挂载在容器上，可以用this.refs访问</p>
<p>已经挂载完毕，通过react-dom提供findDOMNode方法拿到组件对应的dom</p>
<p>另外：</p>
<p>如果ref是设置在原生HTML元素上，它拿到的就是DOM元素;</p>
<p>如果设置在自定义组件上，它拿到的就是组件实例，这时候就需要通过 findDOMNode来拿到组件的DOM元素。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//es5
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.getDOMNode().focus(); // 通过this.refs.xxxxx拿到元素
  },
  render: function() {
    return (
      <div>
        <input type=&quot;text&quot; ref=&quot;myTextInput&quot; /> // 给输入框命名ref 
        <input
          type=&quot;button&quot;
          value=&quot;Focus the text input&quot;
          onClick={this.handleClick}
        />
      </div>
    );
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//es5</span>
<span class="hljs-keyword">var</span> MyComponent = React.createClass({
  <span class="hljs-attr">handleClick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.refs.myTextInput.getDOMNode().focus(); <span class="hljs-comment">// 通过this.refs.xxxxx拿到元素</span>
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;input type="text" ref="myTextInput" /&gt; // 给输入框命名ref 
        &lt;input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick}
        /&gt;
      &lt;/div&gt;
    );
  }
});</code></pre>
<h2 id="articleHeader14">几个常用api</h2>
<h4>componentDidMount</h4>
<h4>componentWillReceiveProps(nextProps)</h4>
<hr>
<h2 id="articleHeader15">花一分钟，改成正统的class写法</h2>
<h5>第一步，把所有createClass 换成 class xxx extends Component。</h5>
<p>我们用一半的es6的姿势写出来的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// half-es6
import React from 'react';
const List = React.createClass({ // 用createdClass创建一个组件
    getInitialState() { // 初始化数据state    
        return { // 在函数的return里定义state
            status: false, 
        }
    }, // 这里一定写逗号
    saveLiValue() { // 组件内要调用的function
        this.setState({
            status: false
        })
    },
    ....
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// half-es6</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">const</span> List = React.createClass({ <span class="hljs-comment">// 用createdClass创建一个组件</span>
    getInitialState() { <span class="hljs-comment">// 初始化数据state    </span>
        <span class="hljs-keyword">return</span> { <span class="hljs-comment">// 在函数的return里定义state</span>
            status: <span class="hljs-literal">false</span>, 
        }
    }, <span class="hljs-comment">// 这里一定写逗号</span>
    saveLiValue() { <span class="hljs-comment">// 组件内要调用的function</span>
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">status</span>: <span class="hljs-literal">false</span>
        })
    },
    ....
})</code></pre>
<p>我们用完整的es6的姿势写出来的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// master
// 利用class姿势的es6
import React, {Component} from 'react';
class List extends Component{
    constructor(props){
        super(props);
        this.state = { 
            status: false, 
        }
    } // 没有逗号
    
    saveLiValue() {
        this.setState({
            status: false
        })
    }
    ....
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// master</span>
<span class="hljs-comment">// 利用class姿势的es6</span>
<span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(props){
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = { 
            <span class="hljs-attr">status</span>: <span class="hljs-literal">false</span>, 
        }
    } <span class="hljs-comment">// 没有逗号</span>
    
    saveLiValue() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">status</span>: <span class="hljs-literal">false</span>
        })
    }
    ....
}    </code></pre>
<h5>第二步，在父组件中，给所有需要传递给子组件的方法加bind(this)。</h5>
<blockquote>
<p>这句话有点绕口，但一定要理解。</p>
<p>1、第一层意思是在父组件上加bind(this)</p>
<p>2、加的目的是防止子组件在调用方法的时候this指向错误</p>
</blockquote>
<p>例如下面这个初始化列表的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// half-es6
// 如果在这种写法下bind(this)，编译后的页面会报警告
// 大概是说react已经提供了丰富的方法可以避免指向错误，不需要手动bind
initListLi(val, idx) {
    return (
        <List {...val} key={idx} index={idx}
              handleTxtChange={this.handleTxtChange}
              handleCheckChange={this.handleCheckChange}
              deleteItem={this.deleteItem}
        />
    )
},

render() {
    return (
        <article className=&quot;page&quot;>
            <h3 className=&quot;h3&quot;>List总条数: {this.state.list.length}</h3>
            <h3 className=&quot;h3&quot;>目前完成条数: {this.state.didCount}</h3>
            <ul className=&quot;ul&quot;>
                {
                    this.state.list.map(this.initListLi)
                }
            </ul>
            <Add addLiItem={this.addLiItem}/>
        </article>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// half-es6</span>
<span class="hljs-comment">// 如果在这种写法下bind(this)，编译后的页面会报警告</span>
<span class="hljs-comment">// 大概是说react已经提供了丰富的方法可以避免指向错误，不需要手动bind</span>
initListLi(val, idx) {
    <span class="hljs-keyword">return</span> (
        &lt;List {...val} key={idx} index={idx}
              handleTxtChange={this.handleTxtChange}
              handleCheckChange={this.handleCheckChange}
              deleteItem={this.deleteItem}
        /&gt;
    )
},

render() {
    return (
        &lt;article className="page"&gt;
            &lt;h3 className="h3"&gt;List总条数: {this.state.list.length}&lt;/h3&gt;
            &lt;h3 className="h3"&gt;目前完成条数: {this.state.didCount}&lt;/h3&gt;
            &lt;ul className="ul"&gt;
                {
                    this.state.list.map(this.initListLi)
                }
            &lt;/ul&gt;
            &lt;Add addLiItem={this.addLiItem}/&gt;
        &lt;/article&gt;
    )
}</code></pre>
<p>但是使用了class的写法之后，就可能会出现警告说 props 是null</p>
<p>这个时候就需要手动bind(this)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// master
// es6的class写法下的函数的事件绑定，
// 如果子组件会需要调用函数，则在父组件中手动向子组件中bind(this)
initListLi(val, idx) {
    return (
        <List {...val} key={idx} index={idx}
              // 以下三个方法都是在向List组件中绑定this
                handleTxtChange={this.handleTxtChange.bind(this)} 
              handleCheckChange={this.handleCheckChange.bind(this)}
              deleteItem={this.deleteItem.bind(this)}
        />
    )
}

render() {
    return (
        <article className=&quot;page&quot;>
            <h3 className=&quot;h3&quot;>List总条数: {this.state.list.length}</h3>
            <h3 className=&quot;h3&quot;>目前完成条数: {this.state.didCount}</h3>
            <ul className=&quot;ul&quot;>
                {
                    this.state.list.map(this.initListLi.bind(this)) //子组件中会需要调用函数
                }
            </ul>
            <Add addLiItem={this.addLiItem.bind(this)}/>
        </article>
    )
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// master</span>
<span class="hljs-comment">// es6的class写法下的函数的事件绑定，</span>
<span class="hljs-comment">// 如果子组件会需要调用函数，则在父组件中手动向子组件中bind(this)</span>
initListLi(val, idx) {
    <span class="hljs-keyword">return</span> (
        &lt;List {...val} key={idx} index={idx}
              // 以下三个方法都是在向List组件中绑定this
                handleTxtChange={this.handleTxtChange.bind(this)} 
              handleCheckChange={this.handleCheckChange.bind(this)}
              deleteItem={this.deleteItem.bind(this)}
        /&gt;
    )
}

render() {
    return (
        &lt;article className="page"&gt;
            &lt;h3 className="h3"&gt;List总条数: {this.state.list.length}&lt;/h3&gt;
            &lt;h3 className="h3"&gt;目前完成条数: {this.state.didCount}&lt;/h3&gt;
            &lt;ul className="ul"&gt;
                {
                    this.state.list.map(this.initListLi.bind(this)) //子组件中会需要调用函数
                }
            &lt;/ul&gt;
            &lt;Add addLiItem={this.addLiItem.bind(this)}/&gt;
        &lt;/article&gt;
    )
}
</code></pre>
<h2 id="articleHeader16">写在后面</h2>
<blockquote>
<p><a href="https://github.com/AppianZ/Close2React" rel="nofollow noreferrer" target="_blank">github地址：Close2React</a></p>
<p>我是嘉宝Appian，一个卖萌出家的算法妹纸。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一段人人都应该知道的从Vue到React的过渡史

## 原文链接
[https://segmentfault.com/a/1190000007883331](https://segmentfault.com/a/1190000007883331)

