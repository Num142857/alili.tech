---
title: '从观麦前端框架的角度看css' 
date: 2018-12-30 2:30:10
hidden: true
slug: sxnq6zozlz
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">兼容</h2>
<p>pc web：比如 MA Station。基于chrome，可以手机访问（需要业务做适配）。 android 上兼容 微信浏览器 和 QQ浏览器，safari 支持 iOS &gt; 8（safari 的版本随系统版本）。比较任性。</p>
<p>mobile web：比如 下单系统。主要在微信浏览器内访问。</p>
<p>safari 的兼容测试可以用 mac 自带的模拟器 simulator 来测试，非常方便。</p>
<h2 id="articleHeader1">bootstrap</h2>
<p>基于老牌的 bootstrap，相对简单易用。v4 现在还在 beta 中，如果正式了还是可以考虑迁移的。或者 beta 阶段迁移。</p>
<h2 id="articleHeader2">less</h2>
<p>因为 bootstrap3 是 less ，移动端基于所以也就用了 less， 实际上 sass 更强大。bootstrap4 也采用了 sass。等迁移到 bootstrap4 后我们也会采用 sass 的，就是这么任性。</p>
<p>less 函数有个特性有点奇怪，我用过，不过不具备可维护性，不建议大家用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正常情况

.fun1(){
    background: red;
}

.aaa{
    .fun1();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-comment">// 正常情况</span>

<span class="hljs-selector-class">.fun1</span>(){
    <span class="hljs-attribute">background</span>: red;
}

<span class="hljs-selector-class">.aaa</span>{
    <span class="hljs-selector-class">.fun1</span>();
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个类名也可以当函数用，不建议用
.class1{
    background: red;
}

.aaa{
    .class1();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-comment">// 一个类名也可以当函数用，不建议用</span>
<span class="hljs-selector-class">.class1</span>{
    <span class="hljs-attribute">background</span>: red;
}

<span class="hljs-selector-class">.aaa</span>{
    <span class="hljs-selector-class">.class1</span>();
}</code></pre>
<h2 id="articleHeader3">flex</h2>
<p>web 开发都是基于 flex 的，这给我们的布局很大的方便，非常的灵活，可以很简单的。</p>
<p>上面系统的整体兼容性也基本是考虑 flex 的兼容上。</p>
<p>要特别注意的地方是 flex-shrink 即项目的缩小比例，默认为1，即如果空间不足，该项目缩小。 但是不推荐直接操作 flex-shrink，而是用 flex: none 或者 flex: auto。</p>
<h2 id="articleHeader4">移动端高清屏1px</h2>
<p>框架用的方法是 scale(0.5) 方法。不过多介绍，(网上文章很多)[<a href="https://juejin.im/entry/584e427361ff4b006cd22c7c%5D" rel="nofollow noreferrer" target="_blank">https://juejin.im/entry/584e4...</a></p>
<h2 id="articleHeader5">命名</h2>
<p>没有前缀的 <code>btn</code> 是 bootstrap，前缀 <code>gm-</code> 是 react-gm 库的。 <code>b-</code> 是 业务内的。(连接符<code>-</code>)</p>
<p>模块内部的命名保留模块，即</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// good 长是长了点，但是可维护性可读性很强
.b-home{
    .b-home-top{
        background: red;
        .b-home-top-btn{
            background: white;
        }
    }
}
// bad 因为可能其他库有定义了 top 这个样式。 这样就会有被覆盖的可能性。
.b-home{
    .top{
        background: red;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-comment">// good 长是长了点，但是可维护性可读性很强</span>
<span class="hljs-selector-class">.b-home</span>{
    <span class="hljs-selector-class">.b-home-top</span>{
        <span class="hljs-attribute">background</span>: red;
        <span class="hljs-selector-class">.b-home-top-btn</span>{
            <span class="hljs-attribute">background</span>: white;
        }
    }
}
<span class="hljs-comment">// bad 因为可能其他库有定义了 top 这个样式。 这样就会有被覆盖的可能性。</span>
<span class="hljs-selector-class">.b-home</span>{
    <span class="hljs-selector-class">.top</span>{
        <span class="hljs-attribute">background</span>: red;
    }
}</code></pre>
<p>特殊的类名除外，比如 <code>disabled</code> <code>checked</code> <code>error</code> <code>in</code> <code>out</code> <code>on</code> <code>off</code> 等除外。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".b-home{
    .b-home-top{
        .disabled{
            background: gray;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-selector-class">.b-home</span>{
    <span class="hljs-selector-class">.b-home-top</span>{
        <span class="hljs-selector-class">.disabled</span>{
            <span class="hljs-attribute">background</span>: gray;
        }
    }
}</code></pre>
<p>less 变量命名同上，只是换成了骆驼峰，去掉了连接符</p>
<p>命名上有个出名的 BEM ，不了解，哈哈。</p>
<h2 id="articleHeader6">组合思想</h2>
<p>目标是开发者想实现什么样式，通过 react-gm bootstrap 提供的类名来组合即可，这要求他们提供的类名足够丰富。当然这个想法已经满足了。</p>
<p>至于可能会出现某些场景不满足的（肯定会有），做法是</p>
<p>1 是否场景不合理？也可能是故意约束，克制，不提供此功能。<br>2 提出来讨论，共同抽象，沉淀到 react-gm 上。<br>3 实在特殊的就特殊处理，直接写在style上。</p>
<p>那组合思想是，其实 bootstrap 也是组合思想</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div className=&quot;gm-border gm-padding-5 gm-bg&quot;></div>

<btn className=&quot;btn btn-primary btn-lg disabled&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"gm-border gm-padding-5 gm-bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">btn</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn btn-primary btn-lg disabled"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>组合思想带来的好处是</p>
<p>1 可读性和可维护性增强，通过 className 能想象出 UI。<br>2 速度快，直接写 jsx 即可。 不用来回切换 js/html css 文件。</p>
<h2 id="articleHeader7">分离css</h2>
<p>以前 css 是通过 webpack 打包在 js 内的，这样带来的坏处是</p>
<ul>
<li>js 要处理这些 css，自然需要花费时间。同时还阻塞其他 js 代码的执行时间。</li>
<li>按照组合思想开发，理论上 css 会很少改动，js 确实常改动。这样 css 没法独立缓存。</li>
<li>如果有 dom 的话，会是先 dom 出来，之后加载 js 处理 css 部分。这时会看到页面没样式，突然又有样式的闪烁，不太好。理论上 css 最好释放 head 提前 load。</li>
</ul>
<p>所以就分离了呗。</p>
<h2 id="articleHeader8">降级处理</h2>
<p>通过 autoprefixer 来做降级，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原来
display: flex;

// 处理后
display: -webkit-box;
display: -webkit-flex;
display: flex;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-comment">// 原来</span>
<span class="hljs-attribute">display</span>: flex;

<span class="hljs-comment">// 处理后</span>
<span class="hljs-attribute">display</span>: -webkit-box;
<span class="hljs-attribute">display</span>: -webkit-flex;
<span class="hljs-attribute">display</span>: flex;</code></pre>
<p>细心的同学可以发现，只有 <code>-webkit-</code>，没有 <code>-ms- -moz- -o-</code>。从兼容性上来考虑，只处理 <code>-webkit-</code> 已足够。</p>
<h2 id="articleHeader9">css module</h2>
<p>有短时间引入了 css module，不过现在用的很少了。 当成的目的是 css module 模块化，但是带来了一些问题</p>
<ul>
<li>css(less) 模块化后随 js 的引入而引入，css 即异步加载的</li>
<li>以此同时 less 并没有在主框架上，因此没法使用 变量 函数 等。</li>
</ul>
<p>于是慢慢废弃。</p>
<p>随着 react-gm 提供的类名组件完善，后面真正用到 css module 的地方少之又少。 所以后面 css module 是会被废弃掉的。</p>
<h2 id="articleHeader10">react-gm.min.css</h2>
<p>以前 react-gm 是提供 dist 文件的，即 js 和 css。这样在开发 Station 系统的时候没有问题。 </p>
<p>但是 MA 要求换种颜色主题，那么就需要和 bootstrap 一样，提供一个 theme.css 的文件。 要抽出这 part 需要进行改造，工作量是挺大的。</p>
<p>后来 react-gm 废弃了 dist 形式，直接引入 src 的  index.js 和 index.less 文件。</p>
<h2 id="articleHeader11">库的 css 怎么引进来</h2>
<p>基于上点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ma index.js
import 'react-gm';
import './index.less'

// ma index.less 覆盖主题色变量即完成换主题
@brand-primary: #2c9feb;

// react-gm index.js
import './index.less'

// react-gm index.less
@import &quot;less/bootstrap.less&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ma index.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'react-gm'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.less'</span>

<span class="hljs-comment">// ma index.less 覆盖主题色变量即完成换主题</span>
@brand-primary: #<span class="hljs-number">2</span>c9feb;

<span class="hljs-comment">// react-gm index.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.less'</span>

<span class="hljs-comment">// react-gm index.less</span>
@<span class="hljs-keyword">import</span> <span class="hljs-string">"less/bootstrap.less"</span>;</code></pre>
<h2 id="articleHeader12">浮层管理</h2>
<p>这个话题也可以说 浮层的管理。开发者越少关心 z-index 越好，组件提供了封装。 当然就需要框架考虑的东西更多了。</p>
<p>层级大致是</p>
<ul>
<li>正常的文档流 1</li>
<li>modal 1000</li>
<li>tip 9999</li>
</ul>
<p>另外 modal 衍生出来的 Dialog 形态即对话框，要求只有一个。不能出现弹窗中有弹窗。 技术上可以做到弹窗有弹窗，但克制，不提供相应的能力。</p>
<h2 id="articleHeader13">position fixed</h2>
<p>移动端是禁用 <code>position:fixed</code> 的，不过多介绍 <a href="http://efe.baidu.com/blog/mobile-fixed-layout/" rel="nofollow noreferrer" target="_blank">http://efe.baidu.com/blog/mob...</a></p>
<h2 id="articleHeader14">vm vh rem px</h2>
<p>我个人是比较倾向于用 px 的。因为很简单，切和 pc web 的开发习惯一致，也是大家开发网页的默认单位。无须什么转换成本，上手就来。</p>
<p>当然如果是设计驱动的公司，要求高保真还原设计稿，就不太一样了，会考虑用 rem 方案。 基于兼容性考虑，我们可以直接用 vm vh。<a href="http://www.w3cplus.com/css/vw-for-layout.html" rel="nofollow noreferrer" target="_blank">http://www.w3cplus.com/css/vw...</a></p>
<p>btw，个人还觉得 rem 在执行上很麻烦，也有对 rem 不了不深的原因。</p>
<h2 id="articleHeader15">毛玻璃</h2>
<p>场景是对话框弹起来的时候背景出现毛玻璃效果。 </p>
<p>这里的关键是 背景的 dom 和 对话框 不能是 包含关系，然后对背景 dom 做 <code>filter:blue(2px)</code>。 只要管理好 对话框的 dom 即可。</p>
<p>另外关键是，背景 dom 什么时机设置 filter，什么时候取消 filter。 于是引入了事件。 对话框 弹起 关闭都发出事件通知到 背景 dom 即可。</p>
<h2 id="articleHeader16">框架层架构</h2>
<p>框架层采用了 flex 布局，给了指定区域做业务，业务只需也只能关心该区域，不能干扰其他区域，如需，需要讨论商量好。</p>
<p>业务区域做内滚动，这 part 其实不太好，后面想重构掉。 不好的地方有，1 滚动只要指定 dom 非 document.body。 2 跟随 dom 的弹窗不好做，需要计算位置。</p>
<h2 id="articleHeader17">css3</h2>
<p>由于浏览器的环境很良好，所以可以尝试很多 css3 的特性，也不一定是 css3，大致意思是可以用上很多高级的功能。 比如 calc、filter 等。</p>
<h2 id="articleHeader18">图标</h2>
<p>坚决不采用 img 来做图标。 采用 iconfont ，我们的字体托管在 iconfont.cn 平台。 iconfont 只能做单色，多色等不复杂的图片。如果满足不了则考虑 css3 或者 svg 方向。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从观麦前端框架的角度看css

## 原文链接
[https://segmentfault.com/a/1190000011421900](https://segmentfault.com/a/1190000011421900)

