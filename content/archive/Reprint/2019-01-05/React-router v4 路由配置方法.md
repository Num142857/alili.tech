---
title: 'React-router v4 路由配置方法' 
date: 2019-01-05 2:30:11
hidden: true
slug: iuyok7gtoag
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React-Router v4</h1>
<h3 id="articleHeader1">一. Switch 、Router 、Route三者的区别</h3>
<h5>1、Route</h5>
<p>Route 是建立location 和 ui的最直接联系</p>
<h5>2、Router</h5>
<p>react-router v4 中，Router被拆分成了StaticRouter、MemoryRouter、BrowserRouter、HashRouter、NativeRouter。</p>
<h6>MemoryRouter、BrowserRouter、HashRouter 等于</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Router } from 'react-router'
<!--这里可以有三种-->
<!--history 部分源码
exports.createBrowserHistory = _createBrowserHistory3.default;
exports.createHashHistory = _createHashHistory3.default;
exports.createMemoryHistory = _createMemoryHistory3.default;
-->
import createBrowserHistory from 'history/createBrowserHistory'
//
const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>
&lt;!--这里可以有三种--&gt;
<span class="xml"><span class="hljs-comment">&lt;!--history 部分源码
exports.createBrowserHistory = _createBrowserHistory3.default;
exports.createHashHistory = _createHashHistory3.default;
exports.createMemoryHistory = _createMemoryHistory3.default;
--&gt;</span>
import createBrowserHistory from 'history/createBrowserHistory'
//
const history = createBrowserHistory()

<span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span></code></pre>
<h6>NativeRouter（给rn使用的）</h6>
<p>A &lt;Router&gt; for iOS and Android apps built using React Native.</p>
<p>这里新增strict 和 exact </p>
<p>使用了strict location 大于等于path才能匹配,eq path='/one' location='/one/a'能匹配。</p>
<p>使用了exact location 约等于 path 才能匹配,eq path='/one' location='/one'或者 '/one/'能匹配，所以说是约等于。</p>
<p>使用了exact 和 strict location = path才能匹配</p>
<h6>StaticRouter(后续补充）</h6>
<h5>3、Switch</h5>
<p>这是v4版本中新添加，主要用来做唯一匹配的功能。就是想要在众多路由中只匹配其中一个路由。</p>
<h3 id="articleHeader2">二、v4 版本中路由应该如何配置呢？</h3>
<p>1.基本配置（这个和v3中基本一致，效果也基本一样）</p>
<p>匹配 &lt;= location eq.( /b =&gt; / + /b )  ( / =&gt; / )</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <div>
         <Route path=&quot;/&quot; component={aContainer} />
         <Route path=&quot;/b&quot; component={bContainer} />
      </div>
    </BrowserRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  &lt;BrowserRouter forceRefresh={!supportsHistory} keyLength={<span class="hljs-number">12</span>}&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{aContainer}</span> /&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/b"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{bContainer}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span></code></pre>
<p>2.含Switch 配置</p>
<p>匹配 &lt;= location eq.( /b =&gt; /b )  ( / =&gt; / ) 唯一匹配</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <Switch>
              //这里用exact，仅仅是担心location被 path='/'截胡了。
         <Route exact path=&quot;/&quot; component={aContainer} />
         <Route path=&quot;/b&quot; component={bContainer} />
      </Switch>
    </BrowserRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> &lt;BrowserRouter forceRefresh={!supportsHistory} keyLength={<span class="hljs-number">12</span>}&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
              //这里用exact，仅仅是担心location被 path='/'截胡了。
         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{aContainer}</span> /&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/b"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{bContainer}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span></code></pre>
<h3 id="articleHeader3">问题（三个问题）</h3>
<h5>1.如何设置公共的Component</h5>
<p>第一种方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <div>
         <Route path=&quot;/&quot; component={aContainer} />
         <Route path=&quot;/b&quot; component={bContainer} />
      </div>
    </BrowserRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span> <span class="hljs-attr">forceRefresh</span>=<span class="hljs-string">{!supportsHistory}</span> <span class="hljs-attr">keyLength</span>=<span class="hljs-string">{12}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{aContainer}</span> /&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/b"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{bContainer}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></code></pre>
<p>第二种方式(父子嵌套)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <div >
        <Route path=&quot;/&quot; component={aContainer} />
        <Route path=&quot;/b&quot; component={Parent} />
        {/* {app()} */}
      </div>
    </BrowserRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> &lt;BrowserRouter forceRefresh={!supportsHistory} keyLength={<span class="hljs-number">12</span>}&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{aContainer}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/b"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Parent}</span> /&gt;</span>
        {/* {app()} */}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span></code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Parent = ({ match }) => (
  <div>
    <Route path={`${match.url}/`} component={bContainer} />
    <Route path={`${match.url}/c`} component={cContainer} />
    <Route path={`${match.url}/d`} component={dContainer} />
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Parent = <span class="hljs-function">(<span class="hljs-params">{ match }</span>) =&gt;</span> (
  &lt;div&gt;
    &lt;Route path={`${match.url}/`} component={bContainer} /&gt;
    &lt;Route path={`${match.url}/c`} component={cContainer} /&gt;
    &lt;Route path={`${match.url}/d`} component={dContainer} /&gt;
  &lt;/div&gt;
);</code></pre>
<p>这种情况 bContainer就是是公用的Component</p>
<h5>2.如何设置getComponent，按需加载</h5>
<p><a href="https://segmentfault.com/a/1190000009539836">另一篇文章</a></p>
<h5>3.是否有简化写法</h5>
<p><code>npm install --save react-router-config</code></p>
<p>第一步 配置路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = [
  { component: bContainer,
    routes: [
      { path: '/',
        exact: true,
        component: bContainer
      },
      { path: '/b/b',
        component: bContainer,
        routes: [
          { path: '/b/b/b',
            component: bContainer
          }
        ]
      }
    ]
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">component</span>: bContainer,
    <span class="hljs-attr">routes</span>: [
      { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">exact</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">component</span>: bContainer
      },
      { <span class="hljs-attr">path</span>: <span class="hljs-string">'/b/b'</span>,
        <span class="hljs-attr">component</span>: bContainer,
        <span class="hljs-attr">routes</span>: [
          { <span class="hljs-attr">path</span>: <span class="hljs-string">'/b/b/b'</span>,
            <span class="hljs-attr">component</span>: bContainer
          }
        ]
      }
    ]
  }
]</code></pre>
<p>第二步 设置路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <div >
          {renderRoutes(routes)}
      </div>
 </BrowserRouter>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span> <span class="hljs-attr">forceRefresh</span>=</span></span><span class="hljs-template-variable">{!supportsHistory}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">keyLength</span>=</span></span><span class="hljs-template-variable">{12}</span><span class="xml"><span class="hljs-tag">&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> &gt;</span>
          </span><span class="hljs-template-variable">{renderRoutes(routes)}</span><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span></code></pre>
<p>第三步 需要在container的render中去调用方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div>
  1111
  {renderRoutes(this.props.route.routes)}
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> &lt;div&gt;
  <span class="hljs-number">1111</span>
  {renderRoutes(this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.route</span><span class="hljs-selector-class">.routes</span>)}
&lt;/div&gt;</code></pre>
<p>这个优势是可以统一配置，劣势是需要在container中统一调用，但是这个抽出来统一实现，问题也不大，并且还可以解决 问题一。</p>
<p>这个renderRoutes实际是就是用一层Switch和多个Route来包了一层。<br><span class="img-wrap"><img data-src="/img/bVR6y7?w=564&amp;h=344" src="https://static.alili.tech/img/bVR6y7?w=564&amp;h=344" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>￼<br>￼</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-router v4 路由配置方法

## 原文链接
[https://segmentfault.com/a/1190000010472619](https://segmentfault.com/a/1190000010472619)

