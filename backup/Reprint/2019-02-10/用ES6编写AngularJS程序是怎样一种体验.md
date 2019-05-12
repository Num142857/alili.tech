---
title: '用ES6编写AngularJS程序是怎样一种体验' 
date: 2019-02-10 2:30:42
hidden: true
slug: aym5ewewisv
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://angularjs.org/" rel="nofollow noreferrer" target="_blank">AngularJS</a>不用我赘述，前端开发人员一定耳熟能详。有人称之为<code>MVWhatever</code>框架，意思是使用<code>AngularJS</code>，你可以参考任意范式进行应用开发，无论是<code>MVC</code>、还是<code>MVVVM</code>都信手拈来，只要你懂，范式在<code>AngularJS</code>手下，都可以轻松适配。</p>
<p>随着各种现代浏览器、以及<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node</a>对<a href="https://github.com/lukehoban/es6features" rel="nofollow noreferrer" target="_blank">ES6</a>的支持，已经有越来越多的<code>ES6</code>特性可以在程序中使用，她们给开发过程带来的便利不言而喻，举个小例子，我想从一个数组里找一些符合条件的数据，放入另一个数组内，过去我们这么写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var list = [],
    i;

for (i = 0; i < originalList.length; i++) {
    var item = originalList[i];
    if (item.gender === 'male') {
        list.push(item);
    }
}

console.log(list); //符合条件的新数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> list = [],
    i;

<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; originalList.length; i++) {
    <span class="hljs-keyword">var</span> item = originalList[i];
    <span class="hljs-keyword">if</span> (item.gender === <span class="hljs-string">'male'</span>) {
        list.push(item);
    }
}

<span class="hljs-built_in">console</span>.log(list); <span class="hljs-comment">//符合条件的新数组</span></code></pre>
<p>如果改用数组的高阶函数，再配合<code>ES6</code>的<a href="https://github.com/lukehoban/es6features#arrows" rel="nofollow noreferrer" target="_blank">arrow function</a>，代码可以简洁如斯：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = originalList.filter(item => item.gender === 'male');

console.log(list); //符合条件的新数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> list = originalList.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.gender === <span class="hljs-string">'male'</span>);

<span class="hljs-built_in">console</span>.log(list); <span class="hljs-comment">//符合条件的新数组</span></code></pre>
<p>既然有如此优雅的语法糖能让我们的开发变得high到爆，那过去我们认为屌炸天的<code>AngularJS</code>(现在也屌炸天，只不过还有<code>Angular2</code>, <code>React</code>, <code>vue</code>横空出世)是不是可以用<code>ES6</code>来写？少年不要怀疑，真的可以哦！<br><span class="img-wrap"><img data-src="/img/bVvzzS?w=411&amp;h=287" src="https://static.alili.tech/img/bVvzzS?w=411&amp;h=287" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>一个良好、快速、简洁的<code>starter</code>工具有利于我们对<code>ES6</code>编写<code>AngularJS</code>的深入认知，所以我要用一个骨架生成器<a href="https://github.com/leftstick/generator-es6-angular" rel="nofollow noreferrer" target="_blank">generator-es6-angular</a>来创建新项目，该<code>generator</code>是依托于<a href="http://yeoman.io/" rel="nofollow noreferrer" target="_blank">yeoman</a>的脚手架。</p>
<h2 id="articleHeader0">安装<code>yo</code>
</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g yo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g yo</code></pre>
<blockquote><p>请注意前缀<code>sudo</code>，如果你使用的是<code>unix</code> like操作系统的话</p></blockquote>
<h2 id="articleHeader1">安装<code>generator-es6-angular</code>
</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g generator-es6-angular" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g generator-es6-angular</code></pre>
<blockquote><p>请注意前缀<code>sudo</code>，如果你使用的是<code>unix</code> like操作系统的话</p></blockquote>
<h2 id="articleHeader2">使用<code>generator-es6-angular</code>创建项目</h2>
<p>先找个你喜欢的目录，然后运行下面的命令，因为一会新项目会直接创建在该目录下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yo es6-angular" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yo es6-angular</code></pre>
<p>上面命令回车后，生成器会问你如下问题，老实作答即可(注意: 对单页应用没经验的孩纸，在<code>Use html5 model</code>这个问题上，请选择<code>No</code>; 当问你<code>Which registry would you use?</code>时，国内用户选择第一个淘宝镜像安装速度会快很多)</p>
<p><span class="img-wrap"><img data-src="/img/bVvzBQ?w=411&amp;h=354" src="https://static.alili.tech/img/bVvzBQ?w=411&amp;h=354" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当命令执行完毕后，你就能在当前目录下看到刚才创建的项目了，本例中我使用的<code>project name</code>是<code>es6-demo</code>。</p>
<h2 id="articleHeader3">开启调试之旅</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#进入刚创建的项目目录
cd es6-demo
#启动调试服务
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment">#进入刚创建的项目目录</span>
<span class="hljs-built_in">cd</span> es6-demo
<span class="hljs-comment">#启动调试服务</span>
npm start</code></pre>
<p>然后你就可以在<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>下，看到刚创建的项目的运行效果了:</p>
<p><span class="img-wrap"><img data-src="/img/bVvzCt?w=941&amp;h=831" src="https://static.alili.tech/img/bVvzCt?w=941&amp;h=831" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">项目简介</h2>
<h3 id="articleHeader5">骨架结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="es6-demo
├── etc
│&nbsp;&nbsp; └── config.js
├── img
│&nbsp;&nbsp; └── ...
├── js
│&nbsp;&nbsp; ├── features
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── about
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── about.co
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── about.css
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── subs
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     ├── more
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     │&nbsp;&nbsp; ├── index.co
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     │&nbsp;&nbsp; └── more.css
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── why
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;         ├── index.co
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;         └── why.css
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── routes.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── common
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── menu.co
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── menu.css
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── directives
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── autofocus.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── runners
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     ├── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── routeIndicator.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── home
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── home.co
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── home.css
│   │   │   │
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── routes.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── service
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── HomeService.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── main.js
│&nbsp;&nbsp; ├── fw
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── config
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── SSOConfig.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── routerConfig.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── ext
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── helper
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── event.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── ngDeclare.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── object.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── value
│&nbsp;&nbsp; │&nbsp;&nbsp;     ├── main.js
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── routesValue.js
│&nbsp;&nbsp; ├── application.co
│&nbsp;&nbsp; ├── application.css
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; └── main.js
├── index.html_vm
├── package.json
├── postcss.config.js
├── webpack.config.js
└── webpack.config.prod.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>es6-demo
├── etc
│&nbsp;&nbsp; └── config<span class="hljs-selector-class">.js</span>
├── <span class="hljs-selector-tag">img</span>
│&nbsp;&nbsp; └── ...
├── js
│&nbsp;&nbsp; ├── features
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── about
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── about<span class="hljs-selector-class">.co</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── about<span class="hljs-selector-class">.css</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── subs
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     ├── more
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.co</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     │&nbsp;&nbsp; └── more<span class="hljs-selector-class">.css</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── why
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;         ├── index<span class="hljs-selector-class">.co</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;         └── why<span class="hljs-selector-class">.css</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── routes<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── common
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">menu</span><span class="hljs-selector-class">.co</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">menu</span><span class="hljs-selector-class">.css</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── directives
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── autofocus<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── runners
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     ├── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── routeIndicator<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── home
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── home<span class="hljs-selector-class">.co</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── home<span class="hljs-selector-class">.css</span>
│   │   │   │
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── routes<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── service
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp;     └── HomeService<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── fw
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── config
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── SSOConfig<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── routerConfig<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── ext
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── helper
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── event<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── ngDeclare<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">object</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── value
│&nbsp;&nbsp; │&nbsp;&nbsp;     ├── main<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── routesValue<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── application<span class="hljs-selector-class">.co</span>
│&nbsp;&nbsp; ├── application<span class="hljs-selector-class">.css</span>
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── main<span class="hljs-selector-class">.js</span>
├── index<span class="hljs-selector-class">.html_vm</span>
├── package<span class="hljs-selector-class">.json</span>
├── postcss<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
├── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
└── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.js</span></code></pre>
<ul>
<li><p><code>etc</code>, 一些公共配置性内容，可以放在这里，方便查找、通用</p></li>
<li><p><code>img</code>, 用我多说么？放图片的啦</p></li>
<li><p><code>js</code>, 分为<code>features</code>和<code>fw</code>两大部分。这个内容略多，我后面详述吧。</p></li>
<li><p><code>index.html_vm</code>, 单页应用<code>html</code>模版，最终的<code>html</code>会由<code>webpack</code>根据这个模版生成</p></li>
<li><p><code>package.json</code>, 项目的<code>npm</code>描述文件，那些具体的工具命令(譬如刚才用过的<code>npm start</code>，都在这里面定义好了)</p></li>
<li><p><code>postcss.config.js</code>, <code>postcss</code>的配置文件</p></li>
<li><p><code>webpack.config.js</code>, 开发、调试环境使用的<code>webpack</code>配置</p></li>
<li><p><code>webpack.config.prod.js</code>, 正式运行环境使用的<code>webpack</code>配置。<code>npm run release</code>命令会用这个配置，生成的结果都会给文件名加<code>hash</code>，<code>javascript</code>文件也会压缩。</p></li>
</ul>
<h3 id="articleHeader6">可用工具介绍</h3>
<ul>
<li><p><code>npm start</code>, 启动调试服务器，使用<code>webpack.config.dev.js</code>作为<code>webpack</code>配置，不直接生成物理文件，直接内存级别响应调试服务器资源请求。而且内置<code>hot reload</code>，不用重启服务，修改源码，浏览器即可刷新看到新效果</p></li>
<li><p><code>npm run release</code>, 使用<code>webpack.config.prod.js</code>作为<code>webpack</code>配置，生成压缩、去缓存化的<code>bundle</code>文件到<code>es6-demo/build</code>目录下。也就是说，如果你要发布到生产环境或者其它什么测试环境，你应该提供的是<code>es6-demo/build</code>目录下生成的那堆东西，而不是源码。</p></li>
</ul>
<h3 id="articleHeader7">
<code>js</code>目录介绍</h3>
<h4>features</h4>
<p><strong>common</strong></p>
<p>那些通用的组件、指令、过滤器、服务。。。通通应该放在这里，譬如为了演示方便，我已经在<code>features/common/directives</code>里写了一个<code>autofocus.js</code>的指令，拿去用，不要客气。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    type: 'directive',//声明这是一个指令
    name: 'autofocus',//声明指令名

    //声明指令构造函数，详见：https://docs.angularjs.org/api/ng/type/angular.Module#directive
    directiveFactory: function() {
        'ngInject';

        return {
            restrict: 'A',
            link($scope, element) {
                element[0].focus();
            }
        };
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'directive'</span>,<span class="hljs-comment">//声明这是一个指令</span>
    name: <span class="hljs-string">'autofocus'</span>,<span class="hljs-comment">//声明指令名</span>

    <span class="hljs-comment">//声明指令构造函数，详见：https://docs.angularjs.org/api/ng/type/angular.Module#directive</span>
    directiveFactory: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-string">'ngInject'</span>;

        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">restrict</span>: <span class="hljs-string">'A'</span>,
            link($scope, element) {
                element[<span class="hljs-number">0</span>].focus();
            }
        };
    }
};</code></pre>
<blockquote><p>同时当然也可以声明诸如：组件、过滤器之类的公共工具，详见:<a href="https://github.com/leftstick/generator-es6-angular/blob/master/docs/api.md#jsfeaturescommon" rel="nofollow noreferrer" target="_blank">common</a></p></blockquote>
<p><strong>about</strong><br><strong>home</strong></p>
<p>这两个就是纯粹为了演示“功能 &lt;对应&gt; 路由”这个小原则而做的，你可以分别在这两个<code>feature</code>下找到一个<code>routes.js</code>，里面的内容就描述了该功能对应一个(或多个)路由，是何等的easy。至于最后这个路由会怎样被这个骨架使用，小伙伴们，好好研究哦！</p>
<h4>fw</h4>
<p>这里面都是些所谓"框架"级别的设置，有兴趣的话挨个儿打开瞧瞧嘛，没什么大不了的。</p>
<blockquote><p>特别注意，大部分时候，你的开发都应该围绕<code>features</code>目录展开，之所以叫<code>fw</code>，就是和具体业务无关，除非你需要修改框架启动逻辑，路由控制系统。。。，否则不需要动这里的内容</p></blockquote>
<h3 id="articleHeader8">源码介绍</h3>
<h4>js/index.js</h4>
<p>入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 
 * 这里连用两个ensure，是webpack的特性，可以强制在bundle时将内容拆成两个部分
 * 然后两个部分还并行加载
 *
 */

//第一个部分是一个很小的spinner，在并行加载两个chunk时，这个非常小的部分90%会竞速成功
//于是你就看到了传说中的loading动画
require.ensure(['splash-screen/dist/splash.min.css', 'splash-screen'], function(require) {

    require('splash-screen/dist/splash.min.css').use();
    require('splash-screen').Splash.enable('circular');
});

//由于这里是真正的业务，代码多了太多，所以体积也更大，加载也更慢，于是在这个chunk加载完成前
//有个美好的loading动画，要比生硬的白屏更优雅。
//放心，这个chunk加载完后，loading动画也会被销毁
require.ensure(['css/main.css', 'splash-screen', './main'], function(require) {

    require('css/main.css').use();
    //这里启动了真正的“框架”
    var App = require('./main').default;
    (new App()).run();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 
 * 这里连用两个ensure，是webpack的特性，可以强制在bundle时将内容拆成两个部分
 * 然后两个部分还并行加载
 *
 */</span>

<span class="hljs-comment">//第一个部分是一个很小的spinner，在并行加载两个chunk时，这个非常小的部分90%会竞速成功</span>
<span class="hljs-comment">//于是你就看到了传说中的loading动画</span>
<span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'splash-screen/dist/splash.min.css'</span>, <span class="hljs-string">'splash-screen'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{

    <span class="hljs-built_in">require</span>(<span class="hljs-string">'splash-screen/dist/splash.min.css'</span>).use();
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'splash-screen'</span>).Splash.enable(<span class="hljs-string">'circular'</span>);
});

<span class="hljs-comment">//由于这里是真正的业务，代码多了太多，所以体积也更大，加载也更慢，于是在这个chunk加载完成前</span>
<span class="hljs-comment">//有个美好的loading动画，要比生硬的白屏更优雅。</span>
<span class="hljs-comment">//放心，这个chunk加载完后，loading动画也会被销毁</span>
<span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'css/main.css'</span>, <span class="hljs-string">'splash-screen'</span>, <span class="hljs-string">'./main'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{

    <span class="hljs-built_in">require</span>(<span class="hljs-string">'css/main.css'</span>).use();
    <span class="hljs-comment">//这里启动了真正的“框架”</span>
    <span class="hljs-keyword">var</span> App = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./main'</span>).default;
    (<span class="hljs-keyword">new</span> App()).run();
});</code></pre>
<h4>js/main.js</h4>
<p>“框架”启动器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入依赖部分
import angular from 'angular';
//引入Object帮助库
import {pluck} from './fw/helper/object';
//引入feature注册工具
import {declareFeatures, declareValues, declareDirectives, declareComponents, declareRunners, declareFilters} from './fw/helper/ngDeclare';
//引入三方依赖
import Extensions from './fw/ext/main';
//引入项目配置
import Configurators from './fw/config/main';
//引入项目常量设置
import Values from './fw/value/main';
//引入features
import Things from './features/main';
//引入根组件
import Application from './application';
//引入启动spinner控制器
import {Splash} from 'splash-screen';

class App {

    constructor() {
        //这里相当于ng-app的名字
        this.appName = 'es6-demo';
        //找到所有的features
        this.features = Things.filter(t => t.type === 'feature' &amp;&amp; t.name);
    }
    
    //检查项目基本设置
    validate() {
        if (!this.features || this.features.length === 0) {
            return console.warn('No features loaded');
        }

        const modNames = pluck(this.features, 'name').sort();
        for (let i = 0; i < modNames.length - 1; i++) {
            if (modNames[i] === modNames[i + 1]) {
                throw new Error('Duplicated Module: [ ' + modNames[i] + ' ], you have to specify another name');
            }
        }
    }

    //从features实例中提取AngularJS module name
    //并将这些name作为es6-demo的依赖
    //会在下面createApp时用到
    findDependencies() {
        this.depends = [...Extensions, ...this.features.map(f => f.name)];
    }

    //创建angular应用
    createApp() {
        declareFeatures(this.features);

        this.app = angular.module(this.appName, this.depends);
        this.app.component('application', Application);
    }

    //配置es6-demo
    configApp() {
        Configurators.forEach(Configurator => {
            this.app.config(Configurator.config);
        });
    }
    
    //注册fw下的“框架”级service
    registerServices() {
        declareValues(this.app, Values);
        declareDirectives(this.app, Things.filter(t => t.type === 'directive'));
        declareComponents(this.app, Things.filter(t => t.type === 'component'));
        declareRunners(this.app, Things.filter(t => t.type === 'runner'));
        declareFilters(this.app, Things.filter(t => t.type === 'filter'));
    }

    //看到了么，这里我会销毁loading动画，并做了容错
    //也就是说，即便你遇到了那微乎其微的状况，loading动画比业务的chunk加载还慢
    //我也会默默的把它收拾掉的
    destroySplash() {
        Splash.destroy();
        require('splash-screen/dist/splash.min.css').unuse();
        setTimeout(() => {
            if (Splash.isRunning()) {
                this.destroySplash();
            }
        }, 100);
    }
    
    //启动AngularJS app
    launch() {
        angular.bootstrap(document, [this.appName]);
    }

    //顺序激活所有模块
    run() {
        this.validate();
        this.findDependencies();
        this.createApp();
        this.configApp();
        this.registerServices();
        this.destroySplash();
        this.launch();
    }

}

export default App;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//引入依赖部分</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">'angular'</span>;
<span class="hljs-comment">//引入Object帮助库</span>
<span class="hljs-keyword">import</span> {pluck} <span class="hljs-keyword">from</span> <span class="hljs-string">'./fw/helper/object'</span>;
<span class="hljs-comment">//引入feature注册工具</span>
<span class="hljs-keyword">import</span> {declareFeatures, declareValues, declareDirectives, declareComponents, declareRunners, declareFilters} <span class="hljs-keyword">from</span> <span class="hljs-string">'./fw/helper/ngDeclare'</span>;
<span class="hljs-comment">//引入三方依赖</span>
<span class="hljs-keyword">import</span> Extensions <span class="hljs-keyword">from</span> <span class="hljs-string">'./fw/ext/main'</span>;
<span class="hljs-comment">//引入项目配置</span>
<span class="hljs-keyword">import</span> Configurators <span class="hljs-keyword">from</span> <span class="hljs-string">'./fw/config/main'</span>;
<span class="hljs-comment">//引入项目常量设置</span>
<span class="hljs-keyword">import</span> Values <span class="hljs-keyword">from</span> <span class="hljs-string">'./fw/value/main'</span>;
<span class="hljs-comment">//引入features</span>
<span class="hljs-keyword">import</span> Things <span class="hljs-keyword">from</span> <span class="hljs-string">'./features/main'</span>;
<span class="hljs-comment">//引入根组件</span>
<span class="hljs-keyword">import</span> Application <span class="hljs-keyword">from</span> <span class="hljs-string">'./application'</span>;
<span class="hljs-comment">//引入启动spinner控制器</span>
<span class="hljs-keyword">import</span> {Splash} <span class="hljs-keyword">from</span> <span class="hljs-string">'splash-screen'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> </span>{

    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-comment">//这里相当于ng-app的名字</span>
        <span class="hljs-keyword">this</span>.appName = <span class="hljs-string">'es6-demo'</span>;
        <span class="hljs-comment">//找到所有的features</span>
        <span class="hljs-keyword">this</span>.features = Things.filter(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.type === <span class="hljs-string">'feature'</span> &amp;&amp; t.name);
    }
    
    <span class="hljs-comment">//检查项目基本设置</span>
    validate() {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.features || <span class="hljs-keyword">this</span>.features.length === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'No features loaded'</span>);
        }

        <span class="hljs-keyword">const</span> modNames = pluck(<span class="hljs-keyword">this</span>.features, <span class="hljs-string">'name'</span>).sort();
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; modNames.length - <span class="hljs-number">1</span>; i++) {
            <span class="hljs-keyword">if</span> (modNames[i] === modNames[i + <span class="hljs-number">1</span>]) {
                <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Duplicated Module: [ '</span> + modNames[i] + <span class="hljs-string">' ], you have to specify another name'</span>);
            }
        }
    }

    <span class="hljs-comment">//从features实例中提取AngularJS module name</span>
    <span class="hljs-comment">//并将这些name作为es6-demo的依赖</span>
    <span class="hljs-comment">//会在下面createApp时用到</span>
    findDependencies() {
        <span class="hljs-keyword">this</span>.depends = [...Extensions, ...this.features.map(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> f.name)];
    }

    <span class="hljs-comment">//创建angular应用</span>
    createApp() {
        declareFeatures(<span class="hljs-keyword">this</span>.features);

        <span class="hljs-keyword">this</span>.app = angular.module(<span class="hljs-keyword">this</span>.appName, <span class="hljs-keyword">this</span>.depends);
        <span class="hljs-keyword">this</span>.app.component(<span class="hljs-string">'application'</span>, Application);
    }

    <span class="hljs-comment">//配置es6-demo</span>
    configApp() {
        Configurators.forEach(<span class="hljs-function"><span class="hljs-params">Configurator</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.app.config(Configurator.config);
        });
    }
    
    <span class="hljs-comment">//注册fw下的“框架”级service</span>
    registerServices() {
        declareValues(<span class="hljs-keyword">this</span>.app, Values);
        declareDirectives(<span class="hljs-keyword">this</span>.app, Things.filter(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.type === <span class="hljs-string">'directive'</span>));
        declareComponents(<span class="hljs-keyword">this</span>.app, Things.filter(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.type === <span class="hljs-string">'component'</span>));
        declareRunners(<span class="hljs-keyword">this</span>.app, Things.filter(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.type === <span class="hljs-string">'runner'</span>));
        declareFilters(<span class="hljs-keyword">this</span>.app, Things.filter(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.type === <span class="hljs-string">'filter'</span>));
    }

    <span class="hljs-comment">//看到了么，这里我会销毁loading动画，并做了容错</span>
    <span class="hljs-comment">//也就是说，即便你遇到了那微乎其微的状况，loading动画比业务的chunk加载还慢</span>
    <span class="hljs-comment">//我也会默默的把它收拾掉的</span>
    destroySplash() {
        Splash.destroy();
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'splash-screen/dist/splash.min.css'</span>).unuse();
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (Splash.isRunning()) {
                <span class="hljs-keyword">this</span>.destroySplash();
            }
        }, <span class="hljs-number">100</span>);
    }
    
    <span class="hljs-comment">//启动AngularJS app</span>
    launch() {
        angular.bootstrap(<span class="hljs-built_in">document</span>, [<span class="hljs-keyword">this</span>.appName]);
    }

    <span class="hljs-comment">//顺序激活所有模块</span>
    run() {
        <span class="hljs-keyword">this</span>.validate();
        <span class="hljs-keyword">this</span>.findDependencies();
        <span class="hljs-keyword">this</span>.createApp();
        <span class="hljs-keyword">this</span>.configApp();
        <span class="hljs-keyword">this</span>.registerServices();
        <span class="hljs-keyword">this</span>.destroySplash();
        <span class="hljs-keyword">this</span>.launch();
    }

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;</code></pre>
<h3 id="articleHeader9">用ES6写Feature</h3>
<p><strong>features/home/main.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入路由
import routes from './routes';

//引入所有本feature中要用到的组件
import home from './components/home';
import logo from './components/subs/logo';
import description from './components/subs/description';
import github from './components/subs/github';
import todoApp from './components/subs/todo';
import footer from './components/subs/footer';

//引入本feature中要用到的service
import HomeService from './service/HomeService';

export default {
    type: 'feature',//声明该模块是一个feature
    name: 'home',//声明feature的名字，必须的
    routes,//倒入路由
    component: {//注册所有用到的组件
        home,
        logo,
        description,
        github,
        todoApp,
        footer
    },
    service: {//注册所有用到的service
        HomeService
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//引入路由</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>;

<span class="hljs-comment">//引入所有本feature中要用到的组件</span>
<span class="hljs-keyword">import</span> home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home'</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/subs/logo'</span>;
<span class="hljs-keyword">import</span> description <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/subs/description'</span>;
<span class="hljs-keyword">import</span> github <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/subs/github'</span>;
<span class="hljs-keyword">import</span> todoApp <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/subs/todo'</span>;
<span class="hljs-keyword">import</span> footer <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/subs/footer'</span>;

<span class="hljs-comment">//引入本feature中要用到的service</span>
<span class="hljs-keyword">import</span> HomeService <span class="hljs-keyword">from</span> <span class="hljs-string">'./service/HomeService'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'feature'</span>,<span class="hljs-comment">//声明该模块是一个feature</span>
    name: <span class="hljs-string">'home'</span>,<span class="hljs-comment">//声明feature的名字，必须的</span>
    routes,<span class="hljs-comment">//倒入路由</span>
    component: {<span class="hljs-comment">//注册所有用到的组件</span>
        home,
        logo,
        description,
        github,
        todoApp,
        footer
    },
    <span class="hljs-attr">service</span>: {<span class="hljs-comment">//注册所有用到的service</span>
        HomeService
    }
};</code></pre>
<h3 id="articleHeader10">用ES6写路由</h3>
<p>简单到没朋友</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default [
    {
        id: 'home',//为该路由起一个唯一标识符
        isDefault: true,//声明是否为默认路由
        when: '/home',//路由路径
        template: '<home></home>'//路由对应组件
    }
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
    {
        <span class="hljs-attr">id</span>: <span class="hljs-string">'home'</span>,<span class="hljs-comment">//为该路由起一个唯一标识符</span>
        isDefault: <span class="hljs-literal">true</span>,<span class="hljs-comment">//声明是否为默认路由</span>
        when: <span class="hljs-string">'/home'</span>,<span class="hljs-comment">//路由路径</span>
        template: <span class="hljs-string">'&lt;home&gt;&lt;/home&gt;'</span><span class="hljs-comment">//路由对应组件</span>
    }
];</code></pre>
<h3 id="articleHeader11">用ES6写&lt;home&gt;组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入该组件对应的css，注意这里不会有像vue那样的作用域，
//不过能帮助你分离css内容，也不错的
import './home.css';

//导出组件声明对象
export default {
    template: `
        <logo></logo>
        <description></description>
        <github></github>
        <todo-app list=&quot;$ctrl.todos&quot; loading=&quot;$ctrl.loading&quot; on-toggle=&quot;$ctrl.toggleTodo(todo)&quot; on-add=&quot;$ctrl.addTodo(todo)&quot; on-archive=&quot;$ctrl.archive()&quot;></todo-app>
        <footer></footer>
    `,
    controller: class {
        //下面是依赖注入的关键，通过https://github.com/schmod/babel-plugin-angularjs-annotate实现
        /*@ngInject*/
        constructor(HomeService) {
            this.HomeService = HomeService;
            this.todos = [];
            this.loading = true;
        }

        $onInit() {
            this.HomeService
                .getInitTodos()
                .then(todos => {
                    this.todos = todos;
                    this.loading = false;
                });
        }

        addTodo(todo) {
            this.todos = [todo, ...this.todos];
        }

        toggleTodo(todo) {
            this.todos = this.todos.map(t => {
                if (t.txt !== todo.txt) {
                    return t;
                }
                return {
                    finished: !todo.finished,
                    txt: t.txt
                };
            });
        }

        archive() {
            this.todos = this.todos.filter(todo => !todo.finished);
        }

        $onDestroy() {}
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//引入该组件对应的css，注意这里不会有像vue那样的作用域，</span>
<span class="hljs-comment">//不过能帮助你分离css内容，也不错的</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./home.css'</span>;

<span class="hljs-comment">//导出组件声明对象</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`
        &lt;logo&gt;&lt;/logo&gt;
        &lt;description&gt;&lt;/description&gt;
        &lt;github&gt;&lt;/github&gt;
        &lt;todo-app list="$ctrl.todos" loading="$ctrl.loading" on-toggle="$ctrl.toggleTodo(todo)" on-add="$ctrl.addTodo(todo)" on-archive="$ctrl.archive()"&gt;&lt;/todo-app&gt;
        &lt;footer&gt;&lt;/footer&gt;
    `</span>,
    <span class="hljs-attr">controller</span>: <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
        <span class="hljs-comment">//下面是依赖注入的关键，通过https://github.com/schmod/babel-plugin-angularjs-annotate实现</span>
        <span class="hljs-comment">/*@ngInject*/</span>
        <span class="hljs-keyword">constructor</span>(HomeService) {
            <span class="hljs-keyword">this</span>.HomeService = HomeService;
            <span class="hljs-keyword">this</span>.todos = [];
            <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">true</span>;
        }

        $onInit() {
            <span class="hljs-keyword">this</span>.HomeService
                .getInitTodos()
                .then(<span class="hljs-function"><span class="hljs-params">todos</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.todos = todos;
                    <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">false</span>;
                });
        }

        addTodo(todo) {
            <span class="hljs-keyword">this</span>.todos = [todo, ...this.todos];
        }

        toggleTodo(todo) {
            <span class="hljs-keyword">this</span>.todos = <span class="hljs-keyword">this</span>.todos.map(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> (t.txt !== todo.txt) {
                    <span class="hljs-keyword">return</span> t;
                }
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">finished</span>: !todo.finished,
                    <span class="hljs-attr">txt</span>: t.txt
                };
            });
        }

        archive() {
            <span class="hljs-keyword">this</span>.todos = <span class="hljs-keyword">this</span>.todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> !todo.finished);
        }

        $onDestroy() {}
    }
};</code></pre>
<p>最后，你可能还有其它问题，直接来<a href="https://github.com/leftstick/generator-es6-angular/blob/master/docs/api.md" rel="nofollow noreferrer" target="_blank">看看这里</a>，或者<code>Github</code>上给我提<a href="https://github.com/leftstick/generator-es6-angular/issues" rel="nofollow noreferrer" target="_blank">issue</a>也未尝不可呢</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用ES6编写AngularJS程序是怎样一种体验

## 原文链接
[https://segmentfault.com/a/1190000005103425](https://segmentfault.com/a/1190000005103425)

