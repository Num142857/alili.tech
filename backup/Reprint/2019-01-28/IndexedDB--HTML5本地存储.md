---
title: 'IndexedDB--HTML5本地存储' 
date: 2019-01-28 2:30:10
hidden: true
slug: 5328xogjarn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>什么是IndexedDB</strong></h2>
<p>indexedDB是一种轻量级NOSQL数据库，是由浏览器自带。相比Web Sql更加高效，包括索引、事务处理和查询功能。在HTML5本地存储中，IndexedDB存储的数据是最多的，不像webStorage的4M，IndexedDB存储空间是无上限且永久的。</p>
<h2 id="articleHeader1"><strong>为什么要用IndexedDB</strong></h2>
<p>因为咱们的大佬W3C不喜欢Web Sql(Sqlite)啊233，大佬都已经放弃了Web Sql，力推IndexedDB<br>Web Sql API的主要实现者是Chrome、Safari、Opera、Android、IOS、BB。IE和FF都不支持Web Sql API。<br>IndexedDB由于受到W3C的推崇。浏览器厂商的实现情况要好一些。<br><strong><em>注：反正IndexedDB跟Web Sql都是半斤八两</em></strong></p>
<h2 id="articleHeader2"><strong>IndexedDB的特点</strong></h2>
<ol>
<li><p>支持事务、游标、索引等数据库操作</p></li>
<li><p>存储空间大</p></li>
<li><p>永久存储，删除缓存不干扰IndexedDB</p></li>
<li><p>异步性</p></li>
</ol>
<p><strong>各大浏览器对IndexedDB的支持情况：</strong></p>
<ul>
<li><p>IE10+(亲测IE10跪=.=)</p></li>
<li><p>Firefox 10+、Chrome 23+、Opera 15+</p></li>
<li><p>iPhone ios8-ios10 safari支持(X5内核不支持)</p></li>
<li><p>Android X5内核支持</p></li>
</ul>
<p><strong><em>注：移动端各种坑，在没什么把握之前千万别像我一样作死去弄移动端</em></strong></p>
<h2 id="articleHeader3"><strong>IndexedDB常用功能代码演示</strong></h2>
<p>由于我是做了一个小Demo，所以暂且用这个Demo的代码，伪代码大家看看就好，后面会附上完整源码地址233</p>
<ul><li><p><strong>创建数据库</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createdatabase() {
    var resource = window.indexedDB.open(&quot;managerDB&quot;,1);//创建一个名为managerDB的数据库，数量为1
    resource.onsuccess = function(event) {
        database = resource.result;//让数据库能在任何地方访问
    };

    resource.onerror = function(event) {//数据库创建失败事件
        alert(&quot;can't create database,error:&quot; + resource.error);
    };

    resource.onupgradeneeded = function(event) {//第一次创建数据库新建一张名为managerList的数据表
        var db = resource.result;
        var objectStore = db.createObjectStore(&quot;managerList&quot;,{keyPath:&quot;time&quot;});//key为time
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createdatabase</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> resource = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">"managerDB"</span>,<span class="hljs-number">1</span>);<span class="hljs-comment">//创建一个名为managerDB的数据库，数量为1</span>
    resource.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        database = resource.result;<span class="hljs-comment">//让数据库能在任何地方访问</span>
    };

    resource.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{<span class="hljs-comment">//数据库创建失败事件</span>
        alert(<span class="hljs-string">"can't create database,error:"</span> + resource.error);
    };

    resource.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{<span class="hljs-comment">//第一次创建数据库新建一张名为managerList的数据表</span>
        <span class="hljs-keyword">var</span> db = resource.result;
        <span class="hljs-keyword">var</span> objectStore = db.createObjectStore(<span class="hljs-string">"managerList"</span>,{<span class="hljs-attr">keyPath</span>:<span class="hljs-string">"time"</span>});<span class="hljs-comment">//key为time</span>
    };
}</code></pre>
<p>onupgradeneeded事件会在数据库版本不同时触发（event.oldVersion 可以获取当前数据库版本），可以用来升级数据库(添加删除数据表),此事件也会在所请求的数据库不存在的时候触发，会自动创建一个空数据库。</p>
<ul><li><p><strong>存储数据</strong></p></li></ul>
<p>如果调用put()添加的数据与已存在的数据有相同的key，浏览器会将新数据替换已存在的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function save() {
    var contact = new Object();//新建一个对象
    var Name = document.getElementById(&quot;name&quot;).value;
    var Time = getSelect();
    var Description = document.getElementById(&quot;description&quot;).value;
    if(JTrim(Name) != &quot;&quot; &amp;&amp; JTrim(Description) != &quot;&quot;) {//JTrim()函数是用于判断输入是否为空值
        contact.name = Name;
        contact.time = Time;
        contact.description = Description;
        var transaction = database.transaction([&quot;managerList&quot;],&quot;readwrite&quot;);//读写
        var resource = transaction.objectStore(&quot;managerList&quot;).put(contact);//利用put()将数据存入

    } else {
        alert(&quot;you should write something...&quot;);
        return;
    }

    resource.onsuccess = function(event) {//成功
        alert(&quot;create note success!&quot;);
    };

    resource.onerror = function(event) {//失败
       alert(&quot;can't create database,error:&quot; + resource.error);//告知错误
    };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">save</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> contact = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();<span class="hljs-comment">//新建一个对象</span>
    <span class="hljs-keyword">var</span> Name = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"name"</span>).value;
    <span class="hljs-keyword">var</span> Time = getSelect();
    <span class="hljs-keyword">var</span> Description = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"description"</span>).value;
    <span class="hljs-keyword">if</span>(JTrim(Name) != <span class="hljs-string">""</span> &amp;&amp; JTrim(Description) != <span class="hljs-string">""</span>) {<span class="hljs-comment">//JTrim()函数是用于判断输入是否为空值</span>
        contact.name = Name;
        contact.time = Time;
        contact.description = Description;
        <span class="hljs-keyword">var</span> transaction = database.transaction([<span class="hljs-string">"managerList"</span>],<span class="hljs-string">"readwrite"</span>);<span class="hljs-comment">//读写</span>
        <span class="hljs-keyword">var</span> resource = transaction.objectStore(<span class="hljs-string">"managerList"</span>).put(contact);<span class="hljs-comment">//利用put()将数据存入</span>

    } <span class="hljs-keyword">else</span> {
        alert(<span class="hljs-string">"you should write something..."</span>);
        <span class="hljs-keyword">return</span>;
    }

    resource.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{<span class="hljs-comment">//成功</span>
        alert(<span class="hljs-string">"create note success!"</span>);
    };

    resource.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{<span class="hljs-comment">//失败</span>
       alert(<span class="hljs-string">"can't create database,error:"</span> + resource.error);<span class="hljs-comment">//告知错误</span>
    };
}
</code></pre>
<p><strong>JTrim()函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function JTrim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, &quot;&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">JTrim</span>(s) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">s.replace(/(^\s*)|(\s*$)/g,</span> <span class="hljs-string">""</span>);
}</code></pre>
<ul><li><p><strong>遍历全部数据</strong></p></li></ul>
<p>利用IndexedDB的API来遍历数据的时候，需要用到游标，熟悉数据库的各位应该清楚游标的用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadAll() {
    var transaction = database.transaction([&quot;managerList&quot;],&quot;readonly&quot;);
    var resource = transaction.objectStore(&quot;managerList&quot;).openCursor();
    var str = &quot;&quot;;
    var result = document.getElementById(&quot;container-2&quot;);
    resource.onsuccess = function(event) {
        //创建游标
        var cursor = event.target.result;
        //利用游标对数据进行遍历
        if(cursor) {
            var list = cursor.value;
            var str += list.time;
            cursor.continue();//继续循环
        } else {//游标循环到底之后，打印出str
            alert(str);//在这里我们就能得出list.time的值了  
        }
    };

    resource.onerror = function(event) {//出现错误给出提示
        alert(&quot;can't create database,error:&quot; + resource.error);
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadAll</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> transaction = database.transaction([<span class="hljs-string">"managerList"</span>],<span class="hljs-string">"readonly"</span>);
    <span class="hljs-keyword">var</span> resource = transaction.objectStore(<span class="hljs-string">"managerList"</span>).openCursor();
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">""</span>;
    <span class="hljs-keyword">var</span> result = document.getElementById(<span class="hljs-string">"container-2"</span>);
    resource.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
        <span class="hljs-comment">//创建游标</span>
        <span class="hljs-keyword">var</span> cursor = event.target.result;
        <span class="hljs-comment">//利用游标对数据进行遍历</span>
        <span class="hljs-keyword">if</span>(cursor) {
            <span class="hljs-keyword">var</span> <span class="hljs-keyword">list</span> = cursor.value;
            <span class="hljs-keyword">var</span> str += <span class="hljs-keyword">list</span>.time;
            cursor.<span class="hljs-keyword">continue</span>();<span class="hljs-comment">//继续循环</span>
        } <span class="hljs-keyword">else</span> {<span class="hljs-comment">//游标循环到底之后，打印出str</span>
            alert(str);<span class="hljs-comment">//在这里我们就能得出list.time的值了  </span>
        }
    };

    resource.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{<span class="hljs-comment">//出现错误给出提示</span>
        alert(<span class="hljs-string">"can't create database,error:"</span> + resource.error);
    };
}</code></pre>
<ul><li><p><strong>查询单条数据</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function search(element) {
    var description = element.getAttribute(&quot;value&quot;);
    var transaction = database.transaction([&quot;managerList&quot;], &quot;readonly&quot;);//只读
    var objectStore = transaction.objectStore(&quot;managerList&quot;);
    var request = objectStore.get(description);//利用get()方法找到这条数据
    request.onerror = function(event) {
        alert(&quot;error:：&quot; + request.error);
    };
    request.onsuccess = function(event) {
    var b = request.result;
    alert(b.description);//最终得到这条数据的description部分
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">search</span><span class="hljs-params">(element)</span> </span>{
    <span class="hljs-keyword">var</span> description = element.getAttribute(<span class="hljs-string">"value"</span>);
    <span class="hljs-keyword">var</span> transaction = database.transaction([<span class="hljs-string">"managerList"</span>], <span class="hljs-string">"readonly"</span>);<span class="hljs-comment">//只读</span>
    <span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">"managerList"</span>);
    <span class="hljs-keyword">var</span> request = objectStore.get(description);<span class="hljs-comment">//利用get()方法找到这条数据</span>
    request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
        alert(<span class="hljs-string">"error:："</span> + request.error);
    };
    request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
    <span class="hljs-keyword">var</span> b = request.result;
    alert(b.description);<span class="hljs-comment">//最终得到这条数据的description部分</span>
    };
}</code></pre>
<ul><li><p><strong>删除数据</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function del() {
    var resource = document.getElementById(&quot;container-2&quot;);
    var b = resource.getElementsByTagName(&quot;input&quot;);
    var div = document.getElementById(&quot;container-2&quot;);
    var result = 0;
    for(var i = 0;i < b.length;i ++) {
        if(b[i].checked == true) {
            var time = b[i].value;
            var transaction = database.transaction([&quot;managerList&quot;], &quot;readwrite&quot;);//读写
            var objectStore = transaction.objectStore(&quot;managerList&quot;);
            var request = objectStore.delete(time);//删除数据的核心就是利用delete方法
            request.onerror = function (event) {
                alert(&quot;error：&quot; + request.error);
            };
 
            request.onsuccess = function (event) {
                alert(&quot;delete note success!&quot;);
            };
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">del</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> resource = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"container-2"</span>);
    <span class="hljs-keyword">var</span> b = resource.getElementsByTagName(<span class="hljs-string">"input"</span>);
    <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"container-2"</span>);
    <span class="hljs-keyword">var</span> result = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; b.length;i ++) {
        <span class="hljs-keyword">if</span>(b[i].checked == <span class="hljs-literal">true</span>) {
            <span class="hljs-keyword">var</span> time = b[i].value;
            <span class="hljs-keyword">var</span> transaction = database.transaction([<span class="hljs-string">"managerList"</span>], <span class="hljs-string">"readwrite"</span>);<span class="hljs-comment">//读写</span>
            <span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">"managerList"</span>);
            <span class="hljs-keyword">var</span> request = objectStore.delete(time);<span class="hljs-comment">//删除数据的核心就是利用delete方法</span>
            request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
                alert(<span class="hljs-string">"error："</span> + request.error);
            };
 
            request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
                alert(<span class="hljs-string">"delete note success!"</span>);
            };
        }
    }
}</code></pre>
<ul><li><p><strong>删除整个数据库</strong></p></li></ul>
<p>IndexDB只能在控制台里面删除数据，并不能删除数据表及数据库，所以删除只能代码执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.indexedDB.deleteDatabase(&quot;数据库名称&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">window.indexedDB.deleteDatabase(<span class="hljs-string">"数据库名称"</span>)<span class="hljs-comment">;</span></code></pre>
<h2 id="articleHeader4"><strong>DEMO演示</strong></h2>
<p><strong><a href="http://huangxizhou.oschina.io/indexdb" rel="nofollow noreferrer" target="_blank">Demo地址</a></strong>(出现bug请移步pc)<br><span class="img-wrap"><img data-src="/img/bVHFXn?w=361&amp;h=666" src="https://static.alili.tech/img/bVHFXn?w=361&amp;h=666" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVHF4a?w=375&amp;h=667" src="https://static.alili.tech/img/bVHF4a?w=375&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>pc端偶尔会因为代码仓库的原因出现莫名bug，方便的话可以clone源码</em></strong><br><strong><em>地址在这里：git@git.oschina.net:huangxizhou/indexDB.git</em></strong></p>
<p><strong><code>最后祝大家新年快乐！！！</code></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
IndexedDB--HTML5本地存储

## 原文链接
[https://segmentfault.com/a/1190000007987481](https://segmentfault.com/a/1190000007987481)

