---
title: 'HTML5 CANVAS 弹幕插件--DanMuer.js（V3.2.5）' 
date: 2019-01-09 2:30:12
hidden: true
slug: 3ypeos14d1u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">最新版本 V 3.2.5</h2>
<p>新增了图片弹幕类型，修改了demo展示页面，调整了部分代码，具体请参看git里的CHANGELOG.md和README.md</p>
<p>文章里主要讲实现方法和设计思想，所以有部分接口依旧是老版本接口，最新的接口请去git里面查看</p>
<h2 id="articleHeader1">前言</h2>
<p>说实话，从<a href="https://segmentfault.com/a/1190000007951317">第二版</a>到现在又过了半年，本来以为可能不会写第三版的，顶多将第二版的代码重构下就可以了，没想到还是花了一个星期左右续写了第三版。主要是因为第二版中 播放器模块和弹幕模块耦合得太严重了，远远达不到我想要的效果，所以续写了第三版。这次的代码将更轻，我去除了播放器模块，使得插件的适用范围更加的扩大，而且让我有点惊喜的是在写第三版的过程中又让弹幕系统的性能进一步得到了提升，可以讲也是额外的惊喜了。</p>
<p>由于第三版我是用ES6语法写的，所以兼容性不是很好（没错，我只是在针对IE），就算用babel转成ES5，IE依旧毒，目前支持IE10+。<del>所以后面我会抽个时间去写个ES5全兼容版本的，不考虑IE或者只是对源码感兴趣的可以尽情使用</del>。</p>
<p>github : <a href="https://github.com/lonelymoon/DanMuer" rel="nofollow noreferrer" target="_blank">github</a> <br>API接口都在git里面，文章不会介绍插件使用相关的内容，仅仅解释部分源码和设计思想，如果觉得插件还行，请大家git给个星，谢谢<br>demo : <a href="http://lonelymoon.linux2.jiuhost.com/DMv3/" rel="nofollow noreferrer" target="_blank">我是demo</a></p>
<h4>注意：</h4>
<p>我碰到好像有人对demo不知道怎么操作，下面我简单介绍下基本操作：<br>所有已发布功能项可以通过下拉框进行切换，目前包括“添加普通弹幕”，“添加高级弹幕”，“过滤”，“添加全局样式”，“控制项”</p>
<ol>
<li>添加普通弹幕和添加高级弹幕都只是添加数据而已，不会运行插件，你需要跳到“控制项”点击启动，然后等弹幕出来即可</li>
<li>高级弹幕的动画是属于排队动画，你要先将修改后的数据“保存为第n步”（n至少为1）后点击确定添加才可以</li>
<li>过滤功能的话，最简单的“type”：“slide”，表示过滤所有滚动型的弹幕，或者“text”：“string”表示过滤包含string的所有弹幕</li>
<li>你可以先启动然后添加弹幕，也是一样的，操作顺序没太高要求</li>
</ol>
<hr>
<h2 id="articleHeader2">代码的那些事</h2>
<p>源码总共由5部分组成：</p>
<ol>
<li>普通弹幕类</li>
<li>高级弹幕类</li>
<li>主程序类</li>
<li>封装输出函数</li>
<li>Tween算法类</li>
</ol>
<p>第4和第5个部分比较简单，第5部分就是Tween算法，原汁原味，第4部分则是将所有内部的接口进行过滤，选择性地暴露一些我想暴露的内部功能接口，并且提供一个对外的接口，增加一点稳定性罢了。源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let DanMuer = function(wrapper,opts){
    let proxyDMer = new Proxy( new DMer(wrapper,opts), {
        get : function(target,key){
            if(typeof target[key] == &quot;function&quot;)
            return target[key].bind(target);
            return target[key];
        }
    }); //保证this指向原对象

    let DM = proxyDMer;

    //选择性的暴露某些接口
    return {
        pause : DM.pause, //暂停
        run : DM.run, //继续
        start : DM.start, //运行
        stop : DM.stop,    //停止
        changeStyle : DM.changeStyle, //修改普通弹幕全局样式
        addGradient : DM.addGradient, //普通弹幕渐变
        setSize : DM.setSize, //修改宽高
        inputData : DM.inputData, //向普通弹幕插入数据
        inputEffect : DM.inputEffect, //向高级弹幕插入数据
        clear : DM.clear, //清除所有弹幕
        reset : DM.reset, //重新从某个弹幕开始
        addFilter : DM.addFilter, //添加过滤
        removeFilter : DM.removeFilter, //删除过滤
        disableEffect : DM.disableEffect, //不启用高级弹幕
        enableEffect : DM.enableEffect, //启用高级弹幕
        getSize : DM.getSize, //获取宽高,
        getFPS : DM.getFPS //获取fps
    };
};

//提供对外的引用接口
if( typeof module != 'undefined' &amp;&amp; module.exports ){
    module.exports = DanMuer;
} else if( typeof define == &quot;function&quot; &amp;&amp; define.amd ){
    define(function(){ return DanMuer;});
} else {
    window.DanMuer = DanMuer;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> DanMuer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">wrapper,opts</span>)</span>{
    <span class="hljs-keyword">let</span> proxyDMer = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>( <span class="hljs-keyword">new</span> DMer(wrapper,opts), {
        <span class="hljs-attr">get</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target,key</span>)</span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> target[key] == <span class="hljs-string">"function"</span>)
            <span class="hljs-keyword">return</span> target[key].bind(target);
            <span class="hljs-keyword">return</span> target[key];
        }
    }); <span class="hljs-comment">//保证this指向原对象</span>

    <span class="hljs-keyword">let</span> DM = proxyDMer;

    <span class="hljs-comment">//选择性的暴露某些接口</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">pause</span> : DM.pause, <span class="hljs-comment">//暂停</span>
        run : DM.run, <span class="hljs-comment">//继续</span>
        start : DM.start, <span class="hljs-comment">//运行</span>
        stop : DM.stop,    <span class="hljs-comment">//停止</span>
        changeStyle : DM.changeStyle, <span class="hljs-comment">//修改普通弹幕全局样式</span>
        addGradient : DM.addGradient, <span class="hljs-comment">//普通弹幕渐变</span>
        setSize : DM.setSize, <span class="hljs-comment">//修改宽高</span>
        inputData : DM.inputData, <span class="hljs-comment">//向普通弹幕插入数据</span>
        inputEffect : DM.inputEffect, <span class="hljs-comment">//向高级弹幕插入数据</span>
        clear : DM.clear, <span class="hljs-comment">//清除所有弹幕</span>
        reset : DM.reset, <span class="hljs-comment">//重新从某个弹幕开始</span>
        addFilter : DM.addFilter, <span class="hljs-comment">//添加过滤</span>
        removeFilter : DM.removeFilter, <span class="hljs-comment">//删除过滤</span>
        disableEffect : DM.disableEffect, <span class="hljs-comment">//不启用高级弹幕</span>
        enableEffect : DM.enableEffect, <span class="hljs-comment">//启用高级弹幕</span>
        getSize : DM.getSize, <span class="hljs-comment">//获取宽高,</span>
        getFPS : DM.getFPS <span class="hljs-comment">//获取fps</span>
    };
};

<span class="hljs-comment">//提供对外的引用接口</span>
<span class="hljs-keyword">if</span>( <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> != <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">module</span>.exports ){
    <span class="hljs-built_in">module</span>.exports = DanMuer;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>( <span class="hljs-keyword">typeof</span> define == <span class="hljs-string">"function"</span> &amp;&amp; define.amd ){
    define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> DanMuer;});
} <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">window</span>.DanMuer = DanMuer;
}</code></pre>
<p>第3个部分属于入口类，事实上每次调用插件都会先对第3部分进行实例化，这里主要保存一些对外暴露的API接口，还有就是插件的初始化函数，事件函数以及主循环函数，用于对插件总体的控制，部分源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//初始化
    constructor(wrap,opts = {}){

        if(!wrap){
            throw new Error(&quot;没有设置正确的wrapper&quot;);
        }

        //datas
        this.wrapper = wrap;
        this.width = wrap.clientWidth;
        this.height = wrap.clientHeight;
        this.canvas = document.createElement(&quot;canvas&quot;);
        this.canvas2 = document.createElement(&quot;canvas&quot;);

        this.normal = new normalDM(this.canvas,opts); //这里是普通弹幕的对象
        this.effect = new effectDM(this.canvas2,opts); //这里是高级弹幕的对象

        this.name = opts.name || &quot;&quot;; //没卵用
        this.fps = 0;

        //status
        this.drawing = opts.auto || false;
        this.startTime = new Date().getTime();

        //fn
        this[init]();
        this[loop]();
        if(opts.enableEvent)
        this.initEvent(opts);
    }

    [init](){
        //生成对应的canvas
        this.canvas.style.cssText = &quot;position:absolute;z-index:100;top:0px;left:0px;&quot;;
        this.canvas2.style.cssText = &quot;position:absolute;z-index:101;top:0px;left:0px;&quot;;
        this.setSize();
        this.wrapper.appendChild(this.canvas);
        this.wrapper.appendChild(this.canvas2);
    }

    //loop
    [loop](normal = this.normal,effect = this.effect,prev = this.startTime){
        
        let now = new Date().getTime();

        if(!this.drawing){
            normal.clearRect();
            effect.clearRect();
            return false;
        } else {
            let [w,h,time] = [this.width,this.height,now - prev];
            this.fps = 1000 / time >> 0;
            //这里进行内部的循环操作
            normal.update(w,h,time);
            effect.update(w,h,time);
        }

        requestAnimationFrame( () => { this[loop](normal,effect,now); } );
    }
    
    //主要对鼠标右键进行绑定
    initEvent(opts){
        let [el,normal,searching] = [this.canvas2,this.normal,false];

        el.onmouseup = function(e){
            e = e || event;

            if( searching ) return false;
            searching = true;

            if( e.button == 2 ){
                let [pos,result] = [e.target.getBoundingClientRect(),&quot;&quot;];
                let [x,y,i,items,item] = [ e.clientX - pos.left,
                                             e.clientY - pos.top,
                                             0, normal.save ];
                for( ; item = items[i++]; ){
                    let [ix,iy,w,h] = [item.x, item.y, item.width + 10, item.height];

                    if( x < ix  || x > ix + w || y < iy - h/2 || y > iy + h/2 || item.hide || item.recovery )
                    continue;

                    result = item;
                    break;
                }
            
                let callback = opts.callback || function(){};

                callback(result);

                searching = false;
            }

        };

        el.oncontextmenu = function(e){
            e = e || event;
            e.preventDefault();
        };

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//初始化</span>
    <span class="hljs-keyword">constructor</span>(wrap,opts = {}){

        <span class="hljs-keyword">if</span>(!wrap){
            <span class="hljs-keyword">throw</span> new Error(<span class="hljs-string">"没有设置正确的wrapper"</span>);
        }

        <span class="hljs-comment">//datas</span>
        <span class="hljs-keyword">this</span>.wrapper = wrap;
        <span class="hljs-keyword">this</span>.width = wrap.clientWidth;
        <span class="hljs-keyword">this</span>.height = wrap.clientHeight;
        <span class="hljs-keyword">this</span>.canvas = document.createElement(<span class="hljs-string">"canvas"</span>);
        <span class="hljs-keyword">this</span>.canvas2 = document.createElement(<span class="hljs-string">"canvas"</span>);

        <span class="hljs-keyword">this</span>.normal = new normalDM(<span class="hljs-keyword">this</span>.canvas,opts); <span class="hljs-comment">//这里是普通弹幕的对象</span>
        <span class="hljs-keyword">this</span>.effect = new effectDM(<span class="hljs-keyword">this</span>.canvas2,opts); <span class="hljs-comment">//这里是高级弹幕的对象</span>

        <span class="hljs-keyword">this</span>.name = opts.name || <span class="hljs-string">""</span>; <span class="hljs-comment">//没卵用</span>
        <span class="hljs-keyword">this</span>.fps = <span class="hljs-number">0</span>;

        <span class="hljs-comment">//status</span>
        <span class="hljs-keyword">this</span>.drawing = opts.auto || <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.startTime = new Date().getTime();

        <span class="hljs-comment">//fn</span>
        <span class="hljs-keyword">this</span>[init]();
        <span class="hljs-keyword">this</span>[loop]();
        <span class="hljs-keyword">if</span>(opts.enableEvent)
        <span class="hljs-keyword">this</span>.initEvent(opts);
    }

    [init](){
        <span class="hljs-comment">//生成对应的canvas</span>
        <span class="hljs-keyword">this</span>.canvas.style.cssText = <span class="hljs-string">"position:absolute;z-index:100;top:0px;left:0px;"</span>;
        <span class="hljs-keyword">this</span>.canvas2.style.cssText = <span class="hljs-string">"position:absolute;z-index:101;top:0px;left:0px;"</span>;
        <span class="hljs-keyword">this</span>.setSize();
        <span class="hljs-keyword">this</span>.wrapper.appendChild(<span class="hljs-keyword">this</span>.canvas);
        <span class="hljs-keyword">this</span>.wrapper.appendChild(<span class="hljs-keyword">this</span>.canvas2);
    }

    <span class="hljs-comment">//loop</span>
    [loop](normal = <span class="hljs-keyword">this</span>.normal,effect = <span class="hljs-keyword">this</span>.effect,prev = <span class="hljs-keyword">this</span>.startTime){
        
        let now = new Date().getTime();

        <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.drawing){
            normal.clearRect();
            effect.clearRect();
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        } <span class="hljs-keyword">else</span> {
            let [w,h,time] = [<span class="hljs-keyword">this</span>.width,<span class="hljs-keyword">this</span>.height,now - prev];
            <span class="hljs-keyword">this</span>.fps = <span class="hljs-number">1000</span> / time &gt;&gt; <span class="hljs-number">0</span>;
            <span class="hljs-comment">//这里进行内部的循环操作</span>
            normal.update(w,h,time);
            effect.update(w,h,time);
        }

        requestAnimationFrame( () =&gt; { <span class="hljs-keyword">this</span>[loop](normal,effect,now); } );
    }
    
    <span class="hljs-comment">//主要对鼠标右键进行绑定</span>
    initEvent(opts){
        let [el,normal,searching] = [<span class="hljs-keyword">this</span>.canvas2,<span class="hljs-keyword">this</span>.normal,<span class="hljs-literal">false</span>];

        el.onmouseup = function(e){
            e = e || event;

            <span class="hljs-keyword">if</span>( searching ) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            searching = <span class="hljs-literal">true</span>;

            <span class="hljs-keyword">if</span>( e.button == <span class="hljs-number">2</span> ){
                let [pos,result] = [e.target.getBoundingClientRect(),<span class="hljs-string">""</span>];
                let [x,y,i,items,item] = [ e.clientX - pos.left,
                                             e.clientY - pos.top,
                                             <span class="hljs-number">0</span>, normal.save ];
                <span class="hljs-keyword">for</span>( ; item = items[i++]; ){
                    let [ix,iy,w,h] = [item.x, item.y, item.width + <span class="hljs-number">10</span>, item.height];

                    <span class="hljs-keyword">if</span>( x &lt; ix  || x &gt; ix + w || y &lt; iy - h/<span class="hljs-number">2</span> || y &gt; iy + h/<span class="hljs-number">2</span> || item.hide || item.recovery )
                    <span class="hljs-keyword">continue</span>;

                    result = item;
                    <span class="hljs-keyword">break</span>;
                }
            
                let callback = opts.callback || function(){};

                callback(result);

                searching = <span class="hljs-literal">false</span>;
            }

        };

        el.oncontextmenu = function(e){
            e = e || event;
            e.preventDefault();
        };

    }</code></pre>
<p>源码最主要的就是第1部分和第2部分，大家在git-&gt;src里面可以看到两个类分别对应的文件，源码里面我的注释打了很多，而且每个函数的长度都不长，很容易看懂，这里就不对每一个功能做具体介绍了，下面主要讲讲几个比较重要的函数和设计思想：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*循环，这里是对主程序暴露的主要接口，用于普通弹幕内部的循环工作，其实工作流程主要由几个步骤组成：
** 1.判断全局样式是否发生变化，保持全局样式的准确性
** 2.判断当前弹幕机的状态（如暂停、运行等）并进行相关操作
** 3.更新for循环的初始下标（startIndex），主要是用于性能的优化
** 4.计算每个弹幕的状态
** 5.绘制弹幕
** 6.对每个弹幕的状态进行评估，如果已经显示完成就进行回收
** 基本上其他的功能都是围绕这些步骤开始拓展和完善，明白了工作原理后其他的函数就很好理
** 解了，都是为了完成这些工作流程而进行的，而且基本上源码里都有注释，这里就不详细说了
*/
    update(w,h,time){

        let [items,cxt] = [this.save,this.cxt];

        this.globalChanged &amp;&amp; this.initStyle(cxt); //初始化全局样式

        !this.looped &amp;&amp; this.countWidth(items); //计算文本宽度以及初始化位置（只执行一次）

        if( this.paused ) return false; //暂停

        this.refresh(items); //更新初始下标startIndex

        let [i,item] = [this.startIndex];

        cxt.clearRect(0,0,w,h);

        for(  ; item = items[i++]; ){
            this.step(item,time);
            this.draw(item,cxt);
            this.recovery(item,w);
        }

    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/*循环，这里是对主程序暴露的主要接口，用于普通弹幕内部的循环工作，其实工作流程主要由几个步骤组成：
** 1.判断全局样式是否发生变化，保持全局样式的准确性
** 2.判断当前弹幕机的状态（如暂停、运行等）并进行相关操作
** 3.更新for循环的初始下标（startIndex），主要是用于性能的优化
** 4.计算每个弹幕的状态
** 5.绘制弹幕
** 6.对每个弹幕的状态进行评估，如果已经显示完成就进行回收
** 基本上其他的功能都是围绕这些步骤开始拓展和完善，明白了工作原理后其他的函数就很好理
** 解了，都是为了完成这些工作流程而进行的，而且基本上源码里都有注释，这里就不详细说了
*/</span>
    update(w,h,time){

        let [items,cxt] = [<span class="hljs-keyword">this</span>.save,<span class="hljs-keyword">this</span>.cxt];

        <span class="hljs-keyword">this</span>.globalChanged &amp;&amp; <span class="hljs-keyword">this</span>.initStyle(cxt); <span class="hljs-comment">//初始化全局样式</span>

        !<span class="hljs-keyword">this</span>.looped &amp;&amp; <span class="hljs-keyword">this</span>.countWidth(items); <span class="hljs-comment">//计算文本宽度以及初始化位置（只执行一次）</span>

        <span class="hljs-keyword">if</span>( <span class="hljs-keyword">this</span>.paused ) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; <span class="hljs-comment">//暂停</span>

        <span class="hljs-keyword">this</span>.refresh(items); <span class="hljs-comment">//更新初始下标startIndex</span>

        let [i,item] = [<span class="hljs-keyword">this</span>.startIndex];

        cxt.clearRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,w,h);

        <span class="hljs-keyword">for</span>(  ; item = items[i++]; ){
            <span class="hljs-keyword">this</span>.step(item,time);
            <span class="hljs-keyword">this</span>.draw(item,cxt);
            <span class="hljs-keyword">this</span>.recovery(item,w);
        }

    }</code></pre>
<p>针对普通弹幕类还有一个有点难理解的是“通道”的获取。这里的“通道”是指弹幕从右往左运行时所在的那一行位置，这些通道是在canvas尺寸变化时生成的，不同类型的弹幕都有其通道集合。当一条新弹幕需要显示在canvas上时需要去获取它被分配的位置，也就是通道，通道被占用时，该行将不会重新放置新的弹幕， 当通道已经被分配完成后，将会随机生成一条临时通道，临时通道的位置随机出现，并且临时通过被释放时不会被收回通道集合中，而正常通道会被收回到集合中以待被下一个弹幕调用。下面是代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//生成通道行
    countRows(){

        //保存临时变量
        let unitHeight = parseInt(this.globalSize) + this.space;
        let [rowNum , rows] = [
            ( ( this.height - 20 ) / unitHeight ) >> 0,
            this.rows
        ];

        //重置通道
        for( let key of Object.keys(rows) ){
            rows[key] = [];
        }

        //重新生成通道
        for( let i = 0 ; i < rowNum; i++ ){
            let obj = {
                idx : i,
                y : unitHeight * i + 20
            };
            rows.slide.push(obj);

            i >= rowNum / 2 ? rows.bottom.push(obj) : rows.top.push(obj);
        }

        //更新实例属性
        this.unitHeight = unitHeight;
        this.rowNum = rowNum;
    }



//获取通道
    getRow(item){
        
        //如果该弹幕正在显示中，则返回其现有通道
        if( item.row ) 
        return item.row;

        //获取新通道
        const [rows,type] = [this.rows,item.type];
        const row = ( type != &quot;bottom&quot; ? rows[type].shift() : rows[type].pop() );
        //生成临时通道
        const tempRow = this[&quot;getRow_&quot;+type]();

        if( row &amp;&amp; item.type == &quot;slide&quot; ){
            item.x += ( row.idx * 8 );
            item.speed += ( row.idx / 3 );
        }

        //返回分配的通道
        return row || tempRow;

    }

    getRow_bottom(){
        return {
            y : 20 + this.unitHeight * ( ( Math.random() * this.rowNum / 2 + this.rowNum / 2 ) << 0 ),
            speedChange : false,
            tempItem : true
        };
    }

    getRow_slide(){
        return {
            y : 20 + this.unitHeight * ( ( Math.random() * this.rowNum ) << 0 ),
            speedChange : true,
            tempItem : true
        };
    }

    getRow_top(){
        return {
            y : 20 + this.unitHeight * ( ( Math.random() * this.rowNum / 2 ) << 0 ),
            speedChange : false,
            tempItem : true
        };
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//生成通道行</span>
    countRows(){

        <span class="hljs-comment">//保存临时变量</span>
        let unitHeight = parseInt(<span class="hljs-keyword">this</span>.globalSize) + <span class="hljs-keyword">this</span>.space;
        let [rowNum , rows] = [
            ( ( <span class="hljs-keyword">this</span>.height - <span class="hljs-number">20</span> ) / unitHeight ) &gt;&gt; <span class="hljs-number">0</span>,
            <span class="hljs-keyword">this</span>.rows
        ];

        <span class="hljs-comment">//重置通道</span>
        <span class="hljs-keyword">for</span>( let key of Object.keys(rows) ){
            rows[key] = [];
        }

        <span class="hljs-comment">//重新生成通道</span>
        <span class="hljs-keyword">for</span>( let i = <span class="hljs-number">0</span> ; i &lt; rowNum; i++ ){
            let obj = {
                idx : i,
                y : unitHeight * i + <span class="hljs-number">20</span>
            };
            rows.slide.push(obj);

            i &gt;= rowNum / <span class="hljs-number">2</span> ? rows.bottom.push(obj) : rows.top.push(obj);
        }

        <span class="hljs-comment">//更新实例属性</span>
        <span class="hljs-keyword">this</span>.unitHeight = unitHeight;
        <span class="hljs-keyword">this</span>.rowNum = rowNum;
    }



<span class="hljs-comment">//获取通道</span>
    getRow(item){
        
        <span class="hljs-comment">//如果该弹幕正在显示中，则返回其现有通道</span>
        <span class="hljs-keyword">if</span>( item.row ) 
        <span class="hljs-keyword">return</span> item.row;

        <span class="hljs-comment">//获取新通道</span>
        const [rows,type] = [<span class="hljs-keyword">this</span>.rows,item.type];
        const row = ( type != <span class="hljs-string">"bottom"</span> ? rows[type].shift() : rows[type].pop() );
        <span class="hljs-comment">//生成临时通道</span>
        const tempRow = <span class="hljs-keyword">this</span>[<span class="hljs-string">"getRow_"</span>+type]();

        <span class="hljs-keyword">if</span>( row &amp;&amp; item.type == <span class="hljs-string">"slide"</span> ){
            item.x += ( row.idx * <span class="hljs-number">8</span> );
            item.speed += ( row.idx / <span class="hljs-number">3</span> );
        }

        <span class="hljs-comment">//返回分配的通道</span>
        <span class="hljs-keyword">return</span> row || tempRow;

    }

    getRow_bottom(){
        <span class="hljs-keyword">return</span> {
            y : <span class="hljs-number">20</span> + <span class="hljs-keyword">this</span>.unitHeight * ( ( Math.random() * <span class="hljs-keyword">this</span>.rowNum / <span class="hljs-number">2</span> + <span class="hljs-keyword">this</span>.rowNum / <span class="hljs-number">2</span> ) &lt;&lt; <span class="hljs-number">0</span> ),
            speedChange : <span class="hljs-literal">false</span>,
            tempItem : <span class="hljs-literal">true</span>
        };
    }

    getRow_slide(){
        <span class="hljs-keyword">return</span> {
            y : <span class="hljs-number">20</span> + <span class="hljs-keyword">this</span>.unitHeight * ( ( Math.random() * <span class="hljs-keyword">this</span>.rowNum ) &lt;&lt; <span class="hljs-number">0</span> ),
            speedChange : <span class="hljs-literal">true</span>,
            tempItem : <span class="hljs-literal">true</span>
        };
    }

    getRow_top(){
        <span class="hljs-keyword">return</span> {
            y : <span class="hljs-number">20</span> + <span class="hljs-keyword">this</span>.unitHeight * ( ( Math.random() * <span class="hljs-keyword">this</span>.rowNum / <span class="hljs-number">2</span> ) &lt;&lt; <span class="hljs-number">0</span> ),
            speedChange : <span class="hljs-literal">false</span>,
            tempItem : <span class="hljs-literal">true</span>
        };
    }</code></pre>
<p>高级弹幕类与普通弹幕类有点微妙的差别，但总体是一样，唯一需要在意的是与计算相关的代码，因为不难所以这里也不做继续说明了，请参看源码里的注释。</p>
<h2 id="articleHeader3">结语</h2>
<p>就第二版来说，第三版性能更好，而且实现了播放器模块和弹幕模块的解耦，也就是说相比第二版，第三版 可以适用但不限于播放器，可用性更高，而且实现了高级弹幕的发送，未来将慢慢补齐更多的功能和代码重构，希望大家遇到什么BUG或者是有某些的需求，请私信或是将反馈提交到本邮箱：454236029@qq.com || z454236029@gmail.com，如果觉得本插件对你有用欢迎给个星，谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5 CANVAS 弹幕插件--DanMuer.js（V3.2.5）

## 原文链接
[https://segmentfault.com/a/1190000010095752](https://segmentfault.com/a/1190000010095752)

