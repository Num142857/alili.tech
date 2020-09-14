---
title: '基于Vue2.0实现音乐播放器。' 
date: 2019-01-19 2:30:09
hidden: true
slug: 125vtbcpp02p
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>Vue升级到2.0，使用Vue2.0做了个音乐播放器，</strong></p>
<p><strong>距离上个版本已经过去好久了，工作一直没时间更新，最近发现api有更新，抽出时间更新一下。</strong></p>
<p><strong>以往功能页面全部重写，有时间会逐步更新，功能逐渐完善，新的UI图后续上传更新.</strong></p>
<p>欢迎大家参与讨论，希望对大家学习Vue.js有帮助，可以借鉴参考参考。</p>
<p>项目地址：<a href="https://github.com/yuzhenyou/CloudMusic" rel="nofollow noreferrer" target="_blank">yuzhenyou/CloudMusic</a></p>
<p><a href="https://github.com/yuzhenyou/CloudMusic" rel="nofollow noreferrer" target="_blank">https://github.com/yuzhenyou/...</a></p>
<p>如果对你学习有帮助的话，可以顺便Star一下哈。</p>
<blockquote>技术使用到了Vue2.0版本<br>由Vue-cli搭建  <br>Vue-router<br>vuex  <br>axios  <br>muse-ui,element-ui<br>后端用的node.js进行api转发，默认端口：3000</blockquote>
<p>api: <a href="https://github.com/Binaryify/NeteaseCloudMusicApi" rel="nofollow noreferrer" target="_blank">NeteaseCloudMusicApi</a></p>
<p><strong>功能实现</strong></p>
<blockquote>登录<br>用户收藏<br>歌单<br>个人中心<br>用户评论<br>播放列表<br>播放队列   <br>上一首，下一首  <br>歌词同步  <br>...</blockquote>
<h3 id="articleHeader0">运行项目</h3>
<p><strong>安装依赖</strong><br>npm install<br>npm run dev    <br>默认端口：8090</p>
<p><strong>启动服务</strong><br>请自行修改三项api</p>
<blockquote>config/index.js <br>src/main.js <br>src/store/index.js</blockquote>
<p>服务更新请自行到上面api链接clone。<br>node.app.js</p>
<p>效果<br><span class="img-wrap"><img data-src="/img/bV1Ixe?w=414&amp;h=736" src="https://static.alili.tech/img/bV1Ixe?w=414&amp;h=736" alt="songs1.png" title="songs1.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1Iv4?w=413&amp;h=734" src="https://static.alili.tech/img/bV1Iv4?w=413&amp;h=734" alt="songs2.png" title="songs2.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV1Iwo?w=413&amp;h=737" src="https://static.alili.tech/img/bV1Iwo?w=413&amp;h=737" alt="songs3.png" title="songs3.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1Iwq?w=413&amp;h=736" src="https://static.alili.tech/img/bV1Iwq?w=413&amp;h=736" alt="songs4.png" title="songs4.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1Iwy?w=415&amp;h=737" src="https://static.alili.tech/img/bV1Iwy?w=415&amp;h=737" alt="songs5.png" title="songs5.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1Iw8?w=414&amp;h=736" src="https://static.alili.tech/img/bV1Iw8?w=414&amp;h=736" alt="songs6.png" title="songs6.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1Iw9?w=414&amp;h=736" src="https://static.alili.tech/img/bV1Iw9?w=414&amp;h=736" alt="songs7.png" title="songs7.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue2.0实现音乐播放器。

## 原文链接
[https://segmentfault.com/a/1190000008653564](https://segmentfault.com/a/1190000008653564)

