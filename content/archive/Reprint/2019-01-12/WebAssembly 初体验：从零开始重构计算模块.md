---
title: 'WebAssembly 初体验：从零开始重构计算模块' 
date: 2019-01-12 2:30:24
hidden: true
slug: o8xqfd9kkt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/27410280" rel="nofollow noreferrer" target="_blank">WebAssembly 初体验：从零开始重构计算模块</a>从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">  Web 前端入门与工程实践</a>，更多相关资料文章参考<a href="https://github.com/wxyyxc1992/Coder-Knowledge-Management/tree/master/Awesome-Reference/Web/Syntax/WebAssembly" rel="nofollow noreferrer" target="_blank">WebAssembly 学习与实践资料索引</a>和<a href="https://parg.co/bM1" rel="nofollow noreferrer" target="_blank"> React 学习与实践资料索引</a>。本文中使用的游戏代码修改自  <a href="http://blog.openbloc.fr/webassembly-first-steps/" rel="nofollow noreferrer" target="_blank">WebAssembly 101: a developer's first steps</a>。</p></blockquote>
<p>WebAssembly 的概念、意义以及未来带来的性能提升相信已是耳熟能详，笔者在<a href="https://parg.co/bh1" rel="nofollow noreferrer" target="_blank">前端每周清单系列</a>中也是经常会推荐 WebAssembly 相关文章。不过笔者也只是了解其概念而未真正付诸实践，本文即是笔者在将我司某个简单项目中的计算模块重构为 WebAssembly 过程中的总结。在简单的实践中笔者个人感觉，WebAssembly 的抽象程度会比 JavaScript 高不少，未来对于大型项目的迁移，对于纯前端工程师而言可能存在的坑也是不少，仿佛又回到了被指针统治的年代。本文笔者使用的案例已经集成到了 React 脚手架 <a href="https://github.com/wxyyxc1992/create-react-boilerplate" rel="nofollow noreferrer" target="_blank">create-react-boilerplate</a> 中 ，可以方便大家快速本地实践。</p>
<h1 id="articleHeader0">编译环境搭建</h1>
<p>我们使用 Emscripten 将 C 代码编译为 wasm 格式，官方推荐的方式是首先下载 <a href="https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz" rel="nofollow noreferrer" target="_blank">Portable Emscripten SDK for Linux and OS X (emsdk-portable.tar.gz)</a> 然后利用 emsdk 进行安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./emsdk update
$ ./emsdk install latest
# 如果出现异常使用 ./emsdk install sdk-1.37.12-64bit
# https://github.com/kripken/emscripten/issues/5272" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>./emsdk update
<span class="hljs-variable">$ </span>./emsdk install latest
<span class="hljs-comment"># 如果出现异常使用 ./emsdk install sdk-1.37.12-64bit</span>
<span class="hljs-comment"># https://github.com/kripken/emscripten/issues/5272</span></code></pre>
<p>安装完毕后激活响应环境即可以进行编译：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ./emsdk activate latest
$ source ./emsdk_env.sh  # you can add this line to your .bashrc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>./emsdk activate latest
<span class="hljs-variable">$ </span>source ./emsdk_env.sh  <span class="hljs-comment"># you can add this line to your .bashrc</span></code></pre>
<p>笔者在本地执行上述搭建步骤时一直失败，因此改用了 Docker 预先配置好的镜像进行处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 拉取 Docker 镜像
docker pull 42ua/emsdk

# 执行编译操作
docker run --rm -v $(pwd):/home/src 42ua/emsdk emcc hello_world.c" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 拉取 Docker 镜像</span>
docker pull <span class="hljs-number">42</span>ua/emsdk

<span class="hljs-comment"># 执行编译操作</span>
docker run --rm -v <span class="hljs-variable">$(</span>pwd)<span class="hljs-symbol">:/home/src</span> <span class="hljs-number">42</span>ua/emsdk emcc hello_world.c</code></pre>
<p>对应的 Dockfile 如下所示，我们可以自行修改以适应未来的编译环境：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FROM ubuntu

RUN \
    apt-get update &amp;&amp; apt-get install -y build-essential \
    cmake python2.7 python nodejs-legacy default-jre git-core curl &amp;&amp; \
    apt-get clean &amp;&amp; \
\
    cd ~/ &amp;&amp; \
    curl -sL https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz | tar xz &amp;&amp; \
    cd emsdk-portable/ &amp;&amp; \
    ./emsdk update &amp;&amp; \
    ./emsdk install -j1 latest &amp;&amp; \
    ./emsdk activate latest &amp;&amp; \
\
    rm -rf ~/emsdk-portable/clang/tag-*/src &amp;&amp; \
    find . -name &quot;*.o&quot; -exec rm {} \; &amp;&amp; \
    find . -name &quot;*.a&quot; -exec rm {} \; &amp;&amp; \
    find . -name &quot;*.tmp&quot; -exec rm {} \; &amp;&amp; \
    find . -type d -name &quot;.git&quot; -prune -exec rm -rf {} \; &amp;&amp; \
\
    apt-get -y --purge remove curl git-core cmake &amp;&amp; \
    apt-get -y autoremove &amp;&amp; apt-get clean

# http://docs.docker.com/engine/reference/run/#workdir
WORKDIR /home/src" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tex"><code>FROM ubuntu

RUN <span class="hljs-tag">\<span class="hljs-name">
</span></span>    apt-get update &amp;&amp; apt-get install -y build-essential <span class="hljs-tag">\<span class="hljs-name">
</span></span>    cmake python2.7 python nodejs-legacy default-jre git-core curl &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    apt-get clean &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span><span class="hljs-tag">\<span class="hljs-name">
</span></span>    cd ~/ &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    curl -sL https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz | tar xz &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    cd emsdk-portable/ &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    ./emsdk update &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    ./emsdk install -j1 latest &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    ./emsdk activate latest &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span><span class="hljs-tag">\<span class="hljs-name">
</span></span>    rm -rf ~/emsdk-portable/clang/tag-*/src &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    find . -name "*.o" -exec rm {} <span class="hljs-tag">\<span class="hljs-name">;</span></span> &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    find . -name "*.a" -exec rm {} <span class="hljs-tag">\<span class="hljs-name">;</span></span> &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    find . -name "*.tmp" -exec rm {} <span class="hljs-tag">\<span class="hljs-name">;</span></span> &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    find . -type d -name ".git" -prune -exec rm -rf {} <span class="hljs-tag">\<span class="hljs-name">;</span></span> &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span><span class="hljs-tag">\<span class="hljs-name">
</span></span>    apt-get -y --purge remove curl git-core cmake &amp;&amp; <span class="hljs-tag">\<span class="hljs-name">
</span></span>    apt-get -y autoremove &amp;&amp; apt-get clean

# http://docs.docker.com/engine/reference/run/#workdir
WORKDIR /home/src</code></pre>
<p>到这里基本环境已经配置完毕，我们可以对简单的 counter.c 进行编译，源文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int counter = 100;

int count() {  
    counter += 1;
    return counter;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">int</span> counter = <span class="hljs-number">100</span>;

<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">count</span><span class="hljs-params">()</span> </span>{  
    counter += <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> counter;
}</code></pre>
<p>编译命令如下所示，如果本地安装好了 emcc 则可以直接使用，否则使用 Docker 环境进行编译：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ docker run --rm -v $(pwd):/home/src 42ua/emsdk emcc counter.c -s WASM=1 -s SIDE_MODULE=1 -o counter.wasm
$ emcc counter.c -s WASM=1 -s SIDE_MODULE=1 -o counter.wasm

# 如果出现以下错误，则是由如下参数
# WebAssembly Link Error: import object field 'DYNAMICTOP_PTR' is not a Number
emcc counter.c -O1 -s WASM=1 -s SIDE_MODULE=1 -o counter.wasm " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>$ docker run --rm -v $(<span class="hljs-built_in">pwd</span>):/home/src 42ua/emsdk emcc counter.c <span class="hljs-_">-s</span> WASM=1 <span class="hljs-_">-s</span> SIDE_MODULE=1 -o counter.wasm
$ emcc counter.c <span class="hljs-_">-s</span> WASM=1 <span class="hljs-_">-s</span> SIDE_MODULE=1 -o counter.wasm

<span class="hljs-comment"># 如果出现以下错误，则是由如下参数</span>
<span class="hljs-comment"># WebAssembly Link Error: import object field 'DYNAMICTOP_PTR' is not a Number</span>
emcc counter.c -O1 <span class="hljs-_">-s</span> WASM=1 <span class="hljs-_">-s</span> SIDE_MODULE=1 -o counter.wasm </code></pre>
<p>这样我们就得到了 WebAssembly 代码：<br><span class="img-wrap"><img data-src="/img/remote/1460000009792804?w=317&amp;h=128" src="https://static.alili.tech/img/remote/1460000009792804?w=317&amp;h=128" alt="Some WebAssembly code" title="Some WebAssembly code" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">与 JavaScript 集成使用</h1>
<p>独立的 .wasm 文件并不能直接使用，我们需要在客户端中使用 JavaScript 代码将其加载进来。最朴素的加载 WebAssembly 的方式就是使用 fetch 抓取然后编译，整个过程可以封装为如下函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 判断是否支持 WebAssembly
    if (!('WebAssembly' in window)) {
      alert('当前浏览器不支持 WebAssembly！');
    }
    // Loads a WebAssembly dynamic library, returns a promise.
    // imports is an optional imports object
    function loadWebAssembly(filename, imports) {
      // Fetch the file and compile it
      return fetch(filename)
        .then(response => response.arrayBuffer())
        .then(buffer => WebAssembly.compile(buffer))
        .then(module => {
          // Create the imports for the module, including the
          // standard dynamic library imports
          imports = imports || {};
          imports.env = imports.env || {};
          imports.env.memoryBase = imports.env.memoryBase || 0;
          imports.env.tableBase = imports.env.tableBase || 0;
          if (!imports.env.memory) {
            imports.env.memory = new WebAssembly.Memory({ initial: 256 });
          }
          if (!imports.env.table) {
            imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' });
          }
          // Create the instance.
          return new WebAssembly.Instance(module, imports);
        });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">// 判断是否支持 WebAssembly</span>
    <span class="hljs-keyword">if</span> (!(<span class="hljs-string">'WebAssembly'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>)) {
      alert(<span class="hljs-string">'当前浏览器不支持 WebAssembly！'</span>);
    }
    <span class="hljs-comment">// Loads a WebAssembly dynamic library, returns a promise.</span>
    <span class="hljs-comment">// imports is an optional imports object</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadWebAssembly</span>(<span class="hljs-params">filename, imports</span>) </span>{
      <span class="hljs-comment">// Fetch the file and compile it</span>
      <span class="hljs-keyword">return</span> fetch(filename)
        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.arrayBuffer())
        .then(<span class="hljs-function"><span class="hljs-params">buffer</span> =&gt;</span> WebAssembly.compile(buffer))
        .then(<span class="hljs-function"><span class="hljs-params">module</span> =&gt;</span> {
          <span class="hljs-comment">// Create the imports for the module, including the</span>
          <span class="hljs-comment">// standard dynamic library imports</span>
          imports = imports || {};
          imports.env = imports.env || {};
          imports.env.memoryBase = imports.env.memoryBase || <span class="hljs-number">0</span>;
          imports.env.tableBase = imports.env.tableBase || <span class="hljs-number">0</span>;
          <span class="hljs-keyword">if</span> (!imports.env.memory) {
            imports.env.memory = <span class="hljs-keyword">new</span> WebAssembly.Memory({ <span class="hljs-attr">initial</span>: <span class="hljs-number">256</span> });
          }
          <span class="hljs-keyword">if</span> (!imports.env.table) {
            imports.env.table = <span class="hljs-keyword">new</span> WebAssembly.Table({ <span class="hljs-attr">initial</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">element</span>: <span class="hljs-string">'anyfunc'</span> });
          }
          <span class="hljs-comment">// Create the instance.</span>
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> WebAssembly.Instance(<span class="hljs-built_in">module</span>, imports);
        });
    }</code></pre>
<p>我们可以使用上述工具函数加载 wasm 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    loadWebAssembly('counter.wasm')
      .then(instance => {
        var exports = instance.exports; // the exports of that instance
        var count = exports. _count; // the &quot;_count&quot; function (note &quot;_&quot; prefix)
        // 下面即可以调用 count 函数
      }
    );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    loadWebAssembly(<span class="hljs-string">'counter.wasm'</span>)
      .then(<span class="hljs-function"><span class="hljs-params">instance</span> =&gt;</span> {
        <span class="hljs-keyword">var</span> exports = instance.exports; <span class="hljs-comment">// the exports of that instance</span>
        <span class="hljs-keyword">var</span> count = exports. _count; <span class="hljs-comment">// the "_count" function (note "_" prefix)</span>
        <span class="hljs-comment">// 下面即可以调用 count 函数</span>
      }
    );</code></pre>
<p>而在笔者的<a href="https://github.com/wxyyxc1992/create-react-boilerplate" rel="nofollow noreferrer" target="_blank">脚手架</a>中，使用了 wasm-loader 进行加载，这样可以将 wasm 直接打包在 Bundle 中，然后通过 <code>import</code> 导入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { PureComponent } from &quot;react&quot;;

import CounterWASM from &quot;./counter.wasm&quot;;
import Button from &quot;antd/es/button/button&quot;;

import &quot;./Counter.scss&quot;;

/**
 * Description 简单计数器示例
 */
export default class Counter extends PureComponent {
  state = {
    count: 0
  };

  componentDidMount() {
    this.counter = new CounterWASM({
      env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new window.WebAssembly.Memory({ initial: 256 }),
        table: new window.WebAssembly.Table({ initial: 0, element: &quot;anyfunc&quot; })
      }
    });
    this.setState({
      count: this.counter.exports._count()
    });
  }

  /**
   * Description 默认渲染函数
   */
  render() {
    const isWASMSupport = &quot;WebAssembly&quot; in window;

    if (!isWASMSupport) {
      return (
        <div>
          浏览器不支持 WASM
        </div>
      );
    }

    return (
      <div className=&quot;Counter__container&quot;>
        <span>
          简单计数器示例：
        </span>
        <span>{this.state.count}</span>
        <Button
          type=&quot;primary&quot;
          onClick={() => {
            this.setState({
              count: this.counter.exports._count()
            });
          "}}"
        >
          点击自增
        </Button>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { PureComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;

<span class="hljs-keyword">import</span> CounterWASM <span class="hljs-keyword">from</span> <span class="hljs-string">"./counter.wasm"</span>;
<span class="hljs-keyword">import</span> Button <span class="hljs-keyword">from</span> <span class="hljs-string">"antd/es/button/button"</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">"./Counter.scss"</span>;

<span class="hljs-comment">/**
 * Description 简单计数器示例
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{
  state = {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
  };

  componentDidMount() {
    <span class="hljs-keyword">this</span>.counter = <span class="hljs-keyword">new</span> CounterWASM({
      <span class="hljs-attr">env</span>: {
        <span class="hljs-attr">memoryBase</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">tableBase</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">memory</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">window</span>.WebAssembly.Memory({ <span class="hljs-attr">initial</span>: <span class="hljs-number">256</span> }),
        <span class="hljs-attr">table</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">window</span>.WebAssembly.Table({ <span class="hljs-attr">initial</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">element</span>: <span class="hljs-string">"anyfunc"</span> })
      }
    });
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.counter.exports._count()
    });
  }

  <span class="hljs-comment">/**
   * Description 默认渲染函数
   */</span>
  render() {
    <span class="hljs-keyword">const</span> isWASMSupport = <span class="hljs-string">"WebAssembly"</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>;

    <span class="hljs-keyword">if</span> (!isWASMSupport) {
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          浏览器不支持 WASM
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Counter__container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>
          简单计数器示例：
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{this.state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
            this.setState({
              count: this.counter.exports._count()
            });
          "}}"
        &gt;
          点击自增
        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>在使用 <code>wasm-loader</code> 时，其会调用 <code>new WebAssembly.Instance(module, importObject);</code></p>
<ul>
<li><p><code>module</code> 即 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module" rel="nofollow noreferrer" target="_blank">WebAssembly.Module</a> 实例。</p></li>
<li><p><code>importObject</code> 即默认的由 <code>wasm-loader</code> 提供的对象。</p></li>
</ul>
<h1 id="articleHeader2">简单游戏引擎重构</h1>
<p>上文我们讨论了利用 WebAssembly 重构简单的计数器模块，这里我们以简单的游戏为例，交互式的感受 WebAssembly 带来的性能提升，可以直接查看<a href="http://wxyyxc1992.github.io/crb/#/wasm" rel="nofollow noreferrer" target="_blank">游戏的在线演示</a>。这里的游戏引擎即是执行部分计算与重新赋值操作，譬如这里的计算下一个位置状态的函数在 C 中实现为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EMSCRIPTEN_KEEPALIVE
void computeNextState()
{
  loopCurrentState();

  int neighbors = 0;
  int i_m1, i_p1, i_;
  int j_m1, j_p1;
  int height_limit = height - 1;
  int width_limit = width - 1;
  for (int i = 1; i < height_limit; i++)
  {
    i_m1 = (i - 1) * width;
    i_p1 = (i + 1) * width;
    i_ = i * width;
    for (int j = 1; j < width_limit; j++)
    {
      j_m1 = j - 1;
      j_p1 = j + 1;
      neighbors = current[i_m1 + j_m1];
      neighbors += current[i_m1 + j];
      neighbors += current[i_m1 + j_p1];
      neighbors += current[i_ + j_m1];
      neighbors += current[i_ + j_p1];
      neighbors += current[i_p1 + j_m1];
      neighbors += current[i_p1 + j];
      neighbors += current[i_p1 + j_p1];
      if (neighbors == 3)
      {
        next[i_ + j] = 1;
      }
      else if (neighbors == 2)
      {
        next[i_ + j] = current[i_ + j];
      }
      else
      {
        next[i_ + j] = 0;
      }
    }
  }
  memcpy(current, next, width * height);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>EMSCRIPTEN_KEEPALIVE
void computeNextState()
{
  loopCurrentState()<span class="hljs-comment">;</span>

  int neighbors = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
  int i_m1, i_p1, i_<span class="hljs-comment">;</span>
  int <span class="hljs-keyword">j_m1, </span><span class="hljs-keyword">j_p1;
</span>  int height_limit = height - <span class="hljs-number">1</span><span class="hljs-comment">;</span>
  int width_limit = width - <span class="hljs-number">1</span><span class="hljs-comment">;</span>
  for (int i = <span class="hljs-number">1</span><span class="hljs-comment">; i &lt; height_limit; i++)</span>
  {
    i_m1 = (i - <span class="hljs-number">1</span>) * width<span class="hljs-comment">;</span>
    i_p1 = (i + <span class="hljs-number">1</span>) * width<span class="hljs-comment">;</span>
    i_ = i * width<span class="hljs-comment">;</span>
    for (int <span class="hljs-keyword">j </span>= <span class="hljs-number">1</span><span class="hljs-comment">; j &lt; width_limit; j++)</span>
    {
      <span class="hljs-keyword">j_m1 </span>= <span class="hljs-keyword">j </span>- <span class="hljs-number">1</span><span class="hljs-comment">;</span>
      <span class="hljs-keyword">j_p1 </span>= <span class="hljs-keyword">j </span>+ <span class="hljs-number">1</span><span class="hljs-comment">;</span>
      neighbors = current[i_m1 + <span class="hljs-keyword">j_m1];
</span>      neighbors += current[i_m1 + <span class="hljs-keyword">j];
</span>      neighbors += current[i_m1 + <span class="hljs-keyword">j_p1];
</span>      neighbors += current[i_ + <span class="hljs-keyword">j_m1];
</span>      neighbors += current[i_ + <span class="hljs-keyword">j_p1];
</span>      neighbors += current[i_p1 + <span class="hljs-keyword">j_m1];
</span>      neighbors += current[i_p1 + <span class="hljs-keyword">j];
</span>      neighbors += current[i_p1 + <span class="hljs-keyword">j_p1];
</span>      if (neighbors == <span class="hljs-number">3</span>)
      {
        next[i_ + <span class="hljs-keyword">j] </span>= <span class="hljs-number">1</span><span class="hljs-comment">;</span>
      }
      else if (neighbors == <span class="hljs-number">2</span>)
      {
        next[i_ + <span class="hljs-keyword">j] </span>= current[i_ + <span class="hljs-keyword">j];
</span>      }
      else
      {
        next[i_ + <span class="hljs-keyword">j] </span>= <span class="hljs-number">0</span><span class="hljs-comment">;</span>
      }
    }
  }
  memcpy(current, next, width * height)<span class="hljs-comment">;</span>
}</code></pre>
<p>而对应的 JS 版本引擎的实现为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computeNextState() {
  let neighbors, iM1, iP1, i_, jM1, jP1;

  this.loopCurrentState();

  for (let i = 1; i < this._height - 1; i++) {
    iM1 = (i - 1) * this._width;
    iP1 = (i + 1) * this._width;
    i_ = i * this._width;
    for (let j = 1; j < this._width - 1; j++) {
      jM1 = j - 1;
      jP1 = j + 1;
      neighbors = this._current[iM1 + jM1];
      neighbors += this._current[iM1 + j];
      neighbors += this._current[iM1 + jP1];
      neighbors += this._current[i_ + jM1];
      neighbors += this._current[i_ + jP1];
      neighbors += this._current[iP1 + jM1];
      neighbors += this._current[iP1 + j];
      neighbors += this._current[iP1 + jP1];
      if (neighbors === 3) {
        this._next[i_ + j] = 1;
      } else if (neighbors === 2) {
        this._next[i_ + j] = this._current[i_ + j];
      } else {
        this._next[i_ + j] = 0;
      }
    }
  }
  this._current.set(this._next);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>computeNextState() {
  let neighbors, iM1, iP1, i_, jM1, jP1;

  <span class="hljs-keyword">this</span>.loopCurrentState();

  <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-keyword">this</span>._height - <span class="hljs-number">1</span>; i++) {
    iM1 = (i - <span class="hljs-number">1</span>) * <span class="hljs-keyword">this</span>._width;
    iP1 = (i + <span class="hljs-number">1</span>) * <span class="hljs-keyword">this</span>._width;
    i_ = i * <span class="hljs-keyword">this</span>._width;
    <span class="hljs-keyword">for</span> (let j = <span class="hljs-number">1</span>; j &lt; <span class="hljs-keyword">this</span>._width - <span class="hljs-number">1</span>; j++) {
      jM1 = j - <span class="hljs-number">1</span>;
      jP1 = j + <span class="hljs-number">1</span>;
      neighbors = <span class="hljs-keyword">this</span>._current[iM1 + jM1];
      neighbors += <span class="hljs-keyword">this</span>._current[iM1 + j];
      neighbors += <span class="hljs-keyword">this</span>._current[iM1 + jP1];
      neighbors += <span class="hljs-keyword">this</span>._current[i_ + jM1];
      neighbors += <span class="hljs-keyword">this</span>._current[i_ + jP1];
      neighbors += <span class="hljs-keyword">this</span>._current[iP1 + jM1];
      neighbors += <span class="hljs-keyword">this</span>._current[iP1 + j];
      neighbors += <span class="hljs-keyword">this</span>._current[iP1 + jP1];
      <span class="hljs-keyword">if</span> (neighbors === <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">this</span>._next[i_ + j] = <span class="hljs-number">1</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (neighbors === <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">this</span>._next[i_ + j] = <span class="hljs-keyword">this</span>._current[i_ + j];
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>._next[i_ + j] = <span class="hljs-number">0</span>;
      }
    }
  }
  <span class="hljs-keyword">this</span>._current.<span class="hljs-keyword">set</span>(<span class="hljs-keyword">this</span>._next);
}</code></pre>
<p>本部分的编译依旧是直接将 [engine.c]() 编译为 engine.wasm，不过在导入的时候我们需要动态地向 wasm 中注入外部函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.module = new EngineWASM({
      env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new window.WebAssembly.Memory({ initial: 1024 }),
        table: new window.WebAssembly.Table({ initial: 0, element: &quot;anyfunc&quot; }),
        _malloc: size => {
          let buffer = new ArrayBuffer(size);
          return new Uint8Array(buffer);
        },
        _memcpy: (source, target, size) => {
          let sourceEnd = source.byteLength;

          let i, j;

          for (
            (i = 0), (j = 0), (k = new Uint8Array(target)), (l = new Uint8Array(
              source
            ));
            i < sourceEnd;
            ++i, ++j
          )
            k[j] = l[i];
        }
      }
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">this</span>.module = <span class="hljs-keyword">new</span> EngineWASM({
      <span class="hljs-attr">env</span>: {
        <span class="hljs-attr">memoryBase</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">tableBase</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">memory</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">window</span>.WebAssembly.Memory({ <span class="hljs-attr">initial</span>: <span class="hljs-number">1024</span> }),
        <span class="hljs-attr">table</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">window</span>.WebAssembly.Table({ <span class="hljs-attr">initial</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">element</span>: <span class="hljs-string">"anyfunc"</span> }),
        <span class="hljs-attr">_malloc</span>: <span class="hljs-function"><span class="hljs-params">size</span> =&gt;</span> {
          <span class="hljs-keyword">let</span> buffer = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(size);
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(buffer);
        },
        <span class="hljs-attr">_memcpy</span>: <span class="hljs-function">(<span class="hljs-params">source, target, size</span>) =&gt;</span> {
          <span class="hljs-keyword">let</span> sourceEnd = source.byteLength;

          <span class="hljs-keyword">let</span> i, j;

          <span class="hljs-keyword">for</span> (
            (i = <span class="hljs-number">0</span>), (j = <span class="hljs-number">0</span>), (k = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(target)), (l = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(
              source
            ));
            i &lt; sourceEnd;
            ++i, ++j
          )
            k[j] = l[i];
        }
      }
    });</code></pre>
<p>到这里文本告一段落，笔者最后需要声明的是因为这只是随手做的实验，最后的代码包括对于内存的操作可能存在潜在问题，请读者批评指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebAssembly 初体验：从零开始重构计算模块

## 原文链接
[https://segmentfault.com/a/1190000009792801](https://segmentfault.com/a/1190000009792801)

