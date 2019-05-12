---
title: '重构 - 设计API的扩展机制' 
date: 2018-12-01 2:30:12
hidden: true
slug: 3ixizua869w
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>上篇文章，主要介绍了重构的一些概念和一些简单的实例。这一次，详细的说下项目中的一个重构场景--给API设计扩展机制。目的就是为了方便以后能灵活应对需求的改变。当然了，是否需要设计扩展性这个要看API的需求。如果大家有什么建议，欢迎评论留言。</p>
<h2 id="articleHeader1">2.扩展性表现形式</h2>
<h3 id="articleHeader2">2-1.prototype</h3>
<p>这个可以说是JS里面最原的一个扩展。比如原生JS没有提供打乱数组顺序的API，但是开发者又想方便使用，这样的话，就只能扩展数组的prototype。代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//扩展Array.prototype，增加打乱数组的方法。
Array.prototype.upset=function(){
    return this.sort((n1,n2)=>Math.random() - 0.5);
}

let arr=[1,2,3,4,5];
//调用
arr.upset();
//显示结果
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//扩展Array.prototype，增加打乱数组的方法。</span>
<span class="hljs-built_in">Array</span>.prototype.upset=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.sort(<span class="hljs-function">(<span class="hljs-params">n1,n2</span>)=&gt;</span><span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>);
}

<span class="hljs-keyword">let</span> arr=[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-comment">//调用</span>
arr.upset();
<span class="hljs-comment">//显示结果</span>
<span class="hljs-built_in">console</span>.log(arr);</code></pre>
<p>运行结果</p>
<p><span class="img-wrap"><img data-src="/img/bV9BMM?w=239&amp;h=63" src="https://static.alili.tech/img/bV9BMM?w=239&amp;h=63" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>功能是实现了。但是上面的代码，只想借用例子讲解扩展性，大家看下就好。不要模仿，也不要在项目这样写。现在基本都禁止这样开发了。理由也很简单，之前的文章也有提到过。这里重复一下。</p>
<p>这样就污染了原生对象Array，别人创建的Array也会被污染，造成不必要的开销。最可怕的是，万一自己命名的跟原生的方法重名了，就被覆盖原来的方法了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.push=function(){console.log('守候')}  
let arrTest=[123]
arrTest.push()
//result:守候
//push方法有什么作用，大家应该知道，不知道的可以去w3c看下" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.push=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'守候'</span>)}  
<span class="hljs-keyword">let</span> arrTest=[<span class="hljs-number">123</span>]
arrTest.push()
<span class="hljs-comment">//result:守候</span>
<span class="hljs-comment">//push方法有什么作用，大家应该知道，不知道的可以去w3c看下</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV9BMO?w=441&amp;h=73" src="https://static.alili.tech/img/bV9BMO?w=441&amp;h=73" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">2-2.jQuery</h3>
<p>关于 jQuery 的扩展性，分别提供了三个API:$.extend()、$.fn和$.fn.extend()。分别对jQuery的本身，静态方法，原型对象进行扩展，基于jQuery写插件的时候，最离不开的应该就是$.fn.extend()。</p>
<p>参考链接：</p>
<p><a href="http://caibaojian.com/jquery-extend-and-jquery-fn-extend.html" rel="nofollow noreferrer" target="_blank">理解jquery的$.extend()、$.fn和$.fn.extend()</a><br><a href="https://www.cnblogs.com/shy1766IT/p/5762707.html" rel="nofollow noreferrer" target="_blank">Jquery自定义插件之$.extend()、$.fn和$.fn.extend()</a></p>
<h3 id="articleHeader4">2-3.VUE</h3>
<p>对VUE进行扩展，引用官网（<a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">插件</a>）的说法，扩展的方式一般有以下几种：</p>
<p>1.添加全局方法或者属性，如: vue-custom-element</p>
<p>2.添加全局资源：指令/过滤器/过渡等，如 vue-touch</p>
<p>3.通过全局 mixin 方法添加一些组件选项，如: vue-router</p>
<p>4.添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。</p>
<p>5.一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router</p>
<p>基于VUE的扩展。在组件，插件的内容提供一个install方法。如下</p>
<p><span class="img-wrap"><img data-src="/img/bV9EeL?w=517&amp;h=399" src="https://static.alili.tech/img/bV9EeL?w=517&amp;h=399" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>使用组件</p>
<p><span class="img-wrap"><img data-src="/img/bV9Ee8?w=167&amp;h=35" src="https://static.alili.tech/img/bV9Ee8?w=167&amp;h=35" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>上面几个扩展性的实例分别是原生对象，库，框架的扩展，大家可能觉得有点夸夸而谈，那下面就分享一个日常开发常用的一个实例。</blockquote>
<h2 id="articleHeader5">3.实例-表单验证</h2>
<p>看了上面那些扩展性的实例，下面看下一个在日常开发使用得也很多的一个实例：表单验证。这块可以说很简单，但是做好，做通用不简单。看了《JavaScript设计模式与开发实践》，用策略模式对以前的表单验证函数进行了一个重构。下面进行一个简单的分析。</p>
<blockquote>下面的内容，代码会偏多，虽然代码不难，但还是强烈建议大家不要只看，要边看，边写，边调试，不然作为读者，很可能不知道我的代码是什么意思，很容易懵。下面的代码回涉两个知识：开放-封闭原则和策略模式，大家可以自行了解。</blockquote>
<h3 id="articleHeader6">3-1.原来方案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description 字段检验
 * @param checkArr
 * @returns {boolean}
 */
function validateForm(checkArr){
    let _reg = null, ruleMsg, nullMsg, lenMsg;
    for (let i = 0, len = checkArr.length; i < len; i++) {
        //如果没字段值是undefined，不再执行当前循环，执行下一次循环
        if (checkArr[i].el === undefined) {
            continue;
        }
        //设置规则错误提示信息
        ruleMsg = checkArr[i].msg || '字段格式错误';
        //设置值为空则错误提示信息
        nullMsg = checkArr[i].nullMsg || '字段不能为空';
        //设置长度错误提示信息
        lenMsg = checkArr[i].lenMsg || '字段长度范围' + checkArr[i].minLength + &quot;至&quot; + checkArr[i].maxLength;
        //如果该字段有空值校验
        if (checkArr[i].noNull === true) {
            //如果字段为空，返回结果又提示信息
            if (checkArr[i].el === &quot;&quot; || checkArr[i].el === null) {
                return nullMsg;
            }
        }
        //如果有该字段有规则校验
        if (checkArr[i].rule) {
            //设置规则
            switch (checkArr[i].rule) {
                case 'mobile':
                    _reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                    break;
                case 'tel':
                    _reg = /^\d{3}-\d{8}|\d{4}-\d{7}|\d{11}$/;
                    break;
            }
            //如果字段不为空，并且规则错误，返回错误信息
            if (!_reg.test(checkArr[i].el) &amp;&amp; checkArr[i].el !== &quot;&quot; &amp;&amp; checkArr[i].el !== null) {
                return ruleMsg;
            }
        }
        //如果字段不为空并且长度错误，返回错误信息
        if (checkArr[i].el !== null &amp;&amp; checkArr[i].el !== '' &amp;&amp; (checkArr[i].minLength || checkArr[i].maxLength)) {
            if (checkArr[i].el.toString().length < checkArr[i].minLength || checkArr[i].el.toString().length > checkArr[i].maxLength) {
                return lenMsg;
            }
        }
    }
    return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @description 字段检验
 * @param checkArr
 * @returns {boolean}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">validateForm</span>(<span class="hljs-params">checkArr</span>)</span>{
    <span class="hljs-keyword">let</span> _reg = <span class="hljs-literal">null</span>, ruleMsg, nullMsg, lenMsg;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = checkArr.length; i &lt; len; i++) {
        <span class="hljs-comment">//如果没字段值是undefined，不再执行当前循环，执行下一次循环</span>
        <span class="hljs-keyword">if</span> (checkArr[i].el === <span class="hljs-literal">undefined</span>) {
            <span class="hljs-keyword">continue</span>;
        }
        <span class="hljs-comment">//设置规则错误提示信息</span>
        ruleMsg = checkArr[i].msg || <span class="hljs-string">'字段格式错误'</span>;
        <span class="hljs-comment">//设置值为空则错误提示信息</span>
        nullMsg = checkArr[i].nullMsg || <span class="hljs-string">'字段不能为空'</span>;
        <span class="hljs-comment">//设置长度错误提示信息</span>
        lenMsg = checkArr[i].lenMsg || <span class="hljs-string">'字段长度范围'</span> + checkArr[i].minLength + <span class="hljs-string">"至"</span> + checkArr[i].maxLength;
        <span class="hljs-comment">//如果该字段有空值校验</span>
        <span class="hljs-keyword">if</span> (checkArr[i].noNull === <span class="hljs-literal">true</span>) {
            <span class="hljs-comment">//如果字段为空，返回结果又提示信息</span>
            <span class="hljs-keyword">if</span> (checkArr[i].el === <span class="hljs-string">""</span> || checkArr[i].el === <span class="hljs-literal">null</span>) {
                <span class="hljs-keyword">return</span> nullMsg;
            }
        }
        <span class="hljs-comment">//如果有该字段有规则校验</span>
        <span class="hljs-keyword">if</span> (checkArr[i].rule) {
            <span class="hljs-comment">//设置规则</span>
            <span class="hljs-keyword">switch</span> (checkArr[i].rule) {
                <span class="hljs-keyword">case</span> <span class="hljs-string">'mobile'</span>:
                    _reg = <span class="hljs-regexp">/^1[3|4|5|7|8][0-9]\d{8}$/</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">'tel'</span>:
                    _reg = <span class="hljs-regexp">/^\d{3}-\d{8}|\d{4}-\d{7}|\d{11}$/</span>;
                    <span class="hljs-keyword">break</span>;
            }
            <span class="hljs-comment">//如果字段不为空，并且规则错误，返回错误信息</span>
            <span class="hljs-keyword">if</span> (!_reg.test(checkArr[i].el) &amp;&amp; checkArr[i].el !== <span class="hljs-string">""</span> &amp;&amp; checkArr[i].el !== <span class="hljs-literal">null</span>) {
                <span class="hljs-keyword">return</span> ruleMsg;
            }
        }
        <span class="hljs-comment">//如果字段不为空并且长度错误，返回错误信息</span>
        <span class="hljs-keyword">if</span> (checkArr[i].el !== <span class="hljs-literal">null</span> &amp;&amp; checkArr[i].el !== <span class="hljs-string">''</span> &amp;&amp; (checkArr[i].minLength || checkArr[i].maxLength)) {
            <span class="hljs-keyword">if</span> (checkArr[i].el.toString().length &lt; checkArr[i].minLength || checkArr[i].el.toString().length &gt; checkArr[i].maxLength) {
                <span class="hljs-keyword">return</span> lenMsg;
            }
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
<p>函数调用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let testData={
        phone:'18819323632',
        pwd:'112'
    }

    let _tips = validateForm([
        {el: testData.phone, noNull: true, nullMsg: '电话号码不能为空',rule: &quot;mobile&quot;, msg: '电话号码格式错误'},
        {el: testData.pwd, noNull: true, nullMsg: '密码不能为空',lenMsg:'密码长度不正确',minLength:6,maxLength:18}
    ]);
    //字段验证如果返回错误信息
    if (_tips) {
        alert(_tips);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>    let testData={
<span class="hljs-symbol">        phone:</span><span class="hljs-string">'18819323632'</span>,
<span class="hljs-symbol">        pwd:</span><span class="hljs-string">'112'</span>
    }

    let _tips = validateForm([
        {<span class="hljs-string">el:</span> testData.phone, <span class="hljs-string">noNull:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">nullMsg:</span> <span class="hljs-string">'电话号码不能为空'</span>,<span class="hljs-string">rule:</span> <span class="hljs-string">"mobile"</span>, <span class="hljs-string">msg:</span> <span class="hljs-string">'电话号码格式错误'</span>},
        {<span class="hljs-string">el:</span> testData.pwd, <span class="hljs-string">noNull:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">nullMsg:</span> <span class="hljs-string">'密码不能为空'</span>,<span class="hljs-string">lenMsg:</span><span class="hljs-string">'密码长度不正确'</span>,<span class="hljs-string">minLength:</span><span class="hljs-number">6</span>,<span class="hljs-string">maxLength:</span><span class="hljs-number">18</span>}
    ]);
    <span class="hljs-comment">//字段验证如果返回错误信息</span>
    <span class="hljs-keyword">if</span> (_tips) {
        alert(_tips);
    }</code></pre>
<h3 id="articleHeader7">3-2.存在问题</h3>
<p>这样方法，相信大家看的也难受，因为问题确实是比较多。</p>
<p>1.一个字段进入，可能要经过三种判断（空值，规则，长度）。如果只是一个简单的电话号码规则校验，就要经过其他两种没必要的校验，造成不必要的开销。运行的流程就如同下面。</p>
<p><span class="img-wrap"><img data-src="/img/bV93ux?w=508&amp;h=1023" src="https://static.alili.tech/img/bV93ux?w=508&amp;h=1023" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>2.规则校验里面，只有这几种校验，如果要增加其他校验，比如增加一个日期的规则，无法完成。如果一直修改源码，可能会导致函数巨大。</p>
<p>3.写法不优雅，调用也不方便。</p>
<h3 id="articleHeader8">3-3.代替方案</h3>
<p>针对上面2-2的三个问题，逐个进行改善。</p>
<blockquote>因为调用方式就不方便，很难在不改变validateForm调用方式的同时，优化重构内部的代码，又增加扩展性。重写这个方法又不可能，因为有个别的地方已经使用了这个API，自己一个一个的改不现实，所以就不修改这个validateForm，新建一个新的API:validate。在以后的项目上，也尽量引导同事放弃validateForm，使用新的API。</blockquote>
<p>上面第一个，优化校验规则，每次校验（比如空值，长度，规则），都是一个简单的校验，不再执行其他没必要的校验。运行流程如同下面。</p>
<p><span class="img-wrap"><img data-src="/img/bV93uz?w=414&amp;h=486" src="https://static.alili.tech/img/bV93uz?w=414&amp;h=486" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let validate = function (arr) {
    let ruleData = {
        /**
         * @description 不能为空
         * @param val
         * @param msg
         * @return {*}
         */
        isNoNull(val, msg){
            if (!val) {
                return msg
            }
        },
        /**
         * @description 最小长度
         * @param val
         * @param length
         * @param msg
         * @return {*}
         */
        minLength(val, length, msg){
            if (val.toString().length < length) {
                return msg
            }
        },
        /**
         * @description 最大长度
         * @param val
         * @param length
         * @param msg
         * @return {*}
         */
        maxLength(val, length, msg){
            if (val.toString().length > length) {
                return msg
            }
        },
        /**
         * @description 是否是手机号码格式
         * @param val
         * @param msg
         * @return {*}
         */
        isMobile(val, msg){
            if (!/^1[3-9]\d{9}$/.test(val)) {
                return msg
            }
        }
    }
    let ruleMsg, checkRule, _rule;
    for (let i = 0, len = arr.length; i < len; i++) {
        //如果字段找不到
        if (arr[i].el === undefined) {
            return '字段找不到！'
        }
        //遍历规则
        for (let j = 0; j < arr[i].rules.length; j++) {
            //提取规则
            checkRule = arr[i].rules[j].rule.split(&quot;:&quot;);
            _rule = checkRule.shift();
            checkRule.unshift(arr[i].el);
            checkRule.push(arr[i].rules[j].msg);
            //如果规则错误
            ruleMsg = ruleData[_rule].apply(null, checkRule);
            if (ruleMsg) {
                //返回错误信息
                return ruleMsg;
            }
        }
    }
};
let testData = {
    name: '',
    phone: '18819522663',
    pw: 'asda'
}
//校验函数调用
console.log(validate([
    {
        //校验的数据
        el: testData.phone,
        //校验的规则
        rules: [
            {rule: 'isNoNull', msg: '电话不能为空'}, {rule: 'isMobile', msg: '手机号码格式不正确'}
        ]
    },
    {
        el: testData.pw,
        rules: [
            {rule: 'isNoNull', msg: '电话不能为空'},
            {rule:'minLength:6',msg:'密码长度不能小于6'}
        ]
    }
]));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>let validate = function (arr) {
    let ruleData = {
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 不能为空
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        isNoNull(<span class="hljs-keyword">val</span>, msg){
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">val</span>) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 最小长度
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> length
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        minLength(<span class="hljs-keyword">val</span>, length, msg){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">val</span>.toString().length &lt; length) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 最大长度
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> length
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        maxLength(<span class="hljs-keyword">val</span>, length, msg){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">val</span>.toString().length &gt; length) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 是否是手机号码格式
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        isMobile(<span class="hljs-keyword">val</span>, msg){
            <span class="hljs-keyword">if</span> (!/^<span class="hljs-number">1</span>[<span class="hljs-number">3</span><span class="hljs-number">-9</span>]\d{<span class="hljs-number">9</span>}$/.test(<span class="hljs-keyword">val</span>)) {
                <span class="hljs-keyword">return</span> msg
            }
        }
    }
    let ruleMsg, checkRule, _rule;
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
        <span class="hljs-comment">//如果字段找不到</span>
        <span class="hljs-keyword">if</span> (arr[i].el === undefined) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">'字段找不到！'</span>
        }
        <span class="hljs-comment">//遍历规则</span>
        <span class="hljs-keyword">for</span> (let j = <span class="hljs-number">0</span>; j &lt; arr[i].rules.length; j++) {
            <span class="hljs-comment">//提取规则</span>
            checkRule = arr[i].rules[j].rule.split(<span class="hljs-string">":"</span>);
            _rule = checkRule.shift();
            checkRule.unshift(arr[i].el);
            checkRule.push(arr[i].rules[j].msg);
            <span class="hljs-comment">//如果规则错误</span>
            ruleMsg = ruleData[_rule].apply(<span class="hljs-literal">null</span>, checkRule);
            <span class="hljs-keyword">if</span> (ruleMsg) {
                <span class="hljs-comment">//返回错误信息</span>
                <span class="hljs-keyword">return</span> ruleMsg;
            }
        }
    }
};
let testData = {
    name: <span class="hljs-string">''</span>,
    phone: <span class="hljs-string">'18819522663'</span>,
    pw: <span class="hljs-string">'asda'</span>
}
<span class="hljs-comment">//校验函数调用</span>
console.log(validate([
    {
        <span class="hljs-comment">//校验的数据</span>
        el: testData.phone,
        <span class="hljs-comment">//校验的规则</span>
        rules: [
            {rule: <span class="hljs-string">'isNoNull'</span>, msg: <span class="hljs-string">'电话不能为空'</span>}, {rule: <span class="hljs-string">'isMobile'</span>, msg: <span class="hljs-string">'手机号码格式不正确'</span>}
        ]
    },
    {
        el: testData.pw,
        rules: [
            {rule: <span class="hljs-string">'isNoNull'</span>, msg: <span class="hljs-string">'电话不能为空'</span>},
            {rule:<span class="hljs-string">'minLength:6'</span>,msg:<span class="hljs-string">'密码长度不能小于6'</span>}
        ]
    }
]));</code></pre>
<p>如果又有其它的规则，又得改这个，这样就违反了开放-封闭原则。如果多人共用这个函数，规则可能会很多，ruleData会变的巨大，造成不必要的开销。比如A页面有金额的校验，但是只有A页面有。如果按照上面的方式改，在B页面也会加载金额的校验规则，但是根本不会用上，造成资源浪费。</p>
<p>所以下面应用开放-封闭原则。给函数的校验规则增加扩展性。在实操之前，大家应该会懵，因为一个函数，可以进行校验的操作，又有增加校验规则的操作。一个函数做两件事，就违反了单一原则。到时候也难维护，所以推荐的做法就是分接口做。如下写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let validate = (function () {
    let ruleData = {
        /**
         * @description 不能为空
         * @param val
         * @param msg
         * @return {*}
         */
        isNoNull(val, msg){
            if (!val) {
                return msg
            }
        },
        /**
         * @description 最小长度
         * @param val
         * @param length
         * @param msg
         * @return {*}
         */
        minLength(val, length, msg){
            if (val.toString().length < length) {
                return msg
            }
        },
        /**
         * @description 最大长度
         * @param val
         * @param length
         * @param msg
         * @return {*}
         */
        maxLength(val, length, msg){
            if (val.toString().length > length) {
                return msg
            }
        },
        /**
         * @description 是否是手机号码格式
         * @param val
         * @param msg
         * @return {*}
         */
        isMobile(val, msg){
            if (!/^1[3-9]\d{9}$/.test(val)) {
                return msg
            }
        }
    }
    return {
        /**
         * @description 查询接口
         * @param arr
         * @return {*}
         */
        check: function (arr) {
            let ruleMsg, checkRule, _rule;
            for (let i = 0, len = arr.length; i < len; i++) {
                //如果字段找不到
                if (arr[i].el === undefined) {
                    return '字段找不到！'
                }
                //遍历规则
                for (let j = 0; j < arr[i].rules.length; j++) {
                    //提取规则
                    checkRule = arr[i].rules[j].rule.split(&quot;:&quot;);
                    _rule = checkRule.shift();
                    checkRule.unshift(arr[i].el);
                    checkRule.push(arr[i].rules[j].msg);
                    //如果规则错误
                    ruleMsg = ruleData[_rule].apply(null, checkRule);
                    if (ruleMsg) {
                        //返回错误信息
                        return ruleMsg;
                    }
                }
            }
        },
        /**
         * @description 添加规则接口
         * @param type
         * @param fn
         */
        addRule:function (type,fn) {
            ruleData[type]=fn;
        }
    }
})();
//校验函数调用-测试用例
console.log(validate.check([
    {
        //校验的数据
        el: testData.mobile,
        //校验的规则
        rules: [
            {rule: 'isNoNull', msg: '电话不能为空'}, {rule: 'isMobile', msg: '手机号码格式不正确'}
        ]
    },
    {
        el: testData.password,
        rules: [
            {rule: 'isNoNull', msg: '电话不能为空'},
            {rule:'minLength:6',msg:'密码长度不能小于6'}
        ]
    }
]));
//扩展-添加日期范围校验
validate.addRule('isDateRank',function (val,msg) {
    if(new Date(val[0]).getTime()>=new Date(val[1]).getTime()){
        return msg;
    }
});
//测试新添加的规则-日期范围校验
console.log(validate.check([
    {
        el:['2017-8-9 22:00:00','2017-8-8 24:00:00'],
        rules:[{
            rule:'isDateRank',msg:'日期范围不正确'
        }]
    }
    
]));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-keyword">let</span> validate = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">let</span> ruleData = {
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 不能为空
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        isNoNull(val, msg){
            <span class="hljs-keyword">if</span> (!val) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 最小长度
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> length
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        minLength(val, length, msg){
            <span class="hljs-keyword">if</span> (val.toString().length &lt; length) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 最大长度
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> length
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        maxLength(val, length, msg){
            <span class="hljs-keyword">if</span> (val.toString().length &gt; length) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 是否是手机号码格式
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        isMobile(val, msg){
            <span class="hljs-keyword">if</span> (!/^<span class="hljs-number">1</span>[<span class="hljs-number">3</span><span class="hljs-number">-9</span>]\d{<span class="hljs-number">9</span>}$/.test(val)) {
                <span class="hljs-keyword">return</span> msg
            }
        }
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 查询接口
         * <span class="hljs-doctag">@param</span> arr
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        check: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(arr)</span> </span>{
            <span class="hljs-keyword">let</span> ruleMsg, checkRule, _rule;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
                <span class="hljs-comment">//如果字段找不到</span>
                <span class="hljs-keyword">if</span> (arr[i].el === undefined) {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">'字段找不到！'</span>
                }
                <span class="hljs-comment">//遍历规则</span>
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; arr[i].rules.length; j++) {
                    <span class="hljs-comment">//提取规则</span>
                    checkRule = arr[i].rules[j].rule.split(<span class="hljs-string">":"</span>);
                    _rule = checkRule.shift();
                    checkRule.unshift(arr[i].el);
                    checkRule.push(arr[i].rules[j].msg);
                    <span class="hljs-comment">//如果规则错误</span>
                    ruleMsg = ruleData[_rule].apply(<span class="hljs-keyword">null</span>, checkRule);
                    <span class="hljs-keyword">if</span> (ruleMsg) {
                        <span class="hljs-comment">//返回错误信息</span>
                        <span class="hljs-keyword">return</span> ruleMsg;
                    }
                }
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 添加规则接口
         * <span class="hljs-doctag">@param</span> type
         * <span class="hljs-doctag">@param</span> fn
         */</span>
        addRule:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(type,fn)</span> </span>{
            ruleData[type]=fn;
        }
    }
})();
<span class="hljs-comment">//校验函数调用-测试用例</span>
console.log(validate.check([
    {
        <span class="hljs-comment">//校验的数据</span>
        el: testData.mobile,
        <span class="hljs-comment">//校验的规则</span>
        rules: [
            {rule: <span class="hljs-string">'isNoNull'</span>, msg: <span class="hljs-string">'电话不能为空'</span>}, {rule: <span class="hljs-string">'isMobile'</span>, msg: <span class="hljs-string">'手机号码格式不正确'</span>}
        ]
    },
    {
        el: testData.password,
        rules: [
            {rule: <span class="hljs-string">'isNoNull'</span>, msg: <span class="hljs-string">'电话不能为空'</span>},
            {rule:<span class="hljs-string">'minLength:6'</span>,msg:<span class="hljs-string">'密码长度不能小于6'</span>}
        ]
    }
]));
<span class="hljs-comment">//扩展-添加日期范围校验</span>
validate.addRule(<span class="hljs-string">'isDateRank'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(val,msg)</span> </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span> Date(val[<span class="hljs-number">0</span>]).getTime()&gt;=<span class="hljs-keyword">new</span> Date(val[<span class="hljs-number">1</span>]).getTime()){
        <span class="hljs-keyword">return</span> msg;
    }
});
<span class="hljs-comment">//测试新添加的规则-日期范围校验</span>
console.log(validate.check([
    {
        el:[<span class="hljs-string">'2017-8-9 22:00:00'</span>,<span class="hljs-string">'2017-8-8 24:00:00'</span>],
        rules:[{
            rule:<span class="hljs-string">'isDateRank'</span>,msg:<span class="hljs-string">'日期范围不正确'</span>
        }]
    }
    
]));</code></pre>
<p>如上代码所示，这里需要往ruleData添加日期范围的校验，这里可以添加。但是不能访问和修改ruleData的东西，有一个保护的作用。还有一个就是，比如在A页面添加日期的校验，只在A页面存在，不会影响其它页面。如果日期的校验在其它地方都可能用上，就可以考虑，在全局里面为ruleData添加日期的校验的规则。</p>
<p>至于第三个问题，这样的想法，可能不算太优雅，调用也不是太方便，但是就我现在能想到的，这个就是最好方案啊了。</p>
<p>这个看似是已经做完了，但是大家可能觉得有一种情况没能应对，比如下面这种，做不到。</p>
<p><span class="img-wrap"><img data-src="/img/bV9ur6?w=471&amp;h=228" src="https://static.alili.tech/img/bV9ur6?w=471&amp;h=228" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>因为上面的check接口，只要有一个错误了，就立马跳出了，不会校验下一个。如果要实现下面的功能，就得实现，如果有一个值校验错误，就记录错误信息，继续校验下一个，等到所有的校验都执行完了之后，如下面的流程图。</p>
<p><span class="img-wrap"><img data-src="/img/bV93uI?w=497&amp;h=768" src="https://static.alili.tech/img/bV93uI?w=497&amp;h=768" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>代码上面（大家先忽略alias这个属性）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let validate= (function () {
    let ruleData = {
        /**
         * @description 不能为空
         * @param val
         * @param msg
         * @return {*}
         */
        isNoNull(val, msg){
            if (!val) {
                return msg
            }
        },
        /**
         * @description 最小长度
         * @param val
         * @param length
         * @param msg
         * @return {*}
         */
        minLength(val, length, msg){
            if (val.toString().length < length) {
                return msg
            }
        },
        /**
         * @description 最大长度
         * @param val
         * @param length
         * @param msg
         * @return {*}
         */
        maxLength(val, length, msg){
            if (val.toString().length > length) {
                return msg
            }
        },
        /**
         * @description 是否是手机号码格式
         * @param val
         * @param msg
         * @return {*}
         */
        isMobile(val, msg){
            if (!/^1[3-9]\d{9}$/.test(val)) {
                return msg
            }
        }
    }
    return {
        check: function (arr) {
            //代码不重复展示，上面一部分
        },
        addRule:function (type,fn) {
            //代码不重复展示，上面一部分
        },
        /**
         * @description 校验所有接口
         * @param arr
         * @return {*}
         */
        checkAll: function (arr) {
            let ruleMsg, checkRule, _rule,msgArr=[];
            for (let i = 0, len = arr.length; i < len; i++) {
                //如果字段找不到
                if (arr[i].el === undefined) {
                    return '字段找不到！'
                }
                //如果字段为空以及规则不是校验空的规则

                //遍历规则
                for (let j = 0; j < arr[i].rules.length; j++) {
                    //提取规则
                    checkRule = arr[i].rules[j].rule.split(&quot;:&quot;);
                    _rule = checkRule.shift();
                    checkRule.unshift(arr[i].el);
                    checkRule.push(arr[i].rules[j].msg);
                    //如果规则错误
                    ruleMsg = ruleData[_rule].apply(null, checkRule);
                    if (ruleMsg) {
                        //记录错误信息
                        msgArr.push({
                            el:arr[i].el,
                            alias:arr[i].alias,
                            rules:_rule,
                            msg:ruleMsg
                        });
                    }
                }
            }
            //返回错误信息
            return msgArr.length>0?msgArr:false;
        }
    }
})();
let testData = {
    name: '',
    phone: '188',
    pw: 'asda'
}
//扩展-添加日期范围校验
validate.addRule('isDateRank',function (val,msg) {
    if(new Date(val[0]).getTime()>=new Date(val[1]).getTime()){
        return msg;
    }
});
//校验函数调用
console.log(validate.checkAll([
    {
        //校验的数据
        el: testData.phone,
        alias:'mobile',
        //校验的规则
        rules: [
            {rule: 'isNoNull', msg: '电话不能为空'}, {rule: 'isMobile', msg: '手机号码格式不正确'},{rule:'minLength:6',msg: '手机号码不能少于6'}
        ]
    },
    {
        el: testData.pw,
        alias:'pwd',
        rules: [
            {rule: 'isNoNull', msg: '电话不能为空'},
            {rule:'minLength:6',msg:'密码长度不能小于6'}
        ]
    },
    {
        el:['2017-8-9 22:00:00','2017-8-8 24:00:00'],
        rules:[{
            rule:'isDateRank',msg:'日期范围不正确'
        }]
    }
]));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-keyword">let</span> validate= (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">let</span> ruleData = {
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 不能为空
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        isNoNull(val, msg){
            <span class="hljs-keyword">if</span> (!val) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 最小长度
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> length
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        minLength(val, length, msg){
            <span class="hljs-keyword">if</span> (val.toString().length &lt; length) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 最大长度
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> length
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        maxLength(val, length, msg){
            <span class="hljs-keyword">if</span> (val.toString().length &gt; length) {
                <span class="hljs-keyword">return</span> msg
            }
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 是否是手机号码格式
         * <span class="hljs-doctag">@param</span> val
         * <span class="hljs-doctag">@param</span> msg
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        isMobile(val, msg){
            <span class="hljs-keyword">if</span> (!/^<span class="hljs-number">1</span>[<span class="hljs-number">3</span><span class="hljs-number">-9</span>]\d{<span class="hljs-number">9</span>}$/.test(val)) {
                <span class="hljs-keyword">return</span> msg
            }
        }
    }
    <span class="hljs-keyword">return</span> {
        check: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(arr)</span> </span>{
            <span class="hljs-comment">//代码不重复展示，上面一部分</span>
        },
        addRule:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(type,fn)</span> </span>{
            <span class="hljs-comment">//代码不重复展示，上面一部分</span>
        },
        <span class="hljs-comment">/**
         * <span class="hljs-doctag">@description</span> 校验所有接口
         * <span class="hljs-doctag">@param</span> arr
         * <span class="hljs-doctag">@return</span> {*}
         */</span>
        checkAll: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(arr)</span> </span>{
            <span class="hljs-keyword">let</span> ruleMsg, checkRule, _rule,msgArr=[];
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
                <span class="hljs-comment">//如果字段找不到</span>
                <span class="hljs-keyword">if</span> (arr[i].el === undefined) {
                    <span class="hljs-keyword">return</span> <span class="hljs-string">'字段找不到！'</span>
                }
                <span class="hljs-comment">//如果字段为空以及规则不是校验空的规则</span>

                <span class="hljs-comment">//遍历规则</span>
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; arr[i].rules.length; j++) {
                    <span class="hljs-comment">//提取规则</span>
                    checkRule = arr[i].rules[j].rule.split(<span class="hljs-string">":"</span>);
                    _rule = checkRule.shift();
                    checkRule.unshift(arr[i].el);
                    checkRule.push(arr[i].rules[j].msg);
                    <span class="hljs-comment">//如果规则错误</span>
                    ruleMsg = ruleData[_rule].apply(<span class="hljs-keyword">null</span>, checkRule);
                    <span class="hljs-keyword">if</span> (ruleMsg) {
                        <span class="hljs-comment">//记录错误信息</span>
                        msgArr.push({
                            el:arr[i].el,
                            alias:arr[i].alias,
                            rules:_rule,
                            msg:ruleMsg
                        });
                    }
                }
            }
            <span class="hljs-comment">//返回错误信息</span>
            <span class="hljs-keyword">return</span> msgArr.length&gt;<span class="hljs-number">0</span>?msgArr:<span class="hljs-keyword">false</span>;
        }
    }
})();
<span class="hljs-keyword">let</span> testData = {
    name: <span class="hljs-string">''</span>,
    phone: <span class="hljs-string">'188'</span>,
    pw: <span class="hljs-string">'asda'</span>
}
<span class="hljs-comment">//扩展-添加日期范围校验</span>
validate.addRule(<span class="hljs-string">'isDateRank'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(val,msg)</span> </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span> Date(val[<span class="hljs-number">0</span>]).getTime()&gt;=<span class="hljs-keyword">new</span> Date(val[<span class="hljs-number">1</span>]).getTime()){
        <span class="hljs-keyword">return</span> msg;
    }
});
<span class="hljs-comment">//校验函数调用</span>
console.log(validate.checkAll([
    {
        <span class="hljs-comment">//校验的数据</span>
        el: testData.phone,
        alias:<span class="hljs-string">'mobile'</span>,
        <span class="hljs-comment">//校验的规则</span>
        rules: [
            {rule: <span class="hljs-string">'isNoNull'</span>, msg: <span class="hljs-string">'电话不能为空'</span>}, {rule: <span class="hljs-string">'isMobile'</span>, msg: <span class="hljs-string">'手机号码格式不正确'</span>},{rule:<span class="hljs-string">'minLength:6'</span>,msg: <span class="hljs-string">'手机号码不能少于6'</span>}
        ]
    },
    {
        el: testData.pw,
        alias:<span class="hljs-string">'pwd'</span>,
        rules: [
            {rule: <span class="hljs-string">'isNoNull'</span>, msg: <span class="hljs-string">'电话不能为空'</span>},
            {rule:<span class="hljs-string">'minLength:6'</span>,msg:<span class="hljs-string">'密码长度不能小于6'</span>}
        ]
    },
    {
        el:[<span class="hljs-string">'2017-8-9 22:00:00'</span>,<span class="hljs-string">'2017-8-8 24:00:00'</span>],
        rules:[{
            rule:<span class="hljs-string">'isDateRank'</span>,msg:<span class="hljs-string">'日期范围不正确'</span>
        }]
    }
]));</code></pre>
<p>看到结果，现在所有的不合法的数据的记录都返回回来了。至于当时alias现在揭晓用处。<br>比如页面是vue渲染的，根据alias可以这样处理。</p>
<p><span class="img-wrap"><img data-src="/img/bV9uDk?w=695&amp;h=487" src="https://static.alili.tech/img/bV9uDk?w=695&amp;h=487" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Nij?w=1336&amp;h=1039" src="https://static.alili.tech/img/bV9Nij?w=1336&amp;h=1039" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>如果是jQuery渲染的，根据alias可以这样处理。</p>
<p><span class="img-wrap"><img data-src="/img/bV9Nh1?w=503&amp;h=462" src="https://static.alili.tech/img/bV9Nh1?w=503&amp;h=462" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Nh2?w=1291&amp;h=874" src="https://static.alili.tech/img/bV9Nh2?w=1291&amp;h=874" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">3-4.向下兼容方案</h3>
<p>因为项目之前有使用了以前的校验API，不能一道切，在以前的API没废弃之前，不能影响之前的使用。所以要重写以前的validateForm，使之兼容现在的新API:validate。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let validateForm=function (arr) {
        let _param=[],_single={};
        for(let i=0;i<arr.length;i++){
            _single={};
            _single.el=arr[i].el;
            _single.rules=[];
            //如有有非空检验
            if(arr[i].noNull){
                _single.rules.push({
                    rule: 'isNoNull',
                    msg: arr[i].nullMsg||'字段不能为空'
                })
            }
            //如果有最小长度校验
            if(arr[i].minLength){
                _single.rules.push({
                    rule: 'minLength:'+arr[i].minLength,
                    msg: arr[i].lenMsg ||'字段长度范围错误'
                })
            }
            //如果有最大长度校验
            if(arr[i].maxLength){
                _single.rules.push({
                    rule: 'maxLength:'+arr[i].maxLength,
                    msg: arr[i].lenMsg ||'字段长度范围错误'
                })
            }
            //如果有规则校验
            //校验转换规则
            let _ruleData={
                mobile:'isMobile'
            }
            if(arr[i].rule){
                _single.rules.push({
                    rule: _ruleData[arr[i].rule],
                    msg: arr[i].msg ||'字段格式错误'
                })
            }
            _param.push(_single);
        }
        let _result=validate.check(_param);
        return _result?_result:false;
    }
    let testData={
        phone:'18819323632',
        pwd:'112'
    }
    let _tips = validateForm([
        {el: testData.phone, noNull: true, nullMsg: '电话号码不能为空',rule: &quot;mobile&quot;, msg: '电话号码格式错误'},
        {el: testData.pwd, noNull: true, nullMsg: '密码不能为空',lenMsg:'密码长度不正确',minLength:6,maxLength:18}
    ]);
    console.log(_tips)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>    let validateForm=function (arr) {
        let <span class="hljs-variable">_param</span>=[],<span class="hljs-variable">_single</span>={};
        <span class="hljs-keyword">for</span>(let i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){
            <span class="hljs-variable">_single</span>={};
            <span class="hljs-variable">_single</span>.el=arr[i].el;
            <span class="hljs-variable">_single</span>.rules=[];
            <span class="hljs-comment">//如有有非空检验</span>
            <span class="hljs-keyword">if</span>(arr[i].noNull){
                <span class="hljs-variable">_single</span>.rules.push({
                    rule: <span class="hljs-string">'isNoNull'</span>,
                    msg: arr[i].nullMsg||<span class="hljs-string">'字段不能为空'</span>
                })
            }
            <span class="hljs-comment">//如果有最小长度校验</span>
            <span class="hljs-keyword">if</span>(arr[i].minLength){
                <span class="hljs-variable">_single</span>.rules.push({
                    rule: <span class="hljs-string">'minLength:'</span>+arr[i].minLength,
                    msg: arr[i].lenMsg ||<span class="hljs-string">'字段长度范围错误'</span>
                })
            }
            <span class="hljs-comment">//如果有最大长度校验</span>
            <span class="hljs-keyword">if</span>(arr[i].maxLength){
                <span class="hljs-variable">_single</span>.rules.push({
                    rule: <span class="hljs-string">'maxLength:'</span>+arr[i].maxLength,
                    msg: arr[i].lenMsg ||<span class="hljs-string">'字段长度范围错误'</span>
                })
            }
            <span class="hljs-comment">//如果有规则校验</span>
            <span class="hljs-comment">//校验转换规则</span>
            let <span class="hljs-variable">_ruleData</span>={
                mobile:<span class="hljs-string">'isMobile'</span>
            }
            <span class="hljs-keyword">if</span>(arr[i].rule){
                <span class="hljs-variable">_single</span>.rules.push({
                    rule: <span class="hljs-variable">_ruleData</span>[arr[i].rule],
                    msg: arr[i].msg ||<span class="hljs-string">'字段格式错误'</span>
                })
            }
            <span class="hljs-variable">_param</span>.push(<span class="hljs-variable">_single</span>);
        }
        let <span class="hljs-variable">_result</span>=validate.check(<span class="hljs-variable">_param</span>);
        return <span class="hljs-variable">_result</span>?<span class="hljs-variable">_result</span>:<span class="hljs-literal">false</span>;
    }
    let testData={
        phone:<span class="hljs-string">'18819323632'</span>,
        pwd:<span class="hljs-string">'112'</span>
    }
    let <span class="hljs-variable">_tips</span> = validateForm([
        {el: testData.phone, noNull: <span class="hljs-literal">true</span>, nullMsg: <span class="hljs-string">'电话号码不能为空'</span>,rule: <span class="hljs-string">"mobile"</span>, msg: <span class="hljs-string">'电话号码格式错误'</span>},
        {el: testData.pwd, noNull: <span class="hljs-literal">true</span>, nullMsg: <span class="hljs-string">'密码不能为空'</span>,lenMsg:<span class="hljs-string">'密码长度不正确'</span>,minLength:<span class="hljs-number">6</span>,maxLength:<span class="hljs-number">18</span>}
    ]);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-variable">_tips</span>)</code></pre>
<h2 id="articleHeader10">4.小结</h2>
<p>今天的例子就到这里了，这个例子，无非就是给API增加扩展性。这个例子比较简单，不算难。大家用这个代码在浏览器上运行，就很好理解。如果大家对这个例子有什么更好的建议，或者代码上有什么问题，欢迎在评论区留言，大家多交流，相互学习。</p>
<p>-------------------------华丽的分割线--------------------</p>
<p>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
重构 - 设计API的扩展机制

## 原文链接
[https://segmentfault.com/a/1190000014751582](https://segmentfault.com/a/1190000014751582)

