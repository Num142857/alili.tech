---
title: '一看就懂的例子告诉你用react-redux的正确姿势' 
date: 2019-01-11 2:30:08
hidden: true
slug: iar4wx8wki
categories: [reprint]
---

{{< raw >}}

                    
<p>whay write this: 很多小白在看过很多教程之后仍然在敲代码的时候不清楚应该以什么样的步骤进行，那么这篇文章就一步一步分解整个过程，慢动作回放让大家看的清清楚楚明明白白。</p>
<p>这个小Demo的功能是在input标签中输入内容，同步显示在上方的p标签内，DEMO很简单，大神们轻喷～?</p>
<p><a href="https://github.com/oliyg/reduxdemo" rel="nofollow noreferrer" target="_blank">项目代码在这里</a>：<a href="https://github.com/oliyg/reduxdemo" rel="nofollow noreferrer" target="_blank">https://github.com/oliyg/redu...</a></p>
<p>clone: <a href="https://github.com/oliyg/reduxdemo.git" rel="nofollow noreferrer" target="_blank">https://github.com/oliyg/redu...</a></p>
<p>废话不多说</p>
<p>首先上图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
                 _________               ____________               ___________
                |         |             |            |             |           |
                | Action  |------------▶| Dispatcher |------------▶| callbacks |
                |_________|             |____________|             |___________|
                     ▲                                                   |
                     |                                                   |
                     |                                                   |
 _________       ____|_____                                          ____▼____
|         |◀----|  Action  |                                        |         |
| Web API |     | Creators |                                        |  Store  |
|_________|----▶|__________|                                        |_________|
                     ▲                                                   |
                     |                                                   |
                 ____|________           ____________                ____▼____
                |   User       |         |   React   |              | Change  |
                | interactions |◀--------|   Views   |◀-------------| events  |
                |______________|         |___________|              |_________|
*/

图片来源：[redux-tutorial](https://github.com/happypoulp/redux-tutorial/blob/master/00_introduction.js)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>/<span class="hljs-symbol">*</span>
                 _________               ____________               ___________
                |<span class="hljs-string">         </span>|<span class="hljs-string">             </span>|<span class="hljs-string">            </span>|<span class="hljs-string">             </span>|<span class="hljs-string">           </span>|
                |<span class="hljs-string"> Action  </span>|<span class="hljs-string">------------▶</span>|<span class="hljs-string"> Dispatcher </span>|<span class="hljs-string">------------▶</span>|<span class="hljs-string"> callbacks </span>|
                |<span class="hljs-string">_________</span>|<span class="hljs-string">             </span>|<span class="hljs-string">____________</span>|<span class="hljs-string">             </span>|<span class="hljs-string">___________</span>|
                     ▲                                                   |<span class="hljs-string">
                     </span>|<span class="hljs-string">                                                   </span>|
                     |<span class="hljs-string">                                                   </span>|
 _________       ____|<span class="hljs-string">_____                                          ____▼____
</span>|<span class="hljs-string">         </span>|<span class="hljs-string">◀----</span>|<span class="hljs-string">  Action  </span>|<span class="hljs-string">                                        </span>|<span class="hljs-string">         </span>|
|<span class="hljs-string"> Web API </span>|<span class="hljs-string">     </span>|<span class="hljs-string"> Creators </span>|<span class="hljs-string">                                        </span>|<span class="hljs-string">  Store  </span>|
|<span class="hljs-string">_________</span>|<span class="hljs-string">----▶</span>|<span class="hljs-string">__________</span>|<span class="hljs-string">                                        </span>|<span class="hljs-string">_________</span>|
                     ▲                                                   |<span class="hljs-string">
                     </span>|<span class="hljs-string">                                                   </span>|
                 ____|<span class="hljs-string">________           ____________                ____▼____
                </span>|<span class="hljs-string">   User       </span>|<span class="hljs-string">         </span>|<span class="hljs-string">   React   </span>|<span class="hljs-string">              </span>|<span class="hljs-string"> Change  </span>|
                |<span class="hljs-string"> interactions </span>|<span class="hljs-string">◀--------</span>|<span class="hljs-string">   Views   </span>|<span class="hljs-string">◀-------------</span>|<span class="hljs-string"> events  </span>|
                |<span class="hljs-string">______________</span>|<span class="hljs-string">         </span>|<span class="hljs-string">___________</span>|<span class="hljs-string">              </span>|<span class="hljs-string">_________</span>|
<span class="hljs-symbol">*</span>/

图片来源：[redux-tutorial](https://github.com/happypoulp/redux-tutorial/blob/master/00_introduction.js)
</code></pre>
<p>上图是大家再熟悉不过的redux数据流，从这个图中我们可以按照下面这个流程来敲代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="component(渲染UI) -> action（定义用户操作动作） -> reducer(处理action动作) -> store（处理reducer绑定state和dispatch） -> component（用connect绑定component、用Provider重新渲染UI） -> ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">component</span>(渲染UI) -&gt;</span> <span class="hljs-function"><span class="hljs-title">action</span>（定义用户操作动作） -&gt;</span> <span class="hljs-function"><span class="hljs-title">reducer</span>(处理action动作) -&gt;</span> <span class="hljs-function"><span class="hljs-title">store</span>（处理reducer绑定state和dispatch） -&gt;</span> <span class="hljs-function"><span class="hljs-title">component</span>（用connect绑定component、用Provider重新渲染UI） -&gt;</span> ...</code></pre>
<p>这里使用了create-react-app安装并start后把一些没用的文件清理掉，增加我们自己的文件</p>
<p>文件目录如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src
    component/
        Texture.js
    action/
        action.js
    reducer/
        reducer.js
    store/
        store.js
    App.js
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>src
    component/
        Texture<span class="hljs-selector-class">.js</span>
    action/
        action<span class="hljs-selector-class">.js</span>
    reducer/
        reducer<span class="hljs-selector-class">.js</span>
    store/
        store<span class="hljs-selector-class">.js</span>
    App<span class="hljs-selector-class">.js</span>
    </code></pre>
<p>好，目录文件大概就是这样子，正式开始敲代码</p>
<hr>
<p>我的位置：component/Texture.js</p>
<p>首先从component开刀（<strong>View视图</strong>）：</p>
<p>引入必要的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</code></pre>
<p>创建component（这里省去了propsTypes和defaultProps，仅仅为了方便展示）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Texture = (props) => (
  <div>
    <h2>{props.str}</h2>
    <input onChange={props.onChange} placeholder={props.placeholder} />
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Texture = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{props.str}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{props.onChange}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">{props.placeholder}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
);</span></code></pre>
<hr>
<p>我的位置action/action.js</p>
<p>然后定义action，在这个例子中，我们只有一个动作，修改input值：onChange，在action中命名为onChangeAction，并传入一个参数e，返回包含type和value值的对象，最后暴露模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const onChangeAction = (e) => (
  {
    type: 'INPUTCHANGE',
    value: e.target.value
  }
);

export default onChangeAction;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> onChangeAction = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> (
  {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'INPUTCHANGE'</span>,
    value: e.target.value
  }
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> onChangeAction;</code></pre>
<hr>
<p>我的位置reducer／reducer.js</p>
<p>定义完action之后，我们自然是想办法处理这个action，那么下一步就是创建reducer：</p>
<p>reducer接收两个参数，并返回新的state，第一个参数state要先设置初始值，否则返回undefined，第二个参数action，接收可能接收到的action参数。</p>
<p>state中设置我们在component中要用到并绑定在视图中显示的props值，就是此前定义的str和placeholder</p>
<p>在reducer内部，需要用到switch检测action的type并根据不同的type来处理相应的action</p>
<p>需要注意的是，我们必须要记得在default情况下返回state，否则若无匹配的action.type，state就会丢失。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const reducer = (state = { str: '✒️write something: ', placeholder: 'here?' }, action) => {
  switch (action.type) {
    case 'INPUTCHANGE':
      return {
        str: action.value
      };
    default:
      return state;
  }
};

export default reducer;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> reducer = <span class="hljs-function">(<span class="hljs-params">state = { str: <span class="hljs-string">'✒️write something: '</span>, placeholder: <span class="hljs-string">'here?'</span> }, action</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'INPUTCHANGE'</span>:
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">str</span>: action.value
      };
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> reducer;</code></pre>
<hr>
<p>我的位置：store/store.js</p>
<p>我们知道reducer存在于store内，既然action和reducer都配置好了，接下来就轮到store了</p>
<p>引入redux中createStore模块和之前定义好的reducer，创建store：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux';
import reducer from '../reducer/reducer';
const store = createStore(reducer);

export default store;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> reducer <span class="hljs-keyword">from</span> <span class="hljs-string">'../reducer/reducer'</span>;
<span class="hljs-keyword">const</span> store = createStore(reducer);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre>
<hr>
<p>我的位置：component/Texture.js</p>
<p>处理完成后我们再回到component中：</p>
<p>这么一来，我们只需要将store中的state和dispatch分别绑定在component中即可打通store中的state和component中的props的联系了，那么我们只需要react-redux提供的connect和Provider即可：</p>
<p>导入相关模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Provider, connect } from 'react-redux';
import store from '../store/store';
import onChangeAction from '../action/action';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { Provider, connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../store/store'</span>;
<span class="hljs-keyword">import</span> onChangeAction <span class="hljs-keyword">from</span> <span class="hljs-string">'../action/action'</span>;</code></pre>
<p>创建mapStateToProps和mapDispatchToProps两个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapStateToProps = (state) => {
  return ({
    str: state.str,
    placeholder: state.placeholder
  });
};
const mapDispatchToProps = (dispatch) => {
  return ({
    onChange: (e) => { return dispatch(onChangeAction(e)) }
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const mapStateToProps = (<span class="hljs-keyword">state</span>) =&gt; {
  return ({
    str: <span class="hljs-keyword">state</span>.str,
    placeholder: <span class="hljs-keyword">state</span>.placeholder
  });
};
const mapDispatchToProps = (dispatch) =&gt; {
  return ({
    <span class="hljs-keyword">on</span>Change: (e) =&gt; { return dispatch(<span class="hljs-keyword">on</span>ChangeAction(e)) }
  });
};</code></pre>
<p>并将这俩货和store通过connect和Provider绑定到视图中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const TextureConnect = connect(mapStateToProps, mapDispatchToProps)(Texture);
const TextureWrapper = () => (
  <Provider store={store}>
    <TextureConnect />
  </Provider>
);
export default TextureWrapper;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> TextureConnect = connect(mapStateToProps, mapDispatchToProps)(Texture);
<span class="hljs-keyword">const</span> TextureWrapper = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">TextureConnect</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>
);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> TextureWrapper;</code></pre>
<hr>
<p>我的位置：App.js</p>
<p>最后，大功告成，在App.js中引入这个组件即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//requirement
import React from 'react';
import TextureWrapper from './component/Texture';

const App = () => (
  <TextureWrapper />
);

export default App;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//requirement</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> TextureWrapper <span class="hljs-keyword">from</span> <span class="hljs-string">'./component/Texture'</span>;

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  &lt;TextureWrapper /&gt;
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;</code></pre>
<p>另外，component/Texture.js中视图部分最好单独出来，放在新建一个文件夹view目录下，并被名为TextureContainer.js引用，把其他逻辑部分放后者。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一看就懂的例子告诉你用react-redux的正确姿势

## 原文链接
[https://segmentfault.com/a/1190000009879673](https://segmentfault.com/a/1190000009879673)

