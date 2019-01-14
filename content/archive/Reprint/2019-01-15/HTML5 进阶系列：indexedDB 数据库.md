---
title: 'HTML5 进阶系列：indexedDB 数据库' 
date: 2019-01-15 2:30:12
hidden: true
slug: 65fk89jl90u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在 HTML5 的本地存储中，有一种叫 indexedDB 的数据库，该数据库是一种存储在客户端本地的 NoSQL 数据库，它可以存储大量的数据。从上篇：<a href="https://github.com/lin-xin/blog/issues/11" rel="nofollow noreferrer" target="_blank">HTML5 进阶系列：web Storage</a> ，我们知道 web Storage 可以方便灵活的在本地存取简单数据，但是对于大量结构化存储，indexedDB 的优势就更加明显。接下来我们来看看 indexedDB 如何存储数据。</p>
<h2 id="articleHeader1">连接数据库</h2>
<p>一个网站可以有多个 indexedDB 数据库，但每个数据库的名称是唯一的。我们需要通过数据库名来连接某个具体的数据库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('dbName', 1);  // 打开 dbName 数据库
request.onerror = function(e){              // 监听连接数据库失败时执行
    console.log('连接数据库失败');
}
request.onsuccess = function(e){            // 监听连接数据库成功时执行
    console.log('连接数据库成功');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> request = indexedDB.open(<span class="hljs-string">'dbName'</span>, <span class="hljs-number">1</span>);  <span class="hljs-comment">// 打开 dbName 数据库</span>
request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{              <span class="hljs-comment">// 监听连接数据库失败时执行</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'连接数据库失败'</span>);
}
request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{            <span class="hljs-comment">// 监听连接数据库成功时执行</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'连接数据库成功'</span>);
}</code></pre>
<p>我们使用 indexedDB.open 方法来连接数据库，该方法接收两个参数，第一个是数据库名，第二个是数据库版本号。该方法会返回一个 IDBOpenDBRequest 对象，代表一个请求连接数据库的请求对象。我们可以通过监听请求对象的 onsuccess 和 onerror 事件来定义连接成功或失败需执行的方法。</p>
<p>因为 indexedDB API 中不允许数据库中的数据仓库在同一版本中发生变化，所以需要在 indexedDB.open 方法中传入新的版本号来更新版本，避免在同一版本中重复修改数据库。版本号必须为整数！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('dbName', 2);  // 更新版本，打开版本为2的数据库
// ...
request.onupgradeneeded = function(e){
    console.log('新数据库版本号为=' + e.newVersion);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> request = indexedDB.open(<span class="hljs-string">'dbName'</span>, <span class="hljs-number">2</span>);  <span class="hljs-comment">// 更新版本，打开版本为2的数据库</span>
<span class="hljs-comment">// ...</span>
request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'新数据库版本号为='</span> + e.newVersion);
}</code></pre>
<p>我们通过监听请求对象的 onupgradeneeded 事件来定义数据库版本更新时执行的方法。</p>
<h2 id="articleHeader2">关闭数据库</h2>
<p>使用 indexedDB.open 连接数据库成功后会返回一个 IDBOpenDBRequest 对象，我们可以调用该对象的 close 方法来关闭数据库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('dbName', 2);
// ...
request.onsuccess = function(e){
    console.log('连接数据库成功');
    var db = e.target.result;
    db.close();
    console.log('数据库已关闭');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> request = indexedDB.open(<span class="hljs-string">'dbName'</span>, <span class="hljs-number">2</span>);
<span class="hljs-comment">// ...</span>
request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'连接数据库成功'</span>);
    <span class="hljs-keyword">var</span> db = e.target.result;
    db.close();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'数据库已关闭'</span>);
}</code></pre>
<h2 id="articleHeader3">删除数据库</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
indexedDB.deleteDatabase('dbName');
console.log('数据库已删除');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
indexedDB.deleteDatabase(<span class="hljs-string">'dbName'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'数据库已删除'</span>);</code></pre>
<h2 id="articleHeader4">创建对象仓库</h2>
<p>object store（对象仓库）是 indexedDB 数据库的基础，在indexedDB 中并没有数据库表，而对象仓库，就是相当于一个数据库表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('dbName', 3);
// ...
request.onupgradeneeded = function(e){
    var db = e.target.result;
    var store = db.createObjectStore('Users', {keyPath: 'userId', autoIncrement: false});
    console.log('创建对象仓库成功');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> request = indexedDB.open(<span class="hljs-string">'dbName'</span>, <span class="hljs-number">3</span>);
<span class="hljs-comment">// ...</span>
request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">var</span> db = e.target.result;
    <span class="hljs-keyword">var</span> store = db.createObjectStore(<span class="hljs-string">'Users'</span>, {<span class="hljs-attr">keyPath</span>: <span class="hljs-string">'userId'</span>, <span class="hljs-attr">autoIncrement</span>: <span class="hljs-literal">false</span>});
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'创建对象仓库成功'</span>);
}</code></pre>
<p>db.createObjectStore 方法接收两个参数，第一个为对象仓库名，第二个参数为可选参数，值为一个js对象。该对象中的 keyPath 属性为主键，相当于数据库表中 id 为主键。autoIncrement 属性为 false，则表示主键值不自增，添加数据时需指定主键值。</p>
<p>注意：在数据库中，对象仓库名不可重复，否则浏览器会报错。</p>
<h2 id="articleHeader5">创建索引</h2>
<p>indexedDB 数据库中通过数据对象的某个属性来创建索引，在数据库中进行检索时，只能通过被设为索引的属性进行检索。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('dbName', 4);
// ...
request.onupgradeneeded = function(e){
    var db = e.target.result;
    var store = db.createObjectStore('newUsers', {keyPath: 'userId', autoIncrement: false});
    var idx = store.createIndex('usernameIndex','userName',{unique: false})
    console.log('创建索引成功');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> request = indexedDB.open(<span class="hljs-string">'dbName'</span>, <span class="hljs-number">4</span>);
<span class="hljs-comment">// ...</span>
request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">var</span> db = e.target.result;
    <span class="hljs-keyword">var</span> store = db.createObjectStore(<span class="hljs-string">'newUsers'</span>, {<span class="hljs-attr">keyPath</span>: <span class="hljs-string">'userId'</span>, <span class="hljs-attr">autoIncrement</span>: <span class="hljs-literal">false</span>});
    <span class="hljs-keyword">var</span> idx = store.createIndex(<span class="hljs-string">'usernameIndex'</span>,<span class="hljs-string">'userName'</span>,{<span class="hljs-attr">unique</span>: <span class="hljs-literal">false</span>})
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'创建索引成功'</span>);
}</code></pre>
<p>store.createIndex 方法接收三个参数，第一个为索引名，第二个为数据对象的属性，上例中使用 userName 属性来创建索引，第三个参数为可选参数，值为一个js对象。该对象中的 unique 属性为 true，代表索引值不可以相同，即两条数据的 userName 不可以相同，为 false 则可以相同。</p>
<h2 id="articleHeader6">基于事务</h2>
<p>在 indexedDB 中，所有数据操作都只能在事务中执行。连接数据库成功后，可以使用 IDBOpenDBRequest 对象的 transaction 方法开启只读事务或读写事务。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('dbName', 5);
// ...
request.onupgradeneeded = function(e){
    var db = e.target.result;
    var tx = db.transaction('Users','readonly');
    tx.oncomplete = function(e){
        console.log('事务结束了');
    }
    tx.onabort = function(e){
        console.log('事务被中止了');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> request = indexedDB.open(<span class="hljs-string">'dbName'</span>, <span class="hljs-number">5</span>);
<span class="hljs-comment">// ...</span>
request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">var</span> db = e.target.result;
    <span class="hljs-keyword">var</span> tx = db.transaction(<span class="hljs-string">'Users'</span>,<span class="hljs-string">'readonly'</span>);
    tx.oncomplete = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'事务结束了'</span>);
    }
    tx.onabort = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'事务被中止了'</span>);
    }
}</code></pre>
<p>db.transaction 方法接收两个参数，第一个参数可以是字符串或数组，字符串时则是一个对象仓库名，数组时则是由对象仓库名组成的数组，transaction 可以对参数中任何一个对象仓库进行操作。第二个参数为事务模式，传入 readonly 时只能对对象仓库进行读操作，无法写操作。可以传入 readwrite 进行读写操作。</p>
<h2 id="articleHeader7">操作数据</h2>
<ul>
<li><p>add() : 增加数据。接收一个参数，为需要保存到对象仓库中的对象。</p></li>
<li><p>put() : 增加或修改数据。接收一个参数，为需要保存到对象仓库中的对象。</p></li>
<li><p>get() : 获取数据。接收一个参数，为需要获取数据的主键值。</p></li>
<li><p>delete() : 删除数据。接收一个参数，为需要获取数据的主键值。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('dbName', 5);
// ...
request.onsuccess = function(e){
    var db = e.target.result;
    var tx = db.transaction('Users','readwrite');
    var store = tx.objectStore('Users');
    var value = {
        'userId': 1,
        'userName': 'linxin',
        'age': 24
    }
    var req1 = store.put(value);        // 保存数据
    var req2 = store.get(1);            // 获取索引userId为1的数据
    req2.onsuccess = function(){
        console.log(this.result.userName);    // linxin
    }
    var req3 = store.delete(1);             // 删除索引为1的数据
    req3.onsuccess = function(){
        console.log('删除数据成功');        // 删除数据成功
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> request = indexedDB.open(<span class="hljs-string">'dbName'</span>, <span class="hljs-number">5</span>);
<span class="hljs-comment">// ...</span>
request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">var</span> db = e.target.result;
    <span class="hljs-keyword">var</span> tx = db.transaction(<span class="hljs-string">'Users'</span>,<span class="hljs-string">'readwrite'</span>);
    <span class="hljs-keyword">var</span> store = tx.objectStore(<span class="hljs-string">'Users'</span>);
    <span class="hljs-keyword">var</span> value = {
        <span class="hljs-string">'userId'</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">'userName'</span>: <span class="hljs-string">'linxin'</span>,
        <span class="hljs-string">'age'</span>: <span class="hljs-number">24</span>
    }
    <span class="hljs-keyword">var</span> req1 = store.put(value);        <span class="hljs-comment">// 保存数据</span>
    <span class="hljs-keyword">var</span> req2 = store.get(<span class="hljs-number">1</span>);            <span class="hljs-comment">// 获取索引userId为1的数据</span>
    req2.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.result.userName);    <span class="hljs-comment">// linxin</span>
    }
    <span class="hljs-keyword">var</span> req3 = store.delete(<span class="hljs-number">1</span>);             <span class="hljs-comment">// 删除索引为1的数据</span>
    req3.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'删除数据成功'</span>);        <span class="hljs-comment">// 删除数据成功</span>
    }
}</code></pre>
<p>add 和 put 的作用类似，区别在于 put 保存数据时，如果该数据的主键在数据库中已经有相同主键的时候，则会修改数据库中对应主键的对象，而使用 add 保存数据，如果该主键已经存在，则保存失败。</p>
<h2 id="articleHeader8">检索数据</h2>
<p>上面我们知道使用 get() 方法可以获取数据，但是需要制定主键值。如果我们想要获取一个区间的数据，可以使用游标。游标通过对象仓库的 openCursor 方法创建并打开。</p>
<p>openCursor 方法接收两个参数，第一个是 IDBKeyRange 对象，该对象创建方法主要有以下几种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// boundRange 表示主键值从1到10(包含1和10)的集合。
// 如果第三个参数为true，则表示不包含最小键值1，如果第四参数为true，则表示不包含最大键值10，默认都为false
var boundRange = IDBKeyRange.bound(1, 10, false, false);

// onlyRange 表示由一个主键值的集合。only() 参数则为主键值，整数类型。
var onlyRange = IDBKeyRange.only(1);

// lowerRaneg 表示大于等于1的主键值的集合。
// 第二个参数可选，为true则表示不包含最小主键1，false则包含，默认为false
var lowerRange = IDBKeyRange.lowerBound(1, false);

// upperRange 表示小于等于10的主键值的集合。
// 第二个参数可选，为true则表示不包含最大主键10，false则包含，默认为false
var upperRange = IDBKeyRange.upperBound(10, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// boundRange 表示主键值从1到10(包含1和10)的集合。</span>
<span class="hljs-comment">// 如果第三个参数为true，则表示不包含最小键值1，如果第四参数为true，则表示不包含最大键值10，默认都为false</span>
<span class="hljs-keyword">var</span> boundRange = IDBKeyRange.bound(<span class="hljs-number">1</span>, <span class="hljs-number">10</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>);

<span class="hljs-comment">// onlyRange 表示由一个主键值的集合。only() 参数则为主键值，整数类型。</span>
<span class="hljs-keyword">var</span> onlyRange = IDBKeyRange.only(<span class="hljs-number">1</span>);

<span class="hljs-comment">// lowerRaneg 表示大于等于1的主键值的集合。</span>
<span class="hljs-comment">// 第二个参数可选，为true则表示不包含最小主键1，false则包含，默认为false</span>
<span class="hljs-keyword">var</span> lowerRange = IDBKeyRange.lowerBound(<span class="hljs-number">1</span>, <span class="hljs-literal">false</span>);

<span class="hljs-comment">// upperRange 表示小于等于10的主键值的集合。</span>
<span class="hljs-comment">// 第二个参数可选，为true则表示不包含最大主键10，false则包含，默认为false</span>
<span class="hljs-keyword">var</span> upperRange = IDBKeyRange.upperBound(<span class="hljs-number">10</span>, <span class="hljs-literal">false</span>);</code></pre>
<p>openCursor 方法的第二个参数表示游标的读取方向，主要有以下几种：</p>
<ul>
<li><p>next : 游标中的数据按主键值升序排列，主键值相等的数据都被读取</p></li>
<li><p>nextunique : 游标中的数据按主键值升序排列，主键值相等只读取第一条数据</p></li>
<li><p>prev : 游标中的数据按主键值降序排列，主键值相等的数据都被读取</p></li>
<li><p>prevunique : 游标中的数据按主键值降序排列，主键值相等只读取第一条数据</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = indexedDB.open('dbName', 6);
// ...
request.onsuccess = function(e){
    var db = e.target.result;
    var tx = db.transaction('Users','readwrite');
    var store = tx.objectStore('Users');
    var range = IDBKeyRange.bound(1,10);
    var req = store.openCursor(range, 'next');
    req.onsuccess = function(){
        var cursor = this.result;
        if(cursor){
            console.log(cursor.value.userName);
            cursor.continue();
        }else{
            console.log('检索结束');
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> request = indexedDB.open(<span class="hljs-string">'dbName'</span>, <span class="hljs-number">6</span>);
<span class="hljs-comment">// ...</span>
request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">var</span> db = e.target.result;
    <span class="hljs-keyword">var</span> tx = db.transaction(<span class="hljs-string">'Users'</span>,<span class="hljs-string">'readwrite'</span>);
    <span class="hljs-keyword">var</span> store = tx.objectStore(<span class="hljs-string">'Users'</span>);
    <span class="hljs-keyword">var</span> range = IDBKeyRange.bound(<span class="hljs-number">1</span>,<span class="hljs-number">10</span>);
    <span class="hljs-keyword">var</span> req = store.openCursor(range, <span class="hljs-string">'next'</span>);
    req.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> cursor = <span class="hljs-keyword">this</span>.result;
        <span class="hljs-keyword">if</span>(cursor){
            <span class="hljs-built_in">console</span>.log(cursor.value.userName);
            cursor.continue();
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'检索结束'</span>);
        }
    }
}</code></pre>
<p>当存在符合检索条件的数据时，可以通过 update 方法更新该数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cursor.updata({
    userId : cursor.key,
    userName : 'Hello',
    age : 18
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">cursor.updata({
    <span class="hljs-attr">userId</span> : cursor.key,
    <span class="hljs-attr">userName</span> : <span class="hljs-string">'Hello'</span>,
    <span class="hljs-attr">age</span> : <span class="hljs-number">18</span>
});</code></pre>
<p>可以通过 delete 方法删除该数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cursor.delete();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">cursor.delete();</code></pre>
<p>可以通过 continue 方法继续读取下一条数据，否则读到第一条数据之后不再继续读取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cursor.continue();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">cursor.continue();</code></pre>
<h2 id="articleHeader9">总结</h2>
<p>从连接数据库，创建对象仓库、索引，到操作、检索数据，完成了 indexedDB 存取数据的完整流程。下面通过一个完整的例子来更好地掌握 indexedDB 数据库。代码地址：<a href="https://github.com/lin-xin/blog/tree/master/indexedDB-demo" rel="nofollow noreferrer" target="_blank">indexedDB-demo</a></p>
<h3 id="articleHeader10">更多文章：<a href="https://github.com/lin-xin/blog/" rel="nofollow noreferrer" target="_blank">lin-xin/blog</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5 进阶系列：indexedDB 数据库

## 原文链接
[https://segmentfault.com/a/1190000009213940](https://segmentfault.com/a/1190000009213940)

