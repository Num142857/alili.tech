---
title: '撩妹技能 get，教你用 canvas 画一场流星雨' 
date: 2019-01-18 2:30:35
hidden: true
slug: 71zrg7od778
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">开始</h2>
<p>妹子都喜欢流星，如果她说不喜欢，那她一定是一个假妹子。</p>
<p>现在就一起来做一场流星雨，用程序员的野路子浪漫一下。</p>
<p>要画一场流星雨，首先，自然我们要会画一颗流星。</p>
<p>玩过 canvas 的同学，你画圆画方画线条这么 6，如果说叫你画下面这个玩意儿，你会不会觉得你用的是假 canvas？canvas 没有画一个带尾巴玩意儿的 api 啊。</p>
<p><span class="img-wrap"><img data-src="/img/bVKv7A?w=473&amp;h=327" src="https://static.alili.tech/img/bVKv7A?w=473&amp;h=327" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">画一颗流星</h2>
<p>是的，的却是没这个 api，但是不代表我们画不出来。流星就是一个小石头，然后因为速度过快产生大量的热量带动周围的空气发光发热，所以经飞过的地方看起来就像是流星的尾巴，我们先研究一下流星这个图像，整个流星处于他自己的运动轨迹之中，当前的位置最亮，轮廓最清晰，而之前划过的地方离当前位置轨迹距离越远就越暗淡越模糊。</p>
<p>上面的分析结果很关键， canvas 上是每一帧就重绘一次，每一帧之间的时间间隔很短。流星经过的地方会越来越模糊最后消失不见，那有没有可以让画布画的图像每过一帧就变模糊一点而不是全部清除的办法？如果可以这样，就可以把每一帧用线段画一小段流星的运动轨迹，最后画出流星的效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVKwH0?w=1651&amp;h=558" src="https://static.alili.tech/img/bVKwH0?w=1651&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>骗纸！你也许会说，这那里像流星了？？？<br>别急，让我多画几段给你看看。</p>
<p><span class="img-wrap"><img data-src="/img/bVKwH8?w=2005&amp;h=558" src="https://static.alili.tech/img/bVKwH8?w=2005&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>什么？ 还是不像？ 我们把它画小点，这下总该像了把？</p>
<p><span class="img-wrap"><img data-src="/img/bVKwIb?w=2005&amp;h=558" src="https://static.alili.tech/img/bVKwIb?w=2005&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上面几幅图我是在 ps 上模拟的，本质上 ps 也是在画布上绘画，我们马上在 canvas 上试试。</p>
<p>那，直接代码实现一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 坐标
class Crood {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    setCrood(x, y) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Crood(this.x, this.y);
    }
}

// 流星
class ShootingStar {
    constructor(init=new Crood, final=new Crood, size=3, speed=200, onDistory=null) {
        this.init = init; // 初始位置
        this.final = final; // 最终位置
        this.size = size; // 大小
        this.speed = speed; // 速度：像素/s

        // 飞行总时间
        this.dur = Math.sqrt(Math.pow(this.final.x-this.init.x, 2) + Math.pow(this.final.y-this.init.y, 2)) * 1000 / this.speed; 

        this.pass = 0; // 已过去的时间
        this.prev = this.init.copy(); // 上一帧位置
        this.now = this.init.copy(); // 当前位置
        this.onDistory = onDistory;
    }
    draw(ctx, delta) {
        this.pass += delta;
        this.pass = Math.min(this.pass, this.dur);

        let percent = this.pass / this.dur;

        this.now.setCrood(
            this.init.x + (this.final.x - this.init.x) * percent,
            this.init.y + (this.final.y - this.init.y) * percent
        );

        // canvas
        ctx.strokeStyle = '#fff';
        ctx.lineCap = 'round';
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.now.x, this.now.y);
        ctx.lineTo(this.prev.x, this.prev.y);
        ctx.stroke();

        this.prev.setCrood(this.now.x, this.now.y);
        if (this.pass === this.dur) {
            this.distory();
        }
    }
    distory() {
        this.onDistory &amp;&amp; this.onDistory();
    }
}


// effet
let cvs = document.querySelector('canvas');
let ctx = cvs.getContext('2d');

let T;
let shootingStar = new ShootingStar(
                        new Crood(100, 100), 
                        new Crood(400, 400),
                        3,
                        200,
                        ()=>{cancelAnimationFrame(T)}
                    );

let tick = (function() {
    let now = (new Date()).getTime();
    let last = now;
    let delta;
    return function() {
        delta = now - last;
        delta = delta > 500 ? 30 : (delta < 16? 16 : delta);
        last = now;
        // console.log(delta);

        T = requestAnimationFrame(tick);

        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; // 每一帧用 “半透明” 的背景色清除画布
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.restore();
        shootingStar.draw(ctx, delta);
    }
})();
tick();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 坐标</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Crood</span> </span>{
    <span class="hljs-keyword">constructor</span>(x=0, y=0) {
        <span class="hljs-keyword">this</span>.x = x;
        <span class="hljs-keyword">this</span>.y = y;
    }
    setCrood(x, y) {
        <span class="hljs-keyword">this</span>.x = x;
        <span class="hljs-keyword">this</span>.y = y;
    }
    copy() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Crood(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y);
    }
}

<span class="hljs-comment">// 流星</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ShootingStar</span> </span>{
    <span class="hljs-keyword">constructor</span>(init=new Crood, final=new Crood, size=3, speed=200, onDistory=null) {
        <span class="hljs-keyword">this</span>.init = init; <span class="hljs-comment">// 初始位置</span>
        <span class="hljs-keyword">this</span>.final = final; <span class="hljs-comment">// 最终位置</span>
        <span class="hljs-keyword">this</span>.size = size; <span class="hljs-comment">// 大小</span>
        <span class="hljs-keyword">this</span>.speed = speed; <span class="hljs-comment">// 速度：像素/s</span>

        <span class="hljs-comment">// 飞行总时间</span>
        <span class="hljs-keyword">this</span>.dur = <span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-built_in">Math</span>.pow(<span class="hljs-keyword">this</span>.final.x-<span class="hljs-keyword">this</span>.init.x, <span class="hljs-number">2</span>) + <span class="hljs-built_in">Math</span>.pow(<span class="hljs-keyword">this</span>.final.y-<span class="hljs-keyword">this</span>.init.y, <span class="hljs-number">2</span>)) * <span class="hljs-number">1000</span> / <span class="hljs-keyword">this</span>.speed; 

        <span class="hljs-keyword">this</span>.pass = <span class="hljs-number">0</span>; <span class="hljs-comment">// 已过去的时间</span>
        <span class="hljs-keyword">this</span>.prev = <span class="hljs-keyword">this</span>.init.copy(); <span class="hljs-comment">// 上一帧位置</span>
        <span class="hljs-keyword">this</span>.now = <span class="hljs-keyword">this</span>.init.copy(); <span class="hljs-comment">// 当前位置</span>
        <span class="hljs-keyword">this</span>.onDistory = onDistory;
    }
    draw(ctx, delta) {
        <span class="hljs-keyword">this</span>.pass += delta;
        <span class="hljs-keyword">this</span>.pass = <span class="hljs-built_in">Math</span>.min(<span class="hljs-keyword">this</span>.pass, <span class="hljs-keyword">this</span>.dur);

        <span class="hljs-keyword">let</span> percent = <span class="hljs-keyword">this</span>.pass / <span class="hljs-keyword">this</span>.dur;

        <span class="hljs-keyword">this</span>.now.setCrood(
            <span class="hljs-keyword">this</span>.init.x + (<span class="hljs-keyword">this</span>.final.x - <span class="hljs-keyword">this</span>.init.x) * percent,
            <span class="hljs-keyword">this</span>.init.y + (<span class="hljs-keyword">this</span>.final.y - <span class="hljs-keyword">this</span>.init.y) * percent
        );

        <span class="hljs-comment">// canvas</span>
        ctx.strokeStyle = <span class="hljs-string">'#fff'</span>;
        ctx.lineCap = <span class="hljs-string">'round'</span>;
        ctx.lineWidth = <span class="hljs-keyword">this</span>.size;
        ctx.beginPath();
        ctx.moveTo(<span class="hljs-keyword">this</span>.now.x, <span class="hljs-keyword">this</span>.now.y);
        ctx.lineTo(<span class="hljs-keyword">this</span>.prev.x, <span class="hljs-keyword">this</span>.prev.y);
        ctx.stroke();

        <span class="hljs-keyword">this</span>.prev.setCrood(<span class="hljs-keyword">this</span>.now.x, <span class="hljs-keyword">this</span>.now.y);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pass === <span class="hljs-keyword">this</span>.dur) {
            <span class="hljs-keyword">this</span>.distory();
        }
    }
    distory() {
        <span class="hljs-keyword">this</span>.onDistory &amp;&amp; <span class="hljs-keyword">this</span>.onDistory();
    }
}


<span class="hljs-comment">// effet</span>
<span class="hljs-keyword">let</span> cvs = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'canvas'</span>);
<span class="hljs-keyword">let</span> ctx = cvs.getContext(<span class="hljs-string">'2d'</span>);

<span class="hljs-keyword">let</span> T;
<span class="hljs-keyword">let</span> shootingStar = <span class="hljs-keyword">new</span> ShootingStar(
                        <span class="hljs-keyword">new</span> Crood(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>), 
                        <span class="hljs-keyword">new</span> Crood(<span class="hljs-number">400</span>, <span class="hljs-number">400</span>),
                        <span class="hljs-number">3</span>,
                        <span class="hljs-number">200</span>,
                        ()=&gt;{cancelAnimationFrame(T)}
                    );

<span class="hljs-keyword">let</span> tick = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> now = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime();
    <span class="hljs-keyword">let</span> last = now;
    <span class="hljs-keyword">let</span> delta;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        delta = now - last;
        delta = delta &gt; <span class="hljs-number">500</span> ? <span class="hljs-number">30</span> : (delta &lt; <span class="hljs-number">16</span>? <span class="hljs-number">16</span> : delta);
        last = now;
        <span class="hljs-comment">// console.log(delta);</span>

        T = requestAnimationFrame(tick);

        ctx.save();
        ctx.fillStyle = <span class="hljs-string">'rgba(0,0,0,0.2)'</span>; <span class="hljs-comment">// 每一帧用 “半透明” 的背景色清除画布</span>
        ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, cvs.width, cvs.height);
        ctx.restore();
        shootingStar.draw(ctx, delta);
    }
})();
tick();</code></pre>
<h4>效果：一颗流星</h4>
<p><span class="img-wrap"><img data-src="/img/bVKv7A?w=473&amp;h=327" src="https://static.alili.tech/img/bVKv7A?w=473&amp;h=327" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>sogoyi 快看，一颗活泼不做作的流星!!! 是不是感觉动起来更加逼真一点？</p>
<h2 id="articleHeader2">流星雨</h2>
<p>我们再加一个流星雨 MeteorShower 类，生成多一些随机位置的流星，做出流星雨。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 坐标
class Crood {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    setCrood(x, y) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Crood(this.x, this.y);
    }
}

// 流星
class ShootingStar {
    constructor(init=new Crood, final=new Crood, size=3, speed=200, onDistory=null) {
        this.init = init; // 初始位置
        this.final = final; // 最终位置
        this.size = size; // 大小
        this.speed = speed; // 速度：像素/s

        // 飞行总时间
        this.dur = Math.sqrt(Math.pow(this.final.x-this.init.x, 2) + Math.pow(this.final.y-this.init.y, 2)) * 1000 / this.speed; 

        this.pass = 0; // 已过去的时间
        this.prev = this.init.copy(); // 上一帧位置
        this.now = this.init.copy(); // 当前位置
        this.onDistory = onDistory;
    }
    draw(ctx, delta) {
        this.pass += delta;
        this.pass = Math.min(this.pass, this.dur);

        let percent = this.pass / this.dur;

        this.now.setCrood(
            this.init.x + (this.final.x - this.init.x) * percent,
            this.init.y + (this.final.y - this.init.y) * percent
        );

        // canvas
        ctx.strokeStyle = '#fff';
        ctx.lineCap = 'round';
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.now.x, this.now.y);
        ctx.lineTo(this.prev.x, this.prev.y);
        ctx.stroke();

        this.prev.setCrood(this.now.x, this.now.y);
        if (this.pass === this.dur) {
            this.distory();
        }
    }
    distory() {
        this.onDistory &amp;&amp; this.onDistory();
    }
}

class MeteorShower {
    constructor(cvs, ctx) {
        this.cvs = cvs;
        this.ctx = ctx;
        this.stars = [];
        this.T;
        this.stop = false;
        this.playing = false;
    }

    createStar() {
        let angle = Math.PI / 3;
        let distance = Math.random() * 400;
        let init = new Crood(Math.random() * this.cvs.width|0, Math.random() * 100|0);
        let final = new Crood(init.x + distance * Math.cos(angle), init.y + distance * Math.sin(angle));
        let size = Math.random() * 2;
        let speed = Math.random() * 400 + 100;
        let star = new ShootingStar(
                        init, final, size, speed, 
                        ()=>{this.remove(star)}
                    );
        return star;
    }

    remove(star) {
        this.stars = this.stars.filter((s)=>{ return s !== star});
    }

    update(delta) {
        if (!this.stop &amp;&amp; this.stars.length < 20) {
            this.stars.push(this.createStar());
        }
        this.stars.forEach((star)=>{
            star.draw(this.ctx, delta);
        });
    }

    tick() {
        if (this.playing) return;
        this.playing = true;

        let now = (new Date()).getTime();
        let last = now;
        let delta;

        let  _tick = ()=>{
            if (this.stop &amp;&amp; this.stars.length === 0) {
                cancelAnimationFrame(this.T);
                this.playing = false;
                return;
            }

            delta = now - last;
            delta = delta > 500 ? 30 : (delta < 16? 16 : delta);
            last = now;
            // console.log(delta);

            this.T = requestAnimationFrame(_tick);

            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.2)'; // 每一帧用 “半透明” 的背景色清除画布
            ctx.fillRect(0, 0, cvs.width, cvs.height);
            ctx.restore();
            this.update(delta);
        }
        _tick();
    }

    start() {
        this.stop = false;
        this.tick();
    }

    stop() {
        this.stop = true;
    }  
}

// effet
let cvs = document.querySelector('canvas');
let ctx = cvs.getContext('2d');

let meteorShower = new MeteorShower(cvs, ctx);
meteorShower.start();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 坐标</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Crood</span> </span>{
    <span class="hljs-keyword">constructor</span>(x=0, y=0) {
        <span class="hljs-keyword">this</span>.x = x;
        <span class="hljs-keyword">this</span>.y = y;
    }
    setCrood(x, y) {
        <span class="hljs-keyword">this</span>.x = x;
        <span class="hljs-keyword">this</span>.y = y;
    }
    copy() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Crood(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y);
    }
}

<span class="hljs-comment">// 流星</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ShootingStar</span> </span>{
    <span class="hljs-keyword">constructor</span>(init=new Crood, final=new Crood, size=3, speed=200, onDistory=null) {
        <span class="hljs-keyword">this</span>.init = init; <span class="hljs-comment">// 初始位置</span>
        <span class="hljs-keyword">this</span>.final = final; <span class="hljs-comment">// 最终位置</span>
        <span class="hljs-keyword">this</span>.size = size; <span class="hljs-comment">// 大小</span>
        <span class="hljs-keyword">this</span>.speed = speed; <span class="hljs-comment">// 速度：像素/s</span>

        <span class="hljs-comment">// 飞行总时间</span>
        <span class="hljs-keyword">this</span>.dur = <span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-built_in">Math</span>.pow(<span class="hljs-keyword">this</span>.final.x-<span class="hljs-keyword">this</span>.init.x, <span class="hljs-number">2</span>) + <span class="hljs-built_in">Math</span>.pow(<span class="hljs-keyword">this</span>.final.y-<span class="hljs-keyword">this</span>.init.y, <span class="hljs-number">2</span>)) * <span class="hljs-number">1000</span> / <span class="hljs-keyword">this</span>.speed; 

        <span class="hljs-keyword">this</span>.pass = <span class="hljs-number">0</span>; <span class="hljs-comment">// 已过去的时间</span>
        <span class="hljs-keyword">this</span>.prev = <span class="hljs-keyword">this</span>.init.copy(); <span class="hljs-comment">// 上一帧位置</span>
        <span class="hljs-keyword">this</span>.now = <span class="hljs-keyword">this</span>.init.copy(); <span class="hljs-comment">// 当前位置</span>
        <span class="hljs-keyword">this</span>.onDistory = onDistory;
    }
    draw(ctx, delta) {
        <span class="hljs-keyword">this</span>.pass += delta;
        <span class="hljs-keyword">this</span>.pass = <span class="hljs-built_in">Math</span>.min(<span class="hljs-keyword">this</span>.pass, <span class="hljs-keyword">this</span>.dur);

        <span class="hljs-keyword">let</span> percent = <span class="hljs-keyword">this</span>.pass / <span class="hljs-keyword">this</span>.dur;

        <span class="hljs-keyword">this</span>.now.setCrood(
            <span class="hljs-keyword">this</span>.init.x + (<span class="hljs-keyword">this</span>.final.x - <span class="hljs-keyword">this</span>.init.x) * percent,
            <span class="hljs-keyword">this</span>.init.y + (<span class="hljs-keyword">this</span>.final.y - <span class="hljs-keyword">this</span>.init.y) * percent
        );

        <span class="hljs-comment">// canvas</span>
        ctx.strokeStyle = <span class="hljs-string">'#fff'</span>;
        ctx.lineCap = <span class="hljs-string">'round'</span>;
        ctx.lineWidth = <span class="hljs-keyword">this</span>.size;
        ctx.beginPath();
        ctx.moveTo(<span class="hljs-keyword">this</span>.now.x, <span class="hljs-keyword">this</span>.now.y);
        ctx.lineTo(<span class="hljs-keyword">this</span>.prev.x, <span class="hljs-keyword">this</span>.prev.y);
        ctx.stroke();

        <span class="hljs-keyword">this</span>.prev.setCrood(<span class="hljs-keyword">this</span>.now.x, <span class="hljs-keyword">this</span>.now.y);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pass === <span class="hljs-keyword">this</span>.dur) {
            <span class="hljs-keyword">this</span>.distory();
        }
    }
    distory() {
        <span class="hljs-keyword">this</span>.onDistory &amp;&amp; <span class="hljs-keyword">this</span>.onDistory();
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MeteorShower</span> </span>{
    <span class="hljs-keyword">constructor</span>(cvs, ctx) {
        <span class="hljs-keyword">this</span>.cvs = cvs;
        <span class="hljs-keyword">this</span>.ctx = ctx;
        <span class="hljs-keyword">this</span>.stars = [];
        <span class="hljs-keyword">this</span>.T;
        <span class="hljs-keyword">this</span>.stop = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.playing = <span class="hljs-literal">false</span>;
    }

    createStar() {
        <span class="hljs-keyword">let</span> angle = <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">3</span>;
        <span class="hljs-keyword">let</span> distance = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">400</span>;
        <span class="hljs-keyword">let</span> init = <span class="hljs-keyword">new</span> Crood(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-keyword">this</span>.cvs.width|<span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">100</span>|<span class="hljs-number">0</span>);
        <span class="hljs-keyword">let</span> final = <span class="hljs-keyword">new</span> Crood(init.x + distance * <span class="hljs-built_in">Math</span>.cos(angle), init.y + distance * <span class="hljs-built_in">Math</span>.sin(angle));
        <span class="hljs-keyword">let</span> size = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2</span>;
        <span class="hljs-keyword">let</span> speed = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">400</span> + <span class="hljs-number">100</span>;
        <span class="hljs-keyword">let</span> star = <span class="hljs-keyword">new</span> ShootingStar(
                        init, final, size, speed, 
                        ()=&gt;{<span class="hljs-keyword">this</span>.remove(star)}
                    );
        <span class="hljs-keyword">return</span> star;
    }

    remove(star) {
        <span class="hljs-keyword">this</span>.stars = <span class="hljs-keyword">this</span>.stars.filter(<span class="hljs-function">(<span class="hljs-params">s</span>)=&gt;</span>{ <span class="hljs-keyword">return</span> s !== star});
    }

    update(delta) {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.stop &amp;&amp; <span class="hljs-keyword">this</span>.stars.length &lt; <span class="hljs-number">20</span>) {
            <span class="hljs-keyword">this</span>.stars.push(<span class="hljs-keyword">this</span>.createStar());
        }
        <span class="hljs-keyword">this</span>.stars.forEach(<span class="hljs-function">(<span class="hljs-params">star</span>)=&gt;</span>{
            star.draw(<span class="hljs-keyword">this</span>.ctx, delta);
        });
    }

    tick() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.playing) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">this</span>.playing = <span class="hljs-literal">true</span>;

        <span class="hljs-keyword">let</span> now = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime();
        <span class="hljs-keyword">let</span> last = now;
        <span class="hljs-keyword">let</span> delta;

        <span class="hljs-keyword">let</span>  _tick = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.stop &amp;&amp; <span class="hljs-keyword">this</span>.stars.length === <span class="hljs-number">0</span>) {
                cancelAnimationFrame(<span class="hljs-keyword">this</span>.T);
                <span class="hljs-keyword">this</span>.playing = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">return</span>;
            }

            delta = now - last;
            delta = delta &gt; <span class="hljs-number">500</span> ? <span class="hljs-number">30</span> : (delta &lt; <span class="hljs-number">16</span>? <span class="hljs-number">16</span> : delta);
            last = now;
            <span class="hljs-comment">// console.log(delta);</span>

            <span class="hljs-keyword">this</span>.T = requestAnimationFrame(_tick);

            ctx.save();
            ctx.fillStyle = <span class="hljs-string">'rgba(0,0,0,0.2)'</span>; <span class="hljs-comment">// 每一帧用 “半透明” 的背景色清除画布</span>
            ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, cvs.width, cvs.height);
            ctx.restore();
            <span class="hljs-keyword">this</span>.update(delta);
        }
        _tick();
    }

    start() {
        <span class="hljs-keyword">this</span>.stop = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.tick();
    }

    stop() {
        <span class="hljs-keyword">this</span>.stop = <span class="hljs-literal">true</span>;
    }  
}

<span class="hljs-comment">// effet</span>
<span class="hljs-keyword">let</span> cvs = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'canvas'</span>);
<span class="hljs-keyword">let</span> ctx = cvs.getContext(<span class="hljs-string">'2d'</span>);

<span class="hljs-keyword">let</span> meteorShower = <span class="hljs-keyword">new</span> MeteorShower(cvs, ctx);
meteorShower.start();</code></pre>
<h4>效果：流星雨</h4>
<p><span class="img-wrap"><img data-src="/img/bVKv7C?w=634&amp;h=346" src="https://static.alili.tech/img/bVKv7C?w=634&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">透明背景</h2>
<p>先不急着激动，这个流星雨有点单调，可以看到上面的代码中，每一帧，我们用了透明度为 0.2 的黑色刷了一遍画布，背景漆黑一片，如果说我们的需求是透明背景呢？ </p>
<p>比如，我们要用这个夜景图片做背景，然后在上面加上我们的流星，我们每一帧刷一层背景的小伎俩就用不了啦。因为我们要保证除开流星之外的部分，应该是透明的。</p>
<p><span class="img-wrap"><img data-src="/img/bVKv7L?w=860&amp;h=554" src="https://static.alili.tech/img/bVKv7L?w=860&amp;h=554" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里就要用到一个冷门的属性了，globalCompositeOperation，全局组合操作？ 原谅我放荡不羁的翻译。<br>这个属性其实就是用来定义后绘制的图形与先绘制的图形之间的组合显示效果的。<br>他可以设置这些值</p>
<p><span class="img-wrap"><img data-src="/img/bVKv7N?w=716&amp;h=342" src="https://static.alili.tech/img/bVKv7N?w=716&amp;h=342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这些属性说明没必要仔细看，更不用记下来，直接看 <a href="http://www.w3school.com.cn/tiy/t.asp?f=html5_canvas_globalcompop_all" rel="nofollow noreferrer" target="_blank">api 示例</a> 运行效果就很清楚了。示例里，先绘制的是填充正方形，后绘制的是填充圆形。</p>
<p><span class="img-wrap"><img data-src="/img/bVKv7S?w=933&amp;h=287" src="https://static.alili.tech/img/bVKv7S?w=933&amp;h=287" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>是不是豁然开朗，一目了然？</p>
<p>对于我们来说，原图像是每一帧画完的所有流星，目标图像是画完流星之后半透明覆盖画布的黑色矩形。而我们每一帧要保留的就是，上一帧 0.8 透明度的流星，覆盖画布黑色矩形我们不能显示。</p>
<p>注意这里的 destination-out 和 destination-in，示例中这两个属性最终都只有部分源图像保留了下来，符合我们只要保留流星的需求。我觉得 w3cschool 上描述的不是很正确，我用我自己的理解概括一下。</p>
<ul>
<li><p>destination-in ：只保留了源图像（矩形）和目标图像（圆）交集区域的源图像</p></li>
<li><p>destination-out：只保留了源图像（矩形）减去目标图像（圆）之后区域的源图像</p></li>
</ul>
<p>上述示例目标图像的透明度是 1，源图像被减去的部分是完全不见了。而我们想要的是他可以按照目标透明度进行部分擦除。改一下示例里的代码看看是否支持半透明的计算。</p>
<p><span class="img-wrap"><img data-src="/img/bVKv7W?w=940&amp;h=306" src="https://static.alili.tech/img/bVKv7W?w=940&amp;h=306" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>看来这个属性支持半透明的计算。源图像和目标图像交叠的部分以半透明的形式保留了下来。也就是说如果我们要保留 0.8 透明度的流星，可以这样设置 globalCompositeOperation</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.fillStyle = 'rgba(0,0,0,0.8)'
globalCompositeOperation = 'destination-in';
ctx.fillRect(0, 0, cvs.width, cvs.height);


// 或者
ctx.fillStyle = 'rgba(0,0,0,0.2)'
globalCompositeOperation = 'destination-out';
ctx.fillRect(0, 0, cvs.width, cvs.height);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ctx.fillStyle = <span class="hljs-string">'rgba(0,0,0,0.8)'</span>
globalCompositeOperation = <span class="hljs-string">'destination-in'</span>;
ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, cvs.width, cvs.height);


<span class="hljs-comment">// 或者</span>
ctx.fillStyle = <span class="hljs-string">'rgba(0,0,0,0.2)'</span>
globalCompositeOperation = <span class="hljs-string">'destination-out'</span>;
ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, cvs.width, cvs.height);</code></pre>
<h2 id="articleHeader4">最终效果</h2>
<p>加上 globalCompositeOperation 之后的效果既最终效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVKwjt?w=562&amp;h=371" src="https://static.alili.tech/img/bVKwjt?w=562&amp;h=371" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/gnauhca/dailyeffecttest/tree/master/b-meteorshower" rel="nofollow noreferrer" target="_blank">github: https://github.com/gnauhca/dailyeffecttest/tree/master/b-meteorshower</a></p>
<p>快约上你的妹子看流星雨吧。</p>
<p>...</p>
<p>什么？ 你没有妹子？</p>
<p><span class="img-wrap"><img data-src="/img/bVKv72?w=658&amp;h=438" src="https://static.alili.tech/img/bVKv72?w=658&amp;h=438" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
撩妹技能 get，教你用 canvas 画一场流星雨

## 原文链接
[https://segmentfault.com/a/1190000008664249](https://segmentfault.com/a/1190000008664249)

