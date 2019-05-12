---
title: '如何在 Bash 中抽取子字符串' 
date: 2019-01-21 2:30:06
hidden: true
slug: ewp5y2dfn2
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-bash-中抽取子字符串"></a>如何在 Bash 中抽取子字符串</h1>
<p>所谓“子字符串”就是出现在其它字符串内的字符串。 比如 “3382” 就是 “this is a 3382 test” 的子字符串。 我们有多种方法可以从中把数字或指定部分字符串抽取出来。</p>
<p><a href="https://www.cyberciti.biz/media/new/faq/2017/12/How-to-Extract-substring-in-Bash-Shell-on-Linux-or-Unix.jpg"><img src="https://p0.ssl.qhimg.com/t010539a4862a1afff2.jpg" alt="How to Extract substring in Bash Shell on Linux or Unix"></a></p>
<p>本文会向你展示在 bash shell 中如何获取或者说查找出子字符串。</p>
<h3><a href="#在-bash-中抽取子字符串"></a>在 Bash 中抽取子字符串</h3>
<p>其语法为：</p>
<p>## 格式 ## 
${parameter:offset:length} </p>
<p>子字符串扩展是 bash 的一项功能。它会扩展成 <code>parameter</code> 值中以 <code>offset</code> 为开始，长为 <code>length</code> 个字符的字符串。 假设， <code>$u</code> 定义如下:</p>
<p>## 定义变量 u ##
u="this is a test"</p>
<p>那么下面参数的子字符串扩展会抽取出子字符串:</p>
<p>var="${u:10:4}"
echo "${var}"</p>
<p>结果为:</p>
<pre><code class="hljs subunit"><span class="hljs-keyword">test

</span></code></pre><p>其中这些参数分别表示：</p>
<ul>
<li>10 : 偏移位置</li>
<li>4 : 长度</li>
</ul>
<h3><a href="#使用-ifs"></a>使用 IFS</h3>
<p>根据 bash 的 man 页说明:</p>
<blockquote>
<p><a href="https://bash.cyberciti.biz/guide/$IFS">IFS （内部字段分隔符）</a>用于在扩展后进行单词分割，并用内建的 read 命令将行分割为词。默认值是。</p>
</blockquote>
<p>另一种 POSIX 就绪POSIX ready的方案如下：</p>
<p>u="this is a test"
set -- $u
echo "$1"
echo "$2"
echo "$3"
echo "$4"</p>
<p>输出为：</p>
<p>this
is
a
test</p>
<p>下面是一段 bash 代码，用来从 Cloudflare cache 中去除带主页的 url。</p>
<p>#！/bin/bash</p>
<p>####################################################</p>
<p>## Author - Vivek Gite {<a href="https://www.cyberciti.biz/}">https://www.cyberciti.biz/}</a></p>
<p>## Purpose - Purge CF cache</p>
<p>## License - Under GPL ver 3.x+</p>
<p>####################################################</p>
<p>## set me first ##
zone_id="YOUR_ZONE_ID_HERE"
api_key="YOUR_API_KEY_HERE"
email_id="YOUR_EMAIL_ID_HERE"</p>
<p>## hold data ##
home_url=""
amp_url=""
urls="$@"</p>
<p>## Show usage 
[ "$urls" == "" ] &amp;&amp; { echo "Usage: $0 url1 url2 url3"; exit 1; }</p>
<p>## Get home page url as we have various sub dirs on domain</p>
<p>## /tips/</p>
<p>## /faq/</p>
<p>get_home_url(){
    local u="$1"
    IFS='/'
    set -- $u
    echo "${1}${IFS}${IFS}${3}${IFS}${4}${IFS}"
}</p>
<p>echo
echo "Purging cache from Cloudflare。.。"
echo
for u in $urls
do
     home_url="$(get_home_url $u)"
     amp_url="${u}amp/"
     curl -X DELETE "<a href="https://api.cloudflare.com/client/v4/zones/${zone_id}/purge_cache&quot;">https://api.cloudflare.com/client/v4/zones/${zone_id}/purge_cache"</a> \
          -H "X-Auth-Email: ${email_id}" \
          -H "X-Auth-Key: ${api_key}" \
          -H "Content-Type: application/json" \
          --data "{\"files\":[\"${u}\"，\"${amp_url}\"，\"${home_url}\"]}"
     echo
done
echo</p>
<p>它的使用方法为：</p>
<p>~/bin/cf.clear.cache <a href="https://www.cyberciti.biz/faq/bash-for-loop/">https://www.cyberciti.biz/faq/bash-for-loop/</a> <a href="https://www.cyberciti.biz/tips/linux-security.html">https://www.cyberciti.biz/tips/linux-security.html</a></p>
<h3><a href="#借助-cut-命令"></a>借助 cut 命令</h3>
<p>可以使用 <code>cut</code> 命令来将文件中每一行或者变量中的一部分删掉。它的语法为：</p>
<p>u="this is a test"
echo "$u" | cut -d' ' -f 4
echo "$u" | cut --delimiter=' ' --fields=4</p>
<p>##########################################</p>
<p>## WHERE</p>
<p>##   -d' ' : Use a whitespace as delimiter</p>
<p>##   -f 4  : Select only 4th field</p>
<p>##########################################
var="$(cut -d' ' -f 4 &lt;&lt;&lt; $u)"
echo "${var}"</p>
<p>想了解更多请阅读 bash 的 man 页：</p>
<p>man bash
man cut</p>
<p>另请参见： <a href="https://www.cyberciti.biz/faq/bash-find-out-if-variable-contains-substring/">Bash String Comparison: Find Out IF a Variable Contains a Substring</a></p>
<hr>
<p>via: <a href="https://www.cyberciti.biz/faq/how-to-extract-substring-in-bash/">https://www.cyberciti.biz/faq/how-to-extract-substring-in-bash/</a></p>
<p>作者：<a href="https://www.cyberciti.biz">Vivek Gite</a> 译者：<a href="https://github.com/lujun9972">lujun9972</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 Bash 中抽取子字符串

## 原文链接
[https://www.zcfy.cc/article/how-to-extract-substring-in-bash](https://www.zcfy.cc/article/how-to-extract-substring-in-bash)

