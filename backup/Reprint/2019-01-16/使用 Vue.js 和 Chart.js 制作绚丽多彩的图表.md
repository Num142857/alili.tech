---
title: '使用 Vue.js 和 Chart.js 制作绚丽多彩的图表' 
date: 2019-01-16 2:30:08
hidden: true
slug: q7y8xjtkup9
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009049816?w=1000&amp;h=424" src="https://static.alili.tech/img/remote/1460000009049816?w=1000&amp;h=424" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>本文作者：Jakub Juszczak <br>编译：<a href="https://www.zhihu.com/people/hu-zi-da-ha" rel="nofollow noreferrer" target="_blank">胡子大哈</a> </p>
<p>翻译原文：<a href="http://huziketang.com/blog/posts/detail?postId=58e5e0e1a58c240ae35bb8e0" rel="nofollow noreferrer" target="_blank">http://huziketang.com/blog/posts/detail?postId=58e5e0e1a58c240ae35bb8e0</a>  <br>英文连接：<a href="https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a" rel="nofollow noreferrer" target="_blank">Creating stunning charts with Vue.js and Chart.js</a></p>
</blockquote>
<p><strong>转载请注明出处，保留原文链接以及作者信息</strong></p>
<p>深入学习 chart.js 的选项来制作漂亮的图表。交互式图表可以给你的数据可视化提供很酷的展示方式。但是大多数开箱即用的解决方案用默认的选项并不能做出很绚丽的图表。</p>
<p>这篇文章中，我会教你如何自定义 chart.js 选项来制作很酷的图表。</p>
<h2 id="articleHeader0"><span style="font-weight:normal;">⚡</span> Quick Start</h2>
<p>我们需要：</p>
<ul>
<li><p><a href="https://vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue.js</a></p></li>
<li><p><a href="http://vue-chartjs.org/" rel="nofollow noreferrer" target="_blank">vue-chart.js</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a></p></li>
</ul>
<p>使用 <em>vue-cli</em> 来搭基本架构，希望你已经安装好了。我们使用 <em>vue-chart.js</em> 来作为 chart.js 的打包器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack awesome-charts
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">vue init webpack awesome-charts</span>
</code></pre>
<p>然后到工程目录中安装依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd awesome-charts &amp;&amp; yarn install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> awesome-charts &amp;&amp; yarn install
</code></pre>
<p>添加 <a href="http://vue-chartjs.org/" rel="nofollow noreferrer" target="_blank">vue-chartjs</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add vue-chartjs -S
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">add</span><span class="bash"> vue-chartjs -S
</span></code></pre>
<h2 id="articleHeader1">第一个图表</h2>
<p>现在我们来创建第一个折现表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch src/components/LineChart.js &amp;&amp; subl .
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>touch src/components/LineChart<span class="hljs-selector-class">.js</span> &amp;&amp; subl .
</code></pre>
<p>现在需要从 <a href="http://vue-chartjs.org/" rel="nofollow noreferrer" target="_blank">vue-chartjs</a> 中引入折线表的基表，创建组件。</p>
<p>在 <strong>mount()</strong> 函数中使用我们准备好的数据和选项来调用 <strong>renderChart()</strong>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import {Line} from 'vue-chartjs'
    
    export default Line.extend({
      mounted () {
    
        this.renderChart({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#FC2525',
              data: [40, 39, 10, 40, 39, 80, 40]
            },{
              label: 'Data Two',
              backgroundColor: '#05CBE1',
              data: [60, 55, 32, 10, 2, 12, 53]
            }
          ]
        }, {responsive: true, maintainAspectRatio: false})
    
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">import</span> {Line} <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-chartjs'</span>
    
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Line.extend({
      mounted () {
    
        <span class="hljs-keyword">this</span>.renderChart({
          <span class="hljs-attr">labels</span>: [<span class="hljs-string">'January'</span>, <span class="hljs-string">'February'</span>, <span class="hljs-string">'March'</span>, <span class="hljs-string">'April'</span>, <span class="hljs-string">'May'</span>, <span class="hljs-string">'June'</span>, <span class="hljs-string">'July'</span>],
          <span class="hljs-attr">datasets</span>: [
            {
              <span class="hljs-attr">label</span>: <span class="hljs-string">'Data One'</span>,
              <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#FC2525'</span>,
              <span class="hljs-attr">data</span>: [<span class="hljs-number">40</span>, <span class="hljs-number">39</span>, <span class="hljs-number">10</span>, <span class="hljs-number">40</span>, <span class="hljs-number">39</span>, <span class="hljs-number">80</span>, <span class="hljs-number">40</span>]
            },{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'Data Two'</span>,
              <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#05CBE1'</span>,
              <span class="hljs-attr">data</span>: [<span class="hljs-number">60</span>, <span class="hljs-number">55</span>, <span class="hljs-number">32</span>, <span class="hljs-number">10</span>, <span class="hljs-number">2</span>, <span class="hljs-number">12</span>, <span class="hljs-number">53</span>]
            }
          ]
        }, {<span class="hljs-attr">responsive</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">maintainAspectRatio</span>: <span class="hljs-literal">false</span>})
    
      }
    })</code></pre>
<p>代码中，使用了一些实例数据和可选参数传递给 chart.js 的数据对象，并且设置 <strong>responsive:true</strong>，使得图表会充满外层容器。</p>
<p>之所以可以使用 <strong>renderChart()</strong> 方法是因为我们继承了 BaseChart，这个方法和一些属性都是在 BaseChart 中定义的。</p>
<h2 id="articleHeader2">运行 &amp; 测试</h2>
<p>ok，现在从 App.vue 中把 Hello.vue 删掉，并且引入我们的图表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <template>
      <div id=&quot;app&quot;>
        <div class=&quot;container&quot;>
          <div class=&quot;Chart__list&quot;>
            <div class=&quot;Chart&quot;>
              <h2>Linechart</h2>
              <line-example></line-example>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <script>
    import LineExample from './components/LineChart.js'
    export default {
      name: 'app',
      components: {
        LineExample
      }
    }
    </script>
    
    <style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
    .container {
      max-width: 800px;
      margin:  0 auto;
    }
    </style>
    CopyRaw" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    &lt;template&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Chart__list"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Chart"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Linechart<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">line-example</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">line-example</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
    
    &lt;script&gt;
    <span class="hljs-keyword">import</span> LineExample <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/LineChart.js'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
      <span class="hljs-attr">components</span>: {
        LineExample
      }
    }
    &lt;<span class="hljs-regexp">/script&gt;
    
    &lt;style&gt;
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
    .container {
      max-width: 800px;
      margin:  0 auto;
    }
    &lt;/</span>style&gt;
    CopyRaw</code></pre>
<p>在终端中运行 dev 脚本，就可以看到图表了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn run dev 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>yarn <span class="hljs-keyword">run</span><span class="bash"> dev 
</span></code></pre>
<h2 id="articleHeader3">把我变得更漂亮</h2>
<p>现在该做些美化工作了? ，chart.js 中有很多很酷的技巧。可以传递一个十六进制的颜色数据到 <strong>backgroundColor</strong>，也可以传递 rgba() 值，还可以设置颜色的透明度。chart.js 使用的是 html canvas 来绘图的，所以我们使用 <a href="https://developer.mozilla.org/de/docs/Web/API/CanvasRenderingContext2D/createLinearGradient" rel="nofollow noreferrer" target="_blank">createLinearGradient()</a>。</p>
<p>从这里开始才是有趣的起点，使用它我们需要 canvas 对象。但这事并不难，<a href="http://vue-chartjs.org/" rel="nofollow noreferrer" target="_blank">vue-chartjs</a> 中已经存在一个它的引用。我们可以使用 <strong>this.$refs.canvas</strong> 来访问。</p>
<p>在 LineChart.js 中，我们创建了两个变量来保存渐变。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.gradient = this.$refs.canvas
     .getContext(‘2d’)
     .createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas
     .getContext(‘2d’)
     .createLinearGradient(0, 0, 0, 450)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">this</span>.gradient = <span class="hljs-keyword">this</span>.$refs.canvas
     .getContext(‘<span class="hljs-number">2</span>d’)
     .createLinearGradient(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">450</span>)
    <span class="hljs-keyword">this</span>.gradient2 = <span class="hljs-keyword">this</span>.$refs.canvas
     .getContext(‘<span class="hljs-number">2</span>d’)
     .createLinearGradient(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">450</span>)</code></pre>
<p>还有另外一个函数可以使用：<a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop" rel="nofollow noreferrer" target="_blank">addColorStop()</a></p>
<p>给每个渐变创建三个颜色点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.gradient.addColorStop(0, ‘rgba(255, 0,0, 0.5)’)
    this.gradient.addColorStop(0.5, ‘rgba(255, 0, 0, 0.25)’);
    this.gradient.addColorStop(1, ‘rgba(255, 0, 0, 0)’);
     
    this.gradient2.addColorStop(0, ‘rgba(0, 231, 255, 0.9)’)
    this.gradient2.addColorStop(0.5, ‘rgba(0, 231, 255, 0.25)’);
    this.gradient2.addColorStop(1, ‘rgba(0, 231, 255, 0)’);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">this</span>.gradient.addColorStop(<span class="hljs-number">0</span>, ‘rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>,<span class="hljs-number">0</span>, <span class="hljs-number">0.5</span>)’)
    <span class="hljs-keyword">this</span>.gradient.addColorStop(<span class="hljs-number">0.5</span>, ‘rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.25</span>)’);
    <span class="hljs-keyword">this</span>.gradient.addColorStop(<span class="hljs-number">1</span>, ‘rgba(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)’);
     
    <span class="hljs-keyword">this</span>.gradient2.addColorStop(<span class="hljs-number">0</span>, ‘rgba(<span class="hljs-number">0</span>, <span class="hljs-number">231</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.9</span>)’)
    <span class="hljs-keyword">this</span>.gradient2.addColorStop(<span class="hljs-number">0.5</span>, ‘rgba(<span class="hljs-number">0</span>, <span class="hljs-number">231</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.25</span>)’);
    <span class="hljs-keyword">this</span>.gradient2.addColorStop(<span class="hljs-number">1</span>, ‘rgba(<span class="hljs-number">0</span>, <span class="hljs-number">231</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>)’);</code></pre>
<p>现在就可以把 <strong>this.gradient</strong> 传递给 <strong>backgroundColor</strong>了，可以得到一个很好看的渐变。为了得到更好的效果，还可以设置 borderColor 的颜色，alpha 设置成 1 （或者用十六进制也行），设置 borderWidth 为 1，另外还可以设置 pointColor。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    borderColor: ‘#FC2525’, 
    pointBackgroundColor: ‘white’, 
    borderWidth: 1, 
    pointBorderColor: ‘white’," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    borderColor: ‘#FC2525’, 
    <span class="hljs-attr">pointBackgroundColor</span>: ‘white’, 
    <span class="hljs-attr">borderWidth</span>: <span class="hljs-number">1</span>, 
    <span class="hljs-attr">pointBorderColor</span>: ‘white’,</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import {Line} from 'vue-chartjs'
    
    export default Line.extend({
      data () {
        return {
          gradient: null,
          gradient2: null
        }
      },
      mounted () {
        this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
        this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    
        this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
        this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
        this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
        this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
        this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');
    
    
        this.renderChart({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Data One',
              borderColor: '#FC2525',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: this.gradient,
              data: [40, 39, 10, 40, 39, 80, 40]
            },{
              label: 'Data Two',
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              borderWidth: 1,
              backgroundColor: this.gradient2,
              data: [60, 55, 32, 10, 2, 12, 53]
            }
          ]
        }, {responsive: true, maintainAspectRatio: false})
    
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-keyword">import</span> {Line} <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-chartjs'</span>
    
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Line.extend({
      data () {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">gradient</span>: <span class="hljs-literal">null</span>,
          <span class="hljs-attr">gradient2</span>: <span class="hljs-literal">null</span>
        }
      },
      mounted () {
        <span class="hljs-keyword">this</span>.gradient = <span class="hljs-keyword">this</span>.$refs.canvas.getContext(<span class="hljs-string">'2d'</span>).createLinearGradient(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">450</span>)
        <span class="hljs-keyword">this</span>.gradient2 = <span class="hljs-keyword">this</span>.$refs.canvas.getContext(<span class="hljs-string">'2d'</span>).createLinearGradient(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">450</span>)
    
        <span class="hljs-keyword">this</span>.gradient.addColorStop(<span class="hljs-number">0</span>, <span class="hljs-string">'rgba(255, 0,0, 0.5)'</span>)
        <span class="hljs-keyword">this</span>.gradient.addColorStop(<span class="hljs-number">0.5</span>, <span class="hljs-string">'rgba(255, 0, 0, 0.25)'</span>);
        <span class="hljs-keyword">this</span>.gradient.addColorStop(<span class="hljs-number">1</span>, <span class="hljs-string">'rgba(255, 0, 0, 0)'</span>);
        
        <span class="hljs-keyword">this</span>.gradient2.addColorStop(<span class="hljs-number">0</span>, <span class="hljs-string">'rgba(0, 231, 255, 0.9)'</span>)
        <span class="hljs-keyword">this</span>.gradient2.addColorStop(<span class="hljs-number">0.5</span>, <span class="hljs-string">'rgba(0, 231, 255, 0.25)'</span>);
        <span class="hljs-keyword">this</span>.gradient2.addColorStop(<span class="hljs-number">1</span>, <span class="hljs-string">'rgba(0, 231, 255, 0)'</span>);
    
    
        <span class="hljs-keyword">this</span>.renderChart({
          <span class="hljs-attr">labels</span>: [<span class="hljs-string">'January'</span>, <span class="hljs-string">'February'</span>, <span class="hljs-string">'March'</span>, <span class="hljs-string">'April'</span>, <span class="hljs-string">'May'</span>, <span class="hljs-string">'June'</span>, <span class="hljs-string">'July'</span>],
          <span class="hljs-attr">datasets</span>: [
            {
              <span class="hljs-attr">label</span>: <span class="hljs-string">'Data One'</span>,
              <span class="hljs-attr">borderColor</span>: <span class="hljs-string">'#FC2525'</span>,
              <span class="hljs-attr">pointBackgroundColor</span>: <span class="hljs-string">'white'</span>,
              <span class="hljs-attr">borderWidth</span>: <span class="hljs-number">1</span>,
              <span class="hljs-attr">pointBorderColor</span>: <span class="hljs-string">'white'</span>,
              <span class="hljs-attr">backgroundColor</span>: <span class="hljs-keyword">this</span>.gradient,
              <span class="hljs-attr">data</span>: [<span class="hljs-number">40</span>, <span class="hljs-number">39</span>, <span class="hljs-number">10</span>, <span class="hljs-number">40</span>, <span class="hljs-number">39</span>, <span class="hljs-number">80</span>, <span class="hljs-number">40</span>]
            },{
              <span class="hljs-attr">label</span>: <span class="hljs-string">'Data Two'</span>,
              <span class="hljs-attr">borderColor</span>: <span class="hljs-string">'#05CBE1'</span>,
              <span class="hljs-attr">pointBackgroundColor</span>: <span class="hljs-string">'white'</span>,
              <span class="hljs-attr">pointBorderColor</span>: <span class="hljs-string">'white'</span>,
              <span class="hljs-attr">borderWidth</span>: <span class="hljs-number">1</span>,
              <span class="hljs-attr">backgroundColor</span>: <span class="hljs-keyword">this</span>.gradient2,
              <span class="hljs-attr">data</span>: [<span class="hljs-number">60</span>, <span class="hljs-number">55</span>, <span class="hljs-number">32</span>, <span class="hljs-number">10</span>, <span class="hljs-number">2</span>, <span class="hljs-number">12</span>, <span class="hljs-number">53</span>]
            }
          ]
        }, {<span class="hljs-attr">responsive</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">maintainAspectRatio</span>: <span class="hljs-literal">false</span>})
    
      }
    })</code></pre>
<h2 id="articleHeader4">最后一步</h2>
<p>最后一步是给 App.vue 的容器添加一些样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .Chart {
      background: #212733;
      border-radius: 15px;
      box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
      margin:  25px 0;
    }
    
    .Chart h2 {
      margin-top: 0;
      padding: 15px 0;
      color:  rgba(255, 0,0, 0.5);
      border-bottom: 1px solid #323d54;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS">    <span class="hljs-selector-class">.Chart</span> {
      <span class="hljs-attribute">background</span>: <span class="hljs-number">#212733</span>;
      <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">15px</span>;
      <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">2px</span> <span class="hljs-number">15px</span> <span class="hljs-built_in">rgba</span>(25, 25, 25, 0.27);
      <span class="hljs-attribute">margin</span>:  <span class="hljs-number">25px</span> <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-class">.Chart</span> <span class="hljs-selector-tag">h2</span> {
      <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span> <span class="hljs-number">0</span>;
      <span class="hljs-attribute">color</span>:  <span class="hljs-built_in">rgba</span>(255, 0,0, 0.5);
      <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#323d54</span>;
    }</code></pre>
<h2 id="articleHeader5">最终结果</h2>
<p>最终结果如图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009049816?w=1000&amp;h=424" src="https://static.alili.tech/img/remote/1460000009049816?w=1000&amp;h=424" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Happy Coding！如果本文对你有帮助，欢迎关注我的专栏-<a href="https://zhuanlan.zhihu.com/qianduandaha" rel="nofollow noreferrer" target="_blank">前端大哈</a>，定期发布高质量前端文章。</p>
<hr>
<p>我最近正在写一本<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">《React.js 小书》</a>，对 React.js 感兴趣的童鞋，<a href="http://huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">欢迎指点</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Vue.js 和 Chart.js 制作绚丽多彩的图表

## 原文链接
[https://segmentfault.com/a/1190000009049813](https://segmentfault.com/a/1190000009049813)

