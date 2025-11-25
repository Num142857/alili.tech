---
title: '【vue-router②】使用导航守卫控制页面前进刷新，后退缓存' 
date: 2018-12-26 2:30:14
hidden: true
slug: w3rqhqr1kut
categories: [reprint]
---

{{< raw >}}

                    
<p>之前给大家分享了<a href="https://segmentfault.com/a/1190000011640453">利用keep-alive进行缓存你想要的页面</a>，然后到后面会出现这样的问题：<br>我有三个组件A（组件）、B（A中的弹框）、C（组件），其实算是两个组件，一个弹框，现在他们的关系是这样的：<br>  点击A（li循环列表组件）中某个功能，弹出了B（弹框-表格），然后在B（弹框）点击连接跳转到C（组件）。<br>然后我想要实现A（li循环列表组件）缓存，B（弹框-表格）根据A的传参实时刷新，C（组件）根据B的传参实时刷新，A-&gt;B-&gt;C。<br>接下来返回依次从C-&gt;B-&gt;A，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVXP8G?w=944&amp;h=535" src="https://static.alili.tech/img/bVXP8G?w=944&amp;h=535" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>1、B是一个弹框，和A处于同一个组件，从C返回要看到B的话，就要实现A缓存，即C返回A的时候A没刷新还保持弹框不变就可以实现C是退回B，这个用前面说的keep-alive就可以实现。<br>2、这时候从B-&gt;A（我们这边退回按钮设置关闭弹框是可以实现B-&gt;A的），点击的是浏览器或者手机的回退键，就会发现，并没有实现这一步，而是B直接退到A的前一页，因为系统的回退键记录的是历史路由，而B和A本身就是一个路由，所以就会出现这种情况。<br>这时候的解决办法就是：判断路由离开前，B弹框是否打开，若是打开就先关闭弹框，不允许路由跳转，所以就可以造成B回退到A的假象。这时候利用的是beforeRouteLeave钩子。实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeRouteLeave(to,from,next) {
    //B是B弹框的v-model值
    if (this.B) {
      this.B= false;
      next(false);
    } else {
      next();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>beforeRouteLeave(to,<span class="hljs-keyword">from</span>,<span class="hljs-keyword">next</span>) {
    <span class="hljs-comment">//B是B弹框的v-model值</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.B) {
      <span class="hljs-keyword">this</span>.B= <span class="hljs-keyword">false</span>;
      <span class="hljs-keyword">next</span>(<span class="hljs-keyword">false</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">next</span>();
    }
}</code></pre>
<p>3、然后接下来你就会发现另一个问题，就是B-&gt;C的时候，因为B是打开的，上面的判断就会造成B无法跳转到C，但是没设置上面的代码，就会造成C回退的时候，要么是到C-&gt;A（A不设缓存，实时刷新）-&gt;A前面的页面，要么C-&gt;B(A设缓存，不刷新就保持B)-&gt;A前面的页面，无论是那种情况都不是我们想要的。<br>解决：还是使用beforeRouteLeave，再加一层判断，当路由跳转的目标是C的时候，next设为true，若是其他跳转则设为false。<br>（1）判断目标路由是C的时候，保持B为true，这样C-&gt;B，<br>（2）当B后退的时候，判断B打开，则先关闭B，不后退，这样就能B-&gt;A<br>（3）A再回退的时候，B已经为false，所A就可以再返回到它的上一级。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" beforeRouteLeave(to,from,next) {
      /*to:目标路由
      * from：当前要离开的路由
      * */
      if(to.name === &quot;C&quot;){
        if(this.B){
          this.B= true;
          next();
        } else{
          next();}
      }else {
        if (this.B) {
          this.B= false;
          next(false);
        } else {
          next();
        }
      }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code> beforeRouteLeave(to,<span class="hljs-keyword">from</span>,<span class="hljs-keyword">next</span>) {
      <span class="hljs-comment">/*to:目标路由
      * from：当前要离开的路由
      * */</span>
      <span class="hljs-keyword">if</span>(to.name === <span class="hljs-string">"C"</span>){
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.B){
          <span class="hljs-keyword">this</span>.B= <span class="hljs-keyword">true</span>;
          <span class="hljs-keyword">next</span>();
        } <span class="hljs-keyword">else</span>{
          <span class="hljs-keyword">next</span>();}
      }<span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.B) {
          <span class="hljs-keyword">this</span>.B= <span class="hljs-keyword">false</span>;
          <span class="hljs-keyword">next</span>(<span class="hljs-keyword">false</span>);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">next</span>();
        }
      }
    },</code></pre>
<p>这里就可以实现我要的回退顺序及效果。</p>
<p>说到beforeRouteLeave，就不得不跟大家提一下v-router的导航守卫，可参考<a href="https://router.vuejs.org/zh-cn/advanced/navigation-guards.html" rel="nofollow noreferrer" target="_blank">官方文档</a>。<br>现在我来说下我对于组件内的守卫的一个理解。共有三个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 在渲染该组件的对应路由被 confirm 前调用
    <span class="hljs-regexp">//</span> 不！能！获取组件实例 `this`
    <span class="hljs-regexp">//</span> 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 在当前路由改变，但是该组件被复用时调用
    <span class="hljs-regexp">//</span> 举例来说，对于一个带有动态参数的路径 <span class="hljs-regexp">/foo/</span>:id，在 <span class="hljs-regexp">/foo/</span><span class="hljs-number">1</span> 和 <span class="hljs-regexp">/foo/</span><span class="hljs-number">2</span> 之间跳转的时候，
    <span class="hljs-regexp">//</span> 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 导航离开该组件的对应路由时调用
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
  }
}</code></pre>
<p>三者都能接收三种参数：to, from, next</p>
<p><span class="img-wrap"><img data-src="/img/bVXQof?w=877&amp;h=537" src="https://static.alili.tech/img/bVXQof?w=877&amp;h=537" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>顾名思义，<br><strong>beforeRouteEnter</strong> ：表示在进入当前组件前的一个操作，它执行顺序是很靠前的，而其中next的回调勾子的函数，执行则非常靠后，在mounted之后！！<br>我们通常是在beforeRouteEnter中加载一些首屏用数据，待数据收到后，再调用next勾子，通过回调的参数vm将数据绑定到实例上。<br>因此，请注意next的勾子是非常靠后的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeRouteEnter(to, from, next) {
    next(vm => {
        if(to.name == '目标路由名称'){
            //vm.fetchData()
        }else{
            //vm.fetchData()
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">beforeRouteEnter</span><span class="hljs-params">(to, from, next)</span></span> {
    next(vm =&gt; {
        <span class="hljs-keyword">if</span>(to<span class="hljs-selector-class">.name</span> == <span class="hljs-string">'目标路由名称'</span>){
            <span class="hljs-comment">//vm.fetchData()</span>
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">//vm.fetchData()</span>
        }
    })
}</code></pre>
<p><strong>beforeRouteUpdate</strong> ：表示在当前组件改变之前，这个还没用过，具体我也不太清楚里面的情况，后面用到再做介绍。<br><strong>beforeRouteLeave</strong> ：表示在当前组件离开之前，这个就是我的最爱了，现在对于组件的状态控制，我可都是依赖它的，像上面提到的控制弹框和跳转。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vue-router②】使用导航守卫控制页面前进刷新，后退缓存

## 原文链接
[https://segmentfault.com/a/1190000011841673](https://segmentfault.com/a/1190000011841673)

