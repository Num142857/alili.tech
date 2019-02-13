---
title: '高级 Vue 组件模式 (8)' 
date: 2019-02-14 2:30:37
hidden: true
slug: p3zqy7cxgjs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">08 使用 Control Props</h2>
<h3 id="articleHeader1">目标</h3>
<p>在第七篇文章中，我们对 <code>toggle</code> 组件进行了重构，使父组件能够传入开关状态的初始值，同时还可以传入自定义的状态重置逻辑。虽然父组件拥有了改变 <code>toggle</code> 组件内部状态的途径，但是如果进一步思考的话，父组件并没有绝对的控制权。在一些业务场景，我们期望父组件对于子组件的状态，拥有绝对的控制权。</p>
<p>熟悉 React 的读者一定不会对智能组件（Smart Component）和木偶组件（Dump Component）感到陌生。对于后者，其父组件一定对其拥有绝对控制权，因为它内部没有状态，渲染逻辑完全取决于父组件所传 props 的值。而对于前者则相反，由于组件内部会有自己的状态，它内部的渲染逻辑由父组件所传 props 与其内部状态共同决定。</p>
<p>这篇文章将着重解决这个问题，如果能够使一个智能组件的状态变得可控，即：</p>
<ul>
<li>
<code>toggle</code> 组件的开关状态应该完全由 prop 属性 on 的值决定</li>
<li>当没有 on 属性时，<code>toggle</code> 组件的开关状态降级为内部管理</li>
</ul>
<p>额外地，我们还将实现一个小需求，<code>toggle</code> 组件的开关状态至多切换四次，如果超过四次，则需点击重置后，才能够重新对开关切换状态进行切换。</p>
<h3 id="articleHeader2">实现</h3>
<h4>判定组件是否受控</h4>
<p>由于 <code>toggle</code> 组件为一个智能组件，我们需要提供一个判定它是否受控的方式。很简单，由目标中的第一点可知，当父组件传入了 <code>on</code> 属性后，<code>toggle</code> 处于被控制的状态，否则则没有，于是可以利用 Vue 组件的 <code>computed</code> 特性，声明一个 <code>isOnControlled</code> 计算属性，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  isOnControlled() {
    return this.on !== undefined;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>computed: {
  isOnControlled() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-literal">on</span> !== <span class="hljs-literal">undefined</span>;
  }
}</code></pre>
<p>其内部逻辑很简单，就是判定 prop 属性 <code>on</code> 的值是否为 <code>undefined</code>，如果是，则未被父组件控制，反之，则被父组件控制。</p>
<h4>更改 on 的声明方式</h4>
<p>由于要满足目标中提及的第二点，关于 prop 属性 on 的声明，我们要做出一些调整，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="on: {
  type: Boolean,
  default: undefined
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">on</span>: {
  <span class="hljs-attribute">type</span>: Boolean,
  default: undefined
},</code></pre>
<p>就是简单地将默认值，由 <code>false</code> 改为了 <code>undefined</code>，这么做的原因是因为，按照之前的写法，如果 <code>on</code> 未由父组件传入，则默认值为 <code>false</code>，那么 <code>toggle</code> 组件会认为父组件实际传入了一个值为 <code>false</code> 的 <code>on</code> 属性，因此会将其内部的开关状态控制为<strong>关</strong>，而非降级为内部管理开关状态。</p>
<h4>实现状态解析逻辑</h4>
<p>之前的实现中，通过 scope-slot 注入插槽的状态完全取决于组件内部 <code>status</code> 的值，我们需要改变状态的注入逻辑。当组件受控时，其开关状态应该与 prop 属性保持一致，反之，则和原来一样。因此编写一个叫做 <code>controlledStatus</code> 的计算属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="controlledStatus() {
  return this.isOnControlled ? { on: this.on } : this.status;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>controlledStatus() {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.isOnControlled ? { on: <span class="hljs-keyword">this</span>.on } : <span class="hljs-keyword">this</span>.status;
}</code></pre>
<p>这里利用了之前声明的 <code>isOnControlled</code> 属性来判断当前组件是否处于受控状态。之后相应地把模板中开关状态的注入逻辑也进行更改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<slot :status=&quot;controlledStatus&quot; :toggle=&quot;toggle&quot; :reset=&quot;reset&quot;></slot>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;slot <span class="hljs-symbol">:status=<span class="hljs-string">"controlledStatus"</span></span> <span class="hljs-symbol">:toggle=<span class="hljs-string">"toggle"</span></span> <span class="hljs-symbol">:reset=<span class="hljs-string">"reset"</span>&gt;&lt;/slot&gt;</span></code></pre>
<p>相应地，除了开关状态的注入逻辑，<code>toggle</code> 方法和 <code>reset</code> 方法的注入逻辑也需要更改，至于为什么，就交由读者自行思考得出答案吧，这里简单罗列实现代码，以供参考：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// toggle 方法
toggle() {
  if (this.isOnControlled) {
    this.$emit(&quot;toggle&quot;, !this.on);
  } else {
    this.status.on = !this.status.on;
    this.$emit(&quot;toggle&quot;, this.status.on);
  }
}

// reset 方法
reset() {
  if (this.isOnControlled) {
    Promise.resolve(this.onReset(!this.on)).then(on => {
      this.$emit(&quot;reset&quot;, on);
    });
  } else {
    Promise.resolve(this.onReset(this.status.on)).then(on => {
      this.status.on = on || false;
      this.$emit(&quot;reset&quot;, this.status.on);
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// toggle 方法</span>
toggle() {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isOnControlled) {
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"toggle"</span>, !<span class="hljs-keyword">this</span>.on);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.status.on = !<span class="hljs-keyword">this</span>.status.on;
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"toggle"</span>, <span class="hljs-keyword">this</span>.status.on);
  }
}

<span class="hljs-comment">// reset 方法</span>
reset() {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isOnControlled) {
    Promise.resolve(<span class="hljs-keyword">this</span>.onReset(!<span class="hljs-keyword">this</span>.on)).then(on =&gt; {
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"reset"</span>, on);
    });
  } <span class="hljs-keyword">else</span> {
    Promise.resolve(<span class="hljs-keyword">this</span>.onReset(<span class="hljs-keyword">this</span>.status.on)).then(on =&gt; {
      <span class="hljs-keyword">this</span>.status.on = on || <span class="hljs-literal">false</span>;
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"reset"</span>, <span class="hljs-keyword">this</span>.status.on);
    });
  }
}</code></pre>
<p>总体上的思路是，如果组件受控，则传入回调方法中的开关状态参数，是在触发相应事件后，由 prop 属性 on 得出的组件在下一时刻，应当处于的状态。</p>
<p>这么说可能有点绕，换句话说就是，当组件状态发生更改时，如果当前的 on 属性为 true（开关状态为开），则组件本该处于关的状态，但由于组件受控，则它内部不能直接将开关状态更改为关，而是依旧保持为开，但是它会将 false（开关状态为关）作为参数传入触发事件，这将告知父组件，当前组件的下一个状态为关，至于父组件是否同意将其状态更改为关则有父组件决定。</p>
<p>如果组件不受控，开关状态由组件内部自行管理，那和之前的实现逻辑是一模一样的，保留之前的代码即可。</p>
<h3 id="articleHeader3">成果</h3>
<p>当 <code>toggle</code> 组件被改造后，实现这个需求就很容易了。关于实现的代码，这里就不进行罗列了，有兴趣可以通过在线代码链接进行查看，十分简单，这里仅简单附上一个最终的动态效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiLB8?w=238&amp;h=309" src="https://static.alili.tech/img/bVbiLB8?w=238&amp;h=309" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>你可以通过下面的链接来看看这个组件的实现代码以及演示：</p>
<ul>
<li>sandbox: <a href="https://codesandbox.io/s/1w04j47r37" rel="nofollow noreferrer" target="_blank">在线演示</a>
</li>
<li>github: <a href="https://github.com/haoliangwu/advanced-vue-component-patterns/tree/part-8" rel="nofollow noreferrer" target="_blank">part-8</a>
</li>
</ul>
<h2 id="articleHeader4">总结</h2>
<p>关于 Controlled Component 和 Uncontrolled Component 的概念，我第一次是在 React 中关于表单的介绍中接触到的。实际工作中，大部分对于状态可控的需求也都存在于表单组件中，之所以存在这样的需求，是因为表单系统往往是复杂的，将其实现为智能组件，往往内部状态过于复杂，而如果实现为木偶组件，代码结构或者实现逻辑又过于繁琐，这时如果可以借鉴这种模式的话，往往可以达到事半功倍的效果。</p>
<h2 id="articleHeader5">目录</h2>
<p><a href="https://gist.github.com/haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" rel="nofollow noreferrer" target="_blank">github gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="haoliangwu/11f5bcd1bf389ad80d7970ecd716ff3a" data-typeid="1">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级 Vue 组件模式 (8)

## 原文链接
[https://segmentfault.com/a/1190000016826929](https://segmentfault.com/a/1190000016826929)

