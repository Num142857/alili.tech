---
title: '【build your own xxx】实现你自己的bind函数' 
date: 2018-11-29 2:30:10
hidden: true
slug: xf1ms7k1iz7
categories: [reprint]
---

{{< raw >}}
<p>&#x4ECA;&#x5929;&#x6765;&#x5B9E;&#x73B0;JavaScript&#x7684;bind&#x51FD;&#x6570;&#x3002;<br>&#x9996;&#x5148;&#x770B;MDN&#x7684;bind&#x51FD;&#x6570;&#x63CF;&#x8FF0;&#xFF1A;</p><p>&#x4ECE;&#x4E0A;&#x9762;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6765;&#xFF0C;var A = B.bind(this)&#x51FD;&#x6570;&#x5176;&#x5B9E;&#x5E72;&#x4E86;&#x8FD9;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;</p><ol><li>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E14;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x540E;&#x9762;&#x8FD0;&#x884C;&#x65F6;&#x7684;this&#x5C31;&#x662F;bind(this)&#x4F20;&#x5165;&#x7684;this</li><li>&#x63A5;&#x6536;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x4E9B;&#x53C2;&#x6570;&#xFF08;&#x5982;&#x679C;&#x6709;&#x7684;&#x8BDD;&#xFF09;&#x4F5C;&#x4E3A;bind()&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x8DDF;&#x5728;this&#xFF08;&#x6216;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#xFF09;&#x540E;&#x9762;&#xFF0C;&#x4E4B;&#x540E;&#x5B83;&#x4EEC;&#x4F1A;&#x88AB;&#x63D2;&#x5165;&#x5230;&#x76EE;&#x6807;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x5217;&#x8868;&#x7684;&#x5F00;&#x59CB;&#x4F4D;&#x7F6E;&#xFF0C;&#x4F20;&#x9012;&#x7ED9;&#x7ED1;&#x5B9A;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x4F1A;&#x8DDF;&#x5728;&#x5B83;&#x4EEC;&#x7684;&#x540E;&#x9762;</li><li>&#x4F7F;&#x7528;new&#x64CD;&#x4F5C;bind&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x4E4B;&#x524D;&#x4F20;&#x5165;&#x7684;this&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;new&#x7684;&#x4F18;&#x5148;&#x7EA7;&#x9AD8;&#x4E8E;bind</li></ol><h2 id="articleHeader0">&#x7B2C;&#x4E00;&#x6B65;</h2><p>&#x9996;&#x5148;&#x5B9E;&#x73B0;&#x7B2C;&#x4E00;&#x6B65;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zbind = function (othis) {
    var originFunc = this;
    return function () {
        originFunc.apply(othis);
    }
}


var obj = {

}

function createAgumon() {
    this.name = &quot;agumon&quot;;
}
var createAgumonBind = createAgumon.Zbind(obj);
createAgumonBind();   
obj;// {name: &quot;agumon&quot;}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zbind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
    <span class="hljs-keyword">var</span> originFunc = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        originFunc.apply(othis);
    }
}


<span class="hljs-keyword">var</span> obj = {

}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAgumon</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;agumon&quot;</span>;
}
<span class="hljs-keyword">var</span> createAgumonBind = createAgumon.Zbind(obj);
createAgumonBind();   
obj;<span class="hljs-comment">// {name: &quot;agumon&quot;}</span>
</code></pre><h2 id="articleHeader1">&#x7B2C;&#x4E8C;&#x6B65;</h2><p>&#x7B2C;&#x4E8C;&#x6B65;&#x8003;&#x8651;&#x4F20;&#x53C2;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x9996;&#x5148;&#x770B;&#x770B;&#x539F;&#x751F;&#x7684;bind&#x51FD;&#x6570;&#x662F;&#x5982;&#x4F55;&#x4F20;&#x53C2;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {

}
function createAgumon(gender, age) {
    this.name = &quot;agumon&quot;;
    this.gender = gender;
    this.age = age;
}
var createAgumonBind = createAgumon.bind(obj, &apos;female&apos;);
createAgumonBind(22);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {

}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAgumon</span><span class="hljs-params">(gender, age)</span> </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;agumon&quot;</span>;
    <span class="hljs-keyword">this</span>.gender = gender;
    <span class="hljs-keyword">this</span>.age = age;
}
<span class="hljs-keyword">var</span> createAgumonBind = createAgumon.bind(obj, <span class="hljs-string">&apos;female&apos;</span>);
createAgumonBind(<span class="hljs-number">22</span>);
</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6765;&#x5728;bind&#x51FD;&#x6570;&#x4E2D;&#x80FD;&#x5148;&#x4F20;&#x90E8;&#x5206;&#x53C2;&#x6570;&#xFF0C;&#x8FD0;&#x884C;bind&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#x65F6;&#x53EF;&#x4EE5;&#x518D;&#x4F20;&#x5165;&#x90E8;&#x5206;&#x53C2;&#x6570;&#x3002;<br>&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zbind = function (othis) {
    var originFunc = this;
    var partArgs = [].slice.call(arguments, 1);
    var func = function() {};
    var boundFunc = function () {
        var finalArgs = partArgs.concat([].slice.call(arguments));
        return originFunc.apply(othis, finalArgs);
    }

    return boundFunc;
}


var obj = {

}

function createAgumon(gender, age) {
    this.name = &quot;agumon&quot;;
    this.gender = gender;
    this.age = age;
}

var createAgumonBind = createAgumon.Zbind(obj, &apos;female&apos;);
createAgumonBind(22);
obj;// {name: &quot;agumon&quot;, gender: &quot;female&quot;, age: 22}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zbind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
    <span class="hljs-keyword">var</span> originFunc = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> partArgs = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
    <span class="hljs-keyword">var</span> boundFunc = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> finalArgs = partArgs.concat([].slice.call(<span class="hljs-built_in">arguments</span>));
        <span class="hljs-keyword">return</span> originFunc.apply(othis, finalArgs);
    }

    <span class="hljs-keyword">return</span> boundFunc;
}


<span class="hljs-keyword">var</span> obj = {

}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAgumon</span>(<span class="hljs-params">gender, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;agumon&quot;</span>;
    <span class="hljs-keyword">this</span>.gender = gender;
    <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-keyword">var</span> createAgumonBind = createAgumon.Zbind(obj, <span class="hljs-string">&apos;female&apos;</span>);
createAgumonBind(<span class="hljs-number">22</span>);
obj;<span class="hljs-comment">// {name: &quot;agumon&quot;, gender: &quot;female&quot;, age: 22}</span>
</code></pre><h2 id="articleHeader2">&#x7B2C;&#x4E09;&#x6B65;</h2><p>&#x4F7F;&#x7528;new&#x6765;&#x8C03;&#x7528;bind&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x4F1A;&#x5FFD;&#x7565;bind&#x4F20;&#x5165;&#x7684;this<br><strong>new&#x64CD;&#x4F5C;&#x548C;&#x666E;&#x901A;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#x6709;&#x54EA;&#x4E9B;&#x533A;&#x522B;&#xFF1F;</strong><br>&#x7C97;&#x7565;&#x7684;&#x6765;&#x8BB2;&#xFF0C;&#x4F8B;&#x5982;new F()&#x8FD9;&#x6837;&#x7684;&#x8C03;&#x7528;&#xFF0C;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;</p><ol><li>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;var o = new Object()</li><li>&#x8BBE;&#x7F6E;&#x539F;&#x578B;&#x94FE;&#xFF0C;o.__proto__ = F.prototype</li><li>&#x628A;F&#x51FD;&#x6570;&#x4F53;&#x5185;&#x7684;this&#x7ED1;&#x5B9A;&#x4E3A;o&#xFF0C;&#x5E76;&#x4E14;&#x6267;&#x884C;F&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;</li><li>&#x5224;&#x65AD;F&#x7684;&#x8FD4;&#x56DE;&#x7C7B;&#x578B;&#xFF1A;<br>&#x5982;&#x679C;&#x662F;&#x503C;&#x7C7B;&#x578B;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;o<br>&#x5982;&#x679C;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x5BF9;&#x8C61;</li></ol><p>&#x5F00;&#x59CB;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zbind = function (othis) {
    var originFunc = this;
    var partArgs = [].slice.call(arguments, 1);
    var func = function() {};
    var boundFunc = function () {
        var finalArgs = partArgs.concat([].slice.call(arguments));
        return originFunc.apply(this instanceof boundFunc ? this : othis, finalArgs);
    }


    return boundFunc;
}


var obj = {}

function createAgumon(gender, age) {
        this.name = &quot;agumon&quot;;
        this.gender = gender;
        this.age = age;
}

var createAgumonBind = createAgumon.Zbind(obj, &apos;female&apos;);
var newObj = new createAgumonBind(22);
obj // {}
newObj // {name: &quot;agumon&quot;, gender: &quot;female&quot;, age: 22}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zbind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
    <span class="hljs-keyword">var</span> originFunc = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> partArgs = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
    <span class="hljs-keyword">var</span> boundFunc = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> finalArgs = partArgs.concat([].slice.call(<span class="hljs-built_in">arguments</span>));
        <span class="hljs-keyword">return</span> originFunc.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> boundFunc ? <span class="hljs-keyword">this</span> : othis, finalArgs);
    }


    <span class="hljs-keyword">return</span> boundFunc;
}


<span class="hljs-keyword">var</span> obj = {}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAgumon</span>(<span class="hljs-params">gender, age</span>) </span>{
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;agumon&quot;</span>;
        <span class="hljs-keyword">this</span>.gender = gender;
        <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-keyword">var</span> createAgumonBind = createAgumon.Zbind(obj, <span class="hljs-string">&apos;female&apos;</span>);
<span class="hljs-keyword">var</span> newObj = <span class="hljs-keyword">new</span> createAgumonBind(<span class="hljs-number">22</span>);
obj <span class="hljs-comment">// {}</span>
newObj <span class="hljs-comment">// {name: &quot;agumon&quot;, gender: &quot;female&quot;, age: 22}</span></code></pre><p>&#x5173;&#x952E;&#x7684;&#x5730;&#x65B9;&#x5728;&#x4E8E;&#x8FD9;&#x91CC;&#xFF1A;<strong>this instanceof boundFunc ? this : othis</strong>&#xFF0C;&#x5982;&#x679C;&#x662F;new&#x64CD;&#x4F5C;&#x7684;&#x8BDD;&#xFF0C;&#x6B64;&#x65F6;this&#x7684;__proto__&#x5DF2;&#x7ECF;&#x6307;&#x5411;&#x4E86;boundFunc&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528;instanceof&#x53EF;&#x4EE5;&#x68C0;&#x6D4B;&#x51FA;&#x662F;&#x5426;&#x5728;&#x4F7F;&#x7528;new&#x64CD;&#x4F5C;</p><h2 id="articleHeader3">&#x5C0F;&#x7EC6;&#x8282;</h2><p><strong>&#x539F;&#x578B;&#x4E22;&#x5931;</strong><br>&#x521A;&#x521A;&#x5B9E;&#x73B0;&#x7684;Zbind&#x65B9;&#x6CD5;&#x6709;&#x4E2A;&#x5C0F;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zbind = function (othis) {
            var originFunc = this;
            var partArgs = [].slice.call(arguments, 1);
            var func = function() {};
            var boundFunc = function () {
                var finalArgs = partArgs.concat([].slice.call(arguments));
                return originFunc.apply(this instanceof boundFunc ? this : othis, finalArgs);
            }


            return boundFunc;
        }


        var obj = {

        }

        function createAgumon(gender, age) {
            this.name = &quot;agumon&quot;;
            this.gender = gender;
            this.age = age;
        }
        createAgumon.prototype.college = &apos;THU&apos;
        var createAgumonBind = createAgumon.Zbind(obj, &apos;female&apos;);
        var newObj = new createAgumonBind(22);
        console.log(newObj.college)// undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zbind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
            <span class="hljs-keyword">var</span> originFunc = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">var</span> partArgs = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
            <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
            <span class="hljs-keyword">var</span> boundFunc = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> finalArgs = partArgs.concat([].slice.call(<span class="hljs-built_in">arguments</span>));
                <span class="hljs-keyword">return</span> originFunc.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> boundFunc ? <span class="hljs-keyword">this</span> : othis, finalArgs);
            }


            <span class="hljs-keyword">return</span> boundFunc;
        }


        <span class="hljs-keyword">var</span> obj = {

        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAgumon</span>(<span class="hljs-params">gender, age</span>) </span>{
            <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;agumon&quot;</span>;
            <span class="hljs-keyword">this</span>.gender = gender;
            <span class="hljs-keyword">this</span>.age = age;
        }
        createAgumon.prototype.college = <span class="hljs-string">&apos;THU&apos;</span>
        <span class="hljs-keyword">var</span> createAgumonBind = createAgumon.Zbind(obj, <span class="hljs-string">&apos;female&apos;</span>);
        <span class="hljs-keyword">var</span> newObj = <span class="hljs-keyword">new</span> createAgumonBind(<span class="hljs-number">22</span>);
        <span class="hljs-built_in">console</span>.log(newObj.college)<span class="hljs-comment">// undefined</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6765;&#x539F;&#x578B;&#x94FE;&#x4E22;&#x5931;&#x4E86;&#xFF0C;newObj.college&#x5F97;&#x662F;&apos;THU&apos;&#x624D;&#x884C;</p><p>&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.Zbind = function (othis) {
            var originFunc = this;
            var partArgs = [].slice.call(arguments, 1);
            var func = function() {};
            var boundFunc = function () {
                var finalArgs = partArgs.concat([].slice.call(arguments));
                return originFunc.apply(this instanceof boundFunc ? this : othis, finalArgs);
            }

            func.prototype = originFunc.prototype;
            boundFunc.prototype = new func();

            return boundFunc;
        }


        var obj = {

        }

        function createAgumon(gender, age) {
            this.name = &quot;agumon&quot;;
            this.gender = gender;
            this.age = age;
        }
        createAgumon.prototype.college = &apos;THU&apos;
        var createAgumonBind = createAgumon.Zbind(obj, &apos;female&apos;);
        var newObj = new createAgumonBind(22);
        console.log(newObj.college)// &apos;THU&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.Zbind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">othis</span>) </span>{
            <span class="hljs-keyword">var</span> originFunc = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">var</span> partArgs = [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
            <span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
            <span class="hljs-keyword">var</span> boundFunc = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">var</span> finalArgs = partArgs.concat([].slice.call(<span class="hljs-built_in">arguments</span>));
                <span class="hljs-keyword">return</span> originFunc.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> boundFunc ? <span class="hljs-keyword">this</span> : othis, finalArgs);
            }

            func.prototype = originFunc.prototype;
            boundFunc.prototype = <span class="hljs-keyword">new</span> func();

            <span class="hljs-keyword">return</span> boundFunc;
        }


        <span class="hljs-keyword">var</span> obj = {

        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createAgumon</span>(<span class="hljs-params">gender, age</span>) </span>{
            <span class="hljs-keyword">this</span>.name = <span class="hljs-string">&quot;agumon&quot;</span>;
            <span class="hljs-keyword">this</span>.gender = gender;
            <span class="hljs-keyword">this</span>.age = age;
        }
        createAgumon.prototype.college = <span class="hljs-string">&apos;THU&apos;</span>
        <span class="hljs-keyword">var</span> createAgumonBind = createAgumon.Zbind(obj, <span class="hljs-string">&apos;female&apos;</span>);
        <span class="hljs-keyword">var</span> newObj = <span class="hljs-keyword">new</span> createAgumonBind(<span class="hljs-number">22</span>);
        <span class="hljs-built_in">console</span>.log(newObj.college)<span class="hljs-comment">// &apos;THU&apos;</span></code></pre><p>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4F7F;&#x7528;<strong>func.prototype = originFunc.prototype;boundFunc.prototype = new func();</strong>&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x7528;<strong>boundFunc.prototype = originFunc.prototype;</strong>&#x662F;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x5199;&#x7684;&#x8BDD;&#xFF0C;&#x4FEE;&#x6539;boundFunc.prototype&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x539F;&#x51FD;&#x6570;&#x7684;prototype&#x3002;</p><p>that&apos;all</p><p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" rel="nofollow noreferrer" target="_blank">mdn-bind</a><br><a href="https://www.zhihu.com/question/36440948/answer/71234418" rel="nofollow noreferrer" target="_blank">javascript&#x4E2D;&#xFF0C;new&#x64CD;&#x4F5C;&#x7B26;&#x7684;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x662F;&#x4EC0;&#x4E48;?</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【build your own xxx】实现你自己的bind函数

## 原文链接
[https://segmentfault.com/a/1190000015212663](https://segmentfault.com/a/1190000015212663)

