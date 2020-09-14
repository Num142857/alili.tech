---
title: '菜鸟理解setTimeout和setInterval' 
date: 2019-01-07 2:30:11
hidden: true
slug: 38netzdpe2k
categories: [reprint]
---

{{< raw >}}

                    
<p>写在前面，最近在准备校招，陆陆续续做一些之前的总结，写了一个小系列的文章，想借此机会记录下来，也能以后有个地方能进行查阅，上一篇文章在<a href="https://segmentfault.com/a/1190000010278594?share_user=1030000004077616">css基础总结</a>希望能帮助一下和我一样的菜鸟们好了，正文开始。</p>
<p>这是一个老生常谈，新手掉坑的问题，算是一个比较经典的对于javascript运行机制的理解问题，我在这里粗浅的谈一下自己的理解，话不多说，进入正题：</p>
<h1 id="articleHeader0">两者表面上的区别</h1>
<ol>
<li><p>setTimeout() 方法用于在指定毫秒数之后调用其中的函数</p></li>
<li><p>setInterval() 方法则是在间隔一定毫秒后重复调用其中的函数</p></li>
</ol>
<h1 id="articleHeader1">透过现象看本质</h1>
<h2 id="articleHeader2">时间精确问题</h2>
<p>由于js是运行在单线程的环境当中的，单线程就意味着任务的执行需要依赖任务队列。实际运行时是将两个方法的代码块移出当前运行环境（从任务队列移出到回调队列中），当执行完当前任务后，检查回调队列中有无需要执行的任务（对应这两个方法为是否已经到执行时间），可是如果时间到时恰好有别的任务在进行的话，由于其单线程的机制，该方法就只能等到当前任务结束之后才能运行。</p>
<p>回到方法本身，这就相当于其他的正常任务在一个队列中，当遇到这两个方法时，就将他们移出队列，并开始计时，当时间到时，直接“插队”到队首，如果队首有正在执行的任务，则排在次队首，等待执行。也就是说，这仅仅是“计划”在未来某一个时间执行某个任务，并不能保证精确的时间。</p>
<h2 id="articleHeader3">setInterval重复执行问题</h2>
<p>这个方法执行时仅当没有该计时器的其他代码示例时才进行下一轮的执行。这样的规则就会导致某些间隔会被跳过，同时多个间隔可能比预期时间要短。所以为了避免setInterval所造成的问题，可以用setTimeout来通过循环代替setInterval方法，从而实现一个重复的定时器(除非必要，尽量避免代码中出现setInterval)</p>
<h2 id="articleHeader4">方法中使用this的问题</h2>
<p>在两个方法中传入函数时(即第一个函数参数中含有另外一个函数)，此函数中的this会只想window对象。这是由于两个方法调用的代码在与所在函数完全分离的执行环境上(第一条中有讲到的两个方法的运行机制)，这就会导致这些代码中包含的this关键字会指向window(或全局)对象。</p>
<p>但是要注意，如果this只是在两个方法中而不是在方法中的函数中时，this的指向符合我们的预期为当前对象。</p>
<h3 id="articleHeader5">解决方法：</h3>
<p>1.将当前对象的this存为一个变量，定时器内的函数利用闭包来访问这个变量，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 0;
function Obj (){
    var that = this;    //将this存为一个变量，此时的this指向obj
    this.num = 1,
    this.getNum = function(){
        console.log(this.num);
    },
    this.getNumLater = function(){
        setTimeout(function(){
            console.log(that.num);    //利用闭包访问that，that是一个指向obj的指针
        }, 1000)
    }
}
var obj = new Obj;
obj.getNum();          //1　　打印的为obj.num，值为1
obj.getNumLater()      //1　　打印的为obj.num，值为1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Obj</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;    <span class="hljs-comment">//将this存为一个变量，此时的this指向obj</span>
    <span class="hljs-keyword">this</span>.num = <span class="hljs-number">1</span>,
    <span class="hljs-keyword">this</span>.getNum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.num);
    },
    <span class="hljs-keyword">this</span>.getNumLater = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(that.num);    <span class="hljs-comment">//利用闭包访问that，that是一个指向obj的指针</span>
        }, <span class="hljs-number">1000</span>)
    }
}
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> Obj;
obj.getNum();          <span class="hljs-comment">//1　　打印的为obj.num，值为1</span>
obj.getNumLater()      <span class="hljs-comment">//1　　打印的为obj.num，值为1</span></code></pre>
<p>2.利用bind()方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 0;
function Obj (){
    this.num = 1,
    this.getNum = function(){
        console.log(this.num);
    },
    this.getNumLater = function(){
        setTimeout(function(){
            console.log(this.num);
        }.bind(this), 1000)    //利用bind()将this绑定到这个函数上
    }
}
var obj = new Obj;
obj.getNum();                 //1　　打印的为obj.num，值为1
obj.getNumLater()             //1　　打印的为obj.num，值为1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Obj</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.num = <span class="hljs-number">1</span>,
    <span class="hljs-keyword">this</span>.getNum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.num);
    },
    <span class="hljs-keyword">this</span>.getNumLater = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.num);
        }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">1000</span>)    <span class="hljs-comment">//利用bind()将this绑定到这个函数上</span>
    }
}
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> Obj;
obj.getNum();                 <span class="hljs-comment">//1　　打印的为obj.num，值为1</span>
obj.getNumLater()             <span class="hljs-comment">//1　　打印的为obj.num，值为1</span></code></pre>
<p>bind()方法是在Function.prototype上的一个方法，当被绑定函数执行时，bind方法会创建一个新函数，并将第一个参数作为新函数运行时的this。在这个例子中，在调用setTimeout中的函数时，bind方法创建了一个新的函数，并将this传进新的函数，执行的结果也就是正确的了。关于bind方法可参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" rel="nofollow noreferrer" target="_blank">MDN bind</a></p>
<h2 id="articleHeader6">清除计时器</h2>
<h3 id="articleHeader7">clearTimeout()</h3>
<p>在在使用setTimeout时，该方法会返回一个唯一的关于当前计时器的计时ID，在clearTimeout()方法中传入这个ID值即可取消对应的Timeout</p>
<h3 id="articleHeader8">clearInterval()</h3>
<p>同上</p>
<h2 id="articleHeader9">参考</h2>
<p>上面是我在使用过程中遇到问题后在网上查阅后自己的一些总结，希望对和我一样的新手有所帮助，想要更深入了解他们的区别和js的一些运行机制，请入传送门：</p>
<p><a href="http://javascript.ruanyifeng.com/advanced/timer.html" rel="nofollow noreferrer" target="_blank">传送门1---阮大的剖析</a></p>
<p><a href="http://www.cnblogs.com/zsqos/p/6188835.html" rel="nofollow noreferrer" target="_blank">传送门2---this指向</a></p>
<p><a href="http://www.cnblogs.com/dolphinX/archive/2013/04/05/2784933.html" rel="nofollow noreferrer" target="_blank">传送门3---调用执行</a><br><br><br></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
菜鸟理解setTimeout和setInterval

## 原文链接
[https://segmentfault.com/a/1190000010301690](https://segmentfault.com/a/1190000010301690)

