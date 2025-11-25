---
title: '前后端分离开发模式的 mock 平台预研' 
date: 2019-01-31 2:31:16
hidden: true
slug: wuvv2ygl9ur
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/CntChen/cntchen.github.io/issues/1" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<h2 id="articleHeader0">引入</h2>
<p><em>mock（模拟）: 是在项目测试中，对项目外部或不容易获取的对象/接口，<strong>用一个虚拟的对象/接口来模拟</strong>，以便测试。</em></p>
<h2 id="articleHeader1">背景</h2>
<h3 id="articleHeader2">前后端分离</h3>
<ul>
<li><p>前后端仅仅通过异步接口(AJAX/JSONP)来编程</p></li>
<li><p>前后端都各自有自己的开发流程，构建工具，测试集合</p></li>
<li><p>关注点分离，前后端变得相对独立并松耦合</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVFBJ4?w=660&amp;h=377" src="https://static.alili.tech/img/bVFBJ4?w=660&amp;h=377" alt="前后端分离.png" title="前后端分离.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">开发流程</h3>
<ul>
<li><p>后台编写和维护接口文档，在 API 变化时更新接口文档</p></li>
<li><p>后台根据接口文档进行接口开发</p></li>
<li><p>前端根据接口文档进行开发</p></li>
<li><p>开发完成后联调和提交测试</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVFBJ6?w=1506&amp;h=437" src="https://static.alili.tech/img/bVFBJ6?w=1506&amp;h=437" alt="开发流程.png" title="开发流程.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">面临问题</h3>
<ul>
<li><p>没有统一的文档编写规范，导致文档越来越乱，无法维护和阅读</p></li>
<li><p>开发中的接口增删改等变动，需要较大的沟通成本</p></li>
<li><p><strong>对于一个新需求，前端开发的接口调用和自测依赖后台开发完毕</strong></p></li>
<li><p><strong>将接口的风险后置，耽误项目时间</strong></p></li>
</ul>
<h3 id="articleHeader5">解决方法</h3>
<ul>
<li><p>接口文档服务器 -- 解决接口文档编辑和维护的问题</p></li>
<li><p>mock 数据 -- 解决前端开发依赖真实后台接口的问题</p></li>
</ul>
<h2 id="articleHeader6">接口文档服务器</h2>
<h3 id="articleHeader7">功能</h3>
<h4>接口编辑功能</h4>
<ul><li><p>类型1：根据接口描述语法书写接口，并保存为文本文件，然后使用生成工具生成在线接文档（HTML）<br>  -- 也有一些类似 Markdown 的接口文档编辑器，参见：<a href="https://apievangelist.com/2014/11/21/there-are-four-api-design-editors-to-choose-from-now/" rel="nofollow noreferrer" target="_blank">There Are Four API Design Editors To Choose From Now</a>。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVFBJ7?w=1280&amp;h=607" src="https://static.alili.tech/img/bVFBJ7?w=1280&amp;h=607" alt="接口书写转换为接口文档.png" title="接口书写转换为接口文档.png" style="cursor: pointer;"></span></p>
<ul><li><p>类型2：提供在线的接口编辑平台，进行可交互的接口编辑<br><span class="img-wrap"><img data-src="/img/bVFBJ8?w=1224&amp;h=753" src="https://static.alili.tech/img/bVFBJ8?w=1224&amp;h=753" alt="接口文档服务器.png" title="接口文档服务器.png" style="cursor: pointer;"></span></p></li></ul>
<h4>接口查看功能</h4>
<ul><li><p>提供友好的接口文档查看功能</p></li></ul>
<h3 id="articleHeader8">用法</h3>
<ul>
<li><p>后台开发人员进行接口文档编写<br>  -- 定义接口路径、接口上传字段、接口返回字段、字段含义、字段类型、字段取值</p></li>
<li><p>前端开发人员查看接口文档</p></li>
</ul>
<h3 id="articleHeader9">优点</h3>
<ul>
<li><p>统一管理和维护接口文档<br>  -- 提供了接口导入、接口模块化、接口版本化、可视化编辑等功能</p></li>
<li><p>接口文档规范，可读性强，<strong>减少前后端接口沟通成本</strong></p></li>
</ul>
<h2 id="articleHeader10">前端 mock 方法回顾</h2>
<p>前端开发过程中，使用 mock 数据来模拟接口的返回，对开发的代码进行业务逻辑测试。解决开发过程中对后台接口的依赖。</p>
<h3 id="articleHeader11">硬编码数据</h3>
<p>将 mock 数据写在代码中。</p>
<h4>示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// $.ajax({
//   url: ‘https://cntchen.github.io/userInfo’,
//   type: 'GET',
//   success: function(dt) {
    var dt = {
      &quot;isSuccess&quot;: true,
      &quot;errMsg&quot;: &quot;This is error.&quot;,
      &quot;data&quot;: {
        &quot;userName&quot;: &quot;Cntchen&quot;,
        &quot;about&quot;: &quot;FE&quot;
      },
    };
    if (dt.isSuccess) {
      render(dt.data);
    } else {
      console.log(dt.errMsg);
    }
//   },
//   fail: function() {}
// });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// $.ajax({</span>
<span class="hljs-comment">//   url: ‘https://cntchen.github.io/userInfo’,</span>
<span class="hljs-comment">//   type: 'GET',</span>
<span class="hljs-comment">//   success: function(dt) {</span>
    <span class="hljs-keyword">var</span> dt = {
      <span class="hljs-string">"isSuccess"</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-string">"errMsg"</span>: <span class="hljs-string">"This is error."</span>,
      <span class="hljs-string">"data"</span>: {
        <span class="hljs-string">"userName"</span>: <span class="hljs-string">"Cntchen"</span>,
        <span class="hljs-string">"about"</span>: <span class="hljs-string">"FE"</span>
      },
    };
    <span class="hljs-keyword">if</span> (dt.isSuccess) {
      render(dt.data);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(dt.errMsg);
    }
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   fail: function() {}</span>
<span class="hljs-comment">// });</span></code></pre>
<h4>优点</h4>
<ul><li><p>可以快速修改测试数据</p></li></ul>
<h4>痛点</h4>
<ul>
<li><p><strong>无法模拟异步的网络请求，无法测试网络异常</strong></p></li>
<li><p>肮代码，联调前需要做较多改动，<strong>增加最终上真实环境的切换成本</strong><br>  -- 添加网络请求，修改接口、添加错误控制逻辑</p></li>
<li><p>接口文档变化需要手动更新</p></li>
</ul>
<h3 id="articleHeader12">请求拦截 &amp; mock 数据</h3>
<p>hijack（劫持）接口的网络请求，将请求的返回替换为代码中的 mock 数据。</p>
<h4>实例</h4>
<p><a href="https://github.com/jakerella/jquery-mockjax" rel="nofollow noreferrer" target="_blank">jquery-mockjax</a></p>
<blockquote><p>The jQuery Mockjax Plugin provides a simple and extremely flexible interface for mocking or simulating ajax requests and responses</p></blockquote>
<h4>优点</h4>
<ul>
<li><p>可以模拟异步的网络请求</p></li>
<li><p>可以快速修改测试数据</p></li>
</ul>
<h4>痛点</h4>
<ul>
<li><p>依赖特定的框架，如<code>Jquery</code></p></li>
<li><p>增加最终上真实环境的切换成本</p></li>
<li><p>接口文档变换需要手动更新</p></li>
</ul>
<h3 id="articleHeader13">本地 mock 服务器</h3>
<p>将 mock 数据保存为本地文件。在前端调试的构建流中，用 node 开本地 mock 服务器，请求接口指向本地 mock 服务器，本地 mock 服务器 response mock 文件。</p>
<h4>mock 文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mock
├── userInfo.json
├── userStars.json
├── blogs.json
└── following.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.mock</span>
├── userInfo<span class="hljs-selector-class">.json</span>
├── userStars<span class="hljs-selector-class">.json</span>
├── blogs<span class="hljs-selector-class">.json</span>
└── following.json</code></pre>
<h4>接口调用</h4>
<p><code>https://github.com/CntChen/userInfo</code> --&gt; <code>localhost:port/userInfo</code></p>
<h4>优点</h4>
<ul>
<li><p>对代码改动较小，联调测试只需要改动接口 url</p></li>
<li><p>可以快速修改测试数据</p></li>
</ul>
<h4>痛点</h4>
<ul>
<li><p>json 文件非常多</p></li>
<li><p>接口文档变化需要手动更新</p></li>
</ul>
<h3 id="articleHeader14">代理服务器</h3>
<ul>
<li><p>使用 <a href="http://www.charlesproxy.com/" rel="nofollow noreferrer" target="_blank">charles</a> 或 <a href="http://www.telerik.com/fiddler" rel="nofollow noreferrer" target="_blank">fiddler</a> 作为代理服务器</p></li>
<li><p>使用代理服务器的 map（映射）&amp; rewrite（重写） 功能</p></li>
</ul>
<h4>map local</h4>
<ul><li><p>接口请求的返回映射为本地 mock 数据<br><code>https://github.com/CntChen/userInfo</code> --&gt; <code>localPath/userInfo</code></p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVFBJ9?w=516&amp;h=349" src="https://static.alili.tech/img/bVFBJ9?w=516&amp;h=349" alt="map local.png" title="map local.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>编辑映射规则<br><span class="img-wrap"><img data-src="/img/bVFBKa?w=437&amp;h=448" src="https://static.alili.tech/img/bVFBKa?w=437&amp;h=448" alt="map rule.png" title="map rule.png" style="cursor: pointer; display: inline;"></span></p></li></ul>
<h4>map remote</h4>
<ul><li><p>接口请求的返回映射为另一个远程接口的调用<br><span class="img-wrap"><img data-src="/img/bVFBKc?w=527&amp;h=353" src="https://static.alili.tech/img/bVFBKc?w=527&amp;h=353" alt="map remote.png" title="map remote.png" style="cursor: pointer; display: inline;"></span></p></li></ul>
<h4>rewrite</h4>
<ul>
<li><p>修改接口调用的 request 或 response，添加/删除/修改 HTTP <code>request line</code>/<code>response line</code>/<code>headers</code>/<code>body</code><br><span class="img-wrap"><img data-src="/img/bVFBKd?w=527&amp;h=523" src="https://static.alili.tech/img/bVFBKd?w=527&amp;h=523" alt="rewrite data.png" title="rewrite data.png" style="cursor: pointer;"></span></p></li>
<li><p>解决跨域问题<br>使用 map 后，接口调用的 response 不带 CORS headers，跨域请求在浏览器端会报错。需要重写接口返回的 header，添加 CORS 的字段。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVFBKe?w=755&amp;h=558" src="https://static.alili.tech/img/bVFBKe?w=755&amp;h=558" alt="rewrite cors.png" title="rewrite cors.png" style="cursor: pointer;"></span></p>
<h4>优点</h4>
<ul>
<li><p>前端直接请求真实接口，无需修改代码</p></li>
<li><p>可以修改接口返回数据</p></li>
</ul>
<h4>痛点</h4>
<ul>
<li><p><strong>需要处理跨域问题</strong></p></li>
<li><p><strong>一个变更需要代理服务器进行多处改动，配置效率低下</strong></p></li>
<li><p>不支持 HTTP method 的区分<br>  -- CORS 的 preflight 请求(OPTION)也会返回数据</p></li>
<li><p>需要有远程接口或本地 mock 文件，与使用本地 mock 文件相同的痛点</p></li>
</ul>
<h3 id="articleHeader15">mock 平台</h3>
<h4>接口文档服务器</h4>
<p>使用接口文档服务器来定义接口数据结构</p>
<p><span class="img-wrap"><img data-src="/img/bVFBKf?w=1357&amp;h=374" src="https://static.alili.tech/img/bVFBKf?w=1357&amp;h=374" alt="接口服务器.jpg" title="接口服务器.jpg" style="cursor: pointer;"></span></p>
<h4>mock服务器</h4>
<p><strong>mock 服务器根据接口文档自动生成 mock 数据</strong>，实现了接口文档即API</p>
<p><span class="img-wrap"><img data-src="/img/bVFBKg?w=1442&amp;h=388" src="https://static.alili.tech/img/bVFBKg?w=1442&amp;h=388" alt="mock服务器.jpg" title="mock服务器.jpg" style="cursor: pointer;"></span></p>
<h4>优点</h4>
<ul>
<li><p>接口文档自动生成和更新 mock 数据</p></li>
<li><p>前端代码联调时改动小</p></li>
</ul>
<h4>缺点</h4>
<ul><li><p><strong>可能</strong>存在跨域问题</p></li></ul>
<h2 id="articleHeader16">业界实践</h2>
<h3 id="articleHeader17">公司实践</h3>
<p>没有找到公司级别的框架，除了阿里的 <a href="https://github.com/thx/RAP" rel="nofollow noreferrer" target="_blank">RAP</a>。可能原因：</p>
<ul>
<li><p>非关键性、开创性技术，没有太多研究价值</p></li>
<li><p>许多大公司是小团队作战，没有统一的 mock 平台</p></li>
<li><p>已经有一些稳定的接口，并不存在后台接口没有开发完成的问题<br>  -- 而我们想探究的问题是：前后端<strong>同时开发时</strong>的 mock</p></li>
</ul>
<h3 id="articleHeader18">github 开源库</h3>
<ul>
<li><p><a href="https://github.com/marak/Faker.js/" rel="nofollow noreferrer" target="_blank">faker.js</a><br>随机生成固定字段的 mock 数据,如<code>email</code>，<code>date</code>，<code>images</code>等，支持国际化。</p></li>
<li><p><a href="https://apiblueprint.org/" rel="nofollow noreferrer" target="_blank">blueprint</a></p></li>
</ul>
<blockquote><p>A powerful high-level API design language for web APIs.</p></blockquote>
<p>一种使用类markdown语法的接口编写语言，使用json-schema和mson作为接口字段描述。有<a href="https://apiblueprint.org/tools.html" rel="nofollow noreferrer" target="_blank">完善的工具链</a>进行接口文件 Edit，Test，Mock，Parse，Converter等。</p>
<ul><li><p><a href="http://swagger.io/" rel="nofollow noreferrer" target="_blank">swagger</a></p></li></ul>
<blockquote><p>Swagger是一种 Rest API 的简单但强大的表示方式，标准的，语言无关，这种表示方式不但人可读，而且机器可读。可以作为 Rest API 的交互式文档，也可以作为 Rest API 的形式化的接口描述，生成客户端和服务端的代码。 --<a href="https://zhuanlan.zhihu.com/p/21353795" rel="nofollow noreferrer" target="_blank">Swagger：Rest API的描述语言</a></p></blockquote>
<p>定义了一套接口文档编写语法，然后可以自动生成接口文档。相关项目: <a href="https://github.com/swagger-api/swagger-editor" rel="nofollow noreferrer" target="_blank">Swagger Editor</a> ，用于编写 API 文档。<a href="https://github.com/swagger-api/swagger-ui" rel="nofollow noreferrer" target="_blank">Swagger UI</a> restful 接口文档在线自动生成与功能测试软件。<a href="http://petstore.swagger.io/#" rel="nofollow noreferrer" target="_blank">点击查看Swagger-UI在线示例</a>。</p>
<ul><li><p><a href="http://wiremock.org/" rel="nofollow noreferrer" target="_blank">wireMock</a></p></li></ul>
<blockquote><p>WireMock is a simulator for HTTP-based APIs. Some might consider it a service virtualization tool or a mock server. It <strong>supports testing of edge cases and failure modes</strong> that the real API won't reliably produce.</p></blockquote>
<h3 id="articleHeader19">商业化方案</h3>
<ul><li><p><a href="https://apiary.io/" rel="nofollow noreferrer" target="_blank">apiary</a><br>商业化方案，<a href="https://apiblueprint.org/" rel="nofollow noreferrer" target="_blank">blueprint</a>开源项目的创造者。界面化，提供mock功能，生成各编程语言的调用代码(跟 postman 的 generate code snippets类似)。</p></li></ul>
<h3 id="articleHeader20">其他实践</h3>
<p><a href="https://apievangelist.com/" rel="nofollow noreferrer" target="_blank">API Evangelist(API 布道者)</a></p>
<h2 id="articleHeader21">总结</h2>
<p>对于前后端分离开发方式，已经有比较成熟的 mock 平台，主要解决了2个问题：</p>
<ul>
<li><p>接口文档的编辑和维护</p></li>
<li><p>接口 mock 数据的自动生成和更新</p></li>
</ul>
<h2 id="articleHeader22">后记</h2>
<p>预研时间比较有限，有一些新的 mock 模式或优秀的 mock 平台没有覆盖到，欢迎补充。<br>笔者所在公司选用的平台是 <a href="https://github.com/thx/RAP" rel="nofollow noreferrer" target="_blank">RAP</a>，后续会整理一篇 RAP 实践方面的文章。<br>问题来了：你开发中的 mock 方式是什么？</p>
<h2 id="articleHeader23">References</h2>
<ul><li><p>图解基于node.js实现前后端分离</p></li></ul>
<blockquote><p><a href="http://yalishizhude.github.io/2016/04/19/front-back-separation/" rel="nofollow noreferrer" target="_blank">http://yalishizhude.github.io...</a></p></blockquote>
<ul><li><p>TestDouble(介绍 mock 相关的概念)</p></li></ul>
<blockquote><p><a href="http://martinfowler.com/bliki/TestDouble.html" rel="nofollow noreferrer" target="_blank">http://martinfowler.com/bliki...</a></p></blockquote>
<ul><li><p>There Are Four API Design Editors To Choose From Now</p></li></ul>
<blockquote><p><a href="https://apievangelist.com/2014/11/21/there-are-four-api-design-editors-to-choose-from-now/" rel="nofollow noreferrer" target="_blank">https://apievangelist.com/201...</a></p></blockquote>
<ul><li><p>联调之痛--契约测试</p></li></ul>
<blockquote><p><a href="http://www.ituring.com.cn/article/42460" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/art...</a></p></blockquote>
<ul><li><p>Swagger：Rest API的描述语言</p></li></ul>
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/21353795" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p></blockquote>
<ul><li><p>Swagger - 前后端分离后的契约</p></li></ul>
<blockquote><p><a href="http://www.cnblogs.com/whitewolf/p/4686154.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/whitew...</a></p></blockquote>
<ul><li><p>Swagger UI教程 API 文档神器 搭配Node使用</p></li></ul>
<blockquote><p><a href="http://www.jianshu.com/p/d6626e6bd72c#" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/d662...</a></p></blockquote>
<h2 id="articleHeader24">END</h2>
<hr>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前后端分离开发模式的 mock 平台预研

## 原文链接
[https://segmentfault.com/a/1190000007494196](https://segmentfault.com/a/1190000007494196)

