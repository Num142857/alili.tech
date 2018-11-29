---
title: '前端知识点整理——javascript' 
date: 2018-11-29 9:33:05
hidden: true
slug: 2dg7crbhckr
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">javascript</h2>
<p>&#x4F5C;&#x4E3A;junior developer,&#x4EC5;&#x4EC5;&#x89C9;&#x5F97;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#x7ECF;&#x5E38;&#x5728;&#x6211;&#x9762;&#x8BD5;&#x7684;&#x65F6;&#x5019;&#x88AB;&#x95EE;&#x5230;&#xFF0C;&#x597D;&#x8BB0;&#x6027;&#x4E0D;&#x5982;&#x70C2;&#x7B14;&#x5934;&#xFF0C;&#x81EA;&#x5DF1;&#x6574;&#x7406;&#x8BB0;&#x5F55;&#x4E00;&#x904D;~~~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.javascript&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF1F;

&#x4E09;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;

 1. &#x539F;&#x578B;&#x7EE7;&#x627F;

            // &#x4F18;&#x70B9;&#xFF1A;&#x65E2;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x53C8;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;
             // &#x7F3A;&#x70B9;&#xFF1A;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;&#x4F20;&#x53C2;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;&#x4F20;&#x53C2;&#xFF08;&#x4E0D;&#x7B26;&#x5408;&#x5E38;&#x89C4;&#x8BED;&#x8A00;&#x7684;&#x5199;&#x6CD5;&#xFF09;
            
            function Parent(work, drink) {
                this.work = function() {
                    console.log(work);
                }
                
                this.drink = drink;
            }
            
            Parent.prototype.draw = function() {
                alert(&quot;I can draw&quot;);    
                
            }
            
            function Child() {
                this.cry = function() {
                    console.log(&quot;the best ability is to cry&quot;); 
                }
            }
            
            Child.prototype = new Parent(&apos;code&apos;, &apos;beer&apos;);
            var xiaoLi = new Child();
            xiaoLi.work(); // code
            xiaoLi.draw(); // I can draw
            xiaoLi.cry();  // the best ability is to cry

    &#x5173;&#x4E8E;&#x539F;&#x578B;&#x94FE;&#x7684;&#x89E3;&#x91CA;&#xFF1A;https://www.cnblogs.com/chengzp/p/prototype.html
 2. &#x7C7B;&#x7EE7;&#x627F;&#xFF08;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x7EE7;&#x627F;&#xFF09;

            // &#x4F18;&#x70B9;&#xFF1A;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x65B9;&#x4FBF;&#x901A;&#x8FC7;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;&#x4F20;&#x53C2;
            // &#x7F3A;&#x70B9;&#xFF1A;&#x4E0D;&#x80FD;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;
            function Parent(work, drink) {
                this.work = function() {
                    console.log(work);
                }
                
                this.drink = drink;
            }
            Parent.prototype.draw = function() {
                alert(&quot;I can draw&quot;);    
                
            }
            
            
            function Child(work, drink, sex) {
                Parent.call(this, work, drink);
                this.sex = sex;
                
            }
            
            var xiaoLi = new Child(&apos;code&apos;, &apos;beer&apos;, &apos;male&apos;);
            alert(xiaoLi.drink); // code
            xiaoLi.work(); // beer
            // xiaoLi.draw(); //&#x6CA1;&#x6709;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#xFF1A;xiaoLi.draw() is not a function
            console.log(xiaoLi.sex); // male
 3. &#x6DF7;&#x5408;&#x7EE7;&#x627F;&#xFF08;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x548C;&#x7C7B;&#x7EE7;&#x627F;&#xFF09;

            // &#x6DF7;&#x5408;&#x7EE7;&#x627F;&#xFF08;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x548C;&#x7C7B;&#x7EE7;&#x627F;&#xFF08;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x7EE7;&#x627F;&#xFF09;&#xFF09;
            function Parent(eat, sleep) {
                this.eat = function() {
                    console.log(&quot;function 1&quot; + eat);
                }
                this.sleep = function() {
                    console.log(&quot;function 2&quot; + sleep);
                }
            }
            
            Parent.prototype.other = &quot;work&quot;;
            
            function Child(eat, sleep, age) {
                Parent.call(this, eat, sleep);
                this.age = age;
            }
            
            Child.prototype = new Parent();
            var xiaoLi = new Child(&quot;cake&quot;, &quot;want to sleep&quot;, &quot;10&quot;);
            xiaoLi.eat();
            xiaoLi.sleep();
            console.log(xiaoLi.age);
            console.log(xiaoLi.other);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>javascript&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF1F;

&#x4E09;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;

 <span class="hljs-number">1.</span> &#x539F;&#x578B;&#x7EE7;&#x627F;

            <span class="hljs-comment">// &#x4F18;&#x70B9;&#xFF1A;&#x65E2;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x53C8;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;</span>
             <span class="hljs-comment">// &#x7F3A;&#x70B9;&#xFF1A;&#x7236;&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;&#x4F20;&#x53C2;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;&#x4F20;&#x53C2;&#xFF08;&#x4E0D;&#x7B26;&#x5408;&#x5E38;&#x89C4;&#x8BED;&#x8A00;&#x7684;&#x5199;&#x6CD5;&#xFF09;</span>
            
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">work, drink</span>) </span>{
                <span class="hljs-keyword">this</span>.work = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(work);
                }
                
                <span class="hljs-keyword">this</span>.drink = drink;
            }
            
            Parent.prototype.draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                alert(<span class="hljs-string">&quot;I can draw&quot;</span>);    
                
            }
            
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.cry = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;the best ability is to cry&quot;</span>); 
                }
            }
            
            Child.prototype = <span class="hljs-keyword">new</span> Parent(<span class="hljs-string">&apos;code&apos;</span>, <span class="hljs-string">&apos;beer&apos;</span>);
            <span class="hljs-keyword">var</span> xiaoLi = <span class="hljs-keyword">new</span> Child();
            xiaoLi.work(); <span class="hljs-comment">// code</span>
            xiaoLi.draw(); <span class="hljs-comment">// I can draw</span>
            xiaoLi.cry();  <span class="hljs-comment">// the best ability is to cry</span>

    &#x5173;&#x4E8E;&#x539F;&#x578B;&#x94FE;&#x7684;&#x89E3;&#x91CA;&#xFF1A;https:<span class="hljs-comment">//www.cnblogs.com/chengzp/p/prototype.html</span>
 <span class="hljs-number">2.</span> &#x7C7B;&#x7EE7;&#x627F;&#xFF08;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x7EE7;&#x627F;&#xFF09;

            <span class="hljs-comment">// &#x4F18;&#x70B9;&#xFF1A;&#x7EE7;&#x627F;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x65B9;&#x4FBF;&#x901A;&#x8FC7;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;&#x4F20;&#x53C2;</span>
            <span class="hljs-comment">// &#x7F3A;&#x70B9;&#xFF1A;&#x4E0D;&#x80FD;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;</span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">work, drink</span>) </span>{
                <span class="hljs-keyword">this</span>.work = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(work);
                }
                
                <span class="hljs-keyword">this</span>.drink = drink;
            }
            Parent.prototype.draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                alert(<span class="hljs-string">&quot;I can draw&quot;</span>);    
                
            }
            
            
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">work, drink, sex</span>) </span>{
                Parent.call(<span class="hljs-keyword">this</span>, work, drink);
                <span class="hljs-keyword">this</span>.sex = sex;
                
            }
            
            <span class="hljs-keyword">var</span> xiaoLi = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&apos;code&apos;</span>, <span class="hljs-string">&apos;beer&apos;</span>, <span class="hljs-string">&apos;male&apos;</span>);
            alert(xiaoLi.drink); <span class="hljs-comment">// code</span>
            xiaoLi.work(); <span class="hljs-comment">// beer</span>
            <span class="hljs-comment">// xiaoLi.draw(); //&#x6CA1;&#x6709;&#x7EE7;&#x627F;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x4F1A;&#x62A5;&#x9519;&#xFF1A;xiaoLi.draw() is not a function</span>
            <span class="hljs-built_in">console</span>.log(xiaoLi.sex); <span class="hljs-comment">// male</span>
 <span class="hljs-number">3.</span> &#x6DF7;&#x5408;&#x7EE7;&#x627F;&#xFF08;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x548C;&#x7C7B;&#x7EE7;&#x627F;&#xFF09;

            <span class="hljs-comment">// &#x6DF7;&#x5408;&#x7EE7;&#x627F;&#xFF08;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x548C;&#x7C7B;&#x7EE7;&#x627F;&#xFF08;&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x7EE7;&#x627F;&#xFF09;&#xFF09;</span>
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params">eat, sleep</span>) </span>{
                <span class="hljs-keyword">this</span>.eat = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;function 1&quot;</span> + eat);
                }
                <span class="hljs-keyword">this</span>.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;function 2&quot;</span> + sleep);
                }
            }
            
            Parent.prototype.other = <span class="hljs-string">&quot;work&quot;</span>;
            
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Child</span>(<span class="hljs-params">eat, sleep, age</span>) </span>{
                Parent.call(<span class="hljs-keyword">this</span>, eat, sleep);
                <span class="hljs-keyword">this</span>.age = age;
            }
            
            Child.prototype = <span class="hljs-keyword">new</span> Parent();
            <span class="hljs-keyword">var</span> xiaoLi = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">&quot;cake&quot;</span>, <span class="hljs-string">&quot;want to sleep&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>);
            xiaoLi.eat();
            xiaoLi.sleep();
            <span class="hljs-built_in">console</span>.log(xiaoLi.age);
            <span class="hljs-built_in">console</span>.log(xiaoLi.other);
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.&#x539F;&#x751F;ajax&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#xFF1F;

&#x7279;&#x70B9;&#xFF1A;
&#x5728;&#x4E0D;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x6574;&#x4E2A;&#x7F51;&#x9875;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5BF9;&#x9875;&#x9762;&#x5C40;&#x90E8;&#x8FDB;&#x884C;&#x5237;&#x65B0;&#x3002;
XMLHttpRequest&#x5BF9;&#x8C61;&#x662F;&#x5B9E;&#x73B0;ajax&#x7684;&#x57FA;&#x7840;,XMLHttpRequest&#x6709;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#xFF0C;&#x5E38;&#x7528;&#x7684;&#x6709;open(),send()&#x7B49;
ajax&#x8BF7;&#x6C42;&#x5171;&#x5305;&#x542B;&#x4E94;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;
1.&#x521B;&#x5EFA;XMLHttpRequest&#x5BF9;&#x8C61;(&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x5BF9;&#x8C61;)
2.&#x8BBE;&#x7F6E;HTTP&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;&#xFF08;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#xFF0C;url&#xFF0C;&#x662F;&#x5426;&#x5F02;&#x6B65;&#xFF09;
3.&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;HTTP&#x8BF7;&#x6C42;&#x72B6;&#x6001;&#x53D8;&#x5316;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
4.&#x53D1;&#x9001;HTTP&#x8BF7;&#x6C42;
5.&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;
6.&#x5C40;&#x90E8;&#x66F4;&#x65B0;&#x9875;&#x9762;
var xhr = new XMLHttpRequest();
xhr.open(&quot;POST&quot;, url, true);
xhr.setRequestHeader(&quot;Content-type&quot;, &quot;application/x-www-form-urlencoded&quot;);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 &amp;&amp; (xhr.status == 200 || xhr.status == 304)) {
        fn.call(this, xhr.responseText);
    }
};
xhr.send(data);
post&#x65B9;&#x6CD5;&#x4E00;&#x5B9A;&#x8981;&#x7528;setRequestHeader(&quot;header&quot;,&quot;value&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs accesslog"><code><span class="hljs-number">2</span>.&#x539F;&#x751F;ajax&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#xFF1F;

&#x7279;&#x70B9;&#xFF1A;
&#x5728;&#x4E0D;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x6574;&#x4E2A;&#x7F51;&#x9875;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5BF9;&#x9875;&#x9762;&#x5C40;&#x90E8;&#x8FDB;&#x884C;&#x5237;&#x65B0;&#x3002;
XMLHttpRequest&#x5BF9;&#x8C61;&#x662F;&#x5B9E;&#x73B0;ajax&#x7684;&#x57FA;&#x7840;,XMLHttpRequest&#x6709;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#xFF0C;&#x5E38;&#x7528;&#x7684;&#x6709;open(),send()&#x7B49;
ajax&#x8BF7;&#x6C42;&#x5171;&#x5305;&#x542B;&#x4E94;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;
<span class="hljs-number">1</span>.&#x521B;&#x5EFA;XMLHttpRequest&#x5BF9;&#x8C61;(&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x5BF9;&#x8C61;)
<span class="hljs-number">2</span>.&#x8BBE;&#x7F6E;HTTP&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;&#xFF08;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#xFF0C;url&#xFF0C;&#x662F;&#x5426;&#x5F02;&#x6B65;&#xFF09;
<span class="hljs-number">3</span>.&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;HTTP&#x8BF7;&#x6C42;&#x72B6;&#x6001;&#x53D8;&#x5316;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
<span class="hljs-number">4</span>.&#x53D1;&#x9001;HTTP&#x8BF7;&#x6C42;
<span class="hljs-number">5</span>.&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;
<span class="hljs-number">6</span>.&#x5C40;&#x90E8;&#x66F4;&#x65B0;&#x9875;&#x9762;
var xhr = new XMLHttpRequest();
xhr.open(<span class="hljs-string">&quot;<span class="hljs-keyword">POST</span>&quot;</span>, url, true);
xhr.setRequestHeader(<span class="hljs-string">&quot;Content-type&quot;</span>, <span class="hljs-string">&quot;application/x-www-form-urlencoded&quot;</span>);
xhr.onreadystatechange = function () {
    if (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; (xhr.status == <span class="hljs-number">200</span> || xhr.status == <span class="hljs-number">304</span>)) {
        fn.call(this, xhr.responseText);
    }
};
xhr.send(data);
post&#x65B9;&#x6CD5;&#x4E00;&#x5B9A;&#x8981;&#x7528;setRequestHeader(<span class="hljs-string">&quot;header&quot;</span>,<span class="hljs-string">&quot;value&quot;</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3.&#x4F5C;&#x7528;&#x57DF;
&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF1A;ES6&#x624D;&#x652F;&#x6301;&#xFF0C;&#x5728;{}&#x5927;&#x62EC;&#x53F7;&#x5185;&#x7684;&#x5C31;&#x662F;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;
(&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x51FA;&#x73B0;&#x89E3;&#x51B3;&#x4E86;&#xFF1A;for&#x5FAA;&#x73AF;&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x91CF;&#x9020;&#x6210;&#x7684;&#x5168;&#x5C40;&#x6C61;&#x67D3;;&#x4E0D;&#x7528;&#x518D;&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x6765;&#x4FDD;&#x5B58;&#x5FC5;&#x8981;&#x7684;&#x53D8;&#x91CF;&#x4E86;)
&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#xFF1A;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x5B9E;&#x73B0;&#x7684;
&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#xFF1A;&#x5728;&#x5916;&#x90E8;&#x58F0;&#x660E;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7528;var&#x5173;&#x952E;&#x5B57;&#x58F0;&#x660E;&#xFF0C;&#x5728;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x4E5F;&#x4E3A;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;

&#x6CE8;&#x610F;&#xFF1A;
&#x5728;es6&#x4E4B;&#x524D;&#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x6240;&#x4EE5;&#x5728;{}&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF08;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF09;
    for (var i = 1; i &lt;= 10; i++) {
        console.log (i); // outputs 1, 2, 3, 4, 5, 6, 7, 8, 9, 10;&#x200B;
    };
    &#x200B;
    &#x200B;// The variable i is a global variable and it is accessible in the following function with the last value it was assigned above &#x200B;
    &#x200B;function aNumber () {
    console.log(i);
    }
    &#x200B;
    &#x200B;// The variable i in the aNumber function below is the global variable i that was changed in the for loop above. Its last value was 11, set just before the for loop exited:&#x200B;
    aNumber ();  // 11&#x200B;
    
    &#x5173;&#x4E8E;es6&#x7684;let&#x548C;const:
    let&#x548C;const&#x6CA1;&#x6709;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x63D0;&#x5347;&#xFF1B;
    let&#x548C;const&#x4E0D;&#x5141;&#x8BB8;&#x5728;&#x76F8;&#x540C;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x91CD;&#x590D;&#x58F0;&#x660E;&#xFF1B;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">3.</span>&#x4F5C;&#x7528;&#x57DF;
&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#xFF1A;ES6&#x624D;&#x652F;&#x6301;&#xFF0C;&#x5728;{}&#x5927;&#x62EC;&#x53F7;&#x5185;&#x7684;&#x5C31;&#x662F;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;
(&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x51FA;&#x73B0;&#x89E3;&#x51B3;&#x4E86;&#xFF1A;<span class="hljs-keyword">for</span>&#x5FAA;&#x73AF;&#x5B9A;&#x4E49;&#x7684;&#x53D8;&#x91CF;&#x9020;&#x6210;&#x7684;&#x5168;&#x5C40;&#x6C61;&#x67D3;;&#x4E0D;&#x7528;&#x518D;&#x901A;&#x8FC7;&#x95ED;&#x5305;&#x6765;&#x4FDD;&#x5B58;&#x5FC5;&#x8981;&#x7684;&#x53D8;&#x91CF;&#x4E86;)
&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#xFF1A;&#x5728;&#x51FD;&#x6570;&#x4E2D;&#x5B9E;&#x73B0;&#x7684;
&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#xFF1A;&#x5728;&#x5916;&#x90E8;&#x58F0;&#x660E;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7528;<span class="hljs-keyword">var</span>&#x5173;&#x952E;&#x5B57;&#x58F0;&#x660E;&#xFF0C;&#x5728;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x4E5F;&#x4E3A;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;

&#x6CE8;&#x610F;&#xFF1A;
&#x5728;es6&#x4E4B;&#x524D;&#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x6240;&#x4EE5;&#x5728;{}&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF08;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF09;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">10</span>; i++) {
        <span class="hljs-built_in">console</span>.log (i); <span class="hljs-comment">// outputs 1, 2, 3, 4, 5, 6, 7, 8, 9, 10;&#x200B;</span>
    };
    &#x200B;
    &#x200B;<span class="hljs-comment">// The variable i is a global variable and it is accessible in the following function with the last value it was assigned above &#x200B;</span>
    &#x200B;<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aNumber</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i);
    }
    &#x200B;
    &#x200B;<span class="hljs-comment">// The variable i in the aNumber function below is the global variable i that was changed in the for loop above. Its last value was 11, set just before the for loop exited:&#x200B;</span>
    aNumber ();  <span class="hljs-comment">// 11&#x200B;</span>
    
    &#x5173;&#x4E8E;es6&#x7684;<span class="hljs-keyword">let</span>&#x548C;<span class="hljs-keyword">const</span>:
    <span class="hljs-keyword">let</span>&#x548C;<span class="hljs-keyword">const</span>&#x6CA1;&#x6709;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x7684;&#x63D0;&#x5347;&#xFF1B;
    <span class="hljs-keyword">let</span>&#x548C;<span class="hljs-keyword">const</span>&#x4E0D;&#x5141;&#x8BB8;&#x5728;&#x76F8;&#x540C;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x91CD;&#x590D;&#x58F0;&#x660E;&#xFF1B;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="4.&#x5982;&#x4F55;&#x7406;&#x89E3;&#x95ED;&#x5305;&#xFF1F;
&#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#x60C5;&#x666F;&#xFF1A;
&#x5728;A&#x51FD;&#x6570;&#x91CC;&#x8FD4;&#x56DE;B&#x51FD;&#x6570;&#xFF0C;B&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8C03;&#x7528;A&#x51FD;&#x6570;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#xFF1B;
&#x7279;&#x70B9;&#xFF1A;
1.&#x51FD;&#x6570;&#x5D4C;&#x5957;
2.&#x51FD;&#x6570;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x5F15;&#x7528;&#x5916;&#x90E8;&#x7684;&#x53C2;&#x6570;&#x548C;&#x53D8;&#x91CF;
3.&#x95ED;&#x5305;&#x51FD;&#x6570;&#x91CC;&#x7684;&#x53C2;&#x6570;&#x548C;&#x53D8;&#x91CF;&#x4E0D;&#x4F1A;&#x88AB;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x56DE;&#x6536;&#xFF08;&#x95ED;&#x5305;&#x4F1A;&#x4F7F;&#x53D8;&#x91CF;&#x59CB;&#x7EC8;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E0D;&#x5F53;&#x4F1A;&#x589E;&#x5927;&#x5185;&#x5B58;&#x6D88;&#x8017;&#xFF09;
&#x95ED;&#x5305;&#x7684;&#x597D;&#x5904;&#xFF1A;
1.&#x5E0C;&#x671B;&#x53D8;&#x91CF;&#x957F;&#x671F;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;
2.&#x907F;&#x514D;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x6C61;&#x67D3;
3.&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x7684;&#x5B58;&#x5728;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">4.</span>&#x5982;&#x4F55;&#x7406;&#x89E3;&#x95ED;&#x5305;&#xFF1F;
&#x6BD4;&#x8F83;&#x5E38;&#x7528;&#x7684;&#x60C5;&#x666F;&#xFF1A;
&#x5728;A&#x51FD;&#x6570;&#x91CC;&#x8FD4;&#x56DE;B&#x51FD;&#x6570;&#xFF0C;B&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8C03;&#x7528;A&#x51FD;&#x6570;&#x7684;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#xFF1B;
&#x7279;&#x70B9;&#xFF1A;
<span class="hljs-number">1.</span>&#x51FD;&#x6570;&#x5D4C;&#x5957;
<span class="hljs-number">2.</span>&#x51FD;&#x6570;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x5F15;&#x7528;&#x5916;&#x90E8;&#x7684;&#x53C2;&#x6570;&#x548C;&#x53D8;&#x91CF;
<span class="hljs-number">3.</span>&#x95ED;&#x5305;&#x51FD;&#x6570;&#x91CC;&#x7684;&#x53C2;&#x6570;&#x548C;&#x53D8;&#x91CF;&#x4E0D;&#x4F1A;&#x88AB;&#x5783;&#x573E;&#x56DE;&#x6536;&#x673A;&#x5236;&#x56DE;&#x6536;&#xFF08;&#x95ED;&#x5305;&#x4F1A;&#x4F7F;&#x53D8;&#x91CF;&#x59CB;&#x7EC8;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E0D;&#x5F53;&#x4F1A;&#x589E;&#x5927;&#x5185;&#x5B58;&#x6D88;&#x8017;&#xFF09;
&#x95ED;&#x5305;&#x7684;&#x597D;&#x5904;&#xFF1A;
<span class="hljs-number">1.</span>&#x5E0C;&#x671B;&#x53D8;&#x91CF;&#x957F;&#x671F;&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;
<span class="hljs-number">2.</span>&#x907F;&#x514D;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x6C61;&#x67D3;
<span class="hljs-number">3.</span>&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x7684;&#x5B58;&#x5728;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="5.&#x56DE;&#x8C03;&#x51FD;&#x6570;
&#x5B9A;&#x4E49;&#xFF1A;
&#x51FD;&#x6570;A&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;B&#xFF0C;&#x5728;&#x51FD;&#x6570;B&#x4E2D;&#x6267;&#x884C;&#x51FD;&#x6570;A&#xFF0C;&#x6B64;&#x65F6;&#x51FD;&#x6570;A&#x5C31;&#x53EB;&#x505A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x540D;&#x79F0;&#xFF08;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF09;&#xFF0C;&#x5C31;&#x53EB;&#x505A;&#x533F;&#x540D;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;

&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E0D;&#x4E00;&#x5B9A;&#x7528;&#x4E8E;&#x5F02;&#x6B65;&#xFF0C;&#x540C;&#x6B65;&#xFF08;&#x963B;&#x585E;&#xFF09;&#x573A;&#x666F;&#x4E0B;&#x4E5F;&#x4F1A;&#x7528;&#x5230;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x6BD4;&#x5982;&#x8BF4;&#x8981;&#x6C42;&#x5728;&#x6267;&#x884C;&#x5B8C;&#x67D0;&#x4E9B;&#x64CD;&#x4F5C;&#x540E;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;

&#x4E3E;&#x51E0;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
&#x540C;&#x6B65;(&#x963B;&#x585E;)&#x56DE;&#x8C03;&#xFF1A;
fn1&#x6267;&#x884C;&#x5B8C;&#x540E;&#x6267;&#x884C;fn2
&#x5728;&#x540C;&#x6B65;&#x573A;&#x666F;&#x4E0B;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6700;&#x540E;&#x6267;&#x884C;
&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#xFF1A;
ajax&#x8BF7;&#x6C42;
&#x5728;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x4E2D;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6709;&#x53EF;&#x80FD;&#x4E0D;&#x6267;&#x884C;&#xFF0C;&#x56E0;&#x4E3A;&#x65F6;&#x95F4;&#x6CA1;&#x6709;&#x88AB;&#x89E6;&#x53D1;&#x6216;&#x8005;&#x6761;&#x4EF6;&#x4E0D;&#x6EE1;&#x8DB3;

&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#xFF1A;
&#x52A8;&#x6001;&#x52A0;&#x8F7D;js&#x540E;&#xFF0C;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#xFF0C;ajax&#x8BF7;&#x6C42;&#x7B49;

&#x53E6;&#x5916;&#xFF0C;&#x6700;&#x597D;&#x4FDD;&#x8BC1;&#x56DE;&#x8C03;&#x5B58;&#x5728;&#x4E14;&#x5FC5;&#x987B;&#x662F;&#x51FD;&#x6570;&#x5F15;&#x7528;&#x6216;&#x8005;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF1A;
(callback &amp;&amp; typeof(callback) === &quot;function&quot;) &amp;&amp; callback();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-number">5.</span>&#x56DE;&#x8C03;&#x51FD;&#x6570;
&#x5B9A;&#x4E49;&#xFF1A;
&#x51FD;&#x6570;A&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x7ED9;&#x51FD;&#x6570;B&#xFF0C;&#x5728;&#x51FD;&#x6570;B&#x4E2D;&#x6267;&#x884C;&#x51FD;&#x6570;A&#xFF0C;&#x6B64;&#x65F6;&#x51FD;&#x6570;A&#x5C31;&#x53EB;&#x505A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x5982;&#x679C;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x540D;&#x79F0;&#xFF08;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF09;&#xFF0C;&#x5C31;&#x53EB;&#x505A;&#x533F;&#x540D;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;

&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E0D;&#x4E00;&#x5B9A;&#x7528;&#x4E8E;&#x5F02;&#x6B65;&#xFF0C;&#x540C;&#x6B65;&#xFF08;&#x963B;&#x585E;&#xFF09;&#x573A;&#x666F;&#x4E0B;&#x4E5F;&#x4F1A;&#x7528;&#x5230;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#x6BD4;&#x5982;&#x8BF4;&#x8981;&#x6C42;&#x5728;&#x6267;&#x884C;&#x5B8C;&#x67D0;&#x4E9B;&#x64CD;&#x4F5C;&#x540E;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;

&#x4E3E;&#x51E0;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
&#x540C;&#x6B65;<span class="hljs-comment">(&#x963B;&#x585E;)</span>&#x56DE;&#x8C03;&#xFF1A;
f<span class="hljs-symbol">n1</span>&#x6267;&#x884C;&#x5B8C;&#x540E;&#x6267;&#x884C;f<span class="hljs-symbol">n2</span>
&#x5728;&#x540C;&#x6B65;&#x573A;&#x666F;&#x4E0B;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6700;&#x540E;&#x6267;&#x884C;
&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#xFF1A;
ajax&#x8BF7;&#x6C42;
&#x5728;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x4E2D;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6709;&#x53EF;&#x80FD;&#x4E0D;&#x6267;&#x884C;&#xFF0C;&#x56E0;&#x4E3A;&#x65F6;&#x95F4;&#x6CA1;&#x6709;&#x88AB;&#x89E6;&#x53D1;&#x6216;&#x8005;&#x6761;&#x4EF6;&#x4E0D;&#x6EE1;&#x8DB3;

&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#xFF1A;
&#x52A8;&#x6001;&#x52A0;&#x8F7D;js&#x540E;&#xFF0C;&#x56FE;&#x7247;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#xFF0C;ajax&#x8BF7;&#x6C42;&#x7B49;

&#x53E6;&#x5916;&#xFF0C;&#x6700;&#x597D;&#x4FDD;&#x8BC1;&#x56DE;&#x8C03;&#x5B58;&#x5728;&#x4E14;&#x5FC5;&#x987B;&#x662F;&#x51FD;&#x6570;&#x5F15;&#x7528;&#x6216;&#x8005;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#xFF1A;
<span class="hljs-comment">(callback &amp;&amp; typeof(callback)</span> === <span class="hljs-string">&quot;function&quot;</span>) &amp;&amp; callback<span class="hljs-comment">()</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="6.es6&#x5E38;&#x7528;&#x65B0;&#x7279;&#x6027;&#xFF1A;

1.let&#x548C;const(&#x65B0;&#x7684;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x65B9;&#x5F0F;&#xFF0C;&#x5141;&#x8BB8;&#x628A;&#x53D8;&#x91CF;&#x4F5C;&#x7528;&#x57DF;&#x63A7;&#x5236;&#x5728;&#x5757;&#x7EA7;&#x91CC;&#x9762;)
2.&#x89E3;&#x6784;&#x8D4B;&#x503C;(&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#x90FD;&#x9002;&#x7528;)
3.promise
&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x6765;&#x8868;&#x793A;&#x5E76;&#x4F20;&#x9012;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x6700;&#x7EC8;&#x7ED3;&#x679C;
&#x4EA4;&#x4E92;&#x65B9;&#x5F0F;&#xFF1A;&#x5C06;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F20;&#x5165;then&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x6700;&#x7EC8;&#x7ED3;&#x679C;&#x6216;&#x51FA;&#x9519;&#x539F;&#x56E0;
&#x4EE5;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x4EE3;&#x66FF;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C42;&#x5C42;&#x5D4C;&#x5957;
//&#x751F;&#x6210;promise&#x5B9E;&#x4F8B;
var promise = new Promise(function(resolve, reject) {
 //...other code...
 if (/* &#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F; */){
   resolve(value);//resolve&#x51FD;&#x6570;&#x5C06;Promise&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4ECE;Pending&#x53D8;&#x4E3A;Resolved
 } else {
   reject(error);//reject&#x51FD;&#x6570;&#x5C06;Promise&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4ECE;Pending&#x53D8;&#x4E3A;Rejected
 }
});
//Promise&#x5B9E;&#x4F8B;&#x751F;&#x6210;&#x4EE5;&#x540E;&#xFF0C;&#x7528;then&#x65B9;&#x6CD5;&#x5206;&#x522B;&#x6307;&#x5B9A;Resolved&#x72B6;&#x6001;&#x548C;Reject&#x72B6;&#x6001;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;
promise.then(function(value) {
 // success
}, function(err) {
 // failure
});

jQuery.ajax()&#x65B9;&#x6CD5;&#x4E2D;&#x8FD0;&#x7528;promise&#xFF1A;
var http = {
    get: function(url) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: &apos;get&apos;,
                success: function(data) {
                    resolve(data);
                },
                error: function(xhr, statusText) {
                    reject(statusText);
                }
            });
        });
        return promise;
    }
};
http.get(&apos;data.php&apos;).then(function(data) {
    document.write(data);
}, function(err) {
    document.write(err);
});
&#x8FD9;&#x91CC;&#x662F;&#x83B7;&#x53D6;&#x7684;data&#x503C;&#xFF1A;
/* data.php&#x6587;&#x4EF6; */
&lt;?php
echo &apos;{&quot;name&quot;:&quot;Tom&quot;,&quot;age&quot;:&quot;22&quot;}&apos;;

4.&#x7BAD;&#x5934;&#x51FD;&#x6570;(&#x7B80;&#x5316;&#x51FD;&#x6570;&#x7684;&#x5199;&#x6CD5;&#x3001;&#x4FEE;&#x590D;this&#x7684;&#x6307;&#x5411;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x91CC;this&#x6307;&#x5411;&#x65B9;&#x6CD5;&#x539F;&#x6765;&#x7684;&#x4F5C;&#x7528;&#x57DF;,&#x5373;&#x65B9;&#x6CD5;&#x7ED1;&#x5B9A;&#x5728;&#x54EA;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;,this&#x5C31;&#x6307;&#x5411;&#x54EA;&#x4E2A;&#x5BF9;&#x8C61;)
5.&#x591A;&#x884C;&#x5B57;&#x7B26;&#x4E32;
6.&#x7C7B;(&#x65B9;&#x6CD5;&#x540D;&#x4E0D;&#x518D;&#x9700;&#x8981;function&#x5173;&#x952E;&#x5B57;)
7.&#x6A21;&#x677F;&#x5BF9;&#x8C61;(${xxx})
8.&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF08;&#x628A;&#x9ED8;&#x8BA4;&#x503C;&#x653E;&#x5728;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x91CC;&#xFF09;
9.iterable&#x7C7B;&#x578B;(Map):&#x5177;&#x6709;iterable&#x7C7B;&#x578B;&#x7684;&#x96C6;&#x5408;&#x90FD;&#x53EF;&#x4EE5;&#x7528;for...of&#x6765;&#x5FAA;&#x73AF;&#x904D;&#x5386;
&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
var m = new Map();
m.set(&quot;name&quot;, &quot;lysa&quot;);//&#x6DFB;&#x52A0;&#x65B0;&#x7684;key-value;
Map&#x5BF9;&#x8C61;&#x5BF9;&#x5E94;&#x5F88;&#x591A;&#x7684;&#x65B9;&#x6CD5;,&#x5982;.set(),.has(),.delete()
10.modules(&#x6A21;&#x5757;):
&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
&#x5728;a.js&#x4E2D;&#xFF0C;
export var aa=&quot;test&quot;;
export function bb(){
    do something;
}

&#x5728;b.js&#x4E2D;&#x5BFC;&#x5165;a.js&#x7684;&#x67D0;&#x4E2A;&#x53D8;&#x91CF;&#x5E76;&#x5F15;&#x7528;&#xFF1A;import {aa, bb} from &apos;a&apos;
console.log(aa);

&#x5728;b.js&#x4E2D;&#x5BFC;&#x5165;a.js&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x5E76;&#x5F15;&#x7528;&#xFF1A;import * as xxx from &apos;a&apos;
console.log(xxx.aa);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">6.</span>es6&#x5E38;&#x7528;&#x65B0;&#x7279;&#x6027;&#xFF1A;

<span class="hljs-number">1.</span><span class="hljs-keyword">let</span>&#x548C;<span class="hljs-keyword">const</span>(&#x65B0;&#x7684;&#x53D8;&#x91CF;&#x58F0;&#x660E;&#x65B9;&#x5F0F;&#xFF0C;&#x5141;&#x8BB8;&#x628A;&#x53D8;&#x91CF;&#x4F5C;&#x7528;&#x57DF;&#x63A7;&#x5236;&#x5728;&#x5757;&#x7EA7;&#x91CC;&#x9762;)
<span class="hljs-number">2.</span>&#x89E3;&#x6784;&#x8D4B;&#x503C;(&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;&#x90FD;&#x9002;&#x7528;)
<span class="hljs-number">3.</span>promise
&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x7528;&#x6765;&#x8868;&#x793A;&#x5E76;&#x4F20;&#x9012;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x6700;&#x7EC8;&#x7ED3;&#x679C;
&#x4EA4;&#x4E92;&#x65B9;&#x5F0F;&#xFF1A;&#x5C06;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F20;&#x5165;then&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x6700;&#x7EC8;&#x7ED3;&#x679C;&#x6216;&#x51FA;&#x9519;&#x539F;&#x56E0;
&#x4EE5;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x4EE3;&#x66FF;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C42;&#x5C42;&#x5D4C;&#x5957;
<span class="hljs-comment">//&#x751F;&#x6210;promise&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
 <span class="hljs-comment">//...other code...</span>
 <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* &#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F; */</span>){
   resolve(value);<span class="hljs-comment">//resolve&#x51FD;&#x6570;&#x5C06;Promise&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4ECE;Pending&#x53D8;&#x4E3A;Resolved</span>
 } <span class="hljs-keyword">else</span> {
   reject(error);<span class="hljs-comment">//reject&#x51FD;&#x6570;&#x5C06;Promise&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4ECE;Pending&#x53D8;&#x4E3A;Rejected</span>
 }
});
<span class="hljs-comment">//Promise&#x5B9E;&#x4F8B;&#x751F;&#x6210;&#x4EE5;&#x540E;&#xFF0C;&#x7528;then&#x65B9;&#x6CD5;&#x5206;&#x522B;&#x6307;&#x5B9A;Resolved&#x72B6;&#x6001;&#x548C;Reject&#x72B6;&#x6001;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</span>
promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
 <span class="hljs-comment">// success</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
 <span class="hljs-comment">// failure</span>
});

jQuery.ajax()&#x65B9;&#x6CD5;&#x4E2D;&#x8FD0;&#x7528;promise&#xFF1A;
<span class="hljs-keyword">var</span> http = {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url</span>) </span>{
        <span class="hljs-keyword">var</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
            $.ajax({
                <span class="hljs-attr">url</span>: url,
                <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;get&apos;</span>,
                <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                    resolve(data);
                },
                <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">xhr, statusText</span>) </span>{
                    reject(statusText);
                }
            });
        });
        <span class="hljs-keyword">return</span> promise;
    }
};
http.get(<span class="hljs-string">&apos;data.php&apos;</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">document</span>.write(data);
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">document</span>.write(err);
});
&#x8FD9;&#x91CC;&#x662F;&#x83B7;&#x53D6;&#x7684;data&#x503C;&#xFF1A;
<span class="hljs-comment">/* data.php&#x6587;&#x4EF6; */</span>
&lt;?php
echo <span class="hljs-string">&apos;{&quot;name&quot;:&quot;Tom&quot;,&quot;age&quot;:&quot;22&quot;}&apos;</span>;

<span class="hljs-number">4.</span>&#x7BAD;&#x5934;&#x51FD;&#x6570;(&#x7B80;&#x5316;&#x51FD;&#x6570;&#x7684;&#x5199;&#x6CD5;&#x3001;&#x4FEE;&#x590D;<span class="hljs-keyword">this</span>&#x7684;&#x6307;&#x5411;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x91CC;<span class="hljs-keyword">this</span>&#x6307;&#x5411;&#x65B9;&#x6CD5;&#x539F;&#x6765;&#x7684;&#x4F5C;&#x7528;&#x57DF;,&#x5373;&#x65B9;&#x6CD5;&#x7ED1;&#x5B9A;&#x5728;&#x54EA;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;,<span class="hljs-keyword">this</span>&#x5C31;&#x6307;&#x5411;&#x54EA;&#x4E2A;&#x5BF9;&#x8C61;)
<span class="hljs-number">5.</span>&#x591A;&#x884C;&#x5B57;&#x7B26;&#x4E32;
<span class="hljs-number">6.</span>&#x7C7B;(&#x65B9;&#x6CD5;&#x540D;&#x4E0D;&#x518D;&#x9700;&#x8981;<span class="hljs-function"><span class="hljs-keyword">function</span>&#x5173;&#x952E;&#x5B57;)
7.&#x6A21;&#x677F;&#x5BF9;&#x8C61;(<span class="hljs-params">${xxx}</span>)
8.&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF08;&#x628A;&#x9ED8;&#x8BA4;&#x503C;&#x653E;&#x5728;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x91CC;&#xFF09;
9.<span class="hljs-title">iterable</span>&#x7C7B;&#x578B;(<span class="hljs-params">Map</span>):&#x5177;&#x6709;<span class="hljs-title">iterable</span>&#x7C7B;&#x578B;&#x7684;&#x96C6;&#x5408;&#x90FD;&#x53EF;&#x4EE5;&#x7528;<span class="hljs-title">for</span>...<span class="hljs-title">of</span>&#x6765;&#x5FAA;&#x73AF;&#x904D;&#x5386;
&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
<span class="hljs-title">var</span> <span class="hljs-title">m</span> = <span class="hljs-title">new</span> <span class="hljs-title">Map</span>(<span class="hljs-params"></span>);
<span class="hljs-title">m</span>.<span class="hljs-title">set</span>(<span class="hljs-params"><span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;lysa&quot;</span></span>);//&#x6DFB;&#x52A0;&#x65B0;&#x7684;<span class="hljs-title">key</span>-<span class="hljs-title">value</span>;
<span class="hljs-title">Map</span>&#x5BF9;&#x8C61;&#x5BF9;&#x5E94;&#x5F88;&#x591A;&#x7684;&#x65B9;&#x6CD5;,&#x5982;.<span class="hljs-title">set</span>(<span class="hljs-params"></span>),.<span class="hljs-title">has</span>(<span class="hljs-params"></span>),.<span class="hljs-title">delete</span>(<span class="hljs-params"></span>)
10.<span class="hljs-title">modules</span>(<span class="hljs-params">&#x6A21;&#x5757;</span>):
&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
&#x5728;<span class="hljs-title">a</span>.<span class="hljs-title">js</span>&#x4E2D;&#xFF0C;
<span class="hljs-title">export</span> <span class="hljs-title">var</span> <span class="hljs-title">aa</span>=&quot;<span class="hljs-title">test</span>&quot;;
<span class="hljs-title">export</span> <span class="hljs-title">function</span> <span class="hljs-title">bb</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">do</span> something;
}

&#x5728;b.js&#x4E2D;&#x5BFC;&#x5165;a.js&#x7684;&#x67D0;&#x4E2A;&#x53D8;&#x91CF;&#x5E76;&#x5F15;&#x7528;&#xFF1A;<span class="hljs-keyword">import</span> {aa, bb} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;a&apos;</span>
<span class="hljs-built_in">console</span>.log(aa);

&#x5728;b.js&#x4E2D;&#x5BFC;&#x5165;a.js&#x6574;&#x4E2A;&#x6587;&#x4EF6;&#x5E76;&#x5F15;&#x7528;&#xFF1A;<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> xxx <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;a&apos;</span>
<span class="hljs-built_in">console</span>.log(xxx.aa);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="7.cookie&#x548C;web storage&#x7684;&#x533A;&#x522B;&#xFF1F;
1.&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x7684;&#x4EA4;&#x4E92;&#x4E0A;
cookie&#x59CB;&#x7EC8;&#x4F1A;&#x5728;http&#x540C;&#x6E90;&#x8BF7;&#x6C42;&#x5934;&#x4E0A;&#x643A;&#x5E26;(&#x5373;&#x4F7F;&#x4E0D;&#x9700;&#x8981;)&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x548C;&#x5BA2;&#x6237;&#x7AEF;&#x4E4B;&#x95F4;&#x4F20;&#x6765;&#x4F20;&#x53BB;
localStorage&#x548C;sessionStorage&#x4E0D;&#x4F1A;&#x4E3B;&#x52A8;&#x53D1;&#x9001;&#x7ED9;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4EC5;&#x4FDD;&#x5B58;&#x5728;&#x672C;&#x5730;
2.&#x50A8;&#x5B58;&#x5927;&#x5C0F;
cookie&#x7531;&#x4E8E;&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x5927;&#x5C0F;&#x5728;4KB&#x5DE6;&#x53F3;
localStorage&#x548C;sessionStorage&#x50A8;&#x5B58;&#x5927;&#x5C0F;&#x8FBE;5MB&#x6216;&#x4EE5;&#x4E0A;
3.&#x8FC7;&#x671F;&#x65F6;&#x95F4;
cookie&#x4E0E;&#x8BBE;&#x7F6E;&#x7684;&#x6709;&#x6548;&#x671F;&#x65F6;&#x95F4;&#x6709;&#x5173;
localStorage&#x5B58;&#x50A8;&#x6301;&#x4E45;&#x6570;&#x636E;&#xFF0C;&#x9664;&#x975E;&#x4E3B;&#x52A8;&#x5220;&#x9664;
sessionStorage&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5173;&#x95ED;&#x540E;&#x81EA;&#x52A8;&#x5220;&#x9664;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">7.</span>cookie&#x548C;web storage&#x7684;&#x533A;&#x522B;&#xFF1F;
<span class="hljs-number">1.</span>&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x7684;&#x4EA4;&#x4E92;&#x4E0A;
cookie&#x59CB;&#x7EC8;&#x4F1A;&#x5728;http&#x540C;&#x6E90;&#x8BF7;&#x6C42;&#x5934;&#x4E0A;&#x643A;&#x5E26;(&#x5373;&#x4F7F;&#x4E0D;&#x9700;&#x8981;)&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x548C;&#x5BA2;&#x6237;&#x7AEF;&#x4E4B;&#x95F4;&#x4F20;&#x6765;&#x4F20;&#x53BB;
localStorage&#x548C;sessionStorage&#x4E0D;&#x4F1A;&#x4E3B;&#x52A8;&#x53D1;&#x9001;&#x7ED9;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4EC5;&#x4FDD;&#x5B58;&#x5728;&#x672C;&#x5730;
<span class="hljs-number">2.</span>&#x50A8;&#x5B58;&#x5927;&#x5C0F;
cookie&#x7531;&#x4E8E;&#x4E0D;&#x540C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x5927;&#x5C0F;&#x5728;<span class="hljs-number">4</span>KB&#x5DE6;&#x53F3;
localStorage&#x548C;sessionStorage&#x50A8;&#x5B58;&#x5927;&#x5C0F;&#x8FBE;<span class="hljs-number">5</span>MB&#x6216;&#x4EE5;&#x4E0A;
<span class="hljs-number">3.</span>&#x8FC7;&#x671F;&#x65F6;&#x95F4;
cookie&#x4E0E;&#x8BBE;&#x7F6E;&#x7684;&#x6709;&#x6548;&#x671F;&#x65F6;&#x95F4;&#x6709;&#x5173;
localStorage&#x5B58;&#x50A8;&#x6301;&#x4E45;&#x6570;&#x636E;&#xFF0C;&#x9664;&#x975E;&#x4E3B;&#x52A8;&#x5220;&#x9664;
sessionStorage&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5173;&#x95ED;&#x540E;&#x81EA;&#x52A8;&#x5220;&#x9664;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="8.cookie&#x548C;session&#x7684;&#x533A;&#x522B;&#xFF1F;
cookie&#x6570;&#x636E;&#x5B58;&#x653E;&#x5728;&#x5BA2;&#x6237;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;session&#x5B58;&#x50A8;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0A;
&#x8003;&#x8651;&#x5230;&#x5B89;&#x5168;&#x6027;
&#x5EFA;&#x8BAE;&#xFF1A;
&#x5C06;&#x767B;&#x9646;&#x7B49;&#x91CD;&#x8981;&#x4FE1;&#x606F;&#x5B58;&#x653E;&#x4E3A;session
&#x5176;&#x5B83;&#x4FE1;&#x606F;&#x53EF;&#x4EE5;&#x653E;&#x5728;cookie&#x4E2D;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code>8<span class="hljs-selector-class">.cookie</span>&#x548C;<span class="hljs-selector-tag">session</span>&#x7684;&#x533A;&#x522B;&#xFF1F;
<span class="hljs-selector-tag">cookie</span>&#x6570;&#x636E;&#x5B58;&#x653E;&#x5728;&#x5BA2;&#x6237;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;<span class="hljs-selector-tag">session</span>&#x5B58;&#x50A8;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0A;
&#x8003;&#x8651;&#x5230;&#x5B89;&#x5168;&#x6027;
&#x5EFA;&#x8BAE;&#xFF1A;
&#x5C06;&#x767B;&#x9646;&#x7B49;&#x91CD;&#x8981;&#x4FE1;&#x606F;&#x5B58;&#x653E;&#x4E3A;<span class="hljs-selector-tag">session</span>
&#x5176;&#x5B83;&#x4FE1;&#x606F;&#x53EF;&#x4EE5;&#x653E;&#x5728;<span class="hljs-selector-tag">cookie</span>&#x4E2D;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="9.&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4ECE;&#x8F93;&#x5165;url&#x5230;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x90FD;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#xFF1F;
&#x7B80;&#x6D01;&#x7248;&#xFF1A;
1.&#x6D4F;&#x89C8;&#x5668;&#x6839;&#x636E;&#x8BF7;&#x6C42;&#x7684;url&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x8BF7;&#x6C42;
2.&#x670D;&#x52A1;&#x6C42;&#x5904;&#x7406;&#x5B8C;&#x6210;&#x540E;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x63A5;&#x6536;&#x6587;&#x4EF6;
3.&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x52A0;&#x8F7D;&#x5230;&#x7684;&#x8D44;&#x6E90;(html, css, js, image&#x7B49;)&#x8FDB;&#x884C;&#x8BED;&#x6CD5;&#x89E3;&#x6790;
4.&#x8F7D;&#x5165;&#x89E3;&#x6790;&#x5230;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x6E32;&#x67D3;&#x9875;&#x9762;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">9.</span>&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4ECE;&#x8F93;&#x5165;url&#x5230;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x90FD;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#xFF1F;
&#x7B80;&#x6D01;&#x7248;&#xFF1A;
<span class="hljs-number">1.</span>&#x6D4F;&#x89C8;&#x5668;&#x6839;&#x636E;&#x8BF7;&#x6C42;&#x7684;url&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x8BF7;&#x6C42;
<span class="hljs-number">2.</span>&#x670D;&#x52A1;&#x6C42;&#x5904;&#x7406;&#x5B8C;&#x6210;&#x540E;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x63A5;&#x6536;&#x6587;&#x4EF6;
<span class="hljs-number">3.</span>&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x52A0;&#x8F7D;&#x5230;&#x7684;&#x8D44;&#x6E90;(html, css, js, image&#x7B49;)&#x8FDB;&#x884C;&#x8BED;&#x6CD5;&#x89E3;&#x6790;
<span class="hljs-number">4.</span>&#x8F7D;&#x5165;&#x89E3;&#x6790;&#x5230;&#x7684;&#x8D44;&#x6E90;&#xFF0C;&#x6E32;&#x67D3;&#x9875;&#x9762;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="10.&#x4E8B;&#x4EF6;&#x59D4;&#x6D3E;
&#x4F18;&#x70B9;&#xFF1A;&#x51CF;&#x5C11;&#x4E8B;&#x4EF6;&#x6CE8;&#x518C;&#xFF1B;&#x7B80;&#x5316;DOM&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x76F8;&#x5E94;&#x4E8B;&#x4EF6;&#x7684;&#x66F4;&#x65B0;
    &lt;!DOCTYPE html&gt;
    &lt;html&gt;
        &lt;head&gt;
            &lt;meta charset=&quot;UTF-8&quot;&gt;
            &lt;title&gt;&lt;/title&gt;
        &lt;/head&gt;
        &lt;body&gt;
            &lt;ul id=&quot;lists&quot;&gt;&lt;/ul&gt;
        &lt;/body&gt;
        &lt;script&gt;
            var oUl=document.getElementById(&quot;lists&quot;);
            var fragment=document.createDocumentFragment();
            for(i=0;i&lt;10;i++){
                var oLi=document.createElement(&quot;li&quot;);
                oLi.innerHTML=&quot;this is an item&quot;;
                oLi.index=i;
                fragment.appendChild(oLi);
            }
            oUl.appendChild(fragment);
    //        oUl.onclick=function(ev){
    //            console.log(&quot;ev&#x662F;&#xFF1A;&quot;,ev)
    //            var src=ev.target||ev.srcElement;
    //            if(src.tagName===&quot;LI&quot;){
    //                console.log(src.index)
    //            }
    //        }
    
            oUl.addEventListener(&quot;click&quot;,function(ev){
                var src=ev.target||ev.srcElement;
                if(src.tagName===&quot;LI&quot;){
                    console.log(src.index);
                }
            },false)//&#x9ED8;&#x8BA4;false,&#x4E8B;&#x4EF6;&#x53E5;&#x67C4;&#x5728;&#x5192;&#x6CE1;&#x9636;&#x6BB5;&#x6267;&#x884C;
        &lt;/script&gt;
    &lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code>10.&#x4E8B;&#x4EF6;&#x59D4;&#x6D3E;
&#x4F18;&#x70B9;&#xFF1A;&#x51CF;&#x5C11;&#x4E8B;&#x4EF6;&#x6CE8;&#x518C;&#xFF1B;&#x7B80;&#x5316;DOM&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x76F8;&#x5E94;&#x4E8B;&#x4EF6;&#x7684;&#x66F4;&#x65B0;
    <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;lists&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
            <span class="hljs-keyword">var</span> oUl=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;lists&quot;</span>);
            <span class="hljs-keyword">var</span> fragment=<span class="hljs-built_in">document</span>.createDocumentFragment();
            <span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++){
                <span class="hljs-keyword">var</span> oLi=<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;li&quot;</span>);
                oLi.innerHTML=<span class="hljs-string">&quot;this is an item&quot;</span>;
                oLi.index=i;
                fragment.appendChild(oLi);
            }
            oUl.appendChild(fragment);
    <span class="hljs-comment">//        oUl.onclick=function(ev){</span>
    <span class="hljs-comment">//            console.log(&quot;ev&#x662F;&#xFF1A;&quot;,ev)</span>
    <span class="hljs-comment">//            var src=ev.target||ev.srcElement;</span>
    <span class="hljs-comment">//            if(src.tagName===&quot;LI&quot;){</span>
    <span class="hljs-comment">//                console.log(src.index)</span>
    <span class="hljs-comment">//            }</span>
    <span class="hljs-comment">//        }</span>
    
            oUl.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>)</span>{
                <span class="hljs-keyword">var</span> src=ev.target||ev.srcElement;
                <span class="hljs-keyword">if</span>(src.tagName===<span class="hljs-string">&quot;LI&quot;</span>){
                    <span class="hljs-built_in">console</span>.log(src.index);
                }
            },<span class="hljs-literal">false</span>)<span class="hljs-comment">//&#x9ED8;&#x8BA4;false,&#x4E8B;&#x4EF6;&#x53E5;&#x67C4;&#x5728;&#x5192;&#x6CE1;&#x9636;&#x6BB5;&#x6267;&#x884C;</span>
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="11.&#x62D6;&#x62FD;

    &lt;!DOCTYPE html&gt;
    &lt;html&gt;
        &lt;head&gt;
            &lt;meta charset=&quot;utf-8&quot; /&gt;
            &lt;title&gt;&lt;/title&gt;
            &lt;style&gt;
                body{margin:0;}
                .box{width:100px;height: 100px;background: red;position: relative;cursor: move;}
            &lt;/style&gt;
        &lt;/head&gt;
        &lt;body&gt;
            &lt;div class=&quot;box&quot;&gt;&lt;/div&gt;
            &lt;script&gt;
                var oBox=document.getElementsByClassName(&quot;box&quot;)[0];
                oBox.onmousedown=function(ev){
                    // &#x9F20;&#x6807;&#x6309;&#x4E0B;&#x7684;&#x72B6;&#x6001;
                    var ev=ev||window.event;//&#x517C;&#x5BB9;ie&#x6D4F;&#x89C8;&#x5668;
                    // &#x5143;&#x7D20;&#x7684;x&#x5750;&#x6807;&#x548C;y&#x5750;&#x6807;
                    var l_dis=oBox.offsetLeft;
                    var t_dis=oBox.offsetHeight;
                    
                    // 1.&#x8BB0;&#x5F55;&#x4E0B;&#x9F20;&#x6807;&#x7684;x&#x5750;&#x6807;&#x548C;y&#x5750;&#x6807;
                    // 2.&#x8BA1;&#x7B97;&#x9F20;&#x6807;&#x79BB;&#x5143;&#x7D20;&#x8FB9;&#x8DDD;&#x7684;&#x8DDD;&#x79BB;
                    var disX=ev.clientX-l_dis;
                    var disY=ev.clientY-t_dis;
                    var that=this;
                    
                    // &#x9F20;&#x6807;&#x79FB;&#x52A8;&#x7684;&#x72B6;&#x6001;
                    document.documentElement.onmousemove=function(ev){
                        var ev=ev||window.event;
                        // &#x8FD9;&#x91CC;&#x7684;ev.pageX&#x503C;&#x662F;&#x5426;&#x548C;ev.clientX&#x503C;&#x4E00;&#x81F4;&#xFF1F;
                        // &#x8BA1;&#x7B97;&#x5143;&#x7D20;&#x73B0;&#x5728;&#x7684;&#x4F4D;&#x7F6E;
                        let new_l_dis=ev.pageX-disX;
                        let new_t_dis=ev.pageY-disY;
                        
                        // &#x6700;&#x5927;&#x53EF;&#x62D6;&#x52A8;&#x7684;&#x8DDD;&#x79BB;
                        let max_l_dis=window.innerWidth-oBox.offsetWidth;
                        let max_t_dis=window.innerHeight-oBox.offsetHeight;
                        
                        // &#x8FB9;&#x754C;&#x95EE;&#x9898;
                        if(new_l_dis&lt;0){
                            new_l_dis=0;
                        }
                        if(new_l_dis&gt;max_l_dis){
                            new_l_dis=max_l_dis;
                        }
                        if(new_t_dis&lt;0){
                            new_t_dis=0;
                        }
                        if(new_t_dis&gt;max_t_dis){
                            new_t_dis=max_t_dis;
                        }
                        oBox.style.left=new_l_dis+&quot;px&quot;;
                        that.style.top=new_t_dis+&quot;px&quot;;
                        
                        document.documentElement.onmouseup=function(){//&#x9F20;&#x6807;&#x62AC;&#x8D77;&#xFF0C;&#x4E0D;&#x518D;&#x79FB;&#x52A8;
                            this.onmousemove=null;
                            this.onmouseup=null;
                        }
                    }
                }
            &lt;/script&gt;
        &lt;/body&gt;
    &lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code>11.&#x62D6;&#x62FD;

    <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
                <span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;}
                <span class="hljs-selector-class">.box</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;<span class="hljs-attribute">background</span>: red;<span class="hljs-attribute">position</span>: relative;<span class="hljs-attribute">cursor</span>: move;}
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                <span class="hljs-keyword">var</span> oBox=<span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&quot;box&quot;</span>)[<span class="hljs-number">0</span>];
                oBox.onmousedown=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>)</span>{
                    <span class="hljs-comment">// &#x9F20;&#x6807;&#x6309;&#x4E0B;&#x7684;&#x72B6;&#x6001;</span>
                    <span class="hljs-keyword">var</span> ev=ev||<span class="hljs-built_in">window</span>.event;<span class="hljs-comment">//&#x517C;&#x5BB9;ie&#x6D4F;&#x89C8;&#x5668;</span>
                    <span class="hljs-comment">// &#x5143;&#x7D20;&#x7684;x&#x5750;&#x6807;&#x548C;y&#x5750;&#x6807;</span>
                    <span class="hljs-keyword">var</span> l_dis=oBox.offsetLeft;
                    <span class="hljs-keyword">var</span> t_dis=oBox.offsetHeight;
                    
                    <span class="hljs-comment">// 1.&#x8BB0;&#x5F55;&#x4E0B;&#x9F20;&#x6807;&#x7684;x&#x5750;&#x6807;&#x548C;y&#x5750;&#x6807;</span>
                    <span class="hljs-comment">// 2.&#x8BA1;&#x7B97;&#x9F20;&#x6807;&#x79BB;&#x5143;&#x7D20;&#x8FB9;&#x8DDD;&#x7684;&#x8DDD;&#x79BB;</span>
                    <span class="hljs-keyword">var</span> disX=ev.clientX-l_dis;
                    <span class="hljs-keyword">var</span> disY=ev.clientY-t_dis;
                    <span class="hljs-keyword">var</span> that=<span class="hljs-keyword">this</span>;
                    
                    <span class="hljs-comment">// &#x9F20;&#x6807;&#x79FB;&#x52A8;&#x7684;&#x72B6;&#x6001;</span>
                    <span class="hljs-built_in">document</span>.documentElement.onmousemove=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>)</span>{
                        <span class="hljs-keyword">var</span> ev=ev||<span class="hljs-built_in">window</span>.event;
                        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684;ev.pageX&#x503C;&#x662F;&#x5426;&#x548C;ev.clientX&#x503C;&#x4E00;&#x81F4;&#xFF1F;</span>
                        <span class="hljs-comment">// &#x8BA1;&#x7B97;&#x5143;&#x7D20;&#x73B0;&#x5728;&#x7684;&#x4F4D;&#x7F6E;</span>
                        <span class="hljs-keyword">let</span> new_l_dis=ev.pageX-disX;
                        <span class="hljs-keyword">let</span> new_t_dis=ev.pageY-disY;
                        
                        <span class="hljs-comment">// &#x6700;&#x5927;&#x53EF;&#x62D6;&#x52A8;&#x7684;&#x8DDD;&#x79BB;</span>
                        <span class="hljs-keyword">let</span> max_l_dis=<span class="hljs-built_in">window</span>.innerWidth-oBox.offsetWidth;
                        <span class="hljs-keyword">let</span> max_t_dis=<span class="hljs-built_in">window</span>.innerHeight-oBox.offsetHeight;
                        
                        <span class="hljs-comment">// &#x8FB9;&#x754C;&#x95EE;&#x9898;</span>
                        <span class="hljs-keyword">if</span>(new_l_dis&lt;<span class="hljs-number">0</span>){
                            new_l_dis=<span class="hljs-number">0</span>;
                        }
                        <span class="hljs-keyword">if</span>(new_l_dis&gt;max_l_dis){
                            new_l_dis=max_l_dis;
                        }
                        <span class="hljs-keyword">if</span>(new_t_dis&lt;<span class="hljs-number">0</span>){
                            new_t_dis=<span class="hljs-number">0</span>;
                        }
                        <span class="hljs-keyword">if</span>(new_t_dis&gt;max_t_dis){
                            new_t_dis=max_t_dis;
                        }
                        oBox.style.left=new_l_dis+<span class="hljs-string">&quot;px&quot;</span>;
                        that.style.top=new_t_dis+<span class="hljs-string">&quot;px&quot;</span>;
                        
                        <span class="hljs-built_in">document</span>.documentElement.onmouseup=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//&#x9F20;&#x6807;&#x62AC;&#x8D77;&#xFF0C;&#x4E0D;&#x518D;&#x79FB;&#x52A8;</span>
                            <span class="hljs-keyword">this</span>.onmousemove=<span class="hljs-literal">null</span>;
                            <span class="hljs-keyword">this</span>.onmouseup=<span class="hljs-literal">null</span>;
                        }
                    }
                }
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="12.DOM&#x4E8B;&#x4EF6;
        DOM&#x4E8B;&#x4EF6;(3&#x4E2A;&#x7EA7;&#x522B;):DOM0;DOM2;DOM3;
        DOM0&#x7279;&#x70B9;:js&#x4E0E;html&#x5F3A;&#x8026;&#x5408;;&#x7ED1;&#x5B9A;&#x7684;&#x901F;&#x5EA6;&#x5FEB;,&#x4E0D;&#x9700;&#x8981;&#x64CD;&#x4F5C;dom,&#x53EF;&#x76F4;&#x63A5;&#x5728;&#x5143;&#x7D20;&#x4E0A;&#x7ED1;&#x5B9A;
        dom.onclick=function(){
            do something;
        }
        
        DOM2&#x7279;&#x70B9;:&#x53EF;&#x4EE5;&#x5728;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E2D;&#x6DFB;&#x52A0;&#x4E0D;&#x540C;&#x7684;&#x4E8B;&#x4EF6;,&#x4E8B;&#x4EF6;&#x4E0D;&#x4F1A;&#x8986;&#x76D6;;
        dom.addEventListener(&quot;click&quot;,function(){},false)
        
        DOM3&#x7279;&#x70B9;:&#x5728;dom2&#x7684;&#x57FA;&#x7840;&#x4E0A;,&#x6DFB;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;;&#x53EF;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;;
        var event=new Event(&quot;test&quot;);
        dom.addEventListener(&quot;test&quot;,function(){},false);
        setTimeout(function(){
            oBox.dispatchEvent(event);
        },2000)


        DOM&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x7684;&#x5177;&#x4F53;&#x6D41;&#x7A0B;:
        window-&gt;document-&gt;html-&gt;body-&gt;...-&gt;&#x76EE;&#x6807;&#x5143;&#x7D20;
        
        &#x4E8B;&#x4EF6;&#x6D41;:
        &#x6355;&#x83B7;-&gt;&#x76EE;&#x6807;&#x9636;&#x6BB5;-&gt;&#x5192;&#x6CE1;
        
        &#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x4E0A;&#x6CE8;&#x518C;&#x591A;&#x4E2A;&#x4E8B;&#x4EF6;:
        &#x89E3;&#x51B3;&#x54CD;&#x5E94;&#x4F18;&#x5148;&#x7EA7;:event.stopImmediatePropagation();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-number">12.</span>DOM&#x4E8B;&#x4EF6;
        DOM&#x4E8B;&#x4EF6;(<span class="hljs-number">3</span>&#x4E2A;&#x7EA7;&#x522B;):DOM0;DOM2;DOM3;
        DOM0&#x7279;&#x70B9;:js&#x4E0E;html&#x5F3A;&#x8026;&#x5408;;&#x7ED1;&#x5B9A;&#x7684;&#x901F;&#x5EA6;&#x5FEB;,&#x4E0D;&#x9700;&#x8981;&#x64CD;&#x4F5C;dom,&#x53EF;&#x76F4;&#x63A5;&#x5728;&#x5143;&#x7D20;&#x4E0A;&#x7ED1;&#x5B9A;
        dom.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">do</span> something;
        }
        
        DOM2&#x7279;&#x70B9;:&#x53EF;&#x4EE5;&#x5728;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x4E2D;&#x6DFB;&#x52A0;&#x4E0D;&#x540C;&#x7684;&#x4E8B;&#x4EF6;,&#x4E8B;&#x4EF6;&#x4E0D;&#x4F1A;&#x8986;&#x76D6;;
        dom.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{},<span class="hljs-keyword">false</span>)
        
        DOM3&#x7279;&#x70B9;:&#x5728;dom2&#x7684;&#x57FA;&#x7840;&#x4E0A;,&#x6DFB;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;;&#x53EF;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;;
        <span class="hljs-keyword">var</span> event=<span class="hljs-keyword">new</span> Event(<span class="hljs-string">&quot;test&quot;</span>);
        dom.addEventListener(<span class="hljs-string">&quot;test&quot;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{},<span class="hljs-keyword">false</span>);
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            oBox.dispatchEvent(event);
        },<span class="hljs-number">2000</span>)


        DOM&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x7684;&#x5177;&#x4F53;&#x6D41;&#x7A0B;:
        window-&gt;document-&gt;html-&gt;body-&gt;...-&gt;&#x76EE;&#x6807;&#x5143;&#x7D20;
        
        &#x4E8B;&#x4EF6;&#x6D41;:
        &#x6355;&#x83B7;-&gt;&#x76EE;&#x6807;&#x9636;&#x6BB5;-&gt;&#x5192;&#x6CE1;
        
        &#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x4E0A;&#x6CE8;&#x518C;&#x591A;&#x4E2A;&#x4E8B;&#x4EF6;:
        &#x89E3;&#x51B3;&#x54CD;&#x5E94;&#x4F18;&#x5148;&#x7EA7;:event.stopImmediatePropagation();</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="13.javascript&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x600E;&#x4E48;&#x5B9E;&#x4F8B;&#x5316;&#x8FD9;&#x4E2A;&#x7C7B;?

1.&#x6784;&#x9020;&#x51FD;&#x6570;&#x6CD5;
            // &#x6784;&#x9020;&#x51FD;&#x6570;&#x6CD5;(this + prototype)
            // &#x7528;new&#x5173;&#x952E;&#x5B57;&#x751F;&#x6210;&#x5B9E;&#x4F8B; &#x5BF9;&#x8C61;
            
            function Person(name, age) {
                this.name = name;
                this.age = age;
            }
            
            Person.prototype.info = function() {
                alert(this.name + this.age);                
            }
            
            var xiaoLi = new Person(&quot;&#x674E;&#x4F73;&quot;, 26);
            xiaoLi.info();

2.es6&#x8BED;&#x6CD5;&#x7CD6;
            // es6&#x8BED;&#x6CD5;&#x7CD6;
            // &#x7528;new&#x5173;&#x952E;&#x5B57;&#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;
            
            
            // &#x4F18;&#x70B9;&#xFF1A;&#x907F;&#x514D;&#x4E86;&#x4F7F;&#x7528;prototype
            class Person {
                  constructor(x, y) {
                      this.x = x;
                      this.y = y;
                  }
                  info() {
                      alert(this.x + this.y);
                  }
                  
            }
              
            var xiaoLi = new Person(&quot;&#x674E;&#x4F73;&quot;, 26);
            xiaoLi.info();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">13.</span>javascript&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x600E;&#x4E48;&#x5B9E;&#x4F8B;&#x5316;&#x8FD9;&#x4E2A;&#x7C7B;?

<span class="hljs-number">1.</span>&#x6784;&#x9020;&#x51FD;&#x6570;&#x6CD5;
            <span class="hljs-comment">// &#x6784;&#x9020;&#x51FD;&#x6570;&#x6CD5;(this + prototype)</span>
            <span class="hljs-comment">// &#x7528;new&#x5173;&#x952E;&#x5B57;&#x751F;&#x6210;&#x5B9E;&#x4F8B; &#x5BF9;&#x8C61;</span>
            
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
                <span class="hljs-keyword">this</span>.name = name;
                <span class="hljs-keyword">this</span>.age = age;
            }
            
            Person.prototype.info = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                alert(<span class="hljs-keyword">this</span>.name + <span class="hljs-keyword">this</span>.age);                
            }
            
            <span class="hljs-keyword">var</span> xiaoLi = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&quot;&#x674E;&#x4F73;&quot;</span>, <span class="hljs-number">26</span>);
            xiaoLi.info();

<span class="hljs-number">2.</span>es6&#x8BED;&#x6CD5;&#x7CD6;
            <span class="hljs-comment">// es6&#x8BED;&#x6CD5;&#x7CD6;</span>
            <span class="hljs-comment">// &#x7528;new&#x5173;&#x952E;&#x5B57;&#x751F;&#x6210;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;</span>
            
            
            <span class="hljs-comment">// &#x4F18;&#x70B9;&#xFF1A;&#x907F;&#x514D;&#x4E86;&#x4F7F;&#x7528;prototype</span>
            <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
                  <span class="hljs-keyword">constructor</span>(x, y) {
                      <span class="hljs-keyword">this</span>.x = x;
                      <span class="hljs-keyword">this</span>.y = y;
                  }
                  info() {
                      alert(<span class="hljs-keyword">this</span>.x + <span class="hljs-keyword">this</span>.y);
                  }
                  
            }
              
            <span class="hljs-keyword">var</span> xiaoLi = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">&quot;&#x674E;&#x4F73;&quot;</span>, <span class="hljs-number">26</span>);
            xiaoLi.info();</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="14.&#x89E3;&#x91CA;&#x4F5C;&#x7528;&#x57DF;&#x94FE;
1.&#x5168;&#x5C40;&#x51FD;&#x6570;&#x65E0;&#x6CD5;&#x67E5;&#x770B;&#x5C40;&#x90E8;&#x51FD;&#x6570;&#x7684;&#x7EC6;&#x8282;&#xFF0C;&#x5C40;&#x90E8;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5168;&#x5C40;&#x51FD;&#x6570;&#x7684;&#x5C5E;&#x6027;
2.&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5411;&#x4E0A;&#x5C42;&#x4E43;&#x81F3;&#x5168;&#x5C40;&#x5BFB;&#x627E;&#xFF0C;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x5C31;&#x662F;&#x4F5C;&#x7528;&#x57DF;&#x94FE;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">14.</span>&#x89E3;&#x91CA;&#x4F5C;&#x7528;&#x57DF;&#x94FE;
<span class="hljs-number">1.</span>&#x5168;&#x5C40;&#x51FD;&#x6570;&#x65E0;&#x6CD5;&#x67E5;&#x770B;&#x5C40;&#x90E8;&#x51FD;&#x6570;&#x7684;&#x7EC6;&#x8282;&#xFF0C;&#x5C40;&#x90E8;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5168;&#x5C40;&#x51FD;&#x6570;&#x7684;&#x5C5E;&#x6027;
<span class="hljs-number">2.</span>&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5411;&#x4E0A;&#x5C42;&#x4E43;&#x81F3;&#x5168;&#x5C40;&#x5BFB;&#x627E;&#xFF0C;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x5C31;&#x662F;&#x4F5C;&#x7528;&#x57DF;&#x94FE;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="15. .call()&#x548C;.apply()&#x7684;&#x533A;&#x522B;&#xFF1F;
.call()&#x548C;.apply()&#x662F;&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x90FD;&#x5305;&#x542B;&#x800C;&#x975E;&#x7EE7;&#x627F;&#x6765;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x4E8E;&#x6539;&#x53D8;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;
&#x4E24;&#x65B9;&#x6CD5;&#x4F5C;&#x7528;&#x76F8;&#x540C;
&#x533A;&#x522B;&#x5728;&#x63A5;&#x6536;&#x53C2;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#xFF0C;call()&#x8981;&#x6C42;&#x660E;&#x786E;&#x4F20;&#x5165;&#x6BCF;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF1B;

&#x6269;&#x5145;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
window.color = &quot;red&quot;;
var o = {color: &quot;blue&quot;};

function sayColor() {
    alert(this.color);
}

sayColor(); // red
sayColor.call(this); // red
sayColor.call(window); //red
sayColor.call(o); // blue
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-number">15.</span> .<span class="hljs-keyword">call</span>()&#x548C;.apply()&#x7684;&#x533A;&#x522B;&#xFF1F;
.<span class="hljs-keyword">call</span>()&#x548C;.apply()&#x662F;&#x6BCF;&#x4E2A;&#x51FD;&#x6570;&#x90FD;&#x5305;&#x542B;&#x800C;&#x975E;&#x7EE7;&#x627F;&#x6765;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x4E8E;&#x6539;&#x53D8;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;
&#x4E24;&#x65B9;&#x6CD5;&#x4F5C;&#x7528;&#x76F8;&#x540C;
&#x533A;&#x522B;&#x5728;&#x63A5;&#x6536;&#x53C2;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#xFF0C;<span class="hljs-keyword">call</span>()&#x8981;&#x6C42;&#x660E;&#x786E;&#x4F20;&#x5165;&#x6BCF;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF1B;

&#x6269;&#x5145;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
<span class="hljs-built_in">window</span>.color = <span class="hljs-string">&quot;red&quot;</span>;
var o = {color: <span class="hljs-string">&quot;blue&quot;</span>};

function sayColor() {
    alert(this.color);
}

sayColor(); <span class="hljs-comment">// red</span>
sayColor.<span class="hljs-keyword">call</span>(this); <span class="hljs-comment">// red</span>
sayColor.<span class="hljs-keyword">call</span>(<span class="hljs-built_in">window</span>); <span class="hljs-comment">//red</span>
sayColor.<span class="hljs-keyword">call</span>(o); <span class="hljs-comment">// blue</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="15.jsonp&#x7684;&#x539F;&#x7406;
&#x5229;&#x7528;script&#x6807;&#x7B7E;&#x53EF;&#x4EE5;&#x8DE8;&#x57DF;&#x8BBF;&#x95EE;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x52A8;&#x6001;&#x521B;&#x5EFA;script&#x6807;&#x7B7E;&#xFF0C;&#x7ED9;&#x6807;&#x7B7E;&#x8BBE;&#x7F6E;src&#x5C5E;&#x6027;&#x3002;
&#x901A;&#x8FC7;script&#x6807;&#x7B7E;&#x8BBF;&#x95EE;&#x8DE8;&#x57DF;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7684;callback&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x4E0D;&#x518D;&#x76F4;&#x63A5;&#x662F;json&#x6570;&#x636E;&#x3002;

&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x6B65;&#x9AA4;&#xFF1A;
&#x539F;&#x751F;&#xFF1A;
    $(document).ready(function(){
        var url = &quot;http://www.practice-zhao.com/student.php?id=1&amp;callback=jsonhandle&quot;;
        var obj = $(&apos;&lt;script&gt;&lt;\/script&gt;&apos;);
        obj.attr(&quot;src&quot;,url);
        $(&quot;body&quot;).append(obj);
    });
jquery:
    $(document).ready(function(){
        $.ajax({
            type : &quot;get&quot;,
            async: false,
            url : &quot;http://www.practice-zhao.com/student.php?id=1&quot;,
            dataType: &quot;jsonp&quot;,
            jsonp:&quot;callback&quot;, //&#x8BF7;&#x6C42;php&#x7684;&#x53C2;&#x6570;&#x540D;
            jsonpCallback: &quot;jsonhandle&quot;,//&#x8981;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
            success : function(data) {
                alert(&quot;age:&quot; + data.age + &quot;name:&quot; + data.name);
            }

        });
    });" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">15.</span>jsonp&#x7684;&#x539F;&#x7406;
&#x5229;&#x7528;script&#x6807;&#x7B7E;&#x53EF;&#x4EE5;&#x8DE8;&#x57DF;&#x8BBF;&#x95EE;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x52A8;&#x6001;&#x521B;&#x5EFA;script&#x6807;&#x7B7E;&#xFF0C;&#x7ED9;&#x6807;&#x7B7E;&#x8BBE;&#x7F6E;src&#x5C5E;&#x6027;&#x3002;
&#x901A;&#x8FC7;script&#x6807;&#x7B7E;&#x8BBF;&#x95EE;&#x8DE8;&#x57DF;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7684;callback&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x4E0D;&#x518D;&#x76F4;&#x63A5;&#x662F;json&#x6570;&#x636E;&#x3002;

&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x6B65;&#x9AA4;&#xFF1A;
&#x539F;&#x751F;&#xFF1A;
    $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> url = <span class="hljs-string">&quot;http://www.practice-zhao.com/student.php?id=1&amp;callback=jsonhandle&quot;</span>;
        <span class="hljs-keyword">var</span> obj = $(<span class="hljs-string">&apos;&lt;script&gt;&lt;\/script&gt;&apos;</span>);
        obj.attr(<span class="hljs-string">&quot;src&quot;</span>,url);
        $(<span class="hljs-string">&quot;body&quot;</span>).append(obj);
    });
jquery:
    $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $.ajax({
            <span class="hljs-attr">type</span> : <span class="hljs-string">&quot;get&quot;</span>,
            <span class="hljs-attr">async</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">url</span> : <span class="hljs-string">&quot;http://www.practice-zhao.com/student.php?id=1&quot;</span>,
            <span class="hljs-attr">dataType</span>: <span class="hljs-string">&quot;jsonp&quot;</span>,
            <span class="hljs-attr">jsonp</span>:<span class="hljs-string">&quot;callback&quot;</span>, <span class="hljs-comment">//&#x8BF7;&#x6C42;php&#x7684;&#x53C2;&#x6570;&#x540D;</span>
            jsonpCallback: <span class="hljs-string">&quot;jsonhandle&quot;</span>,<span class="hljs-comment">//&#x8981;&#x6267;&#x884C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
            success : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                alert(<span class="hljs-string">&quot;age:&quot;</span> + data.age + <span class="hljs-string">&quot;name:&quot;</span> + data.name);
            }

        });
    });</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="16.jquery&#x94FE;&#x5F0F;&#x8C03;&#x7528;
&#x539F;&#x7406;&#xFF1A;&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x4E0A;&#x6700;&#x540E;&#x52A0;&#x4E0A;return this;&#x8BED;&#x53E5;
&#x4F18;&#x70B9;&#xFF1A;&#x8282;&#x7701;&#x4EE3;&#x7801;&#xFF0C;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x66F4;&#x4F18;&#x96C5;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-number">16.</span>jquery&#x94FE;&#x5F0F;&#x8C03;&#x7528;
&#x539F;&#x7406;&#xFF1A;&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x4E0A;&#x6700;&#x540E;&#x52A0;&#x4E0A;<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;&#x8BED;&#x53E5;
&#x4F18;&#x70B9;&#xFF1A;&#x8282;&#x7701;&#x4EE3;&#x7801;&#xFF0C;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x66F4;&#x4F18;&#x96C5;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="17.&#x539F;&#x578B;&#x548C;&#x539F;&#x578B;&#x94FE;
&#x5148;&#x8BB0;&#x4E24;&#x4E2A;&#x5E72;&#x5DF4;&#x5DF4;&#x7684;&#x7ED3;&#x8BBA;&#xFF1A;
&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
function Person(name, age, job) {
 this.name = name;
 this.age = age;
 this.job = job;
 this.sayName = function() { alert(this.name) } 
}
var person1 = new Person(&apos;Zaxlct&apos;, 28, &apos;Software Engineer&apos;);
var person2 = new Person(&apos;Mick&apos;, 23, &apos;Doctor&apos;);
console.log(person1.constructor == Person); //true
console.log(person2.constructor == Person); //true
1.&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C5E;&#x6027;&#xFF08;constructor&#xFF09;&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;
var A = new Person();
Person.prototype = A;
2.&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF08;Person.prototype&#xFF09;&#x662F; &#x6784;&#x9020;&#x51FD;&#x6570;&#xFF08;Person&#xFF09;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-number">17</span>.&#x539F;&#x578B;&#x548C;&#x539F;&#x578B;&#x94FE;
&#x5148;&#x8BB0;&#x4E24;&#x4E2A;&#x5E72;&#x5DF4;&#x5DF4;&#x7684;&#x7ED3;&#x8BBA;&#xFF1A;
&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(<span class="hljs-keyword">name</span>, age, job)</span> <span class="hljs-comment">{
 this.name = name;
 this.age = age;
 this.job = job;
 this.sayName = function() { alert(this.name) }</span> 
}
<span class="hljs-title">var</span> <span class="hljs-title">person1</span> = <span class="hljs-title">new</span> <span class="hljs-title">Person</span><span class="hljs-params">(<span class="hljs-string">&apos;Zaxlct&apos;</span>, 28, <span class="hljs-string">&apos;Software Engineer&apos;</span>)</span>;</span>
<span class="hljs-keyword">var</span> person2 = new Person(<span class="hljs-string">&apos;Mick&apos;</span>, <span class="hljs-number">23</span>, <span class="hljs-string">&apos;Doctor&apos;</span>);
console.log(person1.<span class="hljs-keyword">constructor</span> == Person); <span class="hljs-comment">//true</span>
console.log(person2.<span class="hljs-keyword">constructor</span> == Person); <span class="hljs-comment">//true</span>
<span class="hljs-number">1</span>.&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C5E;&#x6027;&#xFF08;<span class="hljs-function"><span class="hljs-keyword">constructor</span>&#xFF09;&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;
<span class="hljs-title">var</span> <span class="hljs-title">A</span> = <span class="hljs-title">new</span> <span class="hljs-title">Person</span><span class="hljs-params">()</span>;</span>
Person.prototype = A;
<span class="hljs-number">2</span>.&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF08;Person.prototype&#xFF09;&#x662F; &#x6784;&#x9020;&#x51FD;&#x6570;&#xFF08;Person&#xFF09;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x3002;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点整理——javascript

## 原文链接
[https://segmentfault.com/a/1190000015082573](https://segmentfault.com/a/1190000015082573)

