---
title: 使用EOSJS和scatter在EOS区块链上开发dApp
hidden: true
categories: reprint
slug: 8478bdc
date: 2018-11-06 15:28:32
---

{{< raw >}}
<p>&#x7531;&#x4E8E;&#x6211;&#x4E00;&#x76F4;&#x5728;&#x6DF1;&#x5165;&#x7814;&#x7A76;EOS dApp&#x7684;&#x5F00;&#x53D1;&#xFF0C;&#x6211;&#x770B;&#x4E86;&#x4E0D;&#x5C11;&#x597D;&#x6587;&#x7AE0;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x6C47;&#x603B;&#x4E86;&#x4E0B;&#x505A;&#x4E00;&#x4E9B;&#x7814;&#x7A76;&#x540E;&#x5F97;&#x5230;&#x7684;&#x6240;&#x6709;&#x77E5;&#x8BC6;&#x3002;&#x5728;&#x672C;&#x6587;&#x4E2D;&#xFF0C;&#x6211;&#x5C06;&#x89E3;&#x91CA;&#x5982;&#x4F55;&#x4F7F;&#x7528;EOSJS&#x548C;scatter&#x3002;&#x6211;&#x5047;&#x8BBE;&#x4F60;&#x5BF9;&#x667A;&#x80FD;&#x5408;&#x7EA6;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x5728;EOS&#x533A;&#x5757;&#x94FE;&#x4E0A;&#x90E8;&#x7F72;&#x5B83;&#x4EEC;&#x6709;&#x57FA;&#x672C;&#x7684;&#x4E86;&#x89E3;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x5C06;&#x5728;&#x672C;&#x6587;&#x4E2D;&#x8DF3;&#x8FC7;&#x8BE5;&#x90E8;&#x5206;&#x3002;</p><h3 id="articleHeader0">&#x6211;&#x4EEC;&#x5728;&#x6784;&#x5EFA;&#x4EC0;&#x4E48;&#xFF1F;</h3><p>&#xA0;<br>&#x6211;&#x4EEC;&#x6B63;&#x5728;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;todo dApp&#x3002;&#x6211;&#x4EEC;&#x5C06;&#x4E3A;CRUD&#xFF08;&#x521B;&#x5EFA;&#xFF0C;&#x8BFB;&#x53D6;&#xFF0C;&#x66F4;&#x65B0;&#x548C;&#x5220;&#x9664;&#xFF09;&#x64CD;&#x4F5C;&#x7F16;&#x5199;&#x667A;&#x80FD;&#x5408;&#x7EA6;&#xFF0C;&#x5E76;&#x5C06;&#x4F7F;&#x7528;EOSJS&#x548C;scatter&#x4E0E;&#x5DF2;&#x90E8;&#x7F72;&#x7684;&#x5408;&#x540C;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;CRUD&#x64CD;&#x4F5C;&#x5305;&#x62EC;&#x521B;&#x5EFA;&#xFF0C;&#x5B8C;&#x6210;&#xFF0C;&#x5220;&#x9664;&#x548C;&#x83B7;&#x53D6;&#x5F85;&#x529E;&#x4E8B;&#x9879;&#x3002;&#x6211;&#x4EEC;&#x5C06;&#x4F7F;&#x7528;Jungle Testnet&#x6765;&#x90E8;&#x7F72;&#x6211;&#x4EEC;&#x7684;&#x667A;&#x80FD;&#x5408;&#x7EA6;&#x3002;</p><h3 id="articleHeader1">&#x5FC5;&#x5907;&#x77E5;&#x8BC6;</h3><ul><li>EOS</li><li>EOSJS</li><li>Scatter</li></ul><h3 id="articleHeader2">Scatter&#x8BBE;&#x7F6E;</h3><p>Scatter&#x7528;&#x4E8E;&#x4E3A;&#x533A;&#x5757;&#x94FE;&#x7B7E;&#x7F72;&#x4EA4;&#x6613;&#xFF0C;&#x5E76;&#x5728;&#x4E0D;&#x6CC4;&#x9732;&#x5BC6;&#x94A5;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x5411;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x63D0;&#x4F9B;&#x4E2A;&#x4EBA;&#x4FE1;&#x606F;&#x3002;&#x8981;&#x8BBE;&#x7F6E;Scatter&#x94B1;&#x5305;&#xFF0C;&#x8BF7;&#x5173;&#x6CE8;<a href="https://www.youtube.com/watch?v=QcbCf5mm_Ek" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x4E2A;&#x89C6;&#x9891;</a>&#x3002;&#x5728;Scatter&#x8BBE;&#x7F6E;&#x4E2D;&#xFF0C;&#x5FC5;&#x987B;&#x5728;&#x7F51;&#x7EDC;&#x4E2D;&#x6DFB;&#x52A0;Jungle testnet&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4EE5;&#x4E0B;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Name: Jungle Testnet
Domain or IP: dev.cryptolions.io // It might be changed, so check for the latest one
Port: 38888
chainId:038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smali"><code>Name: Jungle Testnet
Domain<span class="hljs-built_in"> or </span>IP: dev.cryptolions.io // It might be changed, so<span class="hljs-built_in"> check </span>for the latest one
Port: 38888
chainId:038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca</code></pre><p>&#x6DFB;&#x52A0;&#x7F51;&#x7EDC;&#x914D;&#x7F6E;&#x540E;&#xFF0C;&#x73B0;&#x5728;&#x901A;&#x8FC7;&#x8F93;&#x5165;&#x5BC6;&#x94A5;&#x5BF9;&#x90E8;&#x5206;&#x7136;&#x540E;&#x5355;&#x51FB;&#x65B0;&#x5EFA;&#x5C06;&#x4F60;&#x7684;&#x79C1;&#x94A5;&#x5BFC;&#x5165;&#x94B1;&#x5305;&#x3002;&#x6839;&#x636E;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#x7684;&#x8868;&#x683C;&#x586B;&#x5199;&#x5173;&#x952E;&#x4FE1;&#x606F;&#x3002;</p><p><span class="img-wrap"><img data-src="/EOS-dapp-eosjs-scatter/dapp.png" src="https://static.alili.tech/EOS-dapp-eosjs-scatter/dapp.png" alt="" title="" style="cursor:pointer"></span></p><p>&#x73B0;&#x5728;&#xFF0C;&#x60A8;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x5BC6;&#x94A5;&#x5BF9;&#x6DFB;&#x52A0;&#x6807;&#x8BC6;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7528;&#xFF0C;&#x8BF7;&#x8F6C;&#x5230;&#x201C;&#x8EAB;&#x4EFD;&#x201D;&#x90E8;&#x5206;&#x5E76;&#x6DFB;&#x52A0;&#x6216;&#x7F16;&#x8F91;&#x73B0;&#x6709;&#x8EAB;&#x4EFD;&#x3002;&#x5728;&#x8EAB;&#x4EFD;&#x90E8;&#x5206;&#xFF0C;&#x9009;&#x62E9;&#x7F51;&#x7EDC;&#xFF0C;&#x7136;&#x540E;&#x9009;&#x62E9;&#x5BC6;&#x94A5;&#x5BF9;&#xFF0C;&#x5B83;&#x4F1A;&#x8981;&#x6C42;&#x60A8;&#x5728;&#x94FE;&#x7F51;&#x4E0A;&#x6DFB;&#x52A0;&#x4E0E;&#x8BE5;&#x5BC6;&#x94A5;&#x76F8;&#x5173;&#x8054;&#x7684;&#x5E10;&#x6237;&#x3002; &#x60A8;&#x5E94;&#x8BE5;&#x6DFB;&#x52A0;&#x5177;&#x6709;&#x6D3B;&#x52A8;&#x6743;&#x9650;&#x7684;&#x5E10;&#x6237;&#x3002;</p><p>&#x4F60;&#x7684;scatter&#x5DF2;&#x5168;&#x90E8;&#x8BBE;&#x7F6E;&#x597D;&#x5E76;&#x53EF;&#x4EE5;&#x5728;&#x6211;&#x4EEC;&#x7684;dApp&#x4E2D;&#x4F7F;&#x7528;&#x3002;</p><p><span class="img-wrap"><img data-src="/EOS-dapp-eosjs-scatter/Scatter.png" src="https://static.alili.tech/EOS-dapp-eosjs-scatter/Scatter.png" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader3">&#x667A;&#x80FD;&#x5408;&#x7EA6;</h3><p>&#x8981;&#x90E8;&#x7F72;todo&#x667A;&#x80FD;&#x5408;&#x7EA6;&#xFF0C;&#x8BF7;&#x6309;&#x7167;&#x672C;&#x6587;&#x5C06;&#x5176;&#x90E8;&#x7F72;&#x5230;Jungle Testnet&#x4E0A;&#x3002;&#x786E;&#x4FDD;&#x80FD;&#x591F;&#x4ECE;&#x6587;&#x7AE0;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x4E0E;Testnet&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;</p><h3 id="articleHeader4">&#x4E0E;Testnet&#x4EA4;&#x4E92;</h3><p>&#x6211;&#x6B63;&#x5728;&#x4F7F;&#x7528;ReactJS&#x4F5C;&#x4E3A;&#x524D;&#x7AEF;&#x90E8;&#x5206;&#x3002;&#x5B8C;&#x6574;&#x7684;&#x903B;&#x8F91;&#x548C;&#x6D41;&#x7A0B;&#x4F4D;&#x4E8E;src&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x540D;&#x4E3A;index.jsx&#x7684;&#x5355;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x3002;&#x4EE5;&#x4E0B;&#x662F;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Config for scatter and eosjs
const EOS_CONFIG = {
contractName: &#x201C;xyz&#x201D;, // Contract name
contractSender: &#x201C;xyz&#x201D;, // User executing the contract (should be paired with private key)
network: {
protocol: &#x201C;http&#x201D;,
blockchain: &#x201C;eos&#x201D;,
host: &#x201C;dev.cryptolions.io&#x201D;,
port: 38888,
chainId: &#x201C;038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca&#x201D; // get this using http://dev.cryptolions.io:38888/v1/chain/get_info
},
eosOptions: {}
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-comment">// Config for scatter and eosjs</span>
const EOS_CONFIG = {
<span class="hljs-symbol">contractName:</span> &#x201C;xyz&#x201D;, <span class="hljs-comment">// Contract name</span>
<span class="hljs-symbol">contractSender:</span> &#x201C;xyz&#x201D;, <span class="hljs-comment">// User executing the contract (should be paired with private key)</span>
<span class="hljs-symbol">network:</span> {
<span class="hljs-symbol">protocol:</span> &#x201C;http&#x201D;,
<span class="hljs-symbol">blockchain:</span> &#x201C;eos&#x201D;,
<span class="hljs-symbol">host:</span> &#x201C;dev.cryptolions.io&#x201D;,
<span class="hljs-symbol">port:</span> <span class="hljs-number">38888</span>,
<span class="hljs-symbol">chainId:</span> &#x201C;<span class="hljs-number">038f</span>4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca&#x201D; <span class="hljs-comment">// get this using http://dev.cryptolions.io:38888/v1/chain/get_info</span>
},
<span class="hljs-symbol">eosOptions:</span> {}
};</code></pre><p>&#x4E0E;scatter&#x4EA4;&#x4E92;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import EOS from &#x2018;eosjs&#x2019;;
document.addEventListener(`scatterLoaded`, this.onScatterLoad);
onScatterLoad = () =&gt; {
const scatter = window.scatter;
window.scatter = null;
// Here, we are connecting scatter with eosjs so that the transactions can be signed using keys present in scatter
this.eosClient = scatter.eos(
EOS_CONFIG.network,
EOS,
EOS_CONFIG.eosOptions,
EOS_CONFIG.network.protocol
);
// scatter object to collect the information present in wallet like accounts or public key
this.scatter = scatter;
// to load the data present in our table
this.loadTodos();
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> EOS <span class="hljs-keyword">from</span> &#x2018;eosjs&#x2019;;
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">`scatterLoaded`</span>, <span class="hljs-keyword">this</span>.onScatterLoad);
onScatterLoad = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
<span class="hljs-keyword">const</span> scatter = <span class="hljs-built_in">window</span>.scatter;
<span class="hljs-built_in">window</span>.scatter = <span class="hljs-literal">null</span>;
<span class="hljs-comment">// Here, we are connecting scatter with eosjs so that the transactions can be signed using keys present in scatter</span>
<span class="hljs-keyword">this</span>.eosClient = scatter.eos(
EOS_CONFIG.network,
EOS,
EOS_CONFIG.eosOptions,
EOS_CONFIG.network.protocol
);
<span class="hljs-comment">// scatter object to collect the information present in wallet like accounts or public key</span>
<span class="hljs-keyword">this</span>.scatter = scatter;
<span class="hljs-comment">// to load the data present in our table</span>
<span class="hljs-keyword">this</span>.loadTodos();
};</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x4E24;&#x4E2A;&#x5F15;&#x7528;EOSClient&#x548C;scatter&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5206;&#x522B;&#x7528;&#x5B83;&#x4EEC;&#x4E0E;EOS&#x533A;&#x5757;&#x94FE;&#x548C;&#x94B1;&#x5305;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x3002;</p><p>&#x6211;&#x6B63;&#x5728;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4EE5;&#x4F7F;&#x7528;EOSClient&#x83B7;&#x53D6;&#x5B58;&#x50A8;&#x7684;&#x6570;&#x636E;&#xFF08;&#x6240;&#x6709;todos&#xFF09;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5728;<code>src/index.jsx</code>&#x4E2D;&#x68C0;&#x67E5;&#x5176;&#x4F59;&#x529F;&#x80FD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loadTodos() {
this.eosClient.getTableRows({
code: EOS_CONFIG.contractName,
scope: EOS_CONFIG.contractName,
table: &#x201C;todos&#x201D;,
json: true
}).then(data =&gt; {
this.setState({ todos: data.rows });
}).catch(e =&gt; {
console.error(e);
});
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>loadTodos() {
<span class="hljs-keyword">this</span>.eosClient.getTableRows({
<span class="hljs-string">code:</span> EOS_CONFIG.contractName,
<span class="hljs-string">scope:</span> EOS_CONFIG.contractName,
<span class="hljs-string">table:</span> &#x201C;todos&#x201D;,
<span class="hljs-string">json:</span> <span class="hljs-literal">true</span>
}).then(data =&gt; {
<span class="hljs-keyword">this</span>.setState({ <span class="hljs-string">todos:</span> data.rows });
}).<span class="hljs-keyword">catch</span>(e =&gt; {
console.error(e);
});
}</code></pre><p>&#x8981;&#x83B7;&#x53D6;&#x5E10;&#x6237;&#xFF0C;&#x8BF7;&#x4F7F;&#x7528;scatter&#x5BF9;&#x8C61;&#x7684;<code>getIdentity()</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { accounts } = await scatter.getIdentity({
accounts: [config.EOS_CONFIG.network]
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>const { accounts } = await <span class="hljs-keyword">scatter.getIdentity({
</span><span class="hljs-symbol">accounts:</span> [<span class="hljs-built_in">config</span>.EOS_CONFIG.network]
})<span class="hljs-comment">;</span></code></pre><p>&#x8FD9;&#x6837;&#x5C31;ok&#x3002;</p><h3 id="articleHeader5">&#x603B;&#x7ED3;</h3><p>&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x6700;&#x5927;&#x7684;&#x4F18;&#x70B9;&#x662F;&#x4F60;&#x65E0;&#x9700;&#x5728;&#x673A;&#x5668;&#x4E0A;&#x7EF4;&#x62A4;&#x94B1;&#x5305;&#xFF0C;scatter&#x4E3A;&#x6211;&#x4EEC;&#x7BA1;&#x7406;&#x4E00;&#x5207;&#x3002;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x6765;&#x6258;&#x7BA1;&#x94B1;&#x5305;&#xFF0C;&#x4F46;scatter&#x5BF9;&#x6700;&#x7EC8;&#x7528;&#x6237;&#x8D1F;&#x8D23;&#xFF0C;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x4E0D;&#x9700;&#x8981;&#x5904;&#x7406;&#x4EFB;&#x4F55;&#x79C1;&#x4EBA;&#x4FE1;&#x606F;&#x3002;<a href="https://github.com/eosasia/eos-todo" rel="nofollow noreferrer" target="_blank">github&#x5E93;</a></p><p>&#x5206;&#x4EAB;&#x4E00;&#x4E2A;&#x4EA4;&#x4E92;&#x5F0F;&#x7684;&#x5728;&#x7EBF;&#x7F16;&#x7A0B;&#x5B9E;&#x6218;&#xFF0C;<strong>EOS&#x667A;&#x80FD;&#x5408;&#x7EA6;&#x4E0E;DApp&#x5F00;&#x53D1;&#x5165;&#x95E8;</strong>&#xFF1A;</p><p><a href="http://xc.hubwiz.com/course/5b52c0a2c02e6b6a59171ded?affid=927sf" rel="nofollow noreferrer" target="_blank">EOS&#x6559;&#x7A0B;</a></p><p>&#x672C;&#x8BFE;&#x7A0B;&#x5E2E;&#x52A9;&#x4F60;&#x5FEB;&#x901F;&#x5165;&#x95E8;EOS&#x533A;&#x5757;&#x94FE;&#x53BB;&#x4E2D;&#x5FC3;&#x5316;&#x5E94;&#x7528;&#x7684;&#x5F00;&#x53D1;&#xFF0C;&#x5185;&#x5BB9;&#x6DB5;&#x76D6;EOS&#x5DE5;&#x5177;&#x94FE;&#x3001;&#x8D26;&#x6237;&#x4E0E;&#x94B1;&#x5305;&#x3001;&#x53D1;&#x884C;&#x4EE3;&#x5E01;&#x3001;&#x667A;&#x80FD;&#x5408;&#x7EA6;&#x5F00;&#x53D1;&#x4E0E;&#x90E8;&#x7F72;&#x3001;&#x4F7F;&#x7528;&#x4EE3;&#x7801;&#x4E0E;&#x667A;&#x80FD;&#x5408;&#x7EA6;&#x4EA4;&#x4E92;&#x7B49;&#x6838;&#x5FC3;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x6700;&#x540E;&#x7EFC;&#x5408;&#x8FD0;&#x7528;&#x5404;&#x77E5;&#x8BC6;&#x70B9;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x4FBF;&#x7B7E;DApp&#x7684;&#x5F00;&#x53D1;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x662F;<a href="http://blog.hubwiz.com/2018/09/26/EOS-dapp-eosjs-scatter/" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用EOSJS和scatter在EOS区块链上开发dApp

## 原文链接
[https://segmentfault.com/a/1190000016531302](https://segmentfault.com/a/1190000016531302)

