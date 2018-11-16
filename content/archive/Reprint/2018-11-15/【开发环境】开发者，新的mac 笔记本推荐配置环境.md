---
title: 【开发环境】开发者，新的mac 笔记本推荐配置环境
hidden: true
categories: reprint
slug: d78cc73b
date: 2018-11-15 02:30:08
---

{{< raw >}}
<h2>&#x672C;&#x5730;&#x6DFB;&#x52A0;ssh</h2><pre><code>ssh-keygen -t rsa -C &quot;wsd312@163.com&quot;</code></pre><h2>&#x5B89;&#x88C5; homebrew</h2><pre><code>/usr/bin/ruby -e &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)&quot;
</code></pre><h2>&#x4E0B;&#x8F7D; ss</h2><pre><code>mac &#x7248;&#x672C;
https://github.com/shadowsocks/ShadowsocksX-NG/releases 
</code></pre><h2>&#x90AE;&#x7BB1;</h2><p>&#x767E;&#x5EA6;&#x548C;&#x6CAA;&#x6C5F;&#x90FD;&#x662F;outlook &#x5FAE;&#x8F6F;&#x7684;&#x90AE;&#x7BB1;web&#x7CFB;&#x7EDF;</p><ul><li>&#x90AE;&#x7BB1;&#x5927;&#x5E08; 163&#x51FA;&#x54C1;&#x5C31;&#x53EF;&#x4EE5;&#x641E;&#x5B9A;</li><li>&#x81EA;&#x5E26;&#x7684;&#x90AE;&#x4EF6;&#x7CFB;&#x7EDF;</li><li>&#x624B;&#x673A;&#x4F7F;&#x7528;&#x7684;&#x4E5F;&#x662F;&#x540C;&#x6837;&#x7684;&#x5BA2;&#x6237;&#x7AEF;</li></ul><blockquote>&#x4E4B;&#x524D;&#x6709;&#x7684;&#x516C;&#x53F8;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x817E;&#x8BAF;&#x90AE;&#x7BB1;&#xFF0C;&#x53EF;&#x4EE5;&#x5173;&#x8054;&#x5C0F;&#x7A0B;&#x5E8F; &#x548C;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x6709;&#x90AE;&#x4EF6;&#x4F1A;&#x901A;&#x77E5;&#x7684;</blockquote><h2>&#x5F00;&#x53D1;&#x5DE5;&#x5177;</h2><h3>&#x5B89;&#x88C5;homebrew</h3><h3>iterm2</h3><p>&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x5B57;&#x4F53; 18</p><h3>&#x5B89;&#x88C5;zshell &#x914D;&#x7F6E;</h3><h3>&#x7BA1;&#x7406;zshell &#x63D2;&#x4EF6;</h3><p><a href="https://github.com/tarjoilija/zgen" rel="nofollow noreferrer">https://github.com/tarjoilija...</a></p><pre><code>git clone https://github.com/tarjoilija/zgen.git &quot;${HOME}/.zgen&quot; &amp;&amp; source &quot;${HOME}/.zgen/zgen.zsh&quot;

# iterm bar show num
zgen load tysonwolker/iterm-tab-colors</code></pre><h4>&#x914D;&#x7F6E;&#x4E3B;&#x9898; &#x5E76;&#x4E14;&#x914D;&#x7F6E;&#x5B57;&#x4F53; &#x548C;&#x989C;&#x8272;</h4><p>ZSH_THEME=&quot;agnoster&quot;</p><h4>&#x914D;&#x7F6E;&#x63D2;&#x4EF6;</h4><p>&#x53C2;&#x8003; <a href="https://github.com/unixorn/awesome-zsh-plugins" rel="nofollow noreferrer">https://github.com/unixorn/aw...</a></p><pre><code>vim  ~/.zshrc
&#x627E;&#x5230; plugins &#x6DFB;&#x52A0;&#x4E0B;&#x9762;&#x63D2;&#x4EF6; 
plugins=(
  git
  extract
  sublime
)
source  ~/.zshrc</code></pre><h4>&#x914D;&#x7F6E;&#x81EA;&#x52A8;&#x8DF3;&#x8F6C;</h4><pre><code>brew install autojump</code></pre><blockquote>&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x53EA;&#x8981;&#x4F60;&#x8BBF;&#x95EE;&#x8FC7;&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x53EF;&#x4EE5; j filename &#x5FEB;&#x901F;&#x8FDB;&#x5165;</blockquote><h4>&#x7F16;&#x8F91;&#x5668;</h4><p>sublime</p><h4>atom</h4><h4>atom&#x63D2;&#x4EF6;</h4><p>&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x5199;&#x6587;&#x6863;&#x53EF;&#x4EE5;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x5230;&#x4E03;&#x725B;<br>markdown-up-img</p><h4>vscode &#x8FD9;&#x4E09;&#x4E2A;&#x914D;&#x5408;&#x4F7F;&#x7528;</h4><h3>&#x7EC8;&#x7AEF;&#x5FEB;&#x6377;&#x542F;&#x52A8; vscode</h3><p>&#x6216;&#x8005;&#x76F4;&#x63A5;&#x6DFB;&#x52A0; zsh vscode &#x63D2;&#x4EF6; &#x4E0A;&#x9762;&#x8BB2;&#x5230;&#x4E86;</p><pre><code>vim ~/.zshrc

alias code=&apos;/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code&apos;

source ~/.zshrc</code></pre><h2>&#x5B89;&#x88C5;node</h2><pre><code>brew install node</code></pre><p>&#x914D;&#x7F6E;&#x6DD8;&#x5B9D;&#x955C;&#x50CF;</p><pre><code>alias cnpm=&quot;npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc&quot;</code></pre><h2>mysql &#x4E0B;&#x8F7D;</h2><h4>&#x5B89;&#x88C5;&#x65B9;&#x5F0F;</h4><pre><code>brew install mysql</code></pre><h4>&#x7ED3;&#x679C;</h4><pre><code>We&apos;ve installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

To have launchd start mysql now and restart at login:
  brew services start mysql
Or, if you don&apos;t want/need a background service you can just run:
  mysql.server start
==&gt; Summary
&#x1F37A;  /usr/local/Cellar/mysql/5.7.22: 317 files, 234.2MB</code></pre><h4>gui &#x684C;&#x9762;&#x5DE5;&#x5177;</h4><ul><li>navicat &#x63A8;&#x8350;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【开发环境】开发者，新的mac 笔记本推荐配置环境

## 原文链接
[https://segmentfault.com/a/1190000016147620](https://segmentfault.com/a/1190000016147620)

