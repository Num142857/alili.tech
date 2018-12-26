---
title: '让我为你介绍一个神器：Chimee，一套可扩展的 H5 视频播放器解决方案' 
date: 2018-12-26 2:30:14
hidden: true
slug: cmbhqqwtrv
categories: [reprint]
---

{{< raw >}}

                    
<p>Chimee（读“奇米”, <strong>[tʃɪ'mɪ:]</strong>）是由奇舞团开源的一套 <strong>H5 视频播放器解决方案</strong>，由奇舞团视频云前端团队结合在业务和视频编解码方向的沉淀积累倾心打造。</p>
<p><span class="img-wrap"><img data-src="/img/bVX8GW?w=640&amp;h=364" src="https://static.alili.tech/img/bVX8GW?w=640&amp;h=364" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>Chimee 支持 MP4、M3U8、FLV 等多种媒体格式，同时它也帮我们解决了大部分的兼容性、差异化问题，包括全屏、自动播放、内联播放、直播解码等常见媒体播放需求。</p>
<p>通过便捷的可热插拔的插件开发，能满足业务方快速迭代、灰度发布等要求；让开发者能够更轻松快捷地完成不同业务场景下 UI、广告等各种功能需求的开发。</p>
<p><span class="img-wrap"><img data-src="/img/bVX8G4?w=640&amp;h=248" src="https://static.alili.tech/img/bVX8G4?w=640&amp;h=248" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>（去 <a href="http://chimee.org/" rel="nofollow noreferrer" target="_blank">Chimee</a> 官网试用一下）</p>
<p>Chimee 帮我们解决了日常 H5-Video 应用开发中常见的几大问题：</p>
<ol>
<li>各浏览器环境 UI 不统一的问题</li>
<li>不同环境中 API 的差异化</li>
<li>不同厂商事件行为的实现不尽相同，部分行为不完整等</li>
<li>媒体格式兼容问题：各浏览器对媒体格式编解码支持程度不同，以往常用的部分格式在原生环境中是不支持的</li>
<li>UI 扩展之间及状态处理容易产生冲突</li>
<li>日志收集易耦合：太多日志收集上报需要我们在业务节点植入打点逻辑的方式，增加熟悉成本和维护难度，Chimee 1. 解耦的插件功能机制，让事情条理更清晰、功能更纯粹</li>
<li>重复别人踩过的坑：如果你曾经从 0 开始开发你的 H5 播放器，一定会有深刻的体会，各种莫名其妙的问题接踵而至，让我们不得不放下正在做的事情，消耗掉大量的时间和精力去查证、解决，使用一套完备的解决方案，必然能让我们少走很多弯路。</li>
</ol>
<p>另外，针对有不同层次深度定制化需求的用户，Chimee 的横向和纵向分层设计，能更灵活的满足相应需求：</p>
<p><span class="img-wrap"><img data-src="/img/bVX8HR?w=640&amp;h=311" src="https://static.alili.tech/img/bVX8HR?w=640&amp;h=311" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>例如，针对在引入播放器时，并不希望全量打包，UI 插件或解码器有特定使用需求的用户，适当调整相应依赖，重新构建打包即可拿到更适合自己业务场景的 Chimee；针对具备UI定制化需求的用户，只需要参考 pluginAPI 或现有的插件实现方式，适当修改调整或进行简单的开发，即可快速达成相应定制需求；针对更深层的，已经具备H5-Video播放器但需要扩展解码能力的用户，只需要去了解 kernal 层中相应解码器的应用即可。</p>
<p>Chimee 是一套着眼于未来的H5视频播放器框架，它能让我们的开发人员不必分心研究视频编解码、繁杂的环境差异，让我们可以更专注于业务，保证产品的快速迭代、灰度发布，进而保证业务在快节奏的互联网浪潮中保持更好的势头。</p>
<p>目前Adobe也早已宣布将于2020年停止开发更新Flash，Chimee提供有向下兼容的判断依据，但是Chimee也倡议大家一起来推动用户更早的脱离Flash播放器插件的依赖，希望Chimee的到来能让我们一起推动WEB环境更早的迈进下一步，更好的助力于行业的发展、发挥出更大的潜在价值。</p>
<p>想要对 chimee 有深入了解的小伙伴，请点<a href="http://chimee.org/" rel="nofollow noreferrer" target="_blank">这里</a>哦，chimee 等着你的 star 呦（请喂我星星✨）！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让我为你介绍一个神器：Chimee，一套可扩展的 H5 视频播放器解决方案

## 原文链接
[https://segmentfault.com/a/1190000011910830](https://segmentfault.com/a/1190000011910830)

