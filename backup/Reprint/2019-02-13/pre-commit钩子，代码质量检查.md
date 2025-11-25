---
title: 'pre-commit钩子，代码质量检查' 
date: 2019-02-13 2:31:22
hidden: true
slug: jkj0jniub9e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>目前基本使用三款js代码质量检查工具： jslint, jshint, eslint。许多IDE里面也有对应的检查插件，在每次ctrl + s 保存文件的时候，检查当前文件是否符合规范，保证代码质量。<br>许多团队都会指定一套代码规范code review,更加严格的检查每次代码修改。 也可以在<code>git commit</code>之前，检查代码，保证所有提交到版本库中的代码都是符合规范的，</blockquote>
<p><em>在看vue源码时，不免修改代码，就会触发里面配置好的钩子函数。于是，仔细研究了一下vue配置方法，可以发现配置非常简单。</em></p>
<p><a href="https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90" rel="nofollow noreferrer" target="_blank"> git 钩子文档</a>上介绍非常详细，<code>git init</code>后，在<code>.git/hooks</code>文件中，有一些<code>.simple</code>结尾的钩子示例脚本，如果想启用对应的钩子函数，只需手动删除后缀。所以，列出两种配置方法：</p>
<h3 id="articleHeader0">1. 手动修改钩子文件</h3>
<p>按照文档上，配置钩子脚本，修改hooks中文件名对应的钩子文件，启用钩子。使用shell脚本检查，<a href="https://github.com/vuejs/vue/blob/v1.0.26/build/git-hooks/pre-commit" rel="nofollow noreferrer" target="_blank">可以参考vue1.x 里面如何使用</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    !/usr/bin/env bash
    
     # get files to be linted
    FILES=$(git diff --cached --name-only | grep -E '^src|^test/unit/specs|^test/e2e')
    
     # lint them if any
    if [[ $FILES ]]; then
      ./node_modules/.bin/eslint $FILES
    fi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    !/usr/bin/env bash
    
     <span class="hljs-comment"># get files to be linted</span>
    FILES=$(git diff --cached --name-only | grep -E <span class="hljs-string">'^src|^test/unit/specs|^test/e2e'</span>)
    
     <span class="hljs-comment"># lint them if any</span>
    <span class="hljs-keyword">if</span> [[ <span class="hljs-variable">$FILES</span> ]]; <span class="hljs-keyword">then</span>
      ./node_modules/.bin/eslint <span class="hljs-variable">$FILES</span>
    <span class="hljs-keyword">fi</span></code></pre>
<p>文件名是<code>pre-commit</code>,在commit 之前启用的钩子函数， 利用 <code>git diff</code>查看当前有哪些文件修改过，只对指定文件夹中修改的文件使用eslint进行代码检查，渐进式对整个项目实现代码规范。</p>
<p>脚本写好后，不用每次都手动复制到<code>.git/hooks</code>目录下，只需对当前文件创建软连接，到指定目录，<a href="https://github.com/vuejs/vue/blob/v1.0.26/package.json#L29" rel="nofollow noreferrer" target="_blank">在package.json中配置脚本命令</a>，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
   &quot;install-hook&quot;: &quot;ln -s ../../build/git-hooks/pre-commit .git/hooks/pre-commit&quot;,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-string">"scripts"</span>: {
   <span class="hljs-string">"install-hook"</span>: <span class="hljs-string">"ln -s ../../build/git-hooks/pre-commit .git/hooks/pre-commit"</span>,
}</code></pre>
<p>在项目初始化后， 执行<code>npm run install-hook</code>,很方便地配置好了pre-commit 钩子</p>
<h3 id="articleHeader1">2. 利用yorkie or husky + lint-staged 构建钩子</h3>
<p>在 vue最新的版本中，已经使用尤大改写的youkie， <a href="https://github.com/yyx990803/yorkie" rel="nofollow noreferrer" target="_blank"> youkie</a>实际是fork husky,然后做了一些定制化的改动， 使得钩子能从package.json的 "gitHooks"属性中读取，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;gitHooks&quot;: {
    &quot;pre-commit&quot;: &quot;foo&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">{
  <span class="hljs-string">"gitHooks"</span>: {
    <span class="hljs-string">"pre-commit"</span>: <span class="hljs-string">"foo"</span>
  }
}</code></pre>
<p>使用方法跟<a href="https://github.com/typicode/husky" rel="nofollow noreferrer" target="_blank">husky</a> 类似，可以查看husky 文档，介绍非常详细。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install husky --save-dev
 # or npm install yorkie --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code> npm install husky --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
 # <span class="hljs-built_in">or</span> npm install yorkie --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>安装完成后，可以发现已经改写了hooks 目录中的文件，只需在package.json 中配置对应钩子要执行的脚本。<br>husky 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
{
  &quot;husky&quot;: {
    &quot;hooks&quot;: {
      &quot;pre-commit&quot;: &quot;npm test&quot;,
      &quot;pre-push&quot;: &quot;npm test&quot;,
      &quot;...&quot;: &quot;...&quot;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// package.json</span>
{
  <span class="hljs-string">"husky"</span>: {
    <span class="hljs-string">"hooks"</span>: {
      <span class="hljs-string">"pre-commit"</span>: <span class="hljs-string">"npm test"</span>,
      <span class="hljs-string">"pre-push"</span>: <span class="hljs-string">"npm test"</span>,
      <span class="hljs-string">"..."</span>: <span class="hljs-string">"..."</span>
    }
  }
}</code></pre>
<p>回头看看，<a href="https://github.com/vuejs/vue/blob/dev/package.json#L46" rel="nofollow noreferrer" target="_blank">vue中如何配置</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
 &quot;gitHooks&quot;: {
    &quot;pre-commit&quot;: &quot;lint-staged&quot;,
    &quot;commit-msg&quot;: &quot;node scripts/verify-commit-msg.js&quot;
  }
 &quot;lint-staged&quot;: {
    &quot;*.js&quot;: [
      &quot;eslint --fix&quot;,
      &quot;git add&quot;
    ]
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// package.json</span>
 <span class="hljs-string">"gitHooks"</span>: {
    <span class="hljs-string">"pre-commit"</span>: <span class="hljs-string">"lint-staged"</span>,
    <span class="hljs-string">"commit-msg"</span>: <span class="hljs-string">"node scripts/verify-commit-msg.js"</span>
  }
 <span class="hljs-string">"lint-staged"</span>: {
    <span class="hljs-string">"*.js"</span>: [
      <span class="hljs-string">"eslint --fix"</span>,
      <span class="hljs-string">"git add"</span>
    ]
  }
</code></pre>
<p>前面提到，利用<code>git diff</code>,只lint当前改动的文件，<a href="https://github.com/okonet/lint-staged" rel="nofollow noreferrer" target="_blank">lint-staged</a>就非常准确的解决了这一问题，从这个包名，就可以看出，<code>Run linters on git staged files</code>，只针对改动的文件进行处理。<br>结合husky一起使用，安装依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev lint-staged husky" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save-dev lint-staged husky</code></pre>
<p>修改package.json 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
+ &quot;husky&quot;: {
+   &quot;hooks&quot;: {  
+     &quot;pre-commit&quot;: &quot;lint-staged&quot;
+   }
+ },
+ &quot;lint-staged&quot;: {
+   &quot;*.js&quot;: [&quot;eslint --fix&quot;, &quot;git add&quot;]
+ }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
+ <span class="hljs-string">"husky"</span>: {
+   <span class="hljs-string">"hooks"</span>: {  
+     <span class="hljs-string">"pre-commit"</span>: <span class="hljs-string">"lint-staged"</span>
+   }
+ },
+ <span class="hljs-string">"lint-staged"</span>: {
+   <span class="hljs-string">"*.js"</span>: [<span class="hljs-string">"eslint --fix"</span>, <span class="hljs-string">"git add"</span>]
+ }
}</code></pre>
<p>使用了eslint,需要配置.eslintrc, lint-staged还有一个好处，可以在lint后，更加灵活，执行其他脚本，尝试进行修改错误，比如 <code>eslint --fix</code> 检查后并修复错误。</p>
<p>上面列出的vue 文件使用了类似的配置，另外增加了 commit-msg 钩子，对提交说明进行检查，在 <a href="https://github.com/vuejs/vue/blob/dev/scripts/verify-commit-msg.js" rel="nofollow noreferrer" target="_blank">scripts/verify-commit-msg.js</a>文件中可以找到检查脚本，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
    chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
    `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
    `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
    chalk.red(`  See .github/COMMIT_CONVENTION.md for more details.\n`) +
    chalk.red(`  You can also use ${chalk.cyan(`npm run commit`)} to interactively generate a commit message.\n`)
  )
  process.exit(1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">const</span> msgPath = process.env.GIT_PARAMS
<span class="hljs-keyword">const</span> msg = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>).readFileSync(msgPath, <span class="hljs-string">'utf-8'</span>).trim()

<span class="hljs-keyword">const</span> commitRE = <span class="hljs-regexp">/^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50}/</span>

<span class="hljs-keyword">if</span> (!commitRE.test(msg)) {
  <span class="hljs-built_in">console</span>.log()
  <span class="hljs-built_in">console</span>.error(
    <span class="hljs-string">`  <span class="hljs-subst">${chalk.bgRed.white(<span class="hljs-string">' ERROR '</span>)}</span> <span class="hljs-subst">${chalk.red(<span class="hljs-string">`invalid commit message format.`</span>)}</span>\n\n`</span> +
    chalk.red(<span class="hljs-string">`  Proper commit message format is required for automated changelog generation. Examples:\n\n`</span>) +
    <span class="hljs-string">`    <span class="hljs-subst">${chalk.green(<span class="hljs-string">`feat(compiler): add 'comments' option`</span>)}</span>\n`</span> +
    <span class="hljs-string">`    <span class="hljs-subst">${chalk.green(<span class="hljs-string">`fix(v-model): handle events on blur (close #28)`</span>)}</span>\n\n`</span> +
    chalk.red(<span class="hljs-string">`  See .github/COMMIT_CONVENTION.md for more details.\n`</span>) +
    chalk.red(<span class="hljs-string">`  You can also use <span class="hljs-subst">${chalk.cyan(<span class="hljs-string">`npm run commit`</span>)}</span> to interactively generate a commit message.\n`</span>)
  )
  process.exit(<span class="hljs-number">1</span>)
}</code></pre>
<p>利用process.env.GIT_PARAMS 找到目录，读取msg 说明，进行检查。</p>
<p><strong> 使用 husky 要注意，对应属性名已经改为HUSKY_GIT_PARAMS , 而不是原始的 GIT_PARAMS 环境变量。 </strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
pre-commit钩子，代码质量检查

## 原文链接
[https://segmentfault.com/a/1190000016750078](https://segmentfault.com/a/1190000016750078)

