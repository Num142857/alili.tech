---
title: 'ReactNative Windows环境搭建，折腾不止' 
date: 2018-12-09 2:30:08
hidden: true
slug: pup7fd3l7d8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React Native</h1>
<h4>windows环境搭建开发Android</h4>
<ul>
<li>安装python2.7.X（不支持Python 3版本）</li>
<li>安装node.js（5.x版本或更高版本）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> config set registry https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org --<span class="hljs-built_in">global</span>
<span class="hljs-built_in">npm</span> config set disturl https:<span class="hljs-regexp">//</span><span class="hljs-built_in">npm</span>.taobao.org/dist --<span class="hljs-built_in">global</span></code></pre>
<ul><li>安装react-native-cli</li></ul>
<blockquote>npm install -g yarn react-native-cli</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>yarn config <span class="hljs-built_in">set</span> registry <span class="hljs-keyword">https</span>://registry.npm.taobao.org <span class="hljs-comment">--global</span>
yarn config <span class="hljs-built_in">set</span> disturl <span class="hljs-keyword">https</span>://npm.taobao.org/dist <span class="hljs-comment">--global</span></code></pre>
<ul><li>安装java jdk1.8</li></ul>
<blockquote>设置环境变量：计算机属性&gt;高级&gt;环境变量&gt;系统变量</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(1)新建环境变量java_home   jdk安装path
(2)修改环境变量path   %java_home%/bin
(3)修改环境变量classpath   .;%java_home%\lib\dt.jar;%java_home%\lib\tools.jar
(4)javac是否输出信息" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>(1)新建环境变量java_home   jdk安装path
(2)修改环境变量path   <span class="hljs-variable">%java_home%</span>/bin
(3)修改环境变量classpath   .;<span class="hljs-variable">%java_home%</span><span class="hljs-symbol">\l</span>ib<span class="hljs-symbol">\d</span>t.jar;<span class="hljs-variable">%java_home%</span><span class="hljs-symbol">\l</span>ib<span class="hljs-symbol">\t</span>ools.jar
(4)javac是否输出信息</code></pre>
<ul><li>安装Android Studio2.0或更高版本。</li></ul>
<blockquote>Android Studio不要乱点选项，多装了并没有害处</blockquote>
<ul><li>安装sdk</li></ul>
<blockquote>react native目前支持android6.0 API23.0.1版本的sdk<br><span class="img-wrap"><img data-src="/img/remote/1460000013886359?w=1038&amp;h=702" src="https://static.alili.tech/img/remote/1460000013886359?w=1038&amp;h=702" alt="image" title="image" style="cursor: pointer;"></span>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013886360" src="https://static.alili.tech/img/remote/1460000013886360" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<ul><li>设置Android SDK环境变量</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.新建ANDROID_HOME   sdk路径
2.在path 添加%ANDROID_HOME%/tools;%ANDROID_HOME%/platform-tools
3.adb是否输出信息" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-number">1.</span>新建ANDROID_HOME   sdk路径
<span class="hljs-number">2.</span>在path 添加%ANDROID_HOME%/tools;%ANDROID_HOME%/platform-tools
<span class="hljs-number">3.</span>adb是否输出信息</code></pre>
<ul><li>修改 Maven 仓库地址</li></ul>
<blockquote>React Native 在初始化时会从 jcenter.binary.com 这个地方下载一些东西，网上搜索了一下，好像是在下载 Maven 相关的依赖。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="针对全局进行修改。在用户主目录的 .gradle 文件夹下新建一个 init.gradle 文件，该文件的内容如下

allprojects {
    repositories {
        def REPOSITORY_URL = 'http://maven.aliyun.com/nexus/content/groups/public/'
        all { ArtifactRepository repo ->
            if (repo instanceof MavenArtifactRepository &amp;&amp; repo.url != null) {
                def url = repo.url.toString()
                if (url.startsWith('https://repo1.maven.org/maven2') || url.startsWith('https://jcenter.bintray.com/')) {
                    project.logger.lifecycle &quot;Repository ${repo.url} replaced by $REPOSITORY_URL.&quot;
                    remove repo
                }
            }
        }
        maven {
            url REPOSITORY_URL
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>针对全局进行修改。在用户主目录的 .gradle 文件夹下新建一个 init.gradle 文件，该文件的内容如下

allprojects {
    <span class="hljs-attribute">repositories {
        def REPOSITORY_URL = 'http</span>://maven<span class="hljs-variable">.aliyun</span><span class="hljs-variable">.com</span>/nexus/content/groups/public/'
        all { ArtifactRepository repo -&gt;
            if (repo instanceof MavenArtifactRepository &amp;&amp; repo<span class="hljs-variable">.url</span> != null) {
                def url = repo<span class="hljs-variable">.url</span><span class="hljs-variable">.toString</span>()
                if (url<span class="hljs-variable">.startsWith</span>('https://repo1<span class="hljs-variable">.maven</span><span class="hljs-variable">.org</span>/maven2') || url<span class="hljs-variable">.startsWith</span>('https://jcenter<span class="hljs-variable">.bintray</span><span class="hljs-variable">.com</span>/')) {
                    project<span class="hljs-variable">.logger</span><span class="hljs-variable">.lifecycle</span> "Repository ${repo<span class="hljs-variable">.url</span>} replaced by $REPOSITORY_URL."
                    remove repo
                }
            }
        }
        maven {
            url REPOSITORY_URL
        }
    }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013886361" src="https://static.alili.tech/img/remote/1460000013886361" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>运行项目</li></ul>
<blockquote>react-native init hello   #创建项目名<p>cd hello</p>
<p>react-native run-android</p>
</blockquote>
<h3 id="articleHeader1">有关run-android报错以及踩过的坑总结</h3>
<ul>
<li>我的android studio下载sdk每次都有下载问题,我又下载了一个Android SDk Tools(一整套Android SDK的开发和调试工具)来下载23.0.1的sdk</li>
<li>使用官方推荐的虚拟机<a href="https://www.genymotion.com/" rel="nofollow noreferrer" target="_blank">Genymotion</a>
</li>
</ul>
<blockquote>比起Android Studio自带的原装模拟器，Genymotion是一个性能更好的选择，但它只对个人用户免费</blockquote>
<h3 id="articleHeader2">那么坑来了：</h3>
<h5>我下载的Genymotion包含virtualBox，然而win7始终无法打开Genymotion的安卓虚拟机</h5>
<p><span class="img-wrap"><img data-src="/img/bV6p3C?w=508&amp;h=241" src="https://static.alili.tech/img/bV6p3C?w=508&amp;h=241" alt="Genymotion报错" title="Genymotion报错" style="cursor: pointer; display: inline;"></span></p>
<h5>virlualBox报错 E_FALL(0x80004005)</h5>
<p>很多报错都会显示这个错误代码，具体细节可以再看报错信息，找了网上好多解决办法都没生效，怀疑还是没找到问题，于是我仔细地看了看虚拟机控制台输出信息和设置，发现了端倪提示大概是CPU无法分配的，也就是硬件虚拟化，相关链接<a href="https://www.cnblogs.com/zhao1949/p/6116183.html" rel="nofollow noreferrer" target="_blank"></a><a href="https://www.cnblogs.com/zhao1949/p/6116183.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/zhao1...</a><br>我用的thinkpad，F1进入BOIS界面,找到Security，Virtualization，选择Enable即可<br>怎么确认自己是否是硬件虚拟化原因，如图如果你的系统是64位，却看不到64-bit的选项很有可能是这个原因，在附上我虚拟机的配置选项<br><span class="img-wrap"><img data-src="/img/bV6qhy?w=643&amp;h=411" src="https://static.alili.tech/img/bV6qhy?w=643&amp;h=411" alt="virlualbox" title="virlualbox" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV6qin?w=607&amp;h=254" src="https://static.alili.tech/img/bV6qin?w=607&amp;h=254" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV6qiD?w=641&amp;h=416" src="https://static.alili.tech/img/bV6qiD?w=641&amp;h=416" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>Genymotion配置自己下载的SDk</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6qkv?w=572&amp;h=529" src="https://static.alili.tech/img/bV6qkv?w=572&amp;h=529" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>到此能启动虚拟机，虚拟机没报错却看不到安卓界面就说明你下的sdk有问题</p>
<ul><li>连接真机</li></ul>
<p>这坑是小米给的，无声无息，充满了恶意</p>
<blockquote>adb devices #查看设备是否连接</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV6qnw?w=539&amp;h=102" src="https://static.alili.tech/img/bV6qnw?w=539&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如何没有请检查是否开启usb调试，可能端口5037被占</p>
<blockquote>netstat -aon|findstr "5037"</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV6qsS?w=681&amp;h=311" src="https://static.alili.tech/img/bV6qsS?w=681&amp;h=311" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>打开任务管理器&gt;进程   找到对应的PID结束进程，记得把杀毒软件，360等都关了</p>
<p><span class="img-wrap"><img data-src="/img/bV6qtT?w=382&amp;h=79" src="https://static.alili.tech/img/bV6qtT?w=382&amp;h=79" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>到这应该成功了，然后发现run-android发现还是会报错</p>
<p><span class="img-wrap"><img data-src="/img/bV6quo?w=957&amp;h=363" src="https://static.alili.tech/img/bV6quo?w=957&amp;h=363" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我adb都能找到设备，WTF。。。<br>原因就在USB安装没开启，点开启不就完了，小米提示需要插SIM卡，无语......，最后建议把启用MIUI优化也关了<br>最后如果还是找不到设备建议看一下这个文章<a href="https://www.cnblogs.com/sanshuimiao/p/7809946.html" rel="nofollow noreferrer" target="_blank"></a><a href="https://www.cnblogs.com/sanshuimiao/p/7809946.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/sansh...</a></p>
<ul><li>最后奉上我的安装包</li></ul>
<blockquote>链接：<a href="https://pan.baidu.com/s/1EO5eDJ-Z60eOQqGfghbG3A" rel="nofollow noreferrer" target="_blank">https://pan.baidu.com/s/1EO5e...</a> 密码：gyj4</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ReactNative Windows环境搭建，折腾不止

## 原文链接
[https://segmentfault.com/a/1190000013886354](https://segmentfault.com/a/1190000013886354)

