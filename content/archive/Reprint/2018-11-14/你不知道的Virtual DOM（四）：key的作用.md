---
title: 你不知道的Virtual DOM（四）：key的作用
hidden: true
categories: reprint
slug: 80006ca9
date: 2018-11-14 02:30:09
---

{{< raw >}}
<ul><li><h3>&#x524D;&#x8A00;</h3></li></ul><p>&#x76EE;&#x524D;&#x6700;&#x6D41;&#x884C;&#x7684;&#x4E24;&#x5927;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;React&#x548C;Vue&#xFF0C;&#x90FD;&#x4E0D;&#x7EA6;&#x800C;&#x540C;&#x7684;&#x501F;&#x52A9;Virtual DOM&#x6280;&#x672F;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x7684;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x4EC0;&#x4E48;&#x662F;Virtual DOM&#xFF1F;&#x5B83;&#x662F;&#x901A;&#x8FC7;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x53BB;&#x63D0;&#x5347;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x6548;&#x7387;&#x7684;&#x5462;&#xFF1F;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x4F1A;&#x8BE6;&#x7EC6;&#x8BB2;&#x89E3;Virtual DOM&#x7684;&#x521B;&#x5EFA;&#x8FC7;&#x7A0B;&#xFF0C;&#x5E76;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Diff&#x7B97;&#x6CD5;&#x6765;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x3002;&#x672C;&#x6587;&#x7684;&#x5185;&#x5BB9;&#x8131;&#x79BB;&#x4E8E;&#x4EFB;&#x4F55;&#x7684;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#xFF0C;&#x53EA;&#x8BB2;&#x6700;&#x7EAF;&#x7CB9;&#x7684;Virtual DOM&#x3002;&#x6572;&#x5355;&#x8BCD;&#x592A;&#x7D2F;&#x4E86;&#xFF0C;&#x4E0B;&#x6587;Virtual DOM&#x4E00;&#x5F8B;&#x7528;VD&#x8868;&#x793A;&#x3002;</p><p>&#x8FD9;&#x662F;VD&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x7B2C;&#x56DB;&#x7BC7;&#xFF0C;&#x4EE5;&#x4E0B;&#x662F;&#x672C;&#x7CFB;&#x5217;&#x5176;&#x5B83;&#x6587;&#x7AE0;&#x7684;&#x4F20;&#x9001;&#x95E8;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000016129036">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E00;&#xFF09;&#xFF1A;Virtual Dom&#x4ECB;&#x7ECD;</a><br><a href="https://segmentfault.com/a/1190000016145981">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E8C;&#xFF09;&#xFF1A;Virtual Dom&#x7684;&#x66F4;&#x65B0;</a><br><a href="https://segmentfault.com/a/1190000016186666">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E09;&#xFF09;&#xFF1A;Virtual Dom&#x66F4;&#x65B0;&#x4F18;&#x5316;</a><br><a href="https://segmentfault.com/a/1190000016200003">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x56DB;&#xFF09;&#xFF1A;key&#x7684;&#x4F5C;&#x7528;</a><br><a href="https://segmentfault.com/a/1190000016248276">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E94;&#xFF09;&#xFF1A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</a><br><a href="https://segmentfault.com/a/1190000016328371">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x516D;&#xFF09;&#xFF1A;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&amp;&#x5F02;&#x6B65;&#x66F4;&#x65B0;</a></p><p>&#x4ECA;&#x5929;&#xFF0C;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x5728;&#x4E4B;&#x524D;&#x9879;&#x76EE;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x3002;&#x7528;&#x8FC7;React&#x6216;&#x8005;Vue&#x7684;&#x670B;&#x53CB;&#x90FD;&#x77E5;&#x9053;&#x5728;&#x6E32;&#x67D3;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7F16;&#x8BD1;&#x5668;&#x4F1A;&#x63D0;&#x9192;&#x52A0;&#x4E0A;key&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x90A3;&#x4E48;key&#x662F;&#x7528;&#x6765;&#x505A;&#x4EC0;&#x4E48;&#x7684;&#x5462;&#xFF1F;</p><ul><li><h3>key&#x7684;&#x4F5C;&#x7528;</h3></li></ul><p>&#x5728;&#x6E32;&#x67D3;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x5B83;&#x4EEC;&#x4E00;&#x822C;&#x90FD;&#x6709;&#x76F8;&#x540C;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x53EA;&#x662F;&#x5185;&#x5BB9;&#x6709;&#x4E9B;&#x4E0D;&#x540C;&#x800C;&#x5DF2;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><pre><code class="html">&lt;ul&gt;
    &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x82F9;&#x679C;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;1&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x9999;&#x8549;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;2&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x96EA;&#x68A8;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;3&lt;/span&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre><p>&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x60F3;&#x8C61;&#x6210;&#x4E00;&#x4E2A;&#x8D2D;&#x7269;&#x8F66;&#x3002;&#x6B64;&#x65F6;&#x5982;&#x679C;&#x60F3;&#x5F80;&#x8D2D;&#x7269;&#x8F66;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x4E00;&#x4EF6;&#x5546;&#x54C1;&#xFF0C;&#x6027;&#x80FD;&#x4E0D;&#x4F1A;&#x6709;&#x4EFB;&#x4F55;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x5728;ul&#x7684;&#x672B;&#x5C3E;&#x8FFD;&#x52A0;&#x5143;&#x7D20;&#xFF0C;&#x524D;&#x9762;&#x7684;&#x5143;&#x7D20;&#x90FD;&#x4E0D;&#x9700;&#x8981;&#x66F4;&#x65B0;&#xFF1A;</p><pre><code class="html">&lt;ul&gt;
    &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x82F9;&#x679C;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;1&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x9999;&#x8549;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;2&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x96EA;&#x68A8;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;3&lt;/span&gt;
    &lt;/li&gt;
     &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x6A59;&#x5B50;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;2&lt;/span&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre><p>&#x4F46;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x8981;&#x5220;&#x9664;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x6839;&#x636E;VD&#x7684;&#x6BD4;&#x8F83;&#x903B;&#x8F91;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x5168;&#x90E8;&#x90FD;&#x8981;&#x8FDB;&#x884C;&#x66F4;&#x65B0;&#x7684;&#x64CD;&#x4F5C;&#x3002;dom&#x7ED3;&#x6784;&#x7B80;&#x5355;&#x8FD8;&#x597D;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x590D;&#x6742;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x90A3;&#x9875;&#x9762;&#x6E32;&#x67D3;&#x7684;&#x6027;&#x80FD;&#x5C06;&#x4F1A;&#x53D7;&#x5230;&#x5F88;&#x5927;&#x7684;&#x5F71;&#x54CD;&#x3002;</p><pre><code class="html">&lt;ul&gt;
    &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x9999;&#x8549;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;2&lt;/span&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x96EA;&#x68A8;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;3&lt;/span&gt;
    &lt;/li&gt;
     &lt;li&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x6A59;&#x5B50;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;2&lt;/span&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre><p>&#x6709;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x964D;&#x4F4E;&#x8FD9;&#x79CD;&#x6027;&#x80FD;&#x7684;&#x635F;&#x8017;&#x5462;&#xFF1F;</p><p>&#x6700;&#x76F4;&#x89C2;&#x7684;&#x65B9;&#x6CD5;&#x80AF;&#x5B9A;&#x662F;&#x76F4;&#x63A5;&#x5220;&#x9664;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7136;&#x540E;&#x5176;&#x5B83;&#x5143;&#x7D20;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#x4E86;&#x3002;&#x4F46;&#x7A0B;&#x5E8F;&#x6CA1;&#x6709;&#x8FD9;&#x4E48;&#x667A;&#x80FD;&#xFF0C;&#x53EF;&#x4EE5;&#x50CF;&#x6211;&#x4EEC;&#x4E00;&#x6837;&#x4E00;&#x773C;&#x5C31;&#x770B;&#x51FA;&#x53D8;&#x5316;&#x3002;&#x7A0B;&#x5E8F;&#x80FD;&#x505A;&#x5230;&#x7684;&#x662F;&#x5C3D;&#x91CF;&#x5C11;&#x7684;&#x4FEE;&#x6539;&#x5143;&#x7D20;&#xFF0C;&#x901A;&#x8FC7;&#x79FB;&#x52A8;&#x5143;&#x7D20;&#x800C;&#x4E0D;&#x662F;&#x4FEE;&#x6539;&#x5143;&#x7D20;&#x6765;&#x8FBE;&#x5230;&#x66F4;&#x65B0;&#x7684;&#x76EE;&#x7684;&#x3002;&#x4E3A;&#x4E86;&#x544A;&#x8BC9;&#x7A0B;&#x5E8F;&#x8981;&#x600E;&#x4E48;&#x79FB;&#x52A8;&#x5143;&#x7D20;&#xFF0C;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x7ED9;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x52A0;&#x4E0A;&#x4E00;&#x4E2A;&#x552F;&#x4E00;&#x6807;&#x8BC6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;key&#x3002;</p><pre><code class="html">&lt;ul&gt;
    &lt;li key=&quot;apple&quot;&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x82F9;&#x679C;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;1&lt;/span&gt;
    &lt;/li&gt;
    &lt;li key=&quot;banana&quot;&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x9999;&#x8549;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;2&lt;/span&gt;
    &lt;/li&gt;
    &lt;li key=&quot;pear&quot;&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x96EA;&#x68A8;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;3&lt;/span&gt;
    &lt;/li&gt;
    &lt;li key=&quot;orange&quot;&gt;
        &lt;span&gt;&#x5546;&#x54C1;&#xFF1A;&#x6A59;&#x5B50;&lt;/span&gt;
        &lt;span&gt;&#x6570;&#x91CF;&#xFF1A;2&lt;/span&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre><p>&#x5F53;&#x628A;&#x82F9;&#x679C;&#x5220;&#x6389;&#x7684;&#x65F6;&#x5019;&#xFF0C;VD&#x91CC;&#x9762;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x9999;&#x8549;&#xFF0C;&#x800C;dom&#x91CC;&#x9762;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x82F9;&#x679C;&#x3002;&#x5F53;&#x5143;&#x7D20;&#x6709;key&#x5C5E;&#x6027;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6846;&#x67B6;&#x5C31;&#x4F1A;&#x5C1D;&#x8BD5;&#x6839;&#x636E;&#x8FD9;&#x4E2A;key&#x53BB;&#x627E;&#x5BF9;&#x5E94;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x627E;&#x5230;&#x4E86;&#x5C31;&#x5C06;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x79FB;&#x52A8;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x5FAA;&#x73AF;&#x5F80;&#x590D;&#x3002;&#x6700;&#x540E;VD&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x7B2C;&#x56DB;&#x4E2A;&#x5143;&#x7D20;&#x4E86;&#xFF0C;&#x624D;&#x4F1A;&#x628A;&#x82F9;&#x679C;&#x4ECE;dom&#x79FB;&#x9664;&#x3002;</p><ul><li><h3>&#x4EE3;&#x7801;&#x5B9E;&#x73B0;</h3></li></ul><p>&#x5728;&#x4E0A;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#x4EE3;&#x7801;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x4E3B;&#x8981;&#x7684;&#x6539;&#x52A8;&#x70B9;&#x662F;<code>diffChildren</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;&#x539F;&#x6765;&#x7684;&#x5B9E;&#x73B0;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x9012;&#x5F52;&#x7684;&#x8C03;&#x7528;<code>diff</code>&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF1A;</p><pre><code class="javascript">function diffChildren(newVDom, parent) {
    // &#x83B7;&#x53D6;&#x5B50;&#x5143;&#x7D20;&#x6700;&#x5927;&#x957F;&#x5EA6;
    const childLength = Math.max(parent.childNodes.length, newVDom.children.length);

    // &#x904D;&#x5386;&#x5E76;diff&#x5B50;&#x5143;&#x7D20;
    for (let i = 0; i &lt; childLength; i++) {
        diff(newVDom.children[i], parent, i);
    }
}</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x5BF9;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x5927;&#x6539;&#x9020;&#xFF0C;&#x8BA9;&#x4ED6;&#x652F;&#x6301;key&#x7684;&#x67E5;&#x627E;&#xFF1A;</p><pre><code class="javascript">function diffChildren(newVDom, parent) {
    // &#x6709;key&#x7684;&#x5B50;&#x5143;&#x7D20;
    const nodesWithKey = {};
    let nodesWithKeyCount = 0;

    // &#x6CA1;key&#x7684;&#x5B50;&#x5143;&#x7D20;
    const nodesWithoutKey = [];
    let nodesWithoutKeyCount = 0;

    const childNodes = parent.childNodes,
          nodeLength = childNodes.length;

    const vChildren = newVDom.children,
          vLength = vChildren.length;

    // &#x7528;&#x4E8E;&#x4F18;&#x5316;&#x6CA1;key&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6570;&#x7EC4;&#x904D;&#x5386;
    let min = 0;

    // &#x5C06;&#x5B50;&#x5143;&#x7D20;&#x5206;&#x6210;&#x6709;key&#x548C;&#x6CA1;key&#x4E24;&#x7EC4;
    for (let i = 0; i &lt; nodeLength; i++) {
        const child = childNodes[i],
              props = child[ATTR_KEY];

        if (props !== undefined &amp;&amp; props.key !== undefined) {
            nodesWithKey[props.key] = child;
            nodesWithKeyCount++;
        } else {
            nodesWithoutKey[nodesWithoutKeyCount++] = child;
        }
    }

    // &#x904D;&#x5386;vdom&#x7684;&#x6240;&#x6709;&#x5B50;&#x5143;&#x7D20;
    for (let i = 0; i &lt; vLength; i++) {
        const vChild = vChildren[i],
              vProps = vChild.props;
        let dom;

        vKey = vProps!== undefined ? vProps.key : undefined;
        // &#x6839;&#x636E;key&#x6765;&#x67E5;&#x627E;&#x5BF9;&#x5E94;&#x5143;&#x7D20;
        if (vKey !== undefined) {
            if (nodesWithKeyCount &amp;&amp; nodesWithKey[vKey] !== undefined) {
                dom = nodesWithKey[vKey];
                nodesWithKey[vKey] = undefined;
                nodesWithKeyCount--; 
            }
        } 
        // &#x5982;&#x679C;&#x6CA1;&#x6709;key&#x5B57;&#x6BB5;&#xFF0C;&#x5219;&#x627E;&#x4E00;&#x4E2A;&#x7C7B;&#x578B;&#x76F8;&#x540C;&#x7684;&#x5143;&#x7D20;&#x51FA;&#x6765;&#x505A;&#x6BD4;&#x8F83;
        else if (min &lt; nodesWithoutKeyCount) {
            for (let j = 0; j &lt; nodesWithoutKeyCount; j++) {
                const node = nodesWithoutKey[j];
                if (node !== undefined &amp;&amp; isSameType(node, vChild)) {
                    dom = node;
                    nodesWithoutKey[j] = undefined;
                    if (j === min) min++;
                    if (j === nodesWithoutKeyCount - 1) nodesWithoutKeyCount--;
                    break;
                }
            }
        }

        // diff&#x8FD4;&#x56DE;&#x662F;&#x5426;&#x66F4;&#x65B0;&#x5143;&#x7D20;
        const isUpdate = diff(dom, vChild, parent);

        // &#x5982;&#x679C;&#x662F;&#x66F4;&#x65B0;&#x5143;&#x7D20;&#xFF0C;&#x4E14;&#x4E0D;&#x662F;&#x540C;&#x4E00;&#x4E2A;dom&#x5143;&#x7D20;&#xFF0C;&#x5219;&#x79FB;&#x52A8;&#x5230;&#x539F;&#x5148;&#x7684;dom&#x5143;&#x7D20;&#x4E4B;&#x524D;
        if (isUpdate) {
            const originChild = childNodes[i];
            if (originChild !== dom) {
                parent.insertBefore(dom, originChild);
            }
        }
    }

    // &#x6E05;&#x7406;&#x5269;&#x4E0B;&#x7684;&#x672A;&#x4F7F;&#x7528;&#x7684;dom&#x5143;&#x7D20;
    if (nodesWithKeyCount) {
       for (key in nodesWithKey) {
           const node = nodesWithKey[key];
           if (node !== undefined) {
               node.parentNode.removeChild(node);
           }
       } 
    }
    // &#x6E05;&#x7406;&#x5269;&#x4E0B;&#x7684;&#x672A;&#x4F7F;&#x7528;&#x7684;dom&#x5143;&#x7D20;
    while (min &lt;= nodesWithoutKeyCount) {
        const node = nodesWithoutKey[nodesWithoutKeyCount--];
        if ( node !== undefined) {
            node.parentNode.removeChild(node);
        }
    }
}</code></pre><p>&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x957F;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;</p><ul><li>&#x5C06;&#x6240;&#x6709;dom&#x5B50;&#x5143;&#x7D20;&#x5206;&#x4E3A;&#x6709;key&#x548C;&#x6CA1;key&#x4E24;&#x7EC4;</li><li>&#x904D;&#x5386;VD&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;VD&#x5B50;&#x5143;&#x7D20;&#x6709;key&#xFF0C;&#x5219;&#x53BB;&#x67E5;&#x627E;&#x6709;key&#x7684;&#x5206;&#x7EC4;&#xFF1B;&#x5982;&#x679C;&#x6CA1;key&#xFF0C;&#x5219;&#x53BB;&#x6CA1;key&#x7684;&#x5206;&#x7EC4;&#x627E;&#x4E00;&#x4E2A;&#x7C7B;&#x578B;&#x76F8;&#x540C;&#x7684;&#x5143;&#x7D20;&#x51FA;&#x6765;</li><li>diff&#x4E00;&#x4E0B;&#xFF0C;&#x5F97;&#x51FA;&#x662F;&#x5426;&#x66F4;&#x65B0;&#x5143;&#x7D20;&#x7684;&#x7C7B;&#x578B;</li><li>&#x5982;&#x679C;&#x662F;&#x66F4;&#x65B0;&#x5143;&#x7D20;&#x4E14;&#x5B50;&#x5143;&#x7D20;&#x4E0D;&#x662F;&#x539F;&#x6765;&#x7684;&#xFF0C;&#x5219;&#x79FB;&#x52A8;&#x5143;&#x7D20;</li><li>&#x6700;&#x540E;&#x6E05;&#x7406;&#x5220;&#x9664;&#x6CA1;&#x7528;&#x4E0A;&#x7684;dom&#x5B50;&#x5143;&#x7D20;</li></ul><p>diff&#x4E5F;&#x8981;&#x6539;&#x9020;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x65B0;&#x5EFA;&#x3001;&#x5220;&#x9664;&#x6216;&#x8005;&#x66FF;&#x6362;&#x5143;&#x7D20;&#xFF0C;&#x8FD4;&#x56DE;false&#x3002;&#x66F4;&#x65B0;&#x5143;&#x7D20;&#x5219;&#x8FD4;&#x56DE;true&#xFF1A;</p><pre><code class="javascript">function diff(dom, newVDom, parent) {
    // &#x65B0;&#x5EFA;node
    if (dom == undefined) {
        parent.appendChild(createElement(newVDom));
        return false;
    }

    // &#x5220;&#x9664;node
    if (newVDom == undefined) {
        parent.removeChild(dom);
        return false;
    }

    // &#x66FF;&#x6362;node
    if (!isSameType(dom, newVDom)) {
        parent.replaceChild(createElement(newVDom), dom);
        return false;
    }

    // &#x66F4;&#x65B0;node
    if (dom.nodeType === Node.ELEMENT_NODE) {
        // &#x6BD4;&#x8F83;props&#x7684;&#x53D8;&#x5316;
        diffProps(newVDom, dom);

        // &#x6BD4;&#x8F83;children&#x7684;&#x53D8;&#x5316;
        diffChildren(newVDom, dom);
    }

    return true;
}</code></pre><p>&#x4E3A;&#x4E86;&#x770B;&#x6548;&#x679C;&#xFF0C;<code>view</code>&#x51FD;&#x6570;&#x4E5F;&#x8981;&#x6539;&#x9020;&#x4E0B;&#xFF1A;</p><pre><code class="javascript">const arr = [0, 1, 2, 3, 4];

function view() {
    const elm = arr.pop();

    // &#x7528;&#x4E8E;&#x6D4B;&#x8BD5;&#x80FD;&#x4E0D;&#x80FD;&#x6B63;&#x5E38;&#x5220;&#x9664;&#x5143;&#x7D20;
    if (state.num !== 9) arr.unshift(elm);

    // &#x7528;&#x4E8E;&#x6D4B;&#x8BD5;&#x80FD;&#x4E0D;&#x80FD;&#x6B63;&#x5E38;&#x6DFB;&#x52A0;&#x5143;&#x7D20;
    if (state.num === 12) arr.push(9);

    return (
        &lt;div&gt;
            Hello World
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
}</code></pre><p>&#x901A;&#x8FC7;&#x53D8;&#x6362;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;&#x548C;&#x9002;&#x65F6;&#x7684;&#x6DFB;&#x52A0;/&#x5220;&#x9664;&#x5143;&#x7D20;&#xFF0C;&#x9A8C;&#x8BC1;&#x4E86;&#x4EE3;&#x7801;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x7684;&#x8BBE;&#x8BA1;&#x601D;&#x8DEF;&#x6B63;&#x786E;&#x8FD0;&#x884C;<span class="emoji emoji-satisfied"></span>&#x3002;</p><ul><li><h3>&#x603B;&#x7ED3;</h3></li></ul><p>&#x672C;&#x6587;&#x57FA;&#x4E8E;&#x4E0A;&#x4E00;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x52A0;&#x5165;&#x4E86;&#x5BF9;&#x552F;&#x4E00;&#x6807;&#x8BC6;&#xFF08;<code>key</code>&#xFF09;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x5F88;&#x597D;&#x7684;&#x63D0;&#x9AD8;&#x4E86;&#x66F4;&#x65B0;&#x6570;&#x7EC4;&#x5143;&#x7D20;&#x7684;&#x6548;&#x7387;&#x3002;&#x57FA;&#x4E8E;&#x5F53;&#x524D;&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x80FD;&#x505A;&#x600E;&#x6837;&#x7684;&#x4F18;&#x5316;&#x5462;&#xFF0C;&#x8BF7;&#x770B;&#x4E0B;&#x4E00;&#x7BC7;&#x7684;&#x5185;&#x5BB9;&#xFF1A;<a href="https://segmentfault.com/a/1190000016248276">&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684;Virtual DOM&#xFF08;&#x4E94;&#xFF09;&#xFF1A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</a>&#x3002;</p><p>P.S.: &#x60F3;&#x770B;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x89C1;&#x8FD9;&#x91CC;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5FC5;&#x8981;&#x5EFA;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#x7684;&#x8BDD;&#x8BF7;&#x7559;&#x8A00;&#x7ED9;&#x6211;&#xFF1A;<a href="https://gist.github.com/dickenslian/47642887c3cd22fe591944c1264488f5" rel="nofollow noreferrer">&#x4EE3;&#x7801;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的Virtual DOM（四）：key的作用

## 原文链接
[https://segmentfault.com/a/1190000016200003](https://segmentfault.com/a/1190000016200003)

