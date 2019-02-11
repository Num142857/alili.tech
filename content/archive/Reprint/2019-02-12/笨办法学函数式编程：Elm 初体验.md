---
title: '笨办法学函数式编程：Elm 初体验' 
date: 2019-02-12 2:30:12
hidden: true
slug: 7wvxkyaw52a
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>翻译自：<a href="https://gist.github.com/ohanhi/0d3d83cf3f0d7bbea9db" rel="nofollow noreferrer">https://gist.github.com/ohanhi/0d3d83cf3f0d7bbea9db</a><br>原作者： Ossi Hanhinen, <a href="https://twitter.com/ohanhi" rel="nofollow noreferrer">@ohanhi</a><br>翻译：Integ, <a href="https://segmentfault.com/u/integ">@integ</a><br>爱心支持 <a href="http://futurice.com/" rel="nofollow noreferrer">Futurice</a> <span class="emoji emoji-green_heart"></span>.<br>授权协议 <a href="https://creativecommons.org/licenses/by/4.0/" rel="nofollow noreferrer">CC BY 4.0</a>.</p></blockquote>
<h2>前言</h2>
<p>不久以前一个好朋友给我安利了 <a href="https://gist.github.com/staltz/868e7e9bc2a7b8c1f754" rel="nofollow noreferrer"><em>响应式编程（Reactive Programming）</em></a>。不写 <em>函数式响应编程</em> 简直就是犯罪 -- 很明显函数式方法大幅弥补了响应编程的不足。它如何做到的，我并不知道，所以我决定学一下这些东西。</p>
<p>通过了解自己，我很快发现只有用它解决一些实际的问题，我才能领会它的观念模式。写了这么多年 Javascript，我本来早就可以开始使用 RxJS 的。但再一次，因为我了解自己，并且我发现它会给我太多空间来违背常理。我需要一个强制我用函数式思维来解决任何问题的工具，正在这时 Elm 出现了。</p>
<h3>Elm 是什么？</h3>
<p><a href="http://elm-lang.org/" rel="nofollow noreferrer">Elm</a> 是一种编程语言，它会被编译为 HTML5: HTML, CSS 和 JavaScript。根据你显示输出结果的不同，它可能是一个内置了对象的 <code>&lt;canvas&gt;</code>，或者一个更传统的网页。让我重复一遍，Elm 是一种语言，它会被编译为 <em>三种语言</em> 来构建 web 应用。而且，它是一个拥有强类型和 不可变（immutable）数据结构的函数式语言。</p>
<p>好了，你可以猜到我并不是这个领域的专家，为了防止你走丢，我专门在这篇文章的最后列出了下面的术语解释：<a>附录:术语表</a>.</p>
<h2>I. 限制是有益的</h2>
<p>我决定尝试使用 Elm 制作一个类似《太空侵略者》的游戏。让我们站在玩家的视角思考一下它是怎么工作的。</p>
<ul>
<li><p>在屏幕下部有一艘代表着玩家的飞船</p></li>
<li><p>玩家可以通过相应的方向键控制飞船左右移动</p></li>
<li><p>玩家可以按向上键发射子弹射击</p></li>
</ul>
<p>好了，我们切换到飞船的视角，再来看下</p>
<ul>
<li><p>飞船有一个一维的位置坐标</p></li>
<li><p>飞船可以获得一个速度（向左或向右）</p></li>
<li><p>飞船根据它的速度改变位置</p></li>
<li><p>飞船可能被击中</p></li>
</ul>
<p>这些基本上给了我一个飞船的数据结构的定义，或者说一个 Elm 术语中的 <a href="http://elm-lang.org/guide/core-language#records" rel="nofollow noreferrer">记录</a>。尽管并非必须，我还是喜欢把它定义为一个 aliases 类型，这样就可以使用 <code>Ship</code> 来表示它的类型了。</p>
<pre><code class="elm">type alias Ship =
  { position : Float  -- just 1 degree of freedom (left-right)
  , velocity : Float  -- either 0, 1 or -1
  , shooting : Bool
  }</code></pre>
<p>太棒了，现在让我们创建一个飞船吧。</p>
<pre><code class="elm">initShip : Ship   -- this is the type annotation
initShip =
  { position = 0      -- the type is Float
  , velocity = 0      -- Float
  , shooting = False  -- Bool
  }</code></pre>
<p>所以，我们已经到了一个有趣的地步。再看一遍上面的定义，它是一个简单的陈述还是一个函数定义？无所谓！<code>initShip</code> 既可以被认为只是字面量的定义纪录，也可以看作一个永远返回这些纪录的函数。因为函数是纯函数，并且它的数据结构是不可改变的，所以也没有办法区分他们，Wow，cool。</p>
<blockquote><p><em>旁注：</em>如果你像我一样，你会思考如果试着重新定义 <code>initShip</code> 会发生什么。好的，会发生一个编译时错误：“命名冲突：只能有一个对 <code>foo</code> 的定义”。</p></blockquote>
<p>好，我们来开始移动飞船！我记得高中时学过 <code>s = v*dt</code> ，或者说距离等于速度乘以时间差。所以这就是我如何改变我的飞船。在 Elm 中会像下面这样实现。</p>
<pre><code class="elm">applyPhysics : Float -&gt; Ship -&gt; Ship
applyPhysics dt ship =
  { ship | position = ship.position + ship.velocity * dt }</code></pre>
<p>类型标记描述了：给出一个 <code>Float</code> 和一个 <code>Ship</code>，我会返回一个 <code>Ship</code>，甚至：给出一个 <code>Float</code>，我会返回 <code>Ship -&gt; Ship</code>。例如，<code>(applyPhysics 16.7)</code> 实际上会返回一个可以传入一个 <code>Ship</code> 参数的函数，并且得到应用了物理方程的飞船作为返回值。这个特性叫做 <a href="http://en.wikipedia.org/wiki/Currying" rel="nofollow noreferrer">柯里化</a> 而且所有 Elm 函数自动这样运作。</p>
<blockquote><p><em>旁注：</em> 然而，这一切有什么意义呢？好吧，假设我要创建一个由两列数据组成的表格。我知道如何构建它类似“给出一个列表和一个简单的值，从列表中找出匹配的项”或者直接写作 <code>findMatches : List -&gt; Item -&gt; List</code>。但是我需要把一些先前已经知道的列表映射到新的列表中。这就是柯里化伟大的地方：我可以仅仅写出 <code>crossReference = map (findMatches listA) listB</code> 就可以实现了。 <code>(findMatches listA)</code> 是一个 <code>Item -&gt; List</code> 类型的函数，完全就是我们想要的。</p></blockquote>
<p>现在，回到实际的话题，<code>applyPhysics</code> 创建了一个新的纪录，使用提供的 <code>Ship</code> 作为基础，设置 <code>position</code> 为一些其他的值。这就是 <code>{ ship | position = .. }</code> 句法的含义。更多的，请参考 <a href="http://elm-lang.org/guide/core-language#records" rel="nofollow noreferrer">Updating Records</a>。</p>
<p>更新飞船的其他两个属性也是类似：</p>
<pre><code class="elm">updateVelocity : Float -&gt; Ship -&gt; Ship
updateVelocity newVelocity ship =
  { ship | velocity = newVelocity }

updateShooting : Bool -&gt; Ship -&gt; Ship
updateShooting isShooting ship =
  { ship | shooting = isShooting }</code></pre>
<p>把这些拼在一起，我们就得到了一搜完整的飞船，像下面这样：</p>
<pre><code class="elm">-- represents pressing the arrow buttons
-- x and y go from -1 to 1, and stay at 0 if nothing is pressed
type alias Keys = { x : Int, y : Int }

update : Float -&gt; Keys -&gt; Ship -&gt; Ship
update dt keys ship =
  let newVel      = toFloat keys.x  -- `let` defines local variables for `in`
      isShooting  = keys.y &gt; 0
  in  updateVelocity newVel (updateShooting isShooting (applyPhysics dt ship))</code></pre>
<p>现在，假设我只是调用 <code>update</code> 30 次每分钟，传给他距离上次更新的时间差、被按下的键和先前的 <code>ship</code>，我已经有了一个完美的小游戏模型了。除了我看不到任何东西，因为没有进行渲染... 但是理论上它是可行的。</p>
<p>让我们来总结一下目前为止发生了什么。</p>
<ul>
<li><p>aliases 类型定义了数据模型</p></li>
<li><p>所有数据是不可变的</p></li>
<li><p>类型标记分清了函数的目标</p></li>
<li><p>所有函数都是纯函数的</p></li>
</ul>
<p>事实上，这个预览里根本没有办法意外地改变状态。也没有任何循环。</p>
<p>我已经讲了很多关于这个游戏的底层的东西。定义了一个 model 和所有用于更新它的函数。唯一的麻烦是所有函数依赖于飞船的上一次更新。记住，在 Elm 里，任何情况下，你都不能在共享的作用域中保存状态，包括当前的 module -- 没有办法改变任何已经定义过的东西。那么，如何在程序中改变一个状态呢？</p>
<h2>II. 状态是 Immutable 曾经的样子</h2>
<p>有一些毁三观的事情将要发生了。在面向对象编程中，程序的状态是分散在一些实例中的。这里的 <code>Ship</code> 是算是一个类，而且 <code>myShip</code> 应该是这个类的实例。在程序运行的任何一个时间 <code>myShip</code> 都知道自己的位置和其他属性。但在函数式编程中并不是这样，在程序运行时 <code>initShip</code> 与刚开始时完全一样。为了得到当前的状态，我需要知道过去发生了什么。我需要使用那些事情作为参数传递给已经定义好的函数，只有这样我才能得到 <code>Ship</code> 当前应该处在的状态。这与曾经的玩法完全不同，所以我要详细讲解这个过程。</p>
<h4>第一步</h4>
<p>在刚开始时 <code>initShip</code> 有一个默认的值： <code>0, 0, False</code>。还有一些函数可以转换一个 <code>Ship</code> 成为另一个 <code>Ship</code>。详细地说，有个 <code>update</code> 函数，它得到用户输入和一个 ship 返回一个更新过的 ship。我要再写一遍这个函数，所以你不用向上翻页找它了。</p>
<pre><code class="elm">update : Float -&gt; Keys -&gt; Ship -&gt; Ship
update dt keys ship =
  let newVel      = toFloat keys.x
      isShooting  = keys.y &gt; 0
  in  updateVelocity newVel (updateShooting isShooting (applyPhysics dt ship))</code></pre>
<p>如果 <code>initShip</code> 是这个 model 初始的状态，至少，我可以向前走一步了。Elm 程序定义了一个 <code>main</code> 函数，整个程序通过它开始运行。所以，首先让我们试着显示 <code>initShip</code>。我引入了 <code>Graphics.Element</code> 库来调用 <code>show</code> 函数。</p>
<pre><code class="elm">import Graphics.Element exposing (..)

-- (other code)
main : Element
main = show initShip</code></pre>
<p>这给了我们</p>
<pre><code>{ position = 0, shooting = False, velocity = 0 }</code></pre>
<p>现在，如果我想再前进一步，我可以在显示飞船之前调用一次 <code>update</code> 函数。我试了一下，看到了 <code>keys</code>，所以左右键被按下时已经有效果了（<code>x</code> 是 -1，<code>y</code> 是 1）。</p>
<pre><code class="elm">dt = 100
keys = { x = -1, y = 1 }
main = show (update dt keys initShip)</code></pre>
<p>我们有了</p>
<pre><code>{ position = 0, shooting = True, velocity = -1 }</code></pre>
<p>很好！搞定了！按下向上键时我的飞船开始射击了，并且它有一个负的速度说明向左键也被按下了。请注意这时 <code>position</code> 还没有改变。这是因为我定义的更新的顺序是：先应用物理属性，然后才更新其他属性。 <code>initShip</code> 的速度是 0，所以改变物理值并没有移动它。</p>
<h4>Signals</h4>
<p>现在我希望你拿出一些时间来读一下 <a href="http://elm-lang.org/guide/reactivity#signals" rel="nofollow noreferrer">Elm-lang 的 Signals</a>，如果你感兴趣，甚至可以看一两个关于 Elm Signals 的视频。从现在开始我假设你已经知道什么是 Signals 了。</p>
<p>再来总结一下：一个 signal 就像一个 stream，在任何一个时间点，都有一个简单的值。所以一个鼠标点击的 signal 的计数永远是一个整数 - 换句话说，它是一个 <code>Signal Int</code> 类型。如果我愿意，我也可以搞一个飞船的 signal: <code>Signal Ship</code>，它可以一直保存着当前的 <code>Ship</code>。但是我需要重构之前所有的函数并记录下那些复杂的值，事实上是那些值的 signals... 所以我听从了来自 Elm-lang.org 的建议:</p>
<blockquote><p>使用 signals 最常犯的错误是过多的使用它们。它会引诱你用 signals 做任何事情，但在你的代码中尽量不使用它们才是坠吼滴！</p></blockquote>
<p>所以，我的飞船可以再前进一步，但是它没有那么令人激动了。我想要当我按下向左键时它向左移动，反之亦然。更重要的是，我要按向上键时发射子弹!</p>
<p>事实上我已经用一种伟大的方法构建了我的 models 和逻辑，因为那里正好有个已经搞好的 signal 叫做 <a href="http://package.elm-lang.org/packages/elm-lang/core/2.0.1/Time#fps" rel="nofollow noreferrer"><code>fps n</code></a>, 它更新 <code>n</code> 次每秒。它告诉我们距离上次更新的时间差。这就是我需要的 <code>dt</code>。而且，还有一个内置的 signal 被称作 <a href="http://package.elm-lang.org/packages/elm-lang/core/2.0.1/Keyboard#arrows" rel="nofollow noreferrer"><code>Keyboard.arrows</code></a>，它保存了当前的方向键信息跟我定义的 <code>Keys</code> 完全一样。无论何时只要发生变化，这些都会被更新。</p>
<p>好了，为了得到一个有趣的输入 signal，我会不得不联合这两个内置的 signals，以便 “当每次改变 <code>fps</code> 时，检查 <code>Keyboard.arrows</code> 的状态，并报告它们两个的值”。</p>
<ul>
<li><p>"它们俩" 听起来像一个组合，<code>(Float, Keys)</code></p></li>
<li><p>"在每一次更新" 听起来像 <a href="http://package.elm-lang.org/packages/elm-lang/core/2.0.1/Signal#sampleOn" rel="nofollow noreferrer"><code>Signal.sampleOn</code></a></p></li>
</ul>
<p>在代码中，这应该是下面这样：</p>
<pre><code class="elm">import Time exposing (..)
import Keyboard

-- (other code)
inputSignal : Signal (Float, Keys)
inputSignal =
  let delta = fps 30
      -- map the two signals into a tuple signal
      tuples = Signal.map2 (,) delta Keyboard.arrows
  -- and update `inputSignal` whenever `delta` changes
  in  Signal.sampleOn delta tuples</code></pre>
<p>碉堡了，现在我需要做的是只是接通我的 <code>main</code> 以使得用户输入能真正的被 <code>update</code> 函数获得到。为了实现它，我需要 <code>Signal.foldp</code>，或者想个办法"抱紧过去"。这个跟搞个简单的 fold 差不多:</p>
<pre><code class="elm">summed = List.foldl (+) 0 [1,2,3,4,5]</code></pre>
<p>这里我们从 0 开始，然后把它加上 1，再加上 2，以此类推，直到所有的数字被加在一起，最后我们得到返回值为 15。</p>
<p>简单的说，这个很有意义。<code>foldp</code> 一直记录着 "开始时间" 的值，并且整合所有 signal 的过去状态，直到当前这一刻 -- 整个应用完整的过去一步一步迭代到当前的状态。<br>我的天.. 让我喘口气。好了，至少现在好点了。</p>
<p>无论怎样，让我们看看它在代码中是什么样的。现在，既然我有了 <code>main</code> 函数来更新它的结果，它应该也会在它的类型上反映出来，所以我会用一个 <code>Signal Element</code> 代替之前的 <code>Element</code>。</p>
<pre><code class="elm">main : Signal Element
main = Signal.map show (Signal.foldp update initShip inputSignal)</code></pre>
<p>这里发生了一些事情：</p>
<ol>
<li><p>我使用 <code>Signal.foldp</code> 来更新 signal，初始值是 <code>initShip</code>。</p></li>
<li><p><code>Folding</code> 仍然返回一个 signal，因为它要继续更新 "folded 状态"。</p></li>
<li><p>我使用 <code>Signal.map</code> 把当前的 "folded 状态" 映射到 <code>show</code> 中。</p></li>
</ol>
<p>只做这些会导致类型错误，尾部会有下面的报错：</p>
<pre><code>Type mismatch between the following types on line 49, column 38 to 44:

       Temp9243.Ship -&gt; Temp9243.Ship

       Temp9243.Keys

   It is related to the following expression:

       update
</code></pre>
<p>呃... 好吧，至少我知道了问题出在哪里。我的函数的类型签名看上去像这样：<code>update : Float -&gt; Keys -&gt; Ship -&gt; Ship</code>。然而，实际上我传给它的参数是 <code>(Float, Keys)</code> 和 <code>Ship</code>。嗯，我只需要稍微修改下函数的签名...</p>
<pre><code class="elm">update : (Float, Keys) -&gt; Ship -&gt; Ship
update (dt, keys) ship =
  -- the same as before</code></pre>
<p>... 嗒嗒，搞定了！ <span class="emoji emoji-tada"></span></p>
<p>我的游戏现在有了一个完整的函数模型，需要的更新和其他任何东西，一共才 50 行代码！完整的代码在这看： <a href="https://gist.github.com/ohanhi/0d3d83cf3f0d7bbea9db#file-game-elm" rel="nofollow noreferrer">game.elm</a>。若想要看它的效果，你可以复制粘贴到 <a href="http://elm-lang.org/try" rel="nofollow noreferrer">Try Elm</a> 这个交互编辑器中（点击编译按钮按，在右边的屏幕上按下方向键)。</p>
<p>再来总结一下刚才发生了什么：</p>
<ul>
<li>
<p>一个信号是一个时间的函数</p>
<ul><li><p>每个时间点都对应着一个 signal 纯粹的值</p></li></ul>
</li>
<li><p><code>Signal.foldp</code> 最后迭代出结果的原理与 <code>List.foldl</code> 一样</p></li>
<li><p>程序的每个状态都是明确的起源于所有之前发生的事情</p></li>
</ul>
<h2>III. 学到了什么</h2>
<p>这些尝试让我学到了很多。我希望你也一样能有所收获。我个人的主观感觉是：</p>
<ul>
<li><p>类型（Types）的确非常漂亮，而且有用</p></li>
<li><p>不可修改的数据结构（Immutability）和对全局状态的限制并没有听起来那么难以接受</p></li>
<li><p>函数式编程在 Elm 中非常简洁，可读性很强</p></li>
<li><p>函数式编程使输入和输出清晰明确</p></li>
<li><p>因为所有的这些关于状态的想法是那么的与众不同，它有些难以掌握，但是它确实很有意义</p></li>
<li><p>因为每个状态都是一个输入的直接结果，所以不需要担心那些混合了各种状态的 bug</p></li>
<li><p>响应式地监听各种更改, 而不是主动地触发修改，这种感觉很幸福</p></li>
</ul>
<p>最后一句：<em>如果你喜欢这篇文章，请把它分享给你的好基友。分享就是真爱！</em></p>
<h2>附录: 术语表</h2>
<p><strong>不可变数据（Immutable data）</strong> 意思是一旦你给一个东西赋了值，它再也无法改变。拿 JavaScript 的 <code>Array</code> 来举个反例。如果它是不可变的，<code>myArray.push(item)</code> 就无法修改 <code>myArray</code> 已有的值，但它会返回一个新的追加了一个值的数组。</p>
<p><strong>强类型</strong> 这种编程语言试图防止不可预知的行为导致的错误发生，例如：把一个字符串赋值为一个整数。当出现类型不匹配时 Scala、Haskell 和 Elm 这些语言使用 <a href="http://en.wikipedia.org/wiki/Strong_and_weak_typing#Static_type-checking" rel="nofollow noreferrer">静态类型检查</a> 来阻止编译通过。</p>
<p><strong>纯函数（Pure functions）</strong> 给相同的输入永远给出相同的输出，而且没有任何副作用的函数。本质上，这些函数绝对不能依赖输入参数之外的任何东西，并且它不能修改任何东西。</p>
<p><strong>函数式编程</strong> 特指以纯函数为主要表现形式的一种编程范式。</p>
<p><strong>响应编程（Reactive programming）</strong> 概括地说就是组件可以被监听，并且根据事件做出所需要的反应。在 Elm 中，这些可被监听的东西是 signals。使用 signal 的组件知道如何利用它，但是 signal 完全不知道组件或组件们的存在。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
笨办法学函数式编程：Elm 初体验

## 原文链接
[https://segmentfault.com/a/1190000004886629](https://segmentfault.com/a/1190000004886629)

