---
title: '了解可执行的NPM包' 
date: 2019-03-02 2:30:07
hidden: true
slug: myfwty9876l
categories: [reprint]
---

{{< raw >}}

                    
<p><code>NPM</code>是<code>Node.js</code>的包管理工具，随着<code>Node.js</code>的出现，以及前端开发开始使用<code>gulp</code>、<code>webpack</code>、<code>rollup</code>以及其他各种优秀的编译打包工具（大多数采用<code>Node.js</code>来实现），大家都开始接触到一些<code>Node.js</code>，发现了使用<code>NPM</code>来管理一些第三方模块会很方便。  <br>大家搬砖的模式也是从之前的去插件官网下载<code>XXX.min.js</code>改为了<code>npm install XXX</code>，然后在项目中<code>require</code>或者<code>import</code>。</p>
<p>当然，<code>NPM</code>上边不仅仅存在一些用来打包、引用的第三方模块，还有很多优秀的工具（包括部分打包工具），他们与上边提到的模块的区别在于，使用<code>npm install XXX</code>以后，是可以直接运行的。</p>
<h2 id="articleHeader0">常见的那些包</h2>
<p>可以回想一下，<code>webpack</code>官网中是否有过这样的字样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install webpack -g

> webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; npm install webpack -g

&gt; webpack</code></pre>
<blockquote>当然，现在是不推荐使用全局安装模式的，具体原因会在下边提到</blockquote>
<p>以及非全局的安装使用步骤：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&gt; npm install webpack</code></pre>
<p>然后编辑你的<code>package.json</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
+    &quot;webpack&quot;: &quot;webpack&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">{
  "scripts": {
<span class="hljs-addition">+    "webpack": "webpack"</span>
  }
}</code></pre>
<p>再使用<code>npm run</code>就可以调用了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm run webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&gt; npm run webpack</code></pre>
<blockquote>以上非全局的方案是比较推荐的做法</blockquote>
<p>不过还可以顺带一提的是在<code>NPM 5.x</code>更新的一个新的工具，叫做<code>npx</code>，_并不打算细说它，但它确实是一个很方便的小工具，在<code>webpack</code>官网中也提到了简单的使用方法_  </p>
<p>就像上边所提到的修改<code>package.json</code>，添加<code>scripts</code>然后再执行的方式，可以很简单的使用<code>npx webpack</code>来完成相同的效果，不必再去修改额外的文件。_（当然，<code>npx</code>可以做更多的事情，在这里先认为它是<code>./node_modules/webpack/bin/webpack.js</code>的简写就好了）_  </p>
<p>包括其他常用的一些，像<code>n</code>、<code>create-react-app</code>、<code>vue-cli</code>这些工具，都会直接提供一个命令让你可以进行操作。</p>
<h2 id="articleHeader1">自己造一个简易的工具</h2>
<p>最近面试的时候，有同学的回答让人哭笑不得：  </p>
<p>Q：你们前端开发完成后是怎样打包的呢？  <br>A：<code>npm run build</code>。  </p>
<p>[黑人问号脸.png]。经过再三确认后，该同学表示并没有研究过具体是什么，只知道执行完这个命令以后就可以了。  <br>我本以为这仅仅是网上的一个段子，但没想到真的被我碰到了。_也不知道是好事儿还是坏事儿。。_  </p>
<p>从我个人的角度考虑，还是建议了解下你所使用的工具。_至少看下<code>scripts</code>里边究竟写的是什么咯 :)_  <br><em>P.S. <code>npm scripts</code>中不仅仅可以执行<code>NPM</code>模块，普通的<code>shell</code>命令都是支持的</em></p>
<h3 id="articleHeader2">创建工程</h3>
<p>首先的第一步，就是你需要有一个文件夹来存放你的<code>NPM</code>包，因为是一个简单的示例，所以不会真实的进行上传，会使用<code>npm ln</code>来代替<code>npm publish</code> + <code>npm install</code>。  </p>
<p>随便创建一个文件夹即可，文件夹的名字也并不会产生太大的影响。  <br>然后需要创建一个<code>package.json</code>文件，可以通过<code>npm init</code>来快速的生成，我个人更喜欢添加<code>-y</code>标识来跳过一些非必填的字段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> mkdir test-util
> cd test-util
> npm init -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; mkdir <span class="hljs-built_in">test</span>-util
&gt; <span class="hljs-built_in">cd</span> <span class="hljs-built_in">test</span>-util
&gt; npm init -y</code></pre>
<h3 id="articleHeader3">创建执行文件</h3>
<p>因为我们这个模块就是用来执行使用的，所以有没有入口文件实际上是没有必要的，我们仅仅需要创建对应的执行文件即可，需要注意的一点是：__与普通的<code>JS</code>文件区别在于头部一定要写上<code>#!/usr/bin/env node</code>__</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

// index.js
console.log('first util')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">#!/usr/bin/env node</span>

<span class="hljs-comment">// index.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'first util'</span>)</code></pre>
<h3 id="articleHeader4">注册执行命令</h3>
<p>然后就是修改<code>package.json</code>来告诉<code>NPM</code>我们的执行文件在哪：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
+  &quot;bin&quot;: &quot;./index.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">{
<span class="hljs-addition">+  "bin": "./index.js"</span>
}</code></pre>
<p>在只有一个<code>bin</code>，且要注册的命令与<code>package.json</code>中的<code>name</code>字段相同时，则可以写成上边那种形式，如果要注册多个可执行命令，那么就可以写成一个<code>k/v</code>结构的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;bin&quot;: {
    &quot;command1&quot;: &quot;./command1.js&quot;,
    &quot;command2&quot;: &quot;./command2.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"bin"</span>: {
    <span class="hljs-attr">"command1"</span>: <span class="hljs-string">"./command1.js"</span>,
    <span class="hljs-attr">"command2"</span>: <span class="hljs-string">"./command2.js"</span>
  }
}</code></pre>
<blockquote>调用时就是 command1 | command2</blockquote>
<h3 id="articleHeader5">模拟执行</h3>
<p>接下来我们去找另一个文件夹模拟安装<code>NPM</code>模块，再执行<code>npm ln</code>就可以了，再执行对应的命令以后你应该会看到上边的<code>log</code>输出了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> cd .. &amp;&amp; mkdir fake-repo &amp;&amp; cd fake-repo
> npm ln ../test-util

> test-util       # global
first util
> npx test-util   # local
first util" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; <span class="hljs-built_in">cd</span> .. &amp;&amp; mkdir fake-repo &amp;&amp; <span class="hljs-built_in">cd</span> fake-repo
&gt; npm ln ../<span class="hljs-built_in">test</span>-util

&gt; <span class="hljs-built_in">test</span>-util       <span class="hljs-comment"># global</span>
first util
&gt; npx <span class="hljs-built_in">test</span>-util   <span class="hljs-comment"># local</span>
first util</code></pre>
<p>这样一个最简易的可执行包就创建完成了。</p>
<blockquote>npm ln 为 npm link 的简写  <br>npm ln &lt;模块路径&gt; 相当于 cd &lt;模块路径&gt; &amp;&amp; npm ln + npm ln &lt;模块名&gt;  <br>要注意是 <strong>模块名__，而非文件夹名， __模块名</strong> 为<code>package.json</code>中所填写的<code>name</code>字段</blockquote>
<h3 id="articleHeader6">global 与 local 的区别</h3>
<p>因为<code>npm link</code>执行的<a href="https://docs.npmjs.com/cli/link#description" rel="nofollow noreferrer" target="_blank">特性</a>，会将<code>global</code>+<code>local</code>的依赖都进行安装，所以在使用上不太好体现出两者的差异，所以我们决定将代码直接拷贝到<code>node_modules</code>下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm unlink --no-save test-util      # 仅移除 local 的依赖
> cp -R ../test-util ./node_modules/
> npm rebuild" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; npm unlink --no-save <span class="hljs-built_in">test</span>-util      <span class="hljs-comment"># 仅移除 local 的依赖</span>
&gt; cp -R ../<span class="hljs-built_in">test</span>-util ./node_modules/
&gt; npm rebuild</code></pre>
<p><strong>因为绕过了<code>NPM</code>的安装步骤，一定要记得<code>npm rebuild</code>来让<code>NPM</code>知道我们的包注册了<code>bin</code></strong>  </p>
<p>这时候我们修改脚本文件，在脚本中添加当前执行目录的输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

- console.log('first util')
+ console.log(process.execPath) // 返回JS文件上层文件夹的完整路径" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff">#!/usr/bin/env node

<span class="hljs-deletion">- console.log('first util')</span>
<span class="hljs-addition">+ console.log(process.execPath) // 返回JS文件上层文件夹的完整路径</span></code></pre>
<p>这时再次执行两种命令，就可以看到区别了。  </p>
<p>之所以要提到<code>global</code>与<code>local</code>，是因为在开发的过程中可能会不经意的在这里踩坑。  <br>比如说我们在开发<code>Node</code>项目时，经常会用到<code>nodemon</code>来帮助在开发期间监听文件变化并自动重启。  <br>为了使用方便，很可能会将预定的一个启动命令放到<code>npm scripts</code>中去，类似这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;script&quot;: {
    &quot;start&quot;: &quot;nodemon ./server.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"script"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"nodemon ./server.js"</span>
  }
}</code></pre>
<h4>两者混用会带来的问题</h4>
<p>这样的项目在你本地使用是完全没有问题的，但是如果有其他的同事需要运行你的这个项目，在第一步执行<code>npm start</code>时就会出异常，因为他本地可能并没有安装<code>nodemon</code>。  </p>
<p>以及这样的做法很可能会导致一些其它包引用的问题。  <br>比如说，<code>webpack</code>实际上是支持多种语言编写<code>config</code>配置文件的，就拿<code>TypeScript</code>举例吧，最近也一直在用这个。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> webpack --config webpack.config.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">&gt; webpack --config webpack.config.ts</code></pre>
<blockquote>这样的命令是完全有效的，webpack 会使用 ts 的解释器去执行对应的配置文件</blockquote>
<p>因为<code>webpack</code>不仅仅支持这一种解释器，有很多种，类似<code>CoffeeScript</code>也是支持的。  <br>所以<code>webpack</code>肯定不能够将各种语言的解释器依赖都放到自身的依赖模块中去，而是会根据传入<code>config</code>的文件后缀名来动态的判断应该添加哪些解释器，这些在<code>webpack</code>的源码中很容易找到：</p>
<ol>
<li><a href="https://github.com/webpack/webpack-cli/blob/master/bin/convert-argv.js#L88" rel="nofollow noreferrer" target="_blank">获取配置文件后缀</a></li>
<li><a href="https://github.com/webpack/webpack-cli/blob/master/bin/convert-argv.js#L140" rel="nofollow noreferrer" target="_blank">获取对应的解释器并引入模块注册</a></li>
</ol>
<p>根据<code>webpack</code>动态获取解释器的模块<a href="https://www.npmjs.com/package/interpret" rel="nofollow noreferrer" target="_blank">interpret</a>来看，<code>.ts</code>类型的文件会引入这些模块：<code>['ts-node/register', 'typescript-node/register', 'typescript-register', 'typescript-require']</code>，但是在<code>webpack</code>的依赖中你是找不到这些的。  </p>
<p>在源码中也可以看到，<code>webpack</code>在执行<code>config</code>之前动态的引入了这些解释器模块。  </p>
<p>这里也可以稍微提一下<code>Node</code>中引入全局模块的一些事儿，我们都知道，通过<code>npm install</code>安装的模块，都可以通过<code>require('XXX')</code>来直接引用，如果一些第三方模块需要引入某些其他的模块，那么这个模块也需要存在于它所处目录下的<code>node_modules</code>文件夹中才能够正确的引入。  </p>
<p>首先有一点大家应该都知道的，目前版本的<code>NPM</code>，不会再有黑洞那样深的<code>node_modules</code>了，而是会将依赖平铺放在<code>node_modules</code>文件夹下。比如说你引入的模块<code>A</code>，<code>A</code>的内部引用了模块<code>B</code>，那么你也可以直接引用模块<code>B</code>，因为<code>A</code>和<code>B</code>都存在于<code>node_modules</code>下。  </p>
<p>还是拿我们刚才做的那个小工具来实验，我们在<code>fake-repo</code>中添加<code>express</code>的依赖，然后在<code>test-util</code>中添加<code>koa</code>的依赖，并在<code>test-util/index.js</code>中<code>require</code>上述的两个模块。  </p>
<p>你会发现，<code>npx test-util</code>运行正确，而<code>test-util</code>却直接报错了，提示<code>express</code>不存在。</p>
<p>我们可以通过<code>NPM</code>的一个命令来解释这个原因：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm root
<current>/node_modules
> npm root -g
<global>/node_modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">&gt; npm root
&lt;current&gt;/node_modules
&gt; npm root -g
&lt;global&gt;/node_modules</code></pre>
<p>这样输出两个路径应该就能看的比较明白了，<code>koa</code>模块是没有问题的，因为都是存在于这些路径下的<code>node_modules</code>，而<code>express</code>则只存在于<code>&lt;current&gt;/node_modules/test-util/node_modules</code>下，全局调用下，<code>require</code>是找不到<code>express</code>的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# global 下的结构
.
├── /usr/local/lib/node_modules   # npm root 的位置
│&nbsp;  ├── koa
│&nbsp;&nbsp; └── test-util                 # 执行脚本所处的位置
└── <workspace>                   # 本地的项目
 &nbsp;&nbsp; ├── node_modules
 &nbsp;&nbsp; │&nbsp;  └── express
 &nbsp;&nbsp; └── .

# local 下的结构
└── <workspace>                   # 本地的项目
    ├── node_modules              # npm root 的位置
    │&nbsp;  ├── koa
    │&nbsp;  ├── test-util             # 执行脚本所处的位置
    │&nbsp;  └── express
    └── ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># global 下的结构</span>
.
├── /usr/<span class="hljs-built_in">local</span>/lib/node_modules   <span class="hljs-comment"># npm root 的位置</span>
│&nbsp;  ├── koa
│&nbsp;&nbsp; └── <span class="hljs-built_in">test</span>-util                 <span class="hljs-comment"># 执行脚本所处的位置</span>
└── &lt;workspace&gt;                   <span class="hljs-comment"># 本地的项目</span>
 &nbsp;&nbsp; ├── node_modules
 &nbsp;&nbsp; │&nbsp;  └── express
 &nbsp;&nbsp; └── .

<span class="hljs-comment"># local 下的结构</span>
└── &lt;workspace&gt;                   <span class="hljs-comment"># 本地的项目</span>
    ├── node_modules              <span class="hljs-comment"># npm root 的位置</span>
    │&nbsp;  ├── koa
    │&nbsp;  ├── <span class="hljs-built_in">test</span>-util             <span class="hljs-comment"># 执行脚本所处的位置</span>
    │&nbsp;  └── express
    └── .</code></pre>
<p>所以这也从侧面说明了为什么<code>webpack</code>可以直接在自己的文件中引用并不存在于自己模块下的依赖。  </p>
<p>因为<code>webpack</code>认为如果你要使用<code>TypeScript</code>，那么一定会有对应的依赖，这个模块就是与<code>webpack</code>同级的依赖，也就是说<code>webpack</code>可以放心的进行<code>require</code>，大致这样的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── node_modules    # npm root 的位置
│&nbsp;&nbsp; ├── webpack
│&nbsp;&nbsp; └── typescript
└── .               # 在这里执行脚本" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├── node_modules    <span class="hljs-comment"># npm root 的位置</span>
│&nbsp;&nbsp; ├── webpack
│&nbsp;&nbsp; └── typescript
└── .               <span class="hljs-comment"># 在这里执行脚本</span></code></pre>
<p>以及一个相反的栗子🌰，如果有些依赖在<code>global</code>下安装了，但是没有在<code>local</code>下进行安装，也许会出现这样的情况，命令直接调用的话，完全没有问题，但是放到<code>npm scripts</code>中，或者使用<code>npx</code>来进行调用，则发现提示模块不存在各种balabala的异常。  <br><em>P.S. 在<code>webpack</code>中，如果模块不存在，并不会给你报错，而是默认按照<code>JS</code>的方式进行解析，所以可能会遇到提示语法错误，这时候不用想了，一定是缺少依赖</em>  </p>
<p><strong>也可以说<code>npx</code>是个好东西，尽量使用<code>npx</code>的方式来调用，能少踩一些<code>global</code>、<code>local</code>的坑</strong></p>
<h2 id="articleHeader7">最终的上线</h2>
<p>当然了，真实的开发完一个工具以后，就需要进行提交到<code>NPM</code>上了，这个也是一个很简单的步骤，<code>npm publish</code>即可，会自动获取<code>package.json</code>中的<code>name</code>作为包名（重复了会报错）。</p>
<h2 id="articleHeader8">小结</h2>
<p>总结了一下关于<code>NPM</code>可执行的包相关的一些东东，希望能够帮大家简单的理解这是个什么，以及<code>global</code>和<code>local</code>下一些可能会遇到的问题，希望能够让大家绕过这些坑。  <br>如文中有误还请指出，<code>NPM</code>工具相关的问题也欢迎来讨论。</p>
<h3 id="articleHeader9">参考资料</h3>
<ul>
<li><a href="https://docs.npmjs.com/cli/bin" rel="nofollow noreferrer" target="_blank">npm-bin</a></li>
<li><a href="https://github.com/webpack/webpack-cli/blob/master/bin/cli.js" rel="nofollow noreferrer" target="_blank">webpack-cli</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
了解可执行的NPM包

## 原文链接
[https://segmentfault.com/a/1190000016818122](https://segmentfault.com/a/1190000016818122)

