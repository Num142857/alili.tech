---
title: 'flutter笔记1 VScode安装dart code插件踩坑记录' 
date: 2018-12-11 2:30:10
hidden: true
slug: ifvsxemopo
categories: [reprint]
---

{{< raw >}}

                    
<p>新手菜鸟一枚，想从产品转入技术坑，目标：移动端APP开发。最近听技术达人 <a href="https://segmentfault.com/blog/feihu">飞狐</a> 说flutter beta发布了，于是乎零基础入坑~话说想提高英文水平的同学，请移步<a href="https://flutter.io/" rel="nofollow noreferrer" target="_blank">flutter官网</a>，从知道flutter到现在刚好24小时，在这里分享一点学习中遇到的小坑。</p>
<h2 id="articleHeader0">1.下载flutter SDK</h2>
<blockquote>git clone <a href="https://github.com/flutter/flutter.git" rel="nofollow noreferrer" target="_blank">https://github.com/flutter/fl...</a>
</blockquote>
<p>什么? 不会git?请自行百度git安装教程，或者<a href="https://github.com/flutter/flutter.git" rel="nofollow noreferrer" target="_blank">打开这里</a>，直接下载sdk压缩包：<br><span class="img-wrap"><img data-src="/img/remote/1460000013652811" src="https://static.alili.tech/img/remote/1460000013652811" alt="flutter SDK下载" title="flutter SDK下载" style="cursor: pointer; display: inline;"></span></p>
<p>直接执行这个命令<strong>下载超慢</strong>，而且不停掉线，舍不得买代理翻墙的童鞋，请配置镜像服务器地址，查看<a href="https://github.com/flutter/flutter/wiki/Using-Flutter-in-China" rel="nofollow noreferrer" target="_blank">官方说明</a>：</p>
<blockquote>export PUB_HOSTED_URL=<a href="https://pub.flutter-io.cn" rel="nofollow noreferrer" target="_blank">https://pub.flutter-io.cn</a><br>export FLUTTER_STORAGE_BASE_URL=<a href="https://storage.flutter-io.cn" rel="nofollow noreferrer" target="_blank">https://storage.flutter-io.cn</a>
</blockquote>
<p>可惜俩命令只支持mac和linux，坑爹的教程，害我去hosts里面配了半天没效果，再胡乱搜了半天，才发现是在windows下加两个环境变量：<br>PUB_HOSTED_URL       <a href="https://pub.flutter-io.cn" rel="nofollow noreferrer" target="_blank">https://pub.flutter-io.cn</a><br>FLUTTER_STORAGE_BASE_URL      <a href="https://storage.flutter-io.cn" rel="nofollow noreferrer" target="_blank">https://storage.flutter-io.cn</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013652812" src="https://static.alili.tech/img/remote/1460000013652812" alt="flutter镜像" title="flutter镜像" style="cursor: pointer; display: inline;"></span></p>
<p>配置好这个变量后，执行上面的git命令下载flutter提速几倍，也不算快，但不至于各种掉线和失败了</p>
<h2 id="articleHeader1">2. 配置flutter库环境变量</h2>
<p>SDK下载完成后，你得让操作系统识别flutter的命令，所以再次打开环境变量：</p>
<p>控制面板&gt;系统和安全&gt;系统&gt;高级系统设置&gt;环境变量，Path变量中添加Flutter的路径，结尾记得加英文;号:<br>[你的Flutter文件夹路径]\flutter\bin</p>
<p>win10的同学请到系统设置里搜索“环境变量”&gt;编辑环境变量，向列表里添加以上路径。</p>
<h2 id="articleHeader2">3. 检验flutter库运行环境</h2>
<p>打开“命令提示符”，以管理员身份运行，输入： ##</p>
<blockquote>flutter doctor</blockquote>
<p>如果提示命令不存在或无法识别，请检查上一步的环境变量是否正确添加<br>如果环境变量没问题，输入上面的命令后，flutter会自动下载一系列的依赖和基础控件，请耐心等待几十秒，幸好有官方镜像的配置，否则这里妥妥的下个通宵，别问我怎么知道的。。。。</p>
<p>下载完毕后效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000013652813" src="https://static.alili.tech/img/remote/1460000013652813" alt="flutter安装完毕" title="flutter安装完毕" style="cursor: pointer; display: inline;"></span></p>
<p>提示安装android studio和android SDK，这个大家参考我的<a href="https://segmentfault.com/a/1190000013668914">笔记2</a></p>
<h2 id="articleHeader3">4. VScode配置</h2>
<p>进入VScode，打开扩展列表，输入dart code，搜索dart插件，点击安装&gt;重启：<br><span class="img-wrap"><img data-src="/img/remote/1460000013652814" src="https://static.alili.tech/img/remote/1460000013652814" alt="dart code" title="dart code" style="cursor: pointer;"></span></p>
<p>是时候验证信仰了，点击菜单中的查看-&gt;命令面板，输入：</p>
<blockquote>doctor</blockquote>
<p>选择Flutter: Run Flutter Doctor回车<br><span class="img-wrap"><img data-src="/img/remote/1460000013652815" src="https://static.alili.tech/img/remote/1460000013652815" alt="doctor命令" title="doctor命令" style="cursor: pointer; display: inline;"></span></p>
<p><strong>安装dart code插件后VScode居然无法识别flutter命令</strong></p>
<p>相信有些同学会提示：没有匹配的命令<br>并且反复安装dart code这个插件还是检索不到这个命令，但是在命令提示符里输入：flutter doctor，居然是能正确运行的，坑爹呢这是<br>各种查不到资料。。。</p>
<p>就在我准备放弃使用vscode的命令行后，问题解决了。。。。请看下一步</p>
<h2 id="articleHeader4">5. 创建第一个flutter项目</h2>
<p>打开命令提示符，进入一个自己想新建flutter项目的文件夹下，输入：</p>
<blockquote>flutter create myflutter</blockquote>
<p>耐心让命令行滚动一会儿~<br>执行完毕后，会在文件夹下生成一个myflutter文件，这个时候用vscode打开这个文件夹，再回到菜单中的查看-&gt;命令面板，输入：doctor</p>
<p>呵呵，命令搜索到了，居然还有这种操作！<br>也就是说vscode必须在打开flutter项目的情况下，才能识别dart指令，关闭项目文件夹后，又无法识别指令了。至于怎么回事，我还没搞清楚，找到原因和处理办法了再分享给大家吧，如果有高手知道怎么搞，请评论中告诉我~感激不尽</p>
<p>对flutter感兴趣的小伙伴可以关注我，也欢迎大家到我在简书中创建的<a href="https://www.jianshu.com/c/ebc9d2e84214" rel="nofollow noreferrer" target="_blank">Flutter圈子</a>中投稿，也可以联系管理员加入我们的flutter微信群嗨聊。<br><strong>flutter 中文社区（官方QQ群：338252156）</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter笔记1 VScode安装dart code插件踩坑记录

## 原文链接
[https://segmentfault.com/a/1190000013652806](https://segmentfault.com/a/1190000013652806)

