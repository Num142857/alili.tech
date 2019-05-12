---
title: 'vue和cordova项目整合打包，并实现vue调用android的相机的demo' 
date: 2018-12-07 2:30:10
hidden: true
slug: 3w59e8qhrcu
categories: [reprint]
---

{{< raw >}}

                    
<p>经过网上查找很多资料，发现很多只有vue+cordova的项目整合，但是vue使用cordova插件的文章很少，现在把从创建cordova和创建vue到vue使用插件到项目打包到android手机运行过程记录下来；</p>
<p>先上项目结构目录<br><span class="img-wrap"><img data-src="/img/bV7koX?w=254&amp;h=525" src="https://static.alili.tech/img/bV7koX?w=254&amp;h=525" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader0">cordova项目创建</h2>
<p>1、安装cordova环境这个这边就不描述了，网上很多教程<br>2、创建cordova应用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova create app com.demo app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">cordova create <span class="hljs-keyword">app</span> com.demo <span class="hljs-keyword">app</span></code></pre>
<p>cordova create 创建cordova项目 app为目录 com.demo命名空间 app项目名称</p>
<p>3、添加平台</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd app
cordova platform add android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>cd app
cordova platform <span class="hljs-keyword">add</span><span class="bash"> android</span></code></pre>
<p>cd命令进入到项目文件夹里面添加安卓平台，要添加ios就把安卓换成ios就可以了</p>
<p>4、编译安卓app</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova build android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">cordova</span> <span class="hljs-keyword">build </span><span class="hljs-keyword">android</span></code></pre>
<p>编译安卓系统，如果成功就表示编译完成<br>注：如果没编译成功，那么就用检查环境命令去检查</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova requirements" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">cordova requirements</span></code></pre>
<p>运行命令后会有提示环境或者其他问题</p>
<p>5、<code>cordova emulate android</code><br>在安卓模拟器上运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova serve android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">cordova serve android</span></code></pre>
<p>在浏览器上面运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova run android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">cordova <span class="hljs-keyword">run</span><span class="bash"> android</span></code></pre>
<p>在安卓手机上面运行，前提是电脑连接了安卓手机并且装好驱动和打开usb调试</p>
<p>到这里cordova项目创建完成</p>
<hr>
<h2 id="articleHeader1">vue项目创建</h2>
<p>1、vue环境和webpack安装这边就不详述了，网上很多<br>2、安装好vue后进入到cordova项目里面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vue init webpack vue</span></code></pre>
<p>最后的‘vue’为项目的名字<br>3、<span class="img-wrap"><img data-src="/img/bV7ksE?w=684&amp;h=767" src="https://static.alili.tech/img/bV7ksE?w=684&amp;h=767" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>4、根据图上面提示的cd 指向vue项目后 npm run dev用开发模式跑起来项目</p>
<h2 id="articleHeader2">vue和cordova项目整合</h2>
<p>1、把cordova项目的index.html里面的meta标签和cordova.js引用复制到vue项目的index.html<br><span class="img-wrap"><img data-src="/img/bV7ktu?w=1782&amp;h=955" src="https://static.alili.tech/img/bV7ktu?w=1782&amp;h=955" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>2、修改vue项目里面的配置，直接上图，<span class="img-wrap"><img data-src="/img/bV7ktE?w=1907&amp;h=1047" src="https://static.alili.tech/img/bV7ktE?w=1907&amp;h=1047" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>到这里修改完成</p>
<h2 id="articleHeader3">添加cordova插件</h2>
<p>这里以相机为例<br>1、进入到cordova项目目录，不是vue<br><span class="img-wrap"><img data-src="/img/bV7kuF?w=1237&amp;h=102" src="https://static.alili.tech/img/bV7kuF?w=1237&amp;h=102" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova plugin add cordova-plugin-camera" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">cordova plugin <span class="hljs-keyword">add</span><span class="bash"> cordova-plugin-camera</span></code></pre>
<p>添加相机插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova plugin ls" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">cordova <span class="hljs-keyword">plugin</span> <span class="hljs-keyword">ls</span></code></pre>
<p>列出所有已安装的cordova插件</p>
<p>参考w3c的文档<a href="https://www.w3cschool.cn/cordova/cordova_camera.html" rel="nofollow noreferrer" target="_blank">https://www.w3cschool.cn/cord...</a></p>
<p>到这里cordova安装的相机插件</p>
<h2 id="articleHeader4">重点来了：vue怎么用相机</h2>
<p>1、修改vue项目的main.js的写法<br><span class="img-wrap"><img data-src="/img/bV7kvw?w=1495&amp;h=838" src="https://static.alili.tech/img/bV7kvw?w=1495&amp;h=838" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>添加deviceready事件监听，当cordova设备准备完成后再new vue<br>2、创建一个js文件，我这边叫cordovaplugin.js<br><span class="img-wrap"><img data-src="/img/bV7kwO?w=1241&amp;h=854" src="https://static.alili.tech/img/bV7kwO?w=1241&amp;h=854" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>3、修改App.vue文件，增加按钮和事件调用<br><span class="img-wrap"><img data-src="/img/bV7kxd?w=1362&amp;h=981" src="https://static.alili.tech/img/bV7kxd?w=1362&amp;h=981" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>到这边就完成了，剩下编译和打包<br>4、进入vue文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV7kxE?w=697&amp;h=525" src="https://static.alili.tech/img/bV7kxE?w=697&amp;h=525" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>到这边vue项目编译完成<br>5、回到cordova项目文件夹，进行打包<br><span class="img-wrap"><img data-src="/img/bV7kxW?w=1239&amp;h=588" src="https://static.alili.tech/img/bV7kxW?w=1239&amp;h=588" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova run android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">cordova <span class="hljs-keyword">run</span><span class="bash"> android</span></code></pre>
<p>运行到安卓手机上，前提是有用手机连接电脑</p>
<h2 id="articleHeader5">完成-手机截图</h2>
<p><span class="img-wrap"><img data-src="/img/bV7kyW?w=1080&amp;h=1920" src="https://static.alili.tech/img/bV7kyW?w=1080&amp;h=1920" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV7kyY?w=1080&amp;h=1920" src="https://static.alili.tech/img/bV7kyY?w=1080&amp;h=1920" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue和cordova项目整合打包，并实现vue调用android的相机的demo

## 原文链接
[https://segmentfault.com/a/1190000014101362](https://segmentfault.com/a/1190000014101362)

