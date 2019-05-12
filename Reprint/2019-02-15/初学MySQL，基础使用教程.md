---
title: '初学MySQL，基础使用教程' 
date: 2019-02-15 2:30:43
hidden: true
slug: yd9qn3ird59
categories: [reprint]
---

{{< raw >}}

                    
<p>前端狗初学MySQL，记录一下<br>1、用户登录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mysql -uroot -p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">mysql -uroot -p</span></code></pre>
<p>2、查看数据库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="show databases;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">show</span> <span class="hljs-keyword">databases</span>;</code></pre>
<p>3、创建数据库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="create database firstsql;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">create</span> <span class="hljs-keyword">database</span> firstsql;</code></pre>
<p>4、进入数据库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="use firstsql" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">use</span> firstsql</code></pre>
<p>5、查看数据库中的所有表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="show tables;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">show</span> <span class="hljs-keyword">tables</span>;</code></pre>
<p>6、创建表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="create table student(
  ID char(7) primary key,
  NAME varchar(20) not null,
  Age varchar(20) default '10'
)comment='信息';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-keyword">create</span> <span class="hljs-keyword">table</span> student(
  <span class="hljs-keyword">ID</span> <span class="hljs-built_in">char</span>(<span class="hljs-number">7</span>) primary <span class="hljs-keyword">key</span>,
  <span class="hljs-keyword">NAME</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">20</span>) <span class="hljs-keyword">not</span> <span class="hljs-literal">null</span>,
  Age <span class="hljs-built_in">varchar</span>(<span class="hljs-number">20</span>) <span class="hljs-keyword">default</span> <span class="hljs-string">'10'</span>
)<span class="hljs-keyword">comment</span>=<span class="hljs-string">'信息'</span>;</code></pre>
<p>设置ID作为主键，NAME的值不能为空，Age 的默认值是10，备注为信息。<br>7、查看表结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="desc firstsql.student;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">desc firstsql.student<span class="hljs-comment">;</span></code></pre>
<p>8、查看表格创建信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="show create table student;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">show</span> <span class="hljs-keyword">create</span> <span class="hljs-keyword">table</span> student;</code></pre>
<p>9、查看表数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="select * from student;
select ID,NAME,Age from Student;
select * from Student where ID='001';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-keyword">select</span> * <span class="hljs-keyword">from</span> student;
<span class="hljs-keyword">select</span> <span class="hljs-keyword">ID</span>,<span class="hljs-keyword">NAME</span>,Age <span class="hljs-keyword">from</span> Student;
<span class="hljs-keyword">select</span> * <span class="hljs-keyword">from</span> Student <span class="hljs-keyword">where</span> <span class="hljs-keyword">ID</span>=<span class="hljs-string">'001'</span>;</code></pre>
<p>10、插入数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="insert into student values ('001','二哈','计算机');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">insert</span> <span class="hljs-keyword">into</span> student <span class="hljs-keyword">values</span> (<span class="hljs-string">'001'</span>,<span class="hljs-string">'二哈'</span>,<span class="hljs-string">'计算机'</span>);</code></pre>
<p>11、删除数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="delete from student;
delete from student where ID='001';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-keyword">delete</span> <span class="hljs-keyword">from</span> student;
<span class="hljs-keyword">delete</span> <span class="hljs-keyword">from</span> student <span class="hljs-keyword">where</span> <span class="hljs-keyword">ID</span>=<span class="hljs-string">'001'</span>;</code></pre>
<p>12、修改数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update student set NAME='物联网' where ID='001';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">update</span> student <span class="hljs-keyword">set</span> <span class="hljs-keyword">NAME</span>=<span class="hljs-string">'物联网'</span> <span class="hljs-keyword">where</span> <span class="hljs-keyword">ID</span>=<span class="hljs-string">'001'</span>;</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
初学MySQL，基础使用教程

## 原文链接
[https://segmentfault.com/a/1190000016789526](https://segmentfault.com/a/1190000016789526)

