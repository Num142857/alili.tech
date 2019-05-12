---
title: '虚拟dom比对原理' 
date: 2018-12-14 2:30:11
hidden: true
slug: 7lnixdisycx
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">dom对比步骤</h2>
<p>1.用js对象来表达dom结构</p>
<p><strong>tagName</strong> 标签名<br><strong>props</strong> 元素属性<br><strong>key</strong> 唯一标识<br><strong>children</strong> 子元素,格式和父元素一样<br><strong>count</strong> 有几个子元素，用于计算当前元素的索引，处于整个dom中的第几个，方便dom操作</p>
<h4>原js对象</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;tagName&quot;: &quot;div&quot;,
    &quot;props&quot;: {
        &quot;id&quot;: &quot;container&quot;
    },
    &quot;children&quot;: [
        {
            &quot;tagName&quot;: &quot;h1&quot;,
            &quot;props&quot;: {
                &quot;style&quot;: &quot;color:red&quot;
            },
            &quot;children&quot;: [
                &quot;simple virtual dom&quot;
            ],
            &quot;count&quot;: 1
        },
        {
            &quot;tagName&quot;: &quot;p&quot;,
            &quot;props&quot;: {},
            &quot;children&quot;: [
                &quot;hello world&quot;
            ],
            &quot;count&quot;: 1
        },
        {
            &quot;tagName&quot;: &quot;ul&quot;,
            &quot;props&quot;: {},
            &quot;children&quot;: [
                {
                    &quot;tagName&quot;: &quot;li&quot;,
                    &quot;props&quot;: {},
                    &quot;children&quot;: [
                        &quot;item #1&quot;
                    ],
                    &quot;count&quot;: 1
                },
                {
                    &quot;tagName&quot;: &quot;li&quot;,
                    &quot;props&quot;: {},
                    &quot;children&quot;: [
                        &quot;item #2&quot;
                    ],
                    &quot;count&quot;: 1
                }
            ],
            &quot;count&quot;: 4
        }
    ],
    &quot;count&quot;: 9
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"div"</span>,
    <span class="hljs-attr">"props"</span>: {
        <span class="hljs-attr">"id"</span>: <span class="hljs-string">"container"</span>
    },
    <span class="hljs-attr">"children"</span>: [
        {
            <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"h1"</span>,
            <span class="hljs-attr">"props"</span>: {
                <span class="hljs-attr">"style"</span>: <span class="hljs-string">"color:red"</span>
            },
            <span class="hljs-attr">"children"</span>: [
                <span class="hljs-string">"simple virtual dom"</span>
            ],
            <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
        },
        {
            <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"p"</span>,
            <span class="hljs-attr">"props"</span>: {},
            <span class="hljs-attr">"children"</span>: [
                <span class="hljs-string">"hello world"</span>
            ],
            <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
        },
        {
            <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"ul"</span>,
            <span class="hljs-attr">"props"</span>: {},
            <span class="hljs-attr">"children"</span>: [
                {
                    <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"li"</span>,
                    <span class="hljs-attr">"props"</span>: {},
                    <span class="hljs-attr">"children"</span>: [
                        <span class="hljs-string">"item #1"</span>
                    ],
                    <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
                },
                {
                    <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"li"</span>,
                    <span class="hljs-attr">"props"</span>: {},
                    <span class="hljs-attr">"children"</span>: [
                        <span class="hljs-string">"item #2"</span>
                    ],
                    <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
                }
            ],
            <span class="hljs-attr">"count"</span>: <span class="hljs-number">4</span>
        }
    ],
    <span class="hljs-attr">"count"</span>: <span class="hljs-number">9</span>
}</code></pre>
<p>2.原js对象渲染成dom结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
    <h1 style=&quot;color: red;&quot;>simple virtual dom</h1>
    <p>hello world</p>
    <ul>
        <li>item #1</li>
        <li>item #2</li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: red;"</span>&gt;</span>simple virtual dom<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item #1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item #2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>3.修改原js对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;tagName&quot;: &quot;div&quot;,
    &quot;props&quot;: {
        &quot;id&quot;: &quot;container2&quot;
    },
    &quot;children&quot;: [
        {
            &quot;tagName&quot;: &quot;h5&quot;,
            &quot;props&quot;: {
                &quot;style&quot;: &quot;color:red&quot;
            },
            &quot;children&quot;: [
                &quot;simple virtual dom&quot;
            ],
            &quot;count&quot;: 1
        },
        {
            &quot;tagName&quot;: &quot;p&quot;,
            &quot;props&quot;: {},
            &quot;children&quot;: [
                &quot;hello world2&quot;
            ],
            &quot;count&quot;: 1
        },
        {
            &quot;tagName&quot;: &quot;ul&quot;,
            &quot;props&quot;: {},
            &quot;children&quot;: [
                {
                    &quot;tagName&quot;: &quot;li&quot;,
                    &quot;props&quot;: {},
                    &quot;children&quot;: [
                        &quot;item #1&quot;
                    ],
                    &quot;count&quot;: 1
                },
                {
                    &quot;tagName&quot;: &quot;li&quot;,
                    &quot;props&quot;: {},
                    &quot;children&quot;: [
                        &quot;item #2&quot;
                    ],
                    &quot;count&quot;: 1
                },
                {
                    &quot;tagName&quot;: &quot;li&quot;,
                    &quot;props&quot;: {},
                    &quot;children&quot;: [
                        &quot;item #3&quot;
                    ],
                    &quot;count&quot;: 1
                }
            ],
            &quot;count&quot;: 6
        }
    ],
    &quot;count&quot;: 11
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"div"</span>,
    <span class="hljs-attr">"props"</span>: {
        <span class="hljs-attr">"id"</span>: <span class="hljs-string">"container2"</span>
    },
    <span class="hljs-attr">"children"</span>: [
        {
            <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"h5"</span>,
            <span class="hljs-attr">"props"</span>: {
                <span class="hljs-attr">"style"</span>: <span class="hljs-string">"color:red"</span>
            },
            <span class="hljs-attr">"children"</span>: [
                <span class="hljs-string">"simple virtual dom"</span>
            ],
            <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
        },
        {
            <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"p"</span>,
            <span class="hljs-attr">"props"</span>: {},
            <span class="hljs-attr">"children"</span>: [
                <span class="hljs-string">"hello world2"</span>
            ],
            <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
        },
        {
            <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"ul"</span>,
            <span class="hljs-attr">"props"</span>: {},
            <span class="hljs-attr">"children"</span>: [
                {
                    <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"li"</span>,
                    <span class="hljs-attr">"props"</span>: {},
                    <span class="hljs-attr">"children"</span>: [
                        <span class="hljs-string">"item #1"</span>
                    ],
                    <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
                },
                {
                    <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"li"</span>,
                    <span class="hljs-attr">"props"</span>: {},
                    <span class="hljs-attr">"children"</span>: [
                        <span class="hljs-string">"item #2"</span>
                    ],
                    <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
                },
                {
                    <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"li"</span>,
                    <span class="hljs-attr">"props"</span>: {},
                    <span class="hljs-attr">"children"</span>: [
                        <span class="hljs-string">"item #3"</span>
                    ],
                    <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
                }
            ],
            <span class="hljs-attr">"count"</span>: <span class="hljs-number">6</span>
        }
    ],
    <span class="hljs-attr">"count"</span>: <span class="hljs-number">11</span>
}</code></pre>
<p>4.对比哪些节点被修改<br><strong>type</strong> 类型，0为标签名改变，1为子元素改变（删除或添加），2为属性改变，3为内容改变<br><strong>key</strong> 对象第一层中key值表示索引，原dom中第几个元素发生变化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;0&quot;: [
        {
            &quot;type&quot;: 2,
            &quot;props&quot;: {
                &quot;id&quot;: &quot;container2&quot;
            }
        }
    ],
    &quot;1&quot;: [
        {
            &quot;type&quot;: 0,
            &quot;node&quot;: {
                &quot;tagName&quot;: &quot;h5&quot;,
                &quot;props&quot;: {
                    &quot;style&quot;: &quot;color:red&quot;
                },
                &quot;children&quot;: [
                    &quot;simple virtual dom&quot;
                ],
                &quot;count&quot;: 1
            }
        }
    ],
    &quot;4&quot;: [
        {
            &quot;type&quot;: 3,
            &quot;content&quot;: &quot;hello world2&quot;
        }
    ],
    &quot;5&quot;: [
        {
            &quot;type&quot;: 1,
            &quot;moves&quot;: [
                {
                    &quot;index&quot;: 2,
                    &quot;item&quot;: {
                        &quot;tagName&quot;: &quot;li&quot;,
                        &quot;props&quot;: {},
                        &quot;children&quot;: [
                            &quot;item #3&quot;
                        ],
                        &quot;count&quot;: 1
                    },
                    &quot;type&quot;: 1
                }
            ]
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"0"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-number">2</span>,
            <span class="hljs-attr">"props"</span>: {
                <span class="hljs-attr">"id"</span>: <span class="hljs-string">"container2"</span>
            }
        }
    ],
    <span class="hljs-attr">"1"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">"node"</span>: {
                <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"h5"</span>,
                <span class="hljs-attr">"props"</span>: {
                    <span class="hljs-attr">"style"</span>: <span class="hljs-string">"color:red"</span>
                },
                <span class="hljs-attr">"children"</span>: [
                    <span class="hljs-string">"simple virtual dom"</span>
                ],
                <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
            }
        }
    ],
    <span class="hljs-attr">"4"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-number">3</span>,
            <span class="hljs-attr">"content"</span>: <span class="hljs-string">"hello world2"</span>
        }
    ],
    <span class="hljs-attr">"5"</span>: [
        {
            <span class="hljs-attr">"type"</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">"moves"</span>: [
                {
                    <span class="hljs-attr">"index"</span>: <span class="hljs-number">2</span>,
                    <span class="hljs-attr">"item"</span>: {
                        <span class="hljs-attr">"tagName"</span>: <span class="hljs-string">"li"</span>,
                        <span class="hljs-attr">"props"</span>: {},
                        <span class="hljs-attr">"children"</span>: [
                            <span class="hljs-string">"item #3"</span>
                        ],
                        <span class="hljs-attr">"count"</span>: <span class="hljs-number">1</span>
                    },
                    <span class="hljs-attr">"type"</span>: <span class="hljs-number">1</span>
                }
            ]
        }
    ]
}</code></pre>
<p>5.渲染修改后的js对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.标签名改变，直接重新渲染整个元素，包括元素下的子元素
b.子元素改变，该删除的删除，该添加的添加（针对列表框架有一套自己的计算方法，可以自行百度去研究）
c.属性改变，操作对应元素的属性
d.内容改变，操作对应元素的内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span>.标签名改变，直接重新渲染整个元素，包括元素下的子元素
<span class="hljs-selector-tag">b</span>.子元素改变，该删除的删除，该添加的添加（针对列表框架有一套自己的计算方法，可以自行百度去研究）
c.属性改变，操作对应元素的属性
d.内容改变，操作对应元素的内容</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<div id=&quot;container2&quot;>
    <h5 style=&quot;color: red;&quot;>simple virtual dom</h5>
    <p>hello world2</p>
    <ul>
        <li>item #1</li>
        <li>item #2</li>
        <li>item #3</li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container2"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h5</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: red;"</span>&gt;</span>simple virtual dom<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hello world2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item #1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item #2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item #3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3p0q?w=1579&amp;h=943" src="https://static.alili.tech/img/bV3p0q?w=1579&amp;h=943" alt="虚拟dom比对原理图" title="虚拟dom比对原理图" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
虚拟dom比对原理

## 原文链接
[https://segmentfault.com/a/1190000013166978](https://segmentfault.com/a/1190000013166978)

