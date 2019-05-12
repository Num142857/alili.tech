---
title: 'SpringBoot-vue 基于Java的微服务全栈快速开发实践' 
date: 2019-01-08 2:30:11
hidden: true
slug: sjq42hew0j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">SprintBoot-Vue</h2>
<p>SpringBoot ＋ 前端MVVM 基于Java的微服务全栈快速开发实践</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010167913" src="https://static.alili.tech/img/remote/1460000010167913" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">背景</h2>
<p>如今Web开发领域，当有人提到Java时，总会让人觉得臃肿、古老而过时且开发效率没有某些动态语言高效，甚至在此之前还有人高喊“Java 已死！”，但是事实真是如此吗？其实如果你一直关注着Java，那你的感悟会更深，尽管它有很多的缺点和啰嗦，但不可否认，Java依然是工业界中最优秀的语言，而且它一直保持着与时俱进。本项目将使用SpringBoot + Vue2 ＋ Webpack2 配合最简单CRUD的逻辑来展示一个基于Java的微服务全栈快速开发实践的Demo。</p>
<p>在某些时候，其开发效率已经并不比某些动态语言低。</p>
<h2 id="articleHeader2">为什么是SpringBoot</h2>
<p>首先先来简单的介绍一下Spring，它是目前Java生态中最广为人知、流行的企业级Web框架。不像其他一些框架仅聚焦在某个领域，Spring框架通过其容器化组件式管理及开发，可提供或定制各式各样的功能来满足企业化需求。</p>
<p>那么相较于Spring，Spring Boot的目标是更加容易的创建Spring应用、建立自动化、最少人为干预的生产级配置，真正意义做到开箱即用，并且对于新用户及Spring平台的用户极易上手，快速开发。</p>
<p>下图主要展示了Spring Boot在Spring庞大的生态圈中的层级关系</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010167914" src="https://static.alili.tech/img/remote/1460000010167914" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>SpringBoot的目标主要：</p>
<ul>
<li><p>为所有Spring开发提供一个从根本上更快，且随处可得的入门体验。</p></li>
<li><p>开箱即用，但通过不采用默认设置可以快速摆脱这种方式。</p></li>
<li><p>提供一系列大型项目常用的非功能性特征，比如：内嵌服务器，安全，指标，健康检测，外部化配置。</p></li>
</ul>
<p><strong>绝对没有代码生成，也不需要XML配置。</strong></p>
<p>下面展示的是本项目的SpringBoot相关代码片段，你觉得简单么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@RestController
@RequestMapping(&quot;/api/persons&quot;)
public class MainController {

    @RequestMapping(
            value = &quot;/detail/{id}&quot;, 
            method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    public ResponseEntity<Persons> getUserDetail(@PathVariable Long id) {

        /*
        *    @api {GET} /api/persons/detail/:id  details info
        *    @apiName GetPersonDetails
        *    @apiGroup Info Manage
        *    @apiVersion 1.0.0
        *
        *    @apiExample {httpie} Example usage:
        *
        *        http GET http://127.0.0.1:8000/api/persons/detail/1
        *
        *    @apiSuccess {String} email
        *    @apiSuccess {String} id
        *    @apiSuccess {String} phone
        *    @apiSuccess {String} sex
        *    @apiSuccess {String} username
        *    @apiSuccess {String} zone
        */

        Persons user = personsRepository.findById(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-meta">@RestController</span>
<span class="hljs-meta">@RequestMapping</span>(<span class="hljs-string">"/api/persons"</span>)
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MainController</span> </span>{

    <span class="hljs-meta">@RequestMapping</span>(
            value = <span class="hljs-string">"/detail/{id}"</span>, 
            method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE
            )
    <span class="hljs-function"><span class="hljs-keyword">public</span> ResponseEntity&lt;Persons&gt; <span class="hljs-title">getUserDetail</span><span class="hljs-params">(@PathVariable Long id)</span> </span>{

        <span class="hljs-comment">/*
        *    @api {GET} /api/persons/detail/:id  details info
        *    @apiName GetPersonDetails
        *    @apiGroup Info Manage
        *    @apiVersion 1.0.0
        *
        *    @apiExample {httpie} Example usage:
        *
        *        http GET http://127.0.0.1:8000/api/persons/detail/1
        *
        *    @apiSuccess {String} email
        *    @apiSuccess {String} id
        *    @apiSuccess {String} phone
        *    @apiSuccess {String} sex
        *    @apiSuccess {String} username
        *    @apiSuccess {String} zone
        */</span>

        Persons user = personsRepository.findById(id);

        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ResponseEntity&lt;&gt;(user, HttpStatus.OK);
    }

}</code></pre>
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
<p>通过Vue中的“单文件组件”特性，更灵活的定义组件，不仅使代码结构更清晰，而且能与任何其他组件进行随意组合，更具复用性。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010167915" src="https://static.alili.tech/img/remote/1460000010167915" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">Webpack是什么</h3>
<p>Webpack提供了一整套前端工程自动化的解决方案</p>
<h2 id="articleHeader6">Demo</h2>
<p>一个简单的“上海人员信息查询系统”作为例子</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010167916" src="https://static.alili.tech/img/remote/1460000010167916" alt="demo-image" title="demo-image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">具备的功能(v0.1)</h3>
<ul>
<li>
<p>Spring Boot (后端)</p>
<ul>
<li><p>通过在Spring Boot中建立基于RestFul-API并使用<code>@ RequestMapping</code>实现一个基本的CRUD逻辑</p></li>
<li><p>处理CORS(跨域资源共享)</p></li>
<li><p>在Spring Boot中进行单元测试</p></li>
<li><p>支持热加载</p></li>
<li><p>增加api接口文档</p></li>
<li><p>通过SpringBoot配合JPA来实现RestFul-API的分页</p></li>
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
<h3 id="articleHeader8">本项目主要技术栈</h3>
<ul>
<li><p>Java 1.7</p></li>
<li><p>Spring Boot 1.5.x</p></li>
<li><p>Maven</p></li>
<li><p>sqlite (not recommend, only convenience example)</p></li>
<li><p>vueJS 2.x</p></li>
<li><p>webpack 2.x</p></li>
<li><p>element ui</p></li>
<li><p>axios</p></li>
</ul>
<h3 id="articleHeader9">准备工作</h3>
<ul>
<li><p>安装JDK1.7或更新的版本</p></li>
<li><p>安装Node.js/NPM</p></li>
<li>
<p>克隆仓库</p>
<p>git clone <a href="https://github.com/boylegu/SpringBoot-vue.git" rel="nofollow noreferrer" target="_blank">https://github.com/boylegu/Sp...</a></p>
<p>cd springboot_vue</p>
</li>
</ul>
<h3 id="articleHeader10">安装</h3>
<ul><li>
<p>编译前端开发环境</p>
<p>cd springboot_vue/frontend</p>
<p>npm install</p>
</li></ul>
<h3 id="articleHeader11">使用</h3>
<ul><li>
<p>运行Spring Boot后端服务</p>
<p>cd springboot_vue/target/</p>
<p>java -jar springboot_vue-0.0.1-SNAPSHOT.jar</p>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010167917" src="https://static.alili.tech/img/remote/1460000010167917" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul><li>
<p>运行前端服务</p>
<p>cd springboot_vue/frontend</p>
<p>npm run dev</p>
</li></ul>
<blockquote><p>你也可以在生产环境中运行<code>cd springboot_vue/frontend;npm run build</code>进行编译并配合Nginx</p></blockquote>
<h2 id="articleHeader12">未来计划</h2>
<p>本项目可以作为工作参考、学习或者教学演示，之后将陆续以版本的形式，即每个版本都会新增不同的功能演示项，不定期进行发布更新，有以下功能已经在计划之中：</p>
<ol>
<li><p>用户认证</p></li>
<li><p>引入更高级的vuex组件通信机制</p></li>
<li><p>演示vue-route的使用</p></li>
<li><p>加入docker部署环境</p></li>
<li><p>新增针对yarn的支持<br>... ...</p></li>
</ol>
<h2 id="articleHeader13">本项目地址：<a href="https://github.com/boylegu/SpringBoot-vue" rel="nofollow noreferrer" target="_blank">https://github.com/boylegu/Sp...</a>
</h2>
<h2 id="articleHeader14">相关项目</h2>
<ul><li><p><span class="img-wrap"><img data-src="/img/remote/1460000010167918" src="https://static.alili.tech/img/remote/1460000010167918" alt="Sanic-Vue for Python" title="Sanic-Vue for Python" style="cursor: pointer;"></span></p></li></ul>
<h2 id="articleHeader15">My Final Thoughts</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      .   ____          _
     /\\ / ___'_ __ _ _(_)_ __  __ _
    ( ( )\___ | '_ | '_| | '_ \/ _` |
     \\/  ___)| |_)| | | | | || (_| |
      '  |____| .__|_| |_|_| |_\__, |
\  ===========|_|==============|___/== ▀
\- ▌          SpringBoot-vue             ▀
 - ▌                            (o)        ▀
/- ▌            Go Go Go !               ▀
/  =================================== ▀
                    ██

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>      .   ____          _
     /\\ / ___'_ __ _ _(_)_ __  __ _
    ( ( )\___ |<span class="hljs-string"> '_ </span>|<span class="hljs-string"> '_</span>|<span class="hljs-string"> </span>|<span class="hljs-string"> '_ \/ _` </span>|
     \\/  ___)|<span class="hljs-string"> </span>|<span class="hljs-string">_)</span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>||<span class="hljs-string"> (_</span>|<span class="hljs-string"> </span>|
      '  |<span class="hljs-string">____</span>|<span class="hljs-string"> .__</span>|<span class="hljs-string">_</span>|<span class="hljs-string"> </span>|<span class="hljs-string">_</span>|<span class="hljs-string">_</span>|<span class="hljs-string"> </span>|<span class="hljs-string">_\__, </span>|
\  ===========|<span class="hljs-string">_</span>|<span class="hljs-string">==============</span>|<span class="hljs-string">___/== ▀
\- ▌          SpringBoot-vue             ▀
 - ▌                            (o)        ▀
/- ▌            Go Go Go !               ▀
/  =================================== ▀
                    ██

</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SpringBoot-vue 基于Java的微服务全栈快速开发实践

## 原文链接
[https://segmentfault.com/a/1190000010167910](https://segmentfault.com/a/1190000010167910)

