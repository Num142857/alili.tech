---
title: 你不知道的Virtual DOM（五）：自定义组件
reprint: true
categories: reprint
abbrlink: 5f775bdd
date: 2018-11-13 02:30:09
---

{{% raw %}}
<ul><li><h3>&#x524D;&#x8A00;</h3></li></ul><p>&#x76EE;&#x524D;&#x6700;&#x6D41;&#x884C;&#x7684;&#x4E24;&#x5927;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;React&#x548C;Vue&#xFF0C;&#x90FD;&#x4E0D;&#x7EA6;&#x800C;&#x540C;&#x7684;&#x501F;&#x52A9;Virtual DOM&#x6280;&#x672F;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x7684;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;Virtual DOM&#xFF1F;&#x5B83;&#x662F;&#x901A;&#x8FC7;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x53BB;&#x63D0;&#x5347;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x7684;&#x5462;&#xFF1F;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;Virtual DOM&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x5E76;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Diff&#x7B97;&#x6CD5;&#x6765;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x3002;&#x672C;&#x6587;&#x7684;&#x5185;&#x5BB9;&#x8131;&#x79BB;&#x4E8E;&#x4EFB;&#x4F55;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;&#x53EA;&#x8BB2;&#x6700;&#x7EAF;&#x7CB9;&#x7684;Virtual DOM&#x3002;&#x6572;&#x5355;&#x8BCD;&#x592A;&#x7D2F;&#x4E86;&#xFF0C;&#x4E0B;&#x6587;Virtual DOM&#x4E00;&#x5F8B;&#x7528;VD&#x8868;&#x793A;&#x3002;</p><p>&#x8FD9;&#x662F;VD&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x7B2C;&#x4E94;&#x7BC7;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x672C;&#x7CFB;&#x5217;&#x5176;&#x5B83;&#x6587;&#x7AE0;&#x7684;&#x4F20;&#x9001;&#x95E8;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000016129036">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E00;&#xFF09;&#xFF1A;Virtual Dom&#x4ECB;&#x7ECD;</a><br><a href="https://segmentfault.com/a/1190000016145981">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E8C;&#xFF09;&#xFF1A;Virtual Dom&#x7684;&#x66F4;&#x65B0;</a><br><a href="https://segmentfault.com/a/1190000016186666">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E09;&#xFF09;&#xFF1A;Virtual Dom&#x66F4;&#x65B0;&#x4F18;&#x5316;</a><br><a href="https://segmentfault.com/a/1190000016200003">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x56DB;&#xFF09;&#xFF1A;key&#x7684;&#x4F5C;&#x7528;</a><br><a href="https://segmentfault.com/a/1190000016248276">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E94;&#xFF09;&#xFF1A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</a><br><a href="https://segmentfault.com/a/1190000016328371">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x516D;&#xFF09;&#xFF1A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&amp;&#x5F02;&#x6B65;&#x66F4;&#x65B0;</a></p><p>&#x4ECA;&#x5929;&#xFF0C;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x5728;&#x4E4B;&#x524D;&#x9879;&#x76EE;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x6269;&#x5C55;&#x529F;&#x80FD;&#x3002;&#x73B0;&#x5728;&#x6D41;&#x884C;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x90FD;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF0C;&#x7EC4;&#x4EF6;&#x5316;&#x5F00;&#x53D1;&#x5DF2;&#x7ECF;&#x6210;&#x4E3A;&#x63D0;&#x9AD8;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x7684;&#x94F6;&#x5F39;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C31;&#x5C06;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x529F;&#x80FD;&#x52A0;&#x5230;&#x9879;&#x76EE;&#x4E2D;&#x53BB;&#xFF0C;&#x76EE;&#x6807;&#x662F;&#x6B63;&#x786E;&#x7684;&#x6E32;&#x67D3;&#x548C;&#x66F4;&#x65B0;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x3002;</p><ul><li><h3>JSX&#x5BF9;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x652F;&#x6301;</h3></li></ul><p>&#x8981;&#x60F3;&#x6B63;&#x786E;&#x7684;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#xFF0C;&#x7B2C;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x8981;&#x544A;&#x8BC9;JSX&#x67D0;&#x4E2A;&#x6807;&#x7B7E;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x4E2A;&#x5B9E;&#x73B0;&#x8D77;&#x6765;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x8981;&#x6807;&#x7B7E;&#x540D;&#x7684;&#x9996;&#x5B57;&#x6BCD;&#x5927;&#x5199;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x91CC;&#xFF0C;MyComp&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x3002;</p><pre><code class="html">&lt;div&gt;
    &lt;div&gt;&#x666E;&#x901A;&#x6807;&#x7B7E;&lt;/div&gt;
    &lt;MyComp&gt;&lt;/MyComp&gt;
&lt;/div&gt;</code></pre><p>&#x7ECF;&#x8FC7;JSX&#x7F16;&#x8BD1;&#x540E;&#xFF0C;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x3002;</p><pre><code class="javascript">h(
    &apos;div&apos;,
    null,
    h(
        &apos;div&apos;,
        null,
        &apos;\u666E\u901A\u6807\u7B7E&apos;
    ),
    h(MyComp, null)
);</code></pre><p>&#x5F53;&#x9996;&#x5B57;&#x6BCD;&#x5927;&#x5199;&#x5F53;&#x65F6;&#x5019;&#xFF0C;JSX&#x4F1A;&#x5C06;&#x6807;&#x7B7E;&#x540D;&#x5F53;&#x4F5C;&#x53D8;&#x91CF;&#x5904;&#x7406;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x50CF;&#x666E;&#x901A;&#x6807;&#x7B7E;&#x4E00;&#x6837;&#x5F53;&#x5B57;&#x7B26;&#x4E32;&#x5904;&#x7406;&#x3002;&#x89E3;&#x51B3;&#x4E86;&#x8BC6;&#x522B;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x7B7E;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x5B9A;&#x4E49;&#x6807;&#x7B7E;&#x4E86;&#x3002;</p><ul><li><h3>&#x5B9A;&#x4E49;&#x57FA;&#x7C7B;Component</h3></li></ul><p>&#x5728;React&#x4E2D;&#xFF0C;&#x6240;&#x6709;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x90FD;&#x8981;&#x7EE7;&#x627F;Component&#x57FA;&#x7C7B;&#xFF0C;&#x5B83;&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x7CFB;&#x5217;&#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x548C;&#x4FEE;&#x6539;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x4E5F;&#x5BF9;&#x5E94;&#x7684;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x81EA;&#x5DF1;&#x7684;Component&#x7C7B;&#xFF1A;</p><pre><code class="javascript">class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
    }
    
    setState(newState) {
        this.state = {...this.state, ...newState};
        const vdom = this.render();
        diff(this.dom, vdom, this.parent);
    }

    render() {
        throw new Error(&apos;component should define its own render method&apos;)
    }
};</code></pre><p>&#x5982;&#x679C;&#x7528;&#x4E00;&#x53E5;&#x8BDD;&#x63CF;&#x8FF0;Component&#xFF0C;&#x90A3;&#x5C31;&#x662F;<code>&#x5C5E;&#x6027;&#x548C;&#x72B6;&#x6001;&#x7684;UI&#x8868;&#x8FBE;</code>&#x3002;&#x6211;&#x4EEC;&#x5148;&#x4E0D;&#x8003;&#x8651;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#xFF0C;&#x5148;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6700;&#x7CBE;&#x7B80;&#x7248;&#x7684;Component&#x3002;&#x9996;&#x5148;&#x5728;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x4F20;&#x5165;props&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;setState&#x65B9;&#x6CD5;&#x6765;&#x6539;&#x53D8;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x6700;&#x540E;&#x5C31;&#x662F;&#x5B50;&#x7C7B;&#x5FC5;&#x987B;&#x8981;&#x5B9E;&#x73B0;&#x7684;<code>render</code>&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x5B50;&#x7C7B;&#x6CA1;&#x6709;&#x5B9E;&#x73B0;&#xFF0C;&#x5C31;&#x4F1A;&#x6CBF;&#x7740;&#x539F;&#x578B;&#x94FE;&#x67E5;&#x627E;&#x5230;Component&#x7C7B;&#xFF0C;&#x7136;&#x540E;&#x4F1A;&#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#x3002;</p><p>&#x6709;&#x4E86;Component&#x57FA;&#x7C7B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x81EA;&#x5DF1;&#x7684;&#x7EC4;&#x4EF6;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x6765;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x663E;&#x793A;&#x5C5E;&#x6027;&#x548C;&#x72B6;&#x6001;&#x4FE1;&#x606F;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p><pre><code class="javascript">class MyComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: &apos;Tina&apos;
        }
    }

    render() {
        return(
            &lt;div&gt;
                &lt;div&gt;This is My Component! {this.props.count}&lt;/div&gt;
                &lt;div&gt;name: {this.state.name}&lt;/div&gt;
            &lt;/div&gt;
        )
    }
}</code></pre><p>&#x5B9A;&#x4E49;&#x597D;&#x7EC4;&#x4EF6;&#x540E;&#xFF0C;&#x5C31;&#x8981;&#x8003;&#x8651;&#x6E32;&#x67D3;&#x7684;&#x903B;&#x8F91;&#x4E86;&#x3002;</p><ul><li><h3>&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x903B;&#x8F91;</h3></li></ul><p>&#x5728;&#x5BF9;VD&#x8FDB;&#x884C;diff&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8981;&#x5BF9;tag&#x4E3A;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#xFF08;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF09;&#x7684;&#x8282;&#x70B9;&#x505A;&#x7279;&#x6B8A;&#x5904;&#x7406;&#xFF0C;&#x540C;&#x65F6;&#x5BF9;&#x65B0;&#x5EFA;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x4E5F;&#x8981;&#x52A0;&#x5165;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x7684;&#x903B;&#x8F91;&#x3002;</p><pre><code class="javascript">function diff(dom, newVDom, parent, componentInst) {
    if (typeof newVDom == &apos;object&apos; &amp;&amp; typeof newVDom.tag == &apos;function&apos;) {
        buildComponentFromVDom(dom, newVDom, parent);
        return false;
    }
    
    // &#x65B0;&#x5EFA;node
    if (dom == undefined) {
        const dom = createElement(newVDom);

        // &#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;
        if (componentInst) {
            dom._component = componentInst;
            dom._componentConstructor = componentInst.constructor;
            componentInst.dom = dom;
        }

        parent.appendChild(dom);
        return false;
    }
    ...
}

function buildComponentFromVDom(dom, vdom, parent) {
    const cpnt = vdom.tag;
    if (!typeof cpnt === &apos;function&apos;) {
        throw new Error(&apos;vdom is not a component type&apos;);
    }

    const props = getVDomProps(vdom);
    let componentInst = dom &amp;&amp; dom._component;

    // &#x521B;&#x5EFA;&#x7EC4;&#x4EF6;
    if (componentInst == undefined) {
        try {
            componentInst = new cpnt(props);
            setTimeout(() =&gt; {componentInst.setState({name: &apos;Dickens&apos;})}, 5000);
        } catch (error) {
            throw new Error(`component creation error: ${cpnt.name}`);
        }
    } 
    // &#x7EC4;&#x4EF6;&#x66F4;&#x65B0; 
    else {
        componentInst.props = props;
    }
    
    const componentVDom = componentInst.render();
    
    diff(dom, componentVDom, parent, componentInst);
}

function getVDomProps(vdom) {
    const props = vdom.props;
    props.children = vdom.children;

    return props;
}</code></pre><p>&#x5982;&#x679C;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F1A;&#x8C03;&#x7528;<code>buildComponentFromVDom</code>&#x65B9;&#x6CD5;&#x3002;&#x5148;&#x901A;&#x8FC7;<code>getVDomProps</code>&#x65B9;&#x6CD5;&#x83B7;&#x53D6;vdom&#x6700;&#x65B0;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5305;&#x62EC;children&#x3002;&#x5982;&#x679C;dom&#x5BF9;&#x8C61;&#x6709;_component&#x5C5E;&#x6027;&#xFF0C;&#x8BF4;&#x660E;&#x662F;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x5426;&#x5219;&#x4E3A;&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;&#x7684;&#x8FC7;&#x7A0B;&#x3002;&#x5982;&#x679C;&#x662F;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#x5219;&#x76F4;&#x63A5;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;<code>setTimeout</code>&#x90E8;&#x5206;&#x4E3B;&#x8981;&#x4E3A;&#x4E86;&#x9A8C;&#x8BC1;setState&#x80FD;&#x4E0D;&#x80FD;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#xFF0C;&#x53EF;&#x4EE5;&#x5148;&#x5FFD;&#x7565;&#x3002;&#x5982;&#x679C;&#x662F;&#x66F4;&#x65B0;&#x8FC7;&#x7A0B;&#xFF0C;&#x5219;&#x4F20;&#x5165;&#x6700;&#x65B0;&#x7684;props&#x3002;&#x6700;&#x540E;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x7684;<code>render</code>&#x65B9;&#x6CD5;&#x5F97;&#x5230;&#x6700;&#x65B0;&#x7684;vdom&#x540E;&#xFF0C;&#x518D;&#x8FDB;&#x884C;diff&#x64CD;&#x4F5C;&#x3002;</p><p>diff&#x591A;&#x4E86;&#x4E00;&#x4E2A;<code>componentInst</code>&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5728;&#x65B0;&#x5EFA;dom&#x8282;&#x70B9;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x8BF4;&#x660E;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x9700;&#x8981;&#x7528;<code>_component</code>&#x548C;<code>_componentConstructor</code>&#x505A;&#x4E00;&#x4E0B;&#x6807;&#x8BC6;&#x3002;&#x5176;&#x4E2D;<code>_component</code>&#x4E0A;&#x9762;&#x5C31;&#x7528;&#x5230;&#x4E86;&#xFF0C;&#x7528;&#x6765;&#x5224;&#x65AD;&#x662F;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x8FC7;&#x7A0B;&#x8FD8;&#x662F;&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#x3002;<code>_componentConstructor</code>&#x7528;&#x5728;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x8FC7;&#x7A0B;&#x4E2D;&#x5224;&#x65AD;&#x7EC4;&#x4EF6;&#x7684;&#x7C7B;&#x578B;&#x662F;&#x5426;&#x76F8;&#x540C;&#x3002;</p><pre><code class="javascript">function isSameType(element, newVDom) {
    if (typeof newVDom.tag == &apos;function&apos;) {
        return element._componentConstructor == newVDom.tag;
    }
    ...
}</code></pre><p>&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x88AB;&#x52A8;&#x66F4;&#x65B0;&#x8FC7;&#x7A0B;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x6765;&#x770B;&#x770B;&#x4E3B;&#x52A8;&#x66F4;&#x65B0;&#x7684;&#x903B;&#x8F91;&#x3002;</p><ul><li><h3>setState</h3></li></ul><p><code>setState</code>&#x7684;&#x903B;&#x8F91;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x66F4;&#x65B0;state&#x540E;&#x518D;<code>render</code>&#x4E00;&#x6B21;&#xFF0C;&#x83B7;&#x53D6;&#x5230;&#x6700;&#x65B0;&#x7684;vdom&#xFF0C;&#x518D;&#x8D70;&#x4E00;&#x904D;diff&#x7684;&#x8FC7;&#x7A0B;&#x3002;<code>setState</code>&#x7684;&#x524D;&#x63D0;&#x662F;&#x7EC4;&#x4EF6;&#x5DF2;&#x7ECF;&#x5B9E;&#x4F8B;&#x5316;&#x5E76;&#x4E14;&#x5DF2;&#x7ECF;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x4E86;&#xFF0C;<code>this.dom</code>&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;dom&#x7684;&#x9876;&#x7EA7;&#x8282;&#x70B9;&#x3002;</p><pre><code class="javascript">setState(newState) {
    this.state = {...this.state, ...newState};
    const vdom = this.render();
    diff(this.dom, vdom, this.parent);
}

function buildComponentFromVDom(dom, vdom, parent) {
    ...
    // &#x521B;&#x5EFA;&#x7EC4;&#x4EF6;
    if (componentInst == undefined) {
        ...
        setTimeout(() =&gt; {componentInst.setState({name: &apos;Dickens&apos;})}, 5000);
    ...
}</code></pre><p>&#x4E3A;&#x4E86;&#x9A8C;&#x8BC1;<code>setState</code>&#x80FD;&#x5426;&#x6309;&#x9884;&#x671F;&#x8FD0;&#x884C;&#xFF0C;&#x5728;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5728;5&#x79D2;&#x540E;&#x66F4;&#x65B0;&#x4E00;&#x4E0B;state&#xFF0C;&#x770B;&#x770B;&#x540D;&#x5B57;&#x80FD;&#x5426;&#x6B63;&#x786E;&#x66F4;&#x65B0;&#x3002;&#x6211;&#x4EEC;&#x7684;&#x9875;&#x9762;&#x662F;&#x957F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><pre><code class="javascript">function view() {
    const elm = arr.pop();

    // &#x7528;&#x4E8E;&#x6D4B;&#x8BD5;&#x80FD;&#x4E0D;&#x80FD;&#x6B63;&#x5E38;&#x5220;&#x9664;&#x5143;&#x7D20;
    if (state.num !== 9) arr.unshift(elm);

    // &#x7528;&#x4E8E;&#x6D4B;&#x8BD5;&#x80FD;&#x4E0D;&#x80FD;&#x6B63;&#x5E38;&#x6DFB;&#x52A0;&#x5143;&#x7D20;
    if (state.num === 12) arr.push(9);

    return (
        &lt;div&gt;
            Hello World
            &lt;MyComp count={state.num}/&gt;
            &lt;ul myText=&quot;dickens&quot;&gt;
                {
                    arr.map( i =&gt; (
                        &lt;li id={i} class={`li-${i}`} key={i}&gt;
                            &#x7B2C;{i}
                        &lt;/li&gt;
                    ))
                }
            &lt;/ul&gt;
        &lt;/div&gt;
    );
}</code></pre><p>&#x521A;&#x5F00;&#x59CB;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x662F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgk4j?w=336&amp;h=285" src="https://static.alili.tech/img/bVbgk4j?w=336&amp;h=285" alt="clipboard.png" title="clipboard.png"></span></p><p>5&#x79D2;&#x4E4B;&#x540E;&#x662F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgk4q?w=325&amp;h=255" src="https://static.alili.tech/img/bVbgk4q?w=325&amp;h=255" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;<code>props</code>&#x548C;<code>state</code>&#x90FD;&#x5F97;&#x5230;&#x4E86;&#x6B63;&#x786E;&#x90FD;&#x6E32;&#x67D3;<span class="emoji emoji-smiley"></span>&#x3002;</p><ul><li><h3>&#x603B;&#x7ED3;</h3></li></ul><p>&#x672C;&#x6587;&#x57FA;&#x4E8E;&#x4E0A;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x52A0;&#x5165;&#x4E86;&#x5BF9;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x5927;&#x5927;&#x63D0;&#x9AD8;&#x4EE3;&#x7801;&#x7684;&#x590D;&#x7528;&#x6027;&#x3002;&#x57FA;&#x4E8E;&#x5F53;&#x524D;&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x80FD;&#x505A;&#x600E;&#x6837;&#x7684;&#x4F18;&#x5316;&#x5462;&#xFF0C;&#x8BF7;&#x770B;&#x4E0B;&#x4E00;&#x7BC7;&#x7684;&#x5185;&#x5BB9;&#xFF1A;<a href="https://segmentfault.com/a/1190000016328371">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x516D;&#xFF09;&#xFF1A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&amp;&#x5F02;&#x6B65;&#x66F4;&#x65B0;</a>&#x3002;</p><p>P.S.: &#x60F3;&#x770B;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x89C1;&#x8FD9;&#x91CC;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5FC5;&#x8981;&#x5EFA;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#x7684;&#x8BDD;&#x8BF7;&#x7559;&#x8A00;&#x7ED9;&#x6211;&#xFF1A;<a href="https://gist.github.com/dickenslian/88a6f62ea305007f627696be7657e919" rel="nofollow noreferrer">&#x4EE3;&#x7801;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的Virtual DOM（五）：自定义组件

## 原文链接
[https://segmentfault.com/a/1190000016248276](https://segmentfault.com/a/1190000016248276)

