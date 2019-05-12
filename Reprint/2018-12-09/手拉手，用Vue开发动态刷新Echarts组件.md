---
title: '手拉手，用Vue开发动态刷新Echarts组件' 
date: 2018-12-09 2:30:08
hidden: true
slug: mikv9k3ksg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>从几年前流行的jQuery插件，到现在React和Vue的组件，在业务需求的开发中抽象通用出通用的模块，一直都是一个对个人技术提高非常有帮助的事情。本文从一个真实业务组件的开发，来介绍封装一个组件应该如何从哪些方面去思考，以及在使用框架开发的今天，核心基础知识的重要性。</blockquote>
<h2 id="articleHeader0">需求背景</h2>
<p>dashboard作为目前企业中后台产品的“门面”，如何更加实时、高效、炫酷的对统计数据进行展示，是值得前端开发工程师和UI设计师共同思考的一个问题。今天就从0开始，封装一个动态渲染数据的Echarts折线图组件，抛砖引玉，一起来思考更多有意思的组件。</p>
<h2 id="articleHeader1">准备工作</h2>
<h4>项目结构搭建</h4>
<p>因为生产需要（其实是懒），所以本教程使用了 ==vue-cli==进行了项目的基础结构搭建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli
vue init webpack vue-charts
cd vue-charts
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install -g vue-cli
vue init webpack vue-charts
<span class="hljs-built_in">cd</span> vue-charts
npm run dev</code></pre>
<h4>安装Echarts</h4>
<p>直接使用npm进行安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install echarts --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install echarts --save</code></pre>
<h4>引入Echarts</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在main.js加入下面两行代码
import echarts from 'echarts'
Vue.prototype.$echarts = echarts //将echarts注册成Vue的全局属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//在main.js加入下面两行代码</span>
<span class="hljs-keyword">import</span> echarts <span class="hljs-keyword">from</span> <span class="hljs-string">'echarts'</span>
Vue.prototype.$echarts = echarts <span class="hljs-comment">//将echarts注册成Vue的全局属性</span></code></pre>
<p>到此，准备工作已经完成了。</p>
<h2 id="articleHeader2">静态组件开发</h2>
<p>因为被《React编程思想》这篇文章毒害太深，所以笔者开发组件也习惯从基础到高级逐步迭代。</p>
<p>静态组件要实现的目的很简单，就是把Echarts图表，渲染到页面上。</p>
<h4>新建Chart.vue文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div :id=&quot;id&quot; :style=&quot;style&quot;></div>
</template>
<script>
export default {
  name: &quot;Chart&quot;,
  data() {
    return {
      //echarts实例
      chart: &quot;&quot;
    };
  },
  props: {
    //父组件需要传递的参数：id，width，height，option
    id: {
      type: String
    },
    width: {
      type: String,
      default: &quot;100%&quot;
    },
    height: {
      type: String,
      default: &quot;300px&quot;
    },
    option: {
      type: Object,
      //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
      //使用闭包保证一个vue实例拥有自己的一份props
      default() {
        return {
          title: {
            text: &quot;vue-Echarts&quot;
          },
          legend: {
            data: [&quot;销量&quot;]
          },
          xAxis: {
            data: [&quot;衬衫&quot;, &quot;羊毛衫&quot;, &quot;雪纺衫&quot;, &quot;裤子&quot;, &quot;高跟鞋&quot;, &quot;袜子&quot;]
          },
          yAxis: [
            {
              type: &quot;value&quot;
            }
          ],
          series: [
            {
              name: &quot;销量&quot;,
              type: &quot;line&quot;,
              data: [5, 20, 36, 10, 10, 70]
            }
          ]
        };
      }
    }
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
    }
  }
};
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="vue"><span class="hljs-params">&lt;template&gt;</span>
  <span class="hljs-params">&lt;div :id="id" :style="style"&gt;</span><span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/template&gt;</span>
<span class="hljs-params">&lt;script&gt;</span>
export <span class="hljs-class">default </span>{
<span class="hljs-symbol">  name:</span> <span class="hljs-string">"Chart"</span>,
  data() {
    <span class="hljs-class">return </span>{
      <span class="hljs-comment">//echarts实例</span>
<span class="hljs-symbol">      chart:</span> <span class="hljs-string">""</span>
    };
  },
<span class="hljs-symbol">  props:</span> {
    <span class="hljs-comment">//父组件需要传递的参数：id，width，height，option</span>
<span class="hljs-symbol">    id:</span> {
<span class="hljs-symbol">      type:</span> String
    },
<span class="hljs-symbol">    width:</span> {
<span class="hljs-symbol">      type:</span> String,
<span class="hljs-symbol">      default:</span> <span class="hljs-string">"100%"</span>
    },
<span class="hljs-symbol">    height:</span> {
<span class="hljs-symbol">      type:</span> String,
<span class="hljs-symbol">      default:</span> <span class="hljs-string">"300px"</span>
    },
<span class="hljs-symbol">    option:</span> {
<span class="hljs-symbol">      type:</span> Object,
      <span class="hljs-comment">//Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，</span>
      <span class="hljs-comment">//使用闭包保证一个vue实例拥有自己的一份props</span>
      default() {
        <span class="hljs-class">return </span>{
<span class="hljs-symbol">          title:</span> {
<span class="hljs-symbol">            text:</span> <span class="hljs-string">"vue-Echarts"</span>
          },
<span class="hljs-symbol">          legend:</span> {
<span class="hljs-symbol">            data:</span> [<span class="hljs-string">"销量"</span>]
          },
<span class="hljs-symbol">          xAxis:</span> {
<span class="hljs-symbol">            data:</span> [<span class="hljs-string">"衬衫"</span>, <span class="hljs-string">"羊毛衫"</span>, <span class="hljs-string">"雪纺衫"</span>, <span class="hljs-string">"裤子"</span>, <span class="hljs-string">"高跟鞋"</span>, <span class="hljs-string">"袜子"</span>]
          },
<span class="hljs-symbol">          yAxis:</span> [
            {
<span class="hljs-symbol">              type:</span> <span class="hljs-string">"value"</span>
            }
          ],
<span class="hljs-symbol">          series:</span> [
            {
<span class="hljs-symbol">              name:</span> <span class="hljs-string">"销量"</span>,
<span class="hljs-symbol">              type:</span> <span class="hljs-string">"line"</span>,
<span class="hljs-symbol">              data:</span> [<span class="hljs-number">5</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">70</span>]
            }
          ]
        };
      }
    }
  },
<span class="hljs-symbol">  computed:</span> {
    style() {
      <span class="hljs-class">return </span>{
<span class="hljs-symbol">        height:</span> this.height,
<span class="hljs-symbol">        width:</span> this.width
      };
    }
  },
  mounted() {
    this.init();
  },
<span class="hljs-symbol">  methods:</span> {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
    }
  }
};
<span class="hljs-params">&lt;/script&gt;</span>
</code></pre>
<p>上述文件就实现了将一个简单折线图渲染到页面的组件，怎么样是不是很简单？最简使用方法如下：</p>
<h4>App.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <Chart id=&quot;test&quot;/>
  </div>
</template>

<script>
import Chart from &quot;./components/Chart&quot;;
export default {
  name: &quot;App&quot;,
  data() {},
  components: {
    Chart
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Chart <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/Chart"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  name: "App",
  data() {}</span><span class="xml"><span class="undefined">,
  components: </span></span><span class="hljs-template-variable">{
    Chart
  }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>至此，运行程序你应该能看到以下效果：<br><span class="img-wrap"><img data-src="/img/bV6u11?w=923&amp;h=354" src="https://static.alili.tech/img/bV6u11?w=923&amp;h=354" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">第一次迭代</h2>
<p>现在我们已经有了一个基础版本，让我们来看看哪些方面做的还不尽如人意：</p>
<ol>
<li>图表无法根据窗口大小进行自动缩放，虽然设置了宽度为100%，但是只有刷新页面图表才会重新进行渲染，这会让用户体验变得很差。</li>
<li>图表目前无法实现数据自动刷新</li>
</ol>
<p>下面我们来实现这两点：</p>
<h4>自动缩放</h4>
<p>Echarts本身是不支持自动缩放的，但是Echarts为我们提供了resize方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在init方法中加入下面这行代码
window.addEventListener(&quot;resize&quot;, this.chart.resize);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//在init方法中加入下面这行代码</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"resize"</span>, <span class="hljs-keyword">this</span>.chart.resize);</code></pre>
<p>只需要这一句，我们就实现了图表跟随窗口大小自适应的需求。</p>
<h4>支持数据自动刷新</h4>
<p>因为Echarts是数据驱动的，这意味着只要我们重新设置数据，那么图表就会随之重新渲染，这是实现本需求的基础。我们再设想一下，如果想要支持数据的自动刷新，必然需要一个监听器能够实时监听到数据的变化然后告知Echarts重新设置数据。所幸Vue为我们提供了<code>watcher</code>功能，通过它我们可以很方便的实现上述功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在Chart.vue中加入watch
  watch: {
    //观察option的变化
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal);
          } else {
            this.chart.setOption(oldVal);
          }
        } else {
            this.init();
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//在Chart.vue中加入watch</span>
  watch: {
    <span class="hljs-comment">//观察option的变化</span>
    option: {
      handler(newVal, oldVal) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.chart) {
          <span class="hljs-keyword">if</span> (newVal) {
            <span class="hljs-keyword">this</span>.chart.setOption(newVal);
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.chart.setOption(oldVal);
          }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.init();
        }
      },
      <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">//对象内部属性的监听，关键。</span>
    }
  }</code></pre>
<p>上面代码就实现了我们对option对象中属性变化的监听，一旦option中的数据有了变化，那么图表就会重新渲染。</p>
<h2 id="articleHeader4">实现动态刷新</h2>
<p>下一步我想大家都知道了，就是定时从后台拉取数据，然后更新父组件的option就好。这个地方有两个问题需要思考一下：</p>
<ol>
<li>如果图表要求每秒增加一个数据，应该如何进行数据的请求才能达到性能与用户体验的平衡？</li>
<li>动态更新数据的代码，应该放在父组件还是子组件？</li>
</ol>
<p>对第一个问题，每秒实时获取服务器的数据，肯定是最精确的，这就有两种方案：</p>
<ul>
<li>每秒向后台请求一次</li>
<li>保持长连接，后台每秒向前端推送一次数据</li>
</ul>
<p>第一种方案无疑对性能和资源产生了极大的浪费；除非实时性要求特别高（股票系统），否则不推荐这种方式；</p>
<p>第二种方案需要使用web Socket，但在服务端需要进行额外的开发工作。</p>
<p>笔者基于项目的实际需求（实时性要求不高，且后台生成数据也有一定的延迟性），采用了以下方案：</p>
<ol>
<li>前端每隔一分钟向后台请求一次数据，且为当前时间的上一分钟的数据；</li>
<li>前端将上述数据每隔一秒向图表set一次数据</li>
</ol>
<p>关于第二个问题：笔者更倾向于将Chart组件设计成纯组件，即只接收父组件传递的数据进行变化，不在内部进行复杂操作；这也符合目前前端MVVM框架的最佳实践；而且若将数据传递到Chart组件内部再进行处理，一是遇到不需要动态渲染的需求还需要对组件进行额外处理，二是要在Chart内部做ajax操作，这样就导致Chart完全没有了可复用性。</p>
<p>接下来我们修改App.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <Chart id=&quot;test&quot; :option=&quot;option&quot;/>
  </div>
</template>

<template>
  <div id=&quot;app&quot;>
    <Chart id=&quot;test&quot; :option=&quot;option&quot;/>
  </div>
</template>

<script>
import Chart from &quot;./components/Chart&quot;;
export default {
  name: &quot;App&quot;,
  data() {
    return {
      //笔者使用了mock数据代表从服务器获取的数据
      chartData: {
        xData: [&quot;衬衫&quot;, &quot;羊毛衫&quot;, &quot;雪纺衫&quot;, &quot;裤子&quot;, &quot;高跟鞋&quot;, &quot;袜子&quot;],
        sData: [5, 20, 36, 10, 10, 70]
      },
      option: {
        title: {
          text: &quot;vue-Echarts&quot;
        },
        legend: {
          data: [&quot;销量&quot;]
        },
        xAxis: {
          data: [&quot;衬衫&quot;, &quot;羊毛衫&quot;, &quot;雪纺衫&quot;, &quot;裤子&quot;, &quot;高跟鞋&quot;, &quot;袜子&quot;]
        },
        yAxis: [
          {
            type: &quot;value&quot;
          }
        ],
        series: [
          {
            name: &quot;销量&quot;,
            type: &quot;line&quot;,
            data: [5, 20, 36, 10, 10, 70]
          }
        ]
      }
    };
  },
  components: {
    Chart
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    //添加refreshData方法进行自动设置数据
    refreshData() {
      //横轴数据
      let xData = this.chartData.xData,
        //系列值
        sData = this.chartData.sData;
      for (let i = 0; i < xData.length; i++) {
        //此处使用let是关键，也可以使用闭包。原理不再赘述
        setTimeout(() => {
          this.option.xAxis.data.push(xData[i]);
          this.option.series[0].data.push(sData[i]);
        }, 1000 * i); //此处要理解为什么是1000*i
      }
    }
  }
};
</script>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"option"</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"option"</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Chart <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/Chart"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"App"</span>,
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">//笔者使用了mock数据代表从服务器获取的数据</span>
      chartData: {
        <span class="hljs-attr">xData</span>: [<span class="hljs-string">"衬衫"</span>, <span class="hljs-string">"羊毛衫"</span>, <span class="hljs-string">"雪纺衫"</span>, <span class="hljs-string">"裤子"</span>, <span class="hljs-string">"高跟鞋"</span>, <span class="hljs-string">"袜子"</span>],
        <span class="hljs-attr">sData</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">70</span>]
      },
      <span class="hljs-attr">option</span>: {
        <span class="hljs-attr">title</span>: {
          <span class="hljs-attr">text</span>: <span class="hljs-string">"vue-Echarts"</span>
        },
        <span class="hljs-attr">legend</span>: {
          <span class="hljs-attr">data</span>: [<span class="hljs-string">"销量"</span>]
        },
        <span class="hljs-attr">xAxis</span>: {
          <span class="hljs-attr">data</span>: [<span class="hljs-string">"衬衫"</span>, <span class="hljs-string">"羊毛衫"</span>, <span class="hljs-string">"雪纺衫"</span>, <span class="hljs-string">"裤子"</span>, <span class="hljs-string">"高跟鞋"</span>, <span class="hljs-string">"袜子"</span>]
        },
        <span class="hljs-attr">yAxis</span>: [
          {
            <span class="hljs-attr">type</span>: <span class="hljs-string">"value"</span>
          }
        ],
        <span class="hljs-attr">series</span>: [
          {
            <span class="hljs-attr">name</span>: <span class="hljs-string">"销量"</span>,
            <span class="hljs-attr">type</span>: <span class="hljs-string">"line"</span>,
            <span class="hljs-attr">data</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">70</span>]
          }
        ]
      }
    };
  },
  <span class="hljs-attr">components</span>: {
    Chart
  },
  mounted() {
    <span class="hljs-keyword">this</span>.refreshData();
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">//添加refreshData方法进行自动设置数据</span>
    refreshData() {
      <span class="hljs-comment">//横轴数据</span>
      <span class="hljs-keyword">let</span> xData = <span class="hljs-keyword">this</span>.chartData.xData,
        <span class="hljs-comment">//系列值</span>
        sData = <span class="hljs-keyword">this</span>.chartData.sData;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; xData.length; i++) {
        <span class="hljs-comment">//此处使用let是关键，也可以使用闭包。原理不再赘述</span>
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.option.xAxis.data.push(xData[i]);
          <span class="hljs-keyword">this</span>.option.series[<span class="hljs-number">0</span>].data.push(sData[i]);
        }, <span class="hljs-number">1000</span> * i); <span class="hljs-comment">//此处要理解为什么是1000*i</span>
      }
    }
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


</code></pre>
<p>至此我们就实现了图表动态数据加载，效果如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bV6u19?w=600&amp;h=326" src="https://static.alili.tech/img/bV6u19?w=600&amp;h=326" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">总结</h2>
<p>这篇教程通过一个动态图表的开发，传递了以下信息：</p>
<ul>
<li>Echarts如何与Vue结合使用</li>
<li>Vue组件开发、纯组件与“脏”组件的区别</li>
<li>Vue watch的用法</li>
<li>let的特性</li>
<li>JavaScript EventLoop特性</li>
<li>...</li>
</ul>
<p>大家可以根据这个列表查漏补缺。</p>
<h2 id="articleHeader6">后续优化</h2>
<p>这个组件还有需要需要优化的点，比如：</p>
<ol>
<li>间隔时间应该可配置</li>
<li>每分钟从后台获取数据，那么图表展示的数据将会越来越多，越来越密集，浏览器负担越来越大，直到崩溃</li>
<li>没有设置暂停图表刷新的按钮</li>
<li>...</li>
</ol>
<p>期待大家自己动手，开发一个属于自己的“完美”的Echarts动态组件！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手拉手，用Vue开发动态刷新Echarts组件

## 原文链接
[https://segmentfault.com/a/1190000013903264](https://segmentfault.com/a/1190000013903264)

