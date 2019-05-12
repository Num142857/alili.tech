---
title: '13 个快速构建 Laravel 后台的扩展包' 
date: 2018-12-23 2:30:07
hidden: true
slug: yxu7bcbg9ml
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000012312105?w=2200&amp;h=1125" src="https://static.alili.tech/img/remote/1460000012312105?w=2200&amp;h=1125" alt="Laravel 后台生成器扩展包" title="Laravel 后台生成器扩展包" style="cursor: pointer; display: inline;"></span></p>
<p>开发者们都是懒惰的，不，我不是在开玩笑，他们努力创建系统，帮助他们在未来避免更多的、尤其是重复性的工作。现在有一些相当优秀的例子，我们不需要在编写重复的代码，它将直接为我们生成。今天我们将会看到 Laravel 框架中的各式各样的后台管理面板、后端开发者创建的例子，它们可以节省我们多少时间呢？</p>
<p>Disclaimer: 我是 <code>quickadminpanel</code> 的创始人，一位创造者。回顾这个市场，这里确实有伟大的竞争对手，我尽可能做人要诚实和公正，他们应该得到友善的话语和尊重。</p>
<p>有两大类后台管理面板生成器：可视化构建器和基于命令行的。选择取决于您的偏好，是否喜欢使用 <code>GUI</code> 视图面板的，还是有参数的 <code>Artisan</code> 命令行的。</p>
<p>另外，这里一个重要的术语，知道 <code>CRUD</code> 这个缩写代表“创建、读取、更新、删除”这些操作基于所有的管理面板。一个 <code>CRUD</code> 通常代表一个菜单项的模型来管理数据。</p>
<p><strong>重要通知：此文章写于 写于 2017 年 4 月 1号，下面所有的扩展包都是在 laravel 5.3 中测试的。在撰写本文的时候，要求他们提供官方的 5.4 版本支持还为时尚早。(半年时间，Laravel 5.5 都已经发布了)</strong></p>
<h3 id="articleHeader0">可视化的后台管理面板</h3>
<h5>
<a href="https://the-control-group.github.io/voyager/" rel="nofollow noreferrer" target="_blank">Voyager</a>: The Missing Laravel Admin</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012312106?w=600&amp;h=402" src="https://static.alili.tech/img/remote/1460000012312106?w=600&amp;h=402" alt="Voyager" title="Voyager" style="cursor: pointer; display: inline;"></span></p>
<p>这个产品虽然很新，但给我留下了深刻的印象。它已经有一个大的粉丝团，在之前的 laravel 资讯中有提到过它，和它的 <a href="https://www.youtube.com/watch?v=RSAnupACbhg&amp;list=PL_UnIDIwT95PEQFNdgXZGo5SYU5V_TQvc" rel="nofollow noreferrer" target="_blank"> YouTube 开发视频系列。</a></p>
<p>Voyager 拥有一个专业并且完美的界面，但主要的一点是，它只是工作。清晰的使用说明，友好的前端主题，没有明显的 bug 或未完成的部分。 Voyager 还拥有像船长的图片或船轮图标，使它看起来不错的整体。</p>
<p>另一个明智的决定是有一个参数“虚拟数据”在安装过程中，你可以有你的管理面板预填充数据使用。</p>
<p>Voyager 还用有一个媒体文件管理器，来处理你上传的文件，这非常的方便，并帮助它在其他的后台管理创建者中脱颖而出。</p>
<p>最后，在 Voyager 的帮助下，你也可以通过一个在你的后端应用程序中的  <code>mini-phpMyAdmin</code> 改变数据库表，从而直接改变你的后台管理面板。</p>
<p>总之，Voyager 似乎是市场上最优雅的解决方案，但如果不支持或更新一段时间，这种情况很容易发生变化，这种情况经常发生在开源的扩展包中。</p>
<h4>
<a href="http://laraadmin.com/" rel="nofollow noreferrer" target="_blank">LaraAdmin</a>: Admin Panel + CRM</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012312107?w=600&amp;h=330" src="https://static.alili.tech/img/remote/1460000012312107?w=600&amp;h=330" alt="LaraAdmin" title="LaraAdmin" style="cursor: pointer; display: inline;"></span></p>
<p>这是另一个让我印象深刻的项目。安装并登录到你的管理面板后，你可以直观地创建 CURDs 模块。据作者来讲，这个模块化的系统，是受到了 <a href="https://www.sugarcrm.com/" rel="nofollow noreferrer" target="_blank">SugarCRM</a> 的启发。</p>
<p>仅仅通过几次点击，你可以生成你的数据库模型的迁移文件。如果你喜欢，你也可以同时或者分开生成 CURD 模块。</p>
<p>LaraAdmin 带有相当多的预定义模块，他们帮助你了解这个系统，但是，另一方面，如果我要创建我的项目从零开始，这需要花些一些时间来对 LaraAdmin 进行默认配置。</p>
<p>和 Voyager 一样，LaraAdmin 也拥有上传文件功能。可以说，她是你上传文件的内部浏览器。</p>
<p>对于前端视图，LaraAdmin 采用了一种非常受欢迎的主题 adminLTE。它实际上是大多数管理面板构建者使用的，它成为一种市场标准。</p>
<h4>
<a href="https://github.com/LaravelDaily/quickadmin" rel="nofollow noreferrer" target="_blank">QuickAdmin</a>: 在线生成器的扩展包</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012312108?w=600&amp;h=241" src="https://static.alili.tech/img/remote/1460000012312108?w=600&amp;h=241" alt="QuickAdmin" title="QuickAdmin" style="cursor: pointer; display: inline;"></span></p>
<p>这个包是非常简单的，安装之后，您可以创建 CRUD 模块或非 CRUD 的菜单项，指定字段、角色和权限。它可能是本文中所有扩展包中描述最少的工具。</p>
<p>对于 QuickAdmin 有一个重要的里程碑，它是一个在线版本的管理面板的工具而不是作为一个现有项目 laravel 包，该生成器可以为你下载和使用整个 Laravel 项目。因此，您没有任何包依赖关系，也不需要学习这个特定包的语法。</p>
<h3 id="articleHeader1">非可视化的后台管理面板</h3>
<h4>Z-song / Laravel-admin</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012312109?w=600&amp;h=279" src="https://static.alili.tech/img/remote/1460000012312109?w=600&amp;h=279" alt="Laravel-admin" title="Laravel-admin" style="cursor: pointer;"></span></p>
<p>这个包介于可视化和非可视化工具两者之间的，生成器的一部分实际上是可视化的，因此您可以在管理面板内创建新的菜单项，但对于大多数过程，您必须手动编写代码，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="php artisan admin:make UserController --model=App\\User

$router->resource('users', UserController::class);

use Encore\Admin\Grid;
use Encore\Admin\Facades\Admin;
$grid = Admin::grid(Movie::class, function(Grid $grid){" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>php artisan admin:make UserController --model=App\\User

$router-&gt;resource(<span class="hljs-string">'users'</span>, UserController::class);

<span class="hljs-keyword">use</span> <span class="hljs-title">Encore</span>\<span class="hljs-title">Admin</span>\<span class="hljs-title">Grid</span>;
<span class="hljs-keyword">use</span> <span class="hljs-title">Encore</span>\<span class="hljs-title">Admin</span>\<span class="hljs-title">Facades</span>\<span class="hljs-title">Admin</span>;
$grid = Admin::grid(Movie::class, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(Grid $grid)</span></span>{</code></pre>
<p>这是视觉和基于代码的生成器之间的根本区别，后者需要学习它们的语法、一些规则并坚持它们。如果你想在包上创建一些定制的东西，那可能很麻烦。然而，z-song 开发的扩展包是一个很好的作品。</p>
<p>它还提供了额外的功能，如模型网格、模型表单、模型树，甚至是现成的小部件。</p>
<h4>InfyOm Laravel Generator</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012312110?w=600&amp;h=448" src="https://static.alili.tech/img/remote/1460000012312110?w=600&amp;h=448" alt="InfyOm Laravel Generator" title="InfyOm Laravel Generator" style="cursor: pointer;"></span></p>
<p>它有相当令人印象深刻的生成器口号：“让你的 API 和管理面板在几分钟内准备好”，所以他们首先强调 API，而不是管理面板。为此，他们有一个单独的 API 生成器，它可以作为管理面板的一部分，或者作为独立的一部分工作。不仅如此，他们还将为 API 生成详细的注释。</p>
<p>虽然 infyom 生成器不是可视化（infyom 声称他们在工作在 GUI 页面之上的），它提供了三种不同的选项指定的增删改查参数：控制台、JSON 文件、或一个现有的数据库表。是的，你可以为一个已经存在的表生成增删改查模块，是不是很酷？</p>
<p>这个生成器的一个有趣功能，它使用存储模式生成代码，所以您的控制器看起来如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class BookController extends AppBaseController
{
    /** @var  BookRepository */
    private $bookRepository;

    public function __construct(BookRepository $bookRepo)
    {
        $this->bookRepository = $bookRepo;
    }

    /**
     * Display a listing of the Book.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->bookRepository->pushCriteria(new RequestCriteria($request));
        $books = $this->bookRepository->all();

        return view('books.index')
            ->with('books', $books);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BookController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">AppBaseController</span>
</span>{
    <span class="hljs-comment">/** <span class="hljs-doctag">@var</span>  BookRepository */</span>
    <span class="hljs-keyword">private</span> $bookRepository;

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__construct</span><span class="hljs-params">(BookRepository $bookRepo)</span>
    </span>{
        <span class="hljs-keyword">$this</span>-&gt;bookRepository = $bookRepo;
    }

    <span class="hljs-comment">/**
     * Display a listing of the Book.
     *
     * <span class="hljs-doctag">@param</span> Request $request
     * <span class="hljs-doctag">@return</span> Response
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">index</span><span class="hljs-params">(Request $request)</span>
    </span>{
        <span class="hljs-keyword">$this</span>-&gt;bookRepository-&gt;pushCriteria(<span class="hljs-keyword">new</span> RequestCriteria($request));
        $books = <span class="hljs-keyword">$this</span>-&gt;bookRepository-&gt;all();

        <span class="hljs-keyword">return</span> view(<span class="hljs-string">'books.index'</span>)
            -&gt;with(<span class="hljs-string">'books'</span>, $books);
    }
}</code></pre>
<p>这可能是一件非常好的事情，或许你不想使用这种存储库模式，觉得它太复杂了。但是采用这种模式有一个最大好处，infyom 可以为你生成测试案例代码！</p>
<p>对于前端视图，infyom 提供四种模板可供选择：AdminLTE、 Metronic、Bootstrap、以及 FlatLab.</p>
<p>使用 infyom 最大的问题（与大多数非视觉生成器），是你必须严格遵守他们的规则语法。清楚他们的文档：“仔细阅读文档指定的特定输入，但是如果你使用了错误的参数，这个生成器会像魔术一样工作。</p>
<h4>
<a href="https://github.com/appzcoder/crud-generator" rel="nofollow noreferrer" target="_blank">AppzCoder</a>: 增删改查生成器 + 后台管理面板</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012312111?w=600&amp;h=213" src="https://static.alili.tech/img/remote/1460000012312111?w=600&amp;h=213" alt="AppzCoder" title="AppzCoder" style="cursor: pointer;"></span></p>
<p>这个包有两个产品，一个独立的增删改查生成器，和一个 laravel 后台管理包。它的官方文档说的要求 laravel 5.1 和 5.3 版本之间工作。</p>
<p>安装后，你可以通过一个一个的 Artisan 命令得到一个 bootstrap 默认主题，也可以手动创建增删改查模块。</p>
<p>他们官方文件中的一个例子：</p>
<blockquote><p>php artisan crud:generate Posts --fields="title#string; content#text; category#select#options=technology,tips,health" --view-path=admin --controller-namespace=Admin --route-group=admin</p></blockquote>
<p>如果这对你来说太难了，你可以在 JSON 文件中提供字段细节，然后将其指定为命令的参数。</p>
<p>您也可以单独生成不同的文件，如下所示：</p>
<blockquote>
<p>php artisan crud:controller PostsController --crud-name=posts --model-name=Post --view-path="directory" --route-group=admin</p>
<p>php artisan crud:model Post --fillable="['title', 'body']"</p>
</blockquote>
<p>生成增删改查后，然后你指定的所有细节，自己在代码里把菜单项，什么中间件、角色使用等等。所以，这个生成器会为你的管理面板做很多部分工作。</p>
<h4><a href="https://backpackforlaravel.com/" rel="nofollow noreferrer" target="_blank">Backpack for Laravel</a></h4>
<p>这实际上是一个庞大的项目，它不仅仅是构建于一个管理面板之上的，它还有一个方便的单独包结构：基础，增删改查 日志管理器，后台管理器等。作者称这个扩展包适用于创业者的各种演示网站，以及复杂的 Web 应用程序。</p>
<p><strong>提示：<a href="https://laravel-news.com/laravel-backpack" rel="nofollow noreferrer" target="_blank">Backpack 使用案例</a>已经在之前的 laravel资讯文章中有提到。</strong></p>
<p>除了增删改查生成器，它已经预先构建的增删改查模块包含：权限管理、设置、页面管理、新闻管理、菜单管理。另外，Backpack 中的一些包可以作为扩展：日志、备份和其他一些功能可以很容易地添加到应用程序中。</p>
<p>Backpack 的问题是它的严格，其严格要描述这样，所有在您的控制器代码的增删改查功能，它可能看起来像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class TagCrudController extends CrudController {

  public function setup() {
    $this->crud->setModel(&quot;App\Models\Tag&quot;);
    $this->crud->setRoute(&quot;admin/tag&quot;);
    $this->crud->setEntityNameStrings('tag', 'tags');

    $this->crud->setColumns(['name']);
    $this->crud->addField([
    'name' => 'name',
    'label' => &quot;Tag name&quot;
    ]);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TagCrudController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">CrudController</span> </span>{

  <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setup</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">$this</span>-&gt;crud-&gt;setModel(<span class="hljs-string">"App\Models\Tag"</span>);
    <span class="hljs-keyword">$this</span>-&gt;crud-&gt;setRoute(<span class="hljs-string">"admin/tag"</span>);
    <span class="hljs-keyword">$this</span>-&gt;crud-&gt;setEntityNameStrings(<span class="hljs-string">'tag'</span>, <span class="hljs-string">'tags'</span>);

    <span class="hljs-keyword">$this</span>-&gt;crud-&gt;setColumns([<span class="hljs-string">'name'</span>]);
    <span class="hljs-keyword">$this</span>-&gt;crud-&gt;addField([
    <span class="hljs-string">'name'</span> =&gt; <span class="hljs-string">'name'</span>,
    <span class="hljs-string">'label'</span> =&gt; <span class="hljs-string">"Tag name"</span>
    ]);
  }</code></pre>
<p>虽然在控制器方法中设置所有东西看起来很方便，但是如果您想在它上面构建任何定制的东西，您将不得不自己“破解”  Backpack 扩展包。公平地说，这适用于本系列中的大多数包，您必须处理依赖项，Backpack 扩展包是这里扩展包最严格的一个。</p>
<p><strong>值得一提的是 Backpack 扩展包不免费用于商业用途</strong>，作者用一种人类友好的方式说：“你使用这个扩展包就是应该去挣钱的，而不是免费的去工作”（这个扩展包收费19美元）。</p>
<h4><a href="https://github.com/LaravelRUS/SleepingOwlAdmin" rel="nofollow noreferrer" target="_blank">SleepingOwl Admin</a></h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012312112?w=600&amp;h=182" src="https://static.alili.tech/img/remote/1460000012312112?w=600&amp;h=182" alt="SleepingOwl" title="SleepingOwl" style="cursor: pointer; display: inline;"></span></p>
<p>这可能是这篇文章中最古老的包之一，但这个包仍然积极在维护，它是由一家俄罗斯公司创建的，您可以在文档的某些部分看到俄罗斯语言，在这里和那里提交消息和其他文本。但这并不妨碍实际使用 sleepingowl 扩展包，它是非常强大的。</p>
<p>同样在其他情况下，这个扩展包的使用语法相当严谨，这是如何在 sleepingowl 中添加一个菜单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Admin::menu()->url('/')->label('Start Page')->icon('fa-dashboard')->uses('\App\HTTP\Controllers\AdminController@getIndex');
Admin::menu(\App\User::class)->icon('fa-user');
Admin::menu()->label('Subitems')->icon('fa-book')->items(function ()
{
    Admin::menu(\Acme\Models\Bar\User::class)->icon('fa-user');
    Admin::menu(\Acme\Models\Foo::class)->label('my label');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>Admin::menu()-&gt;url(<span class="hljs-string">'/'</span>)-&gt;label(<span class="hljs-string">'Start Page'</span>)-&gt;icon(<span class="hljs-string">'fa-dashboard'</span>)-&gt;uses(<span class="hljs-string">'\App\HTTP\Controllers\AdminController@getIndex'</span>);
Admin::menu(\App\User::<span class="hljs-keyword">class</span>)-&gt;icon(<span class="hljs-string">'fa-user'</span>);
Admin::menu()-&gt;label(<span class="hljs-string">'Subitems'</span>)-&gt;icon(<span class="hljs-string">'fa-book'</span>)-&gt;items(function ()
{
    Admin::menu(\Acme\Models\Bar\User::<span class="hljs-keyword">class</span>)-&gt;icon(<span class="hljs-string">'fa-user'</span>);
    Admin::menu(\Acme\Models\Foo::<span class="hljs-keyword">class</span>)-&gt;label(<span class="hljs-string">'my label'</span>);
});</code></pre>
<p>这里的另一个缺点是包的文件似乎过时了一点，而不是 类似于 <code>admin:install</code> 这样的 <code>sleepingowl:install</code> Artisan 命令行安装。在这个扩展包中，还可以找到更多关于这种不一致的例子。</p>
<hr>
<p>你可以考虑用这八个扩展包，来生成你的后台管理面板。除了这些，还有五个没有全面的审查的扩展包。</p>
<p>我测试了两个未能交付的包：</p>
<ul>
<li>
<a href="http://crudbooster.com/" rel="nofollow noreferrer" target="_blank">CrudBooster</a> 它由一些手动修复工作，但文件是难以理解（可能是用谷歌翻译，作者是来自印度尼西亚），我也不喜欢作者的一些建议，如使用字段名称 <code>xxxx_id</code>、<code>id_xxxx</code> 之类的 。</li>
<li>
<a href="https://github.com/zofe/rapyd-laravel" rel="nofollow noreferrer" target="_blank">Zofe / Rapyd-Laravel</a> 不幸的是，它没有在 Laravel 5.3 中工作，写这篇文章的时候他们正在更新，根据他们的自述，最新支持的版本是5.2。</li>
</ul>
<p>最后，还有三个优质的包选择于 CodeCanyon。我不能提供很多关于他们的信息，所以我留下来给你们检查(我想作者是不愿意再花钱了(@^_^@)，下面都是收费的扩展包，而且是美元！)：</p>
<ul>
<li>
<a href="https://codecanyon.net/item/laravel-crud-cms-sximo-5-lts/11893533?ref=ericbarnes" rel="nofollow noreferrer" target="_blank">Laravel CRUD – CMS – Sximo 5 LTS</a>($24)</li>
<li>
<a href="https://codecanyon.net/item/josh-laravel-admin-template-front-end-crud/8754542?ref=ericbarnes" rel="nofollow noreferrer" target="_blank">Josh – Laravel Admin Template + Front End + CRUD</a>($25)</li>
<li>
<a href="https://codecanyon.net/item/admin-architect-administration-framework-for-laravel/13528564?ref=ericbarnes" rel="nofollow noreferrer" target="_blank">Admin Architect – Administration Framework for Laravel </a>($29)</li>
</ul>
<p>接下来就写完了，这些都是可行的选择，我发现创建你的 laravel 管理面板（几乎）不用写代码。</p>
<ul>
<li>作者 <a href="https://github.com/laraveldaily" rel="nofollow noreferrer" target="_blank">PovilasKorop</a> 写于 2017 年 4 月 1号</li>
<li>译者 <a href="https://github.com/todayqq" rel="nofollow noreferrer" target="_blank">angkee</a>
</li>
</ul>
<p>这是一篇译文，原文地址是 <a href="https://laravel-news.com/13-laravel-admin-panel-generators." rel="nofollow noreferrer" target="_blank">https://laravel-news.com/13-l...</a> 英语好的小伙伴，可以直接去看原文。</p>
<p>文章中提到的扩展包我基本都有用过，尤其是 Z-song 开发的 Laravel-admin，在接下来更新的文章中，我会再详细去写这些扩展包的优点和缺点。</p>
<p>我的英文水平有限，翻译的内容会稍有偏差，希望小伙伴们多多包涵。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
13 个快速构建 Laravel 后台的扩展包

## 原文链接
[https://segmentfault.com/a/1190000012312100](https://segmentfault.com/a/1190000012312100)

