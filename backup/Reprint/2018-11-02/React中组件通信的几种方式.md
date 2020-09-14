---
title: React中组件通信的几种方式
hidden: true
categories: [reprint]
slug: dd028b50
date: 2018-11-02 02:30:12
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000012361466?w=1240&amp;h=667" src="https://static.alili.tech/img/remote/1460000012361466?w=1240&amp;h=667" alt="react&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;" title="react&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;" style="cursor:pointer;display:inline"></span></p><blockquote>&#x9996;&#x6B21;&#x53D1;&#x8868;&#x5728;<a href="http://wangyaxing.cn/2017/12/10/react%E4%B8%AD%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E5%BC%8F/#more" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;</a></blockquote><h1 id="articleHeader0">&#x9700;&#x8981;&#x7EC4;&#x4EF6;&#x4E4B;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#x7684;&#x51E0;&#x79CD;&#x60C5;&#x51B5;</h1><ul><li>&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</li><li>&#x8DE8;&#x7EA7;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</li><li>&#x6CA1;&#x6709;&#x5D4C;&#x5957;&#x5173;&#x7CFB;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;</li></ul><h2 id="articleHeader1">1. &#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h2><p>React&#x6570;&#x636E;&#x6D41;&#x52A8;&#x662F;&#x5355;&#x5411;&#x7684;,&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x4E5F;&#x662F;&#x6700;&#x5E38;&#x89C1;&#x7684;;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;props&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x9700;&#x8981;&#x7684;&#x4FE1;&#x606F;<br>Child.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import PropTypes from &apos;prop-types&apos;;

export default function Child({ name }) {
    return &lt;h1&gt;Hello, {name}&lt;/h1&gt;;
}

Child.propTypes = {
    name: PropTypes.string.isRequired,
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;prop-types&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">{ name }</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

Child.propTypes = {
    <span class="hljs-attr">name</span>: PropTypes.string.isRequired,
};
</code></pre><p>Parent.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;

import Child from &apos;./Child&apos;;

class Parent extends Component {
    render() {
        return (
            &lt;div&gt;
                &lt;Child name=&quot;Sara&quot; /&gt;
            &lt;/div&gt;
        );
    }
}

export default Parent;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;

<span class="hljs-keyword">import</span> Child <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./Child&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Sara&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }
}

export default Parent;
</span></code></pre><h2 id="articleHeader2">2. &#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h2><ul><li>&#x5229;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li><li>&#x5229;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x673A;&#x5236;</li></ul><h3 id="articleHeader3">&#x56DE;&#x8C03;&#x51FD;&#x6570;</h3><p>&#x5B9E;&#x73B0;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x70B9;&#x51FB;&#x9690;&#x85CF;&#x7EC4;&#x4EF6;&#x6309;&#x94AE;&#x53EF;&#x4EE5;&#x5C06;&#x81EA;&#x8EAB;&#x9690;&#x85CF;&#x7684;&#x529F;&#x80FD;</p><p>List3.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import PropTypes from &apos;prop-types&apos;;

class List3 extends Component {
    static propTypes = {
        hideConponent: PropTypes.func.isRequired,
    }
    render() {
        return (
            &lt;div&gt;
                &#x54C8;&#x54C8;,&#x6211;&#x662F;List3
                &lt;button onClick={this.props.hideConponent}&gt;&#x9690;&#x85CF;List3&#x7EC4;&#x4EF6;&lt;/button&gt;
            &lt;/div&gt;
        );
    }
}

export default List3;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;prop-types&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List3</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">hideConponent</span>: PropTypes.func.isRequired,
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                &#x54C8;&#x54C8;,&#x6211;&#x662F;List3
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.props.hideConponent}</span>&gt;</span>&#x9690;&#x85CF;List3&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> List3;
</code></pre><p>App.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;

import List3 from &apos;./components/List3&apos;;
export default class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            isShowList3: false,
        };
    }
    showConponent = () =&gt; {
        this.setState({
            isShowList3: true,
        });
    }
    hideConponent = () =&gt; {
        this.setState({
            isShowList3: false,
        });
    }
    render() {
        return (
            &lt;div&gt;
                &lt;button onClick={this.showConponent}&gt;&#x663E;&#x793A;Lists&#x7EC4;&#x4EF6;&lt;/button&gt;
                {
                    this.state.isShowList3 ?
                        &lt;List3 hideConponent={this.hideConponent} /&gt;
                    :
                    null
                }

            &lt;/div&gt;
        );
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;

<span class="hljs-keyword">import</span> List3 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/List3&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(...args) {
        <span class="hljs-keyword">super</span>(...args);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">isShowList3</span>: <span class="hljs-literal">false</span>,
        };
    }
    showConponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">isShowList3</span>: <span class="hljs-literal">true</span>,
        });
    }
    hideConponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">isShowList3</span>: <span class="hljs-literal">false</span>,
        });
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.showConponent}</span>&gt;</span>&#x663E;&#x793A;Lists&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                {
                    this.state.isShowList3 ?
                        <span class="hljs-tag">&lt;<span class="hljs-name">List3</span> <span class="hljs-attr">hideConponent</span>=<span class="hljs-string">{this.hideConponent}</span> /&gt;</span>
                    :
                    null
                }

            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }
}
</span></code></pre><p>&#x89C2;&#x5BDF;&#x4E00;&#x4E0B;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;,&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x5B83;&#x4E0E;&#x4F20;&#x7EDF;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x4E00;&#x6837;.&#x800C;&#x4E14;setState&#x4E00;&#x822C;&#x4E0E;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5747;&#x4F1A;&#x6210;&#x5BF9;&#x51FA;&#x73B0;,&#x56E0;&#x4E3A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5373;&#x662F;&#x8F6C;&#x6362;&#x5185;&#x90E8;&#x72B6;&#x6001;&#x662F;&#x7684;&#x51FD;&#x6570;&#x4F20;&#x7EDF;;</p><h2 id="articleHeader4">3. &#x8DE8;&#x7EA7;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h2><ul><li>&#x5C42;&#x5C42;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;props</li></ul><blockquote>&#x4F8B;&#x5982;A&#x7EC4;&#x4EF6;&#x548C;B&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x8981;&#x8FDB;&#x884C;&#x901A;&#x4FE1;,&#x5148;&#x627E;&#x5230;A&#x548C;B&#x516C;&#x5171;&#x7684;&#x7236;&#x7EC4;&#x4EF6;,A&#x5148;&#x5411;C&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;,C&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;props&#x548C;B&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;,&#x6B64;&#x65F6;C&#x7EC4;&#x4EF6;&#x8D77;&#x7684;&#x5C31;&#x662F;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x4F5C;&#x7528;</blockquote><ul><li>&#x4F7F;&#x7528;context</li></ul><blockquote>context&#x662F;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;,&#x50CF;&#x662F;&#x4E00;&#x4E2A;&#x5927;&#x5BB9;&#x5668;,&#x5728;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x90FD;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;,&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x8981;&#x901A;&#x4FE1;&#x7684;&#x4FE1;&#x606F;&#x653E;&#x5728;context&#x4E0A;,&#x7136;&#x540E;&#x5728;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x4E2D;&#x53EF;&#x4EE5;&#x968F;&#x610F;&#x53D6;&#x5230;;<br>&#x4F46;&#x662F;React&#x5B98;&#x65B9;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x5927;&#x91CF;context,&#x5C3D;&#x7BA1;&#x4ED6;&#x53EF;&#x4EE5;&#x51CF;&#x5C11;&#x9010;&#x5C42;&#x4F20;&#x9012;,&#x4F46;&#x662F;&#x5F53;&#x7EC4;&#x4EF6;&#x7ED3;&#x6784;&#x590D;&#x6742;&#x7684;&#x65F6;&#x5019;,&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x77E5;&#x9053;context&#x662F;&#x4ECE;&#x54EA;&#x91CC;&#x4F20;&#x8FC7;&#x6765;&#x7684;;&#x800C;&#x4E14;context&#x662F;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;,&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x6B63;&#x662F;&#x5BFC;&#x81F4;&#x5E94;&#x7528;&#x8D70;&#x5411;&#x6DF7;&#x4E71;&#x7684;&#x7F6A;&#x9B41;&#x7978;&#x9996;.</blockquote><h3 id="articleHeader5">&#x4F7F;&#x7528;context</h3><p>&#x4E0B;&#x9762;&#x4F8B;&#x5B50;&#x4E2D;&#x7684;&#x7EC4;&#x4EF6;&#x5173;&#x7CFB;: ListItem&#x662F;List&#x7684;&#x5B50;&#x7EC4;&#x4EF6;,List&#x662F;app&#x7684;&#x5B50;&#x7EC4;&#x4EF6;</p><p>ListItem.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import PropTypes from &apos;prop-types&apos;;

class ListItem extends Component {
    // &#x5B50;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x81EA;&#x5DF1;&#x8981;&#x4F7F;&#x7528;context
    static contextTypes = {
        color: PropTypes.string,
    }
    static propTypes = {
        value: PropTypes.string,
    }
    render() {
        const { value } = this.props;
        return (
            &lt;li style={{ background: this.context.color }}&gt;
                &lt;span&gt;{value}&lt;/span&gt;
            &lt;/li&gt;
        );
    }
}

export default ListItem;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;prop-types&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ListItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// &#x5B50;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x81EA;&#x5DF1;&#x8981;&#x4F7F;&#x7528;context</span>
    <span class="hljs-keyword">static</span> contextTypes = {
        <span class="hljs-attr">color</span>: PropTypes.string,
    }
    <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">value</span>: PropTypes.string,
    }
    render() {
        <span class="hljs-keyword">const</span> { value } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">background:</span> <span class="hljs-attr">this.context.color</span> }}&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{value}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ListItem;
</code></pre><p>List.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ListItem from &apos;./ListItem&apos;;

class List extends Component {
    // &#x7236;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x81EA;&#x5DF1;&#x652F;&#x6301;context
    static childContextTypes = {
        color: PropTypes.string,
    }
    static propTypes = {
        list: PropTypes.array,
    }
    // &#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x51FD;&#x6570;,&#x7528;&#x6765;&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;context&#x5BF9;&#x8C61;
    getChildContext() {
        return {
            color: &apos;red&apos;,
        };
    }
    render() {
        const { list } = this.props;
        return (
            &lt;div&gt;
                &lt;ul&gt;
                    {
                        list.map((entry, index) =&gt;
                            &lt;ListItem key={`list-${index}`} value={entry.text} /&gt;,
                       )
                    }
                &lt;/ul&gt;
            &lt;/div&gt;
        );
    }
}

export default List;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> ListItem <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./ListItem&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// &#x7236;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x81EA;&#x5DF1;&#x652F;&#x6301;context</span>
    <span class="hljs-keyword">static</span> childContextTypes = {
        <span class="hljs-attr">color</span>: PropTypes.string,
    }
    <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">list</span>: PropTypes.array,
    }
    <span class="hljs-comment">// &#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x51FD;&#x6570;,&#x7528;&#x6765;&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;context&#x5BF9;&#x8C61;</span>
    getChildContext() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">color</span>: <span class="hljs-string">&apos;red&apos;</span>,
        };
    }
    render() {
        <span class="hljs-keyword">const</span> { list } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {
                        list.map((entry, index) =&gt;
                            <span class="hljs-tag">&lt;<span class="hljs-name">ListItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">list-</span>${<span class="hljs-attr">index</span>}`} <span class="hljs-attr">value</span>=<span class="hljs-string">{entry.text}</span> /&gt;</span>,
                       )
                    }
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }
}

export default List;
</span></code></pre><p>App.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import List from &apos;./components/List&apos;;

const list = [
    {
        text: &apos;&#x9898;&#x76EE;&#x4E00;&apos;,
    },
    {
        text: &apos;&#x9898;&#x76EE;&#x4E8C;&apos;,
    },
];
export default class App extends Component {
    render() {
        return (
            &lt;div&gt;
                &lt;List
                    list={list}
                /&gt;
            &lt;/div&gt;
        );
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/List&apos;</span>;

<span class="hljs-keyword">const</span> list = [
    {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;&#x9898;&#x76EE;&#x4E00;&apos;</span>,
    },
    {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;&#x9898;&#x76EE;&#x4E8C;&apos;</span>,
    },
];
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">List</span>
                    <span class="hljs-attr">list</span>=<span class="hljs-string">{list}</span>
                /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }
}</span></code></pre><h2 id="articleHeader6">4. &#x6CA1;&#x6709;&#x5D4C;&#x5957;&#x5173;&#x7CFB;&#x7684;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h2><ul><li>&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x673A;&#x5236;</li></ul><blockquote>&#x5728;componentDidMount&#x4E8B;&#x4EF6;&#x4E2D;,&#x5982;&#x679C;&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x5B8C;&#x6210;,&#x518D;&#x8BA2;&#x9605;&#x4E8B;&#x4EF6;;&#x5728;&#x7EC4;&#x4EF6;&#x5378;&#x8F7D;&#x7684;&#x65F6;&#x5019;,&#x5728;componentWillUnmount&#x4E8B;&#x4EF6;&#x4E2D;&#x53D6;&#x6D88;&#x4E8B;&#x4EF6;&#x7684;&#x8BA2;&#x9605;;<br>&#x4EE5;&#x5E38;&#x7528;&#x7684;&#x53D1;&#x5E03;/&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x4E3E;&#x4F8B;,&#x501F;&#x7528;Node.js Events&#x6A21;&#x5757;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x7248;&#x5B9E;&#x73B0;</blockquote><h3 id="articleHeader7">&#x4F7F;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;</h3><p>&#x4E0B;&#x9762;&#x4F8B;&#x5B50;&#x4E2D;&#x7684;&#x7EC4;&#x4EF6;&#x5173;&#x7CFB;: List1&#x548C;List2&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5D4C;&#x5957;&#x5173;&#x7CFB;,App&#x662F;&#x4ED6;&#x4EEC;&#x7684;&#x7236;&#x7EC4;&#x4EF6;;</p><p>&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x529F;&#x80FD;: &#x70B9;&#x51FB;List2&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x6309;&#x94AE;,&#x6539;&#x53D8;List1&#x4E2D;&#x7684;&#x4FE1;&#x606F;&#x663E;&#x793A;<br>&#x9996;&#x5148;&#x9700;&#x8981;&#x9879;&#x76EE;&#x4E2D;&#x5B89;&#x88C5;events &#x5305;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install events --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">npm install events --save</code></pre><p>&#x5728;src&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;util&#x76EE;&#x5F55;&#x91CC;&#x9762;&#x5EFA;&#x4E00;&#x4E2A;events.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { EventEmitter } from &apos;events&apos;;

export default new EventEmitter();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { EventEmitter } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;events&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> EventEmitter();</code></pre><p>list1.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import emitter from &apos;../util/events&apos;;

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: &apos;List1&apos;,
        };
    }
    componentDidMount() {
        // &#x7EC4;&#x4EF6;&#x88C5;&#x8F7D;&#x5B8C;&#x6210;&#x4EE5;&#x540E;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;
        this.eventEmitter = emitter.addListener(&apos;changeMessage&apos;, (message) =&gt; {
            this.setState({
                message,
            });
        });
    }
    componentWillUnmount() {
        emitter.removeListener(this.eventEmitter);
    }
    render() {
        return (
            &lt;div&gt;
                {this.state.message}
            &lt;/div&gt;
        );
    }
}

export default List;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> emitter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../util/events&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;List1&apos;</span>,
        };
    }
    componentDidMount() {
        <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x88C5;&#x8F7D;&#x5B8C;&#x6210;&#x4EE5;&#x540E;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</span>
        <span class="hljs-keyword">this</span>.eventEmitter = emitter.addListener(<span class="hljs-string">&apos;changeMessage&apos;</span>, (message) =&gt; {
            <span class="hljs-keyword">this</span>.setState({
                message,
            });
        });
    }
    componentWillUnmount() {
        emitter.removeListener(<span class="hljs-keyword">this</span>.eventEmitter);
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                {this.state.message}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> List;
</code></pre><p>List2.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import emitter from &apos;../util/events&apos;;

class List2 extends Component {
    handleClick = (message) =&gt; {
        emitter.emit(&apos;changeMessage&apos;, message);
    };
    render() {
        return (
            &lt;div&gt;
                &lt;button onClick={this.handleClick.bind(this, &apos;List2&apos;)}&gt;&#x70B9;&#x51FB;&#x6211;&#x6539;&#x53D8;List1&#x7EC4;&#x4EF6;&#x4E2D;&#x663E;&#x793A;&#x4FE1;&#x606F;&lt;/button&gt;
            &lt;/div&gt;
        );
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> emitter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../util/events&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    handleClick = <span class="hljs-function">(<span class="hljs-params">message</span>) =&gt;</span> {
        emitter.emit(<span class="hljs-string">&apos;changeMessage&apos;</span>, message);
    };
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick.bind(this,</span> &apos;<span class="hljs-attr">List2</span>&apos;)}&gt;</span>&#x70B9;&#x51FB;&#x6211;&#x6539;&#x53D8;List1&#x7EC4;&#x4EF6;&#x4E2D;&#x663E;&#x793A;&#x4FE1;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}
</code></pre><p>APP.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import List1 from &apos;./components/List1&apos;;
import List2 from &apos;./components/List2&apos;;


export default class App extends Component {
    render() {
        return (
            &lt;div&gt;
                &lt;List1 /&gt;
                &lt;List2 /&gt;
            &lt;/div&gt;
        );
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> List1 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/List1&apos;</span>;
<span class="hljs-keyword">import</span> List2 <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/List2&apos;</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">List1</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">List2</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre><p>&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x662F;&#x5178;&#x578B;&#x7684;&#x53D1;&#x5E03;&#x8BA2;&#x9605;&#x6A21;&#x5F0F;,&#x901A;&#x8FC7;&#x5411;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x4E0A;&#x6DFB;&#x52A0;&#x76D1;&#x542C;&#x5668;&#x548C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;</p><h2 id="articleHeader8">&#x603B;&#x7ED3;</h2><ul><li>&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;: props</li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;: &#x56DE;&#x8C03;&#x51FD;&#x6570;/&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</li><li>&#x8DE8;&#x7EA7;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;: &#x5C42;&#x5C42;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;props/context</li><li>&#x6CA1;&#x6709;&#x5D4C;&#x5957;&#x5173;&#x7CFB;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;: &#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</li></ul><blockquote>&#x5728;&#x8FDB;&#x884C;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x7684;&#x65F6;&#x5019;,&#x4E3B;&#x8981;&#x770B;&#x4E1A;&#x52A1;&#x7684;&#x5177;&#x4F53;&#x9700;&#x6C42;,&#x9009;&#x62E9;&#x6700;&#x5408;&#x9002;&#x7684;;<br>&#x5F53;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x590D;&#x6742;&#x5230;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;,&#x5C31;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x5F15;&#x5165;<a href="http://cn.mobx.js.org/" rel="nofollow noreferrer" target="_blank">Mobx</a>,<a href="https://redux.js.org/" rel="nofollow noreferrer" target="_blank">Redux</a>&#x7B49;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5DE5;&#x5177;</blockquote><h2 id="articleHeader9">&#x53C2;&#x8003;</h2><p><a href="https://reactjs.org/docs/components-and-props.html" rel="nofollow noreferrer" target="_blank">reactjs&#x5B98;&#x65B9;&#x6587;&#x6863;</a><br><a href="https://book.douban.com/subject/26918038/" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;React&#x6280;&#x672F;&#x6808;</a><br><a href="http://www.jianshu.com/p/fb915d9c99c4" rel="nofollow noreferrer" target="_blank">React&#x4E2D;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中组件通信的几种方式

## 原文链接
[https://segmentfault.com/a/1190000012361461](https://segmentfault.com/a/1190000012361461)

