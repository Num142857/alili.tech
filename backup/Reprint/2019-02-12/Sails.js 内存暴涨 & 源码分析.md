---
title: 'Sails.js 内存暴涨 & 源码分析' 
date: 2019-02-12 2:30:12
hidden: true
slug: 49we3itqvll
categories: [reprint]
---

{{< raw >}}

                    
<p>Sails.js 是 node 下的一个优秀的 MVC 框架，但是使用 Sails 后，在流量增长时， node 进程有时突然内存暴涨、保持高占用。经过翻阅源码后，发现这个问题与 session / GC 都有关系。</p>
<p><em>PS： 如果是内存泄露引起的，则需要细心检查代码，确定变量能正常回收。</em></p>
<h2>举个栗子</h2>
<p>新建一个 sails app ：</p>
<pre><code class="shell"># new sails app memory
&gt; sails new memeory
&gt; cd memory</code></pre>
<p>修改 <code>config/bootstrap.js</code> 增加内存快照，写入一个 xls（方便画图）：</p>
<pre><code class="javascript">var fs = require('fs');
// (see note below)
setInterval(function takeSnapshot() {
  var mem = process.memoryUsage();
  fs.appendFile('./memorysnapshot.xls', mem.rss / 1024 / 1024 + '\t'
    + mem.heapUsed / 1024 / 1024 + '\t' + mem.heapTotal / 1024 / 1024 + '\n', 'utf8');
}, 1000); // Snapshot every second</code></pre>
<p>使用 pm2 启动 sails</p>
<pre><code class="shell">&gt; pm2 start app.js
&gt; pm2 monit</code></pre>
<p>使用压测工具，10W 请求，100 并发</p>
<pre><code class="shell"># ab 压测工具
&gt; ab -n 100000 -c 100 http://127.0.0.1:1337/</code></pre>
<p>内存占用喜人</p>
<pre><code class="shell">Concurrency Level:      100
Time taken for tests:   276.154 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      1094761464 bytes
HTML transferred:       1044700000 bytes
Requests per second:    362.12 [#/sec] (mean)
Time per request:       276.154 [ms] (mean)
Time per request:       2.762 [ms] (mean, across all concurrent requests)
Transfer rate:          3871.40 [Kbytes/sec] received


PM2 monitoring (To go further check out https://app.keymetrics.io)

app                                 [                              ] 0 %%%
[0] [fork_mode]                     [||||||||                      ] 893.184 MB</code></pre>
<p><span class="img-wrap"><img data-src="http://7xl4og.com1.z0.glb.clouddn.com/memory-all.png" src="https://static.alili.techhttp://7xl4og.com1.z0.glb.clouddn.com/memory-all.png" alt="all" title="all"></span></p>
<h2>关闭 session</h2>
<pre><code class="shell"># 关闭 session
{
    "hooks": {
      ...
      "session": false,
      ...
    }
}

# 压测结果与之前并没有什么区别
Requests per second:    381.06 [#/sec] (mean)

# 但是内存很稳定，基本没增加过
PM2 monitoring (To go further check out https://app.keymetrics.io) 

app                                 [                              ] 0 %%%
[0] [fork_mode]                     [||||||||||||||                ] 162.609 MB  </code></pre>
<p><span class="img-wrap"><img data-src="http://7xl4og.com1.z0.glb.clouddn.com/memory-shutdown.png" src="https://static.alili.techhttp://7xl4og.com1.z0.glb.clouddn.com/memory-shutdown.png" alt="none" title="none"></span></p>
<p>结果感人，关闭不必要的服务并没有给访问主页带来多大的性能提升，但是内存占用下降了非常多，下面就翻翻源码看看 Sails 做了什么。</p>
<h2>Sails 做了什么</h2>
<h3>源码</h3>
<p>sails的源码结构相当清晰：</p>
<pre><code class="javascript">sails@0.12.1
├── bin/ # sails command 处理
├── errors/ # 定义启动加载错误
└─┬ lib/
  ├─┬ app/
  │ ├── configuration/ # 加载各种参数，补全默认参数
  │ ├── private/ # 很多方法，最终都 bind 到 Sails
  │ ├── ... # other module, all bind to Sails
  │ ├── Sail.js # main entry
  │ └── index.js 
  ├─┬ hook/ # 以下部分加载 sails 的相关配置
  │ ├── blueprints/
  │ ├── controllers/
  │ ├── cors/
  │ ├── csrf/
  │ ├── grunt/
  │ ├─┬ http/
  │ │ ├── middleware/ # express middleware 加载的地方
  │ │ ├── public/ # favicon.ico
  │ │ ├── start.js / # .listen(port)
  │ │ ├── initialize.js # load express
  │ │ └── ...
  │ ├── i18n/
  │ ├── logger/
  │ ├── moduleloader/
  │ ├── orm/
  │ ├── policies/
  │ ├── pubsub/
  │ ├── request/
  │ ├── responses/
  │ ├── services/
  │ ├── session/ # session 加载的地方
  │ ├── userconfig/
  │ ├── userhook/
  │ ├── views/
  │ └── index.js
  └─┬ hook/ # router
    ├── bind.js # bind handler to router
    ├── req.js # sails.request object
    ├── res.js # Ensure that response object has a minimum set of reasonable defaults Used primarily as a test fixture.
    ├── ... # default handler config
    └── index.js</code></pre>
<h3>启动</h3>
<p>从 <code>app.js</code> 开始</p>
<pre><code class="javascript">...
sails = require('sails')</code></pre>
<p>第一句 <code>require</code> 创建了一个新的 <code>Sails() (sails/lib/Sails.js)</code> 对象。</p>
<p><code>Sails</code> 初始化的时候，巴拉巴拉绑定了一堆模块/函数，并且继承了 <code>events.EventEmitter</code> ，加载过程中使用 <code>emit/on</code> 来执行加载后的动作。</p>
<h4><code>.lift</code></h4>
<p>之后 <code>lift</code> 启动（其他启动参数也最终都会调用到 <code>lift</code>）：</p>
<pre><code class="javascript">...
sails.lift(rc('sails')); # rc 读取 .sailsrc 文件</code></pre>
<p><code>sails/lib/lift.js</code> 对 Sails 执行加载启动：</p>
<pre><code class="javascript">...
async.series([

    function(cb) {
      sails.load(configOverride, cb);
    },

    sails.initialize

  ], function sailsReady(err, async_data){
       ... # 这里就会打印 sails 那艘小船
  })
...</code></pre>
<h4><code>.load</code></h4>
<p>方法位于  <code>sails/lib/app/load.js</code> ，按顺序加载直到最后启动 Sails ：</p>
<pre><code class="javascript">...
    async.auto({

      config: [Configuration.load], # 默认 config

      hooks: ['config', loadHooks], # 加载 hooks

      registry: ['hooks', # 每个 hook 的 middleware 绑定到 sails.middleware
        function populateRegistry(cb) {
          ...
        }
      ],

      router: ['registry', sails.router.load] # 绑定 express router

    }, ready__(cb));
...</code></pre>
<h4><code>loadHooks</code></h4>
<p><code>loadHooks</code> 会加载 <code>sails/lib/hooks/</code> 下所有需要加载的模块：</p>
<pre><code class="javascript">...
    async.series({

        moduleloader: ...,

        userconfig: ...,

        userhooks: ...,
      
        // other hooks</code></pre>
<p>其中 <code>sails/lib/hooks/moduleloader/</code> 定义了加载其他各个模块的位置、方法：</p>
<pre><code class="javascript">configure: function() {
  sails.config.appPath = sails.config.appPath ? path.resolve(sails.config.appPath) : process.cwd()
  // path of config/controllers/policies/...
  ...
},

// function of how to load other hooks
loadUserConfig/loadUserHooks/loadBlueprints</code></pre>
<p>除了 <code>userhooks</code> 每个 <code>hook</code> 加载均有时间限制：</p>
<pre><code class="javascript">var timeoutInterval = (sails.config[hooks[id].configKey || id] &amp;&amp; sails.config[hooks[id].configKey || id]._hookTimeout) || sails.config.hookTimeout || 20000;</code></pre>
<p>加载其他模块的时候使用的是 <code>async.each</code> ，所以实际加载 <code>hooks</code> 是有个顺序的（可以通过后面的 <code>silly</code> 日志看到）：</p>
<pre><code class="javascript">async.each(_.without(_.keys(hooks), 'userconfig', 'moduleloader', 'userhooks')...)
// 而默认 hooks 位于 sails/lib/app/configuration/default-hooks.js
module.exports = {
  'moduleloader': true,
  'logger': true,
  'request': true,
  'orm': true,
  ...
}</code></pre>
<p><strong>注意</strong></p>
<ul>
<li><p><strong><code>userhooks</code></strong>（用于加载项目 <code>api/hooks/</code> 文件下的模块）的加载顺序为第二，而此时其他模块均未加载，如果此时要设置 <code>sails[${name}]</code> ，注意属性名不要和 <code>sails</code> 其他模块名相同。</p></li>
<li>
<p><strong><code>hooks/http/</code></strong> 会根据项目配置 <code>config/http.js</code> 来加载各个 <code>express</code> 中间件，默认加载：</p>
<pre><code class="javascript">www: ..., // use 'serve-static' to cache .tmp/public
session: ..., // use express-session
favicon: ..., // favicon.ico
startRequestTimer: ..., // just set req._startTime = new Date()
cookieParser: ...,
compress: ..., // use `compression`
bodyParser: ..., // Default use `skipper`
handleBodyParserError: ...,
// Allow simulation of PUT and DELETE HTTP methods for user agents
methodOverride: (function() {...})(),
// By default, the express router middleware is installed towards the end.
router: app.router,
poweredBy: ...,
// 404 and 500 middleware should be after `router`, `www`, and `favicon`
404: function handleUnmatchedRequest(req, res, next) {...},
500: function handleError(err, req, res, next) {...}</code></pre>
</li>
<li>
<p>并且注册了 <code>ready</code> ：</p>
<pre><code class="javascript">// sails/lib/hooks/http/initialize.js
...
sails.on('ready', startServer);
...

// sails/lib/hooks/http/start.js
// startSever 启动 express
...
var liftTimeout = sails.config.liftTimeout || 4000; // 超时
sails.hooks.http.server.listen(sails.config.port...)
...</code></pre>
</li>
</ul>
<p>​</p>
<h4><code>.initialize</code></h4>
<p>待所有 <code>.load</code> 执行完毕之后，开始执行 <code>sails.config.bootstrap</code> ：</p>
<pre><code class="javascript">// sails/lib/app/private/bootstrap.js
...
// 超时
var timeoutMs = sails.config.bootstrapTimeout || 2000;
// run
...

// sails/lib/app/private/initialize.js
// afterBootstrap
...
// 调用 startServer
sails.emit('ready');
...</code></pre>
<p>如果把 log 级别设置到 <code>silly</code> ，启动的时候就可以看到 <code>hooks/router</code> 的加载信息：</p>
<pre><code class="python"># load hooks
verbose: logger hook loaded successfully.
verbose: request hook loaded successfully.
verbose: Loading the app's models and adapters...
verbose: Loading app models...
verbose: Loading app adapters...
verbose: responses hook loaded successfully.
verbose: controllers hook loaded successfully.
verbose: Loading policy modules from app...
verbose: Finished loading policy middleware logic.
verbose: policies hook loaded successfully.
verbose: services hook loaded successfully.
verbose: cors hook loaded successfully.
verbose: session hook loaded successfully.
verbose: http hook loaded successfully.
verbose: Starting ORM...
verbose: orm hook loaded successfully.
verbose: Built-in hooks are ready.
# 以下是 register
verbose: Instantiating registry...
# 以下是 router
verbose: Loading router...
silly: Binding route ::  all /* (REQUEST HOOK: addMixins)
# ready
verbose: All hooks were loaded successfully.
# 打印小船</code></pre>
<p>以上就是 Sails.js 的启动过程，最终的 <code>http</code> 请求都是通过 <code>express</code> 来处理。</p>
<h2>Session</h2>
<p>看完源码，来具体看看 <code>session</code> 的部分，定位到 <code>sails/lib/hooks/session/index.js</code> 与 <code>sails/lib/hooks/http/middleware/defaults.js</code> 。</p>
<p>可以看到， Sails 的 <code>session</code> 默认使用 <code>express-session</code> 的 <code>MemoryStore</code> 作为默认 <code>store</code> ：</p>
<pre><code class="javascript">function MemoryStore() {
  Store.call(this)
  this.sessions = Object.create(null)
}</code></pre>
<p>内存妥妥的要爆好吗！</p>
<p>然而项目大都使用 <code>mysql/redis</code> 作 session 存储，并不存在使用 <code>memory</code> 的情况。</p>
<h4><code>express-session</code></h4>
<p><code>express-session</code> 改写了 <code>red.end (http.ServerResponse)</code> ，并根据条件判断是否 <code>.touch</code> 和 <code>.save</code>  session，<code>memory/mysql/redis</code> 三个 session 中间件有不同的实现：</p>
<table>
<thead><tr>
<th align="left"> </th>
<th align="left"><code>.touch</code></th>
<th align="left"><code>.save</code></th>
</tr></thead>
<tbody>
<tr>
<td align="left">MemoryStore</td>
<td align="left">√</td>
<td align="left">√</td>
</tr>
<tr>
<td align="left">RedisStore</td>
<td align="left">√</td>
<td align="left">√</td>
</tr>
<tr>
<td align="left">MysqlStore</td>
<td align="left">×</td>
<td align="left">√</td>
</tr>
</tbody>
</table>
<p>那么问题来了，如果 <code>store.save</code> 排队阻塞了，那么<strong>大量的 <code>req/res</code> 就会驻留在内存当中</strong>，当流量持续到来时，<code>node</code> 进程占用的内存就会哐哐哐的往上蹭！</p>
<h2>垃圾回收</h2>
<p><code>session</code> 与 <code>req/res</code> 只是保持的内存占用，当被垃圾回收处理之后，这部分内存就会回落。</p>
<p>然而 v8 的垃圾回收触发存在一个阈值，并且各个分代区都设置了默认大小，直接在 <a href="https://github.com/nodejs/node/blob/master/deps/v8/src/heap/heap.cc#L70" rel="nofollow noreferrer">heap.cc</a> 就能看到：</p>
<pre><code class="c++">Heap::Heap()
    : ...
      // semispace_size_ should be a power of 2 and old_generation_size_ should
      // be a multiple of Page::kPageSize.
      reserved_semispace_size_(8 * (kPointerSize / 4) * MB),
      max_semi_space_size_(8 * (kPointerSize / 4) * MB),
      initial_semispace_size_(Page::kPageSize),
      target_semispace_size_(Page::kPageSize),
      max_old_generation_size_(700ul * (kPointerSize / 4) * MB),
      initial_old_generation_size_(max_old_generation_size_ /
                                   kInitalOldGenerationLimitFactor),
      old_generation_size_configured_(false),
      max_executable_size_(256ul * (kPointerSize / 4) * MB),
      ...</code></pre>
<p>v8 的 GC 是 “全停顿”（stop-the-world），对这几个几个不同的堆区，使用不同的垃圾回收算法：</p>
<blockquote><ul>
<li><p>新生区：大多数对象被分配在这里。新生区是一个很小的区域，垃圾回收在这个区域非常频繁，与其他区域相独立。</p></li>
<li><p>老生指针区：这里包含大多数可能存在指向其他对象的指针的对象。大多数在新生区存活一段时间之后的对象都会被挪到这里。</p></li>
<li><p>老生数据区：这里存放只包含原始数据的对象（这些对象没有指向其他对象的指针）。字符串、封箱的数字以及未封箱的双精度数字数组，在新生区存活一段时间后会被移动到这里。</p></li>
<li><p>大对象区：这里存放体积超越其他区大小的对象。每个对象有自己mmap产生的内存。垃圾回收器从不移动大对象。</p></li>
<li><p>代码区：代码对象，也就是包含JIT之后指令的对象，会被分配到这里。这是唯一拥有执行权限的内存区（不过如果代码对象因过大而放在大对象区，则该大对象所对应的内存也是可执行的。译注：但是大对象内存区本身不是可执行的内存区）。</p></li>
<li><p>Cell区、属性Cell区、Map区：这些区域存放Cell、属性Cell和Map，每个区域因为都是存放相同大小的元素，因此内存结构很简单。</p></li>
</ul></blockquote>
<p>对于新生代快速 gc，而老生代则使用 Mark-Sweep（标记清除）和 Mark-Compact（标记整理），所以老生代的内存回收并不实时，在持续的访问压力下，老生代的占用会持续增长，并且<strong>垃圾内存并没有立刻回收</strong>，所以整个 node 进程的内存占用也会蹭蹭的涨。</p>
<p>具体的垃圾回收详解可以参加 <a href="http://www.jayconrod.com/posts/55/a-tour-of-v8-garbage-collection" rel="nofollow noreferrer">这里</a> 或者是 <a href="http://newhtml.net/v8-garbage-collection/" rel="nofollow noreferrer">中文版</a> 。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Sails.js 内存暴涨 & 源码分析

## 原文链接
[https://segmentfault.com/a/1190000004888348](https://segmentfault.com/a/1190000004888348)

