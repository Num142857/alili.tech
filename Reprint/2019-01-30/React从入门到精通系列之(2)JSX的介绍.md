---
title: 'React从入门到精通系列之(2)JSX的介绍' 
date: 2019-01-30 2:30:22
hidden: true
slug: e69uytnptwa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">二、JSX的介绍</h2>
<p>首先，请考虑下面的变量声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <h1>hello world</h1>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;</code></pre>
<p>这个有趣的标签语法，因为它既不是<code>字符串</code>也不是<code>HTML</code>。</p>
<p>它被称为JSX，它是JavaScript的语法扩展。 我们建议使用它和React一起使用，以便描述UI应该是什么样子的。JSX或许看上去像是一个模板语言，但是它具有JavaScript的全部能力。</p>
<p>JSX用来生成React元素。 我们将在下一节中探讨将它们渲染到DOM。 下面，你可以找到JSX的基础知识。</p>
<h3 id="articleHeader1">JSX中的嵌入表达式</h3>
<p>你可以通过将表达式包含在一个大括号里，以便用来在JSX中嵌入任何JavaScript表达式。<br>例如，下面代码中的 <code>2 + 2</code>，<code>user.name</code>，还有<code>formatName(user)</code>都是可用的表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatName(user){
    return user.firstName + user.lastName;
}

const user = {
    firstName: 'yatao',
    lastName: 'zhang'
};

const Element = (
    <h1>
        hello, {formatName(user)}
    </h1>
);

ReactDOM.render(
    Element,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatName</span>(<span class="hljs-params">user</span>)</span>{
    <span class="hljs-keyword">return</span> user.firstName + user.lastName;
}

<span class="hljs-keyword">const</span> user = {
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">'yatao'</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">'zhang'</span>
};

<span class="hljs-keyword">const</span> Element = (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
        hello, {formatName(user)}
    <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
);

ReactDOM.render(
    Element,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>我们将JSX拆分为多行以提高可读性。 虽然它不是强制性的要求，但当执行此操作时，我们还建议将其括在括号中，以避免自动分号插入而引起不必要的bug。</p>
<h3 id="articleHeader2">JSX也是一个表达式</h3>
<p>编译后，JSX表达式会成为常规JavaScript对象。<br>这意味着您可以在<code>if</code>语句和<code>for</code>循环中使用JSX，可以将其赋值给变量或者将其作为参数，然后从函数中返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getGreeting(user) {
    if (user) {
        return <h1>hello, {formatName(user)}!</h1>;
    }
    return <h1>hello, stranger.</h1>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getGreeting</span>(<span class="hljs-params">user</span>) </span>{
    <span class="hljs-keyword">if</span> (user) {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello, {formatName(user)}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
    }
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello, stranger.<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}</code></pre>
<h3 id="articleHeader3">使用JSX指定属性</h3>
<p>您可以使用引号将字符串文字指定为属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <div tabindex=&quot;0&quot;></div>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">"0"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;</code></pre>
<p>您还可以使用大括号在属性中嵌入JavaScript表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <img src={user.avatarUrl}></img>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{user.avatarUrl}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">img</span>&gt;</span></span>;</code></pre>
<h3 id="articleHeader4">使用JSX指定子元素</h3>
<p>如果标记为空，您可以使用 <code>/&gt;</code> 立即关闭它，例如html：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <img src={user.avatarUrl} />;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{user.avatarUrl}</span> /&gt;</span>;</span></code></pre>
<p>JSX标签也可以包含子元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = (
    <div>
        <h1>hello!</h1>
        <h2>Good to see you here.<h2>
    </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> element = (
    &lt;div&gt;
        &lt;h1&gt;hello!&lt;/h1&gt;
        &lt;h2&gt;Good to see you here.&lt;h2&gt;
    &lt;/div&gt;
);</code></pre>
<blockquote><p><strong>警告</strong><br>由于JSX比HTML更接近JavaScript，React DOM使用驼峰命名法约定而不是HTML属性名称。<br>例如，<code>class</code>在JSX中变为<code>className</code>，<code>tabindex</code>变为<code>tabIndex</code>。</p></blockquote>
<h3 id="articleHeader5">JSX防止注入攻击</h3>
<p>在JSX中嵌入用户输入是安全的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const title = response.potentiallyMaliciousInput;
// 要接收到的可能含有危险内容的字符串放入大括号中，这是比较安全的做法
const element = <h1>{title}</h1>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> title = response.potentiallyMaliciousInput;
<span class="hljs-comment">// 要接收到的可能含有危险内容的字符串放入大括号中，这是比较安全的做法</span>
<span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;</code></pre>
<p>默认情况下，React DOM在渲染它们之前<code>转义</code>嵌入在JSX中的任何值。 因此，它确保不能注入那些没有明确写在你的应用程序中的任何东西。 在渲染之前，一切都转换为字符串。 这有助于防止<code>XSS（跨站点脚本）</code>攻击。</p>
<h3 id="articleHeader6">JSX表示对象</h3>
<p>Babel将JSX编译为<code>React.createElement()</code>调用。<br>这两个例子是相同的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = (
    <h1 className=&quot;greeting&quot;>
        hello world
    </h1>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> element = (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"greeting"</span>&gt;</span>
        hello world
    <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'hello world'
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> element = React.createElement(
    <span class="hljs-string">'h1'</span>,
    {<span class="hljs-attr">className</span>: <span class="hljs-string">'greeting'</span>},
    <span class="hljs-string">'hello world'</span>
);</code></pre>
<p><code>React.createElement()</code>会进行一些检查，以帮助您编写无明显语法错误的代码，本质上，它创建的是一个像这样的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 提示：这是一个简单对象结构
const element = {
   type: 'h1',
   props: {
       className: 'greeting',
       children: 'hello, world'
   }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 提示：这是一个简单对象结构</span>
<span class="hljs-keyword">const</span> element = {
   <span class="hljs-attr">type</span>: <span class="hljs-string">'h1'</span>,
   <span class="hljs-attr">props</span>: {
       <span class="hljs-attr">className</span>: <span class="hljs-string">'greeting'</span>,
       <span class="hljs-attr">children</span>: <span class="hljs-string">'hello, world'</span>
   }
};</code></pre>
<p>这些对象称为“React元素”。 你可以把它们想象成你想在屏幕上看到的样子。 React读取这些对象，并使用它们构造成为DOM元素同时一直保持其为最新的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(2)JSX的介绍

## 原文链接
[https://segmentfault.com/a/1190000007790589](https://segmentfault.com/a/1190000007790589)

