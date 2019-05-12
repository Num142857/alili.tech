---
title: '拿Nginx 部署你的静态网页' 
date: 2019-01-05 2:30:11
hidden: true
slug: 5n5qx7ka1fy
categories: [reprint]
---

{{< raw >}}

                    
<p>emmmm，作为一个前端开发时刻想着，怎么把自己写的东西，丢到自己的服务器上面，然后展示给别人看。下面我就简单直白的写下，如何用 Nginx 部署你的静态网站。</p>
<h4>事前准备</h4>
<ol>
<li><p>云服务器，（我的是<a href="https://promotion.aliyun.com/ntms/act/qwbk.html?spm=5176.8112568.420890.1.SYNVHQ" rel="nofollow noreferrer" target="_blank">阿里云</a>）</p></li>
<li><p>码云或者 gihub （用来存放你的代码）</p></li>
</ol>
<h4>事前配置</h4>
<p>既然你有了云服务器(我就当是你ubuntu 系统哦)，然后并且通过了备案，还有一个自己域名。那么很好，该有的东西你已经是有了，下面就一起体验配置的乐趣吧。</p>
<p>第一步：mac 电脑直接通过下面的命令行连接到你的服务器。连接时候会叫你输入密码，输入就是咯</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ssh root@127.22.20.121 //你的服务器公有 ip" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">ssh</span> <span class="hljs-selector-tag">root</span>@<span class="hljs-keyword">127</span>.<span class="hljs-keyword">22</span>.<span class="hljs-keyword">20</span>.<span class="hljs-keyword">121</span> //你的服务器公有 ip</code></pre>
<p>连接成之后会有下面的一个界面，<br><span class="img-wrap"><img data-src="/img/bVR9QU?w=1000&amp;h=519" src="https://static.alili.tech/img/bVR9QU?w=1000&amp;h=519" alt="nginx01.png" title="nginx01.png" style="cursor: pointer; display: inline;"></span></p>
<p>这就可以成功的登录到你的服务器啦！</p>
<p>第二步：服务器上安装 git和 Nginx</p>
<ol>
<li><p>安装 <code>git</code>很简单，在命令行模式下输入<code>sudo apt-get install git</code>命令进行安装。安装完毕之后输入<code>git --version</code>就可以看到 git 的版本了；</p></li>
<li><p>安装Nginx 我们可以很容易地安装Nginx<code>sudo apt-get install nginx</code>，Ubuntu 14.04默认情况下，Nginx安装完成后会自动启动。你可以访问默认的Nginx登陆页面，来确认软件通过访问你的服务器域名或浏览器公共IP正在正常运行。比如说你直接在浏览器输入127.22.20.121,就会看到以下哪个画面。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVR9Wu?w=566&amp;h=207" src="https://static.alili.tech/img/bVR9Wu?w=566&amp;h=207" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>正式部署</h4>
<p>刀已经磨好了，下面我们就霍霍向猪羊啦，首先本地建一个文件夹<code>static-web-server</code>然后在这个文件夹下面建立一个 <code>index.html</code>，这个 html我们随便写点什么的东西就好了。毕竟重心在部署。</p>
<p>下面是index.html代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no&quot;/>
    <title>nginx 静态网站部署</title> 
    <style>
        html,body{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background: #333;
            display: flex;
            justify-content: center;
            align-items: center
        }
        h1, a{
            color: #fafafa;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>nginx静态网站部署实例<br/><a href=&quot;http://blog.naice.me/&quot;>naice blog</a></h1>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>nginx 静态网站部署<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#333</span>;
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">justify-content</span>: center;
            <span class="hljs-attribute">align-items</span>: center
        }
        <span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">a</span>{
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#fafafa</span>;
            <span class="hljs-attribute">text-align</span>: center;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>nginx静态网站部署实例<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://blog.naice.me/"</span>&gt;</span>naice blog<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>本地也东西也弄好，下面到来到码云上面建立一个新的仓库，我的就叫<a href="http://git.oschina.net/naihe138/static-web" rel="nofollow noreferrer" target="_blank">static-web</a>，然后把本地<code>static-web-server</code>的文件夹关联到我们<code>码云static-web的仓库</code>，并且提交到仓库上面，下面几条命令就可以了。</p>
<blockquote><p>tips：提交代码需要你的本地公钥复制到码云的仓库的设置上面哦，大家这个部分自行百度解决嘛。</p></blockquote>
<ol>
<li><p><code>git remote add origin git@git.oschina.net:naihe138/static-web.git</code>（关联本地文件夹和远程仓库，注意地址是你的地址哦）</p></li>
<li><p><code>git add .</code></p></li>
<li><p><code>git commit -m 'first'</code></p></li>
<li><p><code>git push -u origin master</code></p></li>
</ol>
<p>上面的后面三点就是，添加到码云仓库，相信大家都知道。<br>这会本地和仓库都已经准备好了。下面来到服务器设置，连接到你的服务器</p>
<p>首先通过命令行新建一个 www文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo mkdir /www" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">sudo <span class="hljs-built_in">mkdir</span> /www</code></pre>
<p>然后进入 www文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /www" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> /www</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVSaaq?w=1000&amp;h=174" src="https://static.alili.tech/img/bVSaaq?w=1000&amp;h=174" alt="Nginx04.png" title="Nginx04.png" style="cursor: pointer;"></span></p>
<p>然后再新建一个文件夹叫<code>static-web</code>,并且进入这个文件夹里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo mkdir static-web
cd static-web" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>sudo <span class="hljs-built_in">mkdir</span> <span class="hljs-keyword">static</span>-web
cd <span class="hljs-keyword">static</span>-web</code></pre>
<p>路径是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pwd
/www/static-web" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>pwd
<span class="hljs-regexp">/www/</span><span class="hljs-keyword">static</span>-web</code></pre>
<p>然后在<code>static-web</code>文件夹里面，下载我们刚才上传到码云的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@git.oschina.net:naihe138/static-web.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">git <span class="hljs-keyword">clone</span> <span class="hljs-title">git</span>@git.oschina.net:naihe138/static-web.git</code></pre>
<blockquote><p>tips: 这里不能克隆到的，需要把服务器本机的公钥添加到码云上面。这个有很多教程我就不细说了。</p></blockquote>
<p>代码都克隆到我们的服务器了之后，下面我们稍微配置一下 nginx 配置很简单，跟着我就可以了。进入到 nginx 配置目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /etc/nginx/conf.d/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">cd <span class="hljs-regexp">/etc/</span>nginx<span class="hljs-regexp">/conf.d/</span></code></pre>
<p>通过 <code>ls</code>查看配置文件，（你之前没有配置过，下面就是空的了），然后通过 vi 命令新建一个配置文件，例如：<br><code>sudo vi static-naice-me.conf</code> （我的顶级域名是naice.me通过解析子域名 static.naice.me，所以就起了这个static-naice-me.conf 名字的文件），然后你就进入了一个 vi 编辑的环境，按下 键盘的<code>i</code> 键，就可以写入内容，写入以下内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
  server_name static.naice.me; // 你的域名或者 ip
  root /www/static-web/static-web; // 你的克隆到的项目路径
  index index.html; // 显示首页
  location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt){
    root /www/static-web/static-web;
  } // 静态文件访问
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-keyword">server</span> {
  server_name <span class="hljs-keyword">static</span>.naice.me; <span class="hljs-comment">// 你的域名或者 ip</span>
  root /www/<span class="hljs-keyword">static</span>-web/<span class="hljs-keyword">static</span>-web; <span class="hljs-comment">// 你的克隆到的项目路径</span>
  <span class="hljs-keyword">index</span> <span class="hljs-keyword">index</span>.html; <span class="hljs-comment">// 显示首页</span>
  location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt){
    root /www/<span class="hljs-keyword">static</span>-web/<span class="hljs-keyword">static</span>-web;
  } <span class="hljs-comment">// 静态文件访问</span>
}</code></pre>
<p>写入内容之后，按下<code>esc</code>然后输入<code>:wq！</code>来保存你编辑的内容。</p>
<p>退出之后我们需要通过命令行重启 nginx服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo nginx -s reload" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">sudo nginx <span class="hljs-_">-s</span> reload</code></pre>
<h4>域名解析</h4>
<p>域名解析是把域名指向网站空间IP，让人们通过注册的域名可以方便地访问到网站的一种服务，<br>下面简单说说一下域名解析的操作，你拥有了一个域名然后，进入 <a href="https://www.dnspod.cn/" rel="nofollow noreferrer" target="_blank">dnspod</a>,没有的话账号的话， 直接注册登录，然后进到控制台</p>
<ol>
<li><p>添加域名</p></li>
<li><p>添加 a记录</p></li>
</ol>
<p>如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVSagJ?w=826&amp;h=682" src="https://static.alili.tech/img/bVSagJ?w=826&amp;h=682" alt="Nginx04%20%281%29.png" title="Nginx04%20%281%29.png" style="cursor: pointer; display: inline;"></span></p>
<p>好了，我们刚好刚刚把解析好的域名写进去我们的 nginx 的配置里面，也重启了 nginx 服务，下面就直接输入<a href="http://static.naice.me/" rel="nofollow noreferrer" target="_blank"></a><a href="http://static.naice.me/" rel="nofollow noreferrer" target="_blank">http://static.naice.me/</a>，就可以访问到我们刚才写的静态网页，是不是有点小激动？？</p>
<h4>还有一种方式</h4>
<p>就是可以借用 Nodejs 来输出页面，然后在构建这个 Nodejs 项目的是，需要能渲染这些 html 文件，这个比较利于后期扩展，借助 pm2 自动部署，比如增加数据库，可以用 koa express 来搭建一个网站，不同的路由，访问你不同的后台 html 文件，模板引擎可以使用 ejs，这样可以兼容你的 html，不需要修改为其他的模板格式。后面可以详细说说。</p>
<p>最后安利一下个人博客： <a href="http://blog.naice.me/" rel="nofollow noreferrer" target="_blank"></a><a href="http://blog.naice.me/" rel="nofollow noreferrer" target="_blank">http://blog.naice.me/</a></p>
<p>done</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
拿Nginx 部署你的静态网页

## 原文链接
[https://segmentfault.com/a/1190000010487262](https://segmentfault.com/a/1190000010487262)

