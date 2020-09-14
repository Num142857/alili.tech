---
title: 'V部落博客管理平台开源啦! Vue+SpringBoot强强联合！' 
date: 2018-12-20 2:30:10
hidden: true
slug: 2ympn4us3xd
categories: [reprint]
---

{{< raw >}}

                    
<p>V部落是一个多用户博客管理平台，采用Vue+SpringBoot开发。</p>
<h4>演示地址： <a href="http://45.77.146.32:8081/index.html" rel="nofollow noreferrer" target="_blank">http://45.77.146.32:8081/index.html</a>
</h4>
<h4>项目地址:<a href="https://github.com/lenve/VBlog" rel="nofollow noreferrer" target="_blank">https://github.com/lenve/VBlog</a>
</h4>
<h1 id="articleHeader0">项目效果图</h1>
<h2 id="articleHeader1">登陆页面</h2>
<p><span class="img-wrap"><img data-src="/img/bV00yG?w=1022&amp;h=577" src="https://static.alili.tech/img/bV00yG?w=1022&amp;h=577" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">文章列表</h2>
<p><span class="img-wrap"><img data-src="/img/bV00zv?w=1351&amp;h=641" src="https://static.alili.tech/img/bV00zv?w=1351&amp;h=641" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">发表文章</h2>
<p><span class="img-wrap"><img data-src="/img/bV00yU?w=1338&amp;h=665" src="https://static.alili.tech/img/bV00yU?w=1338&amp;h=665" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">用户管理</h2>
<p><span class="img-wrap"><img data-src="/img/bV00yW?w=1328&amp;h=669" src="https://static.alili.tech/img/bV00yW?w=1328&amp;h=669" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">栏目管理</h2>
<p><span class="img-wrap"><img data-src="/img/bV00yX?w=1352&amp;h=651" src="https://static.alili.tech/img/bV00yX?w=1352&amp;h=651" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">数据统计</h2>
<p><span class="img-wrap"><img data-src="/img/bV00yZ?w=1352&amp;h=651" src="https://static.alili.tech/img/bV00yZ?w=1352&amp;h=651" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">技术栈</h1>
<h2 id="articleHeader8">后端技术栈</h2>
<p>后端主要采用了：  </p>
<p>1.SpringBoot  <br>2.SpringSecurity  <br>3.MyBatis  <br>4.部分接口遵循Restful风格  <br>5.MySQL</p>
<h2 id="articleHeader9">前端技术栈</h2>
<p>前端主要采用了：  </p>
<p>1.Vue  <br>2.axios  <br>3.ElementUI  <br>4.vue-echarts  <br>5.mavon-editor  <br>6.vue-router  </p>
<p>还有其他一些琐碎的技术我就不在这里一一列举了。</p>
<h1 id="articleHeader10">快速运行</h1>
<p>1.克隆本项目到本地</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git@github.com:lenve/VBlog.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">git<span class="hljs-meta">@github</span>.<span class="hljs-string">com:</span>lenve/VBlog.git</code></pre>
<p>2.找到blogserver项目中resources目录下的vueblog.sql文件，在MySQL数据库中执行  <br>3.根据自己本地情况修改数据库配置，数据库配置在SpringBoot项目的application.properties中  <br>4.在IntelliJ IDEA中运行blogserver项目  </p>
<p><strong>OK，至此，服务端就启动成功了，此时我们直接在地址栏输入<code>http://localhost:8081/index.html</code>即可访问我们的项目，如果要做二次开发，请继续看第五、六步。</strong>  </p>
<p>5.进入到vueblog目录中，在控制台依次输入如下命令：</p>
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
<p>由于我在vueblog项目中已经配置了端口转发，将数据转发到SpringBoot上，因此项目启动之后，在浏览器中输入<code>http://localhost:8080</code>就可以访问我们的前端项目了，所有的请求通过端口转发将数据传到SpringBoot中（注意此时不要关闭SpringBoot项目）。  </p>
<p>6.最后可以用WebStorm等工具打开vueblog项目，继续开发，开发完成后，当项目要上线时，依然进入到vueblog目录，然后执行如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>该命令执行成功之后，vueblog目录下生成一个dist文件夹，将该文件夹中的两个文件static和index.html拷贝到SpringBoot项目中resources/static/目录下，然后就可以像第4步那样直接访问了。  </p>
<p><strong>步骤5中需要大家对NodeJS、NPM等有一定的使用经验，不熟悉的小伙伴可以先自行搜索学习下，推荐Vue<a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">官方教程</a>。</strong></p>
<h1 id="articleHeader11">项目依赖</h1>
<p>1.<a href="https://github.com/Justineo/vue-echarts" rel="nofollow noreferrer" target="_blank">vue-echarts</a>  <br>2.<a href="https://github.com/hinesboy/mavonEditor" rel="nofollow noreferrer" target="_blank">mavonEditor</a></p>
<h1 id="articleHeader12">License</h1>
<p>MIT</p>
<p><strong>欢迎小伙伴们star、fork。</strong>  </p>
<p>关注公众号查看更多全栈资料：  </p>
<p><span class="img-wrap"><img data-src="/img/bVUERD?w=258&amp;h=258" src="https://static.alili.tech/img/bVUERD?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
V部落博客管理平台开源啦! Vue+SpringBoot强强联合！

## 原文链接
[https://segmentfault.com/a/1190000012594523](https://segmentfault.com/a/1190000012594523)

