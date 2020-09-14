---
title: 'create-react-app安装及使用' 
date: 2019-01-06 2:30:10
hidden: true
slug: rrf8e4jij99
categories: [reprint]
---

{{< raw >}}

                    
<p>create-react-app学习之前可以从它的官网开始了解</p>
<p><a href="https://reacttraining.com/react-router/web/guides/quick-start" rel="nofollow noreferrer" target="_blank">推荐网址</a></p>
<h1 id="articleHeader0">安装</h1>
<p><a href="https://facebook.github.io/react/docs/installation.html" rel="nofollow noreferrer" target="_blank">推荐网址</a></p>
<p>按这个步骤走下去：</p>
<ul>
<li><p>npm install -g create-react-app</p></li>
<li><p>create-react-app my-app</p></li>
</ul>
<p>使用命令创建应用，myapp为项目名称</p>
<ul><li><p>cd my-app</p></li></ul>
<p>进入目录，然后就启动</p>
<ul><li><p>npm start</p></li></ul>
<p>启动之后打开的页面：<br><span class="img-wrap"><img data-src="/img/bVR1Xa?w=1366&amp;h=318" src="https://static.alili.tech/img/bVR1Xa?w=1366&amp;h=318" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这是我现在的项目目录：<br><span class="img-wrap"><img data-src="/img/bVR1Xi?w=217&amp;h=209" src="https://static.alili.tech/img/bVR1Xi?w=217&amp;h=209" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下面代码：</p>
<p>如果觉得不舒服，可以自己新建文件夹</p>
<p>在App.js先写一些东西，看看它是否运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <h1>asdfghj</h1>
    );
  }
}

export default App;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;h1&gt;asdfghj&lt;/h1&gt;
    );
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">App</span>;
</code></pre>
<p>这是运行的效果图：<br><span class="img-wrap"><img data-src="/img/bVR1Xy?w=629&amp;h=256" src="https://static.alili.tech/img/bVR1Xy?w=629&amp;h=256" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>安装最后一步:<a href="https://www.npmjs.com/package/react-router-dom" rel="nofollow noreferrer" target="_blank">推荐网址</a></p>
<ul><li><p>npm install --save react-router-dom</p></li></ul>
<p>安装完之后可以在项目目录src下创建几个文件夹<br><span class="img-wrap"><img data-src="/img/bVR1XE?w=230&amp;h=485" src="https://static.alili.tech/img/bVR1XE?w=230&amp;h=485" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看我的代码：</p>
<h4>App.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React,{ Component } from 'react';
import { BrowserRouter, Route,Link} from 'react-router-dom';


import Home from './components/Home';
import Product from './components/Product';
import About from './components/About';

class App extends Component {
    render() {
        return (
          <BrowserRouter>
            <div>
              <a href=&quot;/abc&quot;>家</a>
              <a href=&quot;/abc1&quot;>产品</a>
              <a href=&quot;/abc2&quot;>我们</a>
              <br/>
              <Link to=&quot;abc&quot;> 家</Link>
              <Link to=&quot;abc1&quot;> 产品</Link>
              <Link to=&quot;abc2&quot;>我们</Link>
              <br/>
              <Route path=&quot;/abc&quot; component={Home}/>
              <Route path=&quot;/abc1&quot; component={Product}/>
              <Route path=&quot;/abc2&quot; component={About}/>
            </div>
              
          </BrowserRouter>
               
        );
    }
}

export default App;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">import</span> React,{ Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { BrowserRouter, Route,Link} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;


<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Home'</span>;
<span class="hljs-keyword">import</span> Product <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Product'</span>;
<span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/About'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> {</span>
    render() {
        <span class="hljs-keyword">return</span> (
          &lt;BrowserRouter&gt;
            &lt;div&gt;
              &lt;a href=<span class="hljs-string">"/abc"</span>&gt;家&lt;/a&gt;
              &lt;a href=<span class="hljs-string">"/abc1"</span>&gt;产品&lt;/a&gt;
              &lt;a href=<span class="hljs-string">"/abc2"</span>&gt;我们&lt;/a&gt;
              &lt;br/&gt;
              &lt;Link <span class="hljs-keyword">to</span>=<span class="hljs-string">"abc"</span>&gt; 家&lt;/Link&gt;
              &lt;Link <span class="hljs-keyword">to</span>=<span class="hljs-string">"abc1"</span>&gt; 产品&lt;/Link&gt;
              &lt;Link <span class="hljs-keyword">to</span>=<span class="hljs-string">"abc2"</span>&gt;我们&lt;/Link&gt;
              &lt;br/&gt;
              &lt;Route path=<span class="hljs-string">"/abc"</span> component={Home}/&gt;
              &lt;Route path=<span class="hljs-string">"/abc1"</span> component={Product}/&gt;
              &lt;Route path=<span class="hljs-string">"/abc2"</span> component={About}/&gt;
            &lt;/div&gt;
              
          &lt;/BrowserRouter&gt;
               
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;
</code></pre>
<h4>About.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class About extends React.Component {
    render() {
        return (
                <h1>关于我们</h1>
        );
    }
}

export default About;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">About</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
                &lt;h1&gt;关于我们&lt;/h1&gt;
        );
    }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">About</span>;
</code></pre>
<h4>Home.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class Home extends React.Component {
    render() {
        return (
                <h1>hihihihi</h1>
        );
    }
}

export default Home;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
                &lt;h1&gt;hihihihi&lt;/h1&gt;
        );
    }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Home</span>;
</code></pre>
<h4>Product.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class Product extends React.Component {
    render() {
        return (
                <h1>产品列表</h1>
        );
    }
}

export default Product;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">'reac</span>t';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Product</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
                &lt;h1&gt;产品列表&lt;/h1&gt;
        );
    }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Product</span>;
</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVR1XJ?w=525&amp;h=233" src="https://static.alili.tech/img/bVR1XJ?w=525&amp;h=233" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
create-react-app安装及使用

## 原文链接
[https://segmentfault.com/a/1190000010454922](https://segmentfault.com/a/1190000010454922)

