---
title: '立即执行函数表达式(IIFE)' 
date: 2019-01-31 2:31:16
hidden: true
slug: 7hokq0n33gs
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文：<a href="http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/#question-about-surrounding-parentheses" rel="nofollow noreferrer" target="_blank">Immediately-Invoked Function Expression (IIFE)</a> <strong>by</strong> Ben Alman<br>原译：<a href="http://segmentfault.com/a/1190000003985390">立即执行函数</a> <strong>by</strong> Murphywuwu<br>改增内容： <strong>by</strong> blanu</p></blockquote>
<p>也许你没有注意到，我是一个对于专业术语有一点强迫症的人。所以，当我多次听到流行却易产生误解的术语「自执行匿名函数」，我最终决定将我的想法写进这篇文章里。</p>
<p>更进一步地说，除了提供关于该模式究竟是如何工作的全面信息，事实上我还建议了我们应该怎样称呼这种模式。另外，如果你想跳过这里，你可以直接跳到<strong><a>立即调用函数表达式</a></strong>进行阅读，但是我建议你读完整篇文章。</p>
<p>请理解这篇文章不是想说「我对了，你错了」。我发自真心地想帮助人们理解看似复杂的概念，并且我认为使用前后一致的精确术语是有助于人们理解的最简单的方式之一。</p>
<h2 id="articleHeader0">它是什么</h2>
<p>在JavaScript里，每个函数，当被调用时，都会创建一个新的执行上下文。因为在函数里定义的变量和函数只能在函数内部被访问，外部无法获取；当调用函数时，函数提供的上下文就提供了一个非常简单的方法创建私有变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//因为这个函数的返回值是另一个能访问私有变量i的函数，因此返回的函数实际上被提权(privileged)了
function makeCounter() {
    //i只能从`makeConuter`内部访问
    var i = 0;
    return function(){
        console.log(++i);
    };   
}
//记住：`counter`和`counter2`都有他们自己作用域中的变量 `i`
var counter = makeCounter();
counter();//1
counter();//2

var counter2 = makeCounter();
counter2();//1
counter2();//2

i;//ReferenceError: i is not defined(它只存在于makeCounter里)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//因为这个函数的返回值是另一个能访问私有变量i的函数，因此返回的函数实际上被提权(privileged)了</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeCounter</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//i只能从`makeConuter`内部访问</span>
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(++i);
    };   
}
<span class="hljs-comment">//记住：`counter`和`counter2`都有他们自己作用域中的变量 `i`</span>
<span class="hljs-keyword">var</span> counter = makeCounter();
counter();<span class="hljs-comment">//1</span>
counter();<span class="hljs-comment">//2</span>

<span class="hljs-keyword">var</span> counter2 = makeCounter();
counter2();<span class="hljs-comment">//1</span>
counter2();<span class="hljs-comment">//2</span>

i;<span class="hljs-comment">//ReferenceError: i is not defined(它只存在于makeCounter里)</span></code></pre>
<p>在许多情况下，你可能并不需要<code>makeWhatever</code>这样的函数返回多次累加值，并且可以只调用一次得到一个单一的值，在其他一些情况里，你甚至不需要明确的知道返回值。</p>
<h2 id="articleHeader1">它的核心</h2>
<p>现在，无论你定义一个函数像这样<code>function foo(){}</code>或者<code>var foo = function(){}</code>，调用时，你都需要在后面加上一对圆括号，像这样<code>foo()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//向下面这样定义的函数可以通过在函数名后加一对括号进行调用，像这样`foo()`，因为foo相对于函数表达式`function(){/* code */}`只是一个引用变量

var foo = function(){/* code */}
//那这可以说明函数表达式可以通过在其后加上一对括号自己调用自己吗？
function(){ /* code */}();//SyntaxError: Unexpected token (" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//向下面这样定义的函数可以通过在函数名后加一对括号进行调用，像这样`foo()`，因为foo相对于函数表达式`function(){/* code */}`只是一个引用变量</span>

<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>}
<span class="hljs-comment">//那这可以说明函数表达式可以通过在其后加上一对括号自己调用自己吗？</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/* code */</span>}();<span class="hljs-comment">//SyntaxError: Unexpected token (</span></code></pre>
<p>正如你所看到的，这里捕获了一个错误。当圆括号为了调用函数出现在函数后面时，无论在全局环境或者局部环境里遇到了这样的<code>function</code>关键字，默认的，它会将它当作是一个函数声明，而不是函数表达式，如果你不明确的告诉圆括号它是一个表达式，它会将其当作没有名字的函数声明并且抛出一个错误，因为函数声明需要一个名字。<br><strong>问题1：</strong>这里我么可以思考一个问题，我们是不是也可以像这样直接调用函数<code>var foo = function(){console.log(1)}()</code>，答案是可以的。<br><strong>问题2：</strong>同样的，我们还可以思考一个问题，像这样的函数声明在后面加上圆括号被直接调用，又会出现什么情况呢？请看下面的解答。</p>
<h2 id="articleHeader2">题外话：函数、圆括号和错误</h2>
<p>有趣的是，如果你为一个函数指定一个名字并在它后面放一对圆括号，同样的也会抛出错误，但这次是因为另外一个原因。当圆括号放在一个函数表达式后面指明了这是一个被调用的函数，而圆括号放在一个声明后面便意味着完全的和前面的函数声明分开了，此时圆括号只是一个简单的代表一个括号(用来控制运算优先的括号)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//然而函数声明语法上是无效的，它仍然是一个声明，紧跟着的圆括号是无效的，因为圆括号里需要包含表达式
function foo(){ /* code */ }();//SyntaxError: Unexpected token
//现在，你把一个表达式放在圆括号里，没有抛出错误...但是函数也并没有执行，因为：
function foo(){/* code */}(1)
//它等同于如下，一个函数声明跟着一个完全没有关系的表达式:
function foo(){/* code */}
(1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//然而函数声明语法上是无效的，它仍然是一个声明，紧跟着的圆括号是无效的，因为圆括号里需要包含表达式</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/* code */</span> }();<span class="hljs-comment">//SyntaxError: Unexpected token</span>
<span class="hljs-comment">//现在，你把一个表达式放在圆括号里，没有抛出错误...但是函数也并没有执行，因为：</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>}(<span class="hljs-number">1</span>)
<span class="hljs-comment">//它等同于如下，一个函数声明跟着一个完全没有关系的表达式:</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>}
(<span class="hljs-number">1</span>);</code></pre>
<blockquote><p>关于这个细节，你可以阅读Dmitry A. Soshnikov的文章：<em><a href="http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/#question-about-surrounding-parentheses" rel="nofollow noreferrer" target="_blank">ECMA-262-3 in detail. Chapter 5. Functions</a> </em>（<a href="http://goddyzhao.tumblr.com/post/11273713920/functions" rel="nofollow noreferrer" target="_blank">中文版本</a>）</p></blockquote>
<h2 id="articleHeader3">
<a></a>立即执行函数表达式(IIFE)</h2>
<p>幸运的是，修正语法错误很简单。最流行的也最被接受的方法是将函数声明包裹在圆括号里来告诉语法分析器去表达一个函数表达式，因为在JavaScript里，圆括号不能<strong>包含</strong>声明。因为这点，当圆括号为了包裹函数碰上了 <code>function</code>关键词，它便知道将它作为一个函数表达式去解析而不是函数声明。<strong>注意理解</strong>这里的圆括号和上面的圆括号遇到函数时的表现是不一样的，也就是说。</p>
<ul>
<li><p>当圆括号出现在匿名函数的末尾想要调用函数时，它会默认将函数当成是函数声明。</p></li>
<li><p>当圆括号包裹函数时，它会默认将函数作为表达式去解析，而不是函数声明。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这两种模式都可以被用来立即调用一个函数表达式，利用函数的执行来创造私有变量
(function(){/* code */}());//Crockford recommends this one
(function(){/* code */})();//But this one works just as well

// 因为括号的作用就是为了消除函数表达式和函数声明之间的差异
// 如果解释器能预料到这是一个表达式，括号可以被省略
// 不过请参见下面的「重要笔记」
var i = function(){return 10;}();
true &amp;&amp; function(){/*code*/}();
0,function(){}();

//如果你并不关心返回值，或者让你的代码尽可能的易读，你可以通过在你的函数前面带上一个一元操作符来存储字节
!function(){/* code */}();
~function(){/* code */}();
-function(){/* code */}();
+function(){/* code */}();

// 这里是另外一种方法
// 我（原文作者）不清楚new方法是否会影响性能
// 但它却是奏效，参见http://twitter.com/kuvos/status/18209252090847232

new function(){ /* code */ }
new function(){ /* code */ }() // 只有当传入参数时才需要加括号" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//这两种模式都可以被用来立即调用一个函数表达式，利用函数的执行来创造私有变量</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>}());<span class="hljs-comment">//Crockford recommends this one</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>})();<span class="hljs-comment">//But this one works just as well</span>

<span class="hljs-comment">// 因为括号的作用就是为了消除函数表达式和函数声明之间的差异</span>
<span class="hljs-comment">// 如果解释器能预料到这是一个表达式，括号可以被省略</span>
<span class="hljs-comment">// 不过请参见下面的「重要笔记」</span>
<span class="hljs-keyword">var</span> i = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;}();
<span class="hljs-literal">true</span> &amp;&amp; <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/*code*/</span>}();
<span class="hljs-number">0</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}();

<span class="hljs-comment">//如果你并不关心返回值，或者让你的代码尽可能的易读，你可以通过在你的函数前面带上一个一元操作符来存储字节</span>
!<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>}();
~<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>}();
-<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>}();
+<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">/* code */</span>}();

<span class="hljs-comment">// 这里是另外一种方法</span>
<span class="hljs-comment">// 我（原文作者）不清楚new方法是否会影响性能</span>
<span class="hljs-comment">// 但它却是奏效，参见http://twitter.com/kuvos/status/18209252090847232</span>

<span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/* code */</span> }
<span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">/* code */</span> }() <span class="hljs-comment">// 只有当传入参数时才需要加括号</span></code></pre>
<h2 id="articleHeader4">关于括号的重要笔记</h2>
<p>在一些情况下，当额外的带着歧义的括号围绕在函数表达式周围是没有必要的（因为这时候的括号已经将其作为一个表达式去表达），但当括号用于调用函数表达式时，这仍然是一个好主意。</p>
<p>这样的括号指明函数表达式将会被立即调用，并且变量将会储存函数的结果，而不是函数本身。当这是一个非常长的函数表达式时，这可以节约其他人阅读你代码的时间，不用滚到页面底部去看这个函数是否被调用。</p>
<p>作为规则，当你书写清楚明晰的代码时，有必要阻止JavaScript抛出错误的，同样也有必要阻止其他开发者对你抛出错误<code>WTFError</code>!</p>
<h2 id="articleHeader5">保存闭包的状态</h2>
<p>就像当函数通过他们的名字被调用时，参数会被传递，而当函数表达式被立即调用时，参数也会被传递。一个立即调用的函数表达式可以用来锁定值并且有效的保存此时的状态，因为任何定义在一个函数内的函数都可以使用外面函数传递进来的参数和变量（这种关系被叫做闭包）。</p>
<blockquote><p>关于闭包的更多信息，参见 <em><a href="http://skilldrick.co.uk/2011/04/closures-explained-with-javascript/" rel="nofollow noreferrer" target="_blank">Closures explained with JavaScript</a></em></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//它的运行原理可能并不像你想的那样，因为`i`的值从来没有被锁定。相反的，每个链接，当被点击时(循环已经被很好的执行完毕)，因此会弹出所有元素的总数，因为这是`i`此时的真实值。
var elems = document.getElementsByTagName('a');
for(var i = 0;i < elems.length; i++ ) {
    elems[i].addEventListener('click',function(e){
        e.preventDefault();
        alert('I am link #' + i)
        },false);
}
//而像下面这样改写，便可以了，因为在IIFE里，`i`值被锁定在了`lockedInIndex`里。在循环结束执行时，尽管`i`值的数值是所有元素的总和，但每一次函数表达式被调用时，IIFE里的`lockedInIndex`值都是`i`传给它的值,所以当链接被点击时，正确的值被弹出。
var elems = document.getElementsByTagName('a');
for(var i = 0;i < elems.length;i++) {
    (function(lockedInIndex){
        elems[i].addEventListener('click',function(e){
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
            },false)
    })(i);
}
//你同样可以像下面这样使用IIFE，仅仅只用括号包裹点击处理函数，并不包含整个`addEventListener`。无论用哪种方式，这两个例子都可以用IIFE将值锁定，不过我发现前面一个例子更可读
var elems = document.getElementsByTagName( 'a' );

for ( var i = 0; i < elems.length; i++ ) {
    elems[ i ].addEventListener( 'click', (function( lockedInIndex ){
        return function(e){
            e.preventDefault();
            alert( 'I am link #' + lockedInIndex );
        };
        })( i ),false);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//它的运行原理可能并不像你想的那样，因为`i`的值从来没有被锁定。相反的，每个链接，当被点击时(循环已经被很好的执行完毕)，因此会弹出所有元素的总数，因为这是`i`此时的真实值。</span>
<span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'a'</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; elems.length; i++ ) {
    elems[i].addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        e.preventDefault();
        alert(<span class="hljs-string">'I am link #'</span> + i)
        },<span class="hljs-literal">false</span>);
}
<span class="hljs-comment">//而像下面这样改写，便可以了，因为在IIFE里，`i`值被锁定在了`lockedInIndex`里。在循环结束执行时，尽管`i`值的数值是所有元素的总和，但每一次函数表达式被调用时，IIFE里的`lockedInIndex`值都是`i`传给它的值,所以当链接被点击时，正确的值被弹出。</span>
<span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'a'</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; elems.length;i++) {
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">lockedInIndex</span>)</span>{
        elems[i].addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            e.preventDefault();
            alert(<span class="hljs-string">'I am link #'</span> + lockedInIndex);
            },<span class="hljs-literal">false</span>)
    })(i);
}
<span class="hljs-comment">//你同样可以像下面这样使用IIFE，仅仅只用括号包裹点击处理函数，并不包含整个`addEventListener`。无论用哪种方式，这两个例子都可以用IIFE将值锁定，不过我发现前面一个例子更可读</span>
<span class="hljs-keyword">var</span> elems = <span class="hljs-built_in">document</span>.getElementsByTagName( <span class="hljs-string">'a'</span> );

<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; elems.length; i++ ) {
    elems[ i ].addEventListener( <span class="hljs-string">'click'</span>, (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> lockedInIndex </span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            e.preventDefault();
            alert( <span class="hljs-string">'I am link #'</span> + lockedInIndex );
        };
        })( i ),<span class="hljs-literal">false</span>);
    }</code></pre>
<p>记住，在这最后两个例子里，<code>lockedInIndex</code>可以没有任何问题的访问<code>i</code>,但是作为函数的参数使用一个不同的命名标识符可以使概念更加容易的被解释。</p>
<p>立即执行函数一个最显著的优势是就算它没有命名或者说是匿名，函数表达式也可以在没有使用标识符的情况下被立即调用，一个闭包也可以在没有当前变量污染的情况下被使用。</p>
<h2 id="articleHeader6">「自执行匿名函数(Self-executing anonymous function)」有什么问题呢？</h2>
<p>你看到它已经被提到好几次了，但它仍未被清楚地解释，我提议将术语改成<strong>"Immediately-Invoked Function Expression"</strong>，或者，<strong>IIFE</strong>，如果你喜欢缩写的话（发音类似“iffy”）。</p>
<p>什么是<strong>Immediately-Invoked Function Expression</strong>呢？顾名思义，它就是一个被立即调用的函数表达式。</p>
<p>我想JavaScript社区的成员应该可以在他们的文章里或者陈述里接受术语<strong>Immediately-Invoked Function Expression</strong>和<strong>IIFE</strong>，因为我感觉这样更容易让这个概念被理解，并且术语"self-executing anonymous function"真的也不够精确。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//下面是个自执行函数，递归的调用自己本身
function foo(){foo();};
//这是一个自执行匿名函数。因为它没有标识符，它必须是使用`arguments.callee`属性来调用它自己
var foo = function(){arguments.callee();};
//这也许算是一个自执行匿名函数，但是仅仅当`foo`标识符作为它的引用时，如果你将它换成用`foo`来调用同样可行
var foo = function(){foo();};
//有些人像这样叫'self-executing anonymous function'下面的函数,即使它不是自执行的，因为它并没有调用它自己。然后，它只是被立即调用了而已。
(function(){ /*code*/ }());
//为函数表达式增加标识符(也就是说创造一个命名函数)对我们的调试会有很大帮助。一旦命名，函数将不再匿名。
(function foo(){/* code */}());
//IIFEs同样也可以自执行，尽管，也许他不是最有用的模式
(function(){arguments.callee();}())
(function foo(){foo();}())
// 另外，下面这个表达式竟会在黑莓5上抛出错误，在一个被命名的函数中，该函数名是undefined。很奇妙吧…
(function foo(){ foo(); }());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">//下面是个自执行函数，递归的调用自己本身</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span>{<span class="hljs-title">foo</span><span class="hljs-params">()</span>;};</span>
<span class="hljs-comment">//这是一个自执行匿名函数。因为它没有标识符，它必须是使用`arguments.callee`属性来调用它自己</span>
var foo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{<span class="hljs-title">arguments</span>.<span class="hljs-title">callee</span><span class="hljs-params">()</span>;};</span>
<span class="hljs-comment">//这也许算是一个自执行匿名函数，但是仅仅当`foo`标识符作为它的引用时，如果你将它换成用`foo`来调用同样可行</span>
var foo = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{<span class="hljs-title">foo</span><span class="hljs-params">()</span>;};</span>
<span class="hljs-comment">//有些人像这样叫'self-executing anonymous function'下面的函数,即使它不是自执行的，因为它并没有调用它自己。然后，它只是被立即调用了而已。</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{ /*<span class="hljs-title">code</span>*/ }<span class="hljs-params">()</span>);</span>
<span class="hljs-comment">//为函数表达式增加标识符(也就是说创造一个命名函数)对我们的调试会有很大帮助。一旦命名，函数将不再匿名。</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span>{/* <span class="hljs-title">code</span> */}<span class="hljs-params">()</span>);</span>
<span class="hljs-comment">//IIFEs同样也可以自执行，尽管，也许他不是最有用的模式</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span>{<span class="hljs-title">arguments</span>.<span class="hljs-title">callee</span><span class="hljs-params">()</span>;}<span class="hljs-params">()</span>)</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span>{<span class="hljs-title">foo</span><span class="hljs-params">()</span>;}<span class="hljs-params">()</span>)</span>
<span class="hljs-comment">// 另外，下面这个表达式竟会在黑莓5上抛出错误，在一个被命名的函数中，该函数名是undefined。很奇妙吧…</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span>{ <span class="hljs-title">foo</span><span class="hljs-params">()</span>; }<span class="hljs-params">()</span>);</span></code></pre>
<p>希望上面的例子可以让你更加清楚的知道术语'self-executing'是有一些误导的，因为他并不是执行自己的函数，尽管函数已经被执行。同样的，匿名函数也没用必要特别指出，因为，<strong>Immediately Invoked Function Expression</strong>，既可以是命名函数也可以匿名函数。</p>
<blockquote><p>有趣的是：因为arguments.callee在<em>ECMAScript 5 strict mode</em>中被<em>deprecated</em>了，所以在ES5的<code>strict mode</code>中实际上不可能创建一个<code>self-executing anonymous function</code></p></blockquote>
<h2 id="articleHeader7">最后:模块模式</h2>
<p>当我调用函数表达式时，如果我不至少一次的提醒我自己关于模块模式，我便很可能会忽略它。如果你并不熟悉JavaScript里的模块模式，它和我第一个例子很像，但是返回值用对象代替了函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var counter = (function(){
    var i = 0;
    return {
        get: function(){
            return i;
        },
        set: function(val){
            i = val;
        },
        increment: function(){
            return ++i;
        }
    }
    }());
    counter.get();//0
    counter.set(3);
    counter.increment();//4
    counter.increment();//5

    conuter.i;//undefined (`i` is not a property of the returned object)
    i;//ReferenceError: i is not defined (it only exists inside the closure)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> counter = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> i;
        },
        <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>)</span>{
            i = val;
        },
        <span class="hljs-attr">increment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">return</span> ++i;
        }
    }
    }());
    counter.get();<span class="hljs-comment">//0</span>
    counter.set(<span class="hljs-number">3</span>);
    counter.increment();<span class="hljs-comment">//4</span>
    counter.increment();<span class="hljs-comment">//5</span>

    conuter.i;<span class="hljs-comment">//undefined (`i` is not a property of the returned object)</span>
    i;<span class="hljs-comment">//ReferenceError: i is not defined (it only exists inside the closure)</span></code></pre>
<p>模块模式方法不仅相当的厉害而且简单。非常少的代码，你可以有效的利用与方法和属性相关的命名，在一个对象里，组织全部的模块代码即最小化了全局变量的污染也创造了私人变量。</p>
<h2 id="articleHeader8">延伸阅读</h2>
<p>希望这篇文章可以为你答疑解惑。当然，如果你产生了更多疑惑，你可以阅读下面这些关于函数和模块模式的文章。</p>
<ul>
<li><p><a href="http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/#question-about-surrounding-parentheses" rel="nofollow noreferrer" target="_blank">ECMA-262-3 in detail. Chapter 5. Functions.</a> - Dmitry A. Soshnikov</p></li>
<li><p><a href="https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope" rel="nofollow noreferrer" target="_blank">Functions and function scope</a> - Mozilla Developer Network</p></li>
<li><p><a href="http://kangax.github.com/nfe/" rel="nofollow noreferrer" target="_blank">Named function expressions</a> - Juriy “kangax” Zaytsev</p></li>
<li><p><a href="http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth" rel="nofollow noreferrer" target="_blank">JavaScript Module Pattern: In-Depth</a> - Ben Cherry</p></li>
<li><p><a href="http://skilldrick.co.uk/2011/04/closures-explained-with-javascript/" rel="nofollow noreferrer" target="_blank">Closures explained with JavaScript</a> - Nick Morgan</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
立即执行函数表达式(IIFE)

## 原文链接
[https://segmentfault.com/a/1190000007569312](https://segmentfault.com/a/1190000007569312)

