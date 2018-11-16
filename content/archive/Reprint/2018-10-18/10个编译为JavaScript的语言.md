---
title: 10个编译为JavaScript的语言
hidden: true
categories: [reprint]
slug: dc09b6b6
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>现代应用相比普通的网页有<a href="https://www.sitepoint.com/anatomy-of-a-modern-javascript-application/">不同的要求</a>。但是浏览器是一个有着一套（大部分）固定可用的技术的平台，JavaScript依然是web应用的核心语言；任何需要在浏览器上跑的应用都需要使用这种语言。</p>
<p>我们都知道Javascript并不是最好的语言，特别是在复杂的应用中，它可能不太能胜任。为了避免这种情况，一些新的语言或现有语言的编译器被创造出来，你不用写一行Javascript或者考虑这种语言的局限，就能生产在浏览器能运行的代码。</p>
<p>这篇文章包括了十种有趣的语言能够编译为Javascript，在浏览器或者Node.js中被执行。</p>
<p>--ADVERTISEMENT--</p>
<h2>Dart</h2>
<p>Dart是一个典型的面向对象的语言，任何东西都是一个对象并且任何对象都是一个类的实例（对象也可以表现为函数）。它的特殊性用于打造面向浏览器，服务器和移动设备的应用。 它由谷歌来维护，是用于驱动下一代的AdWords UI。AdWords UI是谷歌盈利的重要产品，这也证明了它在体量上的强大。</p>
<p>这种语言可以编译为JavaScript用于浏览器，或者直接通过Dart VM解释，这样也可以允许你构建服务端应用。移动应用可以通过Flutter SDK创建。</p>
<p>复杂的应用还需要一系列特别为任务所设计的成熟的库和语言特性，Dart这些都有。举例来说一个流行的库是<a href="https://webdev.dartlang.org/angular/">AngularDart</a>，一个Dart版本的Angular。</p>
<p>它允许你写非侵入式的类型安全的代码，但是这不是必须的，因为他们可以自动检测类型。它可以允许你快速构建原型而不用过于思考细节，一旦你需要的时候，你可以加入类型让它更健壮。</p>
<p>至于在VM中的并发编程，相比与共享内存线程（Dart是单线程的）,Dart使用所谓的<em>Isolates</em>,有它自己的堆内存，而交流是通过传递信息。在浏览器上，情况就有点不一样了：相比与创建一个新的<em>isolates</em>,你创建一个新的<em>Workers</em>。</p>
<pre><code class="hljs dart"><span class="hljs-comment">// Example extracted from dartlang.org</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'dart:async'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'dart:math'</span> show Random;

main() <span class="hljs-keyword">async</span> {
  <span class="hljs-built_in">print</span>(<span class="hljs-string">'Compute π using the Monte Carlo method.'</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> estimate <span class="hljs-keyword">in</span> computePi()) {
    <span class="hljs-built_in">print</span>(<span class="hljs-string">'π ≅ $estimate'</span>);
  }
}

<span class="hljs-comment"><span class="markdown">/// Generates </span>a<span class="markdown"> stream of increasingly accurate estimates of π.</span></span>
Stream&lt;<span class="hljs-built_in">double</span>&gt; computePi({<span class="hljs-built_in">int</span> batch: <span class="hljs-number">1000000</span>}) <span class="hljs-keyword">async</span>* {
  <span class="hljs-keyword">var</span> total = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">while</span> (<span class="hljs-keyword">true</span>) {
    <span class="hljs-keyword">var</span> points = generateRandom().take(batch);
    <span class="hljs-keyword">var</span> inside = points.where((p) =&gt; p.isInsideUnitCircle);
    total += batch;
    count += inside.length;
    <span class="hljs-keyword">var</span> ratio = count / total;
    <span class="hljs-comment">// Area of a circle is A = π⋅r², therefore π = A/r².</span>
    <span class="hljs-comment">// So, when given random points with x ∈ &lt;0,1&gt;,</span>
    <span class="hljs-comment">// y ∈ &lt;0,1&gt;, the ratio of those inside a unit circle</span>
    <span class="hljs-comment">// should approach π / 4\. Therefore, the value of π</span>
    <span class="hljs-comment">// should be:</span>
    <span class="hljs-keyword">yield</span> ratio * <span class="hljs-number">4</span>;
  }
}

<span class="hljs-built_in">Iterable</span>&lt;Point&gt; generateRandom([<span class="hljs-built_in">int</span> seed]) <span class="hljs-keyword">sync</span>* {
  <span class="hljs-keyword">final</span> random = <span class="hljs-keyword">new</span> Random(seed);
  <span class="hljs-keyword">while</span> (<span class="hljs-keyword">true</span>) {
    <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> Point(random.nextDouble(), random.nextDouble());
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
  <span class="hljs-keyword">final</span> <span class="hljs-built_in">double</span> x, y;
  <span class="hljs-keyword">const</span> Point(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y);
  <span class="hljs-built_in">bool</span> <span class="hljs-keyword">get</span> isInsideUnitCircle =&gt; x * x + y * y &lt;= <span class="hljs-number">1</span>;
}


</code></pre><p><a href="https://www.dartlang.org/guides/get-started">Get started with Dart</a></p>
<h2>TypeScript</h2>
<p><a href="https://www.sitepoint.com/introduction-to-typescript/">TypeScript</a> 是Javascript的超集；一个有效的Javascript项目也是一个有效的TypeScript项目只是添加了静态类型。编译器也可以作为ES2015+到当前实现的转译器，这样你总是能得到最新的特性。</p>
<p>不同于其他语言，TypeScript保持了Javascript完整的精神，只是此外添加了增加代码可靠性的功能。这些功能就是类型注释和其他类型相关的功能，得益于专业工具像是静态分析器和其他工具在重构过程的加入，这些功能使写Javascript更加有趣。并且，类型的加入改善了你的应用不同组件之间的接口。</p>
<p>类型诊断是支持性的，你不必从一开始就写所有的类型。你可以先快速的写代码，然后再加入类型来让代码更稳定。</p>
<p>TypeScript同样也支持高级类型，像是交叉类型，联合类型，类型别名，可辨识联合和类型保护。你可以在<a href="https://www.typescriptlang.org/docs">TypeScript Documentation</a>网站的<a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html">Advanced Types</a>页面查看。</p>
<p>如果你使用React的话，通过添加React类型，JSX也是支持的。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">class</span> Person {
    <span class="hljs-keyword">private</span> name: <span class="hljs-built_in">string</span>;
    <span class="hljs-keyword">private</span> age: <span class="hljs-built_in">number</span>;
    <span class="hljs-keyword">private</span> salary: <span class="hljs-built_in">number</span>;

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">name: <span class="hljs-built_in">string</span>, age: <span class="hljs-built_in">number</span>, salary: <span class="hljs-built_in">number</span></span>) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
        <span class="hljs-keyword">this</span>.salary = salary;
    }

    toString(): <span class="hljs-built_in">string</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${this.name}</span> (<span class="hljs-subst">${this.age}</span>) (<span class="hljs-subst">${this.salary}</span>)`</span>;
    }
}


</code></pre><p>——</p>
<h2>Elm</h2>
<p>Elm是一个可以编译成JS，HTML和JS的纯函数式编程语言。你可以只通过Elm创建一个完整的网站，这使得它是一个对像React这样的Javascript框架的一个很好的代替。通过它创建的应用自动使用了虚拟DOM库，使得它很快。一个大的加分项是内建的结构让你忘记数据流而是关注于数据声明和逻辑。</p>
<p>在Elm中，所有函数都是纯粹的，这意味着他们总是对一个给予的输入返回一个相同的输出。T他们不能做其他任何事情，除非你指定。举例来说，获取一个远程的API你会创建一个<em>command</em>函数来通讯外部世界，和一个 <em>subscriptions</em> 函数监听回复。另一个纯粹的点是，值是不可变的，当你需要什么的时候，你创建一个新值而不是改变它。</p>
<p>ELm的接受可以是平缓的；可以使用<em>ports</em>来和Javascript或其他库沟通。虽然Elm还没有到达版本1，它已经用于复杂大型的应用了，这使得它对复杂应用是一个可行的解决方案。</p>
<p>ELm其中一个吸引人的功能是初学者友好的编译器，它生成帮助你修复你的代码的信息，而不是产生难以阅读的信息。如果你正在学习这门语言，编译器本身就是一个大的帮助。</p>
<pre><code class="hljs elm"><span class="hljs-keyword">module</span> Main <span class="hljs-keyword">exposing</span> (..)

<span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (..)

<span class="hljs-comment">-- MAIN</span>

<span class="hljs-title">main</span> : <span class="hljs-type">Program</span> <span class="hljs-type">Never</span> <span class="hljs-type">Model</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">main</span> =
    <span class="hljs-type">Html</span>.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

<span class="hljs-comment">-- INIT</span>

<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">Model</span> = <span class="hljs-type">String</span>

<span class="hljs-title">init</span> : ( <span class="hljs-type">Model</span>, <span class="hljs-type">Cmd</span> <span class="hljs-type">Msg</span> )
<span class="hljs-title">init</span> = ( <span class="hljs-string">"Hello World!"</span>, <span class="hljs-type">Cmd</span>.none )

<span class="hljs-comment">-- UPDATE</span>

<span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span>
    = <span class="hljs-type">DoNothing</span>

<span class="hljs-title">update</span> : <span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">Model</span> -&gt; ( <span class="hljs-type">Model</span>, <span class="hljs-type">Cmd</span> <span class="hljs-type">Msg</span> )
<span class="hljs-title">update</span> msg model =
    <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span>
        <span class="hljs-type">DoNothing</span> -&gt;
            ( model, <span class="hljs-type">Cmd</span>.none )

<span class="hljs-comment">-- VIEW</span>

<span class="hljs-title">view</span> : <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Html</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">view</span> model =
    div [] [text model]

<span class="hljs-comment">-- SUBSCRIPTIONS</span>

<span class="hljs-title">subscriptions</span> : <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Sub</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">subscriptions</span> model =
    <span class="hljs-type">Sub</span>.none


</code></pre><p><a href="https://www.sitepoint.com/functional-reactive-programming-elm-introduction/">Get Started with Elm</a></p>
<h2>PureScript</h2>
<p><a href="http://www.purescript.org/">PureScript</a> 是一个纯函数强类型的编程语言，由Phil Freeman创造。它旨在与现有的JavaScript库进行很好的兼容，与Haskell精神上类似，但是核心保留了Javascript。</p>
<p>PureScript一个重要的点是它的极简主义。它没有包含任何在其他语言认为很重要的功能库。比如，相比于在编译器中包含generators和promises，你可以自己使用指定的库来完成这个任务。你可以选择你想要的功能的实现，当使用PureScript的时候需要高效和个性化的经验，能使生成的代码尽可能的小。</p>
<p>这个编译器另一个重要的功能是构建出清晰可读的代码，能够兼容Javascript包括库和工具。</p>
<p>和其他语言一样，PureScript有它自己的构建工具称为Pulp，可以和Gulp做对比，只是用这个语言写的。</p>
<p>至于类型系统，不同于另一个ML类的语言Elm，PureScript支持更先进的类型特性比如<a href="https://en.wikipedia.org/wiki/Kind_%28type_theory%29">高级类类型</a>和类型类，这些是从Haskell来的特性，允许创建复杂的抽象。</p>
<pre><code class="hljs xl">module Main <span class="hljs-keyword">where</span>

<span class="hljs-keyword">import</span> Prelude
<span class="hljs-keyword">import</span> Data.Foldable (fold)
<span class="hljs-keyword">import</span> TryPureScript

main =
    render $ fold
      [ h1 (<span class="hljs-keyword">text</span> <span class="hljs-string">"Try PureScript!"</span>)
      , p (<span class="hljs-keyword">text</span> <span class="hljs-string">"Try out the examples below, or create your own!"</span>)
      , h2 (<span class="hljs-keyword">text</span> <span class="hljs-string">"Examples"</span>)
      , list (map fromExample examples)
      ]
  <span class="hljs-keyword">where</span>
    fromExample { <span class="hljs-built_in">title</span>, gist } =
      link (<span class="hljs-string">"?gist="</span> &lt;&gt; gist) (<span class="hljs-keyword">text</span> <span class="hljs-built_in">title</span>)

    examples =
      [ { <span class="hljs-built_in">title</span>: <span class="hljs-string">"Algebraic Data Types"</span>
        , gist: <span class="hljs-string">"37c3c97f47a43f20c548"</span>
        }
      , { <span class="hljs-built_in">title</span>: <span class="hljs-string">"Loops"</span>
        , gist: <span class="hljs-string">"cfdabdcd085d4ac3dc46"</span>
        }
      , { <span class="hljs-built_in">title</span>: <span class="hljs-string">"Operators"</span>
        , gist: <span class="hljs-string">"3044550f29a7c5d3d0d0"</span>
        }
      ]


</code></pre><p><a href="https://github.com/purescript/documentation/blob/master/guides/Getting-Started.md">Get Started with PureScript</a></p>
<h2>CoffeeScript</h2>
<p>CoffeeScript是一个旨在暴露JavaScript的精华并提供一个干净的语法并在合适地方保留语义的语言。虽然近年来这个语言的热度在下降，它正在改变方向并且现在有一个新的大版本支持ES2015+特性。</p>
<p>你用CoffeeScript写的代码直接转化为可读的Javascript代码并且兼容现有的库。从2版本开始，编译器会产生兼容最新版本的ECMAScript的代码，比如，每次你使用<code>class</code>，你就在Javascript中得到<code>class</code>。并且，如果你使用React，好消息是，JSX兼容CoffeeScript。</p>
<p>这个编译器有一个十分有特色的功能是有能力处理用<a href="https://en.wikipedia.org/wiki/Literate_programming">literate style</a>写的代码。<code>literate style</code>相比于强调代码而把注释作为添加这种方式，而是你需要在一开始就写注释，代码只是偶尔出现。这种写代码的方式由Donald Knuth推荐，使得一个代码文件非常像一个技术文档。</p>
<p>相比于其他语言，CoffeeScript代码可以在浏览器中用一个库直接执行。所以如果你想要写一个快速测试，你可以写你的代码在一个<code>text/coffeescript</code>script标签中，并且引入编译器，这样就可以把你的代码轻易的转化为JavaScript了。</p>
<pre><code class="hljs makefile"><span class="hljs-comment"># Assignment:</span>
number   = 42
opposite = true

<span class="hljs-comment"># Conditions:</span>
number = -42 if opposite

<span class="hljs-comment"># Functions:</span>
square = (x) -&gt; x * x

<span class="hljs-comment"># Arrays:</span>
list = [1, 2, 3, 4, 5]

<span class="hljs-comment"># Objects:</span>
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -&gt; x * square x

<span class="hljs-comment"># Splats:</span>
race = (winner, runners...) -&gt;
  print winner, runners

<span class="hljs-comment"># Existence:</span>
alert <span class="hljs-string">"I knew it!"</span> if elvis?

<span class="hljs-comment"># Array comprehensions:</span>
cubes = (math.cube num for num in list)


</code></pre><p><a href="http://coffeescript.org/v2/#coffeescript-2">Get Started with CoffeeScript 2</a></p>
<h2>ClojureScript</h2>
<p>ClojureScript是一个转化Clojure编程语言为JavaScript的编译器。Clojure是一个多用途的函数式原因伴随着动态类型和不可变数据结构的支持。</p>
<p>这是这个列表中唯一一个属于Lisp家族的语言，自然有着它们共同的特性。举例来说，代码可以作为数据，支持宏系统，使得元编程成为可能。 Unlike other Lisps, Clojure has support for immutable data structures, making the management of side-effects easier.不同于其他类Lisp，Clojure支持不可变数据结构，使得函数副作用的管理更容易。</p>
<p>这个语法对初学者看起吓人，因为圆括号的使用。但这样使用是经过深思熟虑的，并且在长远看来你一定会感谢这种语法的。语法的极简和抽象能力使得Lisp成为一个解决高抽象问题的强力工具。</p>
<p>虽然Clojure主要是一个函数式语言，但是不像PureScript或者Elm那样纯粹。函数副作用还是会发生，但是其他函数式特性也会存在。</p>
<p>ClojureScript使用Google Closure做代码优化并且也兼容现有的JavaScript库。</p>
<pre><code class="hljs clojure"><span class="hljs-comment">; Extracted from https://github.com/clojure/clojurescript/blob/master/samples/dom/src/dom/test.cljs</span>

(<span class="hljs-name"><span class="hljs-builtin-name">ns</span></span> dom.test
  (<span class="hljs-symbol">:require</span> [clojure.browser.event <span class="hljs-symbol">:as</span> event]
            [clojure.browser.dom   <span class="hljs-symbol">:as</span> dom]))

(<span class="hljs-name"><span class="hljs-builtin-name">defn</span></span> log [&amp; args]
  (<span class="hljs-name">.log</span> js/console (<span class="hljs-name"><span class="hljs-builtin-name">apply</span></span> pr-str args)))

(<span class="hljs-name"><span class="hljs-builtin-name">defn</span></span> log-obj [obj]
  (<span class="hljs-name">.log</span> js/console obj))

(<span class="hljs-name"><span class="hljs-builtin-name">defn</span></span> log-listener-count []
  (<span class="hljs-name">log</span> <span class="hljs-string">"listener count: "</span> (<span class="hljs-name">event/total-listener-count</span>)))

(<span class="hljs-name"><span class="hljs-builtin-name">def</span></span> source      (<span class="hljs-name">dom/get-element</span> <span class="hljs-string">"source"</span>))
(<span class="hljs-name"><span class="hljs-builtin-name">def</span></span> destination (<span class="hljs-name">dom/get-element</span> <span class="hljs-string">"destination"</span>))

(<span class="hljs-name">dom/append</span> source
            (<span class="hljs-name">dom/element</span> <span class="hljs-string">"Testing me "</span>)
            (<span class="hljs-name">dom/element</span> <span class="hljs-string">"out!"</span>))

(<span class="hljs-name"><span class="hljs-builtin-name">def</span></span> success-count (<span class="hljs-name"><span class="hljs-builtin-name">atom</span></span> <span class="hljs-number">0</span>))

(<span class="hljs-name">log-listener-count</span>)

(<span class="hljs-name">event/listen</span> source
              <span class="hljs-symbol">:click</span>
              (<span class="hljs-name"><span class="hljs-builtin-name">fn</span></span> [e]
                (<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> [i (<span class="hljs-name"><span class="hljs-builtin-name">swap!</span></span> success-count inc)
                      e (<span class="hljs-name">dom/element</span> <span class="hljs-symbol">:li</span>
                                     {<span class="hljs-symbol">:id</span> <span class="hljs-string">"testing"</span>
                                      <span class="hljs-symbol">:class</span> <span class="hljs-string">"test me out please"</span>}
                                     <span class="hljs-string">"It worked!"</span>)]
                  (<span class="hljs-name">log-obj</span> e)
                  (<span class="hljs-name">log</span> i)
                  (<span class="hljs-name">dom/append</span> destination
                              e))))

(<span class="hljs-name">log-obj</span> (<span class="hljs-name">dom/element</span> <span class="hljs-string">"Text node"</span>))
(<span class="hljs-name">log-obj</span> (<span class="hljs-name">dom/element</span> <span class="hljs-symbol">:li</span>))
(<span class="hljs-name">log-obj</span> (<span class="hljs-name">dom/element</span> <span class="hljs-symbol">:li</span> {<span class="hljs-symbol">:class</span> <span class="hljs-string">"foo"</span>}))
(<span class="hljs-name">log-obj</span> (<span class="hljs-name">dom/element</span> <span class="hljs-symbol">:li</span> {<span class="hljs-symbol">:class</span> <span class="hljs-string">"bar"</span>} <span class="hljs-string">"text node"</span>))
(<span class="hljs-name">log-obj</span> (<span class="hljs-name">dom/element</span> [<span class="hljs-symbol">:ul</span> [<span class="hljs-symbol">:li</span> <span class="hljs-symbol">:li</span> <span class="hljs-symbol">:li</span>]]))
(<span class="hljs-name">log-obj</span> (<span class="hljs-name">dom/element</span> <span class="hljs-symbol">:ul</span> [<span class="hljs-symbol">:li</span> <span class="hljs-symbol">:li</span> <span class="hljs-symbol">:li</span>]))
(<span class="hljs-name">log-obj</span> (<span class="hljs-name">dom/element</span> <span class="hljs-symbol">:li</span> {} [<span class="hljs-symbol">:ul</span> {} [<span class="hljs-symbol">:li</span> <span class="hljs-symbol">:li</span> <span class="hljs-symbol">:li</span>]]))
(<span class="hljs-name">log-obj</span> (<span class="hljs-name">dom/element</span> [<span class="hljs-symbol">:li</span> {<span class="hljs-symbol">:class</span> <span class="hljs-string">"baz"</span>} [<span class="hljs-symbol">:li</span> {<span class="hljs-symbol">:class</span> <span class="hljs-string">"quux"</span>}]]))

(<span class="hljs-name">log-obj</span> source)
(<span class="hljs-name">log-listener-count</span>)


</code></pre><p><a href="https://clojurescript.org/guides/quick-start">Get Started with ClojureScript</a></p>
<h2>Scala.js</h2>
<p>Scala.js是一个将Scala编程语言转化为JavaScript的编译器。Scala是一个旨在融合面向对象和函数式编程两种思想到一种语言，为了打造容易接受的强力的工具</p>
<p>作为一个强类型语言，你会从它部分类型推断这种灵活的类型系统中受益。大部分的值会被推断，但函数参数仍然需要明确的类型注释。</p>
<p>虽然许多通常的面向对象模式都支持（比如任何值都是一个对象并且操作是一个方法调用），但你也有函数式特性比如一等函数和不可变数据结构。</p>
<p>Scala.js其中一个特殊的优势是，你可以毫不费力的从你熟悉的面向对象开始向更函数式的转移，以你自己的需要和步调。同样的，现存的JavaScript代码和库和你的Scala代码兼容。</p>
<p>Scala的初学者会发现这个语言和JavaScript并没有多大不同，对比下面两个意思一样的代码：</p>
<pre><code class="hljs accesslog">// JavaScript
var xhr = new XMLHttpRequest();

xhr.open(<span class="hljs-string">"<span class="hljs-keyword">GET</span>"</span>,
  <span class="hljs-string">"https://api.twitter.com/1.1/search/"</span> +
  <span class="hljs-string">"tweets.json?q=%23scalajs"</span>
);
xhr.onload = (e) =&gt; {
  if (xhr.status === <span class="hljs-number">200</span>) {
    var r = JSON.parse(xhr.responseText);
    $(<span class="hljs-string">"#tweets"</span>).html(parseTweets(r));
  }
};
xhr.send();


</code></pre><pre><code class="hljs accesslog">// Scala.js
val xhr = new XMLHttpRequest()

xhr.open(<span class="hljs-string">"<span class="hljs-keyword">GET</span>"</span>,
  <span class="hljs-string">"https://api.twitter.com/1.1/search/"</span> +
  <span class="hljs-string">"tweets.json?q=%23scalajs"</span>
)
xhr.onload = { (e: Event) =&gt;
  if (xhr.status == <span class="hljs-number">200</span>) {
    val r = JSON.parse(xhr.responseText)
    $(<span class="hljs-string">"#tweets"</span>).html(parseTweets(r))
  }
}
xhr.send()


</code></pre><p><a href="https://www.scala-js.org/tutorial/basic/">Get Started with Scala.js</a></p>
<h2>Reason</h2>
<p>Reason是一个由Facebook创造和维护的语言，它为OCaml编译器提供了新的语法，并且代码可以转换成JavaScript和原生代码。</p>
<p>作为ML家族的一部分并且自己本身是函数式语言，它天生提供了强大但是灵活的伴随类型推断的类型系统，代数数据类型和模式匹配。它也支持不可变数据类型和参数多态（也被其他语言称为泛型），但是在OCaml中，也是支持面向对象编程的。</p>
<p>通过 <a href="https://github.com/BuckleScript/bucklescript">bucklescript</a>绑定就可以使用现存的JavaScript库。你也可以在你的Reason代码旁边混入你的JavaScript。插入的JavaScript代码不会严格的检查，但作为快速修复和原因也是不错的。</p>
<p>如果你是一个React开发者，<a href="https://github.com/reasonml/reason-react">绑定是可能的</a>，并且这个语言也支持JSX。</p>
<pre><code class="hljs rust"><span class="hljs-comment">/* A type variant being pattern matched */</span>

<span class="hljs-keyword">let</span> possiblyNullValue1 = <span class="hljs-literal">None</span>;
<span class="hljs-keyword">let</span> possiblyNullValue2 = <span class="hljs-literal">Some</span> <span class="hljs-string">"Hello@"</span>;

switch possiblyNullValue2 {
| <span class="hljs-literal">None</span> =&gt; print_endline <span class="hljs-string">"Nothing to see here."</span>
| <span class="hljs-literal">Some</span> message =&gt; print_endline message
};

<span class="hljs-comment">/* Parametrized types */</span>

<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">universityStudent</span></span> = {gpa: float};
<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">response</span></span> <span class="hljs-symbol">'studentType</span> = {status: int, student: <span class="hljs-symbol">'studentType</span>};
<span class="hljs-keyword">let</span> result: response universityStudent = fetchDataFromServer ();

<span class="hljs-comment">/* A simple typed object */</span>

<span class="hljs-class"><span class="hljs-keyword">type</span> <span class="hljs-title">payload</span></span> = Js.t {.
  name: string,
  age: int
};
<span class="hljs-keyword">let</span> obj1: payload = {<span class="hljs-string">"name"</span>: <span class="hljs-string">"John"</span>, <span class="hljs-string">"age"</span>: <span class="hljs-number">30</span>};


</code></pre><p><a href="https://reasonml.github.io/guide/javascript/quickstart">Get Started with Reason</a></p>
<h2>Haxe</h2>
<p>Haxe是一个多范式编程语言，并且它的编译器可以产生二进制或者其他语言的源代码。</p>
<p>虽然Haxe提供了严格的类型系统并带有类型推断，它也可以作为动态语言只要目标语言支持。同样的，它也支持多种的编程风格比如面向对象，泛型，函数式。</p>
<p>当你写Haxe代码的时候，你可以为编译指定多个平台或语言，但不需要对代码做什么大的改变。指定目标的代码块也支持。</p>
<p>你可以用Haxe同时写前端和后端用同样的代码，并且通过<a href="https://haxe.org/manual/std-remoting-connection.html">Haxe Remoting</a>进行沟通，既可以同步连接也可以异步连接。</p>
<p>不出所料，Haxe代码可以兼容现有的库但也提供了成熟的标准库。</p>
<pre><code class="hljs zephir"><span class="hljs-comment">// Example extracted from http://code.haxe.org</span>

extern <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Database</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">new</span><span class="hljs-params">()</span></span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProperty</span>&lt;<span class="hljs-title">T</span>&gt;<span class="hljs-params">(property:Property&lt;T&gt;)</span>:<span class="hljs-title">T</span></span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setProperty</span>&lt;<span class="hljs-title">T</span>&gt;<span class="hljs-params">(property:Property&lt;T&gt;, value:T)</span>:<span class="hljs-title">Void</span></span>;
}

<span class="hljs-keyword">abstract</span> Property&lt;T&gt;(String) {
  <span class="hljs-keyword">public</span> inline <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">new</span><span class="hljs-params">(name)</span> </span>{
    this = name;
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Main</span> </span>{
  <span class="hljs-keyword">static</span> inline <span class="hljs-keyword">var</span> PLAYER_NAME = <span class="hljs-keyword">new</span> Property&lt;String&gt;(<span class="hljs-string">"playerName"</span>);
  <span class="hljs-keyword">static</span> inline <span class="hljs-keyword">var</span> PLAYER_LEVEL = <span class="hljs-keyword">new</span> Property&lt;<span class="hljs-keyword">Int</span>&gt;(<span class="hljs-string">"playerLevel"</span>);

  <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> db = <span class="hljs-keyword">new</span> Database();

    <span class="hljs-keyword">var</span> playerName = db.getProperty(PLAYER_NAME);
    trace(playerName.toUpperCase());

    db.setProperty(PLAYER_LEVEL, <span class="hljs-number">1</span>);
  }
}


</code></pre><p><a href="https://haxe.org/documentation/introduction/language-introduction.html">Get Started with Haxe</a></p>
<h2>Nim</h2>
<p>Nim是一个静态类型，多范式编程语言，有着极简风格与空格敏感的语法，编译为C，C++和JavaScript。</p>
<p>这个语言本身很小，但它的元编程能力会吸引你自己去实现一些在别的语言内置的功能。这些构建模块有宏，模板和泛型，通过它们你可以实现不论是简单的功能还是不同的泛型。这使得Nim成为一个非常通用的语言可以适应你的需求，有着Lisp的精髓。</p>
<p>Nim的语法抽象功能允许你去让语言去适应你的功能，让真正的<a href="https://en.wikipedia.org/wiki/Domain-specific_language">DSLs</a>成为可能。如果你有着专门的任务需要处理，你可以获得更高级的表达性。</p>
<pre><code class="hljs tcl"><span class="hljs-comment"># Reverse a string</span>
<span class="hljs-keyword">proc</span><span class="hljs-title"> reverse(s:</span> string):<span class="hljs-title"> string</span> =<span class="hljs-title">
  result</span> = ""<span class="hljs-title">
  for</span> i<span class="hljs-title"> in</span> countdown(high(s), 0):<span class="hljs-title">
    result.add</span> s[i]<span class="hljs-title">

var</span> str1 = "Reverse<span class="hljs-title"> This!"</span>
echo "Reversed: ",<span class="hljs-title"> reverse(str1)</span>

#<span class="hljs-title"> Using</span> templates<span class="hljs-title">
template</span> genType(name,<span class="hljs-title"> fieldname:</span> expr,<span class="hljs-title"> fieldtype:</span> typedesc) =<span class="hljs-title">
  type</span>
<span class="hljs-title">    name</span> =<span class="hljs-title"> object</span>
<span class="hljs-title">      fieldname:</span> fieldtype<span class="hljs-title">

genType(Test,</span> foo,<span class="hljs-title"> int)</span>
<span class="hljs-title">
var</span> x =<span class="hljs-title"> Test(foo:</span> 4566)<span class="hljs-title">
echo(x.foo)</span> # 4566


</code></pre><p><a href="https://nim-lang.org/documentation.html">Get Started with Nim</a></p>
<h2>Conclusion</h2>
<p>如果JavaScript不是你最喜欢的语言，你依然可以创建web应用而不用忍受这个技术的缺点。可供选择的范围很广，从纯粹的函数式语言，比如PureScript，到面向对象语言，比如Dart。并且如果你想要不只是语言的转化，你也可以选择比如Elm，Elm提供像是虚拟DOM和内置的架构这样的工具。</p>
<p>你是否有尝试了这篇文章的任何一种语言，又或者你有自己的推荐？请在评论中让我知道！</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/10-languages-that-compile-to-javascript](https://www.zcfy.cc/article/10-languages-that-compile-to-javascript)
原文标题: 10个编译为JavaScript的语言
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
