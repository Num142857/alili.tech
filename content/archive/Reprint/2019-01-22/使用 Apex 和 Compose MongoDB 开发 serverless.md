---
title: '使用 Apex 和 Compose MongoDB 开发 serverless' 
date: 2019-01-22 2:30:08
hidden: true
slug: 2e231ixc666
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-apex-和-compose-mongodb-开发-serverless"></a>使用 Apex 和 Compose MongoDB 开发 serverless</h1>
<p>Apex 是一个将开发和部署 AWS Lambda 函数的过程打包了的工具。它提供了一个本地命令行工具来创建安全上下文、部署函数，甚至追踪云端日志。由于 AWS Lambda 服务将函数看成独立的单元，Apex 提供了一个框架层将一系列函数作为一个项目。另外，它将服务拓展到不仅仅是 Java，Javascript 和 Ptyhon 语言，甚至包括 Go 语言。</p>
<p>两年前 Express （基本上是 NodeJS 事实标准上的网络框架层）的作者，<a href="https://medium.com/@tjholowaychuk/farewell-node-js-4ba9e7f3e52b#.dc9vkeybx">离开</a>了 Node 社区，而将其注意力转向 Go （谷歌创造的后端服务语言），以及 Lambda（由 AWS 提供的函数即服务）。尽管一个开发者的行为无法引领一股潮流，但是来看看他正在做的名叫 <a href="http://apex.run/">Apex</a> 项目会很有趣，因为它可能预示着未来很大一部分网络开发的改变。</p>
<h3><a href="#什么是-lambda"></a>什么是 Lambda?</h3>
<p>如今，人们如果不能使用自己的硬件，他们会选择付费使用一些云端的虚拟服务器。在云上，他们会部署一个完整的协议栈如 Node、Express，和一个自定义应用。或者如果他们更进一步使用了诸如 Heroku 或者 Bluemix 之类的新玩意，也可能在某些已经预配置好 Node 的容器中仅仅通过部署应用代码来部署他们完整的应用。</p>
<p>在这个抽象的阶梯上的下一步是单独部署函数到云端而不是一个完整的应用。这些函数之后可以被一大堆外部事件触发。例如，AWS 的 API 网关服务可以将代理 HTTP 请求作为触发函数的事件，而函数即服务（FaaS）的供应方根据要求执行匹配的函数。</p>
<h3><a href="#apex-起步"></a>Apex 起步</h3>
<p>Apex 是一个将 AWS 命令行接口封装起来的命令行工具。因此，开始使用 Apex 的第一步就是确保你已经安装和配置了从 AWS 获取的命令行工具（详情请查看 <a href="http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html">AWS CLI Getting Started</a> 或者 <a href="http://apex.run/">Apex documentation</a>）。</p>
<p>接下来，安装 Apex：</p>
<pre><code class="hljs vim">curl http<span class="hljs-variable">s:</span>//raw.githubusercontent.<span class="hljs-keyword">com</span>/apex/apex/master/install.<span class="hljs-keyword">sh</span> | <span class="hljs-keyword">sh</span>

</code></pre><p>然后为你的新项目创建一个目录并运行：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">apex init</span>

</code></pre><p><a href="https://camo.githubusercontent.com/1375e9a7476735b507cdab1a52032623509169eb/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303735382f6e7a6a6b3170693172636531796172627036786c2e706e67"><img src="https://p0.ssl.qhimg.com/t0182bf7b69a91c6a2b.png" alt="apexInit"></a></p>
<p>这步会配置好一些必须的安全策略，并且将项目名字附在函数名后，因为 Lambda 使用扁平化的命名空间。同时它也会创建一些配置文件和默认的 “Hello World" 风格的 Javascript 函数的 functions 目录。</p>
<p><a href="https://camo.githubusercontent.com/0976feca8785648eeb4a5c758b38028634b40d6c/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303736352f626273623868366e6b63396e7832717330666f612e706e67"><img src="https://p0.ssl.qhimg.com/t01e0ea9170a4b737e8.png" alt="tree"></a></p>
<p>Apex/Lambda 一个非常友好的特性是创建函数非常直观。创建一个以你函数名为名的新目录，然后在其中创建项目。如果想要使用 Go 语言，你可以创建一个叫 <code>simpleGo</code> 的目录然后在其中创建一个小型的 <code>main</code> 函数：</p>
<pre><code class="hljs go"><span class="hljs-comment">//  serverless/functions/simpleGo/main.go</span>
<span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (  
    <span class="hljs-string">"encoding/json"</span>
    <span class="hljs-string">"github.com/apex/go-apex"</span>
    <span class="hljs-string">"log"</span>
)

<span class="hljs-keyword">type</span> helloEvent <span class="hljs-keyword">struct</span> {  
    Hello <span class="hljs-keyword">string</span> <span class="hljs-string">`json:"hello"`</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {  
    apex.HandleFunc(<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(event json.RawMessage, ctx *apex.Context)</span> <span class="hljs-params">(<span class="hljs-keyword">interface</span>{}, error)</span></span> {
        <span class="hljs-keyword">var</span> h helloEvent
        <span class="hljs-keyword">if</span> err := json.Unmarshal(event, &amp;h); err != <span class="hljs-literal">nil</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>, err
        }
        log.Print(<span class="hljs-string">"event.hello:"</span>, h.Hello)
        <span class="hljs-keyword">return</span> h, <span class="hljs-literal">nil</span>
    })
}

</code></pre><p>Node 是 Lambda 所支持的运行环境，Apex 使用 NodeJS shim 来调用由上述程序产生的二进制文件。它将 <code>event</code> 传入二进制文件的 STDIN，将从二进制返回的 STDOUT 作为 <code>value</code>。通过 STDERR 来显示日志。<code>apex.HandleFunc</code> 用来为你管理所有的管道。事实上在 Unix 惯例里这是一个非常简单的解决方案。你甚至可以通过在本地命令行执行 <code>go run main.go</code> 来测试它。</p>
<p><a href="https://camo.githubusercontent.com/c5ccbd3028f302feb06e45f862891cfc81a67641/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303738342f64646230766b6365663530706e6a676664716e372e706e67"><img src="https://p0.ssl.qhimg.com/t01a89daab571ff2c1f.png" alt="goRun"></a></p>
<p>通过 Apex 向云端部署稍显琐碎：</p>
<p><a href="https://camo.githubusercontent.com/cea3b3e7f0e6a7c78ba134df81f10e8000afbff4/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303739302f78366c38716732767469637078687a69376b6c332e706e67"><img src="https://p0.ssl.qhimg.com/t01000f11f7b3128d82.png" alt="apexDeploy"></a></p>
<p>注意，这将会对你的函数指定命名空间，控制版本，甚至为其他多开发环境如 <code>staging</code> 和 <code>production</code>配置<code>env</code>。</p>
<p>通过 <code>apex invoke</code> 在云端执行也比较琐碎：</p>
<p><a href="https://camo.githubusercontent.com/c5abde294e314d92265c4c7c721949e8ff9cfa22/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303739362f6a636378736b756b7679357574676567793268722e706e67"><img src="https://p0.ssl.qhimg.com/t01739eedce92605a6a.png" alt="apexInvoke"></a></p>
<p>当然我们也可以追踪一些日志：</p>
<p><a href="https://camo.githubusercontent.com/ff6bfb586ff0d020ce7957380d0eca6da054ba17/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303830322f796d337a3677386f6a6d727137707563723562702e706e67"><img src="https://p0.ssl.qhimg.com/t01d85ad443f51c34d0.png" alt="apexLog"></a></p>
<p>这些是从 AWS CloudWatch 返回的结果。它们都在 AWS 的 UI 中可见，但是当在另一个终端参照此结果来署它会更快。</p>
<h3><a href="#窥探内部的秘密"></a>窥探内部的秘密</h3>
<p>来看看它内部到底部署了什么很具有指导性。Apex 将 shim 和所有需要用来运行函数的东西打包起来。另外，它会提前做好配置如入口与安全条例：</p>
<p><a href="https://camo.githubusercontent.com/6106fa531e3e339dd5db54ea39ff834165ced3a1/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303831322f7a7a3671776f63767568686c346c7136626634702e706e67"><img src="https://p0.ssl.qhimg.com/t010d77a4eafe289de3.png" alt="lambdaConfig"></a></p>
<p>Lambda 服务实际上接受一个包含所有依赖的 zip 压缩包，它会被部署到服务器来执行指定的函数。我们可以使用 <code>apex build &lt;functionName&gt;</code> 在本地创建一个压缩包用来在以后解压以探索。</p>
<p><a href="https://camo.githubusercontent.com/f211ea84d31708faeb42a83d55ba25819c802742/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303831382f79626964616a326932696a75726a6263717278322e706e67"><img src="https://p0.ssl.qhimg.com/t01c50765ce76249239.png" alt="apexBuild"></a></p>
<p>这里的 <code>_apex_index.js handle</code> 函数是原始的入口。它会配置好一些环境变量然后进入 <code>index.js</code>。</p>
<p>而 <code>index.js</code> 孕育一个 <code>main</code> Go 的二进制文件的子进程并且将所有关联联结在一起。</p>
<h3><a href="#使用-mgo-继续深入"></a>使用 <code>mgo</code> 继续深入</h3>
<p><code>mgo</code> 是 Go 语言的 MongoDB 驱动。使用 Apex 来创建一个函数来连接到 Compose 的 MongoDB 就如同我们已经学习过的 <code>simpleGo</code> 函数一样直观。这里我们会通过增加一个 <code>mgoGo</code> 目录和另一个 <code>main.go</code> 来创建一个新函数。</p>
<pre><code class="hljs go"><span class="hljs-comment">// serverless/functions/mgoGo/main.go</span>

<span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (  
    <span class="hljs-string">"crypto/tls"</span>
    <span class="hljs-string">"encoding/json"</span>
    <span class="hljs-string">"github.com/apex/go-apex"</span>
    <span class="hljs-string">"gopkg.in/mgo.v2"</span>
    <span class="hljs-string">"log"</span>
    <span class="hljs-string">"net"</span>
)

<span class="hljs-keyword">type</span> person <span class="hljs-keyword">struct</span> {  
  Name  <span class="hljs-keyword">string</span> <span class="hljs-string">`json:"name"`</span>
  Email <span class="hljs-keyword">string</span> <span class="hljs-string">`json:"email"`</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {  
    apex.HandleFunc(<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(event json.RawMessage, ctx *apex.Context)</span> <span class="hljs-params">(<span class="hljs-keyword">interface</span>{}, error)</span></span> {
        tlsConfig := &amp;tls.Config{}
        tlsConfig.InsecureSkipVerify = <span class="hljs-literal">true</span>

        <span class="hljs-comment">//connect URL:</span>
        <span class="hljs-comment">// "mongodb://&lt;username&gt;:&lt;password&gt;@&lt;hostname&gt;:&lt;port&gt;,&lt;hostname&gt;:&lt;port&gt;/&lt;db-name&gt;</span>
        dialInfo, err := mgo.ParseURL(<span class="hljs-string">"mongodb://apex:mountain@aws-us-west-2-portal.0.dblayer.com:15188, aws-us-west-2-portal.1.dblayer.com:15188/signups"</span>)
        dialInfo.DialServer = <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(addr *mgo.ServerAddr)</span> <span class="hljs-params">(net.Conn, error)</span></span> {
            conn, err := tls.Dial(<span class="hljs-string">"tcp"</span>, addr.String(), tlsConfig)
            <span class="hljs-keyword">return</span> conn, err
        }
        session, err := mgo.DialWithInfo(dialInfo)
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
            log.Fatal(<span class="hljs-string">"uh oh. bad Dial."</span>)
            <span class="hljs-built_in">panic</span>(err)
        }
        <span class="hljs-keyword">defer</span> session.Close()
        log.Print(<span class="hljs-string">"Connected!"</span>)

    <span class="hljs-keyword">var</span> p person
    <span class="hljs-keyword">if</span> err := json.Unmarshal(event, &amp;p); err != <span class="hljs-literal">nil</span> {
            log.Fatal(err)
    }

        c := session.DB(<span class="hljs-string">"signups"</span>).C(<span class="hljs-string">"people"</span>)
        err = c.Insert(&amp;p) 
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
            log.Fatal(err)
        }

    log.Print(<span class="hljs-string">"Created: "</span>, p.Name,<span class="hljs-string">" - "</span>, p.Email)
        <span class="hljs-keyword">return</span> p, <span class="hljs-literal">nil</span>
    })
}

</code></pre><p>发布部署，我们可以通过使用正确类型的事件来模拟调用了一个 API：</p>
<p><a href="https://camo.githubusercontent.com/442042fb6b6c132215e61d5e2482465282677663/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303832392f6a657072623372367172676a6b7a626c6b68686f2e706e67"><img src="https://p0.ssl.qhimg.com/t01f6e57720d3d4a490.png" alt="apexMgo"></a></p>
<p>最终结果是 <code>insert</code> 到在 <a href="https://www.compose.com/articles/composes-new-primetime-mongodb/">Compose 之上 的 MongoDB</a> 中。</p>
<p><a href="https://camo.githubusercontent.com/73baf3a8cb78d389ce42d05abb9f99c6bfc45a72/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647979636b37336c792f696d6167652f75706c6f61642f76313437353632303833332f76647938686a697778706530326576677177636d2e706e67"><img src="https://p0.ssl.qhimg.com/t013dc996646f0bbed7.png" alt="composeDeploy"></a></p>
<h3><a href="#还有更多"></a>还有更多……</h3>
<p>尽管目前我们已经涉及了 Apex 的方方面面，但是仍然有很多值得我们去探索的东西。它还和 <a href="https://www.terraform.io/">Terraform</a> 进行了整合。如果你真的希望，你可以发布一个多语言项目包括 Javascript、Java、Python 以及 Go。你也可以为开发、演示以及产品环境配置多种环境。你可以调整运行资源如调整存储大小和运行时间来调整成本。而且你可以把函数勾连到 API 网关上来传输一个 HTTP API 或者使用一些类似 SNS (简单通知服务)来为云端的函数创建管道。</p>
<p>和大多数事物一样，Apex 和 Lambda 并不是在所有场景下都完美。 但是，在你的工具箱中增加一个完全不需要你来管理底层建设的工具完全没有坏处。</p>
<hr>
<p>作者简介:</p>
<p>Hays Hutton 喜欢写代码并写一些与其相关的东西。喜欢这篇文章？请前往<a href="https://www.compose.com/articles/author/hays-hutton/">Hays Hutton’s author page</a> 继续阅读其他文章。</p>
<hr>
<p>via: <a href="https://www.compose.com/articles/go-serverless-with-apex-and-composes-mongodb/">https://www.compose.com/articles/go-serverless-with-apex-and-composes-mongodb/</a></p>
<p>作者：<a href="https://www.compose.com/articles/author/hays-hutton/">Hays Hutton</a> 译者：<a href="https://github.com/xiaow6">xiaow6</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Apex 和 Compose MongoDB 开发 serverless

## 原文链接
[https://www.zcfy.cc/article/go-serverless-with-apex-and-composes-mongodb](https://www.zcfy.cc/article/go-serverless-with-apex-and-composes-mongodb)

