---
title: 你不知道的Virtual DOM（三）：Virtual Dom更新优化
hidden: true
categories: [reprint]
slug: 64ddd581
date: 2018-11-14 02:30:09
---

{{< raw >}}
<ul><li><h3>&#x524D;&#x8A00;</h3></li></ul><p>&#x76EE;&#x524D;&#x6700;&#x6D41;&#x884C;&#x7684;&#x4E24;&#x5927;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;React&#x548C;Vue&#xFF0C;&#x90FD;&#x4E0D;&#x7EA6;&#x800C;&#x540C;&#x7684;&#x501F;&#x52A9;Virtual DOM&#x6280;&#x672F;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x7684;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;Virtual DOM&#xFF1F;&#x5B83;&#x662F;&#x901A;&#x8FC7;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x53BB;&#x63D0;&#x5347;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x7684;&#x5462;&#xFF1F;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;Virtual DOM&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x5E76;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Diff&#x7B97;&#x6CD5;&#x6765;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x3002;&#x672C;&#x6587;&#x7684;&#x5185;&#x5BB9;&#x8131;&#x79BB;&#x4E8E;&#x4EFB;&#x4F55;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;&#x53EA;&#x8BB2;&#x6700;&#x7EAF;&#x7CB9;&#x7684;Virtual DOM&#x3002;&#x6572;&#x5355;&#x8BCD;&#x592A;&#x7D2F;&#x4E86;&#xFF0C;&#x4E0B;&#x6587;Virtual DOM&#x4E00;&#x5F8B;&#x7528;VD&#x8868;&#x793A;&#x3002;</p><p>&#x8FD9;&#x662F;VD&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x7B2C;&#x4E09;&#x7BC7;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x672C;&#x7CFB;&#x5217;&#x5176;&#x5B83;&#x6587;&#x7AE0;&#x7684;&#x4F20;&#x9001;&#x95E8;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000016129036">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E00;&#xFF09;&#xFF1A;Virtual Dom&#x4ECB;&#x7ECD;</a><br><a href="https://segmentfault.com/a/1190000016145981">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E8C;&#xFF09;&#xFF1A;Virtual Dom&#x7684;&#x66F4;&#x65B0;</a><br><a href="https://segmentfault.com/a/1190000016186666">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E09;&#xFF09;&#xFF1A;Virtual Dom&#x66F4;&#x65B0;&#x4F18;&#x5316;</a><br><a href="https://segmentfault.com/a/1190000016200003">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x56DB;&#xFF09;&#xFF1A;key&#x7684;&#x4F5C;&#x7528;</a><br><a href="https://segmentfault.com/a/1190000016248276">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E94;&#xFF09;&#xFF1A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</a><br><a href="https://segmentfault.com/a/1190000016328371">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x516D;&#xFF09;&#xFF1A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&amp;&#x5F02;&#x6B65;&#x66F4;&#x65B0;</a></p><p>&#x672C;&#x6587;&#x57FA;&#x4E8E;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x7B2C;&#x4E8C;&#x7BC7;&#xFF0C;&#x5BF9;VD&#x7684;&#x6BD4;&#x8F83;&#x8FC7;&#x7A0B;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x3002;</p><ul><li><h3>&#x4F18;&#x5316;&#x4E00;&#xFF1A;&#x7701;&#x7565;patch&#x5BF9;&#x8C61;&#xFF0C;&#x76F4;&#x63A5;&#x66F4;&#x65B0;dom</h3></li></ul><p>&#x5728;&#x4E0A;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x901A;&#x8FC7;&#x5728;diff&#x8FC7;&#x7A0B;&#x4E2D;&#x751F;&#x6210;patch&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x66F4;&#x65B0;dom&#x3002;</p><pre><code class="javascript">function tick(element) {
    if (state.num &gt; 20) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view();

    // &#x751F;&#x6210;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;
    const patchObj = diff(preVDom, newVDom);

    preVDom = newVDom;

    // &#x7ED9;dom&#x6253;&#x4E2A;&#x8865;&#x4E01;
    patch(element, patchObj);
}</code></pre><p>&#x5B9E;&#x9645;&#x4E0A;&#x8FD9;&#x6B65;&#x662F;&#x591A;&#x4F59;&#x7684;&#x3002;&#x65E2;&#x7136;&#x5728;diff&#x7684;&#x65F6;&#x5019;&#x5C31;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x8981;&#x5982;&#x4F55;&#x64CD;&#x4F5C;dom&#x4E86;&#xFF0C;&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x76F4;&#x63A5;&#x5728;diff&#x91CC;&#x9762;&#x66F4;&#x65B0;&#x5462;&#xFF1F;&#x5148;&#x6765;&#x56DE;&#x987E;&#x4E0B;&#x4E4B;&#x524D;&#x7684;diff&#x4EE3;&#x7801;&#xFF1A;</p><pre><code class="javascript">function diff(oldVDom, newVDom) {
    // &#x65B0;&#x5EFA;node
    if (oldVDom == undefined) {
        return {
            type: nodePatchTypes.CREATE,
            vdom: newVDom
        }
    }

    // &#x5220;&#x9664;node
    if (newVDom == undefined) {
        return {
            type: nodePatchTypes.REMOVE
        }
    }

    // &#x66FF;&#x6362;node
    if (
        typeof oldVDom !== typeof newVDom ||
        ((typeof oldVDom === &apos;string&apos; || typeof oldVDom === &apos;number&apos;) &amp;&amp; oldVDom !== newVDom) ||
        oldVDom.tag !== newVDom.tag
    ) {
       return {
           type: nodePatchTypes.REPLACE,
           vdom: newVDom
       } 
    }

    // &#x66F4;&#x65B0;node
    if (oldVDom.tag) {
        // &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;
        const propsDiff = diffProps(oldVDom, newVDom);

        // &#x6BD4;&#x8F83;children&#x7684;&#x53D8;&#x5316;
        const childrenDiff = diffChildren(oldVDom, newVDom);

        // &#x5982;&#x679C;props&#x6216;&#x8005;children&#x6709;&#x53D8;&#x5316;&#xFF0C;&#x624D;&#x9700;&#x8981;&#x66F4;&#x65B0;
        if (propsDiff.length &gt; 0 || childrenDiff.some( patchObj =&gt; (patchObj !== undefined) )) {
            return {
                type: nodePatchTypes.UPDATE,
                props: propsDiff,
                children: childrenDiff
            }   
        }
        
    }
}</code></pre><p>diff&#x6700;&#x7EC8;&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x662F;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF1A;</p><pre><code class="javascript">{
    type,
    vdom,
    props: [{
               type,
               key,
               value 
            }]
    children
}</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x751F;&#x6210;&#x5BF9;&#x8C61;&#x7684;&#x6B65;&#x9AA4;&#x7701;&#x7565;&#x6389;&#xFF0C;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;dom&#x3002;&#x8FD9;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5C06;&#x7236;&#x5143;&#x7D20;&#xFF0C;&#x8FD8;&#x6709;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x7D22;&#x5F15;&#x4F20;&#x8FDB;&#x6765;&#xFF08;&#x539F;patch&#x7684;&#x903B;&#x8F91;&#xFF09;&#xFF1A;</p><pre><code class="javascript">function diff(oldVDom, newVDom, parent, index=0) {
    // &#x65B0;&#x5EFA;node
    if (oldVDom == undefined) {
        parent.appendChild(createElement(newVDom));
    }

    const element = parent.childNodes[index];

    // &#x5220;&#x9664;node
    if (newVDom == undefined) {
        parent.removeChild(element);
    }

    // &#x66FF;&#x6362;node
    if (
        typeof oldVDom !== typeof newVDom ||
        ((typeof oldVDom === &apos;string&apos; || typeof oldVDom === &apos;number&apos;) &amp;&amp; oldVDom !== newVDom) ||
        oldVDom.tag !== newVDom.tag
    ) {
        parent.replaceChild(createElement(newVDom), element);
    }

    // &#x66F4;&#x65B0;node
    if (oldVDom.tag) {
        // &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;
        diffProps(oldVDom, newVDom, element);

        // &#x6BD4;&#x8F83;children&#x7684;&#x53D8;&#x5316;
        diffChildren(oldVDom, newVDom, element);
    }
}

function diffProps(oldVDom, newVDom) {
    const allProps = {...oldVDom.props, ...newVDom.props};

    // &#x83B7;&#x53D6;&#x65B0;&#x65E7;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x540D;&#x540E;&#xFF0C;&#x518D;&#x9010;&#x4E00;&#x5224;&#x65AD;&#x65B0;&#x65E7;&#x5C5E;&#x6027;&#x503C;
    Object.keys(allProps).forEach((key) =&gt; {
            const oldValue = oldVDom.props[key];
            const newValue = newVDom.props[key];

            // &#x5220;&#x9664;&#x5C5E;&#x6027;
            if (newValue == undefined) {
                element.removeAttribute(key);
            } 
            // &#x66F4;&#x65B0;&#x5C5E;&#x6027;
            else if (oldValue == undefined || oldValue !== newValue) {
                element.setAttribute(key, newValue);
            }
        }
    )
}

function diffChildren(oldVDom, newVDom, parent) {
    // &#x83B7;&#x53D6;&#x5B50;&#x5143;&#x7D20;&#x6700;&#x5927;&#x957F;&#x5EA6;
    const childLength = Math.max(oldVDom.children.length, newVDom.children.length);

    // &#x904D;&#x5386;&#x5E76;diff&#x5B50;&#x5143;&#x7D20;
    for (let i = 0; i &lt; childLength; i++) {
        diff(oldVDom.children[i], newVDom.children[i], parent, i);
    }
}</code></pre><p>&#x672C;&#x8D28;&#x4E0A;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x6B21;&#x7684;&#x4F18;&#x5316;&#x662F;&#x5C06;patch&#x7684;&#x903B;&#x8F91;&#x6574;&#x5408;&#x8FDB;diff&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E86;&#x3002;&#x7ECF;&#x8FC7;&#x8FD9;&#x6B21;&#x4F18;&#x5316;&#xFF0C;JS&#x8BA1;&#x7B97;&#x7684;&#x65F6;&#x95F4;&#x5FEB;&#x4E86;&#x90A3;&#x4E48;&#x51E0;&#x6BEB;&#x79D2;<span class="emoji emoji-joy"></span>&#x3002;&#x867D;&#x7136;&#x6027;&#x80FD;&#x7684;&#x63D0;&#x5347;&#x4E0D;&#x5927;&#xFF0C;&#x4F46;&#x4EE3;&#x7801;&#x6BD4;&#x539F;&#x6765;&#x7684;&#x5C11;&#x4E86;80&#x591A;&#x884C;&#xFF0C;&#x964D;&#x4F4E;&#x4E86;&#x903B;&#x8F91;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x4F18;&#x5316;&#x7684;&#x6548;&#x679C;&#x8FD8;&#x662F;&#x4E0D;&#x9519;&#x7684;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbf4sd?w=296&amp;h=605" src="https://static.alili.tech/img/bVbf4sd?w=296&amp;h=605" alt="clipboard.png" title="clipboard.png"></span></p><ul><li><h3>&#x4F18;&#x5316;&#x4E8C;&#xFF1A;VD&#x4E0E;&#x771F;&#x5B9E;dom&#x878D;&#x5408;</h3></li></ul><p>&#x5728;&#x4E4B;&#x524D;&#x7684;&#x7248;&#x672C;&#x91CC;&#x9762;&#xFF0C;diff&#x64CD;&#x4F5C;&#x9488;&#x5BF9;&#x7684;&#x662F;&#x65B0;&#x65E7;2&#x4E2A;VD&#x3002;&#x65E2;&#x7136;&#x771F;&#x5B9E;&#x7684;dom&#x5DF2;&#x7ECF;&#x6839;&#x636E;&#x4E4B;&#x524D;&#x7684;VD&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x6709;&#x6CA1;&#x529E;&#x6CD5;&#x7528;&#x5F53;&#x524D;&#x7684;dom&#x8DDF;&#x65B0;&#x7684;VD&#x505A;&#x6BD4;&#x8F83;&#x5462;&#xFF1F;</p><p>&#x7B54;&#x6848;&#x662F;&#x80AF;&#x5B9A;&#x7684;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x6309;&#x9700;&#x83B7;&#x53D6;dom&#x4E2D;&#x4E0D;&#x540C;&#x7684;&#x5C5E;&#x6027;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x5F53;&#x6BD4;&#x8F83;tag&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x662F;nodeType&#x548C;tagName&#xFF0C;&#x6BD4;&#x8F83;&#x6587;&#x672C;&#x7684;&#x65F6;&#x5019;&#x7528;&#x7684;&#x662F;nodeValue&#x3002;</p><pre><code class="javascript">function tick(element) {
    if (state.num &gt; 20) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view();

    // &#x6BD4;&#x8F83;&#x5E76;&#x66F4;&#x65B0;&#x8282;&#x70B9;
    diff(newVDom, element);
    // diff(preVDom, newVDom, element);

    // preVDom = newVDom;
}

function diff(newVDom, parent, index=0) {
    
    const element = parent.childNodes[index];

    // &#x65B0;&#x5EFA;node
    if (element == undefined) {
        parent.appendChild(createElement(newVDom));
        return;
    }

    // &#x5220;&#x9664;node
    if (newVDom == undefined) {
        parent.removeChild(element);
        return;
    }

    // &#x66FF;&#x6362;node
    if (!isSameType(element, newVDom)) {
        parent.replaceChild(createElement(newVDom), element);
        return;
    }

    // &#x66F4;&#x65B0;node
    if (element.nodeType === Node.ELEMENT_NODE) {
        // &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;
        diffProps(newVDom, element);

        // &#x6BD4;&#x8F83;children&#x7684;&#x53D8;&#x5316;
        diffChildren(newVDom, element);
    }
}

// &#x6BD4;&#x8F83;&#x5143;&#x7D20;&#x7C7B;&#x578B;&#x662F;&#x5426;&#x76F8;&#x540C;
function isSameType(element, newVDom) {
    const elmType = element.nodeType;
    const vdomType = typeof newVDom;

    // &#x5F53;dom&#x5143;&#x7D20;&#x662F;&#x6587;&#x672C;&#x8282;&#x70B9;&#x7684;&#x60C5;&#x51B5;
    if (elmType === Node.TEXT_NODE &amp;&amp; 
        (vdomType === &apos;string&apos; || vdomType === &apos;number&apos;) &amp;&amp;
        element.nodeValue == newVDom
    ) {
       return true; 
    }

    // &#x5F53;dom&#x5143;&#x7D20;&#x662F;&#x666E;&#x901A;&#x8282;&#x70B9;&#x7684;&#x60C5;&#x51B5;
    if (elmType === Node.ELEMENT_NODE &amp;&amp; element.tagName.toLowerCase() == newVDom.tag) {
        return true;
    }

    return false;
}</code></pre><p>&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5C5E;&#x6027;&#x7684;&#x6BD4;&#x8F83;&#xFF0C;&#x63D0;&#x9AD8;&#x6548;&#x7387;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;VD&#x7684;props&#x5B58;&#x5728;dom&#x5143;&#x7D20;&#x7684;<code>__preprops_</code>&#x5B57;&#x6BB5;&#x4E2D;&#xFF1A;</p><pre><code class="javascript">const ATTR_KEY = &apos;__preprops_&apos;;

// &#x521B;&#x5EFA;dom&#x5143;&#x7D20;
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
    children.map(createElement)
            .forEach(element.appendChild.bind(element));

    return element;
}

// &#x5C5E;&#x6027;&#x8D4B;&#x503C;
function setProps(element, props) {
     // &#x5C5E;&#x6027;&#x8D4B;&#x503C;
    element[ATTR_KEY] = props;

    for (let key in props) {
        element.setAttribute(key, props[key]);
    }
}</code></pre><p>&#x8FDB;&#x884C;&#x5C5E;&#x6027;&#x6BD4;&#x8F83;&#x7684;&#x65F6;&#x5019;&#x518D;&#x53D6;&#x51FA;&#x6765;&#xFF1A;</p><pre><code class="javascript">// &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;
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
}</code></pre><p>&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x7528;&#x53D8;&#x91CF;<code>preVDom</code>&#x5C06;&#x4E0A;&#x4E00;&#x6B21;&#x751F;&#x6210;&#x7684;VD&#x5B58;&#x4E0B;&#x6765;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x8DDF;&#x771F;&#x5B9E;&#x7684;dom&#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x7075;&#x6D3B;&#x6027;&#x66F4;&#x5F3A;&#x3002;</p><ul><li><h3>&#x603B;&#x7ED3;</h3></li></ul><p>&#x672C;&#x6587;&#x57FA;&#x4E8E;&#x4E0A;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7B80;&#x5316;&#x4E86;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x7684;&#x8FC7;&#x7A0B;&#xFF08;&#x7701;&#x7565;patch&#x5BF9;&#x8C61;&#xFF09;&#xFF0C;&#x540C;&#x65F6;&#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x7075;&#x6D3B;&#x7684;VD&#x6BD4;&#x8F83;&#x65B9;&#x6CD5;&#xFF08;&#x76F4;&#x63A5;&#x8DDF;dom&#x6BD4;&#x8F83;&#xFF09;&#xFF0C;&#x53EF;&#x7528;&#x6027;&#x8D8A;&#x6765;&#x8D8A;&#x5F3A;&#x4E86;&#x3002;&#x57FA;&#x4E8E;&#x5F53;&#x524D;&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x80FD;&#x505A;&#x600E;&#x6837;&#x7684;&#x4F18;&#x5316;&#x5462;&#xFF0C;&#x8BF7;&#x770B;&#x4E0B;&#x4E00;&#x7BC7;&#x7684;&#x5185;&#x5BB9;&#xFF1A;<a href="https://segmentfault.com/a/1190000016200003">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x56DB;&#xFF09;&#xFF1A;key&#x7684;&#x4F5C;&#x7528;</a>&#x3002;</p><p>P.S.: &#x60F3;&#x770B;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x89C1;&#x8FD9;&#x91CC;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5FC5;&#x8981;&#x5EFA;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#x7684;&#x8BDD;&#x8BF7;&#x7559;&#x8A00;&#x7ED9;&#x6211;&#xFF1A;<a href="https://gist.github.com/dickenslian/43cfd764f0c660bd4b8ba38f2eab06da" rel="nofollow noreferrer">&#x4EE3;&#x7801;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的Virtual DOM（三）：Virtual Dom更新优化

## 原文链接
[https://segmentfault.com/a/1190000016186666](https://segmentfault.com/a/1190000016186666)

