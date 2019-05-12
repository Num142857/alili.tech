---
title: '在 React 项目中使用 React-intl 实现多语言支持' 
date: 2019-02-08 2:30:40
hidden: true
slug: whiqr0hm4bk
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVyv1N?w=900&amp;h=506" src="https://static.alili.tech/img/bVyv1N?w=900&amp;h=506" alt="封面图片来源：https://alpha.wallhaven.cc" title="封面图片来源：https://alpha.wallhaven.cc" style="cursor: pointer; display: inline;"></span></p>
<p>最近在项目中添加了语言国际化的功能。</p>
<p>语言国际化，也有人说成是语言本地化，其实就是为Web App添加多语言，我们的项目当前包含了中文版和英文版，按理来说『逐字替换』也不是多大事儿，但是，这么Low的做法，有钱途吗？</p>
<p>一开始的时候，我考虑的是传统的为整个项目添加config文件，根据不同的语言和地区，加载不同的config文件，就能够达到界面语言切换的目的。当然，也正是因为这个想法太过于幼稚，所以才被称为『一开始』的想法。语言的国际化不仅仅是将界面上的UI文字翻译成另一种语言，还包括了日期&amp;时间显示，数字显示（英文环境下每隔3位一个逗号：1,000），量词的显示（一个苹果是apple，两个苹果就应该是apples），甚至还有一个字符串中间插了一个变量的情况（"今天午饭吃了{count}个鸡腿"）...</p>
<p><span class="img-wrap"><img data-src="/img/bVyv2q?w=500&amp;h=390" src="https://static.alili.tech/img/bVyv2q?w=500&amp;h=390" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>所以这并不只是一个简单的字符替换问题，并且，我们要很方便的导出一个目录，放到word或者page当中，给到其他同事对照着进行翻译工作，这个非常重要！！难道你要让产品经理直接在代码里改么？或者你想一个一个搜索替换？不考虑清楚就干的话，相信我，You'll pay for this。</p>
<p>作为一个有追求的代码家，你肯定不希望在index.html当中增加一行&lt;Script&gt;引用吧？另外，UI中的文字全部都是使用图片的那个同学，请起立，滚。如果想要在一个React项目中，优雅的import something from somewhere，然后将界面中的文字用&lt;首字母大写 /&gt; 组件替代，最后通过简单的配置实现语言的国际化，那我们就用React-intl吧。</p>
<p><strong>注意：</strong>本文说的是用法，源码我也没有拜读过，太深的东西去github给作者留言吧。</p>
<p><span class="img-wrap"><img data-src="/img/bVyBsK?w=700&amp;h=446" src="https://static.alili.tech/img/bVyBsK?w=700&amp;h=446" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader0">React-intl</h2>
<blockquote><p>项目地址：<a href="https://github.com/yahoo/react-intl" rel="nofollow noreferrer" target="_blank">https://github.com/yahoo/reac...</a></p></blockquote>
<p>React-intl是雅虎的语言国际化开源项目FormatJS的一部分，通过其提供的组件和API可以与ReactJS绑定。上面这句话援引了官方文档的说辞，主要表达的是，这是一个很屌的开源项目，有大团队支持，使用量也很大，不会太坑爹，你们放心用。虽然雅虎都快被收购了。</p>
<p>React-intl提供了两种使用方法，一种是引用React组建，另一种是直接调取API，官方更加推荐在React项目中使用前者，只有在无法使用React组件的地方，才应该调用框架提供的API，事实上，我在项目的过程中真的遇到了无法使用组件的情况，这个我会另外写一篇文章来描述。</p>
<p>React-intl提供的React组件有如下几种：</p>
<p><code>&lt;IntlProvider /&gt;</code> 包裹在需要语言国际化的组建的最外层，为包含在其中的所有组建提供包含id和字符串的键值对。（如：<code>"homepage.title":"Hommily";</code>）</p>
<h3 id="articleHeader1">日期时间</h3>
<p><strong>a. <code>&lt;FormattedDate /&gt;</code></strong> 用于格式化日期，能够将一个时间戳格式化成不同语言中的日期格式。</p>
<p>传入时间戳作为参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedDate 
    value={new Date(1459832991883)}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedDate</span> 
    <span class="hljs-attr">value</span>=<span class="hljs-string">{new</span> <span class="hljs-attr">Date</span>(<span class="hljs-attr">1459832991883</span>)}
/&gt;</span></code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>4/5/2016</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">&lt;span&gt;<span class="hljs-number">4</span>/<span class="hljs-number">5</span>/<span class="hljs-number">2016</span>&lt;/span&gt;</code></pre>
<p><strong>b. <code>&lt;FormattedTime&gt;</code></strong> 用于格式化时间，效果与&lt;FormattedDate /&gt;相似。</p>
<p>传入时间戳作为参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedTime 
   value={new Date(1459832991883)}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedTime</span> 
   <span class="hljs-attr">value</span>=<span class="hljs-string">{new</span> <span class="hljs-attr">Date</span>(<span class="hljs-attr">1459832991883</span>)}
/&gt;</span></code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>1:09 AM</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>1:09 AM<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p><strong>c. <code>&lt;FormattedRelative /&gt;</code></strong> 通过这个组件可以显示传入组件的某个时间戳和当前时间的关系，比如 “ 10 minutes ago"。</p>
<p>传入时间戳作为参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedRelative 
    value={Date.now()}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedRelative</span> 
    <span class="hljs-attr">value</span>=<span class="hljs-string">{Date.now()}</span>
/&gt;</span></code></pre>
<p>输出结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>now</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>now<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>10秒之后的输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>10 seconds ago</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>10 seconds ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>1分钟之后的输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>1 minute ago</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>1 minute ago<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<h3 id="articleHeader2">数字量词</h3>
<p><strong>a. <code>&lt;FormattedNumber /&gt;</code></strong> 这个组件最主要的用途是用来给一串数字标逗号，比如10000这个数字，在中文的语言环境中应该是1,0000，是每隔4位加一个逗号，而在英语的环境中是10,000，每隔3位加一个逗号。</p>
<p>传入数字作为参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedNumber 
    value={1000}
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedNumber</span> 
    <span class="hljs-attr">value</span>=<span class="hljs-string">{1000}</span>
/&gt;</span></code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>1,000</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>1,000<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p><strong>b. <code>&lt;FormattedPlural /&gt;</code></strong> 这个组件可用于格式化量词，在中文的语境中，其实不太会用得到，比如我们说一个鸡腿，那么量词就是‘个’，我们说两个鸡腿，量词还是‘个’，不会发生变化。但是在英文的语言环境中，描述一个苹果的时候，量词是apple，当苹果数量为两个时，就会变成apples，这个组件的作用就在于此。</p>
<p>传入组件的参数中，value为数量，其他的为不同数量时对应的量词，在下面的例子中，一个的时候量词为message，两个的时候量词为messages。实际上可以传入组件的量词包括 zero, one, two, few, many, other 已经涵盖了所有的情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedPlural
    value={10}
    one='message'
    other='messages'/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedPlural</span>
    <span class="hljs-attr">value</span>=<span class="hljs-string">{10}</span>
    <span class="hljs-attr">one</span>=<span class="hljs-string">'message'</span>
    <span class="hljs-attr">other</span>=<span class="hljs-string">'messages'</span>/&gt;</span>
</code></pre>
<p>传入组件的量词参数可以是一个字符串，也可以是一个组件，我们可以选择传入<code>&lt;FormattedMessage /&gt;</code>组件，就可以实现量词的不同语言的切换。</p>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>messages</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>messages<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<h3 id="articleHeader3">字符串的格式化</h3>
<p><strong>a. <code>&lt;FormattedMessage /&gt;</code></strong> 这个组件用于格式化字符串，是所有的组件中使用频率最高的组件，因为基本上，UI上面的每一个字符串都应该用这个组件替代。这个组件的功能丰富，除了可以根据配置输出不同语言的简单字符串之外，还可以输出包含动态变化的参数的复杂字符串，具体的用法在后面的例子中会慢慢叙述。</p>
<p>比如我们在locale配置文件中写了如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = {
    greeting:'Hello Howard!&quot;,
}

export default app;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">const</span> app = <span class="hljs-comment">{
    greeting:'Hello Howard!",
}</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app;</code></pre>
<p>使用这个组件的时候，我们这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedMessage
    id='app.greeting'
    description='say hello to Howard'
    defaultMessage='Hello, Howard!'
    />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedMessage</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">'app.greeting'</span>
    <span class="hljs-attr">description</span>=<span class="hljs-string">'say hello to Howard'</span>
    <span class="hljs-attr">defaultMessage</span>=<span class="hljs-string">'Hello, Howard!'</span>
    /&gt;</span></code></pre>
<p>id指代的是这个字符串在locale配置文件中的属性名，description指的是对于这个位置替代的字符串的描述，便于维护代码，不写的话也不会影响输出的结果，当在locale配置文件中没有找到这个id的时候，输出的结果就是defaultMessage的值。</p>
<p>输出的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>Hello, Howard!</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hello, Howard!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p><strong>b. <code>&lt;FormattedHTMLMessage /&gt;</code></strong> 这个组件的用法和&lt;FormattedMessage /&gt;完全相同，唯一的不同就是输出的字符串可以包含HTML标签，但是官方不太推荐使用这个方法，如果可以想办法用&lt;FormattedMessage /&gt;的话，就不应该使用这个组件，我揣测应该是性能方面不如&lt;FormattedMessage /&gt;，这个组件的用法我就不举例了。</p>
<p>Well，到此为止，已经把React-intl提供的所有组件介绍完了，下面就给大家介绍一下具体如何去使用吧。</p>
<h2 id="articleHeader4">React-intl 使用步骤</h2>
<p>(本文例子运行在OSX环境，Window操作方法的终端在安装的时候要注意用管理员身份运行)</p>
<h3 id="articleHeader5">1. 安装React-intl</h3>
<p>假设你已经在你的系统中安装了node.js和npm，如果你还不知道这两个是什么东西，请自行百度，对，在百度都能找到答案。</p>
<p>打开终端，进入项目根目录，输入以下指令安装React-intl:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react-intl -save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> react-intl -<span class="hljs-keyword">save</span></code></pre>
<p><strong>注意：</strong>为了兼容Safari各个版本，需要同时安装 intl，intl在大部分的『现代』浏览器中是默认自带的，但是Safari和IE11以下的版本就没有了，这里需要留个心眼。</p>
<p>安装intl需要在终端中输入以下指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install intl --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> intl <span class="hljs-comment">--save</span></code></pre>
<p>这里还有一个注意：由于React-intl的每一个组件的使用方法大同小异，和ReactJS的语法完全一致，所以我就仅仅描述如何使用&lt;FormattedMessage /&gt;这个组件的用法，借此抛砖引玉，相信看完之后已经足够帮助你迅速的去使用这个开源框架了。</p>
<h3 id="articleHeader6">2. 引用React-intl</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { FormattedMessage } from 'react-intl'; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { FormattedMessage } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-intl'</span>; </code></pre>
<p>由于我使用的是ES6 的语法，所以是支持直接引用组件的。你当然可以使用ES5的方式引用，但是，这样有前途么？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require ReactIntl from 'react-intl';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span> ReactIntl <span class="hljs-keyword">from</span> <span class="hljs-string">'react-intl'</span>;</code></pre>
<h3 id="articleHeader7">3. 创建locale配置文件</h3>
<p>这里，我们将文件命名为zh_CN.js和en_US.js，代表中文和美式英语的配置包。</p>
<p>在zh_CN.js编写如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const zh_CN = {
            hello:&quot;你好，方浩！&quot;，
            superHello:&quot;你好，{ someone } !&quot;
        }
export default zh_CN;    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">const</span> zh_CN = {
            hello:<span class="hljs-string">"你好，方浩！"</span>，
            superHello:<span class="hljs-string">"你好，{ someone } !"</span>
        }
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> zh_CN;    </code></pre>
<p>在en_US.js编写如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const en_US = {
            hello:&quot;Hello, Howard!&quot;，
            superHello:&quot;Hello, { someone } !&quot;
        }    
export default en_US;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">const</span> en_US = {
            hello:<span class="hljs-string">"Hello, Howard!"</span>，
            superHello:<span class="hljs-string">"Hello, { someone } !"</span>
        }    
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> en_US;</code></pre>
<p>于是，我们就创建好了locale文件，但是，在实际的项目中配置文件不会这么简单，您可能需要根据业务需求按照不同的页面或者不同的功能块创建不同的文件树，然后用模块化的方法将不同的配置文件进行组织，已达成你的目标，这里我也就没能力逼逼太多了。</p>
<p>你可能想问，<code>{  someone }</code> 是什么鬼？其实悟性高一些的话就应该已经猜到，这个应该就是前面提到过的在字符串中插入动态参数的用法，事实上也是这样的。</p>
<h3 id="articleHeader8">4. 使用<code>&lt;IntlProvider /&gt;</code>
</h3>
<p>使用<code>&lt;IntlProvider /&gt;</code> 组件包裹住需要您需要进行语言国际化的组件，用法和React-redux的<code>&lt;Provider /&gt;</code>差不多，当<code>&lt;IntlProvider /&gt;</code> 包裹住某个组件的时候，这个组件本身和组件内部包含的子组件就可以获得所有React-intl提供的接口以及在<code>&lt;IntlProvider /&gt;</code> 中引入的locale配置文件的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { render } from 'react-dom';
//引入locale配置文件，具体路径根据实际情况填写
import zh_CN from './zh_CN';
import en-US from './en-US';
//如果浏览器没有自带intl，则需要在使用npm安装intl之后添加如下代码
import intl from 'intl';
addLocaleDate([...en,...zh]);

...
...

render(    
        <IntlProvider 
            locale={'en'} 
            messages={en_US}
        >
            <App />
        </IntlProvider>,    
        document.getElementById('container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-comment">//引入locale配置文件，具体路径根据实际情况填写</span>
<span class="hljs-keyword">import</span> zh_CN <span class="hljs-keyword">from</span> <span class="hljs-string">'./zh_CN'</span>;
<span class="hljs-keyword">import</span> en-US <span class="hljs-keyword">from</span> <span class="hljs-string">'./en-US'</span>;
<span class="hljs-comment">//如果浏览器没有自带intl，则需要在使用npm安装intl之后添加如下代码</span>
<span class="hljs-keyword">import</span> intl <span class="hljs-keyword">from</span> <span class="hljs-string">'intl'</span>;
addLocaleDate([...en,...zh]);

...
...

render(    
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">IntlProvider</span> 
            <span class="hljs-attr">locale</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">en</span>'} 
            <span class="hljs-attr">messages</span>=<span class="hljs-string">{en_US}</span>
        &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">IntlProvider</span>&gt;</span></span>,    
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>)
);</code></pre>
<p><code>&lt;IntlProvider /&gt;</code>需要传递两个参数：</p>
<p>locale是传递需要国际化的语言的缩写，通过这个参数可以确定格式化日期，数字，量词的时候按照哪一种语言的规则，这个是规则是intl提供的，一般浏览器会内置这个库，但是在Safari和IE11之前需要自己安装，安装的方法前面已经提及，请自己翻阅。</p>
<p>messages是用于传递刚刚我们在第3步中定义的配置文件的，从示例代码中我们可以看出，首先我们使用Import语句引入了配置文件，然后将配置文件的内容传递给了messages这个参数，此时&lt;App /&gt;组件中的所有组件都可以拿到配置文件中的内容了。</p>
<p>那个跳起来的同学，请先坐下，我猜你是想问，是不是每次都要手动修改这两个参数以适配不同语言呢？</p>
<p>其实不然，我们完全可以按照下面的做法自动识别当前浏览器的语言：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chooseLocale(){
    switch(navigator.language.split('_')[0]){
        case 'en':
            return 'en_US';
            break;
        case 'zh':
            return 'zh_CN';
            break;
        ...
        ...
        ...
        default:
            return 'en_US';
            break;
    }
}
render(    
        <IntlProvider 
            locale={navigator.language} 
            messages={chooseLocale()}
            >
            <App />
        </IntlProvider>,    
        document.getElementById('container')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>chooseLocale(){
    <span class="hljs-keyword">switch</span>(navigator.language.split(<span class="hljs-string">'_'</span>)[<span class="hljs-number">0</span>]){
        <span class="hljs-keyword">case</span> <span class="hljs-string">'en'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">'en_US'</span>;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">'zh'</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">'zh_CN'</span>;
            <span class="hljs-keyword">break</span>;
        ...
        ...
        ...
        default:
            <span class="hljs-keyword">return</span> <span class="hljs-string">'en_US'</span>;
            <span class="hljs-keyword">break</span>;
    }
}
render(    
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">IntlProvider</span> 
            <span class="hljs-attr">locale</span>=<span class="hljs-string">{navigator.language}</span> 
            <span class="hljs-attr">messages</span>=<span class="hljs-string">{chooseLocale()}</span>
            &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">IntlProvider</span>&gt;</span></span>,    
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>)
);</code></pre>
<p>您还需要知道的是，<code>&lt;IntlProvider /&gt;</code>是可以嵌套使用的，也就是说，在一个<code>&lt;IntlProvider /&gt;</code>内部还可以有N个<code>&lt;IntlProvider /&gt;</code>，这个功能的实际意义就是可以在英文网站中嵌套一个中文的或者德语的或者法语的板块，应用起来会更加灵活一些。</p>
<h3 id="articleHeader9">5. 使用<code>&lt;FormattedMessage /&gt;</code>
</h3>
<p>前面的几个步骤其实都是为了这个步骤做铺垫的，在添加了&lt;IntlProvoder /&gt;之后，我们就可以在其包裹的&lt;App /&gt;及&lt;App /&gt;包含的所有组件中获取到配置文件的信息，传入&lt;FormattedMessage /&gt;组件的id参数也能其在配置文件中对应的字符串了。</p>
<p>使用的方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedMessage
    id='hello'
    description='say hello to Howard.'
    defaultMessage='Hello, Howard'
    />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedMessage</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">'hello'</span>
    <span class="hljs-attr">description</span>=<span class="hljs-string">'say hello to Howard.'</span>
    <span class="hljs-attr">defaultMessage</span>=<span class="hljs-string">'Hello, Howard'</span>
    /&gt;</span></code></pre>
<p>在Js执行的时候，组件就会找到配置文件中，‘hello'键名对应的字符串'Hello, Howard!'.</p>
<p>输出的结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>Hello, Howard!</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hello, Howard!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>那么如何输出含有动态参数的字符串呢？比如Hello，Johnson!，如果我要问候的对象是一个变量呢？</p>
<p>那就这么写呗。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedMessage
    id='superHello'
    description='say hello to Howard.'
    defaultMessage='Hello, {someone}'
    values={
        someone:this.props.name,
    }
    />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FormattedMessage</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">'superHello'</span>
    <span class="hljs-attr">description</span>=<span class="hljs-string">'say hello to Howard.'</span>
    <span class="hljs-attr">defaultMessage</span>=<span class="hljs-string">'Hello, </span></span></span><span class="hljs-template-variable">{someone}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">'</span>
    <span class="hljs-attr">values</span>=</span></span><span class="hljs-template-variable">{
        someone:this.props.name,
    }</span><span class="xml"><span class="hljs-tag">
    /&gt;</span></span></code></pre>
<p>以上的例子中，赋给someone的就是一个变量（假设这个变量是通过参数传进这个组件的），注意，如果是这样的话，那么locale配置文件中就要这么写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" superHello:&quot;你好，{ someone } !&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol"> superHello:</span><span class="hljs-string">"你好，{ someone } !"</span></code></pre>
<p>前面其实提过了，怕你忘了...我已经悄无声息的把id换成了superHello。</p>
<p>更牛逼的是，这个someone还可以包含HTML标签！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedMessage
    id='superHello'
    description='say hello to Howard.'
    defaultMessage='Hello, {someone}'
    values={
        someone:<b>this.props.name</b>,
    }
    />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FormattedMessage</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">'superHello'</span>
    <span class="hljs-attr">description</span>=<span class="hljs-string">'say hello to Howard.'</span>
    <span class="hljs-attr">defaultMessage</span>=<span class="hljs-string">'Hello, {someone}'</span>
    <span class="hljs-attr">values</span>=<span class="hljs-string">{</span>
        <span class="hljs-attr">someone:</span>&lt;<span class="hljs-attr">b</span>&gt;</span>this.props.name<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>,
    }
    /&gt;</span></code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>Hello, <b>Howard</b>!</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hello, <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>Howard<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>!<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<p>于是，这个名字就被加粗了。</p>
<p>眼尖的同学又要跳起来了，“webFunc，为什么所有的输出都带一个&lt;span&gt;标签，我就不能换成别的么？”</p>
<p>不要着急，我正要说这个，对于这个问题，官方的文档是这么说的。</p>
<blockquote><p>By default <code>&lt;formattedMessage&gt;</code> will render the formatted string into<br>a <code>&lt;span&gt;</code>. If you need to customize rendering, you can either wrap it<br>with another React element (recommended), specify a different tagName<br>(e.g., 'div'), or pass a function as the child.</p></blockquote>
<p>翻译过来就是，默认的是会包裹在<code>&lt;span&gt;</code>标签中的，如果想要让输出的字符串包裹在其他标签中的话，比如你想包裹在<code>&lt;div&gt;</code>中，你就把<code>&lt;FormattedMessage /&gt;</code>组件包含在一对<code>&lt;div&gt;</code>中间，这是一种官方更加推荐的做法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
<FormattedMessage
    id='hello'
    description='say hello to Howard.'
    defaultMessage='Hello, Howard!&quot;
    />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;
&lt;FormattedMessage
    <span class="hljs-built_in">id</span>='hello'
    description='<span class="hljs-built_in">say</span> hello <span class="hljs-keyword">to</span> Howard.'
    defaultMessage='Hello, Howard!<span class="hljs-string">"
    /&gt;
&lt;/div&gt;</span></code></pre>
<p>Well, that's stupid...</p>
<p>或者你可以给&lt;FormattedMessage&gt;传入一个tagName的参数。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedMessage
    id='hello'
    tagName = 'div'
    description='say hello to Howard.'
    defaultMessage='Hello, Howard!'
    />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedMessage</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">'hello'</span>
    <span class="hljs-attr">tagName</span> = <span class="hljs-string">'div'</span>
    <span class="hljs-attr">description</span>=<span class="hljs-string">'say hello to Howard.'</span>
    <span class="hljs-attr">defaultMessage</span>=<span class="hljs-string">'Hello, Howard!'</span>
    /&gt;</span></code></pre>
<p>就会输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>Hello, Howard!</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span>&gt;Hello, Howard!&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>比较奇葩的是，也是我揣测作者不推荐使用这种方法的原因是...只要你高兴，tagName可以传入任意字符串，比如 shit:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<FormattedMessage
    id='hello'
    tagName = 'shit'
    description='say hello to Howard.'
    defaultMessage='Hello, Howard!'
    />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">FormattedMessage</span>
    <span class="hljs-attr">id</span>=<span class="hljs-string">'hello'</span>
    <span class="hljs-attr">tagName</span> = <span class="hljs-string">'shit'</span>
    <span class="hljs-attr">description</span>=<span class="hljs-string">'say hello to Howard.'</span>
    <span class="hljs-attr">defaultMessage</span>=<span class="hljs-string">'Hello, Howard!'</span>
    /&gt;</span></code></pre>
<p>就会输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<shit>Hello, Howard!</shit>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">shit</span>&gt;</span>Hello, Howard!<span class="hljs-tag">&lt;/<span class="hljs-name">shit</span>&gt;</span></code></pre>
<p><strong><em>Yes, shit happens.</em></strong></p>
<p>看到这里，你应该已经会使用React-intl对你的项目进行语言国际化了，没有进一步描述的地方，请自行查阅官方文档(项目地址：<a href="https://github.com/yahoo/react-intl)" rel="nofollow noreferrer" target="_blank">https://github.com/yahoo/reac...</a>，或者给我留言，虽然我不一定会及时回复。</p>
<p><strong>－－写在后面：</strong></p>
<p>语言国际化应该是一个比较经常遇到的需求，但是我在完成项目的过程中，看到的中文的资料却相当少，虽然这不是一篇非常牛叉的技术文章，但是可能会帮到很多人，如若如此，也便满足了。<br>——方浩（webFunc）</p>
<p>对了，你可以关注一下我的微信公众号：webcoding</p>
<p><span class="img-wrap"><img data-src="/img/bVyBup?w=258&amp;h=258" src="https://static.alili.tech/img/bVyBup?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 React 项目中使用 React-intl 实现多语言支持

## 原文链接
[https://segmentfault.com/a/1190000005824920](https://segmentfault.com/a/1190000005824920)

