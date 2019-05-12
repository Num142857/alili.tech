---
title: '〔译〕TypeScript 2.0 候选版发布' 
date: 2019-02-04 2:30:58
hidden: true
slug: 51abfl8n71a
categories: [reprint]
---

{{< raw >}}

                    
<h4>相关链接</h4>
<p>TypeScript 2.0 正式版已经发布了：<a href="https://segmentfault.com/a/1190000006992529">〔译〕TypeScript 2.0 正式版发布</a>  <br>不过可能大家更关心的是 <a href="https://segmentfault.com/a/1190000007002883" target="_blank">〔译〕TypeScript 2.0 的新特性</a></p>
<hr>
<blockquote><p>原文：<a href="https://blogs.msdn.microsoft.com/typescript/2016/08/30/announcing-typescript-2-0-rc/" rel="nofollow noreferrer" target="_blank">Announcing TypeScript 2.0 RC</a><br>August 30, 2016 by Daniel Rosenwasser</p></blockquote>
<p>TypeScript 2.0 候选发行版（RC）出来了，离 TypeScript 2.0 最终发布也就不远了，赞！如果你还没开始使用 TypeScript，可以先看看<a href="https://www.typescriptlang.org/docs/tutorial.html" rel="nofollow noreferrer" target="_blank">网站上的教程</a>。</p>
<p>要使用 RC 版本，可以下载 <a href="http://download.microsoft.com/download/6/D/8/6D8381B0-03C1-4BD2-AE65-30FF0A4C62DA/TS2.0.2-TS-release20-nightly-20160828.1/TypeScript_Dev14Full.exe" rel="nofollow noreferrer" target="_blank">TypeScript 2.0 RC for Visual Studio 2015</a>（需要 <a href="https://msdn.microsoft.com/en-us/library/mt752379.aspx" rel="nofollow noreferrer" target="_blank">VS2015 Update 3</a>）；也可以通过 NuGet 下载，或者像下面这样使用 npm：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g typescript@rc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g typescript@rc</code></pre>
<p>Visual Studio Code 用户想使用 RC 版本请参考<a href="https://code.visualstudio.com/docs/languages/typescript#_using-newer-typescript-versions" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>这个 RC 版本让大家看到 2.0 正式版的样子，我们通过这个版本广泛收集用户反馈，将 2.0 打造得更加稳定可靠。总的来说，一般情况下 RC 版本已经足够稳定了，并且我们不希望再往上加新的特性。</p>
<p>不过，自 2.0 Beta 发布以来，已经加了不少东西，所以下面可能会有你尚未听说的新特性。</p>
<h3 id="articleHeader0">推断类型（Tagged Unions）</h3>
<blockquote>
<p><strong>译者注</strong></p>
<p>对于 Tagged Unions 的翻译，我查了很多资料，在 wiki 上找到如下描述：<a href="https://en.wikipedia.org/wiki/Tagged_union" rel="nofollow noreferrer" target="_blank"><em>a tagged union, also called a variant, variant record, discriminated union, disjoint union, or sum type</em></a>。其中 Variant 这个说法在 VB 中十分常用。在参考了 C# 对 <code>var</code> 关键字的翻译之后，我决定将其翻译为“推断类型”。</p>
<p>推断类型是一种数据结构，很像联合（C/C++程序员一定知道这个结构）。它有一个字段（或称为属性）用于识别当前结构的确切类型。（参考 <a href="https://www.quora.com/What-is-a-tagged-union" rel="nofollow noreferrer" target="_blank">What is a tagged union</a>）</p>
</blockquote>
<p>推断类型使 JavaScript 在某些方向更像 F#、Swift 等语言。为此，JavaScript 程序员们一定会非常高兴。这个特性也叫 <em>可识别联合</em>、<em>互斥联合</em> 或 <em>代理类型</em>。不过特性本身显然比名称更有意思。</p>
<p>假设有两个类型：<code>Circle</code> 和 <code>Square</code>，然后定义它们的联合类型，命名为 <code>Shape</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Circle {
    kind: &quot;circle&quot;;
    radius: number;
}

interface Square {
    kind: &quot;square&quot;;
    sideLength: number;
}

type Shape = Circle | Square;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> Circle {
    kind: <span class="hljs-string">"circle"</span>;
    radius: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> Square {
    kind: <span class="hljs-string">"square"</span>;
    sideLength: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">type</span> Shape = Circle | Square;</code></pre>
<p>注意 <code>Circle</code> 和 <code>Square</code> 都有一个叫 <code>kind</code> 的字段，保存的字符串常数，表示类型。也就是说 <code>Circle</code> 的 <code>kind</code> 总是 <code>"circle"</code>。每个类型都有一个共同的字段，但通过不同的值作为 <em>标记</em> 区分开来。</p>
<p>在 TypeScript 1.8 中，如果写一个获取面积的函数，需要判断 <code>Shape</code> 的每种类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getArea(shape: Shape) {
    switch (shape.kind) {
        case &quot;circle&quot;:
            // 从 'Shape' 转换为 'Circle'
            let c = shape as Circle;
            return Math.PI * c.radius ** 2;

        case &quot;square&quot;:
            // 从 'Shape' 转换为 'Square'
            let sq = shape as Square;
            return sq.sideLength ** 2;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArea</span>(<span class="hljs-params">shape: Shape</span>) </span>{
    <span class="hljs-keyword">switch</span> (shape.kind) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">"circle"</span>:
            <span class="hljs-comment">// 从 'Shape' 转换为 'Circle'</span>
            <span class="hljs-keyword">let</span> c = shape <span class="hljs-keyword">as</span> Circle;
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.PI * c.radius ** <span class="hljs-number">2</span>;

        <span class="hljs-keyword">case</span> <span class="hljs-string">"square"</span>:
            <span class="hljs-comment">// 从 'Shape' 转换为 'Square'</span>
            <span class="hljs-keyword">let</span> sq = shape <span class="hljs-keyword">as</span> Square;
            <span class="hljs-keyword">return</span> sq.sideLength ** <span class="hljs-number">2</span>;
    }
}</code></pre>
<p>注意到我们为每种图形都使用了一个中间变量来使代码看起来简洁。</p>
<p>在 2.0 中就不再需要中间变量了。语言懂得如何通过 <code>kind</code> 来辨别类型，所以你可以少写点代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getArea(shape: Shape) {
    switch (shape.kind) {
        case &quot;circle&quot;:
            // 这里 'shape' 是 'Circle'
            return Math.PI * shape.radius ** 2;

        case &quot;square&quot;:
            // 这里 'shape' 是 'Square'
            return shape.sideLength ** 2;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArea</span>(<span class="hljs-params">shape: Shape</span>) </span>{
    <span class="hljs-keyword">switch</span> (shape.kind) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">"circle"</span>:
            <span class="hljs-comment">// 这里 'shape' 是 'Circle'</span>
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.PI * shape.radius ** <span class="hljs-number">2</span>;

        <span class="hljs-keyword">case</span> <span class="hljs-string">"square"</span>:
            <span class="hljs-comment">// 这里 'shape' 是 'Square'</span>
            <span class="hljs-keyword">return</span> shape.sideLength ** <span class="hljs-number">2</span>;
    }
}</code></pre>
<p>上面的代码完全正确，TypeScript 能通过流程控制分析每个分支上的正确类型。可以使用 <code>--noImplicitReturns</code> 和即将可用的 <code>--strictNullChecks</code> 特性保证这些检查更彻底。</p>
<p>推断类型让 JavaScript 这种形式下的代码更简洁也更安全。例如，像 Redux 这样的库经常使用这种形式的来处理 action。每个独立的</p>
<h3 id="articleHeader1">更多字面类型</h3>
<p>1.8 带来的字符串字面类型非常有用，就像上面看到的那样，可以用它来处理推断类型。</p>
<p>除了字符串，我们还想提供更多的类型。在 2.0 中，每个独特的布尔、数值或枚举成员都可以拥有自己的类型！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
let nums: Digit[] = [1, 2, 4, 8];

// 错误! '16' 不是 'Digit'!
nums.push(16);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">type</span> Digit = <span class="hljs-number">0</span> | <span class="hljs-number">1</span> | <span class="hljs-number">2</span> | <span class="hljs-number">3</span> | <span class="hljs-number">4</span> | <span class="hljs-number">5</span> | <span class="hljs-number">6</span> | <span class="hljs-number">7</span> | <span class="hljs-number">8</span> | <span class="hljs-number">9</span>;
<span class="hljs-keyword">let</span> nums: Digit[] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>];

<span class="hljs-comment">// 错误! '16' 不是 'Digit'!</span>
nums.push(<span class="hljs-number">16</span>);</code></pre>
<p>这样在使用推断类型时，我们可以快速而地处理一些事情而毫无违和感。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Success<T> {
    success: true;
    value: T;
}

interface Failure {
    success: false;
    reason: string;
}

type Result<T> = Success<T> | Failure;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> Success&lt;T&gt; {
    success: <span class="hljs-literal">true</span>;
    value: T;
}

<span class="hljs-keyword">interface</span> Failure {
    success: <span class="hljs-literal">false</span>;
    reason: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">type</span> Result&lt;T&gt; = Success&lt;T&gt; | Failure;</code></pre>
<p>这里的 <code>Result&lt;T&gt;</code> 类型可能表示失败。如果表示成功，它有一个值，如果表示失败，它包含表示失败原因的 <code>reson</code> 字段。<code>value</code> 字段仅在 <code>success</code> 是 <code>true</code> 的时候有效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare function tryGetNumUsers(): Result<number>;

let result = tryGetNumUsers();
if (result.success === true) {
    // 'result' 是 'Success<number>' 类型的
    console.log(`Server reported ${result.value} users`);
}
else {
    // 'result'是 'Failure' 类型的
    console.error(&quot;Error fetching number of users!&quot;, result.reason);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tryGetNumUsers</span>(<span class="hljs-params"></span>): <span class="hljs-title">Result</span>&lt;<span class="hljs-title">number</span>&gt;</span>;

<span class="hljs-keyword">let</span> result = tryGetNumUsers();
<span class="hljs-keyword">if</span> (result.success === <span class="hljs-literal">true</span>) {
    <span class="hljs-comment">// 'result' 是 'Success&lt;number&gt;' 类型的</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Server reported <span class="hljs-subst">${result.value}</span> users`</span>);
}
<span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 'result'是 'Failure' 类型的</span>
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"Error fetching number of users!"</span>, result.reason);
}</code></pre>
<p>你可能已经注意到了，枚举值也可以拥有它们自己的类型！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum ActionType { Append, Erase }

interface AppendAction { 
    type: ActionType.Append;
    text: string;
}

interface EraseAction {
    type: ActionType.Erase;
    numChars: number;
}

function updateText(currentText: string, action: AppendAction | EraseAction) {
    if (action.type === ActionType.Append) {
        // 'action' has type 'AppendAction'
        return currentText + action.text;
    }
    else {
        // 'action' has type 'EraseAction'
        return currentText.slice(0, -action.numChars);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">enum</span> ActionType { Append, Erase }

<span class="hljs-keyword">interface</span> AppendAction { 
    <span class="hljs-keyword">type</span>: ActionType.Append;
    text: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> EraseAction {
    <span class="hljs-keyword">type</span>: ActionType.Erase;
    numChars: <span class="hljs-built_in">number</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateText</span>(<span class="hljs-params">currentText: <span class="hljs-built_in">string</span>, action: AppendAction | EraseAction</span>) </span>{
    <span class="hljs-keyword">if</span> (action.type === ActionType.Append) {
        <span class="hljs-comment">// 'action' has type 'AppendAction'</span>
        <span class="hljs-keyword">return</span> currentText + action.text;
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 'action' has type 'EraseAction'</span>
        <span class="hljs-keyword">return</span> currentText.slice(<span class="hljs-number">0</span>, -action.numChars);
    }
}</code></pre>
<h3 id="articleHeader2">Globs语法、包含和排除</h3>
<blockquote>
<p><strong>译者注</strong></p>
<p>Globs 直译是“团块”的意思，不过这显然不如 <code>Globs</code> 本身意思明确。所以这里我没有翻译这个词。关于 Globs，可以参考 <a href="https://github.com/isaacs/node-glob" rel="nofollow noreferrer" target="_blank">node-blog</a> 在 README.md 中的说明。</p>
</blockquote>
<p>首次向大家介绍 tsconfig.json 文件的时候，手工列出所有文件实在痛苦。TypeScript 1.6 引入了 <code>excludes</code> 配置来缓解这个问题；然而，这显然不够。痛苦在于，写完了每条文件路径，仍然会有问题发生，结果是因为忘了排除新文件。</p>
<p>TypeScript 2.0 终于开始支持 Globs 语法。Globs 允许我们在路径中使用通配符，这样一来，写路径再也不是件乏味的事了。</p>
<p><code>include</code> 和 <code>exclude</code> 配置中都可以使用 Globs 语法。来看一个 tsconfig.json 的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;include&quot;: [
        &quot;./src/**/*.ts&quot;
    ],
    &quot;exclude&quot;: [
        &quot;./src/tests/**&quot;
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"include"</span>: [
        <span class="hljs-string">"./src/**/*.ts"</span>
    ],
    <span class="hljs-attr">"exclude"</span>: [
        <span class="hljs-string">"./src/tests/**"</span>
    ]
}</code></pre>
<p>TypeScript globs 语法支持如下通配符：</p>
<ul>
<li>
<code>*</code> 匹配 0 个或多个字符，分隔符（比如 <code>/</code> 或 <code>\</code>）除外</li>
<li>
<code>?</code> 精确匹配 1 个字符，分隔符除外</li>
<li>
<code>**/</code> 匹配任意层子目录</li>
</ul>
<h3 id="articleHeader3">接下来的事</h3>
<p>之前提到，TypeScript 2.0 很快就发布了，但是使用 RC 版本带来的 2.0 的新特性会为社区发展带来巨大的作用。</p>
<p>如果发现任何问题，可以 <a href="https://github.com/Microsoft/TypeScript" rel="nofollow noreferrer" target="_blank">通过Github</a> 反馈给我们。我们非常愿意听到你尝试之后给我们的反馈。祝愉快！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
〔译〕TypeScript 2.0 候选版发布

## 原文链接
[https://segmentfault.com/a/1190000006845790](https://segmentfault.com/a/1190000006845790)

