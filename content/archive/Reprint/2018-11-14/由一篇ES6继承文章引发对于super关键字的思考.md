---
title: 由一篇ES6继承文章引发对于super关键字的思考
reprint: true
categories: reprint
abbrlink: 8702d5b0
date: 2018-11-14 02:30:09
---

{{% raw %}}
<h1>&#x95EE;&#x9898;&#x5F15;&#x5165;</h1><p>&#x6700;&#x8FD1;&#x4E00;&#x76F4;&#x5728;&#x770B;&#x539F;&#x578B;&#x7EE7;&#x627F;&#x76F8;&#x5173;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x7FFB;&#x5230;&#x8FD9;&#x4E48;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#xFF1A; <a href="http://wulv.site/2017-05-29/%E4%BB%8EES6%E4%B8%AD%E7%9A%84extends%E8%AE%B2js%E5%8E%9F%E5%9E%8B%E9%93%BE%E4%B8%8E%E7%BB%A7%E6%89%BF.html" rel="nofollow noreferrer">&#x4ECE;ES6&#x4E2D;&#x7684;extends&#x8BB2;js&#x539F;&#x578B;&#x94FE;&#x4E0E;&#x7EE7;&#x627F;</a></p><p>&#x6587;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x70B9;&#x8BA9;&#x6211;&#x5F88;&#x611F;&#x5174;&#x8DA3;&#xFF0C;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5728;&#x7EE7;&#x627F;&#x8FC7;&#x7A0B;&#x4E2D;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;super&#x5173;&#x952E;&#x5B57;&#x83B7;&#x53D6;&#xFF0C;&#x8FD9;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><h1>&#x524D;&#x7F6E;&#x77E5;&#x8BC6;</h1><h2>MDN&#x4E0A;&#x5173;&#x4E8E;super&#x7684;&#x4ECB;&#x7ECD;</h2><p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super" rel="nofollow noreferrer">The super keyword is used to access and call functions on an object&apos;s parent - in MDN</a><br>&#x5927;&#x6982;&#x6709;&#x8FD9;&#x4E48;&#x51E0;&#x4E2A;&#x5173;&#x952E;&#x70B9;&#xFF1A;</p><ol><li>&#x5B50;&#x7C7B;&#x4E2D;&#x5B58;&#x5728;constructor&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4E14;&#x9700;&#x8981;&#x5728;&#x4F7F;&#x7528;this&#x5173;&#x952E;&#x5B57;&#x4E4B;&#x524D;&#x8C03;&#x7528;</li><li>super&#x5173;&#x952E;&#x5B57;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x8C03;&#x7528;&#x7236;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;</li><li>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;super&#x6765;&#x8C03;&#x7528;&#x7236;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;</li><li>&#x4E0D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;delete&#x6765;&#x5220;&#x9664;super&#x4E0A;&#x7684;&#x5C5E;&#x6027;</li><li>&#x4E0D;&#x53EF;&#x4EE5;&#x590D;&#x5199;super&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x53EA;&#x8BFB;&#x5C5E;&#x6027;</li></ol><h2>&#x5B50;&#x7C7B;&#x4E2D;&#x662F;&#x5426;&#x5FC5;&#x987B;&#x4E3B;&#x52A8;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#xFF1F;</h2><p>&#x6211;&#x7684;&#x770B;&#x6CD5;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x3002;<br>&#x7F51;&#x4E0A;&#x6709;&#x4E9B;&#x6587;&#x7AE0;&#xFF08;<a href="https://segmentfault.com/a/1190000008165717">&#x6BD4;&#x5982;&#x8FD9;&#x7BC7;</a>&#xFF09;&#x5199;&#x9053;&#xFF1A;</p><blockquote>&#x56E0;&#x4E3A;&#x82E5;&#x4E0D;&#x6267;&#x884C;super&#xFF0C;&#x5219;this&#x65E0;&#x6CD5;&#x521D;&#x59CB;&#x5316;&#x3002;</blockquote><p>&#x6211;&#x7684;&#x4E2A;&#x4EBA;&#x7406;&#x89E3;&#x662F;&#xFF0C;this&#x662F;&#x6307;&#x4EE3;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x73AF;&#x5883;&#x7684;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x65E0;&#x6CD5;&#x521D;&#x59CB;&#x5316;&#x7684;&#x60C5;&#x51B5;&#x3002;&#x66F4;&#x51C6;&#x786E;&#x7684;&#x8BF4;&#x6CD5;&#x662F;&#x8FD9;&#x6837;&#xFF1A;&#x5982;&#x679C;&#x4E0D;&#x4F7F;&#x7528;super&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x7236;&#x7C7B;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x65E0;&#x6CD5;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5B50;&#x7C7B;&#x901A;&#x8FC7;this&#x5B57;&#x6BB5;&#x6765;&#x8BBF;&#x95EE;&#x4E86;&#x7236;&#x7C7B;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x90A3;&#x4E48;&#x53EA;&#x80FD;&#x5F97;&#x5230;&#x4E00;&#x4E2A;undefined&#x3002;&#x81F3;&#x4E8E;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x4E48;&#x5199;&#x7F16;&#x8BD1;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x62A5;&#x9519;&#xFF1F;&#x6211;&#x7684;&#x7406;&#x89E3;&#x662F;&#xFF0C;&#x8FD9;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x79CD;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;&#xFF0C;&#x800C;&#x4E14;&#x662F;&#x4E00;&#x79CD;&#x89C4;&#x8303;&#x8981;&#x6C42;&#xFF0C;ES6&#x8BED;&#x6CD5;&#x7684;&#x89C4;&#x8303;&#x8981;&#x6C42;&#xFF0C;&#x8FD9;&#x79CD;&#x8981;&#x6C42;&#x5E76;&#x4E0D;&#x662F;&#x8BF4;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x4EE3;&#x7801;&#x7684;&#x5B9E;&#x9645;&#x6267;&#x884C;&#x3002;&#x4E3E;&#x4E2A;&#x6817;&#x5B50;&#xFF1A;</p><pre><code class="javascript">// typescript&#x4E2D;&#x4E00;&#x6BB5;&#x7B80;&#x5355;&#x7684;&#x7EE7;&#x627F;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;
class Parent {
    name = &apos;parent&apos;;
    func = function() {
        console.log(&apos;func in parent called.&apos;);
    }
}

class Child extends Parent {
    age = 3;
    func = function() {
        console.log(&apos;age is: &apos;, this.age);    // &#x4F7F;&#x7528;&#x4E86;this&#xFF0C;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;
    }
}</code></pre><p>&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;this&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x7F16;&#x8BD1;&#x65F6;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x6267;&#x884C;&#x3002;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x4E00;&#x70B9;&#x4FEE;&#x6539;&#xFF0C;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x5F15;&#x5165;constructor&#x65B9;&#x6CD5;</p><pre><code>class Child extends Parent {
    age = 3;
    // error TS2377: Constructors for derived classes must contain a &apos;super&apos; call.
    constructor() {
        
    }
    func = function() {
        console.log(&apos;age is: &apos;, this.age);
    }
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#x5DF2;&#x7ECF;&#x5F00;&#x59CB;&#x62A5;&#x9519;&#x4E86;&#x3002;&#x5728;typescript&#x7684;&#x8BED;&#x6CD5;&#x4E2D;&#xFF0C;&#x5B50;&#x7C7B;&#x7684;constructor&#x65B9;&#x6CD5;&#x4E2D;&#x4E0D;&#x4F46;&#x9700;&#x8981;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x4E14;&#x5FC5;&#x987B;&#x5728;&#x7B2C;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x5C31;&#x8C03;&#x7528;super&#xFF0C;&#x5426;&#x5219;&#x90FD;&#x662F;&#x4F1A;&#x62A5;&#x9519;&#x7684;&#x3002;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;:</p><pre><code>class Child extends Parent {
    age = 3;
    constructor() {
        console.log(&apos;First line in constructor without super method&apos;);
        super();    // error TS2376: A &apos;super&apos; call must be the first statement in the constructor when a class contains initialized properties or has parameter properties.
    }
    func = function() {
        console.log(&apos;age is: &apos;, this.age);
    }
}</code></pre><p>&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x6539;</p><pre><code>class Parent {
    name = &apos;parent&apos;;
    func = function() {
        console.log(&apos;func in parent called.&apos;);
    }
}

class Child extends Parent {
    age = 3;
    constructor() {
        console.log(&apos;Show property of parent, name is: &apos;, this.name);    // error TS17009: &apos;super&apos; must be called before accessing &apos;this&apos; in the constructor of a derived class.
        console.log(&apos;Show property of child, age is: &apos;, this.age);        // error TS17009: &apos;super&apos; must be called before accessing &apos;this&apos; in the constructor of a derived class.
        super();    // error TS2376: A &apos;super&apos; call must be the first statement in the constructor when a class contains initialized properties or has parameter properties.
        console.log(&apos;Show property of parent, name is: &apos;, this.name);
        console.log(&apos;Show property of child, age is: &apos;, this.age);
    }
    func = function() {
        console.log(&apos;age is: &apos;, this.age);
    }
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x7F16;&#x8BD1;&#x671F;&#x5DF2;&#x7ECF;&#x5F00;&#x59CB;&#x62A5;&#x5404;&#x79CD;&#x9519;&#x8BEF;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E0D;&#x91CD;&#x8981;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x5229;&#x7528;typescript&#x7684;&#x7F16;&#x8BD1;&#x5668;&#xFF08;tsc&#xFF09;&#x6765;&#x8FDB;&#x884C;&#x7F16;&#x8BD1;&#xFF0C;&#x5E76;&#x67E5;&#x770B;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x5185;&#x5BB9;&#xFF1A;</p><pre><code>var __extends = (this &amp;&amp; this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &amp;&amp; function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Parent = (function () {
    function Parent() {
        this.name = &apos;parent&apos;;
        this.func = function () {
            console.log(&apos;func in parent called.&apos;);
        };
    }
    return Parent;
}());
var Child = (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = this;
        _this.age = 3;
        _this.func = function () {
            console.log(&apos;age is: &apos;, this.age);
        };
        console.log(&apos;Show property of parent, name is: &apos;, _this.name); // &#x8F93;&#x51FA;undefined&#xFF0C;&#x56E0;&#x4E3A;&#x6B64;&#x65F6;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x4E0A;&#x8FD8;&#x6CA1;&#x6709;&#x7EE7;&#x627F;&#x5230;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x503C;
        console.log(&apos;Show property of child, age is: &apos;, _this.age); // &#x8F93;&#x51FA;3&#xFF0C;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;
        _this = _super.call(this) || this; // &#x6784;&#x9020;&#x51FD;&#x6570;&#x5F0F;&#x7684;&#x7EE7;&#x627F;&#x5B9E;&#x73B0;&#xFF0C;&#x8FD9;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x8BB2;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x8BBE;&#x7F6E;&#x5230;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x4E0A;
        console.log(&apos;Show property of parent, name is: &apos;, _this.name); // &#x8F93;&#x51FA;parent&#xFF0C;&#x6B64;&#x65F6;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x4E0A;&#x7ECF;&#x8FC7;&#x4E0A;&#x4E00;&#x6B65;&#x7684;&#x7EE7;&#x627F;&#xFF0C;&#x5F97;&#x5230;&#x4E86;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x503C;
        console.log(&apos;Show property of child, age is: &apos;, _this.age);  // &#x8F93;&#x51FA;3&#xFF0C;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x81EA;&#x5DF1;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;
        return _this;
    }
    return Child;
}(Parent));
//# sourceMappingURL=demo.js.map</code></pre><p>&#x7531;&#x6B64;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF0C;&#x5728;ES6&#x4E2D;&#x4F7F;&#x7528;extends&#x8FDB;&#x884C;&#x7EE7;&#x627F;&#x64CD;&#x4F5C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;</p><ul><li>&#x5B50;&#x7C7B;&#x5E76;&#x975E;&#x5FC5;&#x987B;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#xFF0C;&#x9664;&#x975E;&#x5B58;&#x5728;constructor&#x65B9;&#x6CD5;</li><li>&#x5728;constructor&#x65B9;&#x6CD5;&#x4E2D;&#x5E94;&#x8BE5;&#x9996;&#x5148;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x662F;&#x8BED;&#x6CD5;&#x8981;&#x6C42;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x4E0D;&#x662F;&#x5FC5;&#x987B;&#x7684;</li><li>&#x5728;&#x8C03;&#x7528;super&#x65B9;&#x6CD5;&#x4E4B;&#x524D;&#xFF0C;&#x5C06;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;this&#x5173;&#x952E;&#x5B57;&#x6765;&#x8BBF;&#x95EE;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#xFF08;&#x8FD9;&#x91CC;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x91CA;&#x5176;&#x4ED6;&#x6587;&#x7AE0;&#x4E2D;&#x63D0;&#x5230;&#x7684; &#x2018;&#x82E5;&#x4E0D;&#x6267;&#x884C;super&#xFF0C;&#x5219;this&#x65E0;&#x6CD5;&#x521D;&#x59CB;&#x5316;&#x2019;&#xFF0C;&#x66F4;&#x51C6;&#x786E;&#x7684;&#x8BF4;&#x6CD5;&#x5E94;&#x8BE5;&#x662F;&#x2018;&#x82E5;&#x4E0D;&#x6267;&#x884C;super&#xFF0C;&#x5219;&#x65E0;&#x6CD5;&#x5C06;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x521D;&#x59CB;&#x5316;&#x5230;&#x5F53;&#x524D;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x4E0A;&#x2019;&#xFF09;</li></ul><h2>&#x5B50;&#x7C7B;&#x4E2D;&#x4F7F;&#x7528;super.prop&#x548C;super[expr]&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x5982;&#x4F55;&#x8BBF;&#x95EE;&#x7236;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#xFF1F;</h2><p>&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x6765;&#x770B;&#x4EE3;&#x7801;&#x5427;,&#x5173;&#x952E;&#x70B9;&#x90FD;&#x6CE8;&#x91CA;&#x4E86;&#x7684;</p><pre><code>class Parent {
    public name = &apos;parent&apos;;
    public static staticName = &apos;staticParent&apos;;
    public static staticFunc() {
        console.log(&apos;staticFunc called in parent.&apos;);
    }

    public arrowFunc = () =&gt; {
        console.log(&apos;arrowFunc called in parent.&apos;);
    }

    public normalFunc() {
        console.log(&apos;normalFunc called in parent.&apos;)
    }
}

class Child extends Parent {
    public static staticFunc() {
        super.staticFunc();
        console.log(&apos;staticFunc called in Child.&apos;);
    }

    arrowFunc = () =&gt; {
        super.arrowFunc();
        console.log(&apos;arrowFunc called in Child.&apos;);
    }

    normalFunc() {
        super.normalFunc();
        console.log(&apos;normalFunc called in Child.&apos;)
    }

    getName() {
        console.log(&apos;parent name is: &apos;, super.name);
        console.log(&apos;parent staticName is: &apos;, super.staticName);
        console.log(&apos;child name is: &apos;, this.name);
    }
}

/** &#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801; **/
var __extends = (this &amp;&amp; this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &amp;&amp; function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Parent = (function () {
    function Parent() {
        this.name = &apos;parent&apos;;
        this.arrowFunc = function () {
            console.log(&apos;arrowFunc called in parent.&apos;);
        };
    }
    // &#x7F16;&#x8BD1;&#x540E;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5B58;&#x5728;&#x4E8E;Parent&#x7C7B;&#x7684;&#x5185;&#x90E8;
    Parent.staticFunc = function () {
        console.log(&apos;staticFunc called in parent.&apos;);
    };
    Parent.prototype.normalFunc = function () {
        console.log(&apos;normalFunc called in parent.&apos;);
    };
    return Parent;
}());
Parent.staticName = &apos;staticParent&apos;; // &#x7F16;&#x8BD1;&#x540E;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x4F9D;&#x7136;&#x5B58;&#x5728;&#x4E8E;Parent&#x7C7B;&#x5916;
var Child = (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super !== null &amp;&amp; _super.apply(this, arguments) || this;
        _this.arrowFunc = function () { // &#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x8C03;&#x7528;arrowFunc&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x56E0;&#x4E3A;_super.prototype&#x4E0A;&#x662F;&#x4E0D;&#x5B58;&#x5728;arrowFunc&#x65B9;&#x6CD5;&#x7684;
            _super.prototype.arrowFunc.call(_this); // Uncaught TypeError: Cannot read property &apos;call&apos; of undefined
            console.log(&apos;arrowFunc called in Child.&apos;);
        };
        return _this;
    }
    Child.staticFunc = function () {
        _super.staticFunc.call(this);   // super&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;
        console.log(&apos;staticFunc called in Child.&apos;);
    };
    Child.prototype.normalFunc = function () {
        _super.prototype.normalFunc.call(this);
        console.log(&apos;normalFunc called in Child.&apos;);
    };
    Child.prototype.getName = function () {
        console.log(&apos;parent name is: &apos;, _super.prototype.name); // &#x8F93;&#x51FA;undefined&#xFF0C; &#x7236;&#x7C7B;&#x539F;&#x578B;&#xFF08;_super.prototype&#xFF09;&#x4E0A;&#x4E0D;&#x5B58;&#x5728;name&#x5C5E;&#x6027;
        console.log(&apos;parent staticName is: &apos;, _super.prototype.staticName); // &#x8F93;&#x51FA;undefined&#xFF0C;super&#x65E0;&#x6CD5;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;
        console.log(&apos;child name is: &apos;, this.name);  // &#x8F93;&#x51FA;parent&#xFF0C;&#x8FD9;&#x662F;&#x5B50;&#x7C7B;&#x5B9E;&#x4F8B;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x7EE7;&#x627F;&#x81EA;&#x7236;&#x7C7B;
    };
    return Child;
}(Parent));
//# sourceMappingURL=demo.js.map</code></pre><p>&#x8FD9;&#x91CC;&#x518D;&#x987A;&#x5634;&#x63D0;&#x4E00;&#x53E5;&#xFF0C;&#x5173;&#x4E8E;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x548C;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x7684;&#x533A;&#x522B;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#x5728;&#x5B50;&#x7C7B;&#x4E2D;&#x901A;&#x8FC7;super&#x5173;&#x952E;&#x5B57;&#x6765;&#x83B7;&#x53D6;&#x7236;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x7ECF;&#x8FC7;&#x7F16;&#x8BD1;&#x540E;&#x662F;_super.staticFunc&#xFF0C;&#x800C;&#x83B7;&#x53D6;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x4F9D;&#x7136;&#x662F;_super.prototype.staticName&#xFF0C;&#x4ECE;&#x539F;&#x578B;&#x4E0A;&#x83B7;&#x53D6;&#x5BFC;&#x81F4;&#x83B7;&#x53D6;&#x5931;&#x8D25;&#x5462;&#xFF1F;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x76EE;&#x524D;&#x6211;&#x8FD8;&#x6CA1;&#x6709;&#x627E;&#x5230;&#x7B54;&#x6848;&#xFF0C;&#x5E0C;&#x671B;&#x6709;&#x77E5;&#x9053;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x53EF;&#x4EE5;&#x4E0D;&#x541D;&#x6307;&#x6559;&#x3002;<br>&#x4E0D;&#x8FC7;&#x6211;&#x5012;&#x662F;&#x641C;&#x5230;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x76F8;&#x5173;&#x5185;&#x5BB9;&#x3002;<br><a href="http://es6.ruanyifeng.com/#docs/class" rel="nofollow noreferrer">Class &#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x548C;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;</a></p><blockquote>&#x56E0;&#x4E3A; ES6 &#x660E;&#x786E;&#x89C4;&#x5B9A;&#xFF0C;Class &#x5185;&#x90E8;&#x53EA;&#x6709;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF0C;&#x6CA1;&#x6709;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x3002;</blockquote><p>&#x867D;&#x7136;&#x8FD9;&#x79CD;&#x89C4;&#x5B9A;&#x4ECE;ES7&#x5F00;&#x59CB;&#x5F97;&#x5230;&#x4E86;&#x4FEE;&#x6B63;&#xFF0C;&#x6211;&#x4EEC;&#x76EE;&#x524D;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x5C06;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x5199;&#x5728;Class&#x7684;&#x5185;&#x90E8;&#xFF0C;&#x4F46;&#x662F;&#x7ECF;&#x8FC7;&#x7F16;&#x8BD1;&#x4E4B;&#x540E;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#xFF0C;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x4F9D;&#x7136;&#x5B58;&#x5728;&#x4E8E;&#x7C7B;&#x7684;&#x5B9E;&#x73B0;&#x7684;&#x5916;&#x90E8;&#x3002;</p><pre><code>var Parent = (function () {
    function Parent() {
        this.name = &apos;parent&apos;;
        this.arrowFunc = function () {
            console.log(&apos;arrowFunc called in parent.&apos;);
        };
    }
    // &#x7F16;&#x8BD1;&#x540E;&#x7684;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5B58;&#x5728;&#x4E8E;Parent&#x7C7B;&#x7684;&#x5185;&#x90E8;
    Parent.staticFunc = function () {
        console.log(&apos;staticFunc called in parent.&apos;);
    };
    Parent.prototype.normalFunc = function () {
        console.log(&apos;normalFunc called in parent.&apos;);
    };
    return Parent;
}());
Parent.staticName = &apos;staticParent&apos;; // &#x7F16;&#x8BD1;&#x540E;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x4F9D;&#x7136;&#x5B58;&#x5728;&#x4E8E;Parent&#x7C7B;&#x5916;</code></pre><h1>&#x56DE;&#x5230;&#x95EE;&#x9898;&#x672C;&#x8EAB;</h1><p>&#x95EE;&#xFF1A;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5728;&#x7EE7;&#x627F;&#x8FC7;&#x7A0B;&#x4E2D;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;super&#x5173;&#x952E;&#x5B57;&#x83B7;&#x53D6;&#xFF0C;&#x8FD9;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;<br>&#x7B54;&#xFF1A;&#x56E0;&#x4E3A;&#x5B50;&#x7C7B;&#x4E2D;&#x4F7F;&#x7528;super.prop&#x548C;super[expr]&#x7684;&#x65B9;&#x5F0F;&#x83B7;&#x53D6;&#x7684;&#x662F;&#x7236;&#x7C7B;&#x539F;&#x578B;&#xFF08;prototype&#xFF09;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x9664;&#x5916;&#x3002;</p><h1>&#x53C2;&#x8003;&#x8D44;&#x6599;</h1><p><a href="http://wulv.site/2017-05-29/%E4%BB%8EES6%E4%B8%AD%E7%9A%84extends%E8%AE%B2js%E5%8E%9F%E5%9E%8B%E9%93%BE%E4%B8%8E%E7%BB%A7%E6%89%BF.html" rel="nofollow noreferrer">&#x4ECE;ES6&#x4E2D;&#x7684;extends&#x8BB2;js&#x539F;&#x578B;&#x94FE;&#x4E0E;&#x7EE7;&#x627F;</a><br><a href="https://segmentfault.com/a/1190000008165717">React ES6 class constructor super()</a><br><a href="http://es6.ruanyifeng.com/#docs/class" rel="nofollow noreferrer">Class &#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#x548C;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
由一篇ES6继承文章引发对于super关键字的思考

## 原文链接
[https://segmentfault.com/a/1190000016153555](https://segmentfault.com/a/1190000016153555)

