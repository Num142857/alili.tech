---
title: '手把手教你结合commitizen 搭建属于自己的项目git commit 校验工具' 
date: 2019-02-15 2:30:44
hidden: true
slug: vho0v9qa8h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">先丢出最终版的index.js文件内容</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
&quot;use strict&quot;;
const path = require('path');
const editJsonFile = require(&quot;edit-json-file&quot;);
const arg = process.argv
// 初始化my-commit ,将部分脚本写入到package.json中
if (arg[2] &amp;&amp; arg[2] === 'init') {
  // If the file doesn't exist, the content will be an empty object by default.
  let file = editJsonFile(`${process.cwd()}/package.json`);
  // Set a couple of fields
  file.set(&quot;husky&quot;, {&quot;hooks&quot;: {
    &quot;pre-commit&quot;: &quot;lint-staged&quot;
  "}}");
  file.set(&quot;lint-staged&quot;, {
    &quot;src/*.js&quot;: &quot;['eslint --fix']&quot;
  });
  // 询问是否全部使用git add .
  var List = require('prompt-list');
  var list = new List({
    name: 'order',
    message: '是否默认使用git add .',
    // choices may be defined as an array or a function that returns an array
    choices: [
      'yes',
      'no'
    ]
  })
  // async
  list.ask(function(answer) {
    file.set(&quot;scripts&quot;, {
      &quot;my-ci&quot;: answer === 'yes' ? 'git add . &amp;&amp; cross-env ./node_modules/.bin/my-commit' : 'cross-env ./node_modules/.bin/my-commit'
    });
    // Output the content
    file.save();
    var shell = require('shelljs');
    console.log('开始安装依赖');
    shell.exec('npm i husky --save-dev', {async: true})
    console.log('正在安装 husky---- ');
    shell.exec('npm i cross-env --save-dev', {async: true})
    console.log('正在安装cross-env ---- ');
    shell.exec('npm i lint-staged --save-dev', {async: true})
  })
} else {
  const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;
  bootstrap({
    cliPath: path.join(__dirname, '../../node_modules/commitizen'),
    // this is new
    config: {
      &quot;path&quot;: &quot;cz-conventional-changelog&quot;,
      &quot;path&quot;: &quot;cz-emoji&quot;
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-meta">"use strict"</span>;
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> editJsonFile = <span class="hljs-built_in">require</span>(<span class="hljs-string">"edit-json-file"</span>);
<span class="hljs-keyword">const</span> arg = process.argv
<span class="hljs-comment">// 初始化my-commit ,将部分脚本写入到package.json中</span>
<span class="hljs-keyword">if</span> (arg[<span class="hljs-number">2</span>] &amp;&amp; arg[<span class="hljs-number">2</span>] === <span class="hljs-string">'init'</span>) {
  <span class="hljs-comment">// If the file doesn't exist, the content will be an empty object by default.</span>
  <span class="hljs-keyword">let</span> file = editJsonFile(<span class="hljs-string">`<span class="hljs-subst">${process.cwd()}</span>/package.json`</span>);
  <span class="hljs-comment">// Set a couple of fields</span>
  file.set(<span class="hljs-string">"husky"</span>, {<span class="hljs-string">"hooks"</span>: {
    <span class="hljs-string">"pre-commit"</span>: <span class="hljs-string">"lint-staged"</span>
  "}}");
  file.set(<span class="hljs-string">"lint-staged"</span>, {
    <span class="hljs-string">"src/*.js"</span>: <span class="hljs-string">"['eslint --fix']"</span>
  });
  <span class="hljs-comment">// 询问是否全部使用git add .</span>
  <span class="hljs-keyword">var</span> List = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prompt-list'</span>);
  <span class="hljs-keyword">var</span> list = <span class="hljs-keyword">new</span> List({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'order'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'是否默认使用git add .'</span>,
    <span class="hljs-comment">// choices may be defined as an array or a function that returns an array</span>
    choices: [
      <span class="hljs-string">'yes'</span>,
      <span class="hljs-string">'no'</span>
    ]
  })
  <span class="hljs-comment">// async</span>
  list.ask(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">answer</span>) </span>{
    file.set(<span class="hljs-string">"scripts"</span>, {
      <span class="hljs-string">"my-ci"</span>: answer === <span class="hljs-string">'yes'</span> ? <span class="hljs-string">'git add . &amp;&amp; cross-env ./node_modules/.bin/my-commit'</span> : <span class="hljs-string">'cross-env ./node_modules/.bin/my-commit'</span>
    });
    <span class="hljs-comment">// Output the content</span>
    file.save();
    <span class="hljs-keyword">var</span> shell = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shelljs'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始安装依赖'</span>);
    shell.exec(<span class="hljs-string">'npm i husky --save-dev'</span>, {<span class="hljs-attr">async</span>: <span class="hljs-literal">true</span>})
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正在安装 husky---- '</span>);
    shell.exec(<span class="hljs-string">'npm i cross-env --save-dev'</span>, {<span class="hljs-attr">async</span>: <span class="hljs-literal">true</span>})
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正在安装cross-env ---- '</span>);
    shell.exec(<span class="hljs-string">'npm i lint-staged --save-dev'</span>, {<span class="hljs-attr">async</span>: <span class="hljs-literal">true</span>})
  })
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">const</span> bootstrap = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commitizen/dist/cli/git-cz'</span>).bootstrap;
  bootstrap({
    <span class="hljs-attr">cliPath</span>: path.join(__dirname, <span class="hljs-string">'../../node_modules/commitizen'</span>),
    <span class="hljs-comment">// this is new</span>
    config: {
      <span class="hljs-string">"path"</span>: <span class="hljs-string">"cz-conventional-changelog"</span>,
      <span class="hljs-string">"path"</span>: <span class="hljs-string">"cz-emoji"</span>
    }
  });
}</code></pre>
<h2 id="articleHeader1">步骤</h2>
<h4>一、创建工具项目</h4>
<blockquote>1.使用git/gitlab创建一个空的仓库</blockquote>
<blockquote>2.在空仓库中添加<code>index.js</code> 内容如下</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js

#!/usr/bin/env node
&quot;use strict&quot;;
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;
  bootstrap({
    cliPath: path.join(__dirname, '../../node_modules/commitizen'),
    // this is new
    config: {
      &quot;path&quot;: &quot;cz-conventional-changelog&quot;
    }
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>

<span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-meta">"use strict"</span>;
<span class="hljs-keyword">const</span> bootstrap = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commitizen/dist/cli/git-cz'</span>).bootstrap;
  bootstrap({
    <span class="hljs-attr">cliPath</span>: path.join(__dirname, <span class="hljs-string">'../../node_modules/commitizen'</span>),
    <span class="hljs-comment">// this is new</span>
    config: {
      <span class="hljs-string">"path"</span>: <span class="hljs-string">"cz-conventional-changelog"</span>
    }
  });</code></pre>
<h4>使用工具到相应的项目（假设插件名称<code>my-commit</code>）</h4>
<blockquote>1.先发布你的工具项目到npm，相当于创建一个npm包、具体怎么发布 这里不做赘述，网上很多教程</blockquote>
<blockquote>2.安装工具（假设插件名称<code>my-commit</code>）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install my-commit --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> my-<span class="hljs-keyword">commit</span> <span class="hljs-comment">--save-dev</span>
</code></pre>
<blockquote>3.配置</blockquote>
<p>需要在<code>package.json</code>的<code>script</code>中添加如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// my-ci 是自己定义的写成什么都可以

&quot;my-ci&quot;: &quot;./node_modules/.bin/my-commit&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// my-ci 是自己定义的写成什么都可以</span>

<span class="hljs-string">"my-ci"</span>: <span class="hljs-string">"./node_modules/.bin/my-commit"</span>
</code></pre>
<blockquote>4.配置之后 执行了<code>git add .</code>之后 执行<code>npm run my-ci</code> 将会出现选填补充信息的选项</blockquote>
<p>如果觉得<code>git add.</code>之后再执行 <code>npm run my-ci</code> 有点麻烦，可以直接改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// my-ci 是自己定义的写成什么都可以

&quot;my-ci&quot;: &quot;git add. &amp;&amp; ./node_modules/.bin/my-commit&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// my-ci 是自己定义的写成什么都可以</span>

<span class="hljs-string">"my-ci"</span>: <span class="hljs-string">"git add. &amp;&amp; ./node_modules/.bin/my-commit"</span>
</code></pre>
<blockquote>5 因为以上命令存在不同系统路径不兼容问题 需要加入 <code>cross-env</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install cross-env --save-dev 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm install <span class="hljs-built_in">cross</span>-env --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> 
</code></pre>
<blockquote>6 再次修改<code>package.json</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// my-ci 是自己定义的写成什么都可以

&quot;my-ci&quot;: &quot;git add. &amp;&amp; cross-env ./node_modules/.bin/my-commit&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// my-ci 是自己定义的写成什么都可以</span>

<span class="hljs-string">"my-ci"</span>: <span class="hljs-string">"git add. &amp;&amp; cross-env ./node_modules/.bin/my-commit"</span>
</code></pre>
<p>当需要提交代码的时候，不用执行<code>git add .</code> 直接执行<code>npm run my-ci</code>即可</p>
<blockquote>7 提示信息加上可爱的表情</blockquote>
<p>需要在<code>index.js</code>文件中添加 <code>cz-emoji</code>  如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js

#!/usr/bin/env node
&quot;use strict&quot;;

const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;
  bootstrap({
    cliPath: path.join(__dirname, '../../node_modules/commitizen'),
    // this is new
    config: {
      &quot;path&quot;: &quot;cz-conventional-changelog&quot;,
      &quot;path&quot;: &quot;cz-emoji&quot;
    }
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>

<span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-meta">"use strict"</span>;

<span class="hljs-keyword">const</span> bootstrap = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commitizen/dist/cli/git-cz'</span>).bootstrap;
  bootstrap({
    <span class="hljs-attr">cliPath</span>: path.join(__dirname, <span class="hljs-string">'../../node_modules/commitizen'</span>),
    <span class="hljs-comment">// this is new</span>
    config: {
      <span class="hljs-string">"path"</span>: <span class="hljs-string">"cz-conventional-changelog"</span>,
      <span class="hljs-string">"path"</span>: <span class="hljs-string">"cz-emoji"</span>
    }
  });
</code></pre>
<p>这个时候 重新发npm包之后再安装到自己的项目下，执行提交的时候</p>
<blockquote>8 为了增强校验功能，加入<code>eslint</code>对文件进行</blockquote>
<p>这个有点复杂，需要通过<code>lint-staged</code>来判断</p>
<p>所以先安装以下依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i husky --save-dev
npm i lint-stage --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm i husky --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm i lint-stage --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
</code></pre>
<p>配置<code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 增加属性
  &quot;husky&quot;: {
    &quot;hooks&quot;: {
      &quot;pre-commit&quot;: &quot;lint-staged&quot;
    }
  },
  &quot;lint-staged&quot;: {
    &quot;src/*.js&quot;: [
      &quot;eslint --fix&quot;
    ]
  },
// 其中src的具体路径是可以自己配置
// 校验规则是基于当前目录的.eslintrc.js 文件，如果有些规则不想要，就配置这个文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// 增加属性</span>
  <span class="hljs-string">"husky"</span>: {
    <span class="hljs-string">"hooks"</span>: {
      <span class="hljs-string">"pre-commit"</span>: <span class="hljs-string">"lint-staged"</span>
    }
  },
  <span class="hljs-string">"lint-staged"</span>: {
    <span class="hljs-string">"src/*.js"</span>: [
      <span class="hljs-string">"eslint --fix"</span>
    ]
  },
<span class="hljs-comment">// 其中src的具体路径是可以自己配置</span>
<span class="hljs-comment">// 校验规则是基于当前目录的.eslintrc.js 文件，如果有些规则不想要，就配置这个文件</span>
</code></pre>
<p><strong><em> 这个时候我们提交代码的时候再输入基本的信息之后会执行一个eslint的代码规则 </em></strong></p>
<p><strong><em> 总结以上配置文件 我们需要 </em></strong></p>
<p><code>安装的库有</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i my-commit --save-dev
npm i cross --save-dev
npm i husky --save-dev
npm i lint-stage --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm i my-commit --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm i <span class="hljs-built_in">cross</span> --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm i husky --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
npm i lint-stage --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p><code>需要配置package.json属性有</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;script&quot;: {
      ...
      &quot;my-ci&quot;: &quot;git add. &amp;&amp; cross-env ./node_modules/.bin/my-commit&quot;
    },

  &quot;husky&quot;: {
    &quot;hooks&quot;: {
      &quot;pre-commit&quot;: &quot;lint-staged&quot;
    }
  },
  &quot;lint-staged&quot;: {
    &quot;src/*.js&quot;: [
      &quot;eslint --fix&quot;
    ]
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"script"</span>: {
      ...
      <span class="hljs-string">"my-ci"</span>: <span class="hljs-string">"git add. &amp;&amp; cross-env ./node_modules/.bin/my-commit"</span>
    },

  <span class="hljs-string">"husky"</span>: {
    <span class="hljs-string">"hooks"</span>: {
      <span class="hljs-string">"pre-commit"</span>: <span class="hljs-string">"lint-staged"</span>
    }
  },
  <span class="hljs-string">"lint-staged"</span>: {
    <span class="hljs-string">"src/*.js"</span>: [
      <span class="hljs-string">"eslint --fix"</span>
    ]
  },</code></pre>
<p><strong><em> 如果每个项目都这么玩。其实有点耗时间，所以我们做了一下自动化 </em></strong></p>
<blockquote>10 初步自动化</blockquote>
<p>修改my-commit中的 index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node
&quot;use strict&quot;;
const path = require('path');
const editJsonFile = require(&quot;edit-json-file&quot;);
const arg = process.argv
// 初始化my-commit ,将部分脚本写入到package.json中
if (arg[2] &amp;&amp; arg[2] === 'init') {
  // If the file doesn't exist, the content will be an empty object by default.
  let file = editJsonFile(`${process.cwd()}/package.json`);
  // Set a couple of fields
  file.set(&quot;husky&quot;, {&quot;hooks&quot;: {
    &quot;pre-commit&quot;: &quot;lint-staged&quot;
  "}}");
  file.set(&quot;lint-staged&quot;, {
    &quot;src/*.js&quot;: &quot;['eslint --fix']&quot;
  });
  // 询问是否全部使用git add .
  var List = require('prompt-list');
  var list = new List({
    name: 'order',
    message: '是否默认使用git add .',
    // choices may be defined as an array or a function that returns an array
    choices: [
      'yes',
      'no'
    ]
  })
  // async
  list.ask(function(answer) {
    file.set(&quot;scripts&quot;, {
      &quot;my-ci&quot;: answer === 'yes' ? 'git add . &amp;&amp; cross-env ./node_modules/.bin/my-commit' : 'cross-env ./node_modules/.bin/my-commit'
    });
    // Output the content
    file.save();
    var shell = require('shelljs');
    console.log('开始安装依赖');
    shell.exec('npm i husky --save-dev', {async: true})
    console.log('正在安装 husky---- ');
    shell.exec('npm i cross-env --save-dev', {async: true})
    console.log('正在安装cross-env ---- ');
    shell.exec('npm i lint-staged --save-dev', {async: true})
  })
} else {
  const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;
  bootstrap({
    cliPath: path.join(__dirname, '../../node_modules/commitizen'),
    // this is new
    config: {
      &quot;path&quot;: &quot;cz-conventional-changelog&quot;,
      &quot;path&quot;: &quot;cz-emoji&quot;
    }
  });
}
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-meta">"use strict"</span>;
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> editJsonFile = <span class="hljs-built_in">require</span>(<span class="hljs-string">"edit-json-file"</span>);
<span class="hljs-keyword">const</span> arg = process.argv
<span class="hljs-comment">// 初始化my-commit ,将部分脚本写入到package.json中</span>
<span class="hljs-keyword">if</span> (arg[<span class="hljs-number">2</span>] &amp;&amp; arg[<span class="hljs-number">2</span>] === <span class="hljs-string">'init'</span>) {
  <span class="hljs-comment">// If the file doesn't exist, the content will be an empty object by default.</span>
  <span class="hljs-keyword">let</span> file = editJsonFile(<span class="hljs-string">`<span class="hljs-subst">${process.cwd()}</span>/package.json`</span>);
  <span class="hljs-comment">// Set a couple of fields</span>
  file.set(<span class="hljs-string">"husky"</span>, {<span class="hljs-string">"hooks"</span>: {
    <span class="hljs-string">"pre-commit"</span>: <span class="hljs-string">"lint-staged"</span>
  "}}");
  file.set(<span class="hljs-string">"lint-staged"</span>, {
    <span class="hljs-string">"src/*.js"</span>: <span class="hljs-string">"['eslint --fix']"</span>
  });
  <span class="hljs-comment">// 询问是否全部使用git add .</span>
  <span class="hljs-keyword">var</span> List = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prompt-list'</span>);
  <span class="hljs-keyword">var</span> list = <span class="hljs-keyword">new</span> List({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'order'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'是否默认使用git add .'</span>,
    <span class="hljs-comment">// choices may be defined as an array or a function that returns an array</span>
    choices: [
      <span class="hljs-string">'yes'</span>,
      <span class="hljs-string">'no'</span>
    ]
  })
  <span class="hljs-comment">// async</span>
  list.ask(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">answer</span>) </span>{
    file.set(<span class="hljs-string">"scripts"</span>, {
      <span class="hljs-string">"my-ci"</span>: answer === <span class="hljs-string">'yes'</span> ? <span class="hljs-string">'git add . &amp;&amp; cross-env ./node_modules/.bin/my-commit'</span> : <span class="hljs-string">'cross-env ./node_modules/.bin/my-commit'</span>
    });
    <span class="hljs-comment">// Output the content</span>
    file.save();
    <span class="hljs-keyword">var</span> shell = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shelljs'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始安装依赖'</span>);
    shell.exec(<span class="hljs-string">'npm i husky --save-dev'</span>, {<span class="hljs-attr">async</span>: <span class="hljs-literal">true</span>})
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正在安装 husky---- '</span>);
    shell.exec(<span class="hljs-string">'npm i cross-env --save-dev'</span>, {<span class="hljs-attr">async</span>: <span class="hljs-literal">true</span>})
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正在安装cross-env ---- '</span>);
    shell.exec(<span class="hljs-string">'npm i lint-staged --save-dev'</span>, {<span class="hljs-attr">async</span>: <span class="hljs-literal">true</span>})
  })
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">const</span> bootstrap = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commitizen/dist/cli/git-cz'</span>).bootstrap;
  bootstrap({
    <span class="hljs-attr">cliPath</span>: path.join(__dirname, <span class="hljs-string">'../../node_modules/commitizen'</span>),
    <span class="hljs-comment">// this is new</span>
    config: {
      <span class="hljs-string">"path"</span>: <span class="hljs-string">"cz-conventional-changelog"</span>,
      <span class="hljs-string">"path"</span>: <span class="hljs-string">"cz-emoji"</span>
    }
  });
}
 </code></pre>
<p>清除掉以前配置的package.json</p>
<p>只要两部安装即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i my-commit
npx my-commit init
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>npm i <span class="hljs-keyword">my</span>-commit
npx <span class="hljs-keyword">my</span>-commit init
</code></pre>
<p>提交代码的时候直接执行 <code>npm run my-ci</code> 即可</p>
<blockquote>11 更智能（摸索中）</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你结合commitizen 搭建属于自己的项目git commit 校验工具

## 原文链接
[https://segmentfault.com/a/1190000016776838](https://segmentfault.com/a/1190000016776838)

