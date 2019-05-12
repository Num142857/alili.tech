---
title: '优化auto-prefixer配置，让CSS适配不同浏览器' 
date: 2019-01-28 2:30:09
hidden: true
slug: uscktwhmjoc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">优化auto-prefixer配置</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="更新于 2017/6/8
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>更新于 <span class="hljs-number">2017</span>/<span class="hljs-number">6</span>/<span class="hljs-number">8</span>
</code></pre>
<p>终于克服懒惰，把post-css用上了，感觉可以抛弃stylus-loader了，哈哈，不过目前为了兼容，只修改了<code>auto-prefixer</code>的配置，它的<a href="https://github.com/postcss/autoprefixer" rel="nofollow noreferrer" target="_blank">文档在这</a></p>
<p>将原有写在loader中配置，转移到根目录下的<code>postcss.config.js</code>中，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    plugins: {
        'autoprefixer': {},
      //  'postcss-px2rem': {remUnit: 100}
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">plugins</span>: {
        <span class="hljs-string">'autoprefixer'</span>: {},
      <span class="hljs-comment">//  'postcss-px2rem': {remUnit: 100}</span>
    }
}</code></pre>
<p>这里可以看到我没有对<code>autoprefixer</code>进行任何的配置，这是因为我把相关配置写入到了<code>package.json</code>文件，相关代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;browserslist&quot;: [
    &quot;iOS >= 8&quot;,
    &quot;Firefox >= 20&quot;,
    &quot;Android > 4.4&quot;
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"browserslist"</span>: [
    <span class="hljs-string">"iOS &gt;= 8"</span>,
    <span class="hljs-string">"Firefox &gt;= 20"</span>,
    <span class="hljs-string">"Android &gt; 4.4"</span>
  ]</code></pre>
<p>如果非要在<code>postcss.config.js</code>中配置的话，请使用<code>browsers</code>参数来配置。</p>
<p><code>browserslist</code>识别的浏览器关键词如下：</p>
<ul>
<li><p>Android for Android WebView.</p></li>
<li><p>BlackBerry or bb for Blackberry browser.</p></li>
<li><p>Chrome for Google Chrome.</p></li>
<li><p>ChromeAndroid or and_chr for Chrome for Android</p></li>
<li><p>Edge for Microsoft Edge.</p></li>
<li><p>Electron for Electron framework. It will be converted to Chrome version.</p></li>
<li><p>Explorer or ie for Internet Explorer.</p></li>
<li><p>ExplorerMobile or ie_mob for Internet Explorer Mobile.</p></li>
<li><p>Firefox or ff for Mozilla Firefox.</p></li>
<li><p>FirefoxAndroid or and_ff for Firefox for Android.</p></li>
<li><p>iOS or ios_saf for iOS Safari.</p></li>
<li><p>Opera for Opera.</p></li>
<li><p>OperaMini or op_mini for Opera Mini.</p></li>
<li><p>OperaMobile or op_mob for Opera Mobile.</p></li>
<li><p>QQAndroid or and_qq for QQ Browser for Android.</p></li>
<li><p>Safari for desktop Safari.</p></li>
<li><p>Samsung for Samsung Internet.</p></li>
<li><p>UCAndroid or and_uc for UC Browser for Android.</p></li>
</ul>
<p>==================================以上为更新内容=========================</p>
<p>=============================以下为旧内容=================================</p>
<p>之前一直使用<code>auto-prefixer-loader</code>的默认配置，即<code>autoprefixer-loader?browsers=last 2 version</code>，一直没深究为何要这么配置，直到在开发WEBAPP的项目中，使用了flex语法，结果发现编译出来的有<code>-ms-flex</code>和<code>-moz-flex</code>，我期望的是只用<code>-webkit-</code>就行了，不用搞这么多，于是赶紧去官网找资料。。。</p>
<p>查阅了资料后发现，<a href="https://github.com/postcss/autoprefixer#browsers" rel="nofollow noreferrer" target="_blank">autoprefixer</a>工具使用<a href="https://github.com/ai/browserslist" rel="nofollow noreferrer" target="_blank">Browserslist</a>来匹配符合条件的浏览器，<code>Browserslist</code>提供了一个网站<a href="http://browserl.ist/" rel="nofollow noreferrer" target="_blank">browserl.ist</a>来帮助我们找到期望的浏览器版本，上去试了试，发现搜索的关键字要注意下，比如如果要搜索<code>Android Browser &gt; 4.2</code>实际上输入<code>Android &gt; 4.2</code>就可以了，<code>Android Browser &gt; 4.2</code>反而搜不到。。。</p>
<p>最后我把我的<code>auto-prefixer-loader</code>配置修改成如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  `autoprefixer?{browsers:[&quot;iOS >= 7&quot;,&quot;Android >= 4&quot;]}`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>  `<span class="hljs-selector-tag">autoprefixer</span>?{<span class="hljs-attribute">browsers</span>:[<span class="hljs-string">"iOS &gt;= 7"</span>,<span class="hljs-string">"Android &gt;= 4"</span>]}`
</code></pre>
<p>其实应该使用<code>postCSS</code>，不过一直没时间学习，有空我再补上。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
优化auto-prefixer配置，让CSS适配不同浏览器

## 原文链接
[https://segmentfault.com/a/1190000008030425](https://segmentfault.com/a/1190000008030425)

