---
title: '如何在 Shell 脚本中跟踪调试命令的执行' 
date: 2019-01-24 2:30:11
hidden: true
slug: kjefmhmzjym
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-shell-脚本中跟踪调试命令的执行"></a>如何在 Shell 脚本中跟踪调试命令的执行</h1>
<p>在 <a href="https://linux.cn/article-8028-1.html">shell 脚本调试系列</a> 中，本文将解释第三种 shell 脚本调试模式，即 shell 跟踪，并查看一些示例来演示它如何工作以及如何使用它。</p>
<p>本系列的前面部分清晰地阐明了另外两种 shell 脚本调试模式：详细模式和语法检查模式，并用易于理解的例子展示了如何在这些模式下启用 shell 脚本调试。</p>
<ol>
<li><a href="https://linux.cn/article-8028-1.html">如何在 Linux 中启用 Shell 脚本的调试模式</a></li>
<li><a href="https://linux.cn/article-8045-1.html">如何在 Shell 脚本中执行语法检查调试模式</a></li>
</ol>
<p>shell 跟踪简单的来说就是跟踪 shell 脚本中的命令的执行。要打开 shell 跟踪，请使用 <code>-x</code> 调试选项。</p>
<p>这会让 shell 在终端上显示所有执行的命令及其参数。</p>
<p>我们将使用下面的 <code>sys_info.sh</code> shell 脚本，它会简要地打印出你的系统日期和时间、登录的用户数和系统的运行时间。不过，脚本中包含我们需要查找和更正的语法错误。</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#script to print brief system info</span>
ROOT_ID=<span class="hljs-string">"0"</span>
DATE=`date`
NO_USERS=`who | wc -l`
UPTIME=`uptime`
<span class="hljs-function"><span class="hljs-title">check_root</span></span>(){
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">"<span class="hljs-variable">$UID</span>"</span> -ne <span class="hljs-string">"<span class="hljs-variable">$ROOT_ID</span>"</span> ]; <span class="hljs-keyword">then</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">"You are not allowed to execute this program!"</span>
    <span class="hljs-built_in">exit</span> 1;    
}
<span class="hljs-function"><span class="hljs-title">print_sys_info</span></span>(){
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"System Time    : <span class="hljs-variable">$DATE</span>"</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"Number of users: <span class="hljs-variable">$NO_USERS</span>"</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"System Uptime  : <span class="hljs-variable">$UPTIME</span>
}
check_root
print_sys_info
exit 0

</span></code></pre><p>保存文件并执行脚本。脚本只能用 root 用户运行，因此如下使用 <a href="http://www.tecmint.com/su-vs-sudo-and-how-to-configure-sudo-in-linux/">sudo 命令</a>运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> chmod +x sys_info.sh</span>
<span class="hljs-meta">$</span><span class="bash"> sudo bash -x sys_info.sh</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Shell-Tracing-Errors.png"><img src="https://p5.ssl.qhimg.com/t01b3754a762a7ae280.png" alt="Shell Tracing - Show Error in Script"></a></p>
<p><em>shell 跟踪 - 显示脚本中的错误</em></p>
<p>从上面的输出我们可以观察到，首先执行命令，然后其输出做为一个变量的值。</p>
<p>例如，先执行 <code>date</code>，其输出做为变量 <code>DATE</code> 的值。</p>
<p>我们可以执行语法检查来只显示其中的语法错误，如下所示：</p>
<pre><code class="hljs mipsasm">$ sudo <span class="hljs-keyword">bash </span>-n sys_info.<span class="hljs-keyword">sh </span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Syntax-Checking-in-Script.png"><img src="https://p4.ssl.qhimg.com/t01944073f90263bdb3.png" alt="Syntax Checking in Script"></a></p>
<p><em>脚本中语法检查</em></p>
<p>如果我们审视这个 shell 脚本，我们就会发现 <code>if</code> 语句缺少了封闭条件的 <code>fi</code> 关键字。因此，让我们加上它，新的脚本应该看起来像这样：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#script to print brief system info</span>
ROOT_ID=<span class="hljs-string">"0"</span>
DATE=`date`
NO_USERS=`who | wc -l`
UPTIME=`uptime`
<span class="hljs-function"><span class="hljs-title">check_root</span></span>(){
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">"<span class="hljs-variable">$UID</span>"</span> -ne <span class="hljs-string">"<span class="hljs-variable">$ROOT_ID</span>"</span> ]; <span class="hljs-keyword">then</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">"You are not allowed to execute this program!"</span>
    <span class="hljs-built_in">exit</span> 1;
  <span class="hljs-keyword">fi</span>    
}
<span class="hljs-function"><span class="hljs-title">print_sys_info</span></span>(){
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"System Time    : <span class="hljs-variable">$DATE</span>"</span> 
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"Number of users: <span class="hljs-variable">$NO_USERS</span>"</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"System Uptime  : <span class="hljs-variable">$UPTIME</span>
}
check_root
print_sys_info
exit 0

</span></code></pre><p>再次保存文件并以 root 执行，同时做语法检查：</p>
<pre><code class="hljs mipsasm">$ sudo <span class="hljs-keyword">bash </span>-n sys_info.<span class="hljs-keyword">sh
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Syntax-Check-in-Shell-Scripts.png"><img src="https://p1.ssl.qhimg.com/t018fda32373061c47b.png" alt="Perform Syntax Check in Shell Scripts"></a></p>
<p><em>在 shell 脚本中执行语法检查</em></p>
<p>上面的语法检查操作的结果仍然显示在脚本的第 21 行还有一个错误。所以，我们仍然要纠正一些语法。</p>
<p>再一次分析脚本，会发现第 21 行的错误是由于在 <code>print_sys_info</code> 函数内最后一个 <a href="http://www.tecmint.com/echo-command-in-linux/">echo 命令</a>中没有闭合双引号 <code>"</code>。</p>
<p>我们将在 <code>echo</code> 命令中添加闭合双引号并保存文件。修改过的脚本如下：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#script to print brief system info</span>
ROOT_ID=<span class="hljs-string">"0"</span>
DATE=`date`
NO_USERS=`who | wc -l`
UPTIME=`uptime`
<span class="hljs-function"><span class="hljs-title">check_root</span></span>(){
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">"<span class="hljs-variable">$UID</span>"</span> -ne <span class="hljs-string">"<span class="hljs-variable">$ROOT_ID</span>"</span> ]; <span class="hljs-keyword">then</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">"You are not allowed to execute this program!"</span>
    <span class="hljs-built_in">exit</span> 1;
  <span class="hljs-keyword">fi</span>
}
<span class="hljs-function"><span class="hljs-title">print_sys_info</span></span>(){
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"System Time    : <span class="hljs-variable">$DATE</span>"</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"Number of users: <span class="hljs-variable">$NO_USERS</span>"</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"System Uptime  : <span class="hljs-variable">$UPTIME</span>"</span>
}
check_root
print_sys_info
<span class="hljs-built_in">exit</span> 0

</code></pre><p>现在再一次检查语法。</p>
<pre><code class="hljs mipsasm">$ sudo <span class="hljs-keyword">bash </span>-n sys_info.<span class="hljs-keyword">sh
</span>
</code></pre><p>上面的命令不会产生任何输出，因为我们的脚本语法上正确。我们也可以再次跟踪脚本执行，它应该工作得很好：</p>
<pre><code class="hljs mipsasm">$ sudo <span class="hljs-keyword">bash </span>-x sys_info.<span class="hljs-keyword">sh
</span>
</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Trace-Shell-Execution.png"><img src="https://camo.githubusercontent.com/5d1fd93addb75ae8868c4cda2cf095b209cdeb14/687474703a2f2f7777772e7465636d696e742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31322f54726163652d5368656c6c2d457865637574696f6e2e706e67" alt="Trace Shell Script Execution"></a></p>
<p><em>跟踪 shell 脚本执行</em></p>
<p>现在运行脚本。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo ./sys_info.sh</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Script-to-Show-Date-and-Uptime.png"><img src="https://p1.ssl.qhimg.com/t01dd1ef00091bfa781.png" alt="Shell Script to Show Date, Time and Uptime"></a></p>
<p><em>用 shell 脚本显示日期、时间和运行时间</em></p>
<h3><a href="#shell-跟踪执行的重要性"></a>shell 跟踪执行的重要性</h3>
<p>shell 脚本跟踪可以帮助我们识别语法错误，更重要的是识别逻辑错误。例如，在 <code>sys_info.sh</code> shell 脚本中的 <code>check_root</code> 函数，它用于确定用户是否为 root，因为脚本只允许由超级用户执行。</p>
<pre><code class="hljs awk">check_root(){
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">"$UID"</span> -ne <span class="hljs-string">"$ROOT_ID"</span> ]; then
    echo <span class="hljs-string">"You are not allowed to execute this program!"</span>
    <span class="hljs-keyword">exit</span> <span class="hljs-number">1</span>;
  fi
}

</code></pre><p>这里的魔法是由 <code>if</code> 语句表达式 <code>["$ UID" -ne "$ ROOT_ID"]</code> 控制的，一旦我们不使用合适的数字运算符（示例中为 <code>-ne</code>，这意味着不相等），我们最终可能会出一个逻辑错误。</p>
<p>假设我们使用 <code>-eq</code> （意思是等于），这将允许任何系统用户以及 root 用户运行脚本，因此是一个逻辑错误。</p>
<pre><code class="hljs awk">check_root(){
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">"$UID"</span> -eq <span class="hljs-string">"$ROOT_ID"</span> ]; then
    echo <span class="hljs-string">"You are not allowed to execute this program!"</span>
    <span class="hljs-keyword">exit</span> <span class="hljs-number">1</span>;
  fi
}

</code></pre><p>注意：我们在本系列开头介绍过，<code>set</code> 这个 shell 内置命令可以在 shell 脚本的特定部分激活调试。</p>
<p>因此，下面的行将帮助我们通过跟踪脚本的执行在其中找到这个逻辑错误：</p>
<p>具有逻辑错误的脚本：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash</span>
<span class="hljs-comment">#script to print brief system info</span>
ROOT_ID=<span class="hljs-string">"0"</span>
DATE=`date`
NO_USERS=`who | wc -l`
UPTIME=`uptime`
<span class="hljs-function"><span class="hljs-title">check_root</span></span>(){
  <span class="hljs-keyword">if</span> [ <span class="hljs-string">"<span class="hljs-variable">$UID</span>"</span> -eq <span class="hljs-string">"<span class="hljs-variable">$ROOT_ID</span>"</span> ]; <span class="hljs-keyword">then</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">"You are not allowed to execute this program!"</span>
    <span class="hljs-built_in">exit</span> 1;
  <span class="hljs-keyword">fi</span>
}
<span class="hljs-function"><span class="hljs-title">print_sys_info</span></span>(){
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"System Time    : <span class="hljs-variable">$DATE</span>"</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"Number of users: <span class="hljs-variable">$NO_USERS</span>"</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">"System Uptime  : <span class="hljs-variable">$UPTIME</span>"</span>
}
<span class="hljs-comment">#turning on and off debugging of check_root function</span>
<span class="hljs-built_in">set</span> -x ; check_root;  <span class="hljs-built_in">set</span> +x ;
print_sys_info
<span class="hljs-built_in">exit</span> 0

</code></pre><p>保存文件并调用脚本，在输出中，我们可以看到一个普通系统用户可以在未 sudo 的情况下运行脚本。 这是因为 <code>USER_ID</code> 的值为 100，不等于为 0 的 root 的 <code>ROOT_ID</code> 。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ./sys_info.sh</span>

</code></pre><p><a href="http://www.tecmint.com/wp-content/uploads/2016/12/Run-Shell-Script-Without-Sudo.png"><img src="https://p0.ssl.qhimg.com/t010298100ec24ce1f5.png" alt="Run Shell Script Without Sudo"></a></p>
<p><strong>未 sudo 的情况下运行 shell 脚本</strong></p>
<p>那么，现在我们已经完成了 <a href="https://linux.cn/article-8028-1.html">shell 脚本调试系列</a>，可以在下面的反馈栏里给我们关于本篇或者本系列提出问题或反馈。</p>
<hr>
<p>作者简介：</p>
<p><a href="https://camo.githubusercontent.com/c56210a89c1f1555fd748aa5722cec3bfc322710/687474703a2f2f312e67726176617461722e636f6d2f6176617461722f34653434346162363131633762386337626362373665353864326538326165303f733d31323826643d626c616e6b26723d67"><img src="https://p1.ssl.qhimg.com/t018ca12cf421b83234.jpg" alt=""></a></p>
<p>Aaron Kili 是 Linux 和 F.O.S.S 爱好者，将来的 Linux SysAdmin、web 开 发人员，目前是 TecMint 的内容创作者，他喜欢用电脑工作，并坚信分享知识。</p>
<hr>
<p>via: <a href="http://www.tecmint.com/trace-shell-script-execution-in-linux/">http://www.tecmint.com/trace-shell-script-execution-in-linux/</a></p>
<p>作者：<a href="http://www.tecmint.com/author/aaronkili/">Aaron Kili</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Shell 脚本中跟踪调试命令的执行

## 原文链接
[https://www.zcfy.cc/article/how-to-trace-execution-of-commands-in-shell-script-with-shell-tracing](https://www.zcfy.cc/article/how-to-trace-execution-of-commands-in-shell-script-with-shell-tracing)

