---
title: 'Vue 教程第五篇—— 修饰符' 
date: 2018-12-05 2:30:09
hidden: true
slug: pw5peu41zfl
categories: [reprint]
---

{{< raw >}}

                    
<h1>事件修饰符</h1>
<p>对事件添加一些通用的限制，比如阻止事件冒泡，Vue 对这种事件的限制提供了特定的写法，称之为修饰符<br>用法：v-on:事件.修饰符</p>
<pre><code class="html">    &lt;!--阻止事件冒泡.stop--&gt;
    &lt;div id="div1" class="stop" @click.stop="event1(1)"&gt;
    &lt;!--使用事件捕获模式.capture--&gt;
    &lt;div id="div4" class="stop" @click.capture="event1(4)"&gt;
    &lt;!--事件只作用本身.self，类似于已阻止事件冒泡--&gt;
    &lt;div id="div7" class="stop" @click.self="event1(7)"&gt;
    &lt;!--阻止浏览器默认行为.prevent--&gt;
    &lt;a href="https://github.com/dk-lan" target="_blank" @click.prevent="prevent"&gt;dk's github&lt;/a&gt;
    &lt;!--只作用一次.once--&gt;
    &lt;a href="https://github.com/dk-lan" target="_blank" @click.once="prevent"&gt;dk's github&lt;/a&gt;
    &lt;!--修饰符可以串联.click.prevent.once--&gt;
    &lt;a href="https://github.com/dk-lan" target="_blank" @click.prevent.once="prevent"&gt;dk's github&lt;/a&gt;</code></pre>
<p><a href="https://dk-lan.github.io/vue/VueBasic/Modifiers/eventModifiers.html" rel="nofollow noreferrer">事件修饰符效果预览</a></p>
<h1>按键修饰符</h1>
<pre><code class="html">&lt;div id="app"&gt;
    &lt;fieldset&gt;
        &lt;legend&gt;&lt;h3&gt;ASCII = 13 时触发&lt;/h3&gt;&lt;/legend&gt;
        &lt;p&gt;&lt;/p&gt;
        &lt;input @keyup.13="submit"&gt;  
    &lt;/fieldset&gt;
    &lt;fieldset&gt;
        &lt;legend&gt;&lt;h3&gt;按回车键时触发&lt;/h3&gt;&lt;/legend&gt;
        &lt;p&gt;&lt;/p&gt;
        &lt;input @keyup.enter="submit"&gt;
    &lt;/fieldset&gt; 
    &lt;fieldset&gt;
        &lt;legend&gt;&lt;h3&gt;自定义按键 Vue.config.keyCodes.number1 = 49&lt;/h3&gt;&lt;/legend&gt;
        &lt;input @keyup.number1="submit" /&gt;       
    &lt;/fieldset&gt; 
&lt;/div&gt;</code></pre>
<p><a href="https://dk-lan.github.io/vue/VueBasic/Modifiers/keypress.html" rel="nofollow noreferrer">按键修饰符效果预览</a></p>
<h1>表单修饰符</h1>
<pre><code class="html">        &lt;!-- 在 "change" 而不是 "input" 事件中更新 --&gt;
        &lt;input v-model.lazy="counter"&gt;  
        &lt;!-- 自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值） --&gt;
        &lt;input v-model.number="counter" type="number"&gt;          
        &lt;!-- 自动过滤用户输入的首尾空格 --&gt;
        &lt;input v-model.trim="counter"&gt;  </code></pre>
<p><a href="https://dk-lan.github.io/vue/VueBasic/Modifiers/form.html" rel="nofollow noreferrer">表单修饰符效果预览</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 教程第五篇—— 修饰符

## 原文链接
[https://segmentfault.com/a/1190000014462918](https://segmentfault.com/a/1190000014462918)

