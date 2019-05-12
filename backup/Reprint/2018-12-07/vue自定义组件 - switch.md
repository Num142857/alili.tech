---
title: 'vue自定义组件 - switch' 
date: 2018-12-07 2:30:09
hidden: true
slug: kuj3dqoei8l
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV7GSd?w=73&amp;h=91" src="https://static.alili.tech/img/bV7GSd?w=73&amp;h=91" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>项目中需要用到switch这个开关组件，但是又不想用太重量级的组件库了，加载量太大，没必要，所以自己定制了一个，借鉴了一下we-ui的样式。很简单的几行代码，大家可以自己修改样式。</p>
<p><strong>PS:有些东西光靠想可能觉得比较复杂，但真正去做了，还是不难。</strong></p>
<p>我还是习惯分2步走，首先需要在一个独立页面把组件和样式都调好，一切OK了，再封装成组件。</p>
<p>一、 第一步组件调试的效果，看这里：<a href="https://jsfiddle.net/50wL7mdz/264974/" rel="nofollow noreferrer" target="_blank"></a><button class="btn btn-xs btn-default ml10 preview" data-url="50wL7mdz/264974/" data-typeid="0">点击预览</button><a href="https://jsfiddle.net/50wL7mdz/264974/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/50wL7mdz...</a><button class="btn btn-xs btn-default ml10 preview" data-url="50wL7mdz/264974/" data-typeid="0">点击预览</button></p>
<p>二、 第二步封装成组件调用。就2个vue文件，组件vue+测试调用的vue，完整的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、组件代码（请自行放置到自己项目中对应的位置）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">1</span>、组件代码（请自行放置到自己项目中对应的位置）</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <span class=&quot;weui-switch&quot; :class=&quot;{'weui-switch-on' : me_checked}&quot; :value=&quot;value&quot; @click=&quot;toggle&quot;></span>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        me_checked: this.value
      }
    },
    watch: {
      me_checked(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      toggle() {
        this.me_checked = !this.me_checked;
      }
    }
  }
</script>

<style>
  .weui-switch {
    display: block;
    position: relative;
    width: 52px;
    height: 32px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
  }
  .weui-switch:before {
    content: &quot; &quot;;
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
    border-radius: 15px;
    background-color: #FDFDFD;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  .weui-switch:after {
    content: &quot; &quot;;
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  .weui-switch-on {
    border-color: #1AAD19;
    background-color: #1AAD19;
  }
  .weui-switch-on:before {
    border-color: #1AAD19;
    background-color: #1AAD19;
  }
  .weui-switch-on:after {
    transform: translateX(20px);
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weui-switch"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'weui-switch-on' : me_checked}"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"value"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">value</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
      }
    },
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">me_checked</span>: <span class="hljs-keyword">this</span>.value
      }
    },
    <span class="hljs-attr">watch</span>: {
      me_checked(val) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, val);
      }
    },
    <span class="hljs-attr">methods</span>: {
      toggle() {
        <span class="hljs-keyword">this</span>.me_checked = !<span class="hljs-keyword">this</span>.me_checked;
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.weui-switch</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">52px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#DFDFDF</span>;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#DFDFDF</span>;
    <span class="hljs-attribute">transition</span>: background-color <span class="hljs-number">0.1s</span>, border <span class="hljs-number">0.1s</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
  }
  <span class="hljs-selector-class">.weui-switch</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FDFDFD</span>;
    <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">0.35s</span> <span class="hljs-built_in">cubic-bezier</span>(0.45, 1, 0.4, 1);
  }
  <span class="hljs-selector-class">.weui-switch</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FFFFFF</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4);
    <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">0.35s</span> <span class="hljs-built_in">cubic-bezier</span>(0.4, 0.4, 0.25, 1.35);
  }
  <span class="hljs-selector-class">.weui-switch-on</span> {
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#1AAD19</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#1AAD19</span>;
  }
  <span class="hljs-selector-class">.weui-switch-on</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#1AAD19</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#1AAD19</span>;
  }
  <span class="hljs-selector-class">.weui-switch-on</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(20px);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2、 调用的代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">2</span>、 调用的代码</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <my_switch v-model=&quot;value1&quot;></my_switch>
    <button @click=&quot;show&quot;>查看值</button>
  </div>
</template>

<script>
  import my_switch from &quot;./my_switch&quot;; //这里引入上一个文件（目录自己定）

  export default {
    components: {
      my_switch
    },
    data() {
      return {
        value1: false //组件的初始状态
      }
    },
    methods: {
      show() {
        alert(this.value1);
      }
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my_switch</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my_switch</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show"</span>&gt;</span>查看值<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> my_switch <span class="hljs-keyword">from</span> <span class="hljs-string">"./my_switch"</span>; <span class="hljs-comment">//这里引入上一个文件（目录自己定）</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
      my_switch
    },
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">value1</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">//组件的初始状态</span>
      }
    },
    <span class="hljs-attr">methods</span>: {
      show() {
        alert(<span class="hljs-keyword">this</span>.value1);
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>希望对大家有用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue自定义组件 - switch

## 原文链接
[https://segmentfault.com/a/1190000014187619](https://segmentfault.com/a/1190000014187619)

