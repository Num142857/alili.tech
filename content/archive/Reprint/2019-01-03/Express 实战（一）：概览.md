---
title: 'Express 实战（一）：概览' 
date: 2019-01-03 2:30:11
hidden: true
slug: e6a7t0crjp7
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819116" src="https://static.alili.tech/img/remote/1460000010819116" alt="2017-08-13-Cover" title="2017-08-13-Cover" style="cursor: pointer; display: inline;"></span></p>
<p>在正式学习 Express 内容之前，我们有必要从大的方面了解一下 Node.js 。</p>
<p>在很长的一段时间里，JavaScript 一门编写浏览器中运行脚本的语言。不过近些年，随着互联网的发展以及技术进步，JavaScript 迎来了一个集中爆发的时代。一个标准性的事件就是 09 年 Node.js 的横空出世。</p>
<p>Node.js 由 Google Chrome 的 V8 引擎发展而来，它能够让 JavaScript 运行在服务端。从而极大的拓展了 JavaScript 的应用场景也让 JavaScript 全栈成为了一个热门话题。开发者不必再去学习 Ruby、Python、Java 等语言和框架，仅仅依靠 JavaScript 就能完成前后端的大部分开发任务。</p>
<p>&lt;!--more--&gt;</p>
<p>虽然，从某些方面来说 JavaScript 并不完美甚至还有一些设计缺陷，但是这并不影响 Nodejs 的流行。V8 引擎快速处理能力和异步编程风格，让开发者从多线程中解脱了出来。其中，前后端同一技术栈可以说是它最大的杀手锏。而日益丰富的生态环境也让 JavaScript 受到开发者越来越多的关注，使用 Node.js 进行开发也变成了一件非常符合潮流的事情了。</p>
<p>和浏览器环境中的 JavaScript 一样，Node.js 也只提供了构建应用基本所需的底层接口和特性。而这些底层接口一般都很冗长、难用。所以有人就在 Node.js 的基础上实现了 Express 框架。其基本理念与 jQuery 类似，通过对底层接口进行了封装，在简化代码的同时提供更高级的接口。另外，Express 拓展性也非常强。框架本身与程序的架构和业务无关，并且你还可以通过第三方库进行功能拓展。</p>
<h2 id="articleHeader0">Node.js 应用场景</h2>
<p>Node.js （通常简称为 Node ）是一个 JavaScript 代码的运行平台。虽然大多数情形下 JavaScript 都运行在浏览器中，但是并没有任何地方规定其只能运行在浏览器中。作为一门编程语言，本质上它与 Ruby、Python、C++、PHP 并没有什么区别。就像你可以使用 <em>python myfile.py</em> 来运行 Python 脚本，你可以使用 <em>&nbsp;node myfile.js</em> 来执行 JavaScript 程序。</p>
<p>但是 Node 到底有啥优点值得我们在服务端开发是尝试呢？</p>
<p>首先，Node.js 的 JavaScript 引擎非常快。毕竟，它是基于以速度著称的 Google Chrome  V8 引擎，可以每秒执行几千条 JavaScript 指令。</p>
<p>其次，Node.js 通过异步编程范式将其高并发的能力发挥的淋漓尽致。</p>
<p>用现实生活中的烘焙做类比最恰当不过了。假设现在我需要制作一些松饼，那么首先就需要把面粉弄好。而此时我是无法抽身做其他的事情的。但是，一旦我把松饼送进烤箱，我就可以抽身做其他的事情而不必干等。</p>
<p>在 Node.js 中，客户端可能随时都会给服务端发送请求。有可能在你处理一个请求时，另一个请求也被客户端送达了。假设，两个请求都需要访问数据库。那么就可以在第一个请求进行数据库操作时，转去处理第二个请求。虽然不能同时对两者做成响应，但是我们可以使用异步方式跳过对耗时操作结果的等待直接处理后续请求。而其他的一些运行环境默认是没有此能力的。例如，Ruby on Rails 同时时间只能处理一个请求。如果想提高程序的并发能力，那么你就需要去购买更多的服务器。</p>
<p>下图可以清晰的看出两者的区别：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819117" src="https://static.alili.tech/img/remote/1460000010819117" alt="01_01" title="01_01" style="cursor: pointer;"></span></p>
<blockquote><p>与同步方式相比，异步处理的效率明显要更高，虽然异步代码也不是并行处理。</p></blockquote>
<p>当然，这并不是说异步处理机制让 Node.js 是世界上最快的语言之一。Node.js 虽然能够最大化压制单核 CPU 的性能，但是还是无法与多核处理能力相媲美。其他语言中可以让你利用多核能力同时执行多个任务。像之前和烘培一样：你可以购买更多的烤箱来同时烤更多的饼干。Node 正在开始支持这个能力，但是它并不像其他语言中那样重要。 </p>
<p>就我个人而言，因为性能而选择 Node.js 并不是最重要的依据，虽然，它确实比 Ruby、Python 等脚步语言要快。最大的理由是，它在前后端开发中使用同一种语言。</p>
<p>通常，在编写 Web 应用程序时你都会要使用 JavaScript。但是在 Node.js 出现之前，前后端的开发必须使用不同的语言进行。为此你需要学习多种的语言和框架。有了 Node.js 之后，你就可以使用一门语言在前后端开发中自由切换，这是最吸引人的地方。</p>
<h2 id="articleHeader1">什么是 Express ？</h2>
<p>Express 是一个基于 Node.js 封装的上层服务框架，它提供了更简洁的 API 更实用的新功能。它通过中间件和路由让程序的组织管理变的更加容易；它提供了丰富的 HTTP 工具；它让动态视图的渲染变的更加容易；它还定义了一组可拓展标准。</p>
<h3 id="articleHeader2">Node.js 的功能</h3>
<p>通过一个简单的 JavaScript 函数，你就可以利用 Node.js 创建一个 Web 程序。该函数用于监听来自浏览器或者其他设备的发起的网络请求。当接收到一个请求后，函数会分析请求的内容并做成相应的处理。例如，当你请求站点主页时，该函数就会知道知道你的目的并将主页的 HTML 渲染出来。如果是请求某个 API 接口，该函数就会把对应的 JSON 数据返回给客户端。</p>
<p>假设，现在需要服务器返回当前时间和时区信息给用户，那么该程序大致包括如下功能：</p>
<ul>
<li>如果客户端发起主页请求，Web 应用将会返回一个包含所需信息的 HTML 。</li>
<li>如果客户端访问地址错误，Web 应用将会返回 HTTP 404 错误，并附带一段错误描述。</li>
</ul>
<p>如果直接在 Node.js 之上构建该应用而不使用 Express 的话，那么完整流程图大抵如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819118" src="https://static.alili.tech/img/remote/1460000010819118" alt="01_02" title="01_02" style="cursor: pointer;"></span></p>
<blockquote><p>在上述流程中，开发人员只需要关注圆圈部分内容处理。</p></blockquote>
<p>这个用于处理浏览器请求的 JavaScript 函数叫做请求处理函数（request handler）。它也仅仅是一个处理请求并作出响应的 JavaScript 函数，并无任何特殊之处。Node.js 的 HTTP 服务会接管其中的网络连接，所以你无需关注和处理复杂的网络协议内容。</p>
<p>从代码角度来说，该函数包含两个参数：一个是网络请求 request 对象 ，另一个表示网络响应的 response 对象。在前面时间信息应用中，该请求处理函数会检查请求 URL 。如果请求的是主页，那么就返回成功的响应页面。否则，返回 404 错误。没有 Node.js 应用中都是这么处理的：编写处理函数对请求作出响应，非常的简单。</p>
<p>问题在于，Node.js 的 API 对开发者来说并不是非常友好。例如，如果我们想发送一个 JPEG 图片的话，可能需要至少 45 行代码才行。创建可复用 HTML 模版则更复杂。另外，Node.js 的 HTTP 模块虽然强大，但是仍然缺少一些实用特性。</p>
<p>Express 的出现就是为了解决这些问题，让你能够高效的使用 Node.js 来编写 Web 应用。</p>
<h3 id="articleHeader3">Express 给 Node.js 带来了什么？</h3>
<p>从大的方面来说，Express 为 Node.js 的 HTTP 模块带来了两大特性：</p>
<ul>
<li>通过提供大量易用接口，简化了程序的复杂度。例如上面放松 JPEG 图片问题，Express 可以将代码压缩带一行。</li>
<li>它允许对请求处理函数进行拆分，将其重构为很多负责特定请求的小型请求处理函数。这便于模块化和后期维护。</li>
</ul>
<p>与上图相比，下图是 Express 处理请求的大致流程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819119" src="https://static.alili.tech/img/remote/1460000010819119" alt="01_03" title="01_03" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>与之前一样，开发者只需要关注圆圈部分的内容。</p></blockquote>
<p>虽然，图看起来比前面复杂，但是实际开发却更简单，本质上它主要做了两件事：</p>
<ol>
<li>与之前一个大型的 request 请求处理函数不同，这里使用大量小型处理函数。有些函数每次都会执行（例如，请求日志），而有些函数只在特定情形下才会触发（例如，404 错误）。Express 有很多使用的工具能够对这些处理函数进行区分。</li>
<li>请求处理函数中有两个参数：request 和 response。Node 的 HTTP 可以对其做些基本处理，例如：获取浏览器的 <em>user-agent</em> 。Express 则更为强大，你可以获取到访问者 IP 地址，以及解析优化过的 URL 请求对象。esponse 对象也同样得到了增强。通过类似 <em>sendFile</em> 这样的函数将文件传输代码压缩至一行。这极大的简化了处理函数的功能实现。</li>
</ol>
<p>利用 Express 提供的简洁 API 接口，通过编写小型 request 请求处理函数，可以极大的压缩代码量提高开发效率。</p>
<h2 id="articleHeader4">Express 的最小化理念</h2>
<p>虽然 Express 是一个框架，但是它的编程规范非常灵活。你可以用它编写各种类型的应用，从视频聊天到个人博客等等。另外，Express 本身并不是百宝箱，你可能会在实际开发中需要使用大量第三方类库。这些类库能帮你解决一些次要问题，这样你可以将关注点地放在那些重要的问题上，然后发扬 Unix  <em>do-one-thing-well</em> 的哲学将事情处理好。</p>
<p>但是这种最小化理念也是一把双刃剑。一方面，Express 非常灵活可靠，而且不会引入那些无用的垃圾代码。另一方面，与其他框架相比这种简洁不可避免导致了部分功能缺失。这意味需要在程序架构上做更多的功课，并且在出现问题后要花时间去寻找第三方模块。离开箱即用还差一点。</p>
<p>有人喜欢灵活多变的框架，而有人则喜欢那些结构固定的框架。例如，PayPal 虽然也使用 Express，但是却制定了严格的规范来约束其开发者。Express 本身并不关注程序架构，所以程序员可以根据偏好自行选择。由于对程序有着绝对控制权，所以一旦你做出不明智的决策，那么后面的坑你就慢慢爬吧。</p>
<p>对于大型框架和极简框架的优劣，从来都没有固定的正确答案，所以我们无须太过纠结。这里，我只希望你记住 Express 是一个极简框架。</p>
<h2 id="articleHeader5">Express 的核心</h2>
<p>Express 非常简洁而且对 Node.js 的封装效果也非常棒，而这一切都源于框架中的四个设计。</p>
<h3 id="articleHeader6">中间件</h3>
<p>正如之前提到的，原生的 Node.js 使用一个 request 处理函数应对所有请求并做出响应。</p>
<p><strong>Middleware</strong> 这个名字起的并不好，但是这个术语并不是 Express 独有，相反它已经存在很久了。概念非常简单：我们不采用一个巨大的 request 请求处理函数，相反我们将一系列简单的处理函数组合起来。每一个小的处理函数对应一个小任务，而这些处理函数就被称为中间件。</p>
<p>中间件可以处理各种任务，从记录请求到发送静态文件到设置 HTTP 头部。例如，应用中使用的第一个中间件功能可能就是记录服务器中每个请求的 <em>logger-log</em>。当日志记录完成后，它将继续执行调用链中的下一个中间件。而下一个中间件功能可能会去验证用户。如果权限不够，就会使用“未授权”进行提示。反之则继续执行下一个中间件。此时中间件功能可能会是渲染主页并结束响应。下图演示了这两种情形：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819120" src="https://static.alili.tech/img/remote/1460000010819120" alt="01_04" title="01_04" style="cursor: pointer;"></span></p>
<p>在图中可以看出，记录日志的中间件位于第一个并且肯定会被执行。紧接着就是执行权限认证的中间件。如果用户权限满足的话就继续执行下一个中间件，否则就不再执行后续中间件。</p>
<p>中间件最大的特点就是其相对来说比较标准，这也意味着开发者可以通过为 Express 开发中间件来拓展其功能。同时，这也许意味着某些通用的中间件，很有可能已经有人开发过来，例如： LESS 和 SCSS 等静态文件的编译、权限控制、cookies 和 sessions 的解析。</p>
<h3 id="articleHeader7">路由</h3>
<p>相比中间件，<strong>Routing</strong> 显然更好。与中间价类似，路由对请求处理函数进行了拆分。不同的是，路由根据请求的 URL 和 HTTP 方法来决定处理方式的。</p>
<p>例如，你的程序中有一个主页和一个留言板页面。当用户使用 GET 去请求主页时，Express 会返回对应的主页内容。对留言板的请求的处理也是如此。如果用户通过 POST 方法在留言板页面中进行了留言操作的话，路由需要做出对应处理并刷新页面。</p>
<p>类似于中间件，上述路由的处理也是通过处理函数进行定义的。而不同的行为会调用不同的处理函数。</p>
<p>Express 中的中间件和路由相辅相成。例如：你可以一边记录请求日志，同时对主页路由做出响应。</p>
<h3 id="articleHeader8">子应用</h3>
<p>Express 应用通常都很小，甚至可以是一个文件。随着应用规模的扩张，可能你会将其进行拆分为多个文件和文件夹。虽然 Express 对应用的规模增长没有明确的指导规则。但是我们可以通过 <strong>sub-applications</strong> 这一重要特性来作出应对。 在 Express 术语中这些只应用也被称为<em>路由器</em>。</p>
<p>通过实现正常规模的<em>路由器</em>子应用，可以将一个大型应用进行模块拆分。甚至你可以对某些子应用进行更细致的拆分。例如，在应用中可能存在管理后台、单页应用、API 接口 等等几个子模块。这时，你就可以将这些子模块作为一个子应用来实现。详情如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819121" src="https://static.alili.tech/img/remote/1460000010819121" alt="01_05" title="01_05" style="cursor: pointer;"></span></p>
<p>当程序规模变大之后，该特性的优势将会逐步凸显出来。</p>
<h3 id="articleHeader9">易用的 API 函数</h3>
<p>Express 由中间件和路由构成，在其中你需要编写大量的异步处理函数来实现相关功能。</p>
<p>为了使处理过程更加高效正确，Express 在原生的 Node.js 基础上进行了大量的封装。在压缩代码量提高效率的同时也降低了人为错误的概率。除了发送文件之外，Express 提供的 HTML 渲染功能也让原生 Node.js 望尘莫及。另外在请求解析方面，Express 也做了非常多的工作。</p>
<p>跟前面的特性不一样的是，在保持功能强大的同时这些易用的函数并不会对应用造成负面影响。</p>
<h2 id="articleHeader10">Express 生态环境</h2>
<p>像其他的工具一样，Express 并不是遗世独立的。</p>
<p>它存活于 Node.js 的生态中，所有你能找到大量的第三发模块提升你的开发效率，例如数据库连接驱动。因为Express 可拓展性极强，所有整个生态中存在大量为 Express 开发的类库。</p>
<h3 id="articleHeader11">Express 跟其他框架的比较</h3>
<p>Express 既不是第一个 Web 框架，当然更不会是最后一个。</p>
<p>同样，Express 也不是 Node.js 生态中的唯一框架。可能它最大的竞争对手就是 <strong>Hapi.js</strong> 了。与 Express 类似，它也有路由、中间件这就概念。不过不同的是它没有基于 Node.js 的 HTTP 模块来处理网络请求，而是有 Walmart 开发的网络模块。该模块被 Mozilla，OpenTable 和 NPM 所接受并在真实程序中检验过。作为 Express 的最大竞争对手，因此我怀疑双方的开发人员可能彼此抱有不小敌意。</p>
<p>在 Node.js 世界中最流行的大型框架非全栈式的 Meteor 莫属。相比自由灵活的 Express ，Metero 有着非常严格的程序结构。不同于 Express 只关注 HTTP 层的处理，Meteor 作为全栈框架可以同时运行在客户端和服务端。当然，这仅仅只是设计上的选择说不上到底谁更优秀。</p>
<p>跟 Express 基于 Node.js 进行封装类似，也有人对 Express 进行更高级的封装。例如，PayPal 创造的 Kraken 。尽管从技术角度来说，Kraken 不过只是 Express 的一个中间件而已。但是，它还是做了不少的事情，例如：中间件的安全绑定。Sails.js 则是另一个以 Express 为基础的新型框架，它内置了数据库、WebSocket 集成、API 生产等等功能。所有的这些框架，都是 Express 的一种相对固定化的封装实现。</p>
<p>Express 最主要的几个特性之一就是中间件。Connect 是一个仅作用于 Node.js 和中间件的框架。它没有提供路由和易用函数接口。而 Express 曾经在它的中间件层中使用了 Connect。虽然现在被抛弃了，但是 Express 中间件一直都完全兼容 Connect 中间件。这意味着 Express 的火力得到了更大的提升。</p>
<p>除了上面提到的这些，还有很多使用其它语言实现的 Web 框架。</p>
<p>Express 的很多灵感都来自于 Ruby 世界中的轻型 Web 框架 Sinatra。与 Express 类似，Sinatra 中也有路由和中间件功能。Sinatra 框架思想被其他很多语言所借鉴并且重新实现，如果你曾经用过这类框架的话，那么对 Express 一定不会陌生。当然，Express 也借鉴了 Python 中的 Bottle 和 Flask 框架。</p>
<p>相应的，Express 与 Django、Ruby on Rails、ASP.NET 等框架差距巨大。这些框架都十分庞大，而且程序结构也相对固定功能更为丰富。而且，Express 与 PHP 也差异明显，虽然都是运行在服务上但是后者与 HTML 紧耦合。</p>
<p>Express 仅仅是服务端 Web 框架中的一种，所以我们不能在这里说 Express 就一定比其他的框架好。它具备一些独有的特性，例如，Node.js 的性能以及前后端统一的语言。但是与之同时，它的功能远比其他框架来的少而去 JavaScript 也并不是一门得到广大开发者认可的“好”语言。脱离具体场景讨论优劣势没有意义的，下面我们就看看 Express 一些适用场景。</p>
<h3 id="articleHeader12">Express 的应用场景</h3>
<p>理论上来说，Express 可以用来构建任何 Web 应用。对所有请求作出响应这件事上述提到的框架同样能够做到。所以，为什么要选择 Express 呢？</p>
<p>最大的优点就是 Node.js 中编写的 JavaScript 可以在浏览器和客户端实现共享。从代码复用角度来说，这种情况是最理想的。从心理角度来说也非常有用，开发过程中无需进行服务器模式和客户端模式的切换。前端开发者可以在不学习新语言的情况下直接就可以编写后端代码。当然，前端开发者还是需要学习一些新内容的，不然这本书就没存在的必要了。</p>
<p>Express 可以帮助你做到这一点，人们已经为这个技术栈拟好了名称：MEAN 。像 “LAMP” 代表 Linux、Apache、MySQL 和 PHP 一样，“MEAN” 表示 MongoDB、Express、Angular 和 Node.js。人们之所以对它喜爱有加是因为它是纯 JavaScript 技术栈。</p>
<p>Express 常用于驱动单页应用程序（SPA）。SPA 在前端重度依赖 JavaScript，而且通常需要一个服务器组件。大多数服务器只需要简单的提供 HTML、CSS 和 JavaScript ，但是有时候 REST API 也是常规需求。Express 可以同时完成这两件任务，既可以提供 HTML 也非常适合构建 API 。 Express 相对较低的学习曲线使得前端开发者在几乎无需学习新内容的情况下搭建一个 SPA 服务。</p>
<p>当你使用 Express 编写应用的时候就决定了你必须使用 MEAN 技术栈中的 E 和 N 部分，而对于另外两个 Express 没有做出过限定你完全可以采用不同的方案。例如，可以使用 Backbone.js 替换其中的 Angular，构成 MEBN 技术栈。使用 SQL 替换 MongoDB 构成 SEAN 技术栈。虽然 MEAN 术语很常见而且配置也非常流行，但是你完全可以更具需要自行选择。在这本书中我们将涵盖的技术栈是 MEN：MongoDB、Express 和 Node.js。</p>
<p>另外 Express 还具有一些实时特性。虽然其他语言也支持 WebSocket 和 WebRTC，但是 Node.js 似乎要更强。这意味着你可以将这些特性应用到 Express 程序中。因为 Node.js 能做的，Express 一样不少。</p>
<h3 id="articleHeader13">Node.js 和 Express 的第三方模块</h3>
<p>社区中存在大量可以在 Express 中使用的模块。有一些是 Express 独占的，这些模块与路由和中间件的特性高度兼容。其他的非独占模块也能提升 Express 应用的开发体验和程序性能。</p>
<p>如果你曾经有过 ERB、Jinja2、HAML 等模版引擎的使用经验的话，你就会发现 Express 自带的功能在渲染 HTML 方面简直就是弱鸡。好在 Express 还可以使用 EJS 和 Jade 这些社区模版引擎来解决这个问题。</p>
<p>另外，Express 本身并没有对数据库做支持。你可以通过文件、关系数据库、或者其他机制来实现数据保存。不过后面将会介绍在 Express 中如何通过 Mongoose 来调用 MongoDB  数据库。</p>
<p>需要注意的一点是：并不存在 Express 模块这一概念，所以第三方库都是 Node.js 模块。Node.js 模块与 Express 相互兼容并且能够配合其工作。所有这些某块都是在 npm 仓库注册的 JavaScript 代码块，并且可以使用一致的方法进行安装。与其他环境中一样，模块之间可以相互依赖，并且不同模块可以相互配合。另外，Express 也不过是 Node.js 中的一个模块而已。</p>
<h2 id="articleHeader14">Hello World</h2>
<p>每次学习新内容的时候，绝大多数都是从 Hello World 开始。</p>
<p>那么现在我们来看看如何使用 Express 构建一个简单的 Hello World 工程。不要太关注代码的细节，后面将会进行详细介绍。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&quot;express&quot;);&nbsp; #A
&nbsp;
var app = express();&nbsp; #B
&nbsp;
app.get(&quot;/&quot;, function(request, response) {&nbsp; #C
&nbsp; response.send(&quot;Hello world!&quot;);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #C
});&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #C
&nbsp;
app.listen(3000, function() {&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;#D
&nbsp; console.log(&quot;Express app started on port 3000.&quot;); #D
});&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">"express"</span>);&nbsp; #A
&nbsp;
<span class="hljs-keyword">var</span> app = express();&nbsp; #B
&nbsp;
app.get(<span class="hljs-string">"/"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, response</span>) </span>{&nbsp; #C
&nbsp; response.send(<span class="hljs-string">"Hello world!"</span>);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #C
});&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #C
&nbsp;
app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;#D
&nbsp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Express app started on port 3000."</span>); #D
});&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #D</code></pre>
<p>A：导入 express 模块并新建变量。<br>B：创建 app 应用<br>C：设置访问 Root 路由，并将响应设置为 “Hello world!”。<br>D：设置程序监听的端口，并打赢服务启动成功的信息。</p>
<p>再次提醒一下，没有全部弄懂代码不要紧，后面会有更详细的讲解。</p>
<p>你马上就能学到关于 Express 的所有知识了。</p>
<h2 id="articleHeader15">小结</h2>
<p>本文主要介绍了：</p>
<ul>
<li>Node.js 可以编写 Web 应用，但是开发过程并不高效。而 Express 则优雅的解决了这些问题。</li>
<li>Express 很小但是也非常灵活</li>
<li>Express 有几个关键特性：</li>
<li>中间件将程序处理进行了拆分并且按照顺序链式执行。</li>
<li>路由同样对程序进行了拆分，按规则对不同的访问请求做出不同的响应。</li>
<li>子工程可以实现对大型 Express 的拆分，从而提高可读性方便后期维护。</li>
<li>Express 中的代码大多请求处理函数的编写，而 Express 为此提供了大量易用 API 。</li>
</ul>
<blockquote><p>原文<a href="https://bignerdcoding.com/archives/41.html" rel="nofollow noreferrer" target="_blank">地址</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Express 实战（一）：概览

## 原文链接
[https://segmentfault.com/a/1190000010819111](https://segmentfault.com/a/1190000010819111)

