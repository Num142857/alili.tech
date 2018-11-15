---
title: 使用Express和MongoDB构建Serverless API的速成课程
hidden: true
categories: reprint
slug: '53106638'
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <p>如今，在多种技术场合下，Serverless架构已经变成了一个神奇的工具。我们正在使用Serverless架构来开发数据处理器，聊天机器人，应用API等等。</p>
<p>今天，我将引导您去使用持久的MongoDB数据存储在AWS Lambda上创建可以随时投入生产的Express API。您可以在AWS Lambda上构建Express应用程序，然后轻松地使用MongoDB。</p>
<p>您可以想象这非常简单——使用 AWS Lambda 很大程度和使用一个小型Node.js运行环境一样，它对除了代码以外的所有事物都进行了一层抽象。</p>
<p>让我们开始吧！</p>
<h3>长话短说</h3>
<p>您可以直接跳到你感兴趣的部分（但这会狠狠地伤害我的内心），或者按照章节顺序直接开始。</p>
<ul>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#ad74">安装工程</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#ba8c">在MongoDB Atlas上创建数据库</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#7753">安装依赖库</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#cade">编写程序</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#dbbb">测试</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#b957">部署</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#80b2">负载测试</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#9793">监控</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-apis-with-express-and-mongodb-77774f7730fe/#e586">总结</a></p>
</li>
</ul>
<h3>安装工程</h3>
<p>工程安装后我们得到的是工程最小化的结构。但是，它仍然拥有继续为未来生产应用程序添加功能所需的一切。为了向您进行介绍，我将工程安装后的最终布局图在下面展示：</p>
<p><img src="https://p0.ssl.qhimg.com/t011531be166c823059.png" alt=""></p>
<p>正如您所看到的那样，对于带有CRUD逻辑的注解来说，这是一个相当简单的API，但它成功完成了工作。好的，说的够多了，让我们开始运行这个工程吧。</p>
<h4>1. 安装Serverless框架</h4>
<p>首先你需要安装并配置<a href="https://serverless.com/">Serverless架构</a>。 这是一个用于开发的简单命令行工具，可以非常简单地部署项目。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm i -g serverless</span>

</code></pre><p>你现在已经在你机器的全局环境中安装了Serverless库，它的命令现在在你的终端中随时可用。</p>
<p><strong><em>提示:</em></strong> <em>如果你正在使用Linux，那么你可能需要加上sudo。</em></p>
<h4>2. 在你的AWS Console创建一个IAM用户</h4>
<p>打开您的AWS Console，然后点击网页左上角的Service下拉菜单，你会看见很多服务。在搜索框输入IAM然后点击搜索结果。</p>
<p><img src="https://p0.ssl.qhimg.com/t01bded5144e6f8a462.png" alt=""></p>
<p>你会被重定向到IAM的主页，继续添加新用户。</p>
<p><img src="https://p0.ssl.qhimg.com/t014dbcc1a84a206e39.png" alt=""></p>
<p>给你的IAM用户一个名字，同时选中<strong>programmatic access</strong>的复选框，点击下一步。</p>
<p><img src="https://p0.ssl.qhimg.com/t01e873058b4fd9a77a.png" alt=""></p>
<p>现在你可以授予你的新用户一组权限，因为我们要让Severless在我们的AWS账户上创建和删除各种资源，所以请检查下<strong>AdministratorAccess</strong>这一项。</p>
<p><img src="https://p0.ssl.qhimg.com/t013c59fac9f7ce4bcd.png" alt=""></p>
<p>继续下去，我们下一步会看到用户被创建。现在，同时也只有这个时候，你拥有用户<strong>Access Key ID</strong>和私密<strong>Access Key</strong>的权限。请确保你填写了他们，或者下载页面上的.csv文件。同时，你需要保证这些文件的安全性，并不要让其他人看到。虽然这是一个演示，但我已将它们打上马赛克，以确保您了解保护它们的安全的严重性。</p>
<p><img src="https://p0.ssl.qhimg.com/t015919073c16724017.png" alt=""></p>
<p>完成这些之后，我们终于可以开始在Serverless的配置里面添加密匙了。</p>
<h4>3. 在 Serverless 配置中添加IAM密匙</h4>
<p>很好! 保存密钥后，您可以设置Serverless以访问您的AWS账户，我们切换回终端并在一行中键入这些内容：</p>
<pre><code class="hljs routeros">$ serverless<span class="hljs-built_in"> config </span>credentials \
  --provider aws \
  --key xxxxxxxxxxxxxx \
  --secret xxxxxxxxxxxxxx

</code></pre><p>敲击回车！现在你的Serverless知道在运行任何终端命令时要连接的帐户了，让我们看看它的实际效果。</p>
<h4>4. 创建一个服务</h4>
<p>新建一个目录去放置你的Serverless应用服务，在那里打开终端，现在你准备好去创建一个新的服务了。</p>
<p>我们所谓的服务，是在名为<strong>serverless.yml</strong>的文件中定义的AWS Lambda函数，触发它们的事件以及它们所需的任何AWS基础架构资源，都保存在这个文件当中。</p>
<p>回到终端里，输入：</p>
<pre><code class="hljs brainfuck"><span class="hljs-comment">$</span> <span class="hljs-comment">serverless</span> <span class="hljs-comment">create</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">template</span> <span class="hljs-comment">aws</span><span class="hljs-literal">-</span><span class="hljs-comment">nodejs</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">path</span> <span class="hljs-comment">sls</span><span class="hljs-literal">-</span><span class="hljs-comment">express</span><span class="hljs-literal">-</span><span class="hljs-comment">mongodb</span>

</code></pre><p>create命令会新建一个新的<strong>service</strong>。我们需要为这个方法选择一个运行环境。我们称之为<strong>template</strong>。传入aws-nodejs则将会设置运行环境为 Node.js——这就是我们想要的。<strong>path</strong>会为服务新建一个文件夹。在这里例子中，我们命名它为<strong>sls-express-mongodb</strong>。</p>
<h4>5. 使用代码编辑器浏览服务目录</h4>
<p>使用您最喜欢的代码编辑器打开<strong>sls-express-mongodb</strong>文件夹。那里应该有三个文件，但是现在我们只关注<strong>serverless.yml</strong>——它包含此服务的所有配置设置，包括常规配置设置和每个函数的配置。目前您的<strong>serverless.yml</strong>文件被样板代码和注释所填充，您可以随意将其删除并把这些代码粘贴进去。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p><strong>functions</strong>属性列出了服务中的所有函数。我们只需要一个函数，让我们的整个Express应用程序将被打包到这个单一功能中，其中<strong>Handler</strong>指出了是哪个函数。我们的最终应用程序将有一个带有run函数的server.js文件（我想这个步骤足够简单）。</p>
<p>现在让我们看一下这些事件，它们正充当着负责路由的代理，这意味着每个命中HTTP端点的请求都将被代理到内部的Express路由器，这很酷。</p>
<p>我们还有一个自定义部分。这个自定义部分可以将环境变量安全地加载到我们的应用程序中。我们可以使用${self:custom.secrets.&lt;环境变量名称&gt;}的格式将这些变量引入，其中变量实际值保存在一个名为secrets.json的简单文件中。</p>
<p>最后，我们还有用于离线测试的serverless-offline插件。</p>
<h3>在MongoDB Atlas上面创建数据库</h3>
<p>准备好进行更多配置了吗？好吧，没人喜欢这个环节，但我没办法。让我们前往<a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas并进行注册</a>.</p>
<p>账户是免费的，而且不需要信用卡，它将成为我们开发所需的沙箱。设置帐户后，请打开帐户页面并添加新组织。</p>
<p><img src="https://p0.ssl.qhimg.com/t017abb40fc5f13f5c9.png" alt=""></p>
<p>选择一个你喜欢的名字，按“下一步”并继续创建组织。</p>
<p><img src="https://p0.ssl.qhimg.com/t01dffa971256ab38c0.png" alt=""></p>
<p>好的。我们进入了组织页面，请按下<strong>New Project</strong>按钮。</p>
<p><img src="https://p0.ssl.qhimg.com/t0142dde11c0d98d2e4.png" alt=""></p>
<p>这将打开一个页面来命名您的工程。只需键入您喜欢的名称，然后点击下一步。</p>
<p><img src="https://p0.ssl.qhimg.com/t01491fca35eee4af6c.png" alt=""></p>
<p>MongoDB非常重视权限和安全性，因此Atlas将向您显示另一个管理权限页面。我们现在可以跳过它，然后创建项目。</p>
<p><img src="https://p0.ssl.qhimg.com/t01b7e1b3b901100e0d.png" alt=""></p>
<p>好，我们来开始创建实际的集群！按下巨大的绿色“构建新群集”按钮。这将打开一个巨大的集群创建窗口。您可以将所有内容保留为默认值，只需确保选择<strong>M0</strong>实例大小，然后禁用备份。正如您所看到的，此群集的价格将是免费的。相当不错。就是这样，点击“创建群集”。</p>
<p><img src="https://p0.ssl.qhimg.com/t01ee214bab74660d67.png" alt=""></p>
<p>创建集群完成之后，为群集添加管理员用户并给他一个复杂度较高的密码。</p>
<p><img src="https://p0.ssl.qhimg.com/t01af414db83229dfc4.png" alt=""></p>
<p>现在，您只需要从任何地方启用访问权限，我们转到IP白名单。</p>
<p><img src="https://p0.ssl.qhimg.com/t012698bfafc76f7e11.png" alt=""></p>
<p>您的群集将需要几分钟才能部署。部署正在进行的时候 ，让我们开始安装一些依赖项。</p>
<h3>安装依赖库</h3>
<p>在任何项目，这个步骤都是我最喜欢的的一部分。我们需要确保这一步骤正确完成，这样才能顺利进行。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm init -y </span>
<span class="hljs-meta">$</span><span class="bash"> npm i --save express mongoose body-parser helmet serverless-http </span>
<span class="hljs-meta">$</span><span class="bash"> npm i --save-dev serverless-offline</span>

</code></pre><p>首先，我们正在安装生产依赖项，您肯定了解Express，Mongoose和BodyParser。Helmet是一个微型中间件，用于通过适当的HTTP头保护您的端点。但是，真正的功能在于Serverless的HTTP模块。它将在Express应用程序中创建代理并将其打包到单个lambda函数中。</p>
<p>最后，我们需要Serverless离线来在本地测试我们的应用程序。然后，我们写一些代码怎么样？</p>
<h3>编写代码</h3>
<p>是时候了！让我们开始吧。</p>
<h4>1. 新建 server.js</h4>
<p>首先，我们需要将handler.js文件重命名为server.js。这里我们先仅仅使用serverless-http模块运行lambda函数的逻辑。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>如您所见，我们需要serverless-http模块，并导出名为run的函数。这将保存serverless-http实例的值，并将我们的app作为参数传递。这就是我们将Express应用程序打包成lambda函数所需的一切！非常简单。</p>
<h4>2. 添加私密变量</h4>
<p>接下来创建secrets.json文件以保存环境变量。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>要获取Atlas群集的连接字符串，请导航到群集仪表板，然后按下 <strong>灰色连接按钮</strong>。按照说明操作，确保URL看起来像上面的字符串。</p>
<h4>3. 创建 Express 应用</h4>
<p>现在我们可以开始编写实际的Express应用程序了。</p>
<p>在名为lib的根目录中创建一个新文件夹。在这里，您需要创建一个app.js文件和db.js文件。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>安装了mongoose可以显着简化与数据库的连接。这就是我们所需要的。</p>
<p><strong>提示</strong>: <strong>process.env.DB</strong>在<strong>secrets.json</strong>中被设置，同时被在<strong>serverless.yml</strong>中被引用。</p>
<p>将db.js切换添加到app.js文件后，粘贴在下面的代码段中。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>如果您曾经使用过Express，您会对此感到熟悉。我们需要引入所有模块，使用中间件，引入我们刚才创建的数据库连接以及绑定到/api路径的路由，但我们还没有编写任何路由。所以，让我们开始吧！</p>
<h4>4. 添加路由</h4>
<p>在lib文件夹中，创建一个名为routes的新文件夹。它将成为应用程序中所有路由的基础。在routes文件夹中创建一个index.js文件并粘贴此代码段。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>现在我们可以添加任何其他路由到这个文件，而不会影响其他任何设置，这会让事情简单很多。</p>
<h4>5. 编写 CRUD 逻辑</h4>
<p>我们已经达到了最有趣的环节。正如您在上面的index.js文件中所看到的，我们需要一个用来定义CRUD操作的notes.controller.js文件，好吧，让我们来创建它。</p>
<p>但是，我们首先需要一个Notes的API模型。在routes文件夹中创建一个notes文件夹，在其中创建另外两个名为note.js和notes.controller.js的文件。在note.js中，我们将定义note的的模型。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>有了标题和描述，我们的例子就可以进行展开了。继续下去，我们准备添加CRUD逻辑，打开notes.controller.js并粘贴这些代码。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>确保不要忘记引入文件顶部的Note模型。除此之外，一切都相当简单。我们使用Mongoose模型方法来创建CRUD操作，当然，使用async/await语法非常舒服，您还应该考虑在await运算符周围添加try-catch块。但是在这里，这个简单的例子就足够了。</p>
<p>关于代码就是这样。我们准备来进行一些测试！</p>
<h3>测试</h3>
<p>在部署我的应用程序之前，我更习惯于在本地进行测试。这就是为什么我会快速告诉您如何使用Serverless-offline模块完成测试。因为您已经安装了它并将其添加到serverless.yml中的plugins部分，所以您只需运行一个命令即可在本地计算机上启动API Gateway和AWS Lambda的本地仿真。</p>
<pre><code class="hljs livecodeserver">$ sls offline <span class="hljs-built_in">start</span> <span class="hljs-comment">--skipCacheInvalidation</span>

</code></pre><p><strong><strong>提示</strong></strong>: 在你项目的根目录运行<strong>sls</strong>然后你会看到很多命令。如果你进行了正确的配置，<strong>sls offline</strong>和<strong>sls offline start</strong>应该是可用的。</p>
<p>为了使您更容易使用此命令，请将其添加到package.json的npm script中。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>添加后，您可以直接运行命令npm run offline，这样更简洁，也更容易记住。回到您的终端并运行它。</p>
<p>您将看到终端告诉您本地服务器已在端口3000上启动。让我们测试一下！</p>
<p>为了测试我的端点，我通常使用Insomnia或Postman，你当然可以随意使用你喜欢的任何工具。首先，通过点击POST端点开始添加一个note。</p>
<p><img src="https://p0.ssl.qhimg.com/t01e4f80da4653863fb.png" alt=""></p>
<p>很好！它的工作方式与预期一致。继续尝试接下来的GET请求。</p>
<p><img src="https://p0.ssl.qhimg.com/t01ed696f90326cda5f.png" alt=""></p>
<p>仍然正确。现在，继续尝试所有其他端点。确保它们都能正常工作，然后，让我们准备好将它部署到AWS。</p>
<h3>部署</h3>
<p>如果我告诉你，部署这个API仅仅需要运行一个命令，你会相信我吗？嗯，事实就是如此。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sls deploy</span>

</code></pre><p>回到终端，运行上面的命令并耐心等待。您会看到终端上出现了一些端点，这些就是您API的端点。</p>
<p>以同样的方式，正如我在上面展示的那样，再次测试这些已部署的端点，确保它们正常工作。</p>
<p>接下来，您可能会注意到您只将API部署到了开发阶段。所以，我们还需要更改NODE_ENV并部署到生产环境。打开secrets.json文件并将第二行更改为：</p>
<pre><code class="hljs 1c"><span class="hljs-string">"NODE_ENV"</span>: <span class="hljs-string">"production"</span>,

</code></pre><p>这将设置你Express API的环境为生产环境，并将阶段设置为生产阶段。在我们部属生产环境的API之前，让我们先删除node_modules文件夹，然后加上--production选项重新安装。</p>
<pre><code class="hljs jboss-cli">$ rm -rf <span class="hljs-string">./node_modules</span> &amp;&amp; npm i <span class="hljs-params">--production</span>

</code></pre><p>这将确保仅安装package.json中依赖项列表中指定的依赖项，而不会包括devDependencies列表中的依赖项。</p>
<p>在部署之前，您只需要注释掉serverless.yml中的plugins部分。</p>
<p><img src="https://p0.ssl.qhimg.com/t01cb117fa189c4d26e.png" alt=""></p>
<p>继续使用与上面相同的命令进行部署。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sls deploy</span>

</code></pre><h3>负载测试</h3>
<p>如果我们不进行任何负载测试，这将不是一个建立生产环境API的正确教程。我倾向于使用一个小的npm模块进行负载测试。它被称为<a href="https://www.npmjs.com/package/loadtest">loadtest</a>，可以通过简单的命令安装。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm i -g loadtest</span>

</code></pre><p><strong>提示</strong>: Linux 用户可能需要使用<em>sudo</em>指令。</p>
<p>让我们逐步增加负载。我们想要运行的命令是10个并发用户使用GET请求100次命中/api/notes路径。</p>
<pre><code class="hljs vim">$ loadtest -n <span class="hljs-number">100</span> -<span class="hljs-keyword">c</span> <span class="hljs-number">10</span> http<span class="hljs-variable">s:</span>//<span class="hljs-symbol">&lt;id&gt;</span>.<span class="hljs-keyword">execute</span>-api.eu-central-<span class="hljs-number">1</span>.amazonaws.<span class="hljs-keyword">com</span>/production/api/notes

</code></pre><p>回应所有这些请求大约花了5秒钟，没有出现错误。您可以放心，无论您最终拥有它的API规模如何，都会自动扩展到您需要的尺寸，并为您的用户提供服务而不会出现任何问题。以下是此负载测试的日志概述。</p>
<p><img src="https://p0.ssl.qhimg.com/t01421b77d0e9bdd20d.gif" alt=""></p>
<p>这个监控工具叫做<a href="https://dashbird.io/">Dashbird</a>。 让我们对它进行设置，以便您也可以正确地监控API。</p>
<h3>监控</h3>
<p>对于Serverless架构而言，工程概述上的存在的缺陷和对应用程序中发生的情况缺乏足够深入了解是真正的问题。有几种产品可以真正帮助减轻这种麻烦——比如<a href="https://dashbird.io/features/">Dashbird</a>，<a href="https://www.datadoghq.com/">Datadog</a>，<a href="https://serverless.com/">Serverless</a>，<a href="https://www.iopipe.com/">IOPipe</a>等等。</p>
<p>您已经快速开始使用上面的Serverless框架了，让我们进行Dashbird的设置。您可以访问<a href="https://dashbird.io/docs/get-started/quick-start/">官方文档并快速入门</a>或者跟随我下面的指导。</p>
<h4>1. 注册</h4>
<p>按照逻辑，我们应该先进行注册，<a href="https://dashbird.io/register/">创建一个帐户</a>即可，不需要信用卡。</p>
<p>注册后，您将被重定向到新手入门页面，您需要在其中添加一个<strong>IAM角色的ARN</strong>。不过幸运的是，Dashbird开发人员为我们创建了一个CloudFormation栈，这使得创建IAM角色变得非常容易。</p>
<h4>2. 为Dashbird创建新的AWS IAM角色</h4>
<p>注册后，您将被重定向到新手入门页面。</p>
<p><img src="https://p0.ssl.qhimg.com/t017093a497bbc7395f.png" alt=""></p>
<p>单击创建新的CloudFormation堆栈的链接，然后按照步骤操作。</p>
<p><img src="https://p0.ssl.qhimg.com/t01906694f38dfcaa87.png" alt=""></p>
<p>您需要做的就是不停点下一步，直到您到达名为<strong>我确认AWS CloudFormation可能会创建IAM资源框</strong>的复选框，选中并创建栈即可。</p>
<p><img src="https://p0.ssl.qhimg.com/t015e2529a5cd4849e0.png" alt=""></p>
<p>创建CloudFormation栈后，您将在控制台中看到它。在这里，您只需复制<strong>DashbirdIntegrationRole</strong>的ARN即可。</p>
<p><img src="https://p0.ssl.qhimg.com/t01d2996a3fb7ab268b.png" alt=""></p>
<p>怎么样，是不是很简单？</p>
<h4>3. 使用创建的角色设置Dashbird</h4>
<p>您需要做的就是粘贴上面复制的角色ARN，然后就可以开始了。Dashbird会检查它是否可以访问您的AWS账户。如果一切设置正确，您将被重定向到该应用程序。日志将在一分钟内开始进行记录。</p>
<p>确保检查您的功能并检查您执行的测试是否在图表上可见。这样，您就已经构建了一个可以随时投入生产的API，可以通过简单的方式部署和监控您的应用程序。给自己鼓鼓掌吧！</p>
<h3>总结</h3>
<p>这是一次充实的冒险之旅！您已经创建了一个生产就绪的Serverless API。使用Serverless架构可能会让你遇到点困难——特别是那些您不习惯的服务，例如Lambda和API Gateway。</p>
<p>我上面展示的方法是我通常使用的方法。通过我的方法，使用Node.js以及您习惯使用的框架、模块和中间件，您可以更轻松地过渡到Serverless架构。</p>
<p>很幸运我们有<a href="https://serverless.com/">Serverless Framework</a>这样的开发工具以及<a href="https://dashbird.io/">Dashbird</a>这样的观测工具，它们让开发的过程变得很简单。</p>
<p>如果你漏掉了上面的某个步骤，<a href="https://github.com/adnanrahic/a-crash-course-on-serverless-apis-with-express-and-mongodb">可以看本项目的代码库</a>——包含项目全部的代码。</p>
<p>如果您想阅读我以前一些关于Serverless的思考，请访问我的<a href="https://medium.com/@adnanrahic">个人资料</a>或加入我的报刊团队！</p>
<p><img src="" alt=""></p>
<p>或者，来顺便看看我写的一些其它的文章：</p>
<ul>
<li><p><a href="https://hackernoon.com/solving-invisible-scaling-issues-with-serverless-and-mongodb-1a065b5a6465">Solving invisible scaling issues with Serverless and MongoDB</a></p>
</li>
<li><p><a href="https://dev.to/adnanrahic/how-to-deploy-a-nodejs-application-to-aws-lambda-using-serverless-2nc7">How to deploy a Node.js application to AWS Lambda using Serverless</a></p>
</li>
<li><p><a href="https://hackernoon.com/getting-started-with-aws-lambda-and-node-js-4ce3259c6dfd">Getting started with AWS Lambda and Node.js</a></p>
</li>
<li><p><a href="https://medium.freecodecamp.org/a-crash-course-on-securing-serverless-apis-with-json-web-tokens-ff657ab2f5a5">A crash course on securing Serverless APIs with JSON web tokens</a></p>
</li>
<li><p><a href="https://hackernoon.com/migrating-your-node-js-rest-api-to-serverless-d2a170e0856c">Migrating your Node.js REST API to Serverless</a></p>
</li>
<li><p><a href="https://hackernoon.com/building-a-serverless-rest-api-with-node-js-and-mongodb-2e0ed0638f47">Building a Serverless REST API with Node.js and MongoDB</a></p>
</li>
<li><p><a href="https://hackernoon.com/a-crash-course-on-serverless-with-node-js-632b37d58b44">A crash course on Serverless with Node.js</a></p>
</li>
</ul>
<p><em>希望大伙喜欢这篇文章，就像我享受创作这篇文章一样。如果你喜欢它，请点一个赞，那么在Medium上的更多人会看它。最后，让我们保持好奇并享受乐趣。</em></p>
<hr>
<p><em>文章首发于</em><a href="https://dev.to/adnanrahic/a-crash-course-on-serverless-apis-with-express-and-mongodb-193k"><em>dev.to</em></a>。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/a-crash-course-on-serverless-apis-with-express-and-mongodb](https://www.zcfy.cc/article/a-crash-course-on-serverless-apis-with-express-and-mongodb)
原文标题: 使用Express和MongoDB构建Serverless API的速成课程
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
