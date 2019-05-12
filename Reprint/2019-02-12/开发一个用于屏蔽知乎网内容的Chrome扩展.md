---
title: '开发一个用于屏蔽知乎网内容的Chrome扩展' 
date: 2019-02-12 2:30:12
hidden: true
slug: zl7wgsfkdam
categories: [reprint]
---

{{< raw >}}

                    
<p>本文原发在<a href="http://www.wukai.me/2016/03/25/chrome-extension-zhihufilter/" rel="nofollow noreferrer" target="_blank">我的博客</a>。</p>
<p>前段时间电影《疯狂动物城》上映了，然后我的知乎首页就被它刷屏了。虽然我对这部电影没有任何意见，但作为一个还没去电影院看过的人来说，每看到相关问题一次都是无情的剧透，于是我毅然屏蔽了“疯狂动物园”这个话题。本以为问题解决了，但是接下来我又被迫看到这个问题：</p>
<p><span class="img-wrap"><img data-src="/img/bVtRkl" src="https://static.alili.tech/img/bVtRkl" alt="2016-03-25-zhihu-filter1.png" title="2016-03-25-zhihu-filter1.png" style="cursor: pointer; display: inline;"></span></p>
<p>问题上添加的五个话题无一命中，我又被剧透了一脸。算了，既然知乎的屏蔽规则靠不住，那就自己动手吧。这样我的Chrome浏览器扩展——ZhihuFilter就诞生了，<a href="https://github.com/noiron/ZhihuFilter" rel="nofollow noreferrer" target="_blank">点击这里查看Github上的项目</a>。</p>
<h2 id="articleHeader0">扩展功能</h2>
<p>其实扩展的功能很简单，当打开知乎首页后，扩展会依次检查你的屏蔽关键词列表是否出现在了某一个答案中，如果出现了，就会把这个答案隐藏，取而代之的是提示信息和一个展开答案的按钮。效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVtRj9" src="https://static.alili.tech/img/bVtRj9" alt="2016-03-25-zhihu-filter-demo1.png" title="2016-03-25-zhihu-filter-demo1.png" style="cursor: pointer; display: inline;"></span></p>
<p>你可以点击图中的按钮来查看答案，之后可以选择再次隐藏或展开。</p>
<p>当你安装了扩展后，会在地址栏的右侧显示出图标</p>
<p><span class="img-wrap"><img data-src="/img/bVtRke" src="https://static.alili.tech/img/bVtRke" alt="2016-03-25-icon.png" title="2016-03-25-icon.png" style="cursor: pointer; display: inline;"></span></p>
<p>点击图标后，将会出现设置屏蔽词的界面</p>
<p><span class="img-wrap"><img data-src="/img/bVtRkr" src="https://static.alili.tech/img/bVtRkr" alt="2016-03-25-popup.png" title="2016-03-25-popup.png" style="cursor: pointer; display: inline;"></span></p>
<p>你可以在这个页面中设置你想屏蔽的词语。</p>
<h2 id="articleHeader1">关于Chrome扩展的开发</h2>
<p>关于Chrome扩展开发的内容，可以查看<a href="https://developer.chrome.com/extensions/getstarted" rel="nofollow noreferrer" target="_blank">Google的官方文档</a>或者是<a href="http://www.ituring.com.cn/minibook/950" rel="nofollow noreferrer" target="_blank">这个教程</a>。</p>
<blockquote><p>一个应用（扩展）其实是压缩在一起的一组文件，包括HTML，CSS，Javascript脚本，图片文件，还有其它任何需要的文件。</p></blockquote>
<p>开发扩展的时候，必不可少的是一个<code>manifest.json</code>文件，这是一个配置文件，会告诉Chrome你的扩展中包含了哪些内容。<code>manifest.json</code>中包含扩展的名字、版本及各种资源文件（如图标、显示页面等）的链接。</p>
<p><a href="https://github.com/noiron/ZhihuFilter/blob/master/manifest.json" rel="nofollow noreferrer" target="_blank">我的扩展的manifest.json文件</a></p>
<h3 id="articleHeader2">Browser_action 和 page_action</h3>
<p><code>Browser_action</code>和<code>page_action</code>是扩展的两种类型，它们很相似，主要的区别在于<code>browser_action</code>可以应用于所有的页面，而<code>page_action</code>只能在你设定的几个特定网站内使用。我的扩展是专门用于知乎网站的，因此选择了<code>page_action</code>来处理。</p>
<p>按照Google的文档描述，两者还有一个区别：<code>browser_action</code>的图标显示在地址栏的外部，<code>page_action</code>的图标显示在地址栏内部。但是，在<a href="https://groups.google.com/a/chromium.org/forum/#!searchin/chromium-extensions/upcoming/chromium-extensions/7As9MKhav5E/dNiZDoSCCQAJ" rel="nofollow noreferrer" target="_blank">这里的讨论</a>中，似乎新版本的Chrome浏览器中已经将两者都显示在了地址栏的外侧，不过<code>page_action</code>的图标只有在打开特定的网站时才不会显示为灰色。</p>
<p>在<code>manifest.json</code>文件中进行如下设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;page_action&quot;: {
  &quot;default_icon&quot;: &quot;images/icon.png&quot;,
  &quot;default_title&quot;: &quot;知乎屏蔽扩展&quot;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"page_action"</span>: {
  <span class="hljs-string">"default_icon"</span>: <span class="hljs-string">"images/icon.png"</span>,
  <span class="hljs-string">"default_title"</span>: <span class="hljs-string">"知乎屏蔽扩展"</span>
},
</code></pre>
<h3 id="articleHeader3">background.js</h3>
<blockquote><p>在Manifest中指定background域可以使扩展常驻后台。background可以包含三种属性，分别是<code>scripts</code>、<code>page</code>和<code>persistent</code>。</p></blockquote>
<p>我在扩展中只用到了<code>scripts</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;background&quot;: {
  &quot;scripts&quot;: [&quot;js/jquery-2.2.1.js&quot;,&quot;js/background.js&quot;]
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"background"</span>: {
  <span class="hljs-string">"scripts"</span>: [<span class="hljs-string">"js/jquery-2.2.1.js"</span>,<span class="hljs-string">"js/background.js"</span>]
},
</code></pre>
<p>这样就会自动生成一个包含了列出的脚本文件的后台页面。</p>
<p>在我的<code>background.js</code>文件中有如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 当网址改变的时候，判断当前的页面是否是知乎
    // 如果是的话，就显示出图标，并设置它的弹出页面
    chrome.tabs.onUpdated.addListener(function(id, info, tab){
        if (tab.url.toLowerCase().indexOf(&quot;zhihu.com&quot;) > -1){
            chrome.pageAction.show(id);
            chrome.pageAction.setPopup({
                tabId: id,
                popup: 'popup.html'
            });
        }
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// 当网址改变的时候，判断当前的页面是否是知乎</span>
    <span class="hljs-comment">// 如果是的话，就显示出图标，并设置它的弹出页面</span>
    chrome.tabs.onUpdated.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id, info, tab</span>)</span>{
        <span class="hljs-keyword">if</span> (tab.url.toLowerCase().indexOf(<span class="hljs-string">"zhihu.com"</span>) &gt; <span class="hljs-number">-1</span>){
            chrome.pageAction.show(id);
            chrome.pageAction.setPopup({
                <span class="hljs-attr">tabId</span>: id,
                <span class="hljs-attr">popup</span>: <span class="hljs-string">'popup.html'</span>
            });
        }
    });</code></pre>
<p><code>background.js</code>文件中还有一个用于和<code>content_script</code>进行通信的监听器。</p>
<blockquote><p>参考资料：<br><a href="https://developer.chrome.com/extensions/background_pages" rel="nofollow noreferrer" target="_blank">Google的Backgorund Pages文档</a><br><a href="http://www.ituring.com.cn/article/60242" rel="nofollow noreferrer" target="_blank">另一个教程</a></p></blockquote>
<h3 id="articleHeader4">Content Scripts</h3>
<blockquote><p>Content scripts是在Web页面内运行的javascript脚本。通过使用标准的DOM，它们可以获取浏览器所访问页面的详细信息，并可以修改这些信息。</p></blockquote>
<p>在<code>manifest.json</code>文件中进行设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;content_scripts&quot;: [
{
  &quot;matches&quot;: [&quot;*://*.zhihu.com/*&quot;],
  &quot;js&quot;: [&quot;js/jquery-2.2.1.js&quot;, &quot;js/content_script.js&quot;]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"content_scripts"</span>: [
{
  <span class="hljs-string">"matches"</span>: [<span class="hljs-string">"*://*.zhihu.com/*"</span>],
  <span class="hljs-string">"js"</span>: [<span class="hljs-string">"js/jquery-2.2.1.js"</span>, <span class="hljs-string">"js/content_script.js"</span>]
}
</code></pre>
<p>在打开匹配的网站时，列出的js文件会被注入页面，这样就可以获得浏览器所访问的web页面的详细信息，并可以对页面做出修改。虽然content script和页面共享了DOM结构，但不能访问该页面或其它content script中定义的函数和变量，这样就避免了相同的函数或变量名称的干扰。</p>
<p>我的扩展的主要功能就是在<code>content_script.js</code>中完成的，在该脚本中通过对页面的DOM进行操作来实现功能。</p>
<h2 id="articleHeader5">扩展功能的实现</h2>
<h3 id="articleHeader6">对知乎首页进行分析</h3>
<p>查看一下知乎首页的源代码，所有的答案内容是放在一个<code>id=js-home-feed-list</code>的div中的，结构大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!--这里省略了很多内容，只是一个大致示意-->
    <div id=&quot;js-home-feed-list&quot;>
        <div class=&quot;feed-item&quot;>
            <!--这里省略一些题目的id，url等信息-->
            <div class=&quot;avatar&quot;></div>  <!--头像-->
            <div class=&quot;feed-main&quot;>  <!--除了头像外的其它部分-->
                <div class=&quot;source&quot;></div>
                <div class=&quot;content&quot;>
                    <!--答案内容及按钮等部分-->
                </div>
            </div>
        </div>
        <div class=&quot;feed-item&quot;></div>
        <div class=&quot;feed-item&quot;></div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-comment">&lt;!--这里省略了很多内容，只是一个大致示意--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"js-home-feed-list"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"feed-item"</span>&gt;</span>
            <span class="hljs-comment">&lt;!--这里省略一些题目的id，url等信息--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  <span class="hljs-comment">&lt;!--头像--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"feed-main"</span>&gt;</span>  <span class="hljs-comment">&lt;!--除了头像外的其它部分--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"source"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
                    <span class="hljs-comment">&lt;!--答案内容及按钮等部分--&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"feed-item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"feed-item"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>而在答案部分中，又分为摘要和完整的答案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;zm-item-answer-detail&quot;>
        …
        <div class=&quot;zm-item-rich-text&quot;>   <!--内容部分-->
            <div class=&quot;zm-editable-content&quot;></div>   <!--点击显示全部后，这一部分才显示-->  
            <textarea class=&quot;content hidden&quot;></div>   <!--包括了全部答案内容但不显示-->
            <div class=&quot;zh-summary summary clearfix&quot;></div> <!--显示摘要-->
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zm-item-answer-detail"</span>&gt;</span>
        …
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zm-item-rich-text"</span>&gt;</span>   <span class="hljs-comment">&lt;!--内容部分--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zm-editable-content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>   <span class="hljs-comment">&lt;!--点击显示全部后，这一部分才显示--&gt;</span>  
            <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content hidden"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>   <span class="hljs-comment">&lt;!--包括了全部答案内容但不显示--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zh-summary summary clearfix"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-comment">&lt;!--显示摘要--&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们可以获取上面的节点内容，来确定是否需要屏蔽这个答案。最简单的实现方法就是查找关键词是否在节点的<code>outerHTML</code>中出现，如果出现了就给<code>.feed-main</code>加上一个名为<code>hidden</code>的class。</p>
<h3 id="articleHeader7">用于替换的内容</h3>
<p>原来的答案被隐藏了之后，需要在这个地方换上点新的内容，我在这里创建了一个div，内部有一个p元素用于显示信息，及一个button用于切换答案的状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 创建用于替换的div
    var $div = $('<div class=&quot;block-info&quot;></div>');
    $div.append($('<p>这里有一个被屏蔽的答案<span></span></p>'));
    $div.append($('<button class=&quot;block-btn&quot;>手贱一下</button>'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// 创建用于替换的div</span>
    <span class="hljs-keyword">var</span> $div = $(<span class="hljs-string">'&lt;div class="block-info"&gt;&lt;/div&gt;'</span>);
    $div.append($(<span class="hljs-string">'&lt;p&gt;这里有一个被屏蔽的答案&lt;span&gt;&lt;/span&gt;&lt;/p&gt;'</span>));
    $div.append($(<span class="hljs-string">'&lt;button class="block-btn"&gt;手贱一下&lt;/button&gt;'</span>));</code></pre>
<p>还需要在按钮上绑定点击事件，p元素内显示的信息也会根据实际进行修改。</p>
<h3 id="articleHeader8">关键词的存储</h3>
<p>在我的扩展中，我是将需要屏蔽的关键词存放在了<code>localStorage</code>中。关键词保存在localStorage中的<code>keywords</code>键下，是一个简单的由逗号分隔开的字符串。</p>
<blockquote><p>要访问同一个localStorage对象，页面必须来自同一个域名（子域名无效），使用同一种协议，在同一个端口上。</p></blockquote>
<p>由于content script注入到了知乎页面，而localStorage存放在扩展的域下，要在content script中获得关键词的值，就必须用到页面中的通信。</p>
<p>Chrome提供了4个有关扩展页面间相互通信的接口，分别是<code>runtime.sendMessage</code>、<code>runtime.onMessage</code>、<code>runtime.connect</code>和<code>runtime.onConnect</code>，<br>这里用到了前两个。</p>
<p>content_script.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 从扩展的localStorage中获得存储的关键词
    chrome.runtime.sendMessage({method: &quot;getKeywords&quot;}, function (response) {
        str = response.keywords;
        keywords = str !== '' ? str.split(',') : [];
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// 从扩展的localStorage中获得存储的关键词</span>
    chrome.runtime.sendMessage({<span class="hljs-attr">method</span>: <span class="hljs-string">"getKeywords"</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
        str = response.keywords;
        keywords = str !== <span class="hljs-string">''</span> ? str.split(<span class="hljs-string">','</span>) : [];
    });</code></pre>
<p>对应的background.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.method == &quot;getKeywords&quot;)
            sendResponse({keywords: localStorage['keywords']});
        else
            sendResponse({});
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    chrome.runtime.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, sender, sendResponse</span>) </span>{
        <span class="hljs-keyword">if</span> (request.method == <span class="hljs-string">"getKeywords"</span>)
            sendResponse({<span class="hljs-attr">keywords</span>: localStorage[<span class="hljs-string">'keywords'</span>]});
        <span class="hljs-keyword">else</span>
            sendResponse({});
    });</code></pre>
<p>这样就可以在content script中使用localStorage的值了。</p>
<blockquote><p>参考资料：<a href="http://www.ituring.com.cn/article/60272" rel="nofollow noreferrer" target="_blank">扩展页面中的通信</a></p></blockquote>
<h3 id="articleHeader9">检测页面加载了更多内容</h3>
<p>每当当知乎页面加载了更多的答案时，我们需要再进行处理。那么如何检测页面中加载了更多内容，这里需要用到<code>MutationObserver</code>对象。<code>MutationObserver</code>提供了检测页面中的DOM变化的方法。</p>
<p><code>MutationObserver</code>的使用方法：</p>
<p>首先，创建一个mutationObserver的实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observer = new MutationObserver(callback)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-type">MutationObserver</span>(<span class="hljs-keyword">callback</span>)
</code></pre>
<p>这里需要一个回调函数作为构造器的参数。</p>
<p>callback函数接受一个参数，所有被记录到的DOM变化将会组合成一个数组，作为参数传给回调函数进行处理。</p>
<p>mutationObserver对象有几个方法，这里只用到observe方法。</p>
<p>observe方法接收两个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    void observe(
      Node target,
      MutationObserverInit options
    );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">void</span> observe(
      Node target,
      MutationObserverInit options
    );</code></pre>
<p>第一个参数指的是你要观察哪一个节点的DOM变化。第二个参数是一个选项参数，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var option = {
        'childList': true,    // 观察子元素
        'subtree': true,      // 观察目标节点的后代元素
        'attributes': false   // 不观察目标节点属性的变化
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> option = {
        <span class="hljs-string">'childList'</span>: <span class="hljs-literal">true</span>,    <span class="hljs-comment">// 观察子元素</span>
        <span class="hljs-string">'subtree'</span>: <span class="hljs-literal">true</span>,      <span class="hljs-comment">// 观察目标节点的后代元素</span>
        <span class="hljs-string">'attributes'</span>: <span class="hljs-literal">false</span>   <span class="hljs-comment">// 不观察目标节点属性的变化</span>
    };</code></pre>
<p>这里只设置了三个选项，其余属性可以看<a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit" rel="nofollow noreferrer" target="_blank">MDN文档</a>。</p>
<p>观察到的每一个变化都是一个MutationRecord对象，它有许多属性，比如：</p>
<ul>
<li><p>type，记录变化的类型</p></li>
<li><p>addedNodes，由增加的节点组成的NodeList</p></li>
<li><p>removeNodes，由删除的节点组成的NodeList</p></li>
</ul>
<p>因为addedNodes是一个NodeList，所以可以在它上面应用jQuery的$(), <code>$(mutation.addedNodes)</code>。</p>
<p>其它的属性可以见<a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord" rel="nofollow noreferrer" target="_blank">MDN文档</a>。</p>
<p>所有的MutationRecord会被放进一个list中，作为参数传给上面的callback函数。通过对MutationRecord对象的属性进行检测，如果新增的节点里出现了<code>class=feed-main</code>的元素，则代表加载了新的答案，需要再一次运行程序。</p>
<blockquote><p>参考资料：<br><a href="https://dev.opera.com/articles/mutation-observers-tutorial/" rel="nofollow noreferrer" target="_blank">Getting to Know Mutation Observers</a><br><a href="http://javascript.ruanyifeng.com/dom/mutationobserver.html" rel="nofollow noreferrer" target="_blank">Mutation Observer</a></p></blockquote>
<h2 id="articleHeader10">扩展的使用</h2>
<p>在我的设想中，扩展可以提供一些选项，比如正则表达式的支持，再比如除了首页外，在答案页面是否也需要提供屏蔽功能。这些选项会在之后逐步加入。</p>
<p>由于Chrome的设置，不能够安装Web Store中没有的程序。而发布扩展需要先付$5，我没有信用卡，也就暂时没有发布扩展。如果想尝试一下扩展的话，可以直接下载<a href="https://github.com/noiron/ZhihuFilter" rel="nofollow noreferrer" target="_blank">Github中的代码</a>到本地。在Chrome浏览器的菜单中选择 More tools -&gt; Extensions，进入扩展页面后，勾选右上角的Developer mode，选择Load unpacked extension，选择扩展文件夹即可。 </p>
<p>欢迎使用后提出建议。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开发一个用于屏蔽知乎网内容的Chrome扩展

## 原文链接
[https://segmentfault.com/a/1190000004694211](https://segmentfault.com/a/1190000004694211)

