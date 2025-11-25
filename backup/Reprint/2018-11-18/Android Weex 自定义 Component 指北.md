---
title: 'Android Weex 自定义 Component 指北' 
date: 2018-11-18 3:32:07
hidden: true
slug: 5ytgnjdb799
categories: [reprint]
---

{{< raw >}}
<p>Weex &#x81EA;&#x5B9A;&#x4E49; Component &#x5F00;&#x53D1;&#x8FD9;&#x5757;&#xFF0C;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x548C;&#x7F51;&#x4E0A;&#x793A;&#x4F8B;&#x90FD;&#x8F83;&#x5C11;&#x6D89;&#x53CA;&#x3002;&#x5DE5;&#x4F5C;&#x6240;&#x9700;&#x6709;&#x6240;&#x7814;&#x7A76;&#xFF0C;&#x603B;&#x7ED3;&#x6B64;&#x6587;&#x4EE5;&#x98E8;&#x8BFB;&#x8005;&#x3002;</p><h2 id="articleHeader0">&#x57FA;&#x7840;&#x5B9A;&#x4E49;&#x4E0E;&#x6CE8;&#x518C;</h2><p>&#x5982;&#x4E0B;&#x8FF0;&#x4EE3;&#x7801;&#x6240;&#x793A;&#xFF0C;&#x4ECE; WXComponent &#x7EE7;&#x627F;&#x51FA;&#x6765;&#x4EE5;&#x540E;&#xFF0C;&#x590D;&#x5199;&#x56DB;&#x4E2A;&#x6784;&#x9020;&#x5668;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x53EF;&#x8DD1;&#x5F53;&#x7136;&#x4E5F;&#x663E;&#x793A;&#x4E0D;&#x4E86;&#x4EFB;&#x4F55;&#x4E1C;&#x897F;&#x7684; WXComponet&#x3002;</p><p>&#x9700;&#x8981;&#x8BF4;&#x660E;&#x7684;&#x662F; WXComponent &#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x6CDB;&#x578B; T&#xFF0C;T extends View&#xFF0C;&#x7528;&#x4E8E;&#x6307;&#x5B9A;WXComponent hostView &#x6839;&#x5E03;&#x5C40;&#x7684;&#x7C7B;&#x578B;&#x3002;&#x8FD9;&#x4E2A;&#x8FD8;&#x662F;&#x6307;&#x5B9A;&#x7684;&#x6BD4;&#x8F83;&#x597D;&#xFF0C;&#x5728;&#x67D0;&#x4E9B;&#x8FDB;&#x9636;&#x7528;&#x6CD5;&#x4E2D;&#x4F1A;&#x9700;&#x8981;&#x8FD9;&#x4E2A;&#x7C7B;&#x578B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class DemoWXComponent extends WXComponent&lt;T&gt; {
    public DemoWXComponent(WXSDKInstance instance, WXVContainer parent,
                           int type,
                           BasicComponentData basicComponentData) {
        super(instance, parent, type, basicComponentData);
    }

    public DemoWXComponent(WXSDKInstance instance, WXVContainer parent, String instanceId, boolean isLazy,
                           BasicComponentData basicComponentData) {
        super(instance, parent, instanceId, isLazy, basicComponentData);
    }

    public DemoWXComponent(WXSDKInstance instance, WXVContainer parent, boolean isLazy,
                           BasicComponentData basicComponentData) {
        super(instance, parent, isLazy, basicComponentData);
    }

    public DemoWXComponent(WXSDKInstance instance, WXVContainer parent,
                           BasicComponentData basicComponentData) {
        super(instance, parent, basicComponentData);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DemoWXComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WXComponent</span>&lt;<span class="hljs-title">T</span>&gt; </span>{
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">DemoWXComponent</span><span class="hljs-params">(WXSDKInstance instance, WXVContainer parent,
                           <span class="hljs-keyword">int</span> type,
                           BasicComponentData basicComponentData)</span> </span>{
        <span class="hljs-keyword">super</span>(instance, parent, type, basicComponentData);
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">DemoWXComponent</span><span class="hljs-params">(WXSDKInstance instance, WXVContainer parent, String instanceId, <span class="hljs-keyword">boolean</span> isLazy,
                           BasicComponentData basicComponentData)</span> </span>{
        <span class="hljs-keyword">super</span>(instance, parent, instanceId, isLazy, basicComponentData);
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">DemoWXComponent</span><span class="hljs-params">(WXSDKInstance instance, WXVContainer parent, <span class="hljs-keyword">boolean</span> isLazy,
                           BasicComponentData basicComponentData)</span> </span>{
        <span class="hljs-keyword">super</span>(instance, parent, isLazy, basicComponentData);
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">DemoWXComponent</span><span class="hljs-params">(WXSDKInstance instance, WXVContainer parent,
                           BasicComponentData basicComponentData)</span> </span>{
        <span class="hljs-keyword">super</span>(instance, parent, basicComponentData);
    }
}</code></pre><p>&#x4F7F;&#x7528;&#x8FD9;&#x4E2A; Component &#x4E4B;&#x524D;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x628A;&#x4ED6;&#x6CE8;&#x518C;&#x8FDB; WXSDKEngine&#x3002;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;<br>&#x4E00;&#x6B21;&#x6CE8;&#x518C;&#x540E;&#xFF0C;&#x5728;Android&#x7A0B;&#x5E8F;&#x9500;&#x6BC1;&#x4E4B;&#x524D;&#xFF0C;&#x53EF;&#x4EE5;&#x4E00;&#x76F4;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A; Component&#x3002;&#x65E0;&#x9700; unregister&#xFF0C;WXSDKEngine &#x4E5F;&#x6CA1;&#x6709;&#x63D0;&#x4F9B; unregister &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x662F;&#x663E;&#x800C;&#x6613;&#x89C1;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x5F53;&#x524D;&#x8FD8;&#x672A;&#x4EA7;&#x751F;&#x4EFB;&#x4F55;&#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WXSDKEngine.registerComponent(&quot;democomponent&quot;, DemoWXComponent.class);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java" style="word-break:break-word;white-space:initial">WXSDKEngine.registerComponent(<span class="hljs-string">&quot;democomponent&quot;</span>, DemoWXComponent.class);</code></pre><p><strong>&#x503C;&#x5F97;&#x4E00;&#x63D0;&#x7684;&#x662F; componet &#x540D;&#x79F0;&#xFF0C;&#x5C3D;&#x91CF;&#x4E0D;&#x8981;&#x4E0B;&#x5212;&#x7EBF;&#x4E2D;&#x5212;&#x7EBF;&#x548C;&#x5927;&#x5199;&#x5B57;&#x6BCD;&#xFF0C;&#x5426;&#x5219;&#x53EF;&#x80FD;&#x4F1A;&#x8E29;&#x5751;&#x3002;</strong></p><p>&#x597D;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x662F; Weex JS &#x4EE3;&#x7801;&#x600E;&#x4E48;&#x8C03;&#x7528;&#x3002;&#x65E0;&#x9700; import&#xFF0C;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#xFF0C;&#x53EA;&#x8981; register &#x65B9;&#x6CD5;&#x5DF2;&#x7ECF;&#x88AB;&#x6267;&#x884C;&#x8FC7;&#x4E86;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;democomponent /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">&lt;democomponent /&gt;</code></pre><p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x8BBE;&#x5B9A; props &#x600E;&#x4E48;&#x529E;&#xFF0C;&#x5982; &lt;democomponent source=test/&gt;&#x3002;</p><p>&#x90A3;&#x5C31;&#x5728; Componet &#x4E2D;&#x589E;&#x52A0;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@WXComponentProp(name = &quot;source&quot;)
public void setSource(String source) {
    mSource = source;
    // or do some things
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java"><span class="hljs-meta">@WXComponentProp</span>(name = <span class="hljs-string">&quot;source&quot;</span>)
<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">setSource</span><span class="hljs-params">(String source)</span> </span>{
    mSource = source;
    <span class="hljs-comment">// or do some things</span>
}</code></pre><p>weex &#x4F1A;&#x6839;&#x636E;&#x5916;&#x90E8;&#x4F20;&#x5165;&#x7684; props&#xFF0C;&#x6839;&#x636E;&#x6CE8;&#x89E3;&#x8C03;&#x7528;&#x5BF9;&#x5E94; props &#x7684; set &#x65B9;&#x6CD5;&#x3002;</p><h2 id="articleHeader1">&#x751F;&#x547D;&#x5468;&#x671F;</h2><p>&#x663E;&#x7136;&#xFF0C;&#x770B;&#x4E86;&#x7B2C;&#x4E00;&#x8282;&#xFF0C;&#x53EA;&#x80FD;&#x4FDD;&#x8BC1;&#x94FE;&#x8DEF;&#x4E0A; weex &#x81EA;&#x5B9A;&#x4E49; Component &#x80FD;&#x8DD1;&#x8D77;&#x6765;&#xFF0C;&#x6CA1;&#x6709;&#x505A;&#x5176;&#x4ED6;&#x4EFB;&#x4F55;&#x4E8B;&#x60C5;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x4E3A;&#x4E86;&#x80FD;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x6E32;&#x67D3;&#x548C;&#x5176;&#x4ED6;&#x903B;&#x8F91;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x4E86;&#x89E3; Weex Componet &#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x3002;&#x8FD9;&#x91CC;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x5B9E;&#x8D28;&#x5C31;&#x662F;&#x4E86;&#x89E3;&#x53EF; Override &#x7684;&#x51E0;&#x4E2A; WXComponent &#x65B9;&#x6CD5;&#xFF0C;&#x548C;&#x4ED6;&#x4EEC;&#x7684;&#x88AB;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x673A;&#x3002;&#x8FD9;&#x4E00;&#x5757;&#x5B98;&#x65B9;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x6587;&#x6863;&#xFF0C;&#x5168;&#x9760;&#x53BB; github &#x6E90;&#x7801;&#x4E2D;&#x770B;&#x548C;&#x8BD5;&#x3002;</p><h3 id="articleHeader2">&#x5FC5;&#x9700; Override</h3><h4>initComponentHostView()</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="protected T initComponentHostView(@NonNull Context context) {
    // for example
    mComponentHostView = new FrameLayout(context);
    mComponentHostView.setId(R.id.fragment_content);
    return mComponentHostView;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">protected</span> T <span class="hljs-title">initComponentHostView</span><span class="hljs-params">(@NonNull Context context)</span> </span>{
    <span class="hljs-comment">// for example</span>
    mComponentHostView = <span class="hljs-keyword">new</span> FrameLayout(context);
    mComponentHostView.setId(R.id.fragment_content);
    <span class="hljs-keyword">return</span> mComponentHostView;
}</code></pre><p>&#x7528;&#x4E8E;&#x751F;&#x6210;&#x6839; View &#x8FD4;&#x56DE;&#x7ED9; Weex &#x6765;&#x6E32;&#x67D3;&#x3002;&#x6CE8;&#x610F;&#xFF0C;&#x4E0D;&#x8981;&#x5728;&#x8FD9;&#x91CC;&#x8FDB;&#x884C;&#x4EFB;&#x4F55;&#x54CD;&#x5E94;&#x5916;&#x754C;&#x8BBE;&#x5165;&#x7684; props &#x7684;&#x6E32;&#x67D3;&#xFF0C;&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x6781;&#x5927;&#x53EF;&#x80FD; props &#x8FD8;&#x6CA1;&#x6709;&#x88AB;&#x4F20;&#x5165;&#x3002;</p><h3 id="articleHeader3">&#x53EF;&#x9009; Override</h3><h4>bindData()</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Override
public void bindData(WXComponent component) {
    super.bindData(component);
    // &#x8FD9;&#x91CC;&#x8FDB;&#x884C; props &#x7684;&#x54CD;&#x5E94;&#x6E32;&#x67D3;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java"><span class="hljs-meta">@Override</span>
<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">bindData</span><span class="hljs-params">(WXComponent component)</span> </span>{
    <span class="hljs-keyword">super</span>.bindData(component);
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x8FDB;&#x884C; props &#x7684;&#x54CD;&#x5E94;&#x6E32;&#x67D3;</span>
}</code></pre><p>super.bindData() &#x540E;&#x5373;&#x53EF;&#x54CD;&#x5E94; props &#x8FDB;&#x884C;&#x6E32;&#x67D3;&#xFF0C;&#x56E0;&#x4E3A;&#x6B64;&#x65F6; props &#x7684;set&#x65B9;&#x6CD5;&#x90FD;&#x5DF2;&#x7ECF;&#x88AB;&#x8C03;&#x7528;&#x8FC7;&#x3002;</p><h4>destroy()</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@JSMethod
@Override
public void destroy() {
    super.destroy();
    // &#x8FDB;&#x884C;&#x81EA;&#x5B9A;&#x4E49; Component &#x7684;&#x5FC5;&#x8981;&#x9500;&#x6BC1;&#x903B;&#x8F91;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java"><span class="hljs-meta">@JSMethod</span>
<span class="hljs-meta">@Override</span>
<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">destroy</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">super</span>.destroy();
    <span class="hljs-comment">// &#x8FDB;&#x884C;&#x81EA;&#x5B9A;&#x4E49; Component &#x7684;&#x5FC5;&#x8981;&#x9500;&#x6BC1;&#x903B;&#x8F91;</span>
}</code></pre><p>&#x5982;&#x679C;&#x6709;&#x989D;&#x5916;&#x9700;&#x8981;&#x9500;&#x6BC1;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x9700;&#x8981;&#x5199;&#x5728; destroy &#x4E4B;&#x4E2D;&#x3002;weex &#x4F1A;&#x5728;&#x9000;&#x51FA; WXActivity &#x6216;&#x5176;&#x4ED6;&#x7B49;&#x540C;&#x7684;&#x65F6;&#x5019;&#x8C03;&#x7528;&#x3002;&#x503C;&#x5F97;&#x4E00;&#x63D0;&#x7684;&#x662F;&#xFF0C;&#x6211;&#x4E00;&#x822C;&#x52A0;&#x4E00;&#x4E2A; @JSMethod &#x6CE8;&#x89E3;&#xFF0C;&#x4EE5;&#x63D0;&#x4F9B;&#x524D;&#x7AEF; Weex &#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x4E3B;&#x52A8;&#x9500;&#x6BC1;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x907F;&#x514D;&#x9700;&#x8981;&#x7684;&#x65F6;&#x5019;&#x4E0D;&#x80FD;&#x53CA;&#x65F6;&#x63A8;&#x4EE3;&#x7801;&#x751F;&#x6548;&#xFF0C;&#x800C;&#x8981;&#x7B49;&#x5230;&#x53D1;&#x7248;&#x3002;</p><h2 id="articleHeader4">&#x66B4;&#x9732;&#x65B9;&#x6CD5;</h2><p>&#x4E0A;&#x6BB5;&#x5176;&#x5B9E;&#x5DF2;&#x7ECF;&#x63D0;&#x5230;&#xFF0C;&#x600E;&#x6837;&#x66B4;&#x9732;&#x4E00;&#x4E2A; Component &#x65B9;&#x6CD5;&#x7ED9;&#x524D;&#x7AEF;&#x8C03;&#x7528;&#x3002;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@JSMethod
public void getDuration(JSCallback callback) {
    if (null != getCurrentShortVideoVh() &amp;&amp; null != callback) {
        Map&lt;String, Object&gt; map = new HashMap&lt;&gt;(1);
        map.put(&quot;result&quot;, &quot;value&quot;);
        callback.invoke(map);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="java hljs"><code class="java"><span class="hljs-meta">@JSMethod</span>
<span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">getDuration</span><span class="hljs-params">(JSCallback callback)</span> </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">null</span> != getCurrentShortVideoVh() &amp;&amp; <span class="hljs-keyword">null</span> != callback) {
        Map&lt;String, Object&gt; map = <span class="hljs-keyword">new</span> HashMap&lt;&gt;(<span class="hljs-number">1</span>);
        map.put(<span class="hljs-string">&quot;result&quot;</span>, <span class="hljs-string">&quot;value&quot;</span>);
        callback.invoke(map);
    }
}</code></pre><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x76F4;&#x63A5;&#x628A; void &#x6539;&#x6210;&#x8FD4;&#x56DE;&#x503C;&#x6BD4;&#x5982; boolean &#x7136;&#x540E;&#x8BD5;&#x56FE; return &#x662F;&#x6CA1;&#x6709;&#x7528;&#x7684;&#xFF0C;weex js &#x4FA7;&#x6536;&#x4E0D;&#x5230;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x53BB;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x6765;&#x7ED9;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x5982;&#x4E0A;&#x6240;&#x793A;&#x3002;</p><h2 id="articleHeader5">DOM</h2><p>Weex &#x65B0;&#x5185;&#x6838;&#xFF08;WeexCore&#xFF09;&#x5C06; Dom &#x5C42;&#x548C; Layout &#x5F15;&#x64CE;&#x4E0B;&#x6C89;&#x5230; C++ &#x5C42;&#x5B9E;&#x73B0;&#xFF0C;&#x79FB;&#x9664; Java &#x5C42;&#x7684; DomObject&#xFF0C;&#x63D0;&#x5347;&#x6E32;&#x67D3;&#x6027;&#x80FD;&#x548C;&#x5185;&#x6838;&#x7684;&#x53EF;&#x901A;&#x7528;&#x6027;&#x3002;&#x56E0;&#x6B64;&#xFF0C;github &#x6700;&#x65B0;&#x7248;&#x4E0D;&#x518D;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230; WXComponent &#x4E2D;&#x7684; DomObject&#x3002;</p><h2 id="articleHeader6">Tricks&#xFF1A;&#x5F3A;&#x8F6C;</h2><p>&#x5982;&#x679C;&#x53D1;&#x73B0;&#x81EA;&#x5B9A;&#x4E49; Component &#x7684;&#x903B;&#x8F91;&#x9700;&#x8981;&#x7528;&#x5230; Activity&#xFF0C;&#x800C; WXComponent &#x53EA;&#x7ED9;&#x4F60;&#x63D0;&#x4F9B;&#x4E86; Context &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x8981;&#x614C;&#xFF0C;Weex &#x4F20;&#x5165;&#x7684; Context &#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x5F3A;&#x8F6C; Activity&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x4EE5;&#x9632;&#x4E07;&#x4E00;&#xFF0C;&#x8BB0;&#x5F97;&#x7528; instance of &#x4FDD;&#x62A4;&#x4E00;&#x4E0B;&#x3002;</p><p>&#x540C;&#x7406;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x8981;&#x5F39;&#x51FA;&#x4E00;&#x4E2A; Fragment&#xFF0C;&#x7ED3;&#x679C;&#x53D1;&#x73B0;&#x81EA;&#x5DF1;&#x9700;&#x8981;&#x4E00;&#x4E2A; FragmentActivity &#x6765;getSupportFragmentManager()&#xFF0C;&#x4E0D;&#x8981;&#x614C;&#xFF0C;weex &#x4F20;&#x5165;&#x7684;&#x8FD9;&#x4E2A; Activity &#x4E5F;&#x53EF;&#x4EE5;&#x5F3A;&#x8F6C;&#x4E3A;<br>FragmentActivity&#xFF0C;&#x540C;&#x6837;&#x8BB0;&#x5F97;&#x52A0; instance of &#x4FDD;&#x62A4;&#xFF0C;&#x5426;&#x5219;&#x4E1A;&#x52A1;&#x6302;&#x4E86;&#x4E0D;&#x7B97;&#x6211;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x6BD5;&#x7ADF;&#x662F;&#x6587;&#x6863;&#x4E2D;&#x7684;&#x672A;&#x5B9A;&#x4E49;&#x884C;&#x4E3A;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Android Weex 自定义 Component 指北

## 原文链接
[https://segmentfault.com/a/1190000015893922](https://segmentfault.com/a/1190000015893922)

