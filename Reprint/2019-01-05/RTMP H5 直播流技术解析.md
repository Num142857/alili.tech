---
title: 'RTMP H5 直播流技术解析' 
date: 2019-01-05 2:30:11
hidden: true
slug: zc5xuuk9j7
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇文章简单阐述了，在 H5 中，做直播需要哪些技术知识点，有哪些直播流协议和技术。通过对比，本篇主要聚焦于 RTMP 直播协议的相关内容，也就是说，本篇将会直接进行实际操作 Buffer 的练习和相关的学习。</p>
<h2 id="articleHeader0">RTMP 是什么</h2>
<p>RTMP 全称即是 <code>Real-Time Messaging Protocol</code>。顾名思义就是用来作为实时通信的一种协议。该协议是 Adobe 搞出来的。主要是用来传递音视频流的。它通过一种自定义的协议，来完成对指定直播流的播放和相关的操作。和现行的直播流相比，RTMP 主要的特点就是高效，这里，我就不多费口舌了。我们先来了解一下 RTMP 是如何进行握手的。</p>
<h2 id="articleHeader1">RTMP 握手</h2>
<p>RTMP 是基于 TCP 三次握手之后的，所以，RTMP 不是和 TCP 一个 level 的。它本身是基于 TCP 的可靠性连接。RTMP 握手的方式如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519576" src="https://static.alili.tech/img/remote/1460000010519576" alt="image.png-50.3kB" title="image.png-50.3kB" style="cursor: pointer; display: inline;"></span></p>
<p>（C 代表 Client，S 代表 Server）</p>
<p>它主要是通过两端的字段内容协商，来完成可信度认证的。基本过程如下：</p>
<ul>
<li><p>client: 客户端需要发 3 个包。C0,C1,C2</p></li>
<li><p>server: 服务端也需要发同样 3 个包。 S0,S1,S2。</p></li>
</ul>
<p>整个过程如上图所述，但实际上有些细节需要注意。</p>
<p>握手开始：</p>
<p>【1】 客户端发送 C0,C1 包</p>
<p>此时，客户端处于等待状态。客户端有两个限制：</p>
<ul>
<li><p>客户端在未接受到 S1 之前不能发送 C2 包</p></li>
<li><p>客户端在未接收到 S2 之前不能发送任何实际数据包</p></li>
</ul>
<p>【2】 服务端在接受到 C0，发送 S0，S1 包。也可以等到接受到 C1 之后再一起发送，C1 包的等待不是必须的。</p>
<p>此时，服务端处于等待状态。服务端有两个限制：</p>
<ul>
<li><p>服务端在未接受到 C1 之前不能发送 S2.</p></li>
<li><p>服务端在未接收到 C2 之前不能发送任何实际数据包</p></li>
</ul>
<p>【3】客户端接受到 S1/S0 包后，发送 C2 包。</p>
<p>【4】服务端接受到 C2 包后，返回 S2 包，并且此时握手已经完成。</p>
<p>不过，在实际应用中，并不是严格按照上面的来。因为 RTMP 并不是强安全性的协议，所以，S2/C2 包只需要 C1/S1 中的内容，就可以完成内容的拼接。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519577" src="https://static.alili.tech/img/remote/1460000010519577" alt="实际握手" title="实际握手" style="cursor: pointer;"></span></p>
<p>这么多限制，说白了，其实就是一种通用模式：</p>
<ul>
<li><p>C0+C1</p></li>
<li><p>S0+S1+S2</p></li>
<li><p>C2</p></li>
</ul>
<p>接下来，我们来具体看看 C/S 012 包分别代表什么。</p>
<h3 id="articleHeader2">C0 &amp;&amp; S0</h3>
<p>C0 和 S0 其实区别不大，我这里主要讲解一下 C0，就差不多了。首先，C0 的长度为 1B。它的主要工作是确定 RTMP 的版本号。</p>
<ul>
<li><p>C0：客户端发送其所支持的 RTMP 版本号：3~31。一般都是写 3。</p></li>
<li><p>S1：服务端返回其所支持的版本号。如果没有客户端的版本号，默认返回 3。</p></li>
</ul>
<h3 id="articleHeader3">C1 &amp;&amp; S1</h3>
<p>C1/S1 长度为 1536B。主要目的是确保握手的唯一性。格式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519578" src="https://static.alili.tech/img/remote/1460000010519578" alt="image.png-107kB" title="image.png-107kB" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>time: 发送时间戳，这个其实不是很重要，不过需要记住，不要超出 4B 的范围即可。</p></li>
<li><p>zero: 保留值 0.</p></li>
<li><p>random: 该字段长尾 1528B。主要内容就是随机值，不管你用什么产生都可以。它主要是为了保证此次握手的唯一性，和确定握手的对象。</p></li>
</ul>
<h3 id="articleHeader4">C2 &amp;&amp; S2</h3>
<p>C2/S2 的长度也是 1536B。相当于就是 S1/C1 的响应值。上图也简单说明了就是，对应 C1/S1 的 Copy 值，不过第二个字段有区别。基本格式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519579" src="https://static.alili.tech/img/remote/1460000010519579" alt="image.png-105.1kB" title="image.png-105.1kB" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>time: 时间戳，同上，也不是很重要</p></li>
<li><p>time2: C1/S1 发送的时间戳。</p></li>
<li><p>random: S1/C1 发送的随机数。长度为 1528B。</p></li>
</ul>
<p>这里需要提及的是，RTMP 默认都是使用 Big-Endian 进行写入和读取，除非强调对某个字段使用 Little-Endian 字节序。</p>
<p>上面握手协议的顺序也是根据其中相关的字段来进行制定的。这样，看起来很容易啊哈，但是，我们并不仅仅停留在了解，而是要真正的了解，接下来，我们来实现一下，如果通过 Buffer 来进行 3 次握手。这里，我们作为 Client 端来进行请求的发起，假设 Server 端是按照标准进行发送即可。</p>
<h2 id="articleHeader5">Buffer 实操握手</h2>
<p>我们使用 Buffer 实操主要涉及两块，一个块是 request server 的搭建，还有一块是 Buffer 的拼接。</p>
<h3 id="articleHeader6">Request Server 搭建</h3>
<p>这里的 Server 是直接使用底层的 TCP 连接。</p>
<p>如下，一个简易的模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const client = new net.Socket();

client.connect({
    port: 1935,
    host: &quot;6721.myqcloud.com&quot;},
    ()=>{
        console.log(&quot;connected&quot;);
    });
    
client.on('data',(data)=>{
    client.write('hello');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const client = <span class="hljs-keyword">new</span> net.Socket();

client.connect({
    port: <span class="hljs-number">1935</span>,
    host: <span class="hljs-string">"6721.myqcloud.com"</span>},
    <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"connected"</span>);
    });
    
client.<span class="hljs-literal">on</span>(<span class="hljs-string">'data'</span>,<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{
    client.write(<span class="hljs-string">'hello'</span>);
});</code></pre>
<p>不过，为了更好的进行实际演练，我们通过 <code>EventEmitter</code> 的方式，来做一个筛选器。这里，我们使用 <a href="https://github.com/developit/mitt" rel="nofollow noreferrer" target="_blank">mitt</a> 模块来做代理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Emitter = require('mitt')();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">const Emitter</span> = require(<span class="hljs-string">'mitt'</span>)();</code></pre>
<p>然后，我们只要分析的就是将要接受到的 S0/1/2 包。根据上面的字节包图，可以清楚的知道包里面的详细内容。这里，为了简单起见，我们排除其他协议的包头，只是针对 RTMP 里面的包。而且，我们针对的只有 3 种包，S0/1/2。为了达到这种目的，我们需要在 <code>data</code> 时间中，加上相应的钩子才行。</p>
<p>这里，我们借用 Now 直播的 RTMP 流来进行相关的 RTMP 直播讲解。</p>
<h3 id="articleHeader7">Buffer 操作</h3>
<p>Server 的搭建其实上网搜一搜，应该都可以搜索出来。关键点在于，如何针对 RTMP 的实操握手进行 encode/decode。所以，这里，我们针对上述操作，来主要讲解一下。</p>
<p>我们主要的工作量在于如何构造出 C0/1/2。根据上面格式的描述，大家应该可以清楚的知道 C0/1/2 里面的格式分别有啥。</p>
<p>比如，C1 中的 time 和 random，其实并不是必须字段，所以，为了简单起见，我们可以默认设为 0。具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class C {
    constructor() {
        this.time;
        this.random;
    }
    C0() {
        let buf = Buffer.alloc(1);
        buf[0] = 3;
        return buf;
    }
    C1() {
        let buf = Buffer.alloc(1536);
        return buf;
    }
    /**
     * write C2 package
     * @param {Number} time the 4B Number of time
     * @param {Buffer} random 1528 byte
     */
    produceC2(){
        let buf = Buffer.alloc(1536);
        // leave empty value as origin time
        buf.writeUInt32BE(this.time, 4);
        this.random.copy(buf,8,0,1528);

        return buf;
    }
    get getC01(){
        return Buffer.concat([this.C0(),this.C1()]);
    }
    get C2(){
        return this.produceC2();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.time;
        <span class="hljs-keyword">this</span>.random;
    }
    C0() {
        let buf = Buffer.alloc(<span class="hljs-number">1</span>);
        buf[<span class="hljs-number">0</span>] = <span class="hljs-number">3</span>;
        <span class="hljs-keyword">return</span> buf;
    }
    C1() {
        let buf = Buffer.alloc(<span class="hljs-number">1536</span>);
        <span class="hljs-keyword">return</span> buf;
    }
    <span class="hljs-comment">/**
     * write C2 package
     * <span class="hljs-doctag">@param</span> {Number} time the 4B Number of time
     * <span class="hljs-doctag">@param</span> {Buffer} random 1528 byte
     */</span>
    produceC2(){
        let buf = Buffer.alloc(<span class="hljs-number">1536</span>);
        <span class="hljs-comment">// leave empty value as origin time</span>
        buf.writeUInt32BE(<span class="hljs-keyword">this</span>.time, <span class="hljs-number">4</span>);
        <span class="hljs-keyword">this</span>.random.copy(buf,<span class="hljs-number">8</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1528</span>);

        <span class="hljs-keyword">return</span> buf;
    }
    <span class="hljs-keyword">get</span> getC01(){
        <span class="hljs-keyword">return</span> Buffer.concat([<span class="hljs-keyword">this</span>.C0(),<span class="hljs-keyword">this</span>.C1()]);
    }
    <span class="hljs-keyword">get</span> C2(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.produceC2();
    }
}</code></pre>
<p>接下来，我们来看一下，结合 server 完成的 RTMP 客户端服务。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Client = new net.Socket();
const RTMP_C = new C();


Client.connect({
    port: 1935,
    host: &quot;6721.liveplay.myqcloud.com&quot;
}, () => {
    console.log('connected')
    Client.write(RTMP_C.getC01);

});

Client.on('data',res=>{
    if(!res){
        console.warn('received empty Buffer ' + res);
        return;
    }
    // start to decode res package
    if(!RTMP_C.S0 &amp;&amp; res.length>0){
        RTMP_C.S0 = res.readUInt8(0);
        res = res.slice(1);
    }

    if(!RTMP_C.S1 &amp;&amp; res.length>=1536){
        RTMP_C.time = res.readUInt32BE(0);
        RTMP_C.random = res.slice(8,1536);
        RTMP_C.S1 = true;
        res = res.slice(1536);
        console.log('send C2');
        Client.write(RTMP_C.C2);
    }

    if(!RTMP_C.S2 &amp;&amp; res.length >= 1536){
        RTMP_C.S2 = true;
        res = res.slice(1536);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">Client</span> = <span class="hljs-keyword">new</span> net.Socket();
<span class="hljs-keyword">const</span> RTMP_C = <span class="hljs-keyword">new</span> C();


<span class="hljs-built_in">Client</span>.<span class="hljs-built_in">connect</span>({
    port: <span class="hljs-number">1935</span>,
    host: <span class="hljs-string">"6721.liveplay.myqcloud.com"</span>
}, () =&gt; {
    console.log(<span class="hljs-string">'connected'</span>)
    <span class="hljs-built_in">Client</span>.<span class="hljs-built_in">write</span>(RTMP_C.getC01);

});

<span class="hljs-built_in">Client</span>.on(<span class="hljs-string">'data'</span>,res=&gt;{
    <span class="hljs-built_in">if</span>(!res){
        console.warn(<span class="hljs-string">'received empty Buffer '</span> + res);
        <span class="hljs-built_in">return</span>;
    }
    <span class="hljs-comment">// start to decode res package</span>
    <span class="hljs-built_in">if</span>(!RTMP_C.S0 &amp;&amp; res.length&gt;<span class="hljs-number">0</span>){
        RTMP_C.S0 = res.readUInt8(<span class="hljs-number">0</span>);
        res = res.slice(<span class="hljs-number">1</span>);
    }

    <span class="hljs-built_in">if</span>(!RTMP_C.S1 &amp;&amp; res.length&gt;=<span class="hljs-number">1536</span>){
        RTMP_C.time = res.readUInt32BE(<span class="hljs-number">0</span>);
        RTMP_C.<span class="hljs-built_in">random</span> = res.slice(<span class="hljs-number">8</span>,<span class="hljs-number">1536</span>);
        RTMP_C.S1 = true;
        res = res.slice(<span class="hljs-number">1536</span>);
        console.log(<span class="hljs-string">'send C2'</span>);
        <span class="hljs-built_in">Client</span>.<span class="hljs-built_in">write</span>(RTMP_C.C2);
    }

    <span class="hljs-built_in">if</span>(!RTMP_C.S2 &amp;&amp; res.length &gt;= <span class="hljs-number">1536</span>){
        RTMP_C.S2 = true;
        res = res.slice(<span class="hljs-number">1536</span>);
    }
})</code></pre>
<p>详细代码可以参考 <a href="https://gist.github.com/JimmyVV/192fd9e45e3bd1ea7c88112a6c9e959c" rel="nofollow noreferrer" target="_blank">gist</a><button class="btn btn-xs btn-default ml10 preview" data-url="JimmyVV/192fd9e45e3bd1ea7c88112a6c9e959c" data-typeid="1">点击预览</button>。</p>
<h2 id="articleHeader8">RTMP 基本架构</h2>
<p>RTMP 整个内容，除了握手，其实剩下的就是一些列围绕 type id 的 message。为了让大家更清楚的看到整个架构，这里简单陈列了一份框架：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519580" src="https://static.alili.tech/img/remote/1460000010519580" alt="image.png-94.9kB" title="image.png-94.9kB" style="cursor: pointer;"></span></p>
<p>在 Message 下的 3 个一级子 Item 就是我们现在将要大致讲解的内容。</p>
<p>可以看到上面所有的 item 都有一个共同的父 Item--Message。它的基本结构为：</p>
<ul>
<li><p>Header: header 部分用来标识不同的 typeID，告诉客户端相应的 Message 类型。另外，还有个功效就是多路分发。</p></li>
<li><p>Body: Body 内容就是相应发送的数据。这个根据不同的 typeID 来说，格式就完全不一样了。</p></li>
</ul>
<p>下面，我们先了解一下 Header 和不同 typeID 的内容：</p>
<h3 id="articleHeader9">Header</h3>
<p>RTMP 中的 Header 分为 Basic Header 和 Message Header。需要注意，他们两者并不是独立的，而是相互联系。Message Header 的结构由 Basic Header 的内容来决定。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519581" src="https://static.alili.tech/img/remote/1460000010519581" alt="image.png-41kB" title="image.png-41kB" style="cursor: pointer;"></span></p>
<p>接下来，先分开来讲解：</p>
<h4>Basic Header</h4>
<p>BH（基础头部）主要是定义了该 chunk stream ID 和 chunk type。需要注意的是，BH 是变长度的，即，它的长度范围是 1-3B。怎么讲呢？就是根据不同的 chunk stream ID 来决定具体的长度。CS ID（Chunk Stream ID）本身的支持的范围为 &lt;= 65597 ，差不多为 22bit。当然，为了节省这 3B 的内容。 Adobe 搞了一个比较绕的理论，即，通过如下格式中的 CS ID 来确定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  0 1 2 3 4 5 6 7
 +-+-+-+-+-+-+-+-+
 |fmt|   cs id   |
 +-+-+-+-+-+-+-+-+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>  <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span> <span class="hljs-number">7</span>
 +-+-+-+-+-+-+-+-+
 |fmt|   cs id   |
 +-+-+-+-+-+-+-+-+</code></pre>
<p>即，通过 2-7 bit 位来确定整个 BH 的长度。怎么确定呢？</p>
<p>RTMP 规定，CS ID 的 0，1，2 为保留字，你在设置 CS ID 的时候只能从 3 开始。</p>
<ul><li><p>CS ID: 0 ==&gt; 整个 BH 长为 2B，其中可以表示的 Stream ID 数量为 64-319。例如：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  0 1
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |fmt|    0    |    cs id - 64   |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>  <span class="hljs-number">0</span> <span class="hljs-number">1</span>
  <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span> <span class="hljs-number">7</span> <span class="hljs-number">8</span> <span class="hljs-number">9</span> <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span>
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |fmt|    <span class="hljs-number">0</span>    |    cs id - <span class="hljs-number">64</span>   |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</code></pre>
<p>注意上面的 cs id - 64。这个代表的就是，你通过切割第二个 byte 时，是将得到的值加上 64。即：<code>2th byte + 64 = CS ID</code></p>
<ul><li><p>CS ID: 1 ==&gt; 整个 BH 长为 3B。可以存储的 Stream ID 数量为 64-65599。例如：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |fmt|    1      |           cs id - 64          |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>  <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span> <span class="hljs-number">7</span> <span class="hljs-number">8</span> <span class="hljs-number">9</span> <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span> <span class="hljs-number">7</span> <span class="hljs-number">8</span> <span class="hljs-number">9</span> <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span>
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |fmt|    <span class="hljs-number">1</span>      |           cs id - <span class="hljs-number">64</span>          |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</code></pre>
<p>当然，后面 CS ID 的计算方法也是最后的结果加上 64。</p>
<ul><li><p>CS ID &gt;2 ==&gt; 整个 BH 长为 1B。可以存储的 Stream ID 数量为  3-63。例如：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  0 1 2 3 4 5 6 7
 +-+-+-+-+-+-+-+-+
 |fmt|  cs id    |
 +-+-+-+-+-+-+-+-+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>  <span class="hljs-number">0</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span> <span class="hljs-number">7</span>
 +-+-+-+-+-+-+-+-+
 |fmt|  cs id    |
 +-+-+-+-+-+-+-+-+</code></pre>
<p>最后强调一下，因为 RTMP 规定，CS ID 的 0,1,2 为保留字，所以，0,1,2 不作为 CS ID。综上所述，CS ID 的起始位为 3（并不代表它是 3 个 Stream）。</p>
<p>上面我并没有提到 fmt 字段，这其实是用来定义 Message Header 的。</p>
<h4>Message Header</h4>
<p>根据前面 BH 中 fmt 字段的定义，可以分为 4 种 MH（Message Header）。或者说，就是一种 MH 格式会存在从繁到简 4 种：</p>
<p><strong>fmt: 0</strong></p>
<p>当 fmt 为 0 时，MH 的长度为 11B。该类型的 MH 必须要流的开头部分，这包括当进行快退或者点播时重新获取的流。该结构的整体格式如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519582" src="https://static.alili.tech/img/remote/1460000010519582" alt="image.png-58.8kB" title="image.png-58.8kB" style="cursor: pointer; display: inline;"></span></p>
<p>也就是说，当 fmt 为 0 时，其格式是一个完整的 MH。</p>
<ul>
<li><p>timestamp 是绝对时间戳。用来代表当前流编码。</p></li>
<li><p>message length: 3B, 发送 message 的长度。</p></li>
<li><p>type id: 1B</p></li>
<li><p>stream id: 4B, 发送 message stream id 的值。是 little-endian 写入格式！</p></li>
</ul>
<p><strong>fmt: 1</strong></p>
<p>当 fmt 为 1 时，MH 的长度为 7B。该类型的 MH 不带 msg stream id。msg stream id 由前面一个 package 决定。该数值主要由前一个 fmt 为 0 的 MH 决定。该类型的 MH 通常放在 fmt 为 0 之后。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519583" src="https://static.alili.tech/img/remote/1460000010519583" alt="image.png-16.7kB" title="image.png-16.7kB" style="cursor: pointer;"></span></p>
<p><strong>fmt: 2</strong></p>
<p>当 fmt 为 2 时，MH 的长度为 3B。该类型的 MH 只包括一个 timestamp delta 字段。其它的信息都是依照前面一个其他类型 MH 决定的。</p>
<p><strong>fmt: 3</strong></p>
<p>当 fmt 为 3时，这其实 RTMP 里面就没有了 MH。官方定义，该类型主要全部都是 payload 的 chunk，其 Header 信息和第一个非 <code>type:3</code> 的头一致。因为这主要用于 chunk 中，这些 chunk 都是从一个包里面切割出来的，所以除了第一个 chunk 外，其它的 chunk 都可以采用这种格式。当 fmt 为 3时，计算它的 timestamp 需要注意几点，如果前面一个 chunk 里面存在 <code>timestrameDelta</code>，那么计算 fmt 为 3 的 chunk 时，就直接相加，如果没有，则是使用前一个 chunk 的 <code>timestamp</code> 来进行相加，用代码表示为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prevChunk.timeStamp += prevChunk.timeStampDelta || prevChunk.timeStamp;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;">prevChunk.timeStamp += prevChunk.timeStampDelta <span class="hljs-string">|| prevChunk.timeStamp;</span></code></pre>
<p>不过，当 fmt: 3 的情况一般很难遇到。因为，他要求前面几个包必须存在 fmt 为 0/1/2 的情况。</p>
<p>接下来的就是 Message Body 部分。</p>
<h3 id="articleHeader10">Message Body</h3>
<p>上面说的主要是 Message Header 的公用部分，但是，对于具体的 RTMP Message 来说，里面的 type 会针对不同的业务场景有不同的格式。Message 全部内容如上图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519580" src="https://static.alili.tech/img/remote/1460000010519580" alt="image.png-94.9kB" title="image.png-94.9kB" style="cursor: pointer;"></span></p>
<p>这里，我们根据流程图的一级子 item 来展开讲解。</p>
<h4>PCM</h4>
<p>PCM 全称为：Protocol Control Messages（协议控制消息）。主要使用来沟通 RTMP 初始状态的相关连接信息，比如，windows size，chunk size 等。</p>
<p>PCM 中一共有 5 种不同的 Message 类型，是根据 Header 中的 type ID 决定的，范围是 1~6 （不包括 4）。另外，PCM 在构造的时候需要注意，它 Heaer 中的 message stream id 和 chunk stream id 需要设置为固定值：</p>
<ul>
<li><p>message stream ID 为 0</p></li>
<li><p>chunk stream ID 为 2</p></li>
</ul>
<p>如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519584" src="https://static.alili.tech/img/remote/1460000010519584" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<p>OK，我们接下来一个一个来介绍一下：</p>
<h5>Set Chunk Size（1）</h5>
<p>看名字大家应该都能猜到这类信息是用来干啥的。该类型的 PCM 就是用来设置 server 和 client 之间正式传输信息的 chunk 的大小，type ID 为 1。那这有啥用呢？</p>
<p>SCS（Set Chunk Size） 是针对正式发送数据而进行数据大小的发送限制。一般默认为 128B。不过，如果 server 觉得太小了，想发送更大的包给你，比如 132B，那么 server 就需要给你发送一个 SCS，告知你，接下来“我发送给你的数据大小是 132B”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519585" src="https://static.alili.tech/img/remote/1460000010519585" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<ul>
<li><p>0: 只能设为 0 ，用来表示当前的 PCM 的类型。</p></li>
<li><p>chunk size: 用来表示后面发送正式数据时的大小。范围为 1-16777215。</p></li>
</ul>
<p>如下，提供过 wireshark 抓包的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519586" src="https://static.alili.tech/img/remote/1460000010519586" alt="image.png-45.4kB" title="image.png-45.4kB" style="cursor: pointer;"></span></p>
<h5>Abort Message（2）</h5>
<p>该类 PCM 是用来告诉 client，丢弃指定的 stream 中，已经加载到一半或者还未加载完成的 Chunk Message。它需要指定一个 chunk stream ID。</p>
<p>基本格式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519587" src="https://static.alili.tech/img/remote/1460000010519587" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<ul><li><p>chunk stream id: 指定丢弃 chunk message 的 stream</p></li></ul>
<h5>Acknowledgement（3）</h5>
<p>该协议信息其实就是一个 ACK 包，在实际使用是并没有用到，它主要是用来作为一个 ACK 包，来表示两次 ACK 间，接收端所能接收的最大字节数。</p>
<p>它基本格式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519588" src="https://static.alili.tech/img/remote/1460000010519588" alt="image.png-52.1kB" title="image.png-52.1kB" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>sequence number[4B]: 大小为 4B</p></li></ul>
<p>不过，该包在实际应用中，没有多高的出现频率。</p>
<h5>Window Acknowledgement Size（5）</h5>
<p>这是用来协商发送包的大小的。这个和上面的 <code>chunk size</code> 不同，这里主要针对的是客户端可接受的最大数据包的值，而 chunk size 是指每次发送的包的大小。也可以叫做 <code>window size</code>。一般电脑设置的大小都是 500000B。</p>
<p>详细格式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519589" src="https://static.alili.tech/img/remote/1460000010519589" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过，wireshark 抓包的结果为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519590" src="https://static.alili.tech/img/remote/1460000010519590" alt="image.png-56.2kB" title="image.png-56.2kB" style="cursor: pointer; display: inline;"></span></p>
<h5>Set Peer Bandwidth（6）</h5>
<p>这是 PCM 中，最后一个包。他做的工作主要是根据网速来改变发送包的大小。它的格式和 WAS 类似，不过后面带上了一个 <code>Type</code> 用来标明当前带宽限制算法。当一方接收到该信息后，如果设置的 window size 和前面的 WAS 不一致，需要返回一个 WAS 来进行显示改变。</p>
<p>基本格式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519591" src="https://static.alili.tech/img/remote/1460000010519591" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<p>其中 Limit Type 有 3 个取值：</p>
<ul>
<li><p>0: Hard，表示当前带宽需要和当前设置的 window size 匹配</p></li>
<li><p>1: Soft，将当前宽带设置为该信息定义的 window size，或者已经生效的 window size。主要取决于谁的 window size 更小</p></li>
<li><p>2: Dynamic，如果前一个 Limit Type 为 Hard 那么，继续使用 <code>Hard</code> 为基准，否则忽略该次协议信息。</p></li>
</ul>
<p>实际抓包情况可以参考：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519592" src="https://static.alili.tech/img/remote/1460000010519592" alt="image.png-56.8kB" title="image.png-56.8kB" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">UCM</h3>
<p>全称为：<code>User Control Message</code>（用户控制信息）。它的 Type ID 只能为 4。它主要是发送一些对视频的控制信息。其发送的条件也有一定的限制：</p>
<ul>
<li><p>msg stream ID 为 0</p></li>
<li><p>chunk stream ID 为 2</p></li>
</ul>
<p>它的 Body 部分的基本格式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519593" src="https://static.alili.tech/img/remote/1460000010519593" alt="UCM" title="UCM" style="cursor: pointer;"></span></p>
<p>UCM 根据 Event Type 的不同，对流进行不同的设置。它的 Event Type 一共有 6 种格式 <code>Stream Begin(0)</code>，<code>Stream EOF(1)</code>，<code>StreamDry(2)</code>，<code>SetBuffer Length(3)</code>，<code>StreamIs Recorded(4)</code>，<code>PingRequest(6)</code>，<code>PingResponse(7)</code>。</p>
<p>这里，根据重要性划分，只介绍 Begin，EOF，SetBuffer Length 这 3 种。</p>
<ul><li><p>Stream Begin: Event Type 为 0。它常常出现在，当客户端和服务端成功 <code>connect</code> 后发送。Event Data 为 4B，内容是已经可以正式用来传输数据的 Stream ID（实际没啥用）。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519594" src="https://static.alili.tech/img/remote/1460000010519594" alt="image.png-50.7kB" title="image.png-50.7kB" style="cursor: pointer;"></span></p>
<ul>
<li><p>Stream EOF: Event Type 为 1。它常常出现在，当音视频流已经全部传输完时。 Event Data 为 4B，用来表示已经发送完音视频流的 Stream ID（实际没啥用）。</p></li>
<li><p>Set Buffer Length: Event Type 为 3。它主要是为了通知服务端，每毫秒用来接收流中 Buffer 的大小。Event Data 的前 4B 表示 stream ID，后面 4B 表示每毫秒 Buffer 的大小。通常为 3000ms</p></li>
</ul>
<p>OK 剩下就是 Command Msg 里面的内容了。</p>
<h3 id="articleHeader12">Command Msg</h3>
<p>Command Msg 里面的内容，其 type id 涵盖了 8~22 之间的值。具体内容，可以参考下表：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519595" src="https://static.alili.tech/img/remote/1460000010519595" alt="image.png-184.3kB" title="image.png-184.3kB" style="cursor: pointer;"></span></p>
<p>需要注意，为什么有些选项里面有两个 id，这主要和 AMF 版本选择有关。第一个 ID 表示 AMF0 的编解码方式，第二个 ID 表示 AMF3 的编解码方式。<br>其中比较重要的是 command Msg，video，audio 这 3 个 Msg。为了让大家更好的理解 RTMP 流的解析，这里，先讲解一下 video 和 audio 两个 Msg。</p>
<h4>Video Msg</h4>
<p>因为 RTMP 是 Adobe 开发的。理所当然，内部的使用格式肯定是 FLV 格式。不过，这和没说一样。因为，FLV 格式内部有很多的 tag 和相关的描述信息。那么，RTMP 是怎么解决的呢？是直接传一整个 FLV 文件，还自定义协议来分段传输 FLV Tag 呢？</p>
<p>这个其实很好回答，因为 RTMP 协议是一个长连接，如果是传整个 FLV 文件，根本没必要用到这个，而且，RTMP 最常用在直播当中。直播中的视频都是分段播放的。综上所述，RTMP 是根据自己的自定义协议来分段传输 FLV Tag 的。那具体的协议是啥呢？</p>
<p>这个在 RTMP 官方文档中其实也没有给出。它只是告诉我们 Video Msg 的 type ID 是 9 而已。</p>
<p>因为，RTMP 只是一个传输工具，里面传什么还是由具体的流生成框架来决定的。所以，这里，我选择了一个非常具有代表性的 RTMP 直播流来进行讲解。</p>
<p>通过 wireshark 抓包，可以捕获到以下的 RTMP 包数据：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519596" src="https://static.alili.tech/img/remote/1460000010519596" alt="image.png-60kB" title="image.png-60kB" style="cursor: pointer;"></span></p>
<p>这里需要提及一点，因为 RTMP 是主动将 Video 和 Audio 分开传输，所以，它需要交叉发布 Video 和 Audio，以保证音视频的同步。那么具体每个 Video Data 里面的数据都是一样的吗？</p>
<p>如果看 Tag 的话，他们传输的都是 VideoData Tag。先看一下 FLV VideoData Tag 的内容：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519597" src="https://static.alili.tech/img/remote/1460000010519597" alt="image.png-141kB" title="image.png-141kB" style="cursor: pointer;"></span></p>
<p>这是 FLV Video 的协议格式。但，遇到第一个字段 <code>FrameType</code> 的时候，我们就可能懵逼了，这 TM 有 5 种情况，难道 RTMP 会给你 5 种不同的包吗？</p>
<p>答案是，有可能，但是，很大情况下，我们只需要支持 1/2 即可。因为，视频中最重要的是 I 帧，它对应的 FrameType 就是 1。而 B/P 则是剩下的 2。我们只要针对 1/2 进行软解，即可实现视频所有信息的获取。</p>
<p>所以，在 RTMP 中，也主要（或者大部分）都是传输上面两种 FrameType。我们通过实际抓包来讲解一下。</p>
<p>这是 KeyFrame 的包，注意 Buffer 开头的 <code>17</code> 数字。大家可以找到上面的 FrameType 对应找一找，看结果是不是一致的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519598" src="https://static.alili.tech/img/remote/1460000010519598" alt="image.png-155.8kB" title="image.png-155.8kB" style="cursor: pointer; display: inline;"></span></p>
<p>这是 Inter-frame 的包。同上，大家也可以对比一下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519599" src="https://static.alili.tech/img/remote/1460000010519599" alt="image.png-135.9kB" title="image.png-135.9kB" style="cursor: pointer; display: inline;"></span></p>
<h4>Audio Tag</h4>
<p>Aduio Tag 也是和 Video Tag 一样的蜜汁数据。通过观察 FLV Audio Tag 的内容：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519600" src="https://static.alili.tech/img/remote/1460000010519600" alt="image.png-224kB" title="image.png-224kB" style="cursor: pointer; display: inline;"></span></p>
<p>上面这些字段全是相关的配置值，换句话说，你必须实现知道这些值才行。这里，RTMP 发送 Audio Tag 和 Video Tag 有点不同。因为 Audio Tag 已经不可能再细分为 Config Tag，所以，RTMP 会直接传递 上面的 audio Tag 内容。详细可以参考抓包内容：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519601" src="https://static.alili.tech/img/remote/1460000010519601" alt="image.png-60.9kB" title="image.png-60.9kB" style="cursor: pointer; display: inline;"></span></p>
<p>这也是所有的 Audio Msg 的内容。</p>
<p>因为 Audio 和 Video 是分开发送的。所以，在后期进行拼接的时候，需要注意两者的同步。说道这里，顺便补充一下，音视频同步的相关知识点。</p>
<h4>音视频同步</h4>
<p>音视频同步简单来说有三种：</p>
<ul>
<li><p>以 Audio 为准，Video 同步 Audio</p></li>
<li><p>以 Video 为准，Audio 同步 Video</p></li>
<li><p>以外部时间戳为准，AV 同时同步</p></li>
</ul>
<p>主要过程变量参考就是 <code>timeStamp</code> 和 <code>duration</code>。因为，这里主要是做直播的，推荐大家采用第二种方法，以 <code>Video</code> 为准。因为，在实际开发中，会遇到 MP4 文件生成时，必须要求第一帧为 <code>keyframe</code>，这就造成了，以 Audio 为参考的，会遇到两个变量的问题。一个是 timeStamp 一个是 keyframe。当然，解决办法也是有的，就是检查最后一个拼接的 Buffer 是不是 Keyframe，然后判断是否移到下一次同步处理。</p>
<p>这里，我简单的说一下，以 Video 为准的同步方法。以 Video 同步，不需要管第一帧是不是 keyframe，也不需要关心 Audio 里面的数据，因为，Audio 数据是非常简单的 AAC 数据。下面我们通过伪代码来说明一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// known condition
video.timeStamp &amp;&amp; video.perDuration &amp;&amp; video.wholeDuration
audio.timeStamp &amp;&amp; audio.perDuration

// start
refDuration = video.timeStamp + video.wholeDuration
delta = refDuration - audio.timeStamp
audioCount = Math.round(delta/audio.perDuration);
audDemuxArr = this._tmpArr.splice(0,audioCount);

// begin to demux
this._remuxVideo(vidDemuxArr);
this._remuxAudio(audDemuxArr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// known condition</span>
video.timeStamp &amp;&amp; video.perDuration &amp;&amp; video.wholeDuration
audio.timeStamp &amp;&amp; audio.perDuration

<span class="hljs-comment">// start</span>
refDuration = video.timeStamp + video.wholeDuration
delta = refDuration - audio.timeStamp
audioCount = Math.round(delta/audio.perDuration);
audDemuxArr = <span class="hljs-keyword">this</span>._tmpArr.splice(<span class="hljs-number">0</span>,audioCount);

<span class="hljs-comment">// begin to demux</span>
<span class="hljs-keyword">this</span>._remuxVideo(vidDemuxArr);
<span class="hljs-keyword">this</span>._remuxAudio(audDemuxArr);</code></pre>
<p>上面算法可以避免判断 Aduio 和 Video timeStamp 的比较，保证 Video 一直在 Audio 前面并相差不远。下面，我们回到 RTMP 内容。来看看 Command Msg 里面的内容。</p>
<h4>Command Msg</h4>
<p>Command Msg 是 RTMP 里面的一个主要信息传递工具。常常用在 RTMP 前期和后期处理。Command Msg 是通过 AMF 的格式进行传输的（其实就是类似 JSON 的二进制编码规则）。Command Msg 主要分为 <code>net connect</code> 和 <code>net stream</code> 两大块。它的交流方式是双向的，即，你发送一次 <code>net connect</code> 或者 <code>stream</code> 之后，另外一端都必须返回一个 <code>_result</code> 或者 <code>_error</code> 以表示收到信息。详细结构可以参考下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519602" src="https://static.alili.tech/img/remote/1460000010519602" alt="image.png-58.4kB" title="image.png-58.4kB" style="cursor: pointer;"></span></p>
<p>后续，我们分为两块进行讲解：</p>
<ul>
<li><p>netConnection</p></li>
<li><p>netStream</p></li>
</ul>
<p>里面的 _result 和 _error 会穿插在每个包中进行讲解。</p>
<h4>NetConnection</h4>
<p>netConnection 可以分为 4 种 Msg，<code>connect</code>，<code>call</code>，<code>createStream</code>，<code>close</code>。</p>
<p><strong>connect</strong></p>
<p>connect 是客户端向 Server 端发送播放请求的。里面的字段内容有：</p>
<ul>
<li><p>Command Name[String]: 默认为 <code>connect</code>。表示信息名称</p></li>
<li><p>Transaction ID[Number]: 默认为 1。</p></li>
<li><p>Command Object: 键值对的形式存放相关信息。</p></li>
<li><p>Optional: 可选值。一般没有</p></li>
</ul>
<p>那，Command Object 里面又可以存放些什么内容呢？</p>
<ul>
<li><p>app[String]: 服务端连接应用的名字。这个主要根据你的 RTMP 服务器设定来设置。比如：<code>live</code>。</p></li>
<li><p>flashver[String]: Flash Player 的版本号。一般根据自己设备上的型号来确定即可。也可以设置为默认值：<code>LNX 9,0,124,2</code>。</p></li>
<li><p>tcUrl[String]: 服务端的 URL 地址。简单来说，就是 protocol://host/path。比如：<code>rtmp://6521.liveplay.myqcloud.com/live</code>。</p></li>
<li><p>fpad[Boolean]: 表示是否使用代理。一般为 false。</p></li>
<li><p>audioCodecs[Number]: 客户端支持的音频解码。后续会介绍。默认可以设置为 <code>4071</code></p></li>
<li><p>videoCodecs[Number]: 客户端支持的视频解码。有自定义的标准。默认可以设置为 <code>252</code></p></li>
<li><p>videoFunction[Number]: 表明在服务端上调用那种特别的视频函数。默认可以设置为 <code>1</code></p></li>
</ul>
<p>简单来说，Command Object 就是起到 RTMP Route 的作用。用来请求特定的资源路径。实际数据，可以参考抓包结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519603" src="https://static.alili.tech/img/remote/1460000010519603" alt="image.png-163.1kB" title="image.png-163.1kB" style="cursor: pointer;"></span></p>
<p>上面具体的取值主要是根据 rtmp 官方文档来决定。如果懒得查，可以直接使用上面的取值。上面的内容是兼容性比较高的值。当该包成功发送时，另外一端需要得到一个返回包来响应，具体格式为：</p>
<ul>
<li><p>Command Name[String]: 为 _result 或者 _error。</p></li>
<li><p>Transaction ID[Number]: 默认为 1。</p></li>
<li><p>Command Object: 键值对的形式存放相关信息。</p></li>
<li><p>Information[Object]: 键值对的形式，来描述相关的 response 信息。里面存在的字段有：level,code,description</p></li>
</ul>
<p>可以参考：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519604" src="https://static.alili.tech/img/remote/1460000010519604" alt="image.png-117.6kB" title="image.png-117.6kB" style="cursor: pointer; display: inline;"></span></p>
<p>connect 包发送的位置，主要是在 RTMP 握手结束之后。如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519605" src="https://static.alili.tech/img/remote/1460000010519605" alt="image.png-79.5kB" title="image.png-79.5kB" style="cursor: pointer; display: inline;"></span></p>
<p><strong>call</strong></p>
<p>call 包主要作用是用来远程执行接收端的程序（RPC, remote procedure calls)。不过，在我解 RTMP 的过程中，并没有实际用到过。这里简单介绍一下格式。它的内容和 <code>connect</code> 类似：</p>
<ul>
<li><p>Procedure Name[String]: 调用处理程序的名字。</p></li>
<li><p>Transaction ID[Number]: 如果想要有返回，则我们需要制定一个 id。否则为 0。</p></li>
<li><p>Command Object: 键值对的形式存放相关信息。AMF0/3</p></li>
<li><p>Optional: 可选值。一般没有</p></li>
</ul>
<p>Command Object 里面的内容主要是针对程序，设置相关的调用参数。因为内容不固定，这里就不介绍了。</p>
<p>call 一般是需要有 response 来表明，远端程序是否执行，以及是否执行成功等。返回的格式为：</p>
<ul>
<li><p>Command Name[String]: 根据 call 中 Command Object 参数来决定的。</p></li>
<li><p>Transaction ID[Number]: 如果想要有返回，则我们需要制定一个 id。否则为 0。</p></li>
<li><p>Command Object: 键值对的形式存放相关信息。AMF0/3</p></li>
<li><p>Response[Object]: 响应的结果值</p></li>
</ul>
<p><strong>createStream</strong></p>
<p>createStream 包只是用来告诉服务端，我们现在要创建一个 channel 开始进行流的交流了。格式和内容都不复杂：</p>
<ul>
<li><p>Procedure Name[String]: 调用处理程序的名字。</p></li>
<li><p>Transaction ID[Number]: 自己制定一个。一般可以设为 2</p></li>
<li><p>Command Object: 键值对的形式存放相关信息。AMF0/3</p></li>
</ul>
<p>当成功后，服务端会返回一个 <code>_result</code> 或者 <code>_error</code> 包来说明接收成功，详细内容为：</p>
<ul>
<li><p>Command Name[String]: 根据 call 中 Command Object 参数来决定的。</p></li>
<li><p>Transaction ID[Number]: 如果想要有返回，则我们需要制定一个 id。否则为 0。</p></li>
<li><p>Command Object: 键值对的形式存放相关信息。AMF0/3。一般为 Null</p></li>
<li><p>Stream ID: 返回的 stream ID 值。</p></li>
</ul>
<p>它的返回值很随意，参考抓包内容：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519606" src="https://static.alili.tech/img/remote/1460000010519606" alt="image.png-16.1kB" title="image.png-16.1kB" style="cursor: pointer;"></span></p>
<p>下面，我们来看一下 RTMP 中第二个比较重要的 command msg -- netStream msg。</p>
<h4>NetStream Msg</h4>
<p>NetStream 里面的 Msg 有很多，但在直播流中，比较重要的只有 <code>play</code> 包。所以，这里我们着重介绍一下 play 包。</p>
<p><strong>play</strong></p>
<p>play 包主要是用来告诉 Server 正式播放音视频流。而且，由于 RTMP 天然是做多流分发的。如果遇到网络出现相应的波动，客户端可以根据网络条件多次调用 play 命令，来切换不同模式的流。</p>
<p>其基本格式为：</p>
<ul>
<li><p>Command Name[String]: 根据 call 中 Command Object 参数来决定的。</p></li>
<li><p>Transaction ID[Number]: 默认为 0。也可以设置为其他值</p></li>
<li><p>Command Object: 不需要该字段，在该命令中，默认设为 <code>Null</code></p></li>
<li><p>Stream Name[String]: 用来指定播放的视频流文件。因为，RTMP 天生是支持 FLV 的，所以针对 FLV 文件来说，并不需要加额外的标识，只需要写明文件名即可。比如:</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="StreamName: '6721_75994f92ce868a0cd3cc84600a97f75c'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">StreamName:</span> <span class="hljs-string">'6721_75994f92ce868a0cd3cc84600a97f75c'</span></code></pre>
<ul>
<li>
<p>不过，如果想要支持其它的文件，那么则需要额外的表示。当然，音频和视频需要不同的支持：</p>
<ul>
<li><p>如果是播放音频文件，比如 mp3，那么则需要额外的前缀标识符-<code>mp3</code>。例如：<code>mp3:6721_75994f9</code>。</p></li>
<li><p>如果涉及到视频文件的话，不仅需要前缀，还需要后缀。比如播放的是 MP4 文件，则标识为：<code>mp4:6721_75994f9.mp4</code>。</p></li>
</ul>
</li>
<li>
<p>startNumber: 这个字段其实有点意思。它可以分为 3 类来讲解：-2，-1，&gt;=0。</p>
<ul>
<li><p>-2: 如果是该标识符，服务端会首先寻找是否有对应的 liveStream。没有的话，就找 record_stream。如果还没有的，这次请求会暂时挂起，直到获取到下一次 live_stream。</p></li>
<li><p>-1: 只有 live_stream 才会播放。</p></li>
<li><blockquote><p>=0: 相当于就是 seek video。它会直接找到 record_stream，并且根据该字段的值来确定播放开始时间。如果没有的话，则播放 list 中的下一个 video。</p></blockquote></li>
</ul>
</li>
<li>
<p>durationNumber: 用来设置播放时长的。它里面也有几个参数需要讲解一下，-1，0，&gt;0。</p>
<ul>
<li><p>-1: 会一直播放到 live_stream 或者 record_stream 结束。</p></li>
<li><p>0: 会播放一段一段的 frame。一般不用。</p></li>
<li><blockquote><p>0: 会直接播放指定 duration 之内的流。如果超出，则会播放指定时间段内容的 record_stream。</p></blockquote></li>
</ul>
</li>
<li><p>reset[Boolean]: 该字段没啥用，一般可以忽略。用来表示否是抛弃掉前面的 playlist。</p></li>
</ul>
<p>整个 <code>play</code> 包内容就已经介绍完了。我们可以看看实际的 play 抓包结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519607" src="https://static.alili.tech/img/remote/1460000010519607" alt="image.png-19.5kB" title="image.png-19.5kB" style="cursor: pointer;"></span></p>
<p>那 play 包是在那个环节发送，发送完之后需不需要对应的 _result 包呢？</p>
<p>play 包比较特殊，它是不需要 _result 回包的。因为，一旦 <code>play</code> 包成功接收后。server 端会直接开始进行 <code>streamBegin</code> 的操作。</p>
<p>整个流程为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010519608" src="https://static.alili.tech/img/remote/1460000010519608" alt="image.png-207.2kB" title="image.png-207.2kB" style="cursor: pointer; display: inline;"></span></p>
<p>到这里，后续就可以开始正式接收 video 和 audio 的 stream。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RTMP H5 直播流技术解析

## 原文链接
[https://segmentfault.com/a/1190000010519573](https://segmentfault.com/a/1190000010519573)

