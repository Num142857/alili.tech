---
title: 'vue.js 高德地图' 
date: 2019-02-05 2:30:09
hidden: true
slug: f93zg7fkeza
categories: [reprint]
---

{{< raw >}}

                    
<p>AMap.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (k) {
    return new Promise(function (resolve, reject) {
        window.initTheMap = function () {
            resolve(AMap)
        }

        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'http://webapi.amap.com/maps?v=1.3&amp;callback=initTheMap&amp;key=' + k
        //script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">k</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-built_in">window</span>.initTheMap = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            resolve(AMap)
        }

        <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>)
        script.type = <span class="hljs-string">'text/javascript'</span>
        script.async = <span class="hljs-literal">true</span>
        script.src = <span class="hljs-string">'http://webapi.amap.com/maps?v=1.3&amp;callback=initTheMap&amp;key='</span> + k
        <span class="hljs-comment">//script.onload = resolve</span>
        script.onerror = reject
        <span class="hljs-built_in">document</span>.head.appendChild(script)
    })
}</code></pre>
<hr>
<p>AMap.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div></div>
</template>
<script>
    var mapLoader = require('./AMap.js')

    module.exports = {
        replace: true,
        ready() {
            var self = this

            mapLoader('bfe31f4e0fb231d29e1d3ce951e2c780').then(AMap => {
                self.map = new AMap.Map(self.$el, {
                    resizeEnable: true,
                    zoom: 12,
                })

                self.map.on('click', function (e) {
                    self.$dispatch('map-click', e)

                    if (!self.marker) {
                        self.marker = new AMap.Marker({ map: self.map })
                    }

                    self.marker.setPosition([e.lnglat.getLng(), e.lnglat.getLat()])
                })

                self.$nextTick(function () {
                    self.$dispatch('ready', self.map)
                })
            })
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>&lt;template&gt;
    &lt;div&gt;&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
    <span class="hljs-keyword">var</span> mapLoader = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./AMap.js'</span>)

    module.exports = {
        replace: <span class="hljs-keyword">true</span>,
        ready() {
            <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this

            mapLoader(<span class="hljs-string">'bfe31f4e0fb231d29e1d3ce951e2c780'</span>).then(AMap =&gt; {
                <span class="hljs-keyword">self</span>.map = <span class="hljs-keyword">new</span> AMap.Map(<span class="hljs-keyword">self</span>.$el, {
                    resizeEnable: <span class="hljs-keyword">true</span>,
                    zoom: <span class="hljs-number">12</span>,
                })

                <span class="hljs-keyword">self</span>.map.on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span> </span>{
                    <span class="hljs-keyword">self</span>.$dispatch(<span class="hljs-string">'map-click'</span>, e)

                    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">self</span>.marker) {
                        <span class="hljs-keyword">self</span>.marker = <span class="hljs-keyword">new</span> AMap.Marker({ map: <span class="hljs-keyword">self</span>.map })
                    }

                    <span class="hljs-keyword">self</span>.marker.setPosition([e.lnglat.getLng(), e.lnglat.getLat()])
                })

                <span class="hljs-keyword">self</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-keyword">self</span>.$dispatch(<span class="hljs-string">'ready'</span>, <span class="hljs-keyword">self</span>.map)
                })
            })
        }
    }
&lt;/script&gt;</code></pre>
<hr>
<p>app.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <gd-map @ready=&quot;ready&quot; :style='{ height:&quot;400px&quot; }'></gd-map>
</template>

<script>
    module.exports = {
        components: {
            gdMap: require('./AMap.vue')
        },
        methods: {
            ready(map) {
                console.log('ready', map)
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">gd-map</span> @<span class="hljs-attr">ready</span>=<span class="hljs-string">"ready"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">'{ height:"400px" }'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">gd-map</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">components</span>: {
            <span class="hljs-attr">gdMap</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./AMap.vue'</span>)
        },
        <span class="hljs-attr">methods</span>: {
            ready(map) {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ready'</span>, map)
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js 高德地图

## 原文链接
[https://segmentfault.com/a/1190000006703063](https://segmentfault.com/a/1190000006703063)

