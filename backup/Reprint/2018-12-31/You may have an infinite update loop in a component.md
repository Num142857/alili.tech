---
title: 'You may have an infinite update loop in a component' 
date: 2018-12-31 2:30:30
hidden: true
slug: bsbgiwmjow
categories: [reprint]
---

{{< raw >}}

                    
<p>今天写着写着，突然发现控制台里有错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Vue warn]: You may have an infinite update loop in a component render function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">[Vue warn]: You may have an infinite <span class="hljs-keyword">update</span> <span class="hljs-keyword">loop</span> <span class="hljs-keyword">in</span> a component render <span class="hljs-keyword">function</span></code></pre>
<p>这个问题很奇怪，之前从来没有遇到过。如果是我自己主导的项目，倒也好办，慢慢 debug 就是；偏偏在公司的项目里遇到这个问题，而公司项目的体系结构很复杂，我还没完全掌握。更恼火的是，因为体系复杂，debug 也非常困难，再加上尚无测试框架，这个难搞啊……</p>
<p>好死不死的，当时是下午3、4点钟，正好到了肚饿的时刻，结果又落入低血糖状态，真是屋漏偏逢连阴雨，船小又碰顶头风，饿得我脑仁生疼……</p>
<p>不过终于还是被我 Google + debug 出来。事实上是这样的，在 <code>v-for</code> 循环当中，如果用方法或者计算属性对 vm.$data 的属性进行操作，理论上，可能因为修改到循环对象，诱发无限循环。此时 Vue 就会发出警告（并不是真的已经无限循环了）。</p>
<p>例如这样一个组件，它里面是用 <a href="https://segmentfault.com/l/1500000008950435"><code>:checked + &lt;label&gt;</code></a> 实现的一组按钮。它有以下功能：</p>
<ol>
<li>为了能够分组，需要设置它们的 <code>name</code> 属性</li>
<li>为了能够用 <code>&lt;label&gt;</code> 控制 <code>&lt;input&gt;</code>，需要给 <code>&lt;input&gt;</code> 设置 <code>id</code>
</li>
<li>按钮可以被删除</li>
</ol>
<p>于是我选择这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>
  <template v-for=&quot;(item, index) in items&quot;>
    <input type=&quot;checkbox&quot; :name=&quot;'my-component-' + selfIndex&quot; :id=&quot;getID&quot;>
    <label :for=&quot;getID(false)&quot;>
    <button type=&quot;button&quot; @click=&quot;remove(index)&quot;>&amp;times;</button>
  </template>
</div>
</template>

<script>
let count = 0;

export default {
  data() {
    return {
      selfIndex: 0,
      itemIndex: 0,
    }
  },
  methods: {
    getID(increase = true) { // 注意，问题就出在这里
      if (increase) {
        this.itemIndex++;
      }
      return `my-component-${this.selfIndex}-${this.itemIndex}`;
    },
  },
  beforeMount() {
    this.selfIndex = count;
    count++;
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in items"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"'my-component-' + selfIndex"</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"getID"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">:for</span>=<span class="hljs-string">"getID(false)"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"remove(index)"</span>&gt;</span>&amp;times;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">selfIndex</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">itemIndex</span>: <span class="hljs-number">0</span>,
    }
  },
  <span class="hljs-attr">methods</span>: {
    getID(increase = <span class="hljs-literal">true</span>) { <span class="hljs-comment">// 注意，问题就出在这里</span>
      <span class="hljs-keyword">if</span> (increase) {
        <span class="hljs-keyword">this</span>.itemIndex++;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-string">`my-component-<span class="hljs-subst">${<span class="hljs-keyword">this</span>.selfIndex}</span>-<span class="hljs-subst">${<span class="hljs-keyword">this</span>.itemIndex}</span>`</span>;
    },
  },
  beforeMount() {
    <span class="hljs-keyword">this</span>.selfIndex = count;
    count++;
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里，为了能生成唯一 ID，我选择每次循环都对 <code>vm.itemIndex++</code>，这就会出现前面说的问题，存在隐患。</p>
<p>解决的方案有两种，一种是把 <code>itemIndex</code> 也放在局部变量里，使它不直接关联在组件上；另一种则是写一个全局的唯一 ID 生成函数，然后引用进来。原理都是一样的。重复的部分就不写了，修改后大体如下：</p>
<h2 id="articleHeader0">方案一</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
let count = 0;
let itemCount = 0; // 把元素计数器放在这里

export default {
  methods: {
    getID(increase = true) {
      if (increase) {
        itemCount++;
      }
      return `my-component-${this.selfIndex}-${itemCount}`;
    }
  }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
<span class="hljs-keyword">let</span> itemCount = <span class="hljs-number">0</span>; <span class="hljs-comment">// 把元素计数器放在这里</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    getID(increase = <span class="hljs-literal">true</span>) {
      <span class="hljs-keyword">if</span> (increase) {
        itemCount++;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-string">`my-component-<span class="hljs-subst">${<span class="hljs-keyword">this</span>.selfIndex}</span>-<span class="hljs-subst">${itemCount}</span>`</span>;
    }
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader1">方案二</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// helper.js 生成唯一 id
let count = 0;
export default function uniqueID(increase = true) {
  if (increase) {
    count++;
  }
  return `prefix-${count}`;
}

// 原来的组件
import uniqueID from './helper';

export default {
  methods: {
    getID(increase = true) {
      let id = uniqueID(increase);
      return `my-component-${this.selfIndex}-${id}`;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// helper.js 生成唯一 id</span>
<span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uniqueID</span>(<span class="hljs-params">increase = true</span>) </span>{
  <span class="hljs-keyword">if</span> (increase) {
    count++;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-string">`prefix-<span class="hljs-subst">${count}</span>`</span>;
}

<span class="hljs-comment">// 原来的组件</span>
<span class="hljs-keyword">import</span> uniqueID <span class="hljs-keyword">from</span> <span class="hljs-string">'./helper'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    getID(increase = <span class="hljs-literal">true</span>) {
      <span class="hljs-keyword">let</span> id = uniqueID(increase);
      <span class="hljs-keyword">return</span> <span class="hljs-string">`my-component-<span class="hljs-subst">${<span class="hljs-keyword">this</span>.selfIndex}</span>-<span class="hljs-subst">${id}</span>`</span>;
    }
  }
}</code></pre>
<hr>
<h2 id="articleHeader2"><a href="https://segmentfault.com/l/1500000010971105?_ea=2544230" target="_blank">【广告】肉老师的面试题详解</a></h2>
<p>顺便做个广告，我的新讲堂已经上线，将于下周二直播。</p>
<p>这次我决定把自己积累的面试题详细地介绍给所有来听课的同学。从设置这道题的目的，考察的方向，希望听到的答案，答出多少大约是什么评价等等都来个彻底的公开。相信大家听后，可以更加明确日常学习的方向。</p>
<p>目前还在75折销售中，欢迎大家，<a href="https://segmentfault.com/l/1500000010971105?_ea=2544230">链接在此</a>。</p>
<hr>
<p>这两天听评书《乱世枭雄》，学到一句话“拉屎脸朝外”，形容讲义气，不知道咋联系的……</p>
<hr>
<p>同步于 <a href="http://blog.meathill.com/tech/js/vue/fix-vue-warn-you-may-have-an-infinite-update-loop-in-a-component-render-function.html" rel="nofollow noreferrer" target="_blank">我的博客</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
You may have an infinite update loop in a component

## 原文链接
[https://segmentfault.com/a/1190000011156865](https://segmentfault.com/a/1190000011156865)

