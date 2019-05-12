---
title: '如何在React中做Ajax 请求？' 
date: 2019-01-31 2:31:16
hidden: true
slug: kn2zepyakc
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">如何在React中做Ajax 请求？</h3>
<p>首先：<code>React</code>本身没有独有的获取数据的方式。实际上，就<code>React</code>而言，它甚至不知道有服务器画面的存在。</p>
<p><code>React</code>只是简单地渲染组件，单独从两个地方获取数据：<code>props</code> 和 <code>state</code>。</p>
<p>因此，为了使用服务器的数据，你需要在你的组件（component）的<code>props</code>或<code>state</code>里拿到数据。</p>
<p>你可以将这个过程与服务和数据模型复杂化，就像你所希望的那样，但最终只是组件渲染<code>props</code>和<code>state</code>。</p>
<h3 id="articleHeader1">选择一个HTTP 库</h3>
<p>为了获取来自服务器的数据，你需要一个<code>HTTP</code>库，网上有很多，最终他们都做同样的事情，但他们有不同的特点。</p>
<ul>
<li><p>喜欢 <code>Promise</code>？那就选<code>axios</code>吧：<a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">https://github.com/mzabriskie...</a></p></li>
<li><p>讨厌<code>Promise</code>?，但是喜欢<code>callback</code>？不妨看看<code>superagent</code>？<a href="https://github.com/visionmedia/superagent" rel="nofollow noreferrer" target="_blank">https://github.com/visionmedi...</a></p></li>
</ul>
<p>当然，你也可以选择自己封装一个ajax库，我喜欢Axios，下面将以这个库作为例子，如果你不喜欢，可以选择其他库看看。</p>
<h3 id="articleHeader2"><code>Fetch Data</code></h3>
<p>如下是一个简单的实例，一个组件从<code>subreddit</code>获取职位。看看这个例子，我们将会了解它是如何工作的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import React from 'react';

import ReactDOM from 'react-dom';

import axios from 'axios';

class FetchDemo extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      posts: []

    };

  }

  componentDidMount() {

    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)

      .then(res => {

        const posts = res.data.data.children.map(obj => obj.data);

        this.setState({ posts });

      });

  }



  render() {

    return (

      <div>

        <h1>{`/r/${this.props.subreddit}`}</h1>

        <ul>

          {this.state.posts.map(post =>

            <li key={post.id}>{post.title}</li>

          )}

        </ul>

      </div>

    );

  }

}

ReactDOM.render(

  <FetchDemo subreddit=&quot;reactjs&quot;/>,

  document.getElementById('root')

);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FetchDemo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

  <span class="hljs-keyword">constructor</span>(props) {

    <span class="hljs-keyword">super</span>(props);

    <span class="hljs-keyword">this</span>.state = {

      <span class="hljs-attr">posts</span>: []

    };

  }

  componentDidMount() {

    axios.get(<span class="hljs-string">`http://www.reddit.com/r/<span class="hljs-subst">${<span class="hljs-keyword">this</span>.props.subreddit}</span>.json`</span>)

      .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {

        <span class="hljs-keyword">const</span> posts = res.data.data.children.map(<span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> obj.data);

        <span class="hljs-keyword">this</span>.setState({ posts });

      });

  }



  render() {

    <span class="hljs-keyword">return</span> (

      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{`/r/${this.props.subreddit}`}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>

          {this.state.posts.map(post =&gt;

            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

          )}

        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

    );

  }

}

ReactDOM.render(

  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FetchDemo</span> <span class="hljs-attr">subreddit</span>=<span class="hljs-string">"reactjs"</span>/&gt;</span>,

  document.getElementById('root')

);
</span></code></pre>
<h3 id="articleHeader3">它是如何工作的？</h3>
<p>首先，我们将<code>axios</code> 库<code>import</code>进来。</p>
<p>然后在<code>constructor</code> 里先调用<code>super</code>，接着初始化<code>state</code>，让它拥有一个<code>posts</code>空数组。</p>
<p><code>componentDidMount</code>是关键所在，这个方法将会在组件插入<code>DOM</code>的第一时间执行。该方法在整个组件的生命周期只会执行一次。</p>
<p>它使用<code>axios.get</code>方法从<code>subreddit</code>获取数据，反引号的字符串是<code>ES6</code>的模板字符串，<code>${}</code>部分是由表达式的值所取代，所以<code>URL</code>传递给<code>axios.get</code>实际上是<a href="http://www.reddit.com/r/reactjs.json" rel="nofollow noreferrer" target="_blank">http://www.reddit.com/r/react...</a>。</p>
<p>有两点你需要注意的是：</p>
<ul>
<li><p>你可以在任意的subreddit URL末尾处附加上<code>.json</code>并且获得那个职位的json形式的展示</p></li>
<li><p>如果你忘记<code>www</code>，你会得到一个CORS错误</p></li>
</ul>
<p>因为<code>Axios</code>使用<code>Promise</code>，所有我们可以链式调用<code>then</code>方法来处理<code>response</code>。获取的职位信息是一点一点的转换后提取的，最重要的一点是，组件的状态(state)是由职位与新数组调用<code>this.setState</code>更新的，由此触发一个重新渲染，然后职位的信息就可以看见了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在React中做Ajax 请求？

## 原文链接
[https://segmentfault.com/a/1190000007564792](https://segmentfault.com/a/1190000007564792)

