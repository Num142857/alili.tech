---
title: '手把手入门 Yeoman 模板开发' 
date: 2018-12-27 2:30:12
hidden: true
slug: jff80elzfm
categories: [reprint]
---

{{< raw >}}

                    
<p>对大多数一个前端团队来说，<a href="http://yeoman.io/" rel="nofollow noreferrer" target="_blank">Yeoman</a>(简称yo)是一个非常值得学习的工具，它为前端项目提供了一种行之有效的方法，开发、分发、使用项目手脚架，提高项目启动速度，复用项目结构。</p>
<p>本文以<a href="https://github.com/VanMess/generator-iview-admin" rel="nofollow noreferrer" target="_blank">generator-iview-admin</a> 为例，简单说明手脚架，即generator的开发过程。</p>
<h1 id="articleHeader0">准备</h1>
<p>开发 <a href="http://yeoman.io/" rel="nofollow noreferrer" target="_blank">Yeoman</a> 模板，需预先安装<code>yo</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g yo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm i -g yo</code></pre>
<p>yo 细心的为我们准备了手脚架项目的手脚架<a href="https://github.com/yeoman/generator-generator" rel="nofollow noreferrer" target="_blank">generator-generator</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g generator-generator" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm i -g generator-generator</code></pre>
<p>安装后，进入开发目录，运行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yo generator" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yo generator</code></pre>
<h1 id="articleHeader1">项目结构</h1>
<p>执行上述命令后，主要生成如下文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── .yo-rc.json
├── package.json
├── generators
│   ├── app
│       ├── templates
│           ├── dummyfile.txt
│       ├── index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── <span class="hljs-selector-class">.yo-rc</span><span class="hljs-selector-class">.json</span>
├── package<span class="hljs-selector-class">.json</span>
├── generators
│   ├── app
│       ├── templates
│           ├── dummyfile<span class="hljs-selector-class">.txt</span>
│       ├── index.js</code></pre>
<p>其中</p>
<ul>
<li>
<code>.yo-rc.json</code> 用于存储项目配置，一般不会用到，无需关注</li>
<li>
<code>package.json</code> npm 项目信息文件，主要关注 author、version 域即可</li>
<li>
<code>generators</code> 目录即项目模板代码</li>
<li>
<code>generators/templates</code> 用于存放项目模板文件</li>
<li>
<code>generators/app/index.js</code> 定义项目手脚架的代码</li>
</ul>
<h1 id="articleHeader2">开发</h1>
<p>每个generator都会继承<code>yeoman-generator</code>类，即上述的<code>generators/app/index.js</code>文件。该类有几个重要的生命周期节点：</p>
<ol>
<li>
<code>initializing</code> - 初始化方法，用于获取项目状态、配置等</li>
<li>
<code>prompting</code> - 调用<a href="https://github.com/SBoudrias/Inquirer.js" rel="nofollow noreferrer" target="_blank">inquire</a>方法获取用户输入</li>
<li>
<code>configuring</code> - 保存配置，创建 <code>.editorconfig</code> 等文件</li>
<li>
<code>writing</code> - 执行文件写操作，即项目文件写入文件系统中</li>
<li>
<code>install</code> - 执行安装操作，需调用 <code>this.installDependencies</code> 方法</li>
<li>
<code>end</code> - 最后执行，可清楚临时文件等</li>
</ol>
<blockquote><p>上述方法均支持返回 <code>Promise</code> 方式实现异步操作，仅当返回的<code>Promise</code> 实例 <code>resolve</code> 时才会执行下一步操作。</p></blockquote>
<h2 id="articleHeader3">Step 1. 获取用户配置</h2>
<p>首先，我们需要在 <code>prompting</code> 中询问用户配置(完整实例在<a href="https://github.com/VanMess/generator-iview-admin/blob/master/generators/app/index.js#L7" rel="nofollow noreferrer" target="_blank">此处</a>)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prompting() {
  // Have Yeoman greet the user.
  this.log(yosay('Welcome to the divine ' + chalk.red('generator-iview-admin') + ' generator!'));

  const prompts = [{
    type: 'input',
    name: 'name',
    message: 'Your project name',
    default: this.appname
  }, {
    type: 'confirm',
    name: 'lint',
    message: 'Use ESLint to lint your code?'
  }, {
    name: 'lintStyle',
    type: 'list',
    message: 'Pick an ESLint preset',
    when(answers) {
      return answers.lint;
    },
    choices: [{
      name: 'Airbnb (https://github.com/airbnb/javascript)',
      value: 'airbnb',
      short: 'Airbnb'
    }, {
      name: 'Standard (https://github.com/feross/standard)',
      value: 'standard',
      short: 'Standard'
    }]
  }];

  return this.prompt(prompts).then((props) => {
    // To access props later use this.props.someAnswer;
    this.props = props;
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">prompting() {
  <span class="hljs-comment">// Have Yeoman greet the user.</span>
  <span class="hljs-keyword">this</span>.log(yosay(<span class="hljs-string">'Welcome to the divine '</span> + chalk.red(<span class="hljs-string">'generator-iview-admin'</span>) + <span class="hljs-string">' generator!'</span>));

  <span class="hljs-keyword">const</span> prompts = [{
    <span class="hljs-attr">type</span>: <span class="hljs-string">'input'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'name'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'Your project name'</span>,
    <span class="hljs-attr">default</span>: <span class="hljs-keyword">this</span>.appname
  }, {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'confirm'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'lint'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'Use ESLint to lint your code?'</span>
  }, {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'lintStyle'</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">'list'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'Pick an ESLint preset'</span>,
    when(answers) {
      <span class="hljs-keyword">return</span> answers.lint;
    },
    <span class="hljs-attr">choices</span>: [{
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Airbnb (https://github.com/airbnb/javascript)'</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-string">'airbnb'</span>,
      <span class="hljs-attr">short</span>: <span class="hljs-string">'Airbnb'</span>
    }, {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Standard (https://github.com/feross/standard)'</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-string">'standard'</span>,
      <span class="hljs-attr">short</span>: <span class="hljs-string">'Standard'</span>
    }]
  }];

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.prompt(prompts).then(<span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
    <span class="hljs-comment">// To access props later use this.props.someAnswer;</span>
    <span class="hljs-keyword">this</span>.props = props;
  });
}</code></pre>
<p>这里，将用户输入的结果配置到 <code>this.props</code> 对象中，方便后续访问。</p>
<h2 id="articleHeader4">Step 2. 定义模板</h2>
<p>yo 的核心，本质上是按需修改模板文件，一般包含三种方法：</p>
<ol>
<li>直接写入文件<br>  对于简单对象，如JSON，可以使用 <a href="https://github.com/VanMess/generator-iview-admin/blob/master/generators/app/index.js#L82" rel="nofollow noreferrer" target="_blank">initPackage</a> 方式。即：读入模板、按配置修改对象、写入文件</li>
<li>使用模板方式，将结果写入文件<br>  对于复杂文件，可使用 yo 提供的模板(<a href="http://ejs.co/" rel="nofollow noreferrer" target="_blank">ejs</a>)引擎进行编写。</li>
<li>通过AST树修改文件<br>  通过解析语法树，深入理解模板内容，一般用于修改已存在的文件内容。建议使用 <a href="https://github.com/ariya/esprima" rel="nofollow noreferrer" target="_blank">esprima</a>、<a href="https://github.com/cheeriojs/cheerio" rel="nofollow noreferrer" target="_blank">cheerio</a> 解析AST。</li>
</ol>
<p>以ejs方式为例，编写模板(完整实例在<a href="https://github.com/VanMess/generator-iview-admin/blob/master/generators/app/templates/src/main.js" rel="nofollow noreferrer" target="_blank">此处</a>):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% if(vueFile==='standalone'){ %>
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
<% } %>

...

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,<% if(vueFile==='runtime'){ %>
  render: h => h(App)<% } else if(vueFile==='standalone'){ %>
  template: '<App/>',
  components: { App }<% } %>
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;% <span class="hljs-keyword">if</span>(vueFile===<span class="hljs-string">'standalone'</span>){ %&gt;
<span class="hljs-comment">// The Vue build version to load with the `import` command</span>
<span class="hljs-comment">// (runtime-only or standalone) has been set in webpack.base.conf with an alias.</span>
&lt;% } %&gt;

...

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router,&lt;% <span class="hljs-keyword">if</span>(vueFile===<span class="hljs-string">'runtime'</span>){ %&gt;
  render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)&lt;% } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(vueFile===<span class="hljs-string">'standalone'</span>){ %&gt;
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attr">components</span>: { App }&lt;% } %&gt;
});
</code></pre>
<h2 id="articleHeader5">Step 3. 按需写入</h2>
<p>获取配置后，可以正式开始将模板写入硬盘中（完整实例在<a href="https://github.com/VanMess/generator-iview-admin/blob/master/generators/app/index.js#L71" rel="nofollow noreferrer" target="_blank">此处</a>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="writing() {
  this.initPackage();
  this.renderTplFile();
}

initPackage() {
  let pkg = this.fs.readJSON(this.templatePath('package.json'), {});
  const {
    props
  } = this;

  pkg = _.merge(pkg, {
    name: props.name,
    description: props.description
  });
  
  ... 
  
  this.fs.writeJSON(this.destinationPath('package.json'), pkg);
}

renderTplFile() {
  let target = [
    ...
    'src/components/Hello.vue',
  ];

  if (this.props.unitTest) {
    target = target.concat([
      ...
      'build/webpack.test.conf.js'
    ]);
  }
  ...
  _.forEach(target, (file) => {
    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(file),
      this.props
    );
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">writing() {
  <span class="hljs-keyword">this</span>.initPackage();
  <span class="hljs-keyword">this</span>.renderTplFile();
}

initPackage() {
  <span class="hljs-keyword">let</span> pkg = <span class="hljs-keyword">this</span>.fs.readJSON(<span class="hljs-keyword">this</span>.templatePath(<span class="hljs-string">'package.json'</span>), {});
  <span class="hljs-keyword">const</span> {
    props
  } = <span class="hljs-keyword">this</span>;

  pkg = _.merge(pkg, {
    <span class="hljs-attr">name</span>: props.name,
    <span class="hljs-attr">description</span>: props.description
  });
  
  ... 
  
  this.fs.writeJSON(<span class="hljs-keyword">this</span>.destinationPath(<span class="hljs-string">'package.json'</span>), pkg);
}

renderTplFile() {
  <span class="hljs-keyword">let</span> target = [
    ...
    <span class="hljs-string">'src/components/Hello.vue'</span>,
  ];

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.unitTest) {
    target = target.concat([
      ...
      <span class="hljs-string">'build/webpack.test.conf.js'</span>
    ]);
  }
  ...
  _.forEach(target, (file) =&gt; {
    <span class="hljs-keyword">this</span>.fs.copyTpl(
      <span class="hljs-keyword">this</span>.templatePath(file),
      <span class="hljs-keyword">this</span>.destinationPath(file),
      <span class="hljs-keyword">this</span>.props
    );
  });
}</code></pre>
<p>yo 提供<a href="https://github.com/sboudrias/mem-fs-editor" rel="nofollow noreferrer" target="_blank">mem-fs-editor</a>实例接口，包含一系列fs工具：</p>
<ul>
<li>
<code>this.fs.read</code> - 读取文件</li>
<li>
<code>this.fs.readJSON</code> - 以JSON方式读取文件</li>
<li>
<code>this.fs.write</code> - 写文件</li>
<li>
<code>this.fs.writeJson</code> - 以JSON 方式写文件</li>
<li>
<code>this.fs.append</code> - 将内容已追加方式写入文件</li>
<li>
<code>this.fs.extendJSON</code> - 扩展JSON文件内容</li>
<li>
<code>this.fs.delete</code> - 删除文件</li>
</ul>
<p>此外，还有一系列路劲及模板接口：</p>
<ol>
<li>
<code>this.fs.copyTpl</code> - 复制模板文件，并按参数解析模板内容，写入目标文件中</li>
<li>
<code>this.templatePath</code> - 返回模板文件路径，即上述 <code>generator/app/templates</code> 中的文件路径</li>
<li>
<code>this.destinationPath</code> - 返回目标文件路径，即执行 yo 生成模板文件的路径</li>
<li>
<code>this.registerTransformStream</code> - 生命钩子接口，用于转化文件内容，兼容<code>gulp</code>插件</li>
</ol>
<p>至此，我们已了解开发一个yo模板所需要的所有接口。</p>
<h1 id="articleHeader6">添加子模板</h1>
<p>yo允许添加任意数量的子模板，只需执行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yo generator:subgenerator [name]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yo generator:subgenerator [name]</code></pre>
<p>以<code>yo generator:subgenerator test</code> 为例，生成如下文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── generators
│   ├── app
│   ├── test
│       ├── templates
│           ├── dummyfile.txt
│       ├── index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>├── <span class="hljs-selector-tag">generators</span>
│   ├── <span class="hljs-selector-tag">app</span>
│   ├── <span class="hljs-selector-tag">test</span>
│       ├── <span class="hljs-selector-tag">templates</span>
│           ├── <span class="hljs-selector-tag">dummyfile</span><span class="hljs-selector-class">.txt</span>
│       ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span></code></pre>
<p>templates、 index.js 文件的作用与上述无异，可直接开发。</p>
<h1 id="articleHeader7">试运行</h1>
<p>可以通过如下方式，将项目加入本地generator 库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm link" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm link</code></pre>
<p>之后，就可以执行如下命令，生成手脚架:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yo [your template name]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yo [your template name]</code></pre>
<h1 id="articleHeader8">发布</h1>
<p>模板开发完毕后，如需发布可执行如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm publish</code></pre>
<blockquote>
<p>注意：</p>
<ol>
<li>如果npm尚未登录，可执行 <code>npm adduser</code> 操作进行登录</li>
<li>发布npm包必须使用 <code>https://registry.npmjs.org/</code> 源，切记切换。</li>
</ol>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手入门 Yeoman 模板开发

## 原文链接
[https://segmentfault.com/a/1190000011768994](https://segmentfault.com/a/1190000011768994)

