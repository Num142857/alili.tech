---
title: 'Vue.js 实践（2）：实现多条件筛选、搜索、排序及分页的表格功能' 
date: 2019-02-09 2:30:59
hidden: true
slug: rnfjs5lwdld
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>与上周的<a href="https://segmentfault.com/a/1190000005351971">第一篇实践教程</a>一样，在这篇文章中，我将继续从一种常见的功能——表格入手，展示Vue.js中的一些优雅特性。同时也将对filter功能与computed属性进行对比，说明各自的适用场景，也为vue2.0版本中即将删除的部分filter功能做准备。</p></blockquote>
<h2 id="articleHeader0">需求分析</h2>
<p>还是先从需求入手，想想实现这样一个功能需要注意什么、大致流程如何、有哪些应用场景。</p>
<ol>
<li><p>表格本身是一种非常常用的组件，用于展示一些复杂的数据时表现很好。</p></li>
<li><p>当数据比较多时，我们需要提供一些筛选条件，让用户更快列出他们关注的数据。</p></li>
<li><p>除了预设的一些筛选条件，可能还需要一些个性化的输入搜索功能。</p></li>
<li><p>对于有明显顺序关系的数据，例如排名、价格等，还需要排序功能方便快速倒置数据。</p></li>
<li><p>如果数据量较大，需要分页展示表格。</p></li>
</ol>
<p><strong>需要注意的是，上述的这些需求其实和大部分数据库提供的功能是非常一致的，而且由于数据库拥有索引等优化方式以及服务器更好的性能，更加适合处理这些需求。</strong>不过现在流行的前后端分离，也是希望让客户端在合理的范围内，更多的分担服务器端的压力，所以当找到一个平衡时，在前端处理适量的需求是正确的选择。</p>
<p>接下来就尝试用vue完成这些需求吧。</p>
<h2 id="articleHeader1">完成Table.vue</h2>
<p>因为这样一个多功能表格可能会应用在多个项目中，所以设计思路上尽量将表格相关的内容放在Table.vue组件中，减少耦合，方便复用。</p>
<h3 id="articleHeader2">获取测试数据</h3>
<p>为了更好的对比前端实现以上需求的利与弊，我们需要一份较大较复杂的测试数据。幸运的是我之前的一个项目中，设计的一份API正好满足这一需求，数据为魔兽世界竞技场的天梯排行API，目前这个API处于开放状态，接口详见<a href="http://bbs.ngacn.cc/read.php?tid=9002261" rel="nofollow noreferrer" target="_blank">Myarena介绍</a>。</p>
<p>与上一篇教程相类似，还是新建一个api文件夹以及一个arena.js用于管理API接口。再在App.vue中引入arena.js，在created阶段获取数据。作为一个demo，我们只获取region为CN、laddar为3v3的数据，不过只要将两个参数通过v-model绑定给对应的表单控件，就能很轻松的实现不同地区数据的切换。</p>
<h3 id="articleHeader3">引入table.vue组件</h3>
<p>如之前所说，思路上我们希望减少table组件与外部环境的耦合，所以我们给Table.vue设置一个props属性rows，用于获取App.vue取回的数据。<br>在App.vue中注册table组建时要注意，命名不能用默认的table，所以注册为vTable，就能用&lt;v-table&gt;标签引入table组件了。</p>
<p>目前为止，我们的App.vue完成了它所有的功能，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;container&quot;>
    <v-table
    :rows=&quot;rows&quot;></v-table>
  </div>
</template>

<script>
import arena from './api/arena'
import vTable from './components/Table'

export default {
  components: { vTable },
  data () {
    return {
      region: 'CN',
      laddar: '3v3',
      rows: []
    }
  },
  methods: {
    getLaddar (region, laddar) {
      arena.getLaddar(region, laddar, (err, val) => {
        if (!err) {
          this.rows = val.rows
        }
      })
    }
  },
  created () {
    this.getLaddar(this.region, this.laddar)
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">v-table</span>
    <span class="hljs-attr">:rows</span>=<span class="hljs-string">"rows"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v-table</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> arena <span class="hljs-keyword">from</span> <span class="hljs-string">'./api/arena'</span>
<span class="hljs-keyword">import</span> vTable <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Table'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: { vTable },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">region</span>: <span class="hljs-string">'CN'</span>,
      <span class="hljs-attr">laddar</span>: <span class="hljs-string">'3v3'</span>,
      <span class="hljs-attr">rows</span>: []
    }
  },
  <span class="hljs-attr">methods</span>: {
    getLaddar (region, laddar) {
      arena.getLaddar(region, laddar, (err, val) =&gt; {
        <span class="hljs-keyword">if</span> (!err) {
          <span class="hljs-keyword">this</span>.rows = val.rows
        }
      })
    }
  },
  created () {
    <span class="hljs-keyword">this</span>.getLaddar(<span class="hljs-keyword">this</span>.region, <span class="hljs-keyword">this</span>.laddar)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>实际的App.vue中还有一个获取API中的最后更新时间的操作，以及一些css设置，篇幅考虑这里进行了省略，对完整代码有兴趣的可以移步文章末尾的Github仓库。</p>
<h3 id="articleHeader4">基础布局</h3>
<p>Table.vue的template中主要为3部分，分别是用于搜索、筛选和分页的表单控件、用于排序表格的表头thead以及用于展示数据的tbody。</p>
<p>首先来完成tbody的部分，基本思路就是用v-for遍历数据，再通过模板填入，需要注意以下几个重点：</p>
<ol>
<li><p>返回的数据不一定完全符合要求。例如我希望实现通过胜率排序，但数据中只包含了胜负场数，需要先计算一次。2. 数据中用于表现玩家职业的数据为classId这个属性，但在实际项目中我想要用各职业的icon展示职业，所以我在utils.js中实现了各一个classIdToIcon的工具函数，用于映射classId至sprite图中的background-position。</p></li>
<li><p>以上两点说明我们最好不要遍历props获得的rows这一原始数据。因此另建了一个computed属性players，并在其中完成了前期处理，我把所有的前期处理放在了handleBefore中。</p></li>
<li><p>由于即将使用的各种filters操作比较复杂，所以在handlebefore中进行了console.log('before handle')，方便我们验证handlebefore在什么阶段被执行了。</p></li>
</ol>
<p>完成布局之后，目前Table.vue中的重点代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <tbody>
    <tr
    v-for=&quot;player of players
    :class=&quot;player.factionId? 'horde':'alliance'&quot;>
      <th>"{{" player.ranking "}}"</th>
      <th>"{{" player.rating "}}"</th>
      <th>
        <span
        class=&quot;class&quot;
        :style=&quot;{ backgroundImage: 'url(http://7xs8rx.com1.z0.glb.clouddn.com/class.png)',
                  backgroundPosition: player.classIcon }&quot;></span>
        "{{" player.name "}}"
      </th>
      <th>"{{" player.realmName "}}"</th>
      <th>
        <bar
        :win=&quot;player.weeklyWins&quot;
        :loss=&quot;player.weeklyLosses&quot;></bar>
      </th>
      <th>
        <bar
        :win=&quot;player.seasonWins&quot;
        :loss=&quot;player.seasonLosses&quot;></bar>
      </th>
    </tr>
  </tbody>
</template>

<script>
import Bar from './Bar'
import { classIdToIcon } from '../assets/utils'

export default {
  components: { Bar },
  props: {
    rows: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    players () {
      this.rows = this.handleBefore(this.rows)
      return this.rows
    }
  },
  methods: {
    handleBefore (arr) {
      console.log('before handle')
      if (this.rows[0]) {
        arr.forEach((item) => {
          if (item.weeklyWins === 0 &amp;&amp; item.weeklyLosses === 0) {
            item.weeklyRate = -1
          } else {
            item.weeklyRate = item.weeklyWins / (item.weeklyWins + item.weeklyLosses)
          }
          if (item.seasonWins === 0 &amp;&amp; item.seasonLosses === 0) {
            item.seasonRate = -1
          } else {
            item.seasonRate = item.seasonWins / (item.seasonWins + item.seasonLosses)
          }
          item.classIcon = classIdToIcon(item.classId)
        })
      }
      return arr
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>
    <span class="hljs-attr">v-for</span>=<span class="hljs-string">"player of players
    :class="</span><span class="hljs-attr">player.factionId</span>? '<span class="hljs-attr">horde</span>'<span class="hljs-attr">:</span>'<span class="hljs-attr">alliance</span>'"&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span></span><span class="hljs-template-variable">"{{" player.ranking "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span></span><span class="hljs-template-variable">"{{" player.rating "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"class"</span>
        <span class="hljs-attr">:style</span>=<span class="hljs-string">"{ backgroundImage: 'url(http://7xs8rx.com1.z0.glb.clouddn.com/class.png)',
                  backgroundPosition: player.classIcon }"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{" player.name "}}"</span><span class="xml">
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span></span><span class="hljs-template-variable">"{{" player.realmName "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">bar</span>
        <span class="hljs-attr">:win</span>=<span class="hljs-string">"player.weeklyWins"</span>
        <span class="hljs-attr">:loss</span>=<span class="hljs-string">"player.weeklyLosses"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">bar</span>
        <span class="hljs-attr">:win</span>=<span class="hljs-string">"player.seasonWins"</span>
        <span class="hljs-attr">:loss</span>=<span class="hljs-string">"player.seasonLosses"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">bar</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Bar <span class="hljs-keyword">from</span> <span class="hljs-string">'./Bar'</span>
<span class="hljs-keyword">import</span> { classIdToIcon } <span class="hljs-keyword">from</span> <span class="hljs-string">'../assets/utils'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: { Bar },
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">rows</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> []
      }
    }
  },
  <span class="hljs-attr">computed</span>: {
    players () {
      <span class="hljs-keyword">this</span>.rows = <span class="hljs-keyword">this</span>.handleBefore(<span class="hljs-keyword">this</span>.rows)
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.rows
    }
  },
  <span class="hljs-attr">methods</span>: {
    handleBefore (arr) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'before handle'</span>)
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.rows[<span class="hljs-number">0</span>]) {
        arr.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (item.weeklyWins === <span class="hljs-number">0</span> &amp;&amp; item.weeklyLosses === <span class="hljs-number">0</span>) {
            item.weeklyRate = <span class="hljs-number">-1</span>
          } <span class="hljs-keyword">else</span> {
            item.weeklyRate = item.weeklyWins / (item.weeklyWins + item.weeklyLosses)
          }
          <span class="hljs-keyword">if</span> (item.seasonWins === <span class="hljs-number">0</span> &amp;&amp; item.seasonLosses === <span class="hljs-number">0</span>) {
            item.seasonRate = <span class="hljs-number">-1</span>
          } <span class="hljs-keyword">else</span> {
            item.seasonRate = item.seasonWins / (item.seasonWins + item.seasonLosses)
          }
          item.classIcon = classIdToIcon(item.classId)
        })
      }
      <span class="hljs-keyword">return</span> arr
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>可以看到，我还引入了一个Bar.vue组件用于展示胜率，这是因为我希望最终的实际效果是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVxMSL" src="https://static.alili.tech/img/bVxMSL" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>一开始我直接在胜率所在的&lt;th&gt;标签中进行各种操作，但可想而知在进行一些边界情况的判断时，会出现各种含有player.weeklyWins, player.weeklyLosses等长命名变量的三元表达式。<br>本来是出于便利考虑，却反而导致代码难以维护。因此新建了个一个bar组件，将胜负传入组件中，在bar组件内部用更语义化的方式实现，Bar.vue中模板部分代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;clear-fix&quot;>
    <span
    v-if=&quot;!hasGame || win / total > 0&quot;
    :style=&quot;{ width: 100 * win / total + '%' }&quot;
    :class=&quot;hasGame? '':'no-game'&quot;
    class=&quot;win-bar&quot;>
      "{{" hasGame? (100 * win / total).toFixed(1) + '%':'无场次' "}}"
    </span>
    <span
    v-if=&quot;loss / total > 0&quot;
    :style=&quot;{ width: 100 * loss / total + '%' }&quot;
    class=&quot;loss-bar&quot;>
      "{{" win === 0? '0%':'' "}}"
    </span>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;template&gt;
  &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"clear-fix"</span>&gt;
    &lt;span
    v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!hasGame || win / total &gt; 0"</span>
    :style=<span class="hljs-string">"{ width: 100 * win / total + '%' }"</span>
    :<span class="hljs-keyword">class</span>=<span class="hljs-string">"hasGame? '':'no-game'"</span>
    <span class="hljs-keyword">class</span>=<span class="hljs-string">"win-bar"</span>&gt;
      "{{" hasGame? (<span class="hljs-number">100</span> * win / total).toFixed(<span class="hljs-number">1</span>) + <span class="hljs-string">'%'</span>:<span class="hljs-string">'无场次'</span> "}}"
    &lt;/span&gt;
    &lt;span
    v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"loss / total &gt; 0"</span>
    :style=<span class="hljs-string">"{ width: 100 * loss / total + '%' }"</span>
    <span class="hljs-keyword">class</span>=<span class="hljs-string">"loss-bar"</span>&gt;
      "{{" win === <span class="hljs-number">0</span>? <span class="hljs-string">'0%'</span>:<span class="hljs-string">''</span> "}}"
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
<p>更好理解和维护了，不是吗？</p>
<blockquote>
<p>在使用vue的过程中，需要注意的是框架中许多方法其实在内部最终是殊途同归。</p>
<p>例如我们可以直接在元素中执行一些对数据的操作，例如@click="show = !show"，同样的我们也可以对事件绑定方法，再在方法中操作数据，例如@click="toggle", toggle () { this.show = !this.show }。还比如我们可以用computed属性和watch属性实现很多相同的功能，接下来还将用computed去实现和filters相同的功能。</p>
<p><strong>vue设计中的灵活性让我们有了更多的可能性，但在学习时，应该以搞明白不同方式在不同场景中的优劣为目标，实际运用时选择最好的那一种。</strong></p>
</blockquote>
<h3 id="articleHeader5">用filters实现需求</h3>
<p>在例子中，players实际是一个5000条数据的数组，在不做任何处理时，将直接渲染出5000个&lt;tr&gt;，所以先赶紧过滤吧！</p>
<p>对于v-for循环，vue中提供了3中filters过滤数组，分别为filterBy, orderBy, limitBy，其功能对应了搜索/筛选、排序和分页，实现分别是使用了Array.filter, Array.sort(), Array.slice()。</p>
<p>这三种filters在使用时非常便利，只要在v-for后用|分离再添加对应的filters即可，这3中filter的具体参数可以查看官方API，这里不多做赘述。</p>
<p>需要注意的是，实际的过程是先将被遍历的数组（例子中的players）<strong>依次</strong>通过过滤器，再将最后一个过滤器返回的数组进行v-for操作。<br>因此，filters放置的顺序是需要根据需求来调整的，也因为每种过滤器的内部实现效率不同，所以在需求优先级不明显时，应该以效率为优先。</p>
<p><strong>注意</strong>：实际测试时，发现不论怎么过滤数组，handleBefore方法都没有再次执行，也就是说players数组并没有被改动过。</p>
<p>例如在我的例子中，我希望可以筛选出名字或者服务器包含了我所输入内容的玩家，并且将他们按照某种方式排序，最后的结果每页只显示20条。<br>那么显然剪切数组永远应该放在最后一步，而排序和过滤在需求中没有明显的优先级。但是大部分情况下，sort的效率都要低于filter，所以我们先进行filter，减少数组长度，再sort。</p>
<p>有了这一思路之后，用于v-for的&lt;tr&gt;变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tr
v-for=&quot;player of players
| filterBy query in 'name' 'realmName'
| orderBy sort.key sort.val
| limitBy 20 (page-1)*20&quot;
:class=&quot;player.factionId? 'horde':'alliance'&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;<span class="hljs-keyword">tr</span>
v-<span class="hljs-keyword">for</span>=<span class="hljs-comment">"player of players</span>
| filterBy query in <span class="hljs-string">'name'</span> <span class="hljs-string">'realmName'</span>
| orderBy <span class="hljs-keyword">sort</span>.key <span class="hljs-keyword">sort</span>.val
| limitBy <span class="hljs-number">20</span> (page-<span class="hljs-number">1</span>)*<span class="hljs-number">20</span><span class="hljs-comment">"</span>
:class=<span class="hljs-string">"player.factionId? 'horde':'alliance'"</span>&gt;</code></pre>
<p>这里直接将各个变量动态化，再通过Table.vue中的input绑定v-model以及表头thead绑定@click事件来改变筛选的条件，就已经实现了大部分的搜索、过滤、分页功能。</p>
<p>表头改变sort排序我是通过以下代码实现的，方式可能不是太好，特此列出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<thead>
  <tr>
    <th
    @click=&quot;sort = {key: 'ranking', val: -sort.val}&quot;>排名</th>
    <th
    @click=&quot;sort = {key: 'rating', val: -sort.val}&quot;>分数</th>
    <th>资料</th>
    <th>服务器</th>
    <th
    @click=&quot;sort = {key: 'weeklyRate', val: -sort.val}&quot;>本周战绩</th>
    <th
    @click=&quot;sort = {key: 'seasonRate', val: -sort.val}&quot;>赛季战绩</th>
  </tr>
</thead>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"sort = </span></span></span><span class="hljs-template-variable">{key: 'ranking', val: -sort.val}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>排名<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"sort = </span></span></span><span class="hljs-template-variable">{key: 'rating', val: -sort.val}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>分数<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>资料<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>服务器<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"sort = </span></span></span><span class="hljs-template-variable">{key: 'weeklyRate', val: -sort.val}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>本周战绩<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"sort = </span></span></span><span class="hljs-template-variable">{key: 'seasonRate', val: -sort.val}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>赛季战绩<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span></span></code></pre>
<p>可以看到，通过vue的filters功能，已经可以轻松完成我们的大部分功能，代码量极少。这也是vue2.0前瞻发布之后，提出废弃部分filters功能后许多人反应较为强烈的原因。<br>但是如同作者在改动说明中所说，filters对于初学者来说不易理解，并且filters的功能都可以用computed属性进行更灵活、更好把控的实现。而且在一些复杂条件下，堆叠过滤器会造成一些额外的复杂性以及不方便之处。</p>
<p>那么何为复杂条件呢？例如我增添两个需求，一是按职业筛选玩家，而是筛选出一定分数以上的玩家，那么后者用filterBy就不太好实现了。<br>我们需要将对分数段的过滤放在filters之前进行，但又要注意不破坏players数组本身。在实际完成时，会发现这个过程还是比较纠结的。</p>
<p>除此之外，我们还会发现分页中最重要的一个信息——总页数我们获取不到。因为vue并没有把一串过滤管道中产出的最终用于v-for的数组暴露出来，所以我们无法获得这个实际被循环的数组的长度。</p>
<p>在实际hack这些需求时，发现很容易与filters的执行顺序发生冲突，因此决定重新用computed属性来实现一遍所有功能，不借助自带的filters。</p>
<p><strong>当然，在这一段的前半部分中，我们显而易见的感受到了来自filters的便利性。如果需求中filters可以满足，那么在1.x版本中使用filters还是十分明智的！</strong></p>
<h3 id="articleHeader6">用computed属性完成需求</h3>
<p>在Github仓库中，我用Table.vue.bak文件储存了之前一段中用filters实现的代码，方便与我们接下里的实现进行比较。</p>
<p>首先整理一下用computed属性来实现的思路：</p>
<ol>
<li><p>首先要实现filterBy, orderBy, limitBy这三个filter的功能，上文中已经提到了他们的内部实现，所以分别用Array.filter, Array.sort和Array.slice重写一遍并不复杂。</p></li>
<li><p>说是computed属性实现，其实也还是只有players这个computed属性，只是在其内部执行了所有的过滤动作，我们实际是把各种过滤器的逻辑放置在各个method中。</p></li>
<li><p>不建议把各个过滤method写的过于抽象，因为就是内置filters高度抽象导致一些特殊需求无法实现，所以不妨就以最针对性的方式：一个method对应一种过滤。</p></li>
<li><p>在执行各个过滤method时，依然有最初提到的顺序带来的效率问题。因为vue<strong>牵一发而动全身</strong>的特性，任何一个过滤条件改变时，所有过滤method都会执行一遍，所以尽快用高效的过滤器缩短数组长度显得更为重要。</p></li>
<li><p>我尝试过通过watch属性实现最小化method调用，但无奈功力不够没能实现。同时我也认为前端处理大量数据的情况很少见，并且用第4点中的数据进行优化后，执行效率不算太低，所以没必要在这个方面做过多纠结。真有性能瓶颈时，从服务器端寻求解决会更简单。</p></li>
</ol>
<p><strong>注意：</strong>在实现各种过滤method时，建议阅读vue中filterBy, orderBy, limitBy三部分的实现源码，其本身对于数组的操作就有一些优化，非常值得学习。在一些特殊情况中，例如数组中大量相等值时，过于简单的sort function会导致执行步数激增，vue中的一些处理都予以了避免。</p>
<p>根据需求目标，我设置了以下这些method（顺序即为执行顺序）：</p>
<ol>
<li><p>classFilter：过滤玩家职业，通过item.classId === this.class进行判断，this.class绑定的是一个select控件。</p></li>
<li><p>queryFilter：匹配玩家姓名中的字段，通过item.name.indexOf(this.query)判断，this.query则绑定一个input控件。</p></li>
<li><p>ratingFilter：筛选玩家分数段，通过item.rating &gt;= this.rating进行判断，this.rating绑定了一个类型为range的input控件，range的范围则是用computed属性进行计算。</p></li>
<li><p>sortTable：因为Array.sort进行的步数较多，所以放在数组被上述3个method处理的较短后进行。</p></li>
<li><p>paginate：所有过滤操作完毕之后，就可以进行分页了。在使用Array.slice()之前，先将数组的长度传给this.total储存起来，用于在分页后计算总的页数。</p></li>
<li><p>除了以上几个过滤method以外，当然也还有handleBefore方法对数组进行前期处理。但是由于players每次都会重新计算，所以为了放止handleBefore被重复执行，应该加上一定的判断条件，例如handleBefore添加的属性是否已经存在了等等。<br>同时，还可以把一些不需要在过滤之前执行的动作从handleBefore中拿出，例如例子中的classId转换为Icon，可以在过滤之后对最终要展示的数据进行即可，减少一些步数。所以又设置了一个handleAfter方法，用于在分页完成之后进行后续操作，当然在handleAfter中也可能重复执行，所以如果执行的操作消耗很大，建议同样添加判断，避免重复执行。</p></li>
</ol>
<p>在例子代码中，我在每个方法中都统计了执行的步数，实际结果显示设置一个合理的过滤顺序可以避免一些性能问题，结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVxM1b" src="https://static.alili.tech/img/bVxM1b" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看出初始化时，在没有任何过滤的情况下，sort的步数较高。而一旦添加了一些过滤条件之后，顺位靠后的filter和sort的步数都会大幅度减少。</p>
<h3 id="articleHeader7">DEMO地址</h3>
<p>由于工作比较忙，暂时没有打算将开头中展示的MyArena项目重构，不过可以想象那会是一个很好的用vue制作单页应用的示例，后续的教程中可能会用来做例子。</p>
<p>本次教程中的例子，专注于展示多功能表格本身</p>
<blockquote><p><a href="http://lab.myriptide.com/table/" rel="nofollow noreferrer" target="_blank">DEMO地址点我</a><br><a href="https://github.com/Yuyz0112/vue-examples/tree/master/data-table" rel="nofollow noreferrer" target="_blank">Github仓库</a></p></blockquote>
<h2 id="articleHeader8">写作计划</h2>
<p>上周是Vue.js开发实践的第一篇文章，也是我第一次在SF社区的个人专栏里发表文章，希望能够把平时遇到的一些问题和解决的思路分享给大家，自己也进行一个梳理。</p>
<p>开发实践这个系列会用一些小例子，展示一些思路，实现一些有用、可复用的常见功能。计划中，还会有Vue.js实战系列和Sails.js实战系列两个系列的文章。<br>前者从较完整的项目出发，分析技术选型、vue-router和vuex的使用、多端共用代码、后期维护等方面的一些考量。后者则是用Sails.js这个框架构建企业级Node.js后端的一些尝试和心得，包括框架的优缺点、横向对比以及细节摸索等等。<br>目前也在关注阿里的开源项目Weex的内测进展，理想中的状态是用Weex实现项目在移动端App的开发，真正完成JS全栈，不过Weex还没正式开源，有待观望，所以只是后期设想，暂时不在计划内。</p>
<p>文章目前就只发在SF的专栏里，所以有意见建议都请在文章底部留言。同时由于以上所说的所有工作都由我一个人在负责，所以文章的更新可能时快时慢，争取做到一周一篇。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js 实践（2）：实现多条件筛选、搜索、排序及分页的表格功能

## 原文链接
[https://segmentfault.com/a/1190000005631012](https://segmentfault.com/a/1190000005631012)

