---
title: '本地存储localStorage以及它的封装接口store.js的使用' 
date: 2019-01-31 2:31:16
hidden: true
slug: bwe6h0cryeg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">本地存储localstorage</h2>
<p><code>localstorage</code> 是 HTML5 提供的在<code>客户端</code>存储数据的新方法，主要作用是将数据保存在客户端中，并且数据是<code>永久保存</code>的，除非人为干预删除。</p>
<p><code>localstorage</code>作为本地存储来使用，解决了<code>cookie</code>存储空间不足的问题：<code>cookie</code>中每条cookie的存储空间为4k，但<code>localStorage</code>的存储空间有5M大小。另外，相比于cookie，<code>localStorage</code>可以<code>节约带宽</code>，在同一个域内，浏览器每次向服务器发送请求，http都会带着cookie，使cookie在浏览器和服务器之间来回传递，浪费带宽，但localStorage将第一次请求的数据直接存储到本地，避免了来回传递。</p>
<p><strong>localstorage 的局限</strong><br>1、只有版本较高的浏览器中才支持 localstorage<br>2、localStorage的值的类型限定为string类型，使用 <code>JSON</code> 时需转换<br>3、如果存储内容过多会消耗内存空间，导致页面变卡，因为localStorage本质上是对字符串的读取</p>
<p>localstorage 有两种方法：分别是 <code>localstorage</code> 和 <code>sessionStorage</code> 。<code>sessionStorage</code> 方法<code>针对一个 session</code> 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。localStorage与sessionStorage的唯一区别就是localStorage属于永久性存储，而sessionStorage在当会话结束的时候，sessionStorage中的键值对会被清空。</p>
<p><strong>localstorage的用法</strong><br>我们在使用localStorage的时候，需要先判断浏览器是否支持localStorage这个属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(window.localStorage){
 alert(&quot;浏览器支持localStorage&quot;);
 
 }else{
 alert(&quot;浏览器支持localStorage&quot;);
 }﻿​" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">if</span>(<span class="hljs-keyword">window</span>.localStorage){
 alert(<span class="hljs-string">"浏览器支持localStorage"</span>);
 
 }<span class="hljs-keyword">else</span>{
 alert(<span class="hljs-string">"浏览器支持localStorage"</span>);
 }﻿​</code></pre>
<p>接下来分别是它的写入、读取、删除</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//localStorage的写入
var storage=window.localStorage;
 storage[&quot;a&quot;]=1;   //写入a字段
 storage.b=2;   //写入b字段
 storage.setItem(&quot;c&quot;,3);   //写入c字段
 console.log(typeof storage[&quot;a&quot;]);  //string
 console.log(typeof storage[&quot;b&quot;]);  //string
 console.log(typeof storage[&quot;c&quot;]);﻿​//string 
//localStorage的读取
var a=storage.a;
 console.log(a);  //1
var b=storage[&quot;b&quot;];
 console.log(b);  //2
var c=storage.getItem(&quot;c&quot;);
 console.log(c);﻿​  //3
//localStorage的删除
storage.clear();  //将localStorage的所有内容清除
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//localStorage的写入</span>
<span class="hljs-keyword">var</span> storage=<span class="hljs-keyword">window</span>.localStorage;
 storage[<span class="hljs-string">"a"</span>]=1;   <span class="hljs-comment">//写入a字段</span>
 storage.b=2;   <span class="hljs-comment">//写入b字段</span>
 storage.setItem(<span class="hljs-string">"c"</span>,3);   <span class="hljs-comment">//写入c字段</span>
 console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">typeof</span> storage[<span class="hljs-string">"a"</span>]);  <span class="hljs-comment">//string</span>
 console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">typeof</span> storage[<span class="hljs-string">"b"</span>]);  <span class="hljs-comment">//string</span>
 console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">typeof</span> storage[<span class="hljs-string">"c"</span>]);﻿​<span class="hljs-comment">//string </span>
<span class="hljs-comment">//localStorage的读取</span>
<span class="hljs-keyword">var</span> a=storage.a;
 console.<span class="hljs-built_in">log</span>(a);  <span class="hljs-comment">//1</span>
<span class="hljs-keyword">var</span> b=storage[<span class="hljs-string">"b"</span>];
 console.<span class="hljs-built_in">log</span>(b);  <span class="hljs-comment">//2</span>
<span class="hljs-keyword">var</span> c=storage.getItem(<span class="hljs-string">"c"</span>);
 console.<span class="hljs-built_in">log</span>(c);﻿​  <span class="hljs-comment">//3</span>
<span class="hljs-comment">//localStorage的删除</span>
storage.<span class="hljs-keyword">clear</span>();  <span class="hljs-comment">//将localStorage的所有内容清除</span>
</code></pre>
<p>使用key()方法，获取相应的键</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var storage=window.localStorage;
 storage.a=1;
 storage.setItem(&quot;c&quot;,3);
 for(var i=0;i<storage.length;i++){
 var key = storage.key(i);
 console.log(key);  //a  c
 }﻿​" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> storage=window.localStorage;
 storage.a=<span class="hljs-number">1</span>;
 storage.setItem(<span class="hljs-string">"c"</span>,<span class="hljs-number">3</span>);
 <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>;i&lt;storage.<span class="hljs-built_in">length</span>;i++){
 <span class="hljs-built_in">var</span> <span class="hljs-built_in">key</span> = storage.<span class="hljs-built_in">key</span>(i);
 console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">key</span>);  //a  c
 }﻿​</code></pre>
<p>对用户访问页面的次数进行计数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(localStorage.pagecount){
 localStorage.pagecount = Number(localStorage.pagecount)+1;
 }else{
 localStorage.pagecount = 1;
 }
 document.write(&quot;你第&quot;+localStorage.pagecount+&quot;访问该页面&quot;);﻿​" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-keyword">if</span>(<span class="hljs-built_in">local</span>Storage.pagecount){
 <span class="hljs-built_in">local</span>Storage.pagecount = Number(<span class="hljs-built_in">local</span>Storage.pagecount)+1;
 }<span class="hljs-keyword">else</span>{
 <span class="hljs-built_in">local</span>Storage.pagecount = 1;
 }
 document.write(<span class="hljs-string">"你第"</span>+<span class="hljs-built_in">local</span>Storage.pagecount+<span class="hljs-string">"访问该页面"</span>);﻿​</code></pre>
<p>sessionStorage的用法和localStorage一样用法和localStorage一样，但是关闭计数页面后再打开时会重新开始计数。</p>
<h2 id="articleHeader1">store.js</h2>
<p><a href="https://github.com/marcuswestin/store.js" rel="nofollow noreferrer" target="_blank">GitHub地址</a><br>store.js 是一个兼容所有浏览器的 LocalStorage 包装器，不需要借助 Cookie 或者 Flash来实现。它提供非常了简洁的 API 来实现跨浏览器的本地存储功能。</p>
<p><strong>store.js的使用</strong> </p>
<p>store.js的基本API有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.set(key, val)  //存储 key 的值为 val；
store.get(key)  //获取 key 的值；
store.remove(key) //移除 key 的记录；
store.clear()  //清空存储；
store.getAll() //返回所有存储；
store.forEach() //遍历所有存储。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>store.set<span class="hljs-comment">(key, val)</span>  <span class="hljs-comment">//存储 key 的值为 val；</span>
store.get<span class="hljs-comment">(key)</span>  <span class="hljs-comment">//获取 key 的值；</span>
store.remove<span class="hljs-comment">(key)</span> <span class="hljs-comment">//移除 key 的记录；</span>
store.clear<span class="hljs-comment">()</span>  <span class="hljs-comment">//清空存储；</span>
store.getAll<span class="hljs-comment">()</span> <span class="hljs-comment">//返回所有存储；</span>
store.forEach<span class="hljs-comment">()</span> <span class="hljs-comment">//遍历所有存储。</span>
</code></pre>
<p>使用store.js提供的方法，需要先引入<code>store.min.js</code>插件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;store.min.js&quot;></script> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"store.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> 
</code></pre>
<p>首先判断浏览器是否支持本地存储</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    init();
    function init(){
        if(!store.enabled){
            alert(&quot;你的浏览器不支持本地存储，请使用更高版本的浏览器&quot;);
            return;
        }else{
            ......
            }
 </script>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    init();
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">if</span>(!store.enabled){
            alert(<span class="hljs-string">"你的浏览器不支持本地存储，请使用更高版本的浏览器"</span>);
            <span class="hljs-keyword">return</span>;
        }<span class="hljs-keyword">else</span>{
            ......
            }
 </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  </code></pre>
<p>set<br>单个存储字符<br>格式：<code>store.set(key, data[, overwrite]);</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.set('name','mavis'); //存储name的值为 mavis
store.set('name','angel');  //将name的值存储为angel" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>store.<span class="hljs-keyword">set</span>(<span class="hljs-string">'name'</span>,<span class="hljs-string">'mavis'</span>); <span class="hljs-comment">//存储name的值为 mavis</span>
store.<span class="hljs-keyword">set</span>(<span class="hljs-string">'name'</span>,<span class="hljs-string">'angel'</span>);  <span class="hljs-comment">//将name的值存储为angel</span></code></pre>
<p>在控制台显示<br><span class="img-wrap"><img data-src="/img/bVFNp6?w=536&amp;h=162" src="https://static.alili.tech/img/bVFNp6?w=536&amp;h=162" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>get<br>获取存入的key值<br>格式：<code>store.get(key[, alt])</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.set('name','mavis');
store.set('name','angel');
store.get('name');  //angel" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>store.<span class="hljs-keyword">set</span>(<span class="hljs-string">'name'</span>,<span class="hljs-string">'mavis'</span>);
store.<span class="hljs-keyword">set</span>(<span class="hljs-string">'name'</span>,<span class="hljs-string">'angel'</span>);
store.<span class="hljs-keyword">get</span>(<span class="hljs-string">'name'</span>);  <span class="hljs-comment">//angel</span></code></pre>
<p>remove<br>移除key的记录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.remove('name');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">store.<span class="hljs-built_in">remove</span>(<span class="hljs-string">'name'</span>);</code></pre>
<p>在控制台可以看到name的值已经被移除<br><span class="img-wrap"><img data-src="/img/bVFNqV?w=544&amp;h=186" src="https://static.alili.tech/img/bVFNqV?w=544&amp;h=186" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>clear<br>清除所有本地存储：<code>store.clear();</code></p>
<p>getAll<br>从所有存储中获取值<br>格式：<code>store.getAll()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.set('name','mavis');
store.getAll().user.name == 'mavis';   //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>store.<span class="hljs-keyword">set</span>(<span class="hljs-string">'name'</span>,<span class="hljs-string">'mavis'</span>);
store.getAll().user.<span class="hljs-keyword">name</span> == <span class="hljs-string">'mavis'</span>;   <span class="hljs-comment">//true</span></code></pre>
<p>forEach<br>遍历所有的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.set('user',{name:'mavis',likes:'javascript'}); // 存储对象 - 自动调用 JSON.stringify
var user = store.get('user'); // 获取存储的对象 - 自动执行 JSON.parse
store.forEach(function(key, val) {
                  console.log(key, '==', val)
            })  // 遍历所有存储" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>store.set(<span class="hljs-string">'user'</span>,{<span class="hljs-attr">name</span>:<span class="hljs-string">'mavis'</span>,<span class="hljs-attr">likes</span>:<span class="hljs-string">'javascript'</span>}); <span class="hljs-comment">// 存储对象 - 自动调用 JSON.stringify</span>
<span class="hljs-keyword">var</span> user = store.get(<span class="hljs-string">'user'</span>); <span class="hljs-comment">// 获取存储的对象 - 自动执行 JSON.parse</span>
store.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, val</span>) </span>{
                  <span class="hljs-built_in">console</span>.log(key, <span class="hljs-string">'=='</span>, val)
            })  <span class="hljs-comment">// 遍历所有存储</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVFNr4?w=595&amp;h=196" src="https://static.alili.tech/img/bVFNr4?w=595&amp;h=196" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用store,js简化了使用localStorage原生方法的操作

LocalStorage 并没有提供过期时间接口，只能通过存储时间做比对实现。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>使用store,js简化了使用<span class="hljs-built_in">local</span>Storage原生方法的操作

LocalStorage 并没有提供过期时间接口，只能通过存储时间做比对实现。
</code></pre>
<p>最后介绍一下在浏览器中查看LocalStorage的方法：F12打开开发人员工具→Application→Storage→LocalStorage<br><span class="img-wrap"><img data-src="/img/bVFNuh?w=1132&amp;h=215" src="https://static.alili.tech/img/bVFNuh?w=1132&amp;h=215" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
本地存储localStorage以及它的封装接口store.js的使用

## 原文链接
[https://segmentfault.com/a/1190000007539338](https://segmentfault.com/a/1190000007539338)

