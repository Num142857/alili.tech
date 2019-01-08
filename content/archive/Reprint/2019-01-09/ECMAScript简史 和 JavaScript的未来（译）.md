---
title: 'ECMAScript简史 和 JavaScript的未来（译）' 
date: 2019-01-09 2:30:12
hidden: true
slug: a1h31fwkh2m
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>本文翻译自 Nicolas Bevacqua 的书籍 <a href="https://ponyfoo.com/books/practical-modern-javascript" rel="nofollow noreferrer" target="_blank">《Practical Modern JavaScript》</a>,这是该书的第一章。翻译时我收获很大，希望阅读时你也能有所收获。</p>
<p>本章主要讲述了以下内容：</p>
<ul>
<li><p>JS语言的发展简史；</p></li>
<li><p>规范的<code>stage0</code>,<code>stage1</code>,<code>stage2</code>,<code>stage3</code>,<code>stage4</code>各阶段的意义；</p></li>
<li><p><code>ployfill</code>是局限性的新规范实现；</p></li>
<li><p><code>babel</code>，<code>eslint</code>的基本使用方法;</p></li>
<li><p>ES6的划分；</p></li>
</ul>
</blockquote>
<p><strong>以下为正文</strong></p>
<hr>
<p>谁也想不到，1995年被当做营销策略推出的JavaScript语言，在2017年成为了最受欢迎平台（web）上的核心语言。JavaScript现在不仅可以在浏览器中运行，它还被用作开发桌面和手机应用，用于嵌入式设备，甚至NASA还拿它来设计太空组件。</p>
<p>这些年来，JavaScript语言取得的成绩有目共睹，其变化也是日异月殊，我们不禁好奇，JS是如何取得这些成绩的，未来的JavaScript又该向何处发展？</p>
<h2 id="articleHeader0">JS标准制定简史</h2>
<p>1995年，那时候的浏览器还只支持html和简单的css,当时的浏览器巨头--网景公司，不甘于浏览器中只能实现用HTML的静态网站，Brendan Eich 也因此被招进网景，着手开发一种供浏览器使用的类似<code>Scheme</code>的函数式语言。不过他加入后发现，网景公司高层希望这门语言看起来像Java（存在暗中进行的交易）。</p>
<p>只花了10天时间 Brendan 就开发完成了当时被称作<code>Mocha</code>的初版 JavaScript 原型，这个新语言类似 <code>Scheme</code> ，它把函数当做一等公民，并以原型链为其核心。那时候的JS比较简陋，没有数组和字面量的对象的概念，所有的报错都只能通过丑陋的<code>alert</code>展示，缺乏异常处理机制，出错时很多运算的结果会是<code>NaN</code>或<code>undefined</code>。不过 Brendan 对 DOM 0 的描述及初版的JavaScript还是成为了最初的标准。</p>
<p>1995年9月，网景公司发布了Netscape Navigator 2.0 beta版，JavaScript也被包装为<code>LiveScript</code>一同面世。1995年12月，Netscape Navigator 2.0 beta3发布，<code>LiveScript</code>在这时被改名为<code>JavaScript</code>(当时这个商标为Sun公司所有，现在属甲骨文公司)。之后不久,网景推出了<code>LiveWire</code>，一种在其服务器（<code>Netscape Enterprise Server</code>）上的<code>JavaScript</code>实现<sup><a>1</a></sup>。</p>
<p>1996年，微软推出了<code>JScript</code>，同ie3捆绑发行,<code>JScript</code>在微软的IIS服务器上同样可用。</p>
<p>1996年开始,JS语言开始走上规范之路，它已<code>ECMAScript</code>的名字被标准化到<strong>ECMA-262</strong>规范，规范指定者是<strong>ECMA</strong>组织下的一个名为<strong>TC39</strong>的技术委员会。由于当时Sun公司不愿意转让<code>JavaScript</code>这一商标，虽然微软愿意转让<code>JScript</code>这一商标,但却遭到其它公司成员的反对，因此这一语言的名字就成了我们熟悉的<code>ECMAScript</code>。</p>
<p>尽管<code>JavaScript</code>和<code>JScript</code>是竞争关系，网易和微软在当时的<strong>TC39</strong>标准委员会占主导地位，委员会还是取得了大量的成果，<strong>向后兼容</strong>被设定为之后标准制定的黄金法则，比如说虽然有了新的严格相等运算符<code>===</code>，但是JS同时兼容了非严格相等运算符<code>==</code>。</p>
<p>1997年6月<strong>ECMA-262</strong>的第一版发布，之后一年中，规范依据<strong>ISO / IEC 16262国际标准</strong>进行了改进，并由ISO认证机构大量审查，1997年6月<code>ECMAScript</code>规范正式发布第二版。</p>
<p>1999年12月，第三版也发布了，这一版的规范带来了<strong>正则表达式</strong>，<code>switch</code>，<code>do/while</code>,<code>try/catch</code>，<code>Object#hasOwnProperty</code>以及其它的一些改变，同时新增的大部分规范在网景的新版浏览器<strong>SpiderMonkey</strong>中也得以实现。</p>
<p>ES4标准的草案在之后不久就被<code>TC39</code>提出，这一草案直接影响了2000年中期的<code>JScript</code>,<code>.NET</code>等的开发，2006年Flash推出了<code>ActionScript 3</code>也深受其影响。</p>
<p>但是关于<code>JavaScript</code>语言该如何发展，当时的意见非常矛盾，这使规范制定的工作停滞不前。这在Web标准指定史上是一个非常尴尬且奇妙的时刻，当时微软掌握着主动权，但是它对规范的改进却没太大的兴趣。</p>
<p>两年后，随着火狐浏览器市场占有率不断增高，就职于 Mozilla 的 Brendan 迫使微软回到标准指定的议程中。2005年中期开始，TC39委员会又开始了例会。重新开始讨论起<strong>ES4</strong>，他们计划在<code>ES4</code>中引入<strong>模块系统</strong>，<strong>类</strong>，<strong>迭代器</strong>，<strong>生成器</strong>，<strong>解构</strong>，<strong>类型注释</strong>，<strong>适当的尾调用</strong>，<strong>新的数据类型</strong>和各种其他功能,由于这个工程的野心太大，<strong>ES4</strong>的制定因而被一而再的延期。</p>
<p>2007年，<strong>TC39</strong>委员会被迫分为两部分，一部分负责<strong>ES3</strong>的渐进加强版<code>ES3.1</code>标准的制定，另一部分则负责重新设计改动巨大的<strong>ES4</strong>标准。2008年8月，<strong>ES3.1</strong>被认为是正确的选择，随后其更名为<strong>ES5</strong>，<strong>ES4</strong>也随之被废弃，不过值得庆幸的是 <strong>ES4</strong> 提出的很多新功能被融入到了 <strong>ES6</strong> ，也有一些功能仍然在考虑之中，另一些则已被放弃，拒绝或撤回。兼容<strong>ES3.1</strong> 成为 <strong>ES4</strong> 标准提出的功能可能被采纳的前提。</p>
<p>2009年12月，ES3发布10周年后，第五版<code>ECMAScript</code>才得以发布。这个版本把十年来各浏览器中已有的普遍实践标准化了，新增了<code>get</code>`set`，改进了数组原型的函数式特征，原生支持了JSON的解析，提出了严格模式。</p>
<p>2011年6月，ES5标准再次修改并改进为 <strong>ISO/IEC 16262:2011标准</strong> 的第三版，并以<strong>ES5.1</strong>的名义正式发布。</p>
<p>2015年6月，也就是ES5.1发布的四年后，TC39公布了JS语言有史以来最大的更新 <strong>ES6</strong>，其中包含了很多ES4中提出草案。本书，我们将深入探索ES6。</p>
<p>ES6的发布是JS标准制定历史上的一个重要里程碑。除了数十种引入注目的新功能，ES6 的发布也标志着 ECMAScript 标准将持续更新。</p>
<h2 id="articleHeader1">持续更新的 ECMAScript 标准</h2>
<p>ES3发布了十年都没有重大变化，而后的ES6花了四年才得以标准化，TC39的效率确实需要改进了。之前标准的修订本身是有期限的，但是只要未达成共识，修订时间就会被延长，延长的时间里可能有些功能又有了新的变化，这又导致更多的延迟。</p>
<p>不过随着ES6标准的指定，TC39的工作流程也流线化了。为了满足频繁的需求能持续更新，他们优化了规则的制定过程，为此，新流程的指定从基于Word转移到使用<code>Ecmarkup</code>（用于格式化ECMAScript规范的HTML超集）和<code>Github request</code>,这使得提案数量以及非会员参与度都大大提升，新的流程指定过程也更透明了，以往你需要从网上下载某个规范的word或pdf说明文稿，现在你随时可以通过<a href="https://mjavascript.com/out/spec-draft" rel="nofollow noreferrer" target="_blank">这个网站</a>看见最新的草案。</p>
<p>现在Firefox，Chrome，Edge，Safari和Node.js的最新版都原生实现了 ES6 规范中超过95％的标准了，但是我们并不需要等到规范百分百的被支持再使用新语法。在描述如何使用之前，我们先看看规范指定的几个阶段。</p>
<ul>
<li><p><strong>Stage0</strong> ：任何尚未提交为正式提案的讨论，想法，改变或对已有规范的补充建议都被认为是一个稻草人草案（“strawman” proposal），但只有TC39成员可以提出此阶段的草案。</p></li>
<li><p><strong>Stage1</strong> ：此阶段，稻草人草案升级为正式化的提案，并将逐步解决多部门关切的问题，如与其他提案的相互之间会有什么影响，这一草案具体该如何实施等问题。人们需要对这些问题提供具体的解决方案。stage1的提案通常还需要包括API描述，拥有说明性使用示例，并对语义和算法进行讨论，一般来说草案在这一阶段会经历巨大的变化。</p></li>
<li><p><strong>Stage2</strong> ：此阶段，草案就有了初始的规范。通过<code>polyfill</code>，开发者可以开始使用这一阶段的草案了，一些浏览器引擎也会逐步对这一阶段的规范的提供原生支持，此外通过使用构建工具也可以编译源代码为现有引擎可以执行的代码，这些方法都使得这一阶段的草案可以开始被使用了。</p></li>
<li>
<p><strong>State3</strong> ：此阶段的规范就属于候选推荐规范了，这一阶段之后变化就不会那么大了，要达到这一阶段需要满足以下条件：</p>
<ul>
<li><p>规范的编辑和指定的审阅者必须在最终规范上签字；</p></li>
<li><p>用户也应该对该提议感兴趣；</p></li>
<li><p>提案必须至少被一个浏览器原生支持；</p></li>
<li><p>拥有高效的<code>ployfill</code>，或者被Babel支持；</p></li>
</ul>
</li>
<li><p><strong>Stage4</strong> ：此阶段的提案必须有两个独立的通过验收测试的实现，进入第4阶段的提案将包含在 ECMAScript 的下一个修订版中。</p></li>
</ul>
<p>ES6开始，TC39每年都会发布新的规范，新的规范将包含年号，如ES6 别名 ES2015，2016年通过的规范将叫 真名叫 ES2016 而非ES7，以此类推。不过对ES6，社区还是习惯喊其为 ES6，因为其在新命名规则公布之前就以被大家熟悉，ES7有时候也会面临类似的问题，不过之后就会好转了，我们之后会说ES6，ES2016，ES2017，ES2018等等。</p>
<p>精简提案流程和每年发布的新版本使得新版标准的发布得以持续化，不过这也意味着版本号不再那么重要了，这也使得现在大家都把精力放在提案上，对参考ECMAScript标准的期待反而变少了。</p>
<h2 id="articleHeader2">浏览器支持情况和兼容工具</h2>
<p>上文已经说了，只要JavaScript引擎提供了两个独立的实现，第3阶段的候选推荐方案就非常有可能在下一步中就被纳入规范。实际上，Stage3的提案通过可以通过实验阶段的浏览器解析，<code>ployfill</code>或者转译器解析后，一般被认为是可以在生产环节中安全的使用。Stage2的提案以及更早的提案也被有些开发者运用到生产中，这使得社区对规范有了更多的反馈。</p>
<p>类似Babel这样，以代码作为输入，以浏览器可识别的HTML，CSS，JS的作为输出的工具被称为转译器，或者转译器（转译器的子集），当我们想在我们的代码中写还不是正式标准的语法时，Babel 这类转译器可以帮助我们，它们可以把尚不被支持的语法转换为目前被浏览器广泛支持的语法。</p>
<p>编译一般在开发阶段进行。这使得浏览器更早的‘支持了’新的规范，让JS开发者更早享受到了新规范带来的好处。同时这对规范的作者和实践者也大有裨益，他们因此收集到了更多关于规范可行性、可取性，可能的错误或边缘案例的反馈。</p>
<p>使用转译器转译，是现今在生产环境使用ES6语法的最值得信赖的方案，只需要一个<code>build</code>步骤,我们的新代码就可以被老的浏览器成功解析了。</p>
<p>同样我们也可以通过转译提前使用ES7甚至更新的语法，新的标准每年的推出，转译器也将会马上支持ES2017，ES2018等等，与此同时，随着浏览器对新标准的支持度越来越高，转译器也会逐步减少对ES6代码的转译，ES7的转译等等。从这个角度看来，转译器起到了连接新旧的作用。</p>
<p>Babel如此重要下面我们谈谈如何在工作中使用Babel。</p>
<h2 id="articleHeader3">Babel转译器简介</h2>
<p>Babel可以转译ES6代码为ES5代码，经转译的代码是易读的，这有助于我们加深我们对新语法的理解。</p>
<p>在线的<a href="https://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">Babel REPL (Read-Evaluate-Print Loop）</a> 为我们学习ES6提供了很好的途径，无须安装Node.js,无须使用 <code>Babel</code> CLI ，在网页上就可以实现源代码的转译。</p>
<p>在Babel REPL中我们只需要在左侧输入代码，在右侧就可以看到编译后的代码，转译会自动进行。</p>
<p>在REPL中，我们在左侧输入以下代码看看会发生什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var double = value => value * 2
console.log(double(3))
// <- 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> double = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value * <span class="hljs-number">2</span>
<span class="hljs-built_in">console</span>.log(double(<span class="hljs-number">3</span>))
<span class="hljs-comment">// &lt;- 6</span></code></pre>
<p>在右侧我们可以看到编译为ES5的结果，如下图所示，当你更新左侧代码时，右侧也会实时更新<br><span class="img-wrap"><img data-src="/img/remote/1460000010074712" src="https://static.alili.tech/img/remote/1460000010074712" alt="图1 online Babel REPL" title="图1 online Babel REPL" style="cursor: pointer; display: inline;"></span></p>
<p>学习新语法免不了实践，REPL就是我们的练武场，不过需要注意的是，Babel 不能直接转译新增的<code>Symbol</code>,<code>Proxy</code>,<code>WeakMap</code>等语法，并非Babel忽略了这些新特性，转译时，如果运行了Babel提供的相关插件，这些语法也能被转译，这意味着我们需要在代码中引入<code>babel-ployfill</code>。</p>
<p>为什么要这样呢？</p>
<p>需要额外引入ployfill是因为，老版本的JS中，想要正确执行这些新语法是很难的或者几乎是不可完成的。polyfills 虽然可以貌似解决这种问题，但是通常并不能百分百覆盖所有使用场景情况，也就是说 ployfill 实际上只是一种折中处理，因此如果我们在生成环境中使用这类新的语法，就算通过ployfill转译了，我们也应该在正式上线前仔细进行测试。</p>
<p>也因此，对于这些无法转译的新内置语法，我们最好还是等浏览器完全支持以后再使用。不过就算暂时不能使用，我们也还是应该学习这些新特性，使得自己对JS语言有更深刻的理解。</p>
<p>虽然新的Chrome，Firefox，Edge等现代浏览器现在已经支持大部分的 ES2015 甚至更新的语法，当我们使用某个新语法时，浏览器的开发者工具非常有用。但是如果生产阶段想要使用新语法，我们还是推荐你对代码进行转译，这能让你的app的适用性更广。</p>
<p>除了REPL，通过Babel提供的一个node.js包，我们还可以在命令行中实现转译，下面以一个简单的例子作为示范：</p>
<p>新建目录，打开目录所在位置的终端，并通过<code>npm init</code> 命令实现这个目录的初始化；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir babel-setup
cd babel-setup
npm init --yes # yes参数使得初始化时采用默认设置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">mkdir babel-setup
cd babel-setup
npm init --yes # yes参数使得初始化时采用默认设置</code></pre>
<p>创建一个名为<code>example.js</code>的文件，在babel-setup目录下新建子目录 src,并把这个文件保存其中，在example.js中添加下述内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var double = value => value * 2
console.log(double(3))
// <- 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> double = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value * <span class="hljs-number">2</span>
<span class="hljs-built_in">console</span>.log(double(<span class="hljs-number">3</span>))
<span class="hljs-comment">// &lt;- 6</span></code></pre>
<p>打开终端工具，输入以下代码完成Babel的安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-cli​@6 --save-dev
npm install babel-preset-env@6 --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">npm install babel-cli​@<span class="hljs-number">6</span> --save-dev
npm install babel-preset-env@<span class="hljs-number">6</span> --save-dev</code></pre>
<blockquote>
<p>注：通过 <code>npm</code> 指令初始化的node项目，会自动在根目录新建一个名为node_modules的文件夹，之后我们通过<code>npm scripts</code>或通过<code>require</code>语句就可以在项目中引用这些包</p>
<p><code>--save-dev</code> 参数会将新安装的包添加到我们的<code>package.json</code>配置文件中作为开发依赖项，当我们把我们的项目复制到新的环境中时，我们只需要通过<code>npm install</code>指令完成依赖环境的安装。</p>
<p><code>@</code>标记用以指明安装某特定版本的包，使用<code>@6</code>，<code>npm</code> 将安装<code>babel-cli</code>,<code>6.x</code>版中的最新版。这种偏好设置可以非常有效的在未来保护我们的应用，永远不会安装<code>7.0.0</code>或者更新的版本，这些新版本可能包含我们在此时开发时无法预料的重大改变。</p>
</blockquote>
<p>接下来，我们按照下面的方法替换 <code>package.json</code> 文件中的 <code>scripts</code> ，<code>babel-cli</code> 提供的 <code>babel</code> 命令会检测整个<code>src</code>目录，把他们转换为我们想要的输出格式，并存储在目录<code>dist</code>中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;babel src --out-dir dist&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"babel src --out-dir dist"</span>
  }
}</code></pre>
<p>现在我们的 <code>package.json</code> 应该是下面这个样子了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;babel src --out-dir dist&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;babel-cli&quot;: &quot;^6.24.0&quot;,
    &quot;babel-preset-env&quot;: &quot;^1.2.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"babel src --out-dir dist"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"babel-cli"</span>: <span class="hljs-string">"^6.24.0"</span>,
    <span class="hljs-string">"babel-preset-env"</span>: <span class="hljs-string">"^1.2.1"</span>
  }
}</code></pre>
<blockquote><p>任何写作<code>scripts</code>对象中的命令都可以通过<code>npm run &lt;name&gt;</code>来执行，它会暂时修改<code>$PATH</code>的值，这使得虽然我们的<code>babel-cli</code>并未全局安装，但是也可以直接运行</p></blockquote>
<p>我们在命令行中输入<code>npm run build</code>命令，系统会自动新建<code>dist/example.js</code>文件，此时的输出文件会和我们的源代码一致，这是因为<code>babel</code>并不会自动给我们添加配置文件，我们需要在根目录创建文件<code>.babelrc</code>输入下述代码进行配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;env&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"env"</span>]
}</code></pre>
<p>我们安装的<code>env</code> 预设 , 会在构建时添加一系列的Babel插件，这些插件可以转换不同的ES6代码为ES5代码，具体到我们的 <code>example.js</code> 我们会看到我们使用的箭头函数被转换为了 ES5中的普通函数，<code>env</code> 预设依照协议，依据浏览器的支持情况转换JS代码，这个预设是可以配置的，我们可以控制需要兼容到哪一版本的浏览器。默认情况下所有的新语法都会被转译，以让我们的应用有尽可能广的兼容性。</p>
<p><code>example.js</code>转译为ES5后，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="» npm run build
» cat dist/example.js
&quot;use strict&quot;

var double = function double(value) {
  return value * 2
}
console.log(double(3))
// <- 6
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">» npm run build
» cat dist/example.js
<span class="hljs-meta">"use strict"</span>

<span class="hljs-keyword">var</span> double = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">double</span>(<span class="hljs-params">value</span>) </span>{
  <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>
}
<span class="hljs-built_in">console</span>.log(double(<span class="hljs-number">3</span>))
<span class="hljs-comment">// &lt;- 6</span>
</code></pre>
<p>下面我们来说明如何使用另外一个非常有用的工具，<code>eslint</code>，它可以依据某个基线标准，帮助我们改善代码质量。</p>
<h2 id="articleHeader4">使用ESLint改善我们的代码质量并保证一致性</h2>
<p>随着应用逐步复杂，我们的代码量会越来越多，这同时会带来很多问题，一些代码可能是多余的或不再那么有用，我们需要写新的代码，删除一些不再相关或必须的特性；运用新架构也可能也会需要调整代码位置；但是随着项目的扩大，开发人员也随之增多。</p>
<p>lint工具可以用于识别语法错误，现代的lint工具也常常是可自定义的，通过抽象团队成员的意见为编码样式规则，以合适的配置使用linter工具，能帮助团队构建一种对每个人适用的一致的编码风格。</p>
<p>除了确保程序可以正常运行，我们可能还希望防止<code>throw</code>语句抛出异常，在生产代码中不允许出现 <code>console.log</code> 和 <code>debugger</code> 等语句。这些都可以通过lint工具来实现。</p>
<p>尽管linter在定义和实行编码风格方面是有效的，但是我们也应该小心定义规则，如果定义的规则过于严格，开发人员可能会沮丧到影响开发效率，如果过于宽松，则又难以维持代码的一致性。</p>
<p>ESlink是一个具有很多插件的现代linter工具，它支持众多规则，并允许我们挑选需要的规则去遵守。通过配置可以实现在没有准守这些规则时会在输出中打印出警告语句或者错误。</p>
<p>使用<code>npm</code> 可以完成<code>eslint</code>的安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install eslint@3 --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm install eslint@<span class="hljs-number">3</span> --save-dev</code></pre>
<p>接下来，我们对ESlint进行基本配置 , 由于我们的<code>eslint</code>并非全局安装，我们可以在<code>node_modules/.bin</code>文件夹下找到对应的命令行工具。执行下面的命令行命令将引导我们完成对项目的首次配置。在这里，我们选用<code>standard</code>以选用流行风格，并配置配置文件为<code>JSON</code>格式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/eslint --init
? How would you like to configure ESLint?
  Use a popular style guide
? Which style guide do you want to follow? Standard
? What format do you want your config file to be in? JSON" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">./node_modules/.bin/eslint --init
? How would you like to configure ESLint?
  Use a popular style guide
? Which style guide <span class="hljs-keyword">do</span> you want to follow? Standard
? What format <span class="hljs-keyword">do</span> you want your config file to be <span class="hljs-keyword">in</span>? JSON</code></pre>
<p>除了个人风格，<code>eslint</code>允许我们拓展预定义的风格，这些拓展都以node.js的包呈现。在选择<code>standard</code>风格后，我们会发现<code>ESlint</code>添加了一些依赖项到<code>package.json</code>中，它们是预定义标准风格的所依赖的包，<code>eslint</code>还在根目录下，创建了一个名为<code>.eslintrc.json</code>的配置文件，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .eslintrc.json
{
  &quot;extends&quot;: &quot;standard&quot;,
  &quot;plugins&quot;: [
    &quot;standard&quot;,
    &quot;promise&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// .eslintrc.json</span>
{
  <span class="hljs-string">"extends"</span>: <span class="hljs-string">"standard"</span>,
  <span class="hljs-string">"plugins"</span>: [
    <span class="hljs-string">"standard"</span>,
    <span class="hljs-string">"promise"</span>
  ]
}</code></pre>
<p>在命令行中使用命令时还要带上<code>node_modules/bin</code>这样的路径感觉很不好，为了解决这个问题，我们把<code>lint</code>命令也添加到<code>package.json</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;lint&quot;: &quot;eslint .&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint ."</span>
  }
}</code></pre>
<p>也许你还记得，<code>npm run</code>会临时把<code>node_modules</code>目录添加到<code>$PATH</code>中。现在当我想lint我们的代码时，输入<code>npm run lint</code>就可以了，npm会自动找到对应的包。</p>
<p>还是以<code>example.js</code>文件为例，这个文件目前存在一些样式问题，我们看看<code>ESLint</code>的效果如何：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 样式不对的expamle.js
var goodbye='Goodbye!'

function hello(){
  return goodbye}

if(false){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 样式不对的expamle.js</span>
<span class="hljs-keyword">var</span> goodbye=<span class="hljs-string">'Goodbye!'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> goodbye}

<span class="hljs-keyword">if</span>(<span class="hljs-literal">false</span>){}</code></pre>
<p>当我们执行<code>lint</code>脚本，ESlint会列出这个文件中的所有问题，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010074713" src="https://static.alili.tech/img/remote/1460000010074713" alt="ESLint 错误示例" title="ESLint 错误示例" style="cursor: pointer; display: inline;"></span></p>
<p>如果我们在执行上述命令的时候 添加参数 <code>--fix</code>，eslint会为我们修复大部分的问题，我们修改<code>package.json</code>如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;lint-fix&quot;: &quot;eslint . --fix&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"lint-fix"</span>: <span class="hljs-string">"eslint . --fix"</span>
  }
}</code></pre>
<p>当我们执行 <code>lint --fix</code>的时候，我们会发现现在的错误只是说 <code>hello</code> 从未使用过，<code>false</code>是一个不变的状态，其它的问题都被修复了，修复后的代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改后的example.js
var goodbye = 'Goodbye!'

function hello() {
  return goodbye
}

if (false) {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 修改后的example.js</span>
<span class="hljs-keyword">var</span> goodbye = <span class="hljs-string">'Goodbye!'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> goodbye
}

<span class="hljs-keyword">if</span> (<span class="hljs-literal">false</span>) {}</code></pre>
<p><code>--fix</code>的参数是我们解决代码风格问题时的有效帮手，但是也不用担心它会搅乱我们的程序，ESlint只会修复该修复的部分。</p>
<blockquote><p><code>prettier</code>是另一个类似的工具，它会自动规范化我们的代码，当我们给定固定的规则，如空格数，使用单引号还是双引号，尾逗号，以及一行最大长度时，<code>prettier</code>会实现我们的代码的自动重写。</p></blockquote>
<p>读到这里，你已经知道了如何转译现代的JS为浏览器普遍支持的JS，也知道了如何合适的使用lint来规范代码，下面我们了解一下本书的结构。</p>
<h2 id="articleHeader5">ES6中的新特性</h2>
<p>ES6改动非常大，这从规范的页数就可以看出，ES5.1 258页，ES6 566页。总的来说新增的规范可以划分为以下不同类别：</p>
<ul>
<li><p>语法糖</p></li>
<li><p>新机制</p></li>
<li><p>更好的语义化</p></li>
<li><p>更多内置的方法</p></li>
<li><p>现存局限方法的非破坏性解决方案</p></li>
</ul>
<p>语法糖是ES6所有改变中最重要的一块，<code>class</code>语法可简洁的构建对象实例，支持使用箭头函数，简写的对象属性方法，解构，剩余值，和拓展，等提供语义良好的编写程序的方法。第二章 [ES6 Essentials and Classes, Symbols, Objects, and Decorators]()将讨论 ES6 的这些新特性。</p>
<p>ES6为我们提供了几种控制异步代码流的机制：包括可靠的<code>promises</code>，表征一系列值的<code>iterators</code>，特殊的<code>iterators</code>--&gt; <code>generators</code>。基于这些新概念,ES2017还有了了<code>async/await</code>语法，让我们以同步的方式来书写异步代码。在[Iteration and Flow Control]()一节中，我们将详细叙述各种新机制。</p>
<p>ES6提供了一些新的内置类型来管理set和map,这些新类型不具有仅使用字符串键的限制，这一部分，我们会在[Practical Considerations]()这一节中进行系统的描述。</p>
<p><code>Proxy</code>对象重新定义了我们通过<code>JavaScript reflection</code>可以做什么，Proxy对象类似于其它上下文中的代理。可以用以修改与JavaScript对象的任何交互，如定义、删除或访问属性。考虑到代理对象的工作机制，他们不能彻底通过<code>ployfill</code>实现，事实上相关的<code>ployfill</code>也是存在的，但是由于存在局限性使得他们在某些方面与规范有所不一致。我们将在[ Managing Property Access with Proxies]()这一节彻底理解代理对象。</p>
<p>除此之外，ES6对<code>Number</code>,<code>Math</code>,<code>Array</code>和<code>string</code>等都进行了更新，提供了新的api。在[Build-in Improvement in ES6]()这一节，我们将通过大量的示例来实践这些api。</p>
<p>ES6还在语言层面上为我们提供了模块系统，[JavaScript Modules]()一节里，我们将讲述JS的模块系统。</p>
<p>考虑到ES6的改动之大，我们很难用我们现有的JS知识理解所有的新特性，[ Practical Considerations ]()一节我们会分析各ES6特性的优点和重要性，以便你对ES6有一个更加系统的理解。</p>
<h2 id="articleHeader6">JS语言的未来</h2>
<p>谁也想不到出生如此卑微的JS语言，今天的应用会如此广，它改变巨大，ES6就是这变化过程中的一大步，当然这肯定不是终点，考虑到标准每年都会更新，学会如何和最新标准保持一致非常重要。</p>
<p>前面我们已经说明了，ES是一个持续更新的标准，最好的学习新标准的方法是周期性的浏览TC39的<a href="https://github.com/tc39" rel="nofollow noreferrer" target="_blank">建议库</a>，尤其要注意浏览处于stage3阶段的提议，这些很可能就是之后的标准。</p>
<p>另一些跟上进度的方法是，订阅每周电子邮件，和阅读JavaScript的博客。</p>
<p>在写本书的时，等待已久的<code>Async Functions </code>提议已经定于在ES2017中发布。同时还有一些处于候选阶段的提议，比如动态<code>import()</code>，这允许异步的加载本地JS模块，还有一个建议用ES6中的<code>rest</code>和 <code>spread</code>语法 对对象属性进行枚举。</p>
<p>尽管本书主要将讨论ES6，我们也会学习一些重要的候选方案，如之前已经提及的<code>async functions</code>,<code>dynamic import()</code>，<code>calls</code>以及对象的 <code>rest/spread</code>和一些其它的属性。</p>
<h2 id="articleHeader7">参考文献</h2>
<ol>
<li><p>A booklet from 1998 explains the intricacies of server-side JavaScript with LiveWire.</p></li>
<li><p>You can read the original announcement at the Microsoft website (July, 2000).</p></li>
<li><p>Listen to Brendan Eich in the JavaScript Jabber podcast, talking about the origin of JavaScript.</p></li>
<li><p>You can read a news report from The Mac Observer, July 2003.</p></li>
<li><p>Brendan Eich sent an email to the es-discuss mailing list in 2008 where he summarized the situation, almost 10 years after ES3 had been released.</p></li>
<li><p>For the full set of changes made when merging the Web ECMAScript specification upstream, see the WHATWG blog.</p></li>
<li><p>Check out the presentation “Post-ES6 Spec Process” from September 2013 that led to the streamlined proposal revisioning process here.</p></li>
<li><p>Check out all of the proposals being considered by TC39.</p></li>
<li><p>Check out this detailed table reporting ES6 compatibility across browsers.</p></li>
<li><p>Take a look at the TC39 proposal process documentation.</p></li>
<li><p>You can track strawman proposals.</p></li>
<li><p>Note that Standard is just a self-proclamation, and not actually standardized in any official capacity. It doesn’t really matter which style guide you follow as long as you follow it consistently. Consistency helps reduce confusion while reading a project’s codebase. The Airbnb style guide is also fairly popular and it doesn’t omit semicolons by default, unlike Standard.</p></li>
<li><p>Check out all of the proposals being considered by TC39.</p></li>
<li><p>There are many newsletters, including Pony Foo Weekly and JavaScript Weekly.</p></li>
<li><p>Many of the articles on Pony Foo and by Axel Rauschmayer focus on ECMAScript development.</p></li>
</ol>
<hr>
<p>有任何想法（建议，对ES6的看法等等），欢迎在Github 上提出，本翻译Github地址：<a href="https://github.com/zhangwang1990/PracticeModernJavaScript" rel="nofollow noreferrer" target="_blank">PracticeModernJavaScript</a></p>
<h2 id="articleHeader8">有用的链接</h2>
<ul>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/ECMAScript%20%E5%92%8C%20JavaScript%E7%9A%84%E6%9C%AA%E6%9D%A5.md" rel="nofollow noreferrer" target="_blank">第一章 ECMAScript简史 和 JavaScript的未来</a></p></li>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC2%E7%AB%A0.%20ES6%20%E6%A6%82%E8%A6%81.md" rel="nofollow noreferrer" target="_blank">第二章 ES6 概要</a></p></li>
<li><p><a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC3%E7%AB%A0.%20Classes%2CSymbols%2CObjects%20%E5%92%8C%20Decorators.md" rel="nofollow noreferrer" target="_blank">第三章 Classs,Symbols,Objects拓展 和 Decorators</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ECMAScript简史 和 JavaScript的未来（译）

## 原文链接
[https://segmentfault.com/a/1190000010074709](https://segmentfault.com/a/1190000010074709)

