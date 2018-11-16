---
title: 带入gRPC：gRPC Client and Server
hidden: true
categories: [reprint]
slug: f29e3b28
date: 2018-11-07 02:30:16
---

{{< raw >}}
<h1 id="articleHeader0">&#x5E26;&#x5165;gRPC&#xFF1A;gRPC Client and Server</h1><p>&#x539F;&#x6587;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/EDDYCJY/blog/blob/master/golang/gRPC/2018-09-23-%E5%B8%A6%E5%85%A5gRPC%E4%BA%8C-gRPC-Client-and-Server.md" rel="nofollow noreferrer" target="_blank">&#x5E26;&#x5165;gRPC&#xFF1A;gRPC Client and Server</a></p><p>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/EDDYCJY/go-grpc-example" rel="nofollow noreferrer" target="_blank">go-grpc-example</a></p><h2 id="articleHeader1">&#x524D;&#x8A00;</h2><p>&#x672C;&#x7AE0;&#x8282;&#x5C06;&#x4F7F;&#x7528; Go &#x6765;&#x7F16;&#x5199; gRPC Server &#x548C; Client&#xFF0C;&#x8BA9;&#x5176;&#x4E92;&#x76F8;&#x901A;&#x8BAF;&#x3002;&#x5728;&#x6B64;&#x4E4B;&#x4E0A;&#x4F1A;&#x4F7F;&#x7528;&#x5230;&#x5982;&#x4E0B;&#x5E93;&#xFF1A;</p><ul><li>google.golang.org/grpc</li><li>github.com/golang/protobuf/protoc-gen-go</li></ul><h2 id="articleHeader2">&#x5B89;&#x88C5;</h2><h3 id="articleHeader3">gRPC</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="go get -u google.golang.org/grpc" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">go get -u google<span class="hljs-selector-class">.golang</span><span class="hljs-selector-class">.org</span>/grpc</code></pre><h3 id="articleHeader4">Protocol Buffers v3</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wget https://github.com/google/protobuf/releases/download/v3.5.1/protobuf-all-3.5.1.zip
unzip protobuf-all-3.5.1.zip
cd protobuf-3.5.1/
./configure
make
make install" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>wget http<span class="hljs-variable">s:</span>//github.<span class="hljs-keyword">com</span>/google/protobuf/releases/download/v3.<span class="hljs-number">5.1</span>/protobuf-<span class="hljs-keyword">all</span>-<span class="hljs-number">3.5</span>.<span class="hljs-number">1</span>.zip
unzip protobuf-<span class="hljs-keyword">all</span>-<span class="hljs-number">3.5</span>.<span class="hljs-number">1</span>.zip
<span class="hljs-keyword">cd</span> protobuf-<span class="hljs-number">3.5</span>.<span class="hljs-number">1</span>/
./configure
<span class="hljs-keyword">make</span>
<span class="hljs-keyword">make</span> install</code></pre><p>&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5B89;&#x88C5;&#x6210;&#x529F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="protoc --version" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code style="word-break:break-word;white-space:initial">protoc <span class="hljs-comment">--version</span></code></pre><p>&#x82E5;&#x51FA;&#x73B0;&#x4EE5;&#x4E0B;&#x9519;&#x8BEF;&#xFF0C;&#x6267;&#x884C; <code>ldconfig</code> &#x547D;&#x540D;&#x5C31;&#x80FD;&#x89E3;&#x51B3;&#x8FD9;&#x95EE;&#x9898;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="protoc: error while loading shared libraries: libprotobuf.so.15: cannot open shared object file: No such file or directory" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vhdl"><code style="word-break:break-word;white-space:initial">protoc: <span class="hljs-literal">error</span> <span class="hljs-keyword">while</span> loading <span class="hljs-keyword">shared</span> libraries: libprotobuf.so.<span class="hljs-number">15</span>: cannot <span class="hljs-keyword">open</span> <span class="hljs-keyword">shared</span> object <span class="hljs-keyword">file</span>: No such <span class="hljs-keyword">file</span> <span class="hljs-keyword">or</span> directory</code></pre><h3 id="articleHeader5">Protoc Plugin</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="go get -u github.com/golang/protobuf/protoc-gen-go" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">go</span> <span class="hljs-built_in">get</span> -<span class="hljs-keyword">u</span> github.<span class="hljs-keyword">com</span>/golang/protobuf/protoc-gen-<span class="hljs-keyword">go</span></code></pre><p>&#x5B89;&#x88C5;&#x73AF;&#x5883;&#x82E5;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x53C2;&#x8003;&#x6211;&#x5148;&#x524D;&#x7684;&#x6587;&#x7AE0; <a href="https://segmentfault.com/a/1190000013339403">&#x300A;&#x4ECB;&#x7ECD;&#x4E0E;&#x73AF;&#x5883;&#x5B89;&#x88C5;&#x300B;</a> &#x5185;&#x6709;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#xFF0C;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;</p><h2 id="articleHeader6">gRPC</h2><p>&#x672C;&#x5C0F;&#x8282;&#x5F00;&#x59CB;&#x6B63;&#x5F0F;&#x7F16;&#x5199; gRPC &#x76F8;&#x5173;&#x7684;&#x7A0B;&#x5E8F;&#xFF0C;&#x4E00;&#x8D77;&#x4E0A;&#x8F66;&#x5427; &#x1F604;</p><h3 id="articleHeader7">&#x56FE;&#x793A;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000016583379?w=505&amp;h=319" src="https://static.alili.tech/img/remote/1460000016583379?w=505&amp;h=319" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader8">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ tree go-grpc-example 
go-grpc-example
&#x251C;&#x2500;&#x2500; client
&#x251C;&#x2500;&#x2500; proto
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; search.proto
&#x2514;&#x2500;&#x2500; server.go" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>$ tree <span class="hljs-built_in">go</span>-grpc-<span class="hljs-built_in">example</span> 
<span class="hljs-built_in">go</span>-grpc-<span class="hljs-built_in">example</span>
&#x251C;&#x2500;&#x2500; client
&#x251C;&#x2500;&#x2500; proto
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; search.proto
&#x2514;&#x2500;&#x2500; server.<span class="hljs-built_in">go</span></code></pre><h3 id="articleHeader9">IDL</h3><h4>&#x7F16;&#x5199;</h4><p>&#x5728; proto &#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684; search.proto &#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5199;&#x5165;&#x5982;&#x4E0B;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="syntax = &quot;proto3&quot;;

package proto;

service SearchService {
    rpc Search(SearchRequest) returns (SearchResponse) {}
}

message SearchRequest {
    string request = 1;
}

message SearchResponse {
    string response = 1;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs protobuf"><code>syntax = <span class="hljs-string">&quot;proto3&quot;</span>;

<span class="hljs-keyword">package</span> proto;

<span class="hljs-class"><span class="hljs-keyword">service</span> <span class="hljs-title">SearchService</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">rpc</span> Search(SearchRequest) <span class="hljs-keyword">returns</span> (SearchResponse) {}
}

message SearchRequest {
    string request = 1</span>;
}

<span class="hljs-class"><span class="hljs-keyword">message</span> <span class="hljs-title">SearchResponse</span> </span>{
    <span class="hljs-built_in">string</span> response = <span class="hljs-number">1</span>;
}</code></pre><h4>&#x751F;&#x6210;</h4><p>&#x5728; proto &#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x6267;&#x884C;&#x5982;&#x4E0B;&#x547D;&#x4EE4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ protoc --go_out=plugins=grpc:. *.proto" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code style="word-break:break-word;white-space:initial">$ protoc <span class="hljs-comment">--go_out=plugins=grpc:. *.proto</span></code></pre><ul><li>plugins=plugin1+plugin2&#xFF1A;&#x6307;&#x5B9A;&#x8981;&#x52A0;&#x8F7D;&#x7684;&#x5B50;&#x63D2;&#x4EF6;&#x5217;&#x8868;</li></ul><p>&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x7684; proto &#x6587;&#x4EF6;&#x662F;&#x6D89;&#x53CA;&#x4E86; RPC &#x670D;&#x52A1;&#x7684;&#xFF0C;&#x800C;&#x9ED8;&#x8BA4;&#x662F;&#x4E0D;&#x4F1A;&#x751F;&#x6210; RPC &#x4EE3;&#x7801;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x7ED9;&#x51FA; <code>plugins</code> &#x53C2;&#x6570;&#x4F20;&#x9012;&#x7ED9; <code>protoc-gen-go</code>&#xFF0C;&#x544A;&#x8BC9;&#x5B83;&#xFF0C;&#x8BF7;&#x652F;&#x6301; RPC&#xFF08;&#x8FD9;&#x91CC;&#x6307;&#x5B9A;&#x4E86; gRPC&#xFF09;</p><ul><li>--go_out=.&#xFF1A;&#x8BBE;&#x7F6E; Go &#x4EE3;&#x7801;&#x8F93;&#x51FA;&#x7684;&#x76EE;&#x5F55;</li></ul><p>&#x8BE5;&#x6307;&#x4EE4;&#x4F1A;&#x52A0;&#x8F7D; protoc-gen-go &#x63D2;&#x4EF6;&#x8FBE;&#x5230;&#x751F;&#x6210; Go &#x4EE3;&#x7801;&#x7684;&#x76EE;&#x7684;&#xFF0C;&#x751F;&#x6210;&#x7684;&#x6587;&#x4EF6;&#x4EE5; .pb.go &#x4E3A;&#x6587;&#x4EF6;&#x540E;&#x7F00;</p><ul><li>: &#xFF08;&#x5192;&#x53F7;&#xFF09;</li></ul><p>&#x5192;&#x53F7;&#x5145;&#x5F53;&#x5206;&#x9694;&#x7B26;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x540E;&#x8DDF;&#x6240;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#x96C6;&#x3002;&#x5982;&#x679C;&#x8FD9;&#x5904;&#x4E0D;&#x6D89;&#x53CA; RPC&#xFF0C;&#x547D;&#x4EE4;&#x53EF;&#x7B80;&#x5316;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ protoc --go_out=. *.proto" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code style="word-break:break-word;white-space:initial">$ protoc <span class="hljs-comment">--go_out=. *.proto</span></code></pre><p>&#x6CE8;&#xFF1A;&#x5EFA;&#x8BAE;&#x4F60;&#x770B;&#x770B;&#x4E24;&#x6761;&#x547D;&#x4EE4;&#x751F;&#x6210;&#x7684; .pb.go &#x6587;&#x4EF6;&#xFF0C;&#x5206;&#x522B;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;</p><h4>&#x751F;&#x6210;&#x540E;</h4><p>&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x547D;&#x4EE4;&#x540E;&#xFF0C;&#x5C06;&#x5F97;&#x5230;&#x4E00;&#x4E2A; .pb.go &#x6587;&#x4EF6;&#xFF0C;&#x6587;&#x4EF6;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type SearchRequest struct {
    Request              string   `protobuf:&quot;bytes,1,opt,name=request&quot; json:&quot;request,omitempty&quot;`
    XXX_NoUnkeyedLiteral struct{} `json:&quot;-&quot;`
    XXX_unrecognized     []byte   `json:&quot;-&quot;`
    XXX_sizecache        int32    `json:&quot;-&quot;`
}

func (m *SearchRequest) Reset()         { *m = SearchRequest{} }
func (m *SearchRequest) String() string { return proto.CompactTextString(m) }
func (*SearchRequest) ProtoMessage()    {}
func (*SearchRequest) Descriptor() ([]byte, []int) {
    return fileDescriptor_search_8b45f79ee13ff6a3, []int{0}
}

func (m *SearchRequest) GetRequest() string {
    if m != nil {
        return m.Request
    }
    return &quot;&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs go"><code><span class="hljs-keyword">type</span> SearchRequest <span class="hljs-keyword">struct</span> {
    Request              <span class="hljs-keyword">string</span>   <span class="hljs-string">`protobuf:&quot;bytes,1,opt,name=request&quot; json:&quot;request,omitempty&quot;`</span>
    XXX_NoUnkeyedLiteral <span class="hljs-keyword">struct</span>{} <span class="hljs-string">`json:&quot;-&quot;`</span>
    XXX_unrecognized     []<span class="hljs-keyword">byte</span>   <span class="hljs-string">`json:&quot;-&quot;`</span>
    XXX_sizecache        <span class="hljs-keyword">int32</span>    <span class="hljs-string">`json:&quot;-&quot;`</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(m *SearchRequest)</span> <span class="hljs-title">Reset</span><span class="hljs-params">()</span></span>         { *m = SearchRequest{} }
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(m *SearchRequest)</span> <span class="hljs-title">String</span><span class="hljs-params">()</span> <span class="hljs-title">string</span></span> { <span class="hljs-keyword">return</span> proto.CompactTextString(m) }
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(*SearchRequest)</span> <span class="hljs-title">ProtoMessage</span><span class="hljs-params">()</span></span>    {}
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(*SearchRequest)</span> <span class="hljs-title">Descriptor</span><span class="hljs-params">()</span> <span class="hljs-params">([]<span class="hljs-keyword">byte</span>, []<span class="hljs-keyword">int</span>)</span></span> {
    <span class="hljs-keyword">return</span> fileDescriptor_search_8b45f79ee13ff6a3, []<span class="hljs-keyword">int</span>{<span class="hljs-number">0</span>}
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(m *SearchRequest)</span> <span class="hljs-title">GetRequest</span><span class="hljs-params">()</span> <span class="hljs-title">string</span></span> {
    <span class="hljs-keyword">if</span> m != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> m.Request
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>
}</code></pre><p>&#x901A;&#x8FC7;&#x9605;&#x8BFB;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x4E3B;&#x8981;&#x6D89;&#x53CA;&#x5982;&#x4E0B;&#x65B9;&#x9762;&#xFF1A;</p><ul><li>&#x5B57;&#x6BB5;&#x540D;&#x79F0;&#x4ECE;&#x5C0F;&#x5199;&#x4E0B;&#x5212;&#x7EBF;&#x8F6C;&#x6362;&#x4E3A;&#x5927;&#x5199;&#x9A7C;&#x5CF0;&#x6A21;&#x5F0F;&#xFF08;&#x5B57;&#x6BB5;&#x5BFC;&#x51FA;&#xFF09;</li><li>&#x751F;&#x6210;&#x4E00;&#x7EC4; Getters &#x65B9;&#x6CD5;&#xFF0C;&#x80FD;&#x4FBF;&#x4E8E;&#x5904;&#x7406;&#x4E00;&#x4E9B;&#x7A7A;&#x6307;&#x9488;&#x53D6;&#x503C;&#x7684;&#x60C5;&#x51B5;</li><li>ProtoMessage &#x65B9;&#x6CD5;&#x5B9E;&#x73B0; proto.Message &#x7684;&#x63A5;&#x53E3;</li><li>&#x751F;&#x6210; Rest &#x65B9;&#x6CD5;&#xFF0C;&#x4FBF;&#x4E8E;&#x5C06; Protobuf &#x7ED3;&#x6784;&#x4F53;&#x6062;&#x590D;&#x4E3A;&#x96F6;&#x503C;</li><li>Repeated &#x8F6C;&#x6362;&#x4E3A;&#x5207;&#x7247;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type SearchRequest struct {
    Request              string   `protobuf:&quot;bytes,1,opt,name=request&quot; json:&quot;request,omitempty&quot;`
}

func (*SearchRequest) Descriptor() ([]byte, []int) {
    return fileDescriptor_search_8b45f79ee13ff6a3, []int{0}
}

type SearchResponse struct {
    Response             string   `protobuf:&quot;bytes,1,opt,name=response&quot; json:&quot;response,omitempty&quot;`
}

func (*SearchResponse) Descriptor() ([]byte, []int) {
    return fileDescriptor_search_8b45f79ee13ff6a3, []int{1}
}

...

func init() { proto.RegisterFile(&quot;search.proto&quot;, fileDescriptor_search_8b45f79ee13ff6a3) }

var fileDescriptor_search_8b45f79ee13ff6a3 = []byte{
    // 131 bytes of a gzipped FileDescriptorProto
    0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0x29, 0x4e, 0x4d, 0x2c,
    0x4a, 0xce, 0xd0, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x62, 0x05, 0x53, 0x4a, 0x9a, 0x5c, 0xbc,
    0xc1, 0x60, 0xe1, 0xa0, 0xd4, 0xc2, 0xd2, 0xd4, 0xe2, 0x12, 0x21, 0x09, 0x2e, 0xf6, 0x22, 0x08,
    0x53, 0x82, 0x51, 0x81, 0x51, 0x83, 0x33, 0x08, 0xc6, 0x55, 0xd2, 0xe1, 0xe2, 0x83, 0x29, 0x2d,
    0x2e, 0xc8, 0xcf, 0x2b, 0x4e, 0x15, 0x92, 0xe2, 0xe2, 0x28, 0x82, 0xb2, 0xa1, 0x8a, 0xe1, 0x7c,
    0x23, 0x0f, 0x98, 0xc1, 0xc1, 0xa9, 0x45, 0x65, 0x99, 0xc9, 0xa9, 0x42, 0xe6, 0x5c, 0x6c, 0x10,
    0x01, 0x21, 0x11, 0x88, 0x13, 0xf4, 0x50, 0x2c, 0x96, 0x12, 0x45, 0x13, 0x85, 0x98, 0xa3, 0xc4,
    0x90, 0xc4, 0x06, 0x16, 0x37, 0x06, 0x04, 0x00, 0x00, 0xff, 0xff, 0xf3, 0xba, 0x74, 0x95, 0xc0,
    0x00, 0x00, 0x00,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs x86asm"><code>type SearchRequest struct {
    Request              string   <span class="hljs-string">`protobuf:&quot;bytes,1,opt,name=request&quot; json:&quot;request,omitempty&quot;`</span>
}

func (*SearchRequest) Descriptor() ([]<span class="hljs-built_in">byte</span>, []<span class="hljs-keyword">int</span>) {
    return fileDescriptor_search_8b45f79ee13ff6a3, []<span class="hljs-keyword">int</span>{<span class="hljs-number">0</span>}
}

type SearchResponse struct {
    Response             string   <span class="hljs-string">`protobuf:&quot;bytes,1,opt,name=response&quot; json:&quot;response,omitempty&quot;`</span>
}

func (*SearchResponse) Descriptor() ([]<span class="hljs-built_in">byte</span>, []<span class="hljs-keyword">int</span>) {
    return fileDescriptor_search_8b45f79ee13ff6a3, []<span class="hljs-keyword">int</span>{<span class="hljs-number">1</span>}
}

...

func init() { proto.RegisterFile(<span class="hljs-string">&quot;search.proto&quot;</span>, fileDescriptor_search_8b45f79ee13ff6a3) }

var fileDescriptor_search_8b45f79ee13ff6a3 = []<span class="hljs-built_in">byte</span>{
    // <span class="hljs-number">131</span> bytes of a gzipped FileDescriptorProto
    <span class="hljs-number">0x1f</span>, <span class="hljs-number">0x8b</span>, <span class="hljs-number">0x08</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0x02</span>, <span class="hljs-number">0xff</span>, <span class="hljs-number">0xe2</span>, <span class="hljs-number">0xe2</span>, <span class="hljs-number">0x29</span>, <span class="hljs-number">0x4e</span>, <span class="hljs-number">0x4d</span>, <span class="hljs-number">0x2c</span>,
    <span class="hljs-number">0x4a</span>, <span class="hljs-number">0xce</span>, <span class="hljs-number">0xd0</span>, <span class="hljs-number">0x2b</span>, <span class="hljs-number">0x28</span>, <span class="hljs-number">0xca</span>, <span class="hljs-number">0x2f</span>, <span class="hljs-number">0xc9</span>, <span class="hljs-number">0x17</span>, <span class="hljs-number">0x62</span>, <span class="hljs-number">0x05</span>, <span class="hljs-number">0x53</span>, <span class="hljs-number">0x4a</span>, <span class="hljs-number">0x9a</span>, <span class="hljs-number">0x5c</span>, <span class="hljs-number">0xbc</span>,
    <span class="hljs-number">0xc1</span>, <span class="hljs-number">0x60</span>, <span class="hljs-number">0xe1</span>, <span class="hljs-number">0xa0</span>, <span class="hljs-number">0xd4</span>, <span class="hljs-number">0xc2</span>, <span class="hljs-number">0xd2</span>, <span class="hljs-number">0xd4</span>, <span class="hljs-number">0xe2</span>, <span class="hljs-number">0x12</span>, <span class="hljs-number">0x21</span>, <span class="hljs-number">0x09</span>, <span class="hljs-number">0x2e</span>, <span class="hljs-number">0xf6</span>, <span class="hljs-number">0x22</span>, <span class="hljs-number">0x08</span>,
    <span class="hljs-number">0x53</span>, <span class="hljs-number">0x82</span>, <span class="hljs-number">0x51</span>, <span class="hljs-number">0x81</span>, <span class="hljs-number">0x51</span>, <span class="hljs-number">0x83</span>, <span class="hljs-number">0x33</span>, <span class="hljs-number">0x08</span>, <span class="hljs-number">0xc6</span>, <span class="hljs-number">0x55</span>, <span class="hljs-number">0xd2</span>, <span class="hljs-number">0xe1</span>, <span class="hljs-number">0xe2</span>, <span class="hljs-number">0x83</span>, <span class="hljs-number">0x29</span>, <span class="hljs-number">0x2d</span>,
    <span class="hljs-number">0x2e</span>, <span class="hljs-number">0xc8</span>, <span class="hljs-number">0xcf</span>, <span class="hljs-number">0x2b</span>, <span class="hljs-number">0x4e</span>, <span class="hljs-number">0x15</span>, <span class="hljs-number">0x92</span>, <span class="hljs-number">0xe2</span>, <span class="hljs-number">0xe2</span>, <span class="hljs-number">0x28</span>, <span class="hljs-number">0x82</span>, <span class="hljs-number">0xb2</span>, <span class="hljs-number">0xa1</span>, <span class="hljs-number">0x8a</span>, <span class="hljs-number">0xe1</span>, <span class="hljs-number">0x7c</span>,
    <span class="hljs-number">0x23</span>, <span class="hljs-number">0x0f</span>, <span class="hljs-number">0x98</span>, <span class="hljs-number">0xc1</span>, <span class="hljs-number">0xc1</span>, <span class="hljs-number">0xa9</span>, <span class="hljs-number">0x45</span>, <span class="hljs-number">0x65</span>, <span class="hljs-number">0x99</span>, <span class="hljs-number">0xc9</span>, <span class="hljs-number">0xa9</span>, <span class="hljs-number">0x42</span>, <span class="hljs-number">0xe6</span>, <span class="hljs-number">0x5c</span>, <span class="hljs-number">0x6c</span>, <span class="hljs-number">0x10</span>,
    <span class="hljs-number">0x01</span>, <span class="hljs-number">0x21</span>, <span class="hljs-number">0x11</span>, <span class="hljs-number">0x88</span>, <span class="hljs-number">0x13</span>, <span class="hljs-number">0xf4</span>, <span class="hljs-number">0x50</span>, <span class="hljs-number">0x2c</span>, <span class="hljs-number">0x96</span>, <span class="hljs-number">0x12</span>, <span class="hljs-number">0x45</span>, <span class="hljs-number">0x13</span>, <span class="hljs-number">0x85</span>, <span class="hljs-number">0x98</span>, <span class="hljs-number">0xa3</span>, <span class="hljs-number">0xc4</span>,
    <span class="hljs-number">0x90</span>, <span class="hljs-number">0xc4</span>, <span class="hljs-number">0x06</span>, <span class="hljs-number">0x16</span>, <span class="hljs-number">0x37</span>, <span class="hljs-number">0x06</span>, <span class="hljs-number">0x04</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0xff</span>, <span class="hljs-number">0xff</span>, <span class="hljs-number">0xf3</span>, <span class="hljs-number">0xba</span>, <span class="hljs-number">0x74</span>, <span class="hljs-number">0x95</span>, <span class="hljs-number">0xc0</span>,
    <span class="hljs-number">0x00</span>, <span class="hljs-number">0x00</span>, <span class="hljs-number">0x00</span>,
}</code></pre><p>&#x800C;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x4E3B;&#x8981;&#x662F;&#x56F4;&#x7ED5; <code>fileDescriptor</code> &#x8FDB;&#x884C;&#xFF0C;&#x5728;&#x8FD9;&#x91CC; <code>fileDescriptor_search_8b45f79ee13ff6a3</code> &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;&#x540E;&#x7684; proto &#x6587;&#x4EF6;&#xFF0C;&#x800C;&#x6BCF;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x5305;&#x542B; Descriptor &#x65B9;&#x6CD5;&#xFF0C;&#x4EE3;&#x8868;&#x7740;&#x8FD9;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x5728; <code>fileDescriptor</code> &#x4E2D;&#x5177;&#x4F53;&#x7684; Message Field</p><h3 id="articleHeader10">Server</h3><p>&#x8FD9;&#x4E00;&#x5C0F;&#x8282;&#x5C06;&#x7F16;&#x5199; gRPC Server &#x7684;&#x57FA;&#x7840;&#x6A21;&#x677F;&#xFF0C;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x8C03;&#x7528;&#x3002;&#x5BF9; server.go &#x5199;&#x5165;&#x5982;&#x4E0B;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package main

import (
    &quot;context&quot;
    &quot;log&quot;
    &quot;net&quot;

    &quot;google.golang.org/grpc&quot;

    pb &quot;github.com/EDDYCJY/go-grpc-example/proto&quot;
)

type SearchService struct{}

func (s *SearchService) Search(ctx context.Context, r *pb.SearchRequest) (*pb.SearchResponse, error) {
    return &amp;pb.SearchResponse{Response: r.GetRequest() + &quot; Server&quot;}, nil
}

const PORT = &quot;9001&quot;

func main() {
    server := grpc.NewServer()
    pb.RegisterSearchServiceServer(server, &amp;SearchService{})

    lis, err := net.Listen(&quot;tcp&quot;, &quot;:&quot;+PORT)
    if err != nil {
        log.Fatalf(&quot;net.Listen err: %v&quot;, err)
    }

    server.Serve(lis)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs go"><code><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>
    <span class="hljs-string">&quot;net&quot;</span>

    <span class="hljs-string">&quot;google.golang.org/grpc&quot;</span>

    pb <span class="hljs-string">&quot;github.com/EDDYCJY/go-grpc-example/proto&quot;</span>
)

<span class="hljs-keyword">type</span> SearchService <span class="hljs-keyword">struct</span>{}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(s *SearchService)</span> <span class="hljs-title">Search</span><span class="hljs-params">(ctx context.Context, r *pb.SearchRequest)</span> <span class="hljs-params">(*pb.SearchResponse, error)</span></span> {
    <span class="hljs-keyword">return</span> &amp;pb.SearchResponse{Response: r.GetRequest() + <span class="hljs-string">&quot; Server&quot;</span>}, <span class="hljs-literal">nil</span>
}

<span class="hljs-keyword">const</span> PORT = <span class="hljs-string">&quot;9001&quot;</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    server := grpc.NewServer()
    pb.RegisterSearchServiceServer(server, &amp;SearchService{})

    lis, err := net.Listen(<span class="hljs-string">&quot;tcp&quot;</span>, <span class="hljs-string">&quot;:&quot;</span>+PORT)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;net.Listen err: %v&quot;</span>, err)
    }

    server.Serve(lis)
}</code></pre><ul><li>&#x521B;&#x5EFA; gRPC Server &#x5BF9;&#x8C61;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x5B83;&#x662F; Server &#x7AEF;&#x7684;&#x62BD;&#x8C61;&#x5BF9;&#x8C61;</li><li>&#x5C06; SearchService&#xFF08;&#x5176;&#x5305;&#x542B;&#x9700;&#x8981;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x670D;&#x52A1;&#x7AEF;&#x63A5;&#x53E3;&#xFF09;&#x6CE8;&#x518C;&#x5230; gRPC Server &#x7684;&#x5185;&#x90E8;&#x6CE8;&#x518C;&#x4E2D;&#x5FC3;&#x3002;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x5728;&#x63A5;&#x53D7;&#x5230;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;&#x5185;&#x90E8;&#x7684;&#x670D;&#x52A1;&#x53D1;&#x73B0;&#xFF0C;&#x53D1;&#x73B0;&#x8BE5;&#x670D;&#x52A1;&#x7AEF;&#x63A5;&#x53E3;&#x5E76;&#x8F6C;&#x63A5;&#x8FDB;&#x884C;&#x903B;&#x8F91;&#x5904;&#x7406;</li><li>&#x521B;&#x5EFA; Listen&#xFF0C;&#x76D1;&#x542C; TCP &#x7AEF;&#x53E3;</li><li>gRPC Server &#x5F00;&#x59CB; lis.Accept&#xFF0C;&#x76F4;&#x5230; Stop &#x6216; GracefulStop</li></ul><h3 id="articleHeader11">Client</h3><p>&#x63A5;&#x4E0B;&#x6765;&#x7F16;&#x5199; gRPC Go Client &#x7684;&#x57FA;&#x7840;&#x6A21;&#x677F;&#xFF0C;&#x6253;&#x5F00; client/client.go &#x6587;&#x4EF6;&#xFF0C;&#x5199;&#x5165;&#x4EE5;&#x4E0B;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package main

import (
    &quot;context&quot;
    &quot;log&quot;

    &quot;google.golang.org/grpc&quot;

    pb &quot;github.com/EDDYCJY/go-grpc-example/proto&quot;
)

const PORT = &quot;9001&quot;

func main() {
    conn, err := grpc.Dial(&quot;:&quot;+PORT, grpc.WithInsecure())
    if err != nil {
        log.Fatalf(&quot;grpc.Dial err: %v&quot;, err)
    }
    defer conn.Close()

    client := pb.NewSearchServiceClient(conn)
    resp, err := client.Search(context.Background(), &amp;pb.SearchRequest{
        Request: &quot;gRPC&quot;,
    })
    if err != nil {
        log.Fatalf(&quot;client.Search err: %v&quot;, err)
    }

    log.Printf(&quot;resp: %s&quot;, resp.GetResponse())
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs go"><code><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;google.golang.org/grpc&quot;</span>

    pb <span class="hljs-string">&quot;github.com/EDDYCJY/go-grpc-example/proto&quot;</span>
)

<span class="hljs-keyword">const</span> PORT = <span class="hljs-string">&quot;9001&quot;</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    conn, err := grpc.Dial(<span class="hljs-string">&quot;:&quot;</span>+PORT, grpc.WithInsecure())
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;grpc.Dial err: %v&quot;</span>, err)
    }
    <span class="hljs-keyword">defer</span> conn.Close()

    client := pb.NewSearchServiceClient(conn)
    resp, err := client.Search(context.Background(), &amp;pb.SearchRequest{
        Request: <span class="hljs-string">&quot;gRPC&quot;</span>,
    })
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;client.Search err: %v&quot;</span>, err)
    }

    log.Printf(<span class="hljs-string">&quot;resp: %s&quot;</span>, resp.GetResponse())
}</code></pre><ul><li>&#x521B;&#x5EFA;&#x4E0E;&#x7ED9;&#x5B9A;&#x76EE;&#x6807;&#xFF08;&#x670D;&#x52A1;&#x7AEF;&#xFF09;&#x7684;&#x8FDE;&#x63A5;&#x4EA4;&#x4E92;</li><li>&#x521B;&#x5EFA; SearchService &#x7684;&#x5BA2;&#x6237;&#x7AEF;&#x5BF9;&#x8C61;</li><li>&#x53D1;&#x9001; RPC &#x8BF7;&#x6C42;&#xFF0C;&#x7B49;&#x5F85;&#x540C;&#x6B65;&#x54CD;&#x5E94;&#xFF0C;&#x5F97;&#x5230;&#x56DE;&#x8C03;&#x540E;&#x8FD4;&#x56DE;&#x54CD;&#x5E94;&#x7ED3;&#x679C;</li><li>&#x8F93;&#x51FA;&#x54CD;&#x5E94;&#x7ED3;&#x679C;</li></ul><h2 id="articleHeader12">&#x9A8C;&#x8BC1;</h2><h3 id="articleHeader13">&#x542F;&#x52A8; Server</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ pwd
$GOPATH/github.com/EDDYCJY/go-grpc-example
$ go run server.go" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code class="sh">$ <span class="hljs-keyword">pwd</span>
$GOPATH/github.<span class="hljs-keyword">com</span>/EDDYCJY/<span class="hljs-keyword">go</span>-grpc-example
$ <span class="hljs-keyword">go</span> run server.<span class="hljs-keyword">go</span></code></pre><h3 id="articleHeader14">&#x542F;&#x52A8; Client</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ pwd             
$GOPATH/github.com/EDDYCJY/go-grpc-example/client
$ go run client.go 
2018/09/23 11:06:23 resp: gRPC Server" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code class="sh">$ <span class="hljs-keyword">pwd</span>             
$GOPATH/github.<span class="hljs-keyword">com</span>/EDDYCJY/<span class="hljs-keyword">go</span>-grpc-example/client
$ <span class="hljs-keyword">go</span> run client.<span class="hljs-keyword">go</span> 
<span class="hljs-number">2018</span>/<span class="hljs-number">09</span>/<span class="hljs-number">23</span> <span class="hljs-number">11</span>:<span class="hljs-number">06</span>:<span class="hljs-number">23</span> resp: gRPC Server</code></pre><h2 id="articleHeader15">&#x603B;&#x7ED3;</h2><p>&#x5728;&#x672C;&#x7AE0;&#x8282;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9; Protobuf&#x3001;gRPC Client/Server &#x5206;&#x522B;&#x90FD;&#x8FDB;&#x884C;&#x4E86;&#x4ECB;&#x7ECD;&#x3002;&#x5E0C;&#x671B;&#x4F60;&#x7ED3;&#x5408;&#x6587;&#x4E2D;&#x8BB2;&#x8FF0;&#x5185;&#x5BB9;&#x518D;&#x5199;&#x4E00;&#x4E2A; Demo &#x8FDB;&#x884C;&#x6DF1;&#x5165;&#x4E86;&#x89E3;&#xFF0C;&#x80AF;&#x5B9A;&#x4F1A;&#x66F4;&#x68D2; &#x1F914;</p><h2 id="articleHeader16">&#x7CFB;&#x5217;&#x76EE;&#x5F55;</h2><ul><li><a href="https://segmentfault.com/a/1190000016496136" target="_blank">&#x5E26;&#x5165;gRPC&#xFF1A;gRPC&#x53CA;&#x76F8;&#x5173;&#x4ECB;&#x7ECD;</a></li><li><a href="https://segmentfault.com/a/1190000016496165">&#x5E26;&#x5165;gRPC&#xFF1A;gRPC Client and Server</a></li><li><a href="https://segmentfault.com/a/1190000016503114" target="_blank">&#x5E26;&#x5165;gRPC&#xFF1A;gRPC Streaming, Client and Server</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
带入gRPC：gRPC Client and Server

## 原文链接
[https://segmentfault.com/a/1190000016496165](https://segmentfault.com/a/1190000016496165)

