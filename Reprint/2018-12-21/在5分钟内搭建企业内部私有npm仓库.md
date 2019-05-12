---
title: '在5分钟内搭建企业内部私有npm仓库' 
date: 2018-12-21 2:30:11
hidden: true
slug: mu9rcnrpfu8
categories: [reprint]
---

{{< raw >}}

                    
<p>下面通过三种方法来搭建公司私有npm仓库，每种方式都有自己的优势。</p>
<blockquote>Node.js &gt;= 6.11.3，我的Node版本：node v8.2.1  <br>Linux or OSX，我的系统版本：CentOS Linux release 7.2.1511 (Core)</blockquote>
<p><a href="https://github.com/jaywcjlove/handbook/blob/master/CentOS/%E5%9C%A85%E5%88%86%E9%92%9F%E5%86%85%E6%90%AD%E5%BB%BA%E4%BC%81%E4%B8%9A%E5%86%85%E9%83%A8%E7%A7%81%E6%9C%89npm%E4%BB%93%E5%BA%93.md" rel="nofollow noreferrer" target="_blank">教程归档在我的Github中欢迎修正和Star</a></p>
<h2 id="articleHeader0">cnpm搭建</h2>
<h3 id="articleHeader1">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g --build-from-source cnpmjs.org cnpm sqlite3
# 如果报错或者警告通过下面方式安装
npm install -g --unsafe-perm --verbose --build-from-source cnpmjs.org cnpm sqlite3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install -g --build-from-source cnpmjs.org cnpm sqlite3
<span class="hljs-comment"># 如果报错或者警告通过下面方式安装</span>
npm install -g --unsafe-perm --verbose --build-from-source cnpmjs.org cnpm sqlite3</code></pre>
<p>如果安装不流畅通过下面形式安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g --build-from-source \
  --registry=https://registry.npm.taobao.org \
  --disturl=https://npm.taobao.org/mirrors/node \
  cnpmjs.org cnpm sqlite3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install -g --build-from-source \
  --registry=https://registry.npm.taobao.org \
  --disturl=https://npm.taobao.org/mirrors/node \
  cnpmjs.org cnpm sqlite3</code></pre>
<p>如果报警告或者安装错误，请添加参数<code>--unsafe-perm --verbose</code></p>
<h3 id="articleHeader2">启动并配置服务</h3>
<blockquote>管理员：<code>myname,othername</code>  <br>范围：<code>my-company-name,other-name</code>  <br>默认端口：7001-registry, 7002-web</blockquote>
<p>启动服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ nohup cnpmjs.org start --admins='myname,othername' \
  --scopes='@my-company-name,@other-name' &amp;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ nohup cnpmjs.org start --admins=<span class="hljs-string">'myname,othername'</span> \
  --scopes=<span class="hljs-string">'@my-company-name,@other-name'</span> &amp;</code></pre>
<h3 id="articleHeader3">设置注册地址</h3>
<p>将cnpm默认注册地址更改为私有注册地址</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm set registry http://localhost:7001" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">cnpm <span class="hljs-built_in">set</span> registry http://localhost:7001</code></pre>
<h3 id="articleHeader4">登录cnpm</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cnpm login
Username: myname
Password: ***
Email: (this IS public) test@test.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ cnpm login
Username: myname
Password: ***
Email: (this IS public) <span class="hljs-built_in">test</span>@test.com</code></pre>
<h3 id="articleHeader5">包上传到私有仓库</h3>
<p>新建项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd /tmp
$ mkdir helloworld &amp;&amp; cd helloworld
$ cnpm init
name: (helloworld) @my-company-name/helloworld
version: (1.0.0)

{
  &quot;name&quot;: &quot;@my-company-name/helloworld&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;my first scoped package&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>$ <span class="hljs-keyword">cd</span> /tmp
$ <span class="hljs-keyword">mkdir</span> helloworld &amp;&amp; <span class="hljs-keyword">cd</span> helloworld
$ cnpm init
name: (helloworld) @my-company-name/helloworld
<span class="hljs-keyword">version</span>: (1.0.0)

{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"@my-company-name/helloworld"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"my first scoped package"</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-string">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"ISC"</span>
}</code></pre>
<p>上传到私有仓库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cnpm publish
+ @my-company-name/helloworld@1.0.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ cnpm publish
+ @my-company-name/helloworld@1.0.0</code></pre>
<h3 id="articleHeader6">查看预览包</h3>
<p>浏览器中预览</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="open http://localhost:7002/@my-company-name/helloworld" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">open http://localhost:7002/@my-company-name/helloworld</code></pre>
<p>使用<code>cnpm</code>预览</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm info" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">cnpm</span> <span class="hljs-literal">info</span></code></pre>
<h3 id="articleHeader7">安装</h3>
<p>所有公共包都可直接使用<code>cnpm</code>安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install hotkeys-js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">cnpm install hotkeys-js</code></pre>
<h2 id="articleHeader8">通过verdaccio搭建</h2>
<p><a href="https://github.com/verdaccio/verdaccio" rel="nofollow noreferrer" target="_blank">verdaccio</a> 是一个轻量级的私有npm代理注册。（<a href="https://github.com/rlidwka/sinopia" rel="nofollow noreferrer" target="_blank">sinopia</a> fork）</p>
<h3 id="articleHeader9">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 使用 npm 安装
npm install -g npm

# 使用 yarn 安装
yarn global add verdaccio" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 使用 npm 安装</span>
npm install -g npm

<span class="hljs-comment"># 使用 yarn 安装</span>
yarn global add verdaccio</code></pre>
<h3 id="articleHeader10">启动服务</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="verdaccio >> verdaccio.log 2>&amp;1 &amp; # 后台启动并写入日志

# Verdaccio doesn't need superuser privileges. Don't run it under root.
# warn --- config file  - /root/.config/verdaccio/config.yaml
# warn --- http address - http://localhost:4873/ - verdaccio/2.3.6

verdaccio --listen 4000 --config ./config.yaml # 指定配置启动" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">verdaccio &gt;&gt; verdaccio.log 2&gt;&amp;1 &amp; <span class="hljs-comment"># 后台启动并写入日志</span>

<span class="hljs-comment"># Verdaccio doesn't need superuser privileges. Don't run it under root.</span>
<span class="hljs-comment"># warn --- config file  - /root/.config/verdaccio/config.yaml</span>
<span class="hljs-comment"># warn --- http address - http://localhost:4873/ - verdaccio/2.3.6</span>

verdaccio --listen 4000 --config ./config.yaml <span class="hljs-comment"># 指定配置启动</span></code></pre>
<h3 id="articleHeader11">添加用户/登录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm adduser --registry  http://localhost:4873" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm adduser --registry  http://localhost:4873</code></pre>
<h3 id="articleHeader12">上传私有包</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish --registry http://localhost:4873" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm publish --registry http://localhost:4873</code></pre>
<h3 id="articleHeader13">本地配置注册地址</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config list -l # 查看默认配置
# 将默认地址 https://registry.npmjs.org/ 改成私有地址
npm set registry http://localhost:4873
# 如果您使用HTTPS，请添加适当的CA信息
#（“null”表示从操作系统获取CA列表）
$ npm set ca null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm config list <span class="hljs-_">-l</span> <span class="hljs-comment"># 查看默认配置</span>
<span class="hljs-comment"># 将默认地址 https://registry.npmjs.org/ 改成私有地址</span>
npm <span class="hljs-built_in">set</span> registry http://localhost:4873
<span class="hljs-comment"># 如果您使用HTTPS，请添加适当的CA信息</span>
<span class="hljs-comment">#（“null”表示从操作系统获取CA列表）</span>
$ npm <span class="hljs-built_in">set</span> ca null</code></pre>
<h2 id="articleHeader14">Git仓库当私有npm</h2>
<p>这个方法得益于，npm提供的的丰富安装方法。通过下面方法安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -S git+ssh://git@git.showgold.cn:npm/hello.git

npm install -S git+ssh://git@github.com:npm/npm.git#v1.0.27
npm install -S git+ssh://git@github.com:npm/npm#semver:^5.0
npm install -S git+https://isaacs@github.com/npm/npm.git
npm install -S git://github.com/npm/npm.git#v1.0.27" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm i -S git+ssh://git@git.showgold.cn:npm/hello.git

npm install -S git+ssh://git@github.com:npm/npm.git<span class="hljs-comment">#v1.0.27</span>
npm install -S git+ssh://git@github.com:npm/npm<span class="hljs-comment">#semver:^5.0</span>
npm install -S git+https://isaacs@github.com/npm/npm.git
npm install -S git://github.com/npm/npm.git<span class="hljs-comment">#v1.0.27</span></code></pre>
<p>⚠️ 上面安装需要注意：你的工程一定是在某一个组下面建立，方便管理，在生成你的包的时候<code>package.json</code>中的<code>name</code>一定要带上范围</p>
<h3 id="articleHeader15">建立一个私有模块</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 假设你建立了一个Git仓库，先克隆下来
git clone http://git.your-inc.com/companyfe/hello-private.git

# 生成 `package.json` 配置, 注意限定 `@scope` 范围
npm init --scope=companyfe
# 提交到仓库
git push origin master" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 假设你建立了一个Git仓库，先克隆下来</span>
git <span class="hljs-built_in">clone</span> http://git.your-inc.com/companyfe/hello-private.git

<span class="hljs-comment"># 生成 `package.json` 配置, 注意限定 `@scope` 范围</span>
npm init --scope=companyfe
<span class="hljs-comment"># 提交到仓库</span>
git push origin master</code></pre>
<p>⚠️ 将得到如下依赖，注意：</p>
<blockquote>
<code>name</code>字段必须限定范围，一般为 GitLab group 的名字, 例如 <code>@companyfe</code>, 那么 <code>name</code> 为: <code>@companyfe/hello-private</code>。  <br><code>private</code> 设为 <code>true</code> 防止将私有模块上传到公网上去，需要手动设置一下。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;@companyfe/hello-private&quot;,
  &quot;version&quot;: &quot;1.0.1&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;private&quot;:true,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;author&quot;: &quot;kenny wang <wowohoo@qq.com> (http://wangchujiang.com)&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"@companyfe/hello-private"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.1"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"private"</span>:<span class="hljs-literal">true</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"kenny wang &lt;wowohoo@qq.com&gt; (http://wangchujiang.com)"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>
}</code></pre>
<h3 id="articleHeader16">安装使用私有模块</h3>
<p>跟安装开源的模块一样, 使用 <code>npm install</code> 安装依赖即可. 私有模块会安装在 <code>@scope</code> 的子文件夹中, 例如: <code>node_modules/@companyfe/hello-private</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 基础安装
npm i -S git+ssh://git@git.your-inc.com/companyfe/hello-private.git
# 带版本信息的，必须通过 git 打 tag
npm i -S git+ssh://git@git.your-inc.com/companyfe/hello-private.git#v1.2.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 基础安装</span>
npm i -S git+ssh://git@git.your-inc.com/companyfe/hello-private.git
<span class="hljs-comment"># 带版本信息的，必须通过 git 打 tag</span>
npm i -S git+ssh://git@git.your-inc.com/companyfe/hello-private.git<span class="hljs-comment">#v1.2.0</span></code></pre>
<p>将得到如下依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;helloworld&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;dependencies&quot;: {
    &quot;@companyfe/hello-private&quot;: &quot;git+ssh://git@git.your-inc.com/companyfe/hello-private.git#v1.2.0&quot;
  },
  &quot;author&quot;: &quot;kenny wang <wowohoo@qq.com> (http://wangchujiang.com)&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"helloworld"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"@companyfe/hello-private"</span>: <span class="hljs-string">"git+ssh://git@git.your-inc.com/companyfe/hello-private.git#v1.2.0"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"kenny wang &lt;wowohoo@qq.com&gt; (http://wangchujiang.com)"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>
}</code></pre>
<p>使用私有模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hello = require('@companyfe/hello-private');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> hello = <span class="hljs-built_in">require</span>(<span class="hljs-string">'@companyfe/hello-private'</span>);</code></pre>
<h3 id="articleHeader17">优劣势</h3>
<p>不好的地方是，使用 <code>npm update</code> 是无法更新私有模块，想更新只能重新安装一次。好处是不用搭建服务。</p>
<h2 id="articleHeader18">参考资料</h2>
<ul><li><a href="https://docs.npmjs.com/misc/registry#can-i-run-my-own-private-registry" rel="nofollow noreferrer" target="_blank">Can I run my own private registry?</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在5分钟内搭建企业内部私有npm仓库

## 原文链接
[https://segmentfault.com/a/1190000012483764](https://segmentfault.com/a/1190000012483764)

