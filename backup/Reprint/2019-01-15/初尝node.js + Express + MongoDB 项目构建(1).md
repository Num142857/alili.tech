---
title: '初尝node.js + Express + MongoDB 项目构建(1)' 
date: 2019-01-15 2:30:12
hidden: true
slug: wv5en3f081k
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>由于最近公司需要做一个聊天监控的项目，老大让我把后台也做了，于是才真正实践深入node.js的内部。几番折腾终于把项目搭起来了。</p>
<h3 id="articleHeader1">经济基础</h3>
<ol>
<li><p>node.js (安装配置传送门：<a href="https://segmentfault.com/a/1190000005602881">windows 10 下配置安装node.js</a>)</p></li>
<li><p>express</p></li>
<li><p>mongodb</p></li>
<li><p>mongoose(非必需)</p></li>
</ol>
<h3 id="articleHeader2">express安装配置</h3>
<p>由于国内npm安装依赖速度很慢，所以请使用淘宝NPM镜像，只需执行以下命令，即可把npm -&gt; cnpm<br><code>npm install -g cnpm --registry=https://registry.npm.taobao.org</code></p>
<p>1.安装express<br>全局安装：<code>cnpm install -g express</code><br>项目范围内安装： <code>cnpm install express --save</code></p>
<p>2.安装express-generator<br>由于最新express4.0+版本中将命令工具分了出来，所以如果你在命令行输入express [命令] 会提示 'express'不是内部或外部命令，也不是可运行的程序或批处理文件。<br>解决办法就是安装express-generator。<br>命令： <code>cnpm install -g express-generator</code></p>
<h3 id="articleHeader3">mongodb安装配置</h3>
<p>1.安装mongodb<br>进入mongodb官网，下载mongodb选择你系统对应的monggodb版本，双击安装即可。安装完后的目录是这样的:</p>
<p><span class="img-wrap"><img data-src="/img/bVM2xj?w=585&amp;h=185" src="https://static.alili.tech/img/bVM2xj?w=585&amp;h=185" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ol><li><p>添加环境变量<br>把MongoDB安装文件下的bin目录路径添加到系统环境变量path下，如下图所示：</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVM4bA?w=689&amp;h=649" src="https://static.alili.tech/img/bVM4bA?w=689&amp;h=649" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>3.创建数据库目录：D:datadb （这个数据目录不会主动创建。<em>*请注意，数据目录应该放在根目录下</em>(如： C: 或者 D: 等 )。</p>
<p>4.打开控制台命令行，切换到D:MongoDBbin目录执行：<code>mongod --dbpath "D:\data\db"</code>，指定数据库存放目录。</p>
<p>5.命令执行结果到以下这一行就会卡住不动，这时重新开一个新的cmd命令行进入到D:Program FilesMongoDBbin后执行"mongodb"，就会成功启动mongodb了：</p>
<p><span class="img-wrap"><img data-src="/img/bVM2yG?w=926&amp;h=51" src="https://static.alili.tech/img/bVM2yG?w=926&amp;h=51" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>6.指定mongodb日志目录为D:Program FilesMongoDBlogs，命令：<code>mongod --logpath="D:\Program Files\MongoDB\logs\mongodb.log"</code></p>
<p>7.安装mongodb为windows服务</p>
<ul>
<li><p>通过命令启动mongo服务：<br><code>mongod --dbpath "D:\data\db" --logpath "D:\Program Files\MongoDB\logs\mongod.log"</code></p></li>
<li><p>每次都通过命令去启动mongodb太麻烦，所以我们可以把mongodb注册为系统服务(<strong>注意：必须以管理员身份运行CMD，方法：开始菜单栏搜索CMD，出现命令提示符，鼠标右键单击以管理员身份运行</strong>)，然后进入到bin目录下输入以下命令。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVM4cr?w=437&amp;h=427" src="https://static.alili.tech/img/bVM4cr?w=437&amp;h=427" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>mongod --install --dbpath "D:\data\db" --logpath "D:\Program Files\MongoDB\logs\mongodb.log"</code></p>
<ul><li><p>更多设置</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mongod --bind_ip yourIPadress --logpath D:\Program Files\MongoDB\logs\mongodb.log&quot; --logappend --dbpath &quot;D:\data\db&quot; --port yourPortNumber --serviceName &quot;YourServiceName&quot; --serviceDisplayName &quot;YourServiceName&quot; --install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">mongod </span><span class="hljs-built_in">--bind_ip</span> <span class="hljs-string">yourIPadress </span><span class="hljs-built_in">--logpath</span> D:\<span class="hljs-string">Program </span><span class="hljs-string">Files\</span><span class="hljs-string">MongoDB\</span><span class="hljs-string">logs\</span><span class="hljs-string">mongodb.</span><span class="hljs-string">log"</span> <span class="hljs-built_in">--logappend</span> <span class="hljs-built_in">--dbpath</span> <span class="hljs-string">"D:\data\db"</span> <span class="hljs-built_in">--port</span> <span class="hljs-string">yourPortNumber </span><span class="hljs-built_in">--serviceName</span> <span class="hljs-string">"YourServiceName"</span> <span class="hljs-built_in">--serviceDisplayName</span> <span class="hljs-string">"YourServiceName"</span> <span class="hljs-built_in">--install</span></code></pre>
<p>参数                      描述<br>--bind_ip                绑定服务IP，若绑定127.0.0.1，则只能本机访问，不指定默认本地所有IP<br>--logpath                指定MongoDB日志文件，注意是指定文件不是目录<br>--logappend                使用追加的方式写日志<br>--dbpath                指定数据库路径<br>--port                    指定服务端口号，默认端口27017<br>--serviceName            指定服务名称<br>--serviceDisplayName    指定服务名称，有多个mongodb服务时执行。<br>--install                指定作为一个Windows服务安装。</p>
<p>8.添加完windows服务成功后，可以直接（以管理员身份运行命令行）采用<code>net start MongoDB</code>来启动服务，停止服务：<code>net stop MongoDB</code>。</p>
<p>9.如果报错“MongoDB 服务正在启动 .MongoDB 服务无法启动。发生服务特定错误: 100.”，则前去db目录下的mongod.lock和storage.bson文件删掉，以管理员身份运行命令行然后重新启动服务即可。</p>
<p><span class="img-wrap"><img data-src="/img/bVM4dq?w=622&amp;h=180" src="https://static.alili.tech/img/bVM4dq?w=622&amp;h=180" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初尝node.js + Express + MongoDB 项目构建(1)

## 原文链接
[https://segmentfault.com/a/1190000009272078](https://segmentfault.com/a/1190000009272078)

