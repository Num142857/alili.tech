---
title: 'H5实例教学--3D全景(ThreeJs全景Demo)' 
date: 2019-01-25 2:30:23
hidden: true
slug: by5qcmhchsc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在现在市面上很多全景H5的环境下，要实现全景的方式有很多，可以用css3直接构建也可以用基于threeJs的库来实现，还有很多别的制作全景的软件使用<br>本教学适用于未开发过3D全景的工程狮</p>
<p>如果觉得内容太无聊可以直接跳到最后</p>
<p>下载代码</p>
<h2 id="articleHeader1">理论</h2>
<p>整个3D全景所用的相关理论就不多说了，就稍微讲一下本案例用到的相关理论</p>
<p>相信程序猿们会更加关注代码实现的内容</p>
<p>这次讲解的demo是用css3DRender来构建一个正方体的全景场景</p>
<p>想象一下，我们需要做的就是构建一个正方体的盒子</p>
<p>然后把镜头放在以下这个正方体盒子里</p>
<p>每个面都贴上我们场景的一个面，那么当镜头转动时看到的就是置身其中的全景<br><span class="img-wrap"><img data-src="/img/bVJ1jP?w=400&amp;h=282" src="https://static.alili.tech/img/bVJ1jP?w=400&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>详细理论的东西以后再说，这次先跑起来一个简单的demo吧</p>
<h1 id="articleHeader2">demo解析</h1>
<p>本教学用到两个库：<br> threeJS和基于它的CSS3DRender.js</p>
<p>代码是从官网上样例上扒下来做了一点调整。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title>three.js css3d - panorama</title>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0&quot;>
    <style>
        body {
            background-color: #000000;
            margin: 0;
            cursor: move;
            overflow: hidden;
        }
        .surface { width: 1026px; height: 1026px; background-size: cover; position: absolute; }
        .surface .bg { position: absolute; width: 1026px; height: 1026px; }
    </style>
</head>
<body>
<div>
    <div id=&quot;surface_0&quot; class=&quot;surface&quot;>
        <img class=&quot;bg&quot; src=&quot;images/posx.jpg&quot; alt=&quot;&quot;>
    </div>
    <div id=&quot;surface_1&quot; class=&quot;surface&quot;>
        <img class=&quot;bg&quot; src=&quot;images/negx.jpg&quot; alt=&quot;&quot;>
    </div>
    <div id=&quot;surface_2&quot; class=&quot;surface&quot;>
        <img class=&quot;bg&quot; src=&quot;images/posy.jpg&quot; alt=&quot;&quot;>
    </div>
    <div id=&quot;surface_3&quot; class=&quot;surface&quot;>
        <img class=&quot;bg&quot; src=&quot;images/negy.jpg&quot; alt=&quot;&quot;>
    </div>
    <div id=&quot;surface_4&quot; class=&quot;surface&quot;>
        <img class=&quot;bg&quot; src=&quot;images/posz.jpg&quot; alt=&quot;&quot;>
    </div>
    <div id=&quot;surface_5&quot; class=&quot;surface&quot;>
        <img class=&quot;bg&quot; src=&quot;images/negz.jpg&quot; alt=&quot;&quot;>
    </div>
</div>
<script src=&quot;js/three.min.js&quot;></script>
<script src=&quot;js/CSS3DRenderer.min.js&quot;></script>
<script src=&quot;js/index.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>three.js css3d - panorama<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#000000</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">cursor</span>: move;
            <span class="hljs-attribute">overflow</span>: hidden;
        }
        <span class="hljs-selector-class">.surface</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">1026px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">1026px</span>; <span class="hljs-attribute">background-size</span>: cover; <span class="hljs-attribute">position</span>: absolute; }
        <span class="hljs-selector-class">.surface</span> <span class="hljs-selector-class">.bg</span> { <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">width</span>: <span class="hljs-number">1026px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">1026px</span>; }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"surface_0"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"surface"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/posx.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"surface_1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"surface"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/negx.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"surface_2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"surface"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/posy.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"surface_3"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"surface"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/negy.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"surface_4"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"surface"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/posz.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"surface_5"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"surface"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"images/negz.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/CSS3DRenderer.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>html这边没什么特别的，首先把每个面放进去，用div把每个面的图片放进去。</p>
<p>没有用官网demo的实现方式是因为官网是create一个img插入到页面，我们在对每个面添加元素的时候不太方便</p>
<p>先把六个面定义好，如果要在每个面上加入一些交互的元素，直接在html上添加dom就可以了</p>
<p>一共就引入了3个js，除了index另外两个都是压缩过的js，不用关心，看一下index.js的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

scene = new THREE.Scene();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>camera = <span class="hljs-keyword">new</span> THREE.PerspectiveCamera( <span class="hljs-number">75</span>, <span class="hljs-built_in">window</span>.innerWidth / <span class="hljs-built_in">window</span>.innerHeight, <span class="hljs-number">1</span>, <span class="hljs-number">1000</span> );

scene = <span class="hljs-keyword">new</span> THREE.Scene();</code></pre>
<p>那么很明显这两行代码，字面上的意思就是创建了一个相机，创建了一个场景。</p>
<p>那这里稍微解释一下这两个类</p>
<h2 id="articleHeader3">PerspectiveCamera</h2>
<p>以下是官网的解释<br><span class="img-wrap"><img data-src="/img/bVJ1kE?w=1068&amp;h=123" src="https://static.alili.tech/img/bVJ1kE?w=1068&amp;h=123" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br> 大概意思：<br> 这是一个模仿人眼的投影模式，它是用于渲染3D场景最常见的投影模式。<br> 总之这个类就是new一个镜头<br> 下面是样例代码<br><span class="img-wrap"><img data-src="/img/bVJ1kK?w=696&amp;h=80" src="https://static.alili.tech/img/bVJ1kK?w=696&amp;h=80" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个类的构造函数接受四个参数<br><span class="img-wrap"><img data-src="/img/bVJ1k7?w=413&amp;h=172" src="https://static.alili.tech/img/bVJ1k7?w=413&amp;h=172" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>那么这四个参数具体是什么东西？<br><span class="img-wrap"><img data-src="/img/bVJ1lg?w=584&amp;h=311" src="https://static.alili.tech/img/bVJ1lg?w=584&amp;h=311" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>图片来源：<a href="https://isux.tencent.com/3d.html" rel="nofollow noreferrer" target="_blank">https://isux.tencent.com/3d.html</a></p>
<p>分别表示的<br>镜头夹角，宽高比，最近焦距，最远焦距</p>
<h2 id="articleHeader4">Scene</h2>
<p>接下来，用Scene类创建场景<br>以下官方说明<br><span class="img-wrap"><img data-src="/img/bVJ1lB?w=961&amp;h=226" src="https://static.alili.tech/img/bVJ1lB?w=961&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这东西创建了一个场景，这个场景允许你对某个东西某个位置通过threeJs渲染场景</p>
<p>创建了场景和相机，我们需要往场景里面放入之前说的正方体</p>
<p>首先定义好六个面的数据，每个面的位置，3D旋转的旋转角度。</p>
<p>position三个参数分别对应的x,y,z轴的位置<br>因为我选的面宽度是1024px<br>所以位置是基于中心点的正负1024/2</p>
<p>rotation的三个参数分贝对应xyz轴的旋转角度<br>Math.PI/2代表90度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sides = [
    {
        position: [ -512, 0, 0 ],//位置
        rotation: [ 0, Math.PI / 2, 0 ]//角度
    },
    {
        position: [ 512, 0, 0 ],
        rotation: [ 0, -Math.PI / 2, 0 ]
    },
    {
        position: [ 0,  512, 0 ],
        rotation: [ Math.PI / 2, 0, Math.PI ]
    },
    {
        position: [ 0, -512, 0 ],
        rotation: [ - Math.PI / 2, 0, Math.PI ]
    },
    {
        position: [ 0, 0,  512 ],
        rotation: [ 0, Math.PI, 0 ]
    },
    {
        position: [ 0, 0, -512 ],
        rotation: [ 0, 0, 0 ]
    }
];

/**
 * 根据六个面的信息，new出六个对象放入场景中
 */
for ( var i = 0; i < sides.length; i ++ ) {

    var side = sides[ i ];

    var element = document.getElementById(&quot;surface_&quot;+i);
    element.width = 1026; // 2 pixels extra to close the gap.多余的2像素用于闭合正方体

    var object = new THREE.CSS3DObject( element );
    object.position.fromArray( side.position );
    object.rotation.fromArray( side.rotation );
    scene.add( object );

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var sides = [
    {
        <span class="hljs-built_in">position</span>: [ -<span class="hljs-number">512</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span> ],<span class="hljs-comment">//位置</span>
        rotation: [ <span class="hljs-number">0</span>, Math.<span class="hljs-built_in">PI</span> / <span class="hljs-number">2</span>, <span class="hljs-number">0</span> ]<span class="hljs-comment">//角度</span>
    },
    {
        <span class="hljs-built_in">position</span>: [ <span class="hljs-number">512</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span> ],
        rotation: [ <span class="hljs-number">0</span>, -Math.<span class="hljs-built_in">PI</span> / <span class="hljs-number">2</span>, <span class="hljs-number">0</span> ]
    },
    {
        <span class="hljs-built_in">position</span>: [ <span class="hljs-number">0</span>,  <span class="hljs-number">512</span>, <span class="hljs-number">0</span> ],
        rotation: [ Math.<span class="hljs-built_in">PI</span> / <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, Math.<span class="hljs-built_in">PI</span> ]
    },
    {
        <span class="hljs-built_in">position</span>: [ <span class="hljs-number">0</span>, -<span class="hljs-number">512</span>, <span class="hljs-number">0</span> ],
        rotation: [ - Math.<span class="hljs-built_in">PI</span> / <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, Math.<span class="hljs-built_in">PI</span> ]
    },
    {
        <span class="hljs-built_in">position</span>: [ <span class="hljs-number">0</span>, <span class="hljs-number">0</span>,  <span class="hljs-number">512</span> ],
        rotation: [ <span class="hljs-number">0</span>, Math.<span class="hljs-built_in">PI</span>, <span class="hljs-number">0</span> ]
    },
    {
        <span class="hljs-built_in">position</span>: [ <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, -<span class="hljs-number">512</span> ],
        rotation: [ <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span> ]
    }
];

<span class="hljs-comment">/**
 * 根据六个面的信息，new出六个对象放入场景中
 */</span>
<span class="hljs-keyword">for</span> ( var i = <span class="hljs-number">0</span>; i &lt; sides.length; i ++ ) {

    var <span class="hljs-built_in">side</span> = sides[ i ];

    var element = document.getElementById(<span class="hljs-string">"surface_"</span>+i);
    element.width = <span class="hljs-number">1026</span>; <span class="hljs-comment">// 2 pixels extra to close the gap.多余的2像素用于闭合正方体</span>

    var object = new THREE.CSS3DObject( element );
    object.<span class="hljs-built_in">position</span>.fromArray( <span class="hljs-built_in">side</span>.<span class="hljs-built_in">position</span> );
    object.rotation.fromArray( <span class="hljs-built_in">side</span>.rotation );
    scene.add( object );

}</code></pre>
<h2 id="articleHeader5">CSS3DObject</h2>
<p>那么这里有一个新出现的类CSS3DObject<br>不过这个类不属于官方类，而是我们引用的3DRender库里的类</p>
<p>没有文档我们看一下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="THREE.CSS3DObject = function (element) {
    THREE.Object3D.call(this);
    this.element = element;
    this.element.style.position = 'absolute';
    this.addEventListener('removed', function (event) {
        if (this.element.parentNode !== null) {
            this.element.parentNode.removeChild(this.element);
            for (var i = 0, l = this.children.length; i < l; i++) {
                this.children[i].dispatchEvent(event)
            }
        }
    })
}
;
THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>THREE.CSS3DObject = function (element) {
    THREE.Object3D.call(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.element = element;
    <span class="hljs-keyword">this</span>.element.style.position = <span class="hljs-string">'absolute'</span>;
    <span class="hljs-keyword">this</span>.addEventListener(<span class="hljs-string">'removed'</span>, function (event) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.element.parentNode !== <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">this</span>.element.parentNode.removeChild(<span class="hljs-keyword">this</span>.element);
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = <span class="hljs-keyword">this</span>.children.length; i &lt; l; i++) {
                <span class="hljs-keyword">this</span>.children[i].dispatchEvent(event)
            }
        }
    })
}
;
THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);</code></pre>
<p>可以看出这是一个继承于THREE.Object3D的类<br>将传入的element的postion改为绝对定位，然后加了个被移除时的事件。<br>没有定义什么别的特别的东西，那么我们查一下官方Object3D的类</p>
<h2 id="articleHeader6">Object3D</h2>
<p><span class="img-wrap"><img data-src="/img/bVJ1ml?w=1233&amp;h=273" src="https://static.alili.tech/img/bVJ1ml?w=1233&amp;h=273" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br> 这个类就是一个定义对象的基本类，其中new的对象包含以下两个属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".position

The object's local position.

.rotation

Object's local rotation (see Euler angles), in radians." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>.<span class="hljs-built_in">position</span>

The object's <span class="hljs-built_in">local</span> <span class="hljs-built_in">position</span>.

.rotation

Object's <span class="hljs-built_in">local</span> rotation (see Euler angles), <span class="hljs-keyword">in</span> radians.</code></pre>
<p>分别表示对象的位置和旋转角度。<br>那么for循环就是定义六个对象加入场景中<br>好，我们继续</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderer = new THREE.CSS3DRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">renderer</span> = new THREE.CSS3DRenderer();
<span class="hljs-keyword">renderer</span>.setSize( <span class="hljs-keyword">window</span>.innerWidth, <span class="hljs-keyword">window</span>.innerHeight );
document.body.appendChild( <span class="hljs-keyword">renderer</span>.domElement );</code></pre>
<h2 id="articleHeader7">CSS3DRenderer</h2>
<p>这是我们引用的库里的类<br>这个类的主要功能是根据three中的场景和镜头的相关信息<br>使用dom元素和css3D的属性来渲染出来</p>
<p>在这里只是new了这个类和设置了宽高<br>但是CSS3DRender在这里还没有开始渲染页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'wheel', onDocumentMouseWheel, false );

document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener( 'touchmove', onDocumentTouchMove, false );

window.addEventListener( 'resize', onWindowResize, false );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">document</span>.addEventListener( <span class="hljs-string">'mousedown'</span>, onDocumentMouseDown, <span class="hljs-literal">false</span> );
<span class="hljs-built_in">document</span>.addEventListener( <span class="hljs-string">'wheel'</span>, onDocumentMouseWheel, <span class="hljs-literal">false</span> );

<span class="hljs-built_in">document</span>.addEventListener( <span class="hljs-string">'touchstart'</span>, onDocumentTouchStart, <span class="hljs-literal">false</span> );
<span class="hljs-built_in">document</span>.addEventListener( <span class="hljs-string">'touchmove'</span>, onDocumentTouchMove, <span class="hljs-literal">false</span> );

<span class="hljs-built_in">window</span>.addEventListener( <span class="hljs-string">'resize'</span>, onWindowResize, <span class="hljs-literal">false</span> );</code></pre>
<p>这里的事件绑定就不详细说了<br>接下来解析一下渲染时的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animate();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">animate()<span class="hljs-comment">;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function animate() {

    requestAnimationFrame( animate );

    // lat +=  0.1;
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    target.x = Math.sin( phi ) * Math.cos( theta );
    target.y = Math.cos( phi );
    target.z = Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( target );
    /**
     * 通过传入的scene和camera
     * 获取其中object在创建时候传入的element信息
     * 以及后面定义的包括位置，角度等信息
     * 根据场景中的obj创建dom元素
     * 插入render本身自己创建的场景div中
     * 达到渲染场景的效果
     */
    renderer.render( scene, camera );

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>function animate() {

    requestAnimationFrame( animate );

    <span class="hljs-comment">// lat +=  0.1;</span>
    lat = Math.<span class="hljs-keyword">max</span>( - <span class="hljs-number">85</span>, Math.<span class="hljs-keyword">min</span>( <span class="hljs-number">85</span>, lat ) );
    phi = THREE.Math.degToRad( <span class="hljs-number">90</span> - lat );
    theta = THREE.Math.degToRad( lon );

    target.x = Math.<span class="hljs-keyword">sin</span>( phi ) * Math.<span class="hljs-keyword">cos</span>( theta );
    target.y = Math.<span class="hljs-keyword">cos</span>( phi );
    target.z = Math.<span class="hljs-keyword">sin</span>( phi ) * Math.<span class="hljs-keyword">sin</span>( theta );

    <span class="hljs-keyword">camera</span>.lookAt( target );
    <span class="hljs-comment">/**
     * 通过传入的scene和camera
     * 获取其中object在创建时候传入的element信息
     * 以及后面定义的包括位置，角度等信息
     * 根据场景中的obj创建dom元素
     * 插入render本身自己创建的场景div中
     * 达到渲染场景的效果
     */</span>
    <span class="hljs-keyword">renderer</span>.<span class="hljs-keyword">render</span>( scene, <span class="hljs-keyword">camera</span> );

}</code></pre>
<p>requestAnimationFrame( animate );<br>这个方法可以根据帧速率触发animate方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    target.x = Math.sin( phi ) * Math.cos( theta );
    target.y = Math.cos( phi );
    target.z = Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( target );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>lat = Math.<span class="hljs-built_in">max</span>( - <span class="hljs-number">85</span>, Math.<span class="hljs-built_in">min</span>( <span class="hljs-number">85</span>, lat ) );
    phi = THREE.Math.degToRad( <span class="hljs-number">90</span> - lat );
    theta = THREE.Math.degToRad( lon );

    <span class="hljs-keyword">target</span>.x = Math.<span class="hljs-built_in">sin</span>( phi ) * Math.<span class="hljs-built_in">cos</span>( theta );
    <span class="hljs-keyword">target</span>.y = Math.<span class="hljs-built_in">cos</span>( phi );
    <span class="hljs-keyword">target</span>.z = Math.<span class="hljs-built_in">sin</span>( phi ) * Math.<span class="hljs-built_in">sin</span>( theta );

    camera.lookAt( <span class="hljs-keyword">target</span> );</code></pre>
<p>这段代码根据现成的（通过手指滑动或鼠标滑动实时更新的）属性值，调整camera镜头的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderer.render( scene, camera );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">renderer</span>.<span class="hljs-keyword">render</span>( scene, <span class="hljs-keyword">camera</span> );</code></pre>
<p>然后渲染........<br>因为render里面的代码比较多，这里就不贴代码了，大概总结一下render做的事情就是<br>首先render自己创建一个作为场景的div</p>
<p>通过传入的scene和camera</p>
<p>获取其中object在创建时候传入的element信息<br>以及后面定义的包括位置，角度等信息</p>
<p>根据场景中的obj创建dom元素（就是通过dom实现本应在canvas里的东西）</p>
<p>插入render本身自己创建的场景div中</p>
<p>当镜头方向变了，获取到的参数就变了，通过传入的对象身上带有的变化的参数改变页面上dom元素的位置。</p>
<p>达到渲染场景的效果</p>
<h1 id="articleHeader8">代码下载</h1>
<p>链接: <a href="http://pan.baidu.com/s/1eR2Rlb8" rel="nofollow noreferrer" target="_blank">http://pan.baidu.com/s/1eR2Rlb8</a> 密码: sdyt</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5实例教学--3D全景(ThreeJs全景Demo)

## 原文链接
[https://segmentfault.com/a/1190000008545795](https://segmentfault.com/a/1190000008545795)

