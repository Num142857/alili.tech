---
title: 'JavaScript中的图片处理与合成(二)' 
date: 2018-12-11 2:30:10
hidden: true
slug: x2dkitoefk8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">JavaScript中的图片处理与合成(二)</h1>
<h2 id="articleHeader1">引言</h2>
<p>本系列分成以下4个部分:</p>
<ul>
<li>基础类型图片处理技术之缩放、裁剪与旋转(<a href="https://segmentfault.com/a/1190000013483149">传送门</a>)；</li>
<li>基础类型图片处理技术之图片合成；</li>
<li>基础类型图片处理技术之文字合成；</li>
<li>算法类型图片处理技术；</li>
</ul>
<p>上篇文章，我们介绍了图片的裁剪/旋转与缩放，接下来本文主要介绍 <strong>图片的合成</strong> ，这是基础类图片处理中比较实用且复杂的一部分，可以算第一篇文章内容的实践。</p>
<p>通过这些积累，我封装了几个项目中常用的功能：</p>
<h3 id="articleHeader2">
<strong><a href="https://github.com/xd-tayde/mcanvas" rel="nofollow noreferrer" target="_blank">图片合成</a></strong> &nbsp;&nbsp;&nbsp; <strong><a href="https://github.com/ishareme/clipimage" rel="nofollow noreferrer" target="_blank">图片裁剪</a></strong> &nbsp;&nbsp;&nbsp; <strong><a href="https://github.com/xd-tayde/matting" rel="nofollow noreferrer" target="_blank">人像抠除</a></strong>
</h3>
<h2 id="articleHeader3">图片的合成</h2>
<p>图片的合成在实际项目中运用也是十分的广泛，大家可以试试这个<code>demo</code>(仅支持移动端): ???</p>
<h3 id="articleHeader4"><a href="http://api.test.meitu.com/front_end/xiuxiu/online_mapp/tietie_2/index.html?tietieType=1011&amp;pic=http://mtapplet.meitudata.com/57ea433108c45eb2b166.jpg" rel="nofollow noreferrer" target="_blank">小狗贴纸</a></h3>
<p><span class="img-wrap"><img data-src="/img/bV41yQ?w=280&amp;h=280" src="https://static.alili.tech/img/bV41yQ?w=280&amp;h=280" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>图片的合成原理其实类似于<code>photoshop</code>的理念，通过 <strong>图层的叠加</strong> ，最后合成并导出，相比于裁剪和缩放，其实基本原理是一致的，但是它涉及了更多的计算和比较复杂的流程，我们先一起来梳理下合成的整个逻辑。</p>
<p>相信大家对 <code>photoshop</code>都是较为了解的，我们可以借鉴它的思维方式:</p>
<ul>
<li>新建 <code>psd</code> 文件, 设置宽高；</li>
<li>设置背景图；</li>
<li>从底部到顶部一层层添加所需要的图层；</li>
<li>最后直接将整个文件导出成一张图片；</li>
</ul>
<p>以需要合成下图为?：</p>
<p><span class="img-wrap"><img data-src="/img/bV41zf?w=1060&amp;h=1060" src="https://static.alili.tech/img/bV41zf?w=1060&amp;h=1060" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>1、首先我们需要创建一个与原图一样大小的画布；</p>
<p>2、加载背景图并 <strong>添加背景图层</strong> ，也就是这个美女啦~</p>
<p>3、加载猫耳朵图并添加美女头上的 <strong>猫耳朵图层</strong> ( <strong>2/3顺序不可逆，否则耳朵会被美女盖在下面哦。因此图片的加载控制十分重要</strong> )；</p>
<p>4、将整个画布 <strong>导出图片</strong> ；</p>
<p>合成部分，主要以封装的插件为栗子哈。这样能尽可能的完整，避免遗漏点。在开始之前，为了确保图片异步绘制的顺序，我们需要先来构建一套队列系统。</p>
<h3 id="articleHeader5">队列系统；</h3>
<p>图片的加载时间是 <strong>异步且未知</strong> 的，而图片的合成需要严格保证绘制 <strong>顺序</strong> ，越后绘制的图片会置于越顶层，因此我们需要一套严格机制来控制图片的加载与绘制，否则我们将无法避免的写出 <strong>回调地狱</strong> ，这里我使用到了简单的队列系统；</p>
<p>队列系统的原理其实也很简单，主要是为了我们能确保图层从底到顶一层一层的绘制。我设计的使用方式如下, 队列方式主要来确保<code>add</code>函数的按顺序绘制:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建画布；
let mc = new MCanvas();

// 添加图层；
mc.add(image-1).add(image-2);

// 绘制并导出图片；
mc.draw();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建画布；</span>
<span class="hljs-keyword">let</span> mc = <span class="hljs-keyword">new</span> MCanvas();

<span class="hljs-comment">// 添加图层；</span>
mc.add(image<span class="hljs-number">-1</span>).add(image<span class="hljs-number">-2</span>);

<span class="hljs-comment">// 绘制并导出图片；</span>
mc.draw();</code></pre>
<p>这样我们就明白了，这个队列系统需要下面几个点:</p>
<ul>
<li>
<code>queue</code>队列: 用于存放图层绘制函数；</li>
<li>
<code>next</code>函数: 用于表示当前图层已绘制完毕，执行下一图层的绘制；</li>
<li>
<code>add</code>函数: 作为统一添加图层的方法，将绘制逻辑存入函数栈<code>quene</code>，并包裹<code>next</code>函数；</li>
<li>
<code>draw</code>函数: 作为绘制启动函数，表示所有图层素材已经准备完毕，可以按顺序开始绘制；</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MCanvas.queue = [];

MCanvas.prototype.add = function(){
    this.queue.push(()=>{
        // 绘制逻辑，之后详解；
        ...
        
        // 执行下个图层绘制；
        this.next();
    });
}

MCanvas.prototype.next = function(){
    if(this.queue.length > 0){
            // 当队列中还有绘制任务时，则推出并执行；
        this.queue.shift()();
    }else{
            // 当绘制完成后，调用成功事件，并传出结果图；
        this.fn.success();
    }
};

MCanvas.prototype.draw = function(){
    // 导出逻辑；
    ...
    
    // 设置成功事件，用于导出结果图；    
    this.fn.success = () => {
         // 使用 setTimeout 能略微提升性能表现；
         // 且队列函数中都为真正的异步，因此此处不会影响逻辑；
        setTimeout(()=>{
            b64 = this.canvas.toDataURL(`image/jpeg}`, 0.9);
            
            ...
        },0);
   };
   
   // 启动队列执行；
    this.next();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">MCanvas.queue = [];

MCanvas.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.queue.push(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-comment">// 绘制逻辑，之后详解；</span>
        ...
        
        <span class="hljs-comment">// 执行下个图层绘制；</span>
        <span class="hljs-keyword">this</span>.next();
    });
}

MCanvas.prototype.next = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.queue.length &gt; <span class="hljs-number">0</span>){
            <span class="hljs-comment">// 当队列中还有绘制任务时，则推出并执行；</span>
        <span class="hljs-keyword">this</span>.queue.shift()();
    }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">// 当绘制完成后，调用成功事件，并传出结果图；</span>
        <span class="hljs-keyword">this</span>.fn.success();
    }
};

MCanvas.prototype.draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 导出逻辑；</span>
    ...
    
    <span class="hljs-comment">// 设置成功事件，用于导出结果图；    </span>
    <span class="hljs-keyword">this</span>.fn.success = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
         <span class="hljs-comment">// 使用 setTimeout 能略微提升性能表现；</span>
         <span class="hljs-comment">// 且队列函数中都为真正的异步，因此此处不会影响逻辑；</span>
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            b64 = <span class="hljs-keyword">this</span>.canvas.toDataURL(<span class="hljs-string">`image/jpeg}`</span>, <span class="hljs-number">0.9</span>);
            
            ...
        },<span class="hljs-number">0</span>);
   };
   
   <span class="hljs-comment">// 启动队列执行；</span>
    <span class="hljs-keyword">this</span>.next();
}</code></pre>
<p>此时，<code>queue</code>、<code>add</code>、<code>next</code>与<code>draw</code>便组成了一整套队列系统，可确保图片的顺序加载和绘制，准备好素材和队列后，我们便可以开始真正的合成图片咯~~</p>
<h3 id="articleHeader6">创建画布</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MCanvas.prototype._init = function(){
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">MCanvas.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
    <span class="hljs-keyword">this</span>.ctx = <span class="hljs-keyword">this</span>.canvas.getContext(<span class="hljs-string">'2d'</span>);
};</code></pre>
<h3 id="articleHeader7">绘制背景图</h3>
<p>设置画布大小并绘制美女背景图。</p>
<p>通过调整背景图的<code>dx,dy,dw,dh</code>参数，可以绘制出多种模式，类似于<code>css</code>中的<code>background-size</code>的<code>contain</code>/<code>cover</code>等效果。</p>
<p>这里主要以上面使用到的场景为例子，既原图模式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原图/效果图尺寸保持一致；
MCanvas.prototype.background = function(image, bgOps){
    // 推入队列系统；
    this.queue.push(() => {
    let { iw, ih } = this._getSize(img);
        
    // 图片与canvas的长宽比；
    let iRatio = iw / ih;
        
    // 背景绘制参数；
    let dx,dy,dwidth,dheight;
        
    // 设置画布与背景图尺寸一致；
    this.canvas.width = iw;
    this.canvas.height = ih;
    dx = dy = 0;
    dwidth = this.canvas.width;
    dheight = this.canvas.height;
        
    // 绘制背景图；
    this.ctx.drawImage(img,dx,dy,dwidth,dheight);
        
    this._next(); 
    });
    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 原图/效果图尺寸保持一致；</span>
MCanvas.prototype.background = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">image, bgOps</span>)</span>{
    <span class="hljs-comment">// 推入队列系统；</span>
    <span class="hljs-keyword">this</span>.queue.push(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> { iw, ih } = <span class="hljs-keyword">this</span>._getSize(img);
        
    <span class="hljs-comment">// 图片与canvas的长宽比；</span>
    <span class="hljs-keyword">let</span> iRatio = iw / ih;
        
    <span class="hljs-comment">// 背景绘制参数；</span>
    <span class="hljs-keyword">let</span> dx,dy,dwidth,dheight;
        
    <span class="hljs-comment">// 设置画布与背景图尺寸一致；</span>
    <span class="hljs-keyword">this</span>.canvas.width = iw;
    <span class="hljs-keyword">this</span>.canvas.height = ih;
    dx = dy = <span class="hljs-number">0</span>;
    dwidth = <span class="hljs-keyword">this</span>.canvas.width;
    dheight = <span class="hljs-keyword">this</span>.canvas.height;
        
    <span class="hljs-comment">// 绘制背景图；</span>
    <span class="hljs-keyword">this</span>.ctx.drawImage(img,dx,dy,dwidth,dheight);
        
    <span class="hljs-keyword">this</span>._next(); 
    });
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<h3 id="articleHeader8">绘制猫耳朵贴纸</h3>
<p>相信大家都玩过贴纸，其最大的特点，就是贴纸与背景图的匹配。也就是用户可以修改贴纸的 <strong>大小，位置，旋转角度</strong>，通过手势操作将猫耳朵完美地贴在照片人物的头上。因此也就是说<code>add</code>这个方法，需要设置缩放，旋转与位置等参数。</p>
<p>这里先模拟出一份使用参数, 实际真实情况会根据不同的背景图，用户会调整出不同的位置参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // 图片路径；
    image:'./images/ear.png',
    options:{
        // 贴纸宽度；
        width:482,
        pos:{
            // 贴纸左上点坐标；
            x:150,
            y:58,
            // 贴纸放大系数；
            scale:1,
            // 贴纸旋转系数；
            rotate:35,
        },
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-comment">// 图片路径；</span>
    image:<span class="hljs-string">'./images/ear.png'</span>,
    <span class="hljs-attr">options</span>:{
        <span class="hljs-comment">// 贴纸宽度；</span>
        width:<span class="hljs-number">482</span>,
        <span class="hljs-attr">pos</span>:{
            <span class="hljs-comment">// 贴纸左上点坐标；</span>
            x:<span class="hljs-number">150</span>,
            <span class="hljs-attr">y</span>:<span class="hljs-number">58</span>,
            <span class="hljs-comment">// 贴纸放大系数；</span>
            scale:<span class="hljs-number">1</span>,
            <span class="hljs-comment">// 贴纸旋转系数；</span>
            rotate:<span class="hljs-number">35</span>,
        },
    },
}</code></pre>
<h3 id="articleHeader9">
<code>add</code>函数</h3>
<p>接下里我们便来在<code>add</code>函数中解析下各个参数的使用姿势:</p>
<p>绘制小画布来处理旋转：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建小画布；
let lcvs = document.createElement('canvas'),
    lctx = lcvs.getContext('2d');

// 贴纸图原始大小；
let { iw, ih } = this._getSize(img);
// 绘制参数;
let ldx, ldy, ldw, ldh;

// 贴纸原始尺寸；
ldw = iw;
ldh = ih;

// 绘制起始点；
ldx = - Math.round(ldw / 2);
ldy = - Math.round(ldh / 2);

// 上篇文章我们说过旋转裁剪的问题，这里就需要用到；
// 需要扩大小画布的容器，以避免旋转造成的裁剪；最大值为放大5倍；
let _ratio = iw > ih ? iw / ih : ih / iw;
let lctxScale = _ratio * 1.4 > 5 ? 5 : _ratio * 1.4;

lcvs.width =  ldw * lctxScale;
lcvs.height = ldh * lctxScale;

// 调整绘制基点；
lctx.translate(lcvs.width/2,lcvs.height/2);

// 旋转画板；
lctx.rotate(ops.pos.rotate);

// 绘制贴纸； 
lctx.drawImage(img,ldx,ldy,ldw,ldh);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建小画布；</span>
<span class="hljs-keyword">let</span> lcvs = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>),
    lctx = lcvs.getContext(<span class="hljs-string">'2d'</span>);

<span class="hljs-comment">// 贴纸图原始大小；</span>
<span class="hljs-keyword">let</span> { iw, ih } = <span class="hljs-keyword">this</span>._getSize(img);
<span class="hljs-comment">// 绘制参数;</span>
<span class="hljs-keyword">let</span> ldx, ldy, ldw, ldh;

<span class="hljs-comment">// 贴纸原始尺寸；</span>
ldw = iw;
ldh = ih;

<span class="hljs-comment">// 绘制起始点；</span>
ldx = - <span class="hljs-built_in">Math</span>.round(ldw / <span class="hljs-number">2</span>);
ldy = - <span class="hljs-built_in">Math</span>.round(ldh / <span class="hljs-number">2</span>);

<span class="hljs-comment">// 上篇文章我们说过旋转裁剪的问题，这里就需要用到；</span>
<span class="hljs-comment">// 需要扩大小画布的容器，以避免旋转造成的裁剪；最大值为放大5倍；</span>
<span class="hljs-keyword">let</span> _ratio = iw &gt; ih ? iw / ih : ih / iw;
<span class="hljs-keyword">let</span> lctxScale = _ratio * <span class="hljs-number">1.4</span> &gt; <span class="hljs-number">5</span> ? <span class="hljs-number">5</span> : _ratio * <span class="hljs-number">1.4</span>;

lcvs.width =  ldw * lctxScale;
lcvs.height = ldh * lctxScale;

<span class="hljs-comment">// 调整绘制基点；</span>
lctx.translate(lcvs.width/<span class="hljs-number">2</span>,lcvs.height/<span class="hljs-number">2</span>);

<span class="hljs-comment">// 旋转画板；</span>
lctx.rotate(ops.pos.rotate);

<span class="hljs-comment">// 绘制贴纸； </span>
lctx.drawImage(img,ldx,ldy,ldw,ldh);</code></pre>
<p>此时我们会得到一个小画布，中心绘制这猫耳朵贴纸：</p>
<p><span class="img-wrap"><img data-src="/img/bV41zu?w=673&amp;h=386" src="https://static.alili.tech/img/bV41zu?w=673&amp;h=386" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接下来我们便是将贴纸绘制到背景图上，需要注意的点就是，放大会增加贴纸画布的空白区域，需要考虑到这部分区域，才能计算出最后真实的<code>dx,dy</code>值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 绘制参数；
let cratio = iw / ih;
let cdx, cdy, cdw, cdh;

// ops.width 为最终画到大画布上时的宽度；
// 由于小画布进行了放大，因此最终宽度也需要等倍放大；
// 并乘以配置中还需要缩放的系数；
cdw = ops.width * lctxScale * ops.pos.scale;
cdh = cdw / cratio * ops.pos.scale;

// 放大后增加的空白区域；
spaceX = (lctxScale - 1) * ops.width / 2;
spaceY = spaceX / cratio;

// 获取素材的最终位置；
// 配置的位置 - 配置放大系数的影响 - 小画布放大倍数的影响；
cdx = ops.pos.x + cdw * ( 1 - ops.pos.scale )/2 - spaceX;
cdy = ops.pos.y + cdh * ( 1 - ops.pos.scale )/2 - spaceY;

this.ctx.drawImage(lcvs,cdx,cdy,cdw,cdh);

lcvs = lctx = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 绘制参数；</span>
<span class="hljs-keyword">let</span> cratio = iw / ih;
<span class="hljs-keyword">let</span> cdx, cdy, cdw, cdh;

<span class="hljs-comment">// ops.width 为最终画到大画布上时的宽度；</span>
<span class="hljs-comment">// 由于小画布进行了放大，因此最终宽度也需要等倍放大；</span>
<span class="hljs-comment">// 并乘以配置中还需要缩放的系数；</span>
cdw = ops.width * lctxScale * ops.pos.scale;
cdh = cdw / cratio * ops.pos.scale;

<span class="hljs-comment">// 放大后增加的空白区域；</span>
spaceX = (lctxScale - <span class="hljs-number">1</span>) * ops.width / <span class="hljs-number">2</span>;
spaceY = spaceX / cratio;

<span class="hljs-comment">// 获取素材的最终位置；</span>
<span class="hljs-comment">// 配置的位置 - 配置放大系数的影响 - 小画布放大倍数的影响；</span>
cdx = ops.pos.x + cdw * ( <span class="hljs-number">1</span> - ops.pos.scale )/<span class="hljs-number">2</span> - spaceX;
cdy = ops.pos.y + cdh * ( <span class="hljs-number">1</span> - ops.pos.scale )/<span class="hljs-number">2</span> - spaceY;

<span class="hljs-keyword">this</span>.ctx.drawImage(lcvs,cdx,cdy,cdw,cdh);

lcvs = lctx = <span class="hljs-literal">null</span>;</code></pre>
<p>这样便能得到合成后的结果图了,红色边框代表小画布，黑色边框代表大画布:</p>
<p><span class="img-wrap"><img data-src="/img/bV41zA?w=734&amp;h=660" src="https://static.alili.tech/img/bV41zA?w=734&amp;h=660" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MCanvas.prototype.add = function(img, options){
    this.queue.push(()=>{
        // 绘制贴纸小画布；
        ...
        
        // 绘制贴纸到大画布上；
        ...
        
        this._next();
    });
    
    return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">MCanvas.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">img, options</span>)</span>{
    <span class="hljs-keyword">this</span>.queue.push(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-comment">// 绘制贴纸小画布；</span>
        ...
        
        <span class="hljs-comment">// 绘制贴纸到大画布上；</span>
        ...
        
        this._next();
    });
    
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}</code></pre>
<p>这样我们便完成了一系列方法，构建了一套完整的合成流程。通过这套流程，我们便能添加任意的图片图层并合成图片。</p>
<h2 id="articleHeader10">结语</h2>
<p>本文主要讲解了图片合成上的方法原理和一些需要填的坑，这整套流程也是经过了很长一段时间的打磨，填了许多坑后总结出来的，算比较成熟的方案，已经work在多个线上项目中，期望能对大家有所帮助！?。<br>下篇文章，我们会继续介绍下文字的合成和几何图片的合成，敬请期待~~??</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中的图片处理与合成(二)

## 原文链接
[https://segmentfault.com/a/1190000013551691](https://segmentfault.com/a/1190000013551691)

