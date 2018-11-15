---
title: 使用 TypeScript 改造构建工具及测试用例
hidden: true
categories: reprint
slug: f0ef0977
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<p>最近的一段时间一直在搞<code>TypeScript</code>，一个巨硬出品、赋予<code>JavaScript</code>语言静态类型和编译的语言。  <br>第一个完全使用<code>TypeScript</code>重构的纯<code>Node.js</code>项目已经上线并稳定运行了。  <br>第二个前后端的项目目前也在重构中，关于前端基于<code>webpack</code>的<code>TypeScript</code>套路之前也有提到过：<a href="https://segmentfault.com/a/1190000016163937">TypeScript在react项目中的实践</a>。  </p>
<p>但是这些做完以后也总感觉缺了点儿什么 _（没有尽兴）_：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgkU9?w=1984&amp;h=270" src="https://static.alili.tech/img/bVbgkU9?w=1984&amp;h=270" alt="old-project-screenshot.png" title="old-project-screenshot.png" style="cursor: pointer; display: inline;"></span><br>是的，依然有五分之一的<code>JavaScript</code>代码存在于项目中，作为一个<code>TypeScript</code>的示例项目，表现的很不纯粹。  <br>所以有没有可能将这些<code>JavaScript</code>代码也换成<code>TypeScript</code>呢？  <br>答案肯定是有的，首先需要分析这些代码都是什么：</p>
<ul>
<li>
<code>Webpack</code>打包时的配置文件</li>
<li>一些简单的测试用例（使用的mocha和chai）</li>
</ul>
<p>知道了是哪些地方还在使用<code>JavaScript</code>，这件事儿就变得很好解决了，从构建工具（<code>Webpack</code>）开始，逐个击破，将这些全部替换为<code>TypeScript</code>。</p>
<h2 id="articleHeader0">Webpack 的 TypeScript 实现版本</h2>
<p>在这<code>8102</code>年，很幸福，<code>Webpack</code>官方已经支持了<code>TypeScript</code>编写配置文件，<a href="https://webpack.js.org/configuration/configuration-languages/" rel="nofollow noreferrer" target="_blank">文档地址</a>。  <br><em>除了<code>TypeScript</code>以外还支持<code>JSX</code>和<code>CoffeeScript</code>的解释器，在这就忽略它们的存在了</em></p>
<h3 id="articleHeader1">依赖的安装</h3>
<p>首先是要安装<code>TypeScript</code>相关的一套各种依赖，包括解释器及该语言的核心模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -D typescript ts-node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -D typescript ts-node</code></pre>
<p><code>typescript</code>为这个语言的核心模块，<code>ts-node</code>用于直接执行<code>.ts</code>文件，而不需要像<code>tsc</code>那样会编译输出<code>.js</code>文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ts-node helloworld.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ts-node helloworld.ts</code></pre>
<p>因为要在<code>TypeScript</code>环境下使用<code>Webpack</code>相关的东东，所以要安装对应的<code>types</code>。  <br>也就是<code>Webpack</code>所对应的那些<code>*.d.ts</code>，用来告诉<code>TypeScript</code>这是个什么对象，提供什么方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D @types/webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm i -D @types/webpack</code></pre>
<p><em>一些常用的<code>pLugin</code>都会有对应的<code>@types</code>文件，可以简单的通过<code>npm info @types/XXX</code>来检查是否存在</em>  </p>
<p>如果是一些小众的<code>plugin</code>，则可能需要自己创建对应的<code>d.ts</code>文件，例如我们一直在用的<code>qiniu-webpack-plugin</code>，这个就没有对应的<code>@types</code>包的，所以就自己创建一个空文件来告诉<code>TypeScript</code>这是个啥：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module 'qiniu-webpack-plugin' // 就一个简单的定义即可

// 如果还有其他的包，直接放到同一个文件就行了
// 文件名也没有要求，保证是 d.ts 结尾即可" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> 'qiniu-webpack-plugin' // 就一个简单的定义即可

// 如果还有其他的包，直接放到同一个文件就行了
// 文件名也没有要求，保证是 d.ts 结尾即可</code></pre>
<p><em>放置的位置没有什么限制，随便丢，一般建议放到<code>types</code>文件夹下</em>  </p>
<p>最后就是<code>.ts</code>文件在执行时的一些配置文件设置。   <br>用来执行<code>Webpack</code>的<code>.ts</code>文件对<code>tsconfig.json</code>有一些小小的要求。  <br><code>compilerOptions</code>下的<code>target</code>选项必须是<code>es5</code>，这个代表着输出的格式。  <br>以及<code>module</code>要求选择<code>commonjs</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    &quot;module&quot;: &quot;commonjs&quot;,
    &quot;target&quot;: &quot;es5&quot;,
    &quot;esModuleInterop&quot;: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"compilerOptions"</span>: {
    <span class="hljs-attr">"module"</span>: <span class="hljs-string">"commonjs"</span>,
    <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-attr">"esModuleInterop"</span>: <span class="hljs-literal">true</span>
  }
}</code></pre>
<p>但一般来讲，执行<code>Webpack</code>的同级目录都已经存在了<code>tsconfig.json</code>，用于实际的前端代码编译，很可能两个配置文件的参数并不一样。  <br>如果因为要使用<code>Webpack</code>去修改真正的代码配置参数肯定是不可取的。  <br>所以我们就会用到这么一个包，用来改变<code>ts-node</code>执行时所依赖的配置文件：<a href="https://www.npmjs.com/package/tsconfig-paths" rel="nofollow noreferrer" target="_blank">tsconfig-paths</a>  </p>
<p>在<code>Readme</code>中发现了这样的说法：<code>If process.env.TS_NODE_PROJECT is set it will be used to resolved tsconfig.json</code>。  <br>在<code>Webpack</code>的文档中同样也提到了这句，所以这是一个兼容的方法，在命令运行时指定一个路径，在不影响原有配置的情况下创建一个供<code>Webpack</code>打包时使用的配置。</p>
<ol>
<li>将上述的配置文件改名为其它名称，<code>Webpack</code>文档示例中为<code>tsconfig-for-webpack-config.json</code>，这里就直接沿用了</li>
<li>然后添加<code>npm script</code>如下</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;TS_NODE_PROJECT=tsconfig-for-webpack-config.json webpack --config configs.ts&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"TS_NODE_PROJECT=tsconfig-for-webpack-config.json webpack --config configs.ts"</span>
  }
}</code></pre>
<h3 id="articleHeader2">文件的编写</h3>
<p>关于配置文件，从<code>JavaScript</code>切换到<code>TypeScript</code>实际上并不会有太大的改动，因为<code>Webpack</code>的配置文件大多都是写死的文本/常量。  <br>很多类型都是自动生成的，基本可以不用手动指定，一个简单的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Configuration } from 'webpack'

const config: Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}

export default config" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Configuration } <span class="hljs-keyword">from</span> <span class="hljs-string">'webpack'</span>

<span class="hljs-keyword">const</span> config: Configuration = {
  mode: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ? <span class="hljs-string">'production'</span> : <span class="hljs-string">'development'</span>,
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> config</code></pre>
<p><code>Configuration</code>是一个<code>Webpack</code>定义的接口（<code>interface</code>），用来规范一个对象的行为。  <br>在<code>VS Code</code>下按住<code>Command</code> + 单击可以直接跳转到具体的<code>webpack.d.ts</code>定义文件那里，可以看到详细的定义信息。  <br><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgkWT?w=1790&amp;h=1068" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="webpack-declare.png" title="webpack-declare.png" style="cursor: pointer;"></span><br>各种常用的规则都写在了这里，使用<code>TypeScript</code>的一个好处就是，当要实现一个功能时你不再需要去网站上查询应该要配置什么，可以直接翻看<code>d.ts</code>的定义。  <br>如果注释写得足够完善，基本可以当成文档来用了，而且在<code>VS Code</code>编辑器中还有动态的提示，以及一些错误的纠正，比如上述的<code>NODE_ENV</code>的获取，如果直接写<code>process.env.NODE_ENV || 'development'</code>是会抛出一个异常的，因为从<code>d.ts</code>中可以看到，关于<code>mode</code>只有三个有效值<code>production</code>、<code>developemnt</code>和<code>none</code>，而<code>process.env.NODE_ENV</code>显然只是一个字符串类型的变量。  <br><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgkVj?w=1082&amp;h=502" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="warning-tips.png" title="warning-tips.png" style="cursor: pointer;"></span><br>所以我们需要使用三元运算符保证传入的参数一定是我们想要的。  </p>
<p>以及在编写的过程中，如果有一些自定义的<code>plugin</code>之类的，可能在使用的过程中会抛异常提示说某个对象不是有效的<code>Plugin</code>对象，一个很简单的方法，在对应的<code>plugin</code>后边添加一个<code>as webpack.Plugin</code>即可。  </p>
<p><strong>在这里<code>TypeScript</code>所做的只是静态的检查，并不会对实际的代码执行造成任何影响，就算类型因为强行<code>as</code>而改变，也只是编译期的修改，在实际执行的<code>JavaScript</code>代码中还是弱类型的</strong>   </p>
<p>在完成了上述的操作后，再执行<code>npm run XXX</code>就可以直接运行<code>TypeScript</code>版本的<code>Webpack</code>配置咯。</p>
<h3 id="articleHeader3">探索期间的一件趣事</h3>
<p>因为我的项目根目录已经安装了<code>ts-node</code>，而前端项目是作为其中的一个文件夹存在的，所以就没有再次进行安装。  <br>这就带来了一个令人吐血的问题。  </p>
<p>首先全部流程走完以后，我直接在命令行中输入<code>TS_NODE_PROJECT=XXX.json NODE_ENV=dev webpack --config ./webpack/dev.ts</code>  <br>完美运行，然后将这行命令放到了<code>npm scripts</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;start&quot;: &quot;TS_NODE_PROJECT=XXX.json NODE_ENV=dev webpack --config ./webpack/dev.ts&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"TS_NODE_PROJECT=XXX.json NODE_ENV=dev webpack --config ./webpack/dev.ts"</span>
  }
}</code></pre>
<p>再次运行<code>npm start</code>，发现竟然出错了-.-，提示我说<code>import</code>语法不能被识别，这个很显然就是没有应用我们在<code>ts_NODE_PROJECT</code>中指定的<code>config</code>文件。  <br>刚开始并不知道问题出在哪，因为这个在命令行中直接执行并没有任何问题。  <br>期间曾经怀疑是否是环境变量没有被正确设置，还使用了<code>cross-env</code>这个插件，甚至将命令写到了一个<code>sh</code>文件中进行执行。  <br>然而问题依然存在，后来在一个群中跟小伙伴们聊起了这个问题，有人提出，__你是不是全局安装了<code>ts-node</code>__。  <br>检查以后发现，果然是的，在命令行执行时使用的是全局的<code>ts-node</code>，但是在<code>npm scripts</code>中使用的是本地的<code>ts-node</code>。  <br>在命令行环境执行时还以为是会自动寻找父文件夹<code>node_modules</code>下边的依赖，其实是使用的全局包。  <br>乖乖的在<code>client-src</code>文件夹下也安装了<code>ts-node</code>就解决了这个问题。  <br><em>全局依赖害人。。</em></p>
<h2 id="articleHeader4">测试用例的改造</h2>
<p>前边的<code>Webpack</code>改为<code>TypeScript</code>大多数原因是因为强迫症所致。  <br>但是测试用例的<code>TypeScript</code>改造则是一个能极大提高效率的操作。</p>
<h3 id="articleHeader5">为什么要在测试用例中使用 TypeScript</h3>
<p>测试用例使用<code>chai</code>来编写，_（之前的<code>Postman</code>也是用的<code>chai</code>的语法）_  <br><code>chai</code>提供了一系列的语义化链式调用来实现断言。  <br>在之前的分享中也提到过，这么多的命令你并不需要完全记住，只知道一个<code>expect(XXX).to.equal(true)</code>就够了。  </p>
<p>但是这样的通篇<code>to.equal(true)</code>是巨丑无比的，而如果使用那些语义化的链式调用，在不熟练的情况下很容易就会得到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: XXX.XXX is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">Error: XXX.XXX is not a <span class="hljs-keyword">function</span></code></pre>
<p>因为这确实有一个门槛问题，必须要写很多才能记住调用规则，各种<code>not</code>、<code>includes</code>的操作。  <br>但是接入了<code>TypeScript</code>以后，这些问题都迎刃而解了。  <br>也是前边提到的，所有的<code>TypeScript</code>模块都有其对应的<code>.d.ts</code>文件，用来告诉我们这个模块是做什么的，提供了什么可以使用。  <br>也就是说在测试用例编写时，我们可以通过动态提示来快速的书写断言，而不需要结合着文档去进行“翻译”。  </p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgkVl?w=1298&amp;h=152" src="https://static.alili.tech/img/bVbgkVl?w=1298&amp;h=152" alt="chai-tips.png" title="chai-tips.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgkVo?w=1086&amp;h=196" src="https://static.alili.tech/img/bVbgkVo?w=1086&amp;h=196" alt="chai-warning.png" title="chai-warning.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">使用方式</h3>
<p>如果是之前有写过<code>mocha</code>和<code>chai</code>的童鞋，基本上修改文件后缀+安装对应的<code>@types</code>即可。  <br>可以直接跳到这里来：<a href="#%E5%BC%80%E5%A7%8B%E7%BC%96%E5%86%99%E6%B5%8B%E8%AF%95%E8%84%9A%E6%9C%AC">开始编写测试脚本</a>  <br>但是如果对测试用例感兴趣，但是并没有使用过的童鞋，可以看下边的一个基本步骤。</p>
<h3 id="articleHeader7">安装依赖</h3>
<ol>
<li>
<code>TypeScript</code>相关的安装，<code>npm i -D typescript ts-node</code>
</li>
<li>
<code>Mocha</code>、<code>chai</code>相关的安装，<code>npm i -D mocha chai @types/mocha @types/chai</code>
</li>
<li>如果需要涉及到一些API的请求，可以额外安装<code>chai-http</code>，<code>npm i -D chai-http @types/chai-http</code>
</li>
</ol>
<p>环境的依赖就已经完成了，如果额外的使用一些其他的插件，记得安装对应的<code>@types</code>文件即可。  <br><em>如果有使用ESLint之类的插件，可能会提示<code>modules</code>必须存在于<code>dependencies</code>而非<code>devDependencies</code></em>  <br>这是ESLint的<code>import/no-extraneous-dependencies</code>规则导致的，针对这个，我们目前的方案是添加一些例外：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import/no-extraneous-dependencies:
  - 2
  - devDependencies:
    - &quot;**/*.test.js&quot;
    - &quot;**/*.spec.js&quot;
    - &quot;**/webpack*&quot;
    - &quot;**/webpack/*&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="yaml hljs"><code class="yaml"><span class="hljs-string">import/no-extraneous-dependencies:</span>
<span class="hljs-bullet">  -</span> <span class="hljs-number">2</span>
<span class="hljs-attr">  - devDependencies:</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">"**/*.test.js"</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">"**/*.spec.js"</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">"**/webpack*"</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">"**/webpack/*"</span></code></pre>
<p>针对这些目录下的文件/文件夹不进行校验。_是的，webpack的使用也会遇到这个问题_</p>
<h3 id="articleHeader8">开始编写测试脚本</h3>
<p>如果是对原有的测试脚本进行修改，无外乎修改后缀、添加一些必要的类型声明，不会对逻辑造成任何修改。</p>
<h4>一个简单的示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// number-comma.ts
export default (num: number | string) => String(num).replace(/\B(?=(\d{3})+$)/g, ',')

// number-comma.spec.ts
import chai from 'chai'
import numberComma from './number-comma'

const { expect } = chai

// 测试项
describe('number-comma', () => {
  // 子项目1
  it('`1234567` should transform to `1,234,567`', done => {
    expect(numberComma(1234567)).to.equal('1,234,567')
    done()
  })

  // 子项目2
  it('`123` should never transform', done => {
    const num = 123
    expect(numberComma(num)).to.equal(String(num))
    done()
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// number-comma.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (num: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">String</span>(num).replace(<span class="hljs-regexp">/\B(?=(\d{3})+$)/g</span>, <span class="hljs-string">','</span>)

<span class="hljs-comment">// number-comma.spec.ts</span>
<span class="hljs-keyword">import</span> chai <span class="hljs-keyword">from</span> <span class="hljs-string">'chai'</span>
<span class="hljs-keyword">import</span> numberComma <span class="hljs-keyword">from</span> <span class="hljs-string">'./number-comma'</span>

<span class="hljs-keyword">const</span> { expect } = chai

<span class="hljs-comment">// 测试项</span>
describe(<span class="hljs-string">'number-comma'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 子项目1</span>
  it(<span class="hljs-string">'`1234567` should transform to `1,234,567`'</span>, <span class="hljs-function"><span class="hljs-params">done</span> =&gt;</span> {
    expect(numberComma(<span class="hljs-number">1234567</span>)).to.equal(<span class="hljs-string">'1,234,567'</span>)
    done()
  })

  <span class="hljs-comment">// 子项目2</span>
  it(<span class="hljs-string">'`123` should never transform'</span>, <span class="hljs-function"><span class="hljs-params">done</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> num = <span class="hljs-number">123</span>
    expect(numberComma(num)).to.equal(<span class="hljs-built_in">String</span>(num))
    done()
  })
})</code></pre>
<p><strong>如果全局没有安装<code>mocha</code>，记得将命令写到<code>npm script</code>中，或者通过下述方式执行</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/mocha/bin/mocha -r ts-node/register test/number-comma.spec.ts

# 如果直接这样写，会抛出异常提示 mocha 不是命令
mocha -r ts-node/register test/number-comma.spec.ts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">./node_modules/mocha/bin/mocha -r ts-node/register <span class="hljs-built_in">test</span>/number-comma.spec.ts

<span class="hljs-comment"># 如果直接这样写，会抛出异常提示 mocha 不是命令</span>
mocha -r ts-node/register <span class="hljs-built_in">test</span>/number-comma.spec.ts</code></pre>
<p><code>mocha</code>有一点儿比较好的是提供了<code>-r</code>命令来让你手动指定执行测试用例脚本所使用的解释器，这里直接设置为<code>ts-node</code>的路径<code>ts-node/register</code>，然后就可以在后边直接跟一个文件名（或者是一些通配符）。  </p>
<p>目前我们在项目中批量执行测试用例的命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;mocha -r ts-node/register test/**/*.spec.ts&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"mocha -r ts-node/register test/**/*.spec.ts"</span>
  }
}</code></pre>
<p><em><code>npm test</code>可以直接调用，而不需要添加<code>run</code>命令符，类似的还有<code>start</code>、<code>build</code>等等</em>  </p>
<p>一键执行以后就可以得到我们想要的结果了，再也不用担心一些代码的改动会影响到其他模块的逻辑了 <strong>（前提是认真写测试用例）</strong>  </p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgkVw?w=696&amp;h=248" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="mocha-results.png" title="mocha-results.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">小结</h2>
<p>做完上边两步的操作以后，我们的项目就实现了100%的<code>TypeScript</code>化，在任何地方享受静态编译语法所带来的好处。  <br>附上更新后的代码含量截图：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgkVz?w=1982&amp;h=276" src="https://static.alili.tech/img/bVbgkVz?w=1982&amp;h=276" alt="new-project-screenshot.png" title="new-project-screenshot.png" style="cursor: pointer; display: inline;"></span></p>
<p>最近针对<code>TypeScript</code>做了很多事情，从<code>Node.js</code>、<code>React</code>以及这次的<code>Webpack</code>与<code>Mocha+Chai</code>。  <br><code>TypeScript</code>因为其存在一个编译的过程，极大的降低了代码出bug的可能性，提高程序的稳定度。  <br>全面切换到<code>TypeScript</code>更是能够降低在两种语法之间互相切换时所带来的不必要的消耗，祝大家搬砖愉快。</p>
<h3 id="articleHeader10">之前关于 TypeScript 的笔记</h3>
<ul>
<li><a href="https://segmentfault.com/a/1190000015719697">TypeScript在node项目中的实践</a></li>
<li><a href="https://segmentfault.com/a/1190000016163937" target="_blank">TypeScript在react项目中的实践</a></li>
</ul>
<h3 id="articleHeader11">一个完整的 TypeScript 示例</h3>
<p><a href="https://github.com/jiasm/typescript-example" rel="nofollow noreferrer" target="_blank">typescript-example</a></p>
<p>欢迎各位来讨论关于<code>TypeScript</code>使用上的一些问题，针对稳重的感觉不足之处也欢迎指出。</p>
<h3 id="articleHeader12">参考资料</h3>
<ul>
<li><a href="https://www.npmjs.com/package/ts-node" rel="nofollow noreferrer" target="_blank">ts-node</a></li>
<li><a href="https://webpack.js.org/configuration/configuration-languages/" rel="nofollow noreferrer" target="_blank">configuration-languages | webpack</a></li>
<li><a href="https://mochajs.org/#getting-started" rel="nofollow noreferrer" target="_blank">mochajs</a></li>
<li><a href="http://www.chaijs.com/api/bdd/" rel="nofollow noreferrer" target="_blank">chaijs</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016247815](https://segmentfault.com/a/1190000016247815)

## 原文标题
使用 TypeScript 改造构建工具及测试用例
