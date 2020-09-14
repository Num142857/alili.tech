---
title: '使用Swift开发React Native组件（一）' 
date: 2019-01-13 2:30:11
hidden: true
slug: 60ddbjht5w7
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用Swift开发React Native组件（一）</h1>
<blockquote><p>RN已经在圈子里流行很长一段时间了，网上相关的文章和介绍也很多，笔者很早之前也接触过一段时间，但也仅仅只是浅尝即止，这次正好有时间，所以准备深度学习一番，整体调研下来感觉如果只是仅仅学习React层面未免还是太浅薄，遇到很多问题无法从Native去找解决方案，理解上也有差距。<br>IOS平台的RN是用OC编写的，可是OC的语法实在太难下口了，所以笔者选了Swift，但使用Swift的介绍在官网上仅仅只有一小段，民间资料也很少。<br>经过一段时间的探索，几个基础场景已经被笔者攻克，遂将成果分享出来，希望能够帮助到大家，由于笔者也是第一次接触IOS开发，如果有问题还请斧正，谢谢。<br>本系列所有案例都将集中在<a href="https://github.com/mtyang/React-native-Swift" rel="nofollow noreferrer" target="_blank">GitHub</a>,以后有新的组件也将持续更新。</p></blockquote>
<h2 id="articleHeader1">系列导航</h2>
<p><a href="https://segmentfault.com/a/1190000009579393">第一章-IOS开发基础入门</a><br>[第二章-TodoList案例讲解]()<br>[第三章-UI Components]()<br>[第四章-Native Module]()</p>
<h2 id="articleHeader2">本章内容介绍</h2>
<p>因为本系列的目标群体是和笔者一样有前端经验，IOS开发零经验的同学。所以本章讲的东西暂时和RN无关，主要介绍开发工具、学习资料等基础辅助型知识。</p>
<h2 id="articleHeader3">案例GitHub</h2>
<p><a href="https://github.com/mtyang/React-native-Swift/tree/master/osSwift/" rel="nofollow noreferrer" target="_blank">https://github.com/mtyang/Rea...</a></p>
<h2 id="articleHeader4">OC还要学吗</h2>
<p>个人感觉OC还是要学的，目前市场上很多组件还是以OC为主，有时候为了学习思路还是要看看别人的代码，但是不必像Swift一样深入，入门即可，介绍这篇文章 <a href="https://github.com/qinjx/30min_guides/blob/master/ios.md/" rel="nofollow noreferrer" target="_blank">https://github.com/qinjx/30mi...</a></p>
<h2 id="articleHeader5">OC TO Swift</h2>
<p>这个工具是将OC代码翻译成Swift，我也是开了下脑洞google一下发现的，这非常有助于我们理解一些OC的代码。</p>
<blockquote><p><a href="https://objectivec2swift.com/#/home/converter/" rel="nofollow noreferrer" target="_blank">在线翻译</a><br><a href="https://objectivec2swift.com/#/home/xcode-extension/" rel="nofollow noreferrer" target="_blank">Xcode插件</a> 插件非常好用，强烈推荐。</p></blockquote>
<h2 id="articleHeader6">学习资料</h2>
<h3 id="articleHeader7">基础入门</h3>
<ol>
<li><p><a href="https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/" rel="nofollow noreferrer" target="_blank">Apple 官方引导</a></p></li>
<li><p><a href="https://itisjoe.gitbooks.io/swiftgo/content/more/xcode_intro.html" rel="nofollow noreferrer" target="_blank">Xcode入门</a> 推荐</p></li>
</ol>
<h3 id="articleHeader8">语法入门</h3>
<p>有中文PDF和英文原文档<a href="http://www.swifthumb.com/forum.php?mod=viewthread&amp;tid=21469&amp;page=1&amp;extra=#pid69380" rel="nofollow noreferrer" target="_blank">Swift入门 中文</a> <a href="https://swift.org/about/" rel="nofollow noreferrer" target="_blank">英文原档</a></p>
<h3 id="articleHeader9">UIkit</h3>
<p>这个类将是我们学习的重点，后面都将用它来构建我们的应用界面，介绍<a href="https://itisjoe.gitbooks.io/swiftgo/content" rel="nofollow noreferrer" target="_blank">另外一本入门书籍</a>这是一本弯弯同学写的，版本虽然是2.0，但是有xcode这种强大的编辑器会提醒你最新的语法是什么，除了一些关键字翻译的和我们的习惯不一致，其他都讲的不错。</p>
<h3 id="articleHeader10">Playground</h3>
<p>测试JS代码我们要么用node执行测试文件，要么直接在console中直接测试，在Xcode也提供了这样的场所，这在我们一边看文档一边学习时特别有帮助。</p>
<ol><li><p>在项目中新建文件，选择Playground文件类型。</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVOl9G?w=731&amp;h=523" src="https://static.alili.tech/img/bVOl9G?w=731&amp;h=523" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ol><li><p>左边编码后右侧及时反馈代码执行结果，非常适合我们进行算法测试。</p></li></ol>
<p><span class="img-wrap"><img data-src="/img/bVOl9O?w=736&amp;h=188" src="https://static.alili.tech/img/bVOl9O?w=736&amp;h=188" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader11">Hello world</h2>
<h3 id="articleHeader12">Storyboard</h3>
<p>在IOS的世界中有两种构建界面的方式，一种编码方式，可以理解为在JS中用 <code>document.createElement</code> 来创建HTML。<br>另外一种Storyboard了，Storyboard是IOS开发很强大的一个功能，以至于笔者刚开始接触的时候也被震撼到了，心想这IOS开发也太简单了吧，就是一个拖字诀啊，但是在和我们ios的同学聊过之后才知道业内基本很少使用这个功能，从开发角度是很方便，但是软件从来都是一个工程，我们需要不断的维护和升级，所以在复杂业务场景下使用编码构建界面。</p>
<h3 id="articleHeader13">界面介绍</h3>
<p><a href="https://itisjoe.gitbooks.io/swiftgo/content/more/open_project.html" rel="nofollow noreferrer" target="_blank">创建项目</a></p>
<p>根据上面的引导就完成了项目的创建,</p>
<p><span class="img-wrap"><img data-src="/img/bVOmae?w=1397&amp;h=865" src="https://static.alili.tech/img/bVOmae?w=1397&amp;h=865" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><p>左侧为项目文件目录，中间就是Storyboard的工作台了，右下角则是UI列表。</p></blockquote>
<h2 id="articleHeader14">两个 Storyboard</h2>
<p>注意看上图中左边文件中有两个Storyboard类型的文件。<br><code>LaunchScreen.storyboard</code>是开启APP时的引导界面。<br><code>Main.storyboard</code>是应用的内容界面。<br>这两个文件也可以在下图的地方进行个配置。</p>
<p><span class="img-wrap"><img data-src="/img/bVOmar?w=1131&amp;h=677" src="https://static.alili.tech/img/bVOmar?w=1131&amp;h=677" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">Say hello</h2>
<p>我们选中<code>Main.storyboard</code>这个文件，然后在右侧找到Label标签，并将它拖动到界面中，拖动过程中触摸板会有震动给你反馈，如下图。</p>
<p><span class="img-wrap"><img data-src="/img/bVOmaw?w=1394&amp;h=895" src="https://static.alili.tech/img/bVOmaw?w=1394&amp;h=895" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>接下来就很简单了，我们双击Label标签然后输入 <code>Hello world</code>，在按下 <code>cmd + R</code>键，我们的第一个IOS程序就运行起来了。</p>
<blockquote><p>提示：<code>cmd + 1、2、3、4、5</code>键可以改变模拟器的尺寸，数字键是单选，如果你非要一起按我也没办法。</p></blockquote>
<h2 id="articleHeader16">CocoaPods</h2>
<h3 id="articleHeader17">简介</h3>
<p>当我们开发应用时必定会用到第三方库，以前我们都是直接下载源文件到项目中，最后有了node和npm，生活质量瞬间提高了很多，那么在ios中，CocoaPods就是iOS最常用最有名的类库管理器了。</p>
<h3 id="articleHeader18">安装</h3>
<p>在终端中依次执行下面的命令</p>
<p><code>gem sources --remove https://rubygems.org/</code><br><code>sudo gem install cocoapods</code></p>
<p>第一条命令是改变文件源，第二个则是cocoapods，等待一段时间后看见如下字样说明安装成功。</p>
<p><code>*** CURRENT SOURCES ***</code></p>
<p>注意：也有可能不是这个提醒，所以我们验证一下。</p>
<p><code>pod --version</code></p>
<p>如果出现版本号明细就说明我们已经安装成功了。</p>
<h3 id="articleHeader19">使用</h3>
<p>cocoapods的配置和我们npm稍有差异，不过也很简单，首先进入我们的项目执行命令。<br><code>pod init</code><br>cocoapods会在目录中创建<code>Podfile</code>文件，类似npm中的<code>package.json</code>。</p>
<p>我们来看一下生成好的podfile文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    # Uncomment this line to define a global platform for your project
    # platform :ios, '9.0'
    
    target 'iwtest' do
      # Uncomment this line if you're using Swift or would like to use dynamic frameworks
      # use_frameworks!
    
      # Pods for iwtest
    
      target 'iwtestTests' do
        inherit! :search_paths
        # Pods for testing
      end
    
      target 'iwtestUITests' do
        inherit! :search_paths
        # Pods for testing
      end
    end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell">    <span class="hljs-comment"># Uncomment this line to define a global platform for your project</span>
    <span class="hljs-comment"># platform :ios, '9.0'</span>
    
    target <span class="hljs-string">'iwtest'</span> <span class="hljs-keyword">do</span>
      <span class="hljs-comment"># Uncomment this line if you're using Swift or would like to use dynamic frameworks</span>
      <span class="hljs-comment"># use_frameworks!</span>
    
      <span class="hljs-comment"># Pods for iwtest</span>
    
      target <span class="hljs-string">'iwtestTests'</span> <span class="hljs-keyword">do</span>
        inherit! <span class="hljs-symbol">:search_paths</span>
        <span class="hljs-comment"># Pods for testing</span>
      <span class="hljs-keyword">end</span>
    
      target <span class="hljs-string">'iwtestUITests'</span> <span class="hljs-keyword">do</span>
        inherit! <span class="hljs-symbol">:search_paths</span>
        <span class="hljs-comment"># Pods for testing</span>
      <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span></code></pre>
<p>现在我们要安装一个第三方的类库 <code>SnapKit</code>，这是它的github主页<code>https://github.com/SnapKit/SnapKit</code>，这个类库是用来做布局的，在这里要表扬一下CSS，绝对是世界上最好的布局语言，没有之一，等我们后面学了IOS的布局方式后你就会深深理解我这句话的意思了。</p>
<p>编辑<code>podfile</code>然后加入我们的需要的类库。</p>
<p><code>vim Podfile</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    # 定式部分
    source 'https://github.com/CocoaPods/Specs.git'
    platform :ios, '10.0'
    use_frameworks!
    
    target 'testTodo' do
    
      # 需要引入的类库写到这里

      pod 'SnapKit', '~> 3.2.0'
    
      # Pods for testTodo
      target 'testTodoTests' do
        inherit! :search_paths
        # Pods for testing
      end
    
      target 'testTodoUITests' do
        inherit! :search_paths
        # Pods for testing
      end
    
    end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell">    <span class="hljs-comment"># 定式部分</span>
    source <span class="hljs-string">'https://github.com/CocoaPods/Specs.git'</span>
    platform <span class="hljs-symbol">:ios</span>, <span class="hljs-string">'10.0'</span>
    use_frameworks!
    
    target <span class="hljs-string">'testTodo'</span> <span class="hljs-keyword">do</span>
    
      <span class="hljs-comment"># 需要引入的类库写到这里</span>

      pod <span class="hljs-string">'SnapKit'</span>, <span class="hljs-string">'~&gt; 3.2.0'</span>
    
      <span class="hljs-comment"># Pods for testTodo</span>
      target <span class="hljs-string">'testTodoTests'</span> <span class="hljs-keyword">do</span>
        inherit! <span class="hljs-symbol">:search_paths</span>
        <span class="hljs-comment"># Pods for testing</span>
      <span class="hljs-keyword">end</span>
    
      target <span class="hljs-string">'testTodoUITests'</span> <span class="hljs-keyword">do</span>
        inherit! <span class="hljs-symbol">:search_paths</span>
        <span class="hljs-comment"># Pods for testing</span>
      <span class="hljs-keyword">end</span>
    
    <span class="hljs-keyword">end</span></code></pre>
<p>退出编辑模式后执行命令进行安装<br><code>pod install</code></p>
<p>OK，如果不出问题我们就发现类库已经被安装了，这个时候还有一个小细节，我们如果使用了cocoapods来管理类库，它会帮我们在项目中创建一个 <code>testTodo.xcworkspace</code>启动文件，以后我们打开应用就要通过这个文件来打开了。</p>
<h2 id="articleHeader20">OC Swift 混编</h2>
<p>这一节就到了我们要讲的最重要的一节，众所周知RN是用OC编写的，那如何才能是用Swift来编写RN的组件呢，答案就是IOS原生就支持OC和Swift混编应用。</p>
<p>无论是在Swift的项目中新建OC文件还是在OC的项目中新建Swift文件，Xcode都会有下面的一个提示。</p>
<p><span class="img-wrap"><img data-src="/img/bVOmaF?w=733&amp;h=204" src="https://static.alili.tech/img/bVOmaF?w=733&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>询问是否创建一个bridge文件，这个文件就是混编的关键，选择 Create之后会发现工程中多出了一个 <code>project-iwtest-Bridging-Header.h</code>的文件，project是你的工程名。</p>
<p><span class="img-wrap"><img data-src="/img/bVOmaG?w=280&amp;h=78" src="https://static.alili.tech/img/bVOmaG?w=280&amp;h=78" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如上图，我在OC的项目中创建了一个<code>test.swift</code>文件，并创建了一个bridge文件，这个文件什么意思呢，我们来看下<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html" rel="nofollow noreferrer" target="_blank">文档介绍</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bVOmaH?w=1432&amp;h=1018" src="https://static.alili.tech/img/bVOmaH?w=1432&amp;h=1018" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>大概意思就是告诉我们，这个文件主要的功能是将OC的文件接口放在一起然后供Swift文件调用，红圈标注出来的意思是如果你想自己手动创建一个bridge文件也是可以的，但是需要做相应的配置。</p>
<h3 id="articleHeader21">在OC中调用Swift</h3>
<p>首先我们定义一个Swift类，定义一个sayHello函数，如果它被调用的话，控制台会打印出<code>Hello, Swift</code>日志。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import Foundation

    @objc(MySwift)
    class MySwift:NSObject {
        
        func sayHello(){
            print(&quot;Hello, Swift&quot;)
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="Swift">    <span class="hljs-keyword">import</span> Foundation

    <span class="hljs-meta">@objc</span>(<span class="hljs-type">MySwift</span>)
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MySwift</span>:<span class="hljs-title">NSObject</span> </span>{
        
        <span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">sayHello</span><span class="hljs-params">()</span></span>{
            <span class="hljs-built_in">print</span>(<span class="hljs-string">"Hello, Swift"</span>)
        }
    }
</code></pre>
<p>然后我们编辑<code>ViewController.m</code> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    #import &quot;ViewController.h&quot;
    #import &quot;iwtest-Swift.h&quot;
    
    @interface ViewController ()
    
    @end
    
    @implementation ViewController
    
    - (void)viewDidLoad {
        [super viewDidLoad];
        
        MySwift *mySwift = [[MySwift alloc] init];  
        [swiftObject log];
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    
    - (void)didReceiveMemoryWarning {
        [super didReceiveMemoryWarning];
        // Dispose of any resources that can be recreated.
    }
    @end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="C">    <span class="hljs-meta">#import <span class="hljs-meta-string">"ViewController.h"</span></span>
    <span class="hljs-meta">#import <span class="hljs-meta-string">"iwtest-Swift.h"</span></span>
    
    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">ViewController</span> ()</span>
    
    <span class="hljs-keyword">@end</span>
    
    <span class="hljs-class"><span class="hljs-keyword">@implementation</span> <span class="hljs-title">ViewController</span></span>
    
    - (<span class="hljs-keyword">void</span>)viewDidLoad {
        [<span class="hljs-keyword">super</span> viewDidLoad];
        
        MySwift *mySwift = [[MySwift alloc] init];  
        [swiftObject log];
        <span class="hljs-comment">// Do any additional setup after loading the view, typically from a nib.</span>
    }
    
    
    - (<span class="hljs-keyword">void</span>)didReceiveMemoryWarning {
        [<span class="hljs-keyword">super</span> didReceiveMemoryWarning];
        <span class="hljs-comment">// Dispose of any resources that can be recreated.</span>
    }
    <span class="hljs-keyword">@end</span></code></pre>
<p>先执行<code>cmd + b</code>，发现没有报错，然后<code>cmd + r</code>，一段时间后控制台准确无误打印出<code>Hello, Swift</code>日志。</p>
<p><span class="img-wrap"><img data-src="/img/bVOmaK?w=353&amp;h=177" src="https://static.alili.tech/img/bVOmaK?w=353&amp;h=177" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>现在我们来解释一下这其中的关键，总共有两处。</p>
<ol>
<li><p>Swift中的 <code>@objc(MySwift)</code> 这个关键字是Xode定义的，它在编译的时候将Swift文件也转换成OC文件，所以它最后才能以OC的代码格式执行。</p></li>
<li><p>OC文件中的<code> #import "iwtest-Swift.h"</code>这个头文件也是Xcode自动创建的，它里面引用了所有你的工程中Swift文件，所以OC文件才能找到并引用。</p></li>
</ol>
<h3 id="articleHeader22">在Swift中调用OC</h3>
<p>我们定义一个OC类，首先创建头文件 <code>Myoc.h</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    #import <foundation/Foundation.h>

    @interface Myoc : NSObject {}
    
    + (void) sayHello;
    
    @end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="C">    <span class="hljs-meta">#import <span class="hljs-meta-string">&lt;foundation/Foundation.h&gt;</span></span>

    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">Myoc</span> : <span class="hljs-title">NSObject</span> </span>{}
    
    + (<span class="hljs-keyword">void</span>) sayHello;
    
    <span class="hljs-keyword">@end</span></code></pre>
<p>再创建实现文件 <code>Myoc.m</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    #import <Foundation/Foundation.h>
    #import &quot;Myoc.h&quot;
    
    @implementation Myoc
    
    +(void) sayHello {
        NSLog(@&quot;Hello, OC&quot;);
    }
    @end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code class="C">    <span class="hljs-meta">#import <span class="hljs-meta-string">&lt;Foundation/Foundation.h&gt;</span></span>
    <span class="hljs-meta">#import <span class="hljs-meta-string">"Myoc.h"</span></span>
    
    <span class="hljs-class"><span class="hljs-keyword">@implementation</span> <span class="hljs-title">Myoc</span></span>
    
    +(<span class="hljs-keyword">void</span>) sayHello {
        <span class="hljs-built_in">NSLog</span>(<span class="hljs-string">@"Hello, OC"</span>);
    }
    <span class="hljs-keyword">@end</span></code></pre>
<p>同样的，我们创建了一个<code>sayHello</code>函数，当这个函数执行的时候会打印一段日志 <code>Hello, OC</code><br>然后我们在刚才的Swift文件中调用这个函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    func sayHello(){
        print(&quot;Hello, Swift&quot;)
        
        Myoc.sayHello()
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="Swift">    <span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">sayHello</span><span class="hljs-params">()</span></span>{
        <span class="hljs-built_in">print</span>(<span class="hljs-string">"Hello, Swift"</span>)
        
        <span class="hljs-type">Myoc</span>.sayHello()
    }</code></pre>
<p>如果一切正常的话控制台会先后打印 <code>Hello, Swift</code>和<code>Hello, OC</code>，我们编译一下，结果报错了，根本找不到<code>Myoc</code>这个类。 这个时候我们最开始创建的那个bridge文件就派上用场了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    #import &quot;Myoc.h&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code class="C" style="word-break: break-word; white-space: initial;">    #<span class="hljs-keyword">import</span> <span class="hljs-string">"Myoc.h"</span></code></pre>
<p>我们将头文件引入后再次编译发现没有报错，运行之后结果和预期相符。</p>
<p><span class="img-wrap"><img data-src="/img/bVOmaM?w=448&amp;h=149" src="https://static.alili.tech/img/bVOmaM?w=448&amp;h=149" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader23">结束语</h2>
<p>OC的一些语法确实很纠结，我后面后抽空把我理解到的，也是避不开的总结一下再编辑到这章里，希望对大家有用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Swift开发React Native组件（一）

## 原文链接
[https://segmentfault.com/a/1190000009579393](https://segmentfault.com/a/1190000009579393)

