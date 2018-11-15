---
title: 使用Node，Vue和ElasticSearch构建实时搜索引擎
hidden: true
categories: reprint
slug: 670f1fcf
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>（相关阅读：
<a href="https://nodejs.org/en/about/">node.js</a>,
<a href="https://cn.vuejs.org/v2/guide/">vue.js</a>,
<a href="https://es.xiaoleilu.com/010_Intro/05_What_is_it.html">Elasticsearch</a>）</p>
<h2>介绍</h2>
<p>Elasticsearch是一个分布式的RESTful搜索和分析引擎，能够解决越来越多的用例。 Elasticsearch建立在Apache Lucene之上，它是一个高性能的文本搜索引擎库。</p>
<h3>目录</h3>
<p>在今天的课程中，您将学习如何使用Node.js，Elasticsearch和Vue.js构建实时搜索引擎。因此，需要对本教程进行基本的Vue.js和Node.js（Express）理解。</p>
<h2>入门</h2>
<p>让我们开始为本课设置环境。由于您将使用Node.js，因此最简单的入门方法是创建一个新文件夹并运行npm init。创建一个名为elastic-node的新文件夹，将目录更改为新文件夹，然后运行npm init：</p>
<pre><code class="hljs crmsh">//创建一个名为elastic-<span class="hljs-keyword">node</span><span class="hljs-title">的新目录
mkdir</span> elastic-<span class="hljs-keyword">node</span>
<span class="hljs-title">//将目录更改为创建的新文件夹
cd</span> elastic-<span class="hljs-keyword">node</span>
<span class="hljs-title">//运行npm</span> init来创建一个package.json文件
npm init
</code></pre>
<p>上述命令将引导您完成创建package.json文件的过程，该文件是运行任何Node.js库所必需的。接下来，您需要安装实时搜索引擎所需的库。所需的库是：</p>
<ul>
<li>Express: 这个库将运行我们的服务器</li>
<li>Body-parser: 该库与Express一起使用来分析正文请求。</li>
<li>Elasticsearch: 这是Elasticsearch的官方Node.js库，它是实时搜索的引擎。</li>
</ul>
<p>要安装这些库，执行：</p>
<pre><code class="hljs mipsasm">npm <span class="hljs-keyword">install </span>express <span class="hljs-keyword">body-parser </span>elasticsearch
</code></pre>
<p>现在，您的环境的第一部分已经建立。但是，您的设置中缺少Elasticsearch。您将需要安装Elasticsearch。有不同的方法来安装Elasticsearch。如果您使用Debian Linux操作系统，则可以下载.deb文件并使用dpkg进行安装。</p>
<pre><code class="hljs stylus"><span class="hljs-comment">//下载deb包</span>
curl -L -O https:<span class="hljs-comment">//artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.4.deb</span>
<span class="hljs-comment">//使用dpkg安装deb包</span>
sudo dpkg -<span class="hljs-selector-tag">i</span> elasticsearch-<span class="hljs-number">5.6</span>.<span class="hljs-number">4</span><span class="hljs-selector-class">.deb</span>
</code></pre>
<p>对于其他发行版/操作系统，您可以在 <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html">这里</a>找到关于如何安装Elasticsearch的指南。</p>
<p>Elasticsearch安装后不会自动启动。 Elasticsearch可以使用服务命令启动和停止：</p>
<pre><code class="hljs stylus"><span class="hljs-comment">// 启动Elasticsearch服务</span>
sudo -<span class="hljs-selector-tag">i</span> service elasticsearch start
<span class="hljs-comment">// 停止Elasticsearch服务</span>
sudo -<span class="hljs-selector-tag">i</span> service elasticsearch stop
</code></pre>
<p>要将Elasticsearch配置为在系统启动时自动启动，请运行：</p>
<pre><code class="hljs dts"><span class="hljs-comment">// 重新加载systemctl守护进程</span>
sudo <span class="hljs-meta-keyword">/bin/</span>systemctl daemon-reload
<span class="hljs-comment">// enable elastic search so it can be called as a service</span>
sudo <span class="hljs-meta-keyword">/bin/</span>systemctl enable elasticsearch.service
</code></pre>
<p>运行上面的命令后，您可以运行以下命令来启动和停止Elasticsearch：</p>
<pre><code class="hljs stylus"><span class="hljs-comment">// 启动Elasticsearch服务</span>
sudo systemctl start elasticsearch<span class="hljs-selector-class">.service</span>
<span class="hljs-comment">// 停止Elasticsearch服务</span>
sudo systemctl stop elasticsearch<span class="hljs-selector-class">.service</span>
</code></pre>
<p>检查Elasticsearch的状态：</p>
<pre><code class="hljs protobuf"><span class="hljs-comment">// Elasticsearch的状态</span>
sudo <span class="hljs-class"><span class="hljs-keyword">service</span> <span class="hljs-title">elasticsearch</span> status
</span></code></pre>
<blockquote>
<p>注意：<a href="https://chrome.google.com/webstore/detail/elasticsearch-toolbox/focdbmjgdonlpdknobfghplhmafpgfbp">Google Chrome Elastic</a>工具箱可以帮助您快速查看Elasticsearch的索引和文档。</p>
</blockquote>
<h2>在Elasticsearch中索引数据</h2>
<p>在根文件夹中创建一个data.js文件并添加：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">//data.js</span>
<span class="hljs-comment">//require the Elasticsearch librray</span>
<span class="hljs-keyword">const</span> elasticsearch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'elasticsearch'</span>);
<span class="hljs-comment">// 实例化一个Elasticsearch客户端</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> elasticsearch.Client({
   <span class="hljs-attr">hosts</span>: [ <span class="hljs-string">'http://localhost:9200'</span>]
});
<span class="hljs-comment">// ping客户端以确保Elasticsearch已启动</span>
client.ping({
     <span class="hljs-attr">requestTimeout</span>: <span class="hljs-number">30000</span>,
 }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
 <span class="hljs-comment">// 此时，eastic搜索已关闭，请检查您的Elasticsearch服务</span>
     <span class="hljs-keyword">if</span> (error) {
         <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Elasticsearch cluster is down!'</span>);
     } <span class="hljs-keyword">else</span> {
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Everything is ok'</span>);
     }
 });
</code></pre>
<p>让我来解释一下你在上面的代码块中所做的事情：首先，你需要Elasticsearch库，并建立一个新的Elasticsearch客户端传入一个主机的数组。如果您注意到，主机是http：// localhost：9200。这是因为默认情况下，Elasticsearch在端口9200上监听。接下来，您ping Elasticsearch客户端以确保服务器已启动。如果你运行节点data.js，你应该得到一个消息说一切正常。</p>
<h2>了解索引</h2>
<p>与普通数据库不同，Elasticsearch索引是存储相关文档的地方。例如，您将创建一个名为scotch.io-tutorial的索引来存储类型为cities_list的数据。这就是Elasticsearch所做的工作：</p>
<pre><code class="hljs lua">// data.js
// 创建一个名为scotch.<span class="hljs-built_in">io</span>-tutorial的新索引。如果索引已经被创建，这个函数会安全地失败
client.indices.<span class="hljs-built_in">create</span>({
      index: <span class="hljs-string">'scotch.io-tutorial'</span>
  }, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, response, status)</span></span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>) {
          console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">error</span>);
      } <span class="hljs-keyword">else</span> {
          console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"created a new index"</span>, response);
      }
});
</code></pre>
<p>在之前编写的ping功能之后添加这段代码。现在再次运行node data.js，你应该得到两条消息：</p>
<ul>
<li>Everything is okay（一切正常）</li>
<li>Created a new index (with the response from Elasticsearch)（创建了一个新的索引（来自Elasticsearch的响应） ）</li>
</ul>
<h2>将文档添加到索引</h2>
<p>Elasticsearch API使文档可以轻松添加到已创建的索引中。如下：</p>
<pre><code class="hljs less"><span class="hljs-comment">// 将数据添加到已创建的索引</span>
<span class="hljs-selector-tag">client</span><span class="hljs-selector-class">.index</span>({
     <span class="hljs-attribute">index</span>: <span class="hljs-string">'scotch.io-tutorial'</span>,
     <span class="hljs-attribute">id</span>: <span class="hljs-string">'1'</span>,
     <span class="hljs-attribute">type</span>: <span class="hljs-string">'cities_list'</span>,
     <span class="hljs-attribute">body</span>: {
         <span class="hljs-string">"Key1"</span>: <span class="hljs-string">"Content for key one"</span>,
         <span class="hljs-string">"Key2"</span>: <span class="hljs-string">"Content for key two"</span>,
         <span class="hljs-string">"key3"</span>: <span class="hljs-string">"Content for key three"</span>,
     }
 }, function(err, resp, status) {
     <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(resp);
 });
</code></pre>
<p>上面的代码块是解释性的。正文指的是您要添加到scotch.io-tutorial索引的文档，而类型更多的是一个类别。但是，请注意，如果id键被省略，Elasticsearch将自动生成一个。</p>
<p>但是，在本课中，您的文档将成为世界上所有城市的列表。如果您要逐个添加每个城市，那么需要几天时间（如果不是几周）才能完全索引所有城市。幸运的是，Elasticsearch有一个用于处理批量数据的批量函数。</p>
<p>首先，抓取包含<a href="https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json">世界上所有城市的</a>JSON文件，并保存到您的根文件夹中作为cities.json</p>
<p>现在是时候使用批量API来导入我们大量数据了：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">//data.js</span>
<span class="hljs-comment">// require the array of cities that was downloaded</span>
<span class="hljs-keyword">const</span> cities = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./cities.json'</span>);
<span class="hljs-comment">// 声明一个名为bulk的空数组</span>
<span class="hljs-keyword">var</span> bulk = [];
<span class="hljs-comment">// 循环遍历每个城市，并在每个循环中创建并将两个对象推入数组中</span>
<span class="hljs-comment">// 第一个对象发送索引和类型，保存数据</span>
<span class="hljs-comment">// 第二个对象是你想索引的数据</span>
cities.forEach(<span class="hljs-function"><span class="hljs-params">city</span> =&gt;</span>{
   bulk.push({<span class="hljs-attr">index</span>:{ 
                 <span class="hljs-attr">_index</span>:<span class="hljs-string">"scotch.io-tutorial"</span>, 
                 <span class="hljs-attr">_type</span>:<span class="hljs-string">"cities_list"</span>,
             }          
         })
  bulk.push(city)
})
<span class="hljs-comment">// 对传递的数据执行批量索引</span>
client.bulk({<span class="hljs-attr">body</span>:bulk}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> err, response  </span>)</span>{ 
         <span class="hljs-keyword">if</span>( err ){ 
             <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Failed Bulk operation"</span>.red, err) 
         } <span class="hljs-keyword">else</span> { 
             <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Successfully imported %s"</span>.green, cities.length); 
         } 
}); 
</code></pre>
<p>在这里，您已经浏览了JSON文件中的所有城市，并且在每个循环中，您都会追加一个包含要索引的文档的索引和类型的对象。请注意，在循环中有两个推入数组？这是因为批量API需要首先包含索引定义的对象，然后是要索引的文档。欲了解更多信息，你可以在<a href="https://www.elastic.co/guide/en/elasticsearch/reference/5.6/docs-bulk.html">这里查看</a>。</p>
<p>接下来，您将传递给新的批量数组的client.bulk函数作为正文调用。这会将所有数据用scotch.io-tutorial的索引和类型cities_list索引到Elasticsearch中。</p>
<h2>引入Express</h2>
<p>您的Elasticsearch实例已启动并正在运行，您可以使用Node.js连接它。现在是时候使用Express来为目标页面提供服务，并使用迄今为止运行的设置。</p>
<p>创建一个名为index.js的文件并添加：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">//index.js</span>
<span class="hljs-comment">// 需要Elasticsearch librray</span>
<span class="hljs-keyword">const</span> elasticsearch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'elasticsearch'</span>);
<span class="hljs-comment">// 实例化一个elasticsearch客户端</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> elasticsearch.Client({
   <span class="hljs-attr">hosts</span>: [ <span class="hljs-string">'http://localhost:9200'</span>]
});
<span class="hljs-comment">//require Express</span>
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>( <span class="hljs-string">'express'</span> );
<span class="hljs-comment">// 实例化一个表达式的实例并将其保存在一个名为app的常量中</span>
<span class="hljs-keyword">const</span> app     = express();
<span class="hljs-comment">// 引入body-parser库。将用于解析主体请求</span>
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>)
<span class="hljs-comment">//require the path library</span>
<span class="hljs-keyword">const</span> path    = <span class="hljs-built_in">require</span>( <span class="hljs-string">'path'</span> );

<span class="hljs-comment">// ping客户端以确保Elasticsearch已启动</span>
client.ping({
     <span class="hljs-attr">requestTimeout</span>: <span class="hljs-number">30000</span>,
 }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
 <span class="hljs-comment">// 此时，eastic搜索已关闭，请检查您的Elasticsearch服务</span>
     <span class="hljs-keyword">if</span> (error) {
         <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'elasticsearch cluster is down!'</span>);
     } <span class="hljs-keyword">else</span> {
         <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Everything is ok'</span>);
     }
 });

<span class="hljs-comment">// 使用bodyparser作为中间件</span>
app.use(bodyParser.json())
<span class="hljs-comment">// 设置应用程序侦听的端口</span>
app.set( <span class="hljs-string">'port'</span>, process.env.PORT || <span class="hljs-number">3001</span> );
<span class="hljs-comment">// 设置路径来提供静态文件</span>
app.use( express.static( path.join( __dirname, <span class="hljs-string">'public'</span> )));
<span class="hljs-comment">// 启用CORS </span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  res.header(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>);
  res.header(<span class="hljs-string">'Access-Control-Allow-Methods'</span>, <span class="hljs-string">'PUT, GET, POST, DELETE, OPTIONS'</span>);
  res.header(<span class="hljs-string">"Access-Control-Allow-Headers"</span>, <span class="hljs-string">"Origin, X-Requested-With, Content-Type, Accept"</span>);
  next();
});

<span class="hljs-comment">// 定义了基本路线并返回一个名为tempate.html的HTML文件</span>
app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>)</span>{
  res.sendFile(<span class="hljs-string">'template.html'</span>, {
     <span class="hljs-attr">root</span>: path.join( __dirname, <span class="hljs-string">'views'</span> )
   });
})

<span class="hljs-comment">// 定义应该返回弹性搜索结果的/ search路径</span>
app.get(<span class="hljs-string">'/search'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>)</span>{
  <span class="hljs-comment">// 声明查询对象以搜索弹性搜索，并从找到的第一个结果中仅返回200个结果。</span>
  <span class="hljs-comment">// 还匹配其中名称与发送的查询字符串类似的任何数据</span>
  <span class="hljs-keyword">let</span> body = {
    <span class="hljs-attr">size</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">from</span>: <span class="hljs-number">0</span>, 
    <span class="hljs-attr">query</span>: {
      <span class="hljs-attr">match</span>: {
          <span class="hljs-attr">name</span>: req.query[<span class="hljs-string">'q'</span>]
      }
    }
  }
  <span class="hljs-comment">// 在索引中执行实际的搜索传递，搜索查询和类型</span>
  client.search({<span class="hljs-attr">index</span>:<span class="hljs-string">'scotch.io-tutorial'</span>,  <span class="hljs-attr">body</span>:body, <span class="hljs-attr">type</span>:<span class="hljs-string">'cities_list'</span>})
  .then(<span class="hljs-function"><span class="hljs-params">results</span> =&gt;</span> {
    res.send(results.hits.hits);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(err)
    res.send([]);
  });

})
<span class="hljs-comment">// 监听一个指定的端口</span>
app .listen( app.get( <span class="hljs-string">'port'</span> ), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log( <span class="hljs-string">'Express server listening on port '</span> + app.get( <span class="hljs-string">'port'</span> ));
} );
</code></pre>
<p>看看上面的代码，注意：</p>
<ul>
<li>需要Express，body-parser和路径库。</li>
<li>将一个新的Express实例设置为常量，命名为app。</li>
<li>设置应用程序以使用bodyParser中间件。</li>
<li>将应用程序的静态文件放在名为public的文件夹（我尚未创建此文件夹）。</li>
<li>定义了一个将CORS头添加到应用程序的中间件。</li>
<li>定义一个GET路由在根目录文件夹里，并且在此路由中，我返回了一个名为template.html的文件，该文件位于views文件夹中（我还尚未创建此文件夹和文件template.html）</li>
<li>为应用程序的/ search URL定义了一个GET路由，该路径使用查询对象来搜索通过查询字符串传递给它的数据的匹配。主要的搜索查询包含在查询对象中。您可以向此对象添加不同的搜索查询。对于这个查询，你在查询中添加一个关键字并返回一个对象，告诉它你正在查找的文档的名字应该与req.query ['q']匹配。</li>
</ul>
<pre><code class="hljs livecodeserver">Besides <span class="hljs-keyword">the</span> query object, <span class="hljs-keyword">the</span> search body can contain other optional properties, including size <span class="hljs-keyword">and</span> <span class="hljs-built_in">from</span>. The size property determines <span class="hljs-keyword">the</span> <span class="hljs-built_in">number</span> <span class="hljs-keyword">of</span> documents <span class="hljs-built_in">to</span> be included <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> response. If this <span class="hljs-built_in">value</span> is <span class="hljs-keyword">not</span> present, <span class="hljs-keyword">by</span> default <span class="hljs-literal">ten</span> documents are returned. The <span class="hljs-built_in">from</span> property determines <span class="hljs-keyword">the</span> starting index <span class="hljs-keyword">of</span> <span class="hljs-keyword">the</span> returned documents. This is useful <span class="hljs-keyword">for</span> pagination.
</code></pre><h2>了解搜索API响应</h2>
<p>如果您要注销搜索API的响应，则会包含大量信息。</p>
<pre><code class="hljs less">{ <span class="hljs-attribute">took</span>: <span class="hljs-number">88</span>,
<span class="hljs-attribute">timed_out</span>: false,
<span class="hljs-attribute">_shards</span>: { <span class="hljs-attribute">total</span>: <span class="hljs-number">5</span>, <span class="hljs-attribute">successful</span>: <span class="hljs-number">5</span>, <span class="hljs-attribute">failed</span>: <span class="hljs-number">0</span> },
<span class="hljs-attribute">hits</span>:
{ <span class="hljs-attribute">total</span>: <span class="hljs-number">59</span>,
 <span class="hljs-attribute">max_score</span>: <span class="hljs-number">5.9437823</span>,
 <span class="hljs-attribute">hits</span>:
  [ {<span class="hljs-string">"_index"</span>:<span class="hljs-string">"scotch.io-tutorial"</span>,
  <span class="hljs-string">"_type"</span>:<span class="hljs-string">"cities_list"</span>,
  <span class="hljs-string">"_id"</span>:<span class="hljs-string">"AV-xjywQx9urn0C4pSPv"</span>,
  <span class="hljs-string">"_score"</span>:<span class="hljs-number">5.9437823</span>,"
  _source<span class="hljs-string">":{"</span>country<span class="hljs-string">":"</span>ES<span class="hljs-string">","</span>name<span class="hljs-string">":"</span>A Coruña<span class="hljs-string">","</span>lat<span class="hljs-string">":"</span><span class="hljs-number">43.37135</span><span class="hljs-string">","</span>lng<span class="hljs-string">":"</span>-<span class="hljs-number">8.396</span>"}},
    <span class="hljs-selector-attr">[Object]</span>,
...
    <span class="hljs-selector-attr">[Object]</span> ] } }
</code></pre>
<p>响应中包含一个用于查找结果的毫秒数的夺取属性timed_out，如果在最大允许时间内未找到结果，则返回true; _shards用于获取有关不同节点状态的信息（如果部署为节点集群）以及包含搜索结果的匹配。</p>
<p>在hits属性中，我们有一个对象具有以下属性：</p>
<p>总数显示匹配项目的总数。</p>
<p>max_score是找到的项目的最高分数。</p>
<p>命中包含找到的项目的数组。</p>
<p>以上是搜索路由的前提，您返回了response.hits.hits，其中包含找到的文档。</p>
<h2>创建HTML模板</h2>
<p>首先，在上面的部分中引用的名为views和public的根文件夹中创建两个新文件夹。接下来，在views文件夹中创建一个名为template.html的文件并粘贴：</p>
<pre><code class="hljs django"><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/axios/dist/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Search Cities around the world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-form"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sr-only"</span>&gt;</span>Search<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"query"</span> &gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

                    </span><span class="hljs-template-variable">"{{" result._source.name "}}"</span><span class="xml">, </span><span class="hljs-template-variable">"{{" result._source.country "}}"</span><span class="xml"> 
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>lat:</span><span class="hljs-template-variable">"{{" result._source.lat "}}"</span><span class="xml">, long: </span><span class="hljs-template-variable">"{{" result._source.lng "}}"</span><span class="xml">.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> {
        <span class="hljs-attribute">float</span>: right <span class="hljs-meta">!important</span>;
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.35s</span>, border-radius <span class="hljs-number">0s</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">32px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.075) inset;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span> {
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span> none;
        <span class="hljs-attribute">background</span>: transparent;
        <span class="hljs-attribute">box-shadow</span>: none;
        <span class="hljs-attribute">display</span>: block;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">::-webkit-input-placeholder</span> {
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">:-moz-placeholder</span> {
        <span class="hljs-comment">/* Firefox 18- */</span>
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">::-moz-placeholder</span> {
        <span class="hljs-comment">/* Firefox 19+ */</span>
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">:-ms-input-placeholder</span> {
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span><span class="hljs-selector-pseudo">:hover</span>,
    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span><span class="hljs-selector-class">.hover</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">25px</span> <span class="hljs-number">25px</span> <span class="hljs-number">4px</span>;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.form-control-feedback</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">1px</span>;
        <span class="hljs-attribute">right</span>: -<span class="hljs-number">2px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#3596e0</span>;
        <span class="hljs-attribute">left</span>: initial;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>在上面的代码片段中，有两个主要部分：</p>
<ul>
<li><p>HTML代码：在本节中，您首先需要三个不同的库，分别是1.）Bootstrap CSS，用于设置页面样式。 2.）Axios js，用于向我们的服务器发送HTTP请求，以及3）Vue.js，一个您将用于我们的视图的简约框架。</p>
</li>
<li><p>CSS代码：在这里，您将悬停在搜索图标上的样式应用于隐藏和显示搜索输入。</p>
</li>
</ul>
<p>接下来，为您指定其v模型进行查询的搜索框有一个输入（这将由Vue.js使用）。在此之后，您循环遍历所有结果（此循环和结果变量将由Vue.js提供）。请注意，在此循环时，您必须访问数据的__source属性。基于弹性搜索返回的响应，这看起来很熟悉。</p>
<p>运行node index.js命令，浏览到http：// localhost：3001 /，接下来，在你的template.html文件中添加一个脚本标签，添加：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// template.html</span>
<span class="hljs-comment">// 创建一个新的Vue实例</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-comment">// 声明组件的数据（容纳结果的数组以及包含当前搜索字符串的查询） search string)</span>
    data: {
        <span class="hljs-attr">results</span>: [],
        <span class="hljs-attr">query</span>: <span class="hljs-string">''</span>
    },
    <span class="hljs-comment">// 在这个Vue组件中声明方法。这里只定义了一种执行搜索的方法</span>
    methods: {
        <span class="hljs-comment">// 使用当前搜索查询向服务器发出axios请求</span>
        search: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            axios.get(<span class="hljs-string">"http://127.0.0.1:3001/search?q="</span> + <span class="hljs-keyword">this</span>.query)
                .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.results = response.data;

                })
        }
    },
    <span class="hljs-comment">// declare Vue watchers</span>
    watch: {
        <span class="hljs-comment">// 注意查询字符串中的更改并调用搜索方法</span>
        query: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.search();
        }
    }

})
</code></pre>
<p>Vue.js代码：在本节中，您声明了一个Vue的新实例，将其挂载到具有应用程序ID的元素上。您声明了数据属性，其中包括1）查询您已附加到搜索输入，和2）结果，这是所有找到的结果的数组。</p>
<p>在方法配置中，只有一个称为搜索的函数，它会触发搜索路径的GET请求，以传递搜索框中的当前输入。然后会返回一个响应，然后在HTML代码块中循环。</p>
<p>最后，您使用Vue.js中的所谓观察者，在任何时候都可以监视数据以查看更改。在这里，您正在观察查询数据中的更改，并且一旦它发生更改，就会触发搜索方法。</p>
<h2>从客户端搜索</h2>
<p>每次搜索发生时，如果我不想将请求发送到服务器，该怎么办？我可以直接从客户端搜索Elasticsearch引擎吗？是。</p>
<p>尽管上述方法有效，但有些开发人员可能并不习惯于每次搜索条件都使用他们的服务器，有些则认为从服务器端进行搜索更安全。</p>
<p>但是，可以从客户端进行搜索。 Elasticsearch提供了可以进行搜索的浏览器版本。让我通过一个快速示例。</p>
<p>首先，将一条新路线添加到Express文件并重新启动服务器：</p>
<pre><code class="hljs actionscript"><span class="hljs-comment">//index.js</span>
<span class="hljs-comment">// decare a new route. This route serves a static HTML template called template2.html</span>
app.get(<span class="hljs-string">'/v2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span></span>{
  res.sendFile(<span class="hljs-string">'template2.html'</span>, {
     root: path.join( __dirname, <span class="hljs-string">'views'</span> )
   });
})
</code></pre>
<p>在上面的代码块中，您为/ v2创建了一个新的URL路由，并且您在此路由中所做的所有操作都将返回一个名为template2.html的静态HTML文件，该文件将很快创建。</p>
<p>接下来，您需要在<a href="https://download.elasticsearch.org/elasticsearch/elasticsearch-js/elasticsearch-js-13.3.1.zip">这里</a>下载Elasticsearch的客户端库。下载后，将elasticsearch.min.js提取并复制到应用程序根目录中的公用文件夹。</p>
<blockquote>
<p>注意：了解您是否尝试从客户端连接Elasticsearch引擎非常重要，您可能会遇到CORS问题。为了解决这个问题，找到你的Elasticsearch配置文件（对于Debian / Ubuntu，可以在/etc/elasticsearch/elasticsearch.yml找到它）。对于其他操作系统，找到它位于的位置，并将以下内容添加到底部文件：</p>
</blockquote>
<pre><code class="hljs stylus">#/etc/elasticsearch/elasticsearch<span class="hljs-selector-class">.yml</span>

http<span class="hljs-selector-class">.cors</span><span class="hljs-selector-class">.enabled</span> : true
http<span class="hljs-selector-class">.cors</span><span class="hljs-selector-class">.allow-origin</span> : <span class="hljs-string">"*"</span>
</code></pre>
<p>完成之后，重新启动Elasticsearch实例</p>
<pre><code class="hljs protobuf"><span class="hljs-comment">// 重新启动Elasticsearch服务</span>
sudo <span class="hljs-class"><span class="hljs-keyword">service</span> <span class="hljs-title">elasticsearch</span> restart
</span></code></pre>
<p>接下来，在视图文件夹中创建一个名为template2.html的文件并添加：</p>
<pre><code class="hljs django"><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/axios/dist/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Search Cities around the world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-form"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sr-only"</span>&gt;</span>Search<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"query"</span> &gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

                    </span><span class="hljs-template-variable">"{{" result._source.name "}}"</span><span class="xml">, </span><span class="hljs-template-variable">"{{" result._source.country "}}"</span><span class="xml"> 
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>lat:</span><span class="hljs-template-variable">"{{" result._source.lat "}}"</span><span class="xml">, long: </span><span class="hljs-template-variable">"{{" result._source.lng "}}"</span><span class="xml">.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/elasticsearch.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> {
        <span class="hljs-attribute">float</span>: right <span class="hljs-meta">!important</span>;
        <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.35s</span>, border-radius <span class="hljs-number">0s</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">32px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.075) inset;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span> {
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span> none;
        <span class="hljs-attribute">background</span>: transparent;
        <span class="hljs-attribute">box-shadow</span>: none;
        <span class="hljs-attribute">display</span>: block;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">::-webkit-input-placeholder</span> {
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">:-moz-placeholder</span> {
        <span class="hljs-comment">/* Firefox 18- */</span>
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">::-moz-placeholder</span> {
        <span class="hljs-comment">/* Firefox 19+ */</span>
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">:-ms-input-placeholder</span> {
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span><span class="hljs-selector-pseudo">:hover</span>,
    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span><span class="hljs-selector-class">.hover</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">25px</span> <span class="hljs-number">25px</span> <span class="hljs-number">4px</span>;
    }

    <span class="hljs-selector-class">.search-form</span> <span class="hljs-selector-class">.form-group</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.form-control-feedback</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">1px</span>;
        <span class="hljs-attribute">right</span>: -<span class="hljs-number">2px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">34px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#3596e0</span>;
        <span class="hljs-attribute">left</span>: initial;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>接下来，在您的template2.html文件中添加一个脚本标记并添加：</p>
<pre><code class="hljs javascript"><span class="hljs-comment">//template2.html</span>
<span class="hljs-comment">// 像你在客户端上那样实例化一个新的Elasticsearch客户端</span>
<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> elasticsearch.Client({
    <span class="hljs-attr">hosts</span>: [<span class="hljs-string">'http://127.0.0.1:9200'</span>]
});
<span class="hljs-comment">// 创建一个新的Vue实例</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-comment">// 声明组件的数据（容纳结果的数组以及包含当前搜索字符串的查询）</span>
    data: {
        <span class="hljs-attr">results</span>: [],
        <span class="hljs-attr">query</span>: <span class="hljs-string">''</span>
    },
    <span class="hljs-comment">// 在这个Vue组件中声明方法。这里只定义了一种执行搜索的方法</span>
    methods: {
        <span class="hljs-comment">// 函数调用弹性搜索。这里查询对象与服务器的设置一样。</span>
        <span class="hljs-comment">// 这里查询字符串直接从Vue传递</span>
        search: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> body = {
                    <span class="hljs-attr">size</span>: <span class="hljs-number">200</span>,
                    <span class="hljs-attr">from</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-attr">query</span>: {
                        <span class="hljs-attr">match</span>: {
                            <span class="hljs-attr">name</span>: <span class="hljs-keyword">this</span>.query
                        }
                    }
                }
                <span class="hljs-comment">// 搜索传入索引的Elasticsearch，查询对象和类型</span>
            client.search({ <span class="hljs-attr">index</span>: <span class="hljs-string">'scotch.io-tutorial'</span>, <span class="hljs-attr">body</span>: body, <span class="hljs-attr">type</span>: <span class="hljs-string">'cities_list'</span> })
                .then(<span class="hljs-function"><span class="hljs-params">results</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(found ${results.hits.total} items <span class="hljs-keyword">in</span> ${results.took}ms);
                    <span class="hljs-comment">// 将结果设置为我们拥有的结果数组</span>
                    <span class="hljs-keyword">this</span>.results = results.hits.hits;
                })
                .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(err)

                });

        }
    },
    <span class="hljs-comment">// declare Vue watchers</span>
    watch: {
        <span class="hljs-comment">// 注意查询字符串中的更改并调用搜索方法</span>
        query: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.search();
        }
    }

})
</code></pre>
<p>上面的HTML和JavaScript片段与上面的部分非常相似。唯一的区别是：</p>
<ul>
<li>您不需要Axios，而是需要elasticsearch.js。</li>
<li>在脚本标记的顶部，您启动了Elasticsearch客户端，因为它在服务器端完成。</li>
<li>搜索方法不执行HTTP请求，而是像在服务器端的搜索路径中那样搜索Elasticsearch引擎。</li>
</ul>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/build-a-real-time-search-engine-with-node-vue-and-elasticsearch](https://www.zcfy.cc/article/build-a-real-time-search-engine-with-node-vue-and-elasticsearch)
原文标题: 使用Node，Vue和ElasticSearch构建实时搜索引擎
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
