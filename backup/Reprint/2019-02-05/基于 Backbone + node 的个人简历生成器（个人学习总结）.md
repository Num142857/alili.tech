---
title: '基于 Backbone + node 的个人简历生成器（个人学习总结）' 
date: 2019-02-05 2:30:09
hidden: true
slug: jpfblr7scoh
categories: [reprint]
---

{{< raw >}}

                    
<p>为什么学习<code>backbone</code>？这是个好问题。在这个前端框架爆炸的年代，比起<code>backbone</code>，对开发来说有更多更好的选择，<code>react</code>，<code>vue</code>，<code>angular</code>等等。但这些在使用这些框架的时候，心里却总是有写不踏实的感觉。<code>MVVM</code>双向绑定是怎么实现的？<code>Virtual DOM</code>，<code>diff</code>算法在<code>react</code>里面是怎么实现的？大框架不好的地方就是，对于新手来说，真正认识其中的原理很不容易。原理不会变，而<code>API</code>是会变的。</p>
<p>所以我决定静下心先学习<code>backbone</code>，并认真地研究其中的原理。（这里挖一个坑。这几天在读<code>backbone</code>和<code>underscore</code>的源码，争取写一篇源码解析的文章。）</p>
<p>学习框架最好的方式就是写一个应用出来，于是乎我就写了一个应用来练手。中间浪费了很多很多时间在完全没有意义的纠结上面，所以最后是花了很长时间才搞定的。</p>
<p>这一篇文章是一个总结，比较个人化。主要是说说收获和经验。</p>
<h3 id="articleHeader0">应用的功能</h3>
<p>这个应用是一个个人简历生成器。前端用<code>backbone</code> + <code>jquery</code> + <code>underscore</code> + <code>webpack</code> + <code>scss</code>，后端用<code>express</code>。可以通过浏览器界面填写个人相关信息，把数据发送到后端，用<code>nodejs</code>来负责存储数据，生成静态文件。具体详情可以见<code>github</code>的<a href="https://github.com/harryfyodor/backbone-resume-generator" rel="nofollow noreferrer" target="_blank">地址</a>。</p>
<h3 id="articleHeader1">相关学习资料</h3>
<p><code>backbone</code>属于典型的，学的时候觉得很简单，自己写的时候一脸懵逼的框架。相比<code>react</code>，<code>react</code>学的时候觉得难度不小，而且加上<code>redux</code>之后对一些函数式编程的东西偶尔会感到很费解。可是跟着<code>redux</code>官网推荐的教程慢慢看之后还是能够比较轻松地写出一个过得去的应用的。然而backbone确是相反，学的时候觉得不难，真正写的时候却感觉很多东西很难控制，而且要思考的地方比用大框架多不少。</p>
<p>比较好的教程有<a href="https://addyosmani.com/backbone-fundamentals/" rel="nofollow noreferrer" target="_blank">这一个</a>。这个教程里面讲了<code>mvc</code>的基础知识，<code>backbone</code>的基础知识，以及一个<code>todo</code>应用，一个带后端的应用还有一个和用<code>requirejs</code>进行模块化处理的应用。根据这个教程老老实实过一遍其实大致就差不多了（然而我只看了<code>todo</code>...）。但是要深入理解并用<code>backbone</code>写大应用还是有不小难度的。</p>
<h3 id="articleHeader2">模块化</h3>
<p>这里用了<code>webpack</code>。说实话，<code>webpack</code>真的是神一般的存在。<code>AMD</code>也好，<code>CMD</code>也好，<code>ES6</code>模块化标准也好都可以轻松打包压缩，还有很多很方便的插件，不能再爽...<code>backbone</code>的年代（说的好像很久远了一样...）可能模块化还不算特别普及，所以很多例子也是用<code>script</code>引入的。这样的命名污染问题自然显而易见。而且发出多次请求也会影响性能。因此通过模块化打包还是非常必要的。</p>
<h3 id="articleHeader3">model和collection</h3>
<p>在<code>backbone</code>中，<code>model</code>和<code>collection</code>相对于view的代码量是小很多很多的。在里面主要处理的是<code>view</code>所呈现的数据。而且比较重要的是这个<code>model</code>会与后端数据库的数据类型有很密切的联系。一般来说，后端的接口要求“比较<code>RESTful</code>”，前后端以<code>json</code>作为数据传递的方式。这样，从后端获取数据的时候fetch到处理也比较容易，本地的数据<code>save</code>到服务器的数据处理也会更加自然（都是<code>json</code>）。当然这也不是硬性规定的，用传统的<code>jquery</code>的<code>ajax</code>也是可以的，但这可能就违背了<code>backbone</code>原本的初衷了(?)。在本人写的这个应用里面就没有遵守这一点。后面会说明原因。</p>
<p><code>model</code>里面常常要覆盖的是<code>default</code>，<code>initialize</code>方法，如果需要对<code>save</code>以及<code>fetch</code>的数据做特殊处理，则需要重写<code>toJSON</code>和<code>parse</code>方法。</p>
<p>在我的这个应用里面，存储的数据结构比较特殊。简历有几个小的嵌套的<code>collection</code>，有几个不是<code>collection</code>的<code>attributes</code>，算是比较复杂的结构。因此重写了<code>toJSON</code>和<code>parse</code>方法，但是后来没有用到重写的<code>parse</code>方法，因为发现直接用<code>jquery</code>的<code>ajax</code>更加方便直接。重写的方法见<a href="http://stackoverflow.com/questions/17451831/backbone-nested-collection" rel="nofollow noreferrer" target="_blank">这个链接</a>，具体来说就是当需要保存并<code>post</code>数据到数据库的时候，把<code>model</code>的属性（这个属性不是<code>attributes</code>里面的那个，而是真正意义上的属性，类似<code>a.b</code>）解析为<code>json</code>结构，然后再保存。而fetch到数据的时候就用得到的数据（一般是<code>json</code>）初始化几个<code>collection</code>，然后直接加到<code>model</code>的属性(<code>a.b</code>这种形式的属性)中去。</p>
<p>。其实这种情况应该是用<code>backbone-relational</code>之类的库来解决的，但能解决问题就好。<br>在<code>view</code>中，<code>collection</code>和<code>model</code>会根据用户操作<code>view</code>而发生变化，而变化之后又会影响<code>view</code>的数据呈现。而关于<code>model</code>和<code>collection</code>的其他操作还有一些增删查改之类的可以在具体情况下使用。这些操作也是常常写在<code>view</code>中的。</p>
<h3 id="articleHeader4">view</h3>
<p><code>view</code>是一个大块头，这个应用中<code>view</code>占了代码中最大的部分。</p>
<p><code>view</code>，顾名思义，就是视图，数据的呈现。这里常常和模板配合。在写后端<code>express</code>应用的时候，因为<code>ejs</code>有<code>include</code>的功能，因此模板就被切成了一小块一小块，这样可以避免<code>html</code>主文件过大。但是<code>backbone</code>的很多例子都是直接一大块一大块地把模板塞到<code>html</code>主文件里面。明显不利于维护。因此参考了别人的代码，写了下面的辅助函数，把视图的<code>html</code>文件读取进来，并添加到相应的view的模板里面，全部读取完之后就调用回调函数。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loadTemplate = function(views, callback) {
    var deferreds = [];
    $.each(views, function(index, view) {
        if(require('./views/' + view)) {
            // 把异步事件，即从文件中读取html文件的函数，压入deferreds中
            deferreds.push($.get('../tpl/' + view + '.html', function(data) {
                // 修改相应的view的template
                require('./views/' + view).prototype.template = _.template(data);
            }));
        } else {
            alert(view + &quot; not found&quot;);
        }
    });

    // 把所有异步操作都完成之后才调用callback
    $.when.apply(null, deferreds).done(callback);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> loadTemplate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">views, callback</span>) </span>{
    <span class="hljs-keyword">var</span> deferreds = [];
    $.each(views, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, view</span>) </span>{
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./views/'</span> + view)) {
            <span class="hljs-comment">// 把异步事件，即从文件中读取html文件的函数，压入deferreds中</span>
            deferreds.push($.get(<span class="hljs-string">'../tpl/'</span> + view + <span class="hljs-string">'.html'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                <span class="hljs-comment">// 修改相应的view的template</span>
                <span class="hljs-built_in">require</span>(<span class="hljs-string">'./views/'</span> + view).prototype.template = _.template(data);
            }));
        } <span class="hljs-keyword">else</span> {
            alert(view + <span class="hljs-string">" not found"</span>);
        }
    });

    <span class="hljs-comment">// 把所有异步操作都完成之后才调用callback</span>
    $.when.apply(<span class="hljs-literal">null</span>, deferreds).done(callback);
}</code></pre>
<p>用这种方法来处理<code>html</code>过大问题不算最好的方法，但是在这里能够很好地解决问题。</p>
<p>在<code>view</code>中主要的是<code>events</code>，<code>render</code>，<code>initialize</code>。在<code>initialize</code>里面可以通过<code>listenT</code>o来监听一些<code>model</code>事件。</p>
<p>有时候在写<code>initialize</code>的时候要自己<code>render</code>，但很多情况下不需要。<code>render</code>函数里面返回<code>this</code>之后，可以在其他地方，比如<code>router</code>中把<code>model</code>注入模板中然后把<code>render</code>返回的<code>html</code>直接插入页面中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var view = new formView({});
this.$container.html(view.render().el);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cos"><code>var <span class="hljs-keyword">view</span> = <span class="hljs-keyword">new</span> formView({})<span class="hljs-comment">;</span>
this.<span class="hljs-built_in">$container</span>.html(<span class="hljs-keyword">view</span>.render().el)<span class="hljs-comment">;</span></code></pre>
<h3 id="articleHeader5">router</h3>
<p><code>backbone</code>的路由功能非常方便。在我的<code>app</code>应用里面整个程序的入口就是<code>router</code>的函数。可以通过不同的<code>url</code>绑定不同的函数，在函数中调用视图的函数来实现不同路由的不同的<code>html</code>片段。<br>然而在实际操作的时候，可能是因为个人能力还不够，有一个困难从头到尾都无法解决。后来用了比较不好的办法勉强替代了。问题如下：假如要定义路由<code>'/:tab/:filename'</code>，每次路由发生改变的时候都会调用路由函数。如果在这个路由函数里我新建了一个<code>model</code>实例，那当我想改变<code>tab</code>的时候，就不得不重新触发路由函数，重新新建<code>model</code>。然而我希望<code>model</code>能够不发生变化，因为<code>tab</code>是在<code>filename</code>文件的前提下的标签页，不能换一个标签就重建一个<code>model</code>。这样做要如何实现呢？想了三天到最后我还是放弃了...（也有可能自己想的需求是有点奇葩..）</p>
<h3 id="articleHeader6">其他小收获</h3>
<p>原来直接<code>window.print()</code>就可以调用浏览器打印功能了呀。有个小收获就是有关浏览器打印的尺寸问题，要根据<code>A4</code>的比例和边距做调整，然后确定页面中心的区域的比例。第二个收获就是发现淘宝的那个<code>icon</code>库 <a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a> 真的非常不错，用起来也非常方便，以后可以去借一下素材hhh</p>
<h3 id="articleHeader7">遗憾</h3>
<p>这个小应用还是有很多不足的地方</p>
<ol>
<li><p><code>UI</code>不足，简历页面设计不足。（想爆了脑袋都不知怎么搞比较好看...）</p></li>
<li><p>功能还不够强大，如果很多内容填写能够更加细致就好了...</p></li>
<li><p>如果要部署<code>github</code>的话，还不够方便。</p></li>
<li><p><code>node</code>里面生成页面那里用了一些拼接字符串的方法，更加不是很优雅...</p></li>
</ol>
<h3 id="articleHeader8">总结</h3>
<p>通过这个<code>backbone</code>应用的编写，对于<code>backbone</code>算是有一个初步的了解了吧。对于<code>MVC</code>框架也有了一个大体的认识。最近在看<code>backbone</code>和<code>underscore</code>的源码，明后天会开始写一篇源码解读的文章，总结一下<code>backbone</code>里面值得学习的地方。（现在还在看，觉得<code>history</code>里面对于浏览器兼容的考虑处理挺有意思，<code>Events</code>要看点设计模式的东西）。这个暑假的最后就慢慢地看多几遍<code>backbone</code>，好好学习一个！</p>
<p>在<code>backbone</code>方面我还是个小白，文中有错误请轻喷，相互学习！谢谢大家！</p>
<p>代码在<a href="https://github.com/harryfyodor/backbone-resume-generator" rel="nofollow noreferrer" target="_blank">这里</a>，希望能帮到你~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Backbone + node 的个人简历生成器（个人学习总结）

## 原文链接
[https://segmentfault.com/a/1190000006683794](https://segmentfault.com/a/1190000006683794)

