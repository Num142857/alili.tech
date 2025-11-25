---
title: 'sass的基本使用' 
date: 2018-12-30 2:30:10
hidden: true
slug: a6ow0v37hj
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在项目中利用到了css预处理器（sass），而之前没接触过的本博主出于好奇心，就在业余的时间里搜了一些资料来看看，看完后觉得sass挺不错，就想简单的介绍一下sass的基本使用方法（ps：本文只介绍sass的一些基本使用，而这些内容都是本博主觉得比较有趣而且比较用得上的知识点）</p>
<p><strong>- 1.sass的配置：</strong></p>
<p>sass使用范围很大，如在vue的单组件文件中可以作为样式模板调用，react中也可以使用sass，而至于在vue，react中如何配置，本文不打算详细阐述，有兴趣的读者可以自行查阅。<br>本文所有的例子都是在webstorm中编译，而webstorm可以自行编译sass，具体可以查看该链接：<br><a href="http://blog.csdn.net/xyr05288/article/details/53100245" rel="nofollow noreferrer" target="_blank">webstorm配置sass</a><br><strong>- 2.sass的概念：</strong></p>
<p>定义：sass是css的一种预处理器，文件后缀名为.scss，可以用webpack中的sass-loader来转成css样式。<br>ps：因为sass是基于ruby编写的，所以需要安装ruby后才能下载sass，才可以用；</p>
<p><strong>- 3.sass的基本使用方法：</strong></p>
<p><strong>A）基本用法：</strong></p>
<p><strong><em>- 变量</em></strong></p>
<p>语法：$变量名 ： 变量值 ;<br>   用途：在sass中，可以定义一些项目中常用的样式变量，如font-size，color，background-color等；<br>   eg：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      $a:12px;
      .box1{font-size:$a;}
      .box2{font-size:$a + 2px}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>      <span class="hljs-variable">$a</span>:<span class="hljs-number">12px</span>;
      <span class="hljs-selector-class">.box1</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-variable">$a</span>;}
      <span class="hljs-selector-class">.box2</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-variable">$a</span> + <span class="hljs-number">2px</span>}  </code></pre>
<p>ps：sass中的所定义的变量不单只利用在样式值上，还能拼接字符串，动态改变属性的名称；<br>用法：#{$变量}<br>eg：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      $a:left;
      $b:#888;
      .box1{border-#{$a}-color : $b}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>      <span class="hljs-variable">$a</span>:left;
      <span class="hljs-variable">$b</span>:<span class="hljs-number">#888</span>;
      <span class="hljs-selector-class">.box1</span>{<span class="hljs-attribute">border</span>-#{<span class="hljs-variable">$a</span>}-<span class="hljs-attribute">color</span> : <span class="hljs-variable">$b</span>}</code></pre>
<p><strong><em>- 计算功能</em></strong></p>
<p>在项目中，如果用到sass，定义变量时都会定义一些常用的值作为sass的变量，但如果在写样式时如font-size的值在常用变量中没有定义，那么可以利用sass变量的计算能力（加减乘除）</p>
<p><span class="img-wrap"><img data-src="/img/bVVG81?w=371&amp;h=135" src="https://static.alili.tech/img/bVVG81?w=371&amp;h=135" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong><em>- 嵌套</em></strong></p>
<p>定义：若几个节点存在存在亲属关系，则在sass上可以用嵌套的方式来代替原css中的后代选择器；如果在嵌套中想调用父元素，则可以用&amp;代替；</p>
<p><span class="img-wrap"><img data-src="/img/bVVG8H?w=260&amp;h=211" src="https://static.alili.tech/img/bVVG8H?w=260&amp;h=211" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong><em>- 媒体查询</em></strong></p>
<p>在sass中@media可以不用写在外层，直接嵌套在对应的选择器里面写响应式；<br>eg：</p>
<p><span class="img-wrap"><img data-src="/img/bVVHkP?w=500&amp;h=189" src="https://static.alili.tech/img/bVVHkP?w=500&amp;h=189" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>未改变之前：</p>
<p><span class="img-wrap"><img data-src="/img/bVVHk1?w=635&amp;h=297" src="https://static.alili.tech/img/bVVHk1?w=635&amp;h=297" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>改变之后：</p>
<p><span class="img-wrap"><img data-src="/img/bVVHlg?w=368&amp;h=275" src="https://static.alili.tech/img/bVVHlg?w=368&amp;h=275" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>B）复用：</strong></p>
<p><strong><em>- 继承</em></strong></p>
<p>定义：在sass中允许一个选择器继承另一个选择器的全部样式；<br>语法：   选择器 { @extend 另一个选择器 }</p>
<p>eg:</p>
<p><span class="img-wrap"><img data-src="/img/bVVHTU?w=383&amp;h=229" src="https://static.alili.tech/img/bVVHTU?w=383&amp;h=229" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong><em>- mixin</em></strong></p>
<p>定义：在sass中，可以利用@mixin来定义一个复用块，而且该复用块还能引入参数和参数的默认值。<br>语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 定义复用块  @mixin name （param1：default1 ，param2：default2，...）{   }
 引用复用块  选择器{
                    @include name (val1,val2,...)
                  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> 定义复用块  <span class="hljs-variable">@mixin</span> name （param1：default1 ，param2：default2，...）{   }
 引用复用块  选择器{
                    <span class="hljs-variable">@include</span> name (val1,val2,...)
                  }</code></pre>
<p>eg:<br>（mixin.scss文件）</p>
<p><span class="img-wrap"><img data-src="/img/bVVHW1?w=390&amp;h=120" src="https://static.alili.tech/img/bVVHW1?w=390&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>（调用文件）</p>
<p><span class="img-wrap"><img data-src="/img/bVVHW8?w=416&amp;h=133" src="https://static.alili.tech/img/bVVHW8?w=416&amp;h=133" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>插入文件</li></ul>
<p>这个知识点在css中就已经存在，就是将css模块化处理，然后利用@import来调用；上面的例子就是利用了这个知识点，一般情况下，在项目开发过程中，也推荐这种做法。</p>
<p>C）高级用法：</p>
<ul><li>条件用法</li></ul>
<p>定义：sass中可以像js一样采用条件判断语句选择性采用合适的样式块；<br>语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  @if （confident） { 样式块1 }
  @else { 样式块2 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  @<span class="hljs-keyword">if</span> （confident） { 样式块1 }
  @<span class="hljs-keyword">else</span> { 样式块2 }</code></pre>
<p>eg:</p>
<p><span class="img-wrap"><img data-src="/img/bVVH1W?w=468&amp;h=208" src="https://static.alili.tech/img/bVVH1W?w=468&amp;h=208" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>注意：如果mixin中，有些参数有默认值，有些参数没有，则没有默认值的参数要放在参数列表的前面。</p>
<ul><li>循环用法</li></ul>
<p>定义：sass中不仅仅可以用条件语句，还可以调用循环语句；sass中的循环语句有@for 和@while，用法基本一致。<br>语法： @for $i from start to end { 样式 } ，@while confident { 样式 }<br>注意：@for 是从start到end但不包含end；<br>eg：</p>
<p><span class="img-wrap"><img data-src="/img/bVVH4T?w=258&amp;h=116" src="https://static.alili.tech/img/bVVH4T?w=258&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVVH4U?w=314&amp;h=95" src="https://static.alili.tech/img/bVVH4U?w=314&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVVH43?w=281&amp;h=106" src="https://static.alili.tech/img/bVVH43?w=281&amp;h=106" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>自定义函数</li></ul>
<p>定义：在sass中还能自定义函数，但必须要有返回值，而且要在调用前定义该函数。<br>语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  @function name （） { return  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">  @<span class="hljs-keyword">function</span> <span class="hljs-title">name</span> （） { <span class="hljs-keyword">return</span>  <span class="hljs-type">}</span></code></pre>
<p>eg：</p>
<p><span class="img-wrap"><img data-src="/img/bVVIkZ?w=338&amp;h=300" src="https://static.alili.tech/img/bVVIkZ?w=338&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVVIlb?w=327&amp;h=90" src="https://static.alili.tech/img/bVVIlb?w=327&amp;h=90" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVVImy?w=327&amp;h=88" src="https://static.alili.tech/img/bVVImy?w=327&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>sass的内容远不止这些，如果看完本博客后也有兴趣继续深入学习sass，可以去看一下官方文档：<br><a href="https://www.sass.hk/docs/" rel="nofollow noreferrer" target="_blank">sass中文文档</a><br><a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank">官方文档</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
sass的基本使用

## 原文链接
[https://segmentfault.com/a/1190000011333023](https://segmentfault.com/a/1190000011333023)

