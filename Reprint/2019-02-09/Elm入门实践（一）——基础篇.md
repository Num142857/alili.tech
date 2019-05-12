---
title: 'Elm入门实践（一）——基础篇' 
date: 2019-02-09 2:30:58
hidden: true
slug: 9n5kndcjchd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p><a href="http://elm-lang.org/" rel="nofollow noreferrer" target="_blank">Elm</a> 是一门专注于Web前端的纯函数式语言。你可能没听说过它，但一定听说过Redux，而Redux的核心reducer就是受到了Elm的启发。</p>
<p>随着整个React社区往函数式方向发展，Elm作为前端函数式编程的先驱和风向标，毫无疑问是值得去学习和借鉴的。</p>
<p>如果你打算开始函数式编程，与其阅读零碎的文章试图弄明白那些晦涩的Monad/Functor们，动手写点熟悉的东西也许是更好的方式。接下我会以常见的Counter/CounterList为例，一步步地带你了解如何使用Elm构建应用。</p>
<p>由于内容较多，计划分四篇，大致内容分布如下：</p>
<ol>
<li><p>基础篇：Elm介绍、基础。使用在线编辑器实现Counter</p></li>
<li><p>类型篇：Elm的类型系统</p></li>
<li><p>进阶篇：本地工程的搭建，在本地实现Counter List</p></li>
<li><p>完结篇：处理副作用，Elm与Redux对比</p></li>
</ol>
<h3 id="articleHeader1">下载和准备</h3>
<blockquote><p>本文的内容都基于官网提供的<a href="http://elm-lang.org/try" rel="nofollow noreferrer" target="_blank">在线编辑器</a>，可以稍后再配置本地环境</p></blockquote>
<p>你可以在<a href="http://elm-lang.org/install" rel="nofollow noreferrer" target="_blank">官网下载安装包</a>，作为前端开发者，从<a href="https://www.npmjs.com/package/elm" rel="nofollow noreferrer" target="_blank">NPM下载</a>也是很好的选择，个人推荐后者</p>
<p>在安装成功后，打开命令行输入elm，会看到版本和帮助信息。</p>
<h3 id="articleHeader2">有用的学习资料</h3>
<p>官网提供了<a href="http://elm-lang.org/docs" rel="nofollow noreferrer" target="_blank">文档</a> 和大量的<a href="http://elm-lang.org/examples" rel="nofollow noreferrer" target="_blank">examples</a> ，然而个人一直不太喜欢Elm的一点就是官方文档，无论是组织的合理性还是完整性都有所欠缺，即使是像<a href="http://elm-lang.org/docs/syntax" rel="nofollow noreferrer" target="_blank">Syntax</a>这样务求全面的地方，也有很多遗漏的知识点，在无形中增加了初学者的学习成本。</p>
<p>本文接下来会尽量讲解涉及到的知识点，如果遇到困难，除了官网外，以下两个链接也是不错的补充：</p>
<ul>
<li><p><a href="https://learnxinyminutes.com/docs/elm/" rel="nofollow noreferrer" target="_blank">Learn X in Y minutes</a>：可以看成是对官网Syntax 的补充，不仅覆盖了一些官网忽略的点，很多解释也更加详细</p></li>
<li><p><a href="https://github.com/elm-guides/elm-for-js" rel="nofollow noreferrer" target="_blank">Elm for JS</a>：针对Javascript开发者的常见疑点解答，学习过程中有理解不了的地方不妨看看。</p></li>
</ul>
<h2 id="articleHeader3">Hello world</h2>
<p>按照套路，现在是Hello world时间，官网有<a href="http://elm-lang.org/examples/hello-html" rel="nofollow noreferrer" target="_blank">在线版</a>，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (text)

main =
  text &quot;Hello, World!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (text)

<span class="hljs-title">main</span> =
  text <span class="hljs-string">"Hello, World!"</span></code></pre>
<p>非常简单，却隐含了几个重要的知识点：</p>
<h3 id="articleHeader4">函数调用</h3>
<p><code>text "Hello, World"</code>是Elm中的函数调用，类似于JS中的<code>text("Hello world")</code>，它将一个字符串转换成Html文本。</p>
<p>在很多语言中，函数调用都是括号，参数用逗号分隔，比如<code>fn(arg1, arg2)</code>，Elm的函数调用符为空格，参数也使用空格分隔，这点初看起来别扭，实际上并不难适应。</p>
<blockquote>
<p>调用符和分隔参数都是空格，如何区分呢？</p>
<p>答案是不需要区分，Elm所有函数都是自动柯里化的，对于柯里函数<code>fn(arg1, arg2)</code>和<code>fn(arg1)(arg2)</code>等价，使用空格作为调用符，即<code>(fn arg1) arg2</code>，注意这里的括号仅用来表示代码执行顺序，省略后即为<code>fn arg1 arg2</code></p>
</blockquote>
<h3 id="articleHeader5">模块引用</h3>
<p>第一行代码的<code>import Html exposing (text)</code>是模块引用，和ES6中的<code>import {text} from 'Html'</code>非常相似，但有一点需要注意，它同时导入了<code>Html</code><strong>和</strong><code>text</code>，而非只有<code>text</code>，让我们验证一下，修改在线Hello world中的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (text)

main =
  Html.div [] [text &quot;Hello, World!&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (text)

<span class="hljs-title">main</span> =
  <span class="hljs-type">Html</span>.div [] [text <span class="hljs-string">"Hello, World!"</span>]
</code></pre>
<p>我们可以在代码中使用<code>Html.div</code>，证明<code>Html</code>同样被导入了当前作用域。<code>Html.div</code>也是个<a href="http://package.elm-lang.org/packages/elm-lang/html/1.0.0/Html#div" rel="nofollow noreferrer" target="_blank">函数</a>，接收两个数组，前者为属性数组，后者则是子元素。这种创建元素的方式其实非常常见：<a href="https://facebook.github.io/react/docs/top-level-api.html#react.createelement" rel="nofollow noreferrer" target="_blank">React.createElment</a>和<a href="https://github.com/dominictarr/hyperscript#h-tag-attrs-text-elements" rel="nofollow noreferrer" target="_blank">hyperscript</a>都是这个套路。</p>
<blockquote><p>没用过<code>React.createElement</code>？JSX<a href="https://facebook.github.io/react/docs/jsx-in-depth.html#the-transform" rel="nofollow noreferrer" target="_blank">帮你做了</a>而已</p></blockquote>
<p>由于Html包含了几乎所有浏览器标签的渲染函数，一个个写进exposing不免繁琐（想象下有多少原生标签）。让我们再做一点微小的工作，使用<code>exposing(..)</code>来让代码更加简洁。同时，我们尝试给div添加class属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (..)
import Html.Attributes exposing (..)

main =
  div [class &quot;hello&quot;] 
    [ span [] [text &quot;Hello, World!&quot;]
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (..)
<span class="hljs-keyword">import</span> Html.Attributes <span class="hljs-keyword">exposing</span> (..)

<span class="hljs-title">main</span> =
  div [class <span class="hljs-string">"hello"</span>] 
    [ span [] [text <span class="hljs-string">"Hello, World!"</span>]
    ]</code></pre>
<blockquote><p>由于不够严谨，并不推荐在生产代码中使用<code>exposing(..)</code></p></blockquote>
<p>和渲染标签一样，在Elm中属性的创建也是由函数完成的，上例我们使用了<code>Html.Attributes</code>模块的<code>class</code>函数</p>
<h2 id="articleHeader6">Counter</h2>
<p>有了Hello world的经验，让我们再往前一步，创建一个在线版的Counter，这里是React做的效果展示：<a href="https://jsfiddle.net/Kpaxqin/pu53jd89/2/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Kpaxqin/pu53jd89/2/</a><button class="btn btn-xs btn-default ml10 preview" data-url="Kpaxqin/pu53jd89/2/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader7">静态View和数据</h3>
<p>上面我们使用了<code>Html.div</code>来渲染div，同理，我们可以使用<code>Html.button</code>来渲染按钮。稍微修改下刚才的代码即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (..)

main =
  div []
  [button [] [text &quot;-&quot;]
  ,text (toString 1)
  ,button [] [text &quot;+&quot;]
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (..)

<span class="hljs-title">main</span> =
  div []
  [button [] [text <span class="hljs-string">"-"</span>]
  ,text (toString <span class="hljs-number">1</span>)
  ,button [] [text <span class="hljs-string">"+"</span>]
  ]</code></pre>
<p>现在div有三个子元素——两个button和一个数字，一个静态的Counter就这么构建出来了，非常简单。</p>
<p>抽象是程序员的基本素养，把数字<code>1</code>写死在视图里显然是很业余的表现。将渲染视图这个行为封装成函数更加合理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (..)

view model =
  div []
    [ button [] [text &quot;-&quot;]
    ,text (toString model)
    ,button [] [text &quot;+&quot;]
  ]
  
initModel = 3
  
main = view initModel" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (..)

<span class="hljs-title">view</span> model =
  div []
    [ button [] [text <span class="hljs-string">"-"</span>]
    ,text (toString model)
    ,button [] [text <span class="hljs-string">"+"</span>]
  ]
  
<span class="hljs-title">initModel</span> = <span class="hljs-number">3</span>
  
<span class="hljs-title">main</span> = view initModel</code></pre>
<p>在这里我们创建了一个函数，第一行是 <code>函数名 + 参数</code>，和调用一样都使用空格分隔，等号后面的就是函数体，除非一个函数特别简单，多数时候我们倾向于将函数体换行写。</p>
<h3 id="articleHeader8">Update</h3>
<p>有了静态界面，接下来应该让它“动”起来，响应用户操作了。</p>
<p>首先，让我们定义两种操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Msg = Increment | Decrement" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Increment</span> | <span class="hljs-type">Decrement</span></code></pre>
<p>接下来，定义这两种操作如何改变数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update msg model = 
  case msg of 
    Increment -> 
      model + 1
    Decrement ->
      model - 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-title">update</span> msg model = 
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span> 
    <span class="hljs-type">Increment</span> -&gt; 
      model + <span class="hljs-number">1</span>
    <span class="hljs-type">Decrement</span> -&gt;
      model - <span class="hljs-number">1</span></code></pre>
<p>update函数中的msg是我们刚刚定义的Msg类型的消息，model则是当前数据的值，如果你了解Redux的话一定会想：这不就是Reducer的<code>(action, state)=&gt; nextState</code>吗？确实如此，Reducer的概念正是受到了Elm的启发，在最终章我们会继续探讨这个话题</p>
<p>还有一点你可能已经注意到了，无论是前面的view还是这里的update函数，它们都没有return关键字！这是函数式语言非常重要的特点：一切都是expression，都需要有返回值。这强制你去表达<code>要什么</code>，而不是<code>做什么</code>。</p>
<p>简单的例子就是case语句和if语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* case statement */

//elm
case arg of
  value1 -> 
    result1
  value2 ->
    result2
    
//javascript
switch (expression) {
  case value1: 
    /*do sth*/ 
    return result1; 
    break
  case value2: 
    /*do sth*/ 
    return result2; 
    break 

/* if statement */

//elm
//else is required
if 3 > 2 then &quot;cat&quot; else &quot;dog&quot;

//javascript
if (3 > 2) {
  return 'cat'
} else { //else statement is optional
  return 'dog'
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm">/* <span class="hljs-keyword">case</span> statement */

//elm
<span class="hljs-title">case</span> arg <span class="hljs-keyword">of</span>
  value1 -&gt; 
    result1
  value2 -&gt;
    result2
    
//javascript
<span class="hljs-title">switch</span> (expression) {
  <span class="hljs-keyword">case</span> value1: 
    /*do sth*/ 
    return result1; 
    break
  <span class="hljs-keyword">case</span> value2: 
    /*do sth*/ 
    return result2; 
    break 

/* <span class="hljs-keyword">if</span> statement */

//elm
//<span class="hljs-keyword">else</span> is required
<span class="hljs-title">if</span> <span class="hljs-number">3</span> &gt; <span class="hljs-number">2</span> <span class="hljs-keyword">then</span> <span class="hljs-string">"cat"</span> <span class="hljs-keyword">else</span> <span class="hljs-string">"dog"</span>

//javascript
<span class="hljs-title">if</span> (<span class="hljs-number">3</span> &gt; <span class="hljs-number">2</span>) {
  return 'cat'
} <span class="hljs-keyword">else</span> { //<span class="hljs-keyword">else</span> statement is optional
  return 'dog'
}
</code></pre>
<p>对<code>要什么</code>的分解在函数式思维中非常重要，通常会和递归联系起来，本文并不打算深入，建议有兴趣了解的朋友可以学习Elm官网<a href="http://elm-lang.org/examples" rel="nofollow noreferrer" target="_blank">Examples</a>中 functional stuff - recursion 小节下的例子</p>
<h3 id="articleHeader9">动态View</h3>
<p>之前我们创建了一个静态的View，它没有任何事件相关的代码，因此也不可能响应用户行为。接下来让我们补全这一部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (..)
import Html.Events exposing (onClick)

view model =
  div []
    [ button [onClick Decrement] [text &quot;-&quot;]
    ,text (toString model)
    ,button [onClick Increment] [text &quot;+&quot;]
  ]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (..)
<span class="hljs-keyword">import</span> Html.Events <span class="hljs-keyword">exposing</span> (onClick)

<span class="hljs-title">view</span> model =
  div []
    [ button [onClick <span class="hljs-type">Decrement</span>] [text <span class="hljs-string">"-"</span>]
    ,text (toString model)
    ,button [onClick <span class="hljs-type">Increment</span>] [text <span class="hljs-string">"+"</span>]
  ]
</code></pre>
<p>在第2行我们引入了Html.Events模块中<code>onClick</code>函数，<code>onClick Decrement</code>可以理解为当click事件发生时，它会输出一个<code>Decrement</code>消息。</p>
<p>可是向谁输出？输出的消息如何传递给update函数呢？让我们回顾一下所有的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (..)
import Html.Events exposing (onClick)

type Msg = Increment | Decrement

update msg model = 
  case msg of 
    Increment -> 
      model + 1
    Decrement ->
      model - 1

view model =
  div []
    [ button [onClick Decrement] [text &quot;-&quot;]
    ,text (toString model)
    ,button [onClick Increment] [text &quot;+&quot;]
  ]
  
initModel = 3
  
main = view initModel
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (..)
<span class="hljs-keyword">import</span> Html.Events <span class="hljs-keyword">exposing</span> (onClick)

<span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Increment</span> | <span class="hljs-type">Decrement</span>

<span class="hljs-title">update</span> msg model = 
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span> 
    <span class="hljs-type">Increment</span> -&gt; 
      model + <span class="hljs-number">1</span>
    <span class="hljs-type">Decrement</span> -&gt;
      model - <span class="hljs-number">1</span>

<span class="hljs-title">view</span> model =
  div []
    [ button [onClick <span class="hljs-type">Decrement</span>] [text <span class="hljs-string">"-"</span>]
    ,text (toString model)
    ,button [onClick <span class="hljs-type">Increment</span>] [text <span class="hljs-string">"+"</span>]
  ]
  
<span class="hljs-title">initModel</span> = <span class="hljs-number">3</span>
  
<span class="hljs-title">main</span> = view initModel
</code></pre>
<p>目前为止，界面仍然是静态的。我们有了<strong>数据</strong>，<strong>具备行为的视图</strong>，<strong>按行为改变数据的逻辑</strong>，却没有将它们<code>粘合</code>成一个应用。</p>
<p>Elm为我们提供了这样的方法，在Html.App模块中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html.App as App

main = App.beginnerProgram {model = initModel, view = view, update = update}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html.App <span class="hljs-keyword">as</span> App

<span class="hljs-title">main</span> = <span class="hljs-type">App</span>.beginnerProgram {model = initModel, view = view, update = update}</code></pre>
<p>注意这里的方法名叫<code>beginnerProgram</code>，它的参数分别代表了：<code>Model</code>, <code>View</code>, <code>Update</code>，这是，Elm架构的最简形态（不考虑异步等副作用），也是任何符合Elm架构的组件都必不可少的三个部分，完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (..)
import Html.Events exposing (onClick)
import Html.App as App

type Msg = Increment | Decrement

update msg model = 
  case msg of 
    Increment -> 
      model + 1
    Decrement ->
      model - 1

view model =
  div []
    [ button [onClick Decrement] [text &quot;-&quot;]
    , text (toString model)
    , button [onClick Increment] [text &quot;+&quot;]
  ]
  
initModel = 3

main = App.beginnerProgram {model = initModel, view = view, update = update}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (..)
<span class="hljs-keyword">import</span> Html.Events <span class="hljs-keyword">exposing</span> (onClick)
<span class="hljs-keyword">import</span> Html.App <span class="hljs-keyword">as</span> App

<span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Increment</span> | <span class="hljs-type">Decrement</span>

<span class="hljs-title">update</span> msg model = 
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span> 
    <span class="hljs-type">Increment</span> -&gt; 
      model + <span class="hljs-number">1</span>
    <span class="hljs-type">Decrement</span> -&gt;
      model - <span class="hljs-number">1</span>

<span class="hljs-title">view</span> model =
  div []
    [ button [onClick <span class="hljs-type">Decrement</span>] [text <span class="hljs-string">"-"</span>]
    , text (toString model)
    , button [onClick <span class="hljs-type">Increment</span>] [text <span class="hljs-string">"+"</span>]
  ]
  
<span class="hljs-title">initModel</span> = <span class="hljs-number">3</span>

<span class="hljs-title">main</span> = <span class="hljs-type">App</span>.beginnerProgram {model = initModel, view = view, update = update}</code></pre>
<h2 id="articleHeader10">小结</h2>
<p>通过这个简单的Counter相信你已经对Elm有了初步的了解，如果回顾上面的代码你会发现其实函数式语言并不是那么晦涩或高深。</p>
<p>下一章中我们将会了解Elm的类型，并用类型优化Counter的代码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Elm入门实践（一）——基础篇

## 原文链接
[https://segmentfault.com/a/1190000005701562](https://segmentfault.com/a/1190000005701562)

