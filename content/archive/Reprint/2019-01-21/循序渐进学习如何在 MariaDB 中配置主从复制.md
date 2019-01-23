---
title: '循序渐进学习如何在 MariaDB 中配置主从复制' 
date: 2019-01-21 2:30:06
hidden: true
slug: ykrz1e7kme
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#循序渐进学习如何在-mariadb-中配置主从复制"></a>循序渐进学习如何在 MariaDB 中配置主从复制</h1>
<p>在我们前面的教程中，我们已经学习了 <a href="https://linux.cn/article-8320-1.html">如何安装和配置 MariaDB</a>，也学习了 <a href="https://linux.cn/article-9306-1.html">管理 MariaDB 的一些基础命令</a>。现在我们来学习，如何在 MariaDB 服务器上配置一个主从复制。</p>
<p>复制是用于为我们的数据库创 建多个副本，这些副本可以在其它数据库上用于运行查询，像一些非常繁重的查询可能会影响主数据库服务器的性能，或者我们可以使用它来做数据冗余，或者兼具以上两个目的。我们可以将这个过程自动化，即主服务器到从服务器的复制过程自动进行。执行备份而不影响在主服务器上的写操作。</p>
<p>因此，我们现在去配置我们的主-从复制，它需要两台安装了 MariaDB 的机器。它们的 IP 地址如下：</p>
<ul>
<li><strong>主服务器 -</strong> 192.168.1.120 <strong>主机名 -</strong> master.ltechlab.com</li>
<li><strong>从服务器 -</strong> 192.168.1.130 <strong>主机名 -</strong> slave.ltechlab.com</li>
</ul>
<p>MariaDB 安装到这些机器上之后，我们继续进行本教程。如果你需要安装和配置 MariaDB 的教程，请查看<a href="https://linux.cn/article-8320-1.html"><strong>这个教程</strong></a>。</p>
<h3><a href="#第-1-步---主服务器配置"></a>第 1 步 - 主服务器配置</h3>
<p>我们现在进入到 MariaDB 中的一个命名为 <code>important</code> 的数据库，它将被复制到我们的从服务器。为开始这个过程，我们编辑名为 <code>/etc/my.cnf</code> 的文件，它是 MariaDB 的配置文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> vi /etc/my.cnf</span>

</code></pre><p>在这个文件中找到 <code>[mysqld]</code> 节，然后输入如下内容：</p>
<pre><code class="hljs routeros">[mysqld]
log-bin
<span class="hljs-attribute">server_id</span>=1
<span class="hljs-attribute">replicate-do-db</span>=important
<span class="hljs-attribute">bind-address</span>=192.168.1.120

</code></pre><p>保存并退出这个文件。完成之后，需要重启 MariaDB 服务。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> systemctl restart mariadb</span>

</code></pre><p>接下来，我们登入我们的主服务器上的 Mariadb 实例。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -u root -p</span>

</code></pre><p>在它上面创建一个命名为 <code>slaveuser</code> 的为主从复制使用的新用户，然后运行如下的命令为它分配所需要的权限：</p>
<pre><code class="hljs sql"><span class="hljs-keyword">STOP</span> <span class="hljs-keyword">SLAVE</span>;
<span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">REPLICATION</span> <span class="hljs-keyword">SLAVE</span> <span class="hljs-keyword">ON</span> *.* <span class="hljs-keyword">TO</span>  <span class="hljs-string">'slaveuser'</span>@<span class="hljs-string">'%'</span> <span class="hljs-keyword">IDENTIFIED</span> <span class="hljs-keyword">BY</span> <span class="hljs-string">'iamslave'</span>;
<span class="hljs-keyword">FLUSH</span> <span class="hljs-keyword">PRIVILEGES</span>;
<span class="hljs-keyword">FLUSH</span> <span class="hljs-keyword">TABLES</span> <span class="hljs-keyword">WITH</span> <span class="hljs-keyword">READ</span> <span class="hljs-keyword">LOCK</span>;
<span class="hljs-keyword">SHOW</span> <span class="hljs-keyword">MASTER</span> <span class="hljs-keyword">STATUS</span>;

</code></pre><p><strong>注意：</strong> 我们配置主从复制需要 <code>MASTER_LOG_FILE</code> 和 <code>MASTER_LOG_POS</code> 的值，它可以通过 <code>show master status</code> 来获得，因此，你一定要确保你记下了它们的值。</p>
<p>这些命令运行完成之后，输入 <code>exit</code> 退出这个会话。</p>
<h3><a href="#第-2-步---创建一个数据库备份并将它移动到从服务器上"></a>第 2 步 - 创建一个数据库备份，并将它移动到从服务器上</h3>
<p>现在，我们需要去为我们的数据库 <code>important</code> 创建一个备份，可以使用 <code>mysqldump</code> 命令去备份。</p>
<pre><code class="hljs stylus">$ mysqldump -u root -<span class="hljs-selector-tag">p</span> important &gt; important_backup<span class="hljs-selector-class">.sql</span>

</code></pre><p>备份完成后，我们需要重新登录到 MariaDB 数据库，并解锁我们的表。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -u root -p</span>
<span class="hljs-meta">$</span><span class="bash"> UNLOCK TABLES;</span>

</code></pre><p>然后退出这个会话。现在，我们移动我们刚才的备份到从服务器上，它的 IP 地址是：192.168.1.130。</p>
<p>在主服务器上的配置已经完成了，现在，我们开始配置从服务器。</p>
<h3><a href="#第-3-步配置从服务器"></a>第 3 步：配置从服务器</h3>
<p>我们再次去编辑（从服务器上的） <code>/etc/my.cnf</code> 文件，找到配置文件中的 <code>[mysqld]</code> 节，然后输入如下内容：</p>
<pre><code class="hljs ini"><span class="hljs-section">[mysqld]</span>
<span class="hljs-attr">server-id</span> = <span class="hljs-number">2</span>
<span class="hljs-attr">replicate-do-db</span>=important
<span class="hljs-section">[ …]</span>

</code></pre><p>现在，我们恢复我们主数据库的备份到从服务器的 MariaDB 上，运行如下命令：</p>
<pre><code class="hljs stylus">$ mysql -u root -<span class="hljs-selector-tag">p</span> &lt; /data/ important_backup<span class="hljs-selector-class">.sql</span>

</code></pre><p>当这个恢复过程结束之后，我们将通过登入到从服务器上的 MariaDB，为数据库 <code>important</code> 上的用户 'slaveuser' 授权。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -u root -p</span>

</code></pre><pre><code class="hljs sql"><span class="hljs-keyword">GRANT</span> ALL <span class="hljs-keyword">PRIVILEGES</span> <span class="hljs-keyword">ON</span> important.* <span class="hljs-keyword">TO</span> <span class="hljs-string">'slaveuser'</span>@<span class="hljs-string">'localhost'</span> <span class="hljs-keyword">WITH</span> <span class="hljs-keyword">GRANT</span> <span class="hljs-keyword">OPTION</span>;
<span class="hljs-keyword">FLUSH</span> <span class="hljs-keyword">PRIVILEGES</span>;

</code></pre><p>接下来，为了这个变化生效，重启 MariaDB。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> systemctl restart mariadb</span>

</code></pre><h3><a href="#第-4-步启动复制"></a>第 4 步：启动复制</h3>
<p>记住，我们需要 <code>MASTER_LOG_FILE</code> 和 <code>MASTER_LOG_POS</code> 变量的值，它可以通过在主服务器上运行 <code>SHOW MASTER STATUS</code> 获得。现在登入到从服务器上的 MariaDB，然后通过运行下列命令，告诉我们的从服务器它应该去哪里找主服务器。</p>
<pre><code class="hljs sql"><span class="hljs-keyword">STOP</span> <span class="hljs-keyword">SLAVE</span>;
<span class="hljs-keyword">CHANGE</span> <span class="hljs-keyword">MASTER</span> <span class="hljs-keyword">TO</span> MASTER_HOST= <span class="hljs-string">'192.168.1.110′, MASTER_USER='</span>slaveuser<span class="hljs-string">', MASTER_PASSWORD='</span>iamslave<span class="hljs-string">', MASTER_LOG_FILE='</span>mariadb-<span class="hljs-keyword">bin</span><span class="hljs-number">.000001</span>′, MASTER_LOG_POS=<span class="hljs-number">460</span>;
SLAVE <span class="hljs-keyword">START</span>;
<span class="hljs-keyword">SHOW</span> <span class="hljs-keyword">SLAVE</span> <span class="hljs-keyword">STATUS</span>\G;

</code></pre><p><strong>注意：</strong> 请根据你的机器的具体情况来改变主服务器的配置。</p>
<h3><a href="#第-5-步测试复制"></a>第 5 步：测试复制</h3>
<p>我们将在我们的主服务器上创建一个新表来测试主从复制是否正常工作。因此，登入到主服务器上的 MariaDB。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -u root -p</span>

</code></pre><p>选择数据库为 <code>important</code>：</p>
<pre><code class="hljs php"><span class="hljs-keyword">use</span> <span class="hljs-title">important</span>;

</code></pre><p>在这个数据库上创建一个名为 <code>test</code> 的表：</p>
<pre><code class="hljs sql"><span class="hljs-keyword">create</span> <span class="hljs-keyword">table</span> <span class="hljs-keyword">test</span> (c <span class="hljs-built_in">int</span>);

</code></pre><p>然后在这个表中插入一些数据：</p>
<pre><code class="hljs sql"><span class="hljs-keyword">insert</span> <span class="hljs-keyword">into</span> <span class="hljs-keyword">test</span> (c) <span class="hljs-keyword">value</span> (<span class="hljs-number">1</span>);

</code></pre><p>检索刚才插入的值是否存在：</p>
<pre><code class="hljs sql"><span class="hljs-keyword">select</span> * <span class="hljs-keyword">from</span> <span class="hljs-keyword">test</span>;

</code></pre><p>你将会看到刚才你插入的值已经在这个新建的表中了。</p>
<p>现在，我们登入到从服务器的数据库中，查看主从复制是否正常工作。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -u root -p</span>
<span class="hljs-meta">$</span><span class="bash"> use important;</span>
<span class="hljs-meta">$</span><span class="bash"> select * from <span class="hljs-built_in">test</span>;</span>

</code></pre><p>你可以看到与前面在主服务器上的命令输出是一样的。因此，说明我们的主从服务工作正常，没有发生任何问题。</p>
<p>我们的教程结束了，请在下面的评论框中留下你的查询/问题。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/creating-master-slave-replication-mariadb/">http://linuxtechlab.com/creating-master-slave-replication-mariadb/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
循序渐进学习如何在 MariaDB 中配置主从复制

## 原文链接
[https://www.zcfy.cc/article/step-by-step-guide-for-creating-master-slave-replication-in-mariadb](https://www.zcfy.cc/article/step-by-step-guide-for-creating-master-slave-replication-in-mariadb)

