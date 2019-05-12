---
title: 'vue项目加载第3方js优化' 
date: 2019-01-09 2:30:12
hidden: true
slug: et4mkzcbknm
categories: [reprint]
---

{{< raw >}}

                    
<p>项目写到最后需要优化的时候，发现有很多首屏用不到的第3方js都写在index.html里，严重拖慢的网页的加载速度，这里的第3方组件大多不能通过npm或其他模块安装，所以不能直接用vue里的异步组件，比如高德地图的jssdk和它的ui组件，最简单的方法就是在document里插入script。 所以就有了下面的方案。</p>
<h4>先定义一个把js插入到document里的方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# asyncLoadJs.js
export default function asyncLoadJs (url) {
  return Q.Promise((resolve, reject) => {
    let hasLoaded = $('script[src=&quot;'+url+'&quot;]').length > 0
    if (hasLoaded) {
      resolve()
      return
    }

    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject()
    }
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code># asyncLoadJs.js
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncLoadJs</span> (<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">return</span> Q.Promise(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> hasLoaded = $(<span class="hljs-string">'script[src="'</span>+url+<span class="hljs-string">'"]'</span>).length &gt; <span class="hljs-number">0</span>
    <span class="hljs-keyword">if</span> (hasLoaded) {
      resolve()
      <span class="hljs-keyword">return</span>
    }

    <span class="hljs-keyword">let</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>)
    script.type = <span class="hljs-string">'text/javascript'</span>
    script.src = url
    <span class="hljs-built_in">document</span>.body.appendChild(script)
    script.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve()
    }
    script.onerror = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      reject()
    }
  })
}
</code></pre>
<h4>在按第3方js依赖的不同 分成各个函数</h4>
<p>这里以我项目里的高德地图组件为例，它需要一个主jssdk库和一个提供ui的库，ui库是依赖主库的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# asyncLoadJs.js
export function loadAMapJS () {
  return Q.Promise((resolve, reject) => {
    asyncLoadJs('https://webapi.amap.com/maps?v=1.3&amp;key=[你自己的key]&amp;plugin=AMap.ToolBar,AMap.Geolocation,AMap.Autocomplete')
      .then(() => {
        return asyncLoadJs('https://webapi.amap.com/ui/1.0/main.js')
      })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment"># asyncLoadJs.js</span>
<span class="hljs-keyword">export</span> function loadAMapJS () {
  <span class="hljs-keyword">return</span> Q.Promise(<span class="hljs-function"><span class="hljs-params">(resolve, reject)</span> =&gt;</span> {
    asyncLoadJs(<span class="hljs-string">'https://webapi.amap.com/maps?v=1.3&amp;key=[你自己的key]&amp;plugin=AMap.ToolBar,AMap.Geolocation,AMap.Autocomplete'</span>)
      .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> asyncLoadJs(<span class="hljs-string">'https://webapi.amap.com/ui/1.0/main.js'</span>)
      })
      .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve()
      })
      .<span class="hljs-keyword">catch</span>(err =&gt; {
        reject(err)
      })
  })
}</code></pre>
<h4>在组件生命周期中使用异步加载</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# position-picker.vue
<script>
    import {loadAMapJS} from '../../libs/asyncLoadJs'
    
    let loadedAMapJS = false // 是否加载完js
    
    export default {
        created () {
          // 判断是否加载过
          if (!loadedAMapJS) {
            loadAMapJS().then(() => {
              loadedAMapJS = true
            })
          }
        },
        mounted () {
          // 循环判断有没有加载完 写在mounted生命周期里是应为高德的api依赖dom
          let interval = setInterval(() => {
            if (loadedAMapJS) {
              clearInterval(interval)
              this.init()
            }
          }, 300)
        },
        init () {
            let AMap = window.AMap
            let AMapUI = window.AMapUI
            AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
              self.map = new AMap.Map(self.$refs['map'], {
                zoom: 16,
                scrollWheel: false
              })
              ...其他代码
            })
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code># position-picker.vue
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> {loadAMapJS} <span class="hljs-keyword">from</span> <span class="hljs-string">'../../libs/asyncLoadJs'</span>
    
    <span class="hljs-keyword">let</span> loadedAMapJS = <span class="hljs-literal">false</span> <span class="hljs-comment">// 是否加载完js</span>
    
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        created () {
          <span class="hljs-comment">// 判断是否加载过</span>
          <span class="hljs-keyword">if</span> (!loadedAMapJS) {
            loadAMapJS().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
              loadedAMapJS = <span class="hljs-literal">true</span>
            })
          }
        },
        mounted () {
          <span class="hljs-comment">// 循环判断有没有加载完 写在mounted生命周期里是应为高德的api依赖dom</span>
          <span class="hljs-keyword">let</span> interval = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (loadedAMapJS) {
              clearInterval(interval)
              <span class="hljs-keyword">this</span>.init()
            }
          }, <span class="hljs-number">300</span>)
        },
        init () {
            <span class="hljs-keyword">let</span> AMap = <span class="hljs-built_in">window</span>.AMap
            <span class="hljs-keyword">let</span> AMapUI = <span class="hljs-built_in">window</span>.AMapUI
            AMapUI.loadUI([<span class="hljs-string">'misc/PositionPicker'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">PositionPicker</span>) </span>{
              self.map = <span class="hljs-keyword">new</span> AMap.Map(self.$refs[<span class="hljs-string">'map'</span>], {
                <span class="hljs-attr">zoom</span>: <span class="hljs-number">16</span>,
                <span class="hljs-attr">scrollWheel</span>: <span class="hljs-literal">false</span>
              })
              ...其他代码
            })
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>一个页面有多个第3方组件的问题</h4>
<p>如果一个页面有多个第3方组件，那只定义一个是否加载完的标志位是不够的，因为组件基本是同时created的，在dom中插入script标签后都会返回resolve，其实这时js是没有加载完的，这时可以加一个是否是第一次请求js的变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# position-picker.vue
<script>
    import {loadAMapJS} from '../../libs/asyncLoadJs'
    
    let loadedAMapJS = false // 是否加载完js
    let firstLoadingAMapJS = true // 否是第一次请求
    
    export default {
        created () {
          // 判断是否加载过
          if (!loadedAMapJS &amp;&amp; firstLoadingAMapJS) {
            firstLoadingAMapJS = false // 马上置为false 只让第一个created组件去请求js
            loadAMapJS().then(() => {
              loadedAMapJS = true
            }).catch(() => {
              firstLoadingAMapJS = true // 出错置为true 下次进来还是能重新请求js
            })
          }
        }
        ...
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code># position-picker.vue
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> {loadAMapJS} <span class="hljs-keyword">from</span> <span class="hljs-string">'../../libs/asyncLoadJs'</span>
    
    <span class="hljs-keyword">let</span> loadedAMapJS = <span class="hljs-literal">false</span> <span class="hljs-comment">// 是否加载完js</span>
    <span class="hljs-keyword">let</span> firstLoadingAMapJS = <span class="hljs-literal">true</span> <span class="hljs-comment">// 否是第一次请求</span>
    
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        created () {
          <span class="hljs-comment">// 判断是否加载过</span>
          <span class="hljs-keyword">if</span> (!loadedAMapJS &amp;&amp; firstLoadingAMapJS) {
            firstLoadingAMapJS = <span class="hljs-literal">false</span> <span class="hljs-comment">// 马上置为false 只让第一个created组件去请求js</span>
            loadAMapJS().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
              loadedAMapJS = <span class="hljs-literal">true</span>
            }).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
              firstLoadingAMapJS = <span class="hljs-literal">true</span> <span class="hljs-comment">// 出错置为true 下次进来还是能重新请求js</span>
            })
          }
        }
        ...
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>注意事项</h4>
<p>在computed或watch中，如果需要用到第3方js方法的地方必须先判断第3方js是否加载完，不然会报错的~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目加载第3方js优化

## 原文链接
[https://segmentfault.com/a/1190000010094303](https://segmentfault.com/a/1190000010094303)

