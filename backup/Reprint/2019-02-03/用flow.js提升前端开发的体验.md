---
title: '用flow.js提升前端开发的体验' 
date: 2019-02-03 2:30:39
hidden: true
slug: rnibkn0txo8
categories: [reprint]
---

{{< raw >}}

                    
<p>在小心翼翼维护项目代码的时候经常会看到这种代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function main(){
   //fn1函数获取了一个数据
   var object = fn1()
   //fn2根据获数据，产生一个结果
   var result = fn2(object)

   return result
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
function main(){
   <span class="hljs-comment">//fn1函数获取了一个数据</span>
   <span class="hljs-keyword">var</span> <span class="hljs-class"><span class="hljs-keyword">object</span> </span>= fn1()
   <span class="hljs-comment">//fn2根据获数据，产生一个结果</span>
   <span class="hljs-keyword">var</span> result = fn2(<span class="hljs-class"><span class="hljs-keyword">object</span>)</span>

   <span class="hljs-keyword">return</span> result
}
</code></pre>
<p>很明显，这个过程非常的‘黑’，如果你想知道object包含什么数据的话，可以</p>
<ol>
<li><p>打印一下 console.log(object)</p></li>
<li><p>查看fn1的注释，并且保佑它的注释是正确，全面的</p></li>
<li><p>或结合1，2，然后仔细查看fn1的源码，希望它不是很复杂</p></li>
</ol>
<p>被上述步骤折磨完之后，终于能真正的写点代码了，但是依旧得非常小心，因为这里还有另一个函数：fn2。</p>
<p>在修改代码的时候，得保证result这个结果没有被影响，那么如何保证呢？</p>
<p>很简单，重复上面的步骤，搞清楚result包含的数据，在测试的时候确保其数据跟原先的相同。</p>
<p>…</p>
<p>是时候彻底优化这个烦人的问题了。</p>
<h3 id="articleHeader0">引入类型系统</h3>
<p>其实问题的根源就是因为javascript太灵活了，在代码运行期间几乎可以做任何的修改，</p>
<p>没有东西可以在代码运行前就保证 某个变量，某个函数 跟预期的一致。</p>
<p>所以要加入类型系统来确保代码的可靠性，在后期维护的时候同样能够传达出有效的信息。</p>
<p>facebook出品的flow.js 做的就是这种事情。</p>
<h3 id="articleHeader1">使用flow.js</h3>
<p>git 仓库：<a href="https://github.com/facebook/flow" rel="nofollow noreferrer" target="_blank">https://github.com/facebook/flow</a><br>flow 官方文档：<a href="https://flowtype.org/docs/quick-reference.html#primitives" rel="nofollow noreferrer" target="_blank">https://flowtype.org/docs/qui...</a></p>
<p>方便体验，这里有一个搭好的case集合</p>
<blockquote><p>git clone git@github.com:JavascriptTips/flow-examples.git</p></blockquote>
<h4>基础类型检测</h4>
<p>flow.js 中定义了的5种最简单的类型,（warning：都是小写），其中void对应js中的undefined</p>
<ul>
<li><p>boolean</p></li>
<li><p>number</p></li>
<li><p>string</p></li>
<li><p>null</p></li>
<li><p>void</p></li>
</ul>
<p>要想加入到javascript中，只需要在关键的地方声明想要的类型。其它时间我们的代码还是熟悉的javascript，代码如下（flow-examples工程中也有对应js文件）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//flow-examples/src/primitives.js

//在文件的头部加入,用注释加入 `@flow` 声明，这样flow.js才会检查这个文件。
//@flow

//在声明变量时，在变量名加入 `:[Type]` 来表明变量的类型,其它类型同理。
//这个语法非常像flash的ActionScript，咦？好像暴露了什么。
var num:number = 1;
var str:string = 'a';

//当然，也可以不加类型，这样就跟原来的js一样了。
var variable = 'zz';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//flow-examples/src/primitives.js</span>

<span class="hljs-comment">//在文件的头部加入,用注释加入 `@flow` 声明，这样flow.js才会检查这个文件。</span>
<span class="hljs-comment">//@flow</span>

<span class="hljs-comment">//在声明变量时，在变量名加入 `:[Type]` 来表明变量的类型,其它类型同理。</span>
<span class="hljs-comment">//这个语法非常像flash的ActionScript，咦？好像暴露了什么。</span>
<span class="hljs-built_in">var</span> num:number = <span class="hljs-number">1</span>;
<span class="hljs-built_in">var</span> str:<span class="hljs-built_in">string</span> = <span class="hljs-string">'a'</span>;

<span class="hljs-comment">//当然，也可以不加类型，这样就跟原来的js一样了。</span>
<span class="hljs-built_in">var</span> <span class="hljs-built_in">variable</span> = <span class="hljs-string">'zz'</span>;</code></pre>
<h4>复杂类型检测</h4>
<p>主要有：</p>
<ul>
<li><p>Object</p></li>
<li><p>Array</p></li>
<li><p>函数</p></li>
<li><p>自定义Class</p></li>
</ul>
<p>这几个类型比较复杂，而且可以相互嵌套。在flow.js中这几种类型有非常多的检查语法，在这里简单的展示几项，具体见<a href="https://github.com/JavascriptTips/flow-examples" rel="nofollow noreferrer" target="_blank">代码</a>代码和官方文档。</p>
<h5>对象：Object</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//flow-examples/src/object.js
//@flow

//Object大写的O
var o:Object = {
  hello:'h'
};

//声明了Object的key
var o2:{key:string} = {
  key:'z233'
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//flow-examples/src/object.js</span>
<span class="hljs-comment">//@flow</span>

<span class="hljs-comment">//Object大写的O</span>
<span class="hljs-keyword">var</span> o:<span class="hljs-built_in">Object</span> = {
  hello:<span class="hljs-string">'h'</span>
};

<span class="hljs-comment">//声明了Object的key</span>
<span class="hljs-keyword">var</span> o2:{key:<span class="hljs-built_in">string</span>} = {
  key:<span class="hljs-string">'z233'</span>
};
</code></pre>
<h5>数组：Array</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//flow-examples/src/array.js
//@flow


//基于基本类似的数组，数组内都是相同类型
var numberArr:number[] = [12,3,4,5,2];
//另一个写法
var numberAr2r:Array<number> = [12,3,2,3];

var stringArr:string[] = ['12','a','cc'];
var booleanArr:boolean[] = [true,true,false];
var nullArr:null[] = [null,null,null];
var voidArr:void[] = [ , , undefined,void(0)];


//数组内包含各个不同的类型数据
//第4个原素没有声明，则可以是任意类型
var arr:[number,string,boolean] = [1,'a',true,function(){},];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//flow-examples/src/array.js</span>
<span class="hljs-comment">//@flow</span>


<span class="hljs-comment">//基于基本类似的数组，数组内都是相同类型</span>
<span class="hljs-keyword">var</span> numberArr:<span class="hljs-built_in">number</span>[] = [<span class="hljs-number">12</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>];
<span class="hljs-comment">//另一个写法</span>
<span class="hljs-keyword">var</span> numberAr2r:<span class="hljs-built_in">Array</span>&lt;<span class="hljs-built_in">number</span>&gt; = [<span class="hljs-number">12</span>,<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];

<span class="hljs-keyword">var</span> stringArr:<span class="hljs-built_in">string</span>[] = [<span class="hljs-string">'12'</span>,<span class="hljs-string">'a'</span>,<span class="hljs-string">'cc'</span>];
<span class="hljs-keyword">var</span> booleanArr:<span class="hljs-built_in">boolean</span>[] = [<span class="hljs-literal">true</span>,<span class="hljs-literal">true</span>,<span class="hljs-literal">false</span>];
<span class="hljs-keyword">var</span> nullArr:<span class="hljs-literal">null</span>[] = [<span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>];
<span class="hljs-keyword">var</span> voidArr:<span class="hljs-built_in">void</span>[] = [ , , <span class="hljs-literal">undefined</span>,<span class="hljs-built_in">void</span>(<span class="hljs-number">0</span>)];


<span class="hljs-comment">//数组内包含各个不同的类型数据</span>
<span class="hljs-comment">//第4个原素没有声明，则可以是任意类型</span>
<span class="hljs-keyword">var</span> arr:[<span class="hljs-built_in">number</span>,<span class="hljs-built_in">string</span>,<span class="hljs-built_in">boolean</span>] = [<span class="hljs-number">1</span>,<span class="hljs-string">'a'</span>,<span class="hljs-literal">true</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{},];</code></pre>
<h5>函数</h5>
<p>函数比较特殊，因为函数的核心在于参数和返回值，函数作文类型本身并没有作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//flow-examples/src/function.js
//@flow

/**
 * 声明带类型的函数
 * 这里是声明一个函数fn，规定了自己需要的参数类型和返回值类型。
 */
function fn(arg:number,arg2:string):Object{
  return {
    arg,
    arg2
  }
}
//同理，ES2015箭头函数的写法
var fn2 = (arg:number,arg2:string):Object => {
  return {
    arg,
    arg2
  }
}

/**
 * 这里是声明变量fn2，规定了它所需的函数的特征:
 * 参数： (arg:string,arg2:number)
 * 返回值：Object
 */
var fn3:(arg:string,arg2:number)=>Object = function(){
  return {}
}

/**
 * 对比下面这种写法,
 * 两者的声明的地方不一样，造成的意义也不同。
 */
var fn4 = function(arg:string,arg2:Object):number{
  return 1;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//flow-examples/src/function.js</span>
<span class="hljs-comment">//@flow</span>

<span class="hljs-comment">/**
 * 声明带类型的函数
 * 这里是声明一个函数fn，规定了自己需要的参数类型和返回值类型。
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">arg:<span class="hljs-built_in">number</span>,arg2:<span class="hljs-built_in">string</span></span>):<span class="hljs-title">Object</span></span>{
  <span class="hljs-keyword">return</span> {
    arg,
    arg2
  }
}
<span class="hljs-comment">//同理，ES2015箭头函数的写法</span>
<span class="hljs-keyword">var</span> fn2 = (arg:<span class="hljs-built_in">number</span>,arg2:<span class="hljs-built_in">string</span>):<span class="hljs-function"><span class="hljs-params">Object</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    arg,
    arg2
  }
}

<span class="hljs-comment">/**
 * 这里是声明变量fn2，规定了它所需的函数的特征:
 * 参数： (arg:string,arg2:number)
 * 返回值：Object
 */</span>
<span class="hljs-keyword">var</span> fn3:<span class="hljs-function">(<span class="hljs-params">arg:<span class="hljs-built_in">string</span>,arg2:<span class="hljs-built_in">number</span></span>)=&gt;</span><span class="hljs-built_in">Object</span> = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> {}
}

<span class="hljs-comment">/**
 * 对比下面这种写法,
 * 两者的声明的地方不一样，造成的意义也不同。
 */</span>
<span class="hljs-keyword">var</span> fn4 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arg:<span class="hljs-built_in">string</span>,arg2:<span class="hljs-built_in">Object</span></span>):<span class="hljs-title">number</span></span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}
</code></pre>
<h5>自定义的class</h5>
<p>声明一个自定义类，然后用法如同基本类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//flow-examples/src/class.js
//@flow

class MyClass{
  name:string;
  constructor(n){
    this.name = n;
  }
}

var myClass : MyClass = new MyClass('abc');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//flow-examples/src/class.js</span>
<span class="hljs-comment">//@flow</span>

<span class="hljs-keyword">class</span> MyClass{
  name:<span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">n</span>){
    <span class="hljs-keyword">this</span>.name = n;
  }
}

<span class="hljs-keyword">var</span> myClass : MyClass = <span class="hljs-keyword">new</span> MyClass(<span class="hljs-string">'abc'</span>);</code></pre>
<h3 id="articleHeader2">引入flow.js</h3>
<p>可以看到加入flow.js语法后，正常的js引擎肯定是不能跑的。</p>
<p>这时就要借助万能的babel编译这些js。</p>
<p>1.如果是正经的带webpack + babel 的前端项目,可以无缝集成，加入babel插件即可：</p>
<blockquote><p>babel-plugin-transform-flow-strip-types</p></blockquote>
<p>2.如果只是跑一下测试这些js，可以直接在<a href="https://github.com/JavascriptTips/flow-examples" rel="nofollow noreferrer" target="_blank">flow-examples</a>工程中，如下：</p>
<blockquote><p>npm run fnode src/object.js</p></blockquote>
<p>其它跑起来的方法，可以在<a href="https://flowtype.org/docs/running.html#using-the-offline-transform-tool" rel="nofollow noreferrer" target="_blank">官方文档</a>查看</p>
<h3 id="articleHeader3">结论</h3>
<p>这里只是介绍了flow.js一部分的特性，在引入flow.js之后，js只需要很小的改动就能得到增强，在关键的地方确保逻辑的准确性。</p>
<p>更进一步，再结合js的函数式编程特性，以类型和函数驱动开发，感觉很cool.</p>
<h3 id="articleHeader4">一点微小的疑问</h3>
<p>这里2个小问题，</p>
<blockquote>
<p>为什么是flow.js 而不是其它编译到js的强类型语言，如TypeScript ? </p>
<p>答：我非常喜欢js的灵活性，它为编程带来极大便捷。而且flow.js对工程的侵入性很小，无需大量的额外工作就能使用起来。</p>
</blockquote>
<blockquote><p>为什么不加强注释，完善注释，而是再加入一个工具？<br>答：因为写注释很烦，并且有无注释不会影响代码执行。flow.js则是一种基本保障，确保检查无误才能运行。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用flow.js提升前端开发的体验

## 原文链接
[https://segmentfault.com/a/1190000006983211](https://segmentfault.com/a/1190000006983211)

