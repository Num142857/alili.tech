---
title: 'Immer.js简析' 
date: 2018-11-25 2:30:08
hidden: true
slug: 5n9qbxjtync
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x5F00;&#x59CB;</h1><p>&#x5728;&#x51FD;&#x6570;&#x5F0F;&#x7F16;&#x7A0B;&#x4E2D;&#xFF0C;Immutable&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x662F;&#x76F8;&#x5F53;&#x91CD;&#x8981;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5728;Javascript&#x4E2D;&#x5F88;&#x660E;&#x663E;&#x662F;&#x6CA1;&#x529E;&#x6CD5;&#x4ECE;&#x8BED;&#x8A00;&#x5C42;&#x9762;&#x63D0;&#x4F9B;&#x652F;&#x6301;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x5E93;(&#x4F8B;&#x5982;&#xFF1A;Immutable.js)&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x7ED9;&#x5F00;&#x53D1;&#x8005;&#x7528;&#x4E0A;&#x8FD9;&#x6837;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x76F4;&#x5F88;&#x597D;&#x5947;&#x8FD9;&#x4E9B;&#x5E93;&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;Immutable&#x7684;&#xFF0C;&#x8FD9;&#x6B21;&#x5C31;&#x4ECE;Immer.js&#xFF08;&#x5C0F;&#x5DE7;&#x73B2;&#x73D1;&#xFF09;&#x5165;&#x624B;&#x770B;&#x770B;&#x5185;&#x90E8;&#x662F;&#x600E;&#x4E48;&#x505A;&#x7684;&#x3002;</p><h1 id="articleHeader1">Copy On Write&#xFF08;&#x5199;&#x65F6;&#x590D;&#x5236;&#xFF09;</h1><p>&#x7B2C;&#x4E00;&#x6B21;&#x4E86;&#x89E3;&#x5230;&#x8FD9;&#x6837;&#x7684;&#x6280;&#x672F;&#x8FD8;&#x662F;&#x5728;&#x5B66;Java&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x4E2A;&#x8BCD;&#x4E5F;&#x662F;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF1A;&#x51C6;&#x5907;&#x4FEE;&#x6539;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x590D;&#x5236;&#x4E00;&#x4EFD;&#x518D;&#x53BB;&#x4FEE;&#x6539;&#xFF1B;&#x8FD9;&#x6837;&#x5C31;&#x80FD;&#x907F;&#x514D;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x672C;&#x4F53;&#x6570;&#x636E;&#xFF0C;&#x4E5F;&#x80FD;&#x628A;&#x6027;&#x80FD;&#x5F71;&#x54CD;&#x6700;&#x5C0F;&#x5316;&#xFF08;&#x4E0D;&#x4FEE;&#x6539;&#x5C31;&#x4E0D;&#x7528;&#x590D;&#x5236;&#x4E86;&#x561B;&#xFF09;&#xFF1B;&#x5728;Immer.js&#x91CC;&#x9762;&#x4E5F;&#x662F;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x6280;&#x672F;&#xFF0C;&#x800C;Immer.js&#x7684;&#x57FA;&#x672C;&#x601D;&#x60F3;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><blockquote>The basic idea is that you will apply all your changes to a temporarily draftState, which is a proxy of the currentState. Once all your mutations are completed, Immer will produce the nextState based on the mutations to the draft state. This means that you can interact with your data by simply modifying it, while keeping all the benefits of immutable data.</blockquote><p>&#x4E2A;&#x4EBA;&#x7B80;&#x5355;&#x7FFB;&#x8BD1;&#x4E00;&#x4E0B;&#xFF1A;&#x4E3B;&#x8981;&#x601D;&#x60F3;&#x5C31;&#x662F;&#x5148;&#x5728;currentState&#x57FA;&#x7840;&#x4E0A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x4EE3;&#x7406;draftState&#xFF0C;&#x4E4B;&#x540E;&#x7684;&#x6240;&#x6709;&#x4FEE;&#x6539;&#x90FD;&#x4F1A;&#x5728;draftState&#x4E0A;&#x8FDB;&#x884C;&#xFF0C;&#x907F;&#x514D;&#x76F4;&#x63A5;&#x4FEE;&#x6539;currentState&#xFF0C;&#x800C;&#x5F53;&#x4FEE;&#x6539;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x518D;&#x4ECE;draftState&#x57FA;&#x7840;&#x4E0A;&#x751F;&#x6210;nextState&#x3002;&#x6240;&#x4EE5;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x53EA;&#x6D89;&#x53CA;&#x4E09;&#x4E2A;State&#xFF1A;currentState&#xFF08;&#x8F93;&#x5165;&#x72B6;&#x6001;&#xFF09;&#xFF0C;draftState&#xFF08;&#x4E2D;&#x95F4;&#x72B6;&#x6001;&#xFF09;&#xFF0C;nextState&#xFF08;&#x8F93;&#x51FA;&#x72B6;&#x6001;&#xFF09;&#xFF1B;&#x5173;&#x952E;&#x662F;draftState&#x662F;&#x5982;&#x4F55;&#x751F;&#x6210;&#xFF0C;&#x5982;&#x4F55;&#x5E94;&#x7528;&#x4FEE;&#x6539;&#xFF0C;&#x5982;&#x4F55;&#x751F;&#x6210;&#x6700;&#x7EC8;&#x7684;nextState&#x3002;</p><h1 id="articleHeader2">&#x5206;&#x6790;&#x6E90;&#x7801;</h1><p>&#x56E0;&#x4E3A;Immer.js&#x786E;&#x5B9E;&#x975E;&#x5E38;&#x5C0F;&#x5DE7;&#xFF0C;&#x6240;&#x4EE5;&#x76F4;&#x63A5;&#x4ECE;&#x6838;&#x5FC3;API&#x51FA;&#x53D1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const nextState = produce(baseState, draftState =&gt; {
    draftState.push({todo: &quot;Tweet about it&quot;})
    draftState[1].done = true
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>const <span class="hljs-attr">nextState</span> = produce(baseState, <span class="hljs-attr">draftState</span> =&gt; {
    draftState.push({todo: <span class="hljs-string">&quot;Tweet about it&quot;</span>})
    draftState[<span class="hljs-number">1</span>].<span class="hljs-attr">done</span> = <span class="hljs-literal">true</span>
})</code></pre><p>&#x5728;&#x4E0A;&#x9762;produce&#x65B9;&#x6CD5;&#x5C31;&#x5305;&#x62EC;&#x521A;&#x624D;&#x8BF4;&#x7684;currentState-&gt;draftState-&gt;nextState&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x7136;&#x540E;&#x6DF1;&#x5165;produce&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function produce(baseState, producer) {
    ...
    return getUseProxies()
        ? produceProxy(baseState, producer)
        : produceEs5(baseState, producer)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code>export default <span class="hljs-keyword">function</span> <span class="hljs-title">produce</span>(baseState, producer) {
    ...
    <span class="hljs-keyword">return</span> <span class="hljs-type">getUseProxies()</span>
        ? produceProxy(baseState, producer)
        : <span class="hljs-type">produceEs5</span>(baseState, producer)
}</code></pre><p>Immer.js&#x4F1A;&#x5224;&#x65AD;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;ES6&#x7684;Proxy&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x53EA;&#x80FD;&#x4F7F;&#x7528;ES5&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5B9E;&#x73B0;&#x4EE3;&#x7406;&#xFF08;&#x5F53;&#x7136;&#x4E5F;&#x662F;&#x4F1A;&#x9EBB;&#x70E6;&#x4E00;&#x70B9;&#xFF09;&#xFF0C;&#x8FD9;&#x91CC;&#x5148;&#x4ECE;ES6&#x7684;Proxy&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x5F00;&#x59CB;&#x5206;&#x6790;&#xFF0C;&#x540E;&#x9762;&#x518D;&#x56DE;&#x5934;&#x5206;&#x6790;&#x4E00;&#x4E0B;ES5&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function produceProxy(baseState, producer) {
    const previousProxies = proxies // 1.&#x5907;&#x4EFD;&#x5F53;&#x524D;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;
    proxies = []
    try {  
        const rootProxy = createProxy(undefined, baseState) // 2.&#x521B;&#x5EFA;&#x4EE3;&#x7406;
        const returnValue = producer.call(rootProxy, rootProxy) // 3.&#x5E94;&#x7528;&#x4FEE;&#x6539;
        let result
        if (returnValue !== undefined &amp;&amp; returnValue !== rootProxy) {
            if (rootProxy[PROXY_STATE].modified)
                throw new Error(RETURNED_AND_MODIFIED_ERROR)
            result = finalize(returnValue) // 4.&#x751F;&#x6210;&#x5BF9;&#x8C61;
        } else {
            result = finalize(rootProxy) // 5.&#x751F;&#x6210;&#x5BF9;&#x8C61;
        }
        each(proxies, (_, p) =&gt; p.revoke()) // 6.&#x6CE8;&#x9500;&#x5F53;&#x524D;&#x6240;&#x6709;&#x4EE3;&#x7406;
        return result
    } finally {
        proxies = previousProxies // 7.&#x6062;&#x590D;&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">produceProxy</span>(<span class="hljs-params">baseState, producer</span>) </span>{
    <span class="hljs-keyword">const</span> previousProxies = proxies <span class="hljs-comment">// 1.&#x5907;&#x4EFD;&#x5F53;&#x524D;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;</span>
    proxies = []
    <span class="hljs-keyword">try</span> {  
        <span class="hljs-keyword">const</span> rootProxy = createProxy(<span class="hljs-literal">undefined</span>, baseState) <span class="hljs-comment">// 2.&#x521B;&#x5EFA;&#x4EE3;&#x7406;</span>
        <span class="hljs-keyword">const</span> returnValue = producer.call(rootProxy, rootProxy) <span class="hljs-comment">// 3.&#x5E94;&#x7528;&#x4FEE;&#x6539;</span>
        <span class="hljs-keyword">let</span> result
        <span class="hljs-keyword">if</span> (returnValue !== <span class="hljs-literal">undefined</span> &amp;&amp; returnValue !== rootProxy) {
            <span class="hljs-keyword">if</span> (rootProxy[PROXY_STATE].modified)
                <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(RETURNED_AND_MODIFIED_ERROR)
            result = finalize(returnValue) <span class="hljs-comment">// 4.&#x751F;&#x6210;&#x5BF9;&#x8C61;</span>
        } <span class="hljs-keyword">else</span> {
            result = finalize(rootProxy) <span class="hljs-comment">// 5.&#x751F;&#x6210;&#x5BF9;&#x8C61;</span>
        }
        each(proxies, <span class="hljs-function">(<span class="hljs-params">_, p</span>) =&gt;</span> p.revoke()) <span class="hljs-comment">// 6.&#x6CE8;&#x9500;&#x5F53;&#x524D;&#x6240;&#x6709;&#x4EE3;&#x7406;</span>
        <span class="hljs-keyword">return</span> result
    } <span class="hljs-keyword">finally</span> {
        proxies = previousProxies <span class="hljs-comment">// 7.&#x6062;&#x590D;&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;</span>
    }
}</code></pre><p>&#x8FD9;&#x91CC;&#x628A;&#x5173;&#x952E;&#x7684;&#x6B65;&#x9AA4;&#x6CE8;&#x91CA;&#x4E00;&#x4E0B;&#xFF0C;&#x7B2C;1&#x6B65;&#x548C;&#x7B2C;6&#xFF0C;7&#x6B65;&#x662F;&#x6709;&#x5173;&#x8054;&#x7684;&#xFF0C;&#x4E3B;&#x8981;&#x4E3A;&#x4E86;&#x5E94;&#x5BF9;&#x5D4C;&#x5957;&#x7684;&#x573A;&#x666F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const nextStateA = produce(baseStateA, draftStateA =&gt; {
    draftStateA[1].done = true;
    const nextStateB = produce(baseStateB, draftStateB =&gt; {
        draftStateB[1].done = true
    });
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>const <span class="hljs-attr">nextStateA</span> = produce(baseStateA, <span class="hljs-attr">draftStateA</span> =&gt; {
    draftStateA[<span class="hljs-number">1</span>].<span class="hljs-attr">done</span> = <span class="hljs-literal">true</span>;
    const <span class="hljs-attr">nextStateB</span> = produce(baseStateB, <span class="hljs-attr">draftStateB</span> =&gt; {
        draftStateB[<span class="hljs-number">1</span>].<span class="hljs-attr">done</span> = <span class="hljs-literal">true</span>
    });
})</code></pre><p>&#x56E0;&#x4E3A;&#x6BCF;&#x4E2A;produce&#x65B9;&#x6CD5;&#x6700;&#x540E;&#x90FD;&#x8981;&#x6CE8;&#x9500;&#x6240;&#x6709;&#x4EE3;&#x7406;&#xFF0C;&#x9632;&#x6B62;produce&#x4E4B;&#x540E;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF08;&#x56E0;&#x4E3A;&#x5728;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x4E0A;&#x4FEE;&#x6539;&#x6700;&#x7EC8;&#x8FD8;&#x662F;&#x4F1A;&#x6620;&#x5C04;&#x5230;&#x751F;&#x6210;&#x7684;&#x5BF9;&#x8C61;&#x4E0A;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x6BCF;&#x6B21;&#x90FD;&#x9700;&#x8981;&#x5907;&#x4EFD;&#x4E00;&#x4E0B;proxies&#xFF0C;&#x4EE5;&#x4FBF;&#x4E4B;&#x540E;&#x6CE8;&#x9500;&#x3002;</p><p>&#x7B2C;2&#x6B65;&#xFF0C;&#x521B;&#x5EFA;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#xFF08;&#x6838;&#x5FC3;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createProxy(parentState, base) {
    if (isProxy(base)) throw new Error(&quot;Immer bug. Plz report.&quot;)
    const state = createState(parentState, base)
    const proxy = Array.isArray(base)
        ? Proxy.revocable([state], arrayTraps)
        : Proxy.revocable(state, objectTraps)
    proxies.push(proxy)
    return proxy.proxy
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>function createProxy(parentState, base) {
    if (isProxy(base)) throw new Error(<span class="hljs-string">&quot;Immer bug. Plz report.&quot;</span>)
    const <span class="hljs-keyword">state</span> = createState(parentState, base)
    const proxy = Array.isArray(base)
        ? Proxy.revocable([<span class="hljs-keyword">state</span>], arrayTraps)
        : Proxy.revocable(<span class="hljs-keyword">state</span>, objectTraps)
    proxies.push(proxy)
    return proxy.proxy
}</code></pre><p>&#x8FD9;&#x91CC;Immer.js&#x4F1A;&#x4F7F;&#x7528;crateState&#x65B9;&#x6CD5;&#x5C01;&#x88C5;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x4F20;&#x5165;&#x7684;&#x6570;&#x636E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    modified: false, //&#x662F;&#x5426;&#x4FEE;&#x6539;
    finalized: false, //&#x662F;&#x5426;finalized
    parent, //&#x7236;state
    base, //&#x81EA;&#x8EAB;state
    copy: undefined, //&#x62F7;&#x8D1D;&#x540E;&#x7684;state
    proxies: {} //&#x5B58;&#x653E;&#x751F;&#x6210;&#x7684;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>{
    modified: false, //&#x662F;&#x5426;&#x4FEE;&#x6539;
    finalized: false, //&#x662F;&#x5426;finalized
    parent, //&#x7236;<span class="hljs-keyword">state</span>
    base, //&#x81EA;&#x8EAB;<span class="hljs-keyword">state</span>
    copy: undefined, //&#x62F7;&#x8D1D;&#x540E;&#x7684;<span class="hljs-keyword">state</span>
    proxies: {} //&#x5B58;&#x653E;&#x751F;&#x6210;&#x7684;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;
}</code></pre><p>&#x7136;&#x540E;&#x5C31;&#x662F;&#x6839;&#x636E;&#x6570;&#x636E;&#x662F;&#x5426;&#x662F;&#x5BF9;&#x8C61;&#x8FD8;&#x662F;&#x6570;&#x7EC4;&#x6765;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7406;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x4EE3;&#x7406;&#x6240;&#x62E6;&#x622A;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const objectTraps = {
    get,
    has(target, prop) {
        return prop in source(target)
    },
    ownKeys(target) {
        return Reflect.ownKeys(source(target))
    },
    set,
    deleteProperty,
    getOwnPropertyDescriptor,
    defineProperty,
    setPrototypeOf() {
        throw new Error(&quot;Immer does not support `setPrototypeOf()`.&quot;)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code><span class="hljs-keyword">const</span> objectTraps = {
    get,
    has(<span class="hljs-keyword">target</span>, prop) {
        <span class="hljs-keyword">return</span> prop in source(<span class="hljs-keyword">target</span>)
    },
    ownKeys(<span class="hljs-keyword">target</span>) {
        <span class="hljs-keyword">return</span> Reflect.ownKeys(source(<span class="hljs-keyword">target</span>))
    },
    set,
    deleteProperty,
    getOwnPropertyDescriptor,
    defineProperty,
    setPrototypeOf() {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Error(<span class="hljs-string">&quot;Immer does not support `setPrototypeOf()`.&quot;</span>)
    }
}</code></pre><p>&#x6211;&#x4EEC;&#x91CD;&#x70B9;&#x5173;&#x6CE8;get&#x548C;set&#x65B9;&#x6CD5;&#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x662F;&#x6700;&#x5E38;&#x7528;&#x7684;&#xFF0C;&#x641E;&#x660E;&#x767D;&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x57FA;&#x672C;&#x539F;&#x7406;&#x4E5F;&#x641E;&#x660E;&#x767D;Immer.js&#x7684;&#x6838;&#x5FC3;&#x3002;&#x9996;&#x5148;&#x770B;get&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function get(state, prop) {
    if (prop === PROXY_STATE) return state
    if (state.modified) {
        const value = state.copy[prop]
        if (value === state.base[prop] &amp;&amp; isProxyable(value))
            return (state.copy[prop] = createProxy(state, value))
        return value
    } else {
        if (has(state.proxies, prop)) return state.proxies[prop]
        const value = state.base[prop]
        if (!isProxy(value) &amp;&amp; isProxyable(value))
            return (state.proxies[prop] = createProxy(state, value))
        return value
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>function get(<span class="hljs-keyword">state</span>, prop) {
    if (prop === PROXY_STATE) return <span class="hljs-keyword">state</span>
    if (<span class="hljs-keyword">state</span>.modified) {
        const value = <span class="hljs-keyword">state</span>.copy[prop]
        if (value === <span class="hljs-keyword">state</span>.base[prop] &amp;&amp; isProxyable(value))
            return (<span class="hljs-keyword">state</span>.copy[prop] = createProxy(<span class="hljs-keyword">state</span>, value))
        return value
    } else {
        if (has(<span class="hljs-keyword">state</span>.proxies, prop)) return <span class="hljs-keyword">state</span>.proxies[prop]
        const value = <span class="hljs-keyword">state</span>.base[prop]
        if (!isProxy(value) &amp;&amp; isProxyable(value))
            return (<span class="hljs-keyword">state</span>.proxies[prop] = createProxy(<span class="hljs-keyword">state</span>, value))
        return value
    }
}</code></pre><p>&#x4E00;&#x5F00;&#x59CB;&#x5982;&#x679C;&#x8BBF;&#x95EE;&#x5C5E;&#x6027;&#x7B49;&#x4E8E;PROXY_STATE&#x8FD9;&#x4E2A;&#x7279;&#x6B8A;&#x503C;&#x7684;&#x8BDD;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5C01;&#x88C5;&#x8FC7;&#x7684;state&#x672C;&#x8EAB;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5176;&#x4ED6;&#x5C5E;&#x6027;&#x4F1A;&#x8FD4;&#x56DE;&#x521D;&#x59CB;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x662F;&#x5B83;&#x7684;&#x62F7;&#x8D1D;&#x4E0A;&#x5BF9;&#x5E94;&#x7684;&#x503C;&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x63A5;&#x7740;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x5206;&#x652F;&#xFF0C;&#x5982;&#x679C;state&#x6CA1;&#x6709;&#x88AB;&#x4FEE;&#x6539;&#x8FC7;&#xFF0C;&#x8BBF;&#x95EE;&#x7684;&#x662F;state.base&#xFF08;&#x521D;&#x59CB;&#x5BF9;&#x8C61;&#xFF09;&#xFF0C;&#x5426;&#x5219;&#x8BBF;&#x95EE;&#x7684;&#x662F;state.copy&#xFF08;&#x56E0;&#x4E3A;&#x4FEE;&#x6539;&#x90FD;&#x4E0D;&#x4F1A;&#x5728;state.base&#x4E0A;&#x8FDB;&#x884C;&#xFF0C;&#x4E00;&#x65E6;&#x4FEE;&#x6539;&#x8FC7;&#xFF0C;&#x53EA;&#x6709;state.copy&#x624D;&#x662F;&#x6700;&#x65B0;&#x7684;&#xFF09;&#xFF1B;&#x8FD9;&#x91CC;&#x4E5F;&#x4F1A;&#x770B;&#x5230;&#x5176;&#x4ED6;&#x7684;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x53EA;&#x6709;&#x8BBF;&#x95EE;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x53BB;&#x5C1D;&#x8BD5;&#x521B;&#x5EFA;&#xFF0C;&#x5C5E;&#x4E8E;&#x201C;&#x61D2;&#x201D;&#x6A21;&#x5F0F;&#x3002;<br>&#x518D;&#x770B;&#x770B;set&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function set(state, prop, value) {
    if (!state.modified) {
        if (
            (prop in state.base &amp;&amp; is(state.base[prop], value)) ||
            (has(state.proxies, prop) &amp;&amp; state.proxies[prop] === value)
        )
            return true
        markChanged(state)
    }
    state.copy[prop] = value
    return true
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>function <span class="hljs-built_in">set</span>(<span class="hljs-keyword">state</span>, prop, value) {
    if (!<span class="hljs-keyword">state</span>.modified) {
        if (
            (prop <span class="hljs-keyword">in</span> <span class="hljs-keyword">state</span>.base &amp;&amp; is(<span class="hljs-keyword">state</span>.base[prop], value)) ||
            (has(<span class="hljs-keyword">state</span>.proxies, prop) &amp;&amp; <span class="hljs-keyword">state</span>.proxies[prop] === value)
        )
            return true
        markChanged(<span class="hljs-keyword">state</span>)
    }
    <span class="hljs-keyword">state</span>.copy[prop] = value
    return true
}</code></pre><p>&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x6B21;&#x4FEE;&#x6539;&#x5BF9;&#x8C61;&#xFF0C;&#x76F4;&#x63A5;&#x4F1A;&#x89E6;&#x53D1;markChanged&#x65B9;&#x6CD5;&#xFF0C;&#x628A;&#x81EA;&#x8EAB;&#x7684;modified&#x6807;&#x8BB0;&#x4E3A;true&#xFF0C;&#x63A5;&#x7740;&#x4E00;&#x76F4;&#x5192;&#x6CE1;&#x5230;&#x6839;&#x5BF9;&#x8C61;&#x8C03;&#x7528;markChange&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function markChanged(state) {
    if (!state.modified) {
        state.modified = true
        state.copy = shallowCopy(state.base)
        // copy the proxies over the base-copy
        Object.assign(state.copy, state.proxies) // yup that works for arrays as well
        if (state.parent) markChanged(state.parent)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>function markChanged(<span class="hljs-keyword">state</span>) {
    if (!<span class="hljs-keyword">state</span>.modified) {
        <span class="hljs-keyword">state</span>.modified = true
        <span class="hljs-keyword">state</span>.copy = shallowCopy(<span class="hljs-keyword">state</span>.base)
        // copy the proxies over the base-copy
        Object.assign(<span class="hljs-keyword">state</span>.copy, <span class="hljs-keyword">state</span>.proxies) // yup that works <span class="hljs-keyword">for</span> arrays as well
        if (<span class="hljs-keyword">state</span>.parent) markChanged(<span class="hljs-keyword">state</span>.parent)
    }
}</code></pre><p>&#x9664;&#x4E86;&#x6807;&#x8BB0;modified&#xFF0C;&#x8FD8;&#x505A;&#x53E6;&#x5916;&#x4E00;&#x4EF6;&#x5C31;&#x662F;&#x4ECE;base&#x4E0A;&#x751F;&#x6210;&#x62F7;&#x8D1D;&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x91CC;&#x505A;&#x7684;&#x6D45;&#x590D;&#x5236;&#xFF0C;&#x5C3D;&#x91CF;&#x5229;&#x7528;&#x5DF2;&#x5B58;&#x5728;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x51CF;&#x5C0F;&#x5185;&#x5B58;&#x6D88;&#x8017;&#xFF0C;&#x8FD8;&#x6709;&#x5C31;&#x662F;&#x628A;proxies&#x4E0A;&#x4E4B;&#x524D;&#x521B;&#x5EFA;&#x7684;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x4E5F;&#x590D;&#x5236;&#x8FC7;&#x53BB;&#x3002;&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x7684;state.copy&#x4E0A;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x5305;&#x542B;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x548C;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x4E4B;&#x540E;&#x7684;&#x8BBF;&#x95EE;&#x4FEE;&#x6539;&#x90FD;&#x76F4;&#x63A5;&#x5728;state.copy&#x4E0A;&#x8FDB;&#x884C;&#x3002;</p><p>&#x5230;&#x8FD9;&#x91CC;&#x5B8C;&#x6210;&#x4E86;&#x521A;&#x5F00;&#x59CB;&#x7684;currentState-&gt;draftState&#x7684;&#x8F6C;&#x6362;&#x4E86;&#xFF0C;&#x4E4B;&#x540E;&#x5C31;&#x662F;draftState-&gt;nextState&#x7684;&#x8F6C;&#x6362;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E4B;&#x524D;&#x6CE8;&#x91CA;&#x7684;&#x7B2C;4&#x6B65;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = finalize(returnValue)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ini"><code style="word-break:break-word;white-space:initial"><span class="hljs-attr">result</span> = finalize(returnValue)</code></pre><p>&#x518D;&#x770B;&#x770B;finalize&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function finalize(base) {
    if (isProxy(base)) {
        const state = base[PROXY_STATE]
        if (state.modified === true) {
            if (state.finalized === true) return state.copy
            state.finalized = true
            return finalizeObject(
                useProxies ? state.copy : (state.copy = shallowCopy(base)),
                state
            )
        } else {
            return state.base
        }
    }
    finalizeNonProxiedObject(base)
    return base
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>export function finalize(base) {
    if (isProxy(base)) {
        const <span class="hljs-keyword">state</span> = base[PROXY_STATE]
        if (<span class="hljs-keyword">state</span>.modified === true) {
            if (<span class="hljs-keyword">state</span>.finalized === true) return <span class="hljs-keyword">state</span>.copy
            <span class="hljs-keyword">state</span>.finalized = true
            return finalizeObject(
                useProxies ? <span class="hljs-keyword">state</span>.copy : (<span class="hljs-keyword">state</span>.copy = shallowCopy(base)),
                <span class="hljs-keyword">state</span>
            )
        } else {
            return <span class="hljs-keyword">state</span>.base
        }
    }
    finalizeN<span class="hljs-keyword">on</span>ProxiedObject(base)
    return base
}</code></pre><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E3B;&#x8981;&#x4E3A;&#x7684;&#x662F;&#x4ECE;state.copy&#x4E0A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A;&#x521A;&#x624D;&#x4E5F;&#x8BF4;&#x4E86;state.copy&#x4E0A;&#x5F88;&#x6709;&#x53EF;&#x80FD;&#x540C;&#x65F6;&#x5305;&#x542B;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x548C;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x5FC5;&#x987B;&#x628A;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x90FD;&#x8F6C;&#x6362;&#x6210;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;state.finalized&#x5C31;&#x662F;&#x6807;&#x8BB0;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x8F6C;&#x6362;&#x7684;&#x3002;<br>&#x76F4;&#x63A5;&#x6DF1;&#x5165;finalizeObject&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function finalizeObject(copy, state) {
    const base = state.base
    each(copy, (prop, value) =&gt; {
        if (value !== base[prop]) copy[prop] = finalize(value)
    })
    return freeze(copy)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>function finalizeObject(<span class="hljs-keyword">copy</span><span class="bash">, state) {
</span>    const base = state.base
    each(<span class="hljs-keyword">copy</span><span class="bash">, (prop, value) =&gt; {
</span>        if (value !== base[prop]) <span class="hljs-keyword">copy</span><span class="bash">[prop] = finalize(value)
</span>    })
    return freeze(<span class="hljs-keyword">copy</span><span class="bash">)
</span>}</code></pre><p>&#x8FD9;&#x91CC;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x6DF1;&#x5EA6;&#x904D;&#x5386;&#xFF0C;&#x5982;&#x679C;state.copy&#x4E0A;&#x7684;value&#x4E0D;&#x7B49;&#x4E8E;state.base&#x4E0A;&#x7684;&#xFF0C;&#x80AF;&#x5B9A;&#x662F;&#x88AB;&#x4FEE;&#x6539;&#x8FC7;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x76F4;&#x63A5;&#x518D;&#x8DF3;&#x5165;finalize&#x91CC;&#x9762;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#xFF0C;&#x6700;&#x540E;&#x628A;&#x8F6C;&#x6362;&#x540E;&#x7684;state.copy&#xFF0C;freeze&#x4E00;&#x4E0B;&#xFF0C;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Immutable&#x6570;&#x636E;&#x5C31;&#x8BDE;&#x751F;&#x4E86;&#x3002;<br>&#x800C;&#x53E6;&#x5916;&#x4E00;&#x4E2A;finalizeNonProxiedObject&#x65B9;&#x6CD5;&#xFF0C;&#x76EE;&#x6807;&#x4E5F;&#x662F;&#x67E5;&#x627E;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x7684;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#xFF0C;&#x5C31;&#x4E0D;&#x8D34;&#x4EE3;&#x7801;&#x4E86;&#x3002;</p><p>&#x81F3;&#x6B64;&#x57FA;&#x672C;&#x628A;Immer.js&#x4E0A;&#x7684;Proxy&#x6A21;&#x5F0F;&#x89E3;&#x6790;&#x5B8C;&#x6BD5;&#x3002;</p><p>&#x800C;&#x5728;ES5&#x4E0A;&#x56E0;&#x4E3A;&#x6CA1;&#x6709;ES6&#x7684;Proxy&#xFF0C;&#x53EA;&#x80FD;&#x4EFF;&#x9020;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createProxy(parent, base) {
    const proxy = shallowCopy(base)
    each(base, i =&gt; {
        Object.defineProperty(proxy, &quot;&quot; + i, createPropertyProxy(&quot;&quot; + i))
    })
    const state = createState(parent, proxy, base)
    createHiddenProperty(proxy, PROXY_STATE, state)
    states.push(state)
    return proxy
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>function createProxy(parent, base) {
    const proxy = shallowCopy(base)
    each(base, i =&gt; {
        Object.defineProperty(proxy, <span class="hljs-string">&quot;&quot;</span> + i, createPropertyProxy(<span class="hljs-string">&quot;&quot;</span> + i))
    })
    const <span class="hljs-keyword">state</span> = createState(parent, proxy, base)
    createHiddenProperty(proxy, PROXY_STATE, <span class="hljs-keyword">state</span>)
    states.push(<span class="hljs-keyword">state</span>)
    return proxy
}</code></pre><p>&#x521B;&#x5EFA;&#x4EE3;&#x7406;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x662F;&#x5148;&#x4ECE;base&#x4E0A;&#x8FDB;&#x884C;&#x6D45;&#x590D;&#x5236;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;defineProperty&#x5BF9;&#x8C61;&#x7684;getter&#x548C;setter&#x8FDB;&#x884C;&#x62E6;&#x622A;&#xFF0C;&#x628A;&#x6620;&#x5C04;&#x5230;state.base&#x6216;&#x8005;state.copy&#x4E0A;&#x3002;&#x5176;&#x5B9E;&#x73B0;&#x5728;&#x6CE8;&#x610F;&#x5230;ES5&#x53EA;&#x80FD;&#x5BF9;getter&#x548C;setter&#x8FDB;&#x884C;&#x62E6;&#x622A;&#x5904;&#x7406;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x4E0A;&#x5220;&#x9664;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x4E4B;&#x540E;&#x600E;&#x4E48;&#x53BB;&#x77E5;&#x9053;&#xFF0C;&#x6240;&#x4EE5;Immer.js&#x6700;&#x540E;&#x4F1A;&#x7528;proxy&#x4E0A;&#x7684;&#x5C5E;&#x6027;keys&#x548C;base&#x4E0A;&#x7684;keys&#x505A;&#x4E00;&#x4E2A;&#x5BF9;&#x6BD4;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;&#x589E;&#x51CF;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hasObjectChanges(state) {
    const baseKeys = Object.keys(state.base)
    const keys = Object.keys(state.proxy)
    return !shallowEqual(baseKeys, keys)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>function hasObjectChanges(<span class="hljs-keyword">state</span>) {
    const baseKeys = Object.keys(<span class="hljs-keyword">state</span>.base)
    const keys = Object.keys(<span class="hljs-keyword">state</span>.proxy)
    return !shallowEqual(baseKeys, keys)
}</code></pre><p>&#x5176;&#x4ED6;&#x8FC7;&#x7A0B;&#x57FA;&#x672C;&#x8DDF;ES6&#x7684;Proxy&#x4E0A;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;</p><h1 id="articleHeader3">&#x7ED3;&#x675F;</h1><p>Immter.js&#x5B9E;&#x73B0;&#x8FD8;&#x662F;&#x76F8;&#x5F53;&#x5DE7;&#x5999;&#x7684;&#xFF0C;&#x4EE5;&#x540E;&#x53EF;&#x4EE5;&#x5728;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x4E0A;&#x4F7F;&#x7528;&#x4E00;&#x4E0B;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Immer.js简析

## 原文链接
[https://segmentfault.com/a/1190000015426465](https://segmentfault.com/a/1190000015426465)

