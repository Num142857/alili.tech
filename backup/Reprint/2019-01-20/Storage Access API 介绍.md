---
title: 'Storage Access API 介绍' 
date: 2019-01-20 2:30:11
hidden: true
slug: b48o0opmsjm
categories: [reprint]
---

{{< raw >}}

            <h1><a href="https://webkit.org/blog/8124/introducing-storage-access-api/" title="Permanent Link: Introducing Storage Access API">介绍Storage Access API</a></h1>
<p>2018.2.21</p>
<p>作者：John Wilander</p>
<p><a href="https://twitter.com/johnwilander">@johnwilander</a></p>
<p>去年6月，我们推出了 <a href="https://webkit.org/blog/7675/intelligent-tracking-prevention/">Intelligent Tracking Prevention</a>（ITP）（智能防跟踪）。ITP 是一项隐私功能，可以检测可以跨站追踪用户的域（domains），并隔离该域的 cookie 或完全清除其站点数据。</p>
<p>在 ITP 上我们获得的最多的开发者反馈意见是，它需要为嵌入的跨站点内容提供一种方式来验证已登录当前站点的用户。Storage Access API 提供一个解决方案。它允许对嵌入内容进行验证的同时默认保护客户的隐私。</p>
<h2>隔离 cookies 和嵌入内容</h2>
<p>假设 socialexample.org 嵌入到多个网站上，可以让用户通过 socialexample 账户对内容评论或“点赞”。ITP 将检测到此类多次页面嵌入的情况，同时让 socialexample.org 能够追踪跨站点的用户，并拒绝 socialexample.org 的嵌入内容访问当前站点的 cookie，仅提供隔离的 cookie。这会禁止用户对内容评论和点赞，除非他们在过去 24 小时内曾直接登录过 socialexample.org 网站。（参阅 <a href="https://webkit.org/blog/7675/intelligent-tracking-prevention/">ITP 原博客文章</a> ，了解有关隔离 cookie 的详细规则。）</p>
<p>对嵌入的第三方支付服务和订阅服务中嵌入的第三方视频也是如此。只要 ITP 检测到他们的跟踪行为，就会拒绝他们在24小时之外访问当前站点的 cookie，并且嵌入的内容会将用户视为注销状态，即使此时用户已登录过。</p>
<p>我们对用户隐私进行了权衡。如果保护隐私的同时又能登录第三方 iframe（用户主动登录），那就更好了。</p>
<h2>解决方案：Storage Access API</h2>
<p>解决方案是当用户与当前网站交互时，允许第三方嵌入内容请求访问当前网站的 cookie 。为此，我们创造了 Storage Access API。</p>
<p>Storage Access API 为跨域 iframe 提供了两项新功能 —— document.hasStorageAccess() 和document.requestStorageAccess()。它还为嵌入的顶级 frame 提供了一个新的 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">iframe sandbox</a> token —— “allow-storage-access-by-user-activation”。</p>
<p>在这种情况下，Storage Access（存储可访问）意味着 iframe 可以访问宿主站点的 cookie，即它可以像宿主站点一样访问当前网站的 cookie。注意，<strong>storage access 不会以任何方式放宽同源策略</strong>。具体来说，这并不是指第三方 iframe 能访问宿主站点的 cookie 和存储，反之亦然。</p>
<p>现在，WebKit 对该 API 的实现仅包含 cookie。它不会影响其他存储形式的隔离，如 IndexedDB 或 LocalStorage。</p>
<h3>检查 Storage Access</h3>
<p>调用 document.hasStorageAccess() 会返回一个 promise，该 promise 使用布尔值来指示文档是否已经访问过宿主网站的 cookie。如果 iframe 与 顶级 frame 的同源，则 promise 将返回 true。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">document</span>.hasStorageAccess();
promise.then(
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">hasAccess</span>) </span>{
    <span class="hljs-comment">// 布尔值 hasAccess 表示当前 document 是否访问过</span>
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reason</span>) </span>{
    <span class="hljs-comment">// 由于某些问题 promise 处于 rejected 状态</span>
  }
);

</code></pre><h3>请求 Storage Access</h3>
<p>通过用户交互（如 tap 或 click）调用 document.requestStorageAccess() 会返回一个 promise，如果允许 storage access，则 promise 将被接收，如果访问被拒绝，则 promise 将被拒绝。如果允许 storage access ，则对 document.hasStorageAccess() 的调用将返回 true。而 iframe 需要显式调用此 API 的原因是为了让开发人员在 cookie 修改时也能操作。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeRequestWithUserGesture</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">document</span>.requestStorageAccess();
  promise.then(
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 允许 storage access</span>
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 拒绝 storage access</span>
    }
  );
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"makeRequestWithUserGesture()"</span>&gt;</span>Play video<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre><p>iframe 需要遵循一组规则才能获得 storage access 的权限。<strong>基本规则</strong>是：</p>
<ul>
<li>iframe 的 cookie 需要由 ITP 当场隔离。否则表示 iframe 已经具有 cookie 的访问权限，或由于 cookie 已被清除而不能获取权限。</li>
<li>iframe 是顶级 frame 的直系子项<code>（译注：非 iframe 嵌套的情况）</code>。</li>
<li>在 API 调用时，iframe 需要处理用户的交互。</li>
</ul>
<p>以下是调用 document.requestStorageAccess() 返回的 promise 的<strong>详细规则</strong>。当我们说 eTLD + 1时，指的是 effective top-level domain + 1（有效的顶级域名+1）。eTLD 指的是 .com 或 .co.uk，所以 social.co.uk 是 eTLD + 1 ，而 sub.social.co.uk （eTLD + 2）或 co.uk（只是 eTLD）不是。</p>
<ol>
<li>如果子 frame 是 sandboxed <code>（译注：指的是处于沙盒隔离状态）</code>，但没有 “allow-storage-access-by-user-activation” 和 “allow-same-origin” token，则 reject。</li>
<li>如果子 frame 的父级不是顶级 frame，则 reject。</li>
<li>如果浏览器未处理用户的交互，则 reject。</li>
<li>如果子 frame 的 eTLD + 1 等于顶级 frame 的 eTLD + 1，则 resolve。例如，login.socialexample.co.uk 与 <a href="http://www.socialexample.co.uk/">www.socialexample.co.uk</a> 具有相同的 eTLD + 1 。</li>
<li>如果子 frame 的原始 cookie 已被屏蔽，则 reject。这意味着 ITP 已经清空了原始网站的数据，或不久的将来会清空。因此没有 storage 可以访问。</li>
<li>如果以上全部通过了，则 resolve。</li>
</ol>
<h3>Access 移除</h3>
<p>只要文档的 frame 被 DOM 解析，那么在文档的整个生命周期内，storage access 都是允许的。即：</p>
<ul>
<li>在子 frame 导航时 Access 移除。</li>
<li>子 frame 与 DOM 分离时， Access 移除。</li>
<li>顶级 frame 导航时 Access 移除。</li>
<li>当网页消失时，如关闭标签，Access 移除。</li>
</ul>
<h3>沙盒 iframe</h3>
<p>如果宿主网站对 iframe 进行了沙盒处理，则默认情况下不能无 storage access 权限。宿主网站需要添加沙盒“allow-storage-access-by-user-activation”token 来允许 storage access 的请求。iframe 沙盒还需要“allow-scripts”和“allow-same-origin” token，否则它不能调用 API 并且不能在需要 cookie 的宿主站点中执行。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">sandbox</span>=<span class="hljs-string">"allow-storage-access-by-user-activation allow-scripts allow-same-origin"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>

</code></pre><h2>关于潜在的滥用说明</h2>
<p>我们决定在 iframe 调用 Storage Access API 时不提示用户，让用户体验尽可能流畅。ITP 规则是对谁可以获准访问的有效防护，并且目前我们依靠这些规则。</p>
<p>若我们对API的使用情况做监测，一旦发现有滥用的情况，即用户明显并不想在宿主 iframe 中获取认证操作，我们会对该 API 进行修改。此 API 更改后的行为可能是提示，滥用检测（会使 promise reject），站点 API 调用的速率限制等等。</p>
<h2>可用性</h2>
<p>Storage Access API 可在 iOS 11.3 beta 和 macOS High Sierra 10.13.4 beta 以及Safari Technology Preview 47+ 上的 Safari 11.1 中使用。如果您对跨浏览器兼容性感兴趣，请关注 <a href="https://github.com/whatwg/html/issues/3338">whatwg/html issue for Storage Access API</a>。</p>
<h2>反馈</h2>
<p>可在 <a href="http://bugs.webkit.org/">bugs.webkit.org</a> 报告错误，或者在 Twitter 上向团队 <a href="https://twitter.com/webkit">@webkit</a> 或布道人 <a href="https://twitter.com/jonathandavis">@jonathandavis</a> 发送反馈。如果你对 Storage Access API 的工作方式有技术问题，可以在 Twitter <a href="https://twitter.com/johnwilander">@johnwilander</a> 上找到我。</p>
<hr>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Storage Access API 介绍

## 原文链接
[https://www.zcfy.cc/article/a-href-https-webkit-org-blog-8124-introducing-storage-access-api-rel-bookmark-title-permanent-link-introducing-storage-access-api-introducing-storage-access-api-a](https://www.zcfy.cc/article/a-href-https-webkit-org-blog-8124-introducing-storage-access-api-rel-bookmark-title-permanent-link-introducing-storage-access-api-introducing-storage-access-api-a)

