---
title: 使用ES6让你的React代码提升到一个新档次
hidden: true
categories: reprint
slug: 3ef11629
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>ES6使您的代码更具表现力和可读性。</p>
<p>而且它与React完美配合！</p>
<p>现在您已了解更多基础知识：</p>
<p>✨<strong>现在是时候将你的ES6技能提升到一个新的水平！</strong> ✨</p>
<hr>
<h3>嵌套props解构</h3>
<p>您已经知道可以通过解构从React组件中的props中提取变量</p>
<pre><code class="hljs routeros">const {<span class="hljs-built_in"> user </span>} = this.props;
</code></pre>
<p>但是如果<em>user</em>是一个对象并且你想从<em>this.props.user.id</em>提取到变量_id_呢？</p>
<p>您可以使用嵌套解构：</p>
<pre><code class="hljs objectivec"><span class="hljs-keyword">const</span> { user: { <span class="hljs-keyword">id</span> } } = <span class="hljs-keyword">this</span>.props;
</code></pre>
<p>现在你有一个变量_id _是 <em>this.props.user.id</em> 的内容</p>
<hr>
<h3>传下所有props</h3>
<p>您已经知道可以将props传递给子组件。</p>
<pre><code class="hljs stylus">&lt;MyChild shoe={this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.shoe</span>} cup={this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.cup</span>}/&gt;
</code></pre>
<p>将所有props传递给具有扩展语法的子组件。</p>
<pre><code class="hljs stylus">&lt;MyChild {..<span class="hljs-selector-class">.this</span><span class="hljs-selector-class">.props</span>}/&gt;
</code></pre>
<p>现在，MyChild可以访问shoe，cup以及父组件可以访问的所有其他props！</p>
<hr>
<h3>props解构</h3>
<p>你已经知道你可以用箭头函数来构造props</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function">(<span class="hljs-params">{ shoe, car }</span>) =&gt;</span> <span class="hljs-comment">/* do something */</span>
</code></pre>
<p>但是，如果您还想访问props对象呢？</p>
<p>这可能是这样的：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function">(<span class="hljs-params">{ shoe, car, ...props }</span>) =&gt;</span> <span class="hljs-comment">/* do something */</span>
</code></pre>
<p>props现在包含除shoe和car以外的所有props。</p>
<hr>
<h3>作为参数的函数</h3>
<p>您已经知道可以将箭头函数作为参数传递给其他函数，例如<em>map</em>和<em>forEach</em></p>
<pre><code class="hljs gcode">myList.map<span class="hljs-comment">((a)</span> =&gt; toUpperCase<span class="hljs-comment">(a)</span>)
</code></pre>
<p>（您必须自己编写toUpperCase以使此代码可运行）</p>
<p>上面的代码甚至没有使用箭头功能也可以写</p>
<pre><code class="hljs cpp">myList.<span class="hljs-built_in">map</span>(toUpperCase)
</code></pre>
<p>更干净！当您只在箭头函数中使用一个参数并将该参数传递给新函数时，您可以像这样编写它。</p>
<hr>
<h3>列表解构</h3>
<p>您已经知道可以对列表进行解构：</p>
<pre><code class="hljs cpp"><span class="hljs-keyword">const</span> [a, b, c] = <span class="hljs-built_in">list</span>;
</code></pre>
<p>获取第一项，其余为两个变量：</p>
<pre><code class="hljs applescript">const [<span class="hljs-keyword">first</span>, ...<span class="hljs-built_in">rest</span>] = <span class="hljs-built_in">list</span>;
</code></pre>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/take-your-es6-in-react-to-the-next-level](https://www.zcfy.cc/article/take-your-es6-in-react-to-the-next-level)
原文标题: 使用ES6让你的React代码提升到一个新档次
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
