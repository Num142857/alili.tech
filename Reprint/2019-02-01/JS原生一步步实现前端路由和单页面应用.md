---
title: 'JS原生一步步实现前端路由和单页面应用' 
date: 2019-02-01 2:30:10
hidden: true
slug: s4apghsr7o
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前端路由实现之 #hash</h2>
<p><strong>先上github项目地址：</strong> <a href="https://github.com/kliuj/spa-routers" rel="nofollow noreferrer" target="_blank">spa-routers</a><br><strong>运行效果图</strong><br><span class="img-wrap"><img data-src="/img/bVFi7l?w=581&amp;h=312" src="https://static.alili.tech/img/bVFi7l?w=581&amp;h=312" alt="运行效果图" title="运行效果图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">背景介绍</h2>
<p>用了许多前端框架来做<code>spa</code>应用，比如说<code>backbone，angular，vue</code>他们都有各自的路由系统，管理着前端的每一个页面切换，想要理解其中路由的实现，最好的方法就是手动实现一个。<br>前端路由有2种实现方式，一种是html5推出的<code>historyapi</code>，我们这里说的是另一种<code>hash</code>路由，就是常见的 <code>#</code> 号，这种方式兼容性更好。</p>
<h2 id="articleHeader2">需求分析</h2>
<p>我们这里只是简单的实现一个路由轮子，基本的功能包含以下：</p>
<ol>
<li><p>切换页面</p></li>
<li><p>异步加载js</p></li>
<li><p>异步传参</p></li>
</ol>
<h2 id="articleHeader3">实现步骤</h2>
<ol>
<li>
<p>切换页面：路由的最大作用就是切换页面，以往后台的路由是直接改变了页面的url方式促使页面刷新。但是前端路由通过 # 号不能刷新页面，只能通过  window 的监听事件  hashchange 来监听hash的变化，然后捕获到具体的hash值进行操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//路由切换
window.addEventListener('hashchange',function(){
    //do something 
    this.hashChange()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//路由切换</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//do something </span>
    <span class="hljs-keyword">this</span>.hashChange()
})</code></pre>
</li>
<li>
<p>注册路由：我们需要把路由规则注册到页面，这样页面在切换的时候才会有不同的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注册函数
 map:function(path,callback){
   path = path.replace(/\s*/g,&quot;&quot;);//过滤空格
   //在有回调，且回调是一个正确的函数的情况下进行存储 以 /name 为key的对象 {callback:xx}
   if(callback &amp;&amp; Object.prototype.toString.call(callback) === '[object Function]' ){
       this.routers[path] ={
            callback:callback,//回调
            fn:null //存储异步文件状态，用来记录异步的js文件是否下载，下文有提及
        } 
    }else{
    //打印出错的堆栈信息
        console.trace('注册'+path+'地址需要提供正确的的注册回调')
    }
 }
 
 //调用方式
 map('/detail',function(transition){
  ...
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//注册函数</span>
 map:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path,callback</span>)</span>{
   path = path.replace(<span class="hljs-regexp">/\s*/g</span>,<span class="hljs-string">""</span>);<span class="hljs-comment">//过滤空格</span>
   <span class="hljs-comment">//在有回调，且回调是一个正确的函数的情况下进行存储 以 /name 为key的对象 {callback:xx}</span>
   <span class="hljs-keyword">if</span>(callback &amp;&amp; <span class="hljs-built_in">Object</span>.prototype.toString.call(callback) === <span class="hljs-string">'[object Function]'</span> ){
       <span class="hljs-keyword">this</span>.routers[path] ={
            <span class="hljs-attr">callback</span>:callback,<span class="hljs-comment">//回调</span>
            fn:<span class="hljs-literal">null</span> <span class="hljs-comment">//存储异步文件状态，用来记录异步的js文件是否下载，下文有提及</span>
        } 
    }<span class="hljs-keyword">else</span>{
    <span class="hljs-comment">//打印出错的堆栈信息</span>
        <span class="hljs-built_in">console</span>.trace(<span class="hljs-string">'注册'</span>+path+<span class="hljs-string">'地址需要提供正确的的注册回调'</span>)
    }
 }
 
 <span class="hljs-comment">//调用方式</span>
 map(<span class="hljs-string">'/detail'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">transition</span>)</span>{
  ...
  })</code></pre>
</li>
<li>
<p>异步加载js：一般单页面应用为了性能优化，都会把各个页面的文件拆分开，按需加载，所以路由里面要加入异步加载js文件的功能。异步加载我们就采用最简单的原生方法，创建script标签，动态引入js。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _body= document.getElementsByTagName('body')[0],
    scriptEle= document.createElement('script'); 
scriptEle.type= 'text/javascript'; 
scriptEle.src= xxx.js; 
scriptEle.async = true;
scriptEle.onload= function(callback){ 
    //为了避免重复引入js，我们需要在这里记录一下已经加载过的文件，对应的 fn需要赋值处理
    callback()
} 
_body.appendChild(scriptEle);     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _body= <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'body'</span>)[<span class="hljs-number">0</span>],
    scriptEle= <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>); 
scriptEle.type= <span class="hljs-string">'text/javascript'</span>; 
scriptEle.src= xxx.js; 
scriptEle.async = <span class="hljs-literal">true</span>;
scriptEle.onload= <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{ 
    <span class="hljs-comment">//为了避免重复引入js，我们需要在这里记录一下已经加载过的文件，对应的 fn需要赋值处理</span>
    callback()
} 
_body.appendChild(scriptEle);     </code></pre>
</li>
<li>
<p>参数传递：在我们动态引入单独模块的js之后，我们可能需要给这个模块传递一些单独的参数。这里借鉴了一下jsonp的处理方式，我们把单独模块的js包装成一个函数，提供一个全局的回调方法，加载完成时候再调用回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SPA_RESOLVE_INIT = function(transition) { 
    document.getElementById(&quot;content&quot;).innerHTML = '<p style=&quot;color:#F8C545;&quot;>当前异步渲染列表页'+ JSON.stringify(transition) +'</p>'
    console.log(&quot;首页回调&quot; + JSON.stringify(transition))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>SPA_RESOLVE_INIT = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">transition</span>) </span>{ 
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"content"</span>).innerHTML = <span class="hljs-string">'&lt;p style="color:#F8C545;"&gt;当前异步渲染列表页'</span>+ <span class="hljs-built_in">JSON</span>.stringify(transition) +<span class="hljs-string">'&lt;/p&gt;'</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"首页回调"</span> + <span class="hljs-built_in">JSON</span>.stringify(transition))
}</code></pre>
</li>
</ol>
<p><strong>扩展：</strong>以上我们已经完成了基本功能，我们再对齐进行扩展，在页面切换之前<code>beforeEach</code>和切换完成<code>afterEach</code>的时候增加2个方法进行处理。思路是，注册了这2个方法之后，在切换之前就调用<code>beforeEach</code>，切换之后，需要等待下载js完成，在<code>onload</code>里面进行调用 <code>afterEach</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //切换之前一些处理
        beforeEach:function(callback){
            if(Object.prototype.toString.call(callback) === '[object Function]'){
                this.beforeFun = callback;
            }else{
                console.trace('路由切换前钩子函数不正确')
            }
        },
        //切换成功之后
        afterEach:function(callback){
            if(Object.prototype.toString.call(callback) === '[object Function]'){
                this.afterFun = callback;
            }else{
                console.trace('路由切换后回调函数不正确')
            }
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-comment">//切换之前一些处理</span>
        beforeEach:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.toString.call(callback) === <span class="hljs-string">'[object Function]'</span>){
                <span class="hljs-keyword">this</span>.beforeFun = callback;
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-built_in">console</span>.trace(<span class="hljs-string">'路由切换前钩子函数不正确'</span>)
            }
        },
        <span class="hljs-comment">//切换成功之后</span>
        afterEach:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.toString.call(callback) === <span class="hljs-string">'[object Function]'</span>){
                <span class="hljs-keyword">this</span>.afterFun = callback;
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-built_in">console</span>.trace(<span class="hljs-string">'路由切换后回调函数不正确'</span>)
            }
        },</code></pre>
<p>通过以上的思路分析，再加以整合，我们就完成了一个简单的前端路由，并且可以加到页面进行实际的SPA开发，不过还是非常简陋。</p>
<h2 id="articleHeader4">完整代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
*author:https://github.com/kliuj
**使用方法
*        1：注册路由 : spaRouters.map('/name',function(transition){
                        //异步加载js 
                        spaRouters.asyncFun('name.js',transition)
                        //或者同步执行回调
                        spaRouters.syncFun(function(transition){},transition)
                    })
        2：初始化      spaRouters.init()
        3：跳转  href = '#/name'            
*/
(function() {
    var util = {
        //获取路由的路径和详细参数
        getParamsUrl:function(){
            var hashDeatail = location.hash.split(&quot;?&quot;),
                hashName = hashDeatail[0].split(&quot;#&quot;)[1],//路由地址
                params = hashDeatail[1] ? hashDeatail[1].split(&quot;&amp;&quot;) : [],//参数内容
                query = {};
            for(var i = 0;i<params.length ; i++){
                var item = params[i].split(&quot;=&quot;);
                query[item[0]] = item[1]
            }        
            return     {
                path:hashName,
                query:query
            }
        }
    }
    function spaRouters(){
        this.routers = {};//保存注册的所有路由
        this.beforeFun = null;//切换前
        this.afterFun = null;
    }
    spaRouters.prototype={
        init:function(){
            var self = this;
            //页面加载匹配路由
            window.addEventListener('load',function(){
                self.urlChange()
            })
            //路由切换
            window.addEventListener('hashchange',function(){
                self.urlChange()
            })
            //异步引入js通过回调传递参数
            window.SPA_RESOLVE_INIT = null;
        },
        refresh:function(currentHash){
            var self = this;
            if(self.beforeFun){    
                self.beforeFun({
                    to:{
                        path:currentHash.path,
                        query:currentHash.query
                    },
                    next:function(){
                        self.routers[currentHash.path].callback.call(self,currentHash)
                    }
                })
            }else{
                self.routers[currentHash.path].callback.call(self,currentHash)
            }
        },
        //路由处理
        urlChange:function(){
            var currentHash = util.getParamsUrl();
            if(this.routers[currentHash.path]){
                this.refresh(currentHash)
            }else{
                //不存在的地址重定向到首页
                location.hash = '/index'
            }
        },
        //单层路由注册
        map:function(path,callback){
            path = path.replace(/\s*/g,&quot;&quot;);//过滤空格
            if(callback &amp;&amp; Object.prototype.toString.call(callback) === '[object Function]' ){
                this.routers[path] ={
                    callback:callback,//回调
                    fn:null //存储异步文件状态
                } 
            }else{
                console.trace('注册'+path+'地址需要提供正确的的注册回调')
            }
        },
        //切换之前一些处理
        beforeEach:function(callback){
            if(Object.prototype.toString.call(callback) === '[object Function]'){
                this.beforeFun = callback;
            }else{
                console.trace('路由切换前钩子函数不正确')
            }
        },
        //切换成功之后
        afterEach:function(callback){
            if(Object.prototype.toString.call(callback) === '[object Function]'){
                this.afterFun = callback;
            }else{
                console.trace('路由切换后回调函数不正确')
            }
        },
        //路由异步懒加载js文件
        asyncFun:function(file,transition){
           var self = this;
           if(self.routers[transition.path].fn){
                   self.afterFun &amp;&amp; self.afterFun(transition)     
                   self.routers[transition.path].fn(transition)
           }else{
                  console.log(&quot;开始异步下载js文件&quot;+file)
               var _body= document.getElementsByTagName('body')[0]; 
               var scriptEle= document.createElement('script'); 
               scriptEle.type= 'text/javascript'; 
               scriptEle.src= file; 
               scriptEle.async = true;
               SPA_RESOLVE_INIT = null;
               scriptEle.onload= function(){ 
                   console.log('下载'+file+'完成')
                   self.afterFun &amp;&amp; self.afterFun(transition)     
                   self.routers[transition.path].fn = SPA_RESOLVE_INIT;
                   self.routers[transition.path].fn(transition)
               } 
               _body.appendChild(scriptEle);         
           }        
        },
        //同步操作
        syncFun:function(callback,transition){
            this.afterFun &amp;&amp; this.afterFun(transition)
            callback &amp;&amp;　callback(transition)
        }

    }
    //注册到window全局
    window.spaRouters = new spaRouters();
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*
*author:https://github.com/kliuj
**使用方法
*        1：注册路由 : spaRouters.map('/name',function(transition){
                        //异步加载js 
                        spaRouters.asyncFun('name.js',transition)
                        //或者同步执行回调
                        spaRouters.syncFun(function(transition){},transition)
                    })
        2：初始化      spaRouters.init()
        3：跳转  href = '#/name'            
*/</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> util = {
        <span class="hljs-comment">//获取路由的路径和详细参数</span>
        getParamsUrl:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> hashDeatail = location.hash.split(<span class="hljs-string">"?"</span>),
                hashName = hashDeatail[<span class="hljs-number">0</span>].split(<span class="hljs-string">"#"</span>)[<span class="hljs-number">1</span>],<span class="hljs-comment">//路由地址</span>
                params = hashDeatail[<span class="hljs-number">1</span>] ? hashDeatail[<span class="hljs-number">1</span>].split(<span class="hljs-string">"&amp;"</span>) : [],<span class="hljs-comment">//参数内容</span>
                query = {};
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i&lt;params.length ; i++){
                <span class="hljs-keyword">var</span> item = params[i].split(<span class="hljs-string">"="</span>);
                query[item[<span class="hljs-number">0</span>]] = item[<span class="hljs-number">1</span>]
            }        
            <span class="hljs-keyword">return</span>     {
                <span class="hljs-attr">path</span>:hashName,
                <span class="hljs-attr">query</span>:query
            }
        }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">spaRouters</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.routers = {};<span class="hljs-comment">//保存注册的所有路由</span>
        <span class="hljs-keyword">this</span>.beforeFun = <span class="hljs-literal">null</span>;<span class="hljs-comment">//切换前</span>
        <span class="hljs-keyword">this</span>.afterFun = <span class="hljs-literal">null</span>;
    }
    spaRouters.prototype={
        <span class="hljs-attr">init</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
            <span class="hljs-comment">//页面加载匹配路由</span>
            <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'load'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                self.urlChange()
            })
            <span class="hljs-comment">//路由切换</span>
            <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'hashchange'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                self.urlChange()
            })
            <span class="hljs-comment">//异步引入js通过回调传递参数</span>
            <span class="hljs-built_in">window</span>.SPA_RESOLVE_INIT = <span class="hljs-literal">null</span>;
        },
        <span class="hljs-attr">refresh</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">currentHash</span>)</span>{
            <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">if</span>(self.beforeFun){    
                self.beforeFun({
                    <span class="hljs-attr">to</span>:{
                        <span class="hljs-attr">path</span>:currentHash.path,
                        <span class="hljs-attr">query</span>:currentHash.query
                    },
                    <span class="hljs-attr">next</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                        self.routers[currentHash.path].callback.call(self,currentHash)
                    }
                })
            }<span class="hljs-keyword">else</span>{
                self.routers[currentHash.path].callback.call(self,currentHash)
            }
        },
        <span class="hljs-comment">//路由处理</span>
        urlChange:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> currentHash = util.getParamsUrl();
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.routers[currentHash.path]){
                <span class="hljs-keyword">this</span>.refresh(currentHash)
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-comment">//不存在的地址重定向到首页</span>
                location.hash = <span class="hljs-string">'/index'</span>
            }
        },
        <span class="hljs-comment">//单层路由注册</span>
        map:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path,callback</span>)</span>{
            path = path.replace(<span class="hljs-regexp">/\s*/g</span>,<span class="hljs-string">""</span>);<span class="hljs-comment">//过滤空格</span>
            <span class="hljs-keyword">if</span>(callback &amp;&amp; <span class="hljs-built_in">Object</span>.prototype.toString.call(callback) === <span class="hljs-string">'[object Function]'</span> ){
                <span class="hljs-keyword">this</span>.routers[path] ={
                    <span class="hljs-attr">callback</span>:callback,<span class="hljs-comment">//回调</span>
                    fn:<span class="hljs-literal">null</span> <span class="hljs-comment">//存储异步文件状态</span>
                } 
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-built_in">console</span>.trace(<span class="hljs-string">'注册'</span>+path+<span class="hljs-string">'地址需要提供正确的的注册回调'</span>)
            }
        },
        <span class="hljs-comment">//切换之前一些处理</span>
        beforeEach:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.toString.call(callback) === <span class="hljs-string">'[object Function]'</span>){
                <span class="hljs-keyword">this</span>.beforeFun = callback;
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-built_in">console</span>.trace(<span class="hljs-string">'路由切换前钩子函数不正确'</span>)
            }
        },
        <span class="hljs-comment">//切换成功之后</span>
        afterEach:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>)</span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Object</span>.prototype.toString.call(callback) === <span class="hljs-string">'[object Function]'</span>){
                <span class="hljs-keyword">this</span>.afterFun = callback;
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-built_in">console</span>.trace(<span class="hljs-string">'路由切换后回调函数不正确'</span>)
            }
        },
        <span class="hljs-comment">//路由异步懒加载js文件</span>
        asyncFun:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file,transition</span>)</span>{
           <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
           <span class="hljs-keyword">if</span>(self.routers[transition.path].fn){
                   self.afterFun &amp;&amp; self.afterFun(transition)     
                   self.routers[transition.path].fn(transition)
           }<span class="hljs-keyword">else</span>{
                  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"开始异步下载js文件"</span>+file)
               <span class="hljs-keyword">var</span> _body= <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'body'</span>)[<span class="hljs-number">0</span>]; 
               <span class="hljs-keyword">var</span> scriptEle= <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>); 
               scriptEle.type= <span class="hljs-string">'text/javascript'</span>; 
               scriptEle.src= file; 
               scriptEle.async = <span class="hljs-literal">true</span>;
               SPA_RESOLVE_INIT = <span class="hljs-literal">null</span>;
               scriptEle.onload= <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
                   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'下载'</span>+file+<span class="hljs-string">'完成'</span>)
                   self.afterFun &amp;&amp; self.afterFun(transition)     
                   self.routers[transition.path].fn = SPA_RESOLVE_INIT;
                   self.routers[transition.path].fn(transition)
               } 
               _body.appendChild(scriptEle);         
           }        
        },
        <span class="hljs-comment">//同步操作</span>
        syncFun:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback,transition</span>)</span>{
            <span class="hljs-keyword">this</span>.afterFun &amp;&amp; <span class="hljs-keyword">this</span>.afterFun(transition)
            callback &amp;&amp;　callback(transition)
        }

    }
    <span class="hljs-comment">//注册到window全局</span>
    <span class="hljs-built_in">window</span>.spaRouters = <span class="hljs-keyword">new</span> spaRouters();
})()</code></pre>
<p>简单的单页面在github上有完整的demo<br><a href="https://github.com/kliuj/spa-routers" rel="nofollow noreferrer" target="_blank">spa-routers</a></p>
<p>以上仅是我个人的一些看法，如有疑问，感谢指导</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS原生一步步实现前端路由和单页面应用

## 原文链接
[https://segmentfault.com/a/1190000007422616](https://segmentfault.com/a/1190000007422616)

