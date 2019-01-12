---
title: '如何在vscode里将px转rem，而且还得爽！' 
date: 2019-01-13 2:30:11
hidden: true
slug: 8vlbrol3pjk
categories: [reprint]
---

{{< raw >}}

                    
<p>自从新版移动端IM界面改用rem适配，效果实在太棒了。所以，接下来的主要工作会将一些核心页面，也从px向rem转移。</p>
<p>然，一直用惯了VSCODE，再加上设计稿等诸多原因，如果真想一下子从rem上编码着实还是很困难。因此，一般而言，都是先订一个基准大小，最后根据这个大小进行转换。</p>
<p>可是，搜遍了整个VSCODE市场，实在找不到一个能够满足我风格的方案，至少得这样：</p>
<ul>
<li>输入 12px &gt; <code>Tab</code> &gt; .1rem</li>
<li>整个文档进行转换</li>
</ul>
<p>故，造了一个轮子，名曰：<a href="https://marketplace.visualstudio.com/items?itemName=cipchk.cssrem" rel="nofollow noreferrer" target="_blank">cssrem</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bVOgwK?w=467&amp;h=243" src="https://static.alili.tech/img/bVOgwK?w=467&amp;h=243" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">配置</h1>
<p>默认基准 <code>font-size: 16px</code>，但你可以通过以下配置进行修改：</p>
<p>打开 <code>ctrl+,</code> 用户配置界面（或项目配置），只有三个配置项：</p>
<ul>
<li>
<code>cssrem.rootFontSize</code> 基准font-size（单位：px），默认：16。</li>
<li>
<code>cssrem.fixedDigits</code> px转rem小数点最大长度，默认：6。</li>
<li>
<code>cssrem.autoRemovePrefixZero</code> 自动移除0开头的前缀，默认：true。（至少我不想看到<br><strong>0</strong> 默认是去掉的）</li>
</ul>
<h1 id="articleHeader1">VSCODE插件开发</h1>
<p>本来文章可以结束了，但是又想好像VSCODE自己开发插件又简单、又很爽，不得再码几字。</p>
<p><a href="https://code.visualstudio.com/docs/extensions/overview" rel="nofollow noreferrer" target="_blank">插件开发指南</a> 写得非常细，虽然都是英文的，但看起来不会很累。我想最麻烦可能是对各种接口的认知了。</p>
<p>如果你对Typescript很熟的话，那么开发vscode插件也信手拈来，再简单不过。</p>
<p>而cssrem最核心是如何实现动态创建Snippet，就是实现 <code>CompletionItemProvider</code> 接口就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class CssRemProvider implements vscode.CompletionItemProvider {

    provideCompletionItems (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {

        return new Promise((resolve, reject) => {
            // 构建一个Snippet
            const item = new vscode.CompletionItem(`${res.pxValue}px -> ${res.rem}`, vscode.CompletionItemKind.Snippet);
            // 指定要插入的新文本
            item.insertText = res.rem;
            return resolve([item]);

        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> CssRemProvider <span class="hljs-keyword">implements</span> vscode.CompletionItemProvider {

    provideCompletionItems (<span class="hljs-built_in">document</span>: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable&lt;vscode.CompletionItem[]&gt; {

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            <span class="hljs-comment">// 构建一个Snippet</span>
            <span class="hljs-keyword">const</span> item = <span class="hljs-keyword">new</span> vscode.CompletionItem(<span class="hljs-string">`<span class="hljs-subst">${res.pxValue}</span>px -&gt; <span class="hljs-subst">${res.rem}</span>`</span>, vscode.CompletionItemKind.Snippet);
            <span class="hljs-comment">// 指定要插入的新文本</span>
            item.insertText = res.rem;
            <span class="hljs-keyword">return</span> resolve([item]);

        });
    }
}</code></pre>
<p>如果想了解 [cssrem] 更多细节可以参考 github <a href="https://github.com/cipchk/vscode-cssrem" rel="nofollow noreferrer" target="_blank">源码</a>。</p>
<p>以上！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在vscode里将px转rem，而且还得爽！

## 原文链接
[https://segmentfault.com/a/1190000009572846](https://segmentfault.com/a/1190000009572846)

