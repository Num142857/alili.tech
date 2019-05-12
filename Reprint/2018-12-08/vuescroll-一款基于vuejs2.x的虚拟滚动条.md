---
title: 'vuescroll-一款基于vuejs2.x的虚拟滚动条' 
date: 2018-12-08 2:30:30
hidden: true
slug: b7y1prdz9p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p>Vuescroll 一个功能强大，有多种模式的基于Vue.js的滚动条插件，它的原理是创建 div 用于包裹要滚动的内容，操后操作容器的样式或者scrollTop或scrollLeft完成内容的滚动。</p>
<p>设计它的目的是用来美化和增强你的滚动条。</p>
<p>你可以通过更改配置来选择不同的模式:</p>
<ul>
<li>
<code>native</code> 模式: 类似于原生的滚动条，但是可以自定义滚动条样式，使用于 PC 端用户。</li>
<li>
<code>slide</code> 模式: 允许你用手指或鼠标滑动内容， 可以滑动超出边界范围，适用于移动端端用户。</li>
</ul>
<p>你也可以通过更改配置滚动条的样式，包括：</p>
<ul>
<li><code>透明度</code></li>
<li><code>高度/宽度</code></li>
<li><code>位置</code></li>
<li><code>背景色</code></li>
<li><code>是否保持显示</code></li>
</ul>
<blockquote>想了解更多请访问官方网站<a href="http://vuescrolljs.yvescoding.org/zh/" rel="nofollow noreferrer" target="_blank">指南页面</a><p>如果你不满足上述特性，想要扩展特性的话，请考虑<a href="#%E8%B4%A1%E7%8C%AE">贡献代码</a>。</p>
</blockquote>
<p>总的来说，Vuescroll 不仅仅只一个滚动条， 你可以用它制作一个轮播图、时间选择器、能够自动侦测内容发生变化的一个插件等等。下面是部分预览效果。</p>
<h2 id="articleHeader1">预览</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014961432?w=737&amp;h=451" src="https://static.alili.tech/img/remote/1460000014961432?w=737&amp;h=451" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000014961433?w=737&amp;h=370" src="https://static.alili.tech/img/remote/1460000014961433?w=737&amp;h=370" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000014961434?w=737&amp;h=441" src="https://static.alili.tech/img/remote/1460000014961434?w=737&amp;h=441" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">在线 Demo &amp; 文档</h2>
<ul>
<li>你可以浏览这个 repo 的根目录下的 Demo 文件夹。</li>
<li>详细的 Demo, 文档: 请访问 <a href="http://vuescrolljs.yvescoding.org/zh/demo/" rel="nofollow noreferrer" target="_blank">官方地址</a>.</li>
</ul>
<h2 id="articleHeader3">特点</h2>
<h3 id="articleHeader4">基本特点</h3>
<ul>
<li>支持<a href="http://vuescrolljs.yvescoding.org/zh/guide/configuration.html#bar" rel="nofollow noreferrer" target="_blank">自定义滚动条</a>，包括可以设置滚动条/轨道的<code>颜色</code>、<code>透明度</code>。可以设置滚动条<code>是否保持显示</code>。</li>
<li>支持平滑滚动，可以通过设置<a href="http://vuescrolljs.yvescoding.org/zh/guide/configuration.html#bar" rel="nofollow noreferrer" target="_blank">easing</a>来获得不同的滚动动画。</li>
<li>支持自动检测内容是否发生变化，可以查看这个<a href="http://vuescrolljs.yvescoding.org/zh/demo/#_3-%E6%A3%80%E6%B5%8B%E5%86%85%E5%AE%B9%E5%8F%91%E7%94%9F%E5%8F%98%E5%8A%A8" rel="nofollow noreferrer" target="_blank">demo</a>。</li>
</ul>
<h3 id="articleHeader5">只在 slide 模式下有效的特点</h3>
<ul>
<li>支持<a href="http://vuescrolljs.yvescoding.org/zh/guide/configuration.html#pullrefresh" rel="nofollow noreferrer" target="_blank">下拉刷新和上推加载</a>，具体可以查看这个<a href="http://vuescrolljs.yvescoding.org/zh/demo/#vuescroll-%E6%94%AF%E6%8C%81%E4%B8%8B%E6%9D%A5%E5%88%B7%E6%96%B0%E5%92%8C%E4%B8%8A%E6%8E%A8%E5%8A%A0%E8%BD%BD-%E5%9C%A8%E4%BD%A0%E6%83%B3%E5%B1%95%E7%A4%BA%E4%B8%80%E4%B8%AA%E5%88%97%E8%A1%A8%E7%9A%84%E6%95%B0%E6%8D%AE%E7%9A%84%E6%97%B6%E5%80%99%E5%BE%88%E6%9C%89%E7%94%A8%E3%80%82" rel="nofollow noreferrer" target="_blank">demo</a>和这个 SSR 版本的<a href="https://vuescroll-issue-list-demo-zdizhghthq.now.sh/" rel="nofollow noreferrer" target="_blank">demo</a>。</li>
<li>支持截断配置,每次滚动固定的距离。可以查看这个 <a href="http://vuescrolljs.yvescoding.org/zh/demo/#_2-%E6%97%B6%E9%97%B4%E9%80%89%E6%8B%A9%E5%99%A8" rel="nofollow noreferrer" target="_blank">demo</a>
</li>
<li>支持分页。可以查看这个 <a href="http://vuescrolljs.yvescoding.org/zh/demo/#_1-%E8%BD%AE%E6%92%AD%E5%9B%BE" rel="nofollow noreferrer" target="_blank">demo</a>
</li>
</ul>
<h3 id="articleHeader6">其他特点</h3>
<ul>
<li>支持 <a href="http://vuescrolljs.yvescoding.org/zh/guide/typescript.html" rel="nofollow noreferrer" target="_blank">typescript</a>
</li>
<li>支持 SSR, 可以查看这个 <a href="https://vuescroll-issue-list-demo-zdizhghthq.now.sh/" rel="nofollow noreferrer" target="_blank">demo</a>
</li>
</ul>
<h2 id="articleHeader7">快速开始</h2>
<h3 id="articleHeader8">引入</h3>
<p>在你的入口文件处：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';

Vue.use(vuescroll);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> vuescroll <span class="hljs-keyword">from</span> <span class="hljs-string">'vuescroll'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'vuescroll/dist/vuescroll.css'</span>;

Vue.use(vuescroll);</code></pre>
<h3 id="articleHeader9">为了去掉不会用到的部分，可以分开地引入 vuescroll</h3>
<h4>只引入 slide 模式的特性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import vuescroll from 'vuescroll/dist/vuescroll-slide';
import 'vuescroll/dist/vuescroll.css';

Vue.use(vuescroll);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> vuescroll <span class="hljs-keyword">from</span> <span class="hljs-string">'vuescroll/dist/vuescroll-slide'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'vuescroll/dist/vuescroll.css'</span>;

Vue.use(vuescroll);</code></pre>
<h4>只引入 native 模式的特性：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';

Vue.use(vuescroll);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> vuescroll <span class="hljs-keyword">from</span> <span class="hljs-string">'vuescroll/dist/vuescroll-native'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'vuescroll/dist/vuescroll.css'</span>;

Vue.use(vuescroll);</code></pre>
<h3 id="articleHeader10">用法</h3>
<p>把你需要滚动的内容用<code>vuescroll</code>包裹起来即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    <div class='your-container'>
        <!-- bind your configurations -->
        <vue-scroll :ops=&quot;ops&quot;>
            <div class='your-content'>
            </div>
        </vue-scroll>
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          ops: {
            // some configs....
          }
        }
      }
    }
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'your-container'</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- bind your configurations --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">vue-scroll</span> <span class="hljs-attr">:ops</span>=<span class="hljs-string">"ops"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'your-content'</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">vue-scroll</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      data() {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">ops</span>: {
            <span class="hljs-comment">// some configs....</span>
          }
        }
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader11">指南列表</h2>
<ul>
<li><a href="http://vuescrolljs.yvescoding.org/zh/demo/" rel="nofollow noreferrer" target="_blank">在线例子</a></li>
<li><a href="http://vuescrolljs.yvescoding.org/zh/guide/getting-started.html" rel="nofollow noreferrer" target="_blank">上手指南</a></li>
<li><a href="http://vuescrolljs.yvescoding.org/zh/guide/configuration.html" rel="nofollow noreferrer" target="_blank">配置项</a></li>
<li><a href="http://vuescrolljs.yvescoding.org/zh/guide/api.html" rel="nofollow noreferrer" target="_blank">API 参考</a></li>
<li><a href="http://vuescrolljs.yvescoding.org/zh/guide/event.html" rel="nofollow noreferrer" target="_blank">Event 参考</a></li>
<li><a href="http://vuescrolljs.yvescoding.org/zh/guide/slot.html" rel="nofollow noreferrer" target="_blank">Slot 参考</a></li>
</ul>
<h2 id="articleHeader12">最后</h2>
<p>附上<a href="https://github.com/YvesCoding/vuescroll" rel="nofollow noreferrer" target="_blank">项目的地址</a> 希望朋友们多多star 哈哈</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuescroll-一款基于vuejs2.x的虚拟滚动条

## 原文链接
[https://segmentfault.com/a/1190000014066448](https://segmentfault.com/a/1190000014066448)

