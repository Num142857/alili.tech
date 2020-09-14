---
title: 'vue-social-sharing社交分享组件' 
date: 2019-01-09 2:30:11
hidden: true
slug: 60el14nefbj
categories: [reprint]
---

{{< raw >}}

                    
<p>这是最近看到的一个vue的社交分享组件。<a href="http://www.wheelsfactory.cn/#/detail?id=78" rel="nofollow noreferrer" target="_blank">vue-social-sharing</a>支持facebook，Google +，LinkedIn，Pinterest，Reddit，Twitter，VKontakte，Weibo，Whatsapp平台的分享功能。使用也十分简单。<br>这里是<a href="https://nicolasbeauvais.github.io/vue-social-sharing/" rel="nofollow noreferrer" target="_blank">Demo</a></p>
<h2 id="articleHeader0">安装</h2>
<p>通过NPM安装<br><code>npm install --save vue-social-sharing</code><br>通过Yarn安装<br><code>yarn add vue-social-sharing</code><br>通过Bower安装<br><code>bower install vue-social-sharing</code></p>
<h2 id="articleHeader1">插件应用</h2>
<p>Browserify / Webpack加载组件库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var SocialSharing = require('vue-social-sharing');

Vue.use(SocialSharing);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> SocialSharing = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue-social-sharing'</span>);

Vue.<span class="hljs-keyword">use</span>(SocialSharing);
</code></pre>
<p>html加载组件库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/dist/vue-social-sharing.min.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/dist/vue-social-sharing.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>使用组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<social-sharing url=&quot;https://vuejs.org/&quot; inline-template>
  <div>
      <network network=&quot;facebook&quot;>
        <i class=&quot;fa fa-facebook&quot;></i> Facebook
      </network>
      <network network=&quot;googleplus&quot;>
        <i class=&quot;fa fa-google-plus&quot;></i> Google +
      </network>
      <network network=&quot;linkedin&quot;>
        <i class=&quot;fa fa-linkedin&quot;></i> LinkedIn
      </network>
      <network network=&quot;pinterest&quot;>
        <i class=&quot;fa fa-pinterest&quot;></i> Pinterest
      </network>
      <network network=&quot;reddit&quot;>
        <i class=&quot;fa fa-reddit&quot;></i> Reddit
      </network>
      <network network=&quot;twitter&quot;>
        <i class=&quot;fa fa-twitter&quot;></i> Twitter
      </network>
      <network network=&quot;vk&quot;>
        <i class=&quot;fa fa-vk&quot;></i> VKontakte
      </network>
      <network network=&quot;weibo&quot;>
        <i class=&quot;fa fa-weibo&quot;></i> Weibo
      </network> 
      <network network=&quot;whatsapp&quot;>
        <i class=&quot;fa fa-whatsapp&quot;></i> Whatsapp
      </network>
  </div>
</social-sharing>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">social-sharing</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"https://vuejs.org/"</span> <span class="hljs-attr">inline-template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"facebook"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-facebook"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> Facebook
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"googleplus"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-google-plus"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> Google +
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"linkedin"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-linkedin"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> LinkedIn
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"pinterest"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-pinterest"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> Pinterest
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"reddit"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-reddit"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> Reddit
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"twitter"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-twitter"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> Twitter
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"vk"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-vk"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> VKontakte
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"weibo"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-weibo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> Weibo
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span> 
      <span class="hljs-tag">&lt;<span class="hljs-name">network</span> <span class="hljs-attr">network</span>=<span class="hljs-string">"whatsapp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-whatsapp"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span> Whatsapp
      <span class="hljs-tag">&lt;/<span class="hljs-name">network</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">social-sharing</span>&gt;</span>
</code></pre>
<h2 id="articleHeader2">插件参数</h2>
<table>
<thead><tr>
<th>名称</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>url</code></td>
<td>String</td>
<td>current</td>
<td>分享的url</td>
</tr>
<tr>
<td><code>title</code></td>
<td>String</td>
<td>-</td>
<td>分享的标题</td>
</tr>
<tr>
<td><code>description</code></td>
<td>String</td>
<td>-</td>
<td>分享的描述</td>
</tr>
<tr>
<td><code>quote</code></td>
<td>String</td>
<td>-</td>
<td>facebook的quote，只有facebook使用</td>
</tr>
<tr>
<td><code>hashtags</code></td>
<td>String</td>
<td>-</td>
<td>标签，用逗号分割</td>
</tr>
<tr>
<td><code>twitter-user</code></td>
<td>String</td>
<td>-</td>
<td>Twitter user，只有twitter使用</td>
</tr>
<tr>
<td><code>media</code></td>
<td>String</td>
<td>-</td>
<td>多媒体链接，只有Pinterest 使用</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader3">事件</h2>
<table>
<thead><tr>
<th>名称</th>
<th>数据</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>social_shares_open</code></td>
<td>Network object, shared url</td>
<td>当分享弹出框打开时触发</td>
</tr>
<tr>
<td><code>social_shares_change</code></td>
<td>Network object, shared url</td>
<td>当已有分享弹出框打开，用户又触发一个分享弹出框时触发</td>
</tr>
<tr>
<td><code>social_shares_close</code></td>
<td>Network object, shared url</td>
<td>当分享弹出框关闭或使用其它分享弹出框时触发</td>
</tr>
</tbody>
</table>
<p>参考地址：<a href="http://www.wheelsfactory.cn/" rel="nofollow noreferrer" target="_blank">轮子工厂</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-social-sharing社交分享组件

## 原文链接
[https://segmentfault.com/a/1190000010161715](https://segmentfault.com/a/1190000010161715)

