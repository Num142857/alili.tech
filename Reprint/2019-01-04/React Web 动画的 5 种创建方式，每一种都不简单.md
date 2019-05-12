---
title: 'React Web 动画的 5 种创建方式，每一种都不简单' 
date: 2019-01-04 2:30:10
hidden: true
slug: hx3uqtwg3j
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>以前一直投入在 <code>React Native</code> 中，写动画的时候不是用 <code>CSS 中的 transitions / animations</code>，就是依赖像 <code>GreenSock</code> 这样的库，最近转向 <code>Web</code>，在 <code>Tweet</code> 得到很多大佬关于 <code>React Web 动画</code> 的回应，于是决定分享给大家，如有其他见解，非常欢迎在下面<code>评论</code>中交流</blockquote>
<p>以下便是本文要分享的创建 <code>React 动画</code> 的几种方式</p>
<ul>
<li>CSS animation</li>
<li>JS Style</li>
<li><a href="http://t.cn/RLeuFGX" rel="nofollow noreferrer" target="_blank">React Motion</a></li>
<li><a href="http://t.cn/R9d015g" rel="nofollow noreferrer" target="_blank">Animated</a></li>
<li><a href="http://t.cn/R9dOzS1" rel="nofollow noreferrer" target="_blank">Velocity React</a></li>
</ul>
<p>下面，勒次个特斯大特一特</p>
<h2 id="articleHeader0">CSS animation</h2>
<p>给元素添加 <code>class</code> 是最简单，最常见的书写方式。如果你的 <code>app</code> 正在使用 <code>CSS</code>，那么这将是你最愉快的选择</p>
<p><code>赞同者</code>： 我们只需修改 <code>opacity</code> 和 <code>transform</code> 这样的属性，就可构建基本的动画，而且，在组件中，我们可以非常容易地通过 <code>state</code> 去更新这些值</p>
<p><code>反对者</code>：这种方式并<code>不跨平台</code>，在 <code>React Native</code> 中就不适用，而且，对于较复杂的动画，这种方式<code>难以控制</code></p>
<p>接下来，我们通过一个实例来体验一下这种创建方式：<code>当 input focus 的时候，我们增加它的宽度</code></p>
<p>首先，我们要创建两个 <code>input</code> 要用到的 <code>class</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".input {
  width: 150px;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  background-color: #dddddd;
  transition: width .35s linear;
  outline: none;
}

.input-focused {
  width: 240px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.input</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">border</span>: none;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#dddddd</span>;
  <span class="hljs-attribute">transition</span>: width .<span class="hljs-number">35s</span> linear;
  <span class="hljs-attribute">outline</span>: none;
}

<span class="hljs-selector-class">.input-focused</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">240px</span>;
}</code></pre>
<p>一个是它<code>原始</code>的样式，一个是它 <code>focus</code> 后的样式</p>
<p>下面，我们就开始书写我们的 <code>React 组件</code></p>
<p>在此，推荐一个 <a href="https://stackblitz.com/" rel="nofollow noreferrer" target="_blank">在线的 React VS Code IDE</a>，真的很强大，读者不想构建自己的 <code>React app</code>，可以在其中检验以下代码的正确性</p>
<p><span class="img-wrap"><img data-src="/img/bVSPvU?w=728&amp;h=244" src="https://static.alili.tech/img/bVSPvU?w=728&amp;h=244" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  state = {
    focused: false,
  }

  componentDidMount() {
    this._input.addEventListener('focus', this.focus);
    this._input.addEventListener('blur', this.focus);
  }

  focus = () => {
    this.setState(prevState => ({
      focused: !prevState.focused,
    }));
  }

  render() {
    return (
      <div className=&quot;App&quot;>
        <div className=&quot;container&quot;>
          <input
            ref={input => this._input = input}
            className={['input', this.state.focused &amp;&amp; 'input-focused'].join(' ')}
          />
        </div>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-attr">focused</span>: <span class="hljs-literal">false</span>,
  }

  componentDidMount() {
    <span class="hljs-keyword">this</span>._input.addEventListener(<span class="hljs-string">'focus'</span>, <span class="hljs-keyword">this</span>.focus);
    <span class="hljs-keyword">this</span>._input.addEventListener(<span class="hljs-string">'blur'</span>, <span class="hljs-keyword">this</span>.focus);
  }

  focus = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
      <span class="hljs-attr">focused</span>: !prevState.focused,
    }));
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"container"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">ref</span>=<span class="hljs-string">{input</span> =&gt;</span> this._input = input}
            className={['input', this.state.focused &amp;&amp; 'input-focused'].join(' ')}
          /&gt;
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}</span></code></pre>
<ul>
<li>我们有一个 <code>focused</code> 的 <code>state</code>，初始值为 <code>false</code>，我们通过<code>更新该值</code>来创建我们的动画</li>
<li>在 <code>componentDidMount</code> 中，我们添加两个<code>监听器</code>，一个 <code>focus</code>，一个 <code>blur</code>，指定的<code>回调函数都</code>是 <code>focus</code>
</li>
<li>
<code>focus</code> 方法会获取之前 <code>focused</code> 的值，并负责<code>切换</code>该值</li>
<li>在 <code>render</code> 中，我们通过 <code>state</code> 来改变 <code>input</code> 的 <code>classNames</code>，从而实现我们的动画</li>
</ul>
<h2 id="articleHeader1">JS Style</h2>
<p><code>JavaScipt styles</code> 跟 <code>CSS 中的 classes</code> 类似，在 <code>JS</code> 文件中，我们就可以拥有所有逻辑</p>
<p><code>赞同者</code>：跟 <code>CSS 动画</code> 一样，且它的表现更加清晰。它也不失为一个好方法，可以不必依赖任何 <code>CSS</code></p>
<p><code>反对者</code>：跟 <code>CSS 动画</code> 一样，也是<code>不跨平台</code>的，且动画一旦复杂，也<code>难以控制</code></p>
<p>在下面的实例中，我们将创建一个 <code>input</code>，当用户输入时，我们将一个 <code>button</code> 从 <code>disable</code> 转变为 <code>enable</code></p>
<p><span class="img-wrap"><img data-src="/img/bVSPwm?w=722&amp;h=310" src="https://static.alili.tech/img/bVSPwm?w=722&amp;h=310" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  state = {
    disabled: true,
  }

  onChange = (e) => {
    const length = e.target.value.length;

    if (length > 0) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }
  render() {
    const { disabled } = this.state;
    const label = disabled ? 'Disabled' : 'Submit';

    return (
      <div style={styles.App}>
        <input
          style={styles.input}
          onChange={this.onChange}
        />
        <button
          style={Object.assign({},
            styles.button,
            !this.state.disabled &amp;&amp; styles.buttonEnabled
          )}
          disabled={disabled}
        >
          {label}
        </button>
      </div>
    );
  }
}


const styles = {
  App: {
    display: 'flex',
    justifyContent: 'left',
  },
  input: {
    marginRight: 10,
    padding: 10,
    width: 190,
    fontSize: 20,
    border: 'none',
    backgroundColor: '#ddd',
    outline: 'none',
  },
  button: {
    width: 90,
    height: 43,
    fontSize: 17,
    border: 'none',
    borderRadius: 4,
    transition: '.25s all',
    cursor: 'pointer',
  },
  buttonEnabled: {
    width: 120,
    backgroundColor: '#ffc107',
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-attr">disabled</span>: <span class="hljs-literal">true</span>,
  }

  onChange = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> length = e.target.value.length;

    <span class="hljs-keyword">if</span> (length &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">disabled</span>: <span class="hljs-literal">false</span> });
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">disabled</span>: <span class="hljs-literal">true</span> });
    }
  }
  render() {
    <span class="hljs-keyword">const</span> { disabled } = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">const</span> label = disabled ? <span class="hljs-string">'Disabled'</span> : <span class="hljs-string">'Submit'</span>;

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.App}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.input}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.onChange}</span>
        /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{Object.assign({},</span>
            <span class="hljs-attr">styles.button</span>,
            !<span class="hljs-attr">this.state.disabled</span> &amp;&amp; <span class="hljs-attr">styles.buttonEnabled</span>
          )}
          <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
        &gt;</span>
          {label}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}


const styles = {
  App: {
    display: 'flex',
    justifyContent: 'left',
  },
  input: {
    marginRight: 10,
    padding: 10,
    width: 190,
    fontSize: 20,
    border: 'none',
    backgroundColor: '#ddd',
    outline: 'none',
  },
  button: {
    width: 90,
    height: 43,
    fontSize: 17,
    border: 'none',
    borderRadius: 4,
    transition: '.25s all',
    cursor: 'pointer',
  },
  buttonEnabled: {
    width: 120,
    backgroundColor: '#ffc107',
  }
}</span></code></pre>
<ul>
<li>我们有一个 <code>disabled</code> 的 <code>state</code>，初始值为 <code>true</code>
</li>
<li>
<code>onChange</code> 方法会获取用户的输入，当输入非空时，就切换 <code>disabled</code> 的值</li>
<li>根据 <code>disabled</code> 的值，确定是否将 <code>buttonEnabled</code> 添加到 <code>button</code> 中</li>
</ul>
<h2 id="articleHeader2">React Motion</h2>
<p><code>React Motion</code> 是 <a href="https://medium.com/@chenglou" rel="nofollow noreferrer" target="_blank">Cheng Lou</a> 书写的一个非常不错的开源项目。它的思想是你可以对<code>Motion 组件</code> 进行简单的<code>样式设置</code>，然后你就可以在<code>回调函数</code>中通过这些值，享受动画带来的乐趣</p>
<p>对于绝大多数的动画组件，我们往往不希望对<code>动画属性</code>（宽高、颜色等）的变化时间做<code>硬编码</code>处理，<code>react-motion</code> 提供的 <code>spring</code> 函数就是用来解决这一需求的，它可以逼真地模仿真实的物理效果，也就是我们常见的各类<code>缓动效果</code></p>
<p>下面是一个<code>森破</code>的示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Motion style="{{" x: spring(this.state.x) "}}">
  {
    ({ x }) =>
      <div style="{{" transform: `translateX(${x}px)` "}}" />
  }
</Motion>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;Motion style="{{" <span class="hljs-attr">x</span>: spring(<span class="hljs-keyword">this</span>.state.x) "}}"&gt;
  {
    ({ x }) =&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">transform:</span> `<span class="hljs-attr">translateX</span>(${<span class="hljs-attr">x</span>}<span class="hljs-attr">px</span>)` "}}" /&gt;</span>
  }
<span class="hljs-tag">&lt;/<span class="hljs-name">Motion</span>&gt;</span></span></code></pre>
<p>这是官方提供的几个 <code>demo</code>，真的可以是<code>不看不知道，一看吓一跳</code></p>
<ul>
<li><a href="http://t.cn/R9epBQV" rel="nofollow noreferrer" target="_blank">Chat Heads</a></li>
<li><a href="http://t.cn/R9eprR8" rel="nofollow noreferrer" target="_blank">Draggable Balls</a></li>
<li><a href="http://t.cn/R9epdOH" rel="nofollow noreferrer" target="_blank">TodoMVC List Transition</a></li>
<li><a href="http://t.cn/R9epgoj" rel="nofollow noreferrer" target="_blank">Water Ripples</a></li>
<li><a href="http://t.cn/R9epe9u" rel="nofollow noreferrer" target="_blank">Draggable List</a></li>
</ul>
<p><code>赞同者</code>：<code>React Motion</code> 可以在 <code>React Web</code> 中使用，也可以在 <code>React Native</code> 中使用，因为它是跨平台的。其中的 <code>spring</code> 概念最开始对我来说感觉挺陌生，然而上手之后，发现它真的很<code>神奇</code>，并且，它有很详细的 <code>API</code></p>
<p><code>反对者</code>：在某些情况下，他不如<code>纯 CSS / JS 动画</code>，虽然它有不错的 <code>API</code>，容易上手，但也需要学习成本</p>
<p>为了使用它，首先我们要用 <code>yarn</code> 或 <code>npm</code> 安装它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add react-motion" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> react-motion</span></code></pre>
<p>在下面的实例中，我们将创建一个 <code>dropdown 菜单</code>，当点击按钮时，下拉菜单友好展开</p>
<p><span class="img-wrap"><img data-src="/img/bVSPw3?w=676&amp;h=522" src="https://static.alili.tech/img/bVSPw3?w=676&amp;h=522" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
  state = {
    height: 38,
  }

  animate = () => {
    this.setState((state) => ({ height: state.height === 233 ? 38 : 233 }));
  }

  render() {
    return (
      <div className=&quot;App&quot;>
        <div style={styles.button} onClick={this.animate}>Animate</div>
        <Motion
          style="{{" height: spring(this.state.height) "}}"
        >
          {
            ({ height }) =>
            <div style={Object.assign({}, styles.menu, { height } )}>
              <p style={styles.selection}>Selection 1</p>
              <p style={styles.selection}>Selection 2</p>
              <p style={styles.selection}>Selection 3</p>
              <p style={styles.selection}>Selection 4</p>
              <p style={styles.selection}>Selection 5</p>
              <p style={styles.selection}>Selection 6</p>
            </div>
          }
        </Motion>
      </div>
    );
  }
}

const styles = {
  menu: {
    marginTop: 20,
    width: 300,
    border: '2px solid #ddd',
    overflow: 'hidden',
  },
  button: {
    display: 'flex',
    width: 200,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    borderRadius: 4,
    backgroundColor: '#ffc107',
    cursor: 'pointer',
  },
  selection: {
    margin: 0,
    padding: 10,
    borderBottom: '1px solid #ededed',
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-attr">height</span>: <span class="hljs-number">38</span>,
  }

  animate = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> ({ <span class="hljs-attr">height</span>: state.height === <span class="hljs-number">233</span> ? <span class="hljs-number">38</span> : <span class="hljs-number">233</span> }));
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.button}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.animate}</span>&gt;</span>Animate<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Motion</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">height:</span> <span class="hljs-attr">spring</span>(<span class="hljs-attr">this.state.height</span>) "}}"
        &gt;</span>
          {
            ({ height }) =&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{Object.assign({},</span> <span class="hljs-attr">styles.menu</span>, { <span class="hljs-attr">height</span> } )}&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.selection}</span>&gt;</span>Selection 1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.selection}</span>&gt;</span>Selection 2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.selection}</span>&gt;</span>Selection 3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.selection}</span>&gt;</span>Selection 4<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.selection}</span>&gt;</span>Selection 5<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.selection}</span>&gt;</span>Selection 6<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          }
        <span class="hljs-tag">&lt;/<span class="hljs-name">Motion</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">const</span> styles = {
  <span class="hljs-attr">menu</span>: {
    <span class="hljs-attr">marginTop</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">width</span>: <span class="hljs-number">300</span>,
    <span class="hljs-attr">border</span>: <span class="hljs-string">'2px solid #ddd'</span>,
    <span class="hljs-attr">overflow</span>: <span class="hljs-string">'hidden'</span>,
  },
  <span class="hljs-attr">button</span>: {
    <span class="hljs-attr">display</span>: <span class="hljs-string">'flex'</span>,
    <span class="hljs-attr">width</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">height</span>: <span class="hljs-number">45</span>,
    <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span>,
    <span class="hljs-attr">alignItems</span>: <span class="hljs-string">'center'</span>,
    <span class="hljs-attr">border</span>: <span class="hljs-string">'none'</span>,
    <span class="hljs-attr">borderRadius</span>: <span class="hljs-number">4</span>,
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#ffc107'</span>,
    <span class="hljs-attr">cursor</span>: <span class="hljs-string">'pointer'</span>,
  },
  <span class="hljs-attr">selection</span>: {
    <span class="hljs-attr">margin</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">padding</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">borderBottom</span>: <span class="hljs-string">'1px solid #ededed'</span>,
  },
}</code></pre>
<ul>
<li>我们从 <code>react-motion</code> 中 import <code>Motion</code> 和 <code>spring</code>
</li>
<li>我们有一个 <code>height</code> 的 <code>state</code>，初始值为 <code>38</code>，代表 <code>menu</code> 的高度</li>
<li>
<code>animate</code> 方法设置 <code>menu</code> 的 <code>height</code>，如果 <code>原 height</code> 为 <code>38</code>，则设置 <code>新 height</code> 为 <code>233</code>，如果 <code>原 height</code> 为 <code>233</code>，则设置 <code>新 height</code> 为 <code>38</code>
</li>
<li>在 <code>render</code> 中，我们使用 <code>Motion 组件</code> 包装整个 <code>p 标签</code> 列表，将 <code>this.state.height</code> 的当前值设为组件的 <code>height</code>，然后在组件的<code>回调函数</code>中使用该值作为整个下拉的高度</li>
<li>当按钮被点击时，我们通过 <code>this.animate</code> 切换下拉的高度</li>
</ul>
<h2 id="articleHeader3">Animated</h2>
<p><code>Animated</code> 是基于 <code>React Native</code> 使用的同一个动画库建立起来的</p>
<p>它背后的思想是创建<code>声明式动画</code>，通过<code>传递配置对象来控制动画</code></p>
<p><code>赞同者</code>：<code>跨平台</code>，它在 <code>React Native</code> 中已经非常稳定，如果你在 <code>React Native</code> 中使用过，那么你将不用再重复学习。其中的 <code>interpolate</code> 是一个神奇的插值函数，我们将在下面看到</p>
<p><code>反对者</code>：基于 <code>Twitter</code> 的交流，它目前貌似不是 <code>100%</code> 的稳定，在老的浏览器中的，存在<code>前缀</code>和<code>性能</code>的问题，而且，它也有学习成本</p>
<p>为了使用 <code>Animated</code>，我们首先还是要用 <code>yarn</code> 或 <code>npm</code> 安装它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add animated" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> animated</span></code></pre>
<p>在下面的实例中，我们将模拟在提交表单成功后显示的动画 <code>message</code></p>
<p><span class="img-wrap"><img data-src="/img/bVSPxR?w=706&amp;h=358" src="https://static.alili.tech/img/bVSPxR?w=706&amp;h=358" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

class AnimatedApp extends Component {
  animatedValue = new Animated.Value(0);

  animate = () => {
    this.animatedValue.setValue(0);

    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
      }
    ).start();
  }

  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0],
    });

    return (
      <div className=&quot;App&quot;>
          <div style={styles.button} onClick={this.animate}>Animate</div>
          <Animated.div
            style={
              Object.assign(
                {},
                styles.box,
                { opacity: this.animatedValue, marginLeft })}
          >
            <p>Thanks for your submission!</p>
          </Animated.div>
      </div>
    );
  }
}

const styles = {
  button: {
    display: 'flex',
    width: 125,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    borderRadius: 4,
    backgroundColor: '#ffc107',
    cursor: 'pointer',
  },
  box: {
    display: 'inline-block',
    marginTop: 10,
    padding: '0.6rem 2rem',
    fontSize:'0.8rem',
    border: '1px #eee solid',
    borderRadius: 4,
    boxShadow: '0 2px 8px rgba(0,0,0,.2)',
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Animated <span class="hljs-keyword">from</span> <span class="hljs-string">'animated/lib/targets/react-dom'</span>;
<span class="hljs-keyword">import</span> Easing <span class="hljs-keyword">from</span> <span class="hljs-string">'animated/lib/Easing'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AnimatedApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  animatedValue = <span class="hljs-keyword">new</span> Animated.Value(<span class="hljs-number">0</span>);

  animate = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.animatedValue.setValue(<span class="hljs-number">0</span>);

    Animated.timing(
      <span class="hljs-keyword">this</span>.animatedValue,
      {
        <span class="hljs-attr">toValue</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">duration</span>: <span class="hljs-number">1000</span>,
        <span class="hljs-attr">easing</span>: Easing.elastic(<span class="hljs-number">1</span>),
      }
    ).start();
  }

  render() {
    <span class="hljs-keyword">const</span> marginLeft = <span class="hljs-keyword">this</span>.animatedValue.interpolate({
      <span class="hljs-attr">inputRange</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
      <span class="hljs-attr">outputRange</span>: [<span class="hljs-number">-120</span>, <span class="hljs-number">0</span>],
    });

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.button}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.animate}</span>&gt;</span>Animate<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Animated.div</span>
            <span class="hljs-attr">style</span>=<span class="hljs-string">{</span>
              <span class="hljs-attr">Object.assign</span>(
                {},
                <span class="hljs-attr">styles.box</span>,
                { <span class="hljs-attr">opacity:</span> <span class="hljs-attr">this.animatedValue</span>, <span class="hljs-attr">marginLeft</span> })}
          &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Thanks for your submission!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Animated.div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

const styles = {
  button: {
    display: 'flex',
    width: 125,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    borderRadius: 4,
    backgroundColor: '#ffc107',
    cursor: 'pointer',
  },
  box: {
    display: 'inline-block',
    marginTop: 10,
    padding: '0.6rem 2rem',
    fontSize:'0.8rem',
    border: '1px #eee solid',
    borderRadius: 4,
    boxShadow: '0 2px 8px rgba(0,0,0,.2)',
  },
}</span></code></pre>
<ul>
<li>从 <code>animated</code> 中 import <code>Animated</code> 和 <code>Easing</code>
</li>
<li>用 <code>new Animated.Value(0)</code> 创建一个值为 <code>0</code> 的类属性 - <code>animatedValue</code>
</li>
<li>创建 <code>animate</code> 方法，处理所有的动画，首先通过 <code>this.animatedValue.setValue(0)</code> 初始化动画值，实现的效果就是每次<code>重新执行</code>该动画，然后调用 <code>Animated.timing</code>，<code>animatedValue</code> 作为第一个参数传递，<code>配置对象</code> 作为第二个参数，一个设置<code>最终动画值</code>，一个设置<code>持续时间</code>，一个设置<code>缓动效果</code>
</li>
<li>在 <code>render</code> 中，我们用 <code>interpolate</code> 方法创建 <code>marginLeft</code> 对象，包含 <code>inputRange</code> 和 <code>outputRange</code> 数组，我们使用此对象作为 <code>UI</code> 中 <code>message</code> 的 <code>style</code> 属性</li>
<li>我们使用 <code>Animated.div</code> 替代默认的 <code>div</code>
</li>
<li>我们将 <code>animatedValue</code> 和 <code>marginLeft</code> 作为 <code>Animated.div</code> 的 <code>style</code> 属性</li>
</ul>
<h2 id="articleHeader4">Velocity React</h2>
<p><code>Velocity React</code> 是基于已经存在的 <code>Velocity</code> 建立起来的</p>
<p><code>赞同者</code>：上手容易，<code>API</code> 简单明了，相对其他库更易于掌握</p>
<p><code>反对者</code>：有些不得不克服的问题，比如 <code>componentDidMount</code> 后动画并没有真正地起作用等，而且，它<code>不跨平台</code></p>
<p>下面是一个<code>森破</code>的示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<VelocityComponent
  animation="{{" opacity: this.state.showSubComponent ? 1 : 0 "}}"      
  duration={500}
>
  <MySubComponent/>
</VelocityComponent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;VelocityComponent
  animation="{{" <span class="hljs-attr">opacity</span>: <span class="hljs-keyword">this</span>.state.showSubComponent ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span> "}}"      
  duration={<span class="hljs-number">500</span>}
&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MySubComponent</span>/&gt;</span></span>
&lt;<span class="hljs-regexp">/VelocityComponent&gt;</span></code></pre>
<p>首先还是要用 <code>yarn</code> 或 <code>npm</code> 安装它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add velocity-react" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> velocity-react</span></code></pre>
<p>在下面的实例中，我们将创建一个很酷的<code>动画输入</code></p>
<p><span class="img-wrap"><img data-src="/img/bVSPzc?w=712&amp;h=420" src="https://static.alili.tech/img/bVSPzc?w=712&amp;h=420" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { VelocityComponent } from 'velocity-react';

const VelocityLetter = ({ letter }) => (
  <VelocityComponent
    runOnMount
    animation="{{" opacity: 1, marginTop: 0 "}}"
    duration={500}
  >
    <p style={styles.letter}>{letter}</p>
  </VelocityComponent>
)

class VelocityApp extends Component {
  state = {
    letters: [],
  }

  onChange = (e) => {
    const letters = e.target.value.split('');
    const arr = [];

    letters.forEach((l, i) => {
      arr.push(<VelocityLetter letter={l} />)
    });
    this.setState({ letters: arr });
  }

  render() {
    return (
      <div className=&quot;App&quot;>
        <div className=&quot;container&quot;>
          <input onChange={this.onChange} style={styles.input} />
          <div style={styles.letters}>
            {
              this.state.letters
            }
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  input: {
    marginBottom: 20,
    padding: 8,
    width: 200,
    height: 40,
    fontSize: 22,
    backgroundColor: '#ddd',
    border: 'none',
    outline: 'none',
  },
  letters: {
    display: 'flex',
    height: 140,
  },
  letter: {
    marginTop: 100,
    fontSize: 22,
    whiteSpace: 'pre',
    opacity: 0,
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="JavaScipt"><span class="hljs-keyword">import</span> { VelocityComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'velocity-react'</span>;

const VelocityLetter = <span class="hljs-function"><span class="hljs-params">({ letter })</span> =&gt;</span> (
  &lt;VelocityComponent
    runOnMount
    animation="{{" opacity: <span class="hljs-number">1</span>, marginTop: <span class="hljs-number">0</span> "}}"
    duration={<span class="hljs-number">500</span>}
  &gt;
    &lt;p style={styles.letter}&gt;{letter}&lt;/p&gt;
  &lt;/VelocityComponent&gt;
)

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VelocityApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> {</span>
  state = {
    letters: [],
  }
<span class="hljs-function">
  <span class="hljs-title">onChange</span> = <span class="hljs-params">(e)</span> =&gt;</span> {
    const letters = e.target.value.split(<span class="hljs-string">''</span>);
    const arr = [];

    letters.forEach(<span class="hljs-function"><span class="hljs-params">(l, i)</span> =&gt;</span> {
      arr.push(&lt;VelocityLetter letter={l} /&gt;)
    });
    <span class="hljs-keyword">this</span>.setState({ letters: arr });
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">"App"</span>&gt;
        &lt;div className=<span class="hljs-string">"container"</span>&gt;
          &lt;input onChange={<span class="hljs-keyword">this</span>.onChange} style={styles.input} /&gt;
          &lt;div style={styles.letters}&gt;
            {
              <span class="hljs-keyword">this</span>.state.letters
            }
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
}

const styles = {
  input: {
    marginBottom: <span class="hljs-number">20</span>,
    padding: <span class="hljs-number">8</span>,
    width: <span class="hljs-number">200</span>,
    height: <span class="hljs-number">40</span>,
    fontSize: <span class="hljs-number">22</span>,
    backgroundColor: <span class="hljs-string">'#ddd'</span>,
    border: <span class="hljs-string">'none'</span>,
    outline: <span class="hljs-string">'none'</span>,
  },
  letters: {
    display: <span class="hljs-string">'flex'</span>,
    height: <span class="hljs-number">140</span>,
  },
  letter: {
    marginTop: <span class="hljs-number">100</span>,
    fontSize: <span class="hljs-number">22</span>,
    whiteSpace: <span class="hljs-string">'pre'</span>,
    opacity: <span class="hljs-number">0</span>,
  }
}</code></pre>
<ul>
<li>从 <code>velocity-react</code> 中 import <code>VelocityComponent</code>
</li>
<li>我们要创建一个<code>可重复</code>使用的组件来满足每个 <code>letter</code> 的动画</li>
<li>在这个组件中，我们将 <code>animation</code> 的 <code>opacity</code> 设为 <code>1</code>，<code>marginTop</code> 设为 <code>0</code>，这些值代表着传入子组件的<code>重写值</code>，即当组件被创建时，组件的 <code>opacity</code> 会由初始的 <code>0</code> 变为 <code>1</code>，<code>marginTop</code> 会由初始的 <code>100</code> 变为 <code>0</code>，我们还设置了 <code>500 ms</code> 的持续时间，最后值得一提的是 <code>runOnMount</code> 属性，它的意思是在组件 <code>挂载</code> 或 <code>创建</code> 完后执行该动画</li>
<li>其中的 <code>onChange</code> 方法会获取用户的每次输入，并创建一个由 <code>VelocityLetter</code> 组成的新数组</li>
<li>在 <code>render</code> 中，我们就使用该数组在 <code>UI</code> 中渲染 <code>letters</code>
</li>
</ul>
<h2 id="articleHeader5">总结</h2>
<p>总的来说，基本的动画，我会选择 <code>JS style</code>，复杂的动画，我更偏向 <code>React Motion</code>。而对于 <code>React Native</code>，我还是坚持使用 <code>Animated</code>，一旦 <code>Animated</code> 成熟，在 <code>Web</code> 中可能也会投入使用，目前，我真的很享受 <code>React Motion</code></p>
<p><code>原文链接</code>: <a href="http://t.cn/R9DyGsz" rel="nofollow noreferrer" target="_blank">React Animations in Depth (Nader Dabit)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Web 动画的 5 种创建方式，每一种都不简单

## 原文链接
[https://segmentfault.com/a/1190000010645631](https://segmentfault.com/a/1190000010645631)

