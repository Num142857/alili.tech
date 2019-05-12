---
title: '基于react+react-router+redux+socket.io+koa开发一个聊天室' 
date: 2019-01-19 2:30:10
hidden: true
slug: w70zmwx9mm
categories: [reprint]
---

{{< raw >}}

                    
<p>最近练手开发了一个项目，是一个聊天室应用。项目虽不大，但是使用到了react, react-router, redux, socket.io，后端开发使用了koa，算是一个比较综合性的案例，很多概念和技巧在开发的过程中都有所涉及,非常有必要再来巩固一下。</p>
<p>项目目前部署在heroku平台上，在线演示地址: <a href="https://desolate-fortress-76848.herokuapp.com/" rel="nofollow noreferrer" target="_blank">online demo</a>, 因为是国外的平台速度可能有点慢，点进去耐心等一会儿就能加载好了。</p>
<p>加载好之后，首先出现的页面是让用户起一个昵称:</p>
<p><span class="img-wrap"><img data-src="/img/bVKab9?w=1360&amp;h=898" src="https://static.alili.tech/img/bVKab9?w=1360&amp;h=898" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>输入昵称之后，就会进入聊天页面，左边是进入聊天室的在线用户，右边则是聊天区域，下图是三个在线用户聊天的情形:</p>
<p><span class="img-wrap"><img data-src="/img/bVKaca?w=2456&amp;h=1300" src="https://static.alili.tech/img/bVKaca?w=2456&amp;h=1300" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>项目源码的github地址: <a href="https://github.com/mly-zju/chat-room" rel="nofollow noreferrer" target="_blank">源码地址</a>, 有兴趣的同学欢迎关注学习~</p>
<p>下面就来分析一下项目的整体架构，以及一下值得注意的技巧和知识点。</p>
<h3 id="articleHeader0">1. 整体结构</h3>
<p>项目的目录如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── README.md
├── node_modules
├── dist
│&nbsp;&nbsp; ├── bundle.css
│&nbsp;&nbsp; ├── bundle.js
│&nbsp;&nbsp; └── resource
│&nbsp;&nbsp;     ├── background.jpeg
│&nbsp;&nbsp;     └── preview.png
├── package.json
├── server.js
├── src
│&nbsp;&nbsp; ├── action
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── chatall
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.less
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── login
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.less
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── msgshow
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.less
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── namelist
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.less
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── nav
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.less
│&nbsp;&nbsp; │&nbsp;&nbsp; └── typein
│&nbsp;&nbsp; │&nbsp;&nbsp;     ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── index.less
│&nbsp;&nbsp; ├── container
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── chatAll.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── login.js
│&nbsp;&nbsp; ├── index.ejs
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; ├── index.less
│&nbsp;&nbsp; ├── index2.js
│&nbsp;&nbsp; ├── reducer
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; ├── redux_middleware
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; └── resource
│&nbsp;&nbsp;     ├── background.jpeg
│&nbsp;&nbsp;     └── preview.png
└── webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>├── <span class="hljs-selector-tag">README</span><span class="hljs-selector-class">.md</span>
├── <span class="hljs-selector-tag">node_modules</span>
├── <span class="hljs-selector-tag">dist</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">bundle</span><span class="hljs-selector-class">.css</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">bundle</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">resource</span>
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">background</span><span class="hljs-selector-class">.jpeg</span>
│&nbsp;&nbsp;     └── <span class="hljs-selector-tag">preview</span><span class="hljs-selector-class">.png</span>
├── <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-tag">server</span><span class="hljs-selector-class">.js</span>
├── <span class="hljs-selector-tag">src</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">action</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">components</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">chatall</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">login</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">msgshow</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">namelist</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">nav</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">typein</span>
│&nbsp;&nbsp; │&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">container</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">chatAll</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">login</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.ejs</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index2</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">reducer</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">redux_middleware</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">resource</span>
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">background</span><span class="hljs-selector-class">.jpeg</span>
│&nbsp;&nbsp;     └── <span class="hljs-selector-tag">preview</span><span class="hljs-selector-class">.png</span>
└── <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre>
<p>其中src当中是前端部分的源代码。项目使用webpack进行打包，打包后的代码在dist目录当中。由于我们的项目是一个单页面应用，因此只需要统一打包出一个bundle.js和一个bundle.css。而后端使用了koa框架，由于代码相对比较少，都集中在了server.js这一个文件当中。</p>
<p>开发过程中，由于要webpack打包，一般我们会配合webpack-dev-server来使用。webpack-dev-server运行的时候自身就会开启一个server，而在我们的项目当中，后端koa也是一个server，因此为了简单起见，我们可以使用koa-webpack-dev-middleware来在koa当中开启webpack-dev-server。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpackDev = require('koa-webpack-dev-middleware');
var webpackConf = require('./webpack.config.js');
var compiler = webpack(webpackConf);
app.use(webpackDev(compiler, {
  contentBase: webpackConf.output.path,
  publicPath: webpackConf.output.publicPath,
  hot: true
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpackDev = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-dev-middleware'</span>);
<span class="hljs-keyword">var</span> webpackConf = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config.js'</span>);
<span class="hljs-keyword">var</span> compiler = webpack(webpackConf);
app.use(webpackDev(compiler, {
  <span class="hljs-attr">contentBase</span>: webpackConf.output.path,
  <span class="hljs-attr">publicPath</span>: webpackConf.output.publicPath,
  <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>
}));</code></pre>
<h3 id="articleHeader1">2. 项目布局: flexbox实践</h3>
<p>在这个项目中我们有意识的使用了flex布局，作为面向未来的一种新的布局方式，实践一下还是很有必要的！没有学习郭flexbox的同学可以参考这篇来学一下：<a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html</a></p>
<p>以聊天界面为例进行分析，使用flex布局的话，可以非常方便，下图就是对界面的一个简单的切分：</p>
<p><span class="img-wrap"><img data-src="/img/bVKacr?w=2456&amp;h=1300" src="https://static.alili.tech/img/bVKacr?w=2456&amp;h=1300" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>整个聊天框最外层红框框起来的部分display设置为flex，并且flex-direction设置为column，这样它里面的两个元素（即粉框和蓝框部分）就会竖直方向排列，同时粉框的flex设置为0 0 90px，代表该框不可伸缩，固定高度90px，而对于蓝框，则设置flex为1，代表伸展系数为1，这样，蓝框的高度就会占满除了粉框以外的全部空间。</p>
<p>而于此同时，粉框和蓝框本身又分别设置display为flex。对粉框而言，内部一共有欢迎标签和退出button两个元素，分列两侧，因此只需要设置justify-content为space-between即可做到这一点。而对蓝框而言，内部有在线用户列表以及聊天区域两个元素。这里在线用户列表（即黄色框）需要设置固定宽度，因此类似于刚才粉框的设置，flex: 0 0 240px，而聊天区域（即绿色框）则设置flex为1，这样会自适应占满剩余宽度。</p>
<p>最后，聊天区域内部又分为信息展示区以及打字区，因此聊天区域自身又是一个flexbox，设置方式类似，就不再具体分析了。</p>
<p>可以看出，使用flexbox，相比使用float以及position等等而言，更加的规整，使用这种思路，整个页面就像庖丁解牛一般，布局格外清晰。</p>
<h3 id="articleHeader2">3. 设计页面的数据结构</h3>
<p>项目中使用了redux作为数据流管理工具，配合react，能够让页面组件同页面数据形成规律的映射。</p>
<p>分析我们的聊天页面，可以看出，主要的数据就是目前在线的用户昵称列表，以及消息记录，此外我们还需要记录自己的用户昵称，方便消息发送时候取用。因此，整个应用的数据结构如下, 也就是redux中的store的数据结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;nickName&quot;: &quot;your nickname&quot;,
  &quot;nameList&quot;: [&quot;user A&quot;,&quot;user B&quot;,&quot;user C&quot;,&quot;....&quot;],
  &quot;msgList&quot;: [
    {
    &quot;nickName&quot;: &quot;some user&quot;,
    &quot;msg&quot;: &quot;some string&quot;
  },{
    &quot;nickName&quot;: &quot;another user&quot;,
    &quot;msg&quot;: &quot;another string&quot;
  },
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"nickName"</span>: <span class="hljs-string">"your nickname"</span>,
  <span class="hljs-attr">"nameList"</span>: [<span class="hljs-string">"user A"</span>,<span class="hljs-string">"user B"</span>,<span class="hljs-string">"user C"</span>,<span class="hljs-string">"...."</span>],
  <span class="hljs-attr">"msgList"</span>: [
    {
    <span class="hljs-attr">"nickName"</span>: <span class="hljs-string">"some user"</span>,
    <span class="hljs-attr">"msg"</span>: <span class="hljs-string">"some string"</span>
  },{
    <span class="hljs-attr">"nickName"</span>: <span class="hljs-string">"another user"</span>,
    <span class="hljs-attr">"msg"</span>: <span class="hljs-string">"another string"</span>
  },
  ]
}</code></pre>
<p>有了这个总体的数据结构，我们就可以根据该结构设计具体的action，reducer等等部分了。这里整个程序的模块拆分遵循了redux官方实例当中的拆分方法，action文件夹当中定义action creators，reducer文件夹中定义reducer函数，component文件夹中定义一些通用的组件，container文件夹当中则是将通用组件取出，定义store中的数据同组件如何映射，以及组件中的事件如何dispatch action，从而引起store数据的改变。</p>
<p>以component/namelist中的组件为例，该组件用于显示在线用户昵称列表，因此它接受一个数组，也就是store中的nameList作为参数，因此其通用组件的写法也很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class NameList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {nameList} = this.props;
    return (
      <ul className='name-list'>
        <li className='name-list-title'>在线用户:</li>
        {nameList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
      </ul>
    )
  }
}

export default NameList" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">NameList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  render() {
    <span class="hljs-keyword">var</span> {nameList} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'name-list'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'name-list-title'</span>&gt;</span>在线用户:<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        {nameList.map((item, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    )
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> NameList</code></pre>
<p>而在container当中，只需要将store中的nameList赋值到该组件的props上面即可。其他组件也是类似的写法。</p>
<p>可以看出，在redux的思想下，我们可以对整个应用抽象出一个总体的数据结构，数据结构的改变，会引发各个组件的改变，而组件当中的各种事件，又会反过来修改数据结构，从而再次引起页面的改变，这是一种单向的数据流，总体的数据都在store这个对象中进行维护，从而让整个应用开发变得更加有规律。redux的这种程序架构是对react提出的flux架构的一种消化和改良，下图是flux架构的示意图：</p>
<p><span class="img-wrap"><img data-src="/img/bVwAUY?w=2232&amp;h=1114" src="https://static.alili.tech/img/bVwAUY?w=2232&amp;h=1114" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">4.  socket.io的使用</h3>
<p>由于是一个即时聊天应用，websocket协议自然是首选。而socket.io就是基于websocket实现的一套基于事件订阅与发布的js通信库。</p>
<p>在socket.io中，主要有server端和client端。创建一个server和client都非常容易，对于server端，配合koa，只需要如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app=require('koa')();
var server = require('http').Server(app.callback());
var io = require('socket.io')(server);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> app=<span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)();
<span class="hljs-keyword">var</span> server = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).Server(app.callback());
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(server);</code></pre>
<p>client端更加简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var io=require('socket.io-client');
var socket = io();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> io=<span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io-client'</span>);
<span class="hljs-keyword">var</span> socket = io();</code></pre>
<p>一旦连接建立，client和server即可通过时间订阅与发布来彼此通信，socket.io提供的api非常类似于nodejs中的event对象的使用，对于server端：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="io.on('connection',function(socket){
  socket.on('some event',function(data){
    //do something here....
    socket.emit('another event',{some data here});
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">io.on(<span class="hljs-string">'connection'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>)</span>{
  socket.on(<span class="hljs-string">'some event'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-comment">//do something here....</span>
    socket.emit(<span class="hljs-string">'another event'</span>,{some data here});
  });
});</code></pre>
<p>对于client端，同样通过socket.on以及socket.emit来订阅和发布事件。比如说，某一个client端口emit了event A，而如果server端口订阅了event A，那么在server端，对应的回调函数就会被执行。通过这种方式，可以方便的编写即时通信程序。</p>
<h3 id="articleHeader4">5. 一些值得注意的实现细节</h3>
<p>下面对程序中涉及的一些我认为值得注意的细节和技巧进行一下简要分析。</p>
<h4>1. socket.io同redux的结合方案：redux中间件的运用</h4>
<p>在程序编写过程当中，我遇到一个难题，就是如何将socket.io的client实例结合到redux当中。</p>
<p>socket.io的client类似于一个全局的对象，它不属于任何一个react组件，它订阅到的任何消息都可能更改整个应用的数据结构，而这种更改在redux当中又只能通过dispatch来实现。思考之后，我觉得编写一个redux中间件来处理socket.io相关的事件是一个很好的选择。</p>
<p>关于redux中间件，简单来说，就是在redux真正出发dispatch之前，中间件可以首先捕获到react组件出发的action，并针对不同action做一些处理，然后再调用dispatch。中间件的写法，在redux的官方文档当中写的非常详细，有兴趣的可以参考一下: <a href="http://redux.js.org/docs/advanced/Middleware.html" rel="nofollow noreferrer" target="_blank">http://redux.js.org/docs/advanced/Middleware.html</a> , 后续我也会出一些系列文章，深入分析redux包括react-redux的原理，其中就会提到中间件的原理，尽请期待~</p>
<p>知道了redux中间件是怎么一回事之后，我们就可以发现，socket.io相关的事件非常适合通过写一个中间件来处理。我们程序当中中间件如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { message_update, guest_update } from '../action'

function createSocketMiddleware(socket) {
  var eventFlag = false;
  return store => next => action => {
    //如果中间件第一次被调用，则首先绑定一些socket订阅事件
    if (!eventFlag) {
      eventFlag = true;
      socket.on('guest update', function(data) {
        next(guest_update(data));
      });
      socket.on('msg from server', function(data) {
        next(message_update(data));
      });
      socket.on('self logout', function() {
        window.location.reload();
      });
      setInterval(function() {
        socket.emit('heart beat');
      }, 10000);
    }
    //捕获action，如果是和发送相关的事件，则调用socket对应的发布函数
    if (action.type == 'MSG_UPDATE') {
      socket.emit('msg from client', action.msg);
    } else if (action.type == 'NICKNAME_GET') {
      socket.emit('guest come', action.nickName);
    } else if (action.type == 'NICKNAME_FORGET') {
      socket.emit('guest leave', store.getState().nickName);
    }
    return next(action);
  }
}

export default createSocketMiddleware" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { message_update, guest_update } <span class="hljs-keyword">from</span> <span class="hljs-string">'../action'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createSocketMiddleware</span>(<span class="hljs-params">socket</span>) </span>{
  <span class="hljs-keyword">var</span> eventFlag = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">store</span> =&gt;</span> next =&gt; <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-comment">//如果中间件第一次被调用，则首先绑定一些socket订阅事件</span>
    <span class="hljs-keyword">if</span> (!eventFlag) {
      eventFlag = <span class="hljs-literal">true</span>;
      socket.on(<span class="hljs-string">'guest update'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        next(guest_update(data));
      });
      socket.on(<span class="hljs-string">'msg from server'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        next(message_update(data));
      });
      socket.on(<span class="hljs-string">'self logout'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">window</span>.location.reload();
      });
      setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        socket.emit(<span class="hljs-string">'heart beat'</span>);
      }, <span class="hljs-number">10000</span>);
    }
    <span class="hljs-comment">//捕获action，如果是和发送相关的事件，则调用socket对应的发布函数</span>
    <span class="hljs-keyword">if</span> (action.type == <span class="hljs-string">'MSG_UPDATE'</span>) {
      socket.emit(<span class="hljs-string">'msg from client'</span>, action.msg);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (action.type == <span class="hljs-string">'NICKNAME_GET'</span>) {
      socket.emit(<span class="hljs-string">'guest come'</span>, action.nickName);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (action.type == <span class="hljs-string">'NICKNAME_FORGET'</span>) {
      socket.emit(<span class="hljs-string">'guest leave'</span>, store.getState().nickName);
    }
    <span class="hljs-keyword">return</span> next(action);
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createSocketMiddleware</code></pre>
<p>这段代码是一个socket middleware的创建函数，从中我们可以看出，这个中间件如果第一次调用的话(eventFlag),会首先绑定一些订阅主题和对应的回调函数，主要是订阅了消息到达、新用户来到、用户离开等等事件。同时，中间件会在真正dispatch函数调用之前，首先捕获action，然后分析action的type。如果是和发送事件相关的，就会调用socket.emit来发布对应的事件和数据。比如说，在我们的应用中，点击“发送”按钮会触发一个type为"MSG_UPDATE"的事件，这个事件首先被中间件捕获，那么这时候就会出发socket.emit('msg from client')来将消息发送给server。</p>
<h4>2. 权限验证: 单页面应用中的页面跳转</h4>
<p>整个应用使用react-router，做成了一个单页面应用，其中前端路由的层级非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={ChatAllContainer}/>
      <Route path='/login' component={LoginContainer}/>
    </Router>
  </Provider>
  ,
  document.getElementById('test'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>render(
  <span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{hashHistory}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{ChatAllContainer}/</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">'/login'</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{LoginContainer}/</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>
  ,
  document.getElementById('test'));</code></pre>
<p>可以看出，主要是两条路径: '/'和'/login'，其中'/'是我们的聊天界面，而'/login'则是起昵称界面。</p>
<p>由于应用的逻辑是，只有用户起了昵称才可以进入聊天界面，因此我们需要做一些权限验证，对于没有起昵称就进入'/'路径的用户，需要跳转到'/login'。在传统多页面web应用中，我们对于跳转非常熟悉，无非是服务器发送一个重定向请求，浏览器就会重定向到新的页面。然而在单页面中，由于始终只有一页，服务器又能够让浏览器跳转到哪里去呢？也就是说，服务器重定向的方法是行不通的。</p>
<p>因此，我们换一种思路，页面跳转的逻辑需要在浏览器端执行，在react-router的框架下，执行跳转也非常简单，只需要使用其中的hashHistory对象，通过hashHistory.push('path')，即可让应用跳转到指定路径对应的界面。有了这个认知，那么我们下面要解决的，就是何时控制单页面的跳转？</p>
<p>我的思路是，将用户的昵称通过一定的加密和编码，保存在cookie当中。当用户访问'/'的时候，在对于界面的组件挂载之前，首先会向服务器发送一个认证请求，服务器会从请求中读取cookie，如果cookie当中没有用户名存在，那么服务器返回的参数当中有一个'permit'字段，设置为false，当应用解析到该字段后，就会调用hashHistory.push('/login')来让页面跳转到起昵称界面下。这部分对应的逻辑主要在container/chatAll.js文件当中实现。</p>
<h4>3. 文本输入的细节处理: xss的预防，以及组合键的识别</h4>
<p>在我们的聊天应用中，如果不对用户的输入进行一些处理，就有可能导致xss漏洞。举个例子，比如说有一个用户输入了'&lt;script&gt;....&lt;/script&gt;'，如果不进行一些防范，输入到消息显示界面，这段文字就直接被解析成为了一段js代码。为了防范这类攻击，这里我们需要做一些简单的预防：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var regLeft = /</g;
var regRight = />/g;
value = value.replace(regLeft, '&amp;lt;');
value = value.replace(regRight, '&amp;gt;');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> regLeft = <span class="hljs-regexp">/&lt;/g</span>;
<span class="hljs-keyword">var</span> regRight = <span class="hljs-regexp">/&gt;/g</span>;
value = value.replace(regLeft, <span class="hljs-string">'&amp;lt;'</span>);
value = value.replace(regRight, <span class="hljs-string">'&amp;gt;'</span>);</code></pre>
<p>这段代码在components/typein组件当中。</p>
<p>此外，为了方便用户快速发送消息，在消息输入框中，我们设置了'enter'按键为之间发送按键。那么，为了让用户能够打出换行，我们模仿微信，约定用户输入ctrl+enter组合键的时候是换行，这样，在消息输入框中，就需要监听组合键。在js的键盘事件中，event对象有一个ctrlKey属性，用于判断ctrl按键是否按下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="someDom.onkeydown=function(e){
  if(e.keyCode==13&amp;&amp;e.ctrlKey){
    //组合键被按下
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">someDom.onkeydown=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">if</span>(e.keyCode==<span class="hljs-number">13</span>&amp;&amp;e.ctrlKey){
    <span class="hljs-comment">//组合键被按下</span>
  }
}</code></pre>
<p>这就是组合键监听的原理。</p>
<p>以上就是对于这个项目的概述以及一些细节的讲解。最后安利一下我的博客 <a href="http://mly-zju.github.io/" rel="nofollow noreferrer" target="_blank">http://mly-zju.github.io/</a>,会不定期更新我的原创技术文章和学习感悟，欢迎大家关注~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于react+react-router+redux+socket.io+koa开发一个聊天室

## 原文链接
[https://segmentfault.com/a/1190000008579965](https://segmentfault.com/a/1190000008579965)

