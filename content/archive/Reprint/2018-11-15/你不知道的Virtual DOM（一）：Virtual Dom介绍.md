---
title: '你不知道的Virtual DOM（一）：Virtual Dom介绍' 
date: 2018-11-15 2:30:08
hidden: true
categories: [reprint]
---

{{< raw >}}
<ul><li><h3>&#x524D;&#x8A00;</h3></li></ul><p>&#x76EE;&#x524D;&#x6700;&#x6D41;&#x884C;&#x7684;&#x4E24;&#x5927;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;React&#x548C;Vue&#xFF0C;&#x90FD;&#x4E0D;&#x7EA6;&#x800C;&#x540C;&#x7684;&#x501F;&#x52A9;Virtual DOM&#x6280;&#x672F;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x7684;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;Virtual DOM&#xFF1F;&#x5B83;&#x662F;&#x901A;&#x8FC7;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x53BB;&#x63D0;&#x5347;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x7684;&#x5462;&#xFF1F;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;Virtual DOM&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x5E76;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Diff&#x7B97;&#x6CD5;&#x6765;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x3002;&#x672C;&#x6587;&#x7684;&#x5185;&#x5BB9;&#x8131;&#x79BB;&#x4E8E;&#x4EFB;&#x4F55;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;&#x53EA;&#x8BB2;&#x6700;&#x7EAF;&#x7CB9;&#x7684;Virtual DOM&#x3002;&#x6572;&#x5355;&#x8BCD;&#x592A;&#x7D2F;&#x4E86;&#xFF0C;&#x4E0B;&#x6587;Virtual DOM&#x4E00;&#x5F8B;&#x7528;VD&#x8868;&#x793A;&#x3002;</p><p>&#x8FD9;&#x662F;VD&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x5F00;&#x7BC7;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x672C;&#x7CFB;&#x5217;&#x5176;&#x5B83;&#x6587;&#x7AE0;&#x7684;&#x4F20;&#x9001;&#x95E8;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000016129036">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E00;&#xFF09;&#xFF1A;Virtual Dom&#x4ECB;&#x7ECD;</a><br><a href="https://segmentfault.com/a/1190000016145981">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E8C;&#xFF09;&#xFF1A;Virtual Dom&#x7684;&#x66F4;&#x65B0;</a><br><a href="https://segmentfault.com/a/1190000016186666">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E09;&#xFF09;&#xFF1A;Virtual Dom&#x66F4;&#x65B0;&#x4F18;&#x5316;</a><br><a href="https://segmentfault.com/a/1190000016200003">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x56DB;&#xFF09;&#xFF1A;key&#x7684;&#x4F5C;&#x7528;</a><br><a href="https://segmentfault.com/a/1190000016248276">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E94;&#xFF09;&#xFF1A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</a><br><a href="https://segmentfault.com/a/1190000016328371">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x516D;&#xFF09;&#xFF1A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&amp;&#x5F02;&#x6B65;&#x66F4;&#x65B0;</a></p><ul><li><h3>VD&#x662F;&#x4EC0;&#x4E48;</h3></li></ul><p>&#x672C;&#x8D28;&#x4E0A;&#x6765;&#x8BF4;&#xFF0C;VD&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;JS&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x4E14;&#x6700;&#x5C11;&#x5305;&#x542B;tag&#x3001;props&#x548C;children&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#x3002;&#x4E0D;&#x540C;&#x7684;&#x6846;&#x67B6;&#x5BF9;&#x8FD9;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x547D;&#x540D;&#x4F1A;&#x6709;&#x70B9;&#x5DEE;&#x522B;&#xFF0C;&#x4F46;&#x8868;&#x8FBE;&#x7684;&#x610F;&#x601D;&#x662F;&#x4E00;&#x81F4;&#x7684;&#x3002;&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x662F;&#x6807;&#x7B7E;&#x540D;&#xFF08;tag&#xFF09;&#x3001;&#x5C5E;&#x6027;&#xFF08;props&#xFF09;&#x548C;&#x5B50;&#x5143;&#x7D20;&#x5BF9;&#x8C61;&#xFF08;children&#xFF09;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x5178;&#x578B;&#x7684;VD&#x5BF9;&#x8C61;&#x4F8B;&#x5B50;&#xFF1A;</p><pre><code class="javascript">{
    tag: &quot;div&quot;,
    props: {},
    children: [
        &quot;Hello World&quot;, 
        {
            tag: &quot;ul&quot;,
            props: {},
            children: [{
                tag: &quot;li&quot;,
                props: {
                    id: 1,
                    class: &quot;li-1&quot;
                },
                children: [&quot;&#x7B2C;&quot;, 1]
            }]
        }
    ]
}</code></pre><p>VD&#x8DDF;dom&#x5BF9;&#x8C61;&#x6709;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x4E0A;&#x9762;&#x7684;VD&#x662F;&#x7531;&#x4EE5;&#x4E0B;&#x7684;HTML&#x751F;&#x6210;&#x7684;</p><pre><code class="HTML">&lt;div&gt;
    Hello World
    &lt;ul&gt;
        &lt;li id=&quot;1&quot; class=&quot;li-1&quot;&gt;
            &#x7B2C;1
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</code></pre><p>&#x4E00;&#x4E2A;dom&#x5BF9;&#x8C61;&#xFF0C;&#x6BD4;&#x5982;<code>li</code>&#xFF0C;&#x7531;<code>tag(li)</code>, <code>props({id: 1, class: &quot;li-1&quot;})</code>&#x548C;<code>children([&quot;&#x7B2C;&quot;, 1])</code>&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#x6765;&#x63CF;&#x8FF0;&#x3002;</p><ul><li><h3>&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;VD</h3></li></ul><p>VD&#x4F7F;&#x5F97;&#x5F00;&#x53D1;&#x8005;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x58F0;&#x660E;&#x7684;&#x65B9;&#x5F0F;&#x8868;&#x8FBE;&#x9875;&#x9762;&#x7684;&#x5448;&#x73B0;&#x6548;&#x679C;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x5173;&#x5FC3;DOM&#x64CD;&#x4F5C;&#x7684;&#x76F8;&#x5173;&#x7EC6;&#x8282;&#x3002;DOM&#x5143;&#x7D20;&#x7684;&#x589E;&#x5220;&#x6539;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x4EA4;&#x7ED9;&#x6846;&#x67B6;&#x6765;&#x9AD8;&#x6548;&#x7684;&#x5B8C;&#x6210;&#x3002;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x501F;&#x52A9;VD&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x5730;&#x51CF;&#x5C11;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x7684;&#x6B21;&#x6570;&#xFF0C;&#x4ECE;&#x800C;&#x63D0;&#x9AD8;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x3002;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x4E0B;&#x9875;&#x9762;&#x7684;&#x66F4;&#x65B0;&#x4E00;&#x822C;&#x4F1A;&#x7ECF;&#x8FC7;&#x51E0;&#x4E2A;&#x9636;&#x6BB5;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbfPIZ?w=868&amp;h=810" src="https://static.alili.tech/img/bVbfPIZ?w=868&amp;h=810" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x9875;&#x9762;&#x7684;&#x5448;&#x73B0;&#x4F1A;&#x5206;&#x4EE5;&#x4E0B;3&#x4E2A;&#x9636;&#x6BB5;&#xFF1A;</p><ul><li>JS&#x8BA1;&#x7B97;</li><li>&#x751F;&#x6210;&#x6E32;&#x67D3;&#x6811;</li><li>&#x7ED8;&#x5236;&#x9875;&#x9762;</li></ul><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x91CC;&#x9762;&#xFF0C;JS&#x8BA1;&#x7B97;&#x7528;&#x4E86;<code>691</code>&#x6BEB;&#x79D2;&#xFF0C;&#x751F;&#x6210;&#x6E32;&#x67D3;&#x6811;<code>578</code>&#x6BEB;&#x79D2;&#xFF0C;&#x7ED8;&#x5236;<code>73</code>&#x6BEB;&#x79D2;&#x3002;&#x5982;&#x679C;&#x80FD;&#x6709;&#x6548;&#x7684;&#x51CF;&#x5C11;&#x751F;&#x6210;&#x6E32;&#x67D3;&#x6811;&#x548C;&#x7ED8;&#x5236;&#x6240;&#x82B1;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x7684;&#x6548;&#x7387;&#x4E5F;&#x4F1A;&#x968F;&#x4E4B;&#x63D0;&#x9AD8;&#x3002;<br>&#x901A;&#x8FC7;VD&#x7684;&#x6BD4;&#x8F83;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;&#x591A;&#x4E2A;&#x64CD;&#x4F5C;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x6279;&#x91CF;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4ECE;&#x800C;&#x51CF;&#x5C11;dom&#x91CD;&#x6392;&#x7684;&#x6B21;&#x6570;&#xFF0C;&#x8FDB;&#x800C;&#x7F29;&#x77ED;&#x4E86;&#x751F;&#x6210;&#x6E32;&#x67D3;&#x6811;&#x548C;&#x7ED8;&#x5236;&#x6240;&#x82B1;&#x7684;&#x65F6;&#x95F4;&#x3002;&#x81F3;&#x4E8E;&#x5982;&#x4F55;&#x57FA;&#x4E8E;VD&#x66F4;&#x6709;&#x6548;&#x7387;&#x7684;&#x66F4;&#x65B0;dom&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x6709;&#x8DA3;&#x7684;&#x8BDD;&#x9898;&#xFF0C;&#x65E5;&#x540E;&#x6709;&#x673A;&#x4F1A;&#x5C06;&#x53E6;&#x5199;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x4ECB;&#x7ECD;&#x3002;</p><ul><li><h3>&#x5982;&#x4F55;&#x5B9E;&#x73B0;VD&#x4E0E;&#x771F;&#x5B9E;DOM&#x7684;&#x6620;&#x5C04;</h3></li></ul><p>&#x6211;&#x4EEC;&#x5148;&#x4ECE;&#x5982;&#x4F55;&#x751F;&#x6210;VD&#x8BF4;&#x8D77;&#x3002;&#x501F;&#x52A9;JSX&#x7F16;&#x8BD1;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x6587;&#x4EF6;&#x4E2D;&#x7684;HTML&#x8F6C;&#x5316;&#x6210;&#x51FD;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x751F;&#x6210;VD&#x3002;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><pre><code class="javascript">function render() {
    return (
        &lt;div&gt;
            Hello World
            &lt;ul&gt;
                &lt;li id=&quot;1&quot; class=&quot;li-1&quot;&gt;
                    &#x7B2C;1
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    );
}</code></pre><p>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7ECF;&#x8FC7;JSX&#x7F16;&#x8BD1;&#x540E;&#xFF0C;&#x4F1A;&#x8F93;&#x51FA;&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><pre><code class="javascript">function render() {
    return h(
        &apos;div&apos;,
        null,
        &apos;Hello World&apos;,
        h(
            &apos;ul&apos;,
            null,
            h(
                &apos;li&apos;,
                { id: &apos;1&apos;, &apos;class&apos;: &apos;li-1&apos; },
                &apos;\u7B2C1&apos;
            )
        )
    );
}</code></pre><p>&#x8FD9;&#x91CC;&#x7684;h&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x8D77;&#x4EFB;&#x610F;&#x7684;&#x540D;&#x5B57;&#x3002;&#x8FD9;&#x4E2A;&#x540D;&#x5B57;&#x901A;&#x8FC7;babel&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF1A;</p><pre><code class="javascript">// .babelrc&#x6587;&#x4EF6;
{
  &quot;plugins&quot;: [
    [&quot;transform-react-jsx&quot;, {
      &quot;pragma&quot;: &quot;h&quot;    // &#x8FD9;&#x91CC;&#x53EF;&#x914D;&#x7F6E;&#x4EFB;&#x610F;&#x7684;&#x540D;&#x79F0;
    }]
  ]
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x5B9A;&#x4E49;h&#x51FD;&#x6570;&#xFF0C;&#x5C31;&#x80FD;&#x6784;&#x9020;&#x51FA;VD</p><pre><code class="javascript">function flatten(arr) {
    return [].concat.apply([], arr);
}

function h(tag, props, ...children) {
    return {
        tag, 
        props: props || {}, 
        children: flatten(children) || []
    };
}</code></pre><p>h&#x51FD;&#x6570;&#x4F1A;&#x4F20;&#x5165;&#x4E09;&#x4E2A;&#x6216;&#x4EE5;&#x4E0A;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x524D;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x4E00;&#x4E2A;&#x662F;&#x6807;&#x7B7E;&#x540D;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x5C5E;&#x6027;&#x5BF9;&#x8C61;&#xFF0C;&#x4ECE;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x5F00;&#x59CB;&#x7684;&#x5176;&#x5B83;&#x53C2;&#x6570;&#x90FD;&#x662F;children&#x3002;children&#x5143;&#x7D20;&#x6709;&#x53EF;&#x80FD;&#x662F;&#x6570;&#x7EC4;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x6570;&#x7EC4;&#x89E3;&#x6784;&#x4E00;&#x5C42;&#x3002;&#x6BD4;&#x5982;&#xFF1A;</p><pre><code class="javascript">function render() {
    return (
        &lt;ul&gt;
            &lt;li&gt;0&lt;/li&gt;
            {
                [1, 2, 3].map( i =&gt; (
                    &lt;li&gt;{i}&lt;/li&gt;
                ))
            }
        &lt;/ul&gt;
    );
}

// JSX&#x7F16;&#x8BD1;&#x540E;
function render() {
    return h(
        &apos;ul&apos;,
        null,
        h(
            &apos;li&apos;,
            null,
            &apos;0&apos;
        ),
        /*
         * &#x9700;&#x8981;&#x5C06;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x89E3;&#x6784;&#x51FA;&#x6765;&#x518D;&#x653E;&#x5230;children&#x6570;&#x7EC4;&#x4E2D;
         */
        [1, 2, 3].map(i =&gt; h(
            &apos;li&apos;,
            null,
            i
        ))
    );
}</code></pre><p>&#x7EE7;&#x7EED;&#x4E4B;&#x524D;&#x7684;&#x4F8B;&#x5B50;&#x3002;&#x6267;&#x884C;h&#x51FD;&#x6570;&#x540E;&#xFF0C;&#x6700;&#x7EC8;&#x4F1A;&#x5F97;&#x5230;&#x5982;&#x4E0B;&#x7684;VD&#x5BF9;&#x8C61;&#xFF1A;</p><pre><code class="javascript">{
    tag: &quot;div&quot;,
    props: {},
    children: [
        &quot;Hello World&quot;, 
        {
            tag: &quot;ul&quot;,
            props: {},
            children: [{
                tag: &quot;li&quot;,
                props: {
                    id: 1,
                    class: &quot;li-1&quot;
                },
                children: [&quot;&#x7B2C;&quot;, 1]
            }]
        }
    ]
}</code></pre><p>&#x4E0B;&#x4E00;&#x6B65;&#xFF0C;&#x901A;&#x8FC7;&#x904D;&#x5386;VD&#x5BF9;&#x8C61;&#xFF0C;&#x751F;&#x6210;&#x771F;&#x5B9E;&#x7684;dom</p><pre><code class="javascript">// &#x521B;&#x5EFA;dom&#x5143;&#x7D20;
function createElement(vdom) {
    // &#x5982;&#x679C;vdom&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x8005;&#x6570;&#x5B57;&#x7C7B;&#x578B;&#xFF0C;&#x5219;&#x521B;&#x5EFA;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x6BD4;&#x5982;&#x201C;Hello World&#x201D;
    if (typeof vdom === &apos;string&apos; || typeof vdom === &apos;number&apos;) {
        return doc.createTextNode(vdom);
    }

    const {tag, props, children} = vdom;

    // 1. &#x521B;&#x5EFA;&#x5143;&#x7D20;
    const element = doc.createElement(tag);

    // 2. &#x5C5E;&#x6027;&#x8D4B;&#x503C;
    setProps(element, props);

    // 3. &#x521B;&#x5EFA;&#x5B50;&#x5143;&#x7D20;
    // appendChild&#x5728;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x68C0;&#x67E5;&#x5F53;&#x524D;&#x7684;this&#x662F;&#x4E0D;&#x662F;dom&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x8981;bind&#x4E00;&#x4E0B;
    children.map(createElement)
            .forEach(element.appendChild.bind(element));

    return element;
}

// &#x5C5E;&#x6027;&#x8D4B;&#x503C;
function setProps(element, props) {
    for (let key in props) {
        element.setAttribute(key, props[key]);
    }
}</code></pre><p><code>createElement</code>&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#x540E;&#xFF0C;dom&#x5143;&#x7D20;&#x5C31;&#x521B;&#x5EFA;&#x5B8C;&#x5E76;&#x5C55;&#x793A;&#x5230;&#x9875;&#x9762;&#x4E0A;&#x4E86;&#xFF08;&#x9875;&#x9762;&#x6BD4;&#x8F83;&#x4E11;&#xFF0C;&#x4E0D;&#x8981;&#x4ECB;&#x610F;...&#xFF09;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbhRk1?w=232&amp;h=155" src="https://static.alili.tech/img/bVbhRk1?w=232&amp;h=155" alt="clipboard.png" title="clipboard.png"></span></p><ul><li><h3>&#x603B;&#x7ED3;</h3></li></ul><p>&#x672C;&#x6587;&#x4ECB;&#x7ECD;&#x4E86;VD&#x7684;&#x57FA;&#x672C;&#x6982;&#x5FF5;&#xFF0C;&#x5E76;&#x8BB2;&#x89E3;&#x4E86;&#x5982;&#x4F55;&#x5229;&#x7528;JSX&#x7F16;&#x8BD1;HTML&#x6807;&#x7B7E;&#xFF0C;&#x7136;&#x540E;&#x751F;&#x6210;VD&#xFF0C;&#x8FDB;&#x800C;&#x521B;&#x5EFA;&#x771F;&#x5B9E;dom&#x7684;&#x8FC7;&#x7A0B;&#x3002;&#x4E0B;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x5C06;&#x4F1A;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;VD Diff&#x7B97;&#x6CD5;&#xFF0C;&#x627E;&#x51FA;2&#x4E2A;VD&#x7684;&#x5DEE;&#x5F02;&#x5E76;&#x5C06;&#x66F4;&#x65B0;&#x7684;&#x5143;&#x7D20;&#x6620;&#x5C04;&#x5230;dom&#x4E2D;&#x53BB;&#xFF1A;<a href="https://segmentfault.com/a/1190000016145981">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E8C;&#xFF09;&#xFF1A;Virtual Dom&#x7684;&#x66F4;&#x65B0;</a></p><p>P.S.: &#x60F3;&#x770B;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x89C1;&#x8FD9;&#x91CC;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5FC5;&#x8981;&#x5EFA;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#x7684;&#x8BDD;&#x8BF7;&#x7559;&#x8A00;&#x7ED9;&#x6211;&#xFF1A;<a href="https://gist.github.com/dickenslian/86c4e266ae5f2134373376133bec9e3d" rel="nofollow noreferrer">&#x4EE3;&#x7801;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的Virtual DOM（一）：Virtual Dom介绍

## 原文链接
[https://segmentfault.com/a/1190000016129036](https://segmentfault.com/a/1190000016129036)

