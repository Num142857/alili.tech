---
title: '用electron写桌面应用' 
date: 2019-02-13 2:31:22
hidden: true
slug: g7ogf7f5vil
categories: [reprint]
---

{{< raw >}}

                    
<p>说起桌面应用，想必大家使用过的就已经海了去了。什么暴风影音、QQ、skype之类的，早已不是新鲜事！不过大家有没有了解过如何编写一个桌面应用？历史上，我们都有哪些方式去编写桌面应用呢？</p>
<p>实际上，桌面应用的历史并不算久远，不去查找各种资料，仅凭记忆，我能想到的曾经出现过的桌面应用编写语言就有：<code>C++</code>、<code>Delphi</code>、<code>VB</code>、<code>winForm</code>、<code>WPF</code>、<code>swing</code>、<code>awt</code>、<code>QT</code>、<code>flash</code>、<code>Objective-C</code>、<code>Swift</code>...或许还有更多。</p>
<p>学习成本是不是有点高？这么多语言\技术！！如果你恰好还碰到了一个吹毛求疵的老板或者PM，他就是那么迫切的希望自己的app能够多平台发布(也不管在那些平台上是否有客户)，作为程序员的你，肿么办？是勇挑大梁，然后各技术栈学习失败，最终自尽以谢老板？还是果断离开？</p>
<p>当然都不是，够懒的程序员应该寻找更容易实现，又能满足老板需求的解决方案。那么，我们来看看今天的话题，<a href="http://electron.atom.io/" rel="nofollow noreferrer" target="_blank">electron</a>吧！</p>
<h2 id="articleHeader0">electron是什么？</h2>
<p><span class="img-wrap"><img data-src="/img/bVtvmV" src="https://static.alili.tech/img/bVtvmV" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>根据官网的描述，<code>electron</code>是一种可以使用网页技术来开发跨平台桌面应用的解决方案！感受一下，用你已知的技巧<code>html</code>、<code>javascript</code>、<code>css</code>就能写桌面应用，是不是想想就有点儿小激动？！</p>
<h2 id="articleHeader1">谁在用electron？</h2>
<p>著名的前端界IDE<a href="https://atom.io/" rel="nofollow noreferrer" target="_blank">Atom</a>就是使用<code>electron</code>编写的，震颤了有不有？</p>
<p>看看还有哪些著名的应用是基于<code>electron</code>编写的：</p>
<p><span class="img-wrap"><img data-src="/img/bVtvmW" src="https://static.alili.tech/img/bVtvmW" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>那么接下来，让我开始吧！</p>
<h2 id="articleHeader2">准备工作</h2>
<ul>
<li><p>安装<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">nodejs</a></p></li>
<li><p>安装<a href="http://yeoman.io/" rel="nofollow noreferrer" target="_blank">yeoman</a></p></li>
</ul>
<h2 id="articleHeader3">使用程序生成器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g generator-electron-naive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g generator-electron-naive</code></pre>
<blockquote><p>如果使用<code>unix like</code>操作系统，请在命令前加<code>sudo</code></p></blockquote>
<h2 id="articleHeader4">创建项目</h2>
<p>那么我就先来一个简单的叫<code>todo</code>小应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yo electron-naive" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">yo electron-naive</span></code></pre>
<p>当键入上述命令后，生成器会有一系列问题问你，按需回答即可：</p>
<p><span class="img-wrap"><img data-src="/img/bVtvm6" src="https://static.alili.tech/img/bVtvm6" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>问题中的<code>Use remote URL</code>是指，是否想直接加载一个远程的URL？如果选"是"，那么会再要求你输入精确地址</p></blockquote>
<h2 id="articleHeader5">调试</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd todo
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell">cd todo
npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>上述命令操作完后，会有如下应用界面打开：</p>
<p><span class="img-wrap"><img data-src="/img/bVtvnc" src="https://static.alili.tech/img/bVtvnc" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>找到<code>todo/src/index.html</code>，用你喜欢的IDE打开，然后拷贝如下代码覆盖<code>index.html</code>原先的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>TODO</title>
    </head>
    <body>
        <ul id=&quot;todolist&quot;></ul>
        <form action=&quot;#&quot; method=&quot;post&quot;>
            <div>
                <label for=&quot;newitem&quot;>Add item</label>
                <input type=&quot;text&quot; name=&quot;newitem&quot; id=&quot;newitem&quot; placeholder=&quot;new item&quot; />
                <input type=&quot;submit&quot; value=&quot;Add&quot; />
            </div>
        </form>

        <script>

            var todo = document.querySelector('#todolist'),
            form = document.querySelector('form'),
            field = document.querySelector('#newitem');

            form.addEventListener('submit', function(ev) {
                var text = field.value;
                if (text !== '') {
                    todo.innerHTML += '<li>' + text + '</li>';
                    field.value = '';
                    field.focus();
                }
                ev.preventDefault();
            }, false);

            todo.addEventListener('click', function(ev) {
                var t = ev.target;
                if (t.tagName === 'LI') {
                    t.parentNode.removeChild(t);
                };
                ev.preventDefault();
            }, false);

        </script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>TODO<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"todolist"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"newitem"</span>&gt;</span>Add item<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"newitem"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"newitem"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"new item"</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Add"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

            <span class="hljs-keyword">var</span> todo = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#todolist'</span>),
            form = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'form'</span>),
            field = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#newitem'</span>);

            form.addEventListener(<span class="hljs-string">'submit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
                <span class="hljs-keyword">var</span> text = field.value;
                <span class="hljs-keyword">if</span> (text !== <span class="hljs-string">''</span>) {
                    todo.innerHTML += <span class="hljs-string">'&lt;li&gt;'</span> + text + <span class="hljs-string">'&lt;/li&gt;'</span>;
                    field.value = <span class="hljs-string">''</span>;
                    field.focus();
                }
                ev.preventDefault();
            }, <span class="hljs-literal">false</span>);

            todo.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
                <span class="hljs-keyword">var</span> t = ev.target;
                <span class="hljs-keyword">if</span> (t.tagName === <span class="hljs-string">'LI'</span>) {
                    t.parentNode.removeChild(t);
                };
                ev.preventDefault();
            }, <span class="hljs-literal">false</span>);

        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>再来看我们app界面，变成了如下样子：</p>
<p><span class="img-wrap"><img data-src="/img/bVtvnl" src="https://static.alili.tech/img/bVtvnl" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">生成应用程序包</h2>
<p>之前生成项目的过程中，在“Which platform you'd like to package to?”这个问题里，你可选择将来要支持的操作系统，以便生成相应的打包代码。</p>
<p>那么现在我们就来生成一个程序包吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dist" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dist</span></code></pre>
<p>最后生成的可执行程序出就现在了如下位置：</p>
<p><span class="img-wrap"><img data-src="/img/bVtvnm" src="https://static.alili.tech/img/bVtvnm" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>愉快的双击使用吧！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用electron写桌面应用

## 原文链接
[https://segmentfault.com/a/1190000004609776](https://segmentfault.com/a/1190000004609776)

