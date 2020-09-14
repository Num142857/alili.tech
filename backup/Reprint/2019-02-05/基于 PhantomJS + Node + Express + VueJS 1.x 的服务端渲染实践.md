---
title: '基于 PhantomJS + Node + Express + VueJS 1.x 的服务端渲染实践' 
date: 2019-02-05 2:30:09
hidden: true
slug: l5affmzgeye
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVCf0F" src="https://static.alili.tech/img/bVCf0F" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>项目地址：<a href="https://github.com/jrainlau/vue1.x-ssr-demo" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/jrainlau/vue1.x-ssr-demo" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/v...</a></p></blockquote>
<p>随着Vue 2.0的发布，服务端渲染一度成为了它的热卖点。在此之前，单页应用的首屏加载时长和SEO的问题，一直困扰着开发者们，也在一定程度上制约着前端框架的使用场景。React提出的服务端渲染方案，较好得解决了上述两个痛点，受到了开发者的青睐，但也因此多了一个抨击Vue的理由——Vue没有服务端渲染。为了解决这个问题，Vue的社区里也贡献了一个方案，名曰<a href="https://github.com/ngsru/vue-server" rel="nofollow noreferrer" target="_blank">VueServer</a>。然而这货并非单纯的服务端渲染方案，而是相当于另外一个一个服务端的Vue，看看它的readme就知道了：</p>
<blockquote><p>VueServer.js is designed for static HTML rendering. It has no real reactivity.<br>Also, the module is not running original Vue.js on server. It has its own implementation.<br>It means VueServer.js is just trying to perfectly reproduce the same result as Vue.js does.</p></blockquote>
<p>所以有没有一种通用的解决方法，既能够让我们使用原生的Vue 1.x，又能愉快地进行服务端渲染呢？下面请听我细细道来……</p>
<h2 id="articleHeader0">服务端渲染（SSR）</h2>
<p>在文章开始之前，我们有必要先了解一下什么是服务端渲染，以及为什么需要服务端渲染（知道的同学可以跳过）。<br>服务端渲染（Sever Side Render，简称SSR），听起来高大上，其实原理就是我们最常见的“服务器直接吐出页面”。我们知道，传统的网站都是后端通过拼接、模版填充等方式，把数据与html结合，再一起发送到客户端的。这个把数据与html结合的过程就是服务端渲染。</p>
<p>服务端渲染的好处，首先是首屏加载时间。因为后端发送出来的html是完整的带有数据的html，所以浏览器直接拿来就可以用了。与之相反的，以Vue 1.x开发的单页应用为例，服务端发送过来的html只是一个空的模板，浏览器根据js异步地从后端请求数据，再渲染到html中。一个大型单页应用的js往往很大，异步请求的数量也很多，直接导致的结果就是首屏加载时间长，在网速不好的情况下，白屏或loading的漫长等待过程对于用户体验来说真的很不友好。</p>
<p>另外一点，一般的搜索引擎爬虫由于无法执行html里面的js代码（我大Google除外），所以对于单页应用，爬虫所获取到的仅仅是空的html，因此需要做SEO的网站极少采用单页应用的方案。我们可以看看例子——</p>
<p>首先我们来写一个通过js生成内容的html文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- SPA.html -->

<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>SPA-DEMO</title>
</head>
<body>
    <script>
        var div = document.createElement('div')
        div.innerHTML = 'Hello World!'
        document.body.appendChild(div)
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- SPA.html --&gt;</span>

<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>SPA-DEMO<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>)
        div.innerHTML = <span class="hljs-string">'Hello World!'</span>
        <span class="hljs-built_in">document</span>.body.appendChild(div)
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>浏览器打开，输出“Hello World!”，很好没有问题。</p>
<p>接下来我们来写一个小爬虫：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const superagent = require('superagent')
const cheerio = require('cheerio')

var theUrl = 'http://localhost:3000/spa.html'

const spider = (link) => {
  let promise =  new Promise( (resolve, reject) => {
    superagent.get(link)
      .end((err, res) => {
        if (err) return console.log(err)
        let $ = cheerio.load(res.text)
        console.log($('html').html())
        resolve($)
      })
  })
  return promise
}

spider(theUrl)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> superagent = <span class="hljs-built_in">require</span>(<span class="hljs-string">'superagent'</span>)
<span class="hljs-keyword">const</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cheerio'</span>)

<span class="hljs-keyword">var</span> theUrl = <span class="hljs-string">'http://localhost:3000/spa.html'</span>

<span class="hljs-keyword">const</span> spider = <span class="hljs-function">(<span class="hljs-params">link</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> promise =  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    superagent.get(link)
      .end(<span class="hljs-function">(<span class="hljs-params">err, res</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err)
        <span class="hljs-keyword">let</span> $ = cheerio.load(res.text)
        <span class="hljs-built_in">console</span>.log($(<span class="hljs-string">'html'</span>).html())
        resolve($)
      })
  })
  <span class="hljs-keyword">return</span> promise
}

spider(theUrl)</code></pre>
<p>运行，输出结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVCfOu" src="https://static.alili.tech/img/bVCfOu" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，在<code>&lt;body&gt;&lt;/body&gt;</code>标签之内并没有生成对应的<code>div</code>，爬虫无法解析页面当中的js代码。</p>
<h2 id="articleHeader1">PhantomJS</h2>
<p>为了实现服务端渲染，我们的主角<a href="http://phantomjs.org/" rel="nofollow noreferrer" target="_blank">PhantomJS</a>登场了。</p>
<blockquote><p>PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.</p></blockquote>
<p>简单来说，PhantomJS封装了一个webkit内核，因此可以用它来解析js代码，除此以外它也有着其他非常实用的用法，具体使用方法可以到它的官网进行查看。由于PhantomJS是一个二进制文件，需要安装使用，比较麻烦，所以我找到了另外一个封装了PhantomJS的NodeJS模块——<a href="https://github.com/amir20/phantomjs-node" rel="nofollow noreferrer" target="_blank">phantomjs-node</a></p>
<blockquote><p>PhantomJS integration module for NodeJS</p></blockquote>
<p>有了它，就可以结合node愉快地使用PhantomJS啦！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install phantom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> phantom <span class="hljs-comment">--save</span></code></pre>
<p>新建一个<code>phantom-demo.js</code>文件，写入如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open('http://localhost:3000/spa.html');
    })
    .then(status => {
        console.log(status);
        return sitepage.property('content');
    })
    .then(content => {
        console.log(content);
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> phantom = <span class="hljs-built_in">require</span>(<span class="hljs-string">'phantom'</span>);

<span class="hljs-keyword">var</span> sitepage = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> phInstance = <span class="hljs-literal">null</span>;
phantom.create()
    .then(<span class="hljs-function"><span class="hljs-params">instance</span> =&gt;</span> {
        phInstance = instance;
        <span class="hljs-keyword">return</span> instance.createPage();
    })
    .then(<span class="hljs-function"><span class="hljs-params">page</span> =&gt;</span> {
        sitepage = page;
        <span class="hljs-keyword">return</span> page.open(<span class="hljs-string">'http://localhost:3000/spa.html'</span>);
    })
    .then(<span class="hljs-function"><span class="hljs-params">status</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(status);
        <span class="hljs-keyword">return</span> sitepage.property(<span class="hljs-string">'content'</span>);
    })
    .then(<span class="hljs-function"><span class="hljs-params">content</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(content);
        sitepage.close();
        phInstance.exit();
    })
    .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(error);
        phInstance.exit();
    });</code></pre>
<p>你会在控制台看到完整的<a href="https://segmentfault.com/blog/jrain"></a><a href="http://localhost:3000/spa.html" rel="nofollow noreferrer" target="_blank">http://localhost:3000/spa.html</a>的内容<code>&lt;div&gt;Hello World!&lt;/div&gt;</code></p>
<p><span class="img-wrap"><img data-src="/img/bVCfQT" src="https://static.alili.tech/img/bVCfQT" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">结合Express对Vue 1.x项目进行服务端渲染。</h2>
<p>接下来开始实战了。首先我们要建立一个Vue 1.x的项目，在这里使用<code>vue-cli</code>生成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-cli -g

vue init webpack vue-ssr" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>npm install vue-<span class="hljs-keyword">cli</span> -g

vue init webpack vue-ssr</code></pre>
<p>在生成的项目中执行下列代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install

npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> install

<span class="hljs-built_in">npm</span> run build</code></pre>
<p>可以看到在根目录下生成了一个<code>\dist</code>目录，里面就是构建好的Vue 1.x的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" |__ index.html
  |__ static
    |__ css
      |__ app.b5a0280c4465a06f7978ec4d12a0e364.css
      |__ app.b5a0280c4465a06f7978ec4d12a0e364.css.map
    |__ js
      |__ app.efe50318ee82ab81606b.js
      |__ app.efe50318ee82ab81606b.js.map
      |__ manifest.e2e455c7f6523a9f4859.js
      |__ manifest.e2e455c7f6523a9f4859.js.map
      |__ vendor.13a0cfff63c57c979bbc.js
      |__ vendor.13a0cfff63c57c979bbc.js.map
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code> |<span class="hljs-symbol">__</span> index.html
  |<span class="hljs-symbol">__</span> static
    |<span class="hljs-symbol">__</span> css
      |<span class="hljs-symbol">__</span> app.b5a0280c4465a06f7978ec4d12a0e364.css
      |<span class="hljs-symbol">__</span> app.b5a0280c4465a06f7978ec4d12a0e364.css.<span class="hljs-built_in">map</span>
    |<span class="hljs-symbol">__</span> js
      |<span class="hljs-symbol">__</span> app.efe50318ee82ab81606b.js
      |<span class="hljs-symbol">__</span> app.efe50318ee82ab81606b.js.<span class="hljs-built_in">map</span>
      |<span class="hljs-symbol">__</span> manifest.e2e455c7f6523a9f4859.js
      |<span class="hljs-symbol">__</span> manifest.e2e455c7f6523a9f4859.js.<span class="hljs-built_in">map</span>
      |<span class="hljs-symbol">__</span> vendor.13a0cfff63c57c979bbc.js
      |<span class="hljs-symbol">__</span> vendor.13a0cfff63c57c979bbc.js.<span class="hljs-built_in">map</span>
</code></pre>
<p>接下来我们随便找个地方建立Express项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="express Node-SSR -e

cd Node-SSR &amp;&amp; npm install

npm install phantom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>express <span class="hljs-keyword">Node</span><span class="hljs-title">-SSR</span> -e

cd <span class="hljs-keyword">Node</span><span class="hljs-title">-SSR</span> &amp;&amp; npm install

npm install phantom --save</code></pre>
<p>然后，我们把之前<code>\dist</code>目录下的<code>\static\css</code>和<code>\static\js</code>中的全部代码，分别复制粘贴到刚刚生成的Express项目的<code>\public\stylesheets</code>和<code>\public\javascripts</code>文件夹当中（注意，一定要包括所有<code>*.map</code>文件），同时把<code>\dist</code>目录下的<code>index.html</code>改名为<code>vue-index.ejs</code>，放置到Express项目的<code>\view</code>文件夹当中，改写一下，把里面所有的引用路径改为以<code>/stylesheets/</code>或<code>/javascripts/</code>开头。</p>
<p>接下来，我们打开Express项目中的<code>\routes\index.js</code>文件，改写为如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express')
const router = express.Router()

const phantom = require('phantom')


/* GET home page. */

router.get('/render-vue', (req, res, next) => {
    res.render('vue-index')
})

router.get('/vue', (req, res, next) => {
    let sitepage = null
    let phInstance = null
    let response = res
    phantom.create()
        .then(instance => {
            phInstance = instance
            return instance.createPage()
        })
        .then(page => {
            sitepage = page
            return page.open('http://localhost:3000/render-vue')
        })
        .then(status => {
            console.log('status is: ' + status)
            return sitepage.property('content')
        })
        .then(content => {
            // console.log(content)
            response.send(content)
            sitepage.close()
            phInstance.exit()
        })
        .catch(error => {
            console.log(error)
            phInstance.exit()
        })
})

module.exports = router
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> router = express.Router()

<span class="hljs-keyword">const</span> phantom = <span class="hljs-built_in">require</span>(<span class="hljs-string">'phantom'</span>)


<span class="hljs-comment">/* GET home page. */</span>

router.get(<span class="hljs-string">'/render-vue'</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
    res.render(<span class="hljs-string">'vue-index'</span>)
})

router.get(<span class="hljs-string">'/vue'</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> sitepage = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">let</span> phInstance = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">let</span> response = res
    phantom.create()
        .then(<span class="hljs-function"><span class="hljs-params">instance</span> =&gt;</span> {
            phInstance = instance
            <span class="hljs-keyword">return</span> instance.createPage()
        })
        .then(<span class="hljs-function"><span class="hljs-params">page</span> =&gt;</span> {
            sitepage = page
            <span class="hljs-keyword">return</span> page.open(<span class="hljs-string">'http://localhost:3000/render-vue'</span>)
        })
        .then(<span class="hljs-function"><span class="hljs-params">status</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'status is: '</span> + status)
            <span class="hljs-keyword">return</span> sitepage.property(<span class="hljs-string">'content'</span>)
        })
        .then(<span class="hljs-function"><span class="hljs-params">content</span> =&gt;</span> {
            <span class="hljs-comment">// console.log(content)</span>
            response.send(content)
            sitepage.close()
            phInstance.exit()
        })
        .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(error)
            phInstance.exit()
        })
})

<span class="hljs-built_in">module</span>.exports = router
</code></pre>
<p>现在我们用之前的爬虫爬取<a href="http://localhost:3000/render-vue" rel="nofollow noreferrer" target="_blank">http://localhost:3000/render-vue</a>的内容，其结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVCfUp" src="https://static.alili.tech/img/bVCfUp" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以看到是一些未被执行的js。</p>
<p>然后我们爬取一下<a href="http://localhost:3000/vue" rel="nofollow noreferrer" target="_blank">http://localhost:3000/vue</a>，看看结果是什么：</p>
<p><span class="img-wrap"><img data-src="/img/bVCfUD" src="https://static.alili.tech/img/bVCfUD" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>满满的内容。</p>
<p>我们也可以在浏览器打开上面两个地址，虽然结果都是如下图，但是通过开发者工具的<code>Network</code>选项，可以看到所请求的html内容是不同的。</p>
<p><span class="img-wrap"><img data-src="/img/bVCfUO" src="https://static.alili.tech/img/bVCfUO" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>至此，基于PhantomJS + Node + Express + VueJS 1.x的服务端渲染实践就告一段落了。</p>
<h2 id="articleHeader3">优化</h2>
<p>由于PhantomJS打开页面并解析当中的js代码也需要一定时间，我们不应该在用户每次请求的时候都重新执行一次服务端渲染，而是应该让服务端把PhantomJS渲染的结果缓存起来，这样用户的每次请求只需要返回缓存的结果即可，大大减少服务器压力并节省时间。</p>
<h2 id="articleHeader4">后记</h2>
<p>本文仅作抛砖引玉学习之用，并未进行深入的研究。同时此文章所研究的方法不仅仅适用于Vue的项目，理论上任何构建过后的单页应用项目都可以使用。如果读者发现文章有任何错漏烦请指点一二，感激不尽。若有更好的服务端渲染的方法，也欢迎和我分享。</p>
<p>感谢你的阅读。我是Jrain，欢迎关注<a href="https://segmentfault.com/blog/jrain">我的专栏</a>，将不定期分享自己的学习体验，开发心得，搬运墙外的干货。下次见啦！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 PhantomJS + Node + Express + VueJS 1.x 的服务端渲染实践

## 原文链接
[https://segmentfault.com/a/1190000006695341](https://segmentfault.com/a/1190000006695341)

