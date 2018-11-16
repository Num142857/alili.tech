---
title: Node.js 中流操作实践
hidden: true
categories: [reprint]
slug: 6d879c2b
date: 2018-11-02 02:30:12
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000016328758?w=1967&amp;h=821" src="https://static.alili.tech/img/remote/1460000016328758?w=1967&amp;h=821" alt="node js banner" title="node js banner" style="cursor:pointer;display:inline"></span></p><blockquote>&#x672C;&#x6587;&#x8282;&#x9009;&#x81EA; <a href="https://parg.co/m56" rel="nofollow noreferrer" target="_blank">Node.js CheatSheet | Node.js &#x8BED;&#x6CD5;&#x57FA;&#x7840;&#x3001;&#x6846;&#x67B6;&#x4F7F;&#x7528;&#x4E0E;&#x5B9E;&#x8DF5;&#x6280;&#x5DE7;</a>&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x9605;&#x8BFB; <a href="https://parg.co/Yha" rel="nofollow noreferrer" target="_blank">JavaScript CheatSheet</a> &#x6216;&#x8005; <a href="https://github.com/wxyyxc1992/Web-Series" rel="nofollow noreferrer" target="_blank">&#x73B0;&#x4EE3; Web &#x5F00;&#x53D1;&#x57FA;&#x7840;&#x4E0E;&#x5DE5;&#x7A0B;&#x5B9E;&#x8DF5;</a> &#x4E86;&#x89E3;&#x66F4;&#x591A; JavaScript/Node.js &#x7684;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x3002;</blockquote><p>Stream &#x662F; Node.js &#x4E2D;&#x7684;&#x57FA;&#x7840;&#x6982;&#x5FF5;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E; EventEmitter&#xFF0C;&#x4E13;&#x6CE8;&#x4E8E; IO &#x7BA1;&#x9053;&#x4E2D;&#x4E8B;&#x4EF6;&#x9A71;&#x52A8;&#x7684;&#x6570;&#x636E;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#xFF1B;&#x7C7B;&#x6BD4;&#x4E8E;&#x6570;&#x7EC4;&#x6216;&#x8005;&#x6620;&#x5C04;&#xFF0C;Stream &#x4E5F;&#x662F;&#x6570;&#x636E;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x5176;&#x4EE3;&#x8868;&#x4E86;&#x4E0D;&#x4E00;&#x5B9A;&#x6B63;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x3002;&#x3002;Node.js &#x7684; Stream &#x5206;&#x4E3A;&#x4EE5;&#x4E0B;&#x7C7B;&#x578B;&#xFF1A;</p><ul><li>Readable Stream: &#x53EF;&#x8BFB;&#x6D41;&#xFF0C;&#x6570;&#x636E;&#x7684;&#x4EA7;&#x751F;&#x8005;&#xFF0C;&#x8B6C;&#x5982; process.stdin</li><li>Writable Stream: &#x53EF;&#x5199;&#x6D41;&#xFF0C;&#x6570;&#x636E;&#x7684;&#x6D88;&#x8D39;&#x8005;&#xFF0C;&#x8B6C;&#x5982; process.stdout &#x6216;&#x8005; process.stderr</li><li>Duplex Stream: &#x53CC;&#x5411;&#x6D41;&#xFF0C;&#x5373;&#x53EF;&#x8BFB;&#x4E5F;&#x53EF;&#x5199;</li><li>Transform Stream: &#x8F6C;&#x5316;&#x6D41;&#xFF0C;&#x6570;&#x636E;&#x7684;&#x8F6C;&#x5316;&#x8005;</li></ul><p>Stream &#x672C;&#x8EAB;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x5957;&#x63A5;&#x53E3;&#x89C4;&#x8303;&#xFF0C;&#x5F88;&#x591A; Node.js &#x4E2D;&#x7684;&#x5185;&#x5EFA;&#x6A21;&#x5757;&#x90FD;&#x9075;&#x5FAA;&#x4E86;&#x8BE5;&#x89C4;&#x8303;&#xFF0C;&#x8B6C;&#x5982;&#x8457;&#x540D;&#x7684; <code>fs</code> &#x6A21;&#x5757;&#xFF0C;&#x5373;&#x662F;&#x4F7F;&#x7528; Stream &#x63A5;&#x53E3;&#x6765;&#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x8BFB;&#x5199;&#xFF1B;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x6BCF;&#x4E2A; HTTP &#x8BF7;&#x6C42;&#x662F;&#x53EF;&#x8BFB;&#x6D41;&#xFF0C;&#x800C; HTTP &#x54CD;&#x5E94;&#x5219;&#x662F;&#x53EF;&#x5199;&#x6D41;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016328759" src="https://static.alili.tech/img/remote/1460000016328759" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader0">Readable Stream</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const stream = require(&apos;stream&apos;);
const fs = require(&apos;fs&apos;);

const readableStream = fs.createReadStream(process.argv[2], {
  encoding: &apos;utf8&apos;
});

// &#x624B;&#x52A8;&#x8BBE;&#x7F6E;&#x6D41;&#x6570;&#x636E;&#x7F16;&#x7801;
// readableStream.setEncoding(&apos;utf8&apos;);

let wordCount = 0;

readableStream.on(&apos;data&apos;, function(data) {
  wordCount += data.split(/\s{1,}/).length;
});

readableStream.on(&apos;end&apos;, function() {
  // Don&apos;t count the end of the file.
  console.log(&apos;%d %s&apos;, --wordCount, process.argv[2]);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> stream = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;stream&apos;</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);

<span class="hljs-keyword">const</span> readableStream = fs.createReadStream(process.argv[<span class="hljs-number">2</span>], {
  <span class="hljs-attr">encoding</span>: <span class="hljs-string">&apos;utf8&apos;</span>
});

<span class="hljs-comment">// &#x624B;&#x52A8;&#x8BBE;&#x7F6E;&#x6D41;&#x6570;&#x636E;&#x7F16;&#x7801;</span>
<span class="hljs-comment">// readableStream.setEncoding(&apos;utf8&apos;);</span>

<span class="hljs-keyword">let</span> wordCount = <span class="hljs-number">0</span>;

readableStream.on(<span class="hljs-string">&apos;data&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  wordCount += data.split(<span class="hljs-regexp">/\s{1,}/</span>).length;
});

readableStream.on(<span class="hljs-string">&apos;end&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// Don&apos;t count the end of the file.</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;%d %s&apos;</span>, --wordCount, process.argv[<span class="hljs-number">2</span>]);
});</code></pre><p>&#x5F53;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x67D0;&#x4E2A;&#x53EF;&#x8BFB;&#x6D41;&#x65F6;&#xFF0C;&#x5176;&#x8FD8;&#x5E76;&#x672A;&#x5F00;&#x59CB;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x6D41;&#x52A8;&#xFF1B;&#x6DFB;&#x52A0;&#x4E86; data &#x7684;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#xFF0C;&#x5B83;&#x624D;&#x4F1A;&#x53D8;&#x6210;&#x6D41;&#x52A8;&#x6001;&#x7684;&#x3002;&#x5728;&#x8FD9;&#x4E4B;&#x540E;&#xFF0C;&#x5B83;&#x5C31;&#x4F1A;&#x8BFB;&#x53D6;&#x4E00;&#x5C0F;&#x5757;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x4F20;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x3002; <code>data</code> &#x4E8B;&#x4EF6;&#x7684;&#x89E6;&#x53D1;&#x9891;&#x6B21;&#x540C;&#x6837;&#x662F;&#x7531;&#x5B9E;&#x73B0;&#x8005;&#x51B3;&#x5B9A;&#xFF0C;&#x8B6C;&#x5982;&#x5728;&#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x8BFB;&#x53D6;&#x65F6;&#xFF0C;&#x53EF;&#x80FD;&#x6BCF;&#x884C;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#xFF1B;&#x800C;&#x5728; HTTP &#x8BF7;&#x6C42;&#x5904;&#x7406;&#x65F6;&#xFF0C;&#x53EF;&#x80FD;&#x6570; KB &#x7684;&#x6570;&#x636E;&#x624D;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#x3002;&#x53EF;&#x4EE5;&#x53C2;&#x8003; <a href="https://github.com/nodejs/readable-stream/blob/master/lib/_stream_readable.js" rel="nofollow noreferrer" target="_blank">nodejs/readable-stream/_stream_readable</a> &#x4E2D;&#x7684;&#x76F8;&#x5173;&#x5B9E;&#x73B0;&#xFF0C;&#x53D1;&#x73B0; on &#x51FD;&#x6570;&#x4F1A;&#x89E6;&#x53D1; resume &#x65B9;&#x6CD5;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x53C8;&#x4F1A;&#x8C03;&#x7528; flow &#x51FD;&#x6570;&#x8FDB;&#x884C;&#x6D41;&#x8BFB;&#x53D6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// function on
if (ev === &apos;data&apos;) {
  // Start flowing on next tick if stream isn&apos;t explicitly paused
  if (this._readableState.flowing !== false) this.resume();
}
...
// function flow
while (state.flowing &amp;&amp; stream.read() !== null) {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// function on</span>
<span class="hljs-keyword">if</span> (ev === <span class="hljs-string">&apos;data&apos;</span>) {
  <span class="hljs-comment">// Start flowing on next tick if stream isn&apos;t explicitly paused</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._readableState.flowing !== <span class="hljs-literal">false</span>) <span class="hljs-keyword">this</span>.resume();
}
...
<span class="hljs-comment">// function flow</span>
<span class="hljs-keyword">while</span> (state.flowing &amp;&amp; stream.read() !== <span class="hljs-literal">null</span>) {}</code></pre><p>&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x76D1;&#x542C; <code>readable</code> &#x4E8B;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x624B;&#x52A8;&#x5730;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x8BFB;&#x53D6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = &apos;&apos;;
let chunk;
readableStream.on(&apos;readable&apos;, function() {
  while ((chunk = readableStream.read()) != null) {
    data += chunk;
  }
});
readableStream.on(&apos;end&apos;, function() {
  console.log(data);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> data = <span class="hljs-string">&apos;&apos;</span>;
<span class="hljs-keyword">let</span> chunk;
readableStream.on(<span class="hljs-string">&apos;readable&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">while</span> ((chunk = readableStream.read()) != <span class="hljs-literal">null</span>) {
    data += chunk;
  }
});
readableStream.on(<span class="hljs-string">&apos;end&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(data);
});</code></pre><p>Readable Stream &#x8FD8;&#x5305;&#x62EC;&#x5982;&#x4E0B;&#x5E38;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>Readable.pause(): &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x6682;&#x505C;&#x6D41;&#x7684;&#x6D41;&#x52A8;&#x3002;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#x5C31;&#x662F;&#x5B83;&#x4E0D;&#x4F1A;&#x518D;&#x89E6;&#x53D1; data &#x4E8B;&#x4EF6;&#x3002;</li><li>Readable.resume(): &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x548C;&#x4E0A;&#x9762;&#x7684;&#x76F8;&#x53CD;&#xFF0C;&#x4F1A;&#x8BA9;&#x6682;&#x505C;&#x6D41;&#x6062;&#x590D;&#x6D41;&#x52A8;&#x3002;</li><li>Readable.unpipe(): &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x628A;&#x76EE;&#x7684;&#x5730;&#x79FB;&#x9664;&#x3002;&#x5982;&#x679C;&#x6709;&#x53C2;&#x6570;&#x4F20;&#x5165;&#xFF0C;&#x5B83;&#x4F1A;&#x8BA9;&#x53EF;&#x8BFB;&#x6D41;&#x505C;&#x6B62;&#x6D41;&#x5411;&#x67D0;&#x4E2A;&#x7279;&#x5B9A;&#x7684;&#x76EE;&#x7684;&#x5730;&#xFF0C;&#x5426;&#x5219;&#xFF0C;&#x5B83;&#x4F1A;&#x79FB;&#x9664;&#x6240;&#x6709;&#x76EE;&#x7684;&#x5730;&#x3002;</li></ul><p>&#x5728;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528; <a href="https://github.com/node-modules/stream-wormhole" rel="nofollow noreferrer" target="_blank">stream-wormhole</a> &#x6765;&#x6A21;&#x62DF;&#x6D88;&#x8017;&#x53EF;&#x8BFB;&#x6D41;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sendToWormhole(readStream, true);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">sendToWormhole(readStream, <span class="hljs-literal">true</span>);</code></pre><h3 id="articleHeader1">Writable Stream</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="readableStream.on(&apos;data&apos;, function(chunk) {
  writableStream.write(chunk);
});

writableStream.end();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">readableStream.on(<span class="hljs-string">&apos;data&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk</span>) </span>{
  writableStream.write(chunk);
});

writableStream.end();</code></pre><p>&#x5F53; <code>end()</code> &#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x6570;&#x636E;&#x4F1A;&#x88AB;&#x5199;&#x5165;&#xFF0C;&#x7136;&#x540E;&#x6D41;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x4E2A; <code>finish</code> &#x4E8B;&#x4EF6;&#x3002;&#x6CE8;&#x610F;&#x5728;&#x8C03;&#x7528; <code>end()</code> &#x4E4B;&#x540E;&#xFF0C;&#x4F60;&#x5C31;&#x4E0D;&#x80FD;&#x518D;&#x5F80;&#x53EF;&#x5199;&#x6D41;&#x4E2D;&#x5199;&#x5165;&#x6570;&#x636E;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Writable } = require(&apos;stream&apos;);

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

process.stdin.pipe(outStream);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { Writable } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;stream&apos;</span>);

<span class="hljs-keyword">const</span> outStream = <span class="hljs-keyword">new</span> Writable({
  write(chunk, encoding, callback) {
    <span class="hljs-built_in">console</span>.log(chunk.toString());
    callback();
  }
});

process.stdin.pipe(outStream);</code></pre><p>Writable Stream &#x4E2D;&#x540C;&#x6837;&#x5305;&#x542B;&#x4E00;&#x4E9B;&#x4E0E; Readable Stream &#x76F8;&#x5173;&#x7684;&#x91CD;&#x8981;&#x4E8B;&#x4EF6;&#xFF1A;</p><ul><li>error: &#x5728;&#x5199;&#x5165;&#x6216;&#x94FE;&#x63A5;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x65F6;&#x89E6;&#x53D1;</li><li>pipe: &#x5F53;&#x53EF;&#x8BFB;&#x6D41;&#x94FE;&#x63A5;&#x5230;&#x53EF;&#x5199;&#x6D41;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x4F1A;&#x89E6;&#x53D1;</li><li>unpipe: &#x5728;&#x53EF;&#x8BFB;&#x6D41;&#x8C03;&#x7528; unpipe &#x65F6;&#x4F1A;&#x89E6;&#x53D1;</li></ul><h3 id="articleHeader2">Pipe | &#x7BA1;&#x9053;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&apos;fs&apos;);

const inputFile = fs.createReadStream(&apos;REALLY_BIG_FILE.x&apos;);
const outputFile = fs.createWriteStream(&apos;REALLY_BIG_FILE_DEST.x&apos;);

// &#x5F53;&#x5EFA;&#x7ACB;&#x7BA1;&#x9053;&#x65F6;&#xFF0C;&#x624D;&#x53D1;&#x751F;&#x4E86;&#x6D41;&#x7684;&#x6D41;&#x52A8;
inputFile.pipe(outputFile);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);

<span class="hljs-keyword">const</span> inputFile = fs.createReadStream(<span class="hljs-string">&apos;REALLY_BIG_FILE.x&apos;</span>);
<span class="hljs-keyword">const</span> outputFile = fs.createWriteStream(<span class="hljs-string">&apos;REALLY_BIG_FILE_DEST.x&apos;</span>);

<span class="hljs-comment">// &#x5F53;&#x5EFA;&#x7ACB;&#x7BA1;&#x9053;&#x65F6;&#xFF0C;&#x624D;&#x53D1;&#x751F;&#x4E86;&#x6D41;&#x7684;&#x6D41;&#x52A8;</span>
inputFile.pipe(outputFile);</code></pre><p>&#x591A;&#x4E2A;&#x7BA1;&#x9053;&#x987A;&#x5E8F;&#x8C03;&#x7528;&#xFF0C;&#x5373;&#x662F;&#x6784;&#x5EFA;&#x4E86;&#x94FE;&#x63A5;(Chaining):</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&apos;fs&apos;);
const zlib = require(&apos;zlib&apos;);
fs.createReadStream(&apos;input.txt.gz&apos;)
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream(&apos;output.txt&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">const</span> zlib = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;zlib&apos;</span>);
fs.createReadStream(<span class="hljs-string">&apos;input.txt.gz&apos;</span>)
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream(<span class="hljs-string">&apos;output.txt&apos;</span>));</code></pre><p>&#x7BA1;&#x9053;&#x4E5F;&#x5E38;&#x7528;&#x4E8E; Web &#x670D;&#x52A1;&#x5668;&#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x5904;&#x7406;&#xFF0C;&#x4EE5; Egg.js &#x4E2D;&#x7684;&#x5E94;&#x7528;&#x4E3A;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE; Context &#x4E2D;&#x83B7;&#x53D6;&#x5230;&#x6587;&#x4EF6;&#x6D41;&#x5E76;&#x5C06;&#x5176;&#x4F20;&#x5165;&#x5230;&#x53EF;&#x5199;&#x6587;&#x4EF6;&#x6D41;&#x4E2D;&#xFF1A;</p><blockquote>&#x1F4CE; &#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53C2;&#x8003; <a href="https://parg.co/A24" rel="nofollow noreferrer" target="_blank">Backend Boilerplate/egg</a></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const awaitWriteStream = require(&apos;await-stream-ready&apos;).write;
const sendToWormhole = require(&apos;stream-wormhole&apos;);
...
const stream = await ctx.getFileStream();

const filename =
  md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
//&#x6587;&#x4EF6;&#x751F;&#x6210;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;

const target = path.join(this.config.baseDir, &apos;app/public/uploads&apos;, filename);

//&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x6D41;
const writeStream = fs.createWriteStream(target);
try {
  //&#x5F02;&#x6B65;&#x628A;&#x6587;&#x4EF6;&#x6D41;&#x5199;&#x5165;
  await awaitWriteStream(stream.pipe(writeStream));
} catch (err) {
  //&#x5982;&#x679C;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#xFF0C;&#x5173;&#x95ED;&#x7BA1;&#x9053;
  await sendToWormhole(stream);
  throw err;
}
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> awaitWriteStream = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;await-stream-ready&apos;</span>).write;
<span class="hljs-keyword">const</span> sendToWormhole = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;stream-wormhole&apos;</span>);
...
const stream = <span class="hljs-keyword">await</span> ctx.getFileStream();

<span class="hljs-keyword">const</span> filename =
  md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
<span class="hljs-comment">//&#x6587;&#x4EF6;&#x751F;&#x6210;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</span>

<span class="hljs-keyword">const</span> target = path.join(<span class="hljs-keyword">this</span>.config.baseDir, <span class="hljs-string">&apos;app/public/uploads&apos;</span>, filename);

<span class="hljs-comment">//&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x6D41;</span>
<span class="hljs-keyword">const</span> writeStream = fs.createWriteStream(target);
<span class="hljs-keyword">try</span> {
  <span class="hljs-comment">//&#x5F02;&#x6B65;&#x628A;&#x6587;&#x4EF6;&#x6D41;&#x5199;&#x5165;</span>
  <span class="hljs-keyword">await</span> awaitWriteStream(stream.pipe(writeStream));
} <span class="hljs-keyword">catch</span> (err) {
  <span class="hljs-comment">//&#x5982;&#x679C;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#xFF0C;&#x5173;&#x95ED;&#x7BA1;&#x9053;</span>
  <span class="hljs-keyword">await</span> sendToWormhole(stream);
  <span class="hljs-keyword">throw</span> err;
}
...</code></pre><p>&#x53C2;&#x7167;<a href="https://parg.co/Uxo" rel="nofollow noreferrer" target="_blank">&#x5206;&#x5E03;&#x5F0F;&#x7CFB;&#x7EDF;&#x5BFC;&#x8BBA;</a>&#xFF0C;&#x53EF;&#x77E5;&#x5728;&#x5178;&#x578B;&#x7684;&#x6D41;&#x5904;&#x7406;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x5730;&#x8981;&#x5904;&#x7406;&#x6240;&#x8C13;&#x7684;&#x80CC;&#x538B;(Backpressure)&#x95EE;&#x9898;&#x3002;&#x65E0;&#x8BBA;&#x662F; Writable Stream &#x8FD8;&#x662F; Readable Stream&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x90FD;&#x662F;&#x5C06;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x5728;&#x5185;&#x90E8;&#x7684; Buffer &#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>writable.writableBuffer</code> &#x6216;&#x8005; <code>readable.readableBuffer</code> &#x6765;&#x8BFB;&#x53D6;&#x3002;&#x5F53;&#x8981;&#x5904;&#x7406;&#x7684;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x8D85;&#x8FC7;&#x4E86; <code>highWaterMark</code> &#x6216;&#x8005;&#x5F53;&#x524D;&#x5199;&#x5165;&#x6D41;&#x5904;&#x4E8E;&#x7E41;&#x5FD9;&#x72B6;&#x6001;&#x65F6;&#xFF0C;write &#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x8FD4;&#x56DE; <code>false</code>&#x3002;<code>pipe</code> &#x51FD;&#x6570;&#x5373;&#x4F1A;&#x81EA;&#x52A8;&#x5730;&#x5E2E;&#x6211;&#x4EEC;&#x542F;&#x7528;&#x80CC;&#x538B;&#x673A;&#x5236;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016328760" src="https://static.alili.tech/img/remote/1460000016328760" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x5F53; Node.js &#x7684;&#x6D41;&#x673A;&#x5236;&#x76D1;&#x6D4B;&#x5230; write &#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E86; <code>false</code>&#xFF0C;&#x80CC;&#x538B;&#x7CFB;&#x7EDF;&#x4F1A;&#x81EA;&#x52A8;&#x4ECB;&#x5165;&#xFF1B;&#x5176;&#x4F1A;&#x6682;&#x505C;&#x5F53;&#x524D; Readable Stream &#x7684;&#x6570;&#x636E;&#x4F20;&#x9012;&#x64CD;&#x4F5C;&#xFF0C;&#x76F4;&#x5230;&#x6D88;&#x8D39;&#x8005;&#x51C6;&#x5907;&#x5B8C;&#x6BD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+===============+
|   Your_Data   |
+=======+=======+
        |
+-------v-----------+          +-------------------+         +=================+
|  Readable Stream  |          |  Writable Stream  +---------&gt;  .write(chunk)  |
+-------+-----------+          +---------^---------+         +=======+=========+
        |                                |                           |
        |     +======================+   |        +------------------v---------+
        +-----&gt;  .pipe(destination)  &gt;---+        |    Is this chunk too big?  |
              +==^=======^========^==+            |    Is the queue busy?      |
                 ^       ^        ^               +----------+-------------+---+
                 |       |        |                          |             |
                 |       |        |  &gt; if (!chunk)           |             |
                 ^       |        |      emit .end();        |             |
                 ^       ^        |  &gt; else                  |             |
                 |       ^        |      emit .write();  +---v---+     +---v---+
                 |       |        ^----^-----------------&lt;  No   |     |  Yes  |
                 ^       |                               +-------+     +---v---+
                 ^       |                                                 |
                 |       ^   emit .pause();        +=================+     |
                 |       ^---^---------------------+  return false;  &lt;-----+---+
                 |                                 +=================+         |
                 |                                                             |
                 ^   when queue is empty   +============+                      |
                 ^---^-----------------^---&lt;  Buffering |                      |
                     |                     |============|                      |
                     +&gt; emit .drain();     |  &lt;Buffer&gt;  |                      |
                     +&gt; emit .resume();    +------------+                      |
                                           |  &lt;Buffer&gt;  |                      |
                                           +------------+  add chunk to queue  |
                                           |            &lt;--^-------------------&lt;
                                           +============+" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gherkin"><code>+===============+
|<span class="hljs-string">   Your_Data   </span>|
+=======+=======+
        |<span class="hljs-string">
+-------v-----------+          +-------------------+         +=================+
</span>|<span class="hljs-string">  Readable Stream  </span>|<span class="hljs-string">          </span>|<span class="hljs-string">  Writable Stream  +---------&gt;  .write(chunk)  </span>|
+-------+-----------+          +---------^---------+         +=======+=========+
        |<span class="hljs-string">                                </span>|<span class="hljs-string">                           </span>|
        |<span class="hljs-string">     +======================+   </span>|<span class="hljs-string">        +------------------v---------+
        +-----&gt;  .pipe(destination)  &gt;---+        </span>|<span class="hljs-string">    Is this chunk too big?  </span>|
              +==^=======^========^==+            |<span class="hljs-string">    Is the queue busy?      </span>|
                 ^       ^        ^               +----------+-------------+---+
                 |<span class="hljs-string">       </span>|<span class="hljs-string">        </span>|<span class="hljs-string">                          </span>|<span class="hljs-string">             </span>|
                 |<span class="hljs-string">       </span>|<span class="hljs-string">        </span>|<span class="hljs-string">  &gt; if (!chunk)           </span>|<span class="hljs-string">             </span>|
                 ^       |<span class="hljs-string">        </span>|<span class="hljs-string">      emit .end();        </span>|<span class="hljs-string">             </span>|
                 ^       ^        |<span class="hljs-string">  &gt; else                  </span>|<span class="hljs-string">             </span>|
                 |<span class="hljs-string">       ^        </span>|<span class="hljs-string">      emit .write();  +---v---+     +---v---+
                 </span>|<span class="hljs-string">       </span>|<span class="hljs-string">        ^----^-----------------&lt;  No   </span>|<span class="hljs-string">     </span>|<span class="hljs-string">  Yes  </span>|
                 ^       |<span class="hljs-string">                               +-------+     +---v---+
                 ^       </span>|<span class="hljs-string">                                                 </span>|
                 |<span class="hljs-string">       ^   emit .pause();        +=================+     </span>|
                 |<span class="hljs-string">       ^---^---------------------+  return false;  &lt;-----+---+
                 </span>|<span class="hljs-string">                                 +=================+         </span>|
                 |<span class="hljs-string">                                                             </span>|
                 ^   when queue is empty   +============+                      |<span class="hljs-string">
                 ^---^-----------------^---&lt;  Buffering </span>|<span class="hljs-string">                      </span>|
                     |<span class="hljs-string">                     </span>|<span class="hljs-string">============</span>|<span class="hljs-string">                      </span>|
                     +&gt; emit .drain();     |<span class="hljs-string">  &lt;Buffer&gt;  </span>|<span class="hljs-string">                      </span>|
                     +&gt; emit .resume();    +------------+                      |<span class="hljs-string">
                                           </span>|<span class="hljs-string">  &lt;Buffer&gt;  </span>|<span class="hljs-string">                      </span>|
                                           +------------+  add chunk to queue  |<span class="hljs-string">
                                           </span>|<span class="hljs-string">            &lt;--^-------------------&lt;
                                           +============+</span></code></pre><h3 id="articleHeader3">Duplex Stream</h3><p>Duplex Stream &#x53EF;&#x4EE5;&#x770B;&#x505A;&#x8BFB;&#x5199;&#x6D41;&#x7684;&#x805A;&#x5408;&#x4F53;&#xFF0C;&#x5176;&#x5305;&#x542B;&#x4E86;&#x76F8;&#x4E92;&#x72EC;&#x7ACB;&#x3001;&#x62E5;&#x6709;&#x72EC;&#x7ACB;&#x5185;&#x90E8;&#x7F13;&#x5B58;&#x7684;&#x4E24;&#x4E2A;&#x8BFB;&#x5199;&#x6D41;&#xFF0C; &#x8BFB;&#x53D6;&#x4E0E;&#x5199;&#x5165;&#x64CD;&#x4F5C;&#x4E5F;&#x53EF;&#x4EE5;&#x5F02;&#x6B65;&#x8FDB;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                             Duplex Stream
                          ------------------|
                    Read  &lt;-----               External Source
            You           ------------------|
                    Write -----&gt;               External Sink
                          ------------------|" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code>                             <span class="hljs-type">Duplex</span> <span class="hljs-type">Stream</span>
                          <span class="hljs-comment">------------------|</span>
                    <span class="hljs-type">Read</span>  &lt;-<span class="hljs-comment">----               External Source</span>
            <span class="hljs-type">You</span>           <span class="hljs-comment">------------------|</span>
                    <span class="hljs-type">Write</span> <span class="hljs-comment">-----&gt;               External Sink</span>
                          <span class="hljs-comment">------------------|</span></code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; Duplex &#x6A21;&#x62DF;&#x7B80;&#x5355;&#x7684;&#x5957;&#x63A5;&#x5B57;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Duplex } = require(&apos;stream&apos;);

class Duplexer extends Duplex {
  constructor(props) {
    super(props);
    this.data = [];
  }

  _read(size) {
    const chunk = this.data.shift();
    if (chunk == &apos;stop&apos;) {
      this.push(null);
    } else {
      if (chunk) {
        this.push(chunk);
      }
    }
  }

  _write(chunk, encoding, cb) {
    this.data.push(chunk);
    cb();
  }
}

const d = new Duplexer({ allowHalfOpen: true });
d.on(&apos;data&apos;, function(chunk) {
  console.log(&apos;read: &apos;, chunk.toString());
});
d.on(&apos;readable&apos;, function() {
  console.log(&apos;readable&apos;);
});
d.on(&apos;end&apos;, function() {
  console.log(&apos;Message Complete&apos;);
});
d.write(&apos;....&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { Duplex } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;stream&apos;</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Duplexer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Duplex</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.data = [];
  }

  _read(size) {
    <span class="hljs-keyword">const</span> chunk = <span class="hljs-keyword">this</span>.data.shift();
    <span class="hljs-keyword">if</span> (chunk == <span class="hljs-string">&apos;stop&apos;</span>) {
      <span class="hljs-keyword">this</span>.push(<span class="hljs-literal">null</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (chunk) {
        <span class="hljs-keyword">this</span>.push(chunk);
      }
    }
  }

  _write(chunk, encoding, cb) {
    <span class="hljs-keyword">this</span>.data.push(chunk);
    cb();
  }
}

<span class="hljs-keyword">const</span> d = <span class="hljs-keyword">new</span> Duplexer({ <span class="hljs-attr">allowHalfOpen</span>: <span class="hljs-literal">true</span> });
d.on(<span class="hljs-string">&apos;data&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;read: &apos;</span>, chunk.toString());
});
d.on(<span class="hljs-string">&apos;readable&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;readable&apos;</span>);
});
d.on(<span class="hljs-string">&apos;end&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Message Complete&apos;</span>);
});
d.write(<span class="hljs-string">&apos;....&apos;</span>);</code></pre><p>&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#x6211;&#x4EEC;&#x4E5F;&#x7ECF;&#x5E38;&#x9700;&#x8981;&#x76F4;&#x63A5;&#x5C06;&#x67D0;&#x4E2A;&#x53EF;&#x8BFB;&#x6D41;&#x8F93;&#x51FA;&#x5230;&#x53EF;&#x5199;&#x6D41;&#x4E2D;&#xFF0C;&#x6B64;&#x65F6;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x5176;&#x4E2D;&#x5F15;&#x5165; PassThrough&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x8FDB;&#x884C;&#x989D;&#x5916;&#x5730;&#x76D1;&#x542C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { PassThrough } = require(&apos;stream&apos;);
const fs = require(&apos;fs&apos;);

const duplexStream = new PassThrough();

// can be piped from reaable stream
fs.createReadStream(&apos;tmp.md&apos;).pipe(duplexStream);

// can pipe to writable stream
duplexStream.pipe(process.stdout);

// &#x76D1;&#x542C;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x91CC;&#x76F4;&#x63A5;&#x8F93;&#x51FA;&#x7684;&#x662F; Buffer&lt;Buffer 60 60  ... &gt;
duplexStream.on(&apos;data&apos;, console.log);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { PassThrough } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;stream&apos;</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);

<span class="hljs-keyword">const</span> duplexStream = <span class="hljs-keyword">new</span> PassThrough();

<span class="hljs-comment">// can be piped from reaable stream</span>
fs.createReadStream(<span class="hljs-string">&apos;tmp.md&apos;</span>).pipe(duplexStream);

<span class="hljs-comment">// can pipe to writable stream</span>
duplexStream.pipe(process.stdout);

<span class="hljs-comment">// &#x76D1;&#x542C;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x91CC;&#x76F4;&#x63A5;&#x8F93;&#x51FA;&#x7684;&#x662F; Buffer&lt;Buffer 60 60  ... &gt;</span>
duplexStream.on(<span class="hljs-string">&apos;data&apos;</span>, <span class="hljs-built_in">console</span>.log);</code></pre><h3 id="articleHeader4">Transform Stream</h3><p>Transform Stream &#x5219;&#x662F;&#x5B9E;&#x73B0;&#x4E86; <code>_transform</code> &#x65B9;&#x6CD5;&#x7684; Duplex Stream&#xFF0C;&#x5176;&#x5728;&#x517C;&#x5177;&#x8BFB;&#x5199;&#x529F;&#x80FD;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x5BF9;&#x6D41;&#x8FDB;&#x884C;&#x8F6C;&#x6362;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                                 Transform Stream
                           --------------|--------------
            You     Write  ----&gt;                   ----&gt;  Read  You
                           --------------|--------------" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs brainfuck"><code>                                 <span class="hljs-comment">Transform</span> <span class="hljs-comment">Stream</span>
                           <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>
            <span class="hljs-comment">You</span>     <span class="hljs-comment">Write</span>  <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt;                   <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt;  <span class="hljs-comment">Read</span>  <span class="hljs-comment">You</span>
                           <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span></code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x7B80;&#x5355;&#x7684; Base64 &#x7F16;&#x7801;&#x5668;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const util = require(&apos;util&apos;);
const Transform = require(&apos;stream&apos;).Transform;

function Base64Encoder(options) {
  Transform.call(this, options);
}

util.inherits(Base64Encoder, Transform);

Base64Encoder.prototype._transform = function(data, encoding, callback) {
  callback(null, data.toString(&apos;base64&apos;));
};

process.stdin.pipe(new Base64Encoder()).pipe(process.stdout);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>);
<span class="hljs-keyword">const</span> Transform = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;stream&apos;</span>).Transform;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Base64Encoder</span>(<span class="hljs-params">options</span>) </span>{
  Transform.call(<span class="hljs-keyword">this</span>, options);
}

util.inherits(Base64Encoder, Transform);

Base64Encoder.prototype._transform = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, encoding, callback</span>) </span>{
  callback(<span class="hljs-literal">null</span>, data.toString(<span class="hljs-string">&apos;base64&apos;</span>));
};

process.stdin.pipe(<span class="hljs-keyword">new</span> Base64Encoder()).pipe(process.stdout);</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js 中流操作实践

## 原文链接
[https://segmentfault.com/a/1190000016328755](https://segmentfault.com/a/1190000016328755)

