---
title: 'vue-cli 添加less 以及sass' 
date: 2019-01-26 2:30:18
hidden: true
slug: 3gqbtcgfb6k
categories: [reprint]
---

{{< raw >}}

                    
<p>vue-cli中已经内置配置好了sass 以及lass的配置。<br>如果需要的话直接下载两个模块就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install node-sass --save-dev
npm install sass-loader --save-dev

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm install <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> --save-dev
npm install sass-loader --save-dev

</code></pre>
<p>如果是淘宝镜像直接运行<strong>cnpm</strong>是一样的效果</p>
<p>然后在组件或者视图中给样式加上语言就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;sass&quot; scoped>
    .....
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
    .....
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这里需要说明一下<strong>scoped</strong>是让样式只在当前组件或者视图中起作用的。</p>
<p><strong>less</strong>的话也是一样 需要装两个<strong>loader</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install less --save-dev
npm install less-loader --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span> <span class="hljs-comment">--save-dev</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span>-loader <span class="hljs-comment">--save-dev</span>
</code></pre>
<p>其余的都是一样的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli 添加less 以及sass

## 原文链接
[https://segmentfault.com/a/1190000008486436](https://segmentfault.com/a/1190000008486436)

