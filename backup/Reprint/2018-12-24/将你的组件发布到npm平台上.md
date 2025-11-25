---
title: '将你的组件发布到npm平台上' 
date: 2018-12-24 2:30:07
hidden: true
slug: pzjipqhaop
categories: [reprint]
---

{{< raw >}}

                    
<p>npm包管理工具前端同学应该不陌生了，npm平台上有大量的优秀包，我们只需要简单几行命令就能down下来我们想要的东西，不用到处求种，而且版本控制十分方便。如何将自己的组件或者插件发布到npm平台上去，方便项目中使用和其他人使用，本文介绍如何将一个react组件发布到npm平台上去。</p>
<p>在实际动手之前，先要查阅资料预见困难，分析执行步骤：</p>
<ol>
<li>一个包的格式，应该有哪些东西。</li>
<li>将项目发布到npm平台上去。</li>
<li>持续集成。</li>
</ol>
<h1 id="articleHeader0">组件格式</h1>
<p>发布到npm平台的包，是一个项目工程，跟我们平时工作中的项目类似，应该有完整的一套构建，开发，测试，打包压缩等步骤，所以应该把这个包当成一个项目来对待。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="​qj-button
├── example                   # 存放demo的代码
│    ├── src
│    │    ├── ButtonPage.js   
│    │    └── index.js          # 示例的入口文件
│    └── index.html            # 示例页面
├── lib                          # 真实引用编译过的代码
│   └── Button.js              # 编译过的源码
├── src                          # 存放源码的目录
│   └── Button.js              # 组件源码
├── style                      # 样式文件
│    ├── base.scss
│    ├── button.scss
│    └── common.scss
├── .bebalrc                   # babel配置文件
├── .travis.yml                  # travis配置文件
├── index.js                  # 项目入口文件
├── style.css                  # 项目样式文件
├── package.json            
├── postcss.config.json
├── webpack.config.json       # 项目开发demo的时候 需要用到的webpack
└── README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>​qj-<span class="hljs-keyword">button
</span>├── example                   <span class="hljs-comment"># 存放demo的代码</span>
│    ├── src
│    │    ├── <span class="hljs-keyword">ButtonPage.js </span>  
│    │    └── index.<span class="hljs-keyword">js </span>         <span class="hljs-comment"># 示例的入口文件</span>
│    └── index.html            <span class="hljs-comment"># 示例页面</span>
├── lib                          <span class="hljs-comment"># 真实引用编译过的代码</span>
│   └── <span class="hljs-keyword">Button.js </span>             <span class="hljs-comment"># 编译过的源码</span>
├── src                          <span class="hljs-comment"># 存放源码的目录</span>
│   └── <span class="hljs-keyword">Button.js </span>             <span class="hljs-comment"># 组件源码</span>
├── style                      <span class="hljs-comment"># 样式文件</span>
│    ├── <span class="hljs-keyword">base.scss
</span>│    ├── <span class="hljs-keyword">button.scss
</span>│    └── common.<span class="hljs-keyword">scss
</span>├── .<span class="hljs-keyword">bebalrc </span>                  <span class="hljs-comment"># babel配置文件</span>
├── .travis.yml                  <span class="hljs-comment"># travis配置文件</span>
├── index.<span class="hljs-keyword">js </span>                 <span class="hljs-comment"># 项目入口文件</span>
├── style.css                  <span class="hljs-comment"># 项目样式文件</span>
├── package.<span class="hljs-keyword">json </span>           
├── postcss.config.<span class="hljs-keyword">json
</span>├── webpack.config.<span class="hljs-keyword">json </span>      <span class="hljs-comment"># 项目开发demo的时候 需要用到的webpack</span>
└── README.md</code></pre>
<p>这里要注意的点：</p>
<ol>
<li>原文件：项目原文件在<code>src</code>下，原文件用ES6编写。原文件不可直接使用，需要打包编译之后才能使用。</li>
<li>编译：这里的编译有两种方式：使用<code>babel</code>编译；使用<code>webpack</code>编译。前者只能编译js，后者则可以编译很多类型的文件。我这里使用的<code>babel</code>编译，命令：<code>./node_modules/.bin/babel src --copy-files --source-maps --extensions .js --out-dir lib</code>将<code>src</code>目录下的js文件编译到<code>lib</code>目录下。</li>
<li>样式：scss样式引入也有两种：使用sass命令编译，输出到根目录<code>style.css</code>；使用<code>webpack</code>编译<code>src</code>文件的时候，将样式打包编译到js文件里。两者区别也很明显：前者需要手动编译，也需要手动引入，比较麻烦，但是文件独立，方便管理；后者自动编译，样式扩展性较差。各有取舍。</li>
<li>demo：项目里有个<code>example</code>文件夹，里面是项目示例代码，本地开发的时候跑的项目；也有的包里面是<code>docs</code>文件夹，文档形式介绍。</li>
<li>测试：有的包本地开发的时候会有测试脚本，本地会有一个<code>test</code>文件夹，用于存放测试脚本。</li>
</ol>
<p>项目完成之后，需要添加一个入口文件<code>index.js</code>，将你的组件导出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = require('./lib/Button');
exports.default = require('./lib/Button');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./lib/Button'</span>);
exports.<span class="hljs-keyword">default</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./lib/Button'</span>);</code></pre>
<p>需要改一下<code>package.json</code>里面的配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;style&quot;: &quot;style.css&quot;,
  &quot;files&quot;: [
    &quot;lib&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"style"</span>: <span class="hljs-string">"style.css"</span>,
  <span class="hljs-attr">"files"</span>: [
    <span class="hljs-string">"lib"</span>
  ]
}</code></pre>
<p>上述代码指定入口文件和样式文件，并且发布的时候，只发布<code>lib</code>目录下文件和其余根目录的文件，其余的文件夹里的会传到github上，并不会被发布到npm平台上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不会被npm忽略的文件
package.json
README (and its variants)
CHANGELOG (and its variants)
LICENSE / LICENCE

// 一定会忽略的
node_modules
.*.swp
._*
.DS_Store
.git
.hg
.npmrc
.lock-wscript
.svn
.wafpickle-*
config.gypi
CVS
npm-debug.log" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>// 不会被npm忽略的文件
package.json
README (<span class="hljs-keyword">and</span> its variants)
CHANGELOG (<span class="hljs-keyword">and</span> its variants)
LICENSE / LICENCE

// 一定会忽略的
node_modules
.*.swp
<span class="hljs-meta">._</span>*
<span class="hljs-meta">.DS_Store</span>
<span class="hljs-meta">.git</span>
<span class="hljs-meta">.hg</span>
<span class="hljs-meta">.npmrc</span>
<span class="hljs-meta">.lock-wscript</span>
<span class="hljs-meta">.svn</span>
<span class="hljs-meta">.wafpickle-</span>*
config.gypi
CVS
npm-debug.log</code></pre>
<h1 id="articleHeader1">npm发布</h1>
<p>项目已经准备好了，接下来可以着手发布了。首先<a href="https://www.npmjs.com/signup" rel="nofollow noreferrer" target="_blank">npm</a>上注册账号，别忘了去邮箱验证。然后输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm adduser" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> adduser</code></pre>
<p>接下来会以问答的形式向你了解你的用户名、密码以及公开的邮箱，之后输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> publish</code></pre>
<p>然后看到进度条走，之后组件发布成功，可以到npm上搜索自己的包了。</p>
<p>这块可能会遇到一些报错，<a href="http://blog.csdn.net/gamesdev/article/details/49018629" rel="nofollow noreferrer" target="_blank">请看这里</a>。</p>
<p>最后说一下版本管理。</p>
<blockquote><p>一般来说版本分成三部分：A.B.C</p></blockquote>
<ol>
<li>A表示大版本号，一般是项目较大改动的时候修改，可以参考理解iOS6 更新到iOS7 时候界面大幅改动；A为0的时候，表示项目处于开发阶段。</li>
<li>B表示功能更新，或者项目模块改动的时候增加。</li>
<li>C表示小改动，如修bug。</li>
</ol>
<h1 id="articleHeader2">持续集成</h1>
<p>一般来说你会看到一些项目README.md里面有一些icon如：<br><span class="img-wrap"><img data-src="/img/bVY9qC?w=822&amp;h=214" src="https://static.alili.tech/img/bVY9qC?w=822&amp;h=214" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>这些icon看起来很牛逼，但也不只是装逼用的。</p>
<blockquote><p>持续集成(Continuous integration)的目的，就是让产品可以快速迭代，同时还能保持高质量。它的核心措施是，代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。</p></blockquote>
<p>每个icon都表示一个功能，这里不多做介绍，有兴趣可以看看下列文章：</p>
<ol>
<li><a href="http://harttle.com/2016/04/30/github-ci.html" rel="nofollow noreferrer" target="_blank">跟踪Github项目的持续集成状态</a></li>
<li><a href="https://yimogit.github.io/2017/07/24/%E4%BD%BF%E7%94%A8travis-ci%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2github%E4%B8%8A%E7%9A%84%E9%A1%B9%E7%9B%AE/" rel="nofollow noreferrer" target="_blank">使用travis-ci集成一个vue.js项目</a></li>
</ol>
<h1 id="articleHeader3">总结</h1>
<p>经过上述操作，就可以完成了向npm平台发布一个包的过程，发布到npm的组件要持续维护。</p>
<p><a href="https://github.com/Aus0049/qj-button" rel="nofollow noreferrer" target="_blank">项目源码地址</a></p>
<h1 id="articleHeader4">参考</h1>
<ol>
<li><a href="http://blog.csdn.net/Vic___/article/details/76201008" rel="nofollow noreferrer" target="_blank">八步亲手用npm开发React</a></li>
<li><a href="https://segmentfault.com/a/1190000008836097">在npm上发布你的组件</a></li>
<li><a href="http://react-china.org/t/es6-react-npm/3879" rel="nofollow noreferrer" target="_blank">如何使用 ES6 编写一个 React 模块, 并且编译后发布到 NPM</a></li>
<li><a href="http://weizhifeng.net/how-to-publish-a-node-module.html" rel="nofollow noreferrer" target="_blank">如何发布Node模块到NPM社区</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
将你的组件发布到npm平台上

## 原文链接
[https://segmentfault.com/a/1190000012151905](https://segmentfault.com/a/1190000012151905)

