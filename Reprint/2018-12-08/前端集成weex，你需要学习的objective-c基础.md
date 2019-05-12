---
title: '前端集成weex，你需要学习的objective-c基础' 
date: 2018-12-08 2:30:30
hidden: true
slug: 8m0is00lfww
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>最近要把<code>weex</code>集成到App中，需要给<code>iOS</code>和<code>安卓</code>提供库文件，这里的库文件并不是<code>WeexSDK</code>，而是连接<code>iOS</code>和<code>Weex</code>的中间件，所以就接触到<code>oc</code>，如果你也和我一样，需要集成<code>weex</code>，那恭喜你，<code>oc</code>你也需要学习。你可能会有个疑问，不是有专职的<code>iOS</code>工程师嘛，干嘛还需要前端来写，我是这么想的：</p>
<ul>
<li>首先你是<code>weex</code>的发起者，同时你也是推动者，App要集成这项目技术，iOS工程师当然希望集成越简单，对现有功能影响越小越好，那自然不能把<code>weex</code>和他们的代码混到一起，那这块相对独立的功能自然是前端来做最合适</li>
<li>其次这是了解全面了解<code>iOS</code>的一次绝佳的机会，爱学习的你，真的愿意拱手相让么？</li>
<li>以后三端的界限会变的不那么清晰了，现在都在提大前端，多接触其他领域也是件好事</li>
</ul>
<h2 id="articleHeader1">前面的话</h2>
<p>既然我们是做前端的，对一门新语言只要大致知道语法还有这门语言的特点（这块会着重介绍），不过三天，你会写的js一样熟练，好，我们开始我们的第一个<code>Hello World！</code></p>
<h2 id="articleHeader2">开始第一个程序</h2>
<p>我们先使用<code>xcode</code>来开发入门的<code>IDE</code>。新建项目的时候，我们需要注意一下，既然是入门语法（不涉及画UI），我们没有必要搞那么复杂，就选择最简单的类型：命令行。</p>
<p><span class="img-wrap"><img data-src="/img/bV658x?w=726&amp;h=233" src="https://static.alili.tech/img/bV658x?w=726&amp;h=233" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>运行结果：</p>
<p><span class="img-wrap"><img data-src="/img/bV66nw?w=596&amp;h=50" src="https://static.alili.tech/img/bV66nw?w=596&amp;h=50" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>新建完成之后，我们就能看到<code>main.m</code>文件，使用<code>cmd+R</code>来运行，就可以在命令行看到效果，下面我们来依次介绍语法，保证简洁！</p>
<h2 id="articleHeader3">基本类型</h2>
<ul>
<li>
<code>int</code>类型没啥好说的，就这样定义就行：<code>int a = 10;</code>
</li>
<li>
<code>string</code>类型比较特殊，字符串属性<strong>对象类型</strong>，所以我们定义时，在字符串前面需要加一个<code>@</code>，变量名称前加<code>*</code>，这样定义：<code>NSString *name = @"james";</code>其中<code>NSString</code>就代表字符串类型。</li>
</ul>
<h2 id="articleHeader4">占位符</h2>
<p>占位符应用比较多的场景是<code>NSLog</code>，也就是我们js的<code>console.log</code>，打印变量是我们开发中常用到的功能，<code>oc</code>中我们使用占位符来代表变量，比如我们要打印<code>int age = 10; NSString *name = @"james";</code>，我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NSLog(@&quot;姓名：%@，年龄：%d&quot;, name, age);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;">NSLog(@"姓名：%@，年龄：%d<span class="hljs-string">", name, age);</span></code></pre>
<p>其中：<code>%@</code>代表对象类型的占位符；<code>%d</code>代表整型的占位符。</p>
<h2 id="articleHeader5">方法</h2>
<h3 id="articleHeader6">单参数/无参数方法</h3>
<p>在<code>oc</code>中，方法的定义比较特殊，差不多长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ (void) test {
    NSLog(@&quot;Hello World!&quot;);
}

- (NSString *) test1:(NSString *)key {
    return key;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code>+ (<span class="hljs-keyword">void</span>) test {
    <span class="hljs-built_in">NSLog</span>(<span class="hljs-string">@"Hello World!"</span>);
}

- (<span class="hljs-built_in">NSString</span> *) test1:(<span class="hljs-built_in">NSString</span> *)key {
    <span class="hljs-keyword">return</span> key;
}</code></pre>
<p>这里面你发现没有<code>function</code>这样的关健字，</p>
<ul>
<li>
<code>+</code>号代表<strong>静态方法</strong>，<code>-</code>号代表<strong>实例方法</strong>（需要实例化后才能使用）</li>
<li>括号里面代表返回值，<code>void</code>代表无返回</li>
<li>
<code>test</code>和<code>test1</code>代表方法名称</li>
<li>
<code>(NSString *) key</code>代表参数类型和参数变量名</li>
</ul>
<h3 id="articleHeader7">多参数方法</h3>
<p>多参数的方法，在这里要好好的说一下，初始接触oc，你肯定会觉得莫名其妙，我们先来看下多参数方法的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-(void)login:(NSString *)userName password:(NSString *)pwd {
    NSLog(@&quot;userName=%@, password=%@&quot;, userName, pwd);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>-<span class="hljs-params">(void)</span>login:<span class="hljs-params">(NSString *)</span>userName password:<span class="hljs-params">(NSString *)</span>pwd {
    NSLog<span class="hljs-params">(@<span class="hljs-string">"userName=%@, password=%@"</span>, userName, pwd)</span>;
}</code></pre>
<p>看起来是不是有点蒙，这和我们之前任何一种语言方法的定义都不一样，现在我们一张图就能说明白，看懂了之后，习惯就好了</p>
<p><span class="img-wrap"><img data-src="/img/bV65eK?w=610&amp;h=192" src="https://static.alili.tech/img/bV65eK?w=610&amp;h=192" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">类的介绍</h2>
<p>任何面对对象的语言都有类，oc也不例外，新建类的时候，我们选择：<code>macOS</code>--&gt;<code>Cocoa Class</code>，这样在项目中，你会发现两个文件，一个<code>*.h</code>文件和<code>*.m</code>文件，下面我们分别介绍</p>
<h3 id="articleHeader9">
<code>*.h</code>文件的作用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#import <Foundation/Foundation.h>
@interface Test : NSObject
-(void) test;
@end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code><span class="hljs-meta">#import <span class="hljs-meta-string">&lt;Foundation/Foundation.h&gt;</span></span>
<span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">Test</span> : <span class="hljs-title">NSObject</span></span>
-(<span class="hljs-keyword">void</span>) test;
<span class="hljs-keyword">@end</span></code></pre>
<p>这里面只定义<strong>需要外部访问的方法结构</strong>，也就是对外的方法，具体实现是在<code>.m</code>文件中</p>
<h3 id="articleHeader10">类的使用</h3>
<p>类的使用，也和其他语言不太一样，我们先来看一张图</p>
<p><span class="img-wrap"><img data-src="/img/bV65kI?w=528&amp;h=240" src="https://static.alili.tech/img/bV65kI?w=528&amp;h=240" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul>
<li>类的实例化需要两步：<code>alloc</code>分配内存，<code>init</code>才是实例化，在其他语言中<code>new</code>其实执行的也是这两步</li>
<li>类对方法的调用使用的是<code>[对象 方法]</code>这种形式，而不是以<code>对象.方法</code>的形式，这和其他语言区别比较大</li>
<li>点的方式也用的到，就是<strong>获取对象属性</strong>的时候，就是使用这种形式<code>对象.属性</code>
</li>
</ul>
<h2 id="articleHeader11">代码块（block）</h2>
<p>代码块这个词你乍一听挺陌生，我举一个我们js里面经常用的例子，你就明白了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(age, cb) {
    age += 1
    cb(age)
}

add(20, function(newAge){
    console.log(newAge)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span></span>(age, cb) {
    age += <span class="hljs-number">1</span>
    cb(age)
}

add(<span class="hljs-number">20</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span>(<span class="hljs-keyword">new</span><span class="hljs-type">Age</span>){
    console.log(<span class="hljs-keyword">new</span><span class="hljs-type">Age</span>)
})</code></pre>
<p>oc里面的代码码对应的就是<code>add</code>方法中的cb，js是因为是弱类型语言，所以不需要定义类型，但是oc是强类型的，要用就必须定义，那cb是啥类型呢，就是代码块类型！其实这种类型<strong>解决的一个主要问题就是异步回调</strong>，和我们js里面的用法差不多，我们看下oc里面怎么使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个block
typedef void(^callbackBlock)(NSString *data);
// 定义方法
+ (void)ajax:(NSString *)url cb:(callbackBlock)aCallback {
    ......
    aCallback(@&quot;Hello&quot;)
    ......
}
// 使用方法
[YourClass ajax:@&quot;xxxx&quot;, cb:^(NSString *data){
    NSLog(data);
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// 定义一个block</span>
typedef <span class="hljs-literal">void</span>(^callbackBlock)(NSString *<span class="hljs-built_in">data</span>);
<span class="hljs-comment">// 定义方法</span>
+ (<span class="hljs-literal">void</span>)ajax:(NSString *)url cb:(callbackBlock)aCallback {
    <span class="hljs-params">...</span><span class="hljs-params">...</span>
    aCallback(@<span class="hljs-string">"Hello"</span>)
    <span class="hljs-params">...</span><span class="hljs-params">...</span>
}
<span class="hljs-comment">// 使用方法</span>
<span class="hljs-meta">[</span>YourClass ajax:@<span class="hljs-string">"xxxx"</span>, cb:^(NSString *<span class="hljs-built_in">data</span>){
    NSLog(<span class="hljs-built_in">data</span>);
}<span class="hljs-meta">]</span></code></pre>
<h2 id="articleHeader12">协议（Protocol）</h2>
<p>oc里面的协议（Protocol）和java里面的接口（interface）比较类似，都是只定义，不实现；都需要一个类来实现这个协议和协议里面的方法。我们来看下语法：</p>
<ul><li>定义协议</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#import <Foundation/Foundation.h>
// @protocol为关健字，定义这个类是一个协议类
@protocol TestProtocol <NSObject>

// @required为关健字，代表必须要实现的方法
@required
- (void)req;

// @required为关健字，代表未必要实现的方法
@optional
- (void)opt;
@end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code><span class="hljs-meta">#import <span class="hljs-meta-string">&lt;Foundation/Foundation.h&gt;</span></span>
<span class="hljs-comment">// @protocol为关健字，定义这个类是一个协议类</span>
<span class="hljs-class"><span class="hljs-keyword">@protocol</span> <span class="hljs-title">TestProtocol</span> &lt;<span class="hljs-title">NSObject</span>&gt;</span>

<span class="hljs-comment">// @required为关健字，代表必须要实现的方法</span>
<span class="hljs-keyword">@required</span>
- (<span class="hljs-keyword">void</span>)req;

<span class="hljs-comment">// @required为关健字，代表未必要实现的方法</span>
<span class="hljs-keyword">@optional</span>
- (<span class="hljs-keyword">void</span>)opt;
<span class="hljs-keyword">@end</span></code></pre>
<ul><li>引入协议：<code>Test.h</code>文件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#import <Foundation/Foundation.h>
// 引入协议类
#import &quot;TestProtocol.m&quot;
// NSObject<TestProtocol>让Test类知道必须实现协议的方法
@interface Test : NSObject<TestProtocol>
// 注：这里面不用定义协议类的方法，需要在.m文件中定义和实现
@end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code><span class="hljs-meta">#import <span class="hljs-meta-string">&lt;Foundation/Foundation.h&gt;</span></span>
<span class="hljs-comment">// 引入协议类</span>
<span class="hljs-meta">#import <span class="hljs-meta-string">"TestProtocol.m"</span></span>
<span class="hljs-comment">// NSObject&lt;TestProtocol&gt;让Test类知道必须实现协议的方法</span>
<span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">Test</span> : <span class="hljs-title">NSObject</span>&lt;<span class="hljs-title">TestProtocol</span>&gt;</span>
<span class="hljs-comment">// 注：这里面不用定义协议类的方法，需要在.m文件中定义和实现</span>
<span class="hljs-keyword">@end</span></code></pre>
<ul><li>实现协议：<code>Test.m</code>文件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#import &quot;Test.h&quot;
@implementation Test
-(void)req {
    NSLog(@&quot;实现协议方法&quot;);
}
// 注：就算是@required方法，类中不实现依然不会报错，编译也能通过，只是给个警告
@end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code><span class="hljs-comment">#import "Test.h"</span>
@implementation Test
-(void)re<span class="hljs-string">q {
    NSLog(@"实现协议方法");
}</span>
// 注：就算是@required方法，类中不实现依然不会报错，编译也能通过，只是给个警告
@end</code></pre>
<p>看完了你可能会觉得这玩意有啥用啊，其实协议的用途<strong>主要是在运行时（runtime）</strong>，尤其是<code>weex</code>和已有项目集成时，如果没有这个东西，根本就集成不起来，这块内容我们后面会说。</p>
<h2 id="articleHeader13">
<code>json</code>对象与<code>oc</code>
</h2>
<p><code>oc</code>中存储<code>json</code>对象的类型是：<code>NSDictionary</code>，我们来看下我们前端经常使用的一些<code>json</code>方法</p>
<ul><li>字符串转<code>json</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NSString *jsonString = @&quot;{\&quot;id\&quot;:1}&quot;;
// 先转成NSData类型
NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
// 再转成NSDictionary
NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:nil];
// 根据key获取value
NSLog(@&quot;%@&quot;,dic[@&quot;id&quot;]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code><span class="hljs-built_in">NSString</span> *jsonString = <span class="hljs-string">@"{\"id\":1}"</span>;
<span class="hljs-comment">// 先转成NSData类型</span>
<span class="hljs-built_in">NSData</span> *jsonData = [jsonString dataUsingEncoding:<span class="hljs-built_in">NSUTF8StringEncoding</span>];
<span class="hljs-comment">// 再转成NSDictionary</span>
<span class="hljs-built_in">NSDictionary</span> *dic = [<span class="hljs-built_in">NSJSONSerialization</span> JSONObjectWithData:jsonData options:<span class="hljs-built_in">NSJSONReadingMutableContainers</span> error:<span class="hljs-literal">nil</span>];
<span class="hljs-comment">// 根据key获取value</span>
<span class="hljs-built_in">NSLog</span>(<span class="hljs-string">@"%@"</span>,dic[<span class="hljs-string">@"id"</span>]);</code></pre>
<ul><li>
<code>json</code>对象循环</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (NSString *key in dic) {
    NSLog(@&quot;key=%@, value=%@&quot;, key, dic[key]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs objectivec"><code><span class="hljs-keyword">for</span> (<span class="hljs-built_in">NSString</span> *key <span class="hljs-keyword">in</span> dic) {
    <span class="hljs-built_in">NSLog</span>(<span class="hljs-string">@"key=%@, value=%@"</span>, key, dic[key]);
}</code></pre>
<h2 id="articleHeader14">结语</h2>
<p>其实这篇文章并不没有教你在oc中for循环怎么写，if/else怎么写，因为你写过js，这些根本就不用教，自然就会，我写的都是<code>oc</code>这门语言，我在使用过程中，和<code>javascript</code>以及<code>java</code>中，需要注意的地方，同时我也没有说UI方面的东西，比如按钮怎么写、怎么设置背景颜色...原因有两个：</p>
<ul>
<li>这里面主要针对<code>weex</code>集成到App中提供的公共服务，根本就涉及不到UI</li>
<li>如果上面的东西熟练了，UI其实就是类调用方法，没啥特殊的地方，哪里不会Google哪里就好</li>
</ul>
<p>在集成<code>weex</code>的时候，需要写大量的<code>oc</code>逻辑代码，这部分功能就是我们提供给现有的App的一个<code>pod</code>（类似npm包），里面包括：缓存js文件、读取js文件、写<code>weex</code>的扩展module、把业务类注入到<code>pod</code>中使用、调试中使用到的<code>websocket</code>...所以当你在实现的过程中，你自然就熟悉了这门语言。<strong>多写才是掌握OC的唯五捷径！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端集成weex，你需要学习的objective-c基础

## 原文链接
[https://segmentfault.com/a/1190000014046951](https://segmentfault.com/a/1190000014046951)

