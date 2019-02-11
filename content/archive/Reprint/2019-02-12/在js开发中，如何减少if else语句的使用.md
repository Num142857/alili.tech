---
title: '在js开发中，如何减少if else语句的使用' 
date: 2019-02-12 2:30:12
hidden: true
slug: 3hcs2kda7ld
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">那么问题来了，在js开发中，如何减少if else语句的使用</h2>
<p>代码中嵌套的if/else结构往往导致代码不美观，也不易于理解。面向过程的开发中代码有大量的IF ELSE，在java中可以用一些设计模式替换掉这些逻辑，那么在js中是否也有类似的方法用来尽可能减少代码中的if/else嵌套呢？</p>
<p>有人认为：if else多就多呗，只要可读性强，维护起来方便。jQuery.fn.init里就是一堆if else判断，难道要质疑jQuery作者的水平了？<br>并不是说if else多就不好，关键是看用的地方，jQuery.fn.init里除了if else判断简洁点，难道要改成switch？就算用工厂模式，还不是得做大量的if判断。</p>
<p>代码整洁强迫症患者必须要来个抛砖引玉：</p>
<h3 id="articleHeader1">1.</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(a为真){
    a=a
}else{
    a=b
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(a为真)</span></span>{
    a=<span class="hljs-selector-tag">a</span>
}<span class="hljs-keyword">else</span>{
    a=<span class="hljs-selector-tag">b</span>
}
</code></pre>
<p>可写成：a = a || b</p>
<h3 id="articleHeader2">2.</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(a==b){
    a=c
}else{
    a=d
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">if</span>(<span class="hljs-attr">a==b){</span>
    <span class="hljs-attr">a=c</span>
}<span class="hljs-keyword">else</span>{
    <span class="hljs-attr">a=d</span>
}
</code></pre>
<p>可写成：a = (a==b) ? c : d</p>
<h3 id="articleHeader3">3.</h3>
<p>后台接口通常会返回这种数据：<br>fruit: 0 // 0=苹果，1=梨子，2=桔子，3=柠檬，4=芒果...<br>这时写if...else是最痛苦的。从冲哥那偷来个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _f = ['苹果','梨子','桔子','柠檬','芒果'];
shuiguo = _f[fruit];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">var</span> _f = [<span class="hljs-string">'苹果'</span>,<span class="hljs-string">'梨子'</span>,<span class="hljs-string">'桔子'</span>,<span class="hljs-string">'柠檬'</span>,<span class="hljs-string">'芒果'</span>];
<span class="hljs-attribute">shuiguo</span> = _f[fruit];
</code></pre>
<h2 id="articleHeader4">建议：</h2>
<h2 id="articleHeader5">第一步：优化if逻辑</h2>
<p>人们考虑的东西到时候，都会把最可能发生的情况先做好准备。优化if逻辑的时候也可以这样想：把最可能出现的条件放在前面，把最不可能出现的条件放在后面，这样程序执行时总会按照带啊名的先后顺序逐一检测所有的条件，知道发现匹配的条件才会停止继续检测。</p>
<p><code>if</code>的优化目标：最小化找到分支之前所判断条件体的数量。if优化的方法：将最常见的条件放在首位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (i < 5) {
    // 执行一些代码
 } else if (i > 5 &amp;&amp; i < 10) {
    // 执行一些代码
 } else {
    // 执行一些代码
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-keyword">if</span> (<span class="hljs-selector-tag">i</span> &lt; <span class="hljs-number">5</span>) {
    <span class="hljs-comment">// 执行一些代码</span>
 } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-selector-tag">i</span> &gt; <span class="hljs-number">5</span> &amp;&amp; <span class="hljs-selector-tag">i</span> &lt; <span class="hljs-number">10</span>) {
    <span class="hljs-comment">// 执行一些代码</span>
 } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 执行一些代码</span>
 }
</code></pre>
<p>例如上面这个例子，只有在<code>i</code>值经常出现小于5的时候是最优化的。如果i值经常大于或者等于10的话，那么在进入正确的分支之前，就必须两次运算条件体，导致表达式的平均运算时间增加。<code>if</code>中的条件体应该总是按照从最大概率到最小概率排列，以保证理论速度最快。</p>
<h2 id="articleHeader6">第二步：尽量少使用else</h2>
<p>如果在函数中，可以使用 <code>if + return</code>，先判断错误条件，然后立马结束函数，防止进入 <code>else</code> 分支。</p>
<p>举个简单的例子，后端返回数据，前端根据状态进行不同操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax().done(function (res) {
    if (res.state === 'SUCCESS') {
        //TODO
    } else if (res.state === 'FAIL') {
        //TODO
    } else {
        //TODO
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.ajax().done(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-keyword">if</span> (res.state === <span class="hljs-string">'SUCCESS'</span>) {
        <span class="hljs-comment">//TODO</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.state === <span class="hljs-string">'FAIL'</span>) {
        <span class="hljs-comment">//TODO</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//TODO</span>
    }
});
</code></pre>
<p>这里用if else不挺好的么，有啥问题么？不过我个人倾向于switch。</p>
<p>解决方法：</p>
<h3 id="articleHeader7">1. switch/case</h3>
<p>switch和if else在性能上是没有什么区别的，主要还是根据需求进行分析和选择。</p>
<ul>
<li><p>如果条件较小的话选用if else比较合适。</p></li>
<li><p>相反，条件数量较大的话，就建议选用switch。</p></li>
</ul>
<p>一般来说，if else适用于两个离散的值或者不同的值域。如果判断多个离散值，使用switch更加合适。</p>
<blockquote><p>在大多数的情况下switch比if else运行的更加快。</p></blockquote>
<p>在大多数情况下，switch的性能不会比if else低。switch的确在实质上跟if else if 完全一样的效果，不过在很多情况下，使用switch要比if else方便不少</p>
<p>比如经典的值等分支，匹配一些状态常量的时候，比if else结构方便许多，不用反复写xx == yy</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax().done(function (res) {
    switch (res.state) {
        case 'SUCCESS':
            //TODO
            break;
        case 'FAIL':
            //TODO
            break;
        default :
            //TODO
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.ajax().done(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-keyword">switch</span> (res.state) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'SUCCESS'</span>:
            <span class="hljs-comment">//TODO</span>
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'FAIL'</span>:
            <span class="hljs-comment">//TODO</span>
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span> :
            <span class="hljs-comment">//TODO</span>
    }
});
</code></pre>
<p><strong>注意：</strong>千万不要忘记在每一个case语句后面放一个break语句。也可以放一个return或者throw。case语句匹配expression是用===而不是==。</p>
<h3 id="articleHeader8">2.hash 表</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (key == &quot;Apple&quot;) {
    val = &quot;Jobs&quot;;
} else if (key == &quot;microsoft&quot;){
    val = &quot;Gates&quot;;
} else if (key == &quot;Google&quot;){
    val = &quot;Larry&quot;;
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">if</span> (<span class="hljs-attr">key</span> == <span class="hljs-string">"Apple"</span>) {
    <span class="hljs-attr">val</span> = <span class="hljs-string">"Jobs"</span>;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-attr">key</span> == <span class="hljs-string">"microsoft"</span>){
    <span class="hljs-attr">val</span> = <span class="hljs-string">"Gates"</span>;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-attr">key</span> == <span class="hljs-string">"Google"</span>){
    <span class="hljs-attr">val</span> = <span class="hljs-string">"Larry"</span>;
} 
</code></pre>
<p>这个也可以用 <code>switch case</code> 解决，不过推荐的方法是 hash 表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ceos = {&quot;Apple&quot;:&quot;Jobs&quot;, &quot;microsoft&quot;:&quot;Gates&quot;, &quot;Google&quot;:&quot;Larry&quot;};
val = ceos[key];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var ceos</span> = {<span class="hljs-string">"Apple"</span>:<span class="hljs-string">"Jobs"</span>, <span class="hljs-string">"microsoft"</span>:<span class="hljs-string">"Gates"</span>, <span class="hljs-string">"Google"</span>:<span class="hljs-string">"Larry"</span>};
<span class="hljs-attribute">val</span> = ceos[key];
</code></pre>
<h3 id="articleHeader9">3.重构，用 OO 里面的继承或者组合</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.如果是狗，则汪汪
2.如果是猫，则喵喵
3.如果是羊，则咩咩
4.如果是鸭，则嘎嘎
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>如果是狗，则汪汪
<span class="hljs-number">2.</span>如果是猫，则喵喵
<span class="hljs-number">3.</span>如果是羊，则咩咩
<span class="hljs-number">4.</span>如果是鸭，则嘎嘎
</code></pre>
<p>可以重构一下，改成 OO。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*定义类： 动物（或者接口）
*定义方法：叫
*定义子类：狗、猫、羊、鸭
*重写方法 ----  叫
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">*定义类： 动物（或者接口）</span>
<span class="hljs-comment">*定义方法：叫</span>
<span class="hljs-comment">*定义子类：狗、猫、羊、鸭</span>
<span class="hljs-comment">*重写方法 ----  叫</span>
</code></pre>
<p>也就是说将同的判断按照功能，写成函数，这样也便于阅读</p>
<p>比如我有一个方法根据类型获取名称，用if else会这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getName(type) {
    if (type === 'monkey') {
        return 'monkey name';
    } else if (type === 'cat') {
        return 'cat name';
    } else {
        return 'dog name';
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span><span class="hljs-params">(type)</span></span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">type</span> === <span class="hljs-string">'monkey'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'monkey name'</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">type</span> === <span class="hljs-string">'cat'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'cat name'</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'dog name'</span>;
    }
}
</code></pre>
<p>如果写成函数，改成下面的会更好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getName(type) {
    var data = {
        monkey: 'monkey name',
        cat: 'cat name',
        dog: 'dog name'
    }

    return data[type] ? data[type] : data['dog'];
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function getName(type) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = {
        monkey: <span class="hljs-string">'monkey name'</span>,
        cat: <span class="hljs-string">'cat name'</span>,
        dog: <span class="hljs-string">'dog name'</span>
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span>[type] ? <span class="hljs-keyword">data</span>[type] : <span class="hljs-keyword">data</span>[<span class="hljs-string">'dog'</span>];
}
</code></pre>
<p>硬要把设计模式添加到JS里不是不可以，但是要看情况。生搬硬套过来的东西然并卵啊。<br>写代码记住三个字即可，短简易。代码短，读起来简单，维护容易，如果在性能和代码长度上二选一，我肯定选代码短，性能不行，加台服务器就是了。而冗长的代码并不是加个程序员就能搞定的。</p>
<p>保持着这个心态写代码，写出的东西离设计模式也不会差太多了。</p>
<p>多说一句：存在必有其价值，不能说if else多了就不好，凡事无绝对，适合A的未必就适合B，每个东西都有其实现的场景。同理改写设计模式未必就是最棒的，听起来高大上点而已。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在js开发中，如何减少if else语句的使用

## 原文链接
[https://segmentfault.com/a/1190000004829656](https://segmentfault.com/a/1190000004829656)

