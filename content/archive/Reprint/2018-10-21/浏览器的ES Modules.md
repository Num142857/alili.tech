---
title: 浏览器的ES Modules
reprint: true
categories: reprint
abbrlink: 2fcf66e9
date: 2018-10-21 00:00:00
---

{{% raw %}}

            <p>标题是意译的，原文说的JS modules，实际上就是ES6的模块化特性，通过<code>&lt;script type="modules"&gt;</code>可以实现不经过打包直接在浏览器中import/export，此玩法确实让人眼前一亮。</p>
<p>先看看<code>&lt;script type="modules"&gt;</code>的<a href="https://caniuse.com/#feat=es6-module">兼容性</a>。目前只有较新版本的chrome/firefox/safari/edge支持此特性，看来要普及使用还任重道远。下面跟着这篇文章深入了解一下涨涨姿势。</p>
<p><img src="https://ask.qcloudimg.com/http-save/1006489/n1tvx6v6qs.jpeg" alt=""></p>
<p>本文将介绍JS模块化；怎样在不经过打包的情况下直接在浏览器中使用模块化；以及Chrome团队在JS模块化的优化和普及上正在做的一些事情。</p>
<h2>JS模块化</h2>
<p>你可能用过命名空间、CommonJS或者AMD规范进行JS模块化，但所有的这些模块系统万变不离其宗：既可以将其他模块引入(import)，也可以作为一个模块输出(export)。目前ES6正式将模块化的语法进行统一。在一个模块中，你可以使用<code>export</code>关键字输出任何东西：<code>const</code>、<code>function</code>等。</p>
<pre><code class="hljs typescript"><span class="hljs-comment">// lib.mjs</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> repeat = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-string">`<span class="hljs-subst">${string}</span> <span class="hljs-subst">${string}</span>`</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shout</span>(<span class="hljs-params"><span class="hljs-built_in">string</span></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${string.toUpperCase()}</span>!`</span>;
}
</code></pre><p>然后你可以用<code>import</code>关键字从另一个模块中引进来。下面代码将lib模块中的<code>repeat</code>和<code>shout</code>函数引到了我们的主模块main中。</p>
<pre><code class="hljs awk"><span class="hljs-regexp">//</span> main.mjs
import {repeat, shout} from <span class="hljs-string">'./lib.mjs'</span>;
repeat(<span class="hljs-string">'hello'</span>);
<span class="hljs-regexp">//</span> → <span class="hljs-string">'hello hello'</span>
shout(<span class="hljs-string">'Modules in action'</span>);
<span class="hljs-regexp">//</span> → <span class="hljs-string">'MODULES IN ACTION!'</span>
</code></pre><p>你也可以通过<code>default</code>关键字，输出一个默认值。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// lib.mjs</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${string.toUpperCase()}</span>!`</span>;
}
</code></pre><p>而通过上面的<code>default</code>输出的模块，在引入时可以用其他任何变量名。</p>
<pre><code class="hljs clean"><span class="hljs-comment">// main.mjs</span>
<span class="hljs-keyword">import</span> shout <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib.mjs'</span>;
<span class="hljs-comment">//     ^^^^^</span>
</code></pre><p>模块脚本与常规脚本有所区别：</p>
<ul>
<li>模块脚本默认开启了严格模式</li>
<li>不支持HTML风格的注释<code>&lt;!-- comment --&gt;</code></li>
<li>模块具有词法顶级作用域。也就是说在模块中<code>var foo = 42;</code>并不会像传统脚本一样，创建一个全局变量<code>foo</code>，可以通过<code>window.foo</code>访问。 </li>
<li>新的<code>import</code>和<code>export</code>语法仅限于在模块脚本中使用，不能用在常规脚本中。</li>
</ul>
<p>正因为这些差异，模块脚本和传统脚本显然需要各自不同的解析方式。因此JS解析器需要标识出哪些脚本属于是模块类型的。</p>
<h2>浏览器如何识别模块脚本</h2>
<p>你可以通过设置<code>&lt;script&gt;</code>元素的<code>type</code>属性为<code>module</code>，以此告诉浏览器这段script需要以模块进行处理。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"index.mjs"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!--下文称作模块脚本--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">nomodule</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"fallback.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!--下文称作传统脚本--&gt;</span>
</code></pre><p>那些支持<code>type=module</code>的浏览器会忽略掉<code>nomodule</code>的脚本，而不兼容也会优雅降级，执行fallback.js。</p>
<blockquote>
<p>译者注：亲测在IE7+到edge，oppo系统浏览器都能够降级而执行fallback.js。不过加载fallback的同时，也会把index.mjs一并加载，而支持module的浏览器则不会加载fallback。
<img src="https://ask.qcloudimg.com/http-save/1006489/tumvtd61m1.jpeg" alt="IE">
IE系列均会执行fallback.js
<img src="https://ask.qcloudimg.com/http-save/1006489/gm6qpiyzxg.jpeg" alt="IE Network">
加载fallback的同时，也会把index.mjs一并加载
<img src="https://ask.qcloudimg.com/http-save/1006489/jvzp9uyace.jpeg" alt="">
而支持module的浏览器则只会加载模块</p>
</blockquote>
<p>有没想过另外一个好处：既然浏览器能够识别module，那它必然也能够支持ES67的其他特性，如箭头函数、async-await。你不需要为这些特性进行babel编译，现代浏览器跑着更小和最大部分未编译的模块化代码，而不兼容的则使用nomodule的降级代码。</p>
<h3>浏览器加载方面的异同：模块脚本vs传统脚本</h3>
<p>上面介绍了模块脚本和传统脚本在语言层面的异同，除此之外，在浏览器加载过程中也有所不同。</p>
<h4>同样的模块脚本只会执行一次，而传统脚本会声明多次。</h4>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"classic.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"classic.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- classic.js executes multiple times. --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"module.mjs"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"module.mjs"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span>&gt;</span><span class="actionscript"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> './module.mjs';</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- module.mjs executes only once. --&gt;</span>
</code></pre><h4>模块脚本跨域需要加跨域头</h4>
<p>模块脚本及其依赖是通过CORS来获取的，也就是说模块脚本一旦跨域就需要加上适当的返回头，比如<code>Access-Control-Allow-Origin: *</code>。而众所周知，传统脚本则不需要（译者注：还记得传说中的JSONP吗）。</p>
<h4>async属性对内联脚本有效</h4>
<pre><code class="hljs dust"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">async</span>&gt;</span><span class="actionscript"><span class="hljs-keyword">var</span> test = <span class="hljs-number">1</span>;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- async无效 --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">async</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span>&gt;</span><span class="actionscript"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span></span><span class="hljs-template-variable">{a}</span><span class="xml"><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'./a.mjs'</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- async有效 --&gt;</span>
</span></code></pre><p>加了async属性会使得脚本在下载过程中不阻塞DOM渲染，而下载完成后立即执行，两个async脚本之间的执行时序不确定，执行时机也不确定，有可能在domContentLoaded之前或者之后。但这一属性对传统的内联脚本是无效的，而对模块的内联脚本却是有效的。</p>
<h3>关于<code>.mjs</code>文件后缀</h3>
<p>你可能会对前面的<code>.mjs</code>后缀感到好奇，但是在互联网的世界里，文件后缀并不重要，只要服务器下发的MIME类型(<code>Content-Type: text/javascript</code>)正确就可以。浏览器是通过script标签上的type属性来识别模块脚本的，而不是后缀名。</p>
<p>所以无论使用<code>.js</code>还是<code>.mjs</code>都是可以的。但是我们还是建议使用<code>.mjs</code>，原因有两个：</p>
<ol>
<li>在开发的时候，可以不需要看代码，通过后缀名非常直观地看出哪些是模块脚本。</li>
<li>nodejs中，<a href="https://nodejs.org/api/esm.html">ES6的模块化特性仍在实验性阶段</a>，而该特性只支持<code>.mjs</code>后缀的脚本。</li>
</ol>
<h3>模块资源标识符 - module specifier</h3>
<p>在import一个模块时，后面的相对或绝对路径字符串称为module specifier或import specifier，也就是模块资源路径。</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> {shout} <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib.mjs'</span>;
<span class="hljs-comment">//                  ^^^^^^^^^^^</span>
</code></pre><p>浏览器对于模块资源路径做了一些限制。不支持类似下面这种只有模块名或部分文件名的资源路径（称之为bare module specifiers）。这样的限制是为了以后浏览器在支持自定义模块加载器之后，加载器能够自行决定bare module specifiers的解析方式。</p>
<pre><code class="hljs clean"><span class="hljs-comment">// Not supported (yet):</span>
<span class="hljs-keyword">import</span> {shout} <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>;
<span class="hljs-keyword">import</span> {shout} <span class="hljs-keyword">from</span> <span class="hljs-string">'lib.mjs'</span>;
<span class="hljs-keyword">import</span> {shout} <span class="hljs-keyword">from</span> <span class="hljs-string">'modules/lib.mjs'</span>;
</code></pre><p>目前，模块资源路径必须是完整的URL，或者以<code>/</code>,<code>./</code>,<code>../</code>开头的相对URL</p>
<pre><code class="hljs clean"><span class="hljs-comment">// Supported:</span>
<span class="hljs-keyword">import</span> {shout} <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib.mjs'</span>;
<span class="hljs-keyword">import</span> {shout} <span class="hljs-keyword">from</span> <span class="hljs-string">'../lib.mjs'</span>;
<span class="hljs-keyword">import</span> {shout} <span class="hljs-keyword">from</span> <span class="hljs-string">'/modules/lib.mjs'</span>;
<span class="hljs-keyword">import</span> {shout} <span class="hljs-keyword">from</span> <span class="hljs-string">'https://simple.example/modules/lib.mjs'</span>;
</code></pre><h3>模块script默认是defer</h3>
<p>传统脚本的加载和解析会阻塞html的解析，可以通过添加<a href="https://html.spec.whatwg.org/multipage/scripting.html#attr-script-defer"><code>defer</code>属性</a>解决（让脚本加载和html解析并行）</p>
<p><img src="https://ask.qcloudimg.com/http-save/1006489/9kdauydrez.jpeg" alt=""></p>
<p>但这里想告诉你的是，模块脚本默认具备defer的并行功能，因此无需画蛇添足加上defer属性。还有不仅仅只有主模块与html解析并行，其他子模块也一样。</p>
<h2>ES模块化的其他特性</h2>
<h3>动态引入： <code>import()</code></h3>
<p>我们之前仅仅用到了静态的<code>import</code>，它需要在首屏就把全部模块资源都下载下来。但有时候按需加载或异步加载会更为合理，这有助于提高首次加载时间，而<a href="https://developers.google.com/web/updates/2017/11/dynamic-import"><code>import()</code></a>可以用来解决这个问题。</p>
<pre><code class="hljs typescript">&lt;script <span class="hljs-keyword">type</span>=<span class="hljs-string">"module"</span>&gt;
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> moduleSpecifier = './lib.mjs';
    <span class="hljs-keyword">const</span> {repeat, shout} = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-params">moduleSpecifier</span>); <span class="hljs-comment">// lib会在主模块及其依赖都加载并执行完毕之后才会import</span>
    repeat(<span class="hljs-params">'hello'</span>);
    <span class="hljs-comment">// → 'hello hello'</span>
    shout(<span class="hljs-params">'Dynamic <span class="hljs-keyword">import</span> <span class="hljs-keyword">in</span> action'</span>);
    <span class="hljs-comment">// → 'DYNAMIC IMPORT IN ACTION!'</span>
  }</span>)<span class="hljs-params">()</span>;
&lt;/<span class="hljs-params">script</span>&gt;
</span></code></pre><p>不像静态<code>import</code>只能用在<code>&lt;script type="module&gt;"</code>一样，动态<code>import()</code>也可以用在普通的script。具体可以看下我们<a href="https://developers.google.com/web/updates/2017/11/dynamic-import">关于动态import的文章</a>。</p>
<blockquote>
<p>NOTE: <a href="https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching">Webapck自己实现了一套<code>import()</code>方案</a>，可以动态将import()进去的模块抽离出来，生成单独的文件。</p>
</blockquote>
<h3>import.meta</h3>
<p>另一个和ES模块相关的新特性是<code>import.meta</code>，它能提供关于当前模块的meta信息。准确的meta信息并不是ECMAScript规范指定的部分，它取决于宿主环境。在浏览器拿到的meta信息和在nodejs里面拿到的是有区别的。</p>
<p>下面的例子中，图片的相对路径默认是基于HTML所在位置来解析的，但通过<code>import.meta.url</code>可以实现基于当前模块来解析。</p>
<pre><code class="hljs qml"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadThumbnail</span>(<span class="hljs-params">relativePath</span>) </span>{
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">url</span> = <span class="hljs-keyword">new</span> URL(relativePath, <span class="hljs-keyword">import</span>.meta.url);
  <span class="hljs-keyword">const</span> image = <span class="hljs-keyword">new</span> Image();
  image.src = <span class="hljs-built_in">url</span>;
  <span class="hljs-keyword">return</span> image;
}

<span class="hljs-keyword">const</span> thumbnail = loadThumbnail(<span class="hljs-string">'../img/thumbnail.png'</span>);
container.append(thumbnail);
</code></pre><h2>性能优化建议</h2>
<h3>继续使用打包工具</h3>
<p>通过模块脚本，开发时我们可以无需再用webpack、Rollup、Parcel等打包工具就可以享受原生的模块化福利，在以下场景建议可以直接使用原生的模块脚本：</p>
<ol>
<li>开发环境下</li>
<li>不超过100个模块且相对较浅的依赖层级关系（小于5）的小型web应用</li>
</ol>
<p>However, as we learned during our bottleneck analysis of Chrome’s loading pipeline when loading a modularized library composed of ~300 modules, the loading performance of bundled applications is better than unbundled ones.</p>
<p>然而，我们<a href="https://docs.google.com/document/d/1ovo4PurT_1K4WFwN2MYmmgbLcr7v6DRQN67ESVA-wq0/pub">性能瓶颈分析</a>中发现在加载一个模块化库（大约300个模块），经过打包的性能数据要比未经过打包直接使用原生模块脚本的好。</p>
<p><img src="https://ask.qcloudimg.com/http-save/1006489/h1yzqx36wv.jpeg" alt=""></p>
<p>其中一个原因是<code>import</code>/<code>export</code>语法是可以静态分析的，因此可以帮助打包工具分析并移除那些并未使用过的模块。从这可以看出，静态的<code>import</code>/<code>export</code>不仅仅只是语法特性，还具备关键的工具属性！</p>
<blockquote>
<p>我们的总体建议是继续使用打包工具进行上线前的模块打包处理。毕竟从某种程度上，打包可以帮助你尽可能减少代码体积，用户不必要加载无用的脚本，更有利于页面性能。</p>
</blockquote>
<p><a href="https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage">开发者工具的代码覆盖率检查</a>能帮助你检测源码中是否存在无用代码。我们同时也建议通过代码分割对模块进行合理拆分，以及延迟加载非首屏关键路径的脚本。</p>
<p><strong>打包与使用模块脚本的权衡取舍</strong></p>
<p>通常在web开发领域，所有方案都有利弊，需要权衡取舍。与加载一个未经过代码拆分的打包脚本相比，使用模块脚本也许会降低首次加载性能（cold cache），但是可以提升用户再次加载（warm cache）的速度。比如对于总大小200KB的代码，在修改一个细颗粒化的模块之后，那么用户只需要更新有变更的代码，这总比重新加载所有代码（打包脚本）要强。</p>
<p>如果相对于首次访问体验来说，你更关注用户再次访问体验，并且你的应用不超过数百个细颗粒化模块的话，你不妨尝试下使用模块脚本，通过性能数据对比之后再做出最后的选择。</p>
<p>浏览器工程师们正努力提升模块脚本的性能，我们希望模块脚本以后能够适用于更多的应用场景。</p>
<h3>使用细颗粒化的模块</h3>
<p>尽可能让你的代码以细颗粒化的模块进行组织。当在开发时，每个模块最好不要输出过多的内容。</p>
<p>下面的<code>./util.mjs</code>模块，输出了<code>drop</code> <code>pluck</code>和<code>zip</code>三个函数。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drop</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* … */</span> }
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pluck</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* … */</span> }
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zip</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* … */</span> }
</code></pre><p>如果你的代码仅仅只需要<code>pluck</code>，你也许会这样引入：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> { pluck } <span class="hljs-keyword">from</span> <span class="hljs-string">'./util.mjs'</span>;
</code></pre><p>在这种情况下，如果没有构建打包编译，浏览器会还是会下载、解析和编译整个<code>./util.js</code>模块，即使只仅仅需要其中一个export。</p>
<p>如果<code>pluck</code>不与<code>drop</code>和<code>zip</code>有引用或依赖关系的话，最好还是将它独立成一个模块<code>./pluck.mjs</code>。以达到无需加载其他无用函数的目的。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pluck</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* … */</span> }
</code></pre><p>这不仅能够让你的源码简洁，还能够减少对打包工具（移除冗余代码）的依赖。如果在你的应用中其中一个模块从未被<code>import</code>过，那么浏览器就不会去下载。而那些真正有用的模块则会被浏览器<a href="https://v8project.blogspot.com/2018/04/improved-code-caching.html">缓存</a>起来。</p>
<p>此外，使用细颗粒化的模块也有助于对接<a href="https://developers.google.com/web/fundamentals/primers/modules#web-packaging">未来的浏览器原生打包功能</a>。</p>
<h3>预加载模块</h3>
<p>通过<code>&lt;link rel="modulepreload"&gt;</code>你可以进一步优化模块加载。浏览器会预加载甚至预解析和编译这些模块及其依赖。</p>
<pre><code class="hljs routeros">&lt;link <span class="hljs-attribute">rel</span>=<span class="hljs-string">"modulepreload"</span> <span class="hljs-attribute">href</span>=<span class="hljs-string">"lib.mjs"</span>&gt;
&lt;link <span class="hljs-attribute">rel</span>=<span class="hljs-string">"modulepreload"</span> <span class="hljs-attribute">href</span>=<span class="hljs-string">"main.mjs"</span>&gt;
&lt;script <span class="hljs-attribute">type</span>=<span class="hljs-string">"module"</span> <span class="hljs-attribute">src</span>=<span class="hljs-string">"main.mjs"</span>&gt;&lt;/script&gt;
&lt;script nomodule <span class="hljs-attribute">src</span>=<span class="hljs-string">"fallback.js"</span>&gt;&lt;/script&gt;
</code></pre><p>这对于有复杂依赖关系模块的应用尤为重要。没有<code>rel="modulepreload"</code>,浏览器需要发出多个HTTP请求来计算出整个依赖关系。而如果你把所有依赖模块通过<code>rel="modulepreload"</code>提前告诉浏览器，那么浏览器则无需再渐进式地去计算。</p>
<h3>采用HTTP/2协议</h3>
<p>HTTP/2支持<a href="https://developers.google.com/web/fundamentals/performance/http2/#request_and_response_multiplexing">多路复用</a>，多个请求及响应信息可以同时进行传输，这有助于提高模块树的加载效率。</p>
<p>Chrome团队还预研了<a href="https://developers.google.com/web/fundamentals/performance/http2/#server_push">服务器推送</a>——另一个HTTP/2特性，是否能够作为部署高度模块化应用的一个可行方案。但结局令人失望，<a href="https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/">HTTP/2的服务器推送比想象中要难以应用</a>，并且web服务器及浏览器的对其实现目前并没有针对高度模块化web应用进行优化。另一方面，服务器很难只推送未被缓存的资源。如果通过告知服务器完整的用户缓存状态来解决这个问题的话，又存在隐私泄露风险。</p>
<p>无论如何，采用HTTP/2协议吧！只要记住目前HTTP/2的服务器推送还不能作为一个好的解决方案。</p>
<h2>目前的使用情况</h2>
<p>ES modules正在缓慢地被接纳使用。我们的<a href="https://www.chromestatus.com/metrics/feature/timeline/popularity/2062">使用统计</a>显示只有0.08%（不包括动态<code>import()</code>或者<a href="https://drafts.css-houdini.org/worklets/">worklets</a>）的页面目前使用了<code>&lt;script type="module"&gt;</code>。</p>
<h2>ES Modules未来的发展</h2>
<p>Chrome团队正在通过不同的方式，致力于提高基于ES modules的开发体验。下面列举其中的几种。</p>
<h3>更高效、确定性更高的模块解析算法</h3>
<p>我们提交了一版对于目前模块解析算法的优化。新算法目前已经被同时列入了<a href="https://github.com/whatwg/html/pull/2991">HTML规范</a>和<a href="https://github.com/tc39/ecma262/pull/1006">ECMASciprt规范</a>，并且已在<a href="http://crbug.com/763597">Chrome 63</a>版本中实现。希望这项优化能够在更多的浏览器中落地。</p>
<p>新算法更快更高效，旧算法在计算依赖图谱（dependency graph）大小的时间复杂度为O(n²)，旧时Chrome也是一样。但新算法则提升至O(n)。</p>
<p>此外，新算法在报解析错误时更加准确。如果一个依赖图谱（graph）中有多个错误，那么基于旧算法，每次执行都会报不同的解析错误。这给开发调试带来不必要的困难。新算法则保证每次执行都会报相同的解析错误。</p>
<h3>Worklets 和 web workers</h3>
<p>Chrome实现了<a href="https://drafts.css-houdini.org/worklets/">worklets</a>，允许web开发者自定义那些在浏览器底层的硬编码逻辑。目前开发者可以将一个JS模块引入到渲染管道（pipeline）或者音频处理管道。</p>
<p>Chrome65版本支持了<a href="https://developers.google.com/web/updates/2018/01/paintapi"><code>PaintWorklet</code></a>，也称为CSS绘制API（the CSS Paint API），用于控制如何绘制一个DOM元素。</p>
<pre><code class="hljs oxygene"><span class="hljs-keyword">const</span> <span class="hljs-keyword">result</span> = <span class="hljs-keyword">await</span> css.paintWorklet.addModule(<span class="hljs-string">'paint-worklet.mjs'</span>);
</code></pre><p>Chrome66版本支持了<a href="https://developers.google.com/web/updates/2017/12/audio-worklet"><code>AudioWorklet</code></a>，允许开发者注入自定义的音频处理代码。同时这个版本开始了<a href="https://groups.google.com/a/chromium.org/d/msg/blink-dev/AZ-PYPMS7EA/DEqbe2u5BQAJ"><code>AnimationWorklet</code>的公测</a>，开发者可以创造视差滚动效果(scroll-linked)以及其他高性能程序动画（procedural animations）。</p>
<p>最后，<a href="https://drafts.css-houdini.org/css-layout-api/"><code>LayoutWorklet</code></a>，又称为CSS布局API（the CSS Layout API）已在Chrome67版本中实现。</p>
<p>我们正在对Chrome中的<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=680046">web workers支持传入模块脚本</a>。你可以通过输入<code>chrome://flags/#enable-experimental-web-platform-features</code>开启这个特性。</p>
<pre><code class="hljs go"><span class="hljs-keyword">const</span> worker = <span class="hljs-built_in">new</span> Worker(<span class="hljs-string">'worker.mjs'</span>, { <span class="hljs-keyword">type</span>: <span class="hljs-string">'module'</span> });
</code></pre><p>在shared workers和service workers传入模块脚本也即将支持。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> SharedWorker(<span class="hljs-string">'worker.mjs'</span>, { <span class="hljs-keyword">type</span>: <span class="hljs-string">'module'</span> });
<span class="hljs-keyword">const</span> registration = <span class="hljs-keyword">await</span> navigator.serviceWorker.register(<span class="hljs-string">'worker.mjs'</span>, { <span class="hljs-keyword">type</span>: <span class="hljs-string">'module'</span> });
</code></pre><h3>包名映射表 - Package name maps</h3>
<p>在nodejs/npm中，我们经常会通过它们的包名引入模块，比如：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> moment <span class="hljs-keyword">from</span> <span class="hljs-string">'moment'</span>;
<span class="hljs-keyword">import</span> { pluck } <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash-es'</span>;
</code></pre><p><a href="https://html.spec.whatwg.org/multipage/webappapis.html#resolve-a-module-specifier">根据现行的HTML规范</a>，类似上述的包名写法（bare import specifiers）会抛出异常。我们提交的“包名映射表”提案将会支持上述写法（包括在生产环境）。该映射表（JSON格式）将帮助浏览器将包名转换为完整资源路径（full URLs）。</p>
<p>包名映射表目前仍处于提案阶段（proposal stage）。</p>
<h3>Web packaging：浏览器原生打包</h3>
<p>Chrome loading团队正在探索<a href="https://github.com/WICG/webpackage">一种原生的web打包格式</a>（下称为web packaging），作为一种新模式来分发web应用。web packaging的主要特性如下：</p>
<ol>
<li><a href="https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html">Signed HTTP Exchanges</a>：可以让浏览器信任某个HTTP请求对（request/response）确实是来自于所声明的源服务器。</li>
<li><a href="https://wicg.github.io/webpackage/draft-yasskin-wpack-bundled-exchanges.html">Bundled HTTP Exchanges</a>：是多个请求对的集合，不要求当中的每个请求都进行签名（signed），只要携带某些元数据（metadata）用于描述如何将请求束作为一个整体来解析。</li>
</ol>
<p>两者结合起来，这种web打包格式就能够将多个同源资源安全地整合到一个HTTP GET相应中。</p>
<p>市面上的打包工具如webpack、Rollup、Parcel，都会将多个模块最终打包成一个或少数几个bundle，这会导致源码中进行的模块拆分在上线后就丧失了它的意义。那么通过原生打包，浏览器可以将bundle反解成原样。</p>
<p>简单来说，你可以把一个HTTP请求对包（Bundled HTTP Exchange）理解为一个资源文件包，它可以通过目录表（manifest）随意访问，并且里面的资源能够被高效地缓存以及根据相对优先级的高低来标记。有了这个机制，原生模块能够提升开发调试的体验。当你在Chrome开发者工具查看资源时，浏览器会精准定位到原生的模块代码中，而不需要复杂的source-map。</p>
<p>Chrome已经实现了一部分提案（SignedExchanges），但是打包格式（bundling format）以及在高度模块化app中的应用仍在探索阶段。</p>
<h3>Layered APIs</h3>
<p>移植新的功能和API到浏览器中无可避免会带来持续性的维护以及运行成本。每一个新特性都会污染浏览器的命名空间，增加启动开销，并且也增大引入bug的可能性。Layered APIs的目的是以一种更具扩展性的方式通过浏览器来实现或移植一些高级API。而模块脚本是实现Layered APIs的一项关键技术。</p>
<ul>
<li>由于模块是显式引入的，所以通过模块来引入layered APIs可实现按需使用（不会默认内置）。</li>
<li>模块的加载源可自定义，因此layered APIs实现了一套自动加载polyfill（当不支持时）的机制。</li>
</ul>
<p>The details of how modules and layered APIs work together are still being worked out, but the current proposal looks something like this:</p>
<p>模块脚本和layered APIs如何协同运作，具体细节<a href="https://github.com/drufball/layered-apis/issues">仍在制定中</a>，但目前的协议如下：</p>
<pre><code class="hljs xml"><span class="hljs-comment">&lt;!-- src中竖杠后面是指定polyfill的路径，浏览器不支持时可自动加载，不错的降级方式 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">"module"</span>
  <span class="hljs-attr">src</span>=<span class="hljs-string">"std:virtual-scroller|https://example.com/virtual-scroller.mjs"</span>
&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">virtual-scroller</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- Content goes here. --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">virtual-scroller</span>&gt;</span>
</code></pre><p>这个模块脚本引入了<code>virtual-scroller</code>API，如果浏览器支持则会直接读取内置layered APIs集合（std:virtual-scroller），反之则网络加载对应的polyfill。</p>
<blockquote>
<p>译者：对于Layered APIs更多的中文介绍 <a href="https://zhuanlan.zhihu.com/p/37008246">https://zhuanlan.zhihu.com/p/37008246</a></p>
</blockquote>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/using-javascript-modules-on-the-web](https://www.zcfy.cc/article/using-javascript-modules-on-the-web)
原文标题: 浏览器的ES Modules
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
