---
title: 'react-router-dom v^4学习历程（一）' 
date: 2019-01-14 2:30:07
hidden: true
slug: gof9xwpbwzb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>react-router-dom的版本已经更新到了4.1.1，那么我们就一起来学习学习react v4这个新版路由的基本使用吧！</p></blockquote>
<p>在学习路由之前我们先需要复习几个基础知识，关于react组件的构建，和分离组件到另外的文件</p>
<h2 id="articleHeader0">生成react组件的方式</h2>
<ul><li><p><strong>我们可以采用一个函数来快速生成一个 react组件</strong></p></li></ul>
<p>观察如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
const Mycomponent=()=>(
  <div>
    <h2>这是我的第一个函数组件</h2>
  </div>
  
)
ReactDOM.render(<Mycomponent/>,document.getElementById('example'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">const</span> Mycomponent=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>这是我的第一个函数组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  
)
ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Mycomponent</span>/&gt;</span></span>,<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'example'</span>))</code></pre>
<p>渲染组件到根节点上，可以看出没有任何问题。<br>我们也可以把这个组件分离到另外一个文件中，用es6的 语法<code>import default </code> <code>export</code>导入导出，然后在index.jsx中引用它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Mycomponent.jsx
import React from 'react'
const Mycomponent=()=>(
  <div>
    <h2>这是我的第一个函数组件</h2>
  </div>
  
)
export default Mycomponent
//index.jsx
import Mycomponent from './Mycomponent'

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//Mycomponent.jsx</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">const</span> Mycomponent=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>这是我的第一个函数组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Mycomponent
<span class="hljs-comment">//index.jsx</span>
<span class="hljs-keyword">import</span> Mycomponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./Mycomponent'</span>

</code></pre>
<p><strong>这样我们就可以做到函数式构建的react组件在react项目中模块化使用</strong></p>
<ul><li><p><strong>第二种就是我们常用的class方式声明组件</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   import React from 'react'
    export default class Topic extends React.Component{
    
    render(){
      return (
        <div>
        <h3>{this.props.match.params.topicId}</h3>
      </div>
    
        )
      }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>   <span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t'
    export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Topic</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    
    render(){
      <span class="hljs-keyword">return</span> (
        &lt;div&gt;
        &lt;h3&gt;{<span class="hljs-keyword">this</span>.props.<span class="hljs-keyword">match</span>.params.topicId}&lt;/h3&gt;
      &lt;/div&gt;
    
        )
      }
    }
</code></pre>
<h2 id="articleHeader1">向构造react组件模板的函数中传入路由参数</h2>
<p>如果一个react组件作为Route的component属性值，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <Route  exact path=&quot;/&quot; component={Home}></Route>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>  <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span></code></pre>
<ul><li><p>函数式声明Home时，它的模板定义函数就会默认接受一个对象作为参数，里面包含了路由的各种信息<br><span class="img-wrap"><img data-src="/img/bVNoaH?w=840&amp;h=201" src="https://static.alili.tech/img/bVNoaH?w=840&amp;h=201" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></li></ul>
<p>这样我们就可以利用模板定义函数参数中的信息获取到路由中的参数。<br>`</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const Topic=({match})=>//es6语法将参数对象中的match属性
 (                         //赋值给参数match
 <div>
<h3>{match.params.topicId}</h3>
 </div>
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>  const Topic=({match})=&gt;<span class="hljs-comment">//es6语法将参数对象中的match属性</span>
 (                         <span class="hljs-comment">//赋值给参数match</span>
 <span class="hljs-params">&lt;div&gt;</span>
<span class="hljs-params">&lt;h3&gt;</span>{match.params.topicId}<span class="hljs-params">&lt;/h3&gt;</span>
 <span class="hljs-params">&lt;/div&gt;</span>
)
</code></pre>
<ul><li><p>如果是用类的方式声明的组件那么获取路由参数信息的办法是在jsx渲染模板中<br><code>this.props.match.params</code></p></li></ul>
<hr>
<p>预备知识完毕，下面我们就看看怎么做一个react路由</p>
<h2 id="articleHeader2">路由基本用法</h2>
<p>路由要解决的基本需求是从一个链接点击到另外一个链接，在页面中无刷新跳转到页面的另外一部分内容。类似于tabs面板。<br>例如有如下界面<span class="img-wrap"><img data-src="/img/bVNojP?w=353&amp;h=298" src="https://static.alili.tech/img/bVNojP?w=353&amp;h=298" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>三个组件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const App=()=>(
  <h2>主页</h2>
)
const Hot=()=>(<div><h2>热门</h2></div>)
const Content=()=>(
  <h2>文章</h2>
)
const Zhuanlan=()=>(<div>
  <h2>专栏</h2>
</div>)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> App=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>主页<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
)
<span class="hljs-keyword">const</span> Hot=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>热门<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
<span class="hljs-keyword">const</span> Content=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>文章<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
)
<span class="hljs-keyword">const</span> Zhuanlan=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>专栏<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)</code></pre>
<p>那么在需要使用路由的页面组件里面，渲染如下模板</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import {Link,Route,BrowserRouter as Router} from 'react-router-dom' 
  (<Router>
  <div>
    <ul>
      <li><Link to=&quot;/&quot;>主页</Link></li>
      <li><Link to=&quot;/hot&quot;>热门</Link></li>
      <li><Link to=&quot;/zhuanlan&quot;>专栏</Link></li>
    </ul>
    <hr/>
    <Route  exact path=&quot;/&quot; component={App}></Route>
    <Route path=&quot;/hot&quot; component={Hot} ></Route>
    <Route path=&quot;/zhuanlan&quot; component={Zhuanlan}></Route>
  </div>
</Router>)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">import</span> {Link,Route,BrowserRouter <span class="hljs-keyword">as</span> Router} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span> 
  (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>主页<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/hot"</span>&gt;</span>热门<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/zhuanlan"</span>&gt;</span>专栏<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>  <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{App}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/hot"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Hot}</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/zhuanlan"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Zhuanlan}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span>)
</code></pre>
<p>注意使用Router作为最外层标签，里面只能有一个一级子节点，用Link来导航 ，to指定路径，Route指定要导航到的组件，这样一个路由的基本使用就成型了。exact用于精准匹配路径，不用exact也会匹配到匹配的路径的子路径，这样两个路由组件都会显示。我们需要的是每次切换只会显示一个Route中指定的组件</p>
<h2 id="articleHeader3">路由的嵌套和路径中参数传递</h2>
<ul>
<li><p>在一个子组件Hot中，再嵌套一个子路由我们应该怎么做？<br>很简单就是把路由Route再写入Hot的模板中实现路由嵌套。</p></li>
<li><p>路径中传递参数到路由到的组件，就是在路径前面加上<code>: </code>,这样这个路由地址就会变成一个参数被组件接受到。例如<code>${match.url}/:id</code><br>${match.url}可以获取到当前的基础路径。然后在路由用到的组件中可以用</p></li>
</ul>
<p><code>match.params</code>(函数式声明的组件中,match需要在函数参数中引入)或<code>this.props.match.params</code>（React class类render函数中）<br>示例如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ///父组件中
    const Hot=({match})=>(<div>
    
    <h2>热门</h2>
    <Link to={`${match.url}/article`}>文章</Link>
    <Link to={`${match.url}/qa`}>问答</Link>
    <Link to={`${match.url}/news`}>新闻</Link>
    <hr/>
    <Route path={`${match.url}/:type`} component={Content}></Route>
    
    </div>)
    //子组件中
    const Content=({match})=>(
  <div>
  <h2>热门子目录</h2>
<p>{match.params.type}</p>
  </div>
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">///父组件中</span>
    <span class="hljs-keyword">const</span> Hot=<span class="hljs-function">(<span class="hljs-params">{match}</span>)=&gt;</span>(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>热门<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">match.url</span>}/<span class="hljs-attr">article</span>`}&gt;</span>文章<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">match.url</span>}/<span class="hljs-attr">qa</span>`}&gt;</span>问答<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">match.url</span>}/<span class="hljs-attr">news</span>`}&gt;</span>新闻<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">{</span>`${<span class="hljs-attr">match.url</span>}/<span class="hljs-attr">:type</span>`} <span class="hljs-attr">component</span>=<span class="hljs-string">{Content}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
    <span class="hljs-comment">//子组件中</span>
    <span class="hljs-keyword">const</span> Content=<span class="hljs-function">(<span class="hljs-params">{match}</span>)=&gt;</span>(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>热门子目录<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{match.params.type}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)</code></pre>
<p><strong>总结</strong><br>1.组件生成的方式有两种，render在类中显式渲染，函数生成。<br>2.路由的基本用法Router&gt;Route path component指定路径和组件，Link添加导航按钮链接，to指定路径地址<br>3.路由的嵌套，直接在子组件模板中添加Route，Link，match.url引入基础路径<br>4.路由路径参数传递到模板，用<code>baseUrl/:id</code>类似格式，组件中用match.params.id接收。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-router-dom v^4学习历程（一）

## 原文链接
[https://segmentfault.com/a/1190000009349377](https://segmentfault.com/a/1190000009349377)

