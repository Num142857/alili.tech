---
title: '八种在 Linux 上生成随机密码的方法' 
date: 2019-01-20 2:30:11
hidden: true
slug: 5twbco3lftf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#八种在-linux-上生成随机密码的方法"></a>八种在 Linux 上生成随机密码的方法</h1>
<blockquote>
<p>学习使用 8 种 Linux 原生命令或第三方实用程序来生成随机密码。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/0204844ab9fc436e62c6026f37a70bd2b6cb7e4f/68747470733a2f2f61312e6b65726e656c74616c6b732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30312f646966666572656e742d776179732d746f2d67656e65726174652d70617373776f72642d696e2d6c696e75782e706e67"><img src="http://p0.qhimg.com/t0114231948f17a1967.png" alt=""></a></p>
<p>在这篇文章中，我们将引导你通过几种不同的方式在 Linux 终端中生成随机密码。其中几种利用原生 Linux 命令，另外几种则利用极易在 Linux 机器上安装的第三方工具或实用程序实现。在这里我们利用像 <code>openssl</code>, <a href="https://kerneltalks.com/commands/learn-dd-command-with-examples/">dd</a>, <code>md5sum</code>, <code>tr</code>, <code>urandom</code> 这样的原生命令和 mkpasswd，randpw，pwgen，spw，gpg，xkcdpass，diceware，revelation，keepaasx，passwordmaker 这样的第三方工具。</p>
<p>其实这些方法就是生成一些能被用作密码的随机字母字符串。随机密码可以用于新用户的密码，不管用户基数有多大，这些密码都是独一无二的。话不多说，让我们来看看 8 种不同的在 Linux 上生成随机密码的方法吧。</p>
<h3><a href="#使用-mkpasswd-实用程序生成密码"></a>使用 mkpasswd 实用程序生成密码</h3>
<p><code>mkpasswd</code> 在基于 RHEL 的系统上随 <code>expect</code> 软件包一起安装。在基于 Debian 的系统上 <code>mkpasswd</code> 则在软件包 <code>whois</code> 中。直接安装 <code>mkpasswd</code> 软件包将会导致错误：</p>
<ul>
<li>RHEL 系统：软件包 mkpasswd 不可用。</li>
<li>Debian 系统：错误：无法定位软件包 mkpasswd。</li>
</ul>
<p>所以按照上面所述安装他们的父软件包，就没问题了。</p>
<p>运行 <code>mkpasswd</code> 来获得密码</p>
<p>root@kerneltalks# mkpasswd &lt;&lt; on RHEL
zt*hGW65c
root@kerneltalks# mkpasswd teststring &lt;&lt; on Ubuntu
XnlrKxYOJ3vik</p>
<p>这个命令在不同的系统上表现得不一样，所以工作方式各异。你也可以通过参数来控制长度等选项，可以查阅 man 手册来探索。</p>
<h3><a href="#使用-openssl-生成密码"></a>使用 openssl 生成密码</h3>
<p>几乎所有 Linux 发行版都包含 openssl。我们可以利用它的随机功能来生成可以用作密码的随机字母字符串。</p>
<p>root@kerneltalks # openssl rand -base64 10
nU9LlHO5nsuUvw==</p>
<p>这里我们使用 <code>base64</code> 编码随机函数，最后一个数字参数表示长度。</p>
<h3><a href="#使用-urandom-生成密码"></a>使用 urandom 生成密码</h3>
<p>设备文件 <code>/dev/urandom</code> 是另一个获得随机字符串的方法。我们使用 <code>tr</code> 功能并裁剪输出来获得随机字符串，并把它作为密码。</p>
<p>root@kerneltalks # strings /dev/urandom |tr -dc A-Za-z0-9 | head -c20; echo
UiXtr0NAOSIkqtjK4c0X</p>
<h3><a href="#使用-dd-命令生成密码"></a>使用 dd 命令生成密码</h3>
<p>我们甚至可以使用 <code>/dev/urandom</code> 设备配合 <a href="https://kerneltalks.com/commands/learn-dd-command-with-examples/">dd 命令</a> 来获取随机字符串。</p>
<p>root@kerneltalks# dd if=/dev/urandom bs=1 count=15|base64 -w 0
15+0 records in
15+0 records out
15 bytes (15 B) copied, 5.5484e-05 s, 270 kB/s
QMsbe2XbrqAc2NmXp8D0</p>
<p>我们需要将结果通过 <code>base64</code> 编码使它能被人类可读。你可以使用数值来获取想要的长度。想要获得更简洁的输出的话，可以将“标准错误输出”重定向到 <code>/dev/null</code>。简洁输出的命令是：</p>
<p>root@kerneltalks # dd if=/dev/urandom bs=1 count=15 2&gt;/dev/null|base64 -w 0
F8c3a4joS+a3BdPN9C++</p>
<h3><a href="#使用-md5sum-生成密码"></a>使用 md5sum 生成密码</h3>
<p>另一种获取可用作密码的随机字符串的方法是计算 MD5 校验值！校验值看起来确实像是随机字符串组合在一起，我们可以用作密码。确保你的计算源是个变量，这样的话每次运行命令时生成的校验值都不一样。比如 <code>date</code> ！<a href="https://kerneltalks.com/commands/date-time-management-using-timedatectl-command/">date 命令</a> 总会生成不同的输出。</p>
<p>root@kerneltalks # date |md5sum
4d8ce5c42073c7e9ca4aeffd3d157102  -</p>
<p>在这里我们将 <code>date</code> 命令的输出通过 <code>md5sum</code> 得到了校验和！你也可以用 <a href="https://kerneltalks.com/linux/cut-command-examples/">cut 命令</a> 裁剪你需要的长度。</p>
<h3><a href="#使用-pwgen-生成密码"></a>使用 pwgen 生成密码</h3>
<p><code>pwgen</code> 软件包在类似 <a href="https://kerneltalks.com/package/how-to-install-epel-repository/">EPEL 软件仓库</a>（LCTT 译注：企业版 Linux 附加软件包）中。<code>pwgen</code> 更专注于生成可发音的密码，但它们不在英语词典中，也不是纯英文的。标准发行版仓库中可能并不包含这个工具。安装这个软件包然后运行 <code>pwgen</code> 命令行。Boom !</p>
<p>root@kerneltalks # pwgen
thu8Iox7 ahDeeQu8 Eexoh0ai oD8oozie ooPaeD9t meeNeiW2 Eip6ieph Ooh1tiet
cootad7O Gohci0vo wah9Thoh Ohh3Ziur Ao1thoma ojoo6aeW Oochai4v ialaiLo5
aic2OaDa iexieQu8 Aesoh4Ie Eixou9ph ShiKoh0i uThohth7 taaN3fuu Iege0aeZ
cah3zaiW Eephei0m AhTh8guo xah1Shoo uh8Iengo aifeev4E zoo4ohHa fieDei6c
aorieP7k ahna9AKe uveeX7Hi Ohji5pho AigheV7u Akee9fae aeWeiW4a tiex8Oht</p>
<p>你的终端会呈现出一个密码列表！你还想要什么呢？好吧。你还想再仔细探索的话， <code>pwgen</code> 还有很多自定义选项，这些都可以在 man 手册里查阅到。</p>
<h3><a href="#使用-gpg-工具生成密码"></a>使用 gpg 工具生成密码</h3>
<p>GPG 是一个遵循 OpenPGP 标准的加密及签名工具。大部分 gpg 工具都预先被安装好了（至少在我的 RHEL7 上是这样）。但如果没有的话你可以寻找 <code>gpg</code> 或 <code>gpg2</code> 软件包并<a href="https://kerneltalks.com/tools/package-installation-linux-yum-apt/">安装</a>它。</p>
<p>使用下面的命令以从 gpg 工具生成密码。</p>
<p>root@kerneltalks # gpg --gen-random --armor 1 12
mL8i+PKZ3IuN6a7a</p>
<p>这里我们传了生成随机字节序列选项（<code>--gen-random</code>），质量为 1（第一个参数），次数 12 （第二个参数）。选项 <code>--armor</code> 保证以 <code>base64</code> 编码输出。</p>
<h3><a href="#使用-xkcdpass-生成密码"></a>使用 xkcdpass 生成密码</h3>
<p>著名的极客幽默网站 <a href="https://xkcd.com/">xkcd</a>，发表了一篇非常有趣的文章，是关于好记但又复杂的密码的。你可以在<a href="https://xkcd.com/936/">这里</a>阅读。所以 <code>xkcdpass</code> 工具就受这篇文章启发，做了这样的工作！这是一个 Python 软件包，可以在<a href="https://pypi.python.org/pypi/xkcdpass/">这里</a>的 Python 的官网上找到它。</p>
<p><a href="https://camo.githubusercontent.com/80ed774dd004f7901a4819cbdea6150211d01725/68747470733a2f2f696d67732e786b63642e636f6d2f636f6d6963732f70617373776f72645f737472656e6774682e706e67"><img src="http://p0.qhimg.com/t01c0e2bf5f82cb07dd.png" alt=""></a></p>
<p>所有的安装使用说明都在上面那个页面提及了。这里是安装步骤和我的测试 RHEL 服务器的输出，以供参考。</p>
<p>root@kerneltalks # wget <a href="https://pypi.python.org/packages/b4/d7/3253bd2964390e034cf0bba227db96d94de361454530dc056d8c1c096abc/xkcdpass-1.14.3.tar.gz#md5=5f15d52f1d36207b07391f7a25c7965f">https://pypi.python.org/packages/b4/d7/3253bd2964390e034cf0bba227db96d94de361454530dc056d8c1c096abc/xkcdpass-1.14.3.tar.gz#md5=5f15d52f1d36207b07391f7a25c7965f</a>
--2018-01-23 19:09:17--  <a href="https://pypi.python.org/packages/b4/d7/3253bd2964390e034cf0bba227db96d94de361454530dc056d8c1c096abc/xkcdpass-1.14.3.tar.gz">https://pypi.python.org/packages/b4/d7/3253bd2964390e034cf0bba227db96d94de361454530dc056d8c1c096abc/xkcdpass-1.14.3.tar.gz</a>
Resolving pypi.python.org (pypi.python.org)... 151.101.32.223, 2a04:4e42:8::223
Connecting to pypi.python.org (pypi.python.org)|151.101.32.223|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 871848 (851K) [binary/octet-stream]
Saving to: ‘xkcdpass-1.14.3.tar.gz’</p>
<p>100%[==============================================================================================================================&gt;] 871,848     --.-K/s   in 0.01s</p>
<p>2018-01-23 19:09:17 (63.9 MB/s) - ‘xkcdpass-1.14.3.tar.gz’ saved [871848/871848]</p>
<p>root@kerneltalks # tar -xvf xkcdpass-1.14.3.tar.gz
xkcdpass-1.14.3/
xkcdpass-1.14.3/examples/
xkcdpass-1.14.3/examples/example_import.py
xkcdpass-1.14.3/examples/example_json.py
xkcdpass-1.14.3/examples/example_postprocess.py
xkcdpass-1.14.3/LICENSE.BSD
xkcdpass-1.14.3/MANIFEST.in
xkcdpass-1.14.3/PKG-INFO
xkcdpass-1.14.3/README.rst
xkcdpass-1.14.3/setup.cfg
xkcdpass-1.14.3/setup.py
xkcdpass-1.14.3/tests/
xkcdpass-1.14.3/tests/test_list.txt
xkcdpass-1.14.3/tests/test_xkcdpass.py
xkcdpass-1.14.3/tests/__init__.py
xkcdpass-1.14.3/xkcdpass/
xkcdpass-1.14.3/xkcdpass/static/
xkcdpass-1.14.3/xkcdpass/static/eff-long
xkcdpass-1.14.3/xkcdpass/static/eff-short
xkcdpass-1.14.3/xkcdpass/static/eff-special
xkcdpass-1.14.3/xkcdpass/static/fin-kotus
xkcdpass-1.14.3/xkcdpass/static/ita-wiki
xkcdpass-1.14.3/xkcdpass/static/legacy
xkcdpass-1.14.3/xkcdpass/static/spa-mich
xkcdpass-1.14.3/xkcdpass/xkcd_password.py
xkcdpass-1.14.3/xkcdpass/__init__.py
xkcdpass-1.14.3/xkcdpass.1
xkcdpass-1.14.3/xkcdpass.egg-info/
xkcdpass-1.14.3/xkcdpass.egg-info/dependency_links.txt
xkcdpass-1.14.3/xkcdpass.egg-info/entry_points.txt
xkcdpass-1.14.3/xkcdpass.egg-info/not-zip-safe
xkcdpass-1.14.3/xkcdpass.egg-info/PKG-INFO
xkcdpass-1.14.3/xkcdpass.egg-info/SOURCES.txt
xkcdpass-1.14.3/xkcdpass.egg-info/top_level.txt</p>
<p>root@kerneltalks # cd xkcdpass-1.14.3</p>
<p>root@kerneltalks # python setup.py install
running install
running bdist_egg
running egg_info
writing xkcdpass.egg-info/PKG-INFO
writing top-level names to xkcdpass.egg-info/top_level.txt
writing dependency_links to xkcdpass.egg-info/dependency_links.txt
writing entry points to xkcdpass.egg-info/entry_points.txt
reading manifest file 'xkcdpass.egg-info/SOURCES.txt'
reading manifest template 'MANIFEST.in'
writing manifest file 'xkcdpass.egg-info/SOURCES.txt'
installing library code to build/bdist.linux-x86_64/egg
running install_lib
running build_py
creating build
creating build/lib
creating build/lib/xkcdpass
copying xkcdpass/xkcd_password.py -&gt; build/lib/xkcdpass
copying xkcdpass/__init__.py -&gt; build/lib/xkcdpass
creating build/lib/xkcdpass/static
copying xkcdpass/static/eff-long -&gt; build/lib/xkcdpass/static
copying xkcdpass/static/eff-short -&gt; build/lib/xkcdpass/static
copying xkcdpass/static/eff-special -&gt; build/lib/xkcdpass/static
copying xkcdpass/static/fin-kotus -&gt; build/lib/xkcdpass/static
copying xkcdpass/static/ita-wiki -&gt; build/lib/xkcdpass/static
copying xkcdpass/static/legacy -&gt; build/lib/xkcdpass/static
copying xkcdpass/static/spa-mich -&gt; build/lib/xkcdpass/static
creating build/bdist.linux-x86_64
creating build/bdist.linux-x86_64/egg
creating build/bdist.linux-x86_64/egg/xkcdpass
copying build/lib/xkcdpass/xkcd_password.py -&gt; build/bdist.linux-x86_64/egg/xkcdpass
copying build/lib/xkcdpass/__init__.py -&gt; build/bdist.linux-x86_64/egg/xkcdpass
creating build/bdist.linux-x86_64/egg/xkcdpass/static
copying build/lib/xkcdpass/static/eff-long -&gt; build/bdist.linux-x86_64/egg/xkcdpass/static
copying build/lib/xkcdpass/static/eff-short -&gt; build/bdist.linux-x86_64/egg/xkcdpass/static
copying build/lib/xkcdpass/static/eff-special -&gt; build/bdist.linux-x86_64/egg/xkcdpass/static
copying build/lib/xkcdpass/static/fin-kotus -&gt; build/bdist.linux-x86_64/egg/xkcdpass/static
copying build/lib/xkcdpass/static/ita-wiki -&gt; build/bdist.linux-x86_64/egg/xkcdpass/static
copying build/lib/xkcdpass/static/legacy -&gt; build/bdist.linux-x86_64/egg/xkcdpass/static
copying build/lib/xkcdpass/static/spa-mich -&gt; build/bdist.linux-x86_64/egg/xkcdpass/static
byte-compiling build/bdist.linux-x86_64/egg/xkcdpass/xkcd_password.py to xkcd_password.pyc
byte-compiling build/bdist.linux-x86_64/egg/xkcdpass/__init__.py to __init__.pyc
creating build/bdist.linux-x86_64/egg/EGG-INFO
copying xkcdpass.egg-info/PKG-INFO -&gt; build/bdist.linux-x86_64/egg/EGG-INFO
copying xkcdpass.egg-info/SOURCES.txt -&gt; build/bdist.linux-x86_64/egg/EGG-INFO
copying xkcdpass.egg-info/dependency_links.txt -&gt; build/bdist.linux-x86_64/egg/EGG-INFO
copying xkcdpass.egg-info/entry_points.txt -&gt; build/bdist.linux-x86_64/egg/EGG-INFO
copying xkcdpass.egg-info/not-zip-safe -&gt; build/bdist.linux-x86_64/egg/EGG-INFO
copying xkcdpass.egg-info/top_level.txt -&gt; build/bdist.linux-x86_64/egg/EGG-INFO
creating dist
creating 'dist/xkcdpass-1.14.3-py2.7.egg' and adding 'build/bdist.linux-x86_64/egg' to it
removing 'build/bdist.linux-x86_64/egg' (and everything under it)
Processing xkcdpass-1.14.3-py2.7.egg
creating /usr/lib/python2.7/site-packages/xkcdpass-1.14.3-py2.7.egg
Extracting xkcdpass-1.14.3-py2.7.egg to /usr/lib/python2.7/site-packages
Adding xkcdpass 1.14.3 to easy-install.pth file
Installing xkcdpass script to /usr/bin</p>
<p>Installed /usr/lib/python2.7/site-packages/xkcdpass-1.14.3-py2.7.egg
Processing dependencies for xkcdpass==1.14.3
Finished processing dependencies for xkcdpass==1.14.3</p>
<p>现在运行 <code>xkcdpass</code> 命令，将会随机给出你几个像下面这样的字典单词：</p>
<p>root@kerneltalks # xkcdpass
broadside unpadded osmosis statistic cosmetics lugged</p>
<p>你可以用这些单词作为其他命令，比如 <code>md5sum</code> 的输入，来获取随机密码（就像下面这样），甚至你也可以用每个单词的第 N 个字母来生成你的密码！</p>
<p>root@kerneltalks # xkcdpass |md5sum
45f2ec9b3ca980c7afbd100268c74819  -</p>
<p>root@kerneltalks # xkcdpass |md5sum
ad79546e8350744845c001d8836f2ff2  -</p>
<p>或者你甚至可以把所有单词串在一起作为一个超长的密码，不仅非常好记，也不容易被电脑程序攻破。</p>
<p>Linux 上还有像 <a href="http://world.std.com/%7Ereinhold/diceware.html">Diceware</a>、 <a href="https://www.keepassx.org/">KeePassX</a>、 <a href="https://packages.debian.org/sid/gnome/revelation">Revelation</a>、 <a href="https://passwordmaker.org/">PasswordMaker</a> 这样的工具，也可以考虑用来生成强随机密码。</p>
<hr>
<p>via: <a href="https://kerneltalks.com/tips-tricks/8-ways-to-generate-random-password-in-linux/">https://kerneltalks.com/tips-tricks/8-ways-to-generate-random-password-in-linux/</a></p>
<p>作者：<a href="https://kerneltalks.com">kerneltalks</a> 译者：<a href="https://github.com/heart4lor">heart4lor</a> 校对：<a href="https://github.com/locez">Locez</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
八种在 Linux 上生成随机密码的方法

## 原文链接
[https://www.zcfy.cc/article/8-ways-to-generate-random-password-in-linux](https://www.zcfy.cc/article/8-ways-to-generate-random-password-in-linux)

