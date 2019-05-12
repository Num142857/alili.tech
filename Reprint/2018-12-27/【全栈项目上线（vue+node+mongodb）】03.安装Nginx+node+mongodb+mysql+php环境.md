---
title: '【全栈项目上线（vue+node+mongodb）】03.安装Nginx+node+mongodb+mysql+php环境' 
date: 2018-12-27 2:30:12
hidden: true
slug: v50744et2ur
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">配置常用环境</h2>
<h2 id="articleHeader1">安装zshell</h2>
<h2 id="articleHeader2">请先检查自己的系统</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cat /etc/issue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">cat <span class="hljs-regexp">/etc/i</span>ssue</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXzX1?w=440&amp;h=65" src="https://static.alili.tech/img/bVXzX1?w=440&amp;h=65" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果是centos</p>
<p><span class="img-wrap"><img data-src="/img/bVXzYe?w=225&amp;h=41" src="https://static.alili.tech/img/bVXzYe?w=225&amp;h=41" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">下面是以Ubuntu环境安装</h3>
<h3 id="articleHeader4">先更新源码包的仓库</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apt-get update -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span> -y</code></pre>
<h3 id="articleHeader5">在安装之前我们先安装几个工具</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apt-get install zsh git curl -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">apt-<span class="hljs-keyword">get</span> install zsh git curl -y</code></pre>
<h3 id="articleHeader6">两种安装方式</h3>
<h3 id="articleHeader7">第一种：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sh -c &quot;$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">sh -c <span class="hljs-string">"<span class="hljs-variable">$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)</span>"</span></code></pre>
<h3 id="articleHeader8">第二种：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" sh -c &quot;$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"> sh -c <span class="hljs-string">"<span class="hljs-variable">$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)</span>"</span></code></pre>
<h3 id="articleHeader9">zshell 安</h3>
<p><span class="img-wrap"><img data-src="/img/bVXz1g?w=1148&amp;h=563" src="https://static.alili.tech/img/bVXz1g?w=1148&amp;h=563" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>..]</p>
<h2 id="articleHeader10">使用lnmp一键安装包，安装lnmp环境</h2>
<p>网址：<a href="https://lnmp.org/install.html" rel="nofollow noreferrer" target="_blank">https://lnmp.org/install.html</a><br>lnmp：Linux Nginx mysql php</p>
<h2 id="articleHeader11">安装方式</h2>
<h3 id="articleHeader12">第一步：执行以下命令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wget -c http://soft.vpser.net/lnmp/lnmp1.4.tar.gz &amp;&amp; tar zxf lnmp1.4.tar.gz &amp;&amp; cd lnmp1.4 &amp;&amp; ./install.sh lnmp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code style="word-break: break-word; white-space: initial;">wget -c http://soft.vpser.net/lnmp/lnmp1.4.tar.gz &amp;&amp; tar zxf lnmp1.4.tar.gz &amp;&amp; cd lnmp1.4 &amp;&amp; ./install.sh lnmp</code></pre>
<h3 id="articleHeader13">然后出现以下图片</h3>
<h3 id="articleHeader14">第二步：选择mysql版本</h3>
<p><span class="img-wrap"><img data-src="/img/bVXz1N?w=1093&amp;h=528" src="https://static.alili.tech/img/bVXz1N?w=1093&amp;h=528" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>直接敲回车选择 第二项就是 选择5.5.56版本</h4>
<p>然后出现以下截图</p>
<p><span class="img-wrap"><img data-src="/img/bVXz2f?w=1114&amp;h=628" src="https://static.alili.tech/img/bVXz2f?w=1114&amp;h=628" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>输入mysql密码 输入自己的mysql密码，比较重要，一定要输入一个相对复杂的密码</h4>
<blockquote>如果在这里面输入错误，请按 Ctrl + backspace 键 删除<br>输入完成之后，敲回车</blockquote>
<h3 id="articleHeader15">第三步选择mysql数据库的引擎</h3>
<p><span class="img-wrap"><img data-src="/img/bVXz3A?w=947&amp;h=561" src="https://static.alili.tech/img/bVXz3A?w=947&amp;h=561" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>此时输入y 或者敲回车就可以，默认选择 innoDB引擎</p>
<h3 id="articleHeader16">第四步 选择php版本</h3>
<p><span class="img-wrap"><img data-src="/img/bVXz5d?w=976&amp;h=545" src="https://static.alili.tech/img/bVXz5d?w=976&amp;h=545" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>直接敲回车选择默认的php版本 5.5.38</h4>
<h3 id="articleHeader17">第五步： You have 3 options for your Memory Allocator install.</h3>
<p><span class="img-wrap"><img data-src="/img/bVXz5G?w=758&amp;h=191" src="https://static.alili.tech/img/bVXz5G?w=758&amp;h=191" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>直接敲回车，不安装</h4>
<h3 id="articleHeader18">然后出现</h3>
<p><span class="img-wrap"><img data-src="/img/bVXz5U?w=872&amp;h=604" src="https://static.alili.tech/img/bVXz5U?w=872&amp;h=604" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>请你按任何键来安装刚才选择的这么多软件环境<br>此时正在安装所有软件，大概需要27分钟左右</blockquote>
<h2 id="articleHeader19">总结</h2>
<blockquote>注意点：<br>   选择mysql后，需要自己输入密码<br>   其他的一路回车<br>如果全部回车后，mysql密码是root 账号也是root</blockquote>
<h2 id="articleHeader20">最终安装的所有信息</h2>
<p><span class="img-wrap"><img data-src="/img/bVXz7p?w=1578&amp;h=2786" src="https://static.alili.tech/img/bVXz7p?w=1578&amp;h=2786" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader21">安装完成lnmp环境</h3>
<p><span class="img-wrap"><img data-src="/img/bVXAiS?w=1099&amp;h=308" src="https://static.alili.tech/img/bVXAiS?w=1099&amp;h=308" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote>此时就可以使用了</blockquote>
<h3 id="articleHeader22">使用方式</h3>
<blockquote>在浏览器里面输入 ip 出现页面证明安装完成<br>如果是阿里云的服务器需要配置以下规则</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXAju?w=601&amp;h=669" src="https://static.alili.tech/img/bVXAju?w=601&amp;h=669" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader23">持续更新中...</h2>
<h2 id="articleHeader24">安装node环境</h2>
<h3 id="articleHeader25">安装方式</h3>
<h3 id="articleHeader26">采用nvm方式安装管理node版本</h3>
<p>参考：<a href="https://github.com/creationix/nvm" rel="nofollow noreferrer" target="_blank">https://github.com/creationix...</a></p>
<h3 id="articleHeader27">安装脚本</h3>
<h3 id="articleHeader28">安装或更新nvm，可以使用以下两种方式</h3>
<h3 id="articleHeader29">第一步安装 nvm</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="sh" style="word-break: break-word; white-space: initial;">curl -o- https:<span class="hljs-regexp">//</span>raw.githubusercontent.com<span class="hljs-regexp">/creationix/</span>nvm<span class="hljs-regexp">/v0.33.6/i</span>nstall.sh | bash</code></pre>
<p>or Wget:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="sh" style="word-break: break-word; white-space: initial;">wget -qO- https:<span class="hljs-regexp">//</span>raw.githubusercontent.com<span class="hljs-regexp">/creationix/</span>nvm<span class="hljs-regexp">/v0.33.6/i</span>nstall.sh | bash</code></pre>
<h3 id="articleHeader30">第二步 配置nvm环境变量</h3>
<p><sub>The script clones the nvm repository to <code>~/.nvm</code> and adds the source line to your profile (<code>~/.bash_profile</code>, <code>~/.zshrc</code>, <code>~/.profile</code>, or <code>~/.bashrc</code>).</sub></p>
<h4>执行以下命令</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export NVM_DIR=&quot;$HOME/.nvm&quot;
[ -s &quot;$NVM_DIR/nvm.sh&quot; ] &amp;&amp; . &quot;$NVM_DIR/nvm.sh&quot; # This loads nvm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="sh"><span class="hljs-built_in">export</span> NVM_DIR=<span class="hljs-string">"<span class="hljs-variable">$HOME</span>/.nvm"</span>
[ <span class="hljs-_">-s</span> <span class="hljs-string">"<span class="hljs-variable">$NVM_DIR</span>/nvm.sh"</span> ] &amp;&amp; . <span class="hljs-string">"<span class="hljs-variable">$NVM_DIR</span>/nvm.sh"</span> <span class="hljs-comment"># This loads nvm</span></code></pre>
<h2 id="articleHeader31">安装nodejs环境</h2>
<p>要下载、编译和安装最新版本的节点，请执行以下操作:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nvm install node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="sh" style="word-break: break-word; white-space: initial;">nvm install <span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<h3 id="articleHeader32">　等待安装完成之后</h3>
<p><span class="img-wrap"><img data-src="/img/bVXApg?w=1152&amp;h=255" src="https://static.alili.tech/img/bVXApg?w=1152&amp;h=255" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node -v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">-v</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXApo?w=199&amp;h=59" src="https://static.alili.tech/img/bVXApo?w=199&amp;h=59" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXAqp?w=206&amp;h=110" src="https://static.alili.tech/img/bVXAqp?w=206&amp;h=110" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader33">出现上面的版本号，说明node安装成功</h3>
<h3 id="articleHeader34">下面这些事nvm的一些其他操作，管理node 版本切换版本（了解一下）</h3>
<p>或者，您可以在shell中运行任意命令，并使用所需的节点版本:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nvm exec 4.2 node --version" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="sh" style="word-break: break-word; white-space: initial;">nvm exec <span class="hljs-number">4.2</span> <span class="hljs-keyword">node</span> <span class="hljs-title">--version</span></code></pre>
<p>您还可以找到可执行文件所在位置的路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nvm which 5.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="sh" style="word-break: break-word; white-space: initial;">nvm <span class="hljs-built_in">which</span> 5.0</code></pre>
<h2 id="articleHeader35">安装mongodb环境</h2>
<p><a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/" rel="nofollow noreferrer" target="_blank">https://docs.mongodb.com/manu...</a></p>
<h3 id="articleHeader36">第一步：导入公钥</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">sudo</span> <span class="hljs-comment">apt</span><span class="hljs-literal">-</span><span class="hljs-comment">key</span> <span class="hljs-comment">adv</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">keyserver</span> <span class="hljs-comment">hkp://keyserver</span><span class="hljs-string">.</span><span class="hljs-comment">ubuntu</span><span class="hljs-string">.</span><span class="hljs-comment">com:80</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">recv</span> <span class="hljs-comment">0C49F3730359A14518585931BC711F9BA15703C6</span></code></pre>
<h3 id="articleHeader37">第二步：为mongodb创建一些列表文件</h3>
<h3 id="articleHeader38">根据自己的操作系统执行系统</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="查看自己的操作系统
cat /etc/issue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>查看自己的操作系统
cat <span class="hljs-regexp">/etc/i</span>ssue</code></pre>
<h4>Ubuntu 12.04</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="echo &quot;deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.4 multiverse&quot; | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">echo <span class="hljs-string">"deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.4 multiverse"</span> | sudo tee /etc/apt/sources.<span class="hljs-type">list</span>.d/mongodb-org<span class="hljs-number">-3.4</span>.<span class="hljs-type">list</span></code></pre>
<h4>Ubuntu 14.04</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="echo &quot;deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse&quot; | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">echo <span class="hljs-string">"deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse"</span> | sudo tee /etc/apt/sources.<span class="hljs-type">list</span>.d/mongodb-org<span class="hljs-number">-3.4</span>.<span class="hljs-type">list</span></code></pre>
<h4>Ubuntu 16.04</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="echo &quot;deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse&quot; | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">echo <span class="hljs-string">"deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse"</span> | sudo tee /etc/apt/sources.<span class="hljs-type">list</span>.d/mongodb-org<span class="hljs-number">-3.4</span>.<span class="hljs-type">list</span></code></pre>
<blockquote>如果是阿里云的系统 请更换阿里云的镜像源</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim /etc/apt/sources.list.d/mongodb-org-3.4.list

仔细看一下，把 repo.mongodb.org 改成 mirrors.aliyun.com/mongodb

deb [ arch=amd64,arm64 ] http://mirrors.aliyun.com/mongodb/apt/ubuntu xenial/mongodb-org/3.4 multiverse

然后  sudo apt-get update" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vim /etc/apt/sources<span class="hljs-selector-class">.list</span><span class="hljs-selector-class">.d</span>/mongodb-org-<span class="hljs-number">3.4</span><span class="hljs-selector-class">.list</span>

仔细看一下，把 repo<span class="hljs-selector-class">.mongodb</span><span class="hljs-selector-class">.org</span> 改成 mirrors<span class="hljs-selector-class">.aliyun</span><span class="hljs-selector-class">.com</span>/mongodb

deb [ arch=amd64,arm64 ] http:<span class="hljs-comment">//mirrors.aliyun.com/mongodb/apt/ubuntu xenial/mongodb-org/3.4 multiverse</span>

然后  sudo apt-get update</code></pre>
<h3 id="articleHeader39">第三步 更新第二步设置的包</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo apt-get update" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">sudo apt-<span class="hljs-built_in">get</span> <span class="hljs-keyword">update</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXAxX?w=1434&amp;h=352" src="https://static.alili.tech/img/bVXAxX?w=1434&amp;h=352" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader40">第四步 安装mongodb-org</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo apt-get install -y mongodb-org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">sudo apt-<span class="hljs-keyword">get</span> install -y mongodb-org</code></pre>
<h3 id="articleHeader41">安装完成之后</h3>
<blockquote>安装成功出现以下图示</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXAyD?w=867&amp;h=353" src="https://static.alili.tech/img/bVXAyD?w=867&amp;h=353" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader42">查看mongodb版本</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mongod --version

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>mongod <span class="hljs-comment">--version</span>

</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXAzU?w=807&amp;h=294" src="https://static.alili.tech/img/bVXAzU?w=807&amp;h=294" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader43">执行 mongo</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use shudong
db.stark.insert({'name':'stark','age':18})
db.stark.find({})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>use shudong
db<span class="hljs-selector-class">.stark</span><span class="hljs-selector-class">.insert</span>({<span class="hljs-string">'name'</span>:<span class="hljs-string">'stark'</span>,<span class="hljs-string">'age'</span>:<span class="hljs-number">18</span>})
db<span class="hljs-selector-class">.stark</span><span class="hljs-selector-class">.find</span>({})</code></pre>
<h3 id="articleHeader44">配置mongodb远程连接</h3>
<h4>第一步：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim /etc/mongod.conf
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vim /etc/mongod<span class="hljs-selector-class">.conf</span>
</code></pre>
<h4>vim 操作命令</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim 后面跟文件打开一个文件
i  插入
o 从这一行往下插入
a 从光标处往后面追加

上下移动 切换到 esc 模式  按 方向键

都是在esc 模式下操作
撤销：   u
删除：   行数 dd 单个dd删除一行   10dd 删除10行

粘贴: yy 
复制 p


保存：
按下 esc 键之后 输入 :wq 
如果有问题，可以强制保存退出 :wq!

另一种方式   ZZ
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vim 后面跟文件打开一个文件
<span class="hljs-selector-tag">i</span>  插入
o 从这一行往下插入
<span class="hljs-selector-tag">a</span> 从光标处往后面追加

上下移动 切换到 esc 模式  按 方向键

都是在esc 模式下操作
撤销：   u
删除：   行数 <span class="hljs-selector-tag">dd</span> 单个dd删除一行   <span class="hljs-number">10</span>dd 删除<span class="hljs-number">10</span>行

粘贴: yy 
复制 <span class="hljs-selector-tag">p</span>


保存：
按下 esc 键之后 输入 :wq 
如果有问题，可以强制保存退出 :wq!

另一种方式   ZZ
</code></pre>
<h4>修改 bandIp 添加你的外网ip</h4>
<p><span class="img-wrap"><img data-src="/img/bVXBeQ?w=313&amp;h=150" src="https://static.alili.tech/img/bVXBeQ?w=313&amp;h=150" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>改成</p>
<p><span class="img-wrap"><img data-src="/img/bVXBe7?w=297&amp;h=145" src="https://static.alili.tech/img/bVXBe7?w=297&amp;h=145" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>把 ip参数删掉 可以远程访问</p>
<h4>然后重启服务：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="service mongod restart" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">service mongod restart</span></code></pre>
<p>然后用远程工具 mongodbbooster测试</p>
<h3 id="articleHeader45">开启mongodb</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo service mongod start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">sudo service mongod <span class="hljs-literal">start</span></code></pre>
<h1 id="articleHeader46">附录：</h1>
<h2 id="articleHeader47">相关问题</h2>
<h2 id="articleHeader48">Failed to start mongod.service: Unit mongod.service not found.</h2>
<blockquote>需要手动新建/lib/systemd/system/mongod.service文件，并写入下面内容：</blockquote>
<h4>编辑文件 /lib/systemd/system/mongod.service</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim /lib/systemd/system/mongod.service" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;">vim /<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">systemd</span>/<span class="hljs-title">system</span>/<span class="hljs-title">mongod</span>.<span class="hljs-title">service</span></span></code></pre>
<h4>把下面文件写入里面</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target
Documentation=https://docs.mongodb.org/manual

[Service]
User=mongodb
Group=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-section">[Unit]</span>
<span class="hljs-attr">Description</span>=High-performance, schema-free document-oriented database
<span class="hljs-attr">After</span>=network.target
<span class="hljs-attr">Documentation</span>=https://docs.mongodb.org/manual
<span class="hljs-section">
[Service]</span>
<span class="hljs-attr">User</span>=mongodb
<span class="hljs-attr">Group</span>=mongodb
<span class="hljs-attr">ExecStart</span>=/usr/bin/mongod --quiet --config /etc/mongod.conf
<span class="hljs-section">
[Install]</span>
<span class="hljs-attr">WantedBy</span>=multi-user.target</code></pre>
<h4>然后执行 （激活mongod service）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo systemctl enable mongod" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">sudo systemctl <span class="hljs-built_in">enable</span> mongod</code></pre>
<h4>启动、重启和关闭命令</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo service mongod start
sudo service mongod restart
sudo service mongod stop
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>sudo service mongod <span class="hljs-literal">start</span>
sudo service mongod restart
sudo service mongod <span class="hljs-literal">stop</span>
</code></pre>
<h2 id="articleHeader49">如果上面没有设置mysql密码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reset_mysql_root_password.sh" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">reset_mysql_root_password</span><span class="hljs-selector-class">.sh</span></code></pre>
<h2 id="articleHeader50">如果以学生的身份买的阿里云主机，或者其他身份，以ssh方式连接不上 阿里云主机</h2>
<h3 id="articleHeader51">解决方案：</h3>
<p><span class="img-wrap"><img data-src="/img/bVXAhK?w=621&amp;h=294" src="https://static.alili.tech/img/bVXAhK?w=621&amp;h=294" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>规则或新建规则</p>
<p><span class="img-wrap"><img data-src="/img/bVXAhX?w=209&amp;h=245" src="https://static.alili.tech/img/bVXAhX?w=209&amp;h=245" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXAh9?w=1321&amp;h=445" src="https://static.alili.tech/img/bVXAh9?w=1321&amp;h=445" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVXAif?w=594&amp;h=652" src="https://static.alili.tech/img/bVXAif?w=594&amp;h=652" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader52">更换自己的操作系统</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cat /etc/issue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">cat <span class="hljs-regexp">/etc/i</span>ssue</code></pre>
<h2 id="articleHeader53">搬瓦工查看自己的系统信息</h2>
<p><span class="img-wrap"><img data-src="/img/bVXzXj?w=837&amp;h=625" src="https://static.alili.tech/img/bVXzXj?w=837&amp;h=625" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader54">更换自己的系统盘</h2>
<h3 id="articleHeader55">第一步先停止</h3>
<p><span class="img-wrap"><img data-src="/img/bVXzY6?w=1209&amp;h=559" src="https://static.alili.tech/img/bVXzY6?w=1209&amp;h=559" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader56">第二步选择新的系统</h3>
<p><span class="img-wrap"><img data-src="/img/bVXzZX?w=924&amp;h=566" src="https://static.alili.tech/img/bVXzZX?w=924&amp;h=566" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader57">阿里云更换系统盘 或初始化磁盘</h2>
<p><span class="img-wrap"><img data-src="/img/bVXzQR?w=555&amp;h=550" src="https://static.alili.tech/img/bVXzQR?w=555&amp;h=550" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>先停止然后在点击更换系统盘</p>
<h3 id="articleHeader58">初始化磁盘，并且设置密码</h3>
<p><span class="img-wrap"><img data-src="/img/bVXzRQ?w=849&amp;h=521" src="https://static.alili.tech/img/bVXzRQ?w=849&amp;h=521" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader59">如有帮助欢迎点赞，收藏，有问题欢迎评论</h2>
<p><span class="img-wrap"><img data-src="/img/bVXyL8?w=752&amp;h=974" src="https://static.alili.tech/img/bVXyL8?w=752&amp;h=974" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈项目上线（vue+node+mongodb）】03.安装Nginx+node+mongodb+mysql+php环境

## 原文链接
[https://segmentfault.com/a/1190000011778030](https://segmentfault.com/a/1190000011778030)

