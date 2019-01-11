---
title: '微信小程序长按事件触发点击事件的BUG处理' 
date: 2019-01-10 2:30:08
hidden: true
slug: 5wb6nx8gml2
categories: [reprint]
---

{{< raw >}}

                    
<p>微信小程序开发说实话还是有点糟心的，经过事件冒泡的坑之后，又遇到了长按事件(longtap)必触发点击事件(tap)的BUG</p>
<h2 id="articleHeader0">实例代码</h2>
<ul><li><p>wxml</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<view class=&quot;container&quot;>
  <view>
    <button bindtap=&quot;tap&quot; bindlongtap=&quot;longtap&quot;>长按我</button>
  </view>
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">"tap"</span> <span class="hljs-attr">bindlongtap</span>=<span class="hljs-string">"longtap"</span>&gt;</span>长按我<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></code></pre>
<ul><li><p>js</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Page({
  data: {
  },
  tap: function() {
    console.log('触发了 tap')
  },
  longtap: function () {
    console.log('触发了 longtap')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Page({
  <span class="hljs-attr">data</span>: {
  },
  <span class="hljs-attr">tap</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'触发了 tap'</span>)
  },
  <span class="hljs-attr">longtap</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'触发了 longtap'</span>)
  }
})</code></pre>
<ul><li><p>效果</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010008530" src="https://static.alili.tech/img/remote/1460000010008530" alt="longtap触发tap演示" title="longtap触发tap演示" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">解决方法</h2>
<p>Google后确定是小程序有意(B)为(U)之(G)后，看了一下网上的解决方法，基本都是通过<code>touchstart</code>和<code>touchend</code>重新判定<code>tap</code>和<code>longtap</code>事件的，个人不是很喜欢。</p>
<p>看一下微信小程序的事件定义：</p>
<ul>
<li><p>tap, 手指触摸后马上离开</p></li>
<li><p>longtap, 手指触摸后，超过350ms再离开</p></li>
</ul>
<p>也就是说，目前的触发的顺序是 <code>longtap -&gt; touchend -&gt; tap</code></p>
<p>那么其实解决也很清晰了，简单来说就是 <code>加把锁</code>, 应用到上面的代码上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Page({
  data: {
    lock: false
  },
  tap: function() {
    //检查锁
    if (this.data.lock) {
      return;
    }
    console.log('触发了 tap')
  },
  touchend: function() {
    if (this.data.lock) {
      //开锁
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    }
  },
  longtap: function () {
    //锁住
    this.setData({lock: true});
    console.log('触发了 longtap')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Page({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">lock</span>: <span class="hljs-literal">false</span>
  },
  <span class="hljs-attr">tap</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//检查锁</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.data.lock) {
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'触发了 tap'</span>)
  },
  <span class="hljs-attr">touchend</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.data.lock) {
      <span class="hljs-comment">//开锁</span>
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setData({ <span class="hljs-attr">lock</span>: <span class="hljs-literal">false</span> });
      }, <span class="hljs-number">100</span>);
    }
  },
  <span class="hljs-attr">longtap</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//锁住</span>
    <span class="hljs-keyword">this</span>.setData({<span class="hljs-attr">lock</span>: <span class="hljs-literal">true</span>});
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'触发了 longtap'</span>)
  }
})</code></pre>
<p>看一下效果 </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010008531" src="https://static.alili.tech/img/remote/1460000010008531" alt="longtap触发tap演示" title="longtap触发tap演示" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">延伸</h2>
<p>大部分情况下，我们都是不需要在<code>touchend</code>中加锁的，因为长按操作会触发其他的异步操作，只要保证异步操作的最后把锁解除了即可。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序长按事件触发点击事件的BUG处理

## 原文链接
[https://segmentfault.com/a/1190000010008525](https://segmentfault.com/a/1190000010008525)

