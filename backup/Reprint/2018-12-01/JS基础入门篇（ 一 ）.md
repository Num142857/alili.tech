---
title: 'JS基础入门篇（ 一 ）' 
date: 2018-12-01 2:30:12
hidden: true
slug: j7vl1z2kkvl
categories: [reprint]
---

{{< raw >}}

                    
<h2>1.JS存放在代码中的位置</h2>
<p>1.JS写在行间</p>
<pre><code>&lt;div style="background-color: red;" onclick="alert(1)" &gt;hello world&lt;/div&gt;</code></pre>
<ul>
<li>
<strong>优点：</strong>直接，简单</li>
<li>
<strong>缺点：</strong>不方便复用和维护,不符合结构行为分离规范</li>
</ul>
<p>2.JS写在script ( 一般写在body结束标签之前 )<br><strong>因为JS的执行顺序，需要将元素加载完成，才能获取到元素，故一般写在body结束标签之前。</strong></p>
<pre><code>&lt;body&gt;
        &lt;div id="box"&gt;hello&lt;/div&gt;
        &lt;div id="box2"&gt;world&lt;/div&gt;    
        &lt;script&gt;
            document.getElementById("box").onclick = function(){
                alert(1);
            };
            document.getElementById("box2").onclick = function(){
                alert(2);
            };
        &lt;/script&gt;
&lt;/body&gt;</code></pre>
<p><strong>优点：</strong>只要是在这个页面中就可以使用这段 js。<br><strong>缺点：</strong> 1. 不方便修改维护   2. 不符合规范</p>
<p>3.写在js文件中</p>
<p><strong>1.创建一个js文件,写入js代码</strong><br><strong>2.让html文件 和js文件产生关联,通过script标签的 src 属性 链接到js文件。</strong></p>
<pre><code>&lt;body&gt;
        &lt;div id="box"&gt;miaov&lt;/div&gt;
        &lt;script src="index.js"&gt;&lt;/script&gt;
&lt;/body&gt;</code></pre>
<p><strong>优点：</strong></p>
<pre><code>1.结构 行为 完全分离
2.方便修改维护
3.可复用性强    
</code></pre>
<h2>2.JS执行的顺序</h2>
<p>针对js的存放位置，如果js放在script标签中，必须放到<strong>body结束标签之前</strong>。<strong>原因是js会读取dom节点，必须等到dom节点都加载完成了，js代码才取得到对应节点。</strong></p>
<p><strong>如果JS代码非要放在所有节点之前呢？？？</strong><br>可以将script代码写到head中，<strong>用window.onload把代码块包起来放到script中。</strong></p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;&lt;/title&gt;
        &lt;style&gt;
            #box{
                width:100px;
                height:100px;
                background-color:red;
            }
        &lt;/style&gt;
        &lt;script&gt;
            window.onload = function(){
                document.getElementById("box").onclick = function(){
                    alert(1);
                }
            }
        &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;    
        &lt;div id="box"&gt;miaov&lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>以上方法不支持，因为window.onload是等到页面所有dom节点，图片资源加载完成才执行的。如果图片资源很多的话，那么用户对页面的操作就无效了。<strong>所以，一般放在body结束标签之前。</strong></p>
<h2>3.注释</h2>
<p>分为单行注释和多行注释。</p>
<ul><li><pre><code> //单行注释
 //单行注释
 //单行注释
</code></pre></li></ul>
<ul><li><pre><code> /*
 多行注释
 多行注释
 多行注释
 */
 
</code></pre></li></ul>
<h2>4.变量</h2>
<ul>
<li>
<strong>变量：</strong>可变的量。</li>
<li>
<strong>作用：</strong>复用数据，存储数据。</li>
<li>
<strong>申明变量：</strong> var 变量名;    以分号结束 。只申明一个变量不赋值的话，那这个变量中默认存储的是undefined</li>
<li>
<p><strong>变量命名规范：</strong>可以是数字(1234567890) 字母(abcdefg...)下划线 ( _ )美元符( $ )组成。<br><strong>禁止：</strong></p>
<pre><code> 1. 不允许数字开头     
 2. 不允许使用关键字
 3. 不允许使用保留字</code></pre>
</li>
</ul>
<pre><code>推荐：
驼峰式命名法+语义化单词
驼峰式命名法:从第二个单词开始，每个单词的首字母大写。</code></pre>
<ul><li><strong>属性操作 ：</strong></li></ul>
<p><strong>以下三种写法都可以。</strong></p>
<pre><code>box.style["background-color"] = "green";
box["style"]["background-color"] = valStr;
box.style.backgroundColor = "green";</code></pre>
<ol>
<li>如果[ ]中间没有用引号包起来,那么会把中间的内容当做变量处理。</li>
<li>当需要改变的属性值是一个变量的时候只能使用[ ],方括号中间如果是变量的话，不需要加引号。</li>
<li>当操作属性的时候属性名不符合变量命名规范的时候可以使用[ ]。</li>
<li>如果一定要使用点( . )的话，需要改变成驼峰式命名法。</li>
</ol>
<h2>5.函数</h2>
<p><strong>（一）简介</strong></p>
<ul>
<li>
<strong>函数的作用：</strong>代码块的复用</li>
<li>
<strong>函数的分类：</strong><br>  1.有名函数  <br>  2.匿名函数</li>
</ul>
<p><strong>（二）使用</strong></p>
<pre><code>1-有名函数
                声明:
                    function 函数名(){ 
                        代码块 
                    }
                调用:
                    函数名();


2-匿名函数
                声明: 
                    直接声明一个匿名函数 会报错
                调用:
                    可以直接通过事件调用</code></pre>
<p>eg：<br><a href="https://codepen.io/Liang_zhi_fang/pen/RyJOeg" rel="nofollow noreferrer">案例一：有名函数的声明和调用</a><br><a href="https://codepen.io/Liang_zhi_fang/pen/vjrMMJ" rel="nofollow noreferrer">案例二：匿名函数直接声明会报错，可以通过事件调用</a><br><a href="https://codepen.io/Liang_zhi_fang/pen/erKaNm" rel="nofollow noreferrer">案例三：有名函数的错误调用，btn.onclick = fn();这样调用是错误的，只会使函数立刻执行，传给点击事件的是个null。没有点击click按钮，直接打开就发生变化了。</a><br><a href="https://codepen.io/Liang_zhi_fang/pen/ZoRNOG" rel="nofollow noreferrer">案例三：有名函数的正确调用，btn.onclick = fn;这样调用是正确的。点击click按钮，红色方块才发生变化</a></p>
<h2>6.innerHTML 和 src</h2>
<p><strong>innerHTML:修改双标签里面的内容。</strong><br><strong>innerHTML举例：</strong><a href="https://codepen.io/Liang_zhi_fang/pen/deKEmm" rel="nofollow noreferrer">以下代码的作用是，点击页面任何位置，修改红色方块的内容。</a><br><strong>src：需要注意的是，在js中，img.src获取到的是绝对路径，很少进行比较。</strong></p>
<h2>7.基础篇练习</h2>
<p>看完以上的小伙伴，可以看两个例子的效果，试着做一下。<br><a href="https://codepen.io/Liang_zhi_fang/pen/odyRQd" rel="nofollow noreferrer">练习一：点击按钮，设置方块大小</a><br><a href="https://codepen.io/Liang_zhi_fang/pen/VxdOgB" rel="nofollow noreferrer">练习二：点击按钮，增加或减小字体大小</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础入门篇（ 一 ）

## 原文链接
[https://segmentfault.com/a/1190000014841932](https://segmentfault.com/a/1190000014841932)

