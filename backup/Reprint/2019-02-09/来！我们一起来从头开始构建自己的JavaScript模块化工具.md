---
title: '来！我们一起来从头开始构建自己的JavaScript模块化工具' 
date: 2019-02-09 2:30:59
hidden: true
slug: j8hl0d9sqtd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>希望编写程序能像玩积木一样，首先规划要产出怎样的作品，然后在积木堆中挑选合适的积木块，最后一组合就完工了。</p>
<p>于是JavaScript需要类似这样模块化，每个模块都隐藏内部细节并且对外暴露接口，再处理好模块之间的依赖关系，就可以达到玩积木的效果了。</p>
<p>虽然现有很多模块化框架／工具，但对于新手来说，为什么不自己撸一个简单的模块化工具呢？</p>
<p>希望通过这个工具把自己觉得好用的代码以模块的方式组织起来，渐渐形成自己的JS库，之后可以勇敢地和HR说，自己的小项目用的是自己小JS库，^_^。我觉得，在这个封装的过程中，新手能学习到很多东西。</p>
<p>新手嘛，多造轮子总是有好处的，=_=。</p>
<h2 id="articleHeader1">从闭包到模块</h2>
<p>以下是《你所不知道的JavaScript（上卷）》中对于闭包的说明。</p>
<blockquote><p>当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。</p></blockquote>
<p>其实，不管怎样，闭包正如其字面意思一样，既能提供一个相对封闭的空间，也能向外界暴露必要的接口。这不就正符合我们模块化的需求吗？</p>
<p>在此，建议参考这篇文章，以加强您对闭包的理解：<a href="https://segmentfault.com/a/1190000005056334">《假如技术HR问您JavaScript的“闭包”，嘿嘿嘿，举这个例子就够了》</a>。</p>
<h2 id="articleHeader2">最简单的模块</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test = (function test(){
    function run(){
        console.log(&quot;run test&quot;);
    }
    return {
        run: run
    };
})();
test.run();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> test = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"run test"</span>);
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">run</span>: run
    };
})();
test.run();</code></pre>
<p>上面的代码有个叫test的函数作为模块创建器，每次调用它都可以创建一个新的模块。这里使用立即执行函数，立即创建了一个test模块。参考闭包的概念，外部可以调用test模块中的run函数，同时test模块又有自己独立的作用域。能达到一个积木块（模块）的要求。</p>
<p>简单的模块这样写没有问题，但是模块间的依赖问题没有解决。</p>
<h2 id="articleHeader3">最简单的模块管理工具</h2>
<p>模块之间必然会存在依赖关系，而模块管理工具需要能够很好地管理模块间的依赖。下面我们模仿实现了AMD规范的工具requirejs，主要是模仿其define，get的API风格，自己写一个简单的版本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//模块管理工具，MyModules
var MyModules = (function Manager() {
    var modules = {};
    function define(name, deps, impl) {
        for (var i=0; i<deps.length; i++){
            //将依赖的名字替换成已经注册了的模块
            deps[i] = modules[deps[i]];
        }
        //将依赖数组展开成参数传入模块的构建函数，生成新模块
        modules[name] = impl.apply(impl, deps);
    }
    function get(name){
        return modules[name];
    }
    return {
        define: define,
        get: get
    }
})();
//定义一个模块，data
MyModules.define(&quot;data&quot;,[],function(){
    var name = &quot;miku&quot;;
    function getName(){
        return name;
    }
    return {
        getName:getName
    }
});
//定义一个模块，app
//该模块依赖data模块
MyModules.define(&quot;app&quot;, [&quot;data&quot;], function(data){
    function run(){
        console.log(data.getName());
    }
    return {
        run:run
    }
});
//取出app模块
var app = MyModules.get(&quot;app&quot;);
//调用app模块的run方法
app.run();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//模块管理工具，MyModules</span>
<span class="hljs-keyword">var</span> MyModules = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Manager</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> modules = {};
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">define</span>(<span class="hljs-params">name, deps, impl</span>) </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;deps.length; i++){
            <span class="hljs-comment">//将依赖的名字替换成已经注册了的模块</span>
            deps[i] = modules[deps[i]];
        }
        <span class="hljs-comment">//将依赖数组展开成参数传入模块的构建函数，生成新模块</span>
        modules[name] = impl.apply(impl, deps);
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params">name</span>)</span>{
        <span class="hljs-keyword">return</span> modules[name];
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">define</span>: define,
        <span class="hljs-attr">get</span>: get
    }
})();
<span class="hljs-comment">//定义一个模块，data</span>
MyModules.define(<span class="hljs-string">"data"</span>,[],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> name = <span class="hljs-string">"miku"</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> name;
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">getName</span>:getName
    }
});
<span class="hljs-comment">//定义一个模块，app</span>
<span class="hljs-comment">//该模块依赖data模块</span>
MyModules.define(<span class="hljs-string">"app"</span>, [<span class="hljs-string">"data"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(data.getName());
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">run</span>:run
    }
});
<span class="hljs-comment">//取出app模块</span>
<span class="hljs-keyword">var</span> app = MyModules.get(<span class="hljs-string">"app"</span>);
<span class="hljs-comment">//调用app模块的run方法</span>
app.run();</code></pre>
<p>可以看出，利用MyModules可以很方便地定义使用模块，管理模块依赖。但是还存在一个问题，MyModules对于模块定义的顺序有要求。以上面的例子来说，就是app模块依赖data模块，那data模块必须在app模块之前被定义。这个限制让我们实际使用中不是很方便。接下来我们将改进它。</p>
<h2 id="articleHeader4">改进模块管理工具</h2>
<p>我们需要让模块管理工具不需要限制模块的定义顺序，这里我的做法是，使用一个rebuilds数组来保存未成功构建的模块。每次有新模块构建成功的时候就会重新尝试去构建整个rebuilds数组中的模块。具体看下面的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.mm_modules = (function Manager() {
    var debug = false;
    var modules = {};
    var rebuilds = [];
    function copyArray (array){
        var tempArray = [];
        for(var i=0; i<array.length; i++){
            tempArray.push(array[i]);
        }
        return tempArray;
    }
    function define(name, deps, impl) {
        //判断依赖构建是否成功
        var depsDone = true;
        
        //拷贝一份当前想要构建的模块，当构建失败时使用
        var rebuildCopy = {
            name : name,
            deps : copyArray(deps),
            impl : impl
        };
        
        //循环依赖数组，构建依赖
        for (var i=0; i<deps.length; i++){
            //将依赖的名字替换成已经注册了的模块
            deps[i] = modules[deps[i]];
            //有依赖的模块未定义，所以这个模块构建失败
            if(!deps[i]){
                depsDone = false;
                break;
            }
        }
        
        //如果依赖构建成功，即模块构建成功
        if(depsDone){
            //将依赖数组展开成参数传入模块的构建函数，生成新模块
            modules[name] = impl.apply(impl, deps);
            //从rebuilds数组中移除
            if(rebuilds[name]){
               delete rebuilds[name];
            }
            //循环rebuilds数组，尝试从新构建之前构建失败的模块
            for (key in rebuilds){
                var rebuild = rebuilds[key];
                if(rebuild){
                    //递归调用
                    define(rebuild.name, rebuild.deps, rebuild.impl);
                }
            }
        }
        //模块构建失败，存入rebuilds数组中，等待下一次重新构建
        else{
            rebuilds[name] = rebuildCopy;
        }
        if(debug){
            console.log(&quot;[mm_modules debug]need rebuild modules:&quot;, rebuilds);
        }
    }
    function get(name){
        return modules[name];
    }
    return {
        define: define,
        get: get
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.mm_modules = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Manager</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> debug = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">var</span> modules = {};
    <span class="hljs-keyword">var</span> rebuilds = [];
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyArray</span> (<span class="hljs-params">array</span>)</span>{
        <span class="hljs-keyword">var</span> tempArray = [];
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;array.length; i++){
            tempArray.push(array[i]);
        }
        <span class="hljs-keyword">return</span> tempArray;
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">define</span>(<span class="hljs-params">name, deps, impl</span>) </span>{
        <span class="hljs-comment">//判断依赖构建是否成功</span>
        <span class="hljs-keyword">var</span> depsDone = <span class="hljs-literal">true</span>;
        
        <span class="hljs-comment">//拷贝一份当前想要构建的模块，当构建失败时使用</span>
        <span class="hljs-keyword">var</span> rebuildCopy = {
            <span class="hljs-attr">name</span> : name,
            <span class="hljs-attr">deps</span> : copyArray(deps),
            <span class="hljs-attr">impl</span> : impl
        };
        
        <span class="hljs-comment">//循环依赖数组，构建依赖</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;deps.length; i++){
            <span class="hljs-comment">//将依赖的名字替换成已经注册了的模块</span>
            deps[i] = modules[deps[i]];
            <span class="hljs-comment">//有依赖的模块未定义，所以这个模块构建失败</span>
            <span class="hljs-keyword">if</span>(!deps[i]){
                depsDone = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">break</span>;
            }
        }
        
        <span class="hljs-comment">//如果依赖构建成功，即模块构建成功</span>
        <span class="hljs-keyword">if</span>(depsDone){
            <span class="hljs-comment">//将依赖数组展开成参数传入模块的构建函数，生成新模块</span>
            modules[name] = impl.apply(impl, deps);
            <span class="hljs-comment">//从rebuilds数组中移除</span>
            <span class="hljs-keyword">if</span>(rebuilds[name]){
               <span class="hljs-keyword">delete</span> rebuilds[name];
            }
            <span class="hljs-comment">//循环rebuilds数组，尝试从新构建之前构建失败的模块</span>
            <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> rebuilds){
                <span class="hljs-keyword">var</span> rebuild = rebuilds[key];
                <span class="hljs-keyword">if</span>(rebuild){
                    <span class="hljs-comment">//递归调用</span>
                    define(rebuild.name, rebuild.deps, rebuild.impl);
                }
            }
        }
        <span class="hljs-comment">//模块构建失败，存入rebuilds数组中，等待下一次重新构建</span>
        <span class="hljs-keyword">else</span>{
            rebuilds[name] = rebuildCopy;
        }
        <span class="hljs-keyword">if</span>(debug){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"[mm_modules debug]need rebuild modules:"</span>, rebuilds);
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params">name</span>)</span>{
        <span class="hljs-keyword">return</span> modules[name];
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">define</span>: define,
        <span class="hljs-attr">get</span>: get
    }
})();</code></pre>
<p>改进后的模块管理工具，能够自动地处理模块依赖，而不需要限制定义顺序了。<br>那，能不能更进一步呢？试着想一下，我们日常会怎么使用？单文件单模块，然后把这些文件放在不同文件夹里组织好。于是，我就想到使用gulp这样的工具辅助我们。</p>
<h2 id="articleHeader5">gulp辅助</h2>
<p>请参考下面的目录结构。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── dist
│&nbsp;&nbsp; ├── index.html
│&nbsp;&nbsp; └── js
│&nbsp;&nbsp;     └── mm-modules-build.js
├── gulpfile.js
├── mm-modules
│&nbsp;&nbsp; ├── queryObject.js
│&nbsp;&nbsp; ├── request.js
│&nbsp;&nbsp; ├── template.js
│&nbsp;&nbsp; ├── test.js
│&nbsp;&nbsp; └── util.js
├── mm-modules.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── dist
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp; └── js
│&nbsp;&nbsp;     └── mm-modules-build<span class="hljs-selector-class">.js</span>
├── gulpfile<span class="hljs-selector-class">.js</span>
├── mm-modules
│&nbsp;&nbsp; ├── queryObject<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── request<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── template<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── test<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── util<span class="hljs-selector-class">.js</span>
├── mm-modules.js</code></pre>
<p>可以在mm-modules下随意地定义模块，如util模块内有各种工具函数，template模块则包含了artTemplate模版引擎。之后利用gulp将mm-modules.js（模块管理工具）与mm-modules下所有的模块文件打包成mm-modules-build.js。项目中只要引入mm-modules-build.js即可。</p>
<h2 id="articleHeader6">结尾</h2>
<p>到此，我们自己构建了一个很实用的JavaScript模块化工具，项目的源码在这里：<a href="https://github.com/MIKUScallion/mm-modules" rel="nofollow noreferrer" target="_blank">https://github.com/MIKUScallion/mm-modules</a>，喜欢的话，给个✨。</p>
<p>再回顾一下前言的话。</p>
<blockquote>
<p>希望通过这个工具把自己觉得好用的代码以模块的方式组织起来，渐渐形成自己的JS库，之后可以勇敢地和HR说，自己的小项目用的是自己小JS库，^_^。我觉得，在这个封装的过程中，新手能学习到很多东西。</p>
<p>新手嘛，多造轮子总是有好处的，=_=。</p>
</blockquote>
<h2 id="articleHeader7">参考</h2>
<ul><li><p>《你所不知道的JavaScript（上卷）》</p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
来！我们一起来从头开始构建自己的JavaScript模块化工具

## 原文链接
[https://segmentfault.com/a/1190000005621376](https://segmentfault.com/a/1190000005621376)

