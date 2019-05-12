---
title: '使用Ionic3框架开始第一个混合开发APP' 
date: 2019-01-04 2:30:11
hidden: true
slug: h7cszygcoqq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是混合开发？</h2>
<p>简单来说，就是在开发移动应用中同时使用<code>Native</code>和<code>Web</code>的开发方式。</p>
<h2 id="articleHeader1">什么是Ionic3框架？</h2>
<p>Ionic3框架是一个混合开发框架，其本身依赖于<a href="https://angular.io/" rel="nofollow noreferrer" target="_blank"><code>Angular</code></a>，<a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank"><code>Sass</code></a>，<a href="http://cordova.apache.org/" rel="nofollow noreferrer" target="_blank"><code>Cordova</code></a>。</p>
<h2 id="articleHeader2">使用Ionic3框架可以做什么？</h2>
<p>使用Ionic3可以使用前端相关技术快速开发多平台的移动APP。</p>
<h2 id="articleHeader3">Ionic3环境搭建</h2>
<ol>
<li>安装<code>Visual Studio 2011</code>以上版本。</li>
<li>安装<code>python 2.7</code>版本。</li>
<li>安装<code>node</code>。</li>
<li>使用<code>npm</code>全局安装<code>Cordova</code>和<code>Ionic</code>。命令行输入<code>npm install -g cordova ionic</code>
</li>
<li>安装<code>Android Studio</code>。</li>
<li>安装<code>Git</code>。（可选）</li>
</ol>
<blockquote><p>安装完了之后，命令行输入<code>ionic -h</code>如下图</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSL6a?w=772&amp;h=390" src="https://static.alili.tech/img/bVSL6a?w=772&amp;h=390" alt="ionic -h 示例" title="ionic -h 示例" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">初始化第一个应用</h2>
<blockquote><p>输入<code>ionic start -h</code>查看初始化命令详情，如下图。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSL6K?w=772&amp;h=522" src="https://static.alili.tech/img/bVSL6K?w=772&amp;h=522" alt="ionic satrt -h 示例" title="ionic satrt -h 示例" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<code>name</code>是项目名</li>
<li>
<code>template</code>是初始化的模板</li>
<li>
<code>--type</code>是项目类型，有<code>Ionic1</code>和<code>Ionic-angular</code>(也就是<code>Ionic2</code>和<code>Ionic3</code>)</li>
<li>
<code>--app-name</code>是App的名称，可以之后通过<code>config.xml</code>修改</li>
<li>
<code>--list</code>是打印出所有可用模板</li>
<li>
<code>--cordova</code>是集成<code>Cordova</code>
</li>
<li>
<code>--no-deps</code>是不安装<code>npm</code>依赖</li>
<li>
<code>--no-git</code>是不初始化<code>git</code>仓库</li>
<li>
<code>--no-link</code>是不链接到<code>Ionic</code>平台</li>
</ul>
<blockquote><p>好了，输入<code>ionic start HelloWorld blank --cordova --no-deps --no-git --no-link</code>来初始化一个项目。完成之后如下图。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSL9M?w=775&amp;h=339" src="https://static.alili.tech/img/bVSL9M?w=775&amp;h=339" alt="初始化示例" title="初始化示例" style="cursor: pointer; display: inline;"></span></p>
<p>这个时候工作目录下就生成了一个<code>HelloWorld</code>目录，进去。</p>
<blockquote><p>输入<code>npm install</code>安装依赖，安装完如图。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSMaL?w=772&amp;h=715" src="https://static.alili.tech/img/bVSMaL?w=772&amp;h=715" alt="安装依赖示例" title="安装依赖示例" style="cursor: pointer; display: inline;"></span></p>
<p>无视掉那几个警告</p>
<blockquote><p>输入<code>ionic serve</code>，第一次会出现下图，输入<code>Y</code>安装。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSMba?w=634&amp;h=142" src="https://static.alili.tech/img/bVSMba?w=634&amp;h=142" alt="serve命令示例" title="serve命令示例" style="cursor: pointer; display: inline;"></span></p>
<p>然后再次输入<code>ionic serve</code>，如图继续输入<code>Y</code>安装，安装完后用启动<code>serve</code>，如下图。</p>
<p><span class="img-wrap"><img data-src="/img/bVSMbC?w=845&amp;h=488" src="https://static.alili.tech/img/bVSMbC?w=845&amp;h=488" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>游览器会自动打开<code>localhost:8100</code>，如果没有就在游览器里面手动打开本网页，界面如下图。</p>
<p><span class="img-wrap"><img data-src="/img/bVSMbX?w=1364&amp;h=692" src="https://static.alili.tech/img/bVSMbX?w=1364&amp;h=692" alt="应用示例" title="应用示例" style="cursor: pointer;"></span></p>
<blockquote><p>按<code>F12</code>打开控制台，然后切换到移动显示，如下图。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSMcm?w=1366&amp;h=699" src="https://static.alili.tech/img/bVSMcm?w=1366&amp;h=699" alt="控制台示例" title="控制台示例" style="cursor: pointer; display: inline;"></span></p>
<p>这个样子大概就是我们应用界面的样子了。</p>
<blockquote><p>然后回到控制台，<code>Ctrl + C</code>结束调试服务器。然后输入<code>ionic cordova</code>，然后输入<code>Y</code>安装插件，如下图。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSMdc?w=754&amp;h=221" src="https://static.alili.tech/img/bVSMdc?w=754&amp;h=221" alt="cordova示例" title="cordova示例" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>输入<code>ionic cordova platform add android</code>，这是添加一个<code>Android</code>平台的命令。如果是<code>ios</code>就是将<code>Android</code>那里替换为<code>ios</code>，成功后如下图。<em>PS：ios需要安装<code>XCode</code>，也就是需要在<code>MAC OSX</code>系统上。</em></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSMeJ?w=844&amp;h=656" src="https://static.alili.tech/img/bVSMeJ?w=844&amp;h=656" alt="paltform示例" title="paltform示例" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>输入<code>ionic cordova build android --prod</code>生成一个<code>Debug</code>包，如下图。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSMfg?w=864&amp;h=727" src="https://static.alili.tech/img/bVSMfg?w=864&amp;h=727" alt="打包示例" title="打包示例" style="cursor: pointer; display: inline;"></span></p>
<p>这样就打包完毕了，去到<code>platfrom/android/outputs/apk/</code>目录下，<code>android-debug.apk</code>就是我们打包出来的APP。安装到手机上就可以使用或者调试了。<em>注意：这个包是<code>Debug</code>版本，并非正式包，正式包需要先生成签名</em></p>
<p>至此，你就开始了第一个<code>Ionic3</code>应用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Ionic3框架开始第一个混合开发APP

## 原文链接
[https://segmentfault.com/a/1190000010632905](https://segmentfault.com/a/1190000010632905)

