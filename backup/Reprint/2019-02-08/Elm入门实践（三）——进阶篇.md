---
title: 'Elm入门实践（三）——进阶篇' 
date: 2019-02-08 2:30:40
hidden: true
slug: nyu8ibbrjr
categories: [reprint]
---

{{< raw >}}

                    
<p>在之前我们介绍了Elm的<a href="https://segmentfault.com/a/1190000005701562?_ea=870137">基础</a>和<a href="https://segmentfault.com/a/1190000005701589?_ea=870135" target="_blank">类型</a>，并且在Elm的在线编辑器中实现了一个Counter，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html exposing (..)
import Html.Events exposing (onClick)
import Html.App as App

type alias Model = Int

type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1
    Decrement ->
      model - 1

view : Model -> Html Msg
view model =
  div []
    [ button [onClick Decrement] [text &quot;-&quot;]
    , text (toString model)
    , button [onClick Increment] [text &quot;+&quot;]
  ]

initModel : Model
initModel = 3

main = App.beginnerProgram {model = initModel, view = view, update = update}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html <span class="hljs-keyword">exposing</span> (..)
<span class="hljs-keyword">import</span> Html.Events <span class="hljs-keyword">exposing</span> (onClick)
<span class="hljs-keyword">import</span> Html.App <span class="hljs-keyword">as</span> App

<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">Model</span> = <span class="hljs-type">Int</span>

<span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Increment</span> | <span class="hljs-type">Decrement</span>

<span class="hljs-title">update</span> : <span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Model</span>
<span class="hljs-title">update</span> msg model =
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span>
    <span class="hljs-type">Increment</span> -&gt;
      model + <span class="hljs-number">1</span>
    <span class="hljs-type">Decrement</span> -&gt;
      model - <span class="hljs-number">1</span>

<span class="hljs-title">view</span> : <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Html</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">view</span> model =
  div []
    [ button [onClick <span class="hljs-type">Decrement</span>] [text <span class="hljs-string">"-"</span>]
    , text (toString model)
    , button [onClick <span class="hljs-type">Increment</span>] [text <span class="hljs-string">"+"</span>]
  ]

<span class="hljs-title">initModel</span> : <span class="hljs-type">Model</span>
<span class="hljs-title">initModel</span> = <span class="hljs-number">3</span>

<span class="hljs-title">main</span> = <span class="hljs-type">App</span>.beginnerProgram {model = initModel, view = view, update = update}
</code></pre>
<p>相信你对这门语言已经不再感到陌生，甚至想开始用它做一些小项目。</p>
<p>然而，目前这个Counter还只能运行在elm官网提供的在线编辑器上，如何搭建一个Elm本地工程？如何封装和复用Elm模块？这些就是我们今天将要介绍的内容</p>
<h2 id="articleHeader0">搭建本地工程</h2>
<p>以上一篇文章中写好的Counter为例，让我们创建一个运行Counter的本地Elm工程，新建一个名为elm-in-practice的文件夹（当然名字随便了）作为项目目录。</p>
<h3 id="articleHeader1">package.json 与 elm-package.json</h3>
<p>在创建好项目目录后，第一件事就是创建package.json文件（可以使用<code>npm init</code>），虽然是elm项目，但是依托npm的依赖管理和构建工具也非常有用，并且更符合前端开发者的习惯，这里我们用到的是elm和elm-live两个包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev elm elm-live" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm i --save-dev elm elm-live</code></pre>
<p>然后是创建<code>elm-package.json</code>，正如它的名字一样，elm也提供了类似npm的包管理机制，你可以自由地发布或者<a href="http://package.elm-lang.org/" rel="nofollow noreferrer" target="_blank">使用</a>elm模块。在Counter中我们需要用到的有<code>elm-lang/core</code>和<code>elm-lang/html</code>两个模块，之前我们使用的在线编辑器内置了这些常用依赖，在本地项目中则需要自行配置。完整的<code>elm-package.json</code>文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;version&quot;: &quot;1.0.0&quot;,
    &quot;summary&quot;: &quot;learn you a elm for great good&quot;,
    &quot;repository&quot;: &quot;https://github.com/kpaxqin/elm-in-practice.git&quot;,
    &quot;license&quot;: &quot;BSD3&quot;,
    &quot;source-directories&quot;: [
        &quot;.&quot;
    ],
    &quot;exposed-modules&quot;: [],
    &quot;dependencies&quot;: {
        &quot;elm-lang/core&quot;: &quot;4.0.0 <= v < 5.0.0&quot;,
        &quot;elm-lang/html&quot;: &quot;1.0.0 <= v < 2.0.0&quot;
    },
    &quot;elm-version&quot;: &quot;0.17.0 <= v < 0.18.0&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
    <span class="hljs-string">"summary"</span>: <span class="hljs-string">"learn you a elm for great good"</span>,
    <span class="hljs-string">"repository"</span>: <span class="hljs-string">"https://github.com/kpaxqin/elm-in-practice.git"</span>,
    <span class="hljs-string">"license"</span>: <span class="hljs-string">"BSD3"</span>,
    <span class="hljs-string">"source-directories"</span>: [
        <span class="hljs-string">"."</span>
    ],
    <span class="hljs-string">"exposed-modules"</span>: [],
    <span class="hljs-string">"dependencies"</span>: {
        <span class="hljs-string">"elm-lang/core"</span>: <span class="hljs-string">"4.0.0 &lt;= v &lt; 5.0.0"</span>,
        <span class="hljs-string">"elm-lang/html"</span>: <span class="hljs-string">"1.0.0 &lt;= v &lt; 2.0.0"</span>
    },
    <span class="hljs-string">"elm-version"</span>: <span class="hljs-string">"0.17.0 &lt;= v &lt; 0.18.0"</span>
}</code></pre>
<p>然后执行<code>node_modules/.bin/elm-package install</code>，和npm类似，这个命令会把相关的依赖安装到名为<code>elm-stuff</code>的文件夹下。</p>
<p>注意之前我们并没有使用<code>-g</code>参数将<code>elm</code>和<code>elm-live</code>安装到全局，这意味着你不能直接在命令行里使用它们，而只能使用<code>node_modules/.bin/&lt;command&gt; [args]</code>。</p>
<p>这样做的好处是隔离项目间依赖，如果你的电脑上有多个项目依赖了不同的elm版本，切换项目会是非常麻烦的事。其它团队成员设置环境时也会更麻烦。</p>
<p>但老是写<code>node_modules/.bin/&lt;command&gt;</code>就像重复代码一样多余，更常见的是结合<a href="https://docs.npmjs.com/cli/run-script" rel="nofollow noreferrer" target="_blank">npm run-script</a>，将需要执行的命令添加到package.json的scripts字段。在使用<code>npm run</code>执行scripts的时候，<code>node_modules/.bin/</code>会被临时添加到PATH中，因此是可以省去的。</p>
<p>向<code>package.json</code>中添加<code>elm-install</code>命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;elm-in-practice&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;elm-install&quot;: &quot;elm-package install&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;elm&quot;: &quot;^0.17.0&quot;,
    &quot;elm-live&quot;: &quot;^2.3.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"elm-in-practice"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"elm-install"</span>: <span class="hljs-string">"elm-package install"</span>
  },
  <span class="hljs-string">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"elm"</span>: <span class="hljs-string">"^0.17.0"</span>,
    <span class="hljs-string">"elm-live"</span>: <span class="hljs-string">"^2.3.0"</span>
  }
}</code></pre>
<p>然后执行<code>npm run elm-install</code>即可。</p>
<h3 id="articleHeader2">创建Main.elm文件</h3>
<p>这一步非常简单，在根目录创建Main.elm文件，并将之前的Counter代码复制进去。</p>
<p>目前为止不需要任何额外工作</p>
<blockquote><p>和其它拥有模块机制的语言一样，Elm也有模块导出语法，但是应用的入口模块并不是必须的，只要模块中有main变量即可。</p></blockquote>
<h3 id="articleHeader3">打包生成Javascript文件</h3>
<p>目前为止我们安装好了依赖，也有了Elm源代码，作为一门编译到javascript的语言，要做的当然是打包生成.js文件了。</p>
<p>elm提供了<code>elm-make</code>命令，在package.json中添加scripts:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  //...
  scripts: {
      &quot;build&quot;: &quot;elm-make Main.elm --output=build/index.js&quot;
      //...
  }
  //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-comment">//...</span>
  scripts: {
      <span class="hljs-string">"build"</span>: <span class="hljs-string">"elm-make Main.elm --output=build/index.js"</span>
      <span class="hljs-comment">//...</span>
  }
  <span class="hljs-comment">//...</span>
}</code></pre>
<p>运行<code>npm run build</code>，不出意外的话可以成功编译出index.js文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  elm-in-practice git:(master) ✗ npm run build

> elm-in-practice@1.0.0 build /Users/jwqin/workspace/elm/elm-in-practice
> elm-make Main.elm --output=build/index.js

Success! Compiled 1 module.                                         
Successfully generated build/index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>➜  elm-in-practice git:(master) ✗ npm run <span class="hljs-keyword">build</span>

&gt; elm-<span class="hljs-keyword">in</span>-practice@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span> <span class="hljs-keyword">build</span> /Users/jwqin/workspace/elm/elm-<span class="hljs-keyword">in</span>-practice
&gt; elm-make Main.elm --output=<span class="hljs-keyword">build</span>/<span class="hljs-keyword">index</span>.js

Success! Compiled <span class="hljs-number">1</span> module.                                         
Successfully generated <span class="hljs-keyword">build</span>/<span class="hljs-keyword">index</span>.js</code></pre>
<blockquote><p>有意外也没关系，编译器会给出详细的错误信息。</p></blockquote>
<h3 id="articleHeader4">在浏览器中运行</h3>
<p>有了js文件，就进入熟悉的套路了，在项目根目录下新建一个index.html文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE HTML>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Elm in practice</title>
  </head>
  <body>
    <div id=&quot;container&quot;>
    </div>
    <script type=&quot;text/javascript&quot; src=&quot;./build/index.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
      var node = document.getElementById('container');
      var app = Elm.Main.embed(node);
    </script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE HTML&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Elm in practice<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./build/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
      <span class="hljs-keyword">var</span> node = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>);
      <span class="hljs-keyword">var</span> app = Elm.Main.embed(node);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这里的核心是<code>Elm.Main.embed(node)</code>，elm会为入口模块在全局生成<code>Elm.&lt;Module Name&gt;</code>对象，包含三个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Elm.Main = {
    fullscreen: function() { /* 在document.body上渲染 */ },
    embed: function(node) { /* 在指定的node上渲染 */ },
    worker: function() { /* 无UI运行 */ }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Elm.Main = {
    <span class="hljs-attr">fullscreen</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* 在document.body上渲染 */</span> },
    <span class="hljs-attr">embed</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{ <span class="hljs-comment">/* 在指定的node上渲染 */</span> },
    <span class="hljs-attr">worker</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* 无UI运行 */</span> }
};</code></pre>
<p>此处我们使用<code>embed</code>将应用渲染到id为container的节点中。</p>
<p>在浏览器中打开index.html，可以看到我们的Counter成功在本地运行起来了！</p>
<h3 id="articleHeader5">使用elm-live实现watch与live-reload</h3>
<p>Counter并不是终点，接下来我们还要实现Counter list。但每次改完代码再手动运行编译命令实在是太土鳖了，怎么着也得有个watch吧？elm-live就是这方面的工具，它封装了elm-make，并且提供了watch，dev server，live reload等实用的功能，不需要任何复杂的配置，相比原生elm-make，只用添加--open来自动打开浏览器即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  //...
  scripts: {
    &quot;start&quot;: &quot;elm-live Main.elm --output=build/index.js --open&quot;,
    &quot;build&quot;: &quot;elm-make Main.elm --output=build/index.js&quot;
    //...
  }
  //...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-comment">//...</span>
  scripts: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"elm-live Main.elm --output=build/index.js --open"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"elm-make Main.elm --output=build/index.js"</span>
    <span class="hljs-comment">//...</span>
  }
  <span class="hljs-comment">//...</span>
}
</code></pre>
<p>运行<code>npm start</code>感受一下吧</p>
<blockquote><p>大名鼎鼎的webpack也可以用来编译并打包elm文件，甚至可以实现代码热替换（Hot Module Replace），有兴趣的可以参考<a href="https://github.com/moarwick/elm-webpack-starter" rel="nofollow noreferrer" target="_blank">elm-webpack-starter</a></p></blockquote>
<h2 id="articleHeader6">CounterList</h2>
<p>counter list是由任意个counter组成的counter列表，纯react在线版：<br><a href="https://jsfiddle.net/Kpaxqin/wh8hb8wr/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Kpaxqin/wh8hb8wr/</a><button class="btn btn-xs btn-default ml10 preview" data-url="Kpaxqin/wh8hb8wr/" data-typeid="0">点击预览</button></p>
<p>接下来就让我们在Elm中实现同样的功能</p>
<h3 id="articleHeader7">Counter模块</h3>
<p>首先是需要抽象出可复用的Counter模块，新建目录src，并在此目录下创建Counter.elm。<br>将Main.elm的代码复制到Counter.elm中，然后删除最后这句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="main = App.beginnerProgram {model = initModel, view = view, update = update}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm" style="word-break: break-word; white-space: initial;"><span class="hljs-title">main</span> = <span class="hljs-type">App</span>.beginnerProgram {model = initModel, view = view, update = update}</code></pre>
<p>作为模块，main已经不再需要了，取而代之的是我们需要导出这个模块，在Counter.elm的第一行添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module Counter exposing (Model, initModel, Msg, update, view)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">module</span> Counter <span class="hljs-keyword">exposing</span> (<span class="hljs-type">Model</span>, initModel, <span class="hljs-type">Msg</span>, update, view)</code></pre>
<p>也可以使用<code>exposing (..)</code>把当前文件里的所有变量都导出，但具名导出的方式要更健壮一些。</p>
<p>到此为止一个可复用的Counter模块就完成了。</p>
<p>在继续之前还要做一件事，就是将src文件夹添加到elm-package.json的<code>source-directories</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//elm-package.json

&quot;source-directories&quot;: [
    &quot;.&quot;,
    &quot;src&quot;
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//elm-package.json</span>

<span class="hljs-string">"source-directories"</span>: [
    <span class="hljs-string">"."</span>,
    <span class="hljs-string">"src"</span>
],</code></pre>
<p>这样其它文件就可以直接引用src下的模块了</p>
<p>再修改Main文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html.App exposing (beginnerProgram)
import Counter

main = beginnerProgram {
  model = Counter.initModel,
  view = Counter.view,
  update = Counter.update}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html.App <span class="hljs-keyword">exposing</span> (beginnerProgram)
<span class="hljs-keyword">import</span> Counter

<span class="hljs-title">main</span> = beginnerProgram {
  model = <span class="hljs-type">Counter</span>.initModel,
  view = <span class="hljs-type">Counter</span>.view,
  update = <span class="hljs-type">Counter</span>.update}</code></pre>
<p>运行<code>npm start</code>，效果和之前完全一样，说明抽离模块的重构是成功的。</p>
<h3 id="articleHeader8">CounterList模块</h3>
<p>再在src下新建一个CounterList.elm，可能你已经忘记了写elm模块的套路，不用急，只要记得Elm的架构叫做<code>M-V-U</code>就行了，任何组件都是由这几部分组成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--CounterList.elm

//Model

//Update

//View
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-comment">--CounterList.elm</span>

//<span class="hljs-type">Model</span>

//<span class="hljs-type">Update</span>

//<span class="hljs-type">View</span>
</code></pre>
<p>这背后是非常自然的逻辑：描述数据，描述数据如何改变，将一切映射到视图上。</p>
<h4>Model</h4>
<p>作为Counter列表，需要存储的数据当然是Counter类型的数组了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Model

type alias Model = {counters: List Counter}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm">//<span class="hljs-type">Model</span>

<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">Model</span> = {counters: <span class="hljs-type">List</span> <span class="hljs-type">Counter</span>}
</code></pre>
<p>但是这样的数据结构是有问题的：Counter类型本身并不包含id，当我们想要修改列表中某个counter时，如何查找它呢？</p>
<p>为此我们需要添加额外的数据类型<code>IndexedCounter</code>，负责将Counter和id组合起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type alias IndexedCounter = {id: Int, counter: Counter}

type alias Model = {counters: List IndexedCounter}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">IndexedCounter</span> = {id: <span class="hljs-type">Int</span>, counter: <span class="hljs-type">Counter</span>}

<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">Model</span> = {counters: <span class="hljs-type">List</span> <span class="hljs-type">IndexedCounter</span>}</code></pre>
<p>这样就没问题了，不过还得解决如何生成id，为了简便，我们在Model上再添加一个uid字段，储存最近的id，每次添加一个counter就将它+1，相当于模拟一个自增id生成器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type alias IndexedCounter = {id: Int, counter: Counter}
type alias Model = {uid: Int, counters: List IndexedCounter}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">IndexedCounter</span> = {id: <span class="hljs-type">Int</span>, counter: <span class="hljs-type">Counter</span>}
<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">Model</span> = {uid: <span class="hljs-type">Int</span>, counters: <span class="hljs-type">List</span> <span class="hljs-type">IndexedCounter</span>}</code></pre>
<p>同时，我们可以定义一个Model类型的初始值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initModel: Model
initModel = {uid= 0, counters = [{id= 0, counter= Counter.initModel}]}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-title">initModel</span>: <span class="hljs-type">Model</span>
<span class="hljs-title">initModel</span> = {uid= <span class="hljs-number">0</span>, counters = [{id= <span class="hljs-number">0</span>, counter= <span class="hljs-type">Counter</span>.initModel}]}</code></pre>
<h4>Update</h4>
<h5>Msg</h5>
<p>在处理变更前我们需要先定义变更，在Counter list中主要有三类：增加Counter、删除Counter、修改Counter：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Msg = Insert | Remove | Modify        
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Insert</span> | <span class="hljs-type">Remove</span> | <span class="hljs-type">Modify</span>        
</code></pre>
<p>添加和删除Counter都不需要额外的信息，但修改却不一样，它需要指明<strong>改哪个</strong>以及<strong>怎么改</strong>，借助前面讲到的<a href="https://segmentfault.com/a/1190000005701589?_ea=870135#articleHeader5">值构造器</a>，我们可以通过让Modify携带两个已知类型来达到目的：Int表示目标counter的id，Counter.Msg表示要对该counter做的操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Msg = Insert | Remove | Modify Int Counter.Msg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Insert</span> | <span class="hljs-type">Remove</span> | <span class="hljs-type">Modify</span> <span class="hljs-type">Int</span> <span class="hljs-type">Counter</span>.<span class="hljs-type">Msg</span></code></pre>
<blockquote>
<p>从架构上<code>type Msg</code>对应了Redux中的action，都用来表达对系统的变更。</p>
<p>此例可以看出在Elm中，基于类型的action拥有强大的组合能力，而Redux基于字符串的action在这方面的表达力则要弱一些。关于两者的对比，在下一章会继续探讨</p>
</blockquote>
<p>有了Msg，update函数就很好写了，在开始写逻辑之前可以先返回原model作为占位：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update : Msg-> Model -> Model
update msg model = 
  case msg of 
    Insert -> 
      model
    Remove -> 
      model
    Modify id counterMsg ->
      model" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-title">update</span> : <span class="hljs-type">Msg</span>-&gt; <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Model</span>
<span class="hljs-title">update</span> msg model = 
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span> 
    <span class="hljs-type">Insert</span> -&gt; 
      model
    <span class="hljs-type">Remove</span> -&gt; 
      model
    <span class="hljs-type">Modify</span> id counterMsg -&gt;
      model</code></pre>
<h5>添加</h5>
<p>先处理添加，逻辑是给model.uid加1，并且往model.counters里添加一个IndexedCounter类的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update : Msg -> Model -> Model
update msg model =
  case msg of
    Insert ->
      let
        id = model.uid + 1
      in
        {
          uid = id,
          counters = model.counters ++ [{id = id, counter = Counter.initModel}]
        }
    Remove ->
      model
    Modify id counterMsg ->
      model
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-title">update</span> : <span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Model</span>
<span class="hljs-title">update</span> msg model =
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span>
    <span class="hljs-type">Insert</span> -&gt;
      <span class="hljs-keyword">let</span>
        id = model.uid + <span class="hljs-number">1</span>
      <span class="hljs-keyword">in</span>
        {
          uid = id,
          counters = model.counters ++ [{id = id, counter = <span class="hljs-type">Counter</span>.initModel}]
        }
    <span class="hljs-type">Remove</span> -&gt;
      model
    <span class="hljs-type">Modify</span> id counterMsg -&gt;
      model
</code></pre>
<p>这里我们直接生成了一个新的model，<code>++</code>是Elm中的拼接操作符，可以用来拼接<code>List a</code>, <code>String</code>等类型</p>
<blockquote><p>其实<code>++</code>也是函数，和一般函数的<code>func a b</code>不同，它的调用方式<code>a func b</code>，这种被称作<code>中缀函数</code>，常用的操作符如<code>+</code>、<code>-</code>都是如此</p></blockquote>
<h5>删除</h5>
<p>删除的逻辑就简单很多了，直接去掉counters数组中的最后一个即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Remove ->
      {counters | counters = List.drop 1 model.counters}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-type">Remove</span> -&gt;
      {counters | counters = <span class="hljs-type">List</span>.drop <span class="hljs-number">1</span> model.counters}</code></pre>
<h5>修改</h5>
<p>修改的逻辑是最复杂的，基本的思路是map整个counters，如果counter的id和目标一致，则调用<code>Counter</code>模块暴露出的<code>update</code>函数更新，否则原样返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Modify id counterMsg ->
      let 
        counterMapper = updateCounter id counterMsg
      in
        {model | counters = List.map counterMapper model.counters}
      
updateCounter : Int -> Counter.Msg -> IndexedCounter -> IndexedCounter
updateCounter id counterMsg indexedCounter =
  if id == indexedCounter.id 
  then {indexedCounter | counter = Counter.update counterMsg indexedCounter.counter}
  else indexedCounter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm">  <span class="hljs-type">Modify</span> id counterMsg -&gt;
      <span class="hljs-keyword">let</span> 
        counterMapper = updateCounter id counterMsg
      <span class="hljs-keyword">in</span>
        {model | counters = <span class="hljs-type">List</span>.map counterMapper model.counters}
      
<span class="hljs-title">updateCounter</span> : <span class="hljs-type">Int</span> -&gt; <span class="hljs-type">Counter</span>.<span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">IndexedCounter</span> -&gt; <span class="hljs-type">IndexedCounter</span>
<span class="hljs-title">updateCounter</span> id counterMsg indexedCounter =
  <span class="hljs-keyword">if</span> id == indexedCounter.id 
  <span class="hljs-keyword">then</span> {indexedCounter | counter = <span class="hljs-type">Counter</span>.update counterMsg indexedCounter.counter}
  <span class="hljs-keyword">else</span> indexedCounter</code></pre>
<p>List.map的第一个参数counterMapper是updateCounter函数被部分应用后返回的函数，它接收并返回IndexedCounter，这正是mapper函数需要做的。</p>
<p>在updateCounter中我们使用了Counter.update来获取新的counter，写到这里你可能已经发现，在Model / Msg / update中，我们都使用了Counter模块的对应部分，这就是Elm最大的特点：无处不在的组合，接下来在View中你也会看到这一点</p>
<p>在继续之前，我们可以先回顾一下目前为止的完整代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Counter

type alias IndexedCounter = {id: Int, counter: Counter.Model}
type alias Model = {uid: Int, counters: List IndexedCounter}

type Msg = Insert | Remove | Modify id Counter.Msg

update : Msg -> Model -> Model
update msg model =
  case msg of
    Insert ->
      let
        id = model.uid + 1
      in
        {
          uid = id,
          counters = {id = id, counter = Counter.initModel} :: model.counters
        }
    Remove ->
      {model | counters = List.drop 1 model.counters}
    Modify id counterMsg ->
      let 
        counterMapper = updateCounter id counterMsg
      in
        {model | counters = List.map counterMapper model.counters}
        
updateCounter : Int -> Counter.Msg -> IndexedCounter -> IndexedCounter
updateCounter id counterMsg indexedCounter =
  if id == indexedCounter.id 
  then {indexedCounter | counter = Counter.update counterMsg indexedCounter.counter}
  else indexedCounter
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Counter

<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">IndexedCounter</span> = {id: <span class="hljs-type">Int</span>, counter: <span class="hljs-type">Counter</span>.<span class="hljs-type">Model</span>}
<span class="hljs-keyword">type</span> <span class="hljs-keyword">alias</span> <span class="hljs-type">Model</span> = {uid: <span class="hljs-type">Int</span>, counters: <span class="hljs-type">List</span> <span class="hljs-type">IndexedCounter</span>}

<span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Insert</span> | <span class="hljs-type">Remove</span> | <span class="hljs-type">Modify</span> id <span class="hljs-type">Counter</span>.<span class="hljs-type">Msg</span>

<span class="hljs-title">update</span> : <span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Model</span>
<span class="hljs-title">update</span> msg model =
  <span class="hljs-keyword">case</span> msg <span class="hljs-keyword">of</span>
    <span class="hljs-type">Insert</span> -&gt;
      <span class="hljs-keyword">let</span>
        id = model.uid + <span class="hljs-number">1</span>
      <span class="hljs-keyword">in</span>
        {
          uid = id,
          counters = {id = id, counter = <span class="hljs-type">Counter</span>.initModel} :: model.counters
        }
    <span class="hljs-type">Remove</span> -&gt;
      {model | counters = <span class="hljs-type">List</span>.drop <span class="hljs-number">1</span> model.counters}
    <span class="hljs-type">Modify</span> id counterMsg -&gt;
      <span class="hljs-keyword">let</span> 
        counterMapper = updateCounter id counterMsg
      <span class="hljs-keyword">in</span>
        {model | counters = <span class="hljs-type">List</span>.map counterMapper model.counters}
        
<span class="hljs-title">updateCounter</span> : <span class="hljs-type">Int</span> -&gt; <span class="hljs-type">Counter</span>.<span class="hljs-type">Msg</span> -&gt; <span class="hljs-type">IndexedCounter</span> -&gt; <span class="hljs-type">IndexedCounter</span>
<span class="hljs-title">updateCounter</span> id counterMsg indexedCounter =
  <span class="hljs-keyword">if</span> id == indexedCounter.id 
  <span class="hljs-keyword">then</span> {indexedCounter | counter = <span class="hljs-type">Counter</span>.update counterMsg indexedCounter.counter}
  <span class="hljs-keyword">else</span> indexedCounter
</code></pre>
<h4>View</h4>
<p>最后要做的事情很简单，就是把数据和行为映射到视图上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="view : Model -> Html Msg
view model =
  div []
    [ button [onClick Insert] [text &quot;Insert&quot;]
    , button [onClick Remove] [text &quot;Remove&quot;]
    , div [] (List.map showCounter model.counters)
    ]

showCounter : IndexedCounter -> Html Msg
showCounter indexedCounter = 
  Counter.view indexedCounter.counter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-title">view</span> : <span class="hljs-type">Model</span> -&gt; <span class="hljs-type">Html</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">view</span> model =
  div []
    [ button [onClick <span class="hljs-type">Insert</span>] [text <span class="hljs-string">"Insert"</span>]
    , button [onClick <span class="hljs-type">Remove</span>] [text <span class="hljs-string">"Remove"</span>]
    , div [] (<span class="hljs-type">List</span>.map showCounter model.counters)
    ]

<span class="hljs-title">showCounter</span> : <span class="hljs-type">IndexedCounter</span> -&gt; <span class="hljs-type">Html</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">showCounter</span> indexedCounter = 
  <span class="hljs-type">Counter</span>.view indexedCounter.counter</code></pre>
<p>然而以上代码是不工作的！如果一个view函数的返回类型定义为<code>Html Msg</code>，那它所有的节点都必须满足该类型。<code>Counter.view</code>函数的返回类型是<code>Html Counter.Msg</code>，而我们需要的却是<code>Html Msg</code>（此处的Msg为当前CounterList模块的Msg）。</p>
<p>换个角度看，在两个button的onClick事件中，我们会产生Msg类型的消息值：<code>Insert</code>和<code>Remove</code>。而负责修改Counter的<code>Modify</code>却没有地方能产生，这显然是有问题的。</p>
<p>既然<code>Counter.view</code>返回的类型<code>Html Counter.Msg</code>和我们要的<code>Html Msg</code>不匹配，就得想办法做转换，此处我们将要用到<code>Html.App</code>模块的<code>App.map</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showCounter : IndexedCounter -> Html Msg
showCounter ({id, counter} as indexedCounter) = 
  App.map (\counterMsg -> Modify id counterMsg) (Counter.view counter)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-title">showCounter</span> : <span class="hljs-type">IndexedCounter</span> -&gt; <span class="hljs-type">Html</span> <span class="hljs-type">Msg</span>
<span class="hljs-title">showCounter</span> ({id, counter} <span class="hljs-keyword">as</span> indexedCounter) = 
  <span class="hljs-type">App</span>.map (\counterMsg -&gt; <span class="hljs-type">Modify</span> id counterMsg) (<span class="hljs-type">Counter</span>.view counter)</code></pre>
<p><code>\counterMsg -&gt; Modify id counterMsg</code>是Elm中的匿名函数，在Elm中，匿名函数使用<code>\</code>开头紧接着参数，并在<code>-&gt;</code>后书写返回值表达式，形如<code>\a -&gt; b</code>。</p>
<p>App.map的类型签名为<code>(a -&gt; msg) -&gt; Html a -&gt; Html msg</code>，第一个参数是针对msg的转换函数，借助它我们将<code>Html Counter.Msg</code>类型的视图转换成了<code>Html Msg</code>类型。还记得Modify的定义吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Msg = Insert | Remove | Modify id Counter.Msg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">type</span> <span class="hljs-type">Msg</span> = <span class="hljs-type">Insert</span> | <span class="hljs-type">Remove</span> | <span class="hljs-type">Modify</span> id <span class="hljs-type">Counter</span>.<span class="hljs-type">Msg</span></code></pre>
<p>使用<code>Modify</code>构造值所需要的：id和Counter.Msg，在showCounter里全都满足。这并不是巧合，而是Elm架构上的精妙之处，还请读者自行思考体会。</p>
<blockquote><p>上述代码还使用了Elm中的解构，即<code>{id, counter} as indexedCounter</code>，和ES 6中的<code>const {a, b} = {a: 1, b: 2}</code>类似，不再赘述。</p></blockquote>
<h4>运行</h4>
<p>至此，CounterList模块就基本宣告完成，为了使用它，我们还需要定义模块的导出，和Counter.elm一样，在最顶部添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module CounterList exposing (Msg, Model, initModel, update, view)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">module</span> CounterList <span class="hljs-keyword">exposing</span> (<span class="hljs-type">Msg</span>, <span class="hljs-type">Model</span>, initModel, update, view)</code></pre>
<p>然后修改Main.elm：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Html.App exposing (beginnerProgram)
import CounterList

main = beginnerProgram {
  model = CounterList.initModel,
  view = CounterList.view,
  update = CounterList.update}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-keyword">import</span> Html.App <span class="hljs-keyword">exposing</span> (beginnerProgram)
<span class="hljs-keyword">import</span> CounterList

<span class="hljs-title">main</span> = beginnerProgram {
  model = <span class="hljs-type">CounterList</span>.initModel,
  view = <span class="hljs-type">CounterList</span>.view,
  update = <span class="hljs-type">CounterList</span>.update}
</code></pre>
<p>运行看看吧！</p>
<blockquote><p>编译失败也不要紧，试着借助Elm编译器的错误提示去修改问题</p></blockquote>
<p>以上的完整代码，请参考<a href="https://github.com/kpaxqin/elm-in-practice" rel="nofollow noreferrer" target="_blank">Github传送门</a></p>
<h2 id="articleHeader9">小结</h2>
<p>也许你已经注意到了，无论是Counter.elm还是CounterList.elm，组件的导出都是<strong>碎片化的</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--Counter.elm
module Counter exposing (Model, Msg, initModel, update, view)


--CounterList.elm
module CounterList exposing (Model, Msg, initModel, update, view)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm"><span class="hljs-comment">--Counter.elm</span>
<span class="hljs-keyword">module</span> Counter <span class="hljs-keyword">exposing</span> (<span class="hljs-type">Model</span>, <span class="hljs-type">Msg</span>, initModel, update, view)


<span class="hljs-comment">--CounterList.elm</span>
<span class="hljs-keyword">module</span> CounterList <span class="hljs-keyword">exposing</span> (<span class="hljs-type">Model</span>, <span class="hljs-type">Msg</span>, initModel, update, view)</code></pre>
<p>而这些碎片都符合<a href="http://guide.elm-lang.org/architecture/" rel="nofollow noreferrer" target="_blank">Elm Architecture</a>的标准。</p>
<p>这和平常我们接触到的组件方案有所不同，多数的架构把组件看作一个<strong>闭合的</strong>整体：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<CounterList>
  <Counter id={1} />
  <Counter id={2} />
</CounterList>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="elm hljs"><code class="elm">&lt;<span class="hljs-type">CounterList</span>&gt;
  &lt;<span class="hljs-type">Counter</span> id={<span class="hljs-number">1</span>} /&gt;
  &lt;<span class="hljs-type">Counter</span> id={<span class="hljs-number">2</span>} /&gt;
&lt;/<span class="hljs-type">CounterList</span>&gt;</code></pre>
<p>然后在闭合的基础上，再定义开放的接口，比如添加回调。这个方案的风险之处在于：<strong>闭合和开放的边界</strong>非常难以界定，最初定义的开放接口不能满足需要，在维护期中改得千疮百孔是常有的事。</p>
<blockquote><p>Redux要求组件为尽量<strong>不具备行为</strong>的纯视图，可以看作是对闭合边界的一种限定</p></blockquote>
<p>一个具备完整功能性的组件至少由<code>视图</code>、<code>数据</code>、<code>行为</code>三部分组成，如果我们将它们<strong>全部</strong>封装到闭合模块中，简单场合下的复用会非常直观，React版的<a href="https://jsfiddle.net/Kpaxqin/wh8hb8wr/" rel="nofollow noreferrer" target="_blank">CounterList</a><button class="btn btn-xs btn-default ml10 preview" data-url="Kpaxqin/wh8hb8wr/" data-typeid="0">点击预览</button>就是例子，它的Counter是完全闭合的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends React.Component {
    constructor(props) {
      super(props);
    this.state = {
        value: 10
    }
  }
  onDecrement() {
      this.setState({
        value: this.state.value - 1
    })
  }
  onIncrement() {
      this.setState({
        value: this.state.value + 1
    })
  }
    render() {
      const {value} = this.state;
      return (
        <div>
          <button onClick={this.onIncrement.bind(this)}>+</button>
        {value}
        <button onClick={this.onDecrement.bind(this)}>-</button>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">value</span>: <span class="hljs-number">10</span>
    }
  }
  onDecrement() {
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value - <span class="hljs-number">1</span>
    })
  }
  onIncrement() {
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">value</span>: <span class="hljs-keyword">this</span>.state.value + <span class="hljs-number">1</span>
    })
  }
    render() {
      <span class="hljs-keyword">const</span> {value} = <span class="hljs-keyword">this</span>.state;
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onIncrement.bind(this)}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        {value}
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onDecrement.bind(this)}</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>这使得在渲染Counter列表时，代码只需要短短一句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.state.list.map(i=> <Counter key={i}/>)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.state.list.map(<span class="hljs-function"><span class="hljs-params">i</span>=&gt;</span> &lt;Counter key={i}/&gt;)</code></pre>
<p>而Elm绕了一大圈，把组件拆得七零八落，收益在哪呢？</p>
<p>下面请看思考题：</p>
<blockquote>
<p>设CounterList中有固定的三个子Counter：A, B, C。它们正常工作，就像我们在本章实现的一样。为了简化问题，我们暂时移除且不考虑添加和删除Counter的功能。</p>
<p>突然，你家产品经理想出了提升KPI的绝妙办法：在操作A的加减时，应该改变B的值，操作B时改变C，操作C时改变A。 </p>
<p>请思考：在不对产品经理造成人身伤害的前提下，如何用React闭合组件、Redux、Elm分别实现该需求。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Elm入门实践（三）——进阶篇

## 原文链接
[https://segmentfault.com/a/1190000005808614](https://segmentfault.com/a/1190000005808614)

