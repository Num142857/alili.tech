---
title: '前端Tank技能---模块化加载器的简单实现' 
date: 2019-02-09 2:30:58
hidden: true
slug: u9w1id40na
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是模块化，为什么要模块化</h2>
<p>装个b，贴一段English</p>
<p>A beginning programmer writes her programs like an ant builds her hill, one piece at a time, without thought for the bigger structure. Her programs will be like loose sand. They may stand for a while, but growing too big they fall apart.</p>
<p>Realizing this problem, the programmer will start to spend a lot of time thinking about structure. Her programs will be rigidly structured, like rock sculptures. They are solid, but when they must change, violence must be done to them.</p>
<p>The master programmer knows when to apply structure and when to leave things in their simple form. Her programs are like clay, solid yet malleable.</p>
<p>Master Yuan-Ma, The Book of Programming</p>
<p>以上基本上是为什么要模块化的，至于什么是模块化有好多好多种。</p>
<p>比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dujia1(){
    //..
}

function dujia2(){
    //...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dujia1</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//..</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dujia2</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//...</span>
}
</code></pre>
<p>这样简单的放在一起也是模块化，只不过太挫，有些人不承认而已。</p>
<p>再比如这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var page = {
    init: function(){
        //..
    },
    getData:function(){
        //..    
    },
    bindEvent:function(){
        //...
    },
    __secret:”我不想让让人知道&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> page = {
    init: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//..</span>
    },
    getData:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//..    </span>
    },
    bindEvent:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//...</span>
    },
    __secret:”我不想让让人知道<span class="hljs-string">"
}
</span></code></pre>
<p>这个就是我们比价常用的了。所有page相关的功能都作为属性包在page这个模块里面，基本上对全局没有污染。但是也没有保留，也就是对外部来说，所有的东西都是可以看到的。<br>比如访问   page.__secret  你能获取这个秘密，这样的包装方式是包不住的。</p>
<p>再比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var page = (function(){
    
    var  __secret = ”我不想让让人知道”;

    var init = function(){
        //..
    };
    var getData = function(){
        //..    
    };
    var bindEvent = function(){
        //...
    };

    return {
        init : init
    }    
})();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> page = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    
    <span class="hljs-keyword">var</span>  __secret = ”我不想让让人知道”;

    <span class="hljs-keyword">var</span> init = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//..</span>
    };
    <span class="hljs-keyword">var</span> getData = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//..    </span>
    };
    <span class="hljs-keyword">var</span> bindEvent = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//...</span>
    };

    <span class="hljs-keyword">return</span> {
        init : init
    }    
})();
</code></pre>
<p>这样呢外吐的只有init了。是吧，其他都包住了。</p>
<p>再比如一下这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var page = (function(mod){
    mod.xxx=yyy;
    return mod
})(module);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>var page = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(mod)</span></span>{
    <span class="hljs-built_in">mod</span>.xxx=yyy;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">mod</span>
})(<span class="hljs-keyword">module</span>);
</code></pre>
<p>好，这样就可以扩展module了。</p>
<p>其实以上都不是本篇的重点，本篇的重点是模块加载工具的简单实现。</p>
<h2 id="articleHeader1">模块加载器</h2>
<p>以上大家都看到了，要实现模块化，我们要设计，要知道怎么搞好，然后呢用这个方法去实现，啪啪啪写好多代码去实现。</p>
<p>那么换个思路想想，我们为什么不在打包过程中编译过程中或者加载过程中由程序去做这个事情呢。对，fekit是这样实现，好多好多都是这样实现的，实现这样功能的东西就是模块加载器。</p>
<p>先说说，我们已经写的次数和名字差不多的 require是怎么实现的。</p>
<p>抛开一直写的那个require不讲，我们说的是一个简单的模块加载器的简单实现。</p>
<p>定义一下：这个加载器，可以通过require一个文件的方式，把里面的内容添加到require的文件中，并能够执行他。也就是通过传入模块名来取得该模块的调用。</p>
<ol>
<li><p>实现一个readFile方法，返回对应文件的内容；</p></li>
<li><p>将返回的字符串作为代码进行执行。</p></li>
</ol>
<p>readFile非常好实现，忽略不提。</p>
<p>然后就是把字符串转成可以执行的程序代码。eval是第一个冒出来的，但是，一般提到他都会是弃用的，会有安全的漏洞</p>
<p>更好的方案是Function构造器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var plus = new Function(&quot;name&quot;, &quot;return name + ‘ bigger'&quot;);
console.log(plus(&quot;Iphone6&quot;)); //Iphone6 bigger
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> plus = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">Function</span><span class="hljs-params">(<span class="hljs-string">"name"</span>, <span class="hljs-string">"return name + ‘ bigger'"</span>)</span></span>;
console.log(plus(<span class="hljs-string">"Iphone6"</span>)); <span class="hljs-comment">//Iphone6 bigger</span>
</code></pre>
<p>两个参数，第一个是用逗号分隔的参数列表字符串，第二个是函数体字符串</p>
<p>有了这个我们就可以来实现require方法了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//module.js

function require(name){

    //调用一个模块，首先检查这个模块是否已经调用
    if(name in require.cache){
        return require.cache[name];
    }

        //此处生成一个code的函数，参数为  exports 和 module， 函数体为readFile返回的js文件中的代码字符串
    var code = new Function(&quot;exports, module&quot;, readFile(name));
        
        //定义外吐内容
    var exports = {},
        module = {exports: exports};
        
        //执行函数体，如果有定义外吐，既module.exports 或者  exports.***之类的，会改写上面的外吐内容
    code(exports, module);

    require.cache[name] = module.exports;

        //返回exports
    return module.exports;
}

//缓存对象，为了应对重复调用
require.cache = Object.create(null);

//读文件，返回结果
function readFile(fileName){ ... }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//module.js</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">require</span>(<span class="hljs-params">name</span>)</span>{

    <span class="hljs-comment">//调用一个模块，首先检查这个模块是否已经调用</span>
    <span class="hljs-keyword">if</span>(name <span class="hljs-keyword">in</span> <span class="hljs-built_in">require</span>.cache){
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>.cache[name];
    }

        <span class="hljs-comment">//此处生成一个code的函数，参数为  exports 和 module， 函数体为readFile返回的js文件中的代码字符串</span>
    <span class="hljs-keyword">var</span> code = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">"exports, module"</span>, readFile(name));
        
        <span class="hljs-comment">//定义外吐内容</span>
    <span class="hljs-keyword">var</span> exports = {},
        <span class="hljs-built_in">module</span> = {<span class="hljs-attr">exports</span>: exports};
        
        <span class="hljs-comment">//执行函数体，如果有定义外吐，既module.exports 或者  exports.***之类的，会改写上面的外吐内容</span>
    code(exports, <span class="hljs-built_in">module</span>);

    <span class="hljs-built_in">require</span>.cache[name] = <span class="hljs-built_in">module</span>.exports;

        <span class="hljs-comment">//返回exports</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
}

<span class="hljs-comment">//缓存对象，为了应对重复调用</span>
<span class="hljs-built_in">require</span>.cache = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);

<span class="hljs-comment">//读文件，返回结果</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readFile</span>(<span class="hljs-params">fileName</span>)</span>{ ... }
</code></pre>
<p>这就是一个简单的CommonJS模块风格的加载方式，也是node和fekit现在使用的加载方式。</p>
<h2 id="articleHeader2">实现demo</h2>
<p>亲测，不加demo很有可能看不懂</p>
<p>有一个文件 aaa.js,内容如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (){
    console.log(&quot;this is aaa&quot;);
}
exports.aaa = &quot;aaa&quot;;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"this is aaa"</span>);
}
exports.aaa = <span class="hljs-string">"aaa"</span>;
</code></pre>
<p>这是<code>var aaa = require('aaa.js')</code>会做以下事情</p>
<p><code>readFile("aaa.js")</code>  以字符串形式返回aaa的所有函数体，也就是上面的哪些部分代码<br>  通过new Function构造器，创造一个code函数，函数体是aaa.js里面的内容<br>  执行code函数，log出结果，然后扩展了module.exports<br>  返回这个module.exports 改外面的变量 aaa</p>
<h2 id="articleHeader3">再思考</h2>
<p>我们在吐js模块的时候经常使用的方案是这样两种<br> # module.exports = a object;<br> # exports.aaa = function();</p>
<p>如果我们直接写  exports = a object  会怎么样，为什么？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端Tank技能---模块化加载器的简单实现

## 原文链接
[https://segmentfault.com/a/1190000005726210](https://segmentfault.com/a/1190000005726210)

