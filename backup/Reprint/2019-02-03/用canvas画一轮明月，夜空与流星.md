---
title: '用canvas画一轮明月，夜空与流星' 
date: 2019-02-03 2:30:40
hidden: true
slug: 2ph6gk6nd69
categories: [reprint]
---

{{< raw >}}

                    
<p>今天是中秋节，于是突发奇想，欸不如用canvas来画一画月亮吧。</p>
<p>于是一副用canvas画出的星空就这样诞生了。</p>
<h3 id="articleHeader0"><a href="http://ycwalker.com/canvas-moon/" rel="nofollow noreferrer" target="_blank">Demo</a></h3>
<p>在这里我用了ES6语法，星星，月亮和流星都单独写成了一个module。</p>
<p>于是我把js一共分成这四个文件：main.js, Moon.js, Stars.js和Meteor.js，后面三个各自export出一个类。</p>
<h3 id="articleHeader1"><a href="https://github.com/ycwalker/canvas-moon" rel="nofollow noreferrer" target="_blank">源码</a></h3>
<p>为了方便，用了gulp做自动化的工具。</p>
<h4>main.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Stars    from './Stars'
import Moon     from './Moon'
import Meteor   from './Meteor'

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
    moon = new Moon(ctx, width, height),
    stars = new Stars(ctx, width, height, 200),
    meteors = [],
    count = 0

canvas.width = width
canvas.height = height

//流星生成函数
const meteorGenerator = ()=> {
    //x位置偏移，以免经过月亮
    let x = Math.random() * width + 800
    meteors.push(new Meteor(ctx, x, height))

    //每隔随机时间，生成新流星
    setTimeout(()=> {
        meteorGenerator()
    }, Math.random() * 2000)
}

//每一帧动画生成函数
const frame = ()=> {
    //每隔10帧星星闪烁一次，节省计算资源
    count++
    count % 10 == 0 &amp;&amp; stars.blink()

    moon.draw()
    stars.draw()

    meteors.forEach((meteor, index, arr)=> {
        //如果流星离开视野之内，销毁流星实例，回收内存
        if (meteor.flow()) {
            meteor.draw()
        } else {
            arr.splice(index, 1)
        }
    })
    requestAnimationFrame(frame)
}

meteorGenerator()
frame()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Stars    <span class="hljs-keyword">from</span> <span class="hljs-string">'./Stars'</span>
<span class="hljs-keyword">import</span> Moon     <span class="hljs-keyword">from</span> <span class="hljs-string">'./Moon'</span>
<span class="hljs-keyword">import</span> Meteor   <span class="hljs-keyword">from</span> <span class="hljs-string">'./Meteor'</span>

<span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>),
    ctx = canvas.getContext(<span class="hljs-string">'2d'</span>),
    width = <span class="hljs-built_in">window</span>.innerWidth,
    height = <span class="hljs-built_in">window</span>.innerHeight,
    <span class="hljs-comment">//实例化月亮和星星。流星是随机时间生成，所以只初始化数组</span>
    moon = <span class="hljs-keyword">new</span> Moon(ctx, width, height),
    stars = <span class="hljs-keyword">new</span> Stars(ctx, width, height, <span class="hljs-number">200</span>),
    meteors = [],
    count = <span class="hljs-number">0</span>

canvas.width = width
canvas.height = height

<span class="hljs-comment">//流星生成函数</span>
<span class="hljs-keyword">const</span> meteorGenerator = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
    <span class="hljs-comment">//x位置偏移，以免经过月亮</span>
    <span class="hljs-keyword">let</span> x = <span class="hljs-built_in">Math</span>.random() * width + <span class="hljs-number">800</span>
    meteors.push(<span class="hljs-keyword">new</span> Meteor(ctx, x, height))

    <span class="hljs-comment">//每隔随机时间，生成新流星</span>
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
        meteorGenerator()
    }, <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2000</span>)
}

<span class="hljs-comment">//每一帧动画生成函数</span>
<span class="hljs-keyword">const</span> frame = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
    <span class="hljs-comment">//每隔10帧星星闪烁一次，节省计算资源</span>
    count++
    count % <span class="hljs-number">10</span> == <span class="hljs-number">0</span> &amp;&amp; stars.blink()

    moon.draw()
    stars.draw()

    meteors.forEach(<span class="hljs-function">(<span class="hljs-params">meteor, index, arr</span>)=&gt;</span> {
        <span class="hljs-comment">//如果流星离开视野之内，销毁流星实例，回收内存</span>
        <span class="hljs-keyword">if</span> (meteor.flow()) {
            meteor.draw()
        } <span class="hljs-keyword">else</span> {
            arr.splice(index, <span class="hljs-number">1</span>)
        }
    })
    requestAnimationFrame(frame)
}

meteorGenerator()
frame()</code></pre>
<p>开头分别引入了另外三个module，分别是星星，月亮和流星。</p>
<p>接着初始化了月亮和星星，但由于流星是不定时随机生成的，所以初始化一个数组用来保存接下来生成的流星。</p>
<p>在每一帧中，分别调用moon，star和meteor的draw函数，用来画出每一帧，特别的，因为星星需要闪烁，流星需要移动，所以在draw之前对半径和坐标进行处理。如果流星跑出了canvas外，就从数组中清除相应的流星，从而解除引用和回收内存。</p>
<h4>Moon.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Moon {
    constructor(ctx, width, height) {
        this.ctx = ctx
        this.width = width
        this.height = height
    }

    draw() {
        let ctx = this.ctx,
            gradient = ctx.createRadialGradient(
            200, 200, 80, 200, 200, 800)
        //径向渐变
        gradient.addColorStop(0, 'rgb(255,255,255)')
        gradient.addColorStop(0.01, 'rgb(70,70,80)')
        gradient.addColorStop(0.2, 'rgb(40,40,50)')
        gradient.addColorStop(0.4, 'rgb(20,20,30)')
        gradient.addColorStop(1, 'rgb(0,0,10)')
        ctx.save()
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, this.width, this.height)
        ctx.restore()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Moon</span> </span>{
    <span class="hljs-keyword">constructor</span>(ctx, width, height) {
        <span class="hljs-keyword">this</span>.ctx = ctx
        <span class="hljs-keyword">this</span>.width = width
        <span class="hljs-keyword">this</span>.height = height
    }

    draw() {
        <span class="hljs-keyword">let</span> ctx = <span class="hljs-keyword">this</span>.ctx,
            gradient = ctx.createRadialGradient(
            <span class="hljs-number">200</span>, <span class="hljs-number">200</span>, <span class="hljs-number">80</span>, <span class="hljs-number">200</span>, <span class="hljs-number">200</span>, <span class="hljs-number">800</span>)
        <span class="hljs-comment">//径向渐变</span>
        gradient.addColorStop(<span class="hljs-number">0</span>, <span class="hljs-string">'rgb(255,255,255)'</span>)
        gradient.addColorStop(<span class="hljs-number">0.01</span>, <span class="hljs-string">'rgb(70,70,80)'</span>)
        gradient.addColorStop(<span class="hljs-number">0.2</span>, <span class="hljs-string">'rgb(40,40,50)'</span>)
        gradient.addColorStop(<span class="hljs-number">0.4</span>, <span class="hljs-string">'rgb(20,20,30)'</span>)
        gradient.addColorStop(<span class="hljs-number">1</span>, <span class="hljs-string">'rgb(0,0,10)'</span>)
        ctx.save()
        ctx.fillStyle = gradient
        ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.width, <span class="hljs-keyword">this</span>.height)
        ctx.restore()
    }
}</code></pre>
<p>这是月亮的类，主要用到了canvas里的径向渐变效果。为了达到和谐的程度，我试了好久T_T...</p>
<h4>Stars.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Stars {
    constructor(ctx, width, height, amount) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.stars = this.getStars(amount)
    }

    getStars(amount) {
        let stars = []
        while (amount--) {
            stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: Math.random() + 0.2
            })
        }
        return stars
    }

    draw() {
        let ctx = this.ctx
        ctx.save()
        ctx.fillStyle = 'white'
        this.stars.forEach(star=> {
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
            ctx.fill()
        })
        ctx.restore()
    }

    //闪烁，星星半径每隔10帧随机变大或变小
    blink() {
        this.stars = this.stars.map(star=> {
            let sign = Math.random() > 0.5 ? 1 : -1
            star.r += sign * 0.2
            if (star.r < 0) {
                star.r = -star.r
            } else if (star.r > 1) {
                star.r -= 0.2
            }
            return star
        })

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Stars</span> </span>{
    <span class="hljs-keyword">constructor</span>(ctx, width, height, amount) {
        <span class="hljs-keyword">this</span>.ctx = ctx
        <span class="hljs-keyword">this</span>.width = width
        <span class="hljs-keyword">this</span>.height = height
        <span class="hljs-keyword">this</span>.stars = <span class="hljs-keyword">this</span>.getStars(amount)
    }

    getStars(amount) {
        <span class="hljs-keyword">let</span> stars = []
        <span class="hljs-keyword">while</span> (amount--) {
            stars.push({
                <span class="hljs-attr">x</span>: <span class="hljs-built_in">Math</span>.random() * <span class="hljs-keyword">this</span>.width,
                <span class="hljs-attr">y</span>: <span class="hljs-built_in">Math</span>.random() * <span class="hljs-keyword">this</span>.height,
                <span class="hljs-attr">r</span>: <span class="hljs-built_in">Math</span>.random() + <span class="hljs-number">0.2</span>
            })
        }
        <span class="hljs-keyword">return</span> stars
    }

    draw() {
        <span class="hljs-keyword">let</span> ctx = <span class="hljs-keyword">this</span>.ctx
        ctx.save()
        ctx.fillStyle = <span class="hljs-string">'white'</span>
        <span class="hljs-keyword">this</span>.stars.forEach(<span class="hljs-function"><span class="hljs-params">star</span>=&gt;</span> {
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.r, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI)
            ctx.fill()
        })
        ctx.restore()
    }

    <span class="hljs-comment">//闪烁，星星半径每隔10帧随机变大或变小</span>
    blink() {
        <span class="hljs-keyword">this</span>.stars = <span class="hljs-keyword">this</span>.stars.map(<span class="hljs-function"><span class="hljs-params">star</span>=&gt;</span> {
            <span class="hljs-keyword">let</span> sign = <span class="hljs-built_in">Math</span>.random() &gt; <span class="hljs-number">0.5</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">-1</span>
            star.r += sign * <span class="hljs-number">0.2</span>
            <span class="hljs-keyword">if</span> (star.r &lt; <span class="hljs-number">0</span>) {
                star.r = -star.r
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (star.r &gt; <span class="hljs-number">1</span>) {
                star.r -= <span class="hljs-number">0.2</span>
            }
            <span class="hljs-keyword">return</span> star
        })

    }
}</code></pre>
<p>星星的集合。因为不至于给每一个星星都写成单独的对象，于是就写了一个星星的集合类，所有的星星都保存在实例的stars中。其中的blink函数用来随机改变每一个星星的半径大小，从而产生闪烁的效果。</p>
<h4>Meteor.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Meteor {
    constructor(ctx, x, h) {
        this.ctx = ctx
        this.x = x
        this.y = 0
        this.h = h
        this.vx = -(4 + Math.random() * 4)
        this.vy = -this.vx
        this.len = Math.random() * 300 + 500
    }

    flow() {
        //判定流星出界
        if (this.x < -this.len || this.y > this.h + this.len) {
            return false
        }
        this.x += this.vx
        this.y += this.vy
        return true
    }

    draw() {
        let ctx = this.ctx,
            //径向渐变，从流星头尾圆心，半径越大，透明度越高
            gra = ctx.createRadialGradient(
                this.x, this.y, 0, this.x, this.y, this.len)

        const PI = Math.PI
        gra.addColorStop(0, 'rgba(255,255,255,1)')
        gra.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.save()
        ctx.fillStyle = gra
        ctx.beginPath()
        //流星头，二分之一圆
        ctx.arc(this.x, this.y, 1, PI / 4, 5 * PI / 4)
        //绘制流星尾，三角形
        ctx.lineTo(this.x + this.len, this.y - this.len)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Meteor</span> </span>{
    <span class="hljs-keyword">constructor</span>(ctx, x, h) {
        <span class="hljs-keyword">this</span>.ctx = ctx
        <span class="hljs-keyword">this</span>.x = x
        <span class="hljs-keyword">this</span>.y = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.h = h
        <span class="hljs-keyword">this</span>.vx = -(<span class="hljs-number">4</span> + <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">4</span>)
        <span class="hljs-keyword">this</span>.vy = -<span class="hljs-keyword">this</span>.vx
        <span class="hljs-keyword">this</span>.len = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">300</span> + <span class="hljs-number">500</span>
    }

    flow() {
        <span class="hljs-comment">//判定流星出界</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.x &lt; -<span class="hljs-keyword">this</span>.len || <span class="hljs-keyword">this</span>.y &gt; <span class="hljs-keyword">this</span>.h + <span class="hljs-keyword">this</span>.len) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        }
        <span class="hljs-keyword">this</span>.x += <span class="hljs-keyword">this</span>.vx
        <span class="hljs-keyword">this</span>.y += <span class="hljs-keyword">this</span>.vy
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    }

    draw() {
        <span class="hljs-keyword">let</span> ctx = <span class="hljs-keyword">this</span>.ctx,
            <span class="hljs-comment">//径向渐变，从流星头尾圆心，半径越大，透明度越高</span>
            gra = ctx.createRadialGradient(
                <span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y, <span class="hljs-keyword">this</span>.len)

        <span class="hljs-keyword">const</span> PI = <span class="hljs-built_in">Math</span>.PI
        gra.addColorStop(<span class="hljs-number">0</span>, <span class="hljs-string">'rgba(255,255,255,1)'</span>)
        gra.addColorStop(<span class="hljs-number">1</span>, <span class="hljs-string">'rgba(0,0,0,0)'</span>)
        ctx.save()
        ctx.fillStyle = gra
        ctx.beginPath()
        <span class="hljs-comment">//流星头，二分之一圆</span>
        ctx.arc(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y, <span class="hljs-number">1</span>, PI / <span class="hljs-number">4</span>, <span class="hljs-number">5</span> * PI / <span class="hljs-number">4</span>)
        <span class="hljs-comment">//绘制流星尾，三角形</span>
        ctx.lineTo(<span class="hljs-keyword">this</span>.x + <span class="hljs-keyword">this</span>.len, <span class="hljs-keyword">this</span>.y - <span class="hljs-keyword">this</span>.len)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}</code></pre>
<p>流星就比较有意思啦。猜猜每一个流星是怎么画的？</p>
<p>实际上每一个流星的轮廓由一个半圆和一个三角形组成，类似于一个不倒翁。然后整体倾角45度，并且填充时用上一个径向渐变，就可以相当完美的达到流行尾巴那样渐行渐远渐模糊的样子。</p>
<p>对，就是这么干净利落~</p>
<p>最后看了一下CPU和GPU的占用，还好，优化的还比较到位，我那渣族手机都能跑的很流畅...</p>
<p>今天是中秋节，可惜我这下雨了...没月亮可看...</p>
<p>不过我有了这个月亮。</p>
<p>“但愿人长久，千里共婵娟”，千里之外的朋友，看到同一轮“明月”，也是缘分吧~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用canvas画一轮明月，夜空与流星

## 原文链接
[https://segmentfault.com/a/1190000006913317](https://segmentfault.com/a/1190000006913317)

