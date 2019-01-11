---
title: 'react进阶系列 - 高阶组件详解四：高阶组件的嵌套使用' 
date: 2019-01-11 2:30:07
hidden: true
slug: 9k39w40hf4
categories: [reprint]
---

{{< raw >}}

                    
<p>前面有讲到过很多页面会在初始时验证登录状态与用户角色。我们可以使用高阶组件来封装这部分验证逻辑。封装好之后我们在使用的时候就可以如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default withRule(Home);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withRule(Home);</code></pre>
<p>但是当我们的项目中使用了路由组件<code>react-router</code>，那么很有可能这些页面在需要严重登录状态的同时，会用到<code>withRouter</code>来获取路由相关的信息。这个时候就涉及到一个高阶组件的嵌套使用。因为每一个高阶组件最终返回的其实都是一个组件，而且都是新增基础组件的能力，因此我们可以简单粗暴的直接嵌套。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default withRule(withRouter(Home));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withRule(withRouter(Home));</code></pre>
<p>但是当这样的页面变得越来越多时，那么处理起来是非常繁琐的。因此我们需要将这样共同的逻辑进一步封装一下，便于统一处理。而这样的封装，我们需要借助<code>lodash</code>中的<code>flowRight</code>方法。</p>
<blockquote>老版本的lodash中为compose方法，最新的版本中compose方法更名为flowRight</blockquote>
<p>他的含义借助下面的例子来简单说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn3(a) { 
    console.log(a);
    return a + 20; 
}

function fn2(a) { 
    console.log(a);
    return a - 1 ;
}

function fn1(a) { 
    console.log(a) 
}

_.flowRight(fn1, fn2, fn3)(20);

//输出结果依次为 20 40 39" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn3</span>(<span class="hljs-params">a</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(a);
    <span class="hljs-keyword">return</span> a + <span class="hljs-number">20</span>; 
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params">a</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(a);
    <span class="hljs-keyword">return</span> a - <span class="hljs-number">1</span> ;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params">a</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(a) 
}

_.flowRight(fn1, fn2, fn3)(<span class="hljs-number">20</span>);

<span class="hljs-comment">//输出结果依次为 20 40 39</span></code></pre>
<p>首先，这个方法的第一层含义是第一个括号中传入的方法会从右到左依次执行。<br>第二层含义是第二个括号中的参数会作为最先执行方法的参数，然后把运行结果当做下一个方法的参数这样依次执行。</p>
<p>因此就有了这样的执行结果。从20，到40，再到39。</p>
<p>而每一个高阶组件函数执行之后中所返回的组件，刚好可以作为下一个高阶组件的参数继续执行，而并不会影响基础组件中所获得的新能力。因此我们可以借助lodash的这个方法来封装高阶组件的嵌套。</p>
<p>封装方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// utils/withRuleRouter.js
import withRule from 'utils/withRule';
import flowRight from 'lodash/flowRight';
import { withRouter } from 'react-router';

export default function withRuleRouter(WrappedComponent) {
    return flowRight(withRule, withRouter)(WrappedComponent);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// utils/withRuleRouter.js</span>
<span class="hljs-keyword">import</span> withRule <span class="hljs-keyword">from</span> <span class="hljs-string">'utils/withRule'</span>;
<span class="hljs-keyword">import</span> flowRight <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/flowRight'</span>;
<span class="hljs-keyword">import</span> { withRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withRuleRouter</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
    <span class="hljs-keyword">return</span> flowRight(withRule, withRouter)(WrappedComponent);
}
</code></pre>
<p>这样，我们在基础组件中使用它时就很简单了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import withRuleRouter from 'utils/withRuleRouter';

class Home extends Component { ... }

export default withRuleRouter(Home);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> withRuleRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'utils/withRuleRouter'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{ ... }

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> withRuleRouter(Home);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react进阶系列 - 高阶组件详解四：高阶组件的嵌套使用

## 原文链接
[https://segmentfault.com/a/1190000009952010](https://segmentfault.com/a/1190000009952010)

