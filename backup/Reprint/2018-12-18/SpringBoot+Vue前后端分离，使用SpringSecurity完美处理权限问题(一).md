---
title: 'SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(一)' 
date: 2018-12-18 2:30:11
hidden: true
slug: bqmuvtzq9dc
categories: [reprint]
---

{{< raw >}}

                    
<p>当前后端分离时，权限问题的处理也和我们传统的处理方式有一点差异。笔者前几天刚好在负责一个项目的权限管理模块，现在权限管理模块已经做完了，我想通过5-6篇文章，来介绍一下项目中遇到的问题以及我的解决方案，希望这个系列能够给小伙伴一些帮助。本系列文章并不是手把手的教程，主要介绍了核心思路并讲解了核心代码，完整的代码小伙伴们可以在GitHub上star并clone下来研究。另外，原本计划把项目跑起来放到网上供小伙伴们查看，但是之前买服务器为了省钱，内存只有512M，两个应用跑不起来(已经有一个<a href="https://github.com/lenve/VBlog" rel="nofollow noreferrer" target="_blank">V部落开源项目</a>在运行)，因此小伙伴们只能将就看一下下面的截图了，文末有部署教程，部署到本地也可以查看完整效果。  </p>
<p>本文我们先不聊具体实现，我先来介绍一下我这个权限管理模块的一个整体架构，以及最终呈现出来的效果。</p>
<h2 id="articleHeader0">数据库设计</h2>
<p>权限数据库主要包含了五张表，分别是资源表、角色表、用户表、资源角色表、用户角色表，数据库关系模型如下：  </p>
<p><span class="img-wrap"><img data-src="/img/bV1CWM?w=874&amp;h=393" src="https://static.alili.tech/img/bV1CWM?w=874&amp;h=393" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>关于这个表，我说如下几点：  </p>
<p>1.hr表是用户表，存放了用户的基本信息。  </p>
<p>2.role是角色表，name字段表示角色的英文名称，按照SpringSecurity的规范，将以<code>ROLE_</code>开始，nameZh字段表示角色的中文名称。  </p>
<p>3.menu表是一个资源表，该表涉及到的字段有点多，由于我的前端采用了Vue来做，因此当用户登录成功之后，系统将根据用户的角色动态加载需要的模块，所有模块的信息将保存在menu表中，menu表中的path、component、iconCls、keepAlive、requireAuth等字段都是Vue-Router中需要的字段，也就是说menu中的数据到时候会以json的形式返回给前端，再由vue动态更新router，menu中还有一个字段url，表示一个url pattern，即路径匹配规则，假设有一个路径匹配规则为<code>/admin/**</code>,那么当用户在客户端发起一个<code>/admin/user</code>的请求，将被<code>/admin/**</code>拦截到，系统再去查看这个规则对应的角色是哪些，然后再去查看该用户是否具备相应的角色，进而判断该请求是否合法。  </p>
<p>下图分别是用户表、角色表以及资源表中的部分数据(数据库脚本可以在文末的项目地址中下载，位置<a href="https://github.com/lenve/vhr/blob/master/hrserver/src/main/resources/vhr.sql" rel="nofollow noreferrer" target="_blank">resources/vhr.sql</a>)：  </p>
<p><span class="img-wrap"><img data-src="/img/bV1CWQ?w=965&amp;h=135" src="https://static.alili.tech/img/bV1CWQ?w=965&amp;h=135" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1CWS?w=302&amp;h=178" src="https://static.alili.tech/img/bV1CWS?w=302&amp;h=178" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1CW2?w=845&amp;h=326" src="https://static.alili.tech/img/bV1CW2?w=845&amp;h=326" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">整体效果</h2>
<p>首先，不同的用户在登录成功之后，根据不同的角色，会看到不同的系统菜单，完整菜单如下：  </p>
<p><span class="img-wrap"><img data-src="/img/bV1CW9?w=1361&amp;h=668" src="https://static.alili.tech/img/bV1CW9?w=1361&amp;h=668" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>不同用户登录上来之后，可能看到的会有差异，如下：  </p>
<p><span class="img-wrap"><img data-src="/img/bV1CXg?w=1363&amp;h=244" src="https://static.alili.tech/img/bV1CXg?w=1363&amp;h=244" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>每个用户的角色是由系统管理员进行分配的，系统管理员给用户分配角色的页面如下：  </p>
<p><span class="img-wrap"><img data-src="/img/bV1CXh?w=1353&amp;h=661" src="https://static.alili.tech/img/bV1CXh?w=1353&amp;h=661" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>系统管理员也可以管理不同角色可以操作的资源，页面如下：  </p>
<p><span class="img-wrap"><img data-src="/img/bV1CXn?w=1352&amp;h=658" src="https://static.alili.tech/img/bV1CXn?w=1352&amp;h=658" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>其他的删除、搜索等一些琐碎的功能我这里就不再一一介绍了。</p>
<h2 id="articleHeader2">项目地址</h2>
<p>由于商业协议，原本的项目不能共享给各位小伙伴，因此我专门做了一个开源项目，这个项目的功能整体来说比较多，但是考虑到这个系列的文章主要是向大家介绍权限管理模块，因此其他模块都被我暂时阉割掉了，不过小伙伴们可以放心，权限管理模块的代码一行都没有删除，涉及到权限管理的代码和数据都是完整的，可以直接运行的。小伙伴将以管理员的身份登录到后台系统，登录成功之后，依次点击<strong>系统管理-&gt;基础信息设置-&gt;权限组</strong>，即可配置不同角色可以操作的资源；然后依次点击<strong>系统管理-&gt;操作员管理</strong>，即可管理每一位操作员的角色。  </p>
<p>项目地址: <a href="https://github.com/lenve/vhr" rel="nofollow noreferrer" target="_blank">https://github.com/lenve/vhr</a></p>
<h2 id="articleHeader3">快速部署</h2>
<p>1.clone项目到本地<code>git@github.com:lenve/vhr.git</code>  </p>
<p>2.数据库脚本放在hrserver项目的resources目录下，在MySQL中执行数据库脚本  </p>
<p>3.数据库配置在hrserver项目的resources目录下的application.properties文件中  </p>
<p>4.在IntelliJ IDEA中运行hrserver项目  </p>
<p><strong>OK，至此，服务端就启动成功了，此时我们直接在地址栏输入<code>http://localhost:8082/index.html</code>即可访问我们的项目，如果要做二次开发，请继续看第五、六步。</strong>  </p>
<p>5.进入到vuehr目录中，在命令行依次输入如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装依赖
npm install

# 在 localhost:8080 启动项目
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment"># 安装依赖</span>
<span class="hljs-built_in">npm</span> install

<span class="hljs-comment"># 在 localhost:8080 启动项目</span>
<span class="hljs-built_in">npm</span> run dev</code></pre>
<p>由于我在vuehr项目中已经配置了端口转发，将数据转发到SpringBoot上，因此项目启动之后，在浏览器中输入<code>http://localhost:8080</code>就可以访问我们的前端项目了，所有的请求通过端口转发将数据传到SpringBoot中（注意此时不要关闭SpringBoot项目）。  </p>
<p>6.最后可以用WebStorm等工具打开vuehr项目，继续开发，开发完成后，当项目要上线时，依然进入到vuehr目录，然后执行如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>该命令执行成功之后，vuehr目录下生成一个dist文件夹，将该文件夹中的两个文件static和index.html拷贝到SpringBoot项目中resources/static/目录下，然后就可以像第4步那样直接访问了。  </p>
<p><strong>步骤5中需要大家对NodeJS、NPM等有一定的使用经验，不熟悉的小伙伴可以先自行搜索学习下，推荐<a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">Vue官方教程</a>。</strong></p>
<h2 id="articleHeader4">注意事项</h2>
<p>再次强调，这只是一个权限管理功能模块，运行后只有权限管理功能是完整的。小伙伴们在本地部署成功之后，可以修改每一个用户的角色以及每一个角色可以操作的资源，修改成功之后，注销登录，再以被修改的用户身份登录，即可看到菜单变化。  </p>
<p>好了，本文我们就先说这么多，从下篇文章开始，我会和小伙伴分享这个效果实现的核心思路，欢迎小伙伴们持续关注。  </p>
<p>关注公众号，可以及时接收到最新文章:  </p>
<p><span class="img-wrap"><img data-src="/img/bVUERD?w=258&amp;h=258" src="https://static.alili.tech/img/bVUERD?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(一)

## 原文链接
[https://segmentfault.com/a/1190000012742102](https://segmentfault.com/a/1190000012742102)

