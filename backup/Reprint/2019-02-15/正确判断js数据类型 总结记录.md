---
title: '正确判断js数据类型 总结记录' 
date: 2019-02-15 2:30:44
hidden: true
slug: rewq4piamzm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">正确判断js数据类型 总结记录</h2>
<p><strong>判断js中的数据类型有一下几种方法：typeof、instanceof、 constructor、 prototype、 三方库。</strong></p>
<h2 id="articleHeader1">js六大数据类型</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="number：   数字，整数、浮点数等等，
string：   单引号或者双引号来说明，
Boolean：  返回true和false，这两个值不一定对应1和0
object：   对象，可以执行new操作符后跟要创建的对象类型的名称来创建。
null：     只有一个值得数据类型，逻辑上讲，null值表示一个空对象指针。
undefined：未定义，使用var声明变量但未对其初始化时，变量的值就是undefined。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">number</span>：   数字，整数、浮点数等等，
<span class="hljs-built_in">string</span>：   单引号或者双引号来说明，
<span class="hljs-built_in">Boolean</span>：  返回<span class="hljs-literal">true</span>和<span class="hljs-literal">false</span>，这两个值不一定对应<span class="hljs-number">1</span>和<span class="hljs-number">0</span>
object：   对象，可以执行<span class="hljs-keyword">new</span>操作符后跟要创建的对象类型的名称来创建。
<span class="hljs-literal">null</span>：     只有一个值得数据类型，逻辑上讲，<span class="hljs-literal">null</span>值表示一个空对象指针。
<span class="hljs-literal">undefined</span>：未定义，使用<span class="hljs-keyword">var</span>声明变量但未对其初始化时，变量的值就是<span class="hljs-literal">undefined</span>。
</code></pre>
<h2 id="articleHeader2">1、typeof</h2>
<p><strong>在实际的项目应用中，typeof只有两个用途，就是检测一个元素是否为undefined，或者是否为function。原因如下：</strong><br>JavaScript Garden整理出来了如下表格</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Value               function   typeof
-------------------------------------
&quot;foo&quot;               String     string
new String(&quot;foo&quot;)   String     object
1.2                 Number     number
new Number(1.2)     Number     object
true                Boolean    boolean
new Boolean(true)   Boolean    object
new Date()          Date       object
new Error()         Error      object
[1,2,3]             Array      object
new Array(1, 2, 3)  Array      object
new Function(&quot;&quot;)    Function   function
/abc/g              RegExp     object
new RegExp(&quot;meow&quot;)  RegExp     object
{}                  Object     object
new Object()        Object     object " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-type">Value</span>               function   typeof
-------------------------------------
<span class="hljs-string">"foo"</span>               <span class="hljs-type">String</span>     string
<span class="hljs-keyword">new</span> <span class="hljs-type">String</span>(<span class="hljs-string">"foo"</span>)   <span class="hljs-type">String</span>     <span class="hljs-class"><span class="hljs-keyword">object</span></span>
<span class="hljs-number">1.2</span>                 <span class="hljs-type">Number</span>     number
<span class="hljs-keyword">new</span> <span class="hljs-type">Number</span>(<span class="hljs-number">1.2</span>)     <span class="hljs-type">Number</span>     <span class="hljs-class"><span class="hljs-keyword">object</span></span>
<span class="hljs-literal">true</span>                <span class="hljs-type">Boolean</span>    boolean
<span class="hljs-keyword">new</span> <span class="hljs-type">Boolean</span>(<span class="hljs-literal">true</span>)   <span class="hljs-type">Boolean</span>    <span class="hljs-class"><span class="hljs-keyword">object</span></span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>()          <span class="hljs-type">Date</span>       <span class="hljs-class"><span class="hljs-keyword">object</span></span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>()         <span class="hljs-type">Error</span>      <span class="hljs-class"><span class="hljs-keyword">object</span></span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]             <span class="hljs-type">Array</span>      <span class="hljs-class"><span class="hljs-keyword">object</span></span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)  <span class="hljs-type">Array</span>      <span class="hljs-class"><span class="hljs-keyword">object</span></span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Function</span>(<span class="hljs-string">""</span>)    <span class="hljs-type">Function</span>   function
/abc/g              <span class="hljs-type">RegExp</span>     <span class="hljs-class"><span class="hljs-keyword">object</span></span>
<span class="hljs-keyword">new</span> <span class="hljs-type">RegExp</span>(<span class="hljs-string">"meow"</span>)  <span class="hljs-type">RegExp</span>     <span class="hljs-class"><span class="hljs-keyword">object</span></span>
{}                  <span class="hljs-type">Object</span>     <span class="hljs-class"><span class="hljs-keyword">object</span></span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Object</span>()        <span class="hljs-type">Object</span>     <span class="hljs-class"><span class="hljs-keyword">object</span> </span></code></pre>
<h2 id="articleHeader3">2、instanceof</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = new Date();
var c = function(){};

alert(a instanceof Array) ---------------> true
alert(b instanceof Date) 
alert(c instanceof Function) ------------> true
alert(c instanceof function) ------------> false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">var</span> c = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};

alert(a <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) ---------------&gt; <span class="hljs-literal">true</span>
alert(b <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Date</span>) 
alert(c <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>) ------------&gt; <span class="hljs-literal">true</span>
alert(c <span class="hljs-keyword">instanceof</span> <span class="hljs-function"><span class="hljs-keyword">function</span>) ------------&gt; <span class="hljs-title">false</span></span></code></pre>
<h2 id="articleHeader4">3、constructor</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = [1,2,3];
var b = new Date();
var c = function(){};

alert(c.constructor === Array) ----------> true
alert(d.constructor === Date) -----------> true
alert(e.constructor === Function) -------> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">var</span> c = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};

alert(c.constructor === <span class="hljs-built_in">Array</span>) ----------&gt; <span class="hljs-literal">true</span>
alert(d.constructor === <span class="hljs-built_in">Date</span>) -----------&gt; <span class="hljs-literal">true</span>
alert(e.constructor === <span class="hljs-built_in">Function</span>) -------&gt; <span class="hljs-literal">true</span></code></pre>
<p><strong><em>注：</em></strong><br>&nbsp; &nbsp; &nbsp; 使用instaceof和construcor,被判断的引用类型（Object Array）必须是在当前页面声明的！比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array ==object.constructor;会返回false；<br>原因：<br>1、array属于引用型数据，在传递过程中，仅仅是引用地址的传递。<br>2、每个页面的Array原生对象所引用的地址是不一样的，在子页面声明的array，所对应的构造函数，是子页面的Array对象；父页面来进行判断，使用的Array并不等于子页面的Array。</p>
<h2 id="articleHeader5">4、prototype（通用）</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.call()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>()</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var toString = Object.prototype.toString;

toString.call(undefined);  -------------> [object Undefined]
toString.call(null);       -------------> [object Null]
toString.call(new Date);   -------------> [object Date]
toString.call(new String); -------------> [object String]
toString.call(Math);       -------------> [object Math]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>var toString = <span class="hljs-built_in">Object</span>.prototype.toString;

toString.<span class="hljs-keyword">call</span>(undefined);  -------------&gt; [<span class="hljs-built_in">object</span> Undefined]
toString.<span class="hljs-keyword">call</span>(null);       -------------&gt; [<span class="hljs-built_in">object</span> Null]
toString.<span class="hljs-keyword">call</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>);   -------------&gt; [<span class="hljs-built_in">object</span> <span class="hljs-built_in">Date</span>]
toString.<span class="hljs-keyword">call</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>); -------------&gt; [<span class="hljs-built_in">object</span> <span class="hljs-built_in">String</span>]
toString.<span class="hljs-keyword">call</span>(Math);       -------------&gt; [<span class="hljs-built_in">object</span> Math]</code></pre>
<p>jQuery.type()源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var class2type = {} ;
&quot;Boolean Number String Function Array Date RegExp Object Error&quot;.split(&quot; &quot;).forEach(function(e,i){
    class2type[ &quot;[object &quot; + e + &quot;]&quot; ] = e.toLowerCase();
}) ;

function _typeof(obj){
    if ( obj == null ){
        return String( obj );
    }
    return typeof obj === &quot;object&quot; || typeof obj === &quot;function&quot; ?
        class2type[ class2type.toString.call(obj) ] || &quot;object&quot; :
        typeof obj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> class2type = {} ;
<span class="hljs-string">"Boolean Number String Function Array Date RegExp Object Error"</span>.split(<span class="hljs-string">" "</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e,i</span>)</span>{
    class2type[ <span class="hljs-string">"[object "</span> + e + <span class="hljs-string">"]"</span> ] = e.toLowerCase();
}) ;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_typeof</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">if</span> ( obj == <span class="hljs-literal">null</span> ){
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>( obj );
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">"function"</span> ?
        class2type[ class2type.toString.call(obj) ] || <span class="hljs-string">"object"</span> :
        <span class="hljs-keyword">typeof</span> obj;
}</code></pre>
<p><strong><em>注：数组还可以用 Array.isArray(); 或者根据其具有的方法去判断。不再细述</em></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
正确判断js数据类型 总结记录

## 原文链接
[https://segmentfault.com/a/1190000016940601](https://segmentfault.com/a/1190000016940601)

