---
title: '在 Linux 字符界面中获取天气预报' 
date: 2019-01-21 2:30:06
hidden: true
slug: sksi48h8jd
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-字符界面中获取天气预报"></a>在 Linux 字符界面中获取天气预报</h1>
<p><strong>目标：</strong>使用 Linux 命令行显示天气预报。</p>
<p><strong>发行版：</strong>所有 Linux 发行版。</p>
<p><strong>要求：</strong>能连上因特网的 Linux</p>
<p><strong>难度：</strong>容易</p>
<p><strong>约定：</strong></p>
<ul>
<li><code>#</code> - 需要使用 root 权限来执行指定命令，可以直接使用 root 用户来执行也可以使用 <code>sudo</code> 命令</li>
<li><code>$</code> - 可以使用普通用户来执行指定命令</li>
</ul>
<h3><a href="#简介"></a>简介</h3>
<p>无需打开网页浏览器就能直接从终端获取最新的天气预报那该多方便啊，对吧？你还能把它写成脚本，或者设置定义定时任务。</p>
<p><code>http://wttr.in</code> 是一个允许你搜索世界各地天气预报的网站，而且它的是以 ASCII 字符的形式来显示结果的。通过使用 <code>cURL</code> 访问 <code>http://wttr.in</code>，就能直接在终端显示查询结果了。</p>
<h3><a href="#获取所在地的天气"></a>获取所在地的天气</h3>
<p><a href="https://camo.githubusercontent.com/3e664d5d881ea91ff931a1f40700789e0b3e30b4/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f777474722d6c6f63616c2e6a7067"><img src="https://p0.ssl.qhimg.com/t012ad3ec2c462ae997.jpg" alt="Local weather from wttr.in"></a></p>
<p>要抓取所在地的天气情况非常简单。<code>wttr.in</code> 会自动根据 IP 地址来探测你的所在地。除非你用了 VPN，否则它的精度还不错。</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>curl wttr.<span class="hljs-keyword">in</span>

</code></pre><h3><a href="#获取指定城市的天气"></a>获取指定城市的天气</h3>
<p><a href="https://camo.githubusercontent.com/2989c7ee24268fa21e2eacf004a1fbe7a56a28ce/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f777474722d636974792e6a7067"><img src="https://p0.ssl.qhimg.com/t01e2403804fc3a96dd.jpg" alt="Weather by city from wttr.in"></a></p>
<p>你可以通过在 <code>wttr.in</code> 后加上斜杠和城市名称的方式来获得其他城市的天气情况。不过要把名字中的空格替换成 <code>+</code>。</p>
<pre><code class="hljs ada">$ curl wttr.<span class="hljs-keyword">in</span>/<span class="hljs-keyword">New</span>+York

</code></pre><p>你也可以以 Unix 时区的形式来填写城市名称。</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>curl wttr.<span class="hljs-keyword">in</span>/New_York

</code></pre><p>不要直接使用空格，否则会出现奇怪而不准确的结果。</p>
<h3><a href="#获取机场天气"></a>获取机场天气</h3>
<p><a href="https://camo.githubusercontent.com/62a19938134e9b2912a0f9680c8ae68283e45e6f/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f777474722d616972706f72742e6a7067"><img src="https://p0.ssl.qhimg.com/t01a08c6bd561371d11.jpg" alt="Weather by airport from wttr.in"></a></p>
<p>若你对地区的三位机场代号很熟悉，你也可以使用机场代号来查询天气。一般来说使用机场要比使用城市更贴近你，而且更精确一些。</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>curl wttr.<span class="hljs-keyword">in</span>/JFK

</code></pre><h3><a href="#猜测所在地"></a>猜测所在地</h3>
<p><a href="https://camo.githubusercontent.com/cba54ec79c9e1c34a01100d0855d0df6aaba986a/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f777474722d6c616e646d61726b2e6a7067"><img src="https://p0.ssl.qhimg.com/t015de42daa50726495.jpg" alt="Weather by landmark from wttr.in"></a></p>
<p>通过使用 <code>~</code> 字符，你可以让 <code>wttr.in</code> 通过地标来猜测天气情况。</p>
<pre><code class="hljs ada">$ curl wttr.<span class="hljs-keyword">in</span>/~Statue+<span class="hljs-keyword">Of</span>+Liberty

</code></pre><h3><a href="#域名所在地的天气"></a>域名所在地的天气</h3>
<p><a href="https://camo.githubusercontent.com/29d226fb7e0eba42e29f7fca7e131b22b862bec9/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f777474722d75726c2e6a7067"><img src="https://p0.ssl.qhimg.com/t01dd701d81a572ea31.jpg" alt="Weather by domain name from wttr.in"></a></p>
<p>你想不想知道 LinuxConfig 托管地的天气？现在有一个方法可以知道！<code>wttr.in</code> 可以通过域名获取天气。是的，这个功能可能不那么实用，但这很有趣啊。</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>curl wttr.<span class="hljs-keyword">in</span>/<span class="hljs-variable">@linuxconfig</span>.org

</code></pre><h3><a href="#更改温度单位"></a>更改温度单位</h3>
<p><a href="https://camo.githubusercontent.com/48bdf575f71b3ef677843ea6a1ea6c033c8cec7e/68747470733a2f2f6c696e7578636f6e6669672e6f72672f696d616765732f777474722d756e6974732e6a7067"><img src="https://p0.ssl.qhimg.com/t01001e4c239862fd4a.jpg" alt="Change unit system in wttr.in"></a></p>
<p>默认情况下，<code>wttr.in</code> 会根据你的实际地址来决定显示哪种温度单位（C 还是 F）。基本上，在美国，使用的是华氏度，而其他地方显示的是摄氏度。你可以指定显示的温度单位，在 URL 后添加 <code>?u</code> 会显示华氏度，而添加 <code>?m</code> 会显示摄氏度。</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>curl wttr.<span class="hljs-keyword">in</span>/New_York?m

<span class="hljs-variable">$ </span>curl wttr.<span class="hljs-keyword">in</span>/Toronto?u

</code></pre><p>在 ZSH 上有一个很奇怪的 bug，会使得这两条语句不能正常工作，如果你需要更换单位，恐怕需要改成使用 Bash 了。</p>
<h3><a href="#总结"></a>总结</h3>
<p>你可以很方便地在脚本，定时任务，甚至 MOTD（LCTT 译注：Message Of The Day - 每日消息）中访问 <code>wttr.in</code>。当然，你完全没有必要这么做。当你需要查看天气预报的时候只需要访问一下这个超棒的网站就行了。</p>
<hr>
<p>via: <a href="https://linuxconfig.org/get-your-weather-forecast-from-the-linux-cli">https://linuxconfig.org/get-your-weather-forecast-from-the-linux-cli</a></p>
<p>作者：<a href="https://linuxconfig.org">Nick Congleton</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 字符界面中获取天气预报

## 原文链接
[https://www.zcfy.cc/article/get-your-weather-forecast-from-the-linux-cli](https://www.zcfy.cc/article/get-your-weather-forecast-from-the-linux-cli)

