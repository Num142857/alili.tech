---
title: 'express分析和对比' 
date: 2018-12-10 2:30:07
hidden: true
slug: h30seyyacs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>目前express最新版本是4.16.2,所以本文分析也基于这个版本。目前从npm仓库上来看express使用量挺高的,express月下载量约为koa的40倍。所以目前研究下express还是有一定意义的。</p>
<h2 id="articleHeader1">源码分析</h2>
<p>直接切入主题,由于目前express是一个独立的路由和中间件web框架。所以分析的方向也以这两个为主。源码的研究只注重关键步骤和流程思想, 具体的hack,异常,边界处理不做过多精力关注。</p>
<h3 id="articleHeader2">关键步骤</h3>
<h4>中间件的执行</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * //负责具体请求的逻辑处理,当一维layer中所对应的stack执行完后执行done(目的是为了一维路由列表中进行下一个路由的匹配执行)。
 * @param done(路由中的next)
 */
Route.prototype.dispatch = function dispatch(req, res, done) {
    var idx = 0;
    var stack = this.stack;
    next();
    //递归方式执行stack中的layer,通过next控制流程的执行
    function next(err) {
        // 出错直接退出当前stack和路由列表中回调的后续执行
        if (err &amp;&amp; err === 'router') {
            return done(err)
        }
        //出错直接退出当前stack列表后续执行,进行下一个路由匹配
        if (err &amp;&amp; err === 'route') {
            return done();
        }
        var layer = stack[idx++];
        //执行结束
        if (!layer) {
            return done(err);
        }
        if (layer.method &amp;&amp; layer.method !== method) {
            return next(err);
        }
            //调用具体注册好的逻辑
        if (err) {
            layer.handle_error(err, req, res, next);
        } else {
            layer.handle_request(req, res, next);
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code><span class="hljs-comment">/**
 * //负责具体请求的逻辑处理,当一维layer中所对应的stack执行完后执行done(目的是为了一维路由列表中进行下一个路由的匹配执行)。
 * @param done(路由中的next)
 */</span>
Route.prototype.dispatch = function dispatch(req, res, done) {
    var idx = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
    var stack = this.stack<span class="hljs-comment">;</span>
    <span class="hljs-keyword">next</span>()<span class="hljs-comment">;</span>
    <span class="hljs-comment">//递归方式执行stack中的layer,通过next控制流程的执行</span>
    function <span class="hljs-keyword">next</span>(<span class="hljs-keyword">err</span>) {
        <span class="hljs-comment">// 出错直接退出当前stack和路由列表中回调的后续执行</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span> &amp;&amp; <span class="hljs-keyword">err</span> === <span class="hljs-string">'router'</span>) {
            <span class="hljs-keyword">return</span> done(<span class="hljs-keyword">err</span>)
        }
        <span class="hljs-comment">//出错直接退出当前stack列表后续执行,进行下一个路由匹配</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span> &amp;&amp; <span class="hljs-keyword">err</span> === <span class="hljs-string">'route'</span>) {
            <span class="hljs-keyword">return</span> done()<span class="hljs-comment">;</span>
        }
        var layer = stack[idx++]<span class="hljs-comment">;</span>
        <span class="hljs-comment">//执行结束</span>
        <span class="hljs-keyword">if</span> (!layer) {
            <span class="hljs-keyword">return</span> done(<span class="hljs-keyword">err</span>)<span class="hljs-comment">;</span>
        }
        <span class="hljs-keyword">if</span> (layer.method &amp;&amp; layer.method !== method) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">next</span>(<span class="hljs-keyword">err</span>)<span class="hljs-comment">;</span>
        }
            <span class="hljs-comment">//调用具体注册好的逻辑</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
            layer.handle_error(<span class="hljs-keyword">err</span>, req, res, <span class="hljs-keyword">next</span>)<span class="hljs-comment">;</span>
        } <span class="hljs-keyword">else</span> {
            layer.handle_request(req, res, <span class="hljs-keyword">next</span>)<span class="hljs-comment">;</span>
        }
    }
}<span class="hljs-comment">;</span></code></pre>
<p><strong>说明</strong> 上面是源码的部分摘要,去除了无关的信息,对关键步骤加了注解。</p>
<h4>路由匹配</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 对具体请求进行路由分发处理
 * out 是最后一个处理器,默认是请求的回调,不传的话是内部提供的error handlers
 */
proto.handle = function handle(req, res, out) {
    var self = this;
    var idx = 0;
    var paramcalled = {};
    // middleware 和 roues
    var stack = self.stack;
    var done = restore(out, req, 'baseUrl', 'next', 'params');

    next();
    //递归方式遍历注册的一维路由
    function next(err) {
        var layerError = err === 'route'
            ? null
            : err;
        var layer,match,route;
        //取出注册好的路由,进行请求匹配
        while (match !== true &amp;&amp; idx < stack.length) {
            layer = stack[idx++];
            //req的path匹配,如果有注册参数路由会解析参数到layer.params上
            match = matchLayer(layer, path);
            route = layer.route;
        }

        if (match !== true) {
            return done(layerError);
        }
        //将解析好的路径参数放到请求对象上,以便后续参数回调逻辑的使用
        req.params = layer.params;

         //路径参数回调回调  ,例如请求 /user/1 ,参数回调 app.param('user',cb1) app.get('/user/:user',cb2)   会先执行注册的param cb1,然后才会是router中注册的cb2
        self.process_params(layer, paramcalled, req, res, function (err) {
            if (err) {
                return next(layerError || err);
            }
            if (route) {
                return layer.handle_request(req, res, next);
            }

        });
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/**
 * 对具体请求进行路由分发处理
 * out 是最后一个处理器,默认是请求的回调,不传的话是内部提供的error handlers
 */</span>
proto.handle = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span><span class="hljs-params">(req, res, out)</span> </span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">var</span> idx = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> paramcalled = {};
    <span class="hljs-comment">// middleware 和 roues</span>
    <span class="hljs-keyword">var</span> stack = <span class="hljs-keyword">self</span>.stack;
    <span class="hljs-keyword">var</span> done = restore(out, req, <span class="hljs-string">'baseUrl'</span>, <span class="hljs-string">'next'</span>, <span class="hljs-string">'params'</span>);

    next();
    <span class="hljs-comment">//递归方式遍历注册的一维路由</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span><span class="hljs-params">(err)</span> </span>{
        <span class="hljs-keyword">var</span> layerError = err === <span class="hljs-string">'route'</span>
            ? <span class="hljs-keyword">null</span>
            : err;
        <span class="hljs-keyword">var</span> layer,match,route;
        <span class="hljs-comment">//取出注册好的路由,进行请求匹配</span>
        <span class="hljs-keyword">while</span> (match !== <span class="hljs-keyword">true</span> &amp;&amp; idx &lt; stack.length) {
            layer = stack[idx++];
            <span class="hljs-comment">//req的path匹配,如果有注册参数路由会解析参数到layer.params上</span>
            match = matchLayer(layer, path);
            route = layer.route;
        }

        <span class="hljs-keyword">if</span> (match !== <span class="hljs-keyword">true</span>) {
            <span class="hljs-keyword">return</span> done(layerError);
        }
        <span class="hljs-comment">//将解析好的路径参数放到请求对象上,以便后续参数回调逻辑的使用</span>
        req.params = layer.params;

         <span class="hljs-comment">//路径参数回调回调  ,例如请求 /user/1 ,参数回调 app.param('user',cb1) app.get('/user/:user',cb2)   会先执行注册的param cb1,然后才会是router中注册的cb2</span>
        <span class="hljs-keyword">self</span>.process_params(layer, paramcalled, req, res, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(err)</span> </span>{
            <span class="hljs-keyword">if</span> (err) {
                <span class="hljs-keyword">return</span> next(layerError || err);
            }
            <span class="hljs-keyword">if</span> (route) {
                <span class="hljs-keyword">return</span> layer.handle_request(req, res, next);
            }

        });
    }
};
</code></pre>
<p><strong>说明</strong>  上面摘取了请求进行路由分发处理的关键步骤,并做了相应的注解。</p>
<h3 id="articleHeader3">执行流程</h3>
<p>当一个请求过来的时候交给handler方法,进行路由的匹配,以递归的方式遍历(路由匹配一节中介绍过),当匹配到某一个路由的时候在dispatch执行,web应用启动初始化前注册好的回调逻辑,执行的方式也是以递归的方式(中间件执行一节中介绍过)。<br>请求匹配执行逻辑已经介绍过了,下面结合着初始化的逻辑,进行分析,具体如下图所示。</p>
<p><span class="img-wrap"><img data-src="https://img.wuage.com/152083811955039express.jpeg" src="https://static.alili.techhttps://img.wuage.com/152083811955039express.jpeg" alt="express-jsdt" title="express-jsdt" style="cursor: pointer; display: inline;"></span></p>
<p><strong>说明</strong></p>
<h4>初始化</h4>
<p>针对上图做一下说明,启动服务应用的时候先进行初始化,注册'/jsdt'的get请求,并给路由绑定相应的回调。其中我们的路由放在一维的layer中,每一层路由,例如'/jsdt'又对应一个处理列表,这个二维列表里又存储着一系列layer(具体的回调处理逻辑),因为一维layer中已经记录了路径'/jsdt',所以二维的layer中就不用记录路径了,给个默认值'/',以保持一维layer和二维layer中结构的统一。</p>
<h4>请求</h4>
<p>当一个请求过来的时候先去一维layer所存储的路由中进行路径匹配,以递归的方式。匹配到了,通过dispatch方法,在执行路由所对应的二维layer中的回调逻辑,也是以递归的方式执行,在递归的过程中,如果发生异常,通过路由中传递过来的out,直接进行下一个路由的匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 *递归执行stack中的handle
 * @param out  路由中的next
 */
Route.prototype.dispatch = function (req, res, out) （xxx）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-comment">/**
 *递归执行stack中的handle
 * @param out  路由中的next
 */</span>
Route.prototype.<span class="hljs-built_in">dispatch</span> = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-title">req</span>, <span class="hljs-title">res</span>, <span class="hljs-title">out</span>) （<span class="hljs-title">xxx</span>）</span></code></pre>
<p>当执行遇到res.end()的时候,数据响应完后,整个请求响应过程就结束了。</p>
<h2 id="articleHeader4">koa vs express</h2>
<blockquote>
<a href="https://segmentfault.com/a/1190000008836418">kao源码</a>去年的时候有分析过,现在对比分析思考下。<br>koa比较迷你,微内核,拓展性强,所以一些web框架例如阿里的eggjs就是基于koa。而express集成了路由和static中间件所以显得重一些。</blockquote>
<h3 id="articleHeader5">express中间件和koa中间件区别,以及与redux中间件区别 ?</h3>
<p>网上很多文章都说一个是线性的,一个是洋葱模型。因为两个我都研究过,我觉的这种说法不对,其实执行的时候都是洋葱形。主要的区别是koa内核底层原生支持async语法,koa中的middlewares经过compose以后,每次执行到await next返回的都是一个promise,所以我们可以在顶层加一个try……catch进行异常捕获,这算是koa比较方便的一点。还有一点很多人提到过说koa可以记录处理时间,那是因为每次res.body赋值的时候并没有res.end,所以在第一个中间件很容易记录处理的时间,如下所示,在中间件执行完后,在handleResponse中才会将请求处理结果返回给客户端。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn(ctx)[是一个立即状态的promise].then(handleResponse).catch(onerror);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">fn</span>(ctx)<span class="hljs-selector-attr">[是一个立即状态的promise]</span><span class="hljs-selector-class">.then</span>(handleResponse)<span class="hljs-selector-class">.catch</span>(onerror);</code></pre>
<p>而express每次res.send的时候数据已经发给客户端了,当然也可以实现这种需求,只不过没有koa方便。多说几句,其实java中也有类似的实现,例如java中的aop,过滤器,将通用的逻辑,例如日志,权限等模块通过配置的方式进行灵活的插入,配置在xml中。比较灵活,每个模块之间互相解耦,根据需求实现可插拔效果。<br>在说一下与react中redux中间件机制区别,redux中的applyMiddleware中间件机制,可以在处理store前后加一些通用处理,利用高阶函数compose,通过reduce将多个函数组合成一个可执行执行函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//applyMiddleware.js
chain = middlewares.map(middleware => middleware(middlewareAPI))
dispatch = compose(...chain)(store.dispatch) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>//applyMiddleware.js
<span class="hljs-attr">chain</span> = middlewares.<span class="hljs-built_in">map</span>(<span class="hljs-attr">middleware</span> =&gt; middleware(middlewareAPI))
<span class="hljs-attr">dispatch</span> = compose(...chain)(store.dispatch) </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//compose.js
export default function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//compose.js</span>
export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compose</span><span class="hljs-params">(<span class="hljs-rest_arg">...funcs</span>)</span> </span>{
  <span class="hljs-keyword">return</span> funcs.reduce((a, b) =&gt; (...args) =&gt; a(b(...args)))
}</code></pre>
<p>组合好最后执行的时候是洋葱模型效果,举个例子 compose(a, b, c)变成 a(b(c())),而a,b,c的结构类似下面这种形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fnA(next) {
  return function() {
    console.log('fnA start')
    next()
    console.log('fnA end')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fnA</span>(<span class="hljs-params">next</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fnA start'</span>)
    next()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fnA end'</span>)
  }
}</code></pre>
<p>所以a(b(c()))()执行的时候,就会通过next来控制调用下一个中间件,整体的执行等价于express递归调用方式</p>
<h3 id="articleHeader6">express路由和  vue路由共同点</h3>
<p>vue中也有路由,官方的vue-router,他解决的是url和模板组件匹配渲染的问题, 而express中解决的url和handler匹配执行的问题,而koa内核里面没有集成路由。 从vue-router和express路由中可以看出路由的共性,是为了解决路径和相应处理逻辑的匹配问题在web开发中。</p>
<h2 id="articleHeader7">toy版本express</h2>
<p>根据上述分析的逻辑,实现了一个简化版的<a href="https://github.com/gcyStar/toy-express" rel="nofollow noreferrer" target="_blank">express</a> ,融入了express的核心思想,有详尽的步骤注释,有需要的可以参考下。</p>
<p><strong>参考源码版本说明</strong><br>express 4.16.2<br>koa 2.2<br>redux 3.7.2<br><strong>参考链接</strong><br><a href="https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md" rel="nofollow noreferrer" target="_blank">https://github.com/koajs/koa/...</a><br><a href="https://www.reddit.com/r/node/comments/692w23/express_vs_koa_with_asyncawait/" rel="nofollow noreferrer" target="_blank">https://www.reddit.com/r/node...</a><br><a href="https://blog.jscrambler.com/migrate-your-express-app-to-koa-2/" rel="nofollow noreferrer" target="_blank">https://blog.jscrambler.com/m...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
express分析和对比

## 原文链接
[https://segmentfault.com/a/1190000013710406](https://segmentfault.com/a/1190000013710406)

