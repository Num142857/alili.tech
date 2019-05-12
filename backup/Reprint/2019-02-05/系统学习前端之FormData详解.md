---
title: '系统学习前端之FormData详解' 
date: 2019-02-05 2:30:09
hidden: true
slug: 4yp2ktcn3u8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">FormData</h1>
<h2 id="articleHeader1">1. 概述</h2>
<p>FormData类型其实是在XMLHttpRequest 2级定义的，它是为序列化表以及创建与表单格式相同的数据（当然是用于XHR传输）提供便利。</p>
<h2 id="articleHeader2">2. 构造函数</h2>
<p>创建一个formData对象实例有几种方式</p>
<p>1、创建一个<code>空对象</code>实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formData = new FormData();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();</code></pre>
<p>此时可以调用append()方法来添加数据</p>
<p>2、使用已有的表单来初始化一个对象实例</p>
<p>假如现在页面已经有一个表单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form id=&quot;myForm&quot; action=&quot;&quot; method=&quot;post&quot;>
    <input type=&quot;text&quot; name=&quot;name&quot;>名字
    <input type=&quot;password&quot; name=&quot;psw&quot;>密码
    <input type=&quot;submit&quot; value=&quot;提交&quot;>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myForm"</span> <span class="hljs-attr">action</span>=<span class="hljs-string">""</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span>&gt;</span>名字
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"psw"</span>&gt;</span>密码
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"提交"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<p>我们可以使用这个表单元素作为初始化参数，来实例化一个formData对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取页面已有的一个form表单
var form = document.getElementById(&quot;myForm&quot;);
// 用表单来初始化
var formData = new FormData(form);
// 我们可以根据name来访问表单中的字段
var name = formData.get(&quot;name&quot;); // 获取名字
var psw = formData.get(&quot;psw&quot;); // 获取密码
// 当然也可以在此基础上，添加其他数据
formData.append(&quot;token&quot;,&quot;kshdfiwi3rh&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取页面已有的一个form表单</span>
<span class="hljs-keyword">var</span> form = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myForm"</span>);
<span class="hljs-comment">// 用表单来初始化</span>
<span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData(form);
<span class="hljs-comment">// 我们可以根据name来访问表单中的字段</span>
<span class="hljs-keyword">var</span> name = formData.get(<span class="hljs-string">"name"</span>); <span class="hljs-comment">// 获取名字</span>
<span class="hljs-keyword">var</span> psw = formData.get(<span class="hljs-string">"psw"</span>); <span class="hljs-comment">// 获取密码</span>
<span class="hljs-comment">// 当然也可以在此基础上，添加其他数据</span>
formData.append(<span class="hljs-string">"token"</span>,<span class="hljs-string">"kshdfiwi3rh"</span>);</code></pre>
<h2 id="articleHeader3">3. 操作方法</h2>
<p>首先，我们要明确formData里面存储的数据形式，一对key/value组成一条数据，key是唯一的，一个key可能对应多个value。如果是使用表单初始化，每一个表单字段对应一条数据，它们的HTML name属性即为key值，它们value属性对应value值。</p>
<table>
<thead><tr>
<th align="left">key</th>
<th align="left">value</th>
</tr></thead>
<tbody>
<tr>
<td align="left">k1</td>
<td align="left">[v1,v2,v3]</td>
</tr>
<tr>
<td align="left">k2</td>
<td align="left">v4</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader4">3.1 获取值</h3>
<p>我们可以通过get(key)/getAll(key)来获取对应的value，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.get(&quot;name&quot;); // 获取key为name的第一个值
formData.get(&quot;name&quot;); // 返回一个数组，获取key为name的所有值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">formData.get(<span class="hljs-string">"name"</span>); <span class="hljs-comment">// 获取key为name的第一个值</span>
formData.get(<span class="hljs-string">"name"</span>); <span class="hljs-comment">// 返回一个数组，获取key为name的所有值</span></code></pre>
<h3 id="articleHeader5">3.2 添加数据</h3>
<p>我们可以通过append(key, value)来添加数据，如果指定的key不存在则会新增一条数据，如果key存在，则添加到数据的末尾</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.append(&quot;k1&quot;, &quot;v1&quot;);
formData.append(&quot;k1&quot;, &quot;v2&quot;);
formData.append(&quot;k1&quot;, &quot;v1&quot;);

formData.get(&quot;k1&quot;); // &quot;v1&quot;
formData.getAll(&quot;k1&quot;); // [&quot;v1&quot;,&quot;v2&quot;,&quot;v1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v1"</span>);
formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v2"</span>);
formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v1"</span>);

formData.get(<span class="hljs-string">"k1"</span>); <span class="hljs-comment">// "v1"</span>
formData.getAll(<span class="hljs-string">"k1"</span>); <span class="hljs-comment">// ["v1","v2","v1"]</span></code></pre>
<h3 id="articleHeader6">3.3 设置修改数据</h3>
<p>我们可以通过set(key, value)来设置修改数据，如果指定的key不存在则会新增一条，如果存在，则会修改对应的value值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.append(&quot;k1&quot;, &quot;v1&quot;);
formData.set(&quot;k1&quot;, &quot;1&quot;);
formData.getAll(&quot;k1&quot;); // [&quot;1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v1"</span>);
formData.set(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"1"</span>);
formData.getAll(<span class="hljs-string">"k1"</span>); <span class="hljs-comment">// ["1"]</span></code></pre>
<h3 id="articleHeader7">3.4 判断是否该数据</h3>
<p>我们可以通过has(key)来判断是否对应的key值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.append(&quot;k1&quot;, &quot;v1&quot;);
formData.append(&quot;k2&quot;,null);

formData.has(&quot;k1&quot;); // true
formData.has(&quot;k2&quot;); // true
formData.has(&quot;k3&quot;); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v1"</span>);
formData.append(<span class="hljs-string">"k2"</span>,<span class="hljs-literal">null</span>);

formData.has(<span class="hljs-string">"k1"</span>); <span class="hljs-comment">// true</span>
formData.has(<span class="hljs-string">"k2"</span>); <span class="hljs-comment">// true</span>
formData.has(<span class="hljs-string">"k3"</span>); <span class="hljs-comment">// false</span></code></pre>
<h3 id="articleHeader8">3.5 删除数据</h3>
<p>通过delete(key)，来删除数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.append(&quot;k1&quot;, &quot;v1&quot;);
formData.append(&quot;k1&quot;, &quot;v2&quot;);
formData.append(&quot;k1&quot;, &quot;v1&quot;);
formData.delete(&quot;k1&quot;);

formData.getAll(&quot;k1&quot;); // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v1"</span>);
formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v2"</span>);
formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v1"</span>);
formData.delete(<span class="hljs-string">"k1"</span>);

formData.getAll(<span class="hljs-string">"k1"</span>); <span class="hljs-comment">// []</span></code></pre>
<h3 id="articleHeader9">3.6 遍历</h3>
<p>我们可以通过entries()来获取一个迭代器，然后遍历所有的数据，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.append(&quot;k1&quot;, &quot;v1&quot;);
formData.append(&quot;k1&quot;, &quot;v2&quot;);
formData.append(&quot;k2&quot;, &quot;v1&quot;);

var i = formData.entries();

i.next(); // {done:false, value:[&quot;k1&quot;, &quot;v1&quot;]}
i.next(); // {done:fase, value:[&quot;k1&quot;, &quot;v2&quot;]}
i.next(); // {done:fase, value:[&quot;k2&quot;, &quot;v1&quot;]}
i.next(); // {done:true, value:undefined}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v1"</span>);
formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v2"</span>);
formData.append(<span class="hljs-string">"k2"</span>, <span class="hljs-string">"v1"</span>);

<span class="hljs-keyword">var</span> i = formData.entries();

i.next(); <span class="hljs-comment">// {done:false, value:["k1", "v1"]}</span>
i.next(); <span class="hljs-comment">// {done:fase, value:["k1", "v2"]}</span>
i.next(); <span class="hljs-comment">// {done:fase, value:["k2", "v1"]}</span>
i.next(); <span class="hljs-comment">// {done:true, value:undefined}</span></code></pre>
<p>可以看到返回迭代器的规则</p>
<ol>
<li><p>每调用一次next()返回一条数据，数据的顺序由添加的顺序决定</p></li>
<li><p>返回的是一个对象，当其done属性为true时，说明已经遍历完所有的数据，这个也可以作为判断的依据</p></li>
<li><p>返回的对象的value属性以数组形式存储了一对key/value，数组下标0为key，下标1为value，如果一个key值对应多个value，会变成多对key/value返回</p></li>
</ol>
<p>我们也可以通过values()方法只获取value值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.append(&quot;k1&quot;, &quot;v1&quot;);
formData.append(&quot;k1&quot;, &quot;v2&quot;);
formData.append(&quot;k2&quot;, &quot;v1&quot;);

var i = formData.entries();

i.next(); // {done:false, value:&quot;v1&quot;}
i.next(); // {done:fase, value:&quot;v2&quot;}
i.next(); // {done:fase, value:&quot;v1&quot;}
i.next(); // {done:true, value:undefined}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v1"</span>);
formData.append(<span class="hljs-string">"k1"</span>, <span class="hljs-string">"v2"</span>);
formData.append(<span class="hljs-string">"k2"</span>, <span class="hljs-string">"v1"</span>);

<span class="hljs-keyword">var</span> i = formData.entries();

i.next(); <span class="hljs-comment">// {done:false, value:"v1"}</span>
i.next(); <span class="hljs-comment">// {done:fase, value:"v2"}</span>
i.next(); <span class="hljs-comment">// {done:fase, value:"v1"}</span>
i.next(); <span class="hljs-comment">// {done:true, value:undefined}</span></code></pre>
<h2 id="articleHeader10">4. 发送数据</h2>
<p>我们可以通过xhr来发送数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open(&quot;post&quot;,&quot;login&quot;);
xhr.setRequestHeader(&quot;Content-Type&quot;,&quot;application/x-www-form-urlencoded&quot;);
xhr.send(formData);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">"post"</span>,<span class="hljs-string">"login"</span>);
xhr.setRequestHeader(<span class="hljs-string">"Content-Type"</span>,<span class="hljs-string">"application/x-www-form-urlencoded"</span>);
xhr.send(formData);</code></pre>
<p>这种方式可以来实现文件的异步上传。</p>
<h2 id="articleHeader11">参考</h2>
<ol>
<li><p><a href="http://caniuse.com/#search=formdata" rel="nofollow noreferrer" target="_blank">兼容性查询</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData" rel="nofollow noreferrer" target="_blank">MDN</a></p></li>
<li><p>《JavaScript高级程序设计》</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
系统学习前端之FormData详解

## 原文链接
[https://segmentfault.com/a/1190000006716454](https://segmentfault.com/a/1190000006716454)

