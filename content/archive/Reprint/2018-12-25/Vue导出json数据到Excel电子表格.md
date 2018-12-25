---
title: 'Vue导出json数据到Excel电子表格' 
date: 2018-12-25 2:30:11
hidden: true
slug: wwzpu1qxtej
categories: [reprint]
---

{{< raw >}}

                    
<p>网上看了很多文档感觉都不全，这里写一篇完整的详细教程。</p>
<p>一、安装依赖（前面基本一样）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install file-saver --save
npm install xlsx --save
npm install script-loader --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">file</span>-saver <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> xlsx <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> script-loader <span class="hljs-comment">--save-dev</span>
</code></pre>
<p>二、下载两个所需要的js文件Blob.js和 Export2Excel.js。</p>
<p>这里贴下下载地址：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://xiazai.jb51.net/201708/yuanma/Export2Exce_jb51.rar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">http:<span class="hljs-regexp">//</span>xiazai.jb51.net<span class="hljs-regexp">/201708/yu</span>anma<span class="hljs-regexp">/Export2Exce_jb51.rar</span></code></pre>
<p>三、src目录下新建vendor文件夹，将Blob.js和 Export2Excel.js放进去。</p>
<p>四、更改webpack.base.conf.js配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在resolve的alias： 
'vendor': path.resolve(__dirname, '../src/vendor')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>在<span class="hljs-built_in">resolve</span>的<span class="hljs-built_in">alias</span>： 
<span class="hljs-string">'vendor'</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src/vendor'</span>)
</code></pre>
<p>五、在.vue文件中<br>script部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
  return{
    list:[
        {
          name:'韩版设计时尚风衣大',
          number:'MPM00112',
          salePrice:'￥999.00',
          stocknums:3423,
          salesnums:3423,
          sharenums:3423,
      },
      {
          name:'韩版设计时尚风衣大',
          number:'MPM00112',
          salePrice:'￥999.00',
          stocknums:3423,
          salesnums:3423,
          sharenums:3423,
      },
    ]
  }

methods:{
    formatJson(filterVal, jsonData) {
    　　　　return jsonData.map(v => filterVal.map(j => v[j]))
    　　},
    export2Excel() {
    　　　　require.ensure([], () => {
    　　　　　　const { export_json_to_excel } = require('../../../vendor/Export2Excel');
    　　　　　　const tHeader = ['商品名称','商品货号','售价','库存','销量','分享',];
    　　　　　　const filterVal = ['name', 'number', 'salePrice', 'stocknums', 'salesnums', 'sharenums', ];
    　　　　　　const list = this.goodsItems;
    　　　　　　const data = this.formatJson(filterVal, list);
    　　　　　　export_json_to_excel(tHeader, data, '商品管理列表');
    　　　　})
    　 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>data(){
  <span class="hljs-keyword">return</span>{
    list:[
        {
          name:<span class="hljs-string">'韩版设计时尚风衣大'</span>,
          <span class="hljs-built_in">number</span>:<span class="hljs-string">'MPM00112'</span>,
          salePrice:<span class="hljs-string">'￥999.00'</span>,
          stocknums:<span class="hljs-number">3423</span>,
          salesnums:<span class="hljs-number">3423</span>,
          sharenums:<span class="hljs-number">3423</span>,
      },
      {
          name:<span class="hljs-string">'韩版设计时尚风衣大'</span>,
          <span class="hljs-built_in">number</span>:<span class="hljs-string">'MPM00112'</span>,
          salePrice:<span class="hljs-string">'￥999.00'</span>,
          stocknums:<span class="hljs-number">3423</span>,
          salesnums:<span class="hljs-number">3423</span>,
          sharenums:<span class="hljs-number">3423</span>,
      },
    ]
  }

methods:{
    formatJson(filterVal, jsonData) {
    　　　　<span class="hljs-keyword">return</span> jsonData.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> filterVal.map(<span class="hljs-function"><span class="hljs-params">j</span> =&gt;</span> v[j]))
    　　},
    export2Excel() {
    　　　　<span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    　　　　　　<span class="hljs-keyword">const</span> { export_json_to_excel } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../../vendor/Export2Excel'</span>);
    　　　　　　<span class="hljs-keyword">const</span> tHeader = [<span class="hljs-string">'商品名称'</span>,<span class="hljs-string">'商品货号'</span>,<span class="hljs-string">'售价'</span>,<span class="hljs-string">'库存'</span>,<span class="hljs-string">'销量'</span>,<span class="hljs-string">'分享'</span>,];
    　　　　　　<span class="hljs-keyword">const</span> filterVal = [<span class="hljs-string">'name'</span>, <span class="hljs-string">'number'</span>, <span class="hljs-string">'salePrice'</span>, <span class="hljs-string">'stocknums'</span>, <span class="hljs-string">'salesnums'</span>, <span class="hljs-string">'sharenums'</span>, ];
    　　　　　　<span class="hljs-keyword">const</span> list = <span class="hljs-keyword">this</span>.goodsItems;
    　　　　　　<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">this</span>.formatJson(filterVal, list);
    　　　　　　export_json_to_excel(tHeader, data, <span class="hljs-string">'商品管理列表'</span>);
    　　　　})
    　 }
}</code></pre>
<p>template:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button @click=&quot;export2Excel&quot;>导出</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"export2Excel"</span>&gt;</span>导出<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>这里说明一下：</p>
<p>1、export2Excel()中require的路径因个人项目结构不同可能需要单独调整，如果报module not found '../../Export2Excel.js'之类请自行修改路径。</p>
<p>2、tHeader是每一栏的名称，需手动输入。</p>
<p><span class="img-wrap"><img data-src="/img/bVY0pi?w=802&amp;h=290" src="https://static.alili.tech/img/bVY0pi?w=802&amp;h=290" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>3、filterVal是data中list的key值，也是要自己写的。</p>
<p><span class="img-wrap"><img data-src="/img/bVY0o6?w=563&amp;h=416" src="https://static.alili.tech/img/bVY0o6?w=563&amp;h=416" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>4、这里记得要与data里面的list名称对应</p>
<p><span class="img-wrap"><img data-src="/img/bVY0pD?w=1041&amp;h=253" src="https://static.alili.tech/img/bVY0pD?w=1041&amp;h=253" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>5、这里可定义导出的excel文件名</p>
<p><span class="img-wrap"><img data-src="/img/bVY0pQ?w=1019&amp;h=249" src="https://static.alili.tech/img/bVY0pQ?w=1019&amp;h=249" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>参考文章：<a href="https://www.cnblogs.com/Mrfan217/p/6944238.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/Mrfan...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue导出json数据到Excel电子表格

## 原文链接
[https://segmentfault.com/a/1190000012117303](https://segmentfault.com/a/1190000012117303)

