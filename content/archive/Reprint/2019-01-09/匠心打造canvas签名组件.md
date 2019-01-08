---
title: '匠心打造canvas签名组件' 
date: 2019-01-09 2:30:12
hidden: true
slug: cr82xzzcjgr
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>本文首发于CSDN网站，下面的版本又经过进一步的修订。</strong><br>原文：<a href="http://louiszhai.github.io/2017/07/07/canvas-draw/" rel="nofollow noreferrer" target="_blank">匠心打造canvas签名组件</a></p>
<h3 id="articleHeader0"><strong>导读</strong></h3>
<p>6月又是项目吃紧的时候，一大波需求袭来，猝不及防。</p>
<p>度过了漫长而煎熬的6月，是时候总结一波。最近移动端的一款产品原计划是引入第三方的签名插件，该插件依赖复杂，若干个js使用<code>document.write</code>顺序加载，插件源码是ES5的，甚至说是ES3都不为过。为了能够顺利嵌入我们的VUE项目，我阅读了两天插件的源码（demo及文档不全，囧），然后花了一天多点的时间使用ES6引用它。鉴于单页应用中，任何非全局资源都不该提前加载的指导性原则，为了做到动态加载，我甚至还专门写了一个simple的vue组件<a href="https://github.com/Louiszhai/canvas-draw/blob/master/src/utils/iload.js" rel="nofollow noreferrer" target="_blank">iload.js</a>去顺序加载这些资源并执行回调。一切看似很完美，结果发现demo引用的一个压缩的js中居然写死了插件相关DOM节点的id和style，此刻我的内心几乎是崩溃的。这样的一个插件我怕是无力引入了吧。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010120562" src="https://static.alili.tech/img/remote/1460000010120562" alt="" title="" style="cursor: pointer;"></span></p>
<p>虽然嘴上这么说，身体还是很诚实的，费尽千辛万苦我还是把这个插件用在了项目中。随着项目推进，业务上经过多次沟通，我们砍掉了该签名插件的数字证书验证部分。也就是说，这么大的一个插件，只剩下用户签名的功能，我完全可以自己做啊。于是我悄悄移除了这个插件，为这几天的调研和码字过程划上了一个完美的句号（深藏功与名）。</p>
<p>签名是若干操作的集合，起于用户手写姓名，终于签名图片上传，中间还包含图片的处理，比如说减少锯齿、旋转、缩小、预览等。canvas几乎是最适合的解决方案。</p>
<h3 id="articleHeader1"><strong>手写</strong></h3>
<p>从交互上看，用户签名的过程，只有开始的手写部分是有交互的，后面是自动处理。为了完成手写，需要监听画布的两个事件：touchstart、touchmove（移动端touchend在touchmove之后不触发）。前者定义起始点，后者不停地描线。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const canvas = document.getElementById('canvas');
const touchstart = (e) => {
  /* TODO 定义起点 */
};
const touchmove = (e) => {
  /* TODO 连点成线，并且填充颜色 */
};
canvas.addEventListener('touchstart', touchstart);
canvas.addEventListener('touchmove', touchmove);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
<span class="hljs-keyword">const</span> touchstart = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  <span class="hljs-comment">/* TODO 定义起点 */</span>
};
<span class="hljs-keyword">const</span> touchmove = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  <span class="hljs-comment">/* TODO 连点成线，并且填充颜色 */</span>
};
canvas.addEventListener(<span class="hljs-string">'touchstart'</span>, touchstart);
canvas.addEventListener(<span class="hljs-string">'touchmove'</span>, touchmove);</code></pre>
<p>注： 以下默认canvas和context对象已有。</p>
<p>可以先戳这里体验把后面将要提到的签名组件 <a href="http://louiszhai.github.io/res/canvasDraw/" rel="nofollow noreferrer" target="_blank">canvas-draw</a>。</p>
<h4><strong>描线</strong></h4>
<p>既然要连点成线，自然需要一个变量来存储这些点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const point = {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> point = {};</code></pre>
<p>接下来就是画线的部分。canvas画线只需4行代码：</p>
<ol>
<li><p>开始路径（beginPath）</p></li>
<li><p>定位起点（moveTo）</p></li>
<li><p>移动画笔（lineTo）</p></li>
<li><p>绘制路径（stroke）</p></li>
</ol>
<p>考虑到start和move两个动作，那么一个描线的方法就呼之欲出了，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const paint = (signal) => {
  switch (signal) {
    case 1: // 开始路径
      context.beginPath();
      context.moveTo(point.x, point.y);
    case 2: // 前面之所以没有break语句，是为了点击时就能描画出一个点
      context.lineTo(point.x, point.y);
      context.stroke();
      break;
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> paint = <span class="hljs-function">(<span class="hljs-params">signal</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span> (signal) {
    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>: <span class="hljs-comment">// 开始路径</span>
      context.beginPath();
      context.moveTo(point.x, point.y);
    <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>: <span class="hljs-comment">// 前面之所以没有break语句，是为了点击时就能描画出一个点</span>
      context.lineTo(point.x, point.y);
      context.stroke();
      <span class="hljs-keyword">break</span>;
  }
};</code></pre>
<h4><strong>绑定事件</strong></h4>
<p>为了兼容PC端的类似需求，我们有必要区分下平台。移动端，使用手指操作，需要绑定的是touchstart和touchmove；PC端，使用鼠标操作，需要绑定的是mousedown和mousemove。如下一行代码可用于判断是否移动端：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const isMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> isMobile = <span class="hljs-regexp">/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i</span>.test(navigator.userAgent);</code></pre>
<p>描线的方法准备妥当后，剩下的就是在适当的时候，记录当前划过的点，并且调用paint方法进行绘制。这里可以抽象出一个事件生成器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let pressed = false; // 标示是否发生鼠标按下或者手指按下事件
const create = signal => (e) => {
  if (signal === 1) {
    pressed = true;
  }
  if (signal === 1 || pressed) {
    e = isMobile ? e.touches[0] : e;
    point.x = e.clientX - left + 0.5; // 不加0.5，整数坐标处绘制直线，直线宽度将会多1px(不理解的不妨谷歌下)
    point.y = e.clientY - top + 0.5;
    paint(signal);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> pressed = <span class="hljs-literal">false</span>; <span class="hljs-comment">// 标示是否发生鼠标按下或者手指按下事件</span>
<span class="hljs-keyword">const</span> create = <span class="hljs-function"><span class="hljs-params">signal</span> =&gt;</span> (e) =&gt; {
  <span class="hljs-keyword">if</span> (signal === <span class="hljs-number">1</span>) {
    pressed = <span class="hljs-literal">true</span>;
  }
  <span class="hljs-keyword">if</span> (signal === <span class="hljs-number">1</span> || pressed) {
    e = isMobile ? e.touches[<span class="hljs-number">0</span>] : e;
    point.x = e.clientX - left + <span class="hljs-number">0.5</span>; <span class="hljs-comment">// 不加0.5，整数坐标处绘制直线，直线宽度将会多1px(不理解的不妨谷歌下)</span>
    point.y = e.clientY - top + <span class="hljs-number">0.5</span>;
    paint(signal);
  }
};</code></pre>
<p>以上代码中的left和top并非内置变量，它们分别表示着画布距屏幕左边和顶部的像素距离，主要用于将屏幕坐标点转换为画布坐标点。以下是一种获取方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { left, top } = canvas.getBoundingClientRect();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> { left, top } = canvas.getBoundingClientRect();</code></pre>
<p>很明显，上述的事件生成器是一个高阶函数，用于固化signal参数并返回一个新的Function。基于此，start和move回调便呈现了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const start = create(1);
const move = create(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> start = create(<span class="hljs-number">1</span>);
<span class="hljs-keyword">const</span> move = create(<span class="hljs-number">2</span>);</code></pre>
<p>为了避免UI过度绘制，让move操作执行得更加流畅，requestAnimationFrame优化自然是少不了的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const requestAnimationFrame = window.requestAnimationFrame;
const optimizedMove = requestAnimationFrame ? (e) => {
  requestAnimationFrame(() => {
    move(e);
  });
} : move;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> requestAnimationFrame = <span class="hljs-built_in">window</span>.requestAnimationFrame;
<span class="hljs-keyword">const</span> optimizedMove = requestAnimationFrame ? <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  requestAnimationFrame(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    move(e);
  });
} : move;</code></pre>
<p>剩下的也是绑定事件中关键的一步。PC端中，mousedown和mousemove没有先后顺序，不是每一次画布之上的鼠标移动都是有效的操作，因此我们使用pressed变量来保证mousemove事件回调只在mousedown事件之后执行。实际上，设置后的pressed变量总需要还原，还原的契机就是mouseup和mouseleave回调，由于mouseup事件并不总能触发（比如说鼠标移动到别的节点上才弹起，此时触发的是其他节点的mouseup事件），mouseleave便是鼠标移出画布时的兜底逻辑。而移动端的touch事件，其天然的连续性，保证了touchmove只会在touchstart之后触发，因此无须设置pressed变量，也不需要还原它。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isMobile) {
  canvas.addEventListener('touchstart', start);
  canvas.addEventListener('touchmove', optimizedMove);
} else {
  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', optimizedMove);
  ['mouseup', 'mouseleave'].forEach((event) => {
    canvas.addEventListener(event, () => {
      pressed = false;
    });
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (isMobile) {
  canvas.addEventListener(<span class="hljs-string">'touchstart'</span>, start);
  canvas.addEventListener(<span class="hljs-string">'touchmove'</span>, optimizedMove);
} <span class="hljs-keyword">else</span> {
  canvas.addEventListener(<span class="hljs-string">'mousedown'</span>, start);
  canvas.addEventListener(<span class="hljs-string">'mousemove'</span>, optimizedMove);
  [<span class="hljs-string">'mouseup'</span>, <span class="hljs-string">'mouseleave'</span>].forEach(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
    canvas.addEventListener(event, () =&gt; {
      pressed = <span class="hljs-literal">false</span>;
    });
  });
}</code></pre>
<h3 id="articleHeader2"><strong>旋转</strong></h3>
<p>想要在移动端签名，往往面临着屏幕宽度不够的尴尬。竖屏下写不了几个汉字，甚至三个都够呛。如果app webview或浏览器不支持横屏展示，此时并不是意味着没有了办法，起码我们可以将整个网页旋转90°。</p>
<blockquote><p>方案一：起初我的想法是将画布也一同旋转90°，后来发现难以处理旋转后的坐标系和屏幕坐标系的对应关系，因此我采取了旋转90°绘制页面，但是正常布局画布的方案，从而保证坐标系的一致性（这样就不用重新纠正canvas画布的坐标系了，关于纠正坐标系后续还有方案二，请耐心阅读）。</p></blockquote>
<p>由于用户是横屏操作画布的，完成签名后，图片需要逆时针旋转90°才能保上传到服务器。因此还差一个旋转的方法。实际上，rotate方法可以旋转画布，drawImage方法可以在新的画布中绘制一张图片或老的画布，这种绘制的定制化程度很高。</p>
<h4><strong>rotate</strong></h4>
<p>rotate用于旋转当前的画布。</p>
<p>语法： <code>rotate(angle)</code>，angle表示旋转的弧度，这里需要将角度转换为弧度计算，比如顺时针旋转90°，angle的值就等于-<code>90 * Math.PI / 180</code>。ratate旋转时默认以画布左上角为中心，如果需要以画布中心位置为中心，需要在rotate方法执行前将画布的坐标原点移至中心位置，旋转完成后，再移动回来。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { width, height } = canvas;
context.translate(width / 2, height / 2); // 坐标原点移至画布中心
context.rotate(90 * Math.PI / 180); // 顺时针旋转90°
context.translate(-width / 2, -height / 2); // 坐标原点还原到起始位置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> { width, height } = canvas;
context.translate(width / <span class="hljs-number">2</span>, height / <span class="hljs-number">2</span>); <span class="hljs-comment">// 坐标原点移至画布中心</span>
context.rotate(<span class="hljs-number">90</span> * <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>); <span class="hljs-comment">// 顺时针旋转90°</span>
context.translate(-width / <span class="hljs-number">2</span>, -height / <span class="hljs-number">2</span>); <span class="hljs-comment">// 坐标原点还原到起始位置</span></code></pre>
<p>实际上，这种变换处理，使用<code>transform(Math.cos(90 * Math.PI / 180), 1, -1, Math.cos(90 * Math.PI / 180), 0, 0)</code>同样可以顺时针旋转90°。</p>
<h4><strong>drawImage</strong></h4>
<p>drawImage用于绘制图片、画布或者视频，可自定义宽高、位置、甚至局部裁剪。它有三种形态的api：</p>
<ul>
<li><p><code>drawImage(img,x,y)</code>，x，y为画布中的坐标，img可以是图片、画布或视频资源，表示在画布的指定坐标处绘制。</p></li>
<li><p><code>drawImage(img,x,y,width,height)</code>，width，height表示指定图片绘制后的宽高（可以任意缩放或调整宽高比例）。</p></li>
<li><p><code>context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height)</code>，sx，sy表示从指定的坐标位置裁剪原始图片，并且裁剪swidth的宽度和sheight的高度。</p></li>
</ul>
<p>通常情况下，我们可能需要旋转一张图片90°、180°或者-90°。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rotate = (degree, image) => {
  degree = ~~degree;
  if (degree !== 0) {
    const maxDegree = 180;
    const minDegree = -90;
    if (degree > maxDegree) {
      degree = maxDegree;
    } else if (degree < minDegree) {
      degree = minDegree;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const height = image.height;
    const width = image.width;
    const angle = (degree * Math.PI) / 180;

    switch (degree) {
      // 逆时针旋转90°
      case -90:
        canvas.width = height;
        canvas.height = width;
        context.rotate(angle);
        context.drawImage(image, -width, 0);
        break;
      // 顺时针旋转90°
      case 90:
        canvas.width = height;
        canvas.height = width;
        context.rotate(angle);
        context.drawImage(image, 0, -height);
        break;
      // 顺时针旋转180°
      case 180:
        canvas.width = width;
        canvas.height = height;
        context.rotate(angle);
        context.drawImage(image, -width, -height);
        break;
    }
    image = canvas;
  }
  return image;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rotate = <span class="hljs-function">(<span class="hljs-params">degree, image</span>) =&gt;</span> {
  degree = ~~degree;
  <span class="hljs-keyword">if</span> (degree !== <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">const</span> maxDegree = <span class="hljs-number">180</span>;
    <span class="hljs-keyword">const</span> minDegree = <span class="hljs-number">-90</span>;
    <span class="hljs-keyword">if</span> (degree &gt; maxDegree) {
      degree = maxDegree;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (degree &lt; minDegree) {
      degree = minDegree;
    }

    <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
    <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
    <span class="hljs-keyword">const</span> height = image.height;
    <span class="hljs-keyword">const</span> width = image.width;
    <span class="hljs-keyword">const</span> angle = (degree * <span class="hljs-built_in">Math</span>.PI) / <span class="hljs-number">180</span>;

    <span class="hljs-keyword">switch</span> (degree) {
      <span class="hljs-comment">// 逆时针旋转90°</span>
      <span class="hljs-keyword">case</span> <span class="hljs-number">-90</span>:
        canvas.width = height;
        canvas.height = width;
        context.rotate(angle);
        context.drawImage(image, -width, <span class="hljs-number">0</span>);
        <span class="hljs-keyword">break</span>;
      <span class="hljs-comment">// 顺时针旋转90°</span>
      <span class="hljs-keyword">case</span> <span class="hljs-number">90</span>:
        canvas.width = height;
        canvas.height = width;
        context.rotate(angle);
        context.drawImage(image, <span class="hljs-number">0</span>, -height);
        <span class="hljs-keyword">break</span>;
      <span class="hljs-comment">// 顺时针旋转180°</span>
      <span class="hljs-keyword">case</span> <span class="hljs-number">180</span>:
        canvas.width = width;
        canvas.height = height;
        context.rotate(angle);
        context.drawImage(image, -width, -height);
        <span class="hljs-keyword">break</span>;
    }
    image = canvas;
  }
  <span class="hljs-keyword">return</span> image;
};</code></pre>
<h3 id="articleHeader3"><strong>缩放</strong></h3>
<p>旋转后的画布，通常需要进一步格式化其宽高才能上传。此处还是利用drawImage去改变画布宽高，以达到缩小和放大的目的。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const scale = (width, height) => {
  const w = canvas.width;
  const h = canvas.height;
  width = width || w;
  height = height || h;
  if (width !== w || height !== h) {
    const tmpCanvas = document.createElement('canvas');
    const tmpContext = tmpCanvas.getContext('2d');
    tmpCanvas.width = width;
    tmpCanvas.height = height;
    tmpContext.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
    canvas = tmpCanvas;
  }
  return canvas;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> scale = <span class="hljs-function">(<span class="hljs-params">width, height</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> w = canvas.width;
  <span class="hljs-keyword">const</span> h = canvas.height;
  width = width || w;
  height = height || h;
  <span class="hljs-keyword">if</span> (width !== w || height !== h) {
    <span class="hljs-keyword">const</span> tmpCanvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
    <span class="hljs-keyword">const</span> tmpContext = tmpCanvas.getContext(<span class="hljs-string">'2d'</span>);
    tmpCanvas.width = width;
    tmpCanvas.height = height;
    tmpContext.drawImage(canvas, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, w, h, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, width, height);
    canvas = tmpCanvas;
  }
  <span class="hljs-keyword">return</span> canvas;
};</code></pre>
<h3 id="articleHeader4"><strong>上传</strong></h3>
<p>我们做了这么多的操作和转换，最终的目的还是上传图片。</p>
<p>首先，获取画布中的图片：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getPNGImage = () => {
  return canvas.toDataURL('image/png');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> getPNGImage = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> canvas.toDataURL(<span class="hljs-string">'image/png'</span>);
};</code></pre>
<p>getPNGImage方法返回的是dataURL，需要转换为Blob对象才能上传。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bStr = atob(arr[1]);
  let n = bStr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dataURLtoBlob = <span class="hljs-function">(<span class="hljs-params">dataURL</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> arr = dataURL.split(<span class="hljs-string">','</span>);
  <span class="hljs-keyword">const</span> mime = arr[<span class="hljs-number">0</span>].match(<span class="hljs-regexp">/:(.*?);/</span>)[<span class="hljs-number">1</span>];
  <span class="hljs-keyword">const</span> bStr = atob(arr[<span class="hljs-number">1</span>]);
  <span class="hljs-keyword">let</span> n = bStr.length;
  <span class="hljs-keyword">const</span> u8arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(n);
  <span class="hljs-keyword">while</span> (n--) {
    u8arr[n] = bStr.charCodeAt(n);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Blob([u8arr], { <span class="hljs-attr">type</span>: mime });
};</code></pre>
<p>完成了上面这些，才能一波ajax请求（xhr、fetch、axios都可）带走签名图片。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const upload = (blob, url, callback) => {
  const formData = new FormData();
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  formData.append('image', blob, 'sign');

  xhr.open('POST', url, true);
  xhr.onload = () => {
    if ((xhr.status >= 200 &amp;&amp; xhr.status < 300) || xhr.status === 304) {
      callback(xhr.responseText);
    }
  };
  xhr.onerror = (e) => {
    console.log(`upload img error: ${e}`);
  };
  xhr.send(formData);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> upload = <span class="hljs-function">(<span class="hljs-params">blob, url, callback</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> FormData();
  <span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xhr.withCredentials = <span class="hljs-literal">true</span>;
  formData.append(<span class="hljs-string">'image'</span>, blob, <span class="hljs-string">'sign'</span>);

  xhr.open(<span class="hljs-string">'POST'</span>, url, <span class="hljs-literal">true</span>);
  xhr.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> ((xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt; <span class="hljs-number">300</span>) || xhr.status === <span class="hljs-number">304</span>) {
      callback(xhr.responseText);
    }
  };
  xhr.onerror = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`upload img error: <span class="hljs-subst">${e}</span>`</span>);
  };
  xhr.send(formData);
};</code></pre>
<h3 id="articleHeader5"><strong>设置</strong></h3>
<p>完成了上述功能，一个签名插件就已经成型了。除非你迫不及待想要发布，否则，这样的代码我是不建议拿出去的。一些必要的设置通常是不能忽略的。</p>
<p>通常画布中的直线是1px大小，这么细的线，是不能模拟笔触的，可如果你要放大至10px，便会发现，绘制的直线其实是矩形。这在签名过程中也是不合适的，我们期望的是圆滑的笔触，因此需要尽量模拟手写。实际上，lineCap就可指定直线首尾圆滑，lineJoin可以指定线条交汇时的边角圆滑。如下是一个simple的设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.lineWidth = 10;         // 直线宽度
context.strokeStyle = 'black';     // 路径的颜色
context.lineCap = 'round';         // 直线首尾端圆滑
context.lineJoin = 'round';     // 当两条线条交汇时，创建圆形边角
context.shadowBlur = 1;         // 边缘模糊，防止直线边缘出现锯齿
context.shadowColor = 'black';  // 边缘颜色" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">context.lineWidth = <span class="hljs-number">10</span>;         <span class="hljs-comment">// 直线宽度</span>
context.strokeStyle = <span class="hljs-string">'black'</span>;     <span class="hljs-comment">// 路径的颜色</span>
context.lineCap = <span class="hljs-string">'round'</span>;         <span class="hljs-comment">// 直线首尾端圆滑</span>
context.lineJoin = <span class="hljs-string">'round'</span>;     <span class="hljs-comment">// 当两条线条交汇时，创建圆形边角</span>
context.shadowBlur = <span class="hljs-number">1</span>;         <span class="hljs-comment">// 边缘模糊，防止直线边缘出现锯齿</span>
context.shadowColor = <span class="hljs-string">'black'</span>;  <span class="hljs-comment">// 边缘颜色</span></code></pre>
<h3 id="articleHeader6"><strong>优化</strong></h3>
<p>一切看似很完美，直到遇到了retina屏幕。retina屏是用4个物理像素绘制一个虚拟像素，屏幕宽度相同的画布，其每个像素点都会由4倍物理像素去绘制，画布中点与点之间的距离增加，会产生较为明显的锯齿，可通过放大画布然后压缩展示来解决这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { width, height } = window.getComputedStyle(canvas, null);
width = width.replace('px', '');
height = height.replace('px', '');

// 根据设备像素比优化canvas绘图
const devicePixelRatio = window.devicePixelRatio;
if (devicePixelRatio) {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.height = height * devicePixelRatio; // 画布宽高放大
  canvas.width = width * devicePixelRatio;
  context.scale(devicePixelRatio, devicePixelRatio); // 画布内容放大相同的倍数
} else {
  canvas.width = width;
  canvas.height = height;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> { width, height } = <span class="hljs-built_in">window</span>.getComputedStyle(canvas, <span class="hljs-literal">null</span>);
width = width.replace(<span class="hljs-string">'px'</span>, <span class="hljs-string">''</span>);
height = height.replace(<span class="hljs-string">'px'</span>, <span class="hljs-string">''</span>);

<span class="hljs-comment">// 根据设备像素比优化canvas绘图</span>
<span class="hljs-keyword">const</span> devicePixelRatio = <span class="hljs-built_in">window</span>.devicePixelRatio;
<span class="hljs-keyword">if</span> (devicePixelRatio) {
  canvas.style.width = <span class="hljs-string">`<span class="hljs-subst">${width}</span>px`</span>;
  canvas.style.height = <span class="hljs-string">`<span class="hljs-subst">${height}</span>px`</span>;
  canvas.height = height * devicePixelRatio; <span class="hljs-comment">// 画布宽高放大</span>
  canvas.width = width * devicePixelRatio;
  context.scale(devicePixelRatio, devicePixelRatio); <span class="hljs-comment">// 画布内容放大相同的倍数</span>
} <span class="hljs-keyword">else</span> {
  canvas.width = width;
  canvas.height = height;
}</code></pre>
<h3 id="articleHeader7"><strong>重置坐标系</strong></h3>
<p>由于采取了方案一，签名的工作流变成了：『页面顺时针旋转90°绘制、画布正常竖屏绘制』—&gt;『手写签名』—&gt;『逆时针旋转画布90°』—&gt; 『合理缩放画布至屏幕宽度』—&gt; 『导出图片并上传』。由此可见方案一流程复杂，处理起来也比较麻烦。</p>
<p>换个角度想想，既然画布是可以旋转的，我刚好可以利用这种坐标系的反向旋转去抵消页面的正向旋转，这样页面上点的坐标就可以映射到画布本身的坐标上。于是有了方案二。</p>
<blockquote><p>方案二：页面顺时针旋转90°，画布跟随着一起旋转（画布的坐标系也跟着旋转90°）；然后再逆向旋转画布90°，重置画布的坐标系，使之与页面坐标系映射起来。</p></blockquote>
<p>顺时针旋转90°的页面如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010120563" src="https://static.alili.tech/img/remote/1460000010120563" alt="页面顺时针旋转90°" title="页面顺时针旋转90°" style="cursor: pointer;"></span></p>
<p>此时canvas画布也随着页面顺时针旋转90°，想要重置画布坐标系，可借由rotate逆向旋转90°，然后由translate平移坐标系。以下代码包含了顺逆时针旋转90°、180° 的处理（为了便于描述，假设画布充满屏幕）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.rotate((degree * Math.PI) / 180);
switch (degree) {
  // 页面顺时针旋转90°后，画布左上角的原点位置落到了屏幕的右上角（此时宽高互换），围绕原点逆时针旋转90°后，画布与原位置垂直，居于屏幕右侧，需要向左平移画布当前高度相同的距离。
  case -90:
    context.translate(-height, 0);
    break;
  // 页面逆时针旋转90°后，画布左上角的原点位置落到了屏幕的左下角（此时宽高互换），围绕原点顺时针旋转90°后，画布与原位置垂直，居于屏幕下侧，需要向上平移画布当前宽度相同的距离。
  case 90:
    context.translate(0, -width);
    break;
  // 页面顺逆时针旋转180°回到了同一个位置（即页面倒立），画布左上角的原点位置落到了屏幕的右下角（此时宽高不变），围绕原点反方向旋转180°后，画布与原位置平行，居于屏幕右侧的下侧，需要向左平移画布宽度相同的距离，向右平移画布高度的距离。
  case -180:
  case 180:
    context.translate(-width, -height);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">context.rotate((degree * <span class="hljs-built_in">Math</span>.PI) / <span class="hljs-number">180</span>);
<span class="hljs-keyword">switch</span> (degree) {
  <span class="hljs-comment">// 页面顺时针旋转90°后，画布左上角的原点位置落到了屏幕的右上角（此时宽高互换），围绕原点逆时针旋转90°后，画布与原位置垂直，居于屏幕右侧，需要向左平移画布当前高度相同的距离。</span>
  <span class="hljs-keyword">case</span> <span class="hljs-number">-90</span>:
    context.translate(-height, <span class="hljs-number">0</span>);
    <span class="hljs-keyword">break</span>;
  <span class="hljs-comment">// 页面逆时针旋转90°后，画布左上角的原点位置落到了屏幕的左下角（此时宽高互换），围绕原点顺时针旋转90°后，画布与原位置垂直，居于屏幕下侧，需要向上平移画布当前宽度相同的距离。</span>
  <span class="hljs-keyword">case</span> <span class="hljs-number">90</span>:
    context.translate(<span class="hljs-number">0</span>, -width);
    <span class="hljs-keyword">break</span>;
  <span class="hljs-comment">// 页面顺逆时针旋转180°回到了同一个位置（即页面倒立），画布左上角的原点位置落到了屏幕的右下角（此时宽高不变），围绕原点反方向旋转180°后，画布与原位置平行，居于屏幕右侧的下侧，需要向左平移画布宽度相同的距离，向右平移画布高度的距离。</span>
  <span class="hljs-keyword">case</span> <span class="hljs-number">-180</span>:
  <span class="hljs-keyword">case</span> <span class="hljs-number">180</span>:
    context.translate(-width, -height);
}</code></pre>
<p>拥有了对画布坐标系重置的能力，我们能够将画布逆时针旋转90°、甚至180°，都是可行的。如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010120564" src="https://static.alili.tech/img/remote/1460000010120564" alt="页面逆时针旋转90°" title="页面逆时针旋转90°" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010120565" src="https://static.alili.tech/img/remote/1460000010120565" alt="页面顺时针旋转180°" title="页面顺时针旋转180°" style="cursor: pointer;"></span></p>
<p>当然重置画布坐标系后，需要注意清屏时，清屏的范围也有可能发生变化，需要稍作如下处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const clear = () => {
  let width;
  let height;
  switch (this.degree) { // this.degree是画布坐标系旋转的度数
    case -90:
    case 90:
      width = this.height; // 画布旋转之前的高度
      height = this.width; // 画布选择之前的宽度
      break;
    default:
      width = this.width;
      height = this.height;
  }
  this.context.clearRect(0, 0, width, height);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> clear = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> width;
  <span class="hljs-keyword">let</span> height;
  <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.degree) { <span class="hljs-comment">// this.degree是画布坐标系旋转的度数</span>
    <span class="hljs-keyword">case</span> <span class="hljs-number">-90</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-number">90</span>:
      width = <span class="hljs-keyword">this</span>.height; <span class="hljs-comment">// 画布旋转之前的高度</span>
      height = <span class="hljs-keyword">this</span>.width; <span class="hljs-comment">// 画布选择之前的宽度</span>
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
      width = <span class="hljs-keyword">this</span>.width;
      height = <span class="hljs-keyword">this</span>.height;
  }
  <span class="hljs-keyword">this</span>.context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, width, height);
};</code></pre>
<p>方案一简单粗暴，布局上，canvas画布虽然不需要旋转，但需要单独绝对定位布局，给页面视觉展示带来不便，同时，上传图片之前需要对图片做旋转、缩放等处理，流程复杂。</p>
<p>方案二用纠正画布坐标系的方式，省去了布局和图片上的特殊处理，一步到位，因此方案二更佳。</p>
<p>以上，涉及的代码可以在这里找到：<a href="https://github.com/Louiszhai/canvas-draw" rel="nofollow noreferrer" target="_blank">canvas-draw</a>，这是一个借助vue cli 搭建起来的壳，主要是为了方便调试，核心代码见 <a href="https://github.com/Louiszhai/canvas-draw/blob/master/src/utils/draw.js" rel="nofollow noreferrer" target="_blank">canvas-draw/draw.js</a>，喜欢的同学不妨轻点star。</p>
<hr>
<p>本问就讨论这么多内容,大家有什么问题或好的想法欢迎在下方参与留言和评论.</p>
<p>本文作者：<a href="https://github.com/Louiszhai" rel="nofollow noreferrer" target="_blank">louis</a></p>
<p>本文链接: <a href="http://louiszhai.github.io/2017/07/07/canvas-draw/" rel="nofollow noreferrer" target="_blank">http://louiszhai.github.io/20...</a></p>
<p>参考文章：</p>
<ul>
<li><p><a href="http://www.cnblogs.com/hemei/p/4252817.html" rel="nofollow noreferrer" target="_blank">HTML5 canvas transform与矩阵</a></p></li>
<li><p><a href="http://www.cnblogs.com/fangsmile/p/5647390.html" rel="nofollow noreferrer" target="_blank">Canvas之平移translate、旋转rotate、缩放scale</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
匠心打造canvas签名组件

## 原文链接
[https://segmentfault.com/a/1190000010120557](https://segmentfault.com/a/1190000010120557)

