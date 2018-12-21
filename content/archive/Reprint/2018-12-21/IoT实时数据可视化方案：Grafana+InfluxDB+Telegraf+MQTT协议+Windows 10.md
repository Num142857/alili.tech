---
title: 'IoT实时数据可视化方案：Grafana+InfluxDB+Telegraf+MQTT协议+Windows 10' 
date: 2018-12-21 2:30:11
hidden: true
slug: 5rtixjjwexw
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">为什么写这篇博客？</h1>
<ul>
<li>最近被论文折磨的死去活来，实时数据可视化方案是我论文的题目。 每天都被这些技术玩弄于股掌之间，靠看文档延续生命和出成果。不得不说，做完这个论文可能以后不敢乱写readme了。 由此大胆推测大家的发量问题有都是看文档时产生的， 可见一个好的文档对开发人员有多么重要！！！ &nbsp;</li>
<li>网络上关于windows系统下搭建从数据源到前端可视化工具Grafana的解决方案甚少，且适合我自己本身开发所需情况的方案就更加少了。 在翻阅大量官方文档，github issues以及英文博客后，终于得到了可运行的demo。把相关详细的配置过程记录下来，方便以后学习或工作复用并造福于有相似需求的朋友。 &nbsp;</li>
</ul>
<h1 id="articleHeader1">服务构架</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="IoT Simulator(publisher)----> MQTT broker---->Telegraf(subscriber)---->InfluxDB---->Hosted Grafana(Cloud)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code style="word-break: break-word; white-space: initial;">I<span class="hljs-function"><span class="hljs-title">oT</span> Simulator(publisher)----&gt;</span> MQTT <span class="hljs-function"><span class="hljs-title">broker</span>----&gt;</span>T<span class="hljs-function"><span class="hljs-title">elegraf</span>(subscriber)----&gt;</span>I<span class="hljs-function"><span class="hljs-title">nfluxDB</span>----&gt;</span>Hosted Grafana(Cloud)</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012655664?w=862&amp;h=552" src="https://static.alili.tech/img/remote/1460000012655664?w=862&amp;h=552" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">配置安装流程</h1>
<h2 id="articleHeader3">数据来源</h2>
<p>数据来源在IoT Case下一般来自各个传感设备。 因为身边没有可用的传感器设备，于是在github上搜了个<a href="https://github.com/acesinc/json-data-generator" rel="nofollow noreferrer" target="_blank">小工具</a>来模拟数据发射器。该工具可输出自定义的json格式数据，并且支持MQTT，HTTP（s)，Azure IoT hub, Kafka等主流协议/工具，应用范围和场景广泛是我选择该工具的主要原因。 &nbsp; <br>唯一的缺点是输出的json默认为object, 不支持对array of object json的扩展，在API config的时候可能会遇到一些工具只能识别array of json object 的情况（比如power bi的rest api)。   <br>如果你的case中有使用真实的iot设备和通讯协议可自动忽略此part。   <br><strong>安装和配置相关请参照readme</strong> &nbsp;<br>在mySimConfigjson中对MQTT进行配置，语法参见[配置中使用的MQTT]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
            &quot;type&quot;: &quot;mqtt&quot;,
            &quot;broker.server&quot;: &quot;tcp://localhost&quot;,
            &quot;broker.port&quot;: 1883,
            &quot;topic&quot;: &quot;sensors/iot_simulator&quot;,
            &quot;clientId&quot;: &quot;iot_simulator&quot;,
            &quot;qos&quot;: 2
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code> {
            <span class="hljs-attr">"type"</span>: <span class="hljs-string">"mqtt"</span>,
            <span class="hljs-attr">"broker.server"</span>: <span class="hljs-string">"tcp://localhost"</span>,
            <span class="hljs-attr">"broker.port"</span>: <span class="hljs-number">1883</span>,
            <span class="hljs-attr">"topic"</span>: <span class="hljs-string">"sensors/iot_simulator"</span>,
            <span class="hljs-attr">"clientId"</span>: <span class="hljs-string">"iot_simulator"</span>,
            <span class="hljs-attr">"qos"</span>: <span class="hljs-number">2</span>
        }</code></pre>
<p>使用以下命令开始模拟数据  <br><code>java -jar json-data-generator-1.3.1-SNAPSHOT.jar mySimConfig.json</code></p>
<h2 id="articleHeader4">使用MQTT协议</h2>
<h3 id="articleHeader5">什么是MQTT协议？</h3>
<p>MQTT为MQ Telemetry Transport的缩写，该协议定义了在机器对机器或物联网环境下的通信规则。它采用发布/订阅的模式传输数据，设计思想是在尽力保证一定程度的数据可达性及稳定性的同时，减少对网络带宽和设备资源的依赖。MQTT协议简洁且轻量，适用于低带宽，高延迟或不稳定的网络环境中的设备，同时也适用于带宽和电源受限的移动应用.  <br>ref:<a href="http://mqtt.org/faq" rel="nofollow noreferrer" target="_blank">http://mqtt.org/faq</a></p>
<h3 id="articleHeader6">为什么使用MQTT协议？</h3>
<p>在使用Power BI作为可视化方案时，曾成功使用REST API直接将数据源通过HTTP推送到POWER BI所提供的endpoint。因此在架构这套服务之初，我并没有打算使用MQTT作为数据传输协议。但经过一番研究后，在我的案例当中，发现使用HTTP协议有以下局限性：</p>
<ol>
<li>在Telegraf的input plugins中，和HTTP相关的插件有两个：一个是HTTP JSON，另一个是HTTP Listener（HTTP Response由于不符合个体案例没有做研究）； HTTP JSON主要通过向拥有数据的HTTP URLs发送请求，并从对应响应中的json中获取数据。由于我的IoT设备仅仅是一个模拟的数据发送器且并没有为其部署本地服务器或云端服务器，因此无法分配到URL地址和端口，同时另一个考虑是希望减少在部署服务器上花费的成本，更好的集中在可视化工具上的研究上。 因此这个插件并不适合我的情况；HTTP Listener主要监听HTTP POST上的消息。Telegraf可以作为代理服务器来处理原本通过InfluxDB HTTP API 上 /write 写入的数据。听起来这个似乎深得我心，没有多余的学习成本---与使用POWER　BI时情景类似，可以将数据直接推入InfluxDB的API终端，然后设置Telegraf作为代理在写入数据库之前对数据流做process或aggregation的工作，使得数据变得更加具有可读性（meaningful）。简单粗暴快捷。唯一也是致命的缺点是如果使用HTTP Listener将仅支持<a href="https://docs.influxdata.com/telegraf/v1.5/concepts/data_formats_input/" rel="nofollow noreferrer" target="_blank">InfluxDB line protocol format</a> 作为数据写入格式。这就使得数据源的格式大大受限，数据输入格式解析的功能也相当于无法使用了，那么使用telegraf的意义就变得不那么大（对数据流进行格式解析和聚合）；</li>
<li>我使用的IoT Simulator对MQTT协议有较为全面的支持，无需二次开发接口；</li>
</ol>
<p>ref:<a href="https://docs.influxdata.com/telegraf/v1.5/plugins/inputs/" rel="nofollow noreferrer" target="_blank">https://docs.influxdata.com/t...</a></p>
<h3 id="articleHeader7">配置中使用的MQTT</h3>
<ul>
<li>如何安装MQTT Broker: 参见<a href="http://www.steves-internet-guide.com/install-mosquitto-broker/" rel="nofollow noreferrer" target="_blank">这里</a>，以及<a href="https://sivatechworld.wordpress.com/2015/06/11/step-by-step-installing-and-configuring-mosquitto-with-windows-7/" rel="nofollow noreferrer" target="_blank">这里</a>
</li>
<li>Publish/Subscribe:The MQTT protocol is based on the principle of publishing messages and subscribing to topics, or "pub/sub". Multiple clients connect to a broker and subscribe to topics that they are interested in. Clients also connect to the broker and publish messages to topics. Many clients may subscribe to the same topics and do with the information as they please. The broker and MQTT act as a simple, common interface for everything to connect to. This means that you if you have clients that dump subscribed messages to a database, to Twitter, Cosm or even a simple text file, then it becomes very simple to add new sensors or other data input to a database, Twitter or so on.</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                          
MQTT client1(sub)--->MQTT broker<----MQTT Client2(pub)  
                   (message center)   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  ^
                          |  
                    MQTT client2(pub)  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>                          
MQTT clie<span class="hljs-symbol">nt1</span><span class="hljs-comment">(sub)</span>---&gt;MQTT broker&lt;----MQTT Clie<span class="hljs-symbol">nt2</span><span class="hljs-comment">(pub)</span>  
                   <span class="hljs-comment">(message center)</span>   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  ^
                          |  
                    MQTT clie<span class="hljs-symbol">nt2</span><span class="hljs-comment">(pub)</span>  </code></pre>
<ul><li>Topic setting: 话题可以被划分层级，用/来表示具体层级结构。 例如： sensors/COMPUTER_NAME/temperature/HARDDRIVE_NAME</li></ul>
<p>two wildcards: # and +  <br>"+" for a single level of hierarchy，+/+/+/HARDDRIVE_NAME表示了包含上述例子的一个父集  <br>"#" for all remaining levels of hierarchy，sensors/COMPUTER_NAME/temperature/# 表示了包含上述例子的一个父集</p>
<ul><li>Quality of Service: <strong>Higher levels of QoS are more reliable, but involve higher latency and have higher bandwidth requirements.</strong>
</li></ul>
<p>0: The broker/client will deliver the message once, with no confirmation.  <br>1: The broker/client will deliver the message at least once, with confirmation required.  <br>2: The broker/client will deliver the message exactly once by using a four-step handshake. &nbsp;</p>
<ul><li>Downgrade for QoS</li></ul>
<p>消息订阅者允许在消息发布者制定的QoS级别上进行降级；例如mqtt_pub规定qos=2， 则mqtt_sub可以使qos=2 or 1 or 0；    <br>ref: <a href="https://mosquitto.org/man/mqtt-7.html" rel="nofollow noreferrer" target="_blank">https://mosquitto.org/man/mqt...</a></p>
<h2 id="articleHeader8">配置Telegraf</h2>
<p>step 1: 安装并解压telegraf （如果没有wget请自行下载（恕在下直言，windows简直就是个辣鸡）） &nbsp; &nbsp; &nbsp;<br><span class="img-wrap"><img data-src="/img/remote/1460000012655665?w=885&amp;h=121" src="https://static.alili.tech/img/remote/1460000012655665?w=885&amp;h=121" alt="" title="" style="cursor: pointer;"></span><br>step 2: 修改配置文件telegraf.conf（主要配置input，output&amp;processor plugins)       <br>配置主要参见：[InfluxDB HTTP API和Hosted Grafana HTTPS 通讯的冲突问题]及[配置中使用的MQTT]   <br>processor plugin的功能主要是打印从mqtt broker订阅的数据并显示在console中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[[outputs.influxdb]]
  urls = [&quot;https://localhost:8086&quot;] # required
  # The target database for metrics (telegraf will create it if not exists)
  database = &quot;telegraf&quot; # required
  precision = &quot;s&quot;
 ## Name of existing retention policy to write to.  Empty string writes to
  ## the default retention policy.
  retention_policy = &quot;&quot;
  ## Write consistency (clusters only), can be: &quot;any&quot;, &quot;one&quot;, &quot;quorum&quot;, &quot;all&quot;
  write_consistency = &quot;any&quot;

  ## Write timeout (for the InfluxDB client), formatted as a string.
  ## If not provided, will default to 5s. 0s means no timeout (not recommended).
  timeout = &quot;5s&quot;
  
  [[inputs.mqtt_consumer]]
  ## MQTT broker URLs to be used. The format should be scheme://host:port,
  ## schema can be tcp, ssl, or ws.
  servers = [&quot;tcp://localhost:1883&quot;]
  ## MQTT QoS, must be 0, 1, or 2
  qos = 2
  ## Connection timeout for initial connection in seconds
  connection_timeout = &quot;30s&quot;

  ## Topics to subscribe to
  topics = [
    &quot;sensors/iot_simulator&quot;
  ]

  # if true, messages that can't be delivered while the subscriber is offline
  # will be delivered when it comes back (such as on service restart).
  # NOTE: if true, client_id MUST be set
  persistent_session = false
  # If empty, a random client ID will be generated.
  client_id = &quot;&quot;

  ## Optional SSL Config
  # ssl_ca = &quot;/etc/telegraf/ca.pem&quot;
  # ssl_cert = &quot;/etc/telegraf/cert.pem&quot;
  # ssl_key = &quot;/etc/telegraf/key.pem&quot;
  ## Use SSL but skip chain &amp; host verification
  insecure_skip_verify = true

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md
  data_format = &quot;json&quot;
  ## List of tag names to extract from top-level of JSON server response
  tag_keys = [
    &quot;equippment name&quot;,
    &quot;timestamp&quot;
  ]
  
[[inputs.exec]]
  ## Commands array
  commands = []
#&quot;/tmp/test.sh&quot;, &quot;/usr/bin/mycollector --foo=bar&quot;
  ## measurement name suffix (for separating different commands)
  name_suffix = &quot;mqtt_consumer&quot;

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md
  data_format = &quot;json&quot;
  
  [[processors.printer]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>[[outputs.influxdb]]
  <span class="hljs-attr">urls</span> = [<span class="hljs-string">"https://localhost:8086"</span>] <span class="hljs-comment"># required</span>
  <span class="hljs-comment"># The target database for metrics (telegraf will create it if not exists)</span>
  <span class="hljs-attr">database</span> = <span class="hljs-string">"telegraf"</span> <span class="hljs-comment"># required</span>
  <span class="hljs-attr">precision</span> = <span class="hljs-string">"s"</span>
 <span class="hljs-comment">## Name of existing retention policy to write to.  Empty string writes to</span>
  <span class="hljs-comment">## the default retention policy.</span>
  <span class="hljs-attr">retention_policy</span> = <span class="hljs-string">""</span>
  <span class="hljs-comment">## Write consistency (clusters only), can be: "any", "one", "quorum", "all"</span>
  <span class="hljs-attr">write_consistency</span> = <span class="hljs-string">"any"</span>

  <span class="hljs-comment">## Write timeout (for the InfluxDB client), formatted as a string.</span>
  <span class="hljs-comment">## If not provided, will default to 5s. 0s means no timeout (not recommended).</span>
  <span class="hljs-attr">timeout</span> = <span class="hljs-string">"5s"</span>
  
  [[inputs.mqtt_consumer]]
  <span class="hljs-comment">## MQTT broker URLs to be used. The format should be scheme://host:port,</span>
  <span class="hljs-comment">## schema can be tcp, ssl, or ws.</span>
  <span class="hljs-attr">servers</span> = [<span class="hljs-string">"tcp://localhost:1883"</span>]
  <span class="hljs-comment">## MQTT QoS, must be 0, 1, or 2</span>
  <span class="hljs-attr">qos</span> = <span class="hljs-number">2</span>
  <span class="hljs-comment">## Connection timeout for initial connection in seconds</span>
  <span class="hljs-attr">connection_timeout</span> = <span class="hljs-string">"30s"</span>

  <span class="hljs-comment">## Topics to subscribe to</span>
  <span class="hljs-attr">topics</span> = [
    <span class="hljs-string">"sensors/iot_simulator"</span>
  ]

  <span class="hljs-comment"># if true, messages that can't be delivered while the subscriber is offline</span>
  <span class="hljs-comment"># will be delivered when it comes back (such as on service restart).</span>
  <span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> if true, client_id MUST be set</span>
  <span class="hljs-attr">persistent_session</span> = <span class="hljs-literal">false</span>
  <span class="hljs-comment"># If empty, a random client ID will be generated.</span>
  <span class="hljs-attr">client_id</span> = <span class="hljs-string">""</span>

  <span class="hljs-comment">## Optional SSL Config</span>
  <span class="hljs-comment"># ssl_ca = "/etc/telegraf/ca.pem"</span>
  <span class="hljs-comment"># ssl_cert = "/etc/telegraf/cert.pem"</span>
  <span class="hljs-comment"># ssl_key = "/etc/telegraf/key.pem"</span>
  <span class="hljs-comment">## Use SSL but skip chain &amp; host verification</span>
  <span class="hljs-attr">insecure_skip_verify</span> = <span class="hljs-literal">true</span>

  <span class="hljs-comment">## Data format to consume.</span>
  <span class="hljs-comment">## Each data format has its own unique set of configuration options, read</span>
  <span class="hljs-comment">## more about them here:</span>
  <span class="hljs-comment">## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md</span>
  <span class="hljs-attr">data_format</span> = <span class="hljs-string">"json"</span>
  <span class="hljs-comment">## List of tag names to extract from top-level of JSON server response</span>
  <span class="hljs-attr">tag_keys</span> = [
    <span class="hljs-string">"equippment name"</span>,
    <span class="hljs-string">"timestamp"</span>
  ]
  
[[inputs.exec]]
  <span class="hljs-comment">## Commands array</span>
  <span class="hljs-attr">commands</span> = []
<span class="hljs-comment">#"/tmp/test.sh", "/usr/bin/mycollector --foo=bar"</span>
  <span class="hljs-comment">## measurement name suffix (for separating different commands)</span>
  <span class="hljs-attr">name_suffix</span> = <span class="hljs-string">"mqtt_consumer"</span>

  <span class="hljs-comment">## Data format to consume.</span>
  <span class="hljs-comment">## Each data format has its own unique set of configuration options, read</span>
  <span class="hljs-comment">## more about them here:</span>
  <span class="hljs-comment">## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md</span>
  <span class="hljs-attr">data_format</span> = <span class="hljs-string">"json"</span>
  
  [[processors.printer]]</code></pre>
<p>step 3: 运行telegraf，运行前先开启数据模拟发射器和MQTT broker确保influxdb能订阅到稳定的数据流，否则influxdb有可能会报错监听不到数据写入。    <br><code>to\your\dir: telegraf --config telegraf.conf</code> &nbsp;   <br>由于配置了printer plugin，在telegraf正常运行的情况下可以看到数据流打印在console中  <br>step 4: 检查数据是否已写入数据库 &nbsp; <br><span class="img-wrap"><img data-src="/img/remote/1460000012655679?w=1436&amp;h=826" src="https://static.alili.tech/img/remote/1460000012655679?w=1436&amp;h=826" alt="" title="" style="cursor: pointer; display: inline;"></span><br>ref: <a href="https://docs.influxdata.com/telegraf/v1.5/" rel="nofollow noreferrer" target="_blank">https://docs.influxdata.com/t...</a></p>
<h2 id="articleHeader9">配置InfluxDB</h2>
<p>influxDB作为数据和终端可视化工具之间的桥梁，角色尤为重要。influxDB作为一个time-series database非常适合实时IoT数据的存储。 配置influxdb的过程较为简单，主要解决的问题集中在从http到https协议转换问题。  <br>step 1: 按照官网文档下载并解压influxdb   <br><span class="img-wrap"><img data-src="/img/remote/1460000012655666?w=848&amp;h=116" src="https://static.alili.tech/img/remote/1460000012655666?w=848&amp;h=116" alt="" title="" style="cursor: pointer; display: inline;"></span> &nbsp; <br>step 2: 运行influxdb(如果不需要修改任何influxdb的config文件)   <br><code>to\your\dir：influxd</code></p>
<h3 id="articleHeader10">InfluxDB HTTP API和Hosted Grafana HTTPS 通讯的冲突问题</h3>
<p>Influx DB默认采用HTTP协议进行Client和Server端的通信，而云端的Grafana服务则强制采用HTTPS确保数据传输的安全性。 众所周知，HTTPS协议是HTTP协议的安全版本，其安全性能的实现主要依靠在Transport Layer之上增加的TLS/SSL层实现文本及数据的加密。HTTPS与HTTP一个重要的区别在于HTTPS增加了对身份的验证功能，因此第三方无法伪造服务端或客户端身份，引入的证书认证机制就是用来确保这一功能的实现。<br>为了确保网络间通讯的安全，我将InfluxDB的接口也进行了相关配置，让其利用TLS层使用HTTPS协议进行数据的传输。<br>在配置过程中我使用的证书是self-signed-certificate,使用windows系统的配置过程稍有不同（windows真是伤不起，连个配置说明都没有）<br>step 1:使用openssl（没有的朋友要安装一下）生成证书和密钥；<br><code>sudo openssl req -x509 -nodes -newkey rsa:2048 -keyout /route/to/your/dir/influxdb-selfsigned.key -out /route/to/your/route/influxdb-selfsigned.crt -days &lt;NUMBER_OF_DAYS&gt;</code>  <br>进入文件所在目录，双击证书文件并安装证书（注意！要安装在受信任的根目录下） <br><span class="img-wrap"><img data-src="/img/remote/1460000012655667?w=408&amp;h=512" src="https://static.alili.tech/img/remote/1460000012655667?w=408&amp;h=512" alt="" title="" style="cursor: pointer; display: inline;"></span><br>step 2:配置influxDB;<br>和官方文档一致，点[这里](<a href="https://docs.influxdata.com/influxdb/v1.4/administration/https_setup/#setup-https-with-a-self-signed-certificate" rel="nofollow noreferrer" target="_blank">https://docs.influxdata.com/i...</a><br>)  <br>step 3:重启influxdb  <br><code>/influxdb/folder: influxd --config influxdb.conf</code>  <br>step 4:测试  <br>和官方文档一致，点<a href="https://docs.influxdata.com/influxdb/v1.4/administration/https_setup/#setup-https-with-a-self-signed-certificate" rel="nofollow noreferrer" target="_blank">这里</a>  <br>step 5：如果有使用telegraf，记得要将telegraf中output plugin的相关API也改成https！</p>
<h2 id="articleHeader11">配置grafana datasource</h2>
<p>这一步也是卡了很久，grafana的错误提示基本形同虚设，最好inpect一下页面看看dev tool的错误提示。（这点是不是太不程序员友好了，疯狂diss ）<br>在没有使用https之前grafana报错（谁能知道这个undefined是什么鬼意思！！  <br><span class="img-wrap"><img data-src="/img/remote/1460000012655668?w=1086&amp;h=716" src="https://static.alili.tech/img/remote/1460000012655668?w=1086&amp;h=716" alt="" title="" style="cursor: pointer; display: inline;"></span><br>inspect后终于在console看到了错误详细情况： <br><span class="img-wrap"><img data-src="/img/remote/1460000012655669?w=1580&amp;h=70" src="https://static.alili.tech/img/remote/1460000012655669?w=1580&amp;h=70" alt="" title="" style="cursor: pointer; display: inline;"></span><br>使用之后！Bang！ &nbsp; &nbsp;<br><span class="img-wrap"><img data-src="/img/remote/1460000012655670?w=1005&amp;h=914" src="https://static.alili.tech/img/remote/1460000012655670?w=1005&amp;h=914" alt="" title="" style="cursor: pointer;"></span><br>注意此处不要选择proxy模式，让grafana的后端服务代理请求，这样处于本地服务器的influxdb无法接受到grafana的请求；</p>
<h2 id="articleHeader12">DEMO</h2>
<p>最后一个折腾了我很久才得到的一个很粗略的demo。<br><span class="img-wrap"><img data-src="/img/remote/1460000012655671?w=1600&amp;h=730" src="https://static.alili.tech/img/remote/1460000012655671?w=1600&amp;h=730" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader13">心得</h1>
<ol>
<li>作为开源产品Grafana和InfluxDB,两者的documentation和error hint做的都不是特别好，在开发过程中，我花了大量时间理解文档内容和错误提示。可以说是非常心累了，作为开源产品应该更加注重文档撰写和错误提示开发不是吗？ &nbsp;</li>
<li>要提前熟悉一下SQL,对数据处理会比较有帮助（该捡起来的捡，该跪着学的学）；</li>
<li>操着卖白粉的心，拿着擦皮鞋的钱。 从技术选型到实操不知道看了多少文档，配置过程中也是一堆的bug亟待解决。有些时候也搜不出来个什么正经的解决方案，做的过程中也是一边摸索一边前进，再次感叹一个好的文档能节省相当多的开发时间以及扼杀脱发！！</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
IoT实时数据可视化方案：Grafana+InfluxDB+Telegraf+MQTT协议+Windows 10

## 原文链接
[https://segmentfault.com/a/1190000012514865](https://segmentfault.com/a/1190000012514865)

