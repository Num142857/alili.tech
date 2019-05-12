---
title: 'Jenkins实现前端项目自动化集成打包部署' 
date: 2019-01-01 2:30:07
hidden: true
slug: zmprp5g14of
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://yezihaohao.github.io/2017/09/09/Jenkins%E5%AE%9E%E7%8E%B0%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E8%87%AA%E5%8A%A8%E5%8C%96%E9%9B%86%E6%88%90%E6%89%93%E5%8C%85%E9%83%A8%E7%BD%B2/" rel="nofollow noreferrer" target="_blank">原博客地址:https://yezihaohao.github.io/2017/09/09/Jenkins实现前端项目自动化集成打包部署/</a><br><a href="https://juejin.im/entry/59b40bd36fb9a00a5474c3c7" rel="nofollow noreferrer" target="_blank">掘金地址:https://juejin.im/entry/59b40bd36fb9a00a5474c3c7</a></p>
<h3 id="articleHeader0">前言</h3>
<blockquote>
<p>以前写前端项目打包部署，都是手动运行命令，打包完，然后压缩，再上传到服务器解压。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这种方式确实有点low并且效率也不高。
自从用了Jenkins持续集成工具，写前端项目越来越工程化，再也不用担心忘记部署项目，也不用烦躁每次打包压缩后还要部署多个服务器和环境，更开心的是每次家里写完代码，不用远程公司部署项目，提交代码后自动会为你部署。
本文基于React的前端项目和GitLab的代码仓库以及Windows(其他系统平台大同小异)，简述Jenkins实现自动部署的配置。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>这种方式确实有点low并且效率也不高。
自从用了<span class="hljs-keyword">Jenkins持续集成工具，写前端项目越来越工程化，再也不用担心忘记部署项目，也不用烦躁每次打包压缩后还要部署多个服务器和环境，更开心的是每次家里写完代码，不用远程公司部署项目，提交代码后自动会为你部署。
</span>本文基于React的前端项目和GitLab的代码仓库以及Windows(其他系统平台大同小异)，简述<span class="hljs-keyword">Jenkins实现自动部署的配置。
</span></code></pre>
</blockquote>
<h3 id="articleHeader1">安装Jenkins</h3>
<p>前提：已配置好java环境</p>
<h4>1.下载对应的安装程序<a href="https://jenkins.io/download/" rel="nofollow noreferrer" target="_blank">点我进入下载网站</a>或直接<a href="http://mirrors.jenkins.io/war-stable/latest/jenkins.war" rel="nofollow noreferrer" target="_blank">下载war包</a>
</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011121775" src="https://static.alili.tech/img/remote/1460000011121775" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>2.根据提示安装完成（默认端口是8080）</h4>
<p>war包启动方式： java -jar jenkins.war --httpPort=8080（端口自定义），然后访问<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a></p>
<h4>3.查看插件</h4>
<p>点开系统设置的插件管理页面，如果可选插件列表为空，点击高级标签页，替换升级站点的URL为：<a href="http://mirror.xmission.com/jenkins/updates/update-center.json" rel="nofollow noreferrer" target="_blank">http://mirror.xmission.com/je...</a><br>并且点击提交和立即获取<br><span class="img-wrap"><img data-src="/img/remote/1460000011121776" src="https://static.alili.tech/img/remote/1460000011121776" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>4.返回可选插件，选择如下插件安装（如果已安装，请忽略）</h4>
<p>1.Publish Over SSH<br>2.GitLab Plugin<br>3.Email Extension Plugin</p>
<h3 id="articleHeader2">提前设置配置</h3>
<p>为了方便新建任务，所以先将一些设置配置好，进入系统管理系统设置。</p>
<h4>1.配置Publish over SSH</h4>
<p>在Publish over SSH处点击增加，添加SSH server，并且选择高级设置，设置相应的ip,用户名和密码等。（其他选项可不用管）<br><span class="img-wrap"><img data-src="/img/remote/1460000011121777" src="https://static.alili.tech/img/remote/1460000011121777" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>2.配置邮件通知，可通过勾选发送邮件测试是否配置成功</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011121778" src="https://static.alili.tech/img/remote/1460000011121778" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">新建任务</h3>
<h4>1.点击新建，输入名称，选择自由风格的项目</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011121779" src="https://static.alili.tech/img/remote/1460000011121779" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>2.配置源码</h4>
<p>选择Git，并填上gitlab项目克隆地址，用户密钥以及分支<br><span class="img-wrap"><img data-src="/img/remote/1460000011121780" src="https://static.alili.tech/img/remote/1460000011121780" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>3.配置构建触发器</h4>
<p>勾选Poll SCM即可，其他可忽略，默认提交代码到相应的分支触发该任务<br><span class="img-wrap"><img data-src="/img/remote/1460000011121781" src="https://static.alili.tech/img/remote/1460000011121781" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>4.配置构建</h4>
<p>增加构建步骤选择Execute shell<br><span class="img-wrap"><img data-src="/img/remote/1460000011121782" src="https://static.alili.tech/img/remote/1460000011121782" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>5.配置构建后操作</h4>
<p>增加构建后操作，选择Send build artifacts over SSH。即上述操作全部完成并自动生产了部署文件，该步骤将部署文件上传到之前的SSH服务器（Linux服务器），并执行你想让他执行的命名，部署多个服务器及平台，选择添加server并完成相应的配置<br><span class="img-wrap"><img data-src="/img/remote/1460000011121783" src="https://static.alili.tech/img/remote/1460000011121783" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span><br>配置后再增加构建后操作，选择Editable Email Notification。根据提示配置需要通知的邮箱，其他可默认。然后选择高级设置，配置失败和成功邮件通知。<br><span class="img-wrap"><img data-src="/img/remote/1460000011121784" src="https://static.alili.tech/img/remote/1460000011121784" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">绑定GitLab Web hooks</h3>
<p>添加web hook. <a href="http://jenkins-server/gitlab/notify_commit" rel="nofollow noreferrer" target="_blank">http://jenkins-server/gitlab/...</a>  需要填上的固定格式的URL地址，把jenkins-server替换成对应的Jenkins访问地址，注意：如果是localhost，需要换成ip地址。<br>添加完之后，点击Test Hook。此时Jenkins界面构建队列出现某个任务正在执行，表示配置成功。<br><span class="img-wrap"><img data-src="/img/remote/1460000011121785" src="https://static.alili.tech/img/remote/1460000011121785" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">验证提交代码，成功自动打包部署</h3>
<p>提交代码，观察Jenkins界面，出现构建任务，构建完成之后收到邮件通知。<br><span class="img-wrap"><img data-src="/img/remote/1460000011121786" src="https://static.alili.tech/img/remote/1460000011121786" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>最后，推荐给大家前端交流QQ群：264591039。欢迎来这里和大家一起畅聊大前端的一切~</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Jenkins实现前端项目自动化集成打包部署

## 原文链接
[https://segmentfault.com/a/1190000011121770](https://segmentfault.com/a/1190000011121770)

