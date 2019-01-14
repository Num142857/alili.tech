---
title: 'npm-参考手册' 
date: 2019-01-15 2:30:12
hidden: true
slug: jqvnazavkno
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">索引</h3>
<ul>
<li>
<p>权限</p>
<ul>
<li><p>t/team 组织成员管理</p></li>
<li><p>access 包访问控制</p></li>
<li><p>adduser/login 用户登录</p></li>
<li><p>logout 注销</p></li>
<li><p>owner 所有者管理</p></li>
<li><p>whoami 查看用户信息</p></li>
</ul>
</li>
<li>
<p>包仓储</p>
<ul>
<li><p>s/se/search 仓储查找包</p></li>
<li><p>publish 发布</p></li>
<li><p>unpublish 取消发布</p></li>
<li><p>deprecate 弃用</p></li>
<li><p>stars 我喜欢的包</p></li>
<li><p>star 喜欢</p></li>
<li><p>unstar 取消喜欢</p></li>
</ul>
</li>
<li>
<p>包本地</p>
<ul>
<li><p>init 初始化package.json</p></li>
<li><p>i/install 安装</p></li>
<li><p>un/uninstall 删除</p></li>
<li><p>dedupe/ddp 清除重复包</p></li>
<li><p>dist-tags 标签管理</p></li>
<li><p>version 更新包的版本信息</p></li>
<li><p>it/install-test 运行npm install &amp;&amp; npm test</p></li>
<li><p>ln/link 安装链接</p></li>
<li><p>ls/list 列出包</p></li>
<li><p>update/up 更新并安装遗漏的包</p></li>
<li><p>outdated 检测过期</p></li>
<li><p>pack 打包tarball文件</p></li>
<li><p>prune 清理外来包</p></li>
<li><p>shrinkwrap 锁定依赖包版本</p></li>
<li><p>cache 缓存管理</p></li>
</ul>
</li>
<li>
<p>脚本</p>
<ul>
<li><p>run/run-script 运行脚本</p></li>
<li><p>start 运行start脚本</p></li>
<li><p>stop 运行stop脚本</p></li>
<li><p>tst/test 运行test脚本</p></li>
<li><p>rb/rebuild 重新编译本地包</p></li>
<li><p>restart  顺序执行重启相关的一系列脚本</p></li>
</ul>
</li>
<li>
<p>配置</p>
<ul>
<li><p>c/config 配置管理</p></li>
<li><p>get 列出配置</p></li>
<li><p>set 设置配置</p></li>
</ul>
</li>
<li>
<p>查看</p>
<ul>
<li><p>root  包根目录</p></li>
<li><p>prefix 打印prefix配置</p></li>
<li><p>v/view 查看仓储信息</p></li>
<li><p>bin 查看bin目录</p></li>
<li><p>bugs/issue 浏览器查看bugs</p></li>
<li><p>docs/home 浏览器查看帮助文档</p></li>
<li><p>repo 浏览器查看仓储</p></li>
<li><p>help 查看帮助</p></li>
<li><p>help-search 帮助中搜索关键字</p></li>
</ul>
</li>
<li>
<p>其他</p>
<ul>
<li><p>completion shell插补</p></li>
<li><p>doctor 环境检测</p></li>
<li><p>edit 进入包目录并启动编辑器</p></li>
<li><p>explore 进入包目录并运行命令</p></li>
<li><p>ping 检查仓储是否可用</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader1">权限</h3>
<p>npm允许通过scope组织私有包，通过team细化权限控制. </p>
<p>npm官方仓储有两种类型的包，普通包和scope包</p>
<p>普通包特征:</p>
<ul>
<li><p>只能公有，谁都可以下载使用</p></li>
<li><p>仅可以通过所有者(owner)进行权限控制，如果要允许某个用户修改或发布包，必须将该用户添加到包的所有者列表。添加到包所有者列表的用户具备所有的权限.</p></li>
</ul>
<p>scope包特征:</p>
<ul>
<li><p>包名有两部组成，@scope/name, @后的为scope名,/后的才是具体的包名</p></li>
<li><p>可以控制公有和私有</p></li>
<li><p>细化的权限控制，比如可以创建团队,并赋予团队对包只读/修改的权限</p></li>
</ul>
<h4>owner</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm owner add <user> [<@scope>/]<pkg> # 将用户添加到包的所有者列表
npm owner rm <user> [<@scope>/]<pkg> # 从包的所有这列表中删除用户
npm owner ls [<@scope>/]<pkg> # 列出包的所有者" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>npm owner add <span class="hljs-params">&lt;user&gt;</span> [<span class="hljs-params">&lt;@scope&gt;</span>/]<span class="hljs-params">&lt;pkg&gt;</span> <span class="hljs-meta"># 将用户添加到包的所有者列表</span>
npm owner rm <span class="hljs-params">&lt;user&gt;</span> [<span class="hljs-params">&lt;@scope&gt;</span>/]<span class="hljs-params">&lt;pkg&gt;</span> <span class="hljs-meta"># 从包的所有这列表中删除用户</span>
npm owner ls [<span class="hljs-params">&lt;@scope&gt;</span>/]<span class="hljs-params">&lt;pkg&gt;</span> <span class="hljs-meta"># 列出包的所有者</span></code></pre>
<p>成为包的所有者的用户，将能够修改元数据(如标记弃用)，发布新版本,添加其他用户到包的所有者列表</p>
<h4>t/team</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm team create <scope:team> # 创建团队
npm team destroy <scope:team> # 删除团队

npm team add <scope:team> <user> # 添加用户到团队
npm team rm <scope:team> <user> # 从团队中移除用户 

npm team ls <scope>|<scope:team> 列出团队/成员

npm team edit <scope:team>  用编辑器编辑团队信息" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>npm team create <span class="hljs-params">&lt;scope:team&gt;</span> <span class="hljs-meta"># 创建团队</span>
npm team destroy <span class="hljs-params">&lt;scope:team&gt;</span> <span class="hljs-meta"># 删除团队</span>

npm team add <span class="hljs-params">&lt;scope:team&gt;</span> <span class="hljs-params">&lt;user&gt;</span> <span class="hljs-meta"># 添加用户到团队</span>
npm team rm <span class="hljs-params">&lt;scope:team&gt;</span> <span class="hljs-params">&lt;user&gt;</span> <span class="hljs-meta"># 从团队中移除用户 </span>

npm team ls <span class="hljs-params">&lt;scope&gt;</span>|<span class="hljs-params">&lt;scope:team&gt;</span> 列出团队/成员

npm team edit <span class="hljs-params">&lt;scope:team&gt;</span>  用编辑器编辑团队信息</code></pre>
<h4>access</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm access public [<package>]  # 设置包开放
npm access restricted [<package>] # 设置包私有

npm access grant <read-only|read-write> <scope:team> [<package>] # 设置团队对包可以只读/允许修改
npm access revoke <scope:team> [<package>] # 从团队中收回包权限

npm access ls-packages [<user>|<scope>|<scope:team>]  # 列出用户/域/团队能够访问的包
npm access ls-collaborators [<package> [<user>]] # 列出包的权限信息
npm access edit [<package>] # 用编辑器编辑包权限" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>npm access <span class="hljs-keyword">public</span> <span class="hljs-meta">[&lt;package&gt;]</span>  # 设置包开放
npm access restricted <span class="hljs-meta">[&lt;package&gt;]</span> # 设置包私有

npm access grant &lt;read-only|read-write&gt; &lt;scope:team&gt; <span class="hljs-meta">[&lt;package&gt;]</span> # 设置团队对包可以只读/允许修改
npm access revoke &lt;scope:team&gt; <span class="hljs-meta">[&lt;package&gt;]</span> # 从团队中收回包权限

npm access ls-packages <span class="hljs-meta">[&lt;user&gt;|&lt;scope&gt;|&lt;scope:team&gt;]</span>  # 列出用户/域/团队能够访问的包
npm access ls-collaborators <span class="hljs-meta">[&lt;package&gt; [&lt;user&gt;]</span>] # 列出包的权限信息
npm access edit <span class="hljs-meta">[&lt;package&gt;]</span> # 用编辑器编辑包权限</code></pre>
<h4>adduser/login</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm adduser [--registry=url] [--scope=@orgname] [--always-auth]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">npm adduser <span class="hljs-string">[--registry=url]</span> <span class="hljs-string">[--scope=@orgname]</span> <span class="hljs-string">[--always-auth]</span></code></pre>
<p>提示输入username, password, email，进行登录校验，返回token保存到.npmrc</p>
<h4>logout</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm logout [--registry=<url>] [--scope=<@scope>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">npm logout <span class="hljs-string">[--registry=&lt;url&gt;]</span> <span class="hljs-string">[--scope=&lt;@scope&gt;]</span></code></pre>
<p>请求仓储服务将当前token失效</p>
<h4>whoami</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm whoami [--registry <registry>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code style="word-break: break-word; white-space: initial;">npm whoami [--<span class="hljs-keyword">registry</span> &lt;<span class="hljs-keyword">registry</span>&gt;]</code></pre>
<p>列出用户在npmjs.org上的用户名</p>
<h3 id="articleHeader2">包仓储</h3>
<h4>s/se/search</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm search [-l|--long] [--json] [--parseable] [--no-description] [search terms ...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">npm search <span class="hljs-string">[-l|--long]</span> <span class="hljs-string">[--json]</span> <span class="hljs-string">[--parseable]</span> <span class="hljs-string">[--no-description]</span> <span class="hljs-string">[search terms ...]</span></code></pre>
<ul>
<li><p>-l|--long: 展示出全部的DESCRIPTION栏信息</p></li>
<li><p>--no-description: 不显示DESCRIPTION栏信息</p></li>
</ul>
<h4>publish</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish [<tarball>|<folder>] [--tag <tag>] [--access <public|restricted>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm publish <span class="hljs-meta">[&lt;tarball&gt;|&lt;folder&gt;]</span> [--tag &lt;tag&gt;] [--access &lt;<span class="hljs-keyword">public</span>|restricted&gt;]</code></pre>
<ul>
<li><p>--tag: 带上tag信息发布,之后包可以通过<code>npm install &lt;name&gt;@&lt;tag&gt;</code>安装</p></li>
<li><p>--access: 仅适用于scope包,默认为restricted</p></li>
</ul>
<h4>unpublish</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm unpublish [<@scope>/]<pkg>[@<version>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm unpublish <span class="hljs-meta">[&lt;@scope&gt;/]&lt;pkg&gt;[@&lt;version&gt;]</span></code></pre>
<p>从仓储中删除包,该操作会破坏依赖，不推荐适用，如果是为了鼓励用户适用新版本，可以使用deprecate命令</p>
<h4>deprecate</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm deprecate <pkg>[@<version>] <message>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">npm deprecate <span class="hljs-tag">&lt;<span class="hljs-name">pkg</span>&gt;</span>[@<span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>] <span class="hljs-tag">&lt;<span class="hljs-name">message</span>&gt;</span></code></pre>
<p>标记包弃用，用户在安装时npm会有警告</p>
<h4>stars</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm stars [<user>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm stars <span class="hljs-meta">[&lt;user&gt;]</span></code></pre>
<p>查看用户喜欢的包</p>
<h4>star/unstart</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm star [<pkg>...]
npm unstar [<pkg>...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>npm <span class="hljs-keyword">star</span> [<span class="hljs-symbol">&lt;pkg&gt;</span>...]
npm unstar [<span class="hljs-symbol">&lt;pkg&gt;</span>...]</code></pre>
<p>标记喜欢/取消喜欢标记</p>
<h3 id="articleHeader3">包本地</h3>
<h4>init</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init [-f|--force|-y|--yes]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;">npm init [-f|<span class="hljs-type">--force</span>|<span class="hljs-type">-y</span>|<span class="hljs-type">--yes</span>]</code></pre>
<p>初始化package.json,  默认会有很多输入提示，可以通过<code>-f|--force|-y|--yes</code>选项创建默认配置的package.json<br>已经存在package.json后再次运行<code>npm init</code>不会破坏已有配置,只会变更你真正改动的部分</p>
<h4>i/install</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install (with no args, in package dir) # 读取package.json安装
npm install [<@scope>/]<name> # 默认安装标签为latest
npm install [<@scope>/]<name>@<tag> # 指定标签
npm install [<@scope>/]<name>@<version> # 指定版本
npm install [<@scope>/]<name>@<version range> # 指定版本范围
npm install <tarball file>  # 通过tarball文件安装
npm install <tarball url> # 通过tarball文件url链接安装
npm install <git remote url> # 通过git安装包, url格式为<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish>]
npm install <folder> 通过包所在的文件夹安装" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> (<span class="hljs-keyword">with</span> <span class="hljs-keyword">no</span> args, <span class="hljs-keyword">in</span> <span class="hljs-keyword">package</span> dir) # 读取package.json安装
npm <span class="hljs-keyword">install</span> [&lt;@<span class="hljs-keyword">scope</span>&gt;/]&lt;<span class="hljs-keyword">name</span>&gt; # 默认安装标签为latest
npm <span class="hljs-keyword">install</span> [&lt;@<span class="hljs-keyword">scope</span>&gt;/]&lt;<span class="hljs-keyword">name</span>&gt;@&lt;tag&gt; # 指定标签
npm <span class="hljs-keyword">install</span> [&lt;@<span class="hljs-keyword">scope</span>&gt;/]&lt;<span class="hljs-keyword">name</span>&gt;@&lt;<span class="hljs-keyword">version</span>&gt; # 指定版本
npm <span class="hljs-keyword">install</span> [&lt;@<span class="hljs-keyword">scope</span>&gt;/]&lt;<span class="hljs-keyword">name</span>&gt;@&lt;<span class="hljs-keyword">version</span> <span class="hljs-keyword">range</span>&gt; # 指定版本范围
npm <span class="hljs-keyword">install</span> &lt;tarball <span class="hljs-keyword">file</span>&gt;  # 通过tarball文件安装
npm <span class="hljs-keyword">install</span> &lt;tarball <span class="hljs-keyword">url</span>&gt; # 通过tarball文件<span class="hljs-keyword">url</span>链接安装
npm <span class="hljs-keyword">install</span> &lt;git remote <span class="hljs-keyword">url</span>&gt; # 通过git安装包, <span class="hljs-keyword">url</span>格式为&lt;protocol&gt;://[&lt;<span class="hljs-keyword">user</span>&gt;[:&lt;<span class="hljs-keyword">password</span>&gt;]@]&lt;hostname&gt;[:&lt;port&gt;][:][/]&lt;<span class="hljs-keyword">path</span>&gt;[#&lt;<span class="hljs-keyword">commit</span>-ish&gt;]
npm <span class="hljs-keyword">install</span> &lt;folder&gt; 通过包所在的文件夹安装</code></pre>
<ul>
<li><p>--registry: 从指定仓储中下载安装包</p></li>
<li><p>-S/--save: 安装并保存包信息到package.json的dependencies区</p></li>
<li><p>-D/--save-dev: 安装并保存包信息到package.json的devDependencies区</p></li>
<li><p>--tag: 优先根据标签而不是版本安装包</p></li>
<li><p>--dry-run: 报告安装状况而不真的安装</p></li>
<li><p>-f/--force: 安装时跳过缓存直接从远程下载</p></li>
<li><p>-g/--global: 安装到全局</p></li>
<li><p>--link: 链接全局安装的包的本地</p></li>
<li><p>--no-shrinkwrap: 安装时忽略shrinkwrap</p></li>
</ul>
<h4>un/uninstall</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm uninstall <span class="hljs-meta">[&lt;@scope&gt;/]&lt;pkg&gt;[@&lt;version&gt;]</span>... [-S|--save|-D|--save-dev]</code></pre>
<ul>
<li><p>-S/--save: 删除包并移除包在package.json的dependencies区的信息</p></li>
<li><p>-D/--save-dev: 删除包并移除包在package.json的devDependencies区的信息</p></li>
</ul>
<h4>ddp/dedupe</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm dedupe" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> dedupe</code></pre>
<p>npm检查包依赖树并清除不要的包</p>
<h4>dist-tags</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm dist-tag add <pkg>@<version> [<tag>] # 添加标签
npm dist-tag rm <pkg> <tag> # 移除标签
npm dist-tag ls [<pkg>] # 列出包所包含的标签" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>npm dist-tag add &lt;pkg&gt;@&lt;version&gt; <span class="hljs-meta">[&lt;tag&gt;]</span> # 添加标签
npm dist-tag rm &lt;pkg&gt; &lt;tag&gt; # 移除标签
npm dist-tag ls <span class="hljs-meta">[&lt;pkg&gt;]</span> # 列出包所包含的标签</code></pre>
<p>常见标签有latest, next, lts等</p>
<p>可以在发布和下载包是带上标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish # 默认标签latest
npm publish --tag next  # 发布next标签 
npm install npm # 默认标签latest
npm install npm@next  
npm install --tag next" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> publish <span class="hljs-comment"># 默认标签latest</span>
<span class="hljs-built_in">npm</span> publish --tag next  <span class="hljs-comment"># 发布next标签 </span>
<span class="hljs-built_in">npm</span> install <span class="hljs-built_in">npm</span> <span class="hljs-comment"># 默认标签latest</span>
<span class="hljs-built_in">npm</span> install <span class="hljs-built_in">npm</span>@next  
<span class="hljs-built_in">npm</span> install --tag next</code></pre>
<ul><li><p>--registry: 发布包到指定仓储</p></li></ul>
<h4>v/version</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code style="word-break: break-word; white-space: initial;">npm version [<span class="hljs-variable">&lt;newversion&gt;</span> |<span class="hljs-string"> major </span>|<span class="hljs-string"> minor </span>|<span class="hljs-string"> patch </span>|<span class="hljs-string"> premajor </span>|<span class="hljs-string"> preminor </span>|<span class="hljs-string"> prepatch </span>|<span class="hljs-string"> prerelease </span>|<span class="hljs-string"> from-git]</span></code></pre>
<p>该命令执行步骤</p>
<ol>
<li><p>检查git工作目录</p></li>
<li><p>运行preversion脚本, 可以写些触发测试的脚本</p></li>
<li>
<p>结合当前包当前版本信息和patch, minor, major等，生成新版本号，更新package.json中version字段</p>
<ul>
<li><p>patch 1.0.0 =&gt; 1.0.1</p></li>
<li><p>prepatch 1.0.0 =&gt; 1.0.1-0</p></li>
<li><p>minor 1.0.0 =&gt; 1.1.0</p></li>
<li><p>preminor 1.0.0 =&gt; 1.1.0-0</p></li>
<li><p>major 1.0.0 =&gt; 2.0.0</p></li>
<li><p>premajor 1.0.0 =&gt; 2.0.0-0</p></li>
<li><p>prerelease 1.0.0-0 =&gt; 1.0.0-1</p></li>
<li><p>from-git 从git获取版本信息</p></li>
</ul>
</li>
<li><p>运行version脚本</p></li>
<li><p>git提交并打标签</p></li>
<li><p>运行postversion脚本</p></li>
</ol>
<h4>it/install-test</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm it
npm install-test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-built_in">npm</span> <span class="hljs-literal">it</span>
<span class="hljs-built_in">npm</span> install-test</code></pre>
<p>相当于运行npm install &amp;&amp; npm test</p>
<h4>ln/link</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm link  # 在全局node_modules下创建当前文件夹的超链接
npm link [<@scope>/]<pkg>[@<version>] # 将全局安装的包链接到本地node_modules中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>npm link  # 在全局node_modules下创建当前文件夹的超链接
npm link <span class="hljs-meta">[&lt;@scope&gt;/]&lt;pkg&gt;[@&lt;version&gt;]</span> # 将全局安装的包链接到本地node_modules中</code></pre>
<h4>ls/list</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm ls [[<@scope>/]<pkg> ...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">npm ls [[<span class="hljs-tag">&lt;<span class="hljs-name">@scope</span>&gt;</span>/]<span class="hljs-tag">&lt;<span class="hljs-name">pkg</span>&gt;</span> ...]</code></pre>
<p>打印依赖树</p>
<ul>
<li><p>--json: 已json格式输出</p></li>
<li><p>--long: 展示更多信息</p></li>
<li><p>--parseable: 显示展平的目录而不是依赖树</p></li>
<li><p>--global: 显示全局安装的包的依赖树</p></li>
<li><p>--depth: 树层级,从0开始</p></li>
<li><p>--prod/production: 仅显示package.json里dependencies包的依赖</p></li>
<li><p>--dev: 仅显示package.json里devDependencies包的依赖</p></li>
</ul>
<h4>up/update</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm update [-g] [<pkg>...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">npm update <span class="hljs-string">[-g]</span> <span class="hljs-string">[&lt;pkg&gt;...]</span></code></pre>
<p>更新包到包的semver所允许的最新版本, 并安装遗漏的包</p>
<ul>
<li><p>--save: 更新并保存更新到package.json</p></li>
<li><p>--dev: 同时更新devDependencies中的包</p></li>
<li><p>--depth: 默认情况下仅更新顶层(--depth=0)为0的包,如果想更新所有包，可以指定--depth=9999</p></li>
</ul>
<h4>outdated</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm outdated [[<@scope>/]<pkg> ...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">npm outdated [[<span class="hljs-tag">&lt;<span class="hljs-name">@scope</span>&gt;</span>/]<span class="hljs-tag">&lt;<span class="hljs-name">pkg</span>&gt;</span> ...]</code></pre>
<p>.e.g</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Package        Current  Wanted  Latest  Location
ajv              4.8.2  4.11.8   5.0.1  example
async            2.1.2   2.4.0   2.4.0  example
body-parser     1.15.2  1.17.1  1.17.1  example" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Package</span>        <span class="hljs-selector-tag">Current</span>  <span class="hljs-selector-tag">Wanted</span>  <span class="hljs-selector-tag">Latest</span>  <span class="hljs-selector-tag">Location</span>
<span class="hljs-selector-tag">ajv</span>              4<span class="hljs-selector-class">.8</span><span class="hljs-selector-class">.2</span>  4<span class="hljs-selector-class">.11</span><span class="hljs-selector-class">.8</span>   5<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>  <span class="hljs-selector-tag">example</span>
<span class="hljs-selector-tag">async</span>            2<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.2</span>   2<span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.0</span>   2<span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.0</span>  <span class="hljs-selector-tag">example</span>
<span class="hljs-selector-tag">body-parser</span>     1<span class="hljs-selector-class">.15</span><span class="hljs-selector-class">.2</span>  1<span class="hljs-selector-class">.17</span><span class="hljs-selector-class">.1</span>  1<span class="hljs-selector-class">.17</span><span class="hljs-selector-class">.1</span>  <span class="hljs-selector-tag">example</span></code></pre>
<p>列表栏</p>
<ul>
<li><p>Current: 当前版本</p></li>
<li><p>Wanted: smever允许的最高版本</p></li>
<li><p>Latest: 仓储中最新版本</p></li>
<li><p>Location: 依赖树中的位置</p></li>
</ul>
<p>命令选项</p>
<ul>
<li><p>--json: 已json格式输出</p></li>
<li><p>--long: 展示更多信息</p></li>
<li><p>--parseable: 平铺展示</p></li>
<li><p>--global: 显示全局安装的包的依赖树</p></li>
<li><p>--depth: 树层级,默认0</p></li>
</ul>
<h4>pack</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm pack [[<@scope>/]<pkg>...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">npm pack [[<span class="hljs-tag">&lt;<span class="hljs-name">@scope</span>&gt;</span>/]<span class="hljs-tag">&lt;<span class="hljs-name">pkg</span>&gt;</span>...]</code></pre>
<p>从包生成名为<code>&lt;name&gt;-&lt;version&gt;.tgz</code>的tarball,并缓存</p>
<h4>prune</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm prune [[<@scope>/]<pkg>...] [--production]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code style="word-break: break-word; white-space: initial;">npm prune <span class="hljs-comment">[<span class="hljs-comment">[&lt;@scope&gt;/]</span>&lt;pkg&gt;...]</span> <span class="hljs-comment">[--production]</span></code></pre>
<p>清理不在package.json生成的依赖树中的包</p>
<ul><li><p>--production: 移除devDependencies中的包</p></li></ul>
<h4>shrinkwrap</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm shrinkwrap" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> shrinkwrap</code></pre>
<p>shrinkwrap用来锁定依赖包的版本</p>
<p>包A的package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;: &quot;A&quot;,
    &quot;version&quot;: &quot;0.1.0&quot;,
    &quot;dependencies&quot;: {
        &quot;B&quot;: &quot;<0.1.0&quot;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"A"</span>,
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
    <span class="hljs-attr">"dependencies"</span>: {
        <span class="hljs-attr">"B"</span>: <span class="hljs-string">"&lt;0.1.0"</span>
    }
}
</code></pre>
<p>包A的依赖树</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" A@0.1.0
    `-- B@0.0.1
        `-- C@0.0.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> A@<span class="hljs-number">0.1</span><span class="hljs-number">.0</span>
    `-- B@<span class="hljs-number">0.0</span><span class="hljs-number">.1</span>
        `-- C@<span class="hljs-number">0.0</span><span class="hljs-number">.1</span></code></pre>
<p>当B有新版本0.0.2发布, B@0.0.2满足&lt;0.1.0, 所以<code>npm install A</code>安装成功后依赖树</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" A@0.1.0
    `-- B@0.0.2
        `-- C@0.0.1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> A@<span class="hljs-number">0.1</span><span class="hljs-number">.0</span>
    `-- B@<span class="hljs-number">0.0</span><span class="hljs-number">.2</span>
        `-- C@<span class="hljs-number">0.0</span><span class="hljs-number">.1</span>
</code></pre>
<p>我们希望包A依赖的B版本保持在B@0.0.1, 可以运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm shrinkwrap" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> shrinkwrap</code></pre>
<p>该命令会生成npm-shrinkwrap.json, 其内容如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
  &quot;name&quot;: &quot;A&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;dependencies&quot;: {
    &quot;B&quot;: {
      &quot;version&quot;: &quot;0.0.1&quot;,
      &quot;from&quot;: &quot;B@^0.0.1&quot;,
      &quot;resolved&quot;: &quot;https://registry.npmjs.org/B/-/B-0.0.1.tgz&quot;,
      &quot;dependencies&quot;: {
        &quot;C&quot;: {
          &quot;version&quot;: &quot;0.0.1&quot;,
          &quot;from&quot;: &quot;org/C#v0.0.1&quot;,
          &quot;resolved&quot;: &quot;git://github.com/org/C.git#5c380ae319fc4efe9e7f2d9c78b0faa588fd99b4&quot;
        }
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>
{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"A"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"B"</span>: {
      <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.0.1"</span>,
      <span class="hljs-attr">"from"</span>: <span class="hljs-string">"B@^0.0.1"</span>,
      <span class="hljs-attr">"resolved"</span>: <span class="hljs-string">"https://registry.npmjs.org/B/-/B-0.0.1.tgz"</span>,
      <span class="hljs-attr">"dependencies"</span>: {
        <span class="hljs-attr">"C"</span>: {
          <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.0.1"</span>,
          <span class="hljs-attr">"from"</span>: <span class="hljs-string">"org/C#v0.0.1"</span>,
          <span class="hljs-attr">"resolved"</span>: <span class="hljs-string">"git://github.com/org/C.git#5c380ae319fc4efe9e7f2d9c78b0faa588fd99b4"</span>
        }
      }
    }
  }
}</code></pre>
<p>运行<code>npm install</code>时如果存在npm-shrinkwrap.json, npm在安装包时会根据shrinkwrap.json锁定依赖包的版本</p>
<h4>cache</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm cache add <tarball file> # 添加到缓存
npm cache add <folder>
npm cache add <tarball url>
npm cache add <name>@<version> 

npm cache ls [<path>]  # 缓存明细

npm cache clean [<path>] # 清除缓存" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>npm cache add &lt;tarball file&gt; # 添加到缓存
npm cache add &lt;folder&gt;
npm cache add &lt;tarball url&gt;
npm cache add &lt;name&gt;@&lt;version&gt; 

npm cache ls <span class="hljs-meta">[&lt;path&gt;]</span>  # 缓存明细

npm cache clean <span class="hljs-meta">[&lt;path&gt;]</span> # 清除缓存</code></pre>
<p>缓存路径可以通过<code>npm config get cache</code>获取</p>
<h3 id="articleHeader4">脚本</h3>
<p>package.json的scripts区可以用来定义自定义脚本</p>
<h4>run/run-script</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run <command> [-- <args>...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> &lt;<span class="hljs-built_in">command</span>&gt; [-- &lt;args&gt;...]</span></code></pre>
<p>运行package.json的scripts中定义的命令</p>
<p>npm run会自动将<code>node_modules/.bin</code>添加到环境变量PATH中。如果本地安装过mocha, 可以这样编写<code>"scripts": {"test": "mocha test/\*.js"}</code>而不需要<code>"scripts": {"test": "node_modules/.bin/tap test/\*.js"}</code></p>
<h4>start</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start [-- <args>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-built_in">start</span> [<span class="hljs-comment">-- &lt;args&gt;]</span></code></pre>
<p>等同与<code>npm run start [-- &lt;args&gt;]</code></p>
<h4>stop</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm stop [-- <args>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-built_in">stop</span> [<span class="hljs-comment">-- &lt;args&gt;]</span></code></pre>
<p>等同与<code>npm run stop [-- &lt;args&gt;]</code></p>
<h4>tst/test</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm test [-- <args>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">test</span> [-- &lt;<span class="hljs-keyword">args</span>&gt;]</code></pre>
<p>等同与<code>npm run test [-- &lt;args&gt;]</code></p>
<h4>rb/rebuild</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm rebuild [[<@scope>/<name>]...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm rebuild [<span class="hljs-meta">[&lt;@scope&gt;/&lt;name&gt;]</span>...]</code></pre>
<p>运行指定包中的build脚本,适用于更新node版本后，重新编译C++包</p>
<h4>restart</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm restart [-- <args>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-built_in">restart</span> [-- &lt;<span class="hljs-built_in">args</span>&gt;]</code></pre>
<p>循序执行<code>1. prerestart 2. prestop 3. stop 4. poststop 5. restart 6. prestart 7. start 8. poststart 9. postrestart</code></p>
<h3 id="articleHeader5">配置</h3>
<h4>c/config</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set <key> <value> [-g|--global] # 添加或更新
npm config get <key> # 获取
npm config delete <key> # 删除
npm config list #  配置明细
npm config edit # 编辑器编辑" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> config set &lt;key&gt; &lt;value&gt; [-g|--<span class="hljs-built_in">global</span>] <span class="hljs-comment"># 添加或更新</span>
<span class="hljs-built_in">npm</span> config get &lt;key&gt; <span class="hljs-comment"># 获取</span>
<span class="hljs-built_in">npm</span> config <span class="hljs-keyword">delete</span> &lt;key&gt; <span class="hljs-comment"># 删除</span>
<span class="hljs-built_in">npm</span> config list <span class="hljs-comment">#  配置明细</span>
<span class="hljs-built_in">npm</span> config edit <span class="hljs-comment"># 编辑器编辑</span></code></pre>
<ul><li><p>--global: 全局配置</p></li></ul>
<h4>get</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm get <key> # 同npm config get" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-built_in">get</span> &lt;key&gt; # 同npm <span class="hljs-built_in">config</span> <span class="hljs-built_in">get</span></code></pre>
<h4>set</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm set <key> <value> [-g|--global] #同npm config set " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">set</span> <span class="hljs-symbol">&lt;key&gt;</span> <span class="hljs-symbol">&lt;value&gt;</span> [-g|--<span class="hljs-keyword">global</span>] #同npm config <span class="hljs-keyword">set</span> </code></pre>
<h3 id="articleHeader6">查看</h3>
<h4>root</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm root # 打印本地node_modules目录
npm root -g # 打印全局node_modules目录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> root <span class="hljs-comment"># 打印本地node_modules目录</span>
<span class="hljs-built_in">npm</span> root -g <span class="hljs-comment"># 打印全局node_modules目录</span></code></pre>
<h4>prefix</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm prefix # 打印包含package.json最近父目录
npm prefix -g # 打印全局配置prefix的值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> prefix <span class="hljs-comment"># 打印包含package.json最近父目录</span>
<span class="hljs-built_in">npm</span> prefix -g <span class="hljs-comment"># 打印全局配置prefix的值</span></code></pre>
<h4>view</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm view [<@scope>/]<name>[@<version>] [<field>[.<subfield>]...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm view <span class="hljs-meta">[&lt;@scope&gt;/]&lt;name&gt;[@&lt;version&gt;]</span> <span class="hljs-meta">[&lt;field&gt;[.&lt;subfield&gt;]</span>...]</code></pre>
<p>查看仓储信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm view compact


#  打印
{ name: 'compact',
  description: 'A JavaScript compacting middleware for express',
  'dist-tags': { latest: '0.1.2' },
  maintainers: [ 'serby <paul@serby.net>' ],
  time: 
   { modified: '2017-03-28T12:49:48.000Z',
     created: '2012-02-06T01:39:50.261Z',
     '0.1.2': '2012-09-04T11:19:17.618Z',
     '0.1.1': '2012-08-29T08:18:12.345Z',
     '0.1.0': '2012-07-09T14:40:56.751Z',
     '0.0.7': '2012-07-04T17:14:01.593Z',
     '0.0.6': '2012-06-29T14:29:04.847Z',
     '0.0.5': '2012-05-23T10:10:15.010Z',
     '0.0.4': '2012-03-31T09:05:40.450Z',
     '0.0.3': '2012-03-23T15:25:18.289Z',
     '0.0.2': '2012-03-21T18:15:24.718Z',
     '0.0.1': '2012-02-06T01:39:50.261Z' },
  users: { serby: true },
  author: 'Paul Serby <paul@serby.net>',
  repository: { type: 'git', url: 'git://github.com/serby/compact.git' },
  versions: 
   [ '0.0.1',
     '0.0.2',
     '0.0.3',
     '0.0.4',
     '0.0.5',
     '0.0.6',
     '0.0.7',
     '0.1.0',
     '0.1.1',
     '0.1.2' ],
  version: '0.1.2',
  main: './lib/compact.js',
  scripts: { test: 'mocha -r should -R spec' },
  engines: { node: '>=0.8' },
  dependencies: 
   { lodash: '~0.3',
     async: '~0.1',
     'uglify-js': '~1.3',
     mkdirp: '~0.3' },
  devDependencies: { mocha: '*', should: '~1.1', async: '~0.1', asyncjs: '~0.0' },
  optionalDependencies: {},
  dist: 
   { shasum: '66361e17108185bf261d42aff6a91b925e473139',
     size: 7603,
     noattachment: false,
     tarball: 'http://registry.npm.taobao.org/compact/download/compact-0.1.2.tgz' },
  directories: {},
  publish_time: 1346757557618 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">view</span> <span class="hljs-selector-tag">compact</span>


#  打印
{ <span class="hljs-attribute">name</span>: <span class="hljs-string">'compact'</span>,
  <span class="hljs-attribute">description</span>: <span class="hljs-string">'A JavaScript compacting middleware for express'</span>,
  <span class="hljs-string">'dist-tags'</span>: { <span class="hljs-attribute">latest</span>: <span class="hljs-string">'0.1.2'</span> },
  <span class="hljs-attribute">maintainers</span>: [ <span class="hljs-string">'serby &lt;paul@serby.net&gt;'</span> ],
  <span class="hljs-attribute">time</span>: 
   { <span class="hljs-attribute">modified</span>: <span class="hljs-string">'2017-03-28T12:49:48.000Z'</span>,
     <span class="hljs-attribute">created</span>: <span class="hljs-string">'2012-02-06T01:39:50.261Z'</span>,
     <span class="hljs-string">'0.1.2'</span>: <span class="hljs-string">'2012-09-04T11:19:17.618Z'</span>,
     <span class="hljs-string">'0.1.1'</span>: <span class="hljs-string">'2012-08-29T08:18:12.345Z'</span>,
     <span class="hljs-string">'0.1.0'</span>: <span class="hljs-string">'2012-07-09T14:40:56.751Z'</span>,
     <span class="hljs-string">'0.0.7'</span>: <span class="hljs-string">'2012-07-04T17:14:01.593Z'</span>,
     <span class="hljs-string">'0.0.6'</span>: <span class="hljs-string">'2012-06-29T14:29:04.847Z'</span>,
     <span class="hljs-string">'0.0.5'</span>: <span class="hljs-string">'2012-05-23T10:10:15.010Z'</span>,
     <span class="hljs-string">'0.0.4'</span>: <span class="hljs-string">'2012-03-31T09:05:40.450Z'</span>,
     <span class="hljs-string">'0.0.3'</span>: <span class="hljs-string">'2012-03-23T15:25:18.289Z'</span>,
     <span class="hljs-string">'0.0.2'</span>: <span class="hljs-string">'2012-03-21T18:15:24.718Z'</span>,
     <span class="hljs-string">'0.0.1'</span>: <span class="hljs-string">'2012-02-06T01:39:50.261Z'</span> },
  <span class="hljs-attribute">users</span>: { <span class="hljs-attribute">serby</span>: true },
  <span class="hljs-attribute">author</span>: <span class="hljs-string">'Paul Serby &lt;paul@serby.net&gt;'</span>,
  <span class="hljs-attribute">repository</span>: { <span class="hljs-attribute">type</span>: <span class="hljs-string">'git'</span>, <span class="hljs-attribute">url</span>: <span class="hljs-string">'git://github.com/serby/compact.git'</span> },
  <span class="hljs-attribute">versions</span>: 
   [ <span class="hljs-string">'0.0.1'</span>,
     <span class="hljs-string">'0.0.2'</span>,
     <span class="hljs-string">'0.0.3'</span>,
     <span class="hljs-string">'0.0.4'</span>,
     <span class="hljs-string">'0.0.5'</span>,
     <span class="hljs-string">'0.0.6'</span>,
     <span class="hljs-string">'0.0.7'</span>,
     <span class="hljs-string">'0.1.0'</span>,
     <span class="hljs-string">'0.1.1'</span>,
     <span class="hljs-string">'0.1.2'</span> ],
  <span class="hljs-attribute">version</span>: <span class="hljs-string">'0.1.2'</span>,
  <span class="hljs-attribute">main</span>: <span class="hljs-string">'./lib/compact.js'</span>,
  <span class="hljs-attribute">scripts</span>: { <span class="hljs-attribute">test</span>: <span class="hljs-string">'mocha -r should -R spec'</span> },
  <span class="hljs-attribute">engines</span>: { <span class="hljs-attribute">node</span>: <span class="hljs-string">'&gt;=0.8'</span> },
  <span class="hljs-attribute">dependencies</span>: 
   { <span class="hljs-attribute">lodash</span>: <span class="hljs-string">'~0.3'</span>,
     <span class="hljs-attribute">async</span>: <span class="hljs-string">'~0.1'</span>,
     <span class="hljs-string">'uglify-js'</span>: <span class="hljs-string">'~1.3'</span>,
     <span class="hljs-attribute">mkdirp</span>: <span class="hljs-string">'~0.3'</span> },
  <span class="hljs-attribute">devDependencies</span>: { <span class="hljs-attribute">mocha</span>: <span class="hljs-string">'*'</span>, <span class="hljs-attribute">should</span>: <span class="hljs-string">'~1.1'</span>, <span class="hljs-attribute">async</span>: <span class="hljs-string">'~0.1'</span>, <span class="hljs-attribute">asyncjs</span>: <span class="hljs-string">'~0.0'</span> },
  <span class="hljs-attribute">optionalDependencies</span>: {},
  <span class="hljs-attribute">dist</span>: 
   { <span class="hljs-attribute">shasum</span>: <span class="hljs-string">'66361e17108185bf261d42aff6a91b925e473139'</span>,
     <span class="hljs-attribute">size</span>: <span class="hljs-number">7603</span>,
     <span class="hljs-attribute">noattachment</span>: false,
     <span class="hljs-attribute">tarball</span>: <span class="hljs-string">'http://registry.npm.taobao.org/compact/download/compact-0.1.2.tgz'</span> },
  <span class="hljs-attribute">directories</span>: {},
  <span class="hljs-attribute">publish_time</span>: <span class="hljs-number">1346757557618</span> }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm view compact@0.1.2 dependencies

# 打印
{ lodash: '~0.3',
  async: '~0.1',
  'uglify-js': '~1.3',
  mkdirp: '~0.3' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">view</span> <span class="hljs-selector-tag">compact</span>@<span class="hljs-selector-tag">0</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.2</span> <span class="hljs-selector-tag">dependencies</span>

# 打印
{ <span class="hljs-attribute">lodash</span>: <span class="hljs-string">'~0.3'</span>,
  <span class="hljs-attribute">async</span>: <span class="hljs-string">'~0.1'</span>,
  <span class="hljs-string">'uglify-js'</span>: <span class="hljs-string">'~1.3'</span>,
  <span class="hljs-attribute">mkdirp</span>: <span class="hljs-string">'~0.3'</span> }</code></pre>
<h4>bin</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm bin # 打印包含npm bin目录, 通常为node_modules/.bin/
npm prefix -g # 打印全局npm bin目录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> bin <span class="hljs-comment"># 打印包含npm bin目录, 通常为node_modules/.bin/</span>
<span class="hljs-built_in">npm</span> prefix -g <span class="hljs-comment"># 打印全局npm bin目录</span></code></pre>
<h4>bugs/issue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm bugs [<packagename>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm bugs <span class="hljs-meta">[&lt;packagename&gt;]</span></code></pre>
<p>打开包bug追踪url</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm bugs npm # 浏览器打开https://github.com/npm/npm/issues" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> bugs <span class="hljs-built_in">npm</span> <span class="hljs-comment"># 浏览器打开https://github.com/npm/npm/issues</span></code></pre>
<h4>docs/home</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm docs [<pkgname> [<pkgname> ...]]
npm docs .
npm home [<pkgname> [<pkgname> ...]]
npm home ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>npm docs [&lt;pkgname&gt; [&lt;pkgname&gt; ...]]
npm docs .
npm home [&lt;pkgname&gt; [&lt;pkgname&gt; ...]]
npm home .</code></pre>
<p>打开文档url</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm docs npm #浏览器打开https://docs.npmjs.com/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> docs <span class="hljs-built_in">npm</span> <span class="hljs-comment">#浏览器打开https://docs.npmjs.com/</span></code></pre>
<h4>repo</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm repo [<pkg>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm repo <span class="hljs-meta">[&lt;pkg&gt;]</span></code></pre>
<p>打开git url</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm repo npm #浏览器打开https://github.com/npm/npm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> repo <span class="hljs-built_in">npm</span> <span class="hljs-comment">#浏览器打开https://github.com/npm/npm</span></code></pre>
<h4>help</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm help <term> [<terms..>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">npm help &lt;term&gt; <span class="hljs-meta">[&lt;terms..&gt;]</span></code></pre>
<p>打印特定术语或命令的帮助</p>
<h4>help-search</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm help-search <text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">help</span>-<span class="hljs-keyword">search</span> &lt;<span class="hljs-built_in">text</span>&gt;</code></pre>
<p>从npm官方markdown文档中搜索词条</p>
<h3 id="articleHeader7">其他</h3>
<h4>completion</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm completion >> ~/.bashrc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> completion &gt;&gt; ~/.bashrc</code></pre>
<p>npm命令插补脚本</p>
<h4>doctor</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm doctor" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> doctor</code></pre>
<p>环境检测</p>
<ul>
<li><p>npm能调用node和git命令</p></li>
<li><p>registry能够访问</p></li>
<li><p>本地和全局node_modules可写</p></li>
<li><p>缓存存在且tarball文件健全</p></li>
</ul>
<h4>edit</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm edit <pkg>[@<version>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">edit</span> <span class="hljs-symbol">&lt;pkg&gt;</span>[@<span class="hljs-symbol">&lt;version&gt;</span>]</code></pre>
<p>进入包目录并启动编辑器</p>
<h4>explore</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm explore <pkg> [-- <cmd>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">npm explore <span class="hljs-tag">&lt;<span class="hljs-name">pkg</span>&gt;</span> [-- <span class="hljs-tag">&lt;<span class="hljs-name">cmd</span>&gt;</span>]</code></pre>
<p>进入包目录并运行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm explore connect -- ls

# 打印
HISTORY.md  index.js  LICENSE  node_modules  package.json  README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">explore</span> <span class="hljs-selector-tag">connect</span> <span class="hljs-selector-tag">--</span> <span class="hljs-selector-tag">ls</span>

# 打印
<span class="hljs-selector-tag">HISTORY</span><span class="hljs-selector-class">.md</span>  <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>  <span class="hljs-selector-tag">LICENSE</span>  <span class="hljs-selector-tag">node_modules</span>  <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>  <span class="hljs-selector-tag">README</span><span class="hljs-selector-class">.md</span></code></pre>
<h4>ping</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm ping [--registry <registry>]
npm ping --registry https://registry.npmjs.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code>npm ping [--<span class="hljs-keyword">registry</span> &lt;<span class="hljs-keyword">registry</span>&gt;]
npm ping --<span class="hljs-keyword">registry</span> https://<span class="hljs-keyword">registry</span>.npmjs.org</code></pre>
<p>检查仓储是否可用</p>
<p>更多文章的目录在<a href="https://blog.sigoden.com" rel="nofollow noreferrer" target="_blank">这里</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
npm-参考手册

## 原文链接
[https://segmentfault.com/a/1190000009315989](https://segmentfault.com/a/1190000009315989)

