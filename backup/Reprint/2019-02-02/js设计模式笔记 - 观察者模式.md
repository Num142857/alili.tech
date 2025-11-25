---
title: 'js设计模式笔记 - 观察者模式' 
date: 2019-02-02 2:30:10
hidden: true
slug: fn19u3r7edt
categories: [reprint]
---

{{< raw >}}

                    
<p>观察者模式，定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。<br> 事实上，只要你曾经在DOM节点上绑定过事件函数，那么你就曾经使用过观察者模式了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.body.addEventListener('click', function () {
    alert(2);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>document.<span class="hljs-keyword">body</span>.addEventListener(<span class="hljs-symbol">'click</span>', <span class="hljs-keyword">function</span> <span class="hljs-title"></span>() {
    alert(2);
});</code></pre>
<p>但是这只是对观察者模式最简单的使用，在很多场景下我们经常会实现一些自定义事件来满足我们的需求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="举个例子：

你去一家公司应聘，谈了一顿下来，hr跟你说:&quot;好了，你回去等通知吧！&quot;。
这个时候，1.你会问公司的电话，然后每天打过去问一遍结果
          2.把自己的手机号留给hr，然后等他给你打电话
          
相信很多时候呢，大家都是选择了后者。
万一你每天给hr打电话弄烦他了，或许他本来打算招你的，现在也不再打算再鸟你啦！

那么这个时候，hr就相当于一个发布者，而你就是一个订阅者啦！

好吧，大部分叫你回去等消息的就等于没救啦......
我还遇到过一个如果你没被录取，就连通知都不通知你的公司！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>举个例子：

你去一家公司应聘，谈了一顿下来，hr跟你说:<span class="hljs-string">"好了，你回去等通知吧！"</span>。
这个时候，<span class="hljs-number">1.</span>你会问公司的电话，然后每天打过去问一遍结果
          <span class="hljs-number">2.</span>把自己的手机号留给hr，然后等他给你打电话
          
相信很多时候呢，大家都是选择了后者。
万一你每天给hr打电话弄烦他了，或许他本来打算招你的，现在也不再打算再鸟你啦！

那么这个时候，hr就相当于一个发布者，而你就是一个订阅者啦！

好吧，大部分叫你回去等消息的就等于没救啦......
我还遇到过一个如果你没被录取，就连通知都不通知你的公司！
</code></pre>
<p>那么一个简单的观察者模式应该怎么实现呢？</p>
<ol>
<li>要指定一个发布者；</li>
<li>给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者；（这家公司很多人来应聘）</li>
<li>最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数；（你up or 你over）</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var event = {};    //发布者（hr）
event.clietList = []; //发布者的缓存列表（应聘者列表）

event.listen = function(fn) { //增加订阅者函数
    this.clietList.push(fn);
};

event.trigger = function() { //发布消息函数
    for (var i = 0; i < this.clietList.length; i++) {
        var fn = this.clietList[i];
        fn.apply(this, arguments);
    }
};

event.listen(function(time) { //某人订阅了这个消息
    console.log('正式上班时间：' + time);
});

event.trigger('2016/10',yes); //发布消息
//输出 正式上班时间:2016/10  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> event = {};    <span class="hljs-comment">//发布者（hr）</span>
event.clietList = []; <span class="hljs-comment">//发布者的缓存列表（应聘者列表）</span>

event.listen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{ <span class="hljs-comment">//增加订阅者函数</span>
    <span class="hljs-keyword">this</span>.clietList.push(fn);
};

event.trigger = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//发布消息函数</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.clietList.length; i++) {
        <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">this</span>.clietList[i];
        fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    }
};

event.listen(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) </span>{ <span class="hljs-comment">//某人订阅了这个消息</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正式上班时间：'</span> + time);
});

event.trigger(<span class="hljs-string">'2016/10'</span>,yes); <span class="hljs-comment">//发布消息</span>
<span class="hljs-comment">//输出 正式上班时间:2016/10  </span></code></pre>
<p>到这里，我们已经实现了一个最简单的观察者模式了！</p>
<p>但是上面的函数其实存在一个问题，那就是发布者没办法选择自己要发布的消息类型！<br>比如这家公司同时在招php，web前端，如果使用上面的函数就没办法区分职位了！只能一次性把全部订阅者都发送一遍消息。<br>对上面的代码进行改写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var event = {}; //发布者（hr）
event.clietList = []; //发布者的缓存列表（应聘者列表）

event.listen = function(key, fn) { //增加订阅者函数
    if (!this.clietList[key]) {
        this.clietList[key] = [];
    }
    this.clietList[key].push(fn);
};

event.trigger = function() { //发布消息函数
    var key = Array.prototype.shift.call(arguments),
        fns = this.clietList[key];
    for (var i = 0; i < fns.length; i++) {
        var fn = fns[i];
        fn.apply(this, arguments);
    }
};

event.listen('web前端', fn1 = function(time) { //小强订阅了这个消息。
    console.log('姓名：小强');
    console.log('正式上班时间：' + time);
});

event.listen('web前端', fn2 = function(time) { //大大强订阅了这个消息
    console.log('姓名：大大强');
    console.log('正式上班时间：' + time);
});

//发布者发布消息
event.trigger('web前端','小强', '2016/10'); //姓名：小强   正式上班时间：2016/10  
event.trigger('php','大大强', '2016/15'); //姓名：大大强   正式上班时间：2016/15   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> event = {}; <span class="hljs-comment">//发布者（hr）</span>
event.clietList = []; <span class="hljs-comment">//发布者的缓存列表（应聘者列表）</span>

event.listen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, fn</span>) </span>{ <span class="hljs-comment">//增加订阅者函数</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.clietList[key]) {
        <span class="hljs-keyword">this</span>.clietList[key] = [];
    }
    <span class="hljs-keyword">this</span>.clietList[key].push(fn);
};

event.trigger = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//发布消息函数</span>
    <span class="hljs-keyword">var</span> key = <span class="hljs-built_in">Array</span>.prototype.shift.call(<span class="hljs-built_in">arguments</span>),
        fns = <span class="hljs-keyword">this</span>.clietList[key];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; fns.length; i++) {
        <span class="hljs-keyword">var</span> fn = fns[i];
        fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    }
};

event.listen(<span class="hljs-string">'web前端'</span>, fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) </span>{ <span class="hljs-comment">//小强订阅了这个消息。</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'姓名：小强'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正式上班时间：'</span> + time);
});

event.listen(<span class="hljs-string">'web前端'</span>, fn2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) </span>{ <span class="hljs-comment">//大大强订阅了这个消息</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'姓名：大大强'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正式上班时间：'</span> + time);
});

<span class="hljs-comment">//发布者发布消息</span>
event.trigger(<span class="hljs-string">'web前端'</span>,<span class="hljs-string">'小强'</span>, <span class="hljs-string">'2016/10'</span>); <span class="hljs-comment">//姓名：小强   正式上班时间：2016/10  </span>
event.trigger(<span class="hljs-string">'php'</span>,<span class="hljs-string">'大大强'</span>, <span class="hljs-string">'2016/15'</span>); <span class="hljs-comment">//姓名：大大强   正式上班时间：2016/15   </span></code></pre>
<p>通过添加了一个key，我们实现了对职位的判断。</p>
<p>有了订阅事件，我们怎么能少了取消订阅事件呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.remove = function(key, fn) {
    var fns = this.clietList[key];
    if (!fns) {
        return false;
    }
    if (!fn) { //如果没有传入fn回调函数，直接取消key对应消息的所有订阅
        this.clietList[key] = [];
    } else {
        for (var i = 0; i < fns.length; i++) { //遍历回调函数列表
            var _fn = fns[i];
            if (_fn === fn) {
                fns.splice(i, 1); //删除订阅者的回调函数
            }
        }
    }
};
//这时候必须指定回调函数，否则无法在remove函数中进行对比删除。
event.listen('web前端', fn1 = function(time) { //小强订阅了这个消息。
    console.log('姓名：小强');
    console.log('正式上班时间：' + time);
});

event.listen('web前端', fn2 = function(time) { //大大强订阅了这个消息
    console.log('姓名：大大强');
    console.log('正式上班时间：' + time);
});

event.remove('web前端',fn1);

//发布者发布消息
event.trigger('web前端','2016/10');

//输出 姓名：大大强   正式上班时间：2016/10 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>event.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, fn</span>) </span>{
    <span class="hljs-keyword">var</span> fns = <span class="hljs-keyword">this</span>.clietList[key];
    <span class="hljs-keyword">if</span> (!fns) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">if</span> (!fn) { <span class="hljs-comment">//如果没有传入fn回调函数，直接取消key对应消息的所有订阅</span>
        <span class="hljs-keyword">this</span>.clietList[key] = [];
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; fns.length; i++) { <span class="hljs-comment">//遍历回调函数列表</span>
            <span class="hljs-keyword">var</span> _fn = fns[i];
            <span class="hljs-keyword">if</span> (_fn === fn) {
                fns.splice(i, <span class="hljs-number">1</span>); <span class="hljs-comment">//删除订阅者的回调函数</span>
            }
        }
    }
};
<span class="hljs-comment">//这时候必须指定回调函数，否则无法在remove函数中进行对比删除。</span>
event.listen(<span class="hljs-string">'web前端'</span>, fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) </span>{ <span class="hljs-comment">//小强订阅了这个消息。</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'姓名：小强'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正式上班时间：'</span> + time);
});

event.listen(<span class="hljs-string">'web前端'</span>, fn2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) </span>{ <span class="hljs-comment">//大大强订阅了这个消息</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'姓名：大大强'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'正式上班时间：'</span> + time);
});

event.remove(<span class="hljs-string">'web前端'</span>,fn1);

<span class="hljs-comment">//发布者发布消息</span>
event.trigger(<span class="hljs-string">'web前端'</span>,<span class="hljs-string">'2016/10'</span>);

<span class="hljs-comment">//输出 姓名：大大强   正式上班时间：2016/10 </span></code></pre>
<p>对上面代码进行改进，创建一个全局对象来实现观察者模式，<br>使用闭包实现私有变量，仅暴露必须的API给使用者：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var event = (function() {
    var clietList = []; //发布者的缓存列表（应聘者列表）

    var listen = function(key, fn) { //增加订阅者函数
        if (!this.clietList[key]) {
            this.clietList[key] = [];
        }
        this.clietList[key].push(fn);
    };

    var trigger = function() { //发布消息函数
        var key = Array.prototype.shift.call(arguments),
            fns = this.clietList[key];
        for (var i = 0; i < fns.length; i++) {
            var fn = fns[i];
            fn.apply(this, arguments);
        }
    };

    var remove = function(key, fn) {
        var fns = this.clietList[key];
        if (!fns) {
            return false;
        }
        if (!fn) { //如果没有传入fn回调函数，直接取消key对应消息的所有订阅
            this.clietList[key] = [];
        } else {
            for (var i = 0; i < fns.length; i++) { //遍历回调函数列表
                var _fn = fns[i];
                if (_fn === fn) {
                    fns.splice(i, 1); //删除订阅者的回调函数
                }
            }
        }
    };
    
    return{
        listen:listen,
        trigger:trigger,
        remove:remove
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> event = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> clietList = []; <span class="hljs-comment">//发布者的缓存列表（应聘者列表）</span>

    <span class="hljs-keyword">var</span> listen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, fn</span>) </span>{ <span class="hljs-comment">//增加订阅者函数</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.clietList[key]) {
            <span class="hljs-keyword">this</span>.clietList[key] = [];
        }
        <span class="hljs-keyword">this</span>.clietList[key].push(fn);
    };

    <span class="hljs-keyword">var</span> trigger = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//发布消息函数</span>
        <span class="hljs-keyword">var</span> key = <span class="hljs-built_in">Array</span>.prototype.shift.call(<span class="hljs-built_in">arguments</span>),
            fns = <span class="hljs-keyword">this</span>.clietList[key];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; fns.length; i++) {
            <span class="hljs-keyword">var</span> fn = fns[i];
            fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
    };

    <span class="hljs-keyword">var</span> remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, fn</span>) </span>{
        <span class="hljs-keyword">var</span> fns = <span class="hljs-keyword">this</span>.clietList[key];
        <span class="hljs-keyword">if</span> (!fns) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-keyword">if</span> (!fn) { <span class="hljs-comment">//如果没有传入fn回调函数，直接取消key对应消息的所有订阅</span>
            <span class="hljs-keyword">this</span>.clietList[key] = [];
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; fns.length; i++) { <span class="hljs-comment">//遍历回调函数列表</span>
                <span class="hljs-keyword">var</span> _fn = fns[i];
                <span class="hljs-keyword">if</span> (_fn === fn) {
                    fns.splice(i, <span class="hljs-number">1</span>); <span class="hljs-comment">//删除订阅者的回调函数</span>
                }
            }
        }
    };
    
    <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">listen</span>:listen,
        <span class="hljs-attr">trigger</span>:trigger,
        <span class="hljs-attr">remove</span>:remove
    }
})();</code></pre>
<p>观察者模式进阶：</p>
<ol>
<li>使用命名空间防止事件名冲突</li>
<li>实现先发布后订阅功能</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js设计模式笔记 - 观察者模式

## 原文链接
[https://segmentfault.com/a/1190000007248460](https://segmentfault.com/a/1190000007248460)

