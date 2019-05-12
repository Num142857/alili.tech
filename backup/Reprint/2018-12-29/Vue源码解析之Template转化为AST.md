---
title: 'Vue源码解析之Template转化为AST' 
date: 2018-12-29 2:30:10
hidden: true
slug: qhrx51krqa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>什么是AST</strong></h2>
<p>在Vue的mount过程中，template会被编译成AST语法树，AST是指抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式。</p>
<h2 id="articleHeader1"><strong>Virtual Dom</strong></h2>
<p>Vue的一个厉害之处就是利用Virtual DOM模拟DOM对象树来优化DOM操作的一种技术或思路。<br>Vue源码中虚拟DOM构建经历 template编译成AST语法树 -&gt; 再转换为render函数 最终返回一个VNode(VNode就是Vue的虚拟DOM节点) <br>本文通过对源码中AST转化部分进行简单提取，因为源码中转化过程还需要进行各种兼容判断，非常复杂，所以笔者对主要功能代码进行提取，用了300-400行代码完成对template转化为AST这个功能。下面用具体代码进行分析。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function parse(template) {
        var currentParent;    //当前父节点
        var root;            //最终返回出去的AST树根节点
        var stack = [];
        parseHTML(template, {
            start: function start(tag, attrs, unary) {
               ......
            },
            end: function end() {
              ......
            },
            chars: function chars(text) {
               ......
            }
        })
        return root
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parse</span><span class="hljs-params">(template)</span> </span>{
        <span class="hljs-keyword">var</span> currentParent;    <span class="hljs-comment">//当前父节点</span>
        <span class="hljs-keyword">var</span> root;            <span class="hljs-comment">//最终返回出去的AST树根节点</span>
        <span class="hljs-keyword">var</span> stack = [];
        parseHTML(template, {
            start: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span><span class="hljs-params">(tag, attrs, unary)</span> </span>{
               ......
            },
            end: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">end</span><span class="hljs-params">()</span> </span>{
              ......
            },
            chars: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">chars</span><span class="hljs-params">(text)</span> </span>{
               ......
            }
        })
        <span class="hljs-keyword">return</span> root
    }</code></pre>
<p>第一步就是调用parse这个方法，把template传进来，这里假设template为 <code>&lt;div id="app"&gt;&lt;span&gt;"{{"message"}}"&lt;/span&gt;&lt;/div&gt;</code></p>
<p>然后声明3个变量  <br>currentParent -&gt; 存放当前父元素，root -&gt; 最终返回出去的AST树根节点，stack -&gt; 一个栈用来辅助树的建立<br>接着调用parseHTML函数进行转化，传入template和options（包含3个方法 start,end,chars 等下用到这3个函数再进行解释）接下来先看parseHTML这个方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function parseHTML(html, options) {
        var stack = [];    //这里和上面的parse函数一样用到stack这个数组 不过这里的stack只是为了简单存放标签名 为了和结束标签进行匹配的作用
        var isUnaryTag$$1 = isUnaryTag;   //判断是否为自闭合标签
        var index = 0;
        var last;
        while (html) {
            //　　第一次进入while循环时，由于字符串以<开头，所以进入startTag条件，并进行AST转换，最后将对象弹入stack数组中
            last = html;
            var textEnd = html.indexOf('<');
            if (textEnd === 0) {     // 此时字符串是不是以<开头
                // End tag:
                var endTagMatch = html.match(endTag);
                if (endTagMatch) {
                    var curIndex = index;
                    advance(endTagMatch[0].length);
                    parseEndTag(endTagMatch[1], curIndex, index);
                    continue
                }

                // Start tag:    // 匹配起始标签
                var startTagMatch = parseStartTag();    //处理后得到match
                if (startTagMatch) {
                    handleStartTag(startTagMatch);
                    continue
                }
            }

            // 初始化为undefined 这样安全且字符数少一点
            var text = (void 0), rest = (void 0), next = (void 0);
            if (textEnd >= 0) {      // 截取<字符索引 => </div> 这里截取到闭合的<
                rest = html.slice(textEnd);  //截取闭合标签
                // 处理文本中的<字符
                // 获取中间的字符串 => "{{"message"}}"
                text = html.substring(0, textEnd); //截取到闭合标签前面部分
                advance(textEnd);               //切除闭合标签前面部分

            }
            // 当字符串没有<时
            if (textEnd < 0) {
                text = html;
                html = '';
            }
            // // 处理文本
            if (options.chars &amp;&amp; text) {
                options.chars(text);
            }
        }
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseHTML</span><span class="hljs-params">(html, options)</span> </span>{
        <span class="hljs-keyword">var</span> stack = [];    <span class="hljs-comment">//这里和上面的parse函数一样用到stack这个数组 不过这里的stack只是为了简单存放标签名 为了和结束标签进行匹配的作用</span>
        <span class="hljs-keyword">var</span> isUnaryTag$$<span class="hljs-number">1</span> = isUnaryTag;   <span class="hljs-comment">//判断是否为自闭合标签</span>
        <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">var</span> last;
        <span class="hljs-keyword">while</span> (html) {
            <span class="hljs-comment">//　　第一次进入while循环时，由于字符串以&lt;开头，所以进入startTag条件，并进行AST转换，最后将对象弹入stack数组中</span>
            last = html;
            <span class="hljs-keyword">var</span> textEnd = html.indexOf(<span class="hljs-string">'&lt;'</span>);
            <span class="hljs-keyword">if</span> (textEnd === <span class="hljs-number">0</span>) {     <span class="hljs-comment">// 此时字符串是不是以&lt;开头</span>
                <span class="hljs-comment">// End tag:</span>
                <span class="hljs-keyword">var</span> endTagMatch = html.match(endTag);
                <span class="hljs-keyword">if</span> (endTagMatch) {
                    <span class="hljs-keyword">var</span> curIndex = index;
                    advance(endTagMatch[<span class="hljs-number">0</span>].length);
                    parseEndTag(endTagMatch[<span class="hljs-number">1</span>], curIndex, index);
                    <span class="hljs-keyword">continue</span>
                }

                <span class="hljs-comment">// Start tag:    // 匹配起始标签</span>
                <span class="hljs-keyword">var</span> startTagMatch = parseStartTag();    <span class="hljs-comment">//处理后得到match</span>
                <span class="hljs-keyword">if</span> (startTagMatch) {
                    handleStartTag(startTagMatch);
                    <span class="hljs-keyword">continue</span>
                }
            }

            <span class="hljs-comment">// 初始化为undefined 这样安全且字符数少一点</span>
            <span class="hljs-keyword">var</span> text = (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>), rest = (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>), next = (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>);
            <span class="hljs-keyword">if</span> (textEnd &gt;= <span class="hljs-number">0</span>) {      <span class="hljs-comment">// 截取&lt;字符索引 =&gt; &lt;/div&gt; 这里截取到闭合的&lt;</span>
                rest = html.slice(textEnd);  <span class="hljs-comment">//截取闭合标签</span>
                <span class="hljs-comment">// 处理文本中的&lt;字符</span>
                <span class="hljs-comment">// 获取中间的字符串 =&gt; "{{"message"}}"</span>
                text = html.substring(<span class="hljs-number">0</span>, textEnd); <span class="hljs-comment">//截取到闭合标签前面部分</span>
                advance(textEnd);               <span class="hljs-comment">//切除闭合标签前面部分</span>

            }
            <span class="hljs-comment">// 当字符串没有&lt;时</span>
            <span class="hljs-keyword">if</span> (textEnd &lt; <span class="hljs-number">0</span>) {
                text = html;
                html = <span class="hljs-string">''</span>;
            }
            <span class="hljs-comment">// // 处理文本</span>
            <span class="hljs-keyword">if</span> (options.chars &amp;&amp; text) {
                options.chars(text);
            }
        }
   }</code></pre>
<p>函数进入while循环对html进行获取<code>&lt;</code>标签索引 <code>var textEnd = html.indexOf('&lt;');</code>如果textEnd === 0 说明当前是标签&lt;xxx&gt;或者&lt;/xxx&gt; 再用正则匹配是否当前是结束标签&lt;/xxx&gt;。<code>var endTagMatch = html.match(endTag);</code>  匹配不到那么就是开始标签，调用parseStartTag()函数解析。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function parseStartTag() {      //返回匹配对象
    var start = html.match(startTagOpen);         // 正则匹配
    if (start) {
        var match = {
            tagName: start[1],       // 标签名(div)
            attrs: [],               // 属性
            start: index             // 游标索引(初始为0)
        };
        advance(start[0].length);
        var end, attr;
        while (!(end = html.match(startTagClose)) &amp;&amp; (attr = html.match(attribute))) {  
            advance(attr[0].length);  
            match.attrs.push(attr);
        }
        if (end) {
            advance(end[0].length);      // 标记结束位置
            match.end = index;      //这里的index 是在 parseHTML就定义 在advance里面相加
            return match         // 返回匹配对象 起始位置 结束位置 tagName attrs
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code>function parseStartTag() {      <span class="hljs-comment">//返回匹配对象</span>
    <span class="hljs-keyword">var</span> start = html.<span class="hljs-keyword">match</span>(startTagOpen);         <span class="hljs-comment">// 正则匹配</span>
    <span class="hljs-keyword">if</span> (start) {
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">match</span> = {
            tagName: start[<span class="hljs-number">1</span>],       <span class="hljs-comment">// 标签名(div)</span>
            attrs: [],               <span class="hljs-comment">// 属性</span>
            start: index             <span class="hljs-comment">// 游标索引(初始为0)</span>
        };
        advance(start[<span class="hljs-number">0</span>].length);
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">end</span>, attr;
        <span class="hljs-keyword">while</span> (!(<span class="hljs-keyword">end</span> = html.<span class="hljs-keyword">match</span>(startTagClose)) &amp;&amp; (attr = html.<span class="hljs-keyword">match</span>(attribute))) {  
            advance(attr[<span class="hljs-number">0</span>].length);  
            <span class="hljs-keyword">match</span>.attrs.push(attr);
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">end</span>) {
            advance(<span class="hljs-keyword">end</span>[<span class="hljs-number">0</span>].length);      <span class="hljs-comment">// 标记结束位置</span>
            <span class="hljs-keyword">match</span>.<span class="hljs-keyword">end</span> = index;      <span class="hljs-comment">//这里的index 是在 parseHTML就定义 在advance里面相加</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">match</span>         <span class="hljs-comment">// 返回匹配对象 起始位置 结束位置 tagName attrs</span>
        }
    }
}
</code></pre>
<p>该函数主要是为了构建一个match对象，对象里面包含tagName(标签名)，attrs(标签的属性)，start(<code>&lt;</code>左开始标签在template中的位置)，end(<code>&gt;</code>右开始标签在template中的位置) 如template = <code>&lt;div id="app"&gt;&lt;div&gt;&lt;span&gt;"{{"message"}}"&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;</code> 程序第一次进入该函数 匹配的是div标签  所以tagName就是div<br>start：0 end:14 如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVWvOT?w=299&amp;h=252" src="https://static.alili.tech/img/bVWvOT?w=299&amp;h=252" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接着把match返回出去 作为调用handleStartTag的参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var startTagMatch = parseStartTag();    //处理后得到match
if (startTagMatch) {
    handleStartTag(startTagMatch);
    continue
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> startTagMatch = parseStartTag();    <span class="hljs-comment">//处理后得到match</span>
<span class="hljs-keyword">if</span> (startTagMatch) {
    handleStartTag(startTagMatch);
    <span class="hljs-keyword">continue</span>
}</code></pre>
<p>接下来看handleStartTag这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function handleStartTag(match) {
    var tagName = match.tagName;
    var unary = isUnaryTag$$1(tagName)  //判断是否为闭合标签 
    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
        var args = match.attrs[i];
        var value = args[3] || args[4] || args[5] || '';
        attrs[i] = {
            name: args[1],
            value: value
        };
    }
    if (!unary) {
        stack.push({tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs});
        lastTag = tagName;
    }
    if (options.start) {
        options.start(tagName, attrs, unary, match.start, match.end);
    }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code> function handleStartTag(match) {
    <span class="hljs-built_in">var</span> tagName = match.tagName;
    <span class="hljs-built_in">var</span> unary = isUnaryTag$$<span class="hljs-number">1</span>(tagName)  //判断是否为闭合标签 
    <span class="hljs-built_in">var</span> l = match.attrs.<span class="hljs-built_in">length</span>;
    <span class="hljs-built_in">var</span> attrs = <span class="hljs-built_in">new</span> Array(l);
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; l; i++) {
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">args</span> = match.attrs[i];
        <span class="hljs-built_in">var</span> value = <span class="hljs-built_in">args</span>[<span class="hljs-number">3</span>] || <span class="hljs-built_in">args</span>[<span class="hljs-number">4</span>] || <span class="hljs-built_in">args</span>[<span class="hljs-number">5</span>] || '';
        attrs[i] = {
            name: <span class="hljs-built_in">args</span>[<span class="hljs-number">1</span>],
            value: value
        };
    }
    <span class="hljs-keyword">if</span> (!unary) {
        stack.<span class="hljs-built_in">push</span>({tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs});
        lastTag = tagName;
    }
    <span class="hljs-keyword">if</span> (options.start) {
        options.start(tagName, attrs, unary, match.start, match.end);
    }
    }</code></pre>
<p>函数中分为3部分 第一部分是for循环是对attrs进行转化，我们从上一步的parseStartTag()得到的match对象中的attrs属性如图<br><span class="img-wrap"><img data-src="/img/bVWuQv?w=302&amp;h=253" src="https://static.alili.tech/img/bVWuQv?w=302&amp;h=253" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当时attrs是上面图这样子滴 我们通过这个循环把它转化为只带name 和 value这2个属性的对象 如图:<br><span class="img-wrap"><img data-src="/img/bVWuQZ?w=263&amp;h=245" src="https://static.alili.tech/img/bVWuQZ?w=263&amp;h=245" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接着判断如果不是自闭合标签，把标签名和属性推入栈中（注意 这里的stack这个变量在parseHTML中定义，作用是为了存放标签名 为了和结束标签进行匹配的作用。）接着调用最后一步 options.start 这里的options就是我们在parse函数中 调用parseHTML是传进来第二个参数的那个对象(包含start end chars 3个方法函数) 这里开始看options.start这个函数的作用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="start: function start(tag, attrs, unary) {
    var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
    };
    processAttrs(element);
    if (!root) {
        root = element;
    } 
    if(currentParent){
        currentParent.children.push(element);
        element.parent = currentParent;
    }
    if (!unary) {
        currentParent = element;
        stack.push(element);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>start: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span><span class="hljs-params">(tag, attrs, unary)</span> </span>{
    <span class="hljs-keyword">var</span> element = {
        type: <span class="hljs-number">1</span>,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        <span class="hljs-keyword">parent</span>: currentParent,
        children: []
    };
    processAttrs(element);
    <span class="hljs-keyword">if</span> (!root) {
        root = element;
    } 
    <span class="hljs-keyword">if</span>(currentParent){
        currentParent.children.push(element);
        element.<span class="hljs-keyword">parent</span> = currentParent;
    }
    <span class="hljs-keyword">if</span> (!unary) {
        currentParent = element;
        stack.push(element);
    }
}</code></pre>
<p>这个函数中 生成element对象 再连接元素的parent 和 children节点  最终push到栈中<br>此时栈中第一个元素生成 如图：<br><span class="img-wrap"><img data-src="/img/bVWuVO?w=304&amp;h=248" src="https://static.alili.tech/img/bVWuVO?w=304&amp;h=248" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>完成了while循环的第一次执行，进入第二次循环执行，这个时候html变成<code>&lt;span&gt;"{{"message"}}"&lt;/span&gt;&lt;/div&gt;</code> 接着截取到&lt;span&gt; 处理过程和第一次一致 经过这次循环stack中元素如图：<br><span class="img-wrap"><img data-src="/img/bVWu1n?w=296&amp;h=250" src="https://static.alili.tech/img/bVWu1n?w=296&amp;h=250" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVWu1r?w=297&amp;h=213" src="https://static.alili.tech/img/bVWu1r?w=297&amp;h=213" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接着继续执行第三个循环 这个时候是处理文本节点了 "{{"message"}}"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 初始化为undefined 这样安全且字符数少一点
var text = (void 0), rest = (void 0), next = (void 0);
if (textEnd >= 0) {      // 截取<字符索引 => </div> 这里截取到闭合的<
    rest = html.slice(textEnd);  //截取闭合标签
    // 处理文本中的<字符
    // 获取中间的字符串 => "{{"message"}}"
    text = html.substring(0, textEnd); //截取到闭合标签前面部分
    advance(textEnd);               //切除闭合标签前面部分
}
// 当字符串没有<时
if (textEnd < 0) {
    text = html;
    html = '';
}
// 另外一个函数
if (options.chars &amp;&amp; text) {
    options.chars(text);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 初始化为undefined 这样安全且字符数少一点</span>
var <span class="hljs-built_in">text</span> = (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>), rest = (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>), next = (<span class="hljs-keyword">void</span> <span class="hljs-number">0</span>);
<span class="hljs-built_in">if</span> (textEnd &gt;= <span class="hljs-number">0</span>) {      <span class="hljs-comment">// 截取&lt;字符索引 =&gt; &lt;/div&gt; 这里截取到闭合的&lt;</span>
    rest = html.slice(textEnd);  <span class="hljs-comment">//截取闭合标签</span>
    <span class="hljs-comment">// 处理文本中的&lt;字符</span>
    <span class="hljs-comment">// 获取中间的字符串 =&gt; "{{"message"}}"</span>
    <span class="hljs-built_in">text</span> = html.substring(<span class="hljs-number">0</span>, textEnd); <span class="hljs-comment">//截取到闭合标签前面部分</span>
    advance(textEnd);               <span class="hljs-comment">//切除闭合标签前面部分</span>
}
<span class="hljs-comment">// 当字符串没有&lt;时</span>
<span class="hljs-built_in">if</span> (textEnd &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">text</span> = html;
    html = <span class="hljs-string">''</span>;
}
<span class="hljs-comment">// 另外一个函数</span>
<span class="hljs-built_in">if</span> (options.chars &amp;&amp; <span class="hljs-built_in">text</span>) {
    options.chars(<span class="hljs-built_in">text</span>);
}</code></pre>
<p>这里的作用就是把文本提取出来 调用options.chars这个函数 接下来看options.chars</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chars: function chars(text) {
    if (!currentParent) {   //如果没有父元素 只是文本
        return
    }

    var children = currentParent.children;  //取出children
    // text => "{{"message"}}"
    if (text) {
        var expression;
        if (text !== ' ' &amp;&amp; (expression = parseText(text))) {
            // 将解析后的text存进children数组
            children.push({
                type: 2,
                expression: expression,
                text: text
            });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
            children.push({
                type: 3,
                text: text
            });
        }
    }
}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code>chars: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">chars</span><span class="hljs-params">(text)</span> {</span>
    <span class="hljs-keyword">if</span> (!currentParent) {   <span class="hljs-comment">//如果没有父元素 只是文本</span>
        return
    }

    var <span class="hljs-built_in">children</span> = currentParent.<span class="hljs-built_in">children</span>;  <span class="hljs-comment">//取出children</span>
    <span class="hljs-comment">// text =&gt; "{{"message"}}"</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">text</span>) {
        var expression;
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">text</span> !== ' ' &amp;&amp; (expression = parseText(<span class="hljs-built_in">text</span>))) {
            <span class="hljs-comment">// 将解析后的text存进children数组</span>
            <span class="hljs-built_in">children</span>.push({
                type: <span class="hljs-number">2</span>,
                expression: expression,
                <span class="hljs-built_in">text</span>: <span class="hljs-built_in">text</span>
            });
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">text</span> !== ' ' || !<span class="hljs-built_in">children</span>.length || <span class="hljs-built_in">children</span>[<span class="hljs-built_in">children</span>.length - <span class="hljs-number">1</span>].<span class="hljs-built_in">text</span> !== ' ') {
            <span class="hljs-built_in">children</span>.push({
                type: <span class="hljs-number">3</span>,
                <span class="hljs-built_in">text</span>: <span class="hljs-built_in">text</span>
            });
        }
    }
}
})</code></pre>
<p>这里的主要功能是判断文本是"{{"xxx"}}"还是简单的文本xxx,如果是简单的文本 push进父元素的children里面，type设置为3，如果是字符模板"{{"xxx"}}"，调用parseText转化。如这里的<code>"{{"message"}}"</code>转化为 <code>_s(message)</code>(加上_s是为了AST的下一步转为render函数，本文中暂时不会用到。) 再把转化后的内容push进children。</p>
<p><span class="img-wrap"><img data-src="/img/bVWu8O?w=297&amp;h=245" src="https://static.alili.tech/img/bVWu8O?w=297&amp;h=245" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>又走完一个循环了，这个时候html = <code>&lt;/span&gt;&lt;/div&gt;</code> 剩下2个结束标签进行匹配了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var endTagMatch = html.match(endTag);
    if (endTagMatch) {
        var curIndex = index;
        advance(endTagMatch[0].length);
        parseEndTag(endTagMatch[1], curIndex, index);
        continue
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>  var endTagMatch = html.match(endTag);
    <span class="hljs-keyword">if</span> (endTagMatch) {
        var curIndex = <span class="hljs-built_in">index</span>;
        <span class="hljs-keyword">advance</span>(endTagMatch[<span class="hljs-number">0</span>].length);
        parseEndTag(endTagMatch[<span class="hljs-number">1</span>], curIndex, <span class="hljs-built_in">index</span>);
        <span class="hljs-keyword">continue</span>
    }</code></pre>
<p>接下来看parseEndTag这个函数 传进来了标签名 开始索引和结束索引</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function parseEndTag(tagName, start, end) {
    var pos, lowerCasedTagName;
    if (tagName) {
        lowerCasedTagName = tagName.toLowerCase();
    }
    // Find the closest opened tag of the same type
    if (tagName) { // 获取最近的匹配标签
        for (pos = stack.length - 1; pos >= 0; pos--) {
            // 提示没有匹配的标签
            if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                break
            }
        }
    } else {
        // If no tag name is provided, clean shop
        pos = 0;
    }
    
    if (pos >= 0) {
        // Close all the open elements, up the stack
        for (var i = stack.length - 1; i >= pos; i--) {
            if (options.end) {
                options.end(stack[i].tag, start, end);
            }
        }
    
        // Remove the open elements from the stack
        stack.length = pos;
        lastTag = pos &amp;&amp; stack[pos - 1].tag;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code>  function parseEndTag(tagName, start, <span class="hljs-keyword">end</span>) {
    var <span class="hljs-keyword">pos</span>, lowerCasedTagName<span class="hljs-comment">;</span>
    <span class="hljs-keyword">if</span> (tagName) {
        lowerCasedTagName = tagName.toLowerCase()<span class="hljs-comment">;</span>
    }
    <span class="hljs-comment">// Find the closest opened tag of the same type</span>
    <span class="hljs-keyword">if</span> (tagName) { <span class="hljs-comment">// 获取最近的匹配标签</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">pos</span> = stack.length - <span class="hljs-number">1</span><span class="hljs-comment">; pos &gt;= 0; pos--) {</span>
            <span class="hljs-comment">// 提示没有匹配的标签</span>
            <span class="hljs-keyword">if</span> (stack[<span class="hljs-keyword">pos</span>].lowerCasedTag === lowerCasedTagName) {
                <span class="hljs-keyword">break</span>
            }
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// If no tag name is provided, clean shop</span>
        <span class="hljs-keyword">pos</span> = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
    }
    
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">pos</span> &gt;= <span class="hljs-number">0</span>) {
        <span class="hljs-comment">// Close all the open elements, up the stack</span>
        <span class="hljs-keyword">for</span> (var i = stack.length - <span class="hljs-number">1</span><span class="hljs-comment">; i &gt;= pos; i--) {</span>
            <span class="hljs-keyword">if</span> (options.end) {
                options.end(stack[i].tag, start, <span class="hljs-keyword">end</span>)<span class="hljs-comment">;</span>
            }
        }
    
        <span class="hljs-comment">// Remove the open elements from the stack</span>
        stack.length = <span class="hljs-keyword">pos</span><span class="hljs-comment">;</span>
        lastTag = <span class="hljs-keyword">pos</span> &amp;&amp; stack[<span class="hljs-keyword">pos</span> - <span class="hljs-number">1</span>].tag<span class="hljs-comment">;</span>
}</code></pre>
<p>这里首先找到栈中对应的开始标签的索引pos，再从该索引开始到栈顶的所以元素调用options.end这个函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" end: function end() {
    // pop stack
    stack.length -= 1;
    currentParent = stack[stack.length - 1];
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code> <span class="hljs-keyword">end</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">end</span><span class="hljs-params">()</span> {</span>
    <span class="hljs-comment">// pop stack</span>
    stack.<span class="hljs-built_in">length</span> -= <span class="hljs-number">1</span>;
    currentParent = stack[stack.length - <span class="hljs-number">1</span>];
},</code></pre>
<p>把栈顶元素出栈，因为这个元素已经匹配到结束标签了，再把当前父元素更改。终于走完了，把html的内容循环完，最终return root 这个root就是我们所要得到的AST<br><span class="img-wrap"><img data-src="/img/bVWvuX?w=302&amp;h=248" src="https://static.alili.tech/img/bVWvuX?w=302&amp;h=248" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这只是Vue的冰山一角，文中有什么不对的地方请大家帮忙指正，本人最近也一直在学习Vue的源码，希望能够拿出来与大家一起分享经验，接下来会继续更新后续的源码，如果觉得有帮忙请给个Star哈<br>github地址为:<a href="https://github.com/zwStar/vue-ast" rel="nofollow noreferrer" target="_blank">https://github.com/zwStar/vue...</a> 欢迎各位star或issues</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue源码解析之Template转化为AST

## 原文链接
[https://segmentfault.com/a/1190000011531094](https://segmentfault.com/a/1190000011531094)

