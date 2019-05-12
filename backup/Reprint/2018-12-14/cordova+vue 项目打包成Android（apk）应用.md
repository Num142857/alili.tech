---
title: 'cordova+vue 项目打包成Android（apk）应用' 
date: 2018-12-14 2:30:11
hidden: true
slug: amtmz2z8g4n
categories: [reprint]
---

{{< raw >}}

                    
<p>现在使用vue开发的项目越来越多，使用vue开发的移动端打包就成了最大的问题。<br>现在前端打包方案有好多种，但是综合来说，我比较喜欢用cordova来进行Android和ios的打包，配置完成之后，每次只需要一条命令就可以完成打包。</p>
<p>1.安装cordova<br>这一步的前提是已经完成安装node和npm,如果没有安装的话，请先完成node和npm的安装。<br>node安装：直接进入官网<a href="https://nodejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/zh-cn/</a>，下载最新版本安装。安装之后在命令行中使用”node -v” 检查安装是否成功。<br>npm安装：由于新版的nodejs已经集成了npm，所以node安装时npm也一并安装好了。同样可以通过输入 “npm -v” 来测试是否成功安装。<br>使用命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g cordova" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g cordova</code></pre>
<p>来全局安装cordova，安装成功之后，使用命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova -v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">cordova -v</span></code></pre>
<p>来检查是否正确安装，正确安装会显示安装的cordova版本号。</p>
<p><span class="img-wrap"><img data-src="/img/bV3m4P?w=677&amp;h=539" src="https://static.alili.tech/img/bV3m4P?w=677&amp;h=539" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2.新建cordova项目<br>执行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova create myApp1 org.apache.cordova.myApp myApp2
cd myApp1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>cordova create myApp1 org<span class="hljs-selector-class">.apache</span><span class="hljs-selector-class">.cordova</span><span class="hljs-selector-class">.myApp</span> myApp2
cd myApp1</code></pre>
<p>来新建cordova项目，初始化cordova开发环境。<br>其中：<br>myApp1：cordova目录名<br>org.apache.cordova.myApp： 包名<br>myApp2： 项目名（在config.xml中查看）<br>生成的cordova文件中<br>*config.xml -包含应用相关信息，使用到的插件以及面向的平台</p>
<p>platforms – 包含应用运行平台如 Android 和 iOS 上对应的 Cordova 库</p>
<p>plugins – 包含应用所需插件的 Cordova 库，使得应用能够访问例如照相机和电池状态相关的事项。</p>
<p>www – 包含应用源代码，例如 HTML, JavaScript 和 CSS 文件</p>
<p>hooks – 包含为个性化应用编译系统所需的脚本*</p>
<p>使用命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova platform add android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">cordova platform <span class="hljs-keyword">add</span><span class="bash"> android</span></code></pre>
<p>来生成Android平台的cordova库，这时platforms文件夹中会生成一个android文件夹。<br>到这里，cordova项目就已经建好了。</p>
<p>3.新建vue项目<br><strong>为了方便，不需要每次编译都拷贝文件，可直接在cordova项目根目录中创建vue项目。</strong><br>首先全局安装Vue-cli脚手架。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue
npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> -g vue
npm <span class="hljs-keyword">install</span> -g vue-cli</code></pre>
<p>然后使用命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack MyApp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vue init webpack MyApp</span></code></pre>
<p>新建vue项目。完成之后的目录如下所示。</p>
<p><span class="img-wrap"><img data-src="/img/bV3nbO?w=826&amp;h=758" src="https://static.alili.tech/img/bV3nbO?w=826&amp;h=758" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>到这里，vue项目即构建完成。</p>
<p>4.修改文件<br>修改Vue项目config/index.js文件.</p>
<p><span class="img-wrap"><img data-src="/img/bV3ngm?w=1174&amp;h=1198" src="https://static.alili.tech/img/bV3ngm?w=1174&amp;h=1198" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>5.编译vue项目<br>在vue项目根目录执行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>即可编译vue项目自动到cordova主目录下的www文件夹中。</p>
<p>6.调试打包apk软件<br>调试打包软件之前，首先检查androidsdk是否正确安装，执行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova requirements" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">cordova requirements</span></code></pre>
<p>即可看到当前环境中sdk安装情况。显示如下即表示环境正确安装。（只需确认正确安装即可，不需每次都去检查）</p>
<p><span class="img-wrap"><img data-src="/img/bV3neR?w=841&amp;h=277" src="https://static.alili.tech/img/bV3neR?w=841&amp;h=277" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在cordova主目录下使用命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova run android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">cordova <span class="hljs-keyword">run</span><span class="bash"> android</span></code></pre>
<p>来联调android软件（需连接真机或者模拟器）。<br>执行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova build android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">cordova</span> <span class="hljs-keyword">build </span><span class="hljs-keyword">android</span></code></pre>
<p>来打包成apk软件（…/cordovaApp/platforms/android/app/build/outputs/apk/debug/app-debug.apk）。</p>
<p><span class="img-wrap"><img data-src="/img/bV3njM?w=677&amp;h=539" src="https://static.alili.tech/img/bV3njM?w=677&amp;h=539" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3nka?w=677&amp;h=539" src="https://static.alili.tech/img/bV3nka?w=677&amp;h=539" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3nko?w=799&amp;h=243" src="https://static.alili.tech/img/bV3nko?w=799&amp;h=243" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>7.APK签名<br>APK都必须经过数字签名后才能安装到设备上，签名需要对应的证书（keystore），大部分情况下 APK 都采用的自签名证书，就是自己生成证书然后给应用签名。<br>数字签名证书是给APK打包所必需的文件，所以我们先要把数字签名证书生成。<br>在命令提示符下输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="keytool -genkey -v -keystore D:\mytest.keystore -alias mytest -keyalg RSA -validity 20000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">keytool -genkey -v -keystore D:\mytest<span class="hljs-selector-class">.keystore</span> -alias mytest -keyalg RSA -validity <span class="hljs-number">20000</span></code></pre>
<p>*-keystore D:/mytest.keystore表示生成的证书及其存放路径，如果直接写文件名则默认生成在用户当前目录下；<br>　　-alias mytest 表示证书的别名是mytest,不写这一项的话证书名字默认是mykey；<br>　　-keyalg RSA 表示采用的RSA算法；<br>　　-validity 20000表示证书的有效期是20000天。*<br>根据指令输入密钥库口令，是不可见的。依次输入下面的问题。最后到【否】那里时输入y<br>再输入密钥口令（可以与密钥库口令相同），如果相同，直接回车，记住这两个口令，后面签名会使用到。<br>这时便会生成一个文件mytest.keystore，就是我们需要的签名文件。</p>
<p><span class="img-wrap"><img data-src="/img/bV3nlo?w=871&amp;h=396" src="https://static.alili.tech/img/bV3nlo?w=871&amp;h=396" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3nlz?w=885&amp;h=161" src="https://static.alili.tech/img/bV3nlz?w=885&amp;h=161" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>生成带签名的apk有两种方式，一种先生成未签名debug版本，再加上数字签名证书然后生成带签名的APK。另外一种就是直接一条命令生成带签名的APK。<br>（1）先生成未签名的debug版本的apk<br>首先执行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova build android --release" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">cordova</span> <span class="hljs-keyword">build </span><span class="hljs-keyword">android </span>--release</code></pre>
<p>, 就会生成一个app-release-unsigned.apk。把数字签名放到生成的未签名的apk所在的目录下，输入以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mytest.keystore app-release-unsigned.apk mytest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">jarsigner </span>-verbose -sigalg <span class="hljs-keyword">SHA1withRSA </span>-<span class="hljs-keyword">digestalg </span><span class="hljs-keyword">SHA1 </span>-keystore mytest.keystore app-release-unsigned.apk mytest</code></pre>
<p>这时的apk就会是一个已经签名的apk了，修改一下名字即可直接放到设备上安装。<br><span class="img-wrap"><img data-src="/img/bV3nm2?w=869&amp;h=278" src="https://static.alili.tech/img/bV3nm2?w=869&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3nm6?w=973&amp;h=715" src="https://static.alili.tech/img/bV3nm6?w=973&amp;h=715" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3nnz?w=973&amp;h=715" src="https://static.alili.tech/img/bV3nnz?w=973&amp;h=715" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>(2)直接生成带签名的apk<br>有了数字签名之后,数字签名需要放在cordova项目根目录下或者可以修改下面指令的keystore里的路径可以直接在cordova build中指定所有参数来快速打包，这会直接生成一个android-release.apk(已经是带签名的了)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova build android --release --keystore=&quot;mytest.keystore&quot; --alias=mytest --storePassword=testing --password=testing1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">cordova</span> <span class="hljs-comment">build</span> <span class="hljs-comment">android</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">release</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">keystore="mytest</span><span class="hljs-string">.</span><span class="hljs-comment">keystore"</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">alias=mytest</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">storePassword=testing</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">password=testing1</span></code></pre>
<p><em>keystore 后面是数字签名证书， –alias 后面是别名 storePassword 后面是密钥库口令 password 后面是密钥口令</em><br><strong>注意：命令中口令要替换成自己的，就是生成签名是需要记住的那两个口令</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV3npb?w=853&amp;h=539" src="https://static.alili.tech/img/bV3npb?w=853&amp;h=539" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3npk?w=853&amp;h=539" src="https://static.alili.tech/img/bV3npk?w=853&amp;h=539" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV3npr?w=803&amp;h=233" src="https://static.alili.tech/img/bV3npr?w=803&amp;h=233" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>但每次打包输入命令行参数是很重复的，Cordova 允许我们建立一个 build.json 配置文件来简化操作。在cordova根目录新建文本文档，改名为build.json。</p>
<p><span class="img-wrap"><img data-src="/img/bV3nqp?w=812&amp;h=504" src="https://static.alili.tech/img/bV3nqp?w=812&amp;h=504" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>文件内容如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
　　”android”: {
　　　　”release”: {
　　　　　　”keystore”: “mytest.keystore”,
　　　　　　”alias”: “mytest”,
　　　　　　”storePassword”: “testing”,
　　　　　　”password”: “testing2”
　　　　　　}　　
　　　　}
　　}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>    {
　　”android”: {
　　　　”release”: {
　　　　　　”keystore”: “mytest.keystore”,
　　　　　　”alias”: “mytest”,
　　　　　　”storePassword”: “testing”,
　　　　　　”password”: “testing2”
　　　　　　}　　
　　　　}
　　}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3nqP?w=1034&amp;h=431" src="https://static.alili.tech/img/bV3nqP?w=1034&amp;h=431" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>但下面的两个密码建议不要写到里面去，可以去掉然后手动输入。</p>
<p>直接使用<br><code>cordova build –release</code><br>就可以生成带签名的apk了</p>
<p><span class="img-wrap"><img data-src="/img/bV3nq7?w=666&amp;h=225" src="https://static.alili.tech/img/bV3nq7?w=666&amp;h=225" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><strong>注意：cordova build后面没有android</strong></p>
<p><strong><em>如果这篇文章对你的工作或者学习有帮助的话，请收藏或点个赞。如果对其中有什么不明白的或者报错，可以留言或者加<a href="https://jq.qq.com/?_wv=1027&amp;k=5OOFkES" rel="nofollow noreferrer" target="_blank">QQ群140455228</a>交流。</em></strong></p>
<p><strong>注意：请支持原创，本文谢绝转载，确有需要可链接到本文。本文链接地址：<a href="https://segmentfault.com/a/1190000013159076">https://segmentfault.com/a/11...</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
cordova+vue 项目打包成Android（apk）应用

## 原文链接
[https://segmentfault.com/a/1190000013159076](https://segmentfault.com/a/1190000013159076)

