---
title: 'Sanic ＋ 前端MVVM 一种新一代Python高性能全栈开发实践' 
date: 2019-01-12 2:30:24
hidden: true
slug: c7v1i5n387j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">SanicCRUD-vue</h2>
<p>Sanic ＋ 前端MVVM 一种新一代Python高性能全栈开发实践<br><span class="img-wrap"><img data-src="/img/bVPpUT?w=300&amp;h=373" src="https://static.alili.tech/img/bVPpUT?w=300&amp;h=373" alt="20f0cc743f009782.png" title="20f0cc743f009782.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">背景</h2>
<p>本项目将使用Sanic + Vue2 ＋ Webpack2 配合最简单CRUD的逻辑来展示一个基于Python的全新一代高性能全栈开发实践的Demo</p>
<h3 id="articleHeader2">为什么是Sanic</h3>
<p>对于为何不是Flask、Django等著名框架，或许可能很多人会产生疑惑，Sanic本身和Flask非常的相似，而它的出现，不仅是大大改进过去WSGI时代性能低下通病，外加配合uvloop作为核心引擎，使Sanic在很多情况下单机并发甚至不亚于Golang，而且它更意味着Python在Web领域走进了全新的未来。</p>
<p>那么uvloop又是什么？简单的说，Python3.4之后作为最高效简单的协程并发库莫过于asyncio，而asyncio的出现仅仅只是为了提供更方便的异步编程及互操作的接口，其底层用的还是比较传统的event loop，而uvloop是在重新定制asyncio基础上引入了libuv，<br>其性能不仅超过了以往如gevent、tornado等Python异步框架，也同样以超过2倍多的性能领先于node.js。</p>
<p><span class="img-wrap"><img data-src="/img/bVPpWP?w=595&amp;h=466" src="https://static.alili.tech/img/bVPpWP?w=595&amp;h=466" alt="d814cd60b591dc33.png" title="d814cd60b591dc33.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>是不是和Flask非常相似？</p></blockquote>
<h3 id="articleHeader3">为什么是MVVM</h3>
<p>那么在我继续之前，我也想和大家回顾一下Web开发的发展简史：</p>
<ul>
<li><p>第一阶段: 网页三剑客，生猛的通过原生javascript直接操作Dom树;</p></li>
<li><p>第二阶段: JQuery诞生，配合前端MVC为代表的Backbone.js, 让我们可以优雅而简单的操作Dom树;</p></li>
<li><p>第三阶段: 后端架构升级为MVC，前后端分工更清晰，前端工程化、ECMAScript规范开始崭露头角;</p></li>
<li><p>第四阶段: 后端架构进入了微服务时代，前端架构不仅升级为MVVM，ES6更是成为目前事实上的标准;</p></li>
</ul>
<p>在这里，我不想过于神化MVVM有多么的先进，JQuery为代表的MVC有多么的落后，但确实MVVM有着很多先进的特性:</p>
<ul>
<li><p>低开销</p></li>
<li><p>易维护</p></li>
<li><p>可重用</p></li>
</ul>
<h3 id="articleHeader4">为什么选择Vue.js</h3>
<p>Vue.js是MVVM设计模式中目前最火热的一个前端框架之一，除了性能表现优异之外，与类似React相比，更轻量级、更容易上手。</p>
<p>通过Vue中的“单文件组件”特性，更灵活的定义组件，不仅使代码结构更清晰，而且能与任何其他组件进行随意组合，更具复用性。<br><span class="img-wrap"><img data-src="/img/bVPpXi?w=654&amp;h=483" src="https://static.alili.tech/img/bVPpXi?w=654&amp;h=483" alt="5ae4b10becac44b0.png" title="5ae4b10becac44b0.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">Webpack是什么</h3>
<p>Webpack提供了一整套前端工程自动化的解决方案</p>
<h3 id="articleHeader6">peewee是什么</h3>
<p>有了高性能的Sanic作为基石，或许还不够，最能成为后端性能瓶颈的更多的是在于数据库，因此挑选一个合适的ORM变的极为重要，目前python比较主流的ORM是Django-ORM、SQLAlchemy等，但为了配合Sanic这种性能卓越的框架，我更倾向于peewee，更轻量级、方便二次封装，更友好的支持异步。</p>
<h2 id="articleHeader7">Demo</h2>
<p>一个简单的“上海人员信息查询系统”作为例子<br><span class="img-wrap"><img data-src="/img/bVPpX0?w=640&amp;h=358" src="https://static.alili.tech/img/bVPpX0?w=640&amp;h=358" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">项目结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" |
 |—— tests                            // 单元测试
 |
 |—— sanic_crudvue                    // 主项目
 |      |
 |      |—— config                    // 后端基本配置
 |      |
 |      |—— crud                      // 后端APP 
 |      |
 |      |—— frontend          
 |      |       |__ build             // webpack配置文件
 |      |       |__ dist              // 编译后的目标目录
 |      |       |__ src               // 前端源代码
 |      |       |    |   
 |      |       |    |__ components   // 本项目各种各样的核心组件 
 |      |       |    |
 |      |       |    |__ App.vue      // 主页
 |      |       |    |
 |      |       |    |__ eventBus.js  // 中央消息处理器，用于‘非父子组件’通信，下一个版本将会使用vuex
 |      |       |    |
 |      |       |    |__ main.js      // webpack入口
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code> |<span class="hljs-string">
 </span>|<span class="hljs-string">—— tests                            // 单元测试
 </span>|
 |<span class="hljs-string">—— sanic_crudvue                    // 主项目
 </span>|<span class="hljs-string">      </span>|
 |<span class="hljs-string">      </span>|<span class="hljs-string">—— config                    // 后端基本配置
 </span>|<span class="hljs-string">      </span>|
 |<span class="hljs-string">      </span>|<span class="hljs-string">—— crud                      // 后端APP 
 </span>|<span class="hljs-string">      </span>|
 |<span class="hljs-string">      </span>|<span class="hljs-string">—— frontend          
 </span>|<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">__ build             // webpack配置文件
 </span>|<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">__ dist              // 编译后的目标目录
 </span>|<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">__ src               // 前端源代码
 </span>|<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">    </span>|<span class="hljs-string">   
 </span>|<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">    </span>|<span class="hljs-string">__ components   // 本项目各种各样的核心组件 
 </span>|<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">    </span>|
 |<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">    </span>|<span class="hljs-string">__ App.vue      // 主页
 </span>|<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">    </span>|
 |<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">    </span>|<span class="hljs-string">__ eventBus.js  // 中央消息处理器，用于‘非父子组件’通信，下一个版本将会使用vuex
 </span>|<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">    </span>|
 |<span class="hljs-string">      </span>|<span class="hljs-string">       </span>|<span class="hljs-string">    </span>|<span class="hljs-string">__ main.js      // webpack入口
</span></code></pre>
<h3 id="articleHeader9">具备的功能(v0.1)</h3>
<ul>
<li>
<p>Sanic (后端)</p>
<ul>
<li><p>如何开启一个基于Sanic的工程项目，并通过蓝本来组织基本的MVC模式</p></li>
<li><p>通过在Sanic中建立基于RestFul-API并实现一个基本的CRUD逻辑</p></li>
<li><p>处理CORS(跨域资源共享)以及解决在Sanic中“pre-flight”请求问题</p></li>
<li><p>简单的在peewee上进行二次封装ORM</p></li>
<li><p>演示在Sanic中进行单元测试</p></li>
<li><p>增加api接口文档</p></li>
<li><p>通过peewee和Sanic来实现RestFul-API的分页</p></li>
</ul>
</li>
<li>
<p>VueJS &amp; webpack (前端)</p>
<ul>
<li><p>遵循ECMAScript 6 规范</p></li>
<li><p>如何在vue中使用‘单文件组件’进行开发编码</p></li>
<li><p>演示‘非父子组件’如何进行简单的通信以及‘父子组件’之间如何传递数据</p></li>
<li><p>如何和后端进行数据交互</p></li>
<li><p>如何在vue中优雅的引入第三方JS库</p></li>
<li><p>格式化时间</p></li>
<li><p>分页实现</p></li>
<li>
<p>可复用组件</p>
<ul>
<li><p>DbHeader.vue</p></li>
<li><p>DbFooter.vue  (sticky footer)</p></li>
<li><p>DbFilterinput.vue</p></li>
<li><p>DbModal.vue</p></li>
<li><p>DbSidebar.vue</p></li>
<li><p>DbTable.vue</p></li>
</ul>
</li>
</ul>
<blockquote><blockquote><p>得益于类似vue、react等MVVM模式，本项目的任何组件，只要您觉得合适，都可以复用在您的任何项目中，避免重复造轮子。</p></blockquote></blockquote>
<ul><li><p>如何通过webpack2配置来自动化构建前端环境(包括如何配置vue2、处理静态文件,构建不同环境等等)</p></li></ul>
</li>
</ul>
<h3 id="articleHeader10">本项目主要技术栈</h3>
<ul>
<li><p>python 3</p></li>
<li><p>sqlite (not recommend, only convenience example)</p></li>
<li><p>vueJS 2.x</p></li>
<li><p>webpack 2.x</p></li>
<li><p>element ui</p></li>
<li><p>axios</p></li>
</ul>
<h3 id="articleHeader11">准备工作</h3>
<ul>
<li><p>请必须安装 Python 3.5， 3.6 或以后更高的版本</p></li>
<li><p>安装 nodejs / npm</p></li>
<li>
<p>克隆仓库</p>
<p>git clone <a href="https://github.com/boylegu/SanicCRUD-vue.git" rel="nofollow noreferrer" target="_blank">https://github.com/boylegu/Sa...</a></p>
<p>cd SanicCRUD-vue</p>
</li>
</ul>
<h3 id="articleHeader12">安装</h3>
<ul>
<li>
<p>构建后端环境</p>
<p>cd SanicCRUD-vue</p>
<p>make install</p>
</li>
<li>
<p>构建前端环境</p>
<p>cd sanic_crudvue/frontend</p>
<p>npm install</p>
</li>
</ul>
<h3 id="articleHeader13">使用说明</h3>
<ul>
<li>
<p>运行后端服务</p>
<p>make dev</p>
</li>
<li>
<p>运行前端服务</p>
<p>cd sanic_crudvue/frontend</p>
<p>npm run dev</p>
</li>
<li>
<p>运行单元测试</p>
<p>cd SanicCRUD-vue</p>
<p>make test</p>
</li>
</ul>
<blockquote><p>你也可以在生产环境中运行<code>cd sanic_crudvue/frontend;npm run build</code>进行编译并配合Nginx</p></blockquote>
<h2 id="articleHeader14">未来计划</h2>
<p>本项目可以作为工作参考、学习或者教学演示，之后将陆续以版本的形式，即每个版本都会新增不同的功能演示项，不定期进行发布更新，有以下功能已经在计划之中：</p>
<ol>
<li><p>用户认证</p></li>
<li><p>引入更高级的vuex组件通信机制</p></li>
<li><p>演示vue-route的使用</p></li>
<li><p>加入docker部署环境</p></li>
<li><p>新增针对yarn的支持<br>... ...</p></li>
</ol>
<h2 id="articleHeader15">项目地址：<a href="https://github.com/boylegu/SanicCRUD-vue" rel="nofollow noreferrer" target="_blank">https://github.com/boylegu/Sa...</a>
</h2>
<h2 id="articleHeader16">My Final Thoughts</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
                     ▄▄▄▄▄
            ▀▀▀██████▄▄▄       _______________
          ▄▄▄▄▄  █████████▄  /                 \
         ▀▀▀▀█████▌ ▀▐▄ ▀▐█ | Gotta go fast!   |
       ▀▀█████▄▄ ▀██████▄██ | _________________/
       ▀▄▄▄▄▄  ▀▀█▄▀█════█▀ |/
            ▀▀▀▄  ▀▀███ ▀       ▄▄
         ▄███▀▀██▄████████▄ ▄▀▀▀▀▀▀█▌   ______________________________ 
       ██▀▄▄▄██▀▄███▀ ▀▀████      ▄██  █                              \\ 
    ▄▀▀▀▄██▄▀▀▌████▒▒▒▒▒▒███     ▌▄▄▀▀▀▀█_____________________________ //
    ▌    ▐▀████▐███▒▒▒▒▒▐██▌
    ▀▄▄▄▄▀   ▀▀████▒▒▒▒▄██▀
              ▀▀█████████▀
            ▄▄██▀██████▀█
          ▄██▀     ▀▀▀  █
         ▄█             ▐▌
     ▄▄▄▄█▌              ▀█▄▄▄▄▀▀▄
    ▌     ▐                ▀▀▄▄▄▀
     ▀▀▄▄▀     ██   
 \  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ▀ 
 \- ▌          SanicCRUD-vue              ▀ ▀      
  - ▌                            (o)          ▀ 
 /- ▌            Go Go Go !               ▀ ▀           
 /  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ▀       
               ██
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>
                     ▄▄▄▄▄
            ▀▀▀██████▄▄▄       <span class="hljs-variable">_______________</span>
          ▄▄▄▄▄  █████████▄  /                 \
         ▀▀▀▀█████▌ ▀▐▄ ▀▐█ | Gotta go fast!   |
       ▀▀█████▄▄ ▀██████▄██ | <span class="hljs-variable">_________________</span>/
       ▀▄▄▄▄▄  ▀▀█▄▀█════█▀ |/
            ▀▀▀▄  ▀▀███ ▀       ▄▄
         ▄███▀▀██▄████████▄ ▄▀▀▀▀▀▀█▌   <span class="hljs-variable">______________________________</span> 
       ██▀▄▄▄██▀▄███▀ ▀▀████      ▄██  █                              \\ 
    ▄▀▀▀▄██▄▀▀▌████▒▒▒▒▒▒███     ▌▄▄▀▀▀▀█<span class="hljs-variable">_____________________________</span> <span class="hljs-comment">//</span>
    ▌    ▐▀████▐███▒▒▒▒▒▐██▌
    ▀▄▄▄▄▀   ▀▀████▒▒▒▒▄██▀
              ▀▀█████████▀
            ▄▄██▀██████▀█
          ▄██▀     ▀▀▀  █
         ▄█             ▐▌
     ▄▄▄▄█▌              ▀█▄▄▄▄▀▀▄
    ▌     ▐                ▀▀▄▄▄▀
     ▀▀▄▄▀     ██   
 \  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ▀ 
 \- ▌          SanicCRUD-vue              ▀ ▀      
  - ▌                            (o)          ▀ 
 /- ▌            Go Go Go !               ▀ ▀           
 /  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ▀       
               ██
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Sanic ＋ 前端MVVM 一种新一代Python高性能全栈开发实践

## 原文链接
[https://segmentfault.com/a/1190000009832284](https://segmentfault.com/a/1190000009832284)

