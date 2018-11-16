---
title: JavaScript之实现一个简单的Vue
hidden: true
categories: [reprint]
slug: fba2b08e
date: 2018-11-02 02:30:12
---

{{< raw >}}
<p>vue&#x7684;&#x4F7F;&#x7528;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x5F88;&#x719F;&#x7EC3;&#x4E86;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x7B80;&#x5355;&#x3002;&#x4F46;&#x662F;&#x5927;&#x90E8;&#x5206;&#x4EBA;&#x4E0D;&#x77E5;&#x9053;&#x5176;&#x5185;&#x90E8;&#x7684;&#x539F;&#x7406;&#x662F;&#x600E;&#x4E48;&#x6837;&#x7684;&#xFF0C;&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x5C31;&#x6765;&#x4E00;&#x8D77;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;vue</p><h1 id="articleHeader0">Object.defineProperty()</h1><p>&#x5B9E;&#x73B0;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x5F97;&#x5148;&#x770B;&#x4E00;&#x4E0B;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty</a>&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x56E0;&#x4E3A;vue&#x4E3B;&#x8981;&#x662F;&#x901A;&#x8FC7;&#x6570;&#x636E;&#x52AB;&#x6301;&#x6765;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x901A;&#x8FC7;<code>get</code>&#x3001;<code>set</code>&#x6765;&#x5B8C;&#x6210;&#x6570;&#x636E;&#x7684;&#x8BFB;&#x53D6;&#x548C;&#x66F4;&#x65B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {name:&apos;wclimb&apos;}
var age = 24
Object.defineProperty(obj,&apos;age&apos;,{
    enumerable: true, // &#x53EF;&#x679A;&#x4E3E;
    configurable: false, // &#x4E0D;&#x80FD;&#x518D;define
    get () {
        return age
    },
    set (newVal) {
        console.log(&apos;&#x6211;&#x6539;&#x53D8;&#x4E86;&apos;,age +&apos; -&gt; &apos;+newVal);
        age = newVal
    }
})

&gt; obj.age
&gt; 24

&gt; obj.age = 25;
&gt; &#x6211;&#x6539;&#x53D8;&#x4E86; 24 -&gt; 25
&gt; 25" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>:<span class="hljs-string">&apos;wclimb&apos;</span>}
<span class="hljs-keyword">var</span> age = <span class="hljs-number">24</span>
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">&apos;age&apos;</span>,{
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// &#x53EF;&#x679A;&#x4E3E;</span>
    configurable: <span class="hljs-literal">false</span>, <span class="hljs-comment">// &#x4E0D;&#x80FD;&#x518D;define</span>
    get () {
        <span class="hljs-keyword">return</span> age
    },
    set (newVal) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6211;&#x6539;&#x53D8;&#x4E86;&apos;</span>,age +<span class="hljs-string">&apos; -&gt; &apos;</span>+newVal);
        age = newVal
    }
})

&gt; obj.age
&gt; <span class="hljs-number">24</span>

&gt; obj.age = <span class="hljs-number">25</span>;
&gt; &#x6211;&#x6539;&#x53D8;&#x4E86; <span class="hljs-number">24</span> -&gt; <span class="hljs-number">25</span>
&gt; <span class="hljs-number">25</span></code></pre><p>&#x4ECE;&#x4E0A;&#x9762;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x901A;&#x8FC7;<code>get</code>&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x901A;&#x8FC7;<code>set</code>&#x76D1;&#x542C;&#x5230;&#x6570;&#x636E;&#x53D8;&#x5316;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD8;&#x662F;&#x4E0D;&#x660E;&#x767D;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x770B;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty</a>&#x6587;&#x6863;&#x3002;</p><h1 id="articleHeader1">&#x6D41;&#x7A0B;&#x56FE;</h1><p><span class="img-wrap"><img data-src="/img/remote/1460000016365105?w=658&amp;h=409" src="https://static.alili.tech/img/remote/1460000016365105?w=658&amp;h=409" alt="" title="" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader2">html&#x4EE3;&#x7801;&#x7ED3;&#x6784;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;wrap&quot;&gt;
    &lt;p v-html=&quot;test&quot;&gt;&lt;/p&gt;
    &lt;input type=&quot;text&quot; v-model=&quot;form&quot;&gt;
    &lt;input type=&quot;text&quot; v-model=&quot;form&quot;&gt;
    &lt;button @click=&quot;changeValue&quot;&gt;&#x6539;&#x53D8;&#x503C;&lt;/button&gt;
    {{form}}
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">&quot;wrap&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">p</span> v-html=<span class="hljs-string">&quot;test&quot;</span>&gt;&lt;/p&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;text&quot;</span> v-model=<span class="hljs-string">&quot;form&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">&quot;text&quot;</span> v-model=<span class="hljs-string">&quot;form&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">button</span> @click=<span class="hljs-string">&quot;changeValue&quot;</span>&gt;&#x6539;&#x53D8;&#x503C;&lt;/button&gt;
    {{form}}
&lt;/div&gt;</code></pre><h1 id="articleHeader3">js&#x8C03;&#x7528;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    new Vue({
        el: &apos;#wrap&apos;,
        data:{
            form: &apos;&#x8FD9;&#x662F;form&#x7684;&#x503C;&apos;,
            test: &apos;&lt;strong&gt;&#x6211;&#x662F;&#x7C97;&#x4F53;&lt;/strong&gt;&apos;,
        },
        methods:{
            changeValue(){
                console.log(this.form)
                this.form = &apos;&#x503C;&#x88AB;&#x6211;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x6C14;&#x4E0D;&#x6C14;&#xFF1F;&apos;
            }
        }
    })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#wrap&apos;</span>,
        <span class="hljs-attr">data</span>:{
            <span class="hljs-attr">form</span>: <span class="hljs-string">&apos;&#x8FD9;&#x662F;form&#x7684;&#x503C;&apos;</span>,
            <span class="hljs-attr">test</span>: <span class="hljs-string">&apos;&lt;strong&gt;&#x6211;&#x662F;&#x7C97;&#x4F53;&lt;/strong&gt;&apos;</span>,
        },
        <span class="hljs-attr">methods</span>:{
            changeValue(){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.form)
                <span class="hljs-keyword">this</span>.form = <span class="hljs-string">&apos;&#x503C;&#x88AB;&#x6211;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x6C14;&#x4E0D;&#x6C14;&#xFF1F;&apos;</span>
            }
        }
    })</code></pre><h1 id="articleHeader4">Vue&#x7ED3;&#x6784;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class Vue{
        constructor(){}
        proxyData(){}
        observer(){}
        compile(){}
        compileText(){}
    }
    class Watcher{
        constructor(){}
        update(){}
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span></span>{
        <span class="hljs-keyword">constructor</span>(){}
        proxyData(){}
        observer(){}
        compile(){}
        compileText(){}
    }
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span></span>{
        <span class="hljs-keyword">constructor</span>(){}
        update(){}
    }</code></pre><ul><li><code>Vue constructor</code> &#x6784;&#x9020;&#x51FD;&#x6570;&#x4E3B;&#x8981;&#x662F;&#x6570;&#x636E;&#x7684;&#x521D;&#x59CB;&#x5316;</li><li><code>proxyData</code> &#x6570;&#x636E;&#x4EE3;&#x7406;</li><li><code>observer</code> &#x52AB;&#x6301;&#x76D1;&#x542C;&#x6240;&#x6709;&#x6570;&#x636E;</li><li><code>compile</code> &#x89E3;&#x6790;dom</li><li><code>compileText</code> &#x89E3;&#x6790;<code>dom</code>&#x91CC;&#x5904;&#x7406;&#x7EAF;&#x53CC;&#x82B1;&#x62EC;&#x53F7;&#x7684;&#x64CD;&#x4F5C;</li><li><code>Watcher</code> &#x66F4;&#x65B0;&#x89C6;&#x56FE;&#x64CD;&#x4F5C;</li></ul><h1 id="articleHeader5">Vue constructor &#x521D;&#x59CB;&#x5316;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class Vue{
        constructor(options = {}){
            this.$el = document.querySelector(options.el);
            let data = this.data = options.data; 
            // &#x4EE3;&#x7406;data&#xFF0C;&#x4F7F;&#x5176;&#x80FD;&#x76F4;&#x63A5;this.xxx&#x7684;&#x65B9;&#x5F0F;&#x8BBF;&#x95EE;data&#xFF0C;&#x6B63;&#x5E38;&#x7684;&#x8BDD;&#x9700;&#x8981;this.data.xxx
            Object.keys(data).forEach((key)=&gt; {
                this.proxyData(key);
            });
            this.methods = options.methods // &#x4E8B;&#x4EF6;&#x65B9;&#x6CD5;
            this.watcherTask = {}; // &#x9700;&#x8981;&#x76D1;&#x542C;&#x7684;&#x4EFB;&#x52A1;&#x5217;&#x8868;
            this.observer(data); // &#x521D;&#x59CB;&#x5316;&#x52AB;&#x6301;&#x76D1;&#x542C;&#x6240;&#x6709;&#x6570;&#x636E;
            this.compile(this.$el); // &#x89E3;&#x6790;dom
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span></span>{
        <span class="hljs-keyword">constructor</span>(options = {}){
            <span class="hljs-keyword">this</span>.$el = <span class="hljs-built_in">document</span>.querySelector(options.el);
            <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">this</span>.data = options.data; 
            <span class="hljs-comment">// &#x4EE3;&#x7406;data&#xFF0C;&#x4F7F;&#x5176;&#x80FD;&#x76F4;&#x63A5;this.xxx&#x7684;&#x65B9;&#x5F0F;&#x8BBF;&#x95EE;data&#xFF0C;&#x6B63;&#x5E38;&#x7684;&#x8BDD;&#x9700;&#x8981;this.data.xxx</span>
            <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>)=&gt;</span> {
                <span class="hljs-keyword">this</span>.proxyData(key);
            });
            <span class="hljs-keyword">this</span>.methods = options.methods <span class="hljs-comment">// &#x4E8B;&#x4EF6;&#x65B9;&#x6CD5;</span>
            <span class="hljs-keyword">this</span>.watcherTask = {}; <span class="hljs-comment">// &#x9700;&#x8981;&#x76D1;&#x542C;&#x7684;&#x4EFB;&#x52A1;&#x5217;&#x8868;</span>
            <span class="hljs-keyword">this</span>.observer(data); <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x52AB;&#x6301;&#x76D1;&#x542C;&#x6240;&#x6709;&#x6570;&#x636E;</span>
            <span class="hljs-keyword">this</span>.compile(<span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">// &#x89E3;&#x6790;dom</span>
        }
    }</code></pre><p>&#x4E0A;&#x9762;&#x4E3B;&#x8981;&#x662F;&#x521D;&#x59CB;&#x5316;&#x64CD;&#x4F5C;&#xFF0C;&#x9488;&#x5BF9;&#x4F20;&#x8FC7;&#x6765;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5904;&#x7406;</p><h1 id="articleHeader6">proxyData &#x4EE3;&#x7406;data</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Vue{
        constructor(options = {}){
            ......
        }
        proxyData(key){
            let that = this;
            Object.defineProperty(that, key, {
                configurable: false,
                enumerable: true,
                get () {
                    return that.data[key];
                },
                set (newVal) {
                    that.data[key] = newVal;
                }
            });
        }
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span></span>{
        <span class="hljs-keyword">constructor</span>(options = {}){
            ......
        }
        proxyData(key){
            <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>;
            <span class="hljs-built_in">Object</span>.defineProperty(that, key, {
                <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
                get () {
                    <span class="hljs-keyword">return</span> that.data[key];
                },
                set (newVal) {
                    that.data[key] = newVal;
                }
            });
        }
    }
</code></pre><p>&#x4E0A;&#x9762;&#x4E3B;&#x8981;&#x662F;&#x4EE3;&#x7406;<code>data</code>&#x5230;&#x6700;&#x4E0A;&#x5C42;&#xFF0C;<code>this.xxx</code>&#x7684;&#x65B9;&#x5F0F;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;<code>data</code></p><h1 id="articleHeader7">observer &#x52AB;&#x6301;&#x76D1;&#x542C;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Vue{
        constructor(options = {}){
            ......
        }
        proxyData(key){
            ......
        }
        observer(data){
            let that = this
            Object.keys(data).forEach(key=&gt;{
                let value = data[key]
                this.watcherTask[key] = []
                Object.defineProperty(data,key,{
                    configurable: false,
                    enumerable: true,
                    get(){
                        return value
                    },
                    set(newValue){
                        if(newValue !== value){
                            value = newValue
                            that.watcherTask[key].forEach(task =&gt; {
                                task.update()
                            })
                        }
                    }
                })
            })
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span></span>{
        <span class="hljs-keyword">constructor</span>(options = {}){
            ......
        }
        proxyData(key){
            ......
        }
        observer(data){
            <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>
            <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function"><span class="hljs-params">key</span>=&gt;</span>{
                <span class="hljs-keyword">let</span> value = data[key]
                <span class="hljs-keyword">this</span>.watcherTask[key] = []
                <span class="hljs-built_in">Object</span>.defineProperty(data,key,{
                    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
                    get(){
                        <span class="hljs-keyword">return</span> value
                    },
                    set(newValue){
                        <span class="hljs-keyword">if</span>(newValue !== value){
                            value = newValue
                            that.watcherTask[key].forEach(<span class="hljs-function"><span class="hljs-params">task</span> =&gt;</span> {
                                task.update()
                            })
                        }
                    }
                })
            })
        }
    }</code></pre><p>&#x540C;&#x6837;&#x662F;&#x4F7F;&#x7528;<code>Object.defineProperty</code>&#x6765;&#x76D1;&#x542C;&#x6570;&#x636E;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x9700;&#x8981;&#x8BA2;&#x9605;&#x7684;&#x6570;&#x636E;&#x3002;<br>&#x628A;&#x9700;&#x8981;&#x8BA2;&#x9605;&#x7684;&#x6570;&#x636E;&#x5230;<code>push</code>&#x5230;<code>watcherTask</code>&#x91CC;&#xFF0C;&#x7B49;&#x5230;&#x65F6;&#x5019;&#x9700;&#x8981;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x53EF;&#x4EE5;&#x6279;&#x91CF;&#x66F4;&#x65B0;&#x6570;&#x636E;&#x4E86;&#x3002;&#x1F447;&#x4E0B;&#x9762;&#x5C31;&#x662F;&#xFF1B;<br>&#x904D;&#x5386;&#x8BA2;&#x9605;&#x6C60;&#xFF0C;&#x6279;&#x91CF;&#x66F4;&#x65B0;&#x89C6;&#x56FE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    set(newValue){
        if(newValue !== value){
            value = newValue
            // &#x6279;&#x91CF;&#x66F4;&#x65B0;&#x89C6;&#x56FE;
            that.watcherTask[key].forEach(task =&gt; {
                task.update()
            })
        }
    }              " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    set(newValue){
        <span class="hljs-keyword">if</span>(newValue !== value){
            value = newValue
            <span class="hljs-comment">// &#x6279;&#x91CF;&#x66F4;&#x65B0;&#x89C6;&#x56FE;</span>
            that.watcherTask[key].forEach(<span class="hljs-function"><span class="hljs-params">task</span> =&gt;</span> {
                task.update()
            })
        }
    }              </code></pre><h1 id="articleHeader8">compile &#x89E3;&#x6790;dom</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Vue{
        constructor(options = {}){
            ......
        }
        proxyData(key){
            ......
        }
        observer(data){
            ......
        }
        compile(el){
            var nodes = el.childNodes;
            for (let i = 0; i &lt; nodes.length; i++) {
                const node = nodes[i];
                if(node.nodeType === 3){
                    var text = node.textContent.trim();
                    if (!text) continue;
                    this.compileText(node,&apos;textContent&apos;)                
                }else if(node.nodeType === 1){
                    if(node.childNodes.length &gt; 0){
                        this.compile(node)
                    }
                    if(node.hasAttribute(&apos;v-model&apos;) &amp;&amp; (node.tagName === &apos;INPUT&apos; || node.tagName === &apos;TEXTAREA&apos;)){
                        node.addEventListener(&apos;input&apos;,(()=&gt;{
                            let attrVal = node.getAttribute(&apos;v-model&apos;)
                            this.watcherTask[attrVal].push(new Watcher(node,this,attrVal,&apos;value&apos;))
                            node.removeAttribute(&apos;v-model&apos;)
                            return () =&gt; {
                                this.data[attrVal] = node.value
                            }
                        })())
                    }
                    if(node.hasAttribute(&apos;v-html&apos;)){
                        let attrVal = node.getAttribute(&apos;v-html&apos;);
                        this.watcherTask[attrVal].push(new Watcher(node,this,attrVal,&apos;innerHTML&apos;))
                        node.removeAttribute(&apos;v-html&apos;)
                    }
                    this.compileText(node,&apos;innerHTML&apos;)
                    if(node.hasAttribute(&apos;@click&apos;)){
                        let attrVal = node.getAttribute(&apos;@click&apos;)
                        node.removeAttribute(&apos;@click&apos;)
                        node.addEventListener(&apos;click&apos;,e =&gt; {
                            this.methods[attrVal] &amp;&amp; this.methods[attrVal].bind(this)()
                        })
                    }
                }
            }
        },
        compileText(node,type){
            let reg = /\{\{(.*?)\}\}/g, txt = node.textContent;
            if(reg.test(txt)){
                node.textContent = txt.replace(reg,(matched,value)=&gt;{
                    let tpl = this.watcherTask[value] || []
                    tpl.push(new Watcher(node,this,value,type))
                    if(value.split(&apos;.&apos;).length &gt; 1){
                        let v = null
                        value.split(&apos;.&apos;).forEach((val,i)=&gt;{
                            v = !v ? this[val] : v[val]
                        })
                        return v
                    }else{
                        return this[value]
                    }
                })
            }
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Vue</span></span>{
        <span class="hljs-keyword">constructor</span>(options = {}){
            ......
        }
        proxyData(key){
            ......
        }
        observer(data){
            ......
        }
        compile(el){
            <span class="hljs-keyword">var</span> nodes = el.childNodes;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nodes.length; i++) {
                <span class="hljs-keyword">const</span> node = nodes[i];
                <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">3</span>){
                    <span class="hljs-keyword">var</span> text = node.textContent.trim();
                    <span class="hljs-keyword">if</span> (!text) <span class="hljs-keyword">continue</span>;
                    <span class="hljs-keyword">this</span>.compileText(node,<span class="hljs-string">&apos;textContent&apos;</span>)                
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">1</span>){
                    <span class="hljs-keyword">if</span>(node.childNodes.length &gt; <span class="hljs-number">0</span>){
                        <span class="hljs-keyword">this</span>.compile(node)
                    }
                    <span class="hljs-keyword">if</span>(node.hasAttribute(<span class="hljs-string">&apos;v-model&apos;</span>) &amp;&amp; (node.tagName === <span class="hljs-string">&apos;INPUT&apos;</span> || node.tagName === <span class="hljs-string">&apos;TEXTAREA&apos;</span>)){
                        node.addEventListener(<span class="hljs-string">&apos;input&apos;</span>,(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                            <span class="hljs-keyword">let</span> attrVal = node.getAttribute(<span class="hljs-string">&apos;v-model&apos;</span>)
                            <span class="hljs-keyword">this</span>.watcherTask[attrVal].push(<span class="hljs-keyword">new</span> Watcher(node,<span class="hljs-keyword">this</span>,attrVal,<span class="hljs-string">&apos;value&apos;</span>))
                            node.removeAttribute(<span class="hljs-string">&apos;v-model&apos;</span>)
                            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                                <span class="hljs-keyword">this</span>.data[attrVal] = node.value
                            }
                        })())
                    }
                    <span class="hljs-keyword">if</span>(node.hasAttribute(<span class="hljs-string">&apos;v-html&apos;</span>)){
                        <span class="hljs-keyword">let</span> attrVal = node.getAttribute(<span class="hljs-string">&apos;v-html&apos;</span>);
                        <span class="hljs-keyword">this</span>.watcherTask[attrVal].push(<span class="hljs-keyword">new</span> Watcher(node,<span class="hljs-keyword">this</span>,attrVal,<span class="hljs-string">&apos;innerHTML&apos;</span>))
                        node.removeAttribute(<span class="hljs-string">&apos;v-html&apos;</span>)
                    }
                    <span class="hljs-keyword">this</span>.compileText(node,<span class="hljs-string">&apos;innerHTML&apos;</span>)
                    <span class="hljs-keyword">if</span>(node.hasAttribute(<span class="hljs-string">&apos;@click&apos;</span>)){
                        <span class="hljs-keyword">let</span> attrVal = node.getAttribute(<span class="hljs-string">&apos;@click&apos;</span>)
                        node.removeAttribute(<span class="hljs-string">&apos;@click&apos;</span>)
                        node.addEventListener(<span class="hljs-string">&apos;click&apos;</span>,e =&gt; {
                            <span class="hljs-keyword">this</span>.methods[attrVal] &amp;&amp; <span class="hljs-keyword">this</span>.methods[attrVal].bind(<span class="hljs-keyword">this</span>)()
                        })
                    }
                }
            }
        },
        compileText(node,type){
            <span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\{\{(.*?)\}\}/g</span>, txt = node.textContent;
            <span class="hljs-keyword">if</span>(reg.test(txt)){
                node.textContent = txt.replace(reg,(matched,value)=&gt;{
                    <span class="hljs-keyword">let</span> tpl = <span class="hljs-keyword">this</span>.watcherTask[value] || []
                    tpl.push(<span class="hljs-keyword">new</span> Watcher(node,<span class="hljs-keyword">this</span>,value,type))
                    <span class="hljs-keyword">if</span>(value.split(<span class="hljs-string">&apos;.&apos;</span>).length &gt; <span class="hljs-number">1</span>){
                        <span class="hljs-keyword">let</span> v = <span class="hljs-literal">null</span>
                        value.split(<span class="hljs-string">&apos;.&apos;</span>).forEach(<span class="hljs-function">(<span class="hljs-params">val,i</span>)=&gt;</span>{
                            v = !v ? <span class="hljs-keyword">this</span>[val] : v[val]
                        })
                        <span class="hljs-keyword">return</span> v
                    }<span class="hljs-keyword">else</span>{
                        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[value]
                    }
                })
            }
        }
    }</code></pre><p>&#x8FD9;&#x91CC;&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x591A;&#xFF0C;&#x6211;&#x4EEC;&#x62C6;&#x5206;&#x770B;&#x4F60;&#x5C31;&#x4F1A;&#x89C9;&#x5F97;&#x5F88;&#x7B80;&#x5355;&#x4E86;</p><ol><li>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5148;&#x904D;&#x5386;<code>el</code>&#x5143;&#x7D20;&#x4E0B;&#x9762;&#x7684;&#x6240;&#x6709;&#x5B50;&#x8282;&#x70B9;&#xFF0C;<code>node.nodeType === 3</code> &#x7684;&#x610F;&#x601D;&#x662F;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x662F;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;<code>node.nodeType === 1</code> &#x7684;&#x610F;&#x601D;&#x662F;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x662F;&#x5143;&#x7D20;&#x8282;&#x70B9;&#x3002;&#x56E0;&#x4E3A;&#x53EF;&#x80FD;&#x6709;&#x7684;&#x662F;&#x7EAF;&#x6587;&#x672C;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x5982;<code>&#x7EAF;&#x53CC;&#x82B1;&#x62EC;&#x53F7;</code>&#x5C31;&#x662F;&#x7EAF;&#x6587;&#x672C;&#x7684;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5224;&#x65AD;&#x5143;&#x7D20;&#x8282;&#x70B9;&#x662F;&#x5426;&#x8FD8;&#x5B58;&#x5728;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x7684;&#x8BDD;&#x5C31;&#x9012;&#x5F52;&#x8C03;&#x7528;<code>compile</code>&#x65B9;&#x6CD5;&#x3002;&#x4E0B;&#x9762;&#x91CD;&#x5934;&#x620F;&#x6765;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x62C6;&#x5F00;&#x770B;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(node.hasAttribute(&apos;v-html&apos;)){
    let attrVal = node.getAttribute(&apos;v-html&apos;);
    this.watcherTask[attrVal].push(new Watcher(node,this,attrVal,&apos;innerHTML&apos;))
    node.removeAttribute(&apos;v-html&apos;)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(node.hasAttribute(<span class="hljs-string">&apos;v-html&apos;</span>)){
    <span class="hljs-keyword">let</span> attrVal = node.getAttribute(<span class="hljs-string">&apos;v-html&apos;</span>);
    <span class="hljs-keyword">this</span>.watcherTask[attrVal].push(<span class="hljs-keyword">new</span> Watcher(node,<span class="hljs-keyword">this</span>,attrVal,<span class="hljs-string">&apos;innerHTML&apos;</span>))
    node.removeAttribute(<span class="hljs-string">&apos;v-html&apos;</span>)
}</code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x9996;&#x5148;&#x5224;&#x65AD;node&#x8282;&#x70B9;&#x4E0A;&#x662F;&#x5426;&#x6709;<code>v-html</code>&#x8FD9;&#x79CD;&#x6307;&#x4EE4;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x5728;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53D1;&#x5E03;&#x8BA2;&#x9605;&#xFF0C;&#x600E;&#x4E48;&#x53D1;&#x5E03;&#x8BA2;&#x9605;&#x5462;&#xFF1F;&#x53EA;&#x9700;&#x8981;&#x628A;&#x5F53;&#x524D;&#x9700;&#x8981;&#x8BA2;&#x9605;&#x7684;&#x6570;&#x636E;<code>push</code>&#x5230;<code>watcherTask</code>&#x91CC;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x5230;&#x65F6;&#x5019;&#x5728;&#x8BBE;&#x7F6E;&#x503C;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x53EF;&#x4EE5;&#x6279;&#x91CF;&#x66F4;&#x65B0;&#x4E86;&#xFF0C;&#x5B9E;&#x73B0;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x7684;&#x64CD;&#x4F5C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="that.watcherTask[key].forEach(task =&gt; {
    task.update()
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">that.watcherTask[key].forEach(<span class="hljs-function"><span class="hljs-params">task</span> =&gt;</span> {
    task.update()
})</code></pre><p>&#x7136;&#x540E;<code>push</code>&#x7684;&#x503C;&#x662F;&#x4E00;&#x4E2A;<code>Watcher</code>&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x9996;&#x5148;&#x4ED6;new&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x5148;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x6267;&#x884C;&#x7684;&#x64CD;&#x4F5C;&#x5C31;&#x662F;&#x53BB;&#x628A;<code>&#x7EAF;&#x53CC;&#x82B1;&#x62EC;&#x53F7;</code> -&gt; 1&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x628A;&#x6211;&#x4EEC;&#x5199;&#x597D;&#x7684;&#x6A21;&#x677F;&#x6570;&#x636E;&#x66F4;&#x65B0;&#x5230;&#x6A21;&#x677F;&#x89C6;&#x56FE;&#x4E0A;&#x3002;<br>&#x6700;&#x540E;&#x628A;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x5C5E;&#x6027;&#x5254;&#x9664;&#x51FA;&#x53BB;&#xFF0C;&#x6211;&#x4EEC;&#x7528;<code>Vue</code>&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x662F;&#x770B;&#x4E0D;&#x5230;&#x8FD9;&#x79CD;&#x6307;&#x4EE4;&#x7684;&#xFF0C;&#x4E0D;&#x5254;&#x9664;&#x4E5F;&#x4E0D;&#x5F71;&#x54CD;</p><p>&#x81F3;&#x4E8E;<code>Watcher</code>&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x5C31;&#x77E5;&#x9053;&#x4E86;</p><h1 id="articleHeader9">Watcher</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Watcher{
    constructor(el,vm,value,type){
        this.el = el;
        this.vm = vm;
        this.value = value;
        this.type = type;
        this.update()
    }
    update(){
        this.el[this.type] = this.vm.data[this.value]
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span></span>{
    <span class="hljs-keyword">constructor</span>(el,vm,value,type){
        <span class="hljs-keyword">this</span>.el = el;
        <span class="hljs-keyword">this</span>.vm = vm;
        <span class="hljs-keyword">this</span>.value = value;
        <span class="hljs-keyword">this</span>.type = type;
        <span class="hljs-keyword">this</span>.update()
    }
    update(){
        <span class="hljs-keyword">this</span>.el[<span class="hljs-keyword">this</span>.type] = <span class="hljs-keyword">this</span>.vm.data[<span class="hljs-keyword">this</span>.value]
    }
}</code></pre><p>&#x4E4B;&#x524D;&#x53D1;&#x5E03;&#x8BA2;&#x9605;&#x4E4B;&#x540E;&#x8D70;&#x4E86;&#x8FD9;&#x91CC;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x610F;&#x601D;&#x5C31;&#x662F;&#x628A;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x5982;&#xFF1A;node.innerHTML = &apos;&#x8FD9;&#x662F;data&#x91CC;&#x9762;&#x7684;&#x503C;&apos;&#x3001;node.value = &apos;&#x8FD9;&#x4E2A;&#x662F;&#x8868;&#x5355;&#x7684;&#x6570;&#x636E;&apos;</p><p>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x76F4;&#x63A5;&#x53BB;&#x66F4;&#x65B0;&#x5462;&#xFF0C;&#x8FD8;&#x9700;&#x8981;<code>update</code>&#x505A;&#x4EC0;&#x4E48;&#xFF0C;&#x4E0D;&#x662F;&#x591A;&#x6B64;&#x4E00;&#x4E3E;&#x5417;&#xFF1F;<br>&#x5176;&#x5B9E;<code>update</code>&#x8BB0;&#x5F97;&#x5417;&#xFF1F;&#x6211;&#x4EEC;&#x5728;&#x8BA2;&#x9605;&#x6C60;&#x91CC;&#x9762;&#x9700;&#x8981;&#x6279;&#x91CF;&#x66F4;&#x65B0;&#xFF0C;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x8C03;&#x7528;<code>Watcher</code>&#x539F;&#x578B;&#x4E0A;&#x7684;<code>update</code>&#x65B9;&#x6CD5;&#x3002;</p><h1 id="articleHeader10">&#x6548;&#x679C;</h1><p><a href="http://www.wclimb.site/myVue" rel="nofollow noreferrer" target="_blank">&#x5728;&#x7EBF;&#x6548;&#x679C;&#x5730;&#x5740;</a>&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x6D4F;&#x89C8;&#x5668;&#x770B;&#x4E00;&#x4E0B;&#x6548;&#x679C;&#xFF0C;&#x7531;&#x4E8E;&#x672C;&#x4EBA;&#x592A;&#x61D2;&#x4E86;&#xFF0C;<code>gif</code>&#x6548;&#x679C;&#x56FE;&#x5C31;&#x5148;&#x4E0D;&#x653E;&#x4E86;&#xFF0C;&#x54C8;&#x54C8;&#x1F604;&#x1F604;</p><h1 id="articleHeader11">&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h1><p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x653E;&#x5230;<code>github</code>&#x4E0A;&#x4E86; -&gt; <a href="https://github.com/wclimb/MyVue" rel="nofollow noreferrer" target="_blank">MyVue</a></p><h1 id="articleHeader12">&#x53C2;&#x8003;</h1><p><a href="https://segmentfault.com/a/1190000006599500">&#x5256;&#x6790;Vue&#x539F;&#x7406;&amp;&#x5B9E;&#x73B0;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;MVVM</a><br><a href="https://segmentfault.com/a/1190000015375217" target="_blank">&#x4EFF;Vue&#x5B9E;&#x73B0;&#x6781;&#x7B80;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript之实现一个简单的Vue

## 原文链接
[https://segmentfault.com/a/1190000016365102](https://segmentfault.com/a/1190000016365102)

