---
title: 'WebAssembly起步' 
date: 2018-12-18 2:30:11
hidden: true
slug: wfv8aj590gn
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">了解WebAssembly原理</h1>
<p>WebAssembly是一种可以在浏览器上运行的二进制可执行格式文件。它将成为浏览器进化史上又一次革命。</p>
<p>自从浏览器问世以来，javascript就成为浏览器上执行程序的唯一标准，越来越多的应用程序通过javascript开发，并运行于浏览器上；而随着浏览器上h5程序功能的丰富，也对浏览器提出了更多的挑战。其中一条最为重要的就是性能问题。javascript是一种弱类型，解释性的脚本语言。它天生运行速度慢，成为了很多h5应用的软肋。虽然2008年google V8引入了即时编译等技术使js的运行速度提升了一大截，但是一些大型应用程序，比如游戏，视频编辑，压缩，算法等依然不适合运行在浏览器上。</p>
<p>WebAssembly的到来解决了这个问题，并给开发基于浏览器的应用程序提供了另外的编程语言选择。2017年三大浏览器同时增加了WebAssembly支持，标志着WebAssembly已经达到生产实用标准。</p>
<h2 id="articleHeader1">为什么WebAssembly比javascript快</h2>
<p>回答这个问题需要洞悉浏览器执行javascript代码的各个环节。<br>浏览器加载并执行javascript大概可分为如下几个环节： 下载，解析，执行和优化，垃圾回收。</p>
<h3 id="articleHeader2">下载</h3>
<p>javascript是以纯文本格式下载的。相比，webassembly使用二进制格式存储，结构更精简，更小。</p>
<h3 id="articleHeader3">解析</h3>
<p>javascript下载后，需要js引擎经过tokenize, parse两个阶段转换成AST(abstract syntax tree)，然后再转换为浏览器需要的中间字节码。由于js是比较高级的语言，解析js也相对要做更多的事情。webassembly的格式类似于汇编语言，本来就是中间字节码，和需要运行的机器码更相近，需要简单的转换工作即可转化为CPU可以直接执行的机器码。</p>
<p>下图是一个真实运行的webassembly（它是文本的，只是为了方便调试），可以看出它和汇编是很相似的，更易转化为机器码。</p>
<p><span class="img-wrap"><img data-src="/img/bV1REn?w=177&amp;h=393" src="https://static.alili.tech/img/bV1REn?w=177&amp;h=393" alt="WebAssembly源码" title="WebAssembly源码" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">执行和优化</h3>
<p>在执行阶段，js普遍采用解释执行策略，相当于每一次执行javascript指令都要通过js引擎中转给cpu。现代的js引擎同时采用了即时编译的策略。这需要同时运行一个profiler，关注每个函数的调用情况。当profiler发现一个函数调用的比较多的时候，会把这个函数抛给编译器，为它生成一个更快的编译版本。某些情况下，参数类型会发生变化。这时，需要删除之前的编译版本，对新参数类型编译新的版本。而webassembly由于类汇编的结构，只需简单的编译即可转换为可直接运行在cpu上的机器码，执行更快。</p>
<h3 id="articleHeader5">垃圾回收</h3>
<p>javascript运行期间需要同时间歇的运行一个垃圾回收器，扫描堆上的垃圾、释放内存。垃圾回收器的运行又和js引擎的执行是互斥的，导致js执行间歇性的被垃圾回收器打断。webassembly不负责垃圾回收，只能编程语言自行解决。于是不同的编程语言又有所不同。C/C++是手动管理内存(<code>malloc</code>/<code>free</code>, <code>new</code>/<code>delete</code>)，rust则是基于生命周期的自动内存管理。所有这些内存管理方法都不需要间歇的全局暂停。因此性能更好。</p>
<p>从以上各个角度看WebAssembly确实比javascript性能高。事实上，目前阶段WebAssembly执行时间大概等于原生程序执行时间X1.2。</p>
<h2 id="articleHeader6">WebAssembly的加载与执行</h2>
<p>wasm是WebAssembly格式的浏览器可执行文件。它是二进制的，但是它并不像桌面win32程序一样，可以随便使用系统资源，调用操作系统api。事实上，所有与外界相关的操作都必须由javascript传入。比如：要申请一段内存，必须由javascript申请了并传给他。 <strong>浏览器上，javascript做不到的，它也做不到；javascript能做到的，它能做的更快。</strong> 这个就是它的价值。</p>
<p>目前必须要js启动WebAssembly的加载和实例化（后面可能会有单独的加载机制）。</p>
<p>如下函数，使用<code>fetch</code>API加载wasm文件，并实例化wasm模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchAndInstantiate(url, importObject) {
  return fetch(url).then(response =>
    response.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes, importObject)
  ).then(results =>
    results.instance
  );
}

fetchAndInstantiate('module.wasm', importObject).then(function(instance) {
  ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchAndInstantiate</span>(<span class="hljs-params">url, importObject</span>) </span>{
  <span class="hljs-keyword">return</span> fetch(url).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span>
    response.arrayBuffer()
  ).then(<span class="hljs-function"><span class="hljs-params">bytes</span> =&gt;</span>
    WebAssembly.instantiate(bytes, importObject)
  ).then(<span class="hljs-function"><span class="hljs-params">results</span> =&gt;</span>
    results.instance
  );
}

fetchAndInstantiate(<span class="hljs-string">'module.wasm'</span>, importObject).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">instance</span>) </span>{
  ...
})</code></pre>
<p>importObject即浏览器需要向webassembly注入的交互api。</p>
<p>如下，是一个真实运行的importObject包括很多js函数。</p>
<p><span class="img-wrap"><img data-src="/img/bV1REm?w=989&amp;h=378" src="https://static.alili.tech/img/bV1REm?w=989&amp;h=378" alt="importObject示例" title="importObject示例" style="cursor: pointer;"></span></p>
<p>注意<code>global.memory</code>就是webassembly程序执行用到的内存，是js申请的一个大的ArrayBuffer。</p>
<h1 id="articleHeader7">学会WebAssembly开发</h1>
<p>讲了这么多WebAssembly的优点，接下就讲下WebAssembly的开发。</p>
<p>开发WebAssembly并不意味着需要手写WebAssembly汇编程序。一个开源项目<a href="http://kripken.github.io/emscripten-site/index.html" rel="nofollow noreferrer" target="_blank">emscripten</a>已经提供了sdk可以编译C/C++，并输出WebAssembly的wasm文件。目前，rust也已经支持编译到wasm。未来所有支持编译到LLVM字节码的编程语言，理论上都可以输出wasm。</p>
<h2 id="articleHeader8">安装emscripten</h2>
<p>下载emscripten sdk后，是个压缩文件，其实是sdk包管理器。<br>需要执行如下命令，完成sdk的安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./emsdk update
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>./emsdk <span class="hljs-keyword">update</span>
./emsdk <span class="hljs-keyword">install</span> latest
./emsdk <span class="hljs-keyword">activate</span> latest
<span class="hljs-keyword">source</span> ./emsdk_env.sh
</code></pre>
<p>现在已经有个可用的emcc编译器了，输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="emcc --version
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>emcc <span class="hljs-comment">--version</span>
</code></pre>
<p>查看编译器版本。</p>
<p>emsdk安装后， emscripten文件内是按版本号安装的sdk内容,里面有很多C/C++用例，可以自行研究下。</p>
<h2 id="articleHeader9">简单demo</h2>
<p>这个简单的C程序可以直接编译为wasm。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#include <stdio.h>

int main() {
  printf(&quot;hello, world!\n&quot;);
  return 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code class="C"><span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;stdio.h&gt;</span></span>

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-built_in">printf</span>(<span class="hljs-string">"hello, world!\n"</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./emcc hello_world.c
node a.out.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>./emcc hello_world<span class="hljs-selector-class">.c</span>
node <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.out</span><span class="hljs-selector-class">.js</span>
</code></pre>
<p>默认情况下，emcc只输出了一个js（asmjs）。asmjs是webassembly的一个早期原型，可提供webassembly在旧版本浏览器上的兼容。按如下命令输出webassembly二进制wasm。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./emcc hello_world.c -s WASM=1 -o index.html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>./emcc hello_world<span class="hljs-selector-class">.c</span> -s WASM=<span class="hljs-number">1</span> -o index<span class="hljs-selector-class">.html</span>
</code></pre>
<p>这次编译输出了<em>index.html</em>, <em>index.js</em>, <em>index.wasm</em>三个文件。通过一个静态服务器打开index.html，可以看到console里的输出。</p>
<p><span class="img-wrap"><img data-src="/img/bV1REk?w=674&amp;h=717" src="https://static.alili.tech/img/bV1REk?w=674&amp;h=717" alt="hello world示例" title="hello world示例" style="cursor: pointer;"></span></p>
<p>这个index.html是一个调试页面。生产上加载webassembly一般都需要自己写index.html，只保留js和wasm文件就够了。</p>
<p>以上的例子中，<code>printf</code>的标准输出被定向到了浏览器的console里面。 <strong>系统API调用被换成了js实现。</strong> 事实上很多libc里面的函数被emscripten实现成了浏览器上的兼容方案，从而更好的和浏览器结合。</p>
<h2 id="articleHeader10">环境</h2>
<p>所有编程语言都要和它的运行环境打交道，否则除了把cpu跑满，没什么实用价值。跑在浏览器上的webassembly则是通过和js相互调用发挥它的作用。</p>
<p>Emscripten sdk提供了很多API与js运行环境／浏览器交互。定义在其中两个头文件中：</p>
<ul>
<li>
<code>emscripten.h</code>： 中定义了一些基础功能相关API，包括调用js，文件读写，网络请求等，这些API在node中也可以用。</li>
<li>
<code>html5.h</code>中定义了浏览器中与DOM相关的各种操作，包括DOM，事件，设备相关等。</li>
</ul>
<p>下面，抽出一些关键的API讲下webassembly是如何与浏览器协同工作的。</p>
<h3 id="articleHeader11">调用js</h3>
<p><code>EM_ASM</code>宏，让webassembly可以直接调用js。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EM_ASM(alert('hai'); alert('bai'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code class="C" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">EM_ASM</span>(alert(<span class="hljs-string">'hai'</span>); alert(<span class="hljs-string">'bai'</span>));</code></pre>
<p>如果需要从js获取执行结果，可以用<code>EM_ASM_INT</code>， <code>EM_ASM_DOUBLE</code>两个版本分别获取<code>int</code>和<code>double</code>类型的数值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int x = EM_ASM_INT({
  return $0 + 42;
}, 100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code class="C"><span class="hljs-built_in">int</span> x = EM_ASM_INT({
  <span class="hljs-keyword">return</span> $0 + <span class="hljs-number">42</span><span class="hljs-comment">;</span>
}, <span class="hljs-number">100</span>)<span class="hljs-comment">;</span></code></pre>
<p>如果需要传递字符串给js，可以传递一个字符串起始的指针给js。由于js可以访问整个wasm程序的内存区域,js用这个指针就可以从内存读出字符串。Module对象上的<code>UTF8ToString(ptr)</code>, <code>UTF16ToString(ptr)</code>, <code>UTF32ToString(ptr)</code>, <code>Pointer_stringify(ptr, length)</code>这几个函数可获得指针处的字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="char* sample = &quot;This is a string&quot;;
  EM_ASM_({
      console.log(&quot;js got string:&quot;, Module.UTF8ToString($0));
  }, sample);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code class="C"><span class="hljs-keyword">char</span>* <span class="hljs-keyword">sample</span> = <span class="hljs-string">"This is a string"</span>;
  EM_ASM_({
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"js got string:"</span>, Module.UTF8ToString(<span class="hljs-variable">$0</span>));
  }, <span class="hljs-keyword">sample</span>);</code></pre>
<h3 id="articleHeader12">标准输入输出</h3>
<p>标准输出我们之前看过，printf最终被转到<code>Module.print</code>，默认是<code>console.log</code>实现。<br>标准错误输出最终会被转到<code>Module.printErr</code>，默认是<code>console.error</code>实现。<br>对标准输入的读取在浏览器上变成了一个prompt框。体验不好，尽量不要读。</p>
<h3 id="articleHeader13">显示</h3>
<p>Emscripten支持两种GUI展示方法。</p>
<ul>
<li>DOM： wasm是可以调用js的，而js又可以操作DOM。因此，wasm可以通过js操作DOM，创建程序的GUI。</li>
<li>Webgl Canvas: 除了DOM，emscripten还可以提供了opengl es的浏览器实现。通过操作一个Webgl Canvas，把显示内容画在Canvas上。</li>
</ul>
<h3 id="articleHeader14">事件循环</h3>
<p>C++ GUI程序一般都有个事件循环，其实就是个死循环，反复获取并处理GUI层面上的各种事件。这样程序不会跑完main函数直接退出。webassembly程序跑在浏览器上，而浏览器本来就是事件驱动，已经有了一个事件循环。假如不改动直接上浏览器，就会卡死浏览器的GUI进程。因此webassembly程序需要由浏览器控制事件循环。</p>
<p><code>emscripten_set_main_loop(em_callback_func func, int fps, int simulate_infinite_loop)</code>函数接受一个函数的指针后，浏览器会根据fps按时调用传入的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#include <stdio.h>
#include <emscripten.h>

int frame = 0;
void main_loop(void) {
  printf(&quot;frame: %d\n&quot;, frame);
  frame++;
}

int main(void) {
  emscripten_set_main_loop(main_loop, 0, 1);
  return 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code class="C"><span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;emscripten.h&gt;</span></span>

<span class="hljs-keyword">int</span> frame = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">main_loop</span><span class="hljs-params">(<span class="hljs-keyword">void</span>)</span> </span>{
  <span class="hljs-built_in">printf</span>(<span class="hljs-string">"frame: %d\n"</span>, frame);
  frame++;
}

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">(<span class="hljs-keyword">void</span>)</span> </span>{
  emscripten_set_main_loop(main_loop, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}</code></pre>
<h3 id="articleHeader15">存储</h3>
<p>浏览器隔离了程序直接操作存储的权限，因而webapp是安全的，但很多C代码都有同步操作文件的API，如<code>open</code>, <code>write</code>, <code>close</code>。为了兼容，emscripten实现了一个内存文件系统，可以通过全局对象<code>FS</code>访问。</p>
<p>下图，是FS对象下的函数。<br><span class="img-wrap"><img data-src="/img/bV1REj?w=592&amp;h=828" src="https://static.alili.tech/img/bV1REj?w=592&amp;h=828" alt="FS的函数" title="FS的函数" style="cursor: pointer;"></span></p>
<p>另外，emcc还提供了<code>--preload-file</code>参数，在webassembly程序加载的过程中，预加载文件放到虚拟文件系统中。</p>
<p>wasm中的文件虽然是内存的，但是支持通过indexDB持久化。<br>如下js，<code>mount</code>一个indexdb的文件夹到/data目录，然后<code>FS.syncfs</code>把indexdb中的文件同步到内存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FS.mkdir('/data');
FS.mount(IDBFS, {}, '/data');
FS.syncfs(true, function (err) {
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">FS.mkdir(<span class="hljs-string">'/data'</span>);
FS.mount(IDBFS, {}, <span class="hljs-string">'/data'</span>);
FS.syncfs(<span class="hljs-literal">true</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
});</code></pre>
<p>接下来，所有，/data目录下的读写，都在内存中的同步读写。当程序关闭的时候，需要调用<code>FS.syncfs（false, function(err){}）</code>把内存中的文件反方向同步回indexdb。</p>
<h3 id="articleHeader16">库</h3>
<p>emsdk提供了一些常用的C++库的webassembly兼容版本。用<code>emcc --show-ports</code>命令显示。如果要用SDL2，需要给emcc加入选项<code>-s USE_SDL=2</code>，链接SDL2库。</p>
<p>目前，emcc内置支持这些库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ emcc --show-ports
Available ports:
    zlib (USE_ZLIB=1; zlib license)
    libpng (USE_LIBPNG=1; zlib license)
    SDL2 (USE_SDL=2; zlib license)
    SDL2_image (USE_SDL_IMAGE=2; zlib license)
    ogg (USE_OGG=1; zlib license)
    vorbis (USE_VORBIS=1; zlib license)
    bullet (USE_BULLET=1; zlib license)
    freetype (USE_FREETYPE=1; freetype license)
    SDL2_ttf (USE_SDL_TTF=2; zlib license)
    SDL2_net (zlib license)
    Binaryen (Apache 2.0 license)
    cocos2d
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>$ emcc <span class="hljs-comment">--show-ports</span>
<span class="hljs-type">Available</span> ports:
    zlib (<span class="hljs-type">USE_ZLIB</span>=1; zlib license)
    libpng (<span class="hljs-type">USE_LIBPNG</span>=1; zlib license)
    SDL2 (<span class="hljs-type">USE_SDL</span>=2; zlib license)
    SDL2_image (<span class="hljs-type">USE_SDL_IMAGE</span>=2; zlib license)
    ogg (<span class="hljs-type">USE_OGG</span>=1; zlib license)
    vorbis (<span class="hljs-type">USE_VORBIS</span>=1; zlib license)
    bullet (<span class="hljs-type">USE_BULLET</span>=1; zlib license)
    freetype (<span class="hljs-type">USE_FREETYPE</span>=1; freetype license)
    SDL2_ttf (<span class="hljs-type">USE_SDL_TTF</span>=2; zlib license)
    SDL2_net (zlib license)
    Binaryen (<span class="hljs-type">Apache</span> 2.0 license)
    cocos2d
</code></pre>
<p>如果所需要的库没在列表里，需要先用emsdk编译所需要的库（可能涉及到库的改动）。再编译并链接，输出最终目标。emcc不支持动态链接。</p>
<h1 id="articleHeader17">展望</h1>
<p>目前,webassembly已经完成MVP最小功能版本开发，有非常注目的性能。可以遇见，未来将有更多h5 app/游戏通过webassembly获得更好的体验。使用C/C++/rust进行webapp开发,混合编程，也会有很多不错的探索。</p>
<p>未来h5能否通过webassembly撼动原生的大门，让我们拭目以待。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebAssembly起步

## 原文链接
[https://segmentfault.com/a/1190000012798495](https://segmentfault.com/a/1190000012798495)

