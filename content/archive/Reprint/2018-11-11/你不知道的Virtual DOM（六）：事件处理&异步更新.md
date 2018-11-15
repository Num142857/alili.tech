---
title: '你不知道的Virtual DOM 6 : 事件处理&异步更新'
hidden: true
categories: reprint
slug: fa438533
date: 2018-11-11 02:30:07
---

{{< raw >}}
<ul><li><h3 id="articleHeader0">&#x524D;&#x8A00;</h3></li></ul><p>&#x76EE;&#x524D;&#x6700;&#x6D41;&#x884C;&#x7684;&#x4E24;&#x5927;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;React&#x548C;Vue&#xFF0C;&#x90FD;&#x4E0D;&#x7EA6;&#x800C;&#x540C;&#x7684;&#x501F;&#x52A9;Virtual DOM&#x6280;&#x672F;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x7684;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;Virtual DOM&#xFF1F;&#x5B83;&#x662F;&#x901A;&#x8FC7;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x53BB;&#x63D0;&#x5347;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x7684;&#x5462;&#xFF1F;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;Virtual DOM&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x5E76;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Diff&#x7B97;&#x6CD5;&#x6765;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x3002;&#x672C;&#x6587;&#x7684;&#x5185;&#x5BB9;&#x8131;&#x79BB;&#x4E8E;&#x4EFB;&#x4F55;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;&#x53EA;&#x8BB2;&#x6700;&#x7EAF;&#x7CB9;&#x7684;Virtual DOM&#x3002;&#x6572;&#x5355;&#x8BCD;&#x592A;&#x7D2F;&#x4E86;&#xFF0C;&#x4E0B;&#x6587;Virtual DOM&#x4E00;&#x5F8B;&#x7528;VD&#x8868;&#x793A;&#x3002;</p><p>&#x8FD9;&#x662F;VD&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x7B2C;&#x516D;&#x7BC7;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x672C;&#x7CFB;&#x5217;&#x5176;&#x5B83;&#x6587;&#x7AE0;&#x7684;&#x4F20;&#x9001;&#x95E8;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000016129036">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E00;&#xFF09;&#xFF1A;Virtual Dom&#x4ECB;&#x7ECD;</a><br><a href="https://segmentfault.com/a/1190000016145981" target="_blank">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E8C;&#xFF09;&#xFF1A;Virtual Dom&#x7684;&#x66F4;&#x65B0;</a><br><a href="https://segmentfault.com/a/1190000016186666">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E09;&#xFF09;&#xFF1A;Virtual Dom&#x66F4;&#x65B0;&#x4F18;&#x5316;</a><br><a href="https://segmentfault.com/a/1190000016200003" target="_blank">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x56DB;&#xFF09;&#xFF1A;key&#x7684;&#x4F5C;&#x7528;</a><br><a href="https://segmentfault.com/a/1190000016248276">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E94;&#xFF09;&#xFF1A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</a><br><a href="https://segmentfault.com/a/1190000016328371" target="_blank">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x516D;&#xFF09;&#xFF1A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&amp;&#x5F02;&#x6B65;&#x66F4;&#x65B0;</a></p><p>&#x4ECA;&#x5929;&#xFF0C;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x5728;&#x4E4B;&#x524D;&#x9879;&#x76EE;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x6269;&#x5C55;&#x529F;&#x80FD;&#x3002;&#x5728;&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x4ECB;&#x7ECD;&#x4E86;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x6E32;&#x67D3;&#x548C;&#x66F4;&#x65B0;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x3002;&#x4E3A;&#x4E86;&#x9A8C;&#x8BC1;setState&#x662F;&#x5426;&#x751F;&#x6548;&#xFF0C;&#x8FD8;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;setTimeout&#x65B9;&#x6CD5;&#xFF0C;5&#x79D2;&#x540E;&#x66F4;&#x65B0;state&#x3002;&#x5728;&#x73B0;&#x5B9E;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;state&#x7684;&#x6539;&#x53D8;&#x5F80;&#x5F80;&#x662F;&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x7684;&#xFF0C;&#x5982;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x3001;&#x952E;&#x76D8;&#x4E8B;&#x4EF6;&#x548C;&#x6EDA;&#x52A8;&#x4E8B;&#x4EF6;&#x7B49;&#x3002;&#x4E0B;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5C06;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x52A0;&#x5165;&#x5230;&#x9879;&#x76EE;&#x5F53;&#x4E2D;&#x3002;</p><ul><li><h3 id="articleHeader1">&#x5B9E;&#x73B0;&#x4E8B;&#x4EF6;&#x5904;&#x7406;</h3></li></ul><p>&#x4E8B;&#x4EF6;&#x7684;&#x7ED1;&#x5B9A;&#x4E00;&#x822C;&#x662F;&#x5B9A;&#x4E49;&#x5728;&#x5143;&#x7D20;&#x6216;&#x8005;&#x7EC4;&#x4EF6;&#x7684;&#x5C5E;&#x6027;&#x5F53;&#x4E2D;&#xFF0C;&#x4E4B;&#x524D;&#x5BF9;&#x5C5E;&#x6027;&#x7684;&#x521D;&#x59CB;&#x5316;&#x548C;&#x66F4;&#x65B0;&#x6CA1;&#x6709;&#x8003;&#x8651;&#x652F;&#x6301;&#x4E8B;&#x4EF6;&#xFF0C;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x8D4B;&#x503C;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5C5E;&#x6027;&#x8D4B;&#x503C;
function setProps(element, props) {
     // &#x5C5E;&#x6027;&#x8D4B;&#x503C;
    element[ATTR_KEY] = props;

    for (let key in props) {
        element.setAttribute(key, props[key]);
    }
}

// &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;
function diffProps(newVDom, element) {
    let newProps = {...element[ATTR_KEY]};
    const allProps = {...newProps, ...newVDom.props};

    // &#x83B7;&#x53D6;&#x65B0;&#x65E7;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x540D;&#x540E;&#xFF0C;&#x518D;&#x9010;&#x4E00;&#x5224;&#x65AD;&#x65B0;&#x65E7;&#x5C5E;&#x6027;&#x503C;
    Object.keys(allProps).forEach((key) =&gt; {
        const oldValue = newProps[key];
        const newValue = newVDom.props[key];

        // &#x5220;&#x9664;&#x5C5E;&#x6027;
        if (newValue == undefined) {
            element.removeAttribute(key);
            delete newProps[key];
        } 
        // &#x66F4;&#x65B0;&#x5C5E;&#x6027;
        else if (oldValue == undefined || oldValue !== newValue) {
            element.setAttribute(key, newValue);
            newProps[key] = newValue;
        }
    }
)

    // &#x5C5E;&#x6027;&#x91CD;&#x65B0;&#x8D4B;&#x503C;
    element[ATTR_KEY] = newProps;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5C5E;&#x6027;&#x8D4B;&#x503C;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setProps</span>(<span class="hljs-params">element, props</span>) </span>{
     <span class="hljs-comment">// &#x5C5E;&#x6027;&#x8D4B;&#x503C;</span>
    element[ATTR_KEY] = props;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> props) {
        element.setAttribute(key, props[key]);
    }
}

<span class="hljs-comment">// &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffProps</span>(<span class="hljs-params">newVDom, element</span>) </span>{
    <span class="hljs-keyword">let</span> newProps = {...element[ATTR_KEY]};
    <span class="hljs-keyword">const</span> allProps = {...newProps, ...newVDom.props};

    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x65B0;&#x65E7;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x540D;&#x540E;&#xFF0C;&#x518D;&#x9010;&#x4E00;&#x5224;&#x65AD;&#x65B0;&#x65E7;&#x5C5E;&#x6027;&#x503C;</span>
    <span class="hljs-built_in">Object</span>.keys(allProps).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> oldValue = newProps[key];
        <span class="hljs-keyword">const</span> newValue = newVDom.props[key];

        <span class="hljs-comment">// &#x5220;&#x9664;&#x5C5E;&#x6027;</span>
        <span class="hljs-keyword">if</span> (newValue == <span class="hljs-literal">undefined</span>) {
            element.removeAttribute(key);
            <span class="hljs-keyword">delete</span> newProps[key];
        } 
        <span class="hljs-comment">// &#x66F4;&#x65B0;&#x5C5E;&#x6027;</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldValue == <span class="hljs-literal">undefined</span> || oldValue !== newValue) {
            element.setAttribute(key, newValue);
            newProps[key] = newValue;
        }
    }
)

    <span class="hljs-comment">// &#x5C5E;&#x6027;&#x91CD;&#x65B0;&#x8D4B;&#x503C;</span>
    element[ATTR_KEY] = newProps;
}</code></pre><p><code>setProps</code>&#x662F;&#x5728;&#x521B;&#x5EFA;&#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x800C;<code>diffProps</code>&#x5219;&#x662F;&#x5728;diff&#x8FC7;&#x7A0B;&#x4E2D;&#x8C03;&#x7528;&#x7684;&#x3002;&#x5982;&#x679C;&#x9700;&#x8981;&#x652F;&#x6301;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x591A;&#x505A;&#x4E00;&#x4E2A;&#x5224;&#x65AD;&#x3002;&#x5982;&#x679C;&#x5C5E;&#x6027;&#x540D;&#x79F0;&#x662F;<code>on</code>&#x5F00;&#x5934;&#x7684;&#x8BDD;&#xFF0C;&#x6BD4;&#x5982;onClick&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x8981;&#x5728;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x4E0A;&#x6CE8;&#x518C;&#x6216;&#x5220;&#x9664;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5C5E;&#x6027;&#x8D4B;&#x503C;
function setProps(element, props) {
     // &#x5C5E;&#x6027;&#x8D4B;&#x503C;
    element[ATTR_KEY] = props;

    for (let key in props) {
        // on&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x5F53;&#x4F5C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;
        if (key.substring(0, 2) == &apos;on&apos;) {
            const evtName = key.substring(2).toLowerCase();
            element.addEventListener(evtName, evtProxy);
            (element._evtListeners || (element._evtListeners = {}))[evtName] = props[key];
        } else {
            element.setAttribute(key, props[key]);
        }
    }
}

function evtProxy(evt) {
    this._evtListeners[evt.type](evt);
}

// &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;
function diffProps(newVDom, element) {
    let newProps = {...element[ATTR_KEY]};
    const allProps = {...newProps, ...newVDom.props};

    // &#x83B7;&#x53D6;&#x65B0;&#x65E7;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x540D;&#x540E;&#xFF0C;&#x518D;&#x9010;&#x4E00;&#x5224;&#x65AD;&#x65B0;&#x65E7;&#x5C5E;&#x6027;&#x503C;
    Object.keys(allProps).forEach((key) =&gt; {
        const oldValue = newProps[key];
        const newValue = newVDom.props[key];

        // on&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x5F53;&#x4F5C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;
        if (key.substring(0, 2) == &apos;on&apos;) {
            const evtName = key.substring(2).toLowerCase();
            if (newValue) {
                element.addEventListener(evtName, evtProxy);
            } else {
                element.removeEventListener(evtName, evtProxy);
            }
            (element._evtListeners || (element._evtListeners = {}))[evtName] = newValue;
        } else {
            // &#x5220;&#x9664;&#x5C5E;&#x6027;
            if (newValue == undefined) {
                element.removeAttribute(key);
                delete newProps[key];
            } 
            // &#x66F4;&#x65B0;&#x5C5E;&#x6027;
            else if (oldValue == undefined || oldValue !== newValue) {
                element.setAttribute(key, newValue);
                newProps[key] = newValue;
            }
        }
    }
)

    // &#x5C5E;&#x6027;&#x91CD;&#x65B0;&#x8D4B;&#x503C;
    element[ATTR_KEY] = newProps;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5C5E;&#x6027;&#x8D4B;&#x503C;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setProps</span>(<span class="hljs-params">element, props</span>) </span>{
     <span class="hljs-comment">// &#x5C5E;&#x6027;&#x8D4B;&#x503C;</span>
    element[ATTR_KEY] = props;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> props) {
        <span class="hljs-comment">// on&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x5F53;&#x4F5C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;</span>
        <span class="hljs-keyword">if</span> (key.substring(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>) == <span class="hljs-string">&apos;on&apos;</span>) {
            <span class="hljs-keyword">const</span> evtName = key.substring(<span class="hljs-number">2</span>).toLowerCase();
            element.addEventListener(evtName, evtProxy);
            (element._evtListeners || (element._evtListeners = {}))[evtName] = props[key];
        } <span class="hljs-keyword">else</span> {
            element.setAttribute(key, props[key]);
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">evtProxy</span>(<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-keyword">this</span>._evtListeners[evt.type](evt);
}

<span class="hljs-comment">// &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffProps</span>(<span class="hljs-params">newVDom, element</span>) </span>{
    <span class="hljs-keyword">let</span> newProps = {...element[ATTR_KEY]};
    <span class="hljs-keyword">const</span> allProps = {...newProps, ...newVDom.props};

    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x65B0;&#x65E7;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x540D;&#x540E;&#xFF0C;&#x518D;&#x9010;&#x4E00;&#x5224;&#x65AD;&#x65B0;&#x65E7;&#x5C5E;&#x6027;&#x503C;</span>
    <span class="hljs-built_in">Object</span>.keys(allProps).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> oldValue = newProps[key];
        <span class="hljs-keyword">const</span> newValue = newVDom.props[key];

        <span class="hljs-comment">// on&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x5F53;&#x4F5C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;</span>
        <span class="hljs-keyword">if</span> (key.substring(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>) == <span class="hljs-string">&apos;on&apos;</span>) {
            <span class="hljs-keyword">const</span> evtName = key.substring(<span class="hljs-number">2</span>).toLowerCase();
            <span class="hljs-keyword">if</span> (newValue) {
                element.addEventListener(evtName, evtProxy);
            } <span class="hljs-keyword">else</span> {
                element.removeEventListener(evtName, evtProxy);
            }
            (element._evtListeners || (element._evtListeners = {}))[evtName] = newValue;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// &#x5220;&#x9664;&#x5C5E;&#x6027;</span>
            <span class="hljs-keyword">if</span> (newValue == <span class="hljs-literal">undefined</span>) {
                element.removeAttribute(key);
                <span class="hljs-keyword">delete</span> newProps[key];
            } 
            <span class="hljs-comment">// &#x66F4;&#x65B0;&#x5C5E;&#x6027;</span>
            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldValue == <span class="hljs-literal">undefined</span> || oldValue !== newValue) {
                element.setAttribute(key, newValue);
                newProps[key] = newValue;
            }
        }
    }
)

    <span class="hljs-comment">// &#x5C5E;&#x6027;&#x91CD;&#x65B0;&#x8D4B;&#x503C;</span>
    element[ATTR_KEY] = newProps;
}</code></pre><p>&#x6240;&#x6709;&#x7684;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;&#x90FD;&#x5B58;&#x5230;dom&#x5143;&#x7D20;&#x7684;_evtListeners&#x5F53;&#x4E2D;&#xFF0C;&#x5F53;&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C06;&#x4E8B;&#x4EF6;&#x4F20;&#x7ED9;&#x91CC;&#x9762;&#x5BF9;&#x5E94;&#x7684;&#x65B9;&#x6CD5;&#x5904;&#x7406;&#x3002;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x597D;&#x5904;&#x662F;&#x5982;&#x679C;&#x4EE5;&#x540E;&#x8981;&#x5BF9;&#x6D4F;&#x89C8;&#x5668;&#x4F20;&#x5165;&#x7684;&#x4E8B;&#x4EF6;<code>evt</code>&#x505A;&#x8FDB;&#x4E00;&#x6B65;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;<code>evtProxy</code>&#x51FD;&#x6570;&#x91CC;&#x9762;&#x5904;&#x7406;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x65B0;&#x589E;&#x4E00;&#x4E2A;<code>onClick</code>&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x6539;&#x53D8;state&#x91CC;&#x9762;&#x7684;&#x503C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: &apos;Tina&apos;,
            count: 1
        }
    }

    elmClick() {
        this.setState({name: `Jack${this.state.count}`, count: this.state.count + 1 });
    }

    render() {
        return(
            &lt;div id=&quot;myComp&quot; onClick={this.elmClick.bind(this)}&gt;
                &lt;div&gt;This is My Component! {this.props.count}&lt;/div&gt;
                &lt;div&gt;name: {this.state.name}&lt;/div&gt;
            &lt;/div&gt;
        )
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Tina&apos;</span>,
            <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>
        }
    }

    elmClick() {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">name</span>: <span class="hljs-string">`Jack<span class="hljs-subst">${<span class="hljs-keyword">this</span>.state.count}</span>`</span>, <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span> });
    }

    render() {
        <span class="hljs-keyword">return</span>(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;myComp&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.elmClick.bind(this)}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>This is My Component! {this.props.count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>name: {this.state.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre><p>&#x9879;&#x76EE;&#x8FD0;&#x884C;&#x7684;&#x6548;&#x679C;&#x662F;&#x6BCF;&#x5F53;&#x6211;&#x70B9;&#x4E00;&#x4E0B;MyComp&#x7EC4;&#x4EF6;&#x7684;&#x533A;&#x57DF;&#xFF0C;&#x91CC;&#x9762;&#x7684;name&#x5C31;&#x4F1A;&#x968F;&#x4E4B;&#x9A6C;&#x4E0A;&#x66F4;&#x65B0;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgFSQ?w=666&amp;h=528" src="https://static.alili.tech/img/bVbgFSQ?w=666&amp;h=528" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li><h3 id="articleHeader2">setState&#x5F02;&#x6B65;&#x66F4;&#x65B0;</h3></li></ul><p>&#x7528;&#x8FC7;React&#x7684;&#x670B;&#x53CB;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x4E3A;&#x4E86;&#x51CF;&#x5C11;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x6E32;&#x67D3;&#xFF0C;&#x63D0;&#x9AD8;&#x6027;&#x80FD;&#xFF0C;React&#x5E76;&#x4E0D;&#x662F;&#x5728;&#x6211;&#x4EEC;&#x6BCF;&#x6B21;setState&#x7684;&#x65F6;&#x5019;&#x90FD;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#xFF0C;&#x800C;&#x662F;&#x5C06;&#x4E00;&#x4E2A;&#x540C;&#x6B65;&#x64CD;&#x4F5C;&#x91CC;&#x9762;&#x7684;&#x591A;&#x4E2A;setState&#x8FDB;&#x884C;&#x5408;&#x5E76;&#x540E;&#x518D;&#x6E32;&#x67D3;&#xFF0C;&#x7ED9;&#x4EBA;&#x5F02;&#x6B65;&#x6E32;&#x67D3;&#x7684;&#x611F;&#x89C9;&#x3002;&#x770B;&#x8FC7;&#x6E90;&#x7801;&#x7684;&#x90FD;&#x5E94;&#x8BE5;&#x77E5;&#x9053;&#xFF0C;React&#x662F;&#x901A;&#x8FC7;&#x4E8B;&#x52A1;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5408;&#x5E76;&#x591A;&#x4E2A;setState&#x64CD;&#x4F5C;&#x7684;&#xFF0C;&#x672C;&#x8D28;&#x6765;&#x8BF4;&#x8FD8;&#x662F;&#x540C;&#x6B65;&#x7684;&#x3002;&#x5982;&#x679C;&#x60F3;&#x5BF9;&#x5176;&#x4F5C;&#x66F4;&#x6DF1;&#x5165;&#x7684;&#x5B66;&#x4E60;&#xFF0C;&#x63A8;&#x8350;&#x770B;<a href="https://segmentfault.com/a/1190000015615057">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;</a>&#x3002;</p><p>&#x4E3A;&#x4E86;&#x8FBE;&#x5230;&#x5408;&#x5E76;&#x64CD;&#x4F5C;&#xFF0C;&#x51CF;&#x5C11;&#x6E32;&#x67D3;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x6700;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#x5F02;&#x6B65;&#x6E32;&#x67D3;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x3002;&#x5728;&#x4E0A;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#x91CC;&#xFF0C;setState&#x662F;&#x8FD9;&#x4E48;&#x5B9A;&#x4E49;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component {
    ...
        
    setState(newState) {
        this.state = {...this.state, ...newState};
        const vdom = this.render();
        diff(this.dom, vdom, this.parent);
    }

    ...
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
    ...
        
    setState(newState) {
        <span class="hljs-keyword">this</span>.state = {...this.state, ...newState};
        <span class="hljs-keyword">const</span> vdom = <span class="hljs-keyword">this</span>.render();
        diff(<span class="hljs-keyword">this</span>.dom, vdom, <span class="hljs-keyword">this</span>.parent);
    }

    ...
};</code></pre><p>state&#x66F4;&#x65B0;&#x540E;&#x76F4;&#x63A5;&#x5C31;&#x8FDB;&#x884C;diff&#x64CD;&#x4F5C;&#xFF0C;&#x8FDB;&#x800C;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;onClick&#x91CC;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6539;&#x6210;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="elmClick() {
        this.setState({name: `Jack${this.state.count}`, count: this.state.count + 1 });
        this.setState({name: `Jack${this.state.count}`, count: this.state.count + 1 });
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">elmClick() {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">name</span>: <span class="hljs-string">`Jack<span class="hljs-subst">${<span class="hljs-keyword">this</span>.state.count}</span>`</span>, <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span> });
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">name</span>: <span class="hljs-string">`Jack<span class="hljs-subst">${<span class="hljs-keyword">this</span>.state.count}</span>`</span>, <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span> });
    }</code></pre><p>&#x9875;&#x9762;&#x4F1A;&#x6E32;&#x67D3;2&#x6B21;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x628A;&#x5B83;&#x6539;&#x9020;&#x6210;&#x4E0B;&#x9762;&#x7684;&#x6837;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B49;&#x5F85;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x6570;&#x7EC4;
let pendingRenderComponents = [];

class Component {
    ...
        
    setState(newState) {
        this.state = {...this.state, ...newState};
        enqueueRender(this);
    }

    ...
};

function enqueueRender(component) {
    // &#x5982;&#x679C;push&#x540E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x4E3A;1&#xFF0C;&#x5219;&#x5C06;&#x5F02;&#x6B65;&#x5237;&#x65B0;&#x4EFB;&#x52A1;&#x52A0;&#x5165;&#x5230;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x5F53;&#x4E2D;
    if (pendingRenderComponents.push(component) == 1) {
        if (typeof Promise==&apos;function&apos;) {
            Promise.resolve().then(renderComponent);
        } else {
            setTimeout(renderComponent, 0);
        }
    }
}

function renderComponent() {
    // &#x7EC4;&#x4EF6;&#x53BB;&#x91CD;
    const uniquePendingRenderComponents = [...new Set(pendingRenderComponents)];

    // &#x6E32;&#x67D3;&#x7EC4;&#x4EF6;
    uniquePendingRenderComponents.forEach(component =&gt; {
        const vdom = component.render();
        diff(component.dom, vdom, component.parent);
    });

    // &#x6E05;&#x7A7A;&#x5F85;&#x6E32;&#x67D3;&#x5217;&#x8868;
    pendingRenderComponents = [];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x7B49;&#x5F85;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x6570;&#x7EC4;</span>
<span class="hljs-keyword">let</span> pendingRenderComponents = [];

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> </span>{
    ...
        
    setState(newState) {
        <span class="hljs-keyword">this</span>.state = {...this.state, ...newState};
        enqueueRender(<span class="hljs-keyword">this</span>);
    }

    ...
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueueRender</span>(<span class="hljs-params">component</span>) </span>{
    <span class="hljs-comment">// &#x5982;&#x679C;push&#x540E;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x4E3A;1&#xFF0C;&#x5219;&#x5C06;&#x5F02;&#x6B65;&#x5237;&#x65B0;&#x4EFB;&#x52A1;&#x52A0;&#x5165;&#x5230;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x5F53;&#x4E2D;</span>
    <span class="hljs-keyword">if</span> (pendingRenderComponents.push(component) == <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span>==<span class="hljs-string">&apos;function&apos;</span>) {
            <span class="hljs-built_in">Promise</span>.resolve().then(renderComponent);
        } <span class="hljs-keyword">else</span> {
            setTimeout(renderComponent, <span class="hljs-number">0</span>);
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderComponent</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x53BB;&#x91CD;</span>
    <span class="hljs-keyword">const</span> uniquePendingRenderComponents = [...new <span class="hljs-built_in">Set</span>(pendingRenderComponents)];

    <span class="hljs-comment">// &#x6E32;&#x67D3;&#x7EC4;&#x4EF6;</span>
    uniquePendingRenderComponents.forEach(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> vdom = component.render();
        diff(component.dom, vdom, component.parent);
    });

    <span class="hljs-comment">// &#x6E05;&#x7A7A;&#x5F85;&#x6E32;&#x67D3;&#x5217;&#x8868;</span>
    pendingRenderComponents = [];
}</code></pre><p>&#x5F53;&#x7B2C;&#x4E00;&#x6B21;<code>setState</code>&#x6210;&#x529F;&#x540E;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x9A6C;&#x4E0A;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#xFF0C;&#x800C;&#x662F;&#x5C06;&#x7EC4;&#x4EF6;&#x5B58;&#x5165;&#x5F85;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x5217;&#x8868;&#x5F53;&#x4E2D;&#x3002;&#x5982;&#x679C;&#x5217;&#x8868;&#x662F;&#x7A7A;&#x7684;&#xFF0C;&#x5219;&#x5B58;&#x5165;&#x7EC4;&#x4EF6;&#x540E;&#x5C06;&#x5F02;&#x6B65;&#x5237;&#x65B0;&#x4EFB;&#x52A1;&#x52A0;&#x5165;&#x5230;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x5F53;&#x4E2D;&#x3002;&#x5F53;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x652F;&#x6301;Promise&#x65F6;&#xFF0C;&#x901A;&#x8FC7;&#x5FAE;&#x4EFB;&#x52A1;&#x8FD0;&#x884C;&#xFF0C;&#x5426;&#x5219;&#x901A;&#x8FC7;&#x5B8F;&#x4EFB;&#x52A1;&#x8FD0;&#x884C;&#x3002;&#x5FAE;&#x4EFB;&#x52A1;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x95F4;&#x662F;&#x5F53;&#x524D;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x7684;&#x672B;&#x5C3E;&#xFF0C;&#x800C;&#x5B8F;&#x4EFB;&#x52A1;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x95F4;&#x662F;&#x4E0B;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x3002;&#x6240;&#x4EE5;&#x4F18;&#x5148;&#x4F7F;&#x7528;&#x5FAE;&#x4EFB;&#x52A1;&#x3002;</p><p>&#x7D27;&#x63A5;&#x7740;&#x8FDB;&#x884C;&#x7B2C;&#x4E8C;&#x6B21;<code>setState</code>&#x64CD;&#x4F5C;&#xFF0C;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x5C06;&#x7EC4;&#x4EF6;&#x5B58;&#x5165;&#x5F85;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x5217;&#x8868;&#x5F53;&#x4E2D;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x4E3B;&#x7EBF;&#x7A0B;&#x7684;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x5B8C;&#x4E86;&#xFF0C;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x3002;</p><p>&#x5F53;&#x5F02;&#x6B65;&#x5237;&#x65B0;&#x4EFB;&#x52A1;&#x542F;&#x52A8;&#x65F6;&#xFF0C;&#x5C06;&#x5F85;&#x6E32;&#x67D3;&#x5217;&#x8868;&#x53BB;&#x91CD;&#x540E;&#x5BF9;&#x91CC;&#x9762;&#x7684;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#x3002;&#x7B49;&#x6E32;&#x67D3;&#x5B8C;&#x6210;&#x540E;&#x518D;&#x6E05;&#x7A7A;&#x5F85;&#x6E32;&#x67D3;&#x5217;&#x8868;&#x3002;&#x6B64;&#x65F6;&#xFF0C;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;&#x662F;2&#x6B21;<code>setState</code>&#x5408;&#x5E76;&#x540E;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x4F1A;&#x8FDB;&#x884C;&#x4E00;&#x6B21;<code>diff</code>&#x64CD;&#x4F5C;&#xFF0C;&#x6E32;&#x67D3;&#x4E00;&#x6B21;&#x3002;</p><ul><li><h3 id="articleHeader3">&#x603B;&#x7ED3;</h3></li></ul><p>&#x672C;&#x6587;&#x57FA;&#x4E8E;&#x4E0A;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x52A0;&#x5165;&#x4E86;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x529F;&#x80FD;&#xFF0C;&#x540C;&#x65F6;&#x901A;&#x8FC7;&#x5F02;&#x6B65;&#x5237;&#x65B0;&#x7684;&#x65B9;&#x6CD5;&#x63D0;&#x9AD8;&#x4E86;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x3002;</p><p>&#x8FD9;&#x662F;VD&#x7CFB;&#x5217;&#x7684;&#x6700;&#x540E;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x3002;&#x672C;&#x7CFB;&#x5217;&#x4ECE;<code>&#x4EC0;&#x4E48;&#x662F;Virtual Dom</code>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x51FA;&#x53D1;,&#x8BB2;&#x89E3;&#x4E86;VD&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3001;&#x6BD4;&#x8F83;&#x65B9;&#x5F0F;&#x548C;&#x66F4;&#x65B0;&#x6D41;&#x7A0B;&#xFF0C;&#x5E76;&#x5728;&#x6B64;&#x57FA;&#x7840;&#x4E0A;&#x8FDB;&#x884C;&#x529F;&#x80FD;&#x6269;&#x5C55;&#x548C;&#x6027;&#x80FD;&#x4F18;&#x5316;&#xFF0C;&#x652F;&#x6301;key&#x5143;&#x7D20;&#x590D;&#x7528;&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF0C;dom&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x548C;setState&#x5F02;&#x6B65;&#x66F4;&#x65B0;&#x3002;&#x603B;&#x5171;&#x4E09;&#x767E;&#x591A;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;mvvm&#x5E93;&#x7684;&#x6838;&#x5FC3;&#x529F;&#x80FD;&#x3002;</p><p>&#x6709;&#x5173;VD&#xFF0C;&#x5982;&#x679C;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x60F3;&#x4E86;&#x89E3;&#x7684;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#xFF0C;&#x6709;&#x95EE;&#x5FC5;&#x7B54;&#x3002;</p><p>P.S.: &#x60F3;&#x770B;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x89C1;&#x8FD9;&#x91CC;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5FC5;&#x8981;&#x5EFA;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#x7684;&#x8BDD;&#x8BF7;&#x7559;&#x8A00;&#x7ED9;&#x6211;&#xFF1A;<a href="https://gist.github.com/dickenslian/e449becf8f8292f1164524ec9ec76788" rel="nofollow noreferrer" target="_blank">&#x4EE3;&#x7801;</a><button class="btn btn-xs btn-default ml10 preview" data-url="dickenslian/e449becf8f8292f1164524ec9ec76788" data-typeid="1">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的Virtual DOM（六）：事件处理&异步更新

## 原文链接
[https://segmentfault.com/a/1190000016328371](https://segmentfault.com/a/1190000016328371)

