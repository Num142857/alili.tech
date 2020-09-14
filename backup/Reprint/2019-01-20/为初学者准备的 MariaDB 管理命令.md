---
title: '为初学者准备的 MariaDB 管理命令' 
date: 2019-01-20 2:30:11
hidden: true
slug: teexdlk1fpi
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#为初学者准备的-mariadb-管理命令"></a>为初学者准备的 MariaDB 管理命令</h1>
<p>之前我们学过了<a href="http://linuxtechlab.com/installing-configuring-mariadb-rhelcentos/">在 Centos/RHEL 7 上安装 MariaDB 服务器并保证其安全</a>，使之成为了 RHEL/CentOS 7 的默认数据库。现在我们再来看看一些有用的 MariaDB 管理命令。这些都是使用 MariaDB 最基础的命令，而且它们对 MySQL 也同样适合，因为 Mariadb 就是 MySQL 的一个分支而已。</p>
<p><strong>(推荐阅读：<a href="http://linuxtechlab.com/mongodb-installation-configuration-rhelcentos/">在 RHEL/CentOS 上安装并配置 MongoDB</a>)</strong></p>
<h3><a href="#mariadb-管理命令"></a>MariaDB 管理命令</h3>
<h4><a href="#1查看-mariadb-安装的版本"></a>1、查看 MariaDB 安装的版本</h4>
<p>要查看所安装数据库的当前版本，在终端中输入下面命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -version</span>

</code></pre><p>该命令会告诉你数据库的当前版本。此外你也可以运行下面命令来查看版本的详细信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysqladmin -u root -p version</span>

</code></pre><h4><a href="#2登录-mariadb"></a>2、登录 MariaDB</h4>
<p>要登录 MariaDB 服务器，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -u root -p</span>

</code></pre><p>然后输入密码登录。</p>
<h4><a href="#3列出所有的数据库"></a>3、列出所有的数据库</h4>
<p>要列出 MariaDB 当前拥有的所有数据库，在你登录到 MariaDB 中后运行：</p>
<pre><code class="hljs mipsasm">&gt; <span class="hljs-keyword">show </span>databases<span class="hljs-comment">;</span>

</code></pre><p>（LCTT 译注：<code>$</code> 这里代表 shell 的提示符，<code>&gt;</code> 这里代表 MariaDB shell 的提示符。）</p>
<h4><a href="#4创建新数据库"></a>4、创建新数据库</h4>
<p>在 MariaDB 中创建新数据库，登录 MariaDB 后运行：</p>
<pre><code class="hljs n1ql">&gt; <span class="hljs-keyword">create</span> <span class="hljs-keyword">database</span> dan;

</code></pre><p>若想直接在终端创建数据库，则运行：</p>
<pre><code class="hljs routeros">$ mysqladmin -u<span class="hljs-built_in"> user </span>-p create dan

</code></pre><p>这里，<code>dan</code> 就是新数据库的名称。</p>
<h4><a href="#5删除数据库"></a>5、删除数据库</h4>
<p>要删除数据库，在已登录的 MariaDB 会话中运行：</p>
<pre><code class="hljs n1ql">&gt; <span class="hljs-keyword">drop</span> <span class="hljs-keyword">database</span> dan;

</code></pre><p>此外你也可以运行，</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysqladmin -u root -p drop dan</span>

</code></pre><p><strong>注意：</strong> 若在运行 <code>mysqladmin</code> 命令时提示 “access denied” 错误，这应该是由于我们没有给 root 授权。要对 root 授权，请参照第 7 点方法，只是要将用户改成 root。</p>
<h4><a href="#6创建新用户"></a>6、创建新用户</h4>
<p>为数据库创建新用户，运行：</p>
<pre><code class="hljs oxygene">&gt; <span class="hljs-keyword">CREATE</span> USER <span class="hljs-string">'dan'</span>@<span class="hljs-string">'localhost'</span> IDENTIFIED <span class="hljs-keyword">BY</span> <span class="hljs-string">'password'</span>;

</code></pre><h4><a href="#7授权用户访问某个数据库"></a>7、授权用户访问某个数据库</h4>
<p>授权用户访问某个数据库，运行：</p>
<pre><code class="hljs lasso">&gt; GRANT <span class="hljs-literal">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> test.* <span class="hljs-keyword">to</span> <span class="hljs-string">'dan'</span>@<span class="hljs-string">'localhost'</span>;

</code></pre><p>这会赋予用户 <code>dan</code> 对名为 <code>test</code> 的数据库完全操作的权限。我们也可以限定为用户只赋予 <code>SELECT</code>、<code>INSERT</code>、<code>DELETE</code> 权限。</p>
<p>要赋予访问所有数据库的权限，将 <code>test</code> 替换成 <code>*</code> 。像这样：</p>
<pre><code class="hljs lasso">&gt; GRANT <span class="hljs-literal">ALL</span> PRIVILEGES <span class="hljs-keyword">ON</span> *.* <span class="hljs-keyword">to</span> <span class="hljs-string">'dan'</span>@<span class="hljs-string">'localhost'</span>;

</code></pre><h4><a href="#8备份导出数据库"></a>8、备份/导出数据库</h4>
<p>要创建单个数据库的备份，在终端窗口中运行下列命令，</p>
<pre><code class="hljs stylus">$ mysqldump -u root -<span class="hljs-selector-tag">p</span> database_name&gt;db_backup<span class="hljs-selector-class">.sql</span>

</code></pre><p>若要一次性创建多个数据库的备份则运行：</p>
<pre><code class="hljs stylus">$ mysqldump -u root -<span class="hljs-selector-tag">p</span> --databases db1 db2 &gt; db12_backup<span class="hljs-selector-class">.sql</span>

</code></pre><p>要一次性导出多个数据库，则运行：</p>
<pre><code class="hljs stylus">$ mysqldump -u root -<span class="hljs-selector-tag">p</span> --all-databases &gt; all_dbs<span class="hljs-selector-class">.sql</span>

</code></pre><h4><a href="#9从备份中恢复数据库"></a>9、从备份中恢复数据库</h4>
<p>要从备份中恢复数据库，运行：</p>
<pre><code class="hljs stylus">$ mysql -u root -<span class="hljs-selector-tag">p</span> database_name &lt; db_backup<span class="hljs-selector-class">.sql</span>

</code></pre><p>但这条命令成功的前提是预先没有存在同名的数据库。如果想要恢复数据库数据到已经存在的数据库中，则需要用到 <code>mysqlimport</code> 命令：</p>
<pre><code class="hljs stylus">$ mysqlimport -u root -<span class="hljs-selector-tag">p</span> database_name &lt; db_backup<span class="hljs-selector-class">.sql</span>

</code></pre><h4><a href="#10更改-mariadb-用户的密码"></a>10、更改 mariadb 用户的密码</h4>
<p>本例中我们会修改 <code>root</code> 的密码，但修改其他用户的密码也是一样的过程。</p>
<p>登录 mariadb 并切换到 'mysql' 数据库：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mysql -u root -p</span>
<span class="hljs-meta">&gt;</span><span class="bash"> use mysql;</span>

</code></pre><p>然后运行下面命令：</p>
<pre><code class="hljs routeros">&gt; update<span class="hljs-built_in"> user </span><span class="hljs-builtin-name">set</span> <span class="hljs-attribute">password</span>=PASSWORD('your_new_password_here') where <span class="hljs-attribute">User</span>=<span class="hljs-string">'root'</span>;

</code></pre><p>下一步，重新加载权限：</p>
<pre><code class="hljs shell"><span class="hljs-meta">&gt;</span><span class="bash"> flush privileges;</span>

</code></pre><p>然后退出会话。</p>
<p>我们的教程至此就结束了，在本教程中我们学习了一些有用的 MariaDB 管理命令。欢迎您的留言。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/mariadb-administration-commands-beginners/">http://linuxtechlab.com/mariadb-administration-commands-beginners/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">Shusain</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为初学者准备的 MariaDB 管理命令

## 原文链接
[https://www.zcfy.cc/article/mariadb-administration-commands-for-beginners](https://www.zcfy.cc/article/mariadb-administration-commands-for-beginners)

