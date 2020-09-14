---
title: 'Webpack 源码（一）—— Tapable 和 事件流' 
date: 2019-01-28 2:30:09
hidden: true
slug: qlyv0tt88ud
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1、Tapable</h2>
<p>Tap 的英文单词解释，除了最常用的 <strong>点击</strong> 手势之外，还有一个意思是 <strong>水龙头</strong> —— 在 webpack 中指的是后一种；</p>
<p>Webpack 可以认为是一种基于事件流的编程范例，内部的工作流程都是基于 <strong>插件</strong> 机制串接起来；</p>
<p>而将这些插件粘合起来的就是webpack自己写的基础类 <a href="https://github.com/webpack/tapable/blob/master/lib/Tapable.js" rel="nofollow noreferrer" target="_blank">Tapable</a> 是，<code>plugin</code>方法就是该类暴露出来的；</p>
<blockquote><p>后面我们将看到核心的对象 Compiler、Compilation 等都是继承于该对象</p></blockquote>
<p>基于该类规范而其的 Webpack 体系保证了插件的有序性，使得整个系统非常有弹性，扩展性很好；然而有一个致命的缺点就是调试、看源码真是很痛苦，各种跳来跳去；（基于事件流的写法，和程序语言中的 <strong>goto</strong> 语句很类似）</p>
<p>把这个仓库下载，使用 Webstorm 进行调试，test 目录是很好的教程入口；</p>
<p>Tapable.plugin()：相当于把对象归类到名为 name 的对象下，以array的形式；所有的插件都存在私有变量 <strong>_plugin</strong> 变量中；</p>
<p><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1VgdNKFXXXXaaXFXXXXXXXXXX-321-167.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1VgdNKFXXXXaaXFXXXXXXXXXX-321-167.png" alt="plugins" title="plugins" style="cursor: pointer; display: inline;"></span></p>
<p>接下来我们简单节选几个函数分析一下：</p>
<h3 id="articleHeader1">1.1、apply 方法</h3>
<p>该方法最普通也是最常用的，看一下它的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Tapable.prototype.apply = function apply() {
    for(var i = 0; i < arguments.length; i++) {
        arguments[i].apply(this);
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="shell">
Tapable.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">apply</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
        <span class="hljs-built_in">arguments</span>[i].apply(<span class="hljs-keyword">this</span>);
    }
};</code></pre>
<p>毫无悬念，就是 <strong>挨个顺序</strong> 执行传入到该函数方法中对象的 <code>apply</code> 方法；通常传入该函数的对象也是 <strong>Tapable 插件</strong> 对象，因此必然也存在 <code>apply</code> 方法；（Webpack 的插件就是Tapable对象，因此必须要提供  <code>apply</code>  方法 ）</p>
<p>只是更改上下文为当前 <code>this</code></p>
<p>因此当前这里最大的作用就是传入当前 <strong>Tapable</strong> 的上下文</p>
<h3 id="articleHeader2">1.2、 applyPluginsAsync(name,...other,callback)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 模拟两个插件
var _plugins = {
    &quot;emit&quot;:[
        function(a,b,cb){
            setTimeout(()=>{
              console.log('1',a,b);
              cb();
            },1000);
        },
        function(a,b,cb){
            setTimeout(()=>{
                console.log('2',a,b);
                cb();
            },500)
        }
    ]
}

applyPluginsAsync(&quot;emit&quot;,'aaaa','bbbbb',function(){console.log('end')});

// 输出结果：

// 1 aaaa bbbbb
// 2 aaaa bbbbb
//  end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 模拟两个插件</span>
<span class="hljs-keyword">var</span> _plugins = {
    <span class="hljs-string">"emit"</span>:[
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>,a,b);
              cb();
            },<span class="hljs-number">1000</span>);
        },
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>,a,b);
                cb();
            },<span class="hljs-number">500</span>)
        }
    ]
}

applyPluginsAsync(<span class="hljs-string">"emit"</span>,<span class="hljs-string">'aaaa'</span>,<span class="hljs-string">'bbbbb'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>)});

<span class="hljs-comment">// 输出结果：</span>

<span class="hljs-comment">// 1 aaaa bbbbb</span>
<span class="hljs-comment">// 2 aaaa bbbbb</span>
<span class="hljs-comment">//  end</span></code></pre>
<p>我们看到，虽然第一个插件是延后 1000ms 执行，第二个则是延后 500ms，但在真正执行的时候，是严格按照顺序执行的；每个插件需要在最后显式调用<code>cb()</code>通知下一个插件的运行；</p>
<p>这里需要注意每个插件的形参的个数都要一致，且最后一个必须是cb()方法，用于唤起下一个插件的运行；cb的第一个参数是err，如果该参数不为空，就直接调用最后callback，中断后续插件的运行；</p>
<h3 id="articleHeader3">1.3、 applyPluginsParallel(name,...other,callback)</h3>
<blockquote><p>大部分代码和 <code>applyPluginsAsync</code> 有点儿类似</p></blockquote>
<p>这个 <code>applyPluginsParallel</code> 主要功能和 最简单的 <code>applyPlugins</code> 方法比较相似，<strong>无论如何都会让所有注册的插件运行一遍</strong>；</p>
<p>只是相比 <code>applyPlugins</code> 多了一个额外的功能，它最后 <strong>提供一个 callback 函数</strong>，这个 callback 的函数比较倔强，如果所有的插件x都正常执行，且最后都cb()，则会在最后执行callback里的逻辑；不过，一旦其中某个插件运行出错，就会调用这个callback(err)，之后就算插件有错误也不会再调用该callback函数；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var _plugins = {
&quot;emit&quot;:[
    function(a,b,cb){
        setTimeout(()=>{
          console.log('1',a,b);
          cb(null,'e222','33333');
        },1000);
    },
    function(a,b,cb){
        setTimeout(()=>{
            console.log('2',a,b);
            cb(null,'err');
        },500)
    }
]
}

applyPluginsParallel(&quot;emit&quot;,'aaaa','bbbbb',function(a,b){console.log('end',a,b)});

// 输出结果：

// 2 aaaa bbbbb
// 1 aaaa bbbbb
//  end undefined undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> _plugins = {
<span class="hljs-string">"emit"</span>:[
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>,a,b);
          cb(<span class="hljs-literal">null</span>,<span class="hljs-string">'e222'</span>,<span class="hljs-string">'33333'</span>);
        },<span class="hljs-number">1000</span>);
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>,a,b);
            cb(<span class="hljs-literal">null</span>,<span class="hljs-string">'err'</span>);
        },<span class="hljs-number">500</span>)
    }
]
}

applyPluginsParallel(<span class="hljs-string">"emit"</span>,<span class="hljs-string">'aaaa'</span>,<span class="hljs-string">'bbbbb'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>,a,b)});

<span class="hljs-comment">// 输出结果：</span>

<span class="hljs-comment">// 2 aaaa bbbbb</span>
<span class="hljs-comment">// 1 aaaa bbbbb</span>
<span class="hljs-comment">//  end undefined undefined</span></code></pre>
<p>上面的两个插件都是调用了 cb，且第一个参数是 null（表示没有错误），所以最后能输出 callback 函数中的 console 内容；</p>
<p>如果注释两个插件中任何一个 cb() 调用，你会发现最后的 callback <strong>没有执行</strong>；</p>
<p>如果让 <strong>第二个</strong> cb()的第一个值不是 null，比如 cb('err')，则 callback 之后输出这个错误，之后再也不会调用此 callback：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _plugins = {
&quot;emit&quot;:[
    function(a,b,cb){
        setTimeout(()=>{
          console.log('1',a,b);
          cb('e222','33333');
        },1000);
    },
    function(a,b,cb){
        setTimeout(()=>{
            console.log('2',a,b);
            cb('err');
        },500)
    }
]
}

// 输出结果：

// 2 aaaa bbbbb
// end err undefined
// 1 aaaa bbbbb" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> _plugins = {
<span class="hljs-string">"emit"</span>:[
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>,a,b);
          cb(<span class="hljs-string">'e222'</span>,<span class="hljs-string">'33333'</span>);
        },<span class="hljs-number">1000</span>);
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>,a,b);
            cb(<span class="hljs-string">'err'</span>);
        },<span class="hljs-number">500</span>)
    }
]
}

<span class="hljs-comment">// 输出结果：</span>

<span class="hljs-comment">// 2 aaaa bbbbb</span>
<span class="hljs-comment">// end err undefined</span>
<span class="hljs-comment">// 1 aaaa bbbbb</span></code></pre>
<h3 id="articleHeader4">1.4、 applyPluginsWaterfall(name, init, callback)</h3>
<p>顾名思义，这个方法相当于是 <strong>瀑布式</strong> 调用，给第一个插件传入初始对象 <code>init</code>，然后经过第一个插件调用之后会获得一个结果对象，该结果对象会传给下一个插件 <strong>作为初始值</strong>，直到最后调用完毕，最后一个插件的直接结果传给 callback 作为初始值；</p>
<h3 id="articleHeader5">1.5、 applyPluginsParallelBailResult(name,...other,callback)</h3>
<p>这个方法应该是所有方法中最难理解的；</p>
<p>首先它的行为和 <code>applyPluginsParallel</code> 非常相似，首先会 <strong>无论如何都会让所有注册的插件运行一遍（根据注册的顺序）</strong>；</p>
<p>为了让 callback 执行，其前提条件是每个插件都需要调用 cb()；</p>
<p>但其中的 callback 只会执行一次（当传给cb的值不是undefined/null 的时候），这一次执行顺序是插件定义顺序有关，<strong>而跟每个插件中的 cb() 执行时间无关的</strong>；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var _plugins = {
&quot;emit&quot;:[
    function(a,b,cb){
        setTimeout(()=>{
          console.log('1',a,b);
          cb();
        },1000);
    },
    function(a,b,cb){
        setTimeout(()=>{
            console.log('2',a,b);
            cb();
        },500)
    },
    function(a,b,cb){
        setTimeout(()=>{
            console.log('3',a,b);
            cb();
        },1500)
    }
]
}

applyPluginsParallelBailResult(&quot;emit&quot;,'aaaa','bbbbb',function(a,b){console.log('end',a,b)});

// 运行结果

// 2 aaaa bbbbb
// 1 aaaa bbbbb
// 3 aaaa bbbbb
// end undefined undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> _plugins = {
<span class="hljs-string">"emit"</span>:[
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>,a,b);
          cb();
        },<span class="hljs-number">1000</span>);
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>,a,b);
            cb();
        },<span class="hljs-number">500</span>)
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>,a,b);
            cb();
        },<span class="hljs-number">1500</span>)
    }
]
}

applyPluginsParallelBailResult(<span class="hljs-string">"emit"</span>,<span class="hljs-string">'aaaa'</span>,<span class="hljs-string">'bbbbb'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>,a,b)});

<span class="hljs-comment">// 运行结果</span>

<span class="hljs-comment">// 2 aaaa bbbbb</span>
<span class="hljs-comment">// 1 aaaa bbbbb</span>
<span class="hljs-comment">// 3 aaaa bbbbb</span>
<span class="hljs-comment">// end undefined undefined</span></code></pre>
<p>这是最普通的运行情况，我们稍微调整一下（注意三个插件运行的顺序2-1-3），分别给cb传入有效的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var _plugins = {
&quot;emit&quot;:[
    function(a,b,cb){
        setTimeout(()=>{
          console.log('1',a,b);
          cb('1');
        },1000);
    },
    function(a,b,cb){
        setTimeout(()=>{
            console.log('2',a,b);
            cb('2');
        },500)
    },
    function(a,b,cb){
        setTimeout(()=>{
            console.log('3',a,b);
            cb('3');
        },1500)
    }
]
}
applyPluginsParallelBailResult(&quot;emit&quot;,'aaaa','bbbbb',function(a,b){console.log('end',a,b)});
// 运行结果

// 2 aaaa bbbbb
// 1 aaaa bbbbb
// end 1 undefined
// 3 aaaa bbbbb" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> _plugins = {
<span class="hljs-string">"emit"</span>:[
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>,a,b);
          cb(<span class="hljs-string">'1'</span>);
        },<span class="hljs-number">1000</span>);
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>,a,b);
            cb(<span class="hljs-string">'2'</span>);
        },<span class="hljs-number">500</span>)
    },
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b,cb</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>,a,b);
            cb(<span class="hljs-string">'3'</span>);
        },<span class="hljs-number">1500</span>)
    }
]
}
applyPluginsParallelBailResult(<span class="hljs-string">"emit"</span>,<span class="hljs-string">'aaaa'</span>,<span class="hljs-string">'bbbbb'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>,a,b)});
<span class="hljs-comment">// 运行结果</span>

<span class="hljs-comment">// 2 aaaa bbbbb</span>
<span class="hljs-comment">// 1 aaaa bbbbb</span>
<span class="hljs-comment">// end 1 undefined</span>
<span class="hljs-comment">// 3 aaaa bbbbb</span></code></pre>
<p>可以发现第1个插件 <code>cb('1')</code> 执行了，后续的 <code>cb('2')</code> 和 <code>cb('3')</code> 都给忽略了；</p>
<p>这是因为插件注册顺序是 1-2-3，虽然运行的时候顺序是 2-1-3，但所运行的还是 1 对应的 cb；所以，就算1执行的速度最慢（比如把其setTimeout的值设置成 <strong>2000</strong>），运行的 cb 仍然是1对应的cb;</p>
<blockquote>
<p>其中涉及的魔法是 <strong>闭包</strong>，传入的<code>i</code>就是和注册顺序绑定了</p>
<p>这样一说明，你会发现 <code>applyPluginsParallel</code> 的 cb 执行时机是和执行时间有关系的，你可以自己验证一下；</p>
</blockquote>
<h3 id="articleHeader6">1.6、总结</h3>
<p>总结一下，Tapable 就相当于是一个 <strong>事件管家</strong>，它所提供的 <code>plugin</code> 方法类似于 <code>addEventListen</code> 监听事件，<code>apply</code> 方法类似于事件触发函数 <code>trigger</code>；</p>
<p><span class="img-wrap"><img data-src="http://ww4.sinaimg.cn/large/006tNbRwgw1fa8r9bnodhj30sg0lcwhd.jpg" src="https://static.alili.techhttp://ww4.sinaimg.cn/large/006tNbRwgw1fa8r9bnodhj30sg0lcwhd.jpg" alt="总结一下" title="总结一下" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">2、Webpack 中的事件流</h2>
<p>既然 Webpack 是基于 Tapable 搭建起来的，那么我们看一下 Webpack 构建一个模块的基本事件流是如何的；</p>
<p>我们在 Webpack 库中的 <strong>Tapable.js</strong> 中每个方法中新增 <code>console</code> 语句打出日志，就能找出所有关键的事件名字：</p>
<p><span class="img-wrap"><img data-src="https://lh3.googleusercontent.com/-03Z2Y5cJcMI/V2zVO1tZgeI/AAAAAAAACyo/Z23Qogi0DWkRmSeqjh71-h186RYEx0Y9ACCo/s640/2016-06-24_14-30-20.png" src="https://static.alili.techhttps://lh3.googleusercontent.com/-03Z2Y5cJcMI/V2zVO1tZgeI/AAAAAAAACyo/Z23Qogi0DWkRmSeqjh71-h186RYEx0Y9ACCo/s640/2016-06-24_14-30-20.png" alt="log" title="log" style="cursor: pointer;"></span></p>
<p>打印结果：（这里只列举了简单的事件流程，打包不同的入口文件会有所差异，但 <strong>事件出现的先后顺序是固定的</strong> ）</p>
<table>
<thead><tr>
<th>类型</th>
<th>名字</th>
<th>事件名</th>
</tr></thead>
<tbody>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>entry-option</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-plugins</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-resolvers</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>environment</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-environment</td>
</tr>
<tr>
<td>[D]</td>
<td>applyPluginsAsyncSeries</td>
<td>run</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>normal-module-factory</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>context-module-factory</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>compile</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>this-compilation</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>compilation</td>
</tr>
<tr>
<td>[F]</td>
<td>applyPluginsParallel</td>
<td>make</td>
</tr>
<tr>
<td>[E]</td>
<td>applyPluginsAsyncWaterfall</td>
<td>before-resolve</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>factory</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>resolver</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>resolve</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>resolve-step</td>
</tr>
<tr>
<td>[G]</td>
<td>applyPluginsParallelBailResult</td>
<td>file</td>
</tr>
<tr>
<td>[G]</td>
<td>applyPluginsParallelBailResult</td>
<td>directory</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>resolve-step</td>
</tr>
<tr>
<td>[G]</td>
<td>applyPluginsParallelBailResult</td>
<td>result</td>
</tr>
<tr>
<td>[E]</td>
<td>applyPluginsAsyncWaterfall</td>
<td>after-resolve</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>create-module</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>module</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>build-module</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>normal-module-loader</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>program</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>statement</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>evaluate CallExpression</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>var data</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>evaluate Identifier</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>evaluate Identifier require</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>call require</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>evaluate Literal</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>call require:amd:array</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>evaluate Literal</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>call require:commonjs:item</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>statement</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>evaluate MemberExpression</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>evaluate Identifier console.log</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>call console.log</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>expression console.log</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>expression console</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>succeed-module</td>
</tr>
<tr>
<td>[E]</td>
<td>applyPluginsAsyncWaterfall</td>
<td>before-resolve</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>factory</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>build-module</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>succeed-module</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>seal</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>optimize</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>optimize-modules</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-optimize-modules</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>optimize-chunks</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-optimize-chunks</td>
</tr>
<tr>
<td>[D]</td>
<td>applyPluginsAsyncSeries</td>
<td>optimize-tree</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-optimize-tree</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>should-record</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>revive-modules</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>optimize-module-order</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>before-module-ids</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>optimize-module-ids</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-optimize-module-ids</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>record-modules</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>revive-chunks</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>optimize-chunk-order</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>before-chunk-ids</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>optimize-chunk-ids</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-optimize-chunk-ids</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>record-chunks</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>before-hash</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>hash</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>hash</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>hash</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>hash</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>hash-for-chunk</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>chunk-hash</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-hash</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>before-chunk-assets</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>global-hash-paths</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>global-hash</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>bootstrap</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>local-vars</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>require</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>module-obj</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>module-require</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>require-extensions</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>asset-path</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>startup</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>module-require</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>render</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>module</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>render</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>package</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>module</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>render</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>package</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>modules</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>render-with-entry</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>asset-path</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>asset-path</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>chunk-asset</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>additional-chunk-assets</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>record</td>
</tr>
<tr>
<td>[D]</td>
<td>applyPluginsAsyncSeries</td>
<td>additional-assets</td>
</tr>
<tr>
<td>[D]</td>
<td>applyPluginsAsyncSeries</td>
<td>optimize-chunk-assets</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-optimize-chunk-assets</td>
</tr>
<tr>
<td>[D]</td>
<td>applyPluginsAsyncSeries</td>
<td>optimize-assets</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>after-optimize-assets</td>
</tr>
<tr>
<td>[D]</td>
<td>applyPluginsAsyncSeries</td>
<td>after-compile</td>
</tr>
<tr>
<td>[C]</td>
<td>applyPluginsBailResult</td>
<td>should-emit</td>
</tr>
<tr>
<td>[D]</td>
<td>applyPluginsAsyncSeries</td>
<td>emit</td>
</tr>
<tr>
<td>[B]</td>
<td>applyPluginsWaterfall</td>
<td>asset-path</td>
</tr>
<tr>
<td>[D]</td>
<td>applyPluginsAsyncSeries</td>
<td>after-emit</td>
</tr>
<tr>
<td>[A]</td>
<td>applyPlugins</td>
<td>done</td>
</tr>
</tbody>
</table>
<p>内容较多，依据源码内容的编排，可以将上述进行分层；<strong>大粒度</strong>的事件流如下：</p>
<p><span class="img-wrap"><img data-src="http://ww1.sinaimg.cn/large/006tNbRwgw1fa8sb4gg6oj30ax0mbmy0.jpg" src="https://static.alili.techhttp://ww1.sinaimg.cn/large/006tNbRwgw1fa8sb4gg6oj30ax0mbmy0.jpg" alt="大力度事件流" title="大力度事件流" style="cursor: pointer; display: inline;"></span></p>
<p>而其中 <strong>make</strong>、 <strong>seal</strong> 和 <strong>emit</strong> 阶段比较核心（包含了很多小粒度的事件），后续会继续展开讲解；</p>
<p>这里罗列一下关键的事件节点：</p>
<ul>
<li><p><code>entry-option</code>：初始化options</p></li>
<li><p><code>run</code>：开始编译</p></li>
<li><p><code>make</code>：从entry开始递归的分析依赖，对每个依赖模块进行build</p></li>
<li><p><code>before-resolve - after-resolve</code>： 对其中一个模块位置进行解析</p></li>
<li><p><code>build-module </code>：开始构建 (build) 这个module,这里将使用文件对应的loader加载</p></li>
<li><p><code>normal-module-loader</code>：对用loader加载完成的module(是一段js代码)进行编译,用 <a href="https://github.com/ternjs/acorn" rel="nofollow noreferrer" target="_blank">acorn</a> 编译,生成ast抽象语法树。</p></li>
<li><p><code>program</code>： 开始对ast进行遍历，当遇到require等一些调用表达式时，触发 <code>call require</code> 事件的handler执行，收集依赖，并。如：AMDRequireDependenciesBlockParserPlugin等</p></li>
<li><p><code>seal</code>： 所有依赖build完成，下面将开始对chunk进行优化，比如合并,抽取公共模块,加hash</p></li>
<li><p><code>optimize-chunk-assets</code>：压缩代码，插件 <strong>UglifyJsPlugin</strong> 就放在这个阶段</p></li>
<li><p><code>bootstrap</code>： 生成启动代码</p></li>
<li><p><code>emit</code>： 把各个chunk输出到结果文件</p></li>
</ul>
<h2 id="articleHeader8">3、参考文章</h2>
<p>本系列的源码阅读，以下几篇文章给了很多启发和思路，其中 <a href="https://lihuanghe.github.io/2016/05/30/webpack-source-analyse.html" rel="nofollow noreferrer" target="_blank">webpack 源码解析</a> 和 <a href="http://taobaofed.org/blog/2016/09/09/webpack-flow/" rel="nofollow noreferrer" target="_blank">细说 webpack 之流程篇</a> 尤为突出，推荐阅读；</p>
<ul>
<li><p><a href="https://lihuanghe.github.io/2016/05/30/webpack-source-analyse.html" rel="nofollow noreferrer" target="_blank">webpack 源码解析</a></p></li>
<li><p><a href="http://taobaofed.org/blog/2016/09/09/webpack-flow/" rel="nofollow noreferrer" target="_blank">细说 webpack 之流程篇</a></p></li>
<li><p><a href="http://itechblog.sinaapp.com/?p=529" rel="nofollow noreferrer" target="_blank">WebPack学习：WebPack内置Plugin</a></p></li>
<li><p><a href="https://github.com/lcxfs1991/blog/issues/1" rel="nofollow noreferrer" target="_blank">如何写一个webpack插件</a></p></li>
<li><p><a href="https://github.com/webpack/docs/wiki/plugins" rel="nofollow noreferrer" target="_blank">plugins官方文档</a>：</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack 源码（一）—— Tapable 和 事件流

## 原文链接
[https://segmentfault.com/a/1190000008060440](https://segmentfault.com/a/1190000008060440)

