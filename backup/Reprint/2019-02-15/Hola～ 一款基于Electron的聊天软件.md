---
title: 'Hola～ 一款基于Electron的聊天软件' 
date: 2019-02-15 2:30:44
hidden: true
slug: q2at4ffqrr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Hola</h1>
<h2 id="articleHeader1">前言</h2>
<p>本项目旨在<strong>从零到壹</strong>，制作一款界面精美的聊天软件。</p>
<blockquote>
<a href="https://github.com/percy507/hola" rel="nofollow noreferrer" target="_blank">Github 地址</a><p><strong>因为已工作，所以可能没有多少时间来继续跟进这个项目了，项目可优化的点已在下文列出，欢迎大家 Fork 或 Star。</strong></p>
<p>ps: 征 logo 一枚。因为本人是开发，设计功底欠缺，所以软件 logo 设计的有点丑，如果有大神有更好的 logo，欢迎 email。</p>
</blockquote>
<h2 id="articleHeader2">技术栈</h2>
<ul>
<li>
<p><strong>开发环境</strong></p>
<ul>
<li>操作系统：macOS High Sierra v10.13.1</li>
<li>编辑器：Visual Studio Code v1.19.1</li>
<li>npm：v5.3.0</li>
<li>Node：v8.4.0</li>
</ul>
</li>
<li>
<p><strong>客户端</strong></p>
<ul>
<li>UI设计：Sketch</li>
<li>软件框架：Electron</li>
<li>界面实现：Vue.js + Vuex + Vue-Router + Webpack</li>
<li>通信模块：<a href="https://github.com/socketio/socket.io-client" rel="nofollow noreferrer" target="_blank">socket.io-client</a>
</li>
<li>视频聊天：<a href="https://www.html5rocks.com/en/tutorials/webrtc/basics/" rel="nofollow noreferrer" target="_blank">原生 WebRTC</a>
</li>
</ul>
</li>
<li>
<p><strong>服务端</strong></p>
<ul>
<li>服务器：Node.js</li>
<li>后端框架：Koa2</li>
<li>通信模块：<a href="https://github.com/socketio/socket.io" rel="nofollow noreferrer" target="_blank">socket.io</a>
</li>
<li>数据库：Redis 和 MongoDB</li>
</ul>
</li>
</ul>
<h2 id="articleHeader3">软件效果图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016904950?w=3503&amp;h=3770" src="https://static.alili.tech/img/remote/1460000016904950?w=3503&amp;h=3770" alt="效果图" title="效果图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">实现功能</h2>
<ul>
<li>[x] 登录注册模块（&lt;手机号+验证码&gt;形式的登录注册）</li>
<li>
<p>[x] 聊天区模块</p>
<ul>
<li>[x] 最近联系人列表</li>
<li>[x] 历史消息（暂未做上拉加载）</li>
<li>
<p>[x] 私聊</p>
<ul>
<li>[x] 文本消息</li>
<li>[x] 图片消息</li>
<li>[x] 视频聊天</li>
</ul>
</li>
<li>
<p>[x] 群聊</p>
<ul>
<li>[x] 文本消息</li>
<li>[x] 图片消息</li>
</ul>
</li>
</ul>
</li>
<li>
<p>[x] 联系人模块</p>
<ul>
<li>[x] 联系人列表</li>
<li>[x] 好友资料展示</li>
<li>[x] 群组资料展示</li>
<li>[x] 删好友，退出或解散群组</li>
</ul>
</li>
<li>
<p>[x] 功能区模块</p>
<ul>
<li>[x] 添加好友/群组</li>
<li>[x] 创建群组</li>
</ul>
</li>
<li>
<p>[x] 设置区模块</p>
<ul>
<li>[x] 个人资料设置</li>
<li>
<p>[x] 软件设置</p>
<ul><li>
<p>[x] 国际化</p>
<ul>
<li>[x] 中文</li>
<li>[x] 英文</li>
</ul>
</li></ul>
</li>
</ul>
</li>
</ul>
<h2 id="articleHeader5">项目目录</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── LICENSE         
├── README.md
├── client          # 客户端代码
├── docs            # 各种文档（需求文档、UI文档、流程图、数据库设计等）
├── preview.png     # 软件预览图
└── server          # 服务端代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">.
├── LICENSE         
├── README.md
├── client          <span class="hljs-comment"># 客户端代码</span>
├── docs            <span class="hljs-comment"># 各种文档（需求文档、UI文档、流程图、数据库设计等）</span>
├── preview.png     <span class="hljs-comment"># 软件预览图</span>
└── server          <span class="hljs-comment"># 服务端代码</span></code></pre>
<h2 id="articleHeader6">反思 &amp; 展望</h2>
<p>该项目为我大学毕业设计的项目，因时间紧迫，只实现了基本的聊天、加删好友等功能，很多功能还未实现，所以软件还是有很多的瑕疵。为此，我特意思考了很长时间，将待改进的细节或新的功能总结如下：</p>
<ul>
<li>[ ] 历史消息做成上拉瀑布流加载的效果</li>
<li>[ ] 为消息注明消息时间、发送状态、已读未读等状态</li>
<li>[ ] 为最近联系人列表添加最后一条消息的展示</li>
<li>[ ] 为最近联系人添加未读消息个数的统计</li>
<li>[ ] 添加好友或加入群组时要进行确认</li>
<li>[ ] 为软件的新消息使用系统原生通知窗口通知</li>
<li>[ ] 为软件增加原生菜单</li>
<li>[ ] 升级输入框，从而可以向输入框直接插入剪切板中的图片</li>
<li>[ ] 自己搭建文件服务器，图片服务器（或者使用第三方比如七牛云、阿里云的相关服务）</li>
<li>[ ] 为 WebRTC 实现后备方案，搭建 Relay Server，以增强视频聊天的稳定性</li>
<li>[ ] 增加网络断开处理的相关逻辑</li>
<li>[ ] 了解数据加密相关知识，为消息作加密处理</li>
<li>[ ] 为软件做跨平台处理，兼容性方面有待加强</li>
<li>[ ] 实现软件自动更新</li>
<li>[ ] 接入智能机器人聊天</li>
<li>[ ] 实现本地存储历史消息（<a href="https://github.com/louischatriot/nedb" rel="nofollow noreferrer" target="_blank">nedb</a>）</li>
<li>[ ] 为软件加入聊天情况分析（比如每天发了多少条消息，与谁聊天最频繁等）</li>
</ul>
<h2 id="articleHeader7">扩展阅读</h2>
<ul>
<li><a href="http://jartto.wang/2018/01/03/first-exploration-electron/" rel="nofollow noreferrer" target="_blank">初探 Electron - 理论篇</a></li>
<li><a href="http://jartto.wang/2018/01/04/first-exploration-electron-2/" rel="nofollow noreferrer" target="_blank">初探 Electron - 升华篇</a></li>
<li><a href="https://segmentfault.com/a/1190000007665162">XCel 项目总结 - Electron 与 Vue 的性能优化</a></li>
<li><a href="https://segmentfault.com/a/1190000007616641" target="_blank">【译】Electron 自动更新的完整教程（Windows 和 OSX）</a></li>
<li><a href="https://www.html5rocks.com/en/tutorials/webrtc/basics/" rel="nofollow noreferrer" target="_blank">Getting Started with WebRTC</a></li>
<li><a href="http://www.52im.net/thread-970-1-1.html" rel="nofollow noreferrer" target="_blank">通俗易懂：一篇掌握即时通讯的消息传输安全原理</a></li>
<li><a href="http://www.52im.net/thread-219-1-1.html" rel="nofollow noreferrer" target="_blank">即时通讯安全篇（三）：常用加解密算法与通讯安全讲解</a></li>
<li><a href="https://cnodejs.org/topic/57f0fe5ace6d47326a822dc0" rel="nofollow noreferrer" target="_blank">socket.io断线后重连和消息离线存储如何实现</a></li>
<li><a href="https://www.npmjs.com/package/socket.io-stream" rel="nofollow noreferrer" target="_blank">Socket.IO stream</a></li>
<li><a href="http://www.cnblogs.com/1wen/p/6509253.html" rel="nofollow noreferrer" target="_blank">运用google-protobuf的IM消息应用开发（前端篇）</a></li>
<li><a href="https://stackoverflow.com/questions/14151018/can-one-hack-paste-image-support-into-a-textarea-in-firefox" rel="nofollow noreferrer" target="_blank">Can one hack “paste image” support into a textarea in Firefox?</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/NavigatorOnLine/Online_and_offline_events" rel="nofollow noreferrer" target="_blank">在线和离线事件</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Hola～ 一款基于Electron的聊天软件

## 原文链接
[https://segmentfault.com/a/1190000016904947](https://segmentfault.com/a/1190000016904947)

