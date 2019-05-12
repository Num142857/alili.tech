---
title: 'Chrome 66 新增异步剪贴板 API' 
date: 2018-12-10 2:30:07
hidden: true
slug: azftxeizhhh
categories: [reprint]
---

{{< raw >}}

                    
<p>在过去的几年里我们只能使用 <a href="https://developers.google.com/web/updates/2015/04/cut-and-copy-commands" rel="nofollow noreferrer" target="_blank"><code>document.execCommand</code></a> 来操作剪贴板。不过，这种操作剪贴板的操作是同步的，并且只能读取和写入 DOM。</p>
<p>现在 Chrome 66 已经支持了新的 <a href="https://www.w3.org/TR/clipboard-apis/#async-clipboard-api" rel="nofollow noreferrer" target="_blank">Async Clipboard API</a>，作为 <code>execCommand</code> 替代品。</p>
<p>这个新的 Async Clipboard API 还可以使用 Promise 来简化剪贴板事件并将它们与 Drag-&amp;-Drop API 一起使用。</p>
<p>演示视频：<a href="https://zhuanlan.zhihu.com/p/34698155" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p>
<h2 id="articleHeader0">复制：将文本写入剪贴板</h2>
<p><code>writeText()</code> 可以把文本写入剪切板。<code>writeText()</code> 是异步的，它返回一个 Promise：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.clipboard.writeText('要复制的文本')
  .then(() => {
    console.log('文本已经成功复制到剪切板');
  })
  .catch(err => {
    // This can happen if the user denies clipboard permissions:
    // 如果用户没有授权，则抛出异常
    console.error('无法复制此文本：', err);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">navigator.clipboard.writeText(<span class="hljs-string">'要复制的文本'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'文本已经成功复制到剪切板'</span>);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-comment">// This can happen if the user denies clipboard permissions:</span>
    <span class="hljs-comment">// 如果用户没有授权，则抛出异常</span>
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'无法复制此文本：'</span>, err);
  });</code></pre>
<p>还可以使用<a href="http://esnext.justjavac.com/proposal/ecmascript-asyncawait.html" rel="nofollow noreferrer" target="_blank">异步函数</a> 的 <code>async</code> 和 <code>await</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function copyPageUrl() {
  try {
    await navigator.clipboard.writeText(location.href);
    console.log('Page URL copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyPageUrl</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> navigator.clipboard.writeText(location.href);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Page URL copied to clipboard'</span>);
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Failed to copy: '</span>, err);
  }
}</code></pre>
<h2 id="articleHeader1">粘贴：从剪贴板中读取文本</h2>
<p>和复制一样，可以通过调用 <code>readText()</code> 从剪贴板中读取文本，该函数也返回一个 Promise：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.clipboard.readText()
  .then(text => {
    console.log('Pasted content: ', text);
  })
  .catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">navigator.clipboard.readText()
  .then(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Pasted content: '</span>, text);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Failed to read clipboard contents: '</span>, err);
  });</code></pre>
<p>为了保持一致性，下面是等效的异步函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getClipboardContents() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClipboardContents</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> text = <span class="hljs-keyword">await</span> navigator.clipboard.readText();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Pasted content: '</span>, text);
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Failed to read clipboard contents: '</span>, err);
  }
}</code></pre>
<h2 id="articleHeader2">处理粘贴事件</h2>
<p>有计划推出检测剪贴板更改的新事件，但现在最好使用“粘贴”事件。它很适合用于阅读剪贴板文本的新异步方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('paste', event => {
  event.preventDefault();
  navigator.clipboard.readText().then(text => {
    console.log('Pasted text: ', text);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'paste'</span>, event =&gt; {
  event.preventDefault();
  navigator.clipboard.readText().then(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Pasted text: '</span>, text);
  });
});</code></pre>
<h2 id="articleHeader3">安全和权限</h2>
<p>剪贴板访问一直为浏览器带来安全问题。如果没有适当的权限，页面可能会悄悄地将所有恶意内容复制到用户的剪贴板，粘贴时会产生灾难性的结果。想象一下，一个网页，静静地复制 <code>rm -rf /</code> 或<a href="http://www.aerasec.de/security/advisories/decompression-bomb-vulnerability.html" rel="nofollow noreferrer" target="_blank">解压缩炸弹图像</a>到剪贴板。</p>
<p>让网页不受限制地读取剪贴板更加麻烦。用户经常将敏感信息（如密码和个人详细信息）复制到剪贴板，然后可以通过任何页面阅读，而用户根本无法察觉。</p>
<p>与许多新的 API 一样，<a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard" rel="nofollow noreferrer" target="_blank"><code>navigator.clipboard</code></a> 仅支持通过 HTTPS 提供的页面。为了防止滥用，只有当页面处于活动选项卡时才允许剪贴板访问。活动选项卡中的页面可以在不请求权限的情况下写入剪贴板，但从剪贴板中读取始终需要权限。</p>
<p>为了更容易，复制和粘贴的两个新权限已添加到 <a href="https://developers.google.com/web/updates/2015/04/permissions-api-for-the-web" rel="nofollow noreferrer" target="_blank">Permissions API</a> 中。当页面处于活动选项卡时，clipboard-write 权限会自动授予页面。当您通过从剪贴板中读取数据时，则必须要求获取 clipboard-read 权限。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ name: 'clipboard-read' }
{ name: 'clipboard-write' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{ <span class="hljs-attr">name</span>: <span class="hljs-string">'clipboard-read'</span> }
{ <span class="hljs-attr">name</span>: <span class="hljs-string">'clipboard-write'</span> }</code></pre>
<p>&lt;img width="405" alt="prompt" src="<a href="https://user-images.githubusercontent.com/359395/37577995-b7d86458-2b70-11e8-8c7e-3c47b302546b.png&amp;quot" rel="nofollow noreferrer" target="_blank">https://user-images.githubuse...</a>;&gt;</p>
<p>与使用权限 API 的任何其它内容一样，可以检查您的应用是否具有与剪贴板交互的权限：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="navigator.permissions.query({
  name: 'clipboard-read'
}).then(permissionStatus => {
  // permissionStatus.state 的值是 'granted'、'denied'、'prompt':
  console.log(permissionStatus.state);

  // 监听权限状态改变事件
  permissionStatus.onchange = () => {
    console.log(permissionStatus.state);
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">navigator.permissions.query({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'clipboard-read'</span>
}).then(<span class="hljs-function"><span class="hljs-params">permissionStatus</span> =&gt;</span> {
  <span class="hljs-comment">// permissionStatus.state 的值是 'granted'、'denied'、'prompt':</span>
  <span class="hljs-built_in">console</span>.log(permissionStatus.state);

  <span class="hljs-comment">// 监听权限状态改变事件</span>
  permissionStatus.onchange = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(permissionStatus.state);
  };
});</code></pre>
<p>以下是剪贴板 API 的“异步”部分真正派上用场的地方：尝试读取或写入剪贴板数据将自动提示用户获得权限（如果尚未授予）。由于 API 是基于 Promise 的，所以如果用户拒绝剪贴板权限时，Promise 将被 reject，因此页面可以适当地作出响应。</p>
<p>因为只有当页面是当前活动选项卡时，Chrome 才允许剪贴板访问，因此如果直接粘贴到 DevTools 中，则会发现这里的一些示例运行不正确，因为此时 DevTools 本身是活动选项卡（页面不是活动选项卡）。有一个技巧：我们需要使用 setTimeout 推迟剪贴板访问，然后在调用函数之前快速单击页面内部以使页面获取焦点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(async () => {
  const text = await navigator.clipboard.readText();
  console.log(text);
}, 2000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">setTimeout(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> text = <span class="hljs-keyword">await</span> navigator.clipboard.readText();
  <span class="hljs-built_in">console</span>.log(text);
}, <span class="hljs-number">2000</span>);</code></pre>
<h2 id="articleHeader4">回顾</h2>
<p>在引入异步剪贴板 API 之前，我们在 Web 浏览器中混合了不同的复制和粘贴实现。</p>
<p>在大多数浏览器中，可以使用 <code>document.execCommand('copy')</code> 和触发浏览器自己的复制和粘贴 <code>document.execCommand('paste')</code>。如果要复制的文本是不存在于 DOM 中的字符串，我们必须将其插入到 DOM 中并选择它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="button.addEventListener('click', e => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  const result = document.execCommand('copy');
  if (result === 'unsuccessful') {
    console.error('Failed to copy text.');
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">button.addEventListener(<span class="hljs-string">'click'</span>, e =&gt; {
  <span class="hljs-keyword">const</span> input = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'input'</span>);
  <span class="hljs-built_in">document</span>.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  <span class="hljs-keyword">const</span> result = <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>);
  <span class="hljs-keyword">if</span> (result === <span class="hljs-string">'unsuccessful'</span>) {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Failed to copy text.'</span>);
  }
})</code></pre>
<p>同样，以下是您如何在不支持新的 Async Clipboard API 的浏览器中处理粘贴的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('paste', e => {
  const text = e.clipboardData.getData('text/plain');
  console.log('Got pasted text: ', text);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'paste'</span>, e =&gt; {
  <span class="hljs-keyword">const</span> text = e.clipboardData.getData(<span class="hljs-string">'text/plain'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Got pasted text: '</span>, text);
})</code></pre>
<p>在 Internet Explorer 中，我们也可以通过 <code>window.clipboardData</code> 访问剪贴板。如果在用户手势内进行访问（例如点击事件） - <a href="https://developers.google.com/web/fundamentals/native-hardware/user-location/#ask_permission_responsibly" rel="nofollow noreferrer" target="_blank">以负责任的方式请求权限</a>的一部分 - 则不显示权限提示。</p>
<h2 id="articleHeader5">检测和回退</h2>
<p>在支持所有浏览器的同时，使用功能检测来利用异步剪贴板是个不错的主意。您可以通过检查 <code>navigator.clipboard</code> 来检测对 Async Clipboard API 的支持：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('paste', async e => {
  let text;
  if (navigator.clipboard) {
    text = await navigator.clipboard.readText()
  }
  else {
    text = e.clipboardData.getData('text/plain');
  }
  console.log('Got pasted text: ', text);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'paste'</span>, <span class="hljs-keyword">async</span> e =&gt; {
  <span class="hljs-keyword">let</span> text;
  <span class="hljs-keyword">if</span> (navigator.clipboard) {
    text = <span class="hljs-keyword">await</span> navigator.clipboard.readText()
  }
  <span class="hljs-keyword">else</span> {
    text = e.clipboardData.getData(<span class="hljs-string">'text/plain'</span>);
  }
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Got pasted text: '</span>, text);
});</code></pre>
<h2 id="articleHeader6">异步剪贴板 API 的下一步是什么？</h2>
<p>正如你可能已经注意到的那样，这篇文章只涵盖了 <code>navigator.clipboard</code> 的文本部分。规范中有更多的通用 <code>read()</code> 和 <code>write()</code> 方法，但是这些会带来额外的实现复杂性和安全性问题（请记住那些图像炸弹？）。目前，Chrome 正在推出更简单的 API 文本部分。</p>
<h2 id="articleHeader7">更多信息</h2>
<ul>
<li><a href="https://www.chromestatus.com/feature/5861289330999296" rel="nofollow noreferrer" target="_blank">Chrome 平台状态</a></li>
<li><a href="https://github.com/GoogleChrome/samples/tree/gh-pages/async-clipboard" rel="nofollow noreferrer" target="_blank">代码示例</a></li>
<li><a href="https://w3c.github.io/clipboard-apis/" rel="nofollow noreferrer" target="_blank">API</a></li>
<li><a href="https://github.com/w3c/clipboard-apis/blob/master/explainer.adoc" rel="nofollow noreferrer" target="_blank">解释</a></li>
<li><a href="https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/epeaao7l13M" rel="nofollow noreferrer" target="_blank">实施方案</a></li>
<li><a href="https://discourse.wicg.io/t/proposal-modern-asynchronous-clipboard-api/1513" rel="nofollow noreferrer" target="_blank">讨论</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chrome 66 新增异步剪贴板 API

## 原文链接
[https://segmentfault.com/a/1190000013826937](https://segmentfault.com/a/1190000013826937)

