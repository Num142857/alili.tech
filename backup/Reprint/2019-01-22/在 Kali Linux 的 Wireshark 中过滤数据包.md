---
title: '在 Kali Linux 的 Wireshark 中过滤数据包' 
date: 2019-01-22 2:30:08
hidden: true
slug: w7enn03zbhe
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-kali-linux-的-wireshark-中过滤数据包"></a>在 Kali Linux 的 Wireshark 中过滤数据包</h1>
<h3><a href="#介绍"></a>介绍</h3>
<p>数据包过滤可让你专注于你感兴趣的确定数据集。如你所见，Wireshark 默认会抓取_所有_数据包。这可能会妨碍你寻找具体的数据。 Wireshark 提供了两个功能强大的过滤工​​具，让你简单而无痛地获得精确的数据。</p>
<p>Wireshark 可以通过两种方式过滤数据包。它可以通过只收集某些数据包来过滤，或者在抓取数据包后进行过滤。当然，这些可以彼此结合使用，并且它们各自的用处取决于收集的数据和信息的多少。</p>
<h3><a href="#布尔表达式和比较运算符"></a>布尔表达式和比较运算符</h3>
<p>Wireshark 有很多很棒的内置过滤器。当开始输入任何一个过滤器字段时，你将看到它们会自动补完。这些过滤器大多数对应于用户对数据包的常见分组方式，比如仅过滤 HTTP 请求就是一个很好的例子。</p>
<p>对于其他的，Wireshark 使用布尔表达式和/或比较运算符。如果你曾经做过任何编程，你应该熟悉布尔表达式。他们是使用 <code>and</code>、<code>or</code>、<code>not</code> 来验证声明或表达式的真假。比较运算符要简单得多，它们只是确定两件或更多件事情是否彼此相等、大于或小于。</p>
<h3><a href="#过滤抓包"></a>过滤抓包</h3>
<p>在深入自定义抓包过滤器之前，请先查看 Wireshark 已经内置的内容。单击顶部菜单上的 “Capture” 选项卡，然后点击 “Options”。可用接口下面是可以编写抓包过滤器的行。直接移到左边一个标有 “Capture Filter” 的按钮上。点击它，你将看到一个新的对话框，其中包含内置的抓包过滤器列表。看看里面有些什么。</p>
<p><a href="https://camo.githubusercontent.com/c4c313853974bb552eb3ae9b3b352a1912fefa4d/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f77697265736861726b2d636170747572652d66696c7465722e6a7067"><img src="https://p0.ssl.qhimg.com/t011e9622308cd86ffa.jpg" alt="Wireshark dialog for creating a capture filter"></a></p>
<p>在对话框的底部，有一个用于创建并保存抓包过滤器的表单。按左边的 “New” 按钮。它将创建一个填充有默认数据的新的抓包过滤器。要保存新的过滤器，只需将实际需要的名称和表达式替换原来的默认值，然后单击“Ok”。过滤器将被保存并应用。使用此工具，你可以编写并保存多个不同的过滤器，以便它们将来可以再次使用。</p>
<p>抓包有自己的过滤语法。对于比较，它不使用等于号，并使用 <code>&gt;</code> 和 <code>&lt;</code> 来用于大于或小于。对于布尔值来说，它使用 <code>and</code>、<code>or</code> 和 <code>not</code>。</p>
<p>例如，如果你只想监听 80 端口的流量，你可以使用这样的表达式：<code>port 80</code>。如果你只想从特定的 IP 监听端口 80，你可以使用 <code>port 80 and host 192.168.1.20</code>。如你所见，抓包过滤器有特定的关键字。这些关键字用于告诉 Wireshark 如何监控数据包以及哪一个数据是要找的。例如，<code>host</code> 用于查看来自 IP 的所有流量。<code>src</code> 用于查看源自该 IP 的流量。与之相反，<code>dst</code> 只监听目标到这个 IP 的流量。要查看一组 IP 或网络上的流量，请使用 <code>net</code>。</p>
<h3><a href="#过滤结果"></a>过滤结果</h3>
<p>界面的底部菜单栏是专门用于过滤结果的菜单栏。此过滤器不会更改 Wireshark 收集的数据，它只允许你更轻松地对其进行排序。有一个文本字段用于输入新的过滤器表达式，并带有一个下拉箭头以查看以前输入的过滤器。旁边是一个标为 “Expression” 的按钮，另外还有一些用于清除和保存当前表达式的按钮。</p>
<p>点击 “Expression” 按钮。你将看到一个小窗口，其中包含多个选项。左边一栏有大量的条目，每个都有附加的折叠子列表。你可以用这些来过滤所有不同的协议、字段和信息。你不可能看完所有，所以最好是大概看下。你应该注意到了一些熟悉的选项，如 HTTP、SSL 和 TCP。</p>
<p><a href="https://camo.githubusercontent.com/384525fa5321d6bcda4554cf43c64fec29e55d48/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f77697265736861726b2d726573756c74732d66696c7465722e6a7067"><img src="https://p0.ssl.qhimg.com/t0107f5e973fdee0c3e.jpg" alt="Wireshark dailog for creating a results filter"></a></p>
<p>子列表包含可以过滤的不同部分和请求方法。你可以看到通过 GET 和 POST 请求过滤 HTTP 请求。</p>
<p>你还可以在中间看到运算符列表。通过从每列中选择条目，你可以使用此窗口创建过滤器，而不用记住 Wireshark 可以过滤的每个条目。对于过滤结果，比较运算符使用一组特定的符号。 <code>==</code> 用于确定是否相等。<code>&gt;</code> 用于确定一件东西是否大于另一个东西，<code>&lt;</code> 找出是否小一些。 <code>&gt;=</code> 和 <code>&lt;=</code> 分别用于大于等于和小于等于。它们可用于确定数据包是否包含正确的值或按大小过滤。使用 <code>==</code> 仅过滤 HTTP GET 请求的示例如下：<code>http.request.method == "GET"</code>。</p>
<p>布尔运算符基于多个条件将小的表达式串到一起。不像是抓包所使用的单词，它使用三个基本的符号来做到这一点。<code>&amp;&amp;</code> 代表 “与”。当使用时，<code>&amp;&amp;</code> 两边的两个语句都必须为真值才行，以便 Wireshark 来过滤这些包。<code>||</code> 表示 “或”。只要两个表达式任何一个为真值，它就会被过滤。如果你正在查找所有的 GET 和 POST 请求，你可以这样使用 <code>||</code>：<code>(http.request.method == "GET") || (http.request.method == "POST")</code>。<code>!</code> 是 “非” 运算符。它会寻找除了指定的东西之外的所有东西。例如，<code>!http</code> 将展示除了 HTTP 请求之外的所有东西。</p>
<h3><a href="#总结思考"></a>总结思考</h3>
<p>过滤 Wireshark 可以让你有效监控网络流量。熟悉可以使用的选项并习惯你可以创建过滤器的强大表达式需要一些时间。然而一旦你学会了，你将能够快速收集和查找你要的网络数据，而无需梳理长长的数据包或进行大量的工作。</p>
<hr>
<p>via: <a href="https://linuxconfig.org/filtering-packets-in-wireshark-on-kali-linux">https://linuxconfig.org/filtering-packets-in-wireshark-on-kali-linux</a></p>
<p>作者：<a href="https://linuxconfig.org/filtering-packets-in-wireshark-on-kali-linux">Nick Congleton</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Kali Linux 的 Wireshark 中过滤数据包

## 原文链接
[https://www.zcfy.cc/article/filtering-packets-in-wireshark-on-kali-linux](https://www.zcfy.cc/article/filtering-packets-in-wireshark-on-kali-linux)

