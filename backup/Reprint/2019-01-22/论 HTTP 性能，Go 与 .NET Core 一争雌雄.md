---
title: '论 HTTP 性能，Go 与 .NET Core 一争雌雄' 
date: 2019-01-22 2:30:07
hidden: true
slug: ix29lo6dc2g
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#论-http-性能go-与net-core-一争雌雄"></a>论 HTTP 性能，Go 与 .NET Core 一争雌雄</h1>
<p>朋友们，你们好！</p>
<p>近来，我听到了大量的关于新出的 .NET Core 和其性能的讨论，尤其在 Web 服务方面的讨论更甚。</p>
<p>因为是新出的，我不想立马就比较两个不同的东西，所以我耐心等待，想等发布更稳定的版本后再进行。</p>
<p>本周一（8 月 14 日），微软<a href="https://blogs.msdn.microsoft.com/dotnet/2017/08/14/announcing-net-core-2-0/">发布 .NET Core 2.0 版本</a>，因此，我准备开始。您们认为呢？</p>
<p>如前面所提的，我们会比较它们相同的东西，比如应用程序、预期响应及运行时的稳定性，所以我们不会把像对 JSON 或者 XML 的编码、解码这些烦多的事情加入比较游戏中来，仅仅只会使用简单的文本消息。为了公平起见，我们会分别使用 Go 和 .NET Core 的 <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller">MVC 架构模式</a>。</p>
<h3><a href="#参赛选手"></a>参赛选手</h3>
<p><a href="https://golang.org/">Go</a> （或称 Golang）： 是一种<a href="http://www.tiobe.com/tiobe-index/">快速增长</a>的开源编程语言，旨在构建出简单、快捷和稳定可靠的应用软件。</p>
<p>用于支持 Go 语言的 MVC web 框架并不多，还好我们找到了 Iris ，可胜任此工作。</p>
<p><a href="http://iris-go.com/">Iris</a>： 支持 Go 语言的快速、简单和高效的微型 Web 框架。它为您的下一代网站、API 或分布式应用程序奠定了精美的表现方式和易于使用的基础。</p>
<p><a href="https://en.wikipedia.org/wiki/C_Sharp_%28programming_language%29">C#</a>： 是一种通用的、面向对象的编程语言。其开发团队由 <a href="https://twitter.com/ahejlsberg">Anders Hejlsberg</a> 领导。</p>
<p><a href="https://www.microsoft.com/net/">.NET Core</a>： 跨平台，可以在极少时间内开发出高性能的应用程序。</p>
<p>可从 <a href="https://golang.org/dl">https://golang.org/dl</a> 下载 Go ，从 <a href="https://www.microsoft.com/net/core">https://www.microsoft.com/net/core</a> 下载 .NET Core。</p>
<p>在下载和安装好这些软件后，还需要为 Go 安装 Iris。安装很简单，仅仅只需要打开终端，然后执行如下语句：</p>
<pre><code class="hljs vim"><span class="hljs-keyword">go</span> <span class="hljs-built_in">get</span> -<span class="hljs-keyword">u</span> github.<span class="hljs-keyword">com</span>/kataras/iris

</code></pre><h3><a href="#基准"></a>基准</h3>
<h4><a href="#硬件"></a>硬件</h4>
<ul>
<li>处理器： Intel(R) Core(TM) i7–4710HQ CPU @ 2.50GHz 2.50GHz</li>
<li>内存： 8.00 GB</li>
</ul>
<h4><a href="#软件"></a>软件</h4>
<ul>
<li>操作系统： 微软 Windows [10.0.15063 版本]， 电源计划设置为“高性能”</li>
<li>HTTP 基准工具： <a href="https://github.com/codesenberg/bombardier">https://github.com/codesenberg/bombardier</a>， 使用最新的 1.1 版本。</li>
<li>.NET Core： <a href="https://www.microsoft.com/net/core">https://www.microsoft.com/net/core</a>， 使用最新的 2.0 版本。</li>
<li>Iris： <a href="https://github.com/kataras/iris">https://github.com/kataras/iris</a>， 使用基于 <a href="https://golang.org/">Go 1.8.3</a> 构建的最新 8.3 版本。</li>
</ul>
<p>两个应用程序都通过请求路径 “api/values/{id}” 返回文本“值”。</p>
<h5><a href="#net-core-mvc"></a>.NET Core MVC</h5>
<p><a href="https://camo.githubusercontent.com/dab975e53f9ed19dd651f79780d8dda9489adc1c/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a7632564a4c332d4933624c797565686e747571666e672e706e67"><img src="https://p0.ssl.qhimg.com/t013cecd6624a2004bc.png" alt=""></a></p>
<p>Logo 由 <a href="https://github.com/campusMVP/dotnetCoreLogoPack">Pablo Iglesias</a> 设计。</p>
<p>可以使用 <code>dotnet new webapi</code> 命令创建项目，其 <code>webapi</code> 模板会为您生成代码，代码包含 <code>GET</code> 请求方法的 <code>返回“值”</code>。</p>
<p>源代码：</p>
<pre><code class="hljs cs"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Collections.Generic;
<span class="hljs-keyword">using</span> System.IO;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Threading.Tasks;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore.Hosting;
<span class="hljs-keyword">using</span> Microsoft.Extensions.Configuration;
<span class="hljs-keyword">using</span> Microsoft.Extensions.Logging;

<span class="hljs-keyword">namespace</span> <span class="hljs-title">netcore_mvc</span>
{
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">Program</span>
    {
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">Main</span>(<span class="hljs-params"><span class="hljs-keyword">string</span>[] args</span>)
        </span>{
            BuildWebHost(args).Run();
        }

        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> IWebHost <span class="hljs-title">BuildWebHost</span>(<span class="hljs-params"><span class="hljs-keyword">string</span>[] args</span>) </span>=&gt;
            WebHost.CreateDefaultBuilder(args)
                .UseStartup&lt;Startup&gt;()
                .Build();
    }
}

</code></pre><pre><code class="hljs cs"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Collections.Generic;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Threading.Tasks;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore.Builder;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore.Hosting;
<span class="hljs-keyword">using</span> Microsoft.Extensions.Configuration;
<span class="hljs-keyword">using</span> Microsoft.Extensions.DependencyInjection;
<span class="hljs-keyword">using</span> Microsoft.Extensions.Logging;
<span class="hljs-keyword">using</span> Microsoft.Extensions.Options;

<span class="hljs-keyword">namespace</span> <span class="hljs-title">netcore_mvc</span>
{
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">Startup</span>
    {
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">Startup</span>(<span class="hljs-params">IConfiguration configuration</span>)
        </span>{
            Configuration = configuration;
        }

        <span class="hljs-keyword">public</span> IConfiguration Configuration { <span class="hljs-keyword">get</span>; }

        <span class="hljs-comment">// This method gets called by the runtime. Use this method to add services to the container.</span>
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">ConfigureServices</span>(<span class="hljs-params">IServiceCollection services</span>)
        </span>{
            services.AddMvcCore();
        }

        <span class="hljs-comment">// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.</span>
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">Configure</span>(<span class="hljs-params">IApplicationBuilder app, IHostingEnvironment env</span>)
        </span>{
            app.UseMvc();
        }
    }
}

</code></pre><pre><code class="hljs cs"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Collections.Generic;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Threading.Tasks;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore.Mvc;

<span class="hljs-keyword">namespace</span> <span class="hljs-title">netcore_mvc.Controllers</span>
{
    <span class="hljs-comment">// ValuesController is the equivalent</span>
    <span class="hljs-comment">// `ValuesController` of the Iris 8.3 mvc application.</span>
    [<span class="hljs-meta">Route(<span class="hljs-meta-string">"api/[controller]"</span>)</span>]
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">ValuesController</span> : <span class="hljs-title">Controller</span>
    {
        <span class="hljs-comment">// Get handles "GET" requests to "api/values/{id}".</span>
        [<span class="hljs-meta">HttpGet(<span class="hljs-meta-string">"{id}"</span>)</span>]
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">string</span> <span class="hljs-title">Get</span>(<span class="hljs-params"><span class="hljs-keyword">int</span> id</span>)
        </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-string">"value"</span>;
        }

        <span class="hljs-comment">// Put handles "PUT" requests to "api/values/{id}".</span>
        [<span class="hljs-meta">HttpPut(<span class="hljs-meta-string">"{id}"</span>)</span>]
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">Put</span>(<span class="hljs-params"><span class="hljs-keyword">int</span> id, [FromBody]<span class="hljs-keyword">string</span> <span class="hljs-keyword">value</span></span>)
        </span>{
        }

        <span class="hljs-comment">// Delete handles "DELETE" requests to "api/values/{id}".</span>
        [<span class="hljs-meta">HttpDelete(<span class="hljs-meta-string">"{id}"</span>)</span>]
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">Delete</span>(<span class="hljs-params"><span class="hljs-keyword">int</span> id</span>)
        </span>{
        }
    }
}

</code></pre><p>运行 .NET Core web 服务项目：</p>
<pre><code class="hljs sql">$ cd netcore-mvc
$ dotnet run -c <span class="hljs-keyword">Release</span>
Hosting environment: Production
<span class="hljs-keyword">Content</span> root <span class="hljs-keyword">path</span>: C:\mygopath\src\github.com\kataras\iris\_benchmarks\netcore-mvc
<span class="hljs-keyword">Now</span> listening <span class="hljs-keyword">on</span>: <span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">5000</span>
Application started. Press Ctrl+C <span class="hljs-keyword">to</span> shut down.

</code></pre><p>运行和定位 HTTP 基准工具：</p>
<pre><code class="hljs dns">$ bombardier -c <span class="hljs-number">125</span> -n <span class="hljs-number">5000000</span> http://localhost:<span class="hljs-number">5000</span>/api/values/<span class="hljs-number">5</span>
Bombarding http://localhost:<span class="hljs-number">5000</span>/api/values/<span class="hljs-number">5</span> with <span class="hljs-number">5000000</span> requests using <span class="hljs-number">125</span> connections
 <span class="hljs-number">5000000</span> / <span class="hljs-number">5000000</span> [=====================================================] <span class="hljs-number">100</span>.<span class="hljs-number">00</span>% <span class="hljs-number">2m</span>3s
Done!
Statistics        Avg      Stdev        Max
  Reqs/sec     <span class="hljs-number">40226.03</span>    <span class="hljs-number">8724</span>.<span class="hljs-number">30</span>     <span class="hljs-number">161919</span>
  Latency        <span class="hljs-number">3</span>.<span class="hljs-number">09m</span>s     <span class="hljs-number">1</span>.<span class="hljs-number">40m</span>s   <span class="hljs-number">169</span>.<span class="hljs-number">12m</span>s
  HTTP codes:
    <span class="hljs-number">1</span>xx - <span class="hljs-number">0</span>, <span class="hljs-number">2</span>xx - <span class="hljs-number">5000000</span>, <span class="hljs-number">3</span>xx - <span class="hljs-number">0</span>, <span class="hljs-number">4</span>xx - <span class="hljs-number">0</span>, <span class="hljs-number">5</span>xx - <span class="hljs-number">0</span>
    others - <span class="hljs-number">0</span>
  Throughput:     <span class="hljs-number">8</span>.<span class="hljs-number">91</span>MB/s

</code></pre><h5><a href="#iris-mvc"></a>Iris MVC</h5>
<p><a href="https://camo.githubusercontent.com/0eefa16121b1bb9ae131220ec79ce62678caa4ba/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a7a6634426a4c2d374d514e4a47696b7735452d694e412e706e67"><img src="https://p0.ssl.qhimg.com/t015226eae4a9ae6438.png" alt=""></a></p>
<p>Logo 由 <a href="https://github.com/santoshanand">Santosh Anand</a> 设计。</p>
<p>源代码：</p>
<pre><code class="hljs routeros">package main

import (
    <span class="hljs-string">"github.com/kataras/iris"</span>
    <span class="hljs-string">"github.com/kataras/iris/_benchmarks/iris-mvc/controllers"</span>
)

func main() {
    app := iris.New()
    app.Controller(<span class="hljs-string">"/api/values/{id}"</span>, new(controllers.ValuesController))
    app.<span class="hljs-builtin-name">Run</span>(iris.Addr(<span class="hljs-string">":5000"</span>), iris.WithoutVersionChecker)
}
view<span class="hljs-built_in"> raw
</span>
</code></pre><pre><code class="hljs accesslog">package controllers

import <span class="hljs-string">"github.com/kataras/iris/mvc"</span>

// ValuesController is the equivalent
// `ValuesController` of the .net core <span class="hljs-number">2</span>.<span class="hljs-number">0</span> mvc application.
type ValuesController struct {
    mvc.Controller
}

// Get handles <span class="hljs-string">"<span class="hljs-keyword">GET</span>"</span> requests to <span class="hljs-string">"api/values/{id}"</span>.
func (vc *ValuesController) Get() {
    // id,_ := vc.Params.GetInt(<span class="hljs-string">"id"</span>)
    vc.Ctx.WriteString(<span class="hljs-string">"value"</span>)
}

// Put handles <span class="hljs-string">"<span class="hljs-keyword">PUT</span>"</span> requests to <span class="hljs-string">"api/values/{id}"</span>.
func (vc *ValuesController) Put() {}

// Delete handles <span class="hljs-string">"<span class="hljs-keyword">DELETE</span>"</span> requests to <span class="hljs-string">"api/values/{id}"</span>.
func (vc *ValuesController) Delete() {}

</code></pre><p>运行 Go web 服务项目：</p>
<pre><code class="hljs vim">$ <span class="hljs-keyword">cd</span> iris-mvc
$ <span class="hljs-keyword">go</span> run main.<span class="hljs-keyword">go</span>
Now listening <span class="hljs-keyword">on</span>: http://localhos<span class="hljs-variable">t:5000</span>
Application started. Press CTRL+C <span class="hljs-keyword">to</span> shut down.

</code></pre><p>运行和定位 HTTP 基准工具：</p>
<pre><code class="hljs dns">$ bombardier -c <span class="hljs-number">125</span> -n <span class="hljs-number">5000000</span> http://localhost:<span class="hljs-number">5000</span>/api/values/<span class="hljs-number">5</span>
Bombarding http://localhost:<span class="hljs-number">5000</span>/api/values/<span class="hljs-number">5</span> with <span class="hljs-number">5000000</span> requests using <span class="hljs-number">125</span> connections
 <span class="hljs-number">5000000</span> / <span class="hljs-number">5000000</span> [======================================================] <span class="hljs-number">100</span>.<span class="hljs-number">00</span>% <span class="hljs-number">47</span>s
Done!
Statistics        Avg      Stdev        Max
  Reqs/sec    <span class="hljs-number">105643.81</span>    <span class="hljs-number">7687</span>.<span class="hljs-number">79</span>     <span class="hljs-number">122564</span>
  Latency        <span class="hljs-number">1</span>.<span class="hljs-number">18m</span>s   <span class="hljs-number">366</span>.<span class="hljs-number">55</span>us    <span class="hljs-number">22</span>.<span class="hljs-number">01m</span>s
  HTTP codes:
    <span class="hljs-number">1</span>xx - <span class="hljs-number">0</span>, <span class="hljs-number">2</span>xx - <span class="hljs-number">5000000</span>, <span class="hljs-number">3</span>xx - <span class="hljs-number">0</span>, <span class="hljs-number">4</span>xx - <span class="hljs-number">0</span>, <span class="hljs-number">5</span>xx - <span class="hljs-number">0</span>
    others - <span class="hljs-number">0</span>
  Throughput:    <span class="hljs-number">19</span>.<span class="hljs-number">65</span>MB/s

</code></pre><p>想通过图片来理解的人，我也把我的屏幕截屏出来了！</p>
<p>请点击<a href="https://github.com/kataras/iris/tree/master/_benchmarks/screens">这儿</a>可以看到这些屏幕快照。</p>
<h4><a href="#总结"></a>总结</h4>
<ul>
<li>完成 <code>5000000 个请求</code>的时间 - 越短越好。</li>
<li>请求次数/每秒 - 越大越好。</li>
<li>等待时间 — 越短越好。</li>
<li>吞吐量 — 越大越好。</li>
<li>内存使用 — 越小越好。</li>
<li>LOC (代码行数) — 越少越好。</li>
</ul>
<p>.NET Core MVC 应用程序，使用 86 行代码，运行 2 分钟 8 秒，每秒接纳 39311.56 个请求，平均 3.19ms 等待，最大时到 229.73ms，内存使用大约为 126MB（不包括 dotnet 框架）。</p>
<p>Iris MVC 应用程序，使用 27 行代码，运行 47 秒，每秒接纳 105643.71 个请求，平均 1.18ms 等待，最大时到 22.01ms，内存使用大约为 12MB。</p>
<blockquote>
<p>还有另外一个模板的基准，滚动到底部。</p>
</blockquote>
<p><strong>2017 年 8 月 20 号更新</strong></p>
<p>[Josh Clark] <a href="https://twitter.com/clarkis117">24</a> 和 [Scott Hanselman] <a href="https://twitter.com/shanselman">25</a>在此 [tweet 评论] <a href="https://twitter.com/shanselman/status/899005786826788865">26</a>上指出，.NET Core <code>Startup.cs</code> 文件中 <code>services.AddMvc();</code> 这行可以替换为 <code>services.AddMvcCore();</code>。我听从他们的意见，修改代码，重新运行基准，该文章的 .NET Core 应用程序的基准输出已经修改。</p>
<p>@topdawgevh @shanselman 他们也在使用 <code>AddMvc()</code> 而不是 <code>AddMvcCore()</code> ...，难道都不包含中间件？</p>
<p> —  @clarkis117</p>
<p>@clarkis117 @topdawgevh Cool @MakisMaropoulos @ben_a_adams @davidfowl 我们来看看。认真学习下怎么使用更简单的性能默认值。</p>
<p> —  @shanselman</p>
<p>@shanselman @clarkis117 @topdawgevh @ben_a_adams @davidfowl @shanselman @ben_a_adams @davidfowl 谢谢您们的反馈意见。我已经修改，更新了结果，没什么不同。对其它的建议，我非常欢迎。</p>
<p> —  @MakisMaropoulos</p>
<blockquote>
<p>它有点稍微的不同但相差不大（从 8.61MB/s 到 8.91MB/s）</p>
</blockquote>
<p>想要了解跟 <code>services.AddMvc()</code> 标准比较结果的，可以点击<a href="https://github.com/kataras/iris/blob/master/_benchmarks/screens/5m_requests_netcore-mvc.png">这儿</a>。</p>
<h3><a href="#想再多了解点儿吗"></a>想再多了解点儿吗?</h3>
<p>我们再制定一个基准，产生 <code>1000000 次请求</code>，这次会通过视图引擎由模板生成 <code>HTML</code> 页面。</p>
<h4><a href="#net-core-mvc-使用的模板"></a>.NET Core MVC 使用的模板</h4>
<pre><code class="hljs cs"><span class="hljs-keyword">using</span> System;

<span class="hljs-keyword">namespace</span> <span class="hljs-title">netcore_mvc_templates.Models</span>
{
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">ErrorViewModel</span>
    {
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">string</span> Title { <span class="hljs-keyword">get</span>; <span class="hljs-keyword">set</span>; }
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">int</span> Code { <span class="hljs-keyword">get</span>; <span class="hljs-keyword">set</span>; }
    }
}

</code></pre><pre><code class="hljs cs"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Collections.Generic;
<span class="hljs-keyword">using</span> System.Diagnostics;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Threading.Tasks;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore.Mvc;
<span class="hljs-keyword">using</span> netcore_mvc_templates.Models;

<span class="hljs-keyword">namespace</span> <span class="hljs-title">netcore_mvc_templates.Controllers</span>
{
   <span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">HomeController</span> : <span class="hljs-title">Controller</span>
   {
       <span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">Index</span>(<span class="hljs-params"></span>)
       </span>{
           <span class="hljs-keyword">return</span> View();
       }

       <span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">About</span>(<span class="hljs-params"></span>)
       </span>{
           ViewData[<span class="hljs-string">"Message"</span>] = <span class="hljs-string">"Your application description page."</span>;

           <span class="hljs-keyword">return</span> View();
       }

       <span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">Contact</span>(<span class="hljs-params"></span>)
       </span>{
           ViewData[<span class="hljs-string">"Message"</span>] = <span class="hljs-string">"Your contact page."</span>;

           <span class="hljs-keyword">return</span> View();
       }

       <span class="hljs-function"><span class="hljs-keyword">public</span> IActionResult <span class="hljs-title">Error</span>(<span class="hljs-params"></span>)
       </span>{
           <span class="hljs-keyword">return</span> View(<span class="hljs-keyword">new</span> ErrorViewModel { Title = <span class="hljs-string">"Error"</span>, Code = <span class="hljs-number">500</span>});
       }
   }
}

</code></pre><pre><code class="hljs cs"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Collections.Generic;
<span class="hljs-keyword">using</span> System.IO;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Threading.Tasks;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore.Hosting;
<span class="hljs-keyword">using</span> Microsoft.Extensions.Configuration;
<span class="hljs-keyword">using</span> Microsoft.Extensions.Logging;

<span class="hljs-keyword">namespace</span> <span class="hljs-title">netcore_mvc_templates</span>
{
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">Program</span>
    {
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">Main</span>(<span class="hljs-params"><span class="hljs-keyword">string</span>[] args</span>)
        </span>{
            BuildWebHost(args).Run();
        }

        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> IWebHost <span class="hljs-title">BuildWebHost</span>(<span class="hljs-params"><span class="hljs-keyword">string</span>[] args</span>) </span>=&gt;
            WebHost.CreateDefaultBuilder(args)
                .UseStartup&lt;Startup&gt;()
                .Build();
    }
}

</code></pre><pre><code class="hljs cs"><span class="hljs-keyword">using</span> System;
<span class="hljs-keyword">using</span> System.Collections.Generic;
<span class="hljs-keyword">using</span> System.Linq;
<span class="hljs-keyword">using</span> System.Threading.Tasks;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore.Builder;
<span class="hljs-keyword">using</span> Microsoft.AspNetCore.Hosting;
<span class="hljs-keyword">using</span> Microsoft.Extensions.Configuration;
<span class="hljs-keyword">using</span> Microsoft.Extensions.DependencyInjection;

<span class="hljs-keyword">namespace</span> <span class="hljs-title">netcore_mvc_templates</span>
{
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">Startup</span>
    {
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">Startup</span>(<span class="hljs-params">IConfiguration configuration</span>)
        </span>{
            Configuration = configuration;
        }

        <span class="hljs-keyword">public</span> IConfiguration Configuration { <span class="hljs-keyword">get</span>; }

        <span class="hljs-comment">// This method gets called by the runtime. Use this method to add services to the container.</span>
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">ConfigureServices</span>(<span class="hljs-params">IServiceCollection services</span>)
        </span>{
            <span class="hljs-comment">/*  An unhandled exception was thrown by the application.
                System.InvalidOperationException: No service for type
                'Microsoft.AspNetCore.Mvc.ViewFeatures.ITempDataDictionaryFactory' has been registered.
                Solution: Use AddMvc() instead of AddMvcCore() in Startup.cs and it will work.
            */</span>
            <span class="hljs-comment">// services.AddMvcCore();</span>
            services.AddMvc();
        }

        <span class="hljs-comment">// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.</span>
        <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">Configure</span>(<span class="hljs-params">IApplicationBuilder app, IHostingEnvironment env</span>)
        </span>{
            app.UseStaticFiles();

            app.UseMvc(routes =&gt;
            {
                routes.MapRoute(
                    name: <span class="hljs-string">"default"</span>,
                    template: <span class="hljs-string">"{controller=Home}/{action=Index}/{id?}"</span>);
            });
        }
    }
}

</code></pre><pre><code class="hljs crystal">/*
wwwroot/css
wwwroot/images
wwwroot/js
wwwroot/<span class="hljs-class"><span class="hljs-keyword">lib</span></span>
wwwroot/favicon.ico


Views/Shared/_Layout.cshtml
Views/Shared/Error.cshtml

Views/Home/About.cshtml
Views/Home/Contact.cshtml
Views/Home/Index.cshtml

These files are quite long to be shown in this article but you can view them <span class="hljs-symbol">at:</span> 
<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/github.com/kataras</span><span class="hljs-regexp">/iris/tree</span><span class="hljs-regexp">/master/</span>_benchmarks/netcore-mvc-templates


</code></pre><p>运行 .NET Core 服务项目：</p>
<pre><code class="hljs sql">$ cd netcore-mvc-templates
$ dotnet run -c <span class="hljs-keyword">Release</span>
Hosting environment: Production
<span class="hljs-keyword">Content</span> root <span class="hljs-keyword">path</span>: C:\mygopath\src\github.com\kataras\iris\_benchmarks\netcore-mvc-templates
<span class="hljs-keyword">Now</span> listening <span class="hljs-keyword">on</span>: <span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">5000</span>
Application started. Press Ctrl+C <span class="hljs-keyword">to</span> shut down.

</code></pre><p>运行 HTTP 基准工具：</p>
<pre><code class="hljs dns">Bombarding http://localhost:<span class="hljs-number">5000</span> with <span class="hljs-number">1000000</span> requests using <span class="hljs-number">125</span> connections
 <span class="hljs-number">1000000</span> / <span class="hljs-number">1000000</span> [====================================================] <span class="hljs-number">100</span>.<span class="hljs-number">00</span>% <span class="hljs-number">1m</span>20s
Done!
Statistics Avg Stdev Max
 Reqs/sec <span class="hljs-number">11738.60</span> <span class="hljs-number">7741</span>.<span class="hljs-number">36 125887</span>
 Latency <span class="hljs-number">10</span>.<span class="hljs-number">10m</span>s <span class="hljs-number">22</span>.<span class="hljs-number">10m</span>s <span class="hljs-number">1</span>.<span class="hljs-number">97</span>s
 HTTP codes:
 <span class="hljs-number">1</span>xx — <span class="hljs-number">0</span>, <span class="hljs-number">2</span>xx — <span class="hljs-number">1000000</span>, <span class="hljs-number">3</span>xx — <span class="hljs-number">0</span>, <span class="hljs-number">4</span>xx — <span class="hljs-number">0</span>, <span class="hljs-number">5</span>xx — <span class="hljs-number">0</span>
 others — <span class="hljs-number">0</span>
 Throughput: <span class="hljs-number">89</span>.<span class="hljs-number">03</span>MB/s

</code></pre><h4><a href="#iris-mvc-使用的模板"></a>Iris MVC 使用的模板</h4>
<pre><code class="hljs routeros">package controllers

import <span class="hljs-string">"github.com/kataras/iris/mvc"</span>
<span class="hljs-built_in">
type </span>AboutController struct{ mvc.Controller }

func (c <span class="hljs-number">*Ab</span>outController) <span class="hljs-builtin-name">Get</span>() {
    c.Data[<span class="hljs-string">"Title"</span>] = <span class="hljs-string">"About"</span>
    c.Data[<span class="hljs-string">"Message"</span>] = <span class="hljs-string">"Your application description page."</span>
    c.Tmpl = <span class="hljs-string">"about.html"</span>
}

</code></pre><pre><code class="hljs routeros">package controllers

import <span class="hljs-string">"github.com/kataras/iris/mvc"</span>
<span class="hljs-built_in">
type </span>ContactController struct{ mvc.Controller }

func (c <span class="hljs-number">*C</span>ontactController) <span class="hljs-builtin-name">Get</span>() {
    c.Data[<span class="hljs-string">"Title"</span>] = <span class="hljs-string">"Contact"</span>
    c.Data[<span class="hljs-string">"Message"</span>] = <span class="hljs-string">"Your contact page."</span>
    c.Tmpl = <span class="hljs-string">"contact.html"</span>
}

</code></pre><pre><code class="hljs gauss">package models

<span class="hljs-comment">// HTTPError a silly structure to keep our error page data.</span>
<span class="hljs-built_in">type</span> HTTPError <span class="hljs-keyword">struct</span> {
    <span class="hljs-built_in">Title</span> <span class="hljs-keyword">string</span>
    <span class="hljs-built_in">Code</span>  int
}

</code></pre><pre><code class="hljs routeros">package controllers

import <span class="hljs-string">"github.com/kataras/iris/mvc"</span>
<span class="hljs-built_in">
type </span>IndexController struct{ mvc.Controller }

func (c *IndexController) <span class="hljs-builtin-name">Get</span>() {
    c.Data[<span class="hljs-string">"Title"</span>] = <span class="hljs-string">"Home Page"</span>
    c.Tmpl = <span class="hljs-string">"index.html"</span>
}

</code></pre><pre><code class="hljs go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">"github.com/kataras/iris/_benchmarks/iris-mvc-templates/controllers"</span>

    <span class="hljs-string">"github.com/kataras/iris"</span>
    <span class="hljs-string">"github.com/kataras/iris/context"</span>
)

<span class="hljs-keyword">const</span> (
    <span class="hljs-comment">// templatesDir is the exactly the same path that .NET Core is using for its templates,</span>
    <span class="hljs-comment">// in order to reduce the size in the repository.</span>
    <span class="hljs-comment">// Change the "C\\mygopath" to your own GOPATH.</span>
    templatesDir = <span class="hljs-string">"C:\\mygopath\\src\\github.com\\kataras\\iris\\_benchmarks\\netcore-mvc-templates\\wwwroot"</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    app := iris.New()
    app.Configure(configure)

    app.Controller(<span class="hljs-string">"/"</span>, <span class="hljs-built_in">new</span>(controllers.IndexController))
    app.Controller(<span class="hljs-string">"/about"</span>, <span class="hljs-built_in">new</span>(controllers.AboutController))
    app.Controller(<span class="hljs-string">"/contact"</span>, <span class="hljs-built_in">new</span>(controllers.ContactController))

    app.Run(iris.Addr(<span class="hljs-string">":5000"</span>), iris.WithoutVersionChecker)
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">configure</span><span class="hljs-params">(app *iris.Application)</span></span> {
    app.RegisterView(iris.HTML(<span class="hljs-string">"./views"</span>, <span class="hljs-string">".html"</span>).Layout(<span class="hljs-string">"shared/layout.html"</span>))
    app.StaticWeb(<span class="hljs-string">"/public"</span>, templatesDir)
    app.OnAnyErrorCode(onError)
}

<span class="hljs-keyword">type</span> err <span class="hljs-keyword">struct</span> {
    Title <span class="hljs-keyword">string</span>
    Code  <span class="hljs-keyword">int</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">onError</span><span class="hljs-params">(ctx context.Context)</span></span> {
    ctx.ViewData(<span class="hljs-string">""</span>, err{<span class="hljs-string">"Error"</span>, ctx.GetStatusCode()})
    ctx.View(<span class="hljs-string">"shared/error.html"</span>)
}

</code></pre><pre><code class="hljs crystal">/*
../netcore-mvc-templates/wwwroot/css
../netcore-mvc-templates/wwwroot/images
../netcore-mvc-templates/wwwroot/js
../netcore-mvc-templates/wwwroot/<span class="hljs-class"><span class="hljs-keyword">lib</span></span>
../netcore-mvc-templates/wwwroot/favicon.ico
views/shared/layout.html
views/shared/error.html
views/about.html
views/contact.html
views/index.html
These files are quite long to be shown in this article but you can view them <span class="hljs-symbol">at:</span> 
<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/github.com/kataras</span><span class="hljs-regexp">/iris/tree</span><span class="hljs-regexp">/master/</span>_benchmarks/iris-mvc-templates
*<span class="hljs-regexp">/


</span></code></pre><p>运行 Go 服务项目：</p>
<pre><code class="hljs vim">$ <span class="hljs-keyword">cd</span> iris-mvc-templates
$ <span class="hljs-keyword">go</span> run main.<span class="hljs-keyword">go</span>
Now listening <span class="hljs-keyword">on</span>: http://localhos<span class="hljs-variable">t:5000</span>
Application started. Press CTRL+C <span class="hljs-keyword">to</span> shut down.


</code></pre><p>运行 HTTP 基准工具：</p>
<pre><code class="hljs dns">Bombarding http://localhost:<span class="hljs-number">5000</span> with <span class="hljs-number">1000000</span> requests using <span class="hljs-number">125</span> connections
 <span class="hljs-number">1000000</span> / <span class="hljs-number">1000000</span> [======================================================] <span class="hljs-number">100</span>.<span class="hljs-number">00</span>% <span class="hljs-number">37</span>s
Done!
Statistics Avg Stdev Max
 Reqs/sec <span class="hljs-number">26656.76</span> <span class="hljs-number">1944</span>.<span class="hljs-number">73 31188</span>
 Latency <span class="hljs-number">4</span>.<span class="hljs-number">69m</span>s <span class="hljs-number">1</span>.<span class="hljs-number">20m</span>s <span class="hljs-number">22</span>.<span class="hljs-number">52m</span>s
 HTTP codes:
 <span class="hljs-number">1</span>xx — <span class="hljs-number">0</span>, <span class="hljs-number">2</span>xx — <span class="hljs-number">1000000</span>, <span class="hljs-number">3</span>xx — <span class="hljs-number">0</span>, <span class="hljs-number">4</span>xx — <span class="hljs-number">0</span>, <span class="hljs-number">5</span>xx — <span class="hljs-number">0</span>
 others — <span class="hljs-number">0</span>
 Throughput: <span class="hljs-number">192</span>.<span class="hljs-number">51</span>MB/s

</code></pre><h4><a href="#总结-1"></a>总结</h4>
<ul>
<li>完成 <code>1000000 个请求</code>的时间 - 越短越好。</li>
<li>请求次数/每秒 - 越大越好。</li>
<li>等待时间 — 越短越好。</li>
<li>内存使用 — 越小越好。</li>
<li>吞吐量 — 越大越好。</li>
</ul>
<p>.NET Core MVC 模板应用程序，运行 1 分钟 20 秒，每秒接纳 11738.60 个请求，同时每秒生成 89.03M 页面，平均 10.10ms 等待，最大时到 1.97s，内存使用大约为 193MB（不包括 dotnet 框架）。</p>
<p>Iris MVC 模板应用程序，运行 37 秒，每秒接纳 26656.76 个请求，同时每秒生成 192.51M 页面，平均 1.18ms 等待，最大时到 22.52ms，内存使用大约为 17MB。</p>
<h3><a href="#接下来呢"></a>接下来呢？</h3>
<p><a href="https://github.com/kataras/iris/tree/master/_benchmarks">这里</a>有上面所示的源代码，请下载下来，在您本地以同样的基准运行，然后把运行结果在这儿给大家分享。</p>
<p>想添加 Go 或 C# .net core WEB 服务框架到列表的朋友请向<a href="https://github.com/kataras/iris">这个仓库</a>的 <code>_benchmarks</code> 目录推送 PR。</p>
<p>我也需要亲自感谢下 <a href="https://dev.to/kataras/go-vsnet-core-in-terms-of-http-performance">dev.to</a> 团队，感谢把我的这篇文章分享到他们的 Twitter 账户。</p>
<p>感谢大家真心反馈，玩得开心！</p>
<h4><a href="#更新--2017-年-8-月-21-周一"></a>更新 : 2017 年 8 月 21 ，周一</h4>
<p>很多人联系我，希望看到一个基于 .NET Core 的较低级别 Kestrel 的基准测试文章。</p>
<p>因此我完成了，请点击下面的<a href="https://medium.com/@kataras/iris-go-vs-net-core-kestrel-in-terms-of-http-performance-806195dc93d5">链接</a>来了解 Kestrel 和 Iris 之间的性能差异，它还包含一个会话存储管理基准！</p>
<hr>
<p>via: <a href="https://hackernoon.com/go-vs-net-core-in-terms-of-http-performance-7535a61b67b8">https://hackernoon.com/go-vs-net-core-in-terms-of-http-performance-7535a61b67b8</a></p>
<p>作者：<a href="https://hackernoon.com/@kataras?source=post_header_lockup">Gerasimos Maropoulos</a> 译者：<a href="https://github.com/runningwater">runningwater</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
论 HTTP 性能，Go 与 .NET Core 一争雌雄

## 原文链接
[https://www.zcfy.cc/article/go-vs-net-core-in-terms-of-http-performance](https://www.zcfy.cc/article/go-vs-net-core-in-terms-of-http-performance)

