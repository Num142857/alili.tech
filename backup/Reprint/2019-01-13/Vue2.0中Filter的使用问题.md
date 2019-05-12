---
title: 'Vue2.0中Filter的使用问题' 
date: 2019-01-13 2:30:11
hidden: true
slug: b7x4dnzybu
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>vue2.0里，不再有自带的过滤器，需要自己定义过滤器</p></blockquote>
<p>在 Vue1.0 中内置了几种实用的过滤器函数如 <code>uppercase</code> ，但在 Vue2.0 中这些方法都被废除了需要自己定义过滤器。</p>
<h4>定义的方法：注册一个自定义过滤器，它接收两个参数：过滤器 ID 和 过滤器函数，其中过滤器函数接收多个参数。</h4>
<p>举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
Vue.filter('reverseStr', function(value) {
    return value.split('').reverse().join('')
});

//*.vue
<template>
    <div>"{{" content | reverseStr "}}"</div>
</template>

<script>
export default {
  name: 'component-name',
  data () {
    return {
      content: 'abcd'
    }
  }
}
</script>

//render result
<div>dcba</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//main.js</span>
Vue.filter(<span class="hljs-string">'reverseStr'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> value.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>)
});

<span class="hljs-comment">//*.vue</span>
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" content | reverseStr "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  name: 'component-name',
  data () {
    return {
      content: 'abcd'
    }
  }
}
&lt;/</span>script&gt;

<span class="hljs-comment">//render result</span>
&lt;div&gt;dcba&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>看到这里熟悉 Shell 管道命令的同学就会感觉很熟悉，没错 Vue 的过滤器操作符 <code>|</code> 和 Shell 命令一样，能将上一个过滤器输出内容作为下一个过滤器的输入内容，也就是说 Vue 允许你这样使用过滤器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
Vue.filter('removeNum', function (value) {
  return value.replace(/[^0-9]/g, '');
})

//*.vue
<template>
    <div>"{{" content | reverseStr | removeNum "}}"</div>
</template>

<script>
export default {
  name: 'component-name',
  data () {
    return {
      content: 'abcd1234'
    }
  }
}
</script>

//render result
<div>dcba</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//main.js</span>
Vue.filter(<span class="hljs-string">'removeNum'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">return</span> value.replace(<span class="hljs-regexp">/[^0-9]/g</span>, <span class="hljs-string">''</span>);
})

<span class="hljs-comment">//*.vue</span>
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" content | reverseStr | removeNum "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  name: 'component-name',
  data () {
    return {
      content: 'abcd1234'
    }
  }
}
&lt;/</span>script&gt;

<span class="hljs-comment">//render result</span>
&lt;div&gt;dcba&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>是不是很好很强大？！但在 Vue2.0 中使用过滤器我遇到一个这样的场景，我需要在 <code>v-html</code> 指令中使用过滤器，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//*.vue
<template>
    <div class=&quot;markdown&quot; :v-html=&quot;content | marked&quot;></div>
</template>

<script>
export default {
  name: 'component-name',
  data () {
    return {
      content: '## 标题**哈哈**'
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//*.vue</span>
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"markdown"</span> <span class="hljs-attr">:v-html</span>=<span class="hljs-string">"content | marked"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  name: 'component-name',
  data () {
    return {
      content: '## 标题**哈哈**'
    }
  }
}
&lt;/</span>script&gt;</code></pre>
<h4>这种写法在 Vue1.0 中并没有问题，但是在 Vue2.0 中抛出错误：</h4>
<blockquote><p>property or method "marked" is not defined on the instance but referenced during render. Make sure to declare reactive data properties in the data option</p></blockquote>
<p>最终查阅官方文档给出的解释是：</p>
<blockquote><p>Filters can now only be used inside text interpolations ("{{""}}" tags). In the past we've found using filters with directives such as v-model, v-on etc. led to more complexity than convenience, and for list filtering on v-for it is more appropriate to move that logic into JavaScript as computed properties.</p></blockquote>
<p>也就是说过滤器现在只能用在两个地方：<strong>mustache 插值和</strong> <code>v-bind</code> <strong>表达式</strong>。在 <code>v-model</code> 、<code>v-on</code> 、<code>v-for</code> 等指令时 Vue 还是推荐我们将该逻辑通过 <code>computed</code>  来计算属性。所以我们需要进行改写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;markdown&quot;>"{{" markedContent "}}"</div>
</template>

<script>
export default {
  name: 'component-name',
  data () {
    return {
      content: '## 标题**哈哈**'
    }
  },
  computed: {
    markedContent () {
      return marked(content)
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"markdown"</span>&gt;</span>"{{" markedContent "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  name: 'component-name',
  data () {
    return {
      content: '## 标题**哈哈**'
    }
  },
  computed: {
    markedContent () {
      return marked(content)
    }
  }
}
&lt;/</span>script&gt;</code></pre>
<p>gayHub: <a href="https://github.com/yanm1ng" rel="nofollow noreferrer" target="_blank">https://github.com/yanm1ng</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0中Filter的使用问题

## 原文链接
[https://segmentfault.com/a/1190000009610801](https://segmentfault.com/a/1190000009610801)

