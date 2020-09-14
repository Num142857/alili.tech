---
title: '摘自RisingStack：用Nightwatch.js做Node.js平台端到端测试' 
date: 2019-01-25 2:30:23
hidden: true
slug: j51wgb2aor
categories: [reprint]
---

{{< raw >}}

            <h1>用Nightwatch.js做Node.js平台端到端测试</h1>
<h2>什么是Node.js平台的端到端测试？</h2>
<p>先不要急着看码例。首先我们有必要探讨一下端到端测试到底是什么，然后才能学习如何为Node.js平台项目进行测试。</p>
<p><strong>第一，端到端测试是黑箱测试的工具之一。</strong>这就意味着写测试的人只审查软件功能，不知道软件内部如何实现，即不看源代码。</p>
<p><strong>第二，端到端测试也可以用作用户验收测试(UAT)。</strong> 用户验收测试是验证这个解决方案对用户来说确实可用的过程，关注的不是拼写之类的小错误，而是那些会使系统瘫痪、或使系统功能无法满足用户需求的问题。</p>
<p><a href="https://twitter.com/share?text=%22End-to-end%20testing%20can%20also%20be%20used%20as%20user%20acceptance%20testing%2C%20or%20UAT%22%20via%20%40RisingStack;url=https://blog.risingstack.com/end-to-end-testing-with-nightwatch-js-node-js-at-scale">“端到端测试也可以用作用户验收测试(UAT)”，见RisingStack</a></p>
<p><a href="https://twitter.com/share?text=%22End-to-end%20testing%20can%20also%20be%20used%20as%20user%20acceptance%20testing%2C%20or%20UAT%22%20via%20%40RisingStack;url=https://blog.risingstack.com/end-to-end-testing-with-nightwatch-js-node-js-at-scale">点击发推</a></p>
<h2>进入Nightwatch.js</h2>
<p>Nightwatch.js让大家能<em>“在Node.js平台上省时省力地编写运行于Selenium/WebDriver服务器上的端到端测试”</em>。</p>
<p><strong>Nightwatch带有以下功能：</strong></p>
<ul>
<li><p>内置测试运行程序，</p>
</li>
<li><p>能控制selenium服务器，</p>
</li>
<li><p>支持由供应商提供并运行的selenium主机，比如BrowserStack或SauceLabs上的主机，</p>
</li>
<li><p>用CSS和Xpath选择元素。</p>
</li>
</ul>
<h3>安装Nightwatch</h3>
<p>想在本地运行Nightwatch，要稍微多做点事。<strong>在本地环境里需要有一个独立Selenium服务器，以及webdriver程序，</strong>这样才能使用Chrome/Firefox浏览器对程序进行本地测试。</p>
<p>有了以上三个工具，我们就要实施下图所示的工作流程了。</p>
<p><img src="http://p0.qhimg.com/t012ce2a8a6a174ee6f.png" alt="node.js平台nightwatch.js端到端测试流程图"></p>
<p><em>感谢：<a href="http://nightwatchjs.org">nightwatchjs.org</a>提供的图片</em></p>
<h4>第一步：添加Nightwatch</h4>
<p>只要运行<code>npm install nightwatch --save-dev</code>命令就可以将Nightwatch添加到项目里去。</p>
<p>_这个命令把Nightwatch的可执行文件放到了<code>./node_modules/.bin</code>文件夹里，这样就不用全局安装了。_</p>
<h4>第二步：下载Selenium程序</h4>
<p>Selenium是多平台上网站浏览器自动化的工具套件。</p>
<blockquote>
<p>先决条件：确保JDK安装好了，版本至少是7。如果还没装，可以到<a href="http://oracle.com/technetwork/java/javase/downloads/index.html">这里</a>下载。</p>
</blockquote>
<p>Selenium服务器是一个Java程序。Nightwatch用了这个程序就可以连接到各种各样的浏览器上去。在<a href="http://selenium-release.storage.googleapis.com/index.html">这里</a>可以下载二进制执行文件。</p>
<p>下载了JAR文件后，在项目里创建一个<code>bin</code>文件夹，把文件放进去。我们要设置好让Nightwatch使用这个文件，这样就不必手动启动Selenium服务器程序了。</p>
<h4>第三步：下载Chromedriver程序</h4>
<p>ChromeDriver是一个独立的服务器，为Chromium浏览器实现了W3C的WebDriver有线协议。</p>
<p>去<a href="https://sites.google.com/a/chromium.org/chromedriver/downloads">下载页面</a>获取可执行文件，同样把文件放到<code>bin</code>文件夹里去。</p>
<h4>第四步：配置Nightwatch.js</h4>
<p>基本Nightwatch配置可以通过一个<code>json</code>配置文件来完成。</p>
<p>我们创建一个<code>nightwatch.json</code>文件，填上以下内容：</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"src_folders"</span> : [<span class="hljs-string">"tests"</span>],
  <span class="hljs-attr">"output_folder"</span> : <span class="hljs-string">"reports"</span>,

  <span class="hljs-attr">"selenium"</span> : {
    <span class="hljs-attr">"start_process"</span> : <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"server_path"</span> : <span class="hljs-string">"./bin/selenium-server-standalone-3.3.1.jar"</span>,
    <span class="hljs-attr">"log_path"</span> : <span class="hljs-string">""</span>,
    <span class="hljs-attr">"port"</span> : <span class="hljs-number">4444</span>,
    <span class="hljs-attr">"cli_args"</span> : {
      <span class="hljs-attr">"webdriver.chrome.driver"</span> : <span class="hljs-string">"./bin/chromedriver"</span>
    }
  },

  <span class="hljs-attr">"test_settings"</span> : {
    <span class="hljs-attr">"default"</span> : {
      <span class="hljs-attr">"launch_url"</span> : <span class="hljs-string">"http://localhost"</span>,
      <span class="hljs-attr">"selenium_port"</span>  : <span class="hljs-number">4444</span>,
      <span class="hljs-attr">"selenium_host"</span>  : <span class="hljs-string">"localhost"</span>,
      <span class="hljs-attr">"desiredCapabilities"</span>: {
        <span class="hljs-attr">"browserName"</span>: <span class="hljs-string">"chrome"</span>,
        <span class="hljs-attr">"javascriptEnabled"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">"acceptSslCerts"</span>: <span class="hljs-literal">true</span>
      }
    }
  }
}

</code></pre><p>有了这个配置文件，我们就告诉了Nightwatch去哪里找Selenium服务器和Chromedriver的二进制执行文件，以及想运行的测试在哪里。</p>
<p><img src="http://s4.qhres.com/static/b964fa6cd00b3e46.svg" alt=""></p>
<p>译注：下面是广告</p>
<h4>在做品控时，大家不应该依赖端到端测试。要用追踪方法找出所有的问题，不要留给用户发现。</h4>
<h5>RisingStack专家关于Node.js监控与调试的建议</h5>
<p><a href="https://trace.risingstack.com?utm_source=rsblog&amp;utm_medium=roadblock-new&amp;utm_campaign=trace" title="追踪Node.js平台监控信息">想了解更多，看</a> </p>
<h4>即时小结</h4>
<p>目前为止，我们安装好了Nightwatch，下载好了独立的Selenium服务器，以及Chromedriver程序。做好了这几步，必备工具就都齐了，可以用Node.js平台和Selenium软件创建端到端测试了。</p>
<h3>编写第一个Nightwatch测试</h3>
<p>让我们在<code>tests</code>文件夹里添加一个新文件，叫作<code>homepage.js</code>。</p>
<p>我们这个例子是从<a href="http://nightwatchjs.org/gettingstarted">Nightwatch初学指南</a>里来的。我们的测试脚本会去Google网站，搜索Rembrandt这个词，然后查看维基页面：</p>
<pre><code class="hljs lua">module.exports = {
  <span class="hljs-string">'Demo test Google'</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(client)</span></span> {
    client
      .url(<span class="hljs-string">'http://www.google.com'</span>)
      .waitForElementVisible(<span class="hljs-string">'body'</span>, <span class="hljs-number">1000</span>)
      .<span class="hljs-built_in">assert</span>.title(<span class="hljs-string">'Google'</span>)
      .<span class="hljs-built_in">assert</span>.visible(<span class="hljs-string">'input[type=text]'</span>)
      .setValue(<span class="hljs-string">'input[type=text]'</span>, <span class="hljs-string">'rembrandt van rijn'</span>)
      .waitForElementVisible(<span class="hljs-string">'button[name=btnG]'</span>, <span class="hljs-number">1000</span>)
      .click(<span class="hljs-string">'button[name=btnG]'</span>)
      .pause(<span class="hljs-number">1000</span>)
      .<span class="hljs-built_in">assert</span>.containsText(<span class="hljs-string">'ol#rso li:first-child'</span>,
        <span class="hljs-string">'Rembrandt - Wikipedia'</span>)
      .<span class="hljs-keyword">end</span>()
  }
}

</code></pre><p><strong>接下来只要运行Nightwatch程序本身就行了！</strong>关于这一步，我建议在<code>package.json</code>的脚本部分加一段新脚本：</p>
<pre><code class="hljs xquery"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"test-e2e"</span>: <span class="hljs-string">"nightwatch"</span>
}

</code></pre><p>最后一步要做的就是用这个命令运行测试：</p>
<pre><code class="hljs dockerfile">`npm <span class="hljs-keyword">run</span><span class="bash"> <span class="hljs-built_in">test</span>-e2e`
</span>
</code></pre><p>如果一切顺利，测试就会打开Chrome浏览器，然后访问Google和维基。</p>
<h3>项目中的Nightwatch.js</h3>
<p>既然已经明白了端到端测试是什么，也懂得如何设置Nightwatch了，那就该开始把它加到项目里去了。</p>
<p>为了做到这一点，还有一些问题要考虑，但请记住，没有万能的方法。<strong>根据企业需求不同，以下问题的答案可能也会不同：</strong></p>
<ul>
<li><p>在哪里运行测试？是在产品发布前？还是在产品发布后？什么时候生成测试用的容器？</p>
</li>
<li><p>要测试什么情景？</p>
</li>
<li><p>什么时候由谁来写端到端测试？</p>
</li>
</ul>
<h3>总结与预告</h3>
<p>在这一章的Node.js at Scale里我们学习了：</p>
<ul>
<li><p>如何设置Nightwatch；</p>
</li>
<li><p>如何设置Nightwatch来使用独立Selenium服务器；</p>
</li>
<li><p>如何编写基本端到端测试。</p>
</li>
</ul>
<p><strong>在下一章里，我们要探究如何<a href="https://blog.risingstack.com/monitoring-nodejs-applications-nodejs-at-scale/">监控用于产品发布的Node.js平台基础结构。</a></strong></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
摘自RisingStack：用Nightwatch.js做Node.js平台端到端测试

## 原文链接
[https://www.zcfy.cc/article/node-js-end-to-end-testing-with-nightwatch-js-risingstack](https://www.zcfy.cc/article/node-js-end-to-end-testing-with-nightwatch-js-risingstack)

