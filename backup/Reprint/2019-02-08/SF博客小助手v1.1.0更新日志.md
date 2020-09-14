---
title: 'SF博客小助手v1.1.0更新日志' 
date: 2019-02-08 2:30:40
hidden: true
slug: 8gzuzw7tuws
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>我是在第一个版本发布了之后的第二天才发现这个bug的，因为<a href="https://segmentfault.com">segmentfault</a>每天只允许发表10篇博文，而我，不知道。   <br>因为最早的时候，这个项目我从未想着对外发布，但是嘛，入乡随俗，<code>javascript</code>就这风气，随便写个东西都想开源。  <br>正因为此，导致一个非常高危的安全隐患。  <br>令我悲伤的是，这么明显的bug，竟然没人向我反馈，这证明了，我写个这个破玩意儿，根本没人用。  <br>好吧，不管如何我都要修复它，谁让我是有个有责任心的好青年呢。</p>
<h2 id="articleHeader1">更新日志</h2>
<h3 id="articleHeader2">安全加强</h3>
<p>这个seession最早是我自己的，这也就意味着其他人通过我的seesion可以操作我账号的所有权限，比如删完我所有的博客，删完我所有的答案，甚至发表几条招嫖广告等。幸而我每次都手动退出账号，不然以上可就真的成真喽。  <br>虽然如此，但我发出去之后用的人就没有这么幸运了。他们的账号随时有可能被盗用。  <br>当然，不是被我盗用。</p>
<h3 id="articleHeader3">全新拟人操作</h3>
<p>虽然<a href="https://segmentfault.com" target="_blank">segmentfault</a>没有对此做处理(我相信也不会)，但为了逻辑清晰，我还是重新实现了业务逻辑。</p>
<ol>
<li><p><code>访问首页</code>  <br>为了获取<code>token</code>和<code>seesion</code>。为此我已完整分析出其<code>token</code>算法，实现了自由的登陆和退出。</p></li>
<li><p><code>登陆</code>  <br>通过动态获取的<code>token</code>和<code>seesion</code>进行登陆操作，给<code>token</code>授权。</p></li>
<li><p><code>发表博文</code>  <br>核心操作，未来支持更多业务逻辑。</p></li>
<li><p><code>退出</code>。  <br>释放<code>token</code>和<code>seesion</code>，给服务器减轻压力。同时保证账号的安全。</p></li>
</ol>
<h3 id="articleHeader4">模块化重构</h3>
<p>为了以后的扩展，我对此项目实现了模块化。模块的划分依据<a href="https://segmentfault.com">segmentfault</a>官方的划分，比如其<code>user</code>模块下所有操作也由我的<code>user</code>来完成,<code>user/login</code>则有<code>user</code>模块下的<code>login</code>函数来处理。</p>
<h3 id="articleHeader5">命令支持</h3>
<p>你现在再也不需要通过恼人的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node index &quot;test.md&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">node index <span class="hljs-string">"test.md"</span></code></pre>
<p>来发表博客了。</p>
<p>如果你使用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install sfbloger -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install sfbloger -g</code></pre>
<p>来安装，你可以通过</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sfbloger &quot;test.md&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">sfbloger <span class="hljs-string">"test.md"</span></code></pre>
<p>来快速的完成文章的发表。</p>
<h3 id="articleHeader6">tag优化</h3>
<p>现在使用非热门<code>tag</code>时，将会重置为<code>other</code>而非<code>windows</code>。</p>
<h2 id="articleHeader7">预览</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sfbloger segmentfault博客小助手.md
正在申请token...
token申请成功...
开始登陆...
登陆成功,开始发表.
发表成功.
地址是:https://segmentfault.com/a/12312311231
安全退出.." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ sfbloger segmentfault博客小助手.md
正在申请token...
token申请成功...
开始登陆...
登陆成功,开始发表.
发表成功.
地址是:https://segmentfault.com/a/12312311231
安全退出..</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SF博客小助手v1.1.0更新日志

## 原文链接
[https://segmentfault.com/a/1190000005820591](https://segmentfault.com/a/1190000005820591)

