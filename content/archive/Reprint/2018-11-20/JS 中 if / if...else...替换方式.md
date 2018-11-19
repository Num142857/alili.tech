---
title: 'JS 中 if / if...else...替换方式' 
date: 2018-11-20 2:30:10
hidden: true
slug: mwcw50q5j
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015809532" src="https://static.alili.tech/img/remote/1460000015809532" alt="if/if...else...&#x66FF;&#x6362;&#x65B9;&#x5F0F;" title="if/if...else...&#x66FF;&#x6362;&#x65B9;&#x5F0F;"></span></p><p>&#x8BF4;&#x8BF4;&#x70C2;&#x5927;&#x8857;&#x7684;<code>if/if...else...</code>&#xFF0C;&#x7A0B;&#x5E8F;&#x4E2D;&#x7528;&#x5F97;&#x6700;&#x591A;&#x7684;&#x6D41;&#x7A0B;&#x5224;&#x65AD;&#x8BED;&#x53E5;&#x3002;</p><p>&#x5BF9;&#x7740;&#x66FE;&#x7ECF;&#x6EE1;&#x5C4F;&#x7684;<code>if/if...else...</code>&#xFF0C;&#x5FC3;&#x60F3;&#x80FD;&#x4E0D;&#x80FD;&#x641E;&#x70B9;&#x4E8B;&#x60C5;&#xFF0C;&#x6298;&#x817E;&#x70B9;&#x6D6A;&#x82B1;&#x6D6A;&#x91CC;&#x5440;&#x6D6A;&#x3002;</p><p>&#x5BF9;&#x9876;&#x7740;&#x201C;&#x8FD9;&#x4E2A;&#x9700;&#x6C42;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x6211;&#x4E0D;&#x7BA1;&#xFF0C;&#x660E;&#x5929;&#x4E0A;&#x7EBF;&#x201D;&#x7684;&#x7A0B;&#x5E8F;&#x733F;&#xFF0C;&#x7B54;&#x6848;&#x5FC5;&#x987B;YES&#x3002;</p><p><strong>&quot;Write Less, Do More&quot;</strong>&#xFF0C;&#x5B66;&#x4E60;&#x8FDB;&#x6B65;&#x7684;&#x672C;&#x8D28;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x66F4;&#x6709;&#x6548;&#x7387;&#x5730;&#x5077;&#x61D2;&#x3002;</p><p>&#x5E9F;&#x8BDD;&#x8BF4;&#x5B8C;&#xFF0C;&#x76F4;&#x63A5;&#x4E0A;&#x65B9;&#x6CD5;&#x6C47;&#x603B;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x4E00;&#x7AA5;&#x7A76;&#x7ADF;&#xFF1A;</p><h3>switch&#x6539;&#x5199;if</h3><pre><code>// if &#x7248;&#x672C;
var a = 1;
if(a &gt; 1 &amp;&amp; a &lt; 5) {
    return 1
} else if(a &gt; 5 &amp;&amp; a &lt; 10){
    return 5
}else{
    return 10
}

// switch &#x6539;&#x7248;
switch(true){
    case (a &gt; 1 &amp;&amp; a &lt; 5):
        return 1
    case (a &gt; 5 &amp;&amp; a &lt; 10):
        return 5
    default:
        return 10
}</code></pre><p>&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#x7684;<code>switch...case...</code>&#x7684;&#x7528;&#x6CD5;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x4E0D;&#x591A;&#xFF0C;&#x4EC5;&#x4F9B;&#x53C2;&#x8003;&#x3002;<br>&#x4E00;&#x822C;case&#x4E3A;&#x5E38;&#x91CF;&#x65F6;<code>switch...case...</code>&#x7528;&#x5F97;&#x8F83;&#x591A;&#x3002;</p><p>&#x9009;&#x62E9;&#x5206;&#x652F;&#x8F83;&#x591A;&#x65F6;&#xFF0C;&#x5EFA;&#x8BAE;&#x9009;&#x7528;<code>switch&#x2026;case</code>&#x53EF;&#x63D0;&#x9AD8;&#x7A0B;&#x5E8F;&#x7684;&#x6548;&#x7387;&#xFF0C;&#x4F46;<code>switch...case</code>&#x4E0D;&#x8DB3;&#x7684;&#x5730;&#x65B9;&#x5728;&#x4E8E;&#x53EA;&#x80FD;&#x5904;&#x7406;&#x5B57;&#x7B26;&#x6216;&#x8005;&#x6570;&#x5B57;&#x7C7B;&#x578B;&#x7684;&#x53D8;&#x91CF;&#xFF0C;<code>if&#x2026;else</code>&#x66F4;&#x52A0;&#x7075;&#x6D3B;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x5224;&#x65AD;&#x8868;&#x8FBE;&#x5F0F;&#x662F;&#x5426;&#x6210;&#x7ACB;&#xFF0C;&#x6BD4;&#x5982;<code>if(a+b&gt;c)</code>,<code>if&#x2026;else</code>&#x7684;&#x5E94;&#x7528;&#x8303;&#x56F4;&#x66F4;&#x5E7F;&#x3002;</p><h3>&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x6539;&#x5199;if</h3><pre><code>// if &#x7248;&#x672C;
if (bool) {
    value = 1;
} else {
    value = 2;
}

// &#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26; &#x7248;&#x672C;
value = bool ? 1 : 2;
// &#x4E09;&#x5143;&#x9884;&#x7B97;&#x7B26; &#x591A;&#x4E2A;&#x8FD0;&#x7B97;&#x9700;&#x8981;&#x62EC;&#x53F7;&#x5305;&#x88F9; &#x6B64;&#x5904;&#x7528;&#x4E86;&#x9017;&#x53F7;&#x8868;&#x8FBE;&#x5F0F;
return typeof foo === &apos;object&apos;?(console.log(1),1):(console.log(2),2);</code></pre><p>&#x4F18;&#x70B9;&#xFF1A;&#x4EE3;&#x7801;&#x7B80;&#x5316;&#xFF0C;&#x66F4;&#x52A0;&#x6E05;&#x723D;&#xFF0C;write less</p><p>&#x7F3A;&#x70B9;&#xFF1A;&#x590D;&#x6742;&#x7684;&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x53EF;&#x8BFB;&#x6027;&#x8F83;&#x5DEE;&#xFF0C;&#x9700;&#x53CB;&#x597D;&#x6CE8;&#x91CA;</p><p>TIPS: &#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x540E;&#x9762;&#x4E0D;&#x80FD;&#x5E26;return</p><pre><code>// &#x9519;&#x8BEF;&#x7528;&#x6CD5;&#xFF0C;&#x8FD0;&#x7B97;&#x7B26;&#x53F7;&#x540E;&#x4E0D;&#x80FD;&#x5E26;return
bool ? return 1 : return 2;</code></pre><h3>&#x903B;&#x8F91;&#x5224;&#x65AD; and(&amp;&amp;)&#x548C;or(||) &#x6539;&#x5199;if</h3><p>&#x539F;&#x7406;&#xFF1A;&#x5229;&#x7528;&#x903B;&#x8F91;&#x5224;&#x65AD;&#x7684;&#x77ED;&#x8DEF;&#x8FD0;&#x7B97;&#x6765;&#x5B9E;&#x73B0;</p><blockquote>&#x77ED;&#x8DEF;&#xFF1A;<code>&amp;&amp;</code> &#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#x4E3A;&#x5047;&#x5C31;&#x4E0D;&#x4F1A;&#x53BB;&#x5904;&#x7406;&#x7B2C;&#x4E8C;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;<code>||</code> &#x5219;&#x76F8;&#x53CD;</blockquote><pre><code>// if&#x4E3A;&#x771F;
if (bool) {
    value = getYes();
}
// &amp;&amp;&#x6539;&#x7248;
bool &amp;&amp; (value = getYes());

// if&#x4E3A;&#x5047;
if (!bool) {
    value = getNo();
}
bool || (value = getNo());</code></pre><p>&#x4F18;&#x70B9;&#xFF1A;&#x4EE3;&#x7801;&#x7B80;&#x5316;&#xFF0C;&#x66F4;&#x52A0;&#x6E05;&#x723D;&#xFF0C;write less</p><p>&#x7F3A;&#x70B9;&#xFF1A;&#x9002;&#x7528;&#x4E8E;&#x7B80;&#x5355;&#x5224;&#x65AD;&#x903B;&#x8F91;&#xFF0C;&#x590D;&#x6742;&#x7684;&#x5224;&#x65AD;&#x8FD0;&#x7B97;&#x53EF;&#x8BFB;&#x6027;&#x8F83;&#x5DEE;&#xFF0C;&#x9700;&#x53CB;&#x597D;&#x6CE8;&#x91CA;</p><p>TIPS&#xFF1A;&#x9002;&#x7528;&#x4E8E;&#x6CA1;&#x6709;else&#x7684;&#x573A;&#x666F;, &#x903B;&#x8F91;&#x8FD0;&#x7B97;&#x7B26;&#x540E;&#x9762;&#x4E0D;&#x80FD;&#x5E26;return</p><pre><code>// &#x9519;&#x8BEF;&#x7528;&#x6CD5;&#xFF0C;&#x8FD0;&#x7B97;&#x7B26;&#x53F7;&#x540E;&#x4E0D;&#x80FD;&#x5E26;return
boll || return true;</code></pre><hr><h4>&#x77E5;&#x8BC6;&#x70B9;&#x63D2;&#x64AD; &#x2014;&#x2014; (1)</h4><ol><li>&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x548C;&#x903B;&#x8F91;&#x8FD0;&#x7B97;&#x7B26;&#x90FD;&#x6709;&#x4E00;&#x5C42;return&#x4F5C;&#x7528;&#xFF0C;&#x4F46;&#x4E0D;&#x53EF;&#x4F5C;&#x7528;&#x4E8E;&#x51FD;&#x6570;return&#x8BED;&#x53E5;&#xFF0C;&#x6240;&#x4EE5;&#x50CF;&#x4EE5;&#x4E0B;&#x8FD9;&#x79CD;&#x7528;&#x6CD5;&#x90FD;&#x662F;&#x9519;&#x8BEF;&#x7684;&#xFF1B;</li></ol><pre><code>// &#x9519;&#x8BEF;&#x7528;&#x6CD5;
function getResult(value) {
    value ? &apos;yes&apos; : &apos;no&apos;;
}
var result = getResult(true); // &#x5E76;&#x4E0D;&#x4F1A;&#x6709;&#x503C;&#x8FD4;&#x56DE;</code></pre><ol><li>js&#x903B;&#x8F91;&#x8FD0;&#x7B97;&#x4E2D;&#xFF0C;<code>0/&quot;&quot;/null/false/undefined/NaN</code>&#x90FD;&#x4F1A;&#x5224;&#x4E3A;<code>false</code>&#xFF0C;&#x5176;&#x5B83;&#x90FD;&#x4E3A;<code>true</code>&#xFF1B;</li><li>&#x5F88;&#x591A;&#x5F00;&#x6E90;&#x4EE3;&#x7801;&#x4E2D;&#x53EF;&#x89C1;<code>if(!!attr)</code>&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x76F4;&#x63A5;&#x5199;<code>if(attr)</code>&#xFF0C; &#x5176;&#x5B9E;&#x8FD9;&#x662F;&#x4E00;&#x79CD;&#x66F4;&#x4E25;&#x8C28;&#x7684;&#x5199;&#x6CD5;&#xFF0C;<code>!!attr</code>&#x4F1A;&#x5F3A;&#x5236;&#x8F6C;&#x5316;&#x4E3A;boolean&#x7C7B;&#x578B;&#x3002;<code>typeof !!attr == true</code> &#x6BD4; <code>typeof attr == true</code> &#x66F4;&#x52A0;&#x4E25;&#x8C28;&#x3002;</li></ol><hr><h3>&#x5BF9;&#x8C61;&#x5C5E;&#x6027;</h3><pre><code>// if&#x7248;&#x672C;
if (a == 1) {
    return &apos;one&apos;;
} else if (a == 2) {
    return &apos;two&apos;;
} else if (a == 3) {
    return &apos;three&apos;;
} else {
    return &apos;&apos;;
}

// &#x5BF9;&#x8C61;&#x5C5E;&#x6027; &#x6539;&#x7248;
var ret = {
    1: &apos;one&apos;,
    2: &apos;two&apos;,
    3: &apos;three&apos;
};
return ret[a] ? ret[a] : &apos;&apos;;</code></pre><p>TIPS&#xFF1A;</p><ol><li>&#x5224;&#x65AD;&#x503C;&#x9700;&#x4E3A;&#x786E;&#x5B9A;&#x503C;&#xFF0C;&#x5982;<code>==</code> &#xFF0C;&#x5176;&#x5B83;&#x5982;<code>&gt;=/&lt;=/&gt;/&lt;</code>&#x4E0D;&#x9002;&#x7528;</li><li>&#x6761;&#x4EF6;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x8BFB;&#x53D6;&#x65B9;&#x5F0F;</li></ol><hr><h4>&#x77E5;&#x8BC6;&#x70B9;&#x63D2;&#x64AD; &#x2014;&#x2014; (2)</h4><h5>JS&#x7684;&#x547D;&#x540D;&#x89C4;&#x5219;&#xFF08;&#x53D8;&#x91CF;&#x7684;&#x547D;&#x540D;&#x89C4;&#x5219;&#xFF09;</h5><ul><li>&#x6807;&#x8BC6;&#x7B26;&#x53EA;&#x80FD;&#x7531;&#x5B57;&#x6BCD;&#x3001;&#x6570;&#x5B57;&#x3001;&#x4E0B;&#x5212;&#x7EBF;&#x548C;&#x2018;$&#x2019;&#x7EC4;&#x6210;</li><li>&#x6570;&#x5B57;&#x4E0D;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x6807;&#x8BC6;&#x7B26;&#x7684;&#x9996;&#x5B57;&#x7B26;</li></ul><h5>&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x547D;&#x540D;&#x89C4;&#x5219;</h5><ul><li>&#x901A;&#x8FC7;<code>[]</code>&#x64CD;&#x4F5C;&#x7B26;&#x4E3A;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5C5E;&#x6027;&#x540D;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x4F55;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x5305;&#x62EC;&#x53EA;&#x5305;&#x542B;&#x7A7A;&#x683C;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x548C;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#xFF09;&#xFF1B;</li><li>&#x901A;&#x8FC7;<code>.</code>&#x64CD;&#x4F5C;&#x7B26;&#x4E3A;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5C5E;&#x6027;&#x540D;&#x5FC5;&#x987B;&#x662F;&#x5408;&#x6CD5;&#x7684;&#x6807;&#x8BC6;&#x7B26;&#x540D;&#x79F0;&#xFF1B;</li><li>&#x5982;&#x679C;&#x5C5E;&#x6027;&#x540D;&#x5305;&#x542B;&#x975E;&#x6CD5;&#x7684;&#x6807;&#x8BC6;&#x7B26;&#x5B57;&#x7B26;&#xFF0C;&#x5219;&#x53EA;&#x80FD;&#x91C7;&#x7528;<code>obj[&#x201C;propertyName&#x201D;]</code>&#x7684;&#x5F62;&#x5F0F;&#xFF1B;</li><li>&#x5982;&#x679C;&#x5C5E;&#x6027;&#x540D;&#x662F;&#x5408;&#x6CD5;&#x7684;&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x8BFB;&#x53D6;&#x65F6;&#x53EF;&#x91C7;&#x7528;<code>obj.propertyName</code>&#x6216;<code>obj[&#x201C;propertyName&#x201D;]</code>&#x7684;&#x5F62;&#x5F0F;&#xFF1B;</li></ul><hr><h3>&#x7B56;&#x7565;&#x6A21;&#x5F0F;</h3><blockquote>&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#xFF1A;&#x5B9A;&#x4E49;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x7B97;&#x6CD5;&#xFF0C;&#x628A;&#x5B83;&#x4EEC;&#x4E00;&#x4E2A;&#x4E2A;&#x5C01;&#x88C5;&#x8D77;&#x6765;&#xFF0C;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x5C06;&#x7B97;&#x6CD5;&#x7684;&#x4F7F;&#x7528;&#x4E0E;&#x7B97;&#x6CD5;&#x7684;&#x5B9E;&#x73B0;&#x5206;&#x79BB;&#x5F00;&#x6765;</blockquote><p>&#x4EE5;&#x4E0B;&#x4E3A;&#x5E38;&#x89C1;&#x7684;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#xFF0C;&#x7528;&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#x6765;&#x6784;&#x5EFA;&#xFF0C;&#x66FF;&#x6362;<code>if...else</code>&#x7684;&#x65B9;&#x5F0F;</p><pre><code>// html
&lt;form id = &quot;registerForm&quot; method=&quot;post&quot; action=&quot;http://xxxx.com/api/register&quot;&gt;
    &#x7528;&#x6237;&#x540D;&#xFF1A;&lt;input type=&quot;text&quot; name=&quot;userName&quot;&gt;
    &#x5BC6;&#x7801;&#xFF1A;&lt;input type=&quot;text&quot; name=&quot;password&quot;&gt;
    &#x624B;&#x673A;&#x53F7;&#x7801;&#xFF1A;&lt;input type=&quot;text&quot; name=&quot;phoneNumber&quot;&gt;
    &lt;button type=&quot;submit&quot;&gt;&#x63D0;&#x4EA4;&lt;/button&gt;
&lt;/form&gt;

// js
// &#x7B56;&#x7565;&#x5BF9;&#x8C61;
var strategies = {
    isNoEmpty: function (value, errorMsg) {
        if (value === &apos;&apos;) {
            return errorMsg;
        }
    },
    isNoSpace: function (value, errorMsg) {
        if (value.trim() === &apos;&apos;) {
            return errorMsg;
        }
    },
    minLength: function (value, length, errorMsg) {
        if (value.trim().length &lt; length) {
            return errorMsg;
        }
    },
    maxLength: function (value, length, errorMsg) {
        if (value.length &gt; length) {
            return errorMsg;
        }
    },
    isMobile: function (value, errorMsg) {
        if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
            return errorMsg;
        }                
    }
}

// &#x9A8C;&#x8BC1;&#x7C7B;
var Validator = function() {
    this.cache = [];
}
Validator.prototype.add = function(dom, rules) {
    var self = this;
    for(var i = 0, rule; rule = rules[i++];) {
        (function(rule) {
            var strategyAry = rule.strategy.split(&apos;:&apos;);
            var errorMsg = rule.errorMsg;
            self.cache.push(function() {
            var strategy = strategyAry.shift();
            strategyAry.unshift(dom.value);
            strategyAry.push(errorMsg);
            return strategies[strategy].apply(dom, strategyAry);
            })
        })(rule)
    }
};
Validator.prototype.start = function() {
    for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var errorMsg = validatorFunc();
        if (errorMsg) {
            return errorMsg;
        }
    }
};

// &#x8C03;&#x7528;&#x4EE3;&#x7801;
var registerForm = document.getElementById(&apos;registerForm&apos;);

var validataFunc = function() {
    var validator = new Validator();
    validator.add(registerForm.userName, [{
        strategy: &apos;isNoEmpty&apos;,
        errorMsg: &apos;&#x7528;&#x6237;&#x540D;&#x4E0D;&#x53EF;&#x4E3A;&#x7A7A;&apos;
    }, {
        strategy: &apos;isNoSpace&apos;,
        errorMsg: &apos;&#x4E0D;&#x5141;&#x8BB8;&#x4EE5;&#x7A7A;&#x767D;&#x5B57;&#x7B26;&#x547D;&#x540D;&apos;
    }, {
        strategy: &apos;minLength:2&apos;,
        errorMsg: &apos;&#x7528;&#x6237;&#x540D;&#x957F;&#x5EA6;&#x4E0D;&#x80FD;&#x5C0F;&#x4E8E;2&#x4F4D;&apos;
    }]);
    validator.add(registerForm.password, [ {
        strategy: &apos;minLength:6&apos;,
        errorMsg: &apos;&#x5BC6;&#x7801;&#x957F;&#x5EA6;&#x4E0D;&#x80FD;&#x5C0F;&#x4E8E;6&#x4F4D;&apos;
    }]);
    validator.add(registerForm.phoneNumber, [{
        strategy: &apos;isMobile&apos;,
        errorMsg: &apos;&#x8BF7;&#x8F93;&#x5165;&#x6B63;&#x786E;&#x7684;&#x624B;&#x673A;&#x53F7;&#x7801;&#x683C;&#x5F0F;&apos;
    }]);
    var errorMsg = validator.start();
    return errorMsg;
}

registerForm.onsubmit = function() {
    var errorMsg = validataFunc();
    if (errorMsg) {
        alert(errorMsg);
        return false;
    }
}</code></pre><ul><li>&#x7B2C;&#x4E00;&#x4E2A;&#x90E8;&#x5206;&#x662F;&#x4E00;&#x7EC4;&#x7B56;&#x7565;&#x7C7B;&#xFF0C;&#x7B56;&#x7565;&#x7C7B;&#x5C01;&#x88C5;&#x4E86;&#x5177;&#x4F53;&#x7684;&#x7B97;&#x6CD5;&#xFF0C;&#x5E76;&#x8D1F;&#x8D23;&#x5177;&#x4F53;&#x7684;&#x8BA1;&#x7B97;&#x8FC7;&#x7A0B;;</li><li>&#x7B2C;&#x4E8C;&#x4E2A;&#x90E8;&#x5206;&#x662F;&#x73AF;&#x5883;&#x7C7B;Context&#xFF0C;&#x8BE5;Context&#x63A5;&#x6536;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x968F;&#x540E;&#x628A;&#x8BF7;&#x6C42;&#x59D4;&#x6258;&#x7ED9;&#x67D0;&#x4E00;&#x4E2A;&#x7B56;&#x7565;&#x7C7B;;</li></ul><p>&#x4F18;&#x70B9;&#xFF1A;</p><ol><li>&#x6709;&#x6548;&#x907F;&#x514D;&#x591A;&#x91CD;&#x6761;&#x4EF6;&#x9009;&#x62E9;&#x8BED;&#x53E5;</li><li>&#x63D0;&#x4F9B;&#x4E86;&#x5BF9;&#x5916;&#x5F00;&#x653E; - &#x5C01;&#x88C5;&#x539F;&#x5219;&#x7684;&#x5B8C;&#x7F8E;&#x652F;&#x6301;&#xFF0C;&#x5C06;&#x65B9;&#x6CD5;&#x5C01;&#x88C5;&#x5728;&#x72EC;&#x7ACB;&#x7684;strategy&#x4E2D;&#xFF0C;&#x4F7F;&#x5F97;&#x5B83;&#x4EEC;&#x6613;&#x4E8E;&#x5207;&#x6362;&#x3001;&#x6613;&#x4E8E;&#x7406;&#x89E3;&#x3001;&#x6613;&#x4E8E;&#x6269;&#x5C55;&#x3002;</li><li>&#x590D;&#x7528;&#x6027;</li></ol><p>&#x7F3A;&#x70B9;&#xFF1A;</p><ol><li>&#x589E;&#x52A0;&#x4E86;&#x7B56;&#x7565;&#x7C7B;/&#x5BF9;&#x8C61;&#x7684;&#x4F7F;&#x7528;</li><li>&#x4F7F;&#x7528;&#x7B56;&#x7565;&#x6A21;&#x5F0F;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x4E86;&#x89E3;&#x6240;&#x6709;&#x7684;strategy&#xFF0C;&#x8FDD;&#x53CD;&#x4E86;&#x6700;&#x5C11;&#x77E5;&#x8BC6;&#x539F;&#x5219;</li></ol><hr><p>&#x53C2;&#x8003;&#x8D44;&#x6599;</p><ol><li><a href="https://segmentfault.com/a/1190000006899198">JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E4B;&#x7B56;&#x7565;&#x6A21;&#x5F0F;</a></li><li><a href="https://segmentfault.com/q/1010000007013419">js&#x51CF;&#x5C11;if&#x8BED;&#x53E5;&#x7684;&#x6280;&#x5DE7;</a></li><li><a href="https://www.cnblogs.com/canger/p/6382944.html" rel="nofollow noreferrer">js&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x547D;&#x540D;&#x89C4;&#x5219;</a></li><li><a href="https://www.cnblogs.com/kester/p/6231328.html" rel="nofollow noreferrer">javascript&#x4E2D;||&#x548C;&amp;&amp;&#x4EE3;&#x66FF;if</a></li></ol><blockquote>&#x4F5C;&#x8005;&#xFF1A;&#x4EE5;&#x4E50;&#x4E4B;&#x540D;<br>&#x672C;&#x6587;&#x539F;&#x521B;&#xFF0C;&#x6709;&#x4E0D;&#x5F53;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#x3002;&#x8F6C;&#x8F7D;&#x8BF7;&#x6307;&#x660E;&#x51FA;&#x5904;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 中 if / if...else...替换方式

## 原文链接
[https://segmentfault.com/a/1190000015809529](https://segmentfault.com/a/1190000015809529)

