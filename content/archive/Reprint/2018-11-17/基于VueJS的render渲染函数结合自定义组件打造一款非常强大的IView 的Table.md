---
title: '基于VueJS的render渲染函数结合自定义组件打造一款非常强大的IView 的Table' 
date: 2018-11-17 02:30:13
hidden: true
slug: yo4zaq1kf7g
categories: [reprint]
---

{{< raw >}}
<p>1&#x3001;render&#x6E32;&#x67D3;&#x51FD;&#x6570;&#x7684;<a href="https://cn.vuejs.org/v2/api/#render" rel="nofollow noreferrer" target="_blank">&#x4ECB;&#x7ECD;</a></p><p>&#x5B57;&#x7B26;&#x4E32;&#x6A21;&#x677F;&#x7684;&#x4EE3;&#x66FF;&#x65B9;&#x6848;&#xFF0C;&#x5141;&#x8BB8;&#x4F60;&#x53D1;&#x6325; JavaScript &#x6700;&#x5927;&#x7684;&#x7F16;&#x7A0B;&#x80FD;&#x529B;&#x3002;&#x8BE5;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x4E00;&#x4E2A; createElement &#x65B9;&#x6CD5;&#x4F5C;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7528;&#x6765;&#x521B;&#x5EFA; VNode&#x3002;</p><p>&#x5982;&#x679C;&#x7EC4;&#x4EF6;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#xFF0C;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#x8FD8;&#x4F1A;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684; context &#x53C2;&#x6570;&#xFF0C;&#x4E3A;&#x6CA1;&#x6709;&#x5B9E;&#x4F8B;&#x7684;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x63D0;&#x4F9B;&#x4E0A;&#x4E0B;&#x6587;&#x4FE1;&#x606F;&#x3002;</p><p>2&#x3001;&#x5982;&#x4F55;&#x4F7F;&#x7528;render&#x51FD;&#x6570;&#xFF1F;<br>&#x4E0B;&#x9762;&#x662F;<a href="https://cn.vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer" target="_blank">vue&#x5B98;&#x7F51;&#x7684;&#x4F8B;&#x5B50;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join(&apos;&apos;)
}

Vue.component(&apos;anchored-heading&apos;, {
  render: function (createElement) {
    // &#x521B;&#x5EFA; kebabCase &#x98CE;&#x683C;&#x7684;ID
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, &apos;-&apos;)
      .replace(/(^\-|\-$)/g, &apos;&apos;)

    return createElement(
      &apos;h&apos; + this.level,
      [
        createElement(&apos;a&apos;, {
          attrs: {
            name: headingId,
            href: &apos;#&apos; + headingId
          }
        }, this.$slots.default)
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> getChildrenTextContent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">children</span>) </span>{
  <span class="hljs-keyword">return</span> children.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
    <span class="hljs-keyword">return</span> node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join(<span class="hljs-string">&apos;&apos;</span>)
}

Vue.component(<span class="hljs-string">&apos;anchored-heading&apos;</span>, {
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">createElement</span>) </span>{
    <span class="hljs-comment">// &#x521B;&#x5EFA; kebabCase &#x98CE;&#x683C;&#x7684;ID</span>
    <span class="hljs-keyword">var</span> headingId = getChildrenTextContent(<span class="hljs-keyword">this</span>.$slots.default)
      .toLowerCase()
      .replace(<span class="hljs-regexp">/\W+/g</span>, <span class="hljs-string">&apos;-&apos;</span>)
      .replace(<span class="hljs-regexp">/(^\-|\-$)/g</span>, <span class="hljs-string">&apos;&apos;</span>)

    <span class="hljs-keyword">return</span> createElement(
      <span class="hljs-string">&apos;h&apos;</span> + <span class="hljs-keyword">this</span>.level,
      [
        createElement(<span class="hljs-string">&apos;a&apos;</span>, {
          <span class="hljs-attr">attrs</span>: {
            <span class="hljs-attr">name</span>: headingId,
            <span class="hljs-attr">href</span>: <span class="hljs-string">&apos;#&apos;</span> + headingId
          }
        }, <span class="hljs-keyword">this</span>.$slots.default)
      ]
    )
  },
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">level</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
    }
  }
})</code></pre><p>3&#x3001;iview table&#x7EC4;&#x4EF6;<a href="https://www.iviewui.com/components/table" rel="nofollow noreferrer" target="_blank">&#x4ECB;&#x7ECD;</a></p><p>&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x5C55;&#x793A;&#x5927;&#x91CF;&#x7ED3;&#x6784;&#x5316;&#x6570;&#x636E;&#x3002;<br>&#x652F;&#x6301;&#x6392;&#x5E8F;&#x3001;&#x7B5B;&#x9009;&#x3001;&#x5206;&#x9875;&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x64CD;&#x4F5C;&#x3001;&#x5BFC;&#x51FA; csv &#x7B49;&#x590D;&#x6742;&#x529F;&#x80FD;&#x3002;</p><p>4&#x3001;iview table&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;Table :columns=&quot;columns1&quot; :data=&quot;data1&quot;&gt;&lt;/Table&gt;
&lt;/template&gt;
&lt;script&gt;
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: &apos;Name&apos;,
                        key: &apos;name&apos;
                    },
                    {
                        title: &apos;Age&apos;,
                        key: &apos;age&apos;
                    },
                    {
                        title: &apos;Address&apos;,
                        key: &apos;address&apos;
                    }
                ],
                data1: [
                    {
                        name: &apos;John Brown&apos;,
                        age: 18,
                        address: &apos;New York No. 1 Lake Park&apos;,
                        date: &apos;2016-10-03&apos;
                    },
                    {
                        name: &apos;Jim Green&apos;,
                        age: 24,
                        address: &apos;London No. 1 Lake Park&apos;,
                        date: &apos;2016-10-01&apos;
                    },
                    {
                        name: &apos;Joe Black&apos;,
                        age: 30,
                        address: &apos;Sydney No. 1 Lake Park&apos;,
                        date: &apos;2016-10-02&apos;
                    },
                    {
                        name: &apos;Jon Snow&apos;,
                        age: 26,
                        address: &apos;Ottawa No. 2 Lake Park&apos;,
                        date: &apos;2016-10-04&apos;
                    }
                ]
            }
        }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Table</span> <span class="hljs-attr">:columns</span>=<span class="hljs-string">&quot;columns1&quot;</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">&quot;data1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">columns1</span>: [
                    {
                        <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;Name&apos;</span>,
                        <span class="hljs-attr">key</span>: <span class="hljs-string">&apos;name&apos;</span>
                    },
                    {
                        <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;Age&apos;</span>,
                        <span class="hljs-attr">key</span>: <span class="hljs-string">&apos;age&apos;</span>
                    },
                    {
                        <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;Address&apos;</span>,
                        <span class="hljs-attr">key</span>: <span class="hljs-string">&apos;address&apos;</span>
                    }
                ],
                <span class="hljs-attr">data1</span>: [
                    {
                        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;John Brown&apos;</span>,
                        <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>,
                        <span class="hljs-attr">address</span>: <span class="hljs-string">&apos;New York No. 1 Lake Park&apos;</span>,
                        <span class="hljs-attr">date</span>: <span class="hljs-string">&apos;2016-10-03&apos;</span>
                    },
                    {
                        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Jim Green&apos;</span>,
                        <span class="hljs-attr">age</span>: <span class="hljs-number">24</span>,
                        <span class="hljs-attr">address</span>: <span class="hljs-string">&apos;London No. 1 Lake Park&apos;</span>,
                        <span class="hljs-attr">date</span>: <span class="hljs-string">&apos;2016-10-01&apos;</span>
                    },
                    {
                        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Joe Black&apos;</span>,
                        <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>,
                        <span class="hljs-attr">address</span>: <span class="hljs-string">&apos;Sydney No. 1 Lake Park&apos;</span>,
                        <span class="hljs-attr">date</span>: <span class="hljs-string">&apos;2016-10-02&apos;</span>
                    },
                    {
                        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Jon Snow&apos;</span>,
                        <span class="hljs-attr">age</span>: <span class="hljs-number">26</span>,
                        <span class="hljs-attr">address</span>: <span class="hljs-string">&apos;Ottawa No. 2 Lake Park&apos;</span>,
                        <span class="hljs-attr">date</span>: <span class="hljs-string">&apos;2016-10-04&apos;</span>
                    }
                ]
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6E32;&#x67D3;&#x6210;&#x5982;&#x4E0B;&#x8868;&#x683C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfaKS?w=1922&amp;h=634" src="https://static.alili.tech/img/bVbfaKS?w=1922&amp;h=634" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>5&#x3001;iview table render&#x51FD;&#x6570;&#x548C;renderHeader<a href="https://www.iviewui.com/components/table#column" rel="nofollow noreferrer" target="_blank">&#x4ECB;&#x7ECD;</a></p><p>render:</p><p>&#x81EA;&#x5B9A;&#x4E49;&#x6E32;&#x67D3;&#x5217;&#xFF0C;&#x4F7F;&#x7528; Vue &#x7684; Render &#x51FD;&#x6570;&#x3002;&#x4F20;&#x5165;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F; h&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E3A;&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x542B; row&#x3001;column &#x548C; index&#xFF0C;&#x5206;&#x522B;&#x6307;&#x5F53;&#x524D;&#x884C;&#x6570;&#x636E;&#xFF0C;&#x5F53;&#x524D;&#x5217;&#x6570;&#x636E;&#xFF0C;&#x5F53;&#x524D;&#x884C;&#x7D22;&#x5F15;&#xFF0C;&#x8BE6;&#x89C1;&#x793A;&#x4F8B;&#x3002; &#x5B66;&#x4E60; Render &#x51FD;&#x6570;&#x7684;&#x5185;&#x5BB9;</p><p>renderHeader:</p><p>&#x81EA;&#x5B9A;&#x4E49;&#x5217;&#x5934;&#x663E;&#x793A;&#x5185;&#x5BB9;&#xFF0C;&#x4F7F;&#x7528; Vue &#x7684; Render &#x51FD;&#x6570;&#x3002;&#x4F20;&#x5165;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F; h&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x4E3A;&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x542B; column &#x548C; index&#xFF0C;&#x5206;&#x522B;&#x4E3A;&#x5F53;&#x524D;&#x5217;&#x6570;&#x636E;&#x548C;&#x5F53;&#x524D;&#x5217;&#x7D22;&#x5F15;&#x3002;</p><p>6&#x3001;iview table render&#x51FD;&#x6570;&#x7684;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;Table border :columns=&quot;columns7&quot; :data=&quot;data6&quot;&gt;&lt;/Table&gt;
&lt;/template&gt;
&lt;script&gt;
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: &apos;Name&apos;,
                        key: &apos;name&apos;,
                        render: (h, params) =&gt; {
                            return h(&apos;div&apos;, [
                                h(&apos;Icon&apos;, {
                                    props: {
                                        type: &apos;person&apos;
                                    }
                                }),
                                h(&apos;strong&apos;, params.row.name)
                            ]);
                        }
                    },
                    {
                        title: &apos;Age&apos;,
                        key: &apos;age&apos;
                    },
                    {
                        title: &apos;Address&apos;,
                        key: &apos;address&apos;
                    },
                    {
                        title: &apos;Action&apos;,
                        key: &apos;action&apos;,
                        width: 150,
                        align: &apos;center&apos;,
                        render: (h, params) =&gt; {
                            return h(&apos;div&apos;, [
                                h(&apos;Button&apos;, {
                                    props: {
                                        type: &apos;primary&apos;,
                                        size: &apos;small&apos;
                                    },
                                    style: {
                                        marginRight: &apos;5px&apos;
                                    },
                                    on: {
                                        click: () =&gt; {
                                            this.show(params.index)
                                        }
                                    }
                                }, &apos;View&apos;),
                                h(&apos;Button&apos;, {
                                    props: {
                                        type: &apos;error&apos;,
                                        size: &apos;small&apos;
                                    },
                                    on: {
                                        click: () =&gt; {
                                            this.remove(params.index)
                                        }
                                    }
                                }, &apos;Delete&apos;)
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: &apos;John Brown&apos;,
                        age: 18,
                        address: &apos;New York No. 1 Lake Park&apos;
                    },
                    {
                        name: &apos;Jim Green&apos;,
                        age: 24,
                        address: &apos;London No. 1 Lake Park&apos;
                    },
                    {
                        name: &apos;Joe Black&apos;,
                        age: 30,
                        address: &apos;Sydney No. 1 Lake Park&apos;
                    },
                    {
                        name: &apos;Jon Snow&apos;,
                        age: 26,
                        address: &apos;Ottawa No. 2 Lake Park&apos;
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: &apos;User Info&apos;,
                    content: `Name&#xFF1A;${this.data6[index].name}&lt;br&gt;Age&#xFF1A;${this.data6[index].age}&lt;br&gt;Address&#xFF1A;${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>&lt;template&gt;
    &lt;Table border :columns=<span class="hljs-string">&quot;columns7&quot;</span> :data=<span class="hljs-string">&quot;data6&quot;</span>&gt;&lt;/Table&gt;
&lt;/template&gt;
&lt;script&gt;
    export <span class="hljs-keyword">default</span> {
        data () {
            return {
                columns7: [
                    {
                        title: <span class="hljs-string">&apos;Name&apos;</span>,
                        key: <span class="hljs-string">&apos;name&apos;</span>,
                        render: (h, params) =&gt; {
                            return h(<span class="hljs-string">&apos;div&apos;</span>, [
                                h(<span class="hljs-string">&apos;Icon&apos;</span>, {
                                    props: {
                                        type: <span class="hljs-string">&apos;person&apos;</span>
                                    }
                                }),
                                h(<span class="hljs-string">&apos;strong&apos;</span>, params.row.name)
                            ]);
                        }
                    },
                    {
                        title: <span class="hljs-string">&apos;Age&apos;</span>,
                        key: <span class="hljs-string">&apos;age&apos;</span>
                    },
                    {
                        title: <span class="hljs-string">&apos;Address&apos;</span>,
                        key: <span class="hljs-string">&apos;address&apos;</span>
                    },
                    {
                        title: <span class="hljs-string">&apos;Action&apos;</span>,
                        key: <span class="hljs-string">&apos;action&apos;</span>,
                        width: <span class="hljs-number">150</span>,
                        align: <span class="hljs-string">&apos;center&apos;</span>,
                        render: (h, params) =&gt; {
                            return h(<span class="hljs-string">&apos;div&apos;</span>, [
                                h(<span class="hljs-string">&apos;Button&apos;</span>, {
                                    props: {
                                        type: <span class="hljs-string">&apos;primary&apos;</span>,
                                        size: <span class="hljs-string">&apos;small&apos;</span>
                                    },
                                    style: {
                                        marginRight: <span class="hljs-string">&apos;5px&apos;</span>
                                    },
                                    on: {
                                        click: () =&gt; {
                                            this.show(params.index)
                                        }
                                    }
                                }, <span class="hljs-string">&apos;View&apos;</span>),
                                h(<span class="hljs-string">&apos;Button&apos;</span>, {
                                    props: {
                                        type: <span class="hljs-string">&apos;error&apos;</span>,
                                        size: <span class="hljs-string">&apos;small&apos;</span>
                                    },
                                    on: {
                                        click: () =&gt; {
                                            this.remove(params.index)
                                        }
                                    }
                                }, <span class="hljs-string">&apos;Delete&apos;</span>)
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: <span class="hljs-string">&apos;John Brown&apos;</span>,
                        age: <span class="hljs-number">18</span>,
                        address: <span class="hljs-string">&apos;New York No. 1 Lake Park&apos;</span>
                    },
                    {
                        name: <span class="hljs-string">&apos;Jim Green&apos;</span>,
                        age: <span class="hljs-number">24</span>,
                        address: <span class="hljs-string">&apos;London No. 1 Lake Park&apos;</span>
                    },
                    {
                        name: <span class="hljs-string">&apos;Joe Black&apos;</span>,
                        age: <span class="hljs-number">30</span>,
                        address: <span class="hljs-string">&apos;Sydney No. 1 Lake Park&apos;</span>
                    },
                    {
                        name: <span class="hljs-string">&apos;Jon Snow&apos;</span>,
                        age: <span class="hljs-number">26</span>,
                        address: <span class="hljs-string">&apos;Ottawa No. 2 Lake Park&apos;</span>
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: <span class="hljs-string">&apos;User Info&apos;</span>,
                    content: `Name&#xFF1A;${this.data6[index].name}&lt;br&gt;Age&#xFF1A;${this.data6[index].age}&lt;br&gt;Address&#xFF1A;${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, <span class="hljs-number">1</span>);
            }
        }
    }
&lt;/script&gt;</code></pre><p>&#x6E32;&#x67D3;&#x6210;&#x5982;&#x4E0B;table</p><p><span class="img-wrap"><img data-src="/img/bVbfaLc?w=1938&amp;h=564" src="https://static.alili.tech/img/bVbfaLc?w=1938&amp;h=564" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>7&#x3001;iview render&#x548C;renderHeader&#x7ED3;&#x5408;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF0C;&#x6E32;&#x67D3;table&#x8868;&#x683C;</p><p>QiDropdown.vue&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style lang=&quot;postcss&quot; scoped&gt;
.dd{
    &amp; .ivu-select-dropdown{
        max-height: 100% !important;
    }
    &amp; .ivu-select-dropdown{
        max-height: 100% !important;
    }
    &amp; &gt;.ddm{
        text-align: left;
        font-weight:normal;
        &amp; .active{
            color:#008cee
        }
    }    
}
&lt;/style&gt;
&lt;template&gt;
&lt;div class=&quot;dd&quot;&gt;
    &lt;Dropdown :placement=&quot;placement&quot; @on-click=&quot;ddClick&quot; transfer &gt;
        &lt;span v-if=&quot;content.length &gt; 0&quot; style=&quot;cursor:pointer&quot;&gt;
            "{{"content"}}"            
            &lt;Icon type=&quot;arrow-down-b&quot; v-if=&quot;showArrow&quot;/&gt;
        &lt;/span&gt;
        &lt;Icon type=&quot;plus&quot; v-else style=&quot;cursor:pointer&quot;&gt;&lt;/Icon&gt;
        &lt;DropdownMenu slot=&quot;list&quot; class=&quot;ddm&quot;&gt;
            &lt;DropdownItem v-for=&quot;(item, index) in data&quot; :key=&quot;index&quot; :name=&quot;item.value&quot; 
                :style=&quot;{color:localChoosedItem == item.value ? activeColor:defaultColor}&quot;&gt;"{{"item.name"}}"&lt;/DropdownItem&gt;
            &lt;slot name=&quot;diy&quot;&gt;&lt;/slot&gt;
        &lt;/DropdownMenu&gt;
    &lt;/Dropdown&gt;
&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
    data(){
        return{
            activeColor:&apos;#008cee&apos;,
            defaultColor:&apos;#495060&apos;,
            localChoosedItem:&apos;&apos;
        }
    },
    props:{
        placement:{
            type:String,
            default:&apos;bottom-start&apos;
        },
        showArrow:{
            type:Boolean,
            default:false
        },
        content:{
            type:String,
            default:&apos;&apos;
        },
        data:{
            type:Array,
            default:()=&gt;{
                return [];
            }
        },
        choosedItem:{
            type:String,
            default:&apos;&apos;
        }
    },
    watch:{
        choosedItem:{
            immediate:true,
            handler(newv,oldv){
                this.localChoosedItem = newv;
            }
        }
    },
    created(){

    },
    methods:{
        ddClick(name){
            this.$emit(&apos;on-choosed&apos;,name);
            this.localChoosedItem = name;
        }
    }
}
&lt;/script&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;postcss&quot;</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
.dd{
    &amp; .ivu-select-dropdown{
        max-height: 100% !important;
    }
    &amp; .ivu-select-dropdown{
        max-height: 100% !important;
    }
    &amp; &gt;.ddm{
        text-align: left;
        font-weight:normal;
        &amp; .active{
            color:#008cee
        }
    }    
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;dd&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Dropdown</span> <span class="hljs-attr">:placement</span>=<span class="hljs-string">&quot;placement&quot;</span> @<span class="hljs-attr">on-click</span>=<span class="hljs-string">&quot;ddClick&quot;</span> <span class="hljs-attr">transfer</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;content.length &gt; 0&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;cursor:pointer&quot;</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"content"}}"</span><span class="xml">            
            <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;arrow-down-b&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;showArrow&quot;</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;plus&quot;</span> <span class="hljs-attr">v-else</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;cursor:pointer&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Icon</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">DropdownMenu</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ddm&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">DropdownItem</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item, index) in data&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">&quot;item.value&quot;</span> 
                <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;{color:localChoosedItem == item.value ? activeColor:defaultColor}&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">DropdownItem</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;diy&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">DropdownMenu</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Dropdown</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">activeColor</span>:<span class="hljs-string">&apos;#008cee&apos;</span>,
            <span class="hljs-attr">defaultColor</span>:<span class="hljs-string">&apos;#495060&apos;</span>,
            <span class="hljs-attr">localChoosedItem</span>:<span class="hljs-string">&apos;&apos;</span>
        }
    },
    <span class="hljs-attr">props</span>:{
        <span class="hljs-attr">placement</span>:{
            <span class="hljs-attr">type</span>:<span class="hljs-built_in">String</span>,
            <span class="hljs-attr">default</span>:<span class="hljs-string">&apos;bottom-start&apos;</span>
        },
        <span class="hljs-attr">showArrow</span>:{
            <span class="hljs-attr">type</span>:<span class="hljs-built_in">Boolean</span>,
            <span class="hljs-attr">default</span>:<span class="hljs-literal">false</span>
        },
        <span class="hljs-attr">content</span>:{
            <span class="hljs-attr">type</span>:<span class="hljs-built_in">String</span>,
            <span class="hljs-attr">default</span>:<span class="hljs-string">&apos;&apos;</span>
        },
        <span class="hljs-attr">data</span>:{
            <span class="hljs-attr">type</span>:<span class="hljs-built_in">Array</span>,
            <span class="hljs-attr">default</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                <span class="hljs-keyword">return</span> [];
            }
        },
        <span class="hljs-attr">choosedItem</span>:{
            <span class="hljs-attr">type</span>:<span class="hljs-built_in">String</span>,
            <span class="hljs-attr">default</span>:<span class="hljs-string">&apos;&apos;</span>
        }
    },
    <span class="hljs-attr">watch</span>:{
        <span class="hljs-attr">choosedItem</span>:{
            <span class="hljs-attr">immediate</span>:<span class="hljs-literal">true</span>,
            handler(newv,oldv){
                <span class="hljs-keyword">this</span>.localChoosedItem = newv;
            }
        }
    },
    created(){

    },
    <span class="hljs-attr">methods</span>:{
        ddClick(name){
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;on-choosed&apos;</span>,name);
            <span class="hljs-keyword">this</span>.localChoosedItem = name;
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</span></code></pre><p>8&#x3001;&#x7236;&#x7EC4;&#x4EF6;&#x5F15;&#x5165;QiDropdown&#x7EC4;&#x4EF6;&#x5E76;&#x5E94;&#x7528;&#x5230;table &#x7684;render&#x548C;renderHeader&#x51FD;&#x6570;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import QiDropdown from &apos;@/components/QiDropdown&apos;

export default {
    name: &apos;email-list&apos;,
    components:{
        QiDropdown
    },
...
columns: [
                {
                    title: &apos;&#x6807;&#x6CE8;&apos;,
                    key: &apos;callout&apos;,
                    align:&apos;center&apos;,
                    renderHeader:(h,params)=&gt;{
                        return h(QiDropdown,{
                            props:{                                
                                placement:&apos;bottom-start&apos;,
                                showArrow:true,
                                content:&apos;&#x6807;&#x6CE8;&apos;,
                                data:this.flags
                            },
                            on:{
                                &apos;on-choosed&apos;:(value)=&gt;{        
                                    this.queryForm.callout = value;                            
                                    this.getResumeFromEmailBy();
                                }
                            }
                        });
                    },
                    render:(h,params)=&gt;{
                        return h(QiDropdown,{
                                props:{
                                    content:params.row.callout||&apos;&apos;,
                                    data:this.flags.slice(1)
                                },
                                on:{
                                    &apos;on-choosed&apos;:(value)=&gt;{
                                        this.choosedFlag(params.row.id,value);    
                                    }
                                }
                            },[ 
                                h(&apos;DropdownItem&apos;,
                                {
                                    slot: &apos;diy&apos;,
                                    style:{
                                        color:&apos;#2d8cf0&apos;
                                    },
                                    props:{
                                        name:&apos;add&apos;,
                                        divided:true
                                    }
                                }, 
                                &apos;&#x6DFB;&#x52A0;&#x5E76;&#x6807;&#x6CE8;&apos;),
                                h(&apos;DropdownItem&apos;,
                                {
                                    slot: &apos;diy&apos;,
                                    style:{
                                        color:&apos;#2d8cf0&apos;
                                    },
                                    props:{
                                        name:&apos;clear&apos;
                                    }
                                }, 
                                &apos;&#x6E05;&#x9664;&#x8BE5;&#x6807;&#x6CE8;&apos;)
                            ]);
                        
                    }
                }, 
                ...

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> QiDropdown <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/QiDropdown&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    name: <span class="hljs-string">&apos;email-list&apos;</span>,
    components:{
        QiDropdown
    },
...
columns: [
                {
                    title: <span class="hljs-string">&apos;&#x6807;&#x6CE8;&apos;</span>,
                    key: <span class="hljs-string">&apos;callout&apos;</span>,
                    align:<span class="hljs-string">&apos;center&apos;</span>,
                    renderHeader:<span class="hljs-function"><span class="hljs-params">(h,params)</span>=&gt;</span>{
                        <span class="hljs-keyword">return</span> h(QiDropdown,{
                            props:{                                
                                placement:<span class="hljs-string">&apos;bottom-start&apos;</span>,
                                showArrow:<span class="hljs-literal">true</span>,
                                content:<span class="hljs-string">&apos;&#x6807;&#x6CE8;&apos;</span>,
                                data:<span class="hljs-keyword">this</span>.flags
                            },
                            on:{
                                <span class="hljs-string">&apos;on-choosed&apos;</span>:<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{        
                                    <span class="hljs-keyword">this</span>.queryForm.callout = value;                            
                                    <span class="hljs-keyword">this</span>.getResumeFromEmailBy();
                                }
                            }
                        });
                    },
                    render:<span class="hljs-function"><span class="hljs-params">(h,params)</span>=&gt;</span>{
                        <span class="hljs-keyword">return</span> h(QiDropdown,{
                                props:{
                                    content:params.row.callout||<span class="hljs-string">&apos;&apos;</span>,
                                    data:<span class="hljs-keyword">this</span>.flags.slice(<span class="hljs-number">1</span>)
                                },
                                on:{
                                    <span class="hljs-string">&apos;on-choosed&apos;</span>:<span class="hljs-function"><span class="hljs-params">(value)</span>=&gt;</span>{
                                        <span class="hljs-keyword">this</span>.choosedFlag(params.row.id,value);    
                                    }
                                }
                            },[ 
                                h(<span class="hljs-string">&apos;DropdownItem&apos;</span>,
                                {
                                    slot: <span class="hljs-string">&apos;diy&apos;</span>,
                                    style:{
                                        color:<span class="hljs-string">&apos;#2d8cf0&apos;</span>
                                    },
                                    props:{
                                        name:<span class="hljs-string">&apos;add&apos;</span>,
                                        divided:<span class="hljs-literal">true</span>
                                    }
                                }, 
                                <span class="hljs-string">&apos;&#x6DFB;&#x52A0;&#x5E76;&#x6807;&#x6CE8;&apos;</span>),
                                h(<span class="hljs-string">&apos;DropdownItem&apos;</span>,
                                {
                                    slot: <span class="hljs-string">&apos;diy&apos;</span>,
                                    style:{
                                        color:<span class="hljs-string">&apos;#2d8cf0&apos;</span>
                                    },
                                    props:{
                                        name:<span class="hljs-string">&apos;clear&apos;</span>
                                    }
                                }, 
                                <span class="hljs-string">&apos;&#x6E05;&#x9664;&#x8BE5;&#x6807;&#x6CE8;&apos;</span>)
                            ]);
                        
                    }
                }, 
                ...

</code></pre><p>&#x6E32;&#x67D3;&#x6210;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfaLJ?w=2468&amp;h=1246" src="https://static.alili.tech/img/bVbfaLJ?w=2468&amp;h=1246" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbfaLR?w=2460&amp;h=1208" src="https://static.alili.tech/img/bVbfaLR?w=2460&amp;h=1208" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>9&#x3001;&#x603B;&#x7ED3;&#xFF1A;<br>1&#xFF09;&#x6709;&#x4E86;render&#x51FD;&#x6570;&#x52A0;&#x4E0A;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x518D;&#x4E5F;&#x4E0D;&#x6015;iview table&#x7EC4;&#x4EF6;&#x529F;&#x80FD;&#x7684;&#x5355;&#x8C03;&#x4E86;&#xFF0C;&#x4E00;&#x5F00;&#x59CB;&#x6211;&#x4E5F;&#x4EE5;&#x4E3A;iview table&#x529F;&#x80FD;&#x592A;&#x5C11;&#xFF0C;&#x73B0;&#x5728;&#x6709;&#x4E86;&#x5B83;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4F60;&#x4EFB;&#x4F55;&#x60F3;&#x5B9E;&#x73B0;&#x7684;&#x8868;&#x683C;&#x4E86;&#xFF0C;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF01;</p><p>2&#xFF09;iview Dropdown&#x7EC4;&#x4EF6;&#x4E0A;&#x4E00;&#x5B9A;&#x8981;&#x52A0; transfer &#x5C5E;&#x6027;&#xFF0C;&#x5426;&#x5219;&#x5B83;&#x4E0D;&#x80FD;&#x6B63;&#x5E38;&#x663E;&#x793A;&#x51FA;&#x6765;</p><p>3&#xFF09;render&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;slot&#xFF0C;&#x5982;&#x6211;&#x7684;QiDrowdown&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E2A;slot name=diy&#xFF0C;&#x90A3;&#x5B83;&#x5728;render&#x51FD;&#x6570;&#x91CC;&#x9762;&#x5C31;&#x662F;&#x8981;&#x5199;&#x5230;QiDrowdownr &#x6570;&#x7EC4;&#x4E2D;&#xFF0C;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h(QiDrowdown,
{//&#x8FD9;&#x91CC;&#x5199;QiDrowdown&#x5C5E;&#x6027;props&#x3001;&#x4E8B;&#x4EF6;on&#x3001;&#x6837;&#x5F0F;style&#x7B49;&#x7B49;},
[//&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x5199;slot&#x7EC4;&#x4EF6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5176;&#x5B83;&#x7EC4;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x662F;slot&#x4F60;&#x8981;&#x8FD9;&#x6837;&#x5199;&#xFF1A;
    h(&apos;DropdownItem&apos;,
                                {
                                    slot: &apos;diy&apos;,//&#x8BB0;&#x4F4F;&#x8FD9;&#x91CC;&#x8981;&#x5199;&#x4E0A;QiDrowdown&#x7EC4;&#x4EF6;slot&#x7684;name
                                    style:{
                                        color:&apos;#2d8cf0&apos;
                                    },
                                    props:{
                                        name:&apos;add&apos;,
                                        divided:true
                                    }
                                }, 
                                &apos;&#x6DFB;&#x52A0;&#x5E76;&#x6807;&#x6CE8;&apos;),
                                
&#x8FD9;&#x6837;&#x6E32;&#x67D3;&#x5C31;&#x7B49;&#x4E8E;&#x662F;&#x8FD9;&#x6837;&#x5199;&#xFF1A;
&lt;QiDrowdown&gt;
    &lt;DropdownItem slot=&quot;diy&quot; style=&quot;color:#2d8cf0&quot; name=&quot;add&quot; divided&gt;&lt;/DropdownItem&gt;
&lt;/QiDrowdown&gt;
])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>h(QiDrowdown,
{<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5199;QiDrowdown&#x5C5E;&#x6027;props&#x3001;&#x4E8B;&#x4EF6;on&#x3001;&#x6837;&#x5F0F;style&#x7B49;&#x7B49;},</span>
[<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x5199;slot&#x7EC4;&#x4EF6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5176;&#x5B83;&#x7EC4;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x662F;slot&#x4F60;&#x8981;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</span>
    h(<span class="hljs-string">&apos;DropdownItem&apos;</span>,
                                {
                                    slot: <span class="hljs-string">&apos;diy&apos;</span>,<span class="hljs-comment">//&#x8BB0;&#x4F4F;&#x8FD9;&#x91CC;&#x8981;&#x5199;&#x4E0A;QiDrowdown&#x7EC4;&#x4EF6;slot&#x7684;name</span>
                                    style:{
                                        <span class="hljs-built_in">color</span>:<span class="hljs-string">&apos;#2d8cf0&apos;</span>
                                    },
                                    props:{
                                        <span class="hljs-keyword">name</span>:<span class="hljs-string">&apos;add&apos;</span>,
                                        divided:<span class="hljs-literal">true</span>
                                    }
                                }, 
                                <span class="hljs-string">&apos;&#x6DFB;&#x52A0;&#x5E76;&#x6807;&#x6CE8;&apos;</span>),
                                
&#x8FD9;&#x6837;&#x6E32;&#x67D3;&#x5C31;&#x7B49;&#x4E8E;&#x662F;&#x8FD9;&#x6837;&#x5199;&#xFF1A;
&lt;QiDrowdown&gt;
    &lt;DropdownItem slot=<span class="hljs-string">&quot;diy&quot;</span> style=<span class="hljs-string">&quot;color:#2d8cf0&quot;</span> <span class="hljs-keyword">name</span>=<span class="hljs-string">&quot;add&quot;</span> divided&gt;&lt;/DropdownItem&gt;
&lt;/QiDrowdown&gt;
])</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x5E2E;&#x52A9;&#x5230;&#x4F60;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x6253;&#x8D4F;&#x6211;&#x66F4;&#x6709;&#x52A8;&#x529B;&#x6765;&#x66F4;&#x65B0;&#x6587;&#x7AE0;</p><p><span class="img-wrap"><img data-src="/img/bVbhA0O?w=900&amp;h=1350" src="https://static.alili.tech/img/bVbhA0O?w=900&amp;h=1350" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>10&#x3001;&#x5F15;&#x7528;<br>1&#xFF09;<a href="https://blog.csdn.net/wngzhem/article/details/54344191" rel="nofollow noreferrer" target="_blank">vue Render&#x4E2D;slots&#x7684;&#x4F7F;&#x7528;</a><br>2&#xFF09;<a href="https://cn.vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer" target="_blank">&#x6E32;&#x67D3;&#x51FD;&#x6570; &amp; JSX</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于VueJS的render渲染函数结合自定义组件打造一款非常强大的IView 的Table

## 原文链接
[https://segmentfault.com/a/1190000015970367](https://segmentfault.com/a/1190000015970367)

