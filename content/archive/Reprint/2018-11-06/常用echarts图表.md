---
title: 常用echarts图表
hidden: true
categories: [reprint]
slug: b9c36d8a
date: 2018-11-06 15:28:30
---

{{< raw >}}
<div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x672C;&#x6587;&#x4EE3;&#x7801;&#x57FA;&#x4E8E;ehcarts4.0&#x5F00;&#x53D1;
//https://cdn.bootcss.com/echarts/4.0.0/echarts.min.js
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crystal"><code>/<span class="hljs-regexp">/&#x672C;&#x6587;&#x4EE3;&#x7801;&#x57FA;&#x4E8E;ehcarts4.0&#x5F00;&#x53D1;
/</span><span class="hljs-regexp">/https:/</span><span class="hljs-regexp">/cdn.bootcss.com/echarts</span><span class="hljs-regexp">/4.0.0/echarts</span>.min.js
</code></pre><h3 id="articleHeader0">&#x997C;&#x56FE;</h3><p><span class="img-wrap"><img data-src="/img/bVbhEAy?w=391&amp;h=206" src="https://static.alili.tech/img/bVbhEAy?w=391&amp;h=206" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x997C;&#x56FE;&#x914D;&#x7F6E;&#x9879;
    var option = {
        series: [
            {
                name:&apos;&#x98CE;&#x9669;&#x9884;&#x8B66;&#x5360;&#x6BD4;&apos;,
                type: &apos;pie&apos;,
                radius: [&apos;25%&apos;, &apos;40%&apos;],
                center: [&apos;50%&apos;, &apos;50%&apos;],
                roseType: false,
                data: [
                    {
                        value: 40,
                        name: &apos;&#x7EA2;&#x8272;&#x9884;&#x8B66;&apos;
                    }, {
                        value: 30,
                        name: &apos;&#x6A59;&#x8272;&#x9884;&#x8B66;&apos;
                    }, {
                        value: 10,
                        name: &apos;&#x9EC4;&#x8272;&#x9884;&#x8B66;&apos;
                    }, {
                        value: 50,
                        name: &apos;&#x84DD;&#x8272;&#x9884;&#x8B66;&apos;
                    }
                ],
                label: {
                    fontSize: 12,
                    color:&apos;#545454&apos;,
                    formatter: function (param) {
                        return param.name + &apos;(&apos; + Math.round(param.percent) + &apos;%&apos; + &apos;)&apos; 
                            + &apos;\n&apos; + param.value +  &apos;&#x4E2A;&apos;;
                    }
                },
                labelLine: {
                    smooth: false,
                    lineStyle: {
                        width: 2
                    }
                },
                itemStyle: {
                    color:function(params){
                        switch (params.name) {
                            case &apos;&#x7EA2;&#x8272;&#x9884;&#x8B66;&apos;:
                                return &apos;#D70002&apos;;
                            case &apos;&#x6A59;&#x8272;&#x9884;&#x8B66;&apos;:
                                return &apos;#FF9309&apos;;
                            case &apos;&#x9EC4;&#x8272;&#x9884;&#x8B66;&apos;:
                                return &apos;#FFFB09&apos;;
                            case &apos;&#x84DD;&#x8272;&#x9884;&#x8B66;&apos;:
                                return &apos;#035EF7&apos;;
                            default:
                                break;
                        }
                    }
                },
            }
        ]
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code><span class="hljs-comment">// &#x997C;&#x56FE;&#x914D;&#x7F6E;&#x9879;</span>
    var option = {
        series: [
            {
                <span class="hljs-built_in">name</span>:<span class="hljs-string">&apos;&#x98CE;&#x9669;&#x9884;&#x8B66;&#x5360;&#x6BD4;&apos;</span>,
                <span class="hljs-built_in">type</span>: <span class="hljs-string">&apos;pie&apos;</span>,
                radius: [<span class="hljs-string">&apos;25%&apos;</span>, <span class="hljs-string">&apos;40%&apos;</span>],
                center: [<span class="hljs-string">&apos;50%&apos;</span>, <span class="hljs-string">&apos;50%&apos;</span>],
                roseType: <span class="hljs-literal">false</span>,
                data: [
                    {
                        value: <span class="hljs-number">40</span>,
                        <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;&#x7EA2;&#x8272;&#x9884;&#x8B66;&apos;</span>
                    }, {
                        value: <span class="hljs-number">30</span>,
                        <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;&#x6A59;&#x8272;&#x9884;&#x8B66;&apos;</span>
                    }, {
                        value: <span class="hljs-number">10</span>,
                        <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;&#x9EC4;&#x8272;&#x9884;&#x8B66;&apos;</span>
                    }, {
                        value: <span class="hljs-number">50</span>,
                        <span class="hljs-built_in">name</span>: <span class="hljs-string">&apos;&#x84DD;&#x8272;&#x9884;&#x8B66;&apos;</span>
                    }
                ],
                label: {
                    fontSize: <span class="hljs-number">12</span>,
                    color:<span class="hljs-string">&apos;#545454&apos;</span>,
                    formatter: function (<span class="hljs-built_in">param</span>) {
                        return <span class="hljs-built_in">param</span>.<span class="hljs-built_in">name</span> + <span class="hljs-string">&apos;(&apos;</span> + Math.<span class="hljs-built_in">round</span>(<span class="hljs-built_in">param</span>.percent) + <span class="hljs-string">&apos;%&apos;</span> + <span class="hljs-string">&apos;)&apos;</span> 
                            + <span class="hljs-string">&apos;\n&apos;</span> + <span class="hljs-built_in">param</span>.value +  <span class="hljs-string">&apos;&#x4E2A;&apos;</span>;
                    }
                },
                labelLine: {
                    smooth: <span class="hljs-literal">false</span>,
                    lineStyle: {
                        width: <span class="hljs-number">2</span>
                    }
                },
                itemStyle: {
                    color:function(<span class="hljs-built_in">params</span>){
                        <span class="hljs-keyword">switch</span> (<span class="hljs-built_in">params</span>.<span class="hljs-built_in">name</span>) {
                            <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;&#x7EA2;&#x8272;&#x9884;&#x8B66;&apos;</span>:
                                return <span class="hljs-string">&apos;#D70002&apos;</span>;
                            <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;&#x6A59;&#x8272;&#x9884;&#x8B66;&apos;</span>:
                                return <span class="hljs-string">&apos;#FF9309&apos;</span>;
                            <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;&#x9EC4;&#x8272;&#x9884;&#x8B66;&apos;</span>:
                                return <span class="hljs-string">&apos;#FFFB09&apos;</span>;
                            <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;&#x84DD;&#x8272;&#x9884;&#x8B66;&apos;</span>:
                                return <span class="hljs-string">&apos;#035EF7&apos;</span>;
                            <span class="hljs-keyword">default</span>:
                                break;
                        }
                    }
                },
            }
        ]
    }</code></pre><h3 id="articleHeader1">&#x5806;&#x53E0;&#x67F1;&#x72B6;&#x56FE;</h3><p><span class="img-wrap"><img data-src="/img/bVbhEAE?w=397&amp;h=402" src="https://static.alili.tech/img/bVbhEAE?w=397&amp;h=402" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5806;&#x53E0;&#x67F1;&#x72B6;&#x56FE;&#x914D;&#x7F6E;&#x9879;
  var option = {
      backgroundColor: &apos;#fff&apos;,
      tooltip: {
          trigger: &apos;axis&apos;,
          axisPointer: {
              type: &apos;shadow&apos;
          }
      },
      legend: {
          bottom: &apos;10&apos;,
          itemGap: 30,
          data: [&apos;&#x4E00;&#x7EA7;&apos;, &apos;&#x4E8C;&#x7EA7;&apos;, &apos;&#x4E09;&#x7EA7;&apos;, &apos;&#x56DB;&#x7EA7;&apos;]
      },
      grid: { //&#x56FE;&#x8868;&#x7684;&#x4F4D;&#x7F6E;
          top: 30,
          left: 10,
          right: 80,
          bottom: 60,
          containLabel: true
      },
      dataZoom: [
          {
              type: &apos;inside&apos;
          }, {
              type: &apos;slider&apos;,
              start: 0,
              bottom: 40,
              height: &apos;15px&apos;,
              fillerColor:&apos;rgba(202,223,255,.8)&apos;,
              borderColor:&apos;#b6d2fc&apos;,
              handleStyle:{
                  color:&apos;#b6d2fc&apos;
              },
              dataBackground:{
                  lineStyle:{
                      color:&apos;#b6d2fc&apos;
                  },
                  areaStyle:{
                      color:&apos;rgba(202,223,255,.8)&apos;
                  }
              }
          }
      ],
      yAxis: [
          {
              type: &apos;value&apos;,
              name: &apos;&#x5907;&#x6848;&#x4E2A;&#x6570;&apos;,
              nameTextStyle: {
                  fontSize: 12,
                  fontWeight: &apos;bold&apos;,
                  color: &apos;#454545&apos;
              },
              splitLine: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: &apos;#B3B3B3&apos;
                  }
              },
              axisLabel: {
                  color: &apos;#454545&apos;
              }
          }
      ],
      xAxis: [
          {
              type: &apos;category&apos;,
              name: &apos;&#x533A;&#x53BF;&#x540D;&#x79F0;&apos;,
              nameTextStyle: {
                  fontSize: 12,
                  fontWeight: &apos;bold&apos;,
                  color: &apos;#454545&apos;
              },
              axisLine: {
                  lineStyle: {
                      color: &apos;#B3B3B3&apos;
                  }
              },
              axisLabel: {
                  color: &apos;#454545&apos;
              },
              data: [&apos;&#x9F13;&#x697C;&#x533A;&apos;,&apos;&#x7384;&#x6B66;&#x533A;&apos;,&apos;&#x79E6;&#x6DEE;&#x533A;&apos;]
          }
      ],
      series: [
          {
              name: &apos;&#x4E00;&#x7EA7;&apos;,
              type: &apos;bar&apos;,
              stack: &apos;&#x603B;&#x91CF;&apos;,
              barWidth: &apos;10px&apos;,
              itemStyle:{
                  color:&apos;#D70002&apos;
              },
              data: [2,4,6]
          },
          {
              name: &apos;&#x4E8C;&#x7EA7;&apos;,
              type: &apos;bar&apos;,
              stack: &apos;&#x603B;&#x91CF;&apos;,
              barWidth: &apos;10px&apos;,
              data: [2,4,1]
          },
          {
              name: &apos;&#x4E09;&#x7EA7;&apos;,
              type: &apos;bar&apos;,
              stack: &apos;&#x603B;&#x91CF;&apos;,
              barWidth: &apos;10px&apos;,
              itemStyle:{
                  color:&apos;#FFFB09&apos;
              },
              data: [1,5,7]
          },
          {
              name: &apos;&#x56DB;&#x7EA7;&apos;,
              type: &apos;bar&apos;,
              stack: &apos;&#x603B;&#x91CF;&apos;,
              barWidth: &apos;10px&apos;,
              itemStyle:{
                  color:&apos;#FF9309&apos;
              },
              data: [1]
          }
      ]
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">//&#x5806;&#x53E0;&#x67F1;&#x72B6;&#x56FE;&#x914D;&#x7F6E;&#x9879;</span>
  <span class="hljs-string">var</span> <span class="hljs-string">option</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      backgroundColor:</span> <span class="hljs-string">&apos;#fff&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      tooltip:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          trigger:</span> <span class="hljs-string">&apos;axis&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">          axisPointer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;shadow&apos;</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      legend:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          bottom:</span> <span class="hljs-string">&apos;10&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">          itemGap:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">          data:</span> <span class="hljs-string">[&apos;&#x4E00;&#x7EA7;&apos;,</span> <span class="hljs-string">&apos;&#x4E8C;&#x7EA7;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x4E09;&#x7EA7;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x56DB;&#x7EA7;&apos;</span><span class="hljs-string">]</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      grid:</span> <span class="hljs-string">{</span> <span class="hljs-string">//&#x56FE;&#x8868;&#x7684;&#x4F4D;&#x7F6E;</span>
<span class="hljs-attr">          top:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">          left:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span>
<span class="hljs-attr">          right:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">          bottom:</span> <span class="hljs-number">60</span><span class="hljs-string">,</span>
<span class="hljs-attr">          containLabel:</span> <span class="hljs-literal">true</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      dataZoom:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;inside&apos;</span>
          <span class="hljs-string">},</span> <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;slider&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              start:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">              bottom:</span> <span class="hljs-number">40</span><span class="hljs-string">,</span>
<span class="hljs-attr">              height:</span> <span class="hljs-string">&apos;15px&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              fillerColor:</span><span class="hljs-string">&apos;rgba(202,223,255,.8)&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              borderColor:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              handleStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              dataBackground:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  lineStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span>
                  <span class="hljs-string">},</span>
<span class="hljs-attr">                  areaStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span><span class="hljs-string">&apos;rgba(202,223,255,.8)&apos;</span>
                  <span class="hljs-string">}</span>
              <span class="hljs-string">}</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      yAxis:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;value&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x5907;&#x6848;&#x4E2A;&#x6570;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              nameTextStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  fontSize:</span> <span class="hljs-number">12</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  fontWeight:</span> <span class="hljs-string">&apos;bold&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              splitLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  show:</span> <span class="hljs-literal">false</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  lineStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span> <span class="hljs-string">&apos;#B3B3B3&apos;</span>
                  <span class="hljs-string">}</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLabel:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">}</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      xAxis:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;category&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x533A;&#x53BF;&#x540D;&#x79F0;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              nameTextStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  fontSize:</span> <span class="hljs-number">12</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  fontWeight:</span> <span class="hljs-string">&apos;bold&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  lineStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span> <span class="hljs-string">&apos;#B3B3B3&apos;</span>
                  <span class="hljs-string">}</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLabel:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              data:</span> <span class="hljs-string">[&apos;&#x9F13;&#x697C;&#x533A;&apos;,&apos;&#x7384;&#x6B66;&#x533A;&apos;,&apos;&#x79E6;&#x6DEE;&#x533A;&apos;]</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      series:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x4E00;&#x7EA7;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;bar&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              stack:</span> <span class="hljs-string">&apos;&#x603B;&#x91CF;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              barWidth:</span> <span class="hljs-string">&apos;10px&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              itemStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span><span class="hljs-string">&apos;#D70002&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              data:</span> <span class="hljs-string">[2,4,6]</span>
          <span class="hljs-string">},</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x4E8C;&#x7EA7;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;bar&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              stack:</span> <span class="hljs-string">&apos;&#x603B;&#x91CF;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              barWidth:</span> <span class="hljs-string">&apos;10px&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              data:</span> <span class="hljs-string">[2,4,1]</span>
          <span class="hljs-string">},</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x4E09;&#x7EA7;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;bar&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              stack:</span> <span class="hljs-string">&apos;&#x603B;&#x91CF;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              barWidth:</span> <span class="hljs-string">&apos;10px&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              itemStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span><span class="hljs-string">&apos;#FFFB09&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              data:</span> <span class="hljs-string">[1,5,7]</span>
          <span class="hljs-string">},</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x56DB;&#x7EA7;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;bar&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              stack:</span> <span class="hljs-string">&apos;&#x603B;&#x91CF;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              barWidth:</span> <span class="hljs-string">&apos;10px&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              itemStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span><span class="hljs-string">&apos;#FF9309&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              data:</span> <span class="hljs-string">[1]</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">]</span>
    <span class="hljs-string">}</span></code></pre><h3 id="articleHeader2">&#x6E10;&#x53D8;&#x67F1;&#x72B6;&#x56FE;</h3><p><span class="img-wrap"><img data-src="/img/bVbhEAG?w=404&amp;h=377" src="https://static.alili.tech/img/bVbhEAG?w=404&amp;h=377" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x914D;&#x7F6E;&#x9879;
var option = {
      backgroundColor: &apos;#fff&apos;,
      color: [
          new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  { offset: 0, color: &apos;#23E9EE&apos; },
                  { offset: 1, color: &apos;#0460F7&apos; }
              ]
          )
      ],
      tooltip: {
          trigger: &apos;axis&apos;,
          axisPointer: {
              type: &apos;shadow&apos;
          }
      },
      legend: {
          bottom: &apos;10&apos;,
          itemGap: 30,
          data: [&apos;&#x4E00;&#x7EA7;&apos;, &apos;&#x4E8C;&#x7EA7;&apos;, &apos;&#x4E09;&#x7EA7;&apos;, &apos;&#x56DB;&#x7EA7;&apos;]
      },
      grid: { //&#x56FE;&#x8868;&#x7684;&#x4F4D;&#x7F6E;
          top: 30,
          left: 10,
          right: 80,
          bottom: 60,
          containLabel: true
      },
      dataZoom: [
          {
              type: &apos;inside&apos;
          }, {
              type: &apos;slider&apos;,
              start: 0,
              bottom: 40,
              height: &apos;15px&apos;,
              fillerColor:&apos;rgba(202,223,255,.8)&apos;,
              borderColor:&apos;#b6d2fc&apos;,
              handleStyle:{
                  color:&apos;#b6d2fc&apos;
              },
              dataBackground:{
                  lineStyle:{
                      color:&apos;#b6d2fc&apos;
                  },
                  areaStyle:{
                      color:&apos;rgba(202,223,255,.8)&apos;
                  }
              }
          }
      ],
      yAxis: [
          {
              type: &apos;value&apos;,
              name: &apos;&#x5907;&#x6848;&#x4E2A;&#x6570;&apos;,
              nameTextStyle: {
                  fontSize: 12,
                  fontWeight: &apos;bold&apos;,
                  color: &apos;#454545&apos;
              },
              splitLine: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: &apos;#B3B3B3&apos;
                  }
              },
              axisLabel: {
                  color: &apos;#454545&apos;
              }
          }
      ],
      xAxis: [
          {
              type: &apos;category&apos;,
              name: &apos;&#x533A;&#x53BF;&#x540D;&#x79F0;&apos;,
              nameTextStyle: {
                  fontSize: 12,
                  fontWeight: &apos;bold&apos;,
                  color: &apos;#454545&apos;
              },
              axisLine: {
                  lineStyle: {
                      color: &apos;#B3B3B3&apos;
                  }
              },
              axisLabel: {
                  color: &apos;#454545&apos;
              },
              data: [&apos;&#x9F13;&#x697C;&#x533A;&apos;,&apos;&#x7384;&#x6B66;&#x533A;&apos;,&apos;&#x79E6;&#x6DEE;&#x533A;&apos;]
          }
      ],
      series: [
          {
              name: &apos;&#x62A5;&#x8B66;&apos;,
              type: &apos;bar&apos;,
              stack: &apos;&#x603B;&#x91CF;&apos;,
              barWidth: &apos;10px&apos;,
              data: [1,2,4]
          }
      ]
  };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">//&#x914D;&#x7F6E;&#x9879;</span>
<span class="hljs-string">var</span> <span class="hljs-string">option</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      backgroundColor:</span> <span class="hljs-string">&apos;#fff&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      color:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">new</span> <span class="hljs-string">echarts.graphic.LinearGradient(</span>
              <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
              <span class="hljs-string">[</span>
                  <span class="hljs-string">{</span> <span class="hljs-attr">offset:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-attr">color:</span> <span class="hljs-string">&apos;#23E9EE&apos;</span> <span class="hljs-string">},</span>
                  <span class="hljs-string">{</span> <span class="hljs-attr">offset:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-attr">color:</span> <span class="hljs-string">&apos;#0460F7&apos;</span> <span class="hljs-string">}</span>
              <span class="hljs-string">]</span>
          <span class="hljs-string">)</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      tooltip:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          trigger:</span> <span class="hljs-string">&apos;axis&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">          axisPointer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;shadow&apos;</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      legend:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          bottom:</span> <span class="hljs-string">&apos;10&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">          itemGap:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">          data:</span> <span class="hljs-string">[&apos;&#x4E00;&#x7EA7;&apos;,</span> <span class="hljs-string">&apos;&#x4E8C;&#x7EA7;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x4E09;&#x7EA7;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x56DB;&#x7EA7;&apos;</span><span class="hljs-string">]</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      grid:</span> <span class="hljs-string">{</span> <span class="hljs-string">//&#x56FE;&#x8868;&#x7684;&#x4F4D;&#x7F6E;</span>
<span class="hljs-attr">          top:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">          left:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span>
<span class="hljs-attr">          right:</span> <span class="hljs-number">80</span><span class="hljs-string">,</span>
<span class="hljs-attr">          bottom:</span> <span class="hljs-number">60</span><span class="hljs-string">,</span>
<span class="hljs-attr">          containLabel:</span> <span class="hljs-literal">true</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      dataZoom:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;inside&apos;</span>
          <span class="hljs-string">},</span> <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;slider&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              start:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">              bottom:</span> <span class="hljs-number">40</span><span class="hljs-string">,</span>
<span class="hljs-attr">              height:</span> <span class="hljs-string">&apos;15px&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              fillerColor:</span><span class="hljs-string">&apos;rgba(202,223,255,.8)&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              borderColor:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              handleStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              dataBackground:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  lineStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span>
                  <span class="hljs-string">},</span>
<span class="hljs-attr">                  areaStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span><span class="hljs-string">&apos;rgba(202,223,255,.8)&apos;</span>
                  <span class="hljs-string">}</span>
              <span class="hljs-string">}</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      yAxis:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;value&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x5907;&#x6848;&#x4E2A;&#x6570;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              nameTextStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  fontSize:</span> <span class="hljs-number">12</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  fontWeight:</span> <span class="hljs-string">&apos;bold&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              splitLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  show:</span> <span class="hljs-literal">false</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  lineStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span> <span class="hljs-string">&apos;#B3B3B3&apos;</span>
                  <span class="hljs-string">}</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLabel:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">}</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      xAxis:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;category&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x533A;&#x53BF;&#x540D;&#x79F0;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              nameTextStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  fontSize:</span> <span class="hljs-number">12</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  fontWeight:</span> <span class="hljs-string">&apos;bold&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  lineStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span> <span class="hljs-string">&apos;#B3B3B3&apos;</span>
                  <span class="hljs-string">}</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLabel:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              data:</span> <span class="hljs-string">[&apos;&#x9F13;&#x697C;&#x533A;&apos;,&apos;&#x7384;&#x6B66;&#x533A;&apos;,&apos;&#x79E6;&#x6DEE;&#x533A;&apos;]</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      series:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x62A5;&#x8B66;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;bar&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              stack:</span> <span class="hljs-string">&apos;&#x603B;&#x91CF;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              barWidth:</span> <span class="hljs-string">&apos;10px&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              data:</span> <span class="hljs-string">[1,2,4]</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">]</span>
  <span class="hljs-string">};</span></code></pre><h3 id="articleHeader3">&#x7EBF;&#x56FE;</h3><p><span class="img-wrap"><img data-src="/img/bVbhEAK?w=395&amp;h=373" src="https://static.alili.tech/img/bVbhEAK?w=395&amp;h=373" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7EBF;&#x56FE;&#x914D;&#x7F6E;&#x9879;
var option = {
      tooltip: {
          trigger: &apos;axis&apos;
      },
      color: [
          new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  {offset: 0, color: &apos;#23E9EE&apos;},
                  {offset: 1, color: &apos;#0460F7&apos;}
              ]
          )
      ],
      grid: {
          top: 30,
          left: 10,
          right: 30,
          bottom: 50,
          containLabel: true
      },
      dataZoom: [
          {
              type: &apos;inside&apos;
          }, {
              type: &apos;slider&apos;,
              start: 0,
              bottom: 30,
              height: &apos;15px&apos;,
              fillerColor:&apos;rgba(202,223,255,.8)&apos;,
              borderColor:&apos;#b6d2fc&apos;,
              handleStyle:{
                  color:&apos;#b6d2fc&apos;
              },
              dataBackground:{
                  lineStyle:{
                      color:&apos;#b6d2fc&apos;
                  },
                  areaStyle:{
                      color:&apos;rgba(202,223,255,.8)&apos;
                  }
              }
          }
      ],
      yAxis: [
          {
              type: &apos;value&apos;,
              splitLine: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: &apos;#B3B3B3&apos;
                  }
              },
              axisLabel: {
                  color: &apos;#454545&apos;
              }
          }
      ],
      xAxis: {
          type: &apos;category&apos;,
          boundaryGap:false,
          axisLine: {
              lineStyle: {
                  color: &apos;#B3B3B3&apos;
              }
          },
          axisLabel: {
              color: &apos;#454545&apos;
          },
          data: [&apos;&#x5468;&#x4E00;&apos;, &apos;&#x5468;&#x4E8C;&apos;, &apos;&#x5468;&#x4E09;&apos;, &apos;&#x5468;&#x56DB;&apos;, &apos;&#x5468;&#x4E94;&apos;, &apos;&#x5468;&#x516D;&apos;, &apos;&#x5468;&#x65E5;&apos;]
      },
      series: [
          {
              name: &apos;&#x62A5;&#x8B66;&#x4E2A;&#x6570;&apos;,
              type: &apos;line&apos;,
              symbol: &apos;emptyCircle&apos;,
              symbolSize: 2,
              showSymbol: false,
              smooth: true,
              areaStyle: {
                  color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                          {offset: 0, color: &apos;rgba(35,233,238,.4)&apos;},
                          {offset: 1, color: &apos;rgba(4,96,247,.4)&apos;}
                      ]
                  )
              },
              lineStyle: {
                  width: 1,
                  color: &apos;#59cef5&apos;
              },
              itemStyle: {
                  borderColor: &apos;#59cef5&apos;,
                  borderWidth: 2
              },
              data:[2,4,3,2,1,4,2]
          }
      ]
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">//&#x7EBF;&#x56FE;&#x914D;&#x7F6E;&#x9879;</span>
<span class="hljs-string">var</span> <span class="hljs-string">option</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      tooltip:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          trigger:</span> <span class="hljs-string">&apos;axis&apos;</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      color:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">new</span> <span class="hljs-string">echarts.graphic.LinearGradient(</span>
              <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
              <span class="hljs-string">[</span>
                  <span class="hljs-string">{offset:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-attr">color:</span> <span class="hljs-string">&apos;#23E9EE&apos;</span><span class="hljs-string">},</span>
                  <span class="hljs-string">{offset:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-attr">color:</span> <span class="hljs-string">&apos;#0460F7&apos;</span><span class="hljs-string">}</span>
              <span class="hljs-string">]</span>
          <span class="hljs-string">)</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      grid:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          top:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">          left:</span> <span class="hljs-number">10</span><span class="hljs-string">,</span>
<span class="hljs-attr">          right:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">          bottom:</span> <span class="hljs-number">50</span><span class="hljs-string">,</span>
<span class="hljs-attr">          containLabel:</span> <span class="hljs-literal">true</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      dataZoom:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;inside&apos;</span>
          <span class="hljs-string">},</span> <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;slider&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              start:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">              bottom:</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
<span class="hljs-attr">              height:</span> <span class="hljs-string">&apos;15px&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              fillerColor:</span><span class="hljs-string">&apos;rgba(202,223,255,.8)&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              borderColor:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              handleStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              dataBackground:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                  lineStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span><span class="hljs-string">&apos;#b6d2fc&apos;</span>
                  <span class="hljs-string">},</span>
<span class="hljs-attr">                  areaStyle:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span><span class="hljs-string">&apos;rgba(202,223,255,.8)&apos;</span>
                  <span class="hljs-string">}</span>
              <span class="hljs-string">}</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      yAxis:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;value&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              splitLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  show:</span> <span class="hljs-literal">false</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  lineStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                      color:</span> <span class="hljs-string">&apos;#B3B3B3&apos;</span>
                  <span class="hljs-string">}</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              axisLabel:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
              <span class="hljs-string">}</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">],</span>
<span class="hljs-attr">      xAxis:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          type:</span> <span class="hljs-string">&apos;category&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">          boundaryGap:</span><span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">          axisLine:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">              lineStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#B3B3B3&apos;</span>
              <span class="hljs-string">}</span>
          <span class="hljs-string">},</span>
<span class="hljs-attr">          axisLabel:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">              color:</span> <span class="hljs-string">&apos;#454545&apos;</span>
          <span class="hljs-string">},</span>
<span class="hljs-attr">          data:</span> <span class="hljs-string">[&apos;&#x5468;&#x4E00;&apos;,</span> <span class="hljs-string">&apos;&#x5468;&#x4E8C;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x5468;&#x4E09;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x5468;&#x56DB;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x5468;&#x4E94;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x5468;&#x516D;&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">&apos;&#x5468;&#x65E5;&apos;</span><span class="hljs-string">]</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      series:</span> <span class="hljs-string">[</span>
          <span class="hljs-string">{</span>
<span class="hljs-attr">              name:</span> <span class="hljs-string">&apos;&#x62A5;&#x8B66;&#x4E2A;&#x6570;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              type:</span> <span class="hljs-string">&apos;line&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              symbol:</span> <span class="hljs-string">&apos;emptyCircle&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">              symbolSize:</span> <span class="hljs-number">2</span><span class="hljs-string">,</span>
<span class="hljs-attr">              showSymbol:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">              smooth:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">              areaStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">new</span> <span class="hljs-string">echarts.graphic.LinearGradient(</span>
                      <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
                      <span class="hljs-string">[</span>
                          <span class="hljs-string">{offset:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span> <span class="hljs-attr">color:</span> <span class="hljs-string">&apos;rgba(35,233,238,.4)&apos;</span><span class="hljs-string">},</span>
                          <span class="hljs-string">{offset:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span> <span class="hljs-attr">color:</span> <span class="hljs-string">&apos;rgba(4,96,247,.4)&apos;</span><span class="hljs-string">}</span>
                      <span class="hljs-string">]</span>
                  <span class="hljs-string">)</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              lineStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  width:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  color:</span> <span class="hljs-string">&apos;#59cef5&apos;</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              itemStyle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                  borderColor:</span> <span class="hljs-string">&apos;#59cef5&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">                  borderWidth:</span> <span class="hljs-number">2</span>
              <span class="hljs-string">},</span>
<span class="hljs-attr">              data:</span><span class="hljs-string">[2,4,3,2,1,4,2]</span>
          <span class="hljs-string">}</span>
      <span class="hljs-string">]</span>
  <span class="hljs-string">}</span></code></pre><h3 id="articleHeader4">&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chart = echarts.init(document.getElementById(&apos;chartBox&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> chart = echarts.init(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;chartBox&apos;</span>));</code></pre><h3 id="articleHeader5">&#x8BBE;&#x7F6E;&#x56FE;&#x8868;&#x5B9E;&#x4F8B;&#x7684;&#x914D;&#x7F6E;&#x9879;</h3><blockquote>&#x8BBE;&#x7F6E;&#x56FE;&#x8868;&#x5B9E;&#x4F8B;&#x7684;&#x914D;&#x7F6E;&#x9879;&#x4EE5;&#x53CA;&#x6570;&#x636E;&#xFF0C;&#x4E07;&#x80FD;&#x63A5;&#x53E3;&#xFF0C;&#x6240;&#x6709;&#x53C2;&#x6570;&#x548C;&#x6570;&#x636E;&#x7684;&#x4FEE;&#x6539;&#x90FD;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;setOption&#x5B8C;&#x6210;&#xFF0C;ECharts &#x4F1A;&#x5408;&#x5E76;&#x65B0;&#x7684;&#x53C2;&#x6570;&#x548C;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x5237;&#x65B0;&#x56FE;&#x8868;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chart.setOption(option);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code style="word-break:break-word;white-space:initial">chart.setOption(option)<span class="hljs-comment">;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常用echarts图表

## 原文链接
[https://segmentfault.com/a/1190000016560271](https://segmentfault.com/a/1190000016560271)

