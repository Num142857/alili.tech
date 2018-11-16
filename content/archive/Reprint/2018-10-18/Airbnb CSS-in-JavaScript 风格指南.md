---
title: Airbnb CSS-in-JavaScript 风格指南
hidden: true
categories: [reprint]
slug: b3966ac5
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h1><a href="https://github.com/#airbnb-css-in-javascript-style-guide">Airbnb CSS-in-JavaScript 风格指南</a></h1>
<p><em>一个 普遍适用的CSS-in-JavaScript方法</em></p>
<h2><a href="https://github.com/#table-of-contents">目录</a></h2>
<ol>
<li><a href="https://github.com/#naming">命名</a></li>
<li><a href="https://github.com/#ordering">顺序</a></li>
<li><a href="https://github.com/#nesting">嵌套</a></li>
<li><a href="https://github.com/#inline">内联</a></li>
<li><a href="https://github.com/#themes">主题</a></li>
</ol>
<h2><a href="https://github.com/#naming">命名</a></h2>
<ul>
<li><p>对象的键名使用驼峰命名法（如Airbnb CSS-in-JavaScript Style Guide）</p>
<blockquote>
<p>为什么呢？因为我们在组件中将这些键作为<code>styles</code>对象的属性获取，使用驼峰命名是最为方便的方法。</p>
</blockquote>
<pre><code class="hljs arduino"><span class="hljs-comment">// bad</span>
{
  <span class="hljs-string">'bermuda-triangle'</span>: {
    <span class="hljs-built_in">display</span>: <span class="hljs-string">'none'</span>,
  },
}

<span class="hljs-comment">// good</span>
{
  bermudaTriangle: {
    <span class="hljs-built_in">display</span>: <span class="hljs-string">'none'</span>,
  },
}
</code></pre></li>
<li><p>对其他样式的修改器(modifier)，使用下划线命名</p>
<blockquote>
<p>为什么？类似BEM， 这个命名惯例使它非常清晰地表明这个类就是要用来修改前面添加了下划线的元素的。下划线不需要引用，所以比起其他诸如破折号的元素，更倾向于使用它们。</p>
</blockquote>
<pre><code class="hljs less"><span class="hljs-comment">// bad</span>
{
  <span class="hljs-attribute">bruceBanner</span>: {
    <span class="hljs-attribute">color</span>: <span class="hljs-string">'pink'</span>,
    <span class="hljs-attribute">transition</span>: <span class="hljs-string">'color 10s'</span>,
  },

  <span class="hljs-attribute">bruceBannerTheHulk</span>: {
    <span class="hljs-attribute">color</span>: <span class="hljs-string">'green'</span>,
  },
}

<span class="hljs-comment">// good</span>
{
  <span class="hljs-attribute">bruceBanner</span>: {
    <span class="hljs-attribute">color</span>: <span class="hljs-string">'pink'</span>,
    <span class="hljs-attribute">transition</span>: <span class="hljs-string">'color 10s'</span>,
  },

  <span class="hljs-attribute">bruceBanner_theHulk</span>: {
    <span class="hljs-attribute">color</span>: <span class="hljs-string">'green'</span>,
  },
}
</code></pre></li>
<li><p>整套的降级适配样式(sets of fallback)，使用<code>selectorName_fallback</code></p>
<blockquote>
<p>原因？ 类似于修改器，保持命名的持续性可以帮助更好地反映出，原始样式和适配更多浏览器所使用的适配样式之间的关系。 </p>
</blockquote>
<pre><code class="hljs less"><span class="hljs-comment">// bad</span>
{
  <span class="hljs-attribute">muscles</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'flex'</span>,
  },

  <span class="hljs-attribute">muscles_sadBears</span>: {
    <span class="hljs-attribute">width</span>: <span class="hljs-string">'100%'</span>,
  },
}

<span class="hljs-comment">// good</span>
{
  <span class="hljs-attribute">muscles</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'flex'</span>,
  },

  <span class="hljs-attribute">muscles_fallback</span>: {
    <span class="hljs-attribute">width</span>: <span class="hljs-string">'100%'</span>,
  },
}
</code></pre></li>
<li><p>整套的降级适配样式，使用独立的选择器</p>
<blockquote>
<p>原因？保持降级适配样式一致被包含在一个独立的对象里面，使他们的目的更清晰明了，更加加强了可读性。</p>
</blockquote>
<pre><code class="hljs less"><span class="hljs-comment">// bad</span>
{
  <span class="hljs-attribute">muscles</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'flex'</span>,
  },

  <span class="hljs-attribute">left</span>: {
    <span class="hljs-attribute">flexGrow</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'inline-block'</span>,
  },

  <span class="hljs-attribute">right</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'inline-block'</span>,
  },
}

<span class="hljs-comment">// good</span>
{
  <span class="hljs-attribute">muscles</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'flex'</span>,
  },

  <span class="hljs-attribute">left</span>: {
    <span class="hljs-attribute">flexGrow</span>: <span class="hljs-number">1</span>,
  },

  <span class="hljs-attribute">left_fallback</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'inline-block'</span>,
  },

  <span class="hljs-attribute">right_fallback</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'inline-block'</span>,
  },
}
</code></pre></li>
<li><p>媒体查询的节点，使用与设备无关的名字（诸如"small"，"medium"，"large"）命名</p>
<blockquote>
<p>为什么？通常使用的名字诸如"phone"，"tablet"以及"desktop"，并没有完全吻合真实设备的特征。因此使用这些名字会（对这些媒体查询的效果）产生错误的期待。</p>
</blockquote>
<pre><code class="hljs 1c"><span class="hljs-comment">// bad</span>
const breakpoints = {
  mobile: '@media (max-width: 639px)',
  tablet: '@media (max-width: <span class="hljs-number">1047</span>px)',
  desktop: '@media (min-width: <span class="hljs-number">1048</span>px)',
};
<span class="hljs-comment">// good</span>
const breakpoints = {
  small: '@media (max-width: 639px)',
  medium: '@media (max-width: <span class="hljs-number">1047</span>px)',
  large: '@media (min-width: <span class="hljs-number">1048</span>px)',
};
</code></pre></li>
</ul>
<h2><a href="https://github.com/#ordering">顺序</a></h2>
<ul>
<li><p>在组件之后定义样式</p>
<blockquote>
<p>为什么？ 我们使用一个更高阶的组件去主体化我们的样式，这样这些样式自然地在组件定义之后被会被使用。将这些样式对象直接传入这个函数中可以减少冗余</p>
</blockquote>
<pre><code class="hljs javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> styles = {
  <span class="hljs-attr">container</span>: {
    <span class="hljs-attr">display</span>: <span class="hljs-string">'inline-block'</span>,
  },
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">{ styles }</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="hljs-string">`&lt;div&gt;`</span>
Never doubt that a small group <span class="hljs-keyword">of</span> thoughtful, committed citizens can
      change the world. Indeed, it’s the only thing that ever has.
    <span class="hljs-string">`&lt;/div&gt;`</span>
);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withStyles(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> styles)(MyComponent);
<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">{ styles }</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="hljs-string">`&lt;div&gt;`</span>
Never doubt that a small group <span class="hljs-keyword">of</span> thoughtful, committed citizens can
      change the world. Indeed, it’s the only thing that ever has.
    <span class="hljs-string">`&lt;/div&gt;`</span>
);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withStyles(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  <span class="hljs-attr">container</span>: {
    <span class="hljs-attr">display</span>: <span class="hljs-string">'inline-block'</span>,
  },
}))(MyComponent);
</code></pre></li>
</ul>
<h2><a href="https://github.com/#nesting">嵌套</a></h2>
<ul>
<li><p>在同一个缩进层级的相邻的样式块之间，留出一个空行</p>
<blockquote>
<p>为什么？留空可以提高可读性，以及减少合并冲突的可能性</p>
</blockquote>
<pre><code class="hljs less"><span class="hljs-comment">// bad</span>
{
  <span class="hljs-attribute">bigBang</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'inline-block'</span>,
    <span class="hljs-string">'::before'</span>: {
      <span class="hljs-attribute">content</span>: <span class="hljs-string">"''"</span>,
    },
  },
  <span class="hljs-attribute">universe</span>: {
    <span class="hljs-attribute">border</span>: <span class="hljs-string">'none'</span>,
  },
}

<span class="hljs-comment">// good</span>
{
  <span class="hljs-attribute">bigBang</span>: {
    <span class="hljs-attribute">display</span>: <span class="hljs-string">'inline-block'</span>,

    <span class="hljs-string">'::before'</span>: {
      <span class="hljs-attribute">content</span>: <span class="hljs-string">"''"</span>,
    },
  },

  <span class="hljs-attribute">universe</span>: {
    <span class="hljs-attribute">border</span>: <span class="hljs-string">'none'</span>,
  },
}
</code></pre></li>
</ul>
<h2><a href="https://github.com/#inline">内联</a></h2>
<ul>
<li><p>Use inline styles for styles that have a high cardinality (e.g. uses the value of a prop) and not for styles that have a low cardinality.</p>
<blockquote>
<p>Why? Generating themed stylesheets can be expensive, so they are best for discrete sets of styles.</p>
</blockquote>
<pre><code class="hljs javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">{ spacing }</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="hljs-string">`&lt;div /&gt;`</span>
);
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">{ styles, spacing }</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="hljs-string">`&lt;div /&gt;`</span>
);
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withStyles(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  <span class="hljs-attr">periodic</span>: {
    <span class="hljs-attr">display</span>: <span class="hljs-string">'table'</span>,
  },
}))(MyComponent);
</code></pre></li>
</ul>
<h2><a href="https://github.com/#themes">主题</a></h2>
<ul>
<li>使用一个抽象层，例如<a href="https://github.com/airbnb/react-with-styles">react-with-styles</a> 来使主题化成为可能。 <em>react-with-styles 让我们可以使用诸如 <code>withStyles()</code>, <code>ThemedStyleSheet</code>, 和 <code>css()</code> ，这些在文中某些代码中已经使用到的方法</em></li>
</ul>
<blockquote>
<p>为什么? 使用一系列共享的变量去改变你组件的样式是非常有用的。使用一个抽象层使得这变得更加方便。另外，这可以防止你的组件与任何特定的底层实现紧密耦合，让你可以更自由地使用</p>
</blockquote>
<ul>
<li><p>仅在主题中定义颜色</p>
<pre><code class="hljs haskell">// bad
<span class="hljs-title">export</span> <span class="hljs-keyword">default</span> withStyles(() =&gt; ({
  <span class="hljs-title">chuckNorris</span>: {
    <span class="hljs-title">color</span>: '#<span class="hljs-title">bada55'</span>,
  },
}))(<span class="hljs-type">MyComponent</span>);
// good
<span class="hljs-title">export</span> <span class="hljs-keyword">default</span> withStyles(({ <span class="hljs-title">color</span> }) =&gt; ({
  <span class="hljs-title">chuckNorris</span>: {
    <span class="hljs-title">color</span>: <span class="hljs-title">color</span>.<span class="hljs-title">badass</span>,
  },
}))(<span class="hljs-type">MyComponent</span>);
</code></pre></li>
<li><p>仅在主题中定义字体</p>
<pre><code class="hljs haskell">// bad
<span class="hljs-title">export</span> <span class="hljs-keyword">default</span> withStyles(() =&gt; ({
  <span class="hljs-title">towerOfPisa</span>: {
    <span class="hljs-title">fontStyle</span>: '<span class="hljs-title">italic'</span>,
  },
}))(<span class="hljs-type">MyComponent</span>);
// good
<span class="hljs-title">export</span> <span class="hljs-keyword">default</span> withStyles(({ <span class="hljs-title">font</span> }) =&gt; ({
  <span class="hljs-title">towerOfPisa</span>: {
    <span class="hljs-title">fontStyle</span>: <span class="hljs-title">font</span>.<span class="hljs-title">italic</span>,
  },
}))(<span class="hljs-type">MyComponent</span>);
</code></pre></li>
<li><p>将字体作为系列相关样式进行定义</p>
<pre><code class="hljs less"><span class="hljs-comment">// bad</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">withStyles</span>(() =&gt; ({
  <span class="hljs-attribute">towerOfPisa</span>: {
    <span class="hljs-attribute">fontFamily</span>: <span class="hljs-string">'Italiana, "Times New Roman", serif'</span>,
    <span class="hljs-attribute">fontSize</span>: <span class="hljs-string">'2em'</span>,
    <span class="hljs-attribute">fontStyle</span>: <span class="hljs-string">'italic'</span>,
    <span class="hljs-attribute">lineHeight</span>: <span class="hljs-number">1.5</span>,
  },
}))(MyComponent);
<span class="hljs-comment">// good</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">withStyles</span>(({ font }) =&gt; ({
  <span class="hljs-attribute">towerOfPisa</span>: {
    ...font.italian,
  },
}))(MyComponent);
</code></pre></li>
<li><p>在主题中定义基础网格单位（可以是一个值，也可以是一个函数）</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withStyles(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  <span class="hljs-attr">rip</span>: {
    <span class="hljs-attr">bottom</span>: <span class="hljs-string">'-6912px'</span>, <span class="hljs-comment">// 6 feet</span>
  },
}))(MyComponent);
<span class="hljs-comment">// good</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withStyles(<span class="hljs-function">(<span class="hljs-params">{ units }</span>) =&gt;</span> ({
  <span class="hljs-attr">rip</span>: {
    <span class="hljs-attr">bottom</span>: units(<span class="hljs-number">864</span>), <span class="hljs-comment">// 6 feet, assuming our unit is 8px</span>
  },
}))(MyComponent);
<span class="hljs-comment">// good</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withStyles(<span class="hljs-function">(<span class="hljs-params">{ unit }</span>) =&gt;</span> ({
  <span class="hljs-attr">rip</span>: {
    <span class="hljs-attr">bottom</span>: <span class="hljs-number">864</span> * unit, <span class="hljs-comment">// 6 feet, assuming our unit is 8px</span>
  },
}))(MyComponent);
</code></pre></li>
<li><p>仅在主题中定义媒体查询</p>
<pre><code class="hljs less"><span class="hljs-comment">// bad</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">withStyles</span>(() =&gt; ({
  <span class="hljs-attribute">container</span>: {
    <span class="hljs-attribute">width</span>: <span class="hljs-string">'100%'</span>,

    <span class="hljs-string">'@media (max-width: 1047px)'</span>: {
      <span class="hljs-attribute">width</span>: <span class="hljs-string">'50%'</span>,
    },
  },
}))(MyComponent);
<span class="hljs-comment">// good</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">withStyles</span>(({ breakpoint }) =&gt; ({
  <span class="hljs-attribute">container</span>: {
    <span class="hljs-attribute">width</span>: <span class="hljs-string">'100%'</span>,

    [breakpoint.medium]: {
      <span class="hljs-attribute">width</span>: <span class="hljs-string">'50%'</span>,
    },
  },
}))(MyComponent);
</code></pre></li>
<li><p>在主题中定义奇淫技巧的降级适配样式</p>
<blockquote>
<p>为什么？许多CSS-in-JavaScript实现将样式对象合并在一起，这使得为相同的属性指定降级样式会有那么一点取巧。 为了保持方法统一，建议将这些降级样式放入主题中</p>
</blockquote>
<pre><code class="hljs lisp">// bad
export default withStyles(() =&gt; ({
  .muscles {
    display: 'flex',
  },

  .muscles_fallback {
    'display ': 'table',
  },
}))(<span class="hljs-name">MyComponent</span>)<span class="hljs-comment">;</span>
// good
export default withStyles(({ fallbacks }) =&gt; ({
  .muscles {
    display: 'flex',
  },

  .muscles_fallback {
    [fallbacks.display]: 'table',
  },
}))(<span class="hljs-name">MyComponent</span>)<span class="hljs-comment">;</span>
// good
export default withStyles(({ fallback }) =&gt; ({
  .muscles {
    display: 'flex',
  },

  .muscles_fallback {
    [fallback('display')]: 'table',
  },
}))(<span class="hljs-name">MyComponent</span>)<span class="hljs-comment">;</span>
</code></pre></li>
<li><p>创建尽量少的自定义主题。很多应用都只有一个主题。</p>
</li>
<li><p>命名空间自定义主题设置在一个拥有唯一的描述性键名的嵌套对象中。</p>
<pre><code class="hljs less"><span class="hljs-comment">// bad</span>
<span class="hljs-selector-tag">ThemedStyleSheet</span><span class="hljs-selector-class">.registerTheme</span>(<span class="hljs-string">'mySection'</span>, {
  <span class="hljs-attribute">mySectionPrimaryColor</span>: <span class="hljs-string">'green'</span>,
});
<span class="hljs-comment">// good</span>
<span class="hljs-selector-tag">ThemedStyleSheet</span><span class="hljs-selector-class">.registerTheme</span>(<span class="hljs-string">'mySection'</span>, {
  <span class="hljs-attribute">mySection</span>: {
    <span class="hljs-attribute">primaryColor</span>: <span class="hljs-string">'green'</span>,
  },
});
</code></pre></li>
</ul>
<hr>
<p>CSS puns 改编自 <a href="https://saijogeorge.com/css-puns/">Saijo George</a>.</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/javascript-css-in-javascript-at-master](https://www.zcfy.cc/article/javascript-css-in-javascript-at-master)
原文标题: Airbnb CSS-in-JavaScript 风格指南
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
