---
title: 'Ember.js如何与后端服务交互？adapter、store、ember data关系揭秘' 
date: 2019-02-06 2:30:08
hidden: true
slug: i3jfsn7q3un
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>文章来源：<a href="http://blog.ddlisting.com/2016/07/23/user-adapter-emberdata-databse-in-ember-project/" rel="nofollow noreferrer" target="_blank">Ember Teach</a></strong></p>
<p>本项目讲解如何使用adapter、EmberData以及怎么连接到本地数据库。</p>
<h2 id="articleHeader0">项目简介</h2>
<h3 id="articleHeader1">主要内容</h3>
<ul>
<li><p>适配器使用</p></li>
<li><p>如何持久化数据到本地数据库</p></li>
<li><p>简单的后端服务</p></li>
</ul>
<p>最近经常有初学的开发者请教有关<code>Adapter</code>或者<code>Ember Data</code>的问题。官方教程中讲到这两个内容的是<a href="https://guides.emberjs.com/v2.6.0/models/" rel="nofollow noreferrer" target="_blank">Model</a>这一章节。本文中介绍到的内容大部分是由这一章来的，如果有不妥请看原文或者给我留言。</p>
<p>注意：<em>本文是基于v2.6.0讲解。</em></p>
<h3 id="articleHeader2">软件需求</h3>
<ol>
<li><p><a href="http://www.mysql.com/" rel="nofollow noreferrer" target="_blank">MySQL</a></p></li>
<li><p><a href="http:nodejs.org">nodejs,express</a></p></li>
<li><p><a href="https://github.com/expressjs/body-parser" rel="nofollow noreferrer" target="_blank">body-parser</a></p></li>
<li><p><a href="https://github.com/mysqljs/mysql" rel="nofollow noreferrer" target="_blank">mysql-node</a></p></li>
</ol>
<h3 id="articleHeader3">Ember项目常规运行软件</h3>
<ul>
<li><p><a href="http://git-scm.com/" rel="nofollow noreferrer" target="_blank">Git</a></p></li>
<li><p><a href="http://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a> (with NPM)</p></li>
<li><p><a href="http://bower.io/" rel="nofollow noreferrer" target="_blank">Bower</a></p></li>
<li><p><a href="http://ember-cli.com/" rel="nofollow noreferrer" target="_blank">Ember CLI</a></p></li>
<li><p><a href="http://phantomjs.org/" rel="nofollow noreferrer" target="_blank">PhantomJS</a></p></li>
</ul>
<p>用到的软件、插件都是有关后端服务的，<code>mysql-node</code>用于连接、操作MySQL数据库。后端服务是用node写的所以也用node项目的插件连接、操作数据库了，有关如何使用node操作MySQL的信息请看这篇文章[nodejs连接MySQL，做简单的CRUD<br>](<a href="http://blog.ddlisting.com/2015/11/24/nodejs-dowith-database/)" rel="nofollow noreferrer" target="_blank">http://blog.ddlisting.com/201...</a>。如果你的后端是其他语言写只需要保证你后端返回的数据格式或者我的后端返回的数据格式一致就行了。目前打算本项目使用2种数据交互方式：一种是jsonapi，一种是restapi。</p>
<ul>
<li><p><a href="http://jsonapi.org/" rel="nofollow noreferrer" target="_blank">jsonapi</a></p></li>
<li><p><a href="http://www.restapitutorial.com/" rel="nofollow noreferrer" target="_blank">rest api</a></p></li>
</ul>
<h3 id="articleHeader4">项目搭建</h3>
<p>项目的搭建就不再费口舌了，<a href="http://blog.ddlisting.com/2016/07/20/make-emberjs-dev-env/" rel="nofollow noreferrer" target="_blank">Ember Teach</a>已经有很多博文介绍过了。</p>
<h3 id="articleHeader5">运行项目</h3>
<p>如果你想运行本项目请按照下面的步骤操作：</p>
<h4>安装</h4>
<ul>
<li><p>下载代码到本地 <code>git clone https://github.com/ubuntuvim/emberData-adapter-database</code></p></li>
<li><p>进入项目目录 <code>cd emberData-adapter-database</code></p></li>
<li><p>安装npm依赖包 <code>npm install</code></p></li>
<li><p>安装bower依赖包 <code>bower install</code></p></li>
</ul>
<h4>运行</h4>
<ul>
<li><p>在项目目录下执行命令 <code>ember server</code> 运行项目。</p></li>
<li><p>待项目启动完毕，在浏览器打开<a href="http://localhost:4200" rel="nofollow noreferrer" target="_blank">http://localhost:4200</a>。</p></li>
</ul>
<h4>发布到服务器</h4>
<ul>
<li><p>执行命令编译、打包项目 <code>ember build --environment production</code></p></li>
<li><p>命令执行完毕会在<code>dist</code>目录下得到项目打包后的文件。</p></li>
<li><p>把打包后的<code>dist</code>目录下的所有文件复制到服务器应用目录下运行即可（比如tomcat服务器则放到<code>webapps</code>目录下）。</p></li>
</ul>
<h3 id="articleHeader6">项目结构</h3>
<p>简单起见我就做一个页面就行了，我希望做出的效果是使用自定义的适配器获取到本地MySQL数据库的数据并分页展示。</p>
<h4>创建文件</h4>
<p>使用<a href="http://ember-cli.com/user-guide" rel="nofollow noreferrer" target="_blank">ember-cli</a>命令创建文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember g route users
ember g model user username:string email:string
ember g adapter application" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>ember g route users
ember g model <span class="hljs-keyword">user</span> <span class="hljs-title">username</span>:<span class="hljs-keyword">string</span> email:<span class="hljs-keyword">string</span>
ember g adapter application</code></pre>
<p>目前暂时只用到这几个文件，后续可能还有其他的用到在创建。<br><code>ember g model user username:string email:string</code>的作用是创建模型的同时创建2个属性，并且属性都指定为<code>string</code>类型。</p>
<p>说了一大堆废话下面开始正题。要理解<code>adapter</code>、<code>ember data</code>、后端服务的关系我们从他们各自的概念入手。首先我们先理清楚他们之间的关系然后在动手实践。理论总是繁琐的但是也是最重要的。</p>
<p>========================= 华丽的分割线 =========================</p>
<h2 id="articleHeader7">体系结构概述</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006771466" src="https://static.alili.tech/img/remote/1460000006771466" alt="体系结构图" title="体系结构图" style="cursor: pointer;"></span></p>
<p><em>注：图片来自官方文档</em></p>
<p>注意观察上图的结构。</p>
<ol>
<li><p>APP（一般是从<code>route</code>、<code>controller</code>或者<code>component</code>发请求）请求数据。</p></li>
<li><p>请求并没有直接发送到后端服务而是先在<code>store</code>(ember data其实就是一个<code>store</code>)缓存中查找，ember之所以能实现动态更新模板数据也是因为有了<code>store</code>。</p></li>
<li><p>如果请求的数据存在在<code>store</code>中，则直接返回到<code>route</code>、<code>controller</code>或者<code>component</code>；如果在<code>store</code>中没有发现请求的数据，所以请求的数据是首次，数据还未缓存到<code>store</code>中，则请求继续往下到了<code>apdater</code>层。</p></li>
<li><p>在<code>adapter</code>中，<code>adapter</code>会根据请求的调用方法构建出对应的URL。比如在<code>route</code>、<code>controller</code>或者<code>component</code>中执行方法<code>findRecord('user', 1)</code>，此方法作用是查询id为1的user数据。适配器构建出来的URL为: <a href="http://domain/user/1" rel="nofollow noreferrer" target="_blank">http://domain/user/1</a>，然后发请求到后端。</p></li>
<li><p>适配器会对比后端接受的数据格式与ember data发送的数据格式，如果不一致需要在适配器的``方法中格式化发送的数据格式。请求经过适配器构建得到URL后发送到后端服务，后端服务根据URL请求查询数据库然后格式化数据格式返回到适配器。</p></li>
<li><p>适配器根据得到的数据和ember data所接受的数据格式匹配，如果格式不一致需要在适配器的``方法中格式化后端返回的数据。</p></li>
<li><p>经过适配器之后数据转到ember data（<code>store</code>）中，首先缓存到<code>store</code>中，然后返回到调用处（<code>route</code>、<code>controller</code>、<code>component</code>）</p></li>
<li><p>数据请求完毕</p></li>
</ol>
<p>注意：<code>findRecord('user', 1)</code>方法执行过程，请求的<code>findRecord('user', 1)</code>方法会在Ember Data内部解析为<code>find</code>方法，<code>find</code>方法会首先在<code>store</code>缓存中查数据，如果没有则会流转到<code>adapter</code>中组装URL并格式化请求数据，然后发送到后端服务。</p>
<p>从图中看到从适配器返回的数据是<a href="http://liubin.github.io/promises-book/" rel="nofollow noreferrer" target="_blank">promise</a>所以调用<code>findRecord</code>方法获取数据的时候需要<code>then()</code>。同时可见这是个移步请求，只有promises执行成功才能得到数据。也就是说如果考虑周全的话还需要在<code>findRecord</code>的时候处理promises执行失败的情况。</p>
<p>另外如果你想跳过<code>store</code>不需要这层缓存也是可以的。会可以这样做：<code>store.findRecord(type, id, { reload: true })</code>使用<code>reload</code>属性设置为<code>true</code>让每次请求都跳过<code>store</code>直接发送请求到后端，对于实时性要求高的APP则需要这样处理。</p>
<p>介绍完架构之后将追个介绍其中的每个主要的功能特性。<br>需要说明的是：<code>Models</code>, <code>records</code>, <code>adapters</code>以及<code>store</code>都是Ember Data最核心的东西，他们是包含的关系，只要使用了Ember Data才能使用<code>model</code>、<code>store</code>功能。有些初学者老是问这几个东西的关联，希望看到这里的同学不要在提这样的问题了！！=^=</p>
<p>Ember Data是Ember.js非常重要的一块，提供了几乎所有操作数据的API，详细请看<a href="http://emberjs.com/api/data/modules/ember-data.html" rel="nofollow noreferrer" target="_blank">EMBER-DATA MODULE</a>。当然，如果你不想使用Ember Data也是可以的，那么你的程序直接使用Ajax与后台交互也是可以的，或者说你使用其他类似Ember Data的插件也行。Ember Data在MVC模式中属于M层的东西，没有这层也并不影响到整个APP！</p>
<h3 id="articleHeader8">补充一下下</h3>
<p>如果你不使用Ember Data，在这里提供一个简单的方案供参考。<br>如果你想获取后端数据并显示数据到组件上（模板调用组件），你可以像下面的代码这样处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/components/list-of-drafts.js
export default Ember.Component.extend({
  willRender() {
    $.getJSON('/drafts').then(data => {
      this.set('drafts', data);
    });
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/components/list-of-drafts.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Component.extend({
  willRender() {
    $.getJSON(<span class="hljs-string">'/drafts'</span>).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'drafts'</span>, data);
    });
  }
});</code></pre>
<p>这里不同过Ember Data，自然也就没有调用Ember Data提供的方法（比如，findAll、findRecord），而是直接发Ajax请求，得到数据到设置到对象<code>drafts</code>中，然后在模板上显示数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- app/templates/components/list-of-drafts.hbs -->
<ul>
  "{{"#each drafts key=&quot;id&quot; as |draft|"}}"
    <li>"{{"draft.title"}}"</li>
  "{{"/each"}}"
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- app/templates/components/list-of-drafts.hbs --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  "{{"#each drafts key="id" as |draft|"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>"{{"draft.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  "{{"/each"}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>这样处理是没问题的，但是当数据改变的可能不能立即在模板上更新，因为这里无法使用<code>store</code>自然也就无法像计算属性那样当数据有变就立即更新模板。另一个问题是当你的请求很多的时候你需要写很多这样的方法，代码复用性也比较差。</p>
<h3 id="articleHeader9">Models</h3>
<blockquote><p>In Ember Data, each model is represented by a subclass of Model that defines the attributes, relationships, and behavior of the data that you present to the user.</p></blockquote>
<p>从使用上讲，model其实就是与后端数据表对应的实体类（借用java中的说法），通常我们的model类的定义是与后端数据表对应的，最常见的就是model属性的定义，建议属性名和数据表字段名一致并且使用驼峰式命名规范。</p>
<p>model之间还可以定义单向或者双向的一对一、一对多和多对多关系，这个与数据表之间的关系定义是相似的。比如下面的model：</p>
<h4>简单model定义</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app/models/person.js
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  firstName: attr('string'),
  birthday:  attr('date')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//app/models/person.js</span>
<span class="hljs-keyword">import</span> Model <span class="hljs-keyword">from</span> <span class="hljs-string">'ember-data/model'</span>;
<span class="hljs-keyword">import</span> attr <span class="hljs-keyword">from</span> <span class="hljs-string">'ember-data/attr'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Model.extend({
  <span class="hljs-attr">firstName</span>: attr(<span class="hljs-string">'string'</span>),
  <span class="hljs-attr">birthday</span>:  attr(<span class="hljs-string">'date'</span>)
});</code></pre>
<p>model类可以直接使用ember-cli命令创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember g model person" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">ember g model person</span></code></pre>
<p>上面代码创建了一个简单的model，并且包含了3个属性，一个是<code>string</code>类型一个是<code>date</code>类型，那么第三个属性是什么了？？是<code>id</code>，Ember会默认为每个model增加一个属性<code>id</code>，开发者不需要手动去定义这个属性，并且如果你是手动在model类中定义这个属性会报错的！！那么对应后端的服务也应该有一个person表，并且表里也有三个字段，它们是<code>firstName</code>、<code>birthday</code>以及<code>id</code>。</p>
<p>更多有关model之间关系的介绍不行本文的重点，请看<a href="http://blog.ddlisting.com/2016/04/07/modeljian-jie/" rel="nofollow noreferrer" target="_blank">第六章 模型</a>的详细介绍。</p>
<p>有了model之后程序要使用model类必须要实例化，实例化的model称为<code>records</code>。</p>
<h3 id="articleHeader10">Records</h3>
<blockquote><p>A record is an instance of a model that contains data loaded from a server. Your application can also create new records and save them back to the server. A record is uniquely identified by its model <code>type</code> and <code>ID</code>.</p></blockquote>
<p>简单讲record就是一个包含数据的model实例。说白了就是一个JSON对象（虽然这样的说法不是很正确，但是可以反映出这是一个什么样的对象结构）。</p>
<p>比如下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.get('store').findRecord('person', 1); // => { id: 1, name: 'steve-buscemi' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.get(<span class="hljs-string">'store'</span>).findRecord(<span class="hljs-string">'person'</span>, <span class="hljs-number">1</span>); <span class="hljs-comment">// =&gt; { id: 1, name: 'steve-buscemi' }</span></code></pre>
<p>执行完方法<code>findRecord</code>后返回的就是一个model实例也就是一个record。这个record包含了数据<code>{ id: 1, name: 'steve-buscemi' }</code>。</p>
<h3 id="articleHeader11">Adapter</h3>
<blockquote><p>An adapter is an object that translates requests from Ember (such as "find the user with an ID of 123") into requests to a server.</p></blockquote>
<p>适配器，顾名思义！作用就是做适配工作的，保存转换数据格式、定义交互的URL前缀、构建URL等等。在前面体系结构已经详细介绍过，不在赘述。</p>
<h3 id="articleHeader12">Caching</h3>
<p>缓存在Ember中是非常重要的，但是有一点需要注意的是不要把太多数据缓存到store中，数据量太大浏览器受不了！缓存的作用是非常明显的，前面也介绍了他的作用，特别是在请求数据的时候，如果能在缓存中获取的则立即返回到调用处，只有在缓存中查不到的数据才发请求到服务端，通常是第一次获取的数据的时候缓存没有则需要发请求到服务端。也正是有了缓存Ember才能快速把数据的变化响应到模板上。</p>
<p>到此主要核心的概念介绍完毕了，不算多，但是认真看下来还是很有益的！！</p>
<p>下面接着是如何实践了……</p>
<h2 id="articleHeader13">创建数据库</h2>
<p>本例子使用的是MySQL数据库，有关数据库的安装以及使用不在本文讲解范围，请自行学习！</p>
<h3 id="articleHeader14">建表</h3>
<p>怎么建表我也不说了，下面直接贴建表的SQL。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="sql hljs"><code class="sql"><span class="hljs-keyword">DROP</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">IF</span> <span class="hljs-keyword">EXISTS</span> <span class="hljs-string">`user`</span>;
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-string">`user`</span> (
  <span class="hljs-string">`id`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> AUTO_INCREMENT,
  <span class="hljs-string">`username`</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">100</span>) <span class="hljs-keyword">DEFAULT</span> <span class="hljs-literal">NULL</span>,
  <span class="hljs-string">`email`</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">50</span>) <span class="hljs-keyword">DEFAULT</span> <span class="hljs-literal">NULL</span>,
  PRIMARY <span class="hljs-keyword">KEY</span> (<span class="hljs-string">`id`</span>)
) <span class="hljs-keyword">ENGINE</span>=<span class="hljs-keyword">InnoDB</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-keyword">CHARSET</span>=utf8;</code></pre>
<p>创建一个名为<code>user</code>的数据表。</p>
<h2 id="articleHeader15">创建服务端</h2>
<p>如何在ember项目中创建服务端程序呢？ember提供了创建的命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember g server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ember g server</code></pre>
<p>创建完毕之后再按照开始介绍的依赖插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install mysql-node
npm install body-parser
npm install supervisor" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install mysql-node
npm install body-parser
npm install supervisor</code></pre>
<p>创建的是一个node服务端程序，运行的端口也是<code>4200</code>，不需要另外手动去启动node服务，只要ember项目运行了会自动运行起来的。</p>
<p>到此所有的原料都准备好了，下面验证一下项目是否还能正常运行。启动项目，然后在浏览器打开<a href="http://localhost:4200" rel="nofollow noreferrer" target="_blank">http://localhost:4200</a>。还能看到<strong>Welcome to Ember</strong>说明是成功的！</p>
<p>有了原料开始做菜吧！！！</p>
<h2 id="articleHeader16">编写user模块</h2>
<h3 id="articleHeader17">更改URL方式</h3>
<p>为了不使服务端和Ember请求URL冲突修改了URL的默认方式，修改<code>config/environment.js</code>的第8行代码为如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="locationType: 'hash'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">locationType: <span class="hljs-string">'hash'</span>,</code></pre>
<p><code>auto</code>改为<code>hash</code>。访问Ember项目的URL则需要注意：<a href="http://localhost:4200/users" rel="nofollow noreferrer" target="_blank">http://localhost:4200/users</a>改为<a href="http://localhost:4200/#/users" rel="nofollow noreferrer" target="_blank">http://localhost:4200/#/users</a>。增加一个<code>#</code>号。</p>
<h3 id="articleHeader18">获取数据、显示数据</h3>
<p>首先简单列出数据库数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- app/templates/users.hbs -->
<h1>用户列表</h1>

<table class=&quot;table table-striped table-hover&quot;>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        用户名
      </th>
      <th>
        邮箱
      </th>
    </tr>
  </thead>

  <tbody>
    "{{"#each model as |user|"}}"
    <tr>
      <td>
        "{{"user.id"}}"
      </td>
      <td>
        "{{"user.username"}}"
      </td>
      <td>
        "{{"user.email"}}"
      </td>
    </tr>
    "{{"/each"}}"
  </tbody>

</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- app/templates/users.hbs --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>用户列表<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"table table-striped table-hover"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        #
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        用户名
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        邮箱
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
    "{{"#each model as |user|"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
        "{{"user.id"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
        "{{"user.username"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
        "{{"user.email"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    "{{"/each"}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/routes/users.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('user');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/routes/users.js</span>
<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Route.extend({
  model() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.store.findAll(<span class="hljs-string">'user'</span>);
  }
});</code></pre>
<p>目前项目还没连接到任何数据库，也没有使用自定义的适配器，如果直接执行<a href="http://localhost:4200/#/users" rel="nofollow noreferrer" target="_blank">http://localhost:4200/#/users</a>可以在控制台看到是会报错的。那么下一步该如何处理呢？？</p>
<h2 id="articleHeader19">加入适配器</h2>
<h3 id="articleHeader20">使用<code>RESTAdapter</code>
</h3>
<p>先从适配器下手！在前面已经创建好了适配器，如果是2.0之后的项目默认会创建<code>JSONAPIAdapter</code>这个适配器所接收、发送的数据格式都必须符合jsonapi规范，否则会报错，无法正常完成数据的交互。不过为了简便我们先不使用这个适配器，改用另一个简单的适配器<code>RESTAdapter</code>，这个适配器不是需要遵循jsonapi规范，只要自己约定好前后端的数据格式即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/adapters/application.js

// import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/adapters/application.js</span>

<span class="hljs-comment">// import JSONAPIAdapter from 'ember-data/adapters/json-api';</span>
<span class="hljs-keyword">import</span> DS <span class="hljs-keyword">from</span> <span class="hljs-string">'ember-data'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> DS.RESTAdapter.extend({

});</code></pre>
<p>手动修改好之后的适配器还不能起作用，这个适配器并没有连接到任何的后端服务，如果你想连接到你的服务上需要使用属性<code>host</code>指定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/adapters/application.js

// import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://localhost:4200'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/adapters/application.js</span>

<span class="hljs-comment">// import JSONAPIAdapter from 'ember-data/adapters/json-api';</span>
<span class="hljs-keyword">import</span> DS <span class="hljs-keyword">from</span> <span class="hljs-string">'ember-data'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> DS.RESTAdapter.extend({
  <span class="hljs-attr">host</span>: <span class="hljs-string">'http://localhost:4200'</span>
});</code></pre>
<p>等待项目重启完毕，仍然是访问<a href="http://localhost:4200/#/users" rel="nofollow noreferrer" target="_blank">http://localhost:4200/#/user</a>，在控制台仍然看到前面的错误，截图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150893" src="https://static.alili.tech/img/remote/1460000006150893" alt="无后端服务" title="无后端服务" style="cursor: pointer;"></span></p>
<p>为何还是错误呢？如果能看到错误说明你的程序是正确，到目前为止还没提供任何的后端服务，虽然前面使用<code>ember g server</code>创建了node后端服务，但是并没有针对每个请求做处理。当你访问路由<code>user</code>在进入回到<code>model</code>时候会发送请求获取所有模型<code>user</code>数据，请求首选转到Ember Data（store)，但是在store中并没有，然后请求继续转到适配器<code>RESTAdapter</code>，适配器会构建URL得到<code>GET</code>请求<code>http://localhost:4200/users</code>，至于是如何构建URL的请看<a href="https://github.com/emberjs/data/blob/master/addon/-private/adapters/build-url-mixin.js" rel="nofollow noreferrer" target="_blank">build url method</a>。这个请求可以在报错的信息中看到。但是为何会报错呢？很正常，因为我的后端服务并没响应这个请求。下面针对这个请求做处理。</p>
<p>修改<code>server/index.js</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*jshint node:true*/

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  // 对象转json
  //  const serialise = require('object-tojson')
  const bodyParser = require('body-parser');

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

  app.use(bodyParser.urlencoded({ extended: true }));


  // 处理请求 http://localhost:4200/user
  app.get('/users', function(req, res) {
    // 返回三个对象
    res.status(200).send({
        users: [
          {
            id: 1,
            username: 'ubuntuvim',
            email: '123@qq.com'
          },
          {
            id: 2,
            username: 'ddlisting.com',
            email: '3333@qq.com'
          },
          {
            id: 3,
            username: 'www.ddlising.com',
            email: '1527254027@qq.com'
          }
        ]
    });
  });

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*jshint node:true*/</span>

<span class="hljs-comment">// To use it create some files under `mocks/`</span>
<span class="hljs-comment">// e.g. `server/mocks/ember-hamsters.js`</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// module.exports = function(app) {</span>
<span class="hljs-comment">//   app.get('/ember-hamsters', function(req, res) {</span>
<span class="hljs-comment">//     res.send('hello');</span>
<span class="hljs-comment">//   });</span>
<span class="hljs-comment">// };</span>

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{
  <span class="hljs-keyword">var</span> globSync   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>).sync;
  <span class="hljs-keyword">var</span> mocks      = globSync(<span class="hljs-string">'./mocks/**/*.js'</span>, { <span class="hljs-attr">cwd</span>: __dirname }).map(<span class="hljs-built_in">require</span>);
  <span class="hljs-keyword">var</span> proxies    = globSync(<span class="hljs-string">'./proxies/**/*.js'</span>, { <span class="hljs-attr">cwd</span>: __dirname }).map(<span class="hljs-built_in">require</span>);

  <span class="hljs-comment">// Log proxy requests</span>
  <span class="hljs-keyword">var</span> morgan  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'morgan'</span>);
  app.use(morgan(<span class="hljs-string">'dev'</span>));

  <span class="hljs-comment">// 对象转json</span>
  <span class="hljs-comment">//  const serialise = require('object-tojson')</span>
  <span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>);

  mocks.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">route</span>) </span>{ route(app); });
  proxies.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">route</span>) </span>{ route(app); });

  app.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">true</span> }));


  <span class="hljs-comment">// 处理请求 http://localhost:4200/user</span>
  app.get(<span class="hljs-string">'/users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-comment">// 返回三个对象</span>
    res.status(<span class="hljs-number">200</span>).send({
        <span class="hljs-attr">users</span>: [
          {
            <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'ubuntuvim'</span>,
            <span class="hljs-attr">email</span>: <span class="hljs-string">'123@qq.com'</span>
          },
          {
            <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'ddlisting.com'</span>,
            <span class="hljs-attr">email</span>: <span class="hljs-string">'3333@qq.com'</span>
          },
          {
            <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'www.ddlising.com'</span>,
            <span class="hljs-attr">email</span>: <span class="hljs-string">'1527254027@qq.com'</span>
          }
        ]
    });
  });

};</code></pre>
<p>在服务端增加了一个node请求处理，拦截<code>/users</code>这个请求。对于express不是本文的重点，请自行学习，网址<a href="http://expressjs.com/zh-cn/" rel="nofollow noreferrer" target="_blank">expressjs.com</a>。如果你使用的是其他语言的服务端程序，那么你只需要返回的json格式为：<code>{"modelName":[{"id":1,"属性名":"属性值","属性名2":"属性值2"},{"id":2,"属性名3":"属性值3","属性名4":"属性4"}]}</code>，只需要格式正确适配器就能正确解析返回的数据。</p>
<p>另外再多介绍一个属性<code>namespace</code>，这个属性是用于定义URL前缀的，比如下面的适配器定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/adapters/application.js

// import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',
  host: 'http://localhost:4200'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// app/adapters/application.js</span>

<span class="hljs-comment">// import JSONAPIAdapter from 'ember-data/adapters/json-api';</span>
<span class="hljs-keyword">import</span> DS <span class="hljs-keyword">from</span> <span class="hljs-string">'ember-data'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> DS.RESTAdapter.extend({
  <span class="hljs-attr">namespace</span>: <span class="hljs-string">'api/v1'</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-string">'http://localhost:4200'</span>
});</code></pre>
<p>如果是这样定义那么后端处理的URL也需要做相应的处理，需要在拦截的请求上加前缀，比如下面的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 处理请求 http://localhost:4200/api/v1/user
  app.get('/api/v1/users', function(req, res) {
    // 返回三个对象
    res.status(200).send({
        users: [
          {
            id: 1,
            username: 'ubuntuvim',
            email: '123@qq.com'
          },
          {
            id: 2,
            username: 'ddlisting.com',
            email: '3333@qq.com'
          },
          {
            id: 3,
            username: 'www.ddlising.com',
            email: '1527254027@qq.com'
          }
        ]
    });
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 处理请求 http://localhost:4200/api/v1/user</span>
  app.get(<span class="hljs-string">'/api/v1/users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-comment">// 返回三个对象</span>
    res.status(<span class="hljs-number">200</span>).send({
        <span class="hljs-attr">users</span>: [
          {
            <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'ubuntuvim'</span>,
            <span class="hljs-attr">email</span>: <span class="hljs-string">'123@qq.com'</span>
          },
          {
            <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'ddlisting.com'</span>,
            <span class="hljs-attr">email</span>: <span class="hljs-string">'3333@qq.com'</span>
          },
          {
            <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
            <span class="hljs-attr">username</span>: <span class="hljs-string">'www.ddlising.com'</span>,
            <span class="hljs-attr">email</span>: <span class="hljs-string">'1527254027@qq.com'</span>
          }
        ]
    });
  });</code></pre>
<p>之前面唯一不同的就是请求的URL不一样了，原来是<a href="http://localhost:4200/users" rel="nofollow noreferrer" target="_blank">http://localhost:4200/users</a>改为<a href="http://localhost:4200/api/v1/users" rel="nofollow noreferrer" target="_blank">http://localhost:4200/api/v1/users</a>。那么这样做的好处是什么呢？当你的后端的API更新的时候这个设置是非常有用的，只需要设置命名前缀就能适应不用版本的API。</p>
<p>项目重启之后，再次进入到路由<code>users</code>可以看到返回的3条数据。如下截图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150895" src="https://static.alili.tech/img/remote/1460000006150895" alt="结果列表" title="结果列表" style="cursor: pointer;"></span></p>
<p>到此，我想你应该知道个大概了吧！！更多有关适配器的介绍请看下面的2篇博文：</p>
<ol>
<li><p><a href="http://blog.ddlisting.com/2016/06/06/adapter-serializer/" rel="nofollow noreferrer" target="_blank">adapter与serializer使用示例一</a></p></li>
<li><p><a href="http://blog.ddlisting.com/2016/06/07/adapter-serializershi2/" rel="nofollow noreferrer" target="_blank">adapter与serializer使用示例二</a></p></li>
</ol>
<h3 id="articleHeader21">使用<code>JSONAPIAdapter</code>
</h3>
<p>使用<code>JSONAPIAdapter</code>适配器和使用<code>RESTAdapter</code>适配器有何不同呢？我觉得最重要的一点是：数据规范。<code>JSONAPIAdapter</code>适配器要求交互的数据格式必须遵循<a href="http://jsonapi.org" rel="nofollow noreferrer" target="_blank">jsonapi</a>规范，否则是不能完成数据交互的。要求高了相应的你的处理代码也相应的要复杂。下面我们改用<code>JSONAPIAdapter</code>处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/adapters/application.js

import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DS from 'ember-data';

// export default DS.RESTAdapter.extend({
export default JSONAPIAdapter.extend({
  namespace: 'api/v1',
  host: 'http://localhost:4200'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/adapters/application.js</span>

<span class="hljs-keyword">import</span> JSONAPIAdapter <span class="hljs-keyword">from</span> <span class="hljs-string">'ember-data/adapters/json-api'</span>;
<span class="hljs-keyword">import</span> DS <span class="hljs-keyword">from</span> <span class="hljs-string">'ember-data'</span>;

<span class="hljs-comment">// export default DS.RESTAdapter.extend({</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> JSONAPIAdapter.extend({
  <span class="hljs-attr">namespace</span>: <span class="hljs-string">'api/v1'</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-string">'http://localhost:4200'</span>
});</code></pre>
<p>修改适配器为<code>JSONAPIAdapter</code>。如果你不修改后端的服务那么控制台可以看到报错信息。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150897" src="https://static.alili.tech/img/remote/1460000006150897" alt="JSONAPIAdapter报错信息" title="JSONAPIAdapter报错信息" style="cursor: pointer;"></span></p>
<p>从截图当中可以清楚地看到报错出来的错误，<code>must return a valid JSON API document</code>必须是一个有效jsonapi文档。要修复好这个错误也很简单，只需要滚吧后端服务返回的数据格式改成jsonapi的就行了。请看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 处理请求 http://localhost:4200/user
  app.get('/api/v1/users', function(req, res) {
    // 返回三个对象
    // res.status(200).send({
    //     users: [
    //       {
    //         id: 1,
    //         username: 'ubuntuvim',
    //         email: '123@qq.com'
    //       },
    //       {
    //         id: 2,
    //         username: 'ddlisting.com',
    //         email: '3333@qq.com'
    //       },
    //       {
    //         id: 3,
    //         username: 'www.ddlising.com',
    //         email: '1527254027@qq.com'
    //       }
    //     ]
    // });
  
    // 构建jsonapi对象
    var input = {
        data: [
            {
                id: '1',
                type: 'user',  //对应前端程序中模型的名字
                attributes: {   // 模型中的属性键值对
                    username: 'ubuntuvim', property: true,
                    email: '123@qq.com', property: true
                }
            },
            {
                id: '2',
                type: 'user',  //对应前端程序中模型的名字
                attributes: {   // 模型中的属性键值对
                    username: 'ddlisting.com', property: true,
                    email: '3333@qq.com', property: true
                }
            },
            {
                id: '3',
                type: 'user',  //对应前端程序中模型的名字
                attributes: {   // 模型中的属性键值对
                    username: 'www.ddlising.com', property: true,
                    email: '1527254027@qq.com', property: true
                }
            }
        ]
    };

    res.status(200).send(JSON.stringify(input));
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 处理请求 http://localhost:4200/user</span>
  app.get(<span class="hljs-string">'/api/v1/users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-comment">// 返回三个对象</span>
    <span class="hljs-comment">// res.status(200).send({</span>
    <span class="hljs-comment">//     users: [</span>
    <span class="hljs-comment">//       {</span>
    <span class="hljs-comment">//         id: 1,</span>
    <span class="hljs-comment">//         username: 'ubuntuvim',</span>
    <span class="hljs-comment">//         email: '123@qq.com'</span>
    <span class="hljs-comment">//       },</span>
    <span class="hljs-comment">//       {</span>
    <span class="hljs-comment">//         id: 2,</span>
    <span class="hljs-comment">//         username: 'ddlisting.com',</span>
    <span class="hljs-comment">//         email: '3333@qq.com'</span>
    <span class="hljs-comment">//       },</span>
    <span class="hljs-comment">//       {</span>
    <span class="hljs-comment">//         id: 3,</span>
    <span class="hljs-comment">//         username: 'www.ddlising.com',</span>
    <span class="hljs-comment">//         email: '1527254027@qq.com'</span>
    <span class="hljs-comment">//       }</span>
    <span class="hljs-comment">//     ]</span>
    <span class="hljs-comment">// });</span>
  
    <span class="hljs-comment">// 构建jsonapi对象</span>
    <span class="hljs-keyword">var</span> input = {
        <span class="hljs-attr">data</span>: [
            {
                <span class="hljs-attr">id</span>: <span class="hljs-string">'1'</span>,
                <span class="hljs-attr">type</span>: <span class="hljs-string">'user'</span>,  <span class="hljs-comment">//对应前端程序中模型的名字</span>
                attributes: {   <span class="hljs-comment">// 模型中的属性键值对</span>
                    username: <span class="hljs-string">'ubuntuvim'</span>, <span class="hljs-attr">property</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">email</span>: <span class="hljs-string">'123@qq.com'</span>, <span class="hljs-attr">property</span>: <span class="hljs-literal">true</span>
                }
            },
            {
                <span class="hljs-attr">id</span>: <span class="hljs-string">'2'</span>,
                <span class="hljs-attr">type</span>: <span class="hljs-string">'user'</span>,  <span class="hljs-comment">//对应前端程序中模型的名字</span>
                attributes: {   <span class="hljs-comment">// 模型中的属性键值对</span>
                    username: <span class="hljs-string">'ddlisting.com'</span>, <span class="hljs-attr">property</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">email</span>: <span class="hljs-string">'3333@qq.com'</span>, <span class="hljs-attr">property</span>: <span class="hljs-literal">true</span>
                }
            },
            {
                <span class="hljs-attr">id</span>: <span class="hljs-string">'3'</span>,
                <span class="hljs-attr">type</span>: <span class="hljs-string">'user'</span>,  <span class="hljs-comment">//对应前端程序中模型的名字</span>
                attributes: {   <span class="hljs-comment">// 模型中的属性键值对</span>
                    username: <span class="hljs-string">'www.ddlising.com'</span>, <span class="hljs-attr">property</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">email</span>: <span class="hljs-string">'1527254027@qq.com'</span>, <span class="hljs-attr">property</span>: <span class="hljs-literal">true</span>
                }
            }
        ]
    };

    res.status(<span class="hljs-number">200</span>).send(<span class="hljs-built_in">JSON</span>.stringify(input));
  });</code></pre>
<p>注：为了构建jsonapi对象更加简便另外在安装一个插件： <code>npm install jsonapi-parse</code>。安装完毕后手动关闭再重启项目。然后再次进入路由<code>users</code>可以看到与前面的结果一样，正确了显示后端返回的数据。</p>
<p>到此，我相信读者应该能明白这两个适配器之间的差别了！<strong>需要注意的是Ember.js<code>2.0</code>版本之后<code>JSONAPIAdapter</code>作为默认的适配器，也就是说平常如果你没有自定义任何适配器那么Ember Data会默认使用的是<code>JSONAPIAdapter</code>适配器。所以如果你没有使用其他的适配器那么你的后端返回的数据格式必须是遵循jsonapi规范的。另外在路由<code>users.js</code>中使用到Ember Data提供的方法<code>findAll('modelName')</code>，我想从中你也应该明白了Ember Data是何等重要了吧</strong></p>
<p>看到这里不知道读者是否已经明白适配器和后端服务的关联关系？如果有疑问请给我留言。<br>文中所说的后端就是我的node程序（放在<code>server</code>目录下），前端就是我的Ember.js项目。</p>
<p>下面就是再结合数据库。</p>
<h2 id="articleHeader22">加入数据库</h2>
<p>其实到这步加不加数据库已经不那么重要了！重要把服务端返回的数据改成从数据库读取就完了。我就简单讲解了。</p>
<h3 id="articleHeader23">连接MySQL</h3>
<p>连接MySQL的工作交给前面已经安装好的<code>node-mysql</code>，如果还没安装请执行命令<code>npm install mysqljs/mysql</code>进行安装。继续修改后端服务代码<code>server/index.js</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = function(app) {
  // 与之前的内容不变 
  // 
  // 引入MySQL模块
  var mysql = require('mysql');
  // 获取连接对象
  var conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      // 开启debug，可以在启动ember项目的终端看到更多详细的信息
      database: 'test'
  });

  // 处理请求 http://localhost:4200/user
  app.get('/api/v1/users', function(req, res) {

    var jsonArr = new Array();

    // 打开数据库连接
    conn.connect();
    //查询数据
    conn.query('select * from user', function(err, rows, fields) {
        if (err) throw err;

        //遍历返回的数据并设置到返回的json对象中
        for (var i = 0; i < rows.length; i++) {
            
            jsonArr.push({
                id: rows[i].id,
                username: rows[i].username,
                email: rows[i].email
            });
        }

        // 返回前端
        res.status(200).send({
            users: jsonArr
        });

    });
    // 关闭数据库连接
    conn.end();
  });

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{
  <span class="hljs-comment">// 与之前的内容不变 </span>
  <span class="hljs-comment">// </span>
  <span class="hljs-comment">// 引入MySQL模块</span>
  <span class="hljs-keyword">var</span> mysql = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mysql'</span>);
  <span class="hljs-comment">// 获取连接对象</span>
  <span class="hljs-keyword">var</span> conn = mysql.createConnection({
      <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
      <span class="hljs-attr">user</span>: <span class="hljs-string">'root'</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>,
      <span class="hljs-comment">// 开启debug，可以在启动ember项目的终端看到更多详细的信息</span>
      database: <span class="hljs-string">'test'</span>
  });

  <span class="hljs-comment">// 处理请求 http://localhost:4200/user</span>
  app.get(<span class="hljs-string">'/api/v1/users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{

    <span class="hljs-keyword">var</span> jsonArr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();

    <span class="hljs-comment">// 打开数据库连接</span>
    conn.connect();
    <span class="hljs-comment">//查询数据</span>
    conn.query(<span class="hljs-string">'select * from user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, rows, fields</span>) </span>{
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;

        <span class="hljs-comment">//遍历返回的数据并设置到返回的json对象中</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; rows.length; i++) {
            
            jsonArr.push({
                <span class="hljs-attr">id</span>: rows[i].id,
                <span class="hljs-attr">username</span>: rows[i].username,
                <span class="hljs-attr">email</span>: rows[i].email
            });
        }

        <span class="hljs-comment">// 返回前端</span>
        res.status(<span class="hljs-number">200</span>).send({
            <span class="hljs-attr">users</span>: jsonArr
        });

    });
    <span class="hljs-comment">// 关闭数据库连接</span>
    conn.end();
  });

};</code></pre>
<p>相比之前的代码只是引入了mysql，增加连接对象声明，然后在请求处理方法里查询数据，默认在数据库初始化了3条数据，如下截图，另外 <strong>为了简单起见我仍然使用的是<code>RESTAdapter</code>适配器，这样处理也相对简单。</strong> 获取连接对象的代码应该不用过多解释了，就是填写你本地连接数据库的对应配置信息就行了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150899" src="https://static.alili.tech/img/remote/1460000006150899" alt="数据库数据" title="数据库数据" style="cursor: pointer;"></span></p>
<p>记得修改适配器为<code>RESTAdapter</code>。</p>
<p>重启项目。进入路由<code>users</code>可以看到数据库的数据正确显示出来了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150901" src="https://static.alili.tech/img/remote/1460000006150901" alt="显示数据库数据" title="显示数据库数据" style="cursor: pointer;"></span></p>
<h2 id="articleHeader24">CRUD操作</h2>
<p>对于CRUD操作都举一个例子，由于前面已经介绍过<code>findAll</code>查询就不在此介绍CRUD中的R了。下面就对另外三个做一个例子：<br>更多有关数据的操作请看<a href="http://blog.ddlisting.com/2016/04/16/xin-jian-geng-xin-shan-chu-ji-lu/" rel="nofollow noreferrer" target="_blank">Ember.js 入门指南——新建、更新、删除记录</a>。</p>
<p>为了方便演示再增加几个路由和模板。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ember g template users/index
ember g route users/new
ember g route users/edit" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">ember g template users/index
ember g route users/new
ember g route users/edit</code></pre>
<p>上述3个命令创建了三个<code>users</code>的子路由和子模板。</p>
<h3 id="articleHeader25">新增、更新</h3>
<p>由于项目使用的是Ember Data，增加数据也是很简单的，直接调用<code>createRecord()</code>创建一个<code>record</code>之后再调用<code>save()</code>方法保存到服务器。<br>另外新增和更新的处理方式相似，就直接写在一个方法内。</p>
<h4>Ember前端处理代码</h4>
<h5>component:user-form.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/components/user-form.js
// 新增，修改user
import Ember from 'ember';

export default Ember.Component.extend({
  tipInfo: null,

  actions: {
    saveOrUpdate(id, user) {
      if (id) {  //更新
        let username = this.get('model.username');
        let email = this.get('model.email');
        if (username &amp;&amp; email) {
          this.store.findRecord('user', id).then((u) => {
            
            u.set('username', username);
            u.set('email', email);

            u.save().then(() => {
              this.set('tipInfo', &quot;更新成功&quot;);
              // this.set('model.username', '');
              // this.set('model.email', '');
            }); 
          });
        } else {
          this.set('tipInfo', &quot;请输入username和email！&quot;);
        }

      } else {  //新增

        let username = this.get('model.username');
        let email = this.get('model.email');
        if (username &amp;&amp; email) {
          this.get('store').createRecord('user', {
            username: username,
            email: email
          }).save().then(() => {
            this.set('tipInfo', &quot;保存成功&quot;);
            this.set('model.username', '');
            this.set('model.email', '');
          }, (err) => {
            this.set('tipInfo', &quot;保存失败&quot;+err);
          }); 
        } else {
          this.set('tipInfo', &quot;请输入username和email！&quot;);
        }
    
      }
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/components/user-form.js</span>
<span class="hljs-comment">// 新增，修改user</span>
<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Component.extend({
  <span class="hljs-attr">tipInfo</span>: <span class="hljs-literal">null</span>,

  <span class="hljs-attr">actions</span>: {
    saveOrUpdate(id, user) {
      <span class="hljs-keyword">if</span> (id) {  <span class="hljs-comment">//更新</span>
        <span class="hljs-keyword">let</span> username = <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'model.username'</span>);
        <span class="hljs-keyword">let</span> email = <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'model.email'</span>);
        <span class="hljs-keyword">if</span> (username &amp;&amp; email) {
          <span class="hljs-keyword">this</span>.store.findRecord(<span class="hljs-string">'user'</span>, id).then(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> {
            
            u.set(<span class="hljs-string">'username'</span>, username);
            u.set(<span class="hljs-string">'email'</span>, email);

            u.save().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
              <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'tipInfo'</span>, <span class="hljs-string">"更新成功"</span>);
              <span class="hljs-comment">// this.set('model.username', '');</span>
              <span class="hljs-comment">// this.set('model.email', '');</span>
            }); 
          });
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'tipInfo'</span>, <span class="hljs-string">"请输入username和email！"</span>);
        }

      } <span class="hljs-keyword">else</span> {  <span class="hljs-comment">//新增</span>

        <span class="hljs-keyword">let</span> username = <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'model.username'</span>);
        <span class="hljs-keyword">let</span> email = <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'model.email'</span>);
        <span class="hljs-keyword">if</span> (username &amp;&amp; email) {
          <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'store'</span>).createRecord(<span class="hljs-string">'user'</span>, {
            <span class="hljs-attr">username</span>: username,
            <span class="hljs-attr">email</span>: email
          }).save().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'tipInfo'</span>, <span class="hljs-string">"保存成功"</span>);
            <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'model.username'</span>, <span class="hljs-string">''</span>);
            <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'model.email'</span>, <span class="hljs-string">''</span>);
          }, (err) =&gt; {
            <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'tipInfo'</span>, <span class="hljs-string">"保存失败"</span>+err);
          }); 
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'tipInfo'</span>, <span class="hljs-string">"请输入username和email！"</span>);
        }
    
      }
    }
  }
});</code></pre>
<p>新增和修改处理是相似的，根据<code>id</code>是否为空判断是否是新增还是更新。</p>
<h4>hbs:user-form.hbs</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! 新增、修改都用到的表单，提出为公共部分"}}"
<div class=&quot;container&quot;>
  <h1>"{{"title"}}"</h1>

  <div class=&quot;row bg-info&quot; style=&quot;padding: 10px 20px 0 0;&quot;>
    <p class=&quot;pull-right&quot; style=&quot;margin-right: 20px;&quot;>
      "{{"#link-to 'users' class=&quot;btn btn-primary&quot;"}}"返回"{{"/link-to"}}"
    </p>
  </div>

  
  <!-- <form "{{"action 'add' on='submit'"}}"> -->
  <form>
    <div class=&quot;form-group&quot;>
      <label for=&quot;exampleInputPassword1&quot;>username</label>
      "{{"input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;usernameId&quot; name='username' placeholder=&quot;username&quot; value=model.username"}}"
    </div>

    <div class=&quot;form-group&quot;>
      <label for=&quot;exampleInputEmail1&quot;>Email address</label>
      "{{"input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;exampleInputEmail1&quot; placeholder=&quot;Email&quot; value=model.email"}}"
    </div>
    <button type=&quot;submit&quot; class=&quot;btn btn-primary&quot; "{{"action 'saveOrUpdate' model.id model"}}">保存</button>
  </form>

  "{{"#if tipInfo"}}"
    <div class=&quot;alert alert-success alert-dismissible&quot; role=&quot;alert&quot;>
      <button type=&quot;button&quot; class=&quot;close&quot; data-dismiss=&quot;alert&quot; aria-label=&quot;Close&quot;><span aria-hidden=&quot;true&quot;>&amp;times;</span></button>
      "{{"tipInfo"}}"
    </div>
  "{{"/if"}}"

</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! 新增、修改都用到的表单，提出为公共部分"}}"
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{"title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row bg-info"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"padding: 10px 20px 0 0;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pull-right"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-right: 20px;"</span>&gt;</span>
      "{{"#link-to 'users' class="btn btn-primary""}}"返回"{{"/link-to"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  
  <span class="hljs-comment">&lt;!-- &lt;form "{{"action 'add' on='submit'"}}"&gt; --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"exampleInputPassword1"</span>&gt;</span>username<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      "{{"input type="text" class="form-control" id="usernameId" name='username' placeholder="username" value=model.username"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"exampleInputEmail1"</span>&gt;</span>Email address<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      "{{"input type="text" class="form-control" id="exampleInputEmail1" placeholder="Email" value=model.email"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span> "{{"<span class="hljs-attr">action</span> '<span class="hljs-attr">saveOrUpdate</span>' <span class="hljs-attr">model.id</span> <span class="hljs-attr">model</span>"}}"&gt;</span>保存<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

  "{{"#if tipInfo"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"alert alert-success alert-dismissible"</span> <span class="hljs-attr">role</span>=<span class="hljs-string">"alert"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">data-dismiss</span>=<span class="hljs-string">"alert"</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">"Close"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">"true"</span>&gt;</span>&amp;times;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      "{{"tipInfo"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  "{{"/if"}}"

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h5>route:edit.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/routes/users/edit.js
import Ember from 'ember';

export default Ember.Route.extend({
  // 根据id获取某个记录
  model(params) {
    return this.store.findRecord('user', params.user_id);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/routes/users/edit.js</span>
<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Route.extend({
  <span class="hljs-comment">// 根据id获取某个记录</span>
  model(params) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.store.findRecord(<span class="hljs-string">'user'</span>, params.user_id);
  }
});</code></pre>
<p>点击“编辑”的时候需要根据被点击记录的<code>id</code>查询数据详情，并返回到编辑页面。</p>
<h5>new.hbs</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! 增加数据的表单"}}"
"{{"user-form title='新增user' store=store model=model"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! 增加数据的表单"}}"
"{{"user-form title='新增user' store=store model=model"}}"</code></pre>
<h5>edit.hbs</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! 修改数据的表单"}}"
"{{"user-form title='修改user' store=store model=model"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"! 修改数据的表单"}}"
"{{"user-form title='修改user' store=store model=model"}}"</code></pre>
<p>提取新增和修改这两个模板的相同代码为一个组件，两个模板都调用组件。</p>
<h4>后端处理代码</h4>
<p>与前端对应的要有相应的后端处理服务，增加2个路由监听，一个是监听<code>post</code>提交（新增），一个是<code>put</code>提交（更新）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 处理请求 POST http://localhost:4200/users
  app.post('/api/v1/users', function(req, res) {
    
    var username = req.body.user.username;
    console.log(&quot;req.body.user.username = &quot; + username);
    var email = req.body.user.email;
    console.log(&quot;req.body.user.email = &quot; + email);

    // 打开数据库连接
    pool.getConnection(function(err, conn) {  
      var queryParams = { username: username, email: email };  
      var query = conn.query('insert into user SET ?', queryParams, function(err, result) {  
          if (err) throw err;
          
          console.log('result = ' + result);
          // 返回前端
          if (result) {
            res.status(200).send({
                users: {
                  id: result.insertId,
                  username: username,
                  email: email
                }
            });
          } else {  //没有数据返回一个空的
            // 返回前端
            res.status(200).send({
                users: {
                  id: '',
                  username: '',
                  email: ''
                }
            });
          } 
          
      });
      console.log('sql: ' + query.sql);
      conn.release();  //释放连接，放回到连接池
    });
  });
    


    // 处理请求 POST http://localhost:4200/users/id  根据id更新某个数据
  app.put('/api/v1/users/:id', function(req, res) {

    console.log('更新 POST /api/v1/users/:id');
    console.log('req.params.id = ' + req.params.id);
    console.log('req.body.user.username = ' + req.body.user.username);
    var jsonArr = new Array();
    // 打开数据库连接
    pool.getConnection(function(err, conn) {  
      // 参数的次序要与SQL语句的参数次序一致
      var queryParams = [ req.body.user.username, req.body.user.email, req.params.id ];
      
      var query = conn.query('UPDATE user SET username = ?, email = ? where id = ?', queryParams, function(err, results, fields) {  
          if (err) {
            console.log('更新出错：'+err);
            throw err;
          } 

        //遍历返回的数据并设置到返回的json对象中，通常情况下只有一个数据，直接取第一个数据返回
        if (results &amp;&amp; results.length > 0) {
          jsonArr.push({
              id: results[0].id,
              username: results[0].username,
              email: results[0].email
          });

          // 返回前端
          res.status(200).send({
              users: jsonArr
          });
        }
        //  else {  //没有数据返回一个空的
        //   // 返回前端
        //   res.status(200).send({
        //       users: {
        //         id: '',
        //         username: '',
        //         email: ''
        //       }
        //   });
        // } 
        console.log('SQL: ' + query.sql);

      });
      conn.release();  //释放连接，放回到连接池
    });
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 处理请求 POST http://localhost:4200/users</span>
  app.post(<span class="hljs-string">'/api/v1/users'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    
    <span class="hljs-keyword">var</span> username = req.body.user.username;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"req.body.user.username = "</span> + username);
    <span class="hljs-keyword">var</span> email = req.body.user.email;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"req.body.user.email = "</span> + email);

    <span class="hljs-comment">// 打开数据库连接</span>
    pool.getConnection(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, conn</span>) </span>{  
      <span class="hljs-keyword">var</span> queryParams = { <span class="hljs-attr">username</span>: username, <span class="hljs-attr">email</span>: email };  
      <span class="hljs-keyword">var</span> query = conn.query(<span class="hljs-string">'insert into user SET ?'</span>, queryParams, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{  
          <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
          
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result = '</span> + result);
          <span class="hljs-comment">// 返回前端</span>
          <span class="hljs-keyword">if</span> (result) {
            res.status(<span class="hljs-number">200</span>).send({
                <span class="hljs-attr">users</span>: {
                  <span class="hljs-attr">id</span>: result.insertId,
                  <span class="hljs-attr">username</span>: username,
                  <span class="hljs-attr">email</span>: email
                }
            });
          } <span class="hljs-keyword">else</span> {  <span class="hljs-comment">//没有数据返回一个空的</span>
            <span class="hljs-comment">// 返回前端</span>
            res.status(<span class="hljs-number">200</span>).send({
                <span class="hljs-attr">users</span>: {
                  <span class="hljs-attr">id</span>: <span class="hljs-string">''</span>,
                  <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>,
                  <span class="hljs-attr">email</span>: <span class="hljs-string">''</span>
                }
            });
          } 
          
      });
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'sql: '</span> + query.sql);
      conn.release();  <span class="hljs-comment">//释放连接，放回到连接池</span>
    });
  });
    


    <span class="hljs-comment">// 处理请求 POST http://localhost:4200/users/id  根据id更新某个数据</span>
  app.put(<span class="hljs-string">'/api/v1/users/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'更新 POST /api/v1/users/:id'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'req.params.id = '</span> + req.params.id);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'req.body.user.username = '</span> + req.body.user.username);
    <span class="hljs-keyword">var</span> jsonArr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-comment">// 打开数据库连接</span>
    pool.getConnection(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, conn</span>) </span>{  
      <span class="hljs-comment">// 参数的次序要与SQL语句的参数次序一致</span>
      <span class="hljs-keyword">var</span> queryParams = [ req.body.user.username, req.body.user.email, req.params.id ];
      
      <span class="hljs-keyword">var</span> query = conn.query(<span class="hljs-string">'UPDATE user SET username = ?, email = ? where id = ?'</span>, queryParams, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, results, fields</span>) </span>{  
          <span class="hljs-keyword">if</span> (err) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'更新出错：'</span>+err);
            <span class="hljs-keyword">throw</span> err;
          } 

        <span class="hljs-comment">//遍历返回的数据并设置到返回的json对象中，通常情况下只有一个数据，直接取第一个数据返回</span>
        <span class="hljs-keyword">if</span> (results &amp;&amp; results.length &gt; <span class="hljs-number">0</span>) {
          jsonArr.push({
              <span class="hljs-attr">id</span>: results[<span class="hljs-number">0</span>].id,
              <span class="hljs-attr">username</span>: results[<span class="hljs-number">0</span>].username,
              <span class="hljs-attr">email</span>: results[<span class="hljs-number">0</span>].email
          });

          <span class="hljs-comment">// 返回前端</span>
          res.status(<span class="hljs-number">200</span>).send({
              <span class="hljs-attr">users</span>: jsonArr
          });
        }
        <span class="hljs-comment">//  else {  //没有数据返回一个空的</span>
        <span class="hljs-comment">//   // 返回前端</span>
        <span class="hljs-comment">//   res.status(200).send({</span>
        <span class="hljs-comment">//       users: {</span>
        <span class="hljs-comment">//         id: '',</span>
        <span class="hljs-comment">//         username: '',</span>
        <span class="hljs-comment">//         email: ''</span>
        <span class="hljs-comment">//       }</span>
        <span class="hljs-comment">//   });</span>
        <span class="hljs-comment">// } </span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'SQL: '</span> + query.sql);

      });
      conn.release();  <span class="hljs-comment">//释放连接，放回到连接池</span>
    });
  });</code></pre>
<p>为何新增对应的是<code>post</code>方法，更新对应的是<code>put</code>方法，请看<a href="https://guides.emberjs.com/v1.13.0/models/the-rest-adapter/" rel="nofollow noreferrer" target="_blank">the rest adapter</a>的详细介绍（主要是第一个表格的内容）。</p>
<h3 id="articleHeader26">简单测试</h3>
<p>点击右上角的新增按钮进入新增界面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150903" src="https://static.alili.tech/img/remote/1460000006150903" alt="新增按钮" title="新增按钮" style="cursor: pointer;"></span></p>
<p>进入新增界面后输入相应信息（我就不做数据的格式校验了，有需要自己校验数据格式）。然后点击“保存”，保存成功会有提示信息。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150905" src="https://static.alili.tech/img/remote/1460000006150905" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150907" src="https://static.alili.tech/img/remote/1460000006150907" alt="保存成功提示信息" title="保存成功提示信息" style="cursor: pointer;"></span></p>
<p>点击右上角的“返回”回到主列表页面，查看新增的数据是否保存成功。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150909" src="https://static.alili.tech/img/remote/1460000006150909" alt="主列表数据" title="主列表数据" style="cursor: pointer;"></span></p>
<p>可以看到刚刚新增的数据已经显示在列表上，为了进一步验证数据已经保存成功，直接查看数据库。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150911" src="https://static.alili.tech/img/remote/1460000006150911" alt="数据库数据" title="数据库数据" style="cursor: pointer;"></span></p>
<p>可以看到数据库也已经成功保存了刚刚新增的数据。</p>
<p>修改的测试方式我就不啰嗦了，点击列表上的修改按钮进入修改页面，修改后保存既可以，请自行测试。</p>
<h3 id="articleHeader27">删除</h3>
<p>删除处理相比新增更加简单，直接发送一个<code>delete</code>请求即可。</p>
<h4>Ember前端处理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/routes/user.js
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('user');
  },
  actions: {
    // 删除记录
    del(id) {
      console.log('删除记录：' + id);
      this.get('store').findRecord('user', id).then((u) => {
          u.destroyRecord(); // => DELETE to /users/2
      });
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app/routes/user.js</span>
<span class="hljs-keyword">import</span> Ember <span class="hljs-keyword">from</span> <span class="hljs-string">'ember'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Ember.Route.extend({
  model() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.store.findAll(<span class="hljs-string">'user'</span>);
  },
  <span class="hljs-attr">actions</span>: {
    <span class="hljs-comment">// 删除记录</span>
    del(id) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'删除记录：'</span> + id);
      <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'store'</span>).findRecord(<span class="hljs-string">'user'</span>, id).then(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> {
          u.destroyRecord(); <span class="hljs-comment">// =&gt; DELETE to /users/2</span>
      });
    }
  }
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- app/templates/index.hbs -->

<h1>用户列表</h1>

<div class=&quot;row bg-info&quot; style=&quot;padding: 10px 20px 0 0;&quot;>
  <p class=&quot;pull-right&quot; style=&quot;margin-right: 20px;&quot;>
    "{{"#link-to 'users.new' class=&quot;btn btn-primary&quot;"}}"新增"{{"/link-to"}}"
  </p>
</div>


<table class=&quot;table table-striped table-hover&quot;>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        用户名
      </th>
      <th>
        邮箱
      </th>
      <th>
      操作
      </th>
    </tr>
  </thead>

  <tbody>
    "{{"#each model as |user|"}}"
    <tr>
      <td>
        "{{"user.id"}}"
      </td>
      <td>
        "{{"user.username"}}"
      </td>
      <td>
        "{{"user.email"}}"
      </td>
      <td>
      "{{"#link-to 'users.edit' user.id"}}"修改"{{"/link-to"}}" | 
      <span "{{"action 'del' user.id"}}" style=&quot;cursor: pointer; color: #337ab7;&quot;>删除</span>
      </td>
    </tr>
    "{{"/each"}}"
  </tbody>

</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- app/templates/index.hbs --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>用户列表<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row bg-info"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"padding: 10px 20px 0 0;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pull-right"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-right: 20px;"</span>&gt;</span>
    "{{"#link-to 'users.new' class="btn btn-primary""}}"新增"{{"/link-to"}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"table table-striped table-hover"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        #
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        用户名
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
        邮箱
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>
      操作
      <span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
    "{{"#each model as |user|"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
        "{{"user.id"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
        "{{"user.username"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
        "{{"user.email"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>
      "{{"#link-to 'users.edit' user.id"}}"修改"{{"/link-to"}}" | 
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> "{{"<span class="hljs-attr">action</span> '<span class="hljs-attr">del</span>' <span class="hljs-attr">user.id</span>"}}" <span class="hljs-attr">style</span>=<span class="hljs-string">"cursor: pointer; color: #337ab7;"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
    "{{"/each"}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>这段代码的与前面的代码基本一致，就是增加了删除。</p>
<h4>后端处理</h4>
<p>在后端增加一个监听删除的路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 处理请求 DELETE http://localhost:4200/users/id 删除记录
  app.delete('/api/v1/users/:id', function(req, res) {

    var jsonArr = new Array();
    var id = req.params.id;
    console.log(&quot;删除 req.params.id = &quot; + id);

    // 打开数据库连接
    pool.getConnection(function(err, conn) {  
      var queryParams = [ id ];  
      var query = conn.query('delete from user where id = ?', queryParams, function(err, result) {  
          if (err) throw err;

          // 返回前端
          res.status(200).send({});
      });

      console.log('sql: ' + query.sql);
      conn.release();  //释放连接，放回到连接池
    });
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 处理请求 DELETE http://localhost:4200/users/id 删除记录</span>
  app.delete(<span class="hljs-string">'/api/v1/users/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{

    <span class="hljs-keyword">var</span> jsonArr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    <span class="hljs-keyword">var</span> id = req.params.id;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"删除 req.params.id = "</span> + id);

    <span class="hljs-comment">// 打开数据库连接</span>
    pool.getConnection(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, conn</span>) </span>{  
      <span class="hljs-keyword">var</span> queryParams = [ id ];  
      <span class="hljs-keyword">var</span> query = conn.query(<span class="hljs-string">'delete from user where id = ?'</span>, queryParams, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{  
          <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;

          <span class="hljs-comment">// 返回前端</span>
          res.status(<span class="hljs-number">200</span>).send({});
      });

      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'sql: '</span> + query.sql);
      conn.release();  <span class="hljs-comment">//释放连接，放回到连接池</span>
    });
  });</code></pre>
<h4>测试删除</h4>
<p>测试删除很简单，直接在列表上点击“删除”按钮即可删除一条记录。界面和数据库的截图我就不贴出来了，自己动手测试就知道了！！</p>
<p><strong>数据可以正确删除，但是，删除之后控制台会报如下错误：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006150913" src="https://static.alili.tech/img/remote/1460000006150913" alt="删除报错" title="删除报错" style="cursor: pointer; display: inline;"></span></p>
<p>找了官网文档<a href="https://guides.emberjs.com/v1.13.0/models/the-rest-adapter/#toc_json-root" rel="nofollow noreferrer" target="_blank">the rest adapter delete record</a>按照官网的文档处理仍然报错！目前还没找到好的处理方法，不知道是哪里出了问题，如果读者知道请告诉我，谢谢。</p>
<p>到此CRUD操作也完成了，不足的就是在处理删除的时候还是有点问题，目前还没找到觉得办法！但是总的来说对于CRUD的操作都是这么处理的，调用的方法也都是上述代码所使用的方法。</p>
<p><strong>未完待续……还差分页没完成。</strong></p>
<h2 id="articleHeader28">总结</h2>
<p>文章写到这里已经把我所想的内容介绍完毕了，不知道读者是否看明白了。其中主要理解的知识点是：</p>
<ol>
<li><p>Ember Data和adapter、record、model的关系</p></li>
<li><p>如何自定义适配器</p></li>
<li><p>如何根据Ember前端请求编写后端处理</p></li>
<li><p>CRUD操作</p></li>
<li><p>分页处理（目前还没整合进来）</p></li>
</ol>
<p>明白了上述几点，本文的目的也达到了！如何有疑问欢迎给我留言，也期待着读者能给我解答删除报错的问题！</p>
<h2 id="articleHeader29">文章源码</h2>
<p>如果有需要欢迎star或者fork学习。下面是源码地址：</p>
<p><a href="https://github.com/ubuntuvim/emberData-adapter-database" rel="nofollow noreferrer" target="_blank">https://github.com/ubuntuvim/emberData-adapter-database</a>，欢迎follow我，一起学习交流！我在全球最大的<a href="https://github.com" rel="nofollow noreferrer" target="_blank">同性交友网站</a>等你哦！！</p>
<h2 id="articleHeader30">参考网址</h2>
<ul>
<li><p><a href="http://emberjs.com/" rel="nofollow noreferrer" target="_blank">ember.js</a></p></li>
<li><p><a href="http://ember-cli.com/" rel="nofollow noreferrer" target="_blank">ember-cli</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ember.js如何与后端服务交互？adapter、store、ember data关系揭秘

## 原文链接
[https://segmentfault.com/a/1190000006150887](https://segmentfault.com/a/1190000006150887)

