---
title: '/dev/[u]random：对熵的解释'
hidden: true
categories: [reprint]
slug: ddc3e3dd
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <h1><a href="#devurandom对熵的解释"></a>/dev/[u]random：对熵的解释</h1>
<h3><a href="#熵"></a>熵</h3>
<p>当谈到 <code>/dev/random</code> 和 <code>/dev/urandom</code> 的主题时，你总是会听到这个词：“熵Entropy”。每个人对此似乎都有自己的比喻。那为我呢？我喜欢将熵视为“随机果汁”。它是果汁，随机数需要它变得更随机。</p>
<p>如果你曾经生成过 SSL 证书或 GPG 密钥，那么可能已经看到过像下面这样的内容：</p>
<pre><code class="hljs routeros">We need <span class="hljs-keyword">to</span> generate a lot of random bytes. It is a good idea <span class="hljs-keyword">to</span> perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance <span class="hljs-keyword">to</span> gain enough entropy.
++++++++++<span class="hljs-built_in">..</span>+++++.+++++++++++++++.++++++++++<span class="hljs-built_in">..</span>.+++++++++++++++<span class="hljs-built_in">..</span>.++++++
+++++++++++++++++++++++++++++.+++++<span class="hljs-built_in">..</span>+++++.+++++.+++++++++++++++++++++++++&gt;.
++++++++++&gt;+++++<span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span><span class="hljs-built_in">..</span>.+++++
<span class="hljs-keyword">Not</span> enough random bytes available. Please <span class="hljs-keyword">do</span> some other work <span class="hljs-keyword">to</span> give
the OS a chance <span class="hljs-keyword">to</span> collect more entropy! (Need 290 more bytes)

</code></pre><p>通过在键盘上打字并移动鼠标，你可以帮助生成熵或随机果汁。</p>
<p>你可能会问自己……为什么我需要熵？以及为什么它对于随机数真的变得随机如此重要？那么，假设我们的熵的来源仅限于键盘、鼠标和磁盘 IO 的数据。但是我们的系统是一个服务器，所以我知道没有鼠标和键盘输入。这意味着唯一的因素是你的 IO。如果它是一个单独的、几乎不使用的磁盘，你将拥有较低的熵。这意味着你的系统随机的能力很弱。换句话说，我可以玩概率游戏，并大幅减少破解 ssh 密钥或者解密你认为是加密会话的时间。</p>
<p>好的，但这是很难实现的对吧？不，实际上并非如此。看看这个 <a href="http://jhurani.com/linux/2017/11/01/%22https://jblevins.org/log/ssh-vulnkey%22">Debian OpenSSH 漏洞</a>。这个特定的问题是由于某人删除了一些负责添加熵的代码引起的。有传言说，他们因为它导致 valgrind 发出警告而删除了它。然而，在这样做的时候，随机数现在少了很多随机性。事实上，熵少了很多，因此暴力破解变成了一个可行的攻击向量。</p>
<p>希望到现在为止，我们理解了熵对安全性的重要性。无论你是否意识到你正在使用它。</p>
<h3><a href="#devrandom-和-devurandom"></a>/dev/random 和 /dev/urandom</h3>
<p><code>/dev/urandom</code> 是一个伪随机数生成器，缺乏熵它也<strong>不会</strong>停止。</p>
<p><code>/dev/random</code> 是一个真随机数生成器，它会在缺乏熵的时候停止。</p>
<p>大多数情况下，如果我们正在处理实际的事情，并且它不包含你的核心信息，那么 <code>/dev/urandom</code> 是正确的选择。否则，如果就使用 <code>/dev/random</code>，那么当系统的熵耗尽时，你的程序就会变得有趣。无论它直接失败，或只是挂起——直到它获得足够的熵，这取决于你编写的程序。</p>
<h3><a href="#检查熵"></a>检查熵</h3>
<p>那么，你有多少熵？</p>
<pre><code class="hljs autoit">[root<span class="hljs-symbol">@testbox</span> test]<span class="hljs-meta"># cat /proc/sys/kernel/random/poolsize</span>
<span class="hljs-number">4096</span>
[root<span class="hljs-symbol">@testbox</span> test]<span class="hljs-meta"># cat /proc/sys/kernel/random/entropy_avail</span>
<span class="hljs-number">2975</span>

</code></pre><p><code>/proc/sys/kernel/random/poolsize</code>，说明熵池的大小（以位为单位）。例如：在停止抽水之前我们应该储存多少随机果汁。<code>/proc/sys/kernel/random/entropy_avail</code> 是当前池中随机果汁的数量（以位为单位）。</p>
<h3><a href="#我们如何影响这个数字"></a>我们如何影响这个数字？</h3>
<p>这个数字可以像我们使用它一样耗尽。我可以想出的最简单的例子是将 <code>/dev/random</code> 定向到 <code>/dev/null</code> 中：</p>
<pre><code class="hljs cs">[<span class="hljs-meta">root@testbox test</span>]<span class="hljs-meta"># cat /dev/random &gt; /dev/null &amp;</span>
[<span class="hljs-meta">1</span>] <span class="hljs-number">19058</span>
[<span class="hljs-meta">root@testbox test</span>]<span class="hljs-meta"># cat /proc/sys/kernel/random/entropy_avail</span>
<span class="hljs-number">0</span>
[<span class="hljs-meta">root@testbox test</span>]<span class="hljs-meta"># cat /proc/sys/kernel/random/entropy_avail</span>
<span class="hljs-number">1</span>

</code></pre><p>影响这个最简单的方法是运行 <a href="http://www.issihosts.com/haveged/">Haveged</a>。Haveged 是一个守护进程，它使用处理器的“抖动”将熵添加到系统熵池中。安装和基本设置非常简单。</p>
<pre><code class="hljs crystal">[root@b08s02ur ~]<span class="hljs-comment"># systemctl enable haveged</span>
Created symlink from /etc/systemd/system/multi-user.target.wants/haveged.service to /usr/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">systemd</span>/<span class="hljs-title">system</span>/<span class="hljs-title">haveged</span>.<span class="hljs-title">service</span>.</span>
[root@b08s02ur ~]<span class="hljs-comment"># systemctl start haveged</span>

</code></pre><p>在流量相对中等的机器上：</p>
<pre><code class="hljs less"><span class="hljs-selector-attr">[root@testbox ~]</span># <span class="hljs-selector-tag">pv</span> /<span class="hljs-selector-tag">dev</span>/<span class="hljs-selector-tag">random</span> &gt; /<span class="hljs-selector-tag">dev</span>/<span class="hljs-selector-tag">null</span> 
  <span class="hljs-selector-tag">40</span> <span class="hljs-selector-tag">B</span> <span class="hljs-selector-tag">0</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:15</span> <span class="hljs-selector-attr">[   0 B/s]</span> <span class="hljs-selector-attr">[                    &lt;=&gt;                                                                                                                                                      ]</span>
  <span class="hljs-selector-tag">52</span> <span class="hljs-selector-tag">B</span> <span class="hljs-selector-tag">0</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:23</span> <span class="hljs-selector-attr">[   0 B/s]</span> <span class="hljs-selector-attr">[                           &lt;=&gt;                                                                                                                                               ]</span>
  <span class="hljs-selector-tag">58</span> <span class="hljs-selector-tag">B</span> <span class="hljs-selector-tag">0</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:25</span> <span class="hljs-selector-attr">[5.92 B/s]</span> <span class="hljs-selector-attr">[                              &lt;=&gt;                                                                                                                                            ]</span>
  <span class="hljs-selector-tag">64</span> <span class="hljs-selector-tag">B</span> <span class="hljs-selector-tag">0</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:30</span> <span class="hljs-selector-attr">[6.03 B/s]</span> <span class="hljs-selector-attr">[                                  &lt;=&gt;                                                                                                                                        ]</span>
^<span class="hljs-selector-tag">C</span>
<span class="hljs-selector-attr">[root@testbox ~]</span># <span class="hljs-selector-tag">systemctl</span> <span class="hljs-selector-tag">start</span> <span class="hljs-selector-tag">haveged</span>
<span class="hljs-selector-attr">[root@testbox ~]</span># <span class="hljs-selector-tag">pv</span> /<span class="hljs-selector-tag">dev</span>/<span class="hljs-selector-tag">random</span> &gt; /<span class="hljs-selector-tag">dev</span>/<span class="hljs-selector-tag">null</span> 
<span class="hljs-selector-tag">7</span><span class="hljs-selector-class">.12MiB</span> <span class="hljs-selector-tag">0</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:05</span> <span class="hljs-selector-attr">[1.43MiB/s]</span> <span class="hljs-selector-attr">[                &lt;=&gt;                                                                                                                                                        ]</span>
<span class="hljs-selector-tag">15</span><span class="hljs-selector-class">.7MiB</span> <span class="hljs-selector-tag">0</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:11</span> <span class="hljs-selector-attr">[1.44MiB/s]</span> <span class="hljs-selector-attr">[                                    &lt;=&gt;                                                                                                                                    ]</span>
<span class="hljs-selector-tag">27</span><span class="hljs-selector-class">.2MiB</span> <span class="hljs-selector-tag">0</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:19</span> <span class="hljs-selector-attr">[1.46MiB/s]</span> <span class="hljs-selector-attr">[                                                               &lt;=&gt;                                                                                                         ]</span>
  <span class="hljs-selector-tag">43MiB</span> <span class="hljs-selector-tag">0</span><span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:30</span> <span class="hljs-selector-attr">[1.47MiB/s]</span> <span class="hljs-selector-attr">[                                                                                                    &lt;=&gt;                                                                    ]</span>
^<span class="hljs-selector-tag">C</span>

</code></pre><p>使用 <code>pv</code> 我们可以看到我们通过管道传递了多少数据。正如你所看到的，在运行 <code>haveged</code> 之前，我们是 2.1 位/秒（B/s）。而在开始运行 <code>haveged</code> 之后，加入处理器的抖动到我们的熵池中，我们得到大约 1.5MiB/秒。</p>
<hr>
<p>via: <a href="http://jhurani.com/linux/2017/11/01/entropy-explained.html">http://jhurani.com/linux/2017/11/01/entropy-explained.html</a></p>
<p>作者：<a href="https://jblevins.org/log/ssh-vulnkey">James J</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/dev-urandom-entropy-explained](https://www.zcfy.cc/article/dev-urandom-entropy-explained)

## 原文标题
/dev/[u]random：对熵的解释
