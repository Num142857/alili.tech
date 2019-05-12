---
title: 'JavaScript 基础知识 - DOM篇(二)' 
date: 2018-12-22 2:30:11
hidden: true
slug: t6sx8vvqir
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">7. 节点操作</h2>
<h3 id="articleHeader1">7.1 节点的属性</h3>
<p><strong>节点分类：</strong></p>
<ul>
<li>标签节点</li>
<li>文本节点</li>
<li>属性节点</li>
<li>注释节点</li>
</ul>
<p><strong>节点常用的属性：</strong></p>
<ul>
<li>
<code>nodeType</code>：节点的类型</li>
<li>
<code>nodeName</code>：节点名称</li>
<li>
<code>nodeValue</code>：节点值</li>
</ul>
<p><strong>常见的节点类型：</strong></p>
<ul>
<li>标签节点：<code>1</code>
</li>
<li>文本节点：<code>3</code>
</li>
<li>注释节点：<code>8</code>
</li>
<li>属性节点：<code>2</code>
</li>
</ul>
<p><strong>示例代码：判断节点类型</strong> <em>[16-节点的属性.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分-->
<div id=&quot;box&quot;>
    <p>1</p>
    <!--这是个注释-->
    <p>2</p>
    <p>3</p>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

<!-- js 部分 -->
<script>
    // 节点类型  标签节点：1  文本节点：3   注释节点：8  属性节点：2
    var box = document.getElementById(&quot;box&quot;);
    var nodes = box.childNodes; // 获取box下的所有的孩子节点
    var arr = [];
    
    console.log(nodes); //NodeList(15)  [text, p, text, comment, text, p, text, p, text, div, text, div, text, div, text]
    for(var i = 0; i < nodes.length; i++) {
        // 如果节点类型为1的时候
        if(nodes[i].nodeType == 1) {
            arr.push(nodes[i]);
        }
    }
    console.log(arr); // [p p p div div div]
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!--这是个注释--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 节点类型  标签节点：1  文本节点：3   注释节点：8  属性节点：2</span>
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"box"</span>);
    <span class="hljs-keyword">var</span> nodes = box.childNodes; <span class="hljs-comment">// 获取box下的所有的孩子节点</span>
    <span class="hljs-keyword">var</span> arr = [];
    
    <span class="hljs-built_in">console</span>.log(nodes); <span class="hljs-comment">//NodeList(15)  [text, p, text, comment, text, p, text, p, text, div, text, div, text, div, text]</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; nodes.length; i++) {
        <span class="hljs-comment">// 如果节点类型为1的时候</span>
        <span class="hljs-keyword">if</span>(nodes[i].nodeType == <span class="hljs-number">1</span>) {
            arr.push(nodes[i]);
        }
    }
    <span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">// [p p p div div div]</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader2">7.2 节点层次</h3>
<h4>7.2.1 孩子节点</h4>
<ul>
<li>
<code>childNodes</code>:获取所有的孩子节点（包括了元素节点和其他很多类型的节点，基本不常用）</li>
<li>
<code>children</code>:获取所有的子元素（用途很广泛）<code>ie6/7/8</code>会有兼容性 如果有注释 会算在内</li>
<li>
<code>firstChild</code> 第一个节点</li>
<li>
<code>firstElementChild</code> 第一个子元素 有兼容性问题 可以封装一个兼容性方法</li>
<li>
<code>lastChild</code> 最后一个节点</li>
<li>
<code>lastElementChild</code> 最后一个子元素 有兼容性问题 可以封装一个兼容性方法</li>
</ul>
<p><strong>示例代码：隔行变色</strong> <em>[16-获取孩子元素-隔行变色.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .odd {
        background: #FFE5B9;
    }
    
    .even {
        background: #FFBDD4;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    // 通过 box 下的孩子元素，找到所有标签
    var childs = box.children;
    for (var i = 0; i < childs.length; i++) {
        // 下标是从0开始算的 虽然这里判断的是偶数
        if (i % 2 == 0) {
            childs[i].className = &quot;odd&quot;;
        } else {
            childs[i].className = &quot;even&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.odd</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FFE5B9</span>;
    }
    
    <span class="hljs-selector-class">.even</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FFBDD4</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-comment">// 通过 box 下的孩子元素，找到所有标签</span>
    <span class="hljs-keyword">var</span> childs = box.children;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; childs.length; i++) {
        <span class="hljs-comment">// 下标是从0开始算的 虽然这里判断的是偶数</span>
        <span class="hljs-keyword">if</span> (i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>) {
            childs[i].className = <span class="hljs-string">"odd"</span>;
        } <span class="hljs-keyword">else</span> {
            childs[i].className = <span class="hljs-string">"even"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>示例代码：菜单切换</strong> <em>[17-获取孩子元素-菜单切换.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #box {
        width: 500px;
        margin: 100px auto;
    }
    ul {
        overflow: hidden;
    }
    li {
        float: left;
        width: 100px;
        height: 40px;
        text-align: center;
        background-color: #FFE5B9;
        cursor: pointer;
    }
    a {
        text-decoration: none;
        font: 400 16px/40px &quot;宋体&quot;;
        color: #FF5C5C;
    }
    .show {
        color: #333;
        background-color: #FFC77F;
    }
</style>

<!-- html 部分 -->
<div>
    <ul id=&quot;box&quot;>
        <li class=&quot;show&quot;><a href=&quot;javascript:void(0)&quot;>导航1</a></li>
        <li><a href=&quot;javascript:void(0)&quot;>导航2</a></li>
        <li><a href=&quot;javascript:void(0)&quot;>导航3</a></li>
        <li><a href=&quot;javascript:void(0)&quot;>导航4</a></li>
        <li><a href=&quot;javascript:void(0)&quot;>导航5</a></li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    // 获取box下的所有孩子元素
    lis = box.children;
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = &quot;&quot;;
            }
            this.className = &quot;show&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
    }
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FFE5B9</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">400</span> <span class="hljs-number">16px</span>/<span class="hljs-number">40px</span> <span class="hljs-string">"宋体"</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#FF5C5C</span>;
    }
    <span class="hljs-selector-class">.show</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FFC77F</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"show"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span>&gt;</span>导航1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span>&gt;</span>导航2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span>&gt;</span>导航3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span>&gt;</span>导航4<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span>&gt;</span>导航5<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-comment">// 获取box下的所有孩子元素</span>
    lis = box.children;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
        lis[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                lis[i].className = <span class="hljs-string">""</span>;
            }
            <span class="hljs-keyword">this</span>.className = <span class="hljs-string">"show"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmaamt6bcwg20eo01vjrm.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmaamt6bcwg20eo01vjrm.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>javascript:void(0)的作用：</strong></p>
<ul>
<li>
<code>javascript</code>:是伪协议，表示<code>url</code>的内容通过<code>javascript</code>执行。</li>
<li>
<code>void(0)</code>表示不作任何操作，这样会防止链接跳转到其他页面。</li>
<li>让页面不跳转，<code>JavaScript:void(0)</code>是最通用的方式。</li>
</ul>
<p><strong>children和getElementByTagName的区别：</strong></p>
<ul>
<li>
<code>children</code> 找子元素，不管是什么标签</li>
<li>
<code>TagName</code> 找的是页面中，是该标签名的标签</li>
</ul>
<h4>7.2.2 兄弟节点</h4>
<ul>
<li>
<code>nextSibling</code>:下一个兄弟节点</li>
<li>
<code>nextElementSibling</code>:下一个兄弟元素（IE678不兼容）</li>
<li>
<code>previousSibling</code>上一个兄弟节点</li>
<li>
<code>previousElementSibling</code> 上一个兄弟元素 有兼容性问题 可以封装一个兼容性方法</li>
</ul>
<p><strong>示例代码：表单验证</strong> <em>[18-兄弟节点-表单验证.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <input id=&quot;textName&quot; type=&quot;text&quot;><span style=&quot;color:red; font-size:14px;&quot;></span><br>
    <input id=&quot;textPwd&quot; type=&quot;text&quot;><span style=&quot;color:red; font-size:14px;&quot;></span><br>
    <button>注册</button>
</div>

<script>
    var textName = document.getElementById('textName');
    var textPwd = document.getElementById('textPwd');

    // 键盘弹起事件
    //为什么是键盘弹起事件？ 如果是键盘按下事件，内容还没进去，下面代码就开始做判断了
    textName.onkeyup = function() {
        // 如果输入的值 小于2位或大于6位的时候
        if (this.value.length < 2 || this.value.length > 6) {
            // 当前的下一个兄弟元素
            this.nextSibling.innerHTML = &quot;用户名长度为2-6位&quot;;
        } else {
            this.nextSibling.innerHTML = &quot;&quot;;
        }
    }
    textPwd.onkeyup = function() {
        if (this.value.length < 6 || this.value.length > 12) {
            this.nextSibling.innerHTML = &quot;密码长度为6-12位&quot;;
        } else {
            this.nextSibling.innerHTML = &quot;&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"textName"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:red; font-size:14px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"textPwd"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:red; font-size:14px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> textName = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'textName'</span>);
    <span class="hljs-keyword">var</span> textPwd = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'textPwd'</span>);

    <span class="hljs-comment">// 键盘弹起事件</span>
    <span class="hljs-comment">//为什么是键盘弹起事件？ 如果是键盘按下事件，内容还没进去，下面代码就开始做判断了</span>
    textName.onkeyup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 如果输入的值 小于2位或大于6位的时候</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.value.length &lt; <span class="hljs-number">2</span> || <span class="hljs-keyword">this</span>.value.length &gt; <span class="hljs-number">6</span>) {
            <span class="hljs-comment">// 当前的下一个兄弟元素</span>
            <span class="hljs-keyword">this</span>.nextSibling.innerHTML = <span class="hljs-string">"用户名长度为2-6位"</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.nextSibling.innerHTML = <span class="hljs-string">""</span>;
        }
    }
    textPwd.onkeyup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.value.length &lt; <span class="hljs-number">6</span> || <span class="hljs-keyword">this</span>.value.length &gt; <span class="hljs-number">12</span>) {
            <span class="hljs-keyword">this</span>.nextSibling.innerHTML = <span class="hljs-string">"密码长度为6-12位"</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.nextSibling.innerHTML = <span class="hljs-string">""</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4gnri7tqg208t02m3zv.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4gnri7tqg208t02m3zv.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>键盘事件：</strong></p>
<ul>
<li>
<code>onkeydown</code>: 当键盘按下的时候触发</li>
<li>
<code>onkeyup</code>  : 当键盘弹起的时候触发</li>
</ul>
<h4>7.2.3 父节点</h4>
<ul><li>
<code>parentNode</code>:父节点  没有兼容性问题</li></ul>
<h2 id="articleHeader3">8. 样式操作</h2>
<blockquote>标签不仅可以通过<code>class</code>属性操作样式，还可以通过<code>style</code>属性操作样。同样的<code>DOM</code>对象可以通过<code>className</code>操作样式，也可以通过<code>style</code>属性操作样。</blockquote>
<h3 id="articleHeader4">8.1 样式操作注意点</h3>
<ul>
<li>
<code>style</code>属性是一个对象</li>
<li>
<code>style</code>这个对象中属性值都是<code>字符串</code>格式</li>
<li>标签中<code>style</code>属性有哪些样式名，在<code>style</code>这个对象中就有对应的属性名。</li>
<li>如果获取的时候有单位，设置的时候也要有单位</li>
<li>标签中有一些属性带了<code>-</code>，比如<code>background-color</code>,到了<code>style</code>对象中，变成了驼峰命名法，<code>backgroundColor</code>（因为-在js中不是一个合法的标识符）</li>
<li>
<code>DOM</code>中的<code>style</code>属性只能获取和设置行内样式，在类样式中定义的样式通过<code>style</code>获取不到。</li>
</ul>
<p><strong>示例代码：改变div宽度和背景</strong> <em>[19-改变div宽度和背景]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分 -->
<style>
    div {
        width: 200px;
        height: 200px;
        background-color: red;
    }
</style>

<!-- html 部分 -->
<!-- 行内样式权重最高 -->
<div id=&quot;box&quot; style=&quot;background-color: #FFECDA; width:300px;&quot; title=&quot;点击我 变长&quot;></div>

<!-- js 部分-->
<script>
    var box = document.getElementById('box');

    //1. 标签有style属性， 对象也有style属性， 这个style属性是一个对象。
    console.log(box.style);

    box.onclick = function() {

        //2. 可以通过style来设置样式, 如果获取的时候有单位，设置的时候也要有单位
        box.style.width = &quot;800px&quot;;

        //3. background-color这种样式需要变成驼峰命名法
        box.style.backgroundColor = &quot;#A6D0E4&quot;;
    }

    //4. 获取的时候，只能获取行内样式  style通常只是用来设置样式的，很少用来获取样式。
    console.log(box.style.width); // 800
    console.log(box.style.height); // 空 行内里没有这个属性
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: red;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-comment">&lt;!-- 行内样式权重最高 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background-color: #FFECDA; width:300px;"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"点击我 变长"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    <span class="hljs-comment">//1. 标签有style属性， 对象也有style属性， 这个style属性是一个对象。</span>
    <span class="hljs-built_in">console</span>.log(box.style);

    box.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

        <span class="hljs-comment">//2. 可以通过style来设置样式, 如果获取的时候有单位，设置的时候也要有单位</span>
        box.style.width = <span class="hljs-string">"800px"</span>;

        <span class="hljs-comment">//3. background-color这种样式需要变成驼峰命名法</span>
        box.style.backgroundColor = <span class="hljs-string">"#A6D0E4"</span>;
    }

    <span class="hljs-comment">//4. 获取的时候，只能获取行内样式  style通常只是用来设置样式的，很少用来获取样式。</span>
    <span class="hljs-built_in">console</span>.log(box.style.width); <span class="hljs-comment">// 800</span>
    <span class="hljs-built_in">console</span>.log(box.style.height); <span class="hljs-comment">// 空 行内里没有这个属性</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmabi1eteig20mj05ujre.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmabi1eteig20mj05ujre.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">8.2 样式操作案例</h3>
<p><strong>1、模仿看电影时页面开关灯案例：</strong> <em>[20-样式操作-开关灯案例.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分-->
<button id=&quot;btn&quot;>关灯</button>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    btn.onclick = function() {
        if (btn.innerText == &quot;关灯&quot;) {
            //把body的背景颜色改成黑色 可以直接通过  document.body
            document.body.style.backgroundColor = &quot;#000&quot;;
            btn.innerText = &quot;开灯&quot;;
            btn.style.color = &quot;red&quot;;
        } else {
            document.body.style.backgroundColor = &quot;#fff&quot;;
            btn.innerText = &quot;关灯&quot;;
            btn.style.color = &quot;#000&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>关灯<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (btn.innerText == <span class="hljs-string">"关灯"</span>) {
            <span class="hljs-comment">//把body的背景颜色改成黑色 可以直接通过  document.body</span>
            <span class="hljs-built_in">document</span>.body.style.backgroundColor = <span class="hljs-string">"#000"</span>;
            btn.innerText = <span class="hljs-string">"开灯"</span>;
            btn.style.color = <span class="hljs-string">"red"</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">document</span>.body.style.backgroundColor = <span class="hljs-string">"#fff"</span>;
            btn.innerText = <span class="hljs-string">"关灯"</span>;
            btn.style.color = <span class="hljs-string">"#000"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4iewzxt9g20870660sy.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4iewzxt9g20870660sy.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2、百度换肤案例：</strong> <em>[21-样式操作-百度换肤案例.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分 -->
<style>
    * {
        margin: 0px;
        padding: 0px;
    }
    
    body {
        background-image: url(image/百度换肤/1.jpg);
        background-size: cover;
    }
    
    #nav {
        background-color: rgba(255, 255, 255, 0.3);
        height: 200px;
        text-align: center;
    }
    
    #nav img {
        width: 200px;
        margin-top: 35px;
        cursor: pointer;
    }
</style>

<!-- html 部分 -->
<div id=&quot;nav&quot;>
    <img src=&quot;../image/百度换肤/1.jpg&quot; alt=&quot;&quot;>
    <img src=&quot;../image/百度换肤/2.jpg&quot; alt=&quot;&quot;>
    <img src=&quot;../image/百度换肤/3.jpg&quot; alt=&quot;&quot;>
    <img src=&quot;../image/百度换肤/4.jpg&quot; alt=&quot;&quot;>
    <img src=&quot;../image/百度换肤/5.jpg&quot; alt=&quot;&quot;>
</div>

<!-- js 部分 -->
<script>
    var nav = document.getElementById('nav');
    var imgs = nav.children;

    // 给所有的img注册点击事件
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onclick = function() {
            // 改变body的背景图片
            document.body.style.backgroundImage = &quot;url(&quot; + this.src + &quot;)&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
    }
    
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(image/百度换肤/1.jpg);
        <span class="hljs-attribute">background-size</span>: cover;
    }
    
    <span class="hljs-selector-id">#nav</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.3);
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    
    <span class="hljs-selector-id">#nav</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/百度换肤/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/百度换肤/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/百度换肤/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/百度换肤/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/百度换肤/5.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> nav = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'nav'</span>);
    <span class="hljs-keyword">var</span> imgs = nav.children;

    <span class="hljs-comment">// 给所有的img注册点击事件</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; imgs.length; i++) {
        imgs[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 改变body的背景图片</span>
            <span class="hljs-built_in">document</span>.body.style.backgroundImage = <span class="hljs-string">"url("</span> + <span class="hljs-keyword">this</span>.src + <span class="hljs-string">")"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4iwsaheog20t20e4tr4.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4iwsaheog20t20e4tr4.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、点击隐藏淘宝二维码</strong> <em>[22-样式操作-淘宝二维码.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分 -->
<style>
    .box {
        border: 1px solid #D9D9D9;
        margin: 100px auto;
        position: relative;
        width: 107px;
    }
    
    #close {
        display: block;
        border: 1px solid #D9D9D9;
        width: 14px;
        height: 14px;
        float: right;
        line-height: 14px;
        text-align: center;
        color: #D6D6D6;
        cursor: pointer;
        position: absolute;
        top: -1px;
        left: -16px;
    }
</style>

<!-- html 部分 -->
<div class=&quot;box&quot;>
    <img src=&quot;../image/淘宝二维码/taobao.jpg&quot; alt=&quot;&quot; />
    <span id=&quot;close&quot;>×</span>
</div>

<!-- js 部分 -->
<script>
    var close = document.getElementById('close');
    close.onclick = function() {
        // 点击的父节点样式设置为none
        this.parentNode.style.display = &quot;none&quot;;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#D9D9D9</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">107px</span>;
    }
    
    <span class="hljs-selector-id">#close</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#D9D9D9</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">float</span>: right;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#D6D6D6</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">1px</span>;
        <span class="hljs-attribute">left</span>: -<span class="hljs-number">16px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/淘宝二维码/taobao.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"close"</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> close = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'close'</span>);
    close.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击的父节点样式设置为none</span>
        <span class="hljs-keyword">this</span>.parentNode.style.display = <span class="hljs-string">"none"</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4jmys5odg204p04b0sy.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4jmys5odg204p04b0sy.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、当前文本框高亮显示</strong> <em>[23-样式操作-当前文本框高亮显示.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<input type=&quot;text&quot;><br>
<input type=&quot;text&quot;><br>
<input type=&quot;text&quot;><br>
<input type=&quot;text&quot;><br>
<input type=&quot;text&quot;><br>
<input type=&quot;text&quot;><br>
<input type=&quot;text&quot;><br>

<!-- js 部分 -->
<script>
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
    // 1-排他解决
        /* inputs[i].onclick = function() {
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].style.backgroundColor = &quot;&quot;;
            }
            this.style.backgroundColor = &quot;cyan&quot;;
        } */

    // 2-两个新事件 onfocus onblur
        // 获得焦点时触发的事件
        inputs[i].onfocus = function() {
            this.style.backgroundColor = &quot;hotpink&quot;;
        }
        // 失去焦点时触发的事件
        inputs[i].onblur = function() {
            this.style.backgroundColor = &quot;&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> inputs = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'input'</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; inputs.length; i++) {
    <span class="hljs-comment">// 1-排他解决</span>
        <span class="hljs-comment">/* inputs[i].onclick = function() {
            for (var i = 0; i &lt; inputs.length; i++) {
                inputs[i].style.backgroundColor = "";
            }
            this.style.backgroundColor = "cyan";
        } */</span>

    <span class="hljs-comment">// 2-两个新事件 onfocus onblur</span>
        <span class="hljs-comment">// 获得焦点时触发的事件</span>
        inputs[i].onfocus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.style.backgroundColor = <span class="hljs-string">"hotpink"</span>;
        }
        <span class="hljs-comment">// 失去焦点时触发的事件</span>
        inputs[i].onblur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.style.backgroundColor = <span class="hljs-string">""</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4kaypc31g205s059jru.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4kaypc31g205s059jru.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>5、表格隔行变色(鼠标经过触发)效果：</strong> <em>[24-样式操作-表格隔行变色.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分 -->
<style>
    * {
        padding: 0;
        margin: 0;
    }
    #box {
        width: 500px;
        margin: 100px auto 0;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
        border: 1px solid #c0c0c0;
        width: 500px;
    }
    th,
    td {
        border: 1px solid #d0d0d0;
        color: #404060;
        padding: 10px;
    }
    th {
        background-color: #CC376D;
        font: bold 16px &quot;微软雅黑&quot;;
        color: #fff;
    }
    td {
        font: 14px &quot;微软雅黑&quot;;
        text-align: center;
    }
    tbody tr {
        background-color: #f0f0f0;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <table>
        <thead>
            <tr>
                <th>序号</th>
                <th>英雄</th>
                <th>技能</th>
            </tr>
        </thead>
        <tbody id=&quot;tb&quot;>
            <tr>
                <td>1</td>
                <td>芈月</td>
                <td>永生之血</td>
            </tr>
            <tr>
                <td>2</td>
                <td>貂蝉</td>
                <td>语·花印</td>
            </tr>
            <tr>
                <td>3</td>
                <td>大乔</td>
                <td>川流不息</td>
            </tr>
            <tr>
                <td>4</td>
                <td>甄姬</td>
                <td>凝泪成冰</td>
            </tr>
        </tbody>
    </table>
</div>

<!-- js 部分 -->
<script>
    var tb = document.getElementById('tb');
    // 获取tbody下的所有子元素
    var trs = tb.children;

    // 隔行变色
    for (var i = 0; i < trs.length; i++) {
        if (i % 2 == 0) {
            trs[i].style.backgroundColor = &quot;#FFC77F&quot;;
        } else {
            trs[i].style.backgroundColor = &quot;#FFE5B9&quot;;

        }
        //注册鼠标经过事件，变颜色
        //需要存下来原来的颜色， 需要用一个全局变量来存
        var oldColor = null;
        trs[i].onmouseover = function() {
            // 获取原来的背景色，并储存在变量中
            oldColor = this.style.backgroundColor;
            this.style.backgroundColor = &quot;#D1F386&quot;;
        };
        //鼠标离开 恢复原来的颜色
        trs[i].onmouseout = function() {
            this.style.backgroundColor = oldColor;
        };
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">table</span> {
        <span class="hljs-attribute">border-collapse</span>: collapse;
        <span class="hljs-attribute">border-spacing</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#c0c0c0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
    }
    <span class="hljs-selector-tag">th</span>,
    <span class="hljs-selector-tag">td</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#d0d0d0</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#404060</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    }
    <span class="hljs-selector-tag">th</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CC376D</span>;
        <span class="hljs-attribute">font</span>: bold <span class="hljs-number">16px</span> <span class="hljs-string">"微软雅黑"</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-tag">td</span> {
        <span class="hljs-attribute">font</span>: <span class="hljs-number">14px</span> <span class="hljs-string">"微软雅黑"</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-tag">tbody</span> <span class="hljs-selector-tag">tr</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f0f0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>序号<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>英雄<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>技能<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tb"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>芈月<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>永生之血<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>貂蝉<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>语·花印<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>大乔<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>川流不息<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>甄姬<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>凝泪成冰<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> tb = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'tb'</span>);
    <span class="hljs-comment">// 获取tbody下的所有子元素</span>
    <span class="hljs-keyword">var</span> trs = tb.children;

    <span class="hljs-comment">// 隔行变色</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; trs.length; i++) {
        <span class="hljs-keyword">if</span> (i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>) {
            trs[i].style.backgroundColor = <span class="hljs-string">"#FFC77F"</span>;
        } <span class="hljs-keyword">else</span> {
            trs[i].style.backgroundColor = <span class="hljs-string">"#FFE5B9"</span>;

        }
        <span class="hljs-comment">//注册鼠标经过事件，变颜色</span>
        <span class="hljs-comment">//需要存下来原来的颜色， 需要用一个全局变量来存</span>
        <span class="hljs-keyword">var</span> oldColor = <span class="hljs-literal">null</span>;
        trs[i].onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取原来的背景色，并储存在变量中</span>
            oldColor = <span class="hljs-keyword">this</span>.style.backgroundColor;
            <span class="hljs-keyword">this</span>.style.backgroundColor = <span class="hljs-string">"#D1F386"</span>;
        };
        <span class="hljs-comment">//鼠标离开 恢复原来的颜色</span>
        trs[i].onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.style.backgroundColor = oldColor;
        };
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fmac99nfs8g20ee06owfa.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fmac99nfs8g20ee06owfa.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>6、修改不透明度</strong> <em>[25-样式操作-不透明度.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分 -->
<style>
    #box {
        width: 300px;
        height: 300px;
        background: #FFCD00;
        line-height: 300px;
        font-size: 20px;
        text-align: center;
        margin: 100px auto;
        position: relative;
    }
    
    #small-box {
        width: 150px;
        height: 150px;
        background: #FF8356;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -75px;
        margin-top: -75px;
    }
    
    button {
        display: block;
        margin: -90px auto;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    你看不见我！
    <div id=&quot;small-box&quot;></div>
</div>

<!-- js 部分 -->
<script>
    var smallBox = document.getElementById('small-box');

    smallBox.onmouseover = function() {
        /*!*IE678不支持*!*/
        /*opacity: .5;*/
        
        /*!*IE678支持这个*!*/
        /*filter: alpha(opacity = 50);*/
        this.style.opacity = &quot;0.5&quot;;
        this.style.filter = &quot;alpha(opacity = 50)&quot;;
    }
    smallBox.onmouseout = function() {
        this.style.opacity = &quot;1&quot;;
        this.style.filter = &quot;alpha(opacity = 100)&quot;;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FFCD00</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
    }
    
    <span class="hljs-selector-id">#small-box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FF8356</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">75px</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">75px</span>;
    }
    
    <span class="hljs-selector-tag">button</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">margin</span>: -<span class="hljs-number">90px</span> auto;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    你看不见我！
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"small-box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> smallBox = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'small-box'</span>);

    smallBox.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">/*!*IE678不支持*!*/</span>
        <span class="hljs-comment">/*opacity: .5;*/</span>
        
        <span class="hljs-comment">/*!*IE678支持这个*!*/</span>
        <span class="hljs-comment">/*filter: alpha(opacity = 50);*/</span>
        <span class="hljs-keyword">this</span>.style.opacity = <span class="hljs-string">"0.5"</span>;
        <span class="hljs-keyword">this</span>.style.filter = <span class="hljs-string">"alpha(opacity = 50)"</span>;
    }
    smallBox.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.style.opacity = <span class="hljs-string">"1"</span>;
        <span class="hljs-keyword">this</span>.style.filter = <span class="hljs-string">"alpha(opacity = 100)"</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4mo9pet1g209208zwei.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4mo9pet1g209208zwei.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>7、随机设置盒子的位置</strong> <em>[26-样式操作-随机盒子位置.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分-->
<style>
    div {
        width: 100px;
        height: 100px;
        background: #FFCD00;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot; title=&quot;点我啊！&quot;></div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');

    box.onclick = function() {
        // 相对于页面body 进行定位
        box.style.position = 'absolute';
        // left 范围 100-600
        var x = parseInt(Math.random() * 501) + 100;
        // 有单位的一定要加上单位
        box.style.left = x + &quot;px&quot;;

        // top 范围 50-350
        var y = parseInt(Math.random() * 301) + 50;
        box.style.top = y + &quot;px&quot;;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FFCD00</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"点我啊！"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    box.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 相对于页面body 进行定位</span>
        box.style.position = <span class="hljs-string">'absolute'</span>;
        <span class="hljs-comment">// left 范围 100-600</span>
        <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">501</span>) + <span class="hljs-number">100</span>;
        <span class="hljs-comment">// 有单位的一定要加上单位</span>
        box.style.left = x + <span class="hljs-string">"px"</span>;

        <span class="hljs-comment">// top 范围 50-350</span>
        <span class="hljs-keyword">var</span> y = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">301</span>) + <span class="hljs-number">50</span>;
        box.style.top = y + <span class="hljs-string">"px"</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4n8r75ntg20sq0ffjs5.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4n8r75ntg20sq0ffjs5.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>8、点击盒子增加对应盒子的层级：</strong> <em>[27-样式操作-点击增加层级.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分 -->
<style>
    div {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .one {
        background-color: #F54D42;
    }
    .two {
        background-color: #FF8356;
        margin: 80px;
    }
    .three {
        background-color: #FFCD00;
        margin: 160px;
    }
</style>

<!-- html 部分 -->
<div class=&quot;one&quot;></div>
<div class=&quot;two&quot;></div>
<div class=&quot;three&quot;></div>

<!-- js 部分 -->
<script>
    var divs = document.getElementsByTagName('div');
    // 变量用于存放层级
    var zIndex = 0;
    // 给每个盒子注册点击事件
    for (var i = 0; i < divs.length; i++) {
        divs[i].onclick = function() {
            // 点击 增加层级
            this.style.zIndex = ++zIndex;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.one</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F54D42</span>;
    }
    <span class="hljs-selector-class">.two</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FF8356</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">80px</span>;
    }
    <span class="hljs-selector-class">.three</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FFCD00</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">160px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"one"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"three"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> divs = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>);
    <span class="hljs-comment">// 变量用于存放层级</span>
    <span class="hljs-keyword">var</span> zIndex = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// 给每个盒子注册点击事件</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; divs.length; i++) {
        divs[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击 增加层级</span>
            <span class="hljs-keyword">this</span>.style.zIndex = ++zIndex;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4nnhl0jmg20e40akaan.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4nnhl0jmg20e40akaan.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>9、随机生成位置与层级，并且层级可点：</strong> <em>[28-样式操作-获取随机位置、层级随机.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- css 部分-->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    #box {
        width: 1000px;
        height: 600px;
        border: 2px solid #1DCD9F;
        box-shadow: 2px 2px 1px #1DCD9F;
        margin: 20px auto;
        position: relative;
    }
    #box div {
        width: 200px;
        height: 200px;
        position: absolute;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    var divs = box.children;
    // 定义随机的颜色
    var colors = [&quot;#FFCE00&quot;, &quot;#E73E51&quot;, &quot;#EED690&quot;, &quot;#FFECDA&quot;, &quot;#D4A5A5&quot;, &quot;#E3F3F7&quot;, &quot;#CBF078&quot;, &quot;#ECEBFF&quot;, &quot;#C7E78B&quot;, &quot;#D6E4F0&quot;, &quot;#8FECC8&quot;];

    var zIndex = 0;
    
    for (var i = 0; i < divs.length; i++) {
        // 随机颜色
        var randomColor = colors[parseInt(Math.random() * colors.length)];
        divs[i].style.backgroundColor = randomColor;
        // 随机位置
        // h: 0-400  w: 0-800 
        var x = parseInt(Math.random() * 801);
        divs[i].style.left = x + &quot;px&quot;;
        var y = parseInt(Math.random() * 401);
        divs[i].style.top = y + &quot;px&quot;;

        // 点击某一个盒子 层级增加
        divs[i].onclick = function() {
            this.style.zIndex = ++zIndex;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- css 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#1DCD9F</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#1DCD9F</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-id">#box</span> <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> divs = box.children;
    <span class="hljs-comment">// 定义随机的颜色</span>
    <span class="hljs-keyword">var</span> colors = [<span class="hljs-string">"#FFCE00"</span>, <span class="hljs-string">"#E73E51"</span>, <span class="hljs-string">"#EED690"</span>, <span class="hljs-string">"#FFECDA"</span>, <span class="hljs-string">"#D4A5A5"</span>, <span class="hljs-string">"#E3F3F7"</span>, <span class="hljs-string">"#CBF078"</span>, <span class="hljs-string">"#ECEBFF"</span>, <span class="hljs-string">"#C7E78B"</span>, <span class="hljs-string">"#D6E4F0"</span>, <span class="hljs-string">"#8FECC8"</span>];

    <span class="hljs-keyword">var</span> zIndex = <span class="hljs-number">0</span>;
    
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; divs.length; i++) {
        <span class="hljs-comment">// 随机颜色</span>
        <span class="hljs-keyword">var</span> randomColor = colors[<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * colors.length)];
        divs[i].style.backgroundColor = randomColor;
        <span class="hljs-comment">// 随机位置</span>
        <span class="hljs-comment">// h: 0-400  w: 0-800 </span>
        <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">801</span>);
        divs[i].style.left = x + <span class="hljs-string">"px"</span>;
        <span class="hljs-keyword">var</span> y = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">401</span>);
        divs[i].style.top = y + <span class="hljs-string">"px"</span>;

        <span class="hljs-comment">// 点击某一个盒子 层级增加</span>
        divs[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.style.zIndex = ++zIndex;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4q37i4wwg20e408vgn0.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4q37i4wwg20e408vgn0.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>10、手风琴</strong> <em>[29-样式操作-手风琴.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        padding: 0;
        margin: 0;
    }
    ul {
        list-style-type: none;
        margin: 100px auto;
    }
    .parentWrap {
        width: 250px;
        text-align: center;
    }
    .menuGroup {
        border: 1px solid #8FBAF3;
        background-color: #BDF1F6;
    }
    .groupTitle {
        display: block;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        border-bottom: 1px solid #77628C;
        cursor: pointer;
    }
    .menuGroup>div {
        height: 200px;
        background-color: #F2FCFC;
        display: none;
    }
</style>

<!-- html部分 -->
<ul class=&quot;parentWrap&quot;>
    <li class=&quot;menuGroup&quot;>
        <span class=&quot;groupTitle&quot;>标题1</span>
        <div>我是弹出来的div1</div>
    </li>
    <li class=&quot;menuGroup&quot;>
        <span class=&quot;groupTitle&quot;>标题2</span>
        <div>我是弹出来的div2</div>
    </li>
    <li class=&quot;menuGroup&quot;>
        <span class=&quot;groupTitle&quot;>标题3</span>
        <div>我是弹出来的div3</div>
    </li>
    <li class=&quot;menuGroup&quot;>
        <span class=&quot;groupTitle&quot;>标题4</span>
        <div>我是弹出来的div4</div>
    </li>
</ul>

<!-- js部分 -->
<script>
    var spans = document.getElementsByClassName('groupTitle');
    for (var i = 0; i < spans.length; i++) {
        // 给所有 span标题注册点击事件
        spans[i].onclick = function() {
            // 让所有span 的下一个兄弟元素 隐藏
            for (var i = 0; i < spans.length; i++) {
                spans[i].nextElementSibling.style.display = &quot;none&quot;;
            }
            // 当前点击的span 的下一个兄弟元素 显示
            this.nextElementSibling.style.display = &quot;block&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">list-style-type</span>: none;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
    }
    <span class="hljs-selector-class">.parentWrap</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">250px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-class">.menuGroup</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#8FBAF3</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#BDF1F6</span>;
    }
    <span class="hljs-selector-class">.groupTitle</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#77628C</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-class">.menuGroup</span>&gt;<span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F2FCFC</span>;
        <span class="hljs-attribute">display</span>: none;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parentWrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menuGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"groupTitle"</span>&gt;</span>标题1<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弹出来的div1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menuGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"groupTitle"</span>&gt;</span>标题2<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弹出来的div2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menuGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"groupTitle"</span>&gt;</span>标题3<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弹出来的div3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menuGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"groupTitle"</span>&gt;</span>标题4<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是弹出来的div4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> spans = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'groupTitle'</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; spans.length; i++) {
        <span class="hljs-comment">// 给所有 span标题注册点击事件</span>
        spans[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 让所有span 的下一个兄弟元素 隐藏</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; spans.length; i++) {
                spans[i].nextElementSibling.style.display = <span class="hljs-string">"none"</span>;
            }
            <span class="hljs-comment">// 当前点击的span 的下一个兄弟元素 显示</span>
            <span class="hljs-keyword">this</span>.nextElementSibling.style.display = <span class="hljs-string">"block"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4qkkjytdg20e409sjry.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4qkkjytdg20e409sjry.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>11、高亮显示</strong> <em>[30-样式操作-高亮显示.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    ul {
        list-style: none;
    }
    body {
        background-color: #000;
    }
    .wrap {
        margin: 100px auto 0;
        width: 606px;
        background: #000;
        overflow: hidden;
        border: 1px solid #fff;
    }
    .wrap li {
        float: left;
        border: 1px solid #000;
    }
    .wrap img {
        display: block;
        border: 0;
    }
</style>

<!-- html 部分 -->
<div id=&quot;wrap&quot; class=&quot;wrap&quot;>
    <ul>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示效果/01.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示效果/02.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示效果/03.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示效果/04.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示效果/05.jpg&quot; alt=&quot;&quot; /></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/高亮显示效果/06.jpg&quot; alt=&quot;&quot; /></a>
        </li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    var wrap = document.getElementById('wrap');
    var lis = wrap.children[0].children;

    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            // 排他，全部不透明度为0.4
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.opacity = &quot;0.4&quot;;
                lis[i].style.filter = &quot;alpha(opacity = 40)&quot;;
            }
            // 当前鼠标悬停位置 不透明度为1
            this.style.opacity = &quot;1&quot;;
            this.style.filter = &quot;alpha(opacity = 100)&quot;;
        }

    }
    // 鼠标离开大盒子的时候 不透明度全部为1
    wrap.onmouseout = function() {
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.opacity = &quot;1&quot;;
            lis[i].style.filter = &quot;alpha(opacity = 100)&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#000</span>;
    }
    <span class="hljs-selector-class">.wrap</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">606px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-class">.wrap</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    }
    <span class="hljs-selector-class">.wrap</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示效果/01.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示效果/02.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示效果/03.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示效果/04.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示效果/05.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/高亮显示效果/06.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> wrap = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'wrap'</span>);
    <span class="hljs-keyword">var</span> lis = wrap.children[<span class="hljs-number">0</span>].children;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
        lis[i].onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 排他，全部不透明度为0.4</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
                lis[i].style.opacity = <span class="hljs-string">"0.4"</span>;
                lis[i].style.filter = <span class="hljs-string">"alpha(opacity = 40)"</span>;
            }
            <span class="hljs-comment">// 当前鼠标悬停位置 不透明度为1</span>
            <span class="hljs-keyword">this</span>.style.opacity = <span class="hljs-string">"1"</span>;
            <span class="hljs-keyword">this</span>.style.filter = <span class="hljs-string">"alpha(opacity = 100)"</span>;
        }

    }
    <span class="hljs-comment">// 鼠标离开大盒子的时候 不透明度全部为1</span>
    wrap.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; lis.length; i++) {
            lis[i].style.opacity = <span class="hljs-string">"1"</span>;
            lis[i].style.filter = <span class="hljs-string">"alpha(opacity = 100)"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong>../</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4s6myrkig20dg09741b.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4s6myrkig20dg09741b.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">9. 动态创建元素</h2>
<h3 id="articleHeader7">9.1 克隆节点</h3>
<p><strong>语法</strong>：<code>var newNode = node.cloneNode(deep)</code></p>
<p><strong>功能</strong>：在内存中克隆一份节点</p>
<p><strong>参数</strong>：<code>deep</code></p>
<ul>
<li>
<code>false</code>：默认值：是浅复制，只会复制标签，节点本身，不会复制节点的孩子。</li>
<li>
<code>true</code>:深度复制，会复制标签，还会复制标签的所有内容</li>
</ul>
<p><strong>注意：</strong></p>
<ul>
<li>克隆出来的节点跟原来的节点没有关系了，修改了也不会相互影响。</li>
<li>如果克隆的节点带了<code>id</code>，我们需要给<code>id</code>重新设置一个值，不让<code>id</code>冲突</li>
</ul>
<p><strong>示例代码：</strong> <em>[31-克隆节点.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div id=&quot;box&quot;>
    <span>我是子元素</span>
</div>
<p id=&quot;title&quot;>这里是p标签</p>

<!-- js部分 -->
<script>
    var p = document.getElementById('title');
    var box = document.getElementById('box');
    // 克隆上面的两个节点
    var newDiv = box.cloneNode(true);
    var newP = p.cloneNode(true);
    newP.id = &quot;title2&quot;;     // 修改了id，防止id冲突
    console.log(newDiv);    // <div id=&quot;box&quot;><span>我是子元素</span>w</div>
    console.log(newP);      // <p id=&quot;title2&quot;>这里是p标签</p>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>我是子元素<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span>&gt;</span>这里是p标签<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'title'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-comment">// 克隆上面的两个节点</span>
    <span class="hljs-keyword">var</span> newDiv = box.cloneNode(<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">var</span> newP = p.cloneNode(<span class="hljs-literal">true</span>);
    newP.id = <span class="hljs-string">"title2"</span>;     <span class="hljs-comment">// 修改了id，防止id冲突</span>
    <span class="hljs-built_in">console</span>.log(newDiv);    <span class="hljs-comment">// &lt;div id="box"&gt;&lt;span&gt;我是子元素&lt;/span&gt;w&lt;/div&gt;</span>
    <span class="hljs-built_in">console</span>.log(newP);      <span class="hljs-comment">// &lt;p id="title2"&gt;这里是p标签&lt;/p&gt;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader8">9.2 添加节点</h3>
<h4>9.2.1 appendChild</h4>
<p><strong>语法</strong>：<code>parent.appendChild(newChild);</code></p>
<ul>
<li>
<code>parent</code>:调用者，父节点来调用</li>
<li>
<code>newChild</code>:需要添加的那个孩子。</li>
</ul>
<p><strong>作用</strong>：把<code>newChild</code>添加到<code>parent</code>的孩子的最<code>后</code>面。</p>
<p><em>如果添加的是页面中本来就存在的元素，是一个剪切的效果，原来的就不在了。</em></p>
<p><strong>示例代码：</strong> <em>[32-添加节点.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        width: 200px;
        height: 200px;
        background-color: pink;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <span>我是子元素</span>
</div>
<p id=&quot;des&quot;>这里是p标签</p>
<i id=&quot;title&quot;>这里是i标签</p>

<!-- js部分 -->
<script>
    var p = document.getElementById('des');
    var i = document.getElementById('title');
    var box = document.getElementById('box');
    // 克隆上面的两个节点
    var newP = p.cloneNode(true);
    newP.id = &quot;des2&quot;; // 修改了id，防止id冲突
    // 将newP添加到box中
    box.appendChild(newP);
    // 将i标签添加到box里 这里相当于一个剪切的效果
    box.appendChild(i);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: pink;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>我是子元素<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des"</span>&gt;</span>这里是p标签<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span>&gt;</span>这里是i标签<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'des'</span>);
    <span class="hljs-keyword">var</span> i = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'title'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-comment">// 克隆上面的两个节点</span>
    <span class="hljs-keyword">var</span> newP = p.cloneNode(<span class="hljs-literal">true</span>);
    newP.id = <span class="hljs-string">"des2"</span>; <span class="hljs-comment">// 修改了id，防止id冲突</span>
    <span class="hljs-comment">// 将newP添加到box中</span>
    box.appendChild(newP);
    <span class="hljs-comment">// 将i标签添加到box里 这里相当于一个剪切的效果</span>
    box.appendChild(i);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4tfxsdh3j206w06xa9x.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4tfxsdh3j206w06xa9x.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>9.2.2 insertBefore</h4>
<p><strong>语法</strong>：<code>parent.insertBefore(newChild, refChild);</code></p>
<ul>
<li>
<code>parent</code>:必须要父节点来调用</li>
<li>
<code>newChild</code>：需要添加的那个节点</li>
<li>
<code>refChild</code>:添加到哪一个节点的前面。</li>
</ul>
<p><strong>示例代码：</strong> <em>[33-添加节点-insertBefore.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html部分 -->
<ul id=&quot;wrap&quot;>
    <li>大乔</li>
    <li id=&quot;xq&quot;>小乔</li>
    <li>阿珂</li>
    <li>甄姬</li>
</ul>

<li id=&quot;nw&quot;>女娲</li>
<li id=&quot;ln&quot;>露娜</li>
<li id=&quot;dj&quot;>妲己</li>


<!-- js部分 -->
<script>
    var wrap = document.getElementById('wrap');
    var xq = document.getElementById('xq');
    var nw = document.getElementById('nw');
    var ln = document.getElementById('ln');
    var dj = document.getElementById('dj');

    // 1. insertBefore 可以在任意指定位置添加
    // 将女娲添加到小乔前面
    wrap.insertBefore(nw, xq);

    // 2. insertBefore 添加到最前面 wrap.children[0]
    // 将露娜添加到最前面
    wrap.insertBefore(ln, wrap.children[0]);

    // 3. insertBefore 第二个参数null时，默认在最后面添加
    // 将妲己添加到最后面
    wrap.insertBefore(dj, null);
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>大乔<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"xq"</span>&gt;</span>小乔<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>阿珂<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>甄姬<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nw"</span>&gt;</span>女娲<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ln"</span>&gt;</span>露娜<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dj"</span>&gt;</span>妲己<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>


<span class="hljs-comment">&lt;!-- js部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> wrap = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'wrap'</span>);
    <span class="hljs-keyword">var</span> xq = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'xq'</span>);
    <span class="hljs-keyword">var</span> nw = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'nw'</span>);
    <span class="hljs-keyword">var</span> ln = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ln'</span>);
    <span class="hljs-keyword">var</span> dj = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'dj'</span>);

    <span class="hljs-comment">// 1. insertBefore 可以在任意指定位置添加</span>
    <span class="hljs-comment">// 将女娲添加到小乔前面</span>
    wrap.insertBefore(nw, xq);

    <span class="hljs-comment">// 2. insertBefore 添加到最前面 wrap.children[0]</span>
    <span class="hljs-comment">// 将露娜添加到最前面</span>
    wrap.insertBefore(ln, wrap.children[<span class="hljs-number">0</span>]);

    <span class="hljs-comment">// 3. insertBefore 第二个参数null时，默认在最后面添加</span>
    <span class="hljs-comment">// 将妲己添加到最后面</span>
    wrap.insertBefore(dj, <span class="hljs-literal">null</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4w0s596hj206o04ut8j.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4w0s596hj206o04ut8j.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm4vxpjhm2j206o04uweb.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm4vxpjhm2j206o04uweb.jpg" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">9.3 创建节点</h3>
<h4>9.3.1 document.write(基本不用)</h4>
<ul>
<li>可以生成新的节点，但是不推荐使用。如果页面已经加载完成了，你还是用<code>document.write</code>写内容的话，会把之前的页面给覆盖掉</li>
<li>原理：页面从上往下加载的时候，会开启一个文档流，当页面加载完，文档流就会关闭。</li>
<li>
<code>document.write</code>的本意就是在文档流上写入内容。如果页面没加载完成，文档流还是开着的，<code>document.write</code>直接在这个文档流上写东西</li>
<li>如果页面加载完成了，还是用<code>document.write</code>写东西，会重新开启一个新的文档流，往新的文档流上写东西，旧的文档流就被新的文档流覆盖了。</li>
</ul>
<p><strong>示例代码：</strong> <em>[34-创建节点-document.write.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div>呵呵呵</div>
<div>哈哈哈</div>
<div>嘻嘻嘻</div>
<button id=&quot;btn&quot;>加载完，document.write一下</button>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    // 创建一个节点
    document.write(&quot;<h2>嘿嘿嘿</h2>&quot;)

    // 页面加载完成后，再点击按钮触发document.write的时候，页面内容就会被覆盖
    btn.onclick = function() {
        document.write(&quot;<h2>叽叽叽</h2>&quot;)
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>呵呵呵<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>哈哈哈<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>嘻嘻嘻<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>加载完，document.write一下<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-comment">// 创建一个节点</span>
    <span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;h2&gt;嘿嘿嘿&lt;/h2&gt;"</span>)

    <span class="hljs-comment">// 页面加载完成后，再点击按钮触发document.write的时候，页面内容就会被覆盖</span>
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;h2&gt;叽叽叽&lt;/h2&gt;"</span>)
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5wwqjzswg206x04kjrj.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5wwqjzswg206x04kjrj.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>9.3.2 innerHTML</h4>
<blockquote>
<code>innerHTML</code>也可以创建节点。<code>innerHTML</code>创建节点的时候有一个特点，如果原来有内容的话，使用<code>innerHTML</code>会把原先的内容给干掉。</blockquote>
<p><strong>示例代码：</strong> <em>[35-创建节点-innerHTML.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        width: 300px;
        height: 300px;
        background: #E0FF59;
    }
</style>

<!-- html 部分 -->
<input type=&quot;button&quot; value=&quot;按钮&quot; id=&quot;btn&quot;>
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var btn = document.getElementById(&quot;btn&quot;);
    var box = document.getElementById(&quot;box&quot;);

    btn.onclick = function() {
        // innerHTML:也能达到创建元素的效果
        // 直接box.innerHTML = &quot;<button>我是一个按钮</button>&quot; 重复点击的时候不会继续创建下去，会把原来的覆盖掉
        // box.innerHTML 或取到之前的内容，然后与新创建的拼串，再一起添加进去
        box.innerHTML = box.innerHTML + &quot;<button>我是一个按钮</button>&quot;;
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#E0FF59</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"按钮"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"box"</span>);

    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// innerHTML:也能达到创建元素的效果</span>
        <span class="hljs-comment">// 直接box.innerHTML = "&lt;button&gt;我是一个按钮&lt;/button&gt;" 重复点击的时候不会继续创建下去，会把原来的覆盖掉</span>
        <span class="hljs-comment">// box.innerHTML 或取到之前的内容，然后与新创建的拼串，再一起添加进去</span>
        box.innerHTML = box.innerHTML + <span class="hljs-string">"&lt;button&gt;我是一个按钮&lt;/button&gt;"</span>;
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong><em>慎用</em></strong>：很容易出现效率问题，效率不高，多次使用，每次创建都会获取到之前的，然后拼接新添加的，再将原来的全部重新替换掉。</p>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5x9nw818g208i095aao.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5x9nw818g208i095aao.gif" alt="image" title="image" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5xr6nqbag208i08gdil.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5xr6nqbag208i08gdil.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>9.3.3 createElement</h4>
<p><strong>语法</strong>：<code>var element = document.createElement("tagName");</code></p>
<p><strong>作用</strong>：在内存里面创建了一个节点</p>
<p><strong>返回</strong>：一个元素</p>
<p><strong>示例代码：</strong> <em>[36-创建节点-createElement.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        width: 300px;
        height: 300px;
        background: #E0FF59;
    }
</style>

<!-- html 部分 -->
<input type=&quot;button&quot; value=&quot;创建&quot; id=&quot;btn&quot;>
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var box = document.getElementById(&quot;box&quot;);
    var btn = document.getElementById(&quot;btn&quot;);
    btn.onclick = function() {
        //1. 创建一个button
        var button = document.createElement(&quot;button&quot;);
        //2. 设置内容
        button.innerHTML = &quot;我是要给按钮&quot;;
        //3. 添加到box中
        box.appendChild(button);
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#E0FF59</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"创建"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"box"</span>);
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//1. 创建一个button</span>
        <span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"button"</span>);
        <span class="hljs-comment">//2. 设置内容</span>
        button.innerHTML = <span class="hljs-string">"我是要给按钮"</span>;
        <span class="hljs-comment">//3. 添加到box中</span>
        box.appendChild(button);
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>用途非常的广泛,不会影响效率。</em></p>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5xyw1du5g208i08g751.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5xyw1du5g208i08g751.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5xyw1jsqg208i08ggmf.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5xyw1jsqg208i08ggmf.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">9.4 删除节点</h3>
<p><strong>语法</strong>：<code>parent.removeChild(child);</code></p>
<p><strong>功能</strong>：由父盒子调用，删除里面的一个子元素。</p>
<p><strong>示例代码：</strong> <em>[37-删除节点.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        width: 200px;
        height: 200px;
        background-color: #E0FF59;
        text-align: center;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <p id=&quot;des&quot;>我是第一句话</p>
    <p>我是第二句话</p>
</div>

<button id=&quot;btn&quot;>点击移除第一句话</button>

<!-- js 部分 -->
<script>
    var btn = document.getElementById('btn');
    var box = document.getElementById('box');
    var des = box.children[0];

    btn.onclick = function() {
        box.removeChild(des);
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#E0FF59</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"des"</span>&gt;</span>我是第一句话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是第二句话<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击移除第一句话<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
    <span class="hljs-keyword">var</span> des = box.children[<span class="hljs-number">0</span>];

    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        box.removeChild(des);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5yzbin7pg205u06w0st.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5yzbin7pg205u06w0st.gif" alt="image" title="image" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5yzbhg23j207m01bwea.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5yzbhg23j207m01bwea.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>removeChild 与 display:"none"的区别</strong></p>
<ul>
<li>
<code>removeChild</code>删除的是一个节点，你删除了，在页面中就不会再有这个节点了</li>
<li>
<code>display:"none"</code>只是隐藏一个元素，元素隐藏了，在页面中看不见，但是节点还是存在页面中的</li>
</ul>
<h3 id="articleHeader11">9.5 动态创建元素综合练习</h3>
<p><strong>1、选好友案例：</strong> <em>[38-动态创建元素-选好友.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    select {
        height: 300px;
        width: 80px;
        overflow: hidden;
        text-align: center;
        font-size: 18px;
        background-color: #F1E9E3;
    }
</style>

<!-- html 部分 -->
<select id=&quot;left&quot; multiple>
    <option>大乔0</option>
    <option>小乔1</option>
    <option>甄姬2</option>
    <option>虞姬3</option>
    <option>妲己4</option>
    <option>女娲5</option>
    <option>芈月6</option>
    <option>露娜7</option>
</select>

<button id=&quot;all-right&quot;>&amp;gt;&amp;gt;</button>
<button id=&quot;all-left&quot;>&amp;lt;&amp;lt;</button>
<button id=&quot;only-right&quot;>&amp;gt;</button>
<button id=&quot;only-left&quot;>&amp;lt;</button>

<select id=&quot;right&quot; multiple></select>

<!-- js 部分 -->
<script>
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var allRight = document.getElementById('all-right');
    var allLeft = document.getElementById('all-left');
    var onlyRight = document.getElementById('only-right');
    var onlyLeft = document.getElementById('only-left');

    // 全选往右按钮
    allRight.onclick = function() {
        // 获取左边所有的option
        var options = left.children;
        // appendChild 只能一个个添加，不能一次添加一个数组
        for (var i = 0; i < options.length; i++) {
            right.appendChild(options[i]);
            // 为什么要 --？，因为js执行是一步步往下执行的
            /* 
                i = 0 时 &quot;大乔0&quot;会被添加到右边去，此时options数组中就没有了下标为0项
                i = 1 原本的&quot;小乔1&quot;此时在数组中下标就为0了，但for循环下一次添加的时候，是添加下标为1的项，就是&quot;甄姬2&quot;
                所以你会看到，点击全选按钮，只有四项过去，原因就在上面
                i-- 的目的就是 添加时，下标会往后一次
             */
            i--;
        }
    };

    // 全选往左按钮
    allLeft.onclick = function() {
        var options = right.children;
        for (var i = 0; i < options.length; i++) {
            left.appendChild(options[i]);
            i--;
        }

    };

    // 选中的往右边
    onlyRight.onclick = function() {
        // 获取到左边所有的选项
        var options = left.children;
        for (var i = 0; i < options.length; i++) {
            // 判断左边的选中项(表单属性)
            if (options[i].selected) {
                // 如果是选中的 将它添加到右边
                right.appendChild(options[i]);
                i--;
            }
        }
    };

    // 选中的往左边
    onlyLeft.onclick = function() {
        var options = right.children;
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                left.appendChild(options[i]);
                i--;
            }
        }
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">select</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F1E9E3</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">multiple</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>大乔0<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>小乔1<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>甄姬2<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>虞姬3<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>妲己4<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>女娲5<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>芈月6<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>露娜7<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"all-right"</span>&gt;</span>&amp;gt;&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"all-left"</span>&gt;</span>&amp;lt;&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"only-right"</span>&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"only-left"</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">multiple</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> left = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'left'</span>);
    <span class="hljs-keyword">var</span> right = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'right'</span>);
    <span class="hljs-keyword">var</span> allRight = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'all-right'</span>);
    <span class="hljs-keyword">var</span> allLeft = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'all-left'</span>);
    <span class="hljs-keyword">var</span> onlyRight = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'only-right'</span>);
    <span class="hljs-keyword">var</span> onlyLeft = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'only-left'</span>);

    <span class="hljs-comment">// 全选往右按钮</span>
    allRight.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取左边所有的option</span>
        <span class="hljs-keyword">var</span> options = left.children;
        <span class="hljs-comment">// appendChild 只能一个个添加，不能一次添加一个数组</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; options.length; i++) {
            right.appendChild(options[i]);
            <span class="hljs-comment">// 为什么要 --？，因为js执行是一步步往下执行的</span>
            <span class="hljs-comment">/* 
                i = 0 时 "大乔0"会被添加到右边去，此时options数组中就没有了下标为0项
                i = 1 原本的"小乔1"此时在数组中下标就为0了，但for循环下一次添加的时候，是添加下标为1的项，就是"甄姬2"
                所以你会看到，点击全选按钮，只有四项过去，原因就在上面
                i-- 的目的就是 添加时，下标会往后一次
             */</span>
            i--;
        }
    };

    <span class="hljs-comment">// 全选往左按钮</span>
    allLeft.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> options = right.children;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; options.length; i++) {
            left.appendChild(options[i]);
            i--;
        }

    };

    <span class="hljs-comment">// 选中的往右边</span>
    onlyRight.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 获取到左边所有的选项</span>
        <span class="hljs-keyword">var</span> options = left.children;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; options.length; i++) {
            <span class="hljs-comment">// 判断左边的选中项(表单属性)</span>
            <span class="hljs-keyword">if</span> (options[i].selected) {
                <span class="hljs-comment">// 如果是选中的 将它添加到右边</span>
                right.appendChild(options[i]);
                i--;
            }
        }
    };

    <span class="hljs-comment">// 选中的往左边</span>
    onlyLeft.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> options = right.children;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; options.length; i++) {
            <span class="hljs-keyword">if</span> (options[i].selected) {
                left.appendChild(options[i]);
                i--;
            }
        }
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5ooeoga1g208g097q53.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5ooeoga1g208g097q53.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、动态创建新闻列表：</strong> <em>[39-动态创建元素-新闻列表.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #btn {
        display: block;
        margin: 100px auto;
        margin-bottom: 10px;
    }
    #box {
        width: 500px;
        height: 350px;
        border: 1px dashed #BD4682;
        margin: 10px auto;
    }
</style>

<!-- html 部分-->
<button id=&quot;btn&quot;>生成</button>
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    var arr = [
        '&quot;红船精神&quot; 理上网来 新时代 新气象 新作为',
        '互联网大会蓝皮书发布 中国数字经济规模全球第二',
        '教育部回应&quot;取消中考&quot;传言:不实 条件不具备',
        '中泰铁路12月下旬开工 昆明到曼谷将朝发夕至',
        '中消协约谈摩拜等共享单车企业:尽可能免收押金',
        '温度 | 成都81岁捡垃圾老太已被纳入关爱援助',
        '车晓前夫拒履行判决被限制出境 曾是山西首富',
        '首艘国产航母进入最后试验阶段 与辽宁舰有何不同',
        '揭秘：身价多少 才能参加乌镇的“大佬”饭局？',
        '西成高铁明日开通运营 首发车车票约半小时售罄',
        '离婚女子见网友失联 警方千里奔波解救却被撒狗粮',
        '西安回应38车相撞事故:接受批评 洒水将灵活调整',
        '魔鬼在人间，专骗救命钱',
        '儿子服毒割腕 父母第一句话问&quot;他包里有没有钱&quot;',
        '看完复联3预告片,为什么都在骂漫威？',
        '3年少卖80亿包，方便面的饭碗被谁抢了'
    ];

    var btn = document.getElementById('btn');
    var box = document.getElementById('box');

    // 点击&quot;生成&quot;，手动创建一个列表
    btn.onclick = function() {
        // 创建ul 添加到box中
        var ul = document.createElement(&quot;ul&quot;);
        box.appendChild(ul);

        // 根据arr里的数据 创建li
        for (var i = 0; i < arr.length; i++) {
            // 创建li
            var li = document.createElement(&quot;li&quot;);
            ul.appendChild(li);

            // 设置li的内容
            li.innerHTML = arr[i];

            // 隔行变色
            if (i % 2 == 0) {
                li.style.background = &quot;#F4E7D3&quot;;
            } else {
                li.style.background = &quot;#F9F8ED&quot;;
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-id">#btn</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> dashed <span class="hljs-number">#BD4682</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> auto;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>生成<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> arr = [
        <span class="hljs-string">'"红船精神" 理上网来 新时代 新气象 新作为'</span>,
        <span class="hljs-string">'互联网大会蓝皮书发布 中国数字经济规模全球第二'</span>,
        <span class="hljs-string">'教育部回应"取消中考"传言:不实 条件不具备'</span>,
        <span class="hljs-string">'中泰铁路12月下旬开工 昆明到曼谷将朝发夕至'</span>,
        <span class="hljs-string">'中消协约谈摩拜等共享单车企业:尽可能免收押金'</span>,
        <span class="hljs-string">'温度 | 成都81岁捡垃圾老太已被纳入关爱援助'</span>,
        <span class="hljs-string">'车晓前夫拒履行判决被限制出境 曾是山西首富'</span>,
        <span class="hljs-string">'首艘国产航母进入最后试验阶段 与辽宁舰有何不同'</span>,
        <span class="hljs-string">'揭秘：身价多少 才能参加乌镇的“大佬”饭局？'</span>,
        <span class="hljs-string">'西成高铁明日开通运营 首发车车票约半小时售罄'</span>,
        <span class="hljs-string">'离婚女子见网友失联 警方千里奔波解救却被撒狗粮'</span>,
        <span class="hljs-string">'西安回应38车相撞事故:接受批评 洒水将灵活调整'</span>,
        <span class="hljs-string">'魔鬼在人间，专骗救命钱'</span>,
        <span class="hljs-string">'儿子服毒割腕 父母第一句话问"他包里有没有钱"'</span>,
        <span class="hljs-string">'看完复联3预告片,为什么都在骂漫威？'</span>,
        <span class="hljs-string">'3年少卖80亿包，方便面的饭碗被谁抢了'</span>
    ];

    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    <span class="hljs-comment">// 点击"生成"，手动创建一个列表</span>
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 创建ul 添加到box中</span>
        <span class="hljs-keyword">var</span> ul = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"ul"</span>);
        box.appendChild(ul);

        <span class="hljs-comment">// 根据arr里的数据 创建li</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
            <span class="hljs-comment">// 创建li</span>
            <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"li"</span>);
            ul.appendChild(li);

            <span class="hljs-comment">// 设置li的内容</span>
            li.innerHTML = arr[i];

            <span class="hljs-comment">// 隔行变色</span>
            <span class="hljs-keyword">if</span> (i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>) {
                li.style.background = <span class="hljs-string">"#F4E7D3"</span>;
            } <span class="hljs-keyword">else</span> {
                li.style.background = <span class="hljs-string">"#F9F8ED"</span>;
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm5zvv5cgwg20e70awab1.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm5zvv5cgwg20e70awab1.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、微博发布案例：</strong> <em>[40-动态创建元素-微博发布.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .box {
        width: 600px;
        margin: 100px auto;
        border: 2px solid #000;
        padding: 20px;
        box-shadow: 2px 2px 4px #666;
    }
    textarea {
        width: 450px;
        height: 160px;
        outline: none;
        resize: none;
    }
    ul {
        width: 450px;
        padding-left: 70px;
    }
    ul li {
        line-height: 25px;
        border-bottom: 1px dashed #BD4682;
    }
    #del {
        float: right;
    }
</style>

<!-- html 部分 -->
<div class=&quot;box&quot; id=&quot;weibo&quot;>
    <span>微博发布</span>
    <textarea rows=&quot;10&quot; cols=&quot;30&quot; id=&quot;txt&quot;></textarea>
    <button id=&quot;btn&quot;>发布</button>
    <ul id=&quot;ul&quot;>

    </ul>
</div>

<!-- js 部分 -->
<script>
    var txt = document.getElementById('txt');
    var btn = document.getElementById('btn');
    var ul = document.getElementById('ul');

    // 给发布按钮注册点击事件
    btn.onclick = function() {
        var content = txt.value.trim();
        if (content.length == 0) {
            return;
        }

        // 创建li
        var li = document.createElement(&quot;li&quot;);
        // 把li添加到ul的最前面
        ul.insertBefore(li, ul.children[0]);
        // 把textarea的内容给li
        li.innerHTML = content;
        // 发布后textarea里面就应该没有文字了 这里content=&quot;&quot;是没有用的  content仅仅只是一个变量，用来存储textarea的value值
        txt.value = &quot;&quot;;

        // 添加一个删除按钮
        var button = document.createElement(&quot;button&quot;);
        button.innerHTML = &quot;删除&quot;;
        button.id = &quot;del&quot;;
        // 将删除按钮添加到li中
        li.appendChild(button);
        button.onclick = function() {
            // 点击删除按钮，移除ul下的li 这里的li是删除按钮的父节点
            ul.removeChild(this.parentNode);
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">4px</span> <span class="hljs-number">#666</span>;
    }
    <span class="hljs-selector-tag">textarea</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">450px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">160px</span>;
        <span class="hljs-attribute">outline</span>: none;
        <span class="hljs-attribute">resize</span>: none;
    }
    <span class="hljs-selector-tag">ul</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">450px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">70px</span>;
    }
    <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> dashed <span class="hljs-number">#BD4682</span>;
    }
    <span class="hljs-selector-id">#del</span> {
        <span class="hljs-attribute">float</span>: right;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"weibo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>微博发布<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">rows</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">cols</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"txt"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>发布<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ul"</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> txt = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'txt'</span>);
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> ul = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ul'</span>);

    <span class="hljs-comment">// 给发布按钮注册点击事件</span>
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> content = txt.value.trim();
        <span class="hljs-keyword">if</span> (content.length == <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span>;
        }

        <span class="hljs-comment">// 创建li</span>
        <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"li"</span>);
        <span class="hljs-comment">// 把li添加到ul的最前面</span>
        ul.insertBefore(li, ul.children[<span class="hljs-number">0</span>]);
        <span class="hljs-comment">// 把textarea的内容给li</span>
        li.innerHTML = content;
        <span class="hljs-comment">// 发布后textarea里面就应该没有文字了 这里content=""是没有用的  content仅仅只是一个变量，用来存储textarea的value值</span>
        txt.value = <span class="hljs-string">""</span>;

        <span class="hljs-comment">// 添加一个删除按钮</span>
        <span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"button"</span>);
        button.innerHTML = <span class="hljs-string">"删除"</span>;
        button.id = <span class="hljs-string">"del"</span>;
        <span class="hljs-comment">// 将删除按钮添加到li中</span>
        li.appendChild(button);
        button.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击删除按钮，移除ul下的li 这里的li是删除按钮的父节点</span>
            ul.removeChild(<span class="hljs-keyword">this</span>.parentNode);
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong> </p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm6102n57hg20iv0bb0y5.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm6102n57hg20iv0bb0y5.gif" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>4、许愿墙案例(一)：</strong> <em>[41-动态创建元素-许愿墙(一).html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    body {
        margin: 0 auto;
        padding: 0px;
        font-size: 12px;
        background: url(../image/许愿墙/bg.gif) repeat center 36px;
        text-align: center;
        background-color: #c30230;
    }
    #content {
        margin: 0 auto;
        width: 960px;
        background: url(../image/许愿墙/content_bg.jpg) no-repeat left top;
        height: 627px;
        position: relative;
    }
    #content .tip1 {
        position: absolute;
        width: 227px;
        left: 200px;
        top: 100px;
    }
    #content .tip1 .tip_h {
        background: url(../image/许愿墙/tip1_h.gif) no-repeat left top;
    }
    #content .tip1 .tip_h {
        width: 227px;
        padding-top: 45px;
        height: 23px;
        text-align: left;
        cursor: move;
    }
    #content .tip1 .tip_c {
        background: url(../image/许愿墙/tip1_c.gif) repeat-y;
    }
    #content .tip1 .tip_c {
        width: 200px;
        padding-left: 12px;
        padding-right: 15px;
        min-height: 40px;
        text-align: left;
        line-height: 20px;
        max-height: 160px;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }
    #content .tip1 .tip_f {
        background: url(../image/许愿墙/tip1_f.gif) no-repeat left top;
    }
    #content .tip1 .tip_f {
        width: 227px;
        height: 53px;
        padding-top: 20px;
    }
    #content .close {
        float: left;
        font-size: 12px;
        cursor: pointer;
        color: #000000;
    }
    .clr {
        clear: both;
        overflow: auto;
        display: block;
        height: 0px;
    }
    #content .icon {
        float: left;
        width: 35px;
        padding-left: 15px;
        height: 35px;
        text-align: center;
    }
    #content .name {
        float: right;
        padding-right: 15px;
        text-align: right;
        font-size: 14px;
        line-height: 35px;
        color: #C0F;
    }
    #content .num {
        float: left;
        padding-left: 7px;
        width: 195px;
    }
</style>

<!-- html 部分 -->
<div id=&quot;content&quot;>
    <div class=&quot;tip1&quot; id=&quot;cc&quot;>
        <div class=&quot;tip_h&quot; title=&quot;双击关闭纸条&quot;>
            <div class=&quot;num&quot;>第[49568]条 2016-02-17 22:51:52</div>
            <div class=&quot;close&quot; title=&quot;关闭纸条&quot;>×</div>
            <div class=&quot;clr&quot;></div>
        </div>
        <div class=&quot;tip_c&quot;>
            每天都要被自己给帅醒，希望以后越来越帅！！！
        </div>
        <div class=&quot;tip_f&quot;>
            <div class=&quot;icon&quot;>
                <img src=&quot;../image/许愿墙/bpic_1.gif&quot; alt=&quot;&quot; title=&quot;&quot;>
            </div>
            <div class=&quot;name&quot;>成真的人</div>
            <div class=&quot;clr&quot;></div>
        </div>
    </div>
</div>

<!-- js 部分 -->
<script>
    var content = document.getElementById('content');
    var cc = document.getElementById('cc');
    var zIndex = 0;

    // 克隆10份添加到content中
    for (var i = 0; i < 10; i++) {
        // 克隆cc节点
        var newDiv = cc.cloneNode(true);
        // 添加到content中
        content.appendChild(newDiv);
        // 修改id
        newDiv.id = &quot;cc&quot; + i;
    }

    // 找到所有便签
    var divs = content.children; // 11个
    for (var i = 0; i < divs.length; i++) {
        // 给每一个便签随机位置
        var x = parseInt(Math.random() * 701);
        divs[i].style.left = x + &quot;px&quot;;

        var y = parseInt(Math.random() * 441);
        divs[i].style.top = y + &quot;px&quot;;

        // 点击便签的时候，层级要提升
        divs[i].onclick = function() {
            this.style.zIndex = ++zIndex;
        }

        // 双击tip_h部分 让便签隐藏
        divs[i].children[0].ondblclick = function() {
            this.parentNode.style.display = &quot;none&quot;;
        };
        // 单击关闭按钮
        // console.log(divs[i].children[0].children[1]); // 关闭按钮
        divs[i].children[0].children[1].onclick = function() {
            this.parentNode.parentNode.style.display = &quot;none&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/bg.gif) repeat center <span class="hljs-number">36px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#c30230</span>;
    }
    <span class="hljs-selector-id">#content</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">960px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/content_bg.jpg) no-repeat left top;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">627px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">227px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_h</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/tip1_h.gif) no-repeat left top;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_h</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">227px</span>;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">45px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">23px</span>;
        <span class="hljs-attribute">text-align</span>: left;
        <span class="hljs-attribute">cursor</span>: move;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_c</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/tip1_c.gif) repeat-y;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_c</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">text-align</span>: left;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">max-height</span>: <span class="hljs-number">160px</span>;
        <span class="hljs-attribute">word-wrap</span>: break-word;
        <span class="hljs-attribute">word-break</span>: break-all;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_f</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/tip1_f.gif) no-repeat left top;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_f</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">227px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">53px</span>;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">20px</span>;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.close</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#000000</span>;
    }
    <span class="hljs-selector-class">.clr</span> {
        <span class="hljs-attribute">clear</span>: both;
        <span class="hljs-attribute">overflow</span>: auto;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.icon</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.name</span> {
        <span class="hljs-attribute">float</span>: right;
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">text-align</span>: right;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#C0F</span>;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.num</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">7px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">195px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tip1"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"cc"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tip_h"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"双击关闭纸条"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"num"</span>&gt;</span>第[49568]条 2016-02-17 22:51:52<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"关闭纸条"</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clr"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tip_c"</span>&gt;</span>
            每天都要被自己给帅醒，希望以后越来越帅！！！
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tip_f"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/许愿墙/bpic_1.gif"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">title</span>=<span class="hljs-string">""</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>成真的人<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clr"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> content = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'content'</span>);
    <span class="hljs-keyword">var</span> cc = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'cc'</span>);
    <span class="hljs-keyword">var</span> zIndex = <span class="hljs-number">0</span>;

    <span class="hljs-comment">// 克隆10份添加到content中</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        <span class="hljs-comment">// 克隆cc节点</span>
        <span class="hljs-keyword">var</span> newDiv = cc.cloneNode(<span class="hljs-literal">true</span>);
        <span class="hljs-comment">// 添加到content中</span>
        content.appendChild(newDiv);
        <span class="hljs-comment">// 修改id</span>
        newDiv.id = <span class="hljs-string">"cc"</span> + i;
    }

    <span class="hljs-comment">// 找到所有便签</span>
    <span class="hljs-keyword">var</span> divs = content.children; <span class="hljs-comment">// 11个</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; divs.length; i++) {
        <span class="hljs-comment">// 给每一个便签随机位置</span>
        <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">701</span>);
        divs[i].style.left = x + <span class="hljs-string">"px"</span>;

        <span class="hljs-keyword">var</span> y = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">441</span>);
        divs[i].style.top = y + <span class="hljs-string">"px"</span>;

        <span class="hljs-comment">// 点击便签的时候，层级要提升</span>
        divs[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.style.zIndex = ++zIndex;
        }

        <span class="hljs-comment">// 双击tip_h部分 让便签隐藏</span>
        divs[i].children[<span class="hljs-number">0</span>].ondblclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.parentNode.style.display = <span class="hljs-string">"none"</span>;
        };
        <span class="hljs-comment">// 单击关闭按钮</span>
        <span class="hljs-comment">// console.log(divs[i].children[0].children[1]); // 关闭按钮</span>
        divs[i].children[<span class="hljs-number">0</span>].children[<span class="hljs-number">1</span>].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.parentNode.parentNode.style.display = <span class="hljs-string">"none"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm61jw0ggng20wb0hc12q.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm61jw0ggng20wb0hc12q.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>5、许愿墙案例(二)：</strong> <em>[42-动态创建元素-许愿墙(二).html]</em></p>
<blockquote>上面的案例每个便利贴里面的文字用户信息都是一样的，并且是通过克隆节点完成的，那我们能不能动态创建呢，并且获取不同的信息</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
 <style>
    body {
        margin: 0 auto;
        padding: 0px;
        font-size: 12px;
        background: url(../image/许愿墙/bg.gif) repeat center 36px;
        text-align: center;
        background-color: #c30230;
    }
    #content {
        margin: 0 auto;
        width: 960px;
        background: url(../image/许愿墙/content_bg.jpg) no-repeat left top;
        height: 627px;
        position: relative;
    }
    #content .tip1 {
        position: absolute;
        width: 227px;
        left: 200px;
        top: 100px;
    }
    #content .tip1 .tip_h {
        background: url(../image/许愿墙/tip1_h.gif) no-repeat left top;
    }
    #content .tip1 .tip_h {
        width: 227px;
        padding-top: 45px;
        height: 23px;
        text-align: left;
        cursor: move;
    }
    #content .tip1 .tip_c {
        background: url(../image/许愿墙/tip1_c.gif) repeat-y;
    }
    #content .tip1 .tip_c {
        width: 200px;
        padding-left: 12px;
        padding-right: 15px;
        min-height: 40px;
        text-align: left;
        line-height: 20px;
        max-height: 160px;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }
    #content .tip1 .tip_f {
        background: url(../image/许愿墙/tip1_f.gif) no-repeat left top;
    }
    #content .tip1 .tip_f {
        width: 227px;
        height: 53px;
        padding-top: 20px;
    }
    #content .close {
        float: left;
        font-size: 12px;
        cursor: pointer;
        color: #000000;
    }
    .clr {
        clear: both;
        overflow: auto;
        display: block;
        height: 0px;
    }
    #content .icon {
        float: left;
        width: 35px;
        padding-left: 15px;
        height: 35px;
        text-align: center;
    }
    #content .name {
        float: right;
        padding-right: 15px;
        text-align: right;
        font-size: 14px;
        line-height: 35px;
        color: #C0F;
    }
    #content .num {
        float: left;
        padding-left: 7px;
        width: 195px;
    }
</style>


<!-- html 部分 -->
<div id=&quot;content&quot;>

</div>


<!-- js 部分 -->
<script>
    var datas = [{
        &quot;id&quot;: 1,
        &quot;name&quot;: &quot;mahu&quot;,
        &quot;content&quot;: &quot;今天你拿苹果支付了么&quot;,
        &quot;time&quot;: &quot;2016-02-17 00:00:00&quot;
    }, {
        &quot;id&quot;: 2,
        &quot;name&quot;: &quot;haha&quot;,
        &quot;content&quot;: &quot;今天天气不错，风和日丽的&quot;,
        &quot;time&quot;: &quot;2016-02-18 12:40:00&quot;
    }, {
        &quot;id&quot;: 3,
        &quot;name&quot;: &quot;jjjj&quot;,
        &quot;content&quot;: &quot;常要说的事儿是乐生于苦&quot;,
        &quot;time&quot;: &quot;2016-03-18 12:40:00&quot;
    }, {
        &quot;id&quot;: 4,
        &quot;name&quot;: &quot;9.8的妹纸&quot;,
        &quot;content&quot;: &quot;把朋友家厕所拉堵了 不敢出去 掏了半小时了都&quot;,
        &quot;time&quot;: &quot;2016-03-18 12:40:00&quot;
    }, {
        &quot;id&quot;: 5,
        &quot;name&quot;: &quot;雷锋ii.&quot;,
        &quot;content&quot;: &quot;元宵节快乐&quot;,
        &quot;time&quot;: &quot;2016-02-22 12:40:00&quot;
    }, {
        &quot;id&quot;: 6,
        &quot;name&quot;: &quot;哎呦哥哥.&quot;,
        &quot;content&quot;: &quot;据说今晚央视的元宵晚会导演和春晚导演是同一个人，真是躲得过初一，躲不过十五。&quot;,
        &quot;time&quot;: &quot;2016-02-22 01:30:00&quot;
    }, {
        &quot;id&quot;: 7,
        &quot;name&quot;: &quot;哎呦杰杰.&quot;,
        &quot;content&quot;: &quot;真搞不懂你们地球人，月亮有什么好看的，全是坑，还是对面那哥们好看，&quot;,
        &quot;time&quot;: &quot;2016-02-22 01:30:00&quot;
    }, {
        &quot;id&quot;: 8,
        &quot;name&quot;: &quot;哎呦哎呦&quot;,
        &quot;content&quot;: &quot;今天哪里的烟花最好看！！？答：朋友圈。。。&quot;,
        &quot;time&quot;: &quot;2016-02-22 02:30:00&quot;
    }, {
        &quot;id&quot;: 9,
        &quot;name&quot;: &quot;没猴哥，不春晚&quot;,
        &quot;content&quot;: &quot;班主任:“小明，你都十二岁了，还是三年级，不觉得羞愧吗”？。小明:“一点也不觉得，老师你都四十多岁了，不也是年年在三年级混日子吗？羞愧的应该是你”。老师:……&quot;,
        &quot;time&quot;: &quot;2016-02-22 01:30:00&quot;
    }];

    // 找到外部大盒子
    var content = document.getElementById('content');
    var zIndex = 0;
    // 根据数据创建div
    for (var i = 0; i < datas.length; i++) {
        // 创建一个div
        var div = document.createElement(&quot;div&quot;);
        // 将div添加到content中
        content.appendChild(div);
        // 给div添加一个id和class
        div.className = &quot;tip1&quot;;
        div.id = &quot;cc&quot; + i;
        // 给这个div设置内容
        div.innerHTML = '<div class=&quot;tip_h&quot; title=&quot;双击关闭纸条&quot;>' +
            '<div class=&quot;num&quot;>第[' + datas[i].id + ']条 ' + datas[i].time + '</div>' +
            '<div class=&quot;close&quot; title=&quot;关闭纸条&quot;>×</div>' +
            '<div class=&quot;clr&quot;></div>' +
            '</div>' +
            '<div class=&quot;tip_c&quot;>' +
            datas[i].content +
            '</div>' +
            '<div class=&quot;tip_f&quot;>' +
            '<div class=&quot;icon&quot;>' +
            '<img src=&quot;../image/许愿墙/bpic_1.gif&quot; alt=&quot;&quot; title=&quot;&quot;>' +
            '</div>' +
            '<div class=&quot;name&quot;>' + datas[i].name + '</div>' +
            '<div class=&quot;clr&quot;></div>' +
            '</div>';

        // 给每一个便签随机位置
        var x = parseInt(Math.random() * 701);
        div.style.left = x + &quot;px&quot;;

        var y = parseInt(Math.random() * 441);
        div.style.top = y + &quot;px&quot;;

        // 点击便签的时候，层级要提升
        div.onclick = function() {
            this.style.zIndex = ++zIndex;
        }

        // 双击tip_h部分 让便签隐藏
        div.children[0].ondblclick = function() {
            this.parentNode.style.display = &quot;none&quot;;
        };
        // 单击关闭按钮
        // console.log(divs[i].children[0].children[1]); // 关闭按钮
        div.children[0].children[1].onclick = function() {
            this.parentNode.parentNode.style.display = &quot;none&quot;;
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/bg.gif) repeat center <span class="hljs-number">36px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#c30230</span>;
    }
    <span class="hljs-selector-id">#content</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">960px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/content_bg.jpg) no-repeat left top;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">627px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">227px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_h</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/tip1_h.gif) no-repeat left top;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_h</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">227px</span>;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">45px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">23px</span>;
        <span class="hljs-attribute">text-align</span>: left;
        <span class="hljs-attribute">cursor</span>: move;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_c</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/tip1_c.gif) repeat-y;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_c</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">text-align</span>: left;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">max-height</span>: <span class="hljs-number">160px</span>;
        <span class="hljs-attribute">word-wrap</span>: break-word;
        <span class="hljs-attribute">word-break</span>: break-all;
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_f</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../image/许愿墙/tip1_f.gif) no-repeat left top;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.tip1</span> <span class="hljs-selector-class">.tip_f</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">227px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">53px</span>;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">20px</span>;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.close</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#000000</span>;
    }
    <span class="hljs-selector-class">.clr</span> {
        <span class="hljs-attribute">clear</span>: both;
        <span class="hljs-attribute">overflow</span>: auto;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.icon</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.name</span> {
        <span class="hljs-attribute">float</span>: right;
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">text-align</span>: right;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#C0F</span>;
    }
    <span class="hljs-selector-id">#content</span> <span class="hljs-selector-class">.num</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">7px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">195px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>


<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> datas = [{
        <span class="hljs-string">"id"</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"mahu"</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"今天你拿苹果支付了么"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-02-17 00:00:00"</span>
    }, {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"haha"</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"今天天气不错，风和日丽的"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-02-18 12:40:00"</span>
    }, {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"jjjj"</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"常要说的事儿是乐生于苦"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-03-18 12:40:00"</span>
    }, {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"9.8的妹纸"</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"把朋友家厕所拉堵了 不敢出去 掏了半小时了都"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-03-18 12:40:00"</span>
    }, {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">5</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"雷锋ii."</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"元宵节快乐"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-02-22 12:40:00"</span>
    }, {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">6</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"哎呦哥哥."</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"据说今晚央视的元宵晚会导演和春晚导演是同一个人，真是躲得过初一，躲不过十五。"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-02-22 01:30:00"</span>
    }, {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"哎呦杰杰."</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"真搞不懂你们地球人，月亮有什么好看的，全是坑，还是对面那哥们好看，"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-02-22 01:30:00"</span>
    }, {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"哎呦哎呦"</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"今天哪里的烟花最好看！！？答：朋友圈。。。"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-02-22 02:30:00"</span>
    }, {
        <span class="hljs-string">"id"</span>: <span class="hljs-number">9</span>,
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"没猴哥，不春晚"</span>,
        <span class="hljs-string">"content"</span>: <span class="hljs-string">"班主任:“小明，你都十二岁了，还是三年级，不觉得羞愧吗”？。小明:“一点也不觉得，老师你都四十多岁了，不也是年年在三年级混日子吗？羞愧的应该是你”。老师:……"</span>,
        <span class="hljs-string">"time"</span>: <span class="hljs-string">"2016-02-22 01:30:00"</span>
    }];

    <span class="hljs-comment">// 找到外部大盒子</span>
    <span class="hljs-keyword">var</span> content = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'content'</span>);
    <span class="hljs-keyword">var</span> zIndex = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// 根据数据创建div</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; datas.length; i++) {
        <span class="hljs-comment">// 创建一个div</span>
        <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
        <span class="hljs-comment">// 将div添加到content中</span>
        content.appendChild(div);
        <span class="hljs-comment">// 给div添加一个id和class</span>
        div.className = <span class="hljs-string">"tip1"</span>;
        div.id = <span class="hljs-string">"cc"</span> + i;
        <span class="hljs-comment">// 给这个div设置内容</span>
        div.innerHTML = <span class="hljs-string">'&lt;div class="tip_h" title="双击关闭纸条"&gt;'</span> +
            <span class="hljs-string">'&lt;div class="num"&gt;第['</span> + datas[i].id + <span class="hljs-string">']条 '</span> + datas[i].time + <span class="hljs-string">'&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;div class="close" title="关闭纸条"&gt;×&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;div class="clr"&gt;&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;div class="tip_c"&gt;'</span> +
            datas[i].content +
            <span class="hljs-string">'&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;div class="tip_f"&gt;'</span> +
            <span class="hljs-string">'&lt;div class="icon"&gt;'</span> +
            <span class="hljs-string">'&lt;img src="../image/许愿墙/bpic_1.gif" alt="" title=""&gt;'</span> +
            <span class="hljs-string">'&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;div class="name"&gt;'</span> + datas[i].name + <span class="hljs-string">'&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;div class="clr"&gt;&lt;/div&gt;'</span> +
            <span class="hljs-string">'&lt;/div&gt;'</span>;

        <span class="hljs-comment">// 给每一个便签随机位置</span>
        <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">701</span>);
        div.style.left = x + <span class="hljs-string">"px"</span>;

        <span class="hljs-keyword">var</span> y = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">441</span>);
        div.style.top = y + <span class="hljs-string">"px"</span>;

        <span class="hljs-comment">// 点击便签的时候，层级要提升</span>
        div.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.style.zIndex = ++zIndex;
        }

        <span class="hljs-comment">// 双击tip_h部分 让便签隐藏</span>
        div.children[<span class="hljs-number">0</span>].ondblclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.parentNode.style.display = <span class="hljs-string">"none"</span>;
        };
        <span class="hljs-comment">// 单击关闭按钮</span>
        <span class="hljs-comment">// console.log(divs[i].children[0].children[1]); // 关闭按钮</span>
        div.children[<span class="hljs-number">0</span>].children[<span class="hljs-number">1</span>].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.parentNode.parentNode.style.display = <span class="hljs-string">"none"</span>;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm6y2xf29tj20wb0hcq57.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm6y2xf29tj20wb0hcq57.jpg" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>6、随机选中英雄案例：</strong> <em>[43-动态创建元素-随机选中.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    table {
        margin: 50px auto;
    }
    td {
        width: 80px;
        height: 80px;
        text-align: center;
        border: 1px dashed #4586FF;
        position: relative;
    }
    img {
        width: 80px;
        height: 80px;
        display: block;
    }
    #btn {
        width: 100px;
        height: 40px;
        display: block;
        margin: 20px auto;
    }
    .mask {
        width: 80px;
        height: 80px;
        background: rgba(161, 234, 251, 1);
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>

<!-- html 部分 -->
<button id=&quot;btn&quot;>点击开始</button>

<!-- js 部分 -->
<script>
    // 随机选中的名单 @为空，随机的时候 不会选择@的项
    var heros = [
        [&quot;../image/wzry/105.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/106.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/107.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/146.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/109.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/110.jpg&quot;],
        [&quot;../image/wzry/149.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/115.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/114.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/113.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/119.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/120.jpg&quot;],
        [&quot;../image/wzry/148.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/116.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/117.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/118.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/137.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/136.jpg&quot;],
        [&quot;../image/wzry/140.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/125.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/124.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/123.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/122.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/121.jpg&quot;],
        [&quot;../image/wzry/141.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/126.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/127.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/128.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/129.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/130.jpg&quot;],
        [&quot;../image/wzry/142.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/135.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/134.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/144.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/132.jpg&quot;, &quot;@&quot;, &quot;../image/wzry/131.jpg&quot;]
    ];
    var btn = document.getElementById('btn');
    var newArr = [];
    // 创建table 添加到body中
    var table = document.createElement(&quot;table&quot;);
    document.body.insertBefore(table, btn);

    // 根据heros数组的长度创建tr
    for (var i = 0; i < heros.length; i++) {
        var tr = document.createElement(&quot;tr&quot;);
        table.appendChild(tr);

        // tr代表的是行数，上面的for循环，是循环的外面一个数组。下面需要创建td 
        for (var j = 0; j < heros[i].length; j++) {
            var td = document.createElement(&quot;td&quot;);
            tr.appendChild(td);
            // 当td里面的内容不等于&quot;@&quot;的时候 将数组里面的内容添加进去
            if (heros[i][j] != &quot;@&quot;) {
                td.innerHTML = &quot;<img src=&quot; + heros[i][j] + &quot;>&quot;;
                // 将符合条件的td添加到一个新的数组中
                newArr.push(td);
                // 创建一个遮罩层
                var mask = document.createElement(&quot;div&quot;);
                td.appendChild(mask);
                mask.className = &quot;mask&quot;;
            }

        }
    }

    // 给按钮注册点击事件
    btn.onclick = function() {
        for (var i = 0; i < newArr.length; i++) {
            // 每次点击按钮的时候，都让遮罩层恢复
            newArr[i].children[1].className = &quot;mask&quot;;
        }

        // 根据新数组的长度，返回一个随机数
        var random = parseInt(Math.random() * newArr.length);
        // 将随机到的td下的遮罩层属性名清空
        newArr[random].children[1].className = &quot;&quot;;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">table</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
    }
    <span class="hljs-selector-tag">td</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> dashed <span class="hljs-number">#4586FF</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">display</span>: block;
    }
    <span class="hljs-selector-id">#btn</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
    }
    <span class="hljs-selector-class">.mask</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(161, 234, 251, 1);
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击开始<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 随机选中的名单 @为空，随机的时候 不会选择@的项</span>
    <span class="hljs-keyword">var</span> heros = [
        [<span class="hljs-string">"../image/wzry/105.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/106.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/107.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/146.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/109.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/110.jpg"</span>],
        [<span class="hljs-string">"../image/wzry/149.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/115.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/114.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/113.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/119.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/120.jpg"</span>],
        [<span class="hljs-string">"../image/wzry/148.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/116.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/117.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/118.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/137.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/136.jpg"</span>],
        [<span class="hljs-string">"../image/wzry/140.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/125.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/124.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/123.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/122.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/121.jpg"</span>],
        [<span class="hljs-string">"../image/wzry/141.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/126.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/127.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/128.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/129.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/130.jpg"</span>],
        [<span class="hljs-string">"../image/wzry/142.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/135.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/134.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/144.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/132.jpg"</span>, <span class="hljs-string">"@"</span>, <span class="hljs-string">"../image/wzry/131.jpg"</span>]
    ];
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>);
    <span class="hljs-keyword">var</span> newArr = [];
    <span class="hljs-comment">// 创建table 添加到body中</span>
    <span class="hljs-keyword">var</span> table = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"table"</span>);
    <span class="hljs-built_in">document</span>.body.insertBefore(table, btn);

    <span class="hljs-comment">// 根据heros数组的长度创建tr</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; heros.length; i++) {
        <span class="hljs-keyword">var</span> tr = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"tr"</span>);
        table.appendChild(tr);

        <span class="hljs-comment">// tr代表的是行数，上面的for循环，是循环的外面一个数组。下面需要创建td </span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; heros[i].length; j++) {
            <span class="hljs-keyword">var</span> td = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"td"</span>);
            tr.appendChild(td);
            <span class="hljs-comment">// 当td里面的内容不等于"@"的时候 将数组里面的内容添加进去</span>
            <span class="hljs-keyword">if</span> (heros[i][j] != <span class="hljs-string">"@"</span>) {
                td.innerHTML = <span class="hljs-string">"&lt;img src="</span> + heros[i][j] + <span class="hljs-string">"&gt;"</span>;
                <span class="hljs-comment">// 将符合条件的td添加到一个新的数组中</span>
                newArr.push(td);
                <span class="hljs-comment">// 创建一个遮罩层</span>
                <span class="hljs-keyword">var</span> mask = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
                td.appendChild(mask);
                mask.className = <span class="hljs-string">"mask"</span>;
            }

        }
    }

    <span class="hljs-comment">// 给按钮注册点击事件</span>
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; newArr.length; i++) {
            <span class="hljs-comment">// 每次点击按钮的时候，都让遮罩层恢复</span>
            newArr[i].children[<span class="hljs-number">1</span>].className = <span class="hljs-string">"mask"</span>;
        }

        <span class="hljs-comment">// 根据新数组的长度，返回一个随机数</span>
        <span class="hljs-keyword">var</span> random = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * newArr.length);
        <span class="hljs-comment">// 将随机到的td下的遮罩层属性名清空</span>
        newArr[random].children[<span class="hljs-number">1</span>].className = <span class="hljs-string">""</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm84vhrgn0g20s50gxq6e.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm84vhrgn0g20s50gxq6e.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>7、动态创建表格：</strong> <em>[44-动态创建元素-动态创建表格.html]</em></p>
<p><strong>封装一个css文件：<code>createTable.css</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * @Author: Levi丶lxh 
 * @Date: 2017-12-07 14:45:09 
 */
 
/* 封装了一个createTable.css 文件 */
.my_table {
    margin: 100px auto;
    width: 800px;
    border: 1px solid #000;
    border-collapse: collapse;
}
.my_table th {
    border: 1px solid #000;
    height: 30px;
    background-color: #C4E3CB;
}
.my_table td {
    border: 1px solid #000;
    height: 30px;
    text-align: center;
    background: #F4F9F4;
}
.my_table a {
    text-decoration: none;
    color: #FF5C5C;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*
 * @Author: Levi丶lxh 
 * @Date: 2017-12-07 14:45:09 
 */</span>
 
<span class="hljs-comment">/* 封装了一个createTable.css 文件 */</span>
<span class="hljs-selector-class">.my_table</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">border-collapse</span>: collapse;
}
<span class="hljs-selector-class">.my_table</span> <span class="hljs-selector-tag">th</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#C4E3CB</span>;
}
<span class="hljs-selector-class">.my_table</span> <span class="hljs-selector-tag">td</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#F4F9F4</span>;
}
<span class="hljs-selector-class">.my_table</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">text-decoration</span>: none;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#FF5C5C</span>;
}</code></pre>
<p><strong>封装一个用于创建表格的<code>js</code>文件：<code>createTable.js</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * @Author: Levi丶lxh 
 * @Date: 2017-12-07 14:07:54 
 */

// 封装了一个createTable.js 文件
function createTable(element, json) {
    // 创建table 添加到 body
    var table = document.createElement(&quot;table&quot;);
    // 添加类名 my_table
    table.className = &quot;my_table&quot;;
    // 添加到element中
    element.appendChild(table);

    // 创建thead，添加到 table
    var thead = document.createElement(&quot;thead&quot;);
    table.appendChild(thead);

    // 创建tr 添加到thead中
    var tr = document.createElement(&quot;tr&quot;);
    thead.appendChild(tr);

    // 根据数据的长度创建th，并添加到tr里
    var header = json.header;
    for (var i = 0; i < header.length; i++) {
        var th = document.createElement(&quot;th&quot;);
        tr.appendChild(th);
        th.innerHTML = header[i];
    }

    // 单独再添加一个按钮
    var th = document.createElement(&quot;th&quot;);
    tr.appendChild(th);
    th.innerHTML = &quot;操作&quot;;


    // 创建 tbody 添加到 table
    var tbody = document.createElement(&quot;tbody&quot;);
    table.appendChild(tbody);
    // tbody.className = &quot;my_tbody&quot;;

    // 根据 json的datas.length创建tr
    var datas = json.datas;
    for (var i = 0; i < datas.length; i++) {
        var tr = document.createElement(&quot;tr&quot;);
        tbody.appendChild(tr);

        // 根据 datas[i] 创建td
        for (key in datas[i]) {
            var td = document.createElement(&quot;td&quot;);
            tr.appendChild(td);
            td.innerHTML = datas[i][key];
        }

        //创建 一个操作按钮
        var td = document.createElement(&quot;td&quot;);
        tr.appendChild(td);
        td.innerHTML = &quot;<a href='javascript:void(0);'>删除</a>&quot;;

        // 给a标签注册点击事件
        td.children[0].onclick = function() {
            // 点击这个删除按钮的时候，删除这一行 tr
            tbody.removeChild(this.parentNode.parentNode);
        }

    }
    return table;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
 * @Author: Levi丶lxh 
 * @Date: 2017-12-07 14:07:54 
 */</span>

<span class="hljs-comment">// 封装了一个createTable.js 文件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createTable</span>(<span class="hljs-params">element, json</span>) </span>{
    <span class="hljs-comment">// 创建table 添加到 body</span>
    <span class="hljs-keyword">var</span> table = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"table"</span>);
    <span class="hljs-comment">// 添加类名 my_table</span>
    table.className = <span class="hljs-string">"my_table"</span>;
    <span class="hljs-comment">// 添加到element中</span>
    element.appendChild(table);

    <span class="hljs-comment">// 创建thead，添加到 table</span>
    <span class="hljs-keyword">var</span> thead = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"thead"</span>);
    table.appendChild(thead);

    <span class="hljs-comment">// 创建tr 添加到thead中</span>
    <span class="hljs-keyword">var</span> tr = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"tr"</span>);
    thead.appendChild(tr);

    <span class="hljs-comment">// 根据数据的长度创建th，并添加到tr里</span>
    <span class="hljs-keyword">var</span> header = json.header;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; header.length; i++) {
        <span class="hljs-keyword">var</span> th = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"th"</span>);
        tr.appendChild(th);
        th.innerHTML = header[i];
    }

    <span class="hljs-comment">// 单独再添加一个按钮</span>
    <span class="hljs-keyword">var</span> th = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"th"</span>);
    tr.appendChild(th);
    th.innerHTML = <span class="hljs-string">"操作"</span>;


    <span class="hljs-comment">// 创建 tbody 添加到 table</span>
    <span class="hljs-keyword">var</span> tbody = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"tbody"</span>);
    table.appendChild(tbody);
    <span class="hljs-comment">// tbody.className = "my_tbody";</span>

    <span class="hljs-comment">// 根据 json的datas.length创建tr</span>
    <span class="hljs-keyword">var</span> datas = json.datas;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; datas.length; i++) {
        <span class="hljs-keyword">var</span> tr = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"tr"</span>);
        tbody.appendChild(tr);

        <span class="hljs-comment">// 根据 datas[i] 创建td</span>
        <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> datas[i]) {
            <span class="hljs-keyword">var</span> td = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"td"</span>);
            tr.appendChild(td);
            td.innerHTML = datas[i][key];
        }

        <span class="hljs-comment">//创建 一个操作按钮</span>
        <span class="hljs-keyword">var</span> td = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"td"</span>);
        tr.appendChild(td);
        td.innerHTML = <span class="hljs-string">"&lt;a href='javascript:void(0);'&gt;删除&lt;/a&gt;"</span>;

        <span class="hljs-comment">// 给a标签注册点击事件</span>
        td.children[<span class="hljs-number">0</span>].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 点击这个删除按钮的时候，删除这一行 tr</span>
            tbody.removeChild(<span class="hljs-keyword">this</span>.parentNode.parentNode);
        }

    }
    <span class="hljs-keyword">return</span> table;
}</code></pre>
<p><strong>页面主体部分</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>动态创建表格</title>
    <link rel=&quot;stylesheet&quot; href=&quot;css/createTable.css&quot;>
    <script src=&quot;js/createTable.js&quot;></script>
</head>

<body>
    <div id=&quot;box&quot;></div>

    <script>
        var json = {
            &quot;header&quot;: [&quot;姓名&quot;, &quot;性别&quot;, &quot;年龄&quot;, &quot;属性&quot;, &quot;技能&quot;],
            &quot;datas&quot;: [{
                &quot;name&quot;: &quot;甄姬&quot;,
                &quot;gender&quot;: &quot;女&quot;,
                &quot;age&quot;: 20,
                &quot;attribute&quot;: &quot;法师&quot;,
                &quot;skill&quot;: &quot;洛神降临&quot;
            }, {
                &quot;name&quot;: &quot;小乔&quot;,
                &quot;gender&quot;: &quot;女&quot;,
                &quot;age&quot;: 16,
                &quot;attribute&quot;: &quot;法师&quot;,
                &quot;skill&quot;: &quot;星华缭乱&quot;
            }, {
                &quot;name&quot;: &quot;不知火舞&quot;,
                &quot;gender&quot;: &quot;女&quot;,
                &quot;age&quot;: 18,
                &quot;attribute&quot;: &quot;刺客&quot;,
                &quot;skill&quot;: &quot;必杀·忍蜂&quot;
            }, {
                &quot;name&quot;: &quot;阿珂&quot;,
                &quot;gender&quot;: &quot;女&quot;,
                &quot;age&quot;: 18,
                &quot;attribute&quot;: &quot;刺客&quot;,
                &quot;skill&quot;: &quot;幻舞&quot;
            }, {
                &quot;name&quot;: &quot;吕布&quot;,
                &quot;gender&quot;: &quot;男&quot;,
                &quot;age&quot;: 28,
                &quot;attribute&quot;: &quot;战士&quot;,
                &quot;skill&quot;: &quot;魔神降世&quot;
            }, {
                &quot;name&quot;: &quot;典韦&quot;,
                &quot;gender&quot;: &quot;男&quot;,
                &quot;age&quot;: 38,
                &quot;attribute&quot;: &quot;战士&quot;,
                &quot;skill&quot;: &quot;嗜血&quot;
            }, {
                &quot;name&quot;: &quot;后羿&quot;,
                &quot;gender&quot;: &quot;男&quot;,
                &quot;age&quot;: 1888,
                &quot;attribute&quot;: &quot;射手&quot;,
                &quot;skill&quot;: &quot;惩戒射击&quot;
            }, ]
        };
        var box = document.getElementById('box');
        createTable(box, json);
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>动态创建表格<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/createTable.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/createTable.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> json = {
            <span class="hljs-string">"header"</span>: [<span class="hljs-string">"姓名"</span>, <span class="hljs-string">"性别"</span>, <span class="hljs-string">"年龄"</span>, <span class="hljs-string">"属性"</span>, <span class="hljs-string">"技能"</span>],
            <span class="hljs-string">"datas"</span>: [{
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"甄姬"</span>,
                <span class="hljs-string">"gender"</span>: <span class="hljs-string">"女"</span>,
                <span class="hljs-string">"age"</span>: <span class="hljs-number">20</span>,
                <span class="hljs-string">"attribute"</span>: <span class="hljs-string">"法师"</span>,
                <span class="hljs-string">"skill"</span>: <span class="hljs-string">"洛神降临"</span>
            }, {
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"小乔"</span>,
                <span class="hljs-string">"gender"</span>: <span class="hljs-string">"女"</span>,
                <span class="hljs-string">"age"</span>: <span class="hljs-number">16</span>,
                <span class="hljs-string">"attribute"</span>: <span class="hljs-string">"法师"</span>,
                <span class="hljs-string">"skill"</span>: <span class="hljs-string">"星华缭乱"</span>
            }, {
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"不知火舞"</span>,
                <span class="hljs-string">"gender"</span>: <span class="hljs-string">"女"</span>,
                <span class="hljs-string">"age"</span>: <span class="hljs-number">18</span>,
                <span class="hljs-string">"attribute"</span>: <span class="hljs-string">"刺客"</span>,
                <span class="hljs-string">"skill"</span>: <span class="hljs-string">"必杀·忍蜂"</span>
            }, {
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"阿珂"</span>,
                <span class="hljs-string">"gender"</span>: <span class="hljs-string">"女"</span>,
                <span class="hljs-string">"age"</span>: <span class="hljs-number">18</span>,
                <span class="hljs-string">"attribute"</span>: <span class="hljs-string">"刺客"</span>,
                <span class="hljs-string">"skill"</span>: <span class="hljs-string">"幻舞"</span>
            }, {
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"吕布"</span>,
                <span class="hljs-string">"gender"</span>: <span class="hljs-string">"男"</span>,
                <span class="hljs-string">"age"</span>: <span class="hljs-number">28</span>,
                <span class="hljs-string">"attribute"</span>: <span class="hljs-string">"战士"</span>,
                <span class="hljs-string">"skill"</span>: <span class="hljs-string">"魔神降世"</span>
            }, {
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"典韦"</span>,
                <span class="hljs-string">"gender"</span>: <span class="hljs-string">"男"</span>,
                <span class="hljs-string">"age"</span>: <span class="hljs-number">38</span>,
                <span class="hljs-string">"attribute"</span>: <span class="hljs-string">"战士"</span>,
                <span class="hljs-string">"skill"</span>: <span class="hljs-string">"嗜血"</span>
            }, {
                <span class="hljs-string">"name"</span>: <span class="hljs-string">"后羿"</span>,
                <span class="hljs-string">"gender"</span>: <span class="hljs-string">"男"</span>,
                <span class="hljs-string">"age"</span>: <span class="hljs-number">1888</span>,
                <span class="hljs-string">"attribute"</span>: <span class="hljs-string">"射手"</span>,
                <span class="hljs-string">"skill"</span>: <span class="hljs-string">"惩戒射击"</span>
            }, ]
        };
        <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);
        createTable(box, json);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm885ik5czg20ns08ygn3.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm885ik5czg20ns08ygn3.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>8、百度搜索提示案例：</strong> <em>[45-动态创建元素-仿百度搜索提示.html]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        border: none;
        list-style: none;
    }
    #box {
        width: 405px;
        margin: 200px auto;
        position: relative;
    }
    input {
        float: left;
        width: 300px;
        height: 32px;
        padding-left: 4px;
        border: 1px solid #b6b6b6;
        border-right: 0;
    }
    button {
        float: left;
        width: 100px;
        height: 34px;
        font: 400 14px/34px &quot;microsoft yahei&quot;;
        color: white;
        background: #3385ff;
        cursor: pointer;
    }
    button:hover {
        background: #317ef3;
    }
    #pop {
        width: 303px;
        border: 1px solid #ccc;
        padding: 0px;
        position: absolute;
        top: 34px;
    }
    #pop ul li {
        padding-left: 5px;
    }
    #pop ul li:hover {
        background-color: #CCC;
    }
</style>


<!-- html 部分 -->
<div id=&quot;box&quot;>
    <input id=&quot;text&quot; type=&quot;text&quot;>
    <button id=&quot;search&quot;>百度一下</button>
</div>


<!-- js 部分 -->
<script>
    var text = document.getElementById('text');
    var box = document.getElementById('box');

    // 假设后台的提示数据是datas
    var datas = [&quot;a&quot;, &quot;ab&quot;, &quot;abc&quot;, &quot;abcd&quot;, &quot;爱奇艺&quot;, &quot;爱康国宾体检中心&quot;, &quot;爱奇艺会员领取&quot;, &quot;爱思助手官方下载&quot;, &quot;如何开网店&quot;, &quot;如何瘦肚子&quot;, &quot;如何翻墙&quot;];
    // 给text注册键盘弹起事件
    text.onkeyup = function() {
        //1. 根据用户输入的值  获取到一个数组  这个数组就是需要展示的内容
        var newArr = [];
        // 获取到输入凡人内容
        var content = text.value;

        for (var i = 0; i < datas.length; i++) {
            // 判断输入的内容在数据中是否存在
            if (datas[i].indexOf(content) != -1) {
                // 说明存在
                newArr.push(datas[i]);
            }
        }
        // 要将提示信息显示在搜索框下方 需要创建一个div
        // 每一次触发事件都会创建一个div，如果发现box中存在id pop，就删除它
        var pop = document.getElementById('pop');
        if (pop) {
            box.removeChild(pop);
        }

        // 生成 div的前提是newArr要有长度
        if (newArr.length == 0 || content == &quot;&quot;) {
            return;
        }

        var div = document.createElement(&quot;div&quot;);
        div.id = &quot;pop&quot;;
        box.appendChild(div);

        // 创建ul 添加到div中，用来显示提示信息列表
        var ul = document.createElement(&quot;ul&quot;);
        div.appendChild(ul);

        // 根据 newArr 创建li 并且添加到ul中
        for (var i = 0; i < newArr.length; i++) {
            var li = document.createElement(&quot;li&quot;);
            ul.appendChild(li);
            li.innerHTML = newArr[i];
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border</span>: none;
        <span class="hljs-attribute">list-style</span>: none;
    }
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">405px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">200px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-tag">input</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">4px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#b6b6b6</span>;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">button</span> {
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">400</span> <span class="hljs-number">14px</span>/<span class="hljs-number">34px</span> <span class="hljs-string">"microsoft yahei"</span>;
        <span class="hljs-attribute">color</span>: white;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#3385ff</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#317ef3</span>;
    }
    <span class="hljs-selector-id">#pop</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">303px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">34px</span>;
    }
    <span class="hljs-selector-id">#pop</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">5px</span>;
    }
    <span class="hljs-selector-id">#pop</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CCC</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>


<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"search"</span>&gt;</span>百度一下<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> text = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'text'</span>);
    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

    <span class="hljs-comment">// 假设后台的提示数据是datas</span>
    <span class="hljs-keyword">var</span> datas = [<span class="hljs-string">"a"</span>, <span class="hljs-string">"ab"</span>, <span class="hljs-string">"abc"</span>, <span class="hljs-string">"abcd"</span>, <span class="hljs-string">"爱奇艺"</span>, <span class="hljs-string">"爱康国宾体检中心"</span>, <span class="hljs-string">"爱奇艺会员领取"</span>, <span class="hljs-string">"爱思助手官方下载"</span>, <span class="hljs-string">"如何开网店"</span>, <span class="hljs-string">"如何瘦肚子"</span>, <span class="hljs-string">"如何翻墙"</span>];
    <span class="hljs-comment">// 给text注册键盘弹起事件</span>
    text.onkeyup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//1. 根据用户输入的值  获取到一个数组  这个数组就是需要展示的内容</span>
        <span class="hljs-keyword">var</span> newArr = [];
        <span class="hljs-comment">// 获取到输入凡人内容</span>
        <span class="hljs-keyword">var</span> content = text.value;

        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; datas.length; i++) {
            <span class="hljs-comment">// 判断输入的内容在数据中是否存在</span>
            <span class="hljs-keyword">if</span> (datas[i].indexOf(content) != <span class="hljs-number">-1</span>) {
                <span class="hljs-comment">// 说明存在</span>
                newArr.push(datas[i]);
            }
        }
        <span class="hljs-comment">// 要将提示信息显示在搜索框下方 需要创建一个div</span>
        <span class="hljs-comment">// 每一次触发事件都会创建一个div，如果发现box中存在id pop，就删除它</span>
        <span class="hljs-keyword">var</span> pop = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'pop'</span>);
        <span class="hljs-keyword">if</span> (pop) {
            box.removeChild(pop);
        }

        <span class="hljs-comment">// 生成 div的前提是newArr要有长度</span>
        <span class="hljs-keyword">if</span> (newArr.length == <span class="hljs-number">0</span> || content == <span class="hljs-string">""</span>) {
            <span class="hljs-keyword">return</span>;
        }

        <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
        div.id = <span class="hljs-string">"pop"</span>;
        box.appendChild(div);

        <span class="hljs-comment">// 创建ul 添加到div中，用来显示提示信息列表</span>
        <span class="hljs-keyword">var</span> ul = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"ul"</span>);
        div.appendChild(ul);

        <span class="hljs-comment">// 根据 newArr 创建li 并且添加到ul中</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; newArr.length; i++) {
            <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"li"</span>);
            ul.appendChild(li);
            li.innerHTML = newArr[i];
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/9c47d583gy1fm8acrb0ndg20k905cdin.gif" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/9c47d583gy1fm8acrb0ndg20k905cdin.gif" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000012369840">上一篇：JavaScript 基础知识 - DOM篇(一)</a><br><a href="https://segmentfault.com/a/1190000012575816" target="_blank">下一篇：JavaScript 基础知识 - BOM篇</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 基础知识 - DOM篇(二)

## 原文链接
[https://segmentfault.com/a/1190000012369970](https://segmentfault.com/a/1190000012369970)

