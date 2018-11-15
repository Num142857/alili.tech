---
title: '实现拖拽复制和可排序的react.js组件' 
date: 2018-11-15 21:18:15
hidden: true
slug: nuuxfiy4dao
categories: reprint
---

{% raw %}
<p>&#x5728;&#x5B9E;&#x73B0;&#x590D;&#x5236;&#x524D;&#xFF0C;&#x5BF9;&#x4E4B;&#x524D;&#x7684;&#x62D6;&#x62FD;&#x6392;&#x5E8F;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x4E86;&#x4FEE;&#x6539;&#x3002;</p><ol><li>&#x6452;&#x5F03;&#x4E86;value&#x4E2D;&#x7684;content&#x5C5E;&#x6027;&#xFF0C;&#x62D6;&#x62FD;&#x7EC4;&#x4EF6;&#x66B4;&#x9732;&#x7684;render&#x51FD;&#x6570;&#xFF0C;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6E32;&#x67D3;&#xFF0C;&#x8FD9;&#x70B9;&#x4E3B;&#x8981;&#x662F;&#x53C2;&#x8003;&#x4E86;&#x8682;&#x8681;&#x91D1;&#x670D;&#x7684;<a href="https://ant.design/index-cn" rel="nofollow noreferrer">Ant design</a>&#x91CC;&#x9762;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x7684;&#x8BBE;&#x8BA1;&#x3002;</li><li>&#x4E3A;&#x4E86;&#x5B9E;&#x73B0;Data&#x548C;model&#x7684;&#x8131;&#x85D5;&#xFF0C;&#x548C;sortKey&#x4E00;&#x6837;&#xFF0C;&#x7EC4;&#x4EF6;&#x589E;&#x52A0;codeKey&#x5C5E;&#x6027;&#x3002;</li></ol><p>&#x62D6;&#x62FD;&#x590D;&#x5236;&#x7684;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfy8n?w=1515&amp;h=500" src="https://static.alili.tech/img/bVbfy8n?w=1515&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x7531;&#x4E8E;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x7684;&#x6838;&#x5FC3;&#x662F;&#x6839;&#x636E;value&#x6570;&#x636E;&#x6765;&#x6E32;&#x67D3;&#x9875;&#x9762;&#xFF0C;&#x56E0;&#x6B64;&#x5B9E;&#x73B0;&#x62D6;&#x62FD;&#x590D;&#x5236;&#x529F;&#x80FD;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5728;&#x201C;&#x62D6;&#x62FD;&#x91CA;&#x653E;&#x201D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C06;&#x88AB;&#x62D6;&#x62FD;&#x65B9;&#x7684;&#x6570;&#x636E;&#x653E;&#x5230;&#x5F53;&#x524D;&#x76EE;&#x6807;&#x6240;&#x5728;&#x7684;value&#x6570;&#x7EC4;&#x4E2D;&#x5373;&#x53EF;&#x3002;</p><p>&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code>    // &#x5F53;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x6216;&#x662F;&#x9009;&#x4E2D;&#x7684;&#x6587;&#x5B57;&#x88AB;&#x62D6;&#x62FD;&#x91CA;&#x653E;&#x5230;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x91CA;&#x653E;&#x76EE;&#x6807;&#x4F4D;&#x7F6E;&#x65F6;
    drop(dropedSort, data, sortKey, dropedUid, codeKey, ee) {
        ee.preventDefault();
        const code = ee.dataTransfer.getData(&quot;code&quot;);
        const uId = ee.dataTransfer.getData(&quot;uId&quot;);
        const dragedItem = ee.dataTransfer.getData(&quot;item&quot;);
        const sort = ee.dataTransfer.getData(&quot;sort&quot;);
        if (uId === dropedUid) {
            if (sort &lt; dropedSort) {
                data.map(item =&gt; {
                    if (item[codeKey] === code) {
                        item[sortKey] = dropedSort;
                    } else if (item[sortKey] &gt; sort &amp;&amp; item[sortKey] &lt; dropedSort + 1) {
                        item[sortKey]--;
                    }
                    return item;
                });
            } else {
                data.map(item =&gt; {
                    if (item[codeKey] === code) {
                        item[sortKey] = dropedSort;
                    } else if (item[sortKey] &gt; dropedSort - 1 &amp;&amp; item[sortKey] &lt; sort) {
                        item[sortKey]++;
                    }
                    return item;
                });
            }
        } else if (this.props.isAcceptAdd) {
            let objDragedItem = JSON.parse(dragedItem);
            if (data.filter(item =&gt; item[codeKey] === objDragedItem[codeKey]).length === 0) {
                const maxSort = Math.max.apply(Math, data.map(citem =&gt; citem[sortKey]));
                data.map(item =&gt; {
                    if (dropedSort === maxSort) {
                        objDragedItem[sortKey] = dropedSort + 1;
                    } else {
                        if (item.sort &gt; dropedSort) {
                            objDragedItem[sortKey] = dropedSort + 1;
                            item[sortKey]++
                        }
                    }
                    return item
                });
                data.push(objDragedItem)
            }
        }
        this.props.onChange(data)
        if (ee.target.className.indexOf(&apos;droppingContent&apos;) !== -1) {
            ee.target.className = styles.droppedcontent;
        }
    }</code></pre><p>&#x8FD9;&#x91CC;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x6709;&#x4E24;&#x70B9;&#xFF1A;<br>&#x7B2C;&#x4E00;&#x70B9;&#x662F;&#xFF0C;&#x6211;&#x901A;&#x8FC7;this.props.isAcceptAdd&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x6765;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x662F;&#x5426;&#x5141;&#x8BB8;&#x63A5;&#x53D7;&#x62D6;&#x62FD;&#x590D;&#x5236;&#x7684;&#x5143;&#x7D20;&#x3002;<br>&#x7B2C;&#x4E8C;&#x70B9;&#x662F;&#xFF0C;&#x6211;&#x6709;&#x4E00;&#x4E2A;&#x653E;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#x201C;uId&#x201D;&#xFF0C;&#x8FD9;&#x4E2A;&#x201C;uId&#x201D;&#x5728;&#x6BCF;&#x4E2A;&#x62D6;&#x62FD;&#x7EC4;&#x4EF6;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x751F;&#x6210;&#x3002;&#x8FD9;&#x6837;&#x6211;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5B83;&#x6765;&#x5224;&#x65AD;&#xFF0C;&#x5F53;&#x524D;&#x88AB;&#x62D6;&#x62FD;&#x5230;&#x76EE;&#x6807;&#x533A;&#x57DF;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x662F;&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#x7684;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x8FD8;&#x662F;&#x5916;&#x90E8;&#x5143;&#x7D20;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5185;&#x90E8;&#x5C31;&#x6267;&#x884C;&#x6392;&#x5E8F;&#x529F;&#x80FD;&#xFF0C;&#x5916;&#x90E8;&#x5219;&#x6267;&#x884C;&#x590D;&#x5236;&#x7684;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x3002;<br>&#x7EC4;&#x4EF6;API&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfy9U?w=1580&amp;h=762" src="https://static.alili.tech/img/bVbfy9U?w=1580&amp;h=762" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span><br>GitHub&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/VicEcho/VDraggable" rel="nofollow noreferrer">https://github.com/VicEcho/VD...</a></p>
{% endraw %}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实现拖拽复制和可排序的react.js组件

## 原文链接
[https://segmentfault.com/a/1190000016064061](https://segmentfault.com/a/1190000016064061)

