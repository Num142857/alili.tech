---
title: '前端单元测试之Karma环境搭建' 
date: 2019-02-04 2:30:57
hidden: true
slug: qj0n94ckw6a
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在前端开发中，测试常常是被忽略的一环。因此最近在研究前端自动化测试框架Karma，把个人的学习过程分享出来，希望对大家有帮助。</p>
<h2 id="articleHeader1">什么是Karma？</h2>
<p>Karma是由Google团队开发的一套前端测试运行框架。它不同于测试框架（例如jasmine，mocha等），运行在这些测试框架之上。主要完成一下工作：</p>
<ol>
<li><p>Karma启动一个web服务器，生成包含js源代码和js测试脚本的页面；</p></li>
<li><p>运行浏览器加载页面，并显示测试的结果；</p></li>
<li><p>如果开启检测，则当文件有修改时，执行继续执行以上过程。</p></li>
</ol>
<h2 id="articleHeader2">Karma的安装配置</h2>
<h3 id="articleHeader3">初始项目结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="karma-example
    ├── src
         ├── index.js
    ├── test
    ├── package.json
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>karma-example
    ├── src
         ├── index<span class="hljs-selector-class">.js</span>
    ├── test
    ├── package<span class="hljs-selector-class">.json</span>
</code></pre>
<p>index.js的内容如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isNum(num) {
  if (typeof num === 'number') {
    return true
  } else {
    return false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isNum</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> num === <span class="hljs-string">'number'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }
}</code></pre>
<h3 id="articleHeader4">安装Karma环境</h3>
<p>为了方便搭建Karma环境，我们可以全局安装<code>karma-cli</code>来帮我们初始化测试环境：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g karma-cli
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -g karma-cli
</code></pre>
<p>然后在项目中安装karma包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev karma
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> karma
</code></pre>
<p>接下来在工程目录中运行<code>karma init</code>来进行测试环境初始化，并按照指示一步步完成。</p>
<p><span class="img-wrap"><img data-src="/img/bVC39F?w=763&amp;h=561" src="https://static.alili.tech/img/bVC39F?w=763&amp;h=561" alt="Karma Config Example" title="Karma Config Example" style="cursor: pointer; display: inline;"></span></p>
<p>上图是选项的示例，这里使用jasmine测试框架，PhantomJS作为代码运行的环境（也可以选择其他浏览器作为运行环境，比如Chrome，IE等）。最后在项目中生成karma.conf.js文件。</p>
<p>至此就搭建好了基本的Karma运行环境。</p>
<h3 id="articleHeader5">运行Karma</h3>
<p>在test目录里编写一个简单的测试脚本，我们使用的是jasmine测试框架，具体的api可以参考<a href="http://jasmine.github.io/2.5/introduction.html" rel="nofollow noreferrer" target="_blank">jasmine api</a>，内容如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('index.js: ', function() {
  it('isNum() should work fine.', function() {
    expect(isNum(1)).toBe(true)
    expect(isNum('1')).toBe(false)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code class="javascritp">describe('index.js: ', function() {
  it('isNum() should work fine.', function() {
    expect(<span class="hljs-name">isNum</span>(<span class="hljs-number">1</span>)).toBe(<span class="hljs-name">true</span>)
    expect(<span class="hljs-name">isNum</span>('<span class="hljs-number">1</span>')).toBe(<span class="hljs-name">false</span>)
  })
})</code></pre>
<p>然后在项目根目录下运行<code>karma start</code>命令,我们可以看到运行的结果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVC4bB?w=768&amp;h=140" src="https://static.alili.tech/img/bVC4bB?w=768&amp;h=140" alt="Karma Running Result" title="Karma Running Result" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，运行的结果显示测试成功。</p>
<p>同时，因为我们之前设置了监控文件的修改，所以当我们修改源文件或者测试脚本的时候，Karma会自动帮我们再次运行，无需我们手动操作。</p>
<h3 id="articleHeader6">Coverage</h3>
<p>如何衡量测试脚本的质量呢？其中一个参考指标就是代码覆盖率（coverage）。</p>
<p>什么是代码覆盖率？简而言之就是测试中运行到的代码占所有代码的比率。其中又可以分为行数覆盖率，分支覆盖率等。具体的含义不再细说，有兴趣的可以自行查阅资料。</p>
<p>虽然并不是说代码覆盖率越高，测试的脚本写得越好（可以看看参考文献4），但是代码覆盖率对撰写测试脚本还是有一定的指导意义的。因此接下来我们在Karma环境中添加Coverage。</p>
<p>首先安装好Karma覆盖率工具</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev karma-coverage
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> karma-coverage
</code></pre>
<p>然后修改配置文件karma.conf.js，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],
    exclude: [],

    // modified
    preprocessors: {
        'src/**/*.js': ['coverage']
    },

    //modified
    reporters: ['progress', 'coverage'],

    // add
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>
module.exports = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(config)</span> {</span>
  config.<span class="hljs-keyword">set</span>({
    basePath: <span class="hljs-string">''</span>,
    framework<span class="hljs-variable">s:</span> [<span class="hljs-string">'jasmine'</span>],
    <span class="hljs-keyword">file</span><span class="hljs-variable">s:</span> [
      <span class="hljs-string">'src/**/*.js'</span>,
      <span class="hljs-string">'test/**/*.js'</span>
    ],
    exclude: [],

    // modified
    preprocessor<span class="hljs-variable">s:</span> {
        <span class="hljs-string">'src/**/*.js'</span>: [<span class="hljs-string">'coverage'</span>]
    },

    //modified
    reporter<span class="hljs-variable">s:</span> [<span class="hljs-string">'progress'</span>, <span class="hljs-string">'coverage'</span>],

    // <span class="hljs-built_in">add</span>
    coverageReporter: {
      <span class="hljs-built_in">type</span> : <span class="hljs-string">'html'</span>,
      dir : <span class="hljs-string">'coverage/'</span>
    },

    por<span class="hljs-variable">t:</span> <span class="hljs-number">9876</span>,
    color<span class="hljs-variable">s:</span> true,
    logLeve<span class="hljs-variable">l:</span> config.LOG_INFO,
    autoWatch: true,
    browser<span class="hljs-variable">s:</span> [<span class="hljs-string">'PhantomJS'</span>],
    singleRun: false,
    concurrency: Infinity
  })
}
</code></pre>
<p>再运行<code>karma start</code>后，会在目录下生成coverage目录，里面有本次测试的覆盖报告。打开后的结果如下</p>
<p><span class="img-wrap"><img data-src="/img/bVC4eR?w=923&amp;h=563" src="https://static.alili.tech/img/bVC4eR?w=923&amp;h=563" alt="Coverage" title="Coverage" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">使用Webpack+Babel</h3>
<p>在实际项目中，有事会需要用到Webpack和ES6，所以接下来将Webpack和Babel集成进Karma环境中。</p>
<p>安装karma-webpack</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev karma-webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> karma-webpack
</code></pre>
<p>安装babel</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev babel-loader babel-core babel-preset-es2015
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">npm</span> i --save-dev <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-es2015
</span></code></pre>
<p>然后文件进行改造，<code>src/index.js</code>文件修改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isNum(num) {
  if (typeof num === 'number') {
    return true
  } else {
    return false
  }
}

exports.isNum = isNum
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isNum</span><span class="hljs-params">(num)</span> </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> num === <span class="hljs-string">'number'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }
}

exports.isNum = isNum
</code></pre>
<p><code>text/index.js</code>文件修改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Util = require('../src/index')

describe('index.js: ', () => {
  it('isNum() should work fine.', () => {
    expect(Util.isNum(1)).toBe(true)
    expect(Util.isNum('1')).toBe(false)
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>const Util = require('../src/index')

describe('index.js: ', () =&gt; {
  it('isNum() should work fine.', () =&gt; {
    expect(<span class="hljs-name">Util</span>.isNum(<span class="hljs-number">1</span>)).toBe(<span class="hljs-name">true</span>)
    expect(<span class="hljs-name">Util</span>.isNum('<span class="hljs-number">1</span>')).toBe(<span class="hljs-name">false</span>)
  })
})
</code></pre>
<p>接下来修改配置文件karma.conf.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*.js'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.js': ['webpack', 'coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }]
      }
    }
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">function(config)</span> <span class="hljs-string">{</span>
  <span class="hljs-string">config.set({</span>
<span class="hljs-attr">    basePath:</span> <span class="hljs-string">''</span><span class="hljs-string">,</span>
<span class="hljs-attr">    frameworks:</span> <span class="hljs-string">['jasmine'],</span>
<span class="hljs-attr">    files:</span> <span class="hljs-string">[</span>
      <span class="hljs-string">'test/**/*.js'</span>
    <span class="hljs-string">],</span>
<span class="hljs-attr">    exclude:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">    preprocessors:</span> <span class="hljs-string">{</span>
      <span class="hljs-string">'test/**/*.js'</span><span class="hljs-string">:</span> <span class="hljs-string">['webpack',</span> <span class="hljs-string">'coverage'</span><span class="hljs-string">]</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    reporters:</span> <span class="hljs-string">['progress',</span> <span class="hljs-string">'coverage'</span><span class="hljs-string">],</span>
<span class="hljs-attr">    coverageReporter:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      type:</span> <span class="hljs-string">'html'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      dir:</span> <span class="hljs-string">'coverage/'</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    port:</span> <span class="hljs-number">9876</span><span class="hljs-string">,</span>
<span class="hljs-attr">    colors:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    logLevel:</span> <span class="hljs-string">config.LOG_INFO,</span>
<span class="hljs-attr">    autoWatch:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    browsers:</span> <span class="hljs-string">['PhantomJS'],</span>
<span class="hljs-attr">    singleRun:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    concurrency:</span> <span class="hljs-string">Infinity,</span>
<span class="hljs-attr">    webpack:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      module:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        loaders:</span> <span class="hljs-string">[{</span>
<span class="hljs-attr">          test:</span> <span class="hljs-string">/\.js$/,</span>
<span class="hljs-attr">          loader:</span> <span class="hljs-string">'babel'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          exclude:</span> <span class="hljs-string">/node_modules/,</span>
<span class="hljs-attr">          query:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            presets:</span> <span class="hljs-string">['es2015']</span>
          <span class="hljs-string">}</span>
        <span class="hljs-string">}]</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">})</span>
<span class="hljs-string">}</span>
</code></pre>
<p>注意这里的修改：</p>
<ol>
<li><p>files只留下test文件。因为webpack会自动把需要的其它文件都打包进来，所以只需要留下入口文件。</p></li>
<li><p>preprocessors也修改为test文件，并加入webpack域处理器</p></li>
<li><p>加入webpack配置选项。可以自己定制配置项，但是不需要entry和output。这里加上babel-loader来编译ES6代码</p></li>
</ol>
<p>运行<code>karma start</code>，成功了~</p>
<p>再看看Coverage，卧槽。。居然不是百分之百了。。。</p>
<p>原因很简单，webpack会加入一些代码，影响了代码的Coverage。如果我们引入了一些其它的库，比如jquery之类的，将源代码和库代码打包在一起后，覆盖率会更难看。。这样的Coverage就没有了参考的价值。</p>
<p>还好有大神给我们提供了解决方案，需要安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev babel-plugin-istanbul
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-plugin-istanbul
</code></pre>
<p>修改webpack中babel-loader的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.js$/,
  loader: 'babel',
  exclude: /node_modules/,
  query: {
    presets: ['es2015'],
    plugins: ['istanbul']
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">test</span>: /\.js$/,
  loader: <span class="hljs-string">'babel'</span>,
  exclude: /node_modules/,
  query: {
    presets: [<span class="hljs-string">'es2015'</span>],
    plugins: [<span class="hljs-string">'istanbul'</span>]
  }
}
</code></pre>
<p>因为这里引入了istanbul插件来检测Coverage，所以要把preprocessors里的<code>coverage</code>去掉。</p>
<p>搞定以后，运行<code>karma start</code>。当当当当~一切OK啦，尽情编写测试脚本把~</p>
<p>最后附上示例项目地址:<a href="https://github.com/xiaojimao18/karma-example" rel="nofollow noreferrer" target="_blank">karma-example</a></p>
<h2 id="articleHeader8">References</h2>
<ol>
<li><p><a href="https://karma-runner.github.io" rel="nofollow noreferrer" target="_blank">Karma</a></p></li>
<li><p><a href="http://www.syntaxsuccess.com/viewarticle/writing-jasmine-unit-tests-in-es6" rel="nofollow noreferrer" target="_blank">Karma using ES6</a></p></li>
<li><p><a href="http://jasmine.github.io/2.5/introduction.html" rel="nofollow noreferrer" target="_blank">Jasmine API</a></p></li>
<li><p><a href="http://www.infoq.com/cn/articles/test-coverage-rate-role" rel="nofollow noreferrer" target="_blank">测试覆盖（率）到底有什么用？</a></p></li>
<li><p><a href="https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html" rel="nofollow noreferrer" target="_blank">Just Say No to More End-to-End Tests</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端单元测试之Karma环境搭建

## 原文链接
[https://segmentfault.com/a/1190000006895064](https://segmentfault.com/a/1190000006895064)

