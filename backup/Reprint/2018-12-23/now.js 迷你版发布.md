---
title: 'now.js 迷你版发布' 
date: 2018-12-23 2:30:07
hidden: true
slug: au8n1qba9m
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">迷你版</h2>
<p>迷你版即0.3.0版。<br><br>0.2.0版没加新功能，只增加eadme内容和修正package.json上的一些错误。<br><br>0.3.0同样没加新功能，但是却是非常重要的。<br><br>这个版本国际化默认只支持英文和中文。初始化是英文。如果想支持全部118种语言，需要引入<a href="https://github.com/hongmaoxiao/now/tree/master/dist/nowjs.locale.js" rel="nofollow noreferrer" target="_blank">nowjs.locale.js</a>或者压缩版<a href="https://github.com/hongmaoxiao/now/tree/master/dist/nowjs.min.locale.js" rel="nofollow noreferrer" target="_blank">nowjs.locale.min.js</a>。<br></p>
<h2 id="articleHeader1">版本大小比较</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="~/learn/ljs/now master
❯ ll -h dist | grep js$
-rw-rw-r-- 1 mao mao  66K 12月  5 00:37 nowjs.js
-rw-rw-r-- 1 mao mao 355K 12月  5 00:37 nowjs.locale.js
-rw-rw-r-- 1 mao mao 212K 12月  5 00:37 nowjs.locale.min.js
-rw-rw-r-- 1 mao mao  32K 12月  5 00:37 nowjs.min.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>~/learn/ljs/now master
❯ ll -h dist | grep js$
-<span class="ruby">rw-rw-r-- <span class="hljs-number">1</span> mao mao  <span class="hljs-number">66</span>K <span class="hljs-number">12</span>月  <span class="hljs-number">5</span> <span class="hljs-number">00</span><span class="hljs-symbol">:</span><span class="hljs-number">37</span> nowjs.js
</span>-<span class="ruby">rw-rw-r-- <span class="hljs-number">1</span> mao mao <span class="hljs-number">355</span>K <span class="hljs-number">12</span>月  <span class="hljs-number">5</span> <span class="hljs-number">00</span><span class="hljs-symbol">:</span><span class="hljs-number">37</span> nowjs.locale.js
</span>-<span class="ruby">rw-rw-r-- <span class="hljs-number">1</span> mao mao <span class="hljs-number">212</span>K <span class="hljs-number">12</span>月  <span class="hljs-number">5</span> <span class="hljs-number">00</span><span class="hljs-symbol">:</span><span class="hljs-number">37</span> nowjs.locale.min.js
</span>-<span class="ruby">rw-rw-r-- <span class="hljs-number">1</span> mao mao  <span class="hljs-number">32</span>K <span class="hljs-number">12</span>月  <span class="hljs-number">5</span> <span class="hljs-number">00</span><span class="hljs-symbol">:</span><span class="hljs-number">37</span> nowjs.min.js</span></code></pre>
<p>可以看出，<code>nowjs.js</code>比<code>nowjs.locale.js</code>小289kb，降低81.4%。<code>nowjs.min.js</code>比<code>nowjs.locale.min.js</code>减小180kb，降低84.9%。相当可观。完全可以放心在生产环境中使用而不担心加载速度问题。</p>
<h2 id="articleHeader2">结语</h2>
<p>准备把min版加到cdn中。<br><br>还有很多可以优化的地方:</p>
<ol>
<li>调整<code>format</code>的写法。</li>
<li>降低代码冗余。</li>
<li>优化文件组织方式。</li>
<li>增加一些新的功能等等。</li>
</ol>
<p>有人给我点赞我很开心，现在已经有5个赞了（哈哈哈，我无耻的自己点了一个）。<br><br><strong>最后还是放个链接<a href="https://github.com/hongmaoxiao/now" rel="nofollow noreferrer" target="_blank">github地址</a>，<a href="https://www.npmjs.com/package/now.js" rel="nofollow noreferrer" target="_blank">npm地址</a>。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
now.js 迷你版发布

## 原文链接
[https://segmentfault.com/a/1190000012283117](https://segmentfault.com/a/1190000012283117)

