---
title: '前端应该掌握的linux命令和工具' 
date: 2019-01-06 2:30:10
hidden: true
slug: levtc18siil
categories: [reprint]
---

{{< raw >}}

                    
<p>大部分前端应用都部署在linux上，若想全局hold住一个项目，linux命令是一项必不可少的技能。许多前端对linux命令并不重视，其实这是一个学习性价比非常高的知识点，没有太多需要理解的地方，大部分靠“记忆＋使用”即可掌握，掌握后可解决许多问题，也能提高日常效率，还能成为面试的加分项。<br>linux命令非常多，有时参数也挺复杂，全部学习挺枯燥，本文主要从实际的场景和问题出发，总结几条常用的命令，希望能对大家学习linux有所帮助。</p>
<h4>查看文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 首先要学会查看文件属性
ls -l

# 目录递归的查询
ls -Rl" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 首先要学会查看文件属性</span>
ls -l

<span class="hljs-meta"># 目录递归的查询</span>
ls -Rl</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVRJQ5?w=1088&amp;h=306" src="https://static.alili.tech/img/bVRJQ5?w=1088&amp;h=306" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>显示结果如上图。第一列十个字符，第一个表示文件类型（-为文件，d为目录，l为软链），后九位分三组，分别代表用户、用户组、其他用户对文件的的读(r)写(w)执行(x)权限；第二列表示文件数；第三列表示所属用户；第四列表示所属用户组；第五列表示文件大小；第六七八列分别表示文件最后修改的月、日、时间；最后一列为文件名。</p>
<p>查看文件内容有许多命令，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 查看一个文件的内容
cat a.txt

# cat支持多个文件连接显示，并可输出到文件
cat a.txt b.txt > c.txt

# tac就是cat反过来写，作用和cat相反，是从末尾开始向前显示
tac a.txt

# tail只显示文件的最后若干行,-n 指定显示的行数
tail test.log -n 100

# 实时显示内容，看日志时非常有用
tail test.log -f" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code><span class="hljs-comment"># 查看一个文件的内容</span>
cat <span class="hljs-keyword">a</span>.txt

<span class="hljs-comment"># cat支持多个文件连接显示，并可输出到文件</span>
cat <span class="hljs-keyword">a</span>.txt b.txt &gt; c.txt

<span class="hljs-comment"># tac就是cat反过来写，作用和cat相反，是从末尾开始向前显示</span>
tac <span class="hljs-keyword">a</span>.txt

<span class="hljs-comment"># tail只显示文件的最后若干行,-n 指定显示的行数</span>
tail test.<span class="hljs-built_in">log</span> -n <span class="hljs-number">100</span>

<span class="hljs-comment"># 实时显示内容，看日志时非常有用</span>
tail test.<span class="hljs-built_in">log</span> -f</code></pre>
<h4>修改文件所有者</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 同时修改用户和用户组
chown zhangsan:app

# 只修改用户
chown zhangsan

# 只修改用户组
chown :app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code><span class="hljs-comment"># 同时修改用户和用户组</span>
<span class="hljs-keyword">chown</span> zhangsan:app

<span class="hljs-comment"># 只修改用户</span>
<span class="hljs-keyword">chown</span> zhangsan

<span class="hljs-comment"># 只修改用户组</span>
<span class="hljs-keyword">chown</span> :app</code></pre>
<h4>修改文件权限</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 权限主体有三种，用户(u)、用户组(g)、其他(o)，权限有读(r)、写(w)、执行(x)三种
# +表示赋予权限，-表示回收权限
chmod ug+rw test.js # 给用户、用户组赋予读写权限

# 递归改变目录需加-R
chmod -R go-wx ./src # 回收用户组和其它的写和执行权限

# 数字表示法也比较常用。4:读，2:写，1:执行，其和可组合出所有权限。数字是三位数，对应三个主体，用户、用户组、其他。
chmod 751 test.js # 用户具备读写执行权限、用户组具备读和执行权限、其他用户具备执行权限" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code><span class="hljs-comment"># 权限主体有三种，用户(u)、用户组(g)、其他(o)，权限有读(r)、写(w)、执行(x)三种</span>
<span class="hljs-comment"># +表示赋予权限，-表示回收权限</span>
<span class="hljs-keyword">chmod</span> ug+rw test.js <span class="hljs-comment"># 给用户、用户组赋予读写权限</span>

<span class="hljs-comment"># 递归改变目录需加-R</span>
<span class="hljs-keyword">chmod</span> -R go-wx ./src <span class="hljs-comment"># 回收用户组和其它的写和执行权限</span>

<span class="hljs-comment"># 数字表示法也比较常用。4:读，2:写，1:执行，其和可组合出所有权限。数字是三位数，对应三个主体，用户、用户组、其他。</span>
<span class="hljs-keyword">chmod</span> <span class="hljs-number">751</span> test.js <span class="hljs-comment"># 用户具备读写执行权限、用户组具备读和执行权限、其他用户具备执行权限</span></code></pre>
<h4>修改文件</h4>
<p>linux下修改文件主要用vi或vim,vim是vi发展过来的，最基本的命令是一样的。vim编辑器命令非常强大，掌握最最基本的就可以解决问题了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 在编辑器里打开文件
vim test.txt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-comment"># 在编辑器里打开文件</span>
<span class="hljs-attribute">vim</span> test.txt</code></pre>
<p>学习vim最重要的是掌握三种模式<br>普通模式：刚进入编辑器时为普通模式，普通模式下所有的输入都当作命令，立即执行且不在终端显示。一般esc可回到普通模式。<br>编辑模式：普通模式下按i进入编辑模式。编辑模式下可对内容进行修改。<br>命令模式：普通模式下输入“shift” + “:” 进入命令模式。命令模式下接受命令输入且显示在终端，回车生效。常见的命令有，q退出，q!强制退出，w保存，wq保存并退出。</p>
<h4>搜索文件内容</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 第一个参数是一个正则表达式，第二个参数是一个文件
grep &quot;html&quot; src/index.html

# 在目录中搜索时需要加-R参数
grep -R &quot;var&quot; ./src

# 其他命令可以管道连接到grep命令进行结果筛选
ls -R ./src | grep &quot;.test&quot; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code><span class="hljs-comment"># 第一个参数是一个正则表达式，第二个参数是一个文件</span>
<span class="hljs-keyword">grep</span> <span class="hljs-string">"html"</span> src/index.html

<span class="hljs-comment"># 在目录中搜索时需要加-R参数</span>
<span class="hljs-keyword">grep</span> -R <span class="hljs-string">"var"</span> ./src

<span class="hljs-comment"># 其他命令可以管道连接到grep命令进行结果筛选</span>
ls -R ./src | <span class="hljs-keyword">grep</span> <span class="hljs-string">".test"</span> </code></pre>
<h4>搜索文件名</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 列出src目录下的所有文件
find ./src

# 列出src目录下文件名为index.js的文件
find ./src -name index.js

# 通过正则过滤
find ./src | grep 'scss'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 列出src目录下的所有文件</span>
find ./src

<span class="hljs-meta"># 列出src目录下文件名为index.js的文件</span>
find ./src -name index.js

<span class="hljs-meta"># 通过正则过滤</span>
find ./src | grep <span class="hljs-string">'scss'</span></code></pre>
<h4>复制或移动文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 基本的文件复制
cp a.txt ./test/a.txt

# 复制目录时需加-R参数
cp -R ./src ../test/src

# 大多时候不需要文件copy，软链也是一种选择，能用软链就用软链，开销小
ln -s ./bin/run.js ~/.bin/run.js

# 移动一个文件
mv abc.txt ~/test/abc.txt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-comment"># 基本的文件复制</span>
cp a.txt ./<span class="hljs-built_in">test</span>/a.txt

<span class="hljs-comment"># 复制目录时需加-R参数</span>
cp -R ./src ../<span class="hljs-built_in">test</span>/src

<span class="hljs-comment"># 大多时候不需要文件copy，软链也是一种选择，能用软链就用软链，开销小</span>
ln <span class="hljs-_">-s</span> ./bin/run.js ~/.bin/run.js

<span class="hljs-comment"># 移动一个文件</span>
mv abc.txt ~/<span class="hljs-built_in">test</span>/abc.txt</code></pre>
<h4>跨机器同步文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 将本地文件同步到远程机器，相对于cp命令，就多了一个ip而已
scp ./conf/nginx.conf 10.9.188.2:/opt/nginx/conf

# 反之从远程向本地同步亦可
10.9.188.2:/opt/nginx/conf/nginx.conf ./conf

# 需要ssh登录时，请加上用户名
scp ./conf/nginx.conf user@10.9.188.2:/opt/nginx/conf

# scp只能同步普通文件，rsync能同步文件夹，而且是增量同步
# -a表示保持文件的属性不变,-v显示进度信息,-z传输中进行压缩
rsync -avz logs/ 10.9.166.19:/data/users/liwei/logs

# rsync同样支持方向同步
rsync -avz 10.9.166.19:/data/users/liwei/logs ./logs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 将本地文件同步到远程机器，相对于cp命令，就多了一个ip而已</span>
scp ./conf/nginx.conf <span class="hljs-number">10.9</span>.<span class="hljs-number">188.2</span><span class="hljs-symbol">:/opt/nginx/conf</span>

<span class="hljs-comment"># 反之从远程向本地同步亦可</span>
<span class="hljs-number">10.9</span>.<span class="hljs-number">188.2</span><span class="hljs-symbol">:/opt/nginx/conf/nginx</span>.conf ./conf

<span class="hljs-comment"># 需要ssh登录时，请加上用户名</span>
scp ./conf/nginx.conf user<span class="hljs-variable">@10</span>.<span class="hljs-number">9.188</span>.<span class="hljs-number">2</span><span class="hljs-symbol">:/opt/nginx/conf</span>

<span class="hljs-comment"># scp只能同步普通文件，rsync能同步文件夹，而且是增量同步</span>
<span class="hljs-comment"># -a表示保持文件的属性不变,-v显示进度信息,-z传输中进行压缩</span>
rsync -avz logs/ <span class="hljs-number">10.9</span>.<span class="hljs-number">166.19</span><span class="hljs-symbol">:/data/users/liwei/logs</span>

<span class="hljs-comment"># rsync同样支持方向同步</span>
rsync -avz <span class="hljs-number">10.9</span>.<span class="hljs-number">166.19</span><span class="hljs-symbol">:/data/users/liwei/logs</span> ./logs</code></pre>
<h4>查看进程id</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 查出所有在内存中的进程，结果显示可看到到pid，用户，启动命令等信息，grep用作筛选
ps aux | grep node

# 杀进程
kill pid
# 强杀进程
kill -9 pid" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-comment"># 查出所有在内存中的进程，结果显示可看到到pid，用户，启动命令等信息，grep用作筛选</span>
ps aux | grep <span class="hljs-keyword">node</span>

<span class="hljs-title"># 杀进程
kill</span> pid
<span class="hljs-comment"># 强杀进程</span>
kill -<span class="hljs-number">9</span> pid</code></pre>
<h4>查看端口占用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# -a显示所有选项，-p显示建立相关链接的程序名
# 显示出程序名之后就可使用前面的方法找到pid
netstat -ap | grep 9000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code><span class="hljs-comment"># -a显示所有选项，-p显示建立相关链接的程序名</span>
<span class="hljs-comment"># 显示出程序名之后就可使用前面的方法找到pid</span>
netstat -ap |<span class="hljs-string"> grep 9000</span></code></pre>
<h4>发个http请求</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# -X 可设置请求方法，GET POST PUT DELTE ...，-i能打印返回头
curl 'http://cn.bing.com' -X GET -i

# -H 可设置请求头
curl 'http://cn.bing.com/' -H 'Customer-Header: helo'

# -d 可设置请求body
curl 'http://cn.bing.com/' -d 'a=1&amp;b=2'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># -X 可设置请求方法，GET POST PUT DELTE ...，-i能打印返回头</span>
curl <span class="hljs-string">'http://cn.bing.com'</span> -X GET -i

<span class="hljs-meta"># -H 可设置请求头</span>
curl <span class="hljs-string">'http://cn.bing.com/'</span> -H <span class="hljs-string">'Customer-Header: helo'</span>

<span class="hljs-meta"># -d 可设置请求body</span>
curl <span class="hljs-string">'http://cn.bing.com/'</span> -d <span class="hljs-string">'a=1&amp;b=2'</span></code></pre>
<h4>抓包</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# -c表明抓多少个包就停止，可以缺省
# -i指定网络设备
# host 指定ip地址
# port 指定端口
# src|dst 限定host、port是源地址还是目标地址
# 可以通过逻辑运算符链接 and or not
# -w 可以把抓包结果写到文件
sudo tcpdump -c100 -i eth0 dst host 10.9.96.32 -w test.cap" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># -c表明抓多少个包就停止，可以缺省</span>
<span class="hljs-meta"># -i指定网络设备</span>
<span class="hljs-meta"># host 指定ip地址</span>
<span class="hljs-meta"># port 指定端口</span>
<span class="hljs-meta"># src|dst 限定host、port是源地址还是目标地址</span>
<span class="hljs-meta"># 可以通过逻辑运算符链接 and or not</span>
<span class="hljs-meta"># -w 可以把抓包结果写到文件</span>
sudo tcpdump -c100 -i eth0 dst host <span class="hljs-number">10.9</span><span class="hljs-number">.96</span><span class="hljs-number">.32</span> -w test.cap</code></pre>
<p>对于http请求，tcpdump的可读性比较差。可以将抓包结果写到文件后，下载到本地用wireshark查看，一目了然。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端应该掌握的linux命令和工具

## 原文链接
[https://segmentfault.com/a/1190000010421178](https://segmentfault.com/a/1190000010421178)

