---
title: '【源码解析】Vue.js的监听实现' 
date: 2019-02-10 2:30:42
hidden: true
slug: d3etpoa3vli
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文地址： <a href="http://www.iamaddy.net/2016/11/vue-js-monitor-realize/" rel="nofollow noreferrer" target="_blank">http://www.iamaddy.net/2016/1...</a></p></blockquote>
<p>一说到监听，当然就离不了设计模式中鼎鼎大名的观察者模式。举个例子，你家后院着火了，可一定要等到烟雾很大火光很亮你才能发现啊，可是当你安装了一个火灾预警器，当发生火灾就立马能够通知到你了。这就是一个典型的观察者模式。当然也还有一些其他变种，比如发布/订阅（publish/subscribe）模式。</p>
<p>我们知道如果要将数据和视图关联起来，在数据变更的时候，同步视图，同理视图变更，数据也发生变化。vue.js是怎么实现这个的呢？下面我们来揭开它的神秘面纱。<br>demo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;../vue.js&quot;> </script>
<div id=&quot;app&quot;>
 <p>
      "{{" message "}}"
    </p>
    <input v-model=&quot;message&quot;>
</div>
<script type=&quot;text/javascript&quot;>
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
});
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../vue.js"</span>&gt;</span><span class="undefined"> </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      </span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"message"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  data: {
    message: <span class="hljs-string">'Hello Vue.js!'</span>
  }
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="set: function reactiveSetter(newVal) {
  var value = getter ? getter.call(obj) : val;
  if (newVal === value) {
    return;
  }
  if (setter) {
    setter.call(obj, newVal);
  } else {
    val = newVal;
  }
  childOb = observe(newVal);
  dep.notify();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">set</span>: <span class="hljs-type">function reactiveSetter</span>(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>) {
  <span class="hljs-keyword">var</span> value = getter ? getter.call(obj) : <span class="hljs-type">val</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Val</span> === value) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">if</span> (setter) {
    setter.call(obj, <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>);
  } <span class="hljs-keyword">else</span> {
    val = <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>;
  }
  childOb = observe(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>);
  dep.notify();
}</code></pre>
<p>这段代码出现在解析data属性的时候，即调用Object.defineProperty方法配置data的属性。一旦属性发生变化，就notify发送广播。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Dep.prototype.notify = function () {
  // stablize the subscriber list first
  var subs = toArray(this.subs);
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Dep.prototype.notify = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">// stablize the subscriber list first</span>
  <span class="hljs-keyword">var</span> subs = toArray(<span class="hljs-keyword">this</span>.subs);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
    subs[i].update();
  }
};</code></pre>
<p>notify 最终是周知subscribe（订阅者）更新，那么上面的数据变更就是发布者。<br>subscribe是Watcher这个类的实例化对象，在实例化的时候，会传入回调函数来执行update，vue弄了一个队列来执行watcher的更新函数，具体可参考源码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Watcher.prototype.run = function () {
    ……
    if (value !== this.value || (isObject(value) || this.deep) &amp;&amp; !this.shallow) {
      ……
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
    this.queued = this.shallow = false;
  }
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Watcher.prototype.run = function () {
    ……
    <span class="hljs-keyword">if</span> (value !== <span class="hljs-keyword">this</span>.value || (isObject(value) || <span class="hljs-keyword">this</span>.deep) &amp;&amp; !<span class="hljs-keyword">this</span>.shallow) {
      ……
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.cb.call(<span class="hljs-keyword">this</span>.vm, value, oldValue);
      }
    }
    <span class="hljs-keyword">this</span>.queued = <span class="hljs-keyword">this</span>.shallow = <span class="hljs-literal">false</span>;
  }
 };</code></pre>
<p>在Directive（指令）class中实例化了Watcher，_update函数负责来更新</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
      {
        filters: this.filters,
        twoWay: this.twoWay,
        deep: this.deep,
        preProcess: preProcess,
        postProcess: postProcess,
        scope: this._scope
      });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> watcher = <span class="hljs-keyword">this</span>._watcher = new Watcher(<span class="hljs-keyword">this</span>.vm, <span class="hljs-keyword">this</span>.expression, <span class="hljs-keyword">this</span>._update, <span class="hljs-comment">// callback</span>
      {
        filters: <span class="hljs-keyword">this</span>.filters,
        twoWay: <span class="hljs-keyword">this</span>.twoWay,
        deep: <span class="hljs-keyword">this</span>.deep,
        preProcess: preProcess,
        postProcess: postProcess,
        scope: <span class="hljs-keyword">this</span>._scope
      });</code></pre>
<p>在解析模板的时候会解析Directive，然后绑定，实例化watcher，这样模板-data就关联在一起了。<br><span class="img-wrap"><img data-src="/img/bVvugw?w=1592&amp;h=512" src="https://static.alili.tech/img/bVvugw?w=1592&amp;h=512" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>观察者模式</h4>
<p>林林总总的mvc或者mvvm框架基本也都是利用了观察者模式，这个也非常有用，尤其在复杂的系统之中。</p>
<p>利用观察者模式，在典型的ajax应用中，回调的处理逻辑可以不跟请求耦合在一块，这样逻辑上也会更加清晰。如下是一个简单的发布/订阅模式的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var PubSub = {};
(function (q) {
    var topics = {}, subUid = -1;
    q.publish = function (topic) {
        if(!topics[topic]){
            return false;
        }

        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;

        while(len--){
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift(topic);
            subscribers[len].callback.apply(this, args);
        }
        return this;
    };

    q.subscribe = function (topic, callback) {
        if(!topics[topic]){
            topics[topic] = [];
        }

        var subuid = (++subUid).toString();

        topics[topic].push({
            token: subuid,
            callback: callback
        });

        return subuid;
    };

    q.unsubscribe = function (subid) {
        for(var k in topics){
            if(topics[k]){
                for(var i = 0, j = topics[k].length; i < j; i++){
                    if(topics[k][i].token === subid){
                        topics[k].splice(i, 1);
                        return subid;
                    }
                }
            }
        }
        return this;
    };
})(PubSub);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> PubSub = {};
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">q</span>) </span>{
    <span class="hljs-keyword">var</span> topics = {}, subUid = <span class="hljs-number">-1</span>;
    q.publish = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">topic</span>) </span>{
        <span class="hljs-keyword">if</span>(!topics[topic]){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }

        <span class="hljs-keyword">var</span> subscribers = topics[topic],
            len = subscribers ? subscribers.length : <span class="hljs-number">0</span>;

        <span class="hljs-keyword">while</span>(len--){
            <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
            args.unshift(topic);
            subscribers[len].callback.apply(<span class="hljs-keyword">this</span>, args);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };

    q.subscribe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">topic, callback</span>) </span>{
        <span class="hljs-keyword">if</span>(!topics[topic]){
            topics[topic] = [];
        }

        <span class="hljs-keyword">var</span> subuid = (++subUid).toString();

        topics[topic].push({
            <span class="hljs-attr">token</span>: subuid,
            <span class="hljs-attr">callback</span>: callback
        });

        <span class="hljs-keyword">return</span> subuid;
    };

    q.unsubscribe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">subid</span>) </span>{
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> topics){
            <span class="hljs-keyword">if</span>(topics[k]){
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, j = topics[k].length; i &lt; j; i++){
                    <span class="hljs-keyword">if</span>(topics[k][i].token === subid){
                        topics[k].splice(i, <span class="hljs-number">1</span>);
                        <span class="hljs-keyword">return</span> subid;
                    }
                }
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    };
})(PubSub);</code></pre>
<p>这就是一个简单的订阅发布系统，每注册一个订阅者，其实就是将其回调处理的callback保存在一个字典对象的数组中，字典对象的key值可以随意定义，只要与发布时的key对应起来就好。怎么使用呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
var messageLogger = function(){
        console.log(JSON.stringify(arguments));
    };

var subscription = PubSub.subscribe('/newMessage', messageLogger);
// {&quot;0&quot;:&quot;/newMessage&quot;,&quot;1&quot;:&quot;hello world&quot;}
PubSub.publish('/newMessage', 'hello world');

// {&quot;0&quot;:&quot;/newMessage&quot;,&quot;1&quot;:[&quot;test&quot;,&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]}
PubSub.publish('/newMessage', ['test', 'a', 'b', 'c']);

// {&quot;0&quot;:&quot;/newMessage&quot;,&quot;1&quot;:{&quot;sender&quot;:&quot;hello world&quot;,&quot;body&quot;:&quot;hey man&quot;"}}"
PubSub.publish('/newMessage', {
    sender: 'hello world',
    body: 'hey man'
});

PubSub.unsubscribe(subscription);

PubSub.publish('/newMessage', ['test', 'a', 'b', 'c'], 1);
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>&lt;script&gt;
var messageLogger = <span class="hljs-keyword">function</span>(){
        console.log(JSON.stringify(arguments));
    };

var subscription = PubSub.subscribe(<span class="hljs-string">'/newMessage'</span>, messageLogger);
// {<span class="hljs-string">"0"</span>:<span class="hljs-string">"/newMessage"</span>,<span class="hljs-string">"1"</span>:<span class="hljs-string">"hello world"</span>}
PubSub.publish(<span class="hljs-string">'/newMessage'</span>, <span class="hljs-string">'hello world'</span>);

// {<span class="hljs-string">"0"</span>:<span class="hljs-string">"/newMessage"</span>,<span class="hljs-string">"1"</span>:[<span class="hljs-string">"test"</span>,<span class="hljs-string">"a"</span>,<span class="hljs-string">"b"</span>,<span class="hljs-string">"c"</span>]}
PubSub.publish(<span class="hljs-string">'/newMessage'</span>, [<span class="hljs-string">'test'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>]);

// {<span class="hljs-string">"0"</span>:<span class="hljs-string">"/newMessage"</span>,<span class="hljs-string">"1"</span>:{<span class="hljs-string">"sender"</span>:<span class="hljs-string">"hello world"</span>,<span class="hljs-string">"body"</span>:<span class="hljs-string">"hey man"</span>"}}"
PubSub.publish(<span class="hljs-string">'/newMessage'</span>, {
    sender: <span class="hljs-string">'hello world'</span>,
    body: <span class="hljs-string">'hey man'</span>
});

PubSub.unsubscribe(subscription);

PubSub.publish(<span class="hljs-string">'/newMessage'</span>, [<span class="hljs-string">'test'</span>, <span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>], <span class="hljs-number">1</span>);
&lt;/script&gt;
</code></pre>
<p>最后一个将不会打印出来，因为已经取消订阅了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【源码解析】Vue.js的监听实现

## 原文链接
[https://segmentfault.com/a/1190000005082164](https://segmentfault.com/a/1190000005082164)

