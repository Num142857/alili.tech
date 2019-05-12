---
title: 'JavaScript实现简单二叉查找树' 
date: 2018-11-18 3:32:07
hidden: true
slug: b610xghu3j4
categories: [reprint]
---

{{< raw >}}
<p>&#x524D;&#x4E24;&#x5929;&#x63A5;&#x5230;&#x4E86;&#x8682;&#x8681;&#x91D1;&#x670D;&#x7684;&#x9762;&#x8BD5;&#x7535;&#x8BDD;&#xFF0C;&#x9762;&#x8BD5;&#x5B98;&#x5F88;&#x76F4;&#x63A5;&#xFF0C;&#x4E0A;&#x6765;&#x5C31;&#x629B;&#x51FA;&#x4E86;&#x4E09;&#x9053;&#x7B97;&#x6CD5;&#x9898;&#x3002;&#x3002;&#x3002;</p><p>&#x5176;&#x4E2D;&#x6709;&#x4E00;&#x9053;&#x5173;&#x4E8E;&#x4E8C;&#x53C9;&#x6811;&#x5B9E;&#x73B0;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#x7684;&#xFF0C;&#x5F53;&#x65F6;&#x6CA1;&#x56DE;&#x7B54;&#x597D;&#xFF0C;&#x6240;&#x4EE5;&#x7279;&#x610F;&#x5B66;&#x4E60;&#x4E86;&#x4E00;&#x628A;&#x4E8C;&#x53C9;&#x6811;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x884C;&#x6587;&#x8BB0;&#x5F55;&#x603B;&#x7ED3;&#x3002;</p><h1 id="articleHeader0">&#x4E8C;&#x53C9;&#x6811;&amp;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;</h1><p><span class="img-wrap"><img data-src="/img/remote/1460000015868363?w=615&amp;h=422" src="https://static.alili.tech/img/remote/1460000015868363?w=615&amp;h=422" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x6811;&#x76F8;&#x5173;&#x672F;&#x8BED;&#xFF1A;</h2><p>&#x8282;&#x70B9;&#xFF1A; &#x6811;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x79F0;&#x4E3A;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;</p><p>&#x6839;&#x8282;&#x70B9;&#xFF1A; &#x4F4D;&#x4E8E;&#x6574;&#x68F5;&#x6811;&#x9876;&#x70B9;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x5B83;&#x6CA1;&#x6709;&#x7236;&#x8282;&#x70B9;&#xFF0C; &#x5982;&#x4E0A;&#x56FE; 5</p><p>&#x5B50;&#x8282;&#x70B9;&#xFF1A; &#x5176;&#x4ED6;&#x8282;&#x70B9;&#x7684;&#x540E;&#x4EE3;</p><p>&#x53F6;&#x5B50;&#x8282;&#x70B9;: &#x6CA1;&#x6709;&#x5B50;&#x8282;&#x70B9;&#x7684;&#x5143;&#x7D20;&#x79F0;&#x4E3A;&#x53F6;&#x5B50;&#x8282;&#x70B9;&#xFF0C; &#x5982;&#x4E0A;&#x56FE; 3 8 24</p><p>&#x4E8C;&#x53C9;&#x6811;&#xFF1A;&#x4E8C;&#x53C9;&#x6811;&#x5C31;&#x662F;&#x4E00;&#x79CD;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF0C; &#x5B83;&#x7684;&#x7EC4;&#x7EC7;&#x5173;&#x7CFB;&#x5C31;&#x50CF;&#x662F;&#x81EA;&#x7136;&#x754C;&#x4E2D;&#x7684;&#x6811;&#x4E00;&#x6837;&#x3002;&#x5B98;&#x65B9;&#x8BED;&#x8A00;&#x7684;&#x5B9A;&#x4E49;&#x662F;&#xFF1A;&#x662F;&#x4E00;&#x4E2A;&#x6709;&#x9650;&#x5143;&#x7D20;&#x7684;&#x96C6;&#x5408;,&#x8BE5;&#x96C6;&#x5408;&#x6216;&#x8005;&#x4E3A;&#x7A7A;&#x3001;&#x6216;&#x8005;&#x7531;&#x4E00;&#x4E2A;&#x79F0;&#x4E3A;&#x6839;&#x7684;&#x5143;&#x7D20;&#x53CA;&#x4E24;&#x4E2A;&#x4E0D;&#x76F8;&#x4EA4;&#x7684;&#x3001;&#x88AB;&#x5206;&#x522B;&#x79F0;&#x4E3A;&#x5DE6;&#x5B50;&#x6811;&#x548C;&#x53F3;&#x5B50;&#x6811;&#x7684;&#x4E8C;&#x53C9;&#x6811;&#x7EC4;&#x6210;&#x3002;</p><p>&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#xFF1A;<br>&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#x4E5F;&#x53EB;&#x4E8C;&#x53C9;&#x641C;&#x7D22;&#x6811;&#xFF08;BST&#xFF09;,&#x5B83;&#x53EA;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x5728;&#x5DE6;&#x8282;&#x70B9;&#x5B58;&#x50A8;&#x6BD4;&#x7236;&#x8282;&#x70B9;&#x66F4;&#x5C0F;&#x7684;&#x503C;&#xFF0C;&#x53F3;&#x8282;&#x70B9;&#x5B58;&#x50A8;&#x6BD4;&#x7236;&#x8282;&#x70B9;&#x66F4;&#x5927;&#x7684;&#x503C;&#xFF0C;&#x4E0A;&#x56FE;&#x5C55;&#x793A;&#x7684;&#x5C31;&#x662F;&#x4E00;&#x9897;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#x3002;</p><h1 id="articleHeader2">&#x4EE3;&#x7801;&#x5B9E;&#x73B0;</h1><p>&#x9996;&#x5148;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7C7B;&#x6765;&#x8868;&#x793A;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#xFF0C;&#x5B83;&#x7684;&#x5185;&#x90E8;&#x5E94;&#x8BE5;&#x6709;&#x4E00;&#x4E2A;Node&#x7C7B;&#xFF0C;&#x7528;&#x6765;&#x521B;&#x5EFA;&#x8282;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function BinarySearchTree () {
        var Node = function(key) {
            this.key = key,
            this.left = null,
            this.right = null
        }
        var root = null
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BinarySearchTree</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">var</span> Node = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(key)</span> </span>{
            <span class="hljs-keyword">this</span>.key = key,
            <span class="hljs-keyword">this</span>.left = <span class="hljs-literal">null</span>,
            <span class="hljs-keyword">this</span>.right = <span class="hljs-literal">null</span>
        }
        <span class="hljs-keyword">var</span> root = <span class="hljs-literal">null</span>
    }</code></pre><p>&#x5B83;&#x8FD8;&#x5E94;&#x8BE5;&#x6709;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>insert(key) &#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x952E;</li><li>inOrderTraverse() &#x5BF9;&#x6811;&#x8FDB;&#x884C;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#xFF0C;&#x5E76;&#x6253;&#x5370;&#x7ED3;&#x679C;</li><li>preOrderTraverse() &#x5BF9;&#x6811;&#x8FDB;&#x884C;&#x5148;&#x5E8F;&#x904D;&#x5386;&#xFF0C;&#x5E76;&#x6253;&#x5370;&#x7ED3;&#x679C;</li><li>postOrderTraverse() &#x5BF9;&#x6811;&#x8FDB;&#x884C;&#x540E;&#x5E8F;&#x904D;&#x5386;&#xFF0C;&#x5E76;&#x6253;&#x5370;&#x7ED3;&#x679C;</li><li>search(key) &#x67E5;&#x627E;&#x6811;&#x4E2D;&#x7684;&#x952E;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x5728;&#x8FD4;&#x56DE;true,&#x4E0D;&#x5B58;&#x5728;&#x8FD4;&#x56DE;fasle</li><li>findMin() &#x8FD4;&#x56DE;&#x6811;&#x4E2D;&#x7684;&#x6700;&#x5C0F;&#x503C;</li><li>findMax() &#x8FD4;&#x56DE;&#x6811;&#x4E2D;&#x7684;&#x6700;&#x5927;&#x503C;</li><li>remove(key) &#x5220;&#x9664;&#x6811;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x952E;</li></ul><h2 id="articleHeader3">&#x5411;&#x6811;&#x4E2D;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x952E;</h2><p>&#x5411;&#x6811;&#x4E2D;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x952E;&#xFF0C;&#x9996;&#x9875;&#x5E94;&#x8BE5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x8868;&#x793A;&#x65B0;&#x8282;&#x70B9;&#x7684;Node&#x7C7B;&#x5B9E;&#x4F8B;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;new&#x4E00;&#x4E0B;Node&#x7C7B;&#x5E76;&#x4F20;&#x5165;&#x9700;&#x8981;&#x63D2;&#x5165;&#x7684;key&#x503C;&#xFF0C;&#x5B83;&#x4F1A;&#x81EA;&#x52A8;&#x521D;&#x59CB;&#x5316;&#x4E3A;&#x5DE6;&#x53F3;&#x8282;&#x70B9;&#x4E3A;null&#x7684;&#x4E00;&#x4E2A;&#x65B0;&#x8282;&#x70B9;</p><p>&#x7136;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E9B;&#x5224;&#x65AD;&#xFF0C;&#x5148;&#x5224;&#x65AD;&#x6811;&#x662F;&#x5426;&#x4E3A;&#x7A7A;&#xFF0C;&#x82E5;&#x4E3A;&#x7A7A;&#xFF0C;&#x65B0;&#x63D2;&#x5165;&#x7684;&#x8282;&#x70B9;&#x5C31;&#x4F5C;&#x4E3A;&#x6839;&#x8282;&#x70B9;&#xFF0C;&#x5982;&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;insertNode()&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x6839;&#x8282;&#x70B9;&#x548C;&#x65B0;&#x8282;&#x70B9;&#x4F20;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.insert = function(key) {
        var newNode = new Node(key)
        if(root === null) {
            root = newNode
        } else {
            insertNode(root, newNode)
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>    <span class="hljs-built_in">this</span>.insert = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(key) {
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Node</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Node</span>(key)
        <span class="hljs-keyword">if</span>(root === <span class="hljs-literal">null</span>) {
            root = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>
        } <span class="hljs-keyword">else</span> {
            insertNode(root, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>)
        }
    }</code></pre><p>&#x5B9A;&#x4E49;&#x4E00;&#x4E0B;insertNode() &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x901A;&#x8FC7;&#x9012;&#x5F52;&#x5F97;&#x8C03;&#x7528;&#x81EA;&#x8EAB;&#xFF0C;&#x6765;&#x627E;&#x5230;&#x65B0;&#x6DFB;&#x52A0;&#x8282;&#x70B9;&#x7684;&#x5408;&#x9002;&#x4F4D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var insertNode = function(node, newNode) {
        if (newNode.key &lt;= node.key) {
            if (node.left === null) {
                node.left = newNode
            }else {
                insertNode(node.left, newNode)
            }
        }else {
            if (node.right === null) {
                node.right = newNode
            }else {
                insertNode(node.right, newNode)
            }
        }
    } " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>    <span class="hljs-keyword">var</span> insertNode = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(node, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Node</span>.key &lt;= node.key) {
            <span class="hljs-keyword">if</span> (node.left === <span class="hljs-literal">null</span>) {
                node.left = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>
            }<span class="hljs-keyword">else</span> {
                insertNode(node.left, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>)
            }
        }<span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span> (node.right === <span class="hljs-literal">null</span>) {
                node.right = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>
            }<span class="hljs-keyword">else</span> {
                insertNode(node.right, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>)
            }
        }
    } </code></pre><h2 id="articleHeader4">&#x5B8C;&#x6210;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#x65B9;&#x6CD5;</h2><p>&#x8981;&#x5B9E;&#x73B0;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;inOrderTraverseNode(node)&#x65B9;&#x6CD5;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x81EA;&#x8EAB;&#x6765;&#x904D;&#x5386;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.inOrderTraverse = function() {
        inOrderTraverseNode(root)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>    <span class="hljs-keyword">this</span>.inOrderTraverse = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        inOrderTraverseNode(root)
    }</code></pre><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4F1A;&#x6253;&#x5370;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x7684;key&#x503C;&#xFF0C;&#x5B83;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x9012;&#x5F52;&#x7EC8;&#x6B62;&#x6761;&#x4EF6;&#x2014;&#x2014;&#x2014;&#x2014;&#x68C0;&#x67E5;&#x4F20;&#x5165;&#x7684;node&#x662F;&#x5426;&#x4E3A;null&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x5C31;&#x7EE7;&#x7EED;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x81EA;&#x8EAB;&#x68C0;&#x67E5;node&#x7684;left&#x3001;right&#x8282;&#x70B9;<br>&#x5B9E;&#x73B0;&#x8D77;&#x6765;&#x4E5F;&#x5F88;&#x7B80;&#x5355;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var inOrderTraverseNode = function(node) {
        if (node !== null) {
            inOrderTraverseNode(node.left)
            console.log(node.key)
            inOrderTraverseNode(node.right)
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>    var inOrderTraverseNode = function(<span class="hljs-keyword">node</span><span class="hljs-title">) {
        if</span> (<span class="hljs-keyword">node</span> <span class="hljs-title">!== null</span>) {
            inOrderTraverseNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>)
            console.log(<span class="hljs-keyword">node</span>.<span class="hljs-title">key</span>)
            inOrderTraverseNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>)
        }
    }</code></pre><h2 id="articleHeader5">&#x5148;&#x5E8F;&#x904D;&#x5386;&#x3001;&#x540E;&#x5E8F;&#x904D;&#x5386;</h2><p>&#x6709;&#x4E86;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x7A0D;&#x4F5C;&#x6539;&#x52A8;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5148;&#x5E8F;&#x904D;&#x5386;&#x548C;&#x540E;&#x5E8F;&#x904D;&#x5386;&#x4E86;<br>&#x4E0A;&#x4EE3;&#x7801;&#xFF1A;</p><p>&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5BF9;&#x6574;&#x68F5;&#x6811;&#x8FDB;&#x884C;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x5B9E;&#x73B0;&#x5148;&#x5E8F;&#x904D;&#x5386;
    this.preOrderTraverse = function() {
        preOrderTraverseNode(root)
    }
    var preOrderTraverseNode = function(node) {
        if (node !== null) {
            console.log(node.key)
            preOrderTraverseNode(node.left)
            preOrderTraverseNode(node.right)
        }
    }

    // &#x5B9E;&#x73B0;&#x540E;&#x5E8F;&#x904D;&#x5386;
    this.postOrderTraverse = function() {
        postOrderTraverseNode(root)
    }
    var postOrderTraverseNode = function(node) {
        if (node !== null) {
            postOrderTraverseNode(node.left)
            postOrderTraverseNode(node.right)
            console.log(node.key)
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>    // &#x5B9E;&#x73B0;&#x5148;&#x5E8F;&#x904D;&#x5386;
    this.preOrderTraverse = function() {
        preOrderTraverseNode(root)
    }
    var preOrderTraverseNode = function(<span class="hljs-keyword">node</span><span class="hljs-title">) {
        if</span> (<span class="hljs-keyword">node</span> <span class="hljs-title">!== null</span>) {
            console.log(<span class="hljs-keyword">node</span>.<span class="hljs-title">key</span>)
            preOrderTraverseNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>)
            preOrderTraverseNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>)
        }
    }

    // &#x5B9E;&#x73B0;&#x540E;&#x5E8F;&#x904D;&#x5386;
    this.postOrderTraverse = function() {
        postOrderTraverseNode(root)
    }
    var postOrderTraverseNode = function(<span class="hljs-keyword">node</span><span class="hljs-title">) {
        if</span> (<span class="hljs-keyword">node</span> <span class="hljs-title">!== null</span>) {
            postOrderTraverseNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>)
            postOrderTraverseNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>)
            console.log(<span class="hljs-keyword">node</span>.<span class="hljs-title">key</span>)
        }
    }</code></pre><p>&#x53D1;&#x73B0;&#x4E86;&#x5427;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5185;&#x90E8;&#x8BED;&#x53E5;&#x66F4;&#x6362;&#x4E86;&#x524D;&#x540E;&#x4F4D;&#x7F6E;&#xFF0C;&#x8FD9;&#x4E5F;&#x521A;&#x597D;&#x7B26;&#x5408;&#x4E09;&#x79CD;&#x904D;&#x5386;&#x89C4;&#x5219;&#xFF1A;&#x5148;&#x5E8F;&#x904D;&#x5386;&#xFF08;&#x6839;-&#x5DE6;-&#x53F3;&#xFF09;&#x3001;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#xFF08;&#x5DE6;-&#x6839;-&#x53F3;&#xFF09;&#x3001;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#xFF08;&#x5DE6;-&#x53F3;-&#x6839;&#xFF09;</p><h3 id="articleHeader6">&#x5148;&#x6765;&#x505A;&#x4E2A;&#x6D4B;&#x8BD5;&#x5427;</h3><p>&#x73B0;&#x5728;&#x7684;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function BinarySearchTree () {
        var Node = function(key) {
            this.key = key,
            this.left = null,
            this.right = null
        }
        var root = null
        
        //&#x63D2;&#x5165;&#x8282;&#x70B9;
        this.insert = function(key) {
            var newNode = new Node(key)
            if(root === null) {
                root = newNode
            } else {
                insertNode(root, newNode)
            }
        }
        var insertNode = function(node, newNode) {
            if (newNode.key &lt;= node.key) {
                if (node.left === null) {
                    node.left = newNode
                }else {
                    insertNode(node.left, newNode)
                }
            }else {
                if (node.right === null) {
                    node.right = newNode
                }else {
                    insertNode(node.right, newNode)
                }
            }
        } 
        
        //&#x5B9E;&#x73B0;&#x4E2D;&#x5E8F;&#x904D;&#x5386;
        this.inOrderTraverse = function() {
            inOrderTraverseNode(root)
        }
        var inOrderTraverseNode = function(node) {
            if (node !== null) {
                inOrderTraverseNode(node.left)
                console.log(node.key)
                inOrderTraverseNode(node.right)
            }
        }
        // &#x5B9E;&#x73B0;&#x5148;&#x5E8F;&#x904D;&#x5386;
        this.preOrderTraverse = function() {
            preOrderTraverseNode(root)
        }
        var preOrderTraverseNode = function(node) {
            if (node !== null) {
                console.log(node.key)
                preOrderTraverseNode(node.left)
                preOrderTraverseNode(node.right)
            }
        }

        // &#x5B9E;&#x73B0;&#x540E;&#x5E8F;&#x904D;&#x5386;
        this.postOrderTraverse = function() {
            postOrderTraverseNode(root)
        }
        var postOrderTraverseNode = function(node) {
            if (node !== null) {
                postOrderTraverseNode(node.left)
                postOrderTraverseNode(node.right)
                console.log(node.key)
            }
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BinarySearchTree</span> </span>() {
        <span class="hljs-keyword">var</span> Node = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(key) {
            <span class="hljs-built_in">this</span>.key = key,
            <span class="hljs-built_in">this</span>.left = <span class="hljs-literal">null</span>,
            <span class="hljs-built_in">this</span>.right = <span class="hljs-literal">null</span>
        }
        <span class="hljs-keyword">var</span> root = <span class="hljs-literal">null</span>
        
        <span class="hljs-comment">//&#x63D2;&#x5165;&#x8282;&#x70B9;</span>
        <span class="hljs-built_in">this</span>.insert = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(key) {
            <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Node</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Node</span>(key)
            <span class="hljs-keyword">if</span>(root === <span class="hljs-literal">null</span>) {
                root = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>
            } <span class="hljs-keyword">else</span> {
                insertNode(root, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>)
            }
        }
        <span class="hljs-keyword">var</span> insertNode = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(node, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Node</span>.key &lt;= node.key) {
                <span class="hljs-keyword">if</span> (node.left === <span class="hljs-literal">null</span>) {
                    node.left = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>
                }<span class="hljs-keyword">else</span> {
                    insertNode(node.left, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>)
                }
            }<span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">if</span> (node.right === <span class="hljs-literal">null</span>) {
                    node.right = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>
                }<span class="hljs-keyword">else</span> {
                    insertNode(node.right, <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>)
                }
            }
        } 
        
        <span class="hljs-comment">//&#x5B9E;&#x73B0;&#x4E2D;&#x5E8F;&#x904D;&#x5386;</span>
        <span class="hljs-built_in">this</span>.inOrderTraverse = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
            inOrderTraverseNode(root)
        }
        <span class="hljs-keyword">var</span> inOrderTraverseNode = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(node) {
            <span class="hljs-keyword">if</span> (node !== <span class="hljs-literal">null</span>) {
                inOrderTraverseNode(node.left)
                console.log(node.key)
                inOrderTraverseNode(node.right)
            }
        }
        <span class="hljs-comment">// &#x5B9E;&#x73B0;&#x5148;&#x5E8F;&#x904D;&#x5386;</span>
        <span class="hljs-built_in">this</span>.preOrderTraverse = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
            preOrderTraverseNode(root)
        }
        <span class="hljs-keyword">var</span> preOrderTraverseNode = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(node) {
            <span class="hljs-keyword">if</span> (node !== <span class="hljs-literal">null</span>) {
                console.log(node.key)
                preOrderTraverseNode(node.left)
                preOrderTraverseNode(node.right)
            }
        }

        <span class="hljs-comment">// &#x5B9E;&#x73B0;&#x540E;&#x5E8F;&#x904D;&#x5386;</span>
        <span class="hljs-built_in">this</span>.postOrderTraverse = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
            postOrderTraverseNode(root)
        }
        <span class="hljs-keyword">var</span> postOrderTraverseNode = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(node) {
            <span class="hljs-keyword">if</span> (node !== <span class="hljs-literal">null</span>) {
                postOrderTraverseNode(node.left)
                postOrderTraverseNode(node.right)
                console.log(node.key)
            }
        }
    }</code></pre><p>&#x7ADF;&#x7136;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#x6DFB;&#x52A0;&#x65B0;&#x8282;&#x70B9;&#x548C;&#x904D;&#x5386;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x6D4B;&#x8BD5;&#x4E00;&#x4E0B;&#x5427;&#xFF1A;</p><p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E9B;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [9,6,3,8,12,15]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code style="word-break:break-word;white-space:initial">var arr = [<span class="hljs-number">9</span>,<span class="hljs-number">6</span>,<span class="hljs-number">3</span>,<span class="hljs-number">8</span>,<span class="hljs-number">12</span>,<span class="hljs-number">15</span>]</code></pre><p>&#x6211;&#x4EEC;&#x5C06;arr&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x4F9D;&#x6B64;&#x63D2;&#x5165;&#x5230;&#x4E8C;&#x53C9;&#x641C;&#x7D22;&#x6811;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x6253;&#x5370;&#x7ED3;&#x679C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var tree = new BinarySearchTree()
    arr.map(item =&gt; {
        tree.insert(item)
    })
    tree.inOrderTraverse()
    tree.preOrderTraverse()
    tree.postOrderTraverse()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pony"><code>    <span class="hljs-keyword">var</span> tree = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">BinarySearchTree</span>()
    <span class="hljs-title">arr</span>.<span class="hljs-title">map</span>(item =&gt; {
        tree.insert(item)
    })
    <span class="hljs-title">tree</span>.<span class="hljs-title">inOrderTraverse</span>()
    <span class="hljs-title">tree</span>.<span class="hljs-title">preOrderTraverse</span>()
    <span class="hljs-title">tree</span>.<span class="hljs-title">postOrderTraverse</span>()</span></code></pre><p>&#x8FD0;&#x884C;&#x4EE3;&#x7801;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;&#x63D2;&#x5165;&#x8282;&#x70B9;&#x540E;&#x6574;&#x9897;&#x6811;&#x7684;&#x60C5;&#x51B5;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015868364" src="https://static.alili.tech/img/remote/1460000015868364" alt="" title="" style="cursor:pointer"></span></p><p>&#x8F93;&#x51FA;&#x7ED3;&#x679C;</p><p>&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#xFF1A;<br><code><br>3<br>6<br>8<br>9<br>12<br>15<br></code></p><p>&#x5148;&#x5E8F;&#x904D;&#x5386;&#xFF1A;<br><code><br>9<br>6<br>3<br>8<br>12<br>15<br></code></p><p>&#x540E;&#x5E8F;&#x904D;&#x5386;&#xFF1A;<br><code><br>3<br>8<br>6<br>15<br>12<br>9<br></code></p><p>&#x5F88;&#x660E;&#x663E;&#xFF0C;&#x7ED3;&#x679C;&#x662F;&#x7B26;&#x5408;&#x9884;&#x671F;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x7528;&#x4E0A;&#x9762;&#x7684;JavaScript&#x4EE3;&#x7801;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x5BF9;&#x6811;&#x7684;&#x8282;&#x70B9;&#x63D2;&#x5165;&#xFF0C;&#x548C;&#x4E09;&#x79CD;&#x904D;&#x5386;&#x65B9;&#x6CD5;&#xFF0C;&#x540C;&#x65F6;&#xFF0C;&#x5F88;&#x660E;&#x663E;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5728;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#x6811;&#x79CD;&#xFF0C;&#x6700;&#x5DE6;&#x4FA7;&#x7684;&#x8282;&#x70B9;&#x7684;&#x503C;&#x662F;&#x6700;&#x5C0F;&#x7684;&#xFF0C;&#x800C;&#x6700;&#x53F3;&#x4FA7;&#x7684;&#x8282;&#x70B9;&#x7684;&#x503C;&#x662F;&#x6700;&#x5927;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x62FF;&#x5230;&#x5176;&#x4E2D;&#x7684;&#x6700;&#x5927;&#x503C;&#x548C;&#x6700;&#x5C0F;&#x503C;</p><h2 id="articleHeader7">&#x67E5;&#x627E;&#x6700;&#x5C0F;&#x3001;&#x6700;&#x5927;&#x503C;</h2><p>&#x600E;&#x4E48;&#x505A;&#x5462;&#xFF1F;&#x5176;&#x5B9E;&#x53EA;&#x9700;&#x8981;&#x5C06;&#x6839;&#x8282;&#x70B9;&#x4F20;&#x5165;minNode/&#x6216;maxNode&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5FAA;&#x73AF;&#x5224;&#x65AD;node&#x4E3A;&#x5DE6;&#x4FA7;(minNode)/&#x53F3;&#x4FA7;(maxNode)&#x7684;&#x8282;&#x70B9;&#x4E3A;null</p><p>&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x67E5;&#x627E;&#x6700;&#x5C0F;&#x503C;
    this.findMin = function() {
        return minNode(root)
    }
    var minNode = function(node) {
        if (node) {
            while (node &amp;&amp; node.left !== null) {
                node = node.left
            }
            return node.key
        }
        return null
    }
    
    // &#x67E5;&#x627E;&#x6700;&#x5927;&#x503C;
    this.findMax = function() {
        return maxNode(root)
    }
    var maxNode = function (node) {
        if(node) {
            while (node &amp;&amp; node.right !== null) {
                node =node.right
            }
            return node.key
        }
        return null
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>    // &#x67E5;&#x627E;&#x6700;&#x5C0F;&#x503C;
    this.findMin = function() {
        return minNode(root)
    }
    var minNode = function(<span class="hljs-keyword">node</span><span class="hljs-title">) {
        if</span> (<span class="hljs-keyword">node</span><span class="hljs-title">) {
            while</span> (<span class="hljs-keyword">node</span> <span class="hljs-title">&amp;&amp; node</span>.left !== null) {
                <span class="hljs-keyword">node</span> <span class="hljs-title">= node</span>.left
            }
            return <span class="hljs-keyword">node</span>.<span class="hljs-title">key</span>
        }
        return null
    }
    
    // &#x67E5;&#x627E;&#x6700;&#x5927;&#x503C;
    this.findMax = function() {
        return maxNode(root)
    }
    var maxNode = function (<span class="hljs-keyword">node</span><span class="hljs-title">) {
        if</span>(<span class="hljs-keyword">node</span><span class="hljs-title">) {
            while</span> (<span class="hljs-keyword">node</span> <span class="hljs-title">&amp;&amp; node</span>.right !== null) {
                <span class="hljs-keyword">node</span> <span class="hljs-title">=node</span>.right
            }
            return <span class="hljs-keyword">node</span>.<span class="hljs-title">key</span>
        }
        return null
    }</code></pre><h2 id="articleHeader8">&#x6240;&#x641C;&#x7279;&#x5B9A;&#x503C;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.search = function(key) {
    return searchNode(root, key)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.search = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(key)</span> </span>{
    <span class="hljs-keyword">return</span> searchNode(root, key)
}</code></pre><p>&#x540C;&#x6837;&#xFF0C;&#x5B9E;&#x73B0;&#x5B83;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x8F85;&#x52A9;&#x65B9;&#x6CD5;,&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x9996;&#x5148;&#x4F1A;&#x68C0;&#x9A8C;node&#x7684;&#x5408;&#x6CD5;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x4E3A;null&#xFF0C;&#x76F4;&#x63A5;&#x9000;&#x51FA;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;fasle&#x3002;&#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;key&#x6BD4;&#x5F53;&#x524D;&#x4F20;&#x5165;node&#x7684;key&#x503C;&#x5C0F;&#xFF0C;&#x5B83;&#x4F1A;&#x7EE7;&#x7EED;&#x9012;&#x5F52;&#x67E5;&#x627E;node&#x7684;&#x5DE6;&#x4FA7;&#x8282;&#x70B9;&#xFF0C;&#x53CD;&#x4E4B;&#xFF0C;&#x67E5;&#x627E;&#x53F3;&#x4FA7;&#x8282;&#x70B9;&#x3002;&#x5982;&#x679C;&#x627E;&#x5230;&#x76F8;&#x7B49;&#x8282;&#x70B9;&#xFF0C;&#x76F4;&#x63A5;&#x9000;&#x51FA;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;true</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var searchNode = function(node, key) {
        if (node === null) {
            return false
        }
        if (key &lt; node.key) {
            return searchNode(node.left, key)
        }else if (key &gt; node.key) {
            return searchNode(node.right, key)
        }else {
            return true
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>    <span class="hljs-built_in">var</span> searchNode = function(node, <span class="hljs-built_in">key</span>) {
        <span class="hljs-keyword">if</span> (node === null) {
            <span class="hljs-built_in">return</span> <span class="hljs-literal">false</span>
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">key</span> &lt; node.<span class="hljs-built_in">key</span>) {
            <span class="hljs-built_in">return</span> searchNode(node.left, <span class="hljs-built_in">key</span>)
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">key</span> &gt; node.<span class="hljs-built_in">key</span>) {
            <span class="hljs-built_in">return</span> searchNode(node.right, <span class="hljs-built_in">key</span>)
        }<span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">return</span> <span class="hljs-literal">true</span>
        }
    }</code></pre><h2 id="articleHeader9">&#x79FB;&#x9664;&#x8282;&#x70B9;</h2><p>&#x79FB;&#x9664;&#x8282;&#x70B9;&#x7684;&#x5B9E;&#x73B0;&#x60C5;&#x51B5;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x5B83;&#x4F1A;&#x6709;&#x4E09;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x60C5;&#x51B5;&#xFF1A;</p><li><ul><li>&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x662F;&#x4E00;&#x4E2A;&#x53F6;&#x5B50;&#x8282;&#x70B9;</li></ul></li><ul><li>&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x5B50;&#x8282;&#x70B9;</li><li>&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x5B50;&#x8282;&#x70B9;</li></ul><p>&#x548C;&#x5B9E;&#x73B0;&#x641C;&#x7D22;&#x6307;&#x5B9A;&#x8282;&#x70B9;&#x4E00;&#x5143;&#xFF0C;&#x8981;&#x79FB;&#x9664;&#x67D0;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x627E;&#x5230;&#x5B83;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x56E0;&#x6B64;&#x79FB;&#x9664;&#x65B9;&#x6CD5;&#x7684;&#x5B9E;&#x73B0;&#x4E2D;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x548C;&#x4E0A;&#x9762;&#x76F8;&#x540C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x79FB;&#x9664;&#x8282;&#x70B9;
    this.remove = function(key) {
        removeNode(root,key)
    }
    var removeNode = function(node, key) {
        if (node === null) {
            return null
        }
        if (key &lt; node.key) {
            node.left = removeNode(node.left, key)
            return node
        }else if(key &gt; node.key) {
            node.right = removeNode(node.right,key)
            return node
        }else{
            //&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x662F;&#x4E00;&#x4E2A;&#x53F6;&#x5B50;&#x8282;&#x70B9;
            if (node.left === null &amp;&amp; node.right === null) {
                node = null
                return node
            }
            //&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x5B50;&#x8282;&#x70B9;
            if (node.letf === null) {
                node = node.right
                return node
            }else if (node.right === null) {
                node = node.left
                return node
            }
            //&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x5B50;&#x8282;&#x70B9;
            var aux = findMinNode(node.right)
            node.key = aux.key
            node.right = removeNode(node.right, axu.key)
            return node
        }
    }
    var findMinNode = function(node) {
        if (node) {
            while (node &amp;&amp; node.left !== null) {
                node = node.left
            }
            return node
        }
        return null
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code>    // &#x79FB;&#x9664;&#x8282;&#x70B9;
    this.remove = function(key) {
        removeNode(root,key)
    }
    var removeNode = function(<span class="hljs-keyword">node</span><span class="hljs-title">, key</span>) {
        if (<span class="hljs-keyword">node</span> <span class="hljs-title">=== null</span>) {
            return null
        }
        if (key <span class="hljs-tag">&lt; node.key) {
            node.left = removeNode(node.left, key)
            return node
        }else if(key &gt;</span> <span class="hljs-keyword">node</span>.<span class="hljs-title">key</span>) {
            <span class="hljs-keyword">node</span>.<span class="hljs-title">right</span> = removeNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>,key)
            return <span class="hljs-keyword">node</span>
        <span class="hljs-title">}else</span>{
            //&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x662F;&#x4E00;&#x4E2A;&#x53F6;&#x5B50;&#x8282;&#x70B9;
            if (<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span> === null &amp;&amp; <span class="hljs-keyword">node</span>.<span class="hljs-title">right</span> === null) {
                <span class="hljs-keyword">node</span> <span class="hljs-title">= null</span>
                return <span class="hljs-keyword">node</span>
            <span class="hljs-title">}
            //&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x5B50;&#x8282;&#x70B9;
            if</span> (<span class="hljs-keyword">node</span>.<span class="hljs-title">letf</span> === null) {
                <span class="hljs-keyword">node</span> <span class="hljs-title">= node</span>.right
                return <span class="hljs-keyword">node</span>
            <span class="hljs-title">}else</span> if (<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span> === null) {
                <span class="hljs-keyword">node</span> <span class="hljs-title">= node</span>.left
                return <span class="hljs-keyword">node</span>
            <span class="hljs-title">}
            //&#x9700;&#x8981;&#x79FB;&#x9664;&#x7684;&#x8282;&#x70B9;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x5B50;&#x8282;&#x70B9;
            var</span> aux = findMinNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>)
            <span class="hljs-keyword">node</span>.<span class="hljs-title">key</span> = aux.key
            <span class="hljs-keyword">node</span>.<span class="hljs-title">right</span> = removeNode(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>, axu.key)
            return <span class="hljs-keyword">node</span>
        <span class="hljs-title">}
    }
    var</span> findMinNode = function(<span class="hljs-keyword">node</span><span class="hljs-title">) {
        if</span> (<span class="hljs-keyword">node</span><span class="hljs-title">) {
            while</span> (<span class="hljs-keyword">node</span> <span class="hljs-title">&amp;&amp; node</span>.left !== null) {
                <span class="hljs-keyword">node</span> <span class="hljs-title">= node</span>.left
            }
            return <span class="hljs-keyword">node</span>
        <span class="hljs-title">}
        return</span> null
    }</code></pre><p>&#x5176;&#x4E2D;&#xFF0C;&#x79FB;&#x9664;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x5B50;&#x8282;&#x70B9;&#x7684;&#x8282;&#x70B9;&#x662F;&#x6700;&#x590D;&#x6742;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x5B83;&#x5305;&#x542B;&#x5DE6;&#x4FA7;&#x8282;&#x70B9;&#x548C;&#x53F3;&#x4FA7;&#x8282;&#x70B9;&#xFF0C;&#x5BF9;&#x5B83;&#x8FDB;&#x884C;&#x79FB;&#x9664;&#x4E3B;&#x8981;&#x9700;&#x8981;&#x4E09;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;</p><ol><li>&#x9700;&#x8981;&#x627E;&#x5230;&#x5B83;&#x53F3;&#x4FA7;&#x5B50;&#x6811;&#x4E2D;&#x7684;&#x6700;&#x5C0F;&#x8282;&#x70B9;&#x6765;&#x4EE3;&#x66FF;&#x5B83;&#x7684;&#x4F4D;&#x7F6E;</li><li>&#x5C06;&#x5B83;&#x53F3;&#x4FA7;&#x5B50;&#x6811;&#x4E2D;&#x7684;&#x6700;&#x5C0F;&#x8282;&#x70B9;&#x79FB;&#x9664;</li><li>&#x5C06;&#x66F4;&#x65B0;&#x540E;&#x7684;&#x8282;&#x70B9;&#x7684;&#x5F15;&#x7528;&#x6307;&#x5411;&#x539F;&#x8282;&#x70B9;&#x7684;&#x7236;&#x8282;&#x70B9;</li></ol><p>&#x6709;&#x70B9;&#x7ED5;&#x513F;&#xFF0C;&#x4F46;&#x5FC5;&#x987B;&#x8FD9;&#x6837;&#xFF0C;&#x56E0;&#x4E3A;&#x5220;&#x9664;&#x5143;&#x7D20;&#x540E;&#x7684;&#x4E8C;&#x53C9;&#x641C;&#x7D22;&#x6811;&#x5FC5;&#x987B;&#x4FDD;&#x6301;&#x5B83;&#x7684;&#x6392;&#x5E8F;&#x6027;&#x8D28;</p><h3 id="articleHeader10">&#x6D4B;&#x8BD5;&#x5220;&#x9664;&#x8282;&#x70B9;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tree.remove(8)
tree.inOrderTraverse()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">tree</span><span class="hljs-selector-class">.remove</span>(8)
<span class="hljs-selector-tag">tree</span><span class="hljs-selector-class">.inOrderTraverse</span>()</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#xFF1A;</p><p><code><br>3<br>6<br>9<br>12<br>15<br></code></p><p>8 &#x8FD9;&#x4E2A;&#x8282;&#x70B9;&#x88AB;&#x6210;&#x529F;&#x5220;&#x9664;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#x8FDB;&#x884C;&#x4E2D;&#x5E8F;&#x904D;&#x5386;&#x4F9D;&#x7136;&#x662F;&#x4FDD;&#x6301;&#x6392;&#x5E8F;&#x6027;&#x8D28;&#x7684;</p><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#x5C31;&#x57FA;&#x672C;&#x4E0A;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x4E3A;&#x5B83;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x6DFB;&#x52A0;&#x3001;&#x67E5;&#x627E;&#x3001;&#x5220;&#x9664;&#x4EE5;&#x53CA;&#x5148;&#x4E2D;&#x540E;&#x4E09;&#x79CD;&#x904D;&#x5386;&#x65B9;&#x6CD5;</p><h1 id="articleHeader11">&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;</h1><p>&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x4E0A;&#x8FD9;&#x6837;&#x7684;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;&#x662F;&#x5B58;&#x5728;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x4E0D;&#x65AD;&#x7684;&#x6DFB;&#x52A0;&#x66F4;&#x5927;/&#x66F4;&#x5C0F;&#x7684;&#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x51FA;&#x73B0;&#x5982;&#x4E0B;&#x60C5;&#x51B5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tree.insert(16)
tree.insert(17)
tree.insert(18)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">tree</span><span class="hljs-selector-class">.insert</span>(16)
<span class="hljs-selector-tag">tree</span><span class="hljs-selector-class">.insert</span>(17)
<span class="hljs-selector-tag">tree</span><span class="hljs-selector-class">.insert</span>(18)</code></pre><p>&#x6765;&#x770B;&#x770B;&#x73B0;&#x5728;&#x6574;&#x9897;&#x6811;&#x7684;&#x60C5;&#x51B5;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015868365" src="https://static.alili.tech/img/remote/1460000015868365" alt="" title="" style="cursor:pointer"></span></p><p>&#x5F88;&#x5BB9;&#x6613;&#x53D1;&#x73B0;&#xFF0C;&#x5B83;&#x662F;&#x4E0D;&#x5E73;&#x8861;&#x7684;&#xFF0C;&#x8FD9;&#x53C8;&#x4F1A;&#x5F15;&#x51FA;&#x5E73;&#x8861;&#x6811;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x8981;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x66F4;&#x590D;&#x6742;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;AVL&#x6811;&#xFF0C;&#x7EA2;&#x9ED1;&#x6811; &#x54CE;&#xFF0C;&#x4E4B;&#x540E;&#x518D;&#x6162;&#x6162;&#x53BB;&#x5B66;&#x4E60;&#x5427;</p><p>&#x5173;&#x4E8E;&#x5B9E;&#x73B0;&#x4E8C;&#x53C9;&#x6392;&#x5E8F;&#x6811;&#xFF0C;&#x6211;&#x4E5F;&#x627E;&#x5230;&#x6155;&#x8BFE;&#x7F51;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x89C6;&#x9891;&#xFF1A;<a href="https://www.imooc.com/learn/888" rel="nofollow noreferrer" target="_blank">Javascript&#x5B9E;&#x73B0;&#x4E8C;&#x53C9;&#x6811;&#x7B97;&#x6CD5;</a>,<br>&#x5185;&#x5BB9;&#x548C;&#x4E0A;&#x8FF0;&#x5B9E;&#x73B0;&#x57FA;&#x672C;&#x4E00;&#x81F4;</p><p>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="https://hx-dl.github.io/hx-dl.github.io/2018/08/02/JavaScript%E5%AE%9E%E7%8E%B0%E7%AE%80%E5%8D%95%E4%BA%8C%E5%8F%89%E6%9F%A5%E6%89%BE%E6%A0%91/" rel="nofollow noreferrer" target="_blank">&#x884C;&#x65E0;&#x5FCC;&#x7684;&#x6210;&#x957F;&#x5C0F;&#x5C4B;&#xFF1A;JavaScript&#x5B9E;&#x73B0;&#x7B80;&#x5355;&#x4E8C;&#x53C9;&#x67E5;&#x627E;&#x6811;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript实现简单二叉查找树

## 原文链接
[https://segmentfault.com/a/1190000015868360](https://segmentfault.com/a/1190000015868360)

