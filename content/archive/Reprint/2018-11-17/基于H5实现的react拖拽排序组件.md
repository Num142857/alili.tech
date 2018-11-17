---
title: '基于H5实现的react拖拽排序组件' 
date: 2018-11-17 02:30:13
hidden: true
slug: cqr0ey9w9oh
categories: [reprint]
---

{{< raw >}}
<p>&#x62D6;&#x62FD;&#x6392;&#x5E8F;&#x7EC4;&#x4EF6;Github&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/VicEcho/VDraggable.git" rel="nofollow noreferrer" target="_blank">https://github.com/VicEcho/VD...</a></p><p>&#x56E0;&#x4E3A;&#x4F7F;&#x7528;&#x4E86;react.js&#x6280;&#x672F;&#x6808;&#xFF0C;&#x6240;&#x4EE5;&#x5C01;&#x88C5;&#x4F18;&#x5148;&#x8003;&#x8651;&#x8F93;&#x5165;&#x548C;&#x8F93;&#x51FA;&#x3002;&#x57FA;&#x4E8E;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x53BB;&#x6E32;&#x67D3;&#x9875;&#x9762;&#x3001;&#x63A7;&#x5236;&#x62D6;&#x62FD;&#x5143;&#x7D20;&#x7684;&#x987A;&#x5E8F;&#x3002;</p><p>&#x7531;&#x4E8E;&#x6211;&#x4E0D;&#x8003;&#x8651;&#x517C;&#x5BB9;IE8&#x7B49;&#x65E7;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x62D6;&#x62FD;&#x7684;&#x6548;&#x679C;&#x91C7;&#x7528;&#x4E86;HTML5&#x7684;&#x62D6;&#x653E;&#xFF08;Drag &#x548C; drop&#xFF09;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x6C42;&#x517C;&#x5BB9;&#x6027;&#x4E30;&#x5BCC;&#xFF0C;&#x4F7F;&#x7528;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x7684;&#x76F8;&#x5173;&#x4E8B;&#x4EF6;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#x3002;</p><p>&#x5B9E;&#x73B0;&#x7684;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfc15?w=1218&amp;h=500" src="https://static.alili.tech/img/bVbfc15?w=1218&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x7B2C;&#x4E00;&#x6B65;&#x662F;&#x5148;&#x4E86;&#x89E3;H5&#x62D6;&#x653E;&#x7684;&#x76F8;&#x5173;&#x5C5E;&#x6027;&#xFF0C;MDN&#x4E0A;&#x6709;&#x8BE6;&#x7EC6;&#x7684;&#x8BF4;&#x660E;&#xFF0C;&#x94FE;&#x63A5;&#x4E3A;<a href="https://developer.mozilla.org/en-US/docs/Web/Events/dragstart" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br>&#x6709;&#x4E00;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;react.js&#x4F1A;&#x7ED9;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x4E8B;&#x4EF6;&#x540D;&#x79F0;&#x524D;&#x52A0;&#x4E0A;&quot;on&quot;,&#x540E;&#x9762;&#x5219;&#x4E3A;&#x9A7C;&#x5CF0;&#x5F0F;&#x5199;&#x6CD5;&#x3002;&#x4F8B;&#x5982;&#x539F;&#x751F;&#x7684;click&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;react.js&#x91CC;&#x5E94;&#x4F7F;&#x7528;onClick&#x4E8B;&#x4EF6;&#x3002;</p><p>&#x6211;&#x7684;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x7684;&#x62D6;&#x653E;&#x5C5E;&#x6027;&#x5982;&#x4E0B;&#xFF1A;</p><ol><li>draggable &#x5F53;&#x8BBE;&#x7F6E;&#x4E3A;true&#x65F6;&#xFF0C;&#x5F53;&#x524D;&#x63A7;&#x4EF6;&#x53EF;&#x4EE5;&#x62D6;&#x62FD;</li><li>onDragStart &#x63A7;&#x4EF6;&#x5F00;&#x59CB;&#x88AB;&#x62D6;&#x62FD;&#x65F6;&#x89E6;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;dataTransfer.setData()&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x5FC5;&#x8981;&#x7684;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x5728;&#x5BF9;&#x8C61;&#x4E2D;&#x4FBF;&#x4E8E;&#x5728;&#x5176;&#x5B83;&#x65B9;&#x6CD5;&#x4E2D;&#x8C03;&#x7528;</li><li>onDragOver &#x89C4;&#x5B9A;&#x5F53;&#x524D;&#x63A7;&#x4EF6;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x62D6;&#x62FD;&#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E00;&#x822C;&#x5728;&#x6B64;&#x65B9;&#x6CD5;&#x4E2D;&#x963B;&#x6B62;&#x5192;&#x6CE1;</li><li>onDragEnter &#x62D6;&#x52A8;&#x540E;&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x53E6;&#x4E00;&#x4E2A;&#x53EF;&#x63A5;&#x53D7;&#x533A;&#x57DF;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x901A;&#x8FC7;&#x5B83;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x79FB;&#x5165;&#x6548;&#x679C;</li><li>onDragLeave a&#x62D6;&#x5230;b&#xFF0C;&#x79BB;&#x5F00;b&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x76D1;&#x542C;&#x6D88;&#x9664;&#x79FB;&#x5165;&#x6548;&#x679C;&#x7684;&#x65F6;&#x673A;</li><li>onDrop &#x5F53;&#x63A7;&#x4EF6;&#x88AB;&#x201C;&#x91CA;&#x653E;&#x201D;&#x5230;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x91CA;&#x653E;&#x76EE;&#x6807;&#x4F4D;&#x7F6E;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x6211;&#x5728;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E2D;&#x5904;&#x7406;&#x6570;&#x636E;&#xFF0C;&#x5E76;&#x901A;&#x8FC7;&#x5B83;&#x8C03;&#x7528;onChange&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;value&#x503C;&#x66B4;&#x9732;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;</li></ol><p>&#x5176;&#x4E2D;draggable&#xFF0C;onDragStart&#x662F;&#x88AB;&#x201C;&#x62D6;&#x62FD;&#x201D;&#x65B9;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x7684;&#x5C5E;&#x6027;&#xFF0C;onDragOver&#xFF0C;onDragEnter&#xFF0C;onDragLeave&#x548C;onDrop&#x662F;&#x88AB;&#x201C;&#x62D6;&#x5165;&#x201D;&#x65B9;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x4E0D;&#x8FC7;&#x5BF9;&#x4E8E;&#x6211;&#x7684;&#x62D6;&#x62FD;&#x6392;&#x5E8F;&#x7EC4;&#x4EF6;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x662F;&#x62D6;&#x62FD;&#x548C;&#x62D6;&#x5165;&#x65B9;</p><p>&#x7B2C;&#x4E8C;&#x6B65;&#xFF0C;&#x65E2;&#x7136;&#x201C;&#x5979;&quot;&#x662F;react.js&#x7684;&#x7EC4;&#x4EF6;, &#x6309;&#x7167;&#x4E60;&#x60EF;&#xFF0C;&#x7B80;&#x5355;&#x7684;&#x5C06;&#x8F93;&#x5165;&#x5C5E;&#x6027;&#x5B9A;&#x4E3A;&#x4E3A;value&#xFF0C;&#x540C;&#x65F6;&#xFF0C;&#x66B4;&#x9732;onChange&#x4E8B;&#x4EF6;&#x76D1;&#x542C;value&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5E76;&#x5C06;&#x5176;&#x66B4;&#x9732;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#xFF0C;&#x540C;&#x65F6;&#xFF0C;&#x66B4;&#x9732;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;sortKey&#x544A;&#x8BC9;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x54EA;&#x4E2A;key&#x4F5C;&#x4E3A;&#x6392;&#x5E8F;&#x5B57;&#x6BB5;&#x3002;<br>&#x65E2;&#x7136;&#x6D89;&#x53CA;&#x5230;&#x6392;&#x5E8F;&#xFF0C;&#x540C;&#x65F6;&#x5141;&#x8BB8;&#x6307;&#x5B9A;&#x7EC4;&#x4EF6;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x5185;&#x90E8;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x5C06;&#x8F93;&#x5165;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x5B9A;&#x4E49;&#x4E3A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x4E2D;content&#x53EF;&#x4EE5;&#x4E3A;reactNode&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" value: [
                {
                    content: &apos;div1&apos;,
                    code: &apos;01&apos;,
                    sort: 0,
                },
                {
                    content: &apos;div2&apos;,
                    code: &apos;02&apos;,
                    sort: 1
                },
                {
                    content: &apos;div3&apos;,
                    code: &apos;03&apos;,
                    sort: 2
                },
                {
                    content: &apos;div5&apos;,
                    code: &apos;05&apos;,
                    sort: 5
                },
                {
                    content: &apos;div4&apos;,
                    code: &apos;04&apos;,
                    sort: 4
                }]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code> <span class="hljs-attribute">value</span>: [
                {
                    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;div1&apos;</span>,
                    <span class="hljs-attribute">code</span>: <span class="hljs-string">&apos;01&apos;</span>,
                    <span class="hljs-attribute">sort</span>: <span class="hljs-number">0</span>,
                },
                {
                    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;div2&apos;</span>,
                    <span class="hljs-attribute">code</span>: <span class="hljs-string">&apos;02&apos;</span>,
                    <span class="hljs-attribute">sort</span>: <span class="hljs-number">1</span>
                },
                {
                    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;div3&apos;</span>,
                    <span class="hljs-attribute">code</span>: <span class="hljs-string">&apos;03&apos;</span>,
                    <span class="hljs-attribute">sort</span>: <span class="hljs-number">2</span>
                },
                {
                    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;div5&apos;</span>,
                    <span class="hljs-attribute">code</span>: <span class="hljs-string">&apos;05&apos;</span>,
                    <span class="hljs-attribute">sort</span>: <span class="hljs-number">5</span>
                },
                {
                    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;div4&apos;</span>,
                    <span class="hljs-attribute">code</span>: <span class="hljs-string">&apos;04&apos;</span>,
                    <span class="hljs-attribute">sort</span>: <span class="hljs-number">4</span>
                }]</code></pre><p>&#x6839;&#x636E;value&#x6211;&#x53BB;&#x751F;&#x6210;&#x53EF;&#x6392;&#x5E8F;&#x7EC4;&#x4EF6;&#x7684;&#x6BCF;&#x4E2A;node&#xFF0C;&#x5173;&#x952E;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x751F;&#x6210;&#x62D6;&#x62FD;&#x7EC4;&#x4EF6;
    createDraggleComponent(data, sortKey, style, uId) {
        return data.sort(this.compare(sortKey)).map((item) =&gt; {
            return (
                &lt;div
                    className={styles.content}
                    key={item.code}
                    draggable={true}
                    onDragEnter={this.dragenter.bind(this)}
                    onDragLeave={this.dragleave.bind(this)}
                    onDragStart={this.domdrugstart.bind(this, item[sortKey], item.code, uId, item)}
                    onDrop={this.drop.bind(this, item[sortKey], data, sortKey, uId)}
                    onDragOver={this.allowDrop.bind(this)}
                    style="{{" ...style "}}"&gt;{item.content}&lt;/div&gt;
            )
        })
    }
    render() {
        const { value, sortKey, style } = this.props;
        return (
            &lt;Row&gt;
                &lt;div style="{{" display: &apos;flex&apos;, flexDirection: &apos;row&apos; "}}"&gt;
                    {this.createDraggleComponent(value, sortKey, style)}
                &lt;/div&gt;
            &lt;/Row&gt;
        )
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>    <span class="hljs-comment">// &#x751F;&#x6210;&#x62D6;&#x62FD;&#x7EC4;&#x4EF6;</span>
    createDraggleComponent(<span class="hljs-keyword">data</span>, sortKey, style, uId) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span>.sort(<span class="hljs-keyword">this</span>.compare(sortKey)).map((item) =&gt; {
            <span class="hljs-keyword">return</span> (
                &lt;div
                    className={styles.content}
                    key={item.code}
                    draggable={<span class="hljs-literal">true</span>}
                    onDragEnter={<span class="hljs-keyword">this</span>.dragenter.bind(<span class="hljs-keyword">this</span>)}
                    onDragLeave={<span class="hljs-keyword">this</span>.dragleave.bind(<span class="hljs-keyword">this</span>)}
                    onDragStart={<span class="hljs-keyword">this</span>.domdrugstart.bind(<span class="hljs-keyword">this</span>, item[sortKey], item.code, uId, item)}
                    onDrop={<span class="hljs-keyword">this</span>.drop.bind(<span class="hljs-keyword">this</span>, item[sortKey], <span class="hljs-keyword">data</span>, sortKey, uId)}
                    onDragOver={<span class="hljs-keyword">this</span>.allowDrop.bind(<span class="hljs-keyword">this</span>)}
                    style="{{" ...style "}}"&gt;{item.content}&lt;/div&gt;
            )
        })
    }
    render() {
        const { value, sortKey, style } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (
            &lt;Row&gt;
                &lt;div style="{{" display: <span class="hljs-string">&apos;flex&apos;</span>, flexDirection: <span class="hljs-string">&apos;row&apos;</span> "}}"&gt;
                    {<span class="hljs-keyword">this</span>.createDraggleComponent(value, sortKey, style)}
                &lt;/div&gt;
            &lt;/Row&gt;
        )
    }</code></pre><p>&#x5176;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x65B9;&#x6CD5;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x62D6;&#x52A8;&#x4E8B;&#x4EF6;
    domdrugstart(sort, code, ee) {
        ee.dataTransfer.setData(&quot;code&quot;, code);
        ee.dataTransfer.setData(&quot;sort&quot;, sort);
    }
    // &#x62D6;&#x52A8;&#x540E;&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x53E6;&#x4E00;&#x4E2A;&#x53EF;&#x63A5;&#x53D7;&#x533A;&#x57DF;
    dragenter(ee) {
        ee.target.style.border = &apos;2px dashed #008dff&apos;;
        ee.target.style.boxShadow = &apos;0 0 8px rgba(30, 144, 255, 0.8)&apos;;
    }
    // a&#x62D6;&#x5230;b&#xFF0C;&#x79BB;&#x5F00;b&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;
    dragleave(ee) {
        ee.target.style.border = &apos;1px solid grey&apos;;
        ee.target.style.boxShadow = &apos;&apos;;
    }
    // &#x5BF9;&#x8C61;&#x6392;&#x5E8F;
    compare(key) {
        return (obj1, obj2) =&gt; {
            if (obj1[key] &lt; obj2[key]) {
                return -1;
            } else if (obj1[key] &gt; obj2[key]) {
                return 1;
            }
            return 0
        }
    }
    // &#x5F53;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6216;&#x662F;&#x9009;&#x4E2D;&#x7684;&#x6587;&#x5B57;&#x88AB;&#x62D6;&#x62FD;&#x91CA;&#x653E;&#x5230;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x91CA;&#x653E;&#x76EE;&#x6807;&#x4F4D;&#x7F6E;&#x65F6;
    drop(dropedSort, data, sortKey, ee) {
        ee.preventDefault();
        const code = ee.dataTransfer.getData(&quot;code&quot;);
        const sort = ee.dataTransfer.getData(&quot;sort&quot;);
        if (sort &lt; dropedSort) {
            data.map(item =&gt; {
                if (item.code === code) {
                    item[sortKey] = dropedSort;
                } else if (item[sortKey] &gt; sort &amp;&amp; item[sortKey] &lt; dropedSort + 1) {
                    item[sortKey]--;
                }
                return item;
            });
        } else {
            data.map(item =&gt; {
                if (item.code === code) {
                    item[sortKey] = dropedSort;
                } else if (item[sortKey] &gt; dropedSort - 1 &amp;&amp; item[sortKey] &lt; sort) {
                    item[sortKey]++;
                }
                return item;
            });
        }
        this.props.onChange(data)
    }
    allowDrop(ee) {
        ee.preventDefault();
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>    <span class="hljs-comment">// &#x62D6;&#x52A8;&#x4E8B;&#x4EF6;</span>
    domdrugstart(<span class="hljs-built_in">sort</span>, code, ee) {
        ee.dataTransfer.setData(<span class="hljs-string">&quot;code&quot;</span>, code);
        ee.dataTransfer.setData(<span class="hljs-string">&quot;sort&quot;</span>, <span class="hljs-built_in">sort</span>);
    }
    <span class="hljs-comment">// &#x62D6;&#x52A8;&#x540E;&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x53E6;&#x4E00;&#x4E2A;&#x53EF;&#x63A5;&#x53D7;&#x533A;&#x57DF;</span>
    dragenter(ee) {
        ee.target.style.border = <span class="hljs-string">&apos;2px dashed #008dff&apos;</span>;
        ee.target.style.boxShadow = <span class="hljs-string">&apos;0 0 8px rgba(30, 144, 255, 0.8)&apos;</span>;
    }
    <span class="hljs-comment">// a&#x62D6;&#x5230;b&#xFF0C;&#x79BB;&#x5F00;b&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;</span>
    dragleave(ee) {
        ee.target.style.border = <span class="hljs-string">&apos;1px solid grey&apos;</span>;
        ee.target.style.boxShadow = <span class="hljs-string">&apos;&apos;</span>;
    }
    <span class="hljs-comment">// &#x5BF9;&#x8C61;&#x6392;&#x5E8F;</span>
    compare(<span class="hljs-built_in">key</span>) {
        <span class="hljs-keyword">return</span> (obj1, obj2) =&gt; {
            <span class="hljs-keyword">if</span> (obj1[<span class="hljs-built_in">key</span>] &lt; obj2[<span class="hljs-built_in">key</span>]) {
                <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (obj1[<span class="hljs-built_in">key</span>] &gt; obj2[<span class="hljs-built_in">key</span>]) {
                <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
            }
            <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
        }
    }
    <span class="hljs-comment">// &#x5F53;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6216;&#x662F;&#x9009;&#x4E2D;&#x7684;&#x6587;&#x5B57;&#x88AB;&#x62D6;&#x62FD;&#x91CA;&#x653E;&#x5230;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x91CA;&#x653E;&#x76EE;&#x6807;&#x4F4D;&#x7F6E;&#x65F6;</span>
    drop(dropedSort, data, sortKey, ee) {
        ee.preventDefault();
        <span class="hljs-keyword">const</span> code = ee.dataTransfer.getData(<span class="hljs-string">&quot;code&quot;</span>);
        <span class="hljs-keyword">const</span> <span class="hljs-built_in">sort</span> = ee.dataTransfer.getData(<span class="hljs-string">&quot;sort&quot;</span>);
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">sort</span> &lt; dropedSort) {
            data.<span class="hljs-built_in">map</span>(item =&gt; {
                <span class="hljs-keyword">if</span> (item.code === code) {
                    item[sortKey] = dropedSort;
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (item[sortKey] &gt; <span class="hljs-built_in">sort</span> &amp;&amp; item[sortKey] &lt; dropedSort + <span class="hljs-number">1</span>) {
                    item[sortKey]--;
                }
                <span class="hljs-keyword">return</span> item;
            });
        } <span class="hljs-keyword">else</span> {
            data.<span class="hljs-built_in">map</span>(item =&gt; {
                <span class="hljs-keyword">if</span> (item.code === code) {
                    item[sortKey] = dropedSort;
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (item[sortKey] &gt; dropedSort - <span class="hljs-number">1</span> &amp;&amp; item[sortKey] &lt; <span class="hljs-built_in">sort</span>) {
                    item[sortKey]++;
                }
                <span class="hljs-keyword">return</span> item;
            });
        }
        <span class="hljs-keyword">this</span>.props.onChange(data)
    }
    allowDrop(ee) {
        ee.preventDefault();
    }</code></pre><p>&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x70B9;&#x5176;&#x5B9E;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#xFF0C;&#x6211;&#x63A7;&#x5236;&#x987A;&#x5E8F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x4F7F;&#x7528;.target.before(document.getElementById({id}))&#x53BB;&#x5B9E;&#x9645;&#x64CD;&#x63A7;&#x8282;&#x70B9;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x6BCF;&#x6B21;&#x89E6;&#x53D1;onDrop&#x65F6;&#x95F4;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5904;&#x7406;&#x6570;&#x636E;&#x7684;sort&#xFF0C;&#x5E76;&#x901A;&#x8FC7;onChange&#x4E8B;&#x4EF6;&#x66B4;&#x9732;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C06;&#x6570;&#x636E;&#x8F93;&#x51FA;&#xFF0C;&#x901A;&#x8FC7;&#x6539;&#x53D8;value&#x503C;&#x89E6;&#x53D1;&#x865A;&#x62DF;dom&#x91CD;&#x65B0;&#x53BB;&#x6E32;&#x67D3;&#xFF0C;&#x4EE5;&#x6B64;&#x63A7;&#x5236;&#x987A;&#x5E8F;&#x3002;</p><p>&#x6839;&#x636E;&#x516C;&#x53F8;&#x7684;&#x8981;&#x6C42;&#xFF0C;&#x5728;&#x6B64;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x6211;&#x8FD8;&#x5B9E;&#x73B0;&#x4E86;&#x62D6;&#x62FD;&#x590D;&#x5236;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x8FD9;&#x4E2A;&#x7B49;&#x4E0B;&#x6B21;&#x81EA;&#x5DF1;&#x4E0D;&#x61D2;&#x7684;&#x65F6;&#x5019;&#x518D;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于H5实现的react拖拽排序组件

## 原文链接
[https://segmentfault.com/a/1190000015979373](https://segmentfault.com/a/1190000015979373)

