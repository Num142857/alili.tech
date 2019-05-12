---
title: 'Tomcat+Servlet面试题都在这里' 
date: 2018-12-14 2:30:11
hidden: true
slug: sp8vnwwos1p
categories: [reprint]
---

{{< raw >}}

                    
<p>下面是我整理下来的Servlet知识点:</p>
<p><span class="img-wrap"><img data-src="/img/bV3c9e" src="https://static.alili.tech/img/bV3c9e" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>￼</p>
<p><strong>图上的知识点都可以在我其他的文章内找到相应内容。</strong></p>
<h1 id="articleHeader0">Tomcat常见面试题</h1>
<h2 id="articleHeader1">Tomcat的缺省端口是多少，怎么修改</h2>
<blockquote>Tomcat的缺省端口是多少，怎么修改</blockquote>
<ol>
<li>找到Tomcat目录下的conf文件夹</li>
<li>进入conf文件夹里面找到server.xml文件</li>
<li>打开server.xml文件</li>
<li>在server.xml文件里面找到下列信息</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <Service name=&quot;Catalina&quot;>
  

    <Connector port=&quot;8080&quot; protocol=&quot;HTTP/1.1&quot; 
               connectionTimeout=&quot;20000&quot; 
               redirectPort=&quot;8443&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">Service</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"Catalina"</span>&gt;</span>
  

    <span class="hljs-tag">&lt;<span class="hljs-name">Connector</span> <span class="hljs-attr">port</span>=<span class="hljs-string">"8080"</span> <span class="hljs-attr">protocol</span>=<span class="hljs-string">"HTTP/1.1"</span> 
               <span class="hljs-attr">connectionTimeout</span>=<span class="hljs-string">"20000"</span> 
               <span class="hljs-attr">redirectPort</span>=<span class="hljs-string">"8443"</span> /&gt;</span></code></pre>
<ol>
<li>把port=”8080″改成port=”8888″，并且保存</li>
<li>启动Tomcat，并且在IE浏览器里面的地址栏输入<a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:8888/</li>
</ol>
<p><strong>到tomcat主目录下的conf/server.xml文件中修改</strong>,把8080端口改成是8088或者是其他的<br><span class="img-wrap"><img data-src="http://i.imgur.com/TGhqQ9r.png" src="https://static.alili.techhttp://i.imgur.com/TGhqQ9r.png" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">Tomcat 有哪几种Connector 运行模式(优化)？</h2>
<blockquote>tomcat 有哪几种Connector 运行模式(优化)？</blockquote>
<ol>
<li>bio(blocking I/O)</li>
<li>nio(non-blocking I/O)</li>
<li>apr(Apache Portable Runtime/Apache可移植运行库)</li>
</ol>
<p>相关解释:</p>
<ul>
<li>bio: <strong>传统的Java I/O操作，同步且阻塞IO。</strong>
</li>
<li>nio: <strong>JDK1.4开始支持，同步阻塞或同步非阻塞IO</strong>
</li>
<li>aio(nio.2): <strong>JDK7开始支持，异步非阻塞IO</strong>
</li>
<li>apr: Tomcat将以JNI的形式调用Apache HTTP服务器的核心动态链接库来处理文件读取或网络传输操作，从而大大地 <strong>提高Tomcat对静态文件的处理性能</strong>
</li>
</ul>
<p>下面是<strong>配置Tomcat运行模式改成是NIO模式，并配置连接池相关参数来进行优化</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!--
    <Connector port=&quot;8080&quot; protocol=&quot;HTTP/1.1&quot;
               connectionTimeout=&quot;20000&quot;
               redirectPort=&quot;8443&quot; />
    -->
    <!-- protocol 启用 nio模式，(tomcat8默认使用的是nio)(apr模式利用系统级异步io) -->
    <!-- minProcessors最小空闲连接线程数-->
    <!-- maxProcessors最大连接线程数-->
    <!-- acceptCount允许的最大连接数，应大于等于maxProcessors-->
    <!-- enableLookups 如果为true,requst.getRemoteHost会执行DNS查找，反向解析ip对应域名或主机名-->
    <Connector port=&quot;8080&quot; protocol=&quot;org.apache.coyote.http11.Http11NioProtocol&quot; 
        connectionTimeout=&quot;20000&quot;
        redirectPort=&quot;8443

        maxThreads=“500” 
        minSpareThreads=“100” 
        maxSpareThreads=“200”
        acceptCount=&quot;200&quot;
        enableLookups=&quot;false&quot;       
    />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml">    <span class="hljs-comment">&lt;!--
    &lt;Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" /&gt;
    --&gt;</span>
    <span class="hljs-comment">&lt;!-- protocol 启用 nio模式，(tomcat8默认使用的是nio)(apr模式利用系统级异步io) --&gt;</span>
    <span class="hljs-comment">&lt;!-- minProcessors最小空闲连接线程数--&gt;</span>
    <span class="hljs-comment">&lt;!-- maxProcessors最大连接线程数--&gt;</span>
    <span class="hljs-comment">&lt;!-- acceptCount允许的最大连接数，应大于等于maxProcessors--&gt;</span>
    <span class="hljs-comment">&lt;!-- enableLookups 如果为true,requst.getRemoteHost会执行DNS查找，反向解析ip对应域名或主机名--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Connector</span> <span class="hljs-attr">port</span>=<span class="hljs-string">"8080"</span> <span class="hljs-attr">protocol</span>=<span class="hljs-string">"org.apache.coyote.http11.Http11NioProtocol"</span> 
        <span class="hljs-attr">connectionTimeout</span>=<span class="hljs-string">"20000"</span>
        <span class="hljs-attr">redirectPort</span>=<span class="hljs-string">"8443

        maxThreads=“500” 
        minSpareThreads=“100” 
        maxSpareThreads=“200”
        acceptCount="</span><span class="hljs-attr">200</span>"
        <span class="hljs-attr">enableLookups</span>=<span class="hljs-string">"false"</span>       
    /&gt;</span>
</code></pre>
<p>apr模式启动起来是比较复杂的，详情可参考:<a href="http://blog.csdn.net/wanglei_storage/article/details/50225779" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/wanglei_storage/article/details/50225779</a></p>
<p>对于bio,nio,nio.2的理解可参考:<a href="http://blog.csdn.net/itismelzp/article/details/50886009" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/itismelzp/article/details/50886009</a></p>
<h2 id="articleHeader3">Tomcat有几种部署方式</h2>
<ol>
<li>直接把Web项目放在webapps下，Tomcat会自动将其部署</li>
<li>在server.xml文件上配置<code>&lt;Context&gt;</code>节点，设置相关的属性即可</li>
<li>通过Catalina来进行配置:进入到confCatalinalocalhost文件下，创建一个xml文件，该文件的名字就是站点的名字。编写XML的方式来进行设置。</li>
</ol>
<h3 id="articleHeader4">部署方式第二点：</h3>
<ul><li>在其他盘符下创建一个web站点目录，并创建WEB-INF目录和一个html文件。</li></ul>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/soEm66y.png" src="https://static.alili.techhttp://i.imgur.com/soEm66y.png" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>找到Tomcat目录下/conf/server.xml文件</li></ul>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/EKCpTZZ.png" src="https://static.alili.techhttp://i.imgur.com/EKCpTZZ.png" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>在server.xml中的&lt;Host&gt;节点下添加如下代码。<strong>path表示的是访问时输入的web项目名，docBase表示的是站点目录的绝对路径</strong>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
        <Context path=&quot;/web1&quot; docBase=&quot;D:\web1&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
        <span class="hljs-tag">&lt;<span class="hljs-name">Context</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/web1"</span> <span class="hljs-attr">docBase</span>=<span class="hljs-string">"D:\web1"</span>/&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/kKI4C9d.png" src="https://static.alili.techhttp://i.imgur.com/kKI4C9d.png" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>访问配置好的web站点</li></ul>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/z1cqe2G.png" src="https://static.alili.techhttp://i.imgur.com/z1cqe2G.png" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<h3 id="articleHeader5">部署方式第三点：</h3>
<ul><li>进入到confCatalinalocalhost文件下，创建一个xml文件，<strong>该文件的名字就是站点的名字。</strong>
</li></ul>
<p><span class="img-wrap"><img data-src="http://img.blog.csdn.net/20170114100701752?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaG9uXzN5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" src="https://static.alili.techhttp://img.blog.csdn.net/20170114100701752?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaG9uXzN5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<ul><li>xml文件的代码如下，<strong>docBase是你web站点的绝对路径</strong>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?> 
<Context 
    docBase=&quot;D:\web1&quot; 
    reloadable=&quot;true&quot;> 
</Context> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?</span>xml version=<span class="hljs-string">"1.0"</span> encoding=<span class="hljs-string">"UTF-8"</span><span class="hljs-meta">?&gt;</span></span> 
<span class="hljs-tag">&lt;<span class="hljs-name">Context</span> 
    <span class="hljs-attr">docBase</span>=<span class="hljs-string">"D:\web1"</span> 
    <span class="hljs-attr">reloadable</span>=<span class="hljs-string">"true"</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">Context</span>&gt;</span> </code></pre>
<ul><li>访问web站点下的html资源</li></ul>
<p><span class="img-wrap"><img data-src="http://img.blog.csdn.net/20170114104403810?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaG9uXzN5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" src="https://static.alili.techhttp://img.blog.csdn.net/20170114104403810?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaG9uXzN5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader6">Servlet面试题</h1>
<h2 id="articleHeader7">Servlet生命周期</h2>
<blockquote>Servlet生命周期?</blockquote>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/bhBdx7o.png" src="https://static.alili.techhttp://i.imgur.com/bhBdx7o.png" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>
<strong>第一次访问</strong>Servlet，我们发现<strong>init()和service()都被调用了</strong>
</li></ul>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/n12sYq6.png" src="https://static.alili.techhttp://i.imgur.com/n12sYq6.png" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>
<strong>第二次访问</strong>Servlet，<strong>service()被调用了</strong>
</li></ul>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/OK1RwD7.png" src="https://static.alili.techhttp://i.imgur.com/OK1RwD7.png" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>第三次访问Servlet，<strong>还是service()被调用了</strong>
</li></ul>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/OK1RwD7.png" src="https://static.alili.techhttp://i.imgur.com/OK1RwD7.png" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>当我们<strong>关闭Tomcat服务器</strong>的时候，<strong>destroy()被调用了！</strong>
</li></ul>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/XlgUU9E.png" src="https://static.alili.techhttp://i.imgur.com/XlgUU9E.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>Servlet生命周期可分为5个步骤</p>
<ol>
<li>
<strong>加载Servlet</strong>。当Tomcat第一次访问Servlet的时候，<strong>Tomcat会负责创建Servlet的实例</strong>
</li>
<li>
<strong>初始化</strong>。当Servlet被实例化后，Tomcat会<strong>调用init()方法初始化这个对象</strong>
</li>
<li>
<strong>处理服务</strong>。当浏览器<strong>访问Servlet</strong>的时候，Servlet <strong>会调用service()方法处理请求</strong>
</li>
<li>
<strong>销毁</strong>。当Tomcat关闭时或者检测到Servlet要从Tomcat删除的时候会自动调用destroy()方法，<strong>让该实例释放掉所占的资源</strong>。一个Servlet如果长时间不被使用的话，也会被Tomcat自动销毁</li>
<li>
<strong>卸载</strong>。当Servlet调用完destroy()方法后，等待垃圾回收。如果<strong>有需要再次使用这个Servlet，会重新调用init()方法进行初始化操作</strong>。</li>
</ol>
<ul><li>简单总结：<strong>只要访问Servlet，service()就会被调用。init()只有第一次访问Servlet的时候才会被调用。destroy()只有在Tomcat关闭的时候才会被调用。</strong>
</li></ul>
<h2 id="articleHeader8">get方式和post方式有何区别</h2>
<p>2018年9月14日12:15:12更新：下面的区别主要在HTML/浏览器的环境下讨论(因为HTTP协议的使用不单单只有浏览器能用)</p>
<p>参考资料：</p>
<ul>
<li><a href="http://www.nowamagic.net/librarys/veda/detail/1919" rel="nofollow noreferrer" target="_blank">http://www.nowamagic.net/libr...</a></li>
<li><a href="http://www.cnblogs.com/hyddd/archive/2009/03/31/1426026.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/hyddd/...</a></li>
</ul>
<blockquote>get方式和post方式有何区别</blockquote>
<p>数据携带上:</p>
<ul>
<li>GET方式：在URL地址后附带的参数是有限制的，其数据容量通常不能超过1K。</li>
<li>POST方式：可以在请求的实体内容中向服务器发送数据，传送的数据量无限制。</li>
</ul>
<p>请求参数的位置上:</p>
<ul>
<li>GET方式：请求参数放在URL地址后面，以?的方式来进行拼接</li>
<li>POST方式:请求参数放在HTTP请求包中</li>
</ul>
<p>用途上:</p>
<ul>
<li>GET方式一般用来获取数据</li>
<li>
<p>POST方式一般用来提交数据</p>
<ul><li>
<p>原因:</p>
<ul>
<li>首先是因为GET方式携带的数据量比较小，无法带过去很大的数量</li>
<li>POST方式提交的参数后台更加容易解析(使用POST方式提交的中文数据，后台也更加容易解决)</li>
<li>GET方式比POST方式要快</li>
</ul>
</li></ul>
</li>
</ul>
<p>GET方式比POST方式要快，详情可看:<a href="https://www.cnblogs.com/strayling/p/3580048.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/strayling/p/3580048.html</a></p>
<h2 id="articleHeader9">Servlet相关 API</h2>
<blockquote>doGet与doPost方法的两个参数是什么</blockquote>
<ol>
<li>HttpServletRequest：封装了与请求相关的信息</li>
<li>HttpServletResponse：封装了与响应相关的信息<p><span class="img-wrap"><img data-src="http://i.imgur.com/Szu07ky.png" src="https://static.alili.techhttp://i.imgur.com/Szu07ky.png" alt="" title="" style="cursor: pointer;"></span></p>
</li>
</ol>
<blockquote>获取页面的元素的值有几种方式，分别说一下</blockquote>
<ol>
<li>request.getParameter() 返回客户端的请求参数的值</li>
<li>request.getParameterNames() 返回所有可用属性名的枚举</li>
<li>request.getParameterValues() 返回包含参数的所有值的数组</li>
</ol>
<blockquote>request.getAttribute()和request.getParameter()区别</blockquote>
<p>用途上:</p>
<ul>
<li>request.getAttribute()， <strong>一般用于获取request域对象的数据</strong>(在跳转之前把数据使用setAttribute来放到request对象上)</li>
<li>request.getParameter()， <strong>一般用于获取客户端提交的参数</strong>
</li>
</ul>
<p>存储数据上:</p>
<ul>
<li>request.getAttribute()可以获取Objcet对象</li>
<li>request.getParameter()只能获取字符串(这也是为什么它一般用于获取客户端提交的参数)</li>
</ul>
<h2 id="articleHeader10">forward和redirect的区别</h2>
<blockquote>forward和redirect的区别</blockquote>
<ul>
<li><p><strong>实际发生位置不同，地址栏不同</strong></p></li>
<li><ul><li>
<p>转发是发生在服务器的</p>
<ul><li>
<strong>转发是由服务器进行跳转的</strong>，细心的朋友会发现，在转发的时候，<strong>浏览器的地址栏是没有发生变化的</strong>，在我访问Servlet111的时候，即使跳转到了Servlet222的页面，浏览器的地址还是Servlet111的。也就是说<strong>浏览器是不知道该跳转的动作，转发是对浏览器透明的</strong>。通过上面的转发时序图我们也可以发现，<strong>实现转发只是一次的http请求</strong>，<strong>一次转发中request和response对象都是同一个</strong>。这也解释了，为什么可以使用<strong>request作为域对象进行Servlet之间的通讯。</strong>
</li></ul>
</li></ul></li>
<ul><li>
<p>重定向是发生在浏览器的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" - **重定向是由浏览器进行跳转的**，进行重定向跳转的时候，**浏览器的地址会发生变化的**。曾经介绍过：实现重定向的原理是由response的状态码和Location头组合而实现的。**这是由浏览器进行的页面跳转**实现重定向**会发出两个http请求**，**request域对象是无效的，因为它不是同一个request对象**" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"> - <span class="hljs-strong">**重定向是由浏览器进行跳转的**</span>，进行重定向跳转的时候，<span class="hljs-strong">**浏览器的地址会发生变化的**</span>。曾经介绍过：实现重定向的原理是由response的状态码和Location头组合而实现的。<span class="hljs-strong">**这是由浏览器进行的页面跳转**</span>实现重定向<span class="hljs-strong">**会发出两个http请求**</span>，<span class="hljs-strong">**request域对象是无效的，因为它不是同一个request对象**</span></code></pre>
</li></ul>
<li>
<p><strong>用法不同:</strong></p>
<ul><li>
<p>很多人都搞不清楚转发和重定向的时候，<strong>资源地址究竟怎么写</strong>。有的时候要把应用名写上，有的时候不用把应用名写上。很容易把人搞晕。记住一个原则： <strong>给服务器用的直接从资源名开始写，给浏览器用的要把应用名写上</strong></p>
<ul>
<li>
<p>request.getRequestDispatcher("/资源名 URI").forward(request,response)</p>
<ul><li><strong>转发时"/"代表的是本应用程序的根目录【zhongfucheng】</strong></li></ul>
</li>
<li>
<p>response.send("/web应用/资源名 URI");</p>
<ul><li><strong>重定向时"/"代表的是webapps目录</strong></li></ul>
</li>
</ul>
</li></ul>
</li>
<li>
<p><strong>能够去往的URL的范围不一样:</strong></p>
<ul>
<li><strong>转发是服务器跳转只能去往当前web应用的资源</strong></li>
<li><strong>重定向是服务器跳转，可以去往任何的资源</strong></li>
</ul>
</li>
<li>
<p><strong>传递数据的类型不同</strong></p>
<ul>
<li><strong>转发的request对象可以传递各种类型的数据，包括对象</strong></li>
<li><strong>重定向只能传递字符串</strong></li>
</ul>
</li>
<li>
<p><strong>跳转的时间不同</strong></p>
<ul>
<li><strong>转发时：执行到跳转语句时就会立刻跳转</strong></li>
<li><strong>重定向：整个页面执行完之后才执行跳转</strong></li>
</ul>
</li>
</ul>
<p>那么转发(forward)和重定向(redirect)使用哪一个？</p>
<ul><li>根据上面说明了转发和重定向的区别也可以很容易概括出来<strong>。转发是带着转发前的请求的参数的。重定向是新的请求</strong>。</li></ul>
<p>典型的应用场景：</p>
<ol>
<li>转发: 访问 Servlet 处理业务逻辑，然后 forward 到 jsp 显示处理结果，浏览器里 URL 不变</li>
<li>重定向: 提交表单，处理成功后 redirect 到另一个 jsp，防止表单重复提交，浏览器里 URL 变了</li>
</ol>
<h2 id="articleHeader11">tomcat容器是如何创建servlet类实例？用到了什么原理？</h2>
<blockquote>tomcat容器是如何创建servlet类实例？用到了什么原理</blockquote>
<ol>
<li>当容器启动时，会读取在webapps目录下所有的web应用中的web.xml文件，然后对 <strong>xml文件进行解析，并读取servlet注册信息</strong>。然后，将每个应用中注册的servlet类都进行加载，并通过 <strong>反射的方式实例化</strong>。（有时候也是在第一次请求时实例化）</li>
<li>在servlet注册时加上&lt;load-on-startup&gt;1&lt;/load-on-startup&gt;如果为正数，则在一开始就实例化，如果不写或为负数，则第一次请求实例化。</li>
</ol>
<h2 id="articleHeader12">什么是cookie？Session和cookie有什么区别？</h2>
<blockquote>什么是cookie？</blockquote>
<p>Cookie是由W3C组织提出，最早由netscape社区发展的一种机制</p>
<ul>
<li>网页之间的<strong>交互是通过HTTP协议传输数据的，</strong>而Http协议是<strong>无状态的协议</strong>。无状态的协议是什么意思呢？<strong>一旦数据提交完后，浏览器和服务器的连接就会关闭，再次交互的时候需要重新建立新的连接</strong>。</li>
<li>服务器无法确认用户的信息，于是乎，W3C就提出了：<strong>给每一个用户都发一个通行证，无论谁访问的时候都需要携带通行证，这样服务器就可以从通行证上确认用户的信息</strong>。通行证就是Cookie</li>
</ul>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/vOL7GsZ.png" src="https://static.alili.techhttp://i.imgur.com/vOL7GsZ.png" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>Session和cookie有什么区别？</blockquote>
<ul>
<li>
<p><strong>从存储方式上比较</strong></p>
<ul>
<li>Cookie只能存储字符串，如果要存储非ASCII字符串还要对其编码。</li>
<li>Session可以存储任何类型的数据，可以把Session看成是一个容器</li>
</ul>
</li>
<li>
<p><strong>从隐私安全上比较</strong></p>
<ul>
<li>
<strong>Cookie存储在浏览器中，对客户端是可见的</strong>。信息容易泄露出去。如果使用Cookie，最好将Cookie加密</li>
<li>
<strong>Session存储在服务器上，对客户端是透明的</strong>。不存在敏感信息泄露问题。</li>
</ul>
</li>
<li>
<p><strong>从有效期上比较</strong></p>
<ul>
<li>Cookie保存在硬盘中，只需要设置maxAge属性为比较大的正整数，即使关闭浏览器，Cookie还是存在的</li>
<li><strong>Session的保存在服务器中，设置maxInactiveInterval属性值来确定Session的有效期。并且Session依赖于名为JSESSIONID的Cookie，该Cookie默认的maxAge属性为-1。如果关闭了浏览器，该Session虽然没有从服务器中消亡，但也就失效了。</strong></li>
</ul>
</li>
<li>
<p><strong>从对服务器的负担比较</strong></p>
<ul>
<li>Session是保存在服务器的，每个用户都会产生一个Session，如果是并发访问的用户非常多，是不能使用Session的，Session会消耗大量的内存。</li>
<li>Cookie是保存在客户端的。不占用服务器的资源。像baidu、Sina这样的大型网站，一般都是使用Cookie来进行会话跟踪。</li>
</ul>
</li>
<li>
<p><strong>从浏览器的支持上比较</strong></p>
<ul>
<li>如果浏览器禁用了Cookie，那么Cookie是无用的了！</li>
<li>如果浏览器禁用了Cookie，Session可以通过URL地址重写来进行会话跟踪。</li>
</ul>
</li>
<li>
<p><strong>从跨域名上比较</strong></p>
<ul>
<li>Cookie可以设置domain属性来实现跨域名</li>
<li>Session只在当前的域名内有效，不可夸域名</li>
</ul>
</li>
</ul>
<h2 id="articleHeader13">Servlet安全性问题</h2>
<p>由于Servlet是单例的，当多个用户访问Servlet的时候，<strong>服务器会为每个用户创建一个线程</strong>。<strong>当多个用户并发访问Servlet共享资源的时候就会出现线程安全问题</strong>。</p>
<p>原则：</p>
<ol>
<li>如果一个<strong>变量需要多个用户共享</strong>，则应当在访问该变量的时候，<strong>加同步机制synchronized (对象){}</strong>
</li>
<li>如果一个变量<strong>不需要共享</strong>，则<strong>直接在 doGet() 或者 doPost()定义</strong>.这样不会存在线程安全问题</li>
</ol>
<blockquote>如果文章有错的地方欢迎指正，大家互相交流。习惯在微信看技术文章的同学，可以关注微信公众号:Java3y</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Tomcat+Servlet面试题都在这里

## 原文链接
[https://segmentfault.com/a/1190000013119518](https://segmentfault.com/a/1190000013119518)

