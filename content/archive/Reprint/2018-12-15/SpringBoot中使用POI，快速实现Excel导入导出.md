---
title: 'SpringBoot中使用POI，快速实现Excel导入导出' 
date: 2018-12-15 2:30:11
hidden: true
slug: ky4yutdvzzc
categories: [reprint]
---

{{< raw >}}

                    
<p>本文是vhr系列的第十一篇.</p>
<h2 id="articleHeader0">vhr项目地址<a href="https://github.com/lenve/vhr" rel="nofollow noreferrer" target="_blank">https://github.com/lenve/vhr</a>
</h2>
<h1 id="articleHeader1">导出Excel</h1>
<p>整体来说，Excel有<code>.xls</code>和<code>.xlsx</code>，那么在POI中这两个也对应两个不同的类，但是类名不同，方法基本都是一致的，因此我这里将只介绍<code>.xls</code>一种。  </p>
<p>整体来说，可以分为如下七个步骤：</p>
<h4>1.创建Excel文档</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HSSFWorkbook workbook = new HSSFWorkbook();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">HSSFWorkbook workbook</span> = new HSSFWorkbook();</code></pre>
<h4>2.设置文档的基本信息，这一步是可选的</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//获取文档信息，并配置
DocumentSummaryInformation dsi = workbook.getDocumentSummaryInformation();
//文档类别
dsi.setCategory(&quot;员工信息&quot;);
//设置文档管理员
dsi.setManager(&quot;江南一点雨&quot;);
//设置组织机构
dsi.setCompany(&quot;XXX集团&quot;);
//获取摘要信息并配置
SummaryInformation si = workbook.getSummaryInformation();
//设置文档主题
si.setSubject(&quot;员工信息表&quot;);
//设置文档标题
si.setTitle(&quot;员工信息&quot;);
//设置文档作者
si.setAuthor(&quot;XXX集团&quot;);
//设置文档备注
si.setComments(&quot;备注信息暂无&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs protobuf"><code><span class="hljs-comment">//获取文档信息，并配置</span>
DocumentSummaryInformation dsi = workbook.getDocumentSummaryInformation();
<span class="hljs-comment">//文档类别</span>
dsi.setCategory(<span class="hljs-string">"员工信息"</span>);
<span class="hljs-comment">//设置文档管理员</span>
dsi.setManager(<span class="hljs-string">"江南一点雨"</span>);
<span class="hljs-comment">//设置组织机构</span>
dsi.setCompany(<span class="hljs-string">"XXX集团"</span>);
<span class="hljs-comment">//获取摘要信息并配置</span>
SummaryInformation si = workbook.getSummaryInformation();
<span class="hljs-comment">//设置文档主题</span>
si.setSubject(<span class="hljs-string">"员工信息表"</span>);
<span class="hljs-comment">//设置文档标题</span>
si.setTitle(<span class="hljs-string">"员工信息"</span>);
<span class="hljs-comment">//设置文档作者</span>
si.setAuthor(<span class="hljs-string">"XXX集团"</span>);
<span class="hljs-comment">//设置文档备注</span>
si.setComments(<span class="hljs-string">"备注信息暂无"</span>);</code></pre>
<p>这些信息将显示在详细信息窗格中：  </p>
<p><span class="img-wrap"><img data-src="/img/bV2RAE?w=262&amp;h=374" src="https://static.alili.tech/img/bV2RAE?w=262&amp;h=374" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>3.创建一个Excel表单,参数为sheet的名字</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HSSFSheet sheet = workbook.createSheet(&quot;XXX集团员工信息表&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">HSSFSheet sheet</span> = workbook.createSheet(<span class="hljs-string">"XXX集团员工信息表"</span>);</code></pre>
<h4>4.创建一行</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HSSFRow headerRow = sheet.createRow(0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">HSSFRow headerRow</span> = sheet.createRow(0);</code></pre>
<p>0表示第一行。</p>
<h4>5.在第一行中创建第一个单元格，并设置数据</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HSSFCell cell0 = headerRow.createCell(0);
cell0.setCellValue(&quot;编号&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>HSSFCell cell0 = headerRow.createCell(<span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
cell0.setCellValue(<span class="hljs-string">"编号"</span>)<span class="hljs-comment">;</span></code></pre>
<h4>6.将Excel写到ByteArrayOutputStream中</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="baos = new ByteArrayOutputStream();
workbook.write(baos);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code><span class="hljs-attribute">baos</span> = new ByteArrayOutputStream()<span class="hljs-comment">;</span>
workbook.write(baos)<span class="hljs-comment">;</span></code></pre>
<h4>7.创建ResponseEntity并返回</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return new ResponseEntity<byte[]>(baos.toByteArray(), headers, HttpStatus.CREATED);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">return</span> <span class="hljs-keyword">new</span> ResponseEntity&lt;<span class="hljs-keyword">byte</span>[]&gt;(baos.toByteArray(), headers, HttpStatus.CREATED);</code></pre>
<p>核心步骤就这七个步骤，当然还有其他设置单元格数据格式、单元格背景、单元格宽度等，大家可以在源码中研究，这里就不赘述了。</p>
<h1 id="articleHeader2">导入Excel数据</h1>
<p>数据导入主要涉及三个步骤 <strong>1.文件上传；2.Excel解析；3.数据插入。</strong> 第三步就比较简单了，我们这里重点来看看前两个步骤。</p>
<h2 id="articleHeader3">文件上传</h2>
<p>文件上传采用了ElementUI中的Upload控件，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload
:show-file-list=&quot;false&quot;
accept=&quot;application/vnd.ms-excel&quot;
action=&quot;/emp/basic/importEmp&quot;
:on-success=&quot;fileUploadSuccess&quot;
:on-error=&quot;fileUploadError&quot; :disabled=&quot;fileUploadBtnText=='正在导入'&quot;
:before-upload=&quot;beforeFileUpload&quot; style=&quot;display: inline&quot;>
<el-button size=&quot;mini&quot; type=&quot;success&quot; :loading=&quot;fileUploadBtnText=='正在导入'&quot;><i class=&quot;fa fa-lg fa-level-up&quot; style=&quot;margin-right: 5px&quot;></i>"{{"fileUploadBtnText"}}"
</el-button>
</el-upload>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;el-upload
:show-<span class="hljs-built_in">file</span>-<span class="hljs-built_in">list</span>=<span class="hljs-string">"false"</span>
accept=<span class="hljs-string">"application/vnd.ms-excel"</span>
action=<span class="hljs-string">"/emp/basic/importEmp"</span>
:<span class="hljs-keyword">on</span>-success=<span class="hljs-string">"fileUploadSuccess"</span>
:<span class="hljs-keyword">on</span>-<span class="hljs-keyword">error</span>=<span class="hljs-string">"fileUploadError"</span> :disabled=<span class="hljs-string">"fileUploadBtnText=='正在导入'"</span>
:<span class="hljs-keyword">before</span>-upload=<span class="hljs-string">"beforeFileUpload"</span> style=<span class="hljs-string">"display: inline"</span>&gt;
&lt;el-button size=<span class="hljs-string">"mini"</span> type=<span class="hljs-string">"success"</span> :loading=<span class="hljs-string">"fileUploadBtnText=='正在导入'"</span>&gt;&lt;i <span class="hljs-built_in">class</span>=<span class="hljs-string">"fa fa-lg fa-level-up"</span> style=<span class="hljs-string">"margin-right: 5px"</span>&gt;&lt;/i&gt;"{{"fileUploadBtnText"}}"
&lt;/el-button&gt;
&lt;/el-upload&gt;</code></pre>
<p>正在上传时，文件上传控件不可用，上传成功或者失败之后才可用，上传过程中，上传按钮会有loading显示。  </p>
<p>然后在SpringMVC中接收上传文件即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@RequestMapping(value = &quot;/importEmp&quot;, method = RequestMethod.POST)
public RespBean importEmp(MultipartFile file) {
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-meta">@RequestMapping</span>(value = <span class="hljs-string">"/importEmp"</span>, method = RequestMethod.POST)
<span class="hljs-keyword">public</span> <span class="hljs-function">RespBean <span class="hljs-title">importEmp</span><span class="hljs-params">(MultipartFile file)</span> </span>{
    <span class="hljs-comment">//...</span>
}</code></pre>
<h2 id="articleHeader4">Excel解析</h2>
<p>将上传到的MultipartFile转为输入流，然后交给POI去解析即可。可以分为如下四个步骤：</p>
<h4>1.创建HSSFWorkbook对象</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HSSFWorkbook workbook = new HSSFWorkbook(new POIFSFileSystem(file.getInputStream()));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">HSSFWorkbook workbook = new HSSFWorkbook(<span class="hljs-name">new</span> POIFSFileSystem(<span class="hljs-name">file</span>.getInputStream()))<span class="hljs-comment">;</span></code></pre>
<h4>2.获取一共有多少sheet，然后遍历</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int numberOfSheets = workbook.getNumberOfSheets();
for (int i = 0; i < numberOfSheets; i++) {
    HSSFSheet sheet = workbook.getSheetAt(i);
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">int</span> numberOfSheets = workbook.getNumberOfSheets();
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; numberOfSheets; i++) {
    HSSFSheet sheet = workbook.getSheetAt(i);
    <span class="hljs-comment">//...</span>
}</code></pre>
<h4>3.获取sheet中一共有多少行，遍历行（注意第一行是标题）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int physicalNumberOfRows = sheet.getPhysicalNumberOfRows();
Employee employee;
for (int j = 0; j < physicalNumberOfRows; j++) {
    if (j == 0) {
        continue;//标题行
    }
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">int</span> physicalNumberOfRows = sheet.getPhysicalNumberOfRows();
Employee employee;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> j = <span class="hljs-number">0</span>; j &lt; physicalNumberOfRows; j++) {
    <span class="hljs-keyword">if</span> (j == <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">continue</span>;<span class="hljs-comment">//标题行</span>
    }
    <span class="hljs-comment">//...</span>
}</code></pre>
<h4>4.获取每一行有多少单元格，遍历单元格</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int physicalNumberOfCells = row.getPhysicalNumberOfCells();
employee = new Employee();
for (int k = 0; k < physicalNumberOfCells; k++) {
    HSSFCell cell = row.getCell(k);
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">int</span> physicalNumberOfCells = row<span class="hljs-variable">.getPhysicalNumberOfCells</span>();
employee = <span class="hljs-keyword">new</span> Employee();
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> k = <span class="hljs-number">0</span>; k &lt; physicalNumberOfCells; k++) {
    HSSFCell <span class="hljs-keyword">cell</span> = row<span class="hljs-variable">.getCell</span>(k);
    <span class="hljs-comment">//...</span>
}</code></pre>
<p>单元格的遍历就比较简单了，将遍历到的数据放入Employee实例中，每遍历一行，就将一个employee实例放入集合中。  </p>
<p>好了，大致的步骤就是这样，详细信息小伙伴可以star微人事的源码仔细研究。  </p>
<p>本系列其他文章：  </p>
<p>1.<a href="http://mp.weixin.qq.com/s/lpznrVx6Bh9X7ZnunrWQSA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(一)</a>  <br>2.<a href="https://mp.weixin.qq.com/s/9Do-kQOvJGLsw9m36_LrFA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(二)</a>  <br>3.<a href="https://mp.weixin.qq.com/s/9c0j2GzCNmtdOL8EfCV_bA" rel="nofollow noreferrer" target="_blank">SpringSecurity中密码加盐与SpringBoot中异常统一处理</a>  <br>4.<a href="https://mp.weixin.qq.com/s/KabBPItayxBEv56_g9y6KQ" rel="nofollow noreferrer" target="_blank">axios请求封装和异常统一处理</a>  <br>5.<a href="http://mp.weixin.qq.com/s/zF1BI0AOmOHOwr7T8yhKYg" rel="nofollow noreferrer" target="_blank">权限管理模块中动态加载Vue组件</a>    <br>6.<a href="http://mp.weixin.qq.com/s/QXkJs4HqUMGCQnKiyPRA5A" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(六)</a>    <br>7.<a href="http://mp.weixin.qq.com/s/mpV4cIQ575kCv2hDTtEYZw" rel="nofollow noreferrer" target="_blank">vhr部门管理数据库设计与编程</a>    <br>8.<a href="https://mp.weixin.qq.com/s/rZXNTi3wi0dAsQ6k47Lw_g" rel="nofollow noreferrer" target="_blank">使用MyBatis轻松实现递归查询与存储过程调用</a>    <br>9.<a href="https://mp.weixin.qq.com/s/CMBuzjLVvLH0xChlWdwvSQ" rel="nofollow noreferrer" target="_blank">ElementUI中tree控件踩坑记</a>    <br>10.<a href="http://mp.weixin.qq.com/s/c1r6yQU5uHu7kFHeDdy5kg" rel="nofollow noreferrer" target="_blank">SpringBoot中自定义参数绑定</a>    </p>
<p>关注公众号，可以及时接收到最新文章:  </p>
<p><span class="img-wrap"><img data-src="/img/bVUERD?w=258&amp;h=258" src="https://static.alili.tech/img/bVUERD?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SpringBoot中使用POI，快速实现Excel导入导出

## 原文链接
[https://segmentfault.com/a/1190000013036679](https://segmentfault.com/a/1190000013036679)

