---
title: '第三方 CSS 并不安全' 
date: 2019-01-24 2:30:11
hidden: true
slug: xh1hdhpnkc
categories: [reprint]
---

{{< raw >}}

            <h1>第三方 CSS 并不安全</h1>
<p>发布于 2018.2.27</p>
<p>最近一段时间，关于 <a href="https://github.com/maxchehab/CSS-Keylogging">通过 CSS 创建 “keylogger”（键盘记录器）</a> 的讨论很多。</p>
<p>有些人呼吁浏览器厂商去“修复”它。有些人则深入研究，表示它仅能影响通过类 React 框架建立的网站，并指责 React。而真正的问题却在于认为第三方内容是“安全”的。</p>
<h2>第三方图片</h2>
<pre><code class="hljs routeros">&lt;img <span class="hljs-attribute">src</span>=<span class="hljs-string">"https://example.com/kitten.jpg"</span>&gt;

</code></pre><p>如果我将上述代码引入我的文件中，即表示信任 <code>example.com</code>。对方可能会删除资源，给我一个 404，导致网站不完整，从而破坏这种信任关系。或者，他们可能会用其他非预期的数据来替代小猫图片的数据。</p>
<p>但是，图片的影响仅限于元素本身的内容区域。我可以向用户解释并希望用户相信，“此处的内容来自 <code>example.com</code>，如果它有误，则是原站点的问题，并不是本站造成的”。但这个问题肯定不会影响到密码输入框等内容。</p>
<h2>第三方脚本</h2>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://example.com/script.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>与图片相比，第三方脚本则有更多的控制权。如果我将上述代码引入我的文件中，则表示我赋予了 <code>example.com</code> 完全控制我的网站的权限。该脚本能：</p>
<ul>
<li>读取/修改页面内容。</li>
<li>监听用户的所有交互。</li>
<li>运行耗费大量计算资源的代码（如 cryptocoin 挖矿程序）。</li>
<li>通过向本站发请求，这样能附带用户的 cookie，转发响应。<code>（译注：盗取用户的 cookie 及其他数据）</code></li>
<li>读取/修改本地存储。</li>
<li>......可以做任何对方想做的事情。</li>
</ul>
<p>“本地存储”非常重要。如果脚本通过 IndexedDB 或缓存 API 发起攻击，则即使在删除脚本后，攻击仍可能在整个站点内继续存在。</p>
<p>如果你引入了其他站点的脚本，则必须绝对相信对方及对方的防护能力。</p>
<p>如果你遭到恶意脚本的攻击，则可设置 <a href="https://w3c.github.io/webappsec-clear-site-data/"> Clear-Site-Data header（清空站点数据响应头）</a> 清除站点所有数据。</p>
<h2>第三方CSS</h2>
<pre><code class="hljs routeros">&lt;link <span class="hljs-attribute">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attribute">href</span>=<span class="hljs-string">"https://example.com/style.css"</span>&gt;

</code></pre><p>相比图片，CSS 在能力上更接近脚本。像脚本一样，它适用于整个页面。它可以：</p>
<ul>
<li>删除/添加/修改页面内容。</li>
<li>根据页面内容发起请求。</li>
<li>可响应多种用户交互。</li>
</ul>
<p>虽然 CSS 不能修改本地存储，也不能通过 CSS 运行 cryptocoin 挖矿程序（也许是可能的，只是我不知道而已），但恶意 CSS 代码仍然能造成很大的损失。</p>
<h3>键盘记录器</h3>
<p>从引起广泛关注的代码开始讲起：</p>
<pre><code class="hljs markdown">input[<span class="hljs-string">type="password"</span>][<span class="hljs-symbol">value$="p"</span>] {
  background: url('/password?p');
}

</code></pre><p>如果输入框的 <code>value</code> 属性值以 <code>p</code> 结尾，上述代码将会向 <code>/password?p</code> 发起请求。每个字符都可触发这个操作，通过它能获取到很多数据。</p>
<p>默认情况下，浏览器不会将用户输入的值存储在 <code>value</code> 属性中，因此这种攻击需要依赖某些能同步这些值的东西，如 React。</p>
<p>要应对这个问题，React 可用另一种同步密码字段的方式，或浏览器可限制那些能匹配密码字段属性的选择器。但是，这仅仅是一种虚假的安全。你只解决了在特殊情况下的该问题，而其他情况依旧。</p>
<p>如果 React 改为使用 <code>data-value</code> 属性，则该应对方法无效。如果网站将输入框更改为 <code>type="text"</code>，以便用户可以看到他们正在输入的内容，则该应对方法无效。如果网站创建了一个 <code>&lt;better-password-input&gt;</code>  组件并暴露 <code>value</code> 作为属性，则该应对方法无效。</p>
<p>此外，还有很多其他的基于 CSS 的攻击方式：</p>
<h3>消失的内容</h3>
<pre><code class="hljs css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">display</span>: none;
}

<span class="hljs-selector-tag">html</span><span class="hljs-selector-pseudo">::after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">'HTTP 500 Server Error'</span>;
}

</code></pre><p>以上是一个极端的例子，但想象一下，如果第三方仅对某一小部分用户这样做。不但你很难调试，还会失去用户的信任。</p>
<p>更狡猾的方式如偶尔删除“购买”按钮，或重排内容段落。</p>
<h3>添加内容</h3>
<pre><code class="hljs css"><span class="hljs-selector-class">.price-value</span><span class="hljs-selector-pseudo">::before</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">'1'</span>;
}

</code></pre><p>哦，价格被标高了。</p>
<h3>移动内容</h3>
<pre><code class="hljs css"><span class="hljs-selector-class">.delete-everything-button</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">500px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">300px</span>;
}

</code></pre><p>上面的按钮能做一些重要的操作，设置其为不可见，然后放在用户可能点击的地方。</p>
<p>值得庆幸的是，如果按钮的操作确实非常重要，网站可能会先显示确认对话框。但也不是不可绕过，只需使用更多的 CSS 来欺骗用户点击 “确定” 按钮而不是“取消”按钮即可。</p>
<p>假设浏览器确实采用上面的应对方法解决“键盘记录器”的问题。攻击者只需在页面上找到一个非密码文本输入框（可能是搜索输入框）并将其盖在密码输入框上即可。然后他们的攻击就又可用了。</p>
<h3>读取属性</h3>
<p>其实，你需要担心的不仅仅是密码输入框。你可能在属性中保存着其他的隐藏内容：</p>
<pre><code class="hljs stylus">&lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"hidden"</span> name=<span class="hljs-string">"csrf"</span> value=<span class="hljs-string">"1687594325"</span>&gt;
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"/avatars/samanthasmith83.jpg"</span>&gt;
&lt;<span class="hljs-selector-tag">iframe</span> src=<span class="hljs-string">"//cool-maps-service/show?st-pancras-london"</span>&gt;&lt;/iframe&gt;
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"/gender-icons/female.png"</span>&gt;
&lt;div&gt;&lt;/div&gt;

</code></pre><p>所有这些都可以通过 CSS 选择器获取，且能发出请求。</p>
<h3>监听交互</h3>
<pre><code class="hljs css"><span class="hljs-selector-class">.login-button</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'/login-button-hover'</span>);
}

<span class="hljs-selector-class">.login-button</span><span class="hljs-selector-pseudo">:active</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'/login-button-active'</span>);
}

</code></pre><p>可将 hover 和 active 状态发送到服务器。通过适当的 CSS，你就能获取到用户意图。</p>
<h3>读取文本</h3>
<pre><code class="hljs css">@<span class="hljs-keyword">font-face</span> {
  <span class="hljs-attribute">font-family</span>: blah;
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'/page-contains-q'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'woff'</span>);
  <span class="hljs-attribute">unicode-range</span>: U+<span class="hljs-number">85</span>;
}

<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-family</span>: blah, sans-serif;
}

</code></pre><p>在这种情况下，如果页面内有 <code>q</code> 字符，则会发送请求。你可以为不同的字符，并针对特定的元素，创建大量不同的字体。字体也可以包含 ligature（连字），所以你可以在开始检测字符序列。你甚至可以通过  <a href="https://gist.github.com/securityMB/d9e84bd3c7c245895360808360b9dc4e">将字体技巧与滚动条检测结合起来</a> 来推断内容。</p>
<p><code>译注：关于 ligature（连字）, 可查看</code> <a href="https://en.wikipedia.org/wiki/Typographic_ligature">Wikipedia Typographic Ligature </a></p>
<h2>第三方内容不安全</h2>
<p>这些只是我所知道的一些技巧，我相信还有更多。</p>
<p>第三方内容在其沙箱区域内具有强大的能力。一张图片或沙盒化的 iframe 仅在一个小范围内的沙箱中，但脚本和样式的范围却是你的页面，甚至是整个站点。</p>
<p>如果你担心恶意用户诱使你的网站加载第三方资源，可以通过  <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">CSP</a>  用作防护手段，其可以限制加载图片，脚本和样式的来源。</p>
<p>你还可以使用 <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity">Subresource Integrity（子资源完整性 ）</a> 来确保脚本/样式的内容匹配特定的 hash，否则将不加载。感谢 <a href="https://news.ycombinator.com/item?id=16474151">Hacker News上的Piskvorrr</a> 提醒我！</p>
<p>如果你想了解更多如上述的 hack 技巧，包括滚动条技巧，更多信息请参阅 <a href="https://vimeo.com/100264064#t=1290s">Mathias Bynens' talk from 2014</a>，<a href="https://www.youtube.com/watch?v=eb3suf4REyI">Mike West's talk from 2013</a>，或 <a href="http://www.nds.rub.de/media/emma/veroeffentlichungen/2012/08/16/scriptlessAttacks-ccs2012.pdf">Mario Heiderich et al.'s paper from 2012</a>（PDF）。是的，这不是什么新东西。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
第三方 CSS 并不安全

## 原文链接
[https://www.zcfy.cc/article/third-party-css-is-not-safe](https://www.zcfy.cc/article/third-party-css-is-not-safe)

