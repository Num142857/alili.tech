---
title: '使用Vue写一个datepicker' 
date: 2019-02-06 2:30:08
hidden: true
slug: 6isktatw3je
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>写插件是很有意思，也很锻炼人，因为这个过程中能发现许多的细节问题。在前端发展的过程中，jQuery无疑是一个重要的里程碑，围绕着这个优秀项目也出现了很多优秀的插件可以直接使用，大大节省了开发者们的时间。jQuery最重要的作用是跨浏览器，而现在浏览器市场虽不完美，但已远没有从前那么惨，数据驱动视图的思想倍受欢迎，大家开始使用前端框架取代jQuery，我个人比较喜欢Vue.js，所以想试着用Vue.js写一个组件出来。</p>
<p>为了发布到npm上，所以给项目地址改名字了，但是内部代码没有改，使用方法比之前方便。<br>Demo演示: <a href="http://www.showonne.com/vue-date/dist/browser/" rel="nofollow noreferrer" target="_blank">Here</a><br>GitHub地址: <a href="https://github.com/showonne/vue-date" rel="nofollow noreferrer" target="_blank">Here</a><br><del><b>希望大家能给个star</b></del></p>
<h2 id="articleHeader1">功能&amp;期望</h2>
<p>这个datepicker目前仅实现了一些常用的功能：</p>
<ul>
<li><p>选择时间(<del>这话说得有点多余<del>)</del></del></p></li>
<li><p>最大/最小时间限制</p></li>
<li><p>中/英文切换(其实也就星期和月份需要切换)</p></li>
<li><p>可以以<code>.vue</code>形式使用，也可在浏览器环境中直接使用</p></li>
<li><p>没了。。。</p></li>
</ul>
<h2 id="articleHeader2">目录结构</h2>
<p>万事的第一步依然是创建项目，只是单一组件，结构并不复杂，Datepicker.vue是最重要的组件文件，dist是webpack的输出文件夹，index.js是webpack打包的入口文件，最后是webpack的配置文件，用来对我们的库文件进行打包用的。因此项目结构就是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── Datepicker.vue
├── LICENSE
├── README.md
├── dist
│&nbsp;&nbsp; └── vue-datepicker.js
├── index.js
├── package.json
└── webpack.config.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── Datepicker<span class="hljs-selector-class">.vue</span>
├── LICENSE
├── README<span class="hljs-selector-class">.md</span>
├── dist
│&nbsp;&nbsp; └── vue-datepicker<span class="hljs-selector-class">.js</span>
├── index<span class="hljs-selector-class">.js</span>
├── package<span class="hljs-selector-class">.json</span>
└── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
</code></pre>
<h2 id="articleHeader3">从Datepicker.vue入手</h2>
<p>以<code>.vue</code>的方式写Vue组件是一种特殊写法，每个Vue文件包括<code>template</code>, <code>script</code>, <code>style</code>三部分，<code>template</code>最好不要成为片段实例,所以最外层先套一层<code>div</code>，当做整个组件的根元素。一个datepicker一般由两部分组成，一个用来显示日期的input框，一个用来选择日期的panel，因为我发现input在移动端会自动唤起键盘，所以没有使用input，直接用了div模拟,通过点击事件决定panel的显隐。<code>value</code>是最终的结果，需要和父组件通信，所以将value写成了prop，在父组件中使用<code>value.sync="xxx"</code>，datepicker的value就和父组件的<code>xxx</code>双向绑定了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;date-picker&quot;>
        <div class=&quot;input&quot; v-text=&quot;value&quot; @click=&quot;panelState = !panelState&quot;>
    </div>
    <div class=&quot;date-panel&quot; v-show=&quot;panelState&quot;>
    </div>
</template>

<scrip>
    export default {
        data () {
            return {
                panelState: false //初始值，默认panel关闭
            }
        },
        props: {
            value: String
        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-keyword">template</span>&gt;
    &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"date-picker"</span>&gt;
        &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"input"</span> v-<span class="hljs-built_in">text</span>=<span class="hljs-string">"value"</span> @<span class="hljs-built_in">click</span>=<span class="hljs-string">"panelState = !panelState"</span>&gt;
    &lt;/div&gt;
    &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"date-panel"</span> v-show=<span class="hljs-string">"panelState"</span>&gt;
    &lt;/div&gt;
&lt;/<span class="hljs-keyword">template</span>&gt;

&lt;scrip&gt;
    <span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> {
        data () {
            <span class="hljs-built_in">return</span> {
                panelState: false <span class="hljs-comment">//初始值，默认panel关闭</span>
            }
        },
        props: {
            value: <span class="hljs-keyword">String</span>
        }
    }
&lt;/script&gt;
</code></pre>
<h2 id="articleHeader4">渲染日期列表</h2>
<p>一个月最少是28天，如果把周日排在开头，那么最少(1号恰好是周日)需要4行，但是每个月天数30，31居多，而且1号又不一定是周日，我索性干脆按最多的情况设计了，共6行，当月日期没填满的地方用上个月或下个月的日期补齐，这样就方便计算了，而且切换月份时候panel高度不会变化。日期列表的数组需要动态计算，Vue提供了<a href="http://vuejs.org.cn/api/#computed" rel="nofollow noreferrer" target="_blank">computed</a>这个属性，所以直接将日期列表<code>dateList</code>写成计算属性。我的方法是将日期列表固定为长度为42的数组，然后将本月，上个月，下个月的日期依次填充。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    dateList () {
        //获取当月的天数
        let currentMonthLength = new Date(this.tmpMonth, this.tmpMonth + 1, 0).getDate()
        //先将当月的日期塞入dateList
        let dateList = Array.from({length: currentMonthLength}, (val, index) => {
            return {
                currentMonth: true,
                value: index + 1
            }
        })
        //获取当月1号的星期是为了确定在1号前需要插多少天
        let startDay = new Date(this.year, this.tmpMonth, 1).getDay()
        //确认上个月一共多少天
        let previousMongthLength = new Date(this.year, this.tmpMonth, 0).getDate()
    }
    //在1号前插入上个月日期
    for(let i = 0, len = startDay; i < len; i++){
        dateList = [{previousMonth: true, value: previousMongthLength - i}].concat(dateList)
    }
    //补全剩余位置
    for(let i = 0, item = 1; i < 42; i++, item++){
        dateList[dateList.length] = {nextMonth: true, value: i}
    }
    return dateList
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>computed: {
    dateList () {
        <span class="hljs-comment">//获取当月的天数</span>
        <span class="hljs-keyword">let</span> currentMonthLength = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">this</span>.tmpMonth, <span class="hljs-keyword">this</span>.tmpMonth + <span class="hljs-number">1</span>, <span class="hljs-number">0</span>).getDate()
        <span class="hljs-comment">//先将当月的日期塞入dateList</span>
        <span class="hljs-keyword">let</span> dateList = <span class="hljs-built_in">Array</span>.from({length: currentMonthLength}, <span class="hljs-function">(<span class="hljs-params">val, index</span>) =&gt;</span> {
            <span class="hljs-keyword">return</span> {
                currentMonth: <span class="hljs-literal">true</span>,
                value: index + <span class="hljs-number">1</span>
            }
        })
        <span class="hljs-comment">//获取当月1号的星期是为了确定在1号前需要插多少天</span>
        <span class="hljs-keyword">let</span> startDay = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">this</span>.year, <span class="hljs-keyword">this</span>.tmpMonth, <span class="hljs-number">1</span>).getDay()
        <span class="hljs-comment">//确认上个月一共多少天</span>
        <span class="hljs-keyword">let</span> previousMongthLength = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">this</span>.year, <span class="hljs-keyword">this</span>.tmpMonth, <span class="hljs-number">0</span>).getDate()
    }
    <span class="hljs-comment">//在1号前插入上个月日期</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = startDay; i &lt; len; i++){
        dateList = [{previousMonth: <span class="hljs-literal">true</span>, value: previousMongthLength - i}].concat(dateList)
    }
    <span class="hljs-comment">//补全剩余位置</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, item = <span class="hljs-number">1</span>; i &lt; <span class="hljs-number">42</span>; i++, item++){
        dateList[dateList.length] = {nextMonth: <span class="hljs-literal">true</span>, value: i}
    }
    <span class="hljs-keyword">return</span> dateList
}
</code></pre>
<p>这里用<code>Array.from</code>来初始化了一个数组，传入一个Array Like，转化成数组，在拼接字符串时候采用了<code>arr[arr.length]</code>和<code>[{}].concat(arr)</code>这种方式，因为在JsTips上学到这样做性能更好，文章的最后会贴出相关链接。<br>这样，日期列表就构建好了，在template中使用<code>v-for</code>循环渲染出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;date-list&quot;>
    <li v-for=&quot;item in dateList&quot;
        v-text=&quot;item.value&quot; 
        :class=&quot;{preMonth: item.previousMonth, nextMonth: item.nextMonth,
            selected: date === item.value &amp;&amp; month === tmpMonth &amp;&amp; item.currentMonth, invalid: validateDate(item)}&quot;
        @click=&quot;selectDate(item)&quot;>
    </li>
</ul>
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"date-list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in dateList"</span>
        <span class="hljs-attr">v-text</span>=<span class="hljs-string">"item.value"</span> 
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{preMonth: item.previousMonth, nextMonth: item.nextMonth,
            selected: date === item.value &amp;&amp; month === tmpMonth &amp;&amp; item.currentMonth, invalid: validateDate(item)}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>
        @<span class="hljs-attr">click</span>=<span class="hljs-string">"selectDate(item)"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            </span></code></pre>
<p>样式上就可以自己发挥了，怎么喜欢怎么写。需要注意的是循环日期可能会出现上个月或这个月的日期，我通过<code>previuosMonth</code>,<code>currentMonth</code>和<code>nextMonth</code>分别做了标记，对其他功能提供判断条件。<br>年份和月份的列表都是差不多的道理，年份列表的初始值我直接写在了<code>data</code>里，以当前年份为第一个，为了和月份保持一致，每次显示12个，都通过<code>v-for</code>渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
data () {
    return {
        yearList: Array.from({length: 12}, (value, index) => new Date().getFullYear() + index)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>
<span class="hljs-class"><span class="hljs-keyword">data</span> () {
    <span class="hljs-title">return</span> {
        <span class="hljs-title">yearList</span>: <span class="hljs-type">Array</span>.<span class="hljs-title">from</span>({<span class="hljs-title">length</span>: 12}, (<span class="hljs-title">value</span>, <span class="hljs-title">index</span>) =&gt; new <span class="hljs-type">Date</span>().getFullYear() + index)</span>
    }
}
</code></pre>
<h2 id="articleHeader5">选择日期功能</h2>
<p>选择顺序是：年 -&gt; 月 -&gt; 日，所以我们可以通过一个状态变量来控制panel中显示的内容，绑定适合的函数切换显示状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <div class=&quot;type-year&quot; v-show=&quot;panelType === 'year'&quot;>
        <ul class=&quot;year-list&quot;>
          <li v-for=&quot;item in yearList&quot;
              v-text=&quot;item&quot;
              :class=&quot;{selected: item === tmpYear, invalid: validateYear(item)}&quot; 
              @click=&quot;selectYear(item)&quot;
          >
          </li>
      </ul>
    </div>
    <div class=&quot;type-month&quot; v-show=&quot;panelType === 'month'&quot;>
        <ul class=&quot;month-list&quot;>
          <li v-for=&quot;item in monthList&quot;
              v-text=&quot;item | month language&quot;
              :class=&quot;{selected: $index === tmpMonth &amp;&amp; year === tmpYear, invalid: validateMonth($index)}&quot; 
              @click=&quot;selectMonth($index)&quot;
          >
          </li>
      </ul>
    </div>
    <div class=&quot;type-date&quot; v-show=&quot;panelType === 'date'&quot;>
        <ul class=&quot;date-list&quot;>
          <li v-for=&quot;item in dateList&quot;
              v-text=&quot;item.value&quot; 
              track-by=&quot;$index&quot; 
              :class=&quot;{preMonth: item.previousMonth, nextMonth: item.nextMonth,
                  selected: date === item.value &amp;&amp; month === tmpMonth &amp;&amp; item.currentMonth, invalid: validateDate(item)}&quot;
              @click=&quot;selectDate(item)&quot;>
          </li>
      </ul>
    </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"type-year"</span> v-show=<span class="hljs-string">"panelType === 'year'"</span>&gt;
        &lt;ul <span class="hljs-built_in">class</span>=<span class="hljs-string">"year-list"</span>&gt;
          &lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in yearList"</span>
              v-<span class="hljs-built_in">text</span>=<span class="hljs-string">"item"</span>
              :<span class="hljs-built_in">class</span>=<span class="hljs-string">"{selected: item === tmpYear, invalid: validateYear(item)}"</span> 
              @click=<span class="hljs-string">"selectYear(item)"</span>
          &gt;
          &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"type-month"</span> v-show=<span class="hljs-string">"panelType === 'month'"</span>&gt;
        &lt;ul <span class="hljs-built_in">class</span>=<span class="hljs-string">"month-list"</span>&gt;
          &lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in monthList"</span>
              v-<span class="hljs-built_in">text</span>=<span class="hljs-string">"item | month language"</span>
              :<span class="hljs-built_in">class</span>=<span class="hljs-string">"{selected: $index === tmpMonth &amp;&amp; year === tmpYear, invalid: validateMonth($index)}"</span> 
              @click=<span class="hljs-string">"selectMonth($index)"</span>
          &gt;
          &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"type-date"</span> v-show=<span class="hljs-string">"panelType === 'date'"</span>&gt;
        &lt;ul <span class="hljs-built_in">class</span>=<span class="hljs-string">"date-list"</span>&gt;
          &lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in dateList"</span>
              v-<span class="hljs-built_in">text</span>=<span class="hljs-string">"item.value"</span> 
              track-<span class="hljs-keyword">by</span>=<span class="hljs-string">"$index"</span> 
              :<span class="hljs-built_in">class</span>=<span class="hljs-string">"{preMonth: item.previousMonth, nextMonth: item.nextMonth,
                  selected: date === item.value &amp;&amp; month === tmpMonth &amp;&amp; item.currentMonth, invalid: validateDate(item)}"</span>
              @click=<span class="hljs-string">"selectDate(item)"</span>&gt;
          &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>选择日期的方法就不细说了，在<code>selectYear</code>,<code>selectMonth</code>中对年份，月份变量赋值，再分别将<code>panelType</code>推向下一步就实现了日期选择功能。<br>不过在未选择完日期之前，你可能不希望当前年月的真实值发生变化，所以在这些方法中可先将选择的值赋给一个临时变量，等到<code>seletDate</code>的时候再一次性全部赋值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectMonth (month) {
    if(this.validateMonth(month)){
        return
    }else{
        //临时变量
        this.tmpMonth = month
        //切换panel状态
        this.panelType = 'date'
    }
},
selectDate (date) {
    //validate logic above...
    //一次性全部赋值
    this.year = tmpYear
    this.month = tmpMonth
    this.date = date.value
    this.value = `${this.tmpYear}-${('0' + (this.month + 1)).slice(-2)}-${('0' + this.date).slice(-2)}`
    //选择完日期后，panel自动隐藏
    this.panelState = false
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>selectMonth (month) {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.validateMonth(month)){
        <span class="hljs-keyword">return</span>
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//临时变量</span>
        <span class="hljs-keyword">this</span>.tmpMonth = month
        <span class="hljs-comment">//切换panel状态</span>
        <span class="hljs-keyword">this</span>.panelType = <span class="hljs-string">'date'</span>
    }
},
selectDate (date) {
    <span class="hljs-comment">//validate logic above...</span>
    <span class="hljs-comment">//一次性全部赋值</span>
    <span class="hljs-keyword">this</span>.year = tmpYear
    <span class="hljs-keyword">this</span>.month = tmpMonth
    <span class="hljs-keyword">this</span>.date = date.value
    <span class="hljs-keyword">this</span>.value = `${<span class="hljs-keyword">this</span>.tmpYear}-${(<span class="hljs-string">'0'</span> + (<span class="hljs-keyword">this</span>.month + <span class="hljs-number">1</span>)).slice(<span class="hljs-number">-2</span>)}-${(<span class="hljs-string">'0'</span> + <span class="hljs-keyword">this</span>.date).slice(<span class="hljs-number">-2</span>)}`
    <span class="hljs-comment">//选择完日期后，panel自动隐藏</span>
    <span class="hljs-keyword">this</span>.panelState = <span class="hljs-literal">false</span>
}
</code></pre>
<h2 id="articleHeader6">最大/小时间限制</h2>
<p>最大/小值是需要从父组件传递下来的，因此应该使用<code>props</code>，另外，这个值可以是字符串，也应该可以是变量(比如同时存在两个datepicker，第二个的日期不能比第一个大这种逻辑)，所以应该使用<a href="http://vuejs.org.cn/api/#v-bind" rel="nofollow noreferrer" target="_blank">Dynamically bind</a>的方式传值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<datepicker :value.sync=&quot;start&quot;></datepicker>
<!-- 现在min的值会随着start的变化而变化 -->
<datepicker :value.sync=&quot;end&quot; :min=&quot;start&quot; ></datepicker>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">datepicker</span> <span class="hljs-attr">:value.sync</span>=<span class="hljs-string">"start"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">datepicker</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 现在min的值会随着start的变化而变化 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">datepicker</span> <span class="hljs-attr">:value.sync</span>=<span class="hljs-string">"end"</span> <span class="hljs-attr">:min</span>=<span class="hljs-string">"start"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">datepicker</span>&gt;</span>
</code></pre>
<p>增加了限制条件，对于不合法的日期，其按钮应该变为置灰状态，我用了比较时间戳的方式来判断日期是否合法，因为就算当前panel中的日期是跨年或是跨月的，通过日期构造函数创建时都会帮你转换成对应的合法值，省去很多判断的麻烦：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
new Date(2015, 0, 0).getTime() === new Date(2014, 11, 31).getTime() //true
new Date(2015, 12, 0).getTime() === new Date(2016, 0, 0).getTime() //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>
new Date(<span class="hljs-number">2015</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>).getTime() === new Date(<span class="hljs-number">2014</span>, <span class="hljs-number">11</span>, <span class="hljs-number">31</span>).getTime() <span class="hljs-comment">//true</span>
new Date(<span class="hljs-number">2015</span>, <span class="hljs-number">12</span>, <span class="hljs-number">0</span>).getTime() === new Date(<span class="hljs-number">2016</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>).getTime() <span class="hljs-comment">//true</span>
</code></pre>
<p>因此验证日期是否合法的函数是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
validateDate (date) {
  let mon = this.tmpMonth
  if(date.previousMonth){
      mon -= 1
  }else if(date.nextMonth){
      mon += 1
  }
  if(new Date(this.tmpYear, mon, date.value).getTime() >= new Date(this.minYear, this.minMonth - 1, this.minDate).getTime()
      &amp;&amp; new Date(this.tmpYear, mon, date.value).getTime() <= new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()){
      return false
  }
  return true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>
validateDate (<span class="hljs-built_in">date</span>) {
  <span class="hljs-keyword">let</span> mon = <span class="hljs-keyword">this</span>.tmpMonth
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">date</span>.previousMonth){
      mon -= <span class="hljs-number">1</span>
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">date</span>.nextMonth){
      mon += <span class="hljs-number">1</span>
  }
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">this</span>.tmpYear, mon, <span class="hljs-built_in">date</span>.value).getTime() &gt;= <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">this</span>.minYear, <span class="hljs-keyword">this</span>.minMonth - <span class="hljs-number">1</span>, <span class="hljs-keyword">this</span>.minDate).getTime()
      &amp;&amp; <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">this</span>.tmpYear, mon, <span class="hljs-built_in">date</span>.value).getTime() &lt;= <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">this</span>.maxYear, <span class="hljs-keyword">this</span>.maxMonth - <span class="hljs-number">1</span>, <span class="hljs-keyword">this</span>.maxDate).getTime()){
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span></code></pre>
<p>}</p>
<h2 id="articleHeader7">动态计算位置</h2>
<p>当页面右侧有足够的空间显示时，datepicker的panel会定位为相对于父元素<code>left: 0</code>的位置，如果没有足够的空间，则应该置于<code>right: 0</code>的位置，这一点可以通过Vue提供的动态样式和样式对象来实现(动态class和动态style其实只是动态props的特例)，而计算位置的时刻，我放在了组件声明周期的<code>ready</code>周期中，因为这时组件已经插入到DOM树中，可以获取style进行动态计算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ready () {
    if(this.$el.parentNode.offsetWidth + this.$el.parentNode.offsetLeft - this.$el.offsetLeft <= 300){
        this.coordinates = {right: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
    }else{
        this.coordinates = {left: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
    }
}
<!-- template中对应的动态style -->
<div :style=&quot;coordinates&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>ready () {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.$el.parentNode.offsetWidth + <span class="hljs-keyword">this</span>.$el.parentNode.offsetLeft - <span class="hljs-keyword">this</span>.$el.offsetLeft &lt;= <span class="hljs-number">300</span>){
        <span class="hljs-keyword">this</span>.coordinates = {<span class="hljs-attr">right</span>: <span class="hljs-string">'0'</span>, <span class="hljs-attr">top</span>: <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">window</span>.getComputedStyle(<span class="hljs-keyword">this</span>.$el.children[<span class="hljs-number">0</span>]).offsetHeight + <span class="hljs-number">4</span>}</span>px`</span>}
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.coordinates = {<span class="hljs-attr">left</span>: <span class="hljs-string">'0'</span>, <span class="hljs-attr">top</span>: <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">window</span>.getComputedStyle(<span class="hljs-keyword">this</span>.$el.children[<span class="hljs-number">0</span>]).offsetHeight + <span class="hljs-number">4</span>}</span>px`</span>}
    }
}
&lt;!-- template中对应的动态style --&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"coordinates"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</code></pre>
<p>为了panel的显隐可以平滑过渡，可以使用<code>transition</code>做过渡动画，这里我简单地通过一个0.2秒的透明度过渡让显隐更平滑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div :style=&quot;this.coordinates&quot; v-show=&quot;panelState&quot; transition=&quot;toggle&quot;></div>

//less syntax
.toggle{
    &amp;-transition{
        transition: all ease .2s;
    }
    &amp;-enter, &amp;-leave{
        opacity: 0;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>&lt;<span class="hljs-keyword">div</span> :style=<span class="hljs-string">"this.coordinates"</span> v-show=<span class="hljs-string">"panelState"</span> transition=<span class="hljs-string">"toggle"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;

//less syntax
<span class="hljs-meta">.toggle</span>{
    &amp;-transition{
<span class="hljs-symbol">        transition:</span> all ease .2s<span class="hljs-comment">;</span>
    }
    &amp;-<span class="hljs-keyword">enter</span>, &amp;-<span class="hljs-keyword">leave</span>{
<span class="hljs-symbol">        opacity:</span> <span class="hljs-number">0</span><span class="hljs-comment">;</span>
    }
}
</code></pre>
<h2 id="articleHeader8">中英文切换</h2>
<p>这里其实也很简单，这种多语言切换实质就是一个key根据不同的type而输出不同的value，所以使用filter可以很容易的实现它！比如渲染星期的列表:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;weeks&quot;>
     <li v-for=&quot;item in weekList&quot; v-text=&quot;item | week language&quot;></li>
 </ul>
 
filters : {
    week (item, lang){
        switch (lang) {
          case 'en':
              return {0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa'}[item]
          case 'ch':
              return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item]
          default:
              return item
      }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;ul <span class="hljs-keyword">class</span>=<span class="hljs-string">"weeks"</span>&gt;
     &lt;li v-<span class="hljs-built_in">for</span>=<span class="hljs-string">"item in weekList"</span> v-<span class="hljs-built_in">text</span>=<span class="hljs-string">"item | week language"</span>&gt;&lt;/li&gt;
 &lt;/ul&gt;
 
filters : {
    week (item, lang){
        <span class="hljs-built_in">switch</span> (lang) {
          <span class="hljs-built_in">case</span> <span class="hljs-string">'en'</span>:
              <span class="hljs-built_in">return</span> {<span class="hljs-number">0</span>: <span class="hljs-string">'Su'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'Mo'</span>, <span class="hljs-number">2</span>: <span class="hljs-string">'Tu'</span>, <span class="hljs-number">3</span>: <span class="hljs-string">'We'</span>, <span class="hljs-number">4</span>: <span class="hljs-string">'Th'</span>, <span class="hljs-number">5</span>: <span class="hljs-string">'Fr'</span>, <span class="hljs-number">6</span>: <span class="hljs-string">'Sa'</span>}[item]
          <span class="hljs-built_in">case</span> <span class="hljs-string">'ch'</span>:
              <span class="hljs-built_in">return</span> {<span class="hljs-number">0</span>: <span class="hljs-string">'日'</span>, <span class="hljs-number">1</span>: <span class="hljs-string">'一'</span>, <span class="hljs-number">2</span>: <span class="hljs-string">'二'</span>, <span class="hljs-number">3</span>: <span class="hljs-string">'三'</span>, <span class="hljs-number">4</span>: <span class="hljs-string">'四'</span>, <span class="hljs-number">5</span>: <span class="hljs-string">'五'</span>, <span class="hljs-number">6</span>: <span class="hljs-string">'六'</span>}[item]
          <span class="hljs-built_in">default</span>:
              <span class="hljs-built_in">return</span> item
      }
    }
}
</code></pre>
<h2 id="articleHeader9">多种使用方式</h2>
<p>对于一个Vue组件，如果是使用<code>webpack + vue-loader</code>的<code>.vue</code>单文件写法，我希望这样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//App.vue
<script>
    import datepicker from 'path/to/datepicker.vue'
    export default {
        components: { datepicker}
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">//App.vue
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> datepicker <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/datepicker.vue'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
        components: { datepicker}</span><span class="xml"><span class="undefined">
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>如果是直接在浏览器中使用，那么我希望<code>datepicker</code>这个组件是暴露在全局下的，可以这么使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//index.html
<html>
    <script src=&quot;path/to/vue.js&quot;></script>
    <script src=&quot;path/to/datepicker.js&quot;></script>
    <body>
        <div id=&quot;app&quot;></div>
        <script>
            new Vue({
                el: '#app',
                components: { datepicker }
            })
        </script>
    </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
//index.html
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"path/to/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"path/to/datepicker.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
            <span class="hljs-keyword">new</span> Vue({
                el: <span class="hljs-string">'#app'</span>,
                components: { datepicker }
            })
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>这里我选择了webpack作为打包工具，使用webpack的<code>output.library</code>和<code>output.linraryTarget</code>这两个属性就可以把你的bundle文件作为库文件打包。<code>library</code>定义了库的名字，<code>libraryTarget</code>定义了你想要打包的格式，具体可以看文档。我希望自己的库可以通过<code>datepicker</code>加载到，并且打包成<code>umd</code>格式，因此我的<code>webpack.config.js</code>是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: './index.js',
    output: {
        path: './dist',
        library: 'datepicker',
        filename: 'vue-datepicker.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {test: /\.vue$/, loaders: ['vue']},
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']}
        ]
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>module.exports = {
<span class="hljs-symbol">    entry:</span> <span class="hljs-string">'./index.js'</span>,
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        path:</span> <span class="hljs-string">'./dist'</span>,
<span class="hljs-symbol">        library:</span> <span class="hljs-string">'datepicker'</span>,
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">'vue-datepicker.js'</span>,
<span class="hljs-symbol">        libraryTarget:</span> <span class="hljs-string">'umd'</span>
    },
<span class="hljs-symbol">    module:</span> {
<span class="hljs-symbol">        loaders:</span> [
            {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.vue$/</span>, <span class="hljs-string">loaders:</span> [<span class="hljs-string">'vue'</span>]},
            {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-string">exclude:</span> <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-string">loaders:</span> [<span class="hljs-string">'babel'</span>]}
        ]
    }
}
</code></pre>
<p>打包完成的模块就是一个<code>umd</code>格式的模块啦，可以在浏览器中直接使用，也可以配合require.js等模块加载器使用！</p>
<h2 id="articleHeader10">适配 Vue 2.x</h2>
<p>Vue 2.0已经发布有段时间了，现在把之前的组件适配到Vue 2.0。迁移过程还是很顺利的，核心API改动不大，可以借助<a href="https://github.com/vuejs/vue-migration-helper" rel="nofollow noreferrer" target="_blank">vue-migration-helper</a>来找出废弃的API再逐步修改。这里只列举一些我需要修改的API。</p>
<h2 id="articleHeader11">filter</h2>
<p>2.0中的filter只能在mustache绑定中使用，如果想在指令式绑定中绑定过滤后的值，可以选择计算属性。我在月份和星期的显示中使用到了过滤器来过滤语言类型，但我之前是在指令式绑定中使用的filter，所以需要如下修改，：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改前
<div class=&quot;month-box&quot; @click=&quot;chType('month')&quot; v-text=&quot;tmpMonth + 1 | month language&quot;></div>
//修改后，filter传参的方式也变了，变成了函数调用的风格
<div class=&quot;month-box&quot; @click=&quot;chType('month')&quot;>"{{"tmpMonth + 1 | month(language)"}}"</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">//修改前</span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"month-box"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"chType('month')"</span> v-text=<span class="hljs-string">"tmpMonth + 1 | month language"</span>&gt;&lt;/div&gt;
<span class="hljs-comment">//修改后，filter传参的方式也变了，变成了函数调用的风格</span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"month-box"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"chType('month')"</span>&gt;"{{"tmpMonth + <span class="hljs-number">1</span> | month(language)"}}"&lt;/div&gt;
</code></pre>
<h2 id="articleHeader12">移除<code>$index</code>和<code>$key</code>
</h2>
<p>这两个属性不会在<code>v-for</code>中被自动创建了，如需使用，要在<code>v-for</code>中自行声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;item in monthList&quot; @click=&quot;selectMonth($index)&quot;></li>
//
<li v-for=&quot;(item, index) in monthList&quot; @click=&quot;selectMonth(index)&quot;></li>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in monthList"</span> @click=<span class="hljs-string">"selectMonth($index)"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
<span class="hljs-comment">//</span>
&lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item, index) in monthList"</span> @click=<span class="hljs-string">"selectMonth(index)"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
</code></pre>
<h2 id="articleHeader13">
<code>ready </code>生命周期移除</h2>
<p><code>ready</code>从生命周期钩子中移除了，迁移方法很简单，使用<code>mounted</code>和<code>this.$nextTick</code>来替换。</p>
<h2 id="articleHeader14">
<code>prop.sync</code>弃用</h2>
<p><code>prop</code>的<code>sync</code>弃用了，迁移方案是使用自定义事件，而且Datepicker这种input类型组件，可以使用<a href="http://vuejs.org/guide/components.html#Form-Input-Components-using-Custom-Events" rel="nofollow noreferrer" target="_blank">表单输入组件的自定义事件</a>作为替换方案。自定义组件也可以使用<code>v-model</code>指令了，但是必须满足两个条件：</p>
<ol>
<li><p>接收一个<code>value</code>的<code>prop</code></p></li>
<li><p>值发生变化时，触发一个<code>input</code>事件，传入新值。</p></li>
</ol>
<p>所以Datepicker的使用方式也不是<code>&lt;datepicker value.sync="now"&gt;&lt;/datepicker&gt;</code>了，而是<code>&lt;datepicker v-model="now"&gt;&lt;/datepicker&gt;</code>。组件自身向父级传值的方式也不一样了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1.x版本，设置了value的值会同步到父级
this.value = `${this.tmpYear}-${('0' + (this.month + 1)).slice(-2)}-${('0' + this.date).slice(-2)}`

//2.x版本，需要自己触发input事件，将新值作为参数传递回去
let value = `${this.tmpYear}-${('0' + (this.month + 1)).slice(-2)}-${('0' + this.date).slice(-2)}`
this.$emit('input', value)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//1.x版本，设置了value的值会同步到父级</span>
<span class="hljs-keyword">this</span>.value = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.tmpYear}</span>-<span class="hljs-subst">${(<span class="hljs-string">'0'</span> + (<span class="hljs-keyword">this</span>.month + <span class="hljs-number">1</span>)).slice(<span class="hljs-number">-2</span>)}</span>-<span class="hljs-subst">${(<span class="hljs-string">'0'</span> + <span class="hljs-keyword">this</span>.date).slice(<span class="hljs-number">-2</span>)}</span>`</span>

<span class="hljs-comment">//2.x版本，需要自己触发input事件，将新值作为参数传递回去</span>
<span class="hljs-keyword">let</span> value = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.tmpYear}</span>-<span class="hljs-subst">${(<span class="hljs-string">'0'</span> + (<span class="hljs-keyword">this</span>.month + <span class="hljs-number">1</span>)).slice(<span class="hljs-number">-2</span>)}</span>-<span class="hljs-subst">${(<span class="hljs-string">'0'</span> + <span class="hljs-keyword">this</span>.date).slice(<span class="hljs-number">-2</span>)}</span>`</span>
<span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, value)
</code></pre>
<h2 id="articleHeader15">总结</h2>
<p>以上就是我在写这个datepicker时的大致思路，本身也是很简单的事情，没有处处展开来说，写在这里作为自己的一个总结，如果有刚开始使用Vue的同学也希望这篇文章可以在思路上帮助到你们:P，对于各位老鸟如果有什么指点的地方我也很感谢:D，那么差不多就这样，后面贴一些相关推荐阅读。</p>
<h4>推荐阅读</h4>
<p><a href="http://www.jstips.co/zh_cn/insert-item-inside-an-array/" rel="nofollow noreferrer" target="_blank">高效地向数组中插值</a><br><a href="http://vuejs.org.cn/guide/components.html#" rel="nofollow noreferrer" target="_blank">Vue.js-片段实例</a><br><a href="http://vuejs.org.cn/api/#v-bind" rel="nofollow noreferrer" target="_blank">Vue.js-动态绑定</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date" rel="nofollow noreferrer" target="_blank">Js日期对象基础</a><br><a href="http://webpack.github.io/docs/configuration.html#output-library" rel="nofollow noreferrer" target="_blank">Webpack: export bundle as library</a><br><a href="https://github.com/umdjs/umd" rel="nofollow noreferrer" target="_blank">UMD(universial Module Defination)</a><br><a href="http://vuejs.org/guide/migration.html" rel="nofollow noreferrer" target="_blank">Migration from Vue 1.x</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue写一个datepicker

## 原文链接
[https://segmentfault.com/a/1190000006194285](https://segmentfault.com/a/1190000006194285)

