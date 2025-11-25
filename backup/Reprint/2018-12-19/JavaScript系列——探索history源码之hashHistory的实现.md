---
title: 'JavaScript系列——探索history源码之hashHistory的实现' 
date: 2018-12-19 2:30:07
hidden: true
slug: t5m0cjfkans
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">history简介</h3>
<p>我们不探寻它的历史，只关注技术，通常有2种history，分别是hashHistory和browserHistory，本文带领大家从零开始实现一个hashHistory。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hashHistory：'#/home'
browserHistory: '/home'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">hashHistory：<span class="hljs-string">'#/home'</span>
browserHistory: <span class="hljs-string">'/home'</span></code></pre>
<p>下面的实现方案是根据官方history源码来分析的，你可以下载<a href="https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js" rel="nofollow noreferrer" target="_blank">hashHistory源码</a>结合本文学习。</p>
<h3 id="articleHeader1">实现方案</h3>
<p><strong>1、创建createHashHistory函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createHashHistory = () => { 
    const history = {}
    return history
}
export default createHashHistory
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createHashHistory = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { 
    <span class="hljs-keyword">const</span> history = {}
    <span class="hljs-keyword">return</span> history
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createHashHistory
</code></pre>
<p><strong>2、先要了解history对象长什么样，接着，我们一个个去实现它</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="history = {
    length: 1, //Number
    action: &quot;POP&quot;, //String
    location: {}, //Object
    createHref, //函数
    push, //函数
    replace, //函数
    go, //函数
    goBack, //函数
    goForward, //函数
    listen //函数
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">history = {
    <span class="hljs-attr">length</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">//Number</span>
    action: <span class="hljs-string">"POP"</span>, <span class="hljs-comment">//String</span>
    location: {}, <span class="hljs-comment">//Object</span>
    createHref, <span class="hljs-comment">//函数</span>
    push, <span class="hljs-comment">//函数</span>
    replace, <span class="hljs-comment">//函数</span>
    go, <span class="hljs-comment">//函数</span>
    goBack, <span class="hljs-comment">//函数</span>
    goForward, <span class="hljs-comment">//函数</span>
    listen <span class="hljs-comment">//函数</span>
}</code></pre>
<p><strong>3、实现length</strong><br>在window下面有一个history对象，可以用来获取length。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const globalHistory = window.history
history = {
    length: globalHistory.length
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> globalHistory = <span class="hljs-built_in">window</span>.history
history = {
    <span class="hljs-attr">length</span>: globalHistory.length
}</code></pre>
<p><strong>4、action默认为POP，它还可能是PUSH或者REPLACE。我们不在这一步实现它，等下面实现push和replace的时候再来实现。</strong></p>
<p><strong>5、实现location</strong><br>location对象包含下面几个key，这里能用到的是pathname。history.location和window.location是不一样的，history.location是window.location的精简版。你可以在浏览器控制台打印window.location看一下完整的location对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location = {
    hash:&quot;&quot;,
    pathname:&quot;/&quot;,
    search:&quot;&quot;,
    state:undefined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">location = {
    <span class="hljs-attr">hash</span>:<span class="hljs-string">""</span>,
    <span class="hljs-attr">pathname</span>:<span class="hljs-string">"/"</span>,
    <span class="hljs-attr">search</span>:<span class="hljs-string">""</span>,
    <span class="hljs-attr">state</span>:<span class="hljs-literal">undefined</span>
}</code></pre>
<p>定义一个getDOMLocation函数，用来获取封装后的location。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const decodePath = path =>
  path.charAt(0) === &quot;/&quot; ? path : &quot;/&quot; + path

const getHashPath = () => {
    //如果url存在#，则去掉#，返回路径
    //比如：&quot;http://localhost:8080/#/&quot;，返回'/'
    const href = window.location.href
    const hashIndex = href.indexOf(&quot;#&quot;)
    return hashIndex === -1 ? &quot;&quot; : href.substring(hashIndex + 1)
}

const getDOMLocation = () => {
    //getHashPath截取url的路由，如果存在#，则去掉#
    let path = decodePath(getHashPath())     
    //创建location
    return createLocation(path)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> decodePath = <span class="hljs-function"><span class="hljs-params">path</span> =&gt;</span>
  path.charAt(<span class="hljs-number">0</span>) === <span class="hljs-string">"/"</span> ? path : <span class="hljs-string">"/"</span> + path

<span class="hljs-keyword">const</span> getHashPath = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">//如果url存在#，则去掉#，返回路径</span>
    <span class="hljs-comment">//比如："http://localhost:8080/#/"，返回'/'</span>
    <span class="hljs-keyword">const</span> href = <span class="hljs-built_in">window</span>.location.href
    <span class="hljs-keyword">const</span> hashIndex = href.indexOf(<span class="hljs-string">"#"</span>)
    <span class="hljs-keyword">return</span> hashIndex === <span class="hljs-number">-1</span> ? <span class="hljs-string">""</span> : href.substring(hashIndex + <span class="hljs-number">1</span>)
}

<span class="hljs-keyword">const</span> getDOMLocation = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">//getHashPath截取url的路由，如果存在#，则去掉#</span>
    <span class="hljs-keyword">let</span> path = decodePath(getHashPath())     
    <span class="hljs-comment">//创建location</span>
    <span class="hljs-keyword">return</span> createLocation(path)
}</code></pre>
<p>这一步的核心就是createLocation()的实现。但是，它不复杂，只是代码有点长，如果要了解，请看源码 <a href="https://github.com/ReactTraining/history/blob/master/modules/LocationUtils.js" rel="nofollow noreferrer" target="_blank">createLocation</a>。</p>
<p><strong>6、实现createHref</strong><br>你可能没有用过history.createHref()，它用来创建一个hash路由，也就是'#/'或者'#/home'这类的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createPath = location => {
  const { pathname, search, hash } = location
  let path = pathname || &quot;/&quot;
  if (search &amp;&amp; search !== &quot;?&quot;)
    path += search.charAt(0) === &quot;?&quot; ? search : `?${search}`
  if (hash &amp;&amp; hash !== &quot;#&quot;) path += hash.charAt(0) === &quot;#&quot; ? hash : `#${hash}`
  return path
}

const createHref = location =>
    &quot;#&quot; + encodePath(createPath(location))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> createPath = <span class="hljs-function"><span class="hljs-params">location</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> { pathname, search, hash } = location
  <span class="hljs-keyword">let</span> path = pathname || <span class="hljs-string">"/"</span>
  <span class="hljs-keyword">if</span> (search &amp;&amp; search !== <span class="hljs-string">"?"</span>)
    path += search.charAt(<span class="hljs-number">0</span>) === <span class="hljs-string">"?"</span> ? search : <span class="hljs-string">`?<span class="hljs-subst">${search}</span>`</span>
  <span class="hljs-keyword">if</span> (hash &amp;&amp; hash !== <span class="hljs-string">"#"</span>) path += hash.charAt(<span class="hljs-number">0</span>) === <span class="hljs-string">"#"</span> ? hash : <span class="hljs-string">`#<span class="hljs-subst">${hash}</span>`</span>
  <span class="hljs-keyword">return</span> path
}

<span class="hljs-keyword">const</span> createHref = <span class="hljs-function"><span class="hljs-params">location</span> =&gt;</span>
    <span class="hljs-string">"#"</span> + encodePath(createPath(location))</code></pre>
<p><strong>7、实现push方法</strong><br>我们在使用push的时候，通常是history.push('/home')这种形式，不需要自己加#。<br>push实现的原理：判断push传入的路由和当前url的路由是否一样，如果一样，则不更新路由，否则就更新路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//更新history对象的值，length、location和action
const setState = nextState => {
    Object.assign(history, nextState)    
    history.length = globalHistory.length        
    transitionManager.notifyListeners(history.location, history.action)
}
//notifyListeners函数用来通知history的更新
 const notifyListeners = (...args) => {
    listeners.forEach(listener => listener(...args))
  }
//更新路由
const pushHashPath = path => (window.location.hash = path)

//push核心代码
const push = (path, state) => {
    //更新action为'PUSH'
    const action = &quot;PUSH&quot;
    //更新location对象
    const location = createLocation(
       path,
       undefined,
       undefined,
       history.location
    )   
    //更新路由前的确认操作，confirmTransitionTo函数内部会处理好路由切换的状态判断，如果ok，则执行最后一个参数，它是回调函数。
    transitionManager.confirmTransitionTo(
       location,
       action,
       getUserConfirmation,
       ok => {
           //如果不符合路由切换的条件，就不更新路由
           if (!ok) return               
           //获取location中的路径pathname，比如'/home'
           const path = createPath(location)
           const encodedPath = encodePath(path)
           //比较当前的url中的路由和push函数传入的路由是否相同，不相同则hashChanged为true。
           const hashChanged = getHashPath() !== encodedPath          
           if (hashChanged) {
               //路由允许更新
               ignorePath = path
               //更新路由
               pushHashPath(encodedPath)              
               const prevIndex = allPaths.lastIndexOf(createPath(history.location))
               const nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1)                    
               nextPaths.push(path)
               allPaths = nextPaths     
               //setState更新history对象。               
               setState({ action, location })
          } else {
              //push的路由和当前路由一样，会发出一个警告“Hash history cannot PUSH the same path; a new entry will not be added to the history stack”
              setState()
          }
       }
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//更新history对象的值，length、location和action</span>
<span class="hljs-keyword">const</span> setState = <span class="hljs-function"><span class="hljs-params">nextState</span> =&gt;</span> {
    <span class="hljs-built_in">Object</span>.assign(history, nextState)    
    history.length = globalHistory.length        
    transitionManager.notifyListeners(history.location, history.action)
}
<span class="hljs-comment">//notifyListeners函数用来通知history的更新</span>
 <span class="hljs-keyword">const</span> notifyListeners = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
    listeners.forEach(<span class="hljs-function"><span class="hljs-params">listener</span> =&gt;</span> listener(...args))
  }
<span class="hljs-comment">//更新路由</span>
<span class="hljs-keyword">const</span> pushHashPath = <span class="hljs-function"><span class="hljs-params">path</span> =&gt;</span> (<span class="hljs-built_in">window</span>.location.hash = path)

<span class="hljs-comment">//push核心代码</span>
<span class="hljs-keyword">const</span> push = <span class="hljs-function">(<span class="hljs-params">path, state</span>) =&gt;</span> {
    <span class="hljs-comment">//更新action为'PUSH'</span>
    <span class="hljs-keyword">const</span> action = <span class="hljs-string">"PUSH"</span>
    <span class="hljs-comment">//更新location对象</span>
    <span class="hljs-keyword">const</span> location = createLocation(
       path,
       <span class="hljs-literal">undefined</span>,
       <span class="hljs-literal">undefined</span>,
       history.location
    )   
    <span class="hljs-comment">//更新路由前的确认操作，confirmTransitionTo函数内部会处理好路由切换的状态判断，如果ok，则执行最后一个参数，它是回调函数。</span>
    transitionManager.confirmTransitionTo(
       location,
       action,
       getUserConfirmation,
       ok =&gt; {
           <span class="hljs-comment">//如果不符合路由切换的条件，就不更新路由</span>
           <span class="hljs-keyword">if</span> (!ok) <span class="hljs-keyword">return</span>               
           <span class="hljs-comment">//获取location中的路径pathname，比如'/home'</span>
           <span class="hljs-keyword">const</span> path = createPath(location)
           <span class="hljs-keyword">const</span> encodedPath = encodePath(path)
           <span class="hljs-comment">//比较当前的url中的路由和push函数传入的路由是否相同，不相同则hashChanged为true。</span>
           <span class="hljs-keyword">const</span> hashChanged = getHashPath() !== encodedPath          
           <span class="hljs-keyword">if</span> (hashChanged) {
               <span class="hljs-comment">//路由允许更新</span>
               ignorePath = path
               <span class="hljs-comment">//更新路由</span>
               pushHashPath(encodedPath)              
               <span class="hljs-keyword">const</span> prevIndex = allPaths.lastIndexOf(createPath(history.location))
               <span class="hljs-keyword">const</span> nextPaths = allPaths.slice(<span class="hljs-number">0</span>, prevIndex === <span class="hljs-number">-1</span> ? <span class="hljs-number">0</span> : prevIndex + <span class="hljs-number">1</span>)                    
               nextPaths.push(path)
               allPaths = nextPaths     
               <span class="hljs-comment">//setState更新history对象。               </span>
               setState({ action, location })
          } <span class="hljs-keyword">else</span> {
              <span class="hljs-comment">//push的路由和当前路由一样，会发出一个警告“Hash history cannot PUSH the same path; a new entry will not be added to the history stack”</span>
              setState()
          }
       }
    )
}</code></pre>
<p><strong>8、实现replace</strong><br>replace和push都能更新路由，但是replace是更新当前路由，而push是增加一个历史记录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//更新路由
const replaceHashPath = path => {
    const hashIndex = window.location.href.indexOf(&quot;#&quot;)   
    window.location.replace(
        window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + &quot;#&quot; + path
    )
}
    //replace核心代码
    const replace = (path, state) => {
        const action = &quot;REPLACE&quot;
        const location = createLocation(
            path,
            undefined,
            undefined,
            history.location
        )      
        transitionManager.confirmTransitionTo(
            location,
            action,
            getUserConfirmation,
            ok => {
                if (!ok) return              
                const path = createPath(location)
                const encodedPath = encodePath(path)
                const hashChanged = getHashPath() !== encodedPath  
                //到这里为止，前面的代码和push函数的实现都是一样的
                             
                if (hashChanged) {
                    ignorePath = path
                    //更新路由
                    replaceHashPath(encodedPath)
                }                
                const prevIndex = allPaths.indexOf(createPath(history.location))                
                if (prevIndex !== -1) allPaths[prevIndex] = path               
                setState({ action, location })
            }
        )
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//更新路由</span>
<span class="hljs-keyword">const</span> replaceHashPath = <span class="hljs-function"><span class="hljs-params">path</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> hashIndex = <span class="hljs-built_in">window</span>.location.href.indexOf(<span class="hljs-string">"#"</span>)   
    <span class="hljs-built_in">window</span>.location.replace(
        <span class="hljs-built_in">window</span>.location.href.slice(<span class="hljs-number">0</span>, hashIndex &gt;= <span class="hljs-number">0</span> ? hashIndex : <span class="hljs-number">0</span>) + <span class="hljs-string">"#"</span> + path
    )
}
    <span class="hljs-comment">//replace核心代码</span>
    <span class="hljs-keyword">const</span> replace = <span class="hljs-function">(<span class="hljs-params">path, state</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> action = <span class="hljs-string">"REPLACE"</span>
        <span class="hljs-keyword">const</span> location = createLocation(
            path,
            <span class="hljs-literal">undefined</span>,
            <span class="hljs-literal">undefined</span>,
            history.location
        )      
        transitionManager.confirmTransitionTo(
            location,
            action,
            getUserConfirmation,
            ok =&gt; {
                <span class="hljs-keyword">if</span> (!ok) <span class="hljs-keyword">return</span>              
                <span class="hljs-keyword">const</span> path = createPath(location)
                <span class="hljs-keyword">const</span> encodedPath = encodePath(path)
                <span class="hljs-keyword">const</span> hashChanged = getHashPath() !== encodedPath  
                <span class="hljs-comment">//到这里为止，前面的代码和push函数的实现都是一样的</span>
                             
                <span class="hljs-keyword">if</span> (hashChanged) {
                    ignorePath = path
                    <span class="hljs-comment">//更新路由</span>
                    replaceHashPath(encodedPath)
                }                
                <span class="hljs-keyword">const</span> prevIndex = allPaths.indexOf(createPath(history.location))                
                <span class="hljs-keyword">if</span> (prevIndex !== <span class="hljs-number">-1</span>) allPaths[prevIndex] = path               
                setState({ action, location })
            }
        )
    }</code></pre>
<p><strong>9、实现go</strong><br>go方法的使用是history.go(-1)这种形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//globalHistory是window.history
const go = n => globalHistory.go(n)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//globalHistory是window.history</span>
<span class="hljs-keyword">const</span> go = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> globalHistory.go(n)</code></pre>
<p><strong>10、实现goBack</strong><br>这个应该能一眼看懂了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const goBack = () => go(-1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> goBack = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> go(<span class="hljs-number">-1</span>)</code></pre>
<p><strong>11、实现goForward</strong><br>这个应该也能一眼看懂了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const goForward = () => go(1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> goForward = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> go(<span class="hljs-number">1</span>)</code></pre>
<p><strong>12、实现listen</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const listen = listener => {
    const unlisten = transitionManager.appendListener(listener)
    checkDOMListeners(1)    
    return () => {
        checkDOMListeners(-1)
        unlisten()
    }
}

//监听hashchange的改变，handleHashChange函数用来判断是哪种类型的路由更新，replace、push等各种hash改变都实现了一个函数，具体看源码。
const checkDOMListeners = delta => {
    listenerCount += delta    
    if (listenerCount === 1) {
        //注册监听函数
        window.addEventListener('hashchange', handleHashChange)
    } else if (listenerCount === 0) {
        //移除监听函数
        window.removeEventListener('hashchange', handleHashChange)
    }
}

  //appendListener函数实现
  let listeners = []
  const appendListener = fn => {
    let isActive = true
    const listener = (...args) => {
      if (isActive) fn(...args)
    }
    listeners.push(listener)
    return () => {
      isActive = false
      listeners = listeners.filter(item => item !== listener)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> listen = <span class="hljs-function"><span class="hljs-params">listener</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> unlisten = transitionManager.appendListener(listener)
    checkDOMListeners(<span class="hljs-number">1</span>)    
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        checkDOMListeners(<span class="hljs-number">-1</span>)
        unlisten()
    }
}

<span class="hljs-comment">//监听hashchange的改变，handleHashChange函数用来判断是哪种类型的路由更新，replace、push等各种hash改变都实现了一个函数，具体看源码。</span>
<span class="hljs-keyword">const</span> checkDOMListeners = <span class="hljs-function"><span class="hljs-params">delta</span> =&gt;</span> {
    listenerCount += delta    
    <span class="hljs-keyword">if</span> (listenerCount === <span class="hljs-number">1</span>) {
        <span class="hljs-comment">//注册监听函数</span>
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>, handleHashChange)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (listenerCount === <span class="hljs-number">0</span>) {
        <span class="hljs-comment">//移除监听函数</span>
        <span class="hljs-built_in">window</span>.removeEventListener(<span class="hljs-string">'hashchange'</span>, handleHashChange)
    }
}

  <span class="hljs-comment">//appendListener函数实现</span>
  <span class="hljs-keyword">let</span> listeners = []
  <span class="hljs-keyword">const</span> appendListener = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> isActive = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">const</span> listener = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (isActive) fn(...args)
    }
    listeners.push(listener)
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      isActive = <span class="hljs-literal">false</span>
      listeners = listeners.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item !== listener)
    }
  }</code></pre>
<h3 id="articleHeader2">总结</h3>
<p>history对象的所有属性和方法都实现了一遍，在react-router中，将history对象封装进了Router、Route等组件中，使得你可以在react组件中通过this.props.history读取。</p>
<p>看完源码，你会发现history的实现真的不复杂，找准思路，一个个函数去实现，再考虑兼容性，就非常完美了，以后你在其他博客上看到有人宣传自己搞了个自己的路由插件，不要觉得很牛逼，重构history换个新姿势就是一个插件了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript系列——探索history源码之hashHistory的实现

## 原文链接
[https://segmentfault.com/a/1190000012656017](https://segmentfault.com/a/1190000012656017)

