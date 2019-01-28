---
title: '一个vue2的多色图标方案：vue-svg-icon' 
date: 2019-01-29 2:30:10
hidden: true
slug: 2wnm4g7n41
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>示例:</strong> <a href="https://cenkai88.github.io/vue-svg-icon/demo/" rel="nofollow noreferrer" target="_blank">https://cenkai88.github.io/vu...</a>  </p>
<p><strong>项目地址: <a href="https://github.com/cenkai88/vue-svg-icon" rel="nofollow noreferrer" target="_blank">https://github.com/cenkai88/v...</a> </strong> 求star～～<br>个人的第一个vue组件，希望大家多多支持啦～?<br>基于vue-awesome扩展而来<br>其实想到写这个的原因主要是在开发中常常需要用到图标，这一块经历了四个阶段。</p>
<ol>
<li><p>用的awesomeFont之类的库</p></li>
<li><p>发现<a href="http://www.iconfont.cn/plus" rel="nofollow noreferrer" target="_blank">iconfont</a>之后，每用到一个图标就去搜一个加入到工程中，自定义程度更高，也减少图标引入。</p></li>
<li><p>从iconfont下了图标之后用illustrator编辑形状或者颜色之后达到更高的定制性。</p></li>
<li><p>在写这个组件之前，发现SVG图片其实就是XML格式的标签，其中<strong>fill</strong>属性六位颜色值的路径会根据值渲染颜色，而fill为空的可被HTML中该SVG节点css3的**color<br>**属性控制，这样的话我们可以为图标赋予两种状态。</p></li>
</ol>
<p><strong>组件特点:</strong></p>
<ul>
<li><p>可即时在illustrator中编辑svg图片</p></li>
<li><p>可通过css的color属性动态地调整svg中<strong>某一部分</strong>的颜色</p></li>
<li><p>可以通过上面所提到的两种状态方便地完成一些功能（如tabbar）</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVHlWj?w=720&amp;h=88" src="https://static.alili.tech/img/bVHlWj?w=720&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVHlWk?w=1242&amp;h=145" src="https://static.alili.tech/img/bVHlWk?w=1242&amp;h=145" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVHlWl?w=640&amp;h=132" src="https://static.alili.tech/img/bVHlWl?w=640&amp;h=132" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h5>1. 安装</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-svg-icon --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install vue-svg-icon --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h5>2. 将svg图片放入src/svg</h5>
<blockquote><p>这里安利一个svg图片库<a href="http://www.iconfont.cn/plus" rel="nofollow noreferrer" target="_blank">iconfont</a></p></blockquote>
<ul>
<li><p>src/svg路径暂时不可配置</p></li>
<li><p>src文件夹应和node_modules在同一个文件夹下</p></li>
</ul>
<h5>3. 在项目的main.js入口引入vue-svg-icon和需要使用的svg文件名（不需扩展名）</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Icon from 'vue-svg-icon/Icon.vue';Vue.component('icon', Icon);
Icon.inject('chameleon'); // SVG图片名字（无扩展名）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Icon <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-svg-icon/Icon.vue'</span>;Vue.component(<span class="hljs-string">'icon'</span>, Icon);
Icon.<span class="hljs-keyword">inject</span>(<span class="hljs-string">'chameleon'</span>); <span class="hljs-comment">// SVG图片名字（无扩展名）</span></code></pre>
<h5>4. 在网页中使用icon标签就可以啦！</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<icon name=&quot;chameleon&quot; scale=&quot;20&quot;></icon>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"chameleon"</span> <span class="hljs-attr">scale</span>=<span class="hljs-string">"20"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span></code></pre>
<h4>注意</h4>
<p>在illustrator中编辑svg图片时</p>
<ul><li><p>注意illustrator中所有的矩形线段等等需转成复合路径再保存。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVHlWn?w=804&amp;h=644" src="https://static.alili.tech/img/bVHlWn?w=804&amp;h=644" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul>
<li><p>编辑完保存时，请选择"另存为"，在"高级选项"中将"css属性"设置成<strong>演示文稿属性</strong>   <br><span class="img-wrap"><img data-src="/img/bVHlWm?w=934&amp;h=744" src="https://static.alili.tech/img/bVHlWm?w=934&amp;h=744" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p></li>
<li><p>需要通过css动态设置颜色等部分请将填充色设为纯黑(#000000)，如果想设置黑色但不受svg的color影响请将填充色设为(#000001)</p></li>
<li><p>推荐svg尺寸为<strong>200*200</strong></p></li>
</ul>
<p>如果你读到这了，那么这个插件八成适合你，请移步<a href="https://github.com/cenkai88/vue-svg-icon" rel="nofollow noreferrer" target="_blank">vue-svg-icon</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个vue2的多色图标方案：vue-svg-icon

## 原文链接
[https://segmentfault.com/a/1190000007910099](https://segmentfault.com/a/1190000007910099)

