---
title: '如何修复 WordPress 中的 HTTP 错误' 
date: 2019-01-21 2:30:06
hidden: true
slug: 9pkl97ixz4
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何修复-wordpress-中的-http-错误"></a>如何修复 WordPress 中的 HTTP 错误</h1>
<p>我们会向你介绍，如何在 Linux VPS 上修复 WordPress 中的 HTTP 错误。 下面列出了 WordPress 用户遇到的最常见的 HTTP 错误，我们的建议侧重于如何发现错误原因以及解决方法。</p>
<h3><a href="#1-修复在上传图像时出现的-http-错误"></a>1、 修复在上传图像时出现的 HTTP 错误</h3>
<p>如果你在基于 WordPress 的网页中上传图像时出现错误，这也许是因为服务器上 PHP 的配置，例如存储空间不足或者其他配置问题造成的。</p>
<p>用如下命令查找 php 配置文件：</p>
<pre><code class="hljs coq">php -i | <span class="hljs-type">grep</span> php.ini
Configuration <span class="hljs-keyword">File</span> (php.ini) <span class="hljs-keyword">Path</span> =&gt; /etc
Loaded Configuration <span class="hljs-keyword">File</span> =&gt; /etc/php.ini

</code></pre><p>根据输出结果，php 配置文件位于 <code>/etc</code> 文件夹下。编辑 <code>/etc/php.ini</code> 文件，找出下列行，并按照下面的例子修改其中相对应的值：</p>
<pre><code class="hljs stylus">vi /etc/php<span class="hljs-selector-class">.ini</span>

</code></pre><pre><code class="hljs makefile">upload_max_filesize = 64M
post_max_size = 32M
max_execution_time = 300
max_input_time 300
memory_limit = 128M

</code></pre><p>当然，如果你不习惯使用 vi 文本编辑器，你可以选用自己喜欢的。</p>
<p>不要忘记重启你的网页服务器来让改动生效。</p>
<p>如果你安装的网页服务器是 Apache，你也可以使用 <code>.htaccess</code> 文件。首先，找到 <code>.htaccess</code> 文件。它位于 WordPress 安装路径的根文件夹下。如果没有找到 <code>.htaccess</code> 文件，需要自己手动创建一个，然后加入如下内容：</p>
<pre><code class="hljs awk">vi <span class="hljs-regexp">/www/</span>html<span class="hljs-regexp">/path_to_wordpress/</span>.htaccess

</code></pre><pre><code class="hljs apache"><span class="hljs-attribute">php_value</span> upload_max_filesize 64M
<span class="hljs-attribute">php_value</span> post_max_size 32M
<span class="hljs-attribute">php_value</span> max_execution_time 180
<span class="hljs-attribute">php_value</span> max_input_time 180

<span class="hljs-comment"># BEGIN WordPress</span>
<span class="hljs-section">&lt;IfModule mod_rewrite.c&gt;</span>
  <span class="hljs-attribute"><span class="hljs-nomarkup">RewriteEngine</span></span> <span class="hljs-literal">On</span>
  <span class="hljs-attribute">RewriteBase</span> /
  <span class="hljs-attribute"><span class="hljs-nomarkup">RewriteRule</span></span> ^index\.php$ -<span class="hljs-meta"> [L]</span>
  <span class="hljs-attribute"><span class="hljs-nomarkup">RewriteCond</span></span> <span class="hljs-variable">%{REQUEST_FILENAME}</span> !-f
  <span class="hljs-attribute"><span class="hljs-nomarkup">RewriteCond</span></span> <span class="hljs-variable">%{REQUEST_FILENAME}</span> !-d
  <span class="hljs-attribute"><span class="hljs-nomarkup">RewriteRule</span></span> . /index.php<span class="hljs-meta"> [L]</span>
<span class="hljs-section">&lt;/IfModule&gt;</span>
<span class="hljs-comment"># END WordPress</span>

</code></pre><p>如果你使用的网页服务器是 nginx，在 nginx 的 <code>server</code> 配置块中配置你的 WordPress 实例。详细配置和下面的例子相似：</p>
<pre><code class="hljs nginx"><span class="hljs-section">server</span> {

  <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
  <span class="hljs-attribute">client_max_body_size</span> <span class="hljs-number">128m</span>;
  <span class="hljs-attribute">client_body_timeout</span> <span class="hljs-number">300</span>;

  <span class="hljs-attribute">server_name</span> your-domain.com www.your-domain.com;

  <span class="hljs-attribute">root</span> /var/www/html/wordpress;
  <span class="hljs-attribute">index</span> index.php;

  <span class="hljs-attribute">location</span> = /favicon.ico {
  <span class="hljs-attribute">log_not_found</span> <span class="hljs-literal">off</span>;
  <span class="hljs-attribute">access_log</span> <span class="hljs-literal">off</span>;
  }

  <span class="hljs-attribute">location</span> = /robots.txt {
    <span class="hljs-attribute">allow</span> all;
    <span class="hljs-attribute">log_not_found</span> <span class="hljs-literal">off</span>;
    <span class="hljs-attribute">access_log</span> <span class="hljs-literal">off</span>;
  }

  <span class="hljs-attribute">location</span> / {
    <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.php?<span class="hljs-variable">$args</span>;
  }

  <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ \.php$</span> {
    <span class="hljs-attribute">include</span> fastcgi_params;
    <span class="hljs-attribute">fastcgi_pass</span> <span class="hljs-number">127.0.0.1:9000</span>;
    <span class="hljs-attribute">fastcgi_index</span> index.php;
    <span class="hljs-attribute">fastcgi_param</span> SCRIPT_FILENAME <span class="hljs-variable">$document_root</span><span class="hljs-variable">$fastcgi_script_name</span>;
  }

  <span class="hljs-attribute">location</span> <span class="hljs-regexp">~* \.(js|css|png|jpg|jpeg|gif|ico)$</span> {
    <span class="hljs-attribute">expires</span> max;
    <span class="hljs-attribute">log_not_found</span> <span class="hljs-literal">off</span>;
  }
}

</code></pre><p>根据自己的 PHP 配置，你需要将 <code>fastcgi_pass 127.0.0.1:9000;</code> 用类似于 <code>fastcgi_pass unix:/var/run/php7-fpm.sock;</code> 替换掉（依照实际连接方式）</p>
<p>重启 nginx 服务来使改动生效。</p>
<h3><a href="#2-修复因为不恰当的文件权限而产生的-http-错误"></a>2、 修复因为不恰当的文件权限而产生的 HTTP 错误</h3>
<p>如果你在 WordPress 中出现一个意外错误，也许是因为不恰当的文件权限导致的，所以需要给 WordPress 文件和文件夹设置一个正确的权限：</p>
<pre><code class="hljs groovy">chown www-<span class="hljs-string">data:</span>www-data -R <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/html/</span>path_to_wordpress/

</code></pre><p>将 <code>www-data</code> 替换成实际的网页服务器用户，将 <code>/var/www/html/path_to_wordpress</code> 换成 WordPress 的实际安装路径。</p>
<h3><a href="#3-修复因为内存不足而产生的-http-错误"></a>3、 修复因为内存不足而产生的 HTTP 错误</h3>
<p>你可以通过在 <code>wp-config.php</code> 中添加如下内容来设置 PHP 的最大内存限制：</p>
<pre><code class="hljs lasso"><span class="hljs-class"><span class="hljs-keyword">define</span></span>(<span class="hljs-string">'WP_MEMORY_LIMIT'</span>, <span class="hljs-string">'128MB'</span>);

</code></pre><h3><a href="#4-修复因为-phpini-文件错误配置而产生的-http-错误"></a>4、 修复因为 php.ini 文件错误配置而产生的 HTTP 错误</h3>
<p>编辑 PHP 配置主文件，然后找到 <code>cgi.fix_pathinfo</code> 这一行。 这一行内容默认情况下是被注释掉的，默认值为 <code>1</code>。取消这一行的注释（删掉这一行最前面的分号），然后将 <code>1</code> 改为 <code>0</code> 。同时需要修改 <code>date.timezone</code> 这一 PHP 设置，再次编辑 PHP 配置文件并将这一选项改成 <code>date.timezone = Asia/Shanghai</code> （或者将等号后内容改为你所在的时区）。</p>
<pre><code class="hljs stylus">vi /etc/php<span class="hljs-selector-class">.ini</span>

</code></pre><pre><code class="hljs nix">cgi.<span class="hljs-attr">fix_pathinfo=0</span>
date.<span class="hljs-attr">timezone</span> = Asia/Shanghai

</code></pre><h3><a href="#5-修复因为-apache-mod_security-模块而产生的-http-错误"></a>5、 修复因为 Apache mod_security 模块而产生的 HTTP 错误</h3>
<p>如果你在使用 Apache mod_security 模块，这可能也会引起问题。试着禁用这一模块，确认是否因为在 <code>.htaccess</code> 文件中加入如下内容而引起了问题：</p>
<pre><code class="hljs apache"><span class="hljs-section">&lt;IfModule mod_security.c&gt;</span>
  <span class="hljs-attribute">SecFilterEngine</span> <span class="hljs-literal">Off</span>
  <span class="hljs-attribute">SecFilterScanPOST</span> <span class="hljs-literal">Off</span>
<span class="hljs-section">&lt;/IfModule&gt;</span>

</code></pre><h3><a href="#6-修复因为有问题的插件主题而产生的-http-错误"></a>6、 修复因为有问题的插件/主题而产生的 HTTP 错误</h3>
<p>一些插件或主题也会导致 HTTP 错误以及其他问题。你可以首先禁用有问题的插件/主题，或暂时禁用所有 WordPress 插件。如果你有 phpMyAdmin，使用它来禁用所有插件：在其中找到 <code>wp_options</code> 数据表，在 <code>option_name</code> 这一列中找到 <code>active_plugins</code> 这一记录，然后将 <code>option_value</code> 改为 ：<code>a:0:{}</code>。</p>
<p>或者用以下命令通过SSH重命名插件所在文件夹：</p>
<pre><code class="hljs awk">mv <span class="hljs-regexp">/www/</span>html<span class="hljs-regexp">/path_to_wordpress/</span>wp-content<span class="hljs-regexp">/plugins /</span>www<span class="hljs-regexp">/html/</span>path_to_wordpress<span class="hljs-regexp">/wp-content/</span>plugins.old

</code></pre><p>通常情况下，HTTP 错误会被记录在网页服务器的日志文件中，所以寻找错误时一个很好的切入点就是查看服务器日志。</p>
<hr>
<p>via: <a href="https://www.rosehosting.com/blog/http-error-wordpress/">https://www.rosehosting.com/blog/http-error-wordpress/</a></p>
<p>作者：<a href="https://www.rosehosting.com">rosehosting</a> 译者：<a href="https://github.com/wenwensnow">wenwensnow</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何修复 WordPress 中的 HTTP 错误

## 原文链接
[https://www.zcfy.cc/article/http-errors-in-wordpress](https://www.zcfy.cc/article/http-errors-in-wordpress)

