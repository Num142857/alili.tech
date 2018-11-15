---
title: 探索 PM2 Cluster 模式下 Log4js 日志丢失
reprint: true
categories: reprint
abbrlink: 33beabf8
date: 2018-10-26 02:30:12
---

{{% raw %}}
<p>Node &#x5E94;&#x7528;&#x4E3A;&#x5355;&#x7EBF;&#x7A0B;&#x5E94;&#x7528;&#xFF0C;JS &#x867D;&#x53EF;&#x5229;&#x7528;&#x5F02;&#x6B65; I/O &#x907F;&#x514D;&#x7EBF;&#x7A0B;&#x963B;&#x585E;&#xFF0C;&#x4F46;&#x65E0;&#x6CD5;&#x5229;&#x7528;&#x591A;&#x6838; CPU &#x7684;&#x4F18;&#x52BF;&#x63D0;&#x5347;&#x8FD0;&#x884C;&#x6548;&#x7387;&#xFF0C;&#x63D0;&#x9AD8;&#x541E;&#x5410;&#x91CF;&#x4ECD;&#x9700;&#x591A;&#x7EBF;&#x7A0B;&#x3002;Node Cluster &#x53EF;&#x4EA7;&#x751F;&#x591A;&#x4E2A;&#x5DE5;&#x4F5C;&#x7EBF;&#x7A0B;&#x5171;&#x4EAB;&#x540C;&#x4E00; TCP &#x8FDE;&#x63A5;&#xFF0C;&#x4E3B;&#x7EBF;&#x7A0B;&#x901A;&#x8FC7; IPC &#x901A;&#x9053;&#x4E0E;&#x5DE5;&#x4F5C;&#x7EBF;&#x7A0B;&#x901A;&#x8BAF;&#xFF0C;&#x5E76;&#x4F7F;&#x7528; <a href="https://en.wikipedia.org/wiki/Round-robin_scheduling" rel="nofollow noreferrer" target="_blank">Round-robin</a> &#x8D1F;&#x8F7D;&#x5747;&#x8861;&#x6781;&#x597D;&#x7684;&#x5904;&#x7406;&#x7EBF;&#x7A0B;&#x95F4;&#x538B;&#x529B;&#x3002;</p><p>PM2 Cluster &#x4F7F;&#x5F97; Node &#x64CD;&#x4F5C;&#x96C6;&#x7FA4;&#x66F4;&#x52A0;&#x5BB9;&#x6613;&#xFF0C;PM2 &#x4F1A;&#x6839;&#x636E;&#x670D;&#x52A1;&#x5668; CPU &#x6838;&#x6570;&#x4EA7;&#x751F;&#x76F8;&#x5E94;&#x7684;&#x5DE5;&#x4F5C;&#x7EBF;&#x7A0B;&#xFF0C;&#x53EA;&#x9700;&#x6309;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#x542F;&#x52A8;&#x5E94;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 start app.js -i 0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">pm2 start app.js -i 0</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016127577?w=1409&amp;h=401" src="https://static.alili.tech/img/remote/1460000016127577?w=1409&amp;h=401" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4F46; PM2 Cluster &#x4E0E; Log4js &#x76F8;&#x649E;&#x65F6;&#xFF0C;&#x7838;&#x51FA;&#x4E86;&#x5927;&#x5751;&#xFF0C;&#x672C;&#x4EBA;&#x8E29;&#x4E86;&#x8FDB;&#x53BB;&#x3002;</p><p>&#x8E29;&#x5751;&#x7ECF;&#x8FC7;&#xFF1A;&#x67D0;&#x65E5;&#x670D;&#x52A1;&#x7AEF;&#x540C;&#x5B66;&#x4E0A;&#x62A5;&#x4E86;&#x4E00;&#x7EBF;&#x4E0A;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x5F02;&#x5E38;&#x65E5;&#x5FD7;&#xFF0C;&#x4E3A;&#x8FFD;&#x8E2A;&#x5F02;&#x5E38;&#x4EA7;&#x751F;&#x539F;&#x56E0;&#xFF0C;&#x6211;&#x5728;&#x6240;&#x6709;&#x7EBF;&#x4E0A;&#x670D;&#x52A1;&#x5668;&#x7FFB;&#x67E5;&#x5747;&#x672A;&#x5BFB;&#x5230;&#x76F8;&#x5173;&#x65E5;&#x5FD7;&#x3002;&#x670D;&#x52A1;&#x7AEF;&#x5F02;&#x5E38;&#x65E5;&#x5FD7;&#x5E76;&#x975E;&#x634F;&#x9020;&#xFF0C;&#x524D;&#x7AEF;&#x65E5;&#x5FD7;&#x4E22;&#x5931;&#x5E76;&#x975E;&#x5076;&#x7136;&#x3002;&#x4E3A;&#x7EDF;&#x8BA1;&#x65E5;&#x5FD7;&#x4E22;&#x5931;&#x7387;&#xFF0C;&#x5728;&#x7EBF;&#x4E0B;&#x73AF;&#x5883;&#x5B9A;&#x91CF;&#x53D1;&#x8D77; 100 &#x6761;&#x8BF7;&#x6C42;&#xFF0C;&#x7ED3;&#x679C;&#x4EC5;&#x4EA7;&#x751F; 25 &#x6761;&#x65E5;&#x5FD7;&#xFF0C;&#x591A;&#x6B21;&#x5B9E;&#x9A8C;&#x53D1;&#x73B0;&#x4E22;&#x5931;&#x7387;&#x7A33;&#x5B9A;&#x5728; 3/4 &#x4EE4;&#x4EBA;&#x53D1;&#x6307;&#xFF01;&#x70ED;&#xFF08;&#x597D;&#xFF09;&#x7231;&#xFF08;&#x5947;&#xFF09;&#x6280;&#xFF08;&#x5FC3;&#xFF09;&#x672F;&#xFF08;&#x91CD;&#xFF09;&#x7684;&#x6211;&#x67E5;&#x9605;&#x4E86; Log4js &#x6E90;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="configuration.addListener((config) =&gt; {
    // clear out the listeners, because configure has been called.
    listeners.length = 0;

    disabled = config.disableClustering;
    pm2 = config.pm2;
    pm2InstanceVar = config.pm2InstanceVar || &apos;NODE_APP_INSTANCE&apos;;

    debug(`clustering disabled ? ${disabled}`);
    debug(`cluster.isMaster ? ${cluster.isMaster}`);
    debug(`pm2 enabled ? ${pm2}`);
    debug(`pm2InstanceVar = ${pm2InstanceVar}`);
    debug(`process.env[${pm2InstanceVar}] = ${process.env[pm2InstanceVar]}`);

    // just in case configure is called after shutdown.
    if (pm2) {
        process.removeListener(&apos;message&apos;, receiver);
    }
    if (cluster.removeListener) {
        cluster.removeListener(&apos;message&apos;, receiver);
    }

    if (config.disableClustering) {
        debug(&apos;Not listening for cluster messages, because clustering disabled.&apos;);
    } else if (isPM2Master()) {
        // PM2 cluster support
        // PM2 runs everything as workers - install pm2-intercom for this to work.
        // we only want one of the app instances to write logs.
        debug(&apos;listening for PM2 broadcast messages&apos;);
        process.on(&apos;message&apos;, receiver);
    } else if (cluster.isMaster) {
        debug(&apos;listening for cluster messages&apos;);
        cluster.on(&apos;message&apos;, receiver);
    } else {
        debug(&apos;not listening for messages, because we are not a master process.&apos;);
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">configuration.addListener(<span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
    <span class="hljs-comment">// clear out the listeners, because configure has been called.</span>
    listeners.length = <span class="hljs-number">0</span>;

    disabled = config.disableClustering;
    pm2 = config.pm2;
    pm2InstanceVar = config.pm2InstanceVar || <span class="hljs-string">&apos;NODE_APP_INSTANCE&apos;</span>;

    debug(<span class="hljs-string">`clustering disabled ? <span class="hljs-subst">${disabled}</span>`</span>);
    debug(<span class="hljs-string">`cluster.isMaster ? <span class="hljs-subst">${cluster.isMaster}</span>`</span>);
    debug(<span class="hljs-string">`pm2 enabled ? <span class="hljs-subst">${pm2}</span>`</span>);
    debug(<span class="hljs-string">`pm2InstanceVar = <span class="hljs-subst">${pm2InstanceVar}</span>`</span>);
    debug(<span class="hljs-string">`process.env[<span class="hljs-subst">${pm2InstanceVar}</span>] = <span class="hljs-subst">${process.env[pm2InstanceVar]}</span>`</span>);

    <span class="hljs-comment">// just in case configure is called after shutdown.</span>
    <span class="hljs-keyword">if</span> (pm2) {
        process.removeListener(<span class="hljs-string">&apos;message&apos;</span>, receiver);
    }
    <span class="hljs-keyword">if</span> (cluster.removeListener) {
        cluster.removeListener(<span class="hljs-string">&apos;message&apos;</span>, receiver);
    }

    <span class="hljs-keyword">if</span> (config.disableClustering) {
        debug(<span class="hljs-string">&apos;Not listening for cluster messages, because clustering disabled.&apos;</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isPM2Master()) {
        <span class="hljs-comment">// PM2 cluster support</span>
        <span class="hljs-comment">// PM2 runs everything as workers - install pm2-intercom for this to work.</span>
        <span class="hljs-comment">// we only want one of the app instances to write logs.</span>
        debug(<span class="hljs-string">&apos;listening for PM2 broadcast messages&apos;</span>);
        process.on(<span class="hljs-string">&apos;message&apos;</span>, receiver);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (cluster.isMaster) {
        debug(<span class="hljs-string">&apos;listening for cluster messages&apos;</span>);
        cluster.on(<span class="hljs-string">&apos;message&apos;</span>, receiver);
    } <span class="hljs-keyword">else</span> {
        debug(<span class="hljs-string">&apos;not listening for messages, because we are not a master process.&apos;</span>);
    }
});</code></pre><p>&#x8BF7;&#x6CE8;&#x610F;&#xFF1A;</p><blockquote>PM2 runs everything as workers - install pm2-intercom for this to work.</blockquote><p>Log4js &#x5728; Cluster &#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;worker &#x5C06;&#x65E5;&#x5FD7;&#x53D1;&#x9001;&#x81F3; master&#xFF0C;master &#x5B9E;&#x73B0;&#x65E5;&#x5FD7;&#x5199;&#x5165;&#x6587;&#x4EF6;&#x3002;&#x4F46;&#x5728; PM2 Cluster &#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x6240;&#x6709;&#x8FDB;&#x7A0B;&#x7686;&#x4E3A; worker&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016127581?w=749&amp;h=399" src="https://static.alili.tech/img/remote/1460000016127581?w=749&amp;h=399" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E8E;&#x662F;&#x6309;&#x7167; Log4js &#x6E90;&#x7801;&#x7684;&#x6307;&#x5F15;&#x5B89;&#x88C5; pm2-intercom &#x8FDB;&#x7A0B;&#x95F4;&#x901A;&#x8BAF;&#x6A21;&#x5757;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016127578?w=1208&amp;h=207" src="https://static.alili.tech/img/remote/1460000016127578?w=1208&amp;h=207" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4ECD;&#x4E0D;&#x594F;&#x6548;&#xFF0C;&#x53C8;&#x6CE8;&#x610F;&#x5230; isPM2Master()&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isPM2Master = () =&gt; pm2 &amp;&amp; process.env[pm2InstanceVar] === &apos;0&apos;;
const isMaster = () =&gt; disabled || cluster.isMaster || isPM2Master();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> isPM2Master = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> pm2 &amp;&amp; process.env[pm2InstanceVar] === <span class="hljs-string">&apos;0&apos;</span>;
<span class="hljs-keyword">const</span> isMaster = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> disabled || cluster.isMaster || isPM2Master();</code></pre><p>isPM2Master &#x901A;&#x8FC7; Log4js configure &#x4E2D; pm2 &#x53CA; pm2InstanceVar &#x53C2;&#x6570;&#x786E;&#x5B9A;&#xFF0C;&#x4E8E;&#x662F;&#x4FEE;&#x6539; Log4js &#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Log4JS.configure({
    // ...
    pm2: true,
    pm2InstanceVar: &apos;INSTANCE_ID&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">Log4JS.configure({
    <span class="hljs-comment">// ...</span>
    pm2: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">pm2InstanceVar</span>: <span class="hljs-string">&apos;INSTANCE_ID&apos;</span>
});</code></pre><p>&#x7EC8;&#x4E8E;&#x89E3;&#x51B3;&#x4E86; PM2 Cluster &#x6A21;&#x5F0F;&#x4E0B; Log4js &#x65E5;&#x5FD7;&#x4E22;&#x5931;&#x95EE;&#x9898;&#x3002;</p><hr><p>&#x8865;&#x5145;&#x4E00;&#x4E0B;&#xFF1A;</p><p>&#x81EA;&#x884C;&#x5B9E;&#x73B0; Node Cluster&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const OS = require(&apos;os&apos;);
const Cluster = require(&apos;cluster&apos;);
const Koa = require(&apos;koa&apos;);
const App = new Koa();
if (Cluster.isMaster) {
    for (let i = 0; i &lt; OS.cpus().length; i++) Cluster.fork();
    console.log(&apos;master&apos;, process.pid);
} else {
    App.listen(3000);
    console.log(&apos;worker&apos;, process.pid);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> OS = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;os&apos;</span>);
<span class="hljs-keyword">const</span> Cluster = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;cluster&apos;</span>);
<span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>);
<span class="hljs-keyword">const</span> App = <span class="hljs-keyword">new</span> Koa();
<span class="hljs-keyword">if</span> (Cluster.isMaster) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; OS.cpus().length; i++) Cluster.fork();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;master&apos;</span>, process.pid);
} <span class="hljs-keyword">else</span> {
    App.listen(<span class="hljs-number">3000</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;worker&apos;</span>, process.pid);
}</code></pre><p>&#x7AEF;&#x53E3; PID &#x4E0E;&#x63A7;&#x5236;&#x53F0;&#x663E;&#x793A;&#x7684; PID List &#x5173;&#x7CFB;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016127579?w=247&amp;h=391" src="https://static.alili.tech/img/remote/1460000016127579?w=247&amp;h=391" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016127580?w=1163&amp;h=121" src="https://static.alili.tech/img/remote/1460000016127580?w=1163&amp;h=121" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4F7F;&#x7528; PM2 Cluster &#x542F;&#x52A8; Node &#x5E94;&#x7528;&#xFF0C;&#x7AEF;&#x53E3; PID &#x4E0E; PM2 &#x63A7;&#x5236;&#x53F0;&#x663E;&#x793A;&#x7684; PID List &#x5173;&#x7CFB;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016127581?w=749&amp;h=399" src="https://static.alili.tech/img/remote/1460000016127581?w=749&amp;h=399" alt="" title="" style="cursor:pointer;display:inline"></span></p><hr><p>&#x4F5C;&#x8005;&#xFF1A;&#x5446;&#x604B;&#x5C0F;&#x55B5;</p><p>&#x6211;&#x7684;&#x540E;&#x82B1;&#x56ED;&#xFF1A;<a href="https://sunmengyuan.github.io/garden/" rel="nofollow noreferrer" target="_blank">https://sunmengyuan.github.io...</a></p><p>&#x6211;&#x7684; github&#xFF1A;<a href="https://github.com/sunmengyuan" rel="nofollow noreferrer" target="_blank">https://github.com/sunmengyuan</a></p><p>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="https://sunmengyuan.github.io/garden/2018/08/23/cluster-log.html" rel="nofollow noreferrer" target="_blank">https://sunmengyuan.github.io...</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
探索 PM2 Cluster 模式下 Log4js 日志丢失

## 原文链接
[https://segmentfault.com/a/1190000016127574](https://segmentfault.com/a/1190000016127574)

