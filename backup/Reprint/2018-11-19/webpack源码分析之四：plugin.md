---
title: 'webpack源码分析之四：plugin' 
date: 2018-11-19 2:32:04
hidden: true
slug: o67s8kiegh
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x63D2;&#x4EF6;plugin,webpack&#x91CD;&#x8981;&#x7684;&#x7EC4;&#x6210;&#x90E8;&#x5206;&#x3002;&#x5B83;&#x4EE5;&#x4E8B;&#x4EF6;&#x6D41;&#x7684;&#x65B9;&#x5F0F;&#x8BA9;&#x7528;&#x6237;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x63A5;&#x89E6;&#x5230;webpack&#x7684;&#x6574;&#x4E2A;&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;&#x3002;plugin&#x5728;&#x7F16;&#x8BD1;&#x7684;&#x5173;&#x952E;&#x5730;&#x65B9;&#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x6781;&#x5927;&#x7684;&#x589E;&#x5F3A;&#x4E86;webpack&#x7684;&#x6269;&#x5C55;&#x6027;&#x3002;&#x5B83;&#x7684;&#x51FA;&#x73B0;&#x8BA9;webpack&#x4ECE;&#x4E00;&#x4E2A;&#x9762;&#x5411;&#x8FC7;&#x7A0B;&#x7684;&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF0C;&#x53D8;&#x6210;&#x4E86;&#x4E00;&#x5957;&#x5B8C;&#x6574;&#x7684;&#x6253;&#x5305;&#x751F;&#x6001;&#x7CFB;&#x7EDF;&#x3002;</p><h2 id="articleHeader1">&#x529F;&#x80FD;&#x5206;&#x6790;</h2><h3 id="articleHeader2">Tapable</h3><p>&#x65E2;&#x7136;&#x8BF4;&#x5230;&#x4E86;&#x4E8B;&#x4EF6;&#x6D41;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x5F97;&#x4ECB;&#x7ECD;Tapable&#x4E86;,Tapable&#x662F;webpack&#x91CC;&#x9762;&#x7684;&#x4E00;&#x4E2A;&#x5C0F;&#x578B;&#x5E93;,&#x5B83;&#x5141;&#x8BB8;&#x4F60;&#x81EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x5728;&#x89E6;&#x53D1;&#x540E;&#x8BBF;&#x95EE;&#x5230;&#x89E6;&#x53D1;&#x8005;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x3002;&#x5F53;&#x7136;&#x4ED6;&#x4E5F;&#x652F;&#x6301;&#x5F02;&#x6B65;&#x89E6;&#x53D1;&#xFF0C;&#x591A;&#x4E2A;&#x4E8B;&#x4EF6;&#x540C;&#x6B65;&#xFF0C;&#x5F02;&#x6B65;&#x89E6;&#x53D1;&#x3002;&#x672C;&#x6B21;&#x5B9E;&#x73B0;&#x7528;&#x7684;&#x662F;&#x8F83;&#x65E9;&#x7684;v0.1.9&#x7248;,&#x5177;&#x4F53;&#x6587;&#x6863;&#x53EF;&#x67E5;&#x770B;<a href="https://github.com/webpack/tapable/tree/19fedb828e6195d10e2af9e133b54613ff413273" rel="nofollow noreferrer" target="_blank">tapable v0.19&#x6587;&#x6863;</a></p><p>&#x5728;webpack&#x5185;&#x4F7F;&#x7528;&#xFF0C;&#x5982;SingleEntryPlugin&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler.plugin(&quot;make&quot;,function(compilation,callback){
   compilation.addEntry(this.context, new SingleEntryDependency({request: this.entry}), this.name, callback);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>compiler.plugin(<span class="hljs-string">&quot;make&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span></span>(compilation,<span class="hljs-keyword">callback</span>){
   compilation.addEntry(<span class="hljs-built_in">this</span>.context, <span class="hljs-keyword">new</span> <span class="hljs-type">SingleEntryDependency</span>({request: <span class="hljs-type">this</span>.entry}), <span class="hljs-built_in">this</span>.name, <span class="hljs-keyword">callback</span>);
})</code></pre><p>&#x5728;compiler&#x5185;&#x90E8;&#x89E6;&#x53D1;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.applyPluginsParallel(&apos;make&apos;,compilation, err =&gt; {
     /* do something */
 })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code> <span class="hljs-keyword">this</span>.applyPluginsParallel(<span class="hljs-string">&apos;make&apos;</span>,compilation, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
     <span class="hljs-comment">/* do something */</span>
 })</code></pre><p>&#x89E3;&#x6790;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x65F6;&#xFF0C;&#x901A;&#x8FC7;EntryOptionPlugin&#x89E3;&#x6790;entry&#x7C7B;&#x578B;&#x5E76;&#x5B9E;&#x4F8B;&#x5316;SingleEntryPlugin, SingleEntryPlugin&#x5728;&#x8C03;&#x7528;compilation&#x7684;addEntry&#x51FD;&#x6570;&#x5F00;&#x542F;&#x7F16;&#x8BD1;&#x3002;&#x8FD9;&#x79CD;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x7684;&#x8BBE;&#x8BA1;&#xFF0C;&#x89E3;&#x8026;&#x4E86;compiler, compilation&#xFF0C;&#x5E76;&#x4F7F;&#x5B83;&#x4EEC;&#x63D0;&#x4F9B;&#x7684;&#x529F;&#x80FD;&#x66F4;&#x52A0;&#x7EAF;&#x7CB9;,&#x8FDB;&#x800C;&#x589E;&#x52A0;&#x6269;&#x5C55;&#x6027;&#x3002;</p><h3 id="articleHeader3">&#x6D41;&#x7A0B;&#x5212;&#x5206;</h3><p>&#x7EB5;&#x89C2;&#x6574;&#x4E2A;&#x6253;&#x5305;&#x8FC7;&#x7A0B;&#xFF0C;&#x53EF;&#x4EE5;&#x6D41;&#x7A0B;&#x5212;&#x5206;&#x4E3A;&#x56DB;&#x5757;&#x3002;</p><ol><li>&#x521D;&#x59CB;&#x5316;</li><li>&#x6784;&#x5EFA;</li><li>&#x5C01;&#x88C5;</li><li>&#x6587;&#x4EF6;&#x5199;&#x5165;</li></ol><h3 id="articleHeader4">&#x6A21;&#x5757;&#x5212;&#x5206;</h3><p>&#x63A5;&#x5165;plugin&#x540E;,webpack&#x5BF9;parse,resolve,build,writeSource&#x7B49;&#x529F;&#x80FD;&#x7684;&#x5927;&#x89C4;&#x6A21;&#x91CD;&#x6784;&#x3002;<br>&#x76EE;&#x524D;&#x62C6;&#x5206;&#x6A21;&#x5757;&#x4E3A;</p><ul><li>Parser&#x6A21;&#x5757;,&#x8D1F;&#x8D23;&#x7F16;&#x8BD1;module&#x3002;</li><li>Resolver&#x6A21;&#x5757;,&#x8D1F;&#x8D23;&#x5BF9;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x8FDB;&#x884C;&#x89E3;&#x6790;&#x3002;</li><li>ModuleFactory&#x6A21;&#x5757;,&#x8D1F;&#x8D23;&#x5B8C;&#x6210;module&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x3002;</li><li>Module&#x6A21;&#x5757;,&#x8D1F;&#x8D23;&#x89E3;&#x6790;&#x51FA;modules&#x4F9D;&#x8D56;,chunk&#x4F9D;&#x8D56;&#x3002;&#x6784;&#x5EFA;&#x51FA;&#x6253;&#x5305;&#x540E;&#x81EA;&#x8EAB;module&#x7684;&#x6E90;&#x7801;&#x3002;</li><li>Template&#x6A21;&#x5757;,&#x8D1F;&#x8D23;&#x63D0;&#x4F9B;bundle,chunk&#x6A21;&#x5757;&#x6587;&#x4EF6;&#x5199;&#x5165;&#x7684;&#x6A21;&#x7248;&#x3002;</li><li>Compilation&#x6A21;&#x5757;,&#x8D1F;&#x8D23;&#x6587;&#x4EF6;&#x7F16;&#x8BD1;&#x7EC6;&#x8282;,&#x6784;&#x5EFA;&#x5E76;&#x5C01;&#x88C5;&#x51FA;assets&#x5BF9;&#x8C61;&#x4F9B;Compiler&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x5199;&#x5165;&#x3002;</li><li>Compiler&#x6A21;&#x5757;,&#x8D1F;&#x8D23;&#x5B9E;&#x4F8B;&#x5316;compilation,bundle&#x6587;&#x4EF6;&#x7684;&#x5199;&#x5165;&#x3002;&#x76D1;&#x542C;modules&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5E76;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x3002;</li></ul><h2 id="articleHeader5">&#x6838;&#x5FC3;&#x7C7B;&#x5173;&#x7CFB;&#x56FE;</h2><p><span class="img-wrap"><img data-src="/img/bVbeB4J?w=1198&amp;h=1312" src="https://static.alili.tech/img/bVbeB4J?w=1198&amp;h=1312" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader6">&#x529F;&#x80FD;&#x5B9E;&#x73B0;</h2><h3 id="articleHeader7">Parser&#x6A21;&#x5757;</h3><p>&#x901A;&#x8FC7;exprima&#x5C06;&#x6E90;&#x7801;&#x89E3;&#x6790;&#x4E3A;AST&#x6811;,&#x5E76;&#x62C6;&#x5206;statements&#xFF0C;&#x4EE5;&#x53CA;expression&#x76F4;&#x81F3;Identifier&#x57FA;&#x7840;&#x6A21;&#x5757;&#x3002;</p><ol><li>&#x89E3;&#x6790;&#x5230;CallExpression&#x65F6;&#x89E6;&#x53D1;call&#x4E8B;&#x4EF6;&#x3002;</li><li>&#x89E3;&#x6790;&#x5230;MemberExpression,Identifier&#x65F6;&#x89E6;&#x53D1;expression&#x4E8B;&#x4EF6;&#x3002;</li><li>&#x63D0;&#x4F9B;evaluateExpression&#x51FD;&#x6570;,&#x8BA2;&#x9605;Literal,ArrayExpression,CallExpression,ConditionalExpression&#x7B49;&#x9897;&#x7C92;&#x5316;&#x7684;&#x4E8B;&#x4EF6;&#x4F9B;evaluateExpression&#x8C03;&#x7528;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" case &apos;CallExpression&apos;:
            //do something
            this.applyPluginsBailResult(&apos;call &apos; + calleeName, expression);
            //do something
            break;
 case &apos;MemberExpression&apos;:
            //do something
            this.applyPluginsBailResult(&apos;expression &apos; + memberName, expression);
            //do something
            break;
 case &apos;Identifier&apos;:
            //do something
            this.applyPluginsBailResult(&apos;expression &apos; + idenName, expression);
               //do something
            break;           " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code> case <span class="hljs-string">&apos;CallExpression&apos;</span>:
            <span class="hljs-comment">//do something</span>
            <span class="hljs-keyword">this</span>.applyPluginsBailResult(<span class="hljs-string">&apos;call &apos;</span> + calleeName, expression);
            <span class="hljs-comment">//do something</span>
            <span class="hljs-keyword">break</span>;
 case <span class="hljs-string">&apos;MemberExpression&apos;</span>:
            <span class="hljs-comment">//do something</span>
            <span class="hljs-keyword">this</span>.applyPluginsBailResult(<span class="hljs-string">&apos;expression &apos;</span> + memberName, expression);
            <span class="hljs-comment">//do something</span>
            <span class="hljs-keyword">break</span>;
 case <span class="hljs-string">&apos;Identifier&apos;</span>:
            <span class="hljs-comment">//do something</span>
            <span class="hljs-keyword">this</span>.applyPluginsBailResult(<span class="hljs-string">&apos;expression &apos;</span> + idenName, expression);
               <span class="hljs-comment">//do something</span>
            <span class="hljs-keyword">break</span>;           </code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.plugin(&apos;evaluate Literal&apos;, (expr) =&gt; {})
 this.plugin(&apos;evaluate ArrayExpression&apos;, (expr) =&gt; {})
 this.plugin(&apos;evaluate CallExpression&apos;, (expr) =&gt; {})
 ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code> <span class="hljs-keyword">this</span>.plugin(<span class="hljs-string">&apos;evaluate Literal&apos;</span>, <span class="hljs-function"><span class="hljs-params">(expr)</span> =&gt;</span> {})
 <span class="hljs-keyword">this</span>.plugin(<span class="hljs-string">&apos;evaluate ArrayExpression&apos;</span>, <span class="hljs-function"><span class="hljs-params">(expr)</span> =&gt;</span> {})
 <span class="hljs-keyword">this</span>.plugin(<span class="hljs-string">&apos;evaluate CallExpression&apos;</span>, <span class="hljs-function"><span class="hljs-params">(expr)</span> =&gt;</span> {})
 ...</code></pre><p>&#x5982;&#x9700;&#x8981;&#x89E3;&#x6790;require(&quot;a&quot;),require.ensure([&quot;b&quot;],function(){})&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6CE8;&#x518C;plugin&#x53BB;&#x8BA2;&#x9605;&quot;call require&quot;,&#x4EE5;&#x53CA;&quot;call require.ensure&quot;,&#x518D;&#x5728;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8C03;&#x7528;evaluateExpression&#x89E3;&#x6790;expression&#x3002;</p><h3 id="articleHeader8">Resolver&#x6A21;&#x5757;</h3><p>&#x5C01;&#x88C5;&#x5728;enhanced-resolve&#x5E93;,&#x63D0;&#x4F9B;&#x5F02;&#x6B65;&#x89E3;&#x6790;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#xFF0C;&#x4EE5;&#x53CA;&#x53EF;&#x914D;&#x7F6E;&#x7684;filestream&#x80FD;&#x529B;&#x3002;&#x5728;webpack&#x7528;&#x4E8E;&#x7F13;&#x5B58;&#x6587;&#x4EF6;&#x6D41;&#x4EE5;&#x53CA;&#x4EE5;&#x4E0B;&#x4E09;&#x79CD;&#x7C7B;&#x578B;&#x6A21;&#x5757;&#x7684;&#x8DEF;&#x5F84;&#x89E3;&#x6790;&#x3002;</p><ul><li>&#x666E;&#x901A;&#x7684;module&#x6A21;&#x5757;</li><li>&#x5E26;context&#x7684;module&#x6A21;&#x5757;</li><li>loader&#x6A21;&#x5757;</li></ul><p>&#x7528;&#x6CD5;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ResolverFactory.createResolver(Object.assign({
            fileSystem: compiler.inputFileSystem,
            resolveToContext: true
        }, options.resolve));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">ResolverFactory</span><span class="hljs-selector-class">.createResolver</span>(<span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.assign</span>({
            <span class="hljs-attribute">fileSystem</span>: compiler.inputFileSystem,
            resolveToContext: true
        }, <span class="hljs-selector-tag">options</span><span class="hljs-selector-class">.resolve</span>));</code></pre><p>&#x5177;&#x4F53;&#x914D;&#x7F6E;&#x53EF;&#x53BB;&#x67E5;&#x770B;<a href="https://github.com/webpack/enhanced-resolve" rel="nofollow noreferrer" target="_blank">github&#x6587;&#x6863;</a></p><h3 id="articleHeader9">ModuleFactory&#x6A21;&#x5757;</h3><p>&#x5B50;&#x7C7B;&#x6709;NormalModuleFactory&#xFF0C;ContextModuleFactory&#x3002;&#x5E38;&#x7528;&#x7684;NormalModuleFactory&#x529F;&#x80FD;&#x5982;&#x4E0B;</p><ol><li>&#x5B9E;&#x4F8B;&#x5316;module&#x4E4B;&#x524D;,&#x8C03;&#x7528;Resolver&#x6A21;&#x5757;&#x89E3;&#x6790;&#x51FA;module&#x548C;preloaders&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x3002;</li><li>&#x901A;&#x8FC7;&#x6B63;&#x5219;&#x5339;&#x914D;module&#x6587;&#x4EF6;&#x540D;,&#x5339;&#x914D;&#x51FA;rules&#x5185;&#x7684;loaders&#xFF0C;&#x5E76;&#x548C;preloaders&#x5408;&#x5E76;&#x3002;</li><li>&#x5B9E;&#x4F8B;&#x5316;module</li></ol><p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x662F;&#x4F7F;&#x7528;async&#x5E93;&#x7684;parallel&#x51FD;&#x6570;&#x5E76;&#x884C;&#x7684;&#x89E3;&#x6790;loaders&#x548C;module&#x7684;&#x8DEF;&#x5F84;,&#x5E76;&#x6574;&#x5408;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async.parallel([
                (callback) =&gt; {
                    this.requestResolverArray( context, loader, resolver, callback)
                },
                (callback) =&gt; {
                    resolver.normal.resolve({}, context, req, function (err, result) {
                        callback(null, result)
                    });
                },
            ], (err, result) =&gt; {
                    let loaders = result[0];
                const resource = result[1];
                //do something
            })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">async</span>.parallel([
                <span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> {
                    <span class="hljs-keyword">this</span>.requestResolverArray( context, loader, resolver, callback)
                },
                <span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> {
                    resolver.normal.resolve({}, context, req, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
                        callback(<span class="hljs-literal">null</span>, result)
                    });
                },
            ], <span class="hljs-function">(<span class="hljs-params">err, result</span>) =&gt;</span> {
                    <span class="hljs-keyword">let</span> loaders = result[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">const</span> resource = result[<span class="hljs-number">1</span>];
                <span class="hljs-comment">//do something</span>
            })</code></pre><p>async&#x6A21;&#x5757;&#x662F;&#x4E00;&#x6574;&#x5957;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;<a href="http://caolan.github.io/async/" rel="nofollow noreferrer" target="_blank">async&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><h3 id="articleHeader10">Module&#x6A21;&#x5757;</h3><ol><li>&#x8FD0;&#x884C;loaders&#x6570;&#x7EC4;&#x5185;&#x7684;&#x51FD;&#x6570;,&#x652F;&#x6301;&#x540C;&#x6B65;&#xFF0C;&#x5F02;&#x6B65;loaders&#xFF0C;&#x5F97;&#x5230;&#x7F16;&#x8BD1;&#x524D;&#x6E90;&#x7801;&#x3002;</li><li>&#x6E90;&#x7801;&#x4EA4;&#x7531;Parser&#x8FDB;&#x884C;&#x89E3;&#x6790;,&#x5206;&#x6790;&#x51FA;modules&#x4F9D;&#x8D56;&#x548C;blocks&#x5207;&#x5272;&#x6587;&#x4EF6;&#x4F9D;&#x8D56;</li><li>&#x63D0;&#x4F9B;&#x66FF;&#x6362;&#x51FD;&#x6570;&#xFF0C;&#x5C06;&#x6E90;&#x7801;&#x66FF;&#x6362;&#xFF0C;&#x5982;require(&apos;./a&apos;)&#x66FF;&#x6362;&#x4E3A;__webpack_require__(1)</li></ol><p>&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;&#x597D;&#x7684;module&#x5BF9;&#x8C61;&#x5305;&#x542B;modules&#x4F9D;&#x8D56;ModuleDependency&#x548C;blocks&#x4F9D;&#x8D56;RequireEnsureDependenciesBlock,loaders,&#x6E90;&#x7801;_source,&#x5176;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  chunks: [],
  id: null,
  parser: 
   Tapable {
     _plugins: 
      { &apos;evaluate Literal&apos;: [Array],
        &apos;evaluate ArrayExpression&apos;: [Array],
        &apos;evaluate CallExpression&apos;: [Array],
        &apos;call require&apos;: [Array],
        &apos;call require:commonjs:item&apos;: [Array],
        &apos;call require.ensure&apos;: [Array] },
     options: {},
     scope: { declarations: [] },
     state: { current: [Circular], module: [Circular] },
     _currentPluginApply: undefined },
  fileDependencies: 
   [ &apos;/Users/zhujian/Documents/workspace/webpack/simple-webpack/example/a.js&apos; ],
  dependencies: 
   [ ModuleDependency {
       request: &apos;./module!d&apos;,
       range: [Array],
       class: [Function: ModuleDependency],
       type: &apos;cms require&apos; },
     ModuleDependency {
       request: &apos;./assets/test&apos;,
       range: [Array],
       class: [Function: ModuleDependency],
       type: &apos;cms require&apos; } ],
  blocks: 
   [ RequireEnsureDependenciesBlock {
       blocks: [],
       dependencies: [Array],
       requires: [Array],
       chunkName: &apos;&apos;,
       beforeRange: [Array],
       afterRange: [Array] } ],
  loaders: [],
  request: &apos;/Users/zhujian/Documents/workspace/webpack/simple-webpack/example/a.js&apos;,
  fileName: &apos;a.js&apos;,
  requires: [ [ 0, 7 ], [ 23, 30 ] ],
  context: &apos;/Users/zhujian/Documents/workspace/webpack/simple-webpack/example&apos;,
  built: true,
  _source: 
   RawSource {
     _result: 
      { source: &apos;require(\&apos;./module!d\&apos;);\nrequire(\&apos;./assets/test\&apos;);\nrequire.ensure([\&apos;./e\&apos;,\&apos;./b\&apos;], function () {\n    console.log(1)\n    console.log(1)\n    console.log(1)\n    console.log(1)\n    require(\&apos;./m\&apos;);\n    require(\&apos;./e\&apos;);\n});\n&apos; },
     _source: &apos;require(\&apos;./module!d\&apos;);\nrequire(\&apos;./assets/test\&apos;);\nrequire.ensure([\&apos;./e\&apos;,\&apos;./b\&apos;], function () {\n    console.log(1)\n    console.log(1)\n    console.log(1)\n    console.log(1)\n    require(\&apos;./m\&apos;);\n    require(\&apos;./e\&apos;);\n});\n&apos; 
             } 
     }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>{
  <span class="hljs-attribute">chunks</span>: [],
  <span class="hljs-attribute">id</span>: null,
  <span class="hljs-attribute">parser</span>: 
   Tapable {
     <span class="hljs-attribute">_plugins</span>: 
      { <span class="hljs-string">&apos;evaluate Literal&apos;</span>: [Array],
        <span class="hljs-string">&apos;evaluate ArrayExpression&apos;</span>: [Array],
        <span class="hljs-string">&apos;evaluate CallExpression&apos;</span>: [Array],
        <span class="hljs-string">&apos;call require&apos;</span>: [Array],
        <span class="hljs-string">&apos;call require:commonjs:item&apos;</span>: [Array],
        <span class="hljs-string">&apos;call require.ensure&apos;</span>: [Array] },
     <span class="hljs-attribute">options</span>: {},
     <span class="hljs-attribute">scope</span>: { <span class="hljs-attribute">declarations</span>: [] },
     <span class="hljs-attribute">state</span>: { <span class="hljs-attribute">current</span>: [Circular], <span class="hljs-attribute">module</span>: [Circular] },
     <span class="hljs-attribute">_currentPluginApply</span>: undefined },
  <span class="hljs-attribute">fileDependencies</span>: 
   [ <span class="hljs-string">&apos;/Users/zhujian/Documents/workspace/webpack/simple-webpack/example/a.js&apos;</span> ],
  <span class="hljs-attribute">dependencies</span>: 
   [ ModuleDependency {
       <span class="hljs-attribute">request</span>: <span class="hljs-string">&apos;./module!d&apos;</span>,
       <span class="hljs-attribute">range</span>: [Array],
       <span class="hljs-attribute">class</span>: [<span class="hljs-attribute">Function</span>: ModuleDependency],
       <span class="hljs-attribute">type</span>: <span class="hljs-string">&apos;cms require&apos;</span> },
     <span class="hljs-selector-tag">ModuleDependency</span> {
       <span class="hljs-attribute">request</span>: <span class="hljs-string">&apos;./assets/test&apos;</span>,
       <span class="hljs-attribute">range</span>: [Array],
       <span class="hljs-attribute">class</span>: [<span class="hljs-attribute">Function</span>: ModuleDependency],
       <span class="hljs-attribute">type</span>: <span class="hljs-string">&apos;cms require&apos;</span> } ],
  <span class="hljs-attribute">blocks</span>: 
   [ RequireEnsureDependenciesBlock {
       <span class="hljs-attribute">blocks</span>: [],
       <span class="hljs-attribute">dependencies</span>: [Array],
       <span class="hljs-attribute">requires</span>: [Array],
       <span class="hljs-attribute">chunkName</span>: <span class="hljs-string">&apos;&apos;</span>,
       <span class="hljs-attribute">beforeRange</span>: [Array],
       <span class="hljs-attribute">afterRange</span>: [Array] } ],
  <span class="hljs-attribute">loaders</span>: [],
  <span class="hljs-attribute">request</span>: <span class="hljs-string">&apos;/Users/zhujian/Documents/workspace/webpack/simple-webpack/example/a.js&apos;</span>,
  <span class="hljs-attribute">fileName</span>: <span class="hljs-string">&apos;a.js&apos;</span>,
  <span class="hljs-attribute">requires</span>: [ [ <span class="hljs-number">0</span>, <span class="hljs-number">7</span> ], [ <span class="hljs-number">23</span>, <span class="hljs-number">30</span> ] ],
  <span class="hljs-attribute">context</span>: <span class="hljs-string">&apos;/Users/zhujian/Documents/workspace/webpack/simple-webpack/example&apos;</span>,
  <span class="hljs-attribute">built</span>: true,
  <span class="hljs-attribute">_source</span>: 
   RawSource {
     <span class="hljs-attribute">_result</span>: 
      { <span class="hljs-attribute">source</span>: <span class="hljs-string">&apos;require(\&apos;</span>./module!d\<span class="hljs-string">&apos;);\nrequire(\&apos;</span>./assets/test\<span class="hljs-string">&apos;);\nrequire.ensure([\&apos;</span>./e\<span class="hljs-string">&apos;,\&apos;</span>./b\<span class="hljs-string">&apos;], function () {\n    console.log(1)\n    console.log(1)\n    console.log(1)\n    console.log(1)\n    require(\&apos;</span>./m\<span class="hljs-string">&apos;);\n    require(\&apos;</span>./e\<span class="hljs-string">&apos;);\n});\n&apos;</span> },
     <span class="hljs-attribute">_source</span>: <span class="hljs-string">&apos;require(\&apos;</span>./module!d\<span class="hljs-string">&apos;);\nrequire(\&apos;</span>./assets/test\<span class="hljs-string">&apos;);\nrequire.ensure([\&apos;</span>./e\<span class="hljs-string">&apos;,\&apos;</span>./b\<span class="hljs-string">&apos;], function () {\n    console.log(1)\n    console.log(1)\n    console.log(1)\n    console.log(1)\n    require(\&apos;</span>./m\<span class="hljs-string">&apos;);\n    require(\&apos;</span>./e\<span class="hljs-string">&apos;);\n});\n&apos;</span> 
             } 
     }</code></pre><h3 id="articleHeader11">Compilation&#x6A21;&#x5757;</h3><ol><li>&#x901A;&#x8FC7;entry&#x548C;context,&#x83B7;&#x53D6;&#x5230;&#x5165;&#x53E3;module&#x5BF9;&#x8C61;,&#x5E76;&#x521B;&#x5EFA;&#x5165;&#x53E3;chunk&#x3002;</li><li>&#x901A;&#x8FC7;module&#x7684;modules&#x4F9D;&#x8D56;&#x548C;blocks&#x5207;&#x5272;&#x6587;&#x4EF6;&#x6784;&#x5EFA;&#x51FA;&#x542B;&#x6709;chunk&#x548C;modules&#x5305;&#x542B;&#x5173;&#x7CFB;&#x7684;chunk&#x5BF9;&#x8C61;&#x3002;</li><li>&#x7ED9;modules&#x548C;chunks&#x7684;&#x6392;&#x5E8F;&#x5E76;&#x751F;&#x6210;id,&#x89E6;&#x53D1;&#x4E00;&#x7CFB;&#x5217;optimize&#x76F8;&#x5173;&#x7684;&#x4E8B;&#x4EF6;(&#x5982;CommonsChunkPlugin&#x5C31;&#x662F;&#x4F7F;&#x7528;optimize-chunks&#x4E8B;&#x4EF6;&#x8FDB;&#x884C;&#x5F00;&#x53D1;),&#x6700;&#x7EC8;&#x6784;&#x5EFA;&#x51FA;&#x6709;&#x6587;&#x4EF6;&#x540D;&#x548C;&#x6E90;&#x7801;&#x6620;&#x5C04;&#x5173;&#x7CFB;&#x7684;assets&#x5BF9;&#x8C61;</li></ol><p>&#x4E00;&#x4E2A;&#x5178;&#x578B;&#x7684;&#x542B;&#x6709;&#x5207;&#x5272;&#x6587;&#x4EF6;&#x7684;&#x591A;&#x5165;&#x53E3;entry&#x7684;assets&#x5BF9;&#x8C61;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assets: 
   { &apos;0.bundle.js&apos;: 
      Chunk {
        name: &apos;&apos;,
        parents: [Array],
        modules: [Array],
        id: 0,
        source: [Object] },
     &apos;main.bundle.js&apos;: 
      Chunk {
        name: &apos;main&apos;,
        parents: [],
        modules: [Array],
        id: 1,
        entry: true,
        chunks: [Array],
        blocks: true,
        source: [Object] },
     &apos;multiple.bundle.js&apos;: 
      Chunk {
        name: &apos;multiple&apos;,
        parents: [],
        modules: [Array],
        id: 2,
        entry: true,
        chunks: [Array],
        source: [Object] } 
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-attr">assets:</span> 
   <span class="hljs-string">{</span> <span class="hljs-string">&apos;0.bundle.js&apos;</span><span class="hljs-string">:</span> 
      <span class="hljs-string">Chunk</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        name:</span> <span class="hljs-string">&apos;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        parents:</span> <span class="hljs-string">[Array],</span>
<span class="hljs-attr">        modules:</span> <span class="hljs-string">[Array],</span>
<span class="hljs-attr">        id:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">        source:</span> <span class="hljs-string">[Object]</span> <span class="hljs-string">},</span>
     <span class="hljs-string">&apos;main.bundle.js&apos;</span><span class="hljs-string">:</span> 
      <span class="hljs-string">Chunk</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        name:</span> <span class="hljs-string">&apos;main&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        parents:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">        modules:</span> <span class="hljs-string">[Array],</span>
<span class="hljs-attr">        id:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">        entry:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        chunks:</span> <span class="hljs-string">[Array],</span>
<span class="hljs-attr">        blocks:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        source:</span> <span class="hljs-string">[Object]</span> <span class="hljs-string">},</span>
     <span class="hljs-string">&apos;multiple.bundle.js&apos;</span><span class="hljs-string">:</span> 
      <span class="hljs-string">Chunk</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        name:</span> <span class="hljs-string">&apos;multiple&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        parents:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">        modules:</span> <span class="hljs-string">[Array],</span>
<span class="hljs-attr">        id:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">        entry:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        chunks:</span> <span class="hljs-string">[Array],</span>
<span class="hljs-attr">        source:</span> <span class="hljs-string">[Object]</span> <span class="hljs-string">}</span> 
  <span class="hljs-string">}</span></code></pre><h3 id="articleHeader12">Compiler&#x6A21;&#x5757;</h3><ol><li>&#x89E3;&#x6790;CLI, webpack&#x914D;&#x7F6E;&#x83B7;&#x53D6;options&#x5BF9;&#x8C61;,&#x521D;&#x59CB;&#x5316;resolver,parser&#x5BF9;&#x8C61;&#x3002;</li><li>&#x5B9E;&#x4F8B;&#x5316;compilation&#x5BF9;&#x8C61;,&#x89E6;&#x53D1;make &#x5E76;&#x884C;&#x4E8B;&#x4EF6;&#x8C03;&#x7528;compilation&#x5BF9;&#x8C61;&#x7684;addEntry&#x5F00;&#x542F;&#x7F16;&#x8BD1;&#x3002;</li><li>&#x83B7;&#x53D6;&#x5230;assets&#x5BF9;&#x8C61;,&#x901A;&#x8FC7;&#x89E6;&#x53D1;before-emit&#x4E8B;&#x4EF6;&#x5F00;&#x542F;&#x6587;&#x4EF6;&#x5199;&#x5165;&#x3002;&#x901A;&#x8FC7;JsonMainTemplate&#x6A21;&#x7248;&#x5B8C;&#x6210;&#x4E3B;&#x5165;&#x53E3;bundle&#x6587;&#x4EF6;&#x7684;&#x5199;&#x5165;&#xFF0C;JsonpChunkTemplate&#x6A21;&#x7248;&#x5B8C;&#x6210;chunk&#x5207;&#x5272;&#x6587;&#x4EF6;&#x7684;&#x5199;&#x5165;&#x3002; &#x4F7F;&#x7528;async.forEach&#x7BA1;&#x7406;&#x5F02;&#x6B65;&#x591A;&#x6587;&#x4EF6;&#x5199;&#x5165;&#x7684;&#x7ED3;&#x679C;&#x3002;</li><li>&#x76D1;&#x542C;modules&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5E76;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x3002;</li></ol><p>&#x8003;&#x8651;&#x5230;&#x591A;&#x5165;&#x53E3;entry&#x7684;&#x53EF;&#x80FD;,make&#x8C03;&#x7528;&#x7684;&#x662F;&#x5E76;&#x884C;&#x5F02;&#x6B65;&#x4E8B;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.applyPluginsParallel(&apos;make&apos;, compilation, err =&gt; {
    //do something
    compilation.seal(err=&gt;{})
    //do something
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">this</span>.applyPluginsParallel(<span class="hljs-string">&apos;make&apos;</span>, compilation, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-comment">//do something</span>
    compilation.seal(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{})
    <span class="hljs-comment">//do something</span>
}</code></pre><h2 id="articleHeader13">&#x4EE3;&#x7801;&#x5B9E;&#x73B0;</h2><p>&#x672C;&#x4EBA;&#x7684;&#x7B80;&#x6613;&#x7248;webpack&#x5B9E;&#x73B0;<a href="https://github.com/laughing-pic-zhu/simple-webpack" rel="nofollow noreferrer" target="_blank">simple-webpack</a></p><h2 id="articleHeader14">&#x603B;&#x7ED3;</h2><p>&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x6709;&#x8BBE;&#x8BA1;&#x8FC7;&#x4E1A;&#x52A1;/&#x5F00;&#x6E90;&#x4EE3;&#x7801;,&#x5F88;&#x591A;&#x60C5;&#x51B5;&#x662F;&#x8D8A;&#x5F80;&#x540E;&#x5199;&#xFF0C;&#x8D8A;&#x96BE;&#x7EF4;&#x62A4;&#x3002;&#x4E00;&#x6B21;&#x6B21;&#x7684;&#x5B9A;&#x5236;&#x5316;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x5C06;&#x539F;&#x6709;&#x7684;&#x8BBE;&#x8BA1;&#x6539;&#x7684;&#x652F;&#x79BB;&#x7834;&#x788E;&#x3002;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x8BD5;&#x8BD5;&#x501F;&#x9274;webpak&#x7684;&#x601D;&#x60F3;&#xFF0C;&#x5145;&#x5206;&#x601D;&#x8003;&#x5E76;&#x62BD;&#x8C61;&#x51FA;&#x7A33;&#x5B9A;&#x7684;&#x57FA;&#x7840;&#x6A21;&#x5757;&#xFF0C;&#x5212;&#x5206;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x5C06;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#xFF0C;&#x7279;&#x6B8A;&#x9700;&#x6C42;&#x4EA4;&#x7531;&#x63D2;&#x4EF6;&#x53BB;&#x89E3;&#x51B3;&#x3002;</p><p>&#x5B8C;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack源码分析之四：plugin

## 原文链接
[https://segmentfault.com/a/1190000015836947](https://segmentfault.com/a/1190000015836947)

