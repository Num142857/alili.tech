---
title: '在react中使用svg的各种骚姿势' 
date: 2018-11-21 2:30:10
hidden: true
slug: h1m189vgc2
categories: [reprint]
---

{{< raw >}}
<p>&#x5F00;&#x5934;&#x5148;&#x629B;&#x4E2A;&#x53EF;&#x4F9B;&#x53C2;&#x8003;&#x7684;&#x9879;&#x76EE;<a href="https://github.com/YDJ-FE/ts-react-webpack4" rel="nofollow noreferrer" target="_blank">ts-react-webpack4</a>, &#x6216;&#x811A;&#x624B;&#x67B6;<a href="https://github.com/YDJ-FE/steamer-react-ts" rel="nofollow noreferrer" target="_blank">steamer-react-ts</a></p><h1 id="articleHeader0">&#x4F18;&#x52BF;</h1><p><span class="img-wrap"><img data-src="/img/remote/1460000015746488?w=1400&amp;h=640" src="https://static.alili.tech/img/remote/1460000015746488?w=1400&amp;h=640" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>SVG&#x53EF;&#x88AB;&#x975E;&#x5E38;&#x591A;&#x7684;&#x5DE5;&#x5177;&#x8BFB;&#x53D6;&#x548C;&#x4FEE;&#x6539;(&#x6BD4;&#x5982;vscode)</li><li>&#x4E0D;&#x5931;&#x771F;, &#x653E;&#x5927;&#x7F29;&#x5C0F;&#x56FE;&#x50CF;&#x90FD;&#x5F88;&#x6E05;&#x6670;</li><li>SVG&#x6587;&#x4EF6;&#x662F;&#x7EAF;&#x7CB9;&#x7684;XML, &#x4E5F;&#x662F;&#x4E00;&#x79CD;DOM&#x7ED3;&#x6784;</li><li>&#x4F7F;&#x7528;&#x65B9;&#x4FBF;, &#x8BBE;&#x8BA1;&#x8F6F;&#x4EF6;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5BFC;&#x51FA;</li></ul><h1 id="articleHeader1">&#x517C;&#x5BB9;&#x6027;</h1><p>&#x4E0A;&#x4E00;&#x5F20;&#x517C;&#x5BB9;&#x6027;&#x56FE;&#x8868;, &#x6216;&#x5230;<a href="https://caniuse.com/#feat=svg" rel="nofollow noreferrer" target="_blank">caniuse.com</a>&#x67E5;&#x770B;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015746489?w=1279&amp;h=2595" src="https://static.alili.tech/img/remote/1460000015746489?w=1279&amp;h=2595" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x517C;&#x5BB9;&#x6027;&#x4E5F;&#x4E0D;&#x662F;&#x4EC0;&#x4E48;&#x5927;&#x95EE;&#x9898;. &#x5F53;&#x7136;, &#x5982;&#x679C;&#x4F60;&#x7684;&#x7F51;&#x7AD9;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x517C;&#x5BB9;&#x8FD9;&#x4E9B;&#x65E7;&#x5F0F;&#x7684;&#x6D4F;&#x89C8;&#x5668;, &#x793E;&#x533A;&#x4E0A;&#x4E5F;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x65B9;&#x6848;, &#x6BD4;&#x5982;&#x5F20;&#x946B;&#x65ED;&#x7684;<a href="https://www.zhangxinxu.com/wordpress/2013/09/svg-fallbacks/" rel="nofollow noreferrer" target="_blank">&#x4E00;&#x4E9B;SVG&#x5411;&#x4E0B;&#x517C;&#x5BB9;&#x4F18;&#x96C5;&#x964D;&#x7EA7;&#x6280;&#x672F;</a></p><h1 id="articleHeader2">&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</h1><blockquote>&#x65B9;&#x6848;&#x591A;&#x79CD;&#x591A;&#x6837;, &#x9002;&#x5408;&#x4F60;&#x7684;&#x9700;&#x6C42;&#x7684;&#x624D;&#x662F;&#x6700;&#x4F18;&#x7684;</blockquote><h2 id="articleHeader3">&#x76F4;&#x63A5;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x4F7F;&#x7528;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Home = () =&gt; (
    &lt;div&gt;
        &lt;svg width={300} height={300}&gt;
            &lt;rect width=&quot;100%&quot; height=&quot;100%&quot; style="{{" fill: &apos;purple&apos;, strokeWidth: 1, stroke: &apos;rgb(0,0,0)&apos; "}}" /&gt;
        &lt;/svg&gt;
    &lt;/div&gt;
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> Home = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{300}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{300}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;100%&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">fill:</span> &apos;<span class="hljs-attr">purple</span>&apos;, <span class="hljs-attr">strokeWidth:</span> <span class="hljs-attr">1</span>, <span class="hljs-attr">stroke:</span> &apos;<span class="hljs-attr">rgb</span>(<span class="hljs-attr">0</span>,<span class="hljs-attr">0</span>,<span class="hljs-attr">0</span>)&apos; "}}" /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
)</span></code></pre><ol><li>&#x5982;&#x679C;&#x6BCF;&#x4E2A;svg&#x8981;&#x524D;&#x7AEF;&#x753B;, &#x5BF9;&#x524D;&#x7AEF;&#x8981;&#x6C42;&#x8F83;&#x9AD8;.</li><li>&#x5982;&#x679C;&#x6BCF;&#x4E2A;&#x56FE;&#x6807;&#x4ECE;&#x8BBE;&#x8BA1;&#x5E08;&#x7ED9;&#x7684;svg&#x4EE3;&#x7801;&#x91CC;&#x9762;&#x62F7;, &#x8981;&#x6539;&#x5404;&#x79CD;&#x6807;&#x7B7E;&#x4E0D;&#x8BF4;, &#x6539;&#x9519;&#x4E86;&#x8FD8;&#x62A5;&#x9519;</li></ol><p>&#x8FD9;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#x5E76;&#x4E0D;&#x53CB;&#x597D;</p><h2 id="articleHeader4">&#x628A;svg&#x8F6C;&#x6210;&#x5B57;&#x4F53;</h2><h3 id="articleHeader5">iconfont</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015746490" src="https://static.alili.tech/img/remote/1460000015746490" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x76F4;&#x63A5;&#x628A;&#x4EE3;&#x7801;&#x590D;&#x5236;&#x5230;&#x9879;&#x76EE;css&#x4E2D;, &#x5B9A;&#x5236;&#x4F60;&#x7684;&#x6807;&#x7B7E;&#x6837;&#x5F0F;, &#x53C2;&#x8003;<a href="http://www.iconfont.cn/help/detail?helptype=code" rel="nofollow noreferrer" target="_blank">&#x963F;&#x91CC;&#x5B98;&#x65B9;&#x7684;&#x6587;&#x7AE0;</a>, &#x4F7F;&#x7528;&#x8D77;&#x6765;&#x7B80;&#x5355;&#x7C97;&#x66B4;, &#x800C;&#x4E14;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x6027;&#x9AD8;. &#x4F46;&#x662F;&#x9700;&#x8981;&#x624B;&#x52A8;&#x4E0A;&#x4F20;(&#x6709;&#x5176;&#x4ED6;&#x65B9;&#x6848;&#x6B22;&#x8FCE;&#x8865;&#x5145;), &#x53E6;&#x5916;&#x5982;&#x679C;&#x8981;&#x90E8;&#x7F72;&#x5230;&#x963F;&#x91CC;&#x7684;cdn&#x4EE5;&#x5916;&#x7684;&#x73AF;&#x5883;&#x9700;&#x8981;&#x5148;&#x4E0B;&#x8F7D;&#x4E0B;&#x6765;, &#x518D;&#x4E0A;&#x4F20;&#x5230;&#x76EE;&#x6807;&#x73AF;&#x5883;. &#x7565;&#x663E;&#x9EBB;&#x70E6;.</p><p>&#x6B64;&#x5916;&#x8FD8;&#x6709;<a href="https://icomoon.io/" rel="nofollow noreferrer" target="_blank">icomoon</a>&#x7B49;&#x7B49;&#x90FD;&#x6709;&#x63D0;&#x4F9B;&#x7C7B;&#x4F3C;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;</p><h2 id="articleHeader6">&#x628A;svg&#x8F6C;&#x6210;react component</h2><blockquote>&#x8BF7;&#x6CE8;&#x610F;: &#x4EE5;&#x4E0B;&#x4F1A;&#x5305;&#x542B;typescript&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;</blockquote><h3 id="articleHeader7">&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x524D;&#x8F6C;&#x6362;</h3><p>&#x4F8B;:</p><p><a href="https://github.com/jackple/typescript-react-svg-icon-generator" rel="nofollow noreferrer" target="_blank">typescript-react-svg-icon-generator</a>, &#x9700;&#x8981;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x6761;&#x524D;&#x7F6E;&#x547D;&#x4EE4;&#x53BB;&#x628A;svg&#x505A;&#x8F6C;&#x6362;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// svg-generator.js

const generator = require(&apos;typescript-react-svg-icon-generator&apos;)

const config = {
    svgDir: &apos;./svg/&apos;,
    destination: &apos;./Icon/index.tsx&apos;
}
generator(config)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// svg-generator.js</span>

<span class="hljs-keyword">const</span> generator = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;typescript-react-svg-icon-generator&apos;</span>)

<span class="hljs-keyword">const</span> config = {
    <span class="hljs-attr">svgDir</span>: <span class="hljs-string">&apos;./svg/&apos;</span>,
    <span class="hljs-attr">destination</span>: <span class="hljs-string">&apos;./Icon/index.tsx&apos;</span>
}
generator(config)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node ./svg-generator.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">$ node ./svg-generator.js</code></pre><p>&#x4F7F;&#x7528;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Icon from &apos;./Icon&apos;
export default class App extends Component {
    render() {
        return &lt;Icon kind=&apos;close&apos; color=&apos;#748&apos; width={500} height={100} /&gt;
    }
}    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">Icon</span> from &apos;./<span class="hljs-type">Icon</span>&apos;
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Icon</span> kind=<span class="hljs-symbol">&apos;clos</span>e&apos; color=&apos;#<span class="hljs-number">748</span>&apos; width={<span class="hljs-number">500</span>} height={<span class="hljs-number">100</span>} /&gt;
    }
}    </code></pre><p>&#x6B64;&#x5916;, svgr(&#x4E0B;&#x9762;&#x63D0;&#x5230;&#x7684;)&#x540C;&#x6837;&#x63D0;&#x4F9B;&#x8FD9;&#x79CD;&#x65B9;&#x6848;, &#x8BF7;&#x81EA;&#x884C;&#x67E5;&#x9605;</p><h3 id="articleHeader8">&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x65F6;&#x8F6C;&#x6362;</h3><p>&#x4F8B;:</p><p><a href="https://github.com/smooth-code/svgr/tree/master/packages/webpack" rel="nofollow noreferrer" target="_blank">@svgr/webpack</a></p><p>&#x55EF;. &#x6CA1;&#x9519;, &#x8FD9;&#x662F;&#x4E00;&#x4E2A;webpack loader.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack rules config
{
    test: /\.svg$/,
    loader: &apos;@svgr/webpack&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// webpack rules config</span>
{
    test: <span class="hljs-regexp">/\.svg$/</span>,
    loader: <span class="hljs-string">&apos;@svgr/webpack&apos;</span>
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5168;&#x5C40;&#x58F0;&#x660E;svg component&#x5B9A;&#x4E49;
declare interface SvgrComponent extends React.StatelessComponent&lt;React.SVGAttributes&lt;SVGElement&gt;&gt; {}

declare module &apos;*.svg&apos; {
    const content: SvgrComponent
    export default content
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// &#x5168;&#x5C40;&#x58F0;&#x660E;svg component&#x5B9A;&#x4E49;</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">interface</span> SvgrComponent <span class="hljs-keyword">extends</span> React.StatelessComponent&lt;React.SVGAttributes&lt;SVGElement&gt;&gt; {}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> &apos;*.svg&apos; {
    <span class="hljs-keyword">const</span> content: SvgrComponent
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> content
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import IconReact from &apos;@assets/svg/react.svg&apos;

const Home = () =&gt; (
    &lt;div&gt;
        &lt;IconReact width={180} height={180} color=&quot;purple&quot; /&gt;
    &lt;/div&gt;
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> IconReact <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@assets/svg/react.svg&apos;</span>

<span class="hljs-keyword">const</span> Home = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">IconReact</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{180}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{180}</span> <span class="hljs-attr">color</span>=<span class="hljs-string">&quot;purple&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
)</span></code></pre><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6848;&#x597D;&#x5904;&#x4E0D;&#x4EC5;&#x4F53;&#x73B0;&#x5728;&#x6784;&#x5EFA;&#x65F6;&#x8F6C;&#x6362;, &#x66F4;&#x91CD;&#x8981;&#x7684;&#x662F;&#x5B83;&#x5B8C;&#x5168;&#x7EE7;&#x627F;&#x4E86;SVGAttributes, &#x4E0D;&#x9700;&#x8981;&#x989D;&#x5916;&#x7684;&#x5B66;&#x4E60;&#x6210;&#x672C;! &#x53EF;&#x53C2;&#x8003;&#x9879;&#x76EE;<a href="https://github.com/YDJ-FE/ts-react-webpack4" rel="nofollow noreferrer" target="_blank">ts-react-webpack4</a>, &#x6216;&#x811A;&#x624B;&#x67B6;<a href="https://github.com/YDJ-FE/steamer-react-ts" rel="nofollow noreferrer" target="_blank">steamer-react-ts</a></p><p>&#x6B64;&#x5916;, &#x8FD8;&#x6709;<a href="https://github.com/tanem/react-svg" rel="nofollow noreferrer" target="_blank">react-svg</a>, <a href="https://github.com/jhamlet/svg-react-loader" rel="nofollow noreferrer" target="_blank">svg-react-loader</a>&#x7B49;&#x540C;&#x6837;&#x662F;&#x4EE5;&#x7C7B;&#x4F3C;&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x7684;.</p><p>&#x6709;&#x4EC0;&#x4E48;&#x610F;&#x89C1;&#x6216;&#x5EFA;&#x8BAE;&#x4E5F;&#x6B22;&#x8FCE;&#x5728;&#x4E0B;&#x65B9;&#x8BC4;&#x8BBA;!</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在react中使用svg的各种骚姿势

## 原文链接
[https://segmentfault.com/a/1190000015746485](https://segmentfault.com/a/1190000015746485)

