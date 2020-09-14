---
title: 'flutter笔记7：flutter页面布局基础，看完这篇就可以用flutter写APP了' 
date: 2018-12-10 2:30:07
hidden: true
slug: edc0zkvict
categories: [reprint]
---

{{< raw >}}

                    
<p>不知不觉已经到了第7篇，然而很多萌新玩家可能还是不知道如何堆砌控件，像用CSS一样搭出漂亮的APP界面，我也一样，红红火火恍恍惚惚，直到今天含泪读完<a href="https://flutter.io/tutorials/layout/" rel="nofollow noreferrer" target="_blank">Flutter布局基础</a>，仿佛打开了一个全新的世界。</p>
<h2 id="articleHeader0">基本概念</h2>
<p>在flutter中，<strong>一切皆控件！一切皆控件！一切皆控件！</strong>牢牢记住这个概念。Text是控件，Image是控件，Icon是控件，布局脚手架也Scaffold也是控件，甚至整个APP也是控件。</p>
<p>用户自定义控件分为有状态控件和无状态控件两种类型，其特性在前面的<a href="https://www.jianshu.com/p/88b4eb2a7e59" rel="nofollow noreferrer" target="_blank">笔记4</a>中可以感受感受。</p>
<p>flutter的内置控件分为两种：</p>
<ul>
<li>可视控件(visible widget)。即我们直接看到的控件，如text、Icon、Button，名称理解和html标签相同。</li>
<li>布局控件(layout widget)。可以理解为架子，如Row、Column、Container。布局控件不会直接呈现内容，可看作承载可视控件的容器。所有的布局控件都有承载子控件的属性：<code>child</code>或<code>children</code>。<code>child</code>可承载单个子控件，<code>children</code>可承载多个子控件。每个布局控件有默认的布局方式，使其子控件按照自己的样式安放到位子上。布局控件提供了各种样式的参数，可实现子控件的对齐(align)、缩放(size)、包装(pack)和嵌套(Nest)。简单总结为：布局控件是为了实现可视控件的各种视觉效果而做的包装，比如前端的html为了实现sticky、双飞翼、圣杯等布局常常内容区外层添加div包裹层。</li>
</ul>
<p>布局控件也是可以<a href="https://flutter.io/debugging/#visual-debugging" rel="nofollow noreferrer" target="_blank">模拟显示</a>的，通常用于调试布局样式时用到的网格线、标尺、动画帧等。启用方式：<br>1.在main.dart中，引入包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'package:flutter/rendering.dart' show debugPaintSizeEnabled;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">import</span> <span class="hljs-string">'package:flutter/rendering.dart'</span> show <span class="hljs-literal">debug</span>PaintSizeEnabled;
</code></pre>
<p>2.在<code>main</code>函数中打开开关：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void main() {
  debugPaintSizeEnabled = true;      //打开视觉调试开关
  runApp(new MyApp());
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
  debugPaintSizeEnabled = <span class="hljs-literal">true</span>;      <span class="hljs-comment">//打开视觉调试开关</span>
  runApp(<span class="hljs-keyword">new</span> MyApp());
}
</code></pre>
<p>运行代码后APP效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000013712252" src="https://static.alili.tech/img/remote/1460000013712252" alt="视觉调试模式下的APP界面" title="视觉调试模式下的APP界面" style="cursor: pointer; display: inline;"></span></p>
<p>flutter的内置控件已经定义了很多属性，玩家可以参考<a href="https://flutter.io/widgets/" rel="nofollow noreferrer" target="_blank">Widgets Catalog</a>了解每种控件的详细属性和用法。本篇通过几个例子，介绍页面上的控件如何堆砌和布局。</p>
<p>别着急，由于下面的案例中，可能用到图片，先交待一下加载图片的基本配置方法：</p>
<ol>
<li>到项目根目录下创建一个文件夹，命名:images，将图片放置到该文件夹中。</li>
<li>打开根目录下的pubspec.yaml文件，在其下添加注释中的属性：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flutter:
  uses-material-design: true
  assets:                            //如果没有这个属性则添加到flutter标签下
    - images/lake.jpg          //声明图片的路径
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">flutter:</span>
  uses-material-<span class="hljs-string">design:</span> <span class="hljs-literal">true</span>
<span class="hljs-symbol">  assets:</span>                            <span class="hljs-comment">//如果没有这个属性则添加到flutter标签下</span>
    - images<span class="hljs-regexp">/lake.jpg          /</span>/声明图片的路径
</code></pre>
<ol><li>到代码中，以image控件的方式引用图片：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Image.asset(
              'images/lake.jpg',        //图片的路径
              width: 600.0,              //图片控件的宽度
              height: 240.0,            //图片控件的高度
              fit: BoxFit.cover,        //告诉引用图片的控件，图像应尽可能小，但覆盖整个控件。
            ),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Image</span><span class="hljs-selector-class">.asset</span>(
              <span class="hljs-string">'images/lake.jpg'</span>,        <span class="hljs-comment">//图片的路径</span>
              <span class="hljs-attribute">width</span>: <span class="hljs-number">600.0</span>,              <span class="hljs-comment">//图片控件的宽度</span>
              <span class="hljs-attribute">height</span>: <span class="hljs-number">240.0</span>,            <span class="hljs-comment">//图片控件的高度</span>
              <span class="hljs-attribute">fit</span>: BoxFit.cover,        <span class="hljs-comment">//告诉引用图片的控件，图像应尽可能小，但覆盖整个控件。</span>
            ),
</code></pre>
<h2 id="articleHeader1">案例</h2>
<h3 id="articleHeader2">控件的排列</h3>
<p>行(Row)和列(Column)，是flutter中最常用的两个布局控件，他们只能容纳当前屏幕尺寸大小的内容，如果其内部的子控件超出屏幕尺寸，不但不会自动生成滚动条，还会报错。</p>
<p><strong>案例1-行排列</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000013712253" src="https://static.alili.tech/img/remote/1460000013712253" alt="横向排列" title="横向排列" style="cursor: pointer; display: inline;"></span></p>
<p>如图上图所示，图中有3个100px宽的图片，通过水平平均间隔的方式居中横向排列显示到一行中，代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new Center(                //居中控件
  child: new Row(        //行控件
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,      //对齐方式：平均间隔
    children: [
      new Image.asset('images/pic1.jpg'),        //引入三张图片
      new Image.asset('images/pic2.jpg'),
      new Image.asset('images/pic3.jpg'),
    ]
  )
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code> <span class="hljs-keyword">new</span> <span class="hljs-type">Center</span>(                <span class="hljs-comment">//居中控件</span>
  child: <span class="hljs-type">new Row</span>(        <span class="hljs-comment">//行控件</span>
    mainAxisAlignment: <span class="hljs-type">MainAxisAlignment</span>.spaceEvenly,      <span class="hljs-comment">//对齐方式：平均间隔</span>
    children: <span class="hljs-type"></span>[
      <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>.asset(<span class="hljs-string">'images/pic1.jpg'</span>),        <span class="hljs-comment">//引入三张图片</span>
      <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>.asset(<span class="hljs-string">'images/pic2.jpg'</span>),
      <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>.asset(<span class="hljs-string">'images/pic3.jpg'</span>),
    ]
  )
)
</code></pre>
<p>可以看到上图用到了2个布局控件Center和Row，通过Center包裹Row，使行控件保持居中，而ROW控件包裹了3个图片控件Image，通过配置Row的mainAxisAlignment对齐属性，使三个图片空间通过平均间隔的方式进行横向排列。</p>
<p>完整代码：<br><strong>Dart code:</strong>&nbsp;<a href="https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row/main.dart" rel="nofollow noreferrer" target="_blank">main.dart</a><br><strong>Images:</strong>&nbsp;<a href="https://github.com/flutter/website/tree/master/_includes/code/layout/row/images" rel="nofollow noreferrer" target="_blank">images</a><br><strong>Pubspec:</strong>&nbsp;<a href="https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row/pubspec.yaml" rel="nofollow noreferrer" target="_blank">pubspec.yaml</a></p>
<p><strong>案例2-列排列</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000013712254" src="https://static.alili.tech/img/remote/1460000013712254" alt="纵向排列" title="纵向排列" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，还是那3张图，通过纵向平均间隔的方式显示到一列中，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Center(
  child: new Column(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,        //对齐方式：平均间隔
    children: [
      new Image.asset('images/pic1.jpg'),
      new Image.asset('images/pic2.jpg'),
      new Image.asset('images/pic3.jpg'),
    ]
  )
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">Center</span>(
  child: <span class="hljs-type">new Column</span>(
    mainAxisAlignment: <span class="hljs-type">MainAxisAlignment</span>.spaceEvenly,        <span class="hljs-comment">//对齐方式：平均间隔</span>
    children: <span class="hljs-type"></span>[
      <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>.asset(<span class="hljs-string">'images/pic1.jpg'</span>),
      <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>.asset(<span class="hljs-string">'images/pic2.jpg'</span>),
      <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>.asset(<span class="hljs-string">'images/pic3.jpg'</span>),
    ]
  )
)
</code></pre>
<p>完整代码：<br><strong>Dart code:</strong>&nbsp;<a href="https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/column/main.dart" rel="nofollow noreferrer" target="_blank">main.dart</a><br><strong>Images:</strong>&nbsp;<a href="https://github.com/flutter/website/tree/master/_includes/code/layout/column/images" rel="nofollow noreferrer" target="_blank">images</a><br><strong>Pubspec:</strong>&nbsp;<a href="https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/column/pubspec.yaml" rel="nofollow noreferrer" target="_blank">pubspec.yaml</a></p>
<p>对比案例1和2可以看到，代码结构相同，Row和Column中都用到了mainAxisAlignment属性，除此以外还有crossAxisAlignment属性。值得注意的是，在Row中mainAxisAlignment控制水平方向对齐，crossAxisAlignment控制垂直方向对齐，而在Column中则正好相反。相关参数值请参考<a href="https://docs.flutter.io/flutter/rendering/MainAxisAlignment-class.html" rel="nofollow noreferrer" target="_blank">MainAxisAlignment</a>和<a href="https://docs.flutter.io/flutter/rendering/CrossAxisAlignment-class.html" rel="nofollow noreferrer" target="_blank">CrossAxisAlignment</a></p>
<h3 id="articleHeader3">布局控件的嵌套</h3>
<p><strong>案例3-行列嵌套</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000013712255" src="https://static.alili.tech/img/remote/1460000013712255" alt="行列嵌套" title="行列嵌套" style="cursor: pointer;"></span></p>
<p>如上图，我们将图中的元素按图中的框线进行分解：</p>
<p>1.最外层的使用Row控件包裹，使其内部的两个子控件：浅蓝色框的菜品介绍和右边的菜品大图横向排列，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Scaffold(                                                                              //脚手架控件
      appBar: new AppBar(                                                            //工具栏控件
        title: new Text(widget.title),
      ),
  body: new Center(
  child: new Container(                                                                 //Container控件用于调整外边距
    margin: new EdgeInsets.fromLTRB(0.0, 40.0, 0.0, 30.0),        
    height: 600.0,
    child: new Card(                                                                       //Card控件控制卡片的视觉效果
      child: new Row(                                                                     //Row控件使其子控件横向排列
        crossAxisAlignment: CrossAxisAlignment.start,                  //纵向对齐方式：起始边对齐
        children: [
          new Container(                                                                  //Container控件用于调整宽度
            width: 440.0,   
            child: leftColumn,                                                            //左边的菜品介绍控件
          ),
          mainImage,                                                                        //右边的大图控件
        ],
      ),
    ),
  ),
)
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Scaffold</span>(                                                                              <span class="hljs-comment">//脚手架控件</span>
      <span class="hljs-attribute">appBar</span>: new AppBar(                                                            <span class="hljs-comment">//工具栏控件</span>
        <span class="hljs-attribute">title</span>: new Text(widget.title),
      ),
  <span class="hljs-attribute">body</span>: new Center(
  <span class="hljs-attribute">child</span>: new Container(                                                                 <span class="hljs-comment">//Container控件用于调整外边距</span>
    <span class="hljs-attribute">margin</span>: new EdgeInsets.fromLTRB(<span class="hljs-number">0.0</span>, <span class="hljs-number">40.0</span>, <span class="hljs-number">0.0</span>, <span class="hljs-number">30.0</span>),        
    <span class="hljs-attribute">height</span>: <span class="hljs-number">600.0</span>,
    <span class="hljs-attribute">child</span>: new Card(                                                                       <span class="hljs-comment">//Card控件控制卡片的视觉效果</span>
      <span class="hljs-attribute">child</span>: new Row(                                                                     <span class="hljs-comment">//Row控件使其子控件横向排列</span>
        <span class="hljs-attribute">crossAxisAlignment</span>: CrossAxisAlignment.start,                  <span class="hljs-comment">//纵向对齐方式：起始边对齐</span>
        <span class="hljs-attribute">children</span>: [
          new Container(                                                                  <span class="hljs-comment">//Container控件用于调整宽度</span>
            <span class="hljs-attribute">width</span>: <span class="hljs-number">440.0</span>,   
            <span class="hljs-attribute">child</span>: leftColumn,                                                            <span class="hljs-comment">//左边的菜品介绍控件</span>
          ),
          mainImage,                                                                        <span class="hljs-comment">//右边的大图控件</span>
        ],
      ),
    ),
  ),
)
)
</code></pre>
<p>2.把浅蓝色框内的信息，用Column包裹，使其内容垂直排列：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Container(
      padding: new EdgeInsets.fromLTRB(20.0, 30.0, 20.0, 20.0),
      child: new Column(                                                                    //Column控件，使其子控件垂直排列
        children: [
          titleText,        //标题行，包含了可视Text控件
          subTitle,        //副标题行，包含了可视Text控件
          ratings,         //投票信息行
          iconList,        //小图标行
        ],
      ),
    );
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Container</span>(
      <span class="hljs-attribute">padding</span>: new EdgeInsets.fromLTRB(<span class="hljs-number">20.0</span>, <span class="hljs-number">30.0</span>, <span class="hljs-number">20.0</span>, <span class="hljs-number">20.0</span>),
      <span class="hljs-attribute">child</span>: new Column(                                                                    <span class="hljs-comment">//Column控件，使其子控件垂直排列</span>
        <span class="hljs-attribute">children</span>: [
          titleText,        <span class="hljs-comment">//标题行，包含了可视Text控件</span>
          subTitle,        <span class="hljs-comment">//副标题行，包含了可视Text控件</span>
          ratings,         <span class="hljs-comment">//投票信息行</span>
          iconList,        <span class="hljs-comment">//小图标行</span>
        ],
      ),
    );
</code></pre>
<p>3.由于titleText和subTitle都是简单的包装了Text控件，不再贴代码和注释，重点讲下ratings和iconList：<br><span class="img-wrap"><img data-src="/img/remote/1460000013712256" src="https://static.alili.tech/img/remote/1460000013712256" alt="ratings和iconList控件" title="ratings和iconList控件" style="cursor: pointer; display: inline;"></span></p>
<p>ratings和iconList控件是垂直排列的两行，而各自内部有自己的布局信息，因此将这两行分别拆解为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013712257" src="https://static.alili.tech/img/remote/1460000013712257" alt="ratings" title="ratings" style="cursor: pointer;"></span></p>
<p>ratings下包含了两个水平排列：Row控件用于显示星级，Text控件用于显示用户浏览数，而评分星级控件ROW又分解为5个水平排列的Icon控件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013712258" src="https://static.alili.tech/img/remote/1460000013712258" alt="iconList控件结构" title="iconList控件结构" style="cursor: pointer;"></span></p>
<p>iconList横向排列了3个纵向显示的控件，层次一目了然。</p>
<p>对照代码结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ratings控件
new Container(
      padding: new EdgeInsets.all(20.0),
      child: new Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          new Row(
            mainAxisSize: MainAxisSize.min,       //mainAxisSize，可压缩或伸长行内控件的间距
            children: [
              new Icon(Icons.star, color: Colors.black),
              new Icon(Icons.star, color: Colors.black),
              new Icon(Icons.star, color: Colors.black),
              new Icon(Icons.star, color: Colors.black),
              new Icon(Icons.star, color: Colors.black),
            ],
          ),
          new Text(
            '170 Reviews',
            style: new TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.w800,
              fontFamily: 'Roboto',
              letterSpacing: 0.5,
              fontSize: 20.0,
            ),
          ),
        ],
      ),
    )

//iconList控件
new Container(
        padding: new EdgeInsets.all(20.0),
        child: new Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            new Column(
              children: [
                new Icon(Icons.kitchen, color: Colors.green[500]),
                new Text('PREP:'),
                new Text('25 min'),
              ],
            ),
            new Column(
              children: [
                new Icon(Icons.timer, color: Colors.green[500]),
                new Text('COOK:'),
                new Text('1 hr'),
              ],
            ),
            new Column(
              children: [
                new Icon(Icons.restaurant, color: Colors.green[500]),
                new Text('FEEDS:'),
                new Text('4-6'),
              ],
            ),
          ],
        ),
      )
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//ratings控件</span>
<span class="hljs-keyword">new</span> Container(
      padding: <span class="hljs-keyword">new</span> EdgeInsets.all(<span class="hljs-number">20.0</span>),
      child: <span class="hljs-keyword">new</span> Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          <span class="hljs-keyword">new</span> Row(
            mainAxisSize: MainAxisSize.<span class="hljs-built_in">min</span>,       <span class="hljs-comment">//mainAxisSize，可压缩或伸长行内控件的间距</span>
            children: [
              <span class="hljs-keyword">new</span> Icon(Icons.star, <span class="hljs-built_in">color</span>: Colors.black),
              <span class="hljs-keyword">new</span> Icon(Icons.star, <span class="hljs-built_in">color</span>: Colors.black),
              <span class="hljs-keyword">new</span> Icon(Icons.star, <span class="hljs-built_in">color</span>: Colors.black),
              <span class="hljs-keyword">new</span> Icon(Icons.star, <span class="hljs-built_in">color</span>: Colors.black),
              <span class="hljs-keyword">new</span> Icon(Icons.star, <span class="hljs-built_in">color</span>: Colors.black),
            ],
          ),
          <span class="hljs-keyword">new</span> Text(
            <span class="hljs-string">'170 Reviews'</span>,
            style: <span class="hljs-keyword">new</span> TextStyle(
              <span class="hljs-built_in">color</span>: Colors.black,
              fontWeight: FontWeight.w800,
              fontFamily: <span class="hljs-string">'Roboto'</span>,
              letterSpacing: <span class="hljs-number">0.5</span>,
              fontSize: <span class="hljs-number">20.0</span>,
            ),
          ),
        ],
      ),
    )

<span class="hljs-comment">//iconList控件</span>
<span class="hljs-keyword">new</span> Container(
        padding: <span class="hljs-keyword">new</span> EdgeInsets.all(<span class="hljs-number">20.0</span>),
        child: <span class="hljs-keyword">new</span> Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            <span class="hljs-keyword">new</span> Column(
              children: [
                <span class="hljs-keyword">new</span> Icon(Icons.kitchen, <span class="hljs-built_in">color</span>: Colors.<span class="hljs-built_in">green</span>[<span class="hljs-number">500</span>]),
                <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'PREP:'</span>),
                <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'25 min'</span>),
              ],
            ),
            <span class="hljs-keyword">new</span> Column(
              children: [
                <span class="hljs-keyword">new</span> Icon(Icons.timer, <span class="hljs-built_in">color</span>: Colors.<span class="hljs-built_in">green</span>[<span class="hljs-number">500</span>]),
                <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'COOK:'</span>),
                <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'1 hr'</span>),
              ],
            ),
            <span class="hljs-keyword">new</span> Column(
              children: [
                <span class="hljs-keyword">new</span> Icon(Icons.restaurant, <span class="hljs-built_in">color</span>: Colors.<span class="hljs-built_in">green</span>[<span class="hljs-number">500</span>]),
                <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'FEEDS:'</span>),
                <span class="hljs-keyword">new</span> Text(<span class="hljs-string">'4-6'</span>),
              ],
            ),
          ],
        ),
      )
</code></pre>
<p>Row和Column可以相互包裹，使页面能够实现整齐的布局，只因其特性总是横向或纵向充满父控件，比如最外层使用时，会自动充满全屏幕。但是当页面内容需要超出屏幕尺寸时，就用<a href="https://docs.flutter.io/flutter/material/ListTile-class.html" rel="nofollow noreferrer" target="_blank">ListTile</a>和<a href="https://docs.flutter.io/flutter/widgets/ListView-class.html" rel="nofollow noreferrer" target="_blank">ListView</a>代替。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013712259" src="https://static.alili.tech/img/remote/1460000013712259" alt="最终显示效果" title="最终显示效果" style="cursor: pointer; display: inline;"></span></p>
<p>完整代码（由于手机屏幕尺寸无法适应此案例，运行后长和宽都会报溢出错误，大家最好使用平板虚拟机测试此案例，或者调整代码中的字体大小和控件尺寸，以满足显示要求）：<br><strong>Dart code:</strong>&nbsp;<a href="https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/pavlova/main.dart" rel="nofollow noreferrer" target="_blank">main.dart</a><br><strong>Images:</strong>&nbsp;<a href="https://github.com/flutter/website/tree/master/_includes/code/layout/pavlova/images" rel="nofollow noreferrer" target="_blank">images</a><br><strong>Pubspec:</strong>&nbsp;<a href="https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/pavlova/pubspec.yaml" rel="nofollow noreferrer" target="_blank">pubspec.yaml</a></p>
<h3 id="articleHeader4">控件的缩放</h3>
<p><strong>案例4-缩放</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000013712260" src="https://static.alili.tech/img/remote/1460000013712260" alt="子控件缩放" title="子控件缩放" style="cursor: pointer;"></span></p>
<p>上图中，三个横向排列的图片控件，中间控件的尺寸比两边的大一倍，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Center(
  child: new Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      new Expanded(
        child: new Image.asset('images/pic1.jpg'),
      ),
      new Expanded(              //使用Expanded控件对Image控件进行包裹
        flex: 2,                 //flex值默认为1，这里改成2之后，其子控件2倍放大
        child: new Image.asset('images/pic2.jpg'),
      ),
     new Expanded(
        child: new Image.asset('images/pic3.jpg'),
      ),
))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>new Center(
  <span class="hljs-name">child</span>: new Row(
    <span class="hljs-name">crossAxisAlignment</span>: CrossAxisAlignment.center,
    children: [
      new Expanded(
        <span class="hljs-name">child</span>: new Image.asset('images/pic1.jpg'),
      ),
      new Expanded(              <span class="hljs-name">//</span>使用Expanded控件对Image控件进行包裹
        flex: <span class="hljs-number">2</span>,                 //flex值默认为<span class="hljs-number">1</span>，这里改成<span class="hljs-number">2</span>之后，其子控件<span class="hljs-number">2</span>倍放大
        child: new Image.asset('images/pic2.jpg'),
      ),
     new Expanded(
        <span class="hljs-name">child</span>: new Image.asset('images/pic3.jpg'),
      ),
))
</code></pre>
<p>完整代码：<br><strong>Dart code:</strong>&nbsp;<a href="https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row-expanded/main.dart" rel="nofollow noreferrer" target="_blank">main.dart</a><br><strong>Images:</strong>&nbsp;<a href="https://github.com/flutter/website/tree/master/_includes/code/layout/row-expanded/images" rel="nofollow noreferrer" target="_blank">images</a><br><strong>Pubspec:</strong>&nbsp;<a href="https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row-expanded/pubspec.yaml" rel="nofollow noreferrer" target="_blank">pubspec.yaml</a></p>
<p>由于处理逻辑和布局样式都一起书写到代码中，加上控件的嵌套，flutter的代码会如同html的标签一样嵌套很多层，对前端开发者可能需要时间适应，但对我这种新萌来说降低了从CSS和处理代码之间来回对照的麻烦，并且flutter的内置控件默认的样式已经十分整洁，无需单独再学习类似前端CSS处理页面布局的语法和结构，总体来说降低了不少学习成本，上手更快更简单。能在短时间内掌握生产技能，成就感油然而生，自然有继续学下去的动力。</p>
<p>以上便是最基础的排列布局介绍，相信看到这里的小伙伴已经明白怎么写APP了，今天就到这里~感谢大家支持！<br><strong>flutter 中文社区（官方QQ群：338252156）</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter笔记7：flutter页面布局基础，看完这篇就可以用flutter写APP了

## 原文链接
[https://segmentfault.com/a/1190000013712247](https://segmentfault.com/a/1190000013712247)

