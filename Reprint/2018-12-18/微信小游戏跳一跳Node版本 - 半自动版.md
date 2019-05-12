---
title: '微信小游戏跳一跳Node版本 - 半自动版' 
date: 2018-12-18 2:30:10
hidden: true
slug: 33ah9rwnzfw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>项目地址：<a href="https://github.com/DMQ/jumpgame-auto" rel="nofollow noreferrer" target="_blank">https://github.com/DMQ/jumpga...</a><br>没别的，就是感兴趣，重复造轮子<p>此版本是半自动版，需要手动在页面测量每一步的距离来辅助得分，后续会研究图像识别，实现自动版</p>
<p>目前已有的一些自动版程序，刷出来的分数都很容易被微信重置分数，主要原因是combo太多，得分太高，有一些程序加了随机的中心点偏移，就是控制不要每一次都跳中中心点，效果不错，不过预计也会持续的被微信打击</p>
<p>此版本对于长按位置坐标加了随机偏移，更不易被微信识别，因为是需要手动测量距离，所以这个版本操作比较慢，需要耐心才能得高分，建议不要高于1000分，不然容易被微信重置分数</p>
<p>思路借鉴于这个牛逼的项目：<a href="https://github.com/wangshub/wechat_jump_game" rel="nofollow noreferrer" target="_blank">https://github.com/wangshub/w...</a></p>
</blockquote>
<h3 id="articleHeader0">分数</h3>
<p><span class="img-wrap"><img data-src="/img/bV1Xht?w=374&amp;h=664" src="https://static.alili.tech/img/bV1Xht?w=374&amp;h=664" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">操作页面</h3>
<p><span class="img-wrap"><img data-src="/img/bV1XfG?w=911&amp;h=683" src="https://static.alili.tech/img/bV1XfG?w=911&amp;h=683" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">环境准备</h3>
<blockquote>当前项目所有代码在 Node &gt;= 8.1.0, Chrome 63.0.3239.132 调试运行正常</blockquote>
<ul>
<li>安装<a href="https://nodejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">Node环境</a>
</li>
<li>
<p>Adb工具下载及安装</p>
<ul>
<li><a href="https://dl.google.com/android/repository/platform-tools-latest-windows.zip" rel="nofollow noreferrer" target="_blank">Windows Adb下载</a></li>
<li><a href="https://jingyan.baidu.com/article/17bd8e52f514d985ab2bb800.html" rel="nofollow noreferrer" target="_blank">Windows配置Adb环境</a></li>
<li><a href="https://dl.google.com/android/repository/platform-tools-latest-darwin.zip" rel="nofollow noreferrer" target="_blank">Mac Adb下载</a></li>
<li><a href="http://blog.csdn.net/lihongxiangleo/article/details/52598233" rel="nofollow noreferrer" target="_blank">Mac配置Adb环境</a></li>
</ul>
</li>
</ul>
<h3 id="articleHeader3">连接手机（暂不支持iPhone）</h3>
<ul>
<li>打开Android手机，开启USB调试模式（一般路径：设置 - 其他（高级）设置 - 开发者选项 - 开启开发者选项+开启USB调试，如果其他设置里面没有开发者选项，到关于手机选项里面开启），更多开启方式参考<a href="http://www.shuame.com/faq/usb-connect/9-usb.html" rel="nofollow noreferrer" target="_blank">这里</a>
</li>
<li>用USB把Android手机连接上电脑，若手机弹出授权弹出，请选择允许！！</li>
<li>在Cmd(Windows)或终端(Mac) 输入命令 <code>adb devices</code> 确认Android手机已经正确连接，正常的话会输出类似这样的内容: <code>List of devices attached \n 3281219f        device</code>，如果没有输出 <code>xxxxxxx      device</code>的话则没有正常连接，请重试</li>
</ul>
<h3 id="articleHeader4">使用教程</h3>
<ul>
<li>
<p>在Cmd(Windows)或终端(Mac) <code>cd</code> 到项目根目录，执行以下命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i
npm run start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> i
<span class="hljs-built_in">npm</span> run start</code></pre>
</li>
<li>确认服务启动后(输出websocket listening port 8899...)，在根目录找到index.html，用Chrome打开，并根据页面指示操作即可</li>
<li>如果出现端口8899被占用的情况，请自行在文件<code>server/index.js</code>, <code>index.html</code>中搜索8899替换成可用的端口</li>
</ul>
<h3 id="articleHeader5">Good Luck!</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小游戏跳一跳Node版本 - 半自动版

## 原文链接
[https://segmentfault.com/a/1190000012820280](https://segmentfault.com/a/1190000012820280)

