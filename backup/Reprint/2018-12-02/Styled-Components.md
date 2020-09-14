---
title: 'Styled-Components' 
date: 2018-12-02 2:30:15
hidden: true
slug: ylxx0buijs
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Styled-Components</h1>
<blockquote>它是通过JavaScript改变CSS编写方式的解决方案之一，从根本上解决常规CSS编写的一些弊端。<br>通过JavaScript来为CSS赋能，我们能达到常规CSS所不好处理的逻辑复杂、函数方法、复用、避免干扰。<br>尽管像SASS、LESS这种预处理语言添加了很多用用的特性，但是他们依旧没有对改变CSS的混乱有太大的帮助。因此组织工作交给了像 BEM这样的方法，虽然比较有用，但是它完全是自选方案，不能被强制应用在语言或者工具层面。<br>他搭配React可能将模块化走向一个更高的高度，样式书写将直接依附在JSX上面，HTML、CSS、JS三者再次内聚。</blockquote>
<h3 id="articleHeader1">基本</h3>
<h4>安装</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save styled-components" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span> styled-<span class="hljs-built_in">components</span></code></pre>
<p>除了npm安装使用模块化加载包之外，也支持<code>UMD</code>格式直接加载脚本文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/styled-components/dist/styled-components.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/styled-components/dist/styled-components.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>入门</h4>
<p><code>styled-components</code>使用标签模板来对组件进行样式化。</p>
<p>它移除了组件和样式之间的映射。这意味着，当你定义你的样式时，你实际上创造了一个正常的React组件，你的样式也附在它上面。</p>
<p>这个例子创建了两个简单的组件，一个容器和一个标题，并附加了一些样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use Title and Wrapper like any other React component – except they're styled!
render(
  <Wrapper>
    <Title>
      Hello World, this is my first styled component!
    </Title>
  </Wrapper>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Create a Title component that'll render an &lt;h1&gt; tag with some styles</span>
<span class="hljs-keyword">const</span> Title = styled.h1<span class="hljs-string">`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`</span>;

<span class="hljs-comment">// Create a Wrapper component that'll render a &lt;section&gt; tag with some styles</span>
<span class="hljs-keyword">const</span> Wrapper = styled.section<span class="hljs-string">`
  padding: 4em;
  background: papayawhip;
`</span>;

<span class="hljs-comment">// Use Title and Wrapper like any other React component – except they're styled!</span>
render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapper</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Title</span>&gt;</span>
      Hello World, this is my first styled component!
    <span class="hljs-tag">&lt;/<span class="hljs-name">Title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Wrapper</span>&gt;</span></span>
);</code></pre>
<blockquote>注意<br>CSS规则会自动添加浏览器厂商前缀，我们不必考虑它。</blockquote>
<h4>透传props</h4>
<p><code>styled-components</code>会透传所有的props属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Create an Input component that'll render an <input> tag with some styles
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

// Render a styled text input with a placeholder of &quot;@mxstbr&quot;, and one with a value of &quot;@geelen&quot;
render(
  <div>
    <Input placeholder=&quot;@mxstbr&quot; type=&quot;text&quot; />
    <Input value=&quot;@geelen&quot; type=&quot;text&quot; />
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// Create an Input component that'll render an &lt;input&gt; tag with some styles</span>
<span class="hljs-keyword">const</span> <span class="hljs-keyword">Input</span> = styled.<span class="hljs-keyword">input</span>`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

<span class="hljs-comment">// Render a styled text input with a placeholder of "@mxstbr", and one with a value of "@geelen"</span>
render(
  &lt;div&gt;
    &lt;<span class="hljs-keyword">Input</span> placeholder=<span class="hljs-string">"@mxstbr"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> /&gt;
    &lt;<span class="hljs-keyword">Input</span> value=<span class="hljs-string">"@geelen"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> /&gt;
  &lt;/div&gt;
);</code></pre>
<h4>基于props做样式判断</h4>
<p>模板标签的函数插值能拿到样式组件的props，可以据此调整我们的样式规则。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Button = styled.button<span class="hljs-string">`
  /* Adapt the colours based on primary prop */
  background: <span class="hljs-subst">${props =&gt; props.primary ? <span class="hljs-string">'palevioletred'</span> : <span class="hljs-string">'white'</span>}</span>;
  color: <span class="hljs-subst">${props =&gt; props.primary ? <span class="hljs-string">'white'</span> : <span class="hljs-string">'palevioletred'</span>}</span>;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`</span>;

render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Normal<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">primary</span>&gt;</span>Primary<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);</code></pre>
<h4>样式化任意组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// This could be react-router's Link for example
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
)

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// This could be react-router's Link for example</span>
<span class="hljs-keyword">const</span> Link = <span class="hljs-function">(<span class="hljs-params">{ className, children }</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>
    {children}
  <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
)

<span class="hljs-keyword">const</span> StyledLink = styled(Link)<span class="hljs-string">`
  color: palevioletred;
  font-weight: bold;
`</span>;

render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span>&gt;</span>Unstyled, boring Link<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">StyledLink</span>&gt;</span>Styled, exciting Link<span class="hljs-tag">&lt;/<span class="hljs-name">StyledLink</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);</code></pre>
<h4>扩展样式</h4>
<p>我们有时候需要在我们的样式组件上做一点扩展，添加一些额外的样式：<br>需要注意的是<code>.extend</code>在对样式组件有效，如果是其他的React组件，需要用<code>styled</code>样式化一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The Button from the last section without the interpolations
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// We're extending Button with some extra styles
const TomatoButton = Button.extend`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// The Button from the last section without the interpolations</span>
const Button = styled.button`
<span class="hljs-symbol">  color:</span> palevioletred;
  font-size: <span class="hljs-number">1</span>em;
<span class="hljs-symbol">  margin:</span> <span class="hljs-number">1</span>em;
<span class="hljs-symbol">  padding:</span> <span class="hljs-number">0.25</span>em <span class="hljs-number">1</span>em;
<span class="hljs-symbol">  border:</span> <span class="hljs-number">2</span>px solid palevioletred;
  border-radius: <span class="hljs-number">3</span>px;
`;

<span class="hljs-comment">// We're extending Button with some extra styles</span>
const TomatoButton = Button.extend`
<span class="hljs-symbol">  color:</span> tomato;
  border-color: tomato;
`;

render(
  <span class="hljs-params">&lt;div&gt;</span>
    <span class="hljs-params">&lt;Button&gt;</span>Normal Button<span class="hljs-params">&lt;/Button&gt;</span>
    <span class="hljs-params">&lt;TomatoButton&gt;</span>Tomato Button<span class="hljs-params">&lt;/TomatoButton&gt;</span>
  <span class="hljs-params">&lt;/div&gt;</span>
);</code></pre>
<p>在极少特殊情况下，我们可能需要更改样式组件的标签类型。我们有一个特别的API，<code>withComponent</code>可以扩展样式和替换标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// We're replacing the <button> tag with an <a> tag, but reuse all the same styles
const Link = Button.withComponent('a')

// Use .withComponent together with .extend to both change the tag and use additional styles
const TomatoLink = Link.extend`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <Link>Normal Link</Link>
    <TomatoLink>Tomato Link</TomatoLink>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>const Button = styled.button`
<span class="hljs-symbol">  display:</span> inline-block;
<span class="hljs-symbol">  color:</span> palevioletred;
  font-size: <span class="hljs-number">1</span>em;
<span class="hljs-symbol">  margin:</span> <span class="hljs-number">1</span>em;
<span class="hljs-symbol">  padding:</span> <span class="hljs-number">0.25</span>em <span class="hljs-number">1</span>em;
<span class="hljs-symbol">  border:</span> <span class="hljs-number">2</span>px solid palevioletred;
  border-radius: <span class="hljs-number">3</span>px;
`;

<span class="hljs-comment">// We're replacing the &lt;button&gt; tag with an &lt;a&gt; tag, but reuse all the same styles</span>
const Link = Button.withComponent(<span class="hljs-string">'a'</span>)

<span class="hljs-comment">// Use .withComponent together with .extend to both change the tag and use additional styles</span>
const TomatoLink = Link.extend`
<span class="hljs-symbol">  color:</span> tomato;
  border-color: tomato;
`;

render(
  <span class="hljs-params">&lt;div&gt;</span>
    <span class="hljs-params">&lt;Button&gt;</span>Normal Button<span class="hljs-params">&lt;/Button&gt;</span>
    <span class="hljs-params">&lt;Link&gt;</span>Normal Link<span class="hljs-params">&lt;/Link&gt;</span>
    <span class="hljs-params">&lt;TomatoLink&gt;</span>Tomato Link<span class="hljs-params">&lt;/TomatoLink&gt;</span>
  <span class="hljs-params">&lt;/div&gt;</span>
);</code></pre>
<h4>添加attr</h4>
<p>我们可以使用<code>attrs</code>API来为样式组件添加一些attr属性，它们也可以通过标签模板插值函数拿到props传值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Input = styled.input.attrs({
  // we can define static props
  type: 'password',

  // or we can define dynamic ones
  margin: props => props.size || '1em',
  padding: props => props.size || '1em'
})`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

render(
  <div>
    <Input placeholder=&quot;A small text input&quot; size=&quot;1em&quot; />
    <br />
    <Input placeholder=&quot;A bigger text input&quot; size=&quot;2em&quot; />
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>const Input = styled.input.attrs({
  // we can <span class="hljs-built_in">define</span> static <span class="hljs-built_in">props</span>
  type: 'password',

  // <span class="hljs-keyword">or</span> we can <span class="hljs-built_in">define</span> dynamic ones
  margin: <span class="hljs-built_in">props</span> =&gt; <span class="hljs-built_in">props</span>.size || '1em',
  padding: <span class="hljs-built_in">props</span> =&gt; <span class="hljs-built_in">props</span>.size || '1em'
})`
  <span class="hljs-built_in">color</span>: palevioletred;
  <span class="hljs-built_in">font</span>-size: 1em;
  <span class="hljs-built_in">border</span>: 2px solid palevioletred;
  <span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>: 3px;

  <span class="hljs-comment">/* here we use the dynamically computed props */</span>
  margin: ${<span class="hljs-built_in">props</span> =&gt; <span class="hljs-built_in">props</span>.margin};
  padding: ${<span class="hljs-built_in">props</span> =&gt; <span class="hljs-built_in">props</span>.padding};
`;

render(
  &lt;div&gt;
    &lt;Input placeholder=<span class="hljs-string">"A small text input"</span> size=<span class="hljs-string">"1em"</span> /&gt;
    &lt;br /&gt;
    &lt;Input placeholder=<span class="hljs-string">"A bigger text input"</span> size=<span class="hljs-string">"2em"</span> /&gt;
  &lt;/div&gt;
);</code></pre>
<h4>动画</h4>
<p>带有@keyframes的CSS animations，一般来说会产生复用。<code>styled-components</code>暴露了一个<code>keyframes</code>的API，我们使用它产生一个可以复用的变量。这样，我们在书写css样式的时候使用JavaScript的功能，为CSS附能，并且避免了名称冲突。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// keyframes returns a unique name based on a hash of the contents of the keyframes
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

render(
  <Rotate>&amp;lt; 💅 &amp;gt;</Rotate>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// keyframes returns a unique name based on a hash of the contents of the keyframes</span>
const rotate360 = keyframes`
  <span class="hljs-class">from </span>{
<span class="hljs-symbol">    transform:</span> rotate(<span class="hljs-number">0</span>deg);
  }

  <span class="hljs-class">to </span>{
<span class="hljs-symbol">    transform:</span> rotate(<span class="hljs-number">360</span>deg);
  }
`;

<span class="hljs-comment">// Here we create a component that will rotate everything we pass in over two seconds</span>
const Rotate = styled.div`
<span class="hljs-symbol">  display:</span> inline-block;
<span class="hljs-symbol">  animation:</span> ${rotate360} <span class="hljs-number">2</span>s linear infinite;
<span class="hljs-symbol">  padding:</span> <span class="hljs-number">2</span>rem <span class="hljs-number">1</span>rem;
  font-size: <span class="hljs-number">1.2</span>rem;
`;

render(
  <span class="hljs-params">&lt;Rotate&gt;</span><span class="hljs-variable">&amp;lt</span>; 💅 <span class="hljs-variable">&amp;gt</span>;<span class="hljs-params">&lt;/Rotate&gt;</span>
);</code></pre>
<h4>支持 React Native</h4>
<h3 id="articleHeader2">高级特性</h3>
<h4>Theming</h4>
<p><code>styled-components</code>暴露了一个<code>&lt;ThemeProvider&gt;</code>容器组件，提供了设置默认主题样式的功能，他类似于<code>react-rudux</code>的顶层组件<code>Provider</code>，通过<code>context</code>实现了从顶层到底层所有样式组件的默认主题共用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

Button.defaultProps = {
  theme: {
    main: 'palevioletred'
  }
}
// Define what props.theme will look like
const theme = {
  main: 'mediumseagreen'
};

render(
  <div>
    <Button>Normal</Button>
    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
    </ThemeProvider>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Button = styled.button<span class="hljs-string">`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  
  /* Color the border and text with theme.main */
  color: <span class="hljs-subst">${props =&gt; props.theme.main}</span>;
  border: 2px solid <span class="hljs-subst">${props =&gt; props.theme.main}</span>;
`</span>;

Button.defaultProps = {
  <span class="hljs-attr">theme</span>: {
    <span class="hljs-attr">main</span>: <span class="hljs-string">'palevioletred'</span>
  }
}
<span class="hljs-comment">// Define what props.theme will look like</span>
<span class="hljs-keyword">const</span> theme = {
  <span class="hljs-attr">main</span>: <span class="hljs-string">'mediumseagreen'</span>
};

render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Normal<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Themed<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);</code></pre>
<h4>Refs</h4>
<p>通常我们在给一个非原生样式组件添加<code>ref</code>属性的时候，其指向都是该组件实例的索引，我们通过用<code>innerRef</code>可以直接拿到里面的<code>DOM</code>节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AutoFocusInput = styled.input`
  background: papayawhip;
  border: none;
`;

class Form extends React.Component {
  render() {
    return (
      <AutoFocusInput
        placeholder=&quot;Hover here...&quot;
        innerRef={x => { this.input = x "}}"
        onMouseEnter={() => this.input.focus()}
      />
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>const <span class="hljs-type">AutoFocusInput</span> = styled.input`
  background: papayawhip;
  border: none;
`;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Form</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">AutoFocusInput</span>
        placeholder=<span class="hljs-string">"Hover here..."</span>
        innerRef={x =&gt; { <span class="hljs-keyword">this</span>.input = x "}}"
        onMouseEnter={() =&gt; <span class="hljs-keyword">this</span>.input.focus()}
      /&gt;
    );
  }
}</code></pre>
<h4>Security</h4>
<p>因为<code>styled-components</code>允许我们使用任意输入作为<code>CSS</code>属性值，一旦意识到这一点，我们马上明白要对输入做安全性校验了，因为使用用户外部的输入样式可以导致用户的浏览器被CSS注入攻击。CSS注入攻击可能不明显，但是我们还是得小心一点，某些IE浏览器版本甚至允许在URL声明中执行任意的JS。</p>
<p>这个例子告诉我们外部的输入甚至可能在CSS内调用一个API网络请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Oh no! The user has given us a bad URL!
const userInput = '/api/withdraw-funds';

const ArbitraryComponent = styled.div`
  background: url(${userInput});
  /* More styles here... */
`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// Oh no! The user has given us a bad URL!</span>
<span class="hljs-keyword">const</span> userInput = <span class="hljs-string">'/api/withdraw-funds'</span>;

<span class="hljs-keyword">const</span> ArbitraryComponent = styled.div`
  <span class="hljs-built_in">background</span>: url(${userInput});
  <span class="hljs-comment">/* More styles here... */</span>
`;</code></pre>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape" rel="nofollow noreferrer" target="_blank"><code>CSS.escape</code></a>这个未来API标准可净化JS中的CSS的问题。但是浏览器兼容性目前还不是太好，所以我们建议在项目中使用<a href="https://github.com/mathiasbynens/CSS.escape" rel="nofollow noreferrer" target="_blank"><code>polyfill by Mathias Bynens</code></a>。</p>
<h4>CSS共存</h4>
<p>如果我们打算把<code>styled-components</code>和现有的<code>css</code>共存的话，我们需要注意两个实现的细节问题：</p>
<p><code>styled-components</code>也会生成真实的样式表，并通过<code>className</code>属性链接生成的样式表内容。在JS运行时，他会生成一份真实的style节点插入到document的head内。</p>
<p>注意的一个小地方：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// MyComponent.js
const MyComponent = styled.div`background-color: green;`;

// my-component.css
.red-bg {
  background-color: red;
}

// For some reason this component still has a green background,
// even though you're trying to override it with the &quot;red-bg&quot; class!
<MyComponent className=&quot;red-bg&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// MyComponent.js</span>
<span class="hljs-keyword">const</span> MyComponent = styled.div`<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: <span class="hljs-built_in">green</span>;`;

<span class="hljs-comment">// my-component.css</span>
.<span class="hljs-built_in">red</span>-bg {
  <span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>: <span class="hljs-built_in">red</span>;
}

<span class="hljs-comment">// For some reason this component still has a green background,</span>
<span class="hljs-comment">// even though you're trying to override it with the "red-bg" class!</span>
&lt;MyComponent className=<span class="hljs-string">"red-bg"</span> /&gt;</code></pre>
<p>我们<code>styled-components</code>生成的style样式表一般是在head头部的最底下，同等CSS优先级条件下是会覆盖默认前者css文件的样式的。这个插入顺序使用webpack来调整是比较难得。所以，我们一般都这样通过调整css优先级来改变显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* my-component.css */
.red-bg.red-bg {
  background-color: red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* my-component.css */</span>
<span class="hljs-selector-class">.red-bg</span><span class="hljs-selector-class">.red-bg</span> {
  <span class="hljs-attribute">background-color</span>: red;
}</code></pre>
<h4>Media Templates</h4>
<p>媒体查询是开发响应式web应用不可或缺的存在，这是一个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Content = styled.div`
  background: papayawhip;
  height: 3em;
  width: 3em;

  @media (max-width: 700px) {
    background: palevioletred;
  }
`;

render(
  <Content />
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> Content = styled.div`
  <span class="hljs-built_in">background</span>: papayawhip;
  <span class="hljs-built_in">height</span>: <span class="hljs-number">3</span>em;
  <span class="hljs-built_in">width</span>: <span class="hljs-number">3</span>em;

  @media (<span class="hljs-built_in">max</span>-<span class="hljs-built_in">width</span>: <span class="hljs-number">700</span>px) {
    <span class="hljs-built_in">background</span>: palevioletred;
  }
`;

render(
  &lt;Content /&gt;
);</code></pre>
<p>因为媒体查询语句很长，并且经常在整个应用程序中重复使用，所以为此创建一些模板来复用是很有必要的。</p>
<p>使用JS的功能特性，我们可以轻松定义一份可配置的语句，包装媒体查询和样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

const Content = styled.div`
  height: 3em;
  width: 3em;
  background: papayawhip;

  /* Now we have our methods on media and can use them instead of raw queries */
  ${media.desktop`background: dodgerblue;`}
  ${media.tablet`background: mediumseagreen;`}
  ${media.phone`background: palevioletred;`}
`;

render(
  <Content />
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> sizes = {
  desktop: <span class="hljs-number">992</span>,
  tablet: <span class="hljs-number">768</span>,
  phone: <span class="hljs-number">376</span>
}

<span class="hljs-comment">// Iterate through the sizes and create a media template</span>
<span class="hljs-keyword">const</span> media = <span class="hljs-built_in">Object</span>.keys(sizes).reduce(<span class="hljs-function">(<span class="hljs-params">acc, label</span>) =&gt;</span> {
  acc[label] = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> css<span class="hljs-string">`
    @media (max-width: <span class="hljs-subst">${sizes[label] / 16}</span>em) {
      <span class="hljs-subst">${css(...args)}</span>
    }
  `</span>

  <span class="hljs-keyword">return</span> acc
}, {})

<span class="hljs-keyword">const</span> Content = styled.div<span class="hljs-string">`
  height: 3em;
  width: 3em;
  background: papayawhip;

  /* Now we have our methods on media and can use them instead of raw queries */
  <span class="hljs-subst">${media.desktop`background: dodgerblue;`}</span>
  <span class="hljs-subst">${media.tablet`background: mediumseagreen;`}</span>
  <span class="hljs-subst">${media.phone`background: palevioletred;`}</span>
`</span>;

render(
  &lt;Content /&gt;
);</code></pre>
<p>这太cool了，不是吗？</p>
<h4>Tagged Template Literals</h4>
<p>标签模板是ES6的一个新特性，这是我们<code>styled-components</code>创建样式组件的方式和规则。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const aVar = 'good';

// These are equivalent:
fn`this is a ${aVar} day`;
fn([ 'this is a ', ' day' ], aVar);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> aVar = <span class="hljs-string">'good'</span>;

<span class="hljs-comment">// These are equivalent:</span>
fn`<span class="hljs-keyword">this</span> <span class="hljs-keyword">is</span> a ${aVar} day`;
fn([ <span class="hljs-string">'this is a '</span>, <span class="hljs-string">' day'</span> ], aVar);</code></pre>
<p>这看起来有点麻烦，但是这意味着我们可以在<code>styled-components</code>生成样式组件中接受变量、函数、minxins，并将其变为纯css。</p>
<p>这篇文章可以了解更多：<a href="https://mxstbr.blog/2016/11/styled-components-magic-explained/" rel="nofollow noreferrer" target="_blank">The magic behind 💅 styled-components</a></p>
<h4>Server Side Rendering</h4>
<p><code>styled-components</code>很好地支持SSR。</p>
<p>一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

const sheet = new ServerStyleSheet()
const html = renderToString(sheet.collectStyles(<YourApp />))
const styleTags = sheet.getStyleTags() // or sheet.getStyleElement()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { renderToString } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/server'</span>
<span class="hljs-keyword">import</span> { ServerStyleSheet } <span class="hljs-keyword">from</span> <span class="hljs-string">'styled-components'</span>

<span class="hljs-keyword">const</span> sheet = <span class="hljs-keyword">new</span> ServerStyleSheet()
<span class="hljs-keyword">const</span> html = renderToString(sheet.collectStyles(&lt;YourApp /&gt;))
<span class="hljs-keyword">const</span> styleTags = sheet.getStyleTags() <span class="hljs-comment">// or sheet.getStyleElement()</span></code></pre>
<p>也可以这样组件化包裹，只要在客户端不这么使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const sheet = new ServerStyleSheet()
const html = renderToString(
  <StyleSheetManager sheet={sheet.instance}>
    <YourApp />
  </StyleSheetManager>
)

const styleTags = sheet.getStyleTags() // or sheet.getStyleElement()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { renderToString } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/server'</span>
<span class="hljs-keyword">import</span> { ServerStyleSheet, StyleSheetManager } <span class="hljs-keyword">from</span> <span class="hljs-string">'styled-components'</span>

<span class="hljs-keyword">const</span> sheet = <span class="hljs-keyword">new</span> ServerStyleSheet()
<span class="hljs-keyword">const</span> html = renderToString(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">StyleSheetManager</span> <span class="hljs-attr">sheet</span>=<span class="hljs-string">{sheet.instance}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">YourApp</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">StyleSheetManager</span>&gt;</span></span>
)

<span class="hljs-keyword">const</span> styleTags = sheet.getStyleTags() <span class="hljs-comment">// or sheet.getStyleElement()</span></code></pre>
<p><code>sheet.getStyleTags()</code>返回一个style标签数组。具体<code>styled-components</code>关于SSR更深入的操作，不在这里继续讨论了，还可以告知他兼容<code>Next.js</code>关于<code>SSR</code>的解决方案。</p>
<h4>Referring to other components</h4>
<p><code>styled-components</code>提供了<code>component selector</code>组件选择器模式来代替我们以往对class名的依赖，解决得很干净。这下我们不必为命名和选择器冲突而苦恼了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: papayawhip;
  color: palevioletred;
`;

const Icon = styled.svg`
  transition: fill 0.25s;
  width: 48px;
  height: 48px;

  ${Link}:hover &amp; {
    fill: rebeccapurple;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.2;

  &amp;::before {
    content: '◀';
    margin: 0 10px;
  }
`;

render(
  <Link href=&quot;#&quot;>
    <Icon viewBox=&quot;0 0 20 20&quot;>
      <path d=&quot;M10 15h8c1 0 2-1 2-2V3c0-1-1-2-2-2H2C1 1 0 2 0 3v10c0 1 1 2 2 2h4v4l4-4zM5 7h2v2H5V7zm4 0h2v2H9V7zm4 0h2v2h-2V7z&quot;/>
    </Icon>
    <Label>Hovering my parent changes my style!</Label>
  </Link>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>const Link = styled.a`
<span class="hljs-symbol">  display:</span> flex;
  align-items: center;
<span class="hljs-symbol">  padding:</span> <span class="hljs-number">5</span>px <span class="hljs-number">10</span>px;
<span class="hljs-symbol">  background:</span> papayawhip;
<span class="hljs-symbol">  color:</span> palevioletred;
`;

const Icon = styled.svg`
<span class="hljs-symbol">  transition:</span> fill <span class="hljs-number">0.25</span>s;
<span class="hljs-symbol">  width:</span> <span class="hljs-number">48</span>px;
<span class="hljs-symbol">  height:</span> <span class="hljs-number">48</span>px;

  ${Link}:hover &amp; {
<span class="hljs-symbol">    fill:</span> rebeccapurple;
  }
`;

const Label = styled.span`
<span class="hljs-symbol">  display:</span> flex;
  align-items: center;
  line-height: <span class="hljs-number">1.2</span>;

  &amp;::<span class="hljs-class">before </span>{
<span class="hljs-symbol">    content:</span> <span class="hljs-string">'◀'</span>;
<span class="hljs-symbol">    margin:</span> <span class="hljs-number">0</span> <span class="hljs-number">10</span>px;
  }
`;

render(
  <span class="hljs-params">&lt;Link href="#"&gt;</span>
    <span class="hljs-params">&lt;Icon viewBox="<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20</span> <span class="hljs-number">20</span>"&gt;</span>
      <span class="hljs-params">&lt;path d="M10 <span class="hljs-number">15</span>h8c1 <span class="hljs-number">0</span> <span class="hljs-number">2</span><span class="hljs-number">-1</span> <span class="hljs-number">2</span><span class="hljs-number">-2</span>V3c0<span class="hljs-number">-1</span><span class="hljs-number">-1</span><span class="hljs-number">-2</span><span class="hljs-number">-2</span><span class="hljs-number">-2</span>H2C1 <span class="hljs-number">1</span> <span class="hljs-number">0</span> <span class="hljs-number">2</span> <span class="hljs-number">0</span> <span class="hljs-number">3</span>v10c0 <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">2</span> <span class="hljs-number">2</span>h4v4l4<span class="hljs-number">-4</span>zM5 <span class="hljs-number">7</span>h2v2H5V7zm4 <span class="hljs-number">0</span>h2v2H9V7zm4 <span class="hljs-number">0</span>h2v2h<span class="hljs-number">-2</span>V7z"/&gt;</span>
    <span class="hljs-params">&lt;/Icon&gt;</span>
    <span class="hljs-params">&lt;Label&gt;</span>Hovering my parent changes my style!<span class="hljs-params">&lt;/Label&gt;</span>
  <span class="hljs-params">&lt;/Link&gt;</span>
);</code></pre>
<p>注意：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A extends React.Component {
  render() {
    return <div />;
  }
}

const B = styled.div`
  ${A} {
  }
`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div /&gt;;
  }
}

const <span class="hljs-type">B</span> = styled.div`
  ${<span class="hljs-type">A</span>} {
  }
`;</code></pre>
<p>这个例子是不可以的，因为A继承ReactComponent，不是被styled构造过的。我们的组件选择器只支持在<code>Styled Components</code>创建的样式组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A extends React.Component {
  render() {
    return <div className={this.props.className} />;
  }
}

const StyledA = styled(A)``;

const B = styled.div`
  ${StyledA} {
  }
`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div className={<span class="hljs-keyword">this</span>.props.className} /&gt;;
  }
}

const <span class="hljs-type">StyledA</span> = styled(<span class="hljs-type">A</span>)``;

const <span class="hljs-type">B</span> = styled.div`
  ${<span class="hljs-type">StyledA</span>} {
  }
`;</code></pre>
<h3 id="articleHeader3">API文档</h3>
<h4>基本</h4>
<ul>
<li>styled</li>
<li>.attrs</li>
<li>``字符模板</li>
<li>ThemeProvider</li>
</ul>
<h4>助手</h4>
<ul>
<li>css</li>
<li>keyframes</li>
<li>injectGlobal</li>
<li>isStyledComponent</li>
<li>withTheme</li>
</ul>
<h4>支持CSS</h4>
<p>在样式组件中，我们支持所有CSS加嵌套。因为我们生成一个真实的stylesheet而不是内联样式，所以CSS中的任何工作都在样式组件中工作！</p>
<p>（&amp;）被我们所生成的、唯一的类名替换给样式组件，使其具有复杂的逻辑变得容易。</p>
<h4>支持flow和typescript</h4>
<h3 id="articleHeader4">更多工具</h3>
<h4>Babel Plugin</h4>
<h4>Test Utilities</h4>
<p><a href="https://github.com/styled-components/jest-styled-components" rel="nofollow noreferrer" target="_blank">Jest Styled Components</a>，基于jest，可对<code>styled-components</code>做单元测试</p>
<p><a href="https://github.com/styled-components/styled-components-website/tree/master/test" rel="nofollow noreferrer" target="_blank">demo</a></p>
<h4>Stylelint</h4>
<p>使用stylelint 检查我们的<code>styled-components</code>样式书写规范。</p>
<h4>Styled Theming 语法高亮显示</h4>
<p>在模板文本中写入CSS时丢失的一个东西是语法高亮显示。我们正在努力在所有编辑器中实现正确的语法高亮显示。支持大部分编辑器包括Visual Studio Code、WebStorm。</p>
<h3 id="articleHeader5">总结</h3>
<p>下面简单总结一下 styled-components 在开发中的表现：</p>
<ul>
<li>提出了 container 和 components 的概念，移除了组件和样式之间的映射关系，符合关注度分离的模式；</li>
<li>可以在样式定义中直接引用到 js 变量，共享变量，非常便利，利用js的特性为css附能，帅毙了！</li>
<li>支持组件之间继承，方便代码复用，提升可维护性；</li>
<li>兼容现有的 className 方式，升级无痛；</li>
<li>这下写CSS也乐趣十足了。</li>
<li>styled-components的最基本思想就是通过移除样式和组件之间的映射来执行最佳实践</li>
<li>一个让styled-components很容易被接受的特性：当他被怀疑的时候，你同样可以使用你熟悉的方法去使用它！</li>
</ul>
<p>当然，styled-components 还有一些优秀的特性，比如服务端渲染和 React Native 的支持。</p>
<hr>
<hr>
<h3 id="articleHeader6">题外：styled-components的魔法</h3>
<p>如果你从来没看见过<code>styled-components</code>，下面是一个简单的样式组件的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button = styled.button`
  background-color: papayawhip;
  border-radius: 3px;
  color: palevioletred;
`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>const <span class="hljs-keyword">Button </span>= styled.<span class="hljs-keyword">button`
</span>  <span class="hljs-keyword">background-color: </span>papayawhip<span class="hljs-comment">;</span>
  <span class="hljs-keyword">border-radius: </span><span class="hljs-number">3</span>px<span class="hljs-comment">;</span>
<span class="hljs-symbol">  color:</span> palevioletred<span class="hljs-comment">;</span>
`</code></pre>
<p>现在可以像使用普通React组件一样渲染使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Button>Hi Dad!</Button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>Hi Dad!<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></code></pre>
<p>那么，这是怎么工作的呢？这个过程中到底发生了什么魔法？</p>
<h4>标签模板</h4>
<p>实际上，<code> style.button</code>` `是JavaScript的新语法特性，属于ES6的标签模板功能。</p>
<p>本质上，<code> styled.button</code>` <code>和</code>styled.button()`是一样的。他们的差异只在传递参数时就变得可见了。</p>
<p>styled-components利用模板字符串的用处在于可以给内部props赋值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Button = styled.button`
  font-size: ${props => props.primary ? '2em' : '1em'};
`
// font-size: 2em;
<Button primary />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code>const <span class="hljs-keyword">Button</span> = styled.button`
  <span class="hljs-keyword">font</span>-size: ${props =&gt; props.primary ? <span class="hljs-string">'2em'</span> : <span class="hljs-string">'1em'</span>}<span class="hljs-comment">;</span>
`
<span class="hljs-comment">// font-size: 2em;</span>
&lt;<span class="hljs-keyword">Button</span> primary /&gt;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Styled-Components

## 原文链接
[https://segmentfault.com/a/1190000014682665](https://segmentfault.com/a/1190000014682665)

