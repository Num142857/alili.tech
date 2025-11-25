---
title: 'vue 地图可视化 mapbox篇(2)' 
date: 2018-12-06 2:30:09
hidden: true
slug: qazefenhkt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">MapBox</h2>
<p>项目中用到MapBox也是偶然的机会，项目中需要采用3D地图，当现有的工具（百度地图）无法满足我们的需求，我们肯定需要更高级开源的地图，无奈谷歌地图无法在国内使用，已是便找到Leafle，一开始惊艳于leafle的开源程度和其与众不同的地图风格，后来顺藤摸瓜，找到一个商业性地图，它便是我们的主角-MapBox<br><span class="img-wrap"><img data-src="/img/bV8iXr?w=1430&amp;h=570" src="https://static.alili.tech/img/bV8iXr?w=1430&amp;h=570" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>作为国外的一款地图，看到其效果时便一发不可收拾</p>
<p>由于项目主要采用3d GL，国内在这方面的文档不多，只能举起社会主义的镰刀和火炬，一遍遍地看它的官方文档<br>mapbox gl <a href="https://www.mapbox.com/mapbox-gl-js/api/" rel="nofollow noreferrer" target="_blank">https://www.mapbox.com/mapbox...</a></p>
<ul><li><strong>项目引入Mapbox</strong></li></ul>
<p><strong>CDN模式</strong><br>在项目html的&lt;head&gt;中直接插入mapbox</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css'</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">'stylesheet'</span> /&gt;</span>
</code></pre>
<p><strong>module bundler模式</strong><br>npm install --save mapbox-gl<br>// cnpm install --save mapbox-gl</p>
<hr>
<ul><li><strong>初始化地图</strong></li></ul>
<p>这里的思路和之前写的一遍文章<code>[百度地图组件化][2]</code>一样，都是将地图单独抽出来</p>
<p>mapbox.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div style=&quot;height:100%;width:100%;text-align:left;&quot;>
    <div ref=&quot;basicMapbox&quot; :style=&quot;mapSize&quot;></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
export default {
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      mapboxgl.accessToken = 'your AK'
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/streets-v9'
      })
      console.log(map)
    }
  },
  computed: {
    mapSize () {
      let styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      }
      return styleObj
    }
  }
}
</script>
<style>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height:100%;width:100%;text-align:left;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"basicMapbox"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"mapSize"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> mapboxgl <span class="hljs-keyword">from</span> <span class="hljs-string">'mapbox-gl'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">mapWidth</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
    },
    <span class="hljs-attr">mapHeight</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
    }
  },
  data () {
    <span class="hljs-keyword">return</span> {
    }
  },
  mounted () {
    <span class="hljs-keyword">this</span>.init()
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// 初始化</span>
    init () {
      mapboxgl.accessToken = <span class="hljs-string">'your AK'</span>
      <span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> mapboxgl.Map({
        <span class="hljs-attr">container</span>: <span class="hljs-keyword">this</span>.$refs.basicMapbox,
        <span class="hljs-attr">style</span>: <span class="hljs-string">'mapbox://styles/mapbox/streets-v9'</span>
      })
      <span class="hljs-built_in">console</span>.log(map)
    }
  },
  <span class="hljs-attr">computed</span>: {
    mapSize () {
      <span class="hljs-keyword">let</span> styleObj = {
        <span class="hljs-attr">width</span>: <span class="hljs-keyword">this</span>.mapWidth,
        <span class="hljs-attr">height</span>: <span class="hljs-keyword">this</span>.mapHeight
      }
      <span class="hljs-keyword">return</span> styleObj
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
@<span class="hljs-keyword">import</span> url(<span class="hljs-string">'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css'</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>因此只需在业务组件中单独引入mapbox.vue就可以加载地图</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<mapbox-map mapWidth=&quot;100%&quot; mapHeight=&quot;600px&quot;></mapbox-map>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>&lt;mapbox-<span class="hljs-built_in">map</span> mapWidth=<span class="hljs-string">"100%"</span> mapHeight=<span class="hljs-string">"600px"</span>&gt;&lt;/mapbox-<span class="hljs-built_in">map</span>&gt;
</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bV8ccl?w=1880&amp;h=605" src="https://static.alili.tech/img/bV8ccl?w=1880&amp;h=605" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<ul><li><strong>mapbox可视化</strong></li></ul>
<p>mapbox原生提供数据可视化的接口，但这并没满足我们的需求<br>因此我们选用前端经常使用到可视化插件d3.js和echarts，经过横向对比其性能及通用性，最后还是选择了后者<br>echarts也提供3D绘制的echart-gl，通过利用mapbox强大的地图服务和echaers-gl的可视化渲染，达到我们的前期需求<br>(3d建模需要消耗大量的GPU运算，项目前期以功能实现为主，后期将着重性能优化)</p>
<p><span class="img-wrap"><img data-src="/img/bV8iZx?w=744&amp;h=421" src="https://static.alili.tech/img/bV8iZx?w=744&amp;h=421" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bV8jIR?w=1171&amp;h=576" src="https://static.alili.tech/img/bV8jIR?w=1171&amp;h=576" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>mapbox可视化的组件化<br>1、地图配置：echarts-GL内封装mapbox的配置项，通过options的mapbox可以直接进行简单配置（中心点、等级、摄像机倾斜度、摄像机高度及光源等）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

mapbox: {
      center: [113.206456, 23.072519],
      zoom: 6.2,
      pitch: 60,
      bearing: 0,
      style: 'mapbox://styles/mapbox/dark-v9',
      boxHeight: 20,
      light: {
        main: {
          intensity: 1,
          shadow: true,
          shadowQuality: 'high'
        },
        ambient: {
          intensity: 0.2
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="less"><span class="hljs-attribute">mapbox</span>: {
      <span class="hljs-attribute">center</span>: [<span class="hljs-number">113.206456</span>, <span class="hljs-number">23.072519</span>],
      <span class="hljs-attribute">zoom</span>: <span class="hljs-number">6.2</span>,
      <span class="hljs-attribute">pitch</span>: <span class="hljs-number">60</span>,
      <span class="hljs-attribute">bearing</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attribute">style</span>: <span class="hljs-string">'mapbox://styles/mapbox/dark-v9'</span>,
      <span class="hljs-attribute">boxHeight</span>: <span class="hljs-number">20</span>,
      <span class="hljs-attribute">light</span>: {
        <span class="hljs-attribute">main</span>: {
          <span class="hljs-attribute">intensity</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attribute">shadow</span>: true,
          <span class="hljs-attribute">shadowQuality</span>: <span class="hljs-string">'high'</span>
        },
        <span class="hljs-attribute">ambient</span>: {
          <span class="hljs-attribute">intensity</span>: <span class="hljs-number">0.2</span>
        }
      }
    }</span></code></pre>
<p>2、可视化工具：echarts-Gl options的series进行图表设置，通过getModel().getComponent('mapbox3D').getMapbox()获取map对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="series: {
      name: '常驻人口',
      type: 'bar3D',
      shading: 'realistic',
      coordinateSystem: 'mapbox',
      silent: true,
      barSize: 1, // 柱子粗细
      bevelSize: 0.3,
      emphasis: {
        label: {
          show: false
        }
      },
      label: {
        show: true,
        distance: 0,
        formatter: '{b}',
        textStyle: {
          fontSize: 12
        }
      },
      data: []
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">series</span>: {
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'常驻人口'</span>,
      <span class="hljs-attribute">type</span>: <span class="hljs-string">'bar3D'</span>,
      <span class="hljs-attribute">shading</span>: <span class="hljs-string">'realistic'</span>,
      <span class="hljs-attribute">coordinateSystem</span>: <span class="hljs-string">'mapbox'</span>,
      <span class="hljs-attribute">silent</span>: true,
      <span class="hljs-attribute">barSize</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 柱子粗细</span>
      <span class="hljs-attribute">bevelSize</span>: <span class="hljs-number">0.3</span>,
      <span class="hljs-attribute">emphasis</span>: {
        <span class="hljs-attribute">label</span>: {
          <span class="hljs-attribute">show</span>: false
        }
      },
      <span class="hljs-attribute">label</span>: {
        <span class="hljs-attribute">show</span>: true,
        <span class="hljs-attribute">distance</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attribute">formatter</span>: <span class="hljs-string">'{b}'</span>,
        <span class="hljs-attribute">textStyle</span>: {
          <span class="hljs-attribute">fontSize</span>: <span class="hljs-number">12</span>
        }
      },
      <span class="hljs-attribute">data</span>: []
    }</code></pre>
<p>3、动作及拓展：mapbox通过map API的on属性和mapboxgl进行地图的操作，如修改地图样式、加载图层、添加导航工具等用户交互动作<br>如：添加导航操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.nav = new mapboxgl.NavigationControl()
    map.addControl(this.nav)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>    <span class="hljs-keyword">this</span>.nav = <span class="hljs-keyword">new</span> mapboxgl.NavigationControl()
    <span class="hljs-built_in">map</span>.addControl(<span class="hljs-keyword">this</span>.nav)</code></pre>
<p>添加Geojson图层</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" map.addSource('states', {
        'type': 'geojson',
        'data': gdData
      })
    map.addLayer({
        'id': 'state-fills',
        'type': 'fill',
        'source': 'states',
        'layout': {},
        'paint': {
          'fill-color': '#627BC1',
          'fill-opacity': 0.1
        }
    })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> <span class="hljs-keyword">map</span>.addSource(<span class="hljs-string">'states'</span>, {
        <span class="hljs-string">'type'</span>: <span class="hljs-string">'geojson'</span>,
        <span class="hljs-string">'data'</span>: gdData
      })
    <span class="hljs-keyword">map</span>.addLayer({
        <span class="hljs-string">'id'</span>: <span class="hljs-string">'state-fills'</span>,
        <span class="hljs-string">'type'</span>: <span class="hljs-string">'fill'</span>,
        <span class="hljs-string">'source'</span>: <span class="hljs-string">'states'</span>,
        <span class="hljs-string">'layout'</span>: {},
        <span class="hljs-string">'paint'</span>: {
          <span class="hljs-string">'fill-color'</span>: <span class="hljs-string">'#627BC1'</span>,
          <span class="hljs-string">'fill-opacity'</span>: <span class="hljs-number">0</span>.<span class="hljs-number">1</span>
        }
    })
</code></pre>
<p><strong>思路汇总</strong>：通过上面三步走的思路，我们可以把组件粗略分成三部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="核心的mapbox.vue是地图视图
可视化图表由echarts-gl组成
动作及拓展对地图视图和图表进行操作
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>核心的<span class="hljs-selector-tag">mapbox</span><span class="hljs-selector-class">.vue</span>是地图视图
可视化图表由<span class="hljs-selector-tag">echarts-gl</span>组成
动作及拓展对地图视图和图表进行操作
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8jz0?w=888&amp;h=495" src="https://static.alili.tech/img/bV8jz0?w=888&amp;h=495" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bV8jEQ?w=1596&amp;h=569" src="https://static.alili.tech/img/bV8jEQ?w=1596&amp;h=569" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV8Ena?w=1345&amp;h=629" src="https://static.alili.tech/img/bV8Ena?w=1345&amp;h=629" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>待续，文章持续更新修改......</em></strong></p>
<hr>
<p>上一篇文章： <a href="https://segmentfault.com/a/1190000014258343">vue 地图可视化（1） 百度地图篇</a></p>
<p>完整项目github地址：<a href="https://github.com/hty7/vue-demo.git" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/hty7/vue-demo.git" rel="nofollow noreferrer" target="_blank">https://github.com/hty7/vue-d...</a></p>
<p>有不懂的地方，可以在下方留言，或者私聊。对文章感兴趣的话，点下赞、收藏和github收集小星星，谢谢大家。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 地图可视化 mapbox篇(2)

## 原文链接
[https://segmentfault.com/a/1190000014337634](https://segmentfault.com/a/1190000014337634)

