---
title: 'webpack再入门，说一下那些不入流的知识点' 
date: 2019-01-04 2:30:10
hidden: true
slug: l9eds1hrb9
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">先说说Vue-Cli（Vue项目脚手架）</h3>
<p>关于它能干什么，就不再赘述了，我们主要谈谈生成的与webpack相关的项目结构：<br><span class="img-wrap"><img data-src="/img/bVSJ77?w=315&amp;h=365" src="https://static.alili.tech/img/bVSJ77?w=315&amp;h=365" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>大体上就分三层（当然随着你在生成项目配置的参数不同，项目结构可能会有不同），首先package.json里面的devDependencies属性里，包含了构建这个项目webpack所需要的各种依赖node包和执行项目的快捷指令配置，build文件夹是一些和webpack相关的配置，而config是一些和项目相关的配置，关于这两个文件下每个文件具体是干啥的，可以看下<a href="http://blog.csdn.net/hongchh/article/details/55113751" rel="nofollow noreferrer" target="_blank">这篇文章</a>，我只简单说明一下，在执行命令时，这些文件是怎么组合在一起使用的，也可以理解成执行顺序，可以粗略看看：<br><span class="img-wrap"><img data-src="/img/bVSKln?w=1397&amp;h=433" src="https://static.alili.tech/img/bVSKln?w=1397&amp;h=433" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>所以我们知道，Vue-Cli之所以便捷，因为他启用了可配置参数来初始化一个项目，至于为什么要将我们通常的一个webpack.config.js能完成的事情写到2个文件夹12个文件来完成，大概就是传说中的模块化吧，鬼知道呢？</p>
<h3 id="articleHeader1">关于打包时资源路径的配置</h3>
<p>assetsSubDirectory：资源子目录，指js,css，img存放的目录，其路径相对于index.html<br>比如我将其配置成：assetsSubDirectory：''和assetsSubDirectory：'static',从下面的图，你应该就可以直观感受配置assetsSubDirectory这个路径的区别了。多说一句，此时index.html中js,css的资源路径是这样的：script type=text/javascript src="/static/js/manifest.js?v=8cca728d"&gt;，注意/static/<br><span class="img-wrap"><img data-src="/img/bVSKrg?w=667&amp;h=275" src="https://static.alili.tech/img/bVSKrg?w=667&amp;h=275" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>assetsPublicPath：资源目录，默认是这样配置的assetsPublicPath: '/'，指assetsSubDirectory目录也就是js,css,img等资源相对于服务器host地址，传说中的绝对路径，host是什么,ip地址加端口号，比如<a href="http://192.168.0.102:8089/newB/beaty.img" rel="nofollow noreferrer" target="_blank">http://192.168.0.102:8089/new...</a>，其host指的就是<a href="http://192.168.0.102:8089" rel="nofollow noreferrer" target="_blank">http://192.168.0.102:8089</a>，所以如果你如果和我一样，用的是tomcat服务器，那就会遇到当我们要访问我们的网页时,访问的地址是<a>http://ip:port/projectName/in...</a>一般没有项目会直接用<a>http://ip:port/index.html</a>这个地址。所以像上面提到的js路径地址，这时就会被解析成<a>http://ip:port/static/js/mani...</a>，而正确的的url路径应该是<a>http://ip:port/projectName/st...</a>，所以我们需要将assetsPublicPath: '/'改成assetsPublicPath: '/projectName/'，这样才能保证资源的正确发布。<br><em>坑位提示：</em>自己当时是这样配置的assetsPublicPath: '/projectName'，也就是相对于正确的少了一个'/'，但神奇的是js，css都能打包出正确的路径，自己自动添加了一个'/'，但在一个.vue的template下有一个图片路径被解析成<a>http://ip:port/projectNamesta...</a>，rojectName与static之间少了一个'/'，个人估计是针对于index.html中路径的替换和其他位置的，多了一些容错的处理。</p>
<h3 id="articleHeader2">关于项目，文件，内容hash值</h3>
<p>在webpack打包中，有三类hash值，还是一篇<a href="http://www.cnblogs.com/ihardcoder/p/5623411.html" rel="nofollow noreferrer" target="_blank">好文推荐</a>，分别是：</p>
<p>整个项目编译，产生的hash值，官方js打包也是默认使用这个值,所以你所有的静态文件都用这个打包的话，就会看到打包出的文件含有的hash值一样，见下图</p>
<p>模块文件编译，产生的hash值，所以不同的模块产生的hash值就不一样，见下图</p>
<p><span class="img-wrap"><img data-src="/img/bVSKI8?w=851&amp;h=689" src="https://static.alili.tech/img/bVSKI8?w=851&amp;h=689" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack再入门，说一下那些不入流的知识点

## 原文链接
[https://segmentfault.com/a/1190000010627001](https://segmentfault.com/a/1190000010627001)

