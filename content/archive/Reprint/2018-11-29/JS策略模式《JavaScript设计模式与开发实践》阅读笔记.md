---
title: 'JS策略模式《JavaScript设计模式与开发实践》阅读笔记' 
date: 2018-11-29 2:30:08
hidden: true
slug: 4fxfwbgmoud
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x7684;&#x5B9A;&#x4E49;&#x662F;&#xFF1A;<strong>&#x5B9A;&#x4E49;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x7B97;&#x6CD5;&#xFF0C;&#x628A;&#x5B83;&#x4EEC;&#x4E00;&#x4E2A;&#x4E2A;&#x5C01;&#x88C5;&#x8D77;&#x6765;&#xFF0C;&#x5E76;&#x4E14;&#x662F;&#x5B83;&#x4EEC;&#x53EF;&#x4EE5;&#x76F8;&#x4E92;&#x66FF;&#x6362;</strong>&#x3002;</blockquote><ul><li>&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x591A;&#x91CD;&#x5224;&#x65AD;&#x6761;&#x4EF6;&#x3002;</li><li>&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x5F88;&#x597D;&#x7684;&#x4F53;&#x73B0;&#x4E86;&#x5F00;&#x653E;-&#x5C01;&#x95ED;&#x539F;&#x5219;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x4E2A;&#x7B97;&#x6CD5;&#xFF08;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF09;&#x5C01;&#x88C5;&#x5728;&#x4E00;&#x4E2A;&#x4E2A;&#x7B56;&#x7565;&#x7C7B;&#x4E2D;&#x3002;&#x4FBF;&#x4E8E;&#x5207;&#x6362;&#xFF0C;&#x7406;&#x89E3;&#xFF0C;&#x6269;&#x5C55;&#x3002;</li><li>&#x7B56;&#x7565;&#x4E2D;&#x7684;&#x5404;&#x79CD;&#x7B97;&#x6CD5;&#x53EF;&#x4EE5;&#x91CD;&#x590D;&#x5229;&#x7528;&#x5728;&#x7CFB;&#x7EDF;&#x7684;&#x5404;&#x4E2A;&#x5730;&#x65B9;&#xFF0C;&#x907F;&#x514D;&#x590D;&#x5236;&#x7C98;&#x8D34;&#x3002;</li><li>&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x5728;&#x7A0B;&#x5E8F;&#x4E2D;&#x6216;&#x591A;&#x6216;&#x5C11;&#x7684;&#x589E;&#x52A0;&#x4E86;&#x7B56;&#x7565;&#x7C7B;&#x3002;&#x4F46;&#x6BD4;&#x5806;&#x780C;&#x5728;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E2D;&#x8981;&#x6E05;&#x6670;&#x660E;&#x4E86;&#x3002;</li><li>&#x8FDD;&#x53CD;&#x6700;&#x5C11;&#x77E5;&#x8BC6;&#x539F;&#x5219;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x4E86;&#x89E3;&#x5404;&#x79CD;&#x7B56;&#x7565;&#x7C7B;&#xFF0C;&#x624D;&#x80FD;&#x66F4;&#x597D;&#x7684;&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x5E94;&#x7528;&#x3002;</li></ul><p><em>&#x6B64;&#x6587;&#x4EC5;&#x8BB0;&#x5F55;&#x672C;&#x4EBA;&#x9605;&#x8BFB;&#x300A;JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E0E;&#x5F00;&#x53D1;&#x5B9E;&#x8DF5;&#x300B;&#x8FD9;&#x4E2A;&#x672C;&#x65F6;&#x7684;&#x611F;&#x53D7;&#xFF0C;&#x611F;&#x8C22;&#x4F5C;&#x8005;&#x66FE;&#x63A2;&#x5199;&#x51FA;&#x8FD9;&#x4E48;&#x597D;&#x7684;&#x4E00;&#x672C;&#x4E66;&#x3002;&#x5982;&#x6709;&#x5192;&#x72AF;&#xFF0C;&#x5982;&#x6709;&#x9519;&#x8BEF;&#xFF0C;&#x8BF7;&#x8054;&#x7CFB;<a href="mailto:luogao_lg@sina.com">&#x672C;&#x4EBA;</a>&#x5904;&#x7406;&#x3002;</em></p><h2 id="articleHeader0">&#x7B80;&#x5355;&#x7684;&#x4E1A;&#x52A1;&#x573A;&#x666F;</h2><blockquote>&#x8BA1;&#x7B97;&#x5458;&#x5DE5;&#x5E74;&#x7EC8;&#x5956;&#x9700;&#x8981;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x5458;&#x5DE5;&#x7EE9;&#x6548;&#x8BA1;&#x7B97;&#x4E0D;&#x540C;&#x7684;&#x5956;&#x91D1;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x7EE9;&#x6548;&#x4E3A;S&#x7684;&#x4EBA;&#x5E74;&#x7EC8;&#x5956;&#x6709;4&#x500D;&#x5DE5;&#x8D44;&#x3002;&#x7EE9;&#x6548;A&#x7684;&#x4EBA;&#x5E74;&#x7EC8;&#x5956;&#x6709;3&#x500D;&#x5DE5;&#x8D44;&#xFF0C;&#x7EE9;&#x6548;B&#x7684;&#x4EBA;&#x6709;2&#x500D;&#x5DE5;&#x8D44;&#x3002;</blockquote><p>&#x7528;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var calculateBonus = function(performanceLevel, salary) {
    if (performanceLevel === &apos;S&apos;) {
        return salary * 4
    }
    if (performanceLevel === &apos;A&apos;) {
        return salary * 3
    } 
    if (performanceLevel === &apos;B&apos;) {
        return salary * 2
    }
}

calculateBonus(&apos;S&apos;, 2000) // 8000
calculateBonus(&apos;A&apos;, 2000) // 6000" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> calculateBonus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">performanceLevel, salary</span>) </span>{
    <span class="hljs-keyword">if</span> (performanceLevel === <span class="hljs-string">&apos;S&apos;</span>) {
        <span class="hljs-keyword">return</span> salary * <span class="hljs-number">4</span>
    }
    <span class="hljs-keyword">if</span> (performanceLevel === <span class="hljs-string">&apos;A&apos;</span>) {
        <span class="hljs-keyword">return</span> salary * <span class="hljs-number">3</span>
    } 
    <span class="hljs-keyword">if</span> (performanceLevel === <span class="hljs-string">&apos;B&apos;</span>) {
        <span class="hljs-keyword">return</span> salary * <span class="hljs-number">2</span>
    }
}

calculateBonus(<span class="hljs-string">&apos;S&apos;</span>, <span class="hljs-number">2000</span>) <span class="hljs-comment">// 8000</span>
calculateBonus(<span class="hljs-string">&apos;A&apos;</span>, <span class="hljs-number">2000</span>) <span class="hljs-comment">// 6000</span></code></pre><p>&#x5176;&#x5B9E;&#x4E0A;&#x9762;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x80FD;&#x5E94;&#x4ED8;&#x76EE;&#x524D;&#x7684;&#x573A;&#x666F;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5F53;&#x5956;&#x91D1;&#x7684;&#x8BC4;&#x5B9A;&#x9700;&#x8981;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x7EE9;&#x6548;C&#xFF0C;&#x6216;&#x8005;&#x6539;&#x53D8;&#x7EE9;&#x6548;A&#x7684;&#x8BA1;&#x7B97;&#x65B9;&#x5F0F;&#x3002;&#x6B64;&#x65F6;&#x9700;&#x8981;&#x66F4;&#x6539;&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;<code>calculateBonus</code>&#x65B9;&#x6CD5;&#x7684;&#x5185;&#x90E8;&#x7ED3;&#x6784;&#xFF0C;&#x5982;&#x6B64;&#x4E0B;&#x53BB;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x5C06;&#x53D8;&#x5F97;&#x5197;&#x6742;&#x3002;</p><p>&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E2D;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x70B9;&#x5C31;&#x662F;&#x5C06;&#x4E0D;&#x53D8;&#x548C;&#x53D8;&#x5206;&#x79BB;&#x51FA;&#x6765;&#x3002;&#x8FD9;&#x91CC;&#x53D8;&#x7684;&#x662F;&#x600E;&#x4E48;&#x7B97;&#x3002;&#x4E0D;&#x53D8;&#x7684;&#x662F;&#x6839;&#x636E;&#x4E00;&#x4E2A;&#x7EE9;&#x6548;&#x83B7;&#x5F97;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#x3002;&#x6240;&#x4EE5;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x91CD;&#x5199;&#xFF0C;&#x628A;&#x5404;&#x79CD;&#x7B97;&#x6CD5;&#x5C01;&#x88C5;&#x5728;&#x4E00;&#x4E2A;&#x4E2A;&#x7B56;&#x7565;&#x7C7B;&#x4E2D;(&#x4F20;&#x7EDF;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x6A21;&#x4EFF;)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var performanceS = function() {}
performanceS.prototype.calc = function(salary) {
    return salary * 4
}

var performanceA = function() {}
performanceA.prototype.calc = function(salary) {
    return salary * 3
}

var performanceB = function() {}
performanceB.prototype.calc = function(salary) {
    return salary * 2
}

//&#x5956;&#x91D1;&#x7C7B;Bonus
var Bonus = function() {
    this.salary = null //&#x539F;&#x59CB;&#x5DE5;&#x8D44;
    this.strategy = null // &#x7EE9;&#x6548;&#x7B49;&#x7EA7;&#x5BF9;&#x5E94;&#x7684;&#x7B56;&#x7565;&#x5BF9;&#x8C61;
}

Bonus.prototype.setSalary = function(salary) {
    this.salary = salary //&#x8BBE;&#x7F6E;&#x5DE5;&#x8D44;
}

Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy //&#x8BBE;&#x7F6E;&#x5458;&#x5DE5;&#x7EE9;&#x6548;&#x5BF9;&#x5E94;&#x7684;&#x7B56;&#x7565;&#x5BF9;&#x8C61;
}

Bonus.prototype.getBonus = function() { //&#x83B7;&#x53D6;&#x5956;&#x91D1;&#x6570;&#x989D;
    return this.strategy.calc(this.salary) //&#x628A;&#x8BA1;&#x7B97;&#x5956;&#x91D1;&#x7684;&#x64CD;&#x4F5C;&#x59D4;&#x6258;&#x4E2A;&#x5BF9;&#x5E94;&#x7684;&#x7B56;&#x7565;&#x5BF9;&#x8C61;
}

var bonus = new Bonus()
bonus.setSalary(10000)
bonus.setStrategy(new performanceA())

console.log(bonus.getBonus()) // 30000" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> performanceS = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
performanceS.prototype.calc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">salary</span>) </span>{
    <span class="hljs-keyword">return</span> salary * <span class="hljs-number">4</span>
}

<span class="hljs-keyword">var</span> performanceA = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
performanceA.prototype.calc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">salary</span>) </span>{
    <span class="hljs-keyword">return</span> salary * <span class="hljs-number">3</span>
}

<span class="hljs-keyword">var</span> performanceB = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
performanceB.prototype.calc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">salary</span>) </span>{
    <span class="hljs-keyword">return</span> salary * <span class="hljs-number">2</span>
}

<span class="hljs-comment">//&#x5956;&#x91D1;&#x7C7B;Bonus</span>
<span class="hljs-keyword">var</span> Bonus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.salary = <span class="hljs-literal">null</span> <span class="hljs-comment">//&#x539F;&#x59CB;&#x5DE5;&#x8D44;</span>
    <span class="hljs-keyword">this</span>.strategy = <span class="hljs-literal">null</span> <span class="hljs-comment">// &#x7EE9;&#x6548;&#x7B49;&#x7EA7;&#x5BF9;&#x5E94;&#x7684;&#x7B56;&#x7565;&#x5BF9;&#x8C61;</span>
}

Bonus.prototype.setSalary = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">salary</span>) </span>{
    <span class="hljs-keyword">this</span>.salary = salary <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x5DE5;&#x8D44;</span>
}

Bonus.prototype.setStrategy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">strategy</span>) </span>{
    <span class="hljs-keyword">this</span>.strategy = strategy <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x5458;&#x5DE5;&#x7EE9;&#x6548;&#x5BF9;&#x5E94;&#x7684;&#x7B56;&#x7565;&#x5BF9;&#x8C61;</span>
}

Bonus.prototype.getBonus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//&#x83B7;&#x53D6;&#x5956;&#x91D1;&#x6570;&#x989D;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.strategy.calc(<span class="hljs-keyword">this</span>.salary) <span class="hljs-comment">//&#x628A;&#x8BA1;&#x7B97;&#x5956;&#x91D1;&#x7684;&#x64CD;&#x4F5C;&#x59D4;&#x6258;&#x4E2A;&#x5BF9;&#x5E94;&#x7684;&#x7B56;&#x7565;&#x5BF9;&#x8C61;</span>
}

<span class="hljs-keyword">var</span> bonus = <span class="hljs-keyword">new</span> Bonus()
bonus.setSalary(<span class="hljs-number">10000</span>)
bonus.setStrategy(<span class="hljs-keyword">new</span> performanceA())

<span class="hljs-built_in">console</span>.log(bonus.getBonus()) <span class="hljs-comment">// 30000</span></code></pre><h2 id="articleHeader1">JavaScript&#x7248;&#x672C;&#x7684;&#x7B56;&#x7565;&#x6A21;&#x5F0F;</h2><p>&#x5728;JavaScript&#x4E2D;&#x53EF;&#x4EE5;&#x5C06;&#x4E00;&#x4E2A;&#x4E2A;&#x7B56;&#x7565;&#x7C7B;&#x5199;&#x6210;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x5C01;&#x88C5;&#x5728;&#x5BF9;&#x8C61;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8BA1;&#x7B97;&#x5956;&#x91D1;&#x7684;&#x4F8B;&#x5B50;
var strategies = {
    S: function(salary) {
        return salary * 4
    },
    A: function(salary) {
        return salary * 3
    },
    B: function(salary) {
        return salary * 2
    }
}

var calculateBonus = function(level, salary) {
    return strategies[level](salary)
}

console.log(calculateBonus(&apos;S&apos;, 10000)) // 40000
console.log(calculateBonus(&apos;S&apos;, 20000)) // 80000" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x8BA1;&#x7B97;&#x5956;&#x91D1;&#x7684;&#x4F8B;&#x5B50;</span>
<span class="hljs-keyword">var</span> strategies = {
    <span class="hljs-attr">S</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">salary</span>) </span>{
        <span class="hljs-keyword">return</span> salary * <span class="hljs-number">4</span>
    },
    <span class="hljs-attr">A</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">salary</span>) </span>{
        <span class="hljs-keyword">return</span> salary * <span class="hljs-number">3</span>
    },
    <span class="hljs-attr">B</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">salary</span>) </span>{
        <span class="hljs-keyword">return</span> salary * <span class="hljs-number">2</span>
    }
}

<span class="hljs-keyword">var</span> calculateBonus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">level, salary</span>) </span>{
    <span class="hljs-keyword">return</span> strategies[level](salary)
}

<span class="hljs-built_in">console</span>.log(calculateBonus(<span class="hljs-string">&apos;S&apos;</span>, <span class="hljs-number">10000</span>)) <span class="hljs-comment">// 40000</span>
<span class="hljs-built_in">console</span>.log(calculateBonus(<span class="hljs-string">&apos;S&apos;</span>, <span class="hljs-number">20000</span>)) <span class="hljs-comment">// 80000</span></code></pre><h2 id="articleHeader2">&#x66F4;&#x5E7F;&#x4E49;&#x7684;&#x201C;&#x7B97;&#x6CD5;&#x201D;</h2><p>&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x6307;&#x7684;&#x662F;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x7B97;&#x6CD5;&#xFF08;&#x7B56;&#x7565;&#xFF09;&#xFF0C;&#x5E76;&#x4E14;&#x628A;&#x5B83;&#x4EEC;&#x5C01;&#x88C5;&#x8D77;&#x6765;&#x3002;&#x8BA1;&#x7B97;&#x5956;&#x91D1;&#x7684;&#x5217;&#x5B50;&#x4E2D;&#x5C31;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E9B;&#x7B97;&#x6CD5;&#x3002;&#x5176;&#x5B9E;&#x4E16;&#x7EAA;&#x4E1A;&#x52A1;&#x4E2D;&#x4E5F;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x6765;&#x5C01;&#x88C5;&#x4E00;&#x4E9B;&#x201C;&#x4E1A;&#x52A1;&#x89C4;&#x5219;&#x201D;&#x3002;</p><h3 id="articleHeader3">&#x8868;&#x5355;&#x9A8C;&#x8BC1;</h3><p>&#x5728;Web&#x9879;&#x76EE;&#x4E2D;&#x5F80;&#x5F80;&#x6709;&#x5F88;&#x591A;&#x573A;&#x666F;&#x9700;&#x8981;&#x63D0;&#x4EA4;&#x8868;&#x5355;&#x3002;&#x524D;&#x7AEF;&#x5728;&#x628A;&#x6570;&#x636E;&#x63D0;&#x4EA4;&#x5230;&#x540E;&#x7AEF;&#x4E4B;&#x524D;&#xFF0C;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x4E00;&#x6CE2;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#xFF0C;&#x6765;&#x51CF;&#x5C11;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x3002;&#x5728;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x4E2D;&#x5F80;&#x5F80;&#x4F1A;&#x6709;&#x591A;&#x79CD;&#x6821;&#x9A8C;&#x89C4;&#x5219;&#xFF0C;&#x9875;&#x9762;&#x4E2D;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x591A;&#x4E2A;&#x8868;&#x5355;&#x8981;&#x8FDB;&#x884C;&#x9A8C;&#x8BC1;&#x3002;&#x6B64;&#x65F6;&#x53EF;&#x4EE5;&#x7528;&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form action=&quot;&quot; mothod=&quot;post&quot; id=&quot;registerForm&quot;&gt;
  &#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&#xFF1A; &lt;input type=&quot;text&quot; name=&quot;userName&quot;&gt;
  &#x8F93;&#x5165;&#x5BC6;&#x7801;&#xFF1A; &lt;input type=&quot;text&quot; name=&quot;password&quot;&gt;
  &#x8F93;&#x5165;&#x624B;&#x673A;&#x53F7;&#x7801;&#xFF1A;&lt;input type=&quot;text&quot; name=&quot;phoneNumber&quot;&gt;
  &lt;button&gt;&#x63D0;&#x4EA4;&lt;/button&gt;
&lt;/form&gt;
&lt;script&gt;
    var strategies = {
      isNonEmpty: function(value, errorMsg){
        if(value === &apos;&apos;){
          return errorMsg
        }
      },
      minLength: function(value, length, errorMsg){
        if(value.length &lt; length){
          return errorMsg
        }
      },
      isMobile: function(value, errorMsg){
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
          return errorMsg
        }
      }
    }

    // &#x5B9A;&#x4E49;Validator&#x7C7B;
    var Validator = function(){
      this.cache = []
    }

    Validator.prototype.add = function(dom, rule, errorMsg){
      var ary = rule.split(&apos;:&apos;)
      this.cache.push(function(){
        var strategy = ary.shift()
        ary.unshift(dom.value)
        ary.push(errorMsg)
        return strategies[ strategy ].apply(dom, ary)
      })
    }

    Validator.prototype.start = function(){
      for (var i = 0,validatorFunc;validatorFunc = this.cache[i++];){
        var msg = validatorFunc()
        if(msg){
          return msg
        }
      }
    }

    var validataFunc = function() {
      var validator = new Validator()
    // &#x6DFB;&#x52A0;&#x6821;&#x9A8C;&#x89C4;&#x5219;
      validator.add(registerForm.userName,&apos;isNonEmpty&apos;, &apos;&#x7528;&#x6237;&#x540D;&#x4E0D;&#x80FD;&#x4E3A;&#x7A7A;&apos;)
      validator.add(registerForm.password,&apos;minLength:6&apos;, &apos;&#x5BC6;&#x7801;&#x957F;&#x5EA6;&#x4E0D;&#x80FD;&#x5C11;&#x4E8E;6&#x4F4D;&apos;)
      validator.add(registerForm.phoneNumber,&apos;isMobile&apos;, &apos;&#x624B;&#x673A;&#x683C;&#x5F0F;&#x4E0D;&#x6B63;&#x786E;&apos;)

      var errorMsg = validator.start()
      return errorMsg
    }

    var registerForm = document.getElementById(&apos;registerForm&apos;)
    registerForm.onsubmit = function(){
      var errorMsg = validataFunc()
      if (errorMsg) {
        console.log(errorMsg)
        return false
      }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">&quot;&quot;</span> <span class="hljs-attr">mothod</span>=<span class="hljs-string">&quot;post&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;registerForm&quot;</span>&gt;</span>
  &#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&#xFF1A; <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;userName&quot;</span>&gt;</span>
  &#x8F93;&#x5165;&#x5BC6;&#x7801;&#xFF1A; <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;password&quot;</span>&gt;</span>
  &#x8F93;&#x5165;&#x624B;&#x673A;&#x53F7;&#x7801;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;phoneNumber&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>&#x63D0;&#x4EA4;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> strategies = {
      <span class="hljs-attr">isNonEmpty</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, errorMsg</span>)</span>{
        <span class="hljs-keyword">if</span>(value === <span class="hljs-string">&apos;&apos;</span>){
          <span class="hljs-keyword">return</span> errorMsg
        }
      },
      <span class="hljs-attr">minLength</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, length, errorMsg</span>)</span>{
        <span class="hljs-keyword">if</span>(value.length &lt; length){
          <span class="hljs-keyword">return</span> errorMsg
        }
      },
      <span class="hljs-attr">isMobile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, errorMsg</span>)</span>{
        <span class="hljs-keyword">if</span>(!<span class="hljs-regexp">/(^1[3|5|8][0-9]{9}$)/</span>.test(value)){
          <span class="hljs-keyword">return</span> errorMsg
        }
      }
    }

    <span class="hljs-comment">// &#x5B9A;&#x4E49;Validator&#x7C7B;</span>
    <span class="hljs-keyword">var</span> Validator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">this</span>.cache = []
    }

    Validator.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom, rule, errorMsg</span>)</span>{
      <span class="hljs-keyword">var</span> ary = rule.split(<span class="hljs-string">&apos;:&apos;</span>)
      <span class="hljs-keyword">this</span>.cache.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> strategy = ary.shift()
        ary.unshift(dom.value)
        ary.push(errorMsg)
        <span class="hljs-keyword">return</span> strategies[ strategy ].apply(dom, ary)
      })
    }

    Validator.prototype.start = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,validatorFunc;validatorFunc = <span class="hljs-keyword">this</span>.cache[i++];){
        <span class="hljs-keyword">var</span> msg = validatorFunc()
        <span class="hljs-keyword">if</span>(msg){
          <span class="hljs-keyword">return</span> msg
        }
      }
    }

    <span class="hljs-keyword">var</span> validataFunc = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> validator = <span class="hljs-keyword">new</span> Validator()
    <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x6821;&#x9A8C;&#x89C4;&#x5219;</span>
      validator.add(registerForm.userName,<span class="hljs-string">&apos;isNonEmpty&apos;</span>, <span class="hljs-string">&apos;&#x7528;&#x6237;&#x540D;&#x4E0D;&#x80FD;&#x4E3A;&#x7A7A;&apos;</span>)
      validator.add(registerForm.password,<span class="hljs-string">&apos;minLength:6&apos;</span>, <span class="hljs-string">&apos;&#x5BC6;&#x7801;&#x957F;&#x5EA6;&#x4E0D;&#x80FD;&#x5C11;&#x4E8E;6&#x4F4D;&apos;</span>)
      validator.add(registerForm.phoneNumber,<span class="hljs-string">&apos;isMobile&apos;</span>, <span class="hljs-string">&apos;&#x624B;&#x673A;&#x683C;&#x5F0F;&#x4E0D;&#x6B63;&#x786E;&apos;</span>)

      <span class="hljs-keyword">var</span> errorMsg = validator.start()
      <span class="hljs-keyword">return</span> errorMsg
    }

    <span class="hljs-keyword">var</span> registerForm = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;registerForm&apos;</span>)
    registerForm.onsubmit = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">var</span> errorMsg = validataFunc()
      <span class="hljs-keyword">if</span> (errorMsg) {
        <span class="hljs-built_in">console</span>.log(errorMsg)
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h2 id="articleHeader4">&#x603B;&#x7ED3;</h2><ul><li>&#x5728;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x5C01;&#x88C5;&#x5728;&#x4E00;&#x8D77;&#xFF0C;&#x7EC4;&#x6210;&#x81EA;&#x5DF1;&#x7684;&#x5DE5;&#x5177;&#x5E93;&#x3002;&#x51CF;&#x5C11;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x4EE3;&#x7801;&#x590D;&#x5236;&#x7C98;&#x8D34;&#x3002;</li><li>&#x611F;&#x89C9;&#x6572;&#x4EE3;&#x7801;&#x601D;&#x60F3;&#x66F4;&#x91CD;&#x8981;&#x5566;&#xFF0C;&#x8FD9;&#x91CC;&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x4F53;&#x73B0;&#x4E86;<strong>&#x5F00;&#x653E;-&#x5C01;&#x95ED;&#x539F;&#x5219;</strong>&#x964D;&#x4F4E;&#x4EE3;&#x7801;&#x7684;&#x8026;&#x5408;&#x5EA6;&#x3002;&#x8FD9;&#x4E9B;&#x7406;&#x5FF5;&#x90FD;&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x5728;&#x6572;&#x4EE3;&#x7801;&#x7684;&#x8DEF;&#x4E0A;&#x8981;&#x6162;&#x6162;&#x5B66;&#x4E60;&#x548C;&#x79EF;&#x7D2F;&#x7684;&#x3002;</li><li>&#x6572;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x4E0D;&#x80FD;&#x53EA;&#x6709;&#x81EA;&#x5DF1;&#x8BA4;&#x8BC6;&#x3002;&#x8981;&#x591A;&#x6CE8;&#x610F;&#x7EC6;&#x8282;&#xFF0C;&#x65F6;&#x523B;&#x53BB;&#x60F3;&#x54EA;&#x4E9B;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x518D;&#x591A;&#x5B8C;&#x5584;&#x3002;</li><li>&#x5F53;&#x7136;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;&#x4E1C;&#x897F;&#x90FD;&#x8981;&#x5206;&#x6765;&#x5206;&#x53BB;&#xFF0C;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x9700;&#x6C42;&#x4E3A;&#x4E86;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x800C;&#x53BB;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E5F;&#x662F;&#x4E0D;&#x53EF;&#x53D6;&#x7684;&#x3002;</li></ul><p><strong>love &amp; peace</strong></p><h2 id="articleHeader5">&#x53C2;&#x8003;</h2><p>&#x300A;JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E0E;&#x5F00;&#x53D1;&#x5B9E;&#x8DF5;&#x300B;&#x2014;&#x2014; &#x66FE;&#x63A2;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS策略模式《JavaScript设计模式与开发实践》阅读笔记

## 原文链接
[https://segmentfault.com/a/1190000015252321](https://segmentfault.com/a/1190000015252321)

