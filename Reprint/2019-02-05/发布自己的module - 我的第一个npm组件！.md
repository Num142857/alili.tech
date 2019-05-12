---
title: '发布自己的module - 我的第一个npm组件！' 
date: 2019-02-05 2:30:09
hidden: true
slug: ggpzotyu5y4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题来源</h2>
<p>前段时间去帮朋友的公司，重构一个前端项目，大致把原项目浏览了一遍，然后就风风火火的开干了，框架选型用了最流行的React+Reflux，然而第一个首页就遇到个问题，源项目有一个fullpage组件开发的全屏切换，却不被React支持。然后就去Github上去找，结果没找到一个好用的，然后就想，我是否能自己开发一个呢。</p>
<h2 id="articleHeader1">准备工具</h2>
<ul>
<li><p>安装nodeJS</p></li>
<li><p>注册一个github账户用于托管代码</p></li>
<li><p>注册一个npm账户</p></li>
<li><p>开发你的module，更新至github</p></li>
<li><p>发布module至npm</p></li>
</ul>
<h3 id="articleHeader2">安装nodeJS</h3>
<p><a href="https://nodejs.org/en" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en</a></p>
<p>根据系统安装对应的版本，安装完后对应的npm也会被安装进去进入终端，输入命令查询安装版本！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node -v
$ npm -v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
$ npm -v</code></pre>
<h3 id="articleHeader3">github创建项目</h3>
<p><a href="https://github.com" rel="nofollow noreferrer" target="_blank">https://github.com</a> 注册账户，新建项目，然后clone到本地。</p>
<p>终端进入到项目文件夹，执行<code>npm init</code>命令，构建模块的描述文件，系统会提示你输入所需的信息，不想输入就直接<code>Enter</code>跳过。这里主要的几个配置如下</p>
<ul>
<li><p><code>name</code>就是你要发布的module名；</p></li>
<li><p><code>version</code>版本信息（每发布一次版本号都必须大于上一次发布的版本号）；</p></li>
<li><p><code>entry</code>入口文件。</p></li>
</ul>
<p>剩下的就是开发啦</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (node) easy_mongo
version: (0.0.0) 0.1.0
description: An easy mongodb client for node.js based on native mongodb driver.
entry point: (index.js) 
test command: make test
git repository: https://github.com/JeremyWei/easy_mongo.git
keywords: Mongodb node easy 
author: JeremyWei
license: (BSD-2-Clause) MIT" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>$ npm init

This utility will walk you through creating <span class="hljs-keyword">a</span> package.json <span class="hljs-built_in">file</span>.
It only covers <span class="hljs-keyword">the</span> most common <span class="hljs-keyword">items</span>, <span class="hljs-keyword">and</span> tries <span class="hljs-built_in">to</span> guess sane defaults.

See `npm help json` <span class="hljs-keyword">for</span> definitive documentation <span class="hljs-keyword">on</span> <span class="hljs-title">these</span> <span class="hljs-title">fields</span>
<span class="hljs-keyword">and</span> exactly what they <span class="hljs-built_in">do</span>.

Use `npm install &lt;pkg&gt; <span class="hljs-comment">--save` afterwards to install a package and</span>
save <span class="hljs-keyword">it</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">a</span> dependency <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> package.json <span class="hljs-built_in">file</span>.

Press ^C <span class="hljs-keyword">at</span> <span class="hljs-keyword">any</span> <span class="hljs-built_in">time</span> <span class="hljs-built_in">to</span> quit.
name: (node) easy_mongo
<span class="hljs-built_in">version</span>: (<span class="hljs-number">0.0</span><span class="hljs-number">.0</span>) <span class="hljs-number">0.1</span><span class="hljs-number">.0</span>
description: An easy mongodb client <span class="hljs-keyword">for</span> node.js based <span class="hljs-keyword">on</span> <span class="hljs-title">native</span> <span class="hljs-title">mongodb</span> <span class="hljs-title">driver</span>.
entry point: (index.js) 
test <span class="hljs-keyword">command</span>: <span class="hljs-title">make</span> <span class="hljs-title">test</span>
git repository: <span class="hljs-keyword">https</span>://github.com/JeremyWei/easy_mongo.git
keywords: Mongodb node easy 
author: JeremyWei
license: (BSD<span class="hljs-number">-2</span>-Clause) MIT</code></pre>
<h3 id="articleHeader4">npm注册</h3>
<p>输入完用户名，密码，邮箱后没有错误信息就完成了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm adduser
Username: your name
Password: your password
Email: (this IS public) your email" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>$ npm adduser
<span class="hljs-string">Username:</span> your name
<span class="hljs-string">Password:</span> your password
<span class="hljs-string">Email:</span> (<span class="hljs-keyword">this</span> IS <span class="hljs-keyword">public</span>) your email</code></pre>
<p>查询或者登陆别的用户命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm whoami
$ npm login" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>$ <span class="hljs-built_in">npm</span> whoami
$ <span class="hljs-built_in">npm</span> login</code></pre>
<h3 id="articleHeader5">npm module 发布</h3>
<p>module开发完毕后，剩下的就是发布啦，进入项目根目录，输入命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">npm</span> publish</code></pre>
<p>这里有时候会遇到几个问题,问题1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm ERR! no_perms Private mode enable, only admin can publish this module:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">npm ERR! no_perms Private mode enable, only admin can publish <span class="hljs-keyword">this</span> <span class="hljs-keyword">module</span>:</code></pre>
<p>这里注意的是因为国内网络问题，许多小伙伴把npm的镜像代理到淘宝或者别的地方了，这里要设置回原来的镜像。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set registry=http://registry.npmjs.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code style="word-break: break-word; white-space: initial;">npm config <span class="hljs-keyword">set</span> <span class="hljs-keyword">registry</span>=<span class="hljs-keyword">http</span>://<span class="hljs-keyword">registry</span>.npmjs.org</code></pre>
<p>问题2：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm ERR! you do not have permission to publish &quot;your module name&quot;. Are you logged in as the correct user? " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm ERR! you <span class="hljs-keyword">do</span> <span class="hljs-keyword">not</span> have permission <span class="hljs-keyword">to</span> publish <span class="hljs-string">"your module name"</span>. <span class="hljs-keyword">Are</span> you logged <span class="hljs-keyword">in</span> <span class="hljs-keyword">as</span> the correct <span class="hljs-keyword">user</span>? </code></pre>
<p>提示没有权限，其实就是你的module名在npm上已经被占用啦，这时候你就去需要去npm搜索你的模块名称，如果搜索不到，就可以用，并且把<code>package.json</code>里的<code>name</code>修改过来，重新<code>npm publish</code>，看到如下信息就表示安装完成了，<code>rc-fullpage</code>就是我的模块名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ rc-fullpage@0.1.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">+ <span class="hljs-selector-tag">rc-fullpage</span>@<span class="hljs-keyword">0</span>.<span class="hljs-keyword">1</span>.<span class="hljs-keyword">0</span></code></pre>
<p>更新版本，发布</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm version 0.1.1
$ npm publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>$ <span class="hljs-built_in">npm</span> version <span class="hljs-number">0.1</span><span class="hljs-number">.1</span>
$ <span class="hljs-built_in">npm</span> publish</code></pre>
<h3 id="articleHeader6">版本号规范</h3>
<p>npm社区版本号规则采用的是<a href="http://semver.org/lang/zh-CN/" rel="nofollow noreferrer" target="_blank">semver</a>（语义化版本），主要规则版本格式：主版本号.次版本号.修订号，版本号递增规则如下：</p>
<ul>
<li><p>主版本号：当你做了不兼容的 API 修改，</p></li>
<li><p>次版本号：当你做了向下兼容的功能性新增，</p></li>
<li><p>修订号：当你做了向下兼容的问题修正。</p></li>
</ul>
<p>先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。</p>
<h3 id="articleHeader7">持续集成</h3>
<p>目前npm上开源的项目实在是太多，从中找出靠谱的项目要花费一定的精力跟时间去验证，所以开发者都会对自己的开源项目持续更新，并且经过测试的项目更加值得信赖。对于刚上线并且github上star星数很少的项目，使用者都会怀疑，这个项目靠谱不？所以这时候你需要告诉他，老子靠谱，怎么做？持续集成。</p>
<p>目前Github已经整合了持续集成服务travis，我们只需要在项目中添加.travis.yml文件，在下一次push之后，travis就会定时执行npm test来测试你的项目，并且会在测试失败的时候通知到你，你也可以把项目当前的状态显示在README.md中，让人一目了然，比如React里的</p>
<p><span class="img-wrap"><img data-src="/img/bVAobc" src="https://static.alili.tech/img/bVAobc" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><code>.travis.yml</code> 是一个YAML文件，具体的相关的配置见<a href="https://docs.travis-ci.com/user/languages/javascript-with-nodejs/" rel="nofollow noreferrer" target="_blank">This</a>，例子如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="language: node_js
node_js:
  - &quot;6&quot;
  - &quot;6.1&quot;
  - &quot;5.11&quot;
services:
  - mongodb" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>language: node_js
node_js:
  -<span class="ruby"> <span class="hljs-string">"6"</span>
</span>  -<span class="ruby"> <span class="hljs-string">"6.1"</span>
</span>  -<span class="ruby"> <span class="hljs-string">"5.11"</span>
</span>services:
  -<span class="ruby"> mongodb</span></code></pre>
<p>这个例子的是让travis在node.js的0.6.x，0.6.1，0.5.11三个版本下对项目进行测试，并且需要mongodb的服务。</p>
<h3 id="articleHeader8">End</h3>
<p>至此你的第一个module就开发并发布完成啦。</p>
<p><a href="https://github.com/dodospace/react-full-page" rel="nofollow noreferrer" target="_blank">rc-fullpage</a> 这是我前天化了一天时间开发的一个全屏的React组件，由于比较赶，功能不完善，只实现了简单的基础功能，接口还在后续开发中，单元测试没有，持续集成也木有。So，尽情的吐槽吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
发布自己的module - 我的第一个npm组件！

## 原文链接
[https://segmentfault.com/a/1190000006250554](https://segmentfault.com/a/1190000006250554)

