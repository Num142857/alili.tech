---
title: 'jquery插件开发入门' 
date: 2018-12-20 2:30:10
hidden: true
slug: wyhk2xvefwe
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<em>i.为GPU一体机项目开发的一款下拉树插件</em><p><em>ii.记录第一次开发jquery插件的过程</em></p>
<p><em>iii.wisdomTree的基本用法</em></p>
</blockquote>
<hr>
<h2 id="articleHeader0">jquery插件的开发模式</h2>
<ul><li>
<p>一般而言，有三种</p>
<ul>
<li>
<code>$.extend()</code>来扩展jQuery</li>
<li>
<code>$.fn</code> 向jQuery添加新的方法</li>
<li>
<code>$.widget()</code>应用jQuery UI的部件工厂方式创建</li>
</ul>
</li></ul>
<h3 id="articleHeader1">$.extend()</h3>
<ul>
<li>
<code>$.extend()</code>函数用于将一个或多个对象的内容合并到目标对象并返回目标对象（第一个对象）,有点写轮眼的味道，下面试试它的用法</li>
<li>
<code>$.extend()</code> 基本用法，可以看出<code>$.extend()</code>返回对象中的所有属性（可理解为属性求和），且属性值向后取值</li>
</ul>
<p>对象属性相同，属性值不同</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend({name:'yh',num:9},{name:'ylone',num:22},{name:'ylone666',num:666})
?
{name: &quot;ylone666&quot;, num: 666}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$.extend({<span class="hljs-string">name:</span><span class="hljs-string">'yh'</span>,<span class="hljs-string">num:</span><span class="hljs-number">9</span>},{<span class="hljs-string">name:</span><span class="hljs-string">'ylone'</span>,<span class="hljs-string">num:</span><span class="hljs-number">22</span>},{<span class="hljs-string">name:</span><span class="hljs-string">'ylone666'</span>,<span class="hljs-string">num:</span><span class="hljs-number">666</span>})
?
{name: <span class="hljs-string">"ylone666"</span>, <span class="hljs-string">num:</span> <span class="hljs-number">666</span>}
</code></pre>
<p>对象属性不同，且目标对象&lt;其他对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend({name:'yh',num:9},{name:'ylone',num:22,cool:true},{name:'ylone666',num:666})
?
{name: &quot;ylone666&quot;, num: 666, cool: true}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$.extend({<span class="hljs-string">name:</span><span class="hljs-string">'yh'</span>,<span class="hljs-string">num:</span><span class="hljs-number">9</span>},{<span class="hljs-string">name:</span><span class="hljs-string">'ylone'</span>,<span class="hljs-string">num:</span><span class="hljs-number">22</span>,<span class="hljs-string">cool:</span><span class="hljs-literal">true</span>},{<span class="hljs-string">name:</span><span class="hljs-string">'ylone666'</span>,<span class="hljs-string">num:</span><span class="hljs-number">666</span>})
?
{name: <span class="hljs-string">"ylone666"</span>, <span class="hljs-string">num:</span> <span class="hljs-number">666</span>, <span class="hljs-string">cool:</span> <span class="hljs-literal">true</span>}
</code></pre>
<p>对象属性不同，且目标对象&gt;其他对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend({name:'yh',num:9,cool:true},{name:'ylone',num:22},{name:'ylone666',num:666})
?
{name: &quot;ylone666&quot;, num: 666, cool: true}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$.extend({<span class="hljs-string">name:</span><span class="hljs-string">'yh'</span>,<span class="hljs-string">num:</span><span class="hljs-number">9</span>,<span class="hljs-string">cool:</span><span class="hljs-literal">true</span>},{<span class="hljs-string">name:</span><span class="hljs-string">'ylone'</span>,<span class="hljs-string">num:</span><span class="hljs-number">22</span>},{<span class="hljs-string">name:</span><span class="hljs-string">'ylone666'</span>,<span class="hljs-string">num:</span><span class="hljs-number">666</span>})
?
{name: <span class="hljs-string">"ylone666"</span>, <span class="hljs-string">num:</span> <span class="hljs-number">666</span>, <span class="hljs-string">cool:</span> <span class="hljs-literal">true</span>}
</code></pre>
<p>对象属性各不相同</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend({name:'yh',cool:true},{num:22},{run:199})
?
{name: &quot;yh&quot;, cool: true, num: 22, run: 199}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$.extend({<span class="hljs-string">name:</span><span class="hljs-string">'yh'</span>,<span class="hljs-string">cool:</span><span class="hljs-literal">true</span>},{<span class="hljs-string">num:</span><span class="hljs-number">22</span>},{<span class="hljs-string">run:</span><span class="hljs-number">199</span>})
?
{name: <span class="hljs-string">"yh"</span>, <span class="hljs-string">cool:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">num:</span> <span class="hljs-number">22</span>, <span class="hljs-string">run:</span> <span class="hljs-number">199</span>}
</code></pre>
<ul><li>
<code>$.extend()</code> 特殊用法</li></ul>
<p>将对象合并到jquery的全局对象中，可以在全局对其进行调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend({test:function(){console.log(&quot;test&quot;)"}}")
?
$.test ? ƒ (){console.log(&quot;test&quot;)}
$.test() ? test
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.extend({<span class="hljs-attr">test</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test"</span>)"}}")
?
$.test ? ƒ (){<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test"</span>)}
$.test() ? test
</code></pre>
<p>重载原型,选择进行深度拷贝，第一个参数配置是否进行深度拷贝,可以看出，深度拷贝对对象里面的对象（即所有属性及其子属性）都进行了 <code>$.extend()</code> 操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//深度拷贝
$.extend( true, {}, 
{ name: &quot;yh&quot;, location: {cool: false,num:&quot;1&quot;} }, 
{ last: &quot;ylone&quot;, location: {state: &quot;well&quot;,county:&quot;China&quot;, cool: true} } );
?
{name: &quot;ylone&quot;, location: {cool:true,county:&quot;China&quot;,num:&quot;1&quot;,state:&quot;well&quot;"}}"
//非深度拷贝
$.extend( false, {}, 
{ name: &quot;yh&quot;, location: {cool: false,num:&quot;1&quot;} }, 
{ name: &quot;ylone&quot;, location: {state: &quot;well&quot;,county:&quot;China&quot;, cool: true} } );
?
{name: &quot;ylone&quot;, location: {cool:true,county:&quot;China&quot;,state:&quot;well&quot;"}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>
<span class="hljs-comment">//深度拷贝</span>
$.extend( <span class="hljs-literal">true</span>, {}, 
{ <span class="hljs-string">name:</span> <span class="hljs-string">"yh"</span>, <span class="hljs-string">location:</span> {<span class="hljs-string">cool:</span> <span class="hljs-literal">false</span>,<span class="hljs-string">num:</span><span class="hljs-string">"1"</span>} }, 
{ <span class="hljs-string">last:</span> <span class="hljs-string">"ylone"</span>, <span class="hljs-string">location:</span> {<span class="hljs-string">state:</span> <span class="hljs-string">"well"</span>,<span class="hljs-string">county:</span><span class="hljs-string">"China"</span>, <span class="hljs-string">cool:</span> <span class="hljs-literal">true</span>} } );
?
{name: <span class="hljs-string">"ylone"</span>, <span class="hljs-string">location:</span> {<span class="hljs-string">cool:</span><span class="hljs-literal">true</span>,<span class="hljs-string">county:</span><span class="hljs-string">"China"</span>,<span class="hljs-string">num:</span><span class="hljs-string">"1"</span>,<span class="hljs-string">state:</span><span class="hljs-string">"well"</span>"}}"
<span class="hljs-comment">//非深度拷贝</span>
$.extend( <span class="hljs-literal">false</span>, {}, 
{ <span class="hljs-string">name:</span> <span class="hljs-string">"yh"</span>, <span class="hljs-string">location:</span> {<span class="hljs-string">cool:</span> <span class="hljs-literal">false</span>,<span class="hljs-string">num:</span><span class="hljs-string">"1"</span>} }, 
{ <span class="hljs-string">name:</span> <span class="hljs-string">"ylone"</span>, <span class="hljs-string">location:</span> {<span class="hljs-string">state:</span> <span class="hljs-string">"well"</span>,<span class="hljs-string">county:</span><span class="hljs-string">"China"</span>, <span class="hljs-string">cool:</span> <span class="hljs-literal">true</span>} } );
?
{name: <span class="hljs-string">"ylone"</span>, <span class="hljs-string">location:</span> {<span class="hljs-string">cool:</span><span class="hljs-literal">true</span>,<span class="hljs-string">county:</span><span class="hljs-string">"China"</span>,<span class="hljs-string">state:</span><span class="hljs-string">"well"</span>"}}"
</code></pre>
<h3 id="articleHeader2">$.fn</h3>
<ul><li>
<code>$.fn</code> 是指jquery的命名空间，加上fn上的方法及属性，会对jquery实例每一个有效,可以简单理解为在全局范围写函数方法</li></ul>
<p>如下相当于是对jquery扩展了一个<em>wsTree</em>方法,那么后面你的每一个jquery实例都可以引用这个方法了. <br>那么你可以这样子：$("#div").wsTree();</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.wsTree = function(options) {
    var wisdomTree = new WISDOMTREE(this, options);
    return wisdomTree.init();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.fn.wsTree = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">var</span> wisdomTree = <span class="hljs-keyword">new</span> WISDOMTREE(<span class="hljs-keyword">this</span>, options);
    <span class="hljs-keyword">return</span> wisdomTree.init();
}
</code></pre>
<p>查看jquery源码, <code>jQuery.fn = jQuery.prototype = {...}</code>,向 <em>$（全局对象）</em>添加属性和方法,通过 <code>$(dom).jquery</code> 即可看到jquery的版本号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.fn = jQuery.prototype = {
// The current version of jQuery being used
jquery: version,
constructor: jQuery,
// The default length of a jQuery object is 0
length: 0,
toArray: function() {
    return slice.call( this );
}...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>jQuery.fn = jQuery.prototype = {
<span class="hljs-comment">// The current version of jQuery being used</span>
<span class="hljs-string">jquery:</span> version,
<span class="hljs-string">constructor:</span> jQuery,
<span class="hljs-comment">// The default length of a jQuery object is 0</span>
<span class="hljs-string">length:</span> <span class="hljs-number">0</span>,
<span class="hljs-string">toArray:</span> function() {
    <span class="hljs-keyword">return</span> slice.call( <span class="hljs-keyword">this</span> );
}...
</code></pre>
<h3 id="articleHeader3">面向对象</h3>
<ul>
<li>这次开发过程对于面向对象的三个基本特性（封装，继承，多态）有了更深的理解</li>
<li>使用面对对象的开发模式，方便管理，更重要的是不会污染外部的命名空间，实际上，我们只需要在全局命名空间上声明一个对象初始化的方法，然后将函数和变量写在对象的内部，变成对象的方法和对象的属性就好了</li>
</ul>
<h3 id="articleHeader4">自调用匿名函数包裹代码块</h3>
<ul>
<li>一个自我调用的匿名函数在创建时自动,立即运行，并且没有名字，因此被称为<strong>自调用匿名函数</strong>
</li>
<li>基本格式：<code>;(fucntion($, window, document, undefined){ code... })(jQuery, window, document)</code>
</li>
<li>作用原理：函数可以形成一个作用域，域内的代码是无法被外界访问的，如果我们将自己的代码放入一个函数中，那么就不会污染全局命名空间，同时不会和别的代码冲突</li>
<li>函数前的 <code>;</code> 作用：自调用匿名函数与上一段代码相连，如果上一段代码没有以分号结束，而我们又没有主动地加上分好，那么会导致函数编译出错</li>
<li>将系统变量以参数形式传递到插件内部，可以提高对系统变量的访问速度，其中 <code>undefined</code> 的妙处在于：为了得到没有被修改的  <code>undefined</code>，我们并没有传递这个参数，但却在接收时接收了它，因为实际并没有传，所以<code>undefined</code>那个位置接收到的就是真实的<code>undefined</code>
</li>
</ul>
<h2 id="articleHeader5">wisdomTree开发过程</h2>
<p>在全局命名空间添加声明对象的方法，<code>options</code> 表示在使用插件，创建对象时的一些配置项, <code>this</code>表示选择的元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.wsTree = function(options) {
    var wisdomTree = new WISDOMTREE(this, options);
    return wisdomTree;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$.fn.wsTree = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">var</span> wisdomTree = <span class="hljs-keyword">new</span> WISDOMTREE(<span class="hljs-keyword">this</span>, options);
    <span class="hljs-keyword">return</span> wisdomTree;
}
</code></pre>
<p>接着，在 <code>WISDOMTREE</code> 对象内添加一些默认属性，<code>$.extend({}, this.defaults, opt)</code> 使用 <code>{}</code> 来保护默认配置项，将选择元素与配置放在 <code>this(它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用 )</code> 中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var WISDOMTREE = function(ele, opt) {
    this.element = ele,
        this.defaults = {
            'data': '', //数据
            'buttonValue': 'WISDOMTREE', //标题栏提示
            'buttonStyle': { //标题栏样式
                &quot;width&quot;: &quot;100px&quot;,
                &quot;border&quot;: &quot;1px solid #999&quot;,
                &quot;height&quot;: &quot;26px&quot;,
                &quot;line-height&quot;: &quot;26px&quot;,
                &quot;text-align&quot;: &quot;center&quot;
            },
            'conStyle': { //下拉框样式
                &quot;width&quot;: &quot;220px&quot;,
                &quot;max-height&quot;: &quot;600px&quot;,
                &quot;border&quot;: &quot;1px solid #222&quot;
            },
            'treeHeight': null, //树的高度
            'fontColor': '#000', //树字体颜色
            'fontBackgrd': '#fff', //树字体背景颜色
            'chkType': 'checkbox', //选择方式，单选（radio）或者多选（checkbox）
            'chkRela': { &quot;Y&quot;: &quot;ps&quot;, &quot;N&quot;: &quot;ps&quot; }, //父子关联关系，
            'rootParam': ['name'], //父节点属性
            'seedParam': ['name'], //子节点属性
            'rootIcon': null, //父节点图标样式
            'seedIcon': null, //子节点图标样式
            'rootNoCheck': false, //顶级父节点是否可以选中
            'ancientId': true, //是否获取祖先元素的ID
            'onDownCallBack': null, //收起下拉树的回调
            'isQuery': false, //是否显示搜索框
            'queryOpen': false, //是否展示搜索框
            'queryCallBack': null, //搜索事件回调
            'queryParam': {} //搜索的参数
        },
        this.options = $.extend(true, {}, this.defaults, opt);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> WISDOMTREE = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ele, opt</span>) </span>{
    <span class="hljs-keyword">this</span>.element = ele,
        <span class="hljs-keyword">this</span>.defaults = {
            <span class="hljs-string">'data'</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">//数据</span>
            <span class="hljs-string">'buttonValue'</span>: <span class="hljs-string">'WISDOMTREE'</span>, <span class="hljs-comment">//标题栏提示</span>
            <span class="hljs-string">'buttonStyle'</span>: { <span class="hljs-comment">//标题栏样式</span>
                <span class="hljs-string">"width"</span>: <span class="hljs-string">"100px"</span>,
                <span class="hljs-string">"border"</span>: <span class="hljs-string">"1px solid #999"</span>,
                <span class="hljs-string">"height"</span>: <span class="hljs-string">"26px"</span>,
                <span class="hljs-string">"line-height"</span>: <span class="hljs-string">"26px"</span>,
                <span class="hljs-string">"text-align"</span>: <span class="hljs-string">"center"</span>
            },
            <span class="hljs-string">'conStyle'</span>: { <span class="hljs-comment">//下拉框样式</span>
                <span class="hljs-string">"width"</span>: <span class="hljs-string">"220px"</span>,
                <span class="hljs-string">"max-height"</span>: <span class="hljs-string">"600px"</span>,
                <span class="hljs-string">"border"</span>: <span class="hljs-string">"1px solid #222"</span>
            },
            <span class="hljs-string">'treeHeight'</span>: <span class="hljs-literal">null</span>, <span class="hljs-comment">//树的高度</span>
            <span class="hljs-string">'fontColor'</span>: <span class="hljs-string">'#000'</span>, <span class="hljs-comment">//树字体颜色</span>
            <span class="hljs-string">'fontBackgrd'</span>: <span class="hljs-string">'#fff'</span>, <span class="hljs-comment">//树字体背景颜色</span>
            <span class="hljs-string">'chkType'</span>: <span class="hljs-string">'checkbox'</span>, <span class="hljs-comment">//选择方式，单选（radio）或者多选（checkbox）</span>
            <span class="hljs-string">'chkRela'</span>: { <span class="hljs-string">"Y"</span>: <span class="hljs-string">"ps"</span>, <span class="hljs-string">"N"</span>: <span class="hljs-string">"ps"</span> }, <span class="hljs-comment">//父子关联关系，</span>
            <span class="hljs-string">'rootParam'</span>: [<span class="hljs-string">'name'</span>], <span class="hljs-comment">//父节点属性</span>
            <span class="hljs-string">'seedParam'</span>: [<span class="hljs-string">'name'</span>], <span class="hljs-comment">//子节点属性</span>
            <span class="hljs-string">'rootIcon'</span>: <span class="hljs-literal">null</span>, <span class="hljs-comment">//父节点图标样式</span>
            <span class="hljs-string">'seedIcon'</span>: <span class="hljs-literal">null</span>, <span class="hljs-comment">//子节点图标样式</span>
            <span class="hljs-string">'rootNoCheck'</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//顶级父节点是否可以选中</span>
            <span class="hljs-string">'ancientId'</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//是否获取祖先元素的ID</span>
            <span class="hljs-string">'onDownCallBack'</span>: <span class="hljs-literal">null</span>, <span class="hljs-comment">//收起下拉树的回调</span>
            <span class="hljs-string">'isQuery'</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//是否显示搜索框</span>
            <span class="hljs-string">'queryOpen'</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//是否展示搜索框</span>
            <span class="hljs-string">'queryCallBack'</span>: <span class="hljs-literal">null</span>, <span class="hljs-comment">//搜索事件回调</span>
            <span class="hljs-string">'queryParam'</span>: {} <span class="hljs-comment">//搜索的参数</span>
        },
        <span class="hljs-keyword">this</span>.options = $.extend(<span class="hljs-literal">true</span>, {}, <span class="hljs-keyword">this</span>.defaults, opt);
}
</code></pre>
<p>最后，向 <code>WISDOMTREE</code> 对象中添加一些方法，一套插件三连，带走~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WISDOMTREE.prototype = {
    //初始化
    init: function() {
        var $SELMAIN = this.element.attr(&quot;id&quot;);
        ...
        },
    //获取值
    get: function()
    ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>WISDOMTREE.prototype = {
    <span class="hljs-comment">//初始化</span>
    init: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $SELMAIN = <span class="hljs-keyword">this</span>.element.attr(<span class="hljs-string">"id"</span>);
        ...
        },
    <span class="hljs-comment">//获取值</span>
    get: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)
    ...
}
</span></code></pre>
<ul><li>如果你喜欢，可以对插件内容进行<a href="http://tool.oschina.net/jscompress/" rel="nofollow noreferrer" target="_blank">压缩</a>,毕竟js文件的大小会对性能产生影响</li></ul>
<h2 id="articleHeader6">踩过的坑</h2>
<ul>
<li>要理解和注意全局命名空间，最初我自己在全局定义了 <code>init()</code> 方法，控制台一直报错</li>
<li>
<p>理解面向对象的三大特性，最初我在 <code>$.fn.wstree</code> 内返回的是 <code>wisdomTree.init()</code> 方法，这样做的坏处在于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 没有充分利用面向对象的思维

- 污染了全局命名空间，因为要用到对象中封装的方法，还需要 `$.fn` 一下

- 当你要用对象内封装的 `get()` 时，还需要将关键的配置项再传一次，否则就会以默认配置项进行处理
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> 没有充分利用面向对象的思维
</span>
-<span class="ruby"> 污染了全局命名空间，因为要用到对象中封装的方法，还需要 <span class="hljs-string">`$.fn`</span> 一下
</span>
-<span class="ruby"> 当你要用对象内封装的 <span class="hljs-string">`get()`</span> 时，还需要将关键的配置项再传一次，否则就会以默认配置项进行处理
</span></code></pre>
</li>
<li>对于 <code>WISDOMTREE.prototype</code> 里面 <code>this</code> 对象相当于全局变量</li>
</ul>
<h2 id="articleHeader7">基本用法</h2>
<ul><li>具体参考<a href="https://github.com/YLoNe666/wisdomTree" rel="nofollow noreferrer" target="_blank">wisdomTree</a>,里面对插件配置及使用方法进行了详细的介绍</li></ul>
<h2 id="articleHeader8">行文参考</h2>
<ul>
<li><a href="http://www.cnblogs.com/Wayou/p/jquery_plugin_tutorial.html" rel="nofollow noreferrer" target="_blank">jQuery插件开发精品教程，让你的jQuery提升一个台阶</a></li>
<li><a href="https://sarfraznawaz.wordpress.com/2012/01/26/javascript-self-invoking-functions/" rel="nofollow noreferrer" target="_blank">Javascript Self Invoking Functions</a></li>
</ul>
<h2 id="articleHeader9">?Merry X'mas all!</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jquery插件开发入门

## 原文链接
[https://segmentfault.com/a/1190000012609631](https://segmentfault.com/a/1190000012609631)

