---
title: 'flutter实战1：完成一个有侧边栏的主界面' 
date: 2018-12-10 2:30:07
hidden: true
slug: z9skhjhbaqq
categories: [reprint]
---

{{< raw >}}

                    
<p>经过2周的学习，看过笔记1-8的小伙伴们已经有不少开始自己写APP了，我也按耐不住这股热情，想要自己开发个APP玩玩，so，从本篇起，仿造一个APP，项目从0开始，每篇增加一些内容，一点一点完成这个APP，每次迭代的代码都将上传到我的<a href="https://github.com/teamdevelop/appbyflutter" rel="nofollow noreferrer" target="_blank">git</a>仓库。</p>
<p>鉴于我2周多的Flutter代码经验，代码结构的思维可能没有多年开发经验的老鸟稳，如果有写的不好的地方请大家多多指教。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013805783" src="https://static.alili.tech/img/remote/1460000013805783" alt="本篇需要完成的任务" title="本篇需要完成的任务" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示， 本篇将搭建一个HomePage，再其左上角加入侧边栏入口，并且通过侧边栏可以进入其他页面。</p>
<h2 id="articleHeader0">第一步</h2>
<p>创建项目和文件夹。打开vscode，到一个路径下输入命令：</p>
<blockquote>flutter create appbyflutter</blockquote>
<p>根据图中所示，将项目目录准备好：<br><span class="img-wrap"><img data-src="/img/remote/1460000013805784" src="https://static.alili.tech/img/remote/1460000013805784" alt="程序目录" title="程序目录" style="cursor: pointer; display: inline;"></span></p>
<p>由于第一篇开发用到的东西不多，先简单向项目目录中添加一个<strong>images</strong>文件，用于存放APP默认图片。默认的lib文件夹下添加一个pages文件夹，用于存放每个页面。</p>
<h2 id="articleHeader1">第二步</h2>
<p>将<strong>main.dart</strong>仅作为APP的入口，承担页面入口和路由的功能：<br><span class="img-wrap"><img data-src="/img/remote/1460000013805785" src="https://static.alili.tech/img/remote/1460000013805785" alt="main.dart不写页面代码" title="main.dart不写页面代码" style="cursor: pointer; display: inline;"></span></p>
<p>由于APP不只有一个页面，为了方便维护和管理，所有的页面代码都转移到<strong>pages</strong>文件夹下，<strong>main.dart</strong>中处理APP的主页面入口、路由和一系列需要初始化（如自动登陆、入场动画等）的任务。有过vue、react开发经验的前端大神们应该不陌生，这样做可以使主程序和页面解耦，当然本篇还没有用到路由，暂不书写路由的代码，等不及要了解路由的同学可以参考前端高手<a href="https://www.jianshu.com/u/677f4435c488" rel="nofollow noreferrer" target="_blank">偏罗</a>的<a href="https://www.jianshu.com/p/bb69f81f6236" rel="nofollow noreferrer" target="_blank">第一个APP</a>或者<a href="https://docs.flutter.io/flutter/widgets/Navigator-class.html" rel="nofollow noreferrer" target="_blank">英文阅读理解</a>。</p>
<h2 id="articleHeader2">第三步</h2>
<h3 id="articleHeader3">主页面</h3>
<p>如第一步的图所示，在<strong>pages</strong>文件夹中添加了2个文件：<strong>home_page.dart</strong>和<strong>other_page.dart</strong>，其中<strong>home_page.dart</strong>是这个APP的主页面，<strong>other_page.dart</strong>作为的以后再开发的页面。</p>
<p>注意在第二步的<code>runapp()</code>函数中，用到了<code>MaterialApp()</code>，意味着程序APP所有的页面控件默认配套_Material_风格。</p>
<p>由于主页面会动态引用各种控件，因此_StatefulWidget_类型才可以满足页面需求。从下图中分解一下页面结构：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013805786" src="https://static.alili.tech/img/remote/1460000013805786" alt="主页面结构图解" title="主页面结构图解" style="cursor: pointer;"></span></p>
<p>先看图左中有状态控件<code>HomePage</code>为整个页面的最顶层包裹，其内放入了一个<code>Scaffold</code>脚手架，<code>Scaffold</code>中有非常丰富的属性，可以放入侧边栏按钮<code>Drawer</code>控件、页面标题<code>AppBar</code>控件和<code>body</code>部分，于是贴入以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => new _HomePageState();
}

class _HomePageState extends State<HomePage> {

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(title: new Text(&quot;CYC&quot;), backgroundColor: Colors.redAccent,),  //头部的标题AppBar
      drawer: new Drawer(),  //侧边栏按钮Drawer
      body: new Center(  //中央内容部分body
        child: new Text('HomePage',style: new TextStyle(fontSize: 35.0),),
      ),
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-symbol">'package</span>:flutter/material.dart';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomePage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatefulWidget</span> </span>{
  <span class="hljs-meta">@override</span>
  _HomePageState createState() =&gt; <span class="hljs-keyword">new</span> _HomePageState();
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">_HomePageState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State&lt;HomePage&gt;</span> </span>{

  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Scaffold</span>(
      appBar: <span class="hljs-keyword">new</span> <span class="hljs-type">AppBar</span>(title: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(<span class="hljs-string">"CYC"</span>), backgroundColor: <span class="hljs-type">Colors</span>.redAccent,),  <span class="hljs-comment">//头部的标题AppBar</span>
      drawer: <span class="hljs-keyword">new</span> <span class="hljs-type">Drawer</span>(),  <span class="hljs-comment">//侧边栏按钮Drawer</span>
      body: <span class="hljs-keyword">new</span> <span class="hljs-type">Center</span>(  <span class="hljs-comment">//中央内容部分body</span>
        child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(<span class="hljs-symbol">'HomePag</span>e',style: <span class="hljs-keyword">new</span> <span class="hljs-type">TextStyle</span>(fontSize: <span class="hljs-number">35.0</span>),),
      ),
    );
  }
}
</code></pre>
<p>OK，左图的页面就这么轻松搭建完毕。要实现右图中的展开的侧边栏，很简单，向<code>Drawer</code>控件中塞东西吧。</p>
<h3 id="articleHeader4">侧边栏</h3>
<p>我们先图解一下侧边栏的结构：<br><span class="img-wrap"><img data-src="/img/remote/1460000013805787" src="https://static.alili.tech/img/remote/1460000013805787" alt="侧边栏结构图解" title="侧边栏结构图解" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>整个侧边栏主从上到下按区块分别放置了<strong>账号</strong>和<strong>若干功能项</strong>+分割线的列表，很容易想到使用布局控件<code>ListView</code>。</li>
<li>账号信息区域中有账号头像、粉丝头像、账号文字信息和背景图，这块我们可以使用<strong>Material</strong>控件库的<code>UserAccountsDrawerHeader</code>控件实现。</li>
<li>下面的功能列表项目不用多说，<code>ListTitle</code>控件妥妥的，分割线直接<code>Divider</code>即可。</li>
</ul>
<p>于是，我们向<code>new Drawer()</code>中加入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//侧边栏填充内容
drawer: new Drawer(     //侧边栏按钮Drawer
        child: new ListView(
          children: <Widget>[
            new UserAccountsDrawerHeader(   //Material内置控件
              accountName: new Text('CYC'), //用户名
              accountEmail: new Text('example@126.com'),  //用户邮箱
              currentAccountPicture: new GestureDetector( //用户头像
                onTap: () => print('current user'),
                child: new CircleAvatar(    //圆形图标控件
                  backgroundImage: new NetworkImage('https://upload.jianshu.io/users/upload_avatars/7700793/dbcf94ba-9e63-4fcf-aa77-361644dd5a87?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'),//图片调取自网络
                ),
              ),
              otherAccountsPictures: <Widget>[    //粉丝头像
                new GestureDetector(    //手势探测器，可以识别各种手势，这里只用到了onTap
                  onTap: () => print('other user'), //暂且先打印一下信息吧，以后再添加跳转页面的逻辑
                  child: new CircleAvatar(
                    backgroundImage: new NetworkImage('https://upload.jianshu.io/users/upload_avatars/10878817/240ab127-e41b-496b-80d6-fc6c0c99f291?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'),
                  ),
                ),
                new GestureDetector(
                  onTap: () => print('other user'),
                  child: new CircleAvatar(
                    backgroundImage: new NetworkImage('https://upload.jianshu.io/users/upload_avatars/8346438/e3e45f12-b3c2-45a1-95ac-a608fa3b8960?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'),
                    ),
                ),
              ],
              decoration: new BoxDecoration(    //用一个BoxDecoration装饰器提供背景图片
                image: new DecorationImage(
                  fit: BoxFit.fill,
                  // image: new NetworkImage('https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/lakes/images/lake.jpg')
                  //可以试试图片调取自本地。调用本地资源，需要到pubspec.yaml中配置文件路径
                  image: new ExactAssetImage('images/lake.jpg'),
                ),
              ),
            ),
            new ListTile(   //第一个功能项
              title: new Text('First Page'),
              trailing: new Icon(Icons.arrow_upward),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(new MaterialPageRoute(builder: (BuildContext context) => new SidebarPage()));
              }
            ),
            new ListTile(   //第二个功能项
              title: new Text('Second Page'),
              trailing: new Icon(Icons.arrow_right),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(new MaterialPageRoute(builder: (BuildContext context) => new SidebarPage()));
              } 
            ),
            new ListTile(   //第二个功能项
              title: new Text('Second Page'),
              trailing: new Icon(Icons.arrow_right),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).pushNamed('/a');
              } 
            ),
            new Divider(),    //分割线控件
            new ListTile(   //退出按钮
              title: new Text('Close'),
              trailing: new Icon(Icons.cancel),
              onTap: () => Navigator.of(context).pop(),   //点击后收起侧边栏
            ),
          ],
        ),
      )
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//侧边栏填充内容</span>
drawer: <span class="hljs-keyword">new</span> Drawer(     <span class="hljs-comment">//侧边栏按钮Drawer</span>
        child: <span class="hljs-keyword">new</span> ListView(
          children: &lt;Widget&gt;[
            <span class="hljs-keyword">new</span> UserAccountsDrawerHeader(   <span class="hljs-comment">//Material内置控件</span>
              accountName: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'CYC'</span>), <span class="hljs-comment">//用户名</span>
              accountEmail: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'example@126.com'</span>),  <span class="hljs-comment">//用户邮箱</span>
              currentAccountPicture: <span class="hljs-keyword">new</span> GestureDetector( <span class="hljs-comment">//用户头像</span>
                onTap: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> print(<span class="hljs-string">'current user'</span>),
                child: <span class="hljs-keyword">new</span> CircleAvatar(    <span class="hljs-comment">//圆形图标控件</span>
                  backgroundImage: <span class="hljs-keyword">new</span> NetworkImage(<span class="hljs-string">'https://upload.jianshu.io/users/upload_avatars/7700793/dbcf94ba-9e63-4fcf-aa77-361644dd5a87?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'</span>),<span class="hljs-comment">//图片调取自网络</span>
                ),
              ),
              otherAccountsPictures: &lt;Widget&gt;[    <span class="hljs-comment">//粉丝头像</span>
                <span class="hljs-keyword">new</span> GestureDetector(    <span class="hljs-comment">//手势探测器，可以识别各种手势，这里只用到了onTap</span>
                  onTap: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> print(<span class="hljs-string">'other user'</span>), <span class="hljs-comment">//暂且先打印一下信息吧，以后再添加跳转页面的逻辑</span>
                  child: <span class="hljs-keyword">new</span> CircleAvatar(
                    backgroundImage: <span class="hljs-keyword">new</span> NetworkImage(<span class="hljs-string">'https://upload.jianshu.io/users/upload_avatars/10878817/240ab127-e41b-496b-80d6-fc6c0c99f291?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'</span>),
                  ),
                ),
                <span class="hljs-keyword">new</span> GestureDetector(
                  onTap: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> print(<span class="hljs-string">'other user'</span>),
                  child: <span class="hljs-keyword">new</span> CircleAvatar(
                    backgroundImage: <span class="hljs-keyword">new</span> NetworkImage(<span class="hljs-string">'https://upload.jianshu.io/users/upload_avatars/8346438/e3e45f12-b3c2-45a1-95ac-a608fa3b8960?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'</span>),
                    ),
                ),
              ],
              decoration: <span class="hljs-keyword">new</span> BoxDecoration(    <span class="hljs-comment">//用一个BoxDecoration装饰器提供背景图片</span>
                image: <span class="hljs-keyword">new</span> DecorationImage(
                  fit: BoxFit.fill,
                  <span class="hljs-comment">// image: new NetworkImage('https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/lakes/images/lake.jpg')</span>
                  <span class="hljs-comment">//可以试试图片调取自本地。调用本地资源，需要到pubspec.yaml中配置文件路径</span>
                  image: <span class="hljs-keyword">new</span> ExactAssetImage(<span class="hljs-string">'images/lake.jpg'</span>),
                ),
              ),
            ),
            <span class="hljs-keyword">new</span> ListTile(   <span class="hljs-comment">//第一个功能项</span>
              title: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'First Page'</span>),
              trailing: <span class="hljs-keyword">new</span> Icon(Icons.arrow_upward),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(<span class="hljs-keyword">new</span> MaterialPageRoute(builder: <span class="hljs-function">(<span class="hljs-params">BuildContext context</span>) =&gt;</span> <span class="hljs-keyword">new</span> SidebarPage()));
              }
            ),
            <span class="hljs-keyword">new</span> ListTile(   <span class="hljs-comment">//第二个功能项</span>
              title: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'Second Page'</span>),
              trailing: <span class="hljs-keyword">new</span> Icon(Icons.arrow_right),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(<span class="hljs-keyword">new</span> MaterialPageRoute(builder: <span class="hljs-function">(<span class="hljs-params">BuildContext context</span>) =&gt;</span> <span class="hljs-keyword">new</span> SidebarPage()));
              } 
            ),
            <span class="hljs-keyword">new</span> ListTile(   <span class="hljs-comment">//第二个功能项</span>
              title: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'Second Page'</span>),
              trailing: <span class="hljs-keyword">new</span> Icon(Icons.arrow_right),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).pushNamed(<span class="hljs-string">'/a'</span>);
              } 
            ),
            <span class="hljs-keyword">new</span> Divider(),    <span class="hljs-comment">//分割线控件</span>
            <span class="hljs-keyword">new</span> ListTile(   <span class="hljs-comment">//退出按钮</span>
              title: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'Close'</span>),
              trailing: <span class="hljs-keyword">new</span> Icon(Icons.cancel),
              onTap: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> Navigator.of(context).pop(),   <span class="hljs-comment">//点击后收起侧边栏</span>
            ),
          ],
        ),
      )
</code></pre>
<p>上面的代码，用到了很多陌生的控件，如<a href="https://docs.flutter.io/flutter/material/UserAccountsDrawerHeader-class.html" rel="nofollow noreferrer" target="_blank">UserAccountsDrawerHeader</a>、<a href="https://docs.flutter.io/flutter/widgets/GestureDetector-class.html" rel="nofollow noreferrer" target="_blank">GestureDetector</a>、<a href="https://docs.flutter.io/flutter/painting/BoxDecoration-class.html" rel="nofollow noreferrer" target="_blank">BoxDecoration</a>、<a href="https://docs.flutter.io/flutter/painting/NetworkImage-class.html" rel="nofollow noreferrer" target="_blank">NetworkImage</a>、<a href="https://docs.flutter.io/flutter/painting/ExactAssetImage-class.html" rel="nofollow noreferrer" target="_blank">ExactAssetImage</a>等等，这里我就不一一介绍了，各自的特性和用法请参考<a href="https://docs.flutter.io/index.html" rel="nofollow noreferrer" target="_blank">官方阅读理解题库</a>，刚开始我也是懵逼的，这些内置控件大家简单背诵一下即可，有可能后面因为页面复杂度的提高，单独拿出来封装也说不定，会使用就可以了。</p>
<blockquote>大家可以试试从屏幕的左边沿向右滑动的手势，是不是发现可以拉出侧边栏？再向右滑动收回侧边栏。我并没有添加任何手势事件的代码，这是<code>Drawer</code>控件自带的属性，和控件自带<strong>Material</strong>风格动效一样，内置控件也自带了默认手势，隐隐听到~原生开发的程序员哭晕在厕所，哈哈哈</blockquote>
<h2 id="articleHeader5">第四步</h2>
<h3 id="articleHeader6">功能按钮触发页面跳转。</h3>
<p>首先我们要创建一个子页面，于是乎<strong>pages</strong>文件夹下，我又创建了一个<strong>other_page.dart</strong>文件。要从<strong>HomePage.dart</strong>中跳转到<strong>other_page.dart</strong>，还需要在<strong>HomePage.dart</strong>中引一下<strong>other_page.dart</strong>。于是：<br><span class="img-wrap"><img data-src="/img/remote/1460000013805788" src="https://static.alili.tech/img/remote/1460000013805788" alt="页面文件引用" title="页面文件引用" style="cursor: pointer; display: inline;"></span></p>
<p>然后到<strong>other_page.dart</strong>中敲入代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'package:flutter/material.dart';

class OtherPage extends StatelessWidget {

  final String pageText;    //定义一个常量，用于保存跳转进来获取到的参数

  OtherPage(this.pageText);    //构造函数，获取参数

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(title: new Text(pageText),),    //将参数当作页面标题
      body: new Center(
        child: new Text('pageText'),
      ),
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-symbol">'package</span>:flutter/material.dart';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">OtherPage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{

  <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> pageText;    <span class="hljs-comment">//定义一个常量，用于保存跳转进来获取到的参数</span>

  <span class="hljs-type">OtherPage</span>(<span class="hljs-keyword">this</span>.pageText);    <span class="hljs-comment">//构造函数，获取参数</span>

  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Scaffold</span>(
      appBar: <span class="hljs-keyword">new</span> <span class="hljs-type">AppBar</span>(title: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(pageText),),    <span class="hljs-comment">//将参数当作页面标题</span>
      body: <span class="hljs-keyword">new</span> <span class="hljs-type">Center</span>(
        child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(<span class="hljs-symbol">'pageTex</span>t'),
      ),
    );
  }
}
</code></pre>
<p><strong>Flutter</strong>要求转入的页面必须提前定义一个常量分配好空间，且在构造函数中植入这个参数，才可捕捉外部传过来的参数值。</p>
<h3 id="articleHeader7">触发跳转</h3>
<p>向<em>First Page</em>和<em>Second Page</em>这两个<code>ListTile</code>控件中加入点击跳转页面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new ListTile(
    title: new Text('First Page'),
    trailing: new Icon(Icons.arrow_upward),
    onTap: () {
        Navigator.of(context).pop();  //点击后收起侧边栏
        Navigator.of(context).push(new MaterialPageRoute(builder: (BuildContext context) => new OtherPage('First Page')));  //进入OtherPage页面，传入参数First Page
        }
 ),
new ListTile(
    title: new Text('Second Page'),
    trailing: new Icon(Icons.arrow_right),
    onTap: () {
        Navigator.of(context).pop();
        Navigator.of(context).push(new MaterialPageRoute(builder: (BuildContext context) => new OtherPage('Second Page')));
    } 
 ),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> ListTile(
    title: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'First Page'</span>),
    trailing: <span class="hljs-keyword">new</span> Icon(Icons.arrow_upward),
    onTap: () {
        Navigator.<span class="hljs-keyword">of</span>(context).pop();  <span class="hljs-regexp">//</span>点击后收起侧边栏
        Navigator.<span class="hljs-keyword">of</span>(context).push(<span class="hljs-keyword">new</span> MaterialPageRoute(builder: <span class="hljs-function"><span class="hljs-params">(BuildContext context)</span> =&gt;</span> <span class="hljs-keyword">new</span> OtherPage(<span class="hljs-string">'First Page'</span>)));  <span class="hljs-regexp">//</span>进入OtherPage页面，传入参数First Page
        }
 ),
<span class="hljs-keyword">new</span> ListTile(
    title: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'Second Page'</span>),
    trailing: <span class="hljs-keyword">new</span> Icon(Icons.arrow_right),
    onTap: () {
        Navigator.<span class="hljs-keyword">of</span>(context).pop();
        Navigator.<span class="hljs-keyword">of</span>(context).push(<span class="hljs-keyword">new</span> MaterialPageRoute(builder: <span class="hljs-function"><span class="hljs-params">(BuildContext context)</span> =&gt;</span> <span class="hljs-keyword">new</span> OtherPage(<span class="hljs-string">'Second Page'</span>)));
    } 
 ),
</code></pre>
<p>上面的代码中<code>onTap()</code>事件里有一句<code>Navigator.of(context).pop(); </code>，意味着先收起侧边栏，再进入新页面。如果没有这句代码，即使进入了新页面，再返回来，侧边栏依然处于展开的样子，这个体验是反人类的，所以写上它吧~少年。</p>
<h2 id="articleHeader8">总结</h2>
<p>由于我没有详细的去定位和设计产品到底是干什么的，大家可能会觉得有点懵逼，为什么是这种侧边栏的布局，而不是很多社交APP常用的顶部+底部Tab栏的样式，不着急，我们下一篇实现。侧边栏有什么好处呢？节省空间，如果底部需要放置更重要的功能控件（比如音乐播放器）时，往侧边栏放入页面切换逻辑是个不错的应对方案。本篇内容其实非常简单，主要就是介绍大家认识几个常用控件，不用调CSS，不用思考因为冒泡事件导致复杂的交互逻辑实现，这就是<strong>Flutter</strong>的魅力，简约而不简单，相信大家看过之后，自行开发APP的信心更足了，好勒，今天就到这里，感谢大家的支持，请关注我的<a href="https://www.jianshu.com/c/ebc9d2e84214" rel="nofollow noreferrer" target="_blank">Flutter圈子</a>，多多投稿，也可以加入<strong>flutter 中文社区（官方QQ群：338252156）</strong>共同成长，谢谢大家~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter实战1：完成一个有侧边栏的主界面

## 原文链接
[https://segmentfault.com/a/1190000013805778](https://segmentfault.com/a/1190000013805778)

