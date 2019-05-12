---
title: '介绍 Flashback，一个互联网模拟工具' 
date: 2019-01-22 2:30:07
hidden: true
slug: t9ppv5ukm8h
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#介绍-flashback一个互联网模拟工具"></a>介绍 Flashback，一个互联网模拟工具</h1>
<blockquote>
<p>Flashback 用于测试目的来模拟 HTTP 和 HTTPS 资源，如 Web 服务和 REST API。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/53a4804fb4ca54265a30d72d75ba699f38c6f9b5/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f4f5344435f496e7465726e65745f4361626c65735f353230783239325f303631345f52442e706e673f69746f6b3d74726a5957673667"><img src="https://p0.ssl.qhimg.com/t01796d569915806c0f.png" alt="Introducing Flashback, an Internet mocking tool" title="Introducing Flashback, an Internet mocking tool"></a></p>
<p>在 LinkedIn，我们经常开发需要与第三方网站交互的 Web 应用程序。我们还采用自动测试，以确保我们的软件在发布到生产环境之前的质量。然而，测试只是在它可靠时才有用。</p>
<p>考虑到这一点，有外部依赖关系的测试是有很大的问题的，例如在第三方网站上。这些外部网站可能会没有通知地发生改变、遭受停机，或者由于互联网的不可靠性暂时无法访问。</p>
<p>如果我们的一个测试依赖于能够与第三方网站通信，那么任何故障的原因都很难确定。失败可能是因为 LinkedIn 的内部变更、第三方网站的维护人员进行的外部变更，或网络基础设施的问题。你可以想像，与第三方网站的交互可能会有很多失败的原因，因此你可能想要知道，我将如何处理这个问题？</p>
<p>好消息是有许多互联网模拟工具可以帮助。其中一个是 <a href="https://github.com/betamaxteam/betamax">Betamax</a>。它通过拦截 Web 应用程序发起的 HTTP 连接，之后进行重放的方式来工作。对于测试，Betamax 可以用以前记录的响应替换 HTTP 上的任何交互，它可以非常可靠地提供这个服务。</p>
<p>最初，我们选择在 LinkedIn 的自动化测试中使用 Betamax。它工作得很好，但我们遇到了一些问题：</p>
<ul>
<li>出于安全考虑，我们的测试环境没有接入互联网。然而，与大多数代理一样，Betamax 需要 Internet 连接才能正常运行。</li>
<li>我们有许多需要使用身份验证协议的情况，例如 OAuth 和 OpenId。其中一些协议需要通过 HTTP 进行复杂的交互。为了模拟它们，我们需要一个复杂的模型来捕获和重放请求。</li>
</ul>
<p>为了应对这些挑战，我们决定基于 Betamax 的思路，构建我们自己的互联网模拟工具，名为 Flashback。我们也很自豪地宣布 Flashback 现在是开源的。</p>
<h3><a href="#什么是-flashback"></a>什么是 Flashback?</h3>
<p>Flashback 用于测试目的来模拟 HTTP 和 HTTPS 资源，如 Web 服务和 <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST</a> API。它记录 HTTP/HTTPS 请求并重放以前记录的 HTTP 事务 - 我们称之为“场景scene”，这样就不需要连接到 Internet 才能完成测试。</p>
<p>Flashback 也可以根据请求的部分匹配重放场景。它使用的是“匹配规则”。匹配规则将传入请求与先前记录的请求相关联，然后将其用于生成响应。例如，以下代码片段实现了一个基本匹配规则，其中测试方法“匹配”<a href="https://gist.github.com/anonymous/91637854364287b38897c0970aad7451">此 URL</a>的传入请求。</p>
<p>HTTP 请求通常包含 URL、方法、标头和正文。Flashback 允许为这些组件的任意组合定义匹配规则。Flashback 还允许用户向 URL 查询参数，标头和正文添加白名单或黑名单标签。</p>
<p>例如，在 OAuth 授权流程中，请求查询参数可能如下所示：</p>
<pre><code class="hljs ini"><span class="hljs-attr">oauth_consumer_key</span>=<span class="hljs-string">"jskdjfljsdklfjlsjdfs"</span>,
<span class="hljs-attr">oauth_nonce</span>=<span class="hljs-string">"ajskldfjalksjdflkajsdlfjasldfja;lsdkj"</span>,
<span class="hljs-attr">oauth_signature</span>=<span class="hljs-string">"asdfjaklsdjflasjdflkajsdklf"</span>,
<span class="hljs-attr">oauth_signature_method</span>=<span class="hljs-string">"HMAC-SHA1"</span>,
<span class="hljs-attr">oauth_timestamp</span>=<span class="hljs-string">"1318622958"</span>,
<span class="hljs-attr">oauth_token</span>=<span class="hljs-string">"asdjfkasjdlfajsdklfjalsdjfalksdjflajsdlfa"</span>,
<span class="hljs-attr">oauth_version</span>=<span class="hljs-string">"1.0"</span>

</code></pre><p>这些值许多将随着每个请求而改变，因为 OAuth 要求客户端每次为 <code>oauth_nonce</code> 生成一个新值。在我们的测试中，我们需要验证 <code>oauth_consumer_key</code>、<code>oauth_signature_method</code> 和 <code>oauth_version</code> 的值，同时确保 <code>oauth_nonce</code>、<code>oauth_signature</code>、<code>oauth_timestamp</code> 和 <code>oauth_token</code> 存在于请求中。Flashback 使我们有能力创建我们自己的匹配规则来实现这一目标。此功能允许我们测试随时间变化的数据、签名、令牌等的请求，而客户端没有任何更改。</p>
<p>这种灵活的匹配和在不连接互联网的情况下运行的功能是 Flashback 与其他模拟解决方案不同的特性。其他一些显著特点包括：</p>
<ul>
<li>Flashback 是一种跨平台和跨语言解决方案，能够测试 JVM（Java虚拟机）和非 JVM（C++、Python 等）应用程序。</li>
<li>Flashback 可以随时生成 SSL/TLS 证书，以模拟 HTTPS 请求的安全通道。</li>
</ul>
<h3><a href="#如何记录-http-事务"></a>如何记录 HTTP 事务</h3>
<p>使用 Flashback 记录 HTTP 事务以便稍后重放是一个比较简单的过程。在我们深入了解流程之前，我们首先列出一些术语：</p>
<ul>
<li><code>Scene</code> ：场景存储以前记录的 HTTP 事务 (以 JSON 格式)，它可以在以后重放。例如，这里是一个<a href="https://gist.github.com/anonymous/17d226050d8a9b79746a78eda9292382">Flashback 场景</a>示例。</li>
<li><code>Root Path</code> ：根路径是包含 Flashback 场景数据的目录的文件路径。</li>
<li><code>Scene Name</code> ：场景名称是给定场景的名称。</li>
<li><code>Scene Mode</code> ：场景模式是使用场景的模式, 即“录制”或“重放”。</li>
<li><code>Match Rule</code> ：匹配规则确定传入的客户端请求是否与给定场景的内容匹配的规则。</li>
<li><code>Flashback Proxy</code> ：Flashback 代理是一个 HTTP 代理，共有录制和重放两种操作模式。</li>
<li><code>Host</code> 和 <code>Port</code> ：代理主机和端口。</li>
</ul>
<p>为了录制场景，你必须向目的地址发出真实的外部请求，然后 HTTPS 请求和响应将使用你指定的匹配规则存储在场景中。在录制时，Flashback 的行为与典型的 MITM（中间人）代理完全相同 - 只有在重放模式下，连接流和数据流仅限于客户端和代理之间。</p>
<p>要实际看下 Flashback，让我们创建一个场景，通过执行以下操作捕获与 example.org 的交互：</p>
<p>1、 取回 Flashback 的源码：</p>
<pre><code class="hljs crmsh">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/linkedin/flashback.git

</code></pre><p>2、 启动 Flashback 管理服务器：</p>
<pre><code class="hljs stylus">./startAdminServer<span class="hljs-selector-class">.sh</span> -port <span class="hljs-number">1234</span>

</code></pre><p>3、 注意上面的 Flashback 将在本地端口 5555 上启动录制模式。匹配规则需要完全匹配（匹配 HTTP 正文、标题和 URL）。场景将存储在 <code>/tmp/test1</code> 下。</p>
<p>4、 Flashback 现在可以记录了，所以用它来代理对 example.org 的请求：</p>
<pre><code class="hljs groovy">curl <span class="hljs-string">http:</span><span class="hljs-comment">//www.example.org -x localhost:5555 -X GET</span>

</code></pre><p>5、 Flashback 可以（可选）在一个记录中记录多个请求。要完成录制，<a href="https://gist.github.com/anonymous/f899ebe7c4246904bc764b4e1b93c783">关闭 Flashback</a>。</p>
<p>6、 要验证已记录的内容，我们可以在输出目录（<code>/tmp/test1</code>）中查看场景的内容。它应该<a href="https://gist.github.com/sf1152/c91d6d62518fe62cc87157c9ce0e60cf">包含以下内容</a>。</p>
<p><a href="https://gist.github.com/anonymous/fdd972f1dfc7363f4f683a825879ce19">在 Java 代码中使用 Flashback</a>也很容易。</p>
<h3><a href="#如何重放-http-事务"></a>如何重放 HTTP 事务</h3>
<p>要重放先前存储的场景，请使用与录制时使用的相同的基本设置。唯一的区别是<a href="https://gist.github.com/anonymous/ae1c519a974c3bc7de2a925254b6550e">将“场景模式”设置为上述步骤 3 中的“播放”</a>。</p>
<p>验证响应来自场景而不是外部源的一种方法，是在你执行步骤 1 到 6 时临时禁用 Internet 连接。另一种方法是修改场景文件，看看响应是否与文件中的相同。</p>
<p>这是 <a href="https://gist.github.com/anonymous/edcc1d60847d51b159c8fd8a8d0a5f8b">Java 中的一个例子</a>。</p>
<h3><a href="#如何记录并重播-https-事务"></a>如何记录并重播 HTTPS 事务</h3>
<p>使用 Flashback 记录并重放 HTTPS 事务的过程非常类似于 HTTP 事务的过程。但是，需要特别注意用于 HTTPS SSL 组件的安全证书。为了使 Flashback 作为 MITM 代理，必须创建证书颁发机构（CA）证书。在客户端和 Flashback 之间创建安全通道时将使用此证书，并允许 Flashback 检查其代理的 HTTPS 请求中的数据。然后将此证书存储为受信任的源，以便客户端在进行调用时能够对 Flashback 进行身份验证。有关如何创建证书的说明，有很多<a href="https://jamielinux.com/docs/openssl-certificate-authority/introduction.html">类似这样</a>的资源是非常有帮助的。大多数公司都有自己的管理和获取证书的内部策略 - 请务必用你们自己的方法。</p>
<p>这里值得一提的是，Flashback 仅用于测试目的。你可以随时随地将 Flashback 与你的服务集成在一起，但需要注意的是，Flashback 的记录功能将需要存储所有的数据，然后在重放模式下使用它。我们建议你特别注意确保不会无意中记录或存储敏感成员数据。任何可能违反贵公司数据保护或隐私政策的行为都是你的责任。</p>
<p>一旦涉及安全证书，HTTP 和 HTTPS 之间在记录设置方面的唯一区别是添加了一些其他参数。</p>
<ul>
<li><code>RootCertificateInputStream</code>： 表示 CA 证书文件路径或流。</li>
<li><code>RootCertificatePassphrase</code>： 为 CA 证书创建的密码。</li>
<li><code>CertificateAuthority</code>： CA 证书的属性</li>
</ul>
<p><a href="https://gist.github.com/anonymous/091d13179377c765f63d7bf4275acc11">查看 Flashback 中用于记录 HTTPS 事务的代码</a>，它包括上述条目。</p>
<p>用 Flashback 重放 HTTPS 事务的过程与录制相同。唯一的区别是场景模式设置为“播放”。这在<a href="https://gist.github.com/anonymous/ec6a0fd07aab63b7369bf8fde69c1f16">此代码</a>中演示。</p>
<h3><a href="#支持动态修改"></a>支持动态修改</h3>
<p>为了测试灵活性，Flashback 允许你动态地更改场景和匹配规则。动态更改场景允许使用不同的响应（如 <code>success</code>、<code>time_out</code>、<code>rate_limit</code> 等）测试相同的请求。<a href="https://gist.github.com/anonymous/1f1660280acb41277fbe2c257bab2217">场景更改</a>仅适用于我们已经 POST 更新外部资源的场景。以下图为例。</p>
<p><a href="https://camo.githubusercontent.com/9be5ad9c426fb58fedc4ff42b7eba358740c0172/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f6368616e67696e677363656e65732e6a7067"><img src="https://p0.ssl.qhimg.com/t01af848bd562246552.jpg" alt="Scenarios where we have POSTed data to update the external resource." title="Scenarios where we have POSTed data to update the external resource."></a></p>
<p>能够动态<a href="https://gist.github.com/anonymous/0683c43f31bd916b76aff348ff87f51b">更改匹配规则</a>可以使我们测试复杂的场景。例如，我们有一个使用情况，要求我们测试 Twitter 的公共和私有资源的 HTTP 调用。对于公共资源，HTTP 请求是不变的，所以我们可以使用 “MatchAll” 规则。然而，对于私人资源，我们需要使用 OAuth 消费者密码和 OAuth 访问令牌来签名请求。这些请求包含大量具有不可预测值的参数，因此静态 MatchAll 规则将无法正常工作。</p>
<h3><a href="#使用案例"></a>使用案例</h3>
<p>在 LinkedIn，Flashback 主要用于在集成测试中模拟不同的互联网提供商，如下图所示。第一张图展示了 LinkedIn 生产数据中心内的一个内部服务，通过代理层，与互联网提供商（如 Google）进行交互。我们想在测试环境中测试这个内部服务。</p>
<p><a href="https://camo.githubusercontent.com/fd2997bacd65c482df5c9b40a535fe3e1736d891/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f74657374696e67656e7669726f6e6d656e742e6a7067"><img src="https://p0.ssl.qhimg.com/t01eda2eea9a9af465f.jpg" alt="Testing this internal service in a testing environment." title="Testing this internal service in a testing environment."></a></p>
<p>第二和第三张图表展示了我们如何在不同的环境中录制和重放场景。记录发生在我们的开发环境中，用户在代理启动的同一端口上启动 Flashback。从内部服务到提供商的所有外部请求将通过 Flashback 而不是我们的代理层。在必要场景得到记录后，我们可以将其部署到我们的测试环境中。</p>
<p><a href="https://camo.githubusercontent.com/5581aeb16d41bb9aacc5c1d85b2965425bdd9d0f/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f74657374656e7669726f6e6d656e74696d616765322e6a7067"><img src="https://p0.ssl.qhimg.com/t014614c80b37eaa431.jpg" alt="After the necessary scenes get recorded, we can deploy them to our test environment." title="After the necessary scenes get recorded, we can deploy them to our test environment."></a></p>
<p>在测试环境（隔离并且没有 Internet 访问）中，Flashback 在与开发环境相同的端口上启动。所有 HTTP 请求仍然来自内部服务，但响应将来自 Flashback 而不是 Internet 提供商。</p>
<p><a href="https://camo.githubusercontent.com/b8c5865f2bd8058361be165b9f8352c0194f79eb/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f666c6173686261636b726573706f6e736573696d6167652e6a7067"><img src="https://p0.ssl.qhimg.com/t0142f1770ddc12d8aa.jpg" alt="Responses will come from Flashback instead of the Internet providers." title="Responses will come from Flashback instead of the Internet providers."></a></p>
<h3><a href="#未来方向"></a>未来方向</h3>
<p>我们希望将来可以支持非 HTTP 协议（如 FTP 或 JDBC），甚至可以让用户使用 MITM 代理框架来自行注入自己的定制协议。我们将继续改进 Flashback 设置 API，使其更容易支持非 Java 语言。</p>
<h3><a href="#现在为一个开源项目"></a>现在为一个开源项目</h3>
<p>我们很幸运能够在 GTAC 2015 上发布 Flashback。在展会上，有几名观众询问是否将 Flashback 作为开源项目发布，以便他们可以将其用于自己的测试工作。</p>
<h3><a href="#google-techtalksgatc-2015---模拟互联网"></a>Google TechTalks：GATC 2015 - 模拟互联网</h3>
&lt;iframe allowfullscreen="" frameborder="0" height="315" src="[https://www.youtube.com/embed/6gPNrujpmn0?origin=https://opensource.com&amp;enablejsapi=1](https://www.youtube.com/embed/6gPNrujpmn0?origin=https://opensource.com&amp;enablejsapi=1)" width="560" id="6gPNrujpmn0" data-sdi="true"&gt;&lt;/iframe&gt;

<p>我们很高兴地宣布，Flashback 现在以 BSD 两句版许可证开源。要开始使用，请访问 <a href="https://github.com/linkedin/flashback">Flashback GitHub 仓库</a>。</p>
<p><em>该文原始发表在<a href="https://engineering.linkedin.com/blog/2017/03/flashback-mocking-tool">LinkedIn 工程博客上</a>。获得转载许可</em></p>
<h3><a href="#致谢"></a>致谢</h3>
<p>Flashback 由 <a href="https://www.linkedin.com/in/shangshangfeng">Shangshang Feng</a>、<a href="https://www.linkedin.com/in/benykang">Yabin Kang</a> 和 <a href="https://www.linkedin.com/in/danvinegrad/">Dan Vinegrad</a> 创建，并受到 <a href="https://github.com/betamaxteam/betamax">Betamax</a> 启发。特别感谢 <a href="https://www.linkedin.com/in/hwansoo/">Hwansoo Lee</a>、<a href="https://www.linkedin.com/in/eranl/">Eran Leshem</a>、<a href="https://www.linkedin.com/in/kunalkandekar/">Kunal Kandekar</a>、<a href="https://www.linkedin.com/in/dsouzakeith/">Keith Dsouza</a> 和 <a href="https://www.linkedin.com/in/kang-wang-44960b4/">Kang Wang</a> 帮助审阅代码。同样感谢我们的管理层 - <a href="https://www.linkedin.com/in/byronma/">Byron Ma</a>、<a href="https://www.linkedin.com/in/yazshimizu/">Yaz Shimizu</a>、<a href="https://www.linkedin.com/in/yuliya-averbukh-818a41/">Yuliya Averbukh</a>、<a href="https://www.linkedin.com/in/chazlett/">Christopher Hazlett</a> 和 <a href="https://www.linkedin.com/in/dudcat/">Brandon Duncan</a> - 感谢他们在开发和开源 Flashback 中的支持。</p>
<p>（题图：Opensource.com）</p>
<hr>
<p>作者简介：</p>
<p>Shangshang Feng - Shangshang 是 LinkedIn 纽约市办公室的高级软件工程师。在 LinkedIn 他从事了三年半的网关平台工作。在加入 LinkedIn 之前，他曾在 Thomson Reuters 和 ViewTrade 证券的基础设施团队工作。</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/4/flashback-internet-mocking-tool">https://opensource.com/article/17/4/flashback-internet-mocking-tool</a></p>
<p>作者：<a href="https://opensource.com/users/shangshangfeng">Shangshang Feng</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
介绍 Flashback，一个互联网模拟工具

## 原文链接
[https://www.zcfy.cc/article/introducing-flashback-an-internet-mocking-tool](https://www.zcfy.cc/article/introducing-flashback-an-internet-mocking-tool)

