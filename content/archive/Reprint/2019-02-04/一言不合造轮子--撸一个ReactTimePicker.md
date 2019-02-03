---
title: '一言不合造轮子--撸一个ReactTimePicker' 
date: 2019-02-04 2:30:57
hidden: true
slug: 5jj87x62wfr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>本文的源码全部位于github项目仓库<a href="https://github.com/ecmadao/react-times" rel="nofollow noreferrer" target="_blank"><code>react-times</code></a>，如果有差异请以github为准。最终线上DEMO可见<a href="https://ecmadao.github.io/react-times/" rel="nofollow noreferrer" target="_blank">react-times github page</a></p>
<p>文章记录了一次创建独立React组件并做成NPM包的过程，将会涉及到React开发、单页测试、Webpack等内容。</p>
</blockquote>
<p>先看下最终的效果~</p>
<p><span class="img-wrap"><img data-src="/img/bVC2K6?w=480&amp;h=407" src="https://static.alili.tech/img/bVC2K6?w=480&amp;h=407" alt="react-times" title="react-times" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">起因</h3>
<p>因为我司的业务需求，需要有一个日期和时间的选择器。最开始我们使用的是<a href="http://amsul.ca/pickadate.js/" rel="nofollow noreferrer" target="_blank"><code>pickadate</code></a>，一个基于jQuery的比较老牌的时间日期选择器。在页面上大致长这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVC2Ln?w=696&amp;h=132" src="https://static.alili.tech/img/bVC2Ln?w=696&amp;h=132" alt="pickadata" title="pickadata" style="cursor: pointer; display: inline;"></span></p>
<p>这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVC2Lu?w=700&amp;h=634" src="https://static.alili.tech/img/bVC2Lu?w=700&amp;h=634" alt="pickadata" title="pickadata" style="cursor: pointer; display: inline;"></span></p>
<p>还有这样：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006883183?w=660&amp;h=736" src="https://static.alili.tech/img/remote/1460000006883183?w=660&amp;h=736" alt="pickadata" title="pickadata" style="cursor: pointer;"></span></p>
<p>大体上看着还OK吧？但是后来随着我们业务的增长和代码重构，前端webpack成为标配，同时越来越多的页面使用React进行重构，pickadata经常出现一些莫名的bug，再加上它本身的API不够<code>React Style</code> --- 在和React中使用的时候，pickadate组件的初始化还不得不按照老式的jQuery组件那样，调用API，在DOM里插入pickadate。而且，为了获取date/time变动时的值，往往需要通过jQuery选择器来拿到value，因而pickadate组件选择器的初始化和一些事件都较多的依赖于React Component的生命周期。这。。用久了就感觉越来越蛋疼了。</p>
<p>后来又一次偶尔发现了Airbnb（业界良心）开源的React组件--<a href="https://github.com/airbnb/react-dates" rel="nofollow noreferrer" target="_blank"><code>react-dates</code></a>。</p>
<p><code>react-dates</code>是一个基于<code>moment</code>和<code>React</code>的日期选择器，其插件本身就是一个ReactComponent，有NPM，有足够的测试，有良好的API。于是当即下定决心要趁此干掉pickadate。可真正用到项目中才发现它居然不支持时间选择！！！（或许因为Airbnb本身的业务就是更看重日期的？）因此才有了自己撸一个的想法。</p>
<h3 id="articleHeader1">设计与架构</h3>
<h4>UI设计</h4>
<p>UI方面没得说，我是妥妥的<code>Material Design</code>党。这次也是着急动手撸代码，所以直接就参考Android6.0+系统上闹钟里的时间选择好了，之后再完善并增加UI主题：</p>
<p><span class="img-wrap"><img data-src="/img/bVC2L1?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVC2L1?w=1080&amp;h=1920" alt="UI" title="UI" style="cursor: pointer;"></span></p>
<p>目标差不多就长这个样子，再增加一个选择时间的按钮和黑白配色的选择。</p>
<h4>需求整理</h4>
<p>搭配我们的“UI稿”和线框稿一起食用：</p>
<p><span class="img-wrap"><img data-src="/img/bVC2L4?w=552&amp;h=770" src="https://static.alili.tech/img/bVC2L4?w=552&amp;h=770" alt="线框稿" title="线框稿" style="cursor: pointer;"></span></p>
<p>可以看到，除去上方选择时间并展示的按钮之外，我们把真正的时间表盘放在了下面的modal里。而modal表盘里的设计，则会模仿上图的Android时间选择器，是一个MD风格的拟时钟样式的选择器。初步整理出一些需求：</p>
<ul>
<li><p>点击按钮弹出表盘modal，再点击其他区域关闭modal</p></li>
<li><p>表盘modal里有一个圆形的时间选择器，时间的数字围绕圆形环绕</p></li>
<li><p>表盘里有一个指针，可以以表盘为中心旋转</p></li>
<li><p>点击代表时间的数字，应该改变外层按钮里对应的小时/分钟，同时指针改变旋转角度，指向点击的时间</p></li>
<li><p>拖拽指针，可以环绕中心旋转。当放开指针时，它应该自动指向距离最近的小时或者分钟</p></li>
<li><p>拖拽指针并松开，指针停止之后，当前选择的时间和外层按钮上显示的时间应该被改变</p></li>
<li><p>拖拽指针到两个整数数字之间并放开时，指针应该自动旋转到距离最近的时间上</p></li>
</ul>
<h4>代码设计</h4>
<p>有了上面的初步需求整理，我们就可以来构思组件的代码设计了。既然是个React组件，那么就应该按照逻辑和UI，把整体尽可能的拆分成足够小的模块。</p>
<p>有几点代码层面的架构需要考虑：</p>
<ul>
<li><p>考虑到“点击按钮弹出表盘modal，再点击其他区域关闭modal”这个需求，或许我们应该在分离出一个<code>OutsideClickHandler</code>，专门用来处理用户点击了表盘以外其他区域时的modal关闭事件。</p></li>
<li><p>Android时间选择的表盘其实有两个，一个是小时的选择，另一个则是分钟的选择。用户可以点击modal里圆形表盘上的小时/分钟，来切换不同的表盘。那么这意味着或许会有大量的代码可供我们复用。</p></li>
</ul>
<p>那么就先按照这个思路进行拆分：</p>
<ul><li>
<p><code>TimePicker</code></p>
<ul>
<li><p>按钮</p></li>
<li><p>处理外层点击事件的组件（<code>OutsideClickHandler</code>）</p></li>
<li>
<p>表盘modal</p>
<ul>
<li><p>modal + 表盘（<code>TimePickerModal</code>）</p></li>
<li><p>环绕的数字（<code>PickerPoint</code>）</p></li>
<li><p>指针（<code>PickerDargHandler</code>）</p></li>
</ul>
</li>
</ul>
</li></ul>
<p>在这样的结构下，<code>TimePicker.jsx</code>文件将是我们最后<code>export</code>出去的组件。在<code>TimePicker,jsx</code>中，包含了按钮组件和Modal组件。而Modal组件的各个组成部分被拆分成粒度更小的组件，以便组合和复用。</p>
<p>这样有哪些好处呢？举个栗子：</p>
<ul><li><p>我们在做组件的时候，先做了小时的选择，然后做分钟的选择。但两个picker的UI不同点主要集中在数字在表盘的布局上，以及一些选择的代码逻辑。这样的话我们就可以保持大体框架不变，只改变表盘中心渲染的数字布局即可。</p></li></ul>
<p>假设下图是小时选择器：（请原谅我可怜的绘图）</p>
<p><span class="img-wrap"><img data-src="/img/bVC2L6?w=530&amp;h=728" src="https://static.alili.tech/img/bVC2L6?w=530&amp;h=728" alt="小时选择器" title="小时选择器" style="cursor: pointer;"></span></p>
<p>假设下图是分钟选择器：（请原谅我可怜的绘图）</p>
<p><span class="img-wrap"><img data-src="/img/bVC2Md?w=534&amp;h=726" src="https://static.alili.tech/img/bVC2Md?w=534&amp;h=726" alt="分钟选择器" title="分钟选择器" style="cursor: pointer;"></span></p>
<ul><li><p>而我们按照这样的架构撸完代码之后，如果想额外做一些其他的东西，比如支持12小时制，那么小时和分钟的选择则应该集中在一个表盘modal上（也就是长得和正常是时钟一样）。在这样的需求下，我们需要在一个表盘里同时渲染小时和分钟的数字布局，而其他的东西，比如说modal啊，指针啊依旧保持原样（一样的指针组件，只不过渲染了两个）。</p></li></ul>
<p>下图是24小时制，点击modal上的小时/分钟来切换不同表盘：</p>
<p><span class="img-wrap"><img data-src="/img/bVC2Mf?w=644&amp;h=912" src="https://static.alili.tech/img/bVC2Mf?w=644&amp;h=912" alt="24小时制" title="24小时制" style="cursor: pointer;"></span></p>
<p>下图是12小时制，在同一个表盘上显示小时和分钟：</p>
<p><span class="img-wrap"><img data-src="/img/bVC2Mg?w=670&amp;h=928" src="https://static.alili.tech/img/bVC2Mg?w=670&amp;h=928" alt="12小时制" title="12小时制" style="cursor: pointer;"></span></p>
<h4>文件结构</h4>
<p>So, 目前这样的结构设计应该可以满足我们的简单的需求。接下来就开始卷起袖子撸代码喽。</p>
<p>新建项目，文件结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# react-times
- src/
    - components/
        TimePicker.jsx
        OutsideClickHandler.jsx
        TimePickerModal.jsx
        PickerPoint.jsx
        PickerDargHandler.jsx
    - utils.js
    - ConstValue.js
+ css/
+ test/
+ lib/
index.js
package.json
webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># react-times</span>
- src/
    - components/
        TimePicker.jsx
        OutsideClickHandler.jsx
        TimePickerModal.jsx
        PickerPoint.jsx
        PickerDargHandler.jsx
    - utils.js
    - ConstValue.js
+ css/
+ <span class="hljs-built_in">test</span>/
+ lib/
index.js
package.json
webpack.config.js</code></pre>
<p>其中，<code>src</code>文件夹下是我们的源码，而<code>lib</code>则是编译过后的代码。而<code>index.js</code>则是整个包最终的出口，我们在这里将做好的组件暴露出去：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var TimePicker = require('./lib/components/TimePicker').default;

module.exports = TimePicker;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> TimePicker = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./lib/components/TimePicker'</span>).default;

<span class="hljs-built_in">module</span>.exports = TimePicker;</code></pre>
<h3 id="articleHeader2">环境搭建</h3>
<p>既然是写一个独立的React组件，那它的开发则和我们项目的开发相互独立。</p>
<p>那么问题来了：该如何搭建开发和测试环境呢？这个组件我想使用<code>React</code>和<code>ES6</code>的语法，而单元测试则使用<code>mocha</code>+<code>chai</code>和Airbnb的<code>enzyme</code>（再次感谢业界良心）。那么在发布之前，应该使用构建工具将其初步打包，针对于这点我选用了<code>webpack</code>。</p>
<p>而在开发过程中，需要能够启动一个server，以便能在网页上渲染出组件，进行调试。因此，可以使用<a href="https://github.com/kadirahq/react-storybook" rel="nofollow noreferrer" target="_blank"><code>react-storybook</code></a>这个库，它允许我们启动一个server，把自己的组件渲染在页面上，并支持webpack进行编译。具体的使用大家可以去看<a href="https://getstorybook.io/" rel="nofollow noreferrer" target="_blank">storybook文档</a>，非常简单易懂，便于配置。</p>
<p>那么进入正题，组件的编写。</p>
<h3 id="articleHeader3">组件编写</h3>
<h4><code>TimePicker</code></h4>
<p>对于传入组件的<code>props</code>：</p>
<ul>
<li><p><code>defaultTime</code>：默认初始化时间。默认为当前时间</p></li>
<li><p><code>focused</code>：初始化时modal是否打开。默认为<code>false</code></p></li>
<li><p><code>onFocusChange</code>：modal开/关状态变化时的回调</p></li>
<li><p><code>onHourChange</code>：选择的小时变化时的回调，以小时作为参数</p></li>
<li><p><code>onMinuteChange</code>：选择的分钟变化时的回调，以分钟作为参数</p></li>
<li><p><code>onTimeChange</code>：任意时间变化时的回调，以<code>hour:minute</code>作为参数，参数类型是String</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/TimePicker.jsx
// 省略了一些方法的具体内容和组件属性的传递
import React, {PropTypes} from 'react';
import moment from 'moment';

import OutsideClickHandler from './OutsideClickHandler';
import TimePickerModal from './TimePickerModal';

// 组件开发要养成良好的习惯：检查传入的属性，并设定默认属性值
const propTypes = {
  defaultTime: PropTypes.string,
  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onHourChange: PropTypes.func,
  onMinuteChange: PropTypes.func,
  onTimeChange: PropTypes.func
};

const defaultProps = {
  defaultTime: moment().format(&quot;HH:mm&quot;),
  focused: false,
  onFocusChange: () => {},
  onHourChange: () => {},
  onMinuteChange: () => {},
  onTimeChange: () => {}
};

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    let {defaultTime, focused} = props;
    let [hour, minute] = initialTime(defaultTime);
    this.state = {
      hour,
      minute,
      focused
    }
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
  }

  // 改变state，并触发onFocusChange callback
  onFocus() {}
  onClearFocus() {}
  handleHourChange() {}
  handleMinuteChange() {}

  renderTimePickerModal() {
    let {hour, minute, focused} = this.state;
    // 给组件传入小时/分钟，以及handleHourChange,handleMinuteChange
    return (
      <TimePickerModal />
    )
  }

  render() {
    let {hour, minute, focused} = this.state;
    let times = `${hour} : ${minute}`;
    return (
      <div className=&quot;time_picker_container&quot;>
        <div onClick={this.onFocus} className=&quot;time_picker_preview&quot;>
          <div className={previewContainerClass}>
            {times}
          </div>
        </div>
        {/*OutsideClickHandler 就是上面说到了，专门用于处理modal外点击事件，来关闭modal的组件*/}
        <OutsideClickHandler onOutsideClick={this.onClearFocus}>
          {this.renderTimePickerModal()}
        </OutsideClickHandler>
      </div>
    )
  }
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/components/TimePicker.jsx</span>
<span class="hljs-comment">// 省略了一些方法的具体内容和组件属性的传递</span>
<span class="hljs-keyword">import</span> React, {PropTypes} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> moment <span class="hljs-keyword">from</span> <span class="hljs-string">'moment'</span>;

<span class="hljs-keyword">import</span> OutsideClickHandler <span class="hljs-keyword">from</span> <span class="hljs-string">'./OutsideClickHandler'</span>;
<span class="hljs-keyword">import</span> TimePickerModal <span class="hljs-keyword">from</span> <span class="hljs-string">'./TimePickerModal'</span>;

<span class="hljs-comment">// 组件开发要养成良好的习惯：检查传入的属性，并设定默认属性值</span>
<span class="hljs-keyword">const</span> propTypes = {
  <span class="hljs-attr">defaultTime</span>: PropTypes.string,
  <span class="hljs-attr">focused</span>: PropTypes.bool,
  <span class="hljs-attr">onFocusChange</span>: PropTypes.func,
  <span class="hljs-attr">onHourChange</span>: PropTypes.func,
  <span class="hljs-attr">onMinuteChange</span>: PropTypes.func,
  <span class="hljs-attr">onTimeChange</span>: PropTypes.func
};

<span class="hljs-keyword">const</span> defaultProps = {
  <span class="hljs-attr">defaultTime</span>: moment().format(<span class="hljs-string">"HH:mm"</span>),
  <span class="hljs-attr">focused</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">onFocusChange</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {},
  <span class="hljs-attr">onHourChange</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {},
  <span class="hljs-attr">onMinuteChange</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {},
  <span class="hljs-attr">onTimeChange</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TimePicker</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">let</span> {defaultTime, focused} = props;
    <span class="hljs-keyword">let</span> [hour, minute] = initialTime(defaultTime);
    <span class="hljs-keyword">this</span>.state = {
      hour,
      minute,
      focused
    }
    <span class="hljs-keyword">this</span>.onFocus = <span class="hljs-keyword">this</span>.onFocus.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.onClearFocus = <span class="hljs-keyword">this</span>.onClearFocus.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleHourChange = <span class="hljs-keyword">this</span>.handleHourChange.bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.handleMinuteChange = <span class="hljs-keyword">this</span>.handleMinuteChange.bind(<span class="hljs-keyword">this</span>);
  }

  <span class="hljs-comment">// 改变state，并触发onFocusChange callback</span>
  onFocus() {}
  onClearFocus() {}
  handleHourChange() {}
  handleMinuteChange() {}

  renderTimePickerModal() {
    <span class="hljs-keyword">let</span> {hour, minute, focused} = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-comment">// 给组件传入小时/分钟，以及handleHourChange,handleMinuteChange</span>
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">TimePickerModal</span> /&gt;</span>
    )
  }

  render() {
    let {hour, minute, focused} = this.state;
    let times = `${hour} : ${minute}`;
    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"time_picker_container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onFocus}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"time_picker_preview"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{previewContainerClass}</span>&gt;</span>
            {times}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        {/*OutsideClickHandler 就是上面说到了，专门用于处理modal外点击事件，来关闭modal的组件*/}
        <span class="hljs-tag">&lt;<span class="hljs-name">OutsideClickHandler</span> <span class="hljs-attr">onOutsideClick</span>=<span class="hljs-string">{this.onClearFocus}</span>&gt;</span>
          {this.renderTimePickerModal()}
        <span class="hljs-tag">&lt;/<span class="hljs-name">OutsideClickHandler</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;</span></code></pre>
<p>可以看到，<code>OutsideClickHandler</code>包裹着<code>TimePickerModal</code>，而在<code>OutsideClickHandler</code>中，我们进行modal外点击事件的处理，关闭modal</p>
<h4><code>OutsideClickHandler</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/OutsideClickHandler.jsx

// ...

const propTypes = {
  children: PropTypes.node,
  onOutsideClick: PropTypes.func,
};

const defaultProps = {
  children: <span />,
  onOutsideClick: () => {},
};

export default class OutsideClickHandler extends React.Component {
  constructor(props) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    // 组件didMount之后，直接在document上绑定点击事件监听
    if (document.addEventListener) {
      document.addEventListener('click', this.onOutsideClick, true);
    } else {
      document.attachEvent('onclick', this.onOutsideClick);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('click', this.onOutsideClick, true);
    } else {
      document.detachEvent('onclick', this.onOutsideClick);
    }
  }

  onOutsideClick(e) {
    // 如果点击区域不在该组件内部，则调用关闭modal的方法
    // 通过ReactDOM.findDOMNode来拿到原生的DOM，避免额外的jQuery依赖
    const isDescendantOfRoot = ReactDOM.findDOMNode(this.childNode).contains(e.target);
    if (!isDescendantOfRoot) {
      let {onOutsideClick} = this.props;
      onOutsideClick &amp;&amp; onOutsideClick(e);
    }
  }

  render() {
    return (
      <div ref={(c) => this.childNode = c}>
        {this.props.children}
      </div>
    )
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/components/OutsideClickHandler.jsx</span>

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">const</span> propTypes = {
  <span class="hljs-attr">children</span>: PropTypes.node,
  <span class="hljs-attr">onOutsideClick</span>: PropTypes.func,
};

<span class="hljs-keyword">const</span> defaultProps = {
  <span class="hljs-attr">children</span>: <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> /&gt;</span>,
  onOutsideClick: () =&gt; {},
};

export default class OutsideClickHandler extends React.Component {
  constructor(props) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    // 组件didMount之后，直接在document上绑定点击事件监听
    if (document.addEventListener) {
      document.addEventListener('click', this.onOutsideClick, true);
    } else {
      document.attachEvent('onclick', this.onOutsideClick);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('click', this.onOutsideClick, true);
    } else {
      document.detachEvent('onclick', this.onOutsideClick);
    }
  }

  onOutsideClick(e) {
    // 如果点击区域不在该组件内部，则调用关闭modal的方法
    // 通过ReactDOM.findDOMNode来拿到原生的DOM，避免额外的jQuery依赖
    const isDescendantOfRoot = ReactDOM.findDOMNode(this.childNode).contains(e.target);
    if (!isDescendantOfRoot) {
      let {onOutsideClick} = this.props;
      onOutsideClick &amp;&amp; onOutsideClick(e);
    }
  }

  render() {
    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{(c)</span> =&gt;</span> this.childNode = c}&gt;
        {this.props.children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;</span></code></pre>
<h4><code>TimePickerModal</code></h4>
<p>而<code>TimePickerModal</code>主要用来渲染<code>PickerDargHandler</code>和<code>PickerPoint</code>组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/TimePickerModal.jsx
// ...
// 为了简便我们在文章中忽略引入的React和一些参数类型检查

class TimePickerModal extends React.Component {
  constructor(props) {
    super(props);
    /*
    - 获取初始化时的旋转角度
    - 以step 0代表hour的选择，1代表minute的选择
    */
    let pointerRotate = this.resetHourDegree();
    this.state = {
      step: 0,
      pointerRotate
    }
  }

  handleStepChange(step) {}

  handleTimePointerClick(time, pointerRotate) {
    /*
    - 当表盘上某一个数字被点击时
    - 或者拖拽完指针并放下时，所调用的回调
    - 参数是该数字或指针所代表的时间和旋转角度
    */
  }

  // 在切换step的时候，根据当前的hour/minute来重新改变旋转角度
  resetHourDegree() {}
  resetMinuteDegree() {}

  /*
  + 两个方法会return PickerPoint组件
  + 之所以分两个是因为小时/分钟表盘在UI上有较多不同，因而传入的props需要不同的计算
  + 但在PickerPoint组件内部的逻辑是一样的
  */
  renderMinutePointes() {}
  renderHourPointes() {}

  render() {
    let {step, pointerRotate} = this.state;
    return (
      <div className=&quot;time_picker_modal_container&quot;>
        <div className=&quot;time_picker_modal_header&quot;>
          <span onClick={this.handleStepChange.bind(this, 0)}>
            {hour}
          </span>
          &amp;nbsp;:&amp;nbsp;
          <span onClick={this.handleStepChange.bind(this, 1)}>
            {minute}
          </span>
        </div>
        <div className=&quot;picker_container&quot;>
          {step === 0 ? this.renderHourPointes() : this.renderMinutePointes()}
          <PickerDargHandler
              pointerRotate={pointerRotate}
              time={step === 0 ? parseInt(hour) : parseInt(minute)}
              handleTimePointerClick={this.handleTimePointerClick} />
        </div>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/components/TimePickerModal.jsx</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-comment">// 为了简便我们在文章中忽略引入的React和一些参数类型检查</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TimePickerModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-comment">/*
    - 获取初始化时的旋转角度
    - 以step 0代表hour的选择，1代表minute的选择
    */</span>
    <span class="hljs-keyword">let</span> pointerRotate = <span class="hljs-keyword">this</span>.resetHourDegree();
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">step</span>: <span class="hljs-number">0</span>,
      pointerRotate
    }
  }

  handleStepChange(step) {}

  handleTimePointerClick(time, pointerRotate) {
    <span class="hljs-comment">/*
    - 当表盘上某一个数字被点击时
    - 或者拖拽完指针并放下时，所调用的回调
    - 参数是该数字或指针所代表的时间和旋转角度
    */</span>
  }

  <span class="hljs-comment">// 在切换step的时候，根据当前的hour/minute来重新改变旋转角度</span>
  resetHourDegree() {}
  resetMinuteDegree() {}

  <span class="hljs-comment">/*
  + 两个方法会return PickerPoint组件
  + 之所以分两个是因为小时/分钟表盘在UI上有较多不同，因而传入的props需要不同的计算
  + 但在PickerPoint组件内部的逻辑是一样的
  */</span>
  renderMinutePointes() {}
  renderHourPointes() {}

  render() {
    <span class="hljs-keyword">let</span> {step, pointerRotate} = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"time_picker_modal_container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"time_picker_modal_header"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleStepChange.bind(this,</span> <span class="hljs-attr">0</span>)}&gt;</span>
            {hour}
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          &amp;nbsp;:&amp;nbsp;
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleStepChange.bind(this,</span> <span class="hljs-attr">1</span>)}&gt;</span>
            {minute}
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"picker_container"</span>&gt;</span>
          {step === 0 ? this.renderHourPointes() : this.renderMinutePointes()}
          <span class="hljs-tag">&lt;<span class="hljs-name">PickerDargHandler</span>
              <span class="hljs-attr">pointerRotate</span>=<span class="hljs-string">{pointerRotate}</span>
              <span class="hljs-attr">time</span>=<span class="hljs-string">{step</span> === <span class="hljs-string">0</span> ? <span class="hljs-attr">parseInt</span>(<span class="hljs-attr">hour</span>) <span class="hljs-attr">:</span> <span class="hljs-attr">parseInt</span>(<span class="hljs-attr">minute</span>)}
              <span class="hljs-attr">handleTimePointerClick</span>=<span class="hljs-string">{this.handleTimePointerClick}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}</span></code></pre>
<p>上面这样，就基本完成了<code>TimePickerModal</code>组件的编写。但还不够好。为什么呢？</p>
<p>按照我们的逻辑，这个时间选择器应该根据<code>step</code>来切换表盘上表示小时/分钟的数字。也就是说，第一步选择小时，第二部选择分钟 -- 它是一个24小时制的时间选择器。那么，如果是要变成12小时制呢？让小时和分钟在同一个表盘上渲染，而<code>step</code>只改变AM/PM呢？</p>
<p>那么考虑12小时制的情况：</p>
<ul>
<li><p>一个表盘上要同时有小时和分钟两种数字</p></li>
<li><p>一个表盘上要有小时和分钟的两个指针</p></li>
<li><p>切换<code>step</code>改变的是AM/PM</p></li>
</ul>
<p>鉴于我们不应该在<code>TimePickerModal</code>中放入太多的逻辑判断，那么还是针对12小时制专门创建一个组件<code>TwelveHoursModal</code>比较好，但也会提取出<code>TimePickerModal</code>组件中可以独立的方法，作为专门渲染PickerPoint的中间层，<code>PickerPointGenerator.jsx</code>。</p>
<h4><code>PickerPointGenerator</code></h4>
<p><code>PickerPointGenerator</code>其实算是一个中间层组件。在它内部会进行一些逻辑判断，最终渲染出我们想要的表盘数字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/PickerPointGenerator.jsx
// ...
import {
  MINUTES,
  HOURS,
  TWELVE_HOURS
} from '../ConstValue.js';
import PickerPoint from './PickerPoint';

const pickerPointGenerator = (type = 'hour', mode = 24) => {
  return class PickerPointGenerator extends React.Component {
    constructor(props) {
      super(props);
      this.handleTimePointerClick = props.handleTimePointerClick.bind(this);
    }
    // 返回PickerPoint
    renderMinutePointes() {}
    renderHourPointes() {}

    render() {
      return (
        <div
          ref={ref => this.pickerPointerContainer = ref}
          id=&quot;picker_pointer_container&quot;>
          {type === 'hour' ? this.renderHourPointes() : this.renderMinutePointes()}
        </div>
      )
    }
  }
};

export default pickerPointGenerator;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/components/PickerPointGenerator.jsx</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> {
  MINUTES,
  HOURS,
  TWELVE_HOURS
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../ConstValue.js'</span>;
<span class="hljs-keyword">import</span> PickerPoint <span class="hljs-keyword">from</span> <span class="hljs-string">'./PickerPoint'</span>;

<span class="hljs-keyword">const</span> pickerPointGenerator = <span class="hljs-function">(<span class="hljs-params">type = <span class="hljs-string">'hour'</span>, mode = <span class="hljs-number">24</span></span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PickerPointGenerator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.handleTimePointerClick = props.handleTimePointerClick.bind(<span class="hljs-keyword">this</span>);
    }
    <span class="hljs-comment">// 返回PickerPoint</span>
    renderMinutePointes() {}
    renderHourPointes() {}

    render() {
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref</span> =&gt;</span> this.pickerPointerContainer = ref}
          id="picker_pointer_container"&gt;
          {type === 'hour' ? this.renderHourPointes() : this.renderMinutePointes()}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      )
    }
  }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> pickerPointGenerator;</code></pre>
<p>有了它之后，我们之前的<code>TimePickerModal</code>可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/TimePickerModal.jsx
// ...
class TimePickerModal extends React.Component {
  render() {
    const {step} = this.state;
    const type = step === 0 ? 'hour' : 'minute';
    const PickerPointGenerator = pickerPointGenerator(type);

    return (
      ...
      <PickerPointGenerator
        handleTimePointerClick={this.handleTimePointerClick}
      />
      ...
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/components/TimePickerModal.jsx</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TimePickerModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> {step} = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">const</span> type = step === <span class="hljs-number">0</span> ? <span class="hljs-string">'hour'</span> : <span class="hljs-string">'minute'</span>;
    <span class="hljs-keyword">const</span> PickerPointGenerator = pickerPointGenerator(type);

    <span class="hljs-keyword">return</span> (
      ...
      &lt;PickerPointGenerator
        handleTimePointerClick={<span class="hljs-keyword">this</span>.handleTimePointerClick}
      /&gt;
      ...
    )
  }
}</code></pre>
<p>而如果是12小时制呢：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/TwelveHoursModal.jsx
// ...
class TwelveHoursModal extends React.Component {
  render() {
    const HourPickerPointGenerator = pickerPointGenerator('hour', 12);
    const MinutePickerPointGenerator = pickerPointGenerator('minute', 12);
    return (
      ...
      <HourPickerPointGenerator
        handleTimePointerClick={this.handleHourPointerClick}
      />
      <MinutePickerPointGenerator
        handleTimePointerClick={this.handleMinutePointerClick}
      />
      ...
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/components/TwelveHoursModal.jsx</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TwelveHoursModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">const</span> HourPickerPointGenerator = pickerPointGenerator(<span class="hljs-string">'hour'</span>, <span class="hljs-number">12</span>);
    <span class="hljs-keyword">const</span> MinutePickerPointGenerator = pickerPointGenerator(<span class="hljs-string">'minute'</span>, <span class="hljs-number">12</span>);
    <span class="hljs-keyword">return</span> (
      ...
      &lt;HourPickerPointGenerator
        handleTimePointerClick={<span class="hljs-keyword">this</span>.handleHourPointerClick}
      /&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MinutePickerPointGenerator</span>
        <span class="hljs-attr">handleTimePointerClick</span>=<span class="hljs-string">{this.handleMinutePointerClick}</span>
      /&gt;</span>
      ...
    )
  }
}</span></code></pre>
<h4><code>PickerPoint</code></h4>
<p><code>PickerPoint</code>内的逻辑很简单，就是渲染数字，并处理点击事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/PickerPoint.jsx
// ...

const propTypes = {
  index: PropTypes.number,
  angle: PropTypes.number,
  handleTimeChange: PropTypes.func
};

class PickerPoint extends React.Component {
  render() {
    let {index, handleTimeChange, angle} = this.props;
    let inlineStyle = getInlineRotateStyle(angle);
    let wrapperStyle = getRotateStyle(-angle);

    return (
      <div
        style={inlineStyle}
        onClick={() => {
          handleTimeChange(index, angle)
        "}}"
        onMouseDown={disableMouseDown}>
        <div className=&quot;point_wrapper&quot; style={wrapperStyle}>
          {index}
        </div>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/components/PickerPoint.jsx</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">const</span> propTypes = {
  <span class="hljs-attr">index</span>: PropTypes.number,
  <span class="hljs-attr">angle</span>: PropTypes.number,
  <span class="hljs-attr">handleTimeChange</span>: PropTypes.func
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PickerPoint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">let</span> {index, handleTimeChange, angle} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">let</span> inlineStyle = getInlineRotateStyle(angle);
    <span class="hljs-keyword">let</span> wrapperStyle = getRotateStyle(-angle);

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{inlineStyle}</span>
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
          handleTimeChange(index, angle)
        "}}"
        onMouseDown={disableMouseDown}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"point_wrapper"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{wrapperStyle}</span>&gt;</span>
          {index}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre>
<h4><code>PickerDargHandler</code></h4>
<p>在<code>PickerDargHandler</code>组件里，我们主要处理指针的拖拽事件，并将处理好的结果通过callback向上传递。</p>
<p>在这个组件里，它拥有自己的state：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.state = {
  pointerRotate: this.props.pointerRotate,
  draging: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.state = {
  <span class="hljs-attr">pointerRotate</span>: <span class="hljs-keyword">this</span>.props.pointerRotate,
  <span class="hljs-attr">draging</span>: <span class="hljs-literal">false</span>
}</code></pre>
<p>其中，<code>pointerRotate</code>是从父层传入，用来给组件初始化时定位指针的位置。而<code>draging</code>则用于处理拖拽事件，标记着当前是否处于被拖拽状态。</p>
<p>对于拖拽事件的处理，大致思路如下：</p>
<p>先写一个获取坐标位置的util：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const mousePosition = (e) => {
  let xPos, yPos;
  e = e || window.event;
  if (e.pageX) {
    xPos = e.pageX;
    yPos = e.pageY;
  } else {
    xPos = e.clientX + document.body.scrollLeft - document.body.clientLeft;
    yPos = e.clientY + document.body.scrollTop - document.body.clientTop;
  }
  return {
    x: xPos,
    y: yPos
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> mousePosition = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> xPos, yPos;
  e = e || <span class="hljs-built_in">window</span>.event;
  <span class="hljs-keyword">if</span> (e.pageX) {
    xPos = e.pageX;
    yPos = e.pageY;
  } <span class="hljs-keyword">else</span> {
    xPos = e.clientX + <span class="hljs-built_in">document</span>.body.scrollLeft - <span class="hljs-built_in">document</span>.body.clientLeft;
    yPos = e.clientY + <span class="hljs-built_in">document</span>.body.scrollTop - <span class="hljs-built_in">document</span>.body.clientTop;
  }
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">x</span>: xPos,
    <span class="hljs-attr">y</span>: yPos
  }
};</code></pre>
<p>然后需要明确的是，我们在处理拖拽事件过程中，需要记录的数据有：</p>
<ul>
<li><p><code>this.originX</code>/<code>this.originY</code> 旋转所环绕的中心坐标。在<code>componentDidMount</code>事件中记录并保存</p></li>
<li><p><code>this.startX</code>/<code>this.startY</code> 每次拖拽事件开始时的坐标。在<code>onMouseDown</code>事件中记录并保存</p></li>
<li><p><code>dragX</code>/<code>dragY</code> 移动过程中的坐标，随着移动而不断改变。在<code>onMouseMove</code>事件中记录并保存</p></li>
<li><p><code>endX</code>/<code>endY</code> 移动结束时的坐标。在<code>onMouseUp</code>事件中进行处理，并获取最后的角度degree，算出指针停止时对准的时间time，并将time和degree通过callback向父层组件传递。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 处理onMouseDown
handleMouseDown(e) {
  let event = e || window.event;
  event.preventDefault();
  event.stopPropagation();
  // 在鼠标按下的时候，将draging state标记为true，以便在移动时对坐标进行记录
  this.setState({
    draging: true
  });

  // 获取此时的坐标位置，作为这次拖拽的开始位置保存下来
  let pos = mousePosition(event);
  this.startX = pos.x;
  this.startY = pos.y;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 处理onMouseDown</span>
handleMouseDown(e) {
  <span class="hljs-keyword">let</span> event = e || <span class="hljs-built_in">window</span>.event;
  event.preventDefault();
  event.stopPropagation();
  <span class="hljs-comment">// 在鼠标按下的时候，将draging state标记为true，以便在移动时对坐标进行记录</span>
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">draging</span>: <span class="hljs-literal">true</span>
  });

  <span class="hljs-comment">// 获取此时的坐标位置，作为这次拖拽的开始位置保存下来</span>
  <span class="hljs-keyword">let</span> pos = mousePosition(event);
  <span class="hljs-keyword">this</span>.startX = pos.x;
  <span class="hljs-keyword">this</span>.startY = pos.y;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 处理onMouseMove
handleMouseMove(e) {
  if (this.state.draging) {
    // 实时获取更新当前坐标，用于计算旋转角度，来更新state中的pointerRotate，而pointerRotate用来改变渲染的视图
    let pos = mousePosition(e);
    let dragX = pos.x;
    let dragY = pos.y;

    if (this.originX !== dragX &amp;&amp; this.originY !== dragY) {
      // 获取旋转的弧度。getRadian方法在下面讲解
      let sRad = this.getRadian(dragX, dragY);
      // 将弧度转为角度
      let pointerRotate = sRad * (360 / (2 * Math.PI));
      this.setState({
        // 记录下来的state会改变渲染出来的指针角度
        pointerRotate
      });
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 处理onMouseMove</span>
handleMouseMove(e) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.draging) {
    <span class="hljs-comment">// 实时获取更新当前坐标，用于计算旋转角度，来更新state中的pointerRotate，而pointerRotate用来改变渲染的视图</span>
    <span class="hljs-keyword">let</span> pos = mousePosition(e);
    <span class="hljs-keyword">let</span> dragX = pos.x;
    <span class="hljs-keyword">let</span> dragY = pos.y;

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.originX !== dragX &amp;&amp; <span class="hljs-keyword">this</span>.originY !== dragY) {
      <span class="hljs-comment">// 获取旋转的弧度。getRadian方法在下面讲解</span>
      <span class="hljs-keyword">let</span> sRad = <span class="hljs-keyword">this</span>.getRadian(dragX, dragY);
      <span class="hljs-comment">// 将弧度转为角度</span>
      <span class="hljs-keyword">let</span> pointerRotate = sRad * (<span class="hljs-number">360</span> / (<span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI));
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-comment">// 记录下来的state会改变渲染出来的指针角度</span>
        pointerRotate
      });
    }
  }
}</code></pre>
<p>在<code>getRadian</code>方法中，通过起始点和中心点的坐标来计算旋转结束后的弧度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getRadian(x, y) {
  let sRad = Math.atan2(y - this.originY, x - this.originX);
  sRad -= Math.atan2(this.startY - this.originY, this.startX - this.originX);
  sRad += degree2Radian(this.props.rotateState.pointerRotate);
  return sRad;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">getRadian(x, y) {
  <span class="hljs-keyword">let</span> sRad = <span class="hljs-built_in">Math</span>.atan2(y - <span class="hljs-keyword">this</span>.originY, x - <span class="hljs-keyword">this</span>.originX);
  sRad -= <span class="hljs-built_in">Math</span>.atan2(<span class="hljs-keyword">this</span>.startY - <span class="hljs-keyword">this</span>.originY, <span class="hljs-keyword">this</span>.startX - <span class="hljs-keyword">this</span>.originX);
  sRad += degree2Radian(<span class="hljs-keyword">this</span>.props.rotateState.pointerRotate);
  <span class="hljs-keyword">return</span> sRad;
}</code></pre>
<p><code>Math.atan2(y, x)</code>方法返回从x轴到点(x, y)的弧度，介于 -PI/2 与 PI/2 之间。</p>
<p>因此这个计算方法直接上图表示，清晰明了：</p>
<p><span class="img-wrap"><img data-src="/img/bVC2Mz?w=1632&amp;h=1362" src="https://static.alili.tech/img/bVC2Mz?w=1632&amp;h=1362" alt="getRadian" title="getRadian" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 处理onMouseUp
handleMouseUp(e) {
  if (this.state.draging) {
    this.setState({
      draging: false
    });

    // 获取结束时的坐标
    let pos = mousePosition(e);
    let endX = pos.x;
    let endY = pos.y;

    let sRad = this.getRadian(endX, endY);
    let degree = sRad * (360 / (2 * Math.PI));

    // 在停止拖拽时，要求指针要对准表盘的刻度。因此，除了要对角度的正负进行处理以外，还对其四舍五入。最终获取的pointerRotate是对准了刻度的角度。
    if (degree < 0) {
      degree = 360 + degree;
    }
    // roundSeg是四舍五入之后的对准的表盘上的时间数字
    let roundSeg = Math.round(degree / (360 / 12));
    let pointerRotate = roundSeg * (360 / 12);

    // 分钟表盘的每一格都是小时表盘的5倍
    let time = step === 0 ? time : time * 5;
    // 将结果回调给父组件
    let {handleTimePointerClick} = this.props;
    handleTimePointerClick &amp;&amp; handleTimePointerClick(time, pointerRotate);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 处理onMouseUp</span>
handleMouseUp(e) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.draging) {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">draging</span>: <span class="hljs-literal">false</span>
    });

    <span class="hljs-comment">// 获取结束时的坐标</span>
    <span class="hljs-keyword">let</span> pos = mousePosition(e);
    <span class="hljs-keyword">let</span> endX = pos.x;
    <span class="hljs-keyword">let</span> endY = pos.y;

    <span class="hljs-keyword">let</span> sRad = <span class="hljs-keyword">this</span>.getRadian(endX, endY);
    <span class="hljs-keyword">let</span> degree = sRad * (<span class="hljs-number">360</span> / (<span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI));

    <span class="hljs-comment">// 在停止拖拽时，要求指针要对准表盘的刻度。因此，除了要对角度的正负进行处理以外，还对其四舍五入。最终获取的pointerRotate是对准了刻度的角度。</span>
    <span class="hljs-keyword">if</span> (degree &lt; <span class="hljs-number">0</span>) {
      degree = <span class="hljs-number">360</span> + degree;
    }
    <span class="hljs-comment">// roundSeg是四舍五入之后的对准的表盘上的时间数字</span>
    <span class="hljs-keyword">let</span> roundSeg = <span class="hljs-built_in">Math</span>.round(degree / (<span class="hljs-number">360</span> / <span class="hljs-number">12</span>));
    <span class="hljs-keyword">let</span> pointerRotate = roundSeg * (<span class="hljs-number">360</span> / <span class="hljs-number">12</span>);

    <span class="hljs-comment">// 分钟表盘的每一格都是小时表盘的5倍</span>
    <span class="hljs-keyword">let</span> time = step === <span class="hljs-number">0</span> ? time : time * <span class="hljs-number">5</span>;
    <span class="hljs-comment">// 将结果回调给父组件</span>
    <span class="hljs-keyword">let</span> {handleTimePointerClick} = <span class="hljs-keyword">this</span>.props;
    handleTimePointerClick &amp;&amp; handleTimePointerClick(time, pointerRotate);
  }
}</code></pre>
<p>你可能注意到只有在<code>onMouseUp</code>的最后，我们才把计算得到的角度回调到父组件里，，改变父组件的state。而在<code>handleMouseMove</code>方法里，我们只把角度存在当前state里。那是因为在每次移动过程中，都需要知道每次开始移动时的角度偏移量。这个数值我们是从父组件state里拿到的，因此只有在放手时才会更新它。而<code>PickerDargHandler</code>组件内部存的state，只是用来在拖拽的过程中改变，以便渲染指针UI的旋转角度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidUpdate(prevProps) {
  let {step, time, pointerRotate} = this.props;
  let prevStep = prevProps.step;
  let prevTime = prevProps.time;
  let PrevRotateState = prevProps.pointerRotate
  if (step !== prevStep || time !== prevTime || pointerRotate !== PrevRotateState) {
    this.resetState();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidUpdate(prevProps) {
  <span class="hljs-keyword">let</span> {step, time, pointerRotate} = <span class="hljs-keyword">this</span>.props;
  <span class="hljs-keyword">let</span> prevStep = prevProps.step;
  <span class="hljs-keyword">let</span> prevTime = prevProps.time;
  <span class="hljs-keyword">let</span> PrevRotateState = prevProps.pointerRotate
  <span class="hljs-keyword">if</span> (step !== prevStep || time !== prevTime || pointerRotate !== PrevRotateState) {
    <span class="hljs-keyword">this</span>.resetState();
  }
}</code></pre>
<p>而这些方法，会在组件初始化时绑定，在卸载时取消绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
  // 记录中心坐标
  if (!this.originX) {
    let centerPoint = ReactDOM.findDOMNode(this.refs.pickerCenter);
    let centerPointPos = centerPoint.getBoundingClientRect();
    this.originX = centerPointPos.left;
    this.originY = centerPointPos.top;
  }
  // 把handleMouseMove和handleMouseUp绑定在document，这样即使鼠标移动时不在指针或者modal上，也能够继续响应移动事件
  if (document.addEventListener) {
    document.addEventListener('mousemove', this.handleMouseMove, true);
    document.addEventListener('mouseup', this.handleMouseUp, true);
  } else {
    document.attachEvent('onmousemove', this.handleMouseMove);
    document.attachEvent('onmouseup', this.handleMouseUp);
  }
}

componentWillUnmount() {
  if (document.removeEventListener) {
    document.removeEventListener('mousemove', this.handleMouseMove, true);
    document.removeEventListener('mouseup', this.handleMouseUp, true);
  } else {
    document.detachEvent('onmousemove', this.handleMouseMove);
    document.detachEvent('onmouseup', this.handleMouseUp);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount() {
  <span class="hljs-comment">// 记录中心坐标</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.originX) {
    <span class="hljs-keyword">let</span> centerPoint = ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>.refs.pickerCenter);
    <span class="hljs-keyword">let</span> centerPointPos = centerPoint.getBoundingClientRect();
    <span class="hljs-keyword">this</span>.originX = centerPointPos.left;
    <span class="hljs-keyword">this</span>.originY = centerPointPos.top;
  }
  <span class="hljs-comment">// 把handleMouseMove和handleMouseUp绑定在document，这样即使鼠标移动时不在指针或者modal上，也能够继续响应移动事件</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.addEventListener) {
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousemove'</span>, <span class="hljs-keyword">this</span>.handleMouseMove, <span class="hljs-literal">true</span>);
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mouseup'</span>, <span class="hljs-keyword">this</span>.handleMouseUp, <span class="hljs-literal">true</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">'onmousemove'</span>, <span class="hljs-keyword">this</span>.handleMouseMove);
    <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">'onmouseup'</span>, <span class="hljs-keyword">this</span>.handleMouseUp);
  }
}

componentWillUnmount() {
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.removeEventListener) {
    <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'mousemove'</span>, <span class="hljs-keyword">this</span>.handleMouseMove, <span class="hljs-literal">true</span>);
    <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'mouseup'</span>, <span class="hljs-keyword">this</span>.handleMouseUp, <span class="hljs-literal">true</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">document</span>.detachEvent(<span class="hljs-string">'onmousemove'</span>, <span class="hljs-keyword">this</span>.handleMouseMove);
    <span class="hljs-built_in">document</span>.detachEvent(<span class="hljs-string">'onmouseup'</span>, <span class="hljs-keyword">this</span>.handleMouseUp);
  }
}</code></pre>
<p>最后看一眼render方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  let {time} = this.props;
  let {draging, height, top, pointerRotate} = this.state;
  let pickerPointerClass = draging ? &quot;picker_pointer&quot; : &quot;picker_pointer animation&quot;;

  // handleMouseDown事件绑定在了“.pointer_drag”上，它位于指针最顶端的位置
  return (
    <div className=&quot;picker_handler&quot;>
      <div
        ref={(d) => this.dragPointer = d}
        className={pickerPointerClass}
        style={getInitialPointerStyle(height, top, pointerRotate)}>
        <div
          className=&quot;pointer_drag&quot;
          style={getRotateStyle(-pointerRotate)}
          onMouseDown={this.handleMouseDown}>{time}</div>
      </div>
      <div
        className=&quot;picker_center&quot;
        ref={(p) => this.pickerCenter = p}></div>
    </div>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
  <span class="hljs-keyword">let</span> {time} = <span class="hljs-keyword">this</span>.props;
  <span class="hljs-keyword">let</span> {draging, height, top, pointerRotate} = <span class="hljs-keyword">this</span>.state;
  <span class="hljs-keyword">let</span> pickerPointerClass = draging ? <span class="hljs-string">"picker_pointer"</span> : <span class="hljs-string">"picker_pointer animation"</span>;

  <span class="hljs-comment">// handleMouseDown事件绑定在了“.pointer_drag”上，它位于指针最顶端的位置</span>
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"picker_handler"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{(d)</span> =&gt;</span> this.dragPointer = d}
        className={pickerPointerClass}
        style={getInitialPointerStyle(height, top, pointerRotate)}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">"pointer_drag"</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{getRotateStyle(-pointerRotate)}</span>
          <span class="hljs-attr">onMouseDown</span>=<span class="hljs-string">{this.handleMouseDown}</span>&gt;</span>{time}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">"picker_center"</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{(p)</span> =&gt;</span> this.pickerCenter = p}&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}</code></pre>
<blockquote><p>至此，我们的工作就已经完成了（才没有）。其实除了控制旋转角度以外，还有指针的坐标、长度等需要进行计算和控制。但即便完成这些，离一个合格的NPM包还有一段距离。除了基本的代码编写，我们还需要有单元测试，需要对包进行编译和发布。</p></blockquote>
<h3 id="articleHeader4">测试</h3>
<blockquote>
<p>关于更多的React测试介绍，可以戳这两篇文章入个门：</p>
<p><a href="https://voice.kadira.io/ui-testing-in-react-74fd90a5d58b" rel="nofollow noreferrer" target="_blank">UI Testing in React</a></p>
<p><a href="https://medium.freecodecamp.com/react-unit-testing-with-mocha-and-enzyme-77d18b6875cb" rel="nofollow noreferrer" target="_blank">React Unit Testing with Mocha and Enzyme</a></p>
</blockquote>
<p>使用<code>mocha</code>+<code>chai</code>和<code>enzyme</code>来进行React组件的单元测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i mocha --save-dev
$ npm i chai --save-dev
$ npm i enzyme --save-dev
$ npm i react-addons-test-utils --save-dev

# 除此之外，为了模拟React中的事件，还需要安装：
$ npm i sinon --save-dev
$ npm i sinon-sandbox --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm i mocha --save-dev
$ npm i chai --save-dev
$ npm i enzyme --save-dev
$ npm i react-addons-test-utils --save-dev

<span class="hljs-comment"># 除此之外，为了模拟React中的事件，还需要安装：</span>
$ npm i sinon --save-dev
$ npm i sinon-sandbox --save-dev</code></pre>
<p>然后配置<code>package.json</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;mocha&quot;: &quot;./node_modules/mocha/bin/mocha --compilers js:babel-register,jsx:babel-register&quot;,
  &quot;test&quot;: &quot;npm run mocha test&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-attr">"mocha"</span>: <span class="hljs-string">"./node_modules/mocha/bin/mocha --compilers js:babel-register,jsx:babel-register"</span>,
  <span class="hljs-attr">"test"</span>: <span class="hljs-string">"npm run mocha test"</span>
}</code></pre>
<p>请注意，为了能够检查ES6和React，确保自己安装了需要的babel插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i babel-register --save-dev
$ npm i babel-preset-react --save-dev
$ npm i babel-preset-es2015 --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm i babel-register --save-dev
$ npm i babel-preset-react --save-dev
$ npm i babel-preset-es2015 --save-dev</code></pre>
<p>并在项目根目录下配置了<code>.babelrc</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;react&quot;, &quot;es2015&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"react"</span>, <span class="hljs-string">"es2015"</span>]
}</code></pre>
<p>然后在项目根目录下新建<code>test</code>文件夹，开始编写测试。</p>
<p>编写<code>TimePicker</code>组件的测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test/TimePicker_init_spec.jsx

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import moment from 'moment';

import OutsideClickHandler from '../../src/components/OutsideClickHandler';
import TimePickerModal from '../../src/components/TimePickerModal';

describe('TimePicker initial', () => {
  it('should be wrappered by div.time_picker_container', () => {
    // 检查组件是否被正确的渲染。期待检测到组件最外层div的class
    const wrapper = shallow(<TimePicker />);
    expect(wrapper.is('.time_picker_container')).to.equal(true);
  });

  it('renders an OutsideClickHandler', () => {
    // 期待渲染出来的组件中含有OutsideClickHandler组件
    const wrapper = shallow(<TimePicker />);
    expect(wrapper.find(OutsideClickHandler)).to.have.lengthOf(1);
  });

  it('should rendered with default time in child props', () => {
    // 提供默认time，期待TimePickerModal能够获取正确的hour和minute
    const wrapper = shallow(<TimePicker defaultTime=&quot;22:23&quot; />);
    expect(wrapper.find(TimePickerModal).props().hour).to.equal(&quot;22&quot;);
    expect(wrapper.find(TimePickerModal).props().minute).to.equal(&quot;23&quot;);
  });

  it('should rendered with current time in child props', () => {
    // 在没有默认时间的情况下，期待TimePickerModal获取的hour和minute与当前的小时和分钟相同
    const wrapper = shallow(<TimePicker />);
    const [hour, minute] = moment().format(&quot;HH:mm&quot;).split(':');
    expect(wrapper.find(TimePickerModal).props().hour).to.equal(hour);
    expect(wrapper.find(TimePickerModal).props().minute).to.equal(minute);
  });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// test/TimePicker_init_spec.jsx</span>

<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {expect} <span class="hljs-keyword">from</span> <span class="hljs-string">'chai'</span>;
<span class="hljs-keyword">import</span> {shallow} <span class="hljs-keyword">from</span> <span class="hljs-string">'enzyme'</span>;
<span class="hljs-keyword">import</span> moment <span class="hljs-keyword">from</span> <span class="hljs-string">'moment'</span>;

<span class="hljs-keyword">import</span> OutsideClickHandler <span class="hljs-keyword">from</span> <span class="hljs-string">'../../src/components/OutsideClickHandler'</span>;
<span class="hljs-keyword">import</span> TimePickerModal <span class="hljs-keyword">from</span> <span class="hljs-string">'../../src/components/TimePickerModal'</span>;

describe(<span class="hljs-string">'TimePicker initial'</span>, () =&gt; {
  it(<span class="hljs-string">'should be wrappered by div.time_picker_container'</span>, () =&gt; {
    <span class="hljs-comment">// 检查组件是否被正确的渲染。期待检测到组件最外层div的class</span>
    <span class="hljs-keyword">const</span> wrapper = shallow(&lt;TimePicker /&gt;);
    expect(wrapper.is('.time_picker_container')).to.equal(true);
  });

  it('renders an OutsideClickHandler', () =&gt; {
    // 期待渲染出来的组件中含有OutsideClickHandler组件
    const wrapper = shallow(&lt;TimePicker /&gt;);
    expect(wrapper.find(OutsideClickHandler)).to.have.lengthOf(1);
  });

  it('should rendered with default time in child props', () =&gt; {
    // 提供默认time，期待TimePickerModal能够获取正确的hour和minute
    const wrapper = shallow(&lt;TimePicker defaultTime="22:23" /&gt;);
    expect(wrapper.find(TimePickerModal).props().hour).to.equal("22");
    expect(wrapper.find(TimePickerModal).props().minute).to.equal("23");
  });

  it('should rendered with current time in child props', () =&gt; {
    // 在没有默认时间的情况下，期待TimePickerModal获取的hour和minute与当前的小时和分钟相同
    const wrapper = shallow(&lt;TimePicker /&gt;);
    const [hour, minute] = moment().format("HH:mm").split(':');
    expect(wrapper.find(TimePickerModal).props().hour).to.equal(hour);
    expect(wrapper.find(TimePickerModal).props().minute).to.equal(minute);
  });
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test/TimePicker_func_spec.jsx
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon-sandbox';
import TimePicker from '../../src/components/TimePicker';

describe('handle focus change func', () => {
  it('should focus', () => {
    const wrapper = shallow(<TimePicker />);
    // 通过wrapper.instance()获取组件实例
    // 并调用了它的方法onFocus，并期待该方法能够改变组件的focused状态
    wrapper.instance().onFocus();
    expect(wrapper.state().focused).to.equal(true);
  });

  it('should change callback when hour change', () => {
    // 给组件传入onHourChangeStub方法作为onHourChange时的回调
    // 之后手动调用onHourChange方法，并期待onHourChangeStub方法被调用了一次
    const onHourChangeStub = sinon.stub();
    const wrapper = shallow(<TimePicker onHourChange={onHourChangeStub}/ />);
    wrapper.instance().handleHourChange(1);
    expect(onHourChangeStub.callCount).to.equal(1);
  });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// test/TimePicker_func_spec.jsx</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {expect} <span class="hljs-keyword">from</span> <span class="hljs-string">'chai'</span>;
<span class="hljs-keyword">import</span> {shallow} <span class="hljs-keyword">from</span> <span class="hljs-string">'enzyme'</span>;
<span class="hljs-keyword">import</span> sinon <span class="hljs-keyword">from</span> <span class="hljs-string">'sinon-sandbox'</span>;
<span class="hljs-keyword">import</span> TimePicker <span class="hljs-keyword">from</span> <span class="hljs-string">'../../src/components/TimePicker'</span>;

describe(<span class="hljs-string">'handle focus change func'</span>, () =&gt; {
  it(<span class="hljs-string">'should focus'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = shallow(&lt;TimePicker /&gt;);
    // 通过wrapper.instance()获取组件实例
    // 并调用了它的方法onFocus，并期待该方法能够改变组件的focused状态
    wrapper.instance().onFocus();
    expect(wrapper.state().focused).to.equal(true);
  });

  it('should change callback when hour change', () =&gt; {
    // 给组件传入onHourChangeStub方法作为onHourChange时的回调
    // 之后手动调用onHourChange方法，并期待onHourChangeStub方法被调用了一次
    const onHourChangeStub = sinon.stub();
    const wrapper = shallow(&lt;TimePicker onHourChange={onHourChangeStub}/ /&gt;);
    wrapper.instance().handleHourChange(1);
    expect(onHourChangeStub.callCount).to.equal(1);
  });
})</code></pre>
<h3 id="articleHeader5">编译</h3>
<p>如同上面所说，我最后选用的是当今最火的<code>webpack</code>同学来编译我们的代码。相信<code>React</code>加<code>ES6</code>的webpack编译配置大家已经配烦了，其基本的loader也就是<code>babel-loader</code>了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');

// 通过node的方法遍历src文件夹，来组成所有的webpack entry
const path = require('path');
const fs = require('fs');
const srcFolder = path.join(__dirname, 'src', 'components');
// 读取./src/components/文件夹下的所有文件
const components = fs.readdirSync(srcFolder);

// 把文件存在entries中，作为webpack编译的入口
const files = [];
const entries = {};
components.forEach(component => {
  const name = component.split('.')[0];
  if (name) {
    const file = `./src/components/${name}`;
    files.push(file);
    entries[name] = file;
  }
});

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: './lib/components/',
    // 模块化风格为commonjs2
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        loader: [&quot;babel-loader&quot;],
        query: {
          presets: [&quot;react&quot;, &quot;es2015&quot;]
        }
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '&quot;production&quot;'
    }),
    new webpack.NoErrorsPlugin()
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-comment">// 通过node的方法遍历src文件夹，来组成所有的webpack entry</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> srcFolder = path.join(__dirname, <span class="hljs-string">'src'</span>, <span class="hljs-string">'components'</span>);
<span class="hljs-comment">// 读取./src/components/文件夹下的所有文件</span>
<span class="hljs-keyword">const</span> components = fs.readdirSync(srcFolder);

<span class="hljs-comment">// 把文件存在entries中，作为webpack编译的入口</span>
<span class="hljs-keyword">const</span> files = [];
<span class="hljs-keyword">const</span> entries = {};
components.forEach(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> name = component.split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">if</span> (name) {
    <span class="hljs-keyword">const</span> file = <span class="hljs-string">`./src/components/<span class="hljs-subst">${name}</span>`</span>;
    files.push(file);
    entries[name] = file;
  }
});

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: entries,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./lib/components/'</span>,
    <span class="hljs-comment">// 模块化风格为commonjs2</span>
    libraryTarget: <span class="hljs-string">'commonjs2'</span>,
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules)/</span>,
        <span class="hljs-attr">include</span>: path.join(__dirname, <span class="hljs-string">'src'</span>),
        <span class="hljs-attr">loader</span>: [<span class="hljs-string">"babel-loader"</span>],
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">presets</span>: [<span class="hljs-string">"react"</span>, <span class="hljs-string">"es2015"</span>]
        }
      }
    ],
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>],
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
          <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.OccurenceOrderPlugin(),
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-string">'"production"'</span>
    }),
    <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin()
  ]
};</code></pre>
<p>但有一个很重要很重要的问题需要说明一下：</p>
<p>编译过React组件的人都应该知道，React打包进代码里是比较大的（即便在Production+UglifyJsPlugin的情况下），更何况，我们这个组件作为独立的<code>node_module</code>包，不应该把React打包进去，因为：</p>
<ol>
<li><p>打包React之后会让组件文件体积增大数倍</p></li>
<li><p>打包React之后，安装这个组件的用户会出现“重复安装React”的严重bug</p></li>
</ol>
<p>因此，我们在打包的时候应该将第三方依赖独立出去，这就需要配置<code>webpack</code>的<code>externals</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals(context, request, callback) {
  if (files.indexOf(request) > -1) {
    return callback(null, false);
  }
  return callback(null, true);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals(context, request, callback) {
  <span class="hljs-keyword">if</span> (files.indexOf(request) &gt; <span class="hljs-number">-1</span>) {
    <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>);
  }
  <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">true</span>);
},</code></pre>
<p>什么意思呢？你可以看<a href="https://webpack.github.io/docs/configuration.html#externals" rel="nofollow noreferrer" target="_blank">webpack externals官方文档</a>。鉴于<code>webpack</code>文档一般都很烂，我来大致解释一下：</p>
<p>在配置<code>externals</code>的时候，可以把它作为一个要复写的function：</p>
<blockquote><p>官方栗子</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// request是webpack在打包过程中要处理了某一个依赖，无论是自己写的文件之间的相互引用，还是对第三方包的引用，都会将这次引用作为request参数，走这个方法
// callback接收两个参数，error和result
// 当result返回true或者一个String的时候，webpack就不会把这个request依赖编译到文件里去。而返回false则会正常编译
// 因此，我们在每次依赖调用的时候，通过这个方法来判断，某些依赖是否应该编译进文件里
function(context, request, callback) {
  // Every module prefixed with &quot;global-&quot; becomes external
  // &quot;global-abc&quot; -> abc
  if(/^global-/.test(request))
      return callback(null, &quot;var &quot; + request.substr(7));
  callback();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// request是webpack在打包过程中要处理了某一个依赖，无论是自己写的文件之间的相互引用，还是对第三方包的引用，都会将这次引用作为request参数，走这个方法</span>
<span class="hljs-comment">// callback接收两个参数，error和result</span>
<span class="hljs-comment">// 当result返回true或者一个String的时候，webpack就不会把这个request依赖编译到文件里去。而返回false则会正常编译</span>
<span class="hljs-comment">// 因此，我们在每次依赖调用的时候，通过这个方法来判断，某些依赖是否应该编译进文件里</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context, request, callback</span>) </span>{
  <span class="hljs-comment">// Every module prefixed with "global-" becomes external</span>
  <span class="hljs-comment">// "global-abc" -&gt; abc</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^global-/</span>.test(request))
      <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, <span class="hljs-string">"var "</span> + request.substr(<span class="hljs-number">7</span>));
  callback();
}</code></pre>
<p>所以，就可以解释一下我们自己在webpack配置中的<code>externals</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals(context, request, callback) {
  // 如果这个依赖存在于files中，也就是在./src/components/文件夹下，说明这是我们自己编写的文件，妥妥的要打包
  if (files.indexOf(request) > -1) {
    return callback(null, false);
  }
  // 否则他就是第三方依赖，独立出去不打包，而是期待使用了该组件的用户自己去打包React
  return callback(null, true);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals(context, request, callback) {
  <span class="hljs-comment">// 如果这个依赖存在于files中，也就是在./src/components/文件夹下，说明这是我们自己编写的文件，妥妥的要打包</span>
  <span class="hljs-keyword">if</span> (files.indexOf(request) &gt; <span class="hljs-number">-1</span>) {
    <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>);
  }
  <span class="hljs-comment">// 否则他就是第三方依赖，独立出去不打包，而是期待使用了该组件的用户自己去打包React</span>
  <span class="hljs-keyword">return</span> callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">true</span>);
},</code></pre>
<p>至此，这个组件的编写可以告一段落了。之后要做的就是NPM包发布的事情。本来想一次性把这个也说了的，但是鉴于有更详细的文章在，大家可以参考<a href="https://www.awesomes.cn/source/12" rel="nofollow noreferrer" target="_blank">前端扫盲-之打造一个Node命令行工具</a>来学习Node包创建和发布的过程。</p>
<blockquote>
<p>本文的源码全部位于github项目仓库<a href="https://github.com/ecmadao/react-times" rel="nofollow noreferrer" target="_blank"><code>react-times</code></a>，如果有差异请以github为准。最终线上DEMO可见<a href="https://ecmadao.github.io/react-times/" rel="nofollow noreferrer" target="_blank">react-times github page</a></p>
<p>转载请注明来源：</p>
<p>ecmadao，<a href="https://github.com/ecmadao/Coding-Guide/blob/master/Notes/React/ReactJS/Write%20a%20React%20Timepicker%20Component%20hand%20by%20hand.md" rel="nofollow noreferrer" target="_blank">https://github.com/ecmadao/Co...</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一言不合造轮子--撸一个ReactTimePicker

## 原文链接
[https://segmentfault.com/a/1190000006883180](https://segmentfault.com/a/1190000006883180)

