---
title: 'Vue 教程第二篇—— 模版语法' 
date: 2018-12-05 2:30:09
hidden: true
slug: 9bah04quoz
categories: [reprint]
---

{{< raw >}}

                    
<h1>模版语法</h1>
<p>模版语法已成为前端在数据驱动模式上 V 层最好的实现。</p>
<h2>插值</h2>
<pre><code class="html">&lt;div id="app"&gt;
  &lt;!-- 文本 当对 data.message 发生改变时，对应插值的内容也会自动改变--&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;文本&lt;/legend&gt;
    &lt;div&gt;"{{"message"}}"&lt;/div&gt;
  &lt;/fieldset&gt;

  &lt;!-- 纯 HTML "{{""}}" 这种形式最终会被解释成文本，如果要想输入 HTML 结构，使用要用到 v-html="对象"--&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;纯 HTML&lt;/legend&gt;
    &lt;div v-html="rawHtml"&gt;&lt;/div&gt;
  &lt;/fieldset&gt;        

  &lt;!-- 属性 元素的任意属性（包含自定义属性）都可以和对象绑定 :属性名(或者 v-bind:属性名)=“对象”--&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;属性&lt;/legend&gt;
    &lt;img :src="src" alt="" /&gt;
    &lt;img v-bind:src="'../imgs/red.jpg'" alt="" /&gt;
  &lt;/fieldset&gt;    

  &lt;!-- js 表达式 "{{""}}" 可以用来解释 js 的表达式--&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;js 表达式&lt;/legend&gt;
    &lt;div&gt;"{{"1 + 1"}}"&lt;/div&gt;
    &lt;div&gt;"{{"status ? 'YES' : 'NO'"}}"&lt;/div&gt;
    &lt;div&gt;"{{"message.split('').reverse().join('')"}}"&lt;/div&gt;
  &lt;/fieldset&gt;    
&lt;/div&gt;</code></pre>
<pre><code class="javascript">var vm = new Vue({
  el: '#app',
  data: {
    message: '我是文本',
    rawHtml: '&lt;h1&gt;我是 h1 标签&lt;/h1&gt;',
    src: '../imgs/green.jpg',
    status: true,
  }
})</code></pre>
<p><a href="https://dk-lan.github.io/vue/VueBasic/TemplateSyntax/Interpolations.html" rel="nofollow noreferrer">插值效果预览</a></p>
<h2>缩写</h2>
<h3>v-bind 缩写</h3>
<pre><code class="html">  &lt;!--完整写法--&gt;
  &lt;img v-bind:src="'../imgs/red.jpg'" alt="" /&gt;
  &lt;!--缩写--&gt;
  &lt;img :src="src" alt="" /&gt;</code></pre>
<h3>v-on 缩写</h3>
<pre><code class="html">  &lt;!--完整语法--&gt;
  &lt;button v-on:click="greet"&gt;Greet&lt;/button&gt;
  &lt;!--缩写语法--&gt;
  &lt;button @click="greet"&gt;Greet&lt;/button&gt;  </code></pre>
<h2>指令</h2>
<p>指令（Directive），换句话说就是元素的自定义属性，在 Vue 中是以 v- 为前缀的自定义属性，属性值为对象或 js 表达式</p>
<table>
<thead><tr>
<th>指令</th>
<th>类型</th>
<th>用法</th>
    </tr></thead>
<tbody>
<tr>
<td>v-text</td>
<td>string</td>
<td>&lt;!--v-text--&gt;
      
  <code>`</code> html
    &lt;span v-text="msg"&gt;&lt;/span&gt;
    &lt;!--效果等同于--&gt;
    &lt;!--v-text 的权重高于 "{{""}}"--&gt;
    &lt;span&gt;"{{"msg"}}"&lt;/span&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-html</td>
<td>string</td>
<td>&lt;!--v-html--&gt;
      
  <code>`</code> html
    &lt;div v-html="html"&gt;&lt;/div&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-show</td>
<td>boolean</td>
<td>&lt;!--v-show--&gt;
      
  <code>`</code> html
    &lt;!--show 的值会直接影响 div 在文档中是否显示--&gt;
    &lt;div v-show="show"&gt;&lt;/div&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-if</td>
<td>boolean</td>
<td>&lt;!--v-if--&gt;
      
  <code>`</code> html
    &lt;!--status 的值会直接影响 div 在文档中是否存在--&gt;
    &lt;div v-if="status"&gt;&lt;/div&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-else-if</td>
<td>boolean</td>
<td>&lt;!--v-else-if--&gt;
      
  <code>`</code> html
    &lt;div v-if="flag == 1"&gt;1&lt;/div&gt;
    &lt;!--必须跟 v-if 或者 v-else-if 元素后面--&gt;
    &lt;div v-else-if="flag == 2"&gt;2&lt;/div&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-else</td>
<td>不需要表达式</td>
<td>&lt;!--v-else--&gt;
      
  <code>`</code> html
    &lt;div v-if="flag == 1"&gt;1&lt;/div&gt;
    &lt;div v-else-if="flag == 2"&gt;2&lt;/div&gt;
    &lt;!--必须跟 v-if 或者 v-else-if 元素后面--&gt;
    &lt;div v-else&gt;2&lt;/div&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-for</td>
<td>Array | Object | Number | String</td>
<td>&lt;!--v-for--&gt;
      
  <code>`</code> html
    &lt;!--
      data = 3 
      结果会生成 3 个 div，
      value 的值分类为 1, 2, 3 
      index 的值分别为 0, 1, 2
    --&gt;
    &lt;div v-for="(value, index) in data"&gt;
      &lt;span v-text="value"&gt;&lt;/span&gt;
      &lt;span&gt;"{{"index"}}"&lt;/span&gt;
    &lt;/div&gt;
    &lt;!--也可以这样写--&gt;
    &lt;div v-for="value in data"&gt;
      &lt;span v-text="value"&gt;&lt;/span&gt;
    &lt;/div&gt;

    &lt;!--
      data = "abc" 
      结果会生成 data.length 个 div，
      value 的值分类为 a, b, c 
      index 的值分别为 0, 1, 2
    --&gt;
    &lt;div v-for="(value, index) in data"&gt;
      &lt;span v-text="value"&gt;&lt;/span&gt;
      &lt;span&gt;"{{"index"}}"&lt;/span&gt;
    &lt;/div&gt;   
    &lt;!--也可以这样写--&gt;
    &lt;div v-for="value in data"&gt;
      &lt;span v-text="value"&gt;&lt;/span&gt;
    &lt;/div&gt;

    &lt;!--
      data = {name: 'dk', age: 18} 
      结果会生成 data 属性个数 个 div，
      value 的值分类为 dk, 18 
      key 的值分别为 name, age
    --&gt;
    &lt;div v-for="(value, key) in data"&gt;
      &lt;span v-text="key"&gt;&lt;/span&gt;
      &lt;span&gt;"{{"value"}}"&lt;/span&gt;
    &lt;/div&gt;
    &lt;!--也可以这样写--&gt;
    &lt;div v-for="value in data"&gt;
      &lt;span v-text="value"&gt;&lt;/span&gt;
    &lt;/div&gt;

    &lt;!--
      data = [{name: 'dk1', age: 18}, {name: 'dk2', age: 20}] 
      结果会生成 data.length 个 div，
      obj 的值分类为 data[0], data[1] 
      index 的值分别为0, 1
    --&gt;
    &lt;div v-for="(obj, index) in data"&gt;
      &lt;span v-text="JSON.stringify(obj)"&gt;&lt;/span&gt;
      &lt;span&gt;"{{"index"}}"&lt;/span&gt;
    &lt;/div&gt;    
    &lt;!--也可以这样写--&gt;
    &lt;div v-for="obj in data"&gt;
      &lt;span v-text="JSON.stringify(obj)"&gt;&lt;/span&gt;
    &lt;/div&gt;    
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-on</td>
<td>Function</td>
<td>&lt;!--v-on--&gt;
      
  <code>`</code> html
    &lt;!--click事件直接绑定一个方法--&gt;
    &lt;button v-on:click="say1"&gt;say1&lt;/button&gt;
    &lt;!--缩写方式--&gt;
    &lt;!--click事件使用内联语句--&gt;
    &lt;button @click="say2('调用了 say2', $event)"&gt;say2&lt;/button&gt;     
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-bind</td>
<td>Object</td>
<td>&lt;!--v-bind--&gt;
      
  <code>`</code> html
    &lt;img v-bind:src="'imgs/red.jpg'" /&gt;
    &lt;!--缩写方式--&gt;
    &lt;img :src="'imgs/yellow.jpg'" /&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-model</td>
<td>表单元素的值</td>
<td>&lt;!--v-model--&gt;
      
  <code>`</code> html
    &lt;!--仅限于表单元素，双向绑定--&gt;
    &lt;input type="text" v-model="mess"/&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-pre</td>
<td>不需要表达式</td>
<td>&lt;!--v-pre--&gt;
      
  <code>`</code> html
    &lt;!--"{{""}}" 不编译，当字符串输出--&gt;
    &lt;span v-pre&gt;"{{"mess"}}"&lt;/span&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-cloak</td>
<td>不需要表达式</td>
<td>&lt;!--v-cloak--&gt;
      
  <code>`</code> html
    &lt;!--
      mess = 'abc'
      span 还没被 vue 解析的时候会显示 "{{"mess"}}"
      解析后会显示 123
      用于解决这两个转换的过程不友好的显示
      尤其是在页面加载过慢的情况很容易出现这种情况
    --&gt;
    &lt;span v-cloak&gt;"{{"mess"}}"&lt;/span&gt;
  <code>`</code>
  
   </td>
</tr>
<tr>
<td>v-once</td>
<td>不需要表达式</td>
<td>&lt;!--v-once--&gt;
      
  <code>`</code> html
    &lt;!--内容只解释一次，当改变 mess 时不会再次映射到 span--&gt;
    &lt;span v-once&gt;"{{"mess"}}"&lt;/span&gt;
  <code>`</code>
  
   </td>
</tr>
</tbody>
</table>
<p><a href="https://dk-lan.github.io/vue/VueBasic/TemplateSyntax/Directives.html" rel="nofollow noreferrer">指令效果预览</a></p>
<p><a href="https://dk-lan.github.io/vue/VueBasic/TemplateSyntax/Example.html" rel="nofollow noreferrer">综合案例预览</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 教程第二篇—— 模版语法

## 原文链接
[https://segmentfault.com/a/1190000014462682](https://segmentfault.com/a/1190000014462682)

