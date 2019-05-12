---
title: '基于HTML5和WebGL的三维可视立体动态流程图' 
date: 2018-12-29 2:30:10
hidden: true
slug: z1s3jxecrpf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">惯例先扯点闲篇</h2>
<p>记得15年那会儿，我给人讲WebGL，还得从头科普，三令五申要用Chrome，末了再强调一句，记得启用WebGL功能。今天，但凡懂点儿Web开发的，都会来一句“网页3D用WebGL”。</p>
<p>怎么形容这种感受呢？</p>
<p><span class="img-wrap"><img data-src="/img/bVWrUS?w=255&amp;h=255" src="https://static.alili.tech/img/bVWrUS?w=255&amp;h=255" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这两年的技术发展，大家想必都看在眼里，单用“爆发”二字，实在难以描述其中的惊天巨变。而回到网页3D这个话题上，我想，最大的驱动力，莫过于16年至今虚拟现实的迅速崛起，彻底推进了三维可视化技术的突飞猛进，而物联网发力，又开启了一扇通往新世界的大门。</p>
<p>游戏界至今争论不休的Unity还是HTML5，依我看至少WebGL活的好好的，而插件技术么，则让我想起了一首悲伤的歌：dying in the sun…</p>
<h1 id="articleHeader1">三维可视化应用盘点</h1>
<p>今天当然还是给大家介绍一款最新的三维可视化成果，开始正题前，我想先盘点一下这两年还算靠谱的一些三维应用。</p>
<p><strong>工业</strong>上的，偏销售侧有复杂零件的三维展示，依托零件原有模型，做好参数转换，比较容易实现。偏管理侧，主要是厂房车间和生产设备的三维监控；<strong>电力行业</strong>，有无人值守变电站的巡检和监控，结合三维可以进行远程巡检作业，降低人工作业的风险；<strong>仓库和粮仓</strong>，引入三维后，可以结合库房系统、环境系统，进行全方位的管理；<strong>矿山和隧道</strong>，这个很好理解：作业越是危险、对环境要求越高的地方，越是需要虚拟仿真；<strong>3D家装设计</strong>, 通常是在线模式，拖拽设计，结合家具贩售，早先是以Stage3D为主，这两年也看到很多WebGL的案例；<strong>博物馆、图书馆、档案馆</strong>的导览结合解说，复杂设备的虚拟仿真<strong>培训</strong>，<strong>商品展示</strong>，这个比较多了，像虚拟试衣间，商品的三维在线浏览，比如刚看到这款霸气侧漏的零食：</p>
<p><span class="img-wrap"><img data-src="/img/bVWrWy?w=1270&amp;h=855" src="https://static.alili.tech/img/bVWrWy?w=1270&amp;h=855" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>开个玩笑。其实不管哪个行业，三维应用很大的一部分工作量源于建模，而这次我们想分享的是和上述应用完全不同的一个案例。</p>
<h1 id="articleHeader2">正文</h1>
<p>这次的案例，对模型几乎没有要求，只是用了最基本的形状元素，但是却可以解决企业在不断发展壮大，尤其是信息化进程不断深入的过程中，都会遇到的问题，那就是如何将<strong>复杂流程可视化</strong>。</p>
<h2 id="articleHeader3">什么是流程？</h2>
<p>流程，看起来很简答的两个字，英文process。我们这里所说的流程，主要是企业的<strong>业务流程</strong>，如生产流程、各类行政申请流程、财务审批流程、人事处理流程、质量控制及客服流程等等。</p>
<blockquote><p>业务流程对于企业的意义不仅仅在于对企业关键业务的一种描述；更在于对企业的业务运营有着指导意义，这种意义体现在对资源的优化、对企业组织机构的优化以及对管理制度的一系列改变。这种优化的目的实际也是企业所追求的目标：降低企业的运营成本，提高对市场需求的响应速度，争取企业利润的最大化。（from智库百科MBAlib）</p></blockquote>
<p>为啥我突然开始拽商业名词了呢？因为，这是甲方爸爸给出的一个难题。</p>
<p>甲方爸爸的企业，部门繁多，流程复杂，为了提升业务流程的效率，同时优化企业自身的管理，提出了一个将其现有业务流程进行三维可视化的需求。</p>
<p>为什么要把流程进行三维可视化呢？</p>
<p>通俗的说，因为平面的实在是看不清理不顺了；时髦点讲，只有<strong>“升维”</strong>，才能展示和包容更多的信息。</p>
<p>看到这里的三体同好们，请不要吝啬向我隔空挥舞小手！</p>
<p><span class="img-wrap"><img data-src="/img/bVWrZO?w=240&amp;h=240" src="https://static.alili.tech/img/bVWrZO?w=240&amp;h=240" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">举个栗子</h2>
<p>甲方爸爸的信息实在太多，而且不能透露，我们就找其中几个简单的举个例子，比如每个企业每天都在处理的报账流程：(应要求马赛克了一些文字）</p>
<p>报账流程业务图：<br><span class="img-wrap"><img data-src="/img/bVWW86?w=585&amp;h=586" src="https://static.alili.tech/img/bVWW86?w=585&amp;h=586" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>二层逻辑交互图：<br><span class="img-wrap"><img data-src="/img/bVWW9a?w=800&amp;h=608" src="https://static.alili.tech/img/bVWW9a?w=800&amp;h=608" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>报账业务基础架构：<br><span class="img-wrap"><img data-src="/img/bVWW9h?w=512&amp;h=712" src="https://static.alili.tech/img/bVWW9h?w=512&amp;h=712" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看到如此复杂的结构，无论你是以下哪种表情，都不要惊慌：<br><span class="img-wrap"><img data-src="/img/bVWr5i?w=166&amp;h=134" src="https://static.alili.tech/img/bVWr5i?w=166&amp;h=134" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVWr4D?w=154&amp;h=134" src="https://static.alili.tech/img/bVWr4D?w=154&amp;h=134" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVWr5m?w=136&amp;h=134" src="https://static.alili.tech/img/bVWr5m?w=136&amp;h=134" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">流程结构梳理</h2>
<p>我们先简单梳理下流程图的大致框架，一共可以分为五层：</p>
<ul>
<li>业务流程层：起点、审批、服务；</li>
<li>应用逻辑层：WEB服务、数据库服务、定时作业服务、接口服务、应用服务；</li>
<li>实例：WEB服务实例、财辅数据库实例、支付服务实例；</li>
<li>OS：EB服务OS、财辅数据库OS；</li>
<li>硬件：主机、交换机。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVWr7F?w=255&amp;h=255" src="https://static.alili.tech/img/bVWr7F?w=255&amp;h=255" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">初稿</h2>
<p>为了让这五层之间的关系一目了然，分层展示是必不可少的。每个层次里，又分为几个模块，层次与层次、模块与模块之间都有业务上的联系。根据梳理的逻辑关系，我先整了一个初稿。流程和业务先用简单的方块和圆柱代替，底层的机柜模型，直接用存货模型，机房相关的模型，我们大大的有。<br><span class="img-wrap"><img data-src="/img/bVU4KI?w=1347&amp;h=614" src="https://static.alili.tech/img/bVU4KI?w=1347&amp;h=614" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>虽然看起来层次感有了，不过这只是个整体的框架demo，我们在这基础上一步步修改。</p>
<h2 id="articleHeader7">圆弧效果</h2>
<p>说下层模型的圆弧效果。为了把每个层做成圆弧的效果，我把层模型拆解成了由9个简单模型组合而成，上图给你们看（原谅我图画得渣渣）。<br><span class="img-wrap"><img data-src="/img/bVU7cW?w=1043&amp;h=437" src="https://static.alili.tech/img/bVU7cW?w=1043&amp;h=437" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>模型1、2、3、4、5均为厚度相同的立方体，模型6、7、8、9为大小相等的1/4圆柱体，9个模型组合成层模型。</p>
<p>模型1的代码：（模型1,2,3,4,5差不多，就只贴模型1的代码了。）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var centerNode = new mono.Cube({
    width: width,
    height: height,
    depth: depth,
});
centerNode.s({
    'm.type': 'phong',
    'm.color': color
});
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> centerNode = <span class="hljs-built_in">new</span> <span class="hljs-built_in">mono</span>.Cube({
    <span class="hljs-built_in">width</span>: <span class="hljs-built_in">width</span>,
    <span class="hljs-built_in">height</span>: <span class="hljs-built_in">height</span>,
    depth: depth,
});
centerNode.s({
    'm.type': 'phong',
    'm.<span class="hljs-built_in">color</span>': <span class="hljs-built_in">color</span>
});
    </code></pre>
<p>模型6的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var leftTopCylinder = new mono.Cylinder({
    radiusTop: radius,
    radiusBottom: radius,
    height: height,
    arcLength: Math.PI / 2, //圆柱的圆弧所占长度
    arcStart: Math.PI //圆弧开始的角度
});
    
leftTopCylinder.s({
    'm.type': 'phong',
    'm.color': color
});
leftTopCylinder.p(-width / 2, 0, -depth / 2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var leftTopCylinder = <span class="hljs-keyword">new</span> mono.Cylinder({
    radiusTop: radius,
    radiusBottom: radius,
    <span class="hljs-built_in">height</span>: <span class="hljs-built_in">height</span>,
    arcLength: Math.<span class="hljs-literal">PI</span> / <span class="hljs-number">2</span>, <span class="hljs-comment">//圆柱的圆弧所占长度</span>
    arcStart: Math.<span class="hljs-literal">PI</span> <span class="hljs-comment">//圆弧开始的角度</span>
});
    
leftTopCylinder.s({
    <span class="hljs-string">'m.type'</span>: <span class="hljs-string">'phong'</span>,
    <span class="hljs-string">'m.color'</span>: <span class="hljs-built_in">color</span>
});
leftTopCylinder.p(-<span class="hljs-built_in">width</span> / <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, -depth / <span class="hljs-number">2</span>);</code></pre>
<p>9个模型合并：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var combo = new mono.ComboNode([centerNode, leftNode, rightNode, topNode, bottomNode, leftTopCylinder, rightTopCylinder, leftBottomCylinder, rightBottomCylinder],['+'],true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> combo = <span class="hljs-keyword">new</span> <span class="hljs-type">mono</span>.ComboNode([centerNode, leftNode, rightNode, topNode, bottomNode, leftTopCylinder, rightTopCylinder, leftBottomCylinder, rightBottomCylinder],[<span class="hljs-string">'+'</span>],<span class="hljs-literal">true</span>);</code></pre>
<h2 id="articleHeader8">背景和配色</h2>
<p>首先，增加了背景图片，选取的是一张星空的图片，之后根据背景修改了配色和部分模型。<br><span class="img-wrap"><img data-src="/img/bVWXa0?w=800&amp;h=405" src="https://static.alili.tech/img/bVWXa0?w=800&amp;h=405" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>效果还是不错的，看起来更加大气。增加背景代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="network.setClearColor(0, 0, 0);
network.setClearAlpha(0);
network.setBackgroundImage('./images/background.jpg');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">network</span><span class="hljs-selector-class">.setClearColor</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
<span class="hljs-selector-tag">network</span><span class="hljs-selector-class">.setClearAlpha</span>(<span class="hljs-number">0</span>);
<span class="hljs-selector-tag">network</span><span class="hljs-selector-class">.setBackgroundImage</span>(<span class="hljs-string">'./images/background.jpg'</span>);</code></pre>
<h2 id="articleHeader9">文字</h2>
<p>图中显示文字类似对话框的东西其实是billboard，先创建一个billboard，再用canvas画一张图作为贴图贴到上面就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var billboard = new mono.Billboard();
var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = &quot;130px 微软雅黑&quot;;

    var array = [];
    if (text.indexOf(&quot;\n&quot;)) {
        array = text.split(&quot;\n&quot;);
    } else {
        array = [text]
    }
    var length = 0;
    for (var i = 0; i < array.length; i++) {
        if (i == 0) {
            length = context.measureText(array[i]).width;
        } else {
            length = Math.max(context.measureText(array[i]).width, length);
        }
    }

    var size = mono.Utils.getMaxTextSize(array, context.font);
    var width = mono.Utils.nextPowerOfTwo(length);
    var oHeight = size.height;
    var arrowHeight = 40;
    var arrowWidth = 80;
    var height = mono.Utils.nextPowerOfTwo(oHeight + arrowHeight);

    canvas.height = height;
    canvas.width = width;
    var lineHeight =(height - arrowHeight - 40) / array.length;
    var oLineHeight = oHeight / array.length;
    var radius = width / 16;

    var context = canvas.getContext('2d');
    context.globalAlpha = 0.9;
    context.fillStyle = bgColor;
    context.save();
    context.beginPath();
    context.moveTo(radius + 10, 10);
    context.lineTo(width - radius - 10, 10);
    context.arcTo(width - 10, 10, width - 10, radius + 10, radius);
    context.lineTo(width - 10, height - arrowHeight - radius - 10);
    context.arcTo(width - 10, height - arrowHeight - 10, width - radius -10, height - arrowHeight - 10, radius);
    context.lineTo(width / 2 + arrowWidth / 2 - 10, height - arrowHeight - 10);
    context.lineTo(width / 2 - 10, height - 10);
    context.lineTo(width / 2 - arrowWidth / 2 - 10, height - arrowHeight - 10);
    context.lineTo(radius + 10, height - arrowHeight - 10);
    context.arcTo(10, height - arrowHeight - 10, 10, height - arrowHeight - radius - 10, radius);
    context.lineTo(10, radius + 10);
    context.arcTo(10, 10, radius + 10, 10, radius);
    context.closePath();
    context.fill();
    context.globalAlpha = 1;
    context.lineWidth = 10;
    context.strokeStyle = bgColor;
    context.stroke();
    context.restore();

    context.fillStyle = fontColor;
    context.textBaseline = 'middle';
    context.font = &quot;120px 微软雅黑&quot;;
    for (var i = 0; i < array.length; i++) {
        var text = array[i];
        length = context.measureText(text).width;
        context.fillText(text, (width - length) / 2, lineHeight * (i + 0.5));
    }
    billboard.s({
        'm.texture.image': canvas,
        'm.texture.offset': new mono.Vec2(0, 0.005),
        'm.texture.anisotropy': 8,
        'm.alignment': mono.BillboardAlignment.bottomCenter
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> billboard = <span class="hljs-built_in">new</span> <span class="hljs-built_in">mono</span>.Billboard();
<span class="hljs-built_in">var</span> canvas = document.createElement('canvas');
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">context</span> = canvas.getContext('2d');
    <span class="hljs-built_in">context</span>.<span class="hljs-built_in">font</span> = <span class="hljs-string">"130px 微软雅黑"</span>;

    <span class="hljs-built_in">var</span> <span class="hljs-built_in">array</span> = [];
    <span class="hljs-keyword">if</span> (text.indexOf(<span class="hljs-string">"\n"</span>)) {
        <span class="hljs-built_in">array</span> = text.<span class="hljs-built_in">split</span>(<span class="hljs-string">"\n"</span>);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">array</span> = [text]
    }
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">length</span> = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>; i++) {
        <span class="hljs-keyword">if</span> (i == <span class="hljs-number">0</span>) {
            <span class="hljs-built_in">length</span> = <span class="hljs-built_in">context</span>.measureText(<span class="hljs-built_in">array</span>[i]).<span class="hljs-built_in">width</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">length</span> = Math.<span class="hljs-built_in">max</span>(<span class="hljs-built_in">context</span>.measureText(<span class="hljs-built_in">array</span>[i]).<span class="hljs-built_in">width</span>, <span class="hljs-built_in">length</span>);
        }
    }

    <span class="hljs-built_in">var</span> size = <span class="hljs-built_in">mono</span>.Utils.getMaxTextSize(<span class="hljs-built_in">array</span>, <span class="hljs-built_in">context</span>.<span class="hljs-built_in">font</span>);
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">width</span> = <span class="hljs-built_in">mono</span>.Utils.nextPowerOfTwo(<span class="hljs-built_in">length</span>);
    <span class="hljs-built_in">var</span> oHeight = size.<span class="hljs-built_in">height</span>;
    <span class="hljs-built_in">var</span> arrowHeight = <span class="hljs-number">40</span>;
    <span class="hljs-built_in">var</span> arrowWidth = <span class="hljs-number">80</span>;
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">height</span> = <span class="hljs-built_in">mono</span>.Utils.nextPowerOfTwo(oHeight + arrowHeight);

    canvas.<span class="hljs-built_in">height</span> = <span class="hljs-built_in">height</span>;
    canvas.<span class="hljs-built_in">width</span> = <span class="hljs-built_in">width</span>;
    <span class="hljs-built_in">var</span> lineHeight =(<span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-number">40</span>) / <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>;
    <span class="hljs-built_in">var</span> oLineHeight = oHeight / <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>;
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">radius</span> = <span class="hljs-built_in">width</span> / <span class="hljs-number">16</span>;

    <span class="hljs-built_in">var</span> <span class="hljs-built_in">context</span> = canvas.getContext('2d');
    <span class="hljs-built_in">context</span>.globalAlpha = <span class="hljs-number">0.9</span>;
    <span class="hljs-built_in">context</span>.fillStyle = bgColor;
    <span class="hljs-built_in">context</span>.<span class="hljs-built_in">save</span>();
    <span class="hljs-built_in">context</span>.beginPath();
    <span class="hljs-built_in">context</span>.moveTo(<span class="hljs-built_in">radius</span> + <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    <span class="hljs-built_in">context</span>.lineTo(<span class="hljs-built_in">width</span> - <span class="hljs-built_in">radius</span> - <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    <span class="hljs-built_in">context</span>.arcTo(<span class="hljs-built_in">width</span> - <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-built_in">width</span> - <span class="hljs-number">10</span>, <span class="hljs-built_in">radius</span> + <span class="hljs-number">10</span>, <span class="hljs-built_in">radius</span>);
    <span class="hljs-built_in">context</span>.lineTo(<span class="hljs-built_in">width</span> - <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-built_in">radius</span> - <span class="hljs-number">10</span>);
    <span class="hljs-built_in">context</span>.arcTo(<span class="hljs-built_in">width</span> - <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-number">10</span>, <span class="hljs-built_in">width</span> - <span class="hljs-built_in">radius</span> -<span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-number">10</span>, <span class="hljs-built_in">radius</span>);
    <span class="hljs-built_in">context</span>.lineTo(<span class="hljs-built_in">width</span> / <span class="hljs-number">2</span> + arrowWidth / <span class="hljs-number">2</span> - <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-number">10</span>);
    <span class="hljs-built_in">context</span>.lineTo(<span class="hljs-built_in">width</span> / <span class="hljs-number">2</span> - <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - <span class="hljs-number">10</span>);
    <span class="hljs-built_in">context</span>.lineTo(<span class="hljs-built_in">width</span> / <span class="hljs-number">2</span> - arrowWidth / <span class="hljs-number">2</span> - <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-number">10</span>);
    <span class="hljs-built_in">context</span>.lineTo(<span class="hljs-built_in">radius</span> + <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-number">10</span>);
    <span class="hljs-built_in">context</span>.arcTo(<span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-built_in">height</span> - arrowHeight - <span class="hljs-built_in">radius</span> - <span class="hljs-number">10</span>, <span class="hljs-built_in">radius</span>);
    <span class="hljs-built_in">context</span>.lineTo(<span class="hljs-number">10</span>, <span class="hljs-built_in">radius</span> + <span class="hljs-number">10</span>);
    <span class="hljs-built_in">context</span>.arcTo(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-built_in">radius</span> + <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-built_in">radius</span>);
    <span class="hljs-built_in">context</span>.closePath();
    <span class="hljs-built_in">context</span>.fill();
    <span class="hljs-built_in">context</span>.globalAlpha = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">context</span>.lineWidth = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">context</span>.strokeStyle = bgColor;
    <span class="hljs-built_in">context</span>.stroke();
    <span class="hljs-built_in">context</span>.restore();

    <span class="hljs-built_in">context</span>.fillStyle = fontColor;
    <span class="hljs-built_in">context</span>.textBaseline = 'middle';
    <span class="hljs-built_in">context</span>.<span class="hljs-built_in">font</span> = <span class="hljs-string">"120px 微软雅黑"</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>; i++) {
        <span class="hljs-built_in">var</span> text = <span class="hljs-built_in">array</span>[i];
        <span class="hljs-built_in">length</span> = <span class="hljs-built_in">context</span>.measureText(text).<span class="hljs-built_in">width</span>;
        <span class="hljs-built_in">context</span>.fillText(text, (<span class="hljs-built_in">width</span> - <span class="hljs-built_in">length</span>) / <span class="hljs-number">2</span>, lineHeight * (i + <span class="hljs-number">0.5</span>));
    }
    billboard.s({
        'm.texture.<span class="hljs-built_in">image</span>': canvas,
        'm.texture.offset': <span class="hljs-built_in">new</span> <span class="hljs-built_in">mono</span>.Vec2(<span class="hljs-number">0</span>, <span class="hljs-number">0.005</span>),
        'm.texture.anisotropy': <span class="hljs-number">8</span>,
        'm.alignment': <span class="hljs-built_in">mono</span>.BillboardAlignment.bottomCenter
    });</code></pre>
<h2 id="articleHeader10">obj模型</h2>
<p><span class="img-wrap"><img data-src="/img/bVU7pG?w=604&amp;h=191" src="https://static.alili.tech/img/bVU7pG?w=604&amp;h=191" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这两种属于obj模型，是设计小姐姐做的，然后我们通过make.Default.register函数定义模型，通过make.Default.load函数加载使用模型。</p>
<p>为了使效果更逼真，我们给模型做了环境贴图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" object3d.setStyle('m.envmap.image', make.Default.getEnvMap('envmap5'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;"> object3d.setStyle(<span class="hljs-string">'m.envmap.image'</span>, make.<span class="hljs-keyword">Default</span>.getEnvMap(<span class="hljs-string">'envmap5'</span>))<span class="hljs-comment">;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVU7o4?w=510&amp;h=260" src="https://static.alili.tech/img/bVU7o4?w=510&amp;h=260" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">动画</h2>
<p>单纯的静态图看起来有些单调，所以我们给连线加了动画效果：找一张一半透明一半有颜色的图片，作为贴图贴在连线上，利用动画函数使贴图不断平移，就实现了下面的效果。<br><span class="img-wrap"><img data-src="/img/bVU5xn?w=308&amp;h=219" src="https://static.alili.tech/img/bVU5xn?w=308&amp;h=219" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader12">实体模型</h2>
<p>最底层的模型采用了实体模型，真实感更强：<br><span class="img-wrap"><img data-src="/img/bVU7sJ?w=400&amp;h=287" src="https://static.alili.tech/img/bVU7sJ?w=400&amp;h=287" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">嵌套关系</h2>
<p>上面也提到过，层与层、层内各个模块中之间存在错综复杂的多层嵌套关系，为了展现这种关系，那肯定就要连线，话不多说，直接上图。<br><span class="img-wrap"><img data-src="/img/bVWXbe?w=800&amp;h=589" src="https://static.alili.tech/img/bVWXbe?w=800&amp;h=589" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>线的类型有两种，层与层之间的连线类型是link，每层模块之间的连线类型是pathLink，创建pathLInk代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createPathLink: function (data) {
    var box = main.sceneManager.getDataBox();
    var fromNode = main.sceneManager.getNodeByDataOrId(data.fromId);
    var toNode = main.sceneManager.getNodeByDataOrId(data.toId);
    var radius = data.path.radius || 3;
    var color = data.path.color || 'yellow';
    var endCap = data.path.endCap;
    var startCap = data.path.startCap;
    var linkType = data.routeType;
    var flow = data.path.flow || '';
    var workflowId = data.workflowId || ''; 
    if (fromNode &amp;&amp; toNode) {
        var link = new mono.PathLink(fromNode, toNode, data.id);
        var plength = link.getPath().getLength();
        link.setRadius(radius);
        link.s({
            'm.type': 'phong',
            'm.color': color,
            'm.ambient': color
        });
        link.workflowId = workflowId;
        if (endCap) {
            var endCapSize = data.path.endCapSize || 10;
            var endCapR = data.path.endCapR || 2;
            link.setEndCap(endCap);
            link.setEndCapSize(endCapSize);
            link.setEndCapR(endCapR);
        }
        if (startCap) {
            var startCapSize = data.path.startCapSize || 10;
            var startCapR = data.path.startCapR || 2;
            link.setStartCap(startCap);
            link.setStartCapSize(startCapSize);
            link.setStartCapR(startCapR);
        }
        if (linkType) {
            link.setLinkType(linkType);
        }
        box.add(link);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>createPathLink: function (<span class="hljs-built_in">data</span>) {
    <span class="hljs-built_in">var</span> box = main.sceneManager.getDataBox();
    <span class="hljs-built_in">var</span> fromNode = main.sceneManager.getNodeByDataOrId(<span class="hljs-built_in">data</span>.fromId);
    <span class="hljs-built_in">var</span> toNode = main.sceneManager.getNodeByDataOrId(<span class="hljs-built_in">data</span>.toId);
    <span class="hljs-built_in">var</span> radius = <span class="hljs-built_in">data</span>.path.radius || <span class="hljs-number">3</span>;
    <span class="hljs-built_in">var</span> color = <span class="hljs-built_in">data</span>.path.color || <span class="hljs-string">'yellow'</span>;
    <span class="hljs-built_in">var</span> endCap = <span class="hljs-built_in">data</span>.path.endCap;
    <span class="hljs-built_in">var</span> startCap = <span class="hljs-built_in">data</span>.path.startCap;
    <span class="hljs-built_in">var</span> linkType = <span class="hljs-built_in">data</span>.routeType;
    <span class="hljs-built_in">var</span> flow = <span class="hljs-built_in">data</span>.path.flow || <span class="hljs-string">''</span>;
    <span class="hljs-built_in">var</span> workflowId = <span class="hljs-built_in">data</span>.workflowId || <span class="hljs-string">''</span>; 
    <span class="hljs-keyword">if</span> (fromNode &amp;&amp; toNode) {
        <span class="hljs-built_in">var</span> <span class="hljs-keyword">link</span> = <span class="hljs-literal">new</span> mono.PathLink(fromNode, toNode, <span class="hljs-built_in">data</span>.id);
        <span class="hljs-built_in">var</span> plength = <span class="hljs-keyword">link</span>.getPath().getLength();
        <span class="hljs-keyword">link</span>.setRadius(radius);
        <span class="hljs-keyword">link</span>.s({
            <span class="hljs-string">'m.type'</span>: <span class="hljs-string">'phong'</span>,
            <span class="hljs-string">'m.color'</span>: color,
            <span class="hljs-string">'m.ambient'</span>: color
        });
        <span class="hljs-keyword">link</span>.workflowId = workflowId;
        <span class="hljs-keyword">if</span> (endCap) {
            <span class="hljs-built_in">var</span> endCapSize = <span class="hljs-built_in">data</span>.path.endCapSize || <span class="hljs-number">10</span>;
            <span class="hljs-built_in">var</span> endCapR = <span class="hljs-built_in">data</span>.path.endCapR || <span class="hljs-number">2</span>;
            <span class="hljs-keyword">link</span>.setEndCap(endCap);
            <span class="hljs-keyword">link</span>.setEndCapSize(endCapSize);
            <span class="hljs-keyword">link</span>.setEndCapR(endCapR);
        }
        <span class="hljs-keyword">if</span> (startCap) {
            <span class="hljs-built_in">var</span> startCapSize = <span class="hljs-built_in">data</span>.path.startCapSize || <span class="hljs-number">10</span>;
            <span class="hljs-built_in">var</span> startCapR = <span class="hljs-built_in">data</span>.path.startCapR || <span class="hljs-number">2</span>;
            <span class="hljs-keyword">link</span>.setStartCap(startCap);
            <span class="hljs-keyword">link</span>.setStartCapSize(startCapSize);
            <span class="hljs-keyword">link</span>.setStartCapR(startCapR);
        }
        <span class="hljs-keyword">if</span> (linkType) {
            <span class="hljs-keyword">link</span>.setLinkType(linkType);
        }
        box.add(<span class="hljs-keyword">link</span>);
    }
}</code></pre>
<p>link类型连线与pathLink类型连线大体相同，之所以层与层之间选择link类型，有两个原因：一是当镜头拉近时，link类型的连线粗细不会改变，二是便于控制拐点，就是下图中的红圈处。</p>
<p><span class="img-wrap"><img data-src="/img/bVU7iI?w=148&amp;h=124" src="https://static.alili.tech/img/bVU7iI?w=148&amp;h=124" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="link.setLinkType('control');//control属性控制连线的拐点
link.setControls(controls);//controls为数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">link</span>.setLinkType(<span class="hljs-string">'control'</span>);<span class="hljs-comment">//control属性控制连线的拐点</span>
<span class="hljs-keyword">link</span>.setControls(controls);<span class="hljs-comment">//controls为数组</span></code></pre>
<p>这样就可以呈现图中的伞状效果啦。</p>
<p>为了增加点朦胧感以及让伞状效果更好，我们特意添加了一点光环，有没有感觉金光从天而降呢？此时请想象自己45°角仰望天空，金光照在脸上。<br><span class="img-wrap"><img data-src="/img/bVU58r?w=1796&amp;h=893" src="https://static.alili.tech/img/bVU58r?w=1796&amp;h=893" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">流程动画</h2>
<p>基础打好，下面就可以加上动画，执行流程了。先上图：</p>
<p><span class="img-wrap"><img data-src="/img/bVU5EO?w=1393&amp;h=563" src="https://static.alili.tech/img/bVU5EO?w=1393&amp;h=563" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>点击左边的按钮，出现图中的白色小球，沿着连线运动，完整展现整个流程步骤。当然，镜头会随着小球切换，这样小球时刻在视线正中，妈妈再也不用担心我的视线被挡住。</p>
<p>镜头切换的代码也很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pos = link.getPointAt(v);
workflowSphere.p(pos);
billboard.p(pos.clone().add(new mono.Vec3(0, 250, 0)));
var camera = main.sceneManager.network3d.getCamera();
camera.lookAt(pos);
camera.p(pos.clone().sub(this._cameraOffset));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> pos = link.getPointAt(v);
workflowSphere.p(pos);
billboard.p(pos.clone().add(<span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">mono</span>.<span class="hljs-title">Vec3</span>(<span class="hljs-number">0</span>, <span class="hljs-number">250</span>, <span class="hljs-number">0</span>)));
<span class="hljs-title">var</span> <span class="hljs-title">camera</span> = <span class="hljs-title">main</span>.<span class="hljs-title">sceneManager</span>.<span class="hljs-title">network3d</span>.<span class="hljs-title">getCamera</span>();
<span class="hljs-title">camera</span>.<span class="hljs-title">lookAt</span>(pos);
<span class="hljs-title">camera</span>.<span class="hljs-title">p</span>(pos.clone().<span class="hljs-title">sub</span>(this._cameraOffset));</span></code></pre>
<h2 id="articleHeader15">数据</h2>
<p>最后聊聊数据。为了方（tou）便(lan)，我们将流程图的所有数据都存放在后台。在后端页面，可以设置流程图的结构、逻辑、流程节点的样式等。</p>
<p><span class="img-wrap"><img data-src="/img/bVU7ma?w=1857&amp;h=556" src="https://static.alili.tech/img/bVU7ma?w=1857&amp;h=556" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>利用Ajax获取模型数据，然后三行代码便可建造一个3D流程图系统。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dataManager.addCategoryFromJson(loadData.categories);
dataManager.addDataTypeFromJson(loadData.datatypes);
dataManager.addDataFromJson(loadData.datas);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">dataManager</span><span class="hljs-selector-class">.addCategoryFromJson</span>(<span class="hljs-selector-tag">loadData</span><span class="hljs-selector-class">.categories</span>);
<span class="hljs-selector-tag">dataManager</span><span class="hljs-selector-class">.addDataTypeFromJson</span>(<span class="hljs-selector-tag">loadData</span><span class="hljs-selector-class">.datatypes</span>);
<span class="hljs-selector-tag">dataManager</span><span class="hljs-selector-class">.addDataFromJson</span>(<span class="hljs-selector-tag">loadData</span><span class="hljs-selector-class">.datas</span>);</code></pre>
<p>同样，可以在后端页面设置连线的样式、颜色、起点、终点等等，获取到连线数据后，利用上文提到的方法便可绘制出所需要的连线。连动画的起点、走向同样可以在后端页面设置。</p>
<p>如果甲方爸爸觉得某个流程有问题，需要修改时，不要怕，默默打开后端页面改几个节点就好了。速度这么快，快夸我快夸我。</p>
<p>总而言之，只需要通过数据配置即可生成不同的三维流程，满足客户的各种需求。</p>
<p>对demo感兴趣的同学，可以给我发邮件：tw-service@servasoft.com，甲方爸爸的数据不能给你，demo还是可以给你们看一眼的。</p>
<p><span class="img-wrap"><img data-src="/img/bVWsNV?w=213&amp;h=207" src="https://static.alili.tech/img/bVWsNV?w=213&amp;h=207" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于HTML5和WebGL的三维可视立体动态流程图

## 原文链接
[https://segmentfault.com/a/1190000011511528](https://segmentfault.com/a/1190000011511528)

