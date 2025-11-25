---
title: '如何使用TypeScript和Webpack编写网页应用' 
date: 2019-02-10 2:30:42
hidden: true
slug: f5r6lj4bdbh
categories: [reprint]
---

{{< raw >}}

                    
<p>TypeScript所做的，是在JavaScript的基础上加入了类型，TypeScript编译器将TypeScript编译成JavaScript，可以在浏览器或者nodejs平台上运行。最新版本的TypeScript语法根ES6标准已经十分接近，而且因为是JS的超集，TS代码中夹杂普通JS代码也是可以的。所以，如果你也考虑开始使用Bable＋ES6，不妨也看一下TypeScript。</p>
<h2 id="articleHeader0">TypeScript项目和tsconfig.json</h2>
<p>首先安装TypeScript编译器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g typescript
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -g typescript
</code></pre>
<p>进入项目目录，新建一个<code>hello.ts</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello(name: string) {
    return 'Hello, ' + name;
}

let myName = 'Cheng Wang';

console.log(sayHello(myName));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params">name: string</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Hello, '</span> + name;
}

<span class="hljs-keyword">let</span> myName = <span class="hljs-string">'Cheng Wang'</span>;

<span class="hljs-built_in">console</span>.log(sayHello(myName));
</code></pre>
<p>然后执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tsc hello.ts
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>tsc hello<span class="hljs-selector-class">.ts</span>
</code></pre>
<p>编译器会生成 hello.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sayHello(name) {
    return 'Hello, ' + name;
}
var myName = 'Cheng Wang';
console.log(sayHello(myName));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Hello, '</span> + name;
}
<span class="hljs-keyword">var</span> myName = <span class="hljs-string">'Cheng Wang'</span>;
<span class="hljs-built_in">console</span>.log(sayHello(myName));
</code></pre>
<p>为了方便编译器和编辑器识别TypeScript项目，TypeScript约定了tsconfig.json文件来存储项目配置，如果运行<code>tsc</code>时不指定输入文件，编译器则会查找项目目录中的这个文件，如果找不到则会依次向父级目录查找。比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;compilerOptions&quot;: {
        &quot;outFile&quot;: &quot;dist/app.js&quot;,
        &quot;sourceMap&quot;: true
    },
    &quot;files&quot;: [
        &quot;src/app.ts&quot;
    ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"compilerOptions"</span>: {
        <span class="hljs-attr">"outFile"</span>: <span class="hljs-string">"dist/app.js"</span>,
        <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">"files"</span>: [
        <span class="hljs-string">"src/app.ts"</span>
    ]
}
</code></pre>
<p>直接运行<code>tsc</code>，会自动把<code>src/app.ts</code>编译到<code>dist/app.js</code>。</p>
<p>关于这个配置文件的更多选项，可以看<a href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<h2 id="articleHeader1">使用模块</h2>
<p>TypeScript中，模块的使用方法与ES6一致。</p>
<p><code>src/modules/utilities.ts</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getUrlParam(key: string) {

  const REG_PATTERN = new RegExp('(^|&amp;)' + key + '=([^&amp;]*)(&amp;|$)', 'i');
  let result: string[] = location.search.substr(1).match(REG_PATTERN);

  if (result !== null) {
    return decodeURIComponent(result[2]);
  } else {
    return null;
  }

}

export { getUrlParam }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUrlParam</span>(<span class="hljs-params">key: <span class="hljs-built_in">string</span></span>) </span>{

  <span class="hljs-keyword">const</span> REG_PATTERN = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'(^|&amp;)'</span> + key + <span class="hljs-string">'=([^&amp;]*)(&amp;|$)'</span>, <span class="hljs-string">'i'</span>);
  <span class="hljs-keyword">let</span> result: <span class="hljs-built_in">string</span>[] = location.search.substr(<span class="hljs-number">1</span>).match(REG_PATTERN);

  <span class="hljs-keyword">if</span> (result !== <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">decodeURIComponent</span>(result[<span class="hljs-number">2</span>]);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

}

<span class="hljs-keyword">export</span> { getUrlParam }
</code></pre>
<p><code>src/app.ts</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { getUrlParam } from './modules/utilities';

let deviceType: string = getUrlParam('deviceType');

console.log(deviceType);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { getUrlParam } <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/utilities'</span>;

<span class="hljs-keyword">let</span> deviceType: <span class="hljs-built_in">string</span> = getUrlParam(<span class="hljs-string">'deviceType'</span>);

<span class="hljs-built_in">console</span>.log(deviceType);

</code></pre>
<p>编译后的app.js（TypeScript编译器在输出单个文件时，只能使用AMD或System模块规范）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(&quot;modules/utilities&quot;, [&quot;require&quot;, &quot;exports&quot;], function (require, exports) {
    &quot;use strict&quot;;
    function getUrlParam(key) {
        var REG_PATTERN = new RegExp('(^|&amp;)' + key + '=([^&amp;]*)(&amp;|$)', 'i');
        var result = location.search.substr(1).match(REG_PATTERN);
        if (result !== null) {
            return decodeURIComponent(result[2]);
        }
        else {
            return null;
        }
    }
    exports.getUrlParam = getUrlParam;
});
define(&quot;app&quot;, [&quot;require&quot;, &quot;exports&quot;, &quot;modules/utilities&quot;], function (require, exports, utilities_1) {
    &quot;use strict&quot;;
    var deviceType = utilities_1.getUrlParam('deviceType');
    console.log(deviceType);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define(<span class="hljs-string">"modules/utilities"</span>, [<span class="hljs-string">"require"</span>, <span class="hljs-string">"exports"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, exports</span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUrlParam</span>(<span class="hljs-params">key</span>) </span>{
        <span class="hljs-keyword">var</span> REG_PATTERN = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'(^|&amp;)'</span> + key + <span class="hljs-string">'=([^&amp;]*)(&amp;|$)'</span>, <span class="hljs-string">'i'</span>);
        <span class="hljs-keyword">var</span> result = location.search.substr(<span class="hljs-number">1</span>).match(REG_PATTERN);
        <span class="hljs-keyword">if</span> (result !== <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">decodeURIComponent</span>(result[<span class="hljs-number">2</span>]);
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }
    }
    exports.getUrlParam = getUrlParam;
});
define(<span class="hljs-string">"app"</span>, [<span class="hljs-string">"require"</span>, <span class="hljs-string">"exports"</span>, <span class="hljs-string">"modules/utilities"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require, exports, utilities_1</span>) </span>{
<span class="hljs-meta">    "use strict"</span>;
    <span class="hljs-keyword">var</span> deviceType = utilities_1.getUrlParam(<span class="hljs-string">'deviceType'</span>);
    <span class="hljs-built_in">console</span>.log(deviceType);
});
</code></pre>
<h2 id="articleHeader2">使用NPM库</h2>
<p>我们开发JS程序的时候，要用到NPM上的第三方的库，比如jQuery、Lodash等，但是绝大多数库都是用JS写的，没有类型提示，我们也不能在在代码中将这些库作为模块引入。</p>
<p>比如我们需要在项目中使用Lodash：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save lodash
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> --save lodash
</code></pre>
<p>然后在代码中引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as _ from 'lodash';

console.log(_.camelCase('helloworld'))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-built_in">console</span>.log(_.camelCase(<span class="hljs-string">'helloworld'</span>))
</code></pre>
<p>运行 <code>tsc</code> 则报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src/app.ts(1,20): error TS2307: Cannot find module 'lodash'.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>src/app.ts(<span class="hljs-number">1</span>,<span class="hljs-number">20</span>): error TS2307: Cannot <span class="hljs-built_in">find</span> <span class="hljs-keyword">module</span> <span class="hljs-string">'lodash'</span>.
</code></pre>
<p>如果想在TypeScript代码中直接使用npm上的JS库，需要借助Typings这个工具。</p>
<p>Typings也是一个包管理器，它管理的是JS代码“定义文件”，用Typings安装相应的定义文件后，编辑器和编译器就可以去node_modules目录中找到相应的JS库，并编译到最终的JS代码中。</p>
<p>先安装Typings工具：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g typings
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -g typings
</code></pre>
<p>然后安装Lodash的定义文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typings install --save lodash
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>typings <span class="hljs-keyword">install</span> <span class="hljs-comment">--save lodash</span>
</code></pre>
<p>Typings会去NPM、Bower上寻找库的作者加的定义文件，但是有的库如jQuery并没有官方的定义文件，则需要从社区维护的<a href="https://github.com/DefinitelyTyped/DefinitelyTyped" rel="nofollow noreferrer" target="_blank">DefinitelyTyped</a>目录下安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typings install --save --ambient jquery
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">typings</span> <span class="hljs-comment">install</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">save</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ambient</span> <span class="hljs-comment">jquery</span>
</code></pre>
<p>然后再tsconfig.json中的files配置中加入一条：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&quot;files&quot;: [
    &quot;src/app.ts&quot;，
    &quot;typings/main.d.ts&quot;
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>
<span class="hljs-string">"files"</span>: [
    <span class="hljs-string">"src/app.ts"</span>，
    <span class="hljs-string">"typings/main.d.ts"</span>
]
</code></pre>
<p>此时编译就不会提示找不到模块了。</p>
<p>安装好定义文件之后，如果使用Visual Studio Code等对TypeScript支持较好的编辑器，则会提供更加强大的代码提示功能。</p>
<h2 id="articleHeader3">使用Webpack构建</h2>
<p>TypeScript编译器支持很多模块组织规范，如ES6、commonJS、AMD等，但是如果想要将多个ts文件打包成一个文件，TypeScript只支持AMD和System，对于浏览器应用来说，还需要引入第三方的模块加载器。如果使用Webpack配合TypeScript的loader，则可以方便地构建浏览器可以运行的JS代码。</p>
<p>首先安装Webpack和ts-loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i webpack -g

npm i ts-loader --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> webpack -g

npm <span class="hljs-selector-tag">i</span> ts-loader --save-dev
</code></pre>
<p>然后配置项目目录中的webpack.config.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {

  entry: './src/app.ts',
  
  output: {
    filename: 'app.js',
    path: './dist'
  },
  
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module.exports = {

  entry: <span class="hljs-string">'./src/app.ts'</span>,
  
  outpu<span class="hljs-variable">t:</span> {
    filename: <span class="hljs-string">'app.js'</span>,
    path: <span class="hljs-string">'./dist'</span>
  },
  
  <span class="hljs-built_in">resolve</span>: {
    extension<span class="hljs-variable">s:</span> [<span class="hljs-string">''</span>, <span class="hljs-string">'.webpack.js'</span>, <span class="hljs-string">'.web.js'</span>, <span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.js'</span>]
  },
  
  module: {
    loader<span class="hljs-variable">s:</span> [
      { tes<span class="hljs-variable">t:</span> /\.<span class="hljs-keyword">ts</span>$/, loader: <span class="hljs-string">'ts-loader'</span> }
    ]
  }
  
}
</code></pre>
<p>然后就可以通过运行<code>webpack</code>来构建了，构建生成的代码自带了webpack的模块加载器，可以直接在浏览器中运行。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用TypeScript和Webpack编写网页应用

## 原文链接
[https://segmentfault.com/a/1190000005118886](https://segmentfault.com/a/1190000005118886)

