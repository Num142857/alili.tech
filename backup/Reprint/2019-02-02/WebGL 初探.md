---
title: 'WebGL 初探' 
date: 2019-02-02 2:30:11
hidden: true
slug: 0ux7b50f8tw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>该文章于一天前发表在 github，若有问题可提至 <a href="https://github.com/sundway/blog/issues/3" rel="nofollow noreferrer" target="_blank">github</a>。</p></blockquote>
<p>目前，我们有很多方案可以快速的接触到 WebGL 并绘制复杂的图形，但最后发现我们忽视了很多细节性的东西。当然，这对初学 WebGL 是有必要的，它能迅速提起我们对 WebGL 的学习兴趣。当学习到更加深入的阶段时，我们更想了解 WebGL 的工作机制，这也将对我们编程有极大的帮助。以上也是我想写这样一个系列的原因。</p>
<h2 id="articleHeader0">简介</h2>
<p>用更专业的描述讲，WebGL (Web Graphics Library) 是一个用以渲染交互式 3D 和 2D 图形的无需插件且兼容下一代浏览器的 JavaScript API，通过 HTML5 中 &lt;canvas&gt; 元素实现功能。WebGL 是由 Khronos Group 集团制定，而非 W3C 组织。目前，我们可以使用的是 WebGL 第一个版本，它继承自 OpenGL ES 2.0 。而 OpenGL ES (OpenGL for Embedded Systems) 是 OpenGL 三维图形 API 的子集，针对手机、PDA 和游戏主机等嵌入式设备而设计。以下是各版本之间的关系图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007106472?w=916&amp;h=417" src="https://static.alili.tech/img/remote/1460000007106472?w=916&amp;h=417" alt="版本关系" title="版本关系" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">Hello World</h2>
<p>首先，我们将通过实现一个简单的 WebGL 程序（清空绘图区）叩开 WebGL 的大门。下面将实现一个最简单的 WebGL 功能：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007106473?w=809&amp;h=82" src="https://static.alili.tech/img/remote/1460000007106473?w=809&amp;h=82" alt="处理流程" title="处理流程" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">创建 canvas 元素</h3>
<p>WebGL 采用 HTML5 中的 &lt;canvas&gt; 元素。为了使用 WebGL 进行 3D 渲染，你首先需要一个 canvas 元素。这里创建了一个 canvas 元素，并使用 onload 事件创建来初始化 WebGL 上下文。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body onload=&quot;start()&quot;>
  <canvas id=&quot;glcanvas&quot; width=&quot;640&quot; height=&quot;480&quot;>
    Your browser doesn't appear to support the HTML5 <code>&amp;lt;canvas&amp;gt;</code> element.
  </canvas>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"start()"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"glcanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"640"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"480"</span>&gt;</span>
    Your browser doesn't appear to support the HTML5 <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>&amp;lt;canvas&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span> element.
  <span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h3 id="articleHeader3">获取 WebGL 上下文</h3>
<p>目前，各浏览器基本都实现了对 WebGL 的支持，但 IE11 及 Edge 浏览器稍微有些不同。以下是对初始化 WebGL 的基本封装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initWebGL(canvas) {
  // 创建全局变量
  window.gl = null;
  
  try {
    // 尝试获取标准上下文，如果失败，回退到试验性上下文
    gl = canvas.getContext(&quot;webgl&quot;) || canvas.getContext(&quot;experimental-webgl&quot;);
  }
  catch(e) {
    throw '创建失败。';
  }
  
  // 如果没有GL上下文，马上放弃
  if (!gl) {
    alert(&quot;WebGL初始化失败，可能是因为您的浏览器不支持。&quot;);
    gl = null;
  }
  return gl;
}       " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initWebGL</span>(<span class="hljs-params">canvas</span>) </span>{
  <span class="hljs-comment">// 创建全局变量</span>
  <span class="hljs-built_in">window</span>.gl = <span class="hljs-literal">null</span>;
  
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 尝试获取标准上下文，如果失败，回退到试验性上下文</span>
    gl = canvas.getContext(<span class="hljs-string">"webgl"</span>) || canvas.getContext(<span class="hljs-string">"experimental-webgl"</span>);
  }
  <span class="hljs-keyword">catch</span>(e) {
    <span class="hljs-keyword">throw</span> <span class="hljs-string">'创建失败。'</span>;
  }
  
  <span class="hljs-comment">// 如果没有GL上下文，马上放弃</span>
  <span class="hljs-keyword">if</span> (!gl) {
    alert(<span class="hljs-string">"WebGL初始化失败，可能是因为您的浏览器不支持。"</span>);
    gl = <span class="hljs-literal">null</span>;
  }
  <span class="hljs-keyword">return</span> gl;
}       </code></pre>
<p>这里通过采用 canvas 的 <code>getContext(contextType, contextAttributes)</code> 方法判断浏览器是否支持 WebGL，并创建其上下文。当返回值是 canvas 的上下文时，浏览器可支持 WebGL，为 null 时，则创建失败。注意，在 IE11 及 Edge 浏览器下，需要使用 "experimental-webgl" 创建 WebGL，此处做了兼容处理。</p>
<h3 id="articleHeader4">清空绘图区</h3>
<p>下面将背景颜色设置为黑色，并清空缓存区。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gl; // WebGL的全局变量

function start() {
  var canvas = document.getElementById(&quot;glcanvas&quot;);

  // 初始化 WebGL 上下文
  gl = initWebGL(canvas);   
  
  // 只有在 WebGL 可用的时候才继续
  
  if (gl) {
    // 设置清除颜色为黑色，不透明
    gl.clearColor(0.0, 0.0, 0.0, 1.0);     
    // 清除颜色和深度缓存
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);     
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">gl</span>; <span class="hljs-comment">// WebGL的全局变量</span>

function start() {
  <span class="hljs-keyword">var</span> canvas = document.getElementById(<span class="hljs-string">"glcanvas"</span>);

  <span class="hljs-comment">// 初始化 WebGL 上下文</span>
  <span class="hljs-keyword">gl</span> = initWebGL(canvas);   
  
  <span class="hljs-comment">// 只有在 WebGL 可用的时候才继续</span>
  
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">gl</span>) {
    <span class="hljs-comment">// 设置清除颜色为黑色，不透明</span>
    <span class="hljs-keyword">gl</span>.clearColor(0.0, 0.0, 0.0, 1.0);     
    <span class="hljs-comment">// 清除颜色和深度缓存</span>
    <span class="hljs-keyword">gl</span>.<span class="hljs-keyword">clear</span>(<span class="hljs-keyword">gl</span>.COLOR_BUFFER_BIT|<span class="hljs-keyword">gl</span>.DEPTH_BUFFER_BIT);     
  }
}</code></pre>
<p>这样，我们可以在浏览器中看到一块黑色区域。你可能已经注意到，WebGL 遵循的是传统 OpenGL 颜色分量的取值范围，从 0.0 到 1.0。RGB 的值越高，颜色越亮。注意，<code>clear()</code> 方法在这里清除颜色和深度缓存，而不是绘制区域的 &lt;canvas&gt;，该方法继承自 OpenGL（基于多缓存模型）。实际还有模版缓存，但实际很少会被用到。</p>
<h2 id="articleHeader5">更进一步</h2>
<p>上面我们完成了第一个 WebGL 程序，但是我们还未接触到 WebGL 的核心：可编程着色器。接下来，我们将使用可编程着色器在屏幕上绘制点。可编程着色器是一个较为复杂的概念，也有自己的编程语言 <a href="https://www.opengl.org/documentation/glsl/" rel="nofollow noreferrer" target="_blank">GLSL</a>，后面将会又专门的文章具体讲解可编程着色器。这里我们只需要简单了解绘制的流程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007106474?w=888&amp;h=152" src="https://static.alili.tech/img/remote/1460000007106474?w=888&amp;h=152" alt="处理流程" title="处理流程" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">编写着色器程序</h3>
<p>WebGL 是无法像 OpenGL 利用固定渲染管线，代替它的是可编辑渲染管线中的 GLSL 着色语言。下面是顶点及片元着色器 GLSL 程序，用字符串表示，它将直接运行在浏览器之上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 顶点着色器程序
var VSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // 设置顶点位置
  '  gl_PointSize = 10.0;\n' +                    // 设置点的大小
  '}\n';

// 片元着色器程序
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n' + // 设置点的颜色，此处为白色
  '}\n';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 顶点着色器程序</span>
<span class="hljs-keyword">var</span> VSHADER_SOURCE = 
  <span class="hljs-string">'void main() {\n'</span> +
  <span class="hljs-string">'  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n'</span> + <span class="hljs-comment">// 设置顶点位置</span>
  <span class="hljs-string">'  gl_PointSize = 10.0;\n'</span> +                    <span class="hljs-comment">// 设置点的大小</span>
  <span class="hljs-string">'}\n'</span>;

<span class="hljs-comment">// 片元着色器程序</span>
<span class="hljs-keyword">var</span> FSHADER_SOURCE =
  <span class="hljs-string">'void main() {\n'</span> +
  <span class="hljs-string">'  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n'</span> + <span class="hljs-comment">// 设置点的颜色，此处为白色</span>
  <span class="hljs-string">'}\n'</span>;</code></pre>
<p>上面程序是不是有中似曾相识的感觉？没错，GLSL 语言和 C 语言很类似。着色器程序中包含一个主函数，且返回值为空。其中 <code>vec4()</code> 构造函数用于生成一个四维向量（x,y,z,w）。</p>
<h3 id="articleHeader7">编译着色器</h3>
<p>首先，需要用 <code>createShader( type )</code> 方法生成相应类型的 WebGLShader。接着，使用 <code>shaderSource( shader, sourceCode )</code> 作为 GLSL 源码的钩子函数。最后使用 <code>compileShader( shader )</code> 完成对着色器的编译。程序中我们做了编译后的校验，当着色器编译失败时，会报出失败并删除着色器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createShader (gl, type, sourceCode) {
  // 编译着色器类型：顶点着色器及片元着色器。
  var shader = gl.createShader( type );
  gl.shaderSource( shader, sourceCode );
  gl.compileShader( shader );

  if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
    var info = gl.getShaderInfoLog( shader );
    console.log( &quot;无法编译 WebGL 程序。 \n\n&quot; + info);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function createShader (<span class="hljs-keyword">gl</span>, <span class="hljs-keyword">type</span>, sourceCode) {
  <span class="hljs-comment">// 编译着色器类型：顶点着色器及片元着色器。</span>
  <span class="hljs-keyword">var</span> shader = <span class="hljs-keyword">gl</span>.createShader( <span class="hljs-keyword">type</span> );
  <span class="hljs-keyword">gl</span>.shaderSource( shader, sourceCode );
  <span class="hljs-keyword">gl</span>.compileShader( shader );

  <span class="hljs-keyword">if</span> ( !<span class="hljs-keyword">gl</span>.getShaderParameter(shader, <span class="hljs-keyword">gl</span>.COMPILE_STATUS) ) {
    <span class="hljs-keyword">var</span> info = <span class="hljs-keyword">gl</span>.getShaderInfoLog( shader );
    console.<span class="hljs-built_in">log</span>( <span class="hljs-string">"无法编译 WebGL 程序。 \n\n"</span> + info);
    <span class="hljs-keyword">gl</span>.deleteShader(shader);
    <span class="hljs-keyword">return</span> null;
  }

  <span class="hljs-keyword">return</span> shader;
}</code></pre>
<h3 id="articleHeader8">连接到可用程序</h3>
<p>此时，着色器仍是不可用的，需要将其赋值到 WebGLProgram 上。这里主要进行了三步操作，首先，需要使用 <code>createProgram()</code> 方法创建和初始化一个 WebGLProgram 对象。接着，使用 <code> gl.attachShader(program, shader)</code> 将该对象结合两个已经编译的着色器。最后，使用 <code>linkProgram(program)</code> 将 WebGLProgram 和着色器连接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createProgram(gl, vshader, fshader) {
  // 创建着色器对象
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // 创建编程对象
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // 赋值已创建的着色器对象
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // 连接编程对象
  gl.linkProgram(program);

  // 检查链接结果
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('链接程序失败：' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function createProgram(<span class="hljs-keyword">gl</span>, vshader, fshader) {
  <span class="hljs-comment">// 创建着色器对象</span>
  <span class="hljs-keyword">var</span> vertexShader = createShader(<span class="hljs-keyword">gl</span>, <span class="hljs-keyword">gl</span>.VERTEX_SHADER, vshader);
  <span class="hljs-keyword">var</span> fragmentShader = createShader(<span class="hljs-keyword">gl</span>, <span class="hljs-keyword">gl</span>.FRAGMENT_SHADER, fshader);
  <span class="hljs-keyword">if</span> (!vertexShader || !fragmentShader) {
    <span class="hljs-keyword">return</span> null;
  }

  <span class="hljs-comment">// 创建编程对象</span>
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">program</span> = <span class="hljs-keyword">gl</span>.createProgram();
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">program</span>) {
    <span class="hljs-keyword">return</span> null;
  }

  <span class="hljs-comment">// 赋值已创建的着色器对象</span>
  <span class="hljs-keyword">gl</span>.attachShader(<span class="hljs-keyword">program</span>, vertexShader);
  <span class="hljs-keyword">gl</span>.attachShader(<span class="hljs-keyword">program</span>, fragmentShader);

  <span class="hljs-comment">// 连接编程对象</span>
  <span class="hljs-keyword">gl</span>.linkProgram(<span class="hljs-keyword">program</span>);

  <span class="hljs-comment">// 检查链接结果</span>
  <span class="hljs-keyword">var</span> linked = <span class="hljs-keyword">gl</span>.getProgramParameter(<span class="hljs-keyword">program</span>, <span class="hljs-keyword">gl</span>.LINK_STATUS);
  <span class="hljs-keyword">if</span> (!linked) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">error</span> = <span class="hljs-keyword">gl</span>.getProgramInfoLog(<span class="hljs-keyword">program</span>);
    console.<span class="hljs-built_in">log</span>('链接程序失败：' + <span class="hljs-keyword">error</span>);
    <span class="hljs-keyword">gl</span>.deleteProgram(<span class="hljs-keyword">program</span>);
    <span class="hljs-keyword">gl</span>.deleteShader(fragmentShader);
    <span class="hljs-keyword">gl</span>.deleteShader(vertexShader);
    <span class="hljs-keyword">return</span> null;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">program</span>;
}</code></pre>
<h3 id="articleHeader9">使用可用着色器程序</h3>
<p>这一步主要使用 <code>useProgram(program)</code> 方法告诉 GPU 使用程序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('创建程序失败。');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function initShaders(<span class="hljs-keyword">gl</span>, vshader, fshader) {
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">program</span> = createProgram(<span class="hljs-keyword">gl</span>, vshader, fshader);
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">program</span>) {
    console.<span class="hljs-built_in">log</span>('创建程序失败。');
    <span class="hljs-keyword">return</span> false;
  }

  <span class="hljs-keyword">gl</span>.useProgram(<span class="hljs-keyword">program</span>);
  <span class="hljs-keyword">gl</span>.<span class="hljs-keyword">program</span> = <span class="hljs-keyword">program</span>;

  <span class="hljs-keyword">return</span> true;
}</code></pre>
<h3 id="articleHeader10">绘制一个点</h3>
<p>最后，使用 <code>drawArrays(mode, first, count)</code> 绘制一个点，该函数是一个非常强大的渲染函数，后续文章会有详细介绍。此处只需要知道传入 "POINTS" 绘制了一个点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 绘制一个点
gl.drawArrays(gl.POINTS, 0, 1);   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 绘制一个点</span>
gl.drawArrays(gl.POINTS, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);   </code></pre>
<p>至此，我们已经完成了绘制一个点的全部程序。当运行以上程序时，我们会在浏览器中看到一个白色的点。</p>
<h2 id="articleHeader11">结束语</h2>
<p>到现在，我们虽然还没有使用 WebGL 绘制三维图形，但我们已经进入了 WebGL 世界。我们已经使用 WebGL 绘制了简单的图形。但是这只是 WebGL 的绘制的冰山一角，我们使用 WebGL 当然不是为了绘制这样一个简单的图形。为了绘制更复杂的图形，我们还有很多的细节需要去了解。但是无论如何，我们都已经开启了 WebGL 的第一步，其实问题也并没有我们想象的那么难。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebGL 初探

## 原文链接
[https://segmentfault.com/a/1190000007106469](https://segmentfault.com/a/1190000007106469)

