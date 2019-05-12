---
title: 'Create React App：不使用eject，自定义webpack配置' 
date: 2018-12-27 2:30:13
hidden: true
slug: k50t8pklkdn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>前言：译者一直使用react，但是前段时间因为facebook的协议问题，公司开始禁止使用react来开发前端项目。（更新到react16的MIT协议也不行）于是，笔者决定将react替换为preact，这样就需要在webpack配置中设置alias，但是又不希望使用create-react-app中不可逆的eject。于是找到了这篇教程，简单翻译后结合自己的需要进行了修改。分享给有需要的人。</p></blockquote>
<p>Create React App提供了一套非常不错的配置，能够上手即用，并且提供了“eject”功能，让你能够自己接管所有的配置项。</p>
<p>但是，如果当你仅仅是想微调一下Webpack的配置呢？而并不是接管所有的配置项。你可能想要增加SASS或者SCSS的支持，或者使用自己定义的.eslintrc文件。（译者的使用场景是在webpack中增加alias）</p>
<p>让我们开始讲解如何操作。</p>
<p>警告！<br>首先你要注意: 如果你并不了解Webpack的运行机制，或是不喜欢在工程里加入的hacky代码（少量的），我建议你不要使用这种方式，这是一种高级的技巧。</p>
<p>当Create React App变化时，特别是它使用的react-scripts包变化时，<strong>很有可能</strong>导致我们的代码需要一些修复。如果官方修改了webpack的结构，或者导出方式，我们的代码将出现问题，这时就需要你自己去了解如何修复它们。所以，再强调一次，如果你觉得这种方式有问题，请不要这么做！（译者觉得原作者有点夸张了）</p>
<p>破解Create React App<br>好了，有了这个可怕的免责声明，让我们来看看如何破解Create React App，如果你想直接去看<a href="https://daveceddia.com/customize-create-react-app-webpack-without-ejecting/#example-project" rel="nofollow noreferrer" target="_blank">示例项目</a>的代码，也是可以的。在开始之前，确保使用的是最新的react-scripts，作者在编写的时候是1.0.11。（译者使用的是1.4.1）</p>
<p>Create React App的基础被封装在“react-scripts”包中，可以在package.json中的“dependencies”的列表里了解到。</p>
<p>我们将使用rewire来创建猴子补丁（运行时动态替换），使得我们在执行之前对Webpack配置进行定制。</p>
<p>下面这个文件是这个项目中最重要的部分。我建议在您的CRA项目中建立一个名为“scripts”的目录，并将这些代码放入scripts/customized-config.js文件中。你可以任意命名，不过(稍后我们将用到这个文件名)。</p>
<p>scripts/customized-config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
  本模块运行react-scripts里的脚本 (Create React App)
  可以自定义webpack配置，通过在项目根目录创建&quot;config-overrides.dev.js&quot; 、 &quot;config-overrides.prod.js&quot; 文件.

  A config-overrides file should export a single function that takes a
  config and modifies it as necessary.

  module.exports = function(webpackConfig) {
    webpackConfig.module.rules[0].use[0].options.useEslintrc = true;
  };
*/
var rewire = require('rewire');
var proxyquire = require('proxyquire');

switch(process.argv[2]) {
  // The &quot;start&quot; script is run during development mode
  case 'start':
    rewireModule('react-scripts/scripts/start.js', loadCustomizer('../config-overrides.dev'));
    break;
  // The &quot;build&quot; script is run to produce a production bundle
  case 'build':
    rewireModule('react-scripts/scripts/build.js', loadCustomizer('../config-overrides.prod'));
    break;
  // The &quot;test&quot; script runs all the tests with Jest
  case 'test':
    // Load customizations from the config-overrides.testing file.
    // That file should export a single function that takes a config and returns a config
    let customizer = loadCustomizer('../config-overrides.testing');
    proxyquire('react-scripts/scripts/test.js', {
      // When test.js asks for '../utils/createJestConfig' it will get this instead:
      '../utils/createJestConfig': (...args) => {
        // Use the existing createJestConfig function to create a config, then pass
        // it through the customizer
        var createJestConfig = require('react-scripts/utils/createJestConfig');
        return customizer(createJestConfig(...args));
      }
    });
    break;
  default:
    console.log('customized-config only supports &quot;start&quot;, &quot;build&quot;, and &quot;test&quot; options.');
    process.exit(-1);
}

// Attempt to load the given module and return null if it fails.
function loadCustomizer(module) {
  try {
    return require(module);
  } catch(e) {
    if(e.code !== &quot;MODULE_NOT_FOUND&quot;) {
      throw e;
    }
  }

  // If the module doesn't exist, return a
  // noop that simply returns the config it's given.
  return config => config;
}

function rewireModule(modulePath, customizer) {
  // Load the module with `rewire`, which allows modifying the
  // script's internal variables.
  let defaults = rewire(modulePath);

  // Reach into the module, grab its global 'config' variable,
  // and pass it through the customizer function.
  // The customizer should *mutate* the config object, because
  // react-scripts imports the config as a `const` and we can't
  // modify that reference.
  let config = defaults.__get__('config');
  customizer(config);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
  本模块运行react-scripts里的脚本 (Create React App)
  可以自定义webpack配置，通过在项目根目录创建"config-overrides.dev.js" 、 "config-overrides.prod.js" 文件.

  A config-overrides file should export a single function that takes a
  config and modifies it as necessary.

  module.exports = function(webpackConfig) {
    webpackConfig.module.rules[0].use[0].options.useEslintrc = true;
  };
*/</span>
<span class="hljs-keyword">var</span> rewire = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rewire'</span>);
<span class="hljs-keyword">var</span> proxyquire = <span class="hljs-built_in">require</span>(<span class="hljs-string">'proxyquire'</span>);

<span class="hljs-keyword">switch</span>(process.argv[<span class="hljs-number">2</span>]) {
  <span class="hljs-comment">// The "start" script is run during development mode</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">'start'</span>:
    rewireModule(<span class="hljs-string">'react-scripts/scripts/start.js'</span>, loadCustomizer(<span class="hljs-string">'../config-overrides.dev'</span>));
    <span class="hljs-keyword">break</span>;
  <span class="hljs-comment">// The "build" script is run to produce a production bundle</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">'build'</span>:
    rewireModule(<span class="hljs-string">'react-scripts/scripts/build.js'</span>, loadCustomizer(<span class="hljs-string">'../config-overrides.prod'</span>));
    <span class="hljs-keyword">break</span>;
  <span class="hljs-comment">// The "test" script runs all the tests with Jest</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">'test'</span>:
    <span class="hljs-comment">// Load customizations from the config-overrides.testing file.</span>
    <span class="hljs-comment">// That file should export a single function that takes a config and returns a config</span>
    <span class="hljs-keyword">let</span> customizer = loadCustomizer(<span class="hljs-string">'../config-overrides.testing'</span>);
    proxyquire(<span class="hljs-string">'react-scripts/scripts/test.js'</span>, {
      <span class="hljs-comment">// When test.js asks for '../utils/createJestConfig' it will get this instead:</span>
      <span class="hljs-string">'../utils/createJestConfig'</span>: <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
        <span class="hljs-comment">// Use the existing createJestConfig function to create a config, then pass</span>
        <span class="hljs-comment">// it through the customizer</span>
        <span class="hljs-keyword">var</span> createJestConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react-scripts/utils/createJestConfig'</span>);
        <span class="hljs-keyword">return</span> customizer(createJestConfig(...args));
      }
    });
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">default</span>:
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'customized-config only supports "start", "build", and "test" options.'</span>);
    process.exit(<span class="hljs-number">-1</span>);
}

<span class="hljs-comment">// Attempt to load the given module and return null if it fails.</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadCustomizer</span>(<span class="hljs-params">module</span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-built_in">module</span>);
  } <span class="hljs-keyword">catch</span>(e) {
    <span class="hljs-keyword">if</span>(e.code !== <span class="hljs-string">"MODULE_NOT_FOUND"</span>) {
      <span class="hljs-keyword">throw</span> e;
    }
  }

  <span class="hljs-comment">// If the module doesn't exist, return a</span>
  <span class="hljs-comment">// noop that simply returns the config it's given.</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> config;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rewireModule</span>(<span class="hljs-params">modulePath, customizer</span>) </span>{
  <span class="hljs-comment">// Load the module with `rewire`, which allows modifying the</span>
  <span class="hljs-comment">// script's internal variables.</span>
  <span class="hljs-keyword">let</span> defaults = rewire(modulePath);

  <span class="hljs-comment">// Reach into the module, grab its global 'config' variable,</span>
  <span class="hljs-comment">// and pass it through the customizer function.</span>
  <span class="hljs-comment">// The customizer should *mutate* the config object, because</span>
  <span class="hljs-comment">// react-scripts imports the config as a `const` and we can't</span>
  <span class="hljs-comment">// modify that reference.</span>
  <span class="hljs-keyword">let</span> config = defaults.__get__(<span class="hljs-string">'config'</span>);
  customizer(config);
}</code></pre>
<p>为了跑通代码，你需要安装一些额外的依赖包:</p>
<blockquote><p>npm install --save rewire proxyquire</p></blockquote>
<p>你可以通过注释来了解它是如何工作的。最有趣的部分是位于底部的rewireModule方法，它使用rewire库来查看另一个文件，并获取定义在那里的配置变量的引用。</p>
<p>一旦你完成了这个操作，就可以为开发，生产，测试环境编写用来覆盖的配置文件。这一部分完全取决于你——无论你对CRA的Webpack配置做了什么改动，你都可以直接去做。</p>
<p>这些文件应该直接在CRA文件夹的根目录下，所有3个文件都是可选的。如果您想要重新配置它们的位置，只需改变上面“loadCustomizer”调用的路径。只是不要把它们放在“src”中就可以。</p>
<p>下面是一些开发环境替换配置的例子:</p>
<p>config-overrides.dev.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');

module.exports = function(config) {
  // 使用你自己的 ESLint 
  let eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;

  // Add the SASS loader second-to-last
  // (last one must remain as the &quot;file-loader&quot;)
  let loaderList = config.module.rules[1].oneOf;
  loaderList.splice(loaderList.length - 1, 0, {
    test: /\.scss$/,
    use: [&quot;style-loader&quot;, &quot;css-loader&quot;, &quot;sass-loader&quot;]
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code>const path = require('path');

<span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(config)</span> {</span>
  <span class="hljs-comment">// 使用你自己的 ESLint </span>
  <span class="hljs-built_in">let</span> eslintLoader = config.<span class="hljs-keyword">module</span>.rules[<span class="hljs-number">0</span>];
  eslintLoader.<span class="hljs-keyword">use</span>[<span class="hljs-number">0</span>].options.useEslintrc = <span class="hljs-literal">true</span>;

  <span class="hljs-comment">// Add the SASS loader second-to-last</span>
  <span class="hljs-comment">// (last one must remain as the "file-loader")</span>
  <span class="hljs-built_in">let</span> loaderList = config.<span class="hljs-keyword">module</span>.rules[<span class="hljs-number">1</span>].oneOf;
  loaderList.splice(loaderList.length - <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, {
    test: /\.scss$/,
    <span class="hljs-keyword">use</span>: [<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"sass-loader"</span>]
  });
}</code></pre>
<p>还需要创建一个config-overrides.prod.js文件具有相同的内容。开发过程中使用的是dev文件(例如npm start)，在构建期间使用prod文件(例如，npm run build)。</p>
<p>为了让刚刚的配置生效，你需要安装SASS loader, 和它的依赖node-sass:</p>
<blockquote><p>npm install --save sass-loader node-sass</p></blockquote>
<p>最后，要让这些新代码生效，你需要更改package.json，调用这些新的脚本，而不是默认的react-scripts的脚本。要做到这一点，可以用以下方法替换“start”、“build”和“test”。</p>
<p>package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;start&quot;: &quot;node scripts/customized-config start&quot;,
  &quot;build&quot;: &quot;node scripts/customized-config build&quot;,
  &quot;test&quot;: &quot;node scripts/customized-config test --env=jsdom&quot;,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"start"</span>: <span class="hljs-string">"node scripts/customized-config start"</span>,
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"node scripts/customized-config build"</span>,
  <span class="hljs-string">"test"</span>: <span class="hljs-string">"node scripts/customized-config test --env=jsdom"</span>,
}</code></pre>
<p>示例项目<br>一个CRA生成的项目，在github上，点击<a href="https://github.com/dceddia/create-react-app-customized" rel="nofollow noreferrer" target="_blank">这里</a>.</p>
<p>译者补充：<br>1.原文没有讲到默认的配置文件位置，是在<code>node_modules\react-scripts\config\</code>目录下的<br><code>webpack.config</code>开头的文件，例如：<code>webpack.config.dev.js</code><br>2.替换react为preact只需要在<code>config-overrides.dev.js</code>文件中加入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /*
  * 替换react为preact
  * */
  let alias = config.resolve.alias
  alias[&quot;react&quot;] = &quot;preact-compat&quot;
  alias[&quot;react-dom&quot;] = &quot;preact-compat&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>  <span class="hljs-comment">/*
  * 替换react为preact
  * */</span>
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">alias</span> = config.resolve.<span class="hljs-keyword">alias</span>
  <span class="hljs-keyword">alias</span>[<span class="hljs-string">"react"</span>] = <span class="hljs-string">"preact-compat"</span>
  <span class="hljs-keyword">alias</span>[<span class="hljs-string">"react-dom"</span>] = <span class="hljs-string">"preact-compat"</span></code></pre>
<p>相关资料：<br>preact替换react：<a href="https://preactjs.com/guide/switching-to-preact" rel="nofollow noreferrer" target="_blank">https://preactjs.com/guide/sw...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Create React App：不使用eject，自定义webpack配置

## 原文链接
[https://segmentfault.com/a/1190000011752103](https://segmentfault.com/a/1190000011752103)

