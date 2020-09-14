---
title: 'JavaScript设计模式之发布-订阅模式（观察者模式）-Part1' 
date: 2019-02-01 2:30:10
hidden: true
slug: z193p9xv2p
categories: [reprint]
---

{{< raw >}}

                    
<p>《JavaScript设计模式与开发实践》读书笔记。</p>
<p>发布-订阅模式又叫观察者模式，它定义了对象之间的一种一对多的依赖关系。当一个对象的状态发生改变时，所有依赖它的对象都将得到通知。</p>
<p>例如：在segmentfault我们关注了某一个问题，这个时候可以说是订阅了这个问题的消息。当该问题有了新的回答、评论的时候，segmentfault系统就会遍历关注了这个问题的用户，一次给用户发消息。</p>
<p>现在看看如何一步步实现发布-订阅模式。</p>
<ul>
<li><p>首先，指定好发布者（如 segmentfault 的 问题系统）</p></li>
<li><p>接着，给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者（问题系统的记录表）</p></li>
<li><p>最后，当发布者发布消息的时候，会遍历缓存列表，依次触发里面的回调函数（遍历记录表，逐个发消息）</p></li>
</ul>
<p>我们还可以在回调函数里面加入一些参数，订阅者可以接收这些参数，进行各自的处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sgQuestionSystem = {};    // 定义segmentfault的问题系统

/* 
 * 缓存列表
 * clientList: {
 *    key: [
 *        id: <int>,        // 唯一标识
 *        fn: null          // 存放回调函数
 *    ]
 * }
 * 
*/
sgQuestionSystem.clientList = {};

/* 
 * 添加订阅者(订阅函数)，将订阅的类型与回调函数加入缓存列表
 * key: 消息的类型
 * id: 订阅的唯一标识
 * fn: 订阅的回调函数
*/
sgQuestionSystem.listen = function(key, id, fn) {
    if(!this.clientList[key]) {            // 若缓存列表没有该类型的消息，给该类消息初始化
        this.clientList[key] = []
    }
   
    this.clientList[key].push({            // 将订阅的id, 回调函数添加到对应的消息列表里
        id: id,                         
        fn: fn                          
    })
}

// 发布消息（发布函数）, 依次通知订阅者
sgQuestionSystem.trigger = function () {
    var key = Array.prototype.shift.call(arguments),    // 取出消息类型
        fns = this.clientList[key];                     // 取出该消息对应的回调函数集合
    
    if(!fns || fns.length == 0) {                      // 若订阅列表没有该类型的回到函数，则返回
        return false;                                   
    }
    
    for(var i = 0; i< fns.length; i++) {
         fns[i].fn.apply(this, arguments);               // arguments是发布消息时附送的参数，去掉了key
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> sgQuestionSystem = {};    <span class="hljs-comment">// 定义segmentfault的问题系统</span>

<span class="hljs-comment">/* 
 * 缓存列表
 * clientList: {
 *    key: [
 *        id: &lt;int&gt;,        // 唯一标识
 *        fn: null          // 存放回调函数
 *    ]
 * }
 * 
*/</span>
sgQuestionSystem.clientList = {};

<span class="hljs-comment">/* 
 * 添加订阅者(订阅函数)，将订阅的类型与回调函数加入缓存列表
 * key: 消息的类型
 * id: 订阅的唯一标识
 * fn: 订阅的回调函数
*/</span>
sgQuestionSystem.listen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, id, fn</span>) </span>{
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.clientList[key]) {            <span class="hljs-comment">// 若缓存列表没有该类型的消息，给该类消息初始化</span>
        <span class="hljs-keyword">this</span>.clientList[key] = []
    }
   
    <span class="hljs-keyword">this</span>.clientList[key].push({            <span class="hljs-comment">// 将订阅的id, 回调函数添加到对应的消息列表里</span>
        id: id,                         
        <span class="hljs-attr">fn</span>: fn                          
    })
}

<span class="hljs-comment">// 发布消息（发布函数）, 依次通知订阅者</span>
sgQuestionSystem.trigger = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> key = <span class="hljs-built_in">Array</span>.prototype.shift.call(<span class="hljs-built_in">arguments</span>),    <span class="hljs-comment">// 取出消息类型</span>
        fns = <span class="hljs-keyword">this</span>.clientList[key];                     <span class="hljs-comment">// 取出该消息对应的回调函数集合</span>
    
    <span class="hljs-keyword">if</span>(!fns || fns.length == <span class="hljs-number">0</span>) {                      <span class="hljs-comment">// 若订阅列表没有该类型的回到函数，则返回</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;                                   
    }
    
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt; fns.length; i++) {
         fns[i].fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);               <span class="hljs-comment">// arguments是发布消息时附送的参数，去掉了key</span>
    }
}</code></pre>
<p>现在，我们来进行一些简单的测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 张三订阅问题A
sgQuestionSystem.listen('questionA', 3, function(questionTitle, content) {
    console.log('张三您在早前订阅了问题：questionA');
    console.log('现' + questionTitle + '有了新动态');
    console.log('内容为：' + content);
});

// 李四订阅问题A
sgQuestionSystem.listen('questionB', 4, function(questionTitle, content) {
    console.log('李四您在早前订阅了问题：questionB');
    console.log('现' + questionTitle + '有了新动态');
    console.log('内容为：' + content);
})

// 问题系统发布消息
sgQuestionSystem.trigger('questionA', '问题A', '王五回答了问题A');
sgQuestionSystem.trigger('questionB', '问题B', '吴六回答了问题B');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 张三订阅问题A</span>
sgQuestionSystem.listen(<span class="hljs-string">'questionA'</span>, <span class="hljs-number">3</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">questionTitle, content</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三您在早前订阅了问题：questionA'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'现'</span> + questionTitle + <span class="hljs-string">'有了新动态'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容为：'</span> + content);
});

<span class="hljs-comment">// 李四订阅问题A</span>
sgQuestionSystem.listen(<span class="hljs-string">'questionB'</span>, <span class="hljs-number">4</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">questionTitle, content</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'李四您在早前订阅了问题：questionB'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'现'</span> + questionTitle + <span class="hljs-string">'有了新动态'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容为：'</span> + content);
})

<span class="hljs-comment">// 问题系统发布消息</span>
sgQuestionSystem.trigger(<span class="hljs-string">'questionA'</span>, <span class="hljs-string">'问题A'</span>, <span class="hljs-string">'王五回答了问题A'</span>);
sgQuestionSystem.trigger(<span class="hljs-string">'questionB'</span>, <span class="hljs-string">'问题B'</span>, <span class="hljs-string">'吴六回答了问题B'</span>);</code></pre>
<p>至此，我们实现了一个简单的发布-订阅模式，订阅者可以订阅自己感兴趣的事件了。</p>
<h4>各位看官，看累了吗？</h4>
<h4>看累的话点一下收藏，以便您看续集。若您还是精力充沛，那就继续撸吧。</h4>
<hr>
<p>上部分，我们实现了一个问题系统的发布-订阅模式，现在，我们要实现一个文章的发布-订阅模式，这时候，该怎么办？将上面的代码ctrl + c, ctrl + v， 再改下名字？还是有更好的解决方案？</p>
<p>答案显然是有的，我们可以将发布-订阅功能模块提取出来，放在一个单独的对象里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var publishSubscribeEvent = {

    
    /* 
     * 缓存列表
     * clientList: {
     *    key: [
     *        id: <int>,        // 唯一标识
     *        fn: null          // 存放回调函数
     *    ]
     * }
     * 
    */
    clientList: {},
    
    /* 
     * 添加订阅者(订阅函数)，将订阅的类型与回调函数加入缓存列表
     * key: 消息的类型
     * id: 订阅的唯一标识
     * fn: 订阅的回调函数
    */
    listen: function(key, id, fn) {
        if(!this.clientList[key]) {            
            this.clientList[key] = []
        }
       
        this.clientList[key].push({            
            id: id,                         
            fn: fn                          
        })
    },
    
    // 发布消息（发布函数）, 依次通知订阅者
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        
        if(!fns || fns.length == 0) {
            return false;                                   
        }
        
        for(var i = 0; i< fns.length; i++) {
             fns[i].fn.apply(this, arguments);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> publishSubscribeEvent = {

    
    <span class="hljs-comment">/* 
     * 缓存列表
     * clientList: {
     *    key: [
     *        id: &lt;int&gt;,        // 唯一标识
     *        fn: null          // 存放回调函数
     *    ]
     * }
     * 
    */</span>
    <span class="hljs-attribute">clientList</span>: {},
    
    <span class="hljs-comment">/* 
     * 添加订阅者(订阅函数)，将订阅的类型与回调函数加入缓存列表
     * key: 消息的类型
     * id: 订阅的唯一标识
     * fn: 订阅的回调函数
    */</span>
    <span class="hljs-attribute">listen</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, id, fn</span>) </span>{
        <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.clientList[key]) {            
            <span class="hljs-keyword">this</span>.clientList[key] = []
        }
       
        <span class="hljs-keyword">this</span>.clientList[key].push({            
            <span class="hljs-attribute">id:</span><span class="hljs-string"> id</span>,                         
            <span class="hljs-attribute">fn</span>: fn                          
        })
    },
    
    <span class="hljs-comment">// 发布消息（发布函数）, 依次通知订阅者</span>
    <span class="hljs-attribute">trigger</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">var</span> key = <span class="hljs-built_in">Array</span>.prototype.shift.call(<span class="hljs-built_in">arguments</span>),
            fns = <span class="hljs-keyword">this</span>.clientList[key];
        
        <span class="hljs-keyword">if</span>(!fns || fns.length == <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;                                   
        }
        
        <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i&lt; fns.length; i++) {
             fns[i].fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
    }
}</code></pre>
<p>再定义一个安装发布-订阅的函数installPublishSubscribeEvent，这个函数可以给所有对象都动态安装发布-订阅功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var installPublishSubscribeEvent = function(obj) {
    for(var i in publishSubscribeEvent) {
        obj[i] = publishSubscribeEvent[i];
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> installPublishSubscribeEvent = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span> </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> publishSubscribeEvent) {
        obj[i] = publishSubscribeEvent[i];
    }
}</code></pre>
<p>再来测试一番，我们给文章对象 sgArticleSystem 动态添加发布-订阅功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sgArticleSystem = {};

installPublishSubscribeEvent(sgArticleSystem ); 

// 张三订阅文章A动态
sgArticleSystem.listen('articleA', 3, function(articleTitle, content) { 
    console.log('张三您在早前订阅了文章：articleA');
    console.log('现' + articleTitle+ '有了新动态');
    console.log('内容为：' + content);
});

// 李四订阅文章B动态
sgArticleSystem.listen('articleB', 4, function(articleTitle, content) { 
    console.log('李四您在早前订阅了文章：articleB');
    console.log('现' + articleTitle+ '有了新动态');
    console.log('内容为：' + content);
});

// 文章系统发布消息
sgArticleSystem.trigger('articleA', 'JavaScript设计模式之发布-订阅模式', '作者修改了文章');
sgArticleSystem.trigger('articleB', 'JavaScript设计模式之策略模式', '王五用户评论了该文章');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> sgArticleSystem = {};

installPublishSubscribeEvent(sgArticleSystem ); 

<span class="hljs-comment">// 张三订阅文章A动态</span>
sgArticleSystem.listen(<span class="hljs-string">'articleA'</span>, <span class="hljs-number">3</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">articleTitle, content</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三您在早前订阅了文章：articleA'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'现'</span> + articleTitle+ <span class="hljs-string">'有了新动态'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容为：'</span> + content);
});

<span class="hljs-comment">// 李四订阅文章B动态</span>
sgArticleSystem.listen(<span class="hljs-string">'articleB'</span>, <span class="hljs-number">4</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">articleTitle, content</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'李四您在早前订阅了文章：articleB'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'现'</span> + articleTitle+ <span class="hljs-string">'有了新动态'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容为：'</span> + content);
});

<span class="hljs-comment">// 文章系统发布消息</span>
sgArticleSystem.trigger(<span class="hljs-string">'articleA'</span>, <span class="hljs-string">'JavaScript设计模式之发布-订阅模式'</span>, <span class="hljs-string">'作者修改了文章'</span>);
sgArticleSystem.trigger(<span class="hljs-string">'articleB'</span>, <span class="hljs-string">'JavaScript设计模式之策略模式'</span>, <span class="hljs-string">'王五用户评论了该文章'</span>);</code></pre>
<p>好了，该代码经过自测是没有什么问题的，要是各位看官发现问题，欢迎反馈。现在，我们已经可以给我们指定的对象安装发布-订阅模式，但是，是不是还少了点什么功能呢？</p>
<p>答案就是少了取消订阅事件的功能。比如张三突然不想关注该问题的更新动态了，为了避免继续收到问题系统推送过来的消息，张三需要取消之前订阅的事件。现在，我们给 publishSubscribeEvent 对象增加 remove 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="publishSubscribeEvent.remove = function(key, id) {
    var fns = this.clientList[key];
    
    if(!fns) {                // 如果key对应的消息没人订阅，直接返回
        return false;
    }
    
    if(!id) {                // 如果没传具体的唯一标识，则取消key的所有对应消息
        fns &amp;&amp; (fns.length = 0);
    } else {
        for(var l = fns.length - 1; l >=0; l--) {
            var _id = fns[l].id;
            if(_id == id) {
                fns.splice(l, 1);    // 删除订阅者的回调函数
            }
        }
    }
}
// 测试代码
var sgArticleSystem = {};

installPublishSubscribeEvent(sgArticleSystem ); 

// 张三的订阅
sgArticleSystem.listen('articleA', 3, function(articleTitle, content) { 
    console.log('张三您在早前订阅了文章：articleA');
    console.log('现' + articleTitle+ '有了新动态');
    console.log('内容为：' + content);
});

// 李四的订阅
sgArticleSystem.listen('articleA', 4, function(articleTitle, content) { 
    console.log('李四您在早前订阅了文章：articleA');
    console.log('现' + articleTitle+ '有了新动态');
    console.log('内容为：' + content);
});

sgArticleSystem.remove('articleA', 3);    // 删除张三的订阅
sgArticleSystem.trigger('articleA', 'JavaScript设计模式之发布-订阅模式', '作者修改了文章');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>publishSubscribeEvent.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, id</span>) </span>{
    <span class="hljs-keyword">var</span> fns = <span class="hljs-keyword">this</span>.clientList[key];
    
    <span class="hljs-keyword">if</span>(!fns) {                <span class="hljs-comment">// 如果key对应的消息没人订阅，直接返回</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    
    <span class="hljs-keyword">if</span>(!id) {                <span class="hljs-comment">// 如果没传具体的唯一标识，则取消key的所有对应消息</span>
        fns &amp;&amp; (fns.length = <span class="hljs-number">0</span>);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> l = fns.length - <span class="hljs-number">1</span>; l &gt;=<span class="hljs-number">0</span>; l--) {
            <span class="hljs-keyword">var</span> _id = fns[l].id;
            <span class="hljs-keyword">if</span>(_id == id) {
                fns.splice(l, <span class="hljs-number">1</span>);    <span class="hljs-comment">// 删除订阅者的回调函数</span>
            }
        }
    }
}
<span class="hljs-comment">// 测试代码</span>
<span class="hljs-keyword">var</span> sgArticleSystem = {};

installPublishSubscribeEvent(sgArticleSystem ); 

<span class="hljs-comment">// 张三的订阅</span>
sgArticleSystem.listen(<span class="hljs-string">'articleA'</span>, <span class="hljs-number">3</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">articleTitle, content</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'张三您在早前订阅了文章：articleA'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'现'</span> + articleTitle+ <span class="hljs-string">'有了新动态'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容为：'</span> + content);
});

<span class="hljs-comment">// 李四的订阅</span>
sgArticleSystem.listen(<span class="hljs-string">'articleA'</span>, <span class="hljs-number">4</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">articleTitle, content</span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'李四您在早前订阅了文章：articleA'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'现'</span> + articleTitle+ <span class="hljs-string">'有了新动态'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内容为：'</span> + content);
});

sgArticleSystem.remove(<span class="hljs-string">'articleA'</span>, <span class="hljs-number">3</span>);    <span class="hljs-comment">// 删除张三的订阅</span>
sgArticleSystem.trigger(<span class="hljs-string">'articleA'</span>, <span class="hljs-string">'JavaScript设计模式之发布-订阅模式'</span>, <span class="hljs-string">'作者修改了文章'</span>);</code></pre>
<p>上面的代码跟原著有所不同，原著是在删除订阅的时候是用对比回调函数的，而我是往缓存列表加了一个唯一的标识，用于识别。</p>
<p>至此，我们的发布-订阅模式第一部分已完结，欢迎大家收藏评论。</p>
<p>附：<br><a href="https://segmentfault.com/a/1190000008128674">JavaScript设计模式之发布-订阅模式（观察者模式）-Part2</a></p>
<p>JavaScript数据结构和算法系列：<br><a href="https://segmentfault.com/a/1190000006180999" target="_blank">JS 栈</a><br><a href="https://segmentfault.com/a/1190000007724033">JS 队列-优先队列、循环队列</a></p>
<p>JavaScript设计模式系列：<br><a href="https://segmentfault.com/a/1190000006899198" target="_blank">JavaScript设计模式之策略模式</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript设计模式之发布-订阅模式（观察者模式）-Part1

## 原文链接
[https://segmentfault.com/a/1190000007409168](https://segmentfault.com/a/1190000007409168)

