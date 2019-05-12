---
title: 'flutter笔记3：基础语法、框架、控件' 
date: 2018-12-11 2:30:10
hidden: true
slug: 818k6s5tmpd
categories: [reprint]
---

{{< raw >}}

                    
<p>flutter环境和运行环境搭建好之后，可以开始撸码了，然而当你打开VScode，在打开项目文件夹后，摆在你面前的是main.dart被打开的样子，里面七七八八的已经写好了一堆代码，是不是很懵逼？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013672506" src="https://static.alili.tech/img/remote/1460000013672506" alt="项目默认打开的main.dart" title="项目默认打开的main.dart" style="cursor: pointer; display: inline;"></span></p>
<p>不要紧，人家官方文档上说了，flutter的玩家不需要Dart和移动端语言开发经验，只需要熟悉面向对象编程即可。<br>神马？面向对象也不懂？还是百度打打基础去吧。。。</p>
<h2 id="articleHeader0">先来点下酒菜</h2>
<p>简单了解下上图中的几个标记的编号：<br>A. <code>main.dart</code><br>此文件是每一个flutter项目的默认入口文件，也就是说每个flutter项目启动的时候，默认先运行这个文件的代码，这个入口文件理论上应该是可以配置的，不过我还不知道在哪配，大神请留言，嘿嘿。注意看它所在的路径，在项目根目录的<strong>lib</strong>文件下，而文件的后缀名<strong>.dart</strong>是flutter文件的格式，是不是很容易联想到flutter使用的dart语言。</p>
<p>B.<code>import 'package:flutter/material.dart';</code><br>每一个<strong>.dart</strong>文件的第一行都会导入flutter/material.dart包，这个包是Flutter实现Material Design设计风格的基础包，里面有文本输入框(Text)、图标(Icon)、图片(Image)、行排列布局(Align)、列排列布局(Column)、Decoration(我也不知道是啥)、异步（%#￥@晕倒..）、动画等等等等控件，大家可以理解为网页中的按钮、标题、选项框呀等等控件库吧。</p>
<p>Material Design是啥？是谷歌推出的一套视觉设计语言。比如有的APP可以换皮肤，而每一套皮肤就是一种设计语言，有古典风呀炫酷风呀极简风呀神马的，而Material Design就是谷歌风，有兴趣的同学可以学习了解一下<a href="https://material.io/guidelines/" rel="nofollow noreferrer" target="_blank">Material Design官方原版</a>和<a href="http://wiki.jikexueyuan.com/project/material-design/material-design-intro/introduction.html" rel="nofollow noreferrer" target="_blank">Material Design中文翻译版</a>，这是每一个产品经理的必修教材。</p>
<p>C.<code>void main() =&gt; runApp(new MyApp());</code><br>有点像ES6语法的箭头函数是不是？对学习过前端开发的同学是不是很熟悉呀，意思等同于：</p>
<blockquote>void main() {<br>   return runApp(Widget app);<br>}</blockquote>
<p>这里的<code>main()</code>函数是Dart程序的入口，也就是说，Flutter程序在运行的时候，第一个执行的函数就是main()函数，结合A的入口文件，flutter项目默认执行的第一句代码，就是<strong>main.dart</strong>文件里的<code>void main() =&gt; runApp(new MyApp());</code></p>
<p>D和E.<code>StatelessWidget</code>和<code>StatefulWidget</code><br>这是flutter最基础的的两种控件类，分别叫无状态类和有状态类，两者的差别在于是否有状态，玩家创建的所有控件都继承自这两个控件。当你想展示的内容只需要改动控件本身的配置信息就可以实现时，例如文本、图片等，可以考虑使用无状态控件（StatelessWidget）。如果你想展示的内容是可以动态改变才能实现时，例如滚动列表、动画效果等，可以考虑使用有状态控件（StatefulWidget）。</p>
<p>其实我也不是很明白，StatefulWidget还有生命周期一说，具体怎么回事，大家可以参考<a href="https://www.jianshu.com/u/a5c7473beab9" rel="nofollow noreferrer" target="_blank">何小有</a>的<a href="https://www.jianshu.com/p/213bfa3d40dd" rel="nofollow noreferrer" target="_blank">《Flutter框架基础》</a>，如果你悟性好，分分钟贯通也说不定。</p>
<h2 id="articleHeader1">写一个APP试试？</h2>
<p>前面写了一大堆废话，高手们已经不耐烦，萌新们看不懂我也不管了，撸一管<a href="https://flutter.io/get-started/codelab/" rel="nofollow noreferrer" target="_blank">官方萌新教程</a>先~</p>
<h3 id="articleHeader2">第一步</h3>
<p>把<code>main.dart</code>里的代码替换成这个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
         ),
        body: new Center(
          child: new Text('Hello World'),
        ),
      ),
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
<span class="hljs-keyword">import</span> <span class="hljs-symbol">'package</span>:flutter/material.dart';

void main() =&gt; runApp(<span class="hljs-keyword">new</span> <span class="hljs-type">MyApp</span>());

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">MaterialApp</span>(
      title: <span class="hljs-symbol">'Welcome</span> to <span class="hljs-type">Flutter</span>',
      home: <span class="hljs-keyword">new</span> <span class="hljs-type">Scaffold</span>(
        appBar: <span class="hljs-keyword">new</span> <span class="hljs-type">AppBar</span>(
          title: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(<span class="hljs-symbol">'Welcome</span> to <span class="hljs-type">Flutter</span>'),
         ),
        body: <span class="hljs-keyword">new</span> <span class="hljs-type">Center</span>(
          child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(<span class="hljs-symbol">'Hello</span> <span class="hljs-type">World</span>'),
        ),
      ),
    );
  }
}
</code></pre>
<p>保存之后，到终端里输入这个：</p>
<blockquote>flutter doctor<br>flutter run</blockquote>
<p>看看你的测试机都发生了什么，好了，恭喜！你的flutter人生的第一个hallo world告成~！</p>
<p>牢记这一点，flutter中的一切都是控件（<strong>Widget</strong>，有的文章称呼组件，就当作一个意思吧），控件是可以嵌套的，嵌套后就会形成组件树。</p>
<p>上面的代码可以简单看看，能懂多少是多少吧，对熟悉面向对象的同学应该没有难度。</p>
<h3 id="articleHeader3">第二步</h3>
<p>打开文件<code>pubspec.yaml</code>，在这里加一句代码<code>english_words: ^3.1.0</code>并保存：<br><span class="img-wrap"><img data-src="/img/remote/1460000013672507" src="https://static.alili.tech/img/remote/1460000013672507" alt="引入外部包" title="引入外部包" style="cursor: pointer; display: inline;"></span></p>
<p>你会看到终端有动作：<br><span class="img-wrap"><img data-src="/img/remote/1460000013672508" src="https://static.alili.tech/img/remote/1460000013672508" alt="引包后热更新" title="引包后热更新" style="cursor: pointer; display: inline;"></span></p>
<p>再回到<em>*main.dart</em>文件，加一句代码<code>import 'package:english_words/english_words.dart';</code>：<br><span class="img-wrap"><img data-src="/img/remote/1460000013672509" src="https://static.alili.tech/img/remote/1460000013672509" alt="引入的包从未使用过" title="引入的包从未使用过" style="cursor: pointer; display: inline;"></span></p>
<p>这时控制台的_问题_栏也会弹出一个提示：<br><span class="img-wrap"><img data-src="/img/remote/1460000013672510" src="https://static.alili.tech/img/remote/1460000013672510" alt="不好好利用引入的包的后果" title="不好好利用引入的包的后果" style="cursor: pointer; display: inline;"></span></p>
<p>这是flutter的一个撸码规则，为了保证代码的高效和简洁，避免引入无用的包造成程序臃肿、运行效率低下，然后我们再修改一下代码并保存：<br><span class="img-wrap"><img data-src="/img/remote/1460000013672511" src="https://static.alili.tech/img/remote/1460000013672511" alt="字符串的驼峰格式化" title="字符串的驼峰格式化" style="cursor: pointer; display: inline;"></span></p>
<p>这时候APP里的<strong>Hello World</strong>变成了下面这个样子：<br><span class="img-wrap"><img data-src="/img/remote/1460000013672512" src="https://static.alili.tech/img/remote/1460000013672512" alt="好不好玩呀" title="好不好玩呀" style="cursor: pointer;"></span></p>
<p>到终端中按 <strong>r</strong> 键，在APP中发现什么变化都没有，而按 <strong>R</strong> 键，APP重启，屏幕中央的字符串随机改变了，说明APP一旦启动后，玩家创建的无状态控件实例中的属性值定义后，刷新页面不会再更新，官方的说法是无状态控件实例中的属性值为final类型，意味着一旦定义将无法变更，只有APP重启后，重新执行代码，这时候重生了控件实例，所以屏幕中央的字符串改变了，但是用 <strong>r</strong> 还是不会变。</p>
<h3 id="articleHeader4">第三步</h3>
<p>这次来点有难度的，用到了<strong>StatefulWidget</strong>控件，请将<code>main.dart</code>的代码替换为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // final wordPair = new WordPair.random();
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Hello Flutter'),
        ),
        body: new Center(
          // child: new Text('Hello World'),
          // child: new Text(wordPair.asPascalCase), //asPascalCase 驼峰样式，字符串中的每个单词的首字母都会大写
              child: new RandomWords(),  //定义子控件为有状态控件RandomWords的实例
        ),
      ),
    );
  }
}
//定义了一个有状态控件，继承自StatefulWidget
class RandomWords extends StatefulWidget {
  @override
  createState() => new RandomWordsState();  //为StatefulWidget控件RandomWords定义一个状态类
}
//定义了一个状态控件，继承自状态类State<RandomWords>，<RandomWords>指明这个状态控件是RandomWords控件的
class RandomWordsState extends State<RandomWords> {
    @override
    Widget build(BuildContext context) {
      final wordPair = new WordPair.random();
      return new Text(wordPair.asPascalCase);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-symbol">'package</span>:flutter/material.dart';
<span class="hljs-keyword">import</span> <span class="hljs-symbol">'package</span>:english_words/english_words.dart';

void main() =&gt; runApp(<span class="hljs-keyword">new</span> <span class="hljs-type">MyApp</span>());

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-comment">// final wordPair = new WordPair.random();</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">MaterialApp</span>(
      title: <span class="hljs-symbol">'Welcome</span> to <span class="hljs-type">Flutter</span>',
      home: <span class="hljs-keyword">new</span> <span class="hljs-type">Scaffold</span>(
        appBar: <span class="hljs-keyword">new</span> <span class="hljs-type">AppBar</span>(
          title: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(<span class="hljs-symbol">'Hello</span> <span class="hljs-type">Flutter</span>'),
        ),
        body: <span class="hljs-keyword">new</span> <span class="hljs-type">Center</span>(
          <span class="hljs-comment">// child: new Text('Hello World'),</span>
          <span class="hljs-comment">// child: new Text(wordPair.asPascalCase), //asPascalCase 驼峰样式，字符串中的每个单词的首字母都会大写</span>
              child: <span class="hljs-keyword">new</span> <span class="hljs-type">RandomWords</span>(),  <span class="hljs-comment">//定义子控件为有状态控件RandomWords的实例</span>
        ),
      ),
    );
  }
}
<span class="hljs-comment">//定义了一个有状态控件，继承自StatefulWidget</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RandomWords</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatefulWidget</span> </span>{
  <span class="hljs-meta">@override</span>
  createState() =&gt; <span class="hljs-keyword">new</span> <span class="hljs-type">RandomWordsState</span>();  <span class="hljs-comment">//为StatefulWidget控件RandomWords定义一个状态类</span>
}
<span class="hljs-comment">//定义了一个状态控件，继承自状态类State&lt;RandomWords&gt;，&lt;RandomWords&gt;指明这个状态控件是RandomWords控件的</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RandomWordsState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State&lt;RandomWords&gt;</span> </span>{
    <span class="hljs-meta">@override</span>
    <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
      <span class="hljs-keyword">final</span> wordPair = <span class="hljs-keyword">new</span> <span class="hljs-type">WordPair</span>.random();
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(wordPair.asPascalCase);
    }
}
</code></pre>
<p>保存代码后，再到终端，每按一次 <strong>r</strong> 键，APP中央的字符串就会随机改变，这就是StatefulWidget类的特性，其实例内的属性值可以在对象实例化后随意变更，一个StatefulWidget控件至少包含两个类，一个是用于实例化的StatefulWidget类，一个是它的State状态类。纯粹的StatefulWidget控件本身是不可变的，但是它的State类会在StatefulWidget控件的整个生命周期持续存在。</p>
<p>经过这么一折腾，我也对StatefulWidget和StatelessWidget的特性有个了一个简单的认识，不知道小伙伴们感觉如何呀，如果还有不明白的地方，请在留言中提问，<a href="https://www.jianshu.com/c/ebc9d2e84214" rel="nofollow noreferrer" target="_blank">flutter圈子</a>说不定哪个大牛心情好会有解答哟。</p>
<p>本篇就介绍到这里，大家可以自行敲敲代码，多体验体验，从知道flutter到现在36小时，而我能写到这里，首先感谢技术达人<a href="https://www.jianshu.com/u/2da8e242d07a" rel="nofollow noreferrer" target="_blank">狐神</a>的大力支持，帮我拉来了flutter先驱<a href="https://www.jianshu.com/u/a5c7473beab9" rel="nofollow noreferrer" target="_blank">何小有</a>和一梭子前端大神，再者感谢<a href="https://www.jianshu.com/u/a5c7473beab9" rel="nofollow noreferrer" target="_blank">何小有</a>在<a href="https://www.jianshu.com/c/ebc9d2e84214" rel="nofollow noreferrer" target="_blank">flutter圈子</a>的入门扫盲贴投稿，也感谢大家的支持，我也就不再废话什么自我激励了，总之  加油~！</p>
<p>再啰嗦一句广告，对flutter感兴趣的小伙伴可以关注我，欢迎大家到<a href="https://www.jianshu.com/c/ebc9d2e84214" rel="nofollow noreferrer" target="_blank">Flutter圈子</a>中投稿，也可以联系管理员加入我们的flutter微信群嗨聊，谢谢捧场~！<br><strong>flutter 中文社区（官方QQ群：338252156）</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter笔记3：基础语法、框架、控件

## 原文链接
[https://segmentfault.com/a/1190000013672501](https://segmentfault.com/a/1190000013672501)

