---
title: 'Weex 开发小游戏是件很 high 的事儿' 
date: 2018-12-28 2:30:10
hidden: true
slug: bsw7ctkpjgj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>作为一个移动端初学者、爱好者，能使用前端技术开发原生游戏一直是一件渴望而不可及的事情，暂且不说游戏逻辑的复杂度，算法的健壮性，单单是场景、画布、布局就让我们无处下手。</p>
<p>几年前曾经参与 Appcan 技术的技术孵化和推广，尝试使用 Hybrid 技术写过一个小游戏，<a href="https://segmentfault.com/a/1190000011007935">《Hybrid混合实现app小游戏》</a>，由于此游戏结构场景比较简单，所以未使用大型的游戏引擎，<a href="http://www.cocos.com/" rel="nofollow noreferrer" target="_blank">Cocos2d-x游戏引擎</a>，所有逻辑全部手工。同样也是可「三端同构」，但本质上还是一个 H5小游戏，只是在真机上，执行环境是一个 UIWebview，所以，H5可以做的，他都可以做，H5不能做到，他未必不能做，如摄像头、陀螺仪等。但缺点也很致命，执行效率完全受限于原生控件 UIWebview，要知道对于一个游戏来讲，流畅度是第一要义。</p>
<p>总的来讲，使用 Hybrid 技术开发游戏的方案虽然可行，但是，效果并不是我想要的。</p>
<p>自从 ReactNative 开源以来，一直想着要使用 ReactNative 开发游戏。个人原因，一直未付诸实践。直到上周有网友问我，「Weex是否能拿来做游戏开发」，试试就知道，那就先拿 Weex 开刀，来挑战下 game app 同构的能力，给还没上车的朋友带波节奏。</p>
<h1 id="articleHeader1">准备工作</h1>
<p>如果你还未入门，没关系，就当看个热闹了，知道 Weex 能不能快速开发游戏就可以了。</p>
<p>如果你想先入门，以下几篇文章你可以当作是导读。</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000011154120">《Native、Web App、Hybrid、React Native 和 Weex》</a></li>
<li><a href="https://segmentfault.com/a/1190000010984857" target="_blank">《Weex 快速创建工程 Hello World》</a></li>
<li><a href="https://segmentfault.com/a/1190000011027225">《网易严选 App 感受 Weex 开发》</a></li>
</ul>
<h1 id="articleHeader2">扫雷游戏 Demo</h1>
<p>官方提供的 WeexPlayground 中也提供了一个游戏 demo 扫雷，如下图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011654088?w=252&amp;h=451" src="https://static.alili.tech/img/remote/1460000011654088?w=252&amp;h=451" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>此 demo 是为了实践以下三件事：</p>
<ol>
<li>界面指示器</li>
<li>动态数据绑定</li>
<li>更复杂的事件</li>
</ol>
<p>总体表现还是不错的。更多细节，可详读<a href="https://yq.aliyun.com/articles/42627?spm=5176.100240.searchblog.35.XuBful" rel="nofollow noreferrer" target="_blank">《Weex版扫雷游戏开发》</a></p>
<h1 id="articleHeader3">我的小游戏</h1>
<p>别人的东西再炫酷也始终是别人的，不自己动手码一个说话都不硬气！</p>
<blockquote><p>没有实践就没有发言权，此处献上源码的 Github 链接：<a href="https://github.com/zwwill/just-do-8" rel="nofollow noreferrer" target="_blank">https://github.com/zwwill/just-do-8</a>，欢迎「Star」「Fork」，支持瞎搞 ψ(｀∇´)ψ</p></blockquote>
<p>先来感受下最终的效果</p>
<h2 id="articleHeader4">界面</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011657670?w=1240&amp;h=537" src="https://static.alili.tech/img/remote/1460000011657670?w=1240&amp;h=537" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">体验</h2>
<p>IOS已上线 <a href="https://itunes.apple.com/cn/app/id1299422482" rel="nofollow noreferrer" target="_blank">https://itunes.apple.com/cn/a...</a></p>
<p>也可以直接使用 Weex Playground 扫码体验&nbsp;<a href="http://weex.apache.org/cn/playground.html" rel="nofollow noreferrer" target="_blank">Weex Playground下载地址</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011654090?w=280&amp;h=280" src="https://static.alili.tech/img/remote/1460000011654090?w=280&amp;h=280" alt="" title="" style="cursor: pointer;"></span></p>
<p>近期将发布到应用市场，届时还望大家多多支持。</p>
<h3 id="articleHeader6">规则</h3>
<p>规则很简单，会玩「俄罗斯方块」和「2048」就一定会玩这款小游戏</p>
<h3 id="articleHeader7">一期功能</h3>
<p>由于要快速产出，界面随便就别太在意了，另外很多功能还没有开发，如，全球排名、分享、游戏设置等，这些都放在后面慢慢迭代吧（如果有第二版的话(￣.￣)）</p>
<h2 id="articleHeader8">源码分析</h2>
<blockquote><p>接下来是一大波源码分析，不感冒？那就直接跳过。<br>由于篇幅有限，此处只做简要介绍，详细请见工程源码，地址请爬楼</p></blockquote>
<h3 id="articleHeader9">项目结构</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011654091?w=535&amp;h=305" src="https://static.alili.tech/img/remote/1460000011654091?w=535&amp;h=305" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>只有三个文件（一个场景两个组件）。我来逐一讲解下每个文件的职能。</p>
<h4>index.vue</h4>
<blockquote><p><strong>【index.vue】</strong>是一个场景文件，用于根据状态切换场景，以及监听处理所有的手势</p></blockquote>
<p>【模版 | 简码】</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;wrapper&quot; @swipe=&quot;onSwipe&quot; @click=&quot;onClick&quot; @panstart=&quot;onPanstart&quot; @panend=&quot;onPanend&quot; @horizontalpan=&quot;onHorizontalpan&quot;>
    <!-- 此处省略一堆代码 -->
    <stoneMap v-if=&quot;stoneMapShow&quot; ref=&quot;rStoneMap&quot; class=&quot;stone-map&quot; @screenLock=&quot;onScreenLock&quot; @screenUnlock=&quot;onScreenUnlock&quot; @over=&quot;onGameover&quot; @win=&quot;onGameWin&quot;></stoneMap>
    <!-- 此处省略一堆代码 -->
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span> @<span class="hljs-attr">swipe</span>=<span class="hljs-string">"onSwipe"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"onClick"</span> @<span class="hljs-attr">panstart</span>=<span class="hljs-string">"onPanstart"</span> @<span class="hljs-attr">panend</span>=<span class="hljs-string">"onPanend"</span> @<span class="hljs-attr">horizontalpan</span>=<span class="hljs-string">"onHorizontalpan"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 此处省略一堆代码 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">stoneMap</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"stoneMapShow"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"rStoneMap"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"stone-map"</span> @<span class="hljs-attr">screenLock</span>=<span class="hljs-string">"onScreenLock"</span> @<span class="hljs-attr">screenUnlock</span>=<span class="hljs-string">"onScreenUnlock"</span> @<span class="hljs-attr">over</span>=<span class="hljs-string">"onGameover"</span> @<span class="hljs-attr">win</span>=<span class="hljs-string">"onGameWin"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">stoneMap</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 此处省略一堆代码 --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>我们监听了 Weex 的一堆事件来「合成」我们需要的【切换】【左右滑动】【下降】等主要游戏操作。如<code>@swipe</code>、<code>@click</code>、<code>@panstart</code>、<code>@panend</code>和<code>@horizontalpan</code>，同时给<code>&lt;stoneMap /&gt;</code>组件注册<code>@screenLock</code>、<code>@screenUnlock</code>、<code>@over</code>和<code>@win</code>等事件，用于游戏场景切换。</p>
<ul>
<li>
<strong>@swipe</strong>：<code>swipe</code>的属性<code>direction</code>提供在屏幕上滑动时触发的方向，本项目用到<code>up</code>、<code>down</code>，官方给的说法是『<code>direction</code>的值可能为<code>up</code>、<code>left</code>、<code>bottom</code>、<code>right</code>』但实际上我得到的却是<code>down</code>而不是<code>bottom</code>，具体请客还在和Weex的开发团队进行沟通，确认后会更新上来。另外要注意的是<code>@swipe</code>、<code>@click</code>、<code>@panstart</code>、<code>@panend</code>和<code>@horizontalpan</code>这些事件同时使用时会出现冲突问题，Android 平台下问题比较多，具体大家在做的时候需要做好兼容</li>
<li>
<strong>@click</strong>：常规的<code>click</code>事件</li>
<li>
<strong>@panstart、@panend、@horizontalpan</strong>：用于计算左右滑动距离，每滑动40个显示像素就向<code>&lt;stoneMap /&gt;</code>组件发起滑块左右滑动的指令</li>
</ul>
<p>具体事件的使用姿势，大家可以详读<a href="https://weex.apache.org/cn/references/gesture.html" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<p>每一个事件方法的功能实现和视觉此处就略去了。</p>
<h4>stoneMap.vue</h4>
<blockquote><p><strong>【stoneMap.vue】</strong>就像是「大内总管」，一切闲杂喽啰的事都归他管。主要管理的数字块的布局、状态、游戏分值等</p></blockquote>
<p>【简码】</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;u-slider&quot;>
        <!-- 此处省略一些记录分值等无关紧要的代码 -->
        <template v-for=&quot;i in stones&quot;>
            <stone :ref=&quot;i.id&quot; :id=&quot;i.id&quot; :p0=&quot;i.p0&quot; :num0=&quot;i.s&quot;></stone>
        </template>
    </div>
</template>
<script>
   export default {
        components: {
            stone: stone
        },
        data() {
            return {
                MAX_H: 9,
                stones: [],
                map: [],
                // 此处省略一些无关紧要的data
            }
        },
        mounted() {
            // 绘制画布矩阵
            for (let _i = 0; _i < this.MAX_H; _i++) {
                this.map.push(['', '', '', '', '', '']);
            }
            // 开始游戏
            this.pushStones();
        },
        methods: {
            /**
             * 事件控制
             * */
            action(_action) { /* ... */ },
            /**
             * 新增三个单元数字块
             * */
            pushStones() { /* ... */ },
            /**
             * 滑块切换
             * */
            actionChange() { /* ... */ },
            /**
             * 滑块左右滚动
             * */
            actionSliderMove(_d) { /* ... */ },
            /**
             * 单元块位置移动+权重加码
             * */
            actionDown() { /* ... */ },
            /**
             * 重新计算map并更新
             * */
            mapUpdate() { /* ... */ },
            /**
             * 计算map
             * */
            mapCalculator: (function () { /* ... */ })(),
            /**
             * 整理数字块，堆积下降
             * */
            stonesTrim() { /* ... */ },
            /**
             * 单元块位置移动+权重加码
             * */
            sChange(_id, _p, _score) { /* ... */ }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"u-slider"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 此处省略一些记录分值等无关紧要的代码 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"i in stones"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">stone</span> <span class="hljs-attr">:ref</span>=<span class="hljs-string">"i.id"</span> <span class="hljs-attr">:id</span>=<span class="hljs-string">"i.id"</span> <span class="hljs-attr">:p0</span>=<span class="hljs-string">"i.p0"</span> <span class="hljs-attr">:num0</span>=<span class="hljs-string">"i.s"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">stone</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
   <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: {
            <span class="hljs-attr">stone</span>: stone
        },
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">MAX_H</span>: <span class="hljs-number">9</span>,
                <span class="hljs-attr">stones</span>: [],
                <span class="hljs-attr">map</span>: [],
                <span class="hljs-comment">// 此处省略一些无关紧要的data</span>
            }
        },
        mounted() {
            <span class="hljs-comment">// 绘制画布矩阵</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> _i = <span class="hljs-number">0</span>; _i &lt; <span class="hljs-keyword">this</span>.MAX_H; _i++) {
                <span class="hljs-keyword">this</span>.map.push([<span class="hljs-string">''</span>, <span class="hljs-string">''</span>, <span class="hljs-string">''</span>, <span class="hljs-string">''</span>, <span class="hljs-string">''</span>, <span class="hljs-string">''</span>]);
            }
            <span class="hljs-comment">// 开始游戏</span>
            <span class="hljs-keyword">this</span>.pushStones();
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-comment">/**
             * 事件控制
             * */</span>
            action(_action) { <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 新增三个单元数字块
             * */</span>
            pushStones() { <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 滑块切换
             * */</span>
            actionChange() { <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 滑块左右滚动
             * */</span>
            actionSliderMove(_d) { <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 单元块位置移动+权重加码
             * */</span>
            actionDown() { <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 重新计算map并更新
             * */</span>
            mapUpdate() { <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 计算map
             * */</span>
            mapCalculator: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">/* ... */</span> })(),
            <span class="hljs-comment">/**
             * 整理数字块，堆积下降
             * */</span>
            stonesTrim() { <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 单元块位置移动+权重加码
             * */</span>
            sChange(_id, _p, _score) { <span class="hljs-comment">/* ... */</span> }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul>
<li>
<strong>this.stones</strong>：用于管理所有实例进来的数字块，将他们投影到界面上</li>
<li>
<strong>this.map</strong>：是一个6*9的逻辑网，标记 this.stones 中的的数字块的逻辑位置</li>
</ul>
<p>此处主要介绍下事件的控制分发和逻辑网的计算，讲解在注释中</p>
<p>【action() | 简码】</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 事件的控制分发
 * */
action(_action) {
    if (!!this.actionLock) return;
    switch (_action) {
        case 'click':
        case 'up':
            // click 和 up 触发上方三个活动数字块的互相切换
            this.actionChange();
            break;
        case 'left':
        case 'right':
            // left 和 right 触发上方三个活动数字块的的整体平移
            this.actionSliderMove(_action);
            break;
        case 'down':
        case 'bottom':
            // down 触发上方三个活动数字块进场
            // bottom 起到兼容的作用
            this.actionDown();
            break;
        default:
            break;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 事件的控制分发
 * */</span>
action(_action) {
    <span class="hljs-keyword">if</span> (!!<span class="hljs-keyword">this</span>.actionLock) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">switch</span> (_action) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'click'</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-string">'up'</span>:
            <span class="hljs-comment">// click 和 up 触发上方三个活动数字块的互相切换</span>
            <span class="hljs-keyword">this</span>.actionChange();
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'left'</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-string">'right'</span>:
            <span class="hljs-comment">// left 和 right 触发上方三个活动数字块的的整体平移</span>
            <span class="hljs-keyword">this</span>.actionSliderMove(_action);
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'down'</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-string">'bottom'</span>:
            <span class="hljs-comment">// down 触发上方三个活动数字块进场</span>
            <span class="hljs-comment">// bottom 起到兼容的作用</span>
            <span class="hljs-keyword">this</span>.actionDown();
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">break</span>;
    }
}</code></pre>
<p>【mapCalculator() | 全码】</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 计算map
 * */
mapCalculator: (function () {
    var updateStone = function (_stones, _id, _s) {
        /** 
         * 此方法控制得分规则
         * 横竖对角线+1分
         * 十字、X型+2分
         * 8字型、9宫格分别+3分、+4分，当然，不可能存在这两种情况
         * */
        if (_stones[_id]) {
            _s != 0 &amp;&amp; _s < 8 &amp;&amp; (_stones[_id]['score'] == 0 ? _stones[_id]['score'] = _s : _stones[_id]['score']++);
        } else {
            _stones[_id] = {
                id: _id,
                score: _s
            }
        }
    };
    
    return function (_map) {
        let hasChange = false,
            activeStones = {},
            height = _map.length - 1,
            width = _map[0].length - 1,
            _tp_id, _s;
        // 全逻辑网遍历
        for (let y = height; y >= 0; y--) {
            for (let x = 0; x <= width; x++) {
                _tp_id = _map[y][x] || &quot;&quot;;
                // 排除四角
                if (!_tp_id || (x == 0 || x == width) &amp;&amp; (y == 0 || y == height)) continue; 
                
                _s = parseInt(this.$refs[_tp_id][0].num);
                let _p1, _p2;
                if (x == 0 || x == width || y == 0 || y == height) {
                    // 侧边，将其单独提炼出来是为了减少计算量三分之一的计算量
                    if (x == 0 || x == width) {
                        // 竖排
                        if (!_map[y - 1][x] || !_map[y + 1][x]) continue;
                        _p1 = this.$refs[_map[y - 1][x]][0];
                        _p2 = this.$refs[_map[y + 1][x]][0];
                    } else if (y == 0 || y == height) {
                        // 横排
                        if (!_map[y][x - 1] || !_map[y][x + 1]) continue;
                        _p1 = this.$refs[_map[y][x - 1]][0];
                        _p2 = this.$refs[_map[y][x + 1]][0];
                    }
                    if (_p1 &amp;&amp; _p2 &amp;&amp; _p1.num == _s &amp;&amp; _p2.num == _s) {
                        hasChange = true;
                        updateStone(activeStones, _tp_id, ++_s);
                        updateStone(activeStones, _p1.id, 0);
                        updateStone(activeStones, _p2.id, 0);
                    }
                } else {
                    // 中间可形成九宫格区域
                    const _map_matrix = [
                        [[0, 1], [0, -1]],
                        [[-1, 1], [1, -1]],
                        [[-1, 0], [1, 0]],
                        [[-1, -1], [1, 1]]
                    ];
                    for (let _i = 0, _mm; _i < _map_matrix.length; _i++) {
                        _mm = _map_matrix[_i];
                        if (!_map[y + _mm[0][0]][x + _mm[0][1]] || !_map[y + _mm[1][0]][x + _mm[1][1]]) continue;
                        _p1 = this.$refs[_map[y + _mm[0][0]][x + _mm[0][1]]][0];
                        _p2 = this.$refs[_map[y + _mm[1][0]][x + _mm[1][1]]][0];
                        if (_p1 &amp;&amp; _p2 &amp;&amp; _p1.num == _s &amp;&amp; _p2.num == _s) {
                            hasChange = true;
                            updateStone(activeStones, _tp_id, _s + 1);
                            updateStone(activeStones, _p1.id, 0);
                            updateStone(activeStones, _p2.id, 0);
                        }
                    }
                }
            }
        }

        // 存在更新块
        if (hasChange) {
            setTimeout(() => {
                for (let s in activeStones) {
                    this.sChange(s, undefined, activeStones[s].score);
                }
                // 数字块整理
                setTimeout(() => {
                    this.stonesTrim();
                }, 100)
            }, 400)
        } else {
            let _errorStone = &quot;&quot;;
            for (let _i = 0; _i < this.map[0].length; _i++) {
                if (this.map[0][_i]) {
                    _errorStone = this.$refs[this.map[0][_i]][0].$refs['stone'];
                    break;
                }
            }
            if (!!_errorStone) {
                this.$emit('over', this.totalScore, this.highScore, _errorStone);
                if (this.totalScore > this.highScore) {
                    storage.setItem('H-SCORE', this.totalScore)
                }
            } else {
                this.$emit('screenUnlock');
                setTimeout(() => {
                    this.pushStones();
                }, 100);
            }
        }
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 计算map
 * */</span>
mapCalculator: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> updateStone = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_stones, _id, _s</span>) </span>{
        <span class="hljs-comment">/** 
         * 此方法控制得分规则
         * 横竖对角线+1分
         * 十字、X型+2分
         * 8字型、9宫格分别+3分、+4分，当然，不可能存在这两种情况
         * */</span>
        <span class="hljs-keyword">if</span> (_stones[_id]) {
            _s != <span class="hljs-number">0</span> &amp;&amp; _s &lt; <span class="hljs-number">8</span> &amp;&amp; (_stones[_id][<span class="hljs-string">'score'</span>] == <span class="hljs-number">0</span> ? _stones[_id][<span class="hljs-string">'score'</span>] = _s : _stones[_id][<span class="hljs-string">'score'</span>]++);
        } <span class="hljs-keyword">else</span> {
            _stones[_id] = {
                <span class="hljs-attr">id</span>: _id,
                <span class="hljs-attr">score</span>: _s
            }
        }
    };
    
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_map</span>) </span>{
        <span class="hljs-keyword">let</span> hasChange = <span class="hljs-literal">false</span>,
            activeStones = {},
            height = _map.length - <span class="hljs-number">1</span>,
            width = _map[<span class="hljs-number">0</span>].length - <span class="hljs-number">1</span>,
            _tp_id, _s;
        <span class="hljs-comment">// 全逻辑网遍历</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> y = height; y &gt;= <span class="hljs-number">0</span>; y--) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>; x &lt;= width; x++) {
                _tp_id = _map[y][x] || <span class="hljs-string">""</span>;
                <span class="hljs-comment">// 排除四角</span>
                <span class="hljs-keyword">if</span> (!_tp_id || (x == <span class="hljs-number">0</span> || x == width) &amp;&amp; (y == <span class="hljs-number">0</span> || y == height)) <span class="hljs-keyword">continue</span>; 
                
                _s = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.$refs[_tp_id][<span class="hljs-number">0</span>].num);
                <span class="hljs-keyword">let</span> _p1, _p2;
                <span class="hljs-keyword">if</span> (x == <span class="hljs-number">0</span> || x == width || y == <span class="hljs-number">0</span> || y == height) {
                    <span class="hljs-comment">// 侧边，将其单独提炼出来是为了减少计算量三分之一的计算量</span>
                    <span class="hljs-keyword">if</span> (x == <span class="hljs-number">0</span> || x == width) {
                        <span class="hljs-comment">// 竖排</span>
                        <span class="hljs-keyword">if</span> (!_map[y - <span class="hljs-number">1</span>][x] || !_map[y + <span class="hljs-number">1</span>][x]) <span class="hljs-keyword">continue</span>;
                        _p1 = <span class="hljs-keyword">this</span>.$refs[_map[y - <span class="hljs-number">1</span>][x]][<span class="hljs-number">0</span>];
                        _p2 = <span class="hljs-keyword">this</span>.$refs[_map[y + <span class="hljs-number">1</span>][x]][<span class="hljs-number">0</span>];
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (y == <span class="hljs-number">0</span> || y == height) {
                        <span class="hljs-comment">// 横排</span>
                        <span class="hljs-keyword">if</span> (!_map[y][x - <span class="hljs-number">1</span>] || !_map[y][x + <span class="hljs-number">1</span>]) <span class="hljs-keyword">continue</span>;
                        _p1 = <span class="hljs-keyword">this</span>.$refs[_map[y][x - <span class="hljs-number">1</span>]][<span class="hljs-number">0</span>];
                        _p2 = <span class="hljs-keyword">this</span>.$refs[_map[y][x + <span class="hljs-number">1</span>]][<span class="hljs-number">0</span>];
                    }
                    <span class="hljs-keyword">if</span> (_p1 &amp;&amp; _p2 &amp;&amp; _p1.num == _s &amp;&amp; _p2.num == _s) {
                        hasChange = <span class="hljs-literal">true</span>;
                        updateStone(activeStones, _tp_id, ++_s);
                        updateStone(activeStones, _p1.id, <span class="hljs-number">0</span>);
                        updateStone(activeStones, _p2.id, <span class="hljs-number">0</span>);
                    }
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 中间可形成九宫格区域</span>
                    <span class="hljs-keyword">const</span> _map_matrix = [
                        [[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>]],
                        [[<span class="hljs-number">-1</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">-1</span>]],
                        [[<span class="hljs-number">-1</span>, <span class="hljs-number">0</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>]],
                        [[<span class="hljs-number">-1</span>, <span class="hljs-number">-1</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>]]
                    ];
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> _i = <span class="hljs-number">0</span>, _mm; _i &lt; _map_matrix.length; _i++) {
                        _mm = _map_matrix[_i];
                        <span class="hljs-keyword">if</span> (!_map[y + _mm[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>]][x + _mm[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>]] || !_map[y + _mm[<span class="hljs-number">1</span>][<span class="hljs-number">0</span>]][x + _mm[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>]]) <span class="hljs-keyword">continue</span>;
                        _p1 = <span class="hljs-keyword">this</span>.$refs[_map[y + _mm[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>]][x + _mm[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>]]][<span class="hljs-number">0</span>];
                        _p2 = <span class="hljs-keyword">this</span>.$refs[_map[y + _mm[<span class="hljs-number">1</span>][<span class="hljs-number">0</span>]][x + _mm[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>]]][<span class="hljs-number">0</span>];
                        <span class="hljs-keyword">if</span> (_p1 &amp;&amp; _p2 &amp;&amp; _p1.num == _s &amp;&amp; _p2.num == _s) {
                            hasChange = <span class="hljs-literal">true</span>;
                            updateStone(activeStones, _tp_id, _s + <span class="hljs-number">1</span>);
                            updateStone(activeStones, _p1.id, <span class="hljs-number">0</span>);
                            updateStone(activeStones, _p2.id, <span class="hljs-number">0</span>);
                        }
                    }
                }
            }
        }

        <span class="hljs-comment">// 存在更新块</span>
        <span class="hljs-keyword">if</span> (hasChange) {
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> s <span class="hljs-keyword">in</span> activeStones) {
                    <span class="hljs-keyword">this</span>.sChange(s, <span class="hljs-literal">undefined</span>, activeStones[s].score);
                }
                <span class="hljs-comment">// 数字块整理</span>
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.stonesTrim();
                }, <span class="hljs-number">100</span>)
            }, <span class="hljs-number">400</span>)
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">let</span> _errorStone = <span class="hljs-string">""</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> _i = <span class="hljs-number">0</span>; _i &lt; <span class="hljs-keyword">this</span>.map[<span class="hljs-number">0</span>].length; _i++) {
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.map[<span class="hljs-number">0</span>][_i]) {
                    _errorStone = <span class="hljs-keyword">this</span>.$refs[<span class="hljs-keyword">this</span>.map[<span class="hljs-number">0</span>][_i]][<span class="hljs-number">0</span>].$refs[<span class="hljs-string">'stone'</span>];
                    <span class="hljs-keyword">break</span>;
                }
            }
            <span class="hljs-keyword">if</span> (!!_errorStone) {
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'over'</span>, <span class="hljs-keyword">this</span>.totalScore, <span class="hljs-keyword">this</span>.highScore, _errorStone);
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.totalScore &gt; <span class="hljs-keyword">this</span>.highScore) {
                    storage.setItem(<span class="hljs-string">'H-SCORE'</span>, <span class="hljs-keyword">this</span>.totalScore)
                }
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'screenUnlock'</span>);
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.pushStones();
                }, <span class="hljs-number">100</span>);
            }
        }
    }
})()</code></pre>
<p>【stonesTrim | 全码】</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 整理数字块，堆积下降
 * */
stonesTrim() {
    let hasChange = false,
        height = this.map.length - 1,
        width = this.map[0].length - 1,
        _tp_id, _step = 0;
    for (let x = 0; x <= width; x++) {
        _step = 0;
        for (let y = height; y >= 0; y--) {
            _tp_id = this.map[y][x] || &quot;&quot;;
            if (!_tp_id) {
                _step++;
                continue;
            } else if (_step > 0) {
                hasChange = true;
                this.sChange(_tp_id, {y: _step});
                this.map[y + _step][x] = _tp_id;
                this.map[y][x] = &quot;&quot;;
            }
        }
    }
    setTimeout(() => {
        this.mapUpdate();
    }, hasChange ? 200 : 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 整理数字块，堆积下降
 * */</span>
stonesTrim() {
    <span class="hljs-keyword">let</span> hasChange = <span class="hljs-literal">false</span>,
        height = <span class="hljs-keyword">this</span>.map.length - <span class="hljs-number">1</span>,
        width = <span class="hljs-keyword">this</span>.map[<span class="hljs-number">0</span>].length - <span class="hljs-number">1</span>,
        _tp_id, _step = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>; x &lt;= width; x++) {
        _step = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> y = height; y &gt;= <span class="hljs-number">0</span>; y--) {
            _tp_id = <span class="hljs-keyword">this</span>.map[y][x] || <span class="hljs-string">""</span>;
            <span class="hljs-keyword">if</span> (!_tp_id) {
                _step++;
                <span class="hljs-keyword">continue</span>;
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (_step &gt; <span class="hljs-number">0</span>) {
                hasChange = <span class="hljs-literal">true</span>;
                <span class="hljs-keyword">this</span>.sChange(_tp_id, {<span class="hljs-attr">y</span>: _step});
                <span class="hljs-keyword">this</span>.map[y + _step][x] = _tp_id;
                <span class="hljs-keyword">this</span>.map[y][x] = <span class="hljs-string">""</span>;
            }
        }
    }
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.mapUpdate();
    }, hasChange ? <span class="hljs-number">200</span> : <span class="hljs-number">0</span>);
}</code></pre>
<h4>stone.vue</h4>
<blockquote><p><strong>【stone.vue】</strong>就像被「大内总管」管理着的「小太监」（数字块），「小太监」的一举一动都是被「总管」支配的，包括其长相（颜色）、品级（数字）以及生死（生命周期），但状态的改变都是由自己执行，直接自己整容，自己升级，还要。。自杀。底层人民好无奈 ╮(╯_╰)╭</p></blockquote>
<p>【简码】</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <text ref=&quot;stone&quot; class=&quot;u-stone&quot; :style=&quot;{color:color,visibility:visibility,backgroundColor:backgroundColor0}&quot; v-if=&quot;show&quot; >"{{"score"}}"</text>
</template>

<script>
    const animation = weex.requireModule('animation');
    export default {
        props: ['id', 'p0', 'num0'],
        data(){
            return {
                show: true,
                p: '0,8',
                visibility: '',
                num: -1,
                colors: [&quot;#333&quot;,&quot;#666&quot;,&quot;#eee&quot;,&quot;#b9e3ee&quot;,&quot;#ebe94b&quot;,&quot;#46cafb&quot;,&quot;#eca48f&quot;,&quot;#decb3d&quot;,&quot;#8d1894&quot;],
                backgroundColors: [&quot;#222&quot;,&quot;#ddd&quot;,&quot;#999&quot;,&quot;#379dc3&quot;,&quot;#36be0d&quot;,&quot;#001cc6&quot;,&quot;#da4324&quot;,&quot;#56125a&quot;,&quot;#ffffff&quot;]
            }
        },
        computed: {
            color: function () {
                return this.colors[this.num];
            },
            score: function () {
                this.num<0 &amp;&amp; (this.num = this.num0 || 1);
                return this.num<9&amp;&amp;this.num>0?this.num:0
            },
            backgroundColor0: function () {
                return this.backgroundColors[this.num];
            }
        },
        watch: {
            p: function (val) {
                // 移动数字块
                var _x = 125*val.charAt(0)+&quot;px&quot;,
                    _y = 125*val.charAt(2)+&quot;px&quot;;
                // 使用animation库实现过度动画
                animation.transition(this.$refs['stone'],{
                    styles: {
                        transform: 'translate('+_x +',-'+_y+')'
                    },
                    duration: 200,
                    timingFunction: 'ease-in',
                    delay: 0
                });
            }
        },
        mounted(){
            this.initState(this.p0);
        },
        methods: {
            /**
             * 移动数字块
             * */
            move(_x, _y){ /* ... */ },
            /**
             * 更新数字块的分值，即显示数字
             * */
            scoreChange(_num){ /* ... */ },
            /**
             * 初始化数字块的位置
             * */
            initState(_p){ /* ... */ }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"stone"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"u-stone"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{color:color,visibility:visibility,backgroundColor:backgroundColor0}"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span> &gt;</span>"{{"score"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">const</span> animation = weex.requireModule(<span class="hljs-string">'animation'</span>);
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'id'</span>, <span class="hljs-string">'p0'</span>, <span class="hljs-string">'num0'</span>],
        data(){
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">show</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">p</span>: <span class="hljs-string">'0,8'</span>,
                <span class="hljs-attr">visibility</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">num</span>: <span class="hljs-number">-1</span>,
                <span class="hljs-attr">colors</span>: [<span class="hljs-string">"#333"</span>,<span class="hljs-string">"#666"</span>,<span class="hljs-string">"#eee"</span>,<span class="hljs-string">"#b9e3ee"</span>,<span class="hljs-string">"#ebe94b"</span>,<span class="hljs-string">"#46cafb"</span>,<span class="hljs-string">"#eca48f"</span>,<span class="hljs-string">"#decb3d"</span>,<span class="hljs-string">"#8d1894"</span>],
                <span class="hljs-attr">backgroundColors</span>: [<span class="hljs-string">"#222"</span>,<span class="hljs-string">"#ddd"</span>,<span class="hljs-string">"#999"</span>,<span class="hljs-string">"#379dc3"</span>,<span class="hljs-string">"#36be0d"</span>,<span class="hljs-string">"#001cc6"</span>,<span class="hljs-string">"#da4324"</span>,<span class="hljs-string">"#56125a"</span>,<span class="hljs-string">"#ffffff"</span>]
            }
        },
        <span class="hljs-attr">computed</span>: {
            <span class="hljs-attr">color</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.colors[<span class="hljs-keyword">this</span>.num];
            },
            <span class="hljs-attr">score</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.num&lt;<span class="hljs-number">0</span> &amp;&amp; (<span class="hljs-keyword">this</span>.num = <span class="hljs-keyword">this</span>.num0 || <span class="hljs-number">1</span>);
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.num&lt;<span class="hljs-number">9</span>&amp;&amp;<span class="hljs-keyword">this</span>.num&gt;<span class="hljs-number">0</span>?<span class="hljs-keyword">this</span>.num:<span class="hljs-number">0</span>
            },
            <span class="hljs-attr">backgroundColor0</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.backgroundColors[<span class="hljs-keyword">this</span>.num];
            }
        },
        <span class="hljs-attr">watch</span>: {
            <span class="hljs-attr">p</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
                <span class="hljs-comment">// 移动数字块</span>
                <span class="hljs-keyword">var</span> _x = <span class="hljs-number">125</span>*val.charAt(<span class="hljs-number">0</span>)+<span class="hljs-string">"px"</span>,
                    _y = <span class="hljs-number">125</span>*val.charAt(<span class="hljs-number">2</span>)+<span class="hljs-string">"px"</span>;
                <span class="hljs-comment">// 使用animation库实现过度动画</span>
                animation.transition(<span class="hljs-keyword">this</span>.$refs[<span class="hljs-string">'stone'</span>],{
                    <span class="hljs-attr">styles</span>: {
                        <span class="hljs-attr">transform</span>: <span class="hljs-string">'translate('</span>+_x +<span class="hljs-string">',-'</span>+_y+<span class="hljs-string">')'</span>
                    },
                    <span class="hljs-attr">duration</span>: <span class="hljs-number">200</span>,
                    <span class="hljs-attr">timingFunction</span>: <span class="hljs-string">'ease-in'</span>,
                    <span class="hljs-attr">delay</span>: <span class="hljs-number">0</span>
                });
            }
        },
        mounted(){
            <span class="hljs-keyword">this</span>.initState(<span class="hljs-keyword">this</span>.p0);
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-comment">/**
             * 移动数字块
             * */</span>
            move(_x, _y){ <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 更新数字块的分值，即显示数字
             * */</span>
            scoreChange(_num){ <span class="hljs-comment">/* ... */</span> },
            <span class="hljs-comment">/**
             * 初始化数字块的位置
             * */</span>
            initState(_p){ <span class="hljs-comment">/* ... */</span> }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>好了，辣么乐色的代码我都不好意思再唠叨了。换个话题，来讲讲这个小游戏从无到有中间的一些方案的变更吧。</p>
<h1 id="articleHeader10">各种尝试</h1>
<p>由于对 Weex 的过高期望，导致很多最初的方案都被「阉割」或者「整容」。</p>
<h2 id="articleHeader11">动画</h2>
<p>想让元素动起来，传统前端一般有两种方式</p>
<p>1、CSS 动画<br>2、JS 动画<br>在 Weex 上由多了一个 <br>3、animation 内建模块，可执行原生动画</p>
<p>由于 css3 的 transition 在 Weex 的 0.16.0+ 版本才能使用，官方提供的 demo 框架引用的 SDK 版本低于此版本，方案1，无效！</p>
<p>Weex 上的视觉是通过解析 VDom，在调用原生控件渲染成的，完全没有 DOM ，所以 JS 动画的方案，无效！</p>
<p>看了只剩下 Weex 的 animation 内建动画模块了。</p>
<p>虽然不太喜欢，用起来也很别扭，但是没办法，有总比没有强。知促常乐吧。</p>
<p>来看一下 animation 的使用姿势</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation.transition(this.$refs.test, {
        styles: {
            color: '#000',
            transform: 'translate(100px, 100px) sacle(1.3)',
            backgroundColor: '#CCC'
        },
            duration: 800, // ms
            timingFunction: 'ease',
            needLayout:false,
            delay: 0 // ms
        }, function () {
            // animation finished.
        })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">animation.transition(<span class="hljs-keyword">this</span>.$refs.test, {
        <span class="hljs-attr">styles</span>: {
            <span class="hljs-attr">color</span>: <span class="hljs-string">'#000'</span>,
            <span class="hljs-attr">transform</span>: <span class="hljs-string">'translate(100px, 100px) sacle(1.3)'</span>,
            <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#CCC'</span>
        },
            <span class="hljs-attr">duration</span>: <span class="hljs-number">800</span>, <span class="hljs-comment">// ms</span>
            timingFunction: <span class="hljs-string">'ease'</span>,
            <span class="hljs-attr">needLayout</span>:<span class="hljs-literal">false</span>,
            <span class="hljs-attr">delay</span>: <span class="hljs-number">0</span> <span class="hljs-comment">// ms</span>
        }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// animation finished.</span>
        })
</code></pre>
<p>想实现一个多态循环的动画，还要写一个方法，想想就难受</p>
<h2 id="articleHeader12">音乐</h2>
<p>没有声音还能算是游戏吗？！</p>
<p>嗯 ~ ~ ~ 好像可以算 </p>
<p>无所谓啦~ 开心最重要 ︿(￣︶￣)︿</p>
<p>尴尬的是 Weex 官方压根就没给咱们提供这样的 API，好在有三方的插件可用，<a href="http://natjs.com/#/" rel="nofollow noreferrer" target="_blank">Nat</a>， 刚好可以用上。</p>
<p>Weex 提倡使用网络资源，所有我把音频文件上传到了 CDN 上，为了能快一点。。</p>
<p>当然不可能一路顺风！</p>
<p>我们来看看 Nat Audio 模块的使用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Nat.audio.play('http://cdn.instapp.io/nat/samples/audio.mp3')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Nat.audio.play(<span class="hljs-string">'http://cdn.instapp.io/nat/samples/audio.mp3'</span>)</code></pre>
<p>然而 <strong>Nat.audio</strong> 只提供了 play() | pause() | stop() 三个 API。</p>
<p>为什么没有 replay() 重放？我想用的就是重放。这都不是事儿，使用 play() 硬着头皮上吧！</p>
<p>由于 <strong>Nat.audio</strong> 不支持 Web 端，每次修改都是真机调试，那个速度，唉~~~我终于理解原生小伙伴们的痛苦了。。 </p>
<p>这也不是事儿，最气愤的就是，Nat.audio.play() 每次播放相同的音频竟然不是走的缓存！难道缓存机制还要自己做？！？！ヽ(｀⌒´)ﾉ 我的天！</p>
<p>最后还是乖乖的用背地文件吧。还要写平台路径适配。。</p>
<p>没想到音频的槽点这么多！还要我没用 Weex 做网易云音乐。</p>
<h2 id="articleHeader13">手势指令</h2>
<p>前文也有讲过，小游戏用到了<code>@swipe</code>、<code>@click</code>、<code>@panstart</code>、<code>@panend</code>和<code>@horizontalpan</code>这么多事件监听。官方也有友情提醒「horizontalpan 手势在 Android 下会与 click 事件冲突」，但实际上 ios 平台上也会有冲突。</p>
<p>具体的我就不再描述了。此处只想说明，Weex 在手势指令上虽然可以满足游戏的基础指令要求，但细节上还是不太理想。</p>
<h1 id="articleHeader14">总结</h1>
<p>总的来讲，Weex 算是满足了我做小游戏的要求。如果想做大游戏，就不建议使用 Weex 了，Weex 确实做不了，但者也不是 Weex 诞生的意义。</p>
<p>好了，此次尝试就到这吧。为了不让思路断掉，我又通宵了，罪过，罪过 ~ ~ ~，希望此文对感兴趣的小伙伴有所帮助。</p>
<p>mark: 03:05</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Weex 开发小游戏是件很 high 的事儿

## 原文链接
[https://segmentfault.com/a/1190000011671135](https://segmentfault.com/a/1190000011671135)

