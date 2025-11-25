---
title: '【笔记2】laravel数据统计绘图（今天、7天、30天数据）' 
date: 2018-11-19 2:32:04
hidden: true
slug: ta0ytzmqos8
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x5F00;&#x53D1;&#x5C0F;&#x7B14;&#x8BB0;&#xFF1A;&#x6309;&#x7167;&#x65F6;&#x6BB5;&#x7EDF;&#x8BA1;&#x4ECA;&#x5929;&#x3001;7&#x5929;&#x3001;30&#x5929;&#x7684;&#x6570;&#x636E;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbeyYP?w=1490&amp;h=759" src="https://static.alili.tech/img/bVbeyYP?w=1490&amp;h=759" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader0">1. &#x524D;&#x7AEF;vue</h3><p>&#x4F7F;&#x7528;<code>vue-highcharts</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;highcharts :options=&quot;options&quot;&gt;&lt;/highcharts&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code style="word-break:break-word;white-space:initial">&lt;highcharts <span class="hljs-symbol">:options=<span class="hljs-string">&quot;options&quot;</span>&gt;&lt;/highcharts&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
    return {
      options: {
        title: {
          text: &apos;&apos;
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: &apos;&apos;
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: &apos;#808080&apos;
          }]
        },
        legend: {
          layout: &apos;horizontal&apos;,
          align: &apos;center&apos;,
          verticalAlign: &apos;bottom&apos;,
          borderWidth: 0
        },
        credits: {
          enabled: false   // &#x53BB;&#x6389;highcharts&#x5546;&#x6807;
        },
        series: []
      }
    }
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span>() {
    <span class="hljs-selector-tag">return</span> {
      <span class="hljs-attribute">options</span>: {
        <span class="hljs-attribute">title</span>: {
          <span class="hljs-attribute">text</span>: <span class="hljs-string">&apos;&apos;</span>
        },
        <span class="hljs-attribute">xAxis</span>: {
          <span class="hljs-attribute">categories</span>: []
        },
        <span class="hljs-attribute">yAxis</span>: {
          <span class="hljs-attribute">title</span>: {
            <span class="hljs-attribute">text</span>: <span class="hljs-string">&apos;&apos;</span>
          },
          <span class="hljs-attribute">plotLines</span>: [{
            <span class="hljs-attribute">value</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attribute">color</span>: <span class="hljs-string">&apos;#808080&apos;</span>
          }]
        },
        <span class="hljs-attribute">legend</span>: {
          <span class="hljs-attribute">layout</span>: <span class="hljs-string">&apos;horizontal&apos;</span>,
          <span class="hljs-attribute">align</span>: <span class="hljs-string">&apos;center&apos;</span>,
          <span class="hljs-attribute">verticalAlign</span>: <span class="hljs-string">&apos;bottom&apos;</span>,
          <span class="hljs-attribute">borderWidth</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attribute">credits</span>: {
          <span class="hljs-attribute">enabled</span>: false   <span class="hljs-comment">// &#x53BB;&#x6389;highcharts&#x5546;&#x6807;</span>
        },
        <span class="hljs-attribute">series</span>: []
      }
    }
  },</code></pre><p>&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getTimingHistoryAct(time) {
      getTimingHistory(time).then(response =&gt; {
        const curHour = new Date().getHours()
        const hoursArr = []
        const dayArr = []
        const seriesData = []
        switch (time) {
          case 1:
            seriesData.length = 0
            for (let i = 0; i &lt;= curHour; i++) {
              hoursArr.push(i &lt; 10 ? &apos;0&apos; + i : &apos;&apos; + i)
              seriesData[i] = 0
            }
            this.options.xAxis.categories = hoursArr.map(x =&gt; x + &apos;:00&apos;)
            response.data.forEach(record =&gt; {
              const index = hoursArr.indexOf(record.hour)
              if (index &gt; -1) {
                seriesData[index] = record.count
              }
            })
            break
          case 7:
            seriesData.length = 0
            for (let i = 0; i &lt; 7; i++) {
              const ymd = new Date(new Date() - 24 * 60 * 60 * 1000 * i).toLocaleString().split(&apos; &apos;)[0]
              const ymdarr = ymd.split(&apos;/&apos;)
              if (ymdarr[1] * 1 &lt; 10) {
                ymdarr[1] = &apos;0&apos; + ymdarr[1]
              }
              if (ymdarr[2] * 1 &lt; 10) {
                ymdarr[2] = &apos;0&apos; + ymdarr[1]
              }
              seriesData[i] = 0
              dayArr.unshift(ymdarr.join(&apos;-&apos;))
            }
            this.options.xAxis.categories = dayArr.map(x =&gt; x.substr(5))
            response.data.forEach(record =&gt; {
              const index = dayArr.indexOf(record.date)
              if (index &gt; -1) {
                seriesData[index] = record.count
              }
            })
            break
          case 30:
            // &#x540C;7&#x5929;
            break
        }
        this.options.series = [{
          name: &apos;&#x5546;&#x54C1;&#x70B9;&#x51FB;&apos;,
          data: seriesData
        }]
      })
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>getTimingHistoryAct(time) {
      getTimingHistory(time).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> curHour = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getHours()
        <span class="hljs-keyword">const</span> hoursArr = []
        <span class="hljs-keyword">const</span> dayArr = []
        <span class="hljs-keyword">const</span> seriesData = []
        <span class="hljs-keyword">switch</span> (time) {
          <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
            seriesData.length = <span class="hljs-number">0</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt;= curHour; i++) {
              hoursArr.push(i &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">&apos;0&apos;</span> + i : <span class="hljs-string">&apos;&apos;</span> + i)
              seriesData[i] = <span class="hljs-number">0</span>
            }
            <span class="hljs-keyword">this</span>.options.xAxis.categories = hoursArr.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + <span class="hljs-string">&apos;:00&apos;</span>)
            response.data.forEach(<span class="hljs-function"><span class="hljs-params">record</span> =&gt;</span> {
              <span class="hljs-keyword">const</span> index = hoursArr.indexOf(record.hour)
              <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">-1</span>) {
                seriesData[index] = record.count
              }
            })
            <span class="hljs-keyword">break</span>
          <span class="hljs-keyword">case</span> <span class="hljs-number">7</span>:
            seriesData.length = <span class="hljs-number">0</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">7</span>; i++) {
              <span class="hljs-keyword">const</span> ymd = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span> * i).toLocaleString().split(<span class="hljs-string">&apos; &apos;</span>)[<span class="hljs-number">0</span>]
              <span class="hljs-keyword">const</span> ymdarr = ymd.split(<span class="hljs-string">&apos;/&apos;</span>)
              <span class="hljs-keyword">if</span> (ymdarr[<span class="hljs-number">1</span>] * <span class="hljs-number">1</span> &lt; <span class="hljs-number">10</span>) {
                ymdarr[<span class="hljs-number">1</span>] = <span class="hljs-string">&apos;0&apos;</span> + ymdarr[<span class="hljs-number">1</span>]
              }
              <span class="hljs-keyword">if</span> (ymdarr[<span class="hljs-number">2</span>] * <span class="hljs-number">1</span> &lt; <span class="hljs-number">10</span>) {
                ymdarr[<span class="hljs-number">2</span>] = <span class="hljs-string">&apos;0&apos;</span> + ymdarr[<span class="hljs-number">1</span>]
              }
              seriesData[i] = <span class="hljs-number">0</span>
              dayArr.unshift(ymdarr.join(<span class="hljs-string">&apos;-&apos;</span>))
            }
            <span class="hljs-keyword">this</span>.options.xAxis.categories = dayArr.map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x.substr(<span class="hljs-number">5</span>))
            response.data.forEach(<span class="hljs-function"><span class="hljs-params">record</span> =&gt;</span> {
              <span class="hljs-keyword">const</span> index = dayArr.indexOf(record.date)
              <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">-1</span>) {
                seriesData[index] = record.count
              }
            })
            <span class="hljs-keyword">break</span>
          <span class="hljs-keyword">case</span> <span class="hljs-number">30</span>:
            <span class="hljs-comment">// &#x540C;7&#x5929;</span>
            <span class="hljs-keyword">break</span>
        }
        <span class="hljs-keyword">this</span>.options.series = [{
          <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5546;&#x54C1;&#x70B9;&#x51FB;&apos;</span>,
          <span class="hljs-attr">data</span>: seriesData
        }]
      })
    },</code></pre><h3 id="articleHeader1">2. &#x540E;&#x53F0;laravel</h3><p>mysql&#x6D4B;&#x8BD5;&#x6570;&#x636E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 5440935 1 &#x65F6;&#x5C1A;&#x535A;&#x4E3B;&#x5BB6;&#x300A;&#x5FC3;&#x4E4B;&#x8BED;&#x300B; 2018-07-28 19:20:49
2 5440935 1 &#x65F6;&#x5C1A;&#x535A;&#x4E3B;&#x5BB6;&#x300A;&#x5FC3;&#x4E4B;&#x8BED;&#x300B; 2018-07-29 15:26:21
3 5440935 1 &#x6D4B;&#x8BD5;&#x65B9;&#x6848;1 2018-07-29 15:38:43
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dns"><code><span class="hljs-number">1 5440935</span> <span class="hljs-number">1</span> &#x65F6;&#x5C1A;&#x535A;&#x4E3B;&#x5BB6;&#x300A;&#x5FC3;&#x4E4B;&#x8BED;&#x300B; <span class="hljs-number">2018-07-28</span> <span class="hljs-number">19</span>:<span class="hljs-number">20</span>:<span class="hljs-number">49</span>
<span class="hljs-number">2 5440935</span> <span class="hljs-number">1</span> &#x65F6;&#x5C1A;&#x535A;&#x4E3B;&#x5BB6;&#x300A;&#x5FC3;&#x4E4B;&#x8BED;&#x300B; <span class="hljs-number">2018-07-29</span> <span class="hljs-number">15</span>:<span class="hljs-number">26</span>:<span class="hljs-number">21</span>
<span class="hljs-number">3 5440935</span> <span class="hljs-number">1</span> &#x6D4B;&#x8BD5;&#x65B9;&#x6848;<span class="hljs-number">1 2018-07</span>-<span class="hljs-number">29 15:38:43</span>
...</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public function getTimingHistory($time)
{
    $time = (int)$time;
    $data = StatsPlanClick::where(&apos;created_at&apos;,&apos;&lt;&apos;, Carbon::now())
            -&gt;where(&apos;created_at&apos;,&apos;&gt;&apos;, $time &gt; 1 ? Carbon::today()-&gt;subDays($time)Carbon::today())
            -&gt;select([$time &gt; 1 ? DB::raw(&apos;DATE(created_at) as time&apos;) : DB::raw(&apos;DATE_FORMAT(created_at,\&apos;%H\&apos;) as time&apos;), DB::raw(&apos;COUNT(&quot;*&quot;) as count&apos;)])
            -&gt;groupBy(&apos;time&apos;)
            -&gt;get();
    }
    return $this-&gt;successWithData($data);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTimingHistory</span><span class="hljs-params">($time)</span>
</span>{
    $time = (int)$time;
    $data = StatsPlanClick::where(<span class="hljs-string">&apos;created_at&apos;</span>,<span class="hljs-string">&apos;&lt;&apos;</span>, Carbon::now())
            -&gt;where(<span class="hljs-string">&apos;created_at&apos;</span>,<span class="hljs-string">&apos;&gt;&apos;</span>, $time &gt; <span class="hljs-number">1</span> ? Carbon::today()-&gt;subDays($time)Carbon::today())
            -&gt;select([$time &gt; <span class="hljs-number">1</span> ? DB::raw(<span class="hljs-string">&apos;DATE(created_at) as time&apos;</span>) : DB::raw(<span class="hljs-string">&apos;DATE_FORMAT(created_at,\&apos;%H\&apos;) as time&apos;</span>), DB::raw(<span class="hljs-string">&apos;COUNT(&quot;*&quot;) as count&apos;</span>)])
            -&gt;groupBy(<span class="hljs-string">&apos;time&apos;</span>)
            -&gt;get();
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">$this</span>-&gt;successWithData($data);
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【笔记2】laravel数据统计绘图（今天、7天、30天数据）

## 原文链接
[https://segmentfault.com/a/1190000015825085](https://segmentfault.com/a/1190000015825085)

