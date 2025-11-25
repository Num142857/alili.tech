---
title: 'Vue.js开发常见问题解析' 
date: 2019-01-12 2:30:24
hidden: true
slug: 2h3ntyf74re
categories: [reprint]
---

{{< raw >}}

                    
<p>此前的Vue.js系列文章：</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000007839771">Vue.js常用开发知识简要入门（一）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000008048783" target="_blank">Vue.js常用开发知识简要入门（二）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000008337364">Vue.js常用开发知识简要入门（三）</a></p></li>
</ul>
<h2 id="articleHeader0">camelClass &amp; kebab-case</h2>
<p>HTML标签中的属性名不区分大小写。设置prop名字为camelClass形式的时候，需要转换为kebab-case形式（短横线）在HTML中使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('child', {
    //这里可以是camelClass形式
    props: ['myMessage'],
    template: '<span>"{{" myMessage "}}"</span>'
});
<!-- 对应在HTML中必须是短横线分隔 -->
<child my-message=&quot;hello&quot;></child>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'child'</span>, {
    <span class="hljs-comment">//这里可以是camelClass形式</span>
    props: [<span class="hljs-string">'myMessage'</span>],
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;span&gt;"{{" myMessage "}}"&lt;/span&gt;'</span>
});
<span class="xml"><span class="hljs-comment">&lt;!-- 对应在HTML中必须是短横线分隔 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">my-message</span>=<span class="hljs-string">"hello"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span></span></code></pre>
<h2 id="articleHeader1">字面量语法 &amp; 动态语法</h2>
<p>这个问题比较绕，也算是一个笔记常犯的一个错误吧，使用字面量语法传递数值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 传递了一个字符串“1” -->
<comp some-prop=&quot;1&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 传递了一个字符串“1” --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<p>因为他是一个字面prop，它的值是字符串“1”，而不是以实际的数字传递下去。如果想传递一个真实的JavaScript类型的数字，则需要使用动态语法，从而让它的值被当做JavaScript表达式计算。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 传递实际的数字 -->
<comp :some-prop=&quot;1&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 传递实际的数字 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">:some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<h2 id="articleHeader2">模板解析</h2>
<p>Vue的模板是DOM模板，使用浏览器原生的解析器而不是自己实现一个。相比字符串模板，DOM模板有一些好处，但是也有问题，它必须是有效的HTML片段。一些HTML元素对什么元素可以放在它里面有限制。常见的限制有：</p>
<ul>
<li><p>a不能包行其他的交互元素（如按钮、链接）</p></li>
<li><p>ul和ol只能直接包含li。</p></li>
<li><p>select只能包含option和optgroup。</p></li>
<li><p>table只能直接包含thead、tbody、ftoot、tr、caption、col、colgroup。</p></li>
<li><p>tr只能直接包含th和td。</p></li>
</ul>
<p>在实际应用中，这些限制会导致意外的结果。尽管再简单的情况下它可能可以工作，但是我们不能依赖自定义组件在浏览器验证之前展开结果。例如<code>&lt;my-select&gt;&lt;option&gt;....&lt;/option&gt;&lt;/my-select&gt;</code>不是有效的模板，即使<code>my-select</code>组件最终展开为<code>&lt;select&gt;...&lt;/select&gt;</code>。</p>
<p>另一个结果是，自定义标签（包括自定义元素和特殊标签，如<code>&lt;component&gt;</code>、<code>&lt;template&gt;</code>、<code>&lt;partial&gt;</code>）不能用在ul、select、table等对内部元素有限制的标签内。放在这些元素内的自定义标签将被提到元素的外面，因而渲染不正确。</p>
<p>自定义元素应当使用<code>is</code>特性，如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
    <tr is=&quot;my-component&quot;></tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"my-component"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p><code>&lt;template&gt;</code>不能用在<code>&lt;table&gt;</code>内，这时应该使用<code>&lt;tbody&gt;</code>，<code>&lt;table&gt;</code>可以有多个<code>&lt;tbody&gt;</code>。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
    <tbody v-for=&quot;item in items&quot;>
        <tr>Even row</tr>
        <tr>Odd row</tr>
    </tbody>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>Even row<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>Odd row<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<h2 id="articleHeader3">如何解决数据层级结构太深的问题</h2>
<p>在开发业务的时候，经常会出现异步获取数据的情况，有时候数据层次比较深。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span class=&quot;airport&quot; v-text=&quot;ticketInfo.flight.fromSegments[ticketInfo.flight.fromSegment - 1].depAirportZh&quot;></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"airport"</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"ticketInfo.flight.fromSegments[ticketInfo.flight.fromSegment - 1].depAirportZh"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>我们可以使用<code>vm.$set</code>手动定义一层数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$set(&quot;depAirportZh&quot; ,ticketInfo.flight.fromSegments[ticketInfo.flight.fromSegments - 1] .depAirportZh)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">vm.$set(<span class="hljs-string">"depAirportZh"</span> ,ticketInfo.flight.fromSegments[ticketInfo.flight.fromSegments - <span class="hljs-number">1</span>] .depAirportZh)</code></pre>
<h2 id="articleHeader4">data中没有定义计算属性，它是如何被使用的</h2>
<p>如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
    a = "{{" a "}}", b = "{{" b "}}"
</div>

var vm = new Vue({
    el: '#example',
    data: {
        a: 1
    },
    computed: {
        b: function() {
            return this.a + 1;
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"example"</span>&gt;
    a = "{{" a "}}", b = "{{" b "}}"
&lt;<span class="hljs-regexp">/div&gt;

var vm = new Vue({
    el: '#example',
    data: {
        a: 1
    },
    computed: {
        b: function() {
            return this.a + 1;
        }
    }
});</span></code></pre>
<p>对于上面计算属性b是怎么被使用的？实际上它并没有把计算数据放到<code>$data</code>里，而是通过<code>Object.definePropert(tihs, key, def)</code>直接定义到了实例上。</p>
<hr>
<p>《Vue.js权威指南》读书笔记</p>
<hr>
<p><strong>++++++++++<a href="http://dunizb.com/obook/" rel="nofollow noreferrer" target="_blank">本人出售本人出售《Vue.js权威指南》，二手价20元！</a>++++++++++</strong><br><a href="http://dunizb.com/obook/" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000010622900" src="https://static.alili.tech/img/remote/1460000010622900" alt="Vue.js权威指南" title="Vue.js权威指南" style="cursor: pointer;"></span></a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js开发常见问题解析

## 原文链接
[https://segmentfault.com/a/1190000009832792](https://segmentfault.com/a/1190000009832792)

