---
title: 'Electron 打包Mac安装包代码签名问题解决方案' 
date: 2018-12-17 2:30:07
hidden: true
slug: c3pv8aj59t
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一直在做electron应用的打包，集成mac版本的自动更新时出现了问题。<br>具体打包流程请参考：<a href="https://segmentfault.com/a/1190000012899824">Electron 桌面应用打包（npm run build）简述(windows + mac)</a><br>Electron应用集成自动更新功能可参考：<a href="https://segmentfault.com/a/1190000012904543" target="_blank">Electron应用使用electron-builder配合electron-updater实现自动更新</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: Could not get code signature for running application" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Error: </span>Could not get code signature for running application</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV2iBP?w=1140&amp;h=732" src="https://static.alili.tech/img/bV2iBP?w=1140&amp;h=732" alt="TIM%E5%9B%BE%E7%89%8720180115153729.png" title="TIM%E5%9B%BE%E7%89%8720180115153729.png" style="cursor: pointer; display: inline;"></span></p>
<p>无法获取当前应用的代码签名。</p>
<p><strong>（首先声明：由于mac的签名机制，npm run dev 是肯定没有签名的，以下所述都需要在npm run build 下打正式包）</strong></p>
<p>百思不得其解，试过了各种办法，研究了N遍<a href="https://www.electron.build/code-signing" rel="nofollow noreferrer" target="_blank">官方文档</a>，发现现实和书上写的还是不一样。<br>注意到一直是npm run build打包的时候都无法签名成功（由于无法获取开发者认证信息，跳过签名）。<br><span class="img-wrap"><img data-src="/img/bV2iDL?w=1142&amp;h=734" src="https://static.alili.tech/img/bV2iDL?w=1142&amp;h=734" alt="TIM%E6%88%AA%E5%9B%BE20180115155755.png" title="TIM%E6%88%AA%E5%9B%BE20180115155755.png" style="cursor: pointer; display: inline;"></span></p>
<p>最后历经九九八十一难（有点小夸张），终于找到了解决方案，下面把过程写下来，以示记录。<br>针对上述Mac上打包无法进行正确代码签名的问题，通过设置环境变量和使用xcode进行代码签名可以解决。<br>一.设置环境变量CSC_LINK</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo vim ~/.bash_profile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">sudo</span> vim ~/.bash_profile</code></pre>
<p>在环境变量中配置</p>
<p><span class="img-wrap"><img data-src="/img/bV2iEa?w=842&amp;h=319" src="https://static.alili.tech/img/bV2iEa?w=842&amp;h=319" alt="TIM%E6%88%AA%E5%9B%BE20180116092320.png" title="TIM%E6%88%AA%E5%9B%BE20180116092320.png" style="cursor: pointer; display: inline;"></span></p>
<p>以上是<a href="https://www.electron.build/code-signing" rel="nofollow noreferrer" target="_blank">官网</a>的环境变量配置项，而其实我只配置了CSC_LINK一项，配置如下</p>
<p><span class="img-wrap"><img data-src="/img/bV2iEr?w=1140&amp;h=732" src="https://static.alili.tech/img/bV2iEr?w=1140&amp;h=732" alt="TIM%E5%9B%BE%E7%89%8720180116092549.jpg" title="TIM%E5%9B%BE%E7%89%8720180116092549.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>设置好环境变量之后用命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" source ~/.bash_profile" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-built_in">source</span> ~/.bash_profile</code></pre>
<p>重载变量文件，使用命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="env" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">env</span></code></pre>
<p>查看环境变量配置结果</p>
<p><span class="img-wrap"><img data-src="/img/bV2iEF?w=1142&amp;h=734" src="https://static.alili.tech/img/bV2iEF?w=1142&amp;h=734" alt="TIM%E6%88%AA%E5%9B%BE20180116140907.png" title="TIM%E6%88%AA%E5%9B%BE20180116140907.png" style="cursor: pointer; display: inline;"></span><br>注意：如果配置完成之后，多次重载都发现环境变量不能正确更新到列表中，这时应该先退出终端，然后再登录终端查看环境变量即可看到更新完成。</p>
<p>二.使用X-code进行mac版本上代码签名：<br>1.打开xcode主界面<br>2.Xcode==&gt;Preferences…<br><span class="img-wrap"><img data-src="/img/bV2iE7?w=1844&amp;h=1027" src="https://static.alili.tech/img/bV2iE7?w=1844&amp;h=1027" alt="TIM%E6%88%AA%E5%9B%BE20180115161707.png" title="TIM%E6%88%AA%E5%9B%BE20180115161707.png" style="cursor: pointer; display: inline;"></span><br>3.Accounts==&gt;Apple IDs==&gt;Manage Certificates…<br>如果没有登录的话，先登录Apple ID，注意一定要登录开发者账号。登录成功后再进行Manage Certificates；<br><span class="img-wrap"><img data-src="/img/bV2iFP?w=1494&amp;h=1028" src="https://static.alili.tech/img/bV2iFP?w=1494&amp;h=1028" alt="TIM%E6%88%AA%E5%9B%BE20180115161949.png" title="TIM%E6%88%AA%E5%9B%BE20180115161949.png" style="cursor: pointer; display: inline;"></span><br>4.添加“+”Developer ID Application,注意一定要添加Developer ID Application到钥匙串中，不要选错了。<br><span class="img-wrap"><img data-src="/img/bV2iF2?w=1205&amp;h=1028" src="https://static.alili.tech/img/bV2iF2?w=1205&amp;h=1028" alt="TIM%E6%88%AA%E5%9B%BE20180115162432.png" title="TIM%E6%88%AA%E5%9B%BE20180115162432.png" style="cursor: pointer; display: inline;"></span><br>5.成功添加到钥匙串我的证书中<br>经过以上的步骤可以成功添加一个证书到钥匙串中的我的证书中。<br><span class="img-wrap"><img data-src="/img/bV2iGa?w=1202&amp;h=752" src="https://static.alili.tech/img/bV2iGa?w=1202&amp;h=752" alt="TIM%E6%88%AA%E5%9B%BE20180115162536.png" title="TIM%E6%88%AA%E5%9B%BE20180115162536.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV2iGc?w=1504&amp;h=1026" src="https://static.alili.tech/img/bV2iGc?w=1504&amp;h=1026" alt="TIM%E6%88%AA%E5%9B%BE20180116102252.png" title="TIM%E6%88%AA%E5%9B%BE20180116102252.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV2iGk?w=1028&amp;h=866" src="https://static.alili.tech/img/bV2iGk?w=1028&amp;h=866" alt="TIM%E6%88%AA%E5%9B%BE20180115162839.png" title="TIM%E6%88%AA%E5%9B%BE20180115162839.png" style="cursor: pointer;"></span><br>至此使用Xcode成功添加代码签名到本地钥匙串中的我的证书中。<br>三.成功打包经过代码签名的安装包。<br>打包正在签名状态：<br><span class="img-wrap"><img data-src="/img/bV2iGq?w=1142&amp;h=734" src="https://static.alili.tech/img/bV2iGq?w=1142&amp;h=734" alt="TIM%E6%88%AA%E5%9B%BE20180115164120.png" title="TIM%E6%88%AA%E5%9B%BE20180115164120.png" style="cursor: pointer; display: inline;"></span></p>
<p>正确签名之后，打包成功！<br><span class="img-wrap"><img data-src="/img/bV2iGQ?w=1142&amp;h=734" src="https://static.alili.tech/img/bV2iGQ?w=1142&amp;h=734" alt="TIM%E6%88%AA%E5%9B%BE20180115163541.png" title="TIM%E6%88%AA%E5%9B%BE20180115163541.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>注意：通过钥匙串的方式进行代码签名，进而实现自动更新之后，appId应一致，打包应用后不能随意更改新的appId字段。否则会被认为是两个不同的应用而无法更新。</strong></p>
<p>四.Mac包正确升级（自动更新）示例</p>
<p>注意：先把正确签名打包后的高版本MAC安装文件上传服务器，然后本地再打包一个低版本Mac包文件.dmg，安装低版本MAC包，触发自动更新，即可完成升级，自动安装高版本MAC包到本地。</p>
<p><span class="img-wrap"><img data-src="/img/bV2pMM?w=1500&amp;h=1028" src="https://static.alili.tech/img/bV2pMM?w=1500&amp;h=1028" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV2pNa?w=1500&amp;h=1028" src="https://static.alili.tech/img/bV2pNa?w=1500&amp;h=1028" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>如果这篇文章对你的工作或者学习有帮助的话，请收藏或点个赞。如果对其中有什么不明白的或者报错，可以留言或者加<a href="https://jq.qq.com/?_wv=1027&amp;k=5OOFkES" rel="nofollow noreferrer" target="_blank">QQ群140455228</a>交流。</em></strong></p>
<p><strong>注意：请支持原创，本文谢绝转载，确有需要可链接到本文。本文链接地址：<a href="https://segmentfault.com/a/1190000012902525">https://segmentfault.com/a/11...</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron 打包Mac安装包代码签名问题解决方案

## 原文链接
[https://segmentfault.com/a/1190000012902525](https://segmentfault.com/a/1190000012902525)

