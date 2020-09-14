---
title: 'mac 卸载 node' 
date: 2019-02-01 2:30:10
hidden: true
slug: ekkut3yf8b
categories: [reprint]
---

{{< raw >}}

                    
<p>系统升级到 Sierra 之后，npm 经常出问题，最终把 node 卸载了，安装了新版本。mac 卸载 node 比较麻烦，stackoverflow 上面找到一个方法还不错，特地记录下来，代码如下：</p>
<h4>首先运行脚本</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lsbom -f -l -s -pf /var/db/receipts/org.nodejs.pkg.bom | while read f; do  sudo rm /usr/local/${f}; done" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">lsbom <span class="hljs-_">-f</span> <span class="hljs-_">-l</span> <span class="hljs-_">-s</span> -pf /var/db/receipts/org.nodejs.pkg.bom | <span class="hljs-keyword">while</span> <span class="hljs-built_in">read</span> f; <span class="hljs-keyword">do</span>  sudo rm /usr/<span class="hljs-built_in">local</span>/<span class="hljs-variable">${f}</span>; <span class="hljs-keyword">done</span></code></pre>
<h4>接着</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;">sudo rm -rf /usr/local/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">node</span> /<span class="hljs-title">usr</span>/<span class="hljs-title">local</span>/<span class="hljs-title">lib</span>/<span class="hljs-title">node_modules</span> /<span class="hljs-title">var</span>/<span class="hljs-title">db</span>/<span class="hljs-title">receipts</span>/<span class="hljs-title">org</span>.<span class="hljs-title">nodejs</span>.*</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /usr/local/lib
sudo rm -rf node*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>cd /usr/local/<span class="hljs-class"><span class="hljs-keyword">lib</span></span>
sudo rm -rf node*</code></pre>
<h4>进入 <code>/usr/local/include</code> 删除含有 <code>node</code> 和 <code>node_modules</code> 的目录</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /usr/local/include
sudo rm -rf node*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">cd</span> /usr/<span class="hljs-keyword">local</span>/<span class="hljs-keyword">include</span>
sudo <span class="hljs-keyword">rm</span> -rf node*</code></pre>
<h4>如果是用 brew 安装的node，用下面的命令卸载</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brew uninstall node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">brew uninstall <span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<h4>进入个人主文件夹，检查各种 local、lib、include 文件夹，删除名字含有<code>node</code>和<code>node_modules</code>的文件</h4>
<h4>进入 <code>/usr/local/bin</code> 删除 node 执行文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /usr/local/bin
sudo rm -rf /usr/local/bin/npm
sudo rm -rf /usr/local/bin/node
ls -las 仔细查看，全局安装的npm包一般会在这个目录下创建软连接，发现就删除" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">cd</span> /usr/<span class="hljs-keyword">local</span>/bin
sudo <span class="hljs-keyword">rm</span> -rf /usr/<span class="hljs-keyword">local</span>/bin/npm
sudo <span class="hljs-keyword">rm</span> -rf /usr/<span class="hljs-keyword">local</span>/bin/node
<span class="hljs-keyword">ls</span> -las 仔细查看，全局安装的npm包一般会在这个目录下创建软连接，发现就删除</code></pre>
<h5>其他清理工作</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo rm -rf /usr/local/share/man/man1/node.1
sudo rm -rf /usr/local/lib/dtrace/node.d
sudo rm -rf ~/.npm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>sudo rm -rf /usr/local/share/man/man1/node.<span class="hljs-number">1</span>
sudo rm -rf /usr/local/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">dtrace</span>/<span class="hljs-title">node</span>.<span class="hljs-title">d</span></span>
sudo rm -rf ~<span class="hljs-regexp">/.npm</span></code></pre>
<p>比较繁琐的操作是 <code>/usr/local/lib</code> 和 <code>/usr/local/bin</code> 这两个文件夹，全局安装的npm包会有很多软连接，需要仔细删除，个人表示作为强迫症患者，得检查好几遍<br>忽然好想念 windows 呢</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mac 卸载 node

## 原文链接
[https://segmentfault.com/a/1190000007445643](https://segmentfault.com/a/1190000007445643)

