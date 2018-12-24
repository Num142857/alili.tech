---
title: 'Babel 配置工程师应知应会' 
date: 2018-12-23 2:30:07
hidden: true
slug: dankhstbg78
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Babel</h1>
<p>Sorry，标题党了，本文仅介绍 Babel 相关生态和一些配置心得。</p>
<h1 id="articleHeader1">Babel 各个 package 的用途</h1>
<ul>
<li>
<code>babel-core</code>: 核心部分</li>
<li>
<code>babel-cli</code>: 允许使用命令行</li>
<li>
<code>babel-node</code>: babel-node 直接执行 es6/jsx 文件，自动加载 polyfill</li>
<li>
<p><code>babel-register</code>: 以文件形式实现 babel-node 功能，多用于实时编译</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以下相当于 babel-node ./test --presets react
require('babel-register')({ presets: ['react'] });
require('./test')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 以下相当于 babel-node ./test --presets react</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-register'</span>)({ <span class="hljs-attr">presets</span>: [<span class="hljs-string">'react'</span>] });
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./test'</span>)</code></pre>
</li>
<li>
<code>babel-plugin-external-helpers</code>: 把 helpers 收集到一个共享模块或共享文件。<br>helper 函数是 babel 在 transform 时候常用的工具函数，对编译模块时，会将用到的 helpers 放到模块顶部。如果编译多个文件，就会重复引用，导致每个模块都定义一份。</li>
</ul>
<h2 id="articleHeader2">polyfill 相关</h2>
<ul>
<li>
<code>babel-runtime</code>: polyfill （内含 core.js 和 regenerator）、helpers 集合</li>
<li>
<code>babel-polyfill</code>: 和 <code>babel-runtime</code> 类似，但直接整体引入目标环境中</li>
<li>
<code>babel-plugin-transform-runtime</code>: 和 <code>babel-polyfill</code> 一样，但是不是一次性引入全部 polyfill，而是根据你该文件用到多少，引多少</li>
</ul>
<p>对比上述两种 polyfill 方案，写库用 transform-runtime，写应用就 babel-polyfill</p>
<ul>
<li>babel-polyfill 优点是<strong>全面</strong>，反过来说就是<strong>污染原生</strong>、增大体积</li>
<li>transform-runtime 优点是按需，纯净，不会污染原生，但会拖慢编译速度</li>
</ul>
<h2 id="articleHeader3">stage</h2>
<ul>
<li>stage-x 是会根据 tc39 动态调整的</li>
<li>stage-0 &gt; stage-1 &gt; stage-2 &gt; stage-3<br>比如你引入了 stage-1，自动包含了 stage-2 和 stage-3</li>
</ul>
<h1 id="articleHeader4">一般化的 Babel 配置</h1>
<p>基本都是使用 <code>preset-env</code> + 几个 stage，一般来说到 <code>stage-2</code> 就可以了。</p>
<h2 id="articleHeader5">babel-preset-env</h2>
<ul>
<li>
<code>debug</code>: 用来看最终引入了哪些 polyfill、plugins</li>
<li>
<code>useBuiltIns</code>: 必须配合 <code>babel-polyfill</code>，貌似加入了此项以后，会得到类似于 <code>babel-plugin-transform-runtime</code> 的效果。但是根据实验得出，还是 transform-runtime 在减肥上的效果更好。而且它不处理 helpers，你还是不能省略 external-helpers 这个插件</li>
<li>
<code>modules</code>: 是否编译模块导入导出语句<br>webpack 和 rollup 都可以对 es 模块做 <a href="https://rollupjs.org/zh#tree-shaking" rel="nofollow noreferrer" target="_blank">Tree Shaking</a>，所以要设置 modules 为 false</li>
<li>
<code>loose</code>: 宽松模式，编译的结果在运行时，其内部并不严格遵循 es6 标准<br>通过减少判断和限制，有效提高效率甚至包体积</li>
<li>
<code>exclude/include</code>: 编译时排除或使用某插件</li>
</ul>
<h2 id="articleHeader6">env</h2>
<p>这个 env 和上面那个不同... 这里的 env 是指，一个 babel 文件针对不同环境（读取 <code>NODE_ENV</code>、<code>BABEL_ENV</code>），做不同配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;env&quot;: {
    &quot;development&quot;: {
      &quot;presets&quot;: [
        [
          &quot;env&quot;,
        ]
      ]
    },
    &quot;production&quot;: {
      ...
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"env"</span>: {
    <span class="hljs-attr">"development"</span>: {
      <span class="hljs-attr">"presets"</span>: [
        [
          <span class="hljs-string">"env"</span>,
        ]
      ]
    },
    <span class="hljs-attr">"production"</span>: {
      ...
    }
  }
}
</code></pre>
<h2 id="articleHeader7">好用的 plugins 和 presets</h2>
<ul>
<li>
<code>babel-plugin-transform-remove-console</code><br>生产时，代码中应该不包含 console.log。</li>
<li>
<code>babel-plugin-transform-decorators-legacy</code><br>装饰器</li>
<li>
<code>babel-preset-minify</code><br>用于生产时压缩代码，包括前述的 remove-console。但是没有 uglify 牛逼。</li>
</ul>
<h1 id="articleHeader8">React 相关</h1>
<p><code>babel-preset-react</code> 已经包含了一组 plugins</p>
<ul>
<li>
<code>preset-flow</code>: 编译 flow</li>
<li>
<code>syntax-jsx</code>: 识别 jsx 语法</li>
<li>
<code>transform-react-jsx</code>: 编译 jsx</li>
<li>
<code>transform-react-display-name</code>: 自动添加组件的 displayName</li>
</ul>
<p>但上面这些只是满足基础编译而已，你额外可以添加下面这个 preset 提高 React 应用的性能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i babel-preset-react-optimize" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> babel-preset-react-optimize</code></pre>
<p>项目主页有详细的说明，简要概括下</p>
<ul>
<li>
<code>transform-react-constant-elements</code><br>识别并转换可以转成常量的组件</li>
<li>
<code>transform-react-remove-prop-types</code><br>删除 propTypes</li>
<li>
<code>transform-react-pure-class-to-function</code><br>尽可能把 class 组件转为 functional 组件</li>
</ul>
<h1 id="articleHeader9">References</h1>
<ul>
<li><a href="https://segmentfault.com/a/1190000011155061?utm_source=tuicool&amp;utm_medium=referral">你真的会用 Babel 吗?</a></li>
<li><a href="https://babeljs.io/docs/plugins/#transform-plugins-react" rel="nofollow noreferrer" target="_blank">React Plugins · Babel</a></li>
<li><a href="https://github.com/thejameskyle/babel-react-optimize" rel="nofollow noreferrer" target="_blank">thejameskyle/babel-react-optimize: A Babel preset and plugins for optimizing React code.</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Babel 配置工程师应知应会

## 原文链接
[https://segmentfault.com/a/1190000012327811](https://segmentfault.com/a/1190000012327811)

