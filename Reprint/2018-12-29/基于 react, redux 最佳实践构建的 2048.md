---
title: '基于 react, redux 最佳实践构建的 2048' 
date: 2018-12-29 2:30:10
hidden: true
slug: ztods7enf0c
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间 React license 的问题闹的沸沸扬扬，搞得 React 社区人心惶惶，好在最终 React 团队听取了社区意见把 license 换成了 MIT。不管 React license 如何，React 都是一个值得好好学习的优秀视图库。</p>
<p>本项目算不上什么大型项目，但依然按照大型项目的标准采用前端流行的最佳实践来打造一个有良好代码质量，高性能，高可维护性，模块化的应用。本项目是基于 <a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react</a>, <a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a> 构建的 2048，此外也使用了近两年优秀的开源工具来提高代码质量，包括 <a href="https://github.com/eslint/eslint" rel="nofollow noreferrer" target="_blank">eslint</a>，<a href="https://github.com/stylelint/stylelint" rel="nofollow noreferrer" target="_blank">stylelint</a>，<a href="https://github.com/prettier/prettier" rel="nofollow noreferrer" target="_blank">prettier</a> 等等，以及 <a href="https://travis-ci.org" rel="nofollow noreferrer" target="_blank">travis</a>，<a href="https://codecov.io" rel="nofollow noreferrer" target="_blank">codecov</a> 等持续集成，持续部署等服务来保障代码质量和提高开发效率。</p>
<p><a href="https://github.com/devrsi0n/React-2048-game" rel="nofollow noreferrer" target="_blank">项目地址</a>，喜欢的话 github 点个 star 支持下吧?</p>
<h2 id="articleHeader0">预览</h2>
<h3 id="articleHeader1">桌面端</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011522875?w=2048&amp;h=1186" src="https://static.alili.tech/img/remote/1460000011522875?w=2048&amp;h=1186" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">移动端</h3>
<p><span class="img-wrap"><img data-src="/img/bVWvHg?w=561&amp;h=1176" src="https://static.alili.tech/img/bVWvHg?w=561&amp;h=1176" alt="8ef543b5gy1fkbxcozh9cj20fl0woju7.jpg" title="8ef543b5gy1fkbxcozh9cj20fl0woju7.jpg" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">特性</h2>
<h3 id="articleHeader4">响应式</h3>
<p>自适应桌面和移动平台不同分辨率和尺寸，支持移动平台浏览器触控操作。下面的动图模拟了不同分辨率下的显示效果。实现方式主要是把 css 单位从 px 换成了 <a href="https://github.com/simaQ/cssfun/issues/1" rel="nofollow noreferrer" target="_blank">vw 和 rem</a> ，各元素的尺寸是按照分辨率来进行缩放的。css 媒体查询到移动浏览器的话，调整部分组件的位置，隐藏部分不重要的组件，使页面更加紧凑。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011522876?w=1359&amp;h=644" src="https://static.alili.tech/img/remote/1460000011522876?w=1359&amp;h=644" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">数据持久化</h3>
<p>网页应用最怕断电和离线，第一个问题通过 <code>store.subscribe</code> 订阅 redux 状态更新，把状态序列化到 <code>localStorage</code> 储存，即使刷新，断电，程序奔溃再次打开仍然是最新的状态，第二个问题借助 chrome 的 <a href="https://zhuanlan.zhihu.com/p/25167289" rel="nofollow noreferrer" target="_blank">PWA</a> 技术，即使断开网络仍然可以访问缓存的资源文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011522877?w=938&amp;h=626" src="https://static.alili.tech/img/remote/1460000011522877?w=938&amp;h=626" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">Redux 状态</h3>
<p><a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a> 是一个可预测的 JS 状态管理容器，结合 <a href="https://github.com/zalmoxisus/redux-devtools-extension" rel="nofollow noreferrer" target="_blank">Redux DevTools extension</a> 扩展可以很方便的进行应用状态穿梭，对辅助开发和debug大有裨益。不仅可以查看 redux 保存的状态，还可以随时回到到过去某个时刻的状态就像时间穿梭机一样，也看得到 redux 每次 action 的触发，以及每次触发造成的状态改动。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011522878?w=1350&amp;h=626" src="https://static.alili.tech/img/remote/1460000011522878?w=1350&amp;h=626" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">评论系统</h3>
<p>借助 github issue api，使用 github 账号登录之后以回复 issue 的方式留言。留言支持 markdown 格式，和 github issue 体验类似。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011522879?w=1083&amp;h=649" src="https://static.alili.tech/img/remote/1460000011522879?w=1083&amp;h=649" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">PWA</h3>
<p>在支持 <a href="https://zhuanlan.zhihu.com/p/25167289" rel="nofollow noreferrer" target="_blank">PWA</a> 技术的浏览器上（比如较新的 chrome）打开页面会自动询问你添加到屏幕，添加过程就像原生应用的安装一样。应用添加之后就可以像原生应用一样离线操作，也可以卸载应用。下图演示了 PWA 在 chrome 上面的添加过程，添加完成之后桌面会出现添加的应用，即便关闭所有网络仍然可以像原生应用一样正常操作。</p>
<p><span class="img-wrap"><img data-src="/img/bVWvIe?w=720&amp;h=1280" src="https://static.alili.tech/img/bVWvIe?w=720&amp;h=1280" alt="116af3f1e8dd2471ccf49211985fe467" title="116af3f1e8dd2471ccf49211985fe467" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">i18n</h3>
<p>应用支持多语言，且自动适配浏览器语言设置。目前检测到浏览器支持中文优先使用中文，否则默认使用英文显示。需要更多语言支持，编辑 <code>src/utils/i18n.js</code> 的  <code>data</code> 对象，添加对应语言文字即可。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011522880?w=2048&amp;h=1335" src="https://static.alili.tech/img/remote/1460000011522880?w=2048&amp;h=1335" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">react 最佳实践</h2>
<ul>
<li>一个文件一个组件。</li>
<li>尽量使用无状态（Stateless）组件，也就是如果只是写一个单纯展示的组件，不需要组件保存自己的状态，不需要生命周期方法或者 refs 来操作 DOM 的组件则优先使用无状态组件，采用函数的形式。以项目 Tips 组件示例:</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import React from &quot;react&quot;;
    import PropTypes from &quot;prop-types&quot;;
    import styles from &quot;./tips.scss&quot;;
    
    export default function Tips({ title, content }) {
      return (
        <div className={styles.tips}>
          <p className={styles.title}>{title}</p>
          <p className={styles.content}>{content}</p>
        </div>
      );
    }
    
    Tips.propTypes = {
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
    <span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">"prop-types"</span>;
    <span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">"./tips.scss"</span>;
    
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Tips</span>(<span class="hljs-params">{ title, content }</span>) </span>{
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.tips}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.title}</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.content}</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }
    
    Tips.propTypes = {
      <span class="hljs-attr">title</span>: PropTypes.string.isRequired,
      <span class="hljs-attr">content</span>: PropTypes.string.isRequired
    };</code></pre>
<ul><li>和上面相反，如果你需要组件生命周期方法优化组件性能（典型应用，重写 <code>shouldComponentUpdate</code> 方法），需要组件保存自己的状态，或者用 refs 操作 DOM，你就需要一个有状态组件，采用 es6 class 继承 React.Component 的写法。组件示例：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import React from &quot;react&quot;;
    import PropTypes from &quot;prop-types&quot;;
    import classnames from &quot;classnames&quot;;
    import styles from &quot;./cell.scss&quot;;
    import { isObjEqual } from &quot;../../utils/helpers&quot;;
    
    export default class Cell extends React.Component {
      static propTypes = {
        value: PropTypes.number.isRequired
      };
    
      shouldComponentUpdate(nextProps, nextState) {
        return (
          !isObjEqual(nextProps, this.props) || !isObjEqual(nextState, this.state)
        );
      }
    
      render() {
        const { props: { value } } = this;
    
        const color = `color-${value}`;
        return (
          <td>
            <div
              className={classnames([styles.cell, { [styles[color]]: !!value }])}
            >
              <div className={styles.number}>{value || null}</div>
            </div>
          </td>
        );
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
    <span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">"prop-types"</span>;
    <span class="hljs-keyword">import</span> classnames <span class="hljs-keyword">from</span> <span class="hljs-string">"classnames"</span>;
    <span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">"./cell.scss"</span>;
    <span class="hljs-keyword">import</span> { isObjEqual } <span class="hljs-keyword">from</span> <span class="hljs-string">"../../utils/helpers"</span>;
    
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cell</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">value</span>: PropTypes.number.isRequired
      };
    
      shouldComponentUpdate(nextProps, nextState) {
        <span class="hljs-keyword">return</span> (
          !isObjEqual(nextProps, <span class="hljs-keyword">this</span>.props) || !isObjEqual(nextState, <span class="hljs-keyword">this</span>.state)
        );
      }
    
      render() {
        <span class="hljs-keyword">const</span> { <span class="hljs-attr">props</span>: { value } } = <span class="hljs-keyword">this</span>;
    
        <span class="hljs-keyword">const</span> color = <span class="hljs-string">`color-<span class="hljs-subst">${value}</span>`</span>;
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
              <span class="hljs-attr">className</span>=<span class="hljs-string">{classnames([styles.cell,</span> { [<span class="hljs-attr">styles</span>[<span class="hljs-attr">color</span>]]<span class="hljs-attr">:</span> !!<span class="hljs-attr">value</span> }])}
            &gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.number}</span>&gt;</span>{value || null}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span>
        );
      }
    }</code></pre>
<ul><li>事件绑定 this 方法。在构造函数里面绑定一次 this 之后后面就可以正常使用。以 <a href="https://github.com/devrsi0n/React-2048-game/blob/e6812e8b89bb38109387e7f6495fcd5d70c11f26/src/containers/ControlPanel/index.js" rel="nofollow noreferrer" target="_blank">ControlPanel</a> 组件部分代码示例：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(...args) {
    super(...args);

    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSpeakerClick = this.handleSpeakerClick.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">constructor</span>(...args) {
    <span class="hljs-keyword">super</span>(...args);

    <span class="hljs-keyword">this</span>.handleMoveUp = <span class="hljs-keyword">this</span>.handleMoveUp.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleMoveDown = <span class="hljs-keyword">this</span>.handleMoveDown.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleMoveLeft = <span class="hljs-keyword">this</span>.handleMoveLeft.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleMoveRight = <span class="hljs-keyword">this</span>.handleMoveRight.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleKeyUp = <span class="hljs-keyword">this</span>.handleKeyUp.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleSpeakerClick = <span class="hljs-keyword">this</span>.handleSpeakerClick.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleUndo = <span class="hljs-keyword">this</span>.handleUndo.bind(<span class="hljs-keyword">this</span>);
  }</code></pre>
<ul><li>使用 <a href="https://reactjs.org/docs/typechecking-with-proptypes.html" rel="nofollow noreferrer" target="_blank">propTypes</a> 属性进行传入 prop 的校验。可以校验 prop 的类型和是否必需，非必需的 prop 还必需填写 defaultProps 默认值。以无状态组件 <a href="https://github.com/devrsi0n/React-2048-game/blob/e6812e8b89bb38109387e7f6495fcd5d70c11f26/src/components/Button/index.js" rel="nofollow noreferrer" target="_blank">Button</a> 的部分代码示例：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Button.propTypes = {
      children: PropTypes.oneOfType([PropTypes.node]),
      onClick: PropTypes.func,
      size: PropTypes.oneOf([&quot;lg&quot;, &quot;md&quot;, &quot;sm&quot;, &quot;xs&quot;]),
      type: PropTypes.oneOf([
        &quot;default&quot;,
        &quot;primary&quot;,
        &quot;warn&quot;,
        &quot;danger&quot;,
        &quot;success&quot;,
        &quot;royal&quot;
      ]).isRequired
    };
    
    Button.defaultProps = {
      children: &quot;&quot;,
      onClick() {},
      size: &quot;md&quot;,
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    Button.propTypes = {
      <span class="hljs-attr">children</span>: PropTypes.oneOfType([PropTypes.node]),
      <span class="hljs-attr">onClick</span>: PropTypes.func,
      <span class="hljs-attr">size</span>: PropTypes.oneOf([<span class="hljs-string">"lg"</span>, <span class="hljs-string">"md"</span>, <span class="hljs-string">"sm"</span>, <span class="hljs-string">"xs"</span>]),
      <span class="hljs-attr">type</span>: PropTypes.oneOf([
        <span class="hljs-string">"default"</span>,
        <span class="hljs-string">"primary"</span>,
        <span class="hljs-string">"warn"</span>,
        <span class="hljs-string">"danger"</span>,
        <span class="hljs-string">"success"</span>,
        <span class="hljs-string">"royal"</span>
      ]).isRequired
    };
    
    Button.defaultProps = {
      <span class="hljs-attr">children</span>: <span class="hljs-string">""</span>,
      onClick() {},
      <span class="hljs-attr">size</span>: <span class="hljs-string">"md"</span>,
    };</code></pre>
<ul>
<li>使用 <a href="http://huziketang.com/books/react/lesson28" rel="nofollow noreferrer" target="_blank">HOC(Higher-Order Components)</a> 代替 mixin。mixin 官方已经不推荐使用了，redux 的 connect 方法就是 HOC 的应用。</li>
<li>为了提高应用性能，避免不必要的视图重绘，在需要的组件使用 <code>shouldComponentUpdate</code> 方法；以组件 <a href="https://github.com/devrsi0n/React-2048-game/blob/e6812e8b89bb38109387e7f6495fcd5d70c11f26/src/components/Row/index.js" rel="nofollow noreferrer" target="_blank">Row</a> 示例：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 如果该行没有格子需要刷新也没有组件自己的状态刷新，
  // 则该组件不执行 render 方法，
  // 避免每次别的行数据刷新也跟着重新渲染。
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isObjEqual(nextProps, this.props) || !isObjEqual(nextState, this.state)
    );
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// 如果该行没有格子需要刷新也没有组件自己的状态刷新，</span>
  <span class="hljs-comment">// 则该组件不执行 render 方法，</span>
  <span class="hljs-comment">// 避免每次别的行数据刷新也跟着重新渲染。</span>
  shouldComponentUpdate(nextProps, nextState) {
    <span class="hljs-keyword">return</span> (
      !isObjEqual(nextProps, <span class="hljs-keyword">this</span>.props) || !isObjEqual(nextState, <span class="hljs-keyword">this</span>.state)
    );
  }</code></pre>
<h2 id="articleHeader11">项目结构</h2>
<p>本项目是基于 Facebook 官方出品的 <a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a> 脚手架搭建的，reject 后做了适当修改以适配项目需求。</p>
<h3 id="articleHeader12">调整如下</h3>
<ul>
<li>
<a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a> 添加 <a href="http://sass-lang.com/guide" rel="nofollow noreferrer" target="_blank">scss</a> 支持。之所以没有用 <a href="https://medium.com/@gajus/stop-using-css-in-javascript-for-web-development-fa32fb873dcc" rel="nofollow noreferrer" target="_blank">CssInJS</a> 的方案是因为这些方案普遍不完美，也考虑到要遵循样式和结构分离的原则，scss 是目前比较成熟的 css 预处理器，社区轮子也比较多，开发起来很方便。推荐学习 scss/sass <a href="http://www.sassshop.com/#/1/2" rel="nofollow noreferrer" target="_blank">教程</a>。添加 <code>sass-loader</code> 到 scss 规则下面最下面即可。<a href="https://github.com/devrsi0n/React-2048-game/blob/149d75e117c048a44704315a6122e0e28c256a97/config/webpack.config.dev.js#L190" rel="nofollow noreferrer" target="_blank">配置代码</a>
</li>
<li>开启 <a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">css module</a> 支持。在大型项目里面组件之间需要尽量解耦，但是 css 类名的全局特性很容易导致意料之外的错误。开启 css module 之后，所有的类名最终都会被一小段 hash 值填充，所以类名也就有一定的唯一性，不容易污染全局的代码。<a href="https://github.com/devrsi0n/React-2048-game/blob/149d75e117c048a44704315a6122e0e28c256a97/config/webpack.config.dev.js#L170" rel="nofollow noreferrer" target="_blank">配置代码</a>
</li>
<li>添加 <a href="https://github.com/stylelint/stylelint" rel="nofollow noreferrer" target="_blank">stylelint</a> 支持。js 代码已经有 <a href="https://github.com/eslint/eslint" rel="nofollow noreferrer" target="_blank">eslint</a> (但采用了更流行，校验更严格的 <a href="https://github.com/airbnb/javascript/" rel="nofollow noreferrer" target="_blank">airbnb</a> 规则) 来检查代码，但是样式代码也需要保持代码风格统一，同时校验规则一般有社区的最佳实践。<a href="https://github.com/devrsi0n/React-2048-game/blob/149d75e117c048a44704315a6122e0e28c256a97/config/webpack.config.dev.js#L251" rel="nofollow noreferrer" target="_blank">配置代码</a>
</li>
<li>添加静态资源 cdn 支持。由于项目部署在 <a href="https://pages.github.com/" rel="nofollow noreferrer" target="_blank">github page</a> 在国内访问速度不是很理想，所以在可能的情况下尽量减小 js 包的大小对页面加载速度至关重要。像 ReactDOM 这类较大的 npm 包从打包文件剥离出去采用 CDN 来加载，可显著减小打包文件的大小。（PS：之所以 CDN 加载比较快，是因为 CDN 提供商在全国各地都建立了缓存服务器，资源就近获取比自己从 github 获取快得多，而且一般 CDN 的带宽也比较充裕）把 React 和 ReactDOM 剥离出去只需要在 html 文件添加 CDN 的 [script 标签]()，同时在 webpack 添加 <a href="https://github.com/devrsi0n/React-2048-game/blob/e6812e8b89bb38109387e7f6495fcd5d70c11f26/config/webpack.config.prod.js#L77" rel="nofollow noreferrer" target="_blank">externals</a> 属性，该属性指定代码 <code>import</code> 该包时直接从全局变量获取。剥离后打包的 js 文件大小从 278kb 减小到 164 kb。</li>
<li>添加 webpack <a href="https://github.com/webpack-contrib/compression-webpack-plugin" rel="nofollow noreferrer" target="_blank">代码压缩</a>插件。默认的 webpack 配置直接输出原始的 js，css 代码，但添加压缩过后，文件显著减小（js 文件从 164kb 到 49kb），对于移动浏览器来说打开速度得到明显提升。<a href="https://github.com/devrsi0n/React-2048-game/blob/25099b82afe7b32d060b0957862e4d1d397fc539/config/webpack.config.prod.js#L329" rel="nofollow noreferrer" target="_blank">配置代码</a>
</li>
<li>添加 <a href="https://github.com/webpack-contrib/webpack-bundle-analyzer" rel="nofollow noreferrer" target="_blank">webpack-bundle-analyzer</a> 插件，通过各模块包所占打包文件后的比重来分析项目代码，借此优化代码。比如，React 和 ReactDOM 的剥离就是因为分析后发现这两个包所占比重较大。</li>
</ul>
<h3 id="articleHeader13">文件结构</h3>
<ul>
<li>
<p>src， 项目源代码大部分都在这里，主要是 react 组件 js 代码  和 scss 样式代码。次级目录包含了 <a href="https://github.com/facebook/jest" rel="nofollow noreferrer" target="_blank">jest</a> 单元测试代码，测试代码尽量和源代码挨着，以方便编写。</p>
<ul>
<li>assets，主要存放一些全局样式代码，icon svg 文件，游戏音效 mp3 文件，图片等等；</li>
<li>components，存放 <a href="http://huziketang.com/books/react/lesson43" rel="nofollow noreferrer" target="_blank">react dumb 组件</a>, 每个组件包含在采用首字母大写的目录的 <code>index.js</code> 里面，同时该目录包含该组件用到样式的 scss 文件，尽量一个目录包含该组件所需的所有代码避免污染其他代码，提高组件复用性。</li>
<li>containers，存放 <a href="http://huziketang.com/books/react/lesson43" rel="nofollow noreferrer" target="_blank">react smart 组件</a>，该目录结构和 <code>components</code> 类似，但因为是 smart 组件，所以这里的组件可以操作 redux 的数据，不用太考虑复用性。</li>
<li>reducers，这是 redux 包含的是无副作用的纯函数式计算状态操作的函数。</li>
<li>utils，包括评论组件初始化，i18n 多语言文件，移动浏览器滑动检测和注册 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API" rel="nofollow noreferrer" target="_blank">ServiceWorker</a> 等等。</li>
<li>index.js，项目入口文件，主要把 react 根组件 渲染到指定 DOM 节点，并且注册 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API" rel="nofollow noreferrer" target="_blank">ServiceWorker</a>。</li>
<li>store.js，redux store 初始化，同时 <code>store.subscribe</code> 订阅应用状态更新，序列化状态存到 <code>localStorage</code>。</li>
</ul>
</li>
<li>public，包括项目的 html 文件，网站 icon favicon 和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/Manifest" rel="nofollow noreferrer" target="_blank">PWA manifest</a> 文件。</li>
<li>config，主要包括 webpack 的各种配置文件。</li>
<li>scripts，npm 的启动脚本，启动开发模式，项目打包，运行 jest 单元测试等等。</li>
<li>build，项目打包后的输出目录。</li>
<li>screenshots，README 各种图片的原图，为了国内用户访问方便实际上 README 的图片来自新浪微博的图床。</li>
<li>
<a href="http://editorconfig.org/" rel="nofollow noreferrer" target="_blank">.editorconfig</a>，通用的编辑器配置，统一不同编辑器 / IDE 的代码格式。</li>
<li>.eslintignore，需要 eslint 忽略的文件或者目录，规则类似 .gitignore</li>
<li>.travis.yml, 持续集成脚本，每次提交代码到 github 之后，测试服务器都会自动运行该脚本执行测试用例，并输出代码覆盖率，最后自动部署到 <a href="https://pages.github.com/" rel="nofollow noreferrer" target="_blank">github page</a>。所有状态都在项目中 README 的徽章中可见。</li>
<li>package.json，项目基本信息和部分配置都存在这里。常见的内容包括项目的各类依赖包，各种启动脚本，项目 homepage 等等；为了减少根项目的文件数目，jest，babel，eslint，stylelint 的配置也写在这里。值得注意的是，项目中引入 <a href="https://github.com/typicode/husky" rel="nofollow noreferrer" target="_blank">husky</a>，在每次代码 commit 之前都会执行 <a href="https://github.com/okonet/lint-staged" rel="nofollow noreferrer" target="_blank">lint-staged</a>，以自动执行 <a href="https://github.com/prettier/prettier" rel="nofollow noreferrer" target="_blank">prettier</a> 来美化代码格式。每次代码推送 到 github 之前也会执行所有单元测试用例，全部通过才可以继续推送。</li>
<li>yarn.locl，<a>yarn</a> 首次安装依赖包之后生成的 lock 文件。通过 yarn 来安装依赖包时，yarn 自动把项目的依赖包（包括依赖包依赖的父级包）固定在指定的版本（包括依赖包安装的 url 和 hash 值），这样所有开发环境都使用 yarn 来管理项目，不同的机器不同的系统安装出来包都是一样的，这样就避免了之前 npm 的缺陷（版本要求太松或者父级包版本更新等等导致每次安装出来的依赖版本不一样）。</li>
</ul>
<h2 id="articleHeader14">技术栈</h2>
<ul>
<li>
<a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react</a>，组件式构建 UI</li>
<li>
<a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux</a>，管理应用状态</li>
<li>
<a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">babel</a>，把 es2017+ 语法转成 es5 兼容语法</li>
<li>
<a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a>，代码热加载，scss 样式文件处理，组件编译打包等等</li>
<li>
<a href="https://github.com/sass/sass" rel="nofollow noreferrer" target="_blank">scss</a>，成熟的 css 预处理器（之所以没有用 CssInJS 的方案是因为这些方案普遍不完美，也考虑到要遵循样式和结构分离的原则）</li>
<li>
<a href="https://github.com/eslint/eslint" rel="nofollow noreferrer" target="_blank">eslint</a>，使用流行的 airbnb 的代码规范严格约束代码风格</li>
<li>
<a href="https://github.com/stylelint/stylelint" rel="nofollow noreferrer" target="_blank">stylelint</a>，scss 代码风格检查</li>
<li>
<a href="https://github.com/facebook/jest" rel="nofollow noreferrer" target="_blank">jest</a>，fb 出品的代码测试框架，snapshot 功能对测试 react 组件 UI 十分方便</li>
<li>
<a href="https://github.com/prettier/prettier" rel="nofollow noreferrer" target="_blank">Prettier</a>，js 和 scss 代码格式美化工具</li>
<li>
<a href="https://zhuanlan.zhihu.com/p/25167289" rel="nofollow noreferrer" target="_blank">PWA</a>(Progressive Web Apps)，借助浏览器 service worker 能力，使 web 应用在移动平台有接近原生应用的能力，可离线使用，接收通知消息等等</li>
</ul>
<h2 id="articleHeader15">运行 &amp; 测试 &amp; 打包</h2>
<p>因为配置文件用了 es6+ 语法所以要求 node 的版本大于 6.10，同时建议使用 <a href="https://yarnpkg.com/zh-Hans" rel="nofollow noreferrer" target="_blank">yarn</a> 来管理依赖包。fork 项目之后可以按如下命令操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  npm i -g yarn # 安装 yarn
  git clone git@github.com:<你的名字>/React-2048-game.git
  cd React-2048-game
  yarn # 安装依赖包
  yarn start # 开启调试模式，启动后自动打开浏览器 http://localhost:3000 
  yarn test # 自动测试
  yarn build # 打包代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">  npm i -g yarn <span class="hljs-comment"># 安装 yarn</span>
  git <span class="hljs-built_in">clone</span> git@github.com:&lt;你的名字&gt;/React-2048-game.git
  <span class="hljs-built_in">cd</span> React-2048-game
  yarn <span class="hljs-comment"># 安装依赖包</span>
  yarn start <span class="hljs-comment"># 开启调试模式，启动后自动打开浏览器 http://localhost:3000 </span>
  yarn <span class="hljs-built_in">test</span> <span class="hljs-comment"># 自动测试</span>
  yarn build <span class="hljs-comment"># 打包代码</span></code></pre>
<h2 id="articleHeader16">踩坑记录</h2>
<ul>
<li>在调烟花动画的时候发现没效果，仔细对比了下 webpack 编译后的 css 文件发现所有的 @keyframes 的名字都加了 hash 值（也就是当成普通的局部 css 类名），解决办法就是在 @keyframes 的名字前面和整个 scss 文件添加伪类 :global，可以参考烟花的 scss 文件，这不是完美的解决办法(css 类名不再有局部特性)，后续再深挖一下。</li>
<li>css module 用到的 :global 这个不是标准的伪类，所以 stylelint 需要添加配置以忽略这个错误。参见 <code>package.json</code> 的 <code>stylelint.rules</code>。</li>
</ul>
<h2 id="articleHeader17">
<a href="https://github.com/devrsi0n/React-2048-game" rel="nofollow noreferrer" target="_blank">项目地址</a>，喜欢的话 github 点个 star 支持下吧?</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 react, redux 最佳实践构建的 2048

## 原文链接
[https://segmentfault.com/a/1190000011522870](https://segmentfault.com/a/1190000011522870)

