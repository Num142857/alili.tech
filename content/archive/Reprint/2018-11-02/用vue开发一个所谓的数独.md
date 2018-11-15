---
title: 用vue开发一个所谓的数独
hidden: true
categories: reprint
slug: 60c336ed
date: 2018-11-02 02:30:11
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2><p>&#x6700;&#x8FD1;&#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#x9875;&#x9762;&#xFF0C;&#x529F;&#x80FD;&#x6682;&#x65F6;&#x6CA1;&#x6709;&#x65B0;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x5C31;&#x5728;&#x60F3;&#x9996;&#x9875;&#x653E;&#x4EC0;&#x4E48;&#x4E1C;&#x897F;&#xFF0C;&#x6700;&#x8FD1;&#x6211;&#x60F3;&#x5230;&#x7684;&#x5C31;&#x662F;&#x653E;&#x4E2A;&#x6240;&#x8C13;&#x7684;&#x6570;&#x72EC;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x662F;&#x6240;&#x8C13;&#x7684;&#x6570;&#x72EC;&#xFF0C;&#x56E0;&#x4E3A;&#x89C4;&#x5219;&#x4E0D;&#x540C;&#x4E8E;&#x6807;&#x51C6;&#x7684;&#x6570;&#x72EC;&#xFF0C;&#x53EA;&#x8981;&#x6C42;&#x6BCF;&#x4E00;&#x884C;&#x6BCF;&#x4E00;&#x5217;&#x6570;&#x5B57;&#x4E0D;&#x4E00;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF01;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E5F;&#x662F;&#x57FA;&#x4E8E;vue&#x7684;&#xFF0C;&#x4EE3;&#x7801;&#x5206;&#x4EAB;&#x7ED9;&#x5927;&#x5BB6;&#x3002;&#x7ED9;&#x5927;&#x5BB6;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x8981;&#x8BA9;&#x5927;&#x5BB6;&#x76F4;&#x63A5;&#x62F7;&#x8D1D;&#x4EE3;&#x7801;&#xFF0C;&#x800C;&#x662F;&#x5E0C;&#x671B;&#x80FD;&#x8BA9;&#x5927;&#x5BB6;&#x5F53;&#x505A;&#x662F;&#x4E00;&#x4E2A;&#x7EC3;&#x624B;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x6216;&#x8005;&#x5B66;&#x4E60;&#x5230;&#x77E5;&#x8BC6;&#x3002;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x89C9;&#x5F97;&#x6211;&#x54EA;&#x91CC;&#x5199;&#x5F97;&#x4E0D;&#x597D;&#xFF0C;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF0C;&#x8BA9;&#x5927;&#x5BB6;&#x4EA4;&#x6D41;&#x610F;&#x89C1;&#xFF0C;&#x4E00;&#x8D77;&#x8FDB;&#x6B65;&#x3002;&#x4EE3;&#x7801;&#x4E0A;&#x4F20;&#x5230;github&#x4E86;&#xFF1A;&#x6709;&#x9700;&#x8981;&#x7684;&#x53EF;&#x4EE5;star&#x4E00;&#x4E0B;&#xFF01;<a href="https://github.com/chenhuiYj/demos/tree/master/vue-demos" rel="nofollow noreferrer" target="_blank">vue-demos</a></p><h2 id="articleHeader1">2.&#x8FD0;&#x884C;&#x6548;&#x679C;</h2><p><span class="img-wrap"><img data-src="/img/bVYQyf?w=697&amp;h=551" src="https://static.alili.tech/img/bVYQyf?w=697&amp;h=551" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">3.&#x5B9E;&#x73B0;&#x6B65;&#x9AA4;</h2><blockquote>&#x5B9E;&#x73B0;&#x6B65;&#x9AA4;&#xFF0C;&#x611F;&#x89C9;&#x8BF4;&#x5F97;&#x6709;&#x70B9;&#x7ED5;&#xFF0C;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x8FB9;&#x5199;&#x8FB9;&#x770B;&#x6587;&#x7AE0;&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x4F1A;&#x61F5;&#x3002;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x53BB;&#x770B;&#x6E90;&#x7801;&#xFF08;<a href="https://github.com/chenhuiYj/demos/blob/master/vue-demos/sudoku/sudoku.html" rel="nofollow noreferrer" target="_blank">sudoku</a>&#xFF09;&#xFF0C;&#x628A;&#x6E90;&#x7801;&#x770B;&#x61C2;&#xFF01;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x4E5F;&#x4E0D;&#x590D;&#x6742;&#xFF01;</blockquote><h3 id="articleHeader3">3-1.&#x51C6;&#x5907;&#x6570;&#x636E;&#x548C;&#x6392;&#x7248;</h3><p>&#x6392;&#x7248;&#x7684;<code>html+css</code>&#x4EE3;&#x7801;&#x6211;&#x4E0D;&#x591A;&#x8BF4;&#x4E86;&#xFF0C;&#x6392;&#x7248;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x8FD9;&#x4E2A;&#x76F8;&#x4FE1;&#x90FD;&#x96BE;&#x4E0D;&#x5012;&#x5927;&#x5BB6;&#x7684;&#x3002;&#x590D;&#x6742;&#x4E00;&#x70B9;&#x7684;&#x5C31;&#x662F;&#x6570;&#x636E;&#x7684;&#x4EA4;&#x4E92;&#xFF01;<br>&#x4E0B;&#x9762;&#x5F00;&#x59CB;&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x628A;&#x6570;&#x72EC;&#x7684;&#x6570;&#x636E;&#x5148;&#x51C6;&#x5907;&#x597D;&#xFF0C;&#x6570;&#x636E;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x5C31;&#x662F;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x7684;&#x6570;&#x636E;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVYQyY?w=400&amp;h=136" src="https://static.alili.tech/img/bVYQyY?w=400&amp;h=136" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x6392;&#x7248;&#x51FA;&#x6765;&#x7684;&#x6548;&#x679C;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVYQye?w=577&amp;h=559" src="https://static.alili.tech/img/bVYQye?w=577&amp;h=559" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><code>html</code>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;num-table&quot; @mouseleave=&quot;hoverCol=&apos;&apos;&quot; :class=&quot;{&apos;shake&apos;:isShake}&quot;&gt;
    &lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;
    &lt;div v-for=&quot;row,index in allNum&quot; class=&quot;num-row chearfix&quot;&gt;
        &lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;
        &lt;div v-for=&quot;num1,indexSub in row&quot; class=&quot;num-col&quot;&gt;
            {{allNumText[index][indexSub]}}
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;num-table&quot;</span> @mouseleave=<span class="hljs-string">&quot;hoverCol=&apos;&apos;&quot;</span> :<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;{&apos;shake&apos;:isShake}&quot;</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;row,index in allNum&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-row chearfix&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;num1,indexSub in row&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-col&quot;</span>&gt;</span>
            {{allNumText[index][indexSub]}}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>&#x4EE3;&#x7801;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted(){
    let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row = [], rowCol = 0;
    for (let i = 0, len = arr1.length; i &lt; len; i++) {
        row = Object.assign([], arr1);
        this.allNum.push(row);
        //&#x5220;&#x9664;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x5E76;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;
        rowCol = arr1.splice(0, 1)[0];
        //&#x5728;&#x6700;&#x540E;&#x9762;&#x63D2;&#x5165;&#x6570;&#x5B57;
        arr1.push(rowCol)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>mounted(){
    let arr1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>];
    let row = [], rowCol = <span class="hljs-number">0</span>;
    for (let i = <span class="hljs-number">0</span>, len = arr1.length; i &lt; len; i++) {
        row = Object.assign([], arr1);
        this.allNum.push(row);
        <span class="hljs-comment">//&#x5220;&#x9664;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x5E76;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;</span>
        rowCol = arr1.splice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
        <span class="hljs-comment">//&#x5728;&#x6700;&#x540E;&#x9762;&#x63D2;&#x5165;&#x6570;&#x5B57;</span>
        arr1.push(rowCol)
    }
}</code></pre><p>&#x5927;&#x5BB6;&#x4E5F;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#xFF0C;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x7684;&#x6BCF;&#x4E00;&#x884C;&#x548C;&#x6BCF;&#x4E00;&#x5217;&#x7684;&#x6570;&#x5B57;&#x90FD;&#x662F;&#x4E0D;&#x540C;&#x6837;&#x7684;&#xFF01;</p><h3 id="articleHeader4">3-2.&#x6253;&#x4E71;&#x884C;</h3><p>&#x4E4B;&#x540E;&#x5C31;&#x662F;&#x968F;&#x673A;&#x6253;&#x4E71;&#x987A;&#x5E8F;&#x4E86;&#xFF0C;&#x6253;&#x4E71;&#x987A;&#x5E8F;&#x8FD9;&#x4E2A;&#x5F97;&#x4FDD;&#x8BC1;&#x4E00;&#x4E2A;&#x524D;&#x63D0;&#xFF0C;&#x5C31;&#x662F;&#x4FDD;&#x8BC1;&#x6BCF;&#x4E00;&#x884C;&#x6BCF;&#x4E00;&#x5217;&#x7684;&#x6570;&#x5B57;&#x90FD;&#x4E0D;&#x4E00;&#x6837;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7C97;&#x66B4;&#x7684;&#x65B9;&#x6CD5;-&#x4EE5;&#x884C;&#x6216;&#x8005;&#x5217;&#x4E3A;&#x5355;&#x4F4D;&#xFF0C;&#x8FDB;&#x884C;&#x6253;&#x4E71;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x7B2C;&#x4E00;&#x884C;&#x548C;&#x7B2C;&#x4E09;&#x884C;&#x8FDB;&#x884C;&#x4F4D;&#x7F6E;&#x4EA4;&#x4E92;&#xFF0C;&#x7B2C;&#x4E00;&#x5217;&#x548C;&#x7B2C;&#x4E94;&#x5217;&#x8FDB;&#x884C;&#x4F4D;&#x7F6E;&#x7684;&#x4EA4;&#x6362;&#x3002;&#x4E0B;&#x9762;&#x8BF4;&#x4E0B;&#x4EE5;&#x884C;&#x4E3A;&#x5355;&#x4F4D;&#x7684;&#x6253;&#x4E71;&#x987A;&#x5E8F;&#xFF01;<br>&#x884C;&#x7684;&#x6253;&#x4E71;&#xFF0C;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x968F;&#x673A;&#x6253;&#x4E71;&#x6570;&#x7EC4;&#x800C;&#x5DF2;&#xFF01;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x641E;&#x5B9A;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.allNum.sort((n1, n2) =&gt; Math.random() - 0.5);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.allNum.sort(<span class="hljs-function"><span class="hljs-params">(n1, n2)</span> =&gt;</span> Math.random() - <span class="hljs-number">0.5</span>);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVYQSG?w=612&amp;h=576" src="https://static.alili.tech/img/bVYQSG?w=612&amp;h=576" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader5">3-3.&#x6253;&#x4E71;&#x5217;</h3><p>&#x884C;&#x6253;&#x4E71;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4EE5;&#x5217;&#x4E3A;&#x5355;&#x4F4D;&#x7684;&#x6253;&#x4E71;&#xFF0C;&#x8FD9;&#x4E2A;&#x7A0D;&#x5FAE;&#x590D;&#x6742;&#x4E00;&#x70B9;&#x3002;<br>&#x5927;&#x5BB6;&#x60F3;&#x4E0B;&#xFF0C;&#x6BD4;&#x5982;&#x7B2C;&#x4E8C;&#x5217;&#x662F;&#x7B2C;&#x4E94;&#x5217;&#x7684;&#x503C;&#x8FDB;&#x884C;&#x4EA4;&#x6362;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x683C;&#x5B50;&#x7684;&#x503C;&#x548C;&#x7B2C;&#x4E94;&#x4E2A;&#x683C;&#x5B50;&#x7684;&#x503C;&#x8FDB;&#x884C;&#x4EA4;&#x6362;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x9700;&#x8981;&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;&#xFF01;&#x6765;&#x8FDB;&#x884C;&#x4EA4;&#x6362;&#xFF0C;&#x81F3;&#x4E8E;&#x524D;&#x9762;&#x8BF4;&#x7684;&#x7B2C;&#x4E8C;&#x5217;&#x548C;&#x7B2C;&#x4E94;&#x5217;&#x7684;&#x8FD9;&#x4E2A;&#x5217;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#xFF01;<br>&#x4E0B;&#x9762;&#x770B;&#x4EE3;&#x7801;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x968F;&#x673A;&#x83B7;&#x53D6;&#x4E24;&#x5217;&#x7684;&#x7D22;&#x5F15;
function randomText() {
    let rondomIndex = 0, rondomIndexAfter = 0;
    //&#x83B7;&#x53D6;&#x7B2C;&#x4E00;&#x5217;&#x7684;&#x7D22;&#x5F15;
    rondomIndex = Math.floor(Math.random() * 9);
    function randomDo() {
        rondomIndexAfter = Math.floor(Math.random() * 9);
        //&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x5217;&#x548C;&#x7B2C;&#x4E8C;&#x5217;&#x7D22;&#x5F15;&#x4E00;&#x6837;&#xFF0C;&#x7B2C;&#x4E8C;&#x5217;&#x7684;&#x7D22;&#x5F15;&#x518D;&#x6B21;&#x91CD;&#x65B0;&#x968F;&#x673A;&#x83B7;&#x53D6;
        if (rondomIndexAfter === rondomIndex) {
            randomDo();
        }
    }

    randomDo();
    //&#x8FD4;&#x56DE;&#x4E24;&#x5217;&#x7684;&#x7D22;&#x5F15;
    return [rondomIndex, rondomIndexAfter]
}

//&#x6253;&#x4E71;&#x5217;
let randomArr = [], nowValue = 0;
//&#x540C;&#x6837;&#x904D;&#x5386;9&#x6B21;
for (let i = 0; i &lt; 9; i++) {
    randomArr = Object.assign([], randomText());
    //&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;&#xFF0C;&#x7ED9;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E24;&#x5217;&#x4EA4;&#x6362;&#x503C;
    for (let j = 0, len = this.allNum.length; j &lt; len; j++) {
        //&#x968F;&#x673A;&#x4E24;&#x5217;&#x4EA4;&#x6362;&#x503C;
        nowValue = this.allNum[j][randomArr[0]];
        this.allNum[j][randomArr[0]] = this.allNum[j][randomArr[1]];
        this.allNum[j][randomArr[1]] = nowValue;
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x968F;&#x673A;&#x83B7;&#x53D6;&#x4E24;&#x5217;&#x7684;&#x7D22;&#x5F15;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomText</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> rondomIndex = <span class="hljs-number">0</span>, rondomIndexAfter = <span class="hljs-number">0</span>;
    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x7B2C;&#x4E00;&#x5217;&#x7684;&#x7D22;&#x5F15;</span>
    rondomIndex = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">9</span>);
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomDo</span>(<span class="hljs-params"></span>) </span>{
        rondomIndexAfter = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">9</span>);
        <span class="hljs-comment">//&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x5217;&#x548C;&#x7B2C;&#x4E8C;&#x5217;&#x7D22;&#x5F15;&#x4E00;&#x6837;&#xFF0C;&#x7B2C;&#x4E8C;&#x5217;&#x7684;&#x7D22;&#x5F15;&#x518D;&#x6B21;&#x91CD;&#x65B0;&#x968F;&#x673A;&#x83B7;&#x53D6;</span>
        <span class="hljs-keyword">if</span> (rondomIndexAfter === rondomIndex) {
            randomDo();
        }
    }

    randomDo();
    <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x4E24;&#x5217;&#x7684;&#x7D22;&#x5F15;</span>
    <span class="hljs-keyword">return</span> [rondomIndex, rondomIndexAfter]
}

<span class="hljs-comment">//&#x6253;&#x4E71;&#x5217;</span>
<span class="hljs-keyword">let</span> randomArr = [], nowValue = <span class="hljs-number">0</span>;
<span class="hljs-comment">//&#x540C;&#x6837;&#x904D;&#x5386;9&#x6B21;</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">9</span>; i++) {
    randomArr = <span class="hljs-built_in">Object</span>.assign([], randomText());
    <span class="hljs-comment">//&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;&#xFF0C;&#x7ED9;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E24;&#x5217;&#x4EA4;&#x6362;&#x503C;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>, len = <span class="hljs-keyword">this</span>.allNum.length; j &lt; len; j++) {
        <span class="hljs-comment">//&#x968F;&#x673A;&#x4E24;&#x5217;&#x4EA4;&#x6362;&#x503C;</span>
        nowValue = <span class="hljs-keyword">this</span>.allNum[j][randomArr[<span class="hljs-number">0</span>]];
        <span class="hljs-keyword">this</span>.allNum[j][randomArr[<span class="hljs-number">0</span>]] = <span class="hljs-keyword">this</span>.allNum[j][randomArr[<span class="hljs-number">1</span>]];
        <span class="hljs-keyword">this</span>.allNum[j][randomArr[<span class="hljs-number">1</span>]] = nowValue;
    }
}
</code></pre><p><span class="img-wrap"><img data-src="/img/bVYQX1?w=602&amp;h=565" src="https://static.alili.tech/img/bVYQX1?w=602&amp;h=565" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader6">3-3.&#x968F;&#x673A;&#x638F;&#x7A7A;&#x5355;&#x5143;&#x683C;</h3><p>&#x638F;&#x7A7A;&#x5355;&#x5143;&#x683C;&#x5C31;&#x662F;&#x628A;&#x4E00;&#x4E9B;&#x683C;&#x5B50;&#x968F;&#x673A;&#x8BBE;&#x7A7A;&#xFF0C;&#x7136;&#x540E;&#x8BA9;&#x73A9;&#x6570;&#x72EC;&#x7684;&#x4EBA;&#x3002;&#x628A;&#x8FD9;&#x4E9B;&#x5355;&#x5143;&#x683C;&#x7ED9;&#x586B;&#x4E0A;&#xFF01;<br>&#x9700;&#x6C42;&#xFF0C;&#x6211;&#x73B0;&#x5728;&#x5B9E;&#x73B0;&#x7684;&#x5C31;&#x662F;&#xFF0C;&#x6BCF;&#x4E00;&#x884C;&#x6709;&#x628A;&#x4E24;&#x4E2A;&#x683C;&#x5B50;&#x8BBE;&#x7A7A;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x7684;&#x505A;&#x6CD5;&#x662F;&#xFF0C;&#x628A;&#x6BCF;&#x4E00;&#x4E2A;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;&#x5148;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x4ECE;&#x8BB0;&#x5F55;&#x7684;&#x5750;&#x6807;&#x91CC;&#x9762;&#x968F;&#x673A;&#x83B7;&#x53D6;&#x5750;&#x6807;&#xFF0C;&#x7528;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x5750;&#x6807;&#xFF0C;&#x8FDB;&#x884C;&#x8BBE;&#x7A7A;&#xFF01;<br>&#x9996;&#x5148;&#xFF0C;&#x83B7;&#x53D6;&#x6240;&#x6709;&#x70B9;&#x7684;&#x5750;&#x6807;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x8BB0;&#x5F55;&#x6240;&#x6709;&#x5750;&#x6807;
let rowText = &apos;&apos;, arrText = []
for (let i = 0; i &lt; 9; i++) {
    rowText = &apos;&apos;
    for (let j = 0; j &lt; 9; j++) {
        rowText += i + &apos;-&apos; + j + &apos;,&apos;;
    }
    arrText.push(rowText.substr(0, rowText.length - 1))
}
console.log(arrText);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x8BB0;&#x5F55;&#x6240;&#x6709;&#x5750;&#x6807;</span>
<span class="hljs-keyword">let</span> rowText = <span class="hljs-string">&apos;&apos;</span>, arrText = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">9</span>; i++) {
    rowText = <span class="hljs-string">&apos;&apos;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">9</span>; j++) {
        rowText += i + <span class="hljs-string">&apos;-&apos;</span> + j + <span class="hljs-string">&apos;,&apos;</span>;
    }
    arrText.push(rowText.substr(<span class="hljs-number">0</span>, rowText.length - <span class="hljs-number">1</span>))
}
<span class="hljs-built_in">console</span>.log(arrText);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVYQ7K?w=328&amp;h=137" src="https://static.alili.tech/img/bVYQ7K?w=328&amp;h=137" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x770B;&#x5230;&#x8FD9;&#x4E2A;&#x5750;&#x6807;&#xFF0C;&#x5927;&#x5BB6;&#x5F88;&#x5BB9;&#x6613;&#x7684;&#x77E5;&#x9053;&#xFF0C;&#x6570;&#x7EC4;&#x7684;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5C31;&#x662F;&#x7B2C;&#x4E00;&#x884C;&#xFF0C;&#x2018;<code>0-0</code>&#x2019;&#x5C31;&#x662F;&#x7B2C;&#x4E00;&#x884C;&#x7B2C;&#x4E00;&#x4E2A;&#x683C;&#x5B50;&#x3002;&#x6570;&#x7EC4;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5C31;&#x662F;&#x6700;&#x540E;&#x4E00;&#x884C;&#xFF0C;&#x2018;<code>8-8</code>&#x2019;&#x5C31;&#x662F;&#x6700;&#x540E;&#x4E00;&#x884C;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x683C;&#x5B50;&#xFF0C;&#x5176;&#x4ED6;&#x5982;&#x6B64;&#x7C7B;&#x63A8;&#xFF01;<br>&#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x968F;&#x673A;&#x638F;&#x7A7A;&#xFF0C;&#x4EE3;&#x7801;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x968F;&#x673A;&#x638F;&#x7A7A;
let nowItme = [], _option, nowOption = [];
for (let i = 0; i &lt; 9; i++) {
    //&#x62BD;&#x53D6;&#x5F53;&#x524D;&#x884C;&#x7684;&#x6240;&#x6709;&#x5750;&#x6807;
    nowItme = arrText[i].split(&apos;,&apos;);
    nowOption = [];
    //&#x5F53;&#x524D;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E24;&#x4E2A;&#x5750;&#x6807;&#x638F;&#x7A7A;
    for (let j = 0; j &lt; 2; j++) {
        //&#x62BD;&#x53D6;&#x5F53;&#x524D;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E00;&#x4E2A;&#x5750;&#x6807;
        _option = Math.floor(Math.random() * nowItme.length);
        //&#x5206;&#x5272;&#x5750;&#x6807;&#x7684;x,y
        nowOption = nowItme.splice(_option,1)[0].split(&quot;-&quot;);
        this.allNum[nowOption[0]][nowOption[1]] = &apos;&apos;;
    }

}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x968F;&#x673A;&#x638F;&#x7A7A;</span>
<span class="hljs-keyword">let</span> nowItme = [], _option, nowOption = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">9</span>; i++) {
    <span class="hljs-comment">//&#x62BD;&#x53D6;&#x5F53;&#x524D;&#x884C;&#x7684;&#x6240;&#x6709;&#x5750;&#x6807;</span>
    nowItme = arrText[i].split(<span class="hljs-string">&apos;,&apos;</span>);
    nowOption = [];
    <span class="hljs-comment">//&#x5F53;&#x524D;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E24;&#x4E2A;&#x5750;&#x6807;&#x638F;&#x7A7A;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">2</span>; j++) {
        <span class="hljs-comment">//&#x62BD;&#x53D6;&#x5F53;&#x524D;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E00;&#x4E2A;&#x5750;&#x6807;</span>
        _option = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * nowItme.length);
        <span class="hljs-comment">//&#x5206;&#x5272;&#x5750;&#x6807;&#x7684;x,y</span>
        nowOption = nowItme.splice(_option,<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>].split(<span class="hljs-string">&quot;-&quot;</span>);
        <span class="hljs-keyword">this</span>.allNum[nowOption[<span class="hljs-number">0</span>]][nowOption[<span class="hljs-number">1</span>]] = <span class="hljs-string">&apos;&apos;</span>;
    }

}

</code></pre><p><span class="img-wrap"><img data-src="/img/bVYQ9n?w=558&amp;h=558" src="https://static.alili.tech/img/bVYQ9n?w=558&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x6837;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x89C9;&#x5F97;&#x5947;&#x602A;&#xFF0C;&#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E0B;&#x6837;&#x5F0F;&#x7684;&#x8BE5;&#x5199;&#xFF0C;&#x5C31;&#x662F;&#x628A;&#x8BBE;&#x7A7A;&#x4E86;&#x7684;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;&#x6539;&#x4E00;&#x4E0B;&#xFF01;<code>.no</code>&#x8FD9;&#x4E2A;<code>class</code>&#x5BF9;&#x5E94;&#x7684;&#x6837;&#x5F0F;&#x6211;&#x5728;<code>css</code>&#x90A3;&#x91CC;&#x5199;&#x597D;&#x4E86;&#xFF0C;&#x5927;&#x5BB6;&#x6CE8;&#x610F;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;
&lt;div v-for=&quot;row,index in allNum&quot; class=&quot;num-row chearfix&quot;&gt;
    &lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;
    &lt;!--
        no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
    --&gt;
    &lt;div v-for=&quot;num1,indexSub in row&quot; :class=&quot;{&apos;no&apos;:num1===&apos;&apos;}&quot; class=&quot;num-col&quot;&gt;
        {{allNumText[index][indexSub]}}
    &lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;row,index in allNum&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-row chearfix&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;</span>
    <span class="hljs-comment">&lt;!--
        no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
    --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;num1,indexSub in row&quot;</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{&apos;no&apos;:num1===&apos;&apos;}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-col&quot;</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"allNumText[index][indexSub]}</span><span class="xml">}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVYQ9R?w=553&amp;h=555" src="https://static.alili.tech/img/bVYQ9R?w=553&amp;h=555" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader7">3-4.&#x663E;&#x793A;&#x6570;&#x5B57;&#x952E;&#x76D8;</h3><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x7B80;&#x5355;&#x7684;&#x7528;&#x4E00;&#x4E2A;&#x6D41;&#x7A0B;&#x56FE;&#x8BF4;&#x4E0B;&#x903B;&#x8F91;&#xFF0C;&#x5982;&#x4E0B;</p><p><span class="img-wrap"><img data-src="/img/bVYRe7?w=582&amp;h=527" src="https://static.alili.tech/img/bVYRe7?w=582&amp;h=527" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x7136;&#x540E;&#x5173;&#x4E8E;&#x6570;&#x5B57;&#x952E;&#x76D8;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x770B;&#x4E0B;&#x56FE;&#xFF08;&#x6570;&#x5B57;&#x952E;&#x76D8;&#x7684;&#x6837;&#x5F0F;&#x6211;&#x4E0D;&#x591A;&#x8BF4;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x662F;&#x76F8;&#x5BF9;&#x5B9A;&#x4F4D;&#xFF0C;&#x4E00;&#x4E2A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x7684;&#x8BBE;&#x7F6E;&#x800C;&#x5DF2;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVYRgl?w=557&amp;h=558" src="https://static.alili.tech/img/bVYRgl?w=557&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5982;&#x4E0A;&#x56FE;&#xFF0C;&#x6211;&#x70B9;&#x51FB;&#x7684;&#x662F;&#x7B2C;&#x4E00;&#x884C;&#x7B2C;&#x4E09;&#x4E2A;&#x683C;&#x5B50;&#xFF0C;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x671F;&#x5F85;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;&#x6709;&#x6240;&#x6539;&#x53D8;&#xFF0C;&#x65B9;&#x4FBF;&#x6211;&#x533A;&#x5206;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0D;&#x96BE;&#xFF0C;&#x7528;&#x4E00;&#x4E2A;<code>class</code>&#x6539;&#x53D8;&#x6837;&#x5F0F;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x7528;&#x4E00;&#x4E2A;<code>.cur</code>&#x7684;<code>class</code>&#x63A7;&#x5236;&#x6837;&#x5F0F;&#x3002;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5C31;&#x662F;&#x671F;&#x5F85;&#x6570;&#x5B57;&#x952E;&#x76D8;&#x5728;&#x7B2C;&#x4E8C;&#x884C;&#xFF0C;&#x7B2C;&#x56DB;&#x4E2A;&#x683C;&#x5B50;&#x90A3;&#x91CC;&#x51FA;&#x73B0;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x5927;&#x5BB6;&#x5C31;&#x77E5;&#x9053;&#xFF0C;&#x6570;&#x5B57;&#x952E;&#x76D8;&#x7684;&#x4F4D;&#x7F6E;&#x662F;&#x600E;&#x4E48;&#x5B9A;&#x4F4D;&#x7684;&#x4E86;&#xFF01;&#x6570;&#x5B57;&#x952E;&#x76D8;&#x7684;<code>top</code>&#x5C31;&#x662F;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x683C;&#x5B50;&#x6240;&#x5728;&#x7684;&#x884C;&#x7684;&#x7D22;&#x5F15;+1<em>60&#xFF08;60&#x662F;&#x683C;&#x5B50;&#x7684;&#x5BBD;&#x9AD8;&#xFF09;&#xFF0C;<code>left</code>&#x5C31;&#x662F;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x683C;&#x5B50;&#x6240;&#x5728;&#x7684;&#x5217;&#x7684;&#x7D22;&#x5F15;+1</em>60&#xFF08;60&#x662F;&#x683C;&#x5B50;&#x7684;&#x5BBD;&#x9AD8;&#xFF09;&#x3002;&#x6BD4;&#x5982;&#x4E0A;&#x56FE;&#xFF0C;&#x7B2C;&#x4E00;&#x884C;&#x7B2C;&#x4E09;&#x4E2A;&#x683C;&#x5B50;&#xFF0C;<code>top=(0+1)*60+&apos;px&apos;,left=(2+1)*60+&apos;px&apos;</code>&#x3002;</p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;
    &lt;div v-for=&quot;row,index in allNum&quot; class=&quot;num-row chearfix&quot;&gt;
        &lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;
        &lt;!--
            no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
            cur:&#x683C;&#x5B50;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x6837;&#x5F0F;
        --&gt;
        &lt;div v-for=&quot;num1,indexSub in row&quot;
             :class=&quot;{&apos;no&apos;:num1===&apos;&apos;,
             &apos;cur&apos;:curRow===index&amp;&amp;indexSub===curCol}&quot;
             @click=&quot;showCheck(index,indexSub)&quot; class=&quot;num-col&quot;&gt;
            {{allNumText[index][indexSub]}}

        &lt;/div&gt;
    &lt;/div&gt;
&lt;!--&#x6570;&#x5B57;&#x952E;&#x76D8;--&gt;
&lt;div class=&quot;num-check chearfix&quot; :style=&quot;{&apos;top&apos;:(curRow+1)*60+&apos;px&apos;,&apos;left&apos;:(curCol+1)*60+&apos;px&apos;}&quot;
     v-show=&quot;checkShow&quot;&gt;
    &lt;ul&gt;
        &lt;li @click=&quot;inputText(1)&quot;&gt;1&lt;/li&gt;
        &lt;li @click=&quot;inputText(2)&quot;&gt;2&lt;/li&gt;
        &lt;li @click=&quot;inputText(3)&quot;&gt;3&lt;/li&gt;
        &lt;li @click=&quot;inputText(4)&quot;&gt;4&lt;/li&gt;
        &lt;li @click=&quot;inputText(5)&quot;&gt;5&lt;/li&gt;
        &lt;li @click=&quot;inputText(6)&quot;&gt;6&lt;/li&gt;
        &lt;li @click=&quot;inputText(7)&quot;&gt;7&lt;/li&gt;
        &lt;li @click=&quot;inputText(8)&quot;&gt;8&lt;/li&gt;
        &lt;li @click=&quot;inputText(9)&quot;&gt;9&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;row,index in allNum&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-row chearfix&quot;</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;</span>
        <span class="hljs-comment">&lt;!--
            no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
            cur:&#x683C;&#x5B50;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x6837;&#x5F0F;
        --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;num1,indexSub in row&quot;</span>
             <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{&apos;no&apos;:num1===&apos;&apos;,
             &apos;cur&apos;:curRow===index&amp;&amp;indexSub===curCol}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>
             @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;showCheck(index,indexSub)&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-col&quot;</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"allNumText[index][indexSub]}</span><span class="xml">}

        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#x6570;&#x5B57;&#x952E;&#x76D8;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-check chearfix&quot;</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{&apos;top&apos;:(curRow+1)*60+&apos;px&apos;,&apos;left&apos;:(curCol+1)*60+&apos;px&apos;}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>
     <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;checkShow&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(1)&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(2)&quot;</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(3)&quot;</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(4)&quot;</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(5)&quot;</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(6)&quot;</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(7)&quot;</span>&gt;</span>7<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(8)&quot;</span>&gt;</span>8<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;inputText(9)&quot;</span>&gt;</span>9<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>js&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description &#x663E;&#x793A;&#x6570;&#x5B57;&#x952E;&#x76D8;
 * @param i1
 * @param i2
 */
showCheck(i1, i2){
    //&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x662F;&#x5426;&#x662F;&#x88AB;&#x638F;&#x7A7A;&#x7684;&#x683C;&#x5B50;
    if (this.allNum[i1][i2] !== &apos;&apos;) {
        return
    }
    //&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x5982;&#x679C;&#x662F;&#x4E0A;&#x4E00;&#x6B21;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#xFF08;&#x5F53;&#x524D;&#x683C;&#x5B50;&#xFF09;
    if (i1 === this.curRow &amp;&amp; i2 === this.curCol) {
        //&#x9690;&#x85CF;&#x6570;&#x5B57;&#x952E;&#x76D8;&#xFF0C;curRow&#x548C;curCol&#x8BBE;&#x7A7A;
        this.checkShow = false;
        this.curRow = &apos;&apos;;
        this.curCol = &apos;&apos;;
    }
    else {
        //&#x9690;&#x85CF;&#x6570;&#x5B57;&#x952E;&#x76D8;&#xFF0C;curRow&#x548C;curCol&#x5206;&#x522B;&#x8BBE;&#x7F6E;&#x6210;&#x5F53;&#x524D;&#x7684;&#x70B9;
        this.checkShow = true;
        this.curRow = i1;
        this.curCol = i2;
    }
},
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@description</span> &#x663E;&#x793A;&#x6570;&#x5B57;&#x952E;&#x76D8;
 * <span class="hljs-doctag">@param</span> i1
 * <span class="hljs-doctag">@param</span> i2
 */</span>
showCheck(i1, i2){
    <span class="hljs-comment">//&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x662F;&#x5426;&#x662F;&#x88AB;&#x638F;&#x7A7A;&#x7684;&#x683C;&#x5B50;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.allNum[i1][i2] !== <span class="hljs-string">&apos;&apos;</span>) {
        <span class="hljs-keyword">return</span>
    }
    <span class="hljs-comment">//&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x5982;&#x679C;&#x662F;&#x4E0A;&#x4E00;&#x6B21;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#xFF08;&#x5F53;&#x524D;&#x683C;&#x5B50;&#xFF09;</span>
    <span class="hljs-keyword">if</span> (i1 === <span class="hljs-keyword">this</span>.curRow &amp;&amp; i2 === <span class="hljs-keyword">this</span>.curCol) {
        <span class="hljs-comment">//&#x9690;&#x85CF;&#x6570;&#x5B57;&#x952E;&#x76D8;&#xFF0C;curRow&#x548C;curCol&#x8BBE;&#x7A7A;</span>
        <span class="hljs-keyword">this</span>.checkShow = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.curRow = <span class="hljs-string">&apos;&apos;</span>;
        <span class="hljs-keyword">this</span>.curCol = <span class="hljs-string">&apos;&apos;</span>;
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//&#x9690;&#x85CF;&#x6570;&#x5B57;&#x952E;&#x76D8;&#xFF0C;curRow&#x548C;curCol&#x5206;&#x522B;&#x8BBE;&#x7F6E;&#x6210;&#x5F53;&#x524D;&#x7684;&#x70B9;</span>
        <span class="hljs-keyword">this</span>.checkShow = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">this</span>.curRow = i1;
        <span class="hljs-keyword">this</span>.curCol = i2;
    }
},
</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVYT9m?w=570&amp;h=566" src="https://static.alili.tech/img/bVYT9m?w=570&amp;h=566" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader8">3-5.&#x9AD8;&#x4EAE;&#x663E;&#x793A;&#x540C;&#x884C;&#x540C;&#x5217;</h3><p>&#x8FD9;&#x4E00;&#x6B65;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x9996;&#x5148;&#xFF0C;&#x9AD8;&#x4EAE;&#x663E;&#x793A;&#x884C;&#xFF0C;&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x505A;&#x4E86;&#xFF0C;&#x5C31;&#x662F;&#x884C;&#x5BF9;&#x5E94;&#x7684;<code>div</code>&#xFF0C;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;<code>:hover</code>&#xFF0C;&#x7136;&#x540E;&#x5BF9;&#x5E94;&#x8BBE;&#x7F6E;&#x5355;&#x5143;&#x683C;&#x7684;&#x6837;&#x5F0F;&#x800C;&#x5DF2;&#xFF01;&#x8FD9;&#x4E2A;&#x4E0D;&#x591A;&#x8BF4;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVYRqy?w=1723&amp;h=413" src="https://static.alili.tech/img/bVYRqy?w=1723&amp;h=413" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x7136;&#x540E;&#xFF0C;&#x9AD8;&#x4EAE;&#x663E;&#x793A;&#x5217;&#xFF0C;&#x590D;&#x6742;&#x4E00;&#x70B9;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x539F;&#x7406;&#x6211;&#x60F3;&#x5927;&#x5BB6;&#x4E5F;&#x77E5;&#x9053;&#xFF0C;&#x5C31;&#x662F;&#x5F53;&#x9F20;&#x6807;&#x8FDB;&#x5982;&#x683C;&#x5B50;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5728;<code>data</code>&#x91CC;&#x9762;&#xFF0C;&#x7528;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x50A8;&#x5B58;&#x8FDB;&#x5165;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5217;&#x7684;&#x7D22;&#x5F15;&#xFF0C;&#x7136;&#x540E;&#x52A0;&#x4E0A;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x683C;&#x5B50;&#x7684;&#x5217;&#x7684;&#x7D22;&#x5F15;&#x7B49;&#x4E8E;&#x8FDB;&#x5165;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5217;&#x7684;&#x7D22;&#x5F15;&#x3002;&#x5C31;&#x52A0;&#x4E0A;&#x4E00;&#x4E2A;<code>class</code>&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x7528;<code>.cur-col</code>&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;
&lt;div v-for=&quot;row,index in allNum&quot; class=&quot;num-row clear&quot;&gt;
    &lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;
    &lt;!--
        no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
        cur:&#x683C;&#x5B50;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x6837;&#x5F0F;
        cur-col:&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#xFF0C;&#x548C;&#x88AB;&#x70B9;&#x51FB;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#x7684;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;
    --&gt;
    &lt;div v-for=&quot;num1,indexSub in row&quot;
         :class=&quot;{&apos;no&apos;:num1===&apos;&apos;,
         &apos;cur&apos;:curRow===index&amp;&amp;indexSub===curCol,
         &apos;cur-col&apos;:hoverCol===indexSub}&quot;
         @click=&quot;showCheck(index,indexSub)&quot; @mouseenter=&quot;hoverCol=indexSub;&quot; class=&quot;num-col&quot;&gt;
        {{allNumText[index][indexSub]}}
    &lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;row,index in allNum&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-row clear&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;</span>
    <span class="hljs-comment">&lt;!--
        no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
        cur:&#x683C;&#x5B50;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x6837;&#x5F0F;
        cur-col:&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#xFF0C;&#x548C;&#x88AB;&#x70B9;&#x51FB;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#x7684;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;
    --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;num1,indexSub in row&quot;</span>
         <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{&apos;no&apos;:num1===&apos;&apos;,
         &apos;cur&apos;:curRow===index&amp;&amp;indexSub===curCol,
         &apos;cur-col&apos;:hoverCol===indexSub}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>
         @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;showCheck(index,indexSub)&quot;</span> @<span class="hljs-attr">mouseenter</span>=<span class="hljs-string">&quot;hoverCol=indexSub;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-col&quot;</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"allNumText[index][indexSub]}</span><span class="xml">}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVYUaO?w=568&amp;h=554" src="https://static.alili.tech/img/bVYUaO?w=568&amp;h=554" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader9">3-6.&#x586B;&#x5199;&#x64CD;&#x4F5C;&#x548C;&#x9519;&#x8BEF;&#x63D0;&#x793A;</h3><p>&#x8FD9;&#x4E00;&#x6B65;&#x7684;&#x64CD;&#x4F5C;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x76F4;&#x63A5;&#x53D1;&#x4EE3;&#x7801;&#x5427;&#xFF0C;&#x770B;&#x4EE3;&#x7801;&#x6BD4;&#x6211;&#x8BF4;&#x7684;&#x4F1A;&#x6E05;&#x6670;&#x4E9B;&#xFF0C;&#x6BD5;&#x7ADF;&#x8BF4;&#x7684;&#x6709;&#x70B9;&#x7ED5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;
&lt;div v-for=&quot;row,index in allNum&quot; class=&quot;num-row clear&quot;&gt;
    &lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;
    &lt;!--
        no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
        cur:&#x683C;&#x5B50;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x6837;&#x5F0F;
        cur-col:&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#xFF0C;&#x548C;&#x88AB;&#x70B9;&#x51FB;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#x7684;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;
        err&#xFF1A;&#x586B;&#x5199;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x7684;&#x6837;&#x5F0F;
    --&gt;
    &lt;div v-for=&quot;num1,indexSub in row&quot;
         :class=&quot;{&apos;no&apos;:num1===&apos;&apos;,
         &apos;cur&apos;:curRow===index&amp;&amp;indexSub===curCol,
         &apos;cur-col&apos;:hoverCol===indexSub,
         &apos;err&apos;:(optionNow.x===index&amp;&amp;optionNow.y===indexSub)||(optionNowInRow.x===index&amp;&amp;optionNowInRow.y===indexSub)||(optionNowInCol.x===index&amp;&amp;optionNowInCol.y===indexSub)}&quot;
         @click=&quot;showCheck(index,indexSub)&quot; @mouseenter=&quot;hoverCol=indexSub;&quot; class=&quot;num-col&quot;&gt;
        {{allNumText[index][indexSub]}}

    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;row,index in allNum&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-row clear&quot;</span>&gt;</span>
    <span class="hljs-comment">&lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;</span>
    <span class="hljs-comment">&lt;!--
        no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
        cur:&#x683C;&#x5B50;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x6837;&#x5F0F;
        cur-col:&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#xFF0C;&#x548C;&#x88AB;&#x70B9;&#x51FB;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#x7684;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;
        err&#xFF1A;&#x586B;&#x5199;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x7684;&#x6837;&#x5F0F;
    --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;num1,indexSub in row&quot;</span>
         <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{&apos;no&apos;:num1===&apos;&apos;,
         &apos;cur&apos;:curRow===index&amp;&amp;indexSub===curCol,
         &apos;cur-col&apos;:hoverCol===indexSub,
         &apos;err&apos;:(optionNow.x===index&amp;&amp;optionNow.y===indexSub)||(optionNowInRow.x===index&amp;&amp;optionNowInRow.y===indexSub)||(optionNowInCol.x===index&amp;&amp;optionNowInCol.y===indexSub)}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>
         @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;showCheck(index,indexSub)&quot;</span> @<span class="hljs-attr">mouseenter</span>=<span class="hljs-string">&quot;hoverCol=indexSub;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;num-col&quot;</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"allNumText[index][indexSub]}</span><span class="xml">}

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre><p>js&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inputText(_text){
    //*****************************&#x68C0;&#x67E5;&#x524D;&#x7684;&#x521D;&#x59CB;&#x5316;
    let _row = this.curRow, _col = this.curCol;
    this.curRow = &apos;&apos;;
    this.curCol = &apos;&apos;;
    this.isErr = false;
    this.optionNow = {
        x: &apos;&apos;,
        y: &apos;&apos;,
    }
    this.optionNowInRow = {
        x: &apos;&apos;,
        y: &apos;&apos;,
    }
    this.optionNowInCol = {
        x: &apos;&apos;,
        y: &apos;&apos;,
    }
    //*****************************&#x68C0;&#x67E5;&#x884C;
    //&#x6839;&#x636E;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x8FDB;&#x884C;&#x8D4B;&#x503C;
    this.allNumText[_row][_col] = _text;
    let rowCheck = Object.assign(this.allNumText[_row], []);
    this.checkShow = false;
    for (let i = 0, len = rowCheck.length; i &lt; len; i++) {
        //&#x5982;&#x679C;&#x503C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x5750;&#x6807;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x586B;&#x5199;&#x9519;&#x8BEF;
        if (_text === rowCheck[i] &amp;&amp; _col !== i) {
            this.isErr = true;
            this.isShake = true;
            //&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x7684;&#x4FE1;&#x606F;
            this.optionNow = {
                x: _row,
                y: _col,
            }
            //&#x8BB0;&#x5F55;&#x548C;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x884C;&#xFF0C;&#x4EE5;&#x53CA;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
            this.optionNowInRow = {
                x: _row,
                y: i,
            }
        }
    }
    //*****************************&#x68C0;&#x67E5;&#x5217;
    let colCheck = [];
    //&#x9996;&#x5148;&#x628A;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x90A3;&#x4E00;&#x5217;&#x7684;&#x6570;&#x503C;&#x4FDD;&#x5B58;&#x8D77;&#x6765;
    for (let i = 0, len = this.allNumText.length; i &lt; len; i++) {
        colCheck.push(this.allNumText[i][_col]);
    }
    //&#x904D;&#x5386;&#x68C0;&#x67E5;
    for (let i = 0, len = colCheck.length; i &lt; len; i++) {
        //&#x5982;&#x679C;&#x503C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x5750;&#x6807;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x586B;&#x5199;&#x9519;&#x8BEF;
        if (_text === colCheck[i] &amp;&amp; _row !== i) {
            this.isErr = true;
            this.isShake = true;
            //&#x8BB0;&#x5F55;&#x548C;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#xFF0C;&#x4EE5;&#x53CA;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
            this.optionNowInCol = {
                x: i,
                y: _col,
            }
        }
    }
    //&#x5982;&#x679C;&#x53D1;&#x73B0;&#x7684;&#x540C;&#x6837;&#x7684;
    if (this.isErr) {
        setTimeout(() =&gt; {
            this.isShake = false;
        }, 1000)
        return;
    }
    //&#x5982;&#x679C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x540E;&#xFF0C;&#x957F;&#x5EA6;&#x5C0F;&#x4E8E;9&#xFF0C;&#x5C31;&#x662F;&#x884C;&#x6CA1;&#x5B8C;&#x6210;
    rowCheck = rowCheck.filter(item =&gt; item !== &apos;&apos;);
    if (rowCheck.length !== 9) {
        //console.log(&apos;&#x884C;&#x6CA1;&#x5B8C;&#x6210;&apos;)
        return;
    }

    let coloCheck = [];
    //&#x5982;&#x679C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x540E;&#xFF0C;&#x957F;&#x5EA6;&#x5C0F;&#x4E8E;9&#xFF0C;&#x5C31;&#x662F;&#x5217;&#x6CA1;&#x5B8C;&#x6210;
    for (let i = 0, len = this.allNumText.length; i &lt; len; i++) {
        coloCheck = [...new Set(this.allNumText[i])];
        coloCheck = coloCheck.filter(item =&gt; item !== &apos;&apos;);
        if (coloCheck.length !== 9) {
            //console.log(&apos;&#x6CA1;&#x5B8C;&#x6210;&apos;)
            return;
        }
    }
    alert(&apos;&#x6311;&#x6218;&#x6210;&#x529F;&#xFF0C;&#x4F46;&#x662F;&#x6CA1;&#x5956;&#x54C1;&apos;);
    this.numShow = false;
} 

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>inputText(_text){
    <span class="hljs-comment">//*****************************&#x68C0;&#x67E5;&#x524D;&#x7684;&#x521D;&#x59CB;&#x5316;</span>
    let _row = <span class="hljs-keyword">this</span>.curRow, _col = <span class="hljs-keyword">this</span>.curCol;
    <span class="hljs-keyword">this</span>.curRow = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.curCol = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">this</span>.isErr = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>.optionNow = {
        x: <span class="hljs-string">&apos;&apos;</span>,
        y: <span class="hljs-string">&apos;&apos;</span>,
    }
    <span class="hljs-keyword">this</span>.optionNowInRow = {
        x: <span class="hljs-string">&apos;&apos;</span>,
        y: <span class="hljs-string">&apos;&apos;</span>,
    }
    <span class="hljs-keyword">this</span>.optionNowInCol = {
        x: <span class="hljs-string">&apos;&apos;</span>,
        y: <span class="hljs-string">&apos;&apos;</span>,
    }
    <span class="hljs-comment">//*****************************&#x68C0;&#x67E5;&#x884C;</span>
    <span class="hljs-comment">//&#x6839;&#x636E;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x8FDB;&#x884C;&#x8D4B;&#x503C;</span>
    <span class="hljs-keyword">this</span>.allNumText[_row][_col] = _text;
    let rowCheck = Object.assign(<span class="hljs-keyword">this</span>.allNumText[_row], []);
    <span class="hljs-keyword">this</span>.checkShow = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>, len = rowCheck.length; i &lt; len; i++) {
        <span class="hljs-comment">//&#x5982;&#x679C;&#x503C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x5750;&#x6807;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x586B;&#x5199;&#x9519;&#x8BEF;</span>
        <span class="hljs-keyword">if</span> (_text === rowCheck[i] &amp;&amp; _col !== i) {
            <span class="hljs-keyword">this</span>.isErr = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">this</span>.isShake = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">//&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x7684;&#x4FE1;&#x606F;</span>
            <span class="hljs-keyword">this</span>.optionNow = {
                x: _row,
                y: _col,
            }
            <span class="hljs-comment">//&#x8BB0;&#x5F55;&#x548C;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x884C;&#xFF0C;&#x4EE5;&#x53CA;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;</span>
            <span class="hljs-keyword">this</span>.optionNowInRow = {
                x: _row,
                y: i,
            }
        }
    }
    <span class="hljs-comment">//*****************************&#x68C0;&#x67E5;&#x5217;</span>
    let colCheck = [];
    <span class="hljs-comment">//&#x9996;&#x5148;&#x628A;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x90A3;&#x4E00;&#x5217;&#x7684;&#x6570;&#x503C;&#x4FDD;&#x5B58;&#x8D77;&#x6765;</span>
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>, len = <span class="hljs-keyword">this</span>.allNumText.length; i &lt; len; i++) {
        colCheck.push(<span class="hljs-keyword">this</span>.allNumText[i][_col]);
    }
    <span class="hljs-comment">//&#x904D;&#x5386;&#x68C0;&#x67E5;</span>
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>, len = colCheck.length; i &lt; len; i++) {
        <span class="hljs-comment">//&#x5982;&#x679C;&#x503C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x5750;&#x6807;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x586B;&#x5199;&#x9519;&#x8BEF;</span>
        <span class="hljs-keyword">if</span> (_text === colCheck[i] &amp;&amp; _row !== i) {
            <span class="hljs-keyword">this</span>.isErr = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">this</span>.isShake = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">//&#x8BB0;&#x5F55;&#x548C;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#xFF0C;&#x4EE5;&#x53CA;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;</span>
            <span class="hljs-keyword">this</span>.optionNowInCol = {
                x: i,
                y: _col,
            }
        }
    }
    <span class="hljs-comment">//&#x5982;&#x679C;&#x53D1;&#x73B0;&#x7684;&#x540C;&#x6837;&#x7684;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isErr) {
        setTimeout(() =&gt; {
            <span class="hljs-keyword">this</span>.isShake = <span class="hljs-literal">false</span>;
        }, <span class="hljs-number">1000</span>)
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">//&#x5982;&#x679C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x540E;&#xFF0C;&#x957F;&#x5EA6;&#x5C0F;&#x4E8E;9&#xFF0C;&#x5C31;&#x662F;&#x884C;&#x6CA1;&#x5B8C;&#x6210;</span>
    rowCheck = rowCheck.filter(item =&gt; item !== <span class="hljs-string">&apos;&apos;</span>);
    <span class="hljs-keyword">if</span> (rowCheck.length !== <span class="hljs-number">9</span>) {
        <span class="hljs-comment">//console.log(&apos;&#x884C;&#x6CA1;&#x5B8C;&#x6210;&apos;)</span>
        <span class="hljs-keyword">return</span>;
    }

    let coloCheck = [];
    <span class="hljs-comment">//&#x5982;&#x679C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x540E;&#xFF0C;&#x957F;&#x5EA6;&#x5C0F;&#x4E8E;9&#xFF0C;&#x5C31;&#x662F;&#x5217;&#x6CA1;&#x5B8C;&#x6210;</span>
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>, len = <span class="hljs-keyword">this</span>.allNumText.length; i &lt; len; i++) {
        coloCheck = [...new Set(<span class="hljs-keyword">this</span>.allNumText[i])];
        coloCheck = coloCheck.filter(item =&gt; item !== <span class="hljs-string">&apos;&apos;</span>);
        <span class="hljs-keyword">if</span> (coloCheck.length !== <span class="hljs-number">9</span>) {
            <span class="hljs-comment">//console.log(&apos;&#x6CA1;&#x5B8C;&#x6210;&apos;)</span>
            <span class="hljs-keyword">return</span>;
        }
    }
    alert(<span class="hljs-string">&apos;&#x6311;&#x6218;&#x6210;&#x529F;&#xFF0C;&#x4F46;&#x662F;&#x6CA1;&#x5956;&#x54C1;&apos;</span>);
    <span class="hljs-keyword">this</span>.numShow = <span class="hljs-literal">false</span>;
} 

</code></pre><p><span class="img-wrap"><img data-src="/img/bV0AO0?w=734&amp;h=703" src="https://static.alili.tech/img/bV0AO0?w=734&amp;h=703" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#xFF0C;&#x7B80;&#x5355;&#x8BF4;&#x4E0B;</p><p>1.<code>.err</code> &#x8FD9;&#x4E2A;class&#x662F;&#x8BBE;&#x7F6E;&#x7EA2;&#x8272;&#x5B57;&#x4F53;&#x6240;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x81F3;&#x4E8E;&#x5224;&#x65AD;&#xFF0C;&#x5C31;&#x662F;&#x5728;<code>inputText</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x91CC;&#x9762;&#xFF0C;&#x6709;<code>optionNow</code>&#x548C; <code>optionNowInRow</code>&#x548C;<code>optionNowInCol</code>&#x3002;&#x53EA;&#x8981;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;&#x7B49;&#x4E8E;&#x4E09;&#x8005;&#x5176;&#x4E2D;&#x4E4B;&#x4E00;&#xFF0C;&#x5C31;&#x4F1A;&#x6DFB;&#x52A0;&#x8FD9;&#x4E2A;class&#xFF0C;&#x5C31;&#x4F1A;&#x53D8;&#x7EA2;&#x3002;<br>2.<code>.isShake</code>&#x8FD9;&#x4E2A;class&#x662F;&#x63A7;&#x5236;&#xFF0C;&#x6296;&#x52A8;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x6DFB;&#x52A0;&#x4E0A;&#x4E86;&#x4E4B;&#x540E;&#xFF0C;&#x5728;&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x8981;&#x53BB;&#x6389;&#x8FD9;&#x4E2A;class&#xFF0C;&#x4E0D;&#x7136;&#x4E0B;&#x6B21;&#x6DFB;&#x52A0;&#x6CA1;&#x6709;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;<br>3.&#x5728;<code>inputText</code>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x91CC;&#x9762;&#xFF0C;&#x6211;&#x64CD;&#x4F5C;&#x7684;&#x6570;&#x72EC;&#x5217;&#x8868;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x4E4B;&#x524D;&#xFF0C;&#x63D0;&#x5230;&#x7684;<code>allNum</code>&#xFF0C;&#x800C;&#x662F;&#x5229;&#x7528;<code>allNum</code>&#xFF0C;&#x6DF1;&#x5EA6;&#x62F7;&#x8D1D;&#x751F;&#x6210;&#x51FA;&#x7684;<code>allNumText</code>&#xFF08;<code>this.allNumText = JSON.parse(JSON.stringify(this.allNum));</code>&#xFF09;&#x3002;&#x4E3B;&#x8981;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x4E0B;&#x56FE;&#x7684;&#x60C5;&#x51B5;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVYRBM?w=666&amp;h=598" src="https://static.alili.tech/img/bVYRBM?w=666&amp;h=598" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x6837;&#x662F;&#x4E3A;&#x4E86;&#x5F80;&#x638F;&#x7A7A;&#x7684;&#x683C;&#x5B50;&#x8F93;&#x5165;&#x6570;&#x5B57;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7136;&#x540E;&#x90A3;&#x4E2A;&#x683C;&#x5B50;&#x5C31;&#x4E0D;&#x80FD;&#x518D;&#x6539;&#x4E86;&#xFF0C;&#x5373;&#x4F7F;&#x662F;&#x586B;&#x9519;&#x4E86;&#xFF0C;&#x90FD;&#x4E0D;&#x80FD;&#x6539;&#x3002;&#x6837;&#x5F0F;&#x63A7;&#x5236;&#x4E5F;&#x4E0D;&#x6B63;&#x786E;&#xFF01;&#x6B63;&#x786E;&#x7684;&#x683C;&#x5F0F;&#x5E94;&#x8BE5;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF0C;&#x5373;&#x4F7F;&#x586B;&#x5165;&#x4E86;&#xFF0C;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;&#x8FD8;&#x662F;&#x7070;&#x8272;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x7684;&#x77E5;&#x9053;&#x54EA;&#x4E2A;&#x683C;&#x5B50;&#x662F;&#x5F53;&#x65F6;&#x88AB;&#x638F;&#x7A7A;&#x7684;&#xFF0C;&#x586B;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x6539;&#x7684;&#x3002;</p><h2 id="articleHeader10">4.&#x5B8C;&#x6574;&#x4EE3;&#x7801;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;vue-&#x6240;&#x8C13;&#x7684;&#x6570;&#x72EC;&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;../../reset.css&quot;&gt;
    &lt;style&gt;
        li{
            list-style-type: none;
        }
        .shake {
            animation: shake-opacity 500ms 1 ease-in-out;
        }
        @keyframes shake-opacity {
            0% {
                transform: translate(0px, 0px) rotate(0deg);
                opacity: 0.6;
            }
            10% {
                transform: translate(-2px, -1px) rotate(-0.5deg);
                opacity: 0.5;
            }
            20% {
                transform: translate(-4px, 4px) rotate(1.5deg);
                opacity: 0.4;
            }
            30% {
                transform: translate(-4px, -1px) rotate(-1.5deg);
                opacity: 0.8;
            }
            40% {
                transform: translate(-2px, -1px) rotate(-2.5deg);
                opacity: 0.3;
            }
            50% {
                transform: translate(-4px, 1px) rotate(-2.5deg);
                opacity: 0.5;
            }
            60% {
                transform: translate(-2px, 4px) rotate(0.5deg);
                opacity: 0.1;
            }
            70% {
                transform: translate(-3px, 1px) rotate(-0.5deg);
                opacity: 0.4;
            }
            80% {
                transform: translate(0px, 0px) rotate(-0.5deg);
                opacity: 0.5;
            }
            90% {
                transform: translate(2px, -1px) rotate(-2.5deg);
                opacity: 0.8;
            }
        }
        .num-box {
            margin: 0 auto;
            width: 540px;
            position: relative;
        }
        .num-box .num-check {
            position: absolute;
            width: 180px;
            box-shadow: 0 0 10px 0 #000;
            left: 0;
            top: 0;
        }
        .num-box .num-check li {
            box-sizing: border-box;
            float: left;
            background: #fff;
            color: #58B7FF;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            font-size: 24px;
            border: 1px solid #58B7FF;
            cursor: pointer;
            transition: all .5s;
        }
        .num-box .num-check li:hover {
            color: #fff;
            background: #58B7FF;
            border: 1px solid #fff;
        }
        .num-tips{
            color: #333;
            line-height: 32px;
            font-size: 16px;
        }
        .num-table{
            position: relative;
        }
        .num-row {
            font-size: 0;
        }
        .num-row:hover .num-col, .num-row:hover .num-col.no, .num-row:hover .num-col.cur-col {
            background: #0068b7;
        }
        .num-row .num-col {
            width: 60px;
            height: 60px;
            line-height: 60px;
            float: left;
            box-sizing: border-box;
            text-align: center;
            background: #58B7FF;
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            border: 1px solid #ccc;
        }
        .num-row .num-col.no {
            background: #ccc;
            border: 1px solid #fff;
        }
        .num-row .num-col.err {
            color: #ff4949;
        }
        .num-row .num-col.cur-col {
            background: #0068b7;
        }
        .num-row .num-col.cur {
            background: #fff !important;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;num-box&quot; v-show=&quot;numShow&quot; id=&quot;num&quot;&gt;
    &lt;div class=&quot;num-tips&quot;&gt;
        &lt;p&gt;&#x6240;&#x8C13;&#x7684;&#x6570;&#x72EC;&#xFF1A;&#x89C4;&#x5219;&lt;/p&gt;
        &lt;p&gt;1.&#x6BCF;&#x4E00;&#x884C;&#x6570;&#x5B57;&#x4E0D;&#x91CD;&#x590D;&lt;/p&gt;
        &lt;p&gt;2.&#x6BCF;&#x4E00;&#x5217;&#x6570;&#x5B57;&#x4E0D;&#x91CD;&#x590D;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;num-table&quot; @mouseleave=&quot;hoverCol=&apos;&apos;&quot; :class=&quot;{&apos;shake&apos;:isShake}&quot;&gt;
        &lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;
        &lt;div v-for=&quot;row,index in allNum&quot; class=&quot;num-row clear&quot;&gt;
            &lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;
            &lt;!--
                no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
                cur:&#x683C;&#x5B50;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x6837;&#x5F0F;
                cur-col:&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#xFF0C;&#x548C;&#x88AB;&#x70B9;&#x51FB;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#x7684;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;
                err&#xFF1A;&#x586B;&#x5199;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x7684;&#x6837;&#x5F0F;
            --&gt;
            &lt;div v-for=&quot;num1,indexSub in row&quot;
                 :class=&quot;{&apos;no&apos;:num1===&apos;&apos;,
                 &apos;cur&apos;:curRow===index&amp;&amp;indexSub===curCol,
                 &apos;cur-col&apos;:hoverCol===indexSub,
                 &apos;err&apos;:(optionNow.x===index&amp;&amp;optionNow.y===indexSub)||(optionNowInRow.x===index&amp;&amp;optionNowInRow.y===indexSub)||(optionNowInCol.x===index&amp;&amp;optionNowInCol.y===indexSub)}&quot;
                 @click=&quot;showCheck(index,indexSub)&quot; @mouseenter=&quot;hoverCol=indexSub;&quot; class=&quot;num-col&quot;&gt;
                {{allNumText[index][indexSub]}}

            &lt;/div&gt;
        &lt;/div&gt;
        &lt;!--&#x6570;&#x5B57;&#x952E;&#x76D8;--&gt;
        &lt;div class=&quot;num-check clear&quot; :style=&quot;{&apos;top&apos;:(curRow+1)*60+&apos;px&apos;,&apos;left&apos;:(curCol+1)*60+&apos;px&apos;}&quot;
             v-show=&quot;checkShow&quot;&gt;
            &lt;ul&gt;
                &lt;li @click=&quot;inputText(1)&quot;&gt;1&lt;/li&gt;
                &lt;li @click=&quot;inputText(2)&quot;&gt;2&lt;/li&gt;
                &lt;li @click=&quot;inputText(3)&quot;&gt;3&lt;/li&gt;
                &lt;li @click=&quot;inputText(4)&quot;&gt;4&lt;/li&gt;
                &lt;li @click=&quot;inputText(5)&quot;&gt;5&lt;/li&gt;
                &lt;li @click=&quot;inputText(6)&quot;&gt;6&lt;/li&gt;
                &lt;li @click=&quot;inputText(7)&quot;&gt;7&lt;/li&gt;
                &lt;li @click=&quot;inputText(8)&quot;&gt;8&lt;/li&gt;
                &lt;li @click=&quot;inputText(9)&quot;&gt;9&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;../vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    new Vue({
        el:&apos;#num&apos;,
        data:{
                name: &apos;welcome&apos;,
                testText: &apos;&#x6B22;&#x8FCE;&#x6765;&#x5230;&apos;,
                nowIndex: 0,
                allNum: [],//&#x6570;&#x5B57;&#x6392;&#x5217;
                answer: [],//&#x6240;&#x6709;&#x7B54;&#x6848;&#x7684;&#x5750;&#x6807;&#x70B9;
                allNumText: [],//&#x6570;&#x5B57;&#xFF0C;&#x5305;&#x62EC;&#x8F93;&#x5165;&#x540E;&#x7684;&#x6570;&#x5B57;
                curRow: &apos;&apos;,//&#x5F53;&#x524D;&#x683C;&#x5B50;&#x6240;&#x5728;&#x7684;&#x884C;&#x7684;&#x7D22;&#x5F15;
                curCol: &apos;&apos;,//&#x5F53;&#x524D;&#x683C;&#x5B50;&#x6240;&#x5728;&#x7684;&#x5217;&#x7684;&#x7D22;&#x5F15;
                checkShow: false,//&#x6570;&#x5B57;&#x952E;&#x76D8;&#x7684;&#x663E;&#x793A;
                hoverCol: &apos;&apos;,//&#x9F20;&#x6807;&#x8FDB;&#x53BB;&#x7684;&#x5F53;&#x524D;&#x5217;
                hoverRow: 0,//&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x7684;&#x5F53;&#x524D;&#x884C;
                numShow: true,//&#x6570;&#x72EC;&#x7684;&#x663E;&#x793A;
                optionNow: {},//&#x8F93;&#x5165;&#x540E;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                optionNowInRow: {},//&#x548C;&#x8F93;&#x5165;&#x540E;&#x7684;&#x683C;&#x5B50;&#x5728;&#x540C;&#x4E00;&#x884C;&#xFF0C;&#x5E76;&#x4E14;&#x540C;&#x6837;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                optionNowInCol: {},//&#x548C;&#x8F93;&#x5165;&#x540E;&#x7684;&#x683C;&#x5B50;&#x5728;&#x540C;&#x4E00;&#x5217;&#xFF0C;&#x5E76;&#x4E14;&#x540C;&#x6837;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                isErr: false,//&#x662F;&#x5426;&#x8F93;&#x5165;&#x9519;&#x8BEF;&#x540E;
                isShake: false//&#x662F;&#x5426;&#x663E;&#x793A;&#x9707;&#x52A8;&#x7684;&#x6837;&#x5F0F;
        },
        methods: {
            /**
             * @description &#x663E;&#x793A;&#x6570;&#x5B57;&#x952E;&#x76D8;
             * @param i1
             * @param i2
             */
            showCheck(i1, i2){
                //&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x662F;&#x5426;&#x662F;&#x88AB;&#x638F;&#x7A7A;&#x7684;&#x683C;&#x5B50;
                if (this.allNum[i1][i2] !== &apos;&apos;) {
                    return
                }
                //&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x5982;&#x679C;&#x662F;&#x4E0A;&#x4E00;&#x6B21;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#xFF08;&#x5F53;&#x524D;&#x683C;&#x5B50;&#xFF09;
                if (i1 === this.curRow &amp;&amp; i2 === this.curCol) {
                    //&#x9690;&#x85CF;&#x6570;&#x5B57;&#x952E;&#x76D8;&#xFF0C;curRow&#x548C;curCol&#x8BBE;&#x7A7A;
                    this.checkShow = false;
                    this.curRow = &apos;&apos;;
                    this.curCol = &apos;&apos;;
                }
                else {
                    //&#x9690;&#x85CF;&#x6570;&#x5B57;&#x952E;&#x76D8;&#xFF0C;curRow&#x548C;curCol&#x5206;&#x522B;&#x8BBE;&#x7F6E;&#x6210;&#x5F53;&#x524D;&#x7684;&#x70B9;
                    this.checkShow = true;
                    this.curRow = i1;
                    this.curCol = i2;
                }
            },
            inputText(_text){
                //*****************************&#x68C0;&#x67E5;&#x524D;&#x7684;&#x521D;&#x59CB;&#x5316;
                let _row = this.curRow, _col = this.curCol;
                this.curRow = &apos;&apos;;
                this.curCol = &apos;&apos;;
                this.isErr = false;
                this.optionNow = {
                    x: &apos;&apos;,
                    y: &apos;&apos;,
                }
                this.optionNowInRow = {
                    x: &apos;&apos;,
                    y: &apos;&apos;,
                }
                this.optionNowInCol = {
                    x: &apos;&apos;,
                    y: &apos;&apos;,
                }
                //*****************************&#x68C0;&#x67E5;&#x884C;
                //&#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x7684;&#x503C;
                this.allNumText[_row][_col] = _text;
                let rowCheck = Object.assign(this.allNumText[_row], []);
                this.checkShow = false;
                for (let i = 0, len = rowCheck.length; i &lt; len; i++) {
                    //&#x5982;&#x679C;&#x503C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x5750;&#x6807;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x586B;&#x5199;&#x9519;&#x8BEF;
                    if (_text === rowCheck[i] &amp;&amp; _col !== i) {
                        this.isErr = true;
                        this.isShake = true;
                        //&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x7684;&#x4FE1;&#x606F;
                        this.optionNow = {
                            x: _row,
                            y: _col
                        }
                        //&#x8BB0;&#x5F55;&#x548C;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x884C;&#xFF0C;&#x4EE5;&#x53CA;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                        this.optionNowInRow = {
                            x: _row,
                            y: i
                        }
                    }
                }
                //*****************************&#x68C0;&#x67E5;&#x5217;
                let colCheck = [];
                //&#x9996;&#x5148;&#x628A;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x90A3;&#x4E00;&#x5217;&#x7684;&#x6570;&#x503C;&#x4FDD;&#x5B58;&#x8D77;&#x6765;
                for (let i = 0, len = this.allNumText.length; i &lt; len; i++) {
                    colCheck.push(this.allNumText[i][_col]);
                }
                //&#x904D;&#x5386;&#x68C0;&#x67E5;
                for (let i = 0, len = colCheck.length; i &lt; len; i++) {
                    //&#x5982;&#x679C;&#x503C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x5750;&#x6807;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x586B;&#x5199;&#x9519;&#x8BEF;
                    if (_text === colCheck[i] &amp;&amp; _row !== i) {
                        this.isErr = true;
                        this.isShake = true;
                        //&#x8BB0;&#x5F55;&#x548C;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#xFF0C;&#x4EE5;&#x53CA;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                        this.optionNowInCol = {
                            x: i,
                            y: _col
                        }
                    }
                }
                //&#x5982;&#x679C;&#x53D1;&#x73B0;&#x7684;&#x540C;&#x6837;&#x7684;
                if (this.isErr) {
                    setTimeout(() =&gt; {
                        this.isShake = false;
                    }, 1000)
                    return;
                }
                //&#x5982;&#x679C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x540E;&#xFF0C;&#x957F;&#x5EA6;&#x5C0F;&#x4E8E;9&#xFF0C;&#x5C31;&#x662F;&#x884C;&#x6CA1;&#x5B8C;&#x6210;
                rowCheck = rowCheck.filter(item =&gt; item !== &apos;&apos;);
                if (rowCheck.length !== 9) {
                    console.log(&apos;&#x884C;&#x6CA1;&#x5B8C;&#x6210;&apos;)
                    return;
                }

                let coloCheck = [];
                //&#x5982;&#x679C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x540E;&#xFF0C;&#x957F;&#x5EA6;&#x5C0F;&#x4E8E;9&#xFF0C;&#x5C31;&#x662F;&#x5217;&#x6CA1;&#x5B8C;&#x6210;
                for (let i = 0, len = this.allNumText.length; i &lt; len; i++) {
                    coloCheck = [...new Set(this.allNumText[i])];
                    coloCheck = coloCheck.filter(item =&gt; item !== &apos;&apos;);
                    if (coloCheck.length !== 9) {
                        console.log(&apos;&#x6CA1;&#x5B8C;&#x6210;&apos;)
                        return;
                    }
                }
                alert(&apos;&#x6311;&#x6218;&#x6210;&#x529F;&#xFF0C;&#x4F46;&#x662F;&#x6CA1;&#x5956;&#x54C1;&apos;);
                this.numShow = false;
            }
        },
        mounted(){
            let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let row = [], rowCol = 0;
            for (let i = 0, len = arr1.length; i &lt; len; i++) {
                row = Object.assign([], arr1);
                this.allNum.push(row);
                rowCol = arr1.splice(0, 1)[0];
                arr1.push(rowCol)
            }
            //&#x6253;&#x4E71;&#x884C;
            this.allNum.sort((n1, n2) =&gt; Math.random() - 0.5);
            //&#x968F;&#x673A;&#x83B7;&#x53D6;&#x4E24;&#x5217;&#x7684;&#x7D22;&#x5F15;
            function randomText() {
                let rondomIndex = 0, rondomIndexAfter = 0;
                //&#x83B7;&#x53D6;&#x7B2C;&#x4E00;&#x5217;&#x7684;&#x7D22;&#x5F15;
                rondomIndex = Math.floor(Math.random() * 9);
                function randomDo() {
                    rondomIndexAfter = Math.floor(Math.random() * 9);
                    //&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x5217;&#x548C;&#x7B2C;&#x4E8C;&#x5217;&#x7D22;&#x5F15;&#x4E00;&#x6837;&#xFF0C;&#x7B2C;&#x4E8C;&#x5217;&#x7684;&#x7D22;&#x5F15;&#x518D;&#x6B21;&#x91CD;&#x65B0;&#x83B7;&#x53D6;
                    if (rondomIndexAfter === rondomIndex) {
                        randomDo();
                    }
                }

                randomDo();
                //&#x8FD4;&#x56DE;&#x4E24;&#x5217;&#x7684;&#x7D22;&#x5F15;
                return [rondomIndex, rondomIndexAfter]
            }

            //&#x6253;&#x4E71;&#x5217;
            let randomArr = [], nowValue = 0;
            //&#x540C;&#x6837;&#x904D;&#x5386;9&#x6B21;
            for (let i = 0; i &lt; 9; i++) {
                randomArr = Object.assign([], randomText());
                //&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;&#xFF0C;&#x7ED9;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E24;&#x5217;&#x4EA4;&#x6362;&#x503C;
                for (let j = 0, len = this.allNum.length; j &lt; len; j++) {
                    //&#x968F;&#x673A;&#x4E24;&#x5217;&#x4EA4;&#x6362;&#x503C;
                    nowValue = this.allNum[j][randomArr[0]];
                    this.allNum[j][randomArr[0]] = this.allNum[j][randomArr[1]];
                    this.allNum[j][randomArr[1]] = nowValue;
                }
            }

            //&#x8BB0;&#x5F55;&#x6240;&#x6709;&#x5750;&#x6807;
            let rowText = &apos;&apos;, arrText = []
            for (let i = 0; i &lt; 9; i++) {
                rowText = &apos;&apos;
                for (let j = 0; j &lt; 9; j++) {
                    rowText += i + &apos;-&apos; + j + &apos;,&apos;;
                }
                arrText.push(rowText.substr(0, rowText.length - 1))
            }
            console.log(arrText);
            //&#x968F;&#x673A;&#x638F;&#x7A7A;
            let nowItme = [], _option, nowOption = [];
            for (let i = 0; i &lt; 9; i++) {
                //&#x62BD;&#x53D6;&#x5F53;&#x524D;&#x884C;&#x7684;&#x6240;&#x6709;&#x5750;&#x6807;
                nowItme = arrText[i].split(&apos;,&apos;);
                nowOption = [];
                //&#x5F53;&#x524D;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E24;&#x4E2A;&#x5750;&#x6807;&#x638F;&#x7A7A;
                for (let j = 0; j &lt; 2; j++) {
                    //&#x62BD;&#x53D6;&#x5F53;&#x524D;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E00;&#x4E2A;&#x5750;&#x6807;
                    _option = Math.floor(Math.random() * nowItme.length);
                    //&#x5206;&#x5272;&#x5750;&#x6807;&#x7684;x,y
                    nowOption = nowItme.splice(_option,1)[0].split(&quot;-&quot;);
                    this.allNum[nowOption[0]][nowOption[1]] = &apos;&apos;;
                }

            }
            //&#x6DF1;&#x5EA6;&#x62F7;&#x8D1D;&#x6570;&#x72EC;&#x7684;&#x6570;&#x5B57;
            this.allNumText = JSON.parse(JSON.stringify(this.allNum));
        }
    })
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;vue-&#x6240;&#x8C13;&#x7684;&#x6570;&#x72EC;&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;../../reset.css&quot;&gt;
    &lt;style&gt;
        li{
            list-style-type: none;
        }
        .shake {
            animation: shake-opacity 500ms 1 ease-in-out;
        }
        @keyframes shake-opacity {
            0% {
                transform: translate(0px, 0px) rotate(0deg);
                opacity: 0.6;
            }
            10% {
                transform: translate(-2px, -1px) rotate(-0.5deg);
                opacity: 0.5;
            }
            20% {
                transform: translate(-4px, 4px) rotate(1.5deg);
                opacity: 0.4;
            }
            30% {
                transform: translate(-4px, -1px) rotate(-1.5deg);
                opacity: 0.8;
            }
            40% {
                transform: translate(-2px, -1px) rotate(-2.5deg);
                opacity: 0.3;
            }
            50% {
                transform: translate(-4px, 1px) rotate(-2.5deg);
                opacity: 0.5;
            }
            60% {
                transform: translate(-2px, 4px) rotate(0.5deg);
                opacity: 0.1;
            }
            70% {
                transform: translate(-3px, 1px) rotate(-0.5deg);
                opacity: 0.4;
            }
            80% {
                transform: translate(0px, 0px) rotate(-0.5deg);
                opacity: 0.5;
            }
            90% {
                transform: translate(2px, -1px) rotate(-2.5deg);
                opacity: 0.8;
            }
        }
        .num-box {
            margin: 0 auto;
            width: 540px;
            position: relative;
        }
        .num-box .num-check {
            position: absolute;
            width: 180px;
            box-shadow: 0 0 10px 0 #000;
            left: 0;
            top: 0;
        }
        .num-box .num-check li {
            box-sizing: border-box;
            float: left;
            background: #fff;
            color: #58B7FF;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            font-size: 24px;
            border: 1px solid #58B7FF;
            cursor: pointer;
            transition: all .5s;
        }
        .num-box .num-check li:hover {
            color: #fff;
            background: #58B7FF;
            border: 1px solid #fff;
        }
        .num-tips{
            color: #333;
            line-height: 32px;
            font-size: 16px;
        }
        .num-table{
            position: relative;
        }
        .num-row {
            font-size: 0;
        }
        .num-row:hover .num-col, .num-row:hover .num-col.no, .num-row:hover .num-col.cur-col {
            background: #0068b7;
        }
        .num-row .num-col {
            width: 60px;
            height: 60px;
            line-height: 60px;
            float: left;
            box-sizing: border-box;
            text-align: center;
            background: #58B7FF;
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            border: 1px solid #ccc;
        }
        .num-row .num-col.no {
            background: #ccc;
            border: 1px solid #fff;
        }
        .num-row .num-col.err {
            color: #ff4949;
        }
        .num-row .num-col.cur-col {
            background: #0068b7;
        }
        .num-row .num-col.cur {
            background: #fff !important;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;num-box&quot; v-show=&quot;numShow&quot; id=&quot;num&quot;&gt;
    &lt;div class=&quot;num-tips&quot;&gt;
        &lt;p&gt;&#x6240;&#x8C13;&#x7684;&#x6570;&#x72EC;&#xFF1A;&#x89C4;&#x5219;&lt;/p&gt;
        &lt;p&gt;1.&#x6BCF;&#x4E00;&#x884C;&#x6570;&#x5B57;&#x4E0D;&#x91CD;&#x590D;&lt;/p&gt;
        &lt;p&gt;2.&#x6BCF;&#x4E00;&#x5217;&#x6570;&#x5B57;&#x4E0D;&#x91CD;&#x590D;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;num-table&quot; @mouseleave=&quot;hoverCol=&apos;&apos;&quot; :class=&quot;{&apos;shake&apos;:isShake}&quot;&gt;
        &lt;!--&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;--&gt;
        &lt;div v-for=&quot;row,index in allNum&quot; class=&quot;num-row clear&quot;&gt;
            &lt;!--&#x904D;&#x5386;&#x884C;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E00;&#x5217;--&gt;
            &lt;!--
                no:&#x88AB;&#x638F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x6837;&#x5F0F;
                cur:&#x683C;&#x5B50;&#x88AB;&#x70B9;&#x51FB;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x88AB;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x6837;&#x5F0F;
                cur-col:&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#xFF0C;&#x548C;&#x88AB;&#x70B9;&#x51FB;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#x7684;&#x683C;&#x5B50;&#x7684;&#x6837;&#x5F0F;
                err&#xFF1A;&#x586B;&#x5199;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x7684;&#x6837;&#x5F0F;
            --&gt;
            &lt;div v-for=&quot;num1,indexSub in row&quot;
                 :class=&quot;{&apos;no&apos;:num1===&apos;&apos;,
                 &apos;cur&apos;:curRow===index&amp;&amp;indexSub===curCol,
                 &apos;cur-col&apos;:hoverCol===indexSub,
                 &apos;err&apos;:(optionNow.x===index&amp;&amp;optionNow.y===indexSub)||(optionNowInRow.x===index&amp;&amp;optionNowInRow.y===indexSub)||(optionNowInCol.x===index&amp;&amp;optionNowInCol.y===indexSub)}&quot;
                 @click=&quot;showCheck(index,indexSub)&quot; @mouseenter=&quot;hoverCol=indexSub;&quot; class=&quot;num-col&quot;&gt;
                {{allNumText[index][indexSub]}}

            &lt;/div&gt;
        &lt;/div&gt;
        &lt;!--&#x6570;&#x5B57;&#x952E;&#x76D8;--&gt;
        &lt;div class=&quot;num-check clear&quot; :style=&quot;{&apos;top&apos;:(curRow+1)*60+&apos;px&apos;,&apos;left&apos;:(curCol+1)*60+&apos;px&apos;}&quot;
             v-show=&quot;checkShow&quot;&gt;
            &lt;ul&gt;
                &lt;li @click=&quot;inputText(1)&quot;&gt;1&lt;/li&gt;
                &lt;li @click=&quot;inputText(2)&quot;&gt;2&lt;/li&gt;
                &lt;li @click=&quot;inputText(3)&quot;&gt;3&lt;/li&gt;
                &lt;li @click=&quot;inputText(4)&quot;&gt;4&lt;/li&gt;
                &lt;li @click=&quot;inputText(5)&quot;&gt;5&lt;/li&gt;
                &lt;li @click=&quot;inputText(6)&quot;&gt;6&lt;/li&gt;
                &lt;li @click=&quot;inputText(7)&quot;&gt;7&lt;/li&gt;
                &lt;li @click=&quot;inputText(8)&quot;&gt;8&lt;/li&gt;
                &lt;li @click=&quot;inputText(9)&quot;&gt;9&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;script src=&quot;../vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    new Vue({
        el:&apos;#num&apos;,
        data:{
                name: &apos;welcome&apos;,
                testText: &apos;&#x6B22;&#x8FCE;&#x6765;&#x5230;&apos;,
                nowIndex: 0,
                allNum: [],//&#x6570;&#x5B57;&#x6392;&#x5217;
                answer: [],//&#x6240;&#x6709;&#x7B54;&#x6848;&#x7684;&#x5750;&#x6807;&#x70B9;
                allNumText: [],//&#x6570;&#x5B57;&#xFF0C;&#x5305;&#x62EC;&#x8F93;&#x5165;&#x540E;&#x7684;&#x6570;&#x5B57;
                curRow: &apos;&apos;,//&#x5F53;&#x524D;&#x683C;&#x5B50;&#x6240;&#x5728;&#x7684;&#x884C;&#x7684;&#x7D22;&#x5F15;
                curCol: &apos;&apos;,//&#x5F53;&#x524D;&#x683C;&#x5B50;&#x6240;&#x5728;&#x7684;&#x5217;&#x7684;&#x7D22;&#x5F15;
                checkShow: false,//&#x6570;&#x5B57;&#x952E;&#x76D8;&#x7684;&#x663E;&#x793A;
                hoverCol: &apos;&apos;,//&#x9F20;&#x6807;&#x8FDB;&#x53BB;&#x7684;&#x5F53;&#x524D;&#x5217;
                hoverRow: 0,//&#x9F20;&#x6807;&#x8FDB;&#x5165;&#x7684;&#x5F53;&#x524D;&#x884C;
                numShow: true,//&#x6570;&#x72EC;&#x7684;&#x663E;&#x793A;
                optionNow: {},//&#x8F93;&#x5165;&#x540E;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                optionNowInRow: {},//&#x548C;&#x8F93;&#x5165;&#x540E;&#x7684;&#x683C;&#x5B50;&#x5728;&#x540C;&#x4E00;&#x884C;&#xFF0C;&#x5E76;&#x4E14;&#x540C;&#x6837;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                optionNowInCol: {},//&#x548C;&#x8F93;&#x5165;&#x540E;&#x7684;&#x683C;&#x5B50;&#x5728;&#x540C;&#x4E00;&#x5217;&#xFF0C;&#x5E76;&#x4E14;&#x540C;&#x6837;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                isErr: false,//&#x662F;&#x5426;&#x8F93;&#x5165;&#x9519;&#x8BEF;&#x540E;
                isShake: false//&#x662F;&#x5426;&#x663E;&#x793A;&#x9707;&#x52A8;&#x7684;&#x6837;&#x5F0F;
        },
        methods: {
            /**
             * @description &#x663E;&#x793A;&#x6570;&#x5B57;&#x952E;&#x76D8;
             * @param i1
             * @param i2
             */
            showCheck(i1, i2){
                //&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x662F;&#x5426;&#x662F;&#x88AB;&#x638F;&#x7A7A;&#x7684;&#x683C;&#x5B50;
                if (this.allNum[i1][i2] !== &apos;&apos;) {
                    return
                }
                //&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#x5982;&#x679C;&#x662F;&#x4E0A;&#x4E00;&#x6B21;&#x70B9;&#x51FB;&#x7684;&#x683C;&#x5B50;&#xFF08;&#x5F53;&#x524D;&#x683C;&#x5B50;&#xFF09;
                if (i1 === this.curRow &amp;&amp; i2 === this.curCol) {
                    //&#x9690;&#x85CF;&#x6570;&#x5B57;&#x952E;&#x76D8;&#xFF0C;curRow&#x548C;curCol&#x8BBE;&#x7A7A;
                    this.checkShow = false;
                    this.curRow = &apos;&apos;;
                    this.curCol = &apos;&apos;;
                }
                else {
                    //&#x9690;&#x85CF;&#x6570;&#x5B57;&#x952E;&#x76D8;&#xFF0C;curRow&#x548C;curCol&#x5206;&#x522B;&#x8BBE;&#x7F6E;&#x6210;&#x5F53;&#x524D;&#x7684;&#x70B9;
                    this.checkShow = true;
                    this.curRow = i1;
                    this.curCol = i2;
                }
            },
            inputText(_text){
                //*****************************&#x68C0;&#x67E5;&#x524D;&#x7684;&#x521D;&#x59CB;&#x5316;
                let _row = this.curRow, _col = this.curCol;
                this.curRow = &apos;&apos;;
                this.curCol = &apos;&apos;;
                this.isErr = false;
                this.optionNow = {
                    x: &apos;&apos;,
                    y: &apos;&apos;,
                }
                this.optionNowInRow = {
                    x: &apos;&apos;,
                    y: &apos;&apos;,
                }
                this.optionNowInCol = {
                    x: &apos;&apos;,
                    y: &apos;&apos;,
                }
                //*****************************&#x68C0;&#x67E5;&#x884C;
                //&#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x7684;&#x503C;
                this.allNumText[_row][_col] = _text;
                let rowCheck = Object.assign(this.allNumText[_row], []);
                this.checkShow = false;
                for (let i = 0, len = rowCheck.length; i &lt; len; i++) {
                    //&#x5982;&#x679C;&#x503C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x5750;&#x6807;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x586B;&#x5199;&#x9519;&#x8BEF;
                    if (_text === rowCheck[i] &amp;&amp; _col !== i) {
                        this.isErr = true;
                        this.isShake = true;
                        //&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x7684;&#x4FE1;&#x606F;
                        this.optionNow = {
                            x: _row,
                            y: _col
                        }
                        //&#x8BB0;&#x5F55;&#x548C;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x884C;&#xFF0C;&#x4EE5;&#x53CA;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                        this.optionNowInRow = {
                            x: _row,
                            y: i
                        }
                    }
                }
                //*****************************&#x68C0;&#x67E5;&#x5217;
                let colCheck = [];
                //&#x9996;&#x5148;&#x628A;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x90A3;&#x4E00;&#x5217;&#x7684;&#x6570;&#x503C;&#x4FDD;&#x5B58;&#x8D77;&#x6765;
                for (let i = 0, len = this.allNumText.length; i &lt; len; i++) {
                    colCheck.push(this.allNumText[i][_col]);
                }
                //&#x904D;&#x5386;&#x68C0;&#x67E5;
                for (let i = 0, len = colCheck.length; i &lt; len; i++) {
                    //&#x5982;&#x679C;&#x503C;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x5750;&#x6807;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x5C31;&#x662F;&#x586B;&#x5199;&#x9519;&#x8BEF;
                    if (_text === colCheck[i] &amp;&amp; _row !== i) {
                        this.isErr = true;
                        this.isShake = true;
                        //&#x8BB0;&#x5F55;&#x548C;&#x5F53;&#x524D;&#x683C;&#x5B50;&#x540C;&#x4E00;&#x5217;&#xFF0C;&#x4EE5;&#x53CA;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x7684;&#x683C;&#x5B50;&#x7684;&#x5750;&#x6807;
                        this.optionNowInCol = {
                            x: i,
                            y: _col
                        }
                    }
                }
                //&#x5982;&#x679C;&#x53D1;&#x73B0;&#x7684;&#x540C;&#x6837;&#x7684;
                if (this.isErr) {
                    setTimeout(() =&gt; {
                        this.isShake = false;
                    }, 1000)
                    return;
                }
                //&#x5982;&#x679C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x540E;&#xFF0C;&#x957F;&#x5EA6;&#x5C0F;&#x4E8E;9&#xFF0C;&#x5C31;&#x662F;&#x884C;&#x6CA1;&#x5B8C;&#x6210;
                rowCheck = rowCheck.filter(item =&gt; item !== &apos;&apos;);
                if (rowCheck.length !== 9) {
                    console.log(&apos;&#x884C;&#x6CA1;&#x5B8C;&#x6210;&apos;)
                    return;
                }

                let coloCheck = [];
                //&#x5982;&#x679C;&#x6570;&#x7EC4;&#x53BB;&#x91CD;&#x540E;&#xFF0C;&#x957F;&#x5EA6;&#x5C0F;&#x4E8E;9&#xFF0C;&#x5C31;&#x662F;&#x5217;&#x6CA1;&#x5B8C;&#x6210;
                for (let i = 0, len = this.allNumText.length; i &lt; len; i++) {
                    coloCheck = [...new Set(this.allNumText[i])];
                    coloCheck = coloCheck.filter(item =&gt; item !== &apos;&apos;);
                    if (coloCheck.length !== 9) {
                        console.log(&apos;&#x6CA1;&#x5B8C;&#x6210;&apos;)
                        return;
                    }
                }
                alert(&apos;&#x6311;&#x6218;&#x6210;&#x529F;&#xFF0C;&#x4F46;&#x662F;&#x6CA1;&#x5956;&#x54C1;&apos;);
                this.numShow = false;
            }
        },
        mounted(){
            let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let row = [], rowCol = 0;
            for (let i = 0, len = arr1.length; i &lt; len; i++) {
                row = Object.assign([], arr1);
                this.allNum.push(row);
                rowCol = arr1.splice(0, 1)[0];
                arr1.push(rowCol)
            }
            //&#x6253;&#x4E71;&#x884C;
            this.allNum.sort((n1, n2) =&gt; Math.random() - 0.5);
            //&#x968F;&#x673A;&#x83B7;&#x53D6;&#x4E24;&#x5217;&#x7684;&#x7D22;&#x5F15;
            function randomText() {
                let rondomIndex = 0, rondomIndexAfter = 0;
                //&#x83B7;&#x53D6;&#x7B2C;&#x4E00;&#x5217;&#x7684;&#x7D22;&#x5F15;
                rondomIndex = Math.floor(Math.random() * 9);
                function randomDo() {
                    rondomIndexAfter = Math.floor(Math.random() * 9);
                    //&#x5982;&#x679C;&#x7B2C;&#x4E00;&#x5217;&#x548C;&#x7B2C;&#x4E8C;&#x5217;&#x7D22;&#x5F15;&#x4E00;&#x6837;&#xFF0C;&#x7B2C;&#x4E8C;&#x5217;&#x7684;&#x7D22;&#x5F15;&#x518D;&#x6B21;&#x91CD;&#x65B0;&#x83B7;&#x53D6;
                    if (rondomIndexAfter === rondomIndex) {
                        randomDo();
                    }
                }

                randomDo();
                //&#x8FD4;&#x56DE;&#x4E24;&#x5217;&#x7684;&#x7D22;&#x5F15;
                return [rondomIndex, rondomIndexAfter]
            }

            //&#x6253;&#x4E71;&#x5217;
            let randomArr = [], nowValue = 0;
            //&#x540C;&#x6837;&#x904D;&#x5386;9&#x6B21;
            for (let i = 0; i &lt; 9; i++) {
                randomArr = Object.assign([], randomText());
                //&#x904D;&#x5386;&#x6BCF;&#x4E00;&#x884C;&#xFF0C;&#x7ED9;&#x6BCF;&#x4E00;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E24;&#x5217;&#x4EA4;&#x6362;&#x503C;
                for (let j = 0, len = this.allNum.length; j &lt; len; j++) {
                    //&#x968F;&#x673A;&#x4E24;&#x5217;&#x4EA4;&#x6362;&#x503C;
                    nowValue = this.allNum[j][randomArr[0]];
                    this.allNum[j][randomArr[0]] = this.allNum[j][randomArr[1]];
                    this.allNum[j][randomArr[1]] = nowValue;
                }
            }

            //&#x8BB0;&#x5F55;&#x6240;&#x6709;&#x5750;&#x6807;
            let rowText = &apos;&apos;, arrText = []
            for (let i = 0; i &lt; 9; i++) {
                rowText = &apos;&apos;
                for (let j = 0; j &lt; 9; j++) {
                    rowText += i + &apos;-&apos; + j + &apos;,&apos;;
                }
                arrText.push(rowText.substr(0, rowText.length - 1))
            }
            console.log(arrText);
            //&#x968F;&#x673A;&#x638F;&#x7A7A;
            let nowItme = [], _option, nowOption = [];
            for (let i = 0; i &lt; 9; i++) {
                //&#x62BD;&#x53D6;&#x5F53;&#x524D;&#x884C;&#x7684;&#x6240;&#x6709;&#x5750;&#x6807;
                nowItme = arrText[i].split(&apos;,&apos;);
                nowOption = [];
                //&#x5F53;&#x524D;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E24;&#x4E2A;&#x5750;&#x6807;&#x638F;&#x7A7A;
                for (let j = 0; j &lt; 2; j++) {
                    //&#x62BD;&#x53D6;&#x5F53;&#x524D;&#x884C;&#x7684;&#x968F;&#x673A;&#x4E00;&#x4E2A;&#x5750;&#x6807;
                    _option = Math.floor(Math.random() * nowItme.length);
                    //&#x5206;&#x5272;&#x5750;&#x6807;&#x7684;x,y
                    nowOption = nowItme.splice(_option,1)[0].split(&quot;-&quot;);
                    this.allNum[nowOption[0]][nowOption[1]] = &apos;&apos;;
                }

            }
            //&#x6DF1;&#x5EA6;&#x62F7;&#x8D1D;&#x6570;&#x72EC;&#x7684;&#x6570;&#x5B57;
            this.allNumText = JSON.parse(JSON.stringify(this.allNum));
        }
    })
&lt;/script&gt;
&lt;/html&gt;</code></pre><p><code>reset.css</code>&#x548C;<code>vue.min.js</code>&#x5927;&#x5BB6;&#x81EA;&#x884C;&#x5230;<code>github</code>&#x4E0B;&#x8F7D;&#xFF01;</p><h2 id="articleHeader11">5.&#x5C0F;&#x7ED3;</h2><p>&#x597D;&#x4E86;&#xFF0C;&#x7528;vue&#x505A;&#x7684;&#x6240;&#x8C13;&#x7684;&#x6570;&#x72EC;&#xFF0C;&#x5C31;&#x5199;&#x5230;&#x8FD9;&#x91CC;&#x4E86;&#xFF0C;&#x4E3B;&#x8981;&#x5C31;&#x662F;&#x903B;&#x8F91;&#x6709;&#x70B9;&#x7ED5;&#xFF0C;&#x5176;&#x5B83;&#x7684;&#x95EE;&#x9898;&#x76F8;&#x4FE1;&#x90FD;&#x96BE;&#x4E0D;&#x5012;&#x5927;&#x5BB6;&#x3002;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x6BD4;&#x4E4B;&#x524D;&#x5FEB;&#x901F;&#x5165;&#x95E8;&#x7684;&#x4E09;&#x4E2A;&#x5C0F;&#x5B9E;&#x4F8B;&#x8981;&#x9EBB;&#x70E6;&#x4E00;&#x70B9;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF01;&#x5927;&#x5BB6;&#x53EA;&#x8981;&#x7A0D;&#x5FAE;&#x770B;&#x4E0B;&#x4F30;&#x8BA1;&#x90FD;&#x4E0D;&#x96BE;&#x7406;&#x89E3;&#xFF01;&#x6700;&#x540E;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x89C9;&#x5F97;&#x6587;&#x7AE0;&#x5199;&#x5F97;&#x4E0D;&#x597D;&#xFF0C;&#x54EA;&#x91CC;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x6B22;&#x8FCE;&#x7ED9;&#x5EFA;&#x8BAE;&#x6216;&#x8005;&#x6307;&#x70B9;&#x4E0B;&#x8FF7;&#x6D25;&#x3002;&#x671F;&#x5F85;&#x548C;&#x5927;&#x5BB6;&#x4EA4;&#x6D41;&#x610F;&#x89C1;&#xFF0C;&#x5171;&#x540C;&#x8FDB;&#x6B65;&#xFF01;</p><p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------<br>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x5173;&#x6CE8;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p><p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue开发一个所谓的数独

## 原文链接
[https://segmentfault.com/a/1190000012517876](https://segmentfault.com/a/1190000012517876)

