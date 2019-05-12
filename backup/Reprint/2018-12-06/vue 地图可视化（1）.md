---
title: 'vue 地图可视化（1）' 
date: 2018-12-06 2:30:09
hidden: true
slug: 0mljifcwjlaf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">百度地图</h2>
<p>百度地图作为项目中地图可视化最重要的一部分，不止其为国人自己的地图，还因为其完善的技术文档案例和多样化的开源插件（echarts、Mapv等）</p>
<p>github上有vue-baidu-map的组件可以直接使用，有兴趣的同学可以直接上手<br><a href="https://github.com/Dafrok/vue-baidu-map.git" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/Dafrok/vue-baidu-map.git" rel="nofollow noreferrer" target="_blank">https://github.com/Dafrok/vue...</a></p>
<p>这里不采用已经封装好的地图组件，而是从零开始，采用原生的百度地图api,一步步组合封装</p>
<ul><li><strong>项目引入地图</strong></li></ul>
<p>网上教程多数为index.html加入百度地图api，然而这种写法并不符合我们的组件化思想，我的思想是先抽取百度地图为单独组件.vue，在需要地图的业务中加载<br><span class="img-wrap"><img data-src="/img/bV7XoF?w=437&amp;h=336" src="https://static.alili.tech/img/bV7XoF?w=437&amp;h=336" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>参考vue-baidu-map动态获取百度地图api<br>baiduMap.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 初始化
    reset () {
      const {getMapScript, initMap} = this
      getMapScript().then(initMap)
    },
    // 获取baidumap
    getMapScript () {
      if (!global.BMap) {
        const ak = this.ak || this._BMap().ak
        global.BMap = {}
        global.BMap._preloader = new Promise((resolve, reject) => {
          global._initBaiduMap = function () {
            resolve(global.BMap)
            global.document.body.removeChild($script)
            global.BMap._preloader = null
            global._initBaiduMap = null
          }
          const $script = document.createElement('script')
          global.document.body.appendChild($script)
          $script.src = `https://api.map.baidu.com/api?v=2.0&amp;ak=${ak}&amp;callback=_initBaiduMap`
        })
        return global.BMap._preloader
      } else if (!global.BMap._preloader) {
        return Promise.resolve(global.BMap)
      } else {
        return global.BMap._preloader
      }
    },
    // 获取BMap, 初始化地图
    initMap (BMap) {
      this.BMap = BMap
      this.init(BMap)
    },
    init (BMap) {
      let $el = this.$refs.basicMap
      const map = new BMap.Map($el)
      this.map = map
      this.setMapOptions()
      map.centerAndZoom(this.initCenter, this.initZoom)
      this.$emit('ready', {BMap, map})
    },
    // 设置地图配置
    setMapOptions () {
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>    <span class="hljs-comment">// 初始化</span>
    reset () {
      <span class="hljs-keyword">const</span> {getMapScript, initMap} = <span class="hljs-function"><span class="hljs-keyword">this</span>
      <span class="hljs-title">getMapScript</span>(<span class="hljs-params"></span>).<span class="hljs-title">then</span>(<span class="hljs-params">initMap</span>)
    },
    <span class="hljs-comment">// 获取baidumap</span>
    <span class="hljs-title">getMapScript</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">global</span>.BMap) {
        <span class="hljs-keyword">const</span> ak = <span class="hljs-keyword">this</span>.ak || <span class="hljs-keyword">this</span>._BMap().ak
        <span class="hljs-keyword">global</span>.BMap = {}
        <span class="hljs-keyword">global</span>.BMap._preloader = <span class="hljs-keyword">new</span> Promise((resolve, reject) =&gt; {
          <span class="hljs-keyword">global</span>._initBaiduMap = function () {
            resolve(<span class="hljs-keyword">global</span>.BMap)
            <span class="hljs-keyword">global</span>.document.body.removeChild($script)
            <span class="hljs-keyword">global</span>.BMap._preloader = <span class="hljs-literal">null</span>
            <span class="hljs-keyword">global</span>._initBaiduMap = <span class="hljs-literal">null</span>
          }
          <span class="hljs-keyword">const</span> $script = document.createElement(<span class="hljs-string">'script'</span>)
          <span class="hljs-keyword">global</span>.document.body.appendChild($script)
          $script.src = `https:<span class="hljs-comment">//api.map.baidu.com/api?v=2.0&amp;ak=${ak}&amp;callback=_initBaiduMap`</span>
        })
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">global</span>.BMap._preloader
      } <span class="hljs-function"><span class="hljs-keyword">else</span> <span class="hljs-title">if</span> (<span class="hljs-params">!<span class="hljs-keyword">global</span>.BMap._preloader</span>) </span>{
        <span class="hljs-keyword">return</span> Promise.resolve(<span class="hljs-keyword">global</span>.BMap)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">global</span>.BMap._preloader
      }
    },
    <span class="hljs-comment">// 获取BMap, 初始化地图</span>
    initMap (BMap) {
      <span class="hljs-keyword">this</span>.BMap = BMap
      <span class="hljs-keyword">this</span>.init(BMap)
    },
    init (BMap) {
      <span class="hljs-keyword">let</span> $el = <span class="hljs-keyword">this</span>.$refs.basicMap
      <span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> BMap.Map($el)
      <span class="hljs-keyword">this</span>.map = map
      <span class="hljs-keyword">this</span>.setMapOptions()
      map.centerAndZoom(<span class="hljs-keyword">this</span>.initCenter, <span class="hljs-keyword">this</span>.initZoom)
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'ready'</span>, {BMap, map})
    },
    <span class="hljs-comment">// 设置地图配置</span>
    setMapOptions () {
    }</code></pre>
<p>某业务组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <baidu-map mapWidth=&quot;100%&quot; mapHeight=&quot;500px&quot;></baidu-map>
</template>
<script>
import BaiduMap from '@/components/baiduMap'
export default {
  components: {
    BaiduMap
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">baidu-map</span> <span class="hljs-attr">mapWidth</span>=<span class="hljs-string">"100%"</span> <span class="hljs-attr">mapHeight</span>=<span class="hljs-string">"500px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">baidu-map</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> BaiduMap <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/baiduMap'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  components: {
    BaiduMap
  }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>效果如图：<span class="img-wrap"><img data-src="/img/bV7ZlT?w=1341&amp;h=503" src="https://static.alili.tech/img/bV7ZlT?w=1341&amp;h=503" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li><strong>加入可视化工具</strong></li></ul>
<p>地图上常规的可视化需求可以分成3种，分别是点线面</p>
<ol>
<li>
<p><strong><em>点（定位、数据打点）</em></strong>  </p>
<p>在百度地图api官网实例中，可以通过addOverlay()将标点添加到地图上，因此在vue中，只要我们获取到BMap和map构造函数就可以满足我们的操作<br> 在组件中，我通过$emit父子组件间广播事件，并将BMap、map传到业务组件</p>
<p>baiduMap.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   this.$emit('ready', {BMap, map})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">   <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'ready'</span>, {BMap, <span class="hljs-built_in">map</span>})</code></pre>
<p>业务组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <baidu-map mapWidth=&quot;100%&quot; mapHeight=&quot;500px&quot; @ready=&quot;initReady&quot;></baidu-map>
   initReady ({BMap, map}) {
     let point = new BMap.Point(116.404, 39.915)
     map.centerAndZoom(point, 15)
     let marker = new BMap.Marker(point)
     map.addOverlay(marker)
   }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>   &lt;baidu-<span class="hljs-built_in">map</span> mapWidth=<span class="hljs-string">"100%"</span> mapHeight=<span class="hljs-string">"500px"</span> @<span class="hljs-built_in">ready</span>=<span class="hljs-string">"initReady"</span>&gt;&lt;/baidu-<span class="hljs-built_in">map</span>&gt;
   initReady ({BMap, <span class="hljs-built_in">map</span>}) {
     let <span class="hljs-built_in">point</span> = <span class="hljs-keyword">new</span> BMap.Point(<span class="hljs-number">116.404</span>, <span class="hljs-number">39.915</span>)
     <span class="hljs-built_in">map</span>.centerAndZoom(<span class="hljs-built_in">point</span>, <span class="hljs-number">15</span>)
     let marker = <span class="hljs-keyword">new</span> BMap.Marker(<span class="hljs-built_in">point</span>)
     <span class="hljs-built_in">map</span>.addOverlay(marker)
   }
</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bV76OC?w=1053&amp;h=454" src="https://static.alili.tech/img/bV76OC?w=1053&amp;h=454" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>----------</p>
</li>
<li>
<p><strong><em> 线（导航、迁移路线）</em></strong></p>
<p>业务组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" map.centerAndZoom(new BMap.Point(116.404, 39.915), 15)
 let myP1 = new BMap.Point(116.380967, 39.913285)
 let myP2 = new BMap.Point(116.424374, 39.914668)
 let driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, autoViewport: true"}}")
 driving.search(myP1, myP2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code> <span class="hljs-keyword">map</span>.centerAndZoom(<span class="hljs-keyword">new</span> BMap.Point(<span class="hljs-number">116.404</span>, <span class="hljs-number">39.915</span>), <span class="hljs-number">15</span>)
 <span class="hljs-keyword">let</span> myP1 = <span class="hljs-keyword">new</span> BMap.Point(<span class="hljs-number">116.380967</span>, <span class="hljs-number">39.913285</span>)
 <span class="hljs-keyword">let</span> myP2 = <span class="hljs-keyword">new</span> BMap.Point(<span class="hljs-number">116.424374</span>, <span class="hljs-number">39.914668</span>)
 <span class="hljs-keyword">let</span> driving = <span class="hljs-keyword">new</span> BMap.DrivingRoute(<span class="hljs-keyword">map</span>, {renderOption<span class="hljs-variable">s:</span> {<span class="hljs-keyword">map</span>: <span class="hljs-keyword">map</span>, autoViewpor<span class="hljs-variable">t:</span> true"}}")
 driving.<span class="hljs-built_in">search</span>(myP1, myP2)</code></pre>
<p>效果图：<span class="img-wrap"><img data-src="/img/bV761h?w=856&amp;h=333" src="https://static.alili.tech/img/bV761h?w=856&amp;h=333" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>----------</p>
</li>
<li>
<p><strong><em> 面（区域选定、覆盖物、热力图）</em></strong></p>
<p>业务组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" map.centerAndZoom(new BMap.Point(116.404, 39.915), 15)
 map.enableScrollWheelZoom()
 // 创建多边形
 let polygon = new BMap.Polygon([
   new BMap.Point(116.387112, 39.920977),
   new BMap.Point(116.385243, 39.913063),
   new BMap.Point(116.394226, 39.917988),
   new BMap.Point(116.401772, 39.921364),
   new BMap.Point(116.41248, 39.927893)
 ], {strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5})
 // 增加多边形
 map.addOverlay(polygon)
 polygon.enableEditing()
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code> map.centerAndZoom(<span class="hljs-keyword">new</span> <span class="hljs-type">BMap</span>.Point(<span class="hljs-number">116.404</span>, <span class="hljs-number">39.915</span>), <span class="hljs-number">15</span>)
 map.enableScrollWheelZoom()
 <span class="hljs-comment">// 创建多边形</span>
 let polygon = <span class="hljs-keyword">new</span> <span class="hljs-type">BMap</span>.Polygon([
   <span class="hljs-keyword">new</span> <span class="hljs-type">BMap</span>.Point(<span class="hljs-number">116.387112</span>, <span class="hljs-number">39.920977</span>),
   <span class="hljs-keyword">new</span> <span class="hljs-type">BMap</span>.Point(<span class="hljs-number">116.385243</span>, <span class="hljs-number">39.913063</span>),
   <span class="hljs-keyword">new</span> <span class="hljs-type">BMap</span>.Point(<span class="hljs-number">116.394226</span>, <span class="hljs-number">39.917988</span>),
   <span class="hljs-keyword">new</span> <span class="hljs-type">BMap</span>.Point(<span class="hljs-number">116.401772</span>, <span class="hljs-number">39.921364</span>),
   <span class="hljs-keyword">new</span> <span class="hljs-type">BMap</span>.Point(<span class="hljs-number">116.41248</span>, <span class="hljs-number">39.927893</span>)
 ], {strokeColor: <span class="hljs-type"></span>'blue<span class="hljs-string">', strokeWeight: 2, strokeOpacity: 0.5})
 // 增加多边形
 map.addOverlay(polygon)
 polygon.enableEditing()
 </span></code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bV76Ux?w=850&amp;h=411" src="https://static.alili.tech/img/bV76Ux?w=850&amp;h=411" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
</ol>
<p>上面简单举了几个实例，真实环境中还会很多其他的API，比如方向、定位、搜索、放大缩小等控件<br>但我们也发现在不同业务重复调用同一模块时，上面的代码就显得过于累赘，因此我们需要把添加到地图上的图层（点线面工具）都抽取封装成组件（需要用到<a href="https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E6%8F%92%E6%A7%BD%E5%88%86%E5%8F%91%E5%86%85%E5%AE%B9" rel="nofollow noreferrer" target="_blank"><code>slot</code>插槽分发内容</a>），之后业务只需引用组件并传递所需参数即可<br><span class="img-wrap"><img data-src="/img/bV77gG?w=821&amp;h=446" src="https://static.alili.tech/img/bV77gG?w=821&amp;h=446" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>待续，持续更新......</em></strong></p>
<hr>
<p>下一篇文章： <a href="https://segmentfault.com/a/1190000014337634">vue 地图可视化（2） mapbox地图篇</a></p>
<p>完整项目地址： <a href="https://github.com/hty7/vue-demo.git" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/hty7/vue-demo.git" rel="nofollow noreferrer" target="_blank">https://github.com/hty7/vue-d...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 地图可视化（1）

## 原文链接
[https://segmentfault.com/a/1190000014258343](https://segmentfault.com/a/1190000014258343)

