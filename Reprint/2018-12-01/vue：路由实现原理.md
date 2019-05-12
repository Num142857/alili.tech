---
title: 'vue：路由实现原理' 
date: 2018-12-01 2:30:12
hidden: true
slug: zzbocnd06g
categories: [reprint]
---

{{< raw >}}

                    
<p>随着前端应用的业务功能起来越复杂，用户对于使用体验的要求越来越高，单面（<code>SPA</code>）成为前端应用的主流形式。大型单页应用最显著特点之一就是采用的前端路由系统，通过改变<code>URL</code>，在不重新请求页面的情况下，更新页面视图。</p>
<p>更新视图但不重新请求页面，是前端路由原理的核心之一，目前在浏览器环境中这一功能的实现主要有<code>2</code>种方式：</p>
<ul>
<li>利用<code>URL</code>中的<code>hash</code>(<code>"#"</code>);</li>
<li>利用<code>History interface</code>在<code>HTML5</code>中新增的方法;</li>
</ul>
<p><code>vue-router</code>是<code>Vue.js</code>框架的路由插件，它是通过<code>mode</code>这一参数控制路由的实现模式的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router=new VueRouter({
    mode:'history',
    routes:[...]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const router=<span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-keyword">mode</span>:<span class="hljs-string">'history'</span>,
    route<span class="hljs-variable">s:</span>[...]
})</code></pre>
<p>创建<code>VueRouter</code>的实例对象时，<code>mode</code>以构造参数的形式传入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src/index.js

export default class VueRouter{
    mode: string; // 传入的字符串参数，指示history类别
  history: HashHistory | HTML5History | AbstractHistory; // 实际起作用的对象属性，必须是以上三个类的枚举
  fallback: boolean; // 如浏览器不支持，'history'模式需回滚为'hash'模式
  
  constructor (options: RouterOptions = {}) {
    
    let mode = options.mode || 'hash' // 默认为'hash'模式
    this.fallback = mode === 'history' &amp;&amp; !supportsPushState // 通过supportsPushState判断浏览器是否支持'history'模式
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract' // 不在浏览器环境下运行需强制为'abstract'模式
    }
    this.mode = mode

    // 根据mode确定history实际的类并实例化
    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }

  init (app: any /* Vue component instance */) {
    
    const history = this.history

    // 根据history的类别执行相应的初始化操作和监听
    if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } else if (history instanceof HashHistory) {
      const setupHashListener = () => {
        history.setupListeners()
      }
      history.transitionTo(
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
    }

    history.listen(route => {
      this.apps.forEach((app) => {
        app._route = route
      })
    })
  }

  // VueRouter类暴露的以下方法实际是调用具体history对象的方法
  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    this.history.push(location, onComplete, onAbort)
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    this.history.replace(location, onComplete, onAbort)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>src/index.js

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> VueRouter{
    mode: <span class="hljs-built_in">string</span>; <span class="hljs-comment">// 传入的字符串参数，指示history类别</span>
  history: HashHistory | HTML5History | AbstractHistory; <span class="hljs-comment">// 实际起作用的对象属性，必须是以上三个类的枚举</span>
  fallback: <span class="hljs-built_in">boolean</span>; <span class="hljs-comment">// 如浏览器不支持，'history'模式需回滚为'hash'模式</span>
  
  <span class="hljs-keyword">constructor</span> (<span class="hljs-params">options: RouterOptions = {}</span>) {
    
    <span class="hljs-keyword">let</span> mode = options.mode || <span class="hljs-string">'hash'</span> <span class="hljs-comment">// 默认为'hash'模式</span>
    <span class="hljs-keyword">this</span>.fallback = mode === <span class="hljs-string">'history'</span> &amp;&amp; !supportsPushState <span class="hljs-comment">// 通过supportsPushState判断浏览器是否支持'history'模式</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.fallback) {
      mode = <span class="hljs-string">'hash'</span>
    }
    <span class="hljs-keyword">if</span> (!inBrowser) {
      mode = <span class="hljs-string">'abstract'</span> <span class="hljs-comment">// 不在浏览器环境下运行需强制为'abstract'模式</span>
    }
    <span class="hljs-keyword">this</span>.mode = mode

    <span class="hljs-comment">// 根据mode确定history实际的类并实例化</span>
    <span class="hljs-keyword">switch</span> (mode) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'history'</span>:
        <span class="hljs-keyword">this</span>.history = <span class="hljs-keyword">new</span> HTML5History(<span class="hljs-keyword">this</span>, options.base)
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'hash'</span>:
        <span class="hljs-keyword">this</span>.history = <span class="hljs-keyword">new</span> HashHistory(<span class="hljs-keyword">this</span>, options.base, <span class="hljs-keyword">this</span>.fallback)
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'abstract'</span>:
        <span class="hljs-keyword">this</span>.history = <span class="hljs-keyword">new</span> AbstractHistory(<span class="hljs-keyword">this</span>, options.base)
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">default</span>:
        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
          assert(<span class="hljs-literal">false</span>, <span class="hljs-string">`invalid mode: <span class="hljs-subst">${mode}</span>`</span>)
        }
    }
  }

  init (app: <span class="hljs-built_in">any</span> <span class="hljs-comment">/* Vue component instance */</span>) {
    
    <span class="hljs-keyword">const</span> history = <span class="hljs-keyword">this</span>.history

    <span class="hljs-comment">// 根据history的类别执行相应的初始化操作和监听</span>
    <span class="hljs-keyword">if</span> (history <span class="hljs-keyword">instanceof</span> HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (history <span class="hljs-keyword">instanceof</span> HashHistory) {
      <span class="hljs-keyword">const</span> setupHashListener = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        history.setupListeners()
      }
      history.transitionTo(
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
    }

    history.listen(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.apps.forEach(<span class="hljs-function">(<span class="hljs-params">app</span>) =&gt;</span> {
        app._route = route
      })
    })
  }

  <span class="hljs-comment">// VueRouter类暴露的以下方法实际是调用具体history对象的方法</span>
  push (location: RawLocation, onComplete?: <span class="hljs-built_in">Function</span>, onAbort?: <span class="hljs-built_in">Function</span>) {
    <span class="hljs-keyword">this</span>.history.push(location, onComplete, onAbort)
  }

  replace (location: RawLocation, onComplete?: <span class="hljs-built_in">Function</span>, onAbort?: <span class="hljs-built_in">Function</span>) {
    <span class="hljs-keyword">this</span>.history.replace(location, onComplete, onAbort)
  }
}</code></pre>
<ol><li>作为参数传入的字符串属性<code>mode</code>只是一个标记，用来指示实际起作用的对象属性<code>history</code>的实现类，两者对应关系：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    modehistory:
        'history':HTML5History;
        'hash':HashHistory;
        'abstract':AbstractHistory;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>    <span class="hljs-symbol">modehistory:</span>
        <span class="hljs-string">'history'</span><span class="hljs-symbol">:HTML5History</span>;
        <span class="hljs-string">'hash'</span><span class="hljs-symbol">:HashHistory</span>;
        <span class="hljs-string">'abstract'</span><span class="hljs-symbol">:AbstractHistory</span>;</code></pre>
<ol>
<li>在初始化对应的<code>history</code>之前，会对<code>mode</code>做一些校验：若浏览器不支持<code>HTML5History</code>方式(通过<code>supportsPushState</code>变量判断)，则<code>mode</code>设为<code>hash</code>;若不是在浏览器环境下运行，则<code>mode</code>设为<code>abstract</code>;</li>
<li>
<code>VueRouter</code>类中的<code>onReady()</code>,<code>push()</code>等方法只是一个代理，实际是调用的具体<code>history</code>对象的对应方法，在<code>init()</code>方法中初始化时，也是根据<code>history</code>对象具体的类别执行不同操作</li>
</ol>
<h1 id="articleHeader0"><code>HashHistory</code></h1>
<p><code>hash</code>(<code>"#"</code>)符号的本来作用是加在<code>URL</code>指示网页中的位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://www.example.com/index.html#print" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span>//www.example.com/index.html<span class="hljs-meta">#print</span></code></pre>
<p><code>#</code>本身以及它后面的字符称之为<code>hash</code>可通过<code>window.location.hash</code>属性读取.</p>
<ul>
<li>
<code>hash</code>虽然出现在<code>url</code>中，但不会被包括在<code>http</code>请求中，它是用来指导浏览器动作的，对服务器端完全无用，因此，改变<code>hash</code>不会重新加载页面。</li>
<li>可以为<code>hash</code>的改变添加监听事件：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;hashchange&quot;,funcRef,false)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"hashchange"</span>,funcRef,<span class="hljs-literal">false</span>)</code></pre>
<ul><li>每一次改变<code>hash</code>(<code>window.location.hash</code>)，都会在浏览器访问历史中增加一个记录。</li></ul>
<p>利用<code>hash</code>的以上特点，就可以来实现前端路由"更新视图但不重新请求页面"的功能了。</p>
<h2 id="articleHeader1"><code>HashHistory.push()</code></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    pushHash(route.fullPath)
    onComplete &amp;&amp; onComplete(route)
  }, onAbort)
}

function pushHash (path) {
  window.location.hash = path
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>push (location: RawLocation, onComplete?: <span class="hljs-built_in">Function</span>, onAbort?: <span class="hljs-built_in">Function</span>) {
  <span class="hljs-keyword">this</span>.transitionTo(location, <span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
    pushHash(route.fullPath)
    onComplete &amp;&amp; onComplete(route)
  }, onAbort)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushHash</span> (<span class="hljs-params">path</span>) </span>{
  <span class="hljs-built_in">window</span>.location.hash = path
}</code></pre>
<p><code>transitionTo()</code>方法是父类中定义的是用来处理路由变化中的基础逻辑的，<code>push()</code>方法最主要的是对<code>window</code>的<code>hash</code>进行了直接赋值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.location.hash=route.fullPath" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">window<span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.hash</span>=route.fullPath</code></pre>
<p><code>hash</code>的改变会自动添加到浏览器的访问历史记录中。<br>那么视图的更新是怎么实现的呢，我们来看看父类<code>History</code>中的<code>transitionTo()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  const route = this.router.match(location, this.current)
  this.confirmTransition(route, () => {
    this.updateRoute(route)
    ...
  })
}

updateRoute (route: Route) {
  
  this.cb &amp;&amp; this.cb(route)
  
}

listen (cb: Function) {
  this.cb = cb
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  const route = <span class="hljs-keyword">this</span>.router.match(location, <span class="hljs-keyword">this</span>.current)
  <span class="hljs-keyword">this</span>.confirmTransition(route, () =&gt; {
    <span class="hljs-keyword">this</span>.updateRoute(route)
    ...
  })
}

updateRoute (route: Route) {
  
  <span class="hljs-keyword">this</span>.cb &amp;&amp; <span class="hljs-keyword">this</span>.cb(route)
  
}

listen (cb: Function) {
  <span class="hljs-keyword">this</span>.cb = cb
}</code></pre>
<p>可以看到，当路由变化时，调用了<code>Hitory</code>中的<code>this.cb</code>方法，而<code>this.cb</code>方法是通过<code>History.listen(cb)</code>进行设置的，回到<code>VueRouter</code>类定义中，找到了在<code>init()</code>中对其进行了设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="init (app: any /* Vue component instance */) {
    
  this.apps.push(app)

  history.listen(route => {
    this.apps.forEach((app) => {
      app._route = route
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>init (app: any /* Vue component<span class="hljs-built_in"> instance </span>*/) {
    
  this.apps.push(app)

  history.listen(route =&gt; {
    this.apps.forEach((app) =&gt; {
      app._route = route
    })
  })
}</code></pre>
<p><code>app</code>为<code>Vue</code>组件实例，但是<code>Vue</code>作为渐进式的前端框架，本身的组件定义中应该是没有有关路由内置属性<code>_route</code>,如果组件中要有这个属性，应该是在插件加载的地方，即<code>VueRouter</code>的<code>install()</code>方法中混入<code>Vue</code>对象的，<code>install.js</code>的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function install (Vue) {
  
  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      }
      registerInstance(this, this)
    },
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export function install (Vue) {
  
  Vue.mixin({
    beforeCreate () {
      <span class="hljs-keyword">if</span> (isDef(<span class="hljs-keyword">this</span>.$options.router)) {
        <span class="hljs-keyword">this</span>._router = <span class="hljs-keyword">this</span>.$options.router
        <span class="hljs-keyword">this</span>._router.init(<span class="hljs-keyword">this</span>)
        Vue.util.defineReactive(<span class="hljs-keyword">this</span>, <span class="hljs-string">'_route'</span>, <span class="hljs-keyword">this</span>._router.history.current)
      }
      registerInstance(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>)
    },
  })
}</code></pre>
<p>通过<code>Vue.mixin()</code>方法，全局注册一个混合，影响注册之后所有创建的每个<code>Vue</code>实例，该混合在<code>beforeCreate</code>钩子中通过<code>Vue.util.defineReactive()</code>定义了响应式的<code>_route</code>属性。所谓响应式属性，即当<code>_route</code>值改变时，会自动调用<code>Vue</code>实例的<code>render()</code>方法，更新视图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$router.push()-->HashHistory.push()-->History.transitionTo()-->History.updateRoute()-->{app._route=route}-->vm.render()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code style="word-break: break-word; white-space: initial;">$router.push<span class="hljs-function"><span class="hljs-params">()</span>--&gt;</span>HashHistory.push<span class="hljs-function"><span class="hljs-params">()</span>--&gt;</span>History.transitionTo<span class="hljs-function"><span class="hljs-params">()</span>--&gt;</span>History.updateRoute<span class="hljs-function"><span class="hljs-params">()</span>--&gt;</span>{app._route=route}<span class="hljs-function">--&gt;</span>vm.render()</code></pre>
<h2 id="articleHeader2"><code>HashHistory.replace()</code></h2>
<p><code>replace()</code>方法与<code>push()</code>方法不同之处在于，它并不是将新路由添加到浏览器访问历史栈顶，而是替换掉当前的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    replaceHash(route.fullPath)
    onComplete &amp;&amp; onComplete(route)
  }, onAbort)
}
  
function replaceHash (path) {
  const i = window.location.href.indexOf('#')
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>replace (location: RawLocation, onComplete?: <span class="hljs-built_in">Function</span>, onAbort?: <span class="hljs-built_in">Function</span>) {
  <span class="hljs-keyword">this</span>.transitionTo(location, <span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
    replaceHash(route.fullPath)
    onComplete &amp;&amp; onComplete(route)
  }, onAbort)
}
  
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceHash</span> (<span class="hljs-params">path</span>) </span>{
  <span class="hljs-keyword">const</span> i = <span class="hljs-built_in">window</span>.location.href.indexOf(<span class="hljs-string">'#'</span>)
  <span class="hljs-built_in">window</span>.location.replace(
    <span class="hljs-built_in">window</span>.location.href.slice(<span class="hljs-number">0</span>, i &gt;= <span class="hljs-number">0</span> ? i : <span class="hljs-number">0</span>) + <span class="hljs-string">'#'</span> + path
  )
}</code></pre>
<p>可以看出，它与<code>push()</code>的实现结构基本相似，不同点它不是直接对<code>window.location.hash</code>进行赋值，而是调用<code>window.location.replace</code>方法将路由进行替换。</p>
<h2 id="articleHeader3">监听地址栏</h2>
<p>上面的<code>VueRouter.push()</code>和<code>VueRouter.replace()</code>是可以在<code>vue</code>组件的逻辑代码中直接调用的，除此之外在浏览器中，用户还可以直接在浏览器地址栏中输入改变路由，因此还需要监听浏览器地址栏中路由的变化 ，并具有与通过代码调用相同的响应行为，在<code>HashHistory</code>中这一功能通过<code>setupListeners</code>监听<strong><code>hashchange</code></strong>实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setupListeners () {
  window.addEventListener('hashchange', () => {
    if (!ensureSlash()) {
      return
    }
    this.transitionTo(getHash(), route => {
      replaceHash(route.fullPath)
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>setupListeners () {
  <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (!ensureSlash()) {
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">this</span>.transitionTo(getHash(), <span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
      replaceHash(route.fullPath)
    })
  })
}</code></pre>
<p>该方法设置监听了浏览器事件<code>hashchange</code>,调用的函数为<code>replaceHash</code>,即在浏览器地址栏中直接输入路由相当于代码调用了<code>replace()</code>方法。</p>
<h1 id="articleHeader4"><code>HTML5History</code></h1>
<p><code>History interface</code>是浏览器历史记录栈提供的接口，通过<code>back()</code>,<code>forward()</code>,<code>go()</code>等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作。<br>从<code>HTML5</code>开始，<code>History interface</code>提供了2个新的方法：<code>pushState()</code>,<code>replaceState()</code>使得我们可以对浏览器历史记录栈进行修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.history.pushState(stateObject,title,url)
window.history,replaceState(stateObject,title,url)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>window.history.pushState(<span class="hljs-keyword">state</span>Object,title,url)
window.history,replaceState(<span class="hljs-keyword">state</span>Object,title,url)</code></pre>
<ul>
<li>
<code>stateObject</code>:当浏览器跳转到新的状态时，将触发<code>popState</code>事件，该事件将携带这个<code>stateObject</code>参数的副本</li>
<li>
<code>title</code>:所添加记录的标题</li>
<li>
<code>url</code>:所添加记录的<code>url</code>
</li>
</ul>
<p>这<code>2</code>个方法有个共同的特点：当调用他们修改浏览器历史栈后，虽然当前<code>url</code>改变了，但浏览器不会立即发送请求该<code>url</code>，这就为单页应用前端路由，更新视图但不重新请求页面提供了基础。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  const { current: fromRoute } = this
  this.transitionTo(location, route => {
    pushState(cleanPath(this.base + route.fullPath))
    handleScroll(this.router, route, fromRoute, false)
    onComplete &amp;&amp; onComplete(route)
  }, onAbort)
}

replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  const { current: fromRoute } = this
  this.transitionTo(location, route => {
    replaceState(cleanPath(this.base + route.fullPath))
    handleScroll(this.router, route, fromRoute, false)
    onComplete &amp;&amp; onComplete(route)
  }, onAbort)
}

// src/util/push-state.js
export function pushState (url?: string, replace?: boolean) {
  saveScrollPosition()
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  const history = window.history
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url)
    } else {
      _key = genKey()
      history.pushState({ key: _key }, '', url)
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url)
  }
}

export function replaceState (url?: string) {
  pushState(url, true)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>push (location: RawLocation, onComplete?: <span class="hljs-built_in">Function</span>, onAbort?: <span class="hljs-built_in">Function</span>) {
  <span class="hljs-keyword">const</span> { current: fromRoute } = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">this</span>.transitionTo(location, <span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
    pushState(cleanPath(<span class="hljs-keyword">this</span>.base + route.fullPath))
    handleScroll(<span class="hljs-keyword">this</span>.router, route, fromRoute, <span class="hljs-literal">false</span>)
    onComplete &amp;&amp; onComplete(route)
  }, onAbort)
}

replace (location: RawLocation, onComplete?: <span class="hljs-built_in">Function</span>, onAbort?: <span class="hljs-built_in">Function</span>) {
  <span class="hljs-keyword">const</span> { current: fromRoute } = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">this</span>.transitionTo(location, <span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
    replaceState(cleanPath(<span class="hljs-keyword">this</span>.base + route.fullPath))
    handleScroll(<span class="hljs-keyword">this</span>.router, route, fromRoute, <span class="hljs-literal">false</span>)
    onComplete &amp;&amp; onComplete(route)
  }, onAbort)
}

<span class="hljs-comment">// src/util/push-state.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushState</span> (<span class="hljs-params">url?: <span class="hljs-built_in">string</span>, replace?: <span class="hljs-built_in">boolean</span></span>) </span>{
  saveScrollPosition()
  <span class="hljs-comment">// try...catch the pushState call to get around Safari</span>
  <span class="hljs-comment">// DOM Exception 18 where it limits to 100 pushState calls</span>
  <span class="hljs-keyword">const</span> history = <span class="hljs-built_in">window</span>.history
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">if</span> (replace) {
      history.replaceState({ key: _key }, <span class="hljs-string">''</span>, url)
    } <span class="hljs-keyword">else</span> {
      _key = genKey()
      history.pushState({ key: _key }, <span class="hljs-string">''</span>, url)
    }
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">window</span>.location[replace ? <span class="hljs-string">'replace'</span> : <span class="hljs-string">'assign'</span>](url)
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceState</span> (<span class="hljs-params">url?: <span class="hljs-built_in">string</span></span>) </span>{
  pushState(url, <span class="hljs-literal">true</span>)
}</code></pre>
<p>代码结构以及更新视图的逻辑与<code>hash</code>模式基本类似，只不过将对<code>window.location.hash()</code>直接进行赋值<code>window.location.replace()</code>改为了调用<code>history.pushState()</code>和<code>history.replaceState()</code>方法。</p>
<p>在<code>HTML5History</code>中添加对修改浏览器地址栏<code>URL</code>的监听<strong><code>popstate</code></strong>是直接在构造函数中执行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor (router: Router, base: ?string) {
  
  window.addEventListener('popstate', e => {
    const current = this.current
    this.transitionTo(getLocation(this.base), route => {
      if (expectScroll) {
        handleScroll(router, route, current, true)
      }
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">constructor</span> (<span class="hljs-params">router: Router, base: ?<span class="hljs-built_in">string</span></span>) {
  
  <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'popstate'</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> current = <span class="hljs-keyword">this</span>.current
    <span class="hljs-keyword">this</span>.transitionTo(getLocation(<span class="hljs-keyword">this</span>.base), <span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (expectScroll) {
        handleScroll(router, route, current, <span class="hljs-literal">true</span>)
      }
    })
  })
}</code></pre>
<p><code>HTML5History</code>用到了<code>HTML5</code>的新特性，需要浏版本的支持，通过<code>supportsPushState</code>来检查：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src/util/push-state.js

export const supportsPushState = inBrowser &amp;&amp; (function () {
  const ua = window.navigator.userAgent

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &amp;&amp;
    ua.indexOf('Mobile Safari') !== -1 &amp;&amp;
    ua.indexOf('Chrome') === -1 &amp;&amp;
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history &amp;&amp; 'pushState' in window.history
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>src/util/push-state.js

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> supportsPushState = inBrowser &amp;&amp; (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> ua = <span class="hljs-built_in">window</span>.navigator.userAgent

  <span class="hljs-keyword">if</span> (
    (ua.indexOf(<span class="hljs-string">'Android 2.'</span>) !== <span class="hljs-number">-1</span> || ua.indexOf(<span class="hljs-string">'Android 4.0'</span>) !== <span class="hljs-number">-1</span>) &amp;&amp;
    ua.indexOf(<span class="hljs-string">'Mobile Safari'</span>) !== <span class="hljs-number">-1</span> &amp;&amp;
    ua.indexOf(<span class="hljs-string">'Chrome'</span>) === <span class="hljs-number">-1</span> &amp;&amp;
    ua.indexOf(<span class="hljs-string">'Windows Phone'</span>) === <span class="hljs-number">-1</span>
  ) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }

  <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.history &amp;&amp; <span class="hljs-string">'pushState'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>.history
})()</code></pre>
<p>以上就是<code>hash</code>模式与<code>history</code>模式源码导读，这<code>2</code>种模式都是通过浏览器接口实现的，除此之外，<code>vue-router</code>还为非浏览器环境准备了一个<code>abstract</code>模式，其原理为用一个数组<code>stack</code>模拟出浏览器历史记录栈的功能。</p>
<h2 id="articleHeader5">两种模式比较</h2>
<p>一般的需求场景中，<code>hash</code>模式与<code>history</code>模式是差不多的，根据<code>MDN</code>的介绍，调用<code>history.pushState()</code>相比于直接修改<code>hash</code>主要有以下优势：</p>
<ul>
<li>
<code>pushState</code>设置的新<code>url</code>可以是与当前<code>url</code>同源的任意<code>url</code>,而<code>hash</code>只可修改<code>#</code>后面的部分，故只可设置与当前同文档的<code>url</code>
</li>
<li>
<code>pushState</code>设置的新<code>url</code>可以与当前<code>url</code>一模一样，这样也会把记录添加到栈中，而<code>hash</code>设置的新值必须与原来不一样才会触发记录添加到栈中</li>
<li>
<code>pushState</code>通过<code>stateObject</code>可以添加任意类型的数据记录中，而<code>hash</code>只可添加短字符串</li>
<li>
<code>pushState</code>可额外设置<code>title</code>属性供后续使用</li>
</ul>
<h2 id="articleHeader6">
<code>history</code>模式的问题</h2>
<p>对于单页应用来说，理想的使用场景是仅在进入应用时加载<code>index.html</code>，后续在的网络操作通过<code>ajax</code>完成，不会根据<code>url</code>重新请求页面，但是如果用户直接在地址栏中输入并回车，浏览器重启重新加载等特殊情况。</p>
<p><code>hash</code>模式仅改变<code>hash</code>部分的内容，而<code>hash</code>部分是不会包含在<code>http</code>请求中的(<code>hash</code>带<code>#</code>)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://oursite.com/#/user/id //如请求，只会发送http://oursite.com/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">http:<span class="hljs-regexp">//</span>oursite.com<span class="hljs-regexp">/#/u</span>ser<span class="hljs-regexp">/id /</span><span class="hljs-regexp">/如请求，只会发送http:/</span><span class="hljs-regexp">/oursite.com/</span></code></pre>
<p>所以<code>hash</code>模式下遇到根据<code>url</code>请求页面不会有问题</p>
<p>而<code>history</code>模式则将<code>url</code>修改的就和正常请求后端的<code>url</code>一样(<code>history</code>不带<code>#</code>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://oursite.com/user/id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">http:<span class="hljs-regexp">//</span>oursite.com<span class="hljs-regexp">/user/i</span>d</code></pre>
<p>如果这种向后端发送请求的话，后端没有配置对应<code>/user/id</code>的<code>get</code>路由处理,会返回<code>404</code>错误。</p>
<p>官方推荐的解决办法是在服务端增加一个覆盖所有情况的候选资源：如果 <code>URL</code> 匹配不到任何静态资源，则应该返回同一个 <code>index.html</code> 页面，这个页面就是你 <code>app</code> 依赖的页面。同时这么做以后，服务器就不再返回 <code>404</code> 错误页面，因为对于所有路径都会返回 <code>index.html</code> 文件。为了避免这种情况，在 <code>Vue</code> 应用里面覆盖所有的路由情况，然后在给出一个 <code>404</code> 页面。或者，如果是用 <code>Node.js</code> 作后台，可以使用服务端的路由来匹配 <code>URL</code>，当没有匹配到路由的时候返回 <code>404</code>，从而实现 <code>fallback</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue：路由实现原理

## 原文链接
[https://segmentfault.com/a/1190000014822765](https://segmentfault.com/a/1190000014822765)

