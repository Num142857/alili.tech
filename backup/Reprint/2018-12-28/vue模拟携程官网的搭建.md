---
title: 'vue模拟携程官网的搭建' 
date: 2018-12-28 2:30:11
hidden: true
slug: fy0dvvkl1ne
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">仿造携程官网</h1>
<blockquote>题外话:<p>刚开始学前端的时候,有一天看到携程官网.就希望有一天能模拟搭出来.<br>自己拖拖拉拉的一直没整, 但是但是<strong>麻麻</strong>我终于完成了!!<br>(曾经亲爱的同事把传送门删掉了不感谢他了 fk) <br>感谢叶师兄拯救了我<a href="http://120.77.149.179:8001/module/home.html" rel="nofollow noreferrer" target="_blank">携程携程</a> 源码<a href="https://github.com/superfff/ctrip" rel="nofollow noreferrer" target="_blank">仿携程源码</a><br><span class="img-wrap"><img data-src="/img/bVWEhF?w=1440&amp;h=829" src="https://static.alili.tech/img/bVWEhF?w=1440&amp;h=829" alt="仿携程gif图" title="仿携程gif图" style="cursor: pointer; display: inline;"></span></p>
</blockquote>
<h2 id="articleHeader1">目录结构</h2>
<ul>
<li>基于vue+less进行开发,配合强行在携程复制的数据搭建的网站</li>
<li>目录是基于vue-cli的基础下搭建的.</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVWEvT?w=260&amp;h=398" src="https://static.alili.tech/img/bVWEvT?w=260&amp;h=398" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>build/config配置文件</li>
<li>src是主要内容(assets包括公用的js文件,css样式/components是公用组件/module是页面)</li>
<li>dist是打包后的文件夹 node_modules是依赖包 其他就是默认的配置文件</li>
</ul>
<h2 id="articleHeader2">思路</h2>
<blockquote>小小讲一下自己拿到携程官网的时候是怎么拆开的(如果写的不对请麻烦各位指出指导)</blockquote>
<h3 id="articleHeader3">1.首先是静态页面</h3>
<p>刚刚学前端的时候 看到携程网就乱拳敲打.一点点html css强写,<br>后面工作的原因用了vue,就推倒旧的重新写了.</p>
<ul><li>
<p><strong>页面结构是分为这几块:(如图)</strong></p>
<ol>
<li>包括logo的header</li>
<li>导航栏</li>
<li>icon快捷入口</li>
<li>广告swipe和搜索框</li>
<li>各专题区</li>
<li>底部快捷入口</li>
<li>底部</li>
<li>电梯</li>
<li>fixed的交互框</li>
</ol>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVWEy7?w=711&amp;h=466" src="https://static.alili.tech/img/bVWEy7?w=711&amp;h=466" alt="页面结构" title="页面结构" style="cursor: pointer; display: inline;"></span></p>
<ul><li>有页面结构之后.就是基本功了.然后一点点搭页面, (优化把公用组件抽出来.)</li></ul>
<hr>
<h3 id="articleHeader4">2.然后是页面数据</h3>
<p>哎,没想到好的办法.就搭页面的时候,顺便在携程网上面<strong>一点点的copy下来</strong>.<br>(我看隔壁的仿页面贴都是通过接口的.小弟还是菜了点)<br><span class="img-wrap"><img data-src="/img/bVWEAw?w=799&amp;h=511" src="https://static.alili.tech/img/bVWEAw?w=799&amp;h=511" alt="mock_data" title="mock_data" style="cursor: pointer;"></span><br>然后通过每个需要数据的页面去引入这个mock.js...</p>
<hr>
<h3 id="articleHeader5">3.样式</h3>
<p>普通的页面样式就不说啦.大家慢慢搭就好.<br>share一些less的mixin方法.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// display vertical集合
#display_type{
    .dsp-middle{
        display: inline-block;
        vertical-align: middle;
    }
    .dsp-top{
        display: inline-block;
        vertical-align: top;
    }
}

// 三角形(向下)
.arrow_down(@size, @color: black){
    //@size大小 @color颜色
    margin-left: 5px;
    &amp;:after{
        content: '';
        display: inline-block;
        border-top: @size solid @color;
        border-left: @size solid transparent;
        border-right: @size solid transparent;
        border-bottom: @size solid transparent;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-comment">// display vertical集合</span>
<span class="hljs-selector-id">#display_type</span>{
    <span class="hljs-selector-class">.dsp-middle</span>{
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">vertical-align</span>: middle;
    }
    <span class="hljs-selector-class">.dsp-top</span>{
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">vertical-align</span>: top;
    }
}

<span class="hljs-comment">// 三角形(向下)</span>
<span class="hljs-selector-class">.arrow_down</span>(<span class="hljs-variable">@size</span>, <span class="hljs-variable">@color</span>: black){
    <span class="hljs-comment">//@size大小 @color颜色</span>
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:after</span>{
        <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-variable">@size</span> solid <span class="hljs-variable">@color</span>;
        <span class="hljs-attribute">border-left</span>: <span class="hljs-variable">@size</span> solid transparent;
        <span class="hljs-attribute">border-right</span>: <span class="hljs-variable">@size</span> solid transparent;
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-variable">@size</span> solid transparent;
    }
}</code></pre>
<p>用的比较多的2个mixin就是上面这2个.一个是display的做布局使用, 一个是人工三角形orz.<br>如果想要用mixin的时候,<strong>需要在css中用@import的方法引入才能用.</strong>(用js的方式,破了好久破不了放弃)</p>
<ul>
<li>引入之后直接在页面里面使用即可</li>
<li>#display_type &gt; .dsp-middle 或另外一个;</li>
<li>.arrow_down(3px, #fff);</li>
</ul>
<hr>
<h3 id="articleHeader6">4.响应式布局</h3>
<p>因为我的样式是通过less写的.<br>那就看着携程官网.一点点测试.一点点完善咯.没啥好办法.<br><em>部分代码如下.</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media screen and (max-width: 1200px){
            margin-right: 20px;
            
            &amp;:last-child{
                display: none;
            }
        }   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-keyword">@media</span> screen and (<span class="hljs-attribute">max-width</span>: <span class="hljs-number">1200px</span>){
            <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
            
            <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:last-child</span>{
                <span class="hljs-attribute">display</span>: none;
            }
        }   </code></pre>
<hr>
<h3 id="articleHeader7">5.电梯</h3>
<p>这个电梯是存在于专题区里面的,所以我给每个专题的div<strong>添加</strong>了一个不用的类名,用来获取当前div的滚动高度.<br>然后在<strong>钩子函数mounted()</strong>里面,去获取各个专题的高度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const s = document.getElementsByClassName('scroll-hook');
        
    for(let dom of s){
        let scoll_h = dom.offsetTop + dom.offsetParent.offsetTop;
        this.scroll_data.push(scoll_h);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">const</span> s = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'scroll-hook'</span>);
        
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> dom <span class="hljs-keyword">of</span> s){
        <span class="hljs-keyword">let</span> scoll_h = dom.offsetTop + dom.offsetParent.offsetTop;
        <span class="hljs-keyword">this</span>.scroll_data.push(scoll_h);
    }</code></pre>
<p>电梯的精髓就是在:</p>
<ol>
<li>根据当前的滚动高度,然后动态改变active的标识;</li>
<li>点击对应的标识,页面会滚到对应的区域;</li>
<li>页面滚动的时候,在某个固定的位置待着</li>
</ol>
<p>那么就对应的写bie.</p>
<p>1.电梯的html渲染(ps. lift.index是每一个电梯的类名, lift_flag是区域的标识),然后在<strong>mounted()里</strong>给window注册一个scroll的监听事件,然后去获取当前的滚动高度,然后进行判断</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;lift-wrapper&quot; :style=&quot;`top:${lift_top}px;`&quot;>
    <li 
        class=&quot;lift-item&quot; 
        :class=&quot;[lift.index,  {'lift-active': (lift_index === lift_flag)}]&quot;
        v-for=&quot;(lift,lift_index) in d&quot;
        @click=&quot;lift_click(lift_index)&quot;>
        <span class=&quot;skip&quot;>"{{"lift.name"}}"</span>
    </li>
</ul>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"lift-wrapper"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"`top:${lift_top}px;`"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> 
        <span class="hljs-attr">class</span>=<span class="hljs-string">"lift-item"</span> 
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"[lift.index,  {'lift-active': (lift_index === lift_flag)}]"</span>
        <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(lift,lift_index) in d"</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">"lift_click(lift_index)"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skip"</span>&gt;</span>"{{"lift.name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>  </code></pre>
<p>2.点击滚动,写了一个原生的笨方法,(document.dEl那有一个兼容问题)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//页面滚动方法
function page_scroll_to(cur, tar){
    /*
        params:
        cur 当前高度
        tar 目标高度
    */
    var during = 10; //持续时间(ms)
    var times = 20;  //持续次数
    var i = 1;       //持续标识
    var s_flag;

    if(cur < tar){
        var s = (tar - cur) / times; //滚动距离
        s_flag = setInterval(() => {
            //解决兼容性问题(原本使用documentElement即可)
            document.documentElement.scrollTop = cur + s * i;
            document.body.scrollTop = cur + s * i;
            i++;

            if(i>times){
                clearInterval(s_flag);
            }
        }, during)
    }
    else{
        var s = (cur - tar) / times;
        s_flag = setInterval(() => {
            //解决兼容性问题
            document.documentElement.scrollTop = cur - s * i;
            document.body.scrollTop = cur - s * i;
            i++;

            if(i>times){
                clearInterval(s_flag);
            }
        }, during)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//页面滚动方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">page_scroll_to</span>(<span class="hljs-params">cur, tar</span>)</span>{
    <span class="hljs-comment">/*
        params:
        cur 当前高度
        tar 目标高度
    */</span>
    <span class="hljs-keyword">var</span> during = <span class="hljs-number">10</span>; <span class="hljs-comment">//持续时间(ms)</span>
    <span class="hljs-keyword">var</span> times = <span class="hljs-number">20</span>;  <span class="hljs-comment">//持续次数</span>
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;       <span class="hljs-comment">//持续标识</span>
    <span class="hljs-keyword">var</span> s_flag;

    <span class="hljs-keyword">if</span>(cur &lt; tar){
        <span class="hljs-keyword">var</span> s = (tar - cur) / times; <span class="hljs-comment">//滚动距离</span>
        s_flag = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">//解决兼容性问题(原本使用documentElement即可)</span>
            <span class="hljs-built_in">document</span>.documentElement.scrollTop = cur + s * i;
            <span class="hljs-built_in">document</span>.body.scrollTop = cur + s * i;
            i++;

            <span class="hljs-keyword">if</span>(i&gt;times){
                clearInterval(s_flag);
            }
        }, during)
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">var</span> s = (cur - tar) / times;
        s_flag = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">//解决兼容性问题</span>
            <span class="hljs-built_in">document</span>.documentElement.scrollTop = cur - s * i;
            <span class="hljs-built_in">document</span>.body.scrollTop = cur - s * i;
            i++;

            <span class="hljs-keyword">if</span>(i&gt;times){
                clearInterval(s_flag);
            }
        }, during)
    }
}</code></pre>
<p>3.样式我是直接copy携程的. 滑动高度呢就根据滚动高度去计算, 然后用js给电梯的div写一个内联样式,动态的去改变</p>
<hr>
<h3 id="articleHeader8">6.throttle事件</h3>
<p>因为给window注册了一个scroll事件,当你一滚动,会疯狂触发scroll,可能在线上的会导致浏览器有<strong>压力</strong>(猜的)<br>所以自己写了一个throttle方法去优化这一块,<br>然后在vue的原型对象中注册了一下,可以在后续直接this.throttle只用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(fn, delay, context) {
    /*
        throttle函数(每delay时间,触发一次fn函数)

        param:
        fn           执行函数
        delay        持续时间(ms)
        context      作用域
    */

    var last;
    //定时器
    var timer;

    return function(){
        //获取当前的毫秒数
        var now = +new Date();

        //判断时间
        if(last &amp;&amp; now < last + delay){
            clearTimeout(timer);

            timer = setTimeout(function() {
                last = now;
                fn.apply(context);
            }, delay)
        }
        else{
            last = now;
            fn.apply(context);
        }
    }
}
Vue.prototype.throttle = throttle;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">fn, delay, context</span>) </span>{
    <span class="hljs-comment">/*
        throttle函数(每delay时间,触发一次fn函数)

        param:
        fn           执行函数
        delay        持续时间(ms)
        context      作用域
    */</span>

    <span class="hljs-keyword">var</span> last;
    <span class="hljs-comment">//定时器</span>
    <span class="hljs-keyword">var</span> timer;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//获取当前的毫秒数</span>
        <span class="hljs-keyword">var</span> now = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

        <span class="hljs-comment">//判断时间</span>
        <span class="hljs-keyword">if</span>(last &amp;&amp; now &lt; last + delay){
            clearTimeout(timer);

            timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                last = now;
                fn.apply(context);
            }, delay)
        }
        <span class="hljs-keyword">else</span>{
            last = now;
            fn.apply(context);
        }
    }
}
Vue.prototype.throttle = throttle;</code></pre>
<hr>
<h3 id="articleHeader9">7.lazyload</h3>
<p>页面大了一进入就触发全部的请求,肯定不那么棒,所以此处引入了lazyload.<br>携程的lazyload除了图片.还有每个专题区(忽略爱心 - -).<br><span class="img-wrap"><img data-src="/img/bVWEEq?w=1435&amp;h=831" src="https://static.alili.tech/img/bVWEEq?w=1435&amp;h=831" alt="携程lazy-load" title="携程lazy-load" style="cursor: pointer; display: inline;"></span><br><em>ps.</em>最开始引用了vue-lazyload这个模块,然后里面有一个<strong>lazyComponent</strong>配置项,可以用来设置一整块的,但是这个有一个不足的地方,就是当你页面在比较下面的时候去刷新, <strong>lazyComponent</strong>只会update当前可视区域的部分,可视区域上面的区域就不管你........<br><em>pss.</em>所以我自己通过上面的电梯,自己写了一个,然后将flag标识通过组件之间传入,然后组件内部通过watch去监控.然后动态从初始化状态更新为内容区.</p>
<hr>
<h3 id="articleHeader10">结尾</h3>
<p>其实就是一个普通的页面搭建,大家如果有空其实一点点就能搭出来的,<br>不知道强行分享的东西有没有更好的方法呢,如果有麻烦各位指导一下小弟.<br>以上完毕,感谢大家感谢大家.(如果侵权了,马上下架,仅供交流学习)</p>
<blockquote>最后最后,携程在手,说走就走.</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue模拟携程官网的搭建

## 原文链接
[https://segmentfault.com/a/1190000011556978](https://segmentfault.com/a/1190000011556978)

