---
title: '基于 HTML5 WebGL 的 3D 网络拓扑图' 
date: 2019-01-10 2:30:08
hidden: true
slug: yb04db59239
categories: [reprint]
---

{{< raw >}}

                    
<p>在数据量很大的2D 场景下，要找到具体的模型比较困难，并且只能显示出模型的的某一部分，显示也不够直观，这种时候能快速搭建出 3D 场景就有很大需求了。但是搭建 3D 应用场景又依赖于通过 3ds Max 或 Maya 的专业 3D 设计师来建模，Unity 3D 引擎做图形渲染等，这对用户来说都是挑战！不过，HT 一站式的提供了从建模到渲染，包括和 2D 组件呈现和数据融合的一站式解决方案。HT 基于 WebGL 的 3D 技术的图形组件 ht.graph3dView 组件通过对 WebGL 底层技术的封装，与 HT 其他组件一样， 基于 HT 统一的 DataModel 数据模型来驱动图形显示，极大降低了 3D 图形技术开发的门槛，在熟悉HT 数据模型基础上，一般程序员只需要 1 小时的学习即可上手 3D 图形开发。</p>
<p>好了，废话不多说，先附上 Demo：<a href="http://www.hightopo.com/demo/blog_3dedge_20170630/index.html" rel="nofollow noreferrer" target="_blank">http://www.hightopo.com/demo/...</a></p>
<p><span class="img-wrap"><img data-src="/img/bVP6z2?w=1180&amp;h=564" src="https://static.alili.tech/img/bVP6z2?w=1180&amp;h=564" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>当然，这里的我只是用简单的图形来表示设备，脑洞大开的你当然可以将其换成更有意思的模型。</p>
<p>接下来看看我们是怎么做到的：</p>
<p>1、准备工作：</p>
<p>3D 和 2D 的 API 的设计上保持了很多一致性，3D 视图组件是 ht.graph3d.Graph3dView，  2D 视图组件是 ht.graph.GraphView，两者可共享同一数据模型 DataModel。在 HT 中，为了让了获得接近真实三维物体的视觉效果，我们通过透视投影使得远的对象变小，近的对象变大，平行线会出现先交等更接近人眼观察的视觉效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVP6Ag?w=536&amp;h=366" src="https://static.alili.tech/img/bVP6Ag?w=536&amp;h=366" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，透视投影最终显示到屏幕上的内容只有截头椎体部分的内容，因此 GraphView 提供了 eye，center，up，far，near， fovy 和 aspect 参数来控制截头椎体的具体范围，我们在实际运用中用到更多的是 eye 和 center：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getEye() | setEye([x, y, z])，决定眼睛（或 Camera）所在位置，默认值为 [0, 300, 1000]；

getCenter() | setCenter([x, y, z])，决定目标中心点（或 Target）所在位置，默认值为 [0, 0, 0]；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">getEye</span>() | <span class="hljs-selector-tag">setEye</span>([x, y, z])，决定眼睛（或 <span class="hljs-selector-tag">Camera</span>）所在位置，默认值为 <span class="hljs-selector-attr">[0, 300, 1000]</span>；

<span class="hljs-selector-tag">getCenter</span>() | <span class="hljs-selector-tag">setCenter</span>([x, y, z])，决定目标中心点（或 <span class="hljs-selector-tag">Target</span>）所在位置，默认值为 <span class="hljs-selector-attr">[0, 0, 0]</span>；
</code></pre>
<p>详情看 HT for Web 3D 手册 手册 （<a href="http://www.hightopo.com/guide/guide/core/3d/ht-3d-guide.html" rel="nofollow noreferrer" target="_blank">http://www.hightopo.com/guide...</a>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dataModel = new ht.DataModel();
g3d = new ht.graph3d.Graph3dView(dataModel);    
g3d.setEye(1800, 800, 1000);
g3d.setCenter(0, 100, 0);
g3d.setDashDisabled(false);
g3d.getView().style.background = 'rgb(10, 20, 36)';
g3d.addToDOM();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>dataModel = new ht.DataModel();
g3d = new ht.graph3d.Graph3dView(dataModel);    
g3d.setEye(<span class="hljs-number">1800</span>, <span class="hljs-number">800</span>, <span class="hljs-number">1000</span>);
g3d.setCenter(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">0</span>);
g3d.setDashDisabled(false);
g3d.getView().style.background = 'rgb(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>)';
g3d.addToDOM();</code></pre>
<p>2、创建设备：</p>
<p>服务器，Demo 中的服务器其实是通过 addStyleIcon 方式在服务器的位置添加图片，详情可看 HT for Web 入门手册（<a href="http://www.hightopo.com/guide/guide/core/beginners/ht-beginners-guide.html" rel="nofollow noreferrer" target="_blank">http://www.hightopo.com/guide...</a>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注册图片
ht.Default.setImage('server', 'server.png');

var server = new ht.Node();
        server.s3(0, 0, 0);
        server.p3(0, 60, 0);
        server.addStyleIcon('icon', {
            position: 0,
            width: 200, 
            autorotate: true,
            transparent: true,               
            height: 200,
            names: ['server']
        });
        dataModel.add(server);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//注册图片</span>
ht.Default.setImage(<span class="hljs-string">'server'</span>, <span class="hljs-string">'server.png'</span>);

var <span class="hljs-keyword">server</span> = <span class="hljs-keyword">new</span> ht.Node();
        <span class="hljs-keyword">server</span>.s3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
        <span class="hljs-keyword">server</span>.p3(<span class="hljs-number">0</span>, <span class="hljs-number">60</span>, <span class="hljs-number">0</span>);
        <span class="hljs-keyword">server</span>.addStyleIcon(<span class="hljs-string">'icon'</span>, {
            position: <span class="hljs-number">0</span>,
            width: <span class="hljs-number">200</span>, 
            autorotate: <span class="hljs-keyword">true</span>,
            transparent: <span class="hljs-keyword">true</span>,               
            height: <span class="hljs-number">200</span>,
            names: [<span class="hljs-string">'server'</span>]
        });
        dataModel.add(<span class="hljs-keyword">server</span>);</code></pre>
<p>工作台，这里的工作台实际上是立体圆柱来表示的，HT 在 GraphView 的 2D 图形上，呈现各种图形是通过 style 的shape 属性决定，类似的 HT 在 3D 上提供了 shape3d属性，预定义了多种 3D 的形体，详情见HT for Web 3D 手册。不过在这里我并没有用预定义的图形，而是通过 ht.Default.createRingModel 的方式创建圆柱，该方法可以根据 xy 平面的曲线，环绕一周形成 3D 模型，所以可以用来定义多种圆形 3D 模型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var desktop = new ht.Node();
        desktop.s({
            '3d.selectable': false,
            'shape3d': ht.Default.createRingModel([
                        0, 40,
                        450, 40,
                        450, 0,
                        0, 40
                    ], null, 20, false, false, 50),
            'shape3d.color': '#003333'
        });
desktop.s3(1, 1, 1);
dataModel.add(desktop);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> desktop = <span class="hljs-keyword">new</span> ht.Node();
        desktop.s({
            <span class="hljs-string">'3d.selectable'</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-string">'shape3d'</span>: ht.Default.createRingModel([
                        <span class="hljs-number">0</span>, <span class="hljs-number">40</span>,
                        <span class="hljs-number">450</span>, <span class="hljs-number">40</span>,
                        <span class="hljs-number">450</span>, <span class="hljs-number">0</span>,
                        <span class="hljs-number">0</span>, <span class="hljs-number">40</span>
                    ], <span class="hljs-literal">null</span>, <span class="hljs-number">20</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">50</span>),
            <span class="hljs-string">'shape3d.color'</span>: <span class="hljs-string">'#003333'</span>
        });
desktop.s3(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>);
dataModel.<span class="hljs-keyword">add</span>(desktop);</code></pre>
<p>平台上的设备，我们一共创建了 32 个设备：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var count = 32;
            radius = 400;
            index = count/2;
        for (var i =  1; i <= count/2; i++) {
            var device1_angle1 = Math.PI * 2 * (index - i) / count;
                device1_angle2 = Math.PI * 2 * (index + i) / count;
                device1_angle3 = Math.PI * 2 * index / count;

            var device1_1 = createDevice(device1_angle1, radius, 60);
                device1_2 = createDevice(device1_angle2, radius, 60);
                device1_3 = createDevice(device1_angle3, radius, 60);

            layoutDevice1(device1_1, device1_angle1);
            var device1_edge1 = createEdge(device1_1, server, 'line1');
            device1_edge1.s({'shape3d.color': 'rgb(205, 211, 34)'});
            dataModel.add(device1_1);
            dataModel.add(device1_edge1);

            layoutDevice1(device1_2, device1_angle2);
            var device1_edge2 = createEdge(device1_2, server, 'line1');
            device1_edge2.s({'shape3d.color': 'rgb(205, 211, 34)'});
            dataModel.add(device1_2);
            dataModel.add(device1_edge2);

            layoutDevice1(device1_3, device1_angle3);
            var device1_edge3 = createEdge(device1_3, server, 'line1');
            device1_edge3.s({'shape3d.color': 'rgb(205, 211, 34)'});
            dataModel.add(device1_3);
            dataModel.add(device1_edge3);
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var count = <span class="hljs-number">32</span><span class="hljs-comment">;</span>
            radius = <span class="hljs-number">400</span><span class="hljs-comment">;</span>
            index = count/2<span class="hljs-comment">;</span>
        for (<span class="hljs-name">var</span> i =  <span class="hljs-number">1</span><span class="hljs-comment">; i &lt;= count/2; i++) {</span>
            var device1_angle1 = Math.PI * 2 * (<span class="hljs-name">index</span> - i) / count<span class="hljs-comment">;</span>
                device1_angle2 = Math.PI * 2 * (<span class="hljs-name">index</span> + i) / count<span class="hljs-comment">;</span>
                device1_angle3 = Math.PI * 2 * index / count<span class="hljs-comment">;</span>

            var device1_1 = createDevice(<span class="hljs-name">device1_angle1</span>, radius, <span class="hljs-number">60</span>)<span class="hljs-comment">;</span>
                device1_2 = createDevice(<span class="hljs-name">device1_angle2</span>, radius, <span class="hljs-number">60</span>)<span class="hljs-comment">;</span>
                device1_3 = createDevice(<span class="hljs-name">device1_angle3</span>, radius, <span class="hljs-number">60</span>)<span class="hljs-comment">;</span>

            layoutDevice1(<span class="hljs-name">device1_1</span>, device1_angle1)<span class="hljs-comment">;</span>
            var device1_edge1 = createEdge(<span class="hljs-name">device1_1</span>, server, 'line1')<span class="hljs-comment">;</span>
            device1_edge1.s({'shape3d.color': 'rgb(<span class="hljs-number">205</span>, <span class="hljs-number">211</span>, <span class="hljs-number">34</span>)'})<span class="hljs-comment">;</span>
            dataModel.add(<span class="hljs-name">device1_1</span>)<span class="hljs-comment">;</span>
            dataModel.add(<span class="hljs-name">device1_edge1</span>)<span class="hljs-comment">;</span>

            layoutDevice1(<span class="hljs-name">device1_2</span>, device1_angle2)<span class="hljs-comment">;</span>
            var device1_edge2 = createEdge(<span class="hljs-name">device1_2</span>, server, 'line1')<span class="hljs-comment">;</span>
            device1_edge2.s({'shape3d.color': 'rgb(<span class="hljs-number">205</span>, <span class="hljs-number">211</span>, <span class="hljs-number">34</span>)'})<span class="hljs-comment">;</span>
            dataModel.add(<span class="hljs-name">device1_2</span>)<span class="hljs-comment">;</span>
            dataModel.add(<span class="hljs-name">device1_edge2</span>)<span class="hljs-comment">;</span>

            layoutDevice1(<span class="hljs-name">device1_3</span>, device1_angle3)<span class="hljs-comment">;</span>
            var device1_edge3 = createEdge(<span class="hljs-name">device1_3</span>, server, 'line1')<span class="hljs-comment">;</span>
            device1_edge3.s({'shape3d.color': 'rgb(<span class="hljs-number">205</span>, <span class="hljs-number">211</span>, <span class="hljs-number">34</span>)'})<span class="hljs-comment">;</span>
            dataModel.add(<span class="hljs-name">device1_3</span>)<span class="hljs-comment">;</span>
            dataModel.add(<span class="hljs-name">device1_edge3</span>)<span class="hljs-comment">;</span>
        }</code></pre>
<p>为了让创建的设备在平台上的布局更加合理，根据 index 计算出设备摆放角度，并且根据圆柱中心，圆盘半径和角度计算出每个设备摆放的位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createDevice (angle, x, y) {
        var node = new ht.Node();
            cos = Math.cos(angle);
            sin = Math.sin(angle);
        node.p3(x*sin, y, x*cos);
        return node;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createDevice</span> <span class="hljs-params">(angle, x, y)</span> {</span>
        var node = new ht.Node();
            <span class="hljs-built_in">cos</span> = Math.<span class="hljs-built_in">cos</span>(<span class="hljs-built_in">angle</span>);
            <span class="hljs-built_in">sin</span> = Math.<span class="hljs-built_in">sin</span>(<span class="hljs-built_in">angle</span>);
        node.p3(x*<span class="hljs-built_in">sin</span>, y, x*<span class="hljs-built_in">cos</span>);
        <span class="hljs-keyword">return</span> node;
    }</code></pre>
<p>其他设备，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 18;
    var h = [800, 900, 1000, 1100, 1200];
    var v = [40, 60, 80, 100];
    var colors = ['#fcfc63', '#00E1E4'];
    for (var j = 0; j < num; j++) {
            var device2_angle = Math.PI * j / num;
            var device2 = createDevice(device2_angle, 
                                       h[Math.floor(Math.random()*5)], v[Math.floor(Math.random()*4)]);
            device2.s3(100, 20, 100); 
            device2.s({
               'shape3d': 'cylinder',
               'shape3d.color': colors[Math.floor(Math.random()*2)]
    });
    var device2_edge = createEdge(device2, desktop , 'line2');
    device2_edge.s({'shape3d.color': 'rgb(0, 203, 94)'});

    dataModel.add(device2);
    dataModel.add(device2_edge);         
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> num = <span class="hljs-number">18</span>;
    <span class="hljs-keyword">var</span> h = [<span class="hljs-number">800</span>, <span class="hljs-number">900</span>, <span class="hljs-number">1000</span>, <span class="hljs-number">1100</span>, <span class="hljs-number">1200</span>];
    <span class="hljs-keyword">var</span> v = [<span class="hljs-number">40</span>, <span class="hljs-number">60</span>, <span class="hljs-number">80</span>, <span class="hljs-number">100</span>];
    <span class="hljs-keyword">var</span> colors = [<span class="hljs-string">'#fcfc63'</span>, <span class="hljs-string">'#00E1E4'</span>];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; num; j++) {
            <span class="hljs-keyword">var</span> device2_angle = <span class="hljs-built_in">Math</span>.PI * j / num;
            <span class="hljs-keyword">var</span> device2 = createDevice(device2_angle, 
                                       h[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">5</span>)], v[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">4</span>)]);
            device2.s3(<span class="hljs-number">100</span>, <span class="hljs-number">20</span>, <span class="hljs-number">100</span>); 
            device2.s({
               <span class="hljs-string">'shape3d'</span>: <span class="hljs-string">'cylinder'</span>,
               <span class="hljs-string">'shape3d.color'</span>: colors[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">2</span>)]
    });
    <span class="hljs-keyword">var</span> device2_edge = createEdge(device2, desktop , <span class="hljs-string">'line2'</span>);
    device2_edge.s({<span class="hljs-string">'shape3d.color'</span>: <span class="hljs-string">'rgb(0, 203, 94)'</span>});

    dataModel.add(device2);
    dataModel.add(device2_edge);         
 }</code></pre>
<p>3、连线</p>
<p>HT for Web 提供了默认的直线和多点的连线类型能满足大部分基本拓扑图形应用，但在这里我们需要根据实际需求绘制曲线，所以，需要用到自定义连线类型，详情看HT for Web 连线类型手册：</p>
<p>用 ht.Default.setEdgeType(type, func, mutual) 函数可用于自定义新连线类型：</p>
<p>type：字符串类型的连线类型，对应 style 的 edge.type 属性；<br>func：函数类型，根据传入参数（edge，gap，graphView，sameSourceWithFirstEdge）返回连线走向信息：</p>
<p>edge：当前连线对象；</p>
<p>gap：多条连线成捆时，本连线对象对应中心连线的间距；</p>
<p>graphView：当前对应拓扑组件对象；</p>
<p>sameSourceWithFirstEdge：boolean 类型，改连线是否与同组的第一条同源；</p>
<p>返回值为 {points： new ht.List(...)，segments：new ht.List(...)} 结构的连线走向信息，segments 可取值如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1、moveTo，占用 1 个点信息；

 2、lineTo，占用 1 个点信息；

 3、quadraticCurveTo，占用 2 个点信息；

 4、bezierCurveTo，占用 3 个点信息；

 5、closePath，不占用点信息；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1</span>、moveTo，占用 <span class="hljs-number">1</span> 个点信息；

 <span class="hljs-number">2</span>、lineTo，占用 <span class="hljs-number">1</span> 个点信息；

 <span class="hljs-number">3</span>、quadraticCurveTo，占用 <span class="hljs-number">2</span> 个点信息；

 <span class="hljs-number">4</span>、bezierCurveTo，占用 <span class="hljs-number">3</span> 个点信息；

 <span class="hljs-number">5</span>、closePath，不占用点信息；</code></pre>
<p>mutual：该参数决定连线是否影响起始或结束节点上的所有连线，默认为 false 代表只影响同 source 和 target 的 EdgeGroup 中的连线，HT 预定义的连线类型中，后缀为 2 的类型都是 mutural 为 true 的复杂连线类型。  <br>在 Demo 中定义了两种类型的连线，分别为 line1 和 line ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ht.Default.setEdgeType('line1', function(edge){
            var sourcePoint1 = edge.getSourceAgent().getPosition(),
                targetPoint1 = edge.getTargetAgent().getPosition(),
                points1 = new ht.List();       
                points1.add(sourcePoint1);
                points1.add({
                    x: (sourcePoint1.x + targetPoint1.x)/2 + 200,
                    e: sourcePoint1.e,
                    y: (sourcePoint1.y + targetPoint1.y)/2
                });
                points1.add(targetPoint1);                          
            return {
                points: points1,
                segments: new ht.List([1, 3])
            };
        });
ht.Default.setEdgeType('line2', function(edge){
            var sourcePoint = edge.getSourceAgent().getPosition(),
                targetPoint = edge.getTargetAgent().getPosition(),
                points = new ht.List();       
                points.add(sourcePoint);
                points.add({
                    x: (sourcePoint.x + targetPoint.x)/2,
                    e: ((sourcePoint.e + targetPoint.e)/2 || 0) - 300,
                    y: (sourcePoint.y + targetPoint.y)/2
                });
                points.add({
                    x: targetPoint.x,
                    e: targetPoint.e -80, 
                    y: targetPoint.y                            
                });
            return {
                points: points,
                segments: new ht.List([1, 3])
            };
        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>ht.Default.setEdgeType('line1', function(edge){
            <span class="hljs-attribute">var sourcePoint1 = edge.getSourceAgent().getPosition(),
                targetPoint1 = edge.getTargetAgent().getPosition(),
                points1 = new ht.List();       
                points1.add(sourcePoint1);
                points1.add({
                    x</span>: (sourcePoint1<span class="hljs-variable">.x</span> + targetPoint1<span class="hljs-variable">.x</span>)/2 + 200,
                    e: sourcePoint1<span class="hljs-variable">.e</span>,
                    y: (sourcePoint1<span class="hljs-variable">.y</span> + targetPoint1<span class="hljs-variable">.y</span>)/2
                });
                <span class="hljs-attribute">points1.add(targetPoint1);                          
            return {
                points</span>: points1,
                segments: new ht<span class="hljs-variable">.List</span>([1, 3])
            };
        });
ht.Default.setEdgeType('line2', function(edge){
            <span class="hljs-attribute">var sourcePoint = edge.getSourceAgent().getPosition(),
                targetPoint = edge.getTargetAgent().getPosition(),
                points = new ht.List();       
                points.add(sourcePoint);
                points.add({
                    x</span>: (sourcePoint<span class="hljs-variable">.x</span> + targetPoint<span class="hljs-variable">.x</span>)/2,
                    e: ((sourcePoint<span class="hljs-variable">.e</span> + targetPoint<span class="hljs-variable">.e</span>)/2 || 0) - 300,
                    y: (sourcePoint<span class="hljs-variable">.y</span> + targetPoint<span class="hljs-variable">.y</span>)/2
                });
                <span class="hljs-attribute">points.add({
                    x</span>: targetPoint<span class="hljs-variable">.x</span>,
                    e: targetPoint<span class="hljs-variable">.e</span> -80, 
                    y: targetPoint<span class="hljs-variable">.y</span>                            
                });
            <span class="hljs-attribute">return {
                points</span>: points,
                segments: new ht<span class="hljs-variable">.List</span>([1, 3])
            };
        });</code></pre>
<p>连线类型定义好，接下来就是创建连线，但是连线上还有流动效果，这个又怎么实现呢？我们 HT 有扩展流动线插件，可以在 ht.Shape 和 ht.Edge 上增加流动效果，支持内部流动元素或用户自定义的流动元素沿着路径步进，要使用也非常方便，只需要引入 ht-flow.js 文件，详情可见 HT for Web流动线手册（<a href="http://www.hightopo.com/guide/guide/plugin/flow/ht-flow-guide.html" rel="nofollow noreferrer" target="_blank">http://www.hightopo.com/guide...</a>），但是插件并不适用于 3D 模型中，那在 3D 模型中该怎么办呢？即使不能使用现成的插件，我们也可以实现流动效果，可以看HT for Web 入门手册 中连线部分，我们可以将连线样式通过 edge.dash 设置为虚线后，动态改变 edge.dash.offset 虚线偏移，即可实现流动效果，所以，我们创建连线时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createEdge (source, target , type) {
        var edge = new ht.Edge(source, target);
        edge.s({
            'edge.color': 'yellow',
            'edge.dash': true,
            'edge.dash.3d': true,
            'edge.dash.width': 4,
            'edge.type': type,                    
            'edge.dash.color': 'rgb(10, 20, 36)',                    
            'edge.dash.pattern': [20, 25]
        });
        edge.a({
            'flow.enabled': true,
            'flow.direction': -1,
            'flow.step': 4
        });
        return edge;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>function createEdge (source, target , <span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
        <span class="hljs-keyword">var</span> edge = <span class="hljs-keyword">new</span> ht.<span class="hljs-type">Edge</span>(source, target);
        edge.s({
            <span class="hljs-symbol">'edge</span>.color': <span class="hljs-symbol">'yello</span>w',
            <span class="hljs-symbol">'edge</span>.dash': <span class="hljs-literal">true</span>,
            <span class="hljs-symbol">'edge</span>.dash<span class="hljs-number">.3</span>d': <span class="hljs-literal">true</span>,
            <span class="hljs-symbol">'edge</span>.dash.width': <span class="hljs-number">4</span>,
            <span class="hljs-symbol">'edge</span>.<span class="hljs-keyword">type</span>': <span class="hljs-class"><span class="hljs-keyword">type</span>,                    </span>
            <span class="hljs-symbol">'edge</span>.dash.color': <span class="hljs-symbol">'rgb</span>(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>)',                    
            <span class="hljs-symbol">'edge</span>.dash.pattern': [<span class="hljs-number">20</span>, <span class="hljs-number">25</span>]
        });
        edge.a({
            <span class="hljs-symbol">'flow</span>.enabled': <span class="hljs-literal">true</span>,
            <span class="hljs-symbol">'flow</span>.direction': <span class="hljs-number">-1</span>,
            <span class="hljs-symbol">'flow</span>.step': <span class="hljs-number">4</span>
        });
        <span class="hljs-keyword">return</span> edge;
    }</code></pre>
<p>最后，要让虚线流动起来，可以使用 HT 中的调度，详情可看HT for Web 调度手册（<a href="http://www.hightopo.com/guide/guide/core/schedule/ht-schedule-guide.html" rel="nofollow noreferrer" target="_blank">http://www.hightopo.com/guide...</a>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flowTask = {
            interval: 50,
            action: function(data){
                if(data.a('flow.enabled')){
                    var offset = data.s('edge.dash.offset') + data.a('flow.step') * data.a('flow.direction');
                    data.s('edge.dash.offset', offset);                        
                }
            }
        };
        dataModel.addScheduleTask(flowTask);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>flowTask = {
            interval: <span class="hljs-number">50</span>,
            action: function(<span class="hljs-keyword">data</span>){
                <span class="hljs-keyword">if</span>(<span class="hljs-keyword">data</span>.a(<span class="hljs-string">'flow.enabled'</span>)){
                    <span class="hljs-keyword">var</span> offset = <span class="hljs-keyword">data</span>.s(<span class="hljs-string">'edge.dash.offset'</span>) + <span class="hljs-keyword">data</span>.a(<span class="hljs-string">'flow.step'</span>) * <span class="hljs-keyword">data</span>.a(<span class="hljs-string">'flow.direction'</span>);
                    <span class="hljs-keyword">data</span>.s(<span class="hljs-string">'edge.dash.offset'</span>, offset);                        
                }
            }
        };
        dataModel.addScheduleTask(flowTask);</code></pre>
<p>到这里，Demo 中的主要技术点都已经介绍了一遍，可以看出我们 HT 的强大之处，当然我们官网上还有很多很有意思的效果，大家也可以看一看，也可以玩一玩我们的 HT 感受它的强大之处，再次附上 Demo 地址： <a href="http://www.hightopo.com/demo/blog_3dedge_20170630/index.html" rel="nofollow noreferrer" target="_blank">http://www.hightopo.com/demo/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 HTML5 WebGL 的 3D 网络拓扑图

## 原文链接
[https://segmentfault.com/a/1190000009996165](https://segmentfault.com/a/1190000009996165)

