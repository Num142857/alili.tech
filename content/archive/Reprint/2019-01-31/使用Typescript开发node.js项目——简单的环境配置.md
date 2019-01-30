---
title: '使用Typescript开发node.js项目——简单的环境配置' 
date: 2019-01-31 2:31:16
hidden: true
slug: p61o2l4m6b
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近在学习<code>typescript</code>的过程中，想到也许可以使用ts来开发node.js项目。在网上搜了一下，其实已经有很多开发者实践了这方面的内容。这里，我记录一下自己搭建开发环境的简单过程。</p></blockquote>
<h2 id="articleHeader0">使用Typescript开发的好处:</h2>
<ul>
<li><p>较严格的类型检查和语法检查。</p></li>
<li><p>对<code>ES6</code>/<code>ES2015</code>/<code>ES7(部分)</code>支持比较好。</p></li>
<li><p>编译后的js文件很干净，也支持多种代码规范。</p></li>
<li><p>其他，请参见文档。</p></li>
</ul>
<h2 id="articleHeader1">准备</h2>
<ul>
<li><p><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node.js v6.9.1</a> 或者任意的新版本，老版本暂时没有试验。</p></li>
<li><p><code>tsc</code> typescript编译器，使用npm安装:<code>npm install -g typescript</code>,当前是<code>v2.0.10</code></p></li>
<li><p>编辑器：<code>vscode</code></p></li>
<li><p>命令行终端:windows的cmd</p></li>
</ul>
<p>特别提示和吐槽：安装<code>tsc</code>可能需要翻墙（如果特别慢的话），所以也可以使用淘宝镜像。</p>
<h2 id="articleHeader2">建立node.js项目</h2>
<p>使用<code>npm init</code>在指定的目录中建好项目的目录。</p>
<p>在这里我建立了一个自己的项目目录结构:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="testTS
|---build                 //编译后的js文件目录
|---src                   //ts文件目录
|---static                //客户端静态文件
|  |---scripts
|  |     |---main.js
|  |----styles
|  |     |---style.css
|  |----assets
|---views                 //html文件目录
|    |---index.html
|---package.json
|---tsconfig.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>testTS
|<span class="hljs-string">---build                 //编译后的js文件目录
</span>|<span class="hljs-string">---src                   //ts文件目录
</span>|<span class="hljs-string">---static                //客户端静态文件
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">---scripts
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">     </span>|<span class="hljs-string">---main.js
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">----styles
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">     </span>|<span class="hljs-string">---style.css
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">----assets
</span>|<span class="hljs-string">---views                 //html文件目录
</span>|<span class="hljs-string">    </span>|<span class="hljs-string">---index.html
</span>|<span class="hljs-string">---package.json
</span>|<span class="hljs-string">---tsconfig.json</span></code></pre>
<h2 id="articleHeader3">编辑 <code>tsconfig.json</code>
</h2>
<p>在上面的目录结构中有一个<code>tsconfig.json</code>文件，用来设置ts的编译选项。<br>想要获取这份文件，可以在项目根目录下使用<code>tsc --init</code>，就会自动建立好一份<code>.tsconfig.json</code>。</p>
<h3 id="articleHeader4">编写需要的配置项</h3>
<p>默认情况下，<code>tsc</code>会使用默认的编译配置编译目录中的所有<code>.ts</code>文件。通过书写<code>tsconfig.json</code>，我们可以配置<code>tsc</code>的编译行为，达到想要的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;compilerOptions&quot;: {
        &quot;module&quot;: &quot;commonjs&quot;,   //指定生成哪个模块系统代码
        &quot;target&quot;: &quot;es6&quot;,        //目标代码类型
        &quot;noImplicitAny&quot;: false, //在表达式和声明上有隐含的'any'类型时报错。
        &quot;sourceMap&quot;: false,     //用于debug   
        &quot;rootDir&quot;:&quot;./src&quot;,      //仅用来控制输出的目录结构--outDir。
        &quot;outDir&quot;:&quot;./build&quot;,     //重定向输出目录。   
        &quot;watch&quot;:true            //在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。
    },
    &quot;include&quot;:[
        &quot;./src/**/*&quot;
    ],
    &quot;exclude&quot;:[
        &quot;views&quot;,
        &quot;static&quot;
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"compilerOptions"</span>: {
        <span class="hljs-attr">"module"</span>: <span class="hljs-string">"commonjs"</span>,   //指定生成哪个模块系统代码
        <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es6"</span>,        //目标代码类型
        <span class="hljs-attr">"noImplicitAny"</span>: <span class="hljs-literal">false</span>, //在表达式和声明上有隐含的'any'类型时报错。
        <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">false</span>,     //用于debug   
        <span class="hljs-attr">"rootDir"</span>:<span class="hljs-string">"./src"</span>,      //仅用来控制输出的目录结构--outDir。
        <span class="hljs-attr">"outDir"</span>:<span class="hljs-string">"./build"</span>,     //重定向输出目录。   
        <span class="hljs-attr">"watch"</span>:<span class="hljs-literal">true</span>            //在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。
    },
    <span class="hljs-attr">"include"</span>:[
        <span class="hljs-string">"./src/**/*"</span>
    ],
    <span class="hljs-attr">"exclude"</span>:[
        <span class="hljs-string">"views"</span>,
        <span class="hljs-string">"static"</span>
    ]
}</code></pre>
<h3 id="articleHeader5">配置文件注意点</h3>
<p><code>"compilerOptions"</code>是编译选项，具体详情，请参见：</p>
<ul>
<li><p><a href="https://github.com/zhongsp/TypeScript/blob/master/doc/handbook/Compiler%20Options.md" rel="nofollow noreferrer" target="_blank">中文文档</a></p></li>
<li><p><a href="http://www.typescriptlang.org/docs/handbook/compiler-options.html" rel="nofollow noreferrer" target="_blank">英文文档</a></p></li>
</ul>
<p><code>"module"</code>是用来指定设置编译后的js代码，使用何种模块规范。由于是开发node.js项目，所以选择<code>commonjs</code>。(有兴趣的话，可以把所有<code>module</code>所有可能的值都试一遍，查看编译后的js文件的差别，会发现生成的代码还是很不错的，很干净。)</p>
<p><code>"target"</code>是编译后的js代码遵循何种规范，可以是<code>es3</code>/<code>es5</code>/<code>es6</code>等等，这里为了对比<code>ts 2.0</code>代码和<code>es6</code>代码的不同，使用了<code>"es6"</code>。</p>
<p><code>"rootDir"</code>是一个需要注意的地方，它会告诉编译器，此目录下的文件需要经过编译。那么，如果设置了这个选项，又在外部（比如根目录）放置了<code>.ts</code>文件，会怎么样呢？<code>tsc</code>会提示一条类似这样的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;error TS6059: File 'D:/workplace/nodeWP/testTS/index.ts' is not under 'rootDir' 'D:/workplace/nodeWP/testTS/src'. 'rootDir' is expected to contain all source files.&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs csp"><code style="word-break: break-word; white-space: initial;">"error TS6059: File <span class="hljs-string">'D:/workplace/nodeWP/testTS/index.ts'</span> is not under <span class="hljs-string">'rootDir'</span> <span class="hljs-string">'D:/workplace/nodeWP/testTS/src'</span>. <span class="hljs-string">'rootDir'</span> is expected to contain all source files."</code></pre>
<p>并且，在build的目录中，输出的目录结构也会变化:</p>
<p><span class="img-wrap"><img data-src="/img/bVFVTY?w=224&amp;h=97" src="https://static.alili.tech/img/bVFVTY?w=224&amp;h=97" alt="build的目录结构变化" title="build的目录结构变化" style="cursor: pointer;"></span></p>
<p>这显然不是我们想要的结果。</p>
<p>解决方案是使用<code>include</code>和<code>exclude</code>属性。按照文档说明，"include" 和 "exclude" 属性指定一个文件glob匹配模式列表。表明需要包含的文件目录或文件，以及需要过滤掉的文件或目录（也可以使用<code>"files"</code>配置项，不过需要一个一个文件录入,"files" 属性明确指定的文件却总是会被包含在内，不管 "exclude" 如何设置。），详见官方文档说明。</p>
<p>所以，添加<code>"./src/**/*"</code>到<code>"include"</code>所指向的数组，就可以指定<code>./src</code>下的所有文件，是我们真正需要被编译的，其他目录将会被排除。</p>
<p><code>"outDir"</code> 指向了编译后的js代码输出的地方。在文档中也有<code>"outFile"</code>选项，可以把所有的ts文件按照一定顺序规则打包成一个文件，具体可以参考文档。在这里，我们优先使用<code>outDir</code>。</p>
<h2 id="articleHeader6">试验一下</h2>
<p>在书写完2个配置文件之后，就可以开始撰写代码，并执行编译了。我们试验一下：<br>在<code>./src/server.ts</code>中,写一段简单的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ICache{
    useCache:boolean;
    [propName:string]:any;
}
const cache:ICache = {useCache:true};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> ICache{
    useCache:<span class="hljs-built_in">boolean</span>;
    [propName:<span class="hljs-built_in">string</span>]:<span class="hljs-built_in">any</span>;
}
<span class="hljs-keyword">const</span> cache:ICache = {useCache:<span class="hljs-literal">true</span>};</code></pre>
<p>之后，在终端中输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\workplace\nodeWP\testTS>tsc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">D:<span class="hljs-symbol">\w</span>orkplace<span class="hljs-symbol">\n</span>odeWP<span class="hljs-symbol">\t</span>estTS&gt;tsc</code></pre>
<p>经过编译，会生成<code>server.js</code>到build目录中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//server.js
const cache = { useCache: true };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//server.js</span>
<span class="hljs-keyword">const</span> cache = { <span class="hljs-attr">useCache</span>: <span class="hljs-literal">true</span> };</code></pre>
<h2 id="articleHeader7">使用<code>.d.ts</code>文件</h2>
<p>既然要开发一个项目，显然不会只有这些代码。肯定要用到内建模块和第三方模块。然而，直接导入模块，在<code>.ts</code>文件中是不行的。例如：<br><span class="img-wrap"><img data-src="/img/bVFV13?w=870&amp;h=157" src="https://static.alili.tech/img/bVFV13?w=870&amp;h=157" alt="直接导入模块，在code.ts/code文件中是不行的" title="直接导入模块，在code.ts/code文件中是不行的" style="cursor: pointer;"></span></p>
<p>这是由于typescript自身的机制，需要一份<code>xx.d.ts</code>声明文件，来说明模块对外公开的方法和属性的类型以及内容。感觉有一些麻烦。好在，官方以及社区已经准备好了方案，来解决这个问题。</p>
<p>在TypeScript 2.0以上的版本，获取类型声明文件只需要使用npm。在项目目录下执行安装:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev @types/node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm install --save-dev @types/<span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<p>就可以获得有关<code>node.js v6.x</code>的API的类型说明文件。之后，就可以顺利的导入需要的模块了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as http from 'http';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> http <span class="hljs-keyword">from</span> <span class="hljs-string">'http'</span>;</code></pre>
<p>完成之后，不仅可以正常的使用<code>http</code>模块中的方法，也可以在vscode中获得相应的代码提示。</p>
<p>对于内建模块，安装一个<code>@types/node</code>模块可以整体解决模块的声明文件问题。那么，对于浩如烟海的第三方模块，该怎么办呢？官方和社区中也提供了查找和安装的渠道：</p>
<ul>
<li><p><a href="https://github.com/typings/typings" rel="nofollow noreferrer" target="_blank">typings</a></p></li>
<li><p><a href="http://definitelytyped.org/" rel="nofollow noreferrer" target="_blank">DefinitelyTyped</a></p></li>
<li><p><a href="http://microsoft.github.io/TypeSearch/" rel="nofollow noreferrer" target="_blank">TypeSearch</a></p></li>
</ul>
<h2 id="articleHeader8">自动编译和自动重启服务</h2>
<p>解决完了声明文件之后，其实我们已经可以使用ts简单的进行node.js项目的开发了。但是，每次写完或者修改代码，就要编译，然后再启动，是一件不大但是相当让人烦躁的事情。为了效率，我们应当改善它。</p>
<p>首先，要让<code>.ts</code>文件可以自动被编译。这在上文中的<code>tsconfig.json</code>文件中，已经被设置好了，就是<code>"watch":true </code>。此时在命令行执行<code>tsc</code>命令后，编译器就会时时监控目录中<code>.ts</code>文件的变化，然后自动编译。</p>
<p>自动重启node服务器，我们可以使用 <a href="https://www.npmjs.com/package/supervisor" rel="nofollow noreferrer" target="_blank">supervisor</a> 模块解决，或者任何具有类似功能的解决方案都可以。</p>
<p>全局安装supervisor模块<code>npm install -g supervisor</code>，之后就可以在终端中使用<code>supervior ./build/server.js</code>启动服务器，并在服务器端代码改变之后，自动重启服务器。</p>
<h2 id="articleHeader9">让启动服务更简单</h2>
<p>由于以上的2个命令，在启动时都可能需要附加一些参数，每次输入很麻烦。</p>
<p>可以使用<code>npm script</code>来解决。在<code>package.json</code>文件中的<code>"scripts"</code>中，我们设置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;scripts&quot;:{
        &quot;dev&quot;: &quot;supervisor -w build ./build/server.js&quot;,
        &quot;build&quot;: &quot;tsc&quot;,
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"scripts"</span>:{
        <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"supervisor -w build ./build/server.js"</span>,
        <span class="hljs-attr">"build"</span>: <span class="hljs-string">"tsc"</span>,
    }
}</code></pre>
<p>执行<code>npm run dev</code>之后，如果<code>./build</code>目录中的<code>.js</code>文件发生改变时，就会重启服务器。</p>
<p>执行<code>npm run build</code>时，则只会编译ts文件并监控ts的改变。</p>
<h2 id="articleHeader10">使用例子来试验一下</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as http from 'http';
//====================
const server = http.createServer(function(request:http.IncomingMessage,response:http.ServerResponse):void{
    console.log(&quot;create a server...&quot;);
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write('Hello world,we use typescript to develop.');
    response.end();
});

server.listen(3000,function(){
    console.log(&quot;Server listening on port 3000&quot;);
    console.log(&quot;test...&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> http <span class="hljs-keyword">from</span> <span class="hljs-string">'http'</span>;
<span class="hljs-comment">//====================</span>
<span class="hljs-keyword">const</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request:http.IncomingMessage,response:http.ServerResponse</span>):<span class="hljs-title">void</span></span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"create a server..."</span>);
    response.writeHead(<span class="hljs-number">200</span>,{<span class="hljs-string">'Content-Type'</span>:<span class="hljs-string">'text/plain'</span>});
    response.write(<span class="hljs-string">'Hello world,we use typescript to develop.'</span>);
    response.end();
});

server.listen(<span class="hljs-number">3000</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Server listening on port 3000"</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"test..."</span>);
});</code></pre>
<h2 id="articleHeader11">补充：一个命令实现tsc编译和重启服务器</h2>
<p>2017.5.3更新:</p>
<p>感谢大家对本文的支持。有朋友(@Ajaxyz)提出，有没有办法将ts编译监视和重启服务器合并为一个命令？</p>
<p>这里提出一个比较简易的方法，使用<code>gulp</code>来管理这2个流程。（如何使用gulp工作，请参考<a href="https://github.com/gulpjs/gulp/blob/master/docs/API.md" rel="nofollow noreferrer" target="_blank">Gulp API</a>）</p>
<h3 id="articleHeader12">1. 使用<code>gulp</code>的<code>watch()</code>来监控<code>ts</code>文件的变化并重启服务器。</h3>
<p>这种方式，需要使用<code>gulp</code>和<code>gulp-typescript</code>插件（<a href="https://www.npmjs.com/package/gulp-typescript" rel="nofollow noreferrer" target="_blank">安装</a>）</p>
<p>注意的一点是:<code>gulp-typescript</code>可能需要在项目的目录安装<code>typescript</code>，所以可以在项目的目录中，运行命令行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install typescript" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> typescript</code></pre>
<p>准备好<code>gulp</code>和插件之后，需要书写一份<code>gulpfile.js</code>作为<code>gulp</code>项目需要执行的任务文件，例子如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //gulpfile.js
    
    let gulp = require('gulp');
    let ts = require('gulp-typescript');
    let tsp = ts.createProject('tsconfig.json'); //使用tsconfig.json文件配置tsc
    let exec = require('child_process').exec;
    
    let child;
    //目录常量
    const PATHS = {
        scripts:['./src/**/*.ts'],
        output:'./build',
    };
    //编译ts文件
    gulp.task('build-ts',['restart'],function(){
        return gulp.src(PATHS.scripts)
            .pipe(tsp())
            .pipe(gulp.dest(PATHS.output));    
    });
    //监视ts文件变化
    gulp.task('watch-ts',['build-ts'],function(){    
        gulp.watch(PATHS.scripts,['build-ts']);
    });
    //自动重启服务器
    gulp.task('restart',function(){
        child = exec('supervisor -w build ./build/server.js',(error,stdout,stderr)=>{
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    });
    //开发任务
    gulp.task('dev',['build-ts','restart','watch-ts']);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">//gulpfile.js</span>
    
    <span class="hljs-keyword">let</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);
    <span class="hljs-keyword">let</span> ts = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-typescript'</span>);
    <span class="hljs-keyword">let</span> tsp = ts.createProject(<span class="hljs-string">'tsconfig.json'</span>); <span class="hljs-comment">//使用tsconfig.json文件配置tsc</span>
    <span class="hljs-keyword">let</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).exec;
    
    <span class="hljs-keyword">let</span> child;
    <span class="hljs-comment">//目录常量</span>
    <span class="hljs-keyword">const</span> PATHS = {
        <span class="hljs-attr">scripts</span>:[<span class="hljs-string">'./src/**/*.ts'</span>],
        <span class="hljs-attr">output</span>:<span class="hljs-string">'./build'</span>,
    };
    <span class="hljs-comment">//编译ts文件</span>
    gulp.task(<span class="hljs-string">'build-ts'</span>,[<span class="hljs-string">'restart'</span>],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> gulp.src(PATHS.scripts)
            .pipe(tsp())
            .pipe(gulp.dest(PATHS.output));    
    });
    <span class="hljs-comment">//监视ts文件变化</span>
    gulp.task(<span class="hljs-string">'watch-ts'</span>,[<span class="hljs-string">'build-ts'</span>],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    
        gulp.watch(PATHS.scripts,[<span class="hljs-string">'build-ts'</span>]);
    });
    <span class="hljs-comment">//自动重启服务器</span>
    gulp.task(<span class="hljs-string">'restart'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        child = exec(<span class="hljs-string">'supervisor -w build ./build/server.js'</span>,(error,stdout,stderr)=&gt;{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`stdout: <span class="hljs-subst">${stdout}</span>`</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`stderr: <span class="hljs-subst">${stderr}</span>`</span>);
            <span class="hljs-keyword">if</span> (error !== <span class="hljs-literal">null</span>) {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`exec error: <span class="hljs-subst">${error}</span>`</span>);
            }
        });
    });
    <span class="hljs-comment">//开发任务</span>
    gulp.task(<span class="hljs-string">'dev'</span>,[<span class="hljs-string">'build-ts'</span>,<span class="hljs-string">'restart'</span>,<span class="hljs-string">'watch-ts'</span>]);
</code></pre>
<p>这样，在开发时，直接在项目目录运行<code>gulp dev</code>，就可以启动编译和服务器了。此后，<code>gulp</code>会监视<code>ts</code>文件的改动，然后编译<code>ts</code>文件并重启服务器。刷新页面，就可以看到新结果已经输出在浏览器页面中了。</p>
<p>还有一点需要留意的是,由于<code>gulp</code>负责监视<code>ts</code>文件的变化，因此请在<code>tsconfig.json</code>将<code>"watch"</code>设置为<code>false</code>或者删掉这个属性。</p>
<h3 id="articleHeader13">2. 使用<code>tsconfig.json</code>监控<code>ts</code>文件变化并重启服务器</h3>
<p>用这种方式，首先打开<code>tsconfig.json</code>对<code>ts</code>文件的监视，然后修改<code>gulpfile.js</code>文件，如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    //...requier部分同上面例子，这里省略
    
    let tsChild,        //监视ts文件修改子进程
        serverChild;    //重启服务器子进程
    //编译ts文件
    gulp.task('build-ts',function(){
         tsChild = exec('tsc',(error,stdout,stderr)=>{
            console.log(`tsc====>stdout: ${stdout}`);
            console.log(`tsc====>stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    });
    //自动重启服务器
    gulp.task('restart',function(){
        serverChild = exec('supervisor -w build ./build/server.js',(error,stdout,stderr)=>{
            console.log(`restart=====>stdout: ${stdout}`);
            console.log(`restart=====>stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    });
    //开发任务
    gulp.task('dev2',['build-ts','restart']);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
    <span class="hljs-comment">//...requier部分同上面例子，这里省略</span>
    
    <span class="hljs-keyword">let</span> tsChild,        <span class="hljs-comment">//监视ts文件修改子进程</span>
        serverChild;    <span class="hljs-comment">//重启服务器子进程</span>
    <span class="hljs-comment">//编译ts文件</span>
    gulp.task(<span class="hljs-string">'build-ts'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         tsChild = exec(<span class="hljs-string">'tsc'</span>,(error,stdout,stderr)=&gt;{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`tsc====&gt;stdout: <span class="hljs-subst">${stdout}</span>`</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`tsc====&gt;stderr: <span class="hljs-subst">${stderr}</span>`</span>);
            <span class="hljs-keyword">if</span> (error !== <span class="hljs-literal">null</span>) {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`exec error: <span class="hljs-subst">${error}</span>`</span>);
            }
        });
    });
    <span class="hljs-comment">//自动重启服务器</span>
    gulp.task(<span class="hljs-string">'restart'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        serverChild = exec(<span class="hljs-string">'supervisor -w build ./build/server.js'</span>,(error,stdout,stderr)=&gt;{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`restart=====&gt;stdout: <span class="hljs-subst">${stdout}</span>`</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`restart=====&gt;stderr: <span class="hljs-subst">${stderr}</span>`</span>);
            <span class="hljs-keyword">if</span> (error !== <span class="hljs-literal">null</span>) {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`exec error: <span class="hljs-subst">${error}</span>`</span>);
            }
        });
    });
    <span class="hljs-comment">//开发任务</span>
    gulp.task(<span class="hljs-string">'dev2'</span>,[<span class="hljs-string">'build-ts'</span>,<span class="hljs-string">'restart'</span>]);
</code></pre>
<p>运行<code>gulp dev2</code>，效果和上一个例子一样。</p>
<hr>
<p>以上，提供一种解决办法的方式和思路，仅供参考，如果用在实际环境中，还需要进一步完善功能。</p>
<h2 id="articleHeader14">结语</h2>
<p>本文只是对搭建typescript开发node.js项目的环境做一个简单研究和记录。</p>
<p>最初这样想，也只是好奇可不可以这么做。实际上在node.js稳定版本<code>v6.9.1</code>中已经支持了90%的<code>ES6</code>。因此，直接使用ES6开发node.js项目，是很好的选择。</p>
<p>不完善的地方，请见谅，后面会慢慢补充。</p>
<h2 id="articleHeader15">参考资料</h2>
<p><a href="https://github.com/zhongsp/TypeScript" rel="nofollow noreferrer" target="_blank">Typescript中文手册</a><br><a href="http://gulpjs.com/" rel="nofollow noreferrer" target="_blank">Gulp</a><br><a href="https://www.npmjs.com/package/gulp-typescript" rel="nofollow noreferrer" target="_blank">gulp-typescript</a><br><a href="http://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#gulp" rel="nofollow noreferrer" target="_blank">简单使用gulp-typescript</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Typescript开发node.js项目——简单的环境配置

## 原文链接
[https://segmentfault.com/a/1190000007574276](https://segmentfault.com/a/1190000007574276)

