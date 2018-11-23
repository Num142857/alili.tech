---
title: 'react-native动态姿态tab组件' 
date: 2018-11-24 2:30:10
hidden: true
slug: diud5u9pf
categories: [reprint]
---

{{< raw >}}
<p>&#x5728;APP&#x4E2D;&#x514D;&#x4E0D;&#x4E86;&#x8981;&#x4F7F;&#x7528;tab&#x7EC4;&#x4EF6;,&#x6709;&#x7684;&#x662F;tab&#x5207;&#x6362;,&#x4E5F;&#x6709;&#x7684;&#x662F;tab&#x5206;&#x7C7B;&#x5207;&#x6362;.</p><p>&#x8FD9;&#x4E9B;&#x7EC4;&#x4EF6;&#x5206;&#x6210;&#x4E0B;&#x9762;&#x4E24;&#x79CD;.<br><span class="img-wrap"><img data-src="/img/remote/1460000015551667?w=338&amp;h=69" src="https://static.alili.tech/img/remote/1460000015551667?w=338&amp;h=69" alt="" title="" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015551668" src="https://static.alili.tech/img/remote/1460000015551668" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x7B2C;&#x4E00;&#x79CD;&#x975E;&#x5E38;&#x7B80;&#x5355;,&#x540C;&#x65F6;&#x5927;&#x591A;&#x6570;&#x7B2C;&#x4E09;&#x65B9;&#x7EC4;&#x4EF6;&#x90FD;&#x80FD;&#x8FBE;&#x5230;&#x6548;&#x679C;.&#x8FD9;&#x91CC;&#x91CD;&#x70B9;&#x8BB2;&#x8FF0;&#x7B2C;&#x4E8C;&#x79CD;,&#x6211;&#x4EEC;&#x8981;&#x8BA9;&#x7B2C;&#x4E8C;&#x79CD;&#x7EC4;&#x4EF6;&#x4E0D;&#x4EC5;&#x80FD;&#x5DE6;&#x53F3;&#x6ED1;&#x52A8;,&#x540C;&#x65F6;&#x8FD8;&#x80FD;&#x591F;&#x5728;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x81EA;&#x52A8;&#x6ED1;&#x52A8;,&#x5C06;&#x70B9;&#x51FB;&#x7684;&#x4F4D;&#x7F6E;&#x6ED1;&#x52A8;&#x5230;&#x6B63;&#x4E2D;&#x95F4;.</p><h2 id="articleHeader0">&#x51C6;&#x5907;</h2><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x5206;&#x6790;&#x4E00;&#x6CE2;.&#x4E00;&#x4E2A;&#x6ED1;&#x52A8;&#x7EC4;&#x4EF6;&#x5728;APP&#x4E0A;&#x662F;&#x4E00;&#x79CD;&#x4EC0;&#x4E48;&#x72B6;&#x6001;.<br><span class="img-wrap"><img data-src="/img/remote/1460000015551669" src="https://static.alili.tech/img/remote/1460000015551669" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;,tab&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x8003;&#x8651;&#x5230;&#x957F;&#x5EA6;&#x8D85;&#x8FC7;APP&#x7684;&#x5C4F;&#x5E55;,&#x5E76;&#x4E14;&#x5728;&#x8D85;&#x8FC7;&#x4E4B;&#x540E;&#x80FD;&#x591F;&#x6ED1;&#x52A8;.</p><p>&#x540C;&#x65F6;&#x8BA1;&#x7B97;&#x51FA;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x9700;&#x8981;&#x6ED1;&#x52A8;&#x591A;&#x5C11;&#x8DDD;&#x79BB;&#x624D;&#x80FD;&#x591F;&#x5C06;&#x4F4D;&#x7F6E;&#x5C45;&#x4E2D;.<br><code>&#x9700;&#x8981;&#x6ED1;&#x52A8;&#x7684;&#x4F4D;&#x7F6E;=&#x70B9;&#x51FB;&#x4F4D;&#x7F6E;&#x7684;&#x5DE6;&#x8FB9;&#x8DDD;-APP&#x5C4F;&#x5E55;/2+&#x70B9;&#x51FB;&#x4F4D;&#x7F6E;&#x7684;&#x5BBD;&#x5EA6;/2</code></p><p>&#x8FD9;&#x4E2A;&#x516C;&#x5F0F;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x81EA;&#x52A8;&#x6ED1;&#x52A8;&#x7684;&#x6838;&#x5FC3;&#x4E86;.</p><h2 id="articleHeader1">&#x5F00;&#x53D1;</h2><p>&#x4F7F;&#x7528;<code>ScrollView</code>&#x7EC4;&#x4EF6;&#x627F;&#x8F7D;tab&#x9879;,&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x8FBE;&#x5230;&#x6ED1;&#x52A8;&#x7684;&#x6548;&#x679C;.&#x540C;&#x65F6;&#x6DFB;&#x52A0;<code>horizontal</code>&#x3001;<code>directionalLockEnabled</code>&#x3001;<code>showsHorizontalScrollIndicator</code>&#x3001;<code>snapToAlignment</code>&#x51E0;&#x4E2A;&#x5C5E;&#x6027;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ScrollView ref={e =&gt; this.scroll = e}
    horizontal directionalLockEnabled
    showsHorizontalScrollIndicator={false}
    snapToAlignment=&quot;center&quot;&gt;
    {this.props.data.map((item, index) =&gt;
        {/*&#x5177;&#x4F53;&#x9879;*/}
    )}
&lt;/ScrollView&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;ScrollView ref={e =&gt; <span class="hljs-keyword">this</span>.scroll = e}
    horizontal directionalLockEnabled
    showsHorizontalScrollIndicator={<span class="hljs-literal">false</span>}
    snapToAlignment=<span class="hljs-string">&quot;center&quot;</span>&gt;
    {<span class="hljs-keyword">this</span>.props.data.map(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span>
        {<span class="hljs-comment">/*&#x5177;&#x4F53;&#x9879;*/</span>}
    )}
&lt;<span class="hljs-regexp">/ScrollView&gt;</span></code></pre><p>&#x4F7F;&#x7528;<code>TouchableOpacity</code>&#x5305;&#x88F9;&#x5185;&#x5BB9;&#x9879;,&#x540C;&#x65F6;&#x8C03;&#x7528;<code>setLaout</code>&#x65B9;&#x6CD5;&#x5C06;&#x6BCF;&#x4E2A;&#x9879;&#x7684;&#x5BBD;&#x9AD8;&#x7B49;&#x5C5E;&#x6027;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;,&#x4E3A;&#x6211;&#x4EEC;&#x540E;&#x9762;&#x8BA1;&#x7B97;&#x5F53;&#x524D;&#x4F4D;&#x7F6E;&#x505A;&#x51C6;&#x5907;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;TouchableOpacity onPress={() =&gt; this.setIndex(index)} 
    onLayout={e =&gt; this.setLaout(e.nativeEvent.layout, index)} 
    key={item.id} 
    style={tabBarStyle.itemBtn}&gt;
        &lt;Text style={[tabBarStyle.item, this.state.index === index ? tabBarStyle.active : null]} &gt; {item.name}&lt;/Text&gt;
        &lt;View style={[tabBarStyle.line, this.state.index === index ? tabBarStyle.active2 : null]}&gt;             &lt;/View&gt;
&lt;/TouchableOpacity&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;TouchableOpacity onPress={() =&gt; <span class="hljs-keyword">this</span>.setIndex(index)} 
    onLayout={e =&gt; <span class="hljs-keyword">this</span>.setLaout(e.nativeEvent.layout, index)} 
    key={item.id} 
    style={tabBarStyle.itemBtn}&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{[tabBarStyle.item,</span> <span class="hljs-attr">this.state.index</span> === <span class="hljs-string">index</span> ? <span class="hljs-attr">tabBarStyle.active</span> <span class="hljs-attr">:</span> <span class="hljs-attr">null</span>]} &gt;</span> {item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span></span>
        &lt;View style={[tabBarStyle.line, <span class="hljs-keyword">this</span>.state.index === index ? tabBarStyle.active2 : <span class="hljs-literal">null</span>]}&gt;             <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/TouchableOpacity&gt;</span></code></pre><p>&#x8BB0;&#x5F55;&#x6BCF;&#x4E2A;&#x9879;&#x6E32;&#x67D3;&#x4E4B;&#x540E;&#x7684;&#x4F4D;&#x7F6E;,&#x5C06;&#x8FD9;&#x4E9B;&#x503C;&#x5B58;&#x5728;&#x53D8;&#x91CF;&#x91CC;,&#x4E3A;&#x540E;&#x9762;&#x8BA1;&#x7B97;&#x505A;&#x51C6;&#x5907;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="laout_list = []
setLaout(layout, index) {
    //&#x5B58;&#x5355;&#x4E2A;&#x9879;&#x7684;&#x4F4D;&#x7F6E;
    this.laout_list[index] = layout;
    //&#x8BA1;&#x7B97;&#x6240;&#x6709;&#x9879;&#x7684;&#x603B;&#x957F;&#x5EA6;
    this.scrollW += layout.width;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">laout_list = []
setLaout(layout, index) {
    <span class="hljs-comment">//&#x5B58;&#x5355;&#x4E2A;&#x9879;&#x7684;&#x4F4D;&#x7F6E;</span>
    <span class="hljs-keyword">this</span>.laout_list[index] = layout;
    <span class="hljs-comment">//&#x8BA1;&#x7B97;&#x6240;&#x6709;&#x9879;&#x7684;&#x603B;&#x957F;&#x5EA6;</span>
    <span class="hljs-keyword">this</span>.scrollW += layout.width;
}</code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x70B9;&#x51FB;&#x81EA;&#x52A8;&#x53D8;&#x6362;&#x4F4D;&#x7F6E;&#x7684;&#x8BA1;&#x7B97;&#x4E86;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setIndex(index, bl = true) {
    //&#x5148;&#x6539;&#x53D8;&#x70B9;&#x51FB;&#x9879;&#x7684;&#x989C;&#x8272;
    this.setState({ index })
    //&#x517C;&#x5BB9;&#x9519;&#x8BEF;
    if (!this.scroll) return;
    //&#x62FF;&#x5230;&#x5F53;&#x524D;&#x9879;&#x7684;&#x4F4D;&#x7F6E;&#x6570;&#x636E;
    let layout = this.laout_list[index];
    let rx = deviceWidth / 2;
    //&#x516C;&#x5F0F;
    let sx = layout.x - rx + layout.width / 2;
    //&#x5982;&#x679C;&#x8FD8;&#x4E0D;&#x9700;&#x8981;&#x79FB;&#x52A8;,&#x539F;&#x5730;&#x5F85;&#x7740;
    if (sx &lt; 0) sx = 0;
    //&#x79FB;&#x52A8;&#x4F4D;&#x7F6E;
    sx &lt; this.scrollW - deviceWidth &amp;&amp; this.scroll.scrollTo({ x: sx, animated: bl });
    //&#x7ED3;&#x5C3E;&#x90E8;&#x5206;&#x76F4;&#x63A5;&#x79FB;&#x52A8;&#x5230;&#x5E95;
    sx &gt;= this.scrollW - deviceWidth &amp;&amp; this.scroll.scrollToEnd({ animated: bl });
    //&#x89E6;&#x53D1;&#x4E00;&#x4E9B;&#x9700;&#x8981;&#x7684;&#x5916;&#x90E8;&#x4E8B;&#x4EF6;
    this.props.onChange &amp;&amp; this.props.onChange(index);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>setIndex(index, bl = <span class="hljs-literal">true</span>) {
    <span class="hljs-comment">//&#x5148;&#x6539;&#x53D8;&#x70B9;&#x51FB;&#x9879;&#x7684;&#x989C;&#x8272;</span>
    <span class="hljs-keyword">this</span>.setState({ index })
    <span class="hljs-comment">//&#x517C;&#x5BB9;&#x9519;&#x8BEF;</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.scroll) <span class="hljs-keyword">return</span>;
    <span class="hljs-comment">//&#x62FF;&#x5230;&#x5F53;&#x524D;&#x9879;&#x7684;&#x4F4D;&#x7F6E;&#x6570;&#x636E;</span>
    let layout = <span class="hljs-keyword">this</span>.laout_list[index];
    let rx = deviceWidth / <span class="hljs-number">2</span>;
    <span class="hljs-comment">//&#x516C;&#x5F0F;</span>
    let sx = layout.x - rx + layout.width / <span class="hljs-number">2</span>;
    <span class="hljs-comment">//&#x5982;&#x679C;&#x8FD8;&#x4E0D;&#x9700;&#x8981;&#x79FB;&#x52A8;,&#x539F;&#x5730;&#x5F85;&#x7740;</span>
    <span class="hljs-keyword">if</span> (sx &lt; <span class="hljs-number">0</span>) sx = <span class="hljs-number">0</span>;
    <span class="hljs-comment">//&#x79FB;&#x52A8;&#x4F4D;&#x7F6E;</span>
    sx &lt; <span class="hljs-keyword">this</span>.scrollW - deviceWidth &amp;&amp; <span class="hljs-keyword">this</span>.scroll.scrollTo({ x: sx, animated: bl });
    <span class="hljs-comment">//&#x7ED3;&#x5C3E;&#x90E8;&#x5206;&#x76F4;&#x63A5;&#x79FB;&#x52A8;&#x5230;&#x5E95;</span>
    sx &gt;= <span class="hljs-keyword">this</span>.scrollW - deviceWidth &amp;&amp; <span class="hljs-keyword">this</span>.scroll.scrollToEnd({ animated: bl });
    <span class="hljs-comment">//&#x89E6;&#x53D1;&#x4E00;&#x4E9B;&#x9700;&#x8981;&#x7684;&#x5916;&#x90E8;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-keyword">this</span>.props.onChange &amp;&amp; <span class="hljs-keyword">this</span>.props.onChange(index);
}</code></pre><p>&#x6700;&#x540E;&#x4E0A;&#x4E00;&#x5F20;&#x7ED3;&#x679C;&#x56FE;:<br><span class="img-wrap"><img data-src="/img/remote/1460000015551670" src="https://static.alili.tech/img/remote/1460000015551670" alt="" title="" style="cursor:pointer"></span></p><p><a href="https://gitee.com/cuo9958/react-native-tabs" rel="nofollow noreferrer" target="_blank">gitee&#x5730;&#x5740;</a></p><p><a href="https://github.com/cuo9958/react-native-tabs-top" rel="nofollow noreferrer" target="_blank">github&#x5730;&#x5740;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-native动态姿态tab组件

## 原文链接
[https://segmentfault.com/a/1190000015551664](https://segmentfault.com/a/1190000015551664)

