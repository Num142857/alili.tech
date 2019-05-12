---
title: 'ReactNative 到 Weex 的艰难一迈' 
date: 2018-12-30 2:30:10
hidden: true
slug: kd85m35zaql
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>“Write once，Run Everywhere”  一次编写，多端运行。<code>React</code>迁移到<code>MIT</code>协议，可惜<code>React Native</code>依然没改，没有<code>RN</code>的日子，还好有<code>Weex</code>这位哥们顶着。虽然没有RN那么牛逼，但也算是一个不错的小兄弟。</p></blockquote>
<p>很多人可能要问我搞了这么久的RN现在转Weex干什么？说起来，真是一个悲伤的故事</p>
<h2 id="articleHeader0">为什么不用<code>RN</code>
</h2>
<p><code>Facebook</code>并没有像<code>React</code>那样把<code>ReactNative</code>也迁移到<code>MIT</code>协议，所以使用<code>ReactNative</code>开发对外产品，依然有专利风险。一般的公司其实没什么影响，但我厂情况比较特殊，有好几个核心的专利技术，老板不想冒这个险。加之隔壁的阿里<code>Weex</code>推得很火，那就用用看吧！</p>
<blockquote><p><code>React</code>专利许可证具体细节欢迎出门左转看我之前的文章：<a href="http://jafeney.com/2017/09/21/2017-09-21-react/" rel="nofollow noreferrer" target="_blank">《React专利许可证研究》</a></p></blockquote>
<h2 id="articleHeader1">
<code>Weex</code>较<code>RN</code>的优势</h2>
<p>说老实话，和<code>ReactNative</code>打交道这么久，突然换一个小兄弟上，一时还真的难以适应，甚至一脸嫌弃。<code>Weex</code>和<code>ReactNative</code>的设计理念也完全不同。<code>RN</code>重点在<code>Native</code>，以<code>React</code>的方式开发跨平台<code>App</code>，它注重<code>Native</code>细腻的用户体验和强大的原生功能，运用 <code>ReactNative</code> 甚至不需要<code>Native</code>工程师就能独立开发一款功能完善的<code>App</code>。</p>
<h3 id="articleHeader2">
<code>Web</code>开发体验</h3>
<p>独立开发<code>App</code>对<code>Weex</code>来说比较困难，因为它的<code>Native</code>能力没有<code>RN</code>那般强大而全面。它更注重 <code>Web开发体验</code>，顾名思义就是像开发<code>Web</code>网页一样开发跨平台<code>App</code>页面，注意了是以<code>Web</code>为主导，所以它的设计理念提倡 <strong>轻量</strong> + <strong>可拓展</strong>（至于“高性能”较<code>RN</code>并没什么太大的体现），官方也推荐用<code>Weex</code>和<code>Native</code>混合的方式开发<code>App</code>，也就是把<code>Weex</code>作为一个组件融入到<code>Native App</code>，替换传统的 <code>Hybrid</code> 模式。</p>
<h3 id="articleHeader3">没有专利限制</h3>
<p><code>Weex</code>已经加入<code>ASF</code>，没有<code>ReactNative</code> 的专利协议限制，可以放心大胆地使用。当然有童鞋会反问 <code>Weex</code>目前还在使用 <code>FaceBook</code> 的 <code>Yoga</code>引擎，会不会有隐患？这个短期内不需要我们操心，首先这个问题本身边缘就很模糊，其次 像阿里这样的大厂迟早会开发一套类似的引擎来替代，时间问题。</p>
<h3 id="articleHeader4">三端共用代码</h3>
<p><code>Weex</code>既保留了<code>H5</code>的灵活性，也赋予了其<code>Native</code>能力，通过<code>JavaSriptCore</code>+<code>JSbridge</code>直接和<code>Native</code>进行通信，较之 <code>Hybrid</code>的<code>WebView</code> + <code>URLScheme</code>方式性能好了很多。甚至可以实现传说中的 “三端融合”——也就是 <code>Web</code>、<code>iOS</code>、<code>Android</code>端的前端部分共用一套代码，省去了独立建站和维护的麻烦。</p>
<p>当然有得必有失，三端兼容的坑也不少，<code>Android</code>各机型 <code>hack</code> 就不提了，Web端其实就是个<code>WebApp</code>，要利用浏览器的<code>BOM</code>与三方的<code>JS-SDK</code> 来完成 <code>DOM</code>和<code>HTTP</code>以外的功能。不过使用<code>Weex</code>内建的标签和样式可以很容易实现三端布局样式和基本行为的一致，还是大大地减少了工作量。</p>
<blockquote><p>值得一提 Weex的布局单位有且只有<code>px</code>，默认的显示宽度 (<code>viewport</code>) 是 <code>750px</code>，组件都会以 <code>750px</code> 作为满屏宽度，但可以通过 <code>meta.setViewport()</code> 手动指定页面的显示宽度</p></blockquote>
<table>
<thead><tr>
<th align="center">Type</th>
<th align="center">iPhone4</th>
<th align="center">iPhoneSE</th>
<th align="center">iPhone8</th>
<th align="center">iPhone8P</th>
<th align="center">iPhoneX</th>
</tr></thead>
<tbody>
<tr>
<td align="center">物理像素</td>
<td align="center">640x960</td>
<td align="center">640x1136</td>
<td align="center">750x1334</td>
<td align="center">1080x1920</td>
<td align="center">1125x2436</td>
</tr>
<tr>
<td align="center">显示像素</td>
<td align="center">750x1125</td>
<td align="center">750x1331</td>
<td align="center">750x1334</td>
<td align="center">750x1333</td>
<td align="center">750x1624</td>
</tr>
<tr>
<td align="center">像素比</td>
<td align="center">@0.85x</td>
<td align="center">@0.85x</td>
<td align="center">@1x</td>
<td align="center">@1.44x</td>
<td align="center">@1.5x</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader5">对<code>CSS3</code>的支持</h3>
<p>Weex虽然也对<code>CSS</code>做了一定的阉割，但比较 <code>ReactNative</code>，它保留得更多，甚至支持大量的<code>CSS3</code>特性，这一点值得赞叹。<code>CSS3</code>作为Web开发的利器，放着不用难免可惜。下面列举Weex 和标准<code>Web</code>的样式差异：</p>
<ul>
<li>支持的<code>CSS3</code>特性包括：FlexBox、2D转换、过渡、线性渐变、阴影（仅<code>Web</code>和<code>iOS</code>）、伪类、自定义字体（<code>iconFront</code>图标也能用哦）</li>
<li>中支持单个 <strong>类名选择器</strong>，不支持 <strong>关系型选择器</strong>，也不支持 <strong>属性选择器</strong>
</li>
<li>支持组件级别的作用域，为了保持<code>Web</code>和<code>Native</code>的一致，需要 <code>&lt;style scoped&gt;</code> 声明作用域</li>
<li>不支持<code>CSS3</code>动画（动画请使用Weex内建<code>animation</code>模块）和3D转换</li>
<li>不支持 <code>display: none</code> ，用模板语法 <code>v-if</code> 替代，不建议用 <code>opacity: 0</code>（<code>Native</code>里有点透问题）</li>
<li>类似<code>RN</code>，为了提高解析效率，Weex样式属性不支持简写，比如 <code>font</code>、<code>border</code>、<code>transfrom</code>不能简写</li>
</ul>
<h2 id="articleHeader6">Weex不足之处</h2>
<p>本节的最后，还是想吐槽几个<code>Weex</code>的不足之处，希望官方能尽快升级和改进：</p>
<h3 id="articleHeader7">社区建设缓慢</h3>
<p>这应该是最要命的，<code>Weex</code>社区从去年开源到今天还是这般冷清不免令人神伤，虽然我知道阿里内部推广力度很大，但是既然选择开源，就应该跳出阿里的圈子，一些成功案例、成熟解决方案、优秀架构设计等就不应该藏着掖着，不然真的很难推广起来。我不希望遇到坑点 Google 几圈都找不到有价值的方案，GitHub上提问半天都等不到一个满意的答案（哈哈，说得有点激动啊，很感谢 mario 上次回答我的提问，希望能尽快反应到官方文档里）</p>
<h3 id="articleHeader8">Native能力提高</h3>
<p>如果不提高Native能力，<code>Weex</code>的 <strong>全页模式</strong> 价值其实不大。不要求面面俱到，但希望能再添加一些常用的，比如：<code>statusBar</code>控制、位置信息、<code>Android</code>动态权限分配等</p>
<h3 id="articleHeader9">真机调试工具升级</h3>
<p><code>Weex</code>提倡<code>Web</code>开发体验，所以开发和调试都以<code>Web</code>为主，做静态页面还好，但我要调试<code>Native</code>端的特有逻辑，就需要在Native端集成<code>weex-devtool</code>。这个方案的确另辟蹊径，不过每次改完代码需要手动刷新会不会太麻烦，能不能搞个类似RN的 <strong>热替换</strong> 或 <code>LiveReload</code>功能呢？</p>
<h3 id="articleHeader10">Mac端文件权限问题</h3>
<p>在Mac端Shell工具进入<code>Weex</code>的目录，无论<code>npm</code>相关命令，还是<code>git</code>操作都需要<code>sudo</code>权限，好麻烦。我很懒的，<code>Weex</code>在创建文件的时候能不能帮我把写权限的事也做了？</p>
<hr>
<p>哈哈，是不是我太蠢没能领悟到技巧，不对的地方欢迎留言指正哈。不过前端工程师都是挑剔的，希望<code>Weex</code>能不断改进和完善！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ReactNative 到 Weex 的艰难一迈

## 原文链接
[https://segmentfault.com/a/1190000011418946](https://segmentfault.com/a/1190000011418946)

