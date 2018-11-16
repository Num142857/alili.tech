---
title: 解密传统组件间通信与React组件间通信
hidden: true
categories: [reprint]
slug: 5af40378
date: 2018-11-03 02:30:12
---

{{< raw >}}
<p>&#x5728;React&#x4E2D;&#x6700;&#x5C0F;&#x7684;&#x903B;&#x8F91;&#x5355;&#x5143;&#x662F;&#x7EC4;&#x4EF6;&#xFF0C;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x5982;&#x679C;&#x6709;&#x8026;&#x5408;&#x5173;&#x7CFB;&#x5C31;&#x4F1A;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#xFF0C;&#x672C;&#x6587;&#x5C06;&#x4F1A;&#x4ECB;&#x7ECD;React&#x4E2D;&#x7684;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x7684;&#x4E0D;&#x540C;&#x65B9;&#x5F0F;</p><p>&#x901A;&#x8FC7;&#x5F52;&#x7EB3;&#x8303;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x5F52;&#x7C7B;&#x4E3A;&#x56DB;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#xFF0C;&#x5206;&#x522B;&#x662F;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x7237;&#x5B59;&#x7EC4;&#x4EF6;&#xFF0C;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x548C;&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;&#xFF0C;<br>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x524D;&#x4E09;&#x4E2A;&#x4E5F;&#x53EF;&#x4EE5;&#x7B97;&#x4F5C;&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;&#x7684;&#x8303;&#x7574;&#xFF0C;&#x6240;&#x4EE5;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x662F;&#x4E07;&#x80FD;&#x65B9;&#x6CD5;</p><h3 id="articleHeader0">&#x7236;&#x5B50;&#x7EC4;&#x4EF6;</h3><p>&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x5206;&#x4E3A;&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x4E0B;&#x9762;&#x5148;&#x6765;&#x4ECB;&#x7ECD;&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#xFF0C;<br>&#x4F20;&#x7EDF;&#x505A;&#x6CD5;&#x5206;&#x4E3A;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x5206;&#x522B;&#x662F;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x7684;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x548C;&#x5B9E;&#x4F8B;&#x9636;&#x6BB5;&#x7684;&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#xFF0C;&#x4F8B;&#x5B50;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Child {
    constructor(name) {
        // &#x83B7;&#x53D6;dom&#x5F15;&#x7528;
        this.$div = document.querySelector(&apos;#wp&apos;);

        // &#x521D;&#x59CB;&#x5316;&#x65F6;&#x4F20;&#x5165;name
        this.updateName(name);
    }
    updateName(name) {
        // &#x5BF9;&#x5916;&#x63D0;&#x4F9B;&#x66F4;&#x65B0;&#x7684;api
        this.name = name;
    
        // &#x66F4;&#x65B0;dom
        this.$div.innerHTML = name;
    }
}

class Parent {
    constructor() {
        // &#x521D;&#x59CB;&#x5316;&#x9636;&#x6BB5;
        this.child = new Child(&apos;yan&apos;);
        
        setTimeout(() =&gt; {
            // &#x5B9E;&#x4F8B;&#x5316;&#x9636;&#x6BB5;
            this.child.updateName(&apos;hou&apos;);
        }, 2000);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> </span>{
    <span class="hljs-keyword">constructor</span>(name) {
        <span class="hljs-comment">// &#x83B7;&#x53D6;dom&#x5F15;&#x7528;</span>
        <span class="hljs-keyword">this</span>.$div = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#wp&apos;</span>);

        <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x65F6;&#x4F20;&#x5165;name</span>
        <span class="hljs-keyword">this</span>.updateName(name);
    }
    updateName(name) {
        <span class="hljs-comment">// &#x5BF9;&#x5916;&#x63D0;&#x4F9B;&#x66F4;&#x65B0;&#x7684;api</span>
        <span class="hljs-keyword">this</span>.name = name;
    
        <span class="hljs-comment">// &#x66F4;&#x65B0;dom</span>
        <span class="hljs-keyword">this</span>.$div.innerHTML = name;
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x9636;&#x6BB5;</span>
        <span class="hljs-keyword">this</span>.child = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;yan&apos;</span>);
        
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;&#x9636;&#x6BB5;</span>
            <span class="hljs-keyword">this</span>.child.updateName(<span class="hljs-string">&apos;hou&apos;</span>);
        }, <span class="hljs-number">2000</span>);
    }
}</code></pre><p>&#x5728;React&#x4E2D;&#x5C06;&#x4E24;&#x4E2A;&#x60C5;&#x51B5;&#x7EDF;&#x4E00;&#x5904;&#x7406;&#xFF0C;&#x5168;&#x90E8;&#x901A;&#x8FC7;&#x5C5E;&#x6027;&#x6765;&#x5B8C;&#x6210;&#xFF0C;&#x4E4B;&#x6240;&#x4EE5;&#x80FD;&#x591F;&#x8FD9;&#x6837;&#x662F;&#x56E0;&#x4E3A;React&#x5728;&#x5C5E;&#x6027;&#x66F4;&#x65B0;&#x65F6;&#x4F1A;&#x81EA;&#x52A8;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;<br>&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;2&#x79D2;&#x540E;&#x5B50;&#x7EC4;&#x4EF6;&#x4F1A;&#x81EA;&#x52A8;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x5E76;&#x83B7;&#x53D6;&#x65B0;&#x7684;&#x5C5E;&#x6027;&#x503C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Child extends Component {
    render() {
        return &lt;div&gt;{this.props.name}&lt;/div&gt;
    }
}

class Parent extends Component {
    constructor() {
        // &#x521D;&#x59CB;&#x5316;&#x9636;&#x6BB5;
        this.state = {name: &apos;yan&apos;};

        setTimeout(() =&gt; {
            // &#x5B9E;&#x4F8B;&#x5316;&#x9636;&#x6BB5;
            this.setState({name: &apos;hou&apos;})
        }, 2000);
    }
    render() {
        return &lt;Child name={this.state.name} /&gt;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.name}&lt;/div&gt;
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor() {
        <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x9636;&#x6BB5;</span>
        <span class="hljs-keyword">this</span>.state = {name: <span class="hljs-symbol">&apos;ya</span>n&apos;};

        setTimeout(() =&gt; {
            <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;&#x9636;&#x6BB5;</span>
            <span class="hljs-keyword">this</span>.setState({name: <span class="hljs-symbol">&apos;ho</span>u&apos;})
        }, <span class="hljs-number">2000</span>);
    }
    render() {
        <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Child</span> name={<span class="hljs-keyword">this</span>.state.name} /&gt;
    }
}</code></pre><p>&#x4E0B;&#x9762;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x5B50;&#x7EC4;&#x4EF6;&#x5982;&#x4F55;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#xFF0C;&#x4F20;&#x7EDF;&#x505A;&#x6CD5;&#x6709;&#x4E24;&#x79CD;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x53E6;&#x4E00;&#x79CD;&#x662F;&#x4E3A;&#x5B50;&#x7EC4;&#x4EF6;&#x90E8;&#x7F72;&#x6D88;&#x606F;&#x63A5;&#x53E3;</p><p>&#x5148;&#x6765;&#x770B;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x4F18;&#x70B9;&#x662F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x7F3A;&#x70B9;&#x5C31;&#x662F;&#x5FC5;&#x987B;&#x5728;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F20;&#x5165;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x53EF;&#x64A4;&#x56DE;&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x80FD;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Child {
    constructor(cb) {
        // &#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x5165;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x53D1;&#x9001;&#x6D88;&#x606F;
        setTimeout(() =&gt; { cb() }, 2000);
    }
}

class Parent {
    constructor() {
        // &#x521D;&#x59CB;&#x5316;&#x9636;&#x6BB5;&#xFF0C;&#x4F20;&#x5165;&#x56DE;&#x8C03;&#x51FD;&#x6570;
        this.child = new Child(function () {
            console.log(&apos;child update&apos;)
        });
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> </span>{
    <span class="hljs-keyword">constructor</span>(cb) {
        <span class="hljs-comment">// &#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x5165;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x53D1;&#x9001;&#x6D88;&#x606F;</span>
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { cb() }, <span class="hljs-number">2000</span>);
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x9636;&#x6BB5;&#xFF0C;&#x4F20;&#x5165;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
        <span class="hljs-keyword">this</span>.child = <span class="hljs-keyword">new</span> Child(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;child update&apos;</span>)
        });
    }
}
</code></pre><p>&#x4E0B;&#x9762;&#x6765;&#x770B;&#x770B;&#x6D88;&#x606F;&#x63A5;&#x53E3;&#x65B9;&#x6CD5;&#xFF0C;&#x9996;&#x5148;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x53D1;&#x5E03;&#x548C;&#x8BA2;&#x9605;&#x6D88;&#x606F;&#x7684;&#x57FA;&#x7C7B;&#xFF0C;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;<code>EventEimtter</code>&#xFF0C;&#x5B9E;&#x9645;&#x751F;&#x4EA7;&#x4E2D;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x522B;&#x4EBA;&#x5199;&#x597D;&#x7684;&#x7C7B;&#x5E93;&#xFF0C;&#x6BD4;&#x5982;<a href="https://github.com/jsmini/event" rel="nofollow noreferrer" target="_blank">@jsmini/event</a>&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x7EE7;&#x627F;&#x6D88;&#x606F;&#x57FA;&#x7C7B;&#xFF0C;&#x5C31;&#x6709;&#x4E86;&#x53D1;&#x5E03;&#x6D88;&#x606F;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x7136;&#x540E;&#x7236;&#x7EC4;&#x4EF6;&#x8BA2;&#x9605;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6D88;&#x606F;&#xFF0C;&#x5373;&#x53EF;&#x5B9E;&#x73B0;&#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x7684;&#x529F;&#x80FD;</p><p>&#x6D88;&#x606F;&#x63A5;&#x53E3;&#x7684;&#x4F18;&#x70B9;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x968F;&#x5904;&#x8BA2;&#x9605;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x591A;&#x6B21;&#x8BA2;&#x9605;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x53D6;&#x6D88;&#x8BA2;&#x9605;&#xFF0C;&#x7F3A;&#x70B9;&#x662F;&#x7565;&#x663E;&#x9EBB;&#x70E6;&#xFF0C;&#x9700;&#x8981;&#x5F15;&#x5165;&#x6D88;&#x606F;&#x57FA;&#x7C7B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6D88;&#x606F;&#x63A5;&#x53E3;&#xFF0C;&#x8BA2;&#x9605;&#x53D1;&#x5E03;&#x6A21;&#x5F0F;&#xFF0C;&#x7C7B;&#x4F3C;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;
class EventEimtter {
    constructor() {
        this.eventMap = {};
    }
    sub(name, cb) {
        const eventList = this.eventMap[name] = this.eventMap[name] || {};
        eventList.push(cb);
    }
    pub(name, ...data) {
        (this.eventMap[name] || []).forEach(cb =&gt; cb(...data));
    }
}

class Child extends EventEimtter {
    constructor() {
        super();
        // &#x901A;&#x8FC7;&#x6D88;&#x606F;&#x63A5;&#x53E3;&#x53D1;&#x5E03;&#x6D88;&#x606F;
        setTimeout(() =&gt; { this.pub(&apos;update&apos;) }, 2000);
    }
}

class Parent {
    constructor() {
        // &#x521D;&#x59CB;&#x5316;&#x9636;&#x6BB5;&#xFF0C;&#x4F20;&#x5165;&#x56DE;&#x8C03;&#x51FD;&#x6570;
        this.child = new Child();
        
        // &#x8BA2;&#x9605;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6D88;&#x606F;
        this.child.sub(&apos;update&apos;, function () {
            console.log(&apos;child update&apos;)
        });
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x6D88;&#x606F;&#x63A5;&#x53E3;&#xFF0C;&#x8BA2;&#x9605;&#x53D1;&#x5E03;&#x6A21;&#x5F0F;&#xFF0C;&#x7C7B;&#x4F3C;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EventEimtter</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.eventMap = {};
    }
    sub(name, cb) {
        <span class="hljs-keyword">const</span> eventList = <span class="hljs-keyword">this</span>.eventMap[name] = <span class="hljs-keyword">this</span>.eventMap[name] || {};
        eventList.push(cb);
    }
    pub(name, ...data) {
        (<span class="hljs-keyword">this</span>.eventMap[name] || []).forEach(<span class="hljs-function"><span class="hljs-params">cb</span> =&gt;</span> cb(...data));
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">EventEimtter</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-comment">// &#x901A;&#x8FC7;&#x6D88;&#x606F;&#x63A5;&#x53E3;&#x53D1;&#x5E03;&#x6D88;&#x606F;</span>
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-keyword">this</span>.pub(<span class="hljs-string">&apos;update&apos;</span>) }, <span class="hljs-number">2000</span>);
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x9636;&#x6BB5;&#xFF0C;&#x4F20;&#x5165;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
        <span class="hljs-keyword">this</span>.child = <span class="hljs-keyword">new</span> Child();
        
        <span class="hljs-comment">// &#x8BA2;&#x9605;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6D88;&#x606F;</span>
        <span class="hljs-keyword">this</span>.child.sub(<span class="hljs-string">&apos;update&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;child update&apos;</span>)
        });
    }
}
</code></pre><p>Backbone.js&#x5C31;&#x540C;&#x65F6;&#x652F;&#x6301;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x548C;&#x6D88;&#x606F;&#x63A5;&#x53E3;&#x65B9;&#x5F0F;&#xFF0C;&#x4F46;React&#x4E2D;&#x9009;&#x62E9;&#x4E86;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6A21;&#x5F0F;&#xFF0C;&#x4E0B;&#x9762;&#x6765;&#x770B;&#x4E00;&#x4E0B;React&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Child extends Component {
    constructor(props) {
        setTimeout(() =&gt; { this.props.cb() }, 2000);
    }
    render() {
        return &lt;div&gt;&lt;/div&gt;
    }
}

class Parent extends Component {
    render() {
        return &lt;Child cb={() =&gt; {console.log(&apos;update&apos;)}} /&gt;
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        setTimeout(() =&gt; { <span class="hljs-keyword">this</span>.props.cb() }, <span class="hljs-number">2000</span>);
    }
    render() {
        <span class="hljs-keyword">return</span> &lt;div&gt;&lt;/div&gt;
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Child</span> cb={() =&gt; {console.log(<span class="hljs-symbol">&apos;updat</span>e&apos;)}} /&gt;
    }
}
</code></pre><h3 id="articleHeader1">&#x7237;&#x5B59;&#x7EC4;&#x4EF6;</h3><p>&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x7B97;&#x662F;&#x7237;&#x5B59;&#x7EC4;&#x4EF6;&#x7684;&#x4E00;&#x79CD;&#x7279;&#x4F8B;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x7237;&#x5B59;&#x7EC4;&#x4EF6;&#x4E0D;&#x5149;&#x6307;&#x7237;&#x7237;&#x548C;&#x5B59;&#x5B50;&#xFF0C;&#x800C;&#x662F;&#x6CDB;&#x6307;&#x7956;&#x5148;&#x4E0E;&#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#xFF0C;&#x53EF;&#x80FD;&#x9694;&#x7740;&#x5F88;&#x591A;&#x5C42;&#x7EA7;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6839;&#x636E;&#x5316;&#x5F52;&#x6CD5;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x5F97;&#x51FA;&#x7237;&#x5B59;&#x7EC4;&#x4EF6;&#x7684;&#x7B54;&#x6848;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x5C42;&#x5C42;&#x4F20;&#x9012;&#x5C5E;&#x6027;&#x4E48;&#xFF0C;&#x628A;&#x7237;&#x5B59;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x5206;&#x89E3;&#x4E3A;&#x591A;&#x4E2A;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x7684;&#x95EE;&#x9898;</p><p>&#x5C42;&#x5C42;&#x4F20;&#x9012;&#x7684;&#x4F18;&#x70B9;&#x662F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x7528;&#x5DF2;&#x6709;&#x77E5;&#x8BC6;&#x5C31;&#x80FD;&#x89E3;&#x51B3;&#xFF0C;&#x95EE;&#x9898;&#x662F;&#x4F1A;&#x6D6A;&#x8D39;&#x5F88;&#x591A;&#x4EE3;&#x7801;&#xFF0C;&#x975E;&#x5E38;&#x7E41;&#x7410;&#xFF0C;&#x4E2D;&#x95F4;&#x4F5C;&#x4E3A;&#x6865;&#x6881;&#x7684;&#x7EC4;&#x4EF6;&#x4F1A;&#x5F15;&#x5165;&#x5F88;&#x591A;&#x4E0D;&#x5C5E;&#x4E8E;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;</p><p>&#x5728;React&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;context&#x53EF;&#x4EE5;&#x8BA9;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x76F4;&#x63A5;&#x628A;&#x5C5E;&#x6027;&#x4F20;&#x9012;&#x5230;&#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#xFF0C;&#x6709;&#x70B9;&#x7C7B;&#x4F3C;&#x661F;&#x9645;&#x65C5;&#x884C;&#x4E2D;&#x7684;&#x866B;&#x6D1E;&#x4E00;&#x6837;&#xFF0C;&#x901A;&#x8FC7;context&#x8FD9;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x6865;&#x6881;&#xFF0C;&#x53EF;&#x4EE5;&#x8DE8;&#x8D8A;&#x4EFB;&#x610F;&#x5C42;&#x6B21;&#x5411;&#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6D88;&#x606F;</p><p>&#x600E;&#x4E48;&#x5728;&#x9700;&#x8981;&#x901A;&#x4FE1;&#x7684;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x5F00;&#x542F;&#x8FD9;&#x4E2A;&#x866B;&#x6D1E;&#x5462;&#xFF1F;&#x9700;&#x8981;&#x53CC;&#x5411;&#x58F0;&#x660E;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5728;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x5728;&#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#x4E0A;&#x518D;&#x6B21;&#x58F0;&#x660E;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x4E0A;&#x653E;&#x4E0A;&#x5C5E;&#x6027;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#x8BFB;&#x53D6;&#x5C5E;&#x6027;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import PropTypes from &apos;prop-types&apos;;

class Child extends Component {
    // &#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x9700;&#x8981;&#x8BFB;&#x53D6;context&#x4E0A;&#x7684;&#x6570;&#x636E;
    static contextTypes = {
        text: PropTypes.string
    }
    render() {
        // &#x901A;&#x8FC7;this.context &#x8BFB;&#x53D6;context&#x4E0A;&#x7684;&#x6570;&#x636E;
        return &lt;div&gt;{this.context.text}&lt;/div&gt;
    }
}


class Ancestor extends Component {
    // &#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x9700;&#x8981;&#x653E;&#x5165;context&#x4E0A;&#x7684;&#x6570;&#x636E;
    static childContextTypes = {
        text: PropTypes.string
    }
    // &#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x5F80;context&#x653E;&#x5165;&#x6570;&#x636E;
    getChildContext() {
        return {text: &apos;yanhaijing&apos;}
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">PropTypes</span> from <span class="hljs-symbol">&apos;prop</span>-types&apos;;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// &#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x9700;&#x8981;&#x8BFB;&#x53D6;context&#x4E0A;&#x7684;&#x6570;&#x636E;</span>
    static contextTypes = {
        text: <span class="hljs-type">PropTypes</span>.string
    }
    render() {
        <span class="hljs-comment">// &#x901A;&#x8FC7;this.context &#x8BFB;&#x53D6;context&#x4E0A;&#x7684;&#x6570;&#x636E;</span>
        <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.context.text}&lt;/div&gt;
    }
}


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Ancestor</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// &#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x9700;&#x8981;&#x653E;&#x5165;context&#x4E0A;&#x7684;&#x6570;&#x636E;</span>
    static childContextTypes = {
        text: <span class="hljs-type">PropTypes</span>.string
    }
    <span class="hljs-comment">// &#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x5F80;context&#x653E;&#x5165;&#x6570;&#x636E;</span>
    getChildContext() {
        <span class="hljs-keyword">return</span> {text: <span class="hljs-symbol">&apos;yanhaijin</span>g&apos;}
    }
}</code></pre><p>context&#x7684;&#x4F18;&#x70B9;&#x662F;&#x53EF;&#x4EE5;&#x7701;&#x53BB;&#x5C42;&#x5C42;&#x4F20;&#x9012;&#x7684;&#x9EBB;&#x70E6;&#xFF0C;&#x5E76;&#x4E14;&#x901A;&#x8FC7;&#x53CC;&#x5411;&#x58F0;&#x660E;&#x63A7;&#x5236;&#x4E86;&#x6570;&#x636E;&#x7684;&#x53EF;&#x89C1;&#x6027;&#xFF0C;&#x5BF9;&#x4E8E;&#x5C42;&#x6570;&#x5F88;&#x591A;&#x65F6;&#xFF0C;&#x4E0D;&#x5931;&#x4E3A;&#x4E00;&#x79CD;&#x65B9;&#x6848;&#xFF1B;&#x4F46;&#x7F3A;&#x70B9;&#x4E5F;&#x5F88;&#x660E;&#x663E;&#xFF0C;&#x5C31;&#x50CF;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E00;&#x6837;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x52A0;&#x8282;&#x5236;&#x5F88;&#x5BB9;&#x6613;&#x9020;&#x6210;&#x6DF7;&#x4E71;&#xFF0C;&#x800C;&#x4E14;&#x4E5F;&#x5BB9;&#x6613;&#x51FA;&#x73B0;&#x91CD;&#x540D;&#x8986;&#x76D6;&#x7684;&#x95EE;&#x9898;</p><p>&#x4E2A;&#x4EBA;&#x7684;&#x5EFA;&#x8BAE;&#x662F;&#x5BF9;&#x4E00;&#x4E9B;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x5171;&#x4EAB;&#x7684;&#x53EA;&#x8BFB;&#x4FE1;&#x606F;&#x53EF;&#x4EE5;&#x91C7;&#x7528;context&#x6765;&#x4F20;&#x9012;&#xFF0C;&#x6BD4;&#x5982;&#x767B;&#x5F55;&#x7684;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x7B49;</p><p><em>&#x5C0F;&#x8D34;&#x58EB;&#xFF1A;React Router&#x8DEF;&#x7531;&#x5C31;&#x662F;&#x901A;&#x8FC7;context&#x6765;&#x4F20;&#x9012;&#x8DEF;&#x7531;&#x5C5E;&#x6027;&#x7684;</em></p><h3 id="articleHeader2">&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;</h3><p>&#x5982;&#x679C;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x662F;&#x5144;&#x5F1F;&#x5173;&#x7CFB;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7236;&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;&#x6865;&#x6881;&#xFF0C;&#x6765;&#x8BA9;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x901A;&#x4FE1;&#xFF0C;&#x8FD9;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E3B;&#x6A21;&#x5757;&#x6A21;&#x5F0F;</p><p>&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x4E24;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x7236;&#x7EC4;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#x663E;&#x793A;&#x6570;&#x5B57;&#x540C;&#x6B65;&#x7684;&#x529F;&#x80FD;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Parent extends Component {
    constructor() {
        this.onChange = function (num) {
            this.setState({num})
        }.bind(this);
    }
    render() {
        return (
            &lt;div&gt;
                &lt;Child1 num={this.state.num} onChange={this.onChange}&gt;
                &lt;Child2 num={this.state.num} onChange={this.onChange}&gt;
            &lt;/div&gt;
        );
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor() {
        <span class="hljs-keyword">this</span>.onChange = function (num) {
            <span class="hljs-keyword">this</span>.setState({num})
        }.bind(<span class="hljs-keyword">this</span>);
    }
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;<span class="hljs-type">Child1</span> num={<span class="hljs-keyword">this</span>.state.num} onChange={<span class="hljs-keyword">this</span>.onChange}&gt;
                &lt;<span class="hljs-type">Child2</span> num={<span class="hljs-keyword">this</span>.state.num} onChange={<span class="hljs-keyword">this</span>.onChange}&gt;
            &lt;/div&gt;
        );
    }
}</code></pre><p>&#x4E3B;&#x6A21;&#x5757;&#x6A21;&#x5F0F;&#x7684;&#x4F18;&#x70B9;&#x5C31;&#x662F;&#x89E3;&#x8026;&#xFF0C;&#x628A;&#x4E24;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x8026;&#x5408;&#x5173;&#x7CFB;&#xFF0C;&#x89E3;&#x8026;&#x6210;&#x5B50;&#x7EC4;&#x4EF6;&#x548C;&#x7236;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x8026;&#x5408;&#xFF0C;&#x628A;&#x5206;&#x6563;&#x7684;&#x4E1C;&#x897F;&#x6536;&#x96C6;&#x5728;&#x4E00;&#x8D77;&#x597D;&#x5904;&#x975E;&#x5E38;&#x660E;&#x663E;&#xFF0C;&#x80FD;&#x5E26;&#x6765;&#x66F4;&#x597D;&#x7684;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x548C;&#x53EF;&#x6269;&#x5C55;&#x6027;</p><h3 id="articleHeader3">&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;</h3><p>&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;&#x5305;&#x62EC;&#x4E0A;&#x9762;&#x7684;&#x4E09;&#x79CD;&#x5173;&#x7CFB;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E0A;&#x9762;&#x4E09;&#x79CD;&#x5173;&#x7CFB;&#x5E94;&#x8BE5;&#x4F18;&#x5148;&#x4F7F;&#x7528;&#x4E0A;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5BF9;&#x4E8E;&#x4EFB;&#x610F;&#x7684;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#xFF0C;&#x603B;&#x5171;&#x6709;&#x4E09;&#x79CD;&#x529E;&#x6CD5;&#xFF0C;&#x5206;&#x522B;&#x662F;&#x5171;&#x540C;&#x7956;&#x5148;&#x6CD5;&#xFF0C;&#x6D88;&#x606F;&#x4E2D;&#x95F4;&#x4EF6;&#x548C;&#x72B6;&#x6001;&#x7BA1;&#x7406;</p><p>&#x57FA;&#x4E8E;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x7237;&#x5B59;&#x7EC4;&#x4EF6;&#x548C;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EA;&#x8981;&#x627E;&#x5230;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x5171;&#x540C;&#x7956;&#x5148;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5C06;&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#xFF0C;&#x8F6C;&#x5316;&#x4E3A;&#x4EFB;&#x610F;&#x7EC4;&#x4EF6;&#x548C;&#x5171;&#x540C;&#x7956;&#x5148;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x597D;&#x5904;&#x5C31;&#x662F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5DF2;&#x77E5;&#x77E5;&#x8BC6;&#x5C31;&#x80FD;&#x641E;&#x5B9A;&#xFF0C;&#x7F3A;&#x70B9;&#x5C31;&#x662F;&#x4E0A;&#x9762;&#x4E24;&#x79CD;&#x6A21;&#x5F0F;&#x7F3A;&#x70B9;&#x7684;&#x53E0;&#x52A0;&#xFF0C;&#x9664;&#x4E86;&#x4E34;&#x65F6;&#x65B9;&#x6848;&#xFF0C;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;</p><p>&#x53E6;&#x4E00;&#x79CD;&#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x6D88;&#x606F;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5C31;&#x662F;&#x5F15;&#x5165;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x6D88;&#x606F;&#x5DE5;&#x5177;&#xFF0C;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5168;&#x5C40;&#x5DE5;&#x5177;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#xFF0C;&#x8FD9;&#x6837;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#xFF0C;&#x5C31;&#x901A;&#x8FC7;&#x5168;&#x5C40;&#x6D88;&#x606F;&#x5A92;&#x4ECB;&#x5B8C;&#x6210;&#x4E86;</p><p>&#x8FD8;&#x8BB0;&#x5F97;&#x4E0A;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x6D88;&#x606F;&#x57FA;&#x7C7B;&#x5417;&#xFF1F;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x7EC4;&#x4EF6;1&#x548C;&#x7EC4;&#x4EF6;2&#x901A;&#x8FC7;&#x5168;&#x5C40;event&#x8FDB;&#x884C;&#x901A;&#x4FE1;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EventEimtter {
    constructor() {
        this.eventMap = {};
    }
    sub(name, cb) {
        const eventList = this.eventMap[name] = this.eventMap[name] || {};
        eventList.push(cb);
    }
    pub(name, ...data) {
        (this.eventMap[name] || []).forEach(cb =&gt; cb(...data));
    }
}

// &#x5168;&#x5C40;&#x6D88;&#x606F;&#x5DE5;&#x5177;
const event = new EventEimtter;

// &#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;
class Element1 extends Component {
    constructor() {
        // &#x8BA2;&#x9605;&#x6D88;&#x606F;
        event.sub(&apos;element2update&apos;, () =&gt; {console.log(&apos;element2 update&apos;)});
    }
}

// &#x53E6;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;
class Element2 extends Component {
    constructor() {
        // &#x53D1;&#x5E03;&#x6D88;&#x606F;
        setTimeout(function () { event.pub(&apos;element2update&apos;) }, 2000)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EventEimtter</span> </span>{
    constructor() {
        <span class="hljs-keyword">this</span>.eventMap = {};
    }
    sub(name, cb) {
        const eventList = <span class="hljs-keyword">this</span>.eventMap[name] = <span class="hljs-keyword">this</span>.eventMap[name] || {};
        eventList.push(cb);
    }
    pub(name, ...data) {
        (<span class="hljs-keyword">this</span>.eventMap[name] || []).forEach(cb =&gt; cb(...data));
    }
}

<span class="hljs-comment">// &#x5168;&#x5C40;&#x6D88;&#x606F;&#x5DE5;&#x5177;</span>
const event = <span class="hljs-keyword">new</span> <span class="hljs-type">EventEimtter</span>;

<span class="hljs-comment">// &#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Element1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor() {
        <span class="hljs-comment">// &#x8BA2;&#x9605;&#x6D88;&#x606F;</span>
        event.sub(<span class="hljs-symbol">&apos;element2updat</span>e&apos;, () =&gt; {console.log(<span class="hljs-symbol">&apos;element2</span> update&apos;)});
    }
}

<span class="hljs-comment">// &#x53E6;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Element2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor() {
        <span class="hljs-comment">// &#x53D1;&#x5E03;&#x6D88;&#x606F;</span>
        setTimeout(function () { event.pub(<span class="hljs-symbol">&apos;element2updat</span>e&apos;) }, <span class="hljs-number">2000</span>)
    }
}</code></pre><p>&#x6D88;&#x606F;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x6A21;&#x5F0F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5229;&#x7528;&#x4E86;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#xFF0C;&#x5C06;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x8026;&#x5408;&#x89E3;&#x8026;&#x6210;&#x4E86;&#x7EC4;&#x4EF6;&#x548C;&#x6D88;&#x606F;&#x4E2D;&#x5FC3;+&#x6D88;&#x606F;&#x540D;&#x79F0;&#x7684;&#x8026;&#x5408;&#xFF0C;&#x4F46;&#x4E3A;&#x4E86;&#x89E3;&#x8026;&#x5374;&#x5F15;&#x5165;&#x5168;&#x5C40;&#x6D88;&#x606F;&#x4E2D;&#x5FC3;&#x548C;&#x6D88;&#x606F;&#x540D;&#x79F0;&#xFF0C;&#x6D88;&#x606F;&#x4E2D;&#x5FC3;&#x5BF9;&#x7EC4;&#x4EF6;&#x7684;&#x4FB5;&#x5165;&#x6027;&#x5F88;&#x5F3A;&#xFF0C;&#x548C;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;</p><p>&#x5C0F;&#x578B;&#x9879;&#x76EE;&#x6BD4;&#x8F83;&#x9002;&#x5408;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x4F46;&#x968F;&#x7740;&#x9879;&#x76EE;&#x89C4;&#x6A21;&#x7684;&#x6269;&#x5927;&#xFF0C;&#x8FBE;&#x5230;&#x4E2D;&#x7B49;&#x9879;&#x76EE;&#x4EE5;&#x540E;&#xFF0C;&#x6D88;&#x606F;&#x540D;&#x5B57;&#x7206;&#x70B8;&#x5F0F;&#x589E;&#x957F;&#xFF0C;&#x6D88;&#x606F;&#x540D;&#x5B57;&#x7684;&#x7EF4;&#x62A4;&#x6210;&#x4E86;&#x68D8;&#x624B;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x91CD;&#x540D;&#x6982;&#x7387;&#x6781;&#x5927;&#xFF0C;&#x6CA1;&#x6709;&#x4EBA;&#x6562;&#x968F;&#x4FBF;&#x5220;&#x9664;&#x6D88;&#x606F;&#x4FE1;&#x606F;&#xFF0C;&#x6D88;&#x606F;&#x7684;&#x53D1;&#x5E03;&#x8005;&#x627E;&#x4E0D;&#x5230;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x8005;&#x7684;&#x4FE1;&#x606F;&#x7B49;</p><p>&#x5176;&#x5B9E;&#x4E0A;&#x9762;&#x7684;&#x95EE;&#x9898;&#x4E5F;&#x4E0D;&#x662F;&#x6CA1;&#x6709;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF0C;&#x91CD;&#x540D;&#x7684;&#x95EE;&#x9898;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5236;&#x5B9A;&#x89C4;&#x8303;&#xFF0C;&#x6D88;&#x606F;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7B49;&#x65B9;&#x5F0F;&#x6765;&#x6781;&#x5927;&#x964D;&#x4F4E;&#x51B2;&#x7A81;&#xFF0C;&#x5176;&#x4ED6;&#x95EE;&#x9898;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x628A;&#x6D88;&#x606F;&#x540D;&#x5B57;&#x7EDF;&#x4E00;&#x7EF4;&#x62A4;&#x5230;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x901A;&#x8FC7;&#x5BF9;&#x6D88;&#x606F;&#x7684;&#x4E2D;&#x5FC3;&#x5316;&#x7BA1;&#x7406;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x5F88;&#x591A;&#x95EE;&#x9898;&#x90FD;&#x5F88;&#x5BB9;&#x6613;&#x89E3;&#x51B3;</p><p>&#x5982;&#x679C;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x975E;&#x5E38;&#x5927;&#xFF0C;&#x4E0A;&#x9762;&#x4E24;&#x79CD;&#x65B9;&#x6848;&#x90FD;&#x4E0D;&#x5408;&#x9002;&#xFF0C;&#x90A3;&#x4F60;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x901A;&#x8FC7;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#x628A;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x548C;&#x5173;&#x7CFB;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;&#x4ECE;&#x7EC4;&#x5EFA;&#x4E2D;&#x62BD;&#x8C61;&#x51FA;&#x6765;&#xFF0C;&#x5E76;&#x96C6;&#x4E2D;&#x5316;&#x5230;&#x7EDF;&#x4E00;&#x7684;&#x5730;&#x65B9;&#x6765;&#x5904;&#x7406;&#xFF0C;Redux&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x4E0D;&#x9519;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;</p><p>&#x9664;&#x4E86;Redux&#xFF0C;&#x8FD8;&#x6709;Mobx&#xFF0C;Rematch&#xFF0C;reselect&#x7B49;&#x5DE5;&#x5177;&#xFF0C;&#x672C;&#x6587;&#x4E0D;&#x5C55;&#x5F00;&#x4ECB;&#x7ECD;&#xFF0C;&#x6709;&#x673A;&#x4F1A;&#x540E;&#x9762;&#x5355;&#x72EC;&#x6210;&#x6587;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x7528;&#x6765;&#x89E3;&#x51B3;&#x4E0D;&#x540C;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x53EA;&#x8981;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x573A;&#x666F;&#x9009;&#x62E9;&#x5408;&#x9002;&#x7684;&#x5DE5;&#x5177;&#x5C31;&#x597D;&#x4E86;</p><h3 id="articleHeader4">&#x603B;&#x7ED3;</h3><p>&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x5343;&#x53D8;&#x4E07;&#x5316;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x7528;&#x4E0A;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x65B9;&#x6CD5;&#x89E3;&#x51B3;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E0D;&#x540C;&#x89C4;&#x6A21;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x5E94;&#x8BE5;&#x9009;&#x62E9;&#x9002;&#x5408;&#x81EA;&#x5DF1;&#x7684;&#x6280;&#x672F;&#x65B9;&#x6848;&#xFF0C;&#x4E0A;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x4E0D;&#x540C;&#x65B9;&#x5F0F;&#x89E3;&#x8026;&#x7684;&#x7A0B;&#x5EA6;&#x662F;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x5173;&#x4E8E;&#x4E0D;&#x540C;&#x8026;&#x5408;&#x5173;&#x7CFB;&#x7684;&#x597D;&#x574F;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x6211;&#x4E4B;&#x524D;&#x7684;&#x6587;&#x7AE0;&#x300A;<a href="http://yanhaijing.com/program/2016/09/01/about-coupling/" rel="nofollow noreferrer" target="_blank">&#x56FE;&#x89E3;7&#x79CD;&#x8026;&#x5408;&#x5173;&#x7CFB;</a>&#x300B;</p><p>&#x672C;&#x6587;&#x8282;&#x9009;&#x81EA;&#x6211;&#x7684;&#x65B0;&#x4E66;&#x300A;React &#x72B6;&#x6001;&#x7BA1;&#x7406;&#x4E0E;&#x540C;&#x6784;&#x5B9E;&#x6218;&#x300B;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x9605;&#x8BFB;&#x672C;&#x4E66;&#xFF0C;&#x8FD9;&#x672C;&#x4E66;&#x7531;&#x6211;&#x548C;&#x524D;&#x7AEF;&#x81EA;&#x8EAB;&#x6280;&#x672F;&#x4FAF;&#x7B56;&#x5408;&#x529B;&#x6253;&#x78E8;&#xFF0C;&#x51DD;&#x7ED3;&#x4E86;&#x6211;&#x4EEC;&#x5728;&#x5B66;&#x4E60;&#x3001;&#x5B9E;&#x8DF5; React &#x6846;&#x67B6;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x79EF;&#x7D2F;&#x548C;&#x5FC3;&#x5F97;&#x3002;&#x9664;&#x4E86; React &#x6846;&#x67B6;&#x4F7F;&#x7528;&#x4ECB;&#x7ECD;&#x4EE5;&#x5916;&#xFF0C;&#x7740;&#x91CD;&#x5256;&#x6790;&#x4E86;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x4EE5;&#x53CA;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x540C;&#x6784;&#x5E94;&#x7528;&#x65B9;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x540C;&#x65F6;&#x5438;&#x53D6;&#x4E86;&#x793E;&#x533A;&#x5927;&#x91CF;&#x4F18;&#x79C0;&#x601D;&#x60F3;&#xFF0C;&#x8FDB;&#x884C;&#x5F52;&#x7EB3;&#x6BD4;&#x5BF9;&#x3002;</p><p>&#x672C;&#x4E66;&#x53D7;&#x5230;&#x767E;&#x5EA6;&#x516C;&#x53F8;&#x526F;&#x603B;&#x88C1;&#x6C88;&#x6296;&#x3001;&#x767E;&#x5EA6;&#x9AD8;&#x7EA7;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;<a href="https://www.zhihu.com/people/dong-rui-24/activities" rel="nofollow noreferrer" target="_blank">&#x8463;&#x777F;</a>&#xFF0C;&#x4EE5;&#x53CA;&#x77E5;&#x540D;JavaScript&#x8BED;&#x8A00;&#x4E13;&#x5BB6;<a href="http://www.ruanyifeng.com/home.html" rel="nofollow noreferrer" target="_blank">&#x962E;&#x4E00;&#x5CF0;</a>&#x3001;Node.js&#x5E03;&#x9053;&#x8005;<a href="https://www.zhihu.com/people/i5ting/activities" rel="nofollow noreferrer" target="_blank">&#x72FC;&#x53D4;</a>&#x3001;Flarum&#x4E2D;&#x6587;&#x793E;&#x533A;&#x521B;&#x59CB;&#x4EBA; <a href="http://justjavac.com/" rel="nofollow noreferrer" target="_blank">justjavac</a>&#x3001;&#x65B0;&#x6D6A;&#x79FB;&#x52A8;&#x524D;&#x7AEF;&#x6280;&#x672F;&#x4E13;&#x5BB6;<a href="https://www.zhihu.com/people/xiao-jue-83/activities" rel="nofollow noreferrer" target="_blank">&#x5C0F;&#x721D;</a>&#x3001;&#x77E5;&#x4E4E;&#x77E5;&#x540D;&#x535A;&#x4E3B;<a href="https://www.zhihu.com/people/justineo/activities" rel="nofollow noreferrer" target="_blank">&#x987E;&#x8F76;&#x7075;</a>&#x7B49;&#x524D;&#x7AEF;&#x5708;&#x4F17;&#x591A;&#x4E13;&#x5BB6;&#x5927;&#x5496;&#x7684;&#x8054;&#x5408;&#x529B;&#x8350;&#x3002;</p><p>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x8BFB;&#x8005;&#x53EF;&#x4EE5;&#x70B9;&#x51FB;&#x4E0B;&#x9762;&#x7684;&#x94FE;&#x63A5;&#x8D2D;&#x4E70;&#xFF0C;&#x518D;&#x6B21;&#x611F;&#x8C22;&#x5404;&#x4F4D;&#x7684;&#x652F;&#x6301;&#x4E0E;&#x9F13;&#x52B1;&#xFF01;&#x6073;&#x8BF7;&#x5404;&#x4F4D;&#x6279;&#x8BC4;&#x6307;&#x6B63;&#xFF01;</p><p>&#x4EAC;&#x4E1C;&#xFF1A;<a href="https://item.jd.com/12403508.html" rel="nofollow noreferrer" target="_blank"></a><a href="https://item.jd.com/12403508.html" rel="nofollow noreferrer" target="_blank">https://item.jd.com/12403508....</a></p><p>&#x5F53;&#x5F53;&#xFF1A;<a href="http://product.dangdang.com/25308679.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://product.dangdang.com/25308679.html" rel="nofollow noreferrer" target="_blank">http://product.dangdang.com/2...</a></p><p>&#x539F;&#x6587;&#x7F51;&#x5740;&#xFF1A;<a href="http://yanhaijing.com/javascript/2018/08/16/react-component-communication/" rel="nofollow noreferrer" target="_blank">http://yanhaijing.com/javascr...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解密传统组件间通信与React组件间通信

## 原文链接
[https://segmentfault.com/a/1190000016426077](https://segmentfault.com/a/1190000016426077)

