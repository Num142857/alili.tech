---
title: '一个vue的日历组件' 
date: 2018-11-26 2:30:09
hidden: true
slug: cp1xdxs4h4m
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x4E00;&#x4E2A;vue calendar&#x7684;npm&#x7EC4;&#x4EF6;</h1><h3 id="articleHeader1">&#x8BF4;&#x660E;&#xFF1A;</h3><h5>1.&#x57FA;&#x4E8E;element-ui&#x5F00;&#x53D1;&#x7684;vue&#x65E5;&#x5386;&#x7EC4;&#x4EF6;&#x3002;</h5><p><span class="img-wrap"><img data-src="/img/remote/1460000015420326?w=507&amp;h=472" src="https://static.alili.tech/img/remote/1460000015420326?w=507&amp;h=472" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><a href="https://github.com/xuyanming/ele-calendar" rel="nofollow noreferrer" target="_blank">&#x5730;&#x5740;</a></p><h5>&#x66F4;&#x65B0;:</h5><p><strong><em>1.&#x589E;&#x52A0;&#x65E5;&#x671F;&#x591A;&#x9009; :selectionMode=&quot;&apos;dates&apos;&quot;&#xFF0C;&#x4E8B;&#x4EF6;select&#x8FD4;&#x56DE;&#x9009;&#x62E9;&#x65E5;&#x671F;&#x53CA;&#x8282;&#x70B9;</em></strong><br>2.&#x589E;&#x52A0;&#x8BED;&#x8A00;&#x5207;&#x6362; :lang=&quot;&apos;en&apos;&quot;<br>3.&#x62BD;&#x79BB;css&#x65B9;&#x4FBF;&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F; import &apos;ele-calendar/dist/vue-calendar.css&apos; //&#x5F15;&#x5165;css<br><a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage" rel="nofollow noreferrer" target="_blank">&#x6CE8;&#x91CA;&#xFF1A;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E86;jsx&#x4F9D;&#x8D56;</a></p><h3 id="articleHeader2">&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</h3><h5>1.&#x4E0B;&#x8F7D;npm&#x5305;:</h5><h5>&#x4F60;&#x7684;VUE&#x9879;&#x76EE;&#x7684;&#x6839;&#x76EE;&#x5F55;&#x5E95;&#x4E0B;&#x8FD0;&#x884C;&#xFF1A;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install ele-calendar" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code class="sh" style="word-break:break-word;white-space:initial">    npm <span class="hljs-keyword">install</span> ele-calendar</code></pre><h5>2.&#x5F15;&#x5165;&#x672C;npm&#x5305;&#x5E76;&#x6CE8;&#x518C;&#x4E3A;vue&#x7684;&#x7EC4;&#x4EF6;&#xFF1A;</h5><blockquote>&#x4F8B;&#x5982;&#xFF1A;&#x5728;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;vue&#x9875;&#x9762;&#x4E2D;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;template&gt;
        
        &lt;!-- &#x91CC;&#x9762;&#x5199;eleCalendar&#x7EC4;&#x4EF6;--&gt;
            &lt;ele-calendar
                  :render-content=&quot;renderContent&quot;
                  :data=&quot;datedef&quot;
                  :prop=&quot;prop&quot;
            &gt;&lt;/ele-calendar&gt;
    &lt;/template&gt;
    
    &lt;script&gt;
    import eleCalendar from &apos;ele-calendar&apos;
    import &apos;ele-calendar/dist/vue-calendar.css&apos; 
    export default {
        data(){
            return{
                datedef:[
                    {&quot;date&quot;:&quot;2018-06-30&quot;,&quot;content&quot;:null,&quot;cid&quot;:null},
                    {&quot;date&quot;:&quot;2018-06-26&quot;,&quot;content&quot;:null,&quot;cid&quot;:null},
                ],
                prop:&apos;date&apos; //&#x5BF9;&#x5E94;&#x65E5;&#x671F;&#x5B57;&#x6BB5;&#x540D;
            }
        },
        components: {
            eleCalendar
        },
        methods: {
          renderContent(h,parmas) {
            const loop = data =&gt;{
              return (
                data.defvalue.value ? (&lt;div&gt;&lt;div&gt;{data.defvalue.text}&lt;/div&gt; 
                &lt;span  &gt;&#x5907;&#x9009;&#x9879;&lt;/span&gt;
                &lt;/div&gt;) : &lt;div&gt;{data.defvalue.text}&lt;/div&gt;
              )
           }
           return (
            &lt;div  style=&quot;min-height:60px;&quot;&gt;
             {loop(parmas)}
            &lt;/div&gt;
            );
         },
       }
    }
    &lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        
        <span class="hljs-comment">&lt;!-- &#x91CC;&#x9762;&#x5199;eleCalendar&#x7EC4;&#x4EF6;--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ele-calendar</span>
                  <span class="hljs-attr">:render-content</span>=<span class="hljs-string">&quot;renderContent&quot;</span>
                  <span class="hljs-attr">:data</span>=<span class="hljs-string">&quot;datedef&quot;</span>
                  <span class="hljs-attr">:prop</span>=<span class="hljs-string">&quot;prop&quot;</span>
            &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ele-calendar</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> eleCalendar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;ele-calendar&apos;</span>
    <span class="hljs-keyword">import</span> <span class="hljs-string">&apos;ele-calendar/dist/vue-calendar.css&apos;</span> 
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data(){
            <span class="hljs-keyword">return</span>{
                <span class="hljs-attr">datedef</span>:[
                    {<span class="hljs-string">&quot;date&quot;</span>:<span class="hljs-string">&quot;2018-06-30&quot;</span>,<span class="hljs-string">&quot;content&quot;</span>:<span class="hljs-literal">null</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-literal">null</span>},
                    {<span class="hljs-string">&quot;date&quot;</span>:<span class="hljs-string">&quot;2018-06-26&quot;</span>,<span class="hljs-string">&quot;content&quot;</span>:<span class="hljs-literal">null</span>,<span class="hljs-string">&quot;cid&quot;</span>:<span class="hljs-literal">null</span>},
                ],
                <span class="hljs-attr">prop</span>:<span class="hljs-string">&apos;date&apos;</span> <span class="hljs-comment">//&#x5BF9;&#x5E94;&#x65E5;&#x671F;&#x5B57;&#x6BB5;&#x540D;</span>
            }
        },
        <span class="hljs-attr">components</span>: {
            eleCalendar
        },
        <span class="hljs-attr">methods</span>: {
          renderContent(h,parmas) {
            <span class="hljs-keyword">const</span> loop = <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span>{
              <span class="hljs-keyword">return</span> (
                data.defvalue.value ? (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data.defvalue.text}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  &gt;</span>&#x5907;&#x9009;&#x9879;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>) : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data.defvalue.text}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
              )
           }
           <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>  <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;min-height:60px;&quot;</span>&gt;</span>
             {loop(parmas)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            );
         },
       }
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h5>3.&#x901A;&#x8FC7;render-content&#x7684;&#x6E32;&#x67D3;Function &#x81EA;&#x5B9A;&#x4E49;&#x65E5;&#x5386;&#x663E;&#x793A;&#x5185;&#x5BB9;</h5><blockquote>&#x4F8B;&#x5982;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    renderContent(h,parmas) { //&#x8BBE;&#x7F6E;lunarcalendar=true,parmas&#x8FD4;&#x56DE;&#x503C;&#x5305;&#x542B;&#x519C;&#x5386;
                const loop = data =&gt;{
                  return (
                    data.defvalue.value ? (&lt;div&gt;&lt;div&gt;{data.defvalue.text}&lt;/div&gt; 
                    &lt;span  &gt;&#x5907;&#x9009;&#x9879;&lt;/span&gt;
                    &lt;/div&gt;) : &lt;div&gt;{data.defvalue.text}&lt;/div&gt;
                  )
               }
               return (
                &lt;div  style=&quot;min-height:60px;&quot;&gt;
                 {loop(parmas)}
                &lt;/div&gt;
                );
             },
       parmas&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x65E5;&#x671F;&#x548C;&#x4F20;&#x5165;data&#x5BF9;&#x5E94;&#x5185;&#x5BB9;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">    renderContent(h,parmas) { //&#x8BBE;&#x7F6E;lunarcalendar=true,parmas&#x8FD4;&#x56DE;&#x503C;&#x5305;&#x542B;&#x519C;&#x5386;
                const loop = data =&gt;{
                  return (
                    data.defvalue.value ? (<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data.defvalue.text}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  &gt;</span>&#x5907;&#x9009;&#x9879;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>) : <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data.defvalue.text}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                  )
               }
               return (
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>  <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;min-height:60px;&quot;</span>&gt;</span>
                 {loop(parmas)}
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                );
             },
       parmas&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x65E5;&#x671F;&#x548C;&#x4F20;&#x5165;data&#x5BF9;&#x5E94;&#x5185;&#x5BB9;
</code></pre><h3 id="articleHeader3">Calendar Attributes</h3><table><thead><tr><th>&#x53C2;&#x6570;</th><th>&#x8BF4;&#x660E;</th><th>&#x7C7B;&#x578B;</th><th>&#x53EF;&#x9009;&#x503C;</th><th>&#x9ED8;&#x8BA4;&#x503C;</th></tr></thead><tbody><tr><td>data</td><td>&#x663E;&#x793A;&#x7684;&#x6570;&#x636E;</td><td>array</td><td>&#x2014;</td><td>&#x2014;</td></tr><tr><td>prop</td><td>&#x5BF9;&#x5E94;&#x65E5;&#x671F;&#x5B57;&#x6BB5;&#x540D;</td><td>string</td><td>&#x2014;</td><td>&#x2014;</td></tr><tr><td>lang</td><td>&#x8BED;&#x8A00;&#x5207;&#x6362;</td><td>string</td><td>en</td><td>zh-CN</td></tr><tr><td>selectionMode</td><td>&#x65E5;&#x5386;&#x6A21;&#x5F0F;</td><td>string</td><td>dates</td><td>day</td></tr><tr><td>highlight</td><td>&#x662F;&#x5426;&#x8981;&#x9AD8;&#x4EAE;&#x5BF9;&#x5E94;&#x65E5;&#x671F;</td><td>boolean</td><td>&#x2014;</td><td>false</td></tr><tr><td>currentmonth</td><td>&#x9AD8;&#x4EAE;&#x9009;&#x4E2D;&#x65E5;&#x671F;</td><td>boolean</td><td>&#x2014;</td><td>false</td></tr><tr><td>disabledDate</td><td>&#x8BBE;&#x7F6E;&#x7981;&#x7528;&#x72B6;&#x6001;&#xFF0C;&#x53C2;&#x6570;&#x4E3A;&#x5F53;&#x524D;&#x65E5;&#x671F;&#xFF0C;&#x8981;&#x6C42;&#x8FD4;&#x56DE; Boolean</td><td>Function</td><td>&#x2014;</td><td>&#x2014;</td></tr><tr><td>border</td><td>&#x662F;&#x5426;&#x5E26;&#x6709;&#x8FB9;&#x6846;</td><td>boolean</td><td>&#x2014;</td><td>false</td></tr><tr><td>lunarcalendar</td><td>&#x662F;&#x5426;&#x9700;&#x8981;&#x519C;&#x5386;</td><td>boolean</td><td>&#x2014;</td><td>false</td></tr><tr><td>defaultValue</td><td>&#x9ED8;&#x8BA4;&#x5C55;&#x793A;&#x67D0;&#x6708;</td><td>Date</td><td>&#x2014;</td><td>-</td></tr><tr><td>render-content</td><td>&#x5185;&#x5BB9;&#x533A;&#x7684;&#x6E32;&#x67D3; Function</td><td>Function(h, parmas)</td><td>&#x2014;</td><td>&#x2014;</td></tr></tbody></table><h3 id="articleHeader4">Calendar Events</h3><table><thead><tr><th>&#x4E8B;&#x4EF6;&#x540D;</th><th>&#x8BF4;&#x660E;</th><th>&#x53C2;&#x6570;</th></tr></thead><tbody><tr><td>date-change</td><td>&#x5207;&#x6362;&#x65E5;&#x5386;&#x5E74;&#x3001;&#x6708;</td><td>data</td></tr><tr><td>select</td><td>&#x9009;&#x62E9;&#x65E5;&#x671F;&#x7684;&#x6570;&#x7EC4;&#x53CA;&#x8282;&#x70B9;</td><td>val,selectDom</td></tr><tr><td>pick</td><td>&#x70B9;&#x51FB;&#x65E5;&#x5386;</td><td>&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x70B9;&#x51FB;&#x65F6;&#x95F4;data&#x3001;event&#x3001;row&#x3001;dome</td></tr></tbody></table>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个vue的日历组件

## 原文链接
[https://segmentfault.com/a/1190000015382208](https://segmentfault.com/a/1190000015382208)

