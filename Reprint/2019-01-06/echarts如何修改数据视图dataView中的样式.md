---
title: 'echarts如何修改数据视图dataView中的样式' 
date: 2019-01-06 2:30:10
hidden: true
slug: eskx864cv2d
categories: [reprint]
---

{{< raw >}}

                    
<p>做了一个现实折线图的图表，通过右上角icon可以自由切换成柱状图，表格。<br>在表格中遇到的一点小问题，解决方案如下：</p>
<h3 id="articleHeader0">1、场景重现</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010434719" src="https://static.alili.tech/img/remote/1460000010434719" alt="场景重现" title="场景重现" style="cursor: pointer; display: inline;"></span><br>这是一个显示两个折线图的图表，一切看起来都很顺利。<br>但是点击红色箭头所指的图标，这个作用就是以表格的形式展现。<br>展现如下。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010434720" src="https://static.alili.tech/img/remote/1460000010434720" alt="场景重现" title="场景重现" style="cursor: pointer; display: inline;"></span></p>
<p>很丑是吧，测试姐姐说一定要改掉。<br>附加一下右上角的实现代码，在options配置项加下面的配置就OK。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//右上角切换实现方法
toolbox: {
    show: true,
        right: '5%',
        feature: {
        dataView: {
            readOnly: true              
        },
        magicType: {type: ['line', 'bar']}
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//右上角切换实现方法</span>
<span class="hljs-attribute">toolbox</span>: {
    <span class="hljs-attribute">show</span>: true,
        <span class="hljs-attribute">right</span>: <span class="hljs-string">'5%'</span>,
        <span class="hljs-attribute">feature</span>: {
        <span class="hljs-attribute">dataView</span>: {
            <span class="hljs-attribute">readOnly</span>: true              
        },
        <span class="hljs-attribute">magicType</span>: {<span class="hljs-attribute">type</span>: [<span class="hljs-string">'line'</span>, <span class="hljs-string">'bar'</span>]}
    }
},</code></pre>
<h3 id="articleHeader1">2、解决方案</h3>
<p><a href="http://echarts.baidu.com/option.html#toolbox.feature.dataView.optionToContent" rel="nofollow noreferrer" target="_blank">点击文档传送门</a><br><span class="img-wrap"><img data-src="/img/remote/1460000010434721" src="https://static.alili.tech/img/remote/1460000010434721" alt="文档地址" title="文档地址" style="cursor: pointer; display: inline;"></span></p>
<p>echarts给的解决的办法就是自定义。<br>下面写了一个小表格，opt包含了所有折线图的数据，自己组装下。<br>可以console看看都有什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="optionToContent: function (opt) {
    let axisData = opt.xAxis[0].data; //坐标数据
    let series = opt.series; //折线图数据
    let tdHeads = '<td  style=&quot;padding: 0 10px&quot;>时间</td>'; //表头
    let tdBodys = ''; //数据
    series.forEach(function (item) {
        //组装表头
        tdHeads += `<td style=&quot;padding: 0 10px&quot;>${item.name}</td>`;
    });
    let table = `<table border=&quot;1&quot; style=&quot;margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center&quot;><tbody><tr>${tdHeads} </tr>`;
    for (let i = 0, l = axisData.length; i < l; i++) {
        for (let j = 0; j < series.length; j++) {
            //组装表数据
            tdBodys += `<td>${ series[j].data[i]}</td>`;
        }
        table += `<tr><td style=&quot;padding: 0 10px&quot;>${axisData[i]}</td>${tdBodys}</tr>`;
        tdBodys = '';
    }
    table += '</tbody></table>';
    return table;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>optionToContent: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">opt</span>) </span>{
    <span class="hljs-keyword">let</span> axisData = opt.xAxis[<span class="hljs-number">0</span>].data; <span class="hljs-comment">//坐标数据</span>
    <span class="hljs-keyword">let</span> series = opt.series; <span class="hljs-comment">//折线图数据</span>
    <span class="hljs-keyword">let</span> tdHeads = <span class="hljs-string">'&lt;td  style="padding: 0 10px"&gt;时间&lt;/td&gt;'</span>; <span class="hljs-comment">//表头</span>
    <span class="hljs-keyword">let</span> tdBodys = <span class="hljs-string">''</span>; <span class="hljs-comment">//数据</span>
    series.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
        <span class="hljs-comment">//组装表头</span>
        tdHeads += <span class="hljs-string">`&lt;td style="padding: 0 10px"&gt;<span class="hljs-subst">${item.name}</span>&lt;/td&gt;`</span>;
    });
    <span class="hljs-keyword">let</span> table = <span class="hljs-string">`&lt;table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"&gt;&lt;tbody&gt;&lt;tr&gt;<span class="hljs-subst">${tdHeads}</span> &lt;/tr&gt;`</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = axisData.length; i &lt; l; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; series.length; j++) {
            <span class="hljs-comment">//组装表数据</span>
            tdBodys += <span class="hljs-string">`&lt;td&gt;<span class="hljs-subst">${ series[j].data[i]}</span>&lt;/td&gt;`</span>;
        }
        table += <span class="hljs-string">`&lt;tr&gt;&lt;td style="padding: 0 10px"&gt;<span class="hljs-subst">${axisData[i]}</span>&lt;/td&gt;<span class="hljs-subst">${tdBodys}</span>&lt;/tr&gt;`</span>;
        tdBodys = <span class="hljs-string">''</span>;
    }
    table += <span class="hljs-string">'&lt;/tbody&gt;&lt;/table&gt;'</span>;
    <span class="hljs-keyword">return</span> table;
}</code></pre>
<p>改完效果如下，大家可以自己试试看哦。可以改成自己想要的风格哦。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010434722" src="https://static.alili.tech/img/remote/1460000010434722" alt="更改后" title="更改后" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">3、总结</h3>
<p>和数据视图有关的都可以这样改，不一定是我的那个场景。</p>
<p>如果项目中图表很多，可以把这段代码抽取出来，毕竟篇幅很长。<br>写这篇文章，主要是自己刚学会，其次是搜了一会没找到合适的答案。就分享下自己的小喜悦吧，嘻嘻。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
echarts如何修改数据视图dataView中的样式

## 原文链接
[https://segmentfault.com/a/1190000010434714](https://segmentfault.com/a/1190000010434714)

