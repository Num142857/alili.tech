---
title: '不懂函数式？用mobx来写react应用吧' 
date: 2019-02-06 2:30:09
hidden: true
slug: pdsumwysnrc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">目的</h1>
<p>直接了当吧：其实这篇就是想安利大家一个新的状态管理库。如果你使用react，更熟悉面向对象，羡慕vue的简单直观，对redux感觉有些烦躁，真心安利你，体验下<code>mobx</code>.</p>
<p>安利的同时，略带些内容。内容走起</p>
<h1 id="articleHeader1">内容</h1>
<p>因为看到<code>redux</code>的作者，在twitter推荐了<code>mobx</code>这个库:</p>
<blockquote><p>unhappy with redux? try mobx</p></blockquote>
<p>大神主动推荐自己成名作品的替代品？！！！</p>
<p>于是立马尝试。不到一个下午的时间，基本上手，然后晚上回去想了想代码组织的问题，试用了起来。发现开发效率大幅提升，而且整个工程的脉络很清楚。</p>
<p>然后回想起当初学redux，真感觉自己智商不够。看了一周文档，理念理解的七七八八，不知道如何写代码；然后因为源码不多，又看了一周redux的源码，还发现了个bug，提了pr，但是依旧不知道如何写代码。。最后只能硬着头皮无脑抄别人的代码，才大致明白了整个流程。</p>
<p>所以从自身实际情况的对比，有段时间略傻x的变成了redux无脑黑，并在很多场合说过，谁用redux谁加班。。。现在想想too simple</p>
<p>经过不断的讨论，觉得使用redux不爽，最大的原因是不熟悉函数式，而且js本身也没有在语法上为函数式提供什么便利。</p>
<p>redux更像是定了一种规范，然后为了能把这种规范应用到工程中，提供了几个帮助函数。如果对函数式很熟悉，那么会非常认同这套并很舒服的使用起来。</p>
<p>但是,熟悉函数式的工程师数量远比熟悉面向对象的少,我对函数式也就只了解个皮毛。。</p>
<p>言归正传，来看看<code>mobx</code>吧.</p>
<p>使用mobx的写react，大体上，步骤分为两步：</p>
<ol><li><p>写模型的class</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import $ from 'jquery' // just for ajax usage
    import { observable } from 'mobx'
    
    class Posts{
        @observable list=[]
        
        //这里为了演示，直接$.ajax。
        //但是这样的model，很难测试！！
        fetchPosts(){
            $.ajax({
                url:'/posts'
            }).done((data)=>{
                this.list = data.postList
            })
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span> <span class="hljs-comment">// just for ajax usage</span>
    <span class="hljs-keyword">import</span> { observable } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>
    
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Posts</span></span>{
        @observable list=[]
        
        <span class="hljs-comment">//这里为了演示，直接$.ajax。</span>
        <span class="hljs-comment">//但是这样的model，很难测试！！</span>
        fetchPosts(){
            $.ajax({
                <span class="hljs-attr">url</span>:<span class="hljs-string">'/posts'</span>
            }).done(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span>{
                <span class="hljs-keyword">this</span>.list = data.postList
            })
        }
    }</code></pre>
<p>这个对于熟悉OOP的人，亲切的不行，写model类这事，有点经验的工程师，没写个上千个，也写个几百个吧。异步的处理，也很直白，请求，然后根据请求的数据，处理相应的属性。这段代码，如果不引入es6的语法，和以前jquery时代，写model没啥区别。</p>
<p>这里多了个 <code>@observable</code>。<code>decorator</code>目前在es7里还没定稿，通过<code>babel 6</code>使用也需要通过引入一个plugin，这里使用，能可以提高可读性。当然不使用<code>decorator</code>也可以，原理上，就是给<code>list</code>包了个函数，这个函数会对<code>list</code>进行处理，让对list的读写拥有了<code>pub/sub</code>的功能。</p>
<p>当然<code>mobx</code>提供的功能要比这多很多，根据官方描述</p>
<blockquote><p>MobX is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming (TFRP)</p></blockquote>
<p>大家注意两点 <code>battle tested</code>，<code>transparently applying functional reactive programming</code></p>
<p><code>mobx</code>做了大量的工作，能让你只关注操作对象属性即可，而背后的理念，就一句话</p>
<blockquote><p>Anything that can be derived from the application state, should be derived. Automatically.</p></blockquote>
<p>应用的状态是本源，其他的部分，都应该从本源导出（derived）。比如上面的Posts类，本源就是 <code>@observable list</code>.然后其他部分，依赖这个list去做一些事情，比如 <code>mobx</code>提供了<code>autorun</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//写在 class Posts里
autorun(()=>console.log(this.list.length))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-regexp">//</span>写在 <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Posts</span>里</span>
autorun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.list.length))
</code></pre>
<p>autorun里的匿名函数对list进行了取值，<code>mobx</code>知道，这个副作用函数，依赖list，所以list有变动，都会执行这个函数。这个函数的运行，是<code>list</code>这个应用状态驱动的。如果应用还有其他状态，<code>mobx</code>不会触发这个函数，因为这个函数只依赖 <code>list</code>.</p>
<p>使用react后，ui的变化也是状态变化后，产生的副作用。所以很自然</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="autorun(()=> redner(this.list))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>autorun(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> redner(<span class="hljs-keyword">this</span>.list))
</code></pre>
<p>那么状态的变化，就引起ui的变化，而且仅当<code>this.list</code>变化，才会引起ui的变化，其他应用状态的变化，不会产生影响，这也是<code>mobx</code>不需特别性能优化的原因，只有相关状态变动，才会影响ui。实际上，在只<code>render需要render的组件</code>方面，官方出的<code>mobx-react</code>做了更多的工作。</p>
<p>2.写react组件</p>
<p>有了上面的<code>class Posts</code>，我们有个组件要展示<code>post list</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import React from 'react'
    import { observer } from 'mobx-react'
    import Posts from './Posts'
    
    @observer
    class PostListComp extends React.component {
        contructor() {
            this.posts = new Posts();
            this.posts.fetchPosts()
        }
        
        render() {
            return (
                <ul>
                    {this.posts.list.map((post)=>(
                        <li key={post.id}>post.title</li>
                    ))}
                </ul>
            )
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
    <span class="hljs-keyword">import</span> { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>
    <span class="hljs-keyword">import</span> Posts <span class="hljs-keyword">from</span> <span class="hljs-string">'./Posts'</span>
    
    @observer
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PostListComp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">component</span> </span>{
        contructor() {
            <span class="hljs-keyword">this</span>.posts = <span class="hljs-keyword">new</span> Posts();
            <span class="hljs-keyword">this</span>.posts.fetchPosts()
        }
        
        render() {
            <span class="hljs-keyword">return</span> (
                <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                    {this.posts.list.map((post)=&gt;(
                        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span>&gt;</span>post.title<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    ))}
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
            )
        }
    }</code></pre>
<p>这里<code>Posts实例</code>不打算全局使用，所以赋值在 this.posts上。开始的时候，<code>this.posts.list</code>是[],这ok，ul里是空的，<code>fetchPosts</code>中异步请求结束，<code>this.posts.list</code>就有了从服务器取来的数据，这时mobx知道，这个react组件依赖于<code>this.post.list</code>，那渲染吧，就这样。</p>
<p>这里的状态是<code>PostListComp</code>组件自己new处理的，不和其他组件共享；如果想共享，可以放在两个组件的共同祖先那实例化，然后再各自传入，甚至根据业务，可以做成全局的单例。想想你处理对象的技巧，都能用在这里，如果你想用DI来管理这些对象，也可以，有文章介绍了mobx结合<code>InversifyJS</code>使用的情况。</p>
<p>如果<code>posts</code>是父组件传给<code>PostListComp</code>的，如果父组件的渲染不需要<code>posts.list</code>,<code>posts.list</code>的变化只会重渲染 <code>PostListComp</code>,而不会重渲染父组件。<code>只render需要render的组件</code>,所以性能优越。甚至可以做到下面这样（先不要纠结下面代码的一些细节）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const profileView = observer(props => {
       if (props.person.nickName)
          return <div>{props.person.nickName}</div>
    else
          return <div>{props.person.fullName}</div>
   });    
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> profileView = observer(<span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> {
       <span class="hljs-keyword">if</span> (props.person.nickName)
          <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{props.person.nickName}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    <span class="hljs-keyword">else</span>
          <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{props.person.fullName}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
   });    
   </code></pre>
<p>如果nickName不为空，那么mobx知道，这个view只依赖于nickName，fullName的变动不会引起view的变化，从而不会从新render组件。<code>只render需要render的组件</code>(这话我已经说了3遍了！)</p>
<h3 id="articleHeader2">其他的api</h3>
<p><code>mobx</code>还提供了其他一些api，相对高级点，比如</p>
<ol>
<li><p><code>@computed</code>: 由最开始的state生成出来的state，比如 <code>fullName</code>是由firstName和lastName生成的，如果firstName改变，fullName会重计算。监听@computed属性，和监听@observable属性，在使用上是一样的。理论上，可以写无数多层这样的依赖。</p></li>
<li><p><code>untrack</code>：在某一时刻使用了state的某个属性，但是不想对这个state属性产生依赖</p></li>
<li><p><code>transaction</code>:在<code>transaction</code>块中执行的属性修改，只会在块结束时，触发一次<code>Derivations</code>的变更或执行。这就避免了不必要的多次副作用，比如多次 render react组件。</p></li>
<li><p><code>useStrict</code>： 非严格模式下的mobx，任何地方都可以修改state，这样很快就会让state的管理难以维护。严格模式下，只有标记了<code>@action</code>的函数或在<code>runInAction</code>中的代码，才能修改state。这个强烈建议使用</p></li>
<li><p>spy &amp; intercept 做单个state或全局所有state的拦截。这给log等功能，提供了很好的便利。</p></li>
</ol>
<p>还有一些，大家去读文档吧。</p>
<h1 id="articleHeader3">题外话</h1>
<p>model改变，ui自动变化，mobx写着，让我很有vue的感觉。感觉就是多了几个<code>decorator</code>.</p>
<h1 id="articleHeader4">缺点</h1>
<p>社区还不够丰富。mobx的资料还不多，基本没有中文资料。我安利的同学，都反映官方的get start（英文）看着有点蛋疼。然后我说，想想你们写redux的第一个demo，然后他们表示刚才的疼不算什么~。</p>
<p>相信大家手上已经有些项目用redux了，如果用着也算顺手，其实也就没必要换了。我本人也同时维护着使用redux的项目，然后在新项目里使用mobx，我的效率是大幅提升的，但是老项目重写的代价太大。。。</p>
<h1 id="articleHeader5">结论</h1>
<p>所以，如果你使用react，更熟悉面向对象，羡慕vue的简单直观，真心安利你，体验下mobx。写的很舒爽，而且程序的性能有保证。对了官方还提供了一个dev-tools，非常不错，能够直接看到哪些组件被重渲染了。</p>
<p>如果你被安利成功，想看看mobx，建议从官方文档开始，或者去官方的推荐列表里，找找视频教程（不要想，肯定是英文的），地址是 <a href="http://mobxjs.github.io/mobx/faq/blogs.html" rel="nofollow noreferrer" target="_blank">http://mobxjs.github.io/mobx/faq/blogs.html</a></p>
<p>官方还提供了一个<a href="https://github.com/mobxjs/mobx-react-boilerplate" rel="nofollow noreferrer" target="_blank">starter</a>，可以省去各种配置。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不懂函数式？用mobx来写react应用吧

## 原文链接
[https://segmentfault.com/a/1190000006125797](https://segmentfault.com/a/1190000006125797)

