---
title: 'React v16.4.0: 指针事件 - React Blog'
reprint: true
categories: reprint
abbrlink: 532621aa
date: 2018-10-20 00:00:00
---

{{% raw %}}

            <p>May 23, 2018 by <a href="https://twitter.com/acdlite">Andrew Clark</a></p>
<p>最新的版本增加了对经常请求的功能的支持：指针事件！</p>
<p>它还包括getDerivedStateFromProps的错误修正。查看下面的完整<a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#changelog">更新日志</a>。</p>
<h2><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#pointer-events"></a>指针事件</h2>
<p>React DOM中现在提供以下事件类型：</p>
<ul>
<li>onPointerDown</li>
<li>onPointerMove</li>
<li>onPointerUp</li>
<li>onPointerCancel</li>
<li>onGotPointerCapture</li>
<li>onLostPointerCapture</li>
<li>onPointerEnter</li>
<li>onPointerLeave</li>
<li>onPointerOver</li>
<li>onPointerOut</li>
</ul>
<p>请注意，这些事件仅适用于支持<a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events">指针事件</a> 规范的浏览器。 （在撰写本文时，这包括最新版本的Chrome，Firefox，Edge和Internet Explorer。）如果您的应用程序依赖于指针事件，我们建议使用第三方指针事件polyfill。我们选择不在React DOM中包含这样的polyfill，以避免增加bundle大小。</p>
<p><a href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKADgQwMYGs0HMYB0AVnAPYB2SoGFALjObVSACYwoNvkYTzMBOMTE0QgoaenCYAaEIOEBaFqQC2SMRPhMAvrtkRybAB7EEyEDUYMRICCpSl-tAAQAlIRhdh-q5wHJ5Tz8AbgAdcjsHJzcPWgARAHkAWWdvXwDYpVUQ8PDLKWcAYQBJV0KAGQBRAH0AZWKALUrnAF5nAA4AVjDyPPE4OGc4_jwAIVIjZxgjekNB92ECQtUHcmtnYHDnZylNVo2t7ecACzQ4QrQUWgBXQURUtCg4GGlD7Z5-DFhymDBae_aAAZXuQjs4Pl8YAAVUgoAHAw7aHrbCBwYZ4XAGXD7MCPZ7I5woQQANwgpGucB-f32gIJRJgpPJcBhKBpPUOFDipAA7qC2gz1i0AHwHUFHWjHVEEVHo3CY8jYtq0fjXGAE7YCxgEWhofj4WgEZ60AAKpAM9H4FyutxgAApNQaHOaYPxiiwAJTssXbAD0PucAHUYDtaI5gxLgwYILQII9waRHCwDJpBqHnAAjYNodOwZxpjCPDDXcT0PPHYMYU4K-BvZx-5wll3OCgEWsSqXTZXCU1waNk8hxGBQHX24nWT2Ir3bChJUhj_YO1oizbe5wQMDOW0AQnbcGlaJGcqx7tFYO2ghu_HI6uc2lr-RcwFgf2kedh2n2u4InZGnh7fc5IcRwdCdelXL8jVqHV6FtW1gAhb5floV8EOhd8T2FTcVzPcEIE-RC_nuVCqRcABqBskJBHDUJZIi8MhFlnHI0MUCoo5tHdUDtiRXIxQoABVVl-THRgl03L8ZUPeVFQeJ4YC45tyAAcVIWgrUvYNhMFEUIJgWgoM0ODTnOS4NPuZVVQ4gkKHKUgpHUm0FxElxhTbSU90g6C7WAYyHLuWTnis3iNRmX8TTsgCByAtAnO008jgfCjqS0rV0HwAANG9EpY2LUrwGAAE0sooAo2GHGK2mws9n3-JKXAUMspXpRkKRItiwRY8zYWcBqv2askKRZdrbxvPqSQGykkP2GrRvcgh-qZRilVhG8L1uUEyp1AkeLA89OBdW0Tyq94SsfXzTJtFD6II5DcPwtCUA_JU5t2egpwS06MwmKCAE9c0q2ttnTRMXXuPwAEYUEmMgoAgFhnAAYhYABOFGUb8YbthUXV5TB8HASh5xAWcAAmAmjAxwHnBUAwAAkYAgXBjlqgAWQEEVXbZuThiU8fZgBSSnOcJCKYwoMHBBLCAxyFsEdvvT7UN-_74rBbmWF5opSgqGp6iaTGTgZpnapKMoqjqRpKgN4H-DYfhXDQJMKXuU2dYtpo61Jg2HF7MXyDB7MYeuehZeqpC6Putqqc6u6GNha3MCwXAfGuQxligRx7nO61BGcAB-fwc1VPxnDB5OYAYUOOvJSsAEFPH7MHyAoGAq5G4KjjWq9NypgAeJNiRDP6YBaYBgaMZWYG0IUqe2fvpdno4pGH0eldoYe72FsEKFNZ1-C5XlR6_TkeXITecO38hd6sfhZzHI-5pnOcp8X6cr7NG_BIfqUBMe1_FOvhaC43Ahzfz3L_c-F834qXCnvPyI9gDH2UqpeBkCoE2TsrAm-8CwEEAwfZC6gg0Fnh9DPYWvcfQDzIWCBSm9N7hAWJ4RISQCCCEMAdQ4vdZTjEmKQtiygiwqGsAQfUlRYBCMYKMH6bpbQBATLQPw7pwigRANofQ7CTDMxUFAZglhZg2HnoPOGLRQhyHkaYoUFCqGqN0EAA">在CodeSandbox中参看实例</a></p>
<p>非常感谢<a href="https://github.com/philipp-spiess">Philipp Spiess</a>为此做出贡献！</p>
<h2><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#bugfix-for-getderivedstatefromprops"></a>getDerivedStateFromProps的修改</h2>
<p>无论更新的原因如何，每次呈现组件时都会调用getDerivedStateFromProps。以前，只有在组件由其父组件重新呈现时才会调用它，并且不会因本地setState而触发。这是对最初实施的疏忽，现在已得到纠正。之前的行为更类似于componentWillReceiveProps，但改进的行为确保了与React即将推出的异步呈现模式的兼容性。</p>
<p>此错误修复不会影响大多数应用程序，但它可能会导致一小部分组件出现问题。其重要的罕见情况分为两类：</p>
<h3><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#1-avoid-side-effects-in-getderivedstatefromprops"></a>1. 避免在getDerivedStateFromProps中出现副作用</h3>
<p>与render方法一样，getDerivedStateFromProps应该是props和state的纯函数。 getDerivedStateFromProps中的副作用从未受到支持，但由于它现在比以前更频繁地触发，因此最近的更改可能会暴露以前未发现的错误。</p>
<p>应将副作用代码移动到其他方法：例如，Flux调度通常属于原始事件处理程序，手动DOM突变属于componentDidMount或componentDidUpdate。您可以在我们最近关于<a href="https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html">准备异步呈现</a>的帖子中阅读更多相关信息。</p>
<h3><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#2-compare-incoming-props-to-previous-props-when-computing-controlled-values"></a>2. 在计算受控值时将传入的props与先前的props进行比较</h3>
<p>以下代码假定getDerivedStateFromProps仅触发prop的更改：</p>
<pre><code class="hljs pf">static getDerivedStateFromProps(props, <span class="hljs-keyword">state</span>) {
  if (props.value !== <span class="hljs-keyword">state</span>.controlledValue) {
    return {
      // Since this method fires <span class="hljs-keyword">on</span> both props and <span class="hljs-keyword">state</span> changes, local updates
      // <span class="hljs-keyword">to</span> the controlled value will be ignored, because the props version
      // always overrides it. Oops!
      controlledValue: props.value,
    };
  }
  return null;
}

</code></pre><p>解决此问题的一种可能方法是通过将以前的props存储在状态中来比较传入值与之前的值：</p>
<pre><code class="hljs pf">static getDerivedStateFromProps(props, <span class="hljs-keyword">state</span>) {
  const prevProps = <span class="hljs-keyword">state</span>.prevProps;
  // Compare the incoming prop <span class="hljs-keyword">to</span> previous prop
  const controlledValue =
    prevProps.value !== props.value
      ? props.value
      : <span class="hljs-keyword">state</span>.controlledValue;
  return {
    // Store the previous props <span class="hljs-keyword">in</span> <span class="hljs-keyword">state</span>
    prevProps: props,
    controlledValue,
  };
}

</code></pre><p>但是，无论是使用较新的getDerivedStateFromProps还是遗留的componentWillReceiveProps，在state“镜像”props的代码通常都包含错误。我们发布了一篇后续博客文章，更详细地解释了这些问题，并提出了不涉及getDerivedStateFromProps（）的<a href="https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html">更简单的解决方案</a>。</p>
<h2><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#installation"></a>安装</h2>
<p>可以在npm上安装React v16.4.0</p>
<p>也可以使用yaran安装React 16，执行：</p>
<pre><code class="hljs lsl">yarn add react@^<span class="hljs-number">16.4</span><span class="hljs-number">.0</span> react-dom@^<span class="hljs-number">16.4</span><span class="hljs-number">.0</span>

</code></pre><p>要使用npm安装React 16，请运行：</p>
<pre><code class="hljs lsl">npm install --save react@^<span class="hljs-number">16.4</span><span class="hljs-number">.0</span> react-dom@^<span class="hljs-number">16.4</span><span class="hljs-number">.0</span>

</code></pre><p>我们还通过CDN提供了反应的UMD版本：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">crossorigin</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/react@16/umd/react.production.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">crossorigin</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>有关详细的安装说明，<a href="https://reactjs.org/docs/installation.html">请参阅文档</a>。</p>
<h2><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#changelog"></a></h2>
<p>更新日志</p>
<h3><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#react"></a>React</h3>
<ul>
<li>添加一个新的<a href="https://github.com/reactjs/rfcs/pull/51">实验</a> 性React.unstable_Profiler组件以测量性能。 (<a href="https://github.com/bvaughn">@bvaughn</a> 在 <a href="https://github.com/facebook/react/pull/12745">#12745</a>)</li>
</ul>
<h3><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#react-dom"></a>React DOM</h3>
<ul>
<li>添加对Pointer Events规范的支持。(<a href="https://github.com/philipp-spiess">@philipp-spiess</a> in <a href="https://github.com/facebook/react/pull/12507">#12507</a>)</li>
<li>无论重新渲染的原因如何，都要正确调用getDerivedStateFromProps（） 。(<a href="https://github.com/acdlite">@acdlite</a> in <a href="https://github.com/facebook/react/pull/12600">#12600</a> and <a href="https://github.com/facebook/react/pull/12802">#12802</a>)</li>
<li>修复了在某些情况下阻止上下文传播的错误。 (<a href="https://github.com/gaearon">@gaearon</a> in <a href="https://github.com/facebook/react/pull/12708">#12708</a>)</li>
<li>修复在更深的setState（）上使用forwardRef（）重新渲染组件的问题。 (<a href="https://github.com/gaearon">@gaearon</a> in <a href="https://github.com/facebook/react/pull/12690">#12690</a>)</li>
<li>修复一些属性错误地从自定义元素节点中删除。(<a href="https://github.com/airamrguez">@airamrguez</a> in <a href="https://github.com/facebook/react/pull/12702">#12702</a>)</li>
<li>如果上面有遗留上下文提供程序，修复上下文提供程序不要对子项进行纾困。(<a href="https://github.com/gaearon">@gaearon</a> in <a href="https://github.com/facebook/react/pull/12586">#12586</a>)</li>
<li>添加在上下文提供程序组件上指定propTypes的功能。(<a href="https://github.com/nicolevy">@nicolevy</a> in <a href="https://github.com/facebook/react/pull/12658">#12658</a>)</li>
<li>在<code>&lt;StrictMode&gt;</code>中使用react-lifecycles-compat时修复误报警告. (<a href="https://github.com/bvaughn">@bvaughn</a> in <a href="https://github.com/facebook/react/pull/12644">#12644</a>)</li>
<li>当forwardRef（）render函数具有propTypes或defaultProps时发出警告。(<a href="https://github.com/bvaughn">@bvaughn</a> in <a href="https://github.com/facebook/react/pull/12644">#12644</a>)</li>
<li>改进forwardRef（）和上下文使用者在组件堆栈中的显示方式。(<a href="https://github.com/sophiebits">@sophiebits</a> in <a href="https://github.com/facebook/react/pull/12777">#12777</a>)</li>
<li>更改内部事件名称。这可能会破坏以不受支持的方式依赖React内部的第三方软件包。(<a href="https://github.com/philipp-spiess">@philipp-spiess</a> in <a href="https://github.com/facebook/react/pull/12629">#12629</a>)</li>
</ul>
<h3><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#react-test-renderer"></a>React Test Renderer</h3>
<ul>
<li>修复getDerivedStateFromProps（）支持以匹配新的React DOM行为。(<a href="https://github.com/koba04">@koba04</a> in <a href="https://github.com/facebook/react/pull/12676">#12676</a>)</li>
<li>当父级是片段或其他特殊节点时，修复testInstance.parent崩溃。
(<a href="https://github.com/gaearon">@gaearon</a> in <a href="https://github.com/facebook/react/pull/12813">#12813</a>)</li>
<li>现在，测试渲染器遍历方法可以发现forwardRef（）组件。(<a href="https://github.com/gaearon">@gaearon</a> in <a href="https://github.com/facebook/react/pull/12725">#12725</a>)</li>
<li>Shallow渲染器现在忽略返回null或undefined的setState（）更新程序。(<a href="https://github.com/koba04">@koba04</a> in <a href="https://github.com/facebook/react/pull/12756">#12756</a>)</li>
</ul>
<h3><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#react-art"></a>React ART</h3>
<ul>
<li>修复从React DOM管理的树提供的读取上下文。
(<a href="https://github.com/acdlite">@acdlite</a> in <a href="https://github.com/facebook/react/pull/12779">#12779</a>)</li>
</ul>
<h3><a href="https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops/#react-call-return-experimental"></a>React Call Return (Experimental)</h3>
<ul>
<li>此实验已删除，因为它影响了捆绑包大小，并且API不够好。它可能会以某种其他形式回到未来。
(<a href="https://github.com/gaearon">@gaearon</a> in <a href="https://github.com/facebook/react/pull/12820">#12820</a>)</li>
</ul>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/react-v16-4-0-pointer-events-react-blog](https://www.zcfy.cc/article/react-v16-4-0-pointer-events-react-blog)
原文标题: React v16.4.0: 指针事件 - React Blog
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
