---
title: 'koa源码阅读[0]' 
date: 2018-11-22 2:30:09
hidden: true
slug: 8745q9c3359
categories: [reprint]
---

{{< raw >}}
<p>Node.js&#x4E5F;&#x662F;&#x5199;&#x4E86;&#x4E24;&#x4E09;&#x5E74;&#x7684;&#x65F6;&#x95F4;&#x4E86;&#xFF0C;&#x521A;&#x5F00;&#x59CB;&#x5B66;&#x4E60;<code>Node</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;<code>hello world</code>&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>HttpServer</code>&#xFF0C;&#x540E;&#x6765;&#x5728;&#x5DE5;&#x4F5C;&#x4E2D;&#x4E5F;&#x662F;&#x7ECF;&#x5386;&#x8FC7;<code>Express</code>&#x3001;<code>Koa1.x</code>&#x3001;<code>Koa2.x</code>&#x4EE5;&#x53CA;&#x6700;&#x8FD1;&#x8FD8;&#x5728;&#x7814;&#x7A76;&#x7684;&#x7ED3;&#x5408;&#x7740;<code>TypeScript</code>&#x7684;<code>routing-controllers</code>&#xFF08;&#x9A71;&#x52A8;&#x4F9D;&#x7136;&#x662F;<code>Express</code>&#x4E0E;<code>Koa</code>&#xFF09;&#x3002;<br>&#x7528;&#x7684;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x8FD8;&#x662F;<code>Koa</code>&#x7248;&#x672C;&#xFF0C;&#x4E5F;&#x662F;&#x5BF9;&#x5B83;&#x7684;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x6BD4;&#x8F83;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x8FD1;&#x62BD;&#x51FA;&#x65F6;&#x95F4;&#x6765;&#x9605;&#x8BFB;&#x5176;&#x6E90;&#x7801;&#xFF0C;&#x6B63;&#x597D;&#x8FD1;&#x671F;&#x53EF;&#x80FD;&#x4F1A;&#x5BF9;&#x4E00;&#x4E2A;<code>Express</code>&#x9879;&#x76EE;&#x8FDB;&#x884C;&#x91CD;&#x6784;&#xFF0C;&#x5C06;&#x5176;&#x91CD;&#x6784;&#x4E3A;<code>koa2.x</code>&#x7248;&#x672C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x9605;&#x8BFB;&#x5176;&#x6E90;&#x7801;&#x5BF9;&#x4E8E;&#x91CD;&#x6784;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x6709;&#x6548;&#x7684;&#x5E2E;&#x52A9;&#x3002;</p><h1 id="articleHeader0">Koa&#x662F;&#x600E;&#x4E48;&#x6765;&#x7684;</h1><p>&#x9996;&#x5148;&#x9700;&#x8981;&#x786E;&#x5B9A;&#xFF0C;Koa&#x662F;&#x4EC0;&#x4E48;&#x3002;<br>&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x6846;&#x67B6;&#x7684;&#x51FA;&#x73B0;&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF0C;&#x800C;Koa&#x5219;&#x662F;&#x4E3A;&#x4E86;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x6784;&#x5EFA;http&#x670D;&#x52A1;&#x800C;&#x51FA;&#x73B0;&#x7684;&#x3002;<br>&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x4E2A;HTTP&#x670D;&#x52A1;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6846;&#x67B6;&#x3002;</p><h2 id="articleHeader1">&#x4F7F;&#x7528;http&#x6A21;&#x5757;&#x521B;&#x5EFA;http&#x670D;&#x52A1;</h2><p>&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5728;&#x5B66;&#x4E60;Node&#x65F6;&#xFF0C;&#x5E94;&#x8BE5;&#x90FD;&#x5199;&#x8FC7;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;)

const serverHandler = (request, response) =&gt; {
  response.end(&apos;Hello World&apos;) // &#x8FD4;&#x56DE;&#x6570;&#x636E;
}

http
  .createServer(serverHandler)
  .listen(8888, _ =&gt; console.log(&apos;Server run as http://127.0.0.1:8888&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>)

<span class="hljs-keyword">const</span> serverHandler = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
  response.end(<span class="hljs-string">&apos;Hello World&apos;</span>) <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x6570;&#x636E;</span>
}

http
  .createServer(serverHandler)
  .listen(<span class="hljs-number">8888</span>, _ =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Server run as http://127.0.0.1:8888&apos;</span>))</code></pre><p>&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x811A;&#x672C;&#x8FD0;&#x884C;&#x540E;&#x8BBF;&#x95EE;<code>http://127.0.0.1:8888</code>&#x5373;&#x53EF;&#x770B;&#x5230;&#x4E00;&#x4E2A;<code>Hello World</code>&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;<br>&#x4F46;&#x662F;&#x8FD9;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x4E0D;&#x7BA1;&#x8BBF;&#x95EE;&#x4EC0;&#x4E48;&#x5730;&#x5740;&#xFF08;&#x751A;&#x81F3;&#x4FEE;&#x6539;&#x8BF7;&#x6C42;&#x7684;Method&#xFF09;&#xFF0C;&#x90FD;&#x603B;&#x662F;&#x4F1A;&#x83B7;&#x53D6;&#x5230;&#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; curl http://127.0.0.1:8888
&gt; curl http://127.0.0.1:8888/sub
&gt; curl -X POST http://127.0.0.1:8888" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&gt; curl http://127.0.0.1:8888
&gt; curl http://127.0.0.1:8888/sub
&gt; curl -X POST http://127.0.0.1:8888</code></pre><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x5728;&#x56DE;&#x8C03;&#x4E2D;&#x6DFB;&#x52A0;&#x903B;&#x8F91;&#xFF0C;&#x6839;&#x636E;&#x8DEF;&#x5F84;&#x3001;Method&#x6765;&#x8FD4;&#x56DE;&#x7ED9;&#x7528;&#x6237;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const serverHandler = (request, response) =&gt; {
  // default
  let responseData = &apos;404&apos;

  if (request.url === &apos;/&apos;) {
    if (request.method === &apos;GET&apos;) {
      responseData = &apos;Hello World&apos;
    } else if (request.method === &apos;POST&apos;) {
      responseData = &apos;Hello World With POST&apos;
    }
  } else if (request.url === &apos;/sub&apos;) {
    responseData = &apos;sub page&apos;
  }

  response.end(responseData) // &#x8FD4;&#x56DE;&#x6570;&#x636E;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> serverHandler = <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
  <span class="hljs-comment">// default</span>
  <span class="hljs-keyword">let</span> responseData = <span class="hljs-string">&apos;404&apos;</span>

  <span class="hljs-keyword">if</span> (request.url === <span class="hljs-string">&apos;/&apos;</span>) {
    <span class="hljs-keyword">if</span> (request.method === <span class="hljs-string">&apos;GET&apos;</span>) {
      responseData = <span class="hljs-string">&apos;Hello World&apos;</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (request.method === <span class="hljs-string">&apos;POST&apos;</span>) {
      responseData = <span class="hljs-string">&apos;Hello World With POST&apos;</span>
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (request.url === <span class="hljs-string">&apos;/sub&apos;</span>) {
    responseData = <span class="hljs-string">&apos;sub page&apos;</span>
  }

  response.end(responseData) <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x6570;&#x636E;</span>
}</code></pre><h2 id="articleHeader2">&#x7C7B;&#x4F3C;Express&#x7684;&#x5B9E;&#x73B0;</h2><p>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x5199;&#x6CD5;&#x8FD8;&#x4F1A;&#x5E26;&#x6765;&#x53E6;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x5927;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x5B58;&#x5728;N&#x591A;&#x7684;&#x63A5;&#x53E3;&#x3002;<br>&#x5982;&#x679C;&#x90FD;&#x5199;&#x5728;&#x8FD9;&#x4E00;&#x4E2A;<code>handler</code>&#x91CC;&#x8FB9;&#x53BB;&#xFF0C;&#x672A;&#x514D;&#x592A;&#x8FC7;&#x96BE;&#x4EE5;&#x7EF4;&#x62A4;&#x3002;<br>&#x793A;&#x4F8B;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x9488;&#x5BF9;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x771F;&#x5B9E;&#x7684;&#x9879;&#x76EE;&#x4E0D;&#x4F1A;&#x6709;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x7684;&#x903B;&#x8F91;&#x5B58;&#x5728;&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x9488;&#x5BF9;<code>handler</code>&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x62BD;&#x8C61;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x65B9;&#x4FBF;&#x7684;&#x7BA1;&#x7406;&#x8DEF;&#x5F84;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App {
  constructor() {
    this.handlers = {}

    this.get = this.route.bind(this, &apos;GET&apos;)
    this.post = this.route.bind(this, &apos;POST&apos;)
  }

  route(method, path, handler) {
    let pathInfo = (this.handlers[path] = this.handlers[path] || {})

    // register handler
    pathInfo[method] = handler
  }

  callback() {
    return (request, response) =&gt; {
      let { url: path, method } = request

      this.handlers[path] &amp;&amp; this.handlers[path][method]
        ? this.handlers[path][method](request, response)
        : response.end(&apos;404&apos;)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.handlers = {}

    <span class="hljs-keyword">this</span>.get = <span class="hljs-keyword">this</span>.route.bind(<span class="hljs-keyword">this</span>, <span class="hljs-string">&apos;GET&apos;</span>)
    <span class="hljs-keyword">this</span>.post = <span class="hljs-keyword">this</span>.route.bind(<span class="hljs-keyword">this</span>, <span class="hljs-string">&apos;POST&apos;</span>)
  }

  route(method, path, handler) {
    <span class="hljs-keyword">let</span> pathInfo = (<span class="hljs-keyword">this</span>.handlers[path] = <span class="hljs-keyword">this</span>.handlers[path] || {})

    <span class="hljs-comment">// register handler</span>
    pathInfo[method] = handler
  }

  callback() {
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> { <span class="hljs-attr">url</span>: path, method } = request

      <span class="hljs-keyword">this</span>.handlers[path] &amp;&amp; <span class="hljs-keyword">this</span>.handlers[path][method]
        ? <span class="hljs-keyword">this</span>.handlers[path][method](request, response)
        : response.end(<span class="hljs-string">&apos;404&apos;</span>)
    }
  }
}</code></pre><p>&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;Router&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x6CE8;&#x518C;&#x5BF9;&#x5E94;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x6700;&#x540E;&#x542F;&#x52A8;&#x670D;&#x52A1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = new App()

app.get(&apos;/&apos;, function (request, response) {
  response.end(&apos;Hello World&apos;)
})

app.post(&apos;/&apos;, function (request, response) {
  response.end(&apos;Hello World With POST&apos;)
})

app.get(&apos;/sub&apos;, function (request, response) {
  response.end(&apos;sub page&apos;)
})

http
  .createServer(app.callback())
  .listen(8888, _ =&gt; console.log(&apos;Server run as http://127.0.0.1:8888&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> App()

app.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
  response.end(<span class="hljs-string">&apos;Hello World&apos;</span>)
})

app.post(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
  response.end(<span class="hljs-string">&apos;Hello World With POST&apos;</span>)
})

app.get(<span class="hljs-string">&apos;/sub&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
  response.end(<span class="hljs-string">&apos;sub page&apos;</span>)
})

http
  .createServer(app.callback())
  .listen(<span class="hljs-number">8888</span>, _ =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Server run as http://127.0.0.1:8888&apos;</span>))</code></pre><h3 id="articleHeader3">Express&#x4E2D;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</h3><p>&#x8FD9;&#x6837;&#xFF0C;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x6574;&#x6D01;&#x7684;<code>HttpServer</code>&#xFF0C;&#x4F46;&#x529F;&#x80FD;&#x4E0A;&#x4F9D;&#x65E7;&#x662F;&#x5F88;&#x7B80;&#x964B;&#x7684;&#x3002;<br>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x6709;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF0C;&#x8981;&#x5728;&#x90E8;&#x5206;&#x8BF7;&#x6C42;&#x7684;&#x524D;&#x8FB9;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x7684;&#x751F;&#x6210;&#xFF0C;&#x6BD4;&#x5982;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x7684;&#x552F;&#x4E00;ID&#x3002;<br>&#x5C06;&#x4EE3;&#x7801;&#x91CD;&#x590D;&#x7F16;&#x5199;&#x5728;&#x6211;&#x4EEC;&#x7684;<code>handler</code>&#x4E2D;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x53EF;&#x53D6;&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x9488;&#x5BF9;<code>route</code>&#x7684;&#x5904;&#x7406;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#xFF0C;&#x4F7F;&#x5176;&#x652F;&#x6301;&#x4F20;&#x5165;&#x591A;&#x4E2A;<code>handler</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="route(method, path, ...handler) {
  let pathInfo = (this.handlers[path] = this.handlers[path] || {})

  // register handler
  pathInfo[method] = handler
}

callback() {
  return (request, response) =&gt; {
    let { url: path, method } = request

    let handlers = this.handlers[path] &amp;&amp; this.handlers[path][method]

    if (handlers) {
      let context = {}
      function next(handlers, index = 0) {
        handlers[index] &amp;&amp;
          handlers[index].call(context, request, response, () =&gt;
            next(handlers, index + 1)
          )
      }

      next(handlers)
    } else {
      response.end(&apos;404&apos;)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">route(method, path, ...handler) {
  <span class="hljs-keyword">let</span> pathInfo = (<span class="hljs-keyword">this</span>.handlers[path] = <span class="hljs-keyword">this</span>.handlers[path] || {})

  <span class="hljs-comment">// register handler</span>
  pathInfo[method] = handler
}

callback() {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> { <span class="hljs-attr">url</span>: path, method } = request

    <span class="hljs-keyword">let</span> handlers = <span class="hljs-keyword">this</span>.handlers[path] &amp;&amp; <span class="hljs-keyword">this</span>.handlers[path][method]

    <span class="hljs-keyword">if</span> (handlers) {
      <span class="hljs-keyword">let</span> context = {}
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">handlers, index = <span class="hljs-number">0</span></span>) </span>{
        handlers[index] &amp;&amp;
          handlers[index].call(context, request, response, () =&gt;
            next(handlers, index + <span class="hljs-number">1</span>)
          )
      }

      next(handlers)
    } <span class="hljs-keyword">else</span> {
      response.end(<span class="hljs-string">&apos;404&apos;</span>)
    }
  }
}</code></pre><p>&#x7136;&#x540E;&#x9488;&#x5BF9;&#x4E0A;&#x8FB9;&#x7684;&#x8DEF;&#x5F84;&#x76D1;&#x542C;&#x6DFB;&#x52A0;&#x5176;&#x4ED6;&#x7684;handler&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function generatorId(request, response, next) {
  this.id = 123
  next()
}

app.get(&apos;/&apos;, generatorId, function(request, response) {
  response.end(`Hello World ${this.id}`)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generatorId</span>(<span class="hljs-params">request, response, next</span>) </span>{
  <span class="hljs-keyword">this</span>.id = <span class="hljs-number">123</span>
  next()
}

app.get(<span class="hljs-string">&apos;/&apos;</span>, generatorId, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
  response.end(<span class="hljs-string">`Hello World <span class="hljs-subst">${<span class="hljs-keyword">this</span>.id}</span>`</span>)
})</code></pre><p>&#x8FD9;&#x6837;&#x5728;&#x8BBF;&#x95EE;&#x63A5;&#x53E3;&#x65F6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;<code>Hello World 123</code>&#x7684;&#x5B57;&#x6837;&#x4E86;&#x3002;<br>&#x8FD9;&#x4E2A;&#x5C31;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x8BA4;&#x4E3A;&#x662F;&#x5728;<code>Express</code>&#x4E2D;&#x5B9E;&#x73B0;&#x7684; <strong>&#x4E2D;&#x95F4;&#x4EF6;</strong>&#x3002;<br>&#x4E2D;&#x95F4;&#x4EF6;&#x662F;<code>Express</code>&#x3001;<code>Koa</code>&#x7684;&#x6838;&#x5FC3;&#x6240;&#x5728;&#xFF0C;&#x4E00;&#x5207;&#x4F9D;&#x8D56;&#x90FD;&#x901A;&#x8FC7;&#x4E2D;&#x95F4;&#x4EF6;&#x6765;&#x8FDB;&#x884C;&#x52A0;&#x8F7D;&#x3002;</p><h2 id="articleHeader4">&#x66F4;&#x7075;&#x6D3B;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x65B9;&#x6848;-&#x6D0B;&#x8471;&#x6A21;&#x578B;</h2><p>&#x4E0A;&#x8FF0;&#x65B9;&#x6848;&#x7684;&#x786E;&#x53EF;&#x4EE5;&#x8BA9;&#x4EBA;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x4F7F;&#x7528;&#x4E00;&#x4E9B;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5728;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#x4E2D;&#x8C03;&#x7528;<code>next()</code>&#x6765;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x4E2A;&#x73AF;&#x8282;&#xFF0C;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#x53D8;&#x5F97;&#x5F88;&#x6E05;&#x6670;&#x3002;<br>&#x4F46;&#x662F;&#x4F9D;&#x7136;&#x5B58;&#x5728;&#x4E00;&#x4E9B;&#x5C40;&#x9650;&#x6027;&#x3002;<br>&#x4F8B;&#x5982;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x63A5;&#x53E3;&#x7684;&#x8017;&#x65F6;&#x7EDF;&#x8BA1;&#xFF0C;&#x5728;<code>Express</code>&#x6709;&#x8FD9;&#x4E48;&#x51E0;&#x79CD;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7684;&#x65B9;&#x6848;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function beforeRequest(request, response, next) {
  this.requestTime = new Date().valueOf()

  next()
}

// &#x65B9;&#x6848;1. &#x4FEE;&#x6539;&#x539F;handler&#x5904;&#x7406;&#x903B;&#x8F91;&#xFF0C;&#x8FDB;&#x884C;&#x8017;&#x65F6;&#x7684;&#x7EDF;&#x8BA1;&#xFF0C;&#x7136;&#x540E;end&#x53D1;&#x9001;&#x6570;&#x636E;
app.get(&apos;/a&apos;, beforeRequest, function(request, response) {
  // &#x8BF7;&#x6C42;&#x8017;&#x65F6;&#x7684;&#x7EDF;&#x8BA1;
  console.log(
    `${request.url} duration: ${new Date().valueOf() - this.requestTime}`
  )

  response.end(&apos;XXX&apos;)
})

// &#x65B9;&#x6848;2. &#x5C06;&#x8F93;&#x51FA;&#x6570;&#x636E;&#x7684;&#x903B;&#x8F91;&#x632A;&#x5230;&#x4E00;&#x4E2A;&#x540E;&#x7F6E;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;
function afterRequest(request, response, next) {
  // &#x8BF7;&#x6C42;&#x8017;&#x65F6;&#x7684;&#x7EDF;&#x8BA1;
  console.log(
    `${request.url} duration: ${new Date().valueOf() - this.requestTime}`
  )

  response.end(this.body)
}

app.get(
  &apos;/b&apos;,
  beforeRequest,
  function(request, response, next) {
    this.body = &apos;XXX&apos;

    next() // &#x8BB0;&#x5F97;&#x8C03;&#x7528;&#xFF0C;&#x4E0D;&#x7136;&#x4E2D;&#x95F4;&#x4EF6;&#x5728;&#x8FD9;&#x91CC;&#x5C31;&#x7EC8;&#x6B62;&#x4E86;
  },
  afterRequest
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">beforeRequest</span>(<span class="hljs-params">request, response, next</span>) </span>{
  <span class="hljs-keyword">this</span>.requestTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()

  next()
}

<span class="hljs-comment">// &#x65B9;&#x6848;1. &#x4FEE;&#x6539;&#x539F;handler&#x5904;&#x7406;&#x903B;&#x8F91;&#xFF0C;&#x8FDB;&#x884C;&#x8017;&#x65F6;&#x7684;&#x7EDF;&#x8BA1;&#xFF0C;&#x7136;&#x540E;end&#x53D1;&#x9001;&#x6570;&#x636E;</span>
app.get(<span class="hljs-string">&apos;/a&apos;</span>, beforeRequest, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{
  <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x8017;&#x65F6;&#x7684;&#x7EDF;&#x8BA1;</span>
  <span class="hljs-built_in">console</span>.log(
    <span class="hljs-string">`<span class="hljs-subst">${request.url}</span> duration: <span class="hljs-subst">${<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf() - <span class="hljs-keyword">this</span>.requestTime}</span>`</span>
  )

  response.end(<span class="hljs-string">&apos;XXX&apos;</span>)
})

<span class="hljs-comment">// &#x65B9;&#x6848;2. &#x5C06;&#x8F93;&#x51FA;&#x6570;&#x636E;&#x7684;&#x903B;&#x8F91;&#x632A;&#x5230;&#x4E00;&#x4E2A;&#x540E;&#x7F6E;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">afterRequest</span>(<span class="hljs-params">request, response, next</span>) </span>{
  <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x8017;&#x65F6;&#x7684;&#x7EDF;&#x8BA1;</span>
  <span class="hljs-built_in">console</span>.log(
    <span class="hljs-string">`<span class="hljs-subst">${request.url}</span> duration: <span class="hljs-subst">${<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf() - <span class="hljs-keyword">this</span>.requestTime}</span>`</span>
  )

  response.end(<span class="hljs-keyword">this</span>.body)
}

app.get(
  <span class="hljs-string">&apos;/b&apos;</span>,
  beforeRequest,
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response, next</span>) </span>{
    <span class="hljs-keyword">this</span>.body = <span class="hljs-string">&apos;XXX&apos;</span>

    next() <span class="hljs-comment">// &#x8BB0;&#x5F97;&#x8C03;&#x7528;&#xFF0C;&#x4E0D;&#x7136;&#x4E2D;&#x95F4;&#x4EF6;&#x5728;&#x8FD9;&#x91CC;&#x5C31;&#x7EC8;&#x6B62;&#x4E86;</span>
  },
  afterRequest
)</code></pre><p>&#x65E0;&#x8BBA;&#x662F;&#x54EA;&#x4E00;&#x79CD;&#x65B9;&#x6848;&#xFF0C;&#x5BF9;&#x4E8E;&#x539F;&#x6709;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x4E00;&#x79CD;&#x7834;&#x574F;&#x6027;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x8FD9;&#x662F;&#x4E0D;&#x53EF;&#x53D6;&#x7684;&#x3002;<br>&#x56E0;&#x4E3A;<code>Express</code>&#x91C7;&#x7528;&#x4E86;<code>response.end()</code>&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5411;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x65B9;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF0C;&#x8C03;&#x7528;&#x540E;&#x5373;&#x4F1A;&#x7EC8;&#x6B62;&#x540E;&#x7EED;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#x3002;<br>&#x800C;&#x4E14;&#x56E0;&#x4E3A;&#x5F53;&#x65F6;&#x6CA1;&#x6709;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x65B9;&#x6848;&#x53BB;&#x7B49;&#x5F85;&#x67D0;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x7684;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a(_, _, next) {
  console.log(&apos;before a&apos;)
  let results = next()
  console.log(&apos;after a&apos;)
}

function b(_, _, next) {
  console.log(&apos;before b&apos;)
  setTimeout(_ =&gt; {
    this.body = 123456
    next()
  }, 1000)
}

function c(_, response) {
  console.log(&apos;before c&apos;)
  response.end(this.body)
}

app.get(&apos;/&apos;, a, b, c)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params">_, _, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;before a&apos;</span>)
  <span class="hljs-keyword">let</span> results = next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;after a&apos;</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params">_, _, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;before b&apos;</span>)
  setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.body = <span class="hljs-number">123456</span>
    next()
  }, <span class="hljs-number">1000</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params">_, response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;before c&apos;</span>)
  response.end(<span class="hljs-keyword">this</span>.body)
}

app.get(<span class="hljs-string">&apos;/&apos;</span>, a, b, c)</code></pre><p>&#x5C31;&#x50CF;&#x4E0A;&#x8FF0;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;log&#x7684;&#x8F93;&#x51FA;&#x987A;&#x5E8F;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="before a
before b
after a
before c" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">before a
before b
after a
before c</code></pre><p>&#x8FD9;&#x663E;&#x7136;&#x4E0D;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x7684;&#x9884;&#x671F;&#xFF0C;&#x6240;&#x4EE5;&#x5728;<code>Express</code>&#x4E2D;&#x83B7;&#x53D6;<code>next()</code>&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x6CA1;&#x6709;&#x610F;&#x4E49;&#x7684;&#x3002;</p><p>&#x6240;&#x4EE5;&#x5C31;&#x6709;&#x4E86;<code>Koa</code>&#x5E26;&#x6765;&#x7684;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#xFF0C;&#x5728;<code>Koa1.x</code>&#x51FA;&#x73B0;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x6B63;&#x597D;&#x8D76;&#x4E0A;&#x4E86;Node&#x652F;&#x6301;&#x4E86;&#x65B0;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;<code>Generator</code>&#x51FD;&#x6570;&#x53CA;<code>Promise</code>&#x7684;&#x5B9A;&#x4E49;&#x3002;<br>&#x6240;&#x4EE5;&#x624D;&#x6709;&#x4E86;<code>co</code>&#x8FD9;&#x6837;&#x4EE4;&#x4EBA;&#x60CA;&#x53F9;&#x7684;&#x5E93;&#xFF0C;&#x800C;&#x5F53;&#x6211;&#x4EEC;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4F7F;&#x7528;&#x4E86;<code>Promise</code>&#x4EE5;&#x540E;&#xFF0C;&#x524D;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x6613;&#x7684;&#x5728;&#x540E;&#x7EED;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x518D;&#x5904;&#x7406;&#x81EA;&#x5DF1;&#x7684;&#x4E8B;&#x60C5;&#x3002;<br>&#x4F46;&#x662F;&#xFF0C;<code>Generator</code>&#x672C;&#x8EAB;&#x7684;&#x4F5C;&#x7528;&#x5E76;&#x4E0D;&#x662F;&#x7528;&#x6765;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x66F4;&#x8F7B;&#x677E;&#x7684;&#x4F7F;&#x7528;<code>Promise</code>&#x6765;&#x505A;&#x5F02;&#x6B65;&#x6D41;&#x7A0B;&#x7684;&#x63A7;&#x5236;&#x3002;<br>&#x6240;&#x4EE5;&#xFF0C;&#x968F;&#x7740;Node7.6&#x7248;&#x672C;&#x7684;&#x53D1;&#x51FA;&#xFF0C;&#x652F;&#x6301;&#x4E86;<code>async</code>&#x3001;<code>await</code>&#x8BED;&#x6CD5;&#xFF0C;&#x793E;&#x533A;&#x4E5F;&#x63A8;&#x51FA;&#x4E86;<code>Koa2.x</code>&#xFF0C;&#x4F7F;&#x7528;<code>async</code>&#x8BED;&#x6CD5;&#x66FF;&#x6362;&#x4E4B;&#x524D;&#x7684;<code>co</code>+<code>Generator</code>&#x3002;</p><p><code>Koa</code>&#x4E5F;&#x5C06;<code>co</code>&#x4ECE;&#x4F9D;&#x8D56;&#x4E2D;&#x79FB;&#x9664;&#xFF08;2.x&#x7248;&#x672C;&#x4F7F;&#x7528;<a href="https://github.com/koajs/convert" rel="nofollow noreferrer" target="_blank">koa-convert</a>&#x5C06;<code>Generator</code>&#x51FD;&#x6570;&#x8F6C;&#x6362;&#x4E3A;<code>promise</code>&#xFF0C;&#x5728;3.x&#x7248;&#x672C;&#x4E2D;&#x5C06;&#x76F4;&#x63A5;&#x4E0D;&#x652F;&#x6301;<code>Generator</code>&#xFF09;<br><em>ref: <a href="https://github.com/koajs/koa/blob/162a5b3e78bf0838cee67119804f066d6e38bf02/lib/application.js#L108" rel="nofollow noreferrer" target="_blank">remove generator supports</a></em></p><p><em>&#x7531;&#x4E8E;&#x5728;&#x529F;&#x80FD;&#x3001;&#x4F7F;&#x7528;&#x4E0A;<code>Koa</code>&#x7684;&#x4E24;&#x4E2A;&#x7248;&#x672C;&#x4E4B;&#x95F4;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#xFF0C;&#x6700;&#x591A;&#x5C31;&#x662F;&#x4E00;&#x4E9B;&#x8BED;&#x6CD5;&#x7684;&#x8C03;&#x6574;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#x4E00;&#x4E9B;<code>Koa1.x</code>&#x76F8;&#x5173;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x76F4;&#x5954;&#x4E3B;&#x9898;&#x3002;</em></p><p>&#x5728;<code>Koa</code>&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5B9A;&#x4E49;&#x4E2D;&#x95F4;&#x4EF6;&#x5E76;&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function log(ctx, next) {
  let requestTime = new Date().valueOf()
  await next()
  
  console.log(`${ctx.url} duration: ${new Date().valueOf() - requestTime}`)
}

router.get(&apos;/&apos;, log, ctx =&gt; {
  // do something...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params">ctx, next</span>) </span>{
  <span class="hljs-keyword">let</span> requestTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
  <span class="hljs-keyword">await</span> next()
  
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ctx.url}</span> duration: <span class="hljs-subst">${<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf() - requestTime}</span>`</span>)
}

router.get(<span class="hljs-string">&apos;/&apos;</span>, log, ctx =&gt; {
  <span class="hljs-comment">// do something...</span>
})</code></pre><p>&#x56E0;&#x4E3A;&#x4E00;&#x4E9B;&#x8BED;&#x6CD5;&#x7CD6;&#x7684;&#x5B58;&#x5728;&#xFF0C;&#x906E;&#x76D6;&#x4E86;&#x4EE3;&#x7801;&#x5B9E;&#x9645;&#x8FD0;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<code>Promise</code>&#x6765;&#x8FD8;&#x539F;&#x4E00;&#x4E0B;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function log() {
  return new Promise((resolve, reject) =&gt; {
    let requestTime = new Date().valueOf()
    next().then(_ =&gt; {
      console.log(`${ctx.url} duration: ${new Date().valueOf() - requestTime}`)
    }).then(resolve)
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> requestTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf()
    next().then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ctx.url}</span> duration: <span class="hljs-subst">${<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().valueOf() - requestTime}</span>`</span>)
    }).then(resolve)
  })
}</code></pre><p>&#x5927;&#x81F4;&#x4EE3;&#x7801;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x8C03;&#x7528;<code>next</code>&#x4F1A;&#x7ED9;&#x6211;&#x4EEC;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>Promise</code>&#x5BF9;&#x8C61;&#xFF0C;&#x800C;<code>Promise</code>&#x4F55;&#x65F6;&#x4F1A;<code>resolve</code>&#x5C31;&#x662F;<code>Koa</code>&#x5185;&#x90E8;&#x505A;&#x7684;&#x5904;&#x7406;&#x3002;<br>&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x73B0;&#x4E00;&#x4E0B;&#xFF08;&#x5173;&#x4E8E;&#x4E0A;&#x8FB9;&#x5B9E;&#x73B0;&#x7684;App&#x7C7B;&#xFF0C;&#x4EC5;&#x4EC5;&#x9700;&#x8981;&#x4FEE;&#x6539;<code>callback</code>&#x5373;&#x53EF;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="callback() {
  return (request, response) =&gt; {
    let { url: path, method } = request

    let handlers = this.handlers[path] &amp;&amp; this.handlers[path][method]

    if (handlers) {
      let context = { url: request.url }
      function next(handlers, index = 0) {
        return new Promise((resolve, reject) =&gt; {
          if (!handlers[index]) return resolve()

          handlers[index](context, () =&gt; next(handlers, index + 1)).then(
            resolve,
            reject
          )
        })
      }

      next(handlers).then(_ =&gt; {
        // &#x7ED3;&#x675F;&#x8BF7;&#x6C42;
        response.end(context.body || &apos;404&apos;)
      })
    } else {
      response.end(&apos;404&apos;)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">callback() {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">request, response</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> { <span class="hljs-attr">url</span>: path, method } = request

    <span class="hljs-keyword">let</span> handlers = <span class="hljs-keyword">this</span>.handlers[path] &amp;&amp; <span class="hljs-keyword">this</span>.handlers[path][method]

    <span class="hljs-keyword">if</span> (handlers) {
      <span class="hljs-keyword">let</span> context = { <span class="hljs-attr">url</span>: request.url }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params">handlers, index = <span class="hljs-number">0</span></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (!handlers[index]) <span class="hljs-keyword">return</span> resolve()

          handlers[index](context, () =&gt; next(handlers, index + <span class="hljs-number">1</span>)).then(
            resolve,
            reject
          )
        })
      }

      next(handlers).then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
        <span class="hljs-comment">// &#x7ED3;&#x675F;&#x8BF7;&#x6C42;</span>
        response.end(context.body || <span class="hljs-string">&apos;404&apos;</span>)
      })
    } <span class="hljs-keyword">else</span> {
      response.end(<span class="hljs-string">&apos;404&apos;</span>)
    }
  }
}</code></pre><p>&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;&#x65F6;&#x5C31;&#x76D1;&#x542C;<code>then</code>&#xFF0C;&#x5E76;&#x5C06;&#x5F53;&#x524D;<code>Promise</code>&#x7684;<code>resolve</code>&#x4E0E;<code>reject</code>&#x5904;&#x7406;&#x4F20;&#x5165;<code>Promise</code>&#x7684;&#x56DE;&#x8C03;&#x4E2D;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;<code>resolve</code>&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;<code>then</code>&#x56DE;&#x8C03;&#x624D;&#x4F1A;&#x6267;&#x884C;&#x3002;<br>&#x8FD9;&#x6837;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x3002;</p><p>&#x5C31;&#x50CF;&#x6211;&#x4EEC;&#x7684;<code>log</code>&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x7684;&#x6D41;&#x7A0B;&#xFF1A;</p><ol><li>&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x6233;<code>requestTime</code></li><li>&#x8C03;&#x7528;<code>next()</code>&#x6267;&#x884C;&#x540E;&#x7EED;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5E76;&#x76D1;&#x542C;&#x5176;&#x56DE;&#x8C03;</li><li>&#x7B2C;&#x4E8C;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x91CC;&#x8FB9;&#x53EF;&#x80FD;&#x4F1A;&#x8C03;&#x7528;&#x7B2C;&#x4E09;&#x4E2A;&#x3001;&#x7B2C;&#x56DB;&#x4E2A;&#x3001;&#x7B2C;&#x4E94;&#x4E2A;&#xFF0C;&#x4F46;&#x8FD9;&#x90FD;&#x4E0D;&#x662F;<code>log</code>&#x6240;&#x5173;&#x5FC3;&#x7684;&#xFF0C;<code>log</code>&#x53EA;&#x5173;&#x5FC3;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x4F55;&#x65F6;<code>resolve</code>&#xFF0C;&#x800C;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;<code>resolve</code>&#x5219;&#x4F9D;&#x8D56;&#x4ED6;&#x540E;&#x8FB9;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;<code>resolve</code>&#x3002;</li><li>&#x7B49;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;<code>resolve</code>&#xFF0C;&#x8FD9;&#x5C31;&#x610F;&#x5473;&#x7740;&#x540E;&#x7EED;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5728;&#x6267;&#x884C;&#x4E86;&#xFF08;&#x5168;&#x90FD;<code>resolve</code>&#x4E86;&#xFF09;&#xFF0C;&#x6B64;&#x65F6;<code>log</code>&#x624D;&#x4F1A;&#x7EE7;&#x7EED;&#x540E;&#x7EED;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;</li></ol><p>&#x6240;&#x4EE5;&#x5C31;&#x50CF;&#x6D0B;&#x8471;&#x4E00;&#x6837;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x7684;&#x5305;&#x88F9;&#xFF0C;&#x6700;&#x5916;&#x5C42;&#x662F;&#x6700;&#x5927;&#x7684;&#xFF0C;&#x662F;&#x6700;&#x5148;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x4E5F;&#x662F;&#x6700;&#x540E;&#x6267;&#x884C;&#x7684;&#x3002;&#xFF08;&#x5728;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x8BF7;&#x6C42;&#x4E2D;&#xFF0C;<code>next</code>&#x4E4B;&#x524D;&#x6700;&#x5148;&#x6267;&#x884C;&#xFF0C;<code>next</code>&#x4E4B;&#x540E;&#x6700;&#x540E;&#x6267;&#x884C;&#xFF09;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVLSos?w=478&amp;h=435" src="https://static.alili.tech/img/bVLSos?w=478&amp;h=435" alt="68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67" title="68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader5">&#x5C0F;&#x8BB0;</h2><p>&#x6700;&#x8FD1;&#x62BD;&#x65F6;&#x95F4;&#x5C06;<code>Koa</code>&#x76F8;&#x5173;&#x7684;&#x6E90;&#x7801;&#x7FFB;&#x770B;&#x4E00;&#x6CE2;&#xFF0C;&#x770B;&#x5F97;&#x633A;&#x6FC0;&#x52A8;&#x7684;&#xFF0C;&#x60F3;&#x8981;&#x5C06;&#x5B83;&#x4EEC;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#x3002;<br>&#x5E94;&#x8BE5;&#x4F1A;&#x62C6;&#x5206;&#x4E3A;&#x51E0;&#x6BB5;&#x6765;&#xFF0C;&#x4E0D;&#x4E00;&#x7BC7;&#x5168;&#x5199;&#x4E86;&#xFF0C;&#x4E0A;&#x6B21;&#x5199;&#x4E86;&#x4E2A;&#x88C5;&#x9970;&#x5668;&#x7684;&#xFF0C;&#x592A;&#x957F;&#xFF0C;&#x770B;&#x5F97;&#x81EA;&#x5DF1;&#x90FD;&#x56F0;&#x4E86;&#x3002;<br>&#x5148;&#x5360;&#x51E0;&#x4E2A;&#x5751;&#xFF1A;</p><ul><li><strong>&#x6838;&#x5FC3;&#x6A21;&#x5757; koa&#x4E0E;koa-compose</strong></li><li><strong>&#x70ED;&#x95E8;&#x4E2D;&#x95F4;&#x4EF6; koa-router&#x4E0E;koa-views</strong></li><li><strong>&#x6742;&#x4E03;&#x6742;&#x516B;&#x7684;&#x8F6E;&#x5B50; koa-bodyparser/multer/better-body/static</strong></li></ul><p><a href="https://github.com/Jiasm/notebook/tree/master/labs/demo/node/learning-koa" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x4ED3;&#x5E93;&#x5730;&#x5740;</a><br><a href="https://github.com/Jiasm/notebook/blob/master/notes/koa%20%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB/readme.md" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x4ED3;&#x5E93;&#x5730;&#x5740;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa源码阅读[0]

## 原文链接
[https://segmentfault.com/a/1190000015724787](https://segmentfault.com/a/1190000015724787)

