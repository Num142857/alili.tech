---
title: 'vue手札 -- vue-router的简单流程' 
date: 2019-02-03 2:30:39
hidden: true
slug: ruzuikwlaur
categories: [reprint]
---

{{< raw >}}

                    
<p>因为路由权限问题，简单的看了一下vue-router。整理了一下router的一个简单过程</p>
<blockquote><p><code>beforeEach</code> -&gt; <code>canReuse</code> -&gt; <code>canDeactivate</code> -&gt; <code>canActivate</code> -&gt; <code>deactivate</code> -&gt; <code>afterEach</code> -&gt; <code>activate </code></p></blockquote>
<p>其中<code>canDeactivate</code> | <code>canActivate</code> | <code>deactivate</code> | <code>activate</code>这几个钩子涉及组件复用的问题，所以有可能不会被调用，但是当<code>canReuse</code>返回false时，就一定会被调用了</p>
<h1 id="articleHeader0">一、vue-router组成</h1>
<p>vue-router组件有三个部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.link：即v-link
2.view：元素指令，即<router-view></router-view>
3.router：核心部分
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-number">1.</span>link：即v-link
<span class="hljs-number">2.</span><span class="hljs-keyword">view</span>：元素指令，即&lt;router-<span class="hljs-keyword">view</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
<span class="hljs-number">3.</span>router：核心部分
</code></pre>
<h1 id="articleHeader1">二、vue-router简单的一个流程</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.url 变化
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span><span class="hljs-selector-class">.url</span> 变化
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.history监听（onChange事件）
      # 例如：
         window.addEventListener(‘hashchange’, () => {})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-number">2.</span>history监听（onChange事件）
      <span class="hljs-comment"># 例如：</span>
         <span class="hljs-built_in">window</span>.addEventListener(‘hashchange’, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {})
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 3.调用路由匹配（ this._match）
      # 会保存老的transition和新的transition
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code> <span class="hljs-number">3.</span>调用路由匹配（ <span class="hljs-keyword">this</span>._match）
      <span class="hljs-meta"># 会保存老的transition和新的transition</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 4.走一遍beforeEach
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code> <span class="hljs-number">4</span>.走一遍<span class="hljs-keyword">beforeEach
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 5.走startTransition开始进入transition的撕逼周期（也算是vue-router的核心所在）
 
      # 这里会涉及组件复用的问题
         1).canReuse：调用canReuse钩子
              看当前的<vue-router>和将要跳转的<vue-router>之间有没有可重用的组件
              a/b/c
              a/b/d  =>  可复用[a,b]，需要销毁[c]，需要生成[d]
              
         2).canDeactivate(c)：调用canDeactivate钩子
             route: {
                 canDeactivate() {}
             }
             
         3).canActivate(d)：调用canActivate钩子
         
         4).deactivate(c)：调用deactivate钩子
         
         5)._afterEachHooks(c)：调用afterEach钩子
         
         6).reuse([a,b])：调用data钩子
         
         7).activate(d) ：调用activate | data钩子
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code> <span class="hljs-number">5.</span>走startTransition开始进入transition的撕逼周期（也算是vue-router的核心所在）
 
      <span class="hljs-meta"># 这里会涉及组件复用的问题</span>
         <span class="hljs-number">1</span>).canReuse：调用canReuse钩子
              看当前的<span class="hljs-params">&lt;vue-router&gt;</span>和将要跳转的<span class="hljs-params">&lt;vue-router&gt;</span>之间有没有可重用的组件
              a<span class="hljs-meta-keyword">/b/</span>c
              a<span class="hljs-meta-keyword">/b/</span>d  =&gt;  可复用[a,b]，需要销毁[c]，需要生成[d]
              
         <span class="hljs-number">2</span>).canDeactivate(c)：调用canDeactivate钩子
<span class="hljs-symbol">             route:</span> {
                 canDeactivate() {}
             }
             
         <span class="hljs-number">3</span>).canActivate(d)：调用canActivate钩子
         
         <span class="hljs-number">4</span>).deactivate(c)：调用deactivate钩子
         
         <span class="hljs-number">5</span>)._afterEachHooks(c)：调用afterEach钩子
         
         <span class="hljs-number">6</span>).reuse([a,b])：调用data钩子
         
         <span class="hljs-number">7</span>).activate(d) ：调用activate | data钩子
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 6.若activate(d)，则调用vue中的build方法，新生成component
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code> <span class="hljs-number">6.</span>若<span class="hljs-built_in">activate</span>(d)，则调用vue中的build方法，新生成component
</code></pre>
<h1 id="articleHeader2">三、两个应用场景</h1>
<h2 id="articleHeader3">1.组件复用(a/b/:id)</h2>
<p>这次遇到了类似(a/b/:id)这样的路由，这种路由一直都只是（:id）在变化，&lt;vue-router&gt;一直是被复用的，所以不会走canDeactive | canActivate | deactivate | activate，只会走_beforeEachHooks，_afterEachHooks、canReuse和reuse，也就是调用<code>router.beforeEach</code>，<code>canReuse</code>，<code>router.afterEach</code>和<code>this.data</code>。所以<code>data、canReuse、beforeEach和afterEach是vue-router总是会走的四个方法</code>当然没有被transition.abort()的前提下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new VueRouter().beforeEach(function (transition) {
     if (transition.to.path === '/forbidden') {
        transition.abort()
      } else {
        transition.next()
      }
 })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code> <span class="hljs-keyword">new</span> VueRouter().beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(transition)</span> {</span>
     <span class="hljs-keyword">if</span> (transition.<span class="hljs-keyword">to</span>.path === <span class="hljs-string">'/forbidden'</span>) {
        transition.abort()
      } <span class="hljs-keyword">else</span> {
        transition.<span class="hljs-keyword">next</span>()
      }
 })
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new VueRouter().afterEach(function (transition) {
   console.log('成功浏览到: ' + transition.to.path)
 })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">new</span> VueRouter().afterEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">transition</span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'成功浏览到: '</span> + transition.to.path)
 })
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" route: {
     canReuse() {
       return true
     },
     data() {
         // TODO 没有被transition.abort()的时候，会被调用
     }
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code> route: {
     canReuse() {
       return true
     },
     <span class="hljs-class"><span class="hljs-keyword">data</span>() {
         // <span class="hljs-type">TODO</span> 没有被<span class="hljs-title">transition</span>.<span class="hljs-title">abort</span>()的时候，会被调用
     }</span>
 }
</code></pre>
<h2 id="articleHeader4">2.路由切换</h2>
<p>有一种场景是组件a切换到组件b时，想要先停留在a，等b获取了数据才进行切换，想做到这个可以使用waitForData（这个好像在文档中是没提到的，在activate方法中用到了），在b组件作如下操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" route: {
     data() {
         // TODO 数据请求加载
     },
     waitForData: true  //数据加载完在切换
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code> route: {
     <span class="hljs-class"><span class="hljs-keyword">data</span>() {
         // <span class="hljs-type">TODO</span> 数据请求加载
     },</span>
     waitForData: true  //数据加载完在切换
 }
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue手札 -- vue-router的简单流程

## 原文链接
[https://segmentfault.com/a/1190000007010802](https://segmentfault.com/a/1190000007010802)

