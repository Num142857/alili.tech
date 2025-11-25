---
title: 'React的10种有效的设计模式' 
date: 2019-01-25 2:30:24
hidden: true
slug: z94br1a9g2o
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">设计React的10种模式</h1>
<blockquote><p>本文翻译自<a href="https://hackernoon.com/10-react-mini-patterns-c1da92f068c5#.7urw21e4e" rel="nofollow noreferrer" target="_blank">10 React mini-patterns</a>。这篇文章由<a href="https://mrcodex.com" rel="nofollow noreferrer" target="_blank">mrcode</a>翻译， 如果哪里翻译的不恰当或有错误的地方，欢迎指出。 同时也希望大家关注我的博客。 关注我的账号。</p></blockquote>
<p>在过去的几年里，我已经做了许多看起来挺不错的React项目。<br>在这个神奇的旅程中，一些模式出现过很多次，我发现我一次又一次地重复着这些模式。</p>
<p>什么是模式？</p>
<p>这些模式是我想在学习React第一天就知道的事情。<br>所以如果今天是你第一天学习React，你是如此的幸运。</p>
<p>或者你并不幸运。只有一种方法可以决定你是否是幸运的...</p>
<p>这是一个长长的列表，所以你可以跳过无聊的一些模式， 比如：3，6，8，10。</p>
<h2 id="articleHeader1">1. Sending data down and up</h2>
<p>我建议大家新学习React的一件事是传递信息的模式（信息可以是对象，字符串等）和传递方法下来允许子组件传递信息给父组件。</p>
<p>就像把一包芯片和一个对讲机送到地下被困的矿工一样。</p>
<p>图片怎么样？<br>下面的事情是这种模式的最简单的形式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008506706?w=703&amp;h=287" src="https://static.alili.tech/img/remote/1460000008506706?w=703&amp;h=287" alt="Worth a thousand words?" title="Worth a thousand words?" style="cursor: pointer; display: inline;"></span></p>
<p>父组件在左边，子组件在右边。<br>你可以认为连接这些组件的两个props允许信息在两者之间的任一方向上流动。</p>
<p>被称为<code>items</code>将被传递给子组件， <code>deleteItem</code>将提供给子组件一种方案来发送信息给父组件。</p>
<p>这不是一个真正的模式。剩下的肯定都是模式。我承诺。</p>
<h2 id="articleHeader2">2. Fixing HTML’s inputs</h2>
<p>React和web组件的一个伟大的事情是，如果在html中的东西不能按你想要的方式工作，你可以解决它。</p>
<p>如果你考虑允许用户输入的不同元素，你很快就会看到这些元素的命名是荒谬的，几乎是鲁莽的。</p>
<p>如果我建立一个将有很多用户输入的网站，我做的第一件事之一是解决这个问题。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008506707?w=430&amp;h=765" src="https://static.alili.tech/img/remote/1460000008506707?w=430&amp;h=765" alt="1" title="1" style="cursor: pointer;"></span></p>
<p>还有更多的改进：</p>
<ul>
<li><p>输入应该通过onChange方法返回一个值，而不是一个JavaScript事件实例，对不？</p></li>
<li><p>你可以进一步确保在onChange返回的数据类型和传递的数据类型相匹配。如果<code>typeof props.value</code>是number，然后将<code>e.target.value</code>回到一个数字，然后再次发出数据。</p></li>
<li><p>一组单选按钮在功能上与<code>&lt;select&gt;</code>一样<br>它是搞砸了，以一种完全不同的方式来对待它们，唯一的区别是UI。</p></li>
</ul>
<p>也许你的应用程序有一个单一的<code>&lt;PickOneFromMany /&gt;</code>组件，并传递<code>ui =“radio”</code>或<code>ui =“dropDown”</code>。</p>
<p>关键是不要像我这样做。<br>关键是要使它们成为你自己的 - 你不需要继续使用HTML的用户输入元素的坑爹性质。</p>
<h2 id="articleHeader3">3. Binding labels to inputs with unique IDs</h2>
<p>关于输入...如果你关心你的用户，你将通过id / for组合将<code>&lt;label&gt;</code>元素绑定到你的<code>&lt;input&gt;</code>。</p>
<p>但是你不想为你定义的每个输入想出一些聪明和独特的id，谁有时间呢？我不知道你，但我有山羊的视频观看。</p>
<p>（提示：如果您的航班上有一个尖叫的孩子，闭上眼睛，假装您在YouTube上观看的山羊听起来像人类的视频，烦人的声音就会变得很热闹。）</p>
<p>您可以为每个输入/标签对生成随机ID，但是客户端呈现的HTML将与您呈现的服务器呈现的HTML不匹配。这并不是一个好的解决方案<br>所以，你可以创建一个小的模块，给出一个递增的ID，并在输入组件中使用它，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Input extends React.Component {
  constructor(props) {
    super(props);
    this.id = getNextId();
    
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  
  render() {
    return (
      <label htmlFor={this.id}>
        {this.props.label}
        
        <input
          id={this.id}
          value={this.props.value} 
          onChange={this.onChange}
          />
      </label>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Input</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.id = getNextId();
    
    <span class="hljs-keyword">this</span>.onChange = <span class="hljs-keyword">this</span>.onChange.bind(<span class="hljs-keyword">this</span>);
  }
  
  onChange(e) {
    <span class="hljs-keyword">this</span>.props.onChange(e.target.value);
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">{this.id}</span>&gt;</span>
        {this.props.label}
        
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">{this.id}</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{this.props.value}</span> 
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChange}</span>
          /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    );
  }
}</span></code></pre>
<p>如果<code>getNextId()</code>每次只是增加一个数字，然后在服务器上渲染时，这个数字会继续上升和起来，最终达到无穷大。因此，您需要在每次呈现应用程序时重置该数字（对于每个网络请求）。</p>
<p>你可以在你的应用程序的入口点，使用一个简单的resetId（）或任何你认为最好的名称。</p>
<p>考虑到所有这些，你的超级幻想模块可能看起来像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let count = 1;

export const resetId = () => {
  count = 1;
}

export const getNextId = () => {
  return `element-id-${count++}`;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> count = <span class="hljs-number">1</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> resetId = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  count = <span class="hljs-number">1</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getNextId = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-string">`element-id-<span class="hljs-subst">${count++}</span>`</span>;
}</code></pre>
<h2 id="articleHeader4">4. Controlling CSS with props</h2>
<p>当你想在不同的实例（例如'primary'和'secondary'按钮）应用不同的CSS，你可以传递道具来控制要应用的CSS。</p>
<p>这看起来超级简单的表面，但让我向你保证有很多错误的方法来做到这一点（我已经尝试过他们！）。</p>
<p>有 - 我估计 - 三种不同的方式，你可以控制应用于组件的CSS。</p>
<h3 id="articleHeader5">使用标志</h3>
<p>也许你的一些按钮有圆角，但这不直接对应于您定义的主题。</p>
<p>在这种情况下，你可以坐下你的设计师，并有一致性谈话，或创建一个布尔的道具，可能看起来像这样：</p>
<p><code>&lt;Button theme =“secondary”rounded&gt; Hello &lt;/ Button&gt;</code></p>
<p>就像HTML的二进制属性一样，你不需要做<code>round = {true}</code>。</p>
<h3 id="articleHeader6">设置值</h3>
<p>在某些情况下，您可能希望直接传递CSS属性的值（在组件中将其设置为内联样式）。</p>
<p><code>&lt;Icon width =“25”height =“25”type =“search”/&gt;</code></p>
<h3 id="articleHeader7">一个例子</h3>
<p>假设您正在创建链接组件。你通过你的网站的设计和工作，有三个不同的主题，有时他们有一个下划线，有时他们不。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008506708?w=377&amp;h=185" src="https://static.alili.tech/img/remote/1460000008506708?w=377&amp;h=185" alt="" title="" style="cursor: pointer;"></span></p>
<p>下面是我将如何设计该组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Link = (props) => {
  let className = `link link--${props.theme}-theme`;
  
  if (!props.underline) className += ' link--no-underline';

  return <a href={props.href} className={className}>{props.children}</a>;
};

Link.propTypes = {
  theme: PropTypes.oneOf([
    'default', // primary color, no underline
    'blend', // inherit surrounding styles
    'primary-button', // primary color, solid block
  ]),
  underline: PropTypes.bool,
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

Link.defaultProps = {
  theme: 'default',
  underline: false,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Link = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> className = <span class="hljs-string">`link link--<span class="hljs-subst">${props.theme}</span>-theme`</span>;
  
  <span class="hljs-keyword">if</span> (!props.underline) className += <span class="hljs-string">' link--no-underline'</span>;

  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{props.href}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>{props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>;
};

Link.propTypes = {
  <span class="hljs-attr">theme</span>: PropTypes.oneOf([
    <span class="hljs-string">'default'</span>, <span class="hljs-comment">// primary color, no underline</span>
    <span class="hljs-string">'blend'</span>, <span class="hljs-comment">// inherit surrounding styles</span>
    <span class="hljs-string">'primary-button'</span>, <span class="hljs-comment">// primary color, solid block</span>
  ]),
  <span class="hljs-attr">underline</span>: PropTypes.bool,
  <span class="hljs-attr">href</span>: PropTypes.string.isRequired,
  <span class="hljs-attr">children</span>: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

Link.defaultProps = {
  <span class="hljs-attr">theme</span>: <span class="hljs-string">'default'</span>,
  <span class="hljs-attr">underline</span>: <span class="hljs-literal">false</span>,
};</code></pre>
<p>增加CSS...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".link--default-theme,
.link--blend-theme:hover {
  color: #D84315;
}

.link--blend-theme {
  color: inherit;
}

.link--default-theme:hover,
.link--blend-theme:hover {
  text-decoration: underline;
}

.link--primary-button-theme {
  display: inline-block;
  padding: 12px 25px;
  font-size: 18px;
  background: #D84315;
  color: white;
}

.link--no-underline {
  text-decoration: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-class">.link--default-theme</span>,
<span class="hljs-selector-class">.link--blend-theme</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#D84315</span>;
}

<span class="hljs-selector-class">.link--blend-theme</span> {
  <span class="hljs-attribute">color</span>: inherit;
}

<span class="hljs-selector-class">.link--default-theme</span><span class="hljs-selector-pseudo">:hover</span>,
<span class="hljs-selector-class">.link--blend-theme</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">text-decoration</span>: underline;
}

<span class="hljs-selector-class">.link--primary-button-theme</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">12px</span> <span class="hljs-number">25px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#D84315</span>;
  <span class="hljs-attribute">color</span>: white;
}

<span class="hljs-selector-class">.link--no-underline</span> {
  <span class="hljs-attribute">text-decoration</span>: none;
}</code></pre>
<p>你可能已经注意到链接 - 无下划线的选择器是没必要存在的， 因为他双重否定了。</p>
<p>故事时间：我曾经认为写CSS更少的CSS是目标，但它不是。我宁愿有一些双重否定和多选择器规则集，如果它的意思是样式以一个很好的分层方式应用的话。</p>
<p>我相信我以前说过，但缩放网站最困难的事情是CSS。 JavaScript很容易，但是随意使用CSS使你很遭罪 - 一旦你开始混乱，这是不容易中途修改来解决的。</p>
<p>真实的事实：CSS的特异性是网络开发人员死亡的第一原因。如果你在一台大型计算机上，请查看顶部导航栏中的小通知图标的CSS。</p>
<p>这个通知图标是由很多CSS样式组合在一起的。很复杂。</p>
<p>二十三条规则。</p>
<p>这不包括继承自十一个其他规则的样式。行高单独被覆盖九次。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008506709?w=343&amp;h=190" src="https://static.alili.tech/img/remote/1460000008506709?w=343&amp;h=190" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果line-height是一只猫，它现在已经死了。</p>
<p>这不能令人愉快地维护。</p>
<p>有了React，我们可以做得更好。我们可以仔细设计哪些类应用于我们的组件。我们可以删除全局样式和移动它所有在我们的Button.scss。我们可以消除对文件的特异性和顺序的所有依赖。</p>
<p>附注： 我梦想着有一天游览器对于样式没有自己的看法(意思就是所有游览器都变得统一， 完全去IE化-。-)。</p>
<h2 id="articleHeader8">5. The switching component</h2>
<p>切换组件是呈现最多的组件之一。</p>
<p>这可能是一个显示多个页面之一的&lt;Page&gt;组件。或选项卡集中的选项卡，或模态组件中的不同模态。</p>
<p>我曾经使用switch语句，进一步到实际传入我想要渲染的组件。然后从组件本身导出对组件的引用（命名为exports，然后作为组件上的属性）。</p>
<p>真是一堆可怕的想法！</p>
<p>我现在的方法是使用一个对象传递props给Page组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import UserPage from './UserPage.jsx';
import FourOhFourPage from './FourOhFourPage.jsx';

const PAGES = {
  home: HomePage,
  about: AboutPage,
  user: UserPage,
};

const Page = (props) => {
  const Handler = PAGES[props.page] || FourOhFourPage;
  
  return <Handler {...props} />
};

Page.propTypes = {
    page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> HomePage <span class="hljs-keyword">from</span> <span class="hljs-string">'./HomePage.jsx'</span>;
<span class="hljs-keyword">import</span> AboutPage <span class="hljs-keyword">from</span> <span class="hljs-string">'./AboutPage.jsx'</span>;
<span class="hljs-keyword">import</span> UserPage <span class="hljs-keyword">from</span> <span class="hljs-string">'./UserPage.jsx'</span>;
<span class="hljs-keyword">import</span> FourOhFourPage <span class="hljs-keyword">from</span> <span class="hljs-string">'./FourOhFourPage.jsx'</span>;

<span class="hljs-keyword">const</span> PAGES = {
  <span class="hljs-attr">home</span>: HomePage,
  <span class="hljs-attr">about</span>: AboutPage,
  <span class="hljs-attr">user</span>: UserPage,
};

<span class="hljs-keyword">const</span> Page = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> Handler = PAGES[props.page] || FourOhFourPage;
  
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Handler</span> {<span class="hljs-attr">...props</span>} /&gt;</span>
};

Page.propTypes = {
    page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};</span></code></pre>
<p>PAGES对象的key可以在prop类型中使用，以捕获dev时间错误。</p>
<p>然后，我们当然会使用这样&lt;page page =“home”/&gt;。</p>
<p>如果你用key替换home，about和user分别用/， /about和/user，你差不多就是个路由器了。</p>
<p>（未来的想法：再见 react-router。）</p>
<h2 id="articleHeader9">6. Reaching into a component</h2>
<p>如果您正在寻找一个简单的方法来请求您的用户输入信息，那么你可以添加自动对焦到输入组件， 当用户一个页面的时候。这种设计仅仅适用于登陆操作就在主页面内执行， 而不是单独弹出一个模态窗口。</p>
<p>你可以通过给输入组件一个id，然后使用<code>document.getElementById（'user-name-input'）。focus（）</code>来将用户的焦点集中在输入组件上。</p>
<p>这工作，但不是正确的方式。在你的应用程序中依靠两个字符串匹配的事情越少越好。<br>这可以正常的工作， 但确不是最好的方式。 在你的代码中依靠两个字符串匹配的事情越少越好。</p>
<p>幸运的是，有一个非常容易的方法来做到这一点“正确”：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Input extends Component {
  focus() {
    this.el.focus();
  }
  
  render() {
    return (
      <input
        ref={el=> { this.el = el; "}}"
      />
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Input</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  focus() {
    <span class="hljs-keyword">this</span>.el.focus();
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{el</span>=&gt;</span> { this.el = el; "}}"
      /&gt;
    );
  }
}</span></code></pre>
<p>真是酷炫屌炸天！ 一个具有focus（）方法的输入组件，用于聚焦HTML元素。</p>
<p>在父组件中，我们可以获得对Input组件的引用并调用其focus（）方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SignInModal extends Component {
  componentDidMount() {
    this.InputComponent.focus();
  }
  
  render() {
    return (
      <div>
        <label>User name: </label>
        <Input
          ref={comp => { this.InputComponent = comp; "}}"
        />
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SignInModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-keyword">this</span>.InputComponent.focus();
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>User name: <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Input</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{comp</span> =&gt;</span> { this.InputComponent = comp; "}}"
        /&gt;
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}</span></code></pre>
<p>注意，当在组件上使用ref时，它是对组件（而不是底层元素）的引用，因此您可以访问其方法。</p>
<h2 id="articleHeader10">7. Almost-components</h2>
<p>假设您正在构建一个组件，以便您可以搜索人员。在您输入时，您会看到一个可能匹配的名称和照片列表。这样的东西。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008506710?w=231&amp;h=277" src="https://static.alili.tech/img/remote/1460000008506710?w=231&amp;h=277" alt="" title="" style="cursor: pointer;"></span></p>
<p>（我正在寻找政治讽刺，因为我像大家一样，对其他人对政治的看法极为感兴趣。）</p>
<p>当设计此组件时，您可能会想到自己：该列表中的每个项目都是自己的SearchSuggestion组件？它真的只有几行HTML和CSS，也许不是？但我曾经被告知“如果有疑问，创造另一个组件”。</p>
<p>哦，我的，这是相当稀烂的一个泡菜，不是吗？</p>
<p>如果我是做这个，我不会有一个单独的组件。相反，只是一个renderSearchSuggestion方法返回每个条目的适当的DOM。然后结果就是下面的代码示例这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const SearchSuggestions = (props) => {
  // renderSearchSuggestion() behaves as a pseduo SearchSuggestion component
  // keep it self contained and it should be easy to extract later if needed
  const renderSearchSuggestion = listItem => (
    <li key={listItem.id}>{listItem.name} {listItem.id}</li>
  );
  
  return (
    <ul>
      {props.listItems.map(renderSearchSuggestion)}
    </ul>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> SearchSuggestions = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-comment">// renderSearchSuggestion() behaves as a pseduo SearchSuggestion component</span>
  <span class="hljs-comment">// keep it self contained and it should be easy to extract later if needed</span>
  <span class="hljs-keyword">const</span> renderSearchSuggestion = <span class="hljs-function"><span class="hljs-params">listItem</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{listItem.id}</span>&gt;</span>{listItem.name} {listItem.id}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  );
  
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {props.listItems.map(renderSearchSuggestion)}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}</code></pre>
<p>如果事情变得更复杂，或者您想在其他地方使用此组件，则应该能够将代码复制/粘贴到新组件中。</p>
<p>不要过早组件化。组件不像茶匙;你可以有太多。(意思组件可以随便复制， 但是茶匙不行)</p>
<h2 id="articleHeader11">8. Components for formatting text</h2>
<p>当我第一次开始使用React时，我想到组件应该是一个大东西，一种分组DOM的结构块的方法。但这样组件表现的很一般。</p>
<p>这里是一个&lt;Price&gt;组件，它接受一个数字，并返回一个漂亮的字符串，有或没有小数和一个'$'符号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Price = (props) => {
    const price = props.children.toLocaleString('en', {
      style: props.showSymbol ? 'currency' : undefined,
      currency: props.showSymbol ? 'USD' : undefined,
      maximumFractionDigits: props.showDecimals ? 2 : 0,
    });
    
    return <span className={props.className}>{price}</span>
};

Price.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.number,
  showDecimals: React.PropTypes.bool,
  showSymbol: React.PropTypes.bool,
};

Price.defaultProps = {
  children: 0,
  showDecimals: true,
  showSymbol: true,
};

const Page = () => {
  const lambPrice = 1234.567;
  const jetPrice = 999999.99;
  const bootPrice = 34.567;
  
  return (
    <div>
      <p>One lamb is <Price className=&quot;expensive&quot;>{lambPrice}</Price></p>
      <p>One jet is <Price showDecimals={false}>{jetPrice}</Price></p>
      <p>Those gumboots will set ya back <Price showDecimals={false} showSymbol={false}>{bootPrice}</Price> bucks.</p>
    </div>
  );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Price = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> price = props.children.toLocaleString(<span class="hljs-string">'en'</span>, {
      <span class="hljs-attr">style</span>: props.showSymbol ? <span class="hljs-string">'currency'</span> : <span class="hljs-literal">undefined</span>,
      <span class="hljs-attr">currency</span>: props.showSymbol ? <span class="hljs-string">'USD'</span> : <span class="hljs-literal">undefined</span>,
      <span class="hljs-attr">maximumFractionDigits</span>: props.showDecimals ? <span class="hljs-number">2</span> : <span class="hljs-number">0</span>,
    });
    
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{props.className}</span>&gt;</span>{price}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
};

Price.propTypes = {
  <span class="hljs-attr">className</span>: React.PropTypes.string,
  <span class="hljs-attr">children</span>: React.PropTypes.number,
  <span class="hljs-attr">showDecimals</span>: React.PropTypes.bool,
  <span class="hljs-attr">showSymbol</span>: React.PropTypes.bool,
};

Price.defaultProps = {
  <span class="hljs-attr">children</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">showDecimals</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">showSymbol</span>: <span class="hljs-literal">true</span>,
};

<span class="hljs-keyword">const</span> Page = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> lambPrice = <span class="hljs-number">1234.567</span>;
  <span class="hljs-keyword">const</span> jetPrice = <span class="hljs-number">999999.99</span>;
  <span class="hljs-keyword">const</span> bootPrice = <span class="hljs-number">34.567</span>;
  
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>One lamb is <span class="hljs-tag">&lt;<span class="hljs-name">Price</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"expensive"</span>&gt;</span>{lambPrice}<span class="hljs-tag">&lt;/<span class="hljs-name">Price</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>One jet is <span class="hljs-tag">&lt;<span class="hljs-name">Price</span> <span class="hljs-attr">showDecimals</span>=<span class="hljs-string">{false}</span>&gt;</span>{jetPrice}<span class="hljs-tag">&lt;/<span class="hljs-name">Price</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Those gumboots will set ya back <span class="hljs-tag">&lt;<span class="hljs-name">Price</span> <span class="hljs-attr">showDecimals</span>=<span class="hljs-string">{false}</span> <span class="hljs-attr">showSymbol</span>=<span class="hljs-string">{false}</span>&gt;</span>{bootPrice}<span class="hljs-tag">&lt;/<span class="hljs-name">Price</span>&gt;</span> bucks.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};</code></pre>
<p>正如你可以看到，我使用强大的Intl字符串格式化库，这里有一个<a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString" rel="nofollow noreferrer" target="_blank">链接</a>到他们的网站。</p>
<p>我应该指出（在一些朋克之前），这不是一行代码的保存。你可以很容易地使用函数来做到这一点。 （当然，组件只是具有不同形状括号的函数。）</p>
<p>这是更少的代码，但对我的眼睛，不太好：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function numberToPrice(num, options = {}) {
    const showSymbol = options.showSymbol !== false;
    const showDecimals = options.showDecimals !== false;
    
    return num.toLocaleString('en', {
      style: showSymbol ? 'currency' : undefined,
      currency: showSymbol ? 'USD' : undefined,
      maximumFractionDigits: showDecimals ? 2 : 0,
    });
}

const Page = () => {
  const lambPrice = 1234.567;
  const jetPrice = 999999.99;
  const bootPrice = 34.567;
  
  return (
    <div>
      <p>One lamb is <span className=&quot;expensive&quot;>{numberToPrice(lambPrice)}</span></p>
      <p>One jet is {numberToPrice(jetPrice, { showDecimals: false })}</p>
      <p>Those gumboots will set ya back {numberToPrice(bootPrice, { showDecimals: false, showSymbol: false })} bucks.</p>
    </div>
  );
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">numberToPrice</span>(<span class="hljs-params">num, options = {}</span>) </span>{
    <span class="hljs-keyword">const</span> showSymbol = options.showSymbol !== <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">const</span> showDecimals = options.showDecimals !== <span class="hljs-literal">false</span>;
    
    <span class="hljs-keyword">return</span> num.toLocaleString(<span class="hljs-string">'en'</span>, {
      <span class="hljs-attr">style</span>: showSymbol ? <span class="hljs-string">'currency'</span> : <span class="hljs-literal">undefined</span>,
      <span class="hljs-attr">currency</span>: showSymbol ? <span class="hljs-string">'USD'</span> : <span class="hljs-literal">undefined</span>,
      <span class="hljs-attr">maximumFractionDigits</span>: showDecimals ? <span class="hljs-number">2</span> : <span class="hljs-number">0</span>,
    });
}

<span class="hljs-keyword">const</span> Page = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> lambPrice = <span class="hljs-number">1234.567</span>;
  <span class="hljs-keyword">const</span> jetPrice = <span class="hljs-number">999999.99</span>;
  <span class="hljs-keyword">const</span> bootPrice = <span class="hljs-number">34.567</span>;
  
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>One lamb is <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"expensive"</span>&gt;</span>{numberToPrice(lambPrice)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>One jet is {numberToPrice(jetPrice, { showDecimals: false })}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Those gumboots will set ya back {numberToPrice(bootPrice, { showDecimals: false, showSymbol: false })} bucks.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>请注意，我不会检查我在上述任何一个有效的数字。那是因为 …</p>
<h2 id="articleHeader12">9. The store is the component’s servant</h2>
<p>我可能写了这么几千次：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (props.user.signInStatus === SIGN_IN_STATUSES.SIGNED_IN).." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> (props.user.signInStatus === SIGN_IN_STATUSES.SIGNED_IN)..</code></pre>
<p>（我被告知，我夸张，像，一个gazillion时代。）</p>
<p>最近我决定，如果我做这样的检查，我做错了。我想只问“是用户登录？”，而不是“用户的登录状态等于登录？”</p>
<p>的组件在他们的生命周期中所做的已经足够， 他们不应该去担心他们的父组件会传一些什么参数。 比如说Price不用管传入的数据是否是数字。</p>
<p>你会看到，如果你的store中的数据被设计为与您的组件匹配，您的组件将更加简单。我之前说过，复杂性是bug隐藏的地方。组件中的复杂性越低，bug出现的几率越低。</p>
<p>但是复杂这个问题肯定存在。</p>
<p>我的建议是：</p>
<ol>
<li><p>制定你的组件的一般结构和他们需要的数据</p></li>
<li><p>设计您的store以支持这些要求</p></li>
<li><p>做任何你需要做的输入数据，使其适合store。</p></li>
</ol>
<p>对于这最后一点，我建议一个单一的模块，所有的按传入的信息重命名props，将字符串转换为数字，将对象转换为数组，将日期字符串转换为日期对象。</p>
<p>如果你正在进行一个react/redux， 你可以在一个动作创建者中获取搜索结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(`/api/search?${queryParams}`)
.then(response => response.json())
.then(normalizeSearchResultsApiData) // the do-it-all data massager
.then(normalData => {
    // dispatch normalData to the store here
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fetch(<span class="hljs-string">`/api/search?<span class="hljs-subst">${queryParams}</span>`</span>)
.then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
.then(normalizeSearchResultsApiData) <span class="hljs-comment">// the do-it-all data massager</span>
.then(<span class="hljs-function"><span class="hljs-params">normalData</span> =&gt;</span> {
    <span class="hljs-comment">// dispatch normalData to the store here</span>
});</code></pre>
<p>你的组件将会感谢你的。</p>
<h2 id="articleHeader13">10. Importing components without relative paths</h2>
<p>不这样做的话后患无穷啊！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Button from '../../../../Button/Button.jsx';
import Icon from '../../../../Icon/Icon.jsx';
import Footer from '../../Footer/Footer.jsx';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Button <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../../Button/Button.jsx'</span>;
<span class="hljs-keyword">import</span> Icon <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../../Icon/Icon.jsx'</span>;
<span class="hljs-keyword">import</span> Footer <span class="hljs-keyword">from</span> <span class="hljs-string">'../../Footer/Footer.jsx'</span>;</code></pre>
<p>或者你可以这样做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Button, Icon, Footer} from 'Components';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {Button, Icon, Footer} <span class="hljs-keyword">from</span> <span class="hljs-string">'Components'</span>;
</code></pre>
<p>理论上你可以：</p>
<ul>
<li><p>在导出每个组件的地方创建单个index.js</p></li>
<li><p>使用Webpack的resolve.alias将组件重定向到该索引文件</p></li>
</ul>
<p>但是当我写的代码我来认识到这是一个坏主意，有三个原因：当我写代码的时候， 我才认识到上面的模式并不好，原因有三个。</p>
<ol>
<li><p>在Webpack2 似乎改变了原有的API。</p></li>
<li><p>eslint将会检测到错误， 由于找不到你引用的组件(因为resolve.alias)。</p></li>
<li><p>如果你使用一个好的IDE，它会知道你的组件在哪里。你会得到关于不提供所需props的提示， 也无法通过Command+click 打开文件这个功能。如果你这样做，你的IDE将不再知道在哪里找到该组件，你会失去这些给力的功能。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008506711?w=348&amp;h=176" src="https://static.alili.tech/img/remote/1460000008506711?w=348&amp;h=176" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader14">Wrap up</h2>
<p>这就是全部， 我非常确定我将在今年看到这些模式的应用。 或许你们今天就会使用它。 你也可以分享一些你觉得不错的模式。</p>
<p>喔， 我决定我不关心你是否点击了绿色的心。</p>
<blockquote><p>I WILL NOT BE DEFINED BY AN INTERNET METRIC.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React的10种有效的设计模式

## 原文链接
[https://segmentfault.com/a/1190000008506703](https://segmentfault.com/a/1190000008506703)

