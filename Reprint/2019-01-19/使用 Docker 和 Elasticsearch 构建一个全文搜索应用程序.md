---
title: '使用 Docker 和 Elasticsearch 构建一个全文搜索应用程序' 
date: 2019-01-19 2:30:10
hidden: true
slug: el4zt97f9vc
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-docker-和-elasticsearch-构建一个全文搜索应用程序"></a>使用 Docker 和 Elasticsearch 构建一个全文搜索应用程序</h1>
<p><em>如何在超过 500 万篇文章的 Wikipedia 上找到与你研究相关的文章？</em></p>
<p><em>如何在超过 20 亿用户的 Facebook 中找到你的朋友（并且还拼错了名字）？</em></p>
<p><em>谷歌如何在整个因特网上搜索你的模糊的、充满拼写错误的查询？</em></p>
<p>在本教程中，我们将带你探索如何配置我们自己的全文搜索应用程序（与上述问题中的系统相比，它的复杂度要小很多）。我们的示例应用程序将提供一个 UI 和 API 去从 100 部经典文学（比如，《彼得·潘》 、  《弗兰肯斯坦》 和  《金银岛》）中搜索完整的文本。</p>
<p>你可以在这里（<a href="https://search.patricktriest.com/">https://search.patricktriest.com</a>）预览该教程应用的完整版本。</p>
<p><a href="https://p0.ssl.qhimg.com/t01d5f6d4e25c29a960.png"><img src="https://p0.ssl.qhimg.com/t01d5f6d4e25c29a960.png" alt="preview webapp"></a></p>
<p>这个应用程序的源代码是 100% 开源的，可以在 GitHub 仓库上找到它们 —— <a href="https://github.com/triestpa/guttenberg-search">https://github.com/triestpa/guttenberg-search</a> 。</p>
<p>在应用程序中添加一个快速灵活的全文搜索可能是个挑战。大多数的主流数据库，比如，<a href="https://www.postgresql.org/">PostgreSQL</a> 和 <a href="https://www.mongodb.com/">MongoDB</a>，由于受其查询和索引结构的限制只能提供一个非常基础的文本搜索功能。为实现高质量的全文搜索，通常的最佳选择是单独的数据存储。<a href="https://www.elastic.co/">Elasticsearch</a> 是一个开源数据存储的领导者，它专门为执行灵活而快速的全文搜索进行了优化。</p>
<p>我们将使用 <a href="https://www.docker.com/">Docker</a> 去配置我们自己的项目环境和依赖。Docker 是一个容器化引擎，它被 <a href="https://www.uber.com/">Uber</a>、<a href="https://www.spotify.com/us/">Spotify</a>、<a href="https://www.adp.com/">ADP</a> 以及 <a href="https://www.paypal.com/us/home">Paypal</a> 使用。构建容器化应用的一个主要优势是，项目的设置在 Windows、macOS、以及 Linux 上都是相同的 —— 这使我写这个教程快速又简单。如果你还没有使用过 Docker，不用担心，我们接下来将经历完整的项目配置。</p>
<p>我也会使用 <a href="https://nodejs.org/en/">Node.js</a> （使用 <a href="http://koajs.com/">Koa</a> 框架）和 <a href="https://vuejs.org/">Vue.js</a>，用它们分别去构建我们自己的搜索 API 和前端 Web 应用程序。</p>
<h3><a href="#1---elasticsearch-是什么"></a>1 - Elasticsearch 是什么？</h3>
<p>全文搜索在现代应用程序中是一个有大量需求的特性。搜索也可能是最难的一项特性 —— 许多流行的网站的搜索功能都不合格，要么返回结果太慢，要么找不到精确的结果。通常，这种情况是被底层的数据库所局限：大多数标准的关系型数据库局限于基本的 <code>CONTAINS</code> 或 <code>LIKE</code> SQL 查询上，它仅提供最基本的字符串匹配功能。</p>
<p>我们的搜索应用程序将具备：</p>
<ol>
<li><strong>快速</strong> - 搜索结果将快速返回，为用户提供一个良好的体验。</li>
<li><strong>灵活</strong> - 我们希望能够去修改搜索如何执行的方式，这是为了便于在不同的数据库和用户场景下进行优化。</li>
<li><strong>容错</strong> - 如果所搜索的内容有拼写错误，我们将仍然会返回相关的结果，而这个结果可能正是用户希望去搜索的结果。</li>
<li><strong>全文</strong> - 我们不想限制我们的搜索只能与指定的关键字或者标签相匹配 —— 我们希望它可以搜索在我们的数据存储中的任何东西（包括大的文本字段）。</li>
</ol>
<p><a href="https://camo.githubusercontent.com/2c2cf39b39e354fa114dc2e395f071f7cbcd57fe/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f456c61737469637365617263682d4c6f676f2e706e67"><img src="https://p0.ssl.qhimg.com/t01f01a9c33d21ad14b.png" alt="Elastic Search Logo"></a></p>
<p>为了构建一个功能强大的搜索功能，通常最理想的方法是使用一个为全文搜索任务优化过的数据存储。在这里我们使用 <a href="https://www.elastic.co/">Elasticsearch</a>，Elasticsearch 是一个开源的内存中的数据存储，它是用 Java 写的，最初是在 <a href="https://lucene.apache.org/core/">Apache Lucene</a> 库上构建的。</p>
<p>这里有一些来自 <a href="https://www.elastic.co/guide/en/elasticsearch/guide/2.x/getting-started.html">Elastic 官方网站</a> 上的 Elasticsearch 真实使用案例。</p>
<ul>
<li>Wikipedia 使用 Elasticsearch 去提供带高亮搜索片断的全文搜索功能，并且提供按类型搜索和 “did-you-mean” 建议。</li>
<li>Guardian 使用 Elasticsearch 把社交网络数据和访客日志相结合，为编辑去提供新文章的公众意见的实时反馈。</li>
<li>Stack Overflow 将全文搜索和地理查询相结合，并使用 “类似” 的方法去找到相关的查询和回答。</li>
<li>GitHub 使用 Elasticsearch 对 1300 亿行代码进行查询。</li>
</ul>
<h3><a href="#与-普通的-数据库相比elasticsearch-有什么不一样的地方"></a>与 “普通的” 数据库相比，Elasticsearch 有什么不一样的地方？</h3>
<p>Elasticsearch 之所以能够提供快速灵活的全文搜索，秘密在于它使用反转索引inverted index 。</p>
<p>“索引” 是数据库中的一种数据结构，它能够以超快的速度进行数据查询和检索操作。数据库通过存储与表中行相关联的字段来生成索引。在一种可搜索的数据结构（一般是 <a href="https://en.wikipedia.org/wiki/B-tree">B 树</a>）中排序索引，在优化过的查询中，数据库能够达到接近线性的时间（比如，“使用 ID=5 查找行”）。</p>
<p><a href="https://camo.githubusercontent.com/e9430c97798dcc54b8b55faf2ed9d51ba8a957af/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f64625f696e6465782e706e67"><img src="https://p0.ssl.qhimg.com/t01fabb369654386c4a.png" alt="Relational Index"></a></p>
<p>我们可以将数据库索引想像成一个图书馆中老式的卡片式目录 —— 只要你知道书的作者和书名，它就会告诉你书的准确位置。为加速特定字段上的查询速度，数据库表一般有多个索引（比如，在 <code>name</code> 列上的索引可以加速指定名字的查询）。</p>
<p>反转索引本质上是不一样的。每行（或文档）的内容是分开的，并且每个独立的条目（在本案例中是单词）反向指向到包含它的任何文档上。</p>
<p><a href="https://camo.githubusercontent.com/be8e9a5f0fc431a49e1e34cfbe8f6a01709d63f7/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f696e766572746564496e6465782e6a7067"><img src="https://p0.ssl.qhimg.com/t01aa89048178e8e982.jpg" alt="Inverted Index"></a></p>
<p>这种反转索引数据结构可以使我们非常快地查询到，所有出现 “football” 的文档。通过使用大量优化过的内存中的反转索引，Elasticsearch 可以让我们在存储的数据上，执行一些非常强大的和自定义的全文搜索。</p>
<h3><a href="#2---项目设置"></a>2 - 项目设置</h3>
<h4><a href="#20---docker"></a>2.0 - Docker</h4>
<p>我们在这个项目上使用 <a href="https://www.docker.com/">Docker</a> 管理环境和依赖。Docker 是个容器引擎，它允许应用程序运行在一个独立的环境中，不会受到来自主机操作系统和本地开发环境的影响。现在，许多公司将它们的大规模 Web 应用程序主要运行在容器架构上。这样将提升灵活性和容器化应用程序组件的可组构性。</p>
<p><a href="https://camo.githubusercontent.com/ed55ce4779b16a1123e3bfe95769d1b4012c6cec/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f646f636b65722e706e67"><img src="https://p0.ssl.qhimg.com/t01632f00208703b43c.png" alt="Docker Logo"></a></p>
<p>对我来说，使用 Docker 的优势是，它对本教程的作者非常方便，它的本地环境设置量最小，并且跨 Windows、macOS 和 Linux 系统的一致性很好。我们只需要在 Docker 配置文件中定义这些依赖关系，而不是按安装说明分别去安装 Node.js、Elasticsearch 和 Nginx，然后，就可以使用这个配置文件在任何其它地方运行我们的应用程序。而且，因为每个应用程序组件都运行在它自己的独立容器中，它们受本地机器上的其它 “垃圾” 干扰的可能性非常小，因此，在调试问题时，像“它在我这里可以工作！”这类的问题将非常少。</p>
<h4><a href="#21---安装-docker--docker-compose"></a>2.1 - 安装 Docker &amp; Docker-Compose</h4>
<p>这个项目只依赖 <a href="https://www.docker.com/">Docker</a> 和 <a href="https://docs.docker.com/compose/">docker-compose</a>，docker-compose 是 Docker 官方支持的一个工具，它用来将定义的多个容器配置 _组装_  成单一的应用程序栈。</p>
<ul>
<li>安装 Docker - <a href="https://docs.docker.com/engine/installation/">https://docs.docker.com/engine/installation/</a></li>
<li>安装 Docker Compose - <a href="https://docs.docker.com/compose/install/">https://docs.docker.com/compose/install/</a></li>
</ul>
<h4><a href="#22---设置项目主目录"></a>2.2 - 设置项目主目录</h4>
<p>为项目创建一个主目录（名为 <code>guttenberg_search</code>）。我们的项目将工作在主目录的以下两个子目录中。</p>
<ul>
<li><code>/public</code> - 保存前端 Vue.js Web 应用程序。</li>
<li><code>/server</code> - 服务器端 Node.js 源代码。</li>
</ul>
<h4><a href="#23---添加-docker-compose-配置"></a>2.3 - 添加 Docker-Compose 配置</h4>
<p>接下来，我们将创建一个 <code>docker-compose.yml</code> 文件来定义我们的应用程序栈中的每个容器。</p>
<ol>
<li><code>gs-api</code> - 后端应用程序逻辑使用的 Node.js 容器</li>
<li><code>gs-frontend</code> - 前端 Web 应用程序使用的 Ngnix 容器。</li>
<li><code>gs-search</code> - 保存和搜索数据的 Elasticsearch 容器。</li>
</ol>
<pre><code class="hljs http"><span class="hljs-attribute">version</span>: '3'

<span class="routeros">services:
  api: # Node.js App
    container_name: gs-api
    build: .
    ports:
      - <span class="hljs-string">"3000:3000"</span> # Expose API<span class="hljs-built_in"> port
</span>      - <span class="hljs-string">"9229:9229"</span> # Expose Node process <span class="hljs-builtin-name">debug</span><span class="hljs-built_in"> port </span>(<span class="hljs-builtin-name">disable</span> <span class="hljs-keyword">in</span> production)
    environment: # <span class="hljs-builtin-name">Set</span> ENV vars
     - <span class="hljs-attribute">NODE_ENV</span>=local
     - <span class="hljs-attribute">ES_HOST</span>=elasticsearch
     - <span class="hljs-attribute">PORT</span>=3000
    volumes: # Attach local book data directory
      - ./books:/usr/src/app/books

  frontend: # Nginx<span class="hljs-built_in"> Server </span><span class="hljs-keyword">For</span> Frontend App
    container_name: gs-frontend
    image: nginx
    volumes: # Serve local <span class="hljs-string">"public"</span> dir
      - ./public:/usr/share/nginx/html
    ports:
      - <span class="hljs-string">"8080:80"</span> # Forward site <span class="hljs-keyword">to</span> localhost:8080

  elasticsearch: # Elasticsearch<span class="hljs-built_in"> Instance
</span>    container_name: gs-search
    image: docker.elastic.co/elasticsearch/elasticsearch:6.1.1
    volumes: # Persist ES data <span class="hljs-keyword">in</span> seperate <span class="hljs-string">"esdata"</span> volume
      - esdata:/usr/share/elasticsearch/data
    environment:
      - bootstrap.<span class="hljs-attribute">memory_lock</span>=<span class="hljs-literal">true</span>
      - <span class="hljs-string">"ES_JAVA_OPTS=-Xms512m -Xmx512m"</span>
      - discovery.<span class="hljs-attribute">type</span>=single-node
    ports: # Expose Elasticsearch ports
      - <span class="hljs-string">"9300:9300"</span>
      - <span class="hljs-string">"9200:9200"</span>

volumes: # Define seperate volume <span class="hljs-keyword">for</span> Elasticsearch data
  esdata:

</span></code></pre><p>这个文件定义了我们全部的应用程序栈 —— 不需要在你的本地系统上安装 Elasticsearch、Node 和 Nginx。每个容器都将端口转发到宿主机系统（<code>localhost</code>）上，以便于我们在宿主机上去访问和调试 Node API、Elasticsearch 实例和前端 Web 应用程序。</p>
<h4><a href="#24---添加-dockerfile"></a>2.4 - 添加 Dockerfile</h4>
<p>对于 Nginx 和 Elasticsearch，我们使用了官方预构建的镜像，而 Node.js 应用程序需要我们自己去构建。</p>
<p>在应用程序的根目录下定义一个简单的 <code>Dockerfile</code> 配置文件。</p>
<pre><code class="hljs dockerfile"><span class="hljs-comment"># Use Node v8.9.0 LTS</span>
<span class="hljs-keyword">FROM</span> node:carbon

<span class="hljs-comment"># Setup app working directory</span>
<span class="hljs-keyword">WORKDIR</span><span class="bash"> /usr/src/app
</span>
<span class="hljs-comment"># Copy package.json and package-lock.json</span>
<span class="hljs-keyword">COPY</span><span class="bash"> package*.json ./
</span>
<span class="hljs-comment"># Install app dependencies</span>
<span class="hljs-keyword">RUN</span><span class="bash"> npm install
</span>
<span class="hljs-comment"># Copy sourcecode</span>
<span class="hljs-keyword">COPY</span><span class="bash"> . .
</span>
<span class="hljs-comment"># Start app</span>
<span class="hljs-keyword">CMD</span><span class="bash"> [ <span class="hljs-string">"npm"</span>, <span class="hljs-string">"start"</span> ]
</span>
</code></pre><p>这个 Docker 配置扩展了官方的 Node.js 镜像、拷贝我们的应用程序源代码、以及在容器内安装 NPM 依赖。</p>
<p>我们也增加了一个 <code>.dockerignore</code> 文件，以防止我们不需要的文件拷贝到容器中。</p>
<pre><code class="hljs cpp">node_modules/
npm-debug.<span class="hljs-built_in">log</span>
books/
<span class="hljs-keyword">public</span>/

</code></pre><blockquote>
<p>请注意：我们之所以不拷贝 <code>node_modules</code> 目录到我们的容器中 —— 是因为我们要在容器构建过程里面运行 <code>npm install</code>。从宿主机系统拷贝 <code>node_modules</code> 到容器里面可能会引起错误，因为一些包需要为某些操作系统专门构建。比如说，在 macOS 上安装 <code>bcrypt</code> 包，然后尝试将这个模块直接拷贝到一个 Ubuntu 容器上将不能工作，因为 <code>bcyrpt</code> 需要为每个操作系统构建一个特定的二进制文件。</p>
</blockquote>
<h4><a href="#25---添加基本文件"></a>2.5 - 添加基本文件</h4>
<p>为了测试我们的配置，我们需要添加一些占位符文件到应用程序目录中。</p>
<p>在 <code>public/index.html</code> 文件中添加如下内容。</p>
<pre><code class="hljs javascript">&lt;html&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>Hello World From The Frontend Container<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span>

</code></pre><p>接下来，在 <code>server/app.js</code> 中添加 Node.js 占位符文件。</p>
<pre><code class="hljs stata"><span class="hljs-keyword">const</span> Koa = require('koa')
<span class="hljs-keyword">const</span> <span class="hljs-keyword">app</span> = new Koa()

<span class="hljs-keyword">app</span>.<span class="hljs-keyword">use</span>(async (ctx, next) =&gt; {
  ctx.body = 'Hello World From the Backend Container'
})

<span class="hljs-keyword">const</span> port = process.env.PORT || 3000

<span class="hljs-keyword">app</span>.listen(port, <span class="hljs-keyword">err</span> =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) console.<span class="hljs-keyword">error</span>(<span class="hljs-keyword">err</span>)
  console.<span class="hljs-built_in">log</span>(`<span class="hljs-keyword">App</span> Listening <span class="hljs-keyword">on</span> Port <span class="hljs-variable">${port}</span>`)
})

</code></pre><p>最后，添加我们的 <code>package.json</code>  Node 应用配置。</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"guttenberg-search"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.0.1"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"Source code for Elasticsearch tutorial using 100 classic open source books."</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"node --inspect=0.0.0.0:9229 server/app.js"</span>
  },
  <span class="hljs-attr">"repository"</span>: {
    <span class="hljs-attr">"type"</span>: <span class="hljs-string">"git"</span>,
    <span class="hljs-attr">"url"</span>: <span class="hljs-string">"git+https://github.com/triestpa/guttenberg-search.git"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"patrick.triest@gmail.com"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"bugs"</span>: {
    <span class="hljs-attr">"url"</span>: <span class="hljs-string">"https://github.com/triestpa/guttenberg-search/issues"</span>
  },
  <span class="hljs-attr">"homepage"</span>: <span class="hljs-string">"https://github.com/triestpa/guttenberg-search#readme"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"elasticsearch"</span>: <span class="hljs-string">"13.3.1"</span>,
    <span class="hljs-attr">"joi"</span>: <span class="hljs-string">"13.0.1"</span>,
    <span class="hljs-attr">"koa"</span>: <span class="hljs-string">"2.4.1"</span>,
    <span class="hljs-attr">"koa-joi-validate"</span>: <span class="hljs-string">"0.5.1"</span>,
    <span class="hljs-attr">"koa-router"</span>: <span class="hljs-string">"7.2.1"</span>
  }
}

</code></pre><p>这个文件定义了应用程序启动命令和 Node.js 包依赖。</p>
<blockquote>
<p>注意：不要运行 <code>npm install</code> —— 当它构建时，依赖会在容器内安装。</p>
</blockquote>
<h4><a href="#26---测试它的输出"></a>2.6 - 测试它的输出</h4>
<p>现在一切新绪，我们来测试应用程序的每个组件的输出。从应用程序的主目录运行 <code>docker-compose build</code>，它将构建我们的 Node.js 应用程序容器。</p>
<p><a href="https://camo.githubusercontent.com/44ae53569dcc8edab0fa15db370dd9a44190a0b7/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f305f332e706e67"><img src="https://p0.ssl.qhimg.com/t0148e9e3b7531867b7.png" alt="docker build output"></a></p>
<p>接下来，运行 <code>docker-compose up</code> 去启动整个应用程序栈。</p>
<p><a href="https://camo.githubusercontent.com/86471791c63cb38324db0acbdbfb4d00f19b2fd4/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f305f322e706e67"><img src="https://p0.ssl.qhimg.com/t01b05997ff28d082aa.png" alt="docker compose output"></a></p>
<blockquote>
<p>这一步可能需要几分钟时间，因为 Docker 要为每个容器去下载基础镜像。以后再次运行，启动应用程序会非常快，因为所需要的镜像已经下载完成了。</p>
</blockquote>
<p>在你的浏览器中尝试访问 <code>localhost:8080</code> —— 你将看到简单的 “Hello World” Web 页面。</p>
<p><a href="https://camo.githubusercontent.com/39984892bca00bd4cb2ffe0bc576201e1d9b2933/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f305f302e706e67"><img src="https://p0.ssl.qhimg.com/t01a9dd7c0bc93a3851.png" alt="frontend sample output"></a></p>
<p>访问 <code>localhost:3000</code> 去验证我们的 Node 服务器，它将返回 “Hello World” 信息。</p>
<p><a href="https://camo.githubusercontent.com/f31dfae60c63849760a9cb809d9192f7798a83ae/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f305f312e706e67"><img src="https://p0.ssl.qhimg.com/t01f8dcdc3b90109ee9.png" alt="backend sample output"></a></p>
<p>最后，访问 <code>localhost:9200</code> 去检查 Elasticsearch 运行状态。它将返回类似如下的内容。</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"name"</span> : <span class="hljs-string">"SLTcfpI"</span>,
  <span class="hljs-attr">"cluster_name"</span> : <span class="hljs-string">"docker-cluster"</span>,
  <span class="hljs-attr">"cluster_uuid"</span> : <span class="hljs-string">"iId8e0ZeS_mgh9ALlWQ7-w"</span>,
  <span class="hljs-attr">"version"</span> : {
    <span class="hljs-attr">"number"</span> : <span class="hljs-string">"6.1.1"</span>,
    <span class="hljs-attr">"build_hash"</span> : <span class="hljs-string">"bd92e7f"</span>,
    <span class="hljs-attr">"build_date"</span> : <span class="hljs-string">"2017-12-17T20:23:25.338Z"</span>,
    <span class="hljs-attr">"build_snapshot"</span> : <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"lucene_version"</span> : <span class="hljs-string">"7.1.0"</span>,
    <span class="hljs-attr">"minimum_wire_compatibility_version"</span> : <span class="hljs-string">"5.6.0"</span>,
    <span class="hljs-attr">"minimum_index_compatibility_version"</span> : <span class="hljs-string">"5.0.0"</span>
  },
  <span class="hljs-attr">"tagline"</span> : <span class="hljs-string">"You Know, for Search"</span>
}

</code></pre><p>如果三个 URL 都显示成功，祝贺你！整个容器栈已经正常运行了，接下来我们进入最有趣的部分。</p>
<h3><a href="#3---连接到-elasticsearch"></a>3 - 连接到 Elasticsearch</h3>
<p>我们要做的第一件事情是，让我们的应用程序连接到我们本地的 Elasticsearch 实例上。</p>
<h4><a href="#30---添加-es-连接模块"></a>3.0 - 添加 ES 连接模块</h4>
<p>在新文件 <code>server/connection.js</code> 中添加如下的 Elasticsearch 初始化代码。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> elasticsearch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'elasticsearch'</span>)

<span class="hljs-comment">// Core ES variables for this project</span>
<span class="hljs-keyword">const</span> index = <span class="hljs-string">'library'</span>
<span class="hljs-keyword">const</span> type = <span class="hljs-string">'novel'</span>
<span class="hljs-keyword">const</span> port = <span class="hljs-number">9200</span>
<span class="hljs-keyword">const</span> host = process.env.ES_HOST || <span class="hljs-string">'localhost'</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> elasticsearch.Client({ <span class="hljs-attr">host</span>: { host, port } })

<span class="hljs-comment">/** Check the ES connection status */</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkConnection</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> isConnected = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">while</span> (!isConnected) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Connecting to ES'</span>)
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> health = <span class="hljs-keyword">await</span> client.cluster.health({})
      <span class="hljs-built_in">console</span>.log(health)
      isConnected = <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Connection Failed, Retrying...'</span>, err)
    }
  }
}

checkConnection()

</code></pre><p>现在，我们重新构建我们的 Node 应用程序，我们将使用 <code>docker-compose build</code> 来做一些改变。接下来，运行 <code>docker-compose up -d</code> 去启动应用程序栈，它将以守护进程的方式在后台运行。</p>
<p>应用程序启动之后，在命令行中运行 <code>docker exec gs-api "node" "server/connection.js"</code>，以便于在容器内运行我们的脚本。你将看到类似如下的系统输出信息。</p>
<pre><code class="hljs less">{ <span class="hljs-attribute">cluster_name</span>: <span class="hljs-string">'docker-cluster'</span>,
  <span class="hljs-attribute">status</span>: <span class="hljs-string">'yellow'</span>,
  <span class="hljs-attribute">timed_out</span>: false,
  <span class="hljs-attribute">number_of_nodes</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attribute">number_of_data_nodes</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attribute">active_primary_shards</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attribute">active_shards</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attribute">relocating_shards</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attribute">initializing_shards</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attribute">unassigned_shards</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attribute">delayed_unassigned_shards</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attribute">number_of_pending_tasks</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attribute">number_of_in_flight_fetch</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attribute">task_max_waiting_in_queue_millis</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attribute">active_shards_percent_as_number</span>: <span class="hljs-number">50</span> }

</code></pre><p>继续之前，我们先删除最下面的 <code>checkConnection()</code> 调用，因为，我们最终的应用程序将调用外部的连接模块。</p>
<h4><a href="#31---添加函数去重置索引"></a>3.1 - 添加函数去重置索引</h4>
<p>在 <code>server/connection.js</code> 中的 <code>checkConnection</code> 下面添加如下的函数，以便于重置 Elasticsearch 索引。</p>
<pre><code class="hljs stylus"><span class="hljs-comment">/** Clear the index, recreate it, and add mappings */</span>
async function resetIndex (index) {
  <span class="hljs-keyword">if</span> (await client<span class="hljs-selector-class">.indices</span><span class="hljs-selector-class">.exists</span>({ index })) {
    await client<span class="hljs-selector-class">.indices</span><span class="hljs-selector-class">.delete</span>({ index })
  }

  await client<span class="hljs-selector-class">.indices</span><span class="hljs-selector-class">.create</span>({ index })
  await putBookMapping()
}

</code></pre><h4><a href="#32---添加图书模式"></a>3.2 - 添加图书模式</h4>
<p>接下来，我们将为图书的数据模式添加一个 “映射”。在 <code>server/connection.js</code> 中的 <code>resetIndex</code> 函数下面添加如下的函数。</p>
<pre><code class="hljs scala"><span class="hljs-comment">/** Add book section schema mapping to ES */</span>
async function putBookMapping () {
  const schema = {
    title: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'keywor</span>d' },
    author: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'keywor</span>d' },
    location: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'intege</span>r' },
    text: { <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'tex</span>t' }
  }

  <span class="hljs-keyword">return</span> client.indices.putMapping({ index, <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">body</span></span>: { properties: schema } })
}

</code></pre><p>这是为 <code>book</code> 索引定义了一个映射。Elasticsearch 中的 <code>index</code> 大概类似于 SQL 的 <code>table</code> 或者 MongoDB 的  <code>collection</code>。我们通过添加映射来为存储的文档指定每个字段和它的数据类型。Elasticsearch 是无模式的，因此，从技术角度来看，我们是不需要添加映射的，但是，这样做，我们可以更好地控制如何处理数据。</p>
<p>比如，我们给 <code>title</code> 和 <code>author</code> 字段分配 <code>keyword</code> 类型，给 <code>text</code> 字段分配 <code>text</code> 类型。之所以这样做的原因是，搜索引擎可以区别处理这些字符串字段 —— 在搜索的时候，搜索引擎将在 <code>text</code> 字段中搜索可能的匹配项，而对于 <code>keyword</code> 类型字段，将对它们进行全文匹配。这看上去差别很小，但是它们对在不同的搜索上的速度和行为的影响非常大。</p>
<p>在文件的底部，导出对外发布的属性和函数，这样我们的应用程序中的其它模块就可以访问它们了。</p>
<pre><code class="hljs fortran"><span class="hljs-keyword">module</span>.exports = {
  client, <span class="hljs-built_in">index</span>, <span class="hljs-keyword">type</span>, checkConnection, resetIndex
}

</code></pre><h3><a href="#4---加载原始数据"></a>4 - 加载原始数据</h3>
<p>我们将使用来自 <a href="https://www.gutenberg.org/">古登堡项目</a> 的数据 ——  它致力于为公共提供免费的线上电子书。在这个项目中，我们将使用 100 本经典图书来充实我们的图书馆，包括《福尔摩斯探案集》、《金银岛》、《基督山复仇记》、《环游世界八十天》、《罗密欧与朱丽叶》 和《奥德赛》。</p>
<p><a href="https://camo.githubusercontent.com/a5f71ecec9dcda5efe89e6fa0f53844aeeeab1da/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f626f6f6b732e6a7067"><img src="https://p0.ssl.qhimg.com/t018438f7bb5e86dd56.jpg" alt="Book Covers"></a></p>
<h4><a href="#41---下载图书文件"></a>4.1 - 下载图书文件</h4>
<p>我将这 100 本书打包成一个文件，你可以从这里下载它 —— <a href="https://cdn.patricktriest.com/data/books.zip">https://cdn.patricktriest.com/data/books.zip</a></p>
<p>将这个文件解压到你的项目的 <code>books/</code> 目录中。</p>
<p>你可以使用以下的命令来完成（需要在命令行下使用 <a href="https://www.gnu.org/software/wget/">wget</a> 和 <a href="https://theunarchiver.com/command-line">The Unarchiver</a>）。</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">wget</span> https://cdn.patricktriest.com/<span class="hljs-meta">data</span>/<span class="hljs-keyword">books.zip
</span><span class="hljs-symbol">unar</span> <span class="hljs-keyword">books.zip
</span>
</code></pre><h4><a href="#42---预览一本书"></a>4.2 - 预览一本书</h4>
<p>尝试打开其中的一本书的文件，假设打开的是 <code>219-0.txt</code>。你将注意到它开头是一个公开访问的协议，接下来是一些标识这本书的书名、作者、发行日期、语言和字符编码的行。</p>
<pre><code class="hljs http"><span class="hljs-attribute">Title</span>: Heart of Darkness

<span class="http"><span class="hljs-attribute">Author</span>: Joseph Conrad

<span class="sql"><span class="hljs-keyword">Release</span> <span class="hljs-built_in">Date</span>: February <span class="hljs-number">1995</span> [EBook #<span class="hljs-number">219</span>]
<span class="hljs-keyword">Last</span> <span class="hljs-keyword">Updated</span>: September <span class="hljs-number">7</span>, <span class="hljs-number">2016</span>

<span class="hljs-keyword">Language</span>: English

<span class="hljs-built_in">Character</span> <span class="hljs-keyword">set</span> <span class="hljs-keyword">encoding</span>: UTF<span class="hljs-number">-8</span>

</span></span></code></pre><p>在 <code>*** START OF THIS PROJECT GUTENBERG EBOOK HEART OF DARKNESS ***</code> 这些行后面，是这本书的正式内容。</p>
<p>如果你滚动到本书的底部，你将看到类似 <code>*** END OF THIS PROJECT GUTENBERG EBOOK HEART OF DARKNESS ***</code> 信息，接下来是本书更详细的协议版本。</p>
<p>下一步，我们将使用程序从文件头部来解析书的元数据，提取 <code>*** START OF</code> 和 <code>***END OF</code> 之间的内容。</p>
<h4><a href="#43---读取数据目录"></a>4.3 - 读取数据目录</h4>
<p>我们将写一个脚本来读取每本书的内容，并将这些数据添加到 Elasticsearch。我们将定义一个新的 Javascript 文件 <code>server/load_data.js</code> 来执行这些操作。</p>
<p>首先，我们将从 <code>books/</code> 目录中获取每个文件的列表。</p>
<p>在 <code>server/load_data.js</code> 中添加下列内容。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> esConnection = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./connection'</span>)

<span class="hljs-comment">/** Clear ES index, parse and index all files from the books directory */</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readAndInsertBooks</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// Clear previous ES index</span>
    <span class="hljs-keyword">await</span> esConnection.resetIndex()

    <span class="hljs-comment">// Read books directory</span>
    <span class="hljs-keyword">let</span> files = fs.readdirSync(<span class="hljs-string">'./books'</span>).filter(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> file.slice(<span class="hljs-number">-4</span>) === <span class="hljs-string">'.txt'</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Found <span class="hljs-subst">${files.length}</span> Files`</span>)

    <span class="hljs-comment">// Read each book file, and index each paragraph in elasticsearch</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> file <span class="hljs-keyword">of</span> files) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Reading File - <span class="hljs-subst">${file}</span>`</span>)
      <span class="hljs-keyword">const</span> filePath = path.join(<span class="hljs-string">'./books'</span>, file)
      <span class="hljs-keyword">const</span> { title, author, paragraphs } = parseBookFile(filePath)
      <span class="hljs-keyword">await</span> insertBookData(title, author, paragraphs)
    }
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.error(err)
  }
}

readAndInsertBooks()

</code></pre><p>我们将使用一个快捷命令来重构我们的 Node.js 应用程序，并更新运行的容器。</p>
<p>运行 <code>docker-compose up -d --build</code> 去更新应用程序。这是运行  <code>docker-compose build</code> 和 <code>docker-compose up -d</code> 的快捷命令。</p>
<p><a href="https://camo.githubusercontent.com/e584463ffe367ef40c9ec56e75007443146449fc/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f315f302e706e67"><img src="https://p0.ssl.qhimg.com/t01d68f69e4616834f3.png" alt="docker build output"></a></p>
<p>为了在容器中运行我们的 <code>load_data</code> 脚本，我们运行 <code>docker exec gs-api "node" "server/load_data.js"</code> 。你将看到 Elasticsearch 的状态输出 <code>Found 100 Books</code>。</p>
<p>这之后，脚本发生了错误退出，原因是我们调用了一个没有定义的辅助函数（<code>parseBookFile</code>）。</p>
<p><a href="https://camo.githubusercontent.com/5a0ab75bd9d3d97cc49fc54915f776013b48f71a/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f315f312e706e67"><img src="https://p0.ssl.qhimg.com/t01bf78ff371f162823.png" alt="docker exec output"></a></p>
<h4><a href="#44---读取数据文件"></a>4.4 - 读取数据文件</h4>
<p>接下来，我们读取元数据和每本书的内容。</p>
<p>在 <code>server/load_data.js</code> 中定义新函数。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">/** Read an individual book text file, and extract the title, author, and paragraphs */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parseBookFile</span> (<span class="hljs-params">filePath</span>) </span>{
  <span class="hljs-comment">// Read text file</span>
  <span class="hljs-keyword">const</span> book = fs.readFileSync(filePath, <span class="hljs-string">'utf8'</span>)

  <span class="hljs-comment">// Find book title and author</span>
  <span class="hljs-keyword">const</span> title = book.match(<span class="hljs-regexp">/^Title:\s(.+)$/m</span>)[<span class="hljs-number">1</span>]
  <span class="hljs-keyword">const</span> authorMatch = book.match(<span class="hljs-regexp">/^Author:\s(.+)$/m</span>)
  <span class="hljs-keyword">const</span> author = (!authorMatch || authorMatch[<span class="hljs-number">1</span>].trim() === <span class="hljs-string">''</span>) ? <span class="hljs-string">'Unknown Author'</span> : authorMatch[<span class="hljs-number">1</span>]

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Reading Book - <span class="hljs-subst">${title}</span> By <span class="hljs-subst">${author}</span>`</span>)

  <span class="hljs-comment">// Find Guttenberg metadata header and footer</span>
  <span class="hljs-keyword">const</span> startOfBookMatch = book.match(<span class="hljs-regexp">/^\*{3}\s*START OF (THIS|THE) PROJECT GUTENBERG EBOOK.+\*{3}$/m</span>)
  <span class="hljs-keyword">const</span> startOfBookIndex = startOfBookMatch.index + startOfBookMatch[<span class="hljs-number">0</span>].length
  <span class="hljs-keyword">const</span> endOfBookIndex = book.match(<span class="hljs-regexp">/^\*{3}\s*END OF (THIS|THE) PROJECT GUTENBERG EBOOK.+\*{3}$/m</span>).index

  <span class="hljs-comment">// Clean book text and split into array of paragraphs</span>
  <span class="hljs-keyword">const</span> paragraphs = book
    .slice(startOfBookIndex, endOfBookIndex) <span class="hljs-comment">// Remove Guttenberg header and footer</span>
    .split(<span class="hljs-regexp">/\n\s+\n/g</span>) <span class="hljs-comment">// Split each paragraph into it's own array entry</span>
    .map(<span class="hljs-function"><span class="hljs-params">line</span> =&gt;</span> line.replace(<span class="hljs-regexp">/\r\n/g</span>, <span class="hljs-string">' '</span>).trim()) <span class="hljs-comment">// Remove paragraph line breaks and whitespace</span>
    .map(<span class="hljs-function"><span class="hljs-params">line</span> =&gt;</span> line.replace(<span class="hljs-regexp">/_/g</span>, <span class="hljs-string">''</span>)) <span class="hljs-comment">// Guttenberg uses "_" to signify italics.  We'll remove it, since it makes the raw text look messy.</span>
    .filter(<span class="hljs-function">(<span class="hljs-params">line</span>) =&gt;</span> (line &amp;&amp; line.length !== <span class="hljs-string">''</span>)) <span class="hljs-comment">// Remove empty lines</span>

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Parsed <span class="hljs-subst">${paragraphs.length}</span> Paragraphs\n`</span>)
  <span class="hljs-keyword">return</span> { title, author, paragraphs }
}

</code></pre><p>这个函数执行几个重要的任务。</p>
<ol>
<li>从文件系统中读取书的文本。</li>
<li>使用正则表达式（关于正则表达式，请参阅 <a href="https://blog.patricktriest.com/you-should-learn-regex/">这篇文章</a> ）解析书名和作者。</li>
<li>通过匹配 “古登堡项目” 的头部和尾部，识别书的正文内容。</li>
<li>提取书的内容文本。</li>
<li>分割每个段落到它的数组中。</li>
<li>清理文本并删除空白行。</li>
</ol>
<p>它的返回值，我们将构建一个对象，这个对象包含书名、作者、以及书中各段落的数组。</p>
<p>再次运行 <code>docker-compose up -d --build</code> 和 <code>docker exec gs-api "node" "server/load_data.js"</code>，你将看到输出同之前一样，在输出的末尾有三个额外的行。</p>
<p><a href="https://camo.githubusercontent.com/24bd4ac518d3a977766ff7df68c41901a5e0bea1/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f325f302e706e67"><img src="https://p0.ssl.qhimg.com/t0142945801c7c2f953.png" alt="docker exec output"></a></p>
<p>成功！我们的脚本从文本文件中成功解析出了书名和作者。脚本再次以错误结束，因为到现在为止，我们还没有定义辅助函数。</p>
<h4><a href="#45---在-es-中索引数据文件"></a>4.5 - 在 ES 中索引数据文件</h4>
<p>最后一步，我们将批量上传每个段落的数组到 Elasticsearch 索引中。</p>
<p>在 <code>load_data.js</code> 中添加新的 <code>insertBookData</code> 函数。</p>
<pre><code class="hljs qml"><span class="hljs-comment">/** Bulk index the book data in Elasticsearch */</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insertBookData</span> (<span class="hljs-params">title, author, paragraphs</span>) </span>{
  <span class="hljs-keyword">let</span> bulkOps = [] <span class="hljs-comment">// Array to store bulk operations</span>

  <span class="hljs-comment">// Add an index operation for each section in the book</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; paragraphs.length; i++) {
    <span class="hljs-comment">// Describe action</span>
    bulkOps.push({ <span class="hljs-attribute">index</span>: { <span class="hljs-attribute">_index</span>: esConnection.index, <span class="hljs-attribute">_type</span>: esConnection.type } })

    <span class="hljs-comment">// Add document</span>
    bulkOps.push({
      author,
      title,
      <span class="hljs-attribute">location</span>: i,
      <span class="hljs-attribute">text</span>: paragraphs[i]
    })

    <span class="hljs-keyword">if</span> (i &gt; <span class="hljs-number">0</span> &amp;&amp; i % <span class="hljs-number">500</span> === <span class="hljs-number">0</span>) { <span class="hljs-comment">// Do bulk insert in 500 paragraph batches</span>
      <span class="hljs-keyword">await</span> esConnection.client.bulk({ <span class="hljs-attribute">body</span>: bulkOps })
      bulkOps = []
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Indexed Paragraphs <span class="hljs-subst">${i - 499}</span> - <span class="hljs-subst">${i}</span>`</span>)
    }
  }

  <span class="hljs-comment">// Insert remainder of bulk ops array</span>
  <span class="hljs-keyword">await</span> esConnection.client.bulk({ <span class="hljs-attribute">body</span>: bulkOps })
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Indexed Paragraphs <span class="hljs-subst">${paragraphs.length - (bulkOps.length / 2)}</span> - <span class="hljs-subst">${paragraphs.length}</span>\n\n\n`</span>)
}

</code></pre><p>这个函数将使用书名、作者和附加元数据的段落位置来索引书中的每个段落。我们通过批量操作来插入段落，它比逐个段落插入要快的多。</p>
<blockquote>
<p>我们分批索引段落，而不是一次性插入全部，是为运行这个应用程序的内存稍有点小（1.7 GB）的服务器  <code>search.patricktriest.com</code> 上做的一个重要优化。如果你的机器内存还行（4 GB 以上），你或许不用分批上传。</p>
</blockquote>
<p>运行 <code>docker-compose up -d --build</code> 和 <code>docker exec gs-api "node" "server/load_data.js"</code> 一次或多次 —— 现在你将看到前面解析的 100 本书的完整输出，并插入到了 Elasticsearch。这可能需要几分钟时间，甚至更长。</p>
<p><a href="https://camo.githubusercontent.com/da296f74143398443b3251835fdd7a68d1cb117a/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f335f302e706e67"><img src="https://p0.ssl.qhimg.com/t01b01e8f5cfbaf2472.png" alt="data loading output"></a></p>
<h3><a href="#5---搜索"></a>5 - 搜索</h3>
<p>现在，Elasticsearch 中已经有了 100 本书了（大约有 230000 个段落），现在我们尝试搜索查询。</p>
<h4><a href="#50---简单的-http-查询"></a>5.0 - 简单的 HTTP 查询</h4>
<p>首先，我们使用 Elasticsearch 的 HTTP API 对它进行直接查询。</p>
<p>在你的浏览器上访问这个 URL - <code>http://localhost:9200/library/_search?q=text:Java&amp;pretty</code></p>
<p>在这里，我们将执行一个极简的全文搜索，在我们的图书馆的书中查找 “Java” 这个词。</p>
<p>你将看到类似于下面的一个 JSON 格式的响应。</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"took"</span> : <span class="hljs-number">11</span>,
  <span class="hljs-attr">"timed_out"</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">"_shards"</span> : {
    <span class="hljs-attr">"total"</span> : <span class="hljs-number">5</span>,
    <span class="hljs-attr">"successful"</span> : <span class="hljs-number">5</span>,
    <span class="hljs-attr">"skipped"</span> : <span class="hljs-number">0</span>,
    <span class="hljs-attr">"failed"</span> : <span class="hljs-number">0</span>
  },
  <span class="hljs-attr">"hits"</span> : {
    <span class="hljs-attr">"total"</span> : <span class="hljs-number">13</span>,
    <span class="hljs-attr">"max_score"</span> : <span class="hljs-number">14.259304</span>,
    <span class="hljs-attr">"hits"</span> : [
      {
        <span class="hljs-attr">"_index"</span> : <span class="hljs-string">"library"</span>,
        <span class="hljs-attr">"_type"</span> : <span class="hljs-string">"novel"</span>,
        <span class="hljs-attr">"_id"</span> : <span class="hljs-string">"p_GwFWEBaZvLlaAUdQgV"</span>,
        <span class="hljs-attr">"_score"</span> : <span class="hljs-number">14.259304</span>,
        <span class="hljs-attr">"_source"</span> : {
          <span class="hljs-attr">"author"</span> : <span class="hljs-string">"Charles Darwin"</span>,
          <span class="hljs-attr">"title"</span> : <span class="hljs-string">"On the Origin of Species"</span>,
          <span class="hljs-attr">"location"</span> : <span class="hljs-number">1080</span>,
          <span class="hljs-attr">"text"</span> : <span class="hljs-string">"Java, plants of, 375."</span>
        }
      },
      {
        <span class="hljs-attr">"_index"</span> : <span class="hljs-string">"library"</span>,
        <span class="hljs-attr">"_type"</span> : <span class="hljs-string">"novel"</span>,
        <span class="hljs-attr">"_id"</span> : <span class="hljs-string">"wfKwFWEBaZvLlaAUkjfk"</span>,
        <span class="hljs-attr">"_score"</span> : <span class="hljs-number">10.186235</span>,
        <span class="hljs-attr">"_source"</span> : {
          <span class="hljs-attr">"author"</span> : <span class="hljs-string">"Edgar Allan Poe"</span>,
          <span class="hljs-attr">"title"</span> : <span class="hljs-string">"The Works of Edgar Allan Poe"</span>,
          <span class="hljs-attr">"location"</span> : <span class="hljs-number">827</span>,
          <span class="hljs-attr">"text"</span> : <span class="hljs-string">"After many years spent in foreign travel, I sailed in the year 18-- , from the port of Batavia, in the rich and populous island of Java, on a voyage to the Archipelago of the Sunda islands. I went as passenger--having no other inducement than a kind of nervous restlessness which haunted me as a fiend."</span>
        }
      },
      ...
    ]
  }
}

</code></pre><p>用 Elasticseach 的 HTTP 接口可以测试我们插入的数据是否成功，但是如果直接将这个 API 暴露给 Web 应用程序将有极大的风险。这个 API 将会暴露管理功能（比如直接添加和删除文档），最理想的情况是完全不要对外暴露它。而是写一个简单的 Node.js API 去接收来自客户端的请求，然后（在我们的本地网络中）生成一个正确的查询发送给 Elasticsearch。</p>
<h4><a href="#51---查询脚本"></a>5.1 - 查询脚本</h4>
<p>我们现在尝试从我们写的 Node.js 脚本中查询 Elasticsearch。</p>
<p>创建一个新文件，<code>server/search.js</code>。</p>
<pre><code class="hljs vim">const { client, <span class="hljs-built_in">index</span>, <span class="hljs-built_in">type</span> } = require(<span class="hljs-string">'./connection'</span>)

module.exports = {
  /** Query ES <span class="hljs-built_in">index</span> <span class="hljs-keyword">for</span> the provided term */
  queryTerm (term, offset = <span class="hljs-number">0</span>) {
    const body = {
      from: offset,
      query: { <span class="hljs-keyword">match</span>: {
        tex<span class="hljs-variable">t:</span> {
          query: term,
          operator: <span class="hljs-string">'and'</span>,
          fuzzines<span class="hljs-variable">s:</span> <span class="hljs-string">'auto'</span>
        } } },
      highligh<span class="hljs-variable">t:</span> { field<span class="hljs-variable">s:</span> { tex<span class="hljs-variable">t:</span> {} } }
    }

    <span class="hljs-keyword">return</span> client.<span class="hljs-built_in">search</span>({ <span class="hljs-built_in">index</span>, <span class="hljs-built_in">type</span>, body })
  }
}

</code></pre><p>我们的搜索模块定义一个简单的 <code>search</code> 函数，它将使用输入的词 <code>match</code> 查询。</p>
<p>这是查询的字段分解 -</p>
<ul>
<li><code>from</code> - 允许我们分页查询结果。默认每个查询返回 10 个结果，因此，指定 <code>from: 10</code> 将允许我们取回 10-20 的结果。</li>
<li><code>query</code> - 这里我们指定要查询的词。</li>
<li><code>operator</code> - 我们可以修改搜索行为；在本案例中，我们使用 <code>and</code> 操作去对查询中包含所有字元（要查询的词）的结果来确定优先顺序。</li>
<li><code>fuzziness</code> - 对拼写错误的容错调整，<code>auto</code> 的默认为 <code>fuzziness: 2</code>。模糊值越高，结果越需要更多校正。比如，<code>fuzziness: 1</code> 将允许以 <code>Patricc</code> 为关键字的查询中返回与 <code>Patrick</code> 匹配的结果。</li>
<li><code>highlights</code> - 为结果返回一个额外的字段，这个字段包含 HTML，以显示精确的文本字集和查询中匹配的关键词。</li>
</ul>
<p>你可以去浏览 <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html">Elastic Full-Text Query DSL</a>，学习如何随意调整这些参数，以进一步自定义搜索查询。</p>
<h3><a href="#6---api"></a>6 - API</h3>
<p>为了能够从前端应用程序中访问我们的搜索功能，我们来写一个快速的 HTTP API。</p>
<h4><a href="#60---api-服务器"></a>6.0 - API 服务器</h4>
<p>用以下的内容替换现有的 <code>server/app.js</code> 文件。</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>)
<span class="hljs-keyword">const</span> joi = <span class="hljs-built_in">require</span>(<span class="hljs-string">'joi'</span>)
<span class="hljs-keyword">const</span> validate = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-joi-validate'</span>)
<span class="hljs-keyword">const</span> search = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./search'</span>)

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

<span class="hljs-comment">// Log each request to the console</span>
app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">const</span> start = <span class="hljs-built_in">Date</span>.now()
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-keyword">const</span> ms = <span class="hljs-built_in">Date</span>.now() - start
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ctx.method}</span> <span class="hljs-subst">${ctx.url}</span> - <span class="hljs-subst">${ms}</span>`</span>)
})

<span class="hljs-comment">// Log percolated errors to the console</span>
app.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Server Error'</span>, err)
})

<span class="hljs-comment">// Set permissive CORS header</span>
app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.set(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>)
  <span class="hljs-keyword">return</span> next()
})

<span class="hljs-comment">// ADD ENDPOINTS HERE</span>

<span class="hljs-keyword">const</span> port = process.env.PORT || <span class="hljs-number">3000</span>

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`App Listening on Port <span class="hljs-subst">${port}</span>`</span>)
  })

</code></pre><p>这些代码将为 <a href="http://koajs.com/">Koa.js</a> Node API 服务器导入服务器依赖，设置简单的日志，以及错误处理。</p>
<h3><a href="#61---使用查询连接端点"></a>6.1 - 使用查询连接端点</h3>
<p>接下来，我们将在服务器上添加一个端点，以便于发布我们的 Elasticsearch 查询功能。</p>
<p>在  <code>server/app.js</code> 文件的 <code>// ADD ENDPOINTS HERE</code>  下面插入下列的代码。</p>
<pre><code class="hljs dart"><span class="hljs-comment"><span class="markdown">/**
 * GET /search
 * Search for </span>a<span class="markdown"> term in </span>the<span class="markdown"> library
 */</span></span>
router.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/search'</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
    <span class="hljs-keyword">const</span> { term, offset } = ctx.request.query
    ctx.body = <span class="hljs-keyword">await</span> search.queryTerm(term, offset)
  }
)

</code></pre><p>使用 <code>docker-compose up -d --build</code> 重启动应用程序。之后在你的浏览器中尝试调用这个搜索端点。比如，<code>http://localhost:3000/search?term=java</code> 这个请求将搜索整个图书馆中提到 “Java” 的内容。</p>
<p>结果与前面直接调用 Elasticsearch HTTP 界面的结果非常类似。</p>
<pre><code class="hljs json">{
    <span class="hljs-attr">"took"</span>: <span class="hljs-number">242</span>,
    <span class="hljs-attr">"timed_out"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"_shards"</span>: {
        <span class="hljs-attr">"total"</span>: <span class="hljs-number">5</span>,
        <span class="hljs-attr">"successful"</span>: <span class="hljs-number">5</span>,
        <span class="hljs-attr">"skipped"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"failed"</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">"hits"</span>: {
        <span class="hljs-attr">"total"</span>: <span class="hljs-number">93</span>,
        <span class="hljs-attr">"max_score"</span>: <span class="hljs-number">13.356944</span>,
        <span class="hljs-attr">"hits"</span>: [{
            <span class="hljs-attr">"_index"</span>: <span class="hljs-string">"library"</span>,
            <span class="hljs-attr">"_type"</span>: <span class="hljs-string">"novel"</span>,
            <span class="hljs-attr">"_id"</span>: <span class="hljs-string">"eHYHJmEBpQg9B4622421"</span>,
            <span class="hljs-attr">"_score"</span>: <span class="hljs-number">13.356944</span>,
            <span class="hljs-attr">"_source"</span>: {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Charles Darwin"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"On the Origin of Species"</span>,
                <span class="hljs-attr">"location"</span>: <span class="hljs-number">1080</span>,
                <span class="hljs-attr">"text"</span>: <span class="hljs-string">"Java, plants of, 375."</span>
            },
            <span class="hljs-attr">"highlight"</span>: {
                <span class="hljs-attr">"text"</span>: [<span class="hljs-string">"&lt;em&gt;Java&lt;/em&gt;, plants of, 375."</span>]
            }
        }, {
            <span class="hljs-attr">"_index"</span>: <span class="hljs-string">"library"</span>,
            <span class="hljs-attr">"_type"</span>: <span class="hljs-string">"novel"</span>,
            <span class="hljs-attr">"_id"</span>: <span class="hljs-string">"2HUHJmEBpQg9B462xdNg"</span>,
            <span class="hljs-attr">"_score"</span>: <span class="hljs-number">9.030668</span>,
            <span class="hljs-attr">"_source"</span>: {
                <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Unknown Author"</span>,
                <span class="hljs-attr">"title"</span>: <span class="hljs-string">"The King James Bible"</span>,
                <span class="hljs-attr">"location"</span>: <span class="hljs-number">186</span>,
                <span class="hljs-attr">"text"</span>: <span class="hljs-string">"10:4 And the sons of Javan; Elishah, and Tarshish, Kittim, and Dodanim."</span>
            },
            <span class="hljs-attr">"highlight"</span>: {
                <span class="hljs-attr">"text"</span>: [<span class="hljs-string">"10:4 And the sons of &lt;em&gt;Javan&lt;/em&gt;; Elishah, and Tarshish, Kittim, and Dodanim."</span>]
            }
        }
        ...
      ]
   }
}

</code></pre><h3><a href="#62---输入校验"></a>6.2 - 输入校验</h3>
<p>这个端点现在还很脆弱 —— 我们没有对请求参数做任何的校验，因此，如果是无效的或者错误的值将使服务器出错。</p>
<p>我们将添加一些使用 <a href="https://github.com/hapijs/joi">Joi</a> 和 <a href="https://github.com/triestpa/koa-joi-validate">Koa-Joi-Validate</a> 库的中间件，以对输入做校验。</p>
<pre><code class="hljs vim">/**
 * GET /<span class="hljs-built_in">search</span>
 * Search <span class="hljs-keyword">for</span> <span class="hljs-keyword">a</span> term in the library
 * Query Params -
 * term: <span class="hljs-built_in">string</span> under <span class="hljs-number">60</span> characters
 * offse<span class="hljs-variable">t:</span> positive integer
 */
router.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/search'</span>,
  validate({
    query: {
      term: joi.<span class="hljs-built_in">string</span>().<span class="hljs-built_in">max</span>(<span class="hljs-number">60</span>).required(),
      offse<span class="hljs-variable">t:</span> joi.<span class="hljs-keyword">number</span>().integer().<span class="hljs-built_in">min</span>(<span class="hljs-number">0</span>).default(<span class="hljs-number">0</span>)
    }
  }),
  async (ctx, <span class="hljs-keyword">next</span>) =&gt; {
    const { term, offset } = ctx.request.query
    ctx.body = await <span class="hljs-built_in">search</span>.queryTerm(term, offset)
  }
)

</code></pre><p>现在，重启服务器，如果你使用一个没有搜索关键字的请求（<code>http://localhost:3000/search</code>），你将返回一个带相关消息的 HTTP 400 错误，比如像 <code>Invalid URL Query - child "term" fails because ["term" is required]</code>。</p>
<p>如果想从 Node 应用程序中查看实时日志，你可以运行 <code>docker-compose logs -f api</code>。</p>
<h3><a href="#7---前端应用程序"></a>7 - 前端应用程序</h3>
<p>现在我们的 <code>/search</code> 端点已经就绪，我们来连接到一个简单的 Web 应用程序来测试这个 API。</p>
<h4><a href="#70---vuejs-应用程序"></a>7.0 - Vue.js 应用程序</h4>
<p>我们将使用 Vue.js 去协调我们的前端。</p>
<p>添加一个新文件 <code>/public/app.js</code>，去控制我们的 Vue.js 应用程序代码。</p>
<pre><code class="hljs kotlin">const vm = new Vue ({
  el: <span class="hljs-string">'#vue-instance'</span>,
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      baseUrl: <span class="hljs-string">'http://localhost:3000'</span>, <span class="hljs-comment">// API url</span>
      searchTerm: <span class="hljs-string">'Hello World'</span>, <span class="hljs-comment">// Default search term</span>
      searchDebounce: <span class="hljs-literal">null</span>, <span class="hljs-comment">// Timeout for search bar debounce</span>
      searchResults: [], <span class="hljs-comment">// Displayed search results</span>
      numHits: <span class="hljs-literal">null</span>, <span class="hljs-comment">// Total search results found</span>
      searchOffset: <span class="hljs-number">0</span>, <span class="hljs-comment">// Search result pagination offset</span>

      selectedParagraph: <span class="hljs-literal">null</span>, <span class="hljs-comment">// Selected paragraph object</span>
      bookOffset: <span class="hljs-number">0</span>, <span class="hljs-comment">// Offset for book paragraphs being displayed</span>
      paragraphs: [] <span class="hljs-comment">// Paragraphs being displayed in book preview window</span>
    }
  },
  async created () {
    <span class="hljs-keyword">this</span>.searchResults = await <span class="hljs-keyword">this</span>.search() <span class="hljs-comment">// Search for default term</span>
  },
  methods: {
    <span class="hljs-comment">/** Debounce search input by 100 ms */</span>
    onSearchInput () {
      clearTimeout(<span class="hljs-keyword">this</span>.searchDebounce)
      <span class="hljs-keyword">this</span>.searchDebounce = setTimeout(async () =&gt; {
        <span class="hljs-keyword">this</span>.searchOffset = <span class="hljs-number">0</span>
        <span class="hljs-keyword">this</span>.searchResults = await <span class="hljs-keyword">this</span>.search()
      }, <span class="hljs-number">100</span>)
    },
    <span class="hljs-comment">/** Call API to search for inputted term */</span>
    async search () {
      const response = await axios.<span class="hljs-keyword">get</span>(`${<span class="hljs-keyword">this</span>.baseUrl}/search`, { params: { term: <span class="hljs-keyword">this</span>.searchTerm, offset: <span class="hljs-keyword">this</span>.searchOffset } })
      <span class="hljs-keyword">this</span>.numHits = response.<span class="hljs-keyword">data</span>.hits.total
      <span class="hljs-keyword">return</span> response.<span class="hljs-keyword">data</span>.hits.hits
    },
    <span class="hljs-comment">/** Get next page of search results */</span>
    async nextResultsPage () {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.numHits &gt; <span class="hljs-number">10</span>) {
        <span class="hljs-keyword">this</span>.searchOffset += <span class="hljs-number">10</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.searchOffset + <span class="hljs-number">10</span> &gt; <span class="hljs-keyword">this</span>.numHits) { <span class="hljs-keyword">this</span>.searchOffset = <span class="hljs-keyword">this</span>.numHits - <span class="hljs-number">10</span>}
        <span class="hljs-keyword">this</span>.searchResults = await <span class="hljs-keyword">this</span>.search()
        document.documentElement.scrollTop = <span class="hljs-number">0</span>
      }
    },
    <span class="hljs-comment">/** Get previous page of search results */</span>
    async prevResultsPage () {
      <span class="hljs-keyword">this</span>.searchOffset -= <span class="hljs-number">10</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.searchOffset &lt; <span class="hljs-number">0</span>) { <span class="hljs-keyword">this</span>.searchOffset = <span class="hljs-number">0</span> }
      <span class="hljs-keyword">this</span>.searchResults = await <span class="hljs-keyword">this</span>.search()
      document.documentElement.scrollTop = <span class="hljs-number">0</span>
    }
  }
})

</code></pre><p>这个应用程序非常简单 —— 我们只定义了一些共享的数据属性，以及添加了检索和分页搜索结果的方法。为防止每次按键一次都调用 API，搜索输入有一个 100 毫秒的除颤功能。</p>
<p>解释 Vue.js 是如何工作的已经超出了本教程的范围，如果你使用过 Angular 或者 React，其实一些也不可怕。如果你完全不熟悉 Vue，想快速了解它的功能，我建议你从官方的快速指南入手 —— <a href="https://vuejs.org/v2/guide/">https://vuejs.org/v2/guide/</a></p>
<h4><a href="#71---html"></a>7.1 - HTML</h4>
<p>使用以下的内容替换 <code>/public/index.html</code> 文件中的占位符，以便于加载我们的 Vue.js 应用程序和设计一个基本的搜索界面。</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Elastic Library<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Literary Classic Search Engine."</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.muicss.com/mui-0.9.20/css/mui.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://fonts.googleapis.com/css?family=EB+Garamond:400,700|Open+Sans"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"styles.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"app-container"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"vue-instance"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Search Bar Header --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-panel"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-textfield"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"searchTerm"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-on:keyup</span>=<span class="hljs-string">"onSearchInput()"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Search<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Search Metadata Card --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-panel"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-headline"</span>&gt;</span></span><span class="hljs-template-variable">"{{" numHits "}}"</span><span class="xml"> Hits<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-subhead"</span>&gt;</span>Displaying Results </span><span class="hljs-template-variable">"{{" searchOffset "}}"</span><span class="xml"> - </span><span class="hljs-template-variable">"{{" searchOffset + 9 "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Top Pagination Card --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-panel pagination-panel"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn--flat"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"prevResultsPage()"</span>&gt;</span>Prev Page<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn--flat"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"nextResultsPage()"</span>&gt;</span>Next Page<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Search Results Card List --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-results"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"searchResults"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-panel"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"hit in searchResults"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"showBookModal(hit)"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-title"</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"hit.highlight.text[0]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-divider"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-subhead"</span>&gt;</span></span><span class="hljs-template-variable">"{{" hit._source.title "}}"</span><span class="xml"> - </span><span class="hljs-template-variable">"{{" hit._source.author "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-body2"</span>&gt;</span>Location </span><span class="hljs-template-variable">"{{" hit._source.location "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Bottom Pagination Card --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-panel pagination-panel"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn--flat"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"prevResultsPage()"</span>&gt;</span>Prev Page<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn--flat"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"nextResultsPage()"</span>&gt;</span>Next Page<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- INSERT BOOK MODAL HERE --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.muicss.com/mui-0.9.28/js/mui.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.3/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.0/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"app.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</span></code></pre><h4><a href="#72---css"></a>7.2 - CSS</h4>
<p>添加一个新文件 <code>/public/styles.css</code>，使用一些自定义的 UI 样式。</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'EB Garamond'</span>, serif; }

<span class="hljs-selector-class">.mui-textfield</span> &gt; <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-class">.mui-btn</span>, <span class="hljs-selector-class">.mui--text-subhead</span>, <span class="hljs-selector-class">.mui-panel</span> &gt; <span class="hljs-selector-class">.mui--text-headline</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Open Sans'</span>, sans-serif;
}

<span class="hljs-selector-class">.all-caps</span> { <span class="hljs-attribute">text-transform</span>: uppercase; }
<span class="hljs-selector-class">.app-container</span> { <span class="hljs-attribute">padding</span>: <span class="hljs-number">16px</span>; }
<span class="hljs-selector-class">.search-results</span> <span class="hljs-selector-tag">em</span> { <span class="hljs-attribute">font-weight</span>: bold; }
<span class="hljs-selector-class">.book-modal</span> &gt; <span class="hljs-selector-tag">button</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; }
<span class="hljs-selector-class">.search-results</span> <span class="hljs-selector-class">.mui-divider</span> { <span class="hljs-attribute">margin</span>: <span class="hljs-number">14px</span> <span class="hljs-number">0</span>; }

<span class="hljs-selector-class">.search-results</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: row;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
  <span class="hljs-attribute">justify-content</span>: space-around;
}

<span class="hljs-selector-class">.search-results</span> &gt; <span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">45%</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">cursor</span>: pointer;
}

@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">600px</span>) {
  <span class="hljs-selector-class">.search-results</span> &gt; <span class="hljs-selector-tag">div</span> { <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">100%</span>; }
}

<span class="hljs-selector-class">.paragraphs-container</span> {
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">800px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">48px</span>;
}

<span class="hljs-selector-class">.paragraphs-container</span> <span class="hljs-selector-class">.mui--text-body1</span>, <span class="hljs-selector-class">.paragraphs-container</span> <span class="hljs-selector-class">.mui--text-body2</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.8rem</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">35px</span>;
}

<span class="hljs-selector-class">.book-modal</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span> <span class="hljs-number">10%</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">background-color</span>: white;
  <span class="hljs-attribute">overflow-y</span>: scroll;
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.pagination-panel</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: space-between;
}

<span class="hljs-selector-class">.title-row</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: space-between;
  <span class="hljs-attribute">align-items</span>: flex-end;
}

@<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">600px</span>) {
  <span class="hljs-selector-class">.title-row</span>{ 
    <span class="hljs-attribute">flex-direction</span>: column; 
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">align-items</span>: center
  }
}

<span class="hljs-selector-class">.locations-label</span> {
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">8px</span>;
}

<span class="hljs-selector-class">.modal-footer</span> {
  <span class="hljs-attribute">position</span>: fixed;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: space-around;
  <span class="hljs-attribute">background</span>: white;
}

</code></pre><h4><a href="#73---尝试输出"></a>7.3 - 尝试输出</h4>
<p>在你的浏览器中打开 <code>localhost:8080</code>，你将看到一个简单的带结果分页功能的搜索界面。在顶部的搜索框中尝试输入不同的关键字来查看它们的搜索情况。</p>
<p><a href="https://camo.githubusercontent.com/acd5151556e06cf9a620e496d6af03917df9dc8b/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f345f302e706e67"><img src="https://camo.githubusercontent.com/acd5151556e06cf9a620e496d6af03917df9dc8b/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f345f302e706e67" alt="preview webapp"></a></p>
<blockquote>
<p>你没有必要重新运行 <code>docker-compose up</code> 命令以使更改生效。本地的 <code>public</code> 目录是装载在我们的 Nginx 文件服务器容器中，因此，在本地系统中前端的变化将在容器化应用程序中自动反映出来。</p>
</blockquote>
<p>如果你尝试点击任何搜索结果，什么反应也没有 —— 因为我们还没有为这个应用程序添加进一步的相关功能。</p>
<h3><a href="#8---分页预览"></a>8 - 分页预览</h3>
<p>如果能点击每个搜索结果，然后查看到来自书中的内容，那将是非常棒的体验。</p>
<h3><a href="#80---添加-elasticsearch-查询"></a>8.0 - 添加 Elasticsearch 查询</h3>
<p>首先，我们需要定义一个简单的查询去从给定的书中获取段落范围。</p>
<p>在 <code>server/search.js</code> 文件中添加如下的函数到 <code>module.exports</code> 块中。</p>
<pre><code class="hljs xquery">/** Get the specified range <span class="hljs-keyword">of</span> paragraphs from a book */
getParagraphs (bookTitle, startLocation, endLocation) {
  const filter = [
    { term: { title: bookTitle } },
    { range: { location: { gte: startLocation, lte: endLocation } } }
  ]

  const body = {
    size: endLocation - startLocation,
    sort: { location: <span class="hljs-string">'asc'</span> },
    query: { bool: { filter } }
  }

  return client.search({ index, type, body })
}

</code></pre><p>这个新函数将返回给定的书的开始位置和结束位置之间的一个排序后的段落数组。</p>
<h4><a href="#81---添加-api-端点"></a>8.1 - 添加 API 端点</h4>
<p>现在，我们将这个函数链接到 API 端点。</p>
<p>添加下列内容到 <code>server/app.js</code> 文件中最初的 <code>/search</code> 端点下面。</p>
<pre><code class="hljs vim">/**
 * GET /paragraphs
 * Get <span class="hljs-keyword">a</span> <span class="hljs-built_in">range</span> of paragraphs from the specified book
 * Query Params -
 * bookTitle: <span class="hljs-built_in">string</span> under <span class="hljs-number">256</span> characters
 * <span class="hljs-keyword">star</span><span class="hljs-variable">t:</span> positive integer
 * end: positive integer greater than start
 */
router.<span class="hljs-built_in">get</span>(<span class="hljs-string">'/paragraphs'</span>,
  validate({
    query: {
      bookTitle: joi.<span class="hljs-built_in">string</span>().<span class="hljs-built_in">max</span>(<span class="hljs-number">256</span>).required(),
      <span class="hljs-keyword">star</span><span class="hljs-variable">t:</span> joi.<span class="hljs-keyword">number</span>().integer().<span class="hljs-built_in">min</span>(<span class="hljs-number">0</span>).default(<span class="hljs-number">0</span>),
      end: joi.<span class="hljs-keyword">number</span>().integer().greater(joi.ref(<span class="hljs-string">'start'</span>)).default(<span class="hljs-number">10</span>)
    }
  }),
  async (ctx, <span class="hljs-keyword">next</span>) =&gt; {
    const { bookTitle, start, end } = ctx.request.query
    ctx.body = await <span class="hljs-built_in">search</span>.getParagraphs(bookTitle, start, end)
  }
)

</code></pre><h4><a href="#82---添加-ui-功能"></a>8.2 - 添加 UI 功能</h4>
<p>现在，我们的新端点已经就绪，我们为应用程序添加一些从书中查询和显示全部页面的前端功能。</p>
<p>在 <code>/public/app.js</code> 文件的 <code>methods</code> 块中添加如下的函数。</p>
<pre><code class="hljs cs">    <span class="hljs-comment">/** Call the API to get current page of paragraphs */</span>
    <span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">getParagraphs</span> (<span class="hljs-params">bookTitle, offset</span>) </span>{
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">this</span>.bookOffset = offset
        <span class="hljs-keyword">const</span> start = <span class="hljs-keyword">this</span>.bookOffset
        <span class="hljs-keyword">const</span> end = <span class="hljs-keyword">this</span>.bookOffset + <span class="hljs-number">10</span>
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> axios.<span class="hljs-keyword">get</span>(`${<span class="hljs-keyword">this</span>.baseUrl}/paragraphs`, { <span class="hljs-keyword">params</span>: { bookTitle, start, end } })
        <span class="hljs-keyword">return</span> response.data.hits.hits
      } <span class="hljs-keyword">catch</span> (err) {
        console.error(err)
      }
    },
    <span class="hljs-comment">/** Get next page (next 10 paragraphs) of selected book */</span>
    <span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">nextBookPage</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.$refs.bookModal.scrollTop = <span class="hljs-number">0</span>
      <span class="hljs-keyword">this</span>.paragraphs = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.getParagraphs(<span class="hljs-keyword">this</span>.selectedParagraph._source.title, <span class="hljs-keyword">this</span>.bookOffset + <span class="hljs-number">10</span>)
    },
    <span class="hljs-comment">/** Get previous page (previous 10 paragraphs) of selected book */</span>
    <span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">prevBookPage</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.$refs.bookModal.scrollTop = <span class="hljs-number">0</span>
      <span class="hljs-keyword">this</span>.paragraphs = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.getParagraphs(<span class="hljs-keyword">this</span>.selectedParagraph._source.title, <span class="hljs-keyword">this</span>.bookOffset - <span class="hljs-number">10</span>)
    },
    <span class="hljs-comment">/** Display paragraphs from selected book in modal window */</span>
    <span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">showBookModal</span> (<span class="hljs-params">searchHit</span>) </span>{
      <span class="hljs-keyword">try</span> {
        document.body.style.overflow = <span class="hljs-string">'hidden'</span>
        <span class="hljs-keyword">this</span>.selectedParagraph = searchHit
        <span class="hljs-keyword">this</span>.paragraphs = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.getParagraphs(searchHit._source.title, searchHit._source.location - <span class="hljs-number">5</span>)
      } <span class="hljs-keyword">catch</span> (err) {
        console.error(err)
      }
    },
    <span class="hljs-comment">/** Close the book detail modal */</span>
    closeBookModal () {
      document.body.style.overflow = <span class="hljs-string">'auto'</span>
      <span class="hljs-keyword">this</span>.selectedParagraph = <span class="hljs-literal">null</span>
    }

</code></pre><p>这五个函数提供了通过页码从书中下载和分页（每次十个段落）的逻辑。</p>
<p>现在，我们需要添加一个 UI 去显示书的页面。在 <code>/public/index.html</code> 的 <code>&lt;!-- INSERT BOOK MODAL HERE --&gt;</code> 注释下面添加如下的内容。</p>
<pre><code class="hljs django"><span class="xml">    <span class="hljs-comment">&lt;!-- Book Paragraphs Modal Window --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"selectedParagraph"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"bookModal"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"book-modal"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"paragraphs-container"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- Book Section Metadata --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title-row"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-display2 all-caps"</span>&gt;</span></span><span class="hljs-template-variable">"{{" selectedParagraph._source.title "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-display1"</span>&gt;</span></span><span class="hljs-template-variable">"{{" selectedParagraph._source.author "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-divider"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-subhead locations-label"</span>&gt;</span>Locations </span><span class="hljs-template-variable">"{{" bookOffset - 5 "}}"</span><span class="xml"> to </span><span class="hljs-template-variable">"{{" bookOffset + 5 "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-divider"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- Book Paragraphs --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"paragraph in paragraphs"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"paragraph._source.location === selectedParagraph._source.location"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-body2"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span></span><span class="hljs-template-variable">"{{" paragraph._source.text "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-else</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui--text-body1"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{" paragraph._source.text "}}"</span><span class="xml">
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-comment">&lt;!-- Book Pagination Footer --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-footer"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn--flat"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"prevBookPage()"</span>&gt;</span>Prev Page<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn--flat"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"closeBookModal()"</span>&gt;</span>Close<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-btn mui-btn--flat"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"nextBookPage()"</span>&gt;</span>Next Page<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

</span></code></pre><p>再次重启应用程序服务器（<code>docker-compose up -d --build</code>），然后打开 <code>localhost:8080</code>。当你再次点击搜索结果时，你将能看到关键字附近的段落。如果你感兴趣，你现在甚至可以看这本书的剩余部分。</p>
<p><a href="https://camo.githubusercontent.com/ba9b4db3b7c61d0f07599bb31cd5153ad55d4023/68747470733a2f2f63646e2e7061747269636b7472696573742e636f6d2f626c6f672f696d616765732f706f7374732f656c61737469632d6c6962726172792f73616d706c655f355f302e706e67"><img src="https://p0.ssl.qhimg.com/t01aef6adb3917a4400.png" alt="preview webapp book page"></a></p>
<p>祝贺你！你现在已经完成了本教程的应用程序。</p>
<p>你可以去比较你的本地结果与托管在这里的完整示例 —— <a href="https://search.patricktriest.com/">https://search.patricktriest.com/</a></p>
<h3><a href="#9---elasticsearch-的缺点"></a>9 - Elasticsearch 的缺点</h3>
<h4><a href="#90---耗费资源"></a>9.0 - 耗费资源</h4>
<p>Elasticsearch 是计算密集型的。<a href="https://www.elastic.co/guide/en/elasticsearch/guide/current/hardware.html">官方建议</a> 运行 ES 的机器最好有 64 GB 的内存，强烈反对在低于 8 GB 内存的机器上运行它。Elasticsearch 是一个 <em>内存中</em> 数据库，这样使它的查询速度非常快，但这也非常占用系统内存。在生产系统中使用时，<a href="https://www.elastic.co/guide/en/elasticsearch/guide/2.x/distributed-cluster.html">他们强烈建议在一个集群中运行多个 Elasticsearch 节点</a>，以实现高可用、自动分区和一个节点失败时的数据冗余。</p>
<p>我们的这个教程中的应用程序运行在一个 $15/月 的 GCP 计算实例中（ <a href="https://search.patricktriest.com/">search.patricktriest.com</a>），它只有 1.7 GB 的内存，它勉强能运行这个 Elasticsearch 节点；有时候在进行初始的数据加载过程中，整个机器就 ”假死机“ 了。在我的经验中，Elasticsearch 比传统的那些数据库，比如，PostgreSQL 和 MongoDB 耗费的资源要多很多，这样会使托管主机的成本增加很多。</p>
<h3><a href="#91---与数据库的同步"></a>9.1 - 与数据库的同步</h3>
<p>对于大多数应用程序，将数据全部保存在 Elasticsearch 并不是个好的选择。可以使用 ES 作为应用程序的主要事务数据库，但是一般不推荐这样做，因为在 Elasticsearch 中缺少 ACID，如果大量读取数据的时候，它能导致写操作丢失。在许多案例中，ES 服务器更多是一个特定的角色，比如做应用程序中的一个文本搜索功能。这种特定的用途，要求它从主数据库中复制数据到 Elasticsearch 实例中。</p>
<p>比如，假设我们将用户信息保存在一个 PostgreSQL 表中，但是用 Elasticsearch 去提供我们的用户搜索功能。如果一个用户，比如，“Albert”，决定将他的名字改成 “Al”，我们将需要把这个变化同时反映到我们主要的 PostgreSQL 数据库和辅助的 Elasticsearch 集群中。</p>
<p>正确地集成它们可能比较棘手，最好的答案将取决于你现有的应用程序栈。这有多种开源方案可选，从 <a href="https://github.com/mongodb-labs/mongo-connector">用一个进程去关注 MongoDB 操作日志</a> 并自动同步检测到的变化到 ES，到使用一个 <a href="https://github.com/zombodb/zombodb">PostgresSQL 插件</a> 去创建一个定制的、基于 PSQL 的索引来与 Elasticsearch 进行自动沟通。</p>
<p>如果没有有效的预构建选项可用，你可能需要在你的服务器代码中增加一些钩子，这样可以基于数据库的变化来手动更新 Elasticsearch 索引。最后一招，我认为是一个最后的选择，因为，使用定制的业务逻辑去保持 ES 的同步可能很复杂，这将会给应用程序引入很多的 bug。</p>
<p>让 Elasticsearch 与一个主数据库同步，将使它的架构更加复杂，其复杂性已经超越了 ES 的相关缺点，但是当在你的应用程序中考虑添加一个专用的搜索引擎的利弊得失时，这个问题是值的好好考虑的。</p>
<h3><a href="#总结"></a>总结</h3>
<p>在很多现在流行的应用程序中，全文搜索是一个非常重要的功能 —— 而且是很难实现的一个功能。对于在你的应用程序中添加一个快速而又可定制的文本搜索，Elasticsearch 是一个非常好的选择，但是，在这里也有一个替代者。<a href="https://lucene.apache.org/solr/">Apache Solr</a> 是一个类似的开源搜索平台，它是基于 Apache Lucene 构建的，与 Elasticsearch 的核心库是相同的。<a href="https://www.algolia.com/">Algolia</a> 是一个搜索即服务的 Web 平台，它已经很快流行了起来，并且它对新手非常友好，很易于上手（但是作为折衷，它的可定制性较小，并且使用成本较高）。</p>
<p>“搜索” 特性并不是 Elasticsearch 唯一功能。ES 也是日志存储和分析的常用工具，在一个 ELK（Elasticsearch、Logstash、Kibana）架构配置中通常会使用它。灵活的全文搜索功能使得 Elasticsearch 在数据量非常大的科学任务中用处很大 —— 比如，在一个数据集中正确的/标准化的条目拼写，或者为了类似的词组搜索一个文本数据集。</p>
<p>对于你自己的项目，这里有一些创意。</p>
<ul>
<li>添加更多你喜欢的书到教程的应用程序中，然后创建你自己的私人图书馆搜索引擎。</li>
<li>利用来自 <a href="https://scholar.google.com/">Google Scholar</a> 的论文索引，创建一个学术抄袭检测引擎。</li>
<li>通过将字典中的每个词索引到 Elasticsearch，创建一个拼写检查应用程序。</li>
<li>通过将 <a href="https://aws.amazon.com/public-datasets/common-crawl/">Common Crawl Corpus</a> 加载到 Elasticsearch 中，构建你自己的与谷歌竞争的因特网搜索引擎（注意，它可能会超过 50 亿个页面，这是一个成本极高的数据集）。</li>
<li>在 journalism 上使用 Elasticsearch：在最近的大规模泄露的文档中搜索特定的名字和关键词，比如， <a href="https://en.wikipedia.org/wiki/Panama_Papers">Panama Papers</a> 和 <a href="https://en.wikipedia.org/wiki/Paradise_Papers">Paradise Papers</a>。</li>
</ul>
<p>本教程中应用程序的源代码是 100% 公开的，你可以在 GitHub 仓库上找到它们 —— <a href="https://github.com/triestpa/guttenberg-search">https://github.com/triestpa/guttenberg-search</a></p>
<p>我希望你喜欢这个教程！你可以在下面的评论区，发表任何你的想法、问题、或者评论。</p>
<hr>
<p>作者简介：</p>
<p>全栈工程师，数据爱好者，学霸，“构建强迫症患者”，探险爱好者。</p>
<hr>
<p>via: <a href="https://blog.patricktriest.com/text-search-docker-elasticsearch/">https://blog.patricktriest.com/text-search-docker-elasticsearch/</a></p>
<p>作者：<a href="https://blog.patricktriest.com/author/patrick/">Patrick Triest</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Docker 和 Elasticsearch 构建一个全文搜索应用程序

## 原文链接
[https://www.zcfy.cc/article/building-a-full-text-search-app-using-docker-and-elasticsearch](https://www.zcfy.cc/article/building-a-full-text-search-app-using-docker-and-elasticsearch)

