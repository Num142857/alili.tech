---
title: 'IndexedDB使用与出坑指南' 
date: 2019-02-03 2:30:40
hidden: true
slug: nnpmjlot58j
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">概述</h1>
<p>本文通过对<code>IndexedDB</code>的使用方法和使用场景进行相关介绍，对常见的问题进行解答。</p>
<p>同时，因为MDN中的相关文档缺乏相关逻辑性，所以不容易理解。本文将通过项目中常见的数据存储和操作需求来进行内容组织。</p>
<p>读者能够通过本文学会在项目中正确的使用<code>IndexedDB</code>，给应用带来的本地存储能力，并且避免一些常见的问题。</p>
<h1 id="articleHeader1">原因：开发者需要在本地进行永久存储</h1>
<p>当我们进行一些较大的SPA页面开发时，我们会需要进行一些数据的本地存储。</p>
<p>当数据量不大时，我们可以通过SessionStorage或者LocalStorage来进行存储，但是当数据量较大，或符合一定的规范时，我们可以使用数据库来进行数据的存储。</p>
<p>在浏览器提供的数据库中，共有<code>web sql</code>和<code>IndexedDB</code>两种。相较于HTML5已经废弃的<code>web sql</code>来说，更推荐大家使用<code>IndexedDB</code>。</p>
<h1 id="articleHeader2">结构</h1>
<p>下面，我们通过一张图来了解下，IndexedDB整体的结构。</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bV4R5H" src="https://static.alili.techhttps://segmentfault.com/img/bV4R5H" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>类比<code>sql</code>型数据库，<code>IndexedDB</code>中的DB（数据库）就是<code>sql</code>中的DB，而<code>Object Store(存储空间)</code>则是<code>数据表</code>,<code>Item</code>则等于表中的一条<code>记录</code>。</p>
<h1 id="articleHeader3">使用IndexedDB</h1>
<p>现在，我们将其根据<code>IndexedDB</code>的结构来对其操作进行介绍，能让大家对这个存储空间有一个初步的了解。我们主要介绍：</p>
<ul>
<li>数据库操作</li>
<li>数据表操作</li>
<li>数据操作</li>
</ul>
<h2 id="articleHeader4">数据库操作</h2>
<h3 id="articleHeader5">创建或打开数据库</h3>
<p>使用<code>IndexedDB</code>第一步，就是创建或打开一个数据库。我们使用<code>window.indexedDB.open(DBName)</code>这个API来打进行操作。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = window.indexedDB.open('test');

request.onupgradeneeded = function (event) {
    
}

request.onsuccess = function(event) {
    //request === event.target;
}
request.onerror = function(event) {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">'test'</span>);

request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    
}

request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-comment">//request === event.target;</span>
}
request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{}</code></pre>
<p>调用此接口时，如果当前数据库不存在，则会创建一个新的数据库。</p>
<p>当数据库建立连接时，会返回一个<code>IDBOpenDBRequest</code>对象。</p>
<p>在连接建立成功时，会触发<code>onsuccess</code>事件，其中函数参数<code>event</code>的<code>target</code>属性就是<code>request</code>对象。</p>
<p>而在数据库创建或者版本更新时，会触发<code>onupgradeneeded</code>事件。</p>
<h3 id="articleHeader6">更新数据库版本号</h3>
<p><code>window.indexedDB.open</code>的第二个参数即为版本号。在不指定的情况下，默认版本号为1。具体示例如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const request = window.indexedDB.open('test', 2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> request = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">'test'</span>, <span class="hljs-number">2</span>);</code></pre>
<p>在需要更新数据库的<code>schema(模式)</code>时，需要更新版本号。此时我们指定一个高于之前版本的版本号，就会触发<code>onupgradeneeded</code>事件。类似的，当此数据库不存在时，也会触发此事件并且将版本更新到置顶版本。</p>
<p>我们需要注意的是，版本号是一个<code>Unsigned long long</code>数字，这意味着它可以是一个非常大的整数。但是，它不能是一个小数，否则它将会被转为最近的整数，同时有可能导致<code>onUpgradeneeded</code>事件不触发(bug)。</p>
<h2 id="articleHeader7">存储空间操作</h2>
<h3 id="articleHeader8">创建存储空间</h3>
<p>我们使用<code>createObjectStore</code>来创建一个存储空间。同时，使用<code>createIndex</code>来创建它的索引。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = window.indexedDB.open('test', 1);

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore('table1', {keyPath: 'id', autoIncrement: true});

    objectStore.createIndex('name', 'name', {unique: false});
}

request.onerror = function (event) {
    alert(&quot;Why didn't you allow my web app to use IndexedDB?!&quot;);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">'test'</span>, <span class="hljs-number">1</span>);

request.onupgradeneeded = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> db = event.target.result;
    <span class="hljs-keyword">var</span> objectStore = db.createObjectStore(<span class="hljs-string">'table1'</span>, {<span class="hljs-attr">keyPath</span>: <span class="hljs-string">'id'</span>, <span class="hljs-attr">autoIncrement</span>: <span class="hljs-literal">true</span>});

    objectStore.createIndex(<span class="hljs-string">'name'</span>, <span class="hljs-string">'name'</span>, {<span class="hljs-attr">unique</span>: <span class="hljs-literal">false</span>});
}

request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    alert(<span class="hljs-string">"Why didn't you allow my web app to use IndexedDB?!"</span>);
};</code></pre>
<p><strong>注：只能在<code>onupgradeneeded</code>回调函数中创建存储空间，而不能在数据库打开后的<code>success</code>回调函数中创建。</strong></p>
<p>通过<code>createObjectStore</code>能够创建一个存储空间。接受两个参数：</p>
<ol>
<li>第一个参数，存储空间的名称，即我们上面的<code>customers</code>。</li>
<li>第二个参数，指定存储的<code>keyPath</code>值为存储对象的某个属性，这个属性能够在获取存储空间数据的时候当做key值使用。<code>autoIncrement</code>指定了<code>key</code>值是否自增（当key值为默认的从1开始到2^53的整数时）。</li>
</ol>
<p>而<code>createIndex</code>能够给当前的存储空间设置一个索引。它接受三个参数：</p>
<ol>
<li>第一个参数，索引的名称。</li>
<li>第二个参数，指定根据存储数据的哪一个属性来构建索引。</li>
<li>第三个属性， options对象，其中属性<code>unique</code>的值为<code>true</code>表示不允许索引值相等。</li>
</ol>
<h2 id="articleHeader9">数据操作</h2>
<h3 id="articleHeader10">事务</h3>
<p>在<code>IndexedDB</code>中，我们也能够使用事务来进行数据库的操作。事务有三个模式（常量已经弃用）：</p>
<ul>
<li>
<code>readOnly</code>，只读。</li>
<li>
<code>readwrite</code>，读写。</li>
<li>
<code>versionchange</code>，数据库版本变化。</li>
</ul>
<p>我们创建一个事务时，需要从上面选择一种模式，如果不指定的话，则默认为只读模式。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const transaction = db.transaction(['customers'], 'readwrite');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> transaction = db.transaction([<span class="hljs-string">'customers'</span>], <span class="hljs-string">'readwrite'</span>);</code></pre>
<p>事务函数<code>transaction</code>的第一个参数为需要关联的存储空间，第二个可选参数为事务模式。与上面类似，事务成功时也会触发<code>onsuccess</code>函数，失败时触发<code>onerror</code>函数。</p>
<p>事务的操作都是原子性的。</p>
<h3 id="articleHeader11">增加数据</h3>
<p>当存储空间初始化完成后，我们可以把数据放入存储空间中。直接调用<code>add</code>方法就可以将数据放入存储空间内，具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = window.indexedDB.open('test', 1);

request.onsuccess = function (event) {
    var db = event.target.result;

    var transaction = db.transaction(['table1'], 'readwrite');

    var objectStore = transaction.objectStore('table1');

    var index = objectStore.index('name');

    objectStore.add({name: 'a', age: 10});
    objectStore.add({name: 'b', age: 20});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">'test'</span>, <span class="hljs-number">1</span>);

request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> db = event.target.result;

    <span class="hljs-keyword">var</span> transaction = db.transaction([<span class="hljs-string">'table1'</span>], <span class="hljs-string">'readwrite'</span>);

    <span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">'table1'</span>);

    <span class="hljs-keyword">var</span> index = objectStore.index(<span class="hljs-string">'name'</span>);

    objectStore.add({<span class="hljs-attr">name</span>: <span class="hljs-string">'a'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">10</span>});
    objectStore.add({<span class="hljs-attr">name</span>: <span class="hljs-string">'b'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">20</span>});
}</code></pre>
<p>注：<code>add</code>方法中的第二个参数key值是指定存储空间中的<code>keyPath</code>值，如果<code>data</code>中包含<code>keyPath</code>值或者此值为自增值，那么可以略去此参数。</p>
<h3 id="articleHeader12">查找数据</h3>
<h4>通过特定值获取数据</h4>
<p>当我们需要从存储空间获取数据时，我们可以通过以下的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = window.indexedDB.open('test', 1);

request.onsuccess = function (event) {
    var db = event.target.result;

    var transaction = db.transaction(['table1'], 'readwrite');

    var objectStore = transaction.objectStore('table1');

    var request = objectStore.get(1);

    request.onsuccess = function (event) {
        // 对 request.result 做些操作！
        console.log(request.result);
    };

    request.onerror = function (event) {
        // 错误处理!
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">'test'</span>, <span class="hljs-number">1</span>);

request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> db = event.target.result;

    <span class="hljs-keyword">var</span> transaction = db.transaction([<span class="hljs-string">'table1'</span>], <span class="hljs-string">'readwrite'</span>);

    <span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">'table1'</span>);

    <span class="hljs-keyword">var</span> request = objectStore.get(<span class="hljs-number">1</span>);

    request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-comment">// 对 request.result 做些操作！</span>
        <span class="hljs-built_in">console</span>.log(request.result);
    };

    request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-comment">// 错误处理!</span>
    };
}</code></pre>
<h4>通过游标获取数据</h4>
<p>当你需要便利整个存储空间中的数据时，你就需要使用到游标。游标使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = window.indexedDB.open('test', 1);

request.onsuccess = function (event) {
    var db = event.target.result;

    var transaction = db.transaction(['table1'], 'readwrite');

    var objectStore = transaction.objectStore('table1');

    var request = objectStore.openCursor();

    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            // 使用Object.assign方法是为了避免控制台打印时出错
            console.log(Object.assign(cursor.value));
            cursor.continue();
        }
    };

    request.onerror = function (event) {
        // 错误处理!
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">'test'</span>, <span class="hljs-number">1</span>);

request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> db = event.target.result;

    <span class="hljs-keyword">var</span> transaction = db.transaction([<span class="hljs-string">'table1'</span>], <span class="hljs-string">'readwrite'</span>);

    <span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">'table1'</span>);

    <span class="hljs-keyword">var</span> request = objectStore.openCursor();

    request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">var</span> cursor = event.target.result;
        <span class="hljs-keyword">if</span> (cursor) {
            <span class="hljs-comment">// 使用Object.assign方法是为了避免控制台打印时出错</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.assign(cursor.value));
            cursor.continue();
        }
    };

    request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-comment">// 错误处理!</span>
    };
}</code></pre>
<p>使用游标时有一个需要注意的地方，当游标便利整个存储空间但是并未找到给定条件的值时，仍然会触发<code>onsuccess</code>函数。</p>
<p><code>openCursor</code>和<code>openKeyCursor</code>有两个参数：</p>
<ol>
<li>
<p>第一个参数，遍历范围，指定游标的访问范围。该范围通过一个<code>IDBKeyRange</code>参数的方法来获取。</p>
<p>遍历范围参数具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 匹配值 key === 1
const singleKeyRange = IDBKeyRange.only(1);

// 匹配值 key >= 1
const lowerBoundKeyRange = IDBKeyRange.lowerBound(1);

// 匹配值 key > 1
const lowerBoundOpenKeyRange = IDBKeyRange.lowerBound(1, true);

// 匹配值 key < 2
const upperBoundOpenKeyRange = IDBKeyRange.upperBound(2, true);

// 匹配值 key >= 1 &amp;&amp; key < 2
const boundKeyRange = IDBKeyRange.bound(1, 2, false, true);

index.openCursor(boundKeyRange).onsuccess = function(event) {
  const cursor = event.target.result;
  if (cursor) {
    // Do something with the matches.
    cursor.continue();
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 匹配值 key === 1</span>
<span class="hljs-keyword">const</span> singleKeyRange = IDBKeyRange.only(<span class="hljs-number">1</span>);

<span class="hljs-comment">// 匹配值 key &gt;= 1</span>
<span class="hljs-keyword">const</span> lowerBoundKeyRange = IDBKeyRange.lowerBound(<span class="hljs-number">1</span>);

<span class="hljs-comment">// 匹配值 key &gt; 1</span>
<span class="hljs-keyword">const</span> lowerBoundOpenKeyRange = IDBKeyRange.lowerBound(<span class="hljs-number">1</span>, <span class="hljs-literal">true</span>);

<span class="hljs-comment">// 匹配值 key &lt; 2</span>
<span class="hljs-keyword">const</span> upperBoundOpenKeyRange = IDBKeyRange.upperBound(<span class="hljs-number">2</span>, <span class="hljs-literal">true</span>);

<span class="hljs-comment">// 匹配值 key &gt;= 1 &amp;&amp; key &lt; 2</span>
<span class="hljs-keyword">const</span> boundKeyRange = IDBKeyRange.bound(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>);

index.openCursor(boundKeyRange).onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">const</span> cursor = event.target.result;
  <span class="hljs-keyword">if</span> (cursor) {
    <span class="hljs-comment">// Do something with the matches.</span>
    cursor.continue();
  }
};</code></pre>
<p>​</p>
</li>
<li>
<p>第二个参数，便利顺序，指定游标便利时的顺序和处理相同id（keyPath属性指定字段）重复时的处理方法。改范围通过特定的字符串（<code>IDBCursor</code>的常量已经弃用）来获取。其中：</p>
<ul>
<li>
<code>next</code>，从前往后获取所有数据（包括重复数据）</li>
<li>
<code>prev</code>，从后往前获取所有数据（包括重复数据）</li>
<li>
<code>nextunique</code>，从前往后获取数据（重复数据只取第一条，索引重复即认为重复，下同）</li>
<li>
<code>prevunique</code>，从后往前获取数据（重复数据只取第一条）</li>
</ul>
</li>
</ol>
<p>遍历顺序参数具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = window.indexedDB.open('test', 1);

request.onsuccess = function (event) {
    var db = event.target.result;

    var transaction = db.transaction(['table1'], 'readwrite');

    var objectStore = transaction.objectStore('table1');

    var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound(1, false);
    var request = objectStore.openCursor(lowerBoundOpenKeyRange, IDBCursor.PREV);

    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            // 使用Object.assign方法是为了避免控制台打印时出错
            console.log(Object.assign(cursor.value));
            cursor.continue();
        }
    };

    request.onerror = function (event) {
        // 错误处理!
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">'test'</span>, <span class="hljs-number">1</span>);

request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> db = event.target.result;

    <span class="hljs-keyword">var</span> transaction = db.transaction([<span class="hljs-string">'table1'</span>], <span class="hljs-string">'readwrite'</span>);

    <span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">'table1'</span>);

    <span class="hljs-keyword">var</span> lowerBoundOpenKeyRange = IDBKeyRange.lowerBound(<span class="hljs-number">1</span>, <span class="hljs-literal">false</span>);
    <span class="hljs-keyword">var</span> request = objectStore.openCursor(lowerBoundOpenKeyRange, IDBCursor.PREV);

    request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">var</span> cursor = event.target.result;
        <span class="hljs-keyword">if</span> (cursor) {
            <span class="hljs-comment">// 使用Object.assign方法是为了避免控制台打印时出错</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.assign(cursor.value));
            cursor.continue();
        }
    };

    request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-comment">// 错误处理!</span>
    };
}</code></pre>
<h4>使用索引</h4>
<p>在前面构建数据库时，我们创建了两个索引。现在我们也可以通过索引来进行数据检索。他的本质还是通过之前获取数据的API来进行，只是将原来使用的<code>keyPath</code>属性转换成为了索引指定的属性。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var request = window.indexedDB.open('test', 1);

request.onsuccess = function (event) {
    var db = event.target.result;

    var transaction = db.transaction(['table1'], 'readwrite');

    var objectStore = transaction.objectStore('table1');

    var index = objectStore.index('name');

    // 第一种，get方法
    index.get('a').onsuccess = function (event) {
        console.log(event.target.result);
    }

    // 第二种，普通游标方法
    index.openCursor().onsuccess = function (event) {
        console.log('openCursor:', event.target.result.value);
    }

    // 第三种，键游标方法，该方法与第二种的差别为：普通游标带有value值表示获取的数据，而键游标没有
    index.openKeyCursor().onsuccess = function (event) {
        console.log('openKeyCursor:', event.target.result);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> request = <span class="hljs-built_in">window</span>.indexedDB.open(<span class="hljs-string">'test'</span>, <span class="hljs-number">1</span>);

request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> db = event.target.result;

    <span class="hljs-keyword">var</span> transaction = db.transaction([<span class="hljs-string">'table1'</span>], <span class="hljs-string">'readwrite'</span>);

    <span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">'table1'</span>);

    <span class="hljs-keyword">var</span> index = objectStore.index(<span class="hljs-string">'name'</span>);

    <span class="hljs-comment">// 第一种，get方法</span>
    index.get(<span class="hljs-string">'a'</span>).onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-built_in">console</span>.log(event.target.result);
    }

    <span class="hljs-comment">// 第二种，普通游标方法</span>
    index.openCursor().onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'openCursor:'</span>, event.target.result.value);
    }

    <span class="hljs-comment">// 第三种，键游标方法，该方法与第二种的差别为：普通游标带有value值表示获取的数据，而键游标没有</span>
    index.openKeyCursor().onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'openKeyCursor:'</span>, event.target.result);
    }
}</code></pre>
<h3 id="articleHeader13">修改数据</h3>
<p>当需要修改存储空间中的数据时，我们可以使用以下的API：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objectStore = transaction.objectStore(&quot;customers&quot;);

var request = objectStore.put(data);

request.onsuccess = function (event) {
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">"customers"</span>);

<span class="hljs-keyword">var</span> request = objectStore.put(data);

request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    
}</code></pre>
<p>注：<code>put</code>方法不仅能够修改现有数据，也能够往存储空间中增加新的数据。</p>
<h3 id="articleHeader14">删除数据</h3>
<p>当我们需要删除已经无用的数据时，我们可以通过以下方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var objectStore = transaction.objectStore(&quot;customers&quot;);

var request = objectStore.delete(name);

request.onsuccess = function (event) {
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> objectStore = transaction.objectStore(<span class="hljs-string">"customers"</span>);

<span class="hljs-keyword">var</span> request = objectStore.delete(name);

request.onsuccess = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    
}</code></pre>
<h2 id="articleHeader15">异常处理</h2>
<p>在浏览器有如下操作的情况下，indexedDB可能会出现异常：</p>
<ul>
<li>用户清除浏览器缓存</li>
<li>存储空间超过大小限制</li>
</ul>
<p>此时，需要对错误进行捕获，并且对用户进行提示。此章节不是本文重点，再此略过。</p>
<h1 id="articleHeader16">扩展须知</h1>
<h2 id="articleHeader17">取值相关</h2>
<h3 id="articleHeader18">key值能够接受的数据类型</h3>
<p>在<code>IndexedDB</code>中，键值对中的<code>key</code>值可以接受以下几种类型的值：</p>
<ul>
<li>number</li>
<li>data</li>
<li>string</li>
<li>binary</li>
<li>array</li>
</ul>
<p>具体说明可以见文档<a href="https://w3c.github.io/IndexedDB/#key-construct" rel="nofollow noreferrer" target="_blank">此处</a>。</p>
<h3 id="articleHeader19">key path能够接受的数据类型</h3>
<p>当一个<code>key</code>值变为主键，即<code>keyPath</code>时，它的值就只能是以下几种：</p>
<ul>
<li>Blob</li>
<li>File</li>
<li>Array</li>
<li>String</li>
</ul>
<p><strong>注：空格不能出现在key path中</strong>。</p>
<p>具体说明可以见文档<a href="https://w3c.github.io/IndexedDB/#key-path-construct" rel="nofollow noreferrer" target="_blank">此处</a>。</p>
<h3 id="articleHeader20">value能够接受的数据类型</h3>
<p>在<code>IndexedDB</code>中，value能够接受ECMA-262中所有的类型的值，例如String，Date，ImageDate等。</p>
<h2 id="articleHeader21">事务相关</h2>
<h3 id="articleHeader22">事务中断后，会不会影响key值的自增</h3>
<p><code>IndexedDB</code>在没有指定key值的时候就会采用自增的key值。如果一个事务在中途中断，那么key值的自增将会从中断的事务开始前的key开始。</p>
<h2 id="articleHeader23">安全相关</h2>
<p><code>IndexedDB</code>也受到浏览器<a href="https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy" rel="nofollow noreferrer" target="_blank">同源策略</a>的限制。</p>
<h2 id="articleHeader24">用户相关</h2>
<h3 id="articleHeader25">清空缓存</h3>
<p>用户在清除浏览器缓存时，可能会清除<code>IndexedDB</code>中相关的数据。</p>
<h3 id="articleHeader26">访问权限</h3>
<p>部分浏览器如Safari手机版隐私模式在访问<code>IndexedDB</code>时，可能会出现由于没有权限而导致的异常（LocalStorage也会），需要进行异常处理。</p>
<h1 id="articleHeader27">总结</h1>
<p><code>IndexedDB</code>在本地存储中有着无可替代的作用，是替代关系型数据库<code>web sql</code>的产品，能够对大量数据进行存储。在许多需要运用离线存储的场景下，它能够给我们提供有效的支撑。</p>
<p>但是，<code>IndexedDB</code>在使用过程中仍然需要避免可能会出现的一些问题，或者对可能导致的不利影响有一定的容错处理。这样才不会对应用产生重大影响。</p>
<h1 id="articleHeader28">参考文献</h1>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy" rel="nofollow noreferrer" target="_blank">浏览器的同源策略</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB" rel="nofollow noreferrer" target="_blank">使用indexedDB MDN入门</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API" rel="nofollow noreferrer" target="_blank">IndexedDB API参考</a></li>
<li><a href="https://w3c.github.io/IndexedDB/" rel="nofollow noreferrer" target="_blank">W3C IndexedDB 2.0规范</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
IndexedDB使用与出坑指南

## 原文链接
[https://segmentfault.com/a/1190000006924681](https://segmentfault.com/a/1190000006924681)

