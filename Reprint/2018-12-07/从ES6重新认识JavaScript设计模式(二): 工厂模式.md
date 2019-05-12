---
title: '从ES6重新认识JavaScript设计模式(二): 工厂模式' 
date: 2018-12-07 2:30:09
hidden: true
slug: sue7y1hhiy
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 什么是工厂模式?</h2>
<p>工厂模式是用来创建对象的一种最常用的设计模式。我们不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。工厂模式根据抽象程度的不同可以分为：简单工厂，工厂方法和抽象工厂。</p>
<p>如果只接触过JavaScript这门语言的的人可能会对<code>抽象</code>这个词的概念有点模糊，因为JavaScript一直将<code>abstract</code>作为保留字而没有去实现它。如果不能很好的理解<code>抽象</code>的概念，那么就很难理解工厂模式中的三种方法的异同。所以，我们先以一个场景去简单的讲述一下抽象和工厂的概念。</p>
<blockquote>想象一下你的女朋友生日要到了，你想知道她想要什么，于是你问她：“亲爱的，生日要到了你想要什么生日礼物啊？”<p>正巧你女朋友是个猫奴，最经迷上了抖音上的一只超级可爱的苏格兰折耳猫，她也很想要一只网红同款猫。</p>
<p>于是她回答你说：“亲爱的，我想要一只动物。”</p>
<p>你心平气和的问她：“想要什么<strong>动物</strong>啊？” </p>
<p>你女友说：“我想要<strong>猫科动物</strong>。”</p>
<p>这时你内心就纳闷了，猫科动物有老虎，狮子，豹子，猞猁，还有各种小猫，我哪里知道你要什么？</p>
<p>于是你问女友：“你要哪种猫科动物啊？”  </p>
<p>“笨死了，还要哪种，肯定是小猫咪啊，难道我们家还能像迪拜土豪那样养老虎啊！”你女朋友答道。</p>
<p>“好好， 那你想要哪个<strong>品种</strong>的猫呢？”你问道</p>
<p>“我想要外国的品种, 不要中国的土猫” 你女友傲娇的回答到。</p>
<p>这时你已经快奔溃了，作为程序员的你再也受不了这种挤牙膏式的提问，于是你哀求到：“亲爱的，你就直接告诉我你到底想要哪个品种，哪个颜色，多大的猫？”</p>
<p>你女友想了想抖音的那只猫，回答道：“我想要一只灰色的，不超过1岁的苏格兰短耳猫！”</p>
<p>于是，你在女友生日当天到全国最大的<strong>宠物批发市场</strong>里面去，挑了<strong>一只“灰色的，不超过1岁的苏格兰短耳猫”</strong>回家送给了你女友, 圆了你女友拥有网红同款猫的梦想!</p>
</blockquote>
<p>上面中你最终买到并送给女友<strong>那只猫</strong>可以被看作是一个<strong>实例对象</strong>，<strong>宠物批发市场</strong>可以看作是一个<strong>工厂</strong>，我们可以认为它是一个函数，这个工厂函数里面有着各种各样的动物，那么你是如何获取到实例的呢？因为你给宠物批发市场传递了正确的<strong>参数</strong>, <strong>“color: 灰色”</strong>，<strong>“age: 不超过1岁”</strong>，<strong>"breed:苏格兰短耳"</strong>，**“category： <br>猫"<strong>。前面的对话中, 你女朋友回答“动物”，“猫科动物”，“国外的品种”让你不明白她到底想要什么，就是因为她说得太抽象了。她回答的是一大类动物的共有特征而不是具体动物，这种将复杂事物的一个或多个共有特征抽取出来的思维过程就是</strong>抽象**。</p>
<p>既然已经明白了抽象的概念，下面我们来看一下之前提到的工厂模式的三种实现方法： 简单工厂模式、工厂方法模式、抽象工厂模式。</p>
<h3 id="articleHeader1">1.1 简单工厂模式</h3>
<p>简单工厂模式又叫静态工厂模式，由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象。</p>
<p>在实际的项目中，我们常常需要根据用户的权限来渲染不同的页面，高级权限的用户所拥有的页面有些是无法被低级权限的用户所查看。所以我们可以在不同权限等级用户的构造函数中，保存该用户能够看到的页面。在根据权限实例化用户。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let UserFactory = function (role) {
  function SuperAdmin() {
    this.name = &quot;超级管理员&quot;,
    this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
  }
  function Admin() {
    this.name = &quot;管理员&quot;,
    this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
  }
  function NormalUser() {
    this.name = '普通用户',
    this.viewPage = ['首页', '通讯录', '发现页']
  }

  switch (role) {
    case 'superAdmin':
      return new SuperAdmin();
      break;
    case 'admin':
      return new Admin();
      break;
    case 'user':
      return new NormalUser();
      break;
    default:
      throw new Error('参数错误, 可选参数:superAdmin、admin、user');
  }
}

//调用
let superAdmin = UserFactory('superAdmin');
let admin = UserFactory('admin') 
let normalUser = UserFactory('user')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> UserFactory = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">role</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SuperAdmin</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"超级管理员"</span>,
    <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>, <span class="hljs-string">'权限管理'</span>]
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Admin</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"管理员"</span>,
    <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>]
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NormalUser</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'普通用户'</span>,
    <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>]
  }

  <span class="hljs-keyword">switch</span> (role) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'superAdmin'</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> SuperAdmin();
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'admin'</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Admin();
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'user'</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> NormalUser();
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数错误, 可选参数:superAdmin、admin、user'</span>);
  }
}

<span class="hljs-comment">//调用</span>
<span class="hljs-keyword">let</span> superAdmin = UserFactory(<span class="hljs-string">'superAdmin'</span>);
<span class="hljs-keyword">let</span> admin = UserFactory(<span class="hljs-string">'admin'</span>) 
<span class="hljs-keyword">let</span> normalUser = UserFactory(<span class="hljs-string">'user'</span>)</code></pre>
<p><code>UserFactory</code>就是一个简单工厂，在该函数中有3个构造函数分别对应不同的权限的用户。当我们调用工厂函数时，只需要传递<code>superAdmin</code>, <code>admin</code>, <code>user</code>这三个可选参数中的一个获取对应的实例对象。你也许发现，我们的这三类用户的构造函数内部很相识，我们还可以对其进行优化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let UserFactory = function (role) {
  function User(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  switch (role) {
    case 'superAdmin':
      return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
      break;
    case 'admin':
      return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
      break;
    case 'user':
      return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
      break;
    default:
      throw new Error('参数错误, 可选参数:superAdmin、admin、user')
  }
}

//调用
let superAdmin = UserFactory('superAdmin');
let admin = UserFactory('admin') 
let normalUser = UserFactory('user')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> UserFactory = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">role</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span>(<span class="hljs-params">opt</span>) </span>{
    <span class="hljs-keyword">this</span>.name = opt.name;
    <span class="hljs-keyword">this</span>.viewPage = opt.viewPage;
  }

  <span class="hljs-keyword">switch</span> (role) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'superAdmin'</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> User({ <span class="hljs-attr">name</span>: <span class="hljs-string">'超级管理员'</span>, <span class="hljs-attr">viewPage</span>: [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>, <span class="hljs-string">'权限管理'</span>] });
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'admin'</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> User({ <span class="hljs-attr">name</span>: <span class="hljs-string">'管理员'</span>, <span class="hljs-attr">viewPage</span>: [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>] });
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'user'</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> User({ <span class="hljs-attr">name</span>: <span class="hljs-string">'普通用户'</span>, <span class="hljs-attr">viewPage</span>: [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>] });
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数错误, 可选参数:superAdmin、admin、user'</span>)
  }
}

<span class="hljs-comment">//调用</span>
<span class="hljs-keyword">let</span> superAdmin = UserFactory(<span class="hljs-string">'superAdmin'</span>);
<span class="hljs-keyword">let</span> admin = UserFactory(<span class="hljs-string">'admin'</span>) 
<span class="hljs-keyword">let</span> normalUser = UserFactory(<span class="hljs-string">'user'</span>)</code></pre>
<p>简单工厂的优点在于，你只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节。但是在函数内包含了所有对象的创建逻辑（构造函数）和判断逻辑的代码，每增加新的构造函数还需要修改判断逻辑代码。当我们的对象不是上面的3个而是30个或更多时，这个函数会成为一个庞大的超级函数，便得难以维护。所以，简单工厂只能作用于<strong>创建的对象数量较少，对象的创建逻辑不复杂时使用</strong>。</p>
<h3 id="articleHeader2">1.2 工厂方法模式</h3>
<p>工厂方法模式的本意是将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类。但是在JavaScript中很难像传统面向对象那样去实现创建抽象类。所以在JavaScript中我们只需要参考它的核心思想即可。我们可以将工厂方法看作是一个实例化对象的工厂类。</p>
<p>在简单工厂模式中，我们每添加一个构造函数需要修改两处代码。现在我们使用工厂方法模式改造上面的代码，刚才提到，工厂方法我们只把它看作是一个实例化对象的工厂，它只做实例化对象这一件事情！ 我们采用安全模式创建对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//安全模式创建的工厂方法函数
let UserFactory = function(role) {
  if(this instanceof UserFactory) {
    var s = new this[role]();
    return s;
  } else {
    return new UserFactory(role);
  }
}

//工厂方法函数的原型中设置所有对象的构造函数
UserFactory.prototype = {
  SuperAdmin: function() {
    this.name = &quot;超级管理员&quot;,
    this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
  },
  Admin: function() {
    this.name = &quot;管理员&quot;,
    this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
  },
  NormalUser: function() {
    this.name = '普通用户',
    this.viewPage = ['首页', '通讯录', '发现页']
  }
}

//调用
let superAdmin = UserFactory('SuperAdmin');
let admin = UserFactory('Admin') 
let normalUser = UserFactory('NormalUser')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//安全模式创建的工厂方法函数</span>
<span class="hljs-keyword">let</span> UserFactory = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">role</span>) </span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> UserFactory) {
    <span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>[role]();
    <span class="hljs-keyword">return</span> s;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> UserFactory(role);
  }
}

<span class="hljs-comment">//工厂方法函数的原型中设置所有对象的构造函数</span>
UserFactory.prototype = {
  <span class="hljs-attr">SuperAdmin</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"超级管理员"</span>,
    <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>, <span class="hljs-string">'权限管理'</span>]
  },
  <span class="hljs-attr">Admin</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"管理员"</span>,
    <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>]
  },
  <span class="hljs-attr">NormalUser</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'普通用户'</span>,
    <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>]
  }
}

<span class="hljs-comment">//调用</span>
<span class="hljs-keyword">let</span> superAdmin = UserFactory(<span class="hljs-string">'SuperAdmin'</span>);
<span class="hljs-keyword">let</span> admin = UserFactory(<span class="hljs-string">'Admin'</span>) 
<span class="hljs-keyword">let</span> normalUser = UserFactory(<span class="hljs-string">'NormalUser'</span>)</code></pre>
<p>上面的这段代码就很好的解决了每添加一个构造函数就需要修改两处代码的问题，如果我们需要添加新的角色，只需要在<code>UserFactory.prototype</code>中添加。例如，我们需要添加一个<code>VipUser</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="UserFactory.prototype = {
  //....
  VipUser: function() {
    this.name = '付费用户',    
    this.viewPage = ['首页', '通讯录', '发现页', 'VIP页']
  }
}

//调用
let vipUser = UserFactory('VipUser');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">UserFactory.prototype = {
  <span class="hljs-comment">//....</span>
  VipUser: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'付费用户'</span>,    
    <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'VIP页'</span>]
  }
}

<span class="hljs-comment">//调用</span>
<span class="hljs-keyword">let</span> vipUser = UserFactory(<span class="hljs-string">'VipUser'</span>);</code></pre>
<p>上面的这段代码中，使用到的安全模式可能很难一次就能理解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let UserFactory = function(role) {
  if(this instanceof UserFactory) {
    var s = new this[role]();
    return s;
  } else {
    return new UserFactory(role);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> UserFactory = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">role</span>) </span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> UserFactory) {
    <span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>[role]();
    <span class="hljs-keyword">return</span> s;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> UserFactory(role);
  }
}</code></pre>
<p>因为我们将<code>SuperAdmin</code>、<code>Admin</code>、<code>NormalUser</code>等构造函数保存到了<code>UserFactory.prototype</code>中，也就意味着我们必须实例化<code>UserFactory</code>函数才能够进行以上对象的实例化。如下面代码所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let UserFactory = function() {}

UserFactory.prototype = {
 //...
}

//调用
let factory = new UserFactory();
let superAdmin = new factory.SuperAdmin();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> UserFactory = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}

UserFactory.prototype = {
 <span class="hljs-comment">//...</span>
}

<span class="hljs-comment">//调用</span>
<span class="hljs-keyword">let</span> factory = <span class="hljs-keyword">new</span> UserFactory();
<span class="hljs-keyword">let</span> superAdmin = <span class="hljs-keyword">new</span> factory.SuperAdmin();</code></pre>
<p>在上面的调用函数的过程中, 一旦我们在任何阶段忘记使用<code>new</code>, 那么就无法正确获取到<code>superAdmin</code>这个对象。但是一旦使用安全模式去进行实例化，就能很好解决上面的问题。</p>
<h3 id="articleHeader3">1.3 抽象工厂模式</h3>
<p>上面介绍了简单工厂模式和工厂方法模式都是直接生成实例，但是抽象工厂模式不同，抽象工厂模式并不直接生成实例， 而是用于对产品类簇的创建。</p>
<p>上面例子中的<code>superAdmin</code>，<code>admin</code>，<code>user</code>三种用户角色，其中<code>user</code>可能是使用不同的社交媒体账户进行注册的，例如：<code>wechat</code>，<code>qq</code>，<code>weibo</code>。那么这三类社交媒体账户就是对应的类簇。在抽象工厂中，类簇一般用父类定义，并在父类中定义一些抽象方法，再通过抽象工厂让子类继承父类。所以，抽象工厂其实是<strong>实现子类继承父类的方法</strong>。</p>
<p>上面提到的抽象方法是指声明但不能使用的方法。在其他传统面向对象的语言中常用<code>abstract</code>进行声明，但是在JavaScript中，<code>abstract</code>是属于保留字，但是我们可以通过在类的方法中抛出错误来模拟抽象类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let WechatUser = function() {}
WechatUser.prototype = {
  getName: function() {
    return new Error('抽象方法不能调用');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> WechatUser = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
WechatUser.prototype = {
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象方法不能调用'</span>);
  }
}</code></pre>
<p>上述代码中的<code>getPrice</code>就是抽象方法，我们定义它但是却没有去实现。如果子类继承<code>WechatUser</code>但是并没有去重写<code>getName</code>，那么子类的实例化对象就会调用父类的<code>getName</code>方法并抛出错误提示。</p>
<p>下面我们分别来实现账号管理的抽象工厂方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let AccountAbstractFactory = function(subType, superType) {
  //判断抽象工厂中是否有该抽象类
  if(typeof AccountAbstractFactory[superType] === 'function') {
    //缓存类
    function F() {};
    //继承父类属性和方法
    F.prototype = new AccountAbstractFactory[superType] ();
    //将子类的constructor指向子类
    subType.constructor = subType;
    //子类原型继承父类
    subType.prototype = new F();

  } else {
    throw new Error('抽象类不存在!')
  }
}

//微信用户抽象类
AccountAbstractFactory.WechatUser = function() {
  this.type = 'wechat';
}
AccountAbstractFactory.WechatUser.prototype = {
  getName: function() {
    return new Error('抽象方法不能调用');
  }
}

//qq用户抽象类
AccountAbstractFactory.QqUser = function() {
  this.type = 'qq';
}
AccountAbstractFactory.QqUser.prototype = {
  getName: function() {
    return new Error('抽象方法不能调用');
  }
}

//新浪微博用户抽象类
AccountAbstractFactory.WeiboUser = function() {
  this.type = 'weibo';
}
AccountAbstractFactory.WeiboUser.prototype = {
  getName: function() {
    return new Error('抽象方法不能调用');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> AccountAbstractFactory = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">subType, superType</span>) </span>{
  <span class="hljs-comment">//判断抽象工厂中是否有该抽象类</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> AccountAbstractFactory[superType] === <span class="hljs-string">'function'</span>) {
    <span class="hljs-comment">//缓存类</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{};
    <span class="hljs-comment">//继承父类属性和方法</span>
    F.prototype = <span class="hljs-keyword">new</span> AccountAbstractFactory[superType] ();
    <span class="hljs-comment">//将子类的constructor指向子类</span>
    subType.constructor = subType;
    <span class="hljs-comment">//子类原型继承父类</span>
    subType.prototype = <span class="hljs-keyword">new</span> F();

  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象类不存在!'</span>)
  }
}

<span class="hljs-comment">//微信用户抽象类</span>
AccountAbstractFactory.WechatUser = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'wechat'</span>;
}
AccountAbstractFactory.WechatUser.prototype = {
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象方法不能调用'</span>);
  }
}

<span class="hljs-comment">//qq用户抽象类</span>
AccountAbstractFactory.QqUser = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'qq'</span>;
}
AccountAbstractFactory.QqUser.prototype = {
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象方法不能调用'</span>);
  }
}

<span class="hljs-comment">//新浪微博用户抽象类</span>
AccountAbstractFactory.WeiboUser = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'weibo'</span>;
}
AccountAbstractFactory.WeiboUser.prototype = {
  <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象方法不能调用'</span>);
  }
}</code></pre>
<p><code>AccountAbstractFactory </code>就是一个抽象工厂方法，该方法在参数中传递子类和父类，在方法体内部实现了子类对父类的继承。对抽象工厂方法添加抽象类的方法我们是通过点语法进行添加的。</p>
<p>下面我们来定义普通用户的子类:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//普通微信用户子类
function UserOfWechat(name) {
  this.name = name;
  this.viewPage = ['首页', '通讯录', '发现页']
}
//抽象工厂实现WechatUser类的继承
AccountAbstractFactory(UserOfWechat, 'WechatUser');
//子类中重写抽象方法
UserOfWechat.prototype.getName = function() {
  return this.name;
}

//普通qq用户子类
function UserOfQq(name) {
  this.name = name;
  this.viewPage = ['首页', '通讯录', '发现页']
}
//抽象工厂实现QqUser类的继承
AccountAbstractFactory(UserOfQq, 'QqUser');
//子类中重写抽象方法
UserOfQq.prototype.getName = function() {
  return this.name;
}

//普通微博用户子类
function UserOfWeibo(name) {
  this.name = name;
  this.viewPage = ['首页', '通讯录', '发现页']
}
//抽象工厂实现WeiboUser类的继承
AccountAbstractFactory(UserOfWeibo, 'WeiboUser');
//子类中重写抽象方法
UserOfWeibo.prototype.getName = function() {
  return this.name;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//普通微信用户子类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UserOfWechat</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>]
}
<span class="hljs-comment">//抽象工厂实现WechatUser类的继承</span>
AccountAbstractFactory(UserOfWechat, <span class="hljs-string">'WechatUser'</span>);
<span class="hljs-comment">//子类中重写抽象方法</span>
UserOfWechat.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}

<span class="hljs-comment">//普通qq用户子类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UserOfQq</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>]
}
<span class="hljs-comment">//抽象工厂实现QqUser类的继承</span>
AccountAbstractFactory(UserOfQq, <span class="hljs-string">'QqUser'</span>);
<span class="hljs-comment">//子类中重写抽象方法</span>
UserOfQq.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}

<span class="hljs-comment">//普通微博用户子类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UserOfWeibo</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.viewPage = [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>]
}
<span class="hljs-comment">//抽象工厂实现WeiboUser类的继承</span>
AccountAbstractFactory(UserOfWeibo, <span class="hljs-string">'WeiboUser'</span>);
<span class="hljs-comment">//子类中重写抽象方法</span>
UserOfWeibo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
}</code></pre>
<p>上述代码我们分别定义了<code>UserOfWechat</code>，<code>UserOfQq</code>，<code>UserOfWeibo</code>三种类。这三个类作为子类通过抽象工厂方法实现继承。特别需要注意的是，调用抽象工厂方法后不要忘记重写抽象方法，否则在子类的实例中调用抽象方法会报错。</p>
<p>我们来分别对这三种类进行实例化，检测抽象工厂方法是实现了类簇的管理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//实例化微信用户
let wechatUserA = new UserOfWechat('微信小李');
console.log(wechatUserA.getName(), wechatUserA.type); //微信小李 wechat
let wechatUserB = new UserOfWechat('微信小王');
console.log(wechatUserB.getName(), wechatUserB.type); //微信小王 wechat

//实例化qq用户
let qqUserA = new UserOfQq('QQ小李');
console.log(qqUserA.getName(), qqUserA.type); //QQ小李 qq
let qqUserB = new UserOfQq('QQ小王');
console.log(qqUserB.getName(), qqUserB.type); //QQ小王 qq

//实例化微博用户
let weiboUserA =new UserOfWeibo('微博小李');
console.log(weiboUserA.getName(), weiboUserA.type); //微博小李 weibo
let weiboUserB =new UserOfWeibo('微博小王');
console.log(weiboUserB.getName(), weiboUserB.type); //微博小王 weibo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code class="JavaScripts"><span class="hljs-comment">//实例化微信用户</span>
<span class="hljs-keyword">let</span> wechatUserA = <span class="hljs-keyword">new</span> UserOfWechat('微信小李');
console.<span class="hljs-built_in">log</span>(wechatUserA.<span class="hljs-built_in">getName</span>(), wechatUserA.<span class="hljs-built_in">type</span>); <span class="hljs-comment">//微信小李 wechat</span>
<span class="hljs-keyword">let</span> wechatUserB = <span class="hljs-keyword">new</span> UserOfWechat('微信小王');
console.<span class="hljs-built_in">log</span>(wechatUserB.<span class="hljs-built_in">getName</span>(), wechatUserB.<span class="hljs-built_in">type</span>); <span class="hljs-comment">//微信小王 wechat</span>

<span class="hljs-comment">//实例化qq用户</span>
<span class="hljs-keyword">let</span> qqUserA = <span class="hljs-keyword">new</span> UserOfQq('QQ小李');
console.<span class="hljs-built_in">log</span>(qqUserA.<span class="hljs-built_in">getName</span>(), qqUserA.<span class="hljs-built_in">type</span>); <span class="hljs-comment">//QQ小李 qq</span>
<span class="hljs-keyword">let</span> qqUserB = <span class="hljs-keyword">new</span> UserOfQq('QQ小王');
console.<span class="hljs-built_in">log</span>(qqUserB.<span class="hljs-built_in">getName</span>(), qqUserB.<span class="hljs-built_in">type</span>); <span class="hljs-comment">//QQ小王 qq</span>

<span class="hljs-comment">//实例化微博用户</span>
<span class="hljs-keyword">let</span> weiboUserA =<span class="hljs-keyword">new</span> UserOfWeibo('微博小李');
console.<span class="hljs-built_in">log</span>(weiboUserA.<span class="hljs-built_in">getName</span>(), weiboUserA.<span class="hljs-built_in">type</span>); <span class="hljs-comment">//微博小李 weibo</span>
<span class="hljs-keyword">let</span> weiboUserB =<span class="hljs-keyword">new</span> UserOfWeibo('微博小王');
console.<span class="hljs-built_in">log</span>(weiboUserB.<span class="hljs-built_in">getName</span>(), weiboUserB.<span class="hljs-built_in">type</span>); <span class="hljs-comment">//微博小王 weibo</span></code></pre>
<p>从打印结果上看，<code>AccountAbstractFactory</code>这个抽象工厂很好的实现了它的作用，将不同用户账户按照社交媒体这一个类簇进行了分类。这就是抽象工厂的作用，它不直接创建实例，而是通过类的继承进行类簇的管理。抽象工厂模式一般用在多人协作的超大型项目中，并且严格的要求项目以面向对象的思想进行完成。</p>
<h2 id="articleHeader4">2 ES6中的工厂模式</h2>
<p>ES6中给我们提供了<code>class</code>新语法，虽然<code>class</code>本质上是一颗语法糖，并也没有改变JavaScript是使用原型继承的语言，但是确实让对象的创建和继承的过程变得更加的清晰和易读。下面我们使用ES6的新语法来重写上面的例子。</p>
<h3 id="articleHeader5">2.1 ES6重写简单工厂模式</h3>
<p>使用ES6重写简单工厂模式时，我们不再使用构造函数创建对象，而是使用<code>class</code>的新语法，并使用<code>static</code>关键字将简单工厂封装到<code>User</code>类的静态方法中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//User类
class User {
  //构造器
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  //静态方法
  static getInstance(role) {
    switch (role) {
      case 'superAdmin':
        return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
        break;
      case 'admin':
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
        break;
      case 'user':
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

//调用
let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//User类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
  <span class="hljs-comment">//构造器</span>
  <span class="hljs-keyword">constructor</span>(opt) {
    <span class="hljs-keyword">this</span>.name = opt.name;
    <span class="hljs-keyword">this</span>.viewPage = opt.viewPage;
  }

  <span class="hljs-comment">//静态方法</span>
  <span class="hljs-keyword">static</span> getInstance(role) {
    <span class="hljs-keyword">switch</span> (role) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'superAdmin'</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> User({ <span class="hljs-attr">name</span>: <span class="hljs-string">'超级管理员'</span>, <span class="hljs-attr">viewPage</span>: [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>, <span class="hljs-string">'权限管理'</span>] });
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'admin'</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> User({ <span class="hljs-attr">name</span>: <span class="hljs-string">'管理员'</span>, <span class="hljs-attr">viewPage</span>: [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>] });
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'user'</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> User({ <span class="hljs-attr">name</span>: <span class="hljs-string">'普通用户'</span>, <span class="hljs-attr">viewPage</span>: [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>] });
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>:
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数错误, 可选参数:superAdmin、admin、user'</span>)
    }
  }
}

<span class="hljs-comment">//调用</span>
<span class="hljs-keyword">let</span> superAdmin = User.getInstance(<span class="hljs-string">'superAdmin'</span>);
<span class="hljs-keyword">let</span> admin = User.getInstance(<span class="hljs-string">'admin'</span>);
<span class="hljs-keyword">let</span> normalUser = User.getInstance(<span class="hljs-string">'user'</span>);</code></pre>
<h3 id="articleHeader6">2.2 ES6重写工厂方法模式</h3>
<p>在上文中我们提到，工厂方法模式的本意是将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类。但是JavaScript的<code>abstract</code>是一个保留字，并没有提供抽象类，所以之前我们只是借鉴了工厂方法模式的核心思想。</p>
<p>虽然ES6也没有实现<code>abstract</code>，但是我们可以使用<code>new.target</code>来模拟出抽象类。<code>new.target</code>指向直接被<code>new</code>执行的构造函数，我们对<code>new.target</code>进行判断，如果指向了该类则抛出错误来使得该类成为抽象类。下面我们来改造代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class User {
  constructor(name = '', viewPage = []) {
    if(new.target === User) {
      throw new Error('抽象类不能实例化!');
    }
    this.name = name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage)
  }
  create(role) {
    switch (role) {
      case 'superAdmin': 
        return new UserFactory( '超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理'] );
        break;
      case 'admin':
        return new UserFactory( '普通用户', ['首页', '通讯录', '发现页'] );
        break;
      case 'user':
        return new UserFactory( '普通用户', ['首页', '通讯录', '发现页'] );
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
let admin = userFactory.create('admin');
let user = userFactory.create('user');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
  <span class="hljs-keyword">constructor</span>(name = '', viewPage = []) {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span>.target === User) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象类不能实例化!'</span>);
    }
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.viewPage = viewPage;
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserFactory</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">User</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, viewPage) {
    <span class="hljs-keyword">super</span>(name, viewPage)
  }
  create(role) {
    <span class="hljs-keyword">switch</span> (role) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'superAdmin'</span>: 
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> UserFactory( <span class="hljs-string">'超级管理员'</span>, [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>, <span class="hljs-string">'应用数据'</span>, <span class="hljs-string">'权限管理'</span>] );
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'admin'</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> UserFactory( <span class="hljs-string">'普通用户'</span>, [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>] );
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">'user'</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> UserFactory( <span class="hljs-string">'普通用户'</span>, [<span class="hljs-string">'首页'</span>, <span class="hljs-string">'通讯录'</span>, <span class="hljs-string">'发现页'</span>] );
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>:
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数错误, 可选参数:superAdmin、admin、user'</span>)
    }
  }
}

<span class="hljs-keyword">let</span> userFactory = <span class="hljs-keyword">new</span> UserFactory();
<span class="hljs-keyword">let</span> superAdmin = userFactory.create(<span class="hljs-string">'superAdmin'</span>);
<span class="hljs-keyword">let</span> admin = userFactory.create(<span class="hljs-string">'admin'</span>);
<span class="hljs-keyword">let</span> user = userFactory.create(<span class="hljs-string">'user'</span>);</code></pre>
<h3 id="articleHeader7">2.3 ES6重写抽象工厂模式</h3>
<p>抽象工厂模式并不直接生成实例， 而是用于对产品类簇的创建。我们同样使用<code>new.target</code>语法来模拟抽象类，并通过继承的方式创建出<code>UserOfWechat</code>, <code>UserOfQq</code>, <code>UserOfWeibo</code>这一系列子类类簇。使用<code>getAbstractUserFactor</code>来返回指定的类簇。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class User {
  constructor(type) {
    if (new.target === User) {
      throw new Error('抽象类不能实例化!')
    }
    this.type = type;
  }
}

class UserOfWechat extends User {
  constructor(name) {
    super('wechat');
    this.name = name;
    this.viewPage = ['首页', '通讯录', '发现页']
  }
}

class UserOfQq extends User {
  constructor(name) {
    super('qq');
    this.name = name;
    this.viewPage = ['首页', '通讯录', '发现页']
  }
}

class UserOfWeibo extends User {
  constructor(name) {
    super('weibo');
    this.name = name;
    this.viewPage = ['首页', '通讯录', '发现页']
  }
}

function getAbstractUserFactory(type) {
  switch (type) {
    case 'wechat':
      return UserOfWechat;
      break;
    case 'qq':
      return UserOfQq;
      break;
    case 'weibo':
      return UserOfWeibo;
      break;
    default:
      throw new Error('参数错误, 可选参数:superAdmin、admin、user')
  }
}

let WechatUserClass = getAbstractUserFactory('wechat');
let QqUserClass = getAbstractUserFactory('qq');
let WeiboUserClass = getAbstractUserFactory('weibo');

let wechatUser = new WechatUserClass('微信小李');
let qqUser = new QqUserClass('QQ小李');
let weiboUser = new WeiboUserClass('微博小李');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">User</span> </span>{
  constructor(<span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span>.target === <span class="hljs-type">User</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>('抽象类不能实例化!')
    }
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">type</span> = <span class="hljs-class"><span class="hljs-keyword">type</span></span>;
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserOfWechat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">User</span> </span>{
  constructor(name) {
    <span class="hljs-keyword">super</span>(<span class="hljs-symbol">'wecha</span>t');
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.viewPage = ['首页', '通讯录', '发现页']
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserOfQq</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">User</span> </span>{
  constructor(name) {
    <span class="hljs-keyword">super</span>(<span class="hljs-symbol">'q</span>q');
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.viewPage = ['首页', '通讯录', '发现页']
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserOfWeibo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">User</span> </span>{
  constructor(name) {
    <span class="hljs-keyword">super</span>(<span class="hljs-symbol">'weib</span>o');
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.viewPage = ['首页', '通讯录', '发现页']
  }
}

function getAbstractUserFactory(<span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
  switch (<span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
    <span class="hljs-keyword">case</span> <span class="hljs-symbol">'wecha</span>t':
      <span class="hljs-keyword">return</span> <span class="hljs-type">UserOfWechat</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-symbol">'q</span>q':
      <span class="hljs-keyword">return</span> <span class="hljs-type">UserOfQq</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-symbol">'weib</span>o':
      <span class="hljs-keyword">return</span> <span class="hljs-type">UserOfWeibo</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>('参数错误, 可选参数:superAdmin、admin、user')
  }
}

let <span class="hljs-type">WechatUserClass</span> = getAbstractUserFactory(<span class="hljs-symbol">'wecha</span>t');
let <span class="hljs-type">QqUserClass</span> = getAbstractUserFactory(<span class="hljs-symbol">'q</span>q');
let <span class="hljs-type">WeiboUserClass</span> = getAbstractUserFactory(<span class="hljs-symbol">'weib</span>o');

let wechatUser = <span class="hljs-keyword">new</span> <span class="hljs-type">WechatUserClass</span>('微信小李');
let qqUser = <span class="hljs-keyword">new</span> <span class="hljs-type">QqUserClass</span>(<span class="hljs-symbol">'QQ</span>小李');
let weiboUser = <span class="hljs-keyword">new</span> <span class="hljs-type">WeiboUserClass</span>('微博小李');</code></pre>
<h2 id="articleHeader8">3 工厂模式的项目实战应用</h2>
<p>在实际的前端业务中，最常用的简单工厂模式。如果不是超大型的项目，是很难有机会使用到工厂方法模式和抽象工厂方法模式的。下面我介绍在Vue项目中实际使用到的简单工厂模式的应用。</p>
<p>在普通的vue + vue-router的项目中，我们通常将所有的路由写入到<code>router/index.js</code>这个文件中。下面的代码我相信vue的开发者会非常熟悉，总共有5个页面的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js

import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import SuperAdmin from '../components/SuperAdmin.vue'
import NormalAdmin from '../components/Admin.vue'
import User from '../components/User.vue'
import NotFound404 from '../components/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //重定向到登录页
    {
      path: '/',
      redirect: '/login'
    },
    //登陆页
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //超级管理员页面
    {
      path: '/super-admin',
      name: 'SuperAdmin',
      component: SuperAdmin
    },
    //普通管理员页面
    {
      path: '/normal-admin',
      name: 'NormalAdmin',
      component: NormalAdmin
    },
    //普通用户页面
    {
      path: '/user',
      name: 'User',
      component: User
    },
    //404页面
    {
      path: '*',
      name: 'NotFound404',
      component: NotFound404
    }
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-comment">// index.js</span>

<span class="hljs-keyword">import</span> Vue from 'vue'
<span class="hljs-keyword">import</span> Router from 'vue-router'
<span class="hljs-keyword">import</span> Login from '../components/Login.vue'
<span class="hljs-keyword">import</span> SuperAdmin from '../components/SuperAdmin.vue'
<span class="hljs-keyword">import</span> NormalAdmin from '../components/Admin.vue'
<span class="hljs-keyword">import</span> User from '../components/User.vue'
<span class="hljs-keyword">import</span> NotFound404 from '../components/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    <span class="hljs-comment">//重定向到登录页</span>
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/'</span>,
      redirect: <span class="hljs-string">'/login'</span>
    },
    <span class="hljs-comment">//登陆页</span>
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/login'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'Login'</span>,
      component: Login
    },
    <span class="hljs-comment">//超级管理员页面</span>
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/super-admin'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'SuperAdmin'</span>,
      component: SuperAdmin
    },
    <span class="hljs-comment">//普通管理员页面</span>
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/normal-admin'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'NormalAdmin'</span>,
      component: NormalAdmin
    },
    <span class="hljs-comment">//普通用户页面</span>
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/user'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'User'</span>,
      component: User
    },
    <span class="hljs-comment">//404页面</span>
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'*'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'NotFound404'</span>,
      component: NotFound404
    }
  ]
})
</code></pre>
<p>当涉及权限管理页面的时候，通常需要在用户登陆根据权限开放固定的访问页面并进行相应权限的页面跳转。但是如果我们还是按照老办法将所有的路由写入到<code>router/index.js</code>这个文件中，那么低权限的用户如果知道高权限路由时，可以通过在浏览器上输入url跳转到高权限的页面。所以我们必须在登陆的时候根据权限使用<code>vue-router</code>提供的<code>addRoutes</code>方法给予用户相对应的路由权限。这个时候就可以使用简单工厂方法来改造上面的代码。</p>
<p>在<code>router/index.js</code>文件中，我们只提供<code>/login</code>这一个路由页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.js

import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //重定向到登录页
    {
      path: '/',
      redirect: '/login'
    },
    //登陆页
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//index.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Login.vue'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    <span class="hljs-comment">//重定向到登录页</span>
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/login'</span>
    },
    <span class="hljs-comment">//登陆页</span>
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Login'</span>,
      <span class="hljs-attr">component</span>: Login
    }
  ]
})</code></pre>
<p>我们在<code>router/</code>文件夹下新建一个<code>routerFactory.js</code>文件，导出<code>routerFactory</code>简单工厂函数，用于根据用户权限提供路由权限，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//routerFactory.js

import SuperAdmin from '../components/SuperAdmin.vue'
import NormalAdmin from '../components/Admin.vue'
import User from '../components/User.vue'
import NotFound404 from '../components/404.vue'

let AllRoute = [
  //超级管理员页面
  {
    path: '/super-admin',
    name: 'SuperAdmin',
    component: SuperAdmin
  },
  //普通管理员页面
  {
    path: '/normal-admin',
    name: 'NormalAdmin',
    component: NormalAdmin
  },
  //普通用户页面
  {
    path: '/user',
    name: 'User',
    component: User
  },
  //404页面
  {
    path: '*',
    name: 'NotFound404',
    component: NotFound404
  }
]

let routerFactory = (role) => {
  switch (role) {
    case 'superAdmin':
      return {
        name: 'SuperAdmin',
        route: AllRoute
      };
      break;
    case 'normalAdmin':
      return {
        name: 'NormalAdmin',
        route: AllRoute.splice(1)
      }
      break;
    case 'user':
      return {
        name: 'User',
        route:  AllRoute.splice(2)
      }
      break;
    default: 
      throw new Error('参数错误! 可选参数: superAdmin, normalAdmin, user')
  }
}

export { routerFactory }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//routerFactory.js</span>

<span class="hljs-keyword">import</span> SuperAdmin <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/SuperAdmin.vue'</span>
<span class="hljs-keyword">import</span> NormalAdmin <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Admin.vue'</span>
<span class="hljs-keyword">import</span> User <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/User.vue'</span>
<span class="hljs-keyword">import</span> NotFound404 <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/404.vue'</span>

<span class="hljs-keyword">let</span> AllRoute = [
  <span class="hljs-comment">//超级管理员页面</span>
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/super-admin'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'SuperAdmin'</span>,
    <span class="hljs-attr">component</span>: SuperAdmin
  },
  <span class="hljs-comment">//普通管理员页面</span>
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/normal-admin'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'NormalAdmin'</span>,
    <span class="hljs-attr">component</span>: NormalAdmin
  },
  <span class="hljs-comment">//普通用户页面</span>
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/user'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'User'</span>,
    <span class="hljs-attr">component</span>: User
  },
  <span class="hljs-comment">//404页面</span>
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'NotFound404'</span>,
    <span class="hljs-attr">component</span>: NotFound404
  }
]

<span class="hljs-keyword">let</span> routerFactory = <span class="hljs-function">(<span class="hljs-params">role</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span> (role) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'superAdmin'</span>:
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'SuperAdmin'</span>,
        <span class="hljs-attr">route</span>: AllRoute
      };
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'normalAdmin'</span>:
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'NormalAdmin'</span>,
        <span class="hljs-attr">route</span>: AllRoute.splice(<span class="hljs-number">1</span>)
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'user'</span>:
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'User'</span>,
        <span class="hljs-attr">route</span>:  AllRoute.splice(<span class="hljs-number">2</span>)
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>: 
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'参数错误! 可选参数: superAdmin, normalAdmin, user'</span>)
  }
}

<span class="hljs-keyword">export</span> { routerFactory }</code></pre>
<p>在登陆页导入该方法，请求登陆接口后根据权限添加路由:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Login.vue

import {routerFactory} from '../router/routerFactory.js'
export default {
  //... 
  methods: {
    userLogin() {
      //请求登陆接口, 获取用户权限, 根据权限调用this.getRoute方法
      //..
    },
    
    getRoute(role) {
      //根据权限调用routerFactory方法
      let routerObj = routerFactory(role);
      
      //给vue-router添加该权限所拥有的路由页面
      this.$router.addRoutes(routerObj.route);
      
      //跳转到相应页面
      this.$router.push({name: routerObj.name})
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//Login.vue</span>

<span class="hljs-keyword">import</span> {routerFactory} <span class="hljs-keyword">from</span> <span class="hljs-string">'../router/routerFactory.js'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">//... </span>
  methods: {
    userLogin() {
      <span class="hljs-comment">//请求登陆接口, 获取用户权限, 根据权限调用this.getRoute方法</span>
      <span class="hljs-comment">//..</span>
    },
    
    getRoute(role) {
      <span class="hljs-comment">//根据权限调用routerFactory方法</span>
      <span class="hljs-keyword">let</span> routerObj = routerFactory(role);
      
      <span class="hljs-comment">//给vue-router添加该权限所拥有的路由页面</span>
      <span class="hljs-keyword">this</span>.$router.addRoutes(routerObj.route);
      
      <span class="hljs-comment">//跳转到相应页面</span>
      <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">name</span>: routerObj.name})
    }
  }
};</code></pre>
<p>在实际项目中，因为使用<code>this.$router.addRoutes</code>方法添加的路由刷新后不能保存，所以会导致路由无法访问。通常的做法是本地加密保存用户信息，在刷新后获取本地权限并解密，根据权限重新添加路由。这里因为和工厂模式没有太大的关系就不再赘述。</p>
<h2 id="articleHeader9">总结</h2>
<p>上面说到的三种工厂模式和上文的单例模式一样，都是属于创建型的设计模式。简单工厂模式又叫静态工厂方法，用来创建某一种产品对象的实例，用来创建单一对象；工厂方法模式是将创建实例推迟到子类中进行；抽象工厂模式是对类的工厂抽象用来创建产品类簇，不负责创建某一类产品的实例。在实际的业务中，需要根据实际的业务复杂度来选择合适的模式。对于非大型的前端应用来说，灵活使用简单工厂其实就能解决大部分问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从ES6重新认识JavaScript设计模式(二): 工厂模式

## 原文链接
[https://segmentfault.com/a/1190000014196851](https://segmentfault.com/a/1190000014196851)

