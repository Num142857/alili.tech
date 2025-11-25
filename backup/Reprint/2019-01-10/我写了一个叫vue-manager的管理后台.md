---
title: '我写了一个叫vue-manager的管理后台' 
date: 2019-01-10 2:30:08
hidden: true
slug: vycv81glxm
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010060696?w=400&amp;h=400" src="https://static.alili.tech/img/remote/1460000010060696?w=400&amp;h=400" alt="index.less" title="index.less" style="cursor: pointer; display: inline;"></span></p>
<p>这是我在学完Vue后写的个人项目(也是我的第二个 个人项目), 在此分享给大家学习使用。<br>这是一个以Vue2.0为框架，结合 iView 和 ECharts 的后台组件， 可以说是在 iView 基础上的进一步组件化。<br>默认的主题沿用vue的官方主题绿, logo的设计也是用 vue的官方logo 简单变形得到 M 的形状。</p>
<p>希望可以帮助使用者快速搭建基于Vue2.0的管理后台。</p>
<p>项目地址 <a href="https://github.com/luosijie/vue-manager" rel="nofollow noreferrer" target="_blank">https://github.com/luosijie/vue-manager</a></p>
<p>预览地址 <a href="https://luosijie.github.io/vue-manager/" rel="nofollow noreferrer" target="_blank">https://luosijie.github.io/vue-manager</a></p>
<h2 id="articleHeader0">安装</h2>
<ol>
<li><p>安装 Node / npm(cnpm)</p></li>
<li><p>git clone "https://github.com/luosijie/vue-manager"</p></li>
<li><p>cpm install</p></li>
<li><p>cpm run dev</p></li>
<li><p>访问 localhost:8080</p></li>
</ol>
<h2 id="articleHeader1">依赖</h2>
<ol>
<li><p>Vue2.0</p></li>
<li><p>iView</p></li>
<li><p>eCharts</p></li>
</ol>
<h2 id="articleHeader2">实现的功能</h2>
<blockquote><p>目前实现一些基本的信息展示和数据表格操作组件，希望以后有机会继续增加</p></blockquote>
<ol>
<li><p>信息总览</p></li>
<li><p>用户面板</p></li>
<li><p>工作进度</p></li>
<li><p>时间轴</p></li>
<li><p>天气面板</p></li>
<li><p>留言面板</p></li>
<li><p>基本表格</p></li>
<li><p>可编辑表格</p></li>
<li><p>图表</p></li>
<li><p>...</p></li>
</ol>
<h2 id="articleHeader3">全局样式定义</h2>
<blockquote><p>全局样式的自定义沿用iView的主题定制方法, 可在文件夹src下的theme/index.less定义样式</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010060697?w=313&amp;h=95" src="https://static.alili.tech/img/remote/1460000010060697?w=313&amp;h=95" alt="theme" title="theme" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010060698?w=490&amp;h=421" src="https://static.alili.tech/img/remote/1460000010060698?w=490&amp;h=421" alt="index.less" title="index.less" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">组件使用</h2>
<blockquote><p>每个组件都有完整的UI样式和基本的交互，使用者只需要在组件外部绑定数据即可</p></blockquote>
<h3 id="articleHeader5">目录</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010060699?w=289&amp;h=476" src="https://static.alili.tech/img/remote/1460000010060699?w=289&amp;h=476" alt="组件目录" title="组件目录" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">举例</h3>
<blockquote><p>具体每个组件的使用可以查看Demo(项目文件夹的 Src目录) 和 vm-组件里的props属性</p></blockquote>
<h4>vm-progress</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010060700?w=1257&amp;h=308" src="https://static.alili.tech/img/remote/1460000010060700?w=1257&amp;h=308" alt="vm-progress" title="vm-progress" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<VmProgress title=&quot;工作进度&quot; :data=&quot;dataProgress&quot;></VmProgress>
...

export default {
  data: function () {
   return dataProgress: [
      {
        name: 'Jesse Luo',
        tags: ['很帅', '逗比'],
        value: 90
      },
      {
        name: 'Angla Cool',
        tags: ['美丽', '感性', '文艺'],
        value: 30
      },
      {
        name: 'lele Wang',
        tags: ['气质', '厉害'],
        value: 80
      },
      {
        name: 'Jesse Ca',
        tags: ['才女', '努力', '博学'],
        value: 20
      },
      {
        name: 'Jesse Lee',
        tags: ['很帅', '牛逼'],
        value: 100
      }
    ],
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;VmProgress title=<span class="hljs-string">"工作进度"</span> :data=<span class="hljs-string">"dataProgress"</span>&gt;&lt;/VmProgress&gt;
...

export default {
  dat<span class="hljs-variable">a:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
   <span class="hljs-keyword">return</span> dataProgres<span class="hljs-variable">s:</span> [
      {
        name: <span class="hljs-string">'Jesse Luo'</span>,
        <span class="hljs-keyword">tag</span><span class="hljs-variable">s:</span> [<span class="hljs-string">'很帅'</span>, <span class="hljs-string">'逗比'</span>],
        value: <span class="hljs-number">90</span>
      },
      {
        name: <span class="hljs-string">'Angla Cool'</span>,
        <span class="hljs-keyword">tag</span><span class="hljs-variable">s:</span> [<span class="hljs-string">'美丽'</span>, <span class="hljs-string">'感性'</span>, <span class="hljs-string">'文艺'</span>],
        value: <span class="hljs-number">30</span>
      },
      {
        name: <span class="hljs-string">'lele Wang'</span>,
        <span class="hljs-keyword">tag</span><span class="hljs-variable">s:</span> [<span class="hljs-string">'气质'</span>, <span class="hljs-string">'厉害'</span>],
        value: <span class="hljs-number">80</span>
      },
      {
        name: <span class="hljs-string">'Jesse Ca'</span>,
        <span class="hljs-keyword">tag</span><span class="hljs-variable">s:</span> [<span class="hljs-string">'才女'</span>, <span class="hljs-string">'努力'</span>, <span class="hljs-string">'博学'</span>],
        value: <span class="hljs-number">20</span>
      },
      {
        name: <span class="hljs-string">'Jesse Lee'</span>,
        <span class="hljs-keyword">tag</span><span class="hljs-variable">s:</span> [<span class="hljs-string">'很帅'</span>, <span class="hljs-string">'牛逼'</span>],
        value: <span class="hljs-number">100</span>
      }
    ],
  }
}
</code></pre>
<h3 id="articleHeader7">vm-timeline</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010060701?w=1114&amp;h=547" src="https://static.alili.tech/img/remote/1460000010060701?w=1114&amp;h=547" alt="vm-timeline" title="vm-timeline" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<VmTimeline :data=&quot;dataTimeline&quot;></VmTimeline>
...

export default {
  data: function () {
    return {
      dataTimeline: [
        {
          date: '2017年7月15日',
          time: '8:35 am',
          content: 'Lorem ipsum dolor sit amet consiquest dio'
        },
        {
          date: '2017年7月15日',
          time: '8:35 am',
          content: 'Lorem ipsum dolor sit amet consiquest dio'
        },
        {
          date: '2017年7月15日',
          time: '8:35 am',
          content: 'Lorem ipsum dolor sit amet consiquest dio'
        },
        {
          date: '2017年7月15日',
          time: '8:35 am',
          content: 'Lorem ipsum dolor sit amet consiquest dio'
        },
        {
          date: '2017年7月15日',
          time: '8:35 am',
          content: 'Lorem ipsum dolor sit amet consiquest dio'
        }
      ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;VmTimeline :data=<span class="hljs-string">"dataTimeline"</span>&gt;&lt;/VmTimeline&gt;
...

export default {
  data: function () {
    return {
      dataTimeline: [
        {
          date: <span class="hljs-string">'2017年7月15日'</span>,
          <span class="hljs-selector-tag">time</span>: <span class="hljs-string">'8:35 am'</span>,
          <span class="hljs-attribute">content</span>: <span class="hljs-string">'Lorem ipsum dolor sit amet consiquest dio'</span>
        },
        {
          date: <span class="hljs-string">'2017年7月15日'</span>,
          <span class="hljs-selector-tag">time</span>: <span class="hljs-string">'8:35 am'</span>,
          <span class="hljs-attribute">content</span>: <span class="hljs-string">'Lorem ipsum dolor sit amet consiquest dio'</span>
        },
        {
          date: <span class="hljs-string">'2017年7月15日'</span>,
          <span class="hljs-selector-tag">time</span>: <span class="hljs-string">'8:35 am'</span>,
          <span class="hljs-attribute">content</span>: <span class="hljs-string">'Lorem ipsum dolor sit amet consiquest dio'</span>
        },
        {
          date: <span class="hljs-string">'2017年7月15日'</span>,
          <span class="hljs-selector-tag">time</span>: <span class="hljs-string">'8:35 am'</span>,
          <span class="hljs-attribute">content</span>: <span class="hljs-string">'Lorem ipsum dolor sit amet consiquest dio'</span>
        },
        {
          date: <span class="hljs-string">'2017年7月15日'</span>,
          <span class="hljs-selector-tag">time</span>: <span class="hljs-string">'8:35 am'</span>,
          <span class="hljs-attribute">content</span>: <span class="hljs-string">'Lorem ipsum dolor sit amet consiquest dio'</span>
        }
      ]
    }
  }
}</code></pre>
<h3 id="articleHeader8">vm-chart-bar-line</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010060702?w=834&amp;h=410" src="https://static.alili.tech/img/remote/1460000010060702?w=834&amp;h=410" alt="vm-chart-bar-line" title="vm-chart-bar-line" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<VmChartBarLine  title=&quot;二维柱形图&quot; :xAxisData=&quot;dataBar2.xAxisData&quot; :series=&quot;dataBar2.series&quot;>
</VmChartBarLine>
...

export default {
  data: function () {
    return {
      dataBar2: {
        xAxisData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [50, 200, 360, 100, 100, 200]
          },
          {
            name: '增长量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;VmChartBarLine  title=<span class="hljs-string">"二维柱形图"</span> :xAxisData=<span class="hljs-string">"dataBar2.xAxisData"</span> :series=<span class="hljs-string">"dataBar2.series"</span>&gt;
&lt;/VmChartBarLine&gt;
...

export default {
  dat<span class="hljs-variable">a:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">return</span> {
      dataBar2: {
        xAxisDat<span class="hljs-variable">a:</span> [<span class="hljs-string">'衬衫'</span>, <span class="hljs-string">'羊毛衫'</span>, <span class="hljs-string">'雪纺衫'</span>, <span class="hljs-string">'裤子'</span>, <span class="hljs-string">'高跟鞋'</span>, <span class="hljs-string">'袜子'</span>],
        serie<span class="hljs-variable">s:</span> [
          {
            name: <span class="hljs-string">'销量'</span>,
            <span class="hljs-built_in">type</span>: <span class="hljs-string">'bar'</span>,
            dat<span class="hljs-variable">a:</span> [<span class="hljs-number">50</span>, <span class="hljs-number">200</span>, <span class="hljs-number">360</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>, <span class="hljs-number">200</span>]
          },
          {
            name: <span class="hljs-string">'增长量'</span>,
            <span class="hljs-built_in">type</span>: <span class="hljs-string">'bar'</span>,
            dat<span class="hljs-variable">a:</span> [<span class="hljs-number">5</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">20</span>]
          }
        ]
      },
    }
  }
}</code></pre>
<h3 id="articleHeader9">vm-table</h3>
<p>vm-table的可编辑模式可以实现数据的增删改,<br>分别通过</p>
<p>增: v-on:add-ok="add"<br>删: v-on:delete-ok="deletefn"&gt;<br>改: v-on:delete-ok="deletefn"&gt;</p>
<p>来实现</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010060703?w=1691&amp;h=769" src="https://static.alili.tech/img/remote/1460000010060703?w=1691&amp;h=769" alt="vm-table" title="vm-table" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<VmTable title=&quot;可编辑表格&quot; 
         type=&quot;edit&quot; 
         :columns=&quot;dataColumns&quot; 
         :data=&quot;dataTable&quot;
         v-on:add-ok=&quot;add&quot;
         v-on:edit-ok=&quot;edit&quot;
         v-on:delete-ok=&quot;deletefn&quot;>
</VmTable>
...

export default {
  methods: {
    add: function (data) {
      //...
    },
    edit: function (data) {
      //...
    },
    deletefn: function (data) {
      //...
    }
  },
  data: function () {
    return {
      dataColumns: [
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      dataTable: [
        {
          id: '65416s843154',
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          id: '6541684q6534',
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },

        ...

        {
          id: '65419843f154',
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;VmTable title=<span class="hljs-string">"可编辑表格"</span> 
         <span class="hljs-built_in">type</span>=<span class="hljs-string">"edit"</span> 
         :columns=<span class="hljs-string">"dataColumns"</span> 
         :data=<span class="hljs-string">"dataTable"</span>
         v-<span class="hljs-keyword">on</span>:<span class="hljs-built_in">add</span>-ok=<span class="hljs-string">"add"</span>
         v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">edit</span>-ok=<span class="hljs-string">"edit"</span>
         v-<span class="hljs-keyword">on</span>:<span class="hljs-keyword">delete</span>-ok=<span class="hljs-string">"deletefn"</span>&gt;
&lt;/VmTable&gt;
...

export default {
  method<span class="hljs-variable">s:</span> {
    <span class="hljs-built_in">add</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
      //...
    },
    edi<span class="hljs-variable">t:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
      //...
    },
    deletefn: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(data)</span> {</span>
      //...
    }
  },
  dat<span class="hljs-variable">a:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">return</span> {
      dataColumn<span class="hljs-variable">s:</span> [
        {
          title: <span class="hljs-string">'编号'</span>,
          key: <span class="hljs-string">'id'</span>
        },
        {
          title: <span class="hljs-string">'姓名'</span>,
          key: <span class="hljs-string">'name'</span>
        },
        {
          title: <span class="hljs-string">'年龄'</span>,
          key: <span class="hljs-string">'age'</span>
        },
        {
          title: <span class="hljs-string">'地址'</span>,
          key: <span class="hljs-string">'address'</span>
        }
      ],
      dataTable: [
        {
          id: <span class="hljs-string">'65416s843154'</span>,
          name: <span class="hljs-string">'王小明'</span>,
          age: <span class="hljs-number">18</span>,
          addres<span class="hljs-variable">s:</span> <span class="hljs-string">'北京市朝阳区芍药居'</span>
        },
        {
          id: <span class="hljs-string">'6541684q6534'</span>,
          name: <span class="hljs-string">'张小刚'</span>,
          age: <span class="hljs-number">25</span>,
          addres<span class="hljs-variable">s:</span> <span class="hljs-string">'北京市海淀区西二旗'</span>
        },

        ...

        {
          id: <span class="hljs-string">'65419843f154'</span>,
          name: <span class="hljs-string">'周小伟'</span>,
          age: <span class="hljs-number">26</span>,
          addres<span class="hljs-variable">s:</span> <span class="hljs-string">'深圳市南山区深南大道'</span>
        }
      ]
    }
  }
}</code></pre>
<blockquote><p>先这样了 欢迎大家star</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我写了一个叫vue-manager的管理后台

## 原文链接
[https://segmentfault.com/a/1190000010060691](https://segmentfault.com/a/1190000010060691)

