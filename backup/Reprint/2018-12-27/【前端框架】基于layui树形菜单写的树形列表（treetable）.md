---
title: '【前端框架】基于layui树形菜单写的树形列表（treetable）' 
date: 2018-12-27 2:30:12
hidden: true
slug: 8b8g84bq38d
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>最新版本是基于layui v2.2.3, 附件中有layui v1.0.7</strong></h1>
<p>代码地址</p>
<ul>
<li>Gitee:  <a href="https://gitee.com/shaojiepeng/layui-treetable" rel="nofollow noreferrer" target="_blank">https://gitee.com/shaojiepeng...</a>
</li>
<li>Github: <a href="https://github.com/shaojiepeng/layui-treetable" rel="nofollow noreferrer" target="_blank">https://github.com/shaojiepen...</a>
</li>
</ul>
<p>demo地址</p>
<ul><li><a href="https://shaojiepeng.github.io/layui-treetable/demo.html" rel="nofollow noreferrer" target="_blank">https://shaojiepeng.github.io...</a></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVbhxZi?w=967&amp;h=591" src="https://static.alili.tech/img/bVbhxZi?w=967&amp;h=591" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">介绍</h2>
<p>首先介绍一下<a href="http://www.layui.com" rel="nofollow noreferrer" target="_blank">layui</a>，是一个模块化前端UI框架，遵循原生HTML/CSS/JS的书写与组织形式，门槛极低，拿来即用。<br>前段时间，自己闲来写一个后端管理系统，引进了layui，使用了树形菜单的内置模块，可是该功能并未完全满足需求。 由于layui是开源包，为满足需求，故基于layui-tree写了一个treetable.</p>
<h2 id="articleHeader2">使用</h2>
<p><strong><em>页面元素</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;demo&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"demo"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p><strong><em>js代码</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var layout = [
        {name: '菜单名称', treeNodes: true, headerClass: 'value_col', colClass: 'value_col', style: 'width: 60%'}
];
layui.use(['tree', 'layer', 'form'], function(){
          var layer = layui.layer, $ = layui.jquery;
          var form = layui.form();
      
          layui.treeGird({
            elem: '#demo',   //传入元素选择器
            nodes: [
                      {
                          &quot;id&quot;: &quot;1&quot;,
                          &quot;name&quot;: &quot;父节点1&quot;,
                          &quot;children&quot;: [
                              {
                                  &quot;id&quot;: &quot;11&quot;,
                                  &quot;name&quot;: &quot;子节点11&quot;
                              },
                              {
                                  &quot;id&quot;: &quot;12&quot;,
                                  &quot;name&quot;: &quot;子节点12&quot;
                              }
                          ]
                      },
                      {
                          &quot;id&quot;: &quot;2&quot;,
                          &quot;name&quot;: &quot;父节点2&quot;,
                          &quot;children&quot;: [
                              {
                                  &quot;id&quot;: &quot;21&quot;,
                                  &quot;name&quot;: &quot;子节点21&quot;,
                                  &quot;children&quot;: [
                                      {
                                          &quot;id&quot;: &quot;211&quot;,
                                          &quot;name&quot;: &quot;子节点211&quot;
                                      }
                                  ]
                              }
                          ]
                      }
            ],
            layout:layout
        });
    });
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>var layout = [
        {name: <span class="hljs-string">'菜单名称'</span>, treeNodes: true, headerClass: <span class="hljs-string">'value_col'</span>, colClass: <span class="hljs-string">'value_col'</span>, style: <span class="hljs-string">'width: 60%'</span>}
];
layui.use([<span class="hljs-string">'tree'</span>, <span class="hljs-string">'layer'</span>, <span class="hljs-string">'form'</span>], <span class="hljs-keyword">function</span>(){
          var layer = layui.layer, $ = layui.jquery;
          var form = layui.form();
      
          layui.treeGird({
            elem: <span class="hljs-string">'#demo'</span>,   //传入元素选择器
            nodes: [
                      {
                          <span class="hljs-string">"id"</span>: <span class="hljs-string">"1"</span>,
                          <span class="hljs-string">"name"</span>: <span class="hljs-string">"父节点1"</span>,
                          <span class="hljs-string">"children"</span>: [
                              {
                                  <span class="hljs-string">"id"</span>: <span class="hljs-string">"11"</span>,
                                  <span class="hljs-string">"name"</span>: <span class="hljs-string">"子节点11"</span>
                              },
                              {
                                  <span class="hljs-string">"id"</span>: <span class="hljs-string">"12"</span>,
                                  <span class="hljs-string">"name"</span>: <span class="hljs-string">"子节点12"</span>
                              }
                          ]
                      },
                      {
                          <span class="hljs-string">"id"</span>: <span class="hljs-string">"2"</span>,
                          <span class="hljs-string">"name"</span>: <span class="hljs-string">"父节点2"</span>,
                          <span class="hljs-string">"children"</span>: [
                              {
                                  <span class="hljs-string">"id"</span>: <span class="hljs-string">"21"</span>,
                                  <span class="hljs-string">"name"</span>: <span class="hljs-string">"子节点21"</span>,
                                  <span class="hljs-string">"children"</span>: [
                                      {
                                          <span class="hljs-string">"id"</span>: <span class="hljs-string">"211"</span>,
                                          <span class="hljs-string">"name"</span>: <span class="hljs-string">"子节点211"</span>
                                      }
                                  ]
                              }
                          ]
                      }
            ],
            layout:layout
        });
    });
    </code></pre>
<p><strong><em>页面展示</em></strong></p>
<p><span class="img-wrap"><img data-src="/img/bVXI8F?w=589&amp;h=276" src="https://static.alili.tech/img/bVXI8F?w=589&amp;h=276" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong><em>方法 语法：layui.treeGird(options)</em></strong></p>
<p>options是一个对象参数，可支持的key如下表</p>
<p><span class="img-wrap"><img data-src="/img/bVXI8Z?w=859&amp;h=146" src="https://static.alili.tech/img/bVXI8Z?w=859&amp;h=146" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>节点数据格式nodes nodes</em></strong></p>
<p><span class="img-wrap"><img data-src="/img/bVXI88?w=830&amp;h=306" src="https://static.alili.tech/img/bVXI88?w=830&amp;h=306" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>列表头元素layout layout</em></strong></p>
<p><span class="img-wrap"><img data-src="/img/bVXI9i?w=848&amp;h=236" src="https://static.alili.tech/img/bVXI9i?w=848&amp;h=236" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>自定义的render</em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var layout = [
    {name: '菜单名称', treeNodes: true, headerClass: 'value_col', colClass: 'value_col', style: 'width: 60%'},
    {name: '操作', headerClass: 'value_col', colClass: 'value_col', style: 'width: 20%', render: function(row) {
        return '<a class=&quot;layui-btn layui-btn-danger layui-btn-mini&quot; onclick=&quot;del('+row.id+')&quot;><i class=&quot;layui-icon&quot;>&amp;#xe640;</i> 删除</a>';   //列渲染
    "}}",
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var layout = [
    {<span class="hljs-string">name:</span> <span class="hljs-string">'菜单名称'</span>, <span class="hljs-string">treeNodes:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">headerClass:</span> <span class="hljs-string">'value_col'</span>, <span class="hljs-string">colClass:</span> <span class="hljs-string">'value_col'</span>, <span class="hljs-string">style:</span> <span class="hljs-string">'width: 60%'</span>},
    {<span class="hljs-string">name:</span> <span class="hljs-string">'操作'</span>, <span class="hljs-string">headerClass:</span> <span class="hljs-string">'value_col'</span>, <span class="hljs-string">colClass:</span> <span class="hljs-string">'value_col'</span>, <span class="hljs-string">style:</span> <span class="hljs-string">'width: 20%'</span>, <span class="hljs-string">render:</span> function(row) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;a class="layui-btn layui-btn-danger layui-btn-mini" onclick="del('</span>+row.id+<span class="hljs-string">')"&gt;&lt;i class="layui-icon"&gt;&amp;#xe640;&lt;/i&gt; 删除&lt;/a&gt;'</span>;   <span class="hljs-comment">//列渲染</span>
    "}}",
];</code></pre>
<p><strong><em>效果如下：</em></strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVXJcP?w=1067&amp;h=221" src="https://static.alili.tech/img/bVXJcP?w=1067&amp;h=221" alt="151846_9790e8b3_980808.png" title="151846_9790e8b3_980808.png" style="cursor: pointer; display: inline;"></span></p>
<p>总结 灵感来源layui，感谢layui的开源。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端框架】基于layui树形菜单写的树形列表（treetable）

## 原文链接
[https://segmentfault.com/a/1190000011812724](https://segmentfault.com/a/1190000011812724)

