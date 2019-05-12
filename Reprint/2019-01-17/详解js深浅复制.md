---
title: '详解js深浅复制' 
date: 2019-01-17 2:30:25
hidden: true
slug: 9q7xtn0k2x9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在之前写继承的过程谈到了深浅复制的问题，因为有读者反映到需要解析，趁今天周末写一篇解析，今天的主体相对之前来说理解难度低一些，篇幅可能也比较短，诸君按需阅读即可。</p>
<h2 id="articleHeader1">从两种数据类型说起</h2>
<p>在js中，变量的类型可以大致分成两种：<strong>基本数据类型和引用数据类型</strong>，其中基本数据类型指的是简单的数据段，包括：</p>
<ul>
<li><code>Underfied</code></li>
<li><code>Null</code></li>
<li><code>Boolean</code></li>
<li><code>Number</code></li>
<li>
<code>String</code>(字符串在一些其他语言中是被当做对象使用的，属于引用类型，但在js里是基本类型)</li>
</ul>
<p>而引用类型的值指的是<strong>可能包含多个值的对象</strong>。可能上面这种描述大家都看过不少，但是有没有思考过<strong>为什么要把数据类型这样分呢？</strong>本质上，是因为基本数据类型保存在<strong>栈内存</strong>,而引用类型保存在<strong>堆内存中</strong>。那再进一步问：<strong>为什么要分两种保存方式呢？</strong> 根本原因在于<strong>保存在栈内存的必须是大小固定的数据，引用类型的大小不固定，只能保存在堆内存中，但是我们可以把它的地址写在占内存中以供我们访问</strong>。举个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;//定义了一个number类型
var obj1 = {//定义了一个objr类型
    name:'obj'
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;<span class="hljs-comment">//定义了一个number类型</span>
<span class="hljs-keyword">var</span> obj1 = {<span class="hljs-comment">//定义了一个objr类型</span>
    name:<span class="hljs-string">'obj'</span>
};</code></pre>
<p>在执行这段代码后，内存空间里是这样的：<br><span class="img-wrap"><img data-src="/img/bVLfes?w=1489&amp;h=850" src="https://static.alili.tech/img/bVLfes?w=1489&amp;h=850" alt="栈内存和堆内存" title="栈内存和堆内存" style="cursor: pointer; display: inline;"></span><br>因为这种保存方式的存在，所以我们在操作变量的时候，<strong>如果是基本数据类型，则按值访问，操作的就是变量保存的值；如果是引用类型的值，我们只是通过保存在变量中的引用类型的地址类操作实际对象</strong>。从而也引出了所谓的深浅复制问题。</p>
<h2 id="articleHeader2">深复制和浅复制</h2>
<h3 id="articleHeader3">不同的复制方式</h3>
<p>紧接着上文的内容，假设有以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子1
var a = 1;
var b = a;//复制
console.log(b)//1
a = 2;//改变a的值
console.log(b)//1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//例子1</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> b = a;<span class="hljs-comment">//复制</span>
<span class="hljs-built_in">console</span>.log(b)<span class="hljs-comment">//1</span>
a = <span class="hljs-number">2</span>;<span class="hljs-comment">//改变a的值</span>
<span class="hljs-built_in">console</span>.log(b)<span class="hljs-comment">//1</span></code></pre>
<p>可以看到，我们复制完b以后，即使改变a的值，b也不会改变，因为a和b是相互独立的，按照上面的图，也就是在栈内存中创建了一个变量b 保存的值也是2；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子2
var color1 = ['red','green'];
var color2 = color1;//复制
console.log(color2)//['red','green'];
color1.push('black') ;//改变color1的值
console.log(color2)//['red','green','black']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>例子<span class="hljs-number">2</span>
var color1 = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>];
var color2 = color1;<span class="hljs-regexp">//</span>复制
console.log(color2)<span class="hljs-regexp">//</span>[<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>];
color1.push(<span class="hljs-string">'black'</span>) ;<span class="hljs-regexp">//</span>改变color1的值
console.log(color2)<span class="hljs-regexp">//</span>[<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>,<span class="hljs-string">'black'</span>]</code></pre>
<p>在例子2中，我们按照完全相同的步骤，操作了一个数组，但是返回的结果却完全不一样，因为此时的复制，实际上是这样：<br><span class="img-wrap"><img data-src="/img/bVLffz?w=1489&amp;h=850" src="https://static.alili.tech/img/bVLffz?w=1489&amp;h=850" alt="数组的复制" title="数组的复制" style="cursor: pointer; display: inline;"></span><br><strong>我们只是复制了一次引用类型的地址而已</strong>，所以，不管接下来我们是操作color1还是color2，本质上都是<strong>操作同一个数组对象</strong>。</p>
<h3 id="articleHeader4">深复制和浅复制</h3>
<p>刚刚说到，简单的赋值没有办法复制引用类型，那如果我们就是想复制上面的color1数组怎么办呢？可以这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var color1 = ['red','green']; 
var color2 = [];
//复制
for(var i  = 0;i < color1.length;i++){
    color2[i] = color1[i]; 
}
console.log(color2)//['red','green'];
color1.push('black') ;//改变color1的值
console.log(color2)//['red','green']
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> color1 = [<span class="hljs-string">'red'</span>,<span class="hljs-string">'green'</span>]; 
<span class="hljs-keyword">var</span> color2 = [];
<span class="hljs-comment">//复制</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i  = <span class="hljs-number">0</span>;i &lt; color1.length;i++){
    color2[i] = color1[i]; 
}
<span class="hljs-built_in">console</span>.log(color2)<span class="hljs-comment">//['red','green'];</span>
color1.push(<span class="hljs-string">'black'</span>) ;<span class="hljs-comment">//改变color1的值</span>
<span class="hljs-built_in">console</span>.log(color2)<span class="hljs-comment">//['red','green']</span>
</code></pre>
<p>这一次我们先创建了一个空数组color2,然后让<code>color2</code>的每个值都和<code>color1</code>对应相等，最后的<code>color1</code>和<code>color2</code>是相互独立的了，满足了我们的需要。当然对于对象类型也是一样的，使用<code>for-in</code>遍历取代这里的<code>for</code>循环即可。</p>
<p>问题真的就这样解决了吗？当然没有，不过以上这种<strong>只复制了第一层属性的方式就叫做浅复制</strong>,浅复制有什么缺陷呢？我们可以先思考一下，<strong>从直接使用<code>=</code>符号赋值进行复制到浅复制，能够复制成功(成功是指复制的结果与复制源完全独立)，是因为我们复制的对象都是基本类型</strong>，怎么解释呢？</p>
<ul>
<li>在复制基本数据类型时，我们直接使用<code>=</code>完成复制</li>
<li>在引用类型的时候，我们循环遍历对象，对每个属性或值使用<code>=</code>完成复制</li>
</ul>
<p>有没有注意到上文的<code>color1</code>例子使用浅复制之所以能够复制成功，是因为<strong>数组中的每一项都是基本数据类型(string)</strong>，所以猜出了浅复制的局限了吗？<strong>假如数组中某一项保存的是一个对象，或者是一个数组，又或者对象的某个属性还是一个对象呢？</strong>（换句话说就是引用类型的某个属性还是引用类型），如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
    name:'lin',
    score:{
        physics:85,
        math:99
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">person</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    name:</span><span class="hljs-string">'lin'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    score:</span><span class="hljs-string">{</span>
<span class="hljs-attr">        physics:</span><span class="hljs-number">85</span><span class="hljs-string">,</span>
<span class="hljs-attr">        math:</span><span class="hljs-number">99</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span></code></pre>
<p>这个对象的<code>分数score</code>属性就还是一个对象，那我们使用前面提到<code>for-in</code>遍历复制的时候，对<code>score</code>的复制，不就又变成了我们前面提到的<strong>只复制了地址</strong>的情况吗？再想想浅复制实现的原理,相信大家猜到了深复制实现的方式:<strong>对属性中所有引用类型的值，遍历到是基本类型的值为止</strong>，从这种方式上，我们很容易就可以想到利用<strong>递归</strong>来实现深复制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deepCopy (obj) {
    var result;

    //引用类型分数组和对象分别递归
    if (Object.prototype.toString.call(obj) == '[object Array]') {
      result = []
      for (i = 0; i < obj.length; i++) {
        result[i] = deepCopy(obj[i])
      }
    } else if (Object.prototype.toString.call(obj) == '[object Object]') {
      result = {}
      for (var attr in obj) {
        result[attr] = deepCopy(obj[attr])
      }
    }
    //值类型直接返回
    else {
      return obj
    }
    return result
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepCopy</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> result;

    <span class="hljs-comment">//引用类型分数组和对象分别递归</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.toString.call(obj) == <span class="hljs-string">'[object Array]'</span>) {
      result = []
      <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; obj.length; i++) {
        result[i] = deepCopy(obj[i])
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.toString.call(obj) == <span class="hljs-string">'[object Object]'</span>) {
      result = {}
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> obj) {
        result[attr] = deepCopy(obj[attr])
      }
    }
    <span class="hljs-comment">//值类型直接返回</span>
    <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> obj
    }
    <span class="hljs-keyword">return</span> result
}</code></pre>
<p>上面的函数很简单：对于传入的参数，首先判断是否为引用类型，如果不是，直接返回即可；如果是，循环遍历该对象的属性，如果某个属性还是引用类型，则针对该属性再次调用<code>deepCopy</code>函数，从而完成深复制。</p>
<h3 id="articleHeader5">附注</h3>
<p>对于浅复制，其实还有其他的实现方式，比如数组中<code>concat</code>和<code>slice</code>方法，对于这些还是希望大家自己了解，本本主要针对深浅复制的实现原理进行解析。</p>
<h2 id="articleHeader6">小结</h2>
<p>对于深浅复制的区别，其实核心的关键点就是<strong>是只复制了第一属性还是完全复制了所有的属性</strong>，可能有些地方写的稍显啰嗦或者描述不当，欢迎提出意见和建议(然而我并不一定会听，哈哈)。如果对读者有帮助，还是希望能点个推荐。以上内容属于个人见解，如果有不同意见，欢迎指出和探讨。请尊重作者的版权，转载请注明出处，如作商用，请与作者联系，感谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解js深浅复制

## 原文链接
[https://segmentfault.com/a/1190000008838101](https://segmentfault.com/a/1190000008838101)

