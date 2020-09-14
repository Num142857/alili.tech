---
title: '使用 Docker 搭建前端 Java 开发环境' 
date: 2019-02-04 2:30:58
hidden: true
slug: jyykqlyvr7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>这篇文章是为了解决前后端开发没有彻底分离的坑，因为我司用的是java，入职第一天就是搭建本地开发环境，看见了多年不见的eclipse的图标出现我的电脑上，我是难过的。后来知道并不是我一个人有此感受。依稀记得有个同学整整一天项目都没跑起来的崩溃感。为了解决这个问题我们尝试了很多方案，但是大大小小都有许多坑。<br>直到有一天....我坐在地铁上，看着对面的妹子发呆，忽然一道闪电滑过，地铁突然停了！<br>为什么我突然想不起当天那个妹子长什么样子了~好惆怅。</p></blockquote>
<h2 id="articleHeader0">解决的痛点</h2>
<ol>
<li><p>免搭建后端开发环境。</p></li>
<li><p>开发环境改变只需要改变镜像就能同步更新。</p></li>
<li><p>不需要eclipse等IDE工具。</p></li>
<li><p>切换开发项目</p></li>
</ol>
<h2 id="articleHeader1">解决思路</h2>
<p>利用docker启动Ubuntu镜像，在容器中搭建好项目需要的开发环境，使用挂载卷将本地代码挂载到容器中，使用容器中的环境编译运行代码，宿主机通过 docker 暴漏出的端口访问容器中的服务，这样前端的开发机上就只需要部署docker就搞定了。</p>
<h2 id="articleHeader2">关于docker</h2>
<h3 id="articleHeader3">了解docker</h3>
<p>本文并不打算细讲<code>docker</code>的知识，相关的文章有很多，如果有兴趣可以看 <a href="https://yeasy.gitbooks.io/docker_practice/content/" rel="nofollow noreferrer" target="_blank">这本书</a>，对于docker的使用我也仅限于此工具的开发，如果有不对的地方还有大家指出来。</p>
<h3 id="articleHeader4">加速器</h3>
<p><a href="http://docs.daocloud.io/faq/what-is-daocloud-accelerator" rel="nofollow noreferrer" target="_blank">daocloud 加速器</a></p>
<h2 id="articleHeader5">搭建环境</h2>
<p>下载和安装好docker之后我们就可以开始了，我们下面讲的都是java，不过其他环境同理。</p>
<h3 id="articleHeader6">获取 Ubuntu 镜像。</h3>
<p><code>docker pull ubuntu</code></p>
<p>完成后执行 <code>docker images</code> 就能看到一个刚刚更新的镜像了。</p>
<h3 id="articleHeader7">进入容器</h3>
<p><code>docker run -it ubuntu</code></p>
<h3 id="articleHeader8">安装软件、配置环境变量</h3>
<p>首先更新apt-get<br><code>apt-get update</code> </p>
<p>接下来就可以使用 <code>apt-get install *</code> 安装你需要的软件了，如果没有就下载安装包自行安装，同时配置好环境变量，这里就不赘述了。</p>
<h3 id="articleHeader9">启动服务</h3>
<p>进入tomcat目录，启动服务，在浏览器打开 <code>0.0.0.0:8080</code>, 如果没有错的话你会看到该服务器无法访问。这是因为我们刚才启动的服务是在docker内，如果不做一些操作的话我们是无法访问到docker内部的服务的。</p>
<p>所以，我们先退出容器</p>
<p><code>exit</code></p>
<p>退出之后执行 <code>docker ps -a</code>，就能看到我们刚才的容器依然还在，可能大多刚接触docker的人都会犯这个错误，以为退出容器之后容器就销毁了，其实不然。</p>
<p>如果我们想再进入这个容器可以执行下面的命令，容器ID请复制自己的。<br><code>docker exec -it 容器ID  bash</code></p>
<p>虽然容器还在运行，但是他并没有持久化，为了防止万一，在我们修改容器里面的内容之后尽快持久化。</p>
<p><code>docker commit 容器ID java</code></p>
<p>这个命令的意思是将我们容器持久化为一个新的镜像，名字叫java。</p>
<p>启动这个新建的镜像。</p>
<p><code>docker run -it -p 8080:8080 java</code></p>
<p>注意看我们的启动命令发生了变化，多了一个 <code>-P</code> 这个命令的意思是将容器内的 <code>8080</code> 端口暴漏到宿主机上。</p>
<p>再次访问 <code>0.0.0.0:8080</code>，我们就能看到那只小花猫了，真可爱。</p>
<p>刚才那个容器还在占用我们的内存怎么办，干掉他。</p>
<p><code>docker rm 容器ID</code></p>
<p>至此我们的第一步已经完成了，接下来我们就要集成我们的代码了。</p>
<h2 id="articleHeader10">集成代码</h2>
<p>我们刚才启动的容器是一个完全的独立的黑盒子，它根本不知道我们的代码再哪里，所以我们就要使用docker的挂载卷让宿主机和容器可以共享目录。</p>
<p>不好意思，我们又要干掉刚才启动的那个容器了。</p>
<p><code>docker run -it -v /Users/name/web:/opt/root -p 8080:8080 java</code></p>
<p>我们的启动命令又加入了新成员 <code>-v</code>。这个命令的意思就是将用户根目录下的 <code>web</code> 目录挂在到容器中 <code>/opt/root</code> 目录下。</p>
<p>进入目录后我们就能发现web目录下的文件静静的躺在里面，像是沉睡多年的玛丽苏在等待你的呼唤。</p>
<p>开始呼唤吧。</p>
<p><code>mvn clean install -U -Plocal -DskipTests</code></p>
<p>一段时间过后我们就会看到打包成功的提示，将war包copy到 tomcat webapps 目录下，就能访问你的项目了。</p>
<p>至此我们的项目终于跑起来了，但是有几个问题。</p>
<ol>
<li><p>每次都要跑这么长的命令？好麻烦。</p></li>
<li><p>每次改代码都要重新打包，时间很长。</p></li>
<li><p>启动日志怎么看？报错了怎么办？</p></li>
<li><p>怎么修改前端模板文件不需要重启服务？</p></li>
</ol>
<p>基于这些问题，我们就需要写一个脚本来解决了。</p>
<h2 id="articleHeader11">shell脚本</h2>
<p>脚本将提供下面几个指令</p>
<ul>
<li><p>-y 更新maven包-编译-打包-发布-启动tomcat</p></li>
<li><p>-p 编译-打包-发布-启动tomcat</p></li>
<li><p>-r 重启tomcat</p></li>
<li><p>-c 重新编译java文件-发布-启动tomcat</p></li>
<li><p>-w 监听vm文件,默认5S同步一次</p></li>
<li><p>-l 查看tomcat日志</p></li>
<li><p>-h 帮助</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 需要变动的变量
#################################################################

# 环境变量,根据conf目录下选择

DEV=&quot;local&quot;

#################################################################

# 不需要改动的变量
# war包地址
WAR_URL=&quot;/opt/root/target/*.war&quot;

# tomcat 地址
TOM_URL=&quot;/usr/share/tomcat7&quot;

# 项目启动地址
TOM_ROOT=&quot;${TOM_URL}/webapps&quot;

# 文件监听间隔，单位秒
WT=5

# 拷贝 vm
WC_VM=&quot;src/main/webapp/WEB-INF/tpl /usr/share/tomcat7/webapps/ROOT/WEB-INF/&quot;

# 拷贝class
WC_JAVA=&quot;target/classes /usr/share/tomcat7/webapps/ROOT/WEB-INF/&quot;

# 通用方法
# 

# 使用新包
function newwar(){

    # 删除旧包
    rm -rf ${TOM_ROOT}/*

    # 移动war包
    mv ${WAR_URL} ${TOM_ROOT}/ROOT.war
}

# 重启tomcat
function restart(){
    # 关闭已启动程序
    killall -9 java
    # 启动服务
    ${TOM_URL}/bin/startup.sh
    # 输入启动日志
    tail -f ${TOM_URL}/logs/catalina.out
}

# 指令处理
while getopts &quot;:yprcwlh&quot; optname
do
    case &quot;$optname&quot; in
    &quot;y&quot;)
        echo &quot;更新jar包&quot;

        mvn clean install -U -P${DEV} -DskipTests
        newwar
        restart
        ;;
    &quot;p&quot;)
        echo &quot;重新打包&quot;

        mvn clean package -P${DEV} -DskipTests

        newwar
        restart
        ;;
    &quot;r&quot;)
        echo &quot;重启tomcat&quot;

        restart
        ;;
    &quot;c&quot;)
        echo &quot;重新编译并重启服务&quot;

        mvn clean compile -P${DEV} -DskipTests
        cp -R ${WC_JAVA}
        restart
        ;;
    &quot;w&quot;)
        echo &quot;开始监听vm文件&quot;

        # 监听 VM
        watch -n ${WT} cp -R ${WC_VM}
        ;;
    &quot;l&quot;)
        echo &quot;日志&quot;

        # 监听 VM
        tail -f ${TOM_URL}/logs/catalina.out
        ;;
    &quot;h&quot;)

        echo &quot; -y 更新maven包-编译-打包-发布-启动一条龙服务&quot;
        echo &quot; -p 编译打包发布启动一条龙服务&quot;
        echo &quot; -r 重启tomcat&quot;
        echo &quot; -c 重新java文件并部署重启服务&quot;
        echo &quot; -w 监听vm文件,默认5S同步一次&quot;
        echo &quot; -l 查看日志&quot;
        echo &quot; -h 帮助&quot;
        ;;
    esac" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code class="shell"># 需要变动的变量
#################################################################

# 环境变量,根据conf目录下选择

DEV=<span class="hljs-string">"local"</span>

#################################################################

# 不需要改动的变量
# war包地址
WAR_URL=<span class="hljs-string">"/opt/root/target/*.war"</span>

# tomcat 地址
TOM_URL=<span class="hljs-string">"/usr/share/tomcat7"</span>

# 项目启动地址
TOM_ROOT=<span class="hljs-string">"${TOM_URL}/webapps"</span>

# 文件监听间隔，单位秒
WT=<span class="hljs-number">5</span>

# 拷贝 vm
WC_VM=<span class="hljs-string">"src/main/webapp/WEB-INF/tpl /usr/share/tomcat7/webapps/ROOT/WEB-INF/"</span>

# 拷贝<span class="hljs-keyword">class</span>
WC_JAVA=<span class="hljs-string">"target/classes /usr/share/tomcat7/webapps/ROOT/WEB-INF/"</span>

# 通用方法
# 

# 使用新包
function newwar(){

    # 删除旧包
    rm -rf ${TOM_ROOT}<span class="hljs-comment">/*

    # 移动war包
    mv ${WAR_URL} ${TOM_ROOT}/ROOT.war
}

# 重启tomcat
function restart(){
    # 关闭已启动程序
    killall -9 java
    # 启动服务
    ${TOM_URL}/bin/startup.sh
    # 输入启动日志
    tail -f ${TOM_URL}/logs/catalina.out
}

# 指令处理
while getopts ":yprcwlh" optname
do
    case "$optname" in
    "y")
        echo "更新jar包"

        mvn clean install -U -P${DEV} -DskipTests
        newwar
        restart
        ;;
    "p")
        echo "重新打包"

        mvn clean package -P${DEV} -DskipTests

        newwar
        restart
        ;;
    "r")
        echo "重启tomcat"

        restart
        ;;
    "c")
        echo "重新编译并重启服务"

        mvn clean compile -P${DEV} -DskipTests
        cp -R ${WC_JAVA}
        restart
        ;;
    "w")
        echo "开始监听vm文件"

        # 监听 VM
        watch -n ${WT} cp -R ${WC_VM}
        ;;
    "l")
        echo "日志"

        # 监听 VM
        tail -f ${TOM_URL}/logs/catalina.out
        ;;
    "h")

        echo " -y 更新maven包-编译-打包-发布-启动一条龙服务"
        echo " -p 编译打包发布启动一条龙服务"
        echo " -r 重启tomcat"
        echo " -c 重新java文件并部署重启服务"
        echo " -w 监听vm文件,默认5S同步一次"
        echo " -l 查看日志"
        echo " -h 帮助"
        ;;
    esac</span></code></pre>
<h2 id="articleHeader12">推广到团队</h2>
<p>经过上面三步，我们的工具已经建好了，但是怎么让其他人也能使用起来呢？</p>
<p>docker 提供了云服务，如果我们的镜像足够小就可以将镜像推送到云上供团队其他人下载运行，但是我们的镜像已经超过了1G。。。所以我们就不能使用这种方式了。</p>
<p><code>docker save java -o ./java.tar</code></p>
<p>使用上面的命令可以将镜像持久化到本地文件 <code>java.tar</code>，然后通过其他手段进行传输到其他同学的机器上，我们使用AirDrop，几分钟的事情。</p>
<p><code>docker load -i java.tar</code></p>
<p>其他同学可以通过这个命令将我们的镜像加载到他的docker中。</p>
<p>再将shell脚本集成到项目根目录中，就可以愉快的使用了。</p>
<h2 id="articleHeader13">感谢</h2>
<p>特别感谢我司 @董珂 @海峰 @宾哥 几位同学提供的帮助！谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Docker 搭建前端 Java 开发环境

## 原文链接
[https://segmentfault.com/a/1190000006843830](https://segmentfault.com/a/1190000006843830)

