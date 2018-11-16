---
title: '精读《REST, GraphQL, Webhooks, & gRPC 如何选型》'
hidden: true
categories: [reprint]
slug: df886006
date: 2018-11-02 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">1 &#x5F15;&#x8A00;</h2><p>&#x6BCF;&#x5F53;&#x9879;&#x76EE;&#x8FDB;&#x5165;&#x8054;&#x8C03;&#x9636;&#x6BB5;&#xFF0C;&#x6216;&#x8005;&#x63D0;&#x524D;&#x7EA6;&#x5B9A;&#x63A5;&#x53E3;&#x65F6;&#xFF0C;&#x524D;&#x540E;&#x7AEF;&#x5C31;&#x4F1A;&#x805A;&#x5728;&#x4E00;&#x8D77;&#x70ED;&#x706B;&#x671D;&#x5929;&#x7684;&#x8BA8;&#x8BBA;&#x8D77;&#x6765;&#x3002;&#x53EF;&#x80FD; 99% &#x7684;&#x573A;&#x666F;&#x90FD;&#x5728;&#x7EA6;&#x5B9A; Http &#x63A5;&#x53E3;&#xFF0C;&#x8BA8;&#x8BBA; URL &#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5165;&#x53C2;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x51FA;&#x53C2;&#x662F;&#x4EC0;&#x4E48;&#x3002;</p><p>&#x6709;&#x7684;&#x56E2;&#x961F;&#x524D;&#x540E;&#x7AEF;&#x63A5;&#x53E3;&#x7EA6;&#x5B9A;&#x66F4;&#x52A0;&#x9AD8;&#x6548;&#xFF0C;&#x540E;&#x7AEF;&#x4F1A;&#x62FF;&#x51FA;&#x63A5;&#x53E3;&#x5B9A;&#x4E49;&#x4EE3;&#x7801;&#xFF0C;&#x524D;&#x7AEF;&#x4F1A;&#x8F6C;&#x6362;&#x6210;&#xFF08;&#x6216;&#x81EA;&#x52A8;&#x8F6C;&#x6210;&#xFF09;Typescript &#x5B9A;&#x4E49;&#x6587;&#x4EF6;&#x3002;</p><p>&#x4F46;&#x8FD9;&#x4E9B;&#x5DE5;&#x4F5C;&#x90FD;&#x9488;&#x5BF9;&#x4E8E; Http &#x63A5;&#x53E3;&#xFF0C;&#x4ECA;&#x5929;&#x901A;&#x8FC7; <a href="https://nordicapis.com/when-to-use-what-rest-graphql-webhooks-grpc/" rel="nofollow noreferrer" target="_blank">when-to-use-what-rest-graphql-webhooks-grpc</a> &#x4E00;&#x6587;&#xFF0C;&#x629B;&#x5F00;&#x8054;&#x8C03;&#x65F6;&#x5343;&#x904D;&#x4E00;&#x5F8B;&#x7684; Http &#x63A5;&#x53E3;&#xFF0C;&#x4E00;&#x8D77;&#x770B;&#x770B;&#x63A5;&#x53E3;&#x8FD8;&#x53EF;&#x4EE5;&#x600E;&#x4E48;&#x7EA6;&#x5B9A;&#xFF0C;&#x5206;&#x522B;&#x9002;&#x7528;&#x4E8E;&#x54EA;&#x4E9B;&#x573A;&#x666F;&#xFF0C;&#x4F60;&#x73B0;&#x5728;&#x5904;&#x4E8E;&#x54EA;&#x4E2A;&#x573A;&#x666F;&#x3002;</p><h2 id="articleHeader1">2 &#x6982;&#x8FF0;</h2><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x8BB2;&#x4E86;&#x56DB;&#x79CD;&#x63A5;&#x53E3;&#x8BBE;&#x8BA1;&#x65B9;&#x6848;&#xFF0C;&#x5206;&#x522B;&#x662F;&#xFF1A;REST&#x3001;gRPC&#x3001;GraphQL&#x3001;Webhooks&#xFF0C;&#x4E0B;&#x9762;&#x5206;&#x522B;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x3002;</p><h3 id="articleHeader2">REST</h3><p>REST &#x4E5F;&#x8BB8;&#x662F;&#x6700;&#x901A;&#x7528;&#xFF0C;&#x4E5F;&#x662F;&#x6700;&#x5E38;&#x7528;&#x7684;&#x63A5;&#x53E3;&#x8BBE;&#x8BA1;&#x65B9;&#x6848;&#xFF0C;&#x5B83;&#x662F; <strong>&#x65E0;&#x72B6;&#x6001;&#x7684;</strong>&#xFF0C;&#x4EE5;&#x8D44;&#x6E90;&#x4E3A;&#x6838;&#x5FC3;&#xFF0C;&#x9488;&#x5BF9;&#x5982;&#x4F55;&#x64CD;&#x4F5C;&#x8D44;&#x6E90;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x7CFB;&#x5217; URL &#x7EA6;&#x5B9A;&#xFF0C;&#x800C;&#x64CD;&#x4F5C;&#x7C7B;&#x578B;&#x901A;&#x8FC7; <code>GET</code> <code>POST</code> <code>PUT</code> <code>DELETE</code> &#x7B49; HTTP Methods &#x8868;&#x793A;&#x3002;</p><p>REST &#x57FA;&#x4E8E;&#x539F;&#x751F; HTTP &#x63A5;&#x53E3;&#xFF0C;&#x56E0;&#x6B64;&#x6539;&#x9020;&#x6210;&#x672C;&#x5F88;&#x5C0F;&#xFF0C;&#x800C;&#x4E14;&#x5176;&#x65E0;&#x72B6;&#x6001;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x964D;&#x4F4E;&#x4E86;&#x524D;&#x540E;&#x7AEF;&#x8026;&#x5408;&#x7A0B;&#x5EA6;&#xFF0C;&#x5229;&#x4E8E;&#x5FEB;&#x901F;&#x8FED;&#x4EE3;&#x3002;</p><p>&#x968F;&#x7740;&#x672A;&#x6765;&#x53D1;&#x5C55;&#xFF0C;REST &#x53EF;&#x80FD;&#x66F4;&#x9002;&#x5408;&#x63D0;&#x4F9B;&#x5FAE;&#x670D;&#x52A1; API&#x3002;</p><p>&#x4F7F;&#x7528;&#x4E3E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -v -X GET https://api.sandbox.paypal.com/v1/activities/activities?start_time=2012-01-01T00:00:01.000Z&amp;amp;end_time=2014-10-01T23:59:59.999Z&amp;amp;page_size=10 \
-H &quot;Content-Type: application/json&quot; \
-H &quot;Authorization: Bearer Access-Token&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">curl -v -X GET https://api.sandbox.paypal.com/v1/activities/activities?start_time=2012-01-01T00:00:01.000Z&amp;amp;end_time=2014-10-01T23:59:59.999Z&amp;amp;page_size=10 \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-H <span class="hljs-string">&quot;Authorization: Bearer Access-Token&quot;</span></code></pre><h3 id="articleHeader3">gRPC</h3><p>gRPC &#x662F;&#x5BF9; RPC &#x7684;&#x4E00;&#x4E2A;&#x65B0;&#x5C1D;&#x8BD5;&#xFF0C;&#x6700;&#x5927;&#x7279;&#x70B9;&#x662F;&#x4F7F;&#x7528; protobufs &#x8BED;&#x8A00;&#x683C;&#x5F0F;&#x5316;&#x6570;&#x636E;&#x3002;</p><p>RPC &#x4E3B;&#x8981;&#x7528;&#x6765;&#x505A;&#x670D;&#x52A1;&#x5668;&#x4E4B;&#x95F4;&#x7684;&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#xFF0C;&#x5F71;&#x54CD;&#x5176;&#x6027;&#x80FD;&#x6700;&#x91CD;&#x8981;&#x56E0;&#x7D20;&#x5C31;&#x662F; &#x5E8F;&#x5217;&#x5316;/&#x53CD;&#x5E8F;&#x5217;&#x5316; &#x6548;&#x7387;&#x3002;RPC &#x7684;&#x76EE;&#x7684;&#x662F;&#x6253;&#x9020;&#x4E00;&#x4E2A;&#x9AD8;&#x6548;&#x7387;&#x3001;&#x4F4E;&#x6D88;&#x8017;&#x7684;&#x670D;&#x52A1;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x56E0;&#x6B64;&#x6BD4;&#x8F83;&#x9002;&#x5408; IOT &#x7B49;&#x5BF9;&#x8D44;&#x6E90;&#x3001;&#x5E26;&#x5BBD;&#x3001;&#x6027;&#x80FD;&#x654F;&#x611F;&#x7684;&#x573A;&#x666F;&#x3002;&#x800C; gRPC &#x5229;&#x7528; protobufs &#x8FDB;&#x4E00;&#x6B65;&#x63D0;&#x9AD8;&#x4E86;&#x5E8F;&#x5217;&#x5316;&#x901F;&#x5EA6;&#xFF0C;&#x964D;&#x4F4E;&#x4E86;&#x6570;&#x636E;&#x5305;&#x5927;&#x5C0F;&#x3002;</p><p>&#x4F7F;&#x7528;&#x4E3E;&#x4F8B;&#xFF1A;</p><p>gRPC &#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x670D;&#x52A1;&#x4E4B;&#x95F4;&#x4F20;&#x8F93;&#xFF0C;&#x8FD9;&#x91CC;&#x62FF; Nodejs &#x4E3E;&#x4F8B;&#xFF1A;</p><p>1.&#x5B9A;&#x4E49;&#x63A5;&#x53E3;&#x3002;&#x7531;&#x4E8E; gRPC &#x4F7F;&#x7528; protobufs&#xFF0C;&#x6240;&#x4EE5;&#x63A5;&#x53E3;&#x5B9A;&#x4E49;&#x6587;&#x4EF6;&#x5C31;&#x662F; <code>helloword.proto</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  // Sends another greeting
  rpc SayHelloAgain (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user&apos;s name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs thrift"><code class="protobufs"><span class="hljs-comment">// The greeting service definition.</span>
<span class="hljs-class"><span class="hljs-keyword">service</span> <span class="hljs-title">Greeter</span> </span>{
  <span class="hljs-comment">// Sends a greeting</span>
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  <span class="hljs-comment">// Sends another greeting</span>
  rpc SayHelloAgain (HelloRequest) returns (HelloReply) {}
}

<span class="hljs-comment">// The request message containing the user&apos;s name.</span>
message HelloRequest {
  <span class="hljs-built_in">string</span> name = <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// The response message containing the greetings</span>
message HelloReply {
  <span class="hljs-built_in">string</span> message = <span class="hljs-number">1</span>;
}</code></pre><p>&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x4E86;&#x670D;&#x52A1; <code>Greeter</code>&#xFF0C;&#x62E5;&#x6709;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;<code>SayHello</code> &#x4E0E; <code>SayHelloAgain</code>&#xFF0C;&#x901A;&#x8FC7; <code>message</code> &#x5173;&#x952E;&#x5B57;&#x5B9A;&#x4E49;&#x4E86;&#x5165;&#x53C2;&#x4E0E;&#x51FA;&#x53C2;&#x7684;&#x7ED3;&#x6784;&#x3002;</p><p>&#x4E8B;&#x5B9E;&#x4E0A;&#x5229;&#x7528; protobufs&#xFF0C;&#x4F20;&#x8F93;&#x6570;&#x636E;&#x65F6;&#x4EC5;&#x4F20;&#x9001;&#x5F88;&#x5C11;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4F5C;&#x4E3A;&#x4EE3;&#x4EF7;&#xFF0C;&#x53CC;&#x65B9;&#x90FD;&#x8981;&#x77E5;&#x9053;&#x63A5;&#x53E3;&#x5B9A;&#x4E49;&#x89C4;&#x5219;&#x624D;&#x80FD;&#x5E8F;&#x5217;&#x5316;/&#x53CD;&#x5E8F;&#x5217;&#x5316;&#x3002;</p><p>2.&#x5B9A;&#x4E49;&#x670D;&#x52A1;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello(call, callback) {
  callback(null, { message: &quot;Hello &quot; + call.request.name });
}

function sayHelloAgain(call, callback) {
  callback(null, { message: &quot;Hello again, &quot; + call.request.name });
}

function main() {
  var server = new grpc.Server();
  server.addProtoService(hello_proto.Greeter.service, {
    sayHello: sayHello,
    sayHelloAgain: sayHelloAgain
  });
  server.bind(&quot;0.0.0.0:50051&quot;, grpc.ServerCredentials.createInsecure());
  server.start();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params">call, callback</span>) </span>{
  callback(<span class="hljs-literal">null</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;Hello &quot;</span> + call.request.name });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHelloAgain</span>(<span class="hljs-params">call, callback</span>) </span>{
  callback(<span class="hljs-literal">null</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;Hello again, &quot;</span> + call.request.name });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> server = <span class="hljs-keyword">new</span> grpc.Server();
  server.addProtoService(hello_proto.Greeter.service, {
    <span class="hljs-attr">sayHello</span>: sayHello,
    <span class="hljs-attr">sayHelloAgain</span>: sayHelloAgain
  });
  server.bind(<span class="hljs-string">&quot;0.0.0.0:50051&quot;</span>, grpc.ServerCredentials.createInsecure());
  server.start();
}</code></pre><p>&#x6211;&#x4EEC;&#x5728; <code>50051</code> &#x7AEF;&#x53E3;&#x652F;&#x6301;&#x4E86; gRPC &#x670D;&#x52A1;&#xFF0C;&#x5E76;&#x6CE8;&#x518C;&#x4E86;&#x670D;&#x52A1; <code>Greeter</code>&#xFF0C;&#x5E76;&#x5BF9; <code>sayHello</code> <code>sayHelloAgain</code> &#x65B9;&#x6CD5;&#x505A;&#x4E86;&#x4E00;&#x4E9B;&#x4E1A;&#x52A1;&#x5904;&#x7406;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x7ED9;&#x8C03;&#x7528;&#x65B9;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#x3002;</p><p>3.&#x5B9A;&#x4E49;&#x5BA2;&#x6237;&#x7AEF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function main() {
  var client = new hello_proto.Greeter(
    &quot;localhost:50051&quot;,
    grpc.credentials.createInsecure()
  );
  client.sayHello({ name: &quot;you&quot; }, function(err, response) {
    console.log(&quot;Greeting:&quot;, response.message);
  });
  client.sayHelloAgain({ name: &quot;you&quot; }, function(err, response) {
    console.log(&quot;Greeting:&quot;, response.message);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> hello_proto.Greeter(
    <span class="hljs-string">&quot;localhost:50051&quot;</span>,
    grpc.credentials.createInsecure()
  );
  client.sayHello({ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;you&quot;</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, response</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;Greeting:&quot;</span>, response.message);
  });
  client.sayHelloAgain({ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;you&quot;</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, response</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;Greeting:&quot;</span>, response.message);
  });
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x7AEF;&#x540C;&#x65F6;&#x9700;&#x8981;&#x62FF;&#x5230; proto &#x7ED3;&#x6784;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x6570;&#x636E;&#x53D1;&#x9001;&#x4E5F;&#x8981;&#x4F9D;&#x8D56; proto &#x5305;&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6846;&#x67B6;&#x4F1A;&#x5185;&#x7F6E;&#x505A;&#x6389;&#x5E8F;&#x5217;&#x5316;/&#x53CD;&#x5E8F;&#x5217;&#x5316;&#x7684;&#x5DE5;&#x4F5C;&#x3002;</p><blockquote>&#x4E5F;&#x6709;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x624B;&#x6BB5;&#x5C06; gRPC &#x8F6C;&#x6362;&#x4E3A; http &#x670D;&#x52A1;&#xFF0C;&#x8BA9;&#x7F51;&#x9875;&#x7AEF;&#x4E5F;&#x4EAB;&#x53D7;&#x5230;&#x5176;&#x9AD8;&#x6548;&#x3001;&#x4F4E;&#x8017;&#x7684;&#x597D;&#x5904;&#x3002;&#x4F46;&#x662F;&#x4E0D;&#x8981;&#x5FD8;&#x4E86;&#xFF0C;RPC &#x6700;&#x5E38;&#x7528;&#x7684;&#x573A;&#x666F;&#x662F; IOT &#x7B49;&#x786C;&#x4EF6;&#x9886;&#x57DF;&#xFF0C;&#x7F51;&#x9875;&#x573A;&#x666F;&#x4E5F;&#x8BB8;&#x4E0D;&#x4F1A;&#x5728;&#x4E4E;&#x8282;&#x7701;&#x51E0; KB &#x7684;&#x6D41;&#x91CF;&#x3002;</blockquote><h3 id="articleHeader4">GraphQL</h3><p>GraphQL &#x4E0D;&#x662F; REST &#x7684;&#x66FF;&#x4EE3;&#x54C1;&#xFF0C;&#x800C;&#x662F;&#x53E6;&#x4E00;&#x79CD;&#x4EA4;&#x4E92;&#x5F62;&#x5F0F;&#xFF1A;&#x524D;&#x7AEF;&#x51B3;&#x5B9A;&#x540E;&#x7AEF;&#x7684;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x3002;</p><p>GraphQL &#x5E26;&#x6765;&#x7684;&#x6700;&#x5927;&#x597D;&#x5904;&#x662F;&#x7CBE;&#x7B80;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x5185;&#x5BB9;&#xFF0C;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x5197;&#x4F59;&#x5B57;&#x6BB5;&#xFF0C;&#x524D;&#x7AEF;&#x53EF;&#x4EE5;&#x51B3;&#x5B9A;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x4EC0;&#x4E48;&#x6570;&#x636E;&#x3002;&#x4F46;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x524D;&#x7AEF;&#x7684;&#x51B3;&#x5B9A;&#x6743;&#x53D6;&#x51B3;&#x4E8E;&#x540E;&#x7AEF;&#x652F;&#x6301;&#x4EC0;&#x4E48;&#x6570;&#x636E;&#xFF0C;&#x56E0;&#x6B64; GraphQL &#x66F4;&#x50CF;&#x662F;&#x7CBE;&#x7B80;&#x4E86;&#x8FD4;&#x56DE;&#x503C;&#x7684; REST&#xFF0C;&#x800C;&#x540E;&#x7AEF;&#x63A5;&#x53E3;&#x4E5F;&#x53EF;&#x4EE5;&#x4E00;&#x6B21;&#x6027;&#x5B9A;&#x4E49;&#x5B8C;&#x6240;&#x6709;&#x529F;&#x80FD;&#xFF0C;&#x800C;&#x4E0D;&#x9700;&#x8981;&#x9010;&#x4E2A;&#x5F00;&#x53D1;&#x3002;</p><p>&#x518D;&#x6B21;&#x5F3A;&#x8C03;&#xFF0C;&#x76F8;&#x6BD4; REST &#x548C; gRPC&#xFF0C;GraphQL &#x662F;&#x7531;&#x524D;&#x7AEF;&#x51B3;&#x5B9A;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x7684;&#x53CD;&#x6A21;&#x5F0F;&#x3002;</p><p>&#x4F7F;&#x7528;&#x4E3E;&#x4F8B;&#xFF1A;</p><p>&#x539F;&#x6587;&#x63A8;&#x8350;&#x53C2;&#x8003; <a href="https://developer.github.com/v4/" rel="nofollow noreferrer" target="_blank">GitHub GraphQL API</a></p><p>&#x6BD4;&#x5982;&#x67E5;&#x8BE2;&#x67D0;&#x4E2A;&#x7EC4;&#x7EC7;&#x4E0B;&#x7684;&#x6210;&#x5458;&#xFF0C;REST &#x98CE;&#x683C;&#x63A5;&#x53E3;&#x53EF;&#x80FD;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -v https://api.github.com/orgs/:org/members" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">curl -v https://api.github.com/orgs/:org/members</code></pre><p>&#x542B;&#x4E49;&#x5F88;&#x660E;&#x786E;&#xFF0C;&#x4F46;&#x95EE;&#x9898;&#x662F;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x4E0D;&#x660E;&#x786E;&#xFF0C;&#x5FC5;&#x987B;&#x5B9E;&#x9645;&#x8C03;&#x8BD5;&#x624D;&#x77E5;&#x9053;&#x3002;&#x6362;&#x6210;&#x7B49;&#x4EF7;&#x7684; GraphQL &#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="query {
  organization(login: &quot;github&quot;) {
    members(first: 100) {
      edges {
        node {
          name
          avatarUrl
        }
      }
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code class="graphql">query {
  organization(login: <span class="hljs-string">&quot;github&quot;</span>) {
    members(first: <span class="hljs-number">100</span>) {
      edges {
        node {
          name
          avatarUrl
        }
      }
    }
  }
}</code></pre><p>&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x548C;&#x7EA6;&#x5B9A;&#x7684;&#x683C;&#x5F0F;&#x7ED3;&#x6784;&#x4E00;&#x81F4;&#xFF0C;&#x4E14;&#x4E0D;&#x4F1A;&#x6709;&#x591A;&#x4F59;&#x7684;&#x5B57;&#x6BB5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;data&quot;: {
    &quot;organization&quot;: {
      &quot;members&quot;: {
        &quot;edges&quot;: [
          {
            &quot;node&quot;: {
              &quot;name&quot;: &quot;Chris Wanstrath&quot;,
              &quot;avatarUrl&quot;: &quot;https://avatars0.githubusercontent.com/u/2?v=4&quot;
            }
          },
          {
            &quot;node&quot;: {
              &quot;name&quot;: &quot;Justin Palmer&quot;,
              &quot;avatarUrl&quot;: &quot;https://avatars3.githubusercontent.com/u/25?v=4&quot;
            }
          }
        ]
      }
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;data&quot;</span>: {
    <span class="hljs-attr">&quot;organization&quot;</span>: {
      <span class="hljs-attr">&quot;members&quot;</span>: {
        <span class="hljs-attr">&quot;edges&quot;</span>: [
          {
            <span class="hljs-attr">&quot;node&quot;</span>: {
              <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;Chris Wanstrath&quot;</span>,
              <span class="hljs-attr">&quot;avatarUrl&quot;</span>: <span class="hljs-string">&quot;https://avatars0.githubusercontent.com/u/2?v=4&quot;</span>
            }
          },
          {
            <span class="hljs-attr">&quot;node&quot;</span>: {
              <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;Justin Palmer&quot;</span>,
              <span class="hljs-attr">&quot;avatarUrl&quot;</span>: <span class="hljs-string">&quot;https://avatars3.githubusercontent.com/u/25?v=4&quot;</span>
            }
          }
        ]
      }
    }
  }
}</code></pre><p>&#x4F46;&#x662F;&#x80FD;&#x770B;&#x51FA;&#x6765;&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x7CFB;&#x7EDF;&#x5E2E;&#x52A9;&#x4F60;&#x5199; <code>query</code>&#xFF0C;&#x5F88;&#x591A;&#x6846;&#x67B6;&#x90FD;&#x63D0;&#x4F9B;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x6BD4;&#x5982; <a href="https://github.com/apollographql/apollo-client" rel="nofollow noreferrer" target="_blank">apollo-client</a>&#x3002;</p><h3 id="articleHeader5">Webhooks</h3><p>&#x5982;&#x679C;&#x8BF4; GraphQL &#x98A0;&#x8986;&#x4E86;&#x524D;&#x540E;&#x7AEF;&#x4EA4;&#x4E92;&#x6A21;&#x5F0F;&#xFF0C;&#x90A3; Webhooks &#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x5F7B;&#x5934;&#x5F7B;&#x5C3E;&#x7684;&#x53CD;&#x6A21;&#x5F0F;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x5176;&#x5B9A;&#x4E49;&#x5C31;&#x662F;&#xFF0C;&#x524D;&#x7AEF;&#x4E0D;&#x4E3B;&#x52A8;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#xFF0C;&#x5B8C;&#x5168;&#x7531;&#x540E;&#x7AEF;&#x63A8;&#x9001;&#x3002;</p><p>&#x5B83;&#x6700;&#x9002;&#x5408;&#x89E3;&#x51B3;&#x8F6E;&#x8BE2;&#x95EE;&#x9898;&#x3002;&#x6216;&#x8005;&#x8BF4;&#x8F6E;&#x8BE2;&#x5C31;&#x662F;&#x4E00;&#x79CD;&#x59A5;&#x534F;&#x7684;&#x884C;&#x4E3A;&#xFF0C;&#x5F53;&#x540E;&#x7AEF;&#x4E0D;&#x652F;&#x6301; Webhooks &#x6A21;&#x5F0F;&#x65F6;&#x3002;</p><p>&#x4F7F;&#x7528;&#x4E3E;&#x4F8B;&#xFF1A;</p><p>Webhooks &#x672C;&#x8EAB;&#x4E5F;&#x53EF;&#x4EE5;&#x7531; REST &#x6216;&#x8005; gRPC &#x5B9E;&#x73B0;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x4E0D;&#x8D34;&#x4EE3;&#x7801;&#x4E86;&#x3002;&#x4E3E;&#x4E2A;&#x5E38;&#x7528;&#x4F8B;&#x5B50;&#xFF0C;&#x6BD4;&#x5982;&#x4F60;&#x7684;&#x597D;&#x53CB;&#x53D1;&#x4E86;&#x4E00;&#x6761;&#x670B;&#x53CB;&#x5708;&#xFF0C;&#x540E;&#x7AEF;&#x5C06;&#x8FD9;&#x6761;&#x6D88;&#x606F;&#x63A8;&#x9001;&#x7ED9;&#x6240;&#x6709;&#x5176;&#x4ED6;&#x597D;&#x53CB;&#x7684;&#x5BA2;&#x6237;&#x7AEF;&#xFF0C;&#x5C31;&#x662F; Webhooks &#x7684;&#x5178;&#x578B;&#x573A;&#x666F;&#x3002;</p><hr><p>&#x6700;&#x540E;&#x4F5C;&#x8005;&#x7ED9;&#x51FA;&#x7684;&#x7ED3;&#x8BBA;&#x662F;&#xFF0C;&#x8FD9;&#x56DB;&#x4E2A;&#x573A;&#x666F;&#x5404;&#x6709;&#x4E0D;&#x540C;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x65E0;&#x6CD5;&#x76F8;&#x4E92;&#x66FF;&#x4EE3;&#xFF1A;</p><ul><li>REST&#xFF1A;&#x65E0;&#x72B6;&#x6001;&#x7684;&#x6570;&#x636E;&#x4F20;&#x8F93;&#x7ED3;&#x6784;&#xFF0C;&#x9002;&#x7528;&#x4E8E;&#x901A;&#x7528;&#x3001;&#x5FEB;&#x901F;&#x8FED;&#x4EE3;&#x548C;&#x6807;&#x51C6;&#x5316;&#x8BED;&#x4E49;&#x7684;&#x573A;&#x666F;&#x3002;</li><li>gRPC&#xFF1A;&#x8F7B;&#x91CF;&#x7684;&#x4F20;&#x8F93;&#x65B9;&#x5F0F;&#xFF0C;&#x7279;&#x6B8A;&#x9002;&#x5408;&#x5BF9;&#x6027;&#x80FD;&#x9AD8;&#x8981;&#x6C42;&#x6216;&#x8005;&#x73AF;&#x5883;&#x82DB;&#x523B;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x6BD4;&#x5982; IOT&#x3002;</li><li>GraphQL: &#x8BF7;&#x6C42;&#x8005;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x8FD4;&#x56DE;&#x683C;&#x5F0F;&#xFF0C;&#x67D0;&#x4E9B;&#x7A0B;&#x5EA6;&#x4E0A;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x524D;&#x540E;&#x7AEF;&#x8054;&#x8C03;&#x6210;&#x672C;&#x3002;</li><li>Webhooks: &#x63A8;&#x9001;&#x670D;&#x52A1;&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x4E3B;&#x52A8;&#x66F4;&#x65B0;&#x5BA2;&#x6237;&#x7AEF;&#x8D44;&#x6E90;&#x7684;&#x573A;&#x666F;&#x3002;</li></ul><h2 id="articleHeader6">3 &#x7CBE;&#x8BFB;</h2><h3 id="articleHeader7">REST &#x5E76;&#x975E;&#x9002;&#x7528;&#x6240;&#x6709;&#x573A;&#x666F;</h3><p>&#x672C;&#x6587;&#x7ED9;&#x4E86;&#x6211;&#x4EEC;&#x4E00;&#x4E2A;&#x66F4;&#x5927;&#x7684;&#x89C6;&#x89D2;&#x770B;&#x5F85;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x63A5;&#x53E3;&#x95EE;&#x9898;&#xFF0C;&#x5BF9;&#x4E8E;&#x594B;&#x6218;&#x5728;&#x4E00;&#x7EBF;&#x7684;&#x524D;&#x7AEF;&#x540C;&#x5B66;&#xFF0C;&#x63A5;&#x89E6;&#x5230; 90% &#x7684;&#x63A5;&#x53E3;&#x90FD;&#x662F;&#x975E; REST &#x89C4;&#x5219;&#x7684; Http &#x63A5;&#x53E3;&#xFF0C;&#x80FD;&#x771F;&#x6B63;&#x843D;&#x5B9E; REST &#x7684;&#x56E2;&#x961F;&#x5176;&#x5B9E;&#x975E;&#x5E38;&#x5C11;&#x3002;&#x8FD9;&#x5176;&#x5B9E;&#x66B4;&#x9732;&#x4E86;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x662F; REST &#x6240;&#x5E26;&#x6765;&#x7684;&#x597D;&#x5904;&#xFF0C;&#x5728;&#x6574;&#x5957;&#x4E1A;&#x52A1;&#x6D41;&#x7A0B;&#x4E2D;&#x5230;&#x5E95;&#x5360;&#x591A;&#x5927;&#x7684;&#x6BD4;&#x91CD;&#xFF1F;</p><p>&#x4E0D;&#x4EC5;&#x63A5;&#x53E3;&#x8BBE;&#x8BA1;&#x65B9;&#x6848;&#x7684;&#x4F7F;&#x7528;&#x8981;&#x5206;&#x573A;&#x666F;&#xFF0C;&#x9488;&#x5BF9;&#x67D0;&#x4E2A;&#x63A5;&#x53E3;&#x65B9;&#x6848;&#x7684;&#x91CD;&#x8981;&#x6027;&#x4E5F;&#x8981;&#x518D;&#x7EE7;&#x7EED;&#x7EC6;&#x5206;&#xFF1A;&#x5728;&#x505A;&#x4E00;&#x4E2A;&#x5F00;&#x653E;&#x63A5;&#x53E3;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x63D0;&#x4F9B; Http &#x63A5;&#x53E3;&#x7ED9;&#x7B2C;&#x4E09;&#x65B9;&#x4F7F;&#x7528;&#xFF0C;&#x8FD9;&#x65F6;&#x5FC5;&#x987B;&#x597D;&#x597D;&#x89C4;&#x5212;&#x63A5;&#x53E3;&#x7684;&#x8BED;&#x4E49;&#xFF0C;&#x6240;&#x4EE5;&#x66F4;&#x5BB9;&#x6613;&#x8BA9;&#x5927;&#x5BB6;&#x8FBE;&#x6210;&#x4E00;&#x81F4;&#x4F7F;&#x7528; REST &#x7EA6;&#x5B9A;&#xFF1B;&#x800C;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x4EA7;&#x54C1;&#x65F6;&#xFF0C;&#x5176;&#x5B9E;&#x524D;&#x540E;&#x7AEF;&#x4E0D;&#x5173;&#x5FC3;&#x63A5;&#x53E3;&#x683C;&#x5F0F;&#x662F;&#x5426;&#x89C4;&#x8303;&#xFF0C;&#x751A;&#x81F3;&#x5728;&#x5F00;&#x53D1;&#x5185;&#x7F51;&#x4EA7;&#x54C1;&#x65F6;&#xFF0C;&#x6027;&#x80FD;&#x548C;&#x5197;&#x4F59;&#x90FD;&#x4E0D;&#x4F1A;&#x8003;&#x8651;&#xFF0C;&#x6548;&#x7387;&#x653E;&#x5728;&#x4E86;&#x7B2C;&#x4E00;&#x4F4D;&#x3002;&#x6240;&#x4EE5;&#x7B2C;&#x4E00;&#x70B9;&#x542F;&#x793A;&#x662F;&#xFF0C;&#x4E0D;&#x8981;&#x57CB;&#x51A4;&#x5F53;&#x524D;&#x56E2;&#x961F;&#x4E1A;&#x52A1;&#x4E3A;&#x4EC0;&#x4E48;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x67D0;&#x4E2A;&#x66F4;&#x597D;&#x7684;&#x63A5;&#x53E3;&#x7EA6;&#x5B9A;&#xFF0C;&#x56E0;&#x4E3A;&#x63A5;&#x53E3;&#x7EA6;&#x5B9A;&#x5F88;&#x53EF;&#x80FD;&#x662F;&#x4E1A;&#x52A1;&#x5F62;&#x6001;&#x51B3;&#x5B9A;&#x7684;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x51ED;&#x7A7A;&#x505A;&#x6280;&#x672F;&#x5BF9;&#x6BD4;&#x4ECE;&#x800C;&#x51B3;&#x5B9A;&#x7684;&#x3002;</p><h3 id="articleHeader8">gRPC &#x662F;&#x670D;&#x52A1;&#x7AEF;&#x4EA4;&#x4E92;&#x7684;&#x9996;&#x9009;</h3><p>&#x524D;&#x7AEF;&#x540C;&#x5B66;&#x8F6C; node &#x5F00;&#x53D1;&#x65F6;&#xFF0C;&#x5F88;&#x559C;&#x6B22;&#x7528; Http &#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x670D;&#x52A1;&#x5668;&#x95F4;&#x901A;&#x8BAF;&#xFF0C;&#x4F46;&#x53EF;&#x80FD;&#x4F1A;&#x7591;&#x60D1;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x516C;&#x53F8;&#x5185;&#x90E8; Java &#x6216;&#x8005; C++ &#x5199;&#x7684;&#x670D;&#x52A1;&#x90FD;&#x4E0D;&#x63D0;&#x4F9B; Http &#x65B9;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x800C;&#x662F;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x540D;&#x5B57;&#x3002;&#x4E86;&#x89E3; gRPC &#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA4;&#x8BC6;&#x5230;&#x8FD9;&#x4E9B;&#x5E73;&#x53F0;&#x90FD;&#x662F;&#x5BF9; RPC &#x65B9;&#x5F0F;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x95F4;&#x901A;&#x4FE1;&#x5BF9;&#x6027;&#x80FD;&#x548C;&#x5EF6;&#x65F6;&#x8981;&#x6C42;&#x975E;&#x5E38;&#x9AD8;&#xFF0C;&#x6240;&#x4EE5;&#x6BD4;&#x8F83;&#x9002;&#x5408;&#x4E13;&#x95E8;&#x4E3A;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x7684; gRPC &#x7B49;&#x670D;&#x52A1;&#x3002;</p><h3 id="articleHeader9">GraphQL &#x9700;&#x8981;&#x914D;&#x5957;</h3><p>GraphQL &#x4E0D;&#x662F; REST &#x7684;&#x66FF;&#x4EE3;&#x54C1;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x8981;&#x60F3;&#x7740;&#x56E2;&#x961F;&#x4ECE; Http &#x63A5;&#x53E3;&#x8FC1;&#x79FB;&#x5230; GraphQL &#x5C31;&#x80FD;&#x63D0;&#x5347; X% &#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;GraphQL &#x65B9;&#x6848;&#x662F;&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x524D;&#x540E;&#x7AEF;&#x4EA4;&#x4E92;&#x7EA6;&#x5B9A;&#xFF0C;&#x6240;&#x4EE5;&#x4E0A;&#x624B;&#x6210;&#x672C;&#x4F1A;&#x6BD4;&#x8F83;&#x9AD8;&#xFF0C;&#x540C;&#x65F6;&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x524D;&#x7AEF;&#x540C;&#x5B66;&#x62FC; query&#xFF0C;&#x7B49;&#x4E8E;&#x628A;&#x4E00;&#x90E8;&#x5206;&#x540E;&#x7AEF;&#x5DE5;&#x4F5C;&#x91CF;&#x8F6C;&#x79FB;&#x7ED9;&#x4E86;&#x524D;&#x7AEF;&#xFF0C;&#x5982;&#x679C;&#x6B64;&#x65F6;&#x6CA1;&#x6709;&#x4E00;&#x4E2A;&#x8DB3;&#x591F;&#x597D;&#x7528;&#x7684;&#x5E73;&#x53F0;&#x5FEB;&#x901F;&#x67E5;&#x9605;&#x3001;&#x751F;&#x6210;&#x3001;&#x7EF4;&#x62A4;&#x8FD9;&#x4E9B;&#x5B9A;&#x4E49;&#xFF0C;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x53EF;&#x80FD;&#x4E0D;&#x5347;&#x53CD;&#x964D;&#x3002;</p><p>&#x603B;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x5BF9;&#x5916;&#x5F00;&#x653E; API &#x6216;&#x8005;&#x62E5;&#x6709;&#x5B8C;&#x6574;&#x914D;&#x5957;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x4F7F;&#x7528; GraphQL &#x662F;&#x6BD4;&#x8F83;&#x7406;&#x60F3;&#x7684;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x5FEB;&#x901F;&#x8FED;&#x4EE3;&#xFF0C;&#x5E73;&#x53F0;&#x53C8;&#x4E0D;&#x591F;&#x6210;&#x719F;&#x7684;&#x56E2;&#x961F;&#xFF0C;&#x7EE7;&#x7EED;&#x4F7F;&#x7528;&#x6807;&#x51C6; Http &#x63A5;&#x53E3;&#x53EF;&#x4EE5;&#x66F4;&#x5FEB;&#x5B8C;&#x6210;&#x9879;&#x76EE;&#x3002;</p><h3 id="articleHeader10">Webhooks &#x89E3;&#x51B3;&#x7279;&#x6B8A;&#x573A;&#x666F;&#x95EE;&#x9898;</h3><p>&#x5BF9;&#x4E8E;&#x7B2C;&#x4E09;&#x65B9;&#x5E73;&#x53F0;&#x9A8C;&#x6743;&#x3001;&#x767B;&#x9646;&#x7B49; <strong>&#x6CA1;&#x6709;&#x524D;&#x7AEF;&#x754C;&#x9762;&#x505A;&#x4E2D;&#x8F6C;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x6216;&#x8005;&#x5F3A;&#x5B89;&#x5168;&#x8981;&#x6C42;&#x7684;&#x652F;&#x4ED8;&#x573A;&#x666F;&#x7B49;</strong>&#xFF0C;&#x9002;&#x5408;&#x7528; Webhooks &#x505A;&#x6570;&#x636E;&#x4E3B;&#x52A8;&#x63A8;&#x9001;&#x3002;&#x8BF4;&#x767D;&#x4E86;&#x5C31;&#x662F;&#x5728;&#x524D;&#x7AEF;&#x65E0;&#x4ECE;&#x53C2;&#x4E0E;&#xFF0C;&#x6216;&#x8005;&#x56E0;&#x4E3A;&#x524D;&#x7AEF;&#x5B89;&#x5168;&#x95EE;&#x9898;&#x4E0D;&#x9002;&#x5408;&#x53C2;&#x4E0E;&#x65F6;&#xFF0C;&#x5C31;&#x662F; Webhooks &#x7684;&#x573A;&#x666F;&#x3002;&#x5F88;&#x663E;&#x7136; Webhooks &#x4E5F;&#x4E0D;&#x662F; Http &#x7684;&#x66FF;&#x4EE3;&#x54C1;&#xFF0C;&#x4E0D;&#x8FC7;&#x7684;&#x786E;&#x662F;&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x524D;&#x540E;&#x7AEF;&#x4EA4;&#x4E92;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x6162;&#x67E5;&#x8BE2;&#x7B49;&#x573A;&#x666F;&#xFF0C;&#x524D;&#x7AEF;&#x666E;&#x904D;&#x4F7F;&#x7528;&#x8F6E;&#x8BE2;&#x5B8C;&#x6210;&#xFF0C;&#x8FD9;&#x548C; Socket &#x76F8;&#x6BD4;&#x4F53;&#x9A8C;&#x66F4;&#x5F31;&#xFF0C;&#x4F46;&#x65E0;&#x72B6;&#x6001;&#x7684;&#x7279;&#x6027;&#x53CD;&#x800C;&#x4F1A;&#x964D;&#x4F4E;&#x670D;&#x52A1;&#x5668;&#x8D1F;&#x62C5;&#xFF0C;&#x6240;&#x4EE5;&#x6162;&#x67E5;&#x8BE2;&#x548C;&#x5373;&#x65F6;&#x901A;&#x8BAF;&#x8981;&#x533A;&#x5206;&#x5BF9;&#x5F85;&#xFF0C;&#x7528;&#x6237;&#x5BF9;&#x6D88;&#x606F;&#x53CA;&#x65F6;&#x6027;&#x7684;&#x654F;&#x611F;&#x7A0B;&#x5EA6;&#x51B3;&#x5B9A;&#x4E86;&#x4F7F;&#x7528;&#x54EA;&#x79CD;&#x65B9;&#x6848;&#x3002;</p><h2 id="articleHeader11">4 &#x603B;&#x7ED3;</h2><p>&#x6700;&#x540E;&#xFF0C;&#x4E0A;&#x9762;&#x603B;&#x7ED3;&#x7684;&#x5185;&#x5BB9;&#x4E00;&#x5B9A;&#x8FD8;&#x6709;&#x8BB8;&#x591A;&#x758F;&#x6F0F;&#xFF0C;&#x6B22;&#x8FCE;&#x8865;&#x5145;&#x3002;</p><h2 id="articleHeader12">5 &#x66F4;&#x591A;&#x8BA8;&#x8BBA;</h2><blockquote>&#x8BA8;&#x8BBA;&#x5730;&#x5740;&#x662F;&#xFF1A;<a href="https://github.com/dt-fe/weekly/issues/102" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;REST, GraphQL, Webhooks, &amp; gRPC &#x5982;&#x4F55;&#x9009;&#x578B;&#x300B; &#xB7; Issue #102 &#xB7; dt-fe/weekly</a></blockquote><p><strong>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x53C2;&#x4E0E;&#x8BA8;&#x8BBA;&#xFF0C;&#x8BF7;<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#xFF0C;&#x6BCF;&#x5468;&#x90FD;&#x6709;&#x65B0;&#x7684;&#x4E3B;&#x9898;&#xFF0C;&#x5468;&#x672B;&#x6216;&#x5468;&#x4E00;&#x53D1;&#x5E03;&#x3002;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《REST, GraphQL, Webhooks, & gRPC 如何选型》

## 原文链接
[https://segmentfault.com/a/1190000016331670](https://segmentfault.com/a/1190000016331670)

