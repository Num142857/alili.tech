---
title: 'vue数组对象排序' 
date: 2018-11-27 2:30:12
hidden: true
slug: x5jzze5dhi
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x6700;&#x8FD1;&#x5728;&#x770B;vue&#x7684;&#x6559;&#x5B66;&#x89C6;&#x9891;&#xFF0C;&#x6B63;&#x597D;&#x5B66;&#x5230;&#x7684;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x6392;&#x5E8F;&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x8FD9;&#x8DDF;&#x5927;&#x5BB6;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x6709;&#x4E0D;&#x8DB3;&#x4E4B;&#x5904;&#xFF0C;&#x8BF7;&#x8D50;&#x6559;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbct7B?w=430&amp;h=323" src="https://static.alili.tech/img/bVbct7B?w=430&amp;h=323" alt="u=1615052445,1949426526&amp;fm=27&amp;gp=0.jpg" title="u=1615052445,1949426526&amp;fm=27&amp;gp=0.jpg" style="cursor:pointer;display:inline"></span></p><p><strong>&#x666E;&#x901A;&#x6570;&#x7EC4;&#x7684;&#x6392;&#x5E8F;</strong><br>&#x5148;&#x770B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;app&quot;&gt;
      &lt;h1&gt;v-for&#x5B9E;&#x4F8B;&lt;/h1&gt;
      &lt;hr&gt;
      &lt;ol&gt;
          &lt;li v-for=&quot;number in numbers&quot;&gt;"{{"number"}}"&lt;/li&gt;
      &lt;/ol&gt;
  &lt;/div&gt;  
  &lt;script&gt;
  new Vue({
      el:&apos;.app&apos;,
      data:{
          numbers:[5 ,88, 43, 56, 28, 61, 9],
      },
      computed:{
          numbers:function(){
              return this.numbers.sort(numbers);
          },
      }
  })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>v-for&#x5B9E;&#x4F8B;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;number in numbers&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"number"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">new</span> Vue({
      el:<span class="hljs-string">&apos;.app&apos;</span>,
      data:{
          numbers:[<span class="hljs-number">5</span> ,<span class="hljs-number">88</span>, <span class="hljs-number">43</span>, <span class="hljs-number">56</span>, <span class="hljs-number">28</span>, <span class="hljs-number">61</span>, <span class="hljs-number">9</span>],
      },
      computed:{
          numbers:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
              <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.numbers.sort(numbers);
          },
      }
  })</span></span></code></pre><p>&#x539F;&#x672C;&#x6211;&#x4EE5;&#x4E3A;&#x4F1A;&#x51FA;&#x6765;&#x7ED3;&#x679C;&#xFF0C;&#x53EF;&#x7ED3;&#x679C;&#x4E0D;&#x4E00;&#x6837;&#x3002;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbcuav?w=531&amp;h=308" src="https://static.alili.tech/img/bVbcuav?w=531&amp;h=308" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x540E;&#x6765;&#x6211;&#x60F3;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x53D1;&#x73B0;&#x4E86;&#x5176;&#x4E2D;&#x7684;&#x95EE;&#x9898;&#xFF0C;sort&#x65B9;&#x6CD5;&#x4F1A;&#x8C03;&#x7528;&#x6BCF;&#x4E2A;&#x6570;&#x7EC4;&#x9879;&#x7684;toString()&#x65B9;&#x6CD5;&#xFF0C;&#x5F97;&#x5230;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5BF9;&#x5F97;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#x3002;sort()&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#x5C31;&#x8D77;&#x5230;&#x4E86;&#x4F5C;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x53EB;&#x505A;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x3002;<br><strong>&#x89E3;&#x51B3;&#x529E;&#x6CD5;</strong><br>&#x52A0;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sortNumbers(a,b){
        return a-b;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">sortNumbers</span>(a,b){
        <span class="hljs-keyword">return</span> <span class="hljs-type">a-b</span>;
    }</code></pre><p>&#x54A6;&#xFF0C;&#x600E;&#x4E48;&#x7ED3;&#x679C;&#x8FD8;&#x662F;&#x6CA1;&#x51FA;&#x6765;&#xFF1F;&#xFF1F;&#x539F;&#x6765;&#x6211;&#x662F;&#x8F93;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x5FD8;&#x8BB0;&#x5427;numbers&#x6362;&#x6210;sortNumbers&#x3002;&#x8FD9;&#x662F;&#x4ECE;&#x5C0F;&#x5230;&#x5927;&#x8F93;&#x51FA;&#xFF0C;&#x90A3;&#x4E48;&#x4ECE;&#x5927;&#x5230;&#x5C0F;&#x5462;&#xFF1F;&#x5F88;&#x7B80;&#x5355;&#x5C31;&#x662F;return b-a,<br>&#x7ED3;&#x679C;&#x5982;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcudR?w=880&amp;h=329" src="https://static.alili.tech/img/bVbcudR?w=880&amp;h=329" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;v-for&lt;/title&gt;
    &lt;script src=&quot;https://cdn.bootcss.com/vue/2.4.2/vue.min.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class=&quot;app&quot;&gt;
      &lt;h1&gt;v-for&#x5B9E;&#x4F8B;&lt;/h1&gt;
      &lt;hr&gt;
      &lt;ol&gt;
          &lt;li v-for=&quot;number in sortNumbers&quot;&gt;"{{"number"}}"&lt;/li&gt;
      &lt;/ol&gt;

  &lt;/div&gt;  
  &lt;script&gt;
  new Vue({
      el:&apos;.app&apos;,
      data:{
          numbers:[5 ,88, 43, 56, 28, 61, 9],

      },
      computed:{
        sortNumbers:function(){
              return this.numbers.sort( sortNumbers);
          },

      }
  });
    function sortNumbers(a,b){
            return a-b;
        }

&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>v-for<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/vue/2.4.2/vue.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>v-for&#x5B9E;&#x4F8B;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;number in sortNumbers&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"number"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">new</span> Vue({
      el:<span class="hljs-string">&apos;.app&apos;</span>,
      data:{
          numbers:[<span class="hljs-number">5</span> ,<span class="hljs-number">88</span>, <span class="hljs-number">43</span>, <span class="hljs-number">56</span>, <span class="hljs-number">28</span>, <span class="hljs-number">61</span>, <span class="hljs-number">9</span>],

      },
      computed:{
        sortNumbers:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
              <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.numbers.sort( sortNumbers);
          },

      }
  });
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortNumbers</span><span class="hljs-params">(a,b)</span></span>{
            <span class="hljs-keyword">return</span> a-b;
        }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre><p><strong>&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x7684;&#x6392;&#x5E8F;</strong><br>&#x5982;&#x679C;&#x6570;&#x7EC4;&#x9879;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6839;&#x636E;&#x6570;&#x7EC4;&#x9879;&#x7684;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x5BF9;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x6392;&#x5E8F;&#xFF0C;&#x8981;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;&#x5176;&#x5B9E;&#x548C;&#x524D;&#x9762;&#x7684;&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#x4E5F;&#x5DEE;&#x4E0D;&#x591A;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x5C31;&#x53EA;&#x628A;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x5206;&#x4EAB;&#x51FA;&#x6765;&#x4E86;&#x3002;<br>&#x5982;&#x4F55;&#x5BF9;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x8FDB;&#x884C;age&#x6392;&#x5E8F;&#x5462;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          students:[
               {name:&apos;cjk&apos;,age:&apos;38&apos;} ,
               { name:&apos;xxf&apos;,age:&apos;29&apos;},
               {name:&apos;zk&apos;,age:&apos;26&apos;},
          ]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>          <span class="hljs-attribute">students</span>:[
               {<span class="hljs-attribute">name</span>:<span class="hljs-string">&apos;cjk&apos;</span>,<span class="hljs-attribute">age</span>:<span class="hljs-string">&apos;38&apos;</span>} ,
               { <span class="hljs-attribute">name</span>:<span class="hljs-string">&apos;xxf&apos;</span>,<span class="hljs-attribute">age</span>:<span class="hljs-string">&apos;29&apos;</span>},
               {<span class="hljs-attribute">name</span>:<span class="hljs-string">&apos;zk&apos;</span>,<span class="hljs-attribute">age</span>:<span class="hljs-string">&apos;26&apos;</span>},
          ]</code></pre><p>&#x6BD4;&#x8F83;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sortByKey(array,key){
    return array.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        return((x&lt;y)?-1:((x&gt;y)?1:0));
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortByKey</span><span class="hljs-params">(array,key)</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">array</span>.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a,b)</span></span>{
        <span class="hljs-keyword">var</span> x = a[key];
        <span class="hljs-keyword">var</span> y = b[key];
        <span class="hljs-keyword">return</span>((x&lt;y)?<span class="hljs-number">-1</span>:((x&gt;y)?<span class="hljs-number">1</span>:<span class="hljs-number">0</span>));
    })
}</code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x662F;&#x7528;&#x6761;&#x4EF6;&#x64CD;&#x4F5C;&#x7B26;&#x6765;&#x5224;&#x65AD;&#x7684;&#xFF0C;&#x4E5F;&#x548C;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x6548;&#x679C;&#x4E00;&#x6837;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];if (val1 &lt; val2) {
            return -1;
        } else if (val1 &gt; val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> compare = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(prop)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(obj1, obj2)</span> </span>{
        <span class="hljs-keyword">var</span> val1 = obj1[prop];
        <span class="hljs-keyword">var</span> val2 = obj2[prop];<span class="hljs-keyword">if</span> (val1 &lt; val2) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (val1 &gt; val2) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
        }            
    } 
}</code></pre><p>&#x6211;&#x89C9;&#x5F97;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x6709;&#x70B9;&#x5197;&#x6742;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x5C31;&#x7528;&#x4E86;&#x6761;&#x4EF6;&#x64CD;&#x4F5C;&#x7B26;&#x6765;&#x5224;&#x65AD;&#x8F93;&#x51FA;&#x3002;<br>&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcujA?w=462&amp;h=117" src="https://static.alili.tech/img/bVbcujA?w=462&amp;h=117" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;v-for&lt;/title&gt;
    &lt;script src=&quot;https://cdn.bootcss.com/vue/2.4.2/vue.min.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class=&quot;app&quot;&gt;
      &lt;h1&gt;v-for&#x5B9E;&#x4F8B;&lt;/h1&gt;
      &lt;hr&gt;
      &lt;ol&gt;
          &lt;li v-for=&quot;number in sortNumbers&quot;&gt;"{{"number"}}"&lt;/li&gt;
      &lt;/ol&gt;
      &lt;hr&gt;
      &lt;ul&gt;
        &lt;li v-for=&quot;(student,index) in  sortstudents&quot;&gt;"{{"index+1"}}":"{{"student.name"}}"-"{{"student.age"}}"&lt;/li&gt;
      &lt;/ul&gt;
  &lt;/div&gt;  
  &lt;script&gt;
  new Vue({
      el:&apos;.app&apos;,
      data:{
          numbers:[5 ,88, 43, 56, 28, 61, 9],
          students:[
               {name:&apos;cjk&apos;,age:&apos;38&apos;} ,
               { name:&apos;xxf&apos;,age:&apos;29&apos;},
               {name:&apos;zk&apos;,age:&apos;26&apos;},
          ]
      },
      computed:{
        sortNumbers:function(){
              return this.numbers.sort( sortNumbers);
          },
          sortstudents:function(){
              return sortByKey(this.students,&apos;age&apos;)
          }
      }
  });
function sortNumbers(a,b){
        return a-b;
    }
    //&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x6392;&#x5E8F;
function sortByKey(array,key){
    return array.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        return((x&lt;y)?-1:((x&gt;y)?1:0));
    })
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>v-for<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/vue/2.4.2/vue.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>v-for&#x5B9E;&#x4F8B;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;number in sortNumbers&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"number"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(student,index) in  sortstudents&quot;</span>&gt;</span></span><span class="hljs-template-variable">"{{"index+1"}}"</span><span class="xml">:</span><span class="hljs-template-variable">"{{"student.name"}}"</span><span class="xml">-</span><span class="hljs-template-variable">"{{"student.age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">new</span> Vue({
      el:<span class="hljs-string">&apos;.app&apos;</span>,
      data:{
          numbers:[<span class="hljs-number">5</span> ,<span class="hljs-number">88</span>, <span class="hljs-number">43</span>, <span class="hljs-number">56</span>, <span class="hljs-number">28</span>, <span class="hljs-number">61</span>, <span class="hljs-number">9</span>],
          students:[
               {name:<span class="hljs-string">&apos;cjk&apos;</span>,age:<span class="hljs-string">&apos;38&apos;</span>} ,
               { name:<span class="hljs-string">&apos;xxf&apos;</span>,age:<span class="hljs-string">&apos;29&apos;</span>},
               {name:<span class="hljs-string">&apos;zk&apos;</span>,age:<span class="hljs-string">&apos;26&apos;</span>},
          ]
      },
      computed:{
        sortNumbers:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
              <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.numbers.sort( sortNumbers);
          },
          sortstudents:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
              <span class="hljs-keyword">return</span> sortByKey(<span class="hljs-keyword">this</span>.students,<span class="hljs-string">&apos;age&apos;</span>)
          }
      }
  });
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortNumbers</span><span class="hljs-params">(a,b)</span></span>{
        <span class="hljs-keyword">return</span> a-b;
    }
    <span class="hljs-comment">//&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x6392;&#x5E8F;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortByKey</span><span class="hljs-params">(array,key)</span></span>{
    <span class="hljs-keyword">return</span> array.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a,b)</span></span>{
        <span class="hljs-keyword">var</span> x = a[key];
        <span class="hljs-keyword">var</span> y = b[key];
        <span class="hljs-keyword">return</span>((x&lt;y)?<span class="hljs-number">-1</span>:((x&gt;y)?<span class="hljs-number">1</span>:<span class="hljs-number">0</span>));
    })
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre><p>&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcujL?w=815&amp;h=377" src="https://static.alili.tech/img/bVbcujL?w=815&amp;h=377" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x5E0C;&#x671B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5BF9;&#x65B0;&#x624B;&#x6709;&#x7528;&#xFF0C;&#x4E5F;&#x5E0C;&#x671B;&#x4F60;&#x4EEC;&#x80FD;&#x548C;&#x6211;&#x4E00;&#x8D77;&#x5206;&#x4EAB;&#x77E5;&#x8BC6;&#xFF0C;&#x4E00;&#x8D77;&#x6210;&#x957F;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue数组对象排序

## 原文链接
[https://segmentfault.com/a/1190000015330611](https://segmentfault.com/a/1190000015330611)

