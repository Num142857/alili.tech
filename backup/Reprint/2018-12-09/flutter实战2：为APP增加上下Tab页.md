---
title: 'flutter实战2：为APP增加上下Tab页' 
date: 2018-12-09 2:30:08
hidden: true
slug: r6zrych78ka
categories: [reprint]
---

{{< raw >}}

                    
<p>紧接上一篇的<a href="https://www.jianshu.com/p/f55bb3635d6d" rel="nofollow noreferrer" target="_blank">有侧边栏APP</a>，这次我们向APP中加入上下Tab页，使之跟趋近主流大部分APP的信息布局套路，等不及看源码的同学可以点击进入我的<a href="https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fteamdevelop%2Fappbyflutter" rel="nofollow noreferrer" target="_blank">git</a>仓库下载代码。</p>
<h2 id="articleHeader0">Tab关键元素</h2>
<ul><li><a href="https://docs.flutter.io/flutter/material/TabController-class.html" rel="nofollow noreferrer" target="_blank">TabController</a></li></ul>
<p>这是<code>Tab</code>页的控制器，用于定义<code>Tab</code>标签和内容页的坐标，还可配置标签页的切换动画效果等。</p>
<blockquote>TabController一般放入有状态控件中使用，以适应标签页数量和内容有动态变化的场景，如果标签页在APP中是静态固定的格局，则可以在无状态控件中加入简易版的<a href="https://docs.flutter.io/flutter/material/DefaultTabController-class.html" rel="nofollow noreferrer" target="_blank">DefaultTabController</a>以提高运行效率，毕竟无状态控件要比有状态控件更省资源，运行效率更快。</blockquote>
<ul><li><a href="https://docs.flutter.io/flutter/material/TabBar-class.html" rel="nofollow noreferrer" target="_blank">TabBar</a></li></ul>
<p><code>Tab</code>页的<code>Title</code>控件，切换<code>Tab</code>页的入口，一般放到<code>AppBar</code>控件下使用，内部有<em>*Title</em>属性。其子元素按水平横向排列布局，如果需要纵向排列，请使用<code>Column</code>或<code>ListView</code>控件包装一下。子元素为<code>Tab</code>类型的数组。</p>
<ul><li><a href="https://docs.flutter.io/flutter/material/TabBarView-class.html" rel="nofollow noreferrer" target="_blank">TabBarView</a></li></ul>
<p><code>Tab</code>页的内容容器，其内放置<code>Tab</code>页的主体内容。子元素可以是多个各种类型的控件。</p>
<h2 id="articleHeader1">Tab使用方法</h2>
<h3 id="articleHeader2">有状态控件搭配<code>TabController</code>
</h3>
<p><code>Tab</code>页的切换搭配了动画，因此到<code>State</code>类上附加一个<code>SingleTickerProviderStateMixin</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //定义有状态控件
  class HomePage extends StatefulWidget {
    @override
    _HomePageState createState() => new _HomePageState();
  }

  //用于使用到了一点点的动画效果，因此加入了SingleTickerProviderStateMixin
  class _HomePageState extends State<HomePage> with SingleTickerProviderStateMixin{
    ...
  }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>  <span class="hljs-comment">//定义有状态控件</span>
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomePage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatefulWidget</span> </span>{
    <span class="hljs-meta">@override</span>
    _HomePageState createState() =&gt; <span class="hljs-keyword">new</span> _HomePageState();
  }

  <span class="hljs-comment">//用于使用到了一点点的动画效果，因此加入了SingleTickerProviderStateMixin</span>
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">_HomePageState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State&lt;HomePage&gt;</span> <span class="hljs-keyword">with</span> <span class="hljs-title">SingleTickerProviderStateMixin</span></span>{
    ...
  }

</code></pre>
<p>然后到有状态控件的子类<code>State</code>中初始化控制器<code>TabController</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  @override
  void initState() {
    super.initState();
    _tabController = new TabController(
      vsync: this,     //动画效果的异步处理，默认格式，背下来即可
      length: 3      //需要控制的Tab页数量
    );    
  }
  //当整个页面dispose时，记得把控制器也dispose掉，释放内存
  @override
  void dispose() {
    _tabController .dispose();
    super.dispose();
  }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>  <span class="hljs-meta">@override</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initState</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">super</span>.initState();
    _tabController = <span class="hljs-keyword">new</span> TabController(
      vsync: <span class="hljs-keyword">this</span>,     <span class="hljs-comment">//动画效果的异步处理，默认格式，背下来即可</span>
      length: <span class="hljs-number">3</span>      <span class="hljs-comment">//需要控制的Tab页数量</span>
    );    
  }
  <span class="hljs-comment">//当整个页面dispose时，记得把控制器也dispose掉，释放内存</span>
  <span class="hljs-meta">@override</span>
  <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">dispose</span><span class="hljs-params">()</span> </span>{
    _tabController .dispose();
    <span class="hljs-keyword">super</span>.dispose();
  }

</code></pre>
<p>然后到<code>TabBar</code>和<code>TabBarView</code>中的<strong>controller</strong>属性中调用控制器<code>_tabController</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //标签页标题
  new TabBar(
          tabs: [    //注意TabBar的子元素为Tab类型的数组
            new Tab(icon: new Icon(Icons.directions_car)),
            new Tab(icon: new Icon(Icons.directions_transit)),
            new Tab(icon: new Icon(Icons.directions_bike)),
          ]
  //标签页内容区域
  new TabBarView(
        children: [
          new Icon(Icons.directions_car),
          new Icon(Icons.directions_transit),
          new Icon(Icons.directions_bike),
        ]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>  <span class="hljs-comment">//标签页标题</span>
  <span class="hljs-keyword">new</span> <span class="hljs-type">TabBar</span>(
          tabs: <span class="hljs-type"></span>[    <span class="hljs-comment">//注意TabBar的子元素为Tab类型的数组</span>
            <span class="hljs-keyword">new</span> <span class="hljs-type">Tab</span>(icon: <span class="hljs-type">new Icon</span>(Icons.directions_car)),
            <span class="hljs-keyword">new</span> <span class="hljs-type">Tab</span>(icon: <span class="hljs-type">new Icon</span>(Icons.directions_transit)),
            <span class="hljs-keyword">new</span> <span class="hljs-type">Tab</span>(icon: <span class="hljs-type">new Icon</span>(Icons.directions_bike)),
          ]
  <span class="hljs-comment">//标签页内容区域</span>
  <span class="hljs-keyword">new</span> <span class="hljs-type">TabBarView</span>(
        children: <span class="hljs-type"></span>[
          <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(Icons.directions_car),
          <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(Icons.directions_transit),
          <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(Icons.directions_bike),
        ]
</code></pre>
<p>最后，我们把定义好的<code>TabBar</code>和<code>TabBarView</code>安放到需要的地方去，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Scaffold(
      appBar: new AppBar(
        backgroundColor: Colors.deepOrange,
        title: new Text('title'),
      ),
      ....
      body: new TabBarView(        //TabBarView呈现内容，因此放到Scaffold的body中
          controller: _bottomNavigation,      //配置控制器
          children:  [      //注意顺序与TabBar保持一直
            new News(data: '参数值'),    //上一篇定义好的子页面
            new TabPage2(),
            new TabPage3(),
          ]
        ),
      bottomNavigationBar: new Material(    //为了适配主题风格，包一层Material实现风格套用
        color: Colors.deepOrange,   //底部导航栏主题颜色
        child: new TabBar(        //TabBar导航标签，底部导航放到Scaffold的bottomNavigationBar中
          controller: _bottomNavigation,      //配置控制器
          tabs: _bottomTabs,
          indicatorColor: Colors.white, //tab标签的下划线颜色
        ),
      ) 
    );
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Scaffold</span>(
      <span class="hljs-attribute">appBar</span>: new AppBar(
        <span class="hljs-attribute">backgroundColor</span>: Colors.deepOrange,
        <span class="hljs-attribute">title</span>: new Text(<span class="hljs-string">'title'</span>),
      ),
      ....
      <span class="hljs-attribute">body</span>: new TabBarView(        <span class="hljs-comment">//TabBarView呈现内容，因此放到Scaffold的body中</span>
          <span class="hljs-attribute">controller</span>: _bottomNavigation,      <span class="hljs-comment">//配置控制器</span>
          <span class="hljs-attribute">children</span>:  [      <span class="hljs-comment">//注意顺序与TabBar保持一直</span>
            new News(<span class="hljs-attribute">data</span>: <span class="hljs-string">'参数值'</span>),    <span class="hljs-comment">//上一篇定义好的子页面</span>
            new TabPage2(),
            new TabPage3(),
          ]
        ),
      <span class="hljs-attribute">bottomNavigationBar</span>: new Material(    <span class="hljs-comment">//为了适配主题风格，包一层Material实现风格套用</span>
        <span class="hljs-attribute">color</span>: Colors.deepOrange,   <span class="hljs-comment">//底部导航栏主题颜色</span>
        <span class="hljs-attribute">child</span>: new TabBar(        <span class="hljs-comment">//TabBar导航标签，底部导航放到Scaffold的bottomNavigationBar中</span>
          <span class="hljs-attribute">controller</span>: _bottomNavigation,      <span class="hljs-comment">//配置控制器</span>
          <span class="hljs-attribute">tabs</span>: _bottomTabs,
          <span class="hljs-attribute">indicatorColor</span>: Colors.white, <span class="hljs-comment">//tab标签的下划线颜色</span>
        ),
      ) 
    );
</code></pre>
<h3 id="articleHeader3">无状态控件搭配<code>DefaultTabController</code>
</h3>
<p><code>DefaultTabController</code>要简单很多，由于应用在无状态控件中，使用<code>DefaultTabController</code>包裹需要用到<code>Tab</code>的页面即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class TabPage3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return  new DefaultTabController(
        length: 3,
        child: new Scaffold(
          appBar: new AppBar(
            backgroundColor: Colors.orangeAccent,
            title: new TabBar(
              tabs: [
                new Tab(icon: new Icon(Icons.directions_car)),
                new Tab(icon: new Icon(Icons.directions_transit)),
                new Tab(icon: new Icon(Icons.directions_bike)),
              ],
              indicatorColor: Colors.white,
            ),
          ),
          body: new TabBarView(
            children: [
              new Icon(Icons.directions_car),
              new Icon(Icons.directions_transit),
              new Icon(Icons.directions_bike),
            ],
          ),
        ),
      );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TabPage3</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span>  <span class="hljs-keyword">new</span> <span class="hljs-type">DefaultTabController</span>(
        length: <span class="hljs-number">3</span>,
        child: <span class="hljs-keyword">new</span> <span class="hljs-type">Scaffold</span>(
          appBar: <span class="hljs-keyword">new</span> <span class="hljs-type">AppBar</span>(
            backgroundColor: <span class="hljs-type">Colors</span>.orangeAccent,
            title: <span class="hljs-keyword">new</span> <span class="hljs-type">TabBar</span>(
              tabs: [
                <span class="hljs-keyword">new</span> <span class="hljs-type">Tab</span>(icon: <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(<span class="hljs-type">Icons</span>.directions_car)),
                <span class="hljs-keyword">new</span> <span class="hljs-type">Tab</span>(icon: <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(<span class="hljs-type">Icons</span>.directions_transit)),
                <span class="hljs-keyword">new</span> <span class="hljs-type">Tab</span>(icon: <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(<span class="hljs-type">Icons</span>.directions_bike)),
              ],
              indicatorColor: <span class="hljs-type">Colors</span>.white,
            ),
          ),
          body: <span class="hljs-keyword">new</span> <span class="hljs-type">TabBarView</span>(
            children: [
              <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(<span class="hljs-type">Icons</span>.directions_car),
              <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(<span class="hljs-type">Icons</span>.directions_transit),
              <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(<span class="hljs-type">Icons</span>.directions_bike),
            ],
          ),
        ),
      );
  }
}
</code></pre>
<p><code>DefaultTabController</code>和<code>TabController</code>的用法差异主要在控制器的定义上，<code>TabBar</code>和<code>TabBarView</code>的使用方法完全相同，通常上下<code>Tab</code>页的标签分别安放在<code>Scaffold</code>控件的<strong>appBar</strong>和<strong>bottomNavigationBar</strong>属性上，然后我们把APP填充成下面这个样式：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013969152" src="https://static.alili.tech/img/remote/1460000013969152" alt="效果图" title="效果图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">代码结构</h2>
<p>如上图所示，APP以底部<code>Tab</code>导航栏为主入口，底部每个<code>Tab</code>中又各自有自己的顶部次级<code>Tab</code>页，因此我们把代码结构整理一下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013969153" src="https://static.alili.tech/img/remote/1460000013969153" alt="代码框架" title="代码框架" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<code>_HomePageState</code>是APP的主页面<code>HomePage</code>的子类<code>State</code>
</li>
<li>通过<code>Scaffold</code>底部的<strong>bottomNavigationBar</strong>属性摆放<code>TabBar</code>，搭建<code>Tab</code>页的标签栏</li>
<li>放入<code>Scaffold</code>的<strong>body</strong>属性放入<code>TabBarView</code>，<code>TabBarView</code>的<strong>children</strong>是三个外部<strong>dart</strong>文件定义的控件页面</li>
<li>外部<strong>dart</strong>文件定义的控件页面分别又有各自风格的<code>Tab</code>标签页</li>
<li>
<code>Tab</code>页的通用属性可以提前定义到数组<code>List</code>中，在<code>TabBar</code>和<code>TabBarView</code>通过遍历提取<code>List</code>的值创建子元素可以提高代码的维护效率：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在`StatefulWidget`控件中，可通过修改下面的数组，实现Tab页的动态加载
final List<Tab> myTabs = <Tab>[
    new Tab(text: 'Tab1'),
    new Tab(text: 'Tab2'),
    new Tab(text: 'Tab3'),
    new Tab(text: 'Tab4'),
    new Tab(text: 'Tab5'),
    new Tab(text: 'Tab6'),
    new Tab(text: 'Tab7'),
    new Tab(text: 'Tab8'),
    new Tab(text: 'Tab9'),
    new Tab(text: 'Tab10'),
    new Tab(text: 'Tab11'),
  ];

  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        backgroundColor: Colors.orangeAccent,
        title: new TabBar(
          controller: _tabController,
          tabs: myTabs,    //使用Tab类型的数组呈现Tab标签
          indicatorColor: Colors.white,
          isScrollable: true,   
        ),
      ),
      body: new TabBarView(
        controller: _tabController,
        children: myTabs.map((Tab tab) {    //遍历List<Tab>类型的对象myTabs并提取其属性值作为子控件的内容
          return new Center(child: new Text(tab.text+'   '+widget.data)); //使用参数值
        }).toList(),
      ),
    );
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//在`StatefulWidget`控件中，可通过修改下面的数组，实现Tab页的动态加载</span>
<span class="hljs-keyword">final</span> List&lt;Tab&gt; myTabs = &lt;Tab&gt;[
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab1'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab2'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab3'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab4'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab5'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab6'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab7'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab8'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab9'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab10'</span>),
    <span class="hljs-keyword">new</span> Tab(<span class="hljs-built_in">text</span>: <span class="hljs-string">'Tab11'</span>),
  ];

  Widget build(BuildContext context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Scaffold(
      appBar: <span class="hljs-keyword">new</span> AppBar(
        backgroundColor: Colors.orangeAccent,
        title: <span class="hljs-keyword">new</span> TabBar(
          controller: _tabController,
          tabs: myTabs,    <span class="hljs-comment">//使用Tab类型的数组呈现Tab标签</span>
          indicatorColor: Colors.white,
          isScrollable: <span class="hljs-keyword">true</span>,   
        ),
      ),
      body: <span class="hljs-keyword">new</span> TabBarView(
        controller: _tabController,
        children: myTabs.<span class="hljs-built_in">map</span>((Tab tab) {    <span class="hljs-comment">//遍历List&lt;Tab&gt;类型的对象myTabs并提取其属性值作为子控件的内容</span>
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Center(child: <span class="hljs-keyword">new</span> Text(tab.<span class="hljs-built_in">text</span>+<span class="hljs-string">'   '</span>+widget.data)); <span class="hljs-comment">//使用参数值</span>
        }).toList(),
      ),
    );
  }
</code></pre>
<h2 id="articleHeader5">使用获取到的参数</h2>
<p>由于<code>StatelessWidget </code>和<code>StatefulWidget</code>的页面构建不同，使用从外部获取到的参数的方式也略有差异，在这里简单总结下。</p>
<ul><li>
<code>StatelessWidget </code>的获参和用参方式</li></ul>
<p>定义<code>StatelessWidget </code>控件时，添加一个<code>final</code>类型的变量如<code>pageText</code>，用于为参数值预留空间，并在构造函数中加入参数值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SidebarPage extends StatelessWidget {
  final String pageText;    //定义一个常量，用于保存跳转进来获取到的参数
  SidebarPage(this.pageText);   //构造函数，获取参数
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SidebarPage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
  <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> pageText;    <span class="hljs-comment">//定义一个常量，用于保存跳转进来获取到的参数</span>
  <span class="hljs-type">SidebarPage</span>(<span class="hljs-keyword">this</span>.pageText);   <span class="hljs-comment">//构造函数，获取参数</span>
  ...
}
</code></pre>
<p>使用参数时直接引用即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(title: new Text(pageText),),   //将参数当作页面标题
      body: new Center(
        child: new Text('pageText'),
      ),
    );
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-function">Widget <span class="hljs-title">build</span><span class="hljs-params">(BuildContext context)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Scaffold(
      appBar: <span class="hljs-keyword">new</span> AppBar(title: <span class="hljs-keyword">new</span> Text(pageText),),   //将参数当作页面标题
      body: <span class="hljs-keyword">new</span> Center(
        child: <span class="hljs-keyword">new</span> Text('pageText'),
      ),
    );
  }
</code></pre>
<p>从外部传入参数时，直接向构造函数中填入参数值即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Navigator.of(context).push(new MaterialPageRoute(builder: 
    (BuildContext context) => new SidebarPage('First Page')));    //在new方法时调用控件的构造函数传入参数值
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>Navigator.<span class="hljs-keyword">of</span>(context).push(<span class="hljs-keyword">new</span> MaterialPageRoute(builder: 
    <span class="hljs-function"><span class="hljs-params">(BuildContext context)</span> =&gt;</span> <span class="hljs-keyword">new</span> SidebarPage(<span class="hljs-string">'First Page'</span>)));    <span class="hljs-regexp">//</span>在<span class="hljs-keyword">new</span>方法时调用控件的构造函数传入参数值
</code></pre>
<ul><li>
<code>StatefulWidget</code>的获参和用参方式</li></ul>
<p>相比<code>StatelessWidget </code>略复杂。定义构造函数时需要默认声明<em>key</em>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class TabPage1 extends StatefulWidget {
  const TabPage1({ Key key , this.data}) : super(key: key); //构造函数中增加参数
  final String data;    //为参数分配空间
  @override
  _MyTabbedPageState createState() => new _MyTabbedPageState();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TabPage1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatefulWidget</span> </span>{
  const <span class="hljs-type">TabPage1</span>({ <span class="hljs-type">Key</span> key , <span class="hljs-keyword">this</span>.data}) : <span class="hljs-keyword">super</span>(key: key); <span class="hljs-comment">//构造函数中增加参数</span>
  <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> data;    <span class="hljs-comment">//为参数分配空间</span>
  <span class="hljs-meta">@override</span>
  _MyTabbedPageState createState() =&gt; <span class="hljs-keyword">new</span> _MyTabbedPageState();
}
</code></pre>
<p>使用时，由于在<code>State</code>子类中实现具体的页面内容，因此<code>State</code>子类使用父类<code>TabPage1</code>的参数时需要在参数名前增加一个<strong><em>widget</em></strong>关键字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class _MyTabbedPageState extends State<TabPage1> {
  ...
  new Center(child: new Text(tab.text+'   '+widget.data));   //使用参数值，需在参数名前增加widget前缀
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">_MyTabbedPageState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State&lt;TabPage1&gt;</span> </span>{
  ...
  <span class="hljs-keyword">new</span> <span class="hljs-type">Center</span>(child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(tab.text+'   '+widget.data));   <span class="hljs-comment">//使用参数值，需在参数名前增加widget前缀</span>
  ...
}
</code></pre>
<p>从外部传入参数时，需要声明参数名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new TabBarView
    controller: _bottomNavigation,
    children:  [      
      new TabPage1(data: '参数值'),    //new方法调用构造函数时，还需要声明参数名称
      new TabPage2(),
      new TabPage3(),
    ]
  )
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">new</span> TabBarView
<span class="hljs-symbol">    controller:</span> _bottomNavigation,
<span class="hljs-symbol">    children:</span>  [      
      <span class="hljs-keyword">new</span> TabPage1(<span class="hljs-string">data:</span> <span class="hljs-string">'参数值'</span>),    <span class="hljs-comment">//new方法调用构造函数时，还需要声明参数名称</span>
      <span class="hljs-keyword">new</span> TabPage2(),
      <span class="hljs-keyword">new</span> TabPage3(),
    ]
  )
</code></pre>
<p>好勒，今天就讲到这里，大家去下载我的<a href="https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fteamdevelop%2Fappbyflutter" rel="nofollow noreferrer" target="_blank">git</a>源码试试效果吧，代码中有附加的注释，对一些控件属性的特性也有单独的描述，相信看完源码之后，大家也可以自行实现效果了。</p>
<p>顺便分享一个雷区，由于当初创建这个项目时，我使用命令<strong><em>flutter create [APPname1]</em></strong>的方式创建了这个项目，但我发现这个APPname1（代称，并非真实名称）不好听，想把项目改名为APPname2，于是参考之前写的<a href="https://www.jianshu.com/p/f91b4e84cec8" rel="nofollow noreferrer" target="_blank">安卓怎么打包？</a>,把项目文件夹改名为APPname2，并非常任性的把项目目录下的_androidappsrcmainAndroidManifest.xml_文件，把<em>package</em>和<em>android:label</em>都改成了APPname2，于是不出意料的悲催了，命令<strong><em>flutter fun</em></strong>报错，<strong>无法启动APP</strong>，还原配置之后，<strong>无法启动APP</strong>，即便尝试通过全文搜索APPname1，都按规定格式替换成APPname2，或者逆向改回去，<strong>都无法启动APP</strong>，此时已是凌晨1点。。。妥妥的血泪史，所以郑重的告诫大家：</p>
<p><strong>不要在项目的各种配置文件中轻易改动项目名称！不要在项目的各种配置文件中轻易改动项目名称！不要在项目的各种配置文件中轻易改动项目名称！</strong> 否则你就是下一个在电脑面前捶胸顿足的鱼丸。什么？问我怎么恢复的？当然是托git的福。</p>
<p>感谢大家的支持，请关注我的<a href="https://www.jianshu.com/c/ebc9d2e84214" rel="nofollow noreferrer" target="_blank">Flutter圈子</a>，多多投稿，也可以加入<strong>flutter 中文社区（官方QQ群：338252156）</strong>共同成长，谢谢大家~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter实战2：为APP增加上下Tab页

## 原文链接
[https://segmentfault.com/a/1190000013969147](https://segmentfault.com/a/1190000013969147)

