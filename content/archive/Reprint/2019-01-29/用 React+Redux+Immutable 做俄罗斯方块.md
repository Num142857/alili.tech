---
title: '用 React+Redux+Immutable 做俄罗斯方块' 
date: 2019-01-29 2:30:10
hidden: true
slug: al3x32gobl9
categories: [reprint]
---

{{< raw >}}

                    
<p>俄罗斯方块是一直各类程序语言热衷实现的经典游戏，JavsScript的实现版本也有很多，用React 做好俄罗斯方块则成了我一个目标。</p>
<blockquote>
<p><strong>戳 <a href="https://chvin.github.io/react-tetris/" rel="nofollow noreferrer" target="_blank">https://chvin.github.io/react-tetris</a> 玩一玩！</strong></p>
<p><strong>开源地址：<a href="https://github.com/chvin/react-tetris/" rel="nofollow noreferrer" target="_blank">https://github.com/chvin/react-tetris</a></strong></p>
</blockquote>
<h2 id="articleHeader0">效果预览</h2>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1Ag7CNXXXXXaoXXXXXXXXXXXX-320-483.gif" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1Ag7CNXXXXXaoXXXXXXXXXXXX-320-483.gif" alt="效果预览" title="效果预览" style="cursor: pointer; display: inline;"></span></p>
<p>正常速度的录制，体验流畅。</p>
<h3 id="articleHeader1">响应式</h3>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1AdjZNXXXXXcCapXXXXXXXXXX-480-343.gif" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1AdjZNXXXXXcCapXXXXXXXXXX-480-343.gif" alt="响应式" title="响应式" style="cursor: pointer; display: inline;"></span></p>
<p>不仅指屏幕的自适应，而是<code>在PC使用键盘、在手机使用手指的响应式操作</code>：</p>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1kvJyOVXXXXbhaFXXXXXXXXXX-320-555.gif" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1kvJyOVXXXXbhaFXXXXXXXXXX-320-555.gif" alt="手机" title="手机" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">数据持久化</h3>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1EY7cNXXXXXXraXXXXXXXXXXX-320-399.gif" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1EY7cNXXXXXXraXXXXXXXXXXX-320-399.gif" alt="数据持久化" title="数据持久化" style="cursor: pointer;"></span></p>
<p>玩单机游戏最怕什么？断电。通过订阅 <code>store.subscribe</code>，将state储存在localStorage，精确记录所有状态。网页关了刷新了、程序崩溃了、手机没电了，重新打开连接，都可以继续。</p>
<h3 id="articleHeader3">Redux 状态预览</h3>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1hGQqNXXXXXX3XFXXXXXXXXXX-640-381.gif" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1hGQqNXXXXXX3XFXXXXXXXXXX-640-381.gif" alt="Redux状态预览" title="Redux状态预览" style="cursor: pointer; display: inline;"></span></p>
<p>Redux设计管理了所有应存的状态，这是上面持久化的保证。</p>
<p>游戏框架使用的是 React + Redux，其中再加入了 Immutable，用它的实例来做来Redux的state。（有关React和Redux的介绍可以看：<a href="http://www.ruanyifeng.com/blog/2015/03/react.html" rel="nofollow noreferrer" target="_blank">React入门实例</a>、<a href="https://camsong.github.io/redux-in-chinese/index.html" rel="nofollow noreferrer" target="_blank">Redux中文文档</a>）</p>
<h2 id="articleHeader4">1、什么是 Immutable？</h2>
<p>Immutable 是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。</p>
<h3 id="articleHeader5">初识</h3>
<p>让我们看下面一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function keyLog(touchFn) {
  let data = { key: 'value' };
  f(data);
  console.log(data.key); // 猜猜会打印什么？
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">keyLog</span>(<span class="hljs-params">touchFn</span>) </span>{
  <span class="hljs-keyword">let</span> data = { <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span> };
  f(data);
  <span class="hljs-built_in">console</span>.log(data.key); <span class="hljs-comment">// 猜猜会打印什么？</span>
}</code></pre>
<p>不查看f，不知道它对 <code>data</code> 做了什么，无法确认会打印什么。但如果 <code>data</code> 是 Immutable，你可以确定打印的是 <code>value</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function keyLog(touchFn) {
  let data = Immutable.Map({ key: 'value' });
  f(data);
  console.log(data.get('key'));  // value
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">keyLog</span>(<span class="hljs-params">touchFn</span>) </span>{
  <span class="hljs-keyword">let</span> data = Immutable.Map({ <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span> });
  f(data);
  <span class="hljs-built_in">console</span>.log(data.get(<span class="hljs-string">'key'</span>));  <span class="hljs-comment">// value</span>
}</code></pre>
<p>JavaScript 中的<code>Object</code>与<code>Array</code>等使用的是引用赋值，新的对象简单的引用了原始对象，改变新也将影响旧的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo = {a: 1};  bar = foo;  bar.a = 2;
foo.a // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">foo = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>};  bar = foo;  bar.a = <span class="hljs-number">2</span>;
foo.a <span class="hljs-comment">// 2</span></code></pre>
<p>虽然这样做可以节约内存，但当应用复杂后，造成了状态不可控，是很大的隐患，节约的内存优点变得得不偿失。</p>
<p>Immutable则不一样，相应的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo = Immutable.Map({ a: 1 });  bar = foo.set('a', 2);
foo.get('a') // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">foo = Immutable.Map({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> });  bar = foo.set(<span class="hljs-string">'a'</span>, <span class="hljs-number">2</span>);
foo.get(<span class="hljs-string">'a'</span>) <span class="hljs-comment">// 1</span></code></pre>
<h3 id="articleHeader6">简洁</h3>
<p>在<code>Redux</code>中，它的最优做法是每个<code>reducer</code>都返回一个新的对象（数组），所以我们常常会看到这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducer
...
return [
   ...oldArr.slice(0, 3),
   newValue,
   ...oldArr.slice(4)
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// reducer</span>
...
return [
   ...oldArr.slice(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>),
   newValue,
   ...oldArr.slice(<span class="hljs-number">4</span>)
];</code></pre>
<p>为了返回新的对象（数组），不得不有上面奇怪的样子，而在使用更深的数据结构时会变的更棘手。<br>让我们看看Immutable的做法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducer
...
return oldArr.set(4, newValue);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// reducer</span>
...
return oldArr.set(<span class="hljs-number">4</span>, newValue);</code></pre>
<p>是不是很简洁？</p>
<h3 id="articleHeader7">关于 “===”</h3>
<p>我们知道对于<code>Object</code>与<code>Array</code>的<code>===</code>比较，是对引用地址的比较而不是“值比较”，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{a:1, b:2, c:3} === {a:1, b:2, c:3}; // false
[1, 2, [3, 4]] === [1, 2, [3, 4]]; // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">b</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">c</span>:<span class="hljs-number">3</span>} === {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">b</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">c</span>:<span class="hljs-number">3</span>}; <span class="hljs-comment">// false</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]] === [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]; <span class="hljs-comment">// false</span></code></pre>
<p>对于上面只能采用 deepCopy<code>、</code>deepCompare`来遍历比较，不仅麻烦且好性能。</p>
<p>我们感受来一下<code>Immutable</code>的做法！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="map1 = Immutable.Map({a:1, b:2, c:3});
map2 = Immutable.Map({a:1, b:2, c:3});
Immutable.is(map1, map2); // true

// List1 = Immutable.List([1, 2, Immutable.List[3, 4]]);
List1 = Immutable.fromJS([1, 2, [3, 4]]);
List2 = Immutable.fromJS([1, 2, [3, 4]]);
Immutable.is(List1, List2); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">map1 = Immutable.Map({<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">b</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">c</span>:<span class="hljs-number">3</span>});
map2 = Immutable.Map({<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">b</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">c</span>:<span class="hljs-number">3</span>});
Immutable.is(map1, map2); <span class="hljs-comment">// true</span>

<span class="hljs-comment">// List1 = Immutable.List([1, 2, Immutable.List[3, 4]]);</span>
List1 = Immutable.fromJS([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]);
List2 = Immutable.fromJS([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]);
Immutable.is(List1, List2); <span class="hljs-comment">// true</span></code></pre>
<p>似乎有阵清风吹过。</p>
<p>React 做性能优化时有一个<code>大招</code>，就是使用 <code>shouldComponentUpdate()</code>，但它默认返回 <code>true</code>，即始终会执行 <code>render()</code> 方法，后面做 Virtual DOM 比较。</p>
<p>在使用原生属性时，为了得出shouldComponentUpdate正确的<code>true</code> or <code>false</code>，不得不用deepCopy、deepCompare来算出答案，消耗的性能很不划算。而在有了Immutable之后，使用上面的方法对深层结构的比较就变的易如反掌。</p>
<p>对于「俄罗斯方块」，试想棋盘是一个<code>二维数组</code>，可以移动的方块则是<code>形状(也是二维数组)</code>+<code>坐标</code>。棋盘与方块的叠加则组成了最后的结果<code>Matrix</code>。游戏中上面的属性都由<code>Immutable</code>构建，通过它的比较方法，可以轻松写好<code>shouldComponentUpdate</code>。源代码：<a href="https://github.com/chvin/react-tetris/blob/master/src/components/matrix/index.js#L35" rel="nofollow noreferrer" target="_blank">/src/components/matrix/index.js#L35</a></p>
<p>Immutable学习资料：</p>
<ul>
<li><p><a href="http://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">Immutable.js</a></p></li>
<li><p><a href="https://github.com/camsong/blog/issues/3" rel="nofollow noreferrer" target="_blank">Immutable 详解及 React 中实践</a></p></li>
</ul>
<h2 id="articleHeader8">2、如何在Redux中使用Immutable</h2>
<ul>
<li><p>目标：将<code>state</code> -&gt; Immutable化。</p></li>
<li><p>关键的库：<a href="https://github.com/gajus/redux-immutable" rel="nofollow noreferrer" target="_blank">gajus/redux-immutable</a></p></li>
</ul>
<p>将原来 Redux提供的combineReducers改由上面的库提供：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// rootReduers.js
// import { combineReducers } from 'redux'; // 旧的方法
import { combineReducers } from 'redux-immutable'; // 新的方法

import prop1 from './prop1';
import prop2 from './prop2';
import prop3 from './prop3';

const rootReducer = combineReducers({
  prop1, prop2, prop3,
});


// store.js
// 创建store的方法和常规一样
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
export default store;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// rootReduers.js</span>
<span class="hljs-comment">// import { combineReducers } from 'redux'; // 旧的方法</span>
<span class="hljs-keyword">import</span> { combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-immutable'</span>; <span class="hljs-comment">// 新的方法</span>

<span class="hljs-keyword">import</span> prop1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./prop1'</span>;
<span class="hljs-keyword">import</span> prop2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./prop2'</span>;
<span class="hljs-keyword">import</span> prop3 <span class="hljs-keyword">from</span> <span class="hljs-string">'./prop3'</span>;

<span class="hljs-keyword">const</span> rootReducer = combineReducers({
  prop1, prop2, prop3,
});


<span class="hljs-comment">// store.js</span>
<span class="hljs-comment">// 创建store的方法和常规一样</span>
<span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>;

<span class="hljs-keyword">const</span> store = createStore(rootReducer);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre>
<p>通过新的<code>combineReducers</code>将把store对象转化成Immutable，在container中使用时也会略有不同（但这正是我们想要的）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapStateToProps = (state) => ({
  prop1: state.get('prop1'),
  prop2: state.get('prop2'),
  prop3: state.get('prop3'),
  next: state.get('next'),
});
export default connect(mapStateToProps)(App);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> ({
  <span class="hljs-attr">prop1</span>: state.get(<span class="hljs-string">'prop1'</span>),
  <span class="hljs-attr">prop2</span>: state.get(<span class="hljs-string">'prop2'</span>),
  <span class="hljs-attr">prop3</span>: state.get(<span class="hljs-string">'prop3'</span>),
  <span class="hljs-attr">next</span>: state.get(<span class="hljs-string">'next'</span>),
});
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps)(App);</code></pre>
<h2 id="articleHeader9">3、Web Audio Api</h2>
<p>游戏里有很多不同的音效，而实际上只引用了一个音效文件：<div><span class="mejs__offscreen">Audio Player</span><div id="mep_0" class="mejs__container mejs__container-keyboard-inactive mejs__audio" tabindex="0" role="application" aria-label="Audio Player" style="width: 825px; height: 40px; min-width: 241px;"><div class="mejs__inner"><div class="mejs__mediaelement"><mediaelementwrapper id="mejs_5673696829988848"><audio src="https://github.com/chvin/react-tetris/blob/master/build/music.mp3" preload="auto" id="mejs_5673696829988848_html5" style="width: 100%; height: 100%;"></audio></mediaelementwrapper></div><div class="mejs__layers"><div class="mejs__poster mejs__layer" style="display: none; width: 100%; height: 100%;"></div></div><div class="mejs__controls"><div class="mejs__button mejs__playpause-button mejs__play"><button type="button" aria-controls="mep_0" title="Play" aria-label="Play" tabindex="0"></button></div><div class="mejs__time mejs__currenttime-container" role="timer" aria-live="off"><span class="mejs__currenttime">00:00</span></div><div class="mejs__time-rail"><span class="mejs__time-total mejs__time-slider" role="slider" tabindex="0" aria-label="Time Slider" aria-valuemin="0" aria-valuemax="NaN" aria-valuenow="0" aria-valuetext="00:00"><span class="mejs__time-buffering" style="display: none;"></span><span class="mejs__time-loaded"></span><span class="mejs__time-current"></span><span class="mejs__time-hovered no-hover"></span><span class="mejs__time-handle"><span class="mejs__time-handle-content"></span></span><span class="mejs__time-float"><span class="mejs__time-float-current">00:00</span><span class="mejs__time-float-corner"></span></span></span></div><div class="mejs__time mejs__duration-container"><span class="mejs__duration">00:00</span></div><div class="mejs__button mejs__volume-button mejs__mute"><button type="button" aria-controls="mep_0" title="Mute" aria-label="Mute" tabindex="0"></button></div><a class="mejs__horizontal-volume-slider" href="javascript:void(0);" aria-label="Volume Slider" aria-valuemin="0" aria-valuemax="100" role="slider"><span class="mejs__offscreen">Use Up/Down Arrow keys to increase or decrease volume.</span><div class="mejs__horizontal-volume-total"><div class="mejs__horizontal-volume-current" style="left: 0px; width: 100%;"></div><div class="mejs__horizontal-volume-handle" style="left: 100%;"></div></div></a></div></div></div></div><a href="https://github.com/chvin/react-tetris/blob/master/build/music.mp3" rel="nofollow noreferrer" target="_blank" download="music.mp3">下载音频</a>。借助<code>Web Audio Api</code>能够以毫秒级精确、高频率的播放音效，这是<code>&lt;audio&gt;</code>标签所做不到的。在游戏进行中按住方向键移动方块，便可以听到高频率的音效。</p>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1fYgzNXXXXXXnXpXXXXXXXXXX-633-358.png" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1fYgzNXXXXXXnXpXXXXXXXXXX-633-358.png" alt="网页音效进阶" title="网页音效进阶" style="cursor: pointer; display: inline;"></span></p>
<p><code>WAA</code> 是一套全新的相对独立的接口系统，对音频文件拥有更高的处理权限以及更专业的内置音频效果，是W3C的推荐接口，能专业处理“音速、音量、环境、音色可视化、高频、音向”等需求，下图介绍了WAA的使用流程。</p>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1nBf1NXXXXXagapXXXXXXXXXX-520-371.png" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1nBf1NXXXXXagapXXXXXXXXXX-520-371.png" alt="流程" title="流程" style="cursor: pointer; display: inline;"></span></p>
<p>其中Source代表一个音频源，Destination代表最终的输出，多个Source合成出了Destination。<br>源代码：<a href="https://github.com/chvin/react-tetris/blob/master/src/unit/music.js" rel="nofollow noreferrer" target="_blank">/src/unit/music.js</a> 实现了ajax加载mp3，并转为WAA，控制播放的过程。</p>
<p><code>WAA</code> 在各个浏览器的最新2个版本下的支持情况（<a href="http://caniuse.com/#search=webaudio" rel="nofollow noreferrer" target="_blank">CanIUse</a>）</p>
<p><span class="img-wrap"><img data-src="/img/bVHd2t" src="https://static.alili.tech/img/bVHd2t" alt="浏览器支持" title="浏览器支持" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到IE阵营与大部分安卓机不能使用，其他ok。</p>
<p>Web Audio Api 学习资料：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API" rel="nofollow noreferrer" target="_blank">Web API 接口| MDN</a></p></li>
<li><p><a href="http://www.html5rocks.com/en/tutorials/webaudio/intro/" rel="nofollow noreferrer" target="_blank">Getting Started with Web Audio API</a></p></li>
</ul>
<h2 id="articleHeader10">4、游戏在体验上的优化</h2>
<p>技术：</p>
<ul>
<li><p>按下方向键水平移动和竖直移动的触发频率是不同的，游戏可以定义触发频率，代替原生的事件频率，源代码：<a href="https://github.com/chvin/react-tetris/blob/master/src/unit/event.js" rel="nofollow noreferrer" target="_blank">/src/unit/event.js</a> ；</p></li>
<li><p>左右移动可以 delay 掉落的速度，但在撞墙移动的时候 delay 的稍小；在速度为6级时 通过delay 会保证在一行内水平完整移动一次；</p></li>
<li><p>对按钮同时注册<code>touchstart</code>和<code>mousedown</code>事件，以供响应式游戏。当<code>touchstart</code>发生时，不会触发<code>mousedown</code>，而当<code>mousedown</code>发生时，由于鼠标移开事件元素可以不触发<code>mouseup</code>，将同时监听<code>mouseout</code> 模拟 mouseup`。源代码：<a href="https://github.com/chvin/react-tetris/blob/master/src/components/keyboard/index.js" rel="nofollow noreferrer" target="_blank">/src/components/keyboard/index.js</a>；</p></li>
<li><p>监听了 <code>visibilitychange</code> 事件，当页面被隐藏切换的时候，游戏将不会进行，切换回来将继续，这个<code>focus</code>状态也被写进了Redux中。所以当用手机玩来<code>电话</code>时，游戏进度将保存；PC开着游戏干别的也不会听到gameover，这有点像 <code>ios</code> 应用的切换。</p></li>
<li><p>在<code>任意</code>时刻刷新网页，（比如消除方块时、游戏结束时）也能还原当前状态；</p></li>
<li><p>游戏中唯一用到的图片，其他都是CSS；<br><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>游戏兼容 Chrome、Firefox、IE9+、Edge等；</p></li>
</ul>
<p>玩法：</p>
<ul>
<li><p>可以在游戏未开始时制定初始的棋盘（十个级别）和速度（六个级别）；</p></li>
<li><p>一次消除1行得100分、2行得300分、3行得700分、4行得1500分；</p></li>
<li><p>方块掉落速度会随着消除的行数增加（每20行增加一个级别）；</p></li>
</ul>
<h2 id="articleHeader11">5、开发中的经验梳理</h2>
<ul>
<li><p>为所有的<code>component</code>都编写了<code>shouldComponentUpdate</code>，在手机上的性能相对有显著的提升。中大型应用在遇到性能上的问题的时候，写好shouldComponentUpdate 一定会帮你一把。</p></li>
<li><p>无状态组件`（<a href="https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d#.xjqnbfx4e" rel="nofollow noreferrer" target="_blank">Stateless Functional Components</a>）是没有生命周期的。而因为上条因素，所有组件都需要生命周期 shouldComponentUpdate，所以未使用无状态组件。</p></li>
<li><p>在 webpack.config.js<code> 中的 devServer属性写入</code>host: '0.0.0.0'`，可以在开发时用ip访问，不局限在localhost；</p></li>
<li><p>redux中的<code>store</code>并非只能通过connect将方法传递给<code>container</code>，可以跳出组件，在别的文件拿出来做流程控制(dispatch)，源代码：<a href="https://github.com/chvin/react-tetris/blob/master/src/control/states.js" rel="nofollow noreferrer" target="_blank">/src/control/states.js</a>；</p></li>
<li><p>用 react+redux 做持久化非常的方便，只要将redux状态储存，在每一个reduers做初始化的时候读取就好。</p></li>
<li><p>通过配置 .eslintrc.js<code> 与 webpack.config.js</code> ，项目中集成了 ESLint` 检验。使用 ESLint 可以使编码按规范编写，有效地控制代码质量。不符规范的代码在开发时（或build时）都能通过IDE与控制台发现错误。 参考：<a href="https://github.com/dwqs/react-style-guide" rel="nofollow noreferrer" target="_blank">Airbnb: React使用规范</a>；</p></li>
</ul>
<h2 id="articleHeader12">6、总结</h2>
<ul>
<li><p>作为一个 React 的练手应用，在实现的过程中发现小小的“方块”还是有很多的细节可以优化和打磨，这时就是考验一名前端工程师的细心和功力的时候。</p></li>
<li><p>优化的方向既有 React 的本身，比如哪些状态由 Redux存，哪些状态给组件的state就好；而跳出框架又有产品的很多特点可以玩，为了达到你的需求，这些都将自然的推进技术的发展。</p></li>
<li><p>一个项目从零开始，功能一点一滴慢慢累积，就会盖成高楼，不要畏难，有想法就敲起来吧。 ^_^</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 React+Redux+Immutable 做俄罗斯方块

## 原文链接
[https://segmentfault.com/a/1190000007878885](https://segmentfault.com/a/1190000007878885)

