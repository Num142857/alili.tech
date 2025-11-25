---
title: 'js处理异步函数：从callback到promise' 
date: 2018-12-09 2:30:08
hidden: true
slug: 4dfubuwj8kf
categories: [reprint]
---

{{< raw >}}

                    
<p>函数的执行分为同步和异步两种。<br>同步即为 同步连续执行，通俗点讲就是做完一件事，再去做另一件事。<br>异步即为 先做一件事，中间可以去做其他事情，稍后再回来做第一件事情。<br>同时还要记住两个特性：1.异步函数是没有返回值的，return不管用哦  2.try{}catch(e){}不能捕获异步函数中的异常。</p>
<p>js在处理异步回调函数的情况有着越来越值得推崇的方法及类库，下面会依次介绍js处理异步函数的发展史，及源码解读。<br>（本文代码是运行在node环境中）</p>
<h2 id="articleHeader0"><strong>1.callback</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fs = require('fs');
fs.readFile('./1.txt','utf8',function(err,data){
    console.log(data);
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
fs.readFile(<span class="hljs-string">'./1.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(data);
})
</code></pre>
<p>如果只有一个异步请求，那用callback还好，但是相信大多数前端开发者都遇到过这两种情况：<br>a.一个异步请求获取到的结果是下一个异步请求的参数。(一直嵌套callback，代码不好管理会形成回调地狱);</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fs = require('fs');
    fs.readFile('./1.txt','utf8',(err,data)=>{
        fs.readFile(data,'utf8',(err,data)=>{
            console.log(data);
        })
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>let fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
    fs.readFile(<span class="hljs-string">'./1.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-params">(err,data)</span>=&gt;</span>{
        fs.readFile(data,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-params">(err,data)</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(data);
        })
    })</code></pre>
<p>b.发出两个请求，只有当两个请求都成功获取到数据，在执行下一步操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fs =require('fs');
    fs.readFile('./1.txt','utf8',(err,data)=>{
        console.log(data);
    })
    fs.readFile('./2.txt','utf8',(err,data)=>{
        console.log(data);
    })

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>let fs =<span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
    fs.readFile(<span class="hljs-string">'./1.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-params">(err,data)</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(data);
    })
    fs.readFile(<span class="hljs-string">'./2.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-params">(err,data)</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(data);
    })

</code></pre>
<p>像类似这种情况，只有当读取到1.txt 和2.txt的文件的时候，我们同时获取到两个异步请求的结果。我们可以写一个计数器的函数，统一处理回调;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function after(time,callback){
    let arr = [];
    return function(data){
        arr.push(data)
        if(--time==0){
            callback(arr);
        }
    }
}
  //统一处理回调结果的回调传到after函数中。
  let out = after(2,(res)=>{console.log(res)});
  let fs =require('fs');
    fs.readFile('./1.txt','utf8',(err,data)=>{
        out(data);
    })
    fs.readFile('./2.txt','utf8',(err,data)=>{
        out(data);
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">after</span>(<span class="hljs-params">time,callback</span>)</span>{
    <span class="hljs-keyword">let</span> arr = [];
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        arr.push(data)
        <span class="hljs-keyword">if</span>(--time==<span class="hljs-number">0</span>){
            callback(arr);
        }
    }
}
  <span class="hljs-comment">//统一处理回调结果的回调传到after函数中。</span>
  <span class="hljs-keyword">let</span> out = after(<span class="hljs-number">2</span>,<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(res)});
  <span class="hljs-keyword">let</span> fs =<span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
    fs.readFile(<span class="hljs-string">'./1.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function">(<span class="hljs-params">err,data</span>)=&gt;</span>{
        out(data);
    })
    fs.readFile(<span class="hljs-string">'./2.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function">(<span class="hljs-params">err,data</span>)=&gt;</span>{
        out(data);
    })
</code></pre>
<p><strong>tips：</strong></p>
<p>方便我们更好的了解计数器的实现原理，我们需要了解一个概念：高阶函数<br>高阶函数：可以把函数作为参数 或者 return返回出一个函数。<br>举个例子：</p>
<p>①.判断一个变量是不是属于一个类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isType(type,content){
   return Object.protoType.toString.call(content) ==`[Object ${type}]`
}
let a = [1,2,3];
isType('Array', a) == true;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isType</span>(<span class="hljs-params">type,content</span>)</span>{
   <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.protoType.toString.call(content) ==<span class="hljs-string">`[Object <span class="hljs-subst">${type}</span>]`</span>
}
<span class="hljs-keyword">let</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
isType(<span class="hljs-string">'Array'</span>, a) == <span class="hljs-literal">true</span>;
</code></pre>
<p>②.js数据类型有好多，我们每次调用都要传入他的类型，麻不麻烦。所以我们写一个方法，可以批量生成函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isType(type){
    return function(content){
        return Object.protoType.toString.call(content) == `[Oject ${type}]`
    }
}
let isArray = isType('Array');
let a = [1,2,3]
isArray(a);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isType</span>(<span class="hljs-params">type</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">content</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.protoType.toString.call(content) == <span class="hljs-string">`[Oject <span class="hljs-subst">${type}</span>]`</span>
    }
}
<span class="hljs-keyword">let</span> isArray = isType(<span class="hljs-string">'Array'</span>);
<span class="hljs-keyword">let</span> a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
isArray(a);
</code></pre>
<p>前两种示例讲的是return返回一个函数，下面示例是一个预置函数及返回函数参数的结合示例（预置函数）。</p>
<p>③.场景加入我有一个函数，执行第三次的时候我想输出'我很可爱';平常我们可以这样去实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let time =0;
     function say(){
         if(++item==3){
         console.log('我很可爱')
         }
     }
     say();
     say();
     say();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>let <span class="hljs-built_in">time</span> =<span class="hljs-number">0</span>;
     function <span class="hljs-built_in">say</span>(){
         <span class="hljs-keyword">if</span>(++<span class="hljs-built_in">item</span>==<span class="hljs-number">3</span>){
         console.<span class="hljs-built_in">log</span>('我很可爱')
         }
     }
     <span class="hljs-built_in">say</span>();
     <span class="hljs-built_in">say</span>();
     <span class="hljs-built_in">say</span>();
</code></pre>
<p>高阶函数实现的话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function after(time,callback){
        return function(){
            if(--time ==0){
                   callback();
            }
        }
     }
     function say(){
         console.log('我很可爱');
     }
     let out =after(3,say)
     out();
     out();
     out();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code> <span class="hljs-keyword">function</span> <span class="hljs-title">after</span>(time,callback){
        <span class="hljs-keyword">return</span> <span class="hljs-type">function(){</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-comment">--time ==0){</span>
                   callback();
            }
        }
     }
     <span class="hljs-keyword">function</span> <span class="hljs-title">say</span>(){
         console.log('我很可爱');
     }
     let <span class="hljs-keyword">out</span> =after(<span class="hljs-number">3</span>,say)
     <span class="hljs-keyword">out</span>();
     <span class="hljs-keyword">out</span>();
     <span class="hljs-keyword">out</span>();</code></pre>
<p>高阶函数实现了将计时任务与业务逻辑拆分，高阶函数的实现主要得益于作用域的查找。</p>
<h2 id="articleHeader1"><strong>2.Promise</strong></h2>
<p>在看完了上面的callback讲述，主要其实还是讲述了callback的弊端:<br>a.回调地狱(callback无法解决)<br>b.并发请求，同时拿到结果(可通过计数器方式，但是太费劲，不太乐观)<br>这个时候duang~duang~duang~，ES6带着Promise来了~<br>Promise主要是es6提供的主要用于处理异步请求的一个对象，他能够很好的解决回调地狱以及并发请求。<br>在写promise源码之前，我们先通过几个调用promise的示例，了解一下promise的一些原理及特性,这在我们封装promise的时候能够起到很大的作用：<br>普通调用实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fs = require('fs');
let p = new Promise(function(resolve,reject){
  fs.readFile('./1.txt','utf8',(err,data)=>{
      err?reject(err):resolve(data);
  })
})

p.then((data)=>{console.log(data)},(err)=>{console.log(err)});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
  fs.readFile(<span class="hljs-string">'./1.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function">(<span class="hljs-params">err,data</span>)=&gt;</span>{
      err?reject(err):resolve(data);
  })
})

p.then(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)},<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)});
</code></pre>
<p>1.promise实例可以多次调用then方法;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  p.then((data)=>{console.log(data)},(err)=>{console.log(err)});
  p.then((data)=>{console.log(data)},(err)=>{console.log(err)});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)},<span class="hljs-function"><span class="hljs-params">(err)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)});
  p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)},<span class="hljs-function"><span class="hljs-params">(err)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)});
</code></pre>
<p>2.promise实例可以支持then方法的链式调用，jquery实现链式是通过返回当前的this。但是promise不可以通过返回this来实现。因为后续通过链式增加的then不是通过原始的promise对象的状态来决定走成功还是走失败的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.then((data)=>{console.log(data)},(err)=>{console.log(err)}).then((data)=>{console.log(data)})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)},<span class="hljs-function"><span class="hljs-params">(err)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)})
</code></pre>
<p>3.只要then方法中的成功回调和失败回调，有返回值(包括undefiend)，都会走到下个then方法中的成功回调中，并且把返回值作为下个then成功回调的参数传进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="第一个then走成功：
p.then((data)=>{return undefined},(err)={console.log()}).then((data)=>{console.log(data)})
输出：undefiend
第一个then走失败：
  p.then((data)=>{console.log(1)},(err)={return undefined).then((data)=>{console.log(data)})
输出：undefiend
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>第一个then走成功：
p.then(<span class="hljs-function">(<span class="hljs-params">data</span>)=&gt;</span>{<span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>},<span class="hljs-function">(<span class="hljs-params">err</span>)={<span class="hljs-params">console</span>.<span class="hljs-params">log</span><span class="hljs-params">()</span>}).<span class="hljs-params">then</span>(<span class="hljs-params">(<span class="hljs-params">data</span>)=&gt;{<span class="hljs-built_in">console</span>.log(<span class="hljs-params">data</span>)}</span>)
输出：<span class="hljs-params">undefiend</span>
第一个<span class="hljs-params">then</span>走失败：
  <span class="hljs-params">p</span>.<span class="hljs-params">then</span>(<span class="hljs-params">(<span class="hljs-params">data</span>)=&gt;{<span class="hljs-built_in">console</span>.log(<span class="hljs-params">1</span>)},(<span class="hljs-params">err</span>)={<span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span></span>).<span class="hljs-params">then</span>(<span class="hljs-params">(<span class="hljs-params">data</span>)=&gt;{<span class="hljs-built_in">console</span>.log(<span class="hljs-params">data</span>)}</span>)
输出：<span class="hljs-params">undefiend</span>
</span></code></pre>
<p>4.只要then方法中的成功回调和失败回调，有一个抛出异常，则都会走到下一个then中的失败回调中;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="第一个then走成功：
p.then((data)=>{throw new Err(&quot;错误&quot;)},(err)={console.log(1)}).then((data)=>{console.log('成功')},(err)=>{console.log(err)})
输出：错误
第一个then走失败：
  p.then((data)=>{console.log(1)},(err)={throw new Err(&quot;错误&quot;)).then((data)=>{console.log('成功')},(err)=>{console.log(err)})
输出：错误
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>第一个<span class="hljs-keyword">then</span>走成功：
p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> Err(<span class="hljs-string">"错误"</span>)},<span class="hljs-function"><span class="hljs-params">(err)</span>={console.log<span class="hljs-params">(<span class="hljs-number">1</span>)</span>}).then(<span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'成功'</span>)},<span class="hljs-function"><span class="hljs-params">(err)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)})
输出：错误
第一个<span class="hljs-keyword">then</span>走失败：
  p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)},<span class="hljs-function"><span class="hljs-params">(err)</span>={throw new Err<span class="hljs-params">(<span class="hljs-string">"错误"</span>)</span>).then(<span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'成功'</span>)},<span class="hljs-function"><span class="hljs-params">(err)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)})
输出：错误
</code></pre>
<p>5.成功和失败 只能走一个，如果成功了，就不会走失败，如果失败了，就不会走成功;</p>
<p>6.如果then方法中，返回的不是一个普通值，仍旧是一个promise对象，该如何处理？<br>  答案：它会等待这个promise的执行结果，并且传给下一个then方法。如果成功，就把这个promise的结果传给下一个then的成功回调并且执行，如果失败就把错误传给下一个then的失败回调并且执行。</p>
<p>7.具备catch捕获错误;如果catche前面的所有then方法都没有失败回调，则catche会捕获到错误信息执行他就是用来兜儿底用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p是一个失败的回调:
p.then((data)=>{console.log('成功')}).then((data)=>{成功}).catche(e){console.log('错误')}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>p是一个失败的回调:
p.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'成功'</span>)}).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(data)</span>=&gt;</span>{成功}).catche(e){<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'错误'</span>)}</code></pre>
<p>8.返回的结果和 promise是同一个，永远不会成功和失败</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var  r  = new Promise(function(resolve,reject){
   return r;
})
r.then(function(){
    console.log(1)
},function(err){
    console.log(err)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span>  r  = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
   <span class="hljs-keyword">return</span> r;
})
r.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-built_in">console</span>.log(err)
})
</code></pre>
<p>以上是经过调用es6提供的promise，发现的一些特性，下面我们会根据这些特性去封装Promise类。</p>
<p>一.我们先通过初步了解的promise和简单的基本调用，简单的实现一个promise；</p>
<p>1.Promise支持传入一个参数，函数类型，这个函数往往是我们自己发起异步请求的函数，我们称它为执行器actuator,这个函数会在调用new Promise()的作用域内立即执行，并且传入两个函数一个resolve另一个是reject作为参数;</p>
<p>2.promise对象支持.then()的方法，then方法支持两个参数一个为onFulfilled成功回调另一个为onRejected失败回调;onFulfilled接受参数data为异步请求拿到的数据，onRejected接受的参数为捕获到的异常错误。</p>
<p>3.当异步回调成功时，执行resolve，并且把回调结果传给resolve函数。失败则执行reject，把异常信息传给reject函数。(这一步往往是在actuator执行器函数中我们自己去控制执行的)</p>
<p>4.一个promise对象，执行了resolve，就不会在去执行reject。执行了reject，也不会在去执行resolve；<br> 所以promise内部中有一个类似状态机的机制，它分为三种状态，创建一个promise对象，默认状态为'pending'状态，当执行了resolve，则该状态变为'fulfilled'，若果执行了reject则该状态变为'rejected',所以我们在then方法中需要根据状态作出判断;</p>
<p>5.promise对象已经是成功状态或是失败状态时，都可以继续通过then传入函数，会通过当前的状态，来决定执行成功还失败，并且把结果或是错误传给相应的函数。所以我们需要拿到的结果和捕获的错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Promise(fn){
    this.status = 'pending';//状态机
    //一个promise支持执行多个then，所以需要一个池子把他的回调函数存储起来，统一遍历执行；
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks =[]; 
    //保存结果或者错误异常
    this.result = '';//当前promise回调成功获取到的数据;
    this.reason = '';//当前promise失败的原因
    var self = this;
    function resolve(data){
        //执行了reject就不能执行resolve，所以必须保证是pending状态；
        //当执行回调成功，在执行器调用resolve，我们去遍历成功回调的池子，依次执行;
        //保存结果，并且将当前状态设置为'fulfilled'
        if(self.status=='pending'){
            self.result = data;
            self.status = 'fulfilled';
            self.onFulfilledCallbacks.forEach((fn)=>{
                fn(data);
            })
        }
          
    }
    function reject(err){
        //执行了resolve就不能执行reject，所以必须保证是pending状态；
        //当执行回调失败，在执行器调用reject，我们去遍历成功回调的池子，依次执行;
        //保存错误原因并且将当前状态设置为'rejected'
        if(self.status=='pending'){
          self.reason= err;
          self.status ='rejected';
          self.onRejectedCallbacks.forEach((fn)=>{
              fn(err);
          })
        }
    }
    fn(resolve,reject)
}
Promise.prototype.then= function(onFulfilled,onRejected){
   //如果当前promise对象成功状态，则直接执行onFulfilled回调函数，并且把拿到的已经保存的成功数据传进去。
   if(this.status =='fulfilled'){
       onFulfilled(this.result)    
   }
   //如果当前promise对象失败状态，则直接执行rejected回调函数，并且把已经保存的补货失败的原因传进去。
   if(this.status =='rejected'){
       onRejected(this.reason);
   }
   if(this.status == 'pending'){
       this.onFulfilledCallbacks.push(onFulfilled);
       this.onRejectedCallbacks.push(onRejected);
   }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>)</span>{
    <span class="hljs-keyword">this</span>.status = <span class="hljs-string">'pending'</span>;<span class="hljs-comment">//状态机</span>
    <span class="hljs-comment">//一个promise支持执行多个then，所以需要一个池子把他的回调函数存储起来，统一遍历执行；</span>
    <span class="hljs-keyword">this</span>.onFulfilledCallbacks = [];
    <span class="hljs-keyword">this</span>.onRejectedCallbacks =[]; 
    <span class="hljs-comment">//保存结果或者错误异常</span>
    <span class="hljs-keyword">this</span>.result = <span class="hljs-string">''</span>;<span class="hljs-comment">//当前promise回调成功获取到的数据;</span>
    <span class="hljs-keyword">this</span>.reason = <span class="hljs-string">''</span>;<span class="hljs-comment">//当前promise失败的原因</span>
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-comment">//执行了reject就不能执行resolve，所以必须保证是pending状态；</span>
        <span class="hljs-comment">//当执行回调成功，在执行器调用resolve，我们去遍历成功回调的池子，依次执行;</span>
        <span class="hljs-comment">//保存结果，并且将当前状态设置为'fulfilled'</span>
        <span class="hljs-keyword">if</span>(self.status==<span class="hljs-string">'pending'</span>){
            self.result = data;
            self.status = <span class="hljs-string">'fulfilled'</span>;
            self.onFulfilledCallbacks.forEach(<span class="hljs-function">(<span class="hljs-params">fn</span>)=&gt;</span>{
                fn(data);
            })
        }
          
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">err</span>)</span>{
        <span class="hljs-comment">//执行了resolve就不能执行reject，所以必须保证是pending状态；</span>
        <span class="hljs-comment">//当执行回调失败，在执行器调用reject，我们去遍历成功回调的池子，依次执行;</span>
        <span class="hljs-comment">//保存错误原因并且将当前状态设置为'rejected'</span>
        <span class="hljs-keyword">if</span>(self.status==<span class="hljs-string">'pending'</span>){
          self.reason= err;
          self.status =<span class="hljs-string">'rejected'</span>;
          self.onRejectedCallbacks.forEach(<span class="hljs-function">(<span class="hljs-params">fn</span>)=&gt;</span>{
              fn(err);
          })
        }
    }
    fn(resolve,reject)
}
<span class="hljs-built_in">Promise</span>.prototype.then= <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFulfilled,onRejected</span>)</span>{
   <span class="hljs-comment">//如果当前promise对象成功状态，则直接执行onFulfilled回调函数，并且把拿到的已经保存的成功数据传进去。</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status ==<span class="hljs-string">'fulfilled'</span>){
       onFulfilled(<span class="hljs-keyword">this</span>.result)    
   }
   <span class="hljs-comment">//如果当前promise对象失败状态，则直接执行rejected回调函数，并且把已经保存的补货失败的原因传进去。</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status ==<span class="hljs-string">'rejected'</span>){
       onRejected(<span class="hljs-keyword">this</span>.reason);
   }
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status == <span class="hljs-string">'pending'</span>){
       <span class="hljs-keyword">this</span>.onFulfilledCallbacks.push(onFulfilled);
       <span class="hljs-keyword">this</span>.onRejectedCallbacks.push(onRejected);
   }
}

</code></pre>
<p>到目前为止我们已经封装了一个简易版的promise了，我们可以通过一些case去测试一下，是否满足上面所描述的特性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fs = require('fs');
let p = new Promise((resolve,reject)=>{
   fs.readFile('./1.txt','utf8',function (err,data) {
              err ? reject(err):resolve(data);
   })
});
p.then(data=>{console.log(data)},err=>{console.log(err)}); 
p.then(data=>{console.log(data)},err=>{console.log(err)});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
   fs.readFile(<span class="hljs-string">'./1.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err,data</span>) </span>{
              err ? reject(err):resolve(data);
   })
});
p.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)},<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)}); 
p.then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)},<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(err)});
</code></pre>
<p>二、我们简易版的promise类，已经初步实现了一些promise的基本特性;这一节我们我们简易版的promise进行改版，把promise的更复杂的功能增加进去。</p>
<p>1.当我们调用promise时，传入的执行器会立刻执行，执行器函数内部是一个同步的过程，我们可以用try...catch捕获错误，并且应该直接调用失败的函数。</p>
<p>2.promise支持链式写法，then后面继续.then ,原理并不是像jquery一样返回一个this;而是不管当前promise状态是什么，都返回一个新的promise对象，官方文档命名这个新的promise对象为promise2。<br>3.链式写法中第二个then中的回调走成功还是走失败，取决于上一个then中返回的promise（就是promise2）对象的状态。 而 promise2对象的状态，是由第一个then的参数（成功回调函数或失败回调函数）的返回值决定的。如果返回的是一个值（包括返回的是undefined、""），则第二个then走成功;如果返回的仍旧是一个promise对象，那么promise2会等待返回的这个promise对象的回调结果而确定promise2的状态值，如果回调结果拿到的是一个值（成功），那么promise2会将此值作为参数传入字节的reosolve中并执行,如果回调中抛出异常（失败），那么promise2会把异常传到reject中并且执行；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Promise(fn){
    this.status = 'pending';
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks =[]; 
    this.result = '';
    this.reason = '';
    var self = this;
    function resolve(data){
        if(self.status=='pending'){
            self.result = data;
            self.status = 'fulfilled';
            self.onFulfilledCallbacks.forEach((fn)=>{
                fn(data);
            })
        }
          
    }
    function reject(err){           
        if(self.status=='pending'){
          self.reason= err;
          self.status ='rejected';
          self.onRejectedCallbacks.forEach((fn)=>{
              fn(err);
          })
        }
    }
    try{
        fn(resolve,reject)
    }catch(e){
        reject(e)
    }
    
}
Promise.prototype.then= function(onFulfilled,onRejected){
   //then方法什么都不传，也可以支持连续调用  
   onFulfilled = onFulfilled ?onFulfilled :function(data){ return data};
   onRejected =onFulfilled ? onFulfilled :function(err){throw new Error(err)}
   let self = this;
   let Promise2;//声明primise2
   if(this.status =='fulfilled'){
       Promise2 = new Promise(function(resolve,reject){
           //promise2的状态，决定下一个then方法中执行成功还是失败。
           //promise2的状态,是由第一个then的onFulfilled的返回值决定的。
           //当我们执行onFulfilled(我们通过then方法传进来的自己的函数)的时候，是同步操作，需要通过trycatch捕获异常，如果发现异常就直接走下一个then的reject失败回调。
           //promise官方文档规定，每一个resolve或是reject回调的执行必须保证是在异步中执行，所以我们强制加定时器，保证onFulfilled是异步执行的。
           setTimeOut(function(){
               try{
                   let x = onFulfilled(self.result);
                   //获取到返回值，需要去解析，从而判断出promise2应该走失败还是成功。    
                   resolvePromise(Promise2,x,resolve,reject)                                              
               }catch(e){
                  //执行reject,下一个then就会走失败
                   reject(e);
               }
           })                                                      
       })          
   }
   if(this.status =='rejected'){
     Promise2 = new Promise(function(resolve,reject){
       setTimeout(function(){
           try{
               let x = onRejected(self.reason);
               resolvePromise(Promise2,x,resolve,reject)
           }catch(e){
               reject(e)
           }
       })
     })
       
   }
   if(this.status == 'pending'){
   Promise2 = new Promise(function(resolve,reject){
        self.onFulfilledCallbacks.push(function(){
            setTimeout(function(){
                try{
                    let x =  onFulfilled(self.result);
                    resolvePromise(Promise2,x,resolve,reject);
                }catch (e){
                    reject(e)
                }
            })

        });
        self.onRejectedCallbacks.push(function(){
            setTimeout(function(){
                try {
                    let x =  onRejected(self.reason);
                    resolvePromise(Promise2,x,resolve,reject)
                }catch (e){
                    reject(e);
                }
            })

        });
    })
   }
   return Promise2;
}

function resolvePromise(promise2,x,resolve,reject){
    //此处如果相等会爆出类型错误；
    if(promise2 == x){
        reject(new TypeError('循环引用了'))
    }
    //如果x是对象或函数(引用类型的值),则需要进一步判断。（这块儿要想的多一些，因为x是开发人员写的函数返回的，第一个then中回调返回的）
    //若果x是一个普通值，则直接执行resolve，并且传给下个then的成功; 
    //如果返回的是一个promise对象，则promise2则会等待返回的promise对象执行完成，如果执行完成后，看这个promise走的成功还是失败，如果失败则抛出异常。如果成功则将获取的数据作为onFulfilled返回的结果，用于判断promise2走成功或者失败，因为返回的结果可能还是promise对象，所以用递归去执行，知道拿到数据或者异常。（递归）
    //判断是不是promise对象，通过有没有then方法
    //捕获异常是因为判断不严谨，存在then方法，可能也不是promise对象，调用它的then可能会报错。      
    let called =false;
    if(x!==null &amp;&amp;(typeof x =='object'|| typeof x =='function')){        
           try{
               let then =x.then;
               if(typeof then =='function'){
                   //promise对象
                   then.call(x,function(y){
                       if(called)return;
                       called = true;
                       resolvePromise(promise2,y,resolve,reject)
                   },function(err){
                       if(called)return;
                       called = true;
                       reject(err)
                   })
               
               }else{
                   //普通对象
                   resolve(x)
               }
           }catch(e){
              if(called)return;
              called = true;
              reject(e)
           }
    }else{
        resolve(x);
    }    
}

 到此，Promise的大部分特性都已经具备了。但是Promise对象还有一些其他的方法，可供调用，比如说catch方法，还有他的私有属性all 、race、defferd，如果前面的Promise封装懂了，那这些方法就so easy了，下面会根据这些方法的功能一一进行封装,
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>)</span>{
    <span class="hljs-keyword">this</span>.status = <span class="hljs-string">'pending'</span>;
    <span class="hljs-keyword">this</span>.onFulfilledCallbacks = [];
    <span class="hljs-keyword">this</span>.onRejectedCallbacks =[]; 
    <span class="hljs-keyword">this</span>.result = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">this</span>.reason = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-keyword">if</span>(self.status==<span class="hljs-string">'pending'</span>){
            self.result = data;
            self.status = <span class="hljs-string">'fulfilled'</span>;
            self.onFulfilledCallbacks.forEach(<span class="hljs-function">(<span class="hljs-params">fn</span>)=&gt;</span>{
                fn(data);
            })
        }
          
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">err</span>)</span>{           
        <span class="hljs-keyword">if</span>(self.status==<span class="hljs-string">'pending'</span>){
          self.reason= err;
          self.status =<span class="hljs-string">'rejected'</span>;
          self.onRejectedCallbacks.forEach(<span class="hljs-function">(<span class="hljs-params">fn</span>)=&gt;</span>{
              fn(err);
          })
        }
    }
    <span class="hljs-keyword">try</span>{
        fn(resolve,reject)
    }<span class="hljs-keyword">catch</span>(e){
        reject(e)
    }
    
}
<span class="hljs-built_in">Promise</span>.prototype.then= <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFulfilled,onRejected</span>)</span>{
   <span class="hljs-comment">//then方法什么都不传，也可以支持连续调用  </span>
   onFulfilled = onFulfilled ?onFulfilled :<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{ <span class="hljs-keyword">return</span> data};
   onRejected =onFulfilled ? onFulfilled :<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(err)}
   <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
   <span class="hljs-keyword">let</span> Promise2;<span class="hljs-comment">//声明primise2</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status ==<span class="hljs-string">'fulfilled'</span>){
       Promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
           <span class="hljs-comment">//promise2的状态，决定下一个then方法中执行成功还是失败。</span>
           <span class="hljs-comment">//promise2的状态,是由第一个then的onFulfilled的返回值决定的。</span>
           <span class="hljs-comment">//当我们执行onFulfilled(我们通过then方法传进来的自己的函数)的时候，是同步操作，需要通过trycatch捕获异常，如果发现异常就直接走下一个then的reject失败回调。</span>
           <span class="hljs-comment">//promise官方文档规定，每一个resolve或是reject回调的执行必须保证是在异步中执行，所以我们强制加定时器，保证onFulfilled是异步执行的。</span>
           setTimeOut(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
               <span class="hljs-keyword">try</span>{
                   <span class="hljs-keyword">let</span> x = onFulfilled(self.result);
                   <span class="hljs-comment">//获取到返回值，需要去解析，从而判断出promise2应该走失败还是成功。    </span>
                   resolvePromise(Promise2,x,resolve,reject)                                              
               }<span class="hljs-keyword">catch</span>(e){
                  <span class="hljs-comment">//执行reject,下一个then就会走失败</span>
                   reject(e);
               }
           })                                                      
       })          
   }
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status ==<span class="hljs-string">'rejected'</span>){
     Promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
       setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           <span class="hljs-keyword">try</span>{
               <span class="hljs-keyword">let</span> x = onRejected(self.reason);
               resolvePromise(Promise2,x,resolve,reject)
           }<span class="hljs-keyword">catch</span>(e){
               reject(e)
           }
       })
     })
       
   }
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status == <span class="hljs-string">'pending'</span>){
   Promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
        self.onFulfilledCallbacks.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">try</span>{
                    <span class="hljs-keyword">let</span> x =  onFulfilled(self.result);
                    resolvePromise(Promise2,x,resolve,reject);
                }<span class="hljs-keyword">catch</span> (e){
                    reject(e)
                }
            })

        });
        self.onRejectedCallbacks.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">let</span> x =  onRejected(self.reason);
                    resolvePromise(Promise2,x,resolve,reject)
                }<span class="hljs-keyword">catch</span> (e){
                    reject(e);
                }
            })

        });
    })
   }
   <span class="hljs-keyword">return</span> Promise2;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolvePromise</span>(<span class="hljs-params">promise2,x,resolve,reject</span>)</span>{
    <span class="hljs-comment">//此处如果相等会爆出类型错误；</span>
    <span class="hljs-keyword">if</span>(promise2 == x){
        reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">'循环引用了'</span>))
    }
    <span class="hljs-comment">//如果x是对象或函数(引用类型的值),则需要进一步判断。（这块儿要想的多一些，因为x是开发人员写的函数返回的，第一个then中回调返回的）</span>
    <span class="hljs-comment">//若果x是一个普通值，则直接执行resolve，并且传给下个then的成功; </span>
    <span class="hljs-comment">//如果返回的是一个promise对象，则promise2则会等待返回的promise对象执行完成，如果执行完成后，看这个promise走的成功还是失败，如果失败则抛出异常。如果成功则将获取的数据作为onFulfilled返回的结果，用于判断promise2走成功或者失败，因为返回的结果可能还是promise对象，所以用递归去执行，知道拿到数据或者异常。（递归）</span>
    <span class="hljs-comment">//判断是不是promise对象，通过有没有then方法</span>
    <span class="hljs-comment">//捕获异常是因为判断不严谨，存在then方法，可能也不是promise对象，调用它的then可能会报错。      </span>
    <span class="hljs-keyword">let</span> called =<span class="hljs-literal">false</span>;
    <span class="hljs-keyword">if</span>(x!==<span class="hljs-literal">null</span> &amp;&amp;(<span class="hljs-keyword">typeof</span> x ==<span class="hljs-string">'object'</span>|| <span class="hljs-keyword">typeof</span> x ==<span class="hljs-string">'function'</span>)){        
           <span class="hljs-keyword">try</span>{
               <span class="hljs-keyword">let</span> then =x.then;
               <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> then ==<span class="hljs-string">'function'</span>){
                   <span class="hljs-comment">//promise对象</span>
                   then.call(x,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
                       <span class="hljs-keyword">if</span>(called)<span class="hljs-keyword">return</span>;
                       called = <span class="hljs-literal">true</span>;
                       resolvePromise(promise2,y,resolve,reject)
                   },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
                       <span class="hljs-keyword">if</span>(called)<span class="hljs-keyword">return</span>;
                       called = <span class="hljs-literal">true</span>;
                       reject(err)
                   })
               
               }<span class="hljs-keyword">else</span>{
                   <span class="hljs-comment">//普通对象</span>
                   resolve(x)
               }
           }<span class="hljs-keyword">catch</span>(e){
              <span class="hljs-keyword">if</span>(called)<span class="hljs-keyword">return</span>;
              called = <span class="hljs-literal">true</span>;
              reject(e)
           }
    }<span class="hljs-keyword">else</span>{
        resolve(x);
    }    
}

 到此，<span class="hljs-built_in">Promise</span>的大部分特性都已经具备了。但是<span class="hljs-built_in">Promise</span>对象还有一些其他的方法，可供调用，比如说<span class="hljs-keyword">catch</span>方法，还有他的私有属性all 、race、defferd，如果前面的<span class="hljs-built_in">Promise</span>封装懂了，那这些方法就so easy了，下面会根据这些方法的功能一一进行封装,
 </code></pre>
<p>1.all方法处理 并发请求，同时获得结果。一个失败，则失败，都成功，才算成功.这个时候我们就想到前面我们写的计数器的用法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Promise.all([read('./1.txt'),read('./2.txt')]).then(res=>{console.log(res)})
 
 Promise.all = function(promiseArray){               
       return new Promise(function(resolve,reject){
           var result = [];
           var i=0;
           function processData(index,res){
               result[index] = res;
               if(++i==promiseArray.length){
                   resolve(result)
               } 
           }
           promiseArray.forEach((item,index)=>{
               item.then(res=>{processData(index,res)},reject)
           })
       })        
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-built_in">Promise</span>.all([read(<span class="hljs-string">'./1.txt'</span>),read(<span class="hljs-string">'./2.txt'</span>)]).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(res)})
 
 <span class="hljs-built_in">Promise</span>.all = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promiseArray</span>)</span>{               
       <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
           <span class="hljs-keyword">var</span> result = [];
           <span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;
           <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processData</span>(<span class="hljs-params">index,res</span>)</span>{
               result[index] = res;
               <span class="hljs-keyword">if</span>(++i==promiseArray.length){
                   resolve(result)
               } 
           }
           promiseArray.forEach(<span class="hljs-function">(<span class="hljs-params">item,index</span>)=&gt;</span>{
               item.then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{processData(index,res)},reject)
           })
       })        
 };</code></pre>
<p>2.race方法，Pomise.race，顾名思义“赛拍”，传入多个异步promise，只要有一个成功，则就成功，有一个失败则失败，后面也可跟then方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.race = function(promiseArray){
    return new Promise(function(resolve,reject){
        promiseArray.forEach((item,index)=>{
            item.then(resolve,reject);
        })
    })
}
Promise.race([read('./1.txt'),read('./5.txt')]).then(res=>{console.log(res)},err=>{console.log(err)})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.race = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promiseArray</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
        promiseArray.forEach(<span class="hljs-function">(<span class="hljs-params">item,index</span>)=&gt;</span>{
            item.then(resolve,reject);
        })
    })
}
<span class="hljs-built_in">Promise</span>.race([read(<span class="hljs-string">'./1.txt'</span>),read(<span class="hljs-string">'./5.txt'</span>)]).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(res)},err=&gt;{<span class="hljs-built_in">console</span>.log(err)})</code></pre>
<p>3.生成一个成功的promise，把传入的参数，传入到then的成功回调中,该方法返回一个promise</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve=function(value){
    return new Promise(function(resolve,reject){
        //promise规范 resolve和reject函数必须是在异步回调中执行
        setTimeout(function(){
            resolve(value);
        })
    })
}
Promise.resolve('123').then(res=>{console.log(res)})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.resolve=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
        <span class="hljs-comment">//promise规范 resolve和reject函数必须是在异步回调中执行</span>
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            resolve(value);
        })
    })
}
<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'123'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(res)})
</code></pre>
<p>4.生成一个失败的promise，把传入的参数，传入到then的失败回调中。该方法返回一个promise</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject = function(err){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            reject(err);
        })

    })
}
Promise.reject('error').then(res=>{console.log(res)},err=>{console.log(err)})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.reject = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            reject(err);
        })

    })
}
<span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'error'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(res)},err=&gt;{<span class="hljs-built_in">console</span>.log(err)})
</code></pre>
<p>5.catch托底捕获错误，这个方法是实例的共有方法，应该放到Promise的原型上，每一个                promise实例都可以调用.它支持一个参数，该参数是之前所有的then中，并没有失败回调，当发        生错误时，最后统一在catch中进行捕获</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.prototype.catch = function(calllback){
return this.then(null,callback)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>Promise.prototype.<span class="hljs-keyword">catch</span> = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(calllback){
<span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>.then(<span class="hljs-literal">null</span>,<span class="hljs-keyword">callback</span>)
}
</code></pre>
<p>6.很多人都用过jquery的deferrd对象，他和promise的deffer对象很类似。promise的deferred对象只是对promise进行了一次封装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.defer = Promise.deferred=function(){
    var obj = {};
    obj.promise = new Promise(function(resolve,reject){
        obj.resolve = resolve;
        obj.reject = reject;
    })
    return obj;
}
    let fs = require('fs');
 function read2 (url){
    var deferr = Promise.deferred();
    fs.readFile('./1.txt','utf8',(err,res)=>{
        err?deferr.reject(err):deferr.resolve(res);
    })
     return deferr;
}
read2('./1.txt').then(data=>{console.log(data)})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Promise</span>.defer = <span class="hljs-built_in">Promise</span>.deferred=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> obj = {};
    obj.promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
        obj.resolve = resolve;
        obj.reject = reject;
    })
    <span class="hljs-keyword">return</span> obj;
}
    <span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">read2</span> (<span class="hljs-params">url</span>)</span>{
    <span class="hljs-keyword">var</span> deferr = <span class="hljs-built_in">Promise</span>.deferred();
    fs.readFile(<span class="hljs-string">'./1.txt'</span>,<span class="hljs-string">'utf8'</span>,(err,res)=&gt;{
        err?deferr.reject(err):deferr.resolve(res);
    })
     <span class="hljs-keyword">return</span> deferr;
}
read2(<span class="hljs-string">'./1.txt'</span>).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(data)})</code></pre>
<p>至此，一个完整的Promise.js封装完成，当然最后是需要模块化导出的，我们采用CommonJS规范导出一个模块 采用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = Promise;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = Promise;
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js处理异步函数：从callback到promise

## 原文链接
[https://segmentfault.com/a/1190000013871753](https://segmentfault.com/a/1190000013871753)

