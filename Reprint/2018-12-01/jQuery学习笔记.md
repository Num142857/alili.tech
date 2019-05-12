---
title: 'jQuery学习笔记' 
date: 2018-12-01 2:30:12
hidden: true
slug: itq2fi7jz6d
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">jQuery</h3>
<ul>
<li>
<p>提高业务编程能力</p>
<ul>
<li><p>JQ中提供了很多的方法（基本都兼容），我们可以使用这些方法快速开发项目</p></li>
<li><p>JQ中有的方法提供的思想可以让我们把项目实现得更优化</p></li>
</ul>
</li>
<li>
<p>提高JS基础以及一些高级编程思想</p>
<ul>
<li><p>分析JQ源码，学习里面类库封装的思想和一些方法实现的原理</p></li>
<li><p>有时间把JQ中提供的常用方法都去实现一遍，提高自己的编程能力</p></li>
</ul>
</li>
</ul>
<h5>1.jQuery的原理</h5>
<ul>
<li><p>jquery-1.xxx: 专门为PC端诞生的类库，兼容所有的浏览器</p></li>
<li><p>jquery-2.xxx: 当初是为了移动端而准备的，所以IE低版本浏览器一般不兼容，但是这个版本针对移动端的事件等操作也不是特别完善，被Zepto这个类库取代了</p></li>
</ul>
<blockquote><p>jQuery充分利用了JS中函数的三种特性：普通函数、类、普通对象；jQuery就是这个类，在外面使用的$和jQuery是一个东西，jQuery中提供的方法分为两部分：写在原型上的方法和写在jQuery私有属性上的方法；创建jQuery实例的时候，会返回一个类数组（它也是jQuery实例），这个类数组是jQuery自己去创建的，里面有一些自己特定的属性</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jQuery核心原理
(function(){
    var version=&quot;1.11.3&quot;,
    jQuery=function(selector,context){
        return jQuery.fn.innt(selector,context);
    };
    
    jQuery.fn=jQuery.prototype={
        //...
        init:function(selector,context){
            
        }
    };
    
    jQuery.ajax=function(){};
    
    window.jQuery=window.$=jQuery;
    
})();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//jQuery核心原理</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> version=<span class="hljs-string">"1.11.3"</span>,
    jQuery=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector,context</span>)</span>{
        <span class="hljs-keyword">return</span> jQuery.fn.innt(selector,context);
    };
    
    jQuery.fn=jQuery.prototype={
        <span class="hljs-comment">//...</span>
        init:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector,context</span>)</span>{
            
        }
    };
    
    jQuery.ajax=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
    
    <span class="hljs-built_in">window</span>.jQuery=<span class="hljs-built_in">window</span>.$=jQuery;
    
})();
</code></pre>
<ul><li><p>jQuery对象和JS对象相互转换</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//jQuery对象转换成JS对象
var $obj=$(&quot;*&quot;);
$obj[0];  //-->JS对象
$obj.get(0);  //-->JS对象
$obj.eq(0)  //-->这个获取的是jQuery对象

//JS对象转换成jQuery对象
var obj=document.getElementsByTagName(&quot;*&quot;);
$(obj);  //-->jQuery对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//jQuery对象转换成JS对象</span>
<span class="hljs-keyword">var</span> $obj=$(<span class="hljs-string">"*"</span>);
$obj[<span class="hljs-number">0</span>];  <span class="hljs-comment">//--&gt;JS对象</span>
$obj.get(<span class="hljs-number">0</span>);  <span class="hljs-comment">//--&gt;JS对象</span>
$obj.eq(<span class="hljs-number">0</span>)  <span class="hljs-comment">//--&gt;这个获取的是jQuery对象</span>

<span class="hljs-comment">//JS对象转换成jQuery对象</span>
<span class="hljs-keyword">var</span> obj=<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"*"</span>);
$(obj);  <span class="hljs-comment">//--&gt;jQuery对象</span></code></pre>
<ul><li><p>extend</p></li></ul>
<p>在jQuery对象上和jQuery实例上都有这个方法，并且都是同一个方法，但是这两个方法执行时其this指向不一样，也就是说extend所扩展的方法所在的扩展位置不一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend({
    aa:function(){}
});
$.aa();
//->aa扩展到jQuery的属性上了：完善类库，提供一些常用的操作方法，例如，数组去重...

$.fn.extend({
    bb:function(){}
});
$([select]).bb();
//-->bb扩展到jQuery的原型上了：扩展插件，例如，选项卡、轮播图、登录、验证..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.extend({
    <span class="hljs-attr">aa</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}
});
$.aa();
<span class="hljs-comment">//-&gt;aa扩展到jQuery的属性上了：完善类库，提供一些常用的操作方法，例如，数组去重...</span>

$.fn.extend({
    <span class="hljs-attr">bb</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}
});
$([select]).bb();
<span class="hljs-comment">//--&gt;bb扩展到jQuery的原型上了：扩展插件，例如，选项卡、轮播图、登录、验证...</span></code></pre>
<h5>2.jQuery的常用方法</h5>
<ul><li><p>1）选择器</p></li></ul>
<p>CSS选择器有哪些，jQuery选择器基本上就有哪些：#ID、.class、tagName、*、selector,selector、parent offspring、parent&gt;child、:first、:last、:not、:contain、:eq、:gt、:lt、:text...</p>
<ul>
<li>
<p>2）核心方法</p>
<ul>
<li><p>$([selector|node|function],[context])</p></li>
<li><p>$([html])</p></li>
<li><p>each(callback)</p></li>
<li><p>get()</p></li>
<li><p>index()</p></li>
<li><p>length</p></li>
<li><p>context</p></li>
<li><p>selector</p></li>
<li><p>noConflict()</p></li>
<li><p>extend()</p></li>
</ul>
</li>
<li>
<p>3）属性方法</p>
<ul>
<li><p>attr()：设置或获取自定义属性值，获取的值是字符串类型的</p></li>
<li><p>removeAttr()</p></li>
<li><p>prop()：操作的是元素的内置属性</p></li>
<li><p>addClass()</p></li>
<li><p>removeClass()</p></li>
<li><p>hasClass()</p></li>
<li><p>toggleClass()</p></li>
<li><p>html()：获取或设置元素的innerHTML</p></li>
<li><p>text()：获取或设置元素的innerText</p></li>
<li><p>val()：获取或设置元素的value值</p></li>
</ul>
</li>
<li>
<p>4）CSS方法</p>
<ul>
<li><p>css()</p></li>
<li><p>offset()：当前元素距离body的偏移：{top:xxx,left:xxx}</p></li>
<li><p>position()：当前元素距离父级已定位参照物的偏移</p></li>
<li><p>scrollTop() / scrollLeft()：获取或者设置滚动值</p></li>
<li><p>height() / width()：设置或获取元素的宽高</p></li>
<li><p>innerWidth() / innerHeight()：获取元素的clientHeight/clientWidth</p></li>
<li><p>outerWidth() / outerHeight()：获取元素的offsetHeight/offsetWidth</p></li>
</ul>
</li>
<li>
<p>5）DOM操作方法</p>
<ul>
<li><p>append()</p></li>
<li><p>appendTo()</p></li>
<li><p>prepend()</p></li>
<li><p>prependTo()</p></li>
<li><p>insertBefore() / insertAfter()</p></li>
<li><p>clone()</p></li>
<li><p>remove()</p></li>
</ul>
</li>
<li>
<p>6）筛选方法</p>
<ul>
<li><p>eq()</p></li>
<li><p>filter()：同级筛选</p></li>
<li><p>children()：子级筛选</p></li>
<li><p>find()：后代筛选</p></li>
<li><p>first() / last()</p></li>
<li><p>not()</p></li>
<li><p>slice()</p></li>
<li><p>next() / prev()</p></li>
<li><p>nextAll() / prevAll()</p></li>
<li><p>sibings()</p></li>
<li><p>add()</p></li>
<li><p>contents()</p></li>
</ul>
</li>
<li>
<p>7）动画方法</p>
<ul>
<li><p>animate()</p></li>
<li><p>stop()</p></li>
<li><p>finish()</p></li>
<li><p>show() / hide() / toggle()</p></li>
<li><p>fadeIn() / fadeOut() / fadeToggle()</p></li>
<li><p>sliceDown() / sliceUp() / scliceToggle()</p></li>
<li><p>delay()</p></li>
</ul>
</li>
<li>
<p>8）事件方法</p>
<ul>
<li><p>on() / off()：解决jQuery事件的一切需求，其它方法也是从这个方法里扩展的</p></li>
<li><p>bind() / unbind() / trigger()</p></li>
<li><p>one()</p></li>
<li><p>live() / delegate()</p></li>
<li><p>click()/hover()/mouseover()...</p></li>
</ul>
</li>
<li>
<p>9）工具方法</p>
<ul>
<li><p>callbacks()</p></li>
<li><p>makeArray()</p></li>
<li><p>toArray()</p></li>
<li><p>parseJSON()</p></li>
<li><p>parseXML()</p></li>
<li><p>type()</p></li>
<li><p>isFunction()</p></li>
<li><p>trim()</p></li>
<li><p>param()</p></li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//只要当前页面的HTML结构加载完成，就会执行回调函数，而且在一个页面中可以执行多次
$(document).ready(function(){
    //<javascript code>

});

$(function(){});  //这种方式和上面的方式一样，没有区别

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//只要当前页面的HTML结构加载完成，就会执行回调函数，而且在一个页面中可以执行多次</span>
$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//&lt;javascript code&gt;</span>

});

$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});  <span class="hljs-comment">//这种方式和上面的方式一样，没有区别</span>

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery学习笔记

## 原文链接
[https://segmentfault.com/a/1190000010063989](https://segmentfault.com/a/1190000010063989)

