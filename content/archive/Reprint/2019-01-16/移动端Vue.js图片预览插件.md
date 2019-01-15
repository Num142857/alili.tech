---
title: '移动端Vue.js图片预览插件' 
date: 2019-01-16 2:30:08
hidden: true
slug: oqbeqtn53cf
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-picture-preview</h1>
<p>移动端Vue.js图片预览插件 | Mobile-friendly picture file preview Vue.js plugin with horizontal nav and bottom title.</p>
<p><a href="https://github.com/xLogic92/vue-picture-preview" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014347192" src="https://static.alili.tech/img/remote/1460000014347192" alt="Github" title="Github" style="cursor: pointer; display: inline;"></span></a> <a href="https://github.com/xLogic92/vue-picture-preview" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014347193" src="https://static.alili.tech/img/remote/1460000014347193" alt="Github" title="Github" style="cursor: pointer; display: inline;"></span></a> <a href="https://github.com/xLogic92/vue-picture-preview" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014347194" src="https://static.alili.tech/img/remote/1460000014347194" alt="Github" title="Github" style="cursor: pointer; display: inline;"></span></a></p>
<p><a href="https://www.npmjs.org/package/vue-picture-preview" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014347195" src="https://static.alili.tech/img/remote/1460000014347195" alt="License" title="License" style="cursor: pointer; display: inline;"></span></a> <a href="https://www.npmjs.org/package/vue-picture-preview" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014347196" src="https://static.alili.tech/img/remote/1460000014347196" alt="vue-picture-preview" title="vue-picture-preview" style="cursor: pointer; display: inline;"></span></a> <a href="https://npmjs.org/package/vue-picture-preview" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014347197" src="https://static.alili.tech/img/remote/1460000014347197" alt="NPM downloads" title="NPM downloads" style="cursor: pointer; display: inline;"></span></a> <a href="https://npmjs.org/package/vue-picture-preview" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000014347198" src="https://static.alili.tech/img/remote/1460000014347198" alt="NPM downloads" title="NPM downloads" style="cursor: pointer; display: inline;"></span></a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014347199" src="https://static.alili.tech/img/remote/1460000014347199" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">安装</h2>
<h3 id="articleHeader2">NPM</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save vue-picture-preview" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="sh" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save vue-picture-preview</span></code></pre>
<h2 id="articleHeader3">使用</h2>
<p>首先在项目的入口文件中引入, 调用 Vue.use 安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> vuePicturePreview <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-picture-preview'</span>
Vue.use(vuePicturePreview)</code></pre>
<p>在根组件添加 lg-preview 组件的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Vue root compoment template -->
<div id=&quot;app&quot;>
    <router-view></router-view>
    <lg-preview></lg-preview>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-comment">&lt;!-- Vue root compoment template --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">lg-preview</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">lg-preview</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>对于所有图片都可以使用 v-preview 指令来绑定他们的预览功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img v-for=&quot;(img,index) in imgs&quot; 
     v-preview=&quot;img.url&quot; 
     :src=&quot;img.url&quot; 
     :alt=&quot;img.title&quot; 
     :key=&quot;index&quot;
     preview-title-enable=&quot;true&quot;
     preview-nav-enable=&quot;true&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(img,index) in imgs"</span> 
     <span class="hljs-attr">v-preview</span>=<span class="hljs-string">"img.url"</span> 
     <span class="hljs-attr">:src</span>=<span class="hljs-string">"img.url"</span> 
     <span class="hljs-attr">:alt</span>=<span class="hljs-string">"img.title"</span> 
     <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>
     <span class="hljs-attr">preview-title-enable</span>=<span class="hljs-string">"true"</span>
     <span class="hljs-attr">preview-nav-enable</span>=<span class="hljs-string">"true"</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data () {
        return {
            imgs: [
                {
                  url: 'http://covteam.u.qiniudn.com/ka2.jpg',
                  title: 'pic1'
                },
                {
                  url: 'http://covteam.u.qiniudn.com/poster.png',
                  title: 'pic2'
                }
            ]
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">imgs</span>: [
                {
                  <span class="hljs-attr">url</span>: <span class="hljs-string">'http://covteam.u.qiniudn.com/ka2.jpg'</span>,
                  <span class="hljs-attr">title</span>: <span class="hljs-string">'pic1'</span>
                },
                {
                  <span class="hljs-attr">url</span>: <span class="hljs-string">'http://covteam.u.qiniudn.com/poster.png'</span>,
                  <span class="hljs-attr">title</span>: <span class="hljs-string">'pic2'</span>
                }
            ]
        }
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
img {
   width: 100%;
   height: 100%;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">style</span> <span class="hljs-selector-tag">scoped</span>&gt;
<span class="hljs-selector-tag">img</span> {
   <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
   <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
&lt;/<span class="hljs-selector-tag">style</span>&gt;</code></pre>
<h2 id="articleHeader4">API</h2>
<ul>
<li>
<strong>isTitleEnable</strong>: (boolean, optional) 设置 <em>preview-title-enable="false"</em> 将禁用底部标题. 默认值: true.</li>
<li>
<strong>isHorizontalNavEnable</strong>: (boolean, optional) 设置 <em>preview-nav-enable="false"</em> 将禁用水平导航. 默认值: true.</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端Vue.js图片预览插件

## 原文链接
[https://segmentfault.com/a/1190000009060116](https://segmentfault.com/a/1190000009060116)

