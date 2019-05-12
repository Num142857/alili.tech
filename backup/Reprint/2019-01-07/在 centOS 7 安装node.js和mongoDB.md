---
title: '在 centOS 7 安装node.js和mongoDB' 
date: 2019-01-07 2:30:10
hidden: true
slug: 0y0yt16ur19b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>阿里云最近有个专供学生的云翼计划，入门级的云服务器原价1400多，学生认证后只要118一年，非常划算，找了一位学弟帮我学生认证之后，果断买了一年。</p>
<p>这个计划没有太多的服务器配置可以选择，入门级，centOS或者windows server，为了体验和学习linux系统，我选择了centOS。</p>
<p>很多东西都能在网上找到教程，我也是一步步跟随教程而来，但单一的教程难免有其片面性，所以我参考了多个，在我的服务器上装好了node.js和 mongoDB，给我后续的node.js服务器开发学习打下基础，在这里总结一下我的操作过程和一些收获，提供给读者参考。</p>
<h2 id="articleHeader1">1.登录并连接服务器的管理终端</h2>
<p>登录阿里云的管理控制台，进入云服务器的实例列表中，进入你购买的云服务器，然后远程连接，进入管理终端。</p>
<p>第一次进入管理终端时，服务器会提示你保存一个6位的登录密码，每次连接管理终端都需要输入这个密码，请妥善保存！</p>
<p>进入管理终端后，就会有login输入，使用root管理员登录的话就填root，然后输入你的password，没有设置过密码的可以到实例设置里重置密码。</p>
<p>一般在新服务器创建后，先升级一下centOS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum -y update


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">yum -y update</span>


</code></pre>
<h2 id="articleHeader2">2.安装gcc g++编译器</h2>
<p>安装node.js需要通过g++进行编译，我参考的教程都没有提示先安装gcc g++，所以直接报错找不到g++命令。</p>
<p>其实在centOS中安装 gcc g++比较简单，直接运行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install gcc-c++
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">yum</span> <span class="hljs-comment">install</span> <span class="hljs-comment">gcc</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">+</span><span class="hljs-literal">+</span>
</code></pre>
<p>很快就装好了。</p>
<h2 id="articleHeader3">3.安装node</h2>
<p>跳转到目录：<code>/usr/local/src</code>，这个文件夹通常用来存放软件源代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /usr/local/src


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> /usr/<span class="hljs-built_in">local</span>/src


</code></pre>
<p>下载nodejs源码，也可以使用scp命令直接上传，因为下载实在太慢了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wget http://nodejs.org/dist/v6.11.0/node-v6.11.0.tar.gz


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>wget http://nodejs.org/dist/v6.<span class="hljs-number">11.0</span>/<span class="hljs-keyword">node</span><span class="hljs-title">-v6</span>.<span class="hljs-number">11.0</span>.tar.gz


</code></pre>
<p>下载完成后解压：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tar -xzvf node-v6.11.0.tar.gz


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>tar -xzvf <span class="hljs-keyword">node</span><span class="hljs-title">-v6</span>.<span class="hljs-number">11.0</span>.tar.gz


</code></pre>
<p>进入解压后的文件夹：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd node-v6.11.0


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>cd <span class="hljs-keyword">node</span><span class="hljs-title">-v6</span>.<span class="hljs-number">11.0</span>


</code></pre>
<p>执行配置脚本来进行预编译处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./configure


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>./configure


</code></pre>
<p>编译源代码，这个步骤花的时间会很长：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="make


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">make</span>


</code></pre>
<p>编译完成后，执行安装命令，使之在系统范围内可用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="make install


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>make <span class="hljs-keyword">install</span>


</code></pre>
<p>安装 express 和 forever ，这两个模块都推荐 global 安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm -g install express forever


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm -g <span class="hljs-keyword">install</span> express forever


</code></pre>
<p>到这里，node.js 就基本上完成了安装过程，可以通过指令查看node及npm版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node -v

npm -v


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>

npm -v


</code></pre>
<h2 id="articleHeader4">4.安装mongoDB</h2>
<p>直接通过官网的亚马逊镜像下载mongoDB源码非常的缓慢，几乎是没有速度的，所以通过阿里云镜像下载。</p>
<p>在<code>/etc/yum.repos.d</code> 创建一个mongodb-org.repo文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch /etc/yum.repos.d/mongodb-org.repo


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>touch /etc/yum<span class="hljs-selector-class">.repos</span><span class="hljs-selector-class">.d</span>/mongodb-org<span class="hljs-selector-class">.repo</span>


</code></pre>
<p>编辑mongodb-org.repo文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vi /etc/yum.repos.d/mongodb-org.repo


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vi /etc/yum<span class="hljs-selector-class">.repos</span><span class="hljs-selector-class">.d</span>/mongodb-org<span class="hljs-selector-class">.repo</span>


</code></pre>
<p>输入以下内容后，保存并退出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[mogodb-org]

name=MongoDB Repository

baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/3.4/x86_64/

gpgcheck=0

enabled=1


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-section">[mogodb-org]</span>

<span class="hljs-attr">name</span>=MongoDB Repository

<span class="hljs-attr">baseurl</span>=http://mirrors.aliyun.com/mongodb/yum/redhat/<span class="hljs-number">7</span>Server/mongodb-org/<span class="hljs-number">3.4</span>/x<span class="hljs-number">86_64</span>/

<span class="hljs-attr">gpgcheck</span>=<span class="hljs-number">0</span>

<span class="hljs-attr">enabled</span>=<span class="hljs-number">1</span>


</code></pre>
<p>安装MongoDB：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install -y mongodb-org


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>yum <span class="hljs-keyword">install </span>-y mongodb-<span class="hljs-keyword">org
</span>

</code></pre>
<p>启动MongoDB（这里从这里开始是mongod而不是mongodb，少了个b）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="service mongod start


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>service mongod <span class="hljs-literal">start</span>


</code></pre>
<p>设置开机启动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chkconfig mongod on


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>chkconfig mongod <span class="hljs-keyword">on</span>


</code></pre>
<p>打开MongoDB：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/bin/mongo


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>/<span class="hljs-keyword">bin/mongo
</span>

</code></pre>
<p>重启：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="service mongod restart


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">service mongod restart</span>


</code></pre>
<p>至此，node.js和mongoDB的安装过程就结束了，还有一些关于linux和vim的学习内容，在此不便赘述，有时间再发单独的文章。下面附上我的操作结果图：<br><span class="img-wrap"><img data-src="/img/bVRDPF?w=1047&amp;h=452" src="https://static.alili.tech/img/bVRDPF?w=1047&amp;h=452" alt="结果" title="结果" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">主要参考目录：</h2>
<p><a href="http://www.jianshu.com/p/0496ef49b2a5" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/0496...</a></p>
<p><a href="https://yq.aliyun.com/articles/41508" rel="nofollow noreferrer" target="_blank">https://yq.aliyun.com/article...</a></p>
<p><a href="http://www.cnblogs.com/crazylqy/p/5649860.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/crazyl...</a></p>
<p><a href="http://blog.sina.com.cn/s/blog_5e357d2d0100zmth.html" rel="nofollow noreferrer" target="_blank">http://blog.sina.com.cn/s/blo...</a></p>
<p><a href="http://www.jb51.net/article/97907.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/9...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 centOS 7 安装node.js和mongoDB

## 原文链接
[https://segmentfault.com/a/1190000010362190](https://segmentfault.com/a/1190000010362190)

