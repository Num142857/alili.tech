---
title: 'webpack2的那些事儿 ------ 生成的文件是怎么运行的' 
date: 2019-01-26 2:30:18
hidden: true
slug: d390c506fsg
categories: [reprint]
---

{{< raw >}}

                    
<p>谢谢你们看我扯技术，最近在对<code>webpack2</code>进行的配置进行梳理和学习，<code>webpack</code>是在去年使用<code>vue</code>开始接触的，个人感觉<code>webpack</code> 融入到编程过程中，提供了模块化，将各种类型的文件都看成模块，通过不同的 <code>loader</code> 进行处理和代码组织，是一个比较新颖的编程体验，应该说<code>webpack</code>的编程适用场景比较广泛，能够比较方便的引入第三方的各种 npm 模块进行使用， 方便快速开发工作。<br>打算写几篇文章（如果能坚持的话= =）来总结下 <code>webpack</code>，文章不是教你怎么使用<code>webpack</code>，而是让你更好的了解你在使用的<code>webpack</code>是怎么去运行的 ，想来想去，第一篇就先介绍下<code>webpack</code>生成的文件，是怎么去执行的。</p>
<h3 id="articleHeader0">webpack 的生成信息</h3>
<p>首先我们要先通过 webpack 去生成文件（好一句废话），文章所有的代码都会在文章最后面给出链接，下面是本文章使用的代码的目录：<br><span class="img-wrap"><img data-src="/img/bVJy3T?w=314&amp;h=402" src="https://static.alili.tech/img/bVJy3T?w=314&amp;h=402" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们现在只要关注<code>js</code>目录，里面有两个入口 <code>app.js</code>、<code>bar.js</code>，然后会引用 es5，es6中的各种测试模块，具体大家可以看代码。然后代码一跑！只见命令行蹭蹭蹭跑出来了好多信息，像下面一样：<br><span class="img-wrap"><img data-src="/img/bVJy7u?w=624&amp;h=197" src="https://static.alili.tech/img/bVJy7u?w=624&amp;h=197" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>首先我们来看下生成的信息:</p>
<ul>
<li><p><code>Asset</code> : 这个一看就明白是生成的文件相对于配置中<code>output.path</code>的路径，可以看到图中生成的文件都是在 <code>output.path</code>底下的;然后我们仔细看下文件名，比如第一个<code>0.fb6d7f4.js</code>,是由<code>[name/chunkname].[hash/chunkhash].js</code>组成的，这个可以在<code>output.filename</code> 中配置,关于<code>hash</code>和<code>chunkhash</code>的区别，这个后面会专门通过一篇文章进行简介。</p></li>
<li><p><code>Size</code> : 这个就没啥好说的，就是生成文件的大小</p></li>
<li><p><code>Chunks</code> : 我们会看到有些 <code>Chunks</code>是两个数字，有些是一个，其实还可能出现更多，经过我的一堆实验= =，发现<code>Chunks</code>中的第一个数字，就是这个文件的 <code>ChunkId</code>，而后面的是当前这个文件依赖的文件的<code>ChunkId</code>，从图中我们可以看到，第一个文件的<code>ChunkId</code>是<code>0</code>,它依赖的是<code>ChunkId</code>为<code>3</code>的<code>manifest.a890c12.js</code></p></li>
<li><p><code>Chunk Names</code> : 这个就是这个生成文件的<code>chunkName</code>,可以用于文件命名，可以看到如果没有在<code>entry</code>中指定，那么<code>chunkName</code>会等于<code>chunkId</code></p></li>
</ul>
<h3 id="articleHeader1">程序加载流程</h3>
<p>了解了生成的信息，接下来我们把项目跑起来(可以用 <code>anywhere</code> 跑项目),通过<code>chrome developer tool</code>可以看到请求情况<span class="img-wrap"><img data-src="/img/bVJIVh?w=2304&amp;h=430" src="https://static.alili.tech/img/bVJIVh?w=2304&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到请求了页面html之后，按顺序分别加载了 <code>manifest</code>,<code>index</code>,<code>0</code>,<code>2</code>文件，这里我们先来分析下文件的分割和加载流程。</p>
<h4>分割</h4>
<p>可以看到页面的 js 被分割成为了4个文件，通常来说，一个项目定义了一个 <code>entry point</code>,<br><code>webpack</code>会以这个<code>entry point</code>作为入口，进行代码回溯，如果存在<code>System.import</code>或者是<code>require.ensure</code>的异步模块调用，<code>webpack</code>会对使用的模块进行单独打包，比如文件中的<code>0</code>、<code>2</code>这两个 js，如果没有异步模块调用，那么会将所有的代码生成在一个文件中，<code>webpack</code> 为了使得打包的代码进行优化，可以使用<code>CommonsChunkPlugin</code>插件对代码进行处理，将库文件单独打包，通过规则生成对应的 <code>chunk</code> 文件，其中的<code>manifest</code>为 默认的 <code>chunk</code>,其中包含了打包文件的<code>runtime</code>信息，还有<code>webpackJsonp</code>模块加载的封装库，所有的生成模块都是采用<code>webpackJsonp</code>进行封装的。</p>
<h4>manifest</h4>
<p>从上面的图中可以看到，浏览器按顺序分别加载了 <code>manifest</code>,<code>index</code>,<code>0</code>,<code>2</code>文件，其中<code>manifest</code>相当于<code>webpack</code>的<code>runtime</code>工具，用于做模块加载，其他文件是逻辑文件; <code>manifest</code>中封装了<code>webpackJsonpCallback</code>方法和<code>__webpack_require__</code>方法，下面我们来进行分析:</p>
<ul><li>
<p><code>webpackJsonpCallback(chunkIds, moreModules, executeModule)</code>:<code>webpackJsonpCallback</code>是chunk封装的包装方法，<code>webpack</code>在生成每一个<code>chunk</code>的时候都是通过这个方法进行包装的，我们在上面看到的 <code>chunksId</code>，会作为第一个参数，被包含进这个<code>chunk</code>的<code>module</code>会被以数组的形式传入第二个参数<code>moreModules</code>中，如果这个<code>chunk</code>中包含可以执行的<code>modules</code>，需要将 <code>moduleId</code>传入第三个参数 <code>executeModule</code>中，下面是 这个方法的代码片段：<br><span class="img-wrap"><img data-src="/img/bVJMzn?w=1708&amp;h=904" src="https://static.alili.tech/img/bVJMzn?w=1708&amp;h=904" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>这个方法主要做了下面几件事：</p>
<ul>
<li>
<h4>加载chunk</h4>
<p>我们可以看到这个方法用第一个循环分别将<code>chunkIds</code>处理进入<code>installedChunks</code>对象中，<code>installedChunks</code>对象用于记录<code>chunk</code>的加载情况，分别用<code>0</code>表示当前的<code>chunkId</code>已经加载完成，用一个长度为3的数组表示当前的<code>chunk</code>正在加载中，数据中其实存储着加载过程中的<code>resolve</code>方法、<code>reject</code>方法和<code>pormise</code>对象，这种只在通过<code>require.ensure</code>或者是<code>System.import</code>才会出现。因此我们可以看到，第一个<code>for</code>循环中判断如果<code>chunkId</code>在 installedChunks 中存在且不为0，则判断是异步加载的模块已经加载成功，将<code>chunk</code>的<code>resolve</code>方法传入<code>resolves</code>数组，然后后面运行，然后将<code>chunk</code>对应的状态设置为<code>0</code>。如果判断之后不存在，这认为这是一个同步加载的<code>chunk</code>，直接设置为<code>0</code>，表示<code>chunk</code>已经加载完毕。</p>
</li>
<li>
<h4>加载 module</h4>
<p>加载 <code>module</code> 的逻辑比较简单，判断纯不存在这个<code>module</code>之后，将 其写入<code>modules</code>参数之中</p>
</li>
<li>
<h4>运行需要执行的<code>module</code>
</h4>
<p>如果<code>executeModule</code>存在，则对其中对应<code>moduleId</code>的模块进行运行</p>
</li>
</ul>
</li></ul>
<ul><li>
<p><code>__webpack_require__</code>: 这个对象包含了多个方法，主要用于<code>module</code>和<code>chunk</code>的加载，处理和运行，下面我们一个一个分析：</p>
<ul>
<li><p><code>__webpack_require__(moduleId)</code> :代码如下<br><span class="img-wrap"><img data-src="/img/bVJMHk?w=1480&amp;h=786" src="https://static.alili.tech/img/bVJMHk?w=1480&amp;h=786" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span> 这个方法接收一个<code>moduleId</code>，构建一个 module 对象存入<code>installedModules</code>中，并且初始化这个 <code>module</code>, 最后返回<code>module.export</code></p></li>
<li><p><code>__webpack_require__.e(chunkId)</code> : 这个方法用于通过异步的方式加载 chunk 文件，代码如下：<br><span class="img-wrap"><img data-src="/img/bVJMHM?w=2056&amp;h=1408" src="https://static.alili.tech/img/bVJMHM?w=2056&amp;h=1408" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>这个方法总体来说就是加载一个 <code>script</code> 文件,生成一个 <code>promise</code>对象，当 script 加载完成后运行，又会执行前面的<code>webpackJsonpCallback</code>注册<code>chunk</code>,然后<code>promise.resolve</code>。这里面需要注意的是红框里面的东西，这个涉及到一个优化点，如果没有在使用<code>CommonsChunkPlugin</code>单独打包<code>manifest</code>，那么一般来说他会和你指定的其他库通过<code>CommonsChunkPlugin</code>打包在一起,那么你会发现即使你只是修改了库之外的逻辑，库文件生成的文件的<code>hash</code>或者是<code>chunkhash</code>也是会变的，原因就在于<code>manifest</code>中红框部分是动态生成的，导致文件的 hash 产生变化，不利于缓存，因此建议单独打包<code>manifest</code></p></li>
<li><p><code>__webpack_require__.oe</code>:定义一个统一的错误处理函数</p></li>
<li><p><code>__webpack_require__.p</code>:这个是和<code>webpack</code>的<code>output.publicPath</code>对应的值</p></li>
<li><p><code>__webpack_require__.o</code>:<code> Object.prototype.hasOwnProperty</code>的封装<br>前面几个方法在 <code>ES5</code>的情景下面已经足够运行这个模块系统，我们都知道<code>webpack2</code>加入了对<code>ES6 MODULE</code>的支持，下面几个<code>__webpack_require__</code>是为<code>ES6</code>使用的：</p></li>
<li><p><code>__webpack_require__.d</code>:代码如下:<br><span class="img-wrap"><img data-src="/img/bVJMLz?w=1020&amp;h=316" src="https://static.alili.tech/img/bVJMLz?w=1020&amp;h=316" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>这个是用于<code>ES6</code>中命名的<code>export</code>比如 <span class="img-wrap"><img data-src="/img/bVJMMp?w=718&amp;h=128" src="https://static.alili.tech/img/bVJMMp?w=718&amp;h=128" alt="图片描述" title="图片描述" style="cursor: pointer;"></span> webpack 遇到这种<code>export</code>，会对其用<code>__webpack_require__.d</code>进行包装，变成: <span class="img-wrap"><img data-src="/img/bVJMMx?w=1268&amp;h=166" src="https://static.alili.tech/img/bVJMMx?w=1268&amp;h=166" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li>
<li><p><code>__webpack_require__.i</code>:用于返回一个正确的上下文的函数回去，针对的是<code>export</code>直接为一个可运行方法的时候</p></li>
</ul>
</li></ul>
<p>以上就是<code>webpack manifest</code>中的大部分重要的函数，其实主要就是通过<code>webpackJsonpCallback</code>来注册载入对应的<code>chunk</code>文件，通过<code>__webpack_require__</code>来处理模块的关系。</p>
<h3 id="articleHeader2">总结</h3>
<p>整个<code>webpack</code> 的在运行时都是通过 <code>manifest</code>去做控制处理的， <code>webpackJsonpCallback</code>对应的是对加载的<code>chunk</code>文件的处理，<code>__webpack_require__</code>是对加载模块的处理，了解这些可以使我们更好的去优化我们的代码，帮助我们去调试代码，帮助我们在复杂情况下去解决问题提供一些其他的思路。</p>
<p>最后附上代码：先介绍下,<code>webpack-base</code>是我在使用<code>webpack</code>的过程中自己总结的一套脚手架，文档还没有完善，如果需要文档可以在<code>issue</code>里面提，本次的项目在分支上面开发，代码<a href="https://github.com/qbright/webpack2-base/tree/branch/webpack2-how-webpack-file-work" rel="nofollow noreferrer" target="_blank">点击这里</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack2的那些事儿 ------ 生成的文件是怎么运行的

## 原文链接
[https://segmentfault.com/a/1190000008490316](https://segmentfault.com/a/1190000008490316)

