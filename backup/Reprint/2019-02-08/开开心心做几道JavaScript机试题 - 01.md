---
title: '开开心心做几道JavaScript机试题 - 01' 
date: 2019-02-08 2:30:40
hidden: true
slug: pa0c5dvprt
categories: [reprint]
---

{{< raw >}}

                    
<p>我们在长期的面试过程中，经历了种种苦不堪言，不诉苦感觉不过瘾(我尽量控制)，然后主要聊聊常见<code>JavaScript</code>面试题的解法，以及面试注意事项</p>
<h2 id="articleHeader0">忆苦</h2>
<p>面试第一苦，面试官的土 － 有些面试官自己就非常不专业，词不达意、不知所云，这类面试常常表现为网上搜题，面试时照本宣科，只会比较候选人的答案最终的结果，自动忽略候选人对题目的见解以及解题思路。碰到这种面试官，你只有是个题霸，再加上眼缘够才能顺利入围。苦！</p>
<p>面试第二苦，候选人的虎 － 有些候选人的表现好像菜市场的大妈，表述永远走“朴实无华”路线，譬如：说个<code>iife</code>，他一定要说“就是那个小括号包裹，里面写一个函数，最后再来一对括号，函数里面写一堆闭包的写法”， 注意，这里面一定会说“里面写闭包”这句话，以彰显专业性，殊不知从一开始就露怯了。苦！</p>
<p>面试第三苦，双方都在赌 － 面试官自说自话，候选人答非所问，场面一片欢愉，结果不言而喻！</p>
<p>面试，是一个非常需要认真思考的事情，无论面试官还是候选人，选什么人、怎么选；面什么公司、什么岗位、题目不会该如何作答？不思考胡说一通，那不苦才有鬼！</p>
<p>通常面试都是聊天、笔试，机试环节常常短缺。但扪心自问，我们真的需要程序员熟背所有<code>Javascript</code> API么？我们真的需要程序员熟背所有<code>Web</code> API么？我们真的需要程序员瞬间给出“某某网站慢的完全优化方案”么？</p>
<blockquote><p>我在想，前两问完全可以<code>Google</code>，考察的重点不在于候选人能默写多少API，而在于当他记不住的时候，是否知道去哪里查！关于后一问，瞬间给出完全优化方案？别闹了，你自己面对这个产品那么些年也没搞定，别人在没有任何了解的情况下，看一眼(有时连看都没看着，仅听描述)就能给出方案，那你们公司养的都是废物吧？这里考察的重点应该是思路，候选人会从哪几个方面思考问题的症结所在，至于是否能给出解决方案，我觉得可能性不大，一个产品涉及的东西太多，离开背景细节，给出解决方案的可能性不大。</p></blockquote>
<h2 id="articleHeader1">觉醒</h2>
<p>缺少上机测试会有什么问题？(其实没什么大差错)，不过可能会损失一些“嘴笨”的实践派干活能手，他们信奉“能动手就别BB”，这类人通常在与面试官<code>face 2 face</code>的“聊天”中不能讨得面试官欢心，但他们真心能写的一手好码，可惜没机会展示，也是苦！</p>
<p>于是我觉得大家应该互相给对方一个机会，谈谈我自己用的一套机试题目<a href="https://github.com/leftstick/fe-interview" rel="nofollow noreferrer" target="_blank">fe-interview</a>，以及作为面试官希望了解的候选人关于<code>Javascript</code>方面的能力的看法。</p>
<p>以下是该机试题目的开始界面(retro风格)，通过键盘光标上/下键选择题目，按回车键确认选中</p>
<blockquote><p>虽然写了“算法考核”，但其实没什么算法题，这也算是标题党吧^^</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVyzVN" src="https://static.alili.tech/img/bVyzVN" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>确认选中后，会出现如下选择器，候选人可以再次上/下键选择"查看题目描述"、“查看测试用例”、“检验答题结果”</p>
<p><span class="img-wrap"><img data-src="/img/bVyzWP" src="https://static.alili.tech/img/bVyzWP" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>"查看测试用例"的目的是帮助候选人，通过查看测试用例的代码来改进自己的题目解答。</p></blockquote>
<p>该测试工具需要本地安装，详情请看：<a href="https://github.com/leftstick/fe-interview/blob/master/README.md" rel="nofollow noreferrer" target="_blank">安装/使用手册</a></p>
<p>简单了解测试工具之后，我们就可以开始愉快的答题了</p>
<p>最后再来回顾一下机试目标：机试的目的不是为了让候选人在指定时间内完成一个完美无瑕的功能，那是<strong>高考</strong>！我们期待的是通过不同的题目，考察候选人的基本功、编码能力、思考方法。。。，通过这些综合指标，判断该候选人是否一个你期望的<code>JavaScript</code>工程师</p>
<p>下面让我们一起走上答题之路</p>
<h2 id="articleHeader2">答题之路</h2>
<h3 id="articleHeader3">01 - 请尝试删除数组的指定下标对应的元素</h3>
<p><span class="img-wrap"><img data-src="/img/bVyAnX" src="https://static.alili.tech/img/bVyAnX" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>题目非常简单，完成一个可以删除数组指定下标对应元素的函数</p></blockquote>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var removeArray = function(arr, index) {
    arr.splice(index, 1);
};

module.exports = removeArray;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> removeArray = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, index</span>) </span>{
    arr.splice(index, <span class="hljs-number">1</span>);
};

<span class="hljs-built_in">module</span>.exports = removeArray;</code></pre>
<blockquote><p>真心没什么花哨的地方，这个题目不涉及任何高深的知识。旨在考察候选人对基础API的熟练程度，关于<code>splice</code>你可能想知道<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" rel="nofollow noreferrer" target="_blank">更多</a></p></blockquote>
<h3 id="articleHeader4">02 - 请尝试完成可以判断传入变量是否为string的模块</h3>
<p><span class="img-wrap"><img data-src="/img/bVyAtC" src="https://static.alili.tech/img/bVyAtC" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isString = function(value) {
    return Object.prototype.toString.call(value) === '[object String]';
};

module.exports = isString;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> isString = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(value) === <span class="hljs-string">'[object String]'</span>;
};

<span class="hljs-built_in">module</span>.exports = isString;</code></pre>
<blockquote><p>这里考察的重点是<code>new String('hello')</code>到底是个什么东西？至于我给的答案用了<code>Object.prototype.toString</code>方法，我可以负责任的告诉你，这个做法是有风险的，因为该方法的实现由平台提供，意思是：不同的<code>JavaScript</code>执行引擎实现可能不同，所以结果并不能保证。还是那句话，结果不是最重要的，解题思路，看清本质最为关键，也是最重要的能力。当然关于<code>Object.prototype.toString</code>，你也可能想知道<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString" rel="nofollow noreferrer" target="_blank">更多</a></p></blockquote>
<h3 id="articleHeader5">03 - 请尝试完成一个简单的使柯里化(currying)模块</h3>
<p><span class="img-wrap"><img data-src="/img/bVyAwG" src="https://static.alili.tech/img/bVyAwG" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>这题可能对一些同学来讲有点过了，但相信我，我的测试用例并不变态，你完全不必写出一个“完美”的柯里化。只要按照我题目的思路，甚至打出来测试用例看看，就能实现这个题目了。</p></blockquote>
<p>首先为了普法，还是先简单介绍下什么是“柯里化”，说白了柯里化也是一个函数。假设我们有函数<code>A</code>经过柯里化函数处理过后，<code>A</code>就被赋予了一种能够被部分执行的能力！这话说的听不懂了是吧？我们来看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//假设我们有个add函数，她接受两个参数a和b；并返回二者之和
var add = function(a, b){
    return a + b;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//假设我们有个add函数，她接受两个参数a和b；并返回二者之和</span>
<span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>)</span>{
    <span class="hljs-keyword">return</span> a + b;
};</code></pre>
<blockquote><p>简单吧？那么问题来了，如果我现在只给了你一个参数a，另一个参数我想过会儿再给你，怎么办？传统思维是那就过一会再调用<code>add</code>呗！这当然没错！但是凭借柯里化，我们有另外一种思路使得以下成为可能：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add3 = add(3);//执行了一半

setTimeout(function(){
    console.log(add3(5));//这里拿到了另一半参数5，再计算最终结果
}, 5000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> add3 = add(<span class="hljs-number">3</span>);<span class="hljs-comment">//执行了一半</span>

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(add3(<span class="hljs-number">5</span>));<span class="hljs-comment">//这里拿到了另一半参数5，再计算最终结果</span>
}, <span class="hljs-number">5000</span>);</code></pre>
<blockquote><p>我这里不会大篇幅讲柯里化有多牛逼的好处，当然如果你有兴趣，可以看<a href="https://hughfdjackson.com/javascript/why-curry-helps/" rel="nofollow noreferrer" target="_blank">Why Curry Helps</a></p></blockquote>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var currying = function(func) {
    var len = func.length;//获取一个函数形參的个数

    var getCurry = function(params) {
        return function() {
            //参数拼接
            var next = params.concat(Array.prototype.slice.call(arguments));
            //持续接收的参数已经满足当初原始函数的形參个数，执行原始函数，返回结果
            if (len - next.length <= 0) {
                return func.apply(this, next);
            }
            //不满足个数，将已经获取的参数继续递归
            return getCurry(next);
        };
    };

    return getCurry([]);
};

module.exports = currying;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> currying = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">func</span>) </span>{
    <span class="hljs-keyword">var</span> len = func.length;<span class="hljs-comment">//获取一个函数形參的个数</span>

    <span class="hljs-keyword">var</span> getCurry = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">params</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//参数拼接</span>
            <span class="hljs-keyword">var</span> next = params.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>));
            <span class="hljs-comment">//持续接收的参数已经满足当初原始函数的形參个数，执行原始函数，返回结果</span>
            <span class="hljs-keyword">if</span> (len - next.length &lt;= <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>, next);
            }
            <span class="hljs-comment">//不满足个数，将已经获取的参数继续递归</span>
            <span class="hljs-keyword">return</span> getCurry(next);
        };
    };

    <span class="hljs-keyword">return</span> getCurry([]);
};

<span class="hljs-built_in">module</span>.exports = currying;</code></pre>
<h3 id="articleHeader6">04 - 请尝试完成一个'duplicate(重复)'的模块</h3>
<p><span class="img-wrap"><img data-src="/img/bVyAMk" src="https://static.alili.tech/img/bVyAMk" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>如此简单的题目，我想考察的依旧是<code>Array</code>的内置API，不记得不要紧，我是允许上网查的(谁没有个记不住的时候)。但你要是玩出花来，譬如有人写了几十行的方法，这个我就有点懵了。</p></blockquote>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var duplicate = function(array) {
    return array.concat(array);
};

module.exports = duplicate;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> duplicate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">return</span> array.concat(array);
};

<span class="hljs-built_in">module</span>.exports = duplicate;</code></pre>
<blockquote><p>其实<code>concat</code>足矣。关于<code>concat</code>，<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat" rel="nofollow noreferrer" target="_blank">更多详情</a></p></blockquote>
<h3 id="articleHeader7">05 - 请尝试完成可以浅拷贝的模块</h3>
<p><span class="img-wrap"><img data-src="/img/bVyAN5" src="https://static.alili.tech/img/bVyAN5" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>“浅拷贝”，顾名思义，对于引用类型的数据，只拷贝其引用，也就是题目中<code>copied[0].name = 'world';</code>之后，原先的<code>value</code>也被改了。</p></blockquote>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shallowCopy = function(value) {
    return Object.assign(new (Object.getPrototypeOf(value).constructor)(), value);
};

module.exports = shallowCopy;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> shallowCopy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">new</span> (<span class="hljs-built_in">Object</span>.getPrototypeOf(value).constructor)(), value);
};

<span class="hljs-built_in">module</span>.exports = shallowCopy;</code></pre>
<blockquote>
<p>根据<a href="https://github.com/tommytroylin" rel="nofollow noreferrer" target="_blank"></a><a href="/u/technommy">@Tommy</a> Troy Lin的PR，对答案做出修正。原因是我在题目里提到了对<code>Object</code>的支持，而我的答案以及题目考核的最初想法都没有考虑<code>Object</code>的情况(记忆错乱了)。再次感谢指正</p>
<p>关于<code>Object.assign</code>，不明白的同学看这里<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" rel="nofollow noreferrer" target="_blank">assign</a>；对于<code>Object.getPrototypeOf</code>不清楚的同学，看<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf" rel="nofollow noreferrer" target="_blank">getPrototypeOf</a></p>
</blockquote>
<h3 id="articleHeader8">06 - 请尝试完成一个类似'_.flatten'的模块</h3>
<p><span class="img-wrap"><img data-src="/img/bVyAOY" src="https://static.alili.tech/img/bVyAOY" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>如何“拍平”一个多维数组，这是好玩意儿</p></blockquote>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var flatten = function(array) {
    return array.reduce(function(previous, i) {
        if (Object.prototype.toString.call(i) !== '[object Array]') {
            return (previous.push(i), previous);
        }
        return (Array.prototype.push.apply(previous, flatten(i)), previous);
    }, []);
};

module.exports = flatten;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> flatten = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">return</span> array.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">previous, i</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.toString.call(i) !== <span class="hljs-string">'[object Array]'</span>) {
            <span class="hljs-keyword">return</span> (previous.push(i), previous);
        }
        <span class="hljs-keyword">return</span> (<span class="hljs-built_in">Array</span>.prototype.push.apply(previous, flatten(i)), previous);
    }, []);
};

<span class="hljs-built_in">module</span>.exports = flatten;</code></pre>
<blockquote>
<p>本题在“递归”这个问题上，做了一些考虑。我想考查的主要是面对多维数组，候选人将如何处理！</p>
<p>我的答案用了<code>reduce</code>方法，如果你还没用过，你需要看<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" rel="nofollow noreferrer" target="_blank">reduce</a>。另外可能有人对于逗号的使用有疑惑，可以看<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator" rel="nofollow noreferrer" target="_blank">Comma_Operator</a>。另：我的答案绝不敢称最佳，随时欢迎优化/修正。</p>
</blockquote>
<h3 id="articleHeader9">07 - 请尝试完成一个'继承'的实现</h3>
<p><span class="img-wrap"><img data-src="/img/bVyBXC" src="https://static.alili.tech/img/bVyBXC" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>考查<code>ES5</code>时代基于<code>prototype</code>的类继承实现，如果你心系<code>ES6</code>，这个可以忽略。<strong>但了解总归是好的</strong>。</p></blockquote>
<p>答案：</p>
<p><strong>Parent</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Parent = function(name) {
    this.name = name;
};

Parent.prototype.getName = function() {
    return this.name;
};

module.exports = Parent;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Parent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
};

Parent.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
};

<span class="hljs-built_in">module</span>.exports = Parent;</code></pre>
<p><strong>Son</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Parent = require('./Parent');

var Son = function(parentName, name) {
    Parent.call(this, parentName);
    this.childName = name;
};

Son.prototype = Object.create(Parent.prototype);

Son.prototype.constructor = Son;

Son.prototype.getChildName = function() {
    return this.childName;
};

module.exports = Son;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Parent = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./Parent'</span>);

<span class="hljs-keyword">var</span> Son = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">parentName, name</span>) </span>{
    Parent.call(<span class="hljs-keyword">this</span>, parentName);
    <span class="hljs-keyword">this</span>.childName = name;
};

Son.prototype = <span class="hljs-built_in">Object</span>.create(Parent.prototype);

Son.prototype.constructor = Son;

Son.prototype.getChildName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.childName;
};

<span class="hljs-built_in">module</span>.exports = Son;</code></pre>
<blockquote>
<p>以上算是基本继承概念，如果不清楚的，看看这篇教程<a href="http://phrogz.net/js/classes/OOPinJS2.html" rel="nofollow noreferrer" target="_blank">OOP in JS, Part 2 : Inheritance</a>。你也可能对与<code>Object.create</code>的使用感到疑惑，那么请看<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create" rel="nofollow noreferrer" target="_blank">create</a></p>
<p>接受<a href="/u/worengjiuzaizheli">@我仍旧在这里</a> 建议，把<code>new Parent()</code>换成了<code>Object.create(Parent.prototype)</code></p>
</blockquote>
<h3 id="articleHeader10">08 - 请尝试完成一个类似'_.map'的模块</h3>
<p><span class="img-wrap"><img data-src="/img/bVyBZ0" src="https://static.alili.tech/img/bVyBZ0" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>通过长期观察我们发现一个现象，就是在<code>ES2015</code>甚至<code>ES2016</code>大行其道的今天，仍然有人打着“我要兼容IE8”的旗号拒绝进步。自<code>ES5</code>开始就有的<code>Array</code>新方法<code>map</code>, <code>forEach</code>、<code>reduce</code>常常有人搞不懂，也不会用，更不知道干嘛用的。往往一言不和就吐一堆<code>for</code>循环出来恶心人！本题主要就是甄别候选人是否自己口中所说的那样“积极、爱学习”，如果连<code>ES5</code>就有的常见方法都不会，还是“积极、爱学习”，那我只能呵呵了！</p></blockquote>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var map = function(arr, func, ctx) {
    var array = [];

    arr.forEach(function(i, index) {
        array.push(func.call(ctx, i, index, arr));
    });

    return array;
};

module.exports = map;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> map = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, func, ctx</span>) </span>{
    <span class="hljs-keyword">var</span> array = [];

    arr.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, index</span>) </span>{
        array.push(func.call(ctx, i, index, arr));
    });

    <span class="hljs-keyword">return</span> array;
};

<span class="hljs-built_in">module</span>.exports = map;</code></pre>
<blockquote><p>这里解法也是多种多样，无所谓用哪一种，关键在于是否真正理解了什么是<code>map</code>？文档看:<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" rel="nofollow noreferrer" target="_blank">map</a></p></blockquote>
<h3 id="articleHeader11">09 - 请尝试完成一个类似'_.reduce'的模块</h3>
<p><span class="img-wrap"><img data-src="/img/bVyB20" src="https://static.alili.tech/img/bVyB20" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>最为<code>ES5</code>里<code>Array</code>的几个好兄弟，<code>reduce</code>的用法/原理我想还是应该掌握的。</p></blockquote>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reduce = function(arr, func, initialValue) {
    var base = typeof initialValue === 'undefined' ? arr[0] : initialValue;
    var stepForward = typeof initialValue === 'undefined' ? 1 : 0;
    var startPoint = stepForward;
    arr
        .slice(startPoint)
        .forEach(function(val, index) {
            base = func(base, val, index + stepForward, arr);
        });
    return base;
};

module.exports = reduce;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> reduce = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, func, initialValue</span>) </span>{
    <span class="hljs-keyword">var</span> base = <span class="hljs-keyword">typeof</span> initialValue === <span class="hljs-string">'undefined'</span> ? arr[<span class="hljs-number">0</span>] : initialValue;
    <span class="hljs-keyword">var</span> stepForward = <span class="hljs-keyword">typeof</span> initialValue === <span class="hljs-string">'undefined'</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> startPoint = stepForward;
    arr
        .slice(startPoint)
        .forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, index</span>) </span>{
            base = func(base, val, index + stepForward, arr);
        });
    <span class="hljs-keyword">return</span> base;
};

<span class="hljs-built_in">module</span>.exports = reduce;</code></pre>
<blockquote><p>仍然不理解<code>reduce</code>工作原理的，看<a href="http://stackoverflow.com/questions/13203511/understanding-eloquent-javascripts-reduce-function" rel="nofollow noreferrer" target="_blank">Understanding Eloquent Javascript's Reduce function</a></p></blockquote>
<h3 id="articleHeader12">10 - 请尝试完成一个获取原始数据值的模块</h3>
<p><span class="img-wrap"><img data-src="/img/bVyB8c" src="https://static.alili.tech/img/bVyB8c" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>永远获取传入参数的最终执行结果，如果是函数的，就执行、执行、再执行，直到拿到了最终的非函数结果。</p></blockquote>
<p>答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var value = function(anything) {
    if (Object.prototype.toString.call(anything) !== '[object Function]') {
        return anything;
    }
    return value(anything());
};

module.exports = value;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> value = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">anything</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.toString.call(anything) !== <span class="hljs-string">'[object Function]'</span>) {
        <span class="hljs-keyword">return</span> anything;
    }
    <span class="hljs-keyword">return</span> value(anything());
};

<span class="hljs-built_in">module</span>.exports = value;</code></pre>
<p>今天实在写不动了，先来10题试试反响，如果大家觉得还有用，我再继续补后面的题目。当然也欢迎直接<code>Github</code>给我PR，<code>star</code>那自然是最好的啦^^</p>
<p>欲知后事，请看<a href="https://segmentfault.com/a/1190000005870409">下集</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开开心心做几道JavaScript机试题 - 01

## 原文链接
[https://segmentfault.com/a/1190000005828394](https://segmentfault.com/a/1190000005828394)

