---
title: 你不知道的Virtual DOM（二）：Virtual Dom的更新
reprint: true
categories: reprint
slug: 607ac925
date: 2018-11-15 02:30:08
---

{{< raw >}}
<ul><li><h3>&#x524D;&#x8A00;</h3></li></ul><p>&#x76EE;&#x524D;&#x6700;&#x6D41;&#x884C;&#x7684;&#x4E24;&#x5927;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;React&#x548C;Vue&#xFF0C;&#x90FD;&#x4E0D;&#x7EA6;&#x800C;&#x540C;&#x7684;&#x501F;&#x52A9;Virtual DOM&#x6280;&#x672F;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x7684;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;Virtual DOM&#xFF1F;&#x5B83;&#x662F;&#x901A;&#x8FC7;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x53BB;&#x63D0;&#x5347;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x7684;&#x5462;&#xFF1F;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;Virtual DOM&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x5E76;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Diff&#x7B97;&#x6CD5;&#x6765;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x3002;&#x672C;&#x6587;&#x7684;&#x5185;&#x5BB9;&#x8131;&#x79BB;&#x4E8E;&#x4EFB;&#x4F55;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;&#x53EA;&#x8BB2;&#x6700;&#x7EAF;&#x7CB9;&#x7684;Virtual DOM&#x3002;&#x6572;&#x5355;&#x8BCD;&#x592A;&#x7D2F;&#x4E86;&#xFF0C;&#x4E0B;&#x6587;Virtual DOM&#x4E00;&#x5F8B;&#x7528;VD&#x8868;&#x793A;&#x3002;</p><p>&#x8FD9;&#x662F;VD&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x7B2C;&#x4E8C;&#x7BC7;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x672C;&#x7CFB;&#x5217;&#x5176;&#x5B83;&#x6587;&#x7AE0;&#x7684;&#x4F20;&#x9001;&#x95E8;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000016129036">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E00;&#xFF09;&#xFF1A;Virtual Dom&#x4ECB;&#x7ECD;</a><br><a href="https://segmentfault.com/a/1190000016145981">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E8C;&#xFF09;&#xFF1A;Virtual Dom&#x7684;&#x66F4;&#x65B0;</a><br><a href="https://segmentfault.com/a/1190000016186666">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E09;&#xFF09;&#xFF1A;Virtual Dom&#x66F4;&#x65B0;&#x4F18;&#x5316;</a><br><a href="https://segmentfault.com/a/1190000016200003">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x56DB;&#xFF09;&#xFF1A;key&#x7684;&#x4F5C;&#x7528;</a><br><a href="https://segmentfault.com/a/1190000016248276">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E94;&#xFF09;&#xFF1A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</a><br><a href="https://segmentfault.com/a/1190000016328371">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x516D;&#xFF09;&#xFF1A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&amp;&#x5F02;&#x6B65;&#x66F4;&#x65B0;</a></p><p>&#x672C;&#x6587;&#x5C06;&#x4F1A;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;VD Diff&#x7B97;&#x6CD5;&#xFF0C;&#x8BA1;&#x7B97;&#x51FA;&#x5DEE;&#x5F02;&#x5E76;&#x53CD;&#x6620;&#x5230;&#x771F;&#x5B9E;&#x7684;dom&#x4E0A;&#x53BB;&#x3002;</p><ul><li><h3>&#x601D;&#x8DEF;</h3></li></ul><p>&#x4F7F;&#x7528;VD&#x7684;&#x6846;&#x67B6;&#xFF0C;&#x4E00;&#x822C;&#x7684;&#x8BBE;&#x8BA1;&#x601D;&#x8DEF;&#x90FD;&#x662F;&#x9875;&#x9762;&#x7B49;&#x4E8E;&#x9875;&#x9762;&#x72B6;&#x6001;&#x7684;&#x6620;&#x5C04;&#xFF0C;&#x5373;<code>UI = render(state)</code>&#x3002;&#x5F53;&#x9700;&#x8981;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x65E0;&#x9700;&#x5173;&#x5FC3;dom&#x5177;&#x4F53;&#x7684;&#x53D8;&#x6362;&#x65B9;&#x5F0F;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x6539;&#x53D8;<code>state</code>&#x5373;&#x53EF;&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x4E8B;&#x60C5;&#xFF08;<code>render</code>&#xFF09;&#x5C06;&#x7531;&#x6846;&#x67B6;&#x4EE3;&#x52B3;&#x3002;&#x6211;&#x4EEC;&#x8003;&#x8651;&#x6700;&#x7B80;&#x5355;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x5F53;state&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x91CD;&#x65B0;&#x751F;&#x6210;&#x6574;&#x4E2A;VD&#xFF0C;&#x89E6;&#x53D1;&#x6BD4;&#x8F83;&#x7684;&#x64CD;&#x4F5C;&#x3002;&#x4E0A;&#x8FF0;&#x8FC7;&#x7A0B;&#x5206;&#x4E3A;&#x4EE5;&#x4E0B;&#x56DB;&#x6B65;&#xFF1A;</p><ul><li>state&#x53D8;&#x5316;&#xFF0C;&#x751F;&#x6210;&#x65B0;&#x7684;VD</li><li>&#x6BD4;&#x8F83;VD&#x4E0E;&#x4E4B;&#x524D;VD&#x7684;&#x5F02;&#x540C;</li><li>&#x751F;&#x6210;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#xFF08;<code>patch</code>&#xFF09;</li><li>&#x904D;&#x5386;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E76;&#x66F4;&#x65B0;dom</li></ul><p>&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#xFF0C;&#x4E0E;&#x6BCF;&#x4E00;&#x4E2A;vdom&#x5143;&#x7D20;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#xFF1A;</p><pre><code class="javascript">{
    type,
    vdom,
    props: [{
               type,
               key,
               value 
            }]
    children
}</code></pre><p>&#x6700;&#x5916;&#x5C42;&#x7684;type&#x5BF9;&#x5E94;&#x7684;&#x662F;dom&#x5143;&#x7D20;&#x7684;&#x53D8;&#x5316;&#x7C7B;&#x578B;&#xFF0C;&#x6709;4&#x79CD;&#xFF1A;&#x65B0;&#x5EFA;&#x3001;&#x5220;&#x9664;&#x3001;&#x66FF;&#x6362;&#x548C;&#x66F4;&#x65B0;&#x3002;props&#x53D8;&#x5316;&#x7684;type&#x53EA;&#x6709;2&#x79CD;&#xFF1A;&#x66F4;&#x65B0;&#x548C;&#x5220;&#x9664;&#x3002;&#x679A;&#x4E3E;&#x503C;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="javascript">const nodePatchTypes = {
    CREATE: &apos;create node&apos;,
    REMOVE: &apos;remove node&apos;,
    REPLACE: &apos;replace node&apos;,
    UPDATE: &apos;update node&apos;
}

const propPatchTypes = {
    REMOVE: &apos;remove prop&apos;,
    UPDATE: &apos;update prop&apos;
}</code></pre><ul><li><h3>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;</h3></li></ul><p>&#x6211;&#x4EEC;&#x505A;&#x4E00;&#x4E2A;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;500&#x6BEB;&#x79D2;&#x8FD0;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x6BCF;&#x6B21;&#x5BF9;state&#x52A0;1&#x3002;&#x9875;&#x9762;&#x7684;<code>li</code>&#x5143;&#x7D20;&#x7684;&#x6570;&#x91CF;&#x968F;&#x7740;state&#x800C;&#x53D8;&#x3002;</p><pre><code class="javascript">let state = { num: 5 };
let timer;
let preVDom;

function render(element) {
    // &#x521D;&#x59CB;&#x5316;&#x7684;VD
    const vdom = view();
    preVDom = vdom;

    const dom = createElement(vdom);
    element.appendChild(dom);

    
    timer = setInterval(() =&gt; {
        state.num += 1;
        tick(element);
    }, 500);
}

function tick(element) {
    if (state.num &gt; 20) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view();
}

function view() {
    return (
        &lt;div&gt;
            Hello World
            &lt;ul&gt;
                {
                    // &#x751F;&#x6210;&#x5143;&#x7D20;&#x4E3A;0&#x5230;n-1&#x7684;&#x6570;&#x7EC4;
                    [...Array(state.num).keys()]
                        .map( i =&gt; (
                            &lt;li id={i} class={`li-${i}`}&gt;
                                &#x7B2C;{i * state.num}
                            &lt;/li&gt;
                        ))
                }
            &lt;/ul&gt;
        &lt;/div&gt;
    );
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x901A;&#x8FC7;&#x5BF9;&#x6BD4;2&#x4E2A;VD&#xFF0C;&#x751F;&#x6210;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x3002;</p><pre><code class="javascript">function tick(element) {
    if (state.num &gt; 20) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view();

    // &#x751F;&#x6210;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;
    const patchObj = diff(preVDom, newVDom);
}

function diff(oldVDom, newVDom) {
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
}

// &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;
function diffProps(oldVDom, newVDom) {
    const patches = [];

    const allProps = {...oldVDom.props, ...newVDom.props};

    // &#x83B7;&#x53D6;&#x65B0;&#x65E7;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x540D;&#x540E;&#xFF0C;&#x518D;&#x9010;&#x4E00;&#x5224;&#x65AD;&#x65B0;&#x65E7;&#x5C5E;&#x6027;&#x503C;
    Object.keys(allProps).forEach((key) =&gt; {
            const oldValue = oldVDom.props[key];
            const newValue = newVDom.props[key];

            // &#x5220;&#x9664;&#x5C5E;&#x6027;
            if (newValue == undefined) {
                patches.push({
                    type: propPatchTypes.REMOVE,
                    key
                });
            } 
            // &#x66F4;&#x65B0;&#x5C5E;&#x6027;
            else if (oldValue == undefined || oldValue !== newValue) {
                patches.push({
                    type: propPatchTypes.UPDATE,
                    key,
                    value: newValue
                });
            }
        }
    )

    return patches;
}

// &#x6BD4;&#x8F83;children&#x7684;&#x53D8;&#x5316;
function diffChildren(oldVDom, newVDom) {
    const patches = [];
    
    // &#x83B7;&#x53D6;&#x5B50;&#x5143;&#x7D20;&#x6700;&#x5927;&#x957F;&#x5EA6;
    const childLength = Math.max(oldVDom.children.length, newVDom.children.length);

    // &#x904D;&#x5386;&#x5E76;diff&#x5B50;&#x5143;&#x7D20;
    for (let i = 0; i &lt; childLength; i++) {
        patches.push(diff(oldVDom.children[i], newVDom.children[i]));
    }

    return patches;
}</code></pre><p>&#x8BA1;&#x7B97;&#x5F97;&#x51FA;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x662F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><pre><code class="javascript">{
    type: &quot;update node&quot;,
    props: [],
    children: [
        null, 
        {
            type: &quot;update node&quot;,
            props: [],
            children: [
                null, 
                {
                    type: &quot;update node&quot;,
                    props: [],
                    children: [
                        null, 
                        {
                            type: &quot;replace node&quot;,
                            vdom: 6
                        }
                    ]
                }
            ]
        },
        {
            type: &quot;create node&quot;,
            vdom: {
                tag: &quot;li&quot;,
                props: {
                    id: 5,
                    class: &quot;li-5&quot;
                },
                children: [&quot;&#x7B2C;&quot;, 30]
            }
        }
    ]
}</code></pre><p>&#x4E0B;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x904D;&#x5386;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E76;&#x66F4;&#x65B0;dom&#x4E86;&#xFF1A;</p><pre><code class="javascript">function tick(element) {
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
}

// &#x7ED9;dom&#x6253;&#x4E2A;&#x8865;&#x4E01;
function patch(parent, patchObj, index=0) {
    if (!patchObj) {
        return;
    }

    // &#x65B0;&#x5EFA;&#x5143;&#x7D20;
    if (patchObj.type === nodePatchTypes.CREATE) {
        return parent.appendChild(createElement(patchObj.vdom));
    }

    const element = parent.childNodes[index];

    // &#x5220;&#x9664;&#x5143;&#x7D20;
    if (patchObj.type === nodePatchTypes.REMOVE) {
        return parent.removeChild(element);
    }

    // &#x66FF;&#x6362;&#x5143;&#x7D20;
    if (patchObj.type === nodePatchTypes.REPLACE) {
        return parent.replaceChild(createElement(patchObj.vdom), element);
    }

    // &#x66F4;&#x65B0;&#x5143;&#x7D20;
    if (patchObj.type === nodePatchTypes.UPDATE) {
        const {props, children} = patchObj;

        // &#x66F4;&#x65B0;&#x5C5E;&#x6027;
        patchProps(element, props);

        // &#x66F4;&#x65B0;&#x5B50;&#x5143;&#x7D20;
        children.forEach( (patchObj, i) =&gt; {
            // &#x66F4;&#x65B0;&#x5B50;&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x5E8F;&#x53F7;&#x4F20;&#x5165;
            patch(element, patchObj, i)
        });
    }
}

// &#x66F4;&#x65B0;&#x5C5E;&#x6027;
function patchProps(element, props) {
    if (!props) {
        return;
    }

    props.forEach( patchObj =&gt; {
        // &#x5220;&#x9664;&#x5C5E;&#x6027;
        if (patchObj.type === propPatchTypes.REMOVE) {
            element.removeAttribute(patchObj.key);
        } 
        // &#x66F4;&#x65B0;&#x6216;&#x65B0;&#x5EFA;&#x5C5E;&#x6027;
        else if (patchObj.type === propPatchTypes.UPDATE) {
            element.setAttribute(patchObj.key, patchObj.value);
        }
    })
}</code></pre><p>&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;&#x6574;&#x4E2A;&#x66F4;&#x65B0;&#x7684;&#x6D41;&#x7A0B;&#x5C31;&#x6267;&#x884C;&#x5B8C;&#x4E86;&#x3002;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x9875;&#x9762;&#x8DDF;&#x6211;&#x4EEC;&#x9884;&#x671F;&#x7684;&#x4E00;&#x6837;&#xFF0C;&#x6BCF;500&#x6BEB;&#x79D2;&#x5237;&#x65B0;&#x4E00;&#x6B21;&#xFF0C;&#x6784;&#x9020;&#x6E32;&#x67D3;&#x6811;&#x548C;&#x7ED8;&#x5236;&#x9875;&#x9762;&#x82B1;&#x7684;&#x65F6;&#x95F4;&#x4E5F;&#x975E;&#x5E38;&#x5C11;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbfUnA?w=570&amp;h=1214" src="https://static.alili.tech/img/bVbfUnA?w=570&amp;h=1214" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x4F5C;&#x4E3A;&#x5BF9;&#x6BD4;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x751F;&#x6210;&#x65B0;&#x7684;VD&#x540E;&#xFF0C;&#x4E0D;&#x7ECF;&#x8FC7;&#x6BD4;&#x8F83;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x6574;&#x4E2A;dom&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x600E;&#x6837;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><pre><code class="javascript">function tick(element) {
    if (state.num &gt; 20) {
        clearTimeout(timer);
        return;
    }

    const newVDom = view();
    newDom = createElement(newVDom);

    element.replaceChild(newDom, dom);

    dom = newDom;

    /*
    // &#x751F;&#x6210;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;
    const patchObj = diff(preVDom, newVDom);

    preVDom = newVDom;

    // &#x7ED9;dom&#x6253;&#x4E2A;&#x8865;&#x4E01;
    patch(element, patchObj);
    */
}</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfUnC?w=584&amp;h=1220" src="https://static.alili.tech/img/bVbfUnC?w=584&amp;h=1220" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6784;&#x9020;&#x6E32;&#x67D3;&#x6811;&#xFF08;<code>Rendering</code>&#xFF09;&#x548C;&#x7ED8;&#x5236;&#x9875;&#x9762;&#xFF08;<code>Painting</code>&#xFF09;&#x7684;&#x65F6;&#x95F4;&#x8981;&#x591A;&#x4E00;&#x4E9B;&#x3002;&#x4F46;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#x82B1;&#x5728;JS&#x8BA1;&#x7B97;&#xFF08;<code>Scripting</code>&#xFF09;&#x7684;&#x65F6;&#x95F4;&#x8981;&#x5C11;&#x4E00;&#x4E9B;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x9700;&#x8981;&#x6BD4;&#x8F83;&#x8282;&#x70B9;&#x7684;&#x53D8;&#x5316;&#x3002;&#x5982;&#x679C;&#x7B97;&#x603B;&#x65F6;&#x95F4;&#x7684;&#x8BDD;&#xFF0C;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x6574;&#x4E2A;dom&#x82B1;&#x8D39;&#x7684;&#x65F6;&#x95F4;&#x53CD;&#x800C;&#x66F4;&#x5C11;&#xFF0C;&#x8FD9;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><p>&#x5176;&#x5B9E;&#x539F;&#x56E0;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x7684;dom&#x6811;&#x592A;&#x7B80;&#x5355;&#x4E86;&#xFF01;&#x8282;&#x70B9;&#x5F88;&#x5C11;&#xFF0C;&#x4F7F;&#x7528;&#x5230;&#x7684;css&#x4E5F;&#x5F88;&#x5C11;&#xFF0C;&#x6240;&#x4EE5;&#x6784;&#x9020;&#x6E32;&#x67D3;&#x6811;&#x548C;&#x7ED8;&#x5236;&#x9875;&#x9762;&#x5C31;&#x82B1;&#x4E0D;&#x4E86;&#x591A;&#x5C11;&#x65F6;&#x95F4;&#x3002;VD&#x771F;&#x6B63;&#x7684;&#x6548;&#x679C;&#x8FD8;&#x662F;&#x8981;&#x5728;&#x771F;&#x5B9E;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x624D;&#x4F53;&#x73B0;&#x5F97;&#x51FA;&#x6765;&#x3002;</p><ul><li><h3>&#x603B;&#x7ED3;</h3></li></ul><p>&#x672C;&#x6587;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;VD Diff&#x7B97;&#x6CD5;&#xFF0C;&#x518D;&#x6839;&#x636E;&#x8BA1;&#x7B97;&#x51FA;&#x7684;&#x5DEE;&#x5F02;&#x53BB;&#x66F4;&#x65B0;&#x771F;&#x5B9E;&#x7684;dom&#x3002;&#x7136;&#x540E;&#x5BF9;&#x6027;&#x80FD;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x5206;&#x6790;&#xFF0C;&#x5F97;&#x51FA;&#x4F7F;&#x7528;VD&#x5728;&#x51CF;&#x5C11;&#x6E32;&#x67D3;&#x65F6;&#x95F4;&#x7684;&#x540C;&#x65F6;&#x589E;&#x52A0;&#x4E86;JS&#x8BA1;&#x7B97;&#x65F6;&#x95F4;&#x7684;&#x7ED3;&#x8BBA;&#x3002;&#x57FA;&#x4E8E;&#x5F53;&#x524D;&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x80FD;&#x505A;&#x600E;&#x6837;&#x7684;&#x4F18;&#x5316;&#x5462;&#xFF0C;&#x8BF7;&#x770B;&#x4E0B;&#x4E00;&#x7BC7;&#x7684;&#x5185;&#x5BB9;&#xFF1A;<a href="https://segmentfault.com/a/1190000016186666">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E09;&#xFF09;&#xFF1A;Virtual Dom&#x66F4;&#x65B0;&#x4F18;&#x5316;</a></p><p>P.S.: &#x60F3;&#x770B;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x89C1;&#x8FD9;&#x91CC;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5FC5;&#x8981;&#x5EFA;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#x7684;&#x8BDD;&#x8BF7;&#x7559;&#x8A00;&#x7ED9;&#x6211;&#xFF1A;<a href="https://gist.github.com/dickenslian/a0a8d41a88d566d86271de16cd7738f0" rel="nofollow noreferrer">&#x4EE3;&#x7801;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的Virtual DOM（二）：Virtual Dom的更新

## 原文链接
[https://segmentfault.com/a/1190000016145981](https://segmentfault.com/a/1190000016145981)

