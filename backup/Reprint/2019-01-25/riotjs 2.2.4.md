---
title: 'riotjs 2.2.4' 
date: 2019-01-25 2:30:24
hidden: true
slug: ic5ys9tnr1n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">riotjs</h1>
<p>riotjs一款小型的10000star mvp框架。目前进化至3.x版本了。读者注意，本篇文章介绍的是2.2.4哦。为啥介绍这款啊，是因为那个啥，preact面向现代浏览器，对我来说不咋好使。</p>
<p>riotjs从出生到现在总共经历了3个大版本，基本上每个都不一样，1.x最为简陋，可以视之就一个简单的mvc框架哦，模板引擎也是简单的不要不要的，2.x版本完善了各项功能，并且强化了controller的作用，使之成为一个真正的MVP框架。3.x版本使用了大量es6，es5新增方法进行重构，对svg支持，模板引擎，事件系统，内存使用等进行了一定程度的优化。（实际从2.3开始就往现代浏览器上靠了）</p>
<h2 id="articleHeader1">为何选用</h2>
<p>由于riotjs小，容易和其他框架混合使用</p>
<h2 id="articleHeader2">特点</h2>
<p>小，但经不起强渲染</p>
<h2 id="articleHeader3">支持ie8吗</h2>
<p>riotjs 2.2.4是最后一个支持ie8的版本。(然而事实上，代码中使用了一些es5新增的方法，这些方法要ie9才支持，以至于我们不得不使用es5shiv/es5sham来进行兼容);</p>
<h2 id="articleHeader4">静态方法</h2>
<h3 id="articleHeader5">riot.observable</h3>
<p>riot的事件系统，所有事件通知方式都基于该模块,可全局使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 发送全局事件

var window.eventBus = riot.observable();

eventBus.on('test', function (e) {
    console.log(e);
});

eventBus.trigger('test', 123);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 发送全局事件</span>

<span class="hljs-keyword">var</span> <span class="hljs-built_in">window</span>.eventBus = riot.observable();

eventBus.on(<span class="hljs-string">'test'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(e);
});

eventBus.trigger(<span class="hljs-string">'test'</span>, <span class="hljs-number">123</span>);</code></pre>
<p>包含方法</p>
<ul>
<li>on(events, fn)</li>
<li>off(events, fn)</li>
<li>trigger(name[,arguments])</li>
<li>one(name, fn)</li>
</ul>
<hr>
<h3 id="articleHeader6">riot.mixin</h3>
<p>作用是向内部对象mixins添加属性或方法，该对象无保护，所以必须要人为保证命名时不冲突.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在外部使用
riot.mixin('testfunction', function () { console.log(2) });

var c = riot.mixin('testfunction');

c() // print 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在外部使用</span>
riot.mixin(<span class="hljs-string">'testfunction'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>) });

<span class="hljs-keyword">var</span> c = riot.mixin(<span class="hljs-string">'testfunction'</span>);

c() <span class="hljs-comment">// print 2</span></code></pre>
<p>该方法一般提供给riot tag初始化实例的时候使用。当在tag类中使用this.mixin混入方法的时候，会将内部对象mixins上的方法或属性混合到tag类上</p>
<hr>
<h3 id="articleHeader7">riot.route</h3>
<p>2.2.4版本的riot.route是一个功能超弱的路由管理器,通过监听hashchange事件来触发注册的路由回调。该路由模块是自动启动的。而且它的实现上是有缺陷的。它本质上是个事件分发器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用示例

riot.route(function (path, module, action, params) {
    console.log(path, module, action, params)
});

riot.route('search/index/search/1234');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用示例</span>

riot.route(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path, module, action, params</span>) </span>{
    <span class="hljs-built_in">console</span>.log(path, <span class="hljs-built_in">module</span>, action, params)
});

riot.route(<span class="hljs-string">'search/index/search/1234'</span>);
</code></pre>
<p>包含方法</p>
<ul>
<li>
<p>riot.route(arg)</p>
<ul><li>2.2.4版本里arg接受2种类型，字符串和function，上面已经给出示例。需要自己去分出路径，模块，行为和参数。你没看错，就是这么弱</li></ul>
</li>
<li>
<p>riot.route.exec(fn)</p>
<ul><li>解释当前哈希路径，并把参数传递到fn里</li></ul>
</li>
<li>
<p>riot.route.parser(fn)</p>
<ul><li>指定哈希路径解释器，如果未调用该方法，固定解释方法是 path.split('/');如示例所示</li></ul>
</li>
<li>
<p>riot.route.stop()</p>
<ul><li>销毁监听hashchange事件，销毁路由事件</li></ul>
</li>
<li>
<p>riot.route.start()</p>
<ul><li>监听。默认是开启的</li></ul>
</li>
</ul>
<hr>
<h3 id="articleHeader8">riot.util</h3>
<p>包含两个内容,brackets和tmpl， brackets是tmpl的辅助函数，单独使用意义不大,该辅助函数可以通过正则或者索引制造我们需要匹配的部分。tmpl是riotjs的模板引擎核心，html字符串拼接完全通过该引擎，可独立使用(在npm上有独立维护的模块名为riot-tmpl)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置模板占位符(默认是{ })
riot.settings.brackets = '"{{" "}}"';
// 使用
var html = riot.util.tmpl('<div>"{{"a"}}"</div>', { a:1 });
console.log(html);

//print <div>1</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 设置模板占位符(默认是{ })</span>
riot.settings.brackets = <span class="hljs-string">'"{{" "}}"'</span>;
<span class="hljs-comment">// 使用</span>
<span class="hljs-keyword">var</span> html = riot.util.tmpl(<span class="hljs-string">'&lt;div&gt;"{{"a"}}"&lt;/div&gt;'</span>, { <span class="hljs-attr">a</span>:<span class="hljs-number">1</span> });
<span class="hljs-built_in">console</span>.log(html);

<span class="hljs-comment">//print &lt;div&gt;1&lt;/div&gt;</span></code></pre>
<hr>
<h3 id="articleHeader9">riot.tag(name, html, css, attrs, fn)</h3>
<p>全局注册一个riot标签, css attrs参数可省略。其实质是向一个内部对象tagImpl上创建了一个名为name的属性，其值是{name,html,css,attrs,fn}。此时该缓存并没有被使用，tag的实例并没有建立。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="riot.tag(
    'ri-root',
    [
        '<ri-login if={showLogin}></ri-login>',
        '<ri-error if={showError}></ri-error>'
    ].join(''),
    function () {
        var self = this;
        this.showLogin = false;
        this.showError = false;
        this.on('mount', function () {
            var device_id = window.Qutils.getParams('device_id');
            if (!device_id) {
                alert('参数device_id缺失！');
            }
            else {
                setTimeout(function () {
                    bridge.isInApp(
                        function () {
                            self.showLogin = true;
                            self.tags['ri-login'].trigger('login-init', device_id);
                            self.update();
                        },
                        function () {
                            self.showError = true;
                            self.update();
                        }
                    )
                }, 100);
            }
        });
    }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">riot.tag(
    <span class="hljs-string">'ri-root'</span>,
    [
        <span class="hljs-string">'&lt;ri-login if={showLogin}&gt;&lt;/ri-login&gt;'</span>,
        <span class="hljs-string">'&lt;ri-error if={showError}&gt;&lt;/ri-error&gt;'</span>
    ].join(<span class="hljs-string">''</span>),
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>.showLogin = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.showError = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.on(<span class="hljs-string">'mount'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> device_id = <span class="hljs-built_in">window</span>.Qutils.getParams(<span class="hljs-string">'device_id'</span>);
            <span class="hljs-keyword">if</span> (!device_id) {
                alert(<span class="hljs-string">'参数device_id缺失！'</span>);
            }
            <span class="hljs-keyword">else</span> {
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    bridge.isInApp(
                        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                            self.showLogin = <span class="hljs-literal">true</span>;
                            self.tags[<span class="hljs-string">'ri-login'</span>].trigger(<span class="hljs-string">'login-init'</span>, device_id);
                            self.update();
                        },
                        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                            self.showError = <span class="hljs-literal">true</span>;
                            self.update();
                        }
                    )
                }, <span class="hljs-number">100</span>);
            }
        });
    }
);</code></pre>
<hr>
<h3 id="articleHeader10">riot.mount &amp; riot.mountTo</h3>
<p>riot.mountTo只是riot.mount的别名。该方法顾名思义，挂在riot标签（组件）。会返回一个tag的实例。</p>
<p>参数</p>
<ul>
<li>
<p>selector</p>
<ul><li>接受'*'（mount所有）, string split with ',' , string（使用原生的Selectors API，获取一个NodeList),或者接受一个NodeList,Element</li></ul>
</li>
<li>
<p>tagName</p>
<ul><li>接受'*'(mount所有), object(当为Object类型时，即为opts),string(等同mount所有selector上下文下的tagName匹配tag)</li></ul>
</li>
<li>
<p>opts</p>
<ul><li>Object,传入的参数对象，可直接混合在tag实体的opts对象上</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- example -->
<div id=&quot;test&quot;></div>
<script>
    var tag = riot.mount('#test', '*', {a:1,b:2});
    console.log(tag[0].opts.a) // print 1
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- example --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> tag = riot.mount(<span class="hljs-string">'#test'</span>, <span class="hljs-string">'*'</span>, {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>});
    <span class="hljs-built_in">console</span>.log(tag[<span class="hljs-number">0</span>].opts.a) <span class="hljs-comment">// print 1</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader11">riot.update</h3>
<p>更新所有的tag实体,实质是调用每个实体的update方法。</p>
<h2 id="articleHeader12">riot的tag实例方法</h2>
<p>上文说到riot中所用通过riot.tag声明的custom tag都只是缓存了，而没有立刻产生tag实例。实际上tag实例是在执行riot.mount的时候被创建的。所有的riot tag实例都是由内部构造器Tag实例化而来的。而对于一个多tag嵌套的组件，其实是递归先将子tag从底部实例化完，当实例化完成，会从根部到底部依次触发mount事件~</p>
<h3 id="articleHeader13">this.isMounted</h3>
<p>true | false, 指示tag是否完成安装</p>
<h3 id="articleHeader14">this._id</h3>
<p>一个自增的id，用于唯一代表该实例</p>
<h3 id="articleHeader15">this.parent</h3>
<p>若一个tag实例有父实例，这个parent指向父实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.on('mount', function () {
    this.parent &amp;&amp; this.parent.trigger('child-mounted');
}.bind(this))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.on(<span class="hljs-string">'mount'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.parent &amp;&amp; <span class="hljs-keyword">this</span>.parent.trigger(<span class="hljs-string">'child-mounted'</span>);
}.bind(<span class="hljs-keyword">this</span>))</code></pre>
<h3 id="articleHeader16">this.root</h3>
<p>该属性指向tag实例所表示的真实dom元素,另外root._tag同样挂载了tag实例的引用，所以当你的个自定义标签实例化以后，你还可以通过这样的姿势找到tag实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tag = riot.mount('custom-tag');

console.log(tag[0].root);
// print <custom-tag></custom-tag>

console.log(document.querySelector('custom-tag')._tag)
// print Tag {xxx}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> tag = riot.mount(<span class="hljs-string">'custom-tag'</span>);

<span class="hljs-built_in">console</span>.log(tag[<span class="hljs-number">0</span>].root);
<span class="hljs-comment">// print &lt;custom-tag&gt;&lt;/custom-tag&gt;</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'custom-tag'</span>)._tag)
<span class="hljs-comment">// print Tag {xxx}</span></code></pre>
<h3 id="articleHeader17">this.opts</h3>
<p>哦，这个的构造器是Child，不过特的原型指向你传入的opts的引用。所以如果不想自己配置被改动，请乖乖深度克隆</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tag = riot.mount('custom-tag', {a:1,b:2,c:3});

console.log(tag[0].opts.a);
// print 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> tag = riot.mount(<span class="hljs-string">'custom-tag'</span>, {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>,<span class="hljs-attr">c</span>:<span class="hljs-number">3</span>});

<span class="hljs-built_in">console</span>.log(tag[<span class="hljs-number">0</span>].opts.a);
<span class="hljs-comment">// print 1</span></code></pre>
<p>另外如果要在父子tag间传递参数也是很好玩的.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="riot.tag(
    'hhh',
    '<zzz myoptions={this.opts.test}></zzz>',
    function () {}
);
riot.tag(
    'zzz',
    '<div>{this.opts.myoptions}</div>',
    function () {}
);
var new_custom_tag = document.createElement('hhh');
document.body.appendChild(new_custom_tag);
var custom_tag = riot.mount('hhh', {test:1});
console.log(custom_tag[0].tags['zzz'].opts.myoptions);
// print: 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">riot.tag(
    <span class="hljs-string">'hhh'</span>,
    <span class="hljs-string">'&lt;zzz myoptions={this.opts.test}&gt;&lt;/zzz&gt;'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
);
riot.tag(
    <span class="hljs-string">'zzz'</span>,
    <span class="hljs-string">'&lt;div&gt;{this.opts.myoptions}&lt;/div&gt;'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}
);
<span class="hljs-keyword">var</span> new_custom_tag = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'hhh'</span>);
<span class="hljs-built_in">document</span>.body.appendChild(new_custom_tag);
<span class="hljs-keyword">var</span> custom_tag = riot.mount(<span class="hljs-string">'hhh'</span>, {<span class="hljs-attr">test</span>:<span class="hljs-number">1</span>});
<span class="hljs-built_in">console</span>.log(custom_tag[<span class="hljs-number">0</span>].tags[<span class="hljs-string">'zzz'</span>].opts.myoptions);
<span class="hljs-comment">// print: 1</span></code></pre>
<p>// 注: riot没有state机制，要通过attributes传值，小心undefined</p>
<p>需要注意的是，由于他遍历的是dom.attributes,你玩表单的时候小心一点。</p>
<h3 id="articleHeader18">this.tags</h3>
<p>这里面放了子tag的实例的引用，上面的示例中有类似用法。多个同名子tag会放在数组里,我记不得在哪个版本里了，即使是一个子tag也会放在数组里。</p>
<h3 id="articleHeader19">this.update(data)</h3>
<p>这个操作分为几个步骤：</p>
<p>一：源码里明确写到，执行该方法先判断data对象里有没有可能覆盖tag实例属性的属性，如果有，丢弃。注意，该处过滤数据使用的是浅复制，如果是对象套对象，你要小心了。</p>
<p>二：如果是循环产生的tag(注意，如果不是在custom-tag上使用each循环产生，不会去继承，因为此时isLoop为undefined)，重新从父tag获取需要继承的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="riot.tag(
    'hhh',
    '<zzz each={eee} myoptions={opts.test}></zzz>',
    function () { this.eee = [{a:1,b:2},{a:1,b:2}]; this.eeeeeeeeee = 43214321; this.fdsafsdf = 3253425432 }
);
riot.tag(
    'zzz',
    '<div>{a} {b}</div>',
    function () { this.fffff = 4325345342543}
);
var new_custom_tag = document.createElement('hhh');
document.body.appendChild(new_custom_tag);
var custom_tag = riot.mount('hhh', {test:1});
console.log(custom_tag[0].tags.zzz[0].fdsafsdf)
// print 3253425432" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">riot.tag(
    <span class="hljs-string">'hhh'</span>,
    <span class="hljs-string">'&lt;zzz each={eee} myoptions={opts.test}&gt;&lt;/zzz&gt;'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">this</span>.eee = [{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>},{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>}]; <span class="hljs-keyword">this</span>.eeeeeeeeee = <span class="hljs-number">43214321</span>; <span class="hljs-keyword">this</span>.fdsafsdf = <span class="hljs-number">3253425432</span> }
);
riot.tag(
    <span class="hljs-string">'zzz'</span>,
    <span class="hljs-string">'&lt;div&gt;{a} {b}&lt;/div&gt;'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">this</span>.fffff = <span class="hljs-number">4325345342543</span>}
);
<span class="hljs-keyword">var</span> new_custom_tag = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'hhh'</span>);
<span class="hljs-built_in">document</span>.body.appendChild(new_custom_tag);
<span class="hljs-keyword">var</span> custom_tag = riot.mount(<span class="hljs-string">'hhh'</span>, {<span class="hljs-attr">test</span>:<span class="hljs-number">1</span>});
<span class="hljs-built_in">console</span>.log(custom_tag[<span class="hljs-number">0</span>].tags.zzz[<span class="hljs-number">0</span>].fdsafsdf)
<span class="hljs-comment">// print 3253425432</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="riot.tag(
    'hhh',
    '<div each={eee}><zzz myoptions={opts.test}></zzz></div>',
    function () { this.eee = [{a:1,b:2},{a:1,b:2}]; this.eeeeeeeeee = 43214321; this.fdsafsdf = 3253425432 }
);
riot.tag(
    'zzz',
    '<div>{a} {b}</div>',
    function () { this.fffff = 4325345342543}
);
var new_custom_tag = document.createElement('hhh');
document.body.appendChild(new_custom_tag);
var custom_tag = riot.mount('hhh', {test:1});
console.log(custom_tag[0].tags.zzz[0].fdsafsdf)
// print undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">riot.tag(
    <span class="hljs-string">'hhh'</span>,
    <span class="hljs-string">'&lt;div each={eee}&gt;&lt;zzz myoptions={opts.test}&gt;&lt;/zzz&gt;&lt;/div&gt;'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">this</span>.eee = [{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>},{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>}]; <span class="hljs-keyword">this</span>.eeeeeeeeee = <span class="hljs-number">43214321</span>; <span class="hljs-keyword">this</span>.fdsafsdf = <span class="hljs-number">3253425432</span> }
);
riot.tag(
    <span class="hljs-string">'zzz'</span>,
    <span class="hljs-string">'&lt;div&gt;{a} {b}&lt;/div&gt;'</span>,
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">this</span>.fffff = <span class="hljs-number">4325345342543</span>}
);
<span class="hljs-keyword">var</span> new_custom_tag = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'hhh'</span>);
<span class="hljs-built_in">document</span>.body.appendChild(new_custom_tag);
<span class="hljs-keyword">var</span> custom_tag = riot.mount(<span class="hljs-string">'hhh'</span>, {<span class="hljs-attr">test</span>:<span class="hljs-number">1</span>});
<span class="hljs-built_in">console</span>.log(custom_tag[<span class="hljs-number">0</span>].tags.zzz[<span class="hljs-number">0</span>].fdsafsdf)
<span class="hljs-comment">// print undefined</span></code></pre>
<p>该特性可能会对您造成困扰，啥时候误操作都可能一头雾水不造为什么。</p>
<p>三:混合其他数据和属性到当前tag上</p>
<p>四:更新视图，删除dom传导属性，重置事件。（所以说如果你浏览器在dom回收和事件回收上有问题，那你更新的时候就相当捉急了，在最新的版本里把这个泄漏点给堵上了）</p>
<h3 id="articleHeader20">this.mixin()</h3>
<p>接受无数多个字符串参数,内部运行 riot.mixin[arguments[i]]将需要混入的属性或方法混入到实例上~~前面介绍过了。在2.2.4以前的版本没有使用.bind(this)来参入作用域，略蛋疼的说,2.2.4 对混入的方法都bind了当前作用域。另外，注意init是很特殊的，在混入时会自动执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="riot.mixin({
    init: function () {
        this.a = 1;
        console.log('init')
    }
});

riot.tag('test', '<div></div>', function () {
    this.mixin('init');
});

var a = document.createElement('test');
document.body.appendChild(a);
var custom_tag = riot.mount('test');
console.log(custom_tag[0].a)
// print 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">riot.mixin({
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.a = <span class="hljs-number">1</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'init'</span>)
    }
});

riot.tag(<span class="hljs-string">'test'</span>, <span class="hljs-string">'&lt;div&gt;&lt;/div&gt;'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.mixin(<span class="hljs-string">'init'</span>);
});

<span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'test'</span>);
<span class="hljs-built_in">document</span>.body.appendChild(a);
<span class="hljs-keyword">var</span> custom_tag = riot.mount(<span class="hljs-string">'test'</span>);
<span class="hljs-built_in">console</span>.log(custom_tag[<span class="hljs-number">0</span>].a)
<span class="hljs-comment">// print 1</span></code></pre>
<h3 id="articleHeader21">this.mount()</h3>
<p>将该实例强制重新装载一遍</p>
<h3 id="articleHeader22">this.unmount(keepRootTag)</h3>
<p>传入参数，如果为true，会把初始化用的那个根节点也删球掉。该方法用于卸载实例，释放内存。</p>
<h3 id="articleHeader23">on, off, trigger, one</h3>
<p>通过riot.observable混入的事件方法，然后我们可以在不同tag实例上到处传播事件了，建议使用一个集线器把事件管理起来，或者使用其他玩意，比如riot-flux什么的来玩。</p>
<h2 id="articleHeader24">生命周期</h2>
<p><em>to be continue</em></p>
<h2 id="articleHeader25">后记</h2>
<p>这个框架跟虚拟dom没撒关系，因为完全没有diff算法。。。在更新视图的时候用了文档碎片凑~，效果还凑合</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
riotjs 2.2.4

## 原文链接
[https://segmentfault.com/a/1190000008518507](https://segmentfault.com/a/1190000008518507)

