---
title: '腾讯 AlloyTeam 移动 Web 裁剪组件 AlloyCrop 正式开源' 
date: 2019-01-31 2:31:16
hidden: true
slug: 7g5ppxl97et
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">传送门</h2>
<p>Github地址：<a href="https://github.com/AlloyTeam/AlloyFinger/tree/master/alloy_crop" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyFinger/tree/master/alloy_crop</a></p>
<p>在线Demo演示:<br><span class="img-wrap"><img data-src="http://images2015.cnblogs.com/blog/105416/201611/105416-20161117111050545-396487242.png" src="https://static.alili.techhttp://images2015.cnblogs.com/blog/105416/201611/105416-20161117111050545-396487242.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">简介</h2>
<p>裁剪图片的应用场景有头像编辑、图像编辑，在移动端要配合手势以及进行触摸反馈来进行变形以确认用户的选区进行裁剪。AlloyCrop就是专注于裁剪图像的组件，目前服务于QQ相关的Web业务，今日正式对外开源。</p>
<h2 id="articleHeader2">项目截图</h2>
<p><span class="img-wrap"><img data-src="http://images2015.cnblogs.com/blog/105416/201611/105416-20161117111104279-1013796781.png" src="https://static.alili.techhttp://images2015.cnblogs.com/blog/105416/201611/105416-20161117111104279-1013796781.png" alt="" title="" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="http://images2015.cnblogs.com/blog/105416/201611/105416-20161117111127857-178909467.png" src="https://static.alili.techhttp://images2015.cnblogs.com/blog/105416/201611/105416-20161117111127857-178909467.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="http://images2015.cnblogs.com/blog/105416/201611/105416-20161117111133623-58070903.png" src="https://static.alili.techhttp://images2015.cnblogs.com/blog/105416/201611/105416-20161117111133623-58070903.png" alt="" title="" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="http://images2015.cnblogs.com/blog/105416/201611/105416-20161117111137904-2054286801.png" src="https://static.alili.techhttp://images2015.cnblogs.com/blog/105416/201611/105416-20161117111137904-2054286801.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里需要注意的是，圆形裁剪出的图片其实是正方形的，这里可以通过CSS3圆角边框自行设置为圆形的图片。</p>
<h2 id="articleHeader3">使用姿势</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new AlloyCrop({
        image_src: &quot;img src&quot;,
        circle:true, // optional parameters , the default value is false
        width: 200,
        height: 200,
        ok: function (base64, canvas) { },
        cancel: function () { },
        ok_text: &quot;确认&quot;, // optional parameters , the default value is ok
        cancel_text: &quot;取消&quot; // optional parameters , the default value is cancel
 });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">new</span> AlloyCrop({
        <span class="hljs-attr">image_src</span>: <span class="hljs-string">"img src"</span>,
        <span class="hljs-attr">circle</span>:<span class="hljs-literal">true</span>, <span class="hljs-comment">// optional parameters , the default value is false</span>
        width: <span class="hljs-number">200</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">ok</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">base64, canvas</span>) </span>{ },
        <span class="hljs-attr">cancel</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ },
        <span class="hljs-attr">ok_text</span>: <span class="hljs-string">"确认"</span>, <span class="hljs-comment">// optional parameters , the default value is ok</span>
        cancel_text: <span class="hljs-string">"取消"</span> <span class="hljs-comment">// optional parameters , the default value is cancel</span>
 });</code></pre>
<ul>
<li><p>image_src为需要裁剪的图片的地址</p></li>
<li><p>circle为裁剪组件的样式，为可选参数，默认值是false。需要注意：当设置为true时候,width必须等于height。</p></li>
<li><p>width为裁剪区域的宽</p></li>
<li><p>height为裁剪区域的高</p></li>
<li><p>ok为点击确认按钮的回调函数，并且可以拿到裁剪完成的base64和裁剪所用的canvas</p></li>
<li><p>cancel为点击取消按钮的回调函数</p></li>
<li><p>ok_text为确认按钮的文本，可选。默认是 ok</p></li>
<li><p>cancel_text为取消按钮的文本，可选。默认是 cancel</p></li>
</ul>
<h2 id="articleHeader4">Q&amp;A</h2>
<p>Q: 对比了下微信的头像裁剪，为什么基于Web的AlloyCrop比微信Native还要流畅？为什么？为什么？<br>A: 基于<a href="https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs" rel="nofollow noreferrer" target="_blank">transformjs</a>和<a href="https://github.com/AlloyTeam/AlloyFinger" rel="nofollow noreferrer" target="_blank">AlloyFinger</a>打造的AlloyCrop必须流畅啊！<br>这里猜测下（因为看不到微信裁剪的源码），微信头像裁剪走的是软绘，<a href="https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs" rel="nofollow noreferrer" target="_blank">transformjs</a>走的是硬绘。</p>
<p>Q: 兼容性如何<br>A: 支持touchstart、touchmove、touchend、touchcancel以及CSS3 transform的设备的浏览器便可运行AlloyCrop....不一一列举..</p>
<p>Q: <a href="https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs" rel="nofollow noreferrer" target="_blank">transformjs</a>+<a href="https://github.com/AlloyTeam/AlloyFinger" rel="nofollow noreferrer" target="_blank">AlloyFinger</a>+ AlloyCrop 一共不到600行？为什么体积这么小？<br>A: 腾讯手Q内大量的web都会去不断地从各个维度进行性能优化。框架类库尺寸的大小就是其中很重要的一个维度，小文件明显加载更快，解析也更快，这是很直接的优化手段。100行代码能解决的问题绝对不会用1000行代码去解决。所以Hammerjs被我们抛弃了，各种CSS3的js库也被我们放弃。使用更加精简的、抽象层次更高的 <a href="https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs" rel="nofollow noreferrer" target="_blank">transformjs</a>和<a href="https://github.com/AlloyTeam/AlloyFinger" rel="nofollow noreferrer" target="_blank">AlloyFinger</a>。具体为何如此小，可以看看源码。</p>
<p>Q: 腾讯内部有哪些项目在用?<br>A: 目前AlloyCrop主要是兴趣部落、QQ群等Web业务在用，刚刚开源出来，只要有裁剪图片的地方都会用到。AlloyFinger和transformjs拥有大量的项目在使用，包括公司外部的内部的以及国内的和国外的用户。</p>
<h2 id="articleHeader5">你值得拥有</h2>
<p>Github地址：<a href="https://github.com/AlloyTeam/AlloyFinger/tree/master/alloy_crop" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyFinger/tree/master/alloy_crop</a></p>
<p>欢迎使用！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
腾讯 AlloyTeam 移动 Web 裁剪组件 AlloyCrop 正式开源

## 原文链接
[https://segmentfault.com/a/1190000007510197](https://segmentfault.com/a/1190000007510197)

