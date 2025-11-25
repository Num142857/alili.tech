---
title: '[vue插件]基于vue2.x的电商图片放大镜插件' 
date: 2018-12-17 2:30:06
hidden: true
slug: u0roj25jqc
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在撸一个电商网站，有一个需求是要像淘宝商品详情页那样，鼠标放在主图上，显示图片放大镜效果，找了一下貌似没有什么合适的vue插件，于是自己撸了一个，分享一下。小白第一次分享，各位大神莫见笑。</p>
<h1 id="articleHeader0">vue-piczoom</h1>
<blockquote>picture magnifier component for Vue.js 2.x<br>基于vue2.x的电商图片放大镜插件</blockquote>
<h3 id="articleHeader1">GIF 动画截图</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012917216" src="https://static.alili.tech/img/remote/1460000012917216" alt="zoom2.gif" title="zoom2.gif" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">Build Setup 使用步骤</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 install
npm install vue-piczoom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 安装 install</span>
npm install vue-piczoom --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 使用 use
--script
import PicZoom from 'vue-piczoom'
export default {
  name: 'App',
  components: {
    PicZoom
  }
}

--html
<pic-zoom url=&quot;static/imac2.jpg&quot; :scale=&quot;3&quot;></pic-zoom>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 使用 use</span>
--script
import PicZoom from <span class="hljs-string">'vue-piczoom'</span>
<span class="hljs-built_in">export</span> default {
  name: <span class="hljs-string">'App'</span>,
  components: {
    PicZoom
  }
}

--html
&lt;pic-zoom url=<span class="hljs-string">"static/imac2.jpg"</span> :scale=<span class="hljs-string">"3"</span>&gt;&lt;/pic-zoom&gt;</code></pre>
<h3 id="articleHeader3">Config 配置</h3>
<table>
<thead><tr>
<th>props</th>
<th>describe</th>
<th>default</th>
</tr></thead>
<tbody>
<tr>
<td>url</td>
<td>图片地址</td>
<td>string required</td>
</tr>
<tr>
<td>big-url</td>
<td>大图地址</td>
<td>string null</td>
</tr>
<tr>
<td>scale</td>
<td>图片放大倍数</td>
<td>number 2.5</td>
</tr>
<tr>
<td>scroll</td>
<td>放大时页面是否可滚动</td>
<td>boolean fasle</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader4">Suggest 注意事项</h3>
<p>组件默认是100%的高宽，所以建议将组件包含在一个有固定高宽的容器内。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;pic-box&quot;> <!--pic-box:width:500px;height:500px-->
     <pic-zoom url=&quot;static/imac2.jpg&quot; :scale=&quot;3&quot;></pic-zoom>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"pic-box"</span>&gt; <span class="xml"><span class="hljs-comment">&lt;!--pic-box:width:500px;height:500px--&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">pic-zoom</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"static/imac2.jpg"</span> <span class="hljs-attr">:scale</span>=<span class="hljs-string">"3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pic-zoom</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h3 id="articleHeader5">Demo 示例</h3>
<p><a href="https://826327700.github.io/vue-piczoom/dist/" rel="nofollow noreferrer" target="_blank">在线示例</a></p>
<h3 id="articleHeader6">Github</h3>
<p><a href="https://github.com/826327700/vue-piczoom" rel="nofollow noreferrer" target="_blank">Github</a></p>
<h3 id="articleHeader7">update 更新记录</h3>
<blockquote>
<h4>1.0.4版本:(2018-01-22)</h4>
<p>1.更换算法，解决父级元素为position:relative时定位错误；  <br>2.优化边缘检测，解决放大选区移动至边缘时，放大移动失效；  <br>3.优化移动算法，移动选区更流畅；</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[vue插件]基于vue2.x的电商图片放大镜插件

## 原文链接
[https://segmentfault.com/a/1190000012917213](https://segmentfault.com/a/1190000012917213)

