---
title: '前端面试题-url、href、src' 
date: 2018-12-10 2:30:07
hidden: true
slug: nvo4n9md0s
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、URL的概念</h2>
<blockquote>统一资源定位符（或称统一资源定位器/定位地址、URL地址等，英语：Uniform Resource Locator，常缩写为URL），有时也被俗称为<strong>网页地址（网址）。</strong>如同在网络上的门牌，是因特网上标准的资源的地址（Address）。</blockquote>
<h2 id="articleHeader1">二、URL的格式</h2>
<h3 id="articleHeader2">2.1 标准格式</h3>
<blockquote>协议类型:[//服务器地址[:端口号]][/资源层级UNIX文件路径]文件名?查询</blockquote>
<h3 id="articleHeader3">2.2 完整格式</h3>
<blockquote>协议类型:[//[访问资源需要的凭证信息@]服务器地址[:端口号]][/资源层级UNIX文件路径]文件名?查询</blockquote>
<p>其中【访问凭证信息@；:端口号；?查询；#片段ID】都属于选填项。</p>
<h2 id="articleHeader4">三、URL的语法规则</h2>
<p>比如网址 <a href="http://segmentfault.com/html/index.asp">http://segmentfault.com/html/...</a>，必须遵守以下的语法规则：</p>
<blockquote>scheme://host.domain:port/path/filename</blockquote>
<h3 id="articleHeader5">3.1 说明</h3>
<p>（1）<strong>scheme</strong> - 定义因特网服务的类型。最常见的类型是 http<br>（2）<strong>host</strong> - 定义域主机（http 的默认主机是 www）<br>（3）<strong>domain</strong> - 定义因特网域名，比如 w3school.com.cn<br>（4）<strong>:port</strong> - 定义主机上的端口号（http 的默认端口号是 80）<br>（5）<strong>path</strong> - 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）。<br>（6）<strong>filename</strong> - 定义文档/资源的名称</p>
<h3 id="articleHeader6">3.2 URL Schemes</h3>
<p>以下是其中一些最流行的 scheme：</p>
<table>
<thead><tr>
<th>Scheme</th>
<th>访问</th>
<th>用于...</th>
</tr></thead>
<tbody>
<tr>
<td>http</td>
<td>超文本传输协议</td>
<td>以 <a>http://</a> 开头的普通网页。不加密。</td>
</tr>
<tr>
<td>https</td>
<td>安全超文本传输协议</td>
<td>安全网页。加密所有信息交换。</td>
</tr>
<tr>
<td>ftp</td>
<td>文件传输协议</td>
<td>用于将文件下载或上传至网站。</td>
</tr>
<tr>
<td>file</td>
<td> </td>
<td>您计算机上的文件。</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader7">四、URL的类型</h2>
<h3 id="articleHeader8">4.1 绝对URL</h3>
<blockquote>绝对URL（absolute URL）显示文件的完整路径，这意味着绝对URL本身所在的位置与被引用的实际文件的位置<strong>无关</strong>。</blockquote>
<h3 id="articleHeader9">4.2 相对URL</h3>
<blockquote>相对URL（relative URL）以包含URL本身的文件夹的位置为<strong>参考点</strong>，描述目标文件夹的位置。</blockquote>
<p>一般来说，对于<strong>同一服务器</strong>上的文件，应该总是使用<strong>相对URL</strong>，它们更容易输入，而且在将页面从本地系统转移到服务器上时更方便，只要每个文件的相对位置保持不变，链接就仍然是有效地。</p>
<p>以下为建立路径所使用的几个特殊符号，及其所代表的意义。</p>
<p>（1）<code>.</code>：代表<strong>目前所在的目录</strong>，相对路径。 例如 <code>&lt;a href="./abc"&gt;文本&lt;/a&gt;</code> 或 &lt;img src="./abc" /&gt;<br>（2）<code>..</code>：代表<strong>上一层</strong>目录，相对路径。 例如 <code>&lt;a href="../abc"&gt;文本&lt;/a&gt;</code> 或 &lt;img src="../abc" /&gt;<br>（3）<code>../../</code>：代表的是<strong>上一层目录的上一层</strong>目录，相对路径。 例如 &lt;img src="../../abc" /&gt;<br>（4）<code>/</code>：代表<strong>根目录</strong>，绝对路径。 例如 <code>&lt;a href="/abc"&gt;文本&lt;/a&gt;</code> 或 &lt;img src="/abc" /&gt;</p>
<h2 id="articleHeader10">五、href的概念</h2>
<h3 id="articleHeader11">5.1 规范解释</h3>
<blockquote>href (Hypertext Reference)指定网络资源的位置，从而在当前元素或者当前文档和由当前属性定义的需要的锚点或资源之间定义一个链接或者关系。</blockquote>
<h3 id="articleHeader12">5.2 通俗理解</h3>
<p>href 目的不是为了引用资源，而是为了建立联系，让当前标签能够链接到目标地址。</p>
<h2 id="articleHeader13">六、src的概念</h2>
<p>source（缩写），指向外部资源的位置，指向的内容将会应用到文档中当前标签所在位置。</p>
<h2 id="articleHeader14">七、href和src的区别</h2>
<h3 id="articleHeader15">7.1 请求资源类型不同</h3>
<p>（1）href 指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的联系。</p>
<p>（2）在请求 src 资源时会将其指向的资源下载并应用到文档中，比如 JavaScript 脚本，img 图片；</p>
<h3 id="articleHeader16">7.2 作用结果不同</h3>
<p>（1）href 用于在当前文档和引用资源之间确立联系；</p>
<p>（2）src 用于替换当前内容；</p>
<h3 id="articleHeader17">7.3 浏览器解析方式不同</h3>
<p>（1）若在文档中添加 &lt;link href="style.css" rel="stylesheet"/&gt;，浏览器会识别该文档为 CSS 文件，就会<strong>并行下载资源并且不会停止对当前文档的处理。</strong>这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。</p>
<p>（2）当浏览器解析到 &lt;script src="script.js"&gt;&lt;/script&gt;，会<strong>暂停其他资源的下载和处理，</strong>直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。</p>
<h2 id="articleHeader18">八、link和@import的区别</h2>
<p>两者都是外部引用 CSS 的方式，但是存在一定的区别：</p>
<p>（1）link是XHTML标签，除了能够加载CSS，还可以定义RSS等其他事务；而@import属于CSS范畴，只可以加载CSS。</p>
<p>（2）link引用CSS时，在页面载入时同时加载；@import需要页面完全载入以后再加载。</p>
<p>（3）link是XHTML标签，无兼容问题；@import则是在CSS2.1提出的，低版本的浏览器不支持。</p>
<p>（4）link支持使用Javascript控制DOM改变样式；而@import不支持。</p>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题-url、href、src

## 原文链接
[https://segmentfault.com/a/1190000013845173](https://segmentfault.com/a/1190000013845173)

