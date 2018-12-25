---
title: '认识node核心模块--从Buffer、Stream到fs' 
date: 2018-12-26 2:30:14
hidden: true
slug: gvpfixfz84j
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="http://realtcg.com/2017/11/10/%E8%AE%A4%E8%AF%86node%E6%A0%B8%E5%BF%83%E6%A8%A1%E5%9D%97-%E4%BB%8EBuffer%E3%80%81Stream%E5%88%B0fs/http://realtcg.com/2017/11/10/%E8%AE%A4%E8%AF%86node%E6%A0%B8%E5%BF%83%E6%A8%A1%E5%9D%97-%E4%BB%8EBuffer%E3%80%81Stream%E5%88%B0fs/" rel="nofollow noreferrer" target="_blank">原文地址</a>在我的博客</p></blockquote>
<p>node中的Buffer和Stream会给刚接触Node的前端工程师们带来困惑，原因是前端并没有类似概念(or 有我们也没意识到)。然而，在后端，在node中，Buffer和Stream处处体现。Buffer是缓冲区的意思，Stream是流的意思。在计算机中，缓冲区是存储中间变量，方便CPU读取数据的一块存储区域；流是类比水流形容数据的流动。Buffer和Stream一般都是字节级操作。本文将介绍这两个模块的具体细节后再介绍文件模块，以让读者有更清晰的认识。</p>
<h2 id="articleHeader0">正文</h2>
<h3 id="articleHeader1">二进制缓冲区Buffer</h3>
<p>在前端，我们只需做字符串级别的操作，很少接触字节、进制等底层操作，一方面这足以满足日常需求，另一方面Javascript这种应用层语言并不是干这个的；然而在后端，处理文件、网络协议、图片、视频等时是非常常见的，尤其像文件、网络流等操作处理的都是二进制数据。为了让javascript能够处理二进制数据，node封装了一个Buffer类，主要用于操作字节，处理二进制数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个长度为 10、且用 30 填充的 Buffer。
const buf1 = Buffer.alloc(10, 30)
console.log(buf1)// <Buffer 1e 1e 1e 1e 1e 1e 1e 1e 1e 1e>
// 字符串转Buffer
const buf2 = Buffer.from('javascript')
console.log(buf2)// <Buffer 6a 61 76 61 73 63 72 69 70 74>
// 字符串转 buffer
console.log(buf2.toString())// javascript
console.log(buf2.toString('hex')) //6a617661736372697074" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建一个长度为 10、且用 30 填充的 Buffer。</span>
<span class="hljs-keyword">const</span> buf1 = Buffer.alloc(<span class="hljs-number">10</span>, <span class="hljs-number">30</span>)
<span class="hljs-built_in">console</span>.log(buf1)<span class="hljs-comment">// &lt;Buffer 1e 1e 1e 1e 1e 1e 1e 1e 1e 1e&gt;</span>
<span class="hljs-comment">// 字符串转Buffer</span>
<span class="hljs-keyword">const</span> buf2 = Buffer.from(<span class="hljs-string">'javascript'</span>)
<span class="hljs-built_in">console</span>.log(buf2)<span class="hljs-comment">// &lt;Buffer 6a 61 76 61 73 63 72 69 70 74&gt;</span>
<span class="hljs-comment">// 字符串转 buffer</span>
<span class="hljs-built_in">console</span>.log(buf2.toString())<span class="hljs-comment">// javascript</span>
<span class="hljs-built_in">console</span>.log(buf2.toString(<span class="hljs-string">'hex'</span>)) <span class="hljs-comment">//6a617661736372697074</span></code></pre>
<p>一个 Buffer 类似于一个整数数组，可以取下标，有length属性，有剪切复制操作等，很多API也类似数组，但Buffer的大小在被创建时确定，且无法调整。Buffer处理的是字节，两位十六进制，因此在整数范围就是0～255。</p>
<p>可以看到，Buffer可以与string互相转化，还可以设置字符集编码。Buffer用来处理文件I／O、网络I/O传输的二进制数据，string用来呈现。在处理文件I／O、网络I/O传输的二进制数据时，应该尽量以Buffer形式直接传输，速度会得到很好的提升，但操作字符串比操作Buffer还是快很多的。</p>
<p><strong>Buffer内存分配与性能优化</strong></p>
<p>Buffer是一个典型的javascript与C++结合的模块，与性能有关的用C++来实现，javascript 负责衔接和提供接口。Buffer所占的内存不是V8分配的，是独立于V8堆内存之外的内存，通过C++层面实现内存申请、javascript 分配内存。值得一提的是，每当我们使用<code>Buffer.alloc(size)</code>请求一个Buffer内存时，Buffer会以8KB为界限来判断分配的是大对象还是小对象，小对象存入剩余内存池，不够再申请一个8KB的内存池；大对象直接采用C++层面申请的内存。因此，对于一个大尺寸对象，申请一个大内存比申请众多小内存池快很多。</p>
<h3 id="articleHeader2">流Stream</h3>
<p>前面讲到，流类比水流形容数据的流动，在文件I/O、网络I／O中数据的传输都可以称之为流，流是能统一描述所有常见输入输出类型的模型，是顺序读写字节序列的抽象表示。数据从A端流向B端与从B端流向A端是不一样的，因此，流是有方向的。A端输入数据到B端，对B就是输入流，得到的对象就是可读流；对A就是输出端、得到的对象是可写流。有的流即可以读又可以写，如TCP连接，Socket连接等，称为读写流(<a href="http://nodejs.cn/api/stream.html#stream_class_stream_duplex" rel="nofollow noreferrer" target="_blank">Duplex</a>)。还有一种在读写过程中可以修改和变换数据的读写流称为<a href="http://nodejs.cn/api/stream.html#stream_class_stream_transform" rel="nofollow noreferrer" target="_blank">Transform</a>流。</p>
<p>在node中，这些流中的数据就是Buffer对象，可读、可写流会将数据存储到<strong>内部</strong>的缓存中，等待被消费；<a href="http://nodejs.cn/api/stream.html#stream_class_stream_duplex" rel="nofollow noreferrer" target="_blank">Duplex</a> 和 <a href="http://nodejs.cn/api/stream.html#stream_class_stream_transform" rel="nofollow noreferrer" target="_blank">Transform</a> 则是都维护了<strong>两个相互独立</strong>的缓存用于读和写。 在维持了合理高效的数据流的同时，也使得对于读和写可以独立进行而互不影响。</p>
<p>在node中，这四种流都是EventEmitter的实例，它们都有close、error事件，可读流具有监听数据到来的data事件等，可写流则具有监听数据已传给低层系统的finish事件等，<a href="http://nodejs.cn/api/stream.html#stream_class_stream_duplex" rel="nofollow noreferrer" target="_blank">Duplex</a> 和 <a href="http://nodejs.cn/api/stream.html#stream_class_stream_transform" rel="nofollow noreferrer" target="_blank">Transform</a> 都同时实现了 <a href="http://nodejs.cn/api/stream.html#stream_class_stream_readable" rel="nofollow noreferrer" target="_blank">Readable</a> 和 <a href="http://nodejs.cn/api/stream.html#stream_class_stream_writable" rel="nofollow noreferrer" target="_blank">Writable</a> 的事件和接口    。</p>
<p>值得一提的是writable的drain事件，这个事件表示<code>缓存的数据被排空了</code>。为什么有这个事件呢？起因是调用可写流的write和可读流的read都会有一个缓存区用来缓存写／读的数据，缓存区是有大小的，一旦写的内容超过这个大小，write方法就会返回false，表示写入停止，这时如果继续read完缓存区数据，缓存区被排空，就会触发drain事件，可以这样来防止缓存区爆仓：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data', function (chunk) {
    if (ws.write(chunk) === false) {
        rs.pause();
    }
});

rs.on('end', function () {
    ws.end();
});

ws.on('drain', function () {
    rs.resume();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> rs = fs.createReadStream(src);
<span class="hljs-keyword">var</span> ws = fs.createWriteStream(dst);

rs.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk</span>) </span>{
    <span class="hljs-keyword">if</span> (ws.write(chunk) === <span class="hljs-literal">false</span>) {
        rs.pause();
    }
});

rs.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ws.end();
});

ws.on(<span class="hljs-string">'drain'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    rs.resume();
});</code></pre>
<p>一些常见流分类：</p>
<ul>
<li><p>可写流：HTTP requests, on the client、HTTP responses, on the server、fs write streams、zlib streams、crypto streams、TCP sockets、child process stdin、process.stdout, process.stderr</p></li>
<li><p>可读流：HTTP responses, on the client、HTTP requests, on the server、fs read streams、zlib streams、crypto streams、TCP sockets、child process stdout and stderr、process.stdin</p></li>
<li><p>可读可写流：TCP sockets、zlib streams、crypto streams</p></li>
<li><p>变换流：zlib streams、crypto streams</p></li>
</ul>
<p>另外，提到流就不得不提到<strong>管道</strong>的概念，这个概念也非常形象：水流从一端到另一端流动需要管道作为通道或媒介。流也是这样，数据在端之间的传送也需要管道，在node中是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将 readable 中的所有数据通过管道传递给名为 file.txt 的文件
const readable = getReadableStreamSomehow();
const writable = getWritableStreamSomehow('file.txt');
// readable 中的所有数据都传给了 'file.txt'
readable.pipe(writable);

// 对流进行链式地管道操作
const r = fs.createReadStream('file.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 将 readable 中的所有数据通过管道传递给名为 file.txt 的文件</span>
<span class="hljs-keyword">const</span> readable = getReadableStreamSomehow();
<span class="hljs-keyword">const</span> writable = getWritableStreamSomehow(<span class="hljs-string">'file.txt'</span>);
<span class="hljs-comment">// readable 中的所有数据都传给了 'file.txt'</span>
readable.pipe(writable);

<span class="hljs-comment">// 对流进行链式地管道操作</span>
<span class="hljs-keyword">const</span> r = fs.createReadStream(<span class="hljs-string">'file.txt'</span>);
<span class="hljs-keyword">const</span> z = zlib.createGzip();
<span class="hljs-keyword">const</span> w = fs.createWriteStream(<span class="hljs-string">'file.txt.gz'</span>);
r.pipe(z).pipe(w);</code></pre>
<p>注意，只有可读流才具有pipe能力，可写流作为目的地。</p>
<p>pipe不仅可以作为通道，还能很好的控制管道里的流，控制读和写的平衡，不让任一方过度操作。另外，pipe可以监听可读流的data、end事件，这样就可以构建快速的响应：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个文件下载的例子，使用回调函数的话需要等到服务器读取完文件才能向浏览器发送数据
var http = require('http') ;
var fs = require('fs') ;
var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    }) ;
}) ;
server.listen(8888) ;

// 而采用流的方式，只要建立连接，就会接受到数据，不用等到服务器缓存完data.txt
var http = require('http') 
var fs = require('fs') 
var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt') 
    stream.pipe(res) 
}) 
server.listen(8888) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 一个文件下载的例子，使用回调函数的话需要等到服务器读取完文件才能向浏览器发送数据</span>
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>) ;
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>) ;
<span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    fs.readFile(__dirname + <span class="hljs-string">'/data.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data</span>) </span>{
        res.end(data);
    }) ;
}) ;
server.listen(<span class="hljs-number">8888</span>) ;

<span class="hljs-comment">// 而采用流的方式，只要建立连接，就会接受到数据，不用等到服务器缓存完data.txt</span>
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>) 
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>) 
<span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> stream = fs.createReadStream(__dirname + <span class="hljs-string">'/data.txt'</span>) 
    stream.pipe(res) 
}) 
server.listen(<span class="hljs-number">8888</span>) </code></pre>
<p>因此，使用pipe即可解决上面那个爆仓问题。</p>
<h3 id="articleHeader3">fs文件模块</h3>
<p>fs文件模块是高阶模块，继承了EventEmitter、stream、path等底层模块，提供了对文件的操作，包括文件的读取、写入、更名、删除、遍历目录、链接POSIX文件系统等操作。与node设计思想和其他模块不同的是，fs模块中的所有操作都提供了<strong>异步和同步</strong>两个版本。fs模块主要由下面几部分组成:</p>
<ul>
<li><p>对底层POSIX文件系统的封装,对应于操作系统的原生文件操作</p></li>
<li><p>继承Stream的文件流 fs.createReadStream和fs.createWriteStream</p></li>
<li><p>同步文件操作方法，如fs.readFileSync、fs.writeFileSync</p></li>
<li><p>异步文件操作方法， fs.readFile和fs.writeFile</p></li>
</ul>
<p>模块API架构如下：</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/remote/1460000004957227" src="https://static.alili.techhttps://segmentfault.com/img/remote/1460000004957227" alt="fs主要操作" title="fs主要操作" style="cursor: pointer; display: inline;"></span></p>
<p><strong>读写操作：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs'); // 引入fs模块
/* 读文件 */

// 使用流
const read = fs.createReadStream('sam.js',{encoding:'utf8'});
read.on('data',(str)=>{
    console.log(str);
})
// 使用readFile
fs.readFile('test.txt', {}, function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
});
// open + read
fs.open('test.txt','r',(err, fd) => {
    fs.fstat(fd,(err,stat)=>{
        var len = stat.size;  //检测文件长度
        var buf = new Buffer(len);
        fs.read(fd,buf,0,len,0,(err,bw,buf)=>{
            console.log(buf.toString('utf8'));
            fs.close(fd);
        })
    });
});

/* 写文件与读取文件API形式类似 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>); <span class="hljs-comment">// 引入fs模块</span>
<span class="hljs-comment">/* 读文件 */</span>

<span class="hljs-comment">// 使用流</span>
<span class="hljs-keyword">const</span> read = fs.createReadStream(<span class="hljs-string">'sam.js'</span>,{<span class="hljs-attr">encoding</span>:<span class="hljs-string">'utf8'</span>});
read.on(<span class="hljs-string">'data'</span>,(str)=&gt;{
    <span class="hljs-built_in">console</span>.log(str);
})
<span class="hljs-comment">// 使用readFile</span>
fs.readFile(<span class="hljs-string">'test.txt'</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">throw</span> err;
    }
    <span class="hljs-built_in">console</span>.log(data);
});
<span class="hljs-comment">// open + read</span>
fs.open(<span class="hljs-string">'test.txt'</span>,<span class="hljs-string">'r'</span>,(err, fd) =&gt; {
    fs.fstat(fd,(err,stat)=&gt;{
        <span class="hljs-keyword">var</span> len = stat.size;  <span class="hljs-comment">//检测文件长度</span>
        <span class="hljs-keyword">var</span> buf = <span class="hljs-keyword">new</span> Buffer(len);
        fs.read(fd,buf,<span class="hljs-number">0</span>,len,<span class="hljs-number">0</span>,(err,bw,buf)=&gt;{
            <span class="hljs-built_in">console</span>.log(buf.toString(<span class="hljs-string">'utf8'</span>));
            fs.close(fd);
        })
    });
});

<span class="hljs-comment">/* 写文件与读取文件API形式类似 */</span></code></pre>
<p>读/写文件都有三种方式，那么区别是什么呢？</p>
<ul>
<li><p>createReadStream/createWriteStream创建一个将文件内容读取为流数据的ReadStream对象，这个方法主要目的就是把数据读入到流中，得到是可读流，方便以流进行操作</p></li>
<li><p>readFile/writeFile：Node.js会将文件内容视为一个整体，为其分配缓存区并且一次性将文件内容读/写取到缓存区中，在这个期间，Node.js将不能执行任何其他处理，所以当读写大文件的时候，有可能造成缓存区“爆仓”</p></li>
<li><p>read/write读/写文件内容是不断地将文件中的一小块内容读/写入缓存区，最后从该缓存区中读取文件内容</p></li>
</ul>
<p>同步API也是如此。其中最常用的是readFile，读取大文件则采取用，read则提供更为细节、底层的操作，而且read要配合open。</p>
<p><strong>获取文件的状态：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fs.stat('eda.txt', (err, stat) => {
  if (err)
    throw err
  console.log(stat)
})
/* 
Stats {
  dev: 16777220,
  mode: 33279,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4194304,
  ino: 4298136825,
  size: 0,
  blocks: 0,
  atimeMs: 1510317983760.94, - 文件数据最近被访问的时间
  mtimeMs: 1510317983760.94, - 文件数据最近被修改的时间。
  ctimeMs: 1510317983777.8538, - 文件状态最近更改的时间
  birthtimeMs: 1509537398000,
  atime: 2017-11-10T12:46:23.761Z,
  mtime: 2017-11-10T12:46:23.761Z,
  ctime: 2017-11-10T12:46:23.778Z,
  birthtime: 2017-11-01T11:56:38.000Z 
}*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fs.stat(<span class="hljs-string">'eda.txt'</span>, (err, stat) =&gt; {
  <span class="hljs-keyword">if</span> (err)
    <span class="hljs-keyword">throw</span> err
  <span class="hljs-built_in">console</span>.log(stat)
})
<span class="hljs-comment">/* 
Stats {
  dev: 16777220,
  mode: 33279,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4194304,
  ino: 4298136825,
  size: 0,
  blocks: 0,
  atimeMs: 1510317983760.94, - 文件数据最近被访问的时间
  mtimeMs: 1510317983760.94, - 文件数据最近被修改的时间。
  ctimeMs: 1510317983777.8538, - 文件状态最近更改的时间
  birthtimeMs: 1509537398000,
  atime: 2017-11-10T12:46:23.761Z,
  mtime: 2017-11-10T12:46:23.761Z,
  ctime: 2017-11-10T12:46:23.778Z,
  birthtime: 2017-11-01T11:56:38.000Z 
}*/</span></code></pre>
<p><strong>监听文件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const FSWatcher = fs.watch('eda.txt', (eventType, filename) => {
    console.log(`${eventType}`)
})
FSWatcher.on('change', (eventType, filename) => {
    console.log(`${filename}`)
})
// watch和返回的FSWatcher实例的回调函数都绑定在了 change 事件上

fs.watchFile('message.text', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> FSWatcher = fs.watch(<span class="hljs-string">'eda.txt'</span>, (eventType, filename) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${eventType}</span>`</span>)
})
FSWatcher.on(<span class="hljs-string">'change'</span>, (eventType, filename) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${filename}</span>`</span>)
})
<span class="hljs-comment">// watch和返回的FSWatcher实例的回调函数都绑定在了 change 事件上</span>

fs.watchFile(<span class="hljs-string">'message.text'</span>, (curr, prev) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`the current mtime is: <span class="hljs-subst">${curr.mtime}</span>`</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`the previous mtime was: <span class="hljs-subst">${prev.mtime}</span>`</span>);
})</code></pre>
<p>监听文件仍然有两种方法：</p>
<ul>
<li><p>watch 调用的是底层的API来监视文件，很快，可靠性也较高</p></li>
<li><p>watchFile 是通过不断轮询 <code>fs.Stat</code> （文件的统计数据）来获取被监视文件的变化，较慢，可靠性较低，另外回调函数的参数是 <code>fs.Stat</code> 实例</p></li>
</ul>
<p>因此尽可能多的使用watch，watchFile 用于需要得到文件更多信息的场景。</p>
<p><strong>其他</strong></p>
<p>创建、删除、复制、移动、重命名、检查文件、修改权限...</p>
<h2 id="articleHeader4">总结</h2>
<p>由Buffer到Stream，再到fs文件模块，将它们串联起来能对整块知识有更清晰的认识，也对webpack、gulp等前端自动化工具构建工作流的机制和实现有了更深的了解。学习其他知识亦是如此——知道来龙去脉，知道为什么会存在，知道它们之间的联系，就能让碎片化的知识串联起来，能让它们make sense，能够让自己“上的厅堂、下得厨房”。</p>
<p>参考：</p>
<p><a href="https://segmentfault.com/a/1190000004957223">nodeJs高阶模块--fs</a></p>
<p><a href="https://github.com/yjhjstz/deep-into-node/blob/master/chapter11/chapter11-4.md" rel="nofollow noreferrer" target="_blank">deep into node</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
认识node核心模块--从Buffer、Stream到fs

## 原文链接
[https://segmentfault.com/a/1190000011968267](https://segmentfault.com/a/1190000011968267)

