---
title: '深入理解 Javascript 之 JS的封装' 
date: 2018-11-17 14:34:54
hidden: true
slug: qoz49md13u
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5C01;&#x88C5;</h2><p><strong>&#x5E38;&#x89C1;&#x7684;&#x5C01;&#x88C5;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person (name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
}
 
Pserson.prototype = {
    constructor:Person,
    sayHello:function(){
        console.log(&apos;hello&apos;);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span> (<span class="hljs-params">name,age,sex</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.sex = sex;
}
 
Pserson.prototype = {
    <span class="hljs-attr">constructor</span>:Person,
    <span class="hljs-attr">sayHello</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>);
    }
}</code></pre><p><strong>&#x7C7B;&#x4E2D;&#x7684;&#x5171;&#x6709;&#x548C;&#x79C1;&#x6709;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(pname){
    var age = 10;
    function pm(){
        console.log(this.name)
    }
    
    this.name = pname;
    this.test: function(){
        console.log(&apos;public methods&apos;);
        pm();
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">pname</span>)</span>{
    <span class="hljs-keyword">var</span> age = <span class="hljs-number">10</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pm</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
    
    <span class="hljs-keyword">this</span>.name = pname;
    <span class="hljs-keyword">this</span>.test: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;public methods&apos;</span>);
        pm();
    }
}</code></pre><ul><li>&#x6267;&#x884C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</li></ul><p>&#xFF08;&#x539F;&#x56E0;&#x662F; &#x8C03;&#x7528;pm&#x7684;&#x65F6;&#x5019;&#xFF0C;this&#x6307;&#x5411;&#x7684;&#x5176;&#x5B9E;&#x662F;window&#xFF0C;&#x56E0;&#x6B64;&#x6CA1;&#x6709;&#x8F93;&#x51FA;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVbe7Ih?w=933&amp;h=413" src="https://static.alili.tech/img/bVbe7Ih?w=933&amp;h=413" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li>&#x89E3;&#x51B3;&#x529E;&#x6CD5;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(pname){
    var age = 10;
    function pm(){
        console.log(this.name)
    }
    
    this.name = pname;
    this.test: function(){
        console.log(&apos;public methods&apos;);
        pm.call(this); // &#x3010;&#x3011;&#x66F4;&#x6539;this&#x6307;&#x5411;
        // pm();
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">pname</span>)</span>{
    <span class="hljs-keyword">var</span> age = <span class="hljs-number">10</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pm</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }
    
    <span class="hljs-keyword">this</span>.name = pname;
    <span class="hljs-keyword">this</span>.test: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;public methods&apos;</span>);
        pm.call(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// &#x3010;&#x3011;&#x66F4;&#x6539;this&#x6307;&#x5411;</span>
        <span class="hljs-comment">// pm();</span>
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbe7IN?w=925&amp;h=437" src="https://static.alili.tech/img/bVbe7IN?w=925&amp;h=437" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x5DE5;&#x5382;&#x51FD;&#x6570;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbe7IS?w=1025&amp;h=326" src="https://static.alili.tech/img/bVbe7IS?w=1025&amp;h=326" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name){
    function pm(){
        console.log(self.name);
    }    
    var self = {
        name: name,
        test: function(){
            pm();
        }
    }
    
    return self;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pm</span><span class="hljs-params">()</span></span>{
        console.log(<span class="hljs-keyword">self</span>.name);
    }    
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = {
        name: name,
        test: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            pm();
        }
    }
    
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">self</span>;
}</code></pre><h2 id="articleHeader1">javascript&#x4E5F;&#x6709;private public protected</h2><p>&#x5BF9;&#x4E8E;java&#x7A0B;&#x5E8F;&#x5458;&#x6765;&#x8BF4;private public protected&#x8FD9;&#x4E09;&#x4E2A;&#x5173;&#x952E;&#x5B57;&#x5E94;&#x8BE5;&#x662F;&#x5F88;&#x719F;&#x6089;&#x7684;&#x54C8;&#xFF0C;&#x4F46;&#x662F;&#x5728;js&#x4E2D;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x7C7B;&#x4F3C;&#x4E8E;private public protected&#x8FD9;&#x6837;&#x7684;&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x53C8;&#x5E0C;&#x671B;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x8BBF;&#x95EE;&#x9650;&#x5236;&#xFF0C;&#x4E8E;&#x662F;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x6A21;&#x62DF;private public protected&#x8FD9;&#x4E9B;&#x8BBF;&#x95EE;&#x6743;&#x9650;&#x3002;</p><p><strong>&#x4E0A;&#x6817;&#x5B50;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Book = function (id, name, price) {
      // private(&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x5B9A;&#x4E49;&#xFF0C;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#xFF0C;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x5BF9;&#x8C61;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;)
      var _num = 1;
      var _id = id;
      // &#x79C1;&#x6709;&#x51FD;&#x6570;
      function _checkId(id) {
        console.log(&apos;private&apos;);
        console.log(_id);
        // &#x8FD9;&#x91CC;&#x53EA;&#x80FD;&#x8BBF;&#x95EE;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;
        // &#x5982;&#x679C;&#x8BBF;&#x95EE;this.name&#x662F;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#x7684;&#xFF0C;
        // &#x5982;&#x679C;&#x8BBF;&#x95EE;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x6307;&#x5411;this
      }

      // protected(&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x79C1;&#x6709;&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5BF9;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x7C7B;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#x62FF;&#x5230;&#x51FD;&#x6570;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;)
      this.getName = function () {
        _checkId();
        console.log(this.name);
      }

      this.getPrice = function () {
        console.log(price);
      }

      // public
      this.name = name;
      this.copy = function () {
        console.log(&apos;this is public&apos;)
        console.log(this.name)
        console.log(price);
      }



    }

    //&#x5728;Book&#x7684;&#x539F;&#x578B;&#x4E0A;&#x6DFB;&#x52A0;&#x7684;&#x65B9;&#x6CD5;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x88AB;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x7EE7;&#x627F;
    Book.prototype.profunction = function () {
      console.log(&apos;this is profunction&apos;);
    }
    //&#x5728;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x901A;&#x8FC7;.&#x8BED;&#x6CD5;&#x521B;&#x5EFA;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x53EA;&#x80FD;&#x901A;&#x8FC7;&#x8BE5;&#x7C7B;&#x8BBF;&#x95EE;&#xFF0C;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;
    Book.setTime = function () {
      console.log(&apos;this is new time&apos;)
    }
    var book1 = new Book(1, &apos;zjj&apos;, 2000);
    console.log(book1);
    book1.getName(); // 111 getName&#x662F;protected&#xFF0C;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x7C7B;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x4E5F;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x51FD;&#x6570;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;
    // book1._checkId();        //&#x62A5;&#x9519;book1.checkId is not a function
    console.log(book1.id) // undefined id&#x662F;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x901A;&#x8FC7;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x662F;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;
    console.log(book1.name) //name &#x662F;&#x901A;&#x8FC7;this&#x521B;&#x5EFA;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x5728;book1&#x4E2D;&#x590D;&#x5236;&#x4E00;&#x904D;name&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;
    book1.copy() //this is public
    book1.profunction(); //this is proFunction
    Book.setTime(); //this is new time
    book1.setTime(); //&#x62A5;&#x9519;book1.setTime is not a function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Book = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id, name, price</span>) </span>{
      <span class="hljs-comment">// private(&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x5B9A;&#x4E49;&#xFF0C;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#xFF0C;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x5BF9;&#x8C61;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;)</span>
      <span class="hljs-keyword">var</span> _num = <span class="hljs-number">1</span>;
      <span class="hljs-keyword">var</span> _id = id;
      <span class="hljs-comment">// &#x79C1;&#x6709;&#x51FD;&#x6570;</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_checkId</span>(<span class="hljs-params">id</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;private&apos;</span>);
        <span class="hljs-built_in">console</span>.log(_id);
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x53EA;&#x80FD;&#x8BBF;&#x95EE;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;</span>
        <span class="hljs-comment">// &#x5982;&#x679C;&#x8BBF;&#x95EE;this.name&#x662F;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#x7684;&#xFF0C;</span>
        <span class="hljs-comment">// &#x5982;&#x679C;&#x8BBF;&#x95EE;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x6307;&#x5411;this</span>
      }

      <span class="hljs-comment">// protected(&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x79C1;&#x6709;&#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5BF9;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x7C7B;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#x62FF;&#x5230;&#x51FD;&#x6570;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;)</span>
      <span class="hljs-keyword">this</span>.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        _checkId();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
      }

      <span class="hljs-keyword">this</span>.getPrice = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(price);
      }

      <span class="hljs-comment">// public</span>
      <span class="hljs-keyword">this</span>.name = name;
      <span class="hljs-keyword">this</span>.copy = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;this is public&apos;</span>)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
        <span class="hljs-built_in">console</span>.log(price);
      }



    }

    <span class="hljs-comment">//&#x5728;Book&#x7684;&#x539F;&#x578B;&#x4E0A;&#x6DFB;&#x52A0;&#x7684;&#x65B9;&#x6CD5;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x88AB;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x7EE7;&#x627F;</span>
    Book.prototype.profunction = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;this is profunction&apos;</span>);
    }
    <span class="hljs-comment">//&#x5728;&#x51FD;&#x6570;&#x5916;&#x90E8;&#x901A;&#x8FC7;.&#x8BED;&#x6CD5;&#x521B;&#x5EFA;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x53EA;&#x80FD;&#x901A;&#x8FC7;&#x8BE5;&#x7C7B;&#x8BBF;&#x95EE;&#xFF0C;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;</span>
    Book.setTime = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;this is new time&apos;</span>)
    }
    <span class="hljs-keyword">var</span> book1 = <span class="hljs-keyword">new</span> Book(<span class="hljs-number">1</span>, <span class="hljs-string">&apos;zjj&apos;</span>, <span class="hljs-number">2000</span>);
    <span class="hljs-built_in">console</span>.log(book1);
    book1.getName(); <span class="hljs-comment">// 111 getName&#x662F;protected&#xFF0C;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x7C7B;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x5B9E;&#x4F8B;&#x5316;&#x4E4B;&#x540E;&#x4E5F;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x51FD;&#x6570;&#x7684;&#x79C1;&#x6709;&#x5C5E;&#x6027;</span>
    <span class="hljs-comment">// book1._checkId();        //&#x62A5;&#x9519;book1.checkId is not a function</span>
    <span class="hljs-built_in">console</span>.log(book1.id) <span class="hljs-comment">// undefined id&#x662F;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x901A;&#x8FC7;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x662F;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x5B9E;&#x4F8B;&#x5316;&#x5BF9;&#x8C61;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;</span>
    <span class="hljs-built_in">console</span>.log(book1.name) <span class="hljs-comment">//name &#x662F;&#x901A;&#x8FC7;this&#x521B;&#x5EFA;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x5728;book1&#x4E2D;&#x590D;&#x5236;&#x4E00;&#x904D;name&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;</span>
    book1.copy() <span class="hljs-comment">//this is public</span>
    book1.profunction(); <span class="hljs-comment">//this is proFunction</span>
    Book.setTime(); <span class="hljs-comment">//this is new time</span>
    book1.setTime(); <span class="hljs-comment">//&#x62A5;&#x9519;book1.setTime is not a function</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 Javascript 之 JS的封装

## 原文链接
[https://segmentfault.com/a/1190000015958607](https://segmentfault.com/a/1190000015958607)

