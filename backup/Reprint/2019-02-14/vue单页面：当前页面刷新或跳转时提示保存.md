---
title: 'vue单页面：当前页面刷新或跳转时提示保存' 
date: 2019-02-14 2:30:37
hidden: true
slug: 6om0tjj0yfa
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<blockquote>最近公司vue项目中有一个需求，需要在当前页面刷新或跳转时提示保存并可取消刷新，以防止填写的表单内容丢失。刚开始思考觉得很简单，直接在Router的钩子中判断就好了，但是会发现还有新的问题存在，浏览器刷新和当前页面关闭的时候无法监听，最终用window.onbeforeunload成功解决，所以用这篇文章简单记录下整个解决过程。</blockquote>
<h3 id="articleHeader1">vue-Router的钩子：</h3>
<p>路由钩子可以分为<strong>全局的，单个路由独享的以及组件级别的</strong>，解决上述需求只用到了组件级别的路由钩子，所以本文只介绍组件级别的路由钩子，全局的和单个路由独享的路由钩子有需要的同学可以去<a href="https://router.vuejs.org/zh/guide/advanced/navigation-guards.html" rel="nofollow noreferrer" target="_blank">vue-router官网</a>查看介绍：</p>
<p>组件级别路由钩子分为三种：</p>
<ul>
<li>beforeRouteEnter：当成功获取并能进入路由(在渲染该组件的对应路由被 confirm 前)</li>
<li>beforeRouteUpdate：在当前路由改变，但是该组件被复用时调用</li>
<li>beforeRouteLeave：导航离开该组件的对应路由时调用</li>
</ul>
<p>具体的介绍和写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // 可以通过传一个回调给 next来访问组件实例
    next(vm => { 
            // 通过 `vm` 访问组件实例
        })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // 不支持传递回调(因为this实例已经创建可以获取到，所以没必要)
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // 该导航可以通过 next(false) 来取消。
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
        next()
    } else {
    // 不支持传递回调(因为this实例已经创建可以获取到，所以没必要)
        next(false)
    }
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
    <span class="hljs-regexp">//</span> 可以通过传一个回调给 <span class="hljs-keyword">next</span>来访问组件实例
    <span class="hljs-keyword">next</span>(vm =&gt; { 
            <span class="hljs-regexp">//</span> 通过 `vm` 访问组件实例
        })
  },
  beforeRouteUpdate (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 在当前路由改变，但是该组件被复用时调用
    <span class="hljs-regexp">//</span> 举例来说，对于一个带有动态参数的路径 <span class="hljs-regexp">/foo/</span>:id，在 <span class="hljs-regexp">/foo/</span><span class="hljs-number">1</span> 和 <span class="hljs-regexp">/foo/</span><span class="hljs-number">2</span> 之间跳转的时候，
    <span class="hljs-regexp">//</span> 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
    <span class="hljs-regexp">//</span> 不支持传递回调(因为this实例已经创建可以获取到，所以没必要)
    <span class="hljs-keyword">next</span>()
  },
  beforeRouteLeave (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 导航离开该组件的对应路由时调用
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
    <span class="hljs-regexp">//</span> 该导航可以通过 <span class="hljs-keyword">next</span>(false) 来取消。
    const answer = window.confirm(<span class="hljs-string">'Do you really want to leave? you have unsaved changes!'</span>)
    <span class="hljs-keyword">if</span> (answer) {
        <span class="hljs-keyword">next</span>()
    } <span class="hljs-keyword">else</span> {
    <span class="hljs-regexp">//</span> 不支持传递回调(因为this实例已经创建可以获取到，所以没必要)
        <span class="hljs-keyword">next</span>(false)
    }
  }
}</code></pre>
<p><strong>注意</strong>：在刷新当前页面时候，beforeRouteLeave不会触发，它只在进入到其他页面时候才会触发，但是beforeRouteEnter会在刷新的时候触发。</p>
<p>通过beforeRouteLeave这个路由钩子，我们就可以在用户要离开此页面时候进行提示了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeRouteLeave (to, from, next) {
    const answer = window.confirm('当前页面数据未保存，确定要离开？')
    if (answer) {
        next()
    } else {
        next(false)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>beforeRouteLeave (<span class="hljs-keyword">to</span>, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-keyword">const</span> answer = window.confirm(<span class="hljs-string">'当前页面数据未保存，确定要离开？'</span>)
    <span class="hljs-keyword">if</span> (answer) {
        <span class="hljs-keyword">next</span>()
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">next</span>(<span class="hljs-literal">false</span>)
    }
  }</code></pre>
<p>显示的提示框如下：</p>
<p><span class="img-wrap"><img data-src="http://p5tstjsfi.bkt.clouddn.com/vue-router1luyou.png" src="https://static.alili.techhttp://p5tstjsfi.bkt.clouddn.com/vue-router1luyou.png" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">监听浏览器的刷新、页面关闭事件</h3>
<p>但是，这个时候就实现了我们最终的需求了么？并没有，还有一步：用<strong>window.onbeforeunload</strong>监听浏览器的刷新事件，当然为了防止从当前单页面跳到其他页面之后，在刷新所在新的页面还会触发window上的onbeforeunload的问题，我们不仅要及时的添加onbeforeunload事件，更要及时删除此事件，下面有两种解决方法可供选择：</p>
<ol><li>通过判断它的路由是否是当前需要添加禁止刷新的页面</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted() {
    window.onbeforeunload = function (e) {
      if(_this.$route.fullPath ==&quot;/layout/add&quot;){
          e = e || window.event;
          // 兼容IE8和Firefox 4之前的版本
          if (e) {
            e.returnValue = '关闭提示';
          }
          // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
          return '关闭提示';
      }else{
        window.onbeforeunload =null
      }
}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>mounted() {
    <span class="hljs-built_in">window</span>.onbeforeunload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
      <span class="hljs-keyword">if</span>(_this.$route.fullPath ==<span class="hljs-string">"/layout/add"</span>){
          e = e || <span class="hljs-built_in">window</span>.event;
          <span class="hljs-comment">// 兼容IE8和Firefox 4之前的版本</span>
          <span class="hljs-keyword">if</span> (e) {
            e.returnValue = <span class="hljs-string">'关闭提示'</span>;
          }
          <span class="hljs-comment">// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+</span>
          <span class="hljs-keyword">return</span> <span class="hljs-string">'关闭提示'</span>;
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">window</span>.onbeforeunload =<span class="hljs-literal">null</span>
      }
}
};</code></pre>
<ol><li>在destory或者beforeDestory的生命周期中直接将onbeforeunload事件置空</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted() {
    window.onbeforeunload = function (e) {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
            e.returnValue = '关闭提示';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示';
    }
};
destroyed() {
      window.onbeforeunload = null
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>mounted() {
    <span class="hljs-built_in">window</span>.onbeforeunload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        e = e || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-comment">// 兼容IE8和Firefox 4之前的版本</span>
        <span class="hljs-keyword">if</span> (e) {
            e.returnValue = <span class="hljs-string">'关闭提示'</span>;
        }
        <span class="hljs-comment">// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+</span>
        <span class="hljs-keyword">return</span> <span class="hljs-string">'关闭提示'</span>;
    }
};
destroyed() {
      <span class="hljs-built_in">window</span>.onbeforeunload = <span class="hljs-literal">null</span>
    }</code></pre>
<p>显示的提示框如下：</p>
<p><span class="img-wrap"><img data-src="http://p5tstjsfi.bkt.clouddn.com/vue-router1%E8%B7%AF%E7%94%B1%E9%92%A9%E5%AD%90.png" src="https://static.alili.techhttp://p5tstjsfi.bkt.clouddn.com/vue-router1%E8%B7%AF%E7%94%B1%E9%92%A9%E5%AD%90.png" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">总结</h3>
<p>最终，在beforeRouteLeave和onbeforeunload的共同作用下，这个刷新、跳转或者关闭等情况下需要提示保存的需求完美解决！但是，还有一点点小遗憾，就是onbeforeunload中弹框的自定义提示语设置始终无法生效，大家要是有更加合适的处理办法，欢迎多多交流指正！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue单页面：当前页面刷新或跳转时提示保存

## 原文链接
[https://segmentfault.com/a/1190000016874879](https://segmentfault.com/a/1190000016874879)

