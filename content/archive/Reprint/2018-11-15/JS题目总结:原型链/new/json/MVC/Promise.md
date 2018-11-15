---
title: 'JS题目总结:原型链/new/json/MVC/Promise' 
date: 2018-11-15 2:30:08
reprint: true
categories: reprint
---

{{% raw %}}
<h1>JS&#x9898;&#x76EE;&#x603B;&#x7ED3;:&#x539F;&#x578B;&#x94FE;/new/json/MVC/Promise</h1><h2>1&#x539F;&#x578B;&#x94FE;&#x76F8;&#x5173;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000016107044?w=672&amp;h=815" src="https://static.alili.tech/img/remote/1460000016107044?w=672&amp;h=815" alt="P4oVZ8.png" title="P4oVZ8.png"></span><br>&#x89E3;&#x8BFB;:<br>&#x4E0A;&#x56FE;&#x4E2D;,Object,Function,Array,Boolean&#x90FD;&#x662F;&#x6784;&#x9020;<strong>&#x51FD;&#x6570;</strong></p><p>&#x7B2C;&#x4E00;&#x4E2A;&#x6846;:<br>object&#x662F;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;,&#x4ED6;&#x7684;&#x6A21;&#x677F;&#x5BF9;&#x8C61;(&#x539F;&#x578B;&#x5BF9;&#x8C61;)&#x5728;Object()&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x9762;.<br><code>&#x6784;&#x9020;&#x51FD;&#x6570;.prototype</code>&#x6307;&#x5411;&#x7684;&#x662F;<strong>&#x539F;&#x578B;&#x5BF9;&#x8C61;</strong>,&#x5373;&#x6A21;&#x677F;&#x5BF9;&#x8C61;.<br><code>&#x7531;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6784;&#x9020;&#x51FA;&#x6765;&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;.__proto__</code>&#x4E5F;&#x6307;&#x5411;&#x7684;&#x662F;<strong>&#x539F;&#x578B;&#x5BF9;&#x8C61;</strong>,&#x5373;&#x6A21;&#x677F;&#x5BF9;&#x8C61;.<br>&#x6240;&#x4EE5;true.</p><p>&#x7B2C;&#x4E8C;&#x4E2A;&#x6846;:<br>fn&#x662F;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x51FD;&#x6570;,&#x662F;&#x7531;<strong>&#x7528;&#x6765;&#x6784;&#x9020;&#x51FA;&#x51FD;&#x6570;</strong>&#x7684;<strong>&#x6784;&#x9020;&#x51FD;&#x6570;</strong>&#x9020;&#x51FA;&#x6765;&#x7684;.<br>&#x6240;&#x4EE5;<code>fn.__proto__ === Function.prototype</code></p><p><code>&#x4EFB;&#x4F55;&#x6784;&#x9020;&#x51FD;&#x6570;.prototype</code>&#x90FD;&#x662F;&#x4E00;&#x4E2A;<strong>&#x5BF9;&#x8C61;</strong>.<br>&#x56E0;&#x4E3A;<code>fn.__proto__ === Function.prototype</code><br>&#x6240;&#x4EE5;<code>fn.__proto__.__proto__ === Object.prototype</code>&#x7B49;&#x4EF7;&#x4E8E;<br><code>Function.prototype.__proto__ === Object.prototype</code><br>&#x7B49;&#x4EF7;&#x4E8E;<br><code>&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;.__proto__ === Object.prototype</code><br>&#x6240;&#x4EE5;&#x662F;true</p><p>&#x7B2C;&#x4E09;&#x4E2A;&#x6846;&#x540C;&#x7406;.</p><p>&#x7B2C;&#x56DB;&#x4E2A;&#x6846;&#x6BD4;&#x8F83;&#x96BE;&#x7406;&#x89E3;:<br>&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x51FD;&#x6570;&#x662F;&#x7531;<strong>&#x7528;&#x6765;&#x6784;&#x9020;&#x51FA;&#x51FD;&#x6570;</strong>&#x7684;<strong>&#x6784;&#x9020;&#x51FD;&#x6570;</strong>&#x9020;&#x51FA;&#x6765;&#x7684;.</p><p>Object,Function,Array&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x51FD;&#x6570;,&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x7C7B;&#x578B;,&#x5C31;&#x50CF;String&#x662F;&#x4E00;&#x79CD;&#x7C7B;&#x578B;,Number&#x662F;&#x4E00;&#x79CD;&#x7C7B;&#x578B;&#x4E00;&#x6837;,&#x51FD;&#x6570;&#x8FD9;&#x4E2A;&#x7C7B;&#x578B;&#x91CC;&#x7684;&#x5B9E;&#x4F8B;&#x51FD;&#x6570;&#x7531;<strong>&#x51FD;&#x6570;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;</strong>&#x9020;&#x51FA;&#x6765;!&#x5F88;&#x96BE;&#x7406;&#x89E3;<br>&#x6240;&#x4EE5;<code>&#x5B9E;&#x4F8B;&#x51FD;&#x6570;.__proto__===&#x6784;&#x9020;&#x51FD;&#x6570;.prototype</code><br>&#x5B9E;&#x4F8B;&#x51FD;&#x6570;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x5C31;&#x662F;<code>Function</code></p><p>&#x6709;&#x70B9;&#x9E21;&#x751F;&#x86CB;&#x86CB;&#x751F;&#x9E21;&#x7684;&#x611F;&#x89C9;.</p><p>&#x7B2C;&#x4E94;&#x4E2A;&#x6846;&#x540C;&#x7406;</p><h2>2&#x9762;&#x5411;&#x5BF9;&#x8C61;,new,&#x539F;&#x578B;&#x94FE;&#x76F8;&#x5173;</h2><pre><code>function fn(){
    console.log(this)
}
new fn()</code></pre><p><code>new fn()</code> &#x4F1A;&#x6267;&#x884C; <code>fn</code>&#xFF0C;&#x5E76;&#x6253;&#x5370;&#x51FA; <code>this</code>&#xFF0C;&#x8BF7;&#x95EE;&#x8FD9;&#x4E2A; <code>this</code> &#x6709;&#x54EA;&#x4E9B;&#x5C5E;&#x6027;&#xFF1F;&#x8FD9;&#x4E2A; <code>this</code> &#x7684;&#x539F;&#x578B;&#x6709;&#x54EA;&#x4E9B;&#x5C5E;&#x6027;&#xFF1F;<br>&#x7B54;:<br>&#x8FD9;&#x4E2A;<code>this</code>&#x5C31;&#x662F;<code>new</code>&#x521B;&#x5EFA;&#x7684;&#x65B0;&#x5BF9;&#x8C61;.<br><code>this</code>(&#x8FD9;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;)&#x6709;<code>__protot__</code>&#x5C5E;&#x6027;,&#x5B83;&#x6307;&#x5411;<code>fn</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x539F;&#x578B;&#x5373;<code>fn.prototype</code><br>&#x8FD9;&#x4E2A;&#x539F;&#x578B;(&#x5373;<code>fn.prototype</code>)&#x6709;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;:</p><ol><li><code>construct</code> :&#x5B83;&#x7684;&#x503C;&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;<code>fn</code></li><li><code>__proto__</code>: &#x5B83;&#x6307;&#x5411;<code>Object.prototype</code></li></ol><p>&#x89E3;&#x8BFB;:<br><span class="img-wrap"><img data-src="/img/remote/1460000016107045?w=503&amp;h=240" src="https://static.alili.tech/img/remote/1460000016107045?w=503&amp;h=240" alt="P5Ctu8.png" title="P5Ctu8.png"></span></p><ol><li><code>fn()</code>&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;</li><li><code>new fn()</code>&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;<code>new</code>&#x51FA;&#x6765;&#x7684;&#x65B0;&#x5BF9;&#x8C61;.</li></ol><p>&#x4ED6;&#x7684;&#x81EA;&#x6709;&#x5C5E;&#x6027;&#x4E3A;&#x7A7A;,&#x5171;&#x6709;&#x5C5E;&#x6027;&#x4E3A;&#x7A7A;,&#x56E0;&#x4E3A;&#x90FD;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;<br>&#x56E0;&#x4E3A;&#x4ED6;&#x7684;&#x81EA;&#x6709;&#x5C5E;&#x6027;&#x4E3A;&#x7A7A;,&#x6240;&#x4EE5;&#x4ED6;&#x53EA;&#x6709;&#x4E00;&#x4E2A;<code>__proto__</code>&#x6307;&#x5411;<code>&#x6784;&#x9020;&#x51FD;&#x6570;.prototype</code>(&#x5373;&#x539F;&#x578B;)&#x4E86;.<br>&#x5171;&#x6709;&#x5C5E;&#x6027;&#x4E3A;&#x7A7A;,&#x6240;&#x4EE5;&#x4ED6;&#x7684;&#x539F;&#x578B;&#x5C31;&#x662F;&#x53EA;&#x6709;<code>constructor</code>&#x6307;&#x5411;&#x6784;&#x9020;&#x51FD;&#x6570;&#x548C;<code>__proto__</code>&#x6307;&#x5411;<code>Object.prototype</code>(&#x56E0;&#x4E3A;&#x539F;&#x578B;&#x672C;&#x8EAB;&#x5C31;&#x662F;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;,&#x6240;&#x4EE5;&#x6307;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;)<br>&#x4F8B;&#x5B50;:</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016107046?w=732&amp;h=398" src="https://static.alili.tech/img/remote/1460000016107046?w=732&amp;h=398" alt="P5U2pd.png" title="P5U2pd.png"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016107047?w=560&amp;h=229" src="https://static.alili.tech/img/remote/1460000016107047?w=560&amp;h=229" alt="P5aqUO.png" title="P5aqUO.png"></span></p><h2>3 json</h2><p>JSON &#x548C; JavaScript &#x662F;&#x4EC0;&#x4E48;&#x5173;&#x7CFB;&#xFF1F;<br>JSON &#x548C; JavaScript &#x7684;&#x533A;&#x522B;&#x6709;&#x54EA;&#x4E9B;&#xFF1F;</p><p>&#x5173;&#x7CFB;&#xFF1A;JSON &#x662F;&#x4E00;&#x95E8;&#x6284;&#x88AD;/&#x501F;&#x9274; JavaScript &#x7684;&#x8BED;&#x8A00;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x6570;&#x636E;&#x4EA4;&#x4E92;&#x683C;&#x5F0F;&#xFF0C;JSON &#x662F; JavaScript &#x7684;&#x5B50;&#x96C6;&#xFF08;&#x6216;&#x8005;&#x8BF4; JSON &#x53EA;&#x6284;&#x88AD;&#x4E86;&#x4E00;&#x90E8;&#x5206; JavaScript &#x8BED;&#x6CD5;&#xFF0C;&#x800C;&#x4E14;&#x6CA1;&#x6709;&#x65B0;&#x589E;&#x4EFB;&#x4F55;&#x539F;&#x521B;&#x7684;&#x8BED;&#x6CD5;&#xFF09;</p><p>&#x533A;&#x522B;&#xFF1A;JSON &#x4E0D;&#x652F;&#x6301;&#x51FD;&#x6570;&#x3001;undefined&#x3001;&#x53D8;&#x91CF;&#x3001;&#x5F15;&#x7528;&#x3001;&#x5355;&#x5F15;&#x53F7;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x5BF9;&#x8C61;&#x7684;key&#x4E0D;&#x652F;&#x6301;&#x5355;&#x5F15;&#x53F7;&#x4E5F;&#x4E0D;&#x652F;&#x6301;&#x4E0D;&#x52A0;&#x5F15;&#x53F7;&#x3001;&#x6CA1;&#x6709;&#x5185;&#x7F6E;&#x7684; Date&#x3001;Math&#x3001;RegExp &#x7B49;&#x3002;<br>&#x800C; JavaScript &#x5168;&#x90FD;&#x652F;&#x6301;&#x3002;</p><h2>4 MVC</h2><p>&#x524D;&#x7AEF; MVC &#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#xFF08;10&#x5206;&#xFF09;<br>&#x8BF7;&#x7528;&#x4EE3;&#x7801;&#x5927;&#x6982;&#x8BF4;&#x660E; MVC &#x4E09;&#x4E2A;&#x5BF9;&#x8C61;&#x5206;&#x522B;&#x6709;&#x54EA;&#x4E9B;&#x91CD;&#x8981;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;&#xFF08;10&#x5206;&#xFF09;</p><p>&#x7B54;&#x4E00;:</p><blockquote>MVC &#x662F;&#x4EC0;&#x4E48; MVC &#x662F;&#x4E00;&#x79CD;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF08;&#x6216;&#x8005;&#x8F6F;&#x4EF6;&#x67B6;&#x6784;&#xFF09;&#xFF0C;&#x628A;&#x7CFB;&#x7EDF;&#x5206;&#x4E3A;&#x4E09;&#x5C42;&#xFF1A;Model&#x6570;&#x636E;&#x3001;View&#x89C6;&#x56FE;&#x548C;Controller&#x63A7;&#x5236;&#x5668;&#x3002;<br>Model &#x6570;&#x636E;&#x7BA1;&#x7406;&#xFF0C;&#x5305;&#x62EC;&#x6570;&#x636E;&#x903B;&#x8F91;&#x3001;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#x3001;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x7B49;&#x529F;&#x80FD;&#x3002;&#x524D;&#x7AEF; Model &#x4E3B;&#x8981;&#x8D1F;&#x8D23; AJAX &#x8BF7;&#x6C42;&#x6216;&#x8005; LocalStorage &#x5B58;&#x50A8;<br>View &#x8D1F;&#x8D23;&#x7528;&#x6237;&#x754C;&#x9762;&#xFF0C;&#x524D;&#x7AEF; View &#x4E3B;&#x8981;&#x8D1F;&#x8D23; HTML &#x6E32;&#x67D3;&#x3002; Controller &#x8D1F;&#x8D23;&#x5904;&#x7406; View &#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x66F4;&#x65B0;<br>Model&#xFF1B;&#x4E5F;&#x8D1F;&#x8D23;&#x76D1;&#x542C; Model &#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5E76;&#x66F4;&#x65B0; View&#xFF0C;Controller &#x63A7;&#x5236;&#x5176;&#x4ED6;&#x7684;&#x6240;&#x6709;&#x6D41;&#x7A0B;&#x3002;</blockquote><p>&#x7B54;&#x4E8C;:<br>MVC&#x5C31;&#x662F;&#x628A;&#x4EE3;&#x7801;&#x5206;&#x4E3A;&#x4E09;&#x5757;</p><p>V(view)&#x53EA;&#x8D1F;&#x8D23;&#x770B;&#x5F97;&#x89C1;&#x7684;&#x4E1C;&#x897F;.<br>M(model)&#x53EA;&#x8D1F;&#x8D23;&#x8DDF;&#x6570;&#x636E;&#x76F8;&#x5173;&#x7684;&#x64CD;&#x4F5C;,&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;DOM,&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x4EFB;&#x4F55;&#x7684;html/css&#x64CD;&#x4F5C;.&#x4F8B;&#x5982;model&#x91CC;&#x53EA;&#x4F1A;&#x6709;&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x5E93;,&#x83B7;&#x53D6;&#x6570;&#x636E;&#x65B9;&#x6CD5;fetch(),&#x4FDD;&#x5B58;&#x6570;&#x636E;&#x7684;&#x65B9;&#x6CD5;save()<br>C(controller)&#x53EA;&#x8D1F;&#x8D23;&#x628A;&#x8FD9;&#x4E9B;view&#x548C;model&#x7EC4;&#x5408;&#x8D77;&#x6765;,&#x627E;&#x5230;view,&#x627E;&#x5230;model,&#x4F7F;&#x7528;model&#x5B8C;&#x6210;&#x6570;&#x636E;&#x4FEE;&#x6539;&#x4E1A;&#x52A1;,&#x5E76;&#x4FEE;&#x6539;view&#x7684;&#x663E;&#x793A;<br>V:&#x89C6;&#x56FE;<br>M:&#x6570;&#x636E;<br>C:&#x63A7;&#x5236;&#x5668;</p><p>MVC&#x662F;&#x4E00;&#x79CD;&#x4EE3;&#x7801;&#x7EC4;&#x7EC7;&#x5F62;&#x5F0F;,&#x4E0D;&#x662F;&#x4EFB;&#x4F55;&#x4E00;&#x79CD;&#x6846;&#x67B6;,&#x4E5F;&#x4E0D;&#x662F;&#x4EFB;&#x4F55;&#x4E00;&#x79CD;&#x6280;&#x672F;,&#x53EA;&#x662F;&#x7EC4;&#x7EC7;&#x4EE3;&#x7801;&#x7684;&#x601D;&#x60F3;,&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;V&#x548C;M&#x4F20;&#x7ED9;C,C&#x53BB;&#x7EDF;&#x7B79;<br>&#x5728;js&#x91CC;,MVC&#x5206;&#x522B;&#x7531;&#x4E09;&#x4E2A;&#x5BF9;&#x8C61;&#x53BB;&#x62C5;&#x4EFB;&#x4E09;&#x4E2A;&#x804C;&#x8D23;</p><p>&#x4EE3;&#x7801;&#x4E00;:</p><pre><code>window.View = function(xxx){
    return document.querySelector(xxx);
}</code></pre><pre><code>window.Model = function(object){
    let resourceName = object.resourceName;
    return {
        init: function () { 
        },
        fetch: function () { 
        },
        save: function (object) {
        }
    }
}</code></pre><pre><code>window.Controller = function(options){
    var init = options.init;
    let object = {
        view:null,
        model:null,
        init:function(view,model){
            this.view = view;
            this.model = model;
            this.model.init();
            init.call(this,view,model);
            this.bindEvents();
        },
        bindevnets:function(){},
    };

    for (let key in options) {
        if(key !==&apos;init&apos;){
            object[key] = options[key]
        }
    };
    return object;
}</code></pre><p>&#x4EE3;&#x7801;&#x4E8C;:</p><pre><code>var model = {
    data: null,
    init(){}
    fetch(){}
    save(){}
    update(){}
    delete(){}
}
view = {
    init() {}
    template: &apos;&lt;h1&gt;hi&lt;/h1&apos;&gt;
}
controller = {
    view: null,
    model: null,
    init(view, model){
        this.view = view
        this.model = model
        this.bindEvents()
    }
    render(){
        this.view.querySelector(&apos;name&apos;).innerText = this.model.data.name
    },
    bindEvents(){}
}</code></pre><h2>5 ES5&#x7C7B;,&#x539F;&#x578B;&#x94FE;,&#x6784;&#x9020;&#x51FD;&#x6570;,new</h2><p>&#x5982;&#x4F55;&#x5728; ES5 &#x4E2D;&#x5982;&#x4F55;&#x7528;&#x51FD;&#x6570;&#x6A21;&#x62DF;&#x4E00;&#x4E2A;&#x7C7B;&#xFF1F;&#xFF08;10&#x5206;&#xFF09;</p><p>&#x7B54;&#x4E00;:</p><p>&#x4F7F;&#x7528;&#x539F;&#x578B;&#x5BF9;&#x8C61;,&#x6784;&#x9020;&#x51FD;&#x6570;,new&#x6765;&#x6A21;&#x62DF;&#x7C7B;.</p><ol><li>&#x5C06;&#x516C;&#x5171;&#x5C5E;&#x6027;&#x653E;&#x5230;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x91CC;,&#x5E76;&#x4E14;&#x5C06;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;<code>prototype</code>&#x5C5E;&#x6027;&#x6307;&#x5411;&#x539F;&#x578B;&#x5BF9;&#x8C61;.</li><li>&#x79C1;&#x6709;&#x5C5E;&#x6027;(&#x81EA;&#x6709;&#x5C5E;&#x6027;)&#x653E;&#x5230;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x53BB;&#x5B9A;&#x4E49;.</li><li>&#x5C06;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x5BF9;&#x8C61;&#x7684;<code>__proto__</code>&#x6307;&#x5411;&#x539F;&#x578B;&#x5BF9;&#x8C61;.</li></ol><p>&#x8FD9;&#x6837;&#x5F53;&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x5373;&#x62E5;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4E5F;&#x6709;&#x516C;&#x6709;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#x4E86;&#xFF0C;&#x5B9E;&#x4F8B;&#x5316;&#x51FA;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x79C1;&#x6709;&#x65B9;&#x6CD5;&#x548C;&#x53D8;&#x91CF;&#x4FEE;&#x6539;&#x90FD;&#x4E0D;&#x4F1A;&#x4E92;&#x76F8;&#x6709;&#x5F71;&#x54CD;&#xFF0C;&#x53EA;&#x6709;&#x5728;&#x4FEE;&#x6539;&#x516C;&#x6709;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#x662F;&#x5BF9;&#x6240;&#x6709;&#x5B9E;&#x4F8B;&#x751F;&#x6548;&#x7684;</p><p>&#x7B54;&#x4E8C;:<br>ES 5 &#x6CA1;&#x6709; class &#x5173;&#x952E;&#x5B57;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x80FD;&#x4F7F;&#x7528;&#x51FD;&#x6570;&#x6765;&#x6A21;&#x62DF;&#x7C7B;&#x3002;</p><pre><code>function Human(name){
    this.name = name
}
Human.prototype.run = function(){}

var person = new Human(&apos;frank&apos;)</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x7C7B;&#xFF0C;<code>Human</code> &#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x51FA;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x6709; <code>name</code> &#x5C5E;&#x6027;&#xFF0C;&#x5176;&#x539F;&#x578B;&#x4E0A;&#x9762;&#x6709;&#x4E00;&#x4E2A; <code>run</code> &#x5C5E;&#x6027;&#x3002;</p><h2>Promise</h2><p>&#x7528;&#x8FC7; Promise &#x5417;&#xFF1F;&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;&#x3002;<br>&#x5982;&#x679C;&#x8981;&#x4F60;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE; Promise &#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4F60;&#x4F1A;&#x600E;&#x4E48;&#x5199;&#xFF1F;&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;&#x3002;</p><p>&#x7B54;:</p><h3>&#x7528;&#x8FC7;Promise</h3><p>&#x7B54;&#x4E00;:<br>&#x7528;&#x8FC7; Promise&#xFF0C;&#x6BD4;&#x5982; jQuery &#x6216;&#x8005; axios &#x7684; AJAX &#x529F;&#x80FD;&#xFF0C;&#x90FD;&#x8FD4;&#x56DE;&#x7684;&#x662F; Promise &#x5BF9;&#x8C61;&#x3002;</p><p><code>$.ajax({url:&apos;/xxx&apos;, method:&apos;get&apos;}).then(success1, error1).then(success2, error2)</code></p><p>&#x7B54;&#x4E8C;:<br>&#x7528;&#x8FC7;.&#x4F8B;&#x5982;&#x4F7F;&#x7528;jQuery&#x7684;Ajax()&#x53D1;&#x9001;&#x8BF7;&#x6C42;,&#x6210;&#x529F;&#x6216;&#x5931;&#x8D25;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;,&#x5C31;&#x662F;&#x4F7F;&#x7528;promise&#x5C01;&#x88C5;&#x7684;</p><pre><code>function success(responseText){
    console.log(&quot;&#x6210;&#x529F;&quot;)
    console.log(responseText);//responseTex
}
function fail(request){
    console.log(&quot;&#x5931;&#x8D25;&quot;)
    console.log(request);
}
myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    //&#x4F7F;&#x7528;ajax
    $.ajax({
        method:&quot;post&quot;,
        url:&quot;/xxx&quot;,
        data:&quot;username=mtt&amp;password=1&quot;,
        dataType:&apos;json&apos;//&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;,&#x5982;&#x679C;&#x4E0D;&#x5199;,&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x91CC;&#x8BBE;&#x7F6E;&#x7684;
    }
    ).then(success,fail)//$.ajax()&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;promise
})</code></pre><h3>&#x5199;Promise</h3><pre><code>function xxx(){
    return new Promise((f1, f2) =&gt; {
        doSomething()
        setTimeout(()=&gt;{
           if(success){
               f1();
           }else{
               f2();
           }
        },3000)
    })
}


&#x8C03;&#x7528;&#x65B9;&#x6CD5;:
xxx().then(success, fail)</code></pre><p>&#x6216;&#x8005;:</p><pre><code>function asyncMethod(){
    return new Promise(function (resolve, reject){
        setTimeout(function(){
            &#x6210;&#x529F;&#x5219;&#x8C03;&#x7528; resolve
            &#x5931;&#x8D25;&#x5219;&#x8C03;&#x7528; reject
        },3000)
    })
}</code></pre><p><a href="https://segmentfault.com/a/1190000015938472#articleHeader8">&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x6211;&#x7684;&#x535A;&#x5BA2;__&#x4F7F;&#x7528;Promise&#x5C01;&#x88C5;Ajax</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS题目总结:原型链/new/json/MVC/Promise

## 原文链接
[https://segmentfault.com/a/1190000016107041](https://segmentfault.com/a/1190000016107041)

