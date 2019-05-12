---
title: 'koa2源码分析' 
date: 2019-01-17 2:30:25
hidden: true
slug: i45oewhck6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引言</h2>
<blockquote><p>最近在写koa2相关例子,顺便看了下koa2的源码,下面是一些个人理解。</p></blockquote>
<p>koa1核心基于generator,但是严重依赖co的包装。koa2完全不需要,基于async(其实质是generator的语法糖调用包装),在node v7 下可直接运行。<br>关于async和generator的语法,本文不做赘述。下面先创建一个koa实例,然后基于入口一步步分析。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//koa code
const Koa=require('koa');
const app=new Koa();

app.use(async function (ctx, next) {
    console.log('>> one');
    await next();
    console.log('<< one');
});
app.use(ctx => {
    ctx.body='hello world gcy';
});
app.listen('3000',function () {
    console.log('listening on port 3000');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//koa code</span>
<span class="hljs-keyword">const</span> Koa=<span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app=<span class="hljs-keyword">new</span> Koa();

app.use(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt;&gt; one'</span>);
    <span class="hljs-keyword">await</span> next();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&lt;&lt; one'</span>);
});
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
    ctx.body=<span class="hljs-string">'hello world gcy'</span>;
});
app.listen(<span class="hljs-string">'3000'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'listening on port 3000'</span>);
});</code></pre>
<p><strong>说明</strong>  上面这段代码似乎有些神秘,其实质是下面http module的封装调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// native code
let http=require('http');
let server=http.createServer(function (req,res) {
    res.writeHead(200,{'Content-type':'text/plain'});
    res.write('hello world gcy');
    res.end();
});
//start service listen
server.listen(8000,function () {
    console.log('listening on port 8000');
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">// native code</span>
<span class="hljs-keyword">let</span> http=<span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">let</span> server=http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req,res</span>) </span>{
    res.writeHead(<span class="hljs-number">200</span>,{<span class="hljs-string">'Content-type'</span>:<span class="hljs-string">'text/plain'</span>});
    res.write(<span class="hljs-string">'hello world gcy'</span>);
    res.end();
});
<span class="hljs-comment">//start service listen</span>
server.listen(<span class="hljs-number">8000</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'listening on port 8000'</span>);
});
</code></pre>
<p>下面基于koa构造函数入口做进一步分析。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor() {
    super();

    this.proxy = false;
    //创建一个空数组存放放middleware，洋葱流程的真相,下面会分析法到
    this.middleware = [];
    //决定忽略的子域名数量，默认为2
    this.subdomainOffset = 2;
    //处理环境变量
    this.env = process.env.NODE_ENV || 'development';
    //实例上挂载context,request,response
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();

    <span class="hljs-keyword">this</span>.proxy = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">//创建一个空数组存放放middleware，洋葱流程的真相,下面会分析法到</span>
    <span class="hljs-keyword">this</span>.middleware = [];
    <span class="hljs-comment">//决定忽略的子域名数量，默认为2</span>
    <span class="hljs-keyword">this</span>.subdomainOffset = <span class="hljs-number">2</span>;
    <span class="hljs-comment">//处理环境变量</span>
    <span class="hljs-keyword">this</span>.env = process.env.NODE_ENV || <span class="hljs-string">'development'</span>;
    <span class="hljs-comment">//实例上挂载context,request,response</span>
    <span class="hljs-keyword">this</span>.context = Object.create(context);
    <span class="hljs-keyword">this</span>.request = Object.create(request);
    <span class="hljs-keyword">this</span>.response = Object.create(response);
  }
</code></pre>
<p><strong>说明</strong>  上面是构造函数入口,启动入口如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //借用原生http.createServer，添加app.callback。
  listen() {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen.apply(server, arguments);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code> <span class="hljs-comment">//借用原生http.createServer，添加app.callback。</span>
  <span class="hljs-built_in">listen</span>() {
    debug(<span class="hljs-string">'listen'</span>);
    <span class="hljs-keyword">const</span> server = http.createServer(<span class="hljs-keyword">this</span>.callback());
    <span class="hljs-built_in">return</span> server.<span class="hljs-built_in">listen</span>.apply(server, arguments);
  }</code></pre>
<p><strong>说明</strong>  通过上面两个步骤一个完整的web服务器建立起来。对于监听接受到的请求解析处理,是通过callback函数,调用一系列中间件来完成。<br>下面分析中间件执行流程,我认为koa的主要内涵也就在这,所以做一下重点来论述。<br>首先引入经典中间件洋葱图,以便理解。</p>
<p><span class="img-wrap"><img data-src="http://img.wuage.com/149050753701669koa-onion.png" src="https://static.alili.techhttp://img.wuage.com/149050753701669koa-onion.png" alt="koa-onion" title="koa-onion" style="cursor: pointer; display: inline;"></span></p>
<p>结合这幅图再看下面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="////核心代码application 126 行  const fn = compose(this.middleware);
 return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      //立即返回处于resolve状态promise实例,以便后续逻辑继续执行
      if (!fn) return Promise.resolve()
      try {
     
        //   await next();  //当fn里面执行这句话时,就会执行dispatch(i+1),导致洋葱执行过程
        //   整个过程类似堆栈执行释放过程中的的递归调用,虽然有差异,可借用类比思考其执行顺序流程
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    // 核心代码application 136 行 return fn(ctx)[是一个立即状态的promise].then(handleResponse).catch(onerror);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">////核心代码application 126 行  const fn = compose(this.middleware);</span>
 <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
    <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
    <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span> (<span class="hljs-params">i</span>) </span>{
      <span class="hljs-keyword">if</span> (i &lt;= index) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'next() called multiple times'</span>))
      index = i
      <span class="hljs-keyword">let</span> fn = middleware[i]
      <span class="hljs-keyword">if</span> (i === middleware.length) fn = next
      <span class="hljs-comment">//立即返回处于resolve状态promise实例,以便后续逻辑继续执行</span>
      <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
      <span class="hljs-keyword">try</span> {
     
        <span class="hljs-comment">//   await next();  //当fn里面执行这句话时,就会执行dispatch(i+1),导致洋葱执行过程</span>
        <span class="hljs-comment">//   整个过程类似堆栈执行释放过程中的的递归调用,虽然有差异,可借用类比思考其执行顺序流程</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> dispatch(i + <span class="hljs-number">1</span>)
        }))
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
      }
    }
    <span class="hljs-comment">// 核心代码application 136 行 return fn(ctx)[是一个立即状态的promise].then(handleResponse).catch(onerror);</span>
  }
}
</code></pre>
<p>如果结合注释看上述代码过程中存在疑惑,可进一步参考下面的进行思考,反之忽略即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa=require('koa');
const app=new Koa();


app.use(async function (ctx, next) {
    console.log('>> one');
    await next();
    console.log('<< one');
});
app.use(async function (ctx, next) {
    console.log('>> two');
    ctx.body = 'two';
    await next();
    console.log('<< two');
});
app.use(async function (ctx, next) {
    console.log('>> three');
    await next();
    console.log('<< three');
});
//如果放到首部,不方便理解洋葱执行流程,因为没有调用next函数
app.use(ctx => {
    ctx.body='hello world gcy';
});
app.listen('3000',function () {
    console.log('listening on port 3000');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Koa=<span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> app=<span class="hljs-keyword">new</span> Koa();


app.use(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt;&gt; one'</span>);
    <span class="hljs-keyword">await</span> next();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&lt;&lt; one'</span>);
});
app.use(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt;&gt; two'</span>);
    ctx.body = <span class="hljs-string">'two'</span>;
    <span class="hljs-keyword">await</span> next();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&lt;&lt; two'</span>);
});
app.use(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt;&gt; three'</span>);
    <span class="hljs-keyword">await</span> next();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&lt;&lt; three'</span>);
});
<span class="hljs-comment">//如果放到首部,不方便理解洋葱执行流程,因为没有调用next函数</span>
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
    ctx.body=<span class="hljs-string">'hello world gcy'</span>;
});
app.listen(<span class="hljs-string">'3000'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'listening on port 3000'</span>);
});</code></pre>
<p><strong>说明</strong>  koa基于中间价架构,核心简洁,除此之外还有一些其它相对重要的方法。</p>
<h3 id="articleHeader1">application.js</h3>
<ul>
<li>use(fn) //组装use的传参</li>
<li>createContext(req, res)  创建初始化的上下文，将req和res挂载在context上</li>
<li>onerror(err) 错误处理,当设定this.slient为true，不会输出信息,在emit触发时执行</li>
<li>respond(ctx) http response简单封装,信息返回</li>
</ul>
<h3 id="articleHeader2">context.js</h3>
<ul>
<li>delegate(proto, 'request')     //Request相关方法委托,从而让context作为调用入口</li>
<li>onerror(err)  //中间件执行过程中异常处理逻辑</li>
</ul>
<p>除此之外还有request和response的参数解析文件,因为逻辑简单,不做叙述。<br>虽然核心文件不多,但是其也require了不少包,下面列举几个比较重的,以作为示例。</p>
<h3 id="articleHeader3">require</h3>
<ul>
<li>events application继承自Emitter,从而可以实现事件的订阅发布。</li>
<li>koa-compose 中间件的封装,核心逻辑之一,上面已分析。</li>
<li>debug 错误信息格式封装处理</li>
<li>statuses http状态码和和相应信息对应处理</li>
<li>koa-convert  把generator转为promise</li>
<li>…… and so on</li>
</ul>
<h3 id="articleHeader4">总结</h3>
<p>写这篇文章起因,是在写case的过程中,同一解决方案下中间件选择的纠结症,尤其是在选择render template过程中,为找其本质间差异,探寻到此。<br>源码分析基于koa(version 2.2.0),通读源码之后,可以较清晰的开发或者使用别人的中间件,<br>如果你有不同的理解,欢迎留言交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa2源码分析

## 原文链接
[https://segmentfault.com/a/1190000008836418](https://segmentfault.com/a/1190000008836418)

