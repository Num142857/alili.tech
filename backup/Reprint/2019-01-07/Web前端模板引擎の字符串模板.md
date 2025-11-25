---
title: 'Web前端模板引擎の字符串模板' 
date: 2019-01-07 2:30:11
hidden: true
slug: khhn8tohzvo
categories: [reprint]
---

{{< raw >}}

                    
<p>这是一个系列文章，将会介绍目前Web前端领域里用到的三种模板引擎技术，它们分别是：</p>
<ul>
<li><p>基于字符串的模板</p></li>
<li><p>基于Dom操作的模板</p></li>
<li><p>基于虚拟Dom的模板</p></li>
</ul>
<p>本文是这个系列的第一篇，着重介绍基于字符串的模板引擎的实现原理，分析它的优点缺点以及使用的场景。</p>
<p>进入正文之前，我们先回顾一下在模板引擎出现之前，暂且称之为“石器时代”，我们是如何利用JS改变页面结构的。对于下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;container&quot;>
    我们正处于刀耕火种的石器时代
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
    我们正处于刀耕火种的石器时代
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>如果我们需要修改container里面的内容，一般有2种方法：</p>
<ul><li><p>通过JS的<code>DOM API</code>直接操作DOM</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var newTxt = '石器时代需要自己撸工具，摩擦摩擦，似魔鬼的步伐...';
    var container = document.getElementById('container');
    var desc = document.createElement('H1');
    var txt = document.createTextNode(newTxt);
    desc.appendChild(txt);
    container.replaceChild(desc, container.childNodes[0]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> newTxt = <span class="hljs-string">'石器时代需要自己撸工具，摩擦摩擦，似魔鬼的步伐...'</span>;
    <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>);
    <span class="hljs-keyword">var</span> desc = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'H1'</span>);
    <span class="hljs-keyword">var</span> txt = <span class="hljs-built_in">document</span>.createTextNode(newTxt);
    desc.appendChild(txt);
    container.replaceChild(desc, container.childNodes[<span class="hljs-number">0</span>]);</code></pre>
<ul><li><p>通过<code>innerHTML</code>批量修改DOM结构</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var newTxt = '石器时代需要自己撸工具，摩擦摩擦，似魔鬼的步伐...';
    var template = '<H1>' + newTxt + '</H1>';
    var container = document.getElementById('container');
    container.innerHTML=template;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> newTxt = <span class="hljs-string">'石器时代需要自己撸工具，摩擦摩擦，似魔鬼的步伐...'</span>;
    <span class="hljs-keyword">var</span> template = <span class="hljs-string">'&lt;H1&gt;'</span> + newTxt + <span class="hljs-string">'&lt;/H1&gt;'</span>;
    <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>);
    container.innerHTML=template;</code></pre>
<p>相比之下，第二种方式通过innerHTML更新DOM要简单许多，它无需考虑DOM的层级结构，只要做简单的字符串拼接就能实现需求。但这种方式的问题是代码可读性很差，同时开发者还必须保证最终拼接的字符串的正确性。当需要作出修改时，面对一坨的字符也很痛苦。</p>
<p>在上面的例子中，我们的需求是将一个变量注入到模板当中，类似ES6的模板字符串：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newTxt = '石器时代需要自己撸工具，摩擦摩擦，似魔鬼的步伐...';
var template = `<H1>${newTxt}</H1>`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> newTxt = <span class="hljs-string">'石器时代需要自己撸工具，摩擦摩擦，似魔鬼的步伐...'</span>;
<span class="hljs-keyword">var</span> template = <span class="hljs-string">`&lt;H1&gt;<span class="hljs-subst">${newTxt}</span>&lt;/H1&gt;`</span>;</code></pre>
<p>但ES6这种现代化的常规武器，对石器时代而言是天方夜谭。部落里的老司机凭借深厚的JS功底，撸出了各种基于字符串的模板。这些模板又可以细分为2类：一种是不包含逻辑处理，只作数据绑定用的，如<a href="https://github.com/janl/mustache.js" rel="nofollow noreferrer" target="_blank">mustache.js</a>；另一种是既有逻辑处理，也有数据绑定的，如<a href="http://www.embeddedjs.com/" rel="nofollow noreferrer" target="_blank">EJS</a>。</p>
<p>下面，我以EJS的语法为例，实现一个简单的字符串模板引擎。模版引擎的编译流程如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010313800" src="https://static.alili.tech/img/remote/1460000010313800" alt="字符串模板编译过程" title="字符串模板编译过程" style="cursor: pointer; display: inline;"></span></p>
<p>1.首先，需要编译模板字符串，将其转换为JS能够理解的语法。第一步是利用正则表达式，区分出字符串中哪些是模板语法，哪些是正常的HTML标签。以下是一个EJS语法的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <% for(var i=0; i<supplies.length; i++) {%>
        <li><%= supplies[i] %></li>
    <% } %>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">for</span>(<span class="hljs-attr">var</span> <span class="hljs-attr">i</span>=<span class="hljs-string">0;</span> <span class="hljs-attr">i</span>&lt;<span class="hljs-attr">supplies.length</span>; <span class="hljs-attr">i</span>++) {%&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">supplies</span>[<span class="hljs-attr">i</span>] %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>在‘&lt;%=’和‘%&gt;’之间是JS的表达式，而在‘&lt;%’和’%&gt;‘之间是普通的JS语句，可以进行逻辑判断和条件循环等操作。可以使用以下正则表达式抽取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 匹配表达式，只能有一行
let evalExpr = /\<\%\=(.+?)\%\>/g;

// 匹配语句，可以有多行
let expr = /\<\%([\s\S]+?)\%\>/g;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 匹配表达式，只能有一行</span>
<span class="hljs-keyword">let</span> evalExpr = <span class="hljs-regexp">/\&lt;\%\=(.+?)\%\&gt;/g</span>;

<span class="hljs-comment">// 匹配语句，可以有多行</span>
<span class="hljs-keyword">let</span> expr = <span class="hljs-regexp">/\&lt;\%([\s\S]+?)\%\&gt;/g</span>;</code></pre>
<p>对于普通的HTML标签，需要用自定义的echo函数包裹一下，在使用eval函数编译的时候直接输出字符串。echo函数的定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 临时变量，保存编译后的模板字符串
let output = &quot;&quot;;
  
// 直接将html字符串拼接到output后面
function echo(html){
    output += html;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 临时变量，保存编译后的模板字符串</span>
<span class="hljs-keyword">let</span> output = <span class="hljs-string">""</span>;
  
<span class="hljs-comment">// 直接将html字符串拼接到output后面</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">echo</span>(<span class="hljs-params">html</span>)</span>{
    output += html;
}</code></pre>
<p>完整的compile函数代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compile(template){
  
    // 匹配表达式，只能有一行
    let evalExpr = /\<\%\=(.+?)\%\>/g;
  
    // 匹配语句，可以有多行
    let expr = /\<\%([\s\S]+?)\%\>/g;
  
    // 内容为空的部分
    let empty = /echo\(\&quot;\&quot;\);/g;
  
    template = template
        // 转换JS表达式
        .replace(evalExpr, '`); \n echo( $1 ); \n echo(`')
    
        // 转换JS语句
        .replace(expr, '`); \n $1 \n echo(`');
  
    // 在模板的最外层包裹一个echo
    template = 'echo(`' + template + '`);';
  
    // 清除空的echo
    template = template
        .replace(empty, &quot;&quot;);
  
    // 保存编译后的字符串，此处用了ES6的模板字符串特性，相当于eval了一下
    let script = 
        `(function parse(data){
  
            // 临时变量，保存编译后的模板字符串
            var output = &quot;&quot;;
  
            // 直接将html字符串拼接到output后面
            function echo(html){
                output += html;
            }
  
            // 包含echo的模板字符串
            ${ template }
  
            return output;
        })`;
    
    return script;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compile</span>(<span class="hljs-params">template</span>)</span>{
  
    <span class="hljs-comment">// 匹配表达式，只能有一行</span>
    <span class="hljs-keyword">let</span> evalExpr = <span class="hljs-regexp">/\&lt;\%\=(.+?)\%\&gt;/g</span>;
  
    <span class="hljs-comment">// 匹配语句，可以有多行</span>
    <span class="hljs-keyword">let</span> expr = <span class="hljs-regexp">/\&lt;\%([\s\S]+?)\%\&gt;/g</span>;
  
    <span class="hljs-comment">// 内容为空的部分</span>
    <span class="hljs-keyword">let</span> empty = <span class="hljs-regexp">/echo\(\"\"\);/g</span>;
  
    template = template
        <span class="hljs-comment">// 转换JS表达式</span>
        .replace(evalExpr, <span class="hljs-string">'`); \n echo( $1 ); \n echo(`'</span>)
    
        <span class="hljs-comment">// 转换JS语句</span>
        .replace(expr, <span class="hljs-string">'`); \n $1 \n echo(`'</span>);
  
    <span class="hljs-comment">// 在模板的最外层包裹一个echo</span>
    template = <span class="hljs-string">'echo(`'</span> + template + <span class="hljs-string">'`);'</span>;
  
    <span class="hljs-comment">// 清除空的echo</span>
    template = template
        .replace(empty, <span class="hljs-string">""</span>);
  
    <span class="hljs-comment">// 保存编译后的字符串，此处用了ES6的模板字符串特性，相当于eval了一下</span>
    <span class="hljs-keyword">let</span> script = 
        <span class="hljs-string">`(function parse(data){
  
            // 临时变量，保存编译后的模板字符串
            var output = "";
  
            // 直接将html字符串拼接到output后面
            function echo(html){
                output += html;
            }
  
            // 包含echo的模板字符串
            <span class="hljs-subst">${ template }</span>
  
            return output;
        })`</span>;
    
    <span class="hljs-keyword">return</span> script;
}</code></pre>
<p>经过正则表达式处理后，这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <% for(var i=0; i<supplies.length; i++) {%>
        <li><%= supplies[i] %></li>
    <% } %>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ul&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">for</span>(<span class="hljs-attr">var</span> <span class="hljs-attr">i</span>=<span class="hljs-string">0;</span> <span class="hljs-attr">i</span>&lt;<span class="hljs-attr">supplies.length</span>; <span class="hljs-attr">i</span>++) {%&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">supplies</span>[<span class="hljs-attr">i</span>] %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>会转化为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    echo(`<ul>`); 
        for(var i=0; i<data.supplies.length; i++) { 
            echo(`<li>`); 
                echo( data.supplies[i] ); 
            echo(`</li>`); 
        }  
    echo(`</ul>`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    echo(<span class="hljs-string">`&lt;ul&gt;`</span>); 
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;data.supplies.length; i++) { 
            echo(<span class="hljs-string">`&lt;li&gt;`</span>); 
                echo( data.supplies[i] ); 
            echo(<span class="hljs-string">`&lt;/li&gt;`</span>); 
        }  
    echo(<span class="hljs-string">`&lt;/ul&gt;`</span>);</code></pre>
<p>完整代码亦可见<a href="https://jsfiddle.net/38c0tmr5/" rel="nofollow noreferrer" target="_blank">JSFiddle</a><button class="btn btn-xs btn-default ml10 preview" data-url="38c0tmr5/" data-typeid="0">点击预览</button></p>
<p>2.第二步，我们将模板中用到的数据<code>data</code>注入到compile函数的parse子函数中，生成最终的字符串。</p>
<p>3.最后，我们再通过innerHTML，把字符串插入到DOM合适的位置。</p>
<p>字符串模板之所以能够更新页面，最核心的原理是使用innerHTML这个api将字符串直接插入到DOM节点中。因此，我们分析字符串模板的优缺点就离不开使用innerHTML更新DOM的优缺点。先谈谈优点：</p>
<ol>
<li><p>直观，容易理解。更新后的DOM结构可以一目了然的反映在字符串当中。</p></li>
<li><p>容易维护。当需要更改模板时，直接改相应字符串就可以，新人也容易上手。</p></li>
<li><p>可用于服务端渲染。简单的字符串拼接，不依赖DOM，对应的字符串可由服务器端直接生成。</p></li>
</ol>
<p>再来谈谈缺点：</p>
<ol>
<li><p>安全隐患。模板字符串中完全可以出现此类代码：&lt;img src="69" onerror="alert('xss')"&gt;</p></li>
<li><p>慢！特别对于需要频繁更新的场景。由于innerHTML是直接替换掉原有元素，因此就涉及到相应节点和对应事件的卸载，然后再装载新的节点和事件。在这个过程中，界面也会被重排和重绘，对性能是严重的损耗。</p></li>
<li><p>不智能。当只需要修改模板里面的某一部分数据时，整个模板页都需要被刷新。</p></li>
<li><p>维护困难。这不是打脸嘛，上面才说了容易维护，这里又讲维护困难！？这当然是有原因的嘛。当不需要考虑性能的时候，一个页面可能只需要维护一个模板，这难道不简单？但考虑到性能的时候，就需要对模板进行拆分和拼装，维护这些相互依赖的模板会让人很崩溃。</p></li>
</ol>
<p>综上所述，我们可以很简单的总结出字符串模板引擎的使用场景：如果你的应用比较简单，交互也不多，也希望有一个快速的首屏时间，请使用字符串模板引擎。反之，你硬要上字符串模板引擎的话，我建议你先看看我下一期或者下下一期的文章再做决定，哈哈哈哈～</p>
<p>未完待续...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web前端模板引擎の字符串模板

## 原文链接
[https://segmentfault.com/a/1190000010313795](https://segmentfault.com/a/1190000010313795)

