---
title: '开发微服务-Node,React和Docker' 
date: 2019-01-25 2:30:23
hidden: true
slug: hyx8qgfszjn
categories: [reprint]
---

{{< raw >}}

            <p>在本文中，你将学习如何使用Docker快速创建可复用的开发环境，以管理许多NodeJS微服务。</p>
<p><img src="http://mherman.org/assets/img/blog/docker-microservices.png" alt="微服务架构"></p>
<p>这篇文章假定你对以下主题预先做了了解。更多主题信息请参阅提供的资源地址：</p>
<table>
<thead>
<tr>
<th>主题</th>
<th>资源地址</th>
</tr>
</thead>
<tbody>
<tr>
<td>Docker</td>
<td><a href="https://docs.docker.com/engine/getstarted/">Get started with Docker</a></td>
</tr>
<tr>
<td>Docker Compose</td>
<td><a href="https://docs.docker.com/compose/gettingstarted/">Get started with Docker Compose</a></td>
</tr>
<tr>
<td>Node/Express API</td>
<td><a href="http://mherman.org/blog/2016/09/12/testing-node-and-express">Testing Node and Express</a></td>
</tr>
<tr>
<td>React</td>
<td><a href="https://github.com/mjhea0/node-workshop/blob/master/w2/lessons/03-react.md">React Intro</a></td>
</tr>
<tr>
<td>TestCafe</td>
<td><a href="http://mherman.org/blog/2017/03/19/functional-testing-with-testcafe">Functional Testing With TestCafe</a></td>
</tr>
<tr>
<td>Swagger</td>
<td><a href="http://mherman.org/blog/2016/05/26/swagger-and-nodejs/">Swagger and NodeJS</a></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>注意</strong>: 想了解稍微简单一点的实现，请访问我之前的文章 -   <a href="http://mherman.org/blog/2017/04/18/developing-and-testing-microservices-with-docker">使用Docker开发和测试微服务</a>.</p>
</blockquote>
<h2>目录</h2>
<ol>
<li>目标</li>
<li>体系结构</li>
<li>项目设置</li>
<li>Users服务</li>
<li>Web服务 - 第1部分</li>
<li>Movies服务</li>
<li>Web服务 - 第2部分</li>
<li>工作流</li>
<li>测试设置</li>
<li>Swagger设置</li>
<li>下一步</li>
</ol>
<h2>目标</h2>
<p>本教程结束时，你应该能够......</p>
<ol>
<li>使用Docker和Docker Compose在本地配置和运行微服务</li>
<li>利用卷将代码挂载到容器中</li>
<li>在Docker容器中运行单元和集成测试</li>
<li>用功能性的端到端测试来测试整套服务</li>
<li>调试正在运行的Docker容器</li>
<li>使在不同容器中运行的服务能够相互通信</li>
<li>通过基于JWT的认证保护你的服务</li>
<li>配置Swagger与服务进行交互</li>
</ol>
<h2>体系结构</h2>
<p>这篇文章的最终目标是将文章开头图片中的技术组织到以下容器和服务中：</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>服务</th>
<th>容器</th>
<th>技术</th>
</tr>
</thead>
<tbody>
<tr>
<td>Web</td>
<td>Web</td>
<td>web</td>
<td>React, React-Router</td>
</tr>
<tr>
<td>Movies API</td>
<td>Movies</td>
<td>movies</td>
<td>Node, Express</td>
</tr>
<tr>
<td>Movies DB</td>
<td>Movies</td>
<td>movies-db</td>
<td>Postgres</td>
</tr>
<tr>
<td>Swagger</td>
<td>Movies</td>
<td>swagger</td>
<td>Swagger UI</td>
</tr>
<tr>
<td>Users API</td>
<td>Users</td>
<td>users</td>
<td>Node, Express</td>
</tr>
<tr>
<td>Users DB</td>
<td>Users</td>
<td>users-db</td>
<td>Postgres</td>
</tr>
<tr>
<td>Functional Tests</td>
<td>Test</td>
<td>n/a</td>
<td>TestCafe</td>
</tr>
</tbody>
</table>
<p>让我们开始吧！</p>
<h2>项目设置</h2>
<p>首先clone基础项目，然后checkout到第一个标签：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git <span class="hljs-built_in">clone</span> https://github.com/mjhea0/microservice-movies</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> microservice-movies</span>
<span class="hljs-meta">$</span><span class="bash"> git checkout tags/v1</span>

</code></pre><p>总体的项目结构</p>
<pre><code class="hljs routeros">.
├── services
│   ├── movies
│   │   ├── src
│   │   │   └── db
│   │   └── swagger
│   ├──<span class="hljs-built_in"> users
</span>│   │   └── src
│   │       └── db
│   └── web
└── tests
</code></pre><p>在我们添加Docker之前，请务必查看一下代码，方便对所有的功能有个基本的了解。你也可以动手测试一下这些服务......</p>
<p><em>Users:</em></p>
<ul>
<li>导航到 “services/users”</li>
<li><code>npm install</code></li>
<li>将package.json中的<code>start</code>脚本更新为<code>"gulp --gulpfile gulpfile.js"</code></li>
<li><code>npm start</code></li>
<li>在浏览器中访问<a href="http://localhost:3000/users/ping">http://localhost:3000/users/ping</a></li>
</ul>
<p><em>Movies:</em></p>
<ul>
<li>导航到 “services/movies”</li>
<li><code>npm install</code></li>
<li>将package.json中的<code>start</code>脚本更新为<code>"gulp --gulpfile gulpfile.js"</code></li>
<li><code>npm start</code></li>
<li>在浏览器中访问<a href="http://localhost:3000/movies/ping">http://localhost:3000/movies/ping</a></li>
</ul>
<p><em>Web:</em></p>
<ul>
<li>导航到 “services/web”</li>
<li><code>npm install</code></li>
<li><code>npm start</code></li>
<li>在浏览器中访问<a href="http://localhost:3006/">http://localhost:3006</a>，这时你应该可以看到登录页面。</li>
</ul>
<p>接下来，在项目根目录添加<code>docker-compose.yml</code>文件。Docker Compose将调用该文件将多个服务链接在一起。使用一个命令，Docker Compose就可以启动我们所需的所有容器，使这些容器可以根据需要相互通信。</p>
<p>有了这个，在我们开始每一项服务时，确保可以随时进行测试......</p>
<h2>Users 服务</h2>
<p>我们将从数据库开始，因为API依赖于它的运行……</p>
<h3>Database</h3>
<p>首先，在“services/users/src/db”目录中添加 <em>Dockerfile</em> 文件：</p>
<pre><code class="hljs dockerfile"><span class="hljs-keyword">FROM</span> postgres

<span class="hljs-comment"># run create.sql on init </span>
<span class="hljs-keyword">ADD</span><span class="bash"> create.sql /docker-entrypoint-initdb.d 
</span></code></pre><p>在这里，我们通过在容器中的“docker-entrypoint-initdb.d”目录里添加一个SQL文件来扩展官方的Postgres镜像，该镜像将在init上执行。</p>
<p>然后更新 <em>docker-compose.yml</em> 文件：</p>
<pre><code class="hljs http"><span class="hljs-attribute">version</span>: '2.1'

<span class="awk">services:

  users-db:
    container_name: users-db
    build: .<span class="hljs-regexp">/services/u</span>sers<span class="hljs-regexp">/src/</span>db
    ports:
      - <span class="hljs-string">'5433:5432'</span> <span class="hljs-comment"># expose ports - HOST:CONTAINER</span>
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    healthcheck:
      test: <span class="hljs-keyword">exit</span> <span class="hljs-number">0</span>
</span></code></pre><p>这个配置将从“services/users/src/db”中找到 <em>Dockerfile</em> 文件创建一个名为<code>users-db</code>的容器。（目录是相对于 <em>Dockerfile</em> 文件的）。</p>
<p>一旦启动，环境变量将被添加，并在成功启动和运行后发送0的退出代码。Postgres将在宿主机上使用<code>5433</code>端口，其他服务使用<code>5432</code>端口。</p>
<blockquote>
<p><strong>NOTE:</strong> 如果你只希望Postgres用于其他服务而不是主机，请使用<code>expose</code>, 而不是 <code>ports</code>:</p>
<pre><code class="hljs haml">expose:
  -<span class="ruby"> <span class="hljs-string">"5432"</span> 
</span></code></pre></blockquote>
<p>注意使用的版本-<code>2.1</code>。这与安装的Docker Compose版本没有直接关系；而是指定你想要使用的文件格式。</p>
<p>启动这个容器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> docker-compose up --build -d users-db</span>
</code></pre><p>一上来，我们先来个快速的完整性检查。进入shell:</p>
<pre><code class="hljs dockerfile">$ docker-compose <span class="hljs-keyword">run</span><span class="bash"> users-db bash
</span></code></pre><p>然后运行<code>env</code>确保设置了正确的环境变量。你也可以查看“docker-entrypoint-initdb.d” 目录：</p>
<pre><code class="hljs shell"><span class="hljs-meta">#</span><span class="bash"> <span class="hljs-built_in">cd</span> docker-entrypoint-initdb.d/ </span>
<span class="hljs-meta">#</span><span class="bash"> ls </span>
create.sql
</code></pre><p>完成后<code>exit</code>。</p>
<h3>API</h3>
<p>转向API，在“services/users”目录上添加一个 <em>Dockerfile</em> 文件，确保查看注释：</p>
<pre><code class="hljs dockerfile"><span class="hljs-keyword">FROM</span> node:latest

<span class="hljs-comment"># set working directory</span>
<span class="hljs-keyword">RUN</span><span class="bash"> mkdir /usr/src/app
</span><span class="hljs-keyword">WORKDIR</span><span class="bash"> /usr/src
</span>
<span class="hljs-comment"># add `/usr/src/node_modules/.bin` to $PATH</span>
<span class="hljs-keyword">ENV</span> PATH /usr/src/node_modules/.bin:$PATH

<span class="hljs-comment"># install and cache app dependencies</span>
<span class="hljs-keyword">ADD</span><span class="bash"> package.json /usr/src/package.json
</span><span class="hljs-keyword">RUN</span><span class="bash"> npm install
</span>
<span class="hljs-comment"># start app</span>
<span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"npm"</span>, <span class="hljs-string">"start"</span>]
</span></code></pre><blockquote>
<p>注意：确保利用Docker的分层<a href="https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#build-cache">缓存</a>系统，通过在添加应用程序的源文件之前添加package.json和安装依赖项来加快构建时间。有关这方面的更多信息，请查看 <a href="http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/">构建有效的Dockerfiles-Node.js</a>。</p>
</blockquote>
<p>然后将<code>users-service</code>添加到 <em>docker-compose.yml</em> 文件中：</p>
<pre><code class="hljs haml">users-service:
  container_name: users-service
  build: ./services/users/
  volumes:
    -<span class="ruby"> <span class="hljs-string">'./services/users:/usr/src/app'</span>
</span>    -<span class="ruby"> <span class="hljs-string">'./services/users/package.json:/usr/src/package.json'</span>
</span>  ports:
    -<span class="ruby"> <span class="hljs-string">'3000:3000'</span> <span class="hljs-comment"># expose ports - HOST:CONTAINER</span>
</span>  environment:
    -<span class="ruby"> DATABASE_URL=<span class="hljs-symbol">postgres:</span>/<span class="hljs-regexp">/postgres:postgres@users-db:5432/users</span>_dev
</span>    -<span class="ruby"> DATABASE_TEST_URL=<span class="hljs-symbol">postgres:</span>/<span class="hljs-regexp">/postgres:postgres@users-db:5432/users</span>_test
</span>    -<span class="ruby"> NODE_ENV=${NODE_ENV}
</span>    -<span class="ruby"> TOKEN_SECRET=changeme
</span>  depends_on:
    users-db:
      condition: service_healthy
  links:
    -<span class="ruby"> users-db
</span></code></pre><p>这里发生了什么？</p>
<ul>
<li><code>volumes</code>:<a href="https://docs.docker.com/engine/tutorials/dockervolumes/">volumes</a>用于在容器中挂载目录，这样在对代码进行修改时无需重新生成镜像。这是本地开发环境的默认设置，因此可以快速地获得关于代码的更改反馈。</li>
<li><code>depends_on</code>:<a href="https://docs.docker.com/compose/compose-file/#dependson">depends_on</a>指定服务启动的顺序。在这个示例中，<code>users-service</code>在启动之前需要等待<code>users-db</code>的成功启动（退出代码为0）。</li>
<li><code>links</code>: 通过 <a href="https://docs.docker.com/compose/compose-file/#links">links</a> 可以链接到在其他容器中运行的服务。因此，通过这个配置，<code>users-service</code>中的代码能够通过<code>users-db:5432</code> 来访问数据库。</li>
</ul>
<blockquote>
<p><strong>注意:</strong> 对于<code>depends_on</code>和<code>links</code>的区别有疑问的话，可以查看 <a href="http://stackoverflow.com/a/39658359/1799408">Stack Overflow 讨论</a> 了解更多信息。</p>
</blockquote>
<p>设置<code>NODE_ENV</code>环境变量：</p>
<pre><code class="hljs routeros">$ <span class="hljs-builtin-name">export</span> <span class="hljs-attribute">NODE_ENV</span>=development
</code></pre><p>构建镜像并启动这个容器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> docker-compose up --build -d users-service</span>
</code></pre><blockquote>
<p><strong>注意：</strong> 请记住，Docker Compose处理构建和运行时间。这可能会令人有些困惑。比如，看看当前的docker-compose.yml文件 - 构建时发生了什么？运行时间怎么样？你怎么知道的？</p>
</blockquote>
<p>一旦启动，在项目根目录中创建一个名为 _init_db.sh_ 的新文件，并添加Knex迁移和种子命令：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/sh   </span>
docker-compose run users-service knex migrate:latest --env development --knexfile app/knexfile.js 
docker-compose run users-service knex seed:run --env development --knexfile app/knexfile.js
</code></pre><p>然后应用迁移并添加种子：</p>
<pre><code class="hljs groovy">$ sh init_db.sh
Using <span class="hljs-string">environment:</span> development
Batch <span class="hljs-number">1</span> <span class="hljs-string">run:</span> <span class="hljs-number">1</span> migrations
<span class="hljs-regexp">/src/</span>src<span class="hljs-regexp">/db/</span>migrations/<span class="hljs-number">20170504191016</span>_users.js
Using <span class="hljs-string">environment:</span> development
Ran <span class="hljs-number">1</span> seed files
<span class="hljs-regexp">/src/</span>src<span class="hljs-regexp">/db/</span>seeds/users.js
</code></pre><p>测试：</p>
<table>
<thead>
<tr>
<th>接口</th>
<th>HTTP 方法</th>
<th>CRUD 方法</th>
<th>结果</th>
</tr>
</thead>
<tbody>
<tr>
<td>/users/ping</td>
<td>GET</td>
<td>READ</td>
<td><code>pong</code></td>
</tr>
<tr>
<td>/users/register</td>
<td>POST</td>
<td>CREATE</td>
<td>add a user</td>
</tr>
<tr>
<td>/users/login</td>
<td>POST</td>
<td>CREATE</td>
<td>log in a user</td>
</tr>
<tr>
<td>/users/user</td>
<td>GET</td>
<td>READ</td>
<td>get user info</td>
</tr>
</tbody>
</table>
<pre><code class="hljs awk">$ http POST http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">3000</span><span class="hljs-regexp">/users/</span>register username=foo password=bar
$ http POST http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">3000</span><span class="hljs-regexp">/users/</span>login username=foo password=bar
</code></pre><blockquote>
<p><strong>注意：</strong> 上述命令中的<code>http</code>是 <a href="https://httpie.org/">HTTPie</a> 库的一部分，这个库是cURL之上的包装器。</p>
</blockquote>
<p>在这两种情况下，你都应该看到成功的状态和一个token，如下：</p>
<pre><code class="hljs json">{
    <span class="hljs-attr">"status"</span>: <span class="hljs-string">"success"</span>,
    <span class="hljs-attr">"token"</span>: <span class="hljs-string">"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"</span>
}
</code></pre><p>最后，运行单元和集成测试：</p>
<pre><code class="hljs dockerfile">$ docker-compose <span class="hljs-keyword">run</span><span class="bash"> users-service npm <span class="hljs-built_in">test</span>
</span></code></pre><p>运行结果如下：</p>
<pre><code class="hljs routeros">routes : index
  <span class="hljs-builtin-name">GET</span> /does/<span class="hljs-keyword">not</span>/exist
    ✓ should throw an <span class="hljs-builtin-name">error</span>

routes :<span class="hljs-built_in"> users
</span>  POST /users/register
    ✓ should register a new<span class="hljs-built_in"> user </span>(178ms)
  POST /users/login
    ✓ should login a<span class="hljs-built_in"> user </span>(116ms)
    ✓ should <span class="hljs-keyword">not</span> login an unregistered<span class="hljs-built_in"> user
</span>    ✓ should <span class="hljs-keyword">not</span> login a valid<span class="hljs-built_in"> user </span>with incorrect password (125ms)
  <span class="hljs-builtin-name">GET</span> /users<span class="hljs-built_in">/user
</span>    ✓ should return a success (114ms)
    ✓ should throw an <span class="hljs-builtin-name">error</span> <span class="hljs-keyword">if</span> a<span class="hljs-built_in"> user </span>is <span class="hljs-keyword">not</span> logged <span class="hljs-keyword">in</span>

auth : helpers
  comparePass()
    ✓ should return <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> the password is correct (354ms)
    ✓ should return <span class="hljs-literal">false</span> <span class="hljs-keyword">if</span> the password is correct (315ms)
    ✓ should return <span class="hljs-literal">false</span> <span class="hljs-keyword">if</span> the password empty (305ms)

auth : local
  encodeToken()
    ✓ should return a token
  decodeToken()
    ✓ should return a payload


12 passing (4s)
</code></pre><p>查看测试规格以获得更多信息。就这样！接下来是网络服务......</p>
<h2>Web服务 - 第1部分</h2>
<p>随着我们的用户服务开始运行，我们可以将注意力转移到客户端，并在容器中启动React应用程序来测试身份验证。</p>
<blockquote>
<p><strong>注意：</strong> React代码是从我的两个学生 - <a href="https://www.linkedin.com/in/charlieblackstock/">Charlie Blackstock</a>和<a href="https://www.linkedin.com/in/etmoore1/">Evan Moore</a>分别编写的<a href="https://github.com/blackstc/intro-react-redux-omdb">intro-react-redux-omdb</a>和<a href="https://github.com/etmoore/communikey">communikey</a>移植而来的。</p>
</blockquote>
<p>在“services/web”中增加一个 <em>Dockerfile</em> 文件：</p>
<pre><code class="hljs dockerfile"><span class="hljs-keyword">FROM</span> node:latest

<span class="hljs-comment"># set working directory</span>
<span class="hljs-keyword">RUN</span><span class="bash"> mkdir /usr/src/app
</span><span class="hljs-keyword">WORKDIR</span><span class="bash"> /usr/src/app
</span>
<span class="hljs-comment"># add `/usr/src/app/node_modules/.bin` to $PATH</span>
<span class="hljs-keyword">ENV</span> PATH /usr/src/app/node_modules/.bin:$PATH

<span class="hljs-comment"># install and cache app dependencies</span>
<span class="hljs-keyword">ADD</span><span class="bash"> package.json /usr/src/app/package.json
</span><span class="hljs-keyword">RUN</span><span class="bash"> npm install
</span><span class="hljs-keyword">RUN</span><span class="bash"> npm install react-scripts@0.9.5 -g
</span>
<span class="hljs-comment"># start app</span>
<span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"npm"</span>, <span class="hljs-string">"start"</span>]
</span></code></pre><p>截至2017年5月10日，<a href="http://www.omdbapi.com/">OMDb API</a>是私有的，所以您必须捐赠至少1美元才能获得访问权限。获得API密钥后，更 <em>services/web/src/App.jsx</em> 中的<code>API_URL</code>：</p>
<pre><code class="hljs rust"><span class="hljs-keyword">const</span> API_URL = <span class="hljs-symbol">'http</span>:<span class="hljs-comment">//www.omdbapi.com/?apikey=addyourkey&amp;s='</span>
</code></pre><p>然后更新 <em>docker-compose.yml</em> 文件，如下所示：</p>
<pre><code class="hljs haml">web-service:
  container_name: web-service
  build: ./services/web/
  volumes:
    -<span class="ruby"> <span class="hljs-string">'./services/web:/usr/src/app'</span>
</span>    -<span class="ruby"> <span class="hljs-string">'/usr/src/app/node_modules'</span>
</span>  ports:
    -<span class="ruby"> <span class="hljs-string">'3007:3006'</span> <span class="hljs-comment"># expose ports - HOST:CONTAINER</span>
</span>  environment:
    -<span class="ruby"> NODE_ENV=${NODE_ENV}
</span>  depends_on:
    users-service:
      condition: service_started
  links:
    -<span class="ruby"> users-service
</span></code></pre><blockquote>
<p>为了防止卷 - <em>/usr/src/app</em> - 覆盖package.json，我们使用了一个数据卷 - _/usr/src/app/node_modules_ 。这可能有必要，也可能没有必要，具体取决于你设置镜像和容器的顺序。查看<a href="http://dchua.com/2016/02/07/getting-npm-packages-to-be-installed-with-docker-compose/">使用docker-compose安装npm包</a>了解更多。</p>
</blockquote>
<p>构建镜像并启动容器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> docker-compose up --build -d web-service</span>
</code></pre><blockquote>
<p><strong>注意：</strong>为了避免处理太多的配置（babel和webpack），React应用程序使用<a href="https://github.com/facebookincubator/create-react-app">Create React App</a>。</p>
</blockquote>
<p>打开浏览器并导航到<a href="http://localhost:3007/">http://localhost:3007</a>。你可以看到登录页面：</p>
<p><img src="http://mherman.org/assets/img/blog/microservice-movies-login.png" alt="login page"></p>
<p>使用下面的用户名和密码登录：</p>
<ul>
<li>username:<code>foo</code></li>
<li>password:<code>bar</code></li>
</ul>
<p>登录成功后，你可以看到下面的页面：</p>
<p><img src="http://mherman.org/assets/img/blog/microservice-movies-search.png" alt="search page"></p>
<p>在 <em>services/web/src/App.jsx</em> 中，让我们快速浏览一下loginUser()方法中的AJAX请求：</p>
<pre><code class="hljs stylus">loginUser (userData, callback) {
  <span class="hljs-comment">/*
    why? http://localhost:3000/users/login
    why not? http://users-service:3000/users/login
   */</span>
  return axios.post(<span class="hljs-string">'http://localhost:3000/users/login'</span>, userData)
  .then((res) =&gt; {
    window<span class="hljs-selector-class">.localStorage</span><span class="hljs-selector-class">.setItem</span>(<span class="hljs-string">'authToken'</span>, res<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.token</span>)
    window<span class="hljs-selector-class">.localStorage</span><span class="hljs-selector-class">.setItem</span>(<span class="hljs-string">'user'</span>, res<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.user</span>)
    this.setState({ isAuthenticated: true })
    this.createFlashMessage(<span class="hljs-string">'You successfully logged in! Welcome!'</span>)
    this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.history</span><span class="hljs-selector-class">.push</span>(<span class="hljs-string">'/'</span>)
    this.getMovies()
  })
  .catch((error) =&gt; {
    callback(<span class="hljs-string">'Something went wrong'</span>)
  })
}
</code></pre><p>为什么我们使用<code>localhost</code>而不是容器的名称，<code>users-service</code>？因为这个请求来自容器外部，在宿主机上。请记住，如果这个请求源于容器内部，那么我们将需要使用容器名称而不是<code>localhost</code>，因为在这种情况下，<code>localhost</code>会返回到容器本身。</p>
<p>确保您可以注销并注册。</p>
<p>接下来，让我们启动电影服务，以便终端用户可以将电影保存到集合中......</p>
<h2>Movies 服务</h2>
<p>Movies服务的设置与Users服务的设置几乎相同。亲自尝试来检查一下你的理解：</p>
<ol>
<li><p>Database</p>
<ul>
<li>添加 <em>Dockerfile</em> 文件</li>
<li>更新 <em>docker-compose.yml</em></li>
<li>启动这个容器</li>
<li>测试</li>
</ul>
</li>
<li><p>API</p>
<ul>
<li>添加 <em>Dockerfile</em> 文件</li>
<li>更新 <em>docker-compose.yml</em> (请确保该服务与数据库和用户服务链接，并更新暴露端口 - api为 <code>3001</code> ，db为 <code>5434</code>)</li>
<li>启动这个容器</li>
<li>应用迁移和种子</li>
<li>测试</li>
</ul>
</li>
</ol>
<blockquote>
<p><strong>注意：</strong> 如果需要帮助，可以从<a href="https://github.com/mjhea0/microservice-movies">microservices-movies</a>的<a href="https://github.com/mjhea0/microservice-movies/releases/tag/v2">v2</a>标签中获取代码。</p>
</blockquote>
<p>与用户数据库相比，电影数据库镜像构建所需时间要少的多。为什么？</p>
<p>随着容器的启动，我们来测试一下接口......</p>
<table>
<thead>
<tr>
<th>接口</th>
<th>HTTP 方法</th>
<th>CRUD 方法</th>
<th>结果</th>
</tr>
</thead>
<tbody>
<tr>
<td>/movies/ping</td>
<td>GET</td>
<td>READ</td>
<td><code>pong</code></td>
</tr>
<tr>
<td>/movies/user</td>
<td>GET</td>
<td>READ</td>
<td>get all movies by user</td>
</tr>
<tr>
<td>/movies</td>
<td>POST</td>
<td>CREATE</td>
<td>add a single movie</td>
</tr>
</tbody>
</table>
<p>首先在浏览器中访问<a href="http://localhost:3001/movies/ping">http://localhost:3001/movies/ping</a>，页面的内容为<code>pong</code>!打开<a href="http://localhost:3001/movies/user">http://localhost:3001/movies/user</a>，内容为：</p>
<pre><code class="hljs json">{
 <span class="hljs-attr">"status"</span>: <span class="hljs-string">"Please log in"</span> 
} 
</code></pre><p>由于你需要通过身份验证来访问其他路由，我们通过运行集成测试来测试它们：</p>
<pre><code class="hljs dockerfile">$ docker-compose <span class="hljs-keyword">run</span><span class="bash"> movies-service npm <span class="hljs-built_in">test</span>
</span></code></pre><p>结果为：</p>
<pre><code class="hljs routeros">routes : index
  <span class="hljs-builtin-name">GET</span> /does/<span class="hljs-keyword">not</span>/exist
    ✓ should throw an <span class="hljs-builtin-name">error</span>

Movies API Routes
  <span class="hljs-builtin-name">GET</span> /movies<span class="hljs-built_in">/ping
</span>    ✓ should return <span class="hljs-string">"pong"</span>
  <span class="hljs-builtin-name">GET</span> /movies<span class="hljs-built_in">/user
</span>    ✓ should return saved movies
  POST /movies
    ✓ should create a new movie


4 passing (818ms)
</code></pre><p>检查测试规格了解更多信息。</p>
<h2>Web服务 - 第2部分</h2>
<p>转向 <em>docker-compose.yml</em> 文件。更新<code>web-service</code>的<code>links</code>和<code>depends_on</code>键：</p>
<pre><code class="hljs less"><span class="hljs-attribute">depends_on</span>:
  <span class="hljs-attribute">users-service</span>:
    <span class="hljs-attribute">condition</span>: service_started
  <span class="hljs-attribute">movies-service</span>:
    <span class="hljs-attribute">condition</span>: service_started
<span class="hljs-attribute">links</span>:
  - users-service
  - movies-service
</code></pre><p>为什么？</p>
<p>接下来，更新容器：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> docker-compose up -d web-service</span>
</code></pre><p>让我们在浏览器中测试一下！打开<a href="http://localhost:3007/">http://localhost:3007/</a>。注册一个新用户，然后添加一些电影到收藏。</p>
<p>一定要查看收藏：</p>
<p><img src="http://mherman.org/assets/img/blog/microservice-movies-collection.png" alt="collection page"></p>
<p>打开 _services/movies/src/routes/<em>helpers.js</em> 并记下 <code>ensureAuthenticated()</code> 方法:</p>
<pre><code class="hljs moonscript">let ensureAuthenticated = <span class="hljs-function"><span class="hljs-params">(req, res, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (!(req.headers &amp;&amp; req.headers.authorization)) {
    <span class="hljs-keyword">return</span> res.status(<span class="hljs-number">400</span>).json({ <span class="hljs-name">status</span>: <span class="hljs-string">'Please log in'</span> });
  }
  const options = {
    <span class="hljs-name">method</span>: <span class="hljs-string">'GET'</span>,
    <span class="hljs-name">uri</span>: <span class="hljs-string">'http://users-service:3000/users/user'</span>,
    <span class="hljs-name">json</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-name">headers</span>: {
      <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>,
      <span class="hljs-name">Authorization</span>: `Bearer ${req.headers.authorization.split(<span class="hljs-string">' '</span>)[<span class="hljs-number">1</span>]}`,
    },
  };
  <span class="hljs-keyword">return</span> request(options)
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(response)</span> =&gt;</span> {
    req.user = response.user;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">next</span>();
  })
  .catch(<span class="hljs-function"><span class="hljs-params">(err)</span> =&gt;</span> { <span class="hljs-keyword">return</span> <span class="hljs-built_in">next</span>(err); });
};
</code></pre><p>uri为什么指向<code>users-service</code>而不是<code>localhost</code>？</p>
<h2>工作流</h2>
<p>首先检查<a href="http://mherman.org/blog/2017/04/18/developing-and-testing-microservices-with-docker/">使用Docker开发和测试微服务</a>的工作流部分。在代码更改时进行实时重新加载，并使用console.log调试正在运行的容器。</p>
<p>在集合页中添加标题：</p>
<p><img src="http://mherman.org/assets/img/blog/microservice-movies-collection-updated.png" alt="带有标题的集合页"></p>
<p>运行日志 - <code>docker-compose logs -f web-service</code> - 然后对其中一个中断编译的组件进行更改：</p>
<pre><code class="hljs 1c">web-service       <span class="hljs-string">| Compiling...</span>
web-service       <span class="hljs-string">| Failed to compile.</span>
web-service       <span class="hljs-string">|</span>
web-service       <span class="hljs-string">| Error in ./src/components/SavedMovies.jsx</span>
web-service       <span class="hljs-string">|</span>
web-service       <span class="hljs-string">| /usr/src/app/src/components/SavedMovies.jsx</span>
web-service       <span class="hljs-string">|   10:13  error  'Link' is not defined  react/jsx-no-undef</span>
web-service       <span class="hljs-string">|</span>
web-service       <span class="hljs-string">| ✖ 1 problem (1 error, 0 warnings)</span>
web-service       <span class="hljs-string">|</span>
web-service       <span class="hljs-string">|</span>

</code></pre><p>更正错误：</p>
<pre><code class="hljs 1c">web-service       <span class="hljs-string">|</span>
web-service       <span class="hljs-string">| Compiling...</span>
web-service       <span class="hljs-string">| Compiled successfully!</span>
</code></pre><p>继续尝试添加和更新React应用程序，直到在容器中使用它为止感到舒服为止。</p>
<h2>测试设置</h2>
<p>到目前为止，我们只用单元和集成测试测试了每个微服务。让我们把注意力转向功能性的端到端的测试，来测试整个系统。为此，我们将使用<a href="https://devexpress.github.io/testcafe/">TestCafe</a>。</p>
<blockquote>
<p><strong>注意：</strong>不想使用TestCafe？请查看使用Mocha，Chai，Request和Cheerio（全部在容器内）进行测试的<a href="https://github.com/mjhea0/node-docker-api/tree/master/tests">代码</a>。</p>
</blockquote>
<p>我们偷个懒，在全局安装TestCafe：</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>npm install testcafe<span class="hljs-variable">@0</span>.<span class="hljs-number">15.0</span> -g
</code></pre><p>然后运行测试：</p>
<pre><code class="hljs stylus">$ testcafe firefox tests<span class="hljs-comment">/**/</span>*<span class="hljs-selector-class">.js</span>
</code></pre><p>测试结果为：</p>
<pre><code class="hljs routeros">testcafe firefox tests/**/*.js
 Running tests <span class="hljs-keyword">in</span>:
 - Firefox 53.0.0 / Mac OS X 10.11.0

 /login
 ✓<span class="hljs-built_in"> users </span>should be able <span class="hljs-keyword">to</span> log <span class="hljs-keyword">in</span> <span class="hljs-keyword">and</span> out


 1 passed (3s)

</code></pre><blockquote>
<p><strong>注意：</strong> 对容器内的运行测试感兴趣，可以查看<a href="https://devexpress.github.io/testcafe/documentation/using-testcafe/installing-testcafe.html#using-testcafe-docker-image">官方的TestCafe文档</a>，了解更多有关在Docker上使用TestCafe的信息。</p>
</blockquote>
<p>为了简化测试工作流程，请将 <em>test.sh</em> 文件添加到项目根目录中：</p>
<pre><code class="hljs bash"><span class="hljs-meta">#!/bin/bash
</span>
fails=<span class="hljs-string">''</span>

<span class="hljs-function"><span class="hljs-title">inspect</span></span>() {
  <span class="hljs-keyword">if</span> [ <span class="hljs-variable">$1</span> -ne 0 ] ; <span class="hljs-keyword">then</span>
    fails=<span class="hljs-string">"<span class="hljs-variable">${fails}</span> <span class="hljs-variable">$2</span>"</span>
  <span class="hljs-keyword">fi</span>
}

docker-compose run users-service npm <span class="hljs-built_in">test</span>
inspect $? users-service

docker-compose run movies-service npm <span class="hljs-built_in">test</span>
inspect $? movies-service

testcafe firefox tests/**/*.js
inspect $? e2e

<span class="hljs-keyword">if</span> [ -n <span class="hljs-string">"<span class="hljs-variable">${fails}</span>"</span> ];
  <span class="hljs-keyword">then</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">"Tests failed: <span class="hljs-variable">${fails}</span>"</span>
    <span class="hljs-built_in">exit</span> 1
  <span class="hljs-keyword">else</span>
    <span class="hljs-built_in">echo</span> <span class="hljs-string">"Tests passed!"</span>
    <span class="hljs-built_in">exit</span> 0
<span class="hljs-keyword">fi</span>

</code></pre><p>运行测试：</p>
<pre><code class="hljs stata">$ <span class="hljs-keyword">sh</span> <span class="hljs-keyword">test</span>.<span class="hljs-keyword">sh</span>
</code></pre><h2>Swagger设置</h2>
<p>在“services/movies/swagger”目录中添加 <em>Dockerfile</em> 文件：</p>
<pre><code class="hljs dockerfile"><span class="hljs-keyword">FROM</span> node:latest

<span class="hljs-comment"># set working directory</span>
<span class="hljs-keyword">RUN</span><span class="bash"> mkdir /usr/src/app
</span><span class="hljs-keyword">WORKDIR</span><span class="bash"> /usr/src/app
</span>
<span class="hljs-comment"># add `/usr/src/node_modules/.bin` to $PATH</span>
<span class="hljs-keyword">ENV</span> PATH /usr/src/app/node_modules/.bin:$PATH

<span class="hljs-comment"># install and cache app dependencies</span>
<span class="hljs-keyword">ADD</span><span class="bash"> package.json /usr/src/app/package.json
</span><span class="hljs-keyword">RUN</span><span class="bash"> npm install
</span>
<span class="hljs-comment"># start app</span>
<span class="hljs-keyword">CMD</span><span class="bash"> [<span class="hljs-string">"npm"</span>, <span class="hljs-string">"start"</span>]
</span>
</code></pre><p>更新 <em>docker-compose.yml</em> ：</p>
<pre><code class="hljs haml">swagger:
  container_name: swagger
  build: ./services/movies/swagger/
  volumes:
    -<span class="ruby"> <span class="hljs-string">'./services/movies/swagger:/usr/src/app'</span>
</span>    -<span class="ruby"> <span class="hljs-string">'/usr/src/app/node_modules'</span>
</span>  ports:
    -<span class="ruby"> <span class="hljs-string">'3003:3001'</span> <span class="hljs-comment"># expose ports - HOST:CONTAINER</span>
</span>  environment:
    -<span class="ruby"> NODE_ENV=${NODE_ENV}
</span>  depends_on:
    users-service:
      condition: service_started
    movies-service:
      condition: service_started
  links:
    -<span class="ruby"> users-service
</span>    -<span class="ruby"> movies-service
</span>
</code></pre><p>启动：</p>
<pre><code class="hljs mipsasm">$ docker-compose up -d --<span class="hljs-keyword">build </span><span class="hljs-keyword">swagger
</span></code></pre><p>导航到<a href="http://localhost:3003/docs">http://localhost:3003/docs</a>并对其进行测试:</p>
<p><img src="http://mherman.org/assets/img/blog/microservice-movies-swagger.png" alt="swagger 文档"></p>
<p>现在，你只需要支持基于JWT的身份验证并添加剩余的接口即可！</p>
<h2>下一步</h2>
<p>接下来呢？</p>
<ol>
<li><em>React 应用</em> - React应用需要用心来完成。 添加样式，解决bug。更新flash消息，这样每次只显示一个。 编写测试。建立新的特性。添加Redux。天空的极限。如果你愿意，请联系我！</li>
<li><em>Swagger</em> - 添加基于JWT的身份验证，并从电影服务中添加额外的接口。.</li>
<li><em>Dockerfiles</em> - 阅读Docker团队的<a href="https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/">编写Dockerfiles的最佳实践</a>，并根据需要进行重构</li>
<li>生产环境 - 想在AWS上部署吗？查看<a href="http://mherman.org/blog/2017/09/18/on-demand-test-environments-with-docker-and-aws-ecs">On-Demand Environments With Docker and AWS ECS</a>的博客文章。</li>
</ol>
<p>从<a href="https://github.com/mjhea0/microservice-movies">microservice-movies</a>的v2标签中获取最终代码。请在下面添加问题和评论。还有幻灯片！如果有兴趣，可以在<a href="http://mherman.org/microservice-movies">这里查看</a>。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开发微服务-Node,React和Docker

## 原文链接
[https://www.zcfy.cc/article/developing-microservices-node-react-and-docker](https://www.zcfy.cc/article/developing-microservices-node-react-and-docker)

