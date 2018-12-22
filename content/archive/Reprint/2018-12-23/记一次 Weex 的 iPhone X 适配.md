---
title: '记一次 Weex 的 iPhone X 适配' 
date: 2018-12-23 2:30:07
hidden: true
slug: dctgwwrsbqt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>iPhone X 上市也一月有余了，「齐刘海」的设计给全世界的 IOS 和 M 站开发人员出了一道兼容题目，默认效果问题虽不严重，但是足以逼疯强迫症患者。幸得项目「空窗期」，实践下 iPhone X 的适配。还记得之前的一篇文章吗？<a href="https://github.com/zwwill/blog/issues/3" rel="nofollow noreferrer" target="_blank">《【Weex】网易严选 App 感受 Weex 开发》</a>，此处将以此 demo 为基础做展开 Weex 适配。Native 和 H5 的适配此处就不再做赘述了。「专业 IOS 开发同学就当个笑话看看吧，反正你都会，此文是写给不会原生的朋友的」</p>
<h2 id="articleHeader1">默认的样子</h2>
<p>如果不仔细看，还以为是 iPhone 7 的效果，这也是官方「故意为之」的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012336141?w=936&amp;h=858" src="https://static.alili.tech/img/remote/1460000012336141?w=936&amp;h=858" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果你用惯了 iPhone X，无意识地打开了一个类似上图的 app，着实会有点难以接受。</p>
<h2 id="articleHeader2">全屏操作</h2>
<p>打开 iPhone X 的全屏模式其实很简单，只需要在 <strong>Xcode</strong> 里配置 iPhone X 的 <strong>LaunchImage</strong> 即可，也可以直接改配置文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012336142?w=960&amp;h=666" src="https://static.alili.tech/img/remote/1460000012336142?w=960&amp;h=666" alt="" title="" style="cursor: pointer;"></span></p>
<p>可能 Weex Toolkit 构建出来的 Platform 内不含这两个配置图片，不过没关系，右击选择「Show in Finder」，更改 「Contents.json」 配置文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;images&quot; : [
        {
            &quot;extent&quot; : &quot;full-screen&quot;,
            &quot;idiom&quot; : &quot;iphone&quot;,
            &quot;subtype&quot; : &quot;2436h&quot;,
            &quot;filename&quot; : &quot;Default2@3x-1.png&quot;,
            &quot;minimum-system-version&quot; : &quot;11.0&quot;,
            &quot;orientation&quot; : &quot;portrait&quot;,
            &quot;scale&quot; : &quot;3x&quot;
        },
        {
            &quot;extent&quot; : &quot;full-screen&quot;,
            &quot;idiom&quot; : &quot;iphone&quot;,
            &quot;subtype&quot; : &quot;2436h&quot;,
            &quot;filename&quot; : &quot;Default2@3x.png&quot;,
            &quot;minimum-system-version&quot; : &quot;11.0&quot;,
            &quot;orientation&quot; : &quot;landscape&quot;,
            &quot;scale&quot; : &quot;3x&quot;
        },
        {
            // other conf
        }
    ],
    &quot;info&quot; : {
        &quot;version&quot; : 1,
        &quot;author&quot; : &quot;xcode&quot;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    <span class="hljs-string">"images"</span> : [
        {
            <span class="hljs-string">"extent"</span> : <span class="hljs-string">"full-screen"</span>,
            <span class="hljs-string">"idiom"</span> : <span class="hljs-string">"iphone"</span>,
            <span class="hljs-string">"subtype"</span> : <span class="hljs-string">"2436h"</span>,
            <span class="hljs-string">"filename"</span> : <span class="hljs-string">"Default2@3x-1.png"</span>,
            <span class="hljs-string">"minimum-system-version"</span> : <span class="hljs-string">"11.0"</span>,
            <span class="hljs-string">"orientation"</span> : <span class="hljs-string">"portrait"</span>,
            <span class="hljs-string">"scale"</span> : <span class="hljs-string">"3x"</span>
        },
        {
            <span class="hljs-string">"extent"</span> : <span class="hljs-string">"full-screen"</span>,
            <span class="hljs-string">"idiom"</span> : <span class="hljs-string">"iphone"</span>,
            <span class="hljs-string">"subtype"</span> : <span class="hljs-string">"2436h"</span>,
            <span class="hljs-string">"filename"</span> : <span class="hljs-string">"Default2@3x.png"</span>,
            <span class="hljs-string">"minimum-system-version"</span> : <span class="hljs-string">"11.0"</span>,
            <span class="hljs-string">"orientation"</span> : <span class="hljs-string">"landscape"</span>,
            <span class="hljs-string">"scale"</span> : <span class="hljs-string">"3x"</span>
        },
        {
            // other conf
        }
    ],
    <span class="hljs-string">"info"</span> : {
        <span class="hljs-string">"version"</span> : <span class="hljs-number">1</span>,
        <span class="hljs-string">"author"</span> : <span class="hljs-string">"xcode"</span>
    }
}
</code></pre>
<p>再添加两张 <code>1125×2436</code> 的图片，记得名字需要和 <code>filename</code> 匹配，然后重新构建，你就会发现，他全屏啦！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012336143?w=936&amp;h=858" src="https://static.alili.tech/img/remote/1460000012336143?w=936&amp;h=858" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">同 native 适配有何不同</h2>
<p>Weex 针对 iPhone X 的兼容直接发生在前端开发层面。</p>
<p>「不会搞 Native 是前提」,有了这个前提，我们就只能自己动手了。</p>
<p>动手的原则就是，「合理利用每寸空间，将内容展示在安全区内」。</p>
<h2 id="articleHeader4">什么是安全区</h2>
<p><strong>安全区</strong>是苹果用来描述 iPhone X 的合理显示区域。</p>
<blockquote><p>手机纵向持握状态下，安全区是从屏幕最顶端往下 44 pt 开始计算的，要注意的是，它并不是和「齐刘海」完全齐平的，而是要再往下一点。「下巴」位置上，从下往上推 34 pt 以上的部分开始才被视为安全区。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012336144?w=3360&amp;h=1890" src="https://static.alili.tech/img/remote/1460000012336144?w=3360&amp;h=1890" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>至于横向就不好描述了，直接上图吧。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012336145?w=3360&amp;h=1890" src="https://static.alili.tech/img/remote/1460000012336145?w=3360&amp;h=1890" alt="" title="" style="cursor: pointer;"></span></p>
<p>更多关于 iPhone X UI 适配的概念可以看看<a href="https://www.zhihu.com/question/65286874/answer/230195437" rel="nofollow noreferrer" target="_blank">这篇文章</a></p>
<h2 id="articleHeader5">方向</h2>
<p>原则上，我们是将内容显示在安全区内，但一定是在「自然过度」的前提下。</p>
<p>此 demo 没有横屏模式，所有，唯一需要适配的就是，竖屏模式下安全区外的界面遮挡处理。</p>
<p>也就是上下两个部分内收处理。空出来的部分用同色色块填充。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012336146?w=936&amp;h=858" src="https://static.alili.tech/img/remote/1460000012336146?w=936&amp;h=858" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">识别 iPhone X</h2>
<p>既要适配 iPhone X 又不能影响其他系统，那就需要做「特殊识别处理」。</p>
<p>怎么识别 iPhone X？</p>
<p>幸运的是，Weex 官方有 API 提供平台消息，<code>weex.config</code>，</p>
<blockquote>
<p>weex.config</p>
<p>该变量包含了当前 Weex 页面的所有环境信息，包括不仅限于：</p>
<p>bundleUrl: JS bundle 的 URL，和页面的 URL 一致。</p>
<p>env: Object: 环境对象。</p>
<ul>
<li>weexVersion: string: Weex sdk 版本。</li>
<li>appName: string: 应用名字。</li>
<li>appVersion: string: 应用版本。</li>
<li>platform: string: 平台信息，是 iOS、Android 还是 Web。</li>
<li>osName: string: iOS或者android，表示操作系统的名称.</li>
<li>osVersion: string: 系统版本。</li>
<li>
<strong><em>deviceModel: string: 设备型号 (仅原生应用)</em></strong> 。</li>
<li>deviceWidth: number: 设备宽度。Weex 默认以宽度为 750px 做适配渲染，要获得750px下的屏幕高度，可以通过height = 750/deviceWidth*deviceHeight 公式获得，可以使用到 CSS 中，用来设置全屏尺寸</li>
<li>deviceHeight: number: 设备高度。</li>
</ul>
</blockquote>
<p>iPhone X 环境下，<code>weex.config.env.deviceModel</code> 将返回 iPhone X 的特有标识 <code>'iPhone10,3 or iPhone10,6'</code>，「注意 Xcode 虚拟机拿到的未必是正确的标识」</p>
<p>iPhone 5 - X 的标示</p>
<table>
<thead><tr>
<th align="center">iPhone</th>
<th align="center">models</th>
</tr></thead>
<tbody>
<tr>
<td align="center">5</td>
<td align="center">iPhone5,1 和 iPhone5,2</td>
</tr>
<tr>
<td align="center">5c</td>
<td align="center">iPhone5,3 和 iPhone5,4</td>
</tr>
<tr>
<td align="center">5s</td>
<td align="center">iPhone6,1 和 iPhone6,2</td>
</tr>
<tr>
<td align="center">6</td>
<td align="center">iPhone7,2</td>
</tr>
<tr>
<td align="center">6 Plus</td>
<td align="center">iPhone7,1</td>
</tr>
<tr>
<td align="center">6s</td>
<td align="center">iPhone8,1</td>
</tr>
<tr>
<td align="center">6s Plus</td>
<td align="center">iPhone8,2</td>
</tr>
<tr>
<td align="center">SE</td>
<td align="center">iPhone8,4</td>
</tr>
<tr>
<td align="center">7</td>
<td align="center">iPhone9,1 和 iPhone9,3</td>
</tr>
<tr>
<td align="center">7 Plus</td>
<td align="center">iPhone9,2 和 iPhone9,4</td>
</tr>
<tr>
<td align="center">8</td>
<td align="center">iPhone10,1 和 iPhone10,4</td>
</tr>
<tr>
<td align="center">8 Plus</td>
<td align="center">iPhone10,2 和 iPhone10,5</td>
</tr>
<tr>
<td align="center">ipX</td>
<td align="center"><strong>iPhone10,3 和 iPhone10,6</strong></td>
</tr>
</tbody>
</table>
<p>更多关于 iPhone 的信息可<a href="https://www.theiphonewiki.com/wiki/List_of_iPhones#iPhone_X" rel="nofollow noreferrer" target="_blank">参考这里</a></p>
<p>或者根据 <code>操作系统 &amp; 像素比 &amp; 屏幕尺寸</code> 组合判断是否是「刘海屏」。</p>
<h2 id="articleHeader7">留白</h2>
<p>在识别到 iPhone X 的标识后，做相应的留白即可，就这么简单，复杂度由你的项目决定，一般情况下，Weex 构建的项目还是很好适配的。</p>
<h3 id="articleHeader8">计算属性和 class 绑定</h3>
<p>最基本的做法就是使用计算属性得到是否为 iPhone X 标记，在配合 class 绑定的「数组语法」可以轻松实现适配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div :class=&quot;['wrapper', isipx?'w-ipx':'']&quot;>
    </div>
</template>
<script>
    export default {
        data () {},
        computed:{
            isipx:function () {
                return weex &amp;&amp; (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
            }
        },
    }
</script>
<style scoped>
    .wrapper{
        /* 正常样式 */
    }
    .w-ipx{
        /* iPhone X 样式 */
    }

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"['wrapper', isipx?'w-ipx':'']"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {},
        <span class="hljs-attr">computed</span>:{
            <span class="hljs-attr">isipx</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> weex &amp;&amp; (weex.config.env.deviceModel === <span class="hljs-string">'iPhone10,3'</span> || weex.config.env.deviceModel === <span class="hljs-string">'iPhone10,6'</span>);
            }
        },
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.wrapper</span>{
        <span class="hljs-comment">/* 正常样式 */</span>
    }
    <span class="hljs-selector-class">.w-ipx</span>{
        <span class="hljs-comment">/* iPhone X 样式 */</span>
    }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>此处需要注意，在初始化时计算属性的作用域内未必每次都能拿到 weex 实例，所以必须做好容错。</p>
<h3 id="articleHeader9">mixin 配合 router</h3>
<p>如果是使用了 <code>vue-router</code> 可以使用 mixin 函数混入，非常方便。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div :class=&quot;['wrapper', isIpxFuc()?'w-ipx':'']&quot;>
    </div>
</template>
<script>
    export default {
        data () {}
    }
</script>
<style scoped>
    .wrapper{
        /* 正常样式 */
    }
    .w-ipx{
        /* iPhone X 样式 */
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"['wrapper', isIpxFuc()?'w-ipx':'']"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {}
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.wrapper</span>{
        <span class="hljs-comment">/* 正常样式 */</span>
    }
    <span class="hljs-selector-class">.w-ipx</span>{
        <span class="hljs-comment">/* iPhone X 样式 */</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h2 id="articleHeader10">总结</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012336147?w=936&amp;h=858" src="https://static.alili.tech/img/remote/1460000012336147?w=936&amp;h=858" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>从最终效果图上看，还可以，至少满足了我的需求。只不过实现起来有些麻烦，Weex 是单页的结构，每个页面都需要单独做适配，如果从 Native 上做处理，就需要有一定的 Native 开发技能，加之良好的架构和协议设计。但是，Native 的处理远没有 UI 处理来的灵活。</p>
<p>总的来讲，Native 层和 UI 层的方法各有利弊，具体实施还需结合项目。</p>
<p>「没有最好的锤子，只有最适合钉子的锤子?」</p>
<blockquote><p>转载请标明出处<br>作者： <a href="https://github.com/zwwill" rel="nofollow noreferrer" target="_blank">木羽 zwwill</a><br>首发地址：<a href="https://github.com/zwwill/blog/issues/15" rel="nofollow noreferrer" target="_blank">https://github.com/zwwill/blog/issues/15</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记一次 Weex 的 iPhone X 适配

## 原文链接
[https://segmentfault.com/a/1190000012336135](https://segmentfault.com/a/1190000012336135)

