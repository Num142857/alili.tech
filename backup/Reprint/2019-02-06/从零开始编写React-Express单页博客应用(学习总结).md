---
title: '从零开始编写React-Express单页博客应用(学习总结)' 
date: 2019-02-06 2:30:09
hidden: true
slug: 3eewmzbohz
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React-Express单页博客应用编写总结</h2>
<p>很久之前就想写一个博客应用.<br>在一开始想要直接用<code>express</code>和<code>ejs</code>模板直接写, 但是暑假一开始的时候不小心入了react的坑, 所以就一不做二不休直接用<code>react</code>写. 那既然用了<code>react</code>, 不写个单页应用也过意不去了...(不<br>前前后后写了将近两个星期, 现在看来这其实是一个很容易的应用. 但是鉴于是第一次用<code>react</code>, 对于<code>nodejs</code>也不是特别熟悉, 所以走了不少冤枉路. 其中也有很多次觉得想放弃, 不过最终还是写下来了. 虽然还是有不少瑕疵, 不过也算给自己一个交代吧.<br>个人博客网站的地址为: <a href="https://harryfyodor.tk" rel="nofollow noreferrer" target="_blank">harryfyodor.tk</a><br>下面会从几个方面把我整个编写的过程的一些经验记录下来, 主要是记录自己的学习过程, 编写中遇到的困难以及解决, 以及一些学习/复习资料的整理分享. 也希望给各位和我一样的初学者一点点借鉴的经验.<br>(个人感觉比较好的学习方式就是自己看资料(文档和博客)然后写自己的一个小应用, 而不是跟着某一个教程从头到尾过一遍, 虽然不得不承认, 后者学起来的感觉很爽, 而且也更清晰. 但是不好的地方就是技术栈不完全匹配的时候就会很头疼...)<br>下面是目录:</p>
<ol>
<li><p>前端 (包括<code>react</code>, <code>redux</code>, <code>css-module</code>等)</p></li>
<li><p>后端 (包括<code>express</code>, <code>mongodb</code>)</p></li>
<li><p>前后端 (包括<code>fetch</code>, <code>jwt</code>)</p></li>
<li><p>其他 (包括<code>webpack</code>, 优化等)</p></li>
</ol>
<p>下面直接进入正题.</p>
<hr>
<h3 id="articleHeader1">第一部分 前端</h3>
<h4>1, react</h4>
<p><code>react</code>的学习根据<a href="http://reactjs.cn/" rel="nofollow noreferrer" target="_blank">官方文档</a>, 主要是理解一下几个方面的内容:</p>
<ol>
<li><p>构建模块的方法. 用了推荐<code>es6</code>的<code>class</code>的方法而非<code>createClass</code>.</p></li>
<li><p>如何导入导出模块. <code>es6</code>的<code>import</code>和<code>export</code>.</p></li>
<li><p><code>jsx</code>的编写. 不是必要的, 官网推荐. 感觉其中用上<code>es6</code>模板字符串, <code>map</code>方法会很方便很多~</p></li>
<li><p><code>props</code>, <code>state</code>, <code>refs</code>的相关概念以及使用. 单向数据流中, 父组件给子组件传递数据通过<code>props</code>, 子组件给父组件传递数据用回调函数. 后者的实现是通过父组件把一个函数传到子组件中, 这个函数里面有可以有<code>this.setState</code>(收到子组件的数据后立刻渲染), 然后子组件调用传进来的函数, 通过这个函数把参数传给父组件.</p></li>
<li><p>掌握<code>connect</code>组件的使用方法. 把<code>state</code>数据和<code>dispatch</code>传进组件中.</p></li>
<li>
<p>生命周期. 在这个博客SPA应用里用了<code>componentDidMount</code>和<code>componentWillReceiveProps</code>, 前者可用于初始化的渲染以及异步请求的发起, 后者用于接收到新的数据时的再次渲染, 把异步的结果渲染出来. 因此一个组件(涉及到异步)是这样工作的: <code>调用组件</code> -&gt; <code>组件渲染之前发起异步请求</code> -&gt; <code>第一次渲染,没有数据的页面</code> -&gt; <code>接收到异步发回来的数据</code> -&gt; <code>重新渲染, 有数据的页面</code>. 代码如下, 基本也是按照这种数据流向的方法来的(不知道是不是最好的方案, 但是感觉很方便).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Archive extends React.Component {
    constructor(props) {
    super(props);
    this.displayName = 'Archive';
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    this.props.actions.getTitles({
      type: &quot;ARCHIVE&quot;
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      articles: nextProps.getTitles.articles
    })
  }

  render() { 
    return (
      <div className={style.archive}>
        {/*这里是相关的渲染articles的操作, 注意要把[]的情况也考虑到*/}
      </div>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Archive</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.displayName = <span class="hljs-symbol">'Archiv</span>e';
    <span class="hljs-keyword">this</span>.state = {
      articles: []
    }
  }

  componentDidMount() {
    <span class="hljs-keyword">this</span>.props.actions.getTitles({
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-string">"ARCHIVE"</span>
    })
  }

  componentWillReceiveProps(nextProps) {
    <span class="hljs-keyword">this</span>.setState({
      articles: nextProps.getTitles.articles
    })
  }

  render() { 
    <span class="hljs-keyword">return</span> (
      &lt;div className={style.archive}&gt;
        {<span class="hljs-comment">/*这里是相关的渲染articles的操作, 注意要把[]的情况也考虑到*/</span>}
      &lt;/div&gt;
    )
}</code></pre>
<p>}</p>
<p>export default Archive</p>
</li>
</ol>
<p>配合好<code>setState</code>和生命周期, 运用好父子组件之间的数据传递能够很好地完成各种异步渲染.</p>
<h4>2, redux</h4>
<p>理解<code>redux</code>主要是要理解<code>action</code>, <code>reducer</code>, <code>middleware</code>等概念. 个人感觉<code>redux</code>的<a href="http://cn.redux.js.org/" rel="nofollow noreferrer" target="_blank">官方文档</a>简直精彩, 例子也很丰富, 非常值得学习. 这个<code>SPA</code>博客里的<code>action</code>大部分是为了ajax获取后端数据服务的. 下面选取了其中的一组, 功能是获取单独的文章. 对应不同相应状态有不同的<code>action</code>. 这样就可以把异步的每一个状态记录下来, 使得数据的流向更加清晰. 具体有关异步请求的相关的内容可以看我的<a href="https://segmentfault.com/a/1190000005906458">上一篇文章</a>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const singleRequest = () => {
  return {
    type: SINGLE_REQUEST
  }
}

export const singleSuccess = (article) => {
  return {
    type: SINGLE_SUCCESS,
    article: article
  }
}

export const singleFailure = () => {
  return {
    type: SINGLE_FAILURE
  }
}

export const getSingle = (day, title) => {
  return dispatch => {
    dispatch(singleRequest())
    return fetch('/api/single', {
      method: &quot;POST&quot;,
      headers: {
        &quot;Content-Type&quot;: &quot;application/json&quot;,
        &quot;Accept&quot;: &quot;application/json&quot; 
      },
      body: JSON.stringify({
        day: day,
        title: title
      })
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        dispatch(singleSuccess(res.article))
      } else {
        dispatch(singleFailure())
      }
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> singleRequest = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>: SINGLE_REQUEST
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> singleSuccess = <span class="hljs-function">(<span class="hljs-params">article</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>: SINGLE_SUCCESS,
    article: article
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> singleFailure = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">type</span>: SINGLE_FAILURE
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getSingle = <span class="hljs-function">(<span class="hljs-params">day, title</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">dispatch</span> =&gt;</span> {
    dispatch(singleRequest())
    <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">'/api/single'</span>, {
      method: <span class="hljs-string">"POST"</span>,
      headers: {
        <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/json"</span>,
        <span class="hljs-string">"Accept"</span>: <span class="hljs-string">"application/json"</span> 
      },
      body: <span class="hljs-built_in">JSON</span>.stringify({
        day: day,
        title: title
      })
    })
    .then(checkHttpStatus)
    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
      <span class="hljs-keyword">if</span>(res.ok) {
        dispatch(singleSuccess(res.article))
      } <span class="hljs-keyword">else</span> {
        dispatch(singleFailure())
      }
    })
  }
}
</code></pre>
<p>至于在<code>reducer</code>中, 初始化<code>state</code>用了几个标识. 比如下面的例子中, 初始化的<code>reducer state</code> 包含了<code>isFetching</code>, <code>isFetched</code>, <code>fetchFailure</code>这些标志异步进行的当前状态的信息. 传入<code>props</code>之后可以很方便地进行异步请求先后的设置. 比方说一个异步要在另一个异步之后, 就可以通过读取这几个数值完成. (第二个异步一定要在第一个的<code>isFetched</code>为<code>true</code>的时候才能发起)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const initialState = {
  isFetching: false,
  isFetched: false,
  fetchFailure: false,
  articles: [],
  count: 1
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">initialState</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  isFetching:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  isFetched:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  fetchFailure:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">  articles:</span> <span class="hljs-string">[],</span>
<span class="hljs-attr">  count:</span> <span class="hljs-number">1</span>
<span class="hljs-string">}</span>
</code></pre>
<p>在整个应用中需要用到中间件, 在应用中用了<code>thunk</code>还有<code>logger</code>.</p>
<h4>3, css-modules</h4>
<p>在博客应用中<code>css</code>的引入用的是<code>css-modules</code>, 阮一峰大神的<a href="http://www.ruanyifeng.com/blog/2016/06/css_modules.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>讲得算是完整了, 感兴趣可以看一下~ 当然有些部分也还是用了<code>css in js</code>的方法, 直接把<code>css</code>写到<code>js</code>里面, 主要是考虑到一些操作的方便, 比如点击之后某一个标签<code>display</code>改变之类的.</p>
<hr>
<h3 id="articleHeader2">第二部分 后端</h3>
<p>说来惭愧, 后端大部分都是"抄"的, 之前看的一个教程是用<code>express</code>和<code>ejs</code>写的博客应用, 而后端的操作大部分都比较接近. 主要就是根据接口路由处理数据, 发送数据, 通过数据库<code>api</code>(这里是<code>mongodb</code>)读取数据库数据. 所以最后写出来的和我原本看的那个教程有很大的相似之处. 我看的教程是<a href="https://github.com/nswbmw/N-blog/wiki/_pages" rel="nofollow noreferrer" target="_blank">这一个</a>, 非常棒, 感谢作者!!&gt;o&lt;!!</p>
<h4>1, express (nodejs)</h4>
<p>关于<code>express</code>个人感觉比较重要的是处理配置以及路由两个方面的问题.<br>前者需要靠自己慢慢摸索, 比如要处理<code>json</code>需要用到<code>bodyParser</code>模块, <code>webpack</code>一些中间件的配置等等, 可以拿<code>redux</code>官网还有上面提到的教程来参考一下.<br>后者主要是要了解<code>express</code>提供的各种方法, 以及一些有关res和req的相关操作等等.</p>
<h4>2, mongodb</h4>
<p>有关数据库的操作我也是参考上面的教程的...(oh..)基本对数据库的增删查改要掌握. 更多有关<code>mongo</code>的<code>api</code>原理等可以去看官网介绍.</p>
<h4>3, 不足之处</h4>
<p>由于目标不是专业后端, 所以后端做得比较粗糙. 不足之处有很多, 比如没有拥抱<code>es6</code>(明明前端已经拥抱), 比如还在若无其事地写着臭名昭著的回调金字塔等等等. <code>nodejs</code>需要加强.</p>
<hr>
<h3 id="articleHeader3">第三部分 前后端</h3>
<h4>1, 登录 (JSON Web Token)</h4>
<p>有关登录和登出开始找了很多相关的实现方法, 在这篇文章的推荐下看了<a href="https://github.com/joshgeller/react-redux-jwt-auth-example" rel="nofollow noreferrer" target="_blank">JWT实现方式</a>. 简单来说就是前端把密码<code>post</code>到后端, 后端生成一个<code>token</code>然后发送到前端去. 前端把收到的<code>token</code>保存在<code>localStorage</code>中. 每次需要获取一些保密的信息或者需要做一些修改的时候, 把这个<code>token</code>写在请求的<code>headers</code>里. 后端收到数据之后就会先验证一下<code>token</code>是否正确, 正确才允许操作.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="headers: {
        &quot;Content-Type&quot;: &quot;application/json&quot;,
        &quot;Accept&quot;: &quot;application/json&quot;,
        &quot;Authorization&quot;: `Bearer ${token}`
      }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code><span class="hljs-symbol">headers:</span> {
        <span class="hljs-string">"Content-Type"</span>: <span class="hljs-string">"application/json"</span>,
        <span class="hljs-string">"Accept"</span>: <span class="hljs-string">"application/json"</span>,
        <span class="hljs-string">"Authorization"</span>: `Bearer ${token}`
      }
</code></pre>
<h4>2,fetch (获取数据)</h4>
<p>关于前后端交互这一点可以参考我写的<a href="https://segmentfault.com/a/1190000005906458">上一篇文章</a>. 后端把<code>api</code>暴露出来给前端, 前端通过<code>ajax</code>进行数据的交互, 并把获取到的数据渲染出来. 操作上没有难度, 只是要注意异步操作中<code>redux</code>要用中间件.<br>有关中间件还要去看点高阶函数的基础知识, 不然无法正确理解.</p>
<hr>
<h3 id="articleHeader4">第四部分 其他</h3>
<h4>1,webpack</h4>
<p>没有怎么认真地看<code>webpack</code>的东西, 都是顺手操起来直接用的...<br>说实话, 第一次开始看<code>chrome</code>的<code>devtool</code>的<code>network</code>的时候, 我被吓得不轻...一个<code>bundle</code>文件<code>5m</code>大, <code>PC</code>端打开之后真的是不忍直视. 后来上网找了一些<code>webpack</code>打包优化的方向, 在这里记录一下:</p>
<ol>
<li><p><code>webpack</code>的config文件里面不能有<code>cheap-module-eval-source-map</code>之类的<code>devtool</code>, 真的很大很大...</p></li>
<li><p><code>plugin</code>如果不是必要的话也请删去吧. 不过有两个<code>plugin</code>可以在生产环境中用一下, 第一个是<code>UglifyJsPlugin</code>, 用于压缩文件. 第二个是<code>CommonsChunkPlugin</code>, 这个具体下一点解释.</p></li>
<li><p>适当分块. <code>CommonsChunkPlugin</code>用于把bundle分块, 把可以放在缓存的, 常用的, 体积比较大的压缩到<code>vendor</code>里面(比如<code>react</code>等). 后来又把<code>babel-polyfill</code>分开另外加载了. 之前有看到<code>code split</code>, 就是直到需要用到该<code>ui</code>组件的时候才去加载, 想法好像不错, 不过感觉改动会比较大所以最后没有做.</p></li>
</ol>
<p>最后的文件大小其实也还是不小, 但是有了很好的改善. 关于前端优化也是一个重要的话题.</p>
<h4>2,markdown</h4>
<p>博客应用写作用的是<code>markdown</code>. 原本想找一个现成的, 但是死活找不到合适的...最后直接用<code>marked</code>强行伪装<code>markdown</code>编辑器...其实这很不安全, 但目前也没有什么办法...(<code>draft.js</code>貌似可以?)</p>
<hr>
<h3 id="articleHeader5">总结</h3>
<p>总体来说, 这个博客其实实现起来没有特别高的难度, 但是对于初学者来说感觉真的挺不容易的. 之前听过这样一句话--不要同时学几样东西, 其实还真的有点道理...但是对于一些最佳实践, 本身就要结合在一起才能发挥其最大的作用, 不一起学又怎么能行呢?(因此就陷入了大坑).<br>这个博客不完善的地方太多了, 特别是有关安全方面的问题.不过现在还是先关注着前端吧.</p>
<p>希望这篇文章能够给你一点点帮助.<br>最后上代码<a href="https://github.com/harryfyodor/React-Express-SPA-blog" rel="nofollow noreferrer" target="_blank">博客代码</a></p>
<p>(本人是初学者, 如果有什么说得不对, 不好的地方欢迎指出来, 感激不尽!~互相学习!~)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始编写React-Express单页博客应用(学习总结)

## 原文链接
[https://segmentfault.com/a/1190000006082056](https://segmentfault.com/a/1190000006082056)

