---
title: 不像 MySQL 的 MySQL：MySQL 文档存储介绍
hidden: true
categories: [reprint]
slug: 76370fbf
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#不像-mysql-的-mysqlmysql-文档存储介绍"></a>不像 MySQL 的 MySQL：MySQL 文档存储介绍</h1>
<blockquote>
<p>MySQL 文档存储 可以跳过底层数据结构创建、数据规范化和其它使用传统数据库时需要做的工作，直接存储数据。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/218cbc1ff433e03cf2adcb7d637b5a330462d9b4/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f6f70656e5f627573696e6573735f7369676e5f73746f72652e6a70673f69746f6b3d6734516962527167"><img src="https://p0.ssl.qhimg.com/t01df21f36f921065b7.jpg" alt=""></a></p>
<p>MySQL 可以提供 NoSQL JSON 文档存储Document Store了，这样开发者保存数据前无需规范化normalize数据、创建数据库，也无需在开发之前就制定好数据样式。从 MySQL 5.7 版本和 MySQL 8.0 版本开始，开发者可以在表的一列中存储 JSON 文档。由于引入 X DevAPI，你可以从你的代码中移除令人不爽的结构化查询字符串，改为使用支持现代编程设计的 API 调用。</p>
<p>系统学习过结构化查询语言（SQL）、关系理论relational theory、集合set和其它关系数据库底层理论的开发者并不多，但他们需要一个安全可靠的数据存储。如果数据库管理人员不足，事情很快就会变得一团糟，</p>
<p><a href="https://www.mysql.com/products/enterprise/document_store.html">MySQL 文档存储</a> 允许开发者跳过底层数据结构创建、数据规范化和其它使用传统数据库时需要做的工作，直接存储数据。只需创建一个 JSON 文档集合document collection，接着就可以使用了。</p>
<h3><a href="#json-数据类型"></a>JSON 数据类型</h3>
<p>所有这一切都基于多年前 MySQL 5.7 引入的 JSON 数据类型。它允许在表的一行中提供大约 1GB 大小的列。数据必须是有效的 JSON，否则服务器会报错；但开发者可以自由使用这些空间。</p>
<h3><a href="#x-devapi"></a>X DevAPI</h3>
<p>旧的 MySQL 协议已经历经差不多四分之一个世纪，已经显现出疲态，因此新的协议被开发出来，协议名为 <a href="https://dev.mysql.com/doc/x-devapi-userguide/en/">X DevAPI</a>。协议引入高级会话概念，允许代码从单台服务器扩展到多台，使用符合通用主机编程语言样式common host-language programming patterns的非阻塞异步 I/O。需要关注的是如何遵循现代实践和编码风格，同时使用 CRUD （Create、 Replace、 Update、 Delete）样式。换句话说，你不再需要在你精美、纯洁的代码中嵌入丑陋的 SQL 语句字符串。</p>
<p>一个新的 shell 支持这种新协议，即所谓的 <a href="https://dev.mysql.com/downloads/shell/">MySQL Shell</a>。该 shell 可用于设置高可用集群high-availability cluster、检查服务器升级就绪状态upgrade readiness以及与 MySQL 服务器交互。支持的交互方式有以下三种：JavaScript，Python 和 SQL。</p>
<h3><a href="#代码示例"></a>代码示例</h3>
<p>下面的代码示例基于 JavaScript 方式使用 MySQL Shell，可以从 <code>JS&gt;</code> 提示符看出。</p>
<p>下面，我们将使用用户 <code>dstokes</code> 、密码 <code>password</code> 登录本地系统上的 <code>demo</code> 库。<code>db</code> 是一个指针，指向 <code>demo</code> 库。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysqlsh dstokes:password@localhost/demo</span>
<span class="hljs-meta">JS&gt;</span><span class="bash"> db.createCollection(<span class="hljs-string">"example"</span>)</span>
<span class="hljs-meta">JS&gt;</span><span class="bash"> db.example.add(</span>
      {
        Name: "Dave",
        State:  "Texas",
        foo : "bar"
      }
     )
<span class="hljs-meta">JS&gt;</span><span class="bash"></span>

</code></pre><p>在上面的示例中，我们登录服务器，连接到 <code>demo</code> 库，创建了一个名为 <code>example</code> 的集合，最后插入一条记录；整个过程无需创建表，也无需使用 SQL。只要你能想象的到，你可以使用甚至滥用这些数据。这不是一种代码对象与关系语句之间的映射器，因为并没有将代码映射为 SQL；新协议直接与服务器层打交道。</p>
<h3><a href="#nodejs-支持"></a>Node.js 支持</h3>
<p>新 shell 看起来挺不错，你可以用其完成很多工作；但你可能更希望使用你选用的编程语言。下面的例子使用 <code>world_x</code> 示例数据库，搜索 <code>_id</code> 字段匹配 <code>CAN.</code> 的记录。我们指定数据库中的特定集合，使用特定参数调用 <code>find</code> 命令。同样地，操作也不涉及 SQL。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> mysqlx = <span class="hljs-built_in">require</span>(<span class="hljs-string">'@mysql/xdevapi'</span>);
mysqlx.getSession({             <span class="hljs-comment">//Auth to server</span>
        host: <span class="hljs-string">'localhost'</span>,
        <span class="hljs-attr">port</span>: <span class="hljs-string">'33060'</span>,
        <span class="hljs-attr">dbUser</span>: <span class="hljs-string">'root'</span>,
        <span class="hljs-attr">dbPassword</span>: <span class="hljs-string">'password'</span>
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">session</span>) </span>{    <span class="hljs-comment">// use world_x.country.info</span>
     <span class="hljs-keyword">var</span> schema = session.getSchema(<span class="hljs-string">'world_x'</span>);
     <span class="hljs-keyword">var</span> collection = schema.getCollection(<span class="hljs-string">'countryinfo'</span>);

collection                      <span class="hljs-comment">// Get row for 'CAN'</span>
  .find(<span class="hljs-string">"$._id == 'CAN'"</span>)
  .limit(<span class="hljs-number">1</span>)
  .execute(<span class="hljs-function"><span class="hljs-params">doc</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(doc))
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"\n\nAll done"</span>));

  session.close();
})

</code></pre><p>下面例子使用 PHP，搜索 <code>_id</code> 字段匹配 <code>USA</code> 的记录：</p>
<pre><code class="hljs xml"><span class="php"><span class="hljs-meta">&lt;?PHP</span>
<span class="hljs-comment">// Connection parameters</span>
  $user = <span class="hljs-string">'root'</span>;
  $passwd = <span class="hljs-string">'S3cret#'</span>;
  $host = <span class="hljs-string">'localhost'</span>;
  $port = <span class="hljs-string">'33060'</span>;
  $connection_uri = <span class="hljs-string">'mysqlx://'</span>.$user.<span class="hljs-string">':'</span>.$passwd.<span class="hljs-string">'@'</span>.$host.<span class="hljs-string">':'</span>.$port;
  <span class="hljs-keyword">echo</span> $connection_uri . <span class="hljs-string">"\n"</span>;

<span class="hljs-comment">// Connect as a Node Session</span>
  $nodeSession = mysql_xdevapi\getNodeSession($connection_uri);
<span class="hljs-comment">// "USE world_x" schema</span>
  $schema = $nodeSession-&gt;getSchema(<span class="hljs-string">"world_x"</span>);
<span class="hljs-comment">// Specify collection to use</span>
  $collection = $schema-&gt;getCollection(<span class="hljs-string">"countryinfo"</span>);
<span class="hljs-comment">// SELECT * FROM world_x WHERE _id = "USA"</span>
  $result = $collection-&gt;find(<span class="hljs-string">'_id = "USA"'</span>)-&gt;execute();
<span class="hljs-comment">// Fetch/Display data</span>
  $data = $result-&gt;fetchAll();
  var_dump($data);
<span class="hljs-meta">?&gt;</span></span>

</code></pre><p>可以看出，在上面两个使用不同编程语言的例子中，<code>find</code> 操作符的用法基本一致。这种一致性对跨语言编程的开发者有很大帮助，对试图降低新语言学习成本的开发者也不无裨益。</p>
<p>支持的语言还包括 C、Java、Python 和 JavaScript 等，未来还会有更多支持的语言。</p>
<h3><a href="#从两种方式受益"></a>从两种方式受益</h3>
<p>我会告诉你使用 NoSQL 方式录入的数据也可以用 SQL 方式使用？换句话说，我会告诉你新引入的 NoSQL 方式可以访问旧式关系型表中的数据？现在使用 MySQL 服务器有多种方式，作为 SQL 服务器，作为 NoSQL 服务器或者同时作为两者。</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/6/mysql-document-store">https://opensource.com/article/18/6/mysql-document-store</a></p>
<p>作者：<a href="https://opensource.com/users/davidmstokes">Dave Stokes</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/pinewall">pinewall</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [不像 MySQL 的 MySQL：MySQL 文档存储介绍](https://www.zcfy.cc/article/mysql-without-the-mysql-an-introduction-to-the-mysql-document-store)
原文标题: 不像 MySQL 的 MySQL：MySQL 文档存储介绍
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
