---
title: vue安装 搭建 在项目中安装elementui
hidden: true
categories: [reprint]
slug: a078a787
date: 2018-11-06 02:30:12
---

{{< raw >}}
<p>&#x5728;&#x5B89;&#x88C5;vue&#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x786E;&#x4FDD;node&#x548C;npm&#x662F;&#x5426;&#x5B89;&#x88C5;&#x3002;<br>&#x5982;&#x679C;&#x5B89;&#x88C5;ok&#xFF0C;&#x90A3;&#x4E48;&#x63A5;&#x4E0B;&#x6765;&#x5B89;&#x88C5;vue<br>1.&#xA0;npm install vue&#xA0; (&#x5B89;&#x88C5;vue)<br>2.&#xA0;npm install --global vue-cli&#xA0; &#xFF08;&#x5B89;&#x88C5;vue-cli&#xFF09;<br>&#x56E0;&#x4E3A;npm&#x662F;&#x56FD;&#x5916;&#x7684;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x6BD4;&#x8F83;&#x6162;&#xFF0C;&#x4F7F;&#x5B89;&#x88C5;vue&#x4F1A;&#x51FA;&#x73B0;&#x62A5;&#x9519;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x53EF;&#x4EE5;&#x8BD5;&#x7740; &#xA0;&#x5B89;&#x88C5; &#x6DD8;&#x5B9D;&#x955C;&#x50CF;&#xFF1A;1.&#xA0;npm install -g cnpm --registry=<a href="https://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.org</a><br>2.&#xA0;cnpm install cnpm -g&#xA0;&#xA0; (&#x5B89;&#x88C5;cnpm)<br>3.&#xA0;cnpm install vue&#xA0;&#xA0; (&#x5B89;&#x88C5;vue)<br>4.&#xA0;cnpm install --global vue-cli&#xA0;&#xA0; &#xFF08;&#x5B89;&#x88C5;vue-cli&#xFF09;<br>vue&#x642D;&#x5EFA;&#x9879;&#x76EE;<br>1.&#xA0;vue init webpack &#x9879;&#x76EE;&#x540D;&#x79F0;</p><p>2.cd &#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4E0B;</p><p>3.npm run dev (&#x8FD0;&#x884C;&#x9879;&#x76EE;)</p><p>4.npm i element-ui &#x2013;S &#xFF08;&#x5B89;&#x88C5;elementui&#xFF09;</p><p>&#x5728;package.json&#x53EF;&#x4EE5;&#x770B;&#x5230;elementui&#x5DF2;&#x7ECF;&#x5B89;&#x88C5;&#x597D;&#x4E86;</p><p><span class="img-wrap"><img data-src="/img/bVbhJ5V?w=381&amp;h=232" src="https://static.alili.tech/img/bVbhJ5V?w=381&amp;h=232" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>5.&#x5728;main.js&#x4E2D;&#x5F15;&#x5165;elementui &#xFF08;main.js&#x662F;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8FD9;&#x91CC;&#x5F15;&#x5165;&#x5C31;&#x884C;&#xFF0C;&#x9875;&#x9762;&#x5C31;&#x4E0D;&#x7528;&#x5F15;&#x5165;&#x4E86;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVbhJ5X?w=403&amp;h=194" src="https://static.alili.tech/img/bVbhJ5X?w=403&amp;h=194" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>6.&#x524D;&#x540E;&#x7AEF;&#x4EA4;&#x4E92;&#xFF0C;&#x8981;&#x5B89;&#x88C5;axios,&#x5E76;&#x4E14;&#x5728;main.js&#x914D;&#x7F6E;&#xFF08;&#x5B89;&#x88C5;&#x8DDF;&#x5F15;&#x5165; &#x8DDF;elementui&#x4E00;&#x6837;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    axios.get(url).then(res=&gt;{
      if(res.data.retCode == 200){
     //&#x6210;&#x529F;
&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;}else{
         //&#x5931;&#x8D25;
      }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>    <span class="hljs-selector-tag">axios</span><span class="hljs-selector-class">.get</span>(url)<span class="hljs-selector-class">.then</span>(res=&gt;{
      <span class="hljs-selector-tag">if</span>(res.data.retCode == <span class="hljs-number">200</span>){
     <span class="hljs-comment">//&#x6210;&#x529F;</span>
&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;}else{
         <span class="hljs-comment">//&#x5931;&#x8D25;</span>
      }
})
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue安装 搭建 在项目中安装elementui

## 原文链接
[https://segmentfault.com/a/1190000016582758](https://segmentfault.com/a/1190000016582758)

