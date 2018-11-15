---
title: React 构建单页应用方法与实例
reprint: true
categories: reprint
abbrlink: e8eb7f70
date: 2018-11-01 02:30:09
---

{{% raw %}}
<blockquote><p>React&#x4F5C;&#x4E3A;&#x76EE;&#x524D;&#x6700;&#x6D41;&#x884C;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x4E4B;&#x4E00;&#xFF0C;&#x5176;&#x53D7;&#x6B22;&#x8FCE;&#x7A0B;&#x5EA6;&#x4E0D;&#x5BB9;&#x5C0F;&#x89D1;&#xFF0C;&#x4ECE;&#x8FD9;&#x95E8;&#x6846;&#x67B6;&#x4E0A;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B66;&#x5230;&#x8BB8;&#x591A;&#x5176;&#x4ED6;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x6240;&#x7F3A;&#x5931;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x4E5F;&#x662F;&#x5176;&#x521B;&#x65B0;&#x6027;&#x6240;&#x5728;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6BD4;&#x5982;&#x865A;&#x62DF;DOM&#x3001;JSX&#x7B49;&#x3002;&#x90A3;&#x4E48;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5C31;&#x6765;&#x5B66;&#x4E60;&#x4E00;&#x4E0B;&#x8FD9;&#x95E8;&#x6846;&#x67B6;&#x662F;&#x5982;&#x4F55;&#x6784;&#x5EFA;&#x8D77;&#x4E00;&#x4E2A;&#x5355;&#x9875;&#x5E94;&#x7528;&#x7684;&#x3002;</p></blockquote><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x9996;&#x5148;&#x5728;&#x5B66;&#x4E60;&#x8FD9;&#x95E8;&#x6846;&#x67B6;&#x524D;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x5BF9;&#x4EE5;&#x4E0B;&#x77E5;&#x8BC6;&#x6709;&#x6240;&#x4E86;&#x89E3;&#xFF1A;</p><ol><li><p>&#x539F;&#x751F;JS&#x57FA;&#x7840;</p></li><li><p>CSS&#x57FA;&#x7840;</p></li><li><p>npm&#x5305;&#x7BA1;&#x7406;&#x57FA;&#x7840;</p></li><li><p>webpack&#x6784;&#x5EFA;&#x9879;&#x76EE;&#x57FA;&#x7840;</p></li><li><p>ES6&#x89C4;&#x8303;</p></li></ol><p>&#x4EE5;&#x4E0A;&#x4E94;&#x4E2A;&#x77E5;&#x8BC6;&#x70B9;&#x4E5F;&#x662F;&#x76EE;&#x524D;&#x5B66;&#x4E60;&#x5176;&#x4ED6;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x6240;&#x5FC5;&#x987B;&#x4E86;&#x89E3;&#x7684;&#x524D;&#x7F6E;&#x4EFB;&#x52A1;&#x3002;<br>JS&#x548C;CSS&#x5C31;&#x4E0D;&#x591A;&#x8BF4;&#x4E86;&#xFF0C;npm&#x662F;&#x76EE;&#x524D;&#x6700;&#x63D0;&#x5021;&#x4E5F;&#x662F;&#x5360;&#x636E;&#x4E3B;&#x5BFC;&#x5730;&#x4F4D;&#x7684;&#x5305;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF0C;&#x8FD8;&#x5728;&#x7528;bower&#x6216;&#x8005;&#x5176;&#x4ED6;&#x5DE5;&#x5177;&#x7684;&#x7AE5;&#x978B;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x4E0B;&#x4E86;&#x3002;&#x800C;webpack&#x4F5C;&#x4E3A;&#x65B0;&#x4E00;&#x4EE3;&#x6253;&#x5305;&#x5DE5;&#x5177;&#xFF0C;&#x5DF2;&#x7ECF;&#x5728;&#x524D;&#x7AEF;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x4E2D;&#x72EC;&#x5360;&#x9CCC;&#x5934;&#xFF0C;&#x548C;Browserify&#x76F8;&#x6BD4;&#x4E5F;&#x6709;&#x5F88;&#x5927;&#x4F18;&#x52BF;&#x3002;&#x81F3;&#x4E8E;ES6&#x89C4;&#x8303;&#x867D;&#x7136;&#x73B0;&#x5728;&#x4E3B;&#x6D41;&#x6D4F;&#x89C8;&#x5668;&#x8FD8;&#x4E0D;&#x517C;&#x5BB9;&#xFF0C;&#x4F46;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;babel&#x7B49;&#x8F6C;&#x6362;&#x5668;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x3002;</p><p>&#x7ED3;&#x5408;&#x5176;&#x4ED6;&#x7684;&#x4E00;&#x4E9B;&#x4E3B;&#x6D41;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;&#x6211;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x6784;&#x5EFA;&#x5355;&#x9875;&#x5E94;&#x7528;&#x6709;&#x8FD9;&#x6837;&#x4E09;&#x4E2A;&#x57FA;&#x672C;&#x7684;&#x4E1C;&#x897F;&#xFF1A;&#x7EC4;&#x4EF6;&#x3001;&#x8DEF;&#x7531;&#x3001;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x3002;&#x90A3;&#x4E48;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x5C31;&#x57FA;&#x4E8E;&#x8FD9;&#x4E09;&#x8005;&#x6765;&#x4ECB;&#x7ECD;React&#xFF0C;&#x5F53;&#x7136;&#x5176;&#x4E2D;&#x4F1A;&#x7A7F;&#x63D2;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x3002;</p><h2 id="articleHeader1">&#x7EC4;&#x4EF6;</h2><p>React&#x7684;&#x7EC4;&#x4EF6;&#x64B0;&#x5199;&#x548C;&#x8C03;&#x7528;&#x4E3B;&#x8981;&#x4F9D;&#x8D56;&#x4E8E;ES6&#x7684;&#x6A21;&#x5757;&#x5316;&#x548C;JSX&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import React from &apos;react&apos;
import { render } from &apos;react-dom&apos;
import MyComponent from &apos;./component.js&apos;
import &apos;./main.css&apos;


// &#x4E3B;&#x7EC4;&#x4EF6;
class MyDemo extends React.Component {
    render() {
        return (
            &lt;div className=&quot;box&quot;&gt;
                &lt;MyComponent /&gt;
            &lt;/div&gt;
        )
    }
}

render((
    &lt;MyDemo /&gt;
), document.getElementById(&apos;app&apos;))


// component.js

// &#x5B50;&#x7EC4;&#x4EF6;
import React from &apos;react&apos;

export default class MyComponent extends React.Component {
    render() {
        return (
            &lt;div&gt;
                &lt;p&gt;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF01;&lt;/p&gt;
            &lt;/div&gt;
        )
    }
}


// main.css
.box {
    width: 100%
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;
<span class="hljs-keyword">import</span> { render } from <span class="hljs-symbol">&apos;react</span>-dom&apos;
<span class="hljs-keyword">import</span> <span class="hljs-type">MyComponent</span> from &apos;./component.js&apos;
<span class="hljs-keyword">import</span> &apos;./main.css&apos;


<span class="hljs-comment">// &#x4E3B;&#x7EC4;&#x4EF6;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyDemo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div className=<span class="hljs-string">&quot;box&quot;</span>&gt;
                &lt;<span class="hljs-type">MyComponent</span> /&gt;
            &lt;/div&gt;
        )
    }
}

render((
    &lt;<span class="hljs-type">MyDemo</span> /&gt;
), document.getElementById(<span class="hljs-symbol">&apos;ap</span>p&apos;))


<span class="hljs-comment">// component.js</span>

<span class="hljs-comment">// &#x5B50;&#x7EC4;&#x4EF6;</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;p&gt;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF01;&lt;/p&gt;
            &lt;/div&gt;
        )
    }
}


<span class="hljs-comment">// main.css</span>
.box {
    width: <span class="hljs-number">100</span>%
}</code></pre><p>&#x76F8;&#x6BD4;Vue.js&#x6846;&#x67B6;&#xFF0C;&#x6211;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;React&#x7684;&#x7EC4;&#x4EF6;&#x7F16;&#x5199;&#x65B9;&#x5F0F;&#x8FD8;&#x662F;&#x6CA1;&#x6709;Vue&#x6765;&#x7684;&#x8212;&#x670D;&#xFF0C;&#x7EC4;&#x4EF6;&#x7684;css&#x6837;&#x5F0F;&#x8FD8;&#x662F;&#x8131;&#x79BB;&#x5728;&#x7EC4;&#x4EF6;&#x5916;&#x90E8;&#xFF0C;&#x7EF4;&#x62A4;&#x8D77;&#x6765;&#x4E5F;&#x4E0D;&#x662F;&#x5F88;&#x65B9;&#x4FBF;&#x3002;&#x60F3;&#x4E86;&#x89E3;Vue&#x7EC4;&#x4EF6;&#x7F16;&#x5199;&#x65B9;&#x5F0F;&#x7684;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E0B;&#x6211;&#x4E4B;&#x524D;&#x5199;&#x7684;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000004704498">&#x300A;&#x6D45;&#x8C08;Vue.js&#x300B;</a></p><p>&#x4ECE;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;React&#x7684;&#x865A;&#x62DF;DOM&#x548C;JSX&#x7684;&#x7279;&#x6027;&#x4E86;&#x3002;&#x76F8;&#x6BD4;&#x5176;&#x4ED6;&#x6846;&#x67B6;&#xFF0C;React&#x7684;&#x865A;&#x62DF;DOM&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x63D0;&#x5347;&#x9875;&#x9762;&#x7684;&#x6027;&#x80FD;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x53EF;&#x4EE5;&#x9632;&#x6B62;XSS&#x653B;&#x51FB;&#x7B49;&#x3002;&#x5173;&#x4E8E;&#x865A;&#x62DF;DOM&#x7684;&#x5177;&#x4F53;&#x539F;&#x7406;&#x8FD9;&#x91CC;&#x4E0D;&#x505A;&#x4ECB;&#x7ECD;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x7AE5;&#x978B;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<br><a href="http://www.alloyteam.com/2015/10/react-virtual-analysis-of-the-dom/?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">http://www.alloyteam.com/2015/10/react-virtual-analysis-of-the-dom/?utm_source=tuicool&amp;utm_medium=referral</a></p><p>&#x81F3;&#x4E8E;JSX&#x8BED;&#x6CD5;&#x5219;&#x662F;JS&#x7684;&#x4E00;&#x79CD;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x8BED;&#x6CD5;&#x7CD6;&#x6765;&#x4FBF;&#x6377;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x529F;&#x80FD;&#xFF0C;&#x8FD9;&#x91CC;JSX &#x628A;&#x7C7B; XML &#x7684;&#x8BED;&#x6CD5;&#x8F6C;&#x6210;&#x7EAF;&#x7CB9; JavaScript&#xFF0C;XML &#x5143;&#x7D20;&#x3001;&#x5C5E;&#x6027;&#x548C;&#x5B50;&#x8282;&#x70B9;&#x88AB;&#x8F6C;&#x6362;&#x6210; React.createElement &#x7684;&#x53C2;&#x6570;&#x3002;&#x7C7B;&#x4F3C;&#x7684;JS&#x8BED;&#x6CD5;&#x7CD6;&#x8FD8;&#x6709;TypeScript&#x7B49;&#x3002;</p><h2 id="articleHeader2">&#x8DEF;&#x7531;</h2><p>&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x673A;&#x5236;&#x662F;&#x76EE;&#x524D;&#x6784;&#x5EFA;&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF08;SPA&#xFF09;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x73AF;&#x4E4B;&#x4E00;&#x3002;&#x901A;&#x8FC7;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F18;&#x5316;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x6BCF;&#x6B21;&#x90FD;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x83B7;&#x53D6;&#x5168;&#x90E8;&#x6570;&#x636E;&#xFF0C;&#x4ECE;&#x800C;&#x5FEB;&#x901F;&#x5C06;&#x9875;&#x9762;&#x5C55;&#x73B0;&#x7ED9;&#x7528;&#x6237;&#x3002;</p><p>React&#x8DEF;&#x7531;&#x4F9D;&#x8D56;&#x4E8E;React Router&#x3002;React Router &#x4FDD;&#x6301; UI &#x4E0E; URL &#x540C;&#x6B65;&#x3002;&#x5B83;&#x62E5;&#x6709;&#x7B80;&#x5355;&#x7684; API &#x4E0E;&#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#x4F8B;&#x5982;&#x4EE3;&#x7801;&#x7F13;&#x51B2;&#x52A0;&#x8F7D;&#x3001;&#x52A8;&#x6001;&#x8DEF;&#x7531;&#x5339;&#x914D;&#x3001;&#x4EE5;&#x53CA;&#x5EFA;&#x7ACB;&#x6B63;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#x8FC7;&#x6E21;&#x5904;&#x7406;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;React&#x8DEF;&#x7531;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;
import { render } from &apos;react-dom&apos;
import { Router, Route, IndexRoute, Link, browserHistory } from &apos;react-router&apos;

const ACTIVE = { color: &apos;red&apos; }

class App extends Component {
    render() {
        return (
            &lt;div&gt;
                &lt;h1&gt;&#x6211;&#x7684;&#x8DEF;&#x7531;&lt;/h1&gt;
                &lt;ul&gt;
                    &lt;li&gt;&lt;Link to=&quot;/&quot; activeStyle={ACTIVE}&gt;&#x9996;&#x9875;&lt;/Link&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;Link to=&quot;/users&quot; activeStyle={ACTIVE}&gt;&#x7528;&#x6237;&#x9875;&lt;/Link&gt;&lt;/li&gt;
                &lt;/ul&gt;
                {this.props.children}
            &lt;/div&gt;
        )
    }
}

class Index extends React.Component {
    render() {
        return (
            &lt;div&gt;
                &lt;h2&gt;Index!&lt;/h2&gt;
            &lt;/div&gt;
        )
    }
}

class Users extends React.Component {
    render() {
        return (
            &lt;div&gt;
                &lt;h2&gt;Users&lt;/h2&gt;
            &lt;/div&gt;
        )
    }
}

render((
    &lt;Router history={browserHistory}&gt;
        &lt;Route path=&quot;/&quot; component={App}&gt;
            &lt;IndexRoute component={Index}/&gt;
            &lt;Route path=&quot;users&quot; component={Users}&gt;&lt;/Route&gt;
        &lt;/Route&gt;
    &lt;/Router&gt;
), document.getElementById(&apos;app&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>
<span class="hljs-keyword">import</span> { Router, Route, IndexRoute, Link, browserHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router&apos;</span>

<span class="hljs-keyword">const</span> ACTIVE = { <span class="hljs-attr">color</span>: <span class="hljs-string">&apos;red&apos;</span> }

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x6211;&#x7684;&#x8DEF;&#x7531;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">{ACTIVE}</span>&gt;</span>&#x9996;&#x9875;<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/users&quot;</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">{ACTIVE}</span>&gt;</span>&#x7528;&#x6237;&#x9875;<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
                {this.props.children}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Index!<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Users</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Users<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

render((
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{browserHistory}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">IndexRoute</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Index}/</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;users&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Users}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
), document.getElementById(&apos;app&apos;))</span></code></pre><p>&#x8FD9;&#x91CC;&#x53EA;&#x5217;&#x51FA;&#x4E86;React&#x7684;&#x4E00;&#x79CD;&#x8DEF;&#x7531;&#x5199;&#x6CD5;&#x3002;&#x76F8;&#x6BD4;&#x5176;&#x4ED6;&#x6846;&#x67B6;&#xFF0C;React&#x8DEF;&#x7531;&#x7684;&#x8BED;&#x6CD5;&#x66F4;&#x52A0;&#x901A;&#x4FD7;&#x6613;&#x61C2;&#x3002;&#x5173;&#x4E8E;React Router&#x7684;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x8BF7;&#x53C2;&#x7167;&#x5B98;&#x65B9;&#x6587;&#x6863;&#xFF1A;<a href="http://react-guide.github.io/react-router-cn/" rel="nofollow noreferrer" target="_blank">http://react-guide.github.io/react-router-cn/</a></p><h2 id="articleHeader3">&#x72B6;&#x6001;&#x7BA1;&#x7406;</h2><p>&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x4E0D;&#x662F;&#x5355;&#x9875;&#x5E94;&#x7528;&#x5FC5;&#x987B;&#x7684;&#xFF0C;&#x4F7F;&#x7528;&#x5B83;&#x80FD;&#x591F;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x5404;&#x4E2A;&#x72B6;&#x6001;&#x7684;&#x53D8;&#x66F4;&#xFF0C;&#x4F7F;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x6D41;&#x7A0B;&#x6E05;&#x6670;&#x53EF;&#x7EF4;&#x62A4;&#x3002;React&#x5B9E;&#x73B0;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x7684;Redux&#x3002;<br>Redux&#x4F7F;&#x7528;&#x7684;&#x662F;&#x4E25;&#x683C;&#x7684;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x3002;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x7684; state &#x88AB;&#x50A8;&#x5B58;&#x5728;&#x4E00;&#x68F5; object tree &#x4E2D;&#xFF0C;&#x5E76;&#x4E14;&#x8FD9;&#x4E2A; object tree &#x53EA;&#x5B58;&#x5728;&#x4E8E;&#x552F;&#x4E00;&#x4E00;&#x4E2A; store &#x4E2D;&#x3002;&#x56E0;&#x4E3A;Redux&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x7E41;&#x591A;&#xFF0C;&#x6240;&#x6709;&#x6211;&#x989D;&#x5916;&#x5199;&#x4E86;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x8BE6;&#x60C5;&#x8BF7;&#x6233;&#x8FD9;&#x91CC;&#xFF1A;<a href="https://segmentfault.com/a/1190000005933397">&#x300A;Redux &#x72B6;&#x6001;&#x7BA1;&#x7406;&#x65B9;&#x6CD5;&#x4E0E;&#x5B9E;&#x4F8B;&#x300B;</a></p><h2 id="articleHeader4">&#x9879;&#x76EE;&#x5B9E;&#x4F8B;</h2><p>&#x8FD9;&#x91CC;&#x6211;&#x7528;React&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x5355;&#x9875;&#x7F51;&#x7AD9;&#xFF0C;&#x9875;&#x9762;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVx4P1" src="https://static.alili.tech/img/bVx4P1" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;React&#x548C;Antd&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5168;&#x90E8;&#x6E90;&#x7801;&#x6211;&#x5DF2;&#x7ECF;&#x4E0A;&#x4F20;&#x81F3;&#x6211;&#x7684;github&#xFF0C;&#x5730;&#x5740;&#x4E3A;&#xFF1A;<a href="https://github.com/luozhihao/react-antd-demo" rel="nofollow noreferrer" target="_blank">https://github.com/luozhihao/react-antd-demo</a>&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x4E3A;&#x4E0D;&#x61C2;&#x5982;&#x4F55;&#x7528;React&#x6784;&#x5EFA;&#x5355;&#x9875;&#x5E94;&#x7528;&#x7684;&#x7AE5;&#x978B;&#x4F5C;&#x53C2;&#x8003;&#x3002;</p><p>Antd&#x662F;&#x8682;&#x8681;&#x91D1;&#x670D;&#x7684;&#x4E00;&#x6B3E;&#x57FA;&#x4E8E;React&#x7684;&#x5F00;&#x6E90;UI&#x7EC4;&#x4EF6;&#x5E93;&#xFF0C;&#x5176;&#x5B98;&#x7F51;&#x4E3A;&#xFF1A;<a href="http://ant.design/" rel="nofollow noreferrer" target="_blank">http://ant.design/</a></p><h2 id="articleHeader5">Fetch</h2><p>&#x56E0;&#x4E3A;&#x4E0A;&#x9762;&#x7684;&#x5B9E;&#x4F8B;&#x4E2D;&#x6211;&#x7528;&#x5230;&#x4E86;Fetch&#x6765;&#x8FDB;&#x884C;Ajax&#x4EA4;&#x4E92;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E0B;Fetch&#x3002;<br>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;Fetch&#x4F5C;&#x4E3A;&#x4E0B;&#x4E00;&#x4EE3;Ajax&#x6280;&#x672F;&#xFF0C;&#x5B83;&#x91C7;&#x7528;&#x4E86;&#x76EE;&#x524D;&#x6D41;&#x884C;&#x7684; Promise &#x65B9;&#x5F0F;&#x5904;&#x7406;&#x3002;&#x5229;&#x7528;Fetch&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;Ajax&#x8FDB;&#x884C;&#x6570;&#x636E;&#x4EA4;&#x4E92;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x83B7;&#x53D6;&#x6570;&#x636E;&#x65B9;&#x6CD5;
    fetchFn = () =&gt; {
        fetch(&apos;../../data.json&apos;)
            .then((res) =&gt; { console.log(res.status);return res.json() })
            .then((data) =&gt; { this.setState({lists:data.listData}) })
            .catch((e) =&gt; { console.log(e.message) })
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span> &#x83B7;&#x53D6;&#x6570;&#x636E;&#x65B9;&#x6CD5;
<span class="hljs-function">    <span class="hljs-title">fetchFn</span> = <span class="hljs-params">()</span> =&gt;</span> {
        fetch(<span class="hljs-string">&apos;../../data.json&apos;</span>)
            .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(res)</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(res.status);<span class="hljs-keyword">return</span> res.json() })
            .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span> =&gt;</span> { <span class="hljs-keyword">this</span>.setState({lists:data.listData}) })
            .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(e)</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(e.message) })
    }</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x7BC7;&#x4ECB;&#x7ECD;Fetch&#x7684;&#x6587;&#x7AE0;&#x5199;&#x7684;&#x4E0D;&#x9519;&#xFF0C;&#x63A8;&#x8350;&#x7ED9;&#x5927;&#x5BB6;<a href="https://segmentfault.com/a/1190000003810652">&#x300A;&#x4F20;&#x7EDF; Ajax &#x5DF2;&#x6B7B;&#xFF0C;Fetch &#x6C38;&#x751F;&#x300B;</a></p><h2 id="articleHeader6">&#x7ED3;&#x8BED;</h2><blockquote><p>&#x8FD8;&#x662F;&#x90A3;&#x53E5;&#x8BDD;&#xFF0C;&#x5B66;&#x4E60;&#x4E00;&#x95E8;&#x6846;&#x67B6;&#x6700;&#x91CD;&#x8981;&#x7684;&#x5E76;&#x4E0D;&#x662F;&#x5B66;&#x4E60;&#x5B83;&#x7684;&#x6280;&#x672F;&#xFF0C;&#x800C;&#x662F;&#x5B66;&#x4E60;&#x5176;&#x5E26;&#x6765;&#x7684;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x7684;&#x601D;&#x8DEF;&#x3002;&#x901A;&#x8FC7;React&#x8FD9;&#x4E00;&#x95E8;&#x6846;&#x67B6;&#x7684;&#x5B66;&#x4E60;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4ECE;&#x5B83;&#x72EC;&#x7279;&#x7684;&#x65B0;&#x7279;&#x6027;&#x4E2D;&#x53D1;&#x6398;&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x601D;&#x7EF4;&#x6A21;&#x5F0F;&#x3002;&#x53EA;&#x6709;&#x601D;&#x7EF4;&#x5C42;&#x9762;&#x5F97;&#x5230;&#x4E86;&#x6269;&#x5C55;&#xFF0C;&#x4F60;&#x624D;&#x80FD;&#x5728;&#x524D;&#x7AEF;&#x7684;&#x6D77;&#x6D0B;&#x91CC;&#x81EA;&#x7531;&#x7FF1;&#x7FD4;&#x3002;</p></blockquote><p>&#x672C;&#x6587;&#x5730;&#x5740;&#xFF1A;<a href="https://segmentfault.com/a/1190000005703694" target="_blank">https://segmentfault.com/a/1190000005703694</a><br>&#x535A;&#x5BA2;&#x56ED;&#xFF1A;<a href="http://www.cnblogs.com/luozhihao/p/5579786.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/luozhihao/p/5579786.html</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 构建单页应用方法与实例

## 原文链接
[https://segmentfault.com/a/1190000005703694](https://segmentfault.com/a/1190000005703694)

