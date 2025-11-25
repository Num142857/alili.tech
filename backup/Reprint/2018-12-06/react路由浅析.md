---
title: 'react路由浅析' 
date: 2018-12-06 2:30:09
hidden: true
slug: 49e0eohowua
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引言</h2>
<p>在使用react做复杂的spa开发中,开发中必不可少的就是react-router,它使用<a href="https://juejin.im/post/5a989fb451882555731b88c2" rel="nofollow noreferrer" target="_blank">Lerna</a>管理多个仓库, 在browser端常使用的几个如下所示</p>
<ul>
<li>react-router  提供了路由的通用核心功能,容易搞混的就是他和react-router-dom的区别,区别就是react-router-dom中多了Link BrowserRouter 这样的 DOM 类组件,至于router和route都是一样的。</li>
<li>react-router-dom 浏览器端使用的router</li>
<li>react-router-redux  和redux集成使用时会用到</li>
</ul>
<h2 id="articleHeader1">react-router中路由分类</h2>
<h3 id="articleHeader2">BrowserRouter</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="基于html5提供的,history API(pushState, replaceState 和 popstate 事件) 来保持 UI 和 URL 的同步。大致流程就是使用history.pushState塞历史记录到浏览器中,监听window.onpopstate事件,url变化的时候render对应组件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">基于html5提供的,history API(<span class="hljs-keyword">pushState, </span>replaceState 和 <span class="hljs-keyword">popstate </span>事件) 来保持 UI 和 URL 的同步。大致流程就是使用history.<span class="hljs-keyword">pushState塞历史记录到浏览器中,监听window.onpopstate事件,url变化的时候render对应组件</span></code></pre>
<h3 id="articleHeader3">HashRouter</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HashRouter 是一种特定的 <Router>， HashRouter 使用 URL 的 hash (例如：window.location.hash) 来保持 UI 和 URL 的同步。大致流程是直接给window.location.hash赋值,监听hashchange事件,hash变化时,render对应的组件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>HashRouter 是一种特定的 &lt;Router&gt;， HashRouter 使用 URL 的 hash (例如：window<span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.hash</span>) 来保持 UI 和 URL 的同步。大致流程是直接给window<span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.hash</span>赋值,监听hashchange事件,hash变化时,render对应的组件
</code></pre>
<h3 id="articleHeader4">MemoryRouter</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="保存'url'历史记录在内存中,在demo测试或者 React Native等非browser环境下使用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">保存<span class="hljs-string">'url'</span>历史记录在内存中,在demo测试或者 React <span class="hljs-keyword">Native</span>等非browser环境下使用</code></pre>
<h3 id="articleHeader5">StaticRouter</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    服务端渲染中会用到
    
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>    服务端渲染中会用到
    
    </code></pre>
<h2 id="articleHeader6">路由使用</h2>
<p>就拿 HashRouter  使用来作为示例, 其它使用形式上类似,多说一句话Hash除了今天说的路由用途之外,还可以做锚点定位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link,Switch,Redirect} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <Router>
              <div>
                      <div>
                          <li><Link to='/'>home </Link></li>   //link 本质实现其实就是一个a链接
                          <li><Link to='/about'>about</Link> </li>
                          <li><Link to='/list'>list</Link> </li>
                      </div>
                      <hr/>
                  <Switch>// 匹配到第一个匹配的路由就停止
                         <Route exact path=&quot;/&quot; component={Home} />  //exact  表示路径要精确完全匹配
                         <Route path=&quot;/about&quot; component={About} /> //写法1
                         <Route path=&quot;/list&quot;  render={() => <div>list</div>} /> //写法2
                      <Redirect to=&quot;/&quot;/>  // 当都不匹配的时候,执行这个
                  </Switch>
              </div>
        </Router>
    );
  }
}

const Home = () => {
  return   <div>home page</div>
}
const About = () => (
    <div>
        <h2>About</h2>
    </div>
);
export default App;

-------------------------
//关于Router导入还有一种等价的使用方式,如下所示
import createHistory from 'history/createHashHistory'
  <Router history={history}>
        里面的内容同上
   </Router>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link,Switch,Redirect} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/'</span>&gt;</span>home <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>   //link 本质实现其实就是一个a链接
                          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/about'</span>&gt;</span>about<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">'/list'</span>&gt;</span>list<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>// 匹配到第一个匹配的路由就停止
                         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}</span> /&gt;</span>  //exact  表示路径要精确完全匹配
                         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/about"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{About}</span> /&gt;</span> //写法1
                         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/list"</span>  <span class="hljs-attr">render</span>=<span class="hljs-string">{()</span> =&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>list<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>} /&gt; //写法2
                      <span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>/&gt;</span>  // 当都不匹配的时候,执行这个
                  <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
    );
  }
}

const Home = () =&gt; {
  return   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>home page<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
}
const About = () =&gt; (
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
);
export default App;

-------------------------
//关于Router导入还有一种等价的使用方式,如下所示
import createHistory from 'history/createHashHistory'
  <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span>&gt;</span>
        里面的内容同上
   <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>  </code></pre>
<p><strong>说明</strong>   在react-router-dom内部包含很多组件,例如route,link,switch等等,更多组件请参考 <a href="https://reacttraining.com/react-router/" rel="nofollow noreferrer" target="_blank">这里</a>。上面只是一个简单的实例,实现简单的路由跳转,关于说明都放在注释里了。</p>
<h2 id="articleHeader7">路由剖析</h2>
<p>在上面的示例中,Router是转发的枢纽,在这个中转站有很多线路(Route),通过开关(Link)可以启动列车的运行,乘坐列车就可以发现新大陆(compontent) 。深入进去可以发现Router只是提供了一个上下文环境, 具体的路由功能的实现依靠传入的history属性, 这个属性的功能由history模块提供,history模块里面封装了createBrowserHistory,createHashHistory,createMemoryHistory等等。因为所有模块提供的功能接口一样 所以我们以其中的createHashHistory模块作为示例分析下, 首先其提供的接口如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const history = {
    length: globalHistory.length,  //历史记录数量 window.history.length
    action: &quot;POP&quot;,   //操作表示 可以为REPLACE  PUSH
    location: initialLocation, //内部封装的简版window.location
    createHref, //创建一个hash路由
    push,  
    replace,
    go, // window.history.go(n);
    goBack,  // go(-1);
    goForward, //go(1);
    block, // 地址变化,离开当前页时设置提示信息
    listen
  };

  return history;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code> <span class="hljs-keyword">const</span> history = {
    length: globalHistory.length,  <span class="hljs-comment">//历史记录数量 window.history.length</span>
    action: <span class="hljs-string">"POP"</span>,   <span class="hljs-comment">//操作表示 可以为REPLACE  PUSH</span>
    location: initialLocation, <span class="hljs-comment">//内部封装的简版window.location</span>
    createHref, <span class="hljs-comment">//创建一个hash路由</span>
    push,  
    replace,
    go, <span class="hljs-comment">// window.history.go(n);</span>
    goBack,  <span class="hljs-comment">// go(-1);</span>
    goForward, <span class="hljs-comment">//go(1);</span>
    block, <span class="hljs-comment">// 地址变化,离开当前页时设置提示信息</span>
    <span class="hljs-built_in">listen</span>
  };

  <span class="hljs-built_in">return</span> history;</code></pre>
<p>下面选出几个比较重要的详细说明下</p>
<h3 id="articleHeader8">push</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// const pushHashPath = path => (window.location.hash = path);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;">// const <span class="hljs-attr">pushHashPath</span> = <span class="hljs-attr">path</span> =&gt; (window.location.<span class="hljs-attr">hash</span> = path);</code></pre>
<p><strong>说明</strong> 摘出的主要逻辑添加浏览器hash地址</p>
<h3 id="articleHeader9">replace  更换浏览器hash地址</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const hashIndex = window.location.href.indexOf(&quot;#&quot;);

  window.location.replace(
    window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + &quot;#&quot; + path
  );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">const</span> hashIndex = <span class="hljs-keyword">window</span>.location.href.indexOf(<span class="hljs-string">"#"</span>);

  <span class="hljs-keyword">window</span>.location.<span class="hljs-keyword">replace</span>(
    <span class="hljs-keyword">window</span>.location.href.slice(0, hashIndex &gt;= 0 ? hashIndex : 0) + <span class="hljs-string">"#"</span> + path
  );</code></pre>
<p><strong>说明</strong>  摘出的主要逻辑更换浏览器hash地址</p>
<h3 id="articleHeader10">listen</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const listen = listener => {
    const unlisten = transitionManager.appendListener(listener); 
    checkDOMListeners(1);  

    return () => {
      checkDOMListeners(-1);
      unlisten();
    };
  };
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">const</span> listen = <span class="hljs-function"><span class="hljs-params">listener</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> unlisten = transitionManager.appendListener(listener); 
    checkDOMListeners(<span class="hljs-number">1</span>);  

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      checkDOMListeners(<span class="hljs-number">-1</span>);
      unlisten();
    };
  };
  </code></pre>
<p><strong>说明</strong>  在transitionManager实例中维护了一个listener数组,appendListener添加一个Listener, checkDOMListeners是绑定事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" window.addEventListener(HashChangeEvent, handleHashChange);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;"> window.<span class="hljs-keyword">addEventListener(HashChangeEvent, </span>handleHashChange)<span class="hljs-comment">;</span></code></pre>
<p>每当location地址改变,HashChangeEvent触发的时候, 会取出listeners然后执行,如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" transitionManager.notifyListeners(history.location, history.action);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-selector-tag">transitionManager</span><span class="hljs-selector-class">.notifyListeners</span>(<span class="hljs-selector-tag">history</span><span class="hljs-selector-class">.location</span>, <span class="hljs-selector-tag">history</span><span class="hljs-selector-class">.action</span>);</code></pre>
<h2 id="articleHeader11">block</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const unblock = transitionManager.setPrompt(prompt);//注册提示信息
  unblock() //执行后解除地址变化时提示信息
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-keyword">const</span> unblock = transitionManager.setPrompt(prompt);<span class="hljs-comment">//注册提示信息</span>
  unblock() <span class="hljs-comment">//执行后解除地址变化时提示信息</span>
  </code></pre>
<h2 id="articleHeader12">总结</h2>
<p>断断续续的终于把这篇文章写好了,在此期间看了history源码,写了一些示例,尽可能将自己理解的东西以简洁直白的方式输出出来,希望大家看后能产生共鸣。</p>
<p>参考源码<br>history  4.7.2<br>react-router 4.3.0-rc.2</p>
<p>参考链接<br><a href="http://reacttraining.cn/web/api/matchPath" rel="nofollow noreferrer" target="_blank">http://reacttraining.cn/web/a...</a><br><a href="https://juejin.im/post/5995a2506fb9a0249975a1a4" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5995a2...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react路由浅析

## 原文链接
[https://segmentfault.com/a/1190000014319237](https://segmentfault.com/a/1190000014319237)

