---
title: 'js进化，迁徙到typescript' 
date: 2019-01-13 2:30:11
hidden: true
slug: grzxx1wdi38
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">js进化，迁徙到typescript</h1>
<p><a href="https://www.tslang.cn/" rel="nofollow noreferrer" target="_blank">TypeScript</a></p>
<hr>
<h2 id="articleHeader1">历史</h2>
<ul>
<li><p>TypeScript是一种由微软开发的自由和开源的编程语言</p></li>
<li><p>它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程</p></li>
<li><p>2012年十月份，微软发布了首个公开版本的TypeScript</p></li>
<li><p>当前最新版本<code>v2.3.3</code></p></li>
</ul>
<h2 id="articleHeader2">前言</h2>
<blockquote><p>js圈的,不管是前端还是nodejs开发者，大多都听说过typescript,但真正使用它的人并不是这么多，根据我的观察，一般不了解人会有以下看法：</p></blockquote>
<ul>
<li><p><strong>不就是一个能编译成js的语言么，没什么特别的！</strong></p></li>
<li><p><strong>这个肯定也会像coffeeScript一样死掉</strong></p></li>
<li><p><strong>有了babel，前端也可以写es6,还要typescript做什么</strong></p></li>
<li><p><strong>js最大的优势就是灵活，用typescript就没有灵活性了</strong></p></li>
</ul>
<blockquote><p>以上这里声音都是在论坛看到的其他人的印象，以及向身边人推荐时的回复。</p></blockquote>
<p>本人一开始并不是typescript的拥护者，甚至有点排斥，那时候ts的开发工具也好，普及度也好，都是很稚嫩的。<br>直到最近在公司做了一些项目，因为是nodejs后端，在一开始使用babel方案转换es7-&gt;es5进行开发，在过程中，总是出现调试的时候无法进行断点，很多隐藏性的bug会在运行的过程中突然暴露，这之类的问题。<br>我开始重新了解一下typescript的现状，没想到已经完全走上正轨了，在github上已经有大量的项目选用，投入生产.<br>于是报着尝试的心态，开始了迁徙。</p>
<hr>
<h2 id="articleHeader3">迁徙到typescript</h2>
<blockquote>
<p>首先推荐一个对JS最友好，性能最棒的开发工具<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">vscode</a>                </p>
<p>开始以为迁徙过来是一件很困难的事情，只是稍做尝试，并没有报太大希望能快速无痛的切换过来.</p>
</blockquote>
<p>假设目录结构是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── src
|  ├── app.js
.
.
.
├── package.json
├── README.md 
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>├── src
|  ├── app.js
<span class="hljs-bullet">.
</span><span class="hljs-bullet">.
</span><span class="hljs-bullet">.
</span>├── package.json
├── README.md 
<span class="hljs-code"> </span></code></pre>
<h3 id="articleHeader4">一，首先使用重命名工具<code>renamex-cli</code>将项目目录<code>./src</code>中的所有js文件后缀 批量改成<code>.ts</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g renamex-cli
//then
renamex start -p &quot;src/**/*.js&quot; -r &quot;[name].ts&quot; -t no" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -g renamex-cli
<span class="hljs-comment">//then</span>
renamex start -<span class="hljs-selector-tag">p</span> <span class="hljs-string">"src/**/*.js"</span> -r <span class="hljs-string">"[name].ts"</span> -t no</code></pre>
<h3 id="articleHeader5">二，根目录新建<code>tsconfig.json</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;compilerOptions&quot;: {
        &quot;target&quot;: &quot;es2017&quot;,//将编译的.ts文件编译为指定标准js
        &quot;module&quot;: &quot;commonjs&quot;,//模块规范
        &quot;sourceMap&quot;: true, //生成资源映射，以便于调试
        &quot;noEmitHelpers&quot;: true,//不生成辅助方法，对应importHelpers
        &quot;importHelpers&quot;: true,//引用外部的辅助方法 
        &quot;allowUnreachableCode&quot;: true,//允许代码中途return产生无法执行代码
        &quot;lib&quot;: [&quot;es2017&quot;],//定义编译时依赖 
        &quot;typeRoots&quot;: [&quot;node_modules/@types&quot;],//定义类型定义文件的根目录
        &quot;types&quot;: [ 
         //添加新的类型定义库如 @types/lodash 需要在此处定义
        &quot;lodash&quot;
        ],
        &quot;outDir&quot;: &quot;./build&quot;,//编译输出文件目录，默认等于rootDir
        &quot;rootDir&quot;: &quot;./src&quot; //源代码目录在这个目录里编写你的ts文件
    },
    &quot;exclude&quot;: [
        &quot;node_modules&quot;, //忽略目录
        &quot;**/*.test.ts&quot; //忽略指定类型文件
    ] 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
    <span class="hljs-string">"compilerOptions"</span>: {
        <span class="hljs-string">"target"</span>: <span class="hljs-string">"es2017"</span>,<span class="hljs-comment">//将编译的.ts文件编译为指定标准js</span>
        <span class="hljs-string">"module"</span>: <span class="hljs-string">"commonjs"</span>,<span class="hljs-comment">//模块规范</span>
        <span class="hljs-string">"sourceMap"</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//生成资源映射，以便于调试</span>
        <span class="hljs-string">"noEmitHelpers"</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//不生成辅助方法，对应importHelpers</span>
        <span class="hljs-string">"importHelpers"</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//引用外部的辅助方法 </span>
        <span class="hljs-string">"allowUnreachableCode"</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//允许代码中途return产生无法执行代码</span>
        <span class="hljs-string">"lib"</span>: [<span class="hljs-string">"es2017"</span>],<span class="hljs-comment">//定义编译时依赖 </span>
        <span class="hljs-string">"typeRoots"</span>: [<span class="hljs-string">"node_modules/@types"</span>],<span class="hljs-comment">//定义类型定义文件的根目录</span>
        <span class="hljs-string">"types"</span>: [ 
         <span class="hljs-comment">//添加新的类型定义库如 @types/lodash 需要在此处定义</span>
        <span class="hljs-string">"lodash"</span>
        ],
        <span class="hljs-string">"outDir"</span>: <span class="hljs-string">"./build"</span>,<span class="hljs-comment">//编译输出文件目录，默认等于rootDir</span>
        <span class="hljs-string">"rootDir"</span>: <span class="hljs-string">"./src"</span> <span class="hljs-comment">//源代码目录在这个目录里编写你的ts文件</span>
    },
    <span class="hljs-string">"exclude"</span>: [
        <span class="hljs-string">"node_modules"</span>, <span class="hljs-comment">//忽略目录</span>
        <span class="hljs-string">"**/*.test.ts"</span> <span class="hljs-comment">//忽略指定类型文件</span>
    ] 
}</code></pre>
<h3 id="articleHeader6">三，typescript配置<a href="https://tslang.cn/docs/handbook/compiler-options.html" rel="nofollow noreferrer" target="_blank">tsconfig.json</a>
</h3>
<blockquote><p><a href="https://tslang.cn/docs/handbook/compiler-options.html" rel="nofollow noreferrer" target="_blank">https://tslang.cn/docs/handbo...</a></p></blockquote>
<p><code>compilerOptions -&gt; target</code> 配置项，表明需要将typescript编译到哪一个js标准<br>可以根据自己的实际需求配置 <code>es5|es6|es7...</code><br>由于我的项目的是nodejs项目<br>当前nodejs 7.10已经原生支持es7,配置为<code>es2017</code><br>如果应用在前端可以改为es5</p>
<h3 id="articleHeader7">四，代码风格规范<a href="https://palantir.github.io/tslint/rules" rel="nofollow noreferrer" target="_blank">tslint.json</a>
</h3>
<blockquote><p><a href="https://palantir.github.io/tslint/rules" rel="nofollow noreferrer" target="_blank">https://palantir.github.io/ts...</a><br>现代化的js项目,一定要有代码风格规范</p></blockquote>
<ul><li><p><code>npm install --save-dev tslint</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;scripts&quot;: {  
        &quot;lint&quot;: &quot;tslint \&quot;src/**/*.ts\&quot; &quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"scripts"</span>: {  
        <span class="hljs-attr">"lint"</span>: <span class="hljs-string">"tslint \"src/**/*.ts\" "</span>
    }
}</code></pre>
<h3 id="articleHeader8">五，安装typescript</h3>
<ol><li>
<p><code>npm install --save-dev typescript</code></p>
<ul>
<li><p>可以在npm run scripts里使用<code>tsc</code>命令将<code>.ts</code>文件编译为<code>.js</code>文件</p></li>
<li><p><code>"tsc": "tsc"</code> 编译<code>.ts</code>文件</p></li>
<li><p><code>"tsc:w": "tsc -w"</code> 监听<code>.ts</code>文件 实时编译</p></li>
<li><p>属于开发时依赖放在<code>devDependencies</code>配置里</p></li>
</ul>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;scripts&quot;: { 
        &quot;tsc&quot;: &quot;npm run clear &amp;&amp; tsc&quot;,
        &quot;tsc:w&quot;: &quot;npm run clear &amp;&amp; tsc -w&quot;, 
        &quot;lint&quot;: &quot;tslint \&quot;src/**/*.ts\&quot; &quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"scripts"</span>: { 
        <span class="hljs-attr">"tsc"</span>: <span class="hljs-string">"npm run clear &amp;&amp; tsc"</span>,
        <span class="hljs-attr">"tsc:w"</span>: <span class="hljs-string">"npm run clear &amp;&amp; tsc -w"</span>, 
        <span class="hljs-attr">"lint"</span>: <span class="hljs-string">"tslint \"src/**/*.ts\" "</span>
    }
}</code></pre>
<ol><li><p><code>npm install --save tslib</code> 从外部引入额外的辅助方法集</p></li></ol>
<ul>
<li><p>会在编译后的<code>.js</code>文件里自动<code>require('tslib')</code></p></li>
<li><p>编译后的代码更美观,不用在每个编译后的<code>.js</code>文件都生成辅助方法</p></li>
<li><p>减少前端场景中打包体积</p></li>
<li><p>属于运行时依赖,无须主动引用,必须放在<code>dependencies</code>配置里</p></li>
<li><p>需要配置<code>tsconfig.js -&gt; compilerOptions -&gt; importHelpers:true</code></p></li>
</ul>
<h4>六，安装 typescript 类型定义(@types/[package])</h4>
<ul>
<li><p>npm install --save-dev @types/node (nodejs环境)</p></li>
<li><p>其它比如<code>lodash,react,vue,koa,jquery</code>都已经有了相关的类型定义库</p></li>
<li><p>配置类型定义库,需要将<code>tsconfig.json-&gt;compilerOptions-&gt;types</code>添加对应的库名</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
    &quot;compilerOptions&quot;: {
        &quot;strictNullChecks&quot;: true,
        &quot;moduleResolution&quot;: &quot;node&quot;,
        &quot;allowSyntheticDefaultImports&quot;: true,
        &quot;experimentalDecorators&quot;: true, 
        &quot;target&quot;: &quot;es6&quot;,
        &quot;lib&quot;: [
        &quot;dom&quot;, //如果是前端环境需要添加此配置
        &quot;es7&quot; //适配es7的语法
        ],
        &quot;types&quot;: [&quot;lodash&quot;]
    },
    &quot;exclude&quot;: [&quot;node_modules&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>    {
    <span class="hljs-attr">"compilerOptions"</span>: {
        <span class="hljs-attr">"strictNullChecks"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"moduleResolution"</span>: <span class="hljs-string">"node"</span>,
        <span class="hljs-attr">"allowSyntheticDefaultImports"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>, 
        <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es6"</span>,
        <span class="hljs-attr">"lib"</span>: [
        <span class="hljs-string">"dom"</span>, //如果是前端环境需要添加此配置
        <span class="hljs-string">"es7"</span> //适配es7的语法
        ],
        <span class="hljs-attr">"types"</span>: [<span class="hljs-string">"lodash"</span>]
    },
    <span class="hljs-attr">"exclude"</span>: [<span class="hljs-string">"node_modules"</span>]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="5. 接下来你就可以在开发工具里看到对应的智能提示了,`lodash`:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">5</span>. 接下来你就可以在开发工具里看到对应的智能提示了,`lodash`:</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009630938?w=612&amp;h=353" src="https://static.alili.tech/img/remote/1460000009630938?w=612&amp;h=353" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">七，修改 <code>import</code> 语法</h3>
<blockquote><p>现在引用模块推荐的写法是 <code>import</code> 语法</p></blockquote>
<ul>
<li><p>nodejs 原生或者 webpack 默认环境并不支持</p></li>
<li><p>通常我们使用<code>babel</code>来实现 <code>import</code> 语法支持</p></li>
<li><p><code>typescript</code>支持更为标准的 <code>import</code> 语法</p></li>
<li><p>普通export写法</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a.ts
module.export = { a: 1, b: 2 }
//a2.ts
export let data = { x: 1, y: 2 }
//b.ts
//这种写法一般用于引用node_modules上安装的其他库
import * as aData from './a'
import { data } from './a2'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//a.ts</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">export</span> = { a: <span class="hljs-number">1</span>, b: <span class="hljs-number">2</span> }
<span class="hljs-comment">//a2.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> data = { x: <span class="hljs-number">1</span>, y: <span class="hljs-number">2</span> }
<span class="hljs-comment">//b.ts</span>
<span class="hljs-comment">//这种写法一般用于引用node_modules上安装的其他库</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> aData <span class="hljs-keyword">from</span> <span class="hljs-string">'./a'</span>
<span class="hljs-keyword">import</span> { data } <span class="hljs-keyword">from</span> <span class="hljs-string">'./a2'</span></code></pre>
<ul><li><p>默认export写法</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//x.ts
export default { a: 1, b: 2 }
//y.ts
import data from './x'
//>这种写法用于引入我们使用export default定义的默认导出" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//x.ts</span>
export <span class="hljs-keyword">default</span> { <span class="hljs-string">a:</span> <span class="hljs-number">1</span>, <span class="hljs-string">b:</span> <span class="hljs-number">2</span> }
<span class="hljs-comment">//y.ts</span>
<span class="hljs-keyword">import</span> data from <span class="hljs-string">'./x'</span>
<span class="hljs-comment">//&gt;这种写法用于引入我们使用export default定义的默认导出</span></code></pre>
<ul><li><p>混合写法</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//x.ts
export let data = { a: 1, b: 2 }
export default { c: 3 }
//y.ts
import other, { data } from './x' 
console.log(data) // { a : 1 , b : 2 }
console.log(other) // { c : 3 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//x.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> data = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> }
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> { <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> }
<span class="hljs-comment">//y.ts</span>
<span class="hljs-keyword">import</span> other, { data } <span class="hljs-keyword">from</span> <span class="hljs-string">'./x'</span> 
<span class="hljs-built_in">console</span>.log(data) <span class="hljs-comment">// { a : 1 , b : 2 }</span>
<span class="hljs-built_in">console</span>.log(other) <span class="hljs-comment">// { c : 3 }</span></code></pre>
<ul><li><p>别名</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//m.ts
export let data = { o: 1, p: 2 }
export default { u: 3 }
//n.ts
import data, { data as data2 } from './m'
console.log(data)//{ u : 3 }
console.log(data2)//{ o : 1 , p : 2 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//m.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> data = { <span class="hljs-attr">o</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">p</span>: <span class="hljs-number">2</span> }
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> { <span class="hljs-attr">u</span>: <span class="hljs-number">3</span> }
<span class="hljs-comment">//n.ts</span>
<span class="hljs-keyword">import</span> data, { data <span class="hljs-keyword">as</span> data2 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./m'</span>
<span class="hljs-built_in">console</span>.log(data)<span class="hljs-comment">//{ u : 3 }</span>
<span class="hljs-built_in">console</span>.log(data2)<span class="hljs-comment">//{ o : 1 , p : 2 }</span></code></pre>
<ul><li><p>修改项目中的引库语法由<code>require('libName')</code>改为<code>import * as libName from 'lib'</code></p></li></ul>
<h3 id="articleHeader10">八，为项目中的全局变量创建自定义类型定义文件<code>globals.d.ts</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //globals.d.ts
//应用程序工具库
declare var appUtils: any 
//指向 src/common 的绝对路径
declare var COMMON_PATH: string
//node程序的运行环境状态 development | test | production
declare var NODE_ENV: string

//shims.d.ts 第三方插件变量全局定义 
import * as lodash from 'lodash'
declare global {
    /**
     * lodash
     */
    const _: typeof lodash
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"> <span class="hljs-comment">//globals.d.ts</span>
<span class="hljs-comment">//应用程序工具库</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">var</span> appUtils: <span class="hljs-built_in">any</span> 
<span class="hljs-comment">//指向 src/common 的绝对路径</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">var</span> COMMON_PATH: <span class="hljs-built_in">string</span>
<span class="hljs-comment">//node程序的运行环境状态 development | test | production</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">var</span> NODE_ENV: <span class="hljs-built_in">string</span>

<span class="hljs-comment">//shims.d.ts 第三方插件变量全局定义 </span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> lodash <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>
<span class="hljs-keyword">declare</span> global {
    <span class="hljs-comment">/**
     * lodash
     */</span>
    <span class="hljs-keyword">const</span> _: <span class="hljs-keyword">typeof</span> lodash
}</code></pre>
<h3 id="articleHeader11">八，这时候我们的新项目再排除一些小问题就能跑起来了</h3>
<ol>
<li><p>迁徙到typescript并没有想象的那么复杂</p></li>
<li>
<p>除了个别注意点，比如</p>
<ul>
<li><p>新的import语法 <a href="http://www.tuicool.com/articles/MZNJ3uQ" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p></li>
<li><p>class语法与es6略有不同 <a href="http://www.cnblogs.com/whitewolf/p/4107970.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/whitew...</a></p></li>
<li><p>全局变量需要定义globals.d.ts <a href="http://www.cnblogs.com/ys-ys/archive/2016/03/24/5314693.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/ys-ys/...</a></p></li>
<li><p>个别变量提示类型错误，需要将它定义为any:</p></li>
</ul>
</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//会提示错误
let x=1
x=&quot;aaa&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-comment">//会提示错误</span>
<span class="hljs-keyword">let</span> x=<span class="hljs-number">1</span>
x=<span class="hljs-string">"aaa"</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009630939?w=511&amp;h=116" src="https://static.alili.tech/img/remote/1460000009630939?w=511&amp;h=116" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改成这样  
let x:any=1
x=&quot;aaa&quot; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//修改成这样  </span>
<span class="hljs-keyword">let</span> x:<span class="hljs-built_in">any</span>=<span class="hljs-number">1</span>
x=<span class="hljs-string">"aaa"</span> </code></pre>
<hr>
<h2 id="articleHeader12">总结</h2>
<h3 id="articleHeader13">使用感受</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*  typescript的配置比babel简单多了,只有一两个库依赖,却让我们直接可以写上最新的ECMA语法及功能
*  可选择性的编译生成ES5以及其它更高ES版本,完全不用担心实际运行问题
*  强化的语法提示,让我们根本不用在源码与API文档反复对比,写着盲人摸象搬的代码
*  很多以前容易发生的错误,现在在编译阶段就可以暴露出来,大大提高了项目的稳定性
*  typescript语法学习成本比想象的低的多,能理解ES6的基本半天就能玩的溜    

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-bullet">*  </span>typescript的配置比babel简单多了,只有一两个库依赖,却让我们直接可以写上最新的ECMA语法及功能
<span class="hljs-bullet">*  </span>可选择性的编译生成ES5以及其它更高ES版本,完全不用担心实际运行问题
<span class="hljs-bullet">*  </span>强化的语法提示,让我们根本不用在源码与API文档反复对比,写着盲人摸象搬的代码
<span class="hljs-bullet">*  </span>很多以前容易发生的错误,现在在编译阶段就可以暴露出来,大大提高了项目的稳定性
<span class="hljs-bullet">*  </span>typescript语法学习成本比想象的低的多,能理解ES6的基本半天就能玩的溜    

</code></pre>
<h3 id="articleHeader14">什么项目场景适合使用typescript?</h3>
<ol>
<li>
<p>正在使用babel编译的项目</p>
<ul><li><p>无论是配置友好度,编译效率,语法兼容,都完全找不到理由选择babel</p></li></ul>
</li>
<li>
<p>特别适合nodejs项目</p>
<ul><li><p>完全兼容ES5,6...N版的代码,低成本迁徙,静态类型检测,接口interface定义,大大增强了代码健壮性</p></li></ul>
</li>
<li>
<p>所有的大型JS项目</p>
<ul>
<li><p>typescript是由 Anders Hejlsberg 大神(C#之父)开发,编译效率惊人</p></li>
<li><p>越大的项目,产生的作用越明显,完成迁徙之后,你基本可以立即找到埋的很深的坑</p></li>
<li><p>为js而生的开发工具 <strong>vscode</strong> ,微软出品的IDE,你懂的,觉得项目大了太卡,你可以试试</p></li>
</ul>
</li>
<li>
<p>前端项目:react,vue,angular2</p>
<ul>
<li><p>国内很火的<a href="https://github.com/ant-design/ant-design" rel="nofollow noreferrer" target="_blank">react antd</a>源码使用typescript编写</p></li>
<li><p><a href="http://angular.cn" rel="nofollow noreferrer" target="_blank">angular2</a>的默认开发语言</p></li>
<li><p><a href="https://github.com/Microsoft/TypeScript-Vue-Starter" rel="nofollow noreferrer" target="_blank">typescript相关vue项目</a>在github上也层出不穷</p></li>
</ul>
</li>
<li>
<p>html5游戏项目</p>
<ul><li><p>typescript是热门的egret(白鹭)引擎唯一开发语言，<a href="http://bbs.egret.com/thread-28769-1-1.html" rel="nofollow noreferrer" target="_blank">egret5.0.0</a> 6月1号发布！</p></li></ul>
</li>
</ol>
<blockquote><p>附上本人用typescript搭建的koa2种子项目<a href="https://github.com/githbq/hbq-koa2-base.git" rel="nofollow noreferrer" target="_blank">https://github.com/githbq/hbq...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js进化，迁徙到typescript

## 原文链接
[https://segmentfault.com/a/1190000009630935](https://segmentfault.com/a/1190000009630935)

