---
title: 'transformjs 污染了 DOM？是你不了解它的强大' 
date: 2019-01-29 2:30:10
hidden: true
slug: tjgyya1clws
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>原文链接：<a href="https://github.com/AlloyTeam/AlloyTouch/wiki/Powerful-transformjs" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyTouch/wiki/Powerful-transformjs</a></strong></p></blockquote>
<h2 id="articleHeader0">写在前面</h2>
<p>上星期在React微信群里，有小伙伴觉得transformjs直接给DOM添加属性太激进，不可取（由于不在那个微信群，不明白为什么React会谈到transformjs？！）。关于这点，其实在一年半前腾讯内部就有相关声音，腾讯内部的小伙伴建议，不要污染那么多吧~~，给个总的namespace，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.querySelector(&quot;#test&quot;);
Transform(element);
element.transform.scaleX =2;
element.transform.translateX = 100;
element.transform.rotateX = 30;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#test"</span>);
Transform(element);
element.transform.scaleX =<span class="hljs-number">2</span>;
element.transform.translateX = <span class="hljs-number">100</span>;
element.transform.rotateX = <span class="hljs-number">30</span>;</code></pre>
<p>在腾讯内部，还有小伙伴建议，包裹一层把：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var transform = new Transform( dom, {
    scaleX: 1,
    skewY:30,
    translateY:200

})

transform.translateY = 100;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> transform = <span class="hljs-keyword">new</span> Transform( dom, {
    <span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">skewY</span>:<span class="hljs-number">30</span>,
    <span class="hljs-attr">translateY</span>:<span class="hljs-number">200</span>

})

transform.translateY = <span class="hljs-number">100</span>;</code></pre>
<p>总之，就是不要这样子（transformjs目前的姿势）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element1= document.querySelector(&quot;#test&quot;);
Transform(element);
element.rotateZ = 45;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element1= <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#test"</span>);
Transform(element);
element.rotateZ = <span class="hljs-number">45</span>;</code></pre>
<p>那么上面这种做法会有什么问题？</p>
<ul>
<li><p>既然JS里提供了动态属性并监听变更进行callback的能力为什么不能用？</p></li>
<li><p>违反哪条JS最佳实践？</p></li>
<li><p>违反哪条Web最佳实践？</p></li>
<li><p>违反哪条DOM最佳实践？</p></li>
</ul>
<p>后来，我找到以前提修改意见的腾讯小伙伴，他给了这样的回答：</p>
<blockquote><p>如果以后 w3c 需要给DOM元素扩展 translateX, translateY, translateZ, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ，这就留下了巨大的隐患~~</p></blockquote>
<p>对于这点，我认为，既然domElment.style.transform已经有了，扩展translateX, translateY, translateZ, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ的可能性几乎没有，因为其实domElment.style.transform已经提供了足够的灵活性。就算扩展了，transformjs打个补丁包或者prolyfill 一下便可。</p>
<p>然后我又问了一些小伙伴，得到一个非常有趣的回答：</p>
<blockquote><p>反正你污染了DOM，反正你污染了DOM，反正你污染了DOM....</p></blockquote>
<p>....</p>
<h2 id="articleHeader1">条条大路通罗马</h2>
<p>transformjs不仅仅可以mix CSS3 transform到DOM元素，还能mix到任意的对象字面量，也可以把transformjs当作工具，他提供一些基础的数学能力。</p>
<blockquote><p>这里需要特别注意，以前的姿势可以继续使用，这里另外三种使用姿势。</p></blockquote>
<h4>语法1</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Transform(obj, [notPerspective]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Transform(obj, [notPerspective]);</code></pre>
<p>如你所见，其他方式都不用变。只是第一个参数不仅仅可以传DOM元素，也可以传任意对象字面量等。</p>
<p>不卖关子，先看使用姿势</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.querySelector(&quot;#test&quot;),
    obj = {};

Transform(obj);

obj.rotateZ = 90;

element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = obj.transform;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#test"</span>),
    obj = {};

Transform(obj);

obj.rotateZ = <span class="hljs-number">90</span>;

element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = obj.transform;</code></pre>
<p>看到了没有，你不仅可以传DOM元素进去，也可以传对象字面量。你可以把obj.transform打印出来，上面是选择了90度，所以它生成出来的matrix是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="perspective(500px) matrix3d(0,1,0,0,-1,0,0,0,0,0,1,0,0,0,0,1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">perspective(<span class="hljs-number">500</span>px) matrix3d(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>)</code></pre>
<p>你同样也可以关闭透视投影，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.querySelector(&quot;#test&quot;),
    obj = {};
//关闭透视投影
Transform(obj, true);

obj.rotateZ = 90;

element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = obj.transform;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#test"</span>),
    obj = {};
<span class="hljs-comment">//关闭透视投影</span>
Transform(obj, <span class="hljs-literal">true</span>);

obj.rotateZ = <span class="hljs-number">90</span>;

element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = obj.transform;</code></pre>
<p>生成出来的matrix是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="matrix3d(0,1,0,0,-1,0,0,0,0,0,1,0,0,0,0,1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">matrix3d(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>)</code></pre>
<p>那么运动的姿势呢？这里配合<a href="https://github.com/tweenjs/tween.js" rel="nofollow noreferrer" target="_blank">tween.js</a>的示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.querySelector(&quot;#test&quot;),
    obj = { translateX: 0, translateY: 0 };

Transform(obj);

var tween = new TWEEN.Tween(obj)
    .to({ translateX: 100, translateY: 100 }, 1000)
    .onUpdate(function () {
        element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = obj.transform;
    })
    .start();

requestAnimationFrame(animate);

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#test"</span>),
    obj = { <span class="hljs-attr">translateX</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">translateY</span>: <span class="hljs-number">0</span> };

Transform(obj);

<span class="hljs-keyword">var</span> tween = <span class="hljs-keyword">new</span> TWEEN.Tween(obj)
    .to({ <span class="hljs-attr">translateX</span>: <span class="hljs-number">100</span>, <span class="hljs-attr">translateY</span>: <span class="hljs-number">100</span> }, <span class="hljs-number">1000</span>)
    .onUpdate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = obj.transform;
    })
    .start();

requestAnimationFrame(animate);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">time</span>) </span>{
    requestAnimationFrame(animate);
    TWEEN.update(time);
}</code></pre>
<p>那么如果用传统的姿势是？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.querySelector(&quot;#test&quot;);

Transform(element);

var tween = new TWEEN.Tween({ translateX: element.translateX, translateY: element.translateY })
    .to({ translateX: 100, translateY: 100 }, 1000)
    .onUpdate(function () {
        element.translateX = this.translateX
        element.translateY = this.translateY
    })
    .start();

requestAnimationFrame(animate);

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#test"</span>);

Transform(element);

<span class="hljs-keyword">var</span> tween = <span class="hljs-keyword">new</span> TWEEN.Tween({ <span class="hljs-attr">translateX</span>: element.translateX, <span class="hljs-attr">translateY</span>: element.translateY })
    .to({ <span class="hljs-attr">translateX</span>: <span class="hljs-number">100</span>, <span class="hljs-attr">translateY</span>: <span class="hljs-number">100</span> }, <span class="hljs-number">1000</span>)
    .onUpdate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        element.translateX = <span class="hljs-keyword">this</span>.translateX
        element.translateY = <span class="hljs-keyword">this</span>.translateY
    })
    .start();

requestAnimationFrame(animate);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span>(<span class="hljs-params">time</span>) </span>{
    requestAnimationFrame(animate);
    TWEEN.update(time);
}</code></pre>
<p>这里由于 TWEEN.Tween会去遍历所以的属性并且设置初始值，如tween里面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Set all starting values present on the target object
for (var field in object) {
    _valuesStart[field] = parseFloat(object[field], 10);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-comment">// Set all starting values present on the target object</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> field <span class="hljs-keyword">in</span> object) {
    _valuesStart[field] = <span class="hljs-built_in">parseFloat</span>(object[field], <span class="hljs-number">10</span>);
}</code></pre>
<p>所以不能直接把 new TWEEN.Tween(element)。<br>因为在start之前，程序其实已经可以完全收集到所有需要to的属性，去运动便可以。我们可以自己封装一个tween去支持这种简便的方式。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Tween = function (obj) {
    this.obj = obj;
    return this;
}

Tween.prototype = {
    to: function (targets, duration, easing) {
        this.duration = duration;
        this.targets = targets;
        return this;
    },
    start: function () {
        this.startTime = new Date();
        this._beginTick();
    },
    _beginTick: function () {
        var _startValues = {},
            targets = this.targets;
        for (var key in targets) {
            if (targets.hasOwnProperty(key)) {
                _startValues[key] = this.obj[key];
            }
        }
        var self  = this;
        this._interval = setInterval(function () {
            var dt = new Date() - self.startTime;
            for (var key in targets) {
                if (targets.hasOwnProperty(key)) {
                    if (dt >= self.duration) {
                        clearInterval(self._interval);
                    } else {
                        var p = dt / self.duration;
                        var dv = targets[key] - self.obj[key];
                        self.obj[key] += dv * p;
                    }
                }
            }
        }, 15)

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Tween = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">this</span>.obj = obj;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}

Tween.prototype = {
    <span class="hljs-attr">to</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">targets, duration, easing</span>) </span>{
        <span class="hljs-keyword">this</span>.duration = duration;
        <span class="hljs-keyword">this</span>.targets = targets;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    },
    <span class="hljs-attr">start</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-keyword">this</span>._beginTick();
    },
    <span class="hljs-attr">_beginTick</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _startValues = {},
            targets = <span class="hljs-keyword">this</span>.targets;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> targets) {
            <span class="hljs-keyword">if</span> (targets.hasOwnProperty(key)) {
                _startValues[key] = <span class="hljs-keyword">this</span>.obj[key];
            }
        }
        <span class="hljs-keyword">var</span> self  = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>._interval = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> dt = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - self.startTime;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> targets) {
                <span class="hljs-keyword">if</span> (targets.hasOwnProperty(key)) {
                    <span class="hljs-keyword">if</span> (dt &gt;= self.duration) {
                        clearInterval(self._interval);
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-keyword">var</span> p = dt / self.duration;
                        <span class="hljs-keyword">var</span> dv = targets[key] - self.obj[key];
                        self.obj[key] += dv * p;
                    }
                }
            }
        }, <span class="hljs-number">15</span>)

    }
}</code></pre>
<p>这里为了简便使用setInterval去进行loop，当然可以换成其他方式。现在便可以使用如下方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.querySelector(&quot;#test&quot;);
Transform(element);
var tween = new Tween(element)
    .to({ translateX: 100, translateY: 100 }, 1000)
    .start();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#test"</span>);
Transform(element);
<span class="hljs-keyword">var</span> tween = <span class="hljs-keyword">new</span> Tween(element)
    .to({ <span class="hljs-attr">translateX</span>: <span class="hljs-number">100</span>, <span class="hljs-attr">translateY</span>: <span class="hljs-number">100</span> }, <span class="hljs-number">1000</span>)
    .start();</code></pre>
<p>当然这有点跑题了。这里只是对比直接使用DOM挂载和使用第三方对象挂载的区别。第三方挂载有点隔山打牛的感觉。<br>当然..，还没有完，不仅仅可以上面那个样子。那还可以把transformjs完全当作一个计算工具来用。</p>
<h4>语法2</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Transform.getMatrix3D(option)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;"> Transform.getMatrix3D(<span class="hljs-keyword">option</span>)</code></pre>
<h4>姿势</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var matrix3d = Transform.getMatrix3D({
    translateX: 0,
    translateY: 100,
    scaleX:2
});
console.log(matrix3d);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> matrix3d = Transform.getMatrix3D({
    <span class="hljs-attr">translateX</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">translateY</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">scaleX</span>:<span class="hljs-number">2</span>
});
<span class="hljs-built_in">console</span>.log(matrix3d);</code></pre>
<p>打印出来你将得到下面的值：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007916740?w=183&amp;h=410" src="https://static.alili.tech/img/remote/1460000007916740?w=183&amp;h=410" alt="" title="" style="cursor: pointer;"></span></p>
<p>你想用这个值来干什么就干什么吧。看transformjs源码可以得到 Transform.getMatrix3D一共支持的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Transform.getMatrix3D = function (option) {
    var defaultOption = {
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        skewX: 0,
        skewY: 0,
        originX: 0,
        originY: 0,
        originZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1
    };
    for (var key in option) {
    ...
    ...
    ...

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Transform.getMatrix3D = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">option</span>) </span>{
    <span class="hljs-keyword">var</span> defaultOption = {
        <span class="hljs-attr">translateX</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">translateY</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">translateZ</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">rotateX</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">rotateY</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">rotateZ</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">skewX</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">skewY</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">originX</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">originY</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">originZ</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">scaleZ</span>: <span class="hljs-number">1</span>
    };
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> option) {
    ...
    ...
    ...

}</code></pre>
<h4>语法3</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Transform.getMatrix2D(option)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"> Transform.getMatrix2D(option)</code></pre>
<p>不仅仅是3D matrix， transformjs也提供了2D的工具函数支持。</p>
<h4>姿势</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var matrix2d = Transform.getMatrix2D({
    translateX: 0,
    translateY: 100,
    scaleX:2
});
console.log(matrix2d);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> matrix2d = Transform.getMatrix2D({
    <span class="hljs-attr">translateX</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">translateY</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">scaleX</span>:<span class="hljs-number">2</span>
});
<span class="hljs-built_in">console</span>.log(matrix2d);</code></pre>
<p>打印出来你将得到下面的值：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007916741?w=147&amp;h=176" src="https://static.alili.tech/img/remote/1460000007916741?w=147&amp;h=176" alt="" title="" style="cursor: pointer;"></span></p>
<ul>
<li><p>a 水平缩放</p></li>
<li><p>b 水平拉伸</p></li>
<li><p>c 垂直拉伸</p></li>
<li><p>d 垂直缩放</p></li>
<li><p>tx 水平位移</p></li>
<li><p>ty 垂直位移</p></li>
</ul>
<p>那么得到这个Matrix2D有什么用?</p>
<ul>
<li><p>缩放：scale(sx, sy) 等同于 matrix(sx, 0, 0, sy, 0, 0);</p></li>
<li><p>平移：translate(tx, ty) 等同于 matrix(1, 0, 0, 1, tx, ty);</p></li>
<li><p>旋转：rotate(deg) 等同于 matrix(cos(deg), sin(deg), -sin(deg), cos(deg), 0, 0);</p></li>
<li><p>拉伸：skew(degx, degy) 等同于 matrix(1, tan(degy), tan(degx), 1, 0, 0);</p></li>
</ul>
<p>看transformjs源码可以得到 Transform.getMatrix2D一共支持的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Transform.getMatrix2D = function(option){
    var defaultOption = {
        translateX: 0,
        translateY: 0,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        originX: 0,
        originY: 0,
        scaleX: 1,
        scaleY: 1
    };
    ...
    ...
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Transform.getMatrix2D = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">option</span>)</span>{
    <span class="hljs-keyword">var</span> defaultOption = {
        <span class="hljs-attr">translateX</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">translateY</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">rotation</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">skewX</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">skewY</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">originX</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">originY</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">scaleX</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">scaleY</span>: <span class="hljs-number">1</span>
    };
    ...
    ...
    ...
}</code></pre>
<h2 id="articleHeader2">特别注意事项</h2>
<p>Transform.getMatrix2D 和Transform.getMatrix3D都是支持origin特性，请和transform-origin说拜拜<br>Transform.getMatrix2D 和Transform.getMatrix3D没有使用传统的Math.tan去实现shew，取而代之的是half of rotation</p>
<p>如2d的skew：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Math</span>.cos(skewY), <span class="hljs-built_in">Math</span>.sin(skewY), -<span class="hljs-built_in">Math</span>.sin(skewX), <span class="hljs-built_in">Math</span>.cos(skewX)</code></pre>
<p>以前腾讯IEG的同学问过为什么使用half of rotation，而不使用Math.tan？<br>原因很简单，Math.tan扭曲力度特别大，而且会有无穷大的值导致扭曲横跨整个屏幕。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007916742?w=231&amp;h=341" src="https://static.alili.tech/img/remote/1460000007916742?w=231&amp;h=341" alt="" title="" style="cursor: pointer;"></span></p>
<p>而half of rotation则不会。</p>
<h2 id="articleHeader3">getMatrix2D有用吗？</h2>
<p><strong>用于Dom Transformation时候，可以用于兼容不支持CSS3 3D Transforms的浏览器</strong></p>
<p>如，我们可以很轻松的把一些transformation属性转换成CSS3属性赋给DOM:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var matrix = Transform.getMatrix2D({
    rotation: 30,
    scaleX: 0.5,
    scaleY: 0.5,
    translateX: 100
});
ele.style.transform = ele.style.msTransform = ele.style.OTransform = ele.style.MozTransform = ele.style.webkitTransform = &quot;matrix(&quot; + [matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty].join(&quot;,&quot;) + &quot;)&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> matrix = Transform.getMatrix2D({
    <span class="hljs-attr">rotation</span>: <span class="hljs-number">30</span>,
    <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attr">translateX</span>: <span class="hljs-number">100</span>
});
ele.style.transform = ele.style.msTransform = ele.style.OTransform = ele.style.MozTransform = ele.style.webkitTransform = <span class="hljs-string">"matrix("</span> + [matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty].join(<span class="hljs-string">","</span>) + <span class="hljs-string">")"</span>;</code></pre>
<p><strong>用于Canvas和SVG Transformation</strong></p>
<p>什么？还能用于Canvas和SVG?是的，举个例子，在Canvas画一个旋转30度、缩小成0.5倍，并且平移（200,200）的图片：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById(&quot;ourCanvas&quot;),
    ctx = canvas.getContext(&quot;2d&quot;),
    img = new Image(),
    rotation = 30 * Math.PI / 180;

img.onload = function () {
    ctx.sava();
    ctx.setTransform(
        0.5 * Math.cos(rotation), 0.5 * Math.sin(rotation),
        -0.5 * Math.sin(rotation), 0.5 * Math.cos(rotation),
        200, 200
    );
    ctx.drawImage(img, 0, 0);
    ctx.restore();
};

img.src = &quot;asset/img/test.png&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"ourCanvas"</span>),
    ctx = canvas.getContext(<span class="hljs-string">"2d"</span>),
    img = <span class="hljs-keyword">new</span> Image(),
    rotation = <span class="hljs-number">30</span> * <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>;

img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ctx.sava();
    ctx.setTransform(
        <span class="hljs-number">0.5</span> * <span class="hljs-built_in">Math</span>.cos(rotation), <span class="hljs-number">0.5</span> * <span class="hljs-built_in">Math</span>.sin(rotation),
        <span class="hljs-number">-0.5</span> * <span class="hljs-built_in">Math</span>.sin(rotation), <span class="hljs-number">0.5</span> * <span class="hljs-built_in">Math</span>.cos(rotation),
        <span class="hljs-number">200</span>, <span class="hljs-number">200</span>
    );
    ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    ctx.restore();
};

img.src = <span class="hljs-string">"asset/img/test.png"</span>;</code></pre>
<p>上面是我们传统的姿势。使用Transform.getMatrix2D 之后，变成这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var canvas = document.getElementById(&quot;ourCanvas&quot;),
    ctx = canvas.getContext(&quot;2d&quot;),
    img = new Image();

var matrix = Transform.getMatrix2D({
    rotation: 30,
    scaleX: 0.5,
    scaleY: 0.5,
    translateX: 200,
    translateY: 200
});

img.onload = function () {
    ctx.sava();
    ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
};

img.src = &quot;asset/img/test.png&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"ourCanvas"</span>),
    ctx = canvas.getContext(<span class="hljs-string">"2d"</span>),
    img = <span class="hljs-keyword">new</span> Image();

<span class="hljs-keyword">var</span> matrix = Transform.getMatrix2D({
    <span class="hljs-attr">rotation</span>: <span class="hljs-number">30</span>,
    <span class="hljs-attr">scaleX</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attr">scaleY</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attr">translateX</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">translateY</span>: <span class="hljs-number">200</span>
});

img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ctx.sava();
    ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    ctx.restore();
};

img.src = <span class="hljs-string">"asset/img/test.png"</span>;</code></pre>
<p>可以看到，这里让开发者不用自己去拼凑matrix。SVG的粒子就不再举例，和用于DOM的例子差不多，相信大家能够很快搞定。</p>
<h2 id="articleHeader4">开始使用吧</h2>
<ul>
<li><p>官方网站：<a href="http://alloyteam.github.io/AlloyTouch/transformjs/" rel="nofollow noreferrer" target="_blank">http://alloyteam.github.io/AlloyTouch/transformjs/</a></p></li>
<li><p>Github地址：<a href="https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs</a></p></li>
</ul>
<p>最后，多谢大家对transformjs的建议，有了你们中肯建议和意见，才让它变得更好更灵活更强大。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
transformjs 污染了 DOM？是你不了解它的强大

## 原文链接
[https://segmentfault.com/a/1190000007916737](https://segmentfault.com/a/1190000007916737)

