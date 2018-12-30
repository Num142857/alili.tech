---
title: '《Node.js在CLI下的工程化体系实践》成都OSC源创会分享总结' 
date: 2018-12-30 2:30:10
hidden: true
slug: xj9uv2b0lv
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>背景: 随着开发团队规模不断发展壮大，在人员增加的同时也带来了协作成本的增加，业务项目越来越多，类型也各不相同。常见的类型有组件类、活动类、基于React+redux的业务项目、RN项目、Node.js项目等等。如果想要对每个项目进行一些规范的约束比如Git提交规范、Javascript规范简直难于登天。所有的这些，只因为缺少一个好用的工程化工具。从项目创建、开发、构建、代码规范检查到最终项目上线，通过CLI可以提升效率，同时保障开发规范的实施。</p></blockquote>
<h3 id="articleHeader0">Node.js实现CLI的基本原理</h3>
<p>关键点在于package.json里面的bin字段。模块全局安装，对于类unix系统，在/usr/local/bin目录创建软链接；对于windows系统，在C:\Users\username\AppData\Roaming\npm目录创建软链接。<br>模块局部安装，会在项目内的./node_modules/.bin目录创建软链接。</p>
<h3 id="articleHeader1">现代化web工程的生命周期</h3>
<p>随着前端工程的不断演进，一方面工程变得日趋复杂，同时对规范和质量的诉求在不断增加。现代化web工程应该包含以下几个阶段：初始化、开发、构建、检查、发布。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011355232" src="https://static.alili.tech/img/remote/1460000011355232" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">痛点1：项目拷贝</h3>
<p>项目拷贝存在的问题显而易见，大致有以下三个方面：</p>
<ul>
<li>容易出错；一旦某个关键文件拷贝丢失或者错误，很可能需要耗费半天到一天的时间排查环境问题。</li>
<li>不同场景下对目录结构要求不同；平时开发过程中，工程通常会分为运营活动、Hybrid业务、入口级别的项目（对性能和体验有极致和苛刻的要求）。需要基于RN或者Node.js的首屏直出，还有常用的业务组件等的开发。</li>
<li>新的Feature和BugFix难以同步；某个同学开发过程中增加的新方法或者解决的bug很难传递给其它同学并且沉淀成经验积累下来。</li>
</ul>
<p>社区里面提供了完美的Yeoman解决方案，它是为了自动化项目的创建而生。Yeoman创建项目包括以下几个阶段：</p>
<ul>
<li>initializing:  初始化一些状态之类的，通常是和用户输入的 options 或者 arguments 打交道</li>
<li>prompting: 和用户交互的时候（命令行问答之类的）调用</li>
<li>configuring: 保存配置文件（如 .babelrc 等）</li>
<li>writing: 生成模板文件</li>
<li>install: 安装依赖</li>
<li>end:  结束部分，初始代码自动提交</li>
</ul>
<p>我们只需要继承Yeoman的Generator类做模板定制化，基于Yeoman的脚手架设计思路应该如下图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000011355233" src="https://static.alili.tech/img/remote/1460000011355233" alt="" title="" style="cursor: pointer;"></span></p>
<p>首先，开发者会和CLI进行交互，开发者会告诉CLI需要创建哪一种类型的项目，CLI收到命令后。从本地已经安装的Yeoman脚手架里面选择某种类型的模板。然后，CLI会调用Gitlab API在远程创建仓库并且授予开发者master权限。接下来，会根据实际业务场景需要，自动化申请一些打点信息，常见的如离线包id，监控告警id等等。之后，在本地目录生成代码并且安装项目依赖的npm包，最后将本次初始化生成的所有代码自动提交到远程Git仓库。</p>
<h3 id="articleHeader3">痛点2：运营配置频繁修改</h3>
<p>基于React+redux组件化开发方式中，一个页面或者webapp是由多个容器组件拼装后渲染而成。<br><span class="img-wrap"><img data-src="/img/remote/1460000011355234" src="https://static.alili.tech/img/remote/1460000011355234" alt="" title="" style="cursor: pointer;"></span></p>
<p>某个组件通常是由：模板、cgi数据和事件组成。理想情况下，开发和产品和平共处，你可以把一个组件写成下面这个样子，比如规则组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    return (
        <div className=&quot;lottery-rule&quot;>
            <div className=&quot;section&quot;>
                <h3>活动时间：</h3>
                <p>9月14日～9月30日</p>
            </div>
            <div className=&quot;section&quot;>
                <h3>活动规则：</h3>
                <p>1、活动期间，在NOW app上录制小视频，上传成功后即可参赛。</p>
                <p>2、根据参赛小视频获得的点赞数进行排行。</p>
                <p>3、按照城市评选，分别评选“明日之子”（仅限男性参加）和”闪亮女神“仅限女性参加。</p>
            </div>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"lottery-rule"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"section"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>活动时间：<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>9月14日～9月30日<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"section"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>活动规则：<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1、活动期间，在NOW app上录制小视频，上传成功后即可参赛。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2、根据参赛小视频获得的点赞数进行排行。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3、按照城市评选，分别评选“明日之子”（仅限男性参加）和”闪亮女神“仅限女性参加。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}</code></pre>
<p>咋一看，上面的写法没什么问题。实际确很可能是7、8次的文案修改，甚至对外入口开放后仍然要修改文案或者图片等静态数据。然后，你需要走代码发布流程。</p>
<p>更好的解决思路是：在开发某个业务组件之前，结合以往的经验，分析哪些静态数据很可能是需要高频次的修改。将这些高频次修改的静态数据抽离出来，对于万年不变的数据则没有必要抽出来。那么，如何将静态数据动态化呢？</p>
<p>答案是： <strong> Schema First </strong>， 开发组件之前先设计Schema，通过schema生成一个form表单，达到静态数据和模板分离。如果使用React开发，可以基于<a href="https://github.com/mozilla-services/react-jsonschema-form" rel="nofollow noreferrer" target="_blank">react-jsonschema-form</a>定制。静态数据和模板分离之后应该如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011355235" src="https://static.alili.tech/img/remote/1460000011355235" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">痛点3：缺少协作规范</h3>
<p>此处以Git commit规范为例子进行相关改进介绍。</p>
<p>良好的Git commit规范有以下优势：</p>
<ul>
<li>加快Review的流程</li>
<li>根据Commit元数据生成Changelog</li>
<li>后续维护者可以知道feature被添加的原因</li>
</ul>
<p>此处采用Google angular项目的提交作为参考，整理出Git commit的解决方案：<br><span class="img-wrap"><img data-src="/img/remote/1460000011355236" src="https://static.alili.tech/img/remote/1460000011355236" alt="" title="" style="cursor: pointer;"></span></p>
<p>具体的提交格式要求如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">type</span>&gt;</span>(<span class="hljs-tag">&lt;<span class="hljs-name">scope</span>&gt;</span>): <span class="hljs-tag">&lt;<span class="hljs-name">subject</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">BLANK</span> <span class="hljs-attr">LINE</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">BLANK</span> <span class="hljs-attr">LINE</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span></code></pre>
<p>对格式的说明如下：</p>
<ul>
<li>type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。所有的type类型如下：</li>
<li>feat： 新增feature</li>
<li>fix: 修复bug</li>
<li>docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等</li>
<li>style: 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑</li>
<li>refactor: 代码重构，没有加新功能或者修复bug</li>
<li>perf: 优化相关，比如提升性能、体验</li>
<li>test: 测试用例，包括单元测试、集成测试等</li>
<li>chore: 改变构建流程、或者增加依赖库、工具等</li>
<li>revert: 回滚到上一个版本</li>
</ul>
<p>一键生成Changelog版本日志：<br><span class="img-wrap"><img data-src="/img/remote/1460000011355237" src="https://static.alili.tech/img/remote/1460000011355237" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">痛点4: 缺少代码规范</h3>
<p>一次血淋淋的生产环境事故：2017年4月13日，腾讯高级工程师小圣在做充值业务时，修改了苹果iap支付配置，将JSON配置增加了重复的key。代码发布后，有小部分使用了vivo手机的用户反馈充值页面白屏，无法在Now app内进行充值。最后问题定位是：vivo手机使用了系统自带的webview而没有使用X5内核，解析JSON时遇到重复key报错，导致页面白屏。</p>
<p>分析：现代化的浏览器对于JSON里面的重复key会做兼容处理，但是某些老旧的浏览器内核并不会，比如此处的vivo手机，导致代码直接出错。那么，如何避免类似问题再次出现呢？</p>
<p>此处不得不提及ESLint，ESLint于2013年6月推出最新版本v4.6.0，是一款适用于Javascript和JSX的代码规范检查工具，相比JSLint和JSHint而言，它更加灵活，支持自定义配置、插件扩展和配置错误级别。虽然接入ESLint会给团队的同学增加不少代码修改的成本，但是从长远来看，收益肯定是大于付出的。</p>
<p>Javascript规范制定的原则：</p>
<ul>
<li>不重复造轮子，基于eslint:recommend 配置并改进</li>
<li>能够帮助发现代码错误的规则，全部开启</li>
<li>配置不应该依赖于某个具体项目，而应尽可能的合理</li>
<li>帮助保持团队的代码风格统一，而不是限制开发体验</li>
<li>有对应的解释文档</li>
</ul>
<p>为了更好的定制和维护Javascript规范，我们创建了eslint的<a href="https://github.com/iv-web/eslint-config-ivweb" rel="nofollow noreferrer" target="_blank">shareable config</a>。一方面，我们觉得eslint:recommend 里面的部分配置定义的错误级别过于严格，比如代码里面出现了console会导致校验错误，另一方面，它没有包含ESLint的最佳实践和其它规则。我们定义的部分规则解释如下：</p>
<table>
<thead><tr>
<th align="left">规则名称</th>
<th align="left">错误级别</th>
<th align="left">说明</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/for-direction" rel="nofollow noreferrer" target="_blank">for-direction</a></td>
<td align="left">error</td>
<td align="left">for 循环的方向要求必须正确</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/getter-return" rel="nofollow noreferrer" target="_blank">getter-return</a></td>
<td align="left">error</td>
<td align="left">getter必须有返回值，并且禁止返回值为undefined, 比如 return;</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/no-await-in-loop" rel="nofollow noreferrer" target="_blank">no-await-in-loop</a></td>
<td align="left">off</td>
<td align="left">允许在循环里面使用await</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/no-console" rel="nofollow noreferrer" target="_blank">no-console</a></td>
<td align="left">off</td>
<td align="left">允许在代码里面使用console</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/no-prototype-builtins" rel="nofollow noreferrer" target="_blank">no-prototype-builtins</a></td>
<td align="left">warn</td>
<td align="left">直接调用对象原型链上的方法</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/valid-jsdoc" rel="nofollow noreferrer" target="_blank">valid-jsdoc</a></td>
<td align="left">off</td>
<td align="left">函数注释一定要遵守jsdoc规则</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/no-template-curly-in-string" rel="nofollow noreferrer" target="_blank">no-template-curly-in-string</a></td>
<td align="left">warn</td>
<td align="left">在字符串里面出现{和}进行警告</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/accessor-pairs" rel="nofollow noreferrer" target="_blank">accessor-pairs</a></td>
<td align="left">warn</td>
<td align="left">getter和setter没有成对出现时给出警告</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/array-callback-return" rel="nofollow noreferrer" target="_blank">array-callback-return</a></td>
<td align="left">error</td>
<td align="left">对于数据相关操作函数比如reduce, map, filter等，callback必须有return</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/block-scoped-var" rel="nofollow noreferrer" target="_blank">block-scoped-var</a></td>
<td align="left">error</td>
<td align="left">把var关键字看成块级作用域，防止变量提升导致的bug</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/class-methods-use-this" rel="nofollow noreferrer" target="_blank">class-methods-use-this</a></td>
<td align="left">error</td>
<td align="left">要求在Class里面合理使用this，如果某个方法没有使用this,则应该申明为静态方法</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/complexity" rel="nofollow noreferrer" target="_blank">complexity</a></td>
<td align="left">off</td>
<td align="left">关闭代码复杂度限制</td>
</tr>
<tr>
<td align="left"><a href="https://eslint.org/docs/rules/default-case" rel="nofollow noreferrer" target="_blank">default-case</a></td>
<td align="left">error</td>
<td align="left">switch case语句里面一定需要default分支</td>
</tr>
</tbody>
</table>
<p>ESLint的执行可以接入到PUSH hook里面，步骤如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#1, 安装husky
$ npm install husky --save-dev

#2, 集成进npm script
{
  &quot;scripts&quot;: {
    &quot;precommit&quot;: &quot;validate-commit-msg&quot;,
    &quot;prepush&quot;: &quot;eslint src ./.eslintrc.js --ext '.js,.jsx'&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment">#1, 安装husky</span>
$ npm install husky --save-dev

<span class="hljs-comment">#2, 集成进npm script</span>
{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"validate-commit-msg"</span>,
    <span class="hljs-string">"prepush"</span>: <span class="hljs-string">"eslint src ./.eslintrc.js --ext '.js,.jsx'"</span>
  }
}</code></pre>
<h3 id="articleHeader6">CLI设计</h3>
<p>CLI的作用是将工程开发过程中遇到的一系列痛点问题连接起来，提升开发效率，同时保障规范的实施。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011355238" src="https://static.alili.tech/img/remote/1460000011355238" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">插件设计</h3>
<h4>插件实现原理</h4>
<p>这里有一个非常巧妙的设计，通过使用node提供的module和vm模块，可以通注入feflow全局变量来访问到cli的实例。从而能够访问cli上的各种属性，比如config, log和一些helper等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" loadPlugin(path, callback) {
    const self = this;

    return fs.readFile(path).then((script) => {

      const module = new Module(path);
      module.filename = path;
      module.paths = Module._nodeModulePaths(path);

      function require(path) {
          return module.require(path);
      }

      require.resolve = function(request) {
          return Module._resolveFilename(request, module);
      };

      require.main = process.mainModule;
      require.extensions = Module._extensions;
      require.cache = Module._cache;

      // Inject feflow variable
      script = '(function(exports, require, module, __filename, __dirname, feflow){' +
          script + '});';

      const fn = vm.runInThisContext(script, path);

      return fn(module.exports, require, module, path, pathFn.dirname(path), self);
      }).asCallback(callback);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> loadPlugin(path, callback) {
    <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>;

    <span class="hljs-keyword">return</span> fs.readFile(path).then(<span class="hljs-function">(<span class="hljs-params">script</span>) =&gt;</span> {

      <span class="hljs-keyword">const</span> <span class="hljs-built_in">module</span> = <span class="hljs-keyword">new</span> Module(path);
      <span class="hljs-built_in">module</span>.filename = path;
      <span class="hljs-built_in">module</span>.paths = Module._nodeModulePaths(path);

      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">require</span>(<span class="hljs-params">path</span>) </span>{
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.require(path);
      }

      <span class="hljs-built_in">require</span>.resolve = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request</span>) </span>{
          <span class="hljs-keyword">return</span> Module._resolveFilename(request, <span class="hljs-built_in">module</span>);
      };

      <span class="hljs-built_in">require</span>.main = process.mainModule;
      <span class="hljs-built_in">require</span>.extensions = Module._extensions;
      <span class="hljs-built_in">require</span>.cache = Module._cache;

      <span class="hljs-comment">// Inject feflow variable</span>
      script = <span class="hljs-string">'(function(exports, require, module, __filename, __dirname, feflow){'</span> +
          script + <span class="hljs-string">'});'</span>;

      <span class="hljs-keyword">const</span> fn = vm.runInThisContext(script, path);

      <span class="hljs-keyword">return</span> fn(<span class="hljs-built_in">module</span>.exports, <span class="hljs-built_in">require</span>, <span class="hljs-built_in">module</span>, path, pathFn.dirname(path), self);
      }).asCallback(callback);
  }</code></pre>
<h4>命令注册：</h4>
<p>命令需要以feflow.cmd.register进行注册，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="feflow.cmd.register('deps', 'Config ivweb dependencies', function(args) {
    console.log(args); 
    // Plugin logic here.
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>feflow.cmd.register(<span class="hljs-string">'deps'</span>, <span class="hljs-string">'Config ivweb dependencies'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">args</span>) </span>{
    <span class="hljs-built_in">console</span>.log(args); 
    <span class="hljs-comment">// Plugin logic here.</span>
});</code></pre>
<p>说明：</p>
<ul>
<li>register有3个参数，第一个是子命令名称，第二个是命令描述说明信息，第三个是对应的子命令执行逻辑函数。</li>
<li>feflow会将命令行参数args解析成Object对象，传递给插件处理函数</li>
</ul>
<h4>配置</h4>
<p>可以通过feflow.version获取当前feflow的版本，feflow.baseDir 获取feflow跟目录（在用户目录下的.feflow），通过feflow.pluginDir 获取插件目录</p>
<h4>日志</h4>
<p>通过feflow.log来进行相关命令行日志输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const log = feflow.log;
log.info() &nbsp;  // 提示日志，控制台中显示绿色
log.debug() &nbsp; // 调试日志,  命令行增加--debug可以开启，控制台中显示灰色
log.warn() &nbsp;  // 警告日志，控制台中显示黄色背景
log.error() &nbsp; // 错误日志，控制台中显示红色
log.fatal() &nbsp; // 致命错误日志，，控制台中显示红色" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> log = feflow.log;
log.info() &nbsp;  <span class="hljs-comment">// 提示日志，控制台中显示绿色</span>
log.debug() &nbsp; <span class="hljs-comment">// 调试日志,  命令行增加--debug可以开启，控制台中显示灰色</span>
log.warn() &nbsp;  <span class="hljs-comment">// 警告日志，控制台中显示黄色背景</span>
log.error() &nbsp; <span class="hljs-comment">// 错误日志，控制台中显示红色</span>
log.fatal() &nbsp; <span class="hljs-comment">// 致命错误日志，，控制台中显示红色</span></code></pre>
<h3 id="articleHeader8">最后</h3>
<p>感谢OSC源创汇提供的交流机会，能和广大开发者分享和交流学习，CLI源代码托管在Github和码云上：</p>
<ul>
<li>Github主页：<a href="https://github.com/cpselvis/feflow-cli" rel="nofollow noreferrer" target="_blank">https://github.com/cpselvis/f...</a>
</li>
<li>码云主页：<a href="https://gitee.com/cpselvis/feflow-cli" rel="nofollow noreferrer" target="_blank">https://gitee.com/cpselvis/fe...</a>
</li>
</ul>
<p>附件：<a href="https://github.com/cpselvis/sharing/blob/master/ppt/%E6%88%90%E9%83%BDOSC%E5%88%86%E4%BA%AB2017-09-23/Node.js%E5%9C%A8CLI%E4%B8%8B%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%BD%93%E7%B3%BB%E5%AE%9E%E8%B7%B5.pdf" rel="nofollow noreferrer" target="_blank">本次分享PPT</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《Node.js在CLI下的工程化体系实践》成都OSC源创会分享总结

## 原文链接
[https://segmentfault.com/a/1190000011355227](https://segmentfault.com/a/1190000011355227)

