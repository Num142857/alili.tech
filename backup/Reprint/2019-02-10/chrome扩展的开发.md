---
title: 'chrome扩展的开发' 
date: 2019-02-10 2:30:42
hidden: true
slug: 7pkcl1e9ekl
categories: [reprint]
---

{{< raw >}}

                    
<p>这是本人写的第一个chrome扩展，这个扩展的普遍适用性不强，但是确实很方便，具体的开发流程写在这里，感兴趣的看官可以试着自己动手写一写</p>
<p>这个扩展的作用是<code>change query</code>，它的适用场景是更换百度搜索页的关键词，并且跳转，如果你理解了这个意思，那你一定会想『这能有什么用？』，是的，这在具体生活和工作中一点用处都没有，它仅仅对笔者和笔者身边的产品与测试有一点用处，笔者这两个月的开发任务是一组query下的百度搜索结果页卡片。在这里，笔者想说自己开发chrome扩展更多的是满足自己的切身需要，因地制宜</p>
<p><strong>下面主要介绍具体开发流程</strong></p>
<h2 id="articleHeader0">manifest.json配置文件</h2>
<p>第一步就是创建<code>manifest.json</code>配置文件：</p>
<ul>
<li><p><code>manifest_version</code>、<code>name</code>和<code>version</code>为必选，其它为可选</p></li>
<li><p>这个文件中<code>manifest_version</code>默认为2</p></li>
<li><p><code>name</code>、<code>version</code>和<code>description</code>很明显，其中<code>version</code>要书写规范，且递增</p></li>
<li><p><code>icons</code>是一个对象，key是像素值，value是图片地址，chrome会选取合适像素的图片在合适的位置（右上角还是扩展程序页面）当做logo</p></li>
<li><p><code>background</code>指后台执行环境，指定js文件就可以，因为后台基本没有展现页面的需要</p></li>
<li><p><code>permissions</code>指都用到了哪些权限，本地保存的权限，操作tab页的权限等，这些权限要在这里声明</p></li>
<li><p><code>browser_action</code>指左键点击右上角logo弹出的页面，这个页面在点开的时候加载出来，收回的时候被销毁</p></li>
<li><p><code>options_page</code>指右键点击右上角logo弹出列表中的<code>选项</code>是否可点，与可点时左键点击打开的页面</p></li>
<li><p><code>content_scripts</code>指可以在chrome窗口页运行的js文件，matches用来匹配哪些url的窗口页运行</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;manifest_version&quot;: 2,
    &quot;name&quot;: &quot;Change query&quot;,
    &quot;version&quot;: &quot;1.0&quot;,
    &quot;description&quot;: &quot;快速切换导入列表中的query&quot;,
    &quot;icons&quot;: {
        &quot;48&quot;: &quot;img/icon48.png&quot;
    },
    &quot;background&quot;: { &quot;scripts&quot;: [&quot;./js/background.js&quot;] },
    &quot;permissions&quot;: [
        &quot;storage&quot;,
        &quot;tabs&quot;
    ],
    &quot;browser_action&quot;: {
         &quot;default_icon&quot;: {
            &quot;38&quot;: &quot;img/icon38.png&quot;
        },
        &quot;default_popup&quot;: &quot;popup.html&quot;
    },
    &quot;options_page&quot;: &quot;options.html&quot;,
    &quot;content_scripts&quot;: [
        {
            &quot;matches&quot;: [
                &quot;http://*.baidu.com/&quot;,
                &quot;https://*.baidu.com/&quot;
            ],
            &quot;js&quot;: [&quot;js/open.js&quot;]
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"manifest_version"</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"Change query"</span>,
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0"</span>,
    <span class="hljs-attr">"description"</span>: <span class="hljs-string">"快速切换导入列表中的query"</span>,
    <span class="hljs-attr">"icons"</span>: {
        <span class="hljs-attr">"48"</span>: <span class="hljs-string">"img/icon48.png"</span>
    },
    <span class="hljs-attr">"background"</span>: { <span class="hljs-attr">"scripts"</span>: [<span class="hljs-string">"./js/background.js"</span>] },
    <span class="hljs-attr">"permissions"</span>: [
        <span class="hljs-string">"storage"</span>,
        <span class="hljs-string">"tabs"</span>
    ],
    <span class="hljs-attr">"browser_action"</span>: {
         <span class="hljs-attr">"default_icon"</span>: {
            <span class="hljs-attr">"38"</span>: <span class="hljs-string">"img/icon38.png"</span>
        },
        <span class="hljs-attr">"default_popup"</span>: <span class="hljs-string">"popup.html"</span>
    },
    <span class="hljs-attr">"options_page"</span>: <span class="hljs-string">"options.html"</span>,
    <span class="hljs-attr">"content_scripts"</span>: [
        {
            <span class="hljs-attr">"matches"</span>: [
                <span class="hljs-string">"http://*.baidu.com/"</span>,
                <span class="hljs-string">"https://*.baidu.com/"</span>
            ],
            <span class="hljs-attr">"js"</span>: [<span class="hljs-string">"js/open.js"</span>]
        }
    ]
}</code></pre>
<p>chrome主要提供了三个运行环境，<code>background</code>后台持续运行环境，<code>browser_action</code>logo弹出页短暂运行环境，<code>content_scripts</code>用户正在浏览页面的操作环境，这个环境里可以操作页面内的元素，但是与页面内的原始js是各自独立的，这三个环境可以通过chrome提供的runtime接口来实现通信，通过runtime接口还可以在不同扩展间通信</p>
<h2 id="articleHeader1">开发browser_action页面</h2>
<p>笔者开发的这个chrome拓展，功能很小，只用到了<code>browser_action</code>页面，本文也将只介绍<code>browser_action</code>页面的开发，下面是html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;./css/style.css&quot;>
</head>
<body>
    <textarea class=&quot;query-area&quot;></textarea>
    <ul class=&quot;query-list&quot;></ul>
    <button id=&quot;btn&quot;>提交</button>
    <button id=&quot;prev&quot;>上一个</button>
    <button id=&quot;next&quot;>下一个</button>
</body>
<script type=&quot;text/javascript&quot; src=&quot;./js/popup.js&quot;></script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./css/style.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"query-area"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"query-list"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"prev"</span>&gt;</span>上一个<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"next"</span>&gt;</span>下一个<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/popup.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这里需要注意的是:</p>
<ul>
<li><p>不可以在html页面里面直接写js代码，只能引用js文件</p></li>
<li><p>上文提到的，这个页面点开创建页面，收回销毁页面，不会保存变量信息</p></li>
</ul>
<h2 id="articleHeader2">Change query拓展的用处</h2>
<p>html上面的元素很简单，一个textarea，一个ul，三个button。本拓展的逻辑是在textarea中粘贴进query列表，点击『提交』按钮，接下来通过点击『上一个』或『下一个』来切换相邻query，跳转到相应的结果页面</p>
<p>这个拓展开发的目的很简单，在开发完成后，要对所有的搜索query进行确认，需要在编辑器上复制query，粘贴到输入框回车，切换起来很繁琐，所以开发了这个一次性复制粘贴query，然后在拓展上点击就可以轻松切换query，节省测试时间</p>
<p>第一步，点开popup页：</p>
<p><span class="img-wrap"><img data-src="http://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query01-2.jpeg" src="https://static.alili.techhttp://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query01-2.jpeg" alt="change-query02" title="change-query02" style="cursor: pointer;"></span></p>
<p>第二步，复制query列表，粘贴进textarea：</p>
<p><span class="img-wrap"><img data-src="http://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query02-2.jpeg" src="https://static.alili.techhttp://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query02-2.jpeg" alt="change-query02" title="change-query02" style="cursor: pointer;"></span></p>
<p>第三步，提交：</p>
<p><span class="img-wrap"><img data-src="http://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query03.jpeg" src="https://static.alili.techhttp://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query03.jpeg" alt="change-query02" title="change-query02" style="cursor: pointer;"></span></p>
<p>第四步，点击下一页：</p>
<p><span class="img-wrap"><img data-src="http://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query04.png" src="https://static.alili.techhttp://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query04.png" alt="change-query02" title="change-query02" style="cursor: pointer;"></span></p>
<p>可以看到飘红的query是当前搜索的query：</p>
<p><span class="img-wrap"><img data-src="http://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query05.png" src="https://static.alili.techhttp://7xir4w.com1.z0.glb.clouddn.com/blog/images/change-query05.png" alt="change-query02" title="change-query02" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">Change query拓展用到的API</h2>
<p>只用到了两个API，chrome.storage.local与chrome.tabs，使用这两个API需要在<code>manifest.json</code>文件的<code>permissions</code>中添加『storage』和『tabs』</p>
<p>chrome.storage.local用来本地存储数据，具体使用的两个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.storage.local.set({});
chrome.storage.local.get(null, function(data) {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">chrome.storage.local.set({});
chrome.storage.local.get(<span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{});</code></pre>
<p>chrome.tabs用来操作tab页，具体使用的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取当前用户正在浏览的tab页的url
chrome.tabs.query({active: true}, function(tabs) {
    self.url = tabs[0].url;
});
// 监听当用户切换tab页时，获取切换到的tab页的url
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    self.url = tab.url;
});
// 操作当前tab页跳转url
chrome.tabs.update(null, {url:nextUrl});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取当前用户正在浏览的tab页的url</span>
chrome.tabs.query({<span class="hljs-attr">active</span>: <span class="hljs-literal">true</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabs</span>) </span>{
    self.url = tabs[<span class="hljs-number">0</span>].url;
});
<span class="hljs-comment">// 监听当用户切换tab页时，获取切换到的tab页的url</span>
chrome.tabs.onUpdated.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabId, changeInfo, tab</span>) </span>{
    self.url = tab.url;
});
<span class="hljs-comment">// 操作当前tab页跳转url</span>
chrome.tabs.update(<span class="hljs-literal">null</span>, {<span class="hljs-attr">url</span>:nextUrl});</code></pre>
<p>本项目的下载地址：<a>点击下载</a></p>
<h2 id="articleHeader4">总结</h2>
<p>chrome拓展商店里有很多优秀的拓展可以方便我们的生活与工作<br>chrome拓展开发很简单，多多动手，科技改变生活</p>
<p>对想学习更详细chrome拓展的同学，推荐这里学习：</p>
<p><a href="https://developer.chrome.com/extensions/getstarted.html" rel="nofollow noreferrer" target="_blank">官网网站</a></p>
<p><a href="http://www.ituring.com.cn/book/1421" rel="nofollow noreferrer" target="_blank">Chrome扩展及应用开发</a></p>
<p><a href="https://crxdoc-zh.appspot.com/apps/api_other" rel="nofollow noreferrer" target="_blank">中文API</a></p>
<p>文章转载自笔者个人博客 <a href="http://gaoxuefeng.com/2016/05/06/chrome%E6%89%A9%E5%B1%95%E7%9A%84%E5%BC%80%E5%8F%91/" rel="nofollow noreferrer" target="_blank">Gaoxuefeng's Blog</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
chrome扩展的开发

## 原文链接
[https://segmentfault.com/a/1190000005071240](https://segmentfault.com/a/1190000005071240)

