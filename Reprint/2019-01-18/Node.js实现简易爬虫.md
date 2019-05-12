---
title: 'Node.js实现简易爬虫' 
date: 2019-01-18 2:30:35
hidden: true
slug: qb969h5cihh
categories: [reprint]
---

{{< raw >}}

                    
<p>为什么选择利用node来写爬虫呢？就是因为cheerio这个库，全兼容jQuery语法，熟悉的话用起来真真是爽</p>
<h2 id="articleHeader0">依赖选择</h2>
<ul>
<li><p><a href="https://github.com/cheeriojs/cheerio" rel="nofollow noreferrer" target="_blank">cheerio</a>： Node.js 版的jQuery</p></li>
<li><p>http：封装了一个HTPP服务器和一个简易的HTTP客户端</p></li>
<li><p><a href="https://www.npmjs.com/package/iconv-lite" rel="nofollow noreferrer" target="_blank">iconv-lite</a>：解决爬取gb2312网页出现乱码</p></li>
</ul>
<h2 id="articleHeader1">初步实现</h2>
<p>既然是要爬取网站内容，那我们就应该先去看看网站的基本构成<br>选取的是<a href="http://www.dytt8.net/" rel="nofollow noreferrer" target="_blank">电影天堂</a>作为目标网站，想要去爬取所有最新电影的下载链接</p>
<h4>分析页面</h4>
<p>页面结构如下：<br><span class="img-wrap"><img data-src="/img/bVKQ4c?w=1215&amp;h=712" src="https://static.alili.tech/img/bVKQ4c?w=1215&amp;h=712" alt="ygdy.tiff" title="ygdy.tiff" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到每个电影的标题都在一个<code>class</code>为<code>ulink</code>的<code>a</code>标签下，再往上定位，我们可以看到最外部的盒子<code>class</code>为<code>co_content8</code></p>
<p>ok，可以开工了</p>
<h4>获取一页电影标题</h4>
<p>首先引入依赖，并设定需要爬取的url</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');

var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var cheerio</span> = require(<span class="hljs-string">'cheerio'</span>);
<span class="hljs-attribute">var http</span> = require(<span class="hljs-string">'http'</span>);
<span class="hljs-attribute">var iconv</span> = require(<span class="hljs-string">'iconv-lite'</span>);

<span class="hljs-attribute">var url</span> = <span class="hljs-string">'http://www.ygdy8.net/html/gndy/dyzz/index.html'</span>;</code></pre>
<p>核心代码 <code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http.get(url, function(sres) {
  var chunks = [];
  sres.on('data', function(chunk) {
    chunks.push(chunk);
  });
  // chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
  // 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
  // 剩下就都是 jQuery 的内容了
  sres.on('end', function() {
    var titles = [];
    //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
    //依据：“<meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=gb2312&quot;>”
    var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
    var $ = cheerio.load(html, {decodeEntities: false});
    $('.co_content8 .ulink').each(function (idx, element) {
      var $element = $(element);
      titles.push({
        title: $element.text()
      })
    })    
    console.log(titles);     
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>http.get(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sres</span>) </span>{
  <span class="hljs-keyword">var</span> chunks = [];
  sres.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk</span>) </span>{
    chunks.push(chunk);
  });
  <span class="hljs-comment">// chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后</span>
  <span class="hljs-comment">// 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`</span>
  <span class="hljs-comment">// 剩下就都是 jQuery 的内容了</span>
  sres.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> titles = [];
    <span class="hljs-comment">//由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码</span>
    <span class="hljs-comment">//依据：“&lt;meta http-equiv="Content-Type" content="text/html; charset=gb2312"&gt;”</span>
    <span class="hljs-keyword">var</span> html = iconv.decode(Buffer.concat(chunks), <span class="hljs-string">'gb2312'</span>);
    <span class="hljs-keyword">var</span> $ = cheerio.load(html, {<span class="hljs-attr">decodeEntities</span>: <span class="hljs-literal">false</span>});
    $(<span class="hljs-string">'.co_content8 .ulink'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">idx, element</span>) </span>{
      <span class="hljs-keyword">var</span> $element = $(element);
      titles.push({
        <span class="hljs-attr">title</span>: $element.text()
      })
    })    
    <span class="hljs-built_in">console</span>.log(titles);     
  });
});</code></pre>
<p>运行<code>node index</code></p>
<p>结果如下<br><span class="img-wrap"><img data-src="/img/bVKQ6h?w=1448&amp;h=1012" src="https://static.alili.tech/img/bVKQ6h?w=1448&amp;h=1012" alt="node-repfile-title.png" title="node-repfile-title.png" style="cursor: pointer; display: inline;"></span></p>
<p>成功获取电影title，那如果我想获取多个页面的title呢，总不可能一个一个url去改吧。这当然有办法，请往下看！</p>
<h4>获取多页电影标题</h4>
<p>我们只要将之前的代码封装成一个函数并递归执行就完成了</p>
<p>核心代码 <code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var index = 1; //页面数控制
var url = 'http://www.ygdy8.net/html/gndy/dyzz/list_23_';
var titles = []; //用于保存title

function getTitle(url, i) {
  console.log(&quot;正在获取第&quot; + i + &quot;页的内容&quot;); 
  http.get(url + i + '.html', function(sres) {
    var chunks = [];
    sres.on('data', function(chunk) {
      chunks.push(chunk);
    });
    sres.on('end', function() {
      var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
      var $ = cheerio.load(html, {decodeEntities: false});
      $('.co_content8 .ulink').each(function (idx, element) {
        var $element = $(element);
        titles.push({
          title: $element.text()
        })
      })  
      if(i < 2) { //为了方便只爬了两页
        getTitle(url, ++index); //递归执行，页数+1
      } else {
        console.log(titles); 
        console.log(&quot;Title获取完毕！&quot;);              
      }
    });
  });
}

function main() {
  console.log(&quot;开始爬取&quot;);
  getTitle(url, index);
}

main(); //运行主函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> index = <span class="hljs-number">1</span>; <span class="hljs-comment">//页面数控制</span>
<span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'http://www.ygdy8.net/html/gndy/dyzz/list_23_'</span>;
<span class="hljs-built_in">var</span> titles = []; <span class="hljs-comment">//用于保存title</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTitle</span>(<span class="hljs-params">url, i</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"正在获取第"</span> + i + <span class="hljs-string">"页的内容"</span>); 
  http.get(<span class="hljs-built_in">url</span> + i + <span class="hljs-string">'.html'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sres</span>) </span>{
    <span class="hljs-built_in">var</span> chunks = [];
    sres.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk</span>) </span>{
      chunks.push(chunk);
    });
    sres.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">var</span> html = iconv.decode(Buffer.concat(chunks), <span class="hljs-string">'gb2312'</span>);
      <span class="hljs-built_in">var</span> $ = cheerio.load(html, {<span class="hljs-attribute">decodeEntities</span>: <span class="hljs-literal">false</span>});
      $(<span class="hljs-string">'.co_content8 .ulink'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">idx, element</span>) </span>{
        <span class="hljs-built_in">var</span> $element = $(element);
        titles.push({
          <span class="hljs-attribute">title</span>: $element.text()
        })
      })  
      <span class="hljs-keyword">if</span>(i &lt; <span class="hljs-number">2</span>) { <span class="hljs-comment">//为了方便只爬了两页</span>
        getTitle(<span class="hljs-built_in">url</span>, ++index); <span class="hljs-comment">//递归执行，页数+1</span>
      } <span class="hljs-title">else</span> {
        <span class="hljs-built_in">console</span>.log(titles); 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Title获取完毕！"</span>);              
      }
    });
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"开始爬取"</span>);
  getTitle(<span class="hljs-built_in">url</span>, index);
}

main(); <span class="hljs-comment">//运行主函数</span></code></pre>
<p>结果如下<br><span class="img-wrap"><img data-src="/img/bVKQ7h?w=700&amp;h=773" src="https://static.alili.tech/img/bVKQ7h?w=700&amp;h=773" alt="node-reptitle-many-title.png" title="node-reptitle-many-title.png" style="cursor: pointer; display: inline;"></span></p>
<h4>获取电影下载连接</h4>
<p>如果是人工操作，我们需要一次操作，通过点击进入电影详情页才能找到下载地址<br>那我们通过node如何来实现呢</p>
<p>常规先来分析页面布局<br><span class="img-wrap"><img data-src="/img/bVKQ9a?w=2430&amp;h=1411" src="https://static.alili.tech/img/bVKQ9a?w=2430&amp;h=1411" alt="ygdy-des.png" title="ygdy-des.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们如果想要准确定位到下载链接，需要先找到<code>id</code>为<code>Zoom</code>的div，下载链接就在这个<code>div</code>下的<code>tr</code>下的<code>a</code>标签内。</p>
<p>那我们就再定义一个函数，用于获取下载链接</p>
<p>getBtLink()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getBtLink(urls, n) { //urls里面包含着所有详情页的地址
  console.log(&quot;正在获取第&quot; + n + &quot;个url的内容&quot;);
  http.get('http://www.ygdy8.net' + urls[n].title, function(sres) {
    var chunks = [];
    sres.on('data', function(chunk) {
      chunks.push(chunk);
    });
    sres.on('end', function() {
      var html = iconv.decode(Buffer.concat(chunks), 'gb2312'); //进行转码
      var $ = cheerio.load(html, {decodeEntities: false});
      $('#Zoom td').children('a').each(function (idx, element) {
        var $element = $(element);
        btLink.push({
          bt: $element.attr('href')
        })
      })
      if(n < urls.length - 1) {
        getBtLink(urls, ++count); /／递归
      } else {
        console.log(&quot;btlink获取完毕！&quot;);
        console.log(btLink);   
      }
    });
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBtLink</span><span class="hljs-params">(urls, n)</span> </span>{ <span class="hljs-comment">//urls里面包含着所有详情页的地址</span>
  console.log(<span class="hljs-string">"正在获取第"</span> + n + <span class="hljs-string">"个url的内容"</span>);
  http.get(<span class="hljs-string">'http://www.ygdy8.net'</span> + urls[n].title, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(sres)</span> </span>{
    <span class="hljs-keyword">var</span> chunks = [];
    sres.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(chunk)</span> </span>{
      chunks.push(chunk);
    });
    sres.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">var</span> html = iconv.decode(Buffer.concat(chunks), <span class="hljs-string">'gb2312'</span>); <span class="hljs-comment">//进行转码</span>
      <span class="hljs-keyword">var</span> $ = cheerio.load(html, {decodeEntities: <span class="hljs-keyword">false</span>});
      $(<span class="hljs-string">'#Zoom td'</span>).children(<span class="hljs-string">'a'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(idx, element)</span> </span>{
        <span class="hljs-keyword">var</span> $element = $(element);
        btLink.push({
          bt: $element.attr(<span class="hljs-string">'href'</span>)
        })
      })
      <span class="hljs-keyword">if</span>(n &lt; urls.length - <span class="hljs-number">1</span>) {
        getBtLink(urls, ++count); /／递归
      } <span class="hljs-keyword">else</span> {
        console.log(<span class="hljs-string">"btlink获取完毕！"</span>);
        console.log(btLink);   
      }
    });
  });
}</code></pre>
<p>再次运行 <code>node index</code><br><span class="img-wrap"><img data-src="/img/bVKQ95?w=700&amp;h=609" src="https://static.alili.tech/img/bVKQ95?w=700&amp;h=609" alt="WX20170318-190537@2x.png" title="WX20170318-190537@2x.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVKQ98?w=700&amp;h=609" src="https://static.alili.tech/img/bVKQ98?w=700&amp;h=609" alt="WX20170318-190549@2x.png" title="WX20170318-190549@2x.png" style="cursor: pointer; display: inline;"></span></p>
<p>就这样我们将3个页面内所有电影的下载链接获取完毕，是不是很简单？</p>
<h2 id="articleHeader2">保存数据</h2>
<p>我们讲这些数据爬取出来当然是要进行保存的啊，在这里我选用了MongoDB来对其进行保存处理</p>
<p>数据保存函数 <code>save()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function save() {
  var MongoClient = require('mongodb').MongoClient; //导入依赖
  MongoClient.connect(mongo_url, function (err, db) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log(&quot;成功连接数据库&quot;);
      var collection = db.collection('node-reptitle');
      collection.insertMany(btLink, function (err,result) { //插入数据
        if (err) {
          console.error(err);
        } else {
          console.log(&quot;保存数据成功&quot;);
        }
      })
      db.close();
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">save</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> MongoClient = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongodb'</span>).MongoClient; <span class="hljs-comment">//导入依赖</span>
  MongoClient.connect(mongo_url, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, db</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-built_in">console</span>.error(err);
      <span class="hljs-keyword">return</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"成功连接数据库"</span>);
      <span class="hljs-keyword">var</span> collection = db.collection(<span class="hljs-string">'node-reptitle'</span>);
      collection.insertMany(btLink, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err,result</span>) </span>{ <span class="hljs-comment">//插入数据</span>
        <span class="hljs-keyword">if</span> (err) {
          <span class="hljs-built_in">console</span>.error(err);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"保存数据成功"</span>);
        }
      })
      db.close();
    }
  });
}</code></pre>
<p>这里的操作很简单，就没必要上mongoose啦<br>再次运行 <code>node index</code><br><span class="img-wrap"><img data-src="/img/bVKRfe?w=1000&amp;h=587" src="https://static.alili.tech/img/bVKRfe?w=1000&amp;h=587" alt="mongodb-node-reptitle.png" title="mongodb-node-reptitle.png" style="cursor: pointer;"></span></p>
<p>这个Node.js实现的爬虫就是这样了，祝大家能爬到自己想要的数据；）</p>
<p>最后附上源码地址：<a href="https://github.com/HuangXiZhou/node-reptitle" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/HuangXiZhou/node-reptitle" rel="nofollow noreferrer" target="_blank">https://github.com/HuangXiZho...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js实现简易爬虫

## 原文链接
[https://segmentfault.com/a/1190000008745531](https://segmentfault.com/a/1190000008745531)

