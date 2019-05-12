---
title: 'Node.js + React Native 毕设：农业物联网监测系统的开发手记' 
date: 2019-02-02 2:30:11
hidden: true
slug: 7njdijhy2um
categories: [reprint]
---

{{< raw >}}

                    
<p>毕设大概是大学四年里最坑爹之一的事情了，毕竟一旦选题不好，就很容易浪费一年的时间做一个并没有什么卵用，又不能学到什么东西的鸡肋项目。所幸，鄙人所在的硬件专业，指导老师并不懂软件，他只是想要一个农业物联网的监测系统，能提供给我的就是一个Oracle 11d数据库，带着一个物联网系统运行一年所保存的传感器数据...That's all。然后，因为他不懂软件，所以他显然以结果为导向，只要我交出一个移动客户端和一个服务端，并不会关心我在其中用了多少坑爹的新技术。</p>
<p>那还说什么？上！我以强烈的恶搞精神，决定采用业界最新最坑爹最有可能烂尾的技术，组成一个 Geek 大杂烩，幻想未来那个接手我工作的师兄的一脸懵逼，我露出了邪恶的笑容，一切只为了满足自己的上新欲。</p>
<p>全部代码在 GPL 许可证下开源：</p>
<ul>
<li><p>服务端代码：<a href="https://github.com/CauT/the-wall" rel="nofollow noreferrer" target="_blank">https://github.com/CauT/the-wall</a></p></li>
<li><p>客户端代码：<a href="https://github.com/CauT/NightWatch" rel="nofollow noreferrer" target="_blank">https://github.com/CauT/Night...</a></p></li>
</ul>
<p>由于数据库是学校实验室所有，所以不能放出数据以供运行，万分抱歉~。理论上应该有一份文档，但事实上太懒，不知道什么时候会填坑~。</p>
<h2 id="articleHeader0">总体架构</h2>
<p>OK，上图说明技术框架。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007083094?w=1062&amp;h=924" src="https://static.alili.tech/img/remote/1460000007083094?w=1062&amp;h=924" alt="总体结构" title="总体结构" style="cursor: pointer;"></span><br>￼<br>该物联网监测系统整体上可分为三层：数据库层，服务器层和客户端层。</p>
<h3 id="articleHeader1">数据库和代码层</h3>
<p>数据库层除了原有的Oracle 11d数据库以外，还额外增加了一个Redis数据库。之所以增加第二个数据库，原因为：</p>
<ol>
<li><p>Node.js 的 Oracle 官方依赖 node-oracledb 没有ORM，也就是说，所有的对数据库的操作，都是直接执行SQL语句，简单粗暴，我担心自己孱弱的数据库功底（本行是 Android 开发）会引发锁表问题，所以通过限制只读来避开这个问题。</p></li>
<li><p>由于该系统服务于农业企业的内部管理人员，因此其账号数量和总体数据量必然有限，因此使用 redis 这种内存型数据库，可以不必考虑非关系型数据库在容量占用上的劣势。读取速度反而较传统的 SQL 数据库有一定的优势。</p></li>
<li><p>使用非关系型数据库比关系型数据库好玩多了（雾</p></li>
<li><p>之所以写了右边的Git部分，是因为原本打算利用docker技术搞一个持续集成和部署的程序，实现提交代码=&gt;自动测试=&gt;更新服务器部署更新=&gt;客户端自动更新 这样一整套持续交付的流程，然而最后并没有时间写。</p></li>
</ol>
<h3 id="articleHeader2">服务器层</h3>
<p>服务器层，采用 Node.js 的 Express 框架作为客户端的 API 后台。因为 Node.js 的单线程异步并发结构使之可以轻松实现较高的 QPS，所以非常适合 API 后端这一特点。其框架设计和主要功能如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007083095?w=1014&amp;h=730" src="https://static.alili.tech/img/remote/1460000007083095?w=1014&amp;h=730" alt="服务端结构" title="服务端结构" style="cursor: pointer; display: inline;"></span></p>
<p>像网关层：鉴权模块这么装逼的说法，本质也就是<code>app.use(jwt({secret: config.jwt_secret}).unless({path: ['/signin']}));</code>一行而已。因为是直接从毕业论文里拿下来的图，毕业论文都这尿性你们懂的，所以一些故弄玄虚敬请谅解。</p>
<h3 id="articleHeader3">客户端层</h3>
<p>￼客户端层绝大部分是 React Native 代码，但是监控数据的图表生成这一块功能（如下图），由于 React Native 目前没有开源的成熟实现；试图通过 Native 代码来画图表，需要实现一个 Native 和 React Native 互相嵌套的架构，又面临一些可能的困难；故而最终选择了内嵌一个 html 页面，前端代码采用百度的 Echarts 框架来绘制图表。最终的结构就是大部分 React Native + 少部分 Html5 的客户端结构。</p>
<p>另外就是采用了 Redux 来统一应用的事件分发和 UI 数据管理了。可以说，React Native 若能留名青史，Redux 必定是不可或缺的一大原因。这一点我们后文再述。</p>
<h2 id="articleHeader4">细节详述</h2>
<h3 id="articleHeader5">服务端层</h3>
<p>服务端接口表：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007083096?w=938&amp;h=1398" src="https://static.alili.tech/img/remote/1460000007083096?w=938&amp;h=1398" alt="服务端接口表" title="服务端接口表" style="cursor: pointer; display: inline;"></span>￼</p>
<p>服务端程序的编写过程中，往往涉及到了大量的异步操作，如数据库读取，网络请求，JSON解析等等。而这些异步操作，又往往会因为具体的业务场景的要求，而需要保持一定的执行顺序。此外，还需要保证代码的可读性，显然此时一味嵌套回调函数，只会使我们陷入代码几乎不可读的回调地狱（Callback Hell）中。最后，由于JavaScript单线程的执行环境的特性，我们还需要避免指定不必要的执行顺序，以免降低了程序的运行性能。因此，我在项目中使用Promise模式来处理多异步的逻辑过程。如下代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function renderGraph(req, res, filtereds) {
  var x = [];    
  var ys = [];
  var titles = [];

  filtereds[0].forEach(function(row) {
    x.push(getLocalTime(row.RECTIME));
  });

  filtereds.forEach(function(filtered){
    if (filtered[0] == undefined)
      // even if at least one of multi query was succeed
      // fast-fail is essential for secure
      throw new Error('数据库返回结果为空');
    var y = [];
    filtered.forEach(function(row) {
      y.push(row.ANALOGYVALUE);
    });
    ys.push(y);
    titles.push(filtered[0].DEVICENAME + ': ' + filtered[0].DEVICECODE);
  });

  res.render('graph', {
    titles: titles,
    dataX: x,
    dataY: ys,
    height: req.query.height == undefined ? 200 : req.query.height,
    width: req.query.width == undefined ? 300 : req.query.width,
  });
}

function resFilter(resolve, reject, connection, resultSet, numRows, filtered) {
  resultSet.getRows(
    numRows,
    function (err, rows)
    {
      if (err) {
        console.log(err.message);
        reject(err);
      } else if (rows.length == 0) {
        resolve(filtered);
        process.nextTick(function() {
          oracle.releaseConnection(connection);
        });
      } else if (rows.length > 0) {
        filtered.push(rows[0]);
        resFilter(resolve, reject, connection, resultSet, numRows, filtered);
      }
    }
  );
}

function createQuerySingleDeviceDataPromise(req, res, device_id, start_time, end_time) {
  return oracle.getConnection()
  .then(function(connection) {
    return oracle.execute(
      &quot;SELECT\
        DEVICE.DEVICEID,\
        DEVICECODE,\
        DEVICENAME,\
        UNIT,\
        ANALOGYVALUE,\
        DEVICEHISTROY.RECTIME\
      FROM\
        DEVICE INNER JOIN DEVICEHISTROY\
      ON\
        DEVICE.DEVICEID = DEVICEHISTROY.DEVICEID\
      WHERE\
        DEVICE.DEVICEID = :device_id\
        AND DEVICEHISTROY.RECTIME\
        BETWEEN :start_time AND :end_time\
      ORDER\
        BY RECTIME&quot;,
      [
        device_id,
        start_time,
        end_time
      ],
      {
        outFormat: oracle.OBJECT,
        resultSet: true
      },
      connection
    )
    .then(function(results) {
      var filtered = [];
      var filterGap = Math.floor(
        (end_time - start_time) / (120 * 100)
      );
      return new Promise(function(resolve, reject) {
        resFilter(resolve, reject,
          connection, results.resultSet, filterGap, filtered);
      });
    })
    .catch(function(err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
      process.nextTick(function() {
        oracle.releaseConnection(connection);
      });
    });
  });
}

function secureCheck(req, res) {
  let qry = req.query;

  if (
    qry.device_ids == undefined
    || qry.start_time == undefined
    || qry.end_time == undefined
  ) {
    throw new Error('device_ids或start_time或end_time参数为undefined');
  }

  if (req.query.end_time < req.query.start_time) {
    throw new Error('终止时间小于起始时间');
  }
};

router.get('/', function(req, res, next) {
  try {
    var device_ids;
    var queryPromises = [];

    secureCheck(req, res);

    device_ids = req.query.device_ids.toString().split(';');

    for(let i=0; i<device_ids.length; i++) {
      queryPromises.push(createQuerySingleDeviceDataPromise(
        req, res, device_ids[i], req.query.start_time, req.query.end_time));
    };

    Promise.all(queryPromises)
    .then(function(filtereds) {
      renderGraph(req, res, filtereds);
    }).catch(function(err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    })
  } catch(err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderGraph</span>(<span class="hljs-params">req, res, filtereds</span>) </span>{
  <span class="hljs-keyword">var</span> x = [];    
  <span class="hljs-keyword">var</span> ys = [];
  <span class="hljs-keyword">var</span> titles = [];

  filtereds[<span class="hljs-number">0</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">row</span>) </span>{
    x.push(getLocalTime(row.RECTIME));
  });

  filtereds.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filtered</span>)</span>{
    <span class="hljs-keyword">if</span> (filtered[<span class="hljs-number">0</span>] == <span class="hljs-literal">undefined</span>)
      <span class="hljs-comment">// even if at least one of multi query was succeed</span>
      <span class="hljs-comment">// fast-fail is essential for secure</span>
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'数据库返回结果为空'</span>);
    <span class="hljs-keyword">var</span> y = [];
    filtered.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">row</span>) </span>{
      y.push(row.ANALOGYVALUE);
    });
    ys.push(y);
    titles.push(filtered[<span class="hljs-number">0</span>].DEVICENAME + <span class="hljs-string">': '</span> + filtered[<span class="hljs-number">0</span>].DEVICECODE);
  });

  res.render(<span class="hljs-string">'graph'</span>, {
    <span class="hljs-attr">titles</span>: titles,
    <span class="hljs-attr">dataX</span>: x,
    <span class="hljs-attr">dataY</span>: ys,
    <span class="hljs-attr">height</span>: req.query.height == <span class="hljs-literal">undefined</span> ? <span class="hljs-number">200</span> : req.query.height,
    <span class="hljs-attr">width</span>: req.query.width == <span class="hljs-literal">undefined</span> ? <span class="hljs-number">300</span> : req.query.width,
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resFilter</span>(<span class="hljs-params">resolve, reject, connection, resultSet, numRows, filtered</span>) </span>{
  resultSet.getRows(
    numRows,
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, rows</span>)
    </span>{
      <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-built_in">console</span>.log(err.message);
        reject(err);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rows.length == <span class="hljs-number">0</span>) {
        resolve(filtered);
        process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          oracle.releaseConnection(connection);
        });
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rows.length &gt; <span class="hljs-number">0</span>) {
        filtered.push(rows[<span class="hljs-number">0</span>]);
        resFilter(resolve, reject, connection, resultSet, numRows, filtered);
      }
    }
  );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createQuerySingleDeviceDataPromise</span>(<span class="hljs-params">req, res, device_id, start_time, end_time</span>) </span>{
  <span class="hljs-keyword">return</span> oracle.getConnection()
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">connection</span>) </span>{
    <span class="hljs-keyword">return</span> oracle.execute(
      <span class="hljs-string">"SELECT\
        DEVICE.DEVICEID,\
        DEVICECODE,\
        DEVICENAME,\
        UNIT,\
        ANALOGYVALUE,\
        DEVICEHISTROY.RECTIME\
      FROM\
        DEVICE INNER JOIN DEVICEHISTROY\
      ON\
        DEVICE.DEVICEID = DEVICEHISTROY.DEVICEID\
      WHERE\
        DEVICE.DEVICEID = :device_id\
        AND DEVICEHISTROY.RECTIME\
        BETWEEN :start_time AND :end_time\
      ORDER\
        BY RECTIME"</span>,
      [
        device_id,
        start_time,
        end_time
      ],
      {
        <span class="hljs-attr">outFormat</span>: oracle.OBJECT,
        <span class="hljs-attr">resultSet</span>: <span class="hljs-literal">true</span>
      },
      connection
    )
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">results</span>) </span>{
      <span class="hljs-keyword">var</span> filtered = [];
      <span class="hljs-keyword">var</span> filterGap = <span class="hljs-built_in">Math</span>.floor(
        (end_time - start_time) / (<span class="hljs-number">120</span> * <span class="hljs-number">100</span>)
      );
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        resFilter(resolve, reject,
          connection, results.resultSet, filterGap, filtered);
      });
    })
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
      res.status(<span class="hljs-number">500</span>).json({
        <span class="hljs-attr">status</span>: <span class="hljs-string">'error'</span>,
        <span class="hljs-attr">message</span>: err.message
      });
      process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        oracle.releaseConnection(connection);
      });
    });
  });
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">secureCheck</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">let</span> qry = req.query;

  <span class="hljs-keyword">if</span> (
    qry.device_ids == <span class="hljs-literal">undefined</span>
    || qry.start_time == <span class="hljs-literal">undefined</span>
    || qry.end_time == <span class="hljs-literal">undefined</span>
  ) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'device_ids或start_time或end_time参数为undefined'</span>);
  }

  <span class="hljs-keyword">if</span> (req.query.end_time &lt; req.query.start_time) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'终止时间小于起始时间'</span>);
  }
};

router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">var</span> device_ids;
    <span class="hljs-keyword">var</span> queryPromises = [];

    secureCheck(req, res);

    device_ids = req.query.device_ids.toString().split(<span class="hljs-string">';'</span>);

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;device_ids.length; i++) {
      queryPromises.push(createQuerySingleDeviceDataPromise(
        req, res, device_ids[i], req.query.start_time, req.query.end_time));
    };

    <span class="hljs-built_in">Promise</span>.all(queryPromises)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filtereds</span>) </span>{
      renderGraph(req, res, filtereds);
    }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
      res.status(<span class="hljs-number">500</span>).json({
        <span class="hljs-attr">status</span>: <span class="hljs-string">'error'</span>,
        <span class="hljs-attr">message</span>: err.message
      });
    })
  } <span class="hljs-keyword">catch</span>(err) {
    res.status(<span class="hljs-number">500</span>).json({
      <span class="hljs-attr">status</span>: <span class="hljs-string">'error'</span>,
      <span class="hljs-attr">message</span>: err.message
    });
  }
});</code></pre>
<p>这是生成指定N个传感器在一段时间内的折线图的逻辑。显然，剖析业务可知，我们需要在数据库中查询N次传感器，获得N个值对象数组，然后才能去用N组数据渲染出图表的HTML页面。 可以看到，外部核心的Promise控制的流程只集中于下面的几行之中：<code>Promise.all(queryPromises()).then(renderGraph()).catch()</code>。即，只有获取完N个传感器的数值之后，才会去渲染图表的HTML页面，但是这N个传感器的获取过程却又是并发进行的，由Promise.all()来实现的，合理地利用了有限的机器性能资源。</p>
<p>然而，推入queryPromises数组中的每个Promise对象，又构成了自己的一条Promise逻辑链，只有这些子Promise逻辑链被处理完了，才可以说整个all()函数都被执行完了。子Promise逻辑链大致地可以总结为以下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function() {    
    return new Promise().then().catch();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{    
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>().then().catch();
}</code></pre>
<p>其中的难点在于：</p>
<ol>
<li><p>合理地切分整套业务逻辑到不同的then()函数中，且一个then()中只能有一个异步过程。</p></li>
<li><p>函数体内的异步过程所产生的新的Promise逻辑链必须被通过return的方式挂载到父函数的Promise逻辑链中，否则即可能形成一个有先有后的控制流程。</p></li>
<li><p>catch()函数必须要做好捕捉和输出错误的处理，否则代码编写过程中的错误即不可能被发现，异步编程的整个过程也就无从继续下去了。</p></li>
<li><p>值得一提的是Promise模式的引入。Node.js 自身不带有Promise，可以引入标准的ECMAScript的Promise实现，然而其功能较为简陋，对于各种API的实现过于匮乏，因此最后选择了bluebird库来引入Promise模式的语言支持。</p></li>
</ol>
<p>由此我们可以看到，没有无缘无故的高性能。Node.js 的高并发的优良表现，是用异步编程的高复杂度换来的。当然，你也可以选择不要编程复杂度，即不采用 Promise，Asnyc 等等异步编程模式，任由代码沦入回调地狱之中，那么这时候的代价就是维护复杂度了。其中取舍，见仁见智。</p>
<h3 id="articleHeader6">客户端层</h3>
<p>客户端主要功能如下表所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007083097?w=1144&amp;h=1404" src="https://static.alili.tech/img/remote/1460000007083097?w=1144&amp;h=1404" alt="功能设计表" title="功能设计表" style="cursor: pointer;"></span>￼</p>
<p>接下来简单介绍下几个主要页面。可以发现 iOS 明显比 Android 要来的漂亮，因为只对 iOS 做了视觉上的细调，直接迁移到 Android 上，就会由于屏幕显示的色差问题，显得非常粗糙。所以，对于跨平台的 React Native App 来说，做两套色值配置文件，以供两个平台使用，还是很有必要的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007083098?w=854&amp;h=774" src="https://static.alili.tech/img/remote/1460000007083098?w=854&amp;h=774" alt="当前数据界面" title="当前数据界面" style="cursor: pointer;"></span>￼</p>
<p>上图即是土壤墒情底栏的当前数据页面，分别在Android和iOS上的显示效果，默认展示所有当前的传感器的数值，可以通过选择传感器种类或监测站编号进行筛选，两个条件可以分别设置，选定后再点击查找，即向服务器发起请求，得到数据后刷新页面。由于React Native 的组件化设计，刷新将只刷新下侧的DashBoard部分，且，若有上次已经渲染过的MonitorView，则会复用他们，不再重复渲染，从而实现了降低CPU占用的性能优化。MonitorView，即每一个传感器的展示小方块，自上至下依次展示了传感器种类，传感器编号，当前的传感器数值以及该传感器显示数值的单位。MonitorView和Dashboard均被抽象为一个一般化，可复用的组件，使之能够被利用在气象信息、病虫害监测之中，提升了开发效率，降低了代码的重复率。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007083099?w=904&amp;h=816" src="https://static.alili.tech/img/remote/1460000007083099?w=904&amp;h=816" alt="查询历史界面" title="查询历史界面" style="cursor: pointer;"></span>￼</p>
<p>上图是土壤墒情界面的历史数据界面，分别在Android和iOS上的展示效果，默认不会显示数据，直到输入了传感器种类和监测站编号，选择了年月日时间后，再点击查找，才会得到结果并显示出来。该界面并非如同当前数据界面一样，Android和iOS代码完全共用。原因在于选择月日和选择时间的控件，Android和iOS系统有各自的控件，它们也被封装为React Native中不同的控件，因此，两条绿色的选择时间的按钮，被封装为HistoricalDateSelectPad，分别放在componentIOS和componentAndroid文件夹中。界面下侧的数据监测板，即代码中的Dashboard，是复用当前数据中的Dashboard。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007083100?w=922&amp;h=840" src="https://static.alili.tech/img/remote/1460000007083100?w=922&amp;h=840" alt="图表界面" title="图表界面" style="cursor: pointer;"></span>￼</p>
<p>上图是土壤墒情界面的图表生成界面，分别在Android和iOS上的展示效果。时间选择界面，查找按钮，选择框，均可复用前两个界面的代码，因此无需多提。值得说的是，生成的折线图，事实上是通过内嵌的WebView来显示一个网页的。图表网页的生成，则依靠的百度Echarts 第三方库，然后服务端提供了一个预先写好的前端模板，Express框架填入需要的数据，最后下发到移动客户端上，渲染生成图表。图表支持了多曲线的删减，手指选取查看具体数据点，放大缩小等功能。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007083101?w=442&amp;h=730" src="https://static.alili.tech/img/remote/1460000007083101?w=442&amp;h=730" alt="Screen Shot 2016-10-06 at 8.54.14 P" title="Screen Shot 2016-10-06 at 8.54.14 P" style="cursor: pointer; display: inline;"></span>￼</p>
<p>上图则是实际项目应用中的Redux相关文件的结构。stores中存放全局数据store相关的实现。</p>
<p>actions中则存放根据模块切割开的各类action生成函数集合。在 Redux 中，改变 State 只能通过 action。并且，每一个 action 都必须是 Javascript Plain Object。事实上，创建 action 对象很少用这种每次直接声明对象的方式，更多地是通过一个创建函数。这个函数被称为Action Creator。</p>
<p>reducers中存放许多reducer的实现，其中RootReducer是根文件，它负责把其他reducer拼接为一整个reducer，而reducer就是根据 action 的语义来完成 State 变更的函数。Reducer 的执行是同步的。在给定 initState 以及一系列的 actions，无论在什么时间，重复执行多少次 Reducer，都应该得到相同的 newState。</p>
<h2 id="articleHeader7">性能测试</h2>
<h3 id="articleHeader8">服务端</h3>
<p>测试工具：OS X Activity Monitor（http_load）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007082972?w=936&amp;h=202" src="https://static.alili.tech/img/remote/1460000007082972?w=936&amp;h=202" alt="serve" title="serve" style="cursor: pointer; display: inline;"></span>￼</p>
<h3 id="articleHeader9">客户端</h3>
<h5>iOS</h5>
<p>测试工具：Xcode 7.3</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007082973?w=936&amp;h=206" src="https://static.alili.tech/img/remote/1460000007082973?w=936&amp;h=206" alt="iOS" title="iOS" style="cursor: pointer;"></span>￼</p>
<h5>Android</h5>
<p>测试工具：Android Studio 1.2.0</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007082974?w=936&amp;h=206" src="https://static.alili.tech/img/remote/1460000007082974?w=936&amp;h=206" alt="Android" title="Android" style="cursor: pointer;"></span>￼</p>
<h3 id="articleHeader10">代码量相关</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007082975?w=936&amp;h=304" src="https://static.alili.tech/img/remote/1460000007082975?w=936&amp;h=304" alt="code" title="code" style="cursor: pointer; display: inline;"></span>￼</p>
<h4>简单总结</h4>
<p>React Native 尽管在开发上具有这样那样的坑，但是因其天生的跨平台，和优于 Html5的移动性能表现，使得他在写一些不太复杂的 App 的时候，开发速度非常快，自带两倍 buff。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js + React Native 毕设：农业物联网监测系统的开发手记

## 原文链接
[https://segmentfault.com/a/1190000007082825](https://segmentfault.com/a/1190000007082825)

