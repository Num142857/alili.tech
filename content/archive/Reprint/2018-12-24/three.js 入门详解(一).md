---
title: 'three.js 入门详解(一)' 
date: 2018-12-24 2:30:06
hidden: true
slug: el0qwk9hsr
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012581680?w=1920&amp;h=1080" src="https://static.alili.tech/img/remote/1460000012581680?w=1920&amp;h=1080" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">1. 概述</h2>
<h3 id="articleHeader1">1.1 什么是WebGL？</h3>
<blockquote>WebGL是在浏览器中实现三维效果的一套规范</blockquote>
<ul><li>想要使用WebGL原生的API来写3D效果的话，很吃力。three.js是WebGL的一个开源框架，它省去了很多麻烦的细节。</li></ul>
<h3 id="articleHeader2">1.2 初识three.js</h3>
<blockquote>什么是threejs，很简单，你将它理解成<code>three+js</code>就可以了。<code>three表示3D的意思</code>，<code>js表示javascript的意思</code>。那么合起来，<code>three.js</code>就是使用<code>javascript </code>来写<code>3D程序</code>的意思。</blockquote>
<ul><li>Javascript是运行在网页端的脚本语言，那么毫无疑问<code>Three.js</code>也是运行在<code>浏览器</code>上的。</li></ul>
<h3 id="articleHeader3">1.3 前期准备</h3>
<h4>1.3.1 下载地址</h4>
<ul><li>three.js <a href="https://github.com/mrdoob/three.js" rel="nofollow noreferrer" target="_blank">下载地址</a>
</li></ul>
<h4>1.3.2 目录结构</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238581?w=313&amp;h=317" src="https://static.alili.tech/img/remote/1460000012238581?w=313&amp;h=317" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<strong>Build目录：</strong> 包含两个文件，three.js 和three.min.js 。这是three.js最终被引用的文件。一个已经压缩，一个没有压缩的js文件。</li>
<li>
<strong>Docs目录：</strong> 这里是three.js的帮助文档，里面是各个函数的api，可惜并没有详细的解释。试图用这些文档来学会three.js是不可能的。</li>
<li>
<strong>Editor目录：</strong> 一个类似3D-max的简单编辑程序，它能创建一些三维物体。</li>
<li>
<strong>Examples目录：</strong> 一些很有趣的例子demo，可惜没有文档介绍。对图像学理解不深入的同学，学习成本非常高。</li>
<li>
<strong>Src目录：</strong> 源代码目录，里面是所有源代码。</li>
<li>
<strong>Test目录：</strong> 一些测试代码，基本没用。</li>
<li>
<strong>Utils目录：</strong> 存放一些脚本，python文件的工具目录。例如将3D-Max格式的模型转换为three.js特有的json模型。</li>
<li>
<strong>.gitignore文件：</strong> git工具的过滤规则文件，没有用。</li>
<li>
<strong>CONTRIBUTING.md文件：</strong> 一个怎么报bug，怎么获得帮助的说明文档。</li>
<li>
<strong>LICENSE文件：</strong> 版权信息。</li>
<li>
<strong>README.md文件：</strong> 介绍three.js的一个文件，里面还包含了各个版本的更新内容列表。</li>
</ul>
<h4>1.3.3 配置开发环境</h4>
<ul>
<li>
<strong>浏览器：</strong> 推荐使用高版本的浏览器，谷歌、火狐、360等，对于前端开发者来说，chrome是不二的选择</li>
<li>
<strong>js 开发工具：</strong> VS-code、Webstorm 都可以，为了方便下面的学习，这里使用Webstorm</li>
<li>
<strong>Three.js 调试：</strong> 利用谷歌浏览器的调试窗口，使用断点调试的方法</li>
</ul>
<h2 id="articleHeader4">2. 开始使用Three.js</h2>
<blockquote>使用Three.js之前，首先在<code>&lt;head&gt;</code>部分，需要引入外部文件<code>Three.js</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
    <script type=&quot;text/javascript&quot; src=&quot;three.js&quot;></script>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<blockquote>WebGL 的渲染是需要HTML5 中的<code>Canvas</code>元素的，你可以手动在HTML的<code>&lt;body&gt;</code>部分中使用canvas标签，或者让Three.js帮你生成。这两种选择，一般没有多大差别。我们先手动定义一个canvas标签：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body onload=&quot;init();&quot;>
    <canvas id=&quot;canvasId&quot; width=&quot;800&quot; height=&quot;600&quot;></canvas>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvasId"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"800"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"600"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<blockquote>在js里面定义一个函数，将所有执行的代码放在函数里，在html加载完成后，执行该函数</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function init{
    // 所有需要执行的代码
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span></span>{
    <span class="hljs-comment">// 所有需要执行的代码</span>
}</code></pre>
<p>一个典型的Three.js程序，至少应该包括四个部分：<code>渲染器(renderer)</code>、<code>场景(scene)</code>、<code>相机(camera)</code>、<code>以及场景中创建的物体</code>。</p>
<h3 id="articleHeader5">2.1 渲染器(renderer)</h3>
<blockquote>
<code>渲染器</code>决定了<code>渲染的结果</code>应该画在<code>页面的什么元素上面</code>，并且<code>以怎样的方式来绘制</code>。<p>渲染器将会和canvas元素进行绑定，如果之前<code>&lt;html&gt;</code>标签中，定义了<code>id为canvasId的canvas标签</code>，那么renderer可以这样写：</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var renderer = new THREE.WebGLRenderer({
    canvas : document.getElementById('canvasId');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer({
    <span class="hljs-attr">canvas</span> : <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvasId'</span>);
});</code></pre>
<blockquote>如果想要<code>Three.js生成Canvas元素</code>的时候，在html中就不需要在定义一个canvas标签了，直接在javascript代码中写道：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var renderer = new THREE.WebGLRenderer();
renderer.setSize = (800,600);
document.body.appendChild(renderer.domElement);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
renderer.setSize = (<span class="hljs-number">800</span>,<span class="hljs-number">600</span>);
<span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);</code></pre>
<ul><li>上面的代码<code>setSize</code>是为canvas元素设置宽高，<code>document.body.appendChild(renderer.domElement)</code>是将渲染器对应的Canvas元素添加到<code>body</code>中。</li></ul>
<blockquote>我们可以使用下面的代码(用于清除画面的颜色)将背景色设置为黑色：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderer.setClearColor(0x000000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">renderer.setClearColor(<span class="hljs-number">0x000000</span>);</code></pre>
<h3 id="articleHeader6">2.2 场景(scene)</h3>
<blockquote>在Three.js中<code>添加物体</code>都是添加到<code>场景</code>中的，因此它相当于一个大容器。一般说，场景里没有很复杂的操作，只要new一个对象就可以了，然后将物体添加到场景中即可。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scene = new THREE.Scene();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();</code></pre>
<h3 id="articleHeader7">2.3 照相机(camera)</h3>
<blockquote>在介绍照相机之前，我们先来介绍一下坐标系。</blockquote>
<ul><li>three.js中使用的是右手坐标系，X轴水平向右，y轴垂直向上，Z轴的方向就是屏幕由里往外的方向</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179165?w=169&amp;h=177" src="https://static.alili.tech/img/remote/1460000012179165?w=169&amp;h=177" alt="image" title="image" style="cursor: pointer;"></span></p>
<blockquote>这里我们定义一个<code>透视相机</code>(相机也需要添加到场景中)：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
// 设置相机的位置
camera.position.set(0,0,5);
// 将相机添加到场景中
scene.add(camera);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.PerspectiveCamera(<span class="hljs-number">45</span>, <span class="hljs-number">4</span> / <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1000</span>);
<span class="hljs-comment">// 设置相机的位置</span>
camera.position.set(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">5</span>);
<span class="hljs-comment">// 将相机添加到场景中</span>
scene.add(camera);</code></pre>
<h3 id="articleHeader8">2.4 创建一个物体</h3>
<blockquote>这里我们先介绍一个长方体，创建一个x、y、z方向长度分别为1、2、3的长方体，并设置为红色。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var geometry = new THREE.CubeGeometry(1,2,3);
var material = new THREE.MeshBasicMaterial({
    color: 0xff0000;
});
var cube = new THREE.Mesh(geometry,material);
scene.add(cube);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>);
<span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>;
});
<span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(geometry,material);
scene.add(cube);</code></pre>
<ul><li>
<p><strong>new THREE.CubeGeometry(); 表示调用一个几何体</strong></p>
<ul>
<li>Cube : 立方体  Geometry : 几何;</li>
<li>
<code>CubeGeometry</code>是一个<code>正方体</code>或者<code>长方体</code>，究竟是什么，由它的3个参数所决定</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CubeGeometry(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">CubeGeometry(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width：立方体x轴的长度

height：立方体y轴的长度

depth：立方体z轴的深度，也就是长度

想一想大家就明白，以上3个参数就能够确定一个立方体。

剩下的几个参数就要费解和复杂一些了，不过后面我们会自己来写一个立方体，到时候，你会更明白这些参数的意义，这里你可以将这些参数省略。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">width</span>：立方体x轴的长度

<span class="hljs-built_in">height</span>：立方体y轴的长度

depth：立方体z轴的深度，也就是长度

想一想大家就明白，以上<span class="hljs-number">3</span>个参数就能够确定一个立方体。

剩下的几个参数就要费解和复杂一些了，不过后面我们会自己来写一个立方体，到时候，你会更明白这些参数的意义，这里你可以将这些参数省略。</code></pre>
<ul><li>
<p><strong>new THREE.MeshBasicMaterial(); 表示的是物体的材质</strong></p>
<ul><li>你可以在里面设置物体的颜色</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshBasicMaterial({
    color: 0xff0000;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>;
});</code></pre>
<ul><li><strong><code>一定不要忘了，将物体添加到场景</code></strong></li></ul>
<h3 id="articleHeader9">2.5 渲染</h3>
<blockquote>在定义了场景中的物体，设置好的照相机之后，渲染器就知道如何渲染出二维的结果了。这时候，我们只需要调用渲染器的渲染函数，就能使其渲染一次了。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderer.render(scene, camera);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">renderer.render(scene, camera);</code></pre>
<h3 id="articleHeader10">2.6 完整代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>长方体</title>
    <script src=&quot;three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            // canvas元素设置宽高
            renderer.setSize = (800, 600);
            // 渲染器对应的Canvas元素添加到<body>中。
            document.body.appendChild(renderer.domElement);
            // 清除画面的颜色
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();

            // 相机
            // 定义一个透视相机
            var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
            // 设定相机的位置
            camera.position.set(0, 0, 5);
            // 将相机添加到场景中
            scene.add(camera);

            // 物体
            var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), new THREE.MeshBasicMaterial({
                color: 0xff0000
            }));
            scene.add(cube);

            // 渲染
            renderer.render(scene, camera);
        }
    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>长方体<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            <span class="hljs-comment">// canvas元素设置宽高</span>
            renderer.setSize = (<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-comment">// 渲染器对应的Canvas元素添加到&lt;body&gt;中。</span>
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            <span class="hljs-comment">// 清除画面的颜色</span>
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-comment">// 定义一个透视相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.PerspectiveCamera(<span class="hljs-number">45</span>, <span class="hljs-number">4</span> / <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1000</span>);
            <span class="hljs-comment">// 设定相机的位置</span>
            camera.position.set(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>);
            <span class="hljs-comment">// 将相机添加到场景中</span>
            scene.add(camera);

            <span class="hljs-comment">// 物体</span>
            <span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>), <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
                <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>
            }));
            scene.add(cube);

            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<ul><li>效果图</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179166?w=303&amp;h=149" src="https://static.alili.tech/img/remote/1460000012179166?w=303&amp;h=149" alt="image" title="image" style="cursor: pointer;"></span><br><em>canvas元素的默认宽高为300/150</em></p>
<h2 id="articleHeader11">3. Three.js功能概览</h2>
<blockquote>下面介绍下Three.js官网文档中的一些重要的对象，在你需要寻求帮助时，就能够知道关键词是什么。</blockquote>
<ul>
<li>
<p><strong>Cameras（照相机，控制投影方式）</strong></p>
<ul>
<li>Camera</li>
<li>OrthographicCamera</li>
<li>PerspectiveCamera</li>
</ul>
</li>
<li>
<p><strong>Core（核心对象）</strong></p>
<ul>
<li>BufferGeometry</li>
<li>Clock（用来记录时间）</li>
<li>EventDispatcher</li>
<li>Face3</li>
<li>Face4</li>
<li>Geometry</li>
<li>Object3D</li>
<li>Projector</li>
<li>Raycaster（计算鼠标拾取物体时很有用的对象）</li>
</ul>
</li>
<li>
<p><strong>Lights（光照）</strong></p>
<ul>
<li>Light</li>
<li>AmbientLight</li>
<li>AreaLight</li>
<li>DirectionalLight</li>
<li>HemisphereLight</li>
<li>PointLight</li>
<li>SpotLight</li>
</ul>
</li>
<li>
<p><strong>Loaders(加载器，用来加载特定文件)</strong></p>
<ul>
<li>Loader</li>
<li>BinaryLoader</li>
<li>GeometryLoader</li>
<li>ImageLoader</li>
<li>JSONLoader</li>
<li>LoadingMonitor</li>
<li>SceneLoader</li>
<li>TextureLoader</li>
</ul>
</li>
<li>
<p><strong>Materials(材质，控制物体的颜色、纹理等)</strong></p>
<ul>
<li>Material</li>
<li>LineBasicMaterial</li>
<li>LineDashedMaterial</li>
<li>MeshBasicMaterial</li>
<li>MeshDepthMaterial</li>
<li>MeshFaceMaterial</li>
<li>MeshLambertMaterial</li>
<li>MeshNormalMaterial</li>
<li>MeshPhongMaterial</li>
<li>ParticleBasicMaterial</li>
<li>ParticleCanvasMaterial</li>
<li>ParticleDOMMaterial</li>
<li>ShaderMaterial</li>
<li>SpriteMaterial</li>
</ul>
</li>
<li>
<p><strong>Math(和数学相关的对象)</strong></p>
<ul>
<li>Box2</li>
<li>Box3</li>
<li>Color</li>
<li>Frustum</li>
<li>Math</li>
<li>Matrix3</li>
<li>Matrix4</li>
<li>Plane</li>
<li>Quaternion</li>
<li>Ray</li>
<li>Sphere</li>
<li>Spline</li>
<li>Triangle</li>
<li>Vector2</li>
<li>Vector3</li>
<li>Vector4</li>
</ul>
</li>
<li>
<p><strong>Objects(物体)</strong></p>
<ul>
<li>Bone</li>
<li>Line</li>
<li>LOD</li>
<li>Mesh（网格，最常用的物体）</li>
<li>MorphAnimMesh</li>
<li>Particle</li>
<li>ParticleSystem</li>
<li>Ribbon</li>
<li>SkinnedMesh</li>
<li>Sprite</li>
</ul>
</li>
<li>
<p><strong>Renderers(渲染器，可以渲染到不同对象上)</strong></p>
<ul>
<li>CanvasRenderer</li>
<li>WebGLRenderer（使用WebGL渲染，这是本书中最常用的方式）</li>
<li>WebGLRenderTarget</li>
<li>WebGLRenderTargetCube</li>
<li>WebGLShaders（着色器，在最后一章作介绍）</li>
</ul>
</li>
<li>
<p><strong>Renderers / Renderables</strong></p>
<ul>
<li>RenderableFace3</li>
<li>RenderableFace4</li>
<li>RenderableLine</li>
<li>RenderableObject</li>
<li>RenderableParticle</li>
<li>RenderableVertex</li>
</ul>
</li>
<li>
<p><strong>Scenes（场景）</strong></p>
<ul>
<li>Fog</li>
<li>FogExp2</li>
<li>Scene</li>
</ul>
</li>
<li>
<p><strong>Textures(纹理)</strong></p>
<ul>
<li>CompressedTexture</li>
<li>DataTexture</li>
<li>Texture</li>
</ul>
</li>
<li>
<p><strong>Extras</strong></p>
<ul>
<li>FontUtils</li>
<li>GeometryUtils</li>
<li>ImageUtils</li>
<li>SceneUtils</li>
</ul>
</li>
<li>
<p><strong>Extras / Animation</strong></p>
<ul>
<li>Animation</li>
<li>AnimationHandler</li>
<li>AnimationMorphTarget</li>
<li>KeyFrameAnimation</li>
</ul>
</li>
<li>
<p><strong>Extras / Cameras</strong></p>
<ul>
<li>CombinedCamera</li>
<li>CubeCamera</li>
</ul>
</li>
<li>
<p><strong>Extras / Core</strong></p>
<ul>
<li>Curve</li>
<li>CurvePath</li>
<li>Gyroscope</li>
<li>Path</li>
<li>Shape</li>
</ul>
</li>
<li>
<p><strong>Extras / Geometries（几何形状）</strong></p>
<ul>
<li>CircleGeometry</li>
<li>ConvexGeometry</li>
<li>CubeGeometry</li>
<li>CylinderGeometry</li>
<li>ExtrudeGeometry</li>
<li>IcosahedronGeometry</li>
<li>LatheGeometry</li>
<li>OctahedronGeometry</li>
<li>ParametricGeometry</li>
<li>PlaneGeometry</li>
<li>PolyhedronGeometry</li>
<li>ShapeGeometry</li>
<li>SphereGeometry</li>
<li>TetrahedronGeometry</li>
<li>TextGeometry</li>
<li>TorusGeometry</li>
<li>TorusKnotGeometry</li>
<li>TubeGeometry</li>
</ul>
</li>
<li>
<p><strong>Extras / Helpers</strong></p>
<ul>
<li>ArrowHelper</li>
<li>AxisHelper</li>
<li>CameraHelper</li>
<li>DirectionalLightHelper</li>
<li>HemisphereLightHelper</li>
<li>PointLightHelper</li>
<li>SpotLightHelper</li>
</ul>
</li>
<li>
<p><strong>Extras / Objects</strong></p>
<ul>
<li>ImmediateRenderObject</li>
<li>LensFlare</li>
<li>MorphBlendMesh</li>
</ul>
</li>
<li>
<p><strong>Extras / Renderers / Plugins</strong></p>
<ul>
<li>DepthPassPlugin</li>
<li>LensFlarePlugin</li>
<li>ShadowMapPlugin</li>
<li>SpritePlugin</li>
</ul>
</li>
<li>
<p><strong>Extras / Shaders</strong></p>
<ul>
<li>ShaderFlares</li>
<li>ShaderSprite</li>
</ul>
</li>
</ul>
<p>我们看到，Three.js功能是十分丰富的，一时间想全部掌握有些困难。在接下来的章节中，我们将会先详细介绍照相机、几何形状、材质、物体等入门级知识；然后介绍使用动画、模型导入、加入光照等功能；最后，对于学有余力的读者，我们将介绍着色器，用于更高级的图形渲染。</p>
<h2 id="articleHeader12">4. 照相机</h2>
<blockquote>本章将介绍照相机的概念，以及如何使用Three.js设置相应的参数。</blockquote>
<h3 id="articleHeader13">4.1 什么是照相机？</h3>
<blockquote>在图形学中，照相机可没有生活中的照相机那么简单</blockquote>
<ul>
<li>我们使用的Three.js创建的场景是三维的，而通常情况下显示器是二维的，那么三维的场景怎么在二维的显示器上显示呢？照相机就是一个抽象，它定义了三维空间到二维屏幕投影的方式，用“照相机”这样一个类比，可以使我们直观地理解这一投影方式。</li>
<li>而针对<code>投影方式</code>的不同，照相机又分为<code>正交投影照相机</code>与<code>透视投影照相机</code>。我们需要为自己的程序选择合适的照相机。这两者分别是什么，以及两者有何差异，我们将在下节中作介绍。</li>
</ul>
<h3 id="articleHeader14">4.2 正交投影和透视投影</h3>
<blockquote>举个简单的例子来说明正交投影与透视投影照相机的区别。使用<code>透视投影照相</code>机获得的结果是<code>类似人眼在真实世界中看到的有“近大远小”</code>的效果（如下图中的(a)）；而使用<code>正交投影照相机</code>获得的结果就像我们在数学几何学课上老师教我们画的效果，对于<code>三维空间内平行的线</code>，投影到<code>二维空间中也一定是平行的</code>（如下图中的(b)）。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179167?w=537&amp;h=244" src="https://static.alili.tech/img/remote/1460000012179167?w=537&amp;h=244" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>一般说来，对于<code>制图、建模软</code>通常使<code>正交投影</code>，这样不会因为投影而改变物体比例；而<code>对于其他大多数应用</code>，通常使用<code> 透视投影</code>，因为这更接近人眼的观察效果。当然，照相机的选择并没有对错之分，你可以更具应用的特性，选择一个效果更佳的照相机。</p>
<h3 id="articleHeader15">4.3 正交投影照相机</h3>
<h4>4.3.1 参数介绍</h4>
<blockquote>正交投影照相机(<code>Orthographic Camera</code>)</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="THREE.OrthographicCamera(left, right, top, bottom, near, far)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">THREE.OrthographicCamera(left, right, top, bottom, near, far)</code></pre>
<blockquote>这六个参数分别代表正交投影照相机拍摄到的空间的六个面的位置，这六个面围成一个长方体，我们称其<code>视景体(Frustum)</code>。只有在视景体内部（下图中的灰色部分）的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179168?w=760&amp;h=647" src="https://static.alili.tech/img/remote/1460000012179168?w=760&amp;h=647" alt="image" title="image" style="cursor: pointer;"></span></p>
<blockquote>为了保持照相机的横竖比例，需要保证<code>(right - left)与(top - bottom)</code>的比例与<code>Canvas宽度与高度的比例(800/600)</code>一致。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// [2-(-2)] / [1.5-(-1.5)] = canvas.width/canvas.height
var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10) // left right top bottom near far" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// [2-(-2)] / [1.5-(-1.5)] = canvas.width/canvas.height</span>
<span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1.5</span>, <span class="hljs-number">-1.5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>) <span class="hljs-comment">// left right top bottom near far</span></code></pre>
<p><code>near与far</code>都是指到照相机位置在深度平面的位置，而照相机不应该拍摄到其后方的物体，因此这两个值应该均为<code>正值</code>。为了保证场景中的物体不会因为太近或太远而被照相机忽略，一般<code>near的值设置得较小</code>，<code>far的值设置得较大</code>，具体值视场景中物体的位置等决定。</p>
<h4>4.3.2 示例代码</h4>
<blockquote>下面我们通过一个具体的例子来了解正交投影照相机的设置</blockquote>
<p><strong>基本设置</strong></p>
<ul><li>设置照相机：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
camera.poaition.set(0,0,5);
scene.add(camera);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1.5</span>, <span class="hljs-number">-1.5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>);
camera.poaition.set(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">5</span>);
scene.add(camera);</code></pre>
<ul><li>在原点处创建一个边长为1的正方体，为了和透视效果做对比，这里我们使用<code>wireframe</code>而不是实心的材质，以便看到正方体后方的边：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })
);
scene.add(cube);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(cube);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179169?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012179169?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>我们看到正交投影的结果是一个正方形，后面的边与前面完全重合了，这也就是正交投影与透视投影的区别所在。</li></ul>
<p><strong>长宽比例</strong></p>
<blockquote>这里，我们的Canvas宽度是800px，高度是600px，照相机水平方向距离4，垂直方向距离3，因此长宽比例保持不变。为了试验长宽比例变化时的效果，我们将照相机水平方向的距离减小为2(right-left = 2)：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera = new THREE.OrthographicCamera(-1, 1, 1.5, -1.5, 1, 10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1.5</span>, <span class="hljs-number">-1.5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>);</code></pre>
<ul><li>效果图(此时水平方向的距离就被拉长了)：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179170?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012179170?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>照相机位置</strong></p>
<blockquote>接下来，我们来看看照相机位置对渲染结果的影响。在之前的例子中，我们将照相机设置在(0, 0, 5)位置，而由于照相机默认是<code>面向z轴负方向</code>放置的，所以能看到在原点处的正方体。现在，如果我们将照相机<code>向右移动1个</code>单位：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
// 向右移动一个单位的位置
camera.position.set(1, 0, 5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1.5</span>, <span class="hljs-number">-1.5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>);
<span class="hljs-comment">// 向右移动一个单位的位置</span>
camera.position.set(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>);</code></pre>
<ul><li>效果图(物体看上去向左移动了)</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179171?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012179171?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>其实照相机就好比人的眼睛，当我们身体往右移动的时候，看到的物体就好像向左移了。</li></ul>
<blockquote>正交投影摄像机在设置时，是否需要保证<code>left 和 right 互为相反数</code>呢？</blockquote>
<ul><li>下面，我们将原本的参数<code>(-2, 2, 1.5, -1.5, 1, 10)</code>改为<code>(-1, 1, 1.5, -1.5, 1, 10)</code>，即，将视景体设置得更靠右：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera = new THREE.OrthographicCamera(-1, 3, 1.5, -1.5, 1, 10);
camera.position.set(0, 0, 5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1.5</span>, <span class="hljs-number">-1.5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>);
camera.position.set(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>);</code></pre>
<ul><li>效果图(与之前相机向右的效果是一样的)</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179171?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012179171?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>换个角度</strong></p>
<blockquote>到目前为止，我们使用照相机，都是<code>沿着Z轴负方向</code>观察的，因此看到的都是一个正方形，现在我们尝试一下<code>仰望</code>这个正方体，改变照相机的位置：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// x轴：4；  y轴：-3；  z轴：5
camera.position.set(4, -3, 5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// x轴：4；  y轴：-3；  z轴：5</span>
camera.position.set(<span class="hljs-number">4</span>, <span class="hljs-number">-3</span>, <span class="hljs-number">5</span>);</code></pre>
<blockquote>照相机默认是沿着z轴的负方向观察的，因此观察不到正方体，只看到一片黑。我们可以通过<code>lookAt函数</code>指定它<code>看着原点方向</code>：</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179172?w=869&amp;h=450" src="https://static.alili.tech/img/remote/1460000012179172?w=869&amp;h=450" alt="image" title="image" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="camera.lookAt(new THREE.Vector3(0, 0, 0));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012179173?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012179173?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>注意：<code>lookAt函数</code>接收的是一个<code>THREE.Vector3</code>的实例千万不能写成<code>camera.lookAt(0,0,0)</code>。</li></ul>
<h3 id="articleHeader16">4.4 透视投影照相机</h3>
<h4>4.4.1 参数介绍</h4>
<blockquote>透视投影照相机(<code>Perspective Camera</code>)</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="THREE.PerspectiveCamera(fov, aspect, near, far)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">THREE.PerspectiveCamera(fov, aspect, near, far)</code></pre>
<blockquote>让我们通过一张透视照相机投影的图来了解这些参数。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238582?w=729&amp;h=322" src="https://static.alili.tech/img/remote/1460000012238582?w=729&amp;h=322" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul>
<li>透视图中，<code>灰色</code>的部分是<code>视景体</code>，是<code>可能被渲染</code>的物体所在的区域。<code>fov</code>是视景体<code>竖直方向上</code>的<code>张角</code>（是角度制而非弧度制），如侧视图所示。</li>
<li>
<code>aspect</code>等于<code>width / height</code>，是照相机<code>水平方向和竖直方向长度的比值</code>，通常设为Canvas的<code>横纵比例</code>。</li>
<li>
<code>near和far</code>分别是照相机到<code>视景体</code> <code>最近、最远</code>的距离，均为<code>正值</code>，且<code>far应大于near</code>。</li>
</ul>
<h4>4.4.2 示例代码</h4>
<blockquote>下面我们通过一个例子来学习透视投影照相机</blockquote>
<p><strong>基本设置</strong></p>
<ul><li>设置透视投影照相机，这里Canvas长<code>800px</code>，宽<code>600px</code>，所以<code>aspect</code>设为<code>800 / 600</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10);
camera.position.set(0, 0, 5);
scene.add(camera);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.PerspectiveCamera(<span class="hljs-number">45</span>, <span class="hljs-number">800</span> / <span class="hljs-number">600</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>);
camera.position.set(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>);
scene.add(camera);</code></pre>
<ul><li>设置一个在原点处的边长为1的正方体：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
);
scene.add(cube);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>),
        <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
            <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>,
            <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
        })
);
scene.add(cube);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238583?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238583?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>对比正交透视照相机下正方形的效果，透视投影可以看到<code>全部的12条边</code>，而且有<code>近大远小</code>的效果，这也就是与正交投影的区别。</li></ul>
<p><strong>竖直张角</strong></p>
<ul><li>接下来，我们来看下<code>fov</code>的改变对渲染效果的影响。我们将原来的<code>45改为60</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera = new THREE.PerspectiveCamera(60, 800 / 600, 1, 10);
camera.position.set(0, 0, 5);
scene.add(camera);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.PerspectiveCamera(<span class="hljs-number">60</span>, <span class="hljs-number">800</span> / <span class="hljs-number">600</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>);
camera.position.set(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>);
scene.add(camera);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238584?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238584?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>为什么正方体显得更小了呢？我们从下面的侧视图来看，虽然正方体的实际大小并未改变，但是将照相机的<code>竖直张角</code>设置得<code>更大</code>时，<code>视景体变大了</code>，因而<code>正方体</code>相对于<code>整个视景体</code>的大小就<code>变小</code>了，看起来正方形就显得变小了。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238585?w=290&amp;h=326" src="https://static.alili.tech/img/remote/1460000012238585?w=290&amp;h=326" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>注意，<code>改变fov</code>并<code>不会</code>引<code>起画面横竖比例</code>的变化，而<code>改变aspect</code>则<code>会</code>改变横竖比例。</li></ul>
<h2 id="articleHeader17">5. 点、线、面</h2>
<h3 id="articleHeader18">5.1 3D世界的组成</h3>
<blockquote>在计算机世界里，3D世界由点组成，两个点能组成一条直线，三个不在一条直线上的点，就能组成一个三角面，<code>无数的三角面</code>就能组成<code>各种各样的物体</code>，如下图：</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238586?w=400&amp;h=321" src="https://static.alili.tech/img/remote/1460000012238586?w=400&amp;h=321" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>我们通常把这种<code>网络模型</code>叫做<code>Mesh模型</code>。给物体<code>贴上皮肤</code>，或者专业点就叫做<code>纹理</code>，那么这个物体就活灵活现了。最后无数的物体就组成了我们的3D世界。</li></ul>
<h3 id="articleHeader19">5.2 在Three.js中定义一个点</h3>
<blockquote>在三维空间中的某一个点可以用一个坐标点来表示。一个坐标点由<code>x</code>,<code>y</code>,<code>z</code>三个分量构成。在three.js中，点可以在右手坐标系中表示： <p>空间几何中，点可以用一个向量来表示，在Three.js中也是用一个<code>向量</code>来表示的</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="THREE.Vector3 = function ( x, y, z ) {

this.x = x || 0;
this.y = y || 0;
this.z = z || 0;

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">THREE.Vector3 = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> x, y, z </span>) </span>{

<span class="hljs-keyword">this</span>.x = x || <span class="hljs-number">0</span>;
<span class="hljs-keyword">this</span>.y = y || <span class="hljs-number">0</span>;
<span class="hljs-keyword">this</span>.z = z || <span class="hljs-number">0</span>;

};</code></pre>
<ul>
<li>我们来分析这段代码：前面我们已经知道了THREE是Three.js引擎的一个全局变量。只要你想用它，就可以在任何地方用它。</li>
<li>那么THREE.Vector3呢，就是表示<code>Vector3</code>是定义在<code>THREE</code>下面的一个<code>类</code>。以后要用<code>Vector3</code>，就必须<code>要加THREE前缀</code>。当然Three.js的设计者，也可以不加THREE这个前缀，但是他们预见到，Three.js引擎中会有很多类型，最好给这些类型加一个前缀，以免与开发者的代码产生冲突。</li>
<li>THREE.Vector3被赋值为一个<code>函数</code>。这个函数有<code>3个参数</code>，分别代表<code>x坐标</code>，<code>y坐标</code>和<code>z坐标</code>的分量。函数体内的代码将他们分别赋值给<code>成员变量x，y，z</code>。看看上面的代码，中间使用了一个<code>“||”（或）运算符</code>，就是当<code>x=null或者undefine</code>时，<code>this.x</code>的值应该<code>取0</code>。</li>
</ul>
<h3 id="articleHeader20">5.3 点的操作</h3>
<blockquote>在3D世界中<code>点</code>可以用<code>THREE.Vector3D</code>来表示。</blockquote>
<ul><li><strong>现在来看看怎么定义个点，假设有一个点x=4，y=8，z=9。你可以这样定义它：</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var point1 = new THREE.Vecotr3(4,8,9);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> point1 = <span class="hljs-keyword">new</span> THREE.Vecotr3(<span class="hljs-number">4</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>);</code></pre>
<ul><li><strong>另外你也可以使用<code>set</code>方法，代码如下：</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var point1 = new THREE.Vector3();

point1.set(4,8,9);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> point1 = <span class="hljs-keyword">new</span> THREE.Vector3();

point1.set(<span class="hljs-number">4</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>);</code></pre>
<h3 id="articleHeader21">5.4 绘制一条线段</h3>
<blockquote>两个不重合的点能够决定一条直线。在three.js中，也可以通过定义两个点，来画一条直线。</blockquote>
<ul>
<li><strong>1、首先，声明一个几何体geometry</strong></li>
<li>几何体里面有个<code>vertices变量</code>，可以用来<code>存放点</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var geometry = new THREE.Geometry();
// 几何体里面有个vertices变量，可以用来存放点" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.Geometry();
<span class="hljs-comment">// 几何体里面有个vertices变量，可以用来存放点</span></code></pre>
<ul><li><strong>2、定义一种线条的材质，使用<code>THREE.LineBasicMaterial</code>类型来定义，它接受一个<code>集合作为参数</code>，其原型如下：</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="THREE.LineBasicMaterial(parameters);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">THREE.LineBasicMaterial(parameters);</code></pre>
<ul>
<li>
<p><code>parameters</code> 是定义材质外观的对象，它包含多个属性来定义材质，这些属性是：</p>
<ul>
<li>
<strong>Color</strong> 线条的<code>颜色</code>，用16进制表示，默认都是白色</li>
<li>
<strong>Linewidth</strong> 线条的<code>宽度</code>，默认是1个单位宽度</li>
<li>
<strong>Linecap</strong> 线条<code>两端的外</code>观，默认是<code>圆角端点</code>，当线条较粗的时候才能看到效果</li>
<li>
<strong>Linejoin</strong> 两个线条的<code>连接点处的外观</code>，默认是“round”，表示圆角。</li>
<li>
<strong>VertexColors</strong> 定义<code>线条材质</code>是否使用<code>顶点颜色</code>，这是一个boolean值。意思是，线条各部分的颜色会根据顶点的颜色来进行插值。</li>
<li>
<strong>Fog</strong> 定义材质的颜色是否受全局雾效的影响。</li>
</ul>
</li>
<li>我们这里使用了<code>顶点颜色</code> <code>vertexColors: THREE.VertexColors</code>，就是<code>线条的颜色</code>会根据<code>顶点</code>来计算。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial( { <span class="hljs-attr">vertexColors</span>: THREE.VertexColors } );</code></pre>
<ul>
<li>
<strong>注意</strong>: 关于线宽的坑，<code>WebGLRender</code>渲染方式是不之持绘制线宽的，要想支持，需要将渲染方式设置为<code>CanvasRenderer</code>
</li>
<li><strong>3、接下来，定义两种颜色，分别表示线条两个端点的颜色，</strong></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var color1 = new THREE.Color( 0x444444 ),
    color2 = new THREE.Color( 0xFF0000 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> color1 = <span class="hljs-keyword">new</span> THREE.Color( <span class="hljs-number">0x444444</span> ),
    color2 = <span class="hljs-keyword">new</span> THREE.Color( <span class="hljs-number">0xFF0000</span> );</code></pre>
<ul><li><strong>4、定义2个顶点的位置，并放到<code>geometry</code>中，代码如下：</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new THREE.Vector3(-100,0,100);
var p2 = new THREE.Vector3(100,0,-100);

geometry.vertices.push(p1);
geometry.vertices.push(p2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">-100</span>,<span class="hljs-number">0</span>,<span class="hljs-number">100</span>);
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">100</span>,<span class="hljs-number">0</span>,<span class="hljs-number">-100</span>);

geometry.vertices.push(p1);
geometry.vertices.push(p2);</code></pre>
<ul><li><strong>5、为4中定义的2个顶点，设置不同的颜色，代码如下所示：</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="geometry.colors.push( color1, color2 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">geometry.colors.push( color1, color2 );</code></pre>
<ul>
<li>
<code>geometry中colors表示顶点的颜色</code>，必须材质中<code>vertexColors等于THREE.VertexColors</code>时，颜色才<code>有效</code>，如果vertexColors等于THREE.NoColors时，颜色就没有效果了。那么就会去取材质中color的值，这个很重要。</li>
<li><strong>6、定义一条线。</strong></li>
<li>定义线条，使用<code>THREE.Line类</code>，代码如下所示：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var line = new THREE.Line( geometry, material, THREE.LinePieces );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> line = <span class="hljs-keyword">new</span> THREE.Line( geometry, material, THREE.LinePieces );</code></pre>
<ul>
<li>第一个参数是几何体<code>geometry</code>，里面包含了<code>2个顶</code>点和顶点的<code>颜色</code>。</li>
<li>第二个参数是线条的<code>材质</code>，或者是线条的属性，表示线条以哪种方式取色。</li>
<li>第三个参数是一组点的连接方式。</li>
<li><strong>7、然后，将这条线加入到场景中，代码如下：</strong></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scene.add(line);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">scene.add(line);</code></pre>
<ul><li><strong>8、整体代码：</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Strict//EN&quot; &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd&quot;>
<html>

<head>
    <script type=&quot;text/javascript&quot; src=&quot;three.js&quot;></script>

    <script type=&quot;text/javascript&quot;>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            // 设定渲染器尺寸
            renderer.setSize(800, 600);
            // 添加到dom
            document.body.appendChild(renderer.domElement);
            // 重绘时颜色
            renderer.setClearColor(0xffffff);

            // 场景
            var scene = new THREE.Scene();

            // 相机
            var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            // 设定相机位置
            camera.position.set(0, -25, 0);
            // 相机看向
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 定义一个物体
            // new 一个模型
            var geometry = new THREE.Geometry();
            // 定义模型的类型是线段  并且设置其材质
            var material = new THREE.LineBasicMaterial({
                // 使用顶点颜色
                vertexColors: true
            });
            // 定义两个颜色
            var color1 = new THREE.Color(0x444444),
                color2 = new THREE.Color(0xff0000);

            // 新建两个点
            var p1 = new THREE.Vector3(-1, 0, 1);
            var p2 = new THREE.Vector3(1, 0, -1);

            // 将新建的两个点添加到几何体中
            geometry.vertices.push(p1);
            geometry.vertices.push(p2);

            // 将两个颜色添加到几何体中
            geometry.colors.push(color1, color2);

            // new 一条线
            var line = new THREE.Line(geometry, material, THREE.LinePieces);
            scene.add(line);

            // 渲染
            renderer.render(scene, camera);

        }
    </script>
</head>

<body onload=&quot;init()&quot;>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            <span class="hljs-comment">// 设定渲染器尺寸</span>
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-comment">// 添加到dom</span>
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            <span class="hljs-comment">// 重绘时颜色</span>
            renderer.setClearColor(<span class="hljs-number">0xffffff</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            <span class="hljs-comment">// 设定相机位置</span>
            camera.position.set(<span class="hljs-number">0</span>, <span class="hljs-number">-25</span>, <span class="hljs-number">0</span>);
            <span class="hljs-comment">// 相机看向</span>
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 定义一个物体</span>
            <span class="hljs-comment">// new 一个模型</span>
            <span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.Geometry();
            <span class="hljs-comment">// 定义模型的类型是线段  并且设置其材质</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
                <span class="hljs-comment">// 使用顶点颜色</span>
                vertexColors: <span class="hljs-literal">true</span>
            });
            <span class="hljs-comment">// 定义两个颜色</span>
            <span class="hljs-keyword">var</span> color1 = <span class="hljs-keyword">new</span> THREE.Color(<span class="hljs-number">0x444444</span>),
                color2 = <span class="hljs-keyword">new</span> THREE.Color(<span class="hljs-number">0xff0000</span>);

            <span class="hljs-comment">// 新建两个点</span>
            <span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">-1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
            <span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-1</span>);

            <span class="hljs-comment">// 将新建的两个点添加到几何体中</span>
            geometry.vertices.push(p1);
            geometry.vertices.push(p2);

            <span class="hljs-comment">// 将两个颜色添加到几何体中</span>
            geometry.colors.push(color1, color2);

            <span class="hljs-comment">// new 一条线</span>
            <span class="hljs-keyword">var</span> line = <span class="hljs-keyword">new</span> THREE.Line(geometry, material, THREE.LinePieces);
            scene.add(line);

            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);

        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init()"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238587" src="https://static.alili.tech/img/remote/1460000012238587" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader22">5.5 线条的深度理解</h3>
<blockquote>在Threejs中，一条线由点，材质和颜色组成。</blockquote>
<ul>
<li>点由<code>THREE.Vector3</code>表示，Threejs中没有提供单独画点的函数，它必须被放到一个<code>THREE.Geometry</code>形状中，这个结构中包含一个<code>数组vertices</code>，这个<code>vertices就是存放无数的点（THREE.Vector3）的数组</code>。</li>
<li><strong>1、为了绘制一条直线，首先我们需要定义两个点</strong></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new THREE.Vector3( -1, 0, 1 );
var p2 = new THREE.Vector3( 1, 0, -1 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> THREE.Vector3( <span class="hljs-number">-1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span> );
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> THREE.Vector3( <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-1</span> );</code></pre>
<ul><li><strong>2、声明一个<code>THREE.Geometry</code>，并把点加进去</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var geometry = new THREE.Geometry();
geometry.vertices.push(p1);
geometry.vertices.push(p2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.Geometry();
geometry.vertices.push(p1);
geometry.vertices.push(p2);</code></pre>
<ul>
<li>geometry.vertices的能够使用<code>push方法</code>，是因为<code>geometry.vertices</code>是一个<code>数组</code>。这样geometry中就有了2个点了。</li>
<li><strong>3、然后我们需要给线加一种材质，<code>THREE.LineBasicMaterial</code>。</strong></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.LineBasicMaterial();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial();</code></pre>
<ul><li><strong>4、最终我们通过<code>THREE.Line</code>绘制了一条线:</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var line = new THREE.Line( geometry, material, THREE.LinePieces );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> line = <span class="hljs-keyword">new</span> THREE.Line( geometry, material, THREE.LinePieces );</code></pre>
<h3 id="articleHeader23">5.6 绘制网格线</h3>
<blockquote>我们要画一个网格的坐标，那么我们就应该找到线的点。把网格虚拟成正方形，在正方形边界上找到几个等分点，用这些点两两连接，就能够画出整个网格来。</blockquote>
<ul><li><strong>1、定义两个点</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在x轴上定义两个点p1(-500,0,0)，p2(500,0,0)。
geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ));
geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在x轴上定义两个点p1(-500,0,0)，p2(500,0,0)。</span>
geometry.vertices.push( <span class="hljs-keyword">new</span> THREE.Vector3( - <span class="hljs-number">500</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span> ));
geometry.vertices.push( <span class="hljs-keyword">new</span> THREE.Vector3( <span class="hljs-number">500</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span> ));</code></pre>
<ul><li>
<p><strong>2、算法</strong></p>
<ul>
<li>这两个点决定了x轴上的一条线段，将这条线段复制20次，分别平行移动到z轴的不同位置，就能够形成一组平行的线段。</li>
<li>同理，将p1p2这条线先围绕y轴旋转90度，然后再复制20份，平行于z轴移动到不同的位置，也能形成一组平行线。</li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for ( var i = 0; i <-= 20; i ++ ) {
    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 }));
    line.position.z = ( i * 50 ) - 500;
    scene.add( line );

    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ));
    line.position.x = ( i * 50 ) - 500;
    line.rotation.y = 90 * Math.PI / 180;   //  旋转90度
    scene.add( line );

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;-= <span class="hljs-number">20</span>; i ++ ) {
    <span class="hljs-keyword">var</span> line = <span class="hljs-keyword">new</span> THREE.Line( geometry, <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({ <span class="hljs-attr">color</span>: <span class="hljs-number">0x000000</span>, <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.2</span> }));
    line.position.z = ( i * <span class="hljs-number">50</span> ) - <span class="hljs-number">500</span>;
    scene.add( line );

    <span class="hljs-keyword">var</span> line = <span class="hljs-keyword">new</span> THREE.Line( geometry, <span class="hljs-keyword">new</span> THREE.LineBasicMaterial( { <span class="hljs-attr">color</span>: <span class="hljs-number">0x000000</span>, <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.2</span> } ));
    line.position.x = ( i * <span class="hljs-number">50</span> ) - <span class="hljs-number">500</span>;
    line.rotation.y = <span class="hljs-number">90</span> * <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>;   <span class="hljs-comment">//  旋转90度</span>
    scene.add( line );

}</code></pre>
<ul><li><strong>3、完整代码</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Strict//EN&quot; &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd&quot;>
<html>

<head>
    <script type=&quot;text/javascript&quot; src=&quot;three.js&quot;></script>

    <script type=&quot;text/javascript&quot;>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            // 设定渲染器尺寸
            renderer.setSize(800, 600);
            // 添加到dom
            document.body.appendChild(renderer.domElement);
            // 重绘时颜色
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();

            // 相机
            var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            // 设定相机位置
            camera.position.set(0, -25, 0);
            // 相机看向
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 定义一个几何体
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(-2, 0, 0));
            geometry.vertices.push(new THREE.Vector3(2, 0, 0));
            // for循环出来六条线段
            for (var i = 0; i <= 5; i++) {
                // 定义竖着的线段
                var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                    color: 0xffffff,
                }));
                // 每条线段之间的间隔为0.8，-2是为了达到田字格的效果
                line.position.z = (i * 0.8) - 2;
                scene.add(line);

                // 定义横着的线段
                var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    opacity: 0.2
                }));
                line.position.x = (i * 0.8) - 2;
                line.rotation.y = 90 * Math.PI / 180;
                scene.add(line);

                // 渲染
                renderer.render(scene, camera);

            }
        }
    </script>
</head>

<body onload=&quot;init()&quot;>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            <span class="hljs-comment">// 设定渲染器尺寸</span>
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-comment">// 添加到dom</span>
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            <span class="hljs-comment">// 重绘时颜色</span>
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            <span class="hljs-comment">// 设定相机位置</span>
            camera.position.set(<span class="hljs-number">0</span>, <span class="hljs-number">-25</span>, <span class="hljs-number">0</span>);
            <span class="hljs-comment">// 相机看向</span>
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 定义一个几何体</span>
            <span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.Geometry();
            geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">-2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            <span class="hljs-comment">// for循环出来六条线段</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;= <span class="hljs-number">5</span>; i++) {
                <span class="hljs-comment">// 定义竖着的线段</span>
                <span class="hljs-keyword">var</span> line = <span class="hljs-keyword">new</span> THREE.Line(geometry, <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffffff</span>,
                }));
                <span class="hljs-comment">// 每条线段之间的间隔为0.8，-2是为了达到田字格的效果</span>
                line.position.z = (i * <span class="hljs-number">0.8</span>) - <span class="hljs-number">2</span>;
                scene.add(line);

                <span class="hljs-comment">// 定义横着的线段</span>
                <span class="hljs-keyword">var</span> line = <span class="hljs-keyword">new</span> THREE.Line(geometry, <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffffff</span>,
                    <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.2</span>
                }));
                line.position.x = (i * <span class="hljs-number">0.8</span>) - <span class="hljs-number">2</span>;
                line.rotation.y = <span class="hljs-number">90</span> * <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>;
                scene.add(line);

                <span class="hljs-comment">// 渲染</span>
                renderer.render(scene, camera);

            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init()"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238588" src="https://static.alili.tech/img/remote/1460000012238588" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader24">6. 几何形状</h2>
<blockquote>在创建物体时，需要传入两个参数，一个是<code>几何形状(Geometry)</code>，另一个是<code>材质(Material)</code>，这一章将着重介绍几何形状的创建，第6章介绍材质，第7章介绍如何使用两者创建网格。</blockquote>
<ul>
<li>几何形状(Geometry)最主要的功能是储存了一个物体的<code>顶点信息</code>。WebGL需要程序员指定每个顶点的位置，而在Three.js中，可以通过指定一些<code>特征</code>来创建几何形状，例如使用<code>半径</code>创建一个<code>球体</code>，从而省去程序员一个个指定顶点的工作量。</li>
<li>本章节将分别介绍立方体、平面、球体、圆柱体、四面体、八面体等几何形状，以及以三维文字作为几何形状的方法。本节还会介绍通过<code>手动定义</code> <code>顶点位置</code>和<code>面片信息</code>组成几何形状。</li>
</ul>
<h3 id="articleHeader25">6.1 基本几何形状</h3>
<h4>6.1.1 立方体</h4>
<blockquote>虽然这形状的名字叫做立方体(<code>CubeGeometry</code>)，但其实是长方体，也就是长宽高可以设置不同的值：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)</code></pre>
<ul><li>这里，<code>width</code>是<code>x方向</code>上的长度；<code>height</code>是<code>y方向</code>上的长度；<code>depth</code>是<code>z方向上</code>的长度；后三个参数分别是在<code>三个方向上的分段数</code>，如<code>widthSegments为3</code>的话，代表<code>x方向上水平分为三份</code>。一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的缺省值为1。其他几何形状中的分段也是类似的，下面不做说明。</li></ul>
<p><strong>长宽高</strong></p>
<ul><li>创建立方体直观简单，如：<code>new THREE.CubeGeometry(1, 2, 3);</code>可以创建一个x方向长度为<code>1</code>，y方向长度为<code>2</code>，z方向长度为<code>3</code>的立方体。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000);

// 调用场景
var scene = new THREE.Scene();

// 调用相机
var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
camera.position.set(25, 25, 25);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// 新建一个几何体(长方体)
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true
}));

scene.add(cube);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 调用渲染器</span>
<span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
<span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
renderer.setClearColor(<span class="hljs-number">0x000000</span>);

<span class="hljs-comment">// 调用场景</span>
<span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

<span class="hljs-comment">// 调用相机</span>
<span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
camera.position.set(<span class="hljs-number">25</span>, <span class="hljs-number">25</span>, <span class="hljs-number">25</span>);
camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
scene.add(camera);

<span class="hljs-comment">// 新建一个几何体(长方体)</span>
<span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>), <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
    <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
}));

scene.add(cube);
</code></pre>
<ul><li>为了更好地表现参数效果，我们在场景中用<code>长度为3</code>的<code>红、绿、蓝</code>线段分别表示<code>x、y、z</code>三个轴(这里不需要深究，后面会详细介绍)：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 封装一个坐标系函数
function drawAxes(scene) {
    // x-axis
    var xGeo = new THREE.Geometry();
    xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    xGeo.vertices.push(new THREE.Vector3(3, 0, 0));
    var xMat = new THREE.LineBasicMaterial({
        color: 0xff0000
    });
    var xAxis = new THREE.Line(xGeo, xMat);
    scene.add(xAxis);

    // y-axis
    var yGeo = new THREE.Geometry();
    yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    yGeo.vertices.push(new THREE.Vector3(0, 3, 0));
    var yMat = new THREE.LineBasicMaterial({
        color: 0x00ff00
    });
    var yAxis = new THREE.Line(yGeo, yMat);
    scene.add(yAxis);

    // z-axis
    var zGeo = new THREE.Geometry();
    zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    zGeo.vertices.push(new THREE.Vector3(0, 0, 3));
    var zMat = new THREE.LineBasicMaterial({
        color: 0x00ccff
    });
    var zAxis = new THREE.Line(zGeo, zMat);
    scene.add(zAxis);
}

// 在init 函数里调用这个函数 即可在屏幕上显示一个坐标系了
drawAxes(scene);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 封装一个坐标系函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawAxes</span>(<span class="hljs-params">scene</span>) </span>{
    <span class="hljs-comment">// x-axis</span>
    <span class="hljs-keyword">var</span> xGeo = <span class="hljs-keyword">new</span> THREE.Geometry();
    xGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
    xGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
    <span class="hljs-keyword">var</span> xMat = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>
    });
    <span class="hljs-keyword">var</span> xAxis = <span class="hljs-keyword">new</span> THREE.Line(xGeo, xMat);
    scene.add(xAxis);

    <span class="hljs-comment">// y-axis</span>
    <span class="hljs-keyword">var</span> yGeo = <span class="hljs-keyword">new</span> THREE.Geometry();
    yGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
    yGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>));
    <span class="hljs-keyword">var</span> yMat = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0x00ff00</span>
    });
    <span class="hljs-keyword">var</span> yAxis = <span class="hljs-keyword">new</span> THREE.Line(yGeo, yMat);
    scene.add(yAxis);

    <span class="hljs-comment">// z-axis</span>
    <span class="hljs-keyword">var</span> zGeo = <span class="hljs-keyword">new</span> THREE.Geometry();
    zGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
    zGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>));
    <span class="hljs-keyword">var</span> zMat = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0x00ccff</span>
    });
    <span class="hljs-keyword">var</span> zAxis = <span class="hljs-keyword">new</span> THREE.Line(zGeo, zMat);
    scene.add(zAxis);
}

<span class="hljs-comment">// 在init 函数里调用这个函数 即可在屏幕上显示一个坐标系了</span>
drawAxes(scene);
</code></pre>
<ul><li>在设置材质，并添加到场景之后具体的效果是：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238589?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238589?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>物体的<code>默认位置</code>是<code>原点</code>，对于立方体而言，是其几何中心在原点的位置。</li></ul>
<p><strong>分段</strong></p>
<ul><li>根据<code>THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)</code>，的后三个参数，为这个长方体分段：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// x轴分两段  y轴分两段 z轴分三段
new THREE.CubeGeometry(1, 2, 3, 2, 2, 3)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// x轴分两段  y轴分两段 z轴分三段</span>
<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238590?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238590?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>注意这个分段是对<code>六个面</code>进行分段，而不是对立方体的体素分段，因此在立方体的<code>中间是不分段</code>的，只有<code>六个侧面</code>被分段。</li></ul>
<h4>6.1.2 平面</h4>
<blockquote>这里的平面(<code>PlaneGeometry</code>)其实是一个长方形，而并非是数学意义上无限大的平面：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.PlaneGeometry(width, height, widthSegments, heightSegments)</code></pre>
<ul>
<li>其中，<code>width</code>是<code>x方向</code>上的长度；<code>height</code>是<code>y方向</code>上的长度；后两个参数同样表示<code>分段</code>。</li>
<li>
<code>new THREE.PlaneGeometry(2, 4);</code>创建的平面在x轴和y轴所在平面内：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 4), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(plane);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> plane = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.PlaneGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(plane);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238591?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238591?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>如果需要创建的平面在<code>x轴和z轴</code>所在的平面内，可以通过<code>物体的旋转</code>来实现，具体的做法将在下面章节介绍到。</li></ul>
<h4>6.1.3 球体</h4>
<blockquote>球体(<code>SphereGeometry</code>)的构造函数是：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)</code></pre>
<ul><li>其中，<code>radius</code>是<code>半径</code>；<code>segmentsWidth</code>表示<code>经度上的切片数</code>；<code>segmentsHeight</code>表示<code>纬度上的切片数</code>；<code>phiStart</code>表示<code>经度开始的弧度</code>；<code>phiLength</code>表示<code>经度跨过的弧度</code>；<code>thetaStart</code>表示<code>纬度开始的弧度</code>；<code>thetaLength</code>表示<code>纬度跨过的弧度</code>。</li></ul>
<p><strong>分段</strong></p>
<ul><li>首先，我们来理解下<code>segmentsWidth</code>和<code>segmentsHeight</code>。使用<code>var sphere = new THREE.SphereGeometry(2, 8, 6)</code>可以创建一个<code>半径为2</code>，<code>经度</code>划分成<code>8</code>份，<code>纬度</code>划分成<code>6</code>份的<code>球体</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 8, 6), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(sphere);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sphere = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.SphereGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>, <span class="hljs-number">6</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(sphere);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238592?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238592?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>
<code>new THREE.SphereGeometry(2, 8, 16)</code>的效果如图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238593?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238593?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<ul><li>
<code>new THREE.SphereGeometry(3, 18, 12)</code>的效果如图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238594?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238594?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<ul><li>
<code>segmentsWidth</code>相当于经度被<code>切成了几瓣</code>，而<code>segmentsHeight</code>相当于纬度被<code>切成了几层</code>。因为在图形底层的实现中，并<code>没有曲线</code>的概念，曲线都是由<code>多个折线近似</code>构成的。对于球体而言，当这<code>两个值较大</code>的时候，形成的<code>多面体</code>就可以<code>近似</code>看做是球体了。</li></ul>
<p><strong>经度弧度</strong></p>
<ul><li>
<code>new THREE.SphereGeometry(2, 8, 6, Math.PI / 2, Math.PI / 3)</code>表示起始经度为<code>Math.PI / 6</code>，经度跨度为<code>Math.PI / 3</code>。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 8, 6, Math.PI / 2, Math.PI / 3), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(sphere);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sphere = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.SphereGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>, <span class="hljs-number">6</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">3</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(sphere);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238595?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238595?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>值得注意的是，这里的<code>SegmentsWidth</code>为<code>8</code>意味着对于经度从<code>Math.PI / 2</code>跨过<code>Math.PI / 3</code>的<code>区域内</code>划分为<code>8</code>块，而不是整个球体的经度划分成8块后再判断在此经度范围内的部分。</li></ul>
<p><strong>纬度弧度</strong></p>
<ul><li>理解了经度之后，纬度可以同理理解。<code>new THREE.SphereGeometry(2, 8, 6, 0, Math.PI * 2, Math.PI / 6, Math.PI / 3)</code>意味着纬度从<code>Math.PI / 6</code>跨过<code>Math.PI / 3</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sphere = new THREE.Mesh(
    // 经度起始弧度为0度，经度跨度为 180*2
    new THREE.SphereGeometry(2, 8, 6, 0, Math.PI * 2, Math.PI / 6, Math.PI / 3), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(sphere);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sphere = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-comment">// 经度起始弧度为0度，经度跨度为 180*2</span>
    <span class="hljs-keyword">new</span> THREE.SphereGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">6</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">3</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(sphere);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238596?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238596?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>我们再来看一个<code>经度纬度</code>都改变了<code>起始位置和跨度</code>的例子：<code>new THREE.SphereGeometry(2, 8, 6, Math.PI / 2, Math.PI, Math.PI / 6, Math.PI / 2)</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 8, 6, Math.PI / 2, Math.PI, Math.PI / 6, Math.PI / 2), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(sphere);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sphere = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.SphereGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>, <span class="hljs-number">6</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span>, <span class="hljs-built_in">Math</span>.PI, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">6</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(sphere);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238597?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238597?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>6.1.4 圆形</h4>
<blockquote>圆形(<code>CircleGeometry</code>)可以创建<code>圆形或者扇形</code>，其构造函数是：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)</code></pre>
<ul>
<li>这里的参数跟绘制圆是一样的，我们再来熟悉一下。<code>radius</code>是半径；<code>segments</code>表示切片数；<code>thetaStart</code>表示纬度<code>开始的弧度</code>；<code>thetaLength</code>表示纬度<code>跨过的弧度</code>。</li>
<li>
<strong>看个例子：</strong> <code>new THREE.CircleGeometry(3, 18, Math.PI / 3, Math.PI / 3 * 4)</code>可以创建一个在x轴和y轴所在平面的三分之二圆的扇形：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var circle = new THREE.Mesh(
    new THREE.CircleGeometry(2, 18, Math.PI / 3, Math.PI / 3 * 4), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(circle);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> circle = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.CircleGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">18</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">3</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">3</span> * <span class="hljs-number">4</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(circle);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238598?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238598?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>6.1.5 圆柱体</h4>
<blockquote>圆柱体(<code>CylinderGeometry</code>)的构造函数是：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)</code></pre>
<ul><li>其中，<code>radiusTop</code>与<code>radiusBottom</code>分别是顶面和底面的<code>半径</code>，由此可知，当这两个参数设置为不同的值时，实际上创建的是一个圆台；<code>height</code>是圆柱体的<code>高度</code>；<code>radiusSegments</code>与<code>heightSegments</code>可类比球体中的<code>分段</code>，一个表示底面、顶面的分段，另一个表示环面的分段；<code>openEnded</code>是一个布尔值，表示是否没有顶面和底面，缺省值为<code>false</code>，表示有顶面和底面。</li></ul>
<p><strong>标准圆柱体</strong></p>
<ul><li>
<code>new THREE.CylinderGeometry(1.5, 1.5, 3, 18, 3)</code>创建一个顶面与底面半径都为2，高度为4的圆柱体：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 3, 18, 3), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(cylinder);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cylinder = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.CylinderGeometry(<span class="hljs-number">1.5</span>, <span class="hljs-number">1.5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">18</span>, <span class="hljs-number">3</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(cylinder);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238599?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238599?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>圆台</strong></p>
<ul><li>顶面、底面半径不一致的时候，即是一个圆台。将底面半径设为<code>2</code>创建一个圆台：<code>new THREE.CylinderGeometry(1.5, 2, 3, 18, 3)</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 2, 3, 18, 3), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(cylinder);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cylinder = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.CylinderGeometry(<span class="hljs-number">1.5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">18</span>, <span class="hljs-number">3</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(cylinder);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238600?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238600?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>无底面、顶面</strong></p>
<ul><li>
<code>openEnded</code>为<code>true</code>的时候，将无底面、顶面。<code>new THREE.CylinderGeometry(1.5, 1.5, 3, 18, 3, true)</code>将创建一个没有顶面与底面的圆柱：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 3, 18, 3, true), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(cylinder);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cylinder = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.CylinderGeometry(<span class="hljs-number">1.5</span>, <span class="hljs-number">1.5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">18</span>, <span class="hljs-number">3</span>, <span class="hljs-literal">true</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(cylinder);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238601?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238601?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>6.1.6 正四面体、正八面体、正二十面体</h4>
<blockquote>正四面体(<code>TetrahedronGeometry</code>)、正八面体(<code>OctahedronGeometry</code>)、正二十面体(<code>IcosahedronGeometry</code>)的构造函数较为类似，分别为：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 正四面体
new THREE.TetrahedronGeometry(radius, detail)
// 正八面体
new THREE.OctahedronGeometry(radius, detail)
// 正二十面体
new THREE.IcosahedronGeometry(radius, detail)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 正四面体</span>
<span class="hljs-keyword">new</span> THREE.TetrahedronGeometry(radius, detail)
<span class="hljs-comment">// 正八面体</span>
<span class="hljs-keyword">new</span> THREE.OctahedronGeometry(radius, detail)
<span class="hljs-comment">// 正二十面体</span>
<span class="hljs-keyword">new</span> THREE.IcosahedronGeometry(radius, detail)</code></pre>
<ul><li>其中，<code>radius</code>是半径；<code>detail</code>是细节层次(<code>Level of Detail</code>)的层数，对于大面片数模型，可以控制在视角靠近物体时，显示面片数多的精细模型，而在离物体较远时，显示面片数较少的粗略模型。这里我们不对detail多作展开，一般可以对这个值缺省。</li></ul>
<p><strong>正四面体</strong></p>
<ul><li>
<code>new THREE.TetrahedronGeometry(2.5)</code>创建一个<code>半径</code>为<code>2.5</code>的正四面体：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tetrahedron = new THREE.Mesh(
    new THREE.TetrahedronGeometry(2.5), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(tetrahedron);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> tetrahedron = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.TetrahedronGeometry(<span class="hljs-number">2.5</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(tetrahedron);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238602?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238602?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>正八面体</strong></p>
<ul><li>
<code>new THREE.OctahedronGeometry(2.5)</code>创建一个半径为<code>2.5</code>的正八面体：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var octahedron = new THREE.Mesh(
    new THREE.OctahedronGeometry(2.5), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(octahedron);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> octahedron = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.OctahedronGeometry(<span class="hljs-number">2.5</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(octahedron);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238603?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238603?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>正二十面体</strong></p>
<ul><li>
<code>new THREE.IcosahedronGeometry(2.5)</code>创建一个半径为<code>2.5</code>的正二十面体：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var icosahedron = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.5), 
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(icosahedron);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> icosahedron = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.IcosahedronGeometry(<span class="hljs-number">2.5</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(icosahedron);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238604?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238604?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>6.1.7 圆环面</h4>
<blockquote>圆环面(<code>TorusGeometry</code>)就是甜甜圈的形状，其构造函数是：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238605?w=509&amp;h=364" src="https://static.alili.tech/img/remote/1460000012238605?w=509&amp;h=364" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>其中，<code>radius</code>是圆环半径；<code>tube</code>是管道半径；<code>radialSegments</code>与<code>tubularSegments</code>分别是两个分段数，详见上图；<code>arc</code>是圆环面的弧度，缺省值为<code>Math.PI * 2</code>。</li></ul>
<p><strong>粗糙圆环面</strong></p>
<ul><li>
<code>new THREE.TorusGeometry(2, 0.7, 4, 8)</code>创建一个粗糙的圆环面：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var torus = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.7, 4, 8),
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(torus);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> torus = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.TorusGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>),
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(torus);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238606?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238606?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>精细圆环面</strong></p>
<ul><li>
<code>new THREE.TorusGeometry(2, 0.7, 12, 18)</code>创建一个较为精细的圆环面：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var torus = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.7, 12, 18),
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(torus);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> torus = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.TorusGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">12</span>, <span class="hljs-number">18</span>),
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(torus);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238607?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238607?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>部分圆环面</strong></p>
<ul><li>
<code>new THREE.TorusGeometry(2, 0.7, 4, 8, Math.PI / 3 * 2)</code>创建部分圆环面：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var torus = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.7, 4, 8, Math.PI / 3 * 2),
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(torus);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> torus = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.TorusGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">3</span> * <span class="hljs-number">2</span>),
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(torus);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238608?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238608?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>6.1.8 圆环结</h4>
<blockquote>如果说圆环面是甜甜圈，那么圆环结(<code>TorusKnotGeometry</code>)就是打了结的甜甜圈，其构造参数为：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)</code></pre>
<ul>
<li>前四个参数在圆环面中已经有所介绍，<code>p</code>和<code>q</code>是控制其<code>样式</code>的参数，一般可以缺省，如果需要详细了解，请<a href="https://en.wikipedia.org/wiki/Torus_knot" rel="nofollow noreferrer" target="_blank">学习圆环结的相关知识</a>；<code>heightScale</code>是在<code>z轴</code>方向上的缩放。</li>
<li>
<code>new THREE.TorusKnotGeometry(2, 0.5, 32, 8)</code> 默认样式的圆环结：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var torus = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.6, 0.4, 32, 8),
    new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
    })
);
scene.add(torus);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> torus = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.TorusKnotGeometry(<span class="hljs-number">1.6</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">32</span>, <span class="hljs-number">8</span>),
    <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
        <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
    })
);
scene.add(torus);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238609?w=507&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238609?w=507&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader26">6.2 文字形状</h3>
<blockquote>文字形状(<code>TextGeometry</code>)可以用来创建三维的文字形状。</blockquote>
<h4>6.2.1 下载使用</h4>
<blockquote>使用文字前，需要下载和引用额外的字体库。字体库在<a href="https://github.com/mrdoob/three.js/tree/master/examples/fonts" rel="nofollow noreferrer" target="_blank">three.js Github master/examples/fonts</a>目录下，下载里面的<code>json</code>文件，放在你的目录下，然后加载。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238610?w=507&amp;h=340" src="https://static.alili.tech/img/remote/1460000012238610?w=507&amp;h=340" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>这里，我们就以<code>helvetiker字体</code>为例。我们在刚刚的字体库目录下，下载<code>helvetiker_regular.typeface.json</code>文件放在你的目录下，然后用以下方法加载：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用一个字体加载函数
var loader = new THREE.FontLoader();
loader.load('helvetiker_regular.typeface.json', function(font) {
    var mesh = new THREE.Mesh(
        new THREE.TextGeometry('Hello', {
            font: font,
            size: 1,
            height: 1
        }), 
        new THREE.MeshBasicMaterial({
            color: 0xffff00,
            wireframe: true
        })
    );
    scene.add(mesh);
    // 写在loader函数里面 否则不显示
    renderer.render(scene,camera);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 调用一个字体加载函数</span>
<span class="hljs-keyword">var</span> loader = <span class="hljs-keyword">new</span> THREE.FontLoader();
loader.load(<span class="hljs-string">'helvetiker_regular.typeface.json'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">font</span>) </span>{
    <span class="hljs-keyword">var</span> mesh = <span class="hljs-keyword">new</span> THREE.Mesh(
        <span class="hljs-keyword">new</span> THREE.TextGeometry(<span class="hljs-string">'Hello'</span>, {
            <span class="hljs-attr">font</span>: font,
            <span class="hljs-attr">size</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">height</span>: <span class="hljs-number">1</span>
        }), 
        <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
            <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
            <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
        })
    );
    scene.add(mesh);
    <span class="hljs-comment">// 写在loader函数里面 否则不显示</span>
    renderer.render(scene,camera);
});</code></pre>
<ul><li>
<p>注意：</p>
<ul>
<li>之前用的<code>73dev</code>版本的three.js，执行代码的时候发现报错，可能是还没有添加这个功能，所以建议去下载<a href="https://github.com/mrdoob/three.js/tree/master" rel="nofollow noreferrer" target="_blank">最新版本的three.js</a>。</li>
<li>json配置文件，需要在本地服务器打开，推荐使用<code>webstorm</code>编辑器，因为它打开html文件时，就是以本地服务器的方式打开的。或者在cmd命令行中输入<code>live-server</code>，但需要配置，具体方法<a href="#jump">请点这里</a>。</li>
</ul>
</li></ul>
<h4>6.2.2 参数介绍</h4>
<blockquote>创建文字形状的流程和之前介绍的基本几何形状是类似的，其构造函数是：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.TextGeometry(text, parameters)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.TextGeometry(text, parameters)</code></pre>
<ul><li>
<p>其中，<code>text</code>是要显示的文字字符串，<code>parameters</code>是以下参数组成的对象：</p>
<ul>
<li>
<code>size</code>：字号大小，一般为大写字母的高度</li>
<li>
<code>height</code>：文字的厚度</li>
<li>
<code>curveSegments</code>：弧线分段数，使得文字的曲线更加光滑</li>
<li>
<code>font</code>：字体，默认是<code>'helvetiker'</code>，需对应引用的字体文件</li>
<li>
<code>weight</code>：值为<code>'normal'</code>或<code>'bold'</code>，表示是否加粗</li>
<li>
<code>style</code>：值为<code>'normal'</code>或<code>'italics'</code>，表示是否斜体</li>
<li>
<code>bevelEnabled</code>：布尔值，是否使用倒角，意为在边缘处斜切</li>
<li>
<code>bevelThickness</code>：倒角厚度</li>
<li>
<code>bevelSize</code>：倒角宽度</li>
</ul>
</li></ul>
<h4>6.2.3 示例代码</h4>
<blockquote>创建一个三维文字<code>new THREE.TextGeometry("hello", {size: 1, height: 1})</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>hello</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init()&quot;>
    <script>
        function init() {
            // 调用一个渲染器
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 调用场景
            var scene = new THREE.Scene();

            // 调用相机
            var camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 100);
            camera.position.set(5, 5, 20);
            camera.lookAt(new THREE.Vector3(1.1, 0, 0));
            scene.add(camera);

            // 定义材质
            var material = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true
            });

            // 加载文字模板
            var loader = new THREE.FontLoader();
            loader.load('helvetiker_regular.typeface.json', function(font) {
                // 中文字符不能解析
                var mesh = new THREE.Mesh(new THREE.TextGeometry('hello', {
                    font: font,
                    size: 1,
                    height: 1
                }), material);
                scene.add(mesh);
                // 渲染一定要在load函数里面
                renderer.render(scene, camera);
            })
        }
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init()"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 调用一个渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 调用场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 调用相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-4</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">-3</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">20</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">1.1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 定义材质</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
                <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
                <span class="hljs-attr">wireframe</span>: <span class="hljs-literal">true</span>
            });

            <span class="hljs-comment">// 加载文字模板</span>
            <span class="hljs-keyword">var</span> loader = <span class="hljs-keyword">new</span> THREE.FontLoader();
            loader.load(<span class="hljs-string">'helvetiker_regular.typeface.json'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">font</span>) </span>{
                <span class="hljs-comment">// 中文字符不能解析</span>
                <span class="hljs-keyword">var</span> mesh = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.TextGeometry(<span class="hljs-string">'hello'</span>, {
                    <span class="hljs-attr">font</span>: font,
                    <span class="hljs-attr">size</span>: <span class="hljs-number">1</span>,
                    <span class="hljs-attr">height</span>: <span class="hljs-number">1</span>
                }), material);
                scene.add(mesh);
                <span class="hljs-comment">// 渲染一定要在load函数里面</span>
                renderer.render(scene, camera);
            })
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238611?w=507&amp;h=347" src="https://static.alili.tech/img/remote/1460000012238611?w=507&amp;h=347" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>我们可以改变材质和添加光照来改变显示效果(灯光、材质不必深究，后面会细讲)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将材质改为lambert材质
var material = new THREE.MeshLambertMaterial({
    color: 0xffff00
});

// 加上一束方向光
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 0, 0.5);
scene.add(light);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 将材质改为lambert材质</span>
<span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
});

<span class="hljs-comment">// 加上一束方向光</span>
<span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">1</span>);
light.position.set(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.5</span>);
scene.add(light);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238612?w=507&amp;h=320" src="https://static.alili.tech/img/remote/1460000012238612?w=507&amp;h=320" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>这里只是给大家看了一个效果，具体材质、灯光的原理不要去深究，直接跳过，看下面的知识点。</li></ul>
<h3 id="articleHeader27">6.3 自定义形状</h3>
<blockquote>对于Three.js没有提供的形状，可以通过自定义形状来创建。</blockquote>
<ul>
<li>由于自定义形状需要手动指定每个顶点位置，以及顶点连接情况，如果该形状非常复杂，程序员计算量就会比较大。这种情况，建议使用建模工具，创建好之后，再通过three.js导入到场景中，这样会十分高效、方便。</li>
<li>自定义形状使用的是<code>Geometry</code>类，它是其他如CubeGeometry、SphereGeometry等几何形状的父类，其构造函数是：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.Geometry()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.Geometry()</code></pre>
<ul><li>
<p>我们以创建一个梯台为例，首先，初始化一个几何形状，然后设置顶点位置以及顶点连接情况。</p>
<ul>
<li>顶面创建4个点，底面创建4个点，按照顺时针的顺序逐个创建</li>
<li>
<code>geometry</code>创建点的时候都是<code>push</code>到数组<code>vertices</code>里面的</li>
<li>所以这8个点，按照顺序都有一个对应的索引值</li>
<li>利用<code>Face3</code>的方法将<code>3</code>点连成一个<code>三角面</code>
</li>
</ul>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238613?w=507&amp;h=363" src="https://static.alili.tech/img/remote/1460000012238613?w=507&amp;h=363" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>看代码</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 初始化几何形状
var geometry = new THREE.Geometry();

// 设置顶点的位置 
// 顶部4个点
geometry.vertices.push(new THREE.Vector3(-1, 2, -1));
geometry.vertices.push(new THREE.Vector3(1, 2, -1));
geometry.vertices.push(new THREE.Vector3(1, 2, 1));
geometry.vertices.push(new THREE.Vector3(-1, 2, 1));
// 底部4顶点
geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
geometry.vertices.push(new THREE.Vector3(2, 0, -2));
geometry.vertices.push(new THREE.Vector3(2, 0, 2));
geometry.vertices.push(new THREE.Vector3(-2, 0, 2));

// 设置顶点连接情况
// 顶面
geometry.faces.push(new THREE.Face3(0, 1, 3));
geometry.faces.push(new THREE.Face3(1, 2, 3));
// 底面
geometry.faces.push(new THREE.Face3(4, 5, 6));
geometry.faces.push(new THREE.Face3(5, 6, 7));
// 四个侧面
geometry.faces.push(new THREE.Face3(1, 5, 6));
geometry.faces.push(new THREE.Face3(6, 2, 1));
geometry.faces.push(new THREE.Face3(2, 6, 7));
geometry.faces.push(new THREE.Face3(7, 3, 2));
geometry.faces.push(new THREE.Face3(3, 7, 0));
geometry.faces.push(new THREE.Face3(7, 4, 0));
geometry.faces.push(new THREE.Face3(0, 4, 5));
geometry.faces.push(new THREE.Face3(0, 5, 1));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 初始化几何形状</span>
<span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.Geometry();

<span class="hljs-comment">// 设置顶点的位置 </span>
<span class="hljs-comment">// 顶部4个点</span>
geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">-1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">-1</span>));
geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">-1</span>));
geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>));
geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">-1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>));
<span class="hljs-comment">// 底部4顶点</span>
geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">-2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-2</span>));
geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-2</span>));
geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>));
geometry.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">-2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>));

<span class="hljs-comment">// 设置顶点连接情况</span>
<span class="hljs-comment">// 顶面</span>
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>));
<span class="hljs-comment">// 底面</span>
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>));
<span class="hljs-comment">// 四个侧面</span>
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">6</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">2</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">7</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">3</span>, <span class="hljs-number">7</span>, <span class="hljs-number">0</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">7</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>));
geometry.faces.push(<span class="hljs-keyword">new</span> THREE.Face3(<span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>));</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238614?w=507&amp;h=383" src="https://static.alili.tech/img/remote/1460000012238614?w=507&amp;h=383" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>
<p>总结：</p>
<ul>
<li>需要注意的是，<code>new THREE.Vector3(-1, 2, -1)</code>创建一个<code>矢量</code>，作为顶点位置追加到<code>geometry.vertices</code>数组中。</li>
<li>而由<code>new THREE.Face3(0, 1, 3)</code>创建一个三个顶点组成的<code>面片</code>，追加到<code>geometry.faces</code>数组中。三个参数分别是四个顶点在<code>geometry.vertices</code>中的序号。</li>
</ul>
</li></ul>
<h2 id="articleHeader28">7. 材质</h2>
<blockquote>材质(<code>material</code>)，是独立于物体顶点信息之外的与渲染效果相关的属性。通过设置材质可以改变物体颜色、纹理贴图、光照模式等。</blockquote>
<ul><li>下面将会为大家介绍<code>基本材质</code>、<code>两种基于光照模型材质</code>、<code>法向量作为材质</code>、 <code>图像作为材质</code>。</li></ul>
<h3 id="articleHeader29">7.1 基本材质</h3>
<blockquote>使用基本材质(<code>BasicMaterial</code>)的物体，渲染后物体的颜色，始终为<code>该材质的颜色</code>，不会由于光照产生明暗、阴影效果。如果没有指定材质的颜色，则颜色是随机的，构造函数如下：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.MeshBasicMaterial(opt)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.MeshBasicMaterial(opt)</code></pre>
<ul><li>其中参数<code>opt</code>可以缺省，或者为包含各属性的值。如，为一个黄色正方体添加一个1<code>不透明度 (opacity)</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.MeshBasicMaterial({
    color: 0xffff00,
    opacity: 0.75
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
    <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.75</span>
});</code></pre>
<ul><li>示例代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>基本材质</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();
            
            // 相机
            var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(25, 25, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 光
            var light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(10, 15, 5);
            scene.add(light);
            
            // 材质
            var material = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                opacity: 0.75
            });

            // 几何体
            var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
            scene.add(cube);
            
            // 渲染
            renderer.render(scene, camera);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>基本材质<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();
            
            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">25</span>, <span class="hljs-number">25</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 光</span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.PointLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">1</span>, <span class="hljs-number">100</span>);
            light.position.set(<span class="hljs-number">10</span>, <span class="hljs-number">15</span>, <span class="hljs-number">5</span>);
            scene.add(light);
            
            <span class="hljs-comment">// 材质</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
                <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
                <span class="hljs-attr">opacity</span>: <span class="hljs-number">0.75</span>
            });

            <span class="hljs-comment">// 几何体</span>
            <span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>), material);
            scene.add(cube);
            
            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238615?w=503&amp;h=317" src="https://static.alili.tech/img/remote/1460000012238615?w=503&amp;h=317" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul>
<li>
<p>下面，介绍几个常用的属性</p>
<ul>
<li>
<code>visible</code>：是否可见，默认为true</li>
<li>
<code>side</code>：渲染面片正面或是反面，默认为<code>正面THREE.FrontSide</code>，可设置为<code>反面THREE.BackSide</code>，或<code>双面THREE.DoubleSide</code>
</li>
<li>
<code>wireframe</code>：是否渲染线而非面，默认为<code>false</code>
</li>
<li>
<code>color</code>：十六进制RGB颜色，如红色表示为0xff0000</li>
<li>
<code>map</code>：使用纹理贴图(下面会着重讲解)</li>
</ul>
</li>
<li>对于<code>基本材质</code>，即使改变场景中的光源，使用该材质的物体也始终为颜色处处相同的效果。当然，这不是很具有真实感，因此，接下来我们将介绍更为真实的光照模型：Lambert光照模型以及Phong光照模型。</li>
</ul>
<h3 id="articleHeader30">7.2 Lambert 材质</h3>
<blockquote>Lambert材质(<code>MeshLambertMaterial</code>)是符合Lambert光照模型的材质。Lambert光照模型的主要特点是只考虑<code>漫反射</code>而不考虑<code>镜面反射</code>的效果，因而对于金属、镜子等需要镜面反射效果的物体就<code>不适应</code>，对于其他大部分物体的漫反射效果都是适用的。</blockquote>
<ul><li>它的光照模型的公式为：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Idiffuse = Kd * Id * cos(theta)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code class="math" style="word-break: break-word; white-space: initial;"><span class="hljs-attr">Idiffuse</span> = Kd * Id * cos(theta)</code></pre>
<ul>
<li>其中，<code>Idiffuse</code>是漫反射光强，<code>Kd</code>是物体表面的漫反射属性，<code>Id</code>是光强，<code>theta</code>是光的入射角弧度。</li>
<li>当然，对于使用Three.js的Lambert材质，不需要了解以上公式就可以直接使用。创建Lambert材质的构造函数如下：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.MeshLambertMaterial()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.MeshLambertMaterial()</code></pre>
<ul><li>
<p>示例代码(创建一个黄色并使用光照的立方体)：</p>
<ul><li>光照这里不细讲，后面会着重讲解，这里大家只需要知道是干什么用的就行</li></ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Lambert材质</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();
            
            // 相机
            var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(25, 25, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);
            
            // 添加光照
            var light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(10, 15, 5);
            scene.add(light);

            // Lambert材质
            var material = new THREE.MeshLambertMaterial({
                color: 0xffff00,
            });
            
            // 几何体
            var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
            scene.add(cube);
            
            // 渲染
            renderer.render(scene, camera);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Lambert材质<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();
            
            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">25</span>, <span class="hljs-number">25</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);
            
            <span class="hljs-comment">// 添加光照</span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.PointLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">1</span>, <span class="hljs-number">100</span>);
            light.position.set(<span class="hljs-number">10</span>, <span class="hljs-number">15</span>, <span class="hljs-number">5</span>);
            scene.add(light);

            <span class="hljs-comment">// Lambert材质</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
            });
            
            <span class="hljs-comment">// 几何体</span>
            <span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>), material);
            scene.add(cube);
            
            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238616?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238616?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul>
<li>
<p>下面，介绍几个常用的属性：</p>
<ul>
<li>
<code>color</code>是用来表现材质对散射光的反射能力，也是最常用来设置材质颜色的属性。除此之外，还可以用<code>ambient</code>和<code>emissive</code>控制材质的颜色。</li>
<li>
<code>ambient</code>表示对<code>环境光</code>的<code>反射能力</code>，只有当设置<code>了AmbientLight</code>后，该值才是有效的，材质对环境光的反射能力与环境光强相乘后得到材质实际表现的颜色。</li>
<li>
<code>emissive</code>是材质的<code>自发光</code>颜色，可以用来表现光源的颜色。</li>
</ul>
</li>
<li>单独使用红色自发光：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshLambertMaterial({
    emissive: 0xff0000
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">emissive</span>: <span class="hljs-number">0xff0000</span>
})</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238617?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238617?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>如果同时使用红色的自发光与黄色的散射光：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    emissive: 0xff0000
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
    <span class="hljs-attr">emissive</span>: <span class="hljs-number">0xff0000</span>
})</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238618?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238618?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>这样就会出现一个渐变色的效果，我们可以新建一个球体：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    emissive: 0xff0000
});

var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.6, 40, 16), material);
scene.add(sphere);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
    <span class="hljs-attr">emissive</span>: <span class="hljs-number">0xff0000</span>
});

<span class="hljs-keyword">var</span> sphere = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.SphereGeometry(<span class="hljs-number">1.6</span>, <span class="hljs-number">40</span>, <span class="hljs-number">16</span>), material);
scene.add(sphere);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238619?w=501&amp;h=358" src="https://static.alili.tech/img/remote/1460000012238619?w=501&amp;h=358" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader31">7.3 Phong材质</h3>
<blockquote>Phong材质(<code>MeshPhongMaterial</code>)是符合Phong光照模型的材质。和Lambert不同的是，Phong模型考虑了<code>镜面反射</code>的效果，因此对于金属、镜面的表现尤为适合。</blockquote>
<ul><li>漫反射部分和Lambert光照模型是相同的，镜面反射模型的公式为：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Ispecular = Ks * Is * (cos(alpha)) ^ n" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code class="math" style="word-break: break-word; white-space: initial;"> Ispecular = Ks * Is * (<span class="hljs-built_in">cos</span>(alpha)) ^ <span class="hljs-built_in">n</span></code></pre>
<ul>
<li>其中，<code>Ispecular</code>是镜面反射的<code>光强</code>，<code>Ks</code>是材质表面镜面<code>反射系数</code>，<code>Is</code>是光源<code>强度</code>，<code>alpha</code>是反射光与视线的<code>夹角</code>，<code>n</code>是<code>高光指数</code>，越大则高光光斑越小。</li>
<li>由于漫反射部分与Lambert模型是一致的，因此，如果不指定镜面反射系数，而只设定漫反射，其效果与Lambert是相同的：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.MeshPhongMaterial({
    color: 0xffff00
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> THREE.MeshPhongMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
});</code></pre>
<ul><li>完整代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Phong材质</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();
            
            // 相机
            var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(25, 25, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);
            
            // 光照
            var light = new THREE.PointLight(0xffffff, 1, 200);
            light.position.set(10, 15, 25);
            scene.add(light);
            
            // 材质
            var material = new THREE.MeshPhongMaterial({
                color: 0xffff00,
                //specular: 0xffff00,
                //shininess: 1000
            });
            // 几何体
            var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
            scene.add(cube);
            //var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.6, 40, 16), material);
            //scene.add(sphere);
            
            // 渲染
            renderer.render(scene, camera);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Phong材质<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();
            
            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">25</span>, <span class="hljs-number">25</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);
            
            <span class="hljs-comment">// 光照</span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.PointLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">1</span>, <span class="hljs-number">200</span>);
            light.position.set(<span class="hljs-number">10</span>, <span class="hljs-number">15</span>, <span class="hljs-number">25</span>);
            scene.add(light);
            
            <span class="hljs-comment">// 材质</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshPhongMaterial({
                <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
                <span class="hljs-comment">//specular: 0xffff00,</span>
                <span class="hljs-comment">//shininess: 1000</span>
            });
            <span class="hljs-comment">// 几何体</span>
            <span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>), material);
            scene.add(cube);
            <span class="hljs-comment">//var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.6, 40, 16), material);</span>
            <span class="hljs-comment">//scene.add(sphere);</span>
            
            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238616?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238616?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul>
<li>
<p>下面，介绍几个常用的属性：</p>
<ul>
<li>同样地，可以指定<code>emissive</code>和<code>ambient</code>值，这里不再说明。</li>
<li>下面就<code>specular</code>值指定镜面反射系数作说明。</li>
</ul>
</li>
<li>首先，我们只使用镜面反射(<code>specular</code>)，将高光设为红色，应用于一个球体：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshPhongMaterial({
    specular: 0xff0000
});

var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.6, 40, 16), material);
scene.add(sphere);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshPhongMaterial({
    <span class="hljs-attr">specular</span>: <span class="hljs-number">0xff0000</span>
});

<span class="hljs-keyword">var</span> sphere = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.SphereGeometry(<span class="hljs-number">1.6</span>, <span class="hljs-number">40</span>, <span class="hljs-number">16</span>), material);
scene.add(sphere);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238620?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238620?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>可以通过<code>shininess</code>属性控制光照模型中的<code>n值*(高光指数，光斑)</code>，当<code>shininess</code>值越大时，高光的光斑<code>越小</code>，默认值为<code>30</code>。我们将其设置为<code>1000</code>时：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshPhongMaterial({
    specular: 0xff0000,
    shininess: 1000
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshPhongMaterial({
    <span class="hljs-attr">specular</span>: <span class="hljs-number">0xff0000</span>,
    <span class="hljs-attr">shininess</span>: <span class="hljs-number">1000</span>
});</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238621?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238621?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>使用黄色的镜面光，红色的散射光：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    specular: 0xffff00,
    shininess: 1000
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">material = <span class="hljs-keyword">new</span> THREE.MeshPhongMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>,
    <span class="hljs-attr">specular</span>: <span class="hljs-number">0xffff00</span>,
    <span class="hljs-attr">shininess</span>: <span class="hljs-number">1000</span>
});</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238622?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238622?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader32">7.4 法向材质</h3>
<blockquote>法向材质可以将材质的颜色设置为其<code>法向量的方向</code>，有时候对于调试很有帮助。</blockquote>
<ul><li>法向材质的设定很简单，不需要设置参数。构造函数如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new THREE.MeshNormalMaterial()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> THREE.MeshNormalMaterial()</code></pre>
<p><strong>材质的颜色与照相机与该物体的角度相关，下面我们只改变照相机位置，观察两个角度的颜色变化：</strong></p>
<ul><li>示例代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>法向材质</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();

            // 相机
            var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            /* 修改这里以下的值 */ 
            camera.position.set(25, 25, 25);
            /* 修改这里以上的值 */
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 光照
            var light = new THREE.PointLight(0xffffff, 1, 200);
            light.position.set(10, 15, 25);
            scene.add(light);

            // 材质
            var material = new THREE.MeshNormalMaterial();

            // 几何体
            var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
            scene.add(cube);

            // 渲染
            renderer.render(scene, camera);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>法向材质<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            <span class="hljs-comment">/* 修改这里以下的值 */</span> 
            camera.position.set(<span class="hljs-number">25</span>, <span class="hljs-number">25</span>, <span class="hljs-number">25</span>);
            <span class="hljs-comment">/* 修改这里以上的值 */</span>
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 光照</span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.PointLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">1</span>, <span class="hljs-number">200</span>);
            light.position.set(<span class="hljs-number">10</span>, <span class="hljs-number">15</span>, <span class="hljs-number">25</span>);
            scene.add(light);

            <span class="hljs-comment">// 材质</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshNormalMaterial();

            <span class="hljs-comment">// 几何体</span>
            <span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>), material);
            scene.add(cube);

            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>
<code>camera.position.set(5, 25, 25);</code>的效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238623?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238623?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>
<code>camera.position.set(25, 25, 25);</code>的效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238624?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238624?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>我们观察的是同样的三个面，但是由于观察的角度不同，物体的颜色就不同了。因此，在调试时，要知道物体的法向量，使用法向材质就很有效。</li></ul>
<h3 id="articleHeader33">7.5 材质的纹理贴图</h3>
<blockquote>在此之前，我们使用的材质都是单一颜色的，有时候，我们却希望使用图像作为材质。这时候，就需要导入图像作为纹理贴图，并添加到相应的材质中。</blockquote>
<h4>7.5.1 单张图像应用于长方体</h4>
<ul><li>首先，我们需要选择一张长宽均为128像素的图像：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238625?w=128&amp;h=128" src="https://static.alili.tech/img/remote/1460000012238625?w=128&amp;h=128" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>将其导入到纹理<code>texture</code>中：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var texture = THREE.ImageUtils.loadTexture('images/01.jpg');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> texture = THREE.ImageUtils.loadTexture(<span class="hljs-string">'images/01.jpg'</span>);</code></pre>
<ul><li>然后，将材质的<code>map</code>属性设置为<code>texture</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshLambertMaterial({
    map: texture
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">map</span>: texture
});</code></pre>
<ul><li>这样就完成了将图片应用于材质的基本步骤。但是由于现在我们还没使用动画，画面只被渲染了一次，而在导入纹理之前，已经完成了这次渲染，因此看到的只是一片黑。所以，如果没有重绘函数（将在下一章介绍），就需要在完成导入纹理的步骤后，重新绘制画面，这是在回调函数中实现的：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var texture = THREE.ImageUtils.loadTexture('images/01.jpg', {}, function() {
    renderer.render(scene, camera);
});
var material = new THREE.MeshLambertMaterial({
    map: texture
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> texture = THREE.ImageUtils.loadTexture(<span class="hljs-string">'images/01.jpg'</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    renderer.render(scene, camera);
});
<span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">map</span>: texture
});
</code></pre>
<ul><li>
<strong>注意</strong>：需要在本地服务器运行。</li></ul>
<ul><li>完整代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>纹理贴图</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();

            // 相机
            var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 1000);
            camera.position.set(25, 25, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 光照
            var light = new THREE.PointLight(0xffffff, 1, 200);
            light.position.set(10, 15, 25);
            scene.add(light);

            // 纹理(需要重绘函数)
            var texture = THREE.ImageUtils.loadTexture('images/01.jpg', {}, function() {
                renderer.render(scene, camera);
            });

            // 材质
            var material = new THREE.MeshLambertMaterial({
                map: texture
            });

            // 几何体
            var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
            scene.add(cube);
            // var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.6, 40, 16), material);
            // scene.add(sphere);

            // 渲染
            renderer.render(scene, camera);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>纹理贴图<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">1000</span>);
            camera.position.set(<span class="hljs-number">25</span>, <span class="hljs-number">25</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 光照</span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.PointLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">1</span>, <span class="hljs-number">200</span>);
            light.position.set(<span class="hljs-number">10</span>, <span class="hljs-number">15</span>, <span class="hljs-number">25</span>);
            scene.add(light);

            <span class="hljs-comment">// 纹理(需要重绘函数)</span>
            <span class="hljs-keyword">var</span> texture = THREE.ImageUtils.loadTexture(<span class="hljs-string">'images/01.jpg'</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                renderer.render(scene, camera);
            });

            <span class="hljs-comment">// 材质</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                <span class="hljs-attr">map</span>: texture
            });

            <span class="hljs-comment">// 几何体</span>
            <span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>), material);
            scene.add(cube);
            <span class="hljs-comment">// var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.6, 40, 16), material);</span>
            <span class="hljs-comment">// scene.add(sphere);</span>

            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>现在，就能看到这样的效果了：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238626?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238626?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>类似地，如果将其应用于球体，将会把整个球体应用该图像：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238627?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238627?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>7.5.2 六张图像应用于长方体</h4>
<blockquote>有时候，我们希望长方体的六面各种的贴图都不同。因此，我们首先准备了六张颜色各异的图像，分别写了数字01到06。然后，分别导入图像到六个纹理，并设置到六个材质中：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var materials = [];
for (var i = 1; i < 7; ++i) {
    materials.push(new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/0' + i + '.jpg', {}, function() {
            renderer.render(scene, camera);
        }),
        overdraw: true
    }));
}

var cube = new THREE.Mesh(
    new THREE.CubeGeometry(2, 2, 2),
    new THREE.MeshFaceMaterial(materials));
scene.add(cube);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> materials = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">7</span>; ++i) {
    materials.push(<span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
        <span class="hljs-attr">map</span>: THREE.ImageUtils.loadTexture(<span class="hljs-string">'images/0'</span> + i + <span class="hljs-string">'.jpg'</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            renderer.render(scene, camera);
        }),
        <span class="hljs-attr">overdraw</span>: <span class="hljs-literal">true</span>
    }));
}

<span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(
    <span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>),
    <span class="hljs-keyword">new</span> THREE.MeshFaceMaterial(materials));
scene.add(cube);</code></pre>
<ul><li>效果为：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238628?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238628?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>7.5.3 棋盘</h4>
<blockquote>用黑白相间的图片绘制一副棋盘</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238629" src="https://static.alili.tech/img/remote/1460000012238629" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>实现代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>棋盘</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0xffffff);

            // 场景
            var scene = new THREE.Scene();

            // 相机
            var camera = new THREE.OrthographicCamera(-10, 10, 7.5, -7.5, 0.1, 100);
            camera.position.set(0, 0, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 光照
            var light = new THREE.PointLight(0xffffff, 1, 1000);
            light.position.set(10, 15, 25);
            scene.add(light);

            var texture = THREE.ImageUtils.loadTexture('images/chess.png', {}, function() {
                renderer.render(scene, camera);
            });
            // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            // texture.repeat.set(4, 4);
            var material = new THREE.MeshLambertMaterial({
                map: texture
            });
            
            // 平面
            var plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), material);
            scene.add(plane);

            // 渲染
            renderer.render(scene, camera);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>棋盘<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0xffffff</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">7.5</span>, <span class="hljs-number">-7.5</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 光照</span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.PointLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1000</span>);
            light.position.set(<span class="hljs-number">10</span>, <span class="hljs-number">15</span>, <span class="hljs-number">25</span>);
            scene.add(light);

            <span class="hljs-keyword">var</span> texture = THREE.ImageUtils.loadTexture(<span class="hljs-string">'images/chess.png'</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                renderer.render(scene, camera);
            });
            <span class="hljs-comment">// texture.wrapS = texture.wrapT = THREE.RepeatWrapping;</span>
            <span class="hljs-comment">// texture.repeat.set(4, 4);</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                <span class="hljs-attr">map</span>: texture
            });
            
            <span class="hljs-comment">// 平面</span>
            <span class="hljs-keyword">var</span> plane = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.PlaneGeometry(<span class="hljs-number">12</span>, <span class="hljs-number">12</span>), material);
            scene.add(plane);

            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238630?w=241&amp;h=240" src="https://static.alili.tech/img/remote/1460000012238630?w=241&amp;h=240" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>可是，棋盘格是8横8纵<code>64</code>个小方格组成的，那应该怎么办呢？</strong></p>
<ul><li>首先，我们需要指定重复方式为两个方向(<code>wrapS</code>和<code>wrapT</code>)都重复：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="texture.wrapS = texture.wrapT = THREE.RepeatWrapping;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">texture.wrapS = texture.wrapT = THREE.RepeatWrapping;</code></pre>
<ul><li>然后，设置两个方向上都重复4次，由于我们的图像本来是有2行2列，所以重复4次即为8行8列：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="texture.repeat.set(4, 4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">texture.repeat.set(<span class="hljs-number">4</span>, <span class="hljs-number">4</span>);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238631?w=241&amp;h=241" src="https://static.alili.tech/img/remote/1460000012238631?w=241&amp;h=241" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader34">8. 网格</h2>
<blockquote>在学习了几何形状和材质之后，我们就能使用他们来创建物体了。最常用的一种物体就是网格（Mesh），网格是由顶点、边、面等组成的物体；其他物体包括线段(<code>Line</code>)、骨骼(<code>Bone</code>)、粒子系统(<code>ParticleSystem</code>)等。创建物体需要指定几何形状和材质，其中，几何形状决定了物体的<code>顶点位置</code>等信息，材质决定了物体的<code>颜色、纹理</code>等信息。</blockquote>
<ul><li>本章将介绍创建较为常用的物体：网格，然后介绍如何修改物体的属性。</li></ul>
<h3 id="articleHeader35">8.1 创建网格</h3>
<blockquote>在上两节中，我们学习了如何创建几何形状与材质，而网格的创建非常简单，只要把几何形状与材质传入其构造函数。最常用的物体是网格(<code>Mesh</code>)，它代表包含<code>点、线、面</code>的几何体，其构造函数是：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// geometry : 定义的几何体
// material : 材质
new THREE.Mesh(geometry,material)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// geometry : 定义的几何体</span>
<span class="hljs-comment">// material : 材质</span>
<span class="hljs-keyword">new</span> THREE.Mesh(geometry,material)</code></pre>
<ul><li>下面，让我们通过一个具体的例子了解如何创建网格：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 几何体(长方体)
var geometry = new THREE.CubeGeometry(0.6, 1.2, 1.8);

// 材质
var material = new THREE.MeshLambertMaterial({
    color: 0xffff00
});

// 网格
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 几何体(长方体)</span>
<span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">0.6</span>, <span class="hljs-number">1.2</span>, <span class="hljs-number">1.8</span>);

<span class="hljs-comment">// 材质</span>
<span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
});

<span class="hljs-comment">// 网格</span>
<span class="hljs-keyword">var</span> mesh = <span class="hljs-keyword">new</span> THREE.Mesh(geometry, material);
scene.add(mesh);</code></pre>
<ul><li>如果<code>material</code>和<code>geometry</code>之后不会<code>复用</code>的话，也可以合在一起写为：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mesh = new THREE.Mesh(new THREE.CubeGeometry(0.6, 1.2, 1.8), 
    new THREE.MeshLambertMaterial({
        color: 0xffff00
    })
);
scene.add(mesh);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> mesh = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">0.6</span>, <span class="hljs-number">1.2</span>, <span class="hljs-number">1.8</span>), 
    <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
    })
);
scene.add(mesh);</code></pre>
<ul><li>完整代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>网格</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();

            // 相机
            var camera = new THREE.OrthographicCamera(-2.5, 2.5, 1.875, -1.875, 0.1, 100);
            camera.position.set(5, 5, 20);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 光照 
            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(20, 10, 5);
            scene.add(light);

            // 材质
            var material = new THREE.MeshLambertMaterial({
                color: 0xffff00
            });

            // 几何体
            var geometry = new THREE.CubeGeometry(0.6, 1.2, 1.8);

            // 网格
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // render
            renderer.render(scene, camera);
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>网格<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-2.5</span>, <span class="hljs-number">2.5</span>, <span class="hljs-number">1.875</span>, <span class="hljs-number">-1.875</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">20</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 光照 </span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>);
            light.position.set(<span class="hljs-number">20</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>);
            scene.add(light);

            <span class="hljs-comment">// 材质</span>
            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
            });

            <span class="hljs-comment">// 几何体</span>
            <span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">0.6</span>, <span class="hljs-number">1.2</span>, <span class="hljs-number">1.8</span>);

            <span class="hljs-comment">// 网格</span>
            <span class="hljs-keyword">var</span> mesh = <span class="hljs-keyword">new</span> THREE.Mesh(geometry, material);
            scene.add(mesh);

            <span class="hljs-comment">// render</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238632?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238632?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader36">8.2 修改属性</h3>
<h4>8.2.1 材质</h4>
<blockquote>除了在构造函数中指定材质，在网格被创建后，也能对材质进行修改：</blockquote>
<ul><li>示例代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshLambertMaterial({
    color: 0xffff00
});
var geometry = new THREE.CubeGeometry(1, 2, 3);
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 重新赋值
mesh.material = new THREE.MeshLambertMaterial({
    color: 0xff0000
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
});
<span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<span class="hljs-keyword">var</span> mesh = <span class="hljs-keyword">new</span> THREE.Mesh(geometry, material);
scene.add(mesh);

<span class="hljs-comment">// 重新赋值</span>
mesh.material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
    <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>
});</code></pre>
<ul>
<li>最终会显示红色，原因很简单，在js语言预解析中，下面材质重新赋值后，就覆盖了上面定义的材质。</li>
<li>效果图</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238633?w=503&amp;h=351" src="https://static.alili.tech/img/remote/1460000012238633?w=503&amp;h=351" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>8.2.2 位置、缩放、旋转</h4>
<blockquote>位置、缩放、旋转是物体三个常用属性。由于<code>THREE.Mesh</code>基础自<code>THREE.Object3D</code>，因此包含<code>scale、rotation、position</code>三个属性。它们都是<code>THREE.Vector3</code>实例，因此修改其值的方法是相同的，这里以<code>位置</code>为例。</blockquote>
<ul><li>
<code>THREE.Vector3</code>有<code>x、y、z</code>三个属性，如果只设置其中一个属性，则可以用以下方法：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mesh.position.z = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">mesh.position.z = <span class="hljs-number">1</span>;</code></pre>
<ul><li>如果需要<code>同时</code>设置<code>多个</code>属性，可以使用以下两种方法：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mesh.position.set(1.5, -0.5, 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">mesh.position.set(<span class="hljs-number">1.5</span>, <span class="hljs-number">-0.5</span>, <span class="hljs-number">0</span>);</code></pre>
<ul><li>或</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mesh.position = new THREE.Vector3(1.5, -0.5, 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">mesh.position = <span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">1.5</span>, <span class="hljs-number">-0.5</span>, <span class="hljs-number">0</span>);</code></pre>
<ul><li>示例代码(修改位置)：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>修改位置</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
</head>

<body onload=&quot;init();&quot;>
    <script>
        function init() {
            // 渲染器
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 场景
            var scene = new THREE.Scene();

            // 相机
            var camera = new THREE.OrthographicCamera(-2.5, 2.5, 1.875, -1.875, 0.1, 100);
            camera.position.set(5, 5, 10);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            var material = new THREE.MeshLambertMaterial({
                color: 0xffff00
            });
            var geometry = new THREE.CubeGeometry(0.6, 1.2, 1.8);
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // 修改位置属性
            mesh.position.set(1, 0, 0);
            // mesh.position = new THREE.Vector3(1.5, -0.5, 0);
            // mesh.position.x = 1;

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(20, 10, 5);
            scene.add(light);

            // 坐标轴
            drawAxes(scene);

            // 渲染
            renderer.render(scene, camera);


            function drawAxes(scene) {
                // x-axis
                var xGeo = new THREE.Geometry();
                xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                xGeo.vertices.push(new THREE.Vector3(3, 0, 0));
                var xMat = new THREE.LineBasicMaterial({
                    color: 0xff0000
                });
                var xAxis = new THREE.Line(xGeo, xMat);
                scene.add(xAxis);

                // y-axis
                var yGeo = new THREE.Geometry();
                yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                yGeo.vertices.push(new THREE.Vector3(0, 3, 0));
                var yMat = new THREE.LineBasicMaterial({
                    color: 0x00ff00
                });
                var yAxis = new THREE.Line(yGeo, yMat);
                scene.add(yAxis);

                // z-axis
                var zGeo = new THREE.Geometry();
                zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                zGeo.vertices.push(new THREE.Vector3(0, 0, 3));
                var zMat = new THREE.LineBasicMaterial({
                    color: 0x00ccff
                });
                var zAxis = new THREE.Line(zGeo, zMat);
                scene.add(zAxis);
            }
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>修改位置<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 渲染器</span>
            <span class="hljs-keyword">var</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            <span class="hljs-keyword">var</span> scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-2.5</span>, <span class="hljs-number">2.5</span>, <span class="hljs-number">1.875</span>, <span class="hljs-number">-1.875</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
            });
            <span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">0.6</span>, <span class="hljs-number">1.2</span>, <span class="hljs-number">1.8</span>);
            <span class="hljs-keyword">var</span> mesh = <span class="hljs-keyword">new</span> THREE.Mesh(geometry, material);
            scene.add(mesh);

            <span class="hljs-comment">// 修改位置属性</span>
            mesh.position.set(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
            <span class="hljs-comment">// mesh.position = new THREE.Vector3(1.5, -0.5, 0);</span>
            <span class="hljs-comment">// mesh.position.x = 1;</span>

            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>);
            light.position.set(<span class="hljs-number">20</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>);
            scene.add(light);

            <span class="hljs-comment">// 坐标轴</span>
            drawAxes(scene);

            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);


            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawAxes</span>(<span class="hljs-params">scene</span>) </span>{
                <span class="hljs-comment">// x-axis</span>
                <span class="hljs-keyword">var</span> xGeo = <span class="hljs-keyword">new</span> THREE.Geometry();
                xGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
                xGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
                <span class="hljs-keyword">var</span> xMat = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>
                });
                <span class="hljs-keyword">var</span> xAxis = <span class="hljs-keyword">new</span> THREE.Line(xGeo, xMat);
                scene.add(xAxis);

                <span class="hljs-comment">// y-axis</span>
                <span class="hljs-keyword">var</span> yGeo = <span class="hljs-keyword">new</span> THREE.Geometry();
                yGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
                yGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>));
                <span class="hljs-keyword">var</span> yMat = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0x00ff00</span>
                });
                <span class="hljs-keyword">var</span> yAxis = <span class="hljs-keyword">new</span> THREE.Line(yGeo, yMat);
                scene.add(yAxis);

                <span class="hljs-comment">// z-axis</span>
                <span class="hljs-keyword">var</span> zGeo = <span class="hljs-keyword">new</span> THREE.Geometry();
                zGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
                zGeo.vertices.push(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>));
                <span class="hljs-keyword">var</span> zMat = <span class="hljs-keyword">new</span> THREE.LineBasicMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0x00ccff</span>
                });
                <span class="hljs-keyword">var</span> zAxis = <span class="hljs-keyword">new</span> THREE.Line(zGeo, zMat);
                scene.add(zAxis);
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238634?w=503&amp;h=353" src="https://static.alili.tech/img/remote/1460000012238634?w=503&amp;h=353" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>
<code>缩放</code>对应的属性是<code>scale</code>，<code>旋转</code>对应的属性是<code>rotation</code>，具体方法与上例相同，分别表示沿<code>x、y、z</code>三轴缩放或旋转。</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
three.js 入门详解(一)

## 原文链接
[https://segmentfault.com/a/1190000012238576](https://segmentfault.com/a/1190000012238576)

