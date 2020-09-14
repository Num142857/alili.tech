---
title: 'IndexedDB 打造靠谱 Web 离线数据库' 
date: 2018-11-29 9:34:56
hidden: true
slug: ze3siubq7o9
categories: [reprint]
---

{{< raw >}}

                    
<p>在知乎和我在平常工作中，常常会看到一个问题：</p>
<blockquote>前端现在还火吗？</blockquote>
<p>这个我只想说：</p>
<blockquote>隔岸观火的人永远无法明白起火的原因，只有置身风暴，才能找到风眼之所在 ——『秦时明月』</blockquote>
<p>你 TM 看都不看前端现在的发展，怎么去评判前端火不火，我该不该尝试一下其他方面的内容呢？本人为啥为这么热衷于新的技术呢？主要原因在于，生怕会被某一项颠覆性的内容淘汰掉，从前沿领域掉队下来。说句人话就是：<code>穷，所以只能学了...</code>。所以本文会从头剖析一下 <code>IndexedDB</code> 在前端里面的应用的发展。</p>
<p>indexedDB 目前在前端慢慢得到普及和应用。它正朝着前端离线数据库技术的步伐前进。以前一开始是  manifest、localStorage、cookie 再到  webSQL，现在  indexedDB 逐渐被各大浏览器认可。我们也可以针对它来进行技术上创新的开发。比如，现在小视频非常流行，那么我们可以在用户观看时，通过 cacheStorage 缓存，然后利用 WebRTC 技术实现 P2P 分发的控制，不过需要注意，一定要合理利用大小，不然后果真的很严重。</p>
<p>indexedDB 的整体架构，是由一系列单独的概念串联而成，全部概念如下列表。一眼看去会发现没有任何逻辑，不过，这里我顺手画了一幅逻辑图，中间会根据 函数 的调用而相互串联起来。</p>
<ul>
<li>IDBRequest</li>
<li>IDBFactory</li>
<li>IDBDatabase</li>
<li>IDBObjectStore</li>
<li>IDBIndex</li>
<li>IDBKeyRange</li>
<li>IDBCursor</li>
<li>IDBTransaction</li>
</ul>
<p>整体逻辑图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014950569?w=792&amp;h=800" src="https://static.alili.tech/img/remote/1460000014950569?w=792&amp;h=800" alt="逻辑联系框图" title="逻辑联系框图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">TL;DR</h2>
<p>下文主要介绍了 indexedDB 的基本概念，以及在实际应用中的实操代码。</p>
<ul>
<li>indexedDB 基础概念。在  indexedDB 里面会根据索引  index 来进行整体数据结构的划分。</li>
<li>indexedDB 数据库的更新是一个非常蛋疼的事情，因为，Web 的灵活性，你既需要做好向上版本的更新，也需要完善向下版本的容错性。</li>
<li>indexedDB 高效索引机制，在内部，indexedDB 已经提供了 <code>index</code>、<code>cursor</code>等高效的索引机制，推荐不要直接将所有数据都取回来，再进行筛选，而是直接利用 <code>cursor</code> 进行。</li>
<li>最后推荐几个常用库</li>
</ul>
<h2 id="articleHeader1">离线存储</h2>
<p>IndexedDB 可以存储非常多的数据，比如 Object,files,blobs 等，里面的存储结构是根据 Database 来进行存储的。每个 DB 里面可以有不同的 object stores。具体结构如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014950570?w=1392&amp;h=1044" src="https://static.alili.tech/img/remote/1460000014950570?w=1392&amp;h=1044" alt="indexedDB 结构图" title="indexedDB 结构图" style="cursor: pointer;"></span></p>
<p>并且，我们可以给 <code>key</code> 设定相关特定的值，然后在索引的时候，可以直接通过 key 得到具体的内容。使用  IndexDB 需要注意，其遵循的是同域原则。</p>
<h2 id="articleHeader2">indexDB 基本概念</h2>
<p>在 indexDB 中，有几个基本的操作对象：</p>
<ul><li>Database: 通过 <code>open</code> 方法直接打开，可以得到一个实例的 DB。每个页面可以创建多个 DB，不过一般都是一个。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="idb.open(name, version, upgradeCallback)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">idb.open(<span class="hljs-built_in">name</span>, <span class="hljs-built_in">version</span>, upgradeCallback)</code></pre>
<ul><li>Object store: 这个就是 DB 里面具体存储的对象。这个可以对应于 SQL 里面的 table 内容。其存储的结构为：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014950571?w=1486&amp;h=1068" src="https://static.alili.tech/img/remote/1460000014950571?w=1486&amp;h=1068" alt="image.png-392.5kB" title="image.png-392.5kB" style="cursor: pointer;"></span></p>
<ul><li>index: 有点类似于外链，它本身是一种 Object store，主要是用来在本体的 store 中，索引另外 object store 里面的数据。需要区别的是，key 和 index 是不一样的。可以参考： <a href="https://mdn.github.io/indexeddb-examples/idbindex/" rel="nofollow noreferrer" target="_blank">index DEMO</a>，<a href="https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex" rel="nofollow noreferrer" target="_blank">mdn index</a>。如下图表示：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014950572?w=720&amp;h=408" src="https://static.alili.tech/img/remote/1460000014950572?w=720&amp;h=408" alt="image.png-59.8kB" title="image.png-59.8kB" style="cursor: pointer;"></span></p>
<p>如下 code 为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建 index
var myIndex = objectStore.index('lName'); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">// 创建 index</span>
<span class="hljs-keyword">var</span> myIndex = objectStore.<span class="hljs-keyword">index</span>(<span class="hljs-string">'lName'</span>); </code></pre>
<ul><li>transaction: 事务其实就是一系列 CRUD 的集合内容。如果其中一个环节失败了，那么整个事务的处理都会被取消。例如：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var trans1 = db.transaction(&quot;foo&quot;, &quot;readwrite&quot;);
var trans2 = db.transaction(&quot;foo&quot;, &quot;readwrite&quot;);
var objectStore2 = trans2.objectStore(&quot;foo&quot;)
var objectStore1 = trans1.objectStore(&quot;foo&quot;)
objectStore2.put(&quot;2&quot;, &quot;key&quot;);
objectStore1.put(&quot;1&quot;, &quot;key&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> trans1 = db.transaction(<span class="hljs-string">"foo"</span>, <span class="hljs-string">"readwrite"</span>);
<span class="hljs-built_in">var</span> trans2 = db.transaction(<span class="hljs-string">"foo"</span>, <span class="hljs-string">"readwrite"</span>);
<span class="hljs-built_in">var</span> objectStore2 = trans2.objectStore(<span class="hljs-string">"foo"</span>)
<span class="hljs-built_in">var</span> objectStore1 = trans1.objectStore(<span class="hljs-string">"foo"</span>)
objectStore2.<span class="hljs-built_in">put</span>(<span class="hljs-string">"2"</span>, <span class="hljs-string">"key"</span>);
objectStore1.<span class="hljs-built_in">put</span>(<span class="hljs-string">"1"</span>, <span class="hljs-string">"key"</span>);</code></pre>
<ul><li>cursor: 主要是用来遍历 DB 里面的数据内容。主要是通过 <code>openCursor</code> 来进行控制。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function displayData() {
  var transaction = db.transaction(['rushAlbumList'], &quot;readonly&quot;);
  var objectStore = transaction.objectStore('rushAlbumList');

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if(cursor) {
      var listItem = document.createElement('li');
      listItem.innerHTML = cursor.value.albumTitle + ', ' + cursor.value.year;
      list.appendChild(listItem);  

      cursor.continue();
    } else {
      console.log('Entries all displayed.');
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">displayData</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> transaction = db.transaction([<span class="hljs-string">'rushAlbumList'</span>], <span class="hljs-string">"readonly"</span>);
  <span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">'rushAlbumList'</span>);

  objectStore.openCursor().onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> cursor = event.target.result;
    <span class="hljs-keyword">if</span>(cursor) {
      <span class="hljs-keyword">var</span> listItem = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>);
      listItem.innerHTML = cursor.value.albumTitle + <span class="hljs-string">', '</span> + cursor.value.year;
      list.appendChild(listItem);  

      cursor.continue();
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Entries all displayed.'</span>);
    }
  };
}</code></pre>
<h2 id="articleHeader3">如何使用 IndexDB</h2>
<p>上面说了几个基本的概念。那接下来我们实践一下 IndexDB。实际上入门 IndexDB 就是做几个基本的内容</p>
<ul>
<li>打开数据库表</li>
<li>设置指定的 primary Key</li>
<li>定义好索引的 index</li>
</ul>
<p>前期搭建一个 IndexedDB 很简单的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  // 错误处理程序在这里。
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  // 设置 id 为 primaryKey 参数
  var objectStore = db.createObjectStore(&quot;customers&quot;, { keyPath: &quot;id&quot;,{autoIncrement:true} });
  
  // 设置指定索引，并确保唯一性
  objectStore.createIndex(&quot;name&quot;, &quot;name&quot;, { unique: false });
  objectStore.createIndex(&quot;email&quot;, &quot;email&quot;, { unique: true });

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> request = indexedDB.open(dbName, <span class="hljs-number">2</span>);

request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-comment">// 错误处理程序在这里。</span>
};
request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-keyword">var</span> db = event.target.result;
  <span class="hljs-comment">// 设置 id 为 primaryKey 参数</span>
  <span class="hljs-keyword">var</span> objectStore = db.createObjectStore(<span class="hljs-string">"customers"</span>, { keyPath: <span class="hljs-string">"id"</span>,{autoIncrement:<span class="hljs-literal">true</span>} });
  
  <span class="hljs-comment">// 设置指定索引，并确保唯一性</span>
  objectStore.createIndex(<span class="hljs-string">"name"</span>, <span class="hljs-string">"name"</span>, { unique: <span class="hljs-literal">false</span> });
  objectStore.createIndex(<span class="hljs-string">"email"</span>, <span class="hljs-string">"email"</span>, { unique: <span class="hljs-literal">true</span> });

};</code></pre>
<p>上面主要做了 3 件事：</p>
<ul>
<li>打开数据库表</li>
<li>新建 Store，并设置 primary Key</li>
<li>设置 index</li>
</ul>
<p>打开数据库表主要就是版本号和名字，没有太多讲的，我们直接从创建 store 开始吧。</p>
<h3 id="articleHeader4">创建 Object Store</h3>
<p>使用的方法就是 IDBDatabase 上的 <code>createObjectStore</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objectStore = db.createObjectStore(&quot;customers&quot;, { keyPath: &quot;id&quot;,{autoIncrement:true} });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">var objectStore = db.createObjectStore(<span class="hljs-string">"customers"</span>, { <span class="hljs-string">keyPath:</span> <span class="hljs-string">"id"</span>,{<span class="hljs-string">autoIncrement:</span><span class="hljs-literal">true</span>} });</code></pre>
<p>基本函数构造为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="IDBObjectStore createObjectStore(DOMString name,
                                               optional IDBObjectStoreParameters options)
                                               
dictionary IDBObjectStoreParameters {
  (DOMString or sequence<DOMString>)? keyPath = null;
  boolean autoIncrement = false;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>IDBObjectStore createObjectStore(DOMString name,
                                               optional IDBObjectStoreParameters options)
                                               
<span class="hljs-keyword">dictionary </span>IDBObjectStoreParameters {
  (DOMString <span class="hljs-keyword">or </span>sequence&lt;DOMString&gt;)? keyPath = null<span class="hljs-comment">;</span>
  <span class="hljs-keyword">boolean </span>autoIncrement = false<span class="hljs-comment">;</span>
}<span class="hljs-comment">;</span></code></pre>
<ul>
<li>keyPath: 用来设置主键的 key，具体区别可以参考下面的 keyPath 和 generator 的区别。</li>
<li>autoIncrement: 是否使用自增 key 的特性。</li>
</ul>
<p>创建的 key 主要是为了保证，在数据插入时唯一性的标识。</p>
<p>不过，往往一个主键(key)，是没办法很好的完成索引，在具体实践时，就还需要辅键 (aid-key) 来完成辅助索引工作，这个在 IndexDB 就映射为 <code>index</code>。</p>
<h3 id="articleHeader5">设置索引 index</h3>
<p>在完成 PK(Primary key) 创建完毕后，为了更好的搜索性能我们还需要额外创建 <code>index</code>。这里可以直接使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="objectStore.createIndex('indexName', 'property', options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">objectStore.createIndex('indexName', '<span class="hljs-keyword">property</span><span class="hljs-title"></span>', options);</code></pre>
<ul>
<li>indexName: 设置当前 index 的名字</li>
<li>property: 从存储数据中，指明 index 所指的属性。</li>
</ul>
<p>其中，options 有三个选项：</p>
<ul>
<li>unique: 当前 key 是否能重复 (最常用)</li>
<li>multiEntry: 设置当前的 property 为数组时，会给数组里面每个元素都设置一个 index 值。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 创建一个名字叫 titleIndex 的 index，并且存储的 index 不能重复
DB.createIndex('titleIndex', 'title', {unique: false});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code># 创建一个名字叫 titleIndex 的 <span class="hljs-keyword">index</span>，并且存储的 <span class="hljs-keyword">index</span> 不能重复
DB.createIndex(<span class="hljs-string">'titleIndex'</span>, <span class="hljs-string">'title'</span>, {<span class="hljs-keyword">unique</span>: <span class="hljs-literal">false</span>});</code></pre>
<p>具体可以参考：<a href="https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex#Parameters" rel="nofollow noreferrer" target="_blank">MDN createIndex Prop</a> 和 <a href="https://developers.google.com/web/ilt/pwa/working-with-indexeddb" rel="nofollow noreferrer" target="_blank">googleDeveloper Index</a>。</p>
<h3 id="articleHeader6">增删数据</h3>
<p>在 IndexedDB 里面进行数据的增删，都需要在 <code> transaction</code> 中完成。而这个增删数据，大家可以理解为一次 <code>request</code>，相当于在一个 <code>transaction</code> 里面管理所有当前逻辑操作的 <code>request</code>。所以，在正式开始进行数据操作之前，还需要给大家简单介绍一些如果创建一个事务。</p>
<h4>事务的创建</h4>
<p><code>transaction</code> API，如下 [代码1]。在创建时，你需要手动指定当前 transaction 是那种类型的操作，基本的内容有：</p>
<ul>
<li>"readonly"：只读</li>
<li>"readwrite"：读写</li>
<li>"versionchange"：这个不能手动指定，会在 <code>upgradeneeded</code> 回调事件里面自动创建。它可以用来修改现有 object store 的结构数据，比如 index 等。</li>
</ul>
<p>你可以通过在数据库打开之后，通过 <code>IDBDataBase</code> 上的 <code>transaction</code> 方法创建，如 [代码2]。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码1]
  [NewObject] IDBTransaction transaction((DOMString or sequence<DOMString>) storeNames,
                                         optional IDBTransactionMode mode = &quot;readonly&quot;);
                                         
[代码2]
var transaction = db.transaction([&quot;customers&quot;], &quot;readwrite&quot;);
var objectStore = transaction.objectStore(&quot;customers&quot;);
# 遍历存储数据
for (var i in customerData) {
  var request = objectStore.add(customerData[i]);
  request.onsuccess = function(event) {
    // success, done?
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>[代码<span class="hljs-number">1</span>]
  [NewObject] <span class="hljs-function">IDBTransaction <span class="hljs-title">transaction</span>(<span class="hljs-params">(DOMString or sequence&lt;DOMString&gt;</span>) storeNames,
                                         optional IDBTransactionMode mode </span>= <span class="hljs-string">"readonly"</span>);
                                         
[代码<span class="hljs-number">2</span>]
<span class="hljs-keyword">var</span> transaction = db.transaction([<span class="hljs-string">"customers"</span>], <span class="hljs-string">"readwrite"</span>);
<span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">"customers"</span>);
<span class="hljs-meta"># 遍历存储数据</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> customerData) {
  <span class="hljs-keyword">var</span> request = objectStore.<span class="hljs-keyword">add</span>(customerData[i]);
  request.onsuccess = function(<span class="hljs-keyword">event</span>) {
    <span class="hljs-comment">// success, done?</span>
  };
}</code></pre>
<p>事务在创建的时候不仅仅可以制定执行的模式，还可以指定本次事务能够影响的 ObjectStore 范围，具体细节就是在第一个 <code>transaction</code> 参数里面传入的是一个数据，然后通过 <code>objectStore()</code> 方法打开多个 OS 进行操作，如下 [代码3]。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码3]
var tx = db.transaction([&quot;books&quot;,&quot;person&quot;], &quot;readonly&quot;);
var books = tx.objectStore(&quot;books&quot;);
var person = tx.objectStore(&quot;person&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>[代码<span class="hljs-number">3</span>]
var tx = db.transaction([<span class="hljs-string">"books"</span>,<span class="hljs-string">"person"</span>], <span class="hljs-string">"readonly"</span>)<span class="hljs-comment">;</span>
var <span class="hljs-keyword">books </span>= tx.objectStore(<span class="hljs-string">"books"</span>)<span class="hljs-comment">;</span>
var person = tx.objectStore(<span class="hljs-string">"person"</span>)<span class="hljs-comment">;</span></code></pre>
<h4>操作数据</h4>
<p>完成了事务的创建之后，我们就可以正式的开始进行数据的交互操作了，也就是写我们具体的业务逻辑。如下 [代码1]，一个完整数据事务的操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码1]
var tx = db.transaction(&quot;books&quot;, &quot;readwrite&quot;);
var store = tx.objectStore(&quot;books&quot;);

store.put({title: &quot;Quarry Memories&quot;, author: &quot;Fred&quot;, isbn: 123456});
store.put({title: &quot;Water Buffaloes&quot;, author: &quot;Fred&quot;, isbn: 234567});
store.put({title: &quot;Bedrock Nights&quot;, author: &quot;Barney&quot;, isbn: 345678});

tx.oncomplete = function() {
  // All requests have succeeded and the transaction has committed.
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[代码<span class="hljs-number">1</span>]
var tx = db.transaction(<span class="hljs-string">"books"</span>, <span class="hljs-string">"readwrite"</span>);
var store = tx.objectStore(<span class="hljs-string">"books"</span>);

store.put({<span class="hljs-string">title:</span> <span class="hljs-string">"Quarry Memories"</span>, <span class="hljs-string">author:</span> <span class="hljs-string">"Fred"</span>, <span class="hljs-string">isbn:</span> <span class="hljs-number">123456</span>});
store.put({<span class="hljs-string">title:</span> <span class="hljs-string">"Water Buffaloes"</span>, <span class="hljs-string">author:</span> <span class="hljs-string">"Fred"</span>, <span class="hljs-string">isbn:</span> <span class="hljs-number">234567</span>});
store.put({<span class="hljs-string">title:</span> <span class="hljs-string">"Bedrock Nights"</span>, <span class="hljs-string">author:</span> <span class="hljs-string">"Barney"</span>, <span class="hljs-string">isbn:</span> <span class="hljs-number">345678</span>});

tx.oncomplete = function() {
  <span class="hljs-comment">// All requests have succeeded and the transaction has committed.</span>
};</code></pre>
<p>通过 <code>objectStore</code> 回调得到的 IDBObjectStore 对象，我们就可以进行一些列的增删查改操作了。可以参考 [代码2]。详细的可以参考文末的 <code>appendix</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码2]
  [NewObject] IDBRequest put(any value, optional any key);
  [NewObject] IDBRequest add(any value, optional any key);
  [NewObject] IDBRequest delete(any query);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>[代码<span class="hljs-number">2</span>]
  [NewObject] IDBRequest put(<span class="hljs-built_in">any</span> <span class="hljs-built_in">value</span>, optional <span class="hljs-built_in">any</span> <span class="hljs-built_in">key</span>);
  [NewObject] IDBRequest add(<span class="hljs-built_in">any</span> <span class="hljs-built_in">value</span>, optional <span class="hljs-built_in">any</span> <span class="hljs-built_in">key</span>);
  [NewObject] IDBRequest <span class="hljs-keyword">delete</span>(<span class="hljs-built_in">any</span> query);</code></pre>
<h4>索引数据</h4>
<p>索引数据是所有数据库里面最重要的一个。这里，我们可以使用游标，index 来做。例如，通过 index 来快速索引  key 值，参考 [代码1]。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码1]
var index = objectStore.index(&quot;name&quot;);
index.get(&quot;Donna&quot;).onsuccess = function(event) {
  alert(&quot;Donna's SSN is &quot; + event.target.result.ssn);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>[代码<span class="hljs-number">1</span>]
<span class="hljs-keyword">var</span> index = objectStore.index(<span class="hljs-string">"name"</span>);
index.get(<span class="hljs-string">"Donna"</span>).onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  alert(<span class="hljs-string">"Donna's SSN is "</span> + event.target.result.ssn);
};</code></pre>
<p>更详细的内容，可以参考下文 <a href="#%E6%95%B0%E6%8D%AE%E7%B4%A2%E5%BC%95%E6%96%B9%E5%BC%8F">数据索引方式</a>。</p>
<h3 id="articleHeader7">keyPath 和 key Generator</h3>
<p>何谓 keyPath 和 keyGenerator 应该算是 IndexedDB 里面比较难以理解的概念。简单来说，IndexedDB 在创建 Store 的时候，必须保证里面的数据是唯一的，那么得需要像其它数据库一样设置一个 <code>primary Key</code> 来区分不同数据。而 keyPath 和 Generator 就是两种不同的设置 key 的方式。</p>
<p><strong>设置 keyPath</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 设置预先需要存放的数据

const customerData = [
  { ssn: &quot;444-44-4444&quot;, name: &quot;Bill&quot;, age: 35, email: &quot;bill@company.com&quot; },
  { ssn: &quot;555-55-5555&quot;, name: &quot;Donna&quot;, age: 32, email: &quot;donna@home.org&quot; }
];

# 通过 keyPath 设置 Primary Key
var objectStore = db.createObjectStore(&quot;customers&quot;, { keyPath: &quot;ssn&quot; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 设置预先需要存放的数据</span>

<span class="hljs-keyword">const</span> customerData = [
  { ssn: <span class="hljs-string">"444-44-4444"</span>, name: <span class="hljs-string">"Bill"</span>, age: <span class="hljs-number">35</span>, email: <span class="hljs-string">"bill@company.com"</span> },
  { ssn: <span class="hljs-string">"555-55-5555"</span>, name: <span class="hljs-string">"Donna"</span>, age: <span class="hljs-number">32</span>, email: <span class="hljs-string">"donna@home.org"</span> }
];

<span class="hljs-meta"># 通过 keyPath 设置 Primary Key</span>
<span class="hljs-keyword">var</span> objectStore = db.createObjectStore(<span class="hljs-string">"customers"</span>, { keyPath: <span class="hljs-string">"ssn"</span> });</code></pre>
<p>因为 ssn 在该数据集是唯一的，所以，我们可以利用它来作为 <code>keyPath</code> 保证 <code>unique</code> 的特性。或者，可以设置为自增的键值，比如 <code>id++</code> 类似的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="upgradeDb.createObjectStore('logs', {keyPath: 'id', autoIncrement:true});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">upgradeDb.createObjectStore(<span class="hljs-string">'logs'</span>, {<span class="hljs-string">keyPath:</span> <span class="hljs-string">'id'</span>, <span class="hljs-string">autoIncrement:</span><span class="hljs-literal">true</span>});</code></pre>
<p><strong>使用 generator</strong></p>
<p>generator 会每次在添加数据时，自动创建一个 unique value。这个 unique value 是和你的实际数据是分开的。里面直接通过 <code>autoIncrement:true</code> 来设置即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="upgradeDb.createObjectStore('notes', {autoIncrement:true});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">upgradeDb.createObjectStore(<span class="hljs-string">'notes'</span>, {<span class="hljs-string">autoIncrement:</span><span class="hljs-literal">true</span>});</code></pre>
<h2 id="articleHeader8">indexDB 打开注意事项</h2>
<p><strong>检查是否支持 indexDB</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
  return;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">if</span> (!(<span class="hljs-string">'indexedDB'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>)) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'This browser doesn\'t support IndexedDB'</span>);
  <span class="hljs-keyword">return</span>;
}</code></pre>
<p><strong>版本更新: indexDB</strong></p>
<p>在生成一个 indexDB 实例时，需要手动指定一个版本号。而最常用的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="idb.open('test-db7', 2, function(upgradeDb) {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code style="word-break: break-word; white-space: initial;">idb.<span class="hljs-built_in">open</span>(<span class="hljs-string">'test-db7'</span>, <span class="hljs-number">2</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(upgradeDb)</span></span> {})</code></pre>
<p>这样会造成一个问题，比如上线过程中，用户A第一次请求返回了新版本的网页，连接了版本2。之后又刷新网页命中了另一台未上线的机器，连接了旧版本1 出错。主要原因是：</p>
<blockquote>indexedDB API 中不允许数据库中的数据仓库在同一版本中发生变化. 并且当前 DB 版本不能和低版本的 version 连接。</blockquote>
<p>比如，你一开始定义的 DB 版本内容为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 版本一定义的内容
db.version(1).stores({friends: &quot;++id,name&quot;});

# 版本二修改结构为：
db.version(2).stores({friends: &quot;++id,name,shoeSize&quot;});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code># 版本一定义的内容
<span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.version</span>(1)<span class="hljs-selector-class">.stores</span>({<span class="hljs-attribute">friends</span>: <span class="hljs-string">"++id,name"</span>});

# 版本二修改结构为：
<span class="hljs-selector-tag">db</span><span class="hljs-selector-class">.version</span>(2)<span class="hljs-selector-class">.stores</span>({<span class="hljs-attribute">friends</span>: <span class="hljs-string">"++id,name,shoeSize"</span>});</code></pre>
<p>如果此时，用户先打开了 version(1)，但是后面，又得到的是 version(2) 版本的 HTML，这时就会出现 error 的错误。</p>
<p>参考:</p>
<p><a href="http://dexie.org/docs/Tutorial/Design#database-versioning" rel="nofollow noreferrer" target="_blank">版本更替</a></p>
<h3 id="articleHeader9">版本更新</h3>
<p>这个在 IndexDB 是一个很重要的问题。主要原因在于</p>
<blockquote>indexedDB API 中不允许数据库中的数据仓库在同一版本中发生变化. 并且当前 DB 版本不能和低版本的 version 连接。</blockquote>
<p>上面就可以抽象为一个问题：</p>
<blockquote>你什么情况下需要更新 IndexDB 的版本呢?</blockquote>
<ol>
<li>该表数据库里面的 <code>keyPath</code> 时。</li>
<li>你需要重新设计数据库表结构时，比如新增 index</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 版本 1 的 DB 设计，有一个主键 id 和 index-name
db
.version(1)
.stores({friends: '++id,name'})

# 如果直接想新增一个 key，例如 male，是无法成功的
db
.version(1)
.stores({friends: '++id,name,male'})

# 正确办法是直接修改版本号更新
db
.version(2)
.stores({friends: '++id,name,male'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code># 版本 1 的 <span class="hljs-selector-tag">DB</span> 设计，有一个主键 <span class="hljs-selector-tag">id</span> 和 <span class="hljs-selector-tag">index-name</span>
<span class="hljs-selector-tag">db</span>
<span class="hljs-selector-class">.version</span>(1)
<span class="hljs-selector-class">.stores</span>({<span class="hljs-attribute">friends</span>: <span class="hljs-string">'++id,name'</span>})

# 如果直接想新增一个 <span class="hljs-selector-tag">key</span>，例如 <span class="hljs-selector-tag">male</span>，是无法成功的
<span class="hljs-selector-tag">db</span>
<span class="hljs-selector-class">.version</span>(1)
<span class="hljs-selector-class">.stores</span>({<span class="hljs-attribute">friends</span>: <span class="hljs-string">'++id,name,male'</span>})

# 正确办法是直接修改版本号更新
<span class="hljs-selector-tag">db</span>
<span class="hljs-selector-class">.version</span>(2)
<span class="hljs-selector-class">.stores</span>({<span class="hljs-attribute">friends</span>: <span class="hljs-string">'++id,name,male'</span>})</code></pre>
<p>不过，如果直接修改版本号，会出现这样一个 case:</p>
<ul><li>由于原始 HTML 更新问题，用户首先访问的是版本 1 的 A 页面，然后，访问更新过后的 B 页面。这时，IndexDB 成功更新为高版本。但是，用户下次又命中了老版本的 A 页面，此时 A 中还是连接低版本的 IndexDB ,就会报错，导致你访问失败。</li></ul>
<p>解决办法就是，设置过滤，在 <code>open</code> 的时候，手动传入版本号：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 打开版本 1 的数据库
var dbPromise = idb.open('db1', 1, function(upgradeDb){...})

# 打开版本 2 的数据库
var dbPromise = idb.open('db2', 2, function(upgradeDb){...})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-comment"># 打开版本 1 的数据库</span>
<span class="hljs-keyword">var</span> dbPromise = idb.open('db1', <span class="hljs-number">1</span>, function(upgradeDb)<span class="hljs-meta">{...}</span>)

<span class="hljs-comment"># 打开版本 2 的数据库</span>
<span class="hljs-keyword">var</span> dbPromise = idb.open('db2', <span class="hljs-number">2</span>, function(upgradeDb)<span class="hljs-meta">{...}</span>)</code></pre>
<p>不过，这样又会造成另外一个问题，即，数据迁移（老版本数据，不可能不要吧）。这里，IndexDB 会有一个 updateCallback 给你触发，你可以直接在里面做相关的数据迁移处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dbPromise = idb.open('test-db7', 2, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('store', {keyPath: 'name'});
    case 1:
      var peopleStore = upgradeDb.transaction.objectStore('store');
      peopleStore.createIndex('price', 'price');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> dbPromise = idb.open(<span class="hljs-string">'test-db7'</span>, <span class="hljs-number">2</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(upgradeDb)</span> </span>{
  <span class="hljs-keyword">switch</span> (upgradeDb.oldVersion) {
    <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
      upgradeDb.createObjectStore(<span class="hljs-string">'store'</span>, {keyPath: <span class="hljs-string">'name'</span>});
    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
      <span class="hljs-keyword">var</span> peopleStore = upgradeDb.transaction.objectStore(<span class="hljs-string">'store'</span>);
      peopleStore.createIndex(<span class="hljs-string">'price'</span>, <span class="hljs-string">'price'</span>);
  }
});</code></pre>
<p>在使用的时候，一定要注意 DB 版本的升级处理，比如有这样一个 case，你的版本已经是 3，不过，你需要处理版本二的数据:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 将版本二 中的 name 拆分为  firstName 和 lastName
db.version(3).stores({friends: &quot;++id,shoeSize,firstName,lastName&quot;}).upgrade(function(t) {
    
    return t.friends.toCollection().modify(function(friend) {
        // Modify each friend:
        friend.firstName = friend.name.split(' ')[0];
        friend.lastName = friend.name.split(' ')[1];
        delete friend.name;
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code># 将版本二 中的 name 拆分为  firstName 和 lastName
db.version(<span class="hljs-number">3</span>).stores({friends: <span class="hljs-string">"++id,shoeSize,firstName,lastName"</span>}).upgrade(function(t) {
    
    <span class="hljs-keyword">return</span> t.friends.toCollection().modify(function(<span class="hljs-keyword">friend</span>) {
        <span class="hljs-comment">// Modify each friend:</span>
        <span class="hljs-keyword">friend</span>.firstName = <span class="hljs-keyword">friend</span>.name.split(<span class="hljs-string">' '</span>)[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">friend</span>.lastName = <span class="hljs-keyword">friend</span>.name.split(<span class="hljs-string">' '</span>)[<span class="hljs-number">1</span>];
        <span class="hljs-keyword">delete</span> <span class="hljs-keyword">friend</span>.name;
    });
});</code></pre>
<p>对于存在版本 2 数据库的用户来说是 OK 的，但是对于某些还没有访问过你数据库的用户来说，这无疑就报错了。解决办法有：</p>
<ul>
<li>保留每个版本时，创建的字段和 stores</li>
<li>在更新  callback 里面，对处理的数据判断是否存在即可。</li>
</ul>
<p>在 Dexie.js DB 数据库中，需要你保留每次 DB 创建的方法，实际上是通过 添加 swtich case ，来完成每个版本的更新：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Dexie.js 保留 DB 数据库
db.version(1).stores({friends: &quot;++id,name&quot;});
db.version(2).stores({friends: &quot;++id,name,shoeSize&quot;});
db.version(3).stores({friends: &quot;++id,shoeSize,firstName,lastName&quot;}).upgrade(...)

# 内部原理，直接添加 switch case 完成版本更新
var dbPromise = idb.open('test-db7', 2, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('store', {keyPath: 'name'});
    case 1:
      var peopleStore = upgradeDb.transaction.objectStore('store');
      peopleStore.createIndex('price', 'price');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment"># Dexie.js 保留 DB 数据库</span>
db.version(<span class="hljs-number">1</span>).stores({friends: <span class="hljs-string">"++id,name"</span>});
db.version(<span class="hljs-number">2</span>).stores({friends: <span class="hljs-string">"++id,name,shoeSize"</span>});
db.version(<span class="hljs-number">3</span>).stores({friends: <span class="hljs-string">"++id,shoeSize,firstName,lastName"</span>}).upgrade(...)

<span class="hljs-comment"># 内部原理，直接添加 switch case 完成版本更新</span>
<span class="hljs-keyword">var</span> dbPromise = idb.open(<span class="hljs-string">'test-db7'</span>, <span class="hljs-number">2</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(upgradeDb)</span> </span>{
  <span class="hljs-keyword">switch</span> (upgradeDb.oldVersion) {
    <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
      upgradeDb.createObjectStore(<span class="hljs-string">'store'</span>, {keyPath: <span class="hljs-string">'name'</span>});
    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
      <span class="hljs-keyword">var</span> peopleStore = upgradeDb.transaction.objectStore(<span class="hljs-string">'store'</span>);
      peopleStore.createIndex(<span class="hljs-string">'price'</span>, <span class="hljs-string">'price'</span>);
  }
});</code></pre>
<p>如果遇到一个页面打开，但是另外一个页面拉取到新的代码进行更新时，这个时候还需要将低版本  indexedDB 进行显式的关闭。具体操作办法就是监听 <code>onversionchange</code> 事件，当版本升级时，通知当前 DB 进行关闭，然后在新的页面进行更新操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openReq.onupgradeneeded = function(event) {
  // 所有其它数据库都已经被关掉了，直接更新代码
  db.createObjectStore(/* ... */);
  db.onversionchange = function(event) {
    db.close();
  };

}  
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>openReq.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-comment">// 所有其它数据库都已经被关掉了，直接更新代码</span>
  db.createObjectStore(<span class="hljs-comment">/* ... */</span>);
  db.onversionchange = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
    db.close();
  };

}  
  </code></pre>
<p>最后，更新是还有几个注意事项：</p>
<ul>
<li>版本更新不能改变 primary key</li>
<li>回退代码时，千万注意版本是否已经更新。否则，只能增量更新，重新修改版本号来修复。</li>
</ul>
<h2 id="articleHeader10">存储加密特性</h2>
<p>有时候，我们存储时，想得到一个由一串 String 生成的 hash key，那在 Web 上应该如何实现呢？</p>
<p>这里可以直接利用 Web 上已经实现的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto" rel="nofollow noreferrer" target="_blank">WebCrypto</a>，为了实现上述需求，我们可以直接利用里面的 <code>digest</code> 方法即可。这里 MDN 上，已经有现成的办法，我们直接使用即可。</p>
<p>参考：</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto" rel="nofollow noreferrer" target="_blank">WebCrypto 加密手段</a></p>
<h2 id="articleHeader11">存储上限值</h2>
<p>基本限制为：</p>
<table>
<thead><tr>
<th align="left">浏览器</th>
<th align="left">限制</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Chrome</td>
<td align="left">可用空间 &lt; 6%</td>
</tr>
<tr>
<td align="left">Firebox</td>
<td align="left">可用空间 &lt; 10%</td>
</tr>
<tr>
<td align="left">Safari</td>
<td align="left">&lt; 50MB</td>
</tr>
<tr>
<td align="left">IE10</td>
<td align="left">&lt; 250MB</td>
</tr>
</tbody>
</table>
<p>逐出策略为:</p>
<table>
<thead><tr>
<th align="left">浏览器</th>
<th align="left">逐出政策</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Chrome</td>
<td align="left">在 Chrome 耗尽空间后采用 LRU 策略</td>
</tr>
<tr>
<td align="left">Firebox</td>
<td align="left">在整个磁盘已装满时采用 LRU 策略</td>
</tr>
<tr>
<td align="left">Safari</td>
<td align="left">无逐出</td>
</tr>
<tr>
<td align="left">Edge</td>
<td align="left">无逐出</td>
</tr>
</tbody>
</table>
<p>参考：</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API#gloss_key_path" rel="nofollow noreferrer" target="_blank">存储上限值</a><br><a href="https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa?hl=zh-cn" rel="nofollow noreferrer" target="_blank">浏览器内核存储上限值处理</a></p>
<h2 id="articleHeader12">数据索引方式</h2>
<p>在数据库中除了基本的 CRUD 外，一个高效的索引架构，则是里面的重中之重。在 indexedDB 中，我们一共可以通过三种方式来索引数据：</p>
<ul>
<li>固定的 key 值</li>
<li>索引外键（index）</li>
<li>游标（cursor）</li>
</ul>
<h3 id="articleHeader13">固定 key 索引</h3>
<p>IDBObjectStore 提供给了我们直接通过 <code>primaryKey</code> 来索引数据，参考 [代码1]，这种方式需要我们一开始就知道目标的 <code>key</code> 内容。当然，也可以通过 <code>getAll</code> 全部索引数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码1]
  [NewObject] IDBRequest get(any query);
  [NewObject] IDBRequest getKey(any query);
  [NewObject] IDBRequest getAll(optional any query,
                                optional [EnforceRange] unsigned long count);
  [NewObject] IDBRequest getAllKeys(optional any query,
                                    optional [EnforceRange] unsigned long count);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>[代码<span class="hljs-number">1</span>]
  [NewObject] IDBRequest get(<span class="hljs-built_in">any</span> query);
  [NewObject] IDBRequest getKey(<span class="hljs-built_in">any</span> query);
  [NewObject] IDBRequest getAll(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                <span class="hljs-keyword">optional</span> [EnforceRange] unsigned long <span class="hljs-built_in">count</span>);
  [NewObject] IDBRequest getAllKeys(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                    <span class="hljs-keyword">optional</span> [EnforceRange] unsigned long <span class="hljs-built_in">count</span>);</code></pre>
<p>比如，我们通过 primaryKey 得到一条具体的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.transaction(&quot;customers&quot;).objectStore(&quot;customers&quot;).get(&quot;id_card_1118899&quot;).onsuccess = function(event) {
    // data is event.target.result.name
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>db.transaction(<span class="hljs-string">"customers"</span>).objectStore(<span class="hljs-string">"customers"</span>).get(<span class="hljs-string">"id_card_1118899"</span>).onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
    <span class="hljs-comment">// data is event.target.result.name</span>
};</code></pre>
<p>也可以 fetch 整个 Object Store 的数据。这些场景用处比较少，这里就不过多讲解。我们主要来了解一下 index 的索引方式。</p>
<h3 id="articleHeader14">index 索引</h3>
<p>如果想要查询某个数据，直接通过整个对象来进行遍历的话，这样做性能耗时是非常大的。如果我们结合 <code>index</code> 来将 key 加以分类，就可以很快速的实现指定数据的索引。这里，我们可以直接利用 IDBObjectStore 上面的 <code>index()</code> 方法来获取指定 index 的值，具体方法可以参考 [代码1]。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码1]
 IDBIndex index(DOMString name);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>[代码<span class="hljs-number">1</span>]
 IDBIndex <span class="hljs-keyword">index</span>(DOMString <span class="hljs-keyword">name</span>);</code></pre>
<p>该方法会直接返回一个 IDBIndex 对象。这你也可以理解为一个类似 ObjectStore 的微型 index 数据内容。接着，我们可以使用 <code>get()</code> 方法来获得指定 index 的数据，参考[代码2]。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码2]
var index = objectStore.index(&quot;name&quot;);
index.get(&quot;Donna&quot;).onsuccess = function(event) {
  alert(&quot;Donna's SSN is &quot; + event.target.result.ssn);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>[代码<span class="hljs-number">2</span>]
<span class="hljs-keyword">var</span> index = objectStore.index(<span class="hljs-string">"name"</span>);
index.get(<span class="hljs-string">"Donna"</span>).onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  alert(<span class="hljs-string">"Donna's SSN is "</span> + event.target.result.ssn);
};</code></pre>
<p>使用 <code>get</code> 方法不管你的 index 是否是 <code>unique</code> 的都会只会返回第一个数据。如果想得到多个数据的话，可以使用 <code>getAll(key)</code> 来做。通过 <code>getAll()</code> 得到的回调函数，直接通过 <code>event.target.result</code> 可以得到对应的 value 内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="objectStore.getAll().onsuccess = function(event) {
      printf(event.target.result); // Array
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>objectStore.getAll().onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> {</span>
      <span class="hljs-built_in">printf</span>(event.target.result); <span class="hljs-comment">// Array</span>
    };</code></pre>
<p>除了通过 <code>getAll()</code> 得到所有数据外，还可以采用更高效的 <code>cursor</code> 方法遍历得到的数据。</p>
<p>参考：</p>
<p><a href="https://googlechrome.github.io/samples/idb-getall/" rel="nofollow noreferrer" target="_blank">getAll() 和 openCursor 实例</a></p>
<h3 id="articleHeader15">游标索引</h3>
<p>所谓的游标，大家心里应该可以有一个初步的印象，就像我们物理尺子上的那个东西，可以自由的移动，来标识指向的对象内容。cursor 里面有两个核心的方法：</p>
<ul>
<li>advance(count): 将当前游标位置向前移动 count 位置</li>
<li>continue(key): 将当前游标位置移动到指定 key 的位置，如果没提供 key 则代表的移动下一个位置。</li>
</ul>
<p>比如，我们使用 cursor 来遍历 Object Store 的具体数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if(cursor) {
        // cursor.key 
        // cursor.value
      cursor.continue();
    } else {
      console.log('Entries all displayed.');
    }
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>objectStore.openCursor().onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> cursor = event.target.result;
    <span class="hljs-keyword">if</span>(cursor) {
        <span class="hljs-comment">// cursor.key </span>
        <span class="hljs-comment">// cursor.value</span>
      cursor.continue();
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Entries all displayed.'</span>);
    }
  };</code></pre>
<p>通常，游标可以用来遍历两个类型的数据，一个是 ObjectStore、一个是 Index。</p>
<ul>
<li>Object.store: 如果在该对象上使用游标，那么会根据 <code>primaryKey</code> 遍历整个数据，注意，这里不会存在重复的情况，因为 <code>primaryKey</code> 是唯一的。</li>
<li>index: 在 index 上使用游标的话，会以当前的 index 来进行遍历，其中可能会存在重复的现象。</li>
</ul>
<p>在 IDBObjectStore 对象上有两种方法来打开游标：</p>
<ul>
<li>openCursor: 遍历的对象是 具体的数据值，最常用的方法</li>
<li>openKeyCursor: 遍历的对象是 数据 key 值</li>
</ul>
<p>这里，我们通过 <code>openCursor</code> 来直接打开一个 index 数据集，然后进行遍历。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="PersonIndex.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    customers.push(cursor.value);
    cursor.continue();
  }
  else {
    alert(&quot;Got all customers: &quot; + customers);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>PersonIndex.openCursor().onsuccess = function(event) {
  var <span class="hljs-built_in">cursor</span> = event.target.result;
  <span class="hljs-built_in">if</span> (<span class="hljs-built_in">cursor</span>) {
    customers.push(<span class="hljs-built_in">cursor</span>.value);
    <span class="hljs-built_in">cursor</span>.<span class="hljs-built_in">continue</span>();
  }
  <span class="hljs-built_in">else</span> {
    alert(<span class="hljs-string">"Got all customers: "</span> + customers);
  }
};</code></pre>
<p>在游标中，还提供给了一个 <code>update</code> 和 <code>delete</code> 方法，我们可以用它来进行数据的更新操作，否则的话就直接使用  ObjectStore 提供的 <code>put</code> 方法。</p>
<p>游标里面我们还可以限定其遍历的范围和方向。这个设置是我们直接在 <code>openCursor()</code> 方法里面传参完成的，该方法的构造函数参考 [代码1]。他里面可以传入两个参数，第一个用来指定范围，第二个用来指定 <code>cursor</code> 移动的方向。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码1]
IDBRequest openCursor(optional any query,
                                    optional IDBCursorDirection direction = &quot;next&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>[代码<span class="hljs-number">1</span>]
IDBRequest openCursor(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                    <span class="hljs-keyword">optional</span> IDBCursorDirection direction = <span class="hljs-string">"next"</span>);</code></pre>
<p>如果需要对 cursor 设置范围的话，就需要使用到 <code>IDBKeyRange</code> 这个对象，使用样板可以参考 [代码2]。IDBKeyRange 里面 key 参考的对象 因使用者的不同而不同。如果是针对 ObjectStore 的话，则是针对 primaryKey，如果是针对 Index 的话，则是针对当前的 indexKey</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/ 匹配所有在 “Bill” 前面的, 但是不需要包括 &quot;Bill&quot;
var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound(&quot;Bill&quot;, true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>/ 匹配所有在 “Bill” 前面的, 但是不需要包括 <span class="hljs-string">"Bill"</span>
<span class="hljs-keyword">var</span> lowerBoundOpenKeyRange = IDBKeyRange.lowerBound(<span class="hljs-string">"Bill"</span>, <span class="hljs-literal">true</span>);</code></pre>
<p>比如，我们这里对 PersonIndex 设置一个 index 范围，即，索引 在 <code>villainhr</code> 和 <code>jimmyVV</code> 之间的数据集合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 都包括 villainhr 和 jimmyVV 的数据
var boundKeyRange = IDBKeyRange.bound(&quot;villainhr&quot;, &quot;jimmyVV&quot;, true, true);

 PersonIndex.openCursor(boundKeyRange).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the matches.
    cursor.continue();
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment"># 都包括 villainhr 和 jimmyVV 的数据</span>
<span class="hljs-keyword">var</span> boundKeyRange = IDBKeyRange.bound(<span class="hljs-string">"villainhr"</span>, <span class="hljs-string">"jimmyVV"</span>, <span class="hljs-keyword">true</span>, <span class="hljs-keyword">true</span>);

 PersonIndex.openCursor(boundKeyRange).onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-keyword">var</span> cursor = event.target.result;
  <span class="hljs-keyword">if</span> (cursor) {
    <span class="hljs-comment">// Do something with the matches.</span>
    cursor.<span class="hljs-keyword">continue</span>();
  }
};</code></pre>
<p>如果你还想设置遍历的方向和是否排除重复数据，还可以根据 [代码2] 的枚举类型来设置。比如，在 [代码3] 中，我们改变默认的 cursor 遍历数据的方向为 <code>prev</code>，从末尾开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码2]
enum IDBCursorDirection {
  &quot;next&quot;,
  &quot;nextunique&quot;,
  &quot;prev&quot;,
  &quot;prevunique&quot;
};

[代码3]
objectStore.openCursor(null, IDBCursor.prev).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.value 
    cursor.continue();
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>[代码<span class="hljs-number">2</span>]
<span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">IDBCursorDirection</span> {</span>
  <span class="hljs-string">"next"</span>,
  <span class="hljs-string">"nextunique"</span>,
  <span class="hljs-string">"prev"</span>,
  <span class="hljs-string">"prevunique"</span>
};

[代码<span class="hljs-number">3</span>]
objectStore.openCursor(<span class="hljs-literal">null</span>, IDBCursor.prev).onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(event) {
  <span class="hljs-keyword">var</span> cursor = event.target.result;
  <span class="hljs-keyword">if</span> (cursor) {
    <span class="hljs-comment">// cursor.value </span>
    cursor.<span class="hljs-keyword">continue</span>();
  }
};</code></pre>
<h2 id="articleHeader16">事务读取性能</h2>
<p>在 indexDB 里面的读写全部是基于 <code>transaction</code> 模式来的。也就是 IDBDataBase 里面的 <code>transaction</code> 方法，如下 [代码1]。所有的读写都可以比作在 <code>transaction</code> 作用域下的请求，只有当所有请求完成之后，该次 <code>transaction</code> 才会生效，否则就会抛出异常或者错误。<code>transaction</code> 会根据监听 error，abort，以及 complete 三个事件来完成整个事务的流程管理，参考[代码2]。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[代码1]
  [NewObject] IDBTransaction transaction((DOMString or sequence<DOMString>) storeNames,
                                         optional IDBTransactionMode mode = &quot;readonly&quot;);

[代码2]
  attribute EventHandler onabort;
  attribute EventHandler oncomplete;
  attribute EventHandler onerror;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>[代码<span class="hljs-number">1</span>]
  [NewObject] IDBTransaction transaction((DOMString <span class="hljs-keyword">or </span>sequence&lt;DOMString&gt;) storeNames,
                                         optional IDBTransactionMode mode = <span class="hljs-string">"readonly"</span>)<span class="hljs-comment">;</span>

[代码<span class="hljs-number">2</span>]
  attribute EventHandler onabort<span class="hljs-comment">;</span>
  attribute EventHandler oncomplete<span class="hljs-comment">;</span>
  attribute EventHandler onerror<span class="hljs-comment">;</span></code></pre>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = db.transaction([&quot;customers&quot;], &quot;readwrite&quot;)
                .objectStore(&quot;customers&quot;)
                .delete(&quot;gg&quot;);
request.onsuccess = function(event) {
  // delete, done
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> request = db.transaction([<span class="hljs-string">"customers"</span>], <span class="hljs-string">"readwrite"</span>)
                .objectStore(<span class="hljs-string">"customers"</span>)
                .delete(<span class="hljs-string">"gg"</span>);
request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-comment">// delete, done</span>
};</code></pre>
<p>你可以在 <code>transaction</code> 方法里面手动传入 <code>readwrite</code> 或者其他表示事务的 <code>readonly</code> 参数，来表示本次事务你会进行如何的操作。IndexedDB 在初始设计时，就已经决定了它的性能问题。</p>
<blockquote>只含有 readonly 模式的 transaction 可以并发进行执行<br>含有 write 模式的 transaction 必须按照队列 来 执行</blockquote>
<p>这就意味着，如果你使用了 <code>readwrite</code> 模式的话，那么后续不管是不是 <code>readonly</code> 都必须等待该次 transaction 完成才行。</p>
<h2 id="articleHeader17">常用技巧</h2>
<h3 id="articleHeader18">生成 id++ 的主键</h3>
<p>指定 primaryKey 生成时，是通过 <code>createObjectStore</code> 方法来操作的。有时候，我们会遇到想直接得到一个 key，并且存在于当前数据集中，可以在 options 中同时加上 <code>keyPath</code> 和 <code>autoIncrement</code> 属性。该 key 的范围是 [1- $ 2^{53} $]，参考 <a href="https://www.w3.org/TR/IndexedDB/#key-generator-construct" rel="nofollow noreferrer" target="_blank">keygenerator key 的大小</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.createObjectStore('table1', {keyPath: 'id', autoIncrement: true});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">db.createObjectStore(<span class="hljs-string">'table1'</span>, {<span class="hljs-string">keyPath:</span> <span class="hljs-string">'id'</span>, <span class="hljs-string">autoIncrement:</span> <span class="hljs-literal">true</span>});</code></pre>
<h2 id="articleHeader19">推荐</h2>
<p><strong>阅读推荐</strong></p>
<p><a href="https://www.w3.org/TR/IndexedDB/#cursor-interface" rel="nofollow noreferrer" target="_blank">indexedDB W3C 文档 </a><br><a href="https://developers.google.com/web/ilt/pwa/working-with-indexeddb#data_storage_limits" rel="nofollow noreferrer" target="_blank">indexedDB 入门</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB" rel="nofollow noreferrer" target="_blank">MDN indexedDB 入门</a></p>
<p><strong>好用库推荐</strong></p>
<p><a href="https://github.com/jakearchibald/idb" rel="nofollow noreferrer" target="_blank">idb: 一个  promise 的 DB 库</a></p>
<h2 id="articleHeader20">Indexed Appendix</h2>
<ul>
<li>IndexedDB 数据库使用key-value键值对储存数据.你可以对对象的某个属性创建索引（index）以实现快速查询和列举排序。.key可以使二进制对象</li>
<li>IndexedDB 是事务模式的数据库.  IndexedDB API提供了索引(indexes), 表(tables), 指针(cursors)等等, 但是所有这些必须是依赖于某种事务的。</li>
<li>The IndexedDB API 基本上是异步的.</li>
<li>IndexedDB 数据库的请求都会包含 onsuccess和onerror事件属性。</li>
<li>IndexedDB 在结果准备好之后通过DOM事件通知用户</li>
<li>IndexedDB是面向对象的。indexedDB不是用二维表来表示集合的关系型数据库。这一点非常重要，将影响你设计和建立你的应用程序。</li>
<li>indexedDB不使用结构化查询语言（SQL）。它通过索引(index)所产生的指针(cursor)来完成查询操作，从而使你可以迭代遍历到结果集合。</li>
<li>IndexedDB遵循同源（same-origin）策略</li>
</ul>
<h3 id="articleHeader21">局限和移除 case</h3>
<ul>
<li>全球多种语言混合存储。国际化支持不好。需要自己处理。</li>
<li>和服务器端数据库同步。你得自己写同步代码。</li>
<li>全文搜索。</li>
</ul>
<p>在以下情况下，数据库可能被清除:</p>
<ul>
<li>用户请求清除数据。</li>
<li>浏览器处于隐私模式。最后退出浏览器的时候，数据会被清除。</li>
<li>硬盘等存储设备的容量到限。</li>
<li>不正确的</li>
<li>不完整的改变.</li>
</ul>
<h3 id="articleHeader22">常规概念</h3>
<p><strong>数据库</strong></p>
<ul>
<li>
<p>数据库: 通常包含一个或多个 object stores. 每个数据库必须包含以下内容：</p>
<ul>
<li>名字(Name)： 它标识了一个特定源中的数据库，并且在数据库的整个生命周期内保持不变.  此名字可以为任意字符串值（包括空字符串）.</li>
<li>当前版本(version). 当一个数据库首次创建时，它的 version 为1，除非另外指定. 每个数据库在任意时刻只能有一个 version</li>
</ul>
</li>
<li>
<p>对象存储(object store): 用来承载数据的一个分区.数据以键值对形式被对象存储永久持有。在 OS 中，创建一个 key 可以使用 <code>key generator</code> 和 <code>key path</code>。</p>
<ul>
<li>key generator: 简单来说就是在存储数据时，主动生成一个 id++ 来区分每条记录。这种情况下 存储数据的 key 是和 value 分开进行存储的，也就是 （out of line）。</li>
<li>key path: 需要用户主动来设置储存数据的 key 内容，</li>
<li>request: 每次读写操作，可以当做一次 request.</li>
<li>transaction: 一系列读写请求的集合。</li>
<li>index: 一个特殊的 Object Store，用来索引另外一个 Store 的数据。</li>
</ul>
</li>
<li>
<p>具体数据 key/value</p>
<ul><li>
<p>key: 这个 key 的值，可以通过三种方式生成。 a key generator, a key path, 用户指定的值。并且，这个 key 在当前的 Object Store 是唯一的。一个 key 类型可以是  string, date, float, and array 类型。不过，在老版本的时候，一般只支持 string or integer。（现在，版本应该都 OK 了）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- key generator: 相当于以一种 `id++` 的形式来生成一个 key 值。
- key path: 当前指定的 key 可以根据 value 里面的内容来指定。里面可以为一些分隔符。
- 指定的 key：这个就是需要用户手动来指定生成。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> key <span class="hljs-symbol">generator:</span> 相当于以一种 <span class="hljs-string">`id++`</span> 的形式来生成一个 key 值。
</span>-<span class="ruby"> key <span class="hljs-symbol">path:</span> 当前指定的 key 可以根据 value 里面的内容来指定。里面可以为一些分隔符。
</span>-<span class="ruby"> 指定的 key：这个就是需要用户手动来指定生成。</span></code></pre>
<ul><li>value: 可以存储  boolean, number, string, date, object, array, regexp, undefined, and null。现在还可以存储 files and blob 对象。</li></ul>
</li></ul>
</li>
</ul>
<p><strong>操作作用域</strong></p>
<ul>
<li>scope：这可以比作 transaction 的作用域，即，一系列 transaction 执行的顺序。该规定，多个 reading transaction 能够同时执行。但是 writing 则只能排队进行。</li>
<li><p>key range: 用来设置取出数据的  key 的范围内容。</p></li>
</ul>
<p>参考：</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB" rel="nofollow noreferrer" target="_blank">原生概念 IndexedDB</a></p>
<h3 id="articleHeader23">IDBFactory</h3>
<p>这其实就是 <code>indexDB</code> 上面挂载的对象。主要 API 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Exposed=(Window,Worker)]
interface IDBFactory {
  [NewObject] IDBOpenDBRequest open(DOMString name,
                                    optional [EnforceRange] unsigned long long version);
  [NewObject] IDBOpenDBRequest deleteDatabase(DOMString name);

  short cmp(any first, any second);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>[Exposed=(Window,Worker)]
<span class="hljs-keyword">interface</span> <span class="hljs-title">IDBFactory</span> {
  [NewObject] <span class="hljs-function">IDBOpenDBRequest <span class="hljs-title">open</span>(<span class="hljs-params">DOMString name,
                                    optional [EnforceRange] unsigned <span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> version</span>)</span>;
  [NewObject] <span class="hljs-function">IDBOpenDBRequest <span class="hljs-title">deleteDatabase</span>(<span class="hljs-params">DOMString name</span>)</span>;

  <span class="hljs-function"><span class="hljs-keyword">short</span> <span class="hljs-title">cmp</span>(<span class="hljs-params">any first, any second</span>)</span>;
};</code></pre>
<p>你可以直接通过 <code>open</code> 来打开一个数据库。通过 返回一个 Request 对象，来进行结果监听的回调：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('AddressBook', 15);
request.onsuccess = function(evt) {...};
request.onerror = function(evt) {...};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> request = indexedDB.open('<span class="hljs-type">AddressBook</span>', <span class="hljs-number">15</span>);
request.onsuccess = function(evt) <span class="hljs-meta">{...}</span>;
request.onerror = function(evt) <span class="hljs-meta">{...}</span>;</code></pre>
<p>参考：</p>
<p><a href="https://www.w3.org/TR/IndexedDB/#factory-interface" rel="nofollow noreferrer" target="_blank">IndexDB Factory API</a></p>
<h3 id="articleHeader24">IDBRequest</h3>
<p>当你通过 <code>open</code> 方法处理过后，就会得到一个 Request 回调对象。这个就是 IDBRequest 的实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Exposed=(Window,Worker)]
interface IDBRequest : EventTarget {
  readonly attribute any result; // 通过 open 打开过后的 IDBObjectStore 实例 
  readonly attribute DOMException? error;
  readonly attribute (IDBObjectStore or IDBIndex or IDBCursor)? source;
  readonly attribute IDBTransaction? transaction;
  readonly attribute IDBRequestReadyState readyState;

  // Event handlers:
  attribute EventHandler onsuccess;
  attribute EventHandler onerror;
};

enum IDBRequestReadyState {
  &quot;pending&quot;,
  &quot;done&quot;
};

[Exposed=(Window,Worker)]
interface IDBOpenDBRequest : IDBRequest {
  // Event handlers:
  attribute EventHandler onblocked;
  attribute EventHandler onupgradeneeded;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>[Exposed=(Window,Worker)]
<span class="hljs-keyword">interface</span> <span class="hljs-title">IDBRequest</span> : <span class="hljs-title">EventTarget</span> {
  <span class="hljs-keyword">readonly</span> attribute any result; <span class="hljs-comment">// 通过 open 打开过后的 IDBObjectStore 实例 </span>
  <span class="hljs-keyword">readonly</span> attribute DOMException? error;
  <span class="hljs-function"><span class="hljs-keyword">readonly</span> <span class="hljs-title">attribute</span> (<span class="hljs-params">IDBObjectStore or IDBIndex or IDBCursor</span>)? source</span>;
  <span class="hljs-keyword">readonly</span> attribute IDBTransaction? transaction;
  <span class="hljs-keyword">readonly</span> attribute IDBRequestReadyState readyState;

  <span class="hljs-comment">// Event handlers:</span>
  attribute EventHandler onsuccess;
  attribute EventHandler onerror;
};

<span class="hljs-keyword">enum</span> IDBRequestReadyState {
  <span class="hljs-string">"pending"</span>,
  <span class="hljs-string">"done"</span>
};

[Exposed=(Window,Worker)]
<span class="hljs-keyword">interface</span> <span class="hljs-title">IDBOpenDBRequest</span> : <span class="hljs-title">IDBRequest</span> {
  <span class="hljs-comment">// Event handlers:</span>
  attribute EventHandler onblocked;
  attribute EventHandler onupgradeneeded;
};</code></pre>
<p>你可以通过 <code>result</code> 得到当前数据库操作的结果。如果你打开更新后的版本号的话，还需要监听 <code>onupgradeneeded</code> 事件来实现。最常通过 indexedDB.open 遇见的错误就是 <code>VER_ERR</code> 版本错误。这表明存储在磁盘上的数据库的版本高于你试图打开的版本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.onerror = function(event) {
  // Generic error handler for all errors targeted at this database's
  // requests!
  alert(&quot;Database error: &quot; + event.target.errorCode);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>db.onerror = <span class="hljs-keyword">function</span>(event) {
  // <span class="hljs-keyword">Generic</span> error handler <span class="hljs-keyword">for</span> <span class="hljs-keyword">all</span> errors targeted <span class="hljs-keyword">at</span> this database<span class="hljs-symbol">'s</span>
  // requests!
  alert(<span class="hljs-string">"Database error: "</span> + event.target.errorCode);
};</code></pre>
<p>所以，一般在创建 IndexDB 时，还需要管理它版本的更新操作，这里就需要监听 onupgradeneeded 来是实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request.onupgradeneeded = function(event) { 
   // 更新对象存储空间和索引 .... 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{ 
   <span class="hljs-comment">// 更新对象存储空间和索引 .... </span>
};</code></pre>
<p>或者我们可以直接使用 <code>idb</code> 微型库来实现读取操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var dbPromise = idb.open('test-db3', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('people')) {
      upgradeDb.createObjectStore('people', {keyPath: 'email'});
    }
    if (!upgradeDb.objectStoreNames.contains('notes')) {
      upgradeDb.createObjectStore('notes', {autoIncrement: true});
    }
    if (!upgradeDb.objectStoreNames.contains('logs')) {
      upgradeDb.createObjectStore('logs', {keyPath: 'id', autoIncrement: true});
    }
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>  <span class="hljs-keyword">var</span> dbPromise = idb.open(<span class="hljs-string">'test-db3'</span>, <span class="hljs-number">1</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(upgradeDb)</span> </span>{
    <span class="hljs-keyword">if</span> (!upgradeDb.objectStoreNames.contains(<span class="hljs-string">'people'</span>)) {
      upgradeDb.createObjectStore(<span class="hljs-string">'people'</span>, {keyPath: <span class="hljs-string">'email'</span>});
    }
    <span class="hljs-keyword">if</span> (!upgradeDb.objectStoreNames.contains(<span class="hljs-string">'notes'</span>)) {
      upgradeDb.createObjectStore(<span class="hljs-string">'notes'</span>, {autoIncrement: <span class="hljs-literal">true</span>});
    }
    <span class="hljs-keyword">if</span> (!upgradeDb.objectStoreNames.contains(<span class="hljs-string">'logs'</span>)) {
      upgradeDb.createObjectStore(<span class="hljs-string">'logs'</span>, {keyPath: <span class="hljs-string">'id'</span>, autoIncrement: <span class="hljs-literal">true</span>});
    }
  });</code></pre>
<p>其中通过 <code>onupgradeneeded</code> 回调得到的 event.result 就是 <code>IDBDatabase</code> 的实例，常常用来设置 index 和插入数据。参考下面内容。</p>
<p>参考：</p>
<p><a href="https://www.w3.org/TR/IndexedDB/#request-api" rel="nofollow noreferrer" target="_blank">IDBRequest API</a></p>
<h3 id="articleHeader25">IDBDatabase</h3>
<p>该对象常常用来做 Object Store 和 transaction 的创建和删除。该部分是 <code>onupgradeneeded</code> 事件获得的 <code>event.target.result</code> 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request.onupgradeneeded = function(event) { 
   // 更新对象存储空间和索引 .... 
   // event.target.result 对象
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{ 
   <span class="hljs-comment">// 更新对象存储空间和索引 .... </span>
   <span class="hljs-comment">// event.target.result 对象</span>
};</code></pre>
<p>具体 API 内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Exposed=(Window,Worker)]
interface IDBDatabase : EventTarget {
  readonly attribute DOMString name;
  readonly attribute unsigned long long version;
  readonly attribute DOMStringList objectStoreNames;

  [NewObject] IDBTransaction transaction((DOMString or sequence<DOMString>) storeNames,
                                         optional IDBTransactionMode mode = &quot;readonly&quot;);
  void close();

  [NewObject] IDBObjectStore createObjectStore(DOMString name,
                                               optional IDBObjectStoreParameters options);
  void deleteObjectStore(DOMString name);

  // Event handlers:
  attribute EventHandler onabort;
  attribute EventHandler onclose;
  attribute EventHandler onerror;
  attribute EventHandler onversionchange;
};

dictionary IDBObjectStoreParameters {
  (DOMString or sequence<DOMString>)? keyPath = null;
  boolean autoIncrement = false;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>[Exposed=(Window,Worker)]
<span class="hljs-keyword">interface</span> <span class="hljs-title">IDBDatabase</span> : <span class="hljs-title">EventTarget</span> {
  <span class="hljs-keyword">readonly</span> attribute DOMString name;
  <span class="hljs-keyword">readonly</span> attribute unsigned <span class="hljs-keyword">long</span> <span class="hljs-keyword">long</span> version;
  <span class="hljs-keyword">readonly</span> attribute DOMStringList objectStoreNames;

  [NewObject] <span class="hljs-function">IDBTransaction <span class="hljs-title">transaction</span>(<span class="hljs-params">(DOMString or sequence&lt;DOMString&gt;</span>) storeNames,
                                         optional IDBTransactionMode mode </span>= <span class="hljs-string">"readonly"</span>);
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">close</span>(<span class="hljs-params"></span>)</span>;

  [NewObject] <span class="hljs-function">IDBObjectStore <span class="hljs-title">createObjectStore</span>(<span class="hljs-params">DOMString name,
                                               optional IDBObjectStoreParameters options</span>)</span>;
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">deleteObjectStore</span>(<span class="hljs-params">DOMString name</span>)</span>;

  <span class="hljs-comment">// Event handlers:</span>
  attribute EventHandler onabort;
  attribute EventHandler onclose;
  attribute EventHandler onerror;
  attribute EventHandler onversionchange;
};

dictionary IDBObjectStoreParameters {
  (DOMString or sequence&lt;DOMString&gt;)? keyPath = <span class="hljs-literal">null</span>;
  boolean autoIncrement = <span class="hljs-literal">false</span>;
};</code></pre>
<p>如果它通过 createObjectStore 方法，那么得到的就是一个 <code>IDBObjectStore</code> 实例对象。如果是 transaction 方法，那么就是 <code>IDBTransaction</code> 对象。</p>
<h3 id="articleHeader26">IDBObjectStore</h3>
<p>该对象一般是用来创建  index 和插入数据使用。</p>
<p>可以参考：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Exposed=(Window,Worker)]
interface IDBObjectStore {
  attribute DOMString name;
  readonly attribute any keyPath;
  readonly attribute DOMStringList indexNames;
  [SameObject] readonly attribute IDBTransaction transaction;
  readonly attribute boolean autoIncrement;

  [NewObject] IDBRequest put(any value, optional any key);
  [NewObject] IDBRequest add(any value, optional any key);
  [NewObject] IDBRequest delete(any query);
  [NewObject] IDBRequest clear();
  [NewObject] IDBRequest get(any query);
  [NewObject] IDBRequest getKey(any query);
  [NewObject] IDBRequest getAll(optional any query,
                                optional [EnforceRange] unsigned long count);
  [NewObject] IDBRequest getAllKeys(optional any query,
                                    optional [EnforceRange] unsigned long count);
  [NewObject] IDBRequest count(optional any query);

  [NewObject] IDBRequest openCursor(optional any query,
                                    optional IDBCursorDirection direction = &quot;next&quot;);
  [NewObject] IDBRequest openKeyCursor(optional any query,
                                       optional IDBCursorDirection direction = &quot;next&quot;);

  IDBIndex index(DOMString name);

  [NewObject] IDBIndex createIndex(DOMString name,
                                   (DOMString or sequence<DOMString>) keyPath,
                                   optional IDBIndexParameters options);
  void deleteIndex(DOMString name);
};

dictionary IDBIndexParameters {
  boolean unique = false;
  boolean multiEntry = false;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>[Exposed=(Window,Worker)]
<span class="hljs-keyword">interface</span> IDBObjectStore {
  attribute DOMString <span class="hljs-keyword">name</span>;
  readonly attribute <span class="hljs-built_in">any</span> keyPath;
  readonly attribute DOMStringList indexNames;
  [SameObject] readonly attribute IDBTransaction transaction;
  readonly attribute boolean autoIncrement;

  [NewObject] IDBRequest put(<span class="hljs-built_in">any</span> <span class="hljs-keyword">value</span>, <span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> key);
  [NewObject] IDBRequest add(<span class="hljs-built_in">any</span> <span class="hljs-keyword">value</span>, <span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> key);
  [NewObject] IDBRequest delete(<span class="hljs-built_in">any</span> query);
  [NewObject] IDBRequest clear();
  [NewObject] IDBRequest get(<span class="hljs-built_in">any</span> query);
  [NewObject] IDBRequest getKey(<span class="hljs-built_in">any</span> query);
  [NewObject] IDBRequest getAll(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                <span class="hljs-keyword">optional</span> [EnforceRange] unsigned long <span class="hljs-built_in">count</span>);
  [NewObject] IDBRequest getAllKeys(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                    <span class="hljs-keyword">optional</span> [EnforceRange] unsigned long <span class="hljs-built_in">count</span>);
  [NewObject] IDBRequest <span class="hljs-built_in">count</span>(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query);

  [NewObject] IDBRequest openCursor(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                    <span class="hljs-keyword">optional</span> IDBCursorDirection direction = <span class="hljs-string">"next"</span>);
  [NewObject] IDBRequest openKeyCursor(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                       <span class="hljs-keyword">optional</span> IDBCursorDirection direction = <span class="hljs-string">"next"</span>);

  IDBIndex <span class="hljs-built_in">index</span>(DOMString <span class="hljs-keyword">name</span>);

  [NewObject] IDBIndex createIndex(DOMString <span class="hljs-keyword">name</span>,
                                   (DOMString or <span class="hljs-keyword">sequence</span>&lt;DOMString&gt;) keyPath,
                                   <span class="hljs-keyword">optional</span> IDBIndexParameters options);
  void deleteIndex(DOMString <span class="hljs-keyword">name</span>);
};

dictionary IDBIndexParameters {
  boolean unique = false;
  boolean multiEntry = false;
};</code></pre>
<h3 id="articleHeader27">IDBIndex</h3>
<p>该对象是用来进行 Index 索引的操作对象，里面也会存在 <code>get</code> 和 <code>getAll</code> 等方法。详细内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Exposed=(Window,Worker)]
interface IDBIndex {
  attribute DOMString name;
  [SameObject] readonly attribute IDBObjectStore objectStore;
  readonly attribute any keyPath;
  readonly attribute boolean multiEntry;
  readonly attribute boolean unique;

  [NewObject] IDBRequest get(any query);
  [NewObject] IDBRequest getKey(any query);
  [NewObject] IDBRequest getAll(optional any query,
                                optional [EnforceRange] unsigned long count);
  [NewObject] IDBRequest getAllKeys(optional any query,
                                    optional [EnforceRange] unsigned long count);
  [NewObject] IDBRequest count(optional any query);

  [NewObject] IDBRequest openCursor(optional any query,
                                    optional IDBCursorDirection direction = &quot;next&quot;);
  [NewObject] IDBRequest openKeyCursor(optional any query,
                                       optional IDBCursorDirection direction = &quot;next&quot;);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>[Exposed=(Window,Worker)]
<span class="hljs-keyword">interface</span> IDBIndex {
  attribute DOMString <span class="hljs-keyword">name</span>;
  [SameObject] readonly attribute IDBObjectStore objectStore;
  readonly attribute <span class="hljs-built_in">any</span> keyPath;
  readonly attribute boolean multiEntry;
  readonly attribute boolean unique;

  [NewObject] IDBRequest get(<span class="hljs-built_in">any</span> query);
  [NewObject] IDBRequest getKey(<span class="hljs-built_in">any</span> query);
  [NewObject] IDBRequest getAll(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                <span class="hljs-keyword">optional</span> [EnforceRange] unsigned long <span class="hljs-built_in">count</span>);
  [NewObject] IDBRequest getAllKeys(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                    <span class="hljs-keyword">optional</span> [EnforceRange] unsigned long <span class="hljs-built_in">count</span>);
  [NewObject] IDBRequest <span class="hljs-built_in">count</span>(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query);

  [NewObject] IDBRequest openCursor(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                    <span class="hljs-keyword">optional</span> IDBCursorDirection direction = <span class="hljs-string">"next"</span>);
  [NewObject] IDBRequest openKeyCursor(<span class="hljs-keyword">optional</span> <span class="hljs-built_in">any</span> query,
                                       <span class="hljs-keyword">optional</span> IDBCursorDirection direction = <span class="hljs-string">"next"</span>);
};</code></pre>
<p>参考：</p>
<p><a href="https://github.com/jakearchibald/idb" rel="nofollow noreferrer" target="_blank">idb 开源库，微型代码库</a><br><a href="https://github.com/treojs/treo" rel="nofollow noreferrer" target="_blank">treo 开源库</a><br><a href="https://github.com/dfahlander/Dexie.js" rel="nofollow noreferrer" target="_blank">dexie.js 开源库</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB" rel="nofollow noreferrer" target="_blank">indexeddb</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB" rel="nofollow noreferrer" target="_blank">原生概念 IndexedDB</a></p>
<p>也欢迎大家关注我的公众号：前端小吉米  获得一手的技术文章以及未来技术的发展内容。</p>
<p><span class="img-wrap"><img data-src="/img/bVbaTtX?w=1280&amp;h=1280" src="https://static.alili.tech/img/bVbaTtX?w=1280&amp;h=1280" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
IndexedDB 打造靠谱 Web 离线数据库

## 原文链接
[https://segmentfault.com/a/1190000014950564](https://segmentfault.com/a/1190000014950564)

