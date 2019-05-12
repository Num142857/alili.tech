---
title: '【全栈项目上线（vue+node+mongodb）】02.利用xshell连接Linux Ubuntu系统详细操作方式' 
date: 2018-12-27 2:30:12
hidden: true
slug: ncjrqun4b09
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">连接Linux工具</h2>
<p>putty （免费）<br>xshell（收费）（推荐）教程使用xshell 操作</p>
<h2 id="articleHeader1">安装xshell</h2>
<p><a href="http://www.netsarang.com/download/main.html" rel="nofollow noreferrer" target="_blank">下载地址</a><br>官方的如果下载慢：推荐大家去360软件管家下载 或者百度助手</p>
<h3 id="articleHeader2">下载操作</h3>
<p><span class="img-wrap"><img data-src="/img/bVXza9?w=529&amp;h=442" src="https://static.alili.tech/img/bVXza9?w=529&amp;h=442" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">安装点击下一步，下一步，结束</h3>
<h3 id="articleHeader4">使用方式</h3>
<p><span class="img-wrap"><img data-src="/img/bVXzcC?w=647&amp;h=617" src="https://static.alili.tech/img/bVXzcC?w=647&amp;h=617" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXzc0?w=575&amp;h=501" src="https://static.alili.tech/img/bVXzc0?w=575&amp;h=501" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>名称：是自己随便填写的，以便区分自己的其它主机<br>主机：是自己购买的服务器ip<br>端口号：是自己购买的服务器端口号，一般默认是ssh 22 ，如果你买的国外主机，比如搬瓦工，会像你的邮箱发送几封邮件，其中一封，会标明有主机ip端口号 ，那个端口号需要在这填写，搬瓦工的端口号，不是22(切记)</p></blockquote>
<h3 id="articleHeader5">例子：</h3>
<p><span class="img-wrap"><img data-src="/img/bVXzek?w=564&amp;h=487" src="https://static.alili.tech/img/bVXzek?w=564&amp;h=487" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">输入用户名和密码：</h3>
<p><span class="img-wrap"><img data-src="/img/bVXzeP?w=573&amp;h=485" src="https://static.alili.tech/img/bVXzeP?w=573&amp;h=485" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>如果你刚买的主机，一般管理员用root来登录<br>用户名是root <br>密码是自己设定的，如果是搬瓦工的话，邮箱会有这个信息</p>
<h3 id="articleHeader7">阿里云怎么找回或设置自己的密码</h3>
<p>如果是阿里云的话需要</p>
<p><span class="img-wrap"><img data-src="/img/bVXzf9?w=1582&amp;h=519" src="https://static.alili.tech/img/bVXzf9?w=1582&amp;h=519" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXzfI?w=447&amp;h=288" src="https://static.alili.tech/img/bVXzfI?w=447&amp;h=288" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>先停止这个服务器，然后</p>
<p><span class="img-wrap"><img data-src="/img/bVXzgn?w=219&amp;h=112" src="https://static.alili.tech/img/bVXzgn?w=219&amp;h=112" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXzhp?w=815&amp;h=288" src="https://static.alili.tech/img/bVXzhp?w=815&amp;h=288" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXzgU?w=591&amp;h=379" src="https://static.alili.tech/img/bVXzgU?w=591&amp;h=379" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>等重置完密码之后，就把自己设定的密码，在这登录</p>
<h3 id="articleHeader8">搬瓦工怎么找回自己的密码</h3>
<p><span class="img-wrap"><img data-src="/img/bVXzky?w=1041&amp;h=471" src="https://static.alili.tech/img/bVXzky?w=1041&amp;h=471" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>进入控制面板的网址：<a href="https://kiwivm.64clouds.com/main.php" rel="nofollow noreferrer" target="_blank">https://kiwivm.64clouds.com/m...</a></p>
<h3 id="articleHeader9">修改密码</h3>
<p>改名密码之前先stop<br><span class="img-wrap"><img data-src="/img/bVXzkL?w=1279&amp;h=515" src="https://static.alili.tech/img/bVXzkL?w=1279&amp;h=515" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>自定义设置密码</h4>
<p><span class="img-wrap"><img data-src="/img/bVXzkL?w=1279&amp;h=515" src="https://static.alili.tech/img/bVXzkL?w=1279&amp;h=515" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>如果这个不能用 请选择自动设置密码，下面图示</p>
<h4>自动设置密码</h4>
<p><span class="img-wrap"><img data-src="/img/bVXzli?w=970&amp;h=314" src="https://static.alili.tech/img/bVXzli?w=970&amp;h=314" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>设置了之后，会出现一个密码，需要记住，只出现一次，一定要记住</p>
<h2 id="articleHeader10">当我们把服务器账号密码都搞定，然后登录</h2>
<p><span class="img-wrap"><img data-src="/img/bVXzic?w=888&amp;h=652" src="https://static.alili.tech/img/bVXzic?w=888&amp;h=652" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">阿里云更换系统盘 或初始化磁盘</h2>
<p><span class="img-wrap"><img data-src="/img/bVXzQR?w=555&amp;h=550" src="https://static.alili.tech/img/bVXzQR?w=555&amp;h=550" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>先停止然后在点击更换系统盘</p>
<h3 id="articleHeader12">初始化磁盘，并且设置密码</h3>
<p><span class="img-wrap"><img data-src="/img/bVXzRQ?w=849&amp;h=521" src="https://static.alili.tech/img/bVXzRQ?w=849&amp;h=521" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>png](/img/bVXzRQ)</p>
<h2 id="articleHeader13">连接成功</h2>
<p><span class="img-wrap"><img data-src="/img/bVXzTc?w=1071&amp;h=630" src="https://static.alili.tech/img/bVXzTc?w=1071&amp;h=630" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>出现以下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root@iZ238uepsriZ ~]# " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">[root<span class="hljs-symbol">@iZ238uepsriZ</span> ~]<span class="hljs-meta"># </span></code></pre>
<p>root 是用户名<br>iZ238uepsriZ  这个是主机名字<br>~  是路径，波浪线代表家目录 家目录就是用户所在的目录<br>‘#’ 代码管理员权限操作</p>
<p>执行一些常用的shell</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pwd ：当前所在的路径
cd  :切换路径
ls ：查看当前文件下面都有神马
ll ：是ls -l 的别名
cp :复制
mv :重命名，剪切
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">pwd</span> ：当前所在的路径
<span class="hljs-keyword">cd</span>  :切换路径
<span class="hljs-keyword">ls</span> ：查看当前文件下面都有神马
<span class="hljs-keyword">ll</span> ：是<span class="hljs-keyword">ls</span> -<span class="hljs-keyword">l</span> 的别名
<span class="hljs-keyword">cp</span> :复制
mv :重命名，剪切
</code></pre>
<h2 id="articleHeader14">接下来安装Nginx web环境</h2>
<p>会安装以下环境：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Nginx 
php
mysql
mongodb
node
pm2
git
docker" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>Nginx 
php
mysql
mongodb
<span class="hljs-keyword">node</span>
<span class="hljs-title">pm2</span>
git
docker</code></pre>
<h2 id="articleHeader15">敬请期待后面文章</h2>
<h2 id="articleHeader16">（如需视频）欢迎加入前端持续学习</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈项目上线（vue+node+mongodb）】02.利用xshell连接Linux Ubuntu系统详细操作方式

## 原文链接
[https://segmentfault.com/a/1190000011775015](https://segmentfault.com/a/1190000011775015)

