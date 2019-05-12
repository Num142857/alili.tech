---
title: 'node 版本管理工具 n 无效的原理及解决方案' 
date: 2019-01-31 2:31:16
hidden: true
slug: zcsf0hcqhs
categories: [reprint]
---

{{< raw >}}

                    
<p>n 是 node 的一个模块，可以用它来管理 node 的各种版本。类似 Python 中的 pyenv 和 Ruby 的 rbenv。n 的作者是著名的TJ大神。</p>
<p>通过 npm 安装 n：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g n" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> -g n</code></pre>
<p>查看当前 node 版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node -v
v4.2.4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
v4.<span class="hljs-number">2.4</span></code></pre>
<p>通过 n 安装指定版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ n 4.4.4
install : node-v4.4.4
       mkdir : /opt/node/n/versions/node/4.4.4
       fetch : https://nodejs.org/dist/v4.4.4/node-v4.4.4-linux-x64.tar.gz
###################################100.0%
   installed : v4.2.4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>$ n <span class="hljs-number">4.4</span><span class="hljs-number">.4</span>
install : node-v4<span class="hljs-number">.4</span><span class="hljs-number">.4</span>
       mkdir : /opt/node/n/versions/node/<span class="hljs-number">4.4</span><span class="hljs-number">.4</span>
       fetch : https:<span class="hljs-comment">//nodejs.org/dist/v4.4.4/node-v4.4.4-linux-x64.tar.gz</span>
###################################<span class="hljs-number">100.0</span>%
   installed : v4<span class="hljs-number">.2</span><span class="hljs-number">.4</span></code></pre>
<p>再查看当前 node 版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node -v
v4.2.4 #和原来一样" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
v4.<span class="hljs-number">2.4</span> <span class="hljs-comment">#和原来一样</span></code></pre>
<p>如果你跟我一样，发现 node 版本没有任何变化，那最有可能的情况就是，你的node的安装目录和 n 默认的路径不一样。<br>查看 node 当前安装路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ which node
/opt/node/bin/node  #举个例子" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ which <span class="hljs-keyword">node</span>
<span class="hljs-title">/opt</span>/<span class="hljs-keyword">node</span><span class="hljs-title">/bin</span>/<span class="hljs-keyword">node</span>  <span class="hljs-title">#举个例子</span></code></pre>
<p>而 n 默认安装路径是 /usr/local，若你的 node 不是在此路径下，n 切换版本就不能把bin、lib、include、share 复制该路径中，所以我们必须通过<code>N_PREFIX</code>变量来修改 n 的默认node安装路径。</p>
<p>编辑环境配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim ~/.bash_profile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vim</span> ~/.bash_profile</code></pre>
<p>将下面两行代码插入到文件末尾：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export N_PREFIX=/opt/node #node实际安装位置
export PATH=$N_PREFIX/bin:$PATH" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">export</span> N_PREFIX=/opt/node <span class="hljs-comment">#node实际安装位置</span>
<span class="hljs-built_in">export</span> PATH=<span class="hljs-variable">$N_PREFIX</span>/bin:<span class="hljs-variable">$PATH</span></code></pre>
<p><code>:wq</code>保存退出；</p>
<p>执行source使修改生效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ source ~/.bash_profile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">source</span> ~/.bash_profile</code></pre>
<p>确认一下环境变量是否生效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="echo $N_PREFIX
/opt/node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>echo $N_PREFIX
/opt/<span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<p>这时候我们需要重新安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ n 4.4.4
install : node-v4.4.4
       mkdir : /opt/node/n/versions/node/4.4.4
       fetch : https://nodejs.org/dist/v4.4.4/node-v4.4.4-linux-x64.tar.gz
##############100.0%
   installed : v4.4.4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ n <span class="hljs-number">4.4</span>.<span class="hljs-number">4</span>
install : <span class="hljs-keyword">node</span><span class="hljs-title">-v4</span>.<span class="hljs-number">4.4</span>
       mkdir : /opt/<span class="hljs-keyword">node</span><span class="hljs-title">/n</span>/versions/<span class="hljs-keyword">node</span><span class="hljs-title">/4</span>.<span class="hljs-number">4.4</span>
       fetch : https://nodejs.org/dist/v4.<span class="hljs-number">4.4</span>/<span class="hljs-keyword">node</span><span class="hljs-title">-v4</span>.<span class="hljs-number">4.4</span>-linux-x64.tar.gz
<span class="hljs-comment">##############100.0%</span>
   installed : v4.<span class="hljs-number">4.4</span></code></pre>
<p>再查看当前 node 版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node -v
v4.4.4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ <span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
v4.<span class="hljs-number">4.4</span></code></pre>
<p>说明修改成功。</p>
<p>如有帮助，请点下方 <strong>“推荐”</strong> 按钮。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node 版本管理工具 n 无效的原理及解决方案

## 原文链接
[https://segmentfault.com/a/1190000007567870](https://segmentfault.com/a/1190000007567870)

