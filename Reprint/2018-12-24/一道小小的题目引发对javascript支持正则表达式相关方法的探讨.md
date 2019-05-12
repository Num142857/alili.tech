---
title: '一道小小的题目引发对javascript支持正则表达式相关方法的探讨' 
date: 2018-12-24 2:30:07
hidden: true
slug: 6rgg1uutzbr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文发布在我的博客<a href="https://2ue.github.io/2017/11/24/regex-to-something/" rel="nofollow noreferrer" target="_blank">一道小小的题目引发对javascript支持正则表达式相关方法的探讨</a><br>许可协议: 署名-非商业性使用-禁止演绎 4.0 国际    转载请保留原文链接及作者。</p></blockquote>
<hr>
<blockquote><p>以前对于正则是非常惧怕的，因为看不懂和学不会。但最近项目中频繁的使用到了正则，因此强迫自己去学习了解，慢慢的体会到了他的魅力与强大。当然学习正则初入门的时候有些枯燥难懂，但越学越觉得轻松。本文不准备说关于正则本身的事儿，而是说一说关于javascript中关于正则的几个方法中被很多人忽略的地方。</p></blockquote>
<h2 id="articleHeader0">工具</h2>
<p>说到正则，很多人都是从抄到改到自己写，这个过程可能有时候很漫长。如一些工具能帮助你快速分析和学习正则，那么学习的过程你肯定要轻松得多。下面我推荐两个我经常使用的正则在线可视化工具，正则可视化工具图解符合铁路图规律（其实不明白什么是铁路一样很容易看懂，只是一些细微的地方和我们的常规思维有点差别）。</p>
<ul>
<li>
<a href="https://regexper.com" rel="nofollow noreferrer" target="_blank">regexper</a> 我最常用的一个，个人觉得UI做得比其他好</li>
<li>
<a href="https://jex.im/regulex/" rel="nofollow noreferrer" target="_blank">regulex</a> 备选，他有一个很舒心的功能，可以提供一段js，嵌套到你的网站，生成正则可视化图</li>
</ul>
<h2 id="articleHeader1">一道小小的题目</h2>
<p>这道题目是在群里日常闲聊时，公司同事抛出来的，具体是出自哪里本人没去考察。先先说说题目：</p>
<blockquote><p>写一个方法把一个数字末尾的连续0变成9，如1230000变成1239999</p></blockquote>
<p>一道很简单的题目，直接正则就能搞定，也许你会写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function zoreToNine(num){
    return (num + '').replace(/0/g,9);
}
//或者
function zoreToNine(num){
    return (num + '').replace(/[1-9]0+$/,9);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoreToNine</span>(<span class="hljs-params">num</span>)</span>{
    <span class="hljs-keyword">return</span> (num + <span class="hljs-string">''</span>).replace(<span class="hljs-regexp">/0/g</span>,<span class="hljs-number">9</span>);
}
<span class="hljs-comment">//或者</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoreToNine</span>(<span class="hljs-params">num</span>)</span>{
    <span class="hljs-keyword">return</span> (num + <span class="hljs-string">''</span>).replace(<span class="hljs-regexp">/[1-9]0+$/</span>,<span class="hljs-number">9</span>);
}</code></pre>
<p>这也是此题的陷阱所在，按照上面的方法，1023000就会被转化成1923999，这样是不符合要求的，所以改进一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function zoreToNine(num){
    return (num + '').replace(/[1-9]0+$/,function($1){
        return $1.replace(/0/g,9);
    });
}
zoreToNine(1223000); //1223999
zoreToNine(1023000); //1023999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zoreToNine</span>(<span class="hljs-params">num</span>)</span>{
    <span class="hljs-keyword">return</span> (num + <span class="hljs-string">''</span>).replace(<span class="hljs-regexp">/[1-9]0+$/</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$<span class="hljs-number">1</span></span>)</span>{
        <span class="hljs-keyword">return</span> $<span class="hljs-number">1.</span>replace(<span class="hljs-regexp">/0/g</span>,<span class="hljs-number">9</span>);
    });
}
zoreToNine(<span class="hljs-number">1223000</span>); <span class="hljs-comment">//1223999</span>
zoreToNine(<span class="hljs-number">1023000</span>); <span class="hljs-comment">//1023999</span></code></pre>
<p>关于这个问题的解决方案<a href="https://segmentfault.com/u/jawil">@微醺岁月</a>同学提供了一种，位置匹配的方法，简单了很多，厉害！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;12300100000&quot;.replace(/0(?=(0+$)|\b)/g,9); //12300199999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"12300100000"</span>.replace(<span class="hljs-regexp">/0(?=(0+$)|\b)/g</span>,<span class="hljs-number">9</span>); <span class="hljs-comment">//12300199999</span></code></pre>
<p>当然解决问题的方法很多，不一定非要用正则，还完全可以使用纯算术的方法实现，大家有兴趣可以尝试，闲话少说进入这次的主题：<code>javascript</code>支持正则表达式相关方法，注意并不是正则对象的方法。<br>上述方法使用了正则，有趣的是在回调函数里有一个$1，这个$1到底是什么？所有的匹配规则匹配后都有$1这个变量么？...一连串的问题，以前我从来没有去追探过，趁着昨个比较空闲，去追探了一番，并在今天整理了一下，写下此文记录。</p>
<h2 id="articleHeader2">主角</h2>
<p><code>javascript</code>中正则对象有三个方法：<code>test</code>、<code>exec</code>和<code>compile</code>，但是此次的主角并不是它们！我们讨论的是能够使用正则表示的相关方法：<code>search</code>、<code>match</code>、<code>replace</code>和<code>split</code>，注意它们都是<code>String</code>对象的方法，使用它们必须要是<code>String</code>类型.</p>
<h2 id="articleHeader3">replace(rule[regexp/substr], replacement)</h2>
<p><code>replace</code>是一个用于替换字符串的方法，虽然看似简单，但是它隐藏的机关也是常常被人忽略。具体分析一下它的特点:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="它接收两个参数
无副作用不影响原始变量
返回被改变的字符串(一定是字符串类型)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>它接收两个参数
无副作用不影响原始变量
返回被改变的字符串<span class="hljs-comment">(一定是字符串类型)</span>
</code></pre>
<p>定义一些变量，方便全文取用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = '12309800', b = '12309800[object Object]', b = '12309800{}';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> a = <span class="hljs-string">'12309800'</span>, b = <span class="hljs-string">'12309800[object Object]'</span>, b = <span class="hljs-string">'12309800{}'</span>;</code></pre>
<h3 id="articleHeader4">参数rule</h3>
<p>在一般情况，rule参数一般是正则、字符串、数字。<br>如果是字符串，将会在匹配到第一个符合条件的目标，结束方法；<br>如果是正则，则按照正则的规则进行匹配</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//匹配第一个0替换成5
a.replace(0,5); //'12359800'
//匹配所有的0替换成5
a.replace(/0/g,5); //'12359855'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//匹配第一个0替换成5</span>
a.replace(<span class="hljs-number">0</span>,<span class="hljs-number">5</span>); <span class="hljs-comment">//'12359800'</span>
<span class="hljs-comment">//匹配所有的0替换成5</span>
a.replace(<span class="hljs-regexp">/0/g</span>,<span class="hljs-number">5</span>); <span class="hljs-comment">//'12359855'</span></code></pre>
<h3 id="articleHeader5">参数replacement</h3>
<p>在一般情况，replacement参数是字符串、数字、者回调。</p>
<h4>包含$的字符串</h4>
<p>当参数rule为正则，并且正则至少包含有一对完整的<code>()</code>时，如果<code>replacement</code>包含有$的字符串，那么对于<code>$n</code>(n为大于0的整数，n的长度取决于正则中括号的对数)，会被解析成一个变量。但是也仅仅只是作为一个变量，无法在字符串中进行计算，此时更类似特别的字符串模板变量。</p>
<p>一般情况下，<code>$n</code>中n的长度取决于正则中括号的对数，$1表示第1对括号匹配的结果，$2表示第2对匹配的结果...在正则所有的括号对中，左括号出现在第几个位置（或者说从左往右），则它就是第几对括号，以此类推。姑且我们把这种规则成为<code>正则匹配分割规则</code>（ps:这完全是我自己取的一个名字，方便文章后面使用和记忆）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.replace(0,'$0'); //'123$09800'
a.replace(/00/g,'$0'); //'123098$0'
a.replace(/[1-9]0+$/,'$1'); //'12309$1'
a.replace(/([1-9](0+$))/,'$1'); //'12309800'，此时$1为[1-9](0+$)匹配到的内容，$2为0+$匹配到的内容
a.replace(/([1-9])(0+$)/,'$1'); //'123098'，此时$1为[1-9]匹配到的内容，$2为0+$匹配到的内容
a.replace(/([1-9])(0+$)/,'$1*$2'); //'123098*00'，此处的$1和$2不会安照期待的情况进行乘法计算，要进行计算可以用回调" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">a.replace(<span class="hljs-number">0</span>,<span class="hljs-string">'$0'</span>); <span class="hljs-comment">//'123$09800'</span>
a.replace(<span class="hljs-regexp">/00/g</span>,<span class="hljs-string">'$0'</span>); <span class="hljs-comment">//'123098$0'</span>
a.replace(<span class="hljs-regexp">/[1-9]0+$/</span>,<span class="hljs-string">'$1'</span>); <span class="hljs-comment">//'12309$1'</span>
a.replace(<span class="hljs-regexp">/([1-9](0+$))/</span>,<span class="hljs-string">'$1'</span>); <span class="hljs-comment">//'12309800'，此时$1为[1-9](0+$)匹配到的内容，$2为0+$匹配到的内容</span>
a.replace(<span class="hljs-regexp">/([1-9])(0+$)/</span>,<span class="hljs-string">'$1'</span>); <span class="hljs-comment">//'123098'，此时$1为[1-9]匹配到的内容，$2为0+$匹配到的内容</span>
a.replace(<span class="hljs-regexp">/([1-9])(0+$)/</span>,<span class="hljs-string">'$1*$2'</span>); <span class="hljs-comment">//'123098*00'，此处的$1和$2不会安照期待的情况进行乘法计算，要进行计算可以用回调</span></code></pre>
<blockquote><p>请注意：虽然目前参数replacement中携带有$n仍然能正常使用，但是这种方式已经不被<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features#RegExp_Properties" rel="nofollow noreferrer" target="_blank">规范</a>所推荐，更应该使用回调来完成这个操作。这一点谢谢<a href="https://segmentfault.com/u/lucky4">@lucky4</a>同学的指出</p></blockquote>
<p>如果正则中包含有全局匹配标志(g)，那么每次匹配的都符合上述规则</p>
<h4>回调函数</h4>
<p>先看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.replace(/[1-9]0+$/,function(){
    console.log(arguments); //[&quot;800&quot;,5,&quot;12309800&quot;]、
});
a.replace(/([1-9])0+$/,function(){
    console.log(arguments); //[&quot;800&quot;,&quot;8&quot;,5,&quot;12309800&quot;]
});
a.replace(/([1-9])(0+$)/,function(){
    console.log(arguments); //[&quot;800&quot;,&quot;8&quot;,&quot;00&quot;,5,&quot;12309800&quot;]
});
a.replace(/(([1-9])(0+$))/,function(){
    console.log(arguments); //[&quot;800&quot;,&quot;800&quot;,&quot;8&quot;,&quot;00&quot;,5,&quot;12309800&quot;]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">a.replace(<span class="hljs-regexp">/[1-9]0+$/</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>); <span class="hljs-comment">//["800",5,"12309800"]、</span>
});
a.replace(<span class="hljs-regexp">/([1-9])0+$/</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>); <span class="hljs-comment">//["800","8",5,"12309800"]</span>
});
a.replace(<span class="hljs-regexp">/([1-9])(0+$)/</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>); <span class="hljs-comment">//["800","8","00",5,"12309800"]</span>
});
a.replace(<span class="hljs-regexp">/(([1-9])(0+$))/</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>); <span class="hljs-comment">//["800","800","8","00",5,"12309800"]</span>
});</code></pre>
<p>回调函数的<code>arguments</code>数组部分组成：[完整匹配的字符串,$1,$2,...,$n,匹配的开始位置,原始字符串],<code>$1...$n</code>表示每个括号对的匹配，规则和前面的相同。<br>所以有一下规律：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [...arguments], len = arr.length;
(len >= 3) === true;
arr[0] = 完整匹配的字符串;
arr[len-2] = 匹配的开始位置;
arr[len-1] = 原始字符串;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arr = [...arguments], len = arr.length;
(len &gt;= <span class="hljs-number">3</span>) === <span class="hljs-literal">true</span>;
arr[<span class="hljs-number">0</span>] = 完整匹配的字符串;
arr[len<span class="hljs-number">-2</span>] = 匹配的开始位置;
arr[len<span class="hljs-number">-1</span>] = 原始字符串;</code></pre>
<p>注意：除了匹配的开始位置是<code>Number</code>类型外，其余的都是<code>String</code>类型</p>
<h3 id="articleHeader6">非常规类型参数</h3>
<p>如果参数类型不是上述两种情况，会发生什么呢？看看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.replace(0,null); //123null9800
a.replace(0,undefined); //123null9800
a.replace(0,[]); //1239800
a.replace(0,Array); //1230,3,123098009800
b.replace({},5); //123098005
c.replace({},5); //'12309800{}'
a.replace(0,{}); //123[object Object]9800
a.replace(0,Object); //12309800" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">a.replace(<span class="hljs-number">0</span>,<span class="hljs-literal">null</span>); <span class="hljs-comment">//123null9800</span>
a.replace(<span class="hljs-number">0</span>,<span class="hljs-literal">undefined</span>); <span class="hljs-comment">//123null9800</span>
a.replace(<span class="hljs-number">0</span>,[]); <span class="hljs-comment">//1239800</span>
a.replace(<span class="hljs-number">0</span>,<span class="hljs-built_in">Array</span>); <span class="hljs-comment">//1230,3,123098009800</span>
b.replace({},<span class="hljs-number">5</span>); <span class="hljs-comment">//123098005</span>
c.replace({},<span class="hljs-number">5</span>); <span class="hljs-comment">//'12309800{}'</span>
a.replace(<span class="hljs-number">0</span>,{}); <span class="hljs-comment">//123[object Object]9800</span>
a.replace(<span class="hljs-number">0</span>,<span class="hljs-built_in">Object</span>); <span class="hljs-comment">//12309800</span></code></pre>
<p>由上面的例子可以看出，如果非正则也非字符串，则有以下规则:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`null`变量，则会转换成`'null'`字符串;
`undefined`变量，则会转换成`'undefined'`字符串;
`[]`变量，则会调用`join()`方法转换成字符串，默认以`,`分割，值得注意的是空数组将会被转换成空字符串（没有任何字符），通常会被匹配源字符串的开始位置（默认开始位置为空字符串）;
'Array'变量，则会先转成成一个匹配的数组，形如`[完整匹配的字符串,$1,$2,...,$n,匹配的开始位置,原始字符串]`,然后对它调用`join()`方法转换成字符串，默认以`,`分割;
`{}`变量，则会调用`Object.protype.toString.call()`方法把`{}`转换成`[object Object]`;
`Object`变量，则貌似什么都没做
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>`null`变量，则会转换成`<span class="hljs-string">'null'</span>`字符串;
`undefined`变量，则会转换成`<span class="hljs-string">'undefined'</span>`字符串;
`[]`变量，则会调用`join()`方法转换成字符串，默认以`,`分割，值得注意的是空数组将会被转换成空字符串（没有任何字符），通常会被匹配源字符串的开始位置（默认开始位置为空字符串）;
<span class="hljs-string">'Array'</span>变量，则会先转成成一个匹配的数组，形如`[完整匹配的字符串,$<span class="hljs-number">1</span>,$<span class="hljs-number">2</span>,...,$n,匹配的开始位置,原始字符串]`,然后对它调用`join()`方法转换成字符串，默认以`,`分割;
`{}`变量，则会调用`Object.protype.toString.call()`方法把`{}`转换成`[object Object]`;
`Object`变量，则貌似什么都没做
</code></pre>
<p>虽然可以传入这些非正常参数，但大多数情况下这些类型的参数对实际是毫无意义的，所以不建议传入以上类型的参数。同上面的<code>正则匹配分割规则</code>一样，为了方便使用称呼，姑且我把上面的转换规则称为<code>正则匹配参数转换规则</code></p>
<h2 id="articleHeader7">match(rule[regex/substr])</h2>
<p><code>match</code>方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。<br>该方法类似<code>indexOf</code>和<code>lastIndexOf</code>，但是它返回指定的值，而不是字符串的位置；</p>
<h3 id="articleHeader8">参数</h3>
<p>参数的传递除了常规的正则和字符串以外，其余所有类型的参数都会按照上述的<code>正则匹配参数转换规则</code>转换成字符串形式来匹配。</p>
<h3 id="articleHeader9">返回值</h3>
<p>返回值根据传入的参数类型和规则的不同，返回的内容不同，但总体来说，它是返回一个对象，而不是索引，如果没匹配到任何符合条件的字符串，则返回<code>null</code>。</p>
<h3 id="articleHeader10">非全局匹配正则</h3>
<p>如果匹配规则是一个非全局匹配规则，那么，它此时的返回值是一个伪数组对象(likeArr)，形如:[一个展开的匹配到的字符串数组, 匹配到的字符串位置， 原始字符串]，它有如下规律：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var likeArr = a.match(regex);
likeArr[0] = 匹配到的字符串;
likeArr[1...n] = 正则匹配分割规则匹配的字符串;
likeArr.index = 匹配到字符串的位置
likeArr.inupt = 原始字符串" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> likeArr = a.match(regex);
likeArr[<span class="hljs-number">0</span>] = 匹配到的字符串;
likeArr[<span class="hljs-number">1.</span>..n] = 正则匹配分割规则匹配的字符串;
likeArr.index = 匹配到字符串的位置
likeArr.inupt = 原始字符串</code></pre>
<p>看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.match(/[1-9]0+$/); //[0:'800',index:5,input:'12309800']
a.match(/([1-9])0+$/); //[0:'800',1:'8',index:5,input:'12309800']
a.match(/[1-9](0+$)/); //[0:'800',1:'00',index:5,input:'12309800']
a.match(/([1-9])(0+$)/); //[0:'800',1:'8',2:'00',index:5,input:'12309800']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">a.match(<span class="hljs-regexp">/[1-9]0+$/</span>); <span class="hljs-comment">//[0:'800',index:5,input:'12309800']</span>
a.match(<span class="hljs-regexp">/([1-9])0+$/</span>); <span class="hljs-comment">//[0:'800',1:'8',index:5,input:'12309800']</span>
a.match(<span class="hljs-regexp">/[1-9](0+$)/</span>); <span class="hljs-comment">//[0:'800',1:'00',index:5,input:'12309800']</span>
a.match(<span class="hljs-regexp">/([1-9])(0+$)/</span>); <span class="hljs-comment">//[0:'800',1:'8',2:'00',index:5,input:'12309800']</span></code></pre>
<h3 id="articleHeader11">全局匹配正则</h3>
<p>如果匹配规则是一个全局匹配规则(正在携带有g标志)，那么，它此时的返回值是一个数组对象(arr)，形如:[匹配到的字符串数1,匹配到的字符串数2,匹配到的字符串数3];<br>看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.match(/[1-9]0/); //[0:'30',index:2,input:'12309800']
a.match(/[1-9]0/g); //[0:'30',1:'80']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">a.match(<span class="hljs-regexp">/[1-9]0/</span>); <span class="hljs-comment">//[0:'30',index:2,input:'12309800']</span>
a.match(<span class="hljs-regexp">/[1-9]0/g</span>); <span class="hljs-comment">//[0:'30',1:'80']</span></code></pre>
<h2 id="articleHeader12">search(rule[regex/substr])</h2>
<p><code>search</code>方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。<br><code>stringObject</code>中第一个与<code>rule</code>相匹配的子串的起始位置。如果没有找到任何匹配的子串，则返回<code>-1</code>。<br>注意:</p>
<ul>
<li>
<code>search</code>方法不执行全局匹配，它将忽略标志<code>g</code>。</li>
<li>忽略<code>regexp</code>的<code>lastIndex</code>属性，总是从字符串的开始进行检索，这意味着它总是返回<code>stringObject</code>的第一个匹配的位置</li>
</ul>
<p>同样，<code>search</code>可以传入任何参数类型，它会遵循<code>正则匹配参数转换规则</code>进行转换</p>
<h2 id="articleHeader13">split(rule[regex/substr],len)</h2>
<p>这个方法就不用多说，很常用的字符串分割方法。<br>第二个参数的作用就是限制返回值的长度，表示返回值的最大长度</p>
<p>当然，它依然可以传入任何参数类型，会遵循<code>正则匹配参数转换规则</code>进行转换</p>
<blockquote><p>有一段加密的后的密码，我们需要分离出字符串'12a344gg333tt445656ffa6778ii99'中的前三组数字，通过某种计算才能得出正确的密码</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'12a344gg333tt445656ffa6778ii99'.split(/[a-zA-Z]+/g,3);//['12','334','333']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'12a344gg333tt445656ffa6778ii99'</span>.split(<span class="hljs-regexp">/[a-zA-Z]+/g</span>,<span class="hljs-number">3</span>);<span class="hljs-comment">//['12','334','333']</span></code></pre>
<h2 id="articleHeader14">最后</h2>
<p>写了这么多，突然发现以前仅仅是在用这些方法，了解得很不够深入。越是学习才发现其中的奥秘！学无止境，与诸君共勉！<br>以上内容如有错误之处，希望诸君不吝指出！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一道小小的题目引发对javascript支持正则表达式相关方法的探讨

## 原文链接
[https://segmentfault.com/a/1190000012147039](https://segmentfault.com/a/1190000012147039)

