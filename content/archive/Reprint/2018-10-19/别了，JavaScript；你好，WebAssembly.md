---
title: 别了，JavaScript；你好，WebAssembly
reprint: true
categories: reprint
abbrlink: 10b84ef3
date: 2018-10-19 00:00:00
---

{{% raw %}}

            <p>作为JavaScript替代，一种Web开发的新形式已经浮出水面：WebAssembly.</p>
<p>Web开发与JavaScript开发向来是同义词。就是说，直到现在。但一种新的Web开发形式已然出现，声言会取代JavaScript。作为一个拥有15年Web开发经验的程序员，这个新方向瞬间吸引了我。</p>
<p><a href="https://webassembly.org/">WebAssembly</a> (Wasm)是一种在浏览器中可以执行的二进制指令，旨在为C#等高级语言提供一种编译目标。去年，微软开始尝试基于WebAssembly<a href="https://www.mono-project.com/news/2017/08/09/hello-webassembly/">使用Mono运行时让.NET进入浏览器</a>。Mono为.NET运行库(.dll)提供了基于WebAssembly运行的环境。运行在Mono之上的是<a href="https://blazor.net/">Blazor</a>，一个构建于.NET的单页Web应用开发框架，通过Mono的WebAssembly运行时在浏览器中运行。WebAssembly-Mono-Blazor这个全栈.NET应用平台能够催生不用JavaScript或浏览器插件的开发者。 <img src="https://p4.ssl.qhimg.com/t01ebb8d76ce7287323.jpg" alt="WA" title="WA"> </p>
<p>这个新东东的出现立即引发了问题，很正常。</p>
<h2>什么是WebAssembly能而JavaScript或TypeScript不能提供的？</h2>
<p>我的答案完全代表自己的想法，而且我觉得并非所有开发者、项目或工具都应该一样。对我而言，答案很清楚，简单说就是“选择”。不限于JavaScript的Web开发意味着选择，或者说可以选择不使用JavaScript或.NET而选择其他语言的自由。更准确也更个人地说，我有了可以使用自己早就在使用的工具和语言开发Web应用的选择。</p>
<h3>npm与WebPack</h3>
<p>.NET切入Web开发的一个特殊优势，就是有了可以替换npm和WebPack的工具。作为一个多年的.NET程序员，我可以向NuGet（包管理程序）和MSBuild招手了。对我而言，这些工具问题少，更熟悉，且效率也高得多。尽管没有完美的事物，但我使用NuGet和MSBuild的体验一直是很好的。<img src="https://p5.ssl.qhimg.com/t0152e4bdeb221094f6.png" alt="npm" title="npm"></p>
<p>乍一听好像我的意思是npm和Webpack不好，希望大家放弃它们，但反之也一样。npm和WebPack都是伟大的工具，还会存在相当长的时间。如果你的JavaScript工具用来创建Web应用很好使，那没问题。基于我对Web开发多年的认知，我明白为什么会出现npm和WebPack，也对它们取得的成熟和将要做出的贡献表示赞赏。</p>
<h3>降低学习难度</h3>
<p>Blazor让我非常震撼的是它使用起来非常简单。公正地说，我承认它的功能不完善，还没有大规模测试。Blazor把简单易用的Razor（UI）与其他.NET核心概念组合起来：依赖注入、配置、路由。而且从Angular及React等流行JavaScript框架借用了最佳模式，同时利用了Razor模板，并提供了与其他.NET惯例的一致性。这些功能的组合支持前所未有的技能重用。相信使用同一种语言并熟悉全栈JavaScript应用相关概念的Node程序员可以理解这一点。</p>
<p>还是需要JavaScript</p>
<p>使用WebAssembly并不意味着可以抛弃JavaScript。WebAssembly眼下还只能被JavaScript加载和编译。（没错，这有点乱。）虽然未来的计划让WebAssembly模块可以像ES6模块一样被浏览器加载，但JavaScript还是启动WebAssembly必需的。JavaScript的必要性还不止于此。WebAssembly自身无法访问任何平台API，而要访问这些API，JavaScript也是必要的。</p>
<h3>Blazor interop</h3>
<p>WebAssembly应用可以调用JavaScript，让WebAssembly能调用自己不能调用的API。这项功能Blazor框架也用到了。因为Blazor刚出来不久且还是实验性的，开发者可以通过<a href="https://blog.logrocket.com/working-with-the-blazor-javascript-interop-3c2a8d0eb56c">Blazor interop</a>在WebAssembly自身不足时把JavaScript作为后备，当然Blazor也不成熟。此外这个交互机制也是一个抽象层，很多使用C#的程序员都会用到，他们不必担心底层运行的还是JavaScript。随着WebAssembly的不断成熟，类似的抽象会不断减少。<img src="https://p2.ssl.qhimg.com/t01c3393c2fe4f4da78.jpg" alt="blazor-block-diagram" title="blazor-block-diagram"></p>
<h2>不是永远不见</h2>
<p>Progress在JavaScript及<a href="https://www.telerik.com/kendo-ui">Angular、React、Vue和jQuery</a>上投入巨大。Progress旗下最令人激动的一个开源框架是<a href="https://www.nativescript.org/">NativeScript</a>.。NativeScript是一个使用JavaScript创建iOS和Anroid原生应用的框架。NativeScript提醒我WebAssembly是在为程序员创建新选择。借助 NativeScript，JavaScript程序员可以重用自己已有的技能进入移动开发领域，这在工作上更有价值。NativeScript的目标是为程序员赋能，也不减损Swift、Objective-C或Java的价值。</p>
<p>我感觉WebAssembly也有一个相同的目标。事实上，这个目标官宣在 <a href="https://webassembly.org/docs/faq/">WebAssembly文档中</a>。</p>
<blockquote>
<p><strong>WebAssembly想取代JavaScript？</strong> 不！WebAssembly的设计目标是作为JavaScript的补充，而不是替代。虽然WebAssembly会随着时间推移允许很多语言在Web上编译执行，JavaScript依旧有着巨大的能量，还会继续保持其单一、 专有（如前所述）的动态Web语言地位。此外，未来的JavaScript和WebAssembly应该只需配置几下就可以协同工作……</p>
</blockquote>
<h2>前进</h2>
<p>是不是使用JavaScript的替代器开发让你激动，WebAssembly及ASP.NET Core的Blazor等框架就值得投入<a href="https://www.telerik.com/blogs/blazedown-experiment-with-markdown-and-blazor">一些</a> <a href="https://www.telerik.com/blogs/a-breakdown-of-blazor-project-types">时间</a>了呢？目前还是WebAssembly及其相关技术的早期阶段，但前承诺的广阔生态系统引起了我的注意。作为Web开发的拥趸，我希望它发展壮大，拓宽应用的写作思路。至少我学了那么多年.NET，现在终于可以用它来更快地做Web开发了，还是很值得炫耀的。不仅如此，我其实也很熟悉JavaScript，而且还在不断学习。作为一个工程师，拥有这些技能就有了解决问题的思路。</p>
<p>WebAssembly让你觉得震撼吗？想不想试试Blazor？还是说你有Ruby或 Python背景，希望在自己的能力范围内使用WebAssembly？请留言。</p>
<p>如果你有兴趣学习更多我们基于.NET和JavaScript的UI工具，一定要关注我们的在线发布会，这个在线活动会讨论<a href="https://www.telerik.com/webinars/devcraft/telerik-r3-release-webinar">Telerik</a> (on 10/2)和<a href="https://www.telerik.com/webinars/kendo-ui/kendo-ui-r3-release-webinar">Kendo UI</a>相关的所有新特性。 (明天，9/27。)</p>
<hr>
<p><a href="https://www.telerik.com/blogs/tag/web-development">web development</a>, <a href="https://www.telerik.com/blogs/tag/-net">.NET</a>, <a href="https://www.telerik.com/blogs/tag/webassembly">webassembly</a>, <a href="https://www.telerik.com/blogs/tag/blazor">blazor</a>, <a href="https://www.telerik.com/blogs/tag/javascript">JavaScript</a></p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/goodbye-javascript-hello-webassembly](https://www.zcfy.cc/article/goodbye-javascript-hello-webassembly)
原文标题: 别了，JavaScript；你好，WebAssembly
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
