---
title: '前端知识点总结——CSS' 
date: 2018-12-13 2:30:06
hidden: true
slug: xfmfdu8ue7
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——CSS</strong></h1>
<h2 id="articleHeader1">1.CSS的概述</h2>
<p>1.什么是CSS?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CSS：Cascading Style Sheets层叠样式表，级联样式表（简称：样式表）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code style="word-break: break-word; white-space: initial;">CSS：Cascading Style <span class="hljs-built_in">Sheets</span>层叠样式表，级联样式表（简称：样式表）</code></pre>
<p>2.作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="设置HTML网页元素的样式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">设置HTML网页元素的样式</code></pre>
<p>3.HTML与CSS的关系</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTML：负责内容的展示
CSS：负责内容（元素）的修饰" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>HTML：负责内容的展示
CSS：负责内容（元素）的修饰</code></pre>
<p>4.HTML与CSS之间的使用原则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="W3C建议尽量使用CSS属性去取代HTML属性来修饰元素
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>W3C建议尽量使用CSS属性去取代HTML属性来修饰元素
</code></pre>
<h2 id="articleHeader2">2.CSS语法规范</h2>
<p>1.使用CSS样式的方式(重点)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.内联样式
   又称为行内样式
   特点：将CSS样式定义在HTML开始标记中
   语法：
     <ANY style=&quot;样式声明1；样式声明2&quot;></ANY>
 样式声明：
      1.由样式属性和值来组成
      2.属性名与值之间用 冒号 连接
      3.多个样式声明之间用 分号 分割
        常用的CSS样式属性 和 值：
      1.设置文本颜色的属性和值
        属性：color
    值：合法的颜色值（英文）
      2.设置背景颜色的属性和值
        属性：background
    值：合法的颜色值（英文）
      3.设置文字大小的属性和值
        属性：font-size
    值：以px或pt为单位的数字
    ex：font-size:30px;
     
      2.内部样式
   在网页的头元素中增加一对<style>标记，在<style>标记声明该网页用到的样式规则
   语法： <head>
             <style>
        /*注释*/

        样式规则1
        样式规则2
        ...
     </style>
      </head>
    样式规则：由选择器和样式声明组成
选择器：规范了页面中哪些元素能够使用定义好的样式（就是把声明好的样式匹配给页面中的元素）
元素选择器：由元素的名称作为选择器
div,p,h1,span,a,img
选择器{}
ex：div{}
    p{}
样式规则：
   选择器{
      样式声明；
   }
ex:
div{
   color:red;
   font-size:20px;
}
p{
  color:blue;
}
h1{...}


 3.外部样式
   独立于任何网页的位置处，声明一个样式表文件（***.css为后缀），
   在.css文件中保存样式规则，然后在网页中引入.css文件。
   使用步骤：
       1.创建样式表文件，并编写样式规则
   2.在网页中引入样式表文件
     <head>
        <link rel=&quot;stylesheet&quot; href=&quot;**.css&quot;>
     </head>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> <span class="hljs-number">1</span>.内联样式
   又称为行内样式
   特点：将CSS样式定义在HTML开始标记中
   语法：
     &lt;ANY style=<span class="hljs-string">"样式声明1；样式声明2"</span>&gt;&lt;/ANY&gt;
 样式声明：
      <span class="hljs-number">1</span>.由样式属性和值来组成
      <span class="hljs-number">2</span>.属性名与值之间用 冒号 连接
      <span class="hljs-number">3</span>.多个样式声明之间用 分号 分割
        常用的CSS样式属性 和 值：
      <span class="hljs-number">1</span>.设置文本颜色的属性和值
        属性：<span class="hljs-attribute">color</span>
    值：合法的颜色值（英文）
      <span class="hljs-number">2</span>.设置背景颜色的属性和值
        属性：<span class="hljs-attribute">background</span>
    值：合法的颜色值（英文）
      <span class="hljs-number">3</span>.设置文字大小的属性和值
        属性：<span class="hljs-attribute">font-size</span>
    值：以px或pt为单位的数字
    ex：<span class="hljs-attribute">font-size</span>:<span class="hljs-number">30px</span>;
     
      <span class="hljs-number">2</span>.内部样式
   在网页的头元素中增加一对&lt;style&gt;标记，在&lt;style&gt;标记声明该网页用到的样式规则
   语法： &lt;head&gt;
             &lt;style&gt;
        <span class="hljs-comment">/*注释*/</span>

        样式规则<span class="hljs-number">1</span>
        样式规则<span class="hljs-number">2</span>
        ...
     &lt;/style&gt;
      &lt;/head&gt;
    样式规则：由选择器和样式声明组成
选择器：规范了页面中哪些元素能够使用定义好的样式（就是把声明好的样式匹配给页面中的元素）
元素选择器：由元素的名称作为选择器
<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">span</span>,<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">img</span>
选择器{}
ex：div{}
    p{}
样式规则：
   选择器{
      样式声明；
   }
ex:
div{
   <span class="hljs-attribute">color</span>:red;
   <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
}
p{
  <span class="hljs-attribute">color</span>:blue;
}
h1{...}


 <span class="hljs-number">3</span>.外部样式
   独立于任何网页的位置处，声明一个样式表文件（***.css为后缀），
   在.css文件中保存样式规则，然后在网页中引入.css文件。
   使用步骤：
       <span class="hljs-number">1</span>.创建样式表文件，并编写样式规则
   <span class="hljs-number">2</span>.在网页中引入样式表文件
     &lt;head&gt;
        &lt;link rel=<span class="hljs-string">"stylesheet"</span> href=<span class="hljs-string">"**.css"</span>&gt;
     &lt;/head&gt;

</code></pre>
<h2 id="articleHeader3">3.CSS样式特征</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.继承性
  大部分样式可以被继承（子元素继承父元素的样式特征）
  必须是有层级关系的嵌套
  <div style=&quot;color:red;&quot;>
     <p>p</p>
  </div>
2.层叠性 
  可以为一个元素定义多个样式，当样式属性不冲突时，可以同时将这些样式应用到元素上
  div{
     color:red;
  }
  div{
     font-size:20px;
  }
  div{
     background:gray;
  }
  
3.优先级
  如果样式声明冲突时，会按照样式的优先级来应用定义的样式规则
      由低到高：
     浏览器默认设置       最低
     内部样式和外部样式   中(就近原则)
     内联样式             最高

4.调整显示的优先级
  !important规则：
  调整显示的优先级
  将!important添加在属性值之后，与值之间用空格隔开，就能优先使用当前样式
  ex:
    color:red !important;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-number">1.</span>继承性
  大部分样式可以被继承（子元素继承父元素的样式特征）
  必须是有层级关系的嵌套
  <span class="hljs-params">&lt;div style="color:red;"&gt;</span>
     <span class="hljs-params">&lt;p&gt;</span>p<span class="hljs-params">&lt;/p&gt;</span>
  <span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-number">2.</span>层叠性 
  可以为一个元素定义多个样式，当样式属性不冲突时，可以同时将这些样式应用到元素上
  div{
<span class="hljs-symbol">     color:</span>red;
  }
  div{
     font-size:<span class="hljs-number">20</span>px;
  }
  div{
<span class="hljs-symbol">     background:</span>gray;
  }
  
<span class="hljs-number">3.</span>优先级
  如果样式声明冲突时，会按照样式的优先级来应用定义的样式规则
      由低到高：
     浏览器默认设置       最低
     内部样式和外部样式   中(就近原则)
     内联样式             最高

<span class="hljs-number">4.</span>调整显示的优先级
  !important规则：
  调整显示的优先级
  将!important添加在属性值之后，与值之间用空格隔开，就能优先使用当前样式
<span class="hljs-symbol">  ex:</span>
<span class="hljs-symbol">    color:</span>red !important;

</code></pre>
<h2 id="articleHeader4">4.CSS基础选择器（重点）</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.选择器的作用
  规范页面中哪些元素能够使用定义好的样式
2.选择器详解
  1.通用选择器
    作用：可以修饰页面上的任何元素
语法：*{样式声明}
效率较低，尽量少用
ex:
  *{
    color:red;
    font-size:40px;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">1</span>.选择器的作用
  规范页面中哪些元素能够使用定义好的样式
<span class="hljs-selector-tag">2</span>.选择器详解
  <span class="hljs-selector-tag">1</span>.通用选择器
    作用：可以修饰页面上的任何元素
语法：*{样式声明}
效率较低，尽量少用
<span class="hljs-attribute">ex</span>:
  *{
    <span class="hljs-attribute">color</span>:red;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">40px</span>;
  }
</code></pre>
<p>2.元素选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    作用：设置页面上某种（类）元素的样式
语法：标记名称{声明样式}
ex：
  div{}
  p{}
  span{}  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">    作用：设置页面上某种（类）元素的样式
语法：标记名称</span><span class="hljs-template-variable">{声明样式}</span><span class="xml">
ex：
  div</span><span class="hljs-template-variable">{}</span><span class="xml">
  p</span><span class="hljs-template-variable">{}</span><span class="xml">
  span</span><span class="hljs-template-variable">{}</span><span class="xml">  
</span></code></pre>
<p>3.类选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    作用：定义页面上某个或某些元素的样式(谁想用谁就可以引用)
特点：通过元素的class属性进行引用
语法：
   1.声明
     .类名{样式声明}
     注意：
       1.类名是自定义的，但是注意类名不能以数字开头
       2.类名不能包含特殊符号（&amp;,^,%,$,#,@）
       3.可以包含（_,-）
   2.引用
     <ANY class=&quot;类名&quot;>

    特殊用法：
       1.多类选择器
     让一个元素同时引用多个类选择器
     语法：
     <ANY class=&quot;类名1 类名2 类名3 ...&quot;>

       2.分类选择器
     将元素选择器和类选择器联合使用
     对同一类元素中某些特殊的内容进行修饰
     语法：元素名称.类选择器{样式声明}
        ex:div.text{color:red;}
      <div class=&quot;text&quot;>dddd</div>
      <div>d1d1d1</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    作用：定义页面上某个或某些元素的样式(谁想用谁就可以引用)
特点：通过元素的<span class="hljs-built_in">class</span>属性进行引用
语法：
   <span class="hljs-number">1.</span>声明
     .类名{样式声明}
     注意：
       <span class="hljs-number">1.</span>类名是自定义的，但是注意类名不能以数字开头
       <span class="hljs-number">2.</span>类名不能包含特殊符号（&amp;,^,%,$,<span class="hljs-comment">#,@）</span>
       <span class="hljs-number">3.</span>可以包含（_,-）
   <span class="hljs-number">2.</span>引用
     &lt;ANY <span class="hljs-built_in">class</span>=<span class="hljs-string">"类名"</span>&gt;

    特殊用法：
       <span class="hljs-number">1.</span>多类选择器
     让一个元素同时引用多个类选择器
     语法：
     &lt;ANY <span class="hljs-built_in">class</span>=<span class="hljs-string">"类名1 类名2 类名3 ..."</span>&gt;

       <span class="hljs-number">2.</span>分类选择器
     将元素选择器和类选择器联合使用
     对同一类元素中某些特殊的内容进行修饰
     语法：元素名称.类选择器{样式声明}
        ex:<span class="hljs-keyword">div</span>.<span class="hljs-built_in">text</span>{color:red;}
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"text"</span>&gt;dddd&lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;<span class="hljs-keyword">div</span>&gt;d1d1d1&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>4.id选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：设置指定ID元素的样式（专属定制）
语法：#id值{样式声明}
ex:
  <div id=&quot;one&quot;></div>
  #one{
    color:red;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>作用：设置指定ID元素的样式（专属定制）
语法：<span class="hljs-comment">#id值{样式声明}</span>
ex:
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"one"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  <span class="hljs-comment">#one{</span>
    color:red;
  }
</code></pre>
<p>5.群组选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：将多个选择器放在一起进行样式的声明定义
语法：选择器1,选择器2,选择器3,...{样式声明}
 ex:
   div,#main,.mycolor,p.text{color:red;}
   等同于：
 div{color:red};
 #main{color:red};
 .mycolor{color:red};
 p.text{color:red};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>作用：将多个选择器放在一起进行样式的声明定义
语法：选择器<span class="hljs-number">1</span>,选择器<span class="hljs-number">2</span>,选择器<span class="hljs-number">3</span>,...{样式声明}
 ex:
   <span class="hljs-selector-tag">div</span>,<span class="hljs-selector-id">#main</span>,<span class="hljs-selector-class">.mycolor</span>,<span class="hljs-selector-tag">p</span>.text{<span class="hljs-attribute">color</span>:red;}
   等同于：
 div{<span class="hljs-attribute">color</span>:red};
 #main{<span class="hljs-attribute">color</span>:red};
 .mycolor{<span class="hljs-attribute">color</span>:red};
 <span class="hljs-selector-tag">p</span>.text{<span class="hljs-attribute">color</span>:red};</code></pre>
<p>6.后代选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：通过元素的后代关系匹配元素（多级嵌套）
语法：选择器1 选择器2 选择器3{样式声明}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>作用：通过元素的后代关系匹配元素（多级嵌套）
语法：选择器<span class="hljs-number">1</span> 选择器<span class="hljs-number">2</span> 选择器<span class="hljs-number">3</span>{样式声明}</code></pre>
<p>7.子代选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：通过元素的子代（一层层级关系）关系匹配元素
语法：选择器1>选择器2{样式声明}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>作用：通过元素的子代（一层层级关系）关系匹配元素
语法：选择器<span class="hljs-number">1</span>&gt;选择器<span class="hljs-number">2</span>{样式声明}</code></pre>
<p>8.伪类选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：匹配元素不同的状态的选择器
语法：
   所有的伪类都是以：作为开始
   选择器：伪类选择器{样式声明}
1.连接伪类
     :link 匹配元素尚未访问的状态
 :visited 匹配元素访问过的状态
2.动态伪类
     :hover 匹配鼠标悬停在元素上时的状态
 :active 匹配元素被激活时的状态（超链接，文本框，密码框点击的时候）
 :focus 匹配元素获取焦点时的状态（文本框和密码框）

3.选择器的优先级
  权值：标识当前选择器的重要程度，权值越大优先级越高。
    元素选择器：1
类选择器：  10
伪类选择器：10
ID选择择器：100
内联样式：  1000

选择器的权值加到一起，大的优先
权值相同，以后定义的为主
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>作用：匹配元素不同的状态的选择器
语法：
   所有的伪类都是以：作为开始
   选择器：伪类选择器{样式声明}
<span class="hljs-number">1</span>.连接伪类
     <span class="hljs-symbol">:link</span> 匹配元素尚未访问的状态
 <span class="hljs-symbol">:visited</span> 匹配元素访问过的状态
<span class="hljs-number">2</span>.动态伪类
     <span class="hljs-symbol">:hover</span> 匹配鼠标悬停在元素上时的状态
 <span class="hljs-symbol">:active</span> 匹配元素被激活时的状态（超链接，文本框，密码框点击的时候）
 <span class="hljs-symbol">:focus</span> 匹配元素获取焦点时的状态（文本框和密码框）

<span class="hljs-number">3</span>.选择器的优先级
  权值：标识当前选择器的重要程度，权值越大优先级越高。
    元素选择器：<span class="hljs-number">1</span>
类选择器：  <span class="hljs-number">10</span>
伪类选择器：<span class="hljs-number">10</span>
ID选择择器：<span class="hljs-number">100</span>
内联样式：  <span class="hljs-number">1000</span>

选择器的权值加到一起，大的优先
权值相同，以后定义的为主
</code></pre>
<h2 id="articleHeader5">5.尺寸与边框</h2>
<p>1.单位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.尺寸单位
  1.px：像素
    1024*768
  2.in:英寸
    1in=2.54cm
  3.pt：磅(1pt=1/72in)
    多数用于表示文字的大小
  4.cm:厘米
  5.mm:毫米
  6.em:相对于父元素乘以倍数(多个父元素2em)
  7.rem:根相对（元素字体大小乘以倍数，html\body）

2.颜色单位（颜色取值）
  1.英文单词
    red,blue,gray,green,yellow,black....
  2.rgb(r,g,b)
    r:0-255
g:0-255
b:0-255
  3.rgba(r,g,b,alpha)
    alpha:透明度，取值为0-1之间的小数，值越大，不透明度越高
  4.#rrggbb
    由6位16进制的数字\字母表示一个颜色
0-9或A-f
#000000:黑色
#ffffff:白色
#eeeeee:灰色
#ff11aa
  5.#rgb是上面的缩写形式
    #000:黑色
#fff:白色
#f1a
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.尺寸单位
  <span class="hljs-number">1</span>.px：像素
    <span class="hljs-number">1024</span>*<span class="hljs-number">768</span>
  <span class="hljs-number">2</span><span class="hljs-selector-class">.in</span>:英寸
    <span class="hljs-number">1in</span>=<span class="hljs-number">2.54cm</span>
  <span class="hljs-number">3</span>.pt：磅(<span class="hljs-number">1pt</span>=<span class="hljs-number">1</span>/<span class="hljs-number">72in</span>)
    多数用于表示文字的大小
  <span class="hljs-number">4</span><span class="hljs-selector-class">.cm</span>:厘米
  <span class="hljs-number">5</span><span class="hljs-selector-class">.mm</span>:毫米
  <span class="hljs-number">6</span><span class="hljs-selector-class">.em</span>:相对于父元素乘以倍数(多个父元素<span class="hljs-number">2em</span>)
  <span class="hljs-number">7</span><span class="hljs-selector-class">.rem</span>:根相对（元素字体大小乘以倍数，html\body）

<span class="hljs-number">2</span>.颜色单位（颜色取值）
  <span class="hljs-number">1</span>.英文单词
    red,blue,gray,green,yellow,black....
  <span class="hljs-number">2</span>.rgb(r,g,b)
    r:<span class="hljs-number">0</span>-<span class="hljs-number">255</span>
g:<span class="hljs-number">0</span>-<span class="hljs-number">255</span>
<span class="hljs-selector-tag">b</span>:<span class="hljs-number">0</span>-<span class="hljs-number">255</span>
  <span class="hljs-number">3</span>.rgba(r,g,<span class="hljs-selector-tag">b</span>,alpha)
    alpha:透明度，取值为<span class="hljs-number">0</span>-<span class="hljs-number">1</span>之间的小数，值越大，不透明度越高
  <span class="hljs-number">4</span>.<span class="hljs-selector-id">#rrggbb</span>
    由<span class="hljs-number">6</span>位<span class="hljs-number">16</span>进制的数字\字母表示一个颜色
<span class="hljs-number">0</span>-<span class="hljs-number">9</span>或A-f
<span class="hljs-number">#000000</span>:黑色
<span class="hljs-number">#ffffff</span>:白色
<span class="hljs-number">#eeeeee</span>:灰色
<span class="hljs-number">#ff11aa</span>
  <span class="hljs-number">5</span>.#rgb是上面的缩写形式
    <span class="hljs-number">#000</span>:黑色
<span class="hljs-number">#fff</span>:白色
<span class="hljs-number">#f1a</span>
</code></pre>
<p>2.尺寸属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.作用
  设置元素的宽度和高度
2.语法
  1.宽度
    width:宽度
min-width:最小宽度
max-width:最大宽度
  2.高度
    height：高度
min-height:最小高度
max-height:最大高度
3.页面中哪些元素允许设置尺寸属性
  1.所有的块级元素都允许设置尺寸
    div,p,h1,h2..h6,ul,ol,dl,结构标记
  2.本身具备width和height属性的行内元素是可以设置的
    img,table
  3.行内块允许设置尺寸
    大部分的表单控件（单选按钮，复选框）
  4.大部分的行内元素是无法设置尺寸
    a,span,b,i,u,s等
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.作用
  设置元素的宽度和高度
<span class="hljs-number">2</span>.语法
  <span class="hljs-number">1</span>.宽度
    <span class="hljs-attribute">width</span>:宽度
<span class="hljs-attribute">min-width</span>:最小宽度
<span class="hljs-attribute">max-width</span>:最大宽度
  <span class="hljs-number">2</span>.高度
    <span class="hljs-attribute">height</span>：高度
<span class="hljs-attribute">min-height</span>:最小高度
<span class="hljs-attribute">max-height</span>:最大高度
<span class="hljs-number">3</span>.页面中哪些元素允许设置尺寸属性
  <span class="hljs-number">1</span>.所有的块级元素都允许设置尺寸
    <span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>.<span class="hljs-selector-class">.h6</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">dl</span>,结构标记
  <span class="hljs-number">2</span>.本身具备<span class="hljs-attribute">width</span>和height属性的行内元素是可以设置的
    <span class="hljs-selector-tag">img</span>,<span class="hljs-selector-tag">table</span>
  <span class="hljs-number">3</span>.行内块允许设置尺寸
    大部分的表单控件（单选按钮，复选框）
  <span class="hljs-number">4</span>.大部分的行内元素是无法设置尺寸
    <span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">span</span>,<span class="hljs-selector-tag">b</span>,<span class="hljs-selector-tag">i</span>,u,s等
</code></pre>
<p>3.溢出处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当内容多，元素区域小的时候，就会产生溢出的效果，默认都是纵向溢出。
属性：overflow,overflow-x,overflow-y
取值：
   1.visible
     可见的，默认值，溢出可见
   2.hidden
     隐藏的，溢出的内容全部隐藏，溢出内容不可见
   3.scroll
     显示滚动条，溢出时，可用
   4.auto
     自动，溢出时才显示滚动条并可用

   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>当内容多，元素区域小的时候，就会产生溢出的效果，默认都是纵向溢出。
属性：<span class="hljs-attribute">overflow</span>,overflow-x,overflow-y
取值：
   <span class="hljs-number">1</span><span class="hljs-selector-class">.visible</span>
     可见的，默认值，溢出可见
   <span class="hljs-number">2</span><span class="hljs-selector-class">.hidden</span>
     隐藏的，溢出的内容全部隐藏，溢出内容不可见
   <span class="hljs-number">3</span><span class="hljs-selector-class">.scroll</span>
     显示滚动条，溢出时，可用
   <span class="hljs-number">4</span><span class="hljs-selector-class">.auto</span>
     自动，溢出时才显示滚动条并可用

   </code></pre>
<p>4.边框</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.边框属性
  1.简写方式
    border:width style color;
     width:边框的宽度，以px为单位的数值
     style:边框的样式
       取值：
         solid:实线
     dotted:虚线边框(点)
     dashed:虚线边框(线)
     color:边框的颜色
         取值：合法的颜色值
     transparent:透明色
     注意：
       取消边框：border:0;或border:none;
       


  2.单边定义
    只设置某一条边的边框
属性：border-方向:width style color;
    方向：top/bottom/left/right
       上   下     左   右

  
  3.单属性定义
    只设置四条边框的一个属性
属性：border-width/style/color:值；
  ex:border-width:3px;
     border-style:dotted;
     border-color:red;

  4.单边单属性的定义
    只设置某一个方向的某一个属性
属性：
  border-方向-属性：值；
  方向：top/bottom/left/right
  属性：width/style/color
  ex：
    border-left-color:blue;
    border-right-style:solid;
    border-bottom-width:6px;
2.边框倒角
  将元素的直角倒换成圆角
  属性：border-radius
  取值：
        1.以px为单位的数值
        2.百分比 %  设置圆形（50%）

  单角设置：
     border-top-left-radius:左上角
 border-top-right-radius:右上角
 border-bottom-left-radius:左下角
 border-bottom-right-radius:右下角
3.边框阴影
 属性：box-shadow
 取值：h-shadow v-shadow blur spread color inset
    h-shadow:阴影在水平方向的偏移距离，必须值   
     取值为正：阴影向右偏移
     取值为负：阴影向左偏移
v-shadow:阴影在垂直方向的偏移距离，必须值   
     取值为正：阴影向下偏移
     取值为负：阴影向上偏移
blur:阴影模糊距离，取值越大，模糊效果越明显，以px为单位的数值（可选值）
spread:阴影的大小，指定要在基础阴影上扩充出来的大小，取值以px为单位的数值（可选值）
color:阴影颜色（可选值）
inset:将默认的外阴影改为内阴影（可选值）

 
4.轮廓
  轮廓指的是边框的边框，绘制于边框外围的一条线
  属性：
     outline:width style color;
 widht:轮廓的宽度
 style:轮廓的样式  
    取值：solid/dotted/dashed
 color:轮廓的颜色

  取消轮廓：
       outline:none/0;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-number">1</span>.边框属性
  <span class="hljs-number">1</span>.简写方式
    <span class="hljs-built_in">border</span>:<span class="hljs-built_in">width</span> <span class="hljs-built_in">style</span> <span class="hljs-built_in">color</span>;
     <span class="hljs-built_in">width</span>:边框的宽度，以px为单位的数值
     <span class="hljs-built_in">style</span>:边框的样式
       取值：
         solid:实线
     dotted:虚线边框(点)
     dashed:虚线边框(线)
     <span class="hljs-built_in">color</span>:边框的颜色
         取值：合法的颜色值
     <span class="hljs-built_in">transparent</span>:透明色
     注意：
       取消边框：<span class="hljs-built_in">border</span>:<span class="hljs-number">0</span>;或<span class="hljs-built_in">border</span>:none;
       


  <span class="hljs-number">2</span>.单边定义
    只设置某一条边的边框
属性：<span class="hljs-built_in">border</span>-方向:<span class="hljs-built_in">width</span> <span class="hljs-built_in">style</span> <span class="hljs-built_in">color</span>;
    方向：top/bottom/left/right
       上   下     左   右

  
  <span class="hljs-number">3</span>.单属性定义
    只设置四条边框的一个属性
属性：<span class="hljs-built_in">border</span>-<span class="hljs-built_in">width</span>/<span class="hljs-built_in">style</span>/<span class="hljs-built_in">color</span>:值；
  ex:<span class="hljs-built_in">border</span>-<span class="hljs-built_in">width</span>:3px;
     <span class="hljs-built_in">border</span>-<span class="hljs-built_in">style</span>:dotted;
     <span class="hljs-built_in">border</span>-<span class="hljs-built_in">color</span>:red;

  <span class="hljs-number">4</span>.单边单属性的定义
    只设置某一个方向的某一个属性
属性：
  <span class="hljs-built_in">border</span>-方向-属性：值；
  方向：top/bottom/left/right
  属性：<span class="hljs-built_in">width</span>/<span class="hljs-built_in">style</span>/<span class="hljs-built_in">color</span>
  ex：
    <span class="hljs-built_in">border</span>-left-<span class="hljs-built_in">color</span>:blue;
    <span class="hljs-built_in">border</span>-right-<span class="hljs-built_in">style</span>:solid;
    <span class="hljs-built_in">border</span>-bottom-<span class="hljs-built_in">width</span>:6px;
<span class="hljs-number">2</span>.边框倒角
  将元素的直角倒换成圆角
  属性：<span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>
  取值：
        <span class="hljs-number">1</span>.以px为单位的数值
        <span class="hljs-number">2</span>.百分比 <span class="hljs-symbol">%</span>  设置圆形（<span class="hljs-number">50</span><span class="hljs-symbol">%</span>）

  单角设置：
     <span class="hljs-built_in">border</span>-top-left-<span class="hljs-built_in">radius</span>:左上角
 <span class="hljs-built_in">border</span>-top-right-<span class="hljs-built_in">radius</span>:右上角
 <span class="hljs-built_in">border</span>-bottom-left-<span class="hljs-built_in">radius</span>:左下角
 <span class="hljs-built_in">border</span>-bottom-right-<span class="hljs-built_in">radius</span>:右下角
<span class="hljs-number">3</span>.边框阴影
 属性：<span class="hljs-built_in">box</span>-shadow
 取值：h-shadow v-shadow blur spread <span class="hljs-built_in">color</span> inset
    h-shadow:阴影在水平方向的偏移距离，必须值   
     取值为正：阴影向右偏移
     取值为负：阴影向左偏移
v-shadow:阴影在垂直方向的偏移距离，必须值   
     取值为正：阴影向下偏移
     取值为负：阴影向上偏移
blur:阴影模糊距离，取值越大，模糊效果越明显，以px为单位的数值（可选值）
spread:阴影的大小，指定要在基础阴影上扩充出来的大小，取值以px为单位的数值（可选值）
<span class="hljs-built_in">color</span>:阴影颜色（可选值）
inset:将默认的外阴影改为内阴影（可选值）

 
<span class="hljs-number">4</span>.轮廓
  轮廓指的是边框的边框，绘制于边框外围的一条线
  属性：
     outline:<span class="hljs-built_in">width</span> <span class="hljs-built_in">style</span> <span class="hljs-built_in">color</span>;
 widht:轮廓的宽度
 <span class="hljs-built_in">style</span>:轮廓的样式  
    取值：solid/dotted/dashed
 <span class="hljs-built_in">color</span>:轮廓的颜色

  取消轮廓：
       outline:none/<span class="hljs-number">0</span>;
</code></pre>
<h2 id="articleHeader6">6.框模型</h2>
<p>1.什么是框模型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="框模型：box model,定义了元素框处理元素的内容，内边距，外边距以及边框的一种计算方式。
外边距：元素与元素之间的空白间距
内边距：元素边框与元素内容之间的间距
框模型的计算模式：
    元素的实际占地宽度=左右外边距+左右边框+左右内边距+width;
元素的实际占地高度=上下外边距+上下边框+上下的内边距+height
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>框模型：<span class="hljs-built_in">box</span> model,定义了元素框处理元素的内容，内边距，外边距以及边框的一种计算方式。
外边距：元素与元素之间的空白间距
内边距：元素边框与元素内容之间的间距
框模型的计算模式：
    元素的实际占地宽度=左右外边距+左右边框+左右内边距+<span class="hljs-built_in">width</span>;
元素的实际占地高度=上下外边距+上下边框+上下的内边距+<span class="hljs-built_in">height</span>
</code></pre>
<h2 id="articleHeader7">7.外边距</h2>
<p>1.什么是外边距</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="围绕在元素边框外的空白距离，就是外边距
也能表示当前元素与其他元素之间的空白距离" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>围绕在元素边框外的空白距离，就是外边距
也能表示当前元素与其他元素之间的空白距离</code></pre>
<p>2.语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：
   margin 定义某个元素四个方向的外边距
   margin-top/bottom/left/right 定义单边的外边距
取值：
   1.具体数值，以px为单位
   2.取值为负
     让元素向相反的方向移动
 margin-left:
  取值为正，让元素向右移动
  取值为负，让元素向左移动
 margin-top:
  取值为正，让元素向下移动
  取值为负，让元素向上移动
   3.取值为%
     外边距的值，是父元素的宽或高的占比（50%）
   4.取值为auto
     自动计算外边距的值（控制块级元素水平居中对齐）
 
简写方式：
    1.margin:value
  四个方向的外边距
2.margin:v1 v2;
  v1:上下外边距
  v2:左右外边距
3.margin:v1 v2 v3;
  v1:上外边距
  v2:左右外边距
  v3:下外边距
3.margin:v1 v2 v3 v4;
         上 右 下 左  （顺时针方向）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>属性：
   <span class="hljs-keyword">margin </span>定义某个元素四个方向的外边距
   <span class="hljs-keyword">margin-top/bottom/left/right </span>定义单边的外边距
取值：
   <span class="hljs-number">1</span>.具体数值，以px为单位
   <span class="hljs-number">2</span>.取值为负
     让元素向相反的方向移动
 <span class="hljs-keyword">margin-left:
</span>  取值为正，让元素向右移动
  取值为负，让元素向左移动
 <span class="hljs-keyword">margin-top:
</span>  取值为正，让元素向下移动
  取值为负，让元素向上移动
   <span class="hljs-number">3</span>.取值为%
     外边距的值，是父元素的宽或高的占比（<span class="hljs-number">50</span>%）
   <span class="hljs-number">4</span>.取值为auto
     自动计算外边距的值（控制块级元素水平居中对齐）
 
简写方式：
    <span class="hljs-number">1</span>.<span class="hljs-keyword">margin:value
</span>  四个方向的外边距
<span class="hljs-number">2</span>.<span class="hljs-keyword">margin:v1 </span><span class="hljs-built_in">v2</span><span class="hljs-comment">;</span>
<span class="hljs-symbol">  v1:</span>上下外边距
<span class="hljs-symbol">  v2:</span>左右外边距
<span class="hljs-number">3</span>.<span class="hljs-keyword">margin:v1 </span><span class="hljs-built_in">v2</span> <span class="hljs-built_in">v3</span><span class="hljs-comment">;</span>
<span class="hljs-symbol">  v1:</span>上外边距
<span class="hljs-symbol">  v2:</span>左右外边距
<span class="hljs-symbol">  v3:</span>下外边距
<span class="hljs-number">3</span>.<span class="hljs-keyword">margin:v1 </span><span class="hljs-built_in">v2</span> <span class="hljs-built_in">v3</span> <span class="hljs-built_in">v4</span><span class="hljs-comment">;</span>
         上 右 下 左  （顺时针方向）</code></pre>
<p>3.自带外边距的元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body,h1~h6,p,ul,ol,dl,dd,pre
通过CSS Reset(css重写)的手段，来重置具备外边距的元素
 body,h1,h2,h3,h4,h5,h6,ul,ol,dl,dd,pre{
    margin:0;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">body</span>,h1~<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dd</span>,pre
通过CSS Reset(css重写)的手段，来重置具备外边距的元素
 <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dd</span>,pre{
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
 }</code></pre>
<p>4.外边距的特殊效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.外边距合并
  当两个垂直外边距相遇时，他们将合并为一个，最终取决于两个外边距中距离较大的那个。
  如果两个外边距相遇时值相等，那么取其中一个值。
2.外边距的溢出
  在某些条件下，为子元素设置上外边距时，有可能会作用到父元素上。
      1.父元素没有上边框
  2.为子元素设置上外边距时
  
2.在d2中嵌套一个子元素div,id=&quot;d3&quot;,设置其尺寸为100*100，并设置其背景颜色
3.设置d3的上外边距为50px,观察其结果。
 解决溢出方案：
    1.为父元素增加上边框
  弊端：对父元素的高度有影响
2.使用父元素的上内边距来取代子元素的上外边距
  弊端：对父元素的高度有影响
3.在父元素的第一个子元素位置处，增加一个空(table)
 行内元素以及行内块元素的垂直外边距
     1.行内元素垂直外边距无效（img除外）
 2.行内块元素，设置垂直外边距时，整行元素都跟着发生改变
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>外边距合并
  当两个垂直外边距相遇时，他们将合并为一个，最终取决于两个外边距中距离较大的那个。
  如果两个外边距相遇时值相等，那么取其中一个值。
<span class="hljs-number">2.</span>外边距的溢出
  在某些条件下，为子元素设置上外边距时，有可能会作用到父元素上。
      <span class="hljs-number">1.</span>父元素没有上边框
  <span class="hljs-number">2.</span>为子元素设置上外边距时
  
<span class="hljs-number">2.</span>在d2中嵌套一个子元素div,id=<span class="hljs-string">"d3"</span>,设置其尺寸为<span class="hljs-number">100</span>*<span class="hljs-number">100</span>，并设置其背景颜色
<span class="hljs-number">3.</span>设置d3的上外边距为<span class="hljs-number">50</span>px,观察其结果。
 解决溢出方案：
    <span class="hljs-number">1.</span>为父元素增加上边框
  弊端：对父元素的高度有影响
<span class="hljs-number">2.</span>使用父元素的上内边距来取代子元素的上外边距
  弊端：对父元素的高度有影响
<span class="hljs-number">3.</span>在父元素的第一个子元素位置处，增加一个空(table)
 行内元素以及行内块元素的垂直外边距
     <span class="hljs-number">1.</span>行内元素垂直外边距无效（img除外）
 <span class="hljs-number">2.</span>行内块元素，设置垂直外边距时，整行元素都跟着发生改变
</code></pre>
<h2 id="articleHeader8">8.内边距</h2>
<p>1.什么是内边距</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="元素边框与内容之间的空白距离
内边距会扩大元素边框占地区域" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>元素边框与内容之间的空白距离
内边距会扩大元素边框占地区域</code></pre>
<p>2.语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：
   padding 四个方向的内边距
   padding-top/bottom/left/right 设置单边内边距
取值：
      以px为单位的数值
      以%形式设置
简写方式：
      1.padding:value;  四个方向的内边距
  2.padding:v1 v2; 
    v1:上下内边距
    v2:左右内边距
  3.padding:v1 v2 v3;
    v1:上
    v2:左右
    v3:下
  4.padding:v1 v2 v3 v4;
            上 右 下 左 （顺时针）

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>属性：
   padding 四个方向的内边距
   padding-top/bottom/left/right 设置单边内边距
取值：
      以px为单位的数值
      以%形式设置
简写方式：
      1.padding:value;  四个方向的内边距
  2.padding:v1 v2; 
    v1:上下内边距
    v2:左右内边距
  3.padding:v1 v2 v3;
    v1:上
    v2:左右
    v3:下
  4.padding:v1 v2 v3 v4;
            上 右 下 左 （顺时针）

</code></pre>
<h2 id="articleHeader9">9.属性：box-sizing</h2>
<p>作用：指定框模型的计算方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="取值：
   1.content-box
     默认值，采用默认的计算元素的占地区域
 实际占地宽度=左右边框+左右外边距+左右内边距+width;
 实际占地高度=上下边框+上下外边距+上下内边距+height;
   2.border-box
     元素的尺寸，会包含border以及padding的值
 实际占地宽度=width(包含了border和padding)
 实际占地高度=height(包含了border和padding)
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>取值：
   <span class="hljs-number">1.</span><span class="hljs-built_in">content</span>-<span class="hljs-built_in">box</span>
     默认值，采用默认的计算元素的占地区域
 实际占地宽度=左右边框+左右外边距+左右内边距+<span class="hljs-built_in">width</span>;
 实际占地高度=上下边框+上下外边距+上下内边距+<span class="hljs-built_in">height</span>;
   <span class="hljs-number">2.</span><span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span>
     元素的尺寸，会包含<span class="hljs-built_in">border</span>以及padding的值
 实际占地宽度=<span class="hljs-built_in">width</span>(包含了<span class="hljs-built_in">border</span>和padding)
 实际占地高度=<span class="hljs-built_in">height</span>(包含了<span class="hljs-built_in">border</span>和padding)
 </code></pre>
<p>3.背景属性<br>  背景：可以是单一颜色或图片填充元素<br>  1.背景色</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：background-color
取值：合法的颜色值
注意：背景颜色默认是从边框的位置处开始填充的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>属性：<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>
取值：合法的颜色值
注意：背景颜色默认是从边框的位置处开始填充的</code></pre>
<p>2.背景图片</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：background-image
取值：url(图片的路径);
ex:background-image:url(a.jpg);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>属性：<span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>
取值：url(图片的路径);
ex:<span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>:url(a.jpg);</code></pre>
<p>3.背景图片平铺</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：background-repeat
取值：
   repeat 默认值，横向纵向都平铺
   no-repeat 不平铺（图片只显示一次）
   repeat-x 只在水平方向平铺
   repeat-y 只在垂直方向平铺" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>属性：background-<span class="hljs-keyword">repeat</span>
取值：
   <span class="hljs-keyword">repeat</span> 默认值，横向纵向都平铺
   <span class="hljs-keyword">no</span>-<span class="hljs-keyword">repeat</span> 不平铺（图片只显示一次）
   <span class="hljs-keyword">repeat</span>-x 只在水平方向平铺
   <span class="hljs-keyword">repeat</span>-y 只在垂直方向平铺</code></pre>
<p>4.背景图片尺寸</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：background-size
取值：
   1.width/height  (ex:200px 300px)
   2.width%/height%  (ex:50% 50% 是元素自己的高宽占比)
   3.cover
     将背景图等比放大，直到背景图完全覆盖到元素的所有区域为止。
   4.contain
     将背景图等比放大，直到背景图碰到元素的某一个边缘为止" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>属性：<span class="hljs-attribute">background-size</span>
取值：
   <span class="hljs-number">1</span>.<span class="hljs-attribute">width</span>/height  (ex:<span class="hljs-number">200px</span> <span class="hljs-number">300px</span>)
   <span class="hljs-number">2</span>.<span class="hljs-attribute">width</span>%/height%  (ex:<span class="hljs-number">50%</span> <span class="hljs-number">50%</span> 是元素自己的高宽占比)
   <span class="hljs-number">3</span><span class="hljs-selector-class">.cover</span>
     将背景图等比放大，直到背景图完全覆盖到元素的所有区域为止。
   <span class="hljs-number">4</span><span class="hljs-selector-class">.contain</span>
     将背景图等比放大，直到背景图碰到元素的某一个边缘为止</code></pre>
<p>5.背景图片固定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：将背景图固定在网页的某个位置处，一直在可视区域中，不会随着滚动条而发生位置的变化。
属性：background-attachment
取值：
   1.scroll 默认值，滚动
   2.fixed 固定
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>作用：将背景图固定在网页的某个位置处，一直在可视区域中，不会随着滚动条而发生位置的变化。
属性：<span class="hljs-attribute">background-attachment</span>
取值：
   <span class="hljs-number">1</span><span class="hljs-selector-class">.scroll</span> 默认值，滚动
   <span class="hljs-number">2</span><span class="hljs-selector-class">.fixed</span> 固定
</code></pre>
<p>6.背景图片定位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：改变背景图在元素中的位置
属性：background-position
取值：
   1.x y  具体的数值（px）
     x:
   背景图水平偏移距离
   取值为正，向右移动
   取值为负，向左移动
 y:
   背景图垂直偏移距离
   取值为正，向下移动
   取值为负，向上移动
   2.x% y%
     0% 0% 背景图在左上角
 100% 100% 背景图在右下角
 50% 50% 背景图在中间位置
   3.关键字
 x:left/center/right
 y:top/center/bottom
 ex:background-position:right top;
 
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>作用：改变背景图在元素中的位置
属性：background-position
取值：
   <span class="hljs-number">1.</span>x y  具体的数值（px）
<span class="hljs-symbol">     x:</span>
   背景图水平偏移距离
   取值为正，向右移动
   取值为负，向左移动
<span class="hljs-symbol"> y:</span>
   背景图垂直偏移距离
   取值为正，向下移动
   取值为负，向上移动
   <span class="hljs-number">2.</span>x% y%
     <span class="hljs-number">0</span>% <span class="hljs-number">0</span>% 背景图在左上角
 <span class="hljs-number">100</span>% <span class="hljs-number">100</span>% 背景图在右下角
 <span class="hljs-number">50</span>% <span class="hljs-number">50</span>% 背景图在中间位置
   <span class="hljs-number">3.</span>关键字
<span class="hljs-symbol"> x:</span>left<span class="hljs-meta-keyword">/center/</span>right
<span class="hljs-symbol"> y:</span>top<span class="hljs-meta-keyword">/center/</span>bottom
<span class="hljs-symbol"> ex:</span>background-position:right top;
 
  </code></pre>
<p>7.背景简写属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在一个属性中指定背景的多个属性值
属性：background
取值：color url() repeat attachment position
ex：
  background:gray url(a.jpg);
注意：
  如果不设置其中某个属性值的话，该位置采用默认值。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>在一个属性中指定背景的多个属性值
属性：<span class="hljs-attribute">background</span>
取值：<span class="hljs-attribute">color</span> url() repeat attachment <span class="hljs-attribute">position</span>
ex：
  <span class="hljs-attribute">background</span>:gray url(a.jpg);
注意：
  如果不设置其中某个属性值的话，该位置采用默认值。
</code></pre>
<h2 id="articleHeader10">8.渐变</h2>
<p>1.什么是渐变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="渐变指定是多种颜色平缓变换的一种显示效果。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">渐变指定是多种颜色平缓变换的一种显示效果。</code></pre>
<p>2.渐变的主要因素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.色标：一种颜色及其出现的位置
2.一个渐变是由多个色标组成（至少两个）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>色标：一种颜色及其出现的位置
<span class="hljs-number">2.</span>一个渐变是由多个色标组成（至少两个）</code></pre>
<p>3.渐变分类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.线性渐变
  以直线的方向来填充效果
2.径向渐变
  以圆形的方式来实现填充
3.重复渐变
  将线性渐变或径向渐变 重复几次实现填充" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>线性渐变
  以直线的方向来填充效果
<span class="hljs-number">2.</span>径向渐变
  以圆形的方式来实现填充
<span class="hljs-number">3.</span>重复渐变
  将线性渐变或径向渐变 重复几次实现填充</code></pre>
<p>4.渐变详解</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.线性渐变
  属性：background-image
  取值：linear-gradient(angle,color-point1,color-point2,....);
    1.angle
  表示渐变填充的方向或角度
  取值：
    1.关键字
      to top 从下向上填充渐变色
      to bottom 从上向下填充渐变色
      to left 从右向左填充渐变色
      to right 从左向右填充渐变色
    2.角度值
     0deg 从下向上填充，等同于to top
     90deg 从左向右填充，等同于to right
     180deg 从上到下填充，等同于to bottom
     270deg 从右向左填充，等同于to left
    2.color-point
  色标：颜色 及其 位置
  取值：颜色 以及 位置的组合，中间用空格分开
  ex:
    1.red 0%
      在填充方向的开始位置处颜色为红色
    2.green 50%
      到填充方向一半的位置处，颜色变为绿色
    3.blue 200px
      到填充方向的200px的位置处，颜色变为蓝色
2.径向渐变
  属性：
  background-image:radial-gradient([size at position],
  color-point1,color-point2,...);
  size at position: 
      size:半径，以px为单位的数值
  position:圆心所在位置
       1.x y 具体数值
       2.x% y% 元素宽和高的占比
       3.关键字
         x:left,center,right
     y:top,center,bottom
  ex：
    100px at right top 
半径     右上角位置
3.重复渐变
  1.重复线性渐变
    background-image:repeating-linear-gradient
    (angle,color-point1,color-point2,...);
color-point:位置一定要给绝对数值（px）,不要用相对单位%
  2.重复径向渐变
    background-image:repeating-radial-gradient
    ([size at position],color-point1,color-point2,...);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-number">1</span>.线性渐变
  属性：<span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>
  取值：<span class="hljs-built_in">linear</span>-gradient(angle,<span class="hljs-built_in">color</span>-point1,<span class="hljs-built_in">color</span>-point2,....);
    <span class="hljs-number">1.</span>angle
  表示渐变填充的方向或角度
  取值：
    <span class="hljs-number">1</span>.关键字
      to top 从下向上填充渐变色
      to bottom 从上向下填充渐变色
      to left 从右向左填充渐变色
      to right 从左向右填充渐变色
    <span class="hljs-number">2</span>.角度值
     <span class="hljs-number">0deg</span> 从下向上填充，等同于to top
     90deg 从左向右填充，等同于to right
     180deg 从上到下填充，等同于to bottom
     270deg 从右向左填充，等同于to left
    <span class="hljs-number">2.</span><span class="hljs-built_in">color</span>-point
  色标：颜色 及其 位置
  取值：颜色 以及 位置的组合，中间用空格分开
  ex:
    <span class="hljs-number">1.</span>red <span class="hljs-number">0</span><span class="hljs-symbol">%</span>
      在填充方向的开始位置处颜色为红色
    <span class="hljs-number">2.</span>green <span class="hljs-number">50</span><span class="hljs-symbol">%</span>
      到填充方向一半的位置处，颜色变为绿色
    <span class="hljs-number">3.</span>blue 200px
      到填充方向的200px的位置处，颜色变为蓝色
<span class="hljs-number">2</span>.径向渐变
  属性：
  <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>:radial-gradient([size <span class="hljs-built_in">at</span> <span class="hljs-built_in">position</span>],
  <span class="hljs-built_in">color</span>-point1,<span class="hljs-built_in">color</span>-point2,...);
  size <span class="hljs-built_in">at</span> <span class="hljs-built_in">position</span>: 
      size:半径，以px为单位的数值
  <span class="hljs-built_in">position</span>:圆心所在位置
       <span class="hljs-number">1.</span>x y 具体数值
       <span class="hljs-number">2.</span>x% y% 元素宽和高的占比
       <span class="hljs-number">3</span>.关键字
         x:left,<span class="hljs-built_in">center</span>,right
     y:top,<span class="hljs-built_in">center</span>,bottom
  ex：
    100px <span class="hljs-built_in">at</span> right top 
半径     右上角位置
<span class="hljs-number">3</span>.重复渐变
  <span class="hljs-number">1</span>.重复线性渐变
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>:repeating-<span class="hljs-built_in">linear</span>-gradient
    (angle,<span class="hljs-built_in">color</span>-point1,<span class="hljs-built_in">color</span>-point2,...);
<span class="hljs-built_in">color</span>-point:位置一定要给绝对数值（px）,不要用相对单位<span class="hljs-symbol">%</span>
  <span class="hljs-number">2</span>.重复径向渐变
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>:repeating-radial-gradient
    ([size <span class="hljs-built_in">at</span> <span class="hljs-built_in">position</span>],<span class="hljs-built_in">color</span>-point1,<span class="hljs-built_in">color</span>-point2,...);

</code></pre>
<h2 id="articleHeader11">9.浏览器兼容性</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 各个浏览器的新版本都支持渐变属性
对于不支持的浏览器版本，可以通过增加浏览器前缀的方式，让浏览器支持渐变属性
Firefox:-moz-
Chrome &amp; Sagari:-webkit-
Opera:-o-
IE:-ms-
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> 各个浏览器的新版本都支持渐变属性
对于不支持的浏览器版本，可以通过增加浏览器前缀的方式，让浏览器支持渐变属性
<span class="hljs-selector-tag">Firefox</span><span class="hljs-selector-pseudo">:-moz-</span>
<span class="hljs-selector-tag">Chrome</span> &amp; <span class="hljs-selector-tag">Sagari</span><span class="hljs-selector-pseudo">:-webkit-</span>
<span class="hljs-selector-tag">Opera</span><span class="hljs-selector-pseudo">:-o-</span>
<span class="hljs-selector-tag">IE</span><span class="hljs-selector-pseudo">:-ms-</span>
</code></pre>
<p>2.文本格式化属性<br>  1.字体属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.指定字体
  属性：font-family
  取值：字体名称，名称之间用逗号隔开
  ex：
  font-family:&quot;微软雅黑&quot;,Arial,&quot;黑体&quot;;
2.字体大小
  属性：font-size
  取值：以px或pt为单位的数字
3.字体加粗
  属性：font-weight
  取值：
     1.bold 加粗（b,hn）
 2.normal 正常
 3.value 无单位的数字（整百倍）
   400-900
   400：等同于normal
   900：等同于bold
4.字体样式
  属性：font-style
  取值：
     1.normal 正常显示 
 2.italic 斜体显示
5.小型大写字母
   将小写字符变成大写，但文本的大小与小写字符一致
   属性：font-variant
   取值：
      1.normal 正常
  2.small-caps 小型的大写字符
6.字体属性简写
  属性：font
  取值：style variant weight size family;
  注意：
    如果用简写方式，必须设置family的值，否则无效。
font:12px; 错误
font:12px &quot;黑体&quot;; 正确

 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>1.指定字体
  属性：<span class="hljs-attribute">font-family</span>
  取值：字体名称，名称之间用逗号隔开
  ex：
  <span class="hljs-attribute">font-family</span>:<span class="hljs-string">"微软雅黑"</span>,Arial,<span class="hljs-string">"黑体"</span>;
2.字体大小
  属性：<span class="hljs-attribute">font-size</span>
  取值：以px或pt为单位的数字
3.字体加粗
  属性：<span class="hljs-attribute">font-weight</span>
  取值：
     1<span class="hljs-selector-class">.bold</span> 加粗（<span class="hljs-selector-tag">b</span>,hn）
 2<span class="hljs-selector-class">.normal</span> 正常
 3<span class="hljs-selector-class">.value</span> 无单位的数字（整百倍）
   400-900
   400：等同于<span class="hljs-attribute">normal</span>
   900：等同于bold
4.字体样式
  属性：<span class="hljs-attribute">font-style</span>
  取值：
     1<span class="hljs-selector-class">.normal</span> 正常显示 
 2<span class="hljs-selector-class">.italic</span> 斜体显示
5.小型大写字母
   将小写字符变成大写，但文本的大小与小写字符一致
   属性：<span class="hljs-attribute">font-variant</span>
   取值：
      1<span class="hljs-selector-class">.normal</span> 正常
  2<span class="hljs-selector-class">.small-caps</span> 小型的大写字符
6.字体属性简写
  属性：<span class="hljs-attribute">font</span>
  取值：<span class="hljs-selector-tag">style</span> variant weight size family;
  注意：
    如果用简写方式，必须设置family的值，否则无效。
<span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span>; 错误
<span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span> <span class="hljs-string">"黑体"</span>; 正确

 </code></pre>
<p>2.文本格式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.文本颜色
  属性：color
  取值：合法的颜色值
2.文本排列
  作用：指定文本，行内，行内块元素的水平对齐方式。
  属性：text-align
  取值：left/center/right/justify(两端对齐)
3.文字修饰（线条）
  属性：text-decoration
  取值：
    none:无任何线条修饰
underline:下划线修饰
overline:上划线修饰
    line-through:删除线修饰
4.行高
  作用:定义一行文本的高度
  特点：如果行高的高度大于字体本身的大小，那么该行文本将在指定的行高内呈现垂直居中的效果。
  属性:line-height
  取值：以px为单位数值
5.首行文本缩进
  属性：text-indent
  取值：以px为单位的数值
6.文本阴影
  属性：text-shadow
  取值：h-shadow v-shadow blur color;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-number">1.</span>文本颜色
  属性：<span class="hljs-built_in">color</span>
  取值：合法的颜色值
<span class="hljs-number">2.</span>文本排列
  作用：指定文本，行内，行内块元素的水平对齐方式。
  属性：<span class="hljs-built_in">text</span>-align
  取值：left/center/right/justify(两端对齐)
<span class="hljs-number">3.</span>文字修饰（线条）
  属性：<span class="hljs-built_in">text</span>-decoration
  取值：
    none:无任何线条修饰
underline:下划线修饰
overline:上划线修饰
    <span class="hljs-built_in">line</span>-through:删除线修饰
<span class="hljs-number">4.</span>行高
  作用:定义一行文本的高度
  特点：如果行高的高度大于字体本身的大小，那么该行文本将在指定的行高内呈现垂直居中的效果。
  属性:<span class="hljs-built_in">line</span>-<span class="hljs-built_in">height</span>
  取值：以px为单位数值
<span class="hljs-number">5.</span>首行文本缩进
  属性：<span class="hljs-built_in">text</span>-indent
  取值：以px为单位的数值
<span class="hljs-number">6.</span>文本阴影
  属性：<span class="hljs-built_in">text</span>-shadow
  取值：h-shadow v-shadow blur <span class="hljs-built_in">color</span>;
</code></pre>
<h2 id="articleHeader12">10.表格</h2>
<p>1.表格的常用属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.边距属性：padding
2.边框属性：border
3.尺寸属性：width,height
4.文本格式化属性：font-*,text-*,line-height
5.背景属性：颜色，图片，渐变
6.vertical-align
  作用：指定单元格数据垂直对齐方式
  取值：
     top:上对齐
 middle:居中对齐
 bottom:下对齐
 练习：创建网页，并在网页中添加表格
     1.表格尺寸为400*400，4行4列;
 2.每个单元格的尺寸为100*100,内容随意;
 3.设置表格和单位元格的边框为1px solid #000;
 4.设置每个单元格的左内边距为20px;
 5.尝试为每个单元格增加上外边距15px。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>1.边距属性：<span class="hljs-attribute">padding</span>
2.边框属性：<span class="hljs-attribute">border</span>
3.尺寸属性：<span class="hljs-attribute">width</span>,<span class="hljs-attribute">height</span>
4.文本格式化属性：<span class="hljs-attribute">font</span>-*,text-*,<span class="hljs-attribute">line-height</span>
5.背景属性：颜色，图片，渐变
6<span class="hljs-selector-class">.vertical-align</span>
  作用：指定单元格数据垂直对齐方式
  取值：
     <span class="hljs-attribute">top</span>:上对齐
 middle:居中对齐
 bottom:下对齐
 练习：创建网页，并在网页中添加表格
     <span class="hljs-number">1</span>.表格尺寸为<span class="hljs-number">400</span>*<span class="hljs-number">400</span>，<span class="hljs-number">4</span>行<span class="hljs-number">4</span>列;
 2.每个单元格的尺寸为100*100,内容随意;
 3.设置表格和单位元格的边框为1px solid <span class="hljs-selector-id">#000</span>;
 4.设置每个单元格的左内边距为20px;
 5.尝试为每个单元格增加上外边距15px。</code></pre>
<p>2.表格的特殊属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.边框合并
  取值：border-collapse
  取值：
     1.separate
   默认值，即分离边框模式
 2.collapse
   边框合并
2.边框边距
  作用：设置单元格之间或单元格与表格之间的距离
  属性：border-spacing
  取值：
    1.给定一个值：水平和垂直的间距相同
2.给两个值：
  第一个值 表示水平间距
  第二个值 表示垂直间距
注意：只有在边框分离模式下，边框边距才有效果，即border-collapse:separate时，border-spacing才有效。
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-number">1</span>.边框合并
  取值：<span class="hljs-built_in">border</span>-<span class="hljs-built_in">collapse</span>
  取值：
     <span class="hljs-number">1.</span>separate
   默认值，即分离边框模式
 <span class="hljs-number">2.</span><span class="hljs-built_in">collapse</span>
   边框合并
<span class="hljs-number">2</span>.边框边距
  作用：设置单元格之间或单元格与表格之间的距离
  属性：<span class="hljs-built_in">border</span>-spacing
  取值：
    <span class="hljs-number">1</span>.给定一个值：水平和垂直的间距相同
<span class="hljs-number">2</span>.给两个值：
  第一个值 表示水平间距
  第二个值 表示垂直间距
注意：只有在边框分离模式下，边框边距才有效果，即<span class="hljs-built_in">border</span>-<span class="hljs-built_in">collapse</span>:separate时，<span class="hljs-built_in">border</span>-spacing才有效。
    </code></pre>
<p>3.表格标题位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：caption-side
取值：
    1.top:默认值，标题在表格内容之上
2.bottom:标题在表格内容之下
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>属性：<span class="hljs-attribute">caption-side</span>
取值：
    <span class="hljs-number">1</span><span class="hljs-selector-class">.top</span>:默认值，标题在表格内容之上
<span class="hljs-number">2</span><span class="hljs-selector-class">.bottom</span>:标题在表格内容之下
</code></pre>
<p>4.显示规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：用来帮助浏览器指定如何布局一张表，也就是指定td尺寸的计算方式。
属性：table-layout
取值：
   1.auto
     默认值，即自动布局表格，列的尺寸实际上由内容来决定的。
   2.fixed
     固定表格布局，列的尺寸由设置的值为准
自动表格布局VS固定表格布局：
    1.自动表格布局
  1.单元格的大小会适应内容
  2.表格复杂时，加载速度较慢（缺点）
  3.自动表格布局会比较灵活（优点）
  4.适用于不确定每列大小时使用
    2.固定表格布局
  1.单元格的尺寸取决于设定的值
  2.任何情况下都会加载显示表格（优点）
  3.适用于确定每列大小时使用
  4.固定表格布局不够灵活（缺点）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>作用：用来帮助浏览器指定如何布局一张表，也就是指定td尺寸的计算方式。
属性：table-layout
取值：
   <span class="hljs-number">1.</span>auto
     默认值，即自动布局表格，列的尺寸实际上由内容来决定的。
   <span class="hljs-number">2.</span>fixed
     固定表格布局，列的尺寸由设置的值为准
自动表格布局VS固定表格布局：
    <span class="hljs-number">1.</span>自动表格布局
  <span class="hljs-number">1.</span>单元格的大小会适应内容
  <span class="hljs-number">2.</span>表格复杂时，加载速度较慢（缺点）
  <span class="hljs-number">3.</span>自动表格布局会比较灵活（优点）
  <span class="hljs-number">4.</span>适用于不确定每列大小时使用
    <span class="hljs-number">2.</span>固定表格布局
  <span class="hljs-number">1.</span>单元格的尺寸取决于设定的值
  <span class="hljs-number">2.</span>任何情况下都会加载显示表格（优点）
  <span class="hljs-number">3.</span>适用于确定每列大小时使用
  <span class="hljs-number">4.</span>固定表格布局不够灵活（缺点）
</code></pre>
<h2 id="articleHeader13">11.定位-浮动定位</h2>
<p>1.定位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="定位：指的是改变元素在页面中的默认位置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">定位：指的是改变元素在页面中的默认位置</code></pre>
<p>2.定位的分类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="按照定位的效果，可以分成以下几类：
   1.普通流定位（默认的定位方式）
   2.浮动定位
   3.相对定位
   4.绝对定位
   5.固定定位" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>按照定位的效果，可以分成以下几类：
   <span class="hljs-number">1.</span>普通流定位（默认的定位方式）
   <span class="hljs-number">2.</span>浮动定位
   <span class="hljs-number">3.</span>相对定位
   <span class="hljs-number">4.</span>绝对定位
   <span class="hljs-number">5.</span>固定定位</code></pre>
<p>3.定位详解</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.普通流定位
  又称为文档流定位，页面中元素的默认定位方式
  1.每个元素在页面中都有自己的空间
  2.每个元素默认都是在其父元素的左上角开始显示
  3.页面中的块级元素都是从上往下排列，每个元素独占一行
  4.页面中的行内元素以及行内块都是按照从左到右的顺序来排列的

  要解决的问题：让多个块级元素在一行中显示
2.浮动定位
  1.什么是浮动&amp;特点
    1.元素一旦浮动起来，将不占据页面空间（脱离了文档流），其它未浮动元素将上前补位。
2.浮动元素会停靠在父元素的左边或右边，或其它已经浮动的元素的边缘上。
3.浮动定位解决的问题：能够让多个块级元素在一行中显示。
  2.语法
    属性：float
取值：
   1.left
     左浮动，让元素停靠在父元素的左边或挨着左侧已经浮动的元素
   2.right
     右浮动，让元素停靠在父元素的右边或挨着右侧已经浮动的元素
   3.none
     默认值，即无任何浮动效果

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>普通流定位
  又称为文档流定位，页面中元素的默认定位方式
  <span class="hljs-number">1.</span>每个元素在页面中都有自己的空间
  <span class="hljs-number">2.</span>每个元素默认都是在其父元素的左上角开始显示
  <span class="hljs-number">3.</span>页面中的块级元素都是从上往下排列，每个元素独占一行
  <span class="hljs-number">4.</span>页面中的行内元素以及行内块都是按照从左到右的顺序来排列的

  要解决的问题：让多个块级元素在一行中显示
<span class="hljs-number">2.</span>浮动定位
  <span class="hljs-number">1.</span>什么是浮动&amp;特点
    <span class="hljs-number">1.</span>元素一旦浮动起来，将不占据页面空间（脱离了文档流），其它未浮动元素将上前补位。
<span class="hljs-number">2.</span>浮动元素会停靠在父元素的左边或右边，或其它已经浮动的元素的边缘上。
<span class="hljs-number">3.</span>浮动定位解决的问题：能够让多个块级元素在一行中显示。
  <span class="hljs-number">2.</span>语法
    属性：<span class="hljs-type">float</span>
取值：
   <span class="hljs-number">1.</span>left
     左浮动，让元素停靠在父元素的左边或挨着左侧已经浮动的元素
   <span class="hljs-number">2.</span>right
     右浮动，让元素停靠在父元素的右边或挨着右侧已经浮动的元素
   <span class="hljs-number">3.</span>none
     默认值，即无任何浮动效果

</code></pre>
<h2 id="articleHeader14">12.浮动引发的特殊效果</h2>
<p>1.元素一旦浮动起来以后就会变成块级元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="允许修改尺寸
能正常处理垂直方向外边距" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>允许修改尺寸
能正常处理垂直方向外边距</code></pre>
<p>2.当父元素显示不下所有已浮动元素时，最后一个将换行，但是，有可能被卡住；<br>  3.元素一旦浮动起来后，宽度将以内容为主（未指定宽度情况下）；<br>  4.文本，行内元素，行内块元素是采用环绕的方式来排列的，是不会别浮动元素压在底下的，而会巧妙的避开浮动元素。</p>
<h2 id="articleHeader15">13.清除浮动带来的影响</h2>
<p>元素一旦浮动起来之后，就会对后续元素带来一定的位置影响（后续元素要上前补位），如果后续元素不想被影响（不想补位），那么就可以通过清除浮动的方式来解决<br>  属性：clear<br>  取值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.left
   清除当前元素前面的元素左浮动所带来的影响
 2.right
   清除当前元素前面的元素右浮动所带来的影响
 3.both
   清除当前元素前面元素任何一种浮动所带来的影响
 4.none
   默认值，不做任何的清除浮动操作
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> <span class="hljs-number">1</span><span class="hljs-selector-class">.left</span>
   清除当前元素前面的元素左浮动所带来的影响
 <span class="hljs-number">2</span><span class="hljs-selector-class">.right</span>
   清除当前元素前面的元素右浮动所带来的影响
 <span class="hljs-number">3</span><span class="hljs-selector-class">.both</span>
   清除当前元素前面元素任何一种浮动所带来的影响
 <span class="hljs-number">4</span><span class="hljs-selector-class">.none</span>
   默认值，不做任何的清除浮动操作
</code></pre>
<h2 id="articleHeader16">14.浮动元素对父元素高度的影响</h2>
<p>1.元素的高度都是以未浮动元素的高度为准的，浮动元素是不占页面的高度的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 解决父元素的高度方案如下：
    1.直接设置父元素的高度
  弊端：不是每次都知道父元素的高度
2.设置父元素也浮动
  弊端：不是任何时候父元素都需要浮动，而且浮动会影响后续元素
3.为父元素设置overflow
  取值：hidden或auto
  弊端：如果有内容需要溢出显示的话，也会一同被隐藏
4.在父元素中，追加空子元素(块级)，并设置其clear:both;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> 解决父元素的高度方案如下：
    1.直接设置父元素的高度
  弊端：不是每次都知道父元素的高度
2.设置父元素也浮动
  弊端：不是任何时候父元素都需要浮动，而且浮动会影响后续元素
3.为父元素设置<span class="hljs-attribute">overflow</span>
  取值：hidden或<span class="hljs-attribute">auto</span>
  弊端：如果有内容需要溢出显示的话，也会一同被隐藏
4.在父元素中，追加空子元素(块级)，并设置其<span class="hljs-attribute">clear</span>:both;
</code></pre>
<h2 id="articleHeader17">15.显示</h2>
<p>1.显示方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.什么是显示方式
  决定了元素在网页中的表现形式（块级，行内，行内块）
2.语法
  属性：display
  取值：
     1.none 不显示元素-隐藏
   特点：脱离文档流，不占据页面空间
 2.block
   让元素表现的和块级元素一致
   特点：
      独占一行，可是修改高宽
 3.inline
   让元素表现的和行内元素一致
   特点：
      不允许修改尺寸
      多个元素在一行中显示
      无法设置垂直外边距
 4.inline-block
   让元素表现的和行内块元素一致
   特点：
     多个元素在一行中显示，但是可以修改尺寸
 5.table
   让元素表现的与表格一致
   特点：
      尺寸以内容为准
      每个元素独占一行
      允许修改尺寸
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.什么是显示方式
  决定了元素在网页中的表现形式（块级，行内，行内块）
<span class="hljs-number">2</span>.语法
  属性：<span class="hljs-attribute">display</span>
  取值：
     <span class="hljs-number">1</span><span class="hljs-selector-class">.none</span> 不显示元素-隐藏
   特点：脱离文档流，不占据页面空间
 <span class="hljs-number">2</span><span class="hljs-selector-class">.block</span>
   让元素表现的和块级元素一致
   特点：
      独占一行，可是修改高宽
 <span class="hljs-number">3</span><span class="hljs-selector-class">.inline</span>
   让元素表现的和行内元素一致
   特点：
      不允许修改尺寸
      多个元素在一行中显示
      无法设置垂直外边距
 <span class="hljs-number">4</span><span class="hljs-selector-class">.inline-block</span>
   让元素表现的和行内块元素一致
   特点：
     多个元素在一行中显示，但是可以修改尺寸
 <span class="hljs-number">5</span><span class="hljs-selector-class">.table</span>
   让元素表现的与表格一致
   特点：
      尺寸以内容为准
      每个元素独占一行
      允许修改尺寸
</code></pre>
<p>2.显示效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.显示/隐藏
  属性：visibility
  取值：
      1.visible:默认值，元素可见
  2.hidden:元素不可见-隐藏
  面试：display:none和visibility:hidden的区别
        display:none 不占页面空间
    visibility:hidden 占页面空间
2.透明度
  属性：opacity
  取值：0.0（完全透明）~1.0（完全不透明）之间的小数
3.垂直方向对齐方式
  属性：vertical-align
  场合：
     1.表格中使用
   取值：top/bottom/middle
 2.图片（img）中使用
   取值：
      top：上
      bottom：下
      middle：中间
      baseline:基线对齐，默认值
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.显示/隐藏
  属性：<span class="hljs-attribute">visibility</span>
  取值：
      <span class="hljs-number">1</span><span class="hljs-selector-class">.visible</span>:默认值，元素可见
  <span class="hljs-number">2</span><span class="hljs-selector-class">.hidden</span>:元素不可见-隐藏
  面试：<span class="hljs-attribute">display</span>:none和visibility:hidden的区别
        <span class="hljs-attribute">display</span>:none 不占页面空间
    <span class="hljs-attribute">visibility</span>:hidden 占页面空间
<span class="hljs-number">2</span>.透明度
  属性：<span class="hljs-attribute">opacity</span>
  取值：<span class="hljs-number">0.0</span>（完全透明）~<span class="hljs-number">1.0</span>（完全不透明）之间的小数
<span class="hljs-number">3</span>.垂直方向对齐方式
  属性：<span class="hljs-attribute">vertical-align</span>
  场合：
     <span class="hljs-number">1</span>.表格中使用
   取值：<span class="hljs-attribute">top</span>/bottom/middle
 <span class="hljs-number">2</span>.图片（img）中使用
   取值：
      <span class="hljs-attribute">top</span>：上
      <span class="hljs-attribute">bottom</span>：下
      middle：中间
      baseline:基线对齐，默认值
</code></pre>
<h2 id="articleHeader18">16.光标</h2>
<p>1.作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="改变鼠标悬停在元素上时，鼠标的状态" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">改变鼠标悬停在元素上时，鼠标的状态</code></pre>
<p>2.语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：cursor
取值：
    1.default: 默认
2.pointer: 小手
3.crosshair: +
4.text: I
5.wait: 等待
6.help: 帮助
 练习：
   新建一个div元素，当鼠标移入到div上时，让光标变成小手状态。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>属性：<span class="hljs-attribute">cursor</span>
取值：
    <span class="hljs-number">1</span><span class="hljs-selector-class">.default</span>: 默认
<span class="hljs-number">2</span><span class="hljs-selector-class">.pointer</span>: 小手
<span class="hljs-number">3</span><span class="hljs-selector-class">.crosshair</span>: +
<span class="hljs-number">4</span><span class="hljs-selector-class">.text</span>: I
<span class="hljs-number">5</span><span class="hljs-selector-class">.wait</span>: 等待
<span class="hljs-number">6</span><span class="hljs-selector-class">.help</span>: 帮助
 练习：
   新建一个div元素，当鼠标移入到div上时，让光标变成小手状态。
</code></pre>
<h2 id="articleHeader19">17.列表</h2>
<p>1.列表项标记</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：list-style-type
取值：
   1.none
   2.disc
   3.circle
   4.square" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>属性：<span class="hljs-built_in">list-style-type</span>
取值：
   1.<span class="hljs-string">none
</span>   2.<span class="hljs-string">disc
</span>   3.<span class="hljs-string">circle
</span>   4.<span class="hljs-string">square</span></code></pre>
<p>2.列表项图像</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：使用自定义图像作为列表项标识
属性：list-style-image
取值：url(图像路径);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>作用：使用自定义图像作为列表项标识
属性：<span class="hljs-built_in">list-style-image</span>
取值：<span class="hljs-string">url(</span>图像路径);</code></pre>
<p>3.列表项位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：将默认的列表项标识的位置，放到li里面
属性：list-style-position
取值：
   1.outside 默认值，将标识显示在li外面的
   2.inside 将标识放于li里面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>作用：将默认的列表项标识的位置，放到<span class="hljs-string">li里</span>面
属性：<span class="hljs-built_in">list-style-position</span>
取值：
   1.<span class="hljs-string">outside </span>默认值，将标识显示在<span class="hljs-string">li外</span>面的
   2.<span class="hljs-string">inside </span>将标识放于<span class="hljs-string">li里</span>面</code></pre>
<p>4.列表属性简写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：list-style
取值：type url() position;
常用方式：list-style:none;
列表的使用场合：
   横向排列或纵向排列的内容，都可以使用列表来实现。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>属性：<span class="hljs-built_in">list-style</span>
取值：<span class="hljs-string">type </span><span class="hljs-string">url(</span>) <span class="hljs-string">position;</span>
常用方式：<span class="hljs-built_in">list-style:none;</span>
列表的使用场合：
   横向排列或纵向排列的内容，都可以使用列表来实现。
</code></pre>
<h2 id="articleHeader20">18.定位</h2>
<p>相对定位，绝对定位，固定定位<br>  1.定位相关属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性：position
取值：
   1.static:静态，默认值
   2.relative:相对定位
   3.absolute:绝对定位
   4.fixed:固定定位" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>属性：<span class="hljs-attribute">position</span>
取值：
   <span class="hljs-number">1</span><span class="hljs-selector-class">.static</span>:静态，默认值
   <span class="hljs-number">2</span><span class="hljs-selector-class">.relative</span>:相对定位
   <span class="hljs-number">3</span><span class="hljs-selector-class">.absolute</span>:绝对定位
   <span class="hljs-number">4</span><span class="hljs-selector-class">.fixed</span>:固定定位</code></pre>
<p>2.偏移属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="top/bottom/left/right
以上四个属性的取值均为数字
ex:
  top:150px 元素向下移动150px
  left:20px 元素向右移动20px
  right:-150px 元素向右移动150px
注意：
  只有已定位元素才能使用偏移属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code><span class="hljs-built_in">top</span>/<span class="hljs-built_in">bottom</span>/<span class="hljs-built_in">left</span>/<span class="hljs-built_in">right</span>
以上四个属性的取值均为数字
ex:
  <span class="hljs-built_in">top</span>:<span class="hljs-number">150</span>px 元素向下移动<span class="hljs-number">150</span>px
  <span class="hljs-built_in">left</span>:<span class="hljs-number">20</span>px 元素向右移动<span class="hljs-number">20</span>px
  <span class="hljs-built_in">right</span>:<span class="hljs-number">-150</span>px 元素向右移动<span class="hljs-number">150</span>px
注意：
  只有已定位元素才能使用偏移属性</code></pre>
<p>3.定位详解</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.相对定位
  1.什么是相对定位
    元素相对于它原来的位置偏移某个距离
  2.使用场合
    做元素位置微调时使用
  3.语法
      position:relative;
      配合偏移属性来实现位置的移动
      left:10px;
      top:10px;
2.绝对定位
  1.什么是绝对定位&amp;特点
    1.绝对定位的元素会脱离文档流-不占页面空间
2.绝对定位的元素会相对于离他最近的，已定位的，祖先元素 去实现位置的初始化。
3.如果没有已定位的祖先元素，那么该元素就相对于body去实现位置的初始化
4.配合偏移属性 实现元素位置的修改
  2.语法
    position:absolute;
配合偏移属性实现位置的修改
  3.使用场合
    1.有堆叠效果的元素
2.弹出菜单
  4.注意：
    1.脱离文档流-不占据页面空间
2.绝对定位元素会变成块级元素

  5.堆叠顺序
    一旦元素变为已定位元素的话，元素们则有可能出现堆叠的效果
属性：z-index
取值：无单位的数字，数字越大越靠上
    注意：
  1.只有已定位元素才能实现堆叠顺序的改变（z-index）
  2.父子元素间，z-index无效，永远都是子元素压在父元素上方
3.固定定位
  1.什么是固定定位
    将元素固定在网页的某个位置处，位置不会随着滚动条而发生改变，固定在可视区域中。
  2.语法
    position:fixed;
配合偏移属性使用
  注意：
    1.固定定位的元素永远都是相对于body去实现位置的初始化和偏移。
2.固定定位的元素会变成块级元素
3.固定定位元素会脱离文档流-不占页面空间



 
  

   

 


  
    



   

  

    
  


  



  
  


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>1.相对定位
  1.什么是相对定位
    元素相对于它原来的位置偏移某个距离
  2.使用场合
    做元素位置微调时使用
  3.语法
      <span class="hljs-attribute">position</span>:relative;
      配合偏移属性来实现位置的移动
      <span class="hljs-attribute">left</span>:<span class="hljs-number">10px</span>;
      <span class="hljs-attribute">top</span>:<span class="hljs-number">10px</span>;
2.绝对定位
  1.什么是绝对定位&amp;特点
    1.绝对定位的元素会脱离文档流-不占页面空间
2.绝对定位的元素会相对于离他最近的，已定位的，祖先元素 去实现位置的初始化。
3.如果没有已定位的祖先元素，那么该元素就相对于<span class="hljs-selector-tag">body</span>去实现位置的初始化
4.配合偏移属性 实现元素位置的修改
  2.语法
    <span class="hljs-attribute">position</span>:absolute;
配合偏移属性实现位置的修改
  3.使用场合
    1.有堆叠效果的元素
2.弹出菜单
  4.注意：
    1.脱离文档流-不占据页面空间
2.绝对定位元素会变成块级元素

  5.堆叠顺序
    一旦元素变为已定位元素的话，元素们则有可能出现堆叠的效果
属性：<span class="hljs-attribute">z-index</span>
取值：无单位的数字，数字越大越靠上
    注意：
  1.只有已定位元素才能实现堆叠顺序的改变（<span class="hljs-attribute">z-index</span>）
  2.父子元素间，<span class="hljs-attribute">z-index</span>无效，永远都是子元素压在父元素上方
3.固定定位
  1.什么是固定定位
    将元素固定在网页的某个位置处，位置不会随着滚动条而发生改变，固定在可视区域中。
  2.语法
    <span class="hljs-attribute">position</span>:fixed;
配合偏移属性使用
  注意：
    1.固定定位的元素永远都是相对于<span class="hljs-selector-tag">body</span>去实现位置的初始化和偏移。
2.固定定位的元素会变成块级元素
3.固定定位元素会脱离文档流-不占页面空间



 
  

   

 


  
    



   

  

    
  


  



  
  


</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——CSS

## 原文链接
[https://segmentfault.com/a/1190000013370170](https://segmentfault.com/a/1190000013370170)

