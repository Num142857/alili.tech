---
title: '前端学习记录 week2' 
date: 2018-12-08 2:30:30
hidden: true
slug: 8ev6w5ukokb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.SCSS语法</h2>
<h3 id="articleHeader1">变量申明</h3>
<ul>
<li>$+变量名+:+变量值  例$width:200px</li>
<li>$width:200px  普通变量</li>
<li>$width:200px !default  默认变量即可覆盖</li>
</ul>
<h3 id="articleHeader2">选择器嵌套</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header>
    <nav>
        <a href=&quot;#&quot;>home</a>
        <a href=&quot;#&quot;>page</a>
    </nav>
</header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>page<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></code></pre>
<p>scss</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nav {
  a {
    color: red;
    
    header {
      color:green;
    }
  }  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">nav</span> {
  a {
    <span class="hljs-attribute">color</span>: red;
    
    header {
      <span class="hljs-attribute">color</span>:green;
    }
  }  
}</code></pre>
<h3 id="articleHeader3">属性嵌套</h3>
<p>css：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
     font-size: 12px;
     font-weight: bold;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
     <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
     <span class="hljs-attribute">font-weight</span>: bold;
}</code></pre>
<p>scss：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
  font: {
   size: 12px;
   weight: bold;
  }  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">font</span>: {
   size: <span class="hljs-number">12px</span>;
   <span class="hljs-attribute">weight</span>: bold;
  }  
}</code></pre>
<h3 id="articleHeader4">伪类嵌套</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix{
&amp;:before,
&amp;:after {
    content:&quot;&quot;;
    display: table;
  }
&amp;:after {
    clear:both;
    overflow: hidden;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.clearfix</span>{
&amp;:before,
&amp;:after {
    <span class="hljs-attribute">content</span>:<span class="hljs-string">""</span>;
    <span class="hljs-attribute">display</span>: table;
  }
&amp;<span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">clear</span>:both;
    <span class="hljs-attribute">overflow</span>: hidden;
  }
}</code></pre>
<h3 id="articleHeader5">声明混合宏（可带参数）</h3>
<p>申明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@mixin border-radius {
    -webkit-border-radius: 5px;
    border-radius: 5px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>@<span class="hljs-keyword">mixin</span> border-radius {
    -webkit-<span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
}</code></pre>
<p>调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="button {
    @include border-radius;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">button</span> {
    @include border-radius;
}</code></pre>
<h3 id="articleHeader6">sass 继承</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}
.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.btn</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}
<span class="hljs-selector-class">.btn-primary</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f36</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  @<span class="hljs-keyword">extend</span> .btn;
}</code></pre>
<ul>
<li>sass占位符%：用占位符声明的代码，如果不被@extend调用就不会被编译。</li>
<li>sass：支持加减乘除</li>
</ul>
<h2 id="articleHeader7">2.JavaScript获取元素父节点、子节点、兄弟节点</h2>
<ul>
<li>el.parentNode:获取元素父节点</li>
<li>el.parentElement：获取元素父节点，目前没发现与parentNode的区别在哪里</li>
<li>el.childNodes:获取元素子节点，会计算text，回车也算！</li>
<li>el.children获取元素子节点，不计算text.</li>
<li>el.nextSibling:后一个节点</li>
<li>el.previousSibling: 前一个节点</li>
</ul>
<h2 id="articleHeader8">3.flex布局</h2>
<ul>
<li>display: flex</li>
<li>display: inline-flex</li>
<li>webkit内核浏览器加上-webkit前缀</li>
</ul>
<h3 id="articleHeader9">基本概念</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。<br>项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size</p>
<h3 id="articleHeader10">容器的属性</h3>
<ul>
<li>flex-direction：项目排列方向row、column、row-reverse、column-reverse</li>
<li>flex-wrap：nowrap、wrap、wrap-reverse</li>
<li>flex-flow：flex-direction和flex-wrap的简写形式</li>
<li>justify-content：主轴上的对齐方式flex-start、flex-end、center、space-between、space-around</li>
<li>align-items：交叉轴上的对齐方式flex-start、flex-end、baseline、strentch</li>
<li>align-content：多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</li>
</ul>
<h3 id="articleHeader11">项目属性</h3>
<ul>
<li>order：项目的排列顺序。数值越小，排列越靠前，默认为0。</li>
<li>flex-grow：项目的放大比例，默认为0，即如果存在剩余空间，也不放大。</li>
<li>flex-shrink：项目的缩小比例，默认为1，即如果空间不足，该项目将缩小</li>
<li>flex-basis：配多余空间之前，项目占据的主轴空间（main size）。</li>
<li>flex：flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。</li>
<li>algin-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。</li>
</ul>
<h2 id="articleHeader12">4.vuex 状态管理模式</h2>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;核心概念：vuex应用的核心是store，里面包含大部分的state，vuex的状态存储是响应式的，state中的状态不能直接更改</p>
<ul>
<li>state</li>
<li>gettter</li>
<li>mutation</li>
<li>action</li>
<li>module</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*vueStore.js*/
import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './moduleA.js'

Vue.use(Vuex);

let state = {
  a1: 12,
  data: ['a','a','a','a','a']
};

let getters = {
  printData: state => {
    console.log(state.data);
    return state.data;
  }
};

let mutations = {
  setData(state, data){
    state.data = data;
  }
};

let actions = {
  setData({ commit },n){
    commit('setData', n);
  }
};

export default new Vuex.Store({
    strict: true,
    state,
    getters,
    mutations,
    actions,
    modules: {
    moduleA
  }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">/*vueStore.js*/</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> moduleA <span class="hljs-keyword">from</span> <span class="hljs-string">'./moduleA.js'</span>

Vue.use(Vuex);

<span class="hljs-keyword">let</span> state = {
  <span class="hljs-attr">a1</span>: <span class="hljs-number">12</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">'a'</span>,<span class="hljs-string">'a'</span>,<span class="hljs-string">'a'</span>,<span class="hljs-string">'a'</span>,<span class="hljs-string">'a'</span>]
};

<span class="hljs-keyword">let</span> getters = {
  <span class="hljs-attr">printData</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(state.data);
    <span class="hljs-keyword">return</span> state.data;
  }
};

<span class="hljs-keyword">let</span> mutations = {
  setData(state, data){
    state.data = data;
  }
};

<span class="hljs-keyword">let</span> actions = {
  setData({ commit },n){
    commit(<span class="hljs-string">'setData'</span>, n);
  }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">strict</span>: <span class="hljs-literal">true</span>,
    state,
    getters,
    mutations,
    actions,
    <span class="hljs-attr">modules</span>: {
    moduleA
  }
});
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*moduleA.js*/
let state = {
  data: ['A', 'A',' A', 'A', 'A']
};

let getters = {
  printDataA: state => {
    return state.data;
  }
};

let mutations = {
  setDataA(state, data) {
    state.data = data;
  }
};

let actions = {
  setDataA({commit}, n) {
    commit('setDataA', n);
  }
};

export default ({
  strict: true,//严格模式
  namespaced: true,
  state,
  getters,
  mutations,
  actions
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">/*moduleA.js*/</span>
<span class="hljs-keyword">let</span> state = {
  <span class="hljs-attr">data</span>: [<span class="hljs-string">'A'</span>, <span class="hljs-string">'A'</span>,<span class="hljs-string">' A'</span>, <span class="hljs-string">'A'</span>, <span class="hljs-string">'A'</span>]
};

<span class="hljs-keyword">let</span> getters = {
  <span class="hljs-attr">printDataA</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> state.data;
  }
};

<span class="hljs-keyword">let</span> mutations = {
  setDataA(state, data) {
    state.data = data;
  }
};

<span class="hljs-keyword">let</span> actions = {
  setDataA({commit}, n) {
    commit(<span class="hljs-string">'setDataA'</span>, n);
  }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ({
  <span class="hljs-attr">strict</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//严格模式</span>
  namespaced: <span class="hljs-literal">true</span>,
  state,
  getters,
  mutations,
  actions
})
</code></pre>
<h3 id="articleHeader13">state</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在根实例中注册store选项，该store就会注入到下面的所有组件，子组件通过this.$store能访问到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    computed: {
        count () {
        return this.$store.state.data //['a','a','a','a','a']
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    computed: {
        count () {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.data <span class="hljs-comment">//['a','a','a','a','a']</span>
        }
    }</code></pre>
<h3 id="articleHeader14">getter</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getter类似于计算属性，它的返回值会根据它的依赖被缓存起来，只有当它它的依赖值发生改变才会重新计算，也可以接受其他get特然作为第二个参数</p>
<p>getter会暴露store。getter对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
    getData(){
        this.$store.getters.printData; //['a','a','a','a','a']
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods:{
    getData(){
        <span class="hljs-keyword">this</span>.$store.getters.printData; <span class="hljs-comment">//['a','a','a','a','a']</span>
    }
}</code></pre>
<p>通过方法访问</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getters: {
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">getters: {
  <span class="hljs-attr">getTodoById</span>: <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> (id) =&gt; {
    <span class="hljs-keyword">return</span> state.todos.find(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.id === id)
  }
}
store.getters.getTodoById(<span class="hljs-number">2</span>) <span class="hljs-comment">// -&gt; { id: 2, text: '...', done: false </span></code></pre>
<h3 id="articleHeader15">mutation</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vuex中更改store中的状态的唯一方法就是提交mutation，它接受state作为第一个参数，触发mutation的方法徐调用store.commit,我们可以向store.commit转入额外的参数，即mutation的载荷（payload）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
      send(){
        this.$store.commit('setData', [0,0,0,0,0]);
        console.log(this.$store.state.data); //[0,0,0,0,0]
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods:{
      send(){
        <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'setData'</span>, [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$store.state.data); <span class="hljs-comment">//[0,0,0,0,0]</span>
      }</code></pre>
<p>mutation必须是同步函数；</p>
<h3 id="articleHeader16">action</h3>
<p>action类似于mutation，不同在于：</p>
<ul>
<li>action提交的是mutation。而不是直接改变状态。</li>
<li>action可以包含任意异步操作。</li>
</ul>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;action接受一个与store实例具有相同方法和属性的context对象，context.commit来提交一个mutation、context.state、context.getters</p>
<p><b>Action 通过 store.dispatch 方法触发：</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
      send(){
        this.$store.dispatch('setData', [0,0,0,0,0]);
        console.log(this.$store.state.data); //[0,0,0,0,0]
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods:{
      send(){
        <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'setData'</span>, [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$store.state.data); <span class="hljs-comment">//[0,0,0,0,0]</span>
      }
    }</code></pre>
<h3 id="articleHeader17">module</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.state.moduleA //moduleA的状态
store.commit('setDataA',[0,0,0,0,0]) //触发moduleA的mutation中的setDataA
store.dispatch('setDataA',[0,0,0,0,0]) //moduleA  actions
store.getters.printDataA; //getter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">store.state.moduleA <span class="hljs-comment">//moduleA的状态</span>
store.commit(<span class="hljs-string">'setDataA'</span>,[<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]) <span class="hljs-comment">//触发moduleA的mutation中的setDataA</span>
store.dispatch(<span class="hljs-string">'setDataA'</span>,[<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]) <span class="hljs-comment">//moduleA  actions</span>
store.getters.printDataA; <span class="hljs-comment">//getter</span></code></pre>
<p><strong>命名空间</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;默认情况下模块内部的action、mutation、getter是注册在全局命名空间的，所以多个模块能够对同一mutation、action做出响应。添加<strong>namespaced: true</strong>的方式使其成为命名空间模块，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.state.moduleA //moduleA的状态
store.commit('moduleA/setDataA',[0,0,0,0,0]) //触发moduleA的mutation中的setDataA
store.dispatch('moduleA/setDataA',[0,0,0,0,0]) //moduleA  actions
store.getters['moduleA/printDataA']; //moduleA  getter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">store.state.moduleA <span class="hljs-comment">//moduleA的状态</span>
store.commit(<span class="hljs-string">'moduleA/setDataA'</span>,[<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]) <span class="hljs-comment">//触发moduleA的mutation中的setDataA</span>
store.dispatch(<span class="hljs-string">'moduleA/setDataA'</span>,[<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]) <span class="hljs-comment">//moduleA  actions</span>
store.getters[<span class="hljs-string">'moduleA/printDataA'</span>]; <span class="hljs-comment">//moduleA  getter</span></code></pre>
<h2 id="articleHeader18">5.axios</h2>
<h3 id="articleHeader19">一、请求的方式</h3>
<h4>1、通过配置发送请求</h4>
<p>axios(config);<br>axios(url[,config]);</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
    method:&quot;POST&quot;,
    url:'/user/a',
    data:{
        msg: 'helloWorld'
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">axios({
    <span class="hljs-attr">method</span>:<span class="hljs-string">"POST"</span>,
    <span class="hljs-attr">url</span>:<span class="hljs-string">'/user/a'</span>,
    <span class="hljs-attr">data</span>:{
        <span class="hljs-attr">msg</span>: <span class="hljs-string">'helloWorld'</span>
    }
});</code></pre>
<h4>2、通过别名发送请求</h4>
<p>axios.request(config);</p>
<p>axios.get(url[,config]);</p>
<p>axios.delete(url[,config]);</p>
<p>axios.head(url[,config]);</p>
<p>axios.post(url[,data[,config]]);</p>
<p>axios.put(url[,data[,config]])</p>
<p>axios.patch(url[,data[,config]])</p>
<h4>3、并发请求</h4>
<p>axios.all(params)<br>axios.spread(callback) ;                <em>//callback要等到所有请求都完成才会执行</em></p>
<h4>4、创建axios实例</h4>
<p>axios.create([config])<br>实例方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios#request(config)
axios#get(url[,config])
axios#delete(url[,config])
axios#head(url[,config])
axios#post(url[,data[,config]])
axios#put(url[,data[,config]])
axios#patch(url[,data[,config]])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">axios#request(config)
axios#get(url[,config])
axios#<span class="hljs-keyword">delete</span>(url[,config])
axios#head(url[,config])
axios#post(url[,data[,config]])
axios#put(url[,data[,config]])
axios#patch(url[,data[,config]])</code></pre>
<h3 id="articleHeader20">二、请求的配置参数</h3>
<ul>
<li>url: 请求地址</li>
<li>method：请求方式默认get</li>
<li>baseURL：相对地址</li>
<li>transformRequest：选项允许我们在请求发送到服务器之前对请求的数据做出一些改动</li>
<li>transformResponse：选项允许我们在数据传送到<code>then/catch</code>方法之前对数据进行改动</li>
<li>headers：自定义请求头信息</li>
<li>params：项是要随请求一起发送的请求参数----一般链接在URL后面</li>
<li>data：选项是作为一个请求体而需要被发送的数据，该选项只适用于方法：<code>put/post/patch</code>
</li>
<li>timeout：如果请求花费的时间超过延迟的时间，那么请求会被终止</li>
<li>responseType：返回数据的格式</li>
<li>onUploadProgress：下载进度的事件</li>
<li>...</li>
</ul>
<h4>获取响应信息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*search.js*/
import axios from 'axios';

export default function (keywords, type) {
  const require = new Promise((resolve, reject) => {
    axios.get('http://47.94.16.170:3000/search',{
      params:{
        keywords: keywords,
        type: type
      },
    }).then((data)=> {
      resolve(data);
    })
  });
  return require;
}


/*调用*/
import search from '@/api/search';

let that = this;
search(this.searchText, this.searchType).then(function (data) {
    that.content = data.result;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*search.js*/</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">keywords, type</span>) </span>{
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">require</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    axios.get(<span class="hljs-string">'http://47.94.16.170:3000/search'</span>,{
      <span class="hljs-attr">params</span>:{
        <span class="hljs-attr">keywords</span>: keywords,
        <span class="hljs-attr">type</span>: type
      },
    }).then(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span> {
      resolve(data);
    })
  });
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>;
}


<span class="hljs-comment">/*调用*/</span>
<span class="hljs-keyword">import</span> search <span class="hljs-keyword">from</span> <span class="hljs-string">'@/api/search'</span>;

<span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>;
search(<span class="hljs-keyword">this</span>.searchText, <span class="hljs-keyword">this</span>.searchType).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    that.content = data.result;
})</code></pre>
<h3 id="articleHeader21">三、默认配置</h3>
<h4>1.全局默认配置</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.defaults.baseURL = 'http://api.exmple.com';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">axios.defaults.baseURL = <span class="hljs-string">'http://api.exmple.com'</span>;</code></pre>
<h4>2.自定义的实例默认设置</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var instance = axios.create({
    baseURL: 'https://api.example.com'
});

instance.defaults.headers.common[&quot;Authorization&quot;] = AUTH_TOKEN;

instance.get('/longRequest',{
  timeout: 5000
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> instance = axios.create({
    <span class="hljs-attr">baseURL</span>: <span class="hljs-string">'https://api.example.com'</span>
});

instance.defaults.headers.common[<span class="hljs-string">"Authorization"</span>] = AUTH_TOKEN;

instance.get(<span class="hljs-string">'/longRequest'</span>,{
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">5000</span>
});</code></pre>
<h4>3.配置优先级</h4>
<p>lib/defaults.js &lt; 实例中的默认配置 &lt; 请求中的默认配置</p>
<h3 id="articleHeader22">四、拦截器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //在请求发出之前进行一些操作
  return config;
},function(err){
  //Do something with request error
  return Promise.reject(error);
});
//添加一个响应拦截器
axios.interceptors.response.use(function(res){
  //在这里对返回的数据进行处理
  return res;
},function(err){
  //Do something with response error
  return Promise.reject(error);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//添加一个请求拦截器</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
  <span class="hljs-comment">//在请求发出之前进行一些操作</span>
  <span class="hljs-keyword">return</span> config;
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
  <span class="hljs-comment">//Do something with request error</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});
<span class="hljs-comment">//添加一个响应拦截器</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
  <span class="hljs-comment">//在这里对返回的数据进行处理</span>
  <span class="hljs-keyword">return</span> res;
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
  <span class="hljs-comment">//Do something with response error</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端学习记录 week2

## 原文链接
[https://segmentfault.com/a/1190000014041462](https://segmentfault.com/a/1190000014041462)

