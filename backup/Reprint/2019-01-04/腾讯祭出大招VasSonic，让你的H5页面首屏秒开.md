---
title: '腾讯祭出大招VasSonic，让你的H5页面首屏秒开' 
date: 2019-01-04 2:30:10
hidden: true
slug: 5teug87dwt
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">VasSonic成长历程</h1>
<hr>
<h2 id="articleHeader1">前言</h2>
<p>2017.8.8 14时，SNG增值产品部Vas团队研发的轻量级高性能Hybrid框架VasSonic通过了公司最终审核，作为腾讯开源组件分享给大家。从当初立项优化页面加载速度，到不断摸索、优化，再到整理代码、文档，最终在Github上开源，并且在24小时内获取star数超过1600。我们非常高兴看到我们的成果收到这么多的关注，趁此机会，正好回顾一下VasSonic的成长历程，也希望能够让大家更了解VasSonic。</p>
<h2 id="articleHeader2">项目背景</h2>
<p>Web相信大家再熟悉不过了，它具有快速迭代发布的天然优势，但也存在中一些让人诟病的问题，比如加载速度慢，体验差等。在此之前，手Q上很多页面首屏打开速度居高不下，甚至有些耗时达到3s以上，这意味着用户打开页面必须经过3秒之后才能进行交互操作，体验相当差，很多用户忍受不了这个漫长的时间直接流失掉了。</p>
<p>为了提升用户体验和业务用户留存率，我们很多业务一开始通过Web开发，等页面模型验证符合预期后，再将H5页面转化成原生界面。我们很快意识到这不是一种健康的可持续的开发模式，一方面存在重复人力浪费，另外一方面原生商城除了速度快一点，要运营活动改版都很难。</p>
<p>所以后来团队改了切入方向，安排人力专心研究如何加快页面打开速度，经过了一系列的摸爬滚打和优化探索，最终我们研发出了VasSonic框架，让H5页面首屏达到秒开，给用户一个更好的H5体验。下面就和大家分享VasSonic框架的发展历程。</p>
<h2 id="articleHeader3">业务形态</h2>
<p>任何一个技术框架都是结合具体的业务形态来进行发展优化的，技术是为了更好地服务业务，业务也会驱动技术的发展。在此首先介绍一下业务形态，我们是来自手Q增值产品部门的VAS团队，负责手机QQ上很多深受年轻人喜欢的个性化增值服务，比如气泡、挂件、主题等等。手Q上大部分的业务还是基于H5开发的，大家对手Q的业务形态可能有简单的了解。比如下图的游戏分发中心、会员特权中心、个性化装扮商城等。这部分商城的特点比较明显，页面的很多数据都是动态的，是由我们的产品经理在后台配置的。<br><span class="img-wrap"><img data-src="/img/remote/1460000010711029" src="https://static.alili.tech/img/remote/1460000010711029" alt="业务" title="业务" style="cursor: pointer; display: inline;"></span></p>
<p>这些都是很常见页面，我们通常将html/js/css等静态资源放到CDN上，然后页面加载后，再通过CGI去拉取最新的数据，进行拼接展示， 这样子可以利用到CDN的多地部署和就近接入等优势，同时提高了服务器的并发能力。这种传统模式的加载流程如下所示： <br><span class="img-wrap"><img data-src="/img/remote/1460000010711030" src="https://static.alili.tech/img/remote/1460000010711030" alt="加载流程" title="加载流程" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>用户点击后，经过终端一系列初始化流程，比如进程启动、Runtime初始化、创建WebView等等。</li>
<li>完成初始化后，WebView开始去CDN上面请求Html加载页面。</li>
<li>页面发起CGI请求对应的数据或者通过localStorage获取数据，数据回来后再对DOM进行操作更新</li>
</ol>
<p>可以看出上述流程存在着几个问题：</p>
<ol>
<li>从外网统计数据来看，用户的终端耗时在1s以上，这意味着在这1s多的时间里，网络完全是空闲在等待的，非常浪费；</li>
<li>页面的资源和数据完全依赖于网络，特别是用户在弱网络场景下，页面会出现很长时间的白屏，体验非常差；</li>
<li>因为页面的数据依赖于动态拉取，加载完页面后，往往是看到一些模块先转菊花，再展示，体验也是不好的。同时这里涉及到较多数据更新，经常要更新DOM，性能上也有不少开销。</li>
</ol>
<p>所以针对以上几个问题，我们也对应做了很多优化和探索。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711031" src="https://static.alili.tech/img/remote/1460000010711031" alt="问题" title="问题" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">VasSonic的前世</h2>
<h3 id="articleHeader5">优化终端</h3>
<p>针对终端耗时1s以上的情况，我们对手Q WebView框架进行了重构：</p>
<ol>
<li>启动流程彻底拆分，设计为一个状态机按序按需执行</li>
<li>View相关拆分模块化设计，尽可能懒加载，IO异步化</li>
<li>X5内核在手Q中的独立进程中提前预加载</li>
<li>创建WebView对象复用池</li>
</ol>
<p>关于第四点，我们想分享一些Android平台上的细节，由于Android系统的生态原因，导致用户的系统版本和系统Webkit内核处于极其分裂状态，所以我们公司在手Q和微信统一使用X5内核。相对系统WebView来说，首次启动X5内核时，创建WebView比较耗时，因此我们尽量想复用WebView，但是WebView却是与Activity Context绑定。销毁复用的时候，需要释放Activity的Context，否则会内存泄露。针对这种情况，有没有一种两全其美的办法呢？</p>
<p>计算机有一句经典的名言：<code>计算机领域任何一个问题都可以通过引入中间层来解决</code>。于是我们通过包装的方式，实现了一个Context的壳，真正的实现体包装在里面，逻辑调用真正调用到对应的实现体的函数。 经过实验发现，Android系统本身提供了这么一个<code>MutableContextWrapper</code>，作为Context的一个中间层。</p>
<p>我们会将Activity context包在MutableContextWrapper里面，destory的时候，会将WebView的Context设置为Application的Context，从而释放Activity Context。<br>类似如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//precreate WebView
MutableContextWrapper contextWrapper = new MutableContextWrapper(BaseApplicationImpl.sApplication);
mPool[0] = new WebView(contextWrapper);

//reset WebView 
ct =(MutableContextWrapper)webview.getContext();
ct.setBaseContext(getApplication());

//reuse WebView
((MutableContextWrapper)webview.getContext()).setBaseContext(activityContext);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="Java">
<span class="hljs-comment">//precreate WebView</span>
MutableContextWrapper contextWrapper = <span class="hljs-keyword">new</span> MutableContextWrapper(BaseApplicationImpl.sApplication);
mPool[<span class="hljs-number">0</span>] = <span class="hljs-keyword">new</span> WebView(contextWrapper);

<span class="hljs-comment">//reset WebView </span>
ct =(MutableContextWrapper)webview.getContext();
ct.setBaseContext(getApplication());

<span class="hljs-comment">//reuse WebView</span>
((MutableContextWrapper)webview.getContext()).setBaseContext(activityContext);
</code></pre>
<h3 id="articleHeader6">静态直出</h3>
<p>“直出”这个概念对前端同学来说，并不陌生。为了优化首屏体验，大部分主流的页面都会在服务器端拉取首屏数据后通过NodeJs进行渲染，然后生成一个包含了首屏数据的Html文件，这样子展示首屏的时候，就可以解决内容转菊花的问题了。<br>当然这种页面“直出”的方式也会带来一个问题，服务器需要拉取首屏数据，意味着服务端处理耗时增加。<br>不过因为现在Html都会发布到CDN上，WebView直接从CDN上面获取，这块耗时没有对用户造成影响。<br>手Q里面有一套自动化的构建系统Vnues，当产品经理修改数据发布后，可以一键启动构建任务，Vnues系统就会自动同步最新的代码和数据，然后生成新的含首屏Html，并发布到CDN上面去。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711032" src="https://static.alili.tech/img/remote/1460000010711032" alt="直出" title="直出" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">离线预推</h3>
<p>页面发布到CDN上面去后，那么WebView需要发起网络请求去拉取。当用户在弱网络或者网速比较差的环境下，这个加载时间会很长。于是我们通过离线预推的方式，把页面的资源提前拉取到本地，当用户加载资源的时候，相当于从本地加载，即使没有网络，也能展示首屏页面。这个也就是大家熟悉的离线包。<br>手Q使用7Z生成离线包, 同时离线包服务器将新的离线包跟业务对应的历史离线包进行BsDiff做二进制差分，生成增量包，进一步降低下载离线包时的带宽成本，下载所消耗的流量从一个完整的离线包（253KB）降低为一个增量包（3KB）。<br><span class="img-wrap"><img data-src="/img/remote/1460000010711033" src="https://static.alili.tech/img/remote/1460000010711033" alt="带宽优化" title="带宽优化" style="cursor: pointer;"></span></p>
<p>经过一系列优化后，在Android平台上，点击到页面首屏展示的耗时从平均<em>3s</em>多降低为<em>1.8s</em>，优化<em>40% 以上</em>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711034" src="https://static.alili.tech/img/remote/1460000010711034" alt="数据对比" title="数据对比" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">VasSonic的诞生</h2>
<p>虽然通过静态直出和离线预推等方式优化后，速度已经达到1.8s，但还存在很大的优化空间，当我们准备持续深入优化时，我们的业务形态发生了新的变化。</p>
<p>之前我们页面内容的数据主要是由产品经理要配置的，用户看到的内容基本都是一样的。而现在页面为了更好地为用户推荐喜欢的内容，我们后台引入机器学习和随机算法来做智能个性化推荐。比如左边新用户推荐的是新货精选，而右边活跃用户展示的是潮品推荐。另外还有部分的内容是随机算法推荐的。这意味着不同用户看到的内容是不同的，同一个用户不同时间看到的内容也有可能不同。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711035" src="https://static.alili.tech/img/remote/1460000010711035" alt="新业务" title="新业务" style="cursor: pointer;"></span></p>
<p>所以为了满足业务的需求，我们只能实时拉取用户数据并在服务端渲染后返回给客户端，也就是动态直出的方案。</p>
<p>但是动态直出方案存在几个比较明显的问题：</p>
<ol>
<li>服务端实时拉取数据渲染导致白屏时间长，因为服务器要先实时拉取个人数据，然后进行渲染直出，这个耗时不可控；</li>
<li>首屏无法使用离线预推等缓存策略，因为每个用户看到的内容不一样，我们无法通过静态直出的方式那样把Html全部发布到CDN；</li>
</ol>
<p>虽然动态直出方案下，页面首屏无法通过离线预推等方式进行加载优化，但前面优化积累的经验给我们提供了思路：要优化白屏问题，核心还是得从提升资源加载速度方向入手。所以我们重点在资源加载方面进行了深度优化。</p>
<h3 id="articleHeader9">并行加载</h3>
<p>首先在加载流程方面，我们发现这里WebView访问依然是串行的， WebView要等终端初始化完成之后，才发起请求。虽然终端耗时优化了不少，但是从外网的统计数据来看，终端初始化还是存在几百毫秒的耗时，而这段时间内网络是在空等的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711036" src="https://static.alili.tech/img/remote/1460000010711036" alt="串行" title="串行" style="cursor: pointer; display: inline;"></span></p>
<p>因此性能上不够极致，我们优化代码，这两个操作并行处理，流程改为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711037" src="https://static.alili.tech/img/remote/1460000010711037" alt="并行" title="并行" style="cursor: pointer;"></span></p>
<p>并行处理后速度有所改善，但我们发现在某些场景下，终端初始化比较快，但数据没有完成返回，这意味着内核在空等，而内核是支持边加载边渲染的，我们在并行的同时，能否也利用内核的这个特性呢？</p>
<p>于是我们加入了一个中间层来桥接内核和数据，内部称为流式拦截：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711038" src="https://static.alili.tech/img/remote/1460000010711038" alt="桥接流" title="桥接流" style="cursor: pointer;"></span></p>
<ol>
<li>启动子线程请求页面主资源，子线程中不断讲网络数据读取到内存中，也就是网络流(NetStream)和内存流(MemStream)之间的转换；</li>
<li>当WebView初始化完成的时候，提供一个中间层BridgeStream来连接WebView和数据流；</li>
<li>当WebView读取数据的时候，中间层BridgeStream会先把内存的数据读取返回后，再继续读取网络的数据。</li>
</ol>
<p>通过这种桥接流的方式，整个内核无需等待，继续做到边加载边解析。这种并行的方式让首屏的速度优化<em>15%以上</em>，进一步提升了页面加载速度。</p>
<h3 id="articleHeader10">动态缓存</h3>
<p>通过并行加载，我们极大地提升了WebView请求的速度，但是在弱网络场景下白屏时间还是非常长，用户体验非常糟糕。于是我们在思考，是否能够将用户的已经加载的页面内容缓存下来，等用户下此点击页面的时候，我们先加载展示页面缓存，第一时间让用户看到内容，然后同时去请求新的页面数据，等新的页面数据拉取下来之后，我们再重新加载一遍即可。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711039" src="https://static.alili.tech/img/remote/1460000010711039" alt="动态缓存" title="动态缓存" style="cursor: pointer;"></span></p>
<p>保存页面内容这个工作很简单，因为现在我们资源读取都是通过中间层BridgeStream来管理的，只需要将整个读取的内容缓存下来即可。<br>于是我们就按动态缓存这种方案去实现了，但很快就发现了问题。用户打开页面之后，先是看到历史页面，等用户准备去操作的时候，突然页面白闪一下，重新加载了一遍，这种体验非常差，特别在一些低端机器上，这个白闪的过程太明显，非常影响体验，这是用户和产品经理都不能接受的。于是我们在思考，能否只做局部的刷新，仅刷新变化的元素呢？</p>
<p>通过分析，我们发现同一个用户的页面，大部分数据都是不变的，经常变化的只有少量数据，于是我们提出了模板(template)和数据块(data)的概念：页面中经常变化的数据我们称为数据块，除了数据块之外的数据称为模板。</p>
<h3 id="articleHeader11">页面分离</h3>
<p>我们将整个页面html通过VasSonic标签进行划分，包裹在标签中的内容为data，标签外的内容为模版。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711040" src="https://static.alili.tech/img/remote/1460000010711040" alt="页面规范" title="页面规范" style="cursor: pointer;"></span></p>
<p>首先我们对Html内容进行了扩展，通过代码注释的方式，增加了“sonicdiff-xxx”来标注一个数据块的开始与结束。<br>而模板就是将数据块抠掉之后的Html，然后通过{albums}来表示这个是一个数据块占位。<br>数据就是JSON格式，直接Key-Value。<br>当然，为了完美地兼容Html，我们对协议头部进行了扩展，比如增加accept-diff来标注是否支持增量更新、template-tag来标注模板的md5是多少等。OK，有了上面这个规则或者公式后，我们就可以实现增量更新了。</p>
<h3 id="articleHeader12">请求规范约定</h3>
<p>VasSonic为了支持区分客户端是否支持增量更新等能力，对头部字段进行了扩展</p>
<table>
<thead><tr>
<th align="center">字段</th>
<th align="center">说明</th>
<th align="center">请求头(Y/N)</th>
<th align="center">响应头(Y/N)</th>
</tr></thead>
<tbody>
<tr>
<td align="center">accept-diff</td>
<td align="center">表示终端是否支持VasSonic模式，true为支持，否则不支持</td>
<td align="center">Y</td>
<td align="center">N</td>
</tr>
<tr>
<td align="center">If-none-match</td>
<td align="center">本地缓存的etag，给服务端判断是否命中304</td>
<td align="center">Y</td>
<td align="center">N</td>
</tr>
<tr>
<td align="center">etag</td>
<td align="center">页面内容的唯一标识(哈希值)</td>
<td align="center">N</td>
<td align="center">Y</td>
</tr>
<tr>
<td align="center">template-tag</td>
<td align="center">模版唯一标识(哈希值)，客户端使用本地校验 或 服务端使用判断是模板有变更</td>
<td align="center">Y</td>
<td align="center">Y</td>
</tr>
<tr>
<td align="center">template-change</td>
<td align="center">标记模版是否变更，客户端使用</td>
<td align="center">N</td>
<td align="center">Y</td>
</tr>
<tr>
<td align="center">cache-offline</td>
<td align="center">客户端端使用，根据不同类型进行不同行为</td>
<td align="center">N</td>
<td align="center">Y</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader13">cache-offline字段说明</h3>
<table>
<thead><tr>
<th align="center">字段</th>
<th align="center">说明</th>
</tr></thead>
<tbody>
<tr>
<td align="center">true</td>
<td align="center">缓存到磁盘并展示返回内容</td>
</tr>
<tr>
<td align="center">false</td>
<td align="center">展示返回内容，无需缓存到磁盘</td>
</tr>
<tr>
<td align="center">store</td>
<td align="center">缓存到磁盘，如果已经加载缓存，则下次加载，否则展示返回内容</td>
</tr>
<tr>
<td align="center">http</td>
<td align="center">容灾字段，如果http表示终端六个小时之内不会采用sonic请求该URL</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader14">模式介绍</h3>
<p>VasSonic根据本地是否有缓存以及本地缓存数据跟服务器数据的差异情况分为以下四种模式。</p>
<table>
<thead><tr>
<th align="center">模式</th>
<th align="center">说明</th>
<th align="center">条件</th>
</tr></thead>
<tbody>
<tr>
<td align="center"><strong>首次加载</strong></td>
<td align="center">本地没有缓存，即第一次加载页面</td>
<td align="center">etag为空值或template_tag为空值</td>
</tr>
<tr>
<td align="center"><strong>完全缓存</strong></td>
<td align="center">本地有缓存，且缓存内容跟服务器内容完全一样</td>
<td align="center">etag一致</td>
</tr>
<tr>
<td align="center"><strong>数据更新</strong></td>
<td align="center">本地有缓存，本地模版内容跟服务器模版内容一样，但数据块有变化</td>
<td align="center">etag不一致 且 template_tag一致</td>
</tr>
<tr>
<td align="center"><strong>模版更新</strong></td>
<td align="center">本地有缓存，缓存的模版内容跟服务器的模版内容不一样</td>
<td align="center">etag不一致 且 template_tag不一致</td>
</tr>
</tbody>
</table>
<h4>首次加载</h4>
<p>我们会在请求头部带上支持accept-diff为true和sdk版本号等标识着首次加载的信息。当请求返回后，VasSonic会在延迟几秒后(避免激烈IO竞争)将页面抽离成模板和数据并保存到本地。此时终端缓存目录下，该页面将对应三个缓存文件xxx.html、xxx.template、xxx.data，其中xxx是该页面的唯一标识(即sonicSessionId)。</p>
<p>对于页面非首次加载场景，VasSonic优先加载本地缓存， 同时我们会在请求头部带上当前缓存和模板的md5，后台进行模板md5对比之后，分为以下几种情况：</p>
<h4>非首次加载之完全缓存</h4>
<p>本地有缓存，且缓存内容跟服务器内容完全一样.</p>
<h4>非首次加载之增量数据</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711041" src="https://static.alili.tech/img/remote/1460000010711041" alt="增量数据" title="增量数据" style="cursor: pointer;"></span></p>
<p>如果模板发现没有变化，那么会在响应头部返回template-change=false，同时响应包体返回的数据不再是完整的html，而是一段JSON数据，及全部的数据块。我们现在需要跟本地数据进行差分，找出真正的增量数据，如上图中，后台返回了N个数据，实际上仅有一个数据是有变化的，那么我们仅需要将这个变化的数据提交到页面即可。一般场景下，这个差异的数据比全部数据要小很多。如果页面拆分数据得更细，那么页面的变动就更小，这个取决于前端同学对数据块的细化程度。</p>
<p>获得变化数据块(diff_data)后，客户端只需要通知页面页面设置的回调接口(getDiffDataCallback)进行界面元素更新即可。这里javascript的通信方式也可以自由定义(可以使用webview标准的javascript通信方式，也可以使用伪协议的方式)，只要页面跟终端协商一致就可以。<br><span class="img-wrap"><img data-src="/img/remote/1460000010711042" src="https://static.alili.tech/img/remote/1460000010711042" alt="提交增量" title="提交增量" style="cursor: pointer; display: inline;"></span></p>
<p>对于数据更新这种场景，终端还会将新的数据和模板拼接成为新的页面，保持缓存最新。当终端初始化比较慢的时候，WebView去加载缓存的时候，这个页面可能已经是最新的了，连数据刷新都不需要。</p>
<h4>非首次加载之模板更新</h4>
<p>与数据更新模式不一样，由于业务需求，页面的模板会发生更改。当终端在获取到新的模板和数据后，本地在子线程中进行合并，生成一个新的缓存，然后回调通知终端，刷新WebView来加载新的缓存。</p>
<p>我们来看一下最终的流程图，跟动态缓存对比，有不少细节优化：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711043" src="https://static.alili.tech/img/remote/1460000010711043" alt="整体流程" title="整体流程" style="cursor: pointer; display: inline;"></span></p>
<p>我们从第2步开始，SonicSession首先会去读取缓存。会抛个消息通知WebView读取缓存，如果Webview已经准备好，则直接加载缓存，如果没有，则缓存先放在内存里面。同时SonicSession也会带上模板等信息到后台拉取新的内容，后台经过Sonic-Diff之后，会返回新的数据。SonicSession拿到新的数据后，首先会跟本地数据进行Diff，如果发现WebView已经加载缓存，则直接提交增量数据给页面。否则继续拼接最新的页面，替换掉内存里面的缓存，同时保存到本地。这个时候WebView如果Ready，则直接进行第5步load最新的内容即可。</p>
<h4>效果统计</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010711044" src="https://static.alili.tech/img/remote/1460000010711044" alt="效果统计" title="效果统计" style="cursor: pointer;"></span></p>
<p>这个是我们外网的统计数据。在数据更新模式下，首屏的耗时在1s左右，相比普通的动态直出，优化了50%以上。模板更新这个会比首次高，是因为加载了两次页面，不过从模式占比上来看，我们大部分页面都是数据更新。针对模板更新这种耗时比较高的情况，前面优化积累的经验给我们提供了思路，核心还是从提前获取资源方向入手，因此我们优先考虑如何预加载模板更新。</p>
<h4>预加载</h4>
<p>实际上整个SonicSession在没有WebView的情况下，也是可以独立完成所有逻辑的，当用户点击页面的时候，我们在将WebView和SonicSession绑定起来即可。于是我们支持了两种预加载的模式，一种是通过后台push的方式，来提前获取数据。还有一种就是JSAPI，页面可以调用JSAPI来预加载用户可能操作的下一个页面。通过这两种方式，我们可以把需要的增量更新数据提前拉取回来<br><span class="img-wrap"><img data-src="/img/remote/1460000010711045" src="https://static.alili.tech/img/remote/1460000010711045" alt="预加载" title="预加载" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">效果对比</h2>
<table>
<thead><tr>
<th align="center">Pic 1: 没有使用VasSonic</th>
<th align="center">Pic 2: 使用VasSonic</th>
</tr></thead>
<tbody><tr>
<td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000010711046" src="https://static.alili.tech/img/remote/1460000010711046" alt="default mode" title="default mode" style="cursor: pointer;"></span></td>
<td align="center"><span class="img-wrap"><img data-src="/img/remote/1460000010711047" src="https://static.alili.tech/img/remote/1460000010711047" alt="VasSonic mode" title="VasSonic mode" style="cursor: pointer;"></span></td>
</tr></tbody>
</table>
<h2 id="articleHeader16">展望未来</h2>
<p>开源只是故事的开始，我们仍会持续对 VasSonic 做改进，包括更易用的接口、更好的性能、更高的可靠性，同时快速响应解决开源后的issue和PR。这些改进最终也会原封不动地在手Q内使用，这一切都是为了更快的WebView加载速度。 </p>
<p>Talk is cheap，read the fucking code. If you are interested in VasSonic, don't forget to STAR <a href="https://github.com/Tencent/VasSonic" rel="nofollow noreferrer" target="_blank">VasSonic</a>.<br>Thank you for reading ~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
腾讯祭出大招VasSonic，让你的H5页面首屏秒开

## 原文链接
[https://segmentfault.com/a/1190000010711024](https://segmentfault.com/a/1190000010711024)

