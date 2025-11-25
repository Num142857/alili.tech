---
title: 'uve (mui/light7)写APP的使用心得(大坑);' 
date: 2018-11-18 3:32:07
hidden: true
slug: l9klvvcrsq
categories: [reprint]
---

{{< raw >}}
<p>&#x8BDD;&#x8BF4;mui&#x8FD9;&#x4E2A;&#x6846;&#x67B6;&#x7684;UI&#x786E;&#x5B9E;&#x633A;&#x597D;&#x770B;&#x7684;(&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;)<br>&#x6240;&#x4EE5;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#x4E86;&#x4ED6;,&#x7ED3;&#x679C;&#x91CC;&#x9762;&#x7684;&#x5751;&#x592A;TM&#x591A;,&#x4E0D;&#x5F97;&#x4E0D;&#x8BF4;MUI&#x505A;&#x4E1C;&#x897F;&#x592A;&#x4E0D;&#x7528;&#x5FC3;&#x4E86;,&#x793E;&#x533A;&#x4E0D;&#x6D3B;&#x8DC3;,&#x63D0;&#x95EE;&#x90FD;&#x6CA1;&#x4EBA;&#x7BA1;!;</p><h4>mui&#x7B2C;&#x4E00;&#x4E2A;&#x5751;:</h4><p>&#x65E5;&#x671F;&#x9009;&#x62E9;&#x5668;&#x9ED8;&#x8BA4;&#x503C;&#x65E0;&#x6548;:<br>&#x4F7F;&#x7528;&#x4EE3;&#x7801;&#x8DDF;&#x8E2A;&#x627E;&#x5230;&#x91CC;&#x9762;&#x5B9E;&#x73B0;&#x7684;&#x65B9;&#x6CD5;,&#x91CC;&#x9762;&#x65B9;&#x6CD5;&#x786E;&#x5B9E;&#x6CA1;&#x6BDB;&#x75C5;,&#x4F46;&#x662F;callback&#x4E0D;&#x4F1A;&#x6267;&#x884C;!<br>&#x6BD4;&#x5982;&#x8BBE;&#x7F6E;&#x65E5;&#x671F;&#x9009;&#x62E9;&#x5668;&#x9ED8;&#x8BA4;&#x503C;;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="picker.setSelectedValue(&quot;2018-06-06&quot;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">picker</span><span class="hljs-selector-class">.setSelectedValue</span>(<span class="hljs-string">&quot;2018-06-06&quot;</span>)</code></pre><p>&#x4F60;&#x4F1A;&#x60CA;&#x5947;&#x7684;&#x53D1;&#x73B0;:&#x53EA;&#x662F;&#x8BBE;&#x7F6E;&#x4E86;&#x5E74;&#x4EFD;&#x7684;&#x9ED8;&#x8BA4;&#x503C;</p><p>&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="changeDate: function () {
    let option = {
       type: &quot;date&quot;,
       beginYear:1950,
       endYear:2050,
       value: &apos;2019-10&apos;,
    };

   let DatePicker = new mui.DtPicker(option);
       DatePicker.setSelectedValue(&quot;1988-11-01&quot;,100,function () {
   });
   DatePicker.show(function (selectItem) {
       console.log(selectItem);
   });
},

&#x89E3;&#x51B3;&#x529E;&#x6CD5;:&#x4F7F;&#x7528;&#x5B9A;&#x65F6;&#x5668;&#x4E00;&#x4E2A;&#x4E2A;&#x7684;&#x8BBE;&#x7F6E;;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>changeDate: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> option = {
       <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;date&quot;</span>,
       <span class="hljs-attr">beginYear</span>:<span class="hljs-number">1950</span>,
       <span class="hljs-attr">endYear</span>:<span class="hljs-number">2050</span>,
       <span class="hljs-attr">value</span>: <span class="hljs-string">&apos;2019-10&apos;</span>,
    };

   <span class="hljs-keyword">let</span> DatePicker = <span class="hljs-keyword">new</span> mui.DtPicker(option);
       DatePicker.setSelectedValue(<span class="hljs-string">&quot;1988-11-01&quot;</span>,<span class="hljs-number">100</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
   });
   DatePicker.show(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">selectItem</span>) </span>{
       <span class="hljs-built_in">console</span>.log(selectItem);
   });
},

&#x89E3;&#x51B3;&#x529E;&#x6CD5;:&#x4F7F;&#x7528;&#x5B9A;&#x65F6;&#x5668;&#x4E00;&#x4E2A;&#x4E2A;&#x7684;&#x8BBE;&#x7F6E;;
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbePIy?w=613&amp;h=371" src="https://static.alili.tech/img/bVbePIy?w=613&amp;h=371" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h4>mui&#x7B2C;&#x4E8C;&#x4E2A;&#x5751;:</h4><p>picker &#x56DE;&#x8C03;&#x4E0D;&#x6267;&#x884C;!</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="picker.pickers[0].setSelectedIndex(index,500,function(){

alert(&apos;callback&apos;);    //&#x4E0D;&#x6267;&#x884C;

});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>picker.pickers[<span class="hljs-number">0</span>].setSelectedIndex(index,<span class="hljs-number">500</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{

alert(<span class="hljs-string">&apos;callback&apos;</span>);    <span class="hljs-comment">//&#x4E0D;&#x6267;&#x884C;</span>

});</code></pre><p>&#x5BF9;&#x4E8E;&#x8FD9;&#x4E2A;&#x5751;&#x6211;&#x4E5F;&#x5C31;&#x5475;&#x5475;&#x4E86;,&#x8FD9;&#x4E5F;&#x5C31;&#x662F;&#x51FA;&#x73B0;&#x65F6;&#x95F4;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x503C;&#x6708;&#x4EFD;&#x8BBE;&#x7F6E;&#x4E0D;&#x4E0A;&#x7684;&#x539F;&#x56E0;;<br>&#x6CA1;&#x627E;&#x5230;&#x89E3;&#x51B3;&#x529E;&#x6CD5;,mui&#x793E;&#x533A;&#x63D0;&#x4EA4;Bug&#x65E0;&#x4EBA;&#x95EE;&#x6D25;,&#x5509;!</p><h4>mui&#x7B2C;&#x4E09;&#x4E2A;&#x5751;:</h4><p>setSelectedValue/setSelectedIndex&#x8BBE;&#x7F6E;&#x7B2C;&#x4E8C;&#x4E2A;&#x503C;&#x65E0;&#x6548;,<br>&#x5BF9;&#x8FD9;&#x4E2A;&#x6211;&#x66F4;&#x5C31;&#x65E0;&#x8BED;&#x4E86;!<br>&#x6BD4;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="picker.pickers[0].setSelectedValue(&apos;&#x5317;&#x4EAC;&#x5E02;&apos;);
picker.pickers[1].setSelectedValue(&apos;&#x6D77;&#x6DC0;&#x533A;&apos;);

//&#x4F60;&#x4F1A;&#x60CA;&#x5947;&#x7684;&#x53D1;&#x73B0; &#x53EA;&#x662F;&#x8BBE;&#x7F6E;&#x4E86;&#x5317;&#x4EAC;&#x5E02; &#x4E4B;&#x540E;&#x53D8;&#x6362;&#x601D;&#x8DEF;  &#x4F7F;&#x7528;setSelectedIndex &#x7ED3;&#x679C;&#x4E5F;&#x4E00;&#x6837;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">picker</span><span class="hljs-selector-class">.pickers</span><span class="hljs-selector-attr">[0]</span><span class="hljs-selector-class">.setSelectedValue</span>(<span class="hljs-string">&apos;&#x5317;&#x4EAC;&#x5E02;&apos;</span>);
<span class="hljs-selector-tag">picker</span><span class="hljs-selector-class">.pickers</span><span class="hljs-selector-attr">[1]</span><span class="hljs-selector-class">.setSelectedValue</span>(<span class="hljs-string">&apos;&#x6D77;&#x6DC0;&#x533A;&apos;</span>);

<span class="hljs-comment">//&#x4F60;&#x4F1A;&#x60CA;&#x5947;&#x7684;&#x53D1;&#x73B0; &#x53EA;&#x662F;&#x8BBE;&#x7F6E;&#x4E86;&#x5317;&#x4EAC;&#x5E02; &#x4E4B;&#x540E;&#x53D8;&#x6362;&#x601D;&#x8DEF;  &#x4F7F;&#x7528;setSelectedIndex &#x7ED3;&#x679C;&#x4E5F;&#x4E00;&#x6837;</span></code></pre><p>&#x89E3;&#x51B3;&#x529E;&#x6CD5;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var picker = new mui.PopPicker({layer: 3});
    picker.setData(cityData);
    let address = that.withdrawal.address.split(&apos;-&apos;);
    for(var index in cityData) {
       let item1 = cityData[index];
       if(address[0] == item1.text) {
         picker.pickers[0].setSelectedIndex(index);
         for(var index2 in item1.children){
            let item2 = item1.children[index2];
            if(address[1] == item2.text){
               pcker.pickers[1].setSelectedIndex(index2);
                 for(var index3 in item2.children){
                    let item3 = item2.children[index3];
                      if(address[2] == item3.text){
                         picker.pickers[2].setSelectedIndex(index3);
                  }
              }
           }
       }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livescript"><code> <span class="hljs-keyword">var</span> picker = <span class="hljs-keyword">new</span> mui.PopPicker({layer: <span class="hljs-number">3</span>});
    picker.setData(cityData);
    <span class="hljs-keyword">let</span> address = <span class="hljs-literal">that</span>.withdrawal.address.split(<span class="hljs-string">&apos;-&apos;</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> index <span class="hljs-keyword">in</span> cityData) {
       <span class="hljs-keyword">let</span> item1 = cityData[index];
       <span class="hljs-keyword">if</span>(address[<span class="hljs-number">0</span>] == item1.text) {
         picker.pickers[<span class="hljs-number">0</span>].setSelectedIndex(index);
         <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> index2 <span class="hljs-keyword">in</span> item1.children){
            <span class="hljs-keyword">let</span> item2 = item1.children[index2];
            <span class="hljs-keyword">if</span>(address[<span class="hljs-number">1</span>] == item2.text){
               pcker.pickers[<span class="hljs-number">1</span>].setSelectedIndex(index2);
                 <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> index3 <span class="hljs-keyword">in</span> item2.children){
                    <span class="hljs-keyword">let</span> item3 = item2.children[index3];
                      <span class="hljs-keyword">if</span>(address[<span class="hljs-number">2</span>] == item3.text){
                         picker.pickers[<span class="hljs-number">2</span>].setSelectedIndex(index3);
                  }
              }
           }
       }
    }
}</code></pre><p>&#x89E3;&#x51B3;&#x529E;&#x6CD5;:<br>&#x4F7F;&#x7528;for in &#x904D;&#x5386;&#x4E4B;&#x540E;&#x4F7F;&#x7528;</p><h4>mui&#x7B2C;&#x56DB;&#x4E2A;&#x5751;;</h4><p>&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x65E0;&#x6548;:<br>&#x4E0D;&#x77E5;&#x9053;&#x662F;&#x6211;&#x4EE3;&#x7801;&#x7684;&#x95EE;&#x9898;&#x8FD8;&#x662F;&#x4EC0;&#x4E48;&#x95EE;&#x9898;,&#x53CD;&#x6B63;&#x5C31;&#x662F;&#x6CA1;&#x89E3;&#x51B3;,&#x6700;&#x540E;&#x53C2;&#x8003;&#x997F;&#x4E86;&#x4E48;App,&#x4F7F;&#x7528;&#x70B9;&#x51FB;&#x52A0;&#x8F7D;&#x66F4;&#x591A;&#x5185;&#x5BB9;!</p><h4>mui&#x7B2C;&#x4E94;&#x4E2A;&#x5751;:</h4><p>&#x8F6E;&#x64AD;&#x56FE;&#x65E0;&#x6548;:<br>&#x5F53;&#x4F60;&#x5207;&#x6362;&#x8DEF;&#x7531;&#x540E;&#x9875;&#x9762;&#x8F6E;&#x64AD;&#x56FE;&#x5C31;&#x4F1A;&#x5361;&#x4E3B;,&#x89E3;&#x51B3;&#x529E;&#x6CD5; &#x5728;vue&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x4E2D;&#x6267;&#x884C;</p><h4>mui&#x7B2C;&#x516D;&#x4E2A;&#x5751;:</h4><p>mui(&apos;#refreshContainer&apos;).pullRefresh().endPulldown();<br>&#x62A5;&#x9519; undefined<br>&#x6CA1;&#x6709;&#x89E3;&#x51B3;;</p><h4>mui&#x7B2C;&#x4E03;&#x4E2A;&#x5751;:</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mui(&apos;.mui-scroll-wrapper&apos;).scroll().scrollToBottom(0,0,100);  &#x5C45;&#x7136;&#x65E0;&#x6548; &#x5475;&#x5475;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">mui</span>(<span class="hljs-string">&apos;.mui-scroll-wrapper&apos;</span>)<span class="hljs-selector-class">.scroll</span>()<span class="hljs-selector-class">.scrollToBottom</span>(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">100</span>);  &#x5C45;&#x7136;&#x65E0;&#x6548; &#x5475;&#x5475;;</code></pre><h4>mui&#x7B2C;&#x516B;&#x4E2A;&#x5751;;</h4><p>&lt;router-link&gt;&lt;/router-link&gt; &#x5728;wap&#x4E2D;&#x65E0;&#x6CD5;&#x8DF3;&#x8F6C;,<br>&#x56E0;&#x4E3A;mui&#x7981;&#x7528;&#x4E86;a&#x8DF3;&#x8F6C;,&#x6240;&#x4EE5;&#x5728;wap&#x4E2D;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;,<br>&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x5F88;&#x7B80;&#x5355;,&#x4F7F;&#x7528;js&#x8DF3;&#x8F6C;,&#x5509; &#x5FC3;&#x7D2F;&#x554A; &#x679C;&#x65AD;&#x6362;&#x6846;&#x67B6;</p><p>light7&#x4E2D;&#x5751;&#x6BD4;&#x8F83;&#x5C11;,</p><h4>light7&#x7B2C;&#x4E00;&#x4E2A;:</h4><p>&#x9875;&#x9762;&#x5FC5;&#x987B;&#x6709;.page&#x5143;&#x7D20; &#x5426;&#x5219;&#x62A5;&#x9519;;<br>&#x89E3;&#x51B3;&#x529E;&#x6CD5;:&#x5F88;&#x7B80;&#x5355;,&#x5C31;&#x662F;&#x7ED9;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;div.page</p><h4>light7&#x7B2C;&#x4E8C;&#x4E2A;&#x5751;</h4><p>&#x5982;&#x679C;&#x8DEF;&#x7531;&#x6A21;&#x5F0F;&#x662F;hash&#x6A21;&#x5F0F;;<br>&#x5C31;&#x4F1A;&#x62A5;&#x9519;,&#x6211;&#x5C31;&#x7ED9;&#x6539;&#x6210;History,&#x6539;&#x6210;History&#x4E4B;&#x540E;,&#x65E0;&#x6CD5;&#x6253;&#x5305;&#x6210;APP,<br>&#x89E3;&#x51B3;&#x529E;&#x6CD5;:&#x4FEE;&#x6539;&#x5168;&#x533A;&#x914D;&#x7F6E;&#x5173;&#x95ED;&#x8DEF;&#x7531;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.config = {
        autoInit: true,
        router:false,
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">$.config</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        autoInit:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        router:</span><span class="hljs-literal">false</span><span class="hljs-string">,</span>
    <span class="hljs-string">}</span></code></pre><h4>light7&#x7B2C;&#x4E09;&#x4E2A;&#x5751;</h4><p>&#x9875;&#x9762;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;panel&#x91CC;&#x9762;&#x5982;&#x679C;&#x6709;&#x8DF3;&#x8F6C;&#x800C;&#x4E14;&#x8DF3;&#x8F6C;&#x5230;&#x7684;&#x9875;&#x9762;&#x6709;&#x4E0A;&#x62C9;&#x52A0;&#x8F7D;&#x548C;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x7684;&#x8BDD;&#x4F1A;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;<br>&#x89E3;&#x51B3;&#x529E;&#x6CD5;:<br>&#x539F;&#x56E0;&#x5C31;&#x662F;&#x56E0;&#x4E3A;&#x4F60;&#x8DF3;&#x8F6C;&#x4E4B;&#x540E;panel&#x5E76;&#x6CA1;&#x6709;&#x5173;&#x95ED;,&#x4F46;&#x662F;&#x4F60;&#x5982;&#x679C;&#x4F7F;&#x7528; $.closePanel();&#x7684;&#x8BDD;&#x662F;&#x65E0;&#x6548;&#x7684;;<br>&#x5728;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x7684;&#x4E00;&#x77AC;&#x95F4;&#x6253;&#x5F00;panel&#x518D;&#x5173;&#x95ED;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.openPanel(&quot;#panel&quot;);
$.closePanel();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code><span class="hljs-variable">$.</span>openPanel(<span class="hljs-string">&quot;#panel&quot;</span>);
<span class="hljs-variable">$.</span>closePanel();</code></pre><p>&#x7B2C;&#x4E8C;&#x4E2A;&#x89E3;&#x51B3;&#x529E;&#x6CD5;:<br>&#x5C31;&#x662F;&#x4E0D;&#x5728;panel&#x91CC;&#x9762;&#x4F7F;&#x7528;a/router-link&#x8DF3;&#x8F6C;,&#x800C;&#x662F;&#x7ED9;&#x4ED6;&#x52A0;@click=&quot;toPage(url)&quot;<br>&#x5728;toPage&#x65B9;&#x6CD5;&#x4E2D;&#x5173;&#x95ED;panel,&#x4E4B;&#x540E;this.$router.push();<br>&#x8FD9;&#x4E2A;&#x529E;&#x6CD5;&#x81EA;&#x5DF1;&#x6CA1;&#x8BD5;&#x8FC7;,&#x731C;&#x60F3;&#x5E94;&#x8BE5;&#x662F;&#x53EF;&#x884C;&#x7684;!</p><p>&#x7B2C;&#x4E09;&#x4E2A;&#x89E3;&#x51B3;&#x529E;&#x6CD5;:<br>&#x76EE;&#x524D;&#x8FD9;&#x4E2A;&#x529E;&#x6CD5;&#x5E94;&#x8BE5;&#x662F;&#x6700;&#x597D;&#x7684;&#x4E86;,<br>&#x65E2;&#x89E3;&#x51B3;&#x4E86;&#x8DF3;&#x8F6C;&#x4E4B;&#x540E;&#x65E0;&#x6CD5;&#x4F7F;&#x7528;&#x4E0A;&#x62C9;&#x4E0B;&#x62C9;,&#x53C8;&#x4F7F;&#x7528;&#x4E86;a/router-link,&#x5C31;&#x662F;&#x5728;&#x8DF3;&#x8F6C;&#x7684;&#x65F6;&#x5019;&#x5148;&#x6267;&#x884C;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;,&#x5173;&#x95ED;panel,&#x4E4B;&#x540E;&#x518D;&#x6267;&#x884C;&#x8DF3;&#x8F6C;,&#x5B8C;&#x7F8E;&#x89E3;&#x51B3;!</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;router-link @click.native=&quot;closePanel&quot; tag=&quot;a&quot; to=&quot;/collection&quot; external &gt;
    &lt;li class=&quot;item-content item-link&quot;&gt;
        &lt;div class=&quot;item-media&quot;&gt;&lt;i class=&quot;icon icon-f7&quot;&gt;&lt;/i&gt;&lt;/div&gt;
        &lt;div class=&quot;item-inner&quot;&gt;&lt;div class=&quot;item-title&quot;&gt;&#x6211;&#x7684;&#x6536;&#x85CF;&lt;/div&gt;&lt;/div&gt;
    &lt;/li&gt;
&lt;/router-link&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;router-link @click.native=<span class="hljs-string">&quot;closePanel&quot;</span> tag=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">&quot;/collection&quot;</span> external &gt;
    &lt;li <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item-content item-link&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item-media&quot;</span>&gt;&lt;i <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;icon icon-f7&quot;</span>&gt;&lt;/i&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item-inner&quot;</span>&gt;&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;item-title&quot;</span>&gt;&#x6211;&#x7684;&#x6536;&#x85CF;&lt;/<span class="hljs-keyword">div</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/li&gt;
&lt;/router-link&gt;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    export default {
        name:&apos;panel&apos;,
        methods:{
            closePanel:function () {
                console.log(&apos;asdad&apos;);
                $.closePanel();
            }
        }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>:<span class="hljs-string">&apos;panel&apos;</span>,
        <span class="hljs-attr">methods</span>:{
            <span class="hljs-attr">closePanel</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;asdad&apos;</span>);
                $.closePanel();
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x66F4;&#x591A;&#x5751;&#x6B63;&#x5728;&#x6316;&#x6398;&#x4E2D;....(&#x4E00;&#x8D77;&#x8DF3;&#x5751;&#x7684;&#x52A0;&#x7FA4;: 814270669)</p><p>&#x5FC3;&#x7D2F;&#x554A;,&#x597D;&#x770B;&#x7684;UI&#x90FD;&#x6709;&#x4E00;&#x5806;&#x7684;&#x5751;;</p><p>&#x8981;&#x662F;&#x5927;&#x5BB6;&#x6709;&#x597D;&#x770B;&#x7684;ios&#x98CE;&#x683C;&#x7684;ui&#x63A8;&#x8350;&#x4E00;&#x4E0B;,&#x591A;&#x8C22;!</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
uve (mui/light7)写APP的使用心得(大坑);

## 原文链接
[https://segmentfault.com/a/1190000015889407](https://segmentfault.com/a/1190000015889407)

