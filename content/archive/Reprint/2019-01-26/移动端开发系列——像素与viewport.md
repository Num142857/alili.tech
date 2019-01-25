---
title: '移动端开发系列——像素与viewport' 
date: 2019-01-26 2:30:18
hidden: true
slug: rpo1kj36q29
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">目录</h3>
<ul>
<li><p>移动端开发的基本观点</p></li>
<li><p>像素基础知识</p></li>
<li><p>viewport原理解析</p></li>
<li><p>弹性布局</p></li>
<li><p>响应式设计</p></li>
<li><p>1rem的运用</p></li>
<li><p>移动端的事件</p></li>
<li><p>zepto库的使用</p></li>
</ul>
<hr>
<h5>移动端开发的基本观点</h5>
<ol><li><p>移动端开发的意义<br>移动端用户使用量 -&gt; 市场需求 -&gt; 市场供给 -&gt; 公司需要移动端开发人才 -&gt; 工资高，就业易 -&gt; 涌现大波程序猿 -&gt; 到了猴年马月，工资才会降下来 -&gt; 新的技术涌现，VR/AI -&gt; 市场需求攀升 -&gt; 重走一波老路......</p></li></ol>
<p>扯远了，以上大致就是学习移动端开发的动机；</p>
<ol><li><p>移动端开发的认识<br>移动端开发就是手机端开发吗？</p></li></ol>
<p>No、No、No...<br>移动端是一个大的范畴，小羊认为应该包括智能手机、平板在内的移动设备，主要是这两者；</p>
<ol><li><p>移动端开发入门的学习路径<br>目录就是</p></li></ol>
<hr>
<h5>像素基础知识</h5>
<p>先抛3个概念，<br><code>px(CSS pixels)</code>：虚拟像素，可以理解为“直觉”像素，我要这个元素宽高10px；<br><code>dp(device pixels)</code>：设备像素（物理像素），可以理解为实际的像素，这个宽高为10px的元素在设备中实际用了多少个物理像素点表示；<br><code>dpr(device pixels ratio)</code>：设备像素比，公式为<code>1px = (dpr)^2 * 1dp</code>，可以理解为1px由多少个设备像素组成；</p>
<p>3个概念整合理解就是：<br>我为一个元素设置的宽高为10px，那么实际在显示设备中用多少个设备像素真实表示呢？<br><code>dpr=2</code>的话，那么1px由4个设备像素显示，如果是10px，那么显示设备实际用40个dp去显示10px；<br><code>dpr=1</code>，则1px由1个设备像素显示；<br>px和dp的区别就是直觉认为只有10px和真实使用40dp；</p>
<blockquote><p><strong>为什么会出现dpr&gt;=2的情形？dpr=1不是更加符合我的认知和理解吗？</strong></p></blockquote>
<p>还不是人们为了追求更高的分辨率所致，分辨率越高图像越清晰！！！；</p>
<p>但是Mac的Retina屏和一般PC的在相同尺寸下，图像却清晰许多，为肾？</p>
<p><code>dpr&gt;=2</code>所致啊！！！</p>
<p>别的品牌机子老老实实1px = 1dp，Mac却是1px = 4 dp，所以你直觉认为大家都使用同样多的像素点表示图像（这是没错滴），实际背后Mac用了多1倍（指的是dpr）的设备像素显示图像；</p>
<blockquote><p><strong>实际应用中，显示设备不会直接给你个px和dpr</strong></p></blockquote>
<p>你实际看到的是以下的参数，下面是肾6Plus的显示屏参数信息：<br><span class="img-wrap"><img data-src="/img/remote/1460000008473042" src="https://static.alili.tech/img/remote/1460000008473042" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>再抛几个概念，可别晕咯...</p>
<p>英寸：这里指的是屏幕主对角线的尺寸，1英寸=2.54cm，5.5英寸约等于14cm（13.97cm）</p>
<p>分辨率：1920*1080像素，这里指的是物理像素（设备像素）</p>
<p>ppi（pixels per inch）：每英寸的像素点，这里肾6Plus为每英寸有401个像素点</p>
<p>那么ppi是如何计算出来的呢？<br>顾名思义，每英寸的像素点（设备像素），已知屏幕分辨率和主对角线的尺寸，则ppi等于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var 斜边尺寸 = V(1920^2+1080^2) V代表开根号
var ppi = 斜边尺寸/5.5
ppi = 401ppi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var 斜边尺寸 = V(<span class="hljs-number">1920</span>^<span class="hljs-number">2</span>+<span class="hljs-number">1080</span>^<span class="hljs-number">2</span>) V代表开根号
var ppi = 斜边尺寸/<span class="hljs-number">5.5</span>
ppi = <span class="hljs-number">401</span>ppi</code></pre>
<p>现在我们知道，ppi越高，每英寸像素点越多，图像越清晰；</p>
<blockquote><p><strong>和先前的知识点有什么关系？</strong></p></blockquote>
<p>毕竟这些参数是外国人先发明的，他们会优先选择自己熟悉的计量单位作为显示设备的工厂标准参数，因此ppi就用作显示设备的工业标准；</p>
<p>告诉业界人士，ppi达到多少是高清屏，此时对应的dpr是多少，而不直接告诉你我现在的显示设备dpr是多少</p>
<blockquote><p><strong>毕竟人们直接听到像素分辨率会更加有反应</strong></p></blockquote>
<p>下面是不同ppi对应的dpi：</p>
<table>
<thead><tr>
<th>ldpi</th>
<th>mdpi</th>
<th>hdpi</th>
<th>xhdpi</th>
</tr></thead>
<tbody>
<tr>
<td>ppi</td>
<td>120</td>
<td>160</td>
<td>240</td>
<td>320</td>
</tr>
<tr>
<td>默认缩放比</td>
<td>0.75</td>
<td>1.0</td>
<td>1.5</td>
<td>2.0</td>
</tr>
</tbody>
</table>
<p>【注】Retina屏都是dpr&gt;=2的高清屏</p>
<p>肾6Plus的dpr为3，是超高清屏；</p>
<p>到目前为止，我们了解到：<br>给你一个显示设备，设备分辨率为1920*1080，尺寸为5.5英寸，可以计算出其ppi = 401，根据ppi得知其dpr = 3，<br>由此可以该设备1px = （3^2）dp，其虚拟像素为1920/3 = 660px，1080/3 = 360px，即虚拟分辨率为360*660；<br>此时，如果你在代码设置元素的宽高为360*660到的话，会发现它的实际尺寸就等于肾6Plus的屏幕尺寸；<br><a href="http://js.jirengu.com/rotig/5edit" rel="nofollow noreferrer" target="_blank">【ppi】</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473043" src="https://static.alili.tech/img/remote/1460000008473043" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<h5>viewport原理解析</h5>
<p>一个很有意思的现象是，当你把上面的代码在chrome下使用设备模拟方式，模拟肾6Plus的时候，神奇的事情发生了，该元素设置的宽高明明就是手机的宽高，按常理应该占据整个屏幕，实际却是：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473044" src="https://static.alili.tech/img/remote/1460000008473044" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p><strong>究竟是怎么一回事？，如何解决这一问题呢？</strong></p></blockquote>
<p>好吧，作为实用主义者的你们（不是我哟），先讲解决方案：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473045" src="https://static.alili.tech/img/remote/1460000008473045" alt="" title="" style="cursor: pointer;"></span></p>
<p>在meta标签有一个viewport的属性，可以为这个属性设置width；<br>肾6Plus默认的width是980px，所以元素宽是360px，实际显示的尺寸是360px*360/980=132.24px（不信可以自己测试一下哟）；</p>
<p>现在只要将viewport的width设置为360px，那么元素就可以占满全屏了；</p>
<blockquote><p><strong>现在就要引入另一个概念：viewport</strong></p></blockquote>
<p>viewport的原理在于：</p>
<ol>
<li><p>先将页面渲染在一个width为显示设备默认尺寸的viewport上，如肾6Plus为980px；</p></li>
<li><p>然后将viewport等比例缩放至整个手机屏幕上；</p></li>
</ol>
<p>例如上例中，元素宽高为360*600px，先将元素渲染在宽度为980px的viewport上，然后等比例缩放在整个手机屏幕上；</p>
<blockquote>
<p><strong>viewport就是连接手机屏幕和页面的中间层</strong></p>
<p><strong>为什么要多此一举呢？</strong></p>
</blockquote>
<p>想象一下，如果没有中间层，直接将一个页面宽度为980px的直接缩放至320px，那么里面的DOM节点将会进行重绘，很有可能导致排版错乱；<br>viewport的作用是将所有的DOM节点先绘在宽度为980px的viewport上，然后整个viewport统一缩放，这样就能保证排版的正确性；</p>
<p>关于viewport，涉及两个概念：</p>
<ul>
<li><p>layout viewport：布局viewport，可以理解为放置页面的幕布</p></li>
<li><p>visual vewport：视窗viewport，可以理解为屏幕的视窗<br>比如：</p></li>
</ul>
<p>肾6Plus的visual viewport的宽度为360px，layout viewport为980px；<br>360px是屏幕视窗的虚拟像素，980px是放置页面的像素；</p>
<blockquote><p><strong>回顾一下，前面元素出现的缩放现象：</strong></p></blockquote>
<p>根据肾6Plus的物理分辨率<code>1920*1080</code>以及5.5英寸的屏幕，计算出ppi = 401-&gt; dpr = 3 -&gt; 虚拟分辨率为<code>640*360px</code>；</p>
<p>画一个宽度为360px的元素，理应充满整个手机屏幕 ，但是由于viewport的作用 -&gt; 360px的元素画在980px的layout viewport上，然后等比例缩放在360px的visual viewport上-&gt; 最终你看到的就是，360px的元素无法填充整个屏幕；</p>
<p>先前的一个解决办法是，改变layout viewport，即<code>&lt;meta name="viewport" content="width=360"&gt;</code>，让整个layout viewport就是360px，那么元素将填充整个屏幕；</p>
<blockquote><p><strong>以上都是世界观，给人一些概念性的理解，无法实操，下面就是方法论</strong></p></blockquote>
<p>实际移动端开发，我们只需关注layout viewport，知道每个移动设备提供给我们多大尺寸的幕布，但是移动设备型号那么多，不可能一个个手动设置width呀！！！</p>
<ul><li><p><strong>动态设置layout viewport</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta  name=&quot;viewport&quot; content=&quot;width=device-width&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta  <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width"</span>&gt;</code></pre>
<p>上面的设置表示让layout viewport总是等于设备宽度，即visual viewport；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473046" src="https://static.alili.tech/img/remote/1460000008473046" alt="iPhone 6 Plus" title="iPhone 6 Plus" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008473047" src="https://static.alili.tech/img/remote/1460000008473047" alt="Galaxy S5" title="Galaxy S5" style="cursor: pointer; display: inline;"></span></p>
<p>【注】细心的童鞋可能会注意到，肾6Plus的虚拟分辨率为什么不是<code>640*360px</code>，具体解答可以参考<a href="https://www.zhihu.com/question/25361043" rel="nofollow noreferrer" target="_blank">知乎问答</a></p>
<ul><li><p><strong>获取visual viewport和layout viewport的api</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.innerWidth：表示窗口的宽度（包含滚动条），即visual vewport的宽度
document.body.clientWidth：表示body元素的宽度（不包括border），即layout viewport的宽度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>window.innerWidth：表示窗口的宽度（包含滚动条），即visual vewport的宽度
document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.clientWidth</span>：表示body元素的宽度（不包括<span class="hljs-attribute">border</span>），即layout viewport的宽度</code></pre>
<ul><li><p><strong>移动端其他初始化设置</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="intial-scale:页面首次显示时，可视区域的缩放级别，取值1.0则页面按实际尺寸显示，无任何缩放；
no-scalable：是否允许缩放" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">intial-scale:</span><span class="hljs-string">页面首次显示时，可视区域的缩放级别，取值1.0则页面按实际尺寸显示，无任何缩放；</span>
<span class="hljs-literal">no</span><span class="hljs-bullet">-scalable：是否允许缩放</span></code></pre>
<blockquote><p><strong>一个完整的viewport属性的设置为：</strong></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta  name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,no-scalable=no&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta  <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width,initial-scale=1,no-scalable=no"</span>&gt;</code></pre>
<p>上述完整的意思是，layout viewport等于设备的宽度，首次显示页面时不进行缩放也不允许用户缩放；</p>
<p><a href="http://js.jirengu.com/rotig/6/edit" rel="nofollow noreferrer" target="_blank">demo</a></p>
<h5>小结</h5>
<ul>
<li><p>一开始讲px/dp/dpr/ppi的意义在于铺垫背景知识</p></li>
<li><p>理解上述知识后，给你一个移动设备的物理分辨率，如iPhone6 Plus1920<em>1080以及尺寸5.5inches，可以计算出其ppi为401-&gt;dpr = 3，从而测算出手机的虚拟分辨率为640</em>360px；</p></li>
<li><p>原则上，你开发一个640*360px的元素就可以填充整个手机屏幕，但是由于viewport机制作用，效果未达预期</p></li>
<li><p>由此引出viewport概念，viewport可以分为visual viewport（视窗尺寸）和layout viewport（放置页面的“幕布“），iPhone6 Plus默认值为980px；</p></li>
<li><p>通过meta标签的viewport属性，可以动态设置layout viewport，实战中只需要设置：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta  name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,no-scalable=no&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;meta  <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width,initial-scale=1,no-scalable=no"</span>&gt;</code></pre>
<ul><li><p>你还可以通过<code>window.innerWidth和document.body.clientWidth（前提是不设置body的宽度）</code>分别获取visual viewport和layout viewport；</p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端开发系列——像素与viewport

## 原文链接
[https://segmentfault.com/a/1190000008473039](https://segmentfault.com/a/1190000008473039)

