---
title: '【译】WebAssembly 初尝' 
date: 2019-02-05 2:30:09
hidden: true
slug: r4i0ifpfql8
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@wemlin" rel="nofollow noreferrer" target="_blank">文蔺</a><br>链接：<a href="http://www.zcfy.cc/article/1031" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/1031</a><br>原文：<a href="http://cultureofdevelopment.com/blog/build-your-first-thing-with-web-assembly" rel="nofollow noreferrer" target="_blank">http://cultureofdevelopment.com/blog/build-your-first-thing-with-web-assembly</a></p></blockquote>
<p><strong>拖拖拉拉好久，终于把个人博客整出来了。鸣谢 <a href="http://pinggod.com" rel="nofollow noreferrer" target="_blank">@pinggod</a>。厚着脸安利一下，地址是 <a href="http://www.wemlion.com/" rel="nofollow noreferrer" target="_blank">http://www.wemlion.com/</a>。欢迎访问，欢迎收藏。</strong></p>
<p>头一次听说 <a href="https://webassembly.github.io/" rel="nofollow noreferrer" target="_blank">WebAssembly</a> 的时候就觉得很酷，然后就超兴奋地开始尝试。但从一开始尝试的过程就不顺利，越来越让人灰心。本文的目的就是解决问题，让你免受困扰。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760513" src="https://static.alili.tech/img/remote/1460000006760513" alt="beware of cliff" title="beware of cliff" style="cursor: pointer;"></span></p>
<h3 id="articleHeader0">读者须知</h3>
<p>本文写作于 2016 年 6 月 24 日。WebAssembly 是一项很新的、不稳定的技术；随着其标准化过程发展，本文中的任何内容都可能是错误的。</p>
<p>不过先不管了....</p>
<h3 id="articleHeader1">WebAssembly 是什么</h3>
<p>好吧，官网是这么描述的：</p>
<blockquote><p>WebAssembly，或者称作 wasm，是一项适用于 Web 编译的可移植的、体积与加载高效的格式。（WebAssembly or wasm is a new portable, size- and load-time-efficient format suitable for compilation to the web.）</p></blockquote>
<p>嗯...什么鬼？什么格式？文本（Text）？二进制（Binary）？老实说，这个描述真糟糕。所以不管它，收起那些 binggo 游戏卡（buzzword bingo cards，一种填词游戏，这些词通常都是流行语，阅读<a href="https://en.wikipedia.org/wiki/Buzzword_bingo" rel="nofollow noreferrer" target="_blank">https://en.wikipedia.org/wiki/Buzzword_bingo</a>了解更多 —— 译者注），根据我所有的经验来描述吧：</p>
<blockquote><p>WebAssembly/wasm 是用来编写高性能的、浏览器无关的 Web 组件的一种字节码规范。（WebAssembly or wasm is a bytecode specification for writing performant, browser agnostic web components.）</p></blockquote>
<p>有此妙语，听起来超棒，但仍然没 get 到点，接下来重点来了。WebAssembly 通过静态类型变量实现性能提升，运行时静态类型变量引用比动态类型变量更有效率。WebAssembly 由 <a href="https://www.w3.org/community/webassembly/" rel="nofollow noreferrer" target="_blank">W3C Community Group</a> 制定，最终将被所有规范兼容的浏览器支持。还有杀手锏，<em>最终</em>我们可以使用<em>任何</em>语言编写这些 Web 组件（web components）。</p>
<p>听起来酷了很多，不是么？</p>
<h3 id="articleHeader2">一起开始吧</h3>
<p>学习新东西的时候，我通常会找尽可能最简单的例子来看它是如何工作的。不幸的是，对 WebAssembly 来说，这不太现实。在当前阶段，wasm 仅仅只是字节码规范。想象回到 1996 年，假如太阳公司（Sun Microsystems）的一些工程师们带来了 JVM，但却...没有 Java....若果真如此，我想当时的对话可能是这样的：</p>
<p>—— “伙计们，快来看看我们做的这个执行字节码的虚拟机！”<br>—— “真棒！但我们给它怎么写代码？”</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760514" src="https://static.alili.tech/img/remote/1460000006760514" alt="HelloWorld.class" title="HelloWorld.class" style="cursor: pointer;"></span></p>
<p><em>图：字节码形式的 HelloWorld</em></p>
<p>—— “嗯..这问题提得好。等会儿我查查看。”<br>—— “真棒，如果遇到了任何问题，告诉我们你的想法，在我们的 github page 上贴出来。”<br>—— “你说对啦。我们现在先去看看其他项目。”</p>
<p>这个例子有些糟糕，因为 JVM 是基于 Java 语言的；尽管如此，希望你还是 get 到点了。如果都没有将代码编译为字节码的工具，要起步就很困难了。那我们要怎么开始？</p>
<h3 id="articleHeader3">WebAssembly 之前有什么</h3>
<p>多数技术都是创新的结果，特别是当合理的尝试成为正式规范时。wasm 也不例外，它实际上是 <a href="http://asmjs.org/" rel="nofollow noreferrer" target="_blank">asm.js</a> 的工作的延续， asm.js 是一个编写 javascript 组件的的规范，可编译为静态类型。wasm 的规范拓展了这些创意，它接受任何语言编译而成的字节码，这些字节码作为二进制文件而非文本文件通过网络传输；规范由很多来自主流浏览器厂商的代表们一起制定，而非仅仅是 Mozilla。</p>
<p>asm.js 仅仅是一个使用 javascript 语言特征的最小子集编写 javascript 的规范。你可以手写一些简单的 asm.js 代码，如果你想弄脏你的手，这正是极好的方式。（等会儿最好将这放在单独的文件中，通常约定文件名格式为 <code>your-module-name.asm.js</code>。）)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyMathModule(global) {
    &quot;use asm&quot;;
    var exp = global.Math.exp;
    function doubleExp(value) {
        value = +value;
        return +(+exp(+value) * 2.0);
    }
    return { doubleExp: doubleExp };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyMathModule</span>(<span class="hljs-params">global</span>) </span>{
<span class="hljs-meta">    "use asm"</span>;
    <span class="hljs-keyword">var</span> exp = global.Math.exp;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doubleExp</span>(<span class="hljs-params">value</span>) </span>{
        value = +value;
        <span class="hljs-keyword">return</span> +(+exp(+value) * <span class="hljs-number">2.0</span>);
    }
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">doubleExp</span>: doubleExp };
}</code></pre>
<p>这还不是一个特别有用的函数，但符合规范。如果你觉得这很二，别人也是这么觉得的，不过基本上每一个字符都是必须的。在这当中，一元运算符 <code>+</code> 的作用是类型注解，这样编译器会知道那些变量是 double 类型的，运行时就不必再次分辨它们是什么。它相当挑剔，如果你把什么地方弄得一团糟，火狐控制台会给你一些合理的错误信息。</p>
<p>如果你想在浏览器中使用，像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myMath = new MyMathModule(window);
for(var i = 0; i < 5; i++) {
    console.log(myMath.doubleExp(i));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var myMath = new MyMathModule(<span class="hljs-name">window</span>)<span class="hljs-comment">;</span>
for(<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 5; i++) {</span>
    console.log(<span class="hljs-name">myMath</span>.doubleExp(<span class="hljs-name">i</span>))<span class="hljs-comment">;</span>
}</code></pre>
<p>一切正常的话，结果大概像下图这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760515" src="https://static.alili.tech/img/remote/1460000006760515" alt="asm.js success" title="asm.js success" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">开始尝试 WebAssembly</h3>
<p>现在我们已经有了一个可以工作的 asm.js 代码片段，可以使用 <a href="https://github.com/WebAssembly/binaryen" rel="nofollow noreferrer" target="_blank">WebAssembly github page</a> 提供的工具将其编译为 wasm。自己克隆代码仓库构建工具吧。这最麻烦了。这些工具一直在不断发展，代码会时不时挂掉，特别是在 Windows 环境下。</p>
<p>不管你是用 Windows 还是 Mac，电脑上必须要安装 make 和 cmake 命令行工具。如果你在使用 Windows，你还需要安装 Visual Studio 2015。Mac 用户按照<a href="https://github.com/WebAssembly/binaryen#building" rel="nofollow noreferrer" target="_blank">这里的说明</a> 操作；Windows 用户按照<a href="https://github.com/brakmic/brakmic/blob/master/webassembly/COMPILING_WIN32.md" rel="nofollow noreferrer" target="_blank">这个说明</a>操作。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006579439" src="https://static.alili.tech/img/remote/1460000006579439" alt="building binaryen" title="building binaryen" style="cursor: pointer;"></span></p>
<p><em>图： Windows 下的工具构建</em></p>
<p>对 WebAssembly 团队来说，发布可以工作的二进制文件意味着朝着正确的方向前进了一大步。</p>
<p>构建成功之后，binaryen 目录下会有一个 bin 文件夹，其中有一些用来将 asm.js 转换为 wasm 的工具。第一个工具是 <code>asm2wasm.exe</code>。它将 asm.js 代码转换为 <code>.s</code> 格式的代码，这些代码是生成 wasm 所需的抽象语法树（AST）的文本表现形式。运行工具，最终会得到类似下面的东西：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(module
  (memory 256 256)
  (export &quot;memory&quot; memory)
  (type $FUNCSIG$dd (func (param f64) (result f64)))
  (import $exp &quot;global.Math&quot; &quot;exp&quot; (param f64) (result f64))
  (export &quot;doubleExp&quot; $doubleExp)
  (func $doubleExp (param $0 f64) (result f64)
    (f64.mul
      (call_import $exp
        (get_local $0)
      )
      (f64.const 2)
    )
  )
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">module</span>
  (<span class="hljs-name">memory</span> <span class="hljs-number">256</span> <span class="hljs-number">256</span>)
  (<span class="hljs-name">export</span> <span class="hljs-string">"memory"</span> memory)
  (<span class="hljs-name"><span class="hljs-builtin-name">type</span></span> $FUNCSIG$dd (<span class="hljs-name">func</span> (<span class="hljs-name">param</span> f64) (<span class="hljs-name">result</span> f64)))
  (<span class="hljs-name"><span class="hljs-builtin-name">import</span></span> $exp <span class="hljs-string">"global.Math"</span> <span class="hljs-string">"exp"</span> (<span class="hljs-name">param</span> f64) (<span class="hljs-name">result</span> f64))
  (<span class="hljs-name">export</span> <span class="hljs-string">"doubleExp"</span> $doubleExp)
  (<span class="hljs-name">func</span> $doubleExp (<span class="hljs-name">param</span> $<span class="hljs-number">0</span> f64) (<span class="hljs-name">result</span> f64)
    (<span class="hljs-name">f64.mul</span>
      (<span class="hljs-name">call_import</span> $exp
        (<span class="hljs-name">get_local</span> $<span class="hljs-number">0</span>)
      )
      (<span class="hljs-name">f64.const</span> <span class="hljs-number">2</span>)
    )
  )
)</code></pre>
<p>以后我们可以逐行分析上面的代码，但现在我只想让你看下它的样子。我还得提醒你一点，因为 wasm 是二进制格式的，所以像你今天对 javascript 所做的那样右击、查看源码是行不通的。从头到尾都是二进制码。目前的计划是查看 wasm 模块源码时对二进制格式进行反汇编，让人能读懂。</p>
<p>接下来要做的是使用 <code>wasm-as.exe</code> 将 <code>.s</code> 格式的代码转换为 wasm 二进制码。运行文件，最后就能得到浏览器需要的真正的 wasm 二进制码。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760516" src="https://static.alili.tech/img/remote/1460000006760516" alt="building wasm from asm.js" title="building wasm from asm.js" style="cursor: pointer;"></span></p>
<p><em>图：将 asm.js 转换为 wasm 二进制码</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006579467" src="https://static.alili.tech/img/remote/1460000006579467" alt="wasm bytecode" title="wasm bytecode" style="cursor: pointer;"></span></p>
<p><em>图：wasm 二进制码</em></p>
<p>紧接着，安装最新版的 <a href="https://www.mozilla.org/en-US/firefox/new/" rel="nofollow noreferrer" target="_blank">Firefox</a> 或 <a href="https://www.google.com/chrome/browser/canary.html" rel="nofollow noreferrer" target="_blank">Chrome Canary</a>，并启用 WebAssembly。</p>
<p>如果你使用的是 Firefox，在地址栏中输入 <code>about:config</code>，点击“确认我会保证小心”。然后在搜索框中输入 <code>wasm</code>，双击 <code>javascript.options.wasm</code> 将值设置为 true，然后重启浏览器。</p>
<p>如果你使用的是 Chrome Canary，打开 <code>chrome://flags</code>，往下翻，找到 <code>Experimental WebAssembly</code>，点击“启用”链接，再重启浏览器。</p>
<p>最后一步就是让模块在浏览器中跑起来。初次尝试时，这又是一大痛点，完全不知道怎么做。在规范中使用 wasm 模块的 API 一点都没找到。最后我在 Canary 的控制台上输入 <code>WebAsse</code>，并没有任何提示。接着输入 <code>Was</code> 的时候，提示出来了！控制台上打印出的对象大概最简陋的文档了，不过这时候我突然想到，可以用一些其他工具 (emscripten) 将代码编译为 wasm。不过这是另外一篇博客的话题了。</p>
<p>一段时间之后，鼠标落在了 WebAssembly 的设计文档仓库上。我看到了一个名为 <a href="https://github.com/WebAssembly/design/blob/master/JS.md" rel="nofollow noreferrer" target="_blank">JS.md</a> 的文件，点击之后，有一个 API 的说明。仔细看顶部斜体的文字。但最精彩的部分还是最底部的代码片段，演示了如何最低限度地加载模块。我所需要做的就是拆出相关部分进行尝试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(&quot;my-math-module.wasm&quot;)
    .then(function(response) {
        return response.arrayBuffer();
    })
    .then(function(buffer) {
        var dependencies = {
            &quot;global&quot;: {},
            &quot;env&quot;: {}
        };
        dependencies[&quot;global.Math&quot;] = window.Math;
        var moduleBufferView = new Uint8Array(buffer);
        var myMathModule = Wasm.instantiateModule(moduleBufferView, dependencies);
        console.log(myMathModule.exports.doubleExp);
        for(var i = 0; i < 5; i++) {
            console.log(myMathModule.exports.doubleExp(i));
        }
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>fetch(<span class="hljs-string">"my-math-module.wasm"</span>)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
        <span class="hljs-keyword">return</span> response.arrayBuffer();
    })
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">buffer</span>) </span>{
        <span class="hljs-keyword">var</span> dependencies = {
            <span class="hljs-string">"global"</span>: {},
            <span class="hljs-string">"env"</span>: {}
        };
        dependencies[<span class="hljs-string">"global.Math"</span>] = <span class="hljs-built_in">window</span>.Math;
        <span class="hljs-keyword">var</span> moduleBufferView = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(buffer);
        <span class="hljs-keyword">var</span> myMathModule = Wasm.instantiateModule(moduleBufferView, dependencies);
        <span class="hljs-built_in">console</span>.log(myMathModule.exports.doubleExp);
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
            <span class="hljs-built_in">console</span>.log(myMathModule.exports.doubleExp(i));
        }
    });</code></pre>
<p>把代码放到 html 文件中，<a href="https://www.npmjs.com/package/local-web-server" rel="nofollow noreferrer" target="_blank">启动本地文件服务器</a>，在浏览器中加载页面。下面是在浏览器中的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006579497" src="https://static.alili.tech/img/remote/1460000006579497" alt="wasm in a browser" title="wasm in a browser" style="cursor: pointer;"></span></p>
<p><em>浏览器中运行的 wasm （至少尝试运行了） </em></p>
<p>我估计需要去提交一个 bug 报告了。记着，一切都是实验性的、不稳定的，所以当此类事情发生的时候，别灰心丧气。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006579513" src="https://static.alili.tech/img/remote/1460000006579513" alt="keep calm and file bug reports" title="keep calm and file bug reports" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">恭喜你</h3>
<p>你已经完成了第一个 WebAssembly 组件。接下来做些什么？目前我们碰到的还只是皮毛而已。在本例中手写 asm.js 很重要，但需要时间和耐心。使用 emscripten 将应用转换为 asm.js 要简单多了。关于这一点，我强烈建议你阅读 asm.js 规范，特别是内存模型的部分，因为其中的许多概念都被迁移到 WebAssembly 上了。另外一个怪异的事情是，目前还不能直接将数组作为函数参数。人们已经达成共识，这需要改变，但规范中尚未有关于这一点的。去看看指针逻辑吧。</p>
<p>还有一点，在 wasm 中做一些工作的时候，你可能发展实际上 WebAssembly 还没普通的 javascript 运行得快。记住，现代的 javascript 引擎已经是高度优化的，wasm 要赶上这速度还需要时间。WebAssembly 还尚未进入准备生产的阶段。</p>
<p>如果你有任何关于 wasm 或者本文中提到的工具的问题，在 <a href="http://stackoverflow.com" rel="nofollow noreferrer" target="_blank">Stack Overflow</a> 中提出来，记得标上恰当的 tag。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】WebAssembly 初尝

## 原文链接
[https://segmentfault.com/a/1190000006575460](https://segmentfault.com/a/1190000006575460)

