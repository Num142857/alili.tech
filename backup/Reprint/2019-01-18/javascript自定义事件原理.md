---
title: 'javascript自定义事件原理' 
date: 2019-01-18 2:30:34
hidden: true
slug: xtn6kddyf
categories: [reprint]
---

{{< raw >}}

                    
<p>我们都知道，鼠标点击click，触屏的touch等事件，可以触发相应的事件处理程序，也可以为这些事件添加事件处理程序，实际开发过程中可供我们使用的事件很少，click、doubleclick，mouseover、mousemove….等等这些。但当我们的程序越来越复杂的时候，光靠这些最底层的监听似乎已近不能满足我们的需求了。我们就需要我们自己去定义事件（其实就是我们写的函数），尤其是组件开发过程中，用的尤为多。</p>
<p>既然是事件，就要有事件的特性。我们要能为这个事件添加监听程序，这个事件触发时，监听程序也一定要触发才行。原理跟底层的事件类似。只不过，需要我们自己处理这些。</p>
<p>比如我们写了一个弹窗组件Box，他有弹出显示的方法show，还有关闭的方法close等。</p>
<p>可能有确定按钮、取消按钮等操作。随着产品或项目越复杂，被添加到这些确定或取消的操作也会越来越多。怎么办？一种是最原始的监听这些按钮的click事件，然后的写不同的回调。但是用回调的方式，有个弊端，当项目需求改变的时候，要往这个按钮上再另加个回调的时候，就要改原先的代码，要是以后再来一次，又要改。维护成本相当大。</p>
<p>我们不妨换个思路，把这个‘确定’或‘取消’想成像click这样的事件，当‘确定‘这个事件发生时其相应的一系列事件都会发生。就可以很好的解决这个问题。</p>
<p>基本原理：事件队列，即将监听程序存到一个数组中，再自定函数执行时，将添加监听数组中每个函数执行一遍。</p>
<p>定义一个对象专门用于存储自定义事件，定义一个方法用于注册监听，还有一个方法需要我们主动触发这个注册的监听程序(因为不像click等事件可以被浏览器监听捕获，浏览器无法识别我们自己定义的东西)。</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义一个Box类
function Box(){
    //other code
    this.handlers = {};//存储事件的对象 
}
Box.prototype = {
    constructor: Box,
    //显示方法
    show: function (){
        //code
        //this.fire('show');
    },
    //关闭方法
    close: function (){
         //code
        //this.fire('close');
    },
    //监听方法，模拟addEventListener,其中type为事件函数，handler为需要触发的函数。
    addListener: function (type,handler){    
        if (typeof this.handlers[type] == 'undefined')this.handlers[type] = []; 
        this.handlers[type].push(handler);//将要触发的函数压入事件函数命名的数组中
    },
    //手动触发方法
    fire: function (type){
        if ( this.handlers[type] instanceof Array ){
            var handlers = this.handlers[type];
            //遍历事件函数监听的程序，依次执行
            for (var i=0;i<handlers.length;i++){
               handlers[i]();
            }
        }
    },
    //事件解绑
    removeListener: function (type,handler){
        if (!this.handlers[type]) return;
        var handlers = this.handlers[type];
        if (handler == undefined){
          handlers.length = 0;//不传某个具体函数时，解绑所有
        }else if( handlers.length ){    
            for ( var i=0;i<handlers.length;i++ ){
                if ( handlers[i] == handler ){
                                //解绑单个
                    this.handlers[type].splice(i,1);
                }
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//定义一个Box类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Box</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//other code</span>
    <span class="hljs-keyword">this</span>.handlers = {};<span class="hljs-comment">//存储事件的对象 </span>
}
Box.prototype = {
    <span class="hljs-keyword">constructor</span>: Box,
    //显示方法
    show: function (<span class="hljs-params"></span>){
        <span class="hljs-comment">//code</span>
        <span class="hljs-comment">//this.fire('show');</span>
    },
    <span class="hljs-comment">//关闭方法</span>
    close: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
         <span class="hljs-comment">//code</span>
        <span class="hljs-comment">//this.fire('close');</span>
    },
    <span class="hljs-comment">//监听方法，模拟addEventListener,其中type为事件函数，handler为需要触发的函数。</span>
    addListener: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-keyword">type</span>,handler</span>)</span>{    
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.handlers[<span class="hljs-keyword">type</span>] == <span class="hljs-string">'undefined'</span>)<span class="hljs-keyword">this</span>.handlers[<span class="hljs-keyword">type</span>] = []; 
        <span class="hljs-keyword">this</span>.handlers[<span class="hljs-keyword">type</span>].push(handler);<span class="hljs-comment">//将要触发的函数压入事件函数命名的数组中</span>
    },
    <span class="hljs-comment">//手动触发方法</span>
    fire: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-keyword">type</span></span>)</span>{
        <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>.handlers[<span class="hljs-keyword">type</span>] <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> ){
            <span class="hljs-keyword">var</span> handlers = <span class="hljs-keyword">this</span>.handlers[<span class="hljs-keyword">type</span>];
            <span class="hljs-comment">//遍历事件函数监听的程序，依次执行</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;handlers.length;i++){
               handlers[i]();
            }
        }
    },
    <span class="hljs-comment">//事件解绑</span>
    removeListener: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-keyword">type</span>,handler</span>)</span>{
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.handlers[<span class="hljs-keyword">type</span>]) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">var</span> handlers = <span class="hljs-keyword">this</span>.handlers[<span class="hljs-keyword">type</span>];
        <span class="hljs-keyword">if</span> (handler == <span class="hljs-literal">undefined</span>){
          handlers.length = <span class="hljs-number">0</span>;<span class="hljs-comment">//不传某个具体函数时，解绑所有</span>
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>( handlers.length ){    
            <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;handlers.length;i++ ){
                <span class="hljs-keyword">if</span> ( handlers[i] == handler ){
                                <span class="hljs-comment">//解绑单个</span>
                    <span class="hljs-keyword">this</span>.handlers[<span class="hljs-keyword">type</span>].splice(i,<span class="hljs-number">1</span>);
                }
            }
        }
    }
}</code></pre>
<p>剩下就是在需要的的时候添加注册监听了，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = new Box();
function listenShow1(){
    console.log(11);
}
function listenShow2(){
    console.log(22);
}
box.addListener('show',listenShow1);
box.addListener('show',listenShow2);
box.show();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> box = <span class="hljs-keyword">new</span> Box();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">listenShow1</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">11</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">listenShow2</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">22</span>);
}
box.addListener(<span class="hljs-string">'show'</span>,listenShow1);
box.addListener(<span class="hljs-string">'show'</span>,listenShow2);
box.show();</code></pre>
<p>当show方法执行，在外部或者show方法内部执行，这个可能根据实际具体项目或这具体情况来确定。</p>
<p>当然以上只是基本原理，可能没有特别考虑更为复杂或具体的实际情况。比如解绑是只想解绑某一类，像jQuery那样，在事件身上加命名空间，解绑该命名空间上的所有函数。但是自定义事件的基本原理就是如上描绘的那样！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript自定义事件原理

## 原文链接
[https://segmentfault.com/a/1190000008778993](https://segmentfault.com/a/1190000008778993)

