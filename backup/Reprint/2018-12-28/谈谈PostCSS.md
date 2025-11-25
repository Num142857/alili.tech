---
title: '谈谈PostCSS' 
date: 2018-12-28 2:30:11
hidden: true
slug: arxff0o6lp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<blockquote><p>现在的前端，javascript的发展有目共睹，框架林立。同时，html也是齐头并进，推出了HTML5标准，并且得到了普及。这样的发展却唯独少了一个角色？</p></blockquote>
<p>CSS，就是这个看似不起眼的家伙，却在开发中发挥着和js一样重要的作用。css，是一种样式脚本，好像和编程语言有着一定的距离，我们可以将之理解为一种描述方法。这似乎导致css被轻视了。不过，css近几年来正在经历着一次巨变——CSS Module。我记得js的井喷期应该可以说是node带来的，它带来了Module的概念，使得JS可以被工程化开发项目。那么，今天的css，也将越来越美好。如果你喜欢我的文章，欢迎评论，欢迎Star~。欢迎关注我的<a href="https://github.com/laizimo/zimo-article" rel="nofollow noreferrer" target="_blank">github博客</a></p>
<h1 id="articleHeader1">正文</h1>
<blockquote><p>既然作为一篇推广PostCSS的文章，我们就应该先来了解一下这是什么，和我们之前讲的CSS Module有啥关系？此处让我为你们娓娓道来。</p></blockquote>
<h3 id="articleHeader2">我想和你们说再见</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011595625?w=450&amp;h=338" src="https://static.alili.tech/img/remote/1460000011595625?w=450&amp;h=338" alt="预处理器" title="预处理器" style="cursor: pointer; display: inline;"></span></p>
<p>目前，在工程化开发中，使用最多的应该就是Less、Sass和Stylus。首先，还是介绍一下它们吧。它们有个统一的名字——css预处理器。何为CSS预处理器？应该就是一种可以将你根据它的规则写出来的格式转成css的东西(还是讲的通俗一点)。它们的出现可以说是恰逢其时，解决了css的一些缺憾：</p>
<ul>
<li>语法不够强大，不能够嵌套书写，不利于模块化开发</li>
<li>没有变量和逻辑上的复用机制，导致在css的属性值中只能使用字面量形式，以及不断重复书写重复的样式，导致难以维护。</li>
</ul>
<p>面对以上问题，css预处理器给出了非常可行的解决方案：</p>
<ol>
<li>
<p><strong>变量</strong>：就像其他编程语言一样，免于多处修改。</p>
<ul>
<li>Sass：使用「$」对变量进行声明，变量名和变量值使用冒号进行分割</li>
<li>Less：使用「@」对变量进行声明</li>
<li>Stylus：中声明变量没有任何限定，结尾的分号可有可无，但变量名和变量值之间必须要有『等号』。但需要注意的是，如果用“@”符号来声明变量，Stylus会进行编译，但不会赋值给变量。就是说，Stylus 不要使用『@』声明变量。Stylus 调用变量的方法和Less、Sass完全相同。</li>
</ul>
</li>
<li>
<p><strong>作用域</strong>：有了变量，就必须得有作用域进行管理。就想js一样，它会从局部作用域开始往上查找变量。</p>
<ul>
<li>Sass：它的方式是三者中最差的，不存在全局变量的概念</li>
<li>Less：它的方式和js比较相似，逐级往上查找变量</li>
<li>Stylus：它的方式和Less比较相似，但是它和Sass一样更倾向于指令式查找</li>
</ul>
</li>
<li>
<p><strong>嵌套</strong>：对于css来说，有嵌套的写法无疑是完美的，更像是父子层级之间明确关系</p>
<ul><li>三者在这处的处理都是一样的，使用「&amp;」表示父元素</li></ul>
</li>
</ol>
<p>有了这些方案，会使得我们可以在保证DPY、可维护性、灵活性的前提下，编写css样式。</p>
<p>回到话题中，之所以会出现向预处理器这样子的解决方案，归根结底还是css标准发展的滞后性导致的。同时，我们也应该考虑一下，真的只要预处理器就够了吗？往往在项目过大时，由于缺乏模块的概念，全局变量的问题会持续困扰着你。每次定义选择器时，总是要顾及到其他文件中是否也使用了同样的命名。毕竟项目是团队的，而不是个人的。哪是否有方式可以解决这些问题呢？</p>
<h3 id="articleHeader3">前人的方法</h3>
<p>对于css命名冲突的问题，由来已久，可以说我们前端开发人员，天天在苦思冥想，如何去优雅的解决这些问题。css并未像js一样出现了AMD、CMD和ES6 Module的模块化方案。</p>
<p>那么，回到问题，如何去解决呢？我们的前人也有提出过不同的方案：</p>
<ol>
<li>Object-Oriented CSS</li>
<li>BEM</li>
<li>SMACSS</li>
</ol>
<p>方案可以说是层出不穷，不乏有团队内部的解决方案。但是大多数都是一个共同点——为选择器增加前缀。</p>
<p>这可是一个体力活，你可能需要手动的去编写长长的选择器，或许你可以使用预编译的css语言。但是，它们似乎并为解决本质的问题——为何会造成这种缺憾。我们不妨来看看，使用BEM规范写出来的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 正确的。元素都位于 'search-form' 模块内 -->
<!-- 'search-form' 模块 -->
<form class=&quot;search-form&quot;>
    <!-- 在 'search-form' 模块内的 'input' 元素 -->
    <input class=&quot;search-form__input&quot; />
    <!-- 在 'search-form' 模块内的 'button' 元素 -->
    <button class=&quot;search-form__button&quot;></button>
</form>

<!-- 不正确的。元素位于 'search-form' 模块的上下文之外 -->
<!-- 'search-form' 模块 -->
<form class=&quot;&quot;search-block>
</form>

<!-- 在 'search-form' 模块内的 'input' 元素 -->
<input class=&quot;search-form__input&quot;/>

<!-- 在 'search-form' 模块内的 'button' 元素 -->
<button class=&quot;search-form__button&quot;></button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 正确的。元素都位于 'search-form' 模块内 --&gt;</span>
<span class="hljs-comment">&lt;!-- 'search-form' 模块 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-form"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 在 'search-form' 模块内的 'input' 元素 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-form__input"</span> /&gt;</span>
    <span class="hljs-comment">&lt;!-- 在 'search-form' 模块内的 'button' 元素 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-form__button"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 不正确的。元素位于 'search-form' 模块的上下文之外 --&gt;</span>
<span class="hljs-comment">&lt;!-- 'search-form' 模块 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span><span class="hljs-attr">search-block</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 在 'search-form' 模块内的 'input' 元素 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-form__input"</span>/&gt;</span>

<span class="hljs-comment">&lt;!-- 在 'search-form' 模块内的 'button' 元素 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-form__button"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>每次这样子写，估计是个程序员，都得加班吧，哈哈！</p>
<h3 id="articleHeader4">一种希望</h3>
<p>现在的网页开发，讲究的是组件化的思想，因此，急需要可行的css Module方式来完成网页组件的开发。自从2015年开始，国外就流行了CSS-in-JS(典型的代表，react的styled-components)，还有一种就是CSS Module。</p>
<blockquote><p>本篇谈及后者，需要对前者进行了解的话，自行Google即可</p></blockquote>
<p>对于css，大家都知道，它是一门描述类语言，并不存在动态性。那么，要如何去形成module呢。我们可以先来看一个react使用postcss的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//example.css

.article {
    font-size: 14px;
}
.title {
    font-size: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//<span class="hljs-selector-tag">example</span><span class="hljs-selector-class">.css</span>

<span class="hljs-selector-class">.article</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}
<span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>之后，将这些命名打乱：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".zxcvb{
    font-size: 14px;
}
.zxcva{
    font-size: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.zxcvb</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}
<span class="hljs-selector-class">.zxcva</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>将之命名对应的内容，放入到JSON文件中去：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;article&quot;: &quot;zxcvb&quot;,
    &quot;title&quot;: &quot;zxcva&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
    <span class="hljs-attr">"article"</span>: <span class="hljs-string">"zxcvb"</span>,
    <span class="hljs-attr">"title"</span>: <span class="hljs-string">"zxcva"</span>
}</code></pre>
<p>之后，在js文件中运用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import style from 'style.json';

class Example extends Component{
    render() {
        return (
            <div classname={style.article}>
                <div classname={style.title}></div>
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> style <span class="hljs-keyword">from</span> <span class="hljs-string">'style.json'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">classname</span>=<span class="hljs-string">{style.article}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">classname</span>=<span class="hljs-string">{style.title}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>这样子，就描绘出了一副css module的原型。当然，我们不可能每次都需要手动去写这些东西。我们需要自动化的插件帮助我们完成这一个过程。之后，我们应该先来了解一下postCSS。</p>
<h3 id="articleHeader5">我需要认识你</h3>
<p>PostCSS是什么？或许，你会认为它是预处理器、或者后处理器等等。其实，它什么都不是。它可以理解为一种插件系统。使用它GitHub主页上的介绍：</p>
<blockquote><p>PostCSS is a tool for transforming CSS with JS plugins. These plugins can support variables and mixins, transpile future CSS syntax, inline images, and more.</p></blockquote>
<p>你可以在使用预处理器的情况下使用它，也可以在原生的css中使用它。它都是支持的，并且它具备着一个庞大的生态系统，例如你可能常用的<code>Autoprefixer</code>，就是PostCSS的一个非常受欢迎的插件，被Google, Shopify, Twitter, Bootstrap和CodePen等公司广泛使用。</p>
<p>当然，我们也可以在CodePen中使用它：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011595626?w=600&amp;h=303" src="https://static.alili.tech/img/remote/1460000011595626?w=600&amp;h=303" alt="CodePen" title="CodePen" style="cursor: pointer;"></span></p>
<blockquote><p>这里推荐大家看一下<a href="https://webdesign.tutsplus.com/series/postcss-deep-dive--cms-889" rel="nofollow noreferrer" target="_blank">PostCSS的深入系列</a></p></blockquote>
<p>接下来，我们来看一下PostCSS的配置：</p>
<p>这里我们使用webpack+postcss+postcss-loader+cssnext+postcss-import的组合。</p>
<p>首先，我们可以通过yarn来安装这些包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add --dev webpack extract-text-webpack-plugin css-loader file-loader postcss postcss-loader postcss-cssnext postcss-import" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-built_in">add</span> --dev webpack extract-<span class="hljs-built_in">text</span>-webpack-plugin css-loader file-loader postcss postcss-loader postcss-cssnext postcss-<span class="hljs-keyword">import</span></code></pre>
<p>然后，我们配置一下webpack.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js';
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            'postcss-loader',
          ],
        }),
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css'),
  ],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: path.resolve(__dirname, <span class="hljs-string">'src'</span>),
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./app.js'</span>;
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
          <span class="hljs-attr">use</span>: [
            {
              <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
              <span class="hljs-attr">options</span>: { <span class="hljs-attr">importLoaders</span>: <span class="hljs-number">1</span> },
            },
            <span class="hljs-string">'postcss-loader'</span>,
          ],
        }),
      },
    ],
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'dist/assets'</span>),
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].bundle.css'</span>),
  ],
};</code></pre>
<p>然后在根目录下配置postcss.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: {
    <span class="hljs-string">'postcss-import'</span>: {},
    <span class="hljs-string">'postcss-cssnext'</span>: {
      <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 2 versions'</span>, <span class="hljs-string">'&gt; 5%'</span>],
    },
  },
};</code></pre>
<p>之后，就可以在开发中使用cssnext的特性了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Shared */
@import &quot;shared/colors.css&quot;;
@import &quot;shared/typography.css&quot;;
/* Components */
@import &quot;components/Article.css&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* Shared */</span>
@<span class="hljs-keyword">import</span> <span class="hljs-string">"shared/colors.css"</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">"shared/typography.css"</span>;
<span class="hljs-comment">/* Components */</span>
@<span class="hljs-keyword">import</span> <span class="hljs-string">"components/Article.css"</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* shared/colors.css */
:root {
  --color-black: rgb(0,0,0);
  --color-blue: #32c7ff;
}

/* shared/typography.css */
:root {
  --font-text: &quot;FF DIN&quot;, sans-serif;
  --font-weight: 300;
  --line-height: 1.5;
}

/* components/Article.css */
.article {
  font-size: 14px;
  &amp; a {
    color: var(--color-blue);
  }
  &amp; p {
    color: var(--color-black);
    font-family: var(--font-text);
    font-weight: var(--font-weight);
    line-height: var(--line-height);
  }
  @media (width > 600px) {
    max-width: 30em;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* shared/colors.css */</span>
<span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attribute">--color-black</span>: <span class="hljs-built_in">rgb</span>(0,0,0);
  <span class="hljs-attribute">--color-blue</span>: <span class="hljs-number">#32c7ff</span>;
}

<span class="hljs-comment">/* shared/typography.css */</span>
<span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attribute">--font-text</span>: <span class="hljs-string">"FF DIN"</span>, sans-serif;
  <span class="hljs-attribute">--font-weight</span>: <span class="hljs-number">300</span>;
  <span class="hljs-attribute">--line-height</span>: <span class="hljs-number">1.5</span>;
}

<span class="hljs-comment">/* components/Article.css */</span>
<span class="hljs-selector-class">.article</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
  &amp; a {
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--color-blue);
  }
  &amp; <span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--color-black);
    <span class="hljs-attribute">font-family</span>: <span class="hljs-built_in">var</span>(--font-text);
    <span class="hljs-attribute">font-weight</span>: <span class="hljs-built_in">var</span>(--font-weight);
    <span class="hljs-attribute">line-height</span>: <span class="hljs-built_in">var</span>(--line-height);
  }
  @<span class="hljs-keyword">media</span> (width &gt; <span class="hljs-number">600px</span>) {
    <span class="hljs-selector-tag">max-width</span>: 30<span class="hljs-selector-tag">em</span>;
  }
}</code></pre>
<p>最后使用webpack进行编译就可以了。</p>
<h1 id="articleHeader6">总结</h1>
<p>PostCSS，国内还没有太流行起来，不过相信不久的将来也会逐渐的热门，并且国内的资源较少，不过最近新出了一本大漠老师们一起翻译的书——《深入PostCSS Web设计》。有兴趣的人也可以去看一下，学习一些前言的东西。本篇也只是大概的写了一下PostCSS的东西，鉴于国内资源较少，所以参考了一下国外的博文教材，下面会有链接。</p>
<blockquote><p>如果你对我写的有疑问，可以评论，如我写的有错误，欢迎指正。你喜欢我的博客，请给我关注Star~呦。大家一起总结一起进步。欢迎关注我的<a href="https://github.com/laizimo/zimo-article" rel="nofollow noreferrer" target="_blank">github博客</a></p></blockquote>
<h2 id="articleHeader7">参考链接</h2>
<p><a href="https://evilmartians.com/chronicles/postcss-modules-make-css-great-again" rel="nofollow noreferrer" target="_blank">PostCSS-modules: make CSS great again!</a></p>
<p><a href="https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-what-you-need-to-know--cms-24535" rel="nofollow noreferrer" target="_blank">PostCSS Deep Dive: What You Need to Know</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈PostCSS

## 原文链接
[https://segmentfault.com/a/1190000011595620](https://segmentfault.com/a/1190000011595620)

