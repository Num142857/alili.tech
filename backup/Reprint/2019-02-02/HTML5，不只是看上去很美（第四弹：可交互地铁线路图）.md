---
title: 'HTML5，不只是看上去很美（第四弹：可交互地铁线路图）' 
date: 2019-02-02 2:30:10
hidden: true
slug: aw28vi5cfx9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>最近特别忙，承蒙大伙关照，3D机房的项目一个接着一个，领了一帮小弟，搞搞传帮带，乌飞兔走，转眼已经菊黄蟹肥……有个小弟很不错，勤奋好学，很快就把API都摸透了，国庆几天自己折腾着做了个HTML5的魔都的地铁线路图，能拖能拽的，还和电子地图做了交互。哥决定把小弟的成果纳入“<a href="https://segmentfault.com/a/1190000002775741">HTML5，不只是看上去很美</a>”系列，以示鼓励（P.S. 其实还挺有压力的，后浪推前浪，新人赶旧人。我们这些老鸟也得注意，免得让00后给抢了饭碗）</p>
<h1 id="articleHeader1">效果图对比</h1>
<p>网上的地铁图还是很多的，小弟选了这张比较新的做参考。想当年哥来魔都打拼时，图上可就一红一绿打个叉……暴露年龄的话不多说，看图：<br><span class="img-wrap"><img data-src="/img/bVEjf3?w=533&amp;h=480" src="https://static.alili.tech/img/bVEjf3?w=533&amp;h=480" alt="上海地铁线路图" title="上海地铁线路图" style="cursor: pointer; display: inline;"></span></p>
<p>再来看看小弟做的：<br><span class="img-wrap"><img data-src="/img/bVEjgi?w=533&amp;h=480" src="https://static.alili.tech/img/bVEjgi?w=533&amp;h=480" alt="HTML5地铁线路图" title="HTML5地铁线路图" style="cursor: pointer; display: inline;"></span></p>
<p>我是一眼看不出区别，但这可不是一张效果图，而是一个新手仅用了几天做出来的东西，而且里面许多美化和调整是通过程序自动完成的，这就不容易了。更重要的是，它并不是一张死图，而是纯矢量、可交互、有动态效果、无失真缩放的拓扑图！我们先简单看一下交互效果，后面可以详细说说代码的实现。</p>
<h2 id="articleHeader2">文本提示弹弹弹</h2>
<p>首先，把鼠标移到站点、路段、图标等位置，都会有文本提示弹出，这个比较基本，百度家的就有，小弟也就放了比较简单的弹出内容。如果加上基本介绍啊、相关提示啊、周边信息啊……要是加上广告，就可以赚钱了……反正什么都可以加嘛，就是一个setToolTip命令而已。</p>
<p><span class="img-wrap"><img data-src="/img/bVEjhL?w=248&amp;h=152" src="https://static.alili.tech/img/bVEjhL?w=248&amp;h=152" alt="地铁图之文本提示.gif" title="地铁图之文本提示.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">站点图标变变变</h2>
<p>当鼠标移到站点上时，站点图标做了放大效果，这个效果很贴心，看了下百度家，用的是发光效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVEji1?w=187&amp;h=135" src="https://static.alili.tech/img/bVEji1?w=187&amp;h=135" alt="地铁图之动态站点.gif" title="地铁图之动态站点.gif" style="cursor: pointer;"></span></p>
<p>实现的方法也很简便，就是在注册站点矢量图形时，加入了动态判断。以下注册普通站点矢量图形的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="twaver.Util.registerImage('station',{
    w: linkWidth*1.6,
    h: linkWidth*1.6,
    v: function (data, view) {
        var result = [];
        if(data.getClient('focus')){
            result.push({
                shape: 'circle',
                r: linkWidth*0.7,
                lineColor:  data.getClient('lineColor'),
                lineWidth: linkWidth*0.2,
                fill: 'white',
            });
            result.push({
                shape: 'circle',
                r: linkWidth*0.2,
                fill:  data.getClient('lineColor'),
            });
        }else{
            result.push({
                shape: 'circle',
                r: linkWidth*0.6,
                lineColor: data.getClient('lineColor'),
                lineWidth: linkWidth*0.2,
                fill: 'white',
            });
        }
        return result;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">twaver.Util.registerImage(<span class="hljs-string">'station'</span>,{
    <span class="hljs-attr">w</span>: linkWidth*<span class="hljs-number">1.6</span>,
    <span class="hljs-attr">h</span>: linkWidth*<span class="hljs-number">1.6</span>,
    <span class="hljs-attr">v</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data, view</span>) </span>{
        <span class="hljs-keyword">var</span> result = [];
        <span class="hljs-keyword">if</span>(data.getClient(<span class="hljs-string">'focus'</span>)){
            result.push({
                <span class="hljs-attr">shape</span>: <span class="hljs-string">'circle'</span>,
                <span class="hljs-attr">r</span>: linkWidth*<span class="hljs-number">0.7</span>,
                <span class="hljs-attr">lineColor</span>:  data.getClient(<span class="hljs-string">'lineColor'</span>),
                <span class="hljs-attr">lineWidth</span>: linkWidth*<span class="hljs-number">0.2</span>,
                <span class="hljs-attr">fill</span>: <span class="hljs-string">'white'</span>,
            });
            result.push({
                <span class="hljs-attr">shape</span>: <span class="hljs-string">'circle'</span>,
                <span class="hljs-attr">r</span>: linkWidth*<span class="hljs-number">0.2</span>,
                <span class="hljs-attr">fill</span>:  data.getClient(<span class="hljs-string">'lineColor'</span>),
            });
        }<span class="hljs-keyword">else</span>{
            result.push({
                <span class="hljs-attr">shape</span>: <span class="hljs-string">'circle'</span>,
                <span class="hljs-attr">r</span>: linkWidth*<span class="hljs-number">0.6</span>,
                <span class="hljs-attr">lineColor</span>: data.getClient(<span class="hljs-string">'lineColor'</span>),
                <span class="hljs-attr">lineWidth</span>: linkWidth*<span class="hljs-number">0.2</span>,
                <span class="hljs-attr">fill</span>: <span class="hljs-string">'white'</span>,
            });
        }
        <span class="hljs-keyword">return</span> result;
    }
});</code></pre>
<h2 id="articleHeader4">动画效果拽拽拽</h2>
<p>从上图还可以看到，在换乘站图标中，除了增加了颜色，还实现了旋转效果。这个就秒杀百度家了。<br>来看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    twaver.Util.registerImage('rotateArrow', {
2.        w: 124,
3.        h: 124,
4.        v: [{
5.            shape: 'vector',
6.            name: 'doubleArrow',
7.            rotate: 360,
8.            animate: [{
9.                attr: 'rotate',
10.                to: 0,
11.                dur: 2000,
12.                reverse: false,
13.                repeat: Number.POSITIVE_INFINITY
14.            }]
15.        }]
16.    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-number">1.</span>    twaver.Util.registerImage(<span class="hljs-string">'rotateArrow'</span>, {
<span class="hljs-number">2.</span>        <span class="hljs-string">w:</span> <span class="hljs-number">124</span>,
<span class="hljs-number">3.</span>        <span class="hljs-string">h:</span> <span class="hljs-number">124</span>,
<span class="hljs-number">4.</span>        <span class="hljs-string">v:</span> [{
<span class="hljs-number">5.</span>            <span class="hljs-string">shape:</span> <span class="hljs-string">'vector'</span>,
<span class="hljs-number">6.</span>            <span class="hljs-string">name:</span> <span class="hljs-string">'doubleArrow'</span>,
<span class="hljs-number">7.</span>            <span class="hljs-string">rotate:</span> <span class="hljs-number">360</span>,
<span class="hljs-number">8.</span>            <span class="hljs-string">animate:</span> [{
<span class="hljs-number">9.</span>                <span class="hljs-string">attr:</span> <span class="hljs-string">'rotate'</span>,
<span class="hljs-number">10.</span>                <span class="hljs-string">to:</span> <span class="hljs-number">0</span>,
<span class="hljs-number">11.</span>                <span class="hljs-string">dur:</span> <span class="hljs-number">2000</span>,
<span class="hljs-number">12.</span>                <span class="hljs-string">reverse:</span> <span class="hljs-literal">false</span>,
<span class="hljs-number">13.</span>                <span class="hljs-string">repeat:</span> Number.POSITIVE_INFINITY
<span class="hljs-number">14.</span>            }]
<span class="hljs-number">15.</span>        }]
<span class="hljs-number">16.</span>    });</code></pre>
<p>当然这对于TWaver来说也很容易，只不过对rotate属性进行了动态改变而已。</p>
<p>另外，在单击和双击站点时，还实现了selected和loading的动画效果，值得点赞！<br><span class="img-wrap"><img data-src="/img/bVEjk9?w=256&amp;h=148" src="https://static.alili.tech/img/bVEjk9?w=256&amp;h=148" alt="地铁图单击.gif" title="地铁图单击.gif" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVEjla?w=256&amp;h=148" src="https://static.alili.tech/img/bVEjla?w=256&amp;h=148" alt="地铁图之缓冲.gif" title="地铁图之缓冲.gif" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">混合缩放炫炫炫</h2>
<p>无失真缩放是矢量图的先天优势，小弟也掌握得炉火纯青，把TWaver的混合缩放模式用到极致，还有缩放比例控制、文字自动隐藏等小功能，方便订制。</p>
<p><span class="img-wrap"><img data-src="/img/bVEju0?w=413&amp;h=255" src="https://static.alili.tech/img/bVEju0?w=413&amp;h=255" alt="地铁图缩放.gif" title="地铁图缩放.gif" style="cursor: pointer; display: inline;"></span></p>
<p>代码也不复杂：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    network.setZoomManager(new twaver.vector.MixedZoomManager(network));
2.    network.setMinZoom(0.2);
3.    network.setMaxZoom(3);
4.    network.setZoomVisibilityThresholds({
5.        label : 0.6,
6.    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1.    </span>network.setZoomManager(new twaver.vector.MixedZoomManager(network));
<span class="hljs-bullet">2.    </span>network.setMinZoom(0.2);
<span class="hljs-bullet">3.    </span>network.setMaxZoom(3);
<span class="hljs-bullet">4.    </span>network.setZoomVisibilityThresholds({
<span class="hljs-bullet">5.        </span>label : 0.6,
<span class="hljs-bullet">6.    </span>});
</code></pre>
<h2 id="articleHeader6">交互功能用起来</h2>
<p>小弟很自豪地给我介绍这个功能：图标可以自由拖动，松开后会自动弹回。哥问小弟这有什么用，他一本正经地说：证明图是活的！</p>
<p><span class="img-wrap"><img data-src="/img/bVEjoB?w=256&amp;h=148" src="https://static.alili.tech/img/bVEjoB?w=256&amp;h=148" alt="地铁图拖拽回弹.gif" title="地铁图拖拽回弹.gif" style="cursor: pointer;"></span></p>
<p>好吧你赢了，虽然是个没什么卵用的功能，但闲的蛋疼的时候可以随便玩上几十分钟我也是信的。</p>
<h2 id="articleHeader7">连续单击同一站点</h2>
<p>连续单击同一站点（注意不是双击），可以将经过此站点的所有线路突出显示出来。小弟说加入这个功能纯粹因为简单易做，我……竟然表示非常理解，谁年轻时没耍过这类轻松又讨好的小招数呢？</p>
<p><span class="img-wrap"><img data-src="/img/bVEjtZ?w=486&amp;h=325" src="https://static.alili.tech/img/bVEjtZ?w=486&amp;h=325" alt="地铁图经过线路.gif" title="地铁图经过线路.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">双击站点</h2>
<p>双击站点，竟然弹出了本站周边的电子地图！知道引入他山之玉，看来小子可教啊。我发现他的定位方法，有的是用经纬度，有的是关键词查询。小弟狡黠地说，开始是人工查每个站点经纬度的，干了一段儿发现太麻烦，后来改路子了。马大大说的，懒人改变世界，我服!</p>
<p><span class="img-wrap"><img data-src="/img/bVEjuo?w=447&amp;h=336" src="https://static.alili.tech/img/bVEjuo?w=447&amp;h=336" alt="地铁图电子地图.gif" title="地铁图电子地图.gif" style="cursor: pointer;"></span></p>
<p>最后来八一八程序设计的思路吧，小弟是棵好苗子，能做出那么像样的程序，必然是深思熟虑过的。不想再听我啰嗦的朋友，也可以直接发邮件给我，<a>tw-service@servasoft.com</a>，来鉴赏下小弟的成果。</p>
<h2 id="articleHeader9">数据文件的整理</h2>
<p>数据格式，选择了JavaScript原生支持的json文件，直观方便。<br>数据结构，按照站点、线路、杂项三大块来组织，结构清晰，利于遍历、查询等操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    {
2.        &quot;stations&quot;:{
3.            &quot;l01s01&quot;:{ },
4.            …………
5.        }
6.        &quot;lines&quot;:{
7.            &quot;l01&quot;:{……},
8.            …………
9.        }
10.        &quot;sundrys&quot;:{
11.            &quot;railwaystationshanghai&quot;:{……},
12.            …………
13.        }
14.    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1.    </span>{
<span class="hljs-bullet">2.        </span>"stations":{
<span class="hljs-bullet">3.            </span>"l01s01":{ },
<span class="hljs-bullet">4.            </span>…………
<span class="hljs-bullet">5.        </span>}
<span class="hljs-bullet">6.        </span>"lines":{
<span class="hljs-bullet">7.            </span>"l01":{……},
<span class="hljs-bullet">8.            </span>…………
<span class="hljs-bullet">9.        </span>}
<span class="hljs-bullet">10.        </span>"sundrys":{
<span class="hljs-bullet">11.            </span>"railwaystationshanghai":{……},
<span class="hljs-bullet">12.            </span>…………
<span class="hljs-bullet">13.        </span>}
<span class="hljs-bullet">14.    </span>}</code></pre>
<p>命名比较规范，通过名字就可以看出基本信息（例如“l01s01”就是1号线第1个站点），甚至直接利用名字就可以进行查询和遍历。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    &quot;l01s01&quot;:{
2.        &quot;id&quot;:&quot;l01s01&quot;,
3.        &quot;name&quot;:&quot;莘庄&quot;,
4.        &quot;loc&quot;:{&quot;x&quot;:419,&quot;y&quot;:1330},
5.        &quot;label&quot;:&quot;bottomright.bottomright&quot;,
6.    },
7.    …………" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-number">1</span>.    <span class="hljs-string">"l01s01"</span>:{
<span class="hljs-number">2</span>.        <span class="hljs-string">"id"</span>:<span class="hljs-string">"l01s01"</span>,
<span class="hljs-number">3</span>.        <span class="hljs-string">"name"</span>:<span class="hljs-string">"莘庄"</span>,
<span class="hljs-number">4</span>.        <span class="hljs-string">"loc"</span>:{<span class="hljs-string">"x"</span>:<span class="hljs-number">419</span>,<span class="hljs-string">"y"</span>:<span class="hljs-number">1330</span>},
<span class="hljs-number">5</span>.        <span class="hljs-string">"label"</span>:<span class="hljs-string">"bottomright.bottomright"</span>,
<span class="hljs-number">6</span>.    },
<span class="hljs-number">7</span>.    …………</code></pre>
<h2 id="articleHeader10">站点路线的创建</h2>
<p>首先是读取json文件的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    function loadJSON(path,callback){
2.        var xhr = new XMLHttpRequest();
3.        xhr.onreadystatechange = function(){
4.            if (xhr.readyState === 4) {
5.                if (xhr.status === 200) {
6.                   dataJson = JSON.parse(xhr.responseText);
7.                   callback &amp;&amp; callback();
8.               }
9.           }
10.       };
11.       xhr.open(&quot;GET&quot;, path, true);
12.       xhr.send();
13.    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>    function loadJSON(path,callback){
<span class="hljs-number">2.</span>        var xhr = new XMLHttpRequest();
<span class="hljs-number">3.</span>        xhr.onreadystatechange = function(){
<span class="hljs-number">4.</span>            if (xhr.readyState === <span class="hljs-number">4</span>) {
<span class="hljs-number">5.</span>                if (xhr.status === <span class="hljs-number">200</span>) {
<span class="hljs-number">6.</span>                   dataJson = JSON.parse(xhr.responseText);
<span class="hljs-number">7.</span>                   callback &amp;&amp; callback();
<span class="hljs-number">8.</span>               }
<span class="hljs-number">9.</span>           }
<span class="hljs-number">10.</span>       };
<span class="hljs-number">11.</span>       xhr.open(<span class="hljs-string">"GET"</span>, path, true);
<span class="hljs-number">12.</span>       xhr.send();
<span class="hljs-number">13.</span>    }</code></pre>
<p>因为读取文件是一个异步的过程，所以要程序的展开都要放在文件读取函数的内部。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    function init(){
2.        loadJSON(&quot;shanghaiMetro.json&quot;, function(){
3.            initNetwork(dataJson);
4.            initNode(dataJson);
5.        });
6.    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-number">1.</span>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span>{
<span class="hljs-number">2.</span>        loadJSON(<span class="hljs-string">"shanghaiMetro.json"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
<span class="hljs-number">3.</span>            initNetwork(dataJson);
<span class="hljs-number">4.</span>            initNode(dataJson);
<span class="hljs-number">5.</span>        });
<span class="hljs-number">6.</span>    }</code></pre>
<p>只要通过对站点进行一次遍历，车站的建立就完成了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    for(staId in json.stations){
2.        var station = json.stations[staId];
3.        staNode = new twaver.Node({
4.            id: staId,
5.            name: station.name,
6.            image:'station',
7.        });
8.        staNode.s('label.color','rgba(99,99,99,1)');
9.        staNode.s('label.font','12px 微软雅黑');
10.        staNode.s('label.position',station.label);
11.        staNode.setClient('location',station.loc);
12.        box.add(staNode);
13.    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1.    </span>for(staId in json.stations){
<span class="hljs-bullet">2.        </span>var station = json.stations[staId];
<span class="hljs-bullet">3.        </span>staNode = new twaver.Node({
<span class="hljs-bullet">4.            </span>id: staId,
<span class="hljs-bullet">5.            </span>name: station.name,
<span class="hljs-bullet">6.            </span>image:'station',
<span class="hljs-bullet">7.        </span>});
<span class="hljs-bullet">8.        </span>staNode.s('label.color','rgba(99,99,99,1)');
<span class="hljs-bullet">9.        </span>staNode.s('label.font','12px 微软雅黑');
<span class="hljs-bullet">10.        </span>staNode.s('label.position',station.label);
<span class="hljs-bullet">11.        </span>staNode.setClient('location',station.loc);
<span class="hljs-bullet">12.        </span>box.add(staNode);
<span class="hljs-bullet">13.    </span>}</code></pre>
<p>再对数据文件中的各条线路下的所有站点进行遍历，在站点间依次创建Link。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.    for(lineId in json.lines) {
2.        ……
3.        for(staSn in line.stations) {
4.            ……
5.            var link = new twaver.Link(linkId,prevSta,staNode);
6.            link.s('link.color', line.color);
7.            link.s('link.width', linkWidth);
8.            link.setToolTip(line.name);
9.            box.add(link);
10.        }
11.    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-number">1.</span>    for(lineId <span class="hljs-keyword">in</span> json.lines) {
<span class="hljs-number">2.</span>        ……
<span class="hljs-number">3.</span>        for(staSn <span class="hljs-keyword">in</span> line.stations) {
<span class="hljs-number">4.</span>            ……
<span class="hljs-number">5.</span>            <span class="hljs-built_in">var</span> <span class="hljs-keyword">link</span> = <span class="hljs-literal">new</span> twaver.<span class="hljs-keyword">Link</span>(linkId,prevSta,staNode);
<span class="hljs-number">6.</span>            <span class="hljs-keyword">link</span>.s(<span class="hljs-string">'link.color'</span>, line.color);
<span class="hljs-number">7.</span>            <span class="hljs-keyword">link</span>.s(<span class="hljs-string">'link.width'</span>, linkWidth);
<span class="hljs-number">8.</span>            <span class="hljs-keyword">link</span>.setToolTip(line.name);
<span class="hljs-number">9.</span>            box.add(<span class="hljs-keyword">link</span>);
<span class="hljs-number">10.</span>        }
<span class="hljs-number">11.</span>    }</code></pre>
<p>再对label位置进行调整，否则站点名称会显示的很乱。小弟是通过在原始数据中手动加入位置信息来实现的，稍显笨了一点，应该可以通过程序自动判断站点周围空间来进行智能调整。</p>
<p>最后再加入图标，一张原始的地铁图就呈现出来了。</p>
<p><span class="img-wrap"><img data-src="/img/bVEjwf?w=640&amp;h=407" src="https://static.alili.tech/img/bVEjwf?w=640&amp;h=407" alt="初始地铁图-640x407.png" title="初始地铁图-640x407.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">路线拐点的添加</h2>
<p>基本的示意功能已经具备了，这里，小弟让我很欣赏的一点是没有就此停止，而是进一步做了调整，使线路只保留了横平竖直和正斜的走向，以达到整齐美观的效果。可能看起来与参考图稍稍有些不同，主要因为各路段基本只添加了一个拐点，这样做既大大简化了程序，又基本保证了图形的美观度。想远一点，做多一点，是块做产品的好料子。</p>
<p><span class="img-wrap"><img data-src="/img/bVEjxb?w=535&amp;h=386" src="https://static.alili.tech/img/bVEjxb?w=535&amp;h=386" alt="智能拐点.png" title="智能拐点.png" style="cursor: pointer; display: inline;"></span></p>
<p>当然为了提高程序的灵活性，应对必须添加两个或以上拐点的情况，也使用了人工拐点的手段。不过这里人工拐点被设成一个隐形的节点，可能利于智能拐点的判断，但也有可能在路线操作时造成混乱。如何处理更好还可以进一步推敲。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createTurnSta = function(line, staSn){
    staTurn = new twaver.Node(staSn);
    staTurn.setImage();
    staTurn.setClient('lineColor',line.color);
    staTurn.setClient('lines',[line.id]);
    var loc = line.stations[staSn];
    staTurn.setClient('location',loc);
    box.add(staTurn);
    return staTurn;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>var createTurnSta = function(<span class="hljs-built_in">line</span>, staSn){
    staTurn = <span class="hljs-keyword">new</span> twaver.Node(staSn);
    staTurn.setImage();
    staTurn.setClient(<span class="hljs-string">'lineColor'</span>,<span class="hljs-built_in">line</span>.<span class="hljs-built_in">color</span>);
    staTurn.setClient(<span class="hljs-string">'lines'</span>,[<span class="hljs-built_in">line</span>.id]);
    var loc = <span class="hljs-built_in">line</span>.stations[staSn];
    staTurn.setClient(<span class="hljs-string">'location'</span>,loc);
    <span class="hljs-built_in">box</span>.<span class="hljs-built_in">add</span>(staTurn);
    <span class="hljs-keyword">return</span> staTurn;
}</code></pre>
<h2 id="articleHeader12">接点位置的调整</h2>
<p>大家可以看到，并不是所有路段都直接连入站点中心，在许多情况下必须要进行偏移。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createFollowSta = function(json, line, staNode, staId){
    staFollow = new twaver.Follower(staId);
    staFollow.setImage();
    staFollow.setClient('lineColor',line.color);
    staFollow.setClient('lines',[line.id]);
    staFollow.setHost(staNode);
    var az = azimuth[staId.substr(6,2)];
    var loc0 = json.stations[staId.substr(0,6)].loc;
    var loc = {x:loc0.x+az.x, y:loc0.y+az.y};
    staFollow.setClient('location',loc);
    box.add(staFollow);
    return staFollow;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> createFollowSta = function(json, <span class="hljs-keyword">line</span>, staNode, staId){
    staFollow = new twaver.Follower(staId);
    staFollow.setImage();
    staFollow.setClient('lineColor',<span class="hljs-keyword">line</span>.color);
    staFollow.setClient('lines',[<span class="hljs-keyword">line</span>.id]);
    staFollow.setHost(staNode);
    <span class="hljs-keyword">var</span> az = azimuth[staId.<span class="hljs-built_in">substr</span>(6,2)];
    <span class="hljs-keyword">var</span> loc0 = json.stations[staId.<span class="hljs-built_in">substr</span>(0,6)].<span class="hljs-keyword">loc</span>;
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">loc</span> = {x:loc0.x+az.x, y:loc0.y+az.y};
    staFollow.setClient('location',<span class="hljs-keyword">loc</span>);
    box.add(staFollow);
    <span class="hljs-keyword">return</span> staFollow;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVEjxx?w=356&amp;h=247" src="https://static.alili.tech/img/bVEjxx?w=356&amp;h=247" alt="并行线路.png" title="并行线路.png" style="cursor: pointer;"></span></p>
<p>小弟采取了虚拟节点的办法，就是在站点的旁边，添加一个Follower（但并不显示出来），让并行的不同线路连接到不同的Follower上。通过调整Follower的位置，来实现线路与站点连接点的控制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var azimuth = {
    bb: {x: 0, y: linkWidth*zoom/2},
    tt: {x: 0, y: -linkWidth*zoom/2},
    rr: {x: linkWidth*zoom/2, y: 0},
    ll: {x: -linkWidth/2, y: 0},
    br: {x: linkWidth*zoom*0.7/2, y: linkWidth*zoom*0.7/2},
    bl: {x: -linkWidth*zoom*0.7/2, y: linkWidth*zoom*0.7/2},
    tr: {x: linkWidth*zoom*0.7/2, y: -linkWidth*zoom*0.7/2},
    tl: {x: -linkWidth*zoom*0.7/2, y: -linkWidth*zoom*0.7/2},
    BB: {x: 0, y: linkWidth*zoom},
    TT: {x: 0, y: -linkWidth*zoom},
    RR: {x: linkWidth*zoom, y: 0},
    LL: {x: -linkWidth, y: 0},
    BR: {x: linkWidth*zoom*0.7, y: linkWidth*zoom*0.7},
    BL: {x: -linkWidth*zoom*0.7, y: linkWidth*zoom*0.7},
    TR: {x: linkWidth*zoom*0.7, y: -linkWidth*zoom*0.7},
    TL: {x: -linkWidth*zoom*0.7, y: -linkWidth*zoom*0.7}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var azimuth = {
<span class="hljs-symbol">    bb:</span> {<span class="hljs-string">x:</span> <span class="hljs-number">0</span>, <span class="hljs-string">y:</span> linkWidth*zoom/<span class="hljs-number">2</span>},
<span class="hljs-symbol">    tt:</span> {<span class="hljs-string">x:</span> <span class="hljs-number">0</span>, <span class="hljs-string">y:</span> -linkWidth*zoom/<span class="hljs-number">2</span>},
<span class="hljs-symbol">    rr:</span> {<span class="hljs-string">x:</span> linkWidth*zoom/<span class="hljs-number">2</span>, <span class="hljs-string">y:</span> <span class="hljs-number">0</span>},
<span class="hljs-symbol">    ll:</span> {<span class="hljs-string">x:</span> -linkWidth/<span class="hljs-number">2</span>, <span class="hljs-string">y:</span> <span class="hljs-number">0</span>},
<span class="hljs-symbol">    br:</span> {<span class="hljs-string">x:</span> linkWidth*zoom*<span class="hljs-number">0.7</span><span class="hljs-regexp">/2, y: linkWidth*zoom*0.7/</span><span class="hljs-number">2</span>},
<span class="hljs-symbol">    bl:</span> {<span class="hljs-string">x:</span> -linkWidth*zoom*<span class="hljs-number">0.7</span><span class="hljs-regexp">/2, y: linkWidth*zoom*0.7/</span><span class="hljs-number">2</span>},
<span class="hljs-symbol">    tr:</span> {<span class="hljs-string">x:</span> linkWidth*zoom*<span class="hljs-number">0.7</span><span class="hljs-regexp">/2, y: -linkWidth*zoom*0.7/</span><span class="hljs-number">2</span>},
<span class="hljs-symbol">    tl:</span> {<span class="hljs-string">x:</span> -linkWidth*zoom*<span class="hljs-number">0.7</span><span class="hljs-regexp">/2, y: -linkWidth*zoom*0.7/</span><span class="hljs-number">2</span>},
<span class="hljs-symbol">    BB:</span> {<span class="hljs-string">x:</span> <span class="hljs-number">0</span>, <span class="hljs-string">y:</span> linkWidth*zoom},
<span class="hljs-symbol">    TT:</span> {<span class="hljs-string">x:</span> <span class="hljs-number">0</span>, <span class="hljs-string">y:</span> -linkWidth*zoom},
<span class="hljs-symbol">    RR:</span> {<span class="hljs-string">x:</span> linkWidth*zoom, <span class="hljs-string">y:</span> <span class="hljs-number">0</span>},
<span class="hljs-symbol">    LL:</span> {<span class="hljs-string">x:</span> -linkWidth, <span class="hljs-string">y:</span> <span class="hljs-number">0</span>},
<span class="hljs-symbol">    BR:</span> {<span class="hljs-string">x:</span> linkWidth*zoom*<span class="hljs-number">0.7</span>, <span class="hljs-string">y:</span> linkWidth*zoom*<span class="hljs-number">0.7</span>},
<span class="hljs-symbol">    BL:</span> {<span class="hljs-string">x:</span> -linkWidth*zoom*<span class="hljs-number">0.7</span>, <span class="hljs-string">y:</span> linkWidth*zoom*<span class="hljs-number">0.7</span>},
<span class="hljs-symbol">    TR:</span> {<span class="hljs-string">x:</span> linkWidth*zoom*<span class="hljs-number">0.7</span>, <span class="hljs-string">y:</span> -linkWidth*zoom*<span class="hljs-number">0.7</span>},
<span class="hljs-symbol">    TL:</span> {<span class="hljs-string">x:</span> -linkWidth*zoom*<span class="hljs-number">0.7</span>, <span class="hljs-string">y:</span> -linkWidth*zoom*<span class="hljs-number">0.7</span>}
};</code></pre>
<p>介绍到这里就结束了，虽然是个小例子，实在是但美观性和实用性都还过得去，小弟花了心思去做，其实稍加改造就可以做出高铁图、公交图、运行图等应用。设想一下，如果能用在轨道交通列控中心大屏监控里，是多么炫酷。说到这，又想起了前两天云栖大会上刚看到的杭州城市数据大脑，不知何时，哥也能参与一把那样的项目呢？可视化，哥的强项……</p>
<p>最后，想要看程序，或者想玩“地铁拖拖乐”的各位，都可以给我留言和发邮件：<a>tw-service@servasoft.com</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5，不只是看上去很美（第四弹：可交互地铁线路图）

## 原文链接
[https://segmentfault.com/a/1190000007186026](https://segmentfault.com/a/1190000007186026)

