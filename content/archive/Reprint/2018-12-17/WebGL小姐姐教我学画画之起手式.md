---
title: 'WebGL小姐姐教我学画画之起手式' 
date: 2018-12-17 2:30:07
hidden: true
slug: y2tlgaaylbf
categories: [reprint]
---

{{< raw >}}

                    
<p>初次接触WebGL，如有错误之处欢迎留言，共同学习进步. <em>v</em></p>
<h2 id="articleHeader0">WebGL的自画像</h2>
<p>我，WebGL，全名<code>Web Graphics Library</code>，是为了让死宅程序猿们(摊手)能在浏览器上为所欲为的画女朋友，并还能动手动脚，而屈尊降临于猿类的世界内。哇哈哈哈哈，快来臣服于我吧，哇嘎嘎嘎嗝~</p>
<h2 id="articleHeader1">WebGL启动说明书</h2>
<p>WebGL小姐姐神通广大，法力无边。那我们怎么用她来创造一个猿猿幸（有）福（女）美（朋）满（友）的世界呢？</p>
<p>首先，我们需要一个名为<code>canvas</code>的祭坛，举行一个召唤<code>WebGL</code>小姐姐的小仪式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
<span class="hljs-keyword">const</span> gl = canvas.getContext(<span class="hljs-string">'webgl'</span>);</code></pre>
<p>那么，<code>WebGL</code>小姐姐Get到手了，接下来我们需要先将两样'祭品'交给她的两名侍女。</p>
<ol><li>准备用于创建躯体的原材料和赋予灵魂的色彩两样祭品</li></ol>
<ul><li>
<code>gl_Position</code>是每次绘制的点，是vec4类型，分别空间点<code>(x, y, z)</code>和最后一个<code>w</code>。对于<code>w</code>可以参考文章<a href="https://www.tomdalling.com/blog/modern-opengl/explaining-homogenous-coordinates-and-projective-geometry/" rel="nofollow noreferrer" target="_blank">Explaining Homogeneous Coordinates &amp; Projective Geometry</a>，可以理解为投影仪与空间点的距离，距离不同会导致缩放效应，距离远则投放的物体越大。我们这里使用没有缩放效果的值<code>1.0</code>，并使用了<code>position</code>这个定义的变量值。每次绘制<code>gpu buffer</code>会更新<code>position</code>的值.</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vertexShaderSource = `
precision mediump float;
attribute vec2 position;

void main(void) {
    gl_Position = vec4(position.x, position.y, 0.0, 1.0);
}
`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> vertexShaderSource = <span class="hljs-string">`
precision mediump float;
attribute vec2 position;

void main(void) {
    gl_Position = vec4(position.x, position.y, 0.0, 1.0);
}
`</span>;</code></pre>
<ul><li>每次绘制都会使用<code>glFragColor</code>定义的颜色值，同样是vec4类型，分别代表<code>(r, g, b, a)</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fragmentShaderSource = `
precision mediump float;

void main(void) {
    gl_FragColor = vec4(0.7, 0.5, 0.38, 0.0);
}
`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fragmentShaderSource = <span class="hljs-string">`
precision mediump float;

void main(void) {
    gl_FragColor = vec4(0.7, 0.5, 0.38, 0.0);
}
`</span></code></pre>
<blockquote>关于<code>precision</code>：由于<code>openGL</code>没有声明<code>float</code>类型的默认精度，所以其姐妹<code>WebGL</code>也就需要为<code>shader</code>声明精度。又由于高精度<code>openGL</code>没有支持，低精度在手机上可以有兼容问题，所以默认推荐<code>mediump</code>。参考<a href="https://stackoverflow.com/a/28540641/2326199" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/a/28540641/2326199</a> 和 <a href="https://developers.google.com/web/updates/2011/12/Use-mediump-precision-in-WebGL-when-possible" rel="nofollow noreferrer" target="_blank">Use mediump precision in WebGL when possible</a>
</blockquote>
<ol><li>唤醒侍女并让她们把祭品处理好</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const vertexShader = gl.createShader(gl.VERTEX_SHADER); // 唤醒
gl.shaderSource(vertexShader, vertexShaderSource); // 上交祭品
gl.compileShader(vertexShader); // 处理祭品
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    // 由于祭品偶尔不新鲜或者侍女偷懒，我们要好好确认祭品是否处理完毕
    throw new Error(`Error in compileing vertexShader: ${gl.getShaderInfoLog(vertexShader)}`);
}


const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw new Error(`Error in compileing vertexShader: ${gl.getShaderInfoLog(vertexShader)}`);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> vertexShader = gl.createShader(gl.VERTEX_SHADER); <span class="hljs-comment">// 唤醒</span>
gl.shaderSource(vertexShader, vertexShaderSource); <span class="hljs-comment">// 上交祭品</span>
gl.compileShader(vertexShader); <span class="hljs-comment">// 处理祭品</span>
<span class="hljs-keyword">if</span> (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    <span class="hljs-comment">// 由于祭品偶尔不新鲜或者侍女偷懒，我们要好好确认祭品是否处理完毕</span>
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Error in compileing vertexShader: <span class="hljs-subst">${gl.getShaderInfoLog(vertexShader)}</span>`</span>);
}


<span class="hljs-keyword">const</span> fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
<span class="hljs-keyword">if</span> (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Error in compileing vertexShader: <span class="hljs-subst">${gl.getShaderInfoLog(vertexShader)}</span>`</span>);
}</code></pre>
<p>祭品已准备妥当，接下来就是要请出<code>WebGL</code>小姐姐御用创世神器<code>program</code>并使用祭品开光，然后交与小姐姐手中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const program = gl.createProgram(); // 神器现世
gl.attachShader(program, vertexShader); // 开第一封印：原料
gl.attachShader(program, fragmentShader); // 开第二封印：色开
gl.linkProgram(program); // 交与小姐姐

if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // 咳咳，由于神器与祭品偶尔无法契合，导致神器失效，需要检查一下 ~_~
    throw new Error(`invalid program: ${gl.getProgramInfoLog(program)}`);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> program = gl.createProgram(); <span class="hljs-comment">// 神器现世</span>
gl.attachShader(program, vertexShader); <span class="hljs-comment">// 开第一封印：原料</span>
gl.attachShader(program, fragmentShader); <span class="hljs-comment">// 开第二封印：色开</span>
gl.linkProgram(program); <span class="hljs-comment">// 交与小姐姐</span>

<span class="hljs-keyword">if</span>(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    <span class="hljs-comment">// 咳咳，由于神器与祭品偶尔无法契合，导致神器失效，需要检查一下 ~_~</span>
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`invalid program: <span class="hljs-subst">${gl.getProgramInfoLog(program)}</span>`</span>);
}
</code></pre>
<p>注意了注意了，<code>WebGL</code>小姐姐起手式完毕，开天辟地，万物复苏。我们现在可以向她许愿，描述我们心中的<code>猩福世界</code>了~v;v~</p>
<h3 id="articleHeader2">WebGL的许愿池上的许愿树</h3>
<p><code>WebGL</code>小姐姐有多个许愿池，我们这里使用<code>gl.ARRAY_BUFFER</code>。然后告诉神器<code>program</code>怎么收取愿望。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const buffer = gl.createBuffer(); // 创建许愿树
gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // 将许愿树种到`ARRAY_BUFFER`这个许愿池内

// 获取神器`program`的`position`之力
const position = gl.getAttribLocation(program, 'position');
// position之力为2个float类型的数一组，不转化`buffer`类型，
// 从头开始，不跳过任何一个愿望
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(position);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> buffer = gl.createBuffer(); <span class="hljs-comment">// 创建许愿树</span>
gl.bindBuffer(gl.ARRAY_BUFFER, buffer); <span class="hljs-comment">// 将许愿树种到`ARRAY_BUFFER`这个许愿池内</span>

<span class="hljs-comment">// 获取神器`program`的`position`之力</span>
<span class="hljs-keyword">const</span> position = gl.getAttribLocation(program, <span class="hljs-string">'position'</span>);
<span class="hljs-comment">// position之力为2个float类型的数一组，不转化`buffer`类型，</span>
<span class="hljs-comment">// 从头开始，不跳过任何一个愿望</span>
gl.vertexAttribPointer(position, <span class="hljs-number">2</span>, gl.FLOAT, <span class="hljs-literal">false</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
gl.enableVertexAttribArray(position);</code></pre>
<h3 id="articleHeader3">WebGl的创世之作</h3>
<p>小姐姐迎着丝毫都没有的狂风，望着漫无编辑器的虚无黑暗，眼角迸发出一丝丝精光，大笔一挥, 左一划右一挥。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gl.viewport(0, 0, 400, 400);
gl.useProgram(program);

gl.clearColor(255 / 255, 192 / 255, 203 / 255, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.lineWidth(1.5);

const points = new Float32Array([
    -0.9, 0.9,
    0.0, 0.0,
    0.9, -0.9,
]);

gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.drawArrays(gl.LINE_LOOP, 0, points.length / 2);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -0.9, -0.9,
    0.0, 0.0,
    0.9, 0.9
]), gl.STATIC_DRAW);
gl.drawArrays(gl.LINE_LOOP, 0, 3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>gl.viewport(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">400</span>, <span class="hljs-number">400</span>);
gl.useProgram(program);

gl.clearColor(<span class="hljs-number">255</span> / <span class="hljs-number">255</span>, <span class="hljs-number">192</span> / <span class="hljs-number">255</span>, <span class="hljs-number">203</span> / <span class="hljs-number">255</span>, <span class="hljs-number">1.0</span>);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.lineWidth(<span class="hljs-number">1.5</span>);

const points = new Float32Array([
    <span class="hljs-number">-0.9</span>, <span class="hljs-number">0.9</span>,
    <span class="hljs-number">0.0</span>, <span class="hljs-number">0.0</span>,
    <span class="hljs-number">0.9</span>, <span class="hljs-number">-0.9</span>,
]);

gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
gl.drawArrays(gl.LINE_LOOP, <span class="hljs-number">0</span>, points.length / <span class="hljs-number">2</span>);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    <span class="hljs-number">-0.9</span>, <span class="hljs-number">-0.9</span>,
    <span class="hljs-number">0.0</span>, <span class="hljs-number">0.0</span>,
    <span class="hljs-number">0.9</span>, <span class="hljs-number">0.9</span>
]), gl.STATIC_DRAW);
gl.drawArrays(gl.LINE_LOOP, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>);</code></pre>
<p>创世之作在漫天闪电，山崩海啸之下庄严出世!! 登登登，piapia(背景乐)</p>
<p><span class="img-wrap"><img data-src="/img/bV109R?w=800&amp;h=804" src="https://static.alili.tech/img/bV109R?w=800&amp;h=804" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>最后来一张<code>WebGL</code>绘制整个过程的流程图：</p>
<p><span class="img-wrap"><img data-src="/img/bV109T?w=1708&amp;h=1138" src="https://static.alili.tech/img/bV109T?w=1708&amp;h=1138" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>未完待续</strong></p>
<hr>
<p>本文章首发于本人公众号：枫之叶</p>
<p><span class="img-wrap"><img data-src="/img/bV1gCE?w=258&amp;h=258" src="https://static.alili.tech/img/bV1gCE?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>若您能喜欢本文，并欲转发本文请保留<strong>公众号声明与公众号二维码</strong>。谢谢 ^v^</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebGL小姐姐教我学画画之起手式

## 原文链接
[https://segmentfault.com/a/1190000012835128](https://segmentfault.com/a/1190000012835128)

