---
title: 'IoT实时数据可视化方案（进阶版）：Worldmap Panel使用详解及使用Node-RED进行流程管理' 
date: 2018-12-19 2:30:07
hidden: true
slug: hzdsvn98oar
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Chap.1 万万没想到，我这一世英名葬送在了地图坑里</h2>
<p>继上次搭建完框架得到了个粗糙的demo以后，基本的图形组件试了个遍没什么阻力。我天真地以为我离真理的距离简直就只有一步之遥了。 &nbsp;<br>想着我还有些模拟的地理数据没有做可视化，数据信息的内容放在名为location的属性之下，具体格式如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;location&quot;: {
   &quot;lat&quot;:12.345,
   &quot;lon&quot;:56.789
  },
  &quot;temperature&quot;: 49.966,
  &quot;more-props&quot;: &quot;value&quot;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"location"</span>: {
   <span class="hljs-attr">"lat"</span>:<span class="hljs-number">12.345</span>,
   <span class="hljs-attr">"lon"</span>:<span class="hljs-number">56.789</span>
  },
  <span class="hljs-attr">"temperature"</span>: <span class="hljs-number">49.966</span>,
  <span class="hljs-attr">"more-props"</span>: <span class="hljs-string">"value"</span>
 }</code></pre>
<p>一个很自然而然想法萌生了---用地图来展示相关信息。但！万万那没想到，一进地图的坑，卡了10天都没出坑。（部分原因是圣诞节让我懒惰[写不出来就让圣诞节背锅哈哈哈哈]，没有做功课)。  <br>关于基于地图的信息可视化，Power BI上的Map工具给我留下了用户友好简单易用的好印象。只要使用直接的经纬度数据对就能在地图上对位置定位并展示。逻辑惯性让我想当然了，天真地以为所有的地图插件都一样”单纯”。  <br>首先，在Grafana的标准可视化工具中是不包括地图相关的工具的， 但在插件库中官方发布了一款名为Worldmap Panel基于地图可视化的工具，符合我的需求看起来效果也不错。</p>
<p>在简单地下载安装了这个插件后，我发现事情并没有想象简单。该工具和我的可视化框架最大的冲突是:  <br><strong>Worldmap Panel并不支持通过经纬度数据对 e.g. (latitude, longtitude)在地图上定位与可视化， 其支持的数据格式有且仅有两种：Country/State Code或geohash</strong>。&nbsp;</p>
<p>以下从官方文档中摘出的这句话很好地的解释了这两种数据类型。 &nbsp;</p>
<blockquote>There are currently two ways to connect data with points on a map. Either by matching a tag or series name to a <strong>country code/state code</strong> (e.g. SE for Sweden, TX for Texas) or by using <strong>geohashes</strong> to map against geographic coordinates。 &nbsp;</blockquote>
<h4>Tips:睁大双眼，认真审题（这屎一样的文档）</h4>
<p>Grafana和InfluxDB的文档大概是我有生以来看到过写的最逻辑混乱的文档之一了，吐槽请见<a href="https://segmentfault.com/a/1190000012514865">上篇博客</a>。<br>在这新年之际，我要邀请大家继续欣赏出自Grafana官方WorldMap Panel的<a href="https://github.com/grafana/worldmap-panel" rel="nofollow noreferrer" target="_blank">documentation</a>。 说实话我一口气看了三遍后竟然比看第一遍时还要混乱。文档以table data, time series data和json为data source的介绍相关配置实在是非常地不明智之举。以我的构架为例：首先，使用influxdb得到的数据照理说应该是time series data吧？毕竟人家influxdb号称time-series数据库，以写入数据库时的时间戳作为表格的唯一索引。 然而最后使用的配置方法竟然归档在table data下(influxdb: 我不要面子的哦)； &nbsp;<br>其次"time-series data"这个称谓也许还能够直观地理解是以时间戳为索引的数据（更有甚者我这样的理解其实是错误的），那么“table data”该如何去理解呢？"time-series data"难道不是以表格的形式组织排列储存的吗？至于“json”就更为模糊了，是以json为格式的数据？还是通过json的形式传递的数据？ 那么json这种格式的数据就不能同时是"time-series data"或"table data"吗？这三种类型的数据不具备互斥性，由此可见这种分类方法是不科学的。 <br>我个人主观认为正确的分类方法正如文档开头所说，我在本文的第一章节也引用了这句话:</p>
<blockquote>There are currently two ways to connect data with points on a map. Either by matching a tag or series name to a <strong>country code/state code</strong> (e.g. SE for Sweden, TX for Texas) or by using <strong>geohashes</strong> to map against geographic coordinates. &nbsp; <br>注解：<br>对于code： 可以使用grafana预先定义的code， 也可以自定义一些code并用json/jsonp方式导入;   <br>对于geohash: 主要是为了支持elasticsearch， 但是对于influxdb， 可以人工添加geohash的tag，并将数据看作是表格读取geohash tag中的内容；</blockquote>
<p><strong>“以country code和geohash为区分，详述在不同数据库下针对这两种数据源的配置方法”</strong>---如果用这样的方法组织文档，一目了然，结构清晰；读者按图索骥，效率大大提高，至少好过现在的文档。而全文档如此重要的一句话，竟然放在一个毫不起眼的角落。恕我实在无法理解撰写者的意图。</p>
<h2 id="articleHeader1">Chap.2 各种绞尽脑汁花式变换关键词问google+欲罢不能看文档之后的结果</h2>
<p>为了解决这个如鲠在喉的数据匹配问题，几种可能的解决方法一番折腾后初现原形：  <br><del>1. 在原始数据中人工硬是添加个country code field或geohash field；</del>  <br>最容易想到的方法。简单粗暴快捷！但是考虑到这样的方法并不能适配所有的IoT设备，且大部分的GPS产生的数据还是经纬度。排除排除!   </p>
<p><del>2. 在Telegraf中添加能够对经纬度数据对做处理并产生geohash的plug-in；</del>    <br>可惜我并没有找到这样可以直接使用的plug-in。转念想到可以自己开发plug-in,但是对我而言时间，学习成本太。高。（Golang小白,geohash算法不了解）。两个字：排除！   &nbsp;<br>P.S:有兴趣的朋友可以看看telegraf的文档，他们是欢迎各种形式的plugin PR的。暗中观察，这样的plug-in应该要归在processor plug-in一类中。而目前官方只在这类中给了个printer。基本等于没什么卵用，就是在cmd里打印下数据流。亟待小伙伴填坑！  <br>ref:<a href="https://github.com/influxdata/telegraf/blob/master/docs/AGGREGATORS_AND_PROCESSORS.md" rel="nofollow noreferrer" target="_blank">https://github.com/influxdata...</a>  </p>
<p><del>3. 使用Kapacitor对流出数据库的数据分析处理，后而送至可视化终端；</del>  <br>Kapacitor是influxdata四个开源核心产品之一（TICK stack, K--Kapacitor)，可以对数据进行相应的分析处理，比如使用机器学习模型处理分析数据。具体其他功能不是特别清楚没做仔细调研，有兴趣的同学移架<a href="https://github.com/influxdata/kapacitor" rel="nofollow noreferrer" target="_blank">这里</a>。  <br>至于排除的原因和2类似，没有可用的脚本，开发成本太高。  </p>
<p><del>4. 使用<a href="https://github.com/node-influx/node-influx" rel="nofollow noreferrer" target="_blank">node-influx</a>和<a href="https://github.com/sunng87/node-geohash" rel="nofollow noreferrer" target="_blank">node-geohash</a>等开源插件, 后端语言（如node.js)处理,向数据库直接添加geohash tag并写入值；</del>  <br>看起来似乎是个物美价廉的正经解决方法。不过由于本文讨论的是实时IoT数据的可视化，可能每分钟就会向数据库内写入大量的数据，如果在数据存储后再对数据进行操作，则要频繁地调用数据库I/O进行读写操作,将已经存入的数据记录逐条处理并写回，增加了数据库负担。因此排除。  <br>ref: <a href="https://community.influxdata.com/t/mapping-influx-data-to-maps/341/2" rel="nofollow noreferrer" target="_blank">https://community.influxdata....</a>  </p>
<p><strong>5.  使用Node-Red对数据流向管理，在数据存入数据库之前利用已有的集成块调用接口计算geohash以减轻对数据库的负担。</strong>  <br><a href="https://nodered.org/" rel="nofollow noreferrer" target="_blank">Node-RED</a>为一个开源的IoT设备数据流编辑器，主要用于可视化IoT数据的流向并且对数据流向进行管理和连接。 它依赖于活跃的node.js社区，拥有大量可用资源和强大的社区支持。 既能有效地将数据从源头历经的各个技术栈以流程图的形式表达出来，又能对数据流进行简单管理，支持javascript对数据流的处理，因此对前端工程师十分友好。</p>
<p>而吸引我使用Red-Node很重要的一个原因是:Node-RED中有一个名为<a href="https://flows.nodered.org/node/node-red-node-geohash" rel="nofollow noreferrer" target="_blank">node-red-node-geohash</a>的结点模块，在Node-RED项目中使用npm简单安装后，即可将数据中的经纬度数据对直接编码成geohash码，反之亦然。这样就避免了我投入大量时间成本和开发成本在geohash到经纬度的转码上；</p>
<p>其次，Node-RED对数据流向进行管理和编辑处理的强大功能，允许在流向中插入自定义的javascript功能代码；这让数据流向设计的灵活度大大提高了，因此也能充分利用这种灵活度将我的数据在存入数据库之前将关于经纬度的数据转译成geohash，这样一来就避免了方法4中对数据库资源的浪费和复写；  <br>最后，Node-RED的可视化编辑界面能有效将数据流向以一种简单直接的方式表达出来，是选择使用该工具的加分点。<strong>权衡性价比之后，决定采取最后一种方案。</strong> &nbsp;</p>
<h2 id="articleHeader2">Chap.3 解决方案详细步骤</h2>
<h6>注：整个方案详细步骤参考了该博客内容（<a href="https://primalcortex.wordpress.com/2017/04/06/using-node-red-worldmap/" rel="nofollow noreferrer" target="_blank">https://primalcortex.wordpres...</a>）</h6>
<h3 id="articleHeader3">1. 配置Node-RED</h3>
<p>tips: 使用Node-RED的前提条件是保证<strong>node.js</strong>已安装;</p>
<ul><li>已安装过node.js的盆友们可以跳过这一趴！</li></ul>
<p>如果是和我一样使用windows系统的小伙伴们， 推荐一个插件叫做chocolately, 从此Windows也拥有了软件包管理工具，命令行安装package不是梦！<br>打开 windows cmd使用chocolately安装node.js： <code>choco install nodejs-lts</code></p>
<ul><li>安装Node-RED： &nbsp;</li></ul>
<p><code>C:\WINDOWS\system32&gt;npm install -g --unsafe-perm node-red</code></p>
<ul><li>安装至关重要的geohash node：</li></ul>
<p><code>用户app路径\npm\node_modules\node-red&gt;npm install node-red-node-geohash</code></p>
<ul><li>运行Node-RED：</li></ul>
<p><code>用户app路径\npm\node_modules\node-red&gt;node-red</code></p>
<ul><li>cmd提示成功信息</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012674768?w=1012&amp;h=300" src="https://static.alili.tech/img/remote/1460000012674768?w=1012&amp;h=300" alt="red-node-success" title="red-node-success" style="cursor: pointer;"></span></p>
<ul><li>用浏览器打开途中高亮地址，进入node-red的用户界面---新世界大门打开，噔噔！</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012674769?w=1578&amp;h=768" src="https://static.alili.tech/img/remote/1460000012674769?w=1578&amp;h=768" alt="UIlayout" title="UIlayout" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">2. 在Node-RED上创建data flow</h3>
<p>Node-RED的数据流向编辑器采用模块拖拽的形式，用户很容易理解和使用，因此上手不难，学习曲线平缓。 &nbsp;<br>根据我的案例情况，在Node-RED上搭建的数据流向如下<br><span class="img-wrap"><img data-src="/img/remote/1460000012674770?w=919&amp;h=506" src="https://static.alili.tech/img/remote/1460000012674770?w=919&amp;h=506" alt="myflow" title="myflow" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012674771?w=453&amp;h=366" src="https://static.alili.tech/img/remote/1460000012674771?w=453&amp;h=366" alt="mqtt-in" title="mqtt-in" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012674772?w=461&amp;h=390" src="https://static.alili.tech/img/remote/1460000012674772?w=461&amp;h=390" alt="mqtt-out" title="mqtt-out" style="cursor: pointer; display: inline;"></span></p>
<p>从我机器上的MQTT broker上订阅从我的模拟器中发出的特定话题的数据后，利用geohash结点模块处理经纬度数据，生成geohash，然后再一次利用MQTT broker发布一个新的话题，用于传递经过处理的数据， 这时只要数据库订阅这个新话题，就能利用telegraf顺利地将数据存入数据库中。<br>在这个流向中除了必备的mqtt和geohash节点，我还利用了两个function节点来自定义代码。它们分别用于处理流入geohash结点之前的数据，和geohash结点之后的数据。<br>根据官方文档中的描述，geohash节点将会直接读取msg.payload中的lat和lon属性，如果规定了精确度即msg.payload.precision存在，那么会一并处理生成唯一的geohash码。具体描述如下：</p>
<blockquote>A function that encodes lat,lon to and from a geohash.<br>If the msg.payload is an object with properties lat or latitude and lon or longitude - it will add a geohash property to the payload.<br>The precision can be set by msg.payload.precision from 1 to 9.<br>Note: If the msg contains a .location property it will operate on that in preference to the .payload.</blockquote>
<p>在第一章中，我提到过，我的地理数据是被包裹在location属性中的，即msg.payload.location。因此geohash无法直接得到经纬度信息。这时就借助了location-preprocessor的功能节点将location中的信息提取出来。注意在引用的文档叙述中的最后一句， 如果msg中包含了location属性，会直接处理location属性中的lat,lon属性，忽略payload中的信息。 借助这一点，我们则可以将msg.payload.location中的信息直接放入msg.location让其计算geohash。<br>location-preprocessor的代码: &nbsp; &nbsp;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//The main purpose of this snippet is to extract the location info from msg.payload and then put it to msg.location to get the calculated geohash. 
var message=JSON.parse(msg.payload);
if(message[0].location!==null)
{
  msg.location={
      &quot;lat&quot;:message[0].location.lat.toString(), 
      &quot;lon&quot;:message[0].location.lon.toString(),
      &quot;precision&quot;:&quot;8&quot;
  };
//msg.location=message;
}
return msg;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//The main purpose of this snippet is to extract the location info from msg.payload and then put it to msg.location to get the calculated geohash. </span>
<span class="hljs-keyword">var</span> message=<span class="hljs-built_in">JSON</span>.parse(msg.payload);
<span class="hljs-keyword">if</span>(message[<span class="hljs-number">0</span>].location!==<span class="hljs-literal">null</span>)
{
  msg.location={
      <span class="hljs-string">"lat"</span>:message[<span class="hljs-number">0</span>].location.lat.toString(), 
      <span class="hljs-string">"lon"</span>:message[<span class="hljs-number">0</span>].location.lon.toString(),
      <span class="hljs-string">"precision"</span>:<span class="hljs-string">"8"</span>
  };
<span class="hljs-comment">//msg.location=message;</span>
}
<span class="hljs-keyword">return</span> msg;</code></pre>
<p>当得到有效的geohash码后，此时，只需将msg.location.geohash的值复制进入msg.payload中，此时数据中就拥有了geohash码了。接着只需新建一个mqtt话题，将处理的数据通过mqtt broker发布出去，则Node-RED的配置到这里就结束了。<br>location-afterprocessor的代码: &nbsp;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//The main purpose for this snippet is to put the geohash property into msg.payload which is then transferred by mqtt-broker via certain topic
if(msg.location.geohash!==null)
{
   var message=JSON.parse(msg.payload);
   message[0].geohash=msg.location.geohash;
   msg.payload=JSON.stringify(message);
   msg.topic=&quot;sensors/wrap_geohash&quot;;
}
return msg;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//The main purpose for this snippet is to put the geohash property into msg.payload which is then transferred by mqtt-broker via certain topic</span>
<span class="hljs-keyword">if</span>(msg.location.geohash!==<span class="hljs-literal">null</span>)
{
   <span class="hljs-keyword">var</span> message=<span class="hljs-built_in">JSON</span>.parse(msg.payload);
   message[<span class="hljs-number">0</span>].geohash=msg.location.geohash;
   msg.payload=<span class="hljs-built_in">JSON</span>.stringify(message);
   msg.topic=<span class="hljs-string">"sensors/wrap_geohash"</span>;
}
<span class="hljs-keyword">return</span> msg;</code></pre>
<h3 id="articleHeader5">3. 检查数据库内的数据格式是否正确</h3>
<p><strong>[注意]在使用telegraf接受数据之前，要将geohash一项设置为tag才能被Worldpanel识别和使用。同时如果使用了mqtt的新话题，要记得在配置文件中修改相关项</strong><br>到这里，运行telegraf和influxdb，数据应该安然无恙地被telegraf简单处理后存入数据库。这时对数据库进行简单的操作检查数据是否如自己预期地被写入了指定数据库。 &nbsp;<br><span class="img-wrap"><img data-src="/img/remote/1460000012674773?w=1600&amp;h=435" src="https://static.alili.tech/img/remote/1460000012674773?w=1600&amp;h=435" alt="correct-dbformat" title="correct-dbformat" style="cursor: pointer; display: inline;"></span><br>既然到这里已经保证数据库里有了可用的数据，那么接下来开始设置Worldmap Panel工具吧！  <br>欣喜伴随着绝望。又要开始研究文档T.T。 &nbsp;<br>瞅来瞅去，文章里关于配置最重要的一段话就是这里了：</p>
<blockquote>
<p>An example of Table Data would using InfluxDB and then formatting the data returned from the metric query as Table.<br>Similar to the Elasticsearch query above, 3 fields are expected (2 of them are mandatory)</p>
<ul>
<li>field named metric</li>
<li>geohash tag named geohash</li>
<li>an optional location name (shown in the mouse over). This location name has to be specified in the Worldmap settings tab too.</li>
</ul>
</blockquote>
<p>我给大家用直白的话翻译一下这段话的意思： 老子Worldmap Panel只认两个兄弟，一个叫做metric，还有一个就是geohash！location name的这个人可以考虑，但是可有可无。其他的都滚一边去！  <br>geohash就是个打手，Worldmap Panel说让它去哪儿它就得去哪儿，该在那个地理位置就给定在哪里；  <br>metric是个师爷，在geohash的定位基础上，每个点要显示的值都靠metric去提供。但是师爷这种人聪明绝顶，行走江湖容易遭人暗算，所以metric是个化名，真正名字叫什么，主要看数据库给什么值了。总之在Worldmap上他就叫metric。  <br>这样一来我们就可以设置数据集按照geohash来定位，而在每个geohash的点上需要显示的值则由metric确定。比如从我的需求出发，需要显示我的每台设备在地图上的定位并能让用户看到每台机器的当前运行的温度情况，那么我就应该这样来设置我的query。  <br><span class="img-wrap"><img data-src="/img/remote/1460000012674774?w=873&amp;h=395" src="https://static.alili.tech/img/remote/1460000012674774?w=873&amp;h=395" alt="query settings" title="query settings" style="cursor: pointer; display: inline;"></span><br>同时，在worldmap一栏对map data options进行设置：<br><span class="img-wrap"><img data-src="/img/remote/1460000012674775?w=1504&amp;h=381" src="https://static.alili.tech/img/remote/1460000012674775?w=1504&amp;h=381" alt="map data options" title="map data options" style="cursor: pointer; display: inline;"></span><br>location data一定要选择table,且一般table field name设置为geohash；</p>
<h3 id="articleHeader6">5. Demo</h3>
<p>到这里应该可以看到美腻的demo了！Worldmap panel到这里终于可用了！<br><span class="img-wrap"><img data-src="/img/remote/1460000012655671?w=1600&amp;h=730" src="https://static.alili.tech/img/remote/1460000012655671?w=1600&amp;h=730" alt="demo1" title="demo1" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012674776?w=1589&amp;h=742" src="https://static.alili.tech/img/remote/1460000012674776?w=1589&amp;h=742" alt="demo2" title="demo2" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012674777?w=1587&amp;h=636" src="https://static.alili.tech/img/remote/1460000012674777?w=1587&amp;h=636" alt="demo3" title="demo3" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">Chap.4 聆听来自我内心的新年总结</h2>
<p>脸上笑嘻嘻，心里真是mmp啊！朋友们填坑不易，且填且珍惜哦！  <br>也不知道自己还能坚持填坑多久，前路漫漫啊前路漫漫！  <br>最后是不是要祝盆友们元旦快乐呢？虽然我知道看到最后的基本都是真爱，而真爱的概率和在这个现实世界一样基本为0。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
IoT实时数据可视化方案（进阶版）：Worldmap Panel使用详解及使用Node-RED进行流程管理

## 原文链接
[https://segmentfault.com/a/1190000012674763](https://segmentfault.com/a/1190000012674763)

