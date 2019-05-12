---
title: 'npm 脚本命令 学习笔记' 
date: 2019-01-19 2:30:09
hidden: true
slug: qzbcwlmubc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是 npm 脚本？</h2>
<p>在package.json文件里面，使用scripts字段定义的脚本命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // ...
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;node build.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  // ...
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build.js"</span>
  }
}</code></pre>
<h2 id="articleHeader1">如何执行是 npm 脚本？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build
# 等同于执行
$ node build.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ npm run build
<span class="hljs-comment"># 等同于执行</span>
$ <span class="hljs-keyword">node</span> <span class="hljs-title">build</span>.js</code></pre>
<h2 id="articleHeader2">不知道有什么 npm 脚本？？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#查看当前项目的所有 npm 脚本命令
#(其实也可以在package.json的看scripts对象里有什么属性)
npm run" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs leaf"><code>#查看当前项目的所有 npm 脚本命令
<span class="hljs-function"><span class="hljs-keyword">#</span><span class="hljs-params">(其实也可以在<span class="hljs-variable">package</span>.<span class="hljs-variable">json</span>的看<span class="hljs-variable">scripts</span>对象里有什么属性)</span></span>
npm run</code></pre>
<h2 id="articleHeader3">npm的原理？？</h2>
<blockquote>
<p>每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。<br>因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。</p>
<p>比较特别的是，npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。</p>
<p>由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是0，npm 就认为这个脚本执行失败。</p>
</blockquote>
<h2 id="articleHeader4">通配符&amp;转义</h2>
<p>同shell</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// *表示任意文件名，**表示任意一层子目录
&quot;lint&quot;: &quot;jshint *.js&quot;
&quot;lint&quot;: &quot;jshint **/*.js&quot;
// 将通配符传入原始命令，防止被 Shell 转义，要将星号转义
&quot;test&quot;: &quot;tap test/\*.js&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// *表示任意文件名，**表示任意一层子目录</span>
<span class="hljs-string">"lint"</span>: <span class="hljs-string">"jshint *.js"</span>
<span class="hljs-string">"lint"</span>: <span class="hljs-string">"jshint **/*.js"</span>
<span class="hljs-comment">// 将通配符传入原始命令，防止被 Shell 转义，要将星号转义</span>
<span class="hljs-string">"test"</span>: <span class="hljs-string">"tap test/\*.js"</span></code></pre>
<h2 id="articleHeader5">传参</h2>
<p>向 npm 脚本传入参数，要使用--标明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# package.json
&quot;deploy&quot;: &quot;gulp deploy&quot;,
# 命令行
$ npm run deploy -- --test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-comment"># package.json</span>
<span class="hljs-string">"deploy"</span>: <span class="hljs-string">"gulp deploy"</span>,
<span class="hljs-comment"># 命令行</span>
$ npm <span class="hljs-built_in">run</span> deploy <span class="hljs-comment">-- --test</span></code></pre>
<h2 id="articleHeader6">一个命令执行多个任务？？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#并行执行（即同时的平行执行），使用&amp;符号
$ npm run serve &amp; npm run dev
#继发执行（即只有前一个任务成功，才执行下一个任务），使用&amp;&amp;符号
$ npm run build &amp;&amp; npm run deploy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment">#并行执行（即同时的平行执行），使用&amp;符号</span>
$ npm <span class="hljs-keyword">run</span><span class="bash"> serve &amp; npm run dev
</span><span class="hljs-comment">#继发执行（即只有前一个任务成功，才执行下一个任务），使用&amp;&amp;符号</span>
$ npm <span class="hljs-keyword">run</span><span class="bash"> build &amp;&amp; npm run deploy</span></code></pre>
<h2 id="articleHeader7">默认脚本</h2>
<p>不用定义，就可以直接使用(前提是项目根目录下有server.js脚本和rebuild文件)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;start&quot;: &quot;node server.js&quot;，
&quot;install&quot;: &quot;node-gyp rebuild&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>"<span class="hljs-keyword">start</span><span class="hljs-string">": "</span>node server.js<span class="hljs-string">"，
"</span><span class="hljs-keyword">install</span><span class="hljs-string">": "</span>node-gyp <span class="hljs-keyword">rebuild</span><span class="hljs-string">"</span></code></pre>
<h2 id="articleHeader8">钩子</h2>
<p>npm 脚本有pre和post两个钩子</p>
<p><strong>例子</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# package.json
&quot;prebuild&quot;: &quot;echo I run before the build script&quot;,
&quot;build&quot;: &quot;cross-env NODE_ENV=production webpack&quot;,
&quot;postbuild&quot;: &quot;echo I run after the build script&quot;,
# 命令行
$ npm run build
# 等同于执行
$ npm run prebuild &amp;&amp; npm run build &amp;&amp; npm run postbuild" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code><span class="hljs-comment"># package.json</span>
<span class="hljs-string">"prebuild"</span>: <span class="hljs-string">"echo I run before the build script"</span>,
<span class="hljs-string">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack"</span>,
<span class="hljs-string">"postbuild"</span>: <span class="hljs-string">"echo I run after the build script"</span>,
<span class="hljs-comment"># 命令行</span>
$ npm <span class="hljs-keyword">run</span><span class="bash"> build
</span><span class="hljs-comment"># 等同于执行</span>
$ npm <span class="hljs-keyword">run</span><span class="bash"> prebuild &amp;&amp; npm run build &amp;&amp; npm run postbuild</span></code></pre>
<blockquote><p>自定义的脚本命令也可以加上pre和post钩子。比如，myscript这个脚本命令，也有premyscript和postmyscript钩子。不过，双重的pre和post无效，比如prepretest和postposttest是无效的。</p></blockquote>
<p><strong>默认的钩子</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart</code></pre>
<p><strong>npm_lifecycle_event变量</strong> (返回当前正在运行的脚本名称,pretest、test、posttest)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#利用这个变量，在同一个脚本文件里面，为不同的npm scripts命令编写代码
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
  console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
  console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
  console.log(`Running the posttest task!`);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>#利用这个变量，在同一个脚本文件里面，为不同的npm scripts命令编写代码
const TARGET = process.env.npm_lifecycle_event;

<span class="hljs-keyword">if</span> (TARGET === <span class="hljs-string">'test'</span>) {
  console.log(`Running the test task!`);
}

<span class="hljs-keyword">if</span> (TARGET === <span class="hljs-string">'pretest'</span>) {
  console.log(`Running the pretest task!`);
}

<span class="hljs-keyword">if</span> (TARGET === <span class="hljs-string">'posttest'</span>) {
  console.log(`Running the posttest task!`);
}</code></pre>
<blockquote><p>注意，prepublish这个钩子不仅会在npm publish命令之前运行，还会在npm install（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子prepare，行为等同于prepublish，而从 npm 5 开始，prepublish将只在npm publish命令之前运行。</p></blockquote>
<h2 id="articleHeader9">简写</h2>
<ul>
<li><p>npm start是npm run start的简写</p></li>
<li><p>npm stop是npm run stop的简写</p></li>
<li><p>npm test是npm run test的简写</p></li>
<li><p>npm restart是npm run stop &amp;&amp; npm run restart &amp;&amp; npm run start的简写</p></li>
</ul>
<p>执行顺序<br>1 prerestart<br>2 prestop<br>3 stop<br>4 poststop<br>5 restart<br>6 prestart<br>7 start<br>8 poststart<br>9 postrestart</p>
<h2 id="articleHeader10">npm 的内部变量</h2>
<p>通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段<br>(如果是 Bash 脚本，可以用$npm_package_前缀取值)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
{
  &quot;name&quot;: &quot;foo&quot;, 
  &quot;version&quot;: &quot;1.2.5&quot;,
  &quot;config&quot; : { &quot;port&quot; : &quot;8080&quot; },
  &quot;scripts&quot;: {
    &quot;view&quot;: &quot;node view.js&quot;,
    &quot;start&quot; : &quot;node server.js&quot;
  }
}

// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version_view); // node view.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-comment">// package.json</span>
{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"foo"</span>, 
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.2.5"</span>,
  <span class="hljs-string">"config"</span> : { <span class="hljs-string">"port"</span> : <span class="hljs-string">"8080"</span> },
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"view"</span>: <span class="hljs-string">"node view.js"</span>,
    <span class="hljs-string">"start"</span> : <span class="hljs-string">"node server.js"</span>
  }
}

<span class="hljs-comment">// view.js</span>
console.<span class="hljs-keyword">log</span>(process.<span class="hljs-keyword">env</span>.npm_package_name); <span class="hljs-comment">// foo</span>
console.<span class="hljs-keyword">log</span>(process.<span class="hljs-keyword">env</span>.npm_package_version_view); <span class="hljs-comment">// node view.js</span></code></pre>
<p>npm 脚本还可以通过npm_config_前缀，拿到 npm 的配置变量，即npm config get xxx命令返回的值。<br>比如，当前模块的发行标签，可以通过npm_config_tag取到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;view&quot;: &quot;echo $npm_config_tag&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"view"</span>: <span class="hljs-string">"echo <span class="hljs-variable">$npm_config_tag</span>"</span>,</code></pre>
<p><strong>注意</strong> package.json里面的config对象，可以被环境变量覆盖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm config set foo:port 80" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">$ npm config <span class="hljs-built_in">set</span> foo:<span class="hljs-keyword">port</span> <span class="hljs-number">80</span></code></pre>
<h2 id="articleHeader11">列出所有环境变量</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;env&quot;: &quot;env&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"env"</span>: <span class="hljs-string">"env"</span></code></pre>
<h2 id="articleHeader12">常用脚本示例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 删除目录
&quot;clean&quot;: &quot;rimraf dist/*&quot;,

// 本地搭建一个 HTTP 服务
&quot;serve&quot;: &quot;http-server -p 9090 dist/&quot;,

// 打开浏览器
&quot;open:dev&quot;: &quot;opener http://localhost:9090&quot;,

// 实时刷新
 &quot;livereload&quot;: &quot;live-reload --port 9091 dist/&quot;,

// 构建 HTML 文件
&quot;build:html&quot;: &quot;jade index.jade > dist/index.html&quot;,

// 只要 CSS 文件有变动，就重新执行构建
&quot;watch:css&quot;: &quot;watch 'npm run build:css' assets/styles/&quot;,

// 只要 HTML 文件有变动，就重新执行构建
&quot;watch:html&quot;: &quot;watch 'npm run build:html' assets/html&quot;,

// 部署到 Amazon S3
&quot;deploy:prod&quot;: &quot;s3-cli sync ./dist/ s3://example-com/prod-site/&quot;,

// 构建 favicon
&quot;build:favicon&quot;: &quot;node scripts/favicon.js&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-comment">// 删除目录</span>
<span class="hljs-string">"clean"</span>: <span class="hljs-string">"rimraf dist/*"</span>,

<span class="hljs-comment">// 本地搭建一个 HTTP 服务</span>
<span class="hljs-string">"serve"</span>: <span class="hljs-string">"http-server -p 9090 dist/"</span>,

<span class="hljs-comment">// 打开浏览器</span>
<span class="hljs-string">"open:dev"</span>: <span class="hljs-string">"opener http://localhost:9090"</span>,

<span class="hljs-comment">// 实时刷新</span>
 <span class="hljs-string">"livereload"</span>: <span class="hljs-string">"live-reload --port 9091 dist/"</span>,

<span class="hljs-comment">// 构建 HTML 文件</span>
<span class="hljs-string">"build:html"</span>: <span class="hljs-string">"jade index.jade &gt; dist/index.html"</span>,

<span class="hljs-comment">// 只要 CSS 文件有变动，就重新执行构建</span>
<span class="hljs-string">"watch:css"</span>: <span class="hljs-string">"watch '</span>npm run build:css' assets/styles/<span class="hljs-string">",

// 只要 HTML 文件有变动，就重新执行构建
"</span>watch:html<span class="hljs-string">": "</span>watch <span class="hljs-string">'npm run build:html'</span> assets/html<span class="hljs-string">",

// 部署到 Amazon S3
"</span>deploy:<span class="hljs-built_in">prod</span><span class="hljs-string">": "</span>s3-cli sync ./dist/ s3:<span class="hljs-comment">//example-com/prod-site/",</span>

<span class="hljs-comment">// 构建 favicon</span>
<span class="hljs-string">"build:favicon"</span>: <span class="hljs-string">"node scripts/favicon.js"</span>,</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
npm 脚本命令 学习笔记

## 原文链接
[https://segmentfault.com/a/1190000008634604](https://segmentfault.com/a/1190000008634604)

