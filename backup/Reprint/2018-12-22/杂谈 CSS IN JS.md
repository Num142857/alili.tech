---
title: '杂谈 CSS IN JS' 
date: 2018-12-22 2:30:10
hidden: true
slug: cyi6oc58okq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>关注点分离（separation of concerns）原则多年来大行其道，实践中一般将 <code>HTML</code>、<code>CSS</code>、<code>JavaScript</code> 分开编写维护，早期框架 <code>angularjs</code> 即是如此，直到 <code>React</code> 争议中问世，引领关注点混合趋势，驱使开发者重新审视 <code>CSS</code> 工程化发展。</p>
<h2 id="articleHeader1">尴尬的CSS</h2>
<p>相对于 <code>JavaScript</code> 的突飞猛进，<code>CSS</code> 的发展缓慢，相对止步不前。随着前端职能扩大化成为常态，前端工程化日趋成熟，<code>CSS</code> 先天缺陷愈发明显：</p>
<ul>
<li>全局作用域</li>
<li>缺乏高级编程特性</li>
<li>代码冗余</li>
<li>极限压缩</li>
<li>依赖管理</li>
</ul>
<p><strong>最大的缺陷</strong> 来自于全局作用域，<code>class name</code> 全局生效，多人协作中的风格不一致，随时可能引发蝴蝶效应。为规避多人协作的风格冲突，社区提出 <code>OOCSS</code>，<code>BEM</code> 等方法论，但实践中完全取决于团队执行力度，笔者也曾苦恼于合理的命名，为避免冲突，导致类名冗长，无聊且痛苦。</p>
<p><strong>缺乏高级编程特性</strong> 影响同样深远，社区发展的预处理器能够有效缓解，<code>sass</code>，<code>less</code>，<code>stylus</code>殊途同归，<code>postcss</code> 异军突起，基本实现变量、嵌套、变量、混合、扩展和逻辑等。随着 <code>CSS</code> 规范逐步推进，高级编程特性完全可期。笔者大胆断言，前端工程化的推进，已经基本解决  <strong>CSS高级编程特性缺乏</strong> 的问题。</p>
<p>代码冗余，极限压缩对开发的影响相对很小，经典的 <code>bootstrap</code> 就包含大量的冗余代码，但丝毫不影响其流行程度。</p>
<p>目前难以解决的是依赖管理，<code>NPM</code> 已经成为事实上的 <code>JavaScript</code> 包管理工具，而 <code>CSS</code> 始终没有发展出可用的管理模式，<code>sass</code> 的浅尝辄止，例如 <code>bootstrap-sass</code>, <code>Bourbon</code>等，显然无法满足需求。随着 <code>React</code> 引领的关注点混合，以组件为核心的开发模式，有效规避了 <code>CSS</code> 缺乏依赖管理的缺陷，笔者认为，依赖管理弊端完全可控，未来的发展，留给未来述说。</p>
<h2 id="articleHeader2">新锐的组件化</h2>
<p>前端发展日新月异，<code>React</code> 在众人争议中进入视野，典型的 <code>React</code> 组件同时包含结构、样式、行为，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description - lite component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */
export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: Date.now()
    };
  }
  
  render() {
    return (
      <Card title=&quot;React Timestamp&quot;>
        <Alert message={`React Timestamp: ${this.state.timestamp}`} type=&quot;success&quot;/>
        <Alert message={`React Timestamp: ${this.state.timestamp}`} type=&quot;info&quot;/>
        <Alert message={`React Timestamp: ${this.state.timestamp}`} type=&quot;warning&quot;/>
      </Card>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * @description - lite component
 * @author - huang.jian &lt;hjj491229492@hotmail.com&gt;
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">Date</span>.now()
    };
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;Card title="React Timestamp"&gt;
        &lt;Alert message={`React Timestamp: ${this.state.timestamp}`} type="success"/&gt;
        &lt;Alert message={`React Timestamp: ${this.state.timestamp}`} type="info"/&gt;
        &lt;Alert message={`React Timestamp: ${this.state.timestamp}`} type="warning"/&gt;
      &lt;/Card&gt;
    );
  }
}</code></pre>
<p>前端应用由组件聚合而成，组件层面对 <code>CSS</code> 进行抽象，从而解决大型应用的 <code>CSS</code> 维护难题。社区出现的 <code>CSS IN JS</code> 解决方案，目前看来就是可行解决方案，其本质在于通过 <code>JavaScript</code> 来声明，维护样式，以 <code>styled-components</code> 举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em; 
  color: palevioletred;
  border: 2px solid palevioletred; 
`;

function Buttons() {
  return (
    <Button>Normal Button</Button>
    <Button primary>Primary Button</Button>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Button = styled.button<span class="hljs-string">`
  border-radius: 3px;
  padding: 0.25em 1em; 
  color: palevioletred;
  border: 2px solid palevioletred; 
`</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Buttons</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Normal Button<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
    &lt;Button primary&gt;Primary Button&lt;<span class="hljs-regexp">/Button&gt;
  );
}</span></code></pre>
<p>样式寄生组件之中，组件挂载时，动态插入样式，实现按需加载，动态生成类名，隔离作用域。另外一种思路，通过 <code>style</code> 属性传入内嵌样式，完全规避选择器全局作用域的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 官方示例有删减
var Radium = require('radium');
var React = require('react');
var color = require('color');

// You can create your style objects dynamically or share them for
// every instance of the component.
var styles = {
  base: {
    color: '#fff',
  },

  primary: {
    background: '#0074D9'
  },

  warning: {
    background: '#FF4136'
  }
};

@Radium
class Button extends React.Component {
  render() {
    return (
      <button
        style={[
          styles.base,
          styles[this.props.kind]
        ]}>
        {this.props.children}
      </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 官方示例有删减</span>
<span class="hljs-keyword">var</span> Radium = <span class="hljs-built_in">require</span>(<span class="hljs-string">'radium'</span>);
<span class="hljs-keyword">var</span> React = <span class="hljs-built_in">require</span>(<span class="hljs-string">'react'</span>);
<span class="hljs-keyword">var</span> color = <span class="hljs-built_in">require</span>(<span class="hljs-string">'color'</span>);

<span class="hljs-comment">// You can create your style objects dynamically or share them for</span>
<span class="hljs-comment">// every instance of the component.</span>
<span class="hljs-keyword">var</span> styles = {
  <span class="hljs-attr">base</span>: {
    <span class="hljs-attr">color</span>: <span class="hljs-string">'#fff'</span>,
  },

  <span class="hljs-attr">primary</span>: {
    <span class="hljs-attr">background</span>: <span class="hljs-string">'#0074D9'</span>
  },

  <span class="hljs-attr">warning</span>: {
    <span class="hljs-attr">background</span>: <span class="hljs-string">'#FF4136'</span>
  }
};

@Radium
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{[</span>
          <span class="hljs-attr">styles.base</span>,
          <span class="hljs-attr">styles</span>[<span class="hljs-attr">this.props.kind</span>]
        ]}&gt;</span>
        {this.props.children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>面向组件开发，为样式管理提供更多的可能性，完全使用 <code>JavaScript</code> 抽象，管理，维护样式，略显激进，但也不失为一种解决方案。</p>
<h2 id="articleHeader3">客观的分析</h2>
<p>目前主流的 <code>CSS IN JS</code> 方案与传统的方式对比如下：</p>
<p>优势：</p>
<ul>
<li>隔离作用域 -- 样式生效通过内嵌，或者生成独一无二的类名，避免出现选择器冲突；</li>
<li>高级编程特性 -- 充分利用 JavaScript 的能力增强对样式的控制；</li>
<li>样式按需挂载 -- 页面需要的样式才会加载，有效避免样式冗余；</li>
<li>依赖管理 -- 寄生于组件，利用现存的 <code>NPM</code> 生态进行包管理；</li>
<li>动态样式 -- 能够更加简单，直接的修改样式</li>
</ul>
<p>劣势：</p>
<ul>
<li>无法复用现有生态，特性完全依赖于库的实现；</li>
<li>编辑器代码补全，语法检查，语法高亮等需要插件支持；</li>
<li>伪类选择器（<code>disabled、:before、:nth-child</code>）支持诡异；</li>
<li>样式属性骆驼式命名；</li>
</ul>
<h2 id="articleHeader4">独辟蹊径</h2>
<p>笔者并不完全认同 <code>CSS IN JS</code> 的理念，也不反对将其应用于生产项目。<code>CSS</code> 中最严重的问题，不通过 <code>CSS-in-JS</code> 也能<br>有其他解决方案，也就是笔者当前使用的 <code>CSS Module</code> 方案。通过工程化的方式，将选择器编译为独一无二的类名，使用 <code>JavaScript</code> 管理选择器与元素的关联，仅此而已。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Header.jsx
import style from './Header.css'

// { header: 'Header__header--3kSIq_0' }

export default function Header() {
  return (<div className={style.header}>Header!!!</div>);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Header.jsx</span>
<span class="hljs-keyword">import</span> style <span class="hljs-keyword">from</span> <span class="hljs-string">'./Header.css'</span>

<span class="hljs-comment">// { header: 'Header__header--3kSIq_0' }</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Header</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{style.header}</span>&gt;</span>Header!!!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
}</code></pre>
<p>优势：</p>
<ul>
<li>隔离作用域 -- 类名编译生成，有效避免选择器冲突；</li>
<li>样式按需加载 -- 利用 <code>tree-shaking</code> 机制，仅保留存在引用的选择器，有效避免样式冗余；</li>
<li>依赖管理 -- 关联组件，利用现存的 <code>NPM</code> 机制进行包管理；</li>
<li>充分利用现有生态 -- 编辑器高亮，自动补全，<code>sass</code>，<code>postcss</code>高级编程特性；</li>
</ul>
<p>劣势：</p>
<ul><li>欠缺动态样式特性 -- 无法充分利用 JavaScript 的能力增强对样式的控制；</li></ul>
<h2 id="articleHeader5">主观的感悟</h2>
<p>本文未涉及的 <strong>单文件组件</strong> 也是可行方案之一，目前 <code>Vue</code>，<code>Angular</code> 等框架采用。笔者始终认为，与其创造更多抽象的技术让前端学习曲线更加陡峭，不如通过工程化的手段来修复存在的缺陷，理念上求同存异。面对各种技术方案，适合实际项目的方案才是最好的方案，选用预处理器 <code>PostCSS</code>，<code>BEM</code>，亦或动态编译，都需要结合业务场景、团队习惯等因素决策。</p>
<p><strong>关注公众号，获取动态，支持作者。</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000012470851?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000012470851?w=258&amp;h=258" alt="qrcode_for_gh_d8efb59259e2_258.jpg-26.1kB" title="qrcode_for_gh_d8efb59259e2_258.jpg-26.1kB" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
杂谈 CSS IN JS

## 原文链接
[https://segmentfault.com/a/1190000012454907](https://segmentfault.com/a/1190000012454907)

