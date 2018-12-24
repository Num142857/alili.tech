---
title: 'React 整洁代码最佳实践' 
date: 2018-12-24 2:30:06
hidden: true
slug: fmsp3lgj6cs
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>原文：<a href="http://americanexpress.io/clean-code-dirty-code/" rel="nofollow noreferrer" target="_blank">Clean Code vs. Dirty Code: React Best Practices</a></p>
<p>作者：Donavon West</p>
</blockquote>
<p>本文主要介绍了适用于现代 React 软件开发的整洁代码实践，顺便谈谈 ES6/ES2015 带来的一些好用的“语法糖”。</p>
<h2 id="articleHeader0">什么是整洁代码，为什么要在乎？</h2>
<p>整洁代码代表的是一种一致的编码风格，目的是让代码更易于编写，阅读和维护。通常情况下，开发者在解决问题的时候，一旦问题解决就发起一个 Pull Request（译注：合并请求，在 Gitlab 上叫 Merge Request）。但我认为，这时候工作并没有真正完成，我们不能仅仅满足于代码可以工作。</p>
<p>这时候其实就是整理代码的最好时机，可以通过删除死代码（僵尸代码），重构以及删除注释掉的代码，来保持代码的可维护性。不妨问问自己，“从现在开始再过六个月，其他人还能理解这些代码吗？”简而言之，对于自己编写的代码，你应该保证能很自豪地拿给别人看。</p>
<p>至于为什么要在乎这点？因为我们常说一个优秀的开发者大都比较”懒“。在遇到需要重复做某些事情的情况下，他们会去找到一个自动化（或更好的）解决方案来完成这些任务。</p>
<h3 id="articleHeader1">整洁代码能够通过“味道测试”</h3>
<p>整洁代码应该可以通过“味道测试”。什么意思呢？我们在看代码的时候，包括我们自己写的或或是别人的，会说：“这里不太对劲。”如果感觉不对，那可能就真的是有问题的。如果你觉得你正在试图把一个方形钉子装进一个圆形的洞里，那么就暂停一下，然后休息一下。多次尝试之后，你会找到一个更好的解决方案。</p>
<h3 id="articleHeader2">整洁代码是符合 DRY 原则的</h3>
<p>DRY 是一个缩略词，意思是“不要重复自己”（Don’t Repeat Yourself）。如果发现多个地方在做同样的事情，那么这时候就应该合并重复代码。如果在代码中看到了模式，那么表明需要实行 DRY。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
const MyComponent = () => (
  <div>
    <OtherComponent type=&quot;a&quot; className=&quot;colorful&quot; foo={123} bar={456} />
    <OtherComponent type=&quot;b&quot; className=&quot;colorful&quot; foo={123} bar={456} />    
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  &lt;div&gt;
    &lt;OtherComponent type="a" className="colorful" foo={123} bar={456} /&gt;
    &lt;OtherComponent type="b" className="colorful" foo={123} bar={456} /&gt;    
  &lt;/div&gt;
);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
const MyOtherComponent = ({ type }) => (
  <OtherComponent type={type} className=&quot;colorful&quot; foo={123} bar={456} />
);
const MyComponent = () => (
  <div>
    <MyOtherComponent type=&quot;a&quot; />
    <MyOtherComponent type=&quot;b&quot; />
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">const</span> MyOtherComponent = <span class="hljs-function">(<span class="hljs-params">{ type }</span>) =&gt;</span> (
  &lt;OtherComponent type={type} className="colorful" foo={123} bar={456} /&gt;
);
const MyComponent = () =&gt; (
  &lt;div&gt;
    &lt;MyOtherComponent type="a" /&gt;
    &lt;MyOtherComponent type="b" /&gt;
  &lt;/div&gt;
);</code></pre>
<p>有时候，比如在上面的例子中，实行 DRY 原则反而可能会增加代码量。但是，DRY 通常也能够提高代码的可维护性。</p>
<p>注意，很容易陷入过分使用 DRY 原则的陷阱，应该学会适可而止。</p>
<h3 id="articleHeader3">整洁代码是可预测和可测试的</h3>
<p>编写单元测试不仅仅只是一个好想法，而且应该是强制性的。不然，怎么能确保新功能不会在其他地方引起 Bug 呢？</p>
<p>许多 React 开发人员选择 <a href="https://facebook.github.io/jest/" rel="nofollow noreferrer" target="_blank">Jest</a> 作为一个零配置测试运行器，然后生成代码覆盖率报告。如果对测试前后对比可视化感兴趣，请查看美国运通的 <a href="https://github.com/americanexpress/jest-image-snapshot" rel="nofollow noreferrer" target="_blank">Jest Image snanshot</a>。</p>
<h3 id="articleHeader4">整洁代码是自注释的</h3>
<p>以前发生过这种情况吗？你写了一些代码，并且包含详细的注释。后来你发现一个 bug，于是回去修改代码。但是，你有没有改变注释来体现新的逻辑？也许会，也许不会。下一个看你代码的人可能因为注意到这些注释而掉进一个陷阱。</p>
<p>注释只是为了解释复杂的想法，也就是说，不要对显而易见的代码进行注释。同时，更少的注释也减少了视觉上的干扰。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
const fetchUser = (id) => (
  fetch(buildUri`/users/${id}`) // Get User DTO record from REST API
    .then(convertFormat) // Convert to snakeCase
    .then(validateUser) // Make sure the the user is valid
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-keyword">const</span> fetchUser = <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> (
  fetch(buildUri<span class="hljs-string">`/users/<span class="hljs-subst">${id}</span>`</span>) <span class="hljs-comment">// Get User DTO record from REST API</span>
    .then(convertFormat) <span class="hljs-comment">// Convert to snakeCase</span>
    .then(validateUser) <span class="hljs-comment">// Make sure the the user is valid</span>
);</code></pre>
<p>在整洁代码的版本中，我们对一些函数进行重命名，以便更好地描述它们的功能，从而消除注释的必要性，减少视觉干扰。并且避免后续因代码与注释不匹配导致的混淆。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
const fetchUser = (id) => (
  fetch(buildUri`/users/${id}`)
    .then(snakeToCamelCase)
    .then(validateUser)
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">const</span> fetchUser = <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> (
  fetch(buildUri<span class="hljs-string">`/users/<span class="hljs-subst">${id}</span>`</span>)
    .then(snakeToCamelCase)
    .then(validateUser)
);</code></pre>
<h3 id="articleHeader5">命名</h3>
<p>在我之前的文章 <a href="http://americanexpress.io/faccs-are-an-antipattern" rel="nofollow noreferrer" target="_blank">将函数作为子组件是一种反模式</a>，强调了命名的重要性。每个开发者都应该认真考虑变量名，函数名，甚至是文件名。</p>
<p>这里列举一下命名原则：</p>
<ul>
<li>
<p>布尔变量或返回布尔值的函数应该以“is”，“has”或“should”开头。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
const done = current >= goal;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-keyword">const</span> done = current &gt;= goal;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
const isComplete = current >= goal;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">const</span> isComplete = current &gt;= goal;</code></pre>
</li>
<li>
<p>函数命名应该体现做了什么，而不是是怎样做的。换言之，不要在命名中体现出实现细节。假如有天出现变化，就不需要因此而重构引用该函数的代码。比如，今天可能会从 REST API 加载配置，但是可能明天就会将其直接写入到 JavaScript 中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
const loadConfigFromServer = () => {
  ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-keyword">const</span> loadConfigFromServer = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  ...
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
const loadConfig = () => {
  ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">const</span> loadConfig = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  ...
};</code></pre>
</li>
</ul>
<h3 id="articleHeader6">整洁代码遵循成熟的设计模式和最佳实践</h3>
<p>计算机已经存在很长一段时间了。多年以来，程序员通过解决某些特定问题，发现了一些固有套路，被称为设计模式。换言之，有些算法已经被证明是可以工作的，所以应该站在前人的肩膀上，避免犯同样的错误。</p>
<p>那么，什么是最佳实践，与设计模式类似，但是适用范围更广，不仅仅针对编码算法。比如，“应该对代码进行静态检查”或者“当编写一个库时，应该将 React 作为 <code>peerDependency</code>”，这些都可以称为最佳实践。</p>
<p>构建 React 应用程序时，应该遵循以下最佳实践：</p>
<ul>
<li>使用小函数，每个函数具备单一功能，即所谓的单一职责原则（Single responsibility principle）。确保每个函数都能完成一项工作，并做得很好。这样就能将复杂的组件分解成许多较小的组件。同时，将具备更好的可测试性。</li>
<li>小心抽象泄露（leaky abstractions）。换言之，不要强迫消费方去了解内部代码实现细节。</li>
<li>遵循严格的代码检查规则。这将有助于编写整洁，一致的代码。</li>
</ul>
<h3 id="articleHeader7">整洁代码不需要花长时间来编写</h3>
<p>总会听到这样的说法：编写整洁代码会降低生产力。简直是在胡说八道。是的，可能刚开始需要放慢速度，但最终会随着编写更少的代码而节奏加快。</p>
<p>而且，不要小看代码评审导致的重写重构，以及修复问题花费的时间。如果把代码分解成小的模块，每个模块都是单一职责，那么很可能以后再也不用去碰大多数模块了。时间就省下来了，也就是说 “write it and forget it”。</p>
<h2 id="articleHeader8">槽糕代码与整洁代码的实例</h2>
<h3 id="articleHeader9">使用 DRY 原则</h3>
<p>看看下面的代码示例。如上所述，从你的显示器退后一步，发现什么模式了吗？注意 <code>Thingie</code> 组件与 <code>ThingieWithTitle</code> 组件除了 <code>Title</code> 组件几乎完全相同，这是实行 DRY 原则的最佳情形。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
import Title from './Title';

export const Thingie = ({ description }) => (
  <div class=&quot;thingie&quot;>
    <div class=&quot;description-wrapper&quot;>
      <Description value={description} />
    </div>
  </div>
);

export const ThingieWithTitle = ({ title, description }) => (
  <div>
    <Title value={title} />
    <div class=&quot;description-wrapper&quot;>
      <Description value={description} />
    </div>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-keyword">import</span> Title <span class="hljs-keyword">from</span> <span class="hljs-string">'./Title'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Thingie = <span class="hljs-function">(<span class="hljs-params">{ description }</span>) =&gt;</span> (
  &lt;div class="thingie"&gt;
    &lt;div class="description-wrapper"&gt;
      &lt;Description value={description} /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
);

export const ThingieWithTitle = ({ title, description }) =&gt; (
  &lt;div&gt;
    &lt;Title value={title} /&gt;
    &lt;div class="description-wrapper"&gt;
      &lt;Description value={description} /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
);</code></pre>
<p>在这里，我们将 <code>children</code> 传递给 <code>Thingie</code>。然后创建 <code>ThingieWithTitle</code>，这个组件包含 <code>Thingie</code>，并将 <code>Title</code> 作为其子组件传给 <code>Thingie</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
import Title from './Title';

export const Thingie = ({ description, children }) => (
  <div class=&quot;thingie&quot;>
    {children}
    <div class=&quot;description-wrapper&quot;>
      <Description value={description} />
    </div>
  </div>
);

export const ThingieWithTitle = ({ title, ...others }) => (
  <Thingie {...others}>
    <Title value={title} />
  </Thingie>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">import</span> Title <span class="hljs-keyword">from</span> <span class="hljs-string">'./Title'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Thingie = <span class="hljs-function">(<span class="hljs-params">{ description, children }</span>) =&gt;</span> (
  &lt;div class="thingie"&gt;
    {children}
    &lt;div class="description-wrapper"&gt;
      &lt;Description value={description} /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
);

export const ThingieWithTitle = ({ title, ...others }) =&gt; (
  &lt;Thingie {...others}&gt;
    &lt;Title value={title} /&gt;
  &lt;/Thingie&gt;
);</code></pre>
<h3 id="articleHeader10">默认值</h3>
<p>看看下面的代码。使用逻辑或将 <code>className</code> 的默认值设置成 “icon-large”，看起来像是上个世纪的人才会写的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
const Icon = ({ className, onClick }) => {
  const additionalClasses = className || 'icon-large';
  
  return (
    <span
      className={`icon-hover ${additionalClasses}`}
      onClick={onClick}>
    </span>
  );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-keyword">const</span> Icon = <span class="hljs-function">(<span class="hljs-params">{ className, onClick }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> additionalClasses = className || <span class="hljs-string">'icon-large'</span>;
  
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">icon-hover</span> ${<span class="hljs-attr">additionalClasses</span>}`}
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
  );
};</code></pre>
<p>这里我们使用 ES6 的默认语法来替换 <code>undefined</code> 时的值，而且还能使用 ES6 的箭头函数表达式写成单一语句形式，从而去除对 <code>return</code> 的依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
const Icon = ({ className = 'icon-large', onClick }) => (
  <span className={`icon-hover ${className}`} onClick={onClick} />
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">const</span> Icon = <span class="hljs-function">(<span class="hljs-params">{ className = <span class="hljs-string">'icon-large'</span>, onClick }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">icon-hover</span> ${<span class="hljs-attr">className</span>}`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span> /&gt;</span>
);</span></code></pre>
<p>在下面这个更整洁的版本中，使用 React 中的 API 来设置默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Cleaner
const Icon = ({ className, onClick }) => (
  <span className={`icon-hover ${className}`} onClick={onClick} />
);

Icon.defaultProps = {
  className: 'icon-large',
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Cleaner</span>
<span class="hljs-keyword">const</span> Icon = <span class="hljs-function">(<span class="hljs-params">{ className, onClick }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>`<span class="hljs-attr">icon-hover</span> ${<span class="hljs-attr">className</span>}`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span> /&gt;</span>
);

Icon.defaultProps = {
  className: 'icon-large',
};</span></code></pre>
<p>为什么这样显得更加整洁？而且它真的会更好吗？三个版本不是都在做同样的事情吗？某种意义上来说，是对的。让 React 设置 prop 默认值的好处是，可以产生更高效的代码，而且在基于 <code>Class</code> 的生命周期组件中允许通过 <code>propTypes</code> 检查默认值。还有一个优点是：将默认逻辑从组件本身抽离出来。</p>
<p>例如，你可以执行以下操作，将所有默认属性放到一个地方。当然，并不是建议你这样做，只是说具有这样的灵活性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import defaultProps from './defaultProps';
// ...
Icon.defaultProps = defaultProps.Icon;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> defaultProps <span class="hljs-keyword">from</span> <span class="hljs-string">'./defaultProps'</span>;
<span class="hljs-comment">// ...</span>
Icon.defaultProps = defaultProps.Icon;</code></pre>
<h3 id="articleHeader11">从渲染分离有状态的部分</h3>
<p>将有状态的数据加载逻辑与渲染逻辑混合可能增加组件复杂性。更好的方式是，写一个负责完成数据加载的有状态的容器组件，然后编写另一个负责显示数据的组件。这被称为 <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" rel="nofollow noreferrer" target="_blank">容器模式</a>。</p>
<p>在下面的示例中，用户数据加载和显示功能放在一个组件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
class User extends Component {
  state = { loading: true };

  render() {
    const { loading, user } = this.state;
    return loading
      ? <div>Loading...</div>
      : <div>
          <div>
            First name: {user.firstName}
          </div>
          <div>
            First name: {user.lastName}
          </div>
          ...
        </div>;
  }

  componentDidMount() {
    fetchUser(this.props.id)
      .then((user) => { this.setState({ loading: false, user })})
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span> };

  render() {
    <span class="hljs-keyword">const</span> { loading, user } = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> loading
      ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      : <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            First name: {user.firstName}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            First name: {user.lastName}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          ...
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  componentDidMount() {
    fetchUser(<span class="hljs-keyword">this</span>.props.id)
      .then(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> { <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>, user })})
  }
}</code></pre>
<p>在整洁版本中，加载数据和显示数据已经分离。这不仅使代码更容易理解，而且能减少测试的工作量，因为可以独立测试每个部分。而且由于 <code>RenderUser</code> 是一个无状态组件，所以结果是可预测的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
import RenderUser from './RenderUser';

class User extends Component {
  state = { loading: true };

  render() {
    const { loading, user } = this.state;
    return loading ? <Loading /> : <RenderUser user={user} />;
  }

  componentDidMount() {
    fetchUser(this.props.id)
      .then(user => { this.setState({ loading: false, user })})
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">import</span> RenderUser <span class="hljs-keyword">from</span> <span class="hljs-string">'./RenderUser'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span> };

  render() {
    <span class="hljs-keyword">const</span> { loading, user } = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> loading ? &lt;Loading /&gt; : &lt;RenderUser user={user} /&gt;;
  }

  componentDidMount() {
    fetchUser(this.props.id)
      .then(user =&gt; { this.setState({ loading: false, user })})
  }
}</code></pre>
<h3 id="articleHeader12">使用无状态组件</h3>
<p>React v0.14.0 中引入了无状态函数组件（SFC），被简化成纯渲染组件，但有些开发者还在使用过去的方式。例如，以下组件就应该转换为 SFC。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
class TableRowWrapper extends Component {
  render() {
    return (
      <tr>
        {this.props.children}
      </tr>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TableRowWrapper</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
        {this.props.children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>整洁版本清除了很多可能导致干扰的信息。通过 React 核心的优化，使用无状态组件将占用更少的内存，因为没有创建 Component 实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
const TableRowWrapper = ({ children }) => (
  <tr>
    {children}
  </tr>
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">const</span> TableRowWrapper = <span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    {children}
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span></span>
);
</code></pre>
<h3 id="articleHeader13">剩余/扩展属性（rest/spread）</h3>
<p>大约在一年前，我还推荐大家多用 <code>Object.assign</code>。但时代变化很快，在 ES2016/ES7 中引入新特性 <a href="https://github.com/tc39/proposal-object-rest-spread" rel="nofollow noreferrer" target="_blank">rest/spread</a>。</p>
<p>比如这样一种场景，当传递给一些 props 给一个组件，只希望在组件本身使用 <code>className</code>，但是需要将其他所有 props 传递到子组件。这时，你可能会这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
const MyComponent = (props) => {
  const others = Object.assign({}, props);
  delete others.className;
  
  return (
    <div className={props.className}>
      {React.createElement(MyOtherComponent, others)}
    </div>
  );
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> others = <span class="hljs-built_in">Object</span>.assign({}, props);
  <span class="hljs-keyword">delete</span> others.className;
  
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{props.className}</span>&gt;</span>
      {React.createElement(MyOtherComponent, others)}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>这不是一个非常优雅的解决方案。但是使用 rest/spread，就能轻而易举地实现，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
const MyComponent = ({ className, ...others }) => (
  <div className={className}>
    <MyOtherComponent {...others} />
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function">(<span class="hljs-params">{ className, ...others }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">MyOtherComponent</span> {<span class="hljs-attr">...others</span>} /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
);</span></code></pre>
<p>我们将剩余属性展开并作为新的 props 传递给 <code>MyOtherComponent</code> 组件。</p>
<h3 id="articleHeader14">合理使用解构</h3>
<p>ES6 引入 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" rel="nofollow noreferrer" target="_blank">解构</a>（destructuring） 的概念，这是一个非常棒的特性，用类似对象或数组字面量的语法获取一个对象的属性或一个数组的元素。</p>
<h4>对象解构</h4>
<p>在这个例子中，<code>componentWillReceiveProps</code> 组件接收 <code>newProps</code> 参数，然后将其 <code>active</code> 属性设置为新的 <code>state.active</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
componentWillReceiveProps(newProps) {
  this.setState({
    active: newProps.active
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
componentWillReceiveProps(newProps) {
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">active</span>: newProps.active
  });
}</code></pre>
<p>在整洁版本中，我们解构 <code>newProps </code>成 <code>active</code>。这样我们不仅不需要引用 <code>newProps.active</code>，而且也可以使用 ES6 的简短属性特性来调用 <code>setState</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
componentWillReceiveProps({ active }) {
  this.setState({ active });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// Clean</span>
componentWillReceiveProps({ active }) {
  <span class="hljs-keyword">this</span>.setState({ active });
}
</code></pre>
<h4>数组解构</h4>
<p>一个经常被忽视的 ES6 特性是数组解构。以下面的代码为例，它获取 <code>locale</code> 的值，比如“en-US”，并将其分成 <code>language</code>（en）和 <code>country</code>（US）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Dirty
const splitLocale = locale.split('-');
const language = splitLocale[0];
const country = splitLocale[1];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Dirty</span>
<span class="hljs-keyword">const</span> splitLocale = locale.split(<span class="hljs-string">'-'</span>);
<span class="hljs-keyword">const</span> language = splitLocale[<span class="hljs-number">0</span>];
<span class="hljs-keyword">const</span> country = splitLocale[<span class="hljs-number">1</span>];
</code></pre>
<p>在整洁版本，使用 ES6 的数组解构特性可以自动完成上述过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Clean
const [language, country] = locale.split('-');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Clean</span>
<span class="hljs-keyword">const</span> [language, country] = locale.split(<span class="hljs-string">'-'</span>);
</code></pre>
<h2 id="articleHeader15">所以结论是</h2>
<p>希望这篇文章能有助于你看到编写整洁代码的好处，甚至可以直接使用这里介绍的一些代码示例。一旦你习惯编写整洁代码，将很快就会体会到 “write it and forget it” 的生活方式。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 整洁代码最佳实践

## 原文链接
[https://segmentfault.com/a/1190000012249271](https://segmentfault.com/a/1190000012249271)

