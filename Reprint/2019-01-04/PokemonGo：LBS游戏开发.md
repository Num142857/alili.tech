---
title: 'PokemonGo：LBS游戏开发' 
date: 2019-01-04 2:30:10
hidden: true
slug: 46rkn7ff46
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<blockquote><p>去吧！皮卡丘！<br>小时候拥有一台任天堂是多少熊孩子的梦想，每个夜晚被窝里透出的微弱光线，把小小的童年带入另一个世界，家门口的鸟和狗，森林里的虫和瀑布，山洞里的超音蝠，带着小小的梦，走过一个个城市，一路冒险，飞天潜水，攀瀑碎岩，所向披靡。<br>每个醒来的清晨，都恍如出门冒险的那天~</p></blockquote>
<h2 id="articleHeader1">要做什么</h2>
<p>基于开放地图二次开发，完成简易像素版PokemonGo</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010687878" src="https://static.alili.tech/img/remote/1460000010687878" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">准备工作</h2>
<h3 id="articleHeader3">一、确定功能需求</h3>
<h4>第一阶段</h4>
<p>1、用户体系<br>2、背包<br>3、图鉴<br>4、人物定位<br>5、精灵分布<br>6、精灵捕捉<br>7、排行榜<br>8、移动随机事件<br>9、新手引导</p>
<h4>第二阶段</h4>
<p>1、地图增加道馆挑战<br>2、日常任务系统</p>
<h4>第三阶段</h4>
<p>1、精灵交易<br>2、玩家对战<br>3、AR捕捉场景</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*目前只完成第一阶段的功能   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">*目前只完成第一阶段的功能   </span>
</code></pre>
<h3 id="articleHeader4">二、开放地图选择</h3>
<table>
<thead><tr>
<th>功能 / 厂商</th>
<th>百度地图</th>
<th>腾讯地图</th>
<th>高德地图</th>
</tr></thead>
<tbody>
<tr>
<td>自定义皮肤</td>
<td>支持</td>
<td>不支持</td>
<td>支持</td>
</tr>
<tr>
<td>实时定位</td>
<td>不支持</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>开发文档</td>
<td>差</td>
<td>一般</td>
<td>友好</td>
</tr>
</tbody>
</table>
<p>对比三个地图厂商，我们选择高德地图进行二次开发</p>
<h3 id="articleHeader5">三、申请高德地图SDK</h3>
<p>登录<a href="http://lbs.amap.com/" rel="nofollow noreferrer" target="_blank">http://lbs.amap.com/</a><br>控制台-应用管理-创建新应用-添加新KEY</p>
<h3 id="articleHeader6">四、接入微信授权</h3>
<p>具体参考微信公众平台开发者文档<br><a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421140842" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/wiki...</a></p>
<h3 id="articleHeader7">五、服务端接口</h3>
<p>我们需要一些接口来保存用户数据，所以需要找一个服务端的同学配合完成几个简单的接口<br>1、api/login 判断登录状态，获取用户基本信息<br>2、api/getGlassPokemon 获取草地精灵<br>3、api/getMyPokemon 获取背包精灵<br>4、api/catchPokemon 捕捉精灵<br>5、api/getRank 获取排行榜信息</p>
<h3 id="articleHeader8">六、素材准备</h3>
<p>1、简单设计主界面UI，确定功能布局、地图的配色方案：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671761" src="https://static.alili.tech/img/remote/1460000010671761" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2、准备150只精灵的素材图片（大小各一套）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671762" src="https://static.alili.tech/img/remote/1460000010671762" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671763" src="https://static.alili.tech/img/remote/1460000010671763" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">现在开始</h2>
<h3 id="articleHeader10">一、接入高德地图</h3>
<p>在<code>&lt;head&gt;&lt;/head&gt;</code>中引入高德地图js-sdk</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
    <script src=&quot;http://webapi.amap.com/maps?v=1.3&amp;key=464e2c3addc64c5894994afe0bbdca21&quot;>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://webapi.amap.com/maps?v=1.3&amp;key=464e2c3addc64c5894994afe0bbdca21"</span>&gt;</span><span class="handlebars"><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span></span></code></pre>
<blockquote><p>key的值为高德地图开发者中心创建应用后获得的key</p></blockquote>
<p>在html中创建地图容器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;gomap&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"gomap"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>在js中初始化地图</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gomap;
gomap = new AMap.Map('gomap', {
    zoomEnable : false,              //不允许缩放
    zoom:18,                         //默认缩放等级18
    center: [118.18088, 24.4896],    //初始定位坐标
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> gomap;
gomap = <span class="hljs-keyword">new</span> AMap.<span class="hljs-built_in">Map</span>(<span class="hljs-string">'gomap'</span>, {
    zoomEnable : <span class="hljs-keyword">false</span>,              <span class="hljs-comment">//不允许缩放</span>
    zoom:<span class="hljs-number">18</span>,                         <span class="hljs-comment">//默认缩放等级18</span>
    center: [<span class="hljs-number">118.18088</span>, <span class="hljs-number">24.4896</span>],    <span class="hljs-comment">//初始定位坐标</span>
});</code></pre>
<p><a href="https://www.guowc.cc/go/demo1.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671764" src="https://static.alili.tech/img/remote/1460000010671764" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">二、地图美化</h3>
<p>默认的地图样式不能满足我们的需求，高德地图提供了地图皮肤编辑器：<a href="http://lbs.amap.com/dev/mapstyle/index" rel="nofollow noreferrer" target="_blank">高德地图皮肤编辑器</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671765" src="https://static.alili.tech/img/remote/1460000010671765" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在编辑器中修改道路，陆地，建筑，水域，绿地等颜色，同时在配置中隐藏了一些道路、建筑与标记，简化地图。<br>编辑完成后点击发布，获得地图样式ID：e6fa21422698f8a28585158d9d075f1d<br>在地图初始化中引入地图样式即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gomap;
gomap = new AMap.Map('gomap', {
    zoomEnable : false,
    zoom:18,
    center: [118.18088, 24.4896],
    mapStyle : 'amap://styles/e6fa21422698f8a28585158d9d075f1d'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> gomap;
gomap = <span class="hljs-keyword">new</span> AMap.<span class="hljs-built_in">Map</span>(<span class="hljs-string">'gomap'</span>, {
    zoomEnable : <span class="hljs-keyword">false</span>,
    zoom:<span class="hljs-number">18</span>,
    center: [<span class="hljs-number">118.18088</span>, <span class="hljs-number">24.4896</span>],
    mapStyle : <span class="hljs-string">'amap://styles/e6fa21422698f8a28585158d9d075f1d'</span>
});</code></pre>
<p><a href="https://www.guowc.cc/go/demo2.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671766" src="https://static.alili.tech/img/remote/1460000010671766" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这样看起来就有点游戏的样子了</p>
<h3 id="articleHeader12">三、地图定位</h3>
<p>我们需要把地图和主角定位在当前位置，并且在移动时实时更新定位，这就需要借助AMap的geolocation插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gomap.plugin('AMap.Geolocation',function(){
    var geo = new AMap.Geolocation({
        showButton: false,
        showCircle: false,
        showMarker : true,               //显示定位图标
        markerOptions : {
            content : '<div class=&quot;Symbol hero&quot;></div>', //设置marker自定义节点内容
        }
    });
    gomap.addControl(geo);
    geo.watchPosition();        //实时获取定位
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位成功信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gomap.plugin(<span class="hljs-string">'AMap.Geolocation'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> geo = <span class="hljs-keyword">new</span> AMap.Geolocation({
        showButton: <span class="hljs-literal">false</span>,
        showCircle: <span class="hljs-literal">false</span>,
        showMarker : <span class="hljs-literal">true</span>,               <span class="hljs-comment">//显示定位图标</span>
        markerOptions : {
            content : <span class="hljs-string">'&lt;div class="Symbol hero"&gt;&lt;/div&gt;'</span>, <span class="hljs-comment">//设置marker自定义节点内容</span>
        }
    });
    gomap.addControl(geo);
    geo.watchPosition();        <span class="hljs-comment">//实时获取定位</span>
    AMap.event.addListener(geolocation, <span class="hljs-string">'complete'</span>, onComplete);<span class="hljs-comment">//返回定位成功信息</span>
    AMap.event.addListener(geolocation, <span class="hljs-string">'error'</span>, onError);      <span class="hljs-comment">//返回定位出错信息</span>
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671767" src="https://static.alili.tech/img/remote/1460000010671767" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>小智一个人站在地图上有点孤单，我们给他加一个光环放大的效果，看起来像是在发出检测信号：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".Symbol.hero:after{
    -webkit-animation:heroWave 2s ease infinite;
    background:rgba(255,255,181,0.1);
    content:'';
    width:100px;
    height:100px;
    display:block;
    position:absolute;
    left:-30px;
    top:-30px;
    border-radius:100%;
    box-shadow:0 0 0 1px rgba(255,255,181,0.7);
    opacity:0.7;
}
@-webkit-keyframes heroWave{
    0%{ -webkit-transform:scale(0.2);opacity:0}
    50%{ opacity:1}
    100%{ -webkit-transform:scale(1);opacity:0}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.Symbol</span><span class="hljs-selector-class">.hero</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">-webkit-animation</span>:heroWave <span class="hljs-number">2s</span> ease infinite;
    <span class="hljs-attribute">background</span>:<span class="hljs-built_in">rgba</span>(255,255,181,0.1);
    <span class="hljs-attribute">content</span>:<span class="hljs-string">''</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">left</span>:-<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">top</span>:-<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">box-shadow</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(255,255,181,0.7);
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0.7</span>;
}
@-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> heroWave{
    0%{ <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">scale</span>(0.2);<span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>}
    50%{ <span class="hljs-attribute">opacity</span>:<span class="hljs-number">1</span>}
    100%{ <span class="hljs-attribute">-webkit-transform</span>:<span class="hljs-built_in">scale</span>(1);<span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>}
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671768" src="https://static.alili.tech/img/remote/1460000010671768" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://www.guowc.cc/go/demo3.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a></p>
<h3 id="articleHeader13">四、罗盘</h3>
<p>有了定位，我们还需要知道自己移动的方向，方便接近目标，所以我们在界面右上角放置了一个虚拟罗盘</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671769" src="https://static.alili.tech/img/remote/1460000010671769" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>通过监听HTML5的deviceorientation获取指南针角度信息，改变罗盘旋转方向：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (window.DeviceOrientationEvent) {
    window.addEventListener(&quot;deviceorientation&quot;, function(event){
        var dir =  event.webkitCompassHeading;
        $(&quot;#J_pin&quot;).css(&quot;-webkit-transform&quot;,'rotate('+ (360-dir) +'deg)');
    }, false);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.DeviceOrientationEvent) {
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"deviceorientation"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
        <span class="hljs-keyword">var</span> dir =  event.webkitCompassHeading;
        $(<span class="hljs-string">"#J_pin"</span>).css(<span class="hljs-string">"-webkit-transform"</span>,<span class="hljs-string">'rotate('</span>+ (<span class="hljs-number">360</span>-dir) +<span class="hljs-string">'deg)'</span>);
    }, <span class="hljs-literal">false</span>);
}</code></pre>
<p><a href="https://www.guowc.cc/go/demo4.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a> (罗盘只在移动端生效，扫码查看)</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671770" src="https://static.alili.tech/img/remote/1460000010671770" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">五、精灵数据</h3>
<p>由于精灵的编号，属性，星级等数据是固定的，在前端创建一个保存精灵图鉴数据的JSON文件，以减少服务端返回数据的复杂度，通过编号在图鉴中索引对应精灵的相关数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Pokedex = [
    {
        'number':'001',
        'name' :'妙蛙种子',
        'name_jp' : 'フシギダネ',
        'name_en' : 'Bulbasaur',
        'properties' : ['草','毒'],
        'star' : 4,
    },
    {
        'number':'002',
        'name' :'妙蛙草',
        'name_jp' : 'フシギソウ',
        'name_en' : 'Ivysaur',
        'properties' : ['草','毒'],
        'star' : 4,
    },
    ...
];
//精灵属性颜色配置
var Pokedexcolor = {
    '草' : '#1ba50e,#2ec920',
    '冰' : '#13c6db,#57e9ff',
    '超能力' :'#dd045b,#f7478d',
    '虫' : '#889610,#b5b214',
    '地面' : '#af8a19,#d8b343',
    '电' : '#b28200,#ffd621',
    '毒' : '#752464,#9e448c',
    '飞行' : '#4381ff,#72aefc',
    '钢' : '#6d6d8a,#aaaabb',
    '格斗' : '#902918,#bb5544',
    '火' : '#c72500,#f05526',
    '龙' : '#2b1aa6,#7766ee',
    '水' : '#2b1aa6,#3088e1',
    '岩石' : '#907d2f,#a89755',
    '一般' : '#969685,#bbbbaa',
    '幽灵' : '#3d3d7c,#5f52a7',
    '妖精' : '#3d3d7c,#5f52a7',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> Pokedex = [
    {
        <span class="hljs-string">'number'</span>:<span class="hljs-string">'001'</span>,
        <span class="hljs-string">'name'</span> :<span class="hljs-string">'妙蛙种子'</span>,
        <span class="hljs-string">'name_jp'</span> : <span class="hljs-string">'フシギダネ'</span>,
        <span class="hljs-string">'name_en'</span> : <span class="hljs-string">'Bulbasaur'</span>,
        <span class="hljs-string">'properties'</span> : [<span class="hljs-string">'草'</span>,<span class="hljs-string">'毒'</span>],
        <span class="hljs-string">'star'</span> : <span class="hljs-number">4</span>,
    },
    {
        <span class="hljs-string">'number'</span>:<span class="hljs-string">'002'</span>,
        <span class="hljs-string">'name'</span> :<span class="hljs-string">'妙蛙草'</span>,
        <span class="hljs-string">'name_jp'</span> : <span class="hljs-string">'フシギソウ'</span>,
        <span class="hljs-string">'name_en'</span> : <span class="hljs-string">'Ivysaur'</span>,
        <span class="hljs-string">'properties'</span> : [<span class="hljs-string">'草'</span>,<span class="hljs-string">'毒'</span>],
        <span class="hljs-string">'star'</span> : <span class="hljs-number">4</span>,
    },
    ...
];
<span class="hljs-comment">//精灵属性颜色配置</span>
<span class="hljs-keyword">var</span> Pokedexcolor = {
    <span class="hljs-string">'草'</span> : <span class="hljs-string">'#1ba50e,#2ec920'</span>,
    <span class="hljs-string">'冰'</span> : <span class="hljs-string">'#13c6db,#57e9ff'</span>,
    <span class="hljs-string">'超能力'</span> :<span class="hljs-string">'#dd045b,#f7478d'</span>,
    <span class="hljs-string">'虫'</span> : <span class="hljs-string">'#889610,#b5b214'</span>,
    <span class="hljs-string">'地面'</span> : <span class="hljs-string">'#af8a19,#d8b343'</span>,
    <span class="hljs-string">'电'</span> : <span class="hljs-string">'#b28200,#ffd621'</span>,
    <span class="hljs-string">'毒'</span> : <span class="hljs-string">'#752464,#9e448c'</span>,
    <span class="hljs-string">'飞行'</span> : <span class="hljs-string">'#4381ff,#72aefc'</span>,
    <span class="hljs-string">'钢'</span> : <span class="hljs-string">'#6d6d8a,#aaaabb'</span>,
    <span class="hljs-string">'格斗'</span> : <span class="hljs-string">'#902918,#bb5544'</span>,
    <span class="hljs-string">'火'</span> : <span class="hljs-string">'#c72500,#f05526'</span>,
    <span class="hljs-string">'龙'</span> : <span class="hljs-string">'#2b1aa6,#7766ee'</span>,
    <span class="hljs-string">'水'</span> : <span class="hljs-string">'#2b1aa6,#3088e1'</span>,
    <span class="hljs-string">'岩石'</span> : <span class="hljs-string">'#907d2f,#a89755'</span>,
    <span class="hljs-string">'一般'</span> : <span class="hljs-string">'#969685,#bbbbaa'</span>,
    <span class="hljs-string">'幽灵'</span> : <span class="hljs-string">'#3d3d7c,#5f52a7'</span>,
    <span class="hljs-string">'妖精'</span> : <span class="hljs-string">'#3d3d7c,#5f52a7'</span>,
}</code></pre>
<h3 id="articleHeader15">六、在地图上添加精灵</h3>
<p>主角诞生了，现在开始在周围生成一些随机的精灵，调用getGlassPokemon接口，传递当前位置坐标，服务端在坐标半径1公里内生成一定个数的精灵，前端通过返回的坐标和精灵编号将对应精灵添加到地图上。</p>
<blockquote><p>由于后续接口需要验证微信授权信息，为了便于DEMO查看请先访问一次模拟登陆接口：<a href="http://www.guowc.cc/api/sysUser/login?openid=o3aw6v1QLA6R7B0w6vPBfL9Ti8Mw" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.guowc.cc/api/sysUser/login?openid=o3aw6v1QLA6R7B0w6vPBfL9Ti8Mw" rel="nofollow noreferrer" target="_blank">http://www.guowc.cc/api/sysUs...</a></p></blockquote>
<p><code>getGlassPokemon</code>接口返回数据格式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data : {
    {
        id : 231,     //精灵唯一标识，用于捕捉成功后从数据库中精准删除地图对应精灵
        number: &quot;77&quot;,          //精灵编号，用于图鉴中获取更多精灵信息
        lng : 118.094561807441    //精灵经度
        lat : 24.4805797983452    //精灵纬度
    },
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">data </span>: {
    {
        <span class="hljs-attribute">id </span>: <span class="hljs-number">231</span>,     <span class="hljs-comment">//精灵唯一标识，用于捕捉成功后从数据库中精准删除地图对应精灵</span>
        <span class="hljs-attribute">number</span>: <span class="hljs-string">"77"</span>,          <span class="hljs-comment">//精灵编号，用于图鉴中获取更多精灵信息</span>
        <span class="hljs-attribute">lng </span>: <span class="hljs-number">118.094561807441</span>    <span class="hljs-comment">//精灵经度</span>
        <span class="hljs-attribute">lat </span>: <span class="hljs-number">24.4805797983452</span>    <span class="hljs-comment">//精灵纬度</span>
    },
    ...
}</code></pre>
<p>首先在前面的geolocation插件中调用<code>getCurrentPosition()</code>方法，获取一次初始定位坐标，<br>将坐标传给<code>getPokemons</code>接口拉取草地精灵数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var self = this
gomap.plugin('AMap.Geolocation',function(){
    var geo = new AMap.Geolocation({
        ...
    });
    ...
    //首次定位
    geo.getCurrentPosition(function( status, result ){
        heroPoint.lng = result.position.lng;
        heroPoint.lat = result.position.lat;
        self.getPokemon(heroPoint)
    });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
gomap.plugin(<span class="hljs-string">'AMap.Geolocation'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> geo = <span class="hljs-keyword">new</span> AMap.Geolocation({
        ...
    });
    ...
    <span class="hljs-comment">//首次定位</span>
    geo.getCurrentPosition(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( status, result )</span></span>{
        heroPoint.lng = result.position.lng;
        heroPoint.lat = result.position.lat;
        <span class="hljs-keyword">self</span>.getPokemon(heroPoint)
    });
})</code></pre>
<p>请求接口数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getPokemon : function(point) {
    var self = this
    Method.fetch(Api.getGlassPokemons,{ lng:point.lng,lat:point.lat },function(data){
        var res = data.data;
        for(var i = 0; i < res.length; i++){
            self.addPokemon(res[i]);
        }
    });
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>getPokemon : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(point)</span> </span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
    Method.fetch(Api.getGlassPokemons,{ lng:point.lng,lat:point.lat },<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
        <span class="hljs-keyword">var</span> res = data.data;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; res.length; i++){
            <span class="hljs-keyword">self</span>.addPokemon(res[i]);
        }
    });
},</code></pre>
<blockquote><p>Method.fetch为封装的ajax方法，只贴出关键流程代码，具体详见DEMO</p></blockquote>
<p>获取到数据后，循环调用addPokemon方法，将精灵添加到地图上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addPokemon : function(data) {
    var pid = Method.getPid(data.number); //获取精灵编号（格式化'12'=>'012'）
    var marker =  new AMap.Marker({
        map: Common.gomap,
        position: [data.position_x, data.position_y],
        icon: new AMap.Icon({
            size: new AMap.Size(40, 40),
            imageSize : new AMap.Size(40, 40),
            image: &quot;images/pokemon/PM_icon_&quot;+ pid +&quot;.png&quot;,
        }),
    });
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">addPokemon</span> : function(<span class="hljs-class"><span class="hljs-keyword">data</span>) {
    <span class="hljs-title">var</span> <span class="hljs-title">pid</span> = <span class="hljs-type">Method</span>.<span class="hljs-title">getPid</span>(<span class="hljs-title">data</span>.<span class="hljs-title">number</span>); //获取精灵编号（格式化'12'=&gt;'012'）
    <span class="hljs-title">var</span> <span class="hljs-title">marker</span> =  <span class="hljs-title">new</span> <span class="hljs-type">AMap</span>.<span class="hljs-type">Marker</span>({
        <span class="hljs-title">map</span>: <span class="hljs-type">Common</span>.<span class="hljs-title">gomap</span>,
        <span class="hljs-title">position</span>: [<span class="hljs-title">data</span>.<span class="hljs-title">position_x</span>, <span class="hljs-title">data</span>.<span class="hljs-title">position_y</span>],
        <span class="hljs-title">icon</span>: <span class="hljs-title">new</span> <span class="hljs-type">AMap</span>.<span class="hljs-type">Icon</span>({
            <span class="hljs-title">size</span>: <span class="hljs-title">new</span> <span class="hljs-type">AMap</span>.<span class="hljs-type">Size</span>(40, 40),
            <span class="hljs-title">imageSize</span> : <span class="hljs-title">new</span> <span class="hljs-type">AMap</span>.<span class="hljs-type">Size</span>(40, 40),
            <span class="hljs-title">image</span>: "<span class="hljs-title">images</span>/<span class="hljs-title">pokemon</span>/<span class="hljs-type">PM_icon_</span>"+ <span class="hljs-title">pid</span> +".<span class="hljs-title">png</span>",
        }),</span>
    });
},</code></pre>
<p><a href="https://www.guowc.cc/go/demo5.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671771" src="https://static.alili.tech/img/remote/1460000010671771" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在我们就能在地图上看到精灵了～</p>
<h3 id="articleHeader16">七、获取背包精灵</h3>
<p>这一步我们先把已捕捉到的精灵列表保存起来，以便后续使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getMyPokemons : function(){
    Method.fetch(API.getMyPokemons,{},function(data){
        for(var i = 0 ;i < data.data.length; i++){
            State.bag.push(Method.getPid(data.data[i].number));   //将已获得精灵编号保存在全局State.bag数组中
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>getMyPokemons : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    Method.fetch(API.getMyPokemons,{},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
        for(var i = <span class="hljs-number">0</span> ;i &lt; <span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.length; i++){
            State.bag.push(Method.getPid(<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>[i].<span class="hljs-keyword">number</span>));   //将已获得精灵编号保存在全局State.bag数组中
        }
    });
}</code></pre>
<h3 id="articleHeader17">八、精灵收集</h3>
<h4>操作优化</h4>
<p>精灵收集是整个游戏的核心功能，原版pokemonGo精灵捕捉过程为AR实景捕捉形式，我们把精灵的捕捉形式简化了，保留街机时代的像素风格。最早在实现这个功能时，采用的策略是当玩家坐标与地图精灵小于一定距离时，自动进入精灵捕捉场景，这种方式存在几个问题：</p>
<ol>
<li>用户位置发生变化时，需要不断计算用户坐标与地图上所有精灵的距离，计算量较大</li>
<li>可能存在同时与两个精灵距离符合捕捉条件，而一次只能捕捉一只精灵</li>
<li>用户如果不移动，基本很难捕捉到精灵</li>
</ol>
<p>经过优化，将捕捉规则修改为：直接点击地图精灵即可捕捉，半径500米外提示用户超过捕捉范围。<br>优化后的方案降低了捕捉门槛，也鼓励用户走动去发现和捕捉更多精灵。</p>
<h4>数据传递</h4>
<p>上一步的addPokemon方法中，我们已经向地图中添加了精灵点标记（marker），但此时地图上的精灵唯一区分只是图片不同而已，我们还需为每个marker绑定对应的精灵信息，并为每个marker绑定点击事件，下面完善一下addPokemon方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addPokemon : function(data) {
    var self = this;
    var nid = parseInt(data.number);
    var pid = Method.getPid(data.number); //获取精灵编号（格式化'12'=>'012'）;
    var id = data.id;
    var marker =  new AMap.Marker({
        map: Common.gomap,
        position: [data.position_x, data.position_y],
        icon: new AMap.Icon({
            size: new AMap.Size(40, 40),
            imageSize : new AMap.Size(40, 40),
            image: &quot;images/pokemon/PM_icon_&quot;+ pid +&quot;.png&quot;,
        }),
        extData : {
            nid : nid,
            id  : id,
        }
    });
    marker.on('click',function(e){
        self.clickPokemon(e)
    })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-attribute">addPokemon</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-built_in">var</span> nid = <span class="hljs-built_in">parseInt</span>(data.number);
    <span class="hljs-built_in">var</span> pid = Method.getPid(data.number); <span class="hljs-comment">//获取精灵编号（格式化'12'=&gt;'012'）;</span>
    <span class="hljs-built_in">var</span> id = data.id;
    <span class="hljs-built_in">var</span> marker =  <span class="hljs-keyword">new</span> AMap.Marker({
        <span class="hljs-attribute">map</span>: Common.gomap,
        <span class="hljs-attribute">position</span>: [data.position_x, data.position_y],
        <span class="hljs-attribute">icon</span>: <span class="hljs-keyword">new</span> AMap.Icon({
            <span class="hljs-attribute">size</span>: <span class="hljs-keyword">new</span> AMap.Size(<span class="hljs-number">40</span>, <span class="hljs-number">40</span>),
            <span class="hljs-attribute">imageSize</span> : <span class="hljs-keyword">new</span> AMap.Size(<span class="hljs-number">40</span>, <span class="hljs-number">40</span>),
            <span class="hljs-attribute">image</span>: <span class="hljs-string">"images/pokemon/PM_icon_"</span>+ pid +<span class="hljs-string">".png"</span>,
        }),
        <span class="hljs-attribute">extData</span> : {
            <span class="hljs-attribute">nid</span> : nid,
            <span class="hljs-attribute">id  :</span><span class="hljs-string"> id</span>,
        }
    });
    marker.on(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        self.clickPokemon(e)
    })
},</code></pre>
<p>由于地图上显示精灵图标过小，无法展示更多信息，所以点击精灵后，不直接进入战斗，先弹出对应精灵的卡牌：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clickPokemon : function(e){
    var self = this;
    var data = e.target.getExtData();
    self.initPokecard(data.nid,e.target);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>clickPokemon : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
    var self = this;
    var <span class="hljs-keyword">data</span> = e.<span class="hljs-keyword">target</span>.getExtData();
    self.initPokecard(<span class="hljs-keyword">data</span>.nid,e.<span class="hljs-keyword">target</span>);
},</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671772" src="https://static.alili.tech/img/remote/1460000010671772" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>初始化卡牌弹窗：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;Modal pokedex&quot; id=&quot;js-modal-pokedex&quot;>
    <div class=&quot;card&quot;>
        <div class=&quot;namebox&quot;>
            <p class=&quot;name_cn&quot;></p>
            <p class=&quot;name_jp&quot;></p>
        </div>
        <div class=&quot;pokebox&quot;>
            <img class=&quot;pokeimg&quot; src=&quot;&quot; alt=&quot;&quot;>
            <div class=&quot;Widget stars&quot;>
                <div class=&quot;star&quot;></div>
            </div>
        </div>
        <div class=&quot;propbox&quot;>
            <div class=&quot;num&quot;></div>
            <div class=&quot;prop&quot;></div>
        </div>
        <p class=&quot;Widget timer tips&quot;><b class=&quot;t&quot;>TIPS </b>捕捉半径<span class=&quot;t&quot;>500</span>米 当前距离<span class=&quot;t dist&quot;>0</span>米</p>
        <span id=&quot;js-btn-catch&quot; class=&quot;catchbtn&quot;>捕捉</span>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"Modal pokedex"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"js-modal-pokedex"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"card"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"namebox"</span>&gt;
            &lt;p <span class="hljs-built_in">class</span>=<span class="hljs-string">"name_cn"</span>&gt;&lt;/p&gt;
            &lt;p <span class="hljs-built_in">class</span>=<span class="hljs-string">"name_jp"</span>&gt;&lt;/p&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pokebox"</span>&gt;
            &lt;img <span class="hljs-built_in">class</span>=<span class="hljs-string">"pokeimg"</span> src=<span class="hljs-string">""</span> alt=<span class="hljs-string">""</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"Widget stars"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"star"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"propbox"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"num"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"prop"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;p <span class="hljs-built_in">class</span>=<span class="hljs-string">"Widget timer tips"</span>&gt;&lt;b <span class="hljs-built_in">class</span>=<span class="hljs-string">"t"</span>&gt;TIPS &lt;/b&gt;捕捉半径&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"t"</span>&gt;<span class="hljs-number">500</span>&lt;/span&gt;米 当前距离&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"t dist"</span>&gt;<span class="hljs-number">0</span>&lt;/span&gt;米&lt;/p&gt;
        &lt;span <span class="hljs-built_in">id</span>=<span class="hljs-string">"js-btn-catch"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"catchbtn"</span>&gt;捕捉&lt;/span&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initPokecard : function(nid, target) {
    var $card = Element.$pokedex，
        $catch = Element.$catch;
    var data = Pokedex[nid - 1];   //从图鉴JSON中获取对应精灵详细图鉴数据
    var props = '', dist = 0;
    var imgUrl = 'images/pokemon_big/PM_animation_'+ data.number +'.png';

    //拼接属性节点
    for(var i = 0; i< data.properties.length; i++){
        var color = Pokedexcolor[data.properties[i]].split(',');
        props += '<div class=&quot;item&quot; style=&quot;background:'+ color[1] +';border-color:'+ color[0] +'&quot;>'+ data.properties[i] +'</div>';
    }
    $card.find('.name_cn').text(data.name);  //精灵中文名
    $card.find('.name_jp').text(data.name_jp + data.name_en);  //精灵外文名
    $card.find('.star')[0].className = 'star star_' + data.star;   //精灵星级
    $card.find('.num').text('No.' + data.number);  //精灵编号
    $card.find('.prop').html(props);   //精灵属性
    //预加载精灵大图
    $card.find('.pokebox').removeClass('loaded');
    Method.loadImg(imgUrl, function() {
        $card.find('.pokeimg').attr('src',imgUrl);
        $card.find('.pokebox').addClass('loaded');
    });
    $card.addClass('show');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>initPokecard : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(nid, target)</span> </span>{
    <span class="hljs-keyword">var</span> $card = Element.$pokedex，
        $catch = Element.$catch;
    <span class="hljs-keyword">var</span> data = Pokedex[nid - <span class="hljs-number">1</span>];   <span class="hljs-comment">//从图鉴JSON中获取对应精灵详细图鉴数据</span>
    <span class="hljs-keyword">var</span> props = <span class="hljs-string">''</span>, dist = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> imgUrl = <span class="hljs-string">'images/pokemon_big/PM_animation_'</span>+ data.number +<span class="hljs-string">'.png'</span>;

    <span class="hljs-comment">//拼接属性节点</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt; data.properties.length; i++){
        <span class="hljs-keyword">var</span> color = Pokedexcolor[data.properties[i]].split(<span class="hljs-string">','</span>);
        props += <span class="hljs-string">'&lt;div class="item" style="background:'</span>+ color[<span class="hljs-number">1</span>] +<span class="hljs-string">';border-color:'</span>+ color[<span class="hljs-number">0</span>] +<span class="hljs-string">'"&gt;'</span>+ data.properties[i] +<span class="hljs-string">'&lt;/div&gt;'</span>;
    }
    $card.find(<span class="hljs-string">'.name_cn'</span>).text(data.name);  <span class="hljs-comment">//精灵中文名</span>
    $card.find(<span class="hljs-string">'.name_jp'</span>).text(data.name_jp + data.name_en);  <span class="hljs-comment">//精灵外文名</span>
    $card.find(<span class="hljs-string">'.star'</span>)[<span class="hljs-number">0</span>].className = <span class="hljs-string">'star star_'</span> + data.star;   <span class="hljs-comment">//精灵星级</span>
    $card.find(<span class="hljs-string">'.num'</span>).text(<span class="hljs-string">'No.'</span> + data.number);  <span class="hljs-comment">//精灵编号</span>
    $card.find(<span class="hljs-string">'.prop'</span>).html(props);   <span class="hljs-comment">//精灵属性</span>
    <span class="hljs-comment">//预加载精灵大图</span>
    $card.find(<span class="hljs-string">'.pokebox'</span>).removeClass(<span class="hljs-string">'loaded'</span>);
    Method.loadImg(imgUrl, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        $card.find(<span class="hljs-string">'.pokeimg'</span>).attr(<span class="hljs-string">'src'</span>,imgUrl);
        $card.find(<span class="hljs-string">'.pokebox'</span>).addClass(<span class="hljs-string">'loaded'</span>);
    });
    $card.addClass(<span class="hljs-string">'show'</span>);
}</code></pre>
<p>到这里就完成了精灵卡片的初始化（与背包图鉴共用），然而卡片只带有固定数据，需要跟单纯的图鉴查看器做区分，我们在卡片下方加上操作区，操作区有3种状态：精灵可捕捉，精灵已获得，精灵超出捕捉范围：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671773" src="https://static.alili.tech/img/remote/1460000010671773" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initPokecard : function(nid, target) {
    ...
    //判断点击精灵行为来自地图还是图鉴
    if(target) {
        var pa = target.getPosition(),
            pb = [State.heroPoint.lng,State.heroPoint.lat];
        var dist = parseInt(pa.distance(pb));  //计算主角与点击精灵距离

        $card.addClass('catch');
        $card.off().on('touchend',function(e){
            $(this).removeClass('show');
            e.preventDefault();
        })
        if( dist < 500 ) {
            $card.find('.tips').hide();
            if(State.bag.indexOf(data.number) != -1){
                $catch.removeClass().addClass('ownbtn').text('已获得');
            }else{
                $catch.removeClass().addClass('catchbtn').text('捕捉');
            }
        }else{
            $card.find('.dist').text(dist);
            $card.find('.tips').show();
            $catch.removeClass().addClass('overbtn').text('走近点啊亲');
        }
    }else{
        $card.removeClass('catch');
        $card.find('.tips').hide();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>initPokecard : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(nid, target)</span> </span>{
    ...
    <span class="hljs-comment">//判断点击精灵行为来自地图还是图鉴</span>
    <span class="hljs-keyword">if</span>(target) {
        <span class="hljs-keyword">var</span> pa = target.getPosition(),
            pb = [State.heroPoint.lng,State.heroPoint.lat];
        <span class="hljs-keyword">var</span> dist = parseInt(pa.distance(pb));  <span class="hljs-comment">//计算主角与点击精灵距离</span>

        $card.addClass(<span class="hljs-string">'catch'</span>);
        $card.off().on(<span class="hljs-string">'touchend'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
            $(this).removeClass(<span class="hljs-string">'show'</span>);
            e.preventDefault();
        })
        <span class="hljs-keyword">if</span>( dist &lt; <span class="hljs-number">500</span> ) {
            $card.find(<span class="hljs-string">'.tips'</span>).hide();
            <span class="hljs-keyword">if</span>(State.bag.indexOf(data.number) != <span class="hljs-number">-1</span>){
                $catch.removeClass().addClass(<span class="hljs-string">'ownbtn'</span>).text(<span class="hljs-string">'已获得'</span>);
            }<span class="hljs-keyword">else</span>{
                $catch.removeClass().addClass(<span class="hljs-string">'catchbtn'</span>).text(<span class="hljs-string">'捕捉'</span>);
            }
        }<span class="hljs-keyword">else</span>{
            $card.find(<span class="hljs-string">'.dist'</span>).text(dist);
            $card.find(<span class="hljs-string">'.tips'</span>).show();
            $catch.removeClass().addClass(<span class="hljs-string">'overbtn'</span>).text(<span class="hljs-string">'走近点啊亲'</span>);
        }
    }<span class="hljs-keyword">else</span>{
        $card.removeClass(<span class="hljs-string">'catch'</span>);
        $card.find(<span class="hljs-string">'.tips'</span>).hide();
    }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671774" src="https://static.alili.tech/img/remote/1460000010671774" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671775" src="https://static.alili.tech/img/remote/1460000010671775" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://www.guowc.cc/go/demo6.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a></p>
<h3 id="articleHeader18">九、精灵捕捉场景</h3>
<p>首先为卡片下方的捕捉按钮绑定事件，将点击的精灵数据传递到meetPokemon方法中（初始化精灵捕捉场景方法）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initPokecard : function(nid, target) {
    ...
    if(target) {
        var ext = target.getExtData()
        $catch.off();  //解除捕捉按钮绑定事件
        ...
        if( dist < 500 ){
            if(State.bag.indexOf('data.number) != -1){
                ...
            }else{
                $catch.on('touchend', self.meetPokemon(ext.nid,ext.id));
                target.setMap(null);  //开始捕捉后将地图上对应小精灵移除（捕捉成功or失败小精灵都会消失）
            }
        }
    }else{

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>initPokecard : function(nid, target) {
    ...
    <span class="hljs-keyword">if</span>(target) {
        <span class="hljs-keyword">var</span> ext = target.getExtData()
        $<span class="hljs-keyword">catch</span>.off();  <span class="hljs-comment">//解除捕捉按钮绑定事件</span>
        ...
        <span class="hljs-keyword">if</span>( dist &lt; <span class="hljs-number">500</span> ){
            <span class="hljs-keyword">if</span>(<span class="hljs-type">State</span>.bag.indexOf(<span class="hljs-symbol">'data</span>.number) != <span class="hljs-number">-1</span>){
                ...
            }<span class="hljs-keyword">else</span>{
                $<span class="hljs-keyword">catch</span>.on(<span class="hljs-symbol">'touchen</span>d', self.meetPokemon(ext.nid,ext.id));
                target.setMap(<span class="hljs-literal">null</span>);  <span class="hljs-comment">//开始捕捉后将地图上对应小精灵移除（捕捉成功or失败小精灵都会消失）</span>
            }
        }
    }<span class="hljs-keyword">else</span>{

    }
}</code></pre>
<p>然后初始化捕捉场景：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="meetPokemon : function(nid,id){
    Element.$modal.removeClass('show');
    Element.$body.addClass('State catching');  //进入捕捉场景需要控制界面多处UI，所以把状态class放到body上
    Element.$catchBox.find('.texture').attr('src','images/pokemon_big/PM_animation_' + Pokedex[nid].number + '.png');
    Element.$catchBox.find('.pname').text(Pokedex[nid].name);
    Element.$catchBox.find('.star')[0].className = 'star star_' + Pokedex[nid].star;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>meetPokemon : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(nid,id)</span></span>{
    Element.$modal.removeClass(<span class="hljs-string">'show'</span>);
    Element.$body.addClass(<span class="hljs-string">'State catching'</span>);  <span class="hljs-comment">//进入捕捉场景需要控制界面多处UI，所以把状态class放到body上</span>
    Element.$catchBox.find(<span class="hljs-string">'.texture'</span>).attr(<span class="hljs-string">'src'</span>,<span class="hljs-string">'images/pokemon_big/PM_animation_'</span> + Pokedex[nid].number + <span class="hljs-string">'.png'</span>);
    Element.$catchBox.find(<span class="hljs-string">'.pname'</span>).text(Pokedex[nid].name);
    Element.$catchBox.find(<span class="hljs-string">'.star'</span>)[<span class="hljs-number">0</span>].className = <span class="hljs-string">'star star_'</span> + Pokedex[nid].star;
},</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671776" src="https://static.alili.tech/img/remote/1460000010671776" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><a href="https://www.guowc.cc/go/demo7.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a></p>
<h3 id="articleHeader19">十、去吧精灵球！</h3>
<p>现在点击丢出精灵球开始捕捉精灵，首先在meetPokemon中绑定精灵球的点击事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="meetPokemon : function(nid,id){
    ...
    Element.$catchBox.find('.ballbox').off().on('touchend',function(){
        self.catchPokemon(nid,id)
    })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>meetPokemon : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(nid,id)</span></span>{
    ...
    Element.$catchBox.find(<span class="hljs-string">'.ballbox'</span>).off().on(<span class="hljs-string">'touchend'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">self</span>.catchPokemon(nid,id)
    })
},</code></pre>
<p>接下来实现catchPokemon方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="catchPokemon : function(nid,id){
    var self = this;
    var name = Pokedex[nid].name,
        pid = Pokedex[nid].number,
        star = Pokedex[nid].star,
        rate = 0.8 -  star / 10;   //根据星级决定捕捉成功概率

    if(State.catching) return;

    if(Method.random(rate)){
        //捕捉成功
        Element.$catchBox.addClass('catchwin');    //在catchbox上增加catchwin控制捕捉成功动画（动画具体实现参照DEMO）
        Method.fetch(API.catchPokemon,{ id : id },function(){
            console.log('捕捉成功！')   //向服务端发送捕捉成功请求，移除getGlassPokemon返回的对应位置精灵，同时加入用户背包
        });
        setTimeout(function(){
            //动画播放结束后调用捕捉成功弹窗
            self.awardBox('images/pokemon_big/PM_animation_' + pid + '.png',name,function(){
                //弹窗关闭后回到主界面
                $body.removeClass();
                Element.$catchBox.removeClass('catchwin');
                State.catching = false;
            });
        },3200);
    }else{
        //捕捉失败
        Element.$catchBox.addClass('catchfail');  //在catchbox上增加catchfail控制捕捉失败动画
        Method.fetch(API.catchPokemon,{ id : id , flag : true},function(){
            console.log('捕捉失败！')   //向服务端发送捕捉失败请求，仅移除getGlassPokemon返回的对应位置精灵
        });
        setTimeout(function(){
            //动画播放失败后调用捕捉失败弹窗
            self.alertBox(name + ' 逃跑了!',function(){
                //弹窗关闭后回到主界面
                Element.$body.removeClass();
                Element.$catchBox.removeClass('catchfail');
                State.catching = false;
            });
        },1500);
    }
    State.catching = true;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>catchPokemon : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(nid,id)</span></span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">var</span> name = Pokedex[nid].name,
        pid = Pokedex[nid].number,
        star = Pokedex[nid].star,
        rate = <span class="hljs-number">0.8</span> -  star / <span class="hljs-number">10</span>;   <span class="hljs-comment">//根据星级决定捕捉成功概率</span>

    <span class="hljs-keyword">if</span>(State.catching) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">if</span>(Method.random(rate)){
        <span class="hljs-comment">//捕捉成功</span>
        Element.$catchBox.addClass(<span class="hljs-string">'catchwin'</span>);    <span class="hljs-comment">//在catchbox上增加catchwin控制捕捉成功动画（动画具体实现参照DEMO）</span>
        Method.fetch(API.catchPokemon,{ id : id },<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            console.log(<span class="hljs-string">'捕捉成功！'</span>)   <span class="hljs-comment">//向服务端发送捕捉成功请求，移除getGlassPokemon返回的对应位置精灵，同时加入用户背包</span>
        });
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//动画播放结束后调用捕捉成功弹窗</span>
            <span class="hljs-keyword">self</span>.awardBox(<span class="hljs-string">'images/pokemon_big/PM_animation_'</span> + pid + <span class="hljs-string">'.png'</span>,name,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-comment">//弹窗关闭后回到主界面</span>
                $body.removeClass();
                Element.$catchBox.removeClass(<span class="hljs-string">'catchwin'</span>);
                State.catching = <span class="hljs-keyword">false</span>;
            });
        },<span class="hljs-number">3200</span>);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//捕捉失败</span>
        Element.$catchBox.addClass(<span class="hljs-string">'catchfail'</span>);  <span class="hljs-comment">//在catchbox上增加catchfail控制捕捉失败动画</span>
        Method.fetch(API.catchPokemon,{ id : id , flag : <span class="hljs-keyword">true</span>},<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            console.log(<span class="hljs-string">'捕捉失败！'</span>)   <span class="hljs-comment">//向服务端发送捕捉失败请求，仅移除getGlassPokemon返回的对应位置精灵</span>
        });
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//动画播放失败后调用捕捉失败弹窗</span>
            <span class="hljs-keyword">self</span>.alertBox(name + <span class="hljs-string">' 逃跑了!'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-comment">//弹窗关闭后回到主界面</span>
                Element.$body.removeClass();
                Element.$catchBox.removeClass(<span class="hljs-string">'catchfail'</span>);
                State.catching = <span class="hljs-keyword">false</span>;
            });
        },<span class="hljs-number">1500</span>);
    }
    State.catching = <span class="hljs-keyword">true</span>;
},</code></pre>
<p>捕捉成功与失败：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="awardBox : function(img,name,callback){
    var cbk = callback || function(){};
    Element.$award.addClass('show');
    Element.$award.find('.img').attr('src',img);
    Element.$award.find('.pname').text(name);
    Element.$award.find('.confirm').off().on('tap',function(){
        Element.$award.removeClass('show');
        cbk();
    });
},
alertBox : function(title,callback){
    var cbk = callback || function(){};
    Element.$alert.addClass('show');
    Element.$alert.find('.heading').text(title);
    Element.$alert.find('.confirm').off().on('tap',function(){
        Element.$alert.removeClass('show');
        cbk();
    });
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>awardBox : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(img,name,callback)</span></span>{
    <span class="hljs-keyword">var</span> cbk = callback || <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};
    Element.$award.addClass(<span class="hljs-string">'show'</span>);
    Element.$award.find(<span class="hljs-string">'.img'</span>).attr(<span class="hljs-string">'src'</span>,img);
    Element.$award.find(<span class="hljs-string">'.pname'</span>).text(name);
    Element.$award.find(<span class="hljs-string">'.confirm'</span>).off().on(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        Element.$award.removeClass(<span class="hljs-string">'show'</span>);
        cbk();
    });
},
alertBox : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(title,callback)</span></span>{
    <span class="hljs-keyword">var</span> cbk = callback || <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{};
    Element.$alert.addClass(<span class="hljs-string">'show'</span>);
    Element.$alert.find(<span class="hljs-string">'.heading'</span>).text(title);
    Element.$alert.find(<span class="hljs-string">'.confirm'</span>).off().on(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        Element.$alert.removeClass(<span class="hljs-string">'show'</span>);
        cbk();
    });
},</code></pre>
<p>捕捉失败过程：<br><span class="img-wrap"><img data-src="/img/remote/1460000010671777" src="https://static.alili.tech/img/remote/1460000010671777" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>捕捉成功过程：<br><span class="img-wrap"><img data-src="/img/remote/1460000010671778" src="https://static.alili.tech/img/remote/1460000010671778" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><a href="https://www.guowc.cc/go/demo8.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a></p>
<h3 id="articleHeader20">十一、大木博士</h3>
<p>还原经典，我们加入一个简单的新手引导，通过与大木博士的对话，确定玩家性别，第一个伙伴，和简单的游戏玩法介绍。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671779" src="https://static.alili.tech/img/remote/1460000010671779" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>首先实现一个简单的打字效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typing(char,delay){
    var chars = char.split('');
    var index = 0,
        delay = 0;

    Element.$typeText.html('');
    Element.$typeNext.hide();   //打字过程隐藏下一步箭头
    State.typeOver = false;
    var timer = setInterval(function(){
        if(delay == delay){
            if(index == chars.length){
                clearInterval(timer);
                State.typeOver = true;
                Element.$typeNext.show();
                return;
            }
            if(chars[index] == '/'){
                Element.$typeText.append('<br>');  //判断换行位置
            }else{
                Element.$typeText.append(chars[index]);
            }
            index ++;
        }else{
            delay ++ ;
        }
    },50);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>typing(char,delay){
    <span class="hljs-keyword">var</span> chars = char.split(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>,
        delay = <span class="hljs-number">0</span>;

    Element.$typeText.html(<span class="hljs-string">''</span>);
    Element.$typeNext.hide();   <span class="hljs-comment">//打字过程隐藏下一步箭头</span>
    State.typeOver = <span class="hljs-keyword">false</span>;
    <span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">if</span>(delay == delay){
            <span class="hljs-keyword">if</span>(index == chars.length){
                clearInterval(timer);
                State.typeOver = <span class="hljs-keyword">true</span>;
                Element.$typeNext.show();
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-keyword">if</span>(chars[index] == <span class="hljs-string">'/'</span>){
                Element.$typeText.append(<span class="hljs-string">'&lt;br&gt;'</span>);  <span class="hljs-comment">//判断换行位置</span>
            }<span class="hljs-keyword">else</span>{
                Element.$typeText.append(chars[index]);
            }
            index ++;
        }<span class="hljs-keyword">else</span>{
            delay ++ ;
        }
    },<span class="hljs-number">50</span>);
},</code></pre>
<p>然后初始化新手引导：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initGuide : function(){
    var self = this;
    var sex = 1, pokenum = '001', typeIndex = 0;

    Method.typing('欢迎来到精灵世界/我是大木博士',10);

    Element.$modal.removeClass('show');  //隐藏所有弹窗
    Element.$modalGuide.addClass('show'); //显示新手引导弹窗
    Element.$body.addClass('blur');  //背景模糊

    Element.$typeBox.bind('tap',function(){
        //开始对话
        if(!State.typeOver) return;
        typeIndex ++;    
        switch (typeIndex) {
            case 1:
                Method.typing('这个世界到处都有精灵的存在/许多人把精灵当做伙伴',0);
                break;
            case 2:
                Method.typing('那么你是男孩还是女孩？/(选择角色)',0);
                Element.$modalGuide.addClass('setrole');  //进入选择角色界面
                Element.$setRole.bind('tap',function(){
                    $(this).addClass('selected').siblings().removeClass('selected');
                    sex = $(this).data('sex');
                });
                break;
            case 3:
                Method.typing('选择一只精灵作为你的伙伴吧/(选择精灵)',0);
                Element.$modalGuide.removeClass('setrole').addClass('setpoke');  //进入选择精灵界面
                Element.$setPoke.bind('tap',function(){
                    $(this).addClass('selected').siblings().removeClass('selected');
                    pokenum = $(this).data('number');
                    Element.$setFigure[0].className = 'img-' + pokenum;
                });
                Method.setItem('sex',sex);
                break;
            case 4:
                Method.typing('点击周围的小精灵即可抓捕!/(操作方式)',0);
                Element.$modalGuide.removeClass('setpoke');
                break;
            case 5:
                Method.typing('移动可能遇到随机出现的稀有精灵哦!/(随机事件)',0);
                break;
            case 6:
                Method.typing('请带上你的伙伴去冒险吧!',0);
                break;
            case 7:
                Element.$modalGuide.removeClass('show');
                Element.$body.removeClass('blur');
                self.ready();
                break;
            default:
        }
    });
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>initGuide : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this;
    <span class="hljs-keyword">var</span> sex = <span class="hljs-number">1</span>, pokenum = <span class="hljs-string">'001'</span>, typeIndex = <span class="hljs-number">0</span>;

    Method.typing(<span class="hljs-string">'欢迎来到精灵世界/我是大木博士'</span>,<span class="hljs-number">10</span>);

    Element.$modal.removeClass(<span class="hljs-string">'show'</span>);  <span class="hljs-comment">//隐藏所有弹窗</span>
    Element.$modalGuide.addClass(<span class="hljs-string">'show'</span>); <span class="hljs-comment">//显示新手引导弹窗</span>
    Element.$body.addClass(<span class="hljs-string">'blur'</span>);  <span class="hljs-comment">//背景模糊</span>

    Element.$typeBox.bind(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        <span class="hljs-comment">//开始对话</span>
        <span class="hljs-keyword">if</span>(!State.typeOver) <span class="hljs-keyword">return</span>;
        typeIndex ++;    
        <span class="hljs-keyword">switch</span> (typeIndex) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                Method.typing(<span class="hljs-string">'这个世界到处都有精灵的存在/许多人把精灵当做伙伴'</span>,<span class="hljs-number">0</span>);
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                Method.typing(<span class="hljs-string">'那么你是男孩还是女孩？/(选择角色)'</span>,<span class="hljs-number">0</span>);
                Element.$modalGuide.addClass(<span class="hljs-string">'setrole'</span>);  <span class="hljs-comment">//进入选择角色界面</span>
                Element.$setRole.bind(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                    $(this).addClass(<span class="hljs-string">'selected'</span>).siblings().removeClass(<span class="hljs-string">'selected'</span>);
                    sex = $(this).data(<span class="hljs-string">'sex'</span>);
                });
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
                Method.typing(<span class="hljs-string">'选择一只精灵作为你的伙伴吧/(选择精灵)'</span>,<span class="hljs-number">0</span>);
                Element.$modalGuide.removeClass(<span class="hljs-string">'setrole'</span>).addClass(<span class="hljs-string">'setpoke'</span>);  <span class="hljs-comment">//进入选择精灵界面</span>
                Element.$setPoke.bind(<span class="hljs-string">'tap'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                    $(this).addClass(<span class="hljs-string">'selected'</span>).siblings().removeClass(<span class="hljs-string">'selected'</span>);
                    pokenum = $(this).data(<span class="hljs-string">'number'</span>);
                    Element.$setFigure[<span class="hljs-number">0</span>].className = <span class="hljs-string">'img-'</span> + pokenum;
                });
                Method.setItem(<span class="hljs-string">'sex'</span>,sex);
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
                Method.typing(<span class="hljs-string">'点击周围的小精灵即可抓捕!/(操作方式)'</span>,<span class="hljs-number">0</span>);
                Element.$modalGuide.removeClass(<span class="hljs-string">'setpoke'</span>);
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
                Method.typing(<span class="hljs-string">'移动可能遇到随机出现的稀有精灵哦!/(随机事件)'</span>,<span class="hljs-number">0</span>);
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">6</span>:
                Method.typing(<span class="hljs-string">'请带上你的伙伴去冒险吧!'</span>,<span class="hljs-number">0</span>);
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">7</span>:
                Element.$modalGuide.removeClass(<span class="hljs-string">'show'</span>);
                Element.$body.removeClass(<span class="hljs-string">'blur'</span>);
                <span class="hljs-keyword">self</span>.ready();
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:
        }
    });
},</code></pre>
<p><a href="https://www.guowc.cc/go/demo9.html" rel="nofollow noreferrer" target="_blank">查看DEMO</a></p>
<h3 id="articleHeader21">十二、完善细节</h3>
<h4>页面加载</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671780" src="https://static.alili.tech/img/remote/1460000010671780" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>精灵刷新倒计时</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671781" src="https://static.alili.tech/img/remote/1460000010671781" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>系统公告</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671782" src="https://static.alili.tech/img/remote/1460000010671782" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>Toast提示</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671783" src="https://static.alili.tech/img/remote/1460000010671783" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>训练师信息</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671784" src="https://static.alili.tech/img/remote/1460000010671784" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>精灵背包</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671785" src="https://static.alili.tech/img/remote/1460000010671785" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>精灵图鉴</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671786" src="https://static.alili.tech/img/remote/1460000010671786" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>精灵大师榜</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010671787" src="https://static.alili.tech/img/remote/1460000010671787" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader22">总结</h2>
<p>这个项目是去年6月份开始的，从零开始策划、设计、到程序实现，断断续续写了2个月，期间深度分析对比了几个地图厂商的开发文档，推翻了数次方案，不断对游戏细节，性能，交互，功能取舍做优化，总结了LBS游戏开发的一些经验与建议：<br>1、文档与社区活跃度很重要（这点高德地图做的更好）<br>2、作为练手，不依赖框架库开发游戏，更能锻炼逻辑能力，了解底层实现<br>3、作为落地项目，轻量休闲游戏开发仍然需要借助成熟的游戏开发框架（Phaser、Pixel），或Vue、React（大量状态管理）<br>4、交互动画部分尽可能交给css3，js负责数据与状态控制<br>5、用户体验、性能、游戏性同等重要</p>
<p>最后再附上完整版：（完整版仍为百度地图开发，体验相差不大）<br><span class="img-wrap"><img data-src="/img/remote/1460000010687878" src="https://static.alili.tech/img/remote/1460000010687878" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>have a fun！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PokemonGo：LBS游戏开发

## 原文链接
[https://segmentfault.com/a/1190000010671755](https://segmentfault.com/a/1190000010671755)

