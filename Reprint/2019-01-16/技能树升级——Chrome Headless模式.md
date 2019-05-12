---
title: '技能树升级——Chrome Headless模式' 
date: 2019-01-16 2:30:08
hidden: true
slug: re5zww2jak
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>作者：Jogis</strong><br><strong>原文链接：<a href="https://github.com/yesvods/Blog/issues/10" rel="nofollow noreferrer" target="_blank">https://github.com/yesvods/Bl...</a> </strong><br><strong>转载请注明原文链接以及作者信息</strong></p>
<p>也许最近已经听说Chrome59将支持<code>headless</code>模式，<code>PhantomJS</code>核心开发者<a href="https://github.com/Vitallium" rel="nofollow noreferrer" target="_blank">Vitaly</a>表示自己将会失业了。</p>
<h3 id="articleHeader0">Headless模式解决了什么问题</h3>
<p>3年前，无头浏览器<code>PhantomJS</code>已经如火如荼出现了，紧跟着<code>NightmareJS</code>也成为一名巨星。无头浏览器带来巨大便利性：页面爬虫、自动化测试、WebAutomation...</p>
<h3 id="articleHeader1">为啥Chrome又插了一脚</h3>
<p>用过PhantomJS的都知道，它的环境是运行在一个封闭的沙盒里面，在环境内外完全不可通信，包括API、变量、全局方法调用等。一个之前写的<a href="https://github.com/yesvods/page-spider" rel="nofollow noreferrer" target="_blank">微信页面爬虫</a>，实现内外通信的方式极其Hack，为了达到目的，不择手段，令人发指，看过的哥们都会蛋疼。</p>
<p>So, 很自然的，Chrome59版支持的特性，全部可以利用，简直不要太爽：</p>
<ul>
<li><p>ES2017</p></li>
<li><p>ServiceWork(PWA测试随便耍)</p></li>
<li><p>无沙盒环境</p></li>
<li><p>无痛通讯&amp;API调用</p></li>
<li><p>无与伦比的速度</p></li>
<li><p>...</p></li>
</ul>
<h3 id="articleHeader2">技能树启动点</h3>
<p>为了点亮技能树，我们需要以下配置：</p>
<ul>
<li><p>Chrome Canary (What!还没装？<a href="https://www.google.com/chrome/browser/canary.html" rel="nofollow noreferrer" target="_blank">传送门</a>)</p></li>
<li><p>NodeJS (&gt;=7标配)</p></li>
<li><p>TNPM (可选项，技能树没点的快去——&gt;<a href="https://www.atatech.org/articles/76281)" rel="nofollow noreferrer" target="_blank">https://www.atatech.org/artic...</a></p></li>
</ul>
<p>大致来说，有那么个过程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009071886?w=745&amp;h=161" src="https://static.alili.tech/img/remote/1460000009071886?w=745&amp;h=161" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">启动Headless模式</h3>
<p>有各种脚本启动方式，本次我们使用termial参数方式来打开：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --headless --remote-debugging-port=9222" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --headless --remote-debugging-port=9222</code></pre>
<p>在Dock中，一个黄色的东西就会被启动，但是他不会跳出来。</p>
<h3 id="articleHeader4">操控无头浏览器</h3>
<p>依旧有各种方式，我们先安装一个工具帮助我们来对黄色浏览器做点事情：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ tnpm i -S chrome-remote-interface " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ tnpm i -S chrome-remote-interface </code></pre>
<h3 id="articleHeader5">燥起来</h3>
<h4>捕获所有请求</h4>
<p>Pretty Simple，写一个index.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CDP = require(&quot;chrome-remote-interface&quot;);
 
CDP(client => {
  // extract domains
  const { Network, Page } = client;
  // setup handlers
  Network.requestWillBeSent(params => {
    console.log(params.request.url);
  });
  Page.loadEventFired(() => {
    client.close();
  });
  // enable events then start!
  Promise.all([Network.enable(), Page.enable()])
    .then(() => {
      return Page.navigate({ url: &quot;https://github.com&quot; });
    })
    .catch(err => {
      console.error(err);
      client.close();
    });
}).on(&quot;error&quot;, err => {
  // cannot connect to the remote endpoint
  console.error(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> CDP = <span class="hljs-built_in">require</span>(<span class="hljs-string">"chrome-remote-interface"</span>);
 
CDP(<span class="hljs-function"><span class="hljs-params">client</span> =&gt;</span> {
  <span class="hljs-comment">// extract domains</span>
  <span class="hljs-keyword">const</span> { Network, Page } = client;
  <span class="hljs-comment">// setup handlers</span>
  Network.requestWillBeSent(<span class="hljs-function"><span class="hljs-params">params</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(params.request.url);
  });
  Page.loadEventFired(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    client.close();
  });
  <span class="hljs-comment">// enable events then start!</span>
  <span class="hljs-built_in">Promise</span>.all([Network.enable(), Page.enable()])
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> Page.navigate({ url: <span class="hljs-string">"https://github.com"</span> });
    })
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.error(err);
      client.close();
    });
}).on(<span class="hljs-string">"error"</span>, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-comment">// cannot connect to the remote endpoint</span>
  <span class="hljs-built_in">console</span>.error(err);
});</code></pre>
<p>AND run it：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ node index.js</code></pre>
<p>结果会展示一堆url：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://github.com/
https://assets-cdn.github.com/assets/frameworks-12d63ce1986bd7fdb5a3f4d944c920cfb75982c70bc7f75672f75dc7b0a5d7c3.css
https://assets-cdn.github.com/assets/github-2826bd4c6eb7572d3a3e9774d7efe010d8de09ea7e2a559fa4019baeacf43f83.css
https://assets-cdn.github.com/assets/site-f4fa6ace91e5f0fabb47e8405e5ecf6a9815949cd3958338f6578e626cd443d7.css
https://assets-cdn.github.com/images/modules/site/home-illo-conversation.svg
https://assets-cdn.github.com/images/modules/site/home-illo-chaos.svg
https://assets-cdn.github.com/images/modules/site/home-illo-business.svg
https://assets-cdn.github.com/images/modules/site/integrators/slackhq.png
https://assets-cdn.github.com/images/modules/site/integrators/zenhubio.png
https://assets-cdn.github.com/assets/compat-8a4318ffea09a0cdb8214b76cf2926b9f6a0ced318a317bed419db19214c690d.js
https://assets-cdn.github.com/static/fonts/roboto/roboto-medium.woff
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code class="txt"><span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/github.com/</span>
<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/assets-cdn.github.com/assets</span><span class="hljs-regexp">/frameworks-12d63ce1986bd7fdb5a3f4d944c920cfb75982c70bc7f75672f75dc7b0a5d7c3.css
https:/</span><span class="hljs-regexp">/assets-cdn.github.com/assets</span><span class="hljs-regexp">/github-2826bd4c6eb7572d3a3e9774d7efe010d8de09ea7e2a559fa4019baeacf43f83.css
https:/</span><span class="hljs-regexp">/assets-cdn.github.com/assets</span><span class="hljs-regexp">/site-f4fa6ace91e5f0fabb47e8405e5ecf6a9815949cd3958338f6578e626cd443d7.css
https:/</span><span class="hljs-regexp">/assets-cdn.github.com/images</span><span class="hljs-regexp">/modules/site</span><span class="hljs-regexp">/home-illo-conversation.svg
https:/</span><span class="hljs-regexp">/assets-cdn.github.com/images</span><span class="hljs-regexp">/modules/site</span><span class="hljs-regexp">/home-illo-chaos.svg
https:/</span><span class="hljs-regexp">/assets-cdn.github.com/images</span><span class="hljs-regexp">/modules/site</span><span class="hljs-regexp">/home-illo-business.svg
https:/</span><span class="hljs-regexp">/assets-cdn.github.com/images</span><span class="hljs-regexp">/modules/site</span><span class="hljs-regexp">/integrators/slackhq</span>.png
<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/assets-cdn.github.com/images</span><span class="hljs-regexp">/modules/site</span><span class="hljs-regexp">/integrators/zenhubio</span>.png
<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/assets-cdn.github.com/assets</span><span class="hljs-regexp">/compat-8a4318ffea09a0cdb8214b76cf2926b9f6a0ced318a317bed419db19214c690d.js
https:/</span><span class="hljs-regexp">/assets-cdn.github.com/static</span><span class="hljs-regexp">/fonts/roboto</span><span class="hljs-regexp">/roboto-medium.woff
...</span></code></pre>
<h4>捕获DOM内所有图片</h4>
<p>这次轮到演示一下如何操控DOM：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CDP = require(&quot;chrome-remote-interface&quot;);
 
CDP(chrome => {
  chrome.Page
    .enable()
    .then(() => {
      return chrome.Page.navigate({ url: &quot;https://github.com&quot; });
    })
    .then(() => {
      chrome.DOM.getDocument((error, params) => {
        if (error) {
          console.error(params);
          return;
        }
        const options = {
          nodeId: params.root.nodeId,
          selector: &quot;img&quot;
        };
        chrome.DOM.querySelectorAll(options, (error, params) => {
          if (error) {
            console.error(params);
            return;
          }
          params.nodeIds.forEach(nodeId => {
            const options = {
              nodeId: nodeId
            };
            chrome.DOM.getAttributes(options, (error, params) => {
              if (error) {
                console.error(params);
                return;
              }
              console.log(params.attributes);
            });
          });
        });
      });
    });
}).on(&quot;error&quot;, err => {
  console.error(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>const CDP = <span class="hljs-built_in">require</span>(<span class="hljs-string">"chrome-remote-interface"</span>);
 
CDP(chrome =&gt; {
  chrome.Page
    .enable()
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> chrome.Page.navigate({ <span class="hljs-name">url</span>: <span class="hljs-string">"https://github.com"</span> });
    })
    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      chrome.DOM.getDocument(<span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">error</span>, params)</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>) {
          console.<span class="hljs-built_in">error</span>(params);
          <span class="hljs-keyword">return</span>;
        }
        const options = {
          <span class="hljs-name">nodeId</span>: params.root.nodeId,
          <span class="hljs-name">selector</span>: <span class="hljs-string">"img"</span>
        };
        chrome.DOM.querySelectorAll(options, <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">error</span>, params)</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>) {
            console.<span class="hljs-built_in">error</span>(params);
            <span class="hljs-keyword">return</span>;
          }
          params.nodeIds.forEach(nodeId =&gt; {
            const options = {
              <span class="hljs-name">nodeId</span>: nodeId
            };
            chrome.DOM.getAttributes(options, <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">error</span>, params)</span> =&gt;</span> {
              <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>) {
                console.<span class="hljs-built_in">error</span>(params);
                <span class="hljs-keyword">return</span>;
              }
              console.log(params.attributes);
            });
          });
        });
      });
    });
}).on(<span class="hljs-string">"error"</span>, err =&gt; {
  console.<span class="hljs-built_in">error</span>(err);
});</code></pre>
<p>最后会返回数组，看起来像酱紫：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [ 'src',
    'https://assets-cdn.github.com/images/modules/site/home-illo-conversation.svg',
    'alt',
    '',
    'width',
    '360',
    'class',
    'd-block width-fit mx-auto' ]
  [ 'src',
    'https://assets-cdn.github.com/images/modules/site/home-illo-chaos.svg',
    'alt',
    '',
    'class',
    'd-block width-fit mx-auto' ]
  [ 'src',
    'https://assets-cdn.github.com/images/modules/site/home-illo-business.svg',
    'alt',
    '',
    'class',
    'd-block width-fit mx-auto mb-4' ]
    ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[
  [ <span class="hljs-symbol">'src</span>',
    <span class="hljs-symbol">'https://assets-cdn.github.com/images/modules/site/home-illo-conversation.svg</span>',
    <span class="hljs-symbol">'alt</span>',
    '',
    <span class="hljs-symbol">'width</span>',
    <span class="hljs-symbol">'360</span>',
    <span class="hljs-symbol">'class</span>',
    <span class="hljs-symbol">'d-block</span> width-fit mx-auto' ]
  [ <span class="hljs-symbol">'src</span>',
    <span class="hljs-symbol">'https://assets-cdn.github.com/images/modules/site/home-illo-chaos.svg</span>',
    <span class="hljs-symbol">'alt</span>',
    '',
    <span class="hljs-symbol">'class</span>',
    <span class="hljs-symbol">'d-block</span> width-fit mx-auto' ]
  [ <span class="hljs-symbol">'src</span>',
    <span class="hljs-symbol">'https://assets-cdn.github.com/images/modules/site/home-illo-business.svg</span>',
    <span class="hljs-symbol">'alt</span>',
    '',
    <span class="hljs-symbol">'class</span>',
    <span class="hljs-symbol">'d-block</span> width-fit mx-auto mb-4' ]
    ...
]</code></pre>
<p>chrome-remote-interface 提供一套完整的API用于利用全量Chrome特性，更多使用方法参考：<a href="https://github.com/cyrus-and/chrome-remote-interface" rel="nofollow noreferrer" target="_blank">https://github.com/cyrus-and/...</a></p>
<h3 id="articleHeader6">总结</h3>
<p>Chrome Headless特性，不仅仅革新了原有格局，而且提高开发效率，降低使用门槛，对于经常使用爬虫、自动化测试前端童鞋来说简直是巨大福音，对于新童鞋来说也是一个新潮的玩具。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
技能树升级——Chrome Headless模式

## 原文链接
[https://segmentfault.com/a/1190000009071883](https://segmentfault.com/a/1190000009071883)

