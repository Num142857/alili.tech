---
title: 'Angular系列之AoT编译' 
date: 2019-01-02 2:30:09
hidden: true
slug: yncddz4mg5f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">概览</h2>
<p>众所周知, <code>angular</code>应用在可执行之前, <code>angular</code>应用中的组件和模板必须被转化为可以被浏览器识别的<code>javascript</code>代码, 而这种转化正是通过<code>angualr</code>自身的编译器所执行的.</p>
<p>angular提供了两种编译方式, 即<code>AOT</code>(预编译)和<code>JIT</code>(即使编译), 其中<code>JIT</code>为默认的编译方式</p>
<p>AOT即 <code>Ahead of time</code>, 是指在构建时进行编译, 即在服务端即完成了编译<br>JIt即 <code>Just-in-Time</code>, 在运行期间编译该应用，也就是在应用加载时。</p>
<h1 id="articleHeader1">AOT vs JIT</h1>
<p>实际上只有一个编译器,两者的区别只是编译的时机和工具不同</p>
<p>JIT编译导致运行期间的性能损耗。 由于需要在浏览器中执行这个编译过程，视图需要花更长时间才能渲染出来。 由于应用包含了Angular编译器以及大量实际上并不需要的库代码，所以文件体积也会更大。 更大的应用需要更长的时间进行传输，加载也更慢。</p>
<p>编译可以发现一些组件模板绑定错误。JIT编译在运行时才揭露它们，那样有点太晚了。</p>
<p>而预编译（AOT）会在构建时编译，这样可以在早期截获模板错误，提高应用性能。</p>
<h1 id="articleHeader2">JiT编译模式的流程</h1>
<p>一个典型的<code>jiT</code>应用的开发流程大概是：</p>
<ul>
<li>使用<code>TypeScript</code>开发Angular应用</li>
<li>使用<code>tsc</code>来编译这个应用的ts代码</li>
<li>打包</li>
<li>压缩</li>
<li>部署</li>
</ul>
<p>一旦把app部署好了，并且用户在浏览器中打开了这个app，下面这些事情会逐一进行：</p>
<ul>
<li>浏览器下载js代码</li>
<li>
<code>Angular</code>启动</li>
<li>
<code>Angular</code>在浏览器中开始<code>JiT</code>编译的过程，例如生成app中各个组件的js代码</li>
<li>应用页面得以渲染</li>
</ul>
<p>相对的，使用<code>AoT</code>模式的应用的开发流程是：</p>
<ul>
<li>使用<code>TypeScript</code>开发<code>Angular</code>应用</li>
<li>
<p>使用<code>ngc</code>来编译应用</p>
<ul>
<li>使用<code>Angular</code>编译器对模板进行编译，生成<code>TypeScript</code>代码</li>
<li>
<code>TypesScript</code>代码编译为<code>JavaScript</code>代码</li>
</ul>
</li>
<li>打包</li>
<li>压缩</li>
<li>部署</li>
</ul>
<p>虽然前面的过程稍稍复杂，但是用户这一侧的事情就变简单了：</p>
<ul>
<li>下载所有代码</li>
<li>
<code>Angular</code>启动</li>
<li>应用页面得以渲染</li>
</ul>
<p>概括起来，<code>Angular</code>中的<code>Jit</code>和<code>AoT</code>的主要区别是：</p>
<ul>
<li>编译过程发生的时机</li>
<li>
<code>JiT</code>生成的是<code>JS</code>代码，而<code>AoT</code>生成的是<code>TS</code>代码。这主要是因为<code>JiT</code>是在浏览器中进行的，它完全没必要生成<code>TS</code>代码，而是直接生产了<code>JS</code>代码。</li>
</ul>
<h1 id="articleHeader3">深入AOT编译</h1>
<h2 id="articleHeader4">AOT编译的配置</h2>
<h3 id="articleHeader5">安装<code>npm</code>依赖</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install @angular/compiler-cli @angular/platform-server --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> install @angular/compiler-cli @angular/platform-server --save
</code></pre>
<p>把下列npm便利脚本添加到package.json中，以便用一条命令就可以完成编译</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build:aot&quot;: &quot;ngc -p tsconfig-aot.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"build:aot"</span>: <span class="hljs-string">"ngc -p tsconfig-aot.json</span></code></pre>
<p>用<code>@angular/compiler-cli</code>包中提供的<code>ngc</code>编译器来代替<code>TypeScript</code>编译器（tsc）。</p>
<h3 id="articleHeader6">配置<code>tsconfig-aot.json</code> 文件</h3>
<blockquote><p>只需将<code>tsconfig.json</code> 文件复制过来进行修改即可</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    &quot;target&quot;: &quot;es5&quot;,
    &quot;module&quot;: &quot;es2015&quot;,
    &quot;moduleResolution&quot;: &quot;node&quot;,
    &quot;sourceMap&quot;: true,
    &quot;emitDecoratorMetadata&quot;: true,
    &quot;experimentalDecorators&quot;: true,
    &quot;lib&quot;: [&quot;es2015&quot;, &quot;dom&quot;],
    &quot;noImplicitAny&quot;: true,
    &quot;suppressImplicitAnyIndexErrors&quot;: true,
    &quot;typeRoots&quot;: [
      &quot;./node_modules/@types/&quot;
    ]
  },

  &quot;files&quot;: [
    &quot;src/app/app.module.ts&quot;,
    &quot;src/main.ts&quot;
  ],

  &quot;angularCompilerOptions&quot;: {
   &quot;genDir&quot;: &quot;aot&quot;,
   &quot;skipMetadataEmit&quot; : true
 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"compilerOptions"</span>: {
    <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-attr">"module"</span>: <span class="hljs-string">"es2015"</span>,
    <span class="hljs-attr">"moduleResolution"</span>: <span class="hljs-string">"node"</span>,
    <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"emitDecoratorMetadata"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"lib"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"dom"</span>],
    <span class="hljs-attr">"noImplicitAny"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"suppressImplicitAnyIndexErrors"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"typeRoots"</span>: [
      <span class="hljs-string">"./node_modules/@types/"</span>
    ]
  },

  <span class="hljs-attr">"files"</span>: [
    <span class="hljs-string">"src/app/app.module.ts"</span>,
    <span class="hljs-string">"src/main.ts"</span>
  ],

  <span class="hljs-attr">"angularCompilerOptions"</span>: {
   <span class="hljs-attr">"genDir"</span>: <span class="hljs-string">"aot"</span>,
   <span class="hljs-attr">"skipMetadataEmit"</span> : <span class="hljs-literal">true</span>
 }
}</code></pre>
<p><code>compilerOptions</code>部分只修改了一个属性：**把module设置为<code>es2015</code>(为后面摇树优化做准备)</p>
<p><code>ngc</code>区真正新增的内容是底部的<code>angularCompilerOptions</code>。 它的<code>genDir</code>属性告诉编译器把编译结果保存在新的<code>aot</code>目录下</p>
<p><code>"skipMetadataEmit" : true</code>属性阻止编译器为编译后的应用生成元数据文件。 当输出成TypeScript文件时，元数据并不是必须的，因此不需要包含它们。</p>
<h3 id="articleHeader7">启动AOT编译：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node_modules/.bin/ngc -p tsconfig-aot.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">node_modules/.bin/ngc -<span class="hljs-selector-tag">p</span> tsconfig-aot.json</code></pre>
<p>编译完成后生成了一堆<code>NgFactory</code>文件,不要编辑这些NgFactory！重新编译时会替换这些文件.</p>
<h3 id="articleHeader8">改变引导方式<code>main.ts</code> 文件</h3>
<p>从<code>platformBrowserDynamic.bootstrap</code>改成使用<code>platformBrowser().bootstrapModuleFactory</code>并把<code>AppModuleNgFactory</code>的AOT编译结果传给它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { platformBrowser }    <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/platform-browser'</span>;
<span class="hljs-keyword">import</span> { AppModuleNgFactory } <span class="hljs-keyword">from</span> <span class="hljs-string">'../aot/src/app/app.module.ngfactory'</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Running AOT compiled'</span>);
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
</code></pre>
<h1 id="articleHeader9">摇树优化（Tree shaking）</h1>
<p>摇树优化是指通过跟踪<code>import</code>和<code>export</code>语句来对应用进行静态分析,遍历依赖图谱,并且摇掉用不到的代码,通过移除源码和库代码中用不到的部分，摇树优化可以大幅缩减应用的下载体积</p>
<p>摇树优化能够在我们最终的<code>Bundle</code>中移除掉我们应用中没有使用到的代码。这是减少应用程序占用空间的最有效的技术之一。</p>
<p>目前webpack2已经支持<code>tree shaking</code>, 官网介绍的是<a href="https://angular.cn/guide/aot-compiler#aot%E5%BF%AB%E9%80%9F%E8%B5%B7%E6%AD%A5%E6%BA%90%E4%BB%A3%E7%A0%81" rel="nofollow noreferrer" target="_blank">Rollup在angular中的使用</a></p>
<p><a href="https://www.zhihu.com/question/41922432" rel="nofollow noreferrer" target="_blank">知乎上关于tree shaking的介绍</a></p>
<h1 id="articleHeader10">开发器使用JIT, 产品期使用AOT</h1>
<p>目前，AOT编译和摇树优化对开发来说，占用的时间太多了。这将在未来得到改变。 当前的最佳实践是在开发器使用JIT编译，然后在发布产品前切换到AOT编译</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular系列之AoT编译

## 原文链接
[https://segmentfault.com/a/1190000010906373](https://segmentfault.com/a/1190000010906373)

