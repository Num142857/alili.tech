---
title: '引入计算属性、action、动态内容' 
date: 2019-02-10 2:30:42
hidden: true
slug: u5umraeu4m
categories: [reprint]
---

{{< raw >}}

                    
<p>文章来源：<a href="http://xcoding.tech/2016/03/31/Ember-Demo/%E5%BC%95%E5%85%A5%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E3%80%81action%E3%80%81%E5%8A%A8%E6%80%81%E5%86%85%E5%AE%B9/" rel="nofollow noreferrer" target="_blank">引入计算属性、action、动态内容</a></p>
<h2 id="articleHeader0">美化主页，增加邮件输入框</h2>
<p>在主页中增加一个<a href="http://www.bootcss.com" rel="nofollow noreferrer" target="_blank">Bootstrap</a>的<code>jumbotron</code>，在这个<code>jumbotron</code>组件中增加一个<code>input</code>输入框和一个<code>button</code>按钮。</p>
<h3 id="articleHeader1">在首页index.hbs中增加静态HTML代码</h3>
<p>为了界面的美化在HTML代码中使用了很多<a href="http://www.bootcss.com" rel="nofollow noreferrer" target="_blank">Bootstrap</a>的样式，更多有关Bootstrap的使用请自行学习。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;jumbotron text-center&quot;>
    <div class=&quot;form-horizontal form-group form-group-lg row&quot;>
        <div class=&quot;col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2&quot;>
          <input type=&quot;email&quot; class=&quot;form-control&quot; placeholder=&quot;Please type your e-mail address.&quot; autofocus=&quot;autofocus&quot;/>
        </div>
        <div class=&quot;col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3&quot;>
            <button class=&quot;btn btn-primary btn-lg btn-block&quot;>Request invitation</button>
        </div>

    </div>

</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"jumbotron text-center"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-horizontal form-group form-group-lg row"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"email"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Please type your e-mail address."</span> <span class="hljs-attr">autofocus</span>=<span class="hljs-string">"autofocus"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary btn-lg btn-block"</span>&gt;</span>Request invitation<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>等待项目重启完成，可以在首页看到如下效果页面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006896607?w=2550&amp;h=1196" src="https://static.alili.tech/img/remote/1460000006896607?w=2550&amp;h=1196" alt="首页效果截图" title="首页效果截图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">计算属性</h2>
<p>计算属性简单讲它就是一个特殊点的JS函数。如果你看过<a href="http://blog.ddlisting.com/2016/03/17/ember-js-ru-men-zhi-nan-ji-suan-shu-xing-compute-properties/" rel="nofollow noreferrer" target="_blank">Ember.js 入门指南之三计算属性（compute properties）</a>相信使用起来会比较简单，再次不过多介绍。</p>
<h3 id="articleHeader3">计算属性使用</h3>
<p>下面几点需求可以通过计算属性去实现：</p>
<ol>
<li>当输入框的为空时按钮“Request invitation”不可用</li>
<li>当输入的邮箱号码格式不正确时按钮“Request invitation”不可用</li>
<li>点击按钮“Request invitation”之后显示响应信息</li>
<li>数据保存完成之后情况邮箱输入框的内容</li>
</ol>
<h3 id="articleHeader4">isDisabled属性</h3>
<p>既然介绍了计算属性那么应该拿来用了！我们使用属性<code>isDisabled</code>控制按钮“Request invitation”是否可用。在<code>button</code>标签上增加一个HTML属性<code>disabled</code>，这个HTML属性决定了按钮<code>button</code>是否可用。当HTML属性<code>disabled=true</code>时按钮不可用，当HTML属性<code>disabled=false</code>时按钮可用，那么如何控制这个值是<code>true</code>还是<code>false</code>呢？别忘了在Handlebars模板中可以直接使用<code>"{{""}}"</code>表达式获取属性的值，下面修改模板<code>index.hbs</code>，在标签<code>button</code>中增加属性<code>disabled</code>的设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button class=&quot;btn btn-primary btn-lg btn-block&quot; disabled="{{"isDisabled"}}">Request invitation</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary btn-lg btn-block"</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">"{{"isDisabled"}}"</span>&gt;</span>Request invitation<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>那要在哪里控制<code>isDisabled</code>的值呢？目前有2种方式，第一是在路由<code>route</code>中控制这个值，另外一种是在控制器<code>controller</code>中控制这个属性的值。有关路由的信息在前一篇已经简单介绍过，或者看<a href="http://blog.ddlisting.com/2016/03/25/ember-js-ru-men-zhi-nan-zhi-er-shi-lu-you-ding-yi/" rel="nofollow noreferrer" target="_blank">Ember.js 入门指南之二十路由定义</a>学习。与路由同理，每个模板都对应有一个同名的控制器<code>controller</code>，如果你学习过MVC模式那么你应该很清楚什么是控制器，Ember中的控制器作用于MVC模式中的控制器相似，不过需要注意的是从<code>Ember 3.0</code>之后控制器将不再支持，所以呢！会在后面用组件替代控制器，官方也是这么推荐的！更多有关控制器的介绍请看<a href="https://guides.emberjs.com/v2.4.0/controllers/" rel="nofollow noreferrer" target="_blank">Controller Introduction</a>。<br>同样的我们仍然是使用Ember CLI创建控制器，命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember g controller index" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">ember g controller <span class="hljs-keyword">index</span></code></pre>
<p>创建好控制器之后，在控制器内添加设置属性<code>isDisabled</code>的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/controller/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
    isDisabled: true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/controller/index.js</span>

<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Controller.extend({
    <span class="hljs-attr">isDisabled</span>: <span class="hljs-literal">true</span>
});</code></pre>
<p>等待项目重启完毕，可以看到按钮是不可用，如果你把属性<code>isDisabled</code>设置为<code>false</code>那么按钮是可用的。</p>
<h2 id="articleHeader5">计算属性与观察者</h2>
<p>计算属性和观察者是Ember非常重要的特性。更多有关它们的特性请看下面的文章：</p>
<ol>
<li><a href="http://blog.ddlisting.com/2016/03/17/ember-js-ru-men-zhi-nan-ji-suan-shu-xing-compute-properties/" rel="nofollow noreferrer" target="_blank">Ember.js 入门指南之三计算属性</a></li>
<li><a href="https://guides.emberjs.com/v2.4.0/object-model/computed-properties/" rel="nofollow noreferrer" target="_blank">计算属性官方参考文档</a></li>
<li><a href="http://blog.ddlisting.com/2016/03/17/ember-js-ru-men-zhi-nan-guan-cha-zhe-observer/" rel="nofollow noreferrer" target="_blank">Ember.js 入门指南之四观察者</a></li>
<li><a href="https://guides.emberjs.com/v2.4.0/object-model/observers/" rel="nofollow noreferrer" target="_blank">观察者官方参考文档</a></li>
</ol>
<p>在下面的代码中有关计算属性部分使用的<code>2.0</code>之后的语法，在<code>2.0</code>之前计算属性的语法是不一样的（<a href="https://guides.emberjs.com/v1.12.0/object-model/computed-properties/" rel="nofollow noreferrer" target="_blank">旧语法</a>）。</p>
<p>修改模板<code>index.hbs</code>，把邮箱号码输入框改为Ember的<code>"{{"input"}}"</code>助手。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- <input type=&quot;email&quot; class=&quot;form-control&quot; placeholder=&quot;Please type your e-mail address.&quot; autofocus=&quot;autofocus&quot;/> -->
"{{"input type=&quot;email&quot; value=emailAddress class=&quot;form-control&quot; placeholder=&quot;Please type your e-mail address.&quot; autofocus=&quot;autofocus&quot;"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- &lt;input type="email" class="form-control" placeholder="Please type your e-mail address." autofocus="autofocus"/&gt; --&gt;</span>
"{{"input type="email" value=emailAddress class="form-control" placeholder="Please type your e-mail address." autofocus="autofocus""}}"</code></pre>
<p>等待项目重启之后可以看到界面并没有变化。<code>"{{"input"}}"</code>起到与原来代码同样的作用。  </p>
<p>值得注意的是<code>value=emailAddress</code>，并不是<code>value="emailAddress"</code>。你可以在控制器中通过名字<code>emailAddress</code>获取输入框的值。如果是<code>value="emailAddress"</code>这种方式，输入框的值默认一直都是"emailAddress"，并且在控制器中不能使用属性<code>emailAddress</code>获取值。这一点与平常我们获取<code>&lt;input&gt;</code>输入框的值有差别，通常获取<code>&lt;input&gt;</code>输入框的值是通过<code>name</code>属性获取的。修改控制器代码，在控制器中增加个计算属性和一个观察器，以及一个普通属性<code>emailAddress</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/controller/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
    isDisabled: true, //设置默认值为true
    emailAddress: '',  // 设置默认值为空字符串
    // 定义一个计算属性，当属性emailAddress发生变化时会被执行不是主动执行的，是要有人调用才执行，
    // 比如执行：this.get('actualEmailAddress')去调用这个属性才会执行
    actualEmailAddress: Ember.computed('emailAddress', function() {
        console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
    }),
    // 定义一个观察器，当属性emailAddress发生变化时会自动执行，也就是说观察器会检测属性emailAddress值的变化
    emailAddressChanged: Ember.observer('emailAddress', function() {
        console.log('observer is called: ', this.get('emailAddress'));
    })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/controller/index.js</span>

<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Controller.extend({
    <span class="hljs-attr">isDisabled</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//设置默认值为true</span>
    emailAddress: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 设置默认值为空字符串</span>
    <span class="hljs-comment">// 定义一个计算属性，当属性emailAddress发生变化时会被执行不是主动执行的，是要有人调用才执行，</span>
    <span class="hljs-comment">// 比如执行：this.get('actualEmailAddress')去调用这个属性才会执行</span>
    actualEmailAddress: Ember.computed(<span class="hljs-string">'emailAddress'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'actualEmailAddress function is called: '</span>, <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'emailAddress'</span>));
    }),
    <span class="hljs-comment">// 定义一个观察器，当属性emailAddress发生变化时会自动执行，也就是说观察器会检测属性emailAddress值的变化</span>
    emailAddressChanged: Ember.observer(<span class="hljs-string">'emailAddress'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'observer is called: '</span>, <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'emailAddress'</span>));
    })
});</code></pre>
<p>下面我们做一个非常有趣的小测试。  </p>
<p>等待页面刷新完毕，打开浏览器控制台，选择标签<code>Ember</code>，在选择左侧的<code>/# Route</code>，找到<code>Controller</code>中名为<code>index</code>的，点击<code>$E</code>（如下图红色框出位置），然后再回到<code>Console</code>标签下。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005162038" src="https://static.alili.tech/img/remote/1460000005162038" alt="控制台" title="控制台" style="cursor: pointer; display: inline;"></span></p>
<p>点击<code>$E</code>在<code>Console</code>下可以看到类似<code>Ember Inspector ($E):  Class {__ember1459491972481: "ember470", __ember_meta__: Meta}</code>的信息。然后在控制台命令输入行输入<code>$E.get('actualEmailAddress')</code>代码的作用是获取计算属性的值。可以看到触发了计算属性方法，打印了日志，如下截图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005162040" src="https://static.alili.tech/img/remote/1460000005162040" alt="计算属性执行日志" title="计算属性执行日志" style="cursor: pointer; display: inline;"></span></p>
<p>然后再次执行<code>$E.get('actualEmailAddress')</code>计算属性方法不会被执行，因为计算属性检测的属性<code>emailAddress</code>值并没有发生变化，没有发生变化，计算属性方法不会被执行，手动修改输入框的值，结果可以看到计算属性方法再次执行了，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005162042" src="https://static.alili.tech/img/remote/1460000005162042" alt="修改输入框的值执行结果截图" title="修改输入框的值执行结果截图" style="cursor: pointer;"></span></p>
<p>然后在控制台命令行在输入<code>$E.set('emailAddress', 'example@example.com')</code>这句代码意思是修改输入框的值。可以看到观察器方法执行了，因为观察器检测到被检测的属性<code>emailAddress</code>发生了变化，只要被检测的属性发生了变化就会自动执行。可以看到如下截图的日志信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005162044" src="https://static.alili.tech/img/remote/1460000005162044" alt="观察器执行结果" title="观察器执行结果" style="cursor: pointer;"></span></p>
<p>并且可以看到邮箱号码输入框的值被置为<code>example@example.com</code>。然后在控制台命令行再次输入<code>$E.set('emailAddress', 'example@example.com')</code>观察器方法并不会执行了，即使你输入多次也不会执行，因为你输入的值<code>example@example.com</code>始终没有变化。如果你稍微修改输入的值那么可以看到观察器又执行了。比如输入<code>$E.set('emailAddress', 'test')</code>，可以看到控制台再次打印了日志信息。</p>
<p>测试观察器还有另外一种简单的方法，就是直接在邮件输入框直接输入某些内容。可以看到控制台会随着这输入的内容变化而变化，感觉就像是在检测键盘事件一样。下图是我输入<code>12@qq.com</code>控制台打印的日志信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005162046" src="https://static.alili.tech/img/remote/1460000005162046" alt="输入12@qq.com日志信息" title="输入12@qq.com日志信息" style="cursor: pointer;"></span></p>
<p>到此，我想你对计算属性和观察者应该有了一定的认识了！！</p>
<h2 id="articleHeader6">用计算属性修改isDisabled</h2>
<p>明白了计算属性之后，用计算属性重写<code>isDisabled</code>。控制器<code>index.js</code>代码修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/controller/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
    // isDisabled: true, //设置默认值为true

    emailAddress: '',  // 设置默认值为空字符串

    isDisabled: Ember.computed('emailAddress', function() {
        return '' === this.get('emailAddress');  //判断输入框内容是否为空
    })

    // 定义一个计算属性，当属性emailAddress发生变化时会被执行不是主动执行的，是要有人调用才执行，
    // 比如执行：this.get('actualEmailAddress')去调用这个属性才会执行
    // actualEmailAddress: Ember.computed('emailAddress', function() {
    //     console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
    // }),
    // 定义一个观察器，当属性emailAddress发生变化时会自动执行，也就是说观察器会检测属性emailAddress值的变化
    // emailAddressChanged: Ember.observer('emailAddress', function() {
    //     console.log('observer is called: ', this.get('emailAddress'));
    // })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/controller/index.js</span>

<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Controller.extend({
    <span class="hljs-comment">// isDisabled: true, //设置默认值为true</span>

    emailAddress: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 设置默认值为空字符串</span>

    isDisabled: Ember.computed(<span class="hljs-string">'emailAddress'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">''</span> === <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'emailAddress'</span>);  <span class="hljs-comment">//判断输入框内容是否为空</span>
    })

    <span class="hljs-comment">// 定义一个计算属性，当属性emailAddress发生变化时会被执行不是主动执行的，是要有人调用才执行，</span>
    <span class="hljs-comment">// 比如执行：this.get('actualEmailAddress')去调用这个属性才会执行</span>
    <span class="hljs-comment">// actualEmailAddress: Ember.computed('emailAddress', function() {</span>
    <span class="hljs-comment">//     console.log('actualEmailAddress function is called: ', this.get('emailAddress'));</span>
    <span class="hljs-comment">// }),</span>
    <span class="hljs-comment">// 定义一个观察器，当属性emailAddress发生变化时会自动执行，也就是说观察器会检测属性emailAddress值的变化</span>
    <span class="hljs-comment">// emailAddressChanged: Ember.observer('emailAddress', function() {</span>
    <span class="hljs-comment">//     console.log('observer is called: ', this.get('emailAddress'));</span>
    <span class="hljs-comment">// })</span>
});</code></pre>
<p>直接把简单属性<code>isDisabled</code>定义为计算属性，并且这个计算属性检测<code>emailAddress</code>值的变化，如果<code>emailAddress</code>值为空那么计算属性<code>isDisabled</code>的值为<code>true</code>否则值为<code>false</code>。从而实现判断按钮“Request invitation”是否可用。Ember封装了很多字符串判断方法，直接调用Ember封装好的现成的方法，代码再修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/controller/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
    // isDisabled: true, //设置默认值为true

    emailAddress: '',  // 设置默认值为空字符串

    // isDisabled: Ember.computed('emailAddress', function() {
    //     return '' === this.get('emailAddress');  //判断输入框内容是否为空
    // })

    isDisabled: Ember.computed.empty('emailAddress')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/controller/index.js</span>

<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Controller.extend({
    <span class="hljs-comment">// isDisabled: true, //设置默认值为true</span>

    emailAddress: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 设置默认值为空字符串</span>

    <span class="hljs-comment">// isDisabled: Ember.computed('emailAddress', function() {</span>
    <span class="hljs-comment">//     return '' === this.get('emailAddress');  //判断输入框内容是否为空</span>
    <span class="hljs-comment">// })</span>

    isDisabled: Ember.computed.empty(<span class="hljs-string">'emailAddress'</span>)
});</code></pre>
<p>更多有关计算属性封装好的方法请看<a href="http://emberjs.com/api/classes/Ember.computed.html" rel="nofollow noreferrer" target="_blank">EMBER.COMPUTED NAMESPACE</a>。</p>
<h3 id="articleHeader7">isValid</h3>
<p>记得前面“计算属性使用”这个小结提出了使用计算属性实现多个需求，其中有一个是实现判断输入的邮箱号码是否是正确格式的邮箱。现在再增加一个计算属性<code>isValid</code>判断输入的邮箱号码的格式是否正确。然后再把这个计算属性绑定到原来的计算属性<code>isDisabled</code>上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/controller/index.js

import Ember from 'ember';

export default Ember.Controller.extend({

    emailAddress: '',  // 设置默认值为空字符串

    emailAddress: '',  // 设置默认值为空字符串
    //  使用正则表达式判断邮箱格式，如果正确则返回true反之返回false
    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    // 把计算属性isValid绑定到isDisabled上
    isDisabled: Ember.computed.not('isValid')  //当`disabled=false`时按钮可用，所以正好需要取反
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/controller/index.js</span>

<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Controller.extend({

    <span class="hljs-attr">emailAddress</span>: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 设置默认值为空字符串</span>

    emailAddress: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 设置默认值为空字符串</span>
    <span class="hljs-comment">//  使用正则表达式判断邮箱格式，如果正确则返回true反之返回false</span>
    isValid: Ember.computed.match(<span class="hljs-string">'emailAddress'</span>, /^.+@.+\..+$/),
    <span class="hljs-comment">// 把计算属性isValid绑定到isDisabled上</span>
    isDisabled: Ember.computed.not(<span class="hljs-string">'isValid'</span>)  <span class="hljs-comment">//当`disabled=false`时按钮可用，所以正好需要取反</span>
});</code></pre>
<p>到此校验问题基本实现了，等待项目重启完成，可以看到默认状态下按钮不可用，并且当你输入的内容不符合邮箱格式时按钮也是不可用的，如果输入的内容是一个正确的邮箱那么此时按钮自动变为可用状态。不好截图，就不截图了！请读者自己试验！！</p>
<h2 id="articleHeader8">添加Action到控制器</h2>
<p>目前为止，输入检验也完成了，但你输入正确邮箱后添加按钮并不会发生任何事实，输入的内容也没有保存。下面开始介绍如何处理界面输入的内容。  </p>
<p>首先修改模板<code>index.hbs</code>，在模板中增加一个<code>"{{"action"}}"</code>标签，有关Action请看<a href="https://guides.emberjs.com/v2.4.0/templates/actions/" rel="nofollow noreferrer" target="_blank">Actions</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button class=&quot;btn btn-primary btn-lg btn-block&quot; disabled="{{"isDisabled"}}" "{{"action 'saveInvitation'"}}">Request invitation</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary btn-lg btn-block"</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">"{{"isDisabled"}}"</span> "{{"<span class="hljs-attr">action</span> '<span class="hljs-attr">saveInvitation</span>'"}}"&gt;</span>Request invitation<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>仅仅修改了模板中<code>&lt;button&gt;</code>标签，其他不变，保存等待项目重启，此时在界面输入正确的邮箱然后点击按钮你在浏览器的控制台看到如下错误信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005162048" src="https://static.alili.tech/img/remote/1460000005162048" alt="错误信息" title="错误信息" style="cursor: pointer;"></span></p>
<p>能看到错误信息说明你的项目是正确的，因为我们并没有定义<code>saveInvitation</code>，在控制器<code>index</code>中增加这个Action的定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/controller/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
    // isDisabled: true, //设置默认值为true

    emailAddress: '',  // 设置默认值为空字符串

    emailAddress: '',  // 设置默认值为空字符串
    //  使用正则表达式判断邮箱格式，如果正确则返回true反之返回false
    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    // 把计算属性isValid绑定到isDisabled上
    isDisabled: Ember.computed.not('isValid'),  //当`disabled=false`时按钮可用，所以正好需要取反

    actions: {
        saveInvitation: function() {
            //  注意alert中字符串两边使用的是 `  不是单引号或者双引号
            alert(`Saving of the following email address is in propgress: ${this.get('emailAddress')}`);
            // 模拟保存操作
            this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
            //  情况输入框内容
            this.set('emailAddress', '');
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/controller/index.js</span>

<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Controller.extend({
    <span class="hljs-comment">// isDisabled: true, //设置默认值为true</span>

    emailAddress: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 设置默认值为空字符串</span>

    emailAddress: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 设置默认值为空字符串</span>
    <span class="hljs-comment">//  使用正则表达式判断邮箱格式，如果正确则返回true反之返回false</span>
    isValid: Ember.computed.match(<span class="hljs-string">'emailAddress'</span>, /^.+@.+\..+$/),
    <span class="hljs-comment">// 把计算属性isValid绑定到isDisabled上</span>
    isDisabled: Ember.computed.not(<span class="hljs-string">'isValid'</span>),  <span class="hljs-comment">//当`disabled=false`时按钮可用，所以正好需要取反</span>

    actions: {
        <span class="hljs-attr">saveInvitation</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//  注意alert中字符串两边使用的是 `  不是单引号或者双引号</span>
            alert(<span class="hljs-string">`Saving of the following email address is in propgress: <span class="hljs-subst">${<span class="hljs-keyword">this</span>.get(<span class="hljs-string">'emailAddress'</span>)}</span>`</span>);
            <span class="hljs-comment">// 模拟保存操作</span>
            <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'responseMessage'</span>, <span class="hljs-string">`Thank you! We've just saved your email address: <span class="hljs-subst">${<span class="hljs-keyword">this</span>.get(<span class="hljs-string">'emailAddress'</span>)}</span>`</span>);
            <span class="hljs-comment">//  情况输入框内容</span>
            <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'emailAddress'</span>, <span class="hljs-string">''</span>);
        }
    }
});</code></pre>
<p><strong>注意</strong>：代码<code>alert</code>方法中并没有使用单引号或者是双引号囊括字符串“Saving of the following email address is in propgress: ${this.get('emailAddress')}”而是使用键盘<code>tab</code>键顶部的<code>~</code>键，这两者肯定是有区别的，前者直接把<code>${this.get('emailAddress')}</code>当着字符串，后者会把<code>${this.get('emailAddress')}</code>当着表达式，从运行结果就可以看出来了。  </p>
<p>输入正确邮箱后点击按钮会得到如下截图结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005162050" src="https://static.alili.tech/img/remote/1460000005162050" alt="结果" title="结果" style="cursor: pointer;"></span></p>
<p>直接弹出提示信息这种方式太暴力了，改一种提示方式，修改模板<code>index.hbs</code>，然后在注释掉控制器<code>index.js</code>中的<code>alert</code>语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! app/templates/index.hbs"}}"

<div class=&quot;jumbotron text-center&quot;>
    <div class=&quot;form-horizontal form-group form-group-lg row&quot;>
        <div class=&quot;col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2&quot;>
          <!-- <input type=&quot;email&quot; class=&quot;form-control&quot; placeholder=&quot;Please type your e-mail address.&quot; autofocus=&quot;autofocus&quot;/> -->
          "{{"input type=&quot;email&quot; value=emailAddress class=&quot;form-control&quot; placeholder=&quot;Please type your e-mail address.&quot; autofocus=&quot;autofocus&quot;"}}"
        </div>
        <div class=&quot;col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3&quot;>
            <button class=&quot;btn btn-primary btn-lg btn-block&quot; disabled="{{"isDisabled"}}" "{{"action 'saveInvitation'"}}">Request invitation</button>
        </div>

    </div>

    "{{"! 显示提示信息"}}"
    "{{"#if responseMessage"}}"
     <div class=&quot;alert alert-success&quot;>"{{"responseMessage"}}"</div>
   "{{"/if"}}"

</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! app/templates/index.hbs"}}"

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"jumbotron text-center"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-horizontal form-group form-group-lg row"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2"</span>&gt;</span>
          <span class="hljs-comment">&lt;!-- &lt;input type="email" class="form-control" placeholder="Please type your e-mail address." autofocus="autofocus"/&gt; --&gt;</span>
          "{{"input type="email" value=emailAddress class="form-control" placeholder="Please type your e-mail address." autofocus="autofocus""}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary btn-lg btn-block"</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">"{{"isDisabled"}}"</span> "{{"<span class="hljs-attr">action</span> '<span class="hljs-attr">saveInvitation</span>'"}}"&gt;</span>Request invitation<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    "{{"! 显示提示信息"}}"
    "{{"#if responseMessage"}}"
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"alert alert-success"</span>&gt;</span>"{{"responseMessage"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   "{{"/if"}}"

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>上述代码新引入了一个表达式<code>"{{"if"}}"</code>，顾名思义，这个表达式就是用于判断的。更多有关判断表达式的介绍请看<a href="http://blog.ddlisting.com/2016/03/18/ember-js-ru-men-zhi-nan-zhi-jiu-handlebarstiao-jian-biao-da-shi/" rel="nofollow noreferrer" target="_blank">Ember.js 入门指南之九handlebars条件表达式</a></p>
<p>等待项目重启完成，再次测试。输入正确格式的邮箱，点击按钮提交可以看到如下的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005162052" src="https://static.alili.tech/img/remote/1460000005162052" alt="友好提示信息" title="友好提示信息" style="cursor: pointer; display: inline;"></span></p>
<p>主要看绿色提示信息，相对于前一种直接弹框提示方式友好多了！！！</p>
<p>好了，到此第二篇也完成了。内容比较多需要耐心才能看完，如果你能认真坚持看到这里相信你一定收获了很多！！</p>
<h2 id="articleHeader9">家庭作业</h2>
<p><strong>作业要求</strong></p>
<ol>
<li>一个邮件输入框<code>"{{"input"}}"</code>，需要校验不为空、校验邮箱格式</li>
<li>一个消息输入框<code>"{{"textarea"}}"</code>，需要校验不为空、输入信息长度不少于5</li>
<li>上述两个输入框的校验都通过才允许提交</li>
<li>提交成功后在界面显示提示信息</li>
</ol>
<p><strong>用到的组件和方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"input type=&quot;email&quot; value=emailAddress class=&quot;form-control&quot; placeholder=&quot;Please type your e-mail address.&quot; autofocus=&quot;autofocus&quot;"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">"{{"input type=<span class="hljs-string">"email"</span> value=emailAddress <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"form-control"</span> placeholder=<span class="hljs-string">"Please type your e-mail address."</span> autofocus=<span class="hljs-string">"autofocus"</span>"}}"</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"textarea class=&quot;form-control&quot; placeholder=&quot;Your message. (At least 5 characters.)&quot; rows=&quot;7&quot; value=message"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">"{{"textarea <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"form-control"</span> placeholder=<span class="hljs-string">"Your message. (At least 5 characters.)"</span> rows=<span class="hljs-string">"7"</span> value=message"}}"</code></pre>
<p>判断长度不小于5用到的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Ember.computed.gte('propertyName', number);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Ember.computed.gte(<span class="hljs-string">'propertyName'</span>, number);</code></pre>
<p>并且判断。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Ember.computed.and('firstProperty', 'secondProperty');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Ember.computed.and(<span class="hljs-string">'firstProperty'</span>, <span class="hljs-string">'secondProperty'</span>);</code></pre>
<p>获取属性值的长度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="message.length" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">message.length</code></pre>
<p>获取计算属性值长度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Ember.computed('propertyName', function() {
    return this.get('propertyName').get('length');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Ember.computed(<span class="hljs-string">'propertyName'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'propertyName'</span>).get(<span class="hljs-string">'length'</span>);
});</code></pre>
<p>为了照顾懒人我把完整的代码放在<a href="https://github.com/ubuntuvim/library-app" rel="nofollow noreferrer" target="_blank">GitHub</a>上，如有需要请参考参考。博文经过多次修改，博文上的代码与github代码可能有出入，不过影响不大！如果你觉得博文对你有点用，请在github项目上给我点个<code>star</code>吧。您的肯定对我来说是最大的动力！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
引入计算属性、action、动态内容

## 原文链接
[https://segmentfault.com/a/1190000005162035](https://segmentfault.com/a/1190000005162035)

