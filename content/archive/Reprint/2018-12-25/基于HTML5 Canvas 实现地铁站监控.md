---
title: '基于HTML5 Canvas 实现地铁站监控' 
date: 2018-12-25 2:30:11
hidden: true
slug: 98tp1o3o2np
categories: [reprint]
---

{{< raw >}}

                    
<p>伴随国内经济的高速发展，人们对安全的要求越来越高。为了防止下列情况的发生，您需要考虑安装安防系统： 提供证据与线索：很多工厂银行发生偷盗或者事故相关机关可以根据录像信息侦破案件，这个是非常重要的一个线索。还有一些纠纷或事故，也可以通过录像很容易找出相关人员的责任。 人防成本高：现在很多地方想到安全就想到要雇佣保安，每个保安每个月 800，每天 3 班倒，一班人员一年就需要将近 4 万元，相比于电子安防设备成本并不便宜，而且使用电子安防设备几年内就不太需要更换。所以人防成本相对也很高。人防辅助：多数情况下，完全靠人来保证安全是一件很困难的事情，很多事情需要电子保安器材（如监视器、报警器）辅助才更完美。特殊场合必须使用：在一些恶劣条件下（高热、寒冷、封闭等），人很难用肉眼观察清楚，或者环境根本不适合人的停留，必须使用电子安防设备。隐蔽性：使用电子安防设备，一般人不会感觉时时被监控，具有隐蔽性。24 小时安全保证：要达到 24 小时不间断的安全需要，电子设备是必须考虑的。远程监控：随着计算机技术与网络技术的发展，远程监控观看异地图象已经成为可能，现在已经有很多公司的负责人已经可以 INTERNET 及时观看世界各地的任何分公司情况，有利于及时了解情况。图象保存：数字录像技术的发展，使得影象可以通过计算机数字存储设备得以保存，可以保存时间更长，图象更清晰。生产管理：管理人员可以及时、直观的了解生产第一线的情况，便于指挥与管理。</p>
<p>鉴于监控系统在国内的需求量较大，对于大范围的监控，如地铁站，更是需要监控系统来防止意外的发生，今天我们给大家介绍一下如何创建一个地铁站监控系统的前端部分。</p>
<p><a href="http://www.hightopo.com/demo/metro/demo2.html" rel="nofollow noreferrer" target="_blank">http://www.hightopo.com/demo/...</a> 进入页面右键“审查元素”可查看例子源代码。</p>
<p>本例的动态效果如下：<br><span class="img-wrap"><img data-src="/img/bVYNyG?w=957&amp;h=407" src="https://static.alili.tech/img/bVYNyG?w=957&amp;h=407" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们先来搭建基础场景，在 HT 中，非常常用的一种方法来将外部场景导入到内部就是靠解析 JSON 文件，用 JSON 文件来搭建场景的好处之一就是可以循环利用，我们今天的场景就是利用 JSON 画出来的。接下来 HT 将利用  ht.Default.xhrLoad 函数载入 JSON 场景，并用 HT 封装的 DataModel.deserialize(json) 来<a href="http://hightopo.com/guide/guide/core/serialization/ht-serialization-guide.html#ref_serialization" rel="nofollow noreferrer" target="_blank">反序列化</a>，并将反序列化的对象加入 DataModel：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ht.Default.xhrLoad('demo2.json', function(text) {
    var json = ht.Default.parse(text);
    if(json.title) document.title = json.title;//将 JSON 文件中的 titile 赋给全局变量 titile 
    dataModel.deserialize(json);//反序列化
    graphView.fitContent(true);//缩放平移拓扑以展示所有图元，即让所有的元素都显示出来
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>ht.<span class="hljs-keyword">Default</span>.xhrLoad(<span class="hljs-string">'demo2.json'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(text)</span> </span>{
    <span class="hljs-keyword">var</span> json = ht.<span class="hljs-keyword">Default</span>.parse(text);
    <span class="hljs-keyword">if</span>(json.title) document.title = json.title;<span class="hljs-comment">//将 JSON 文件中的 titile 赋给全局变量 titile </span>
    dataModel.deserialize(json);<span class="hljs-comment">//反序列化</span>
    graphView.fitContent(<span class="hljs-keyword">true</span>);<span class="hljs-comment">//缩放平移拓扑以展示所有图元，即让所有的元素都显示出来</span>
});</code></pre>
<p>在 HT 中，Data 类型对象构造时内部会自动被赋予一个 id 属性，可通过 data.getId() 和 data.setId(id) 获取和设置，Data 对象添加到 DataModel 之后不允许修改 id 值，可通过 dataModel.getDataById(id) 快速查找 Data 对象。一般建议 id 属性由 HT 自动分配，用户业务意义的唯一标示可存在 tag 属性上，通过 Data#setTag(tag) 函数允许任意动态改变 tag 值，通过DataModel#getDataByTag(tag) 可查找到对应的 Data 对象，并支持通过 DataModel#removeDataByTag(tag) 删除 Data 对象。我们这边通过在 JSON 中设置 Data 对象的 tag 属性，在代码中通过 dataModel.getDataByTag(tag) 函数来获取该 Data 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fan1 = dataModel.getDataByTag('fan1');
var fan2 = dataModel.getDataByTag('fan2');
var camera1 = dataModel.getDataByTag('camera1');
var camera2 = dataModel.getDataByTag('camera2');
var camera3 = dataModel.getDataByTag('camera3');
var redAlarm = dataModel.getDataByTag('redAlarm');
var yellowAlarm = dataModel.getDataByTag('yellowAlarm');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> fan1 = dataModel.getDataByTag(<span class="hljs-string">'fan1'</span>);
<span class="hljs-keyword">var</span> fan2 = dataModel.getDataByTag(<span class="hljs-string">'fan2'</span>);
<span class="hljs-keyword">var</span> camera1 = dataModel.getDataByTag(<span class="hljs-string">'camera1'</span>);
<span class="hljs-keyword">var</span> camera2 = dataModel.getDataByTag(<span class="hljs-string">'camera2'</span>);
<span class="hljs-keyword">var</span> camera3 = dataModel.getDataByTag(<span class="hljs-string">'camera3'</span>);
<span class="hljs-keyword">var</span> redAlarm = dataModel.getDataByTag(<span class="hljs-string">'redAlarm'</span>);
<span class="hljs-keyword">var</span> yellowAlarm = dataModel.getDataByTag(<span class="hljs-string">'yellowAlarm'</span>);</code></pre>
<p>我在下图中做了各标签对应的元素：<br><span class="img-wrap"><img data-src="/img/bVYNyQ?w=1092&amp;h=634" src="https://static.alili.tech/img/bVYNyQ?w=1092&amp;h=634" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接着我们对需要旋转、闪烁的对象进行设置，HT 中对“旋转”封装了 setRotation(rotation) 函数，通过获得对象当前的旋转角度，在这个角度的基础上再增加某个弧度，通过 setInterval 定时调用，这样就能在一定的时间间隔内旋转相同的弧度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setInterval(function(){
    var time = new Date().getTime();
    var deltaTime = time - lastTime;
    var deltaRotation = deltaTime * Math.PI / 180 * 0.1;
    lastTime = time;

    fan1.setRotation(fan1.getRotation() + deltaRotation*3);
    fan2.setRotation(fan2.getRotation() + deltaRotation*3);
    camera1.setRotation(camera1.getRotation() + deltaRotation/3);
    camera2.setRotation(camera2.getRotation() + deltaRotation/3);
    camera3.setRotation(camera3.getRotation() + deltaRotation/3);

    if (time - stairTime > 500) {
        stairIndex--;
        if (stairIndex < 0) {
            stairIndex = 8;
        }
        stairTime = time;
    }

    for (var i = 0; i < 8; i++) {//因为有一些相似的元素我们设置的 tag 名类似，只是在后面换成了1、2、3，所以我们通过 for 循环来获取
        var color = stairIndex === i ? '#F6A623' : '#CFCFCF';
        dataModel.getDataByTag('stair_1_' + i).s('shape.border.color', color);
        dataModel.getDataByTag('stair_2_' + i).s('shape.border.color', color);
    }

    if (new Date().getSeconds() % 2 === 1) {
        yellowAlarm.s('shape.background', null);
        redAlarm.s('shape.background', null);
    }
    else {
        yellowAlarm.s('shape.background', 'yellow');
        redAlarm.s('shape.background', 'red');
    }
}, 5);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>setInterval(<span class="hljs-name">function</span>(){
    var time = new Date().getTime()<span class="hljs-comment">;</span>
    var deltaTime = time - lastTime<span class="hljs-comment">;</span>
    var deltaRotation = deltaTime * Math.PI / 180 * <span class="hljs-number">0.1</span><span class="hljs-comment">;</span>
    lastTime = time<span class="hljs-comment">;</span>

    fan1.setRotation(<span class="hljs-name">fan1</span>.getRotation() + deltaRotation*3)<span class="hljs-comment">;</span>
    fan2.setRotation(<span class="hljs-name">fan2</span>.getRotation() + deltaRotation*3)<span class="hljs-comment">;</span>
    camera1.setRotation(<span class="hljs-name">camera1</span>.getRotation() + deltaRotation/3)<span class="hljs-comment">;</span>
    camera2.setRotation(<span class="hljs-name">camera2</span>.getRotation() + deltaRotation/3)<span class="hljs-comment">;</span>
    camera3.setRotation(<span class="hljs-name">camera3</span>.getRotation() + deltaRotation/3)<span class="hljs-comment">;</span>

    if (<span class="hljs-name">time</span> - stairTime &gt; <span class="hljs-number">500</span>) {
        stairIndex--<span class="hljs-comment">;</span>
        if (<span class="hljs-name">stairIndex</span> &lt; <span class="hljs-number">0</span>) {
            stairIndex = <span class="hljs-number">8</span><span class="hljs-comment">;</span>
        }
        stairTime = time<span class="hljs-comment">;</span>
    }

    for (<span class="hljs-name">var</span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; 8; i++) {//因为有一些相似的元素我们设置的 tag 名类似，只是在后面换成了1、2、3，所以我们通过 for 循环来获取</span>
        var color = stairIndex === i ? '#F6A623' : '#CFCFCF'<span class="hljs-comment">;</span>
        dataModel.getDataByTag('stair_1_' + i).s('shape.border.color', color)<span class="hljs-comment">;</span>
        dataModel.getDataByTag('stair_2_' + i).s('shape.border.color', color)<span class="hljs-comment">;</span>
    }

    if (<span class="hljs-name">new</span> Date().getSeconds() % <span class="hljs-number">2</span> === <span class="hljs-number">1</span>) {
        yellowAlarm.s('shape.background', null)<span class="hljs-comment">;</span>
        redAlarm.s('shape.background', null)<span class="hljs-comment">;</span>
    }
    else {
        yellowAlarm.s('shape.background', 'yellow')<span class="hljs-comment">;</span>
        redAlarm.s('shape.background', 'red')<span class="hljs-comment">;</span>
    }
}, <span class="hljs-number">5</span>)<span class="hljs-comment">;</span></code></pre>
<p>HT 还封装了 setStyle 函数用来设置样式，可简写为 s，具体样式请参考 HT for Web 样式手册：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 8; i++) {//因为有一些相似的元素我们设置的 tag 名类似，只是在后面换成了1、2、3，所以我们通过 for 循环来获取
    var color = stairIndex === i ? '#F6A623' : '#CFCFCF';
    dataModel.getDataByTag('stair_1_' + i).s('shape.border.color', color);
    dataModel.getDataByTag('stair_2_' + i).s('shape.border.color', color);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">8</span>; i++) {<span class="hljs-comment">//因为有一些相似的元素我们设置的 tag 名类似，只是在后面换成了1、2、3，所以我们通过 for 循环来获取</span>
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">color</span> = stairIndex === i ? <span class="hljs-string">'#F6A623'</span> : <span class="hljs-string">'#CFCFCF'</span>;
    dataModel.getDataByTag(<span class="hljs-string">'stair_1_'</span> + i).s(<span class="hljs-string">'shape.border.color'</span>, <span class="hljs-built_in">color</span>);
    dataModel.getDataByTag(<span class="hljs-string">'stair_2_'</span> + i).s(<span class="hljs-string">'shape.border.color'</span>, <span class="hljs-built_in">color</span>);
}</code></pre>
<p>我们还对“警告灯”的闪烁进行了定时控制，如果是偶数秒的时候，就将灯的背景颜色设置为“无色”，否则，如果是 yellowAlarm 则设置为“黄色”，如果是 redAlarm 则设置为“红色”：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (new Date().getSeconds() % 2 === 1) {
    yellowAlarm.s('shape.background', null);
    redAlarm.s('shape.background', null);
}
else {
    yellowAlarm.s('shape.background', 'yellow');
    redAlarm.s('shape.background', 'red');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>().getSeconds() % <span class="hljs-number">2</span> === <span class="hljs-number">1</span>) {
    yellowAlarm.s(<span class="hljs-string">'shape.background'</span>, <span class="hljs-literal">null</span>);
    redAlarm.s(<span class="hljs-string">'shape.background'</span>, <span class="hljs-literal">null</span>);
}
<span class="hljs-keyword">else</span> {
    yellowAlarm.s(<span class="hljs-string">'shape.background'</span>, <span class="hljs-string">'yellow'</span>);
    redAlarm.s(<span class="hljs-string">'shape.background'</span>, <span class="hljs-string">'red'</span>);
}</code></pre>
<p>整个例子就这么轻松地解决了，简直太轻松了。。。</p>
<p>有兴趣继续了解的小伙伴可以进入 <a href="http://hightopo.com/" rel="nofollow noreferrer" target="_blank">HT for Web 官网</a>查看各个手册进行学习。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于HTML5 Canvas 实现地铁站监控

## 原文链接
[https://segmentfault.com/a/1190000012072980](https://segmentfault.com/a/1190000012072980)

