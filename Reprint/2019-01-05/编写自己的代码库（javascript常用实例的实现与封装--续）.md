---
title: '编写自己的代码库（javascript常用实例的实现与封装--续）' 
date: 2019-01-05 2:30:10
hidden: true
slug: wqpr801plv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>这个系列的上一篇文章（<a href="https://segmentfault.com/a/1190000010225928">编写自己的代码库（javascript常用实例的实现与封装）</a>）总结了34个常见的操作。但是在开发中，常见的实例又何止这么多个，经过这些日子的探索，以及他人的意见，现在得追加一些操作实例了。希望能帮到大家，也希望如果大家觉得有什么需要追加的，觉得我哪里写得不好或者写错了，欢迎评论或者私信我！另外，项目仍然是之前的那个，代码已经上传上去了，也欢迎大家在github上面star一下<a href="https://github.com/chenhuiYj/ec-do" rel="nofollow noreferrer" target="_blank">ec-do</a>！<br>好，下面正式进入正文！</p>
<h3 id="articleHeader1">特别说明</h3>
<blockquote>ps：下面的的函数写法，比如直接这样写是会报错的<code>createKeyExp：function(){}</code>。但我这篇文章是基于这个系列的上一篇文章的，等于是<code>createKeyExp：function(){}</code>，直接在<code>**ecDo**</code>这个对象里面。不知道的同学可以移步到上一篇文章（<a href="https://segmentfault.com/a/1190000010225928">编写自己的代码库（javascript常用实例的实现与封装）</a>）去看，或者直接去上面的<code>github</code>看代码<a href="https://github.com/chenhuiYj/ec-do" rel="nofollow noreferrer" target="_blank">ec-do</a>。</blockquote>
<p>实际代码如下，只是我没写出<code>var ecDo={}</code>而已！我为什么这样封装，之前也说过，不想声明太多全局变量。还有一个要注意的就是下面函数可能会出现<code>this</code>这个关键词，除了特别说明之外，都是指向<code>ecDo</code>这个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ecDo={
    createKeyExp：function(){...},
    longestWord:function(){...},
    ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> ecDo={
    createKeyExp：function()<span class="hljs-meta">{...}</span>,
    longestWord:function()<span class="hljs-meta">{...}</span>,
    ...
}
</code></pre>
<h2 id="articleHeader2">前序：bug修改以及写法优化</h2>
<p>此处修改之前提交函数已经发现的bug，基于这个系列上篇文章的提供的函数。</p>
<h3 id="articleHeader3">changeCase(大小写转换函数)修改</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改一个bug,当只有一个字符的时候。
//没处理前
ecDo.ecDo.changeCase(&quot;a&quot;,3)
&quot;a&quot;
//处理后
ecDo.changeCase(&quot;a&quot;,3)
&quot;A&quot;
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//修改一个bug,当只有一个字符的时候。</span>
<span class="hljs-comment">//没处理前</span>
ecDo<span class="hljs-selector-class">.ecDo</span><span class="hljs-selector-class">.changeCase</span>(<span class="hljs-string">"a"</span>,<span class="hljs-number">3</span>)
<span class="hljs-string">"a"</span>
<span class="hljs-comment">//处理后</span>
ecDo.changeCase(<span class="hljs-string">"a"</span>,<span class="hljs-number">3</span>)
<span class="hljs-string">"A"</span>
    </code></pre>
<h3 id="articleHeader4">upDigit（金额大写函数）bug修改</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//处理前
ecDo.upDigit(999900000)
&quot;人民币玖亿玖仟玖佰玖拾元整&quot;
//处理后
ecDo.upDigit(999900000)
&quot;人民币玖亿玖仟玖佰玖拾万元整&quot;    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">//处理前</span>
ecDo.upDigit<span class="hljs-comment">(999900000)</span>
<span class="hljs-string">"人民币玖亿玖仟玖佰玖拾元整"</span>
<span class="hljs-comment">//处理后</span>
ecDo.upDigit<span class="hljs-comment">(999900000)</span>
<span class="hljs-string">"人民币玖亿玖仟玖佰玖拾万元整"</span>    
</code></pre>
<h3 id="articleHeader5">covArr（求数组平均数）修改bug</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这个方法，完全是粗心大意写错了，但是现在改过来了！，直接使用就好
ecDo.covArr([1,2,3])
//2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//这个方法，完全是粗心大意写错了，但是现在改过来了！，直接使用就好</span>
ecDo.covArr([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>])
<span class="hljs-comment">//2</span>
</code></pre>
<h3 id="articleHeader6">随机码函数重命名</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//又是粗心大意，以前这个方法名是randomNumber，和另一个函数重名了！现在命名如下，使用方式不变
//ecDo.randomWord(10)
//&quot;644086665765861&quot;
//ecDo.randomWord(36)
//&quot;g4a0ne8ah5dgau8j58ka10pb9&quot;
randomWord:function (count){
    return Math.random().toString(count).substring(2);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//又是粗心大意，以前这个方法名是randomNumber，和另一个函数重名了！现在命名如下，使用方式不变</span>
<span class="hljs-comment">//ecDo.randomWord(10)</span>
<span class="hljs-comment">//"644086665765861"</span>
<span class="hljs-comment">//ecDo.randomWord(36)</span>
<span class="hljs-comment">//"g4a0ne8ah5dgau8j58ka10pb9"</span>
randomWord:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">count</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random().toString(count).substring(<span class="hljs-number">2</span>);
}
</code></pre>
<h3 id="articleHeader7">removeClass（删除类名）</h3>
<p>之前是只能处理单个html元素，传入html集合或者html元素数组，运行会报错，现在即使传入的是一个html集合或者html元素数组，都可以处理</p>
<h3 id="articleHeader8">addClass（增加类名）</h3>
<p>之前是只能处理单个html元素，传入html集合或者html元素数组，运行会报错，现在即使传入的是一个html集合或者html元素数组，都可以处理</p>
<h3 id="articleHeader9">hasClass（检测对象是否有哪个类名）</h3>
<p>之前如果传进来的obj本身没有class属性，或者class为空的情况下，运行会报错，现在返回fasle</p>
<h2 id="articleHeader10">前序：写法优化</h2>
<h3 id="articleHeader11">sumArr（数字数组求和）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//数字数组求和
sumArr: function (arr) {
    //以前写法
    //var sumText = 0;
    //for (var i = 0, len = arr.length; i < len; i++) {
       // sumText += arr[i];
    //}
    //return sumText
    //现在写法
    return arr.reduce(function(pre,cur){return pre+cur})
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//数字数组求和</span>
sumArr: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(arr)</span> </span>{
    <span class="hljs-comment">//以前写法</span>
    <span class="hljs-comment">//var sumText = 0;</span>
    <span class="hljs-comment">//for (var i = 0, len = arr.length; i &lt; len; i++) {</span>
       <span class="hljs-comment">// sumText += arr[i];</span>
    <span class="hljs-comment">//}</span>
    <span class="hljs-comment">//return sumText</span>
    <span class="hljs-comment">//现在写法</span>
    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(pre,cur)</span></span>{<span class="hljs-keyword">return</span> pre+cur})
}    </code></pre>
<h3 id="articleHeader12">siblings（获取兄弟节点）</h3>
<p>增加筛选条件，支持标签名，class，id</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//之前写法
ecDo.siblings(obj)
//现在写法
//返回所有兄弟节点
ecDo.siblings(obj)
//返回兄弟节点且兄弟节点id为‘cur’
ecDo.siblings(obj,'#cur')
//返回兄弟节点且兄弟节点class为‘cur’
ecDo.siblings(obj,'.cur')
//返回兄弟节点且兄弟节点标签为a
ecDo.siblings(obj,'a')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//之前写法</span>
<span class="hljs-selector-tag">ecDo</span><span class="hljs-selector-class">.siblings</span>(obj)
<span class="hljs-comment">//现在写法</span>
<span class="hljs-comment">//返回所有兄弟节点</span>
<span class="hljs-selector-tag">ecDo</span><span class="hljs-selector-class">.siblings</span>(obj)
<span class="hljs-comment">//返回兄弟节点且兄弟节点id为‘cur’</span>
<span class="hljs-selector-tag">ecDo</span><span class="hljs-selector-class">.siblings</span>(obj,<span class="hljs-string">'#cur'</span>)
<span class="hljs-comment">//返回兄弟节点且兄弟节点class为‘cur’</span>
<span class="hljs-selector-tag">ecDo</span><span class="hljs-selector-class">.siblings</span>(obj,<span class="hljs-string">'.cur'</span>)
<span class="hljs-comment">//返回兄弟节点且兄弟节点标签为a</span>
<span class="hljs-selector-tag">ecDo</span><span class="hljs-selector-class">.siblings</span>(obj,<span class="hljs-string">'a'</span>)
</code></pre>
<h2 id="articleHeader13">2.字符串操作</h2>
<p>好了，说完了上篇的内容，接下来说下这篇文章增加的函数</p>
<h3 id="articleHeader14">2-1.找出最长单词</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//longestWord('Find the Longest word in a String')
//7
//longestWord('Find|the|Longest|word|in|a|String','|')
//7
longestWord:function(str, splitType) {
    var _splitType = splitType || /\s+/g,
        _max = 0;
    var strArr = str.split(_splitType);
    strArr.forEach(function (item) {
        if (_max < item.length) {
            _max = item.length
        }
    })
    return _max;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//longestWord('Find the Longest word in a String')</span>
<span class="hljs-comment">//7</span>
<span class="hljs-comment">//longestWord('Find|the|Longest|word|in|a|String','|')</span>
<span class="hljs-comment">//7</span>
longestWord:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str, splitType</span>) </span>{
    <span class="hljs-keyword">var</span> _splitType = splitType || <span class="hljs-regexp">/\s+/g</span>,
        _max = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> strArr = str.split(_splitType);
    strArr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">if</span> (_max &lt; item.length) {
            _max = item.length
        }
    })
    <span class="hljs-keyword">return</span> _max;
}
</code></pre>
<h3 id="articleHeader15">2-2.句中单每个单词词首字母大写</h3>
<p>这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//句中单词首字母大写 (Title Case a Sentence)
//ecDo.titleCaseUp('this is a title')
//&quot;This Is A Title&quot;
titleCaseUp: function titleCaseUp(str, splitType) {
    var _splitType = splitType || /\s+/g;
    var strArr = str.split(_splitType),
        result = &quot;&quot;;
    strArr.forEach(function (item) {
        if (_max < item.length) {
            result += this.changeCase(item, 1) + ' ';
        }
    })
    return this.trim(result, 4)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//句中单词首字母大写 (Title Case a Sentence)</span>
<span class="hljs-comment">//ecDo.titleCaseUp('this is a title')</span>
<span class="hljs-comment">//"This Is A Title"</span>
titleCaseUp: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">titleCaseUp</span>(<span class="hljs-params">str, splitType</span>) </span>{
    <span class="hljs-keyword">var</span> _splitType = splitType || <span class="hljs-regexp">/\s+/g</span>;
    <span class="hljs-keyword">var</span> strArr = str.split(_splitType),
        result = <span class="hljs-string">""</span>;
    strArr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">if</span> (_max &lt; item.length) {
            result += <span class="hljs-keyword">this</span>.changeCase(item, <span class="hljs-number">1</span>) + <span class="hljs-string">' '</span>;
        }
    })
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.trim(result, <span class="hljs-number">4</span>)
}
</code></pre>
<h3 id="articleHeader16">2-3.字符串过滤</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//过滤字符串(html标签，表情，特殊字符，)
//字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
//如果需要过滤多种字符，type参数使用','分割
//如下栗子,意思就是过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是保留特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
//var str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&amp;*^%^&amp;*$\\&quot;\'#@!()*/-())_\'&quot;:&quot;{}?<div></div><img src=&quot;&quot;/>啊实打实大蠢猪自行车这些课程';
// ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')
//&quot;asd    654a**sasdasd*********6d5#%^*^&amp;*^%^&amp;*$\&quot;'#@!()*/-())_'&quot;:&quot;{}?*****************&quot;
filterStr:function(str,type,restr,spstr){
    var typeArr=type.split(','),_str=str;
    for(var i=0,len=typeArr.length;i<len;i++){
        if(typeArr[i]==='special'){
        var pattern,regText='$()[]{}?\|^*+./\&quot;\'+';
        if(spstr){
            var _spstr=spstr.split(&quot;&quot;),_regText=&quot;[^0-9A-Za-z\\s&quot;;
            for(var i=0,len=_spstr.length;i<len;i++){
                if(regText.indexOf(_spstr[i])===-1){
                    _regText+=_spstr[i];
                }
                else{
                    _regText+='\\'+_spstr[i];
                }
            }
            _regText+=']'
            pattern = new RegExp(_regText,'g');
        }
        else{
            pattern = new RegExp(&quot;[^0-9A-Za-z\\s]&quot;,'g')
        }
    }
    var _restr=restr||'';
    switch(typeArr[i]){
        case 'special': _str=_str.replace(pattern,_restr);break;
        case 'html': _str=_str.replace(/<\/?[^>]*>/g, _restr);break;
        case 'emjoy': _str=_str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g,_restr);break;
        case 'word': _str=_str.replace(/[a-z]/g,_restr);break;
        case 'WORD': _str=_str.replace(/[A-Z]/g,_restr);break;
        case 'number':_str= _str.replace(/[0-9]/g,_restr);break;
        case 'chinese': _str=_str.replace(/[\u4E00-\u9FA5]/g,_restr);break;
      }
    }
    return _str;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//过滤字符串(html标签，表情，特殊字符，)</span>
<span class="hljs-comment">//字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符</span>
<span class="hljs-comment">//如果需要过滤多种字符，type参数使用','分割</span>
<span class="hljs-comment">//如下栗子,意思就是过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是保留特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除</span>
<span class="hljs-comment">//var str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&amp;*^%^&amp;*$\\"\'#@!()*/-())_\'":"{}?&lt;div&gt;&lt;/div&gt;&lt;img src=""/&gt;啊实打实大蠢猪自行车这些课程';</span>
<span class="hljs-comment">// ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')</span>
<span class="hljs-comment">//"asd    654a**sasdasd*********6d5#%^*^&amp;*^%^&amp;*$\"'#@!()*/-())_'":"{}?*****************"</span>
filterStr:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str,<span class="hljs-keyword">type</span>,restr,spstr</span>)</span>{
    <span class="hljs-keyword">var</span> typeArr=<span class="hljs-keyword">type</span>.split(<span class="hljs-string">','</span>),_str=str;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=typeArr.length;i&lt;len;i++){
        <span class="hljs-keyword">if</span>(typeArr[i]===<span class="hljs-string">'special'</span>){
        <span class="hljs-keyword">var</span> pattern,regText=<span class="hljs-string">'$()[]{}?\|^*+./\"\'+'</span>;
        <span class="hljs-keyword">if</span>(spstr){
            <span class="hljs-keyword">var</span> _spstr=spstr.split(<span class="hljs-string">""</span>),_regText=<span class="hljs-string">"[^0-9A-Za-z\\s"</span>;
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=_spstr.length;i&lt;len;i++){
                <span class="hljs-keyword">if</span>(regText.indexOf(_spstr[i])===<span class="hljs-number">-1</span>){
                    _regText+=_spstr[i];
                }
                <span class="hljs-keyword">else</span>{
                    _regText+=<span class="hljs-string">'\\'</span>+_spstr[i];
                }
            }
            _regText+=<span class="hljs-string">']'</span>
            pattern = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(_regText,<span class="hljs-string">'g'</span>);
        }
        <span class="hljs-keyword">else</span>{
            pattern = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"[^0-9A-Za-z\\s]"</span>,<span class="hljs-string">'g'</span>)
        }
    }
    <span class="hljs-keyword">var</span> _restr=restr||<span class="hljs-string">''</span>;
    <span class="hljs-keyword">switch</span>(typeArr[i]){
        <span class="hljs-keyword">case</span> <span class="hljs-string">'special'</span>: _str=_str.replace(pattern,_restr);<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'html'</span>: _str=_str.replace(<span class="hljs-regexp">/&lt;\/?[^&gt;]*&gt;/g</span>, _restr);<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'emjoy'</span>: _str=_str.replace(<span class="hljs-regexp">/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g</span>,_restr);<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'word'</span>: _str=_str.replace(<span class="hljs-regexp">/[a-z]/g</span>,_restr);<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'WORD'</span>: _str=_str.replace(<span class="hljs-regexp">/[A-Z]/g</span>,_restr);<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'number'</span>:_str= _str.replace(<span class="hljs-regexp">/[0-9]/g</span>,_restr);<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'chinese'</span>: _str=_str.replace(<span class="hljs-regexp">/[\u4E00-\u9FA5]/g</span>,_restr);<span class="hljs-keyword">break</span>;
      }
    }
    <span class="hljs-keyword">return</span> _str;
}
</code></pre>
<h3 id="articleHeader17">2-4.创建正则字符</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建正则字符,一般是为搜索或者高亮操作
//createKeyExp(['我','谁'])
//'(我|谁)'
createKeyExp：function(strArr) {
    var str = &quot;&quot;;
    for (var i = 0; i < strArr.length; i++) {
        if (i != strArr.length - 1) {
            str = str + strArr[i] + &quot;|&quot;;
        } else {
            str = str + strArr[i];
        }
    }
    return &quot;(&quot; + str + &quot;)&quot;;
}    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-comment">//创建正则字符,一般是为搜索或者高亮操作</span>
<span class="hljs-comment">//createKeyExp(['我','谁'])</span>
<span class="hljs-comment">//'(我|谁)'</span>
createKeyExp：<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(strArr)</span> {</span>
    var <span class="hljs-built_in">str</span> = <span class="hljs-string">""</span>;
    <span class="hljs-keyword">for</span> (var i = <span class="hljs-number">0</span>; i &lt; strArr.length; i++) {
        <span class="hljs-keyword">if</span> (i != strArr.length - <span class="hljs-number">1</span>) {
            <span class="hljs-built_in">str</span> = <span class="hljs-built_in">str</span> + strArr[i] + <span class="hljs-string">"|"</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">str</span> = <span class="hljs-built_in">str</span> + strArr[i];
        }
    }
    return <span class="hljs-string">"("</span> + <span class="hljs-built_in">str</span> + <span class="hljs-string">")"</span>;
}    
</code></pre>
<h3 id="articleHeader18">2-5.关键字加标签</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//简单关键字加标签（多个关键词用空格隔开）
//ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
//&quot;<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯&quot;
//加完了标签，对i怎么设置样式就靠大家了！
findKey:function(str, key, el) {
    var arr = null,
        regStr = null,
        content = null,
        Reg = null,
        _el = el || 'span';
    arr = key.split(/\s+/);
    //alert(regStr); //    如：(前端|过来)
    regStr = this.createKeyExp(arr);
    content = str;
    //alert(Reg);//        /如：(前端|过来)/g
    Reg = new RegExp(regStr, &quot;g&quot;);
    content = content;
    //过滤html标签 替换标签，往关键字前后加上标签
    return content.replace(/<\/?[^>]*>/g, '').replace(Reg, &quot;<&quot; + _el + &quot;>$1</&quot; + _el + &quot;>&quot;);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">//简单关键字加标签（多个关键词用空格隔开）</span>
<span class="hljs-comment">//ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')</span>
<span class="hljs-comment">//"&lt;i&gt;守侯&lt;/i&gt;我oaks接到了来自下次你离&lt;i&gt;开&lt;/i&gt;快乐吉祥留在&lt;i&gt;开&lt;/i&gt;城侯"</span>
<span class="hljs-comment">//加完了标签，对i怎么设置样式就靠大家了！</span>
findKey:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str, key, el</span>) </span>{
    <span class="hljs-keyword">var</span> arr = <span class="hljs-literal">null</span>,
        regStr = <span class="hljs-literal">null</span>,
        content = <span class="hljs-literal">null</span>,
        Reg = <span class="hljs-literal">null</span>,
        _el = el || <span class="hljs-string">'span'</span>;
    arr = key.split(<span class="hljs-regexp">/\s+/</span>);
    <span class="hljs-comment">//alert(regStr); //    如：(前端|过来)</span>
    regStr = <span class="hljs-keyword">this</span>.createKeyExp(arr);
    content = str;
    <span class="hljs-comment">//alert(Reg);//        /如：(前端|过来)/g</span>
    Reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regStr, <span class="hljs-string">"g"</span>);
    content = content;
    <span class="hljs-comment">//过滤html标签 替换标签，往关键字前后加上标签</span>
    <span class="hljs-keyword">return</span> content.replace(<span class="hljs-regexp">/&lt;\/?[^&gt;]*&gt;/g</span>, <span class="hljs-string">''</span>).replace(Reg, <span class="hljs-string">"&lt;"</span> + _el + <span class="hljs-string">"&gt;$1&lt;/"</span> + _el + <span class="hljs-string">"&gt;"</span>);
}
</code></pre>
<h2 id="articleHeader19">3.数组操作</h2>
<h3 id="articleHeader20">3-1.获取对象数组某些项</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取对象数组某些项
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//getOptionArray(arr,'a,c')
//[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
//只获取某一项的值
//getOptionArray(arr,'a',1)
//getOptionArray(arr,'b',1)
//[2, 3, 9, 2, 5]
getOptionArray:function(arr, keys, type) {
    var newArr = []
    if (!keys) {
        return arr
    }
    //是否只是需要获取某一项的值
    if (type === 1) {
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i][keys])
        }
        return newArr;
    }
    var _keys = keys.split(','), newArrOne = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var j = 0, len1 = _keys.length; j < len1; j++) {
            newArrOne[_keys[j]] = arr[i][_keys[j]]
        }
        newArr.push(newArrOne);
    }
    return newArr
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//获取对象数组某些项</span>
<span class="hljs-comment">//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]</span>
<span class="hljs-comment">//getOptionArray(arr,'a,c')</span>
<span class="hljs-comment">//[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]</span>
<span class="hljs-comment">//只获取某一项的值</span>
<span class="hljs-comment">//getOptionArray(arr,'a',1)</span>
<span class="hljs-comment">//getOptionArray(arr,'b',1)</span>
<span class="hljs-comment">//[2, 3, 9, 2, 5]</span>
getOptionArray:<span class="hljs-type">function</span>(arr, keys, type) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = []
    <span class="hljs-keyword">if</span> (!keys) {
        <span class="hljs-keyword">return</span> arr
    }
    <span class="hljs-comment">//是否只是需要获取某一项的值</span>
    <span class="hljs-keyword">if</span> (type === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
            <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.push(arr[i][keys])
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>;
    }
    <span class="hljs-keyword">var</span> _keys = keys.split(<span class="hljs-string">','</span>), <span class="hljs-keyword">new</span><span class="hljs-type">ArrOne</span> = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
        <span class="hljs-keyword">new</span><span class="hljs-type">ArrOne</span> = {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>, len1 = _keys.length; j &lt; len1; j++) {
            <span class="hljs-keyword">new</span><span class="hljs-type">ArrOne</span>[_keys[j]] = arr[i][_keys[j]]
        }
        <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.push(<span class="hljs-keyword">new</span><span class="hljs-type">ArrOne</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>
}
</code></pre>
<h3 id="articleHeader21">3-2.排除数组某些项</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//排除数组某些项
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//filterOptionArray(arr,'a')
//[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
//filterOptionArray(arr,'a,c')
//[{b:2},{b:3},{b:9},{b:2},{b:5}]
filterOptionArray:function(arr, keys) {
    var newArr = []
    var _keys = keys.split(','), newArrOne = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var key in arr[i]) {
            //如果key不存在排除keys里面,添加数据
            if (_keys.indexOf(key) === -1) {
                newArrOne[key] = arr[i][key];
            }
        }
        newArr.push(newArrOne);
    }
    return newArr
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//排除数组某些项</span>
<span class="hljs-comment">//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]</span>
<span class="hljs-comment">//filterOptionArray(arr,'a')</span>
<span class="hljs-comment">//[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]</span>
<span class="hljs-comment">//filterOptionArray(arr,'a,c')</span>
<span class="hljs-comment">//[{b:2},{b:3},{b:9},{b:2},{b:5}]</span>
filterOptionArray:<span class="hljs-type">function</span>(arr, keys) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span> = []
    <span class="hljs-keyword">var</span> _keys = keys.split(<span class="hljs-string">','</span>), <span class="hljs-keyword">new</span><span class="hljs-type">ArrOne</span> = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
        <span class="hljs-keyword">new</span><span class="hljs-type">ArrOne</span> = {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> arr[i]) {
            <span class="hljs-comment">//如果key不存在排除keys里面,添加数据</span>
            <span class="hljs-keyword">if</span> (_keys.indexOf(key) === <span class="hljs-number">-1</span>) {
                <span class="hljs-keyword">new</span><span class="hljs-type">ArrOne</span>[key] = arr[i][key];
            }
        }
        <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>.push(<span class="hljs-keyword">new</span><span class="hljs-type">ArrOne</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>
}
</code></pre>
<h3 id="articleHeader22">3-3.对象数组排序</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
//对象数组的排序
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//arraySort(arr2,'a,b')  a是第一排序条件，b是第二排序条件
//[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:4,b:2,c:5},{a:4,b:5,c:7},{a:5,b:9}]
arraySort: function (arr, sortText) {
    if (!sortText) {
        return arr
    }
    var _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
    for (var i = 0, len = _sortText.length; i < len; i++) {
        _arr.sort(function (n1, n2) {
            return n1[_sortText[i]] - n2[_sortText[i]]
        })
    }
    return _arr;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    
<span class="hljs-comment">//对象数组的排序</span>
<span class="hljs-comment">//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]</span>
<span class="hljs-comment">//arraySort(arr2,'a,b')  a是第一排序条件，b是第二排序条件</span>
<span class="hljs-comment">//[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:4,b:2,c:5},{a:4,b:5,c:7},{a:5,b:9}]</span>
arraySort: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(arr, sortText)</span> </span>{
    <span class="hljs-keyword">if</span> (!sortText) {
        <span class="hljs-keyword">return</span> arr
    }
    <span class="hljs-keyword">var</span> _sortText = sortText.split(<span class="hljs-string">','</span>).reverse(), _arr = arr.slice(<span class="hljs-number">0</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = _sortText.length; i &lt; len; i++) {
        _arr.sort(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(n1, n2)</span> </span>{
            <span class="hljs-keyword">return</span> n1[_sortText[i]] - n2[_sortText[i]]
        })
    }
    <span class="hljs-keyword">return</span> _arr;
}
</code></pre>
<h2 id="articleHeader23">4.DOM操作</h2>
<h3 id="articleHeader24">4-1.预加载图片</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//图片没加载出来时用一张图片（loading图片）代替，一般和图片懒加载一起使用
aftLoadImg:function(obj, url, cb) {
    var oImg = new Image(),_this=this;
    oImg.src = url;
    oImg.onload = function () {
        obj.src = oImg.src;
        if (cb &amp;&amp; _this.istype(cb, 'function')) {
            cb(obj);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//图片没加载出来时用一张图片（loading图片）代替，一般和图片懒加载一起使用</span>
aftLoadImg:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj, url, cb)</span> </span>{
    <span class="hljs-keyword">var</span> oImg = <span class="hljs-keyword">new</span> Image(),_this=<span class="hljs-keyword">this</span>;
    oImg.src = url;
    oImg.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        obj.src = oImg.src;
        <span class="hljs-keyword">if</span> (cb &amp;&amp; _this.istype(cb, <span class="hljs-string">'function'</span>)) {
            cb(obj);
        }
    }
}</code></pre>
<h3 id="articleHeader25">4-2.图片滚动懒加载</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//图片滚动懒加载
//@className {string} 要遍历图片的类名
//@num {number} 距离多少的时候开始加载 默认 0
//比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载

//html代码
//<p><img data-src=&quot;lawyerOtherImg.jpg&quot; class=&quot;load-img&quot; width='528' height='304' /></p>
//<p><img data-src=&quot;lawyerOtherImg.jpg&quot; class=&quot;load-img&quot; width='528' height='304' /></p>
//<p><img data-src=&quot;lawyerOtherImg.jpg&quot; class=&quot;load-img&quot; width='528' height='304' /></p>....
//data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
//详细可以查看testLoadImg.html

//window.onload = function() {
//    ecDo.loadImg('load-img',100);
//    window.onscroll = function() {
//        ecDo.loadImg('load-img',100);
//        }
//}
loadImg:function(className, num) {
    var _className = className || 'ec-load-img', _num = num || 0,_this=this;
    var oImgLoad = document.getElementsByClassName(_className);
    for (var i = 0, len = oImgLoad.length; i < len; i++) {
        if (document.documentElement.clientHeight + document.body.scrollTop > oImgLoad[i].offsetTop - _num &amp;&amp; !oImgLoad[i].isLoad) {
            //记录图片是否已经加载
            oImgLoad[i].isLoad = true;
            //设置过渡，当图片下来的时候有一个图片透明度变化
            oImgLoad[i].style.cssText = &quot;transition: ''; opacity: 0;&quot;
            if (oImgLoad[i].dataset) {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, function (o) {
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = &quot;&quot;;
                        }
                    }, 1000)
                });
            } else {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute(&quot;data-src&quot;), function (o) {
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = &quot;&quot;;
                        }
                    }, 1000)
                });
            }
            (function (i) {
                setTimeout(function () {
                    oImgLoad[i].style.cssText = &quot;transition:all 1s; opacity: 1;&quot;;
                }, 16)
            })(i);
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//图片滚动懒加载</span>
<span class="hljs-comment">//@className {string} 要遍历图片的类名</span>
<span class="hljs-comment">//@num {number} 距离多少的时候开始加载 默认 0</span>
<span class="hljs-comment">//比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载</span>

<span class="hljs-comment">//html代码</span>
<span class="hljs-comment">//&lt;p&gt;&lt;img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /&gt;&lt;/p&gt;</span>
<span class="hljs-comment">//&lt;p&gt;&lt;img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /&gt;&lt;/p&gt;</span>
<span class="hljs-comment">//&lt;p&gt;&lt;img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /&gt;&lt;/p&gt;....</span>
<span class="hljs-comment">//data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。</span>
<span class="hljs-comment">//详细可以查看testLoadImg.html</span>

<span class="hljs-comment">//window.onload = function() {</span>
<span class="hljs-comment">//    ecDo.loadImg('load-img',100);</span>
<span class="hljs-comment">//    window.onscroll = function() {</span>
<span class="hljs-comment">//        ecDo.loadImg('load-img',100);</span>
<span class="hljs-comment">//        }</span>
<span class="hljs-comment">//}</span>
loadImg:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">className, num</span>) </span>{
    <span class="hljs-keyword">var</span> _className = className || <span class="hljs-string">'ec-load-img'</span>, _num = num || <span class="hljs-number">0</span>,_this=<span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> oImgLoad = <span class="hljs-built_in">document</span>.getElementsByClassName(_className);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = oImgLoad.length; i &lt; len; i++) {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.documentElement.clientHeight + <span class="hljs-built_in">document</span>.body.scrollTop &gt; oImgLoad[i].offsetTop - _num &amp;&amp; !oImgLoad[i].isLoad) {
            <span class="hljs-comment">//记录图片是否已经加载</span>
            oImgLoad[i].isLoad = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">//设置过渡，当图片下来的时候有一个图片透明度变化</span>
            oImgLoad[i].style.cssText = <span class="hljs-string">"transition: ''; opacity: 0;"</span>
            <span class="hljs-keyword">if</span> (oImgLoad[i].dataset) {
                <span class="hljs-keyword">this</span>.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>) </span>{
                    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        <span class="hljs-keyword">if</span> (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = <span class="hljs-string">""</span>;
                        }
                    }, <span class="hljs-number">1000</span>)
                });
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute(<span class="hljs-string">"data-src"</span>), <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">o</span>) </span>{
                    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        <span class="hljs-keyword">if</span> (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = <span class="hljs-string">""</span>;
                        }
                    }, <span class="hljs-number">1000</span>)
                });
            }
            (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    oImgLoad[i].style.cssText = <span class="hljs-string">"transition:all 1s; opacity: 1;"</span>;
                }, <span class="hljs-number">16</span>)
            })(i);
        }
    }
}
</code></pre>
<h2 id="articleHeader26">5.其它做操</h2>
<h3 id="articleHeader27">5-1.封装AJAX</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * @param {string}obj.type http连接的方式，包括POST和GET两种方式
 * @param {string}obj.url 发送请求的url
 * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}obj.data 发送的参数，格式为对象类型
 * @param {function}obj.success ajax发送并接收成功调用的回调函数
 * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
 */
//  ecDo.ajax({
//      type:'get',
//      url:'xxx',
//      data:{
//          id:'111'
//      },
//      success:function(res){
//          console.log(res)
//      }
//  })
ajax: function (obj) {
    obj = obj || {};
    obj.type = obj.type.toUpperCase() || 'POST';
    obj.url = obj.url || '';
    obj.async = obj.async || true;
    obj.data = obj.data || null;
    obj.success = obj.success || function () {
        };
    obj.error= obj.error || function () {
        };
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in obj.data) {
        params.push(key + '=' + obj.data[key]);
    }
    var postData = params.join('&amp;');
    if (obj.type.toUpperCase() === 'POST') {
        xmlHttp.open(obj.type, obj.url, obj.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    } else if (obj.type.toUpperCase() === 'GET') {
        xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 &amp;&amp; xmlHttp.status == 200) {
            obj.success(xmlHttp.responseText);
        } else {
            obj.error(xmlHttp.responseText);
        }
    };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/*
 * <span class="hljs-doctag">@param</span> {string}obj.type http连接的方式，包括POST和GET两种方式
 * <span class="hljs-doctag">@param</span> {string}obj.url 发送请求的url
 * <span class="hljs-doctag">@param</span> {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 * <span class="hljs-doctag">@param</span> {object}obj.data 发送的参数，格式为对象类型
 * <span class="hljs-doctag">@param</span> {function}obj.success ajax发送并接收成功调用的回调函数
 * <span class="hljs-doctag">@param</span> {function}obj.error ajax发送失败或者接收失败调用的回调函数
 */</span>
<span class="hljs-comment">//  ecDo.ajax({</span>
<span class="hljs-comment">//      type:'get',</span>
<span class="hljs-comment">//      url:'xxx',</span>
<span class="hljs-comment">//      data:{</span>
<span class="hljs-comment">//          id:'111'</span>
<span class="hljs-comment">//      },</span>
<span class="hljs-comment">//      success:function(res){</span>
<span class="hljs-comment">//          console.log(res)</span>
<span class="hljs-comment">//      }</span>
<span class="hljs-comment">//  })</span>
ajax: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(obj)</span> </span>{
    obj = obj || {};
    obj.type = obj.type.toUpperCase() || <span class="hljs-string">'POST'</span>;
    obj.url = obj.url || <span class="hljs-string">''</span>;
    obj.async = obj.async || <span class="hljs-keyword">true</span>;
    obj.data = obj.data || <span class="hljs-keyword">null</span>;
    obj.success = obj.success || <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        };
    obj.error= obj.error || <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        };
    <span class="hljs-keyword">var</span> xmlHttp = <span class="hljs-keyword">null</span>;
    <span class="hljs-keyword">if</span> (XMLHttpRequest) {
        xmlHttp = <span class="hljs-keyword">new</span> XMLHttpRequest();
    } <span class="hljs-keyword">else</span> {
        xmlHttp = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">'Microsoft.XMLHTTP'</span>);
    }
    <span class="hljs-keyword">var</span> params = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key in obj.data) {
        params.push(key + <span class="hljs-string">'='</span> + obj.data[key]);
    }
    <span class="hljs-keyword">var</span> postData = params.join(<span class="hljs-string">'&amp;'</span>);
    <span class="hljs-keyword">if</span> (obj.type.toUpperCase() === <span class="hljs-string">'POST'</span>) {
        xmlHttp.open(obj.type, obj.url, obj.async);
        xmlHttp.setRequestHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'application/x-www-form-urlencoded;charset=utf-8'</span>);
        xmlHttp.send(postData);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (obj.type.toUpperCase() === <span class="hljs-string">'GET'</span>) {
        xmlHttp.open(obj.type, obj.url + <span class="hljs-string">'?'</span> + postData, obj.async);
        xmlHttp.send(<span class="hljs-keyword">null</span>);
    }
    xmlHttp.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span> (xmlHttp.readyState == <span class="hljs-number">4</span> &amp;&amp; xmlHttp.status == <span class="hljs-number">200</span>) {
            obj.success(xmlHttp.responseText);
        } <span class="hljs-keyword">else</span> {
            obj.error(xmlHttp.responseText);
        }
    };
}
</code></pre>
<h3 id="articleHeader28">5-2.数据类型判断</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//数据类型判断
//istype([],'array')
//true
//istype([])
//'[object Array]'
istype:function(o, type) {
    //全部小写
    var _type = type.toLowerCase();
    switch (_type) {
        case 'string':
            return Object.prototype.toString.call(o) === '[object String]';
        case 'number':
            return Object.prototype.toString.call(o) === '[object Number]';
        case 'boolean':
            return Object.prototype.toString.call(o) === '[object Boolean]';
        case 'undefined':
            return Object.prototype.toString.call(o) === '[object Undefined]';
        case 'null':
            return Object.prototype.toString.call(o) === '[object Null]';
        case 'function':
            return Object.prototype.toString.call(o) === '[object Function]';
        case 'array':
            return Object.prototype.toString.call(o) === '[object Array]';
        case 'object':
            return Object.prototype.toString.call(o) === '[object Object]';
        case 'nan':
            return isNaN(o);
        case 'elements':
            return Object.prototype.toString.call(o).indexOf('HTML')!==-1
        default:
            return Object.prototype.toString.call(o)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//数据类型判断</span>
<span class="hljs-comment">//istype([],'array')</span>
<span class="hljs-comment">//true</span>
<span class="hljs-comment">//istype([])</span>
<span class="hljs-comment">//'[object Array]'</span>
istype:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">o, <span class="hljs-keyword">type</span></span>) </span>{
    <span class="hljs-comment">//全部小写</span>
    <span class="hljs-keyword">var</span> _type = <span class="hljs-keyword">type</span>.toLowerCase();
    <span class="hljs-keyword">switch</span> (_type) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'string'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o) === <span class="hljs-string">'[object String]'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'number'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o) === <span class="hljs-string">'[object Number]'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'boolean'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o) === <span class="hljs-string">'[object Boolean]'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'undefined'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o) === <span class="hljs-string">'[object Undefined]'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'null'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o) === <span class="hljs-string">'[object Null]'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'function'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o) === <span class="hljs-string">'[object Function]'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'array'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o) === <span class="hljs-string">'[object Array]'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'object'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o) === <span class="hljs-string">'[object Object]'</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'nan'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">isNaN</span>(o);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'elements'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).indexOf(<span class="hljs-string">'HTML'</span>)!==<span class="hljs-number">-1</span>
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o)
    }
}
</code></pre>
<h3 id="articleHeader29">5-3.手机类型判断</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//手机类型判断
//browserInfo('android')
//false（在浏览器iphone6模拟器的调试） 
browserInfo:function(type) {
    switch (type) {
        case 'android':
            return navigator.userAgent.toLowerCase().indexOf('android') !== -1
        case 'iphone':
            return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
        case 'ipad':
            return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
        case 'weixin':
            return navigator.userAgent.toLowerCase().indexOf('MicroMessenger') !== -1
        default:
            return navigator.userAgent.toLowerCase()
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
<span class="hljs-comment">//手机类型判断</span>
<span class="hljs-comment">//browserInfo('android')</span>
<span class="hljs-comment">//false（在浏览器iphone6模拟器的调试） </span>
browserInfo:function(type) {
    switch (type) {
        case <span class="hljs-string">'android'</span>:
            return navigator<span class="hljs-selector-class">.userAgent</span><span class="hljs-selector-class">.toLowerCase</span>().indexOf(<span class="hljs-string">'android'</span>) !== -<span class="hljs-number">1</span>
        case <span class="hljs-string">'iphone'</span>:
            return navigator<span class="hljs-selector-class">.userAgent</span><span class="hljs-selector-class">.toLowerCase</span>().indexOf(<span class="hljs-string">'iphone'</span>) !== -<span class="hljs-number">1</span>
        case <span class="hljs-string">'ipad'</span>:
            return navigator<span class="hljs-selector-class">.userAgent</span><span class="hljs-selector-class">.toLowerCase</span>().indexOf(<span class="hljs-string">'ipad'</span>) !== -<span class="hljs-number">1</span>
        case <span class="hljs-string">'weixin'</span>:
            return navigator<span class="hljs-selector-class">.userAgent</span><span class="hljs-selector-class">.toLowerCase</span>().indexOf(<span class="hljs-string">'MicroMessenger'</span>) !== -<span class="hljs-number">1</span>
        default:
            return navigator<span class="hljs-selector-class">.userAgent</span><span class="hljs-selector-class">.toLowerCase</span>()
    }
}
</code></pre>
<h2 id="articleHeader30">6.小结</h2>
<p>算上上一篇，js常用的小实例超过50个了，在我自己日常开发，常用的小实例基本都在里面了（操作太过于灵活的可能一时封装不了）。可能以后更多的更新并不是增加函数，而修改优化函数写法（特别是函数命名的问题，还有很多是需要改的，命名也是搞得我词穷了！），或者是用es6语法改写。当然，如果真的有值得封装的小实例，我也会继续更新，小改动就不会再发文章，只更新github，大改动就继续发文章。如果大家觉得我哪里还是可以优化的，或者哪里有问题，欢迎大家指点下建议。这样可以让大家相互学习，相互帮助！</p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编写自己的代码库（javascript常用实例的实现与封装--续）

## 原文链接
[https://segmentfault.com/a/1190000010527982](https://segmentfault.com/a/1190000010527982)

