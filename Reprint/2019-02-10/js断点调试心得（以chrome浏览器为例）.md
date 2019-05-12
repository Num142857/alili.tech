---
title: 'js断点调试心得（以chrome浏览器为例）' 
date: 2019-02-10 2:30:42
hidden: true
slug: tzpo03ilcqi
categories: [reprint]
---

{{< raw >}}

                    
<p>原文转载自这里<a href="http://www.cnblogs.com/mqfblog/p/5397282.html" rel="nofollow noreferrer" target="_blank">js断点调试心得</a>,我是勤劳的搬运工，嗯！<br>这里相对原文有删减，想看原文的请移步。</p>
<h2 id="articleHeader0">1、断点调试是啥？难不难？</h2>
<p>用chrome浏览器打开页面 → 按f12打开开发者工具 → 打开Sources → 打开你要调试的js代码文件 → 在行号上单击一下<br><span class="img-wrap"><img data-src="/img/bVvCko" src="https://static.alili.tech/img/bVvCko" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">2、断点怎么打才合适？</h2>
<p>打断点操作很简单，核心的问题在于，断点怎么打才能够排查出代码的问题所在呢？下面我继续举个例子方便大家理解，废话不多说，上图：<br><span class="img-wrap"><img data-src="/img/bVvCkT" src="https://static.alili.tech/img/bVvCkT" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>假设我们现在正在实现一个加载更多的功能，如上图，但是现在加载更多功能出现了问题，点击以后数据没有加载出来，这时候我们第一时间想到的应该是啥？（换一行写答案，大家可以看看自己的第一反应是啥）</p>
<p>我最先想到的是，我点击到底有没有成功？点击事件里的方法有没有运行？好，要想知道这个问题的答案，我们立马去打个断点试试看，断点打在哪？自己先琢磨一下。</p>
<p>继续上图：<br><span class="img-wrap"><img data-src="/img/bVvCrc" src="https://static.alili.tech/img/bVvCrc" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>各位想到没？没错，既然想知道点击是否成功，我们当然是在代码中的点击事件处添加一个断点，切记不要添加在226行，因为被执行的是click方法内的函数，而不是226行的选择器。断点现在已经打上了，然后回去点击<code>加载更多</code>按钮，结果如下图：<br><span class="img-wrap"><img data-src="/img/bVvCru" src="https://static.alili.tech/img/bVvCru" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>继续正题，上面的图就是点击加载更多按钮后的情况，我们可以看到左侧的页面被一个半透明的层给盖住了，页面上方还有一串英文和两个按钮，右侧代码227行被添加上了背景色，出现这个情况，先不管那些按钮英文是啥意思有啥作用，你从这个图得到了什么信息？继续琢磨琢磨~</p>
<p>如果出现了上图这个情况，说明一点，click事件中的函数被调用了，进一步说明了点击事件生效。那么我们对于这个问题产生的第一个“犯罪嫌疑人”就被排除了。</p>
<h3 id="articleHeader2"><em>补充一下</em></h3>
<blockquote><p>如果没有出现上面的情况咋办？那是不是说明点击事件没有生效呢？那是什么导致点击事件没有生效？大家自己思考思考~<br>可能导致点击事件没生效的原因很多，比多选择器错误，语法错误，被选择的元素是后生成的等。怎么解决呢？<br>选择器错误，大家可以继续往后看到console部分的内容，我想大家就知道怎么处理了<br>语法错误，细心排查一下，不熟悉的语法可以百度对比一下<br>被选择的元素是后生成的，最简单的处理就是使用.on()方法去处理，这个东东带有事件委托处理，详情可以自行百度。</p></blockquote>
<p><strong>那么接下来”犯罪嫌疑人“的身份锁定在哪里呢？</strong><br>click事件触发了，那么接下来的问题就是它内部的函数问题了。接着我们分析下点击事件里面的内容，里面包含三句话，第一句话是变量i自增长，第二句话是给按钮添加一个i标签，第三句话是调用请求数据的方法。</p>
<p>就通过这三句话的本身作用，我们可以将较大一部分嫌疑放在第三句话，一小部分放在第一句和第二句话上，有人可能会疑惑，第二句话怎么会有嫌疑呢？他的作用只不过是添加一个标签，对于数据完全没有影响啊，确实，这句话对于数据没有影响，但是出于严谨考虑，它仍然有可能出错，例如它要是少了一个分号呢？或者句子内部某个符号错误呢？往往就是这种小问题浪费我们很多时间。</p>
<p>好，为了进一步锁定”犯罪嫌疑人“，给大家介绍一个工具，也是上图出现两个图标之一，见下图：<br><span class="img-wrap"><img data-src="/img/bVvCrY" src="https://static.alili.tech/img/bVvCrY" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个小图标的功能叫“逐语句执行”或者叫“逐步执行”，每点击它一次，js语句就会往后执行一句，它还有一个快捷键，F10。下图示范一下它被点击以后的效果：<br><span class="img-wrap"><img data-src="/img/bVvCr0" src="https://static.alili.tech/img/bVvCr0" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我单击了两次这个按钮（或者使用F10快捷键），js代码从227行执行到了229行。这个功能非常的实用，大部分的调试都会使用到它。</p>
<p>单击了两次“逐语句执行”按钮，代码从227行运行到229行，大家觉得这意味着啥？是不是说明从语法上来说，前两句是没有问题的，那么是不是也同时意味着前两句就排除嫌疑了呢？我看不然。</p>
<p>大家都知道，加载更多就是一个下一页的功能，而其中最核心的一个就是传给后台的页码数值，每当我点击加载更多按钮一次，页码的数值就要加1，所以如果下一页的数据没出来，是不是有可能是因为页码数值也就是[i变量]（下面统一称呼i）有问题？那么如何排查页码是否存在问题呢？大家自己先思考思考。</p>
<p>下面教大家两种查看页码数值i]实际输出值的方法，上图：<br><em>方法一</em>：1.仍然是在227行打上断点 → 2. 点击加载更多按钮 → 3. 单击一次“逐语句执行“按钮，js代码执行到228行 → 4.用鼠标选中i++ → 5. 选中以后，鼠标悬浮在目标上方，你就看到上图的结果。<br><span class="img-wrap"><img data-src="/img/bVvCsb" src="https://static.alili.tech/img/bVvCsb" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><em>方法二</em>：这个方法其实和第一种差不多，只不过是在控制台输出i的值，大家只需要按照第一种方法执行到第三步 → 4. 打开和sources同一级栏目的console → 5. 在console下方的输入栏里输入i → 6. 按enter回车键即可。<br><span class="img-wrap"><img data-src="/img/bVvCse" src="https://static.alili.tech/img/bVvCse" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上面的第二种方法里，提到了console这个东西，我们可以称呼它为控制台或者其他什么都可以，这不重要~console的功能很强大，在调试的过程中，我们往往需要知道某些变量的值到底输出了什么，或者我们使用选择器[$”.div”)这种]是否选中了我们想要的元素等，都可以在控制台打印出来。当然直接用第一种方法也可以。</p>
<p>给大家示范一下在console里打印我们想要选中的元素。如下图：<br><span class="img-wrap"><img data-src="/img/bVvCsk" src="https://static.alili.tech/img/bVvCsk" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在控制台中输入$(this)，即可得到选择的元素，没错，正是我们所点击的对象——加载更多按钮元素。</p>
<p>在这里给大家说说我对console这个控制台的理解：这个东东就是一个js解析器，是浏览器本身用来解析运行js的家伙，只不过浏览器通过console让我们开发者在调试过程中，可以控制js的运行以及输出。通过上面的两种方法，大家可能觉得使用起来很简单，但是我要给大家提醒一下，或者说是一些新手比较容易遇到的困惑。</p>
<p><strong>困惑一：在没有打断点的情况下，在console输入i，结果console报错了。</strong><br>这应该是新手很常见的问题，为什么不打断点我就没有办法在控制台直接输出变量的值呢？个人理解这时候i只是一个局部变量，如果不打上断点，浏览器会把所有的js全部解析完成，console并不能访问到局部变量，只能访问到全局变量，所以这时候console会报错i未定义，但是当js打上断点时，console解析到了局部变量i所在的函数内，这时候i是能够被访问的。</p>
<p><strong>困惑二：为什么我直接在console里输入$(“.xxx”)能打印出东西来呢？</strong><br>很简单，console本身就是一个js解析器，$(“.xxx”)就是一个js语句，所以自然console能够解析这个语句然后输出结果。</p>
<p>介绍完“逐语句执行”按钮和console控制台的用法，最后再介绍一个按钮，上图：<br><span class="img-wrap"><img data-src="/img/bVvCsy" src="https://static.alili.tech/img/bVvCsy" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个按钮我称呼它为“逐过程执行”按钮，和“逐语句执行”按钮不同，“逐过程执行”按钮常用在一个方法调用多个js文件时，涉及到的js代码比较长，则会使用到这个按钮。</p>
<p>上图：<br><span class="img-wrap"><img data-src="/img/bVvCsB" src="https://static.alili.tech/img/bVvCsB" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>假设上图我只在227行打了个断点，然后一直点击逐语句执行”按钮到229行，这时候如果再点击一次“逐语句执行”按钮呢？则会进入下图的js里：<br><span class="img-wrap"><img data-src="/img/bVvCsF" src="https://static.alili.tech/img/bVvCsF" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这些都是zepto库文件的内容，没啥好看的，里面运行很复杂，我们不可能一直使用“逐语句执行”按钮，这样你会发现你按了大半天还在库文件里面绕。。。这时候咋办？那就该“逐过程执行”按钮上场了。<br><span class="img-wrap"><img data-src="/img/bVvCsG" src="https://static.alili.tech/img/bVvCsG" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我除了在227行打了一个断点，同时还在237行打了一个断点，当我们运行到229行时，直接单击“逐过程执行”按钮，你会发现，js直接跳过了库文件，运行到了237行，大家可以自己使用体验一下。</p>
<h2 id="articleHeader3">总结</h2>
<p>本文主要介绍了“逐语句执行”按钮、“逐过程执行”按钮、console控制台这三个工具，以及调试bug时的一些思路。工具的用法我就不再赘述了，大家知道用法就行，具体怎么去更合理的使用，还需要大家通过大量的实践去总结提升~</p>
<p>我其实在本文主要想讲的是调试bug的一个思路，但是由于选的例子涉及东西太多。。。怕全部写下来内容太长，大家也没兴趣看，所以我就简单的选了一部分给大家讲解，不知道大家有没有收获。别看我调试三句话写了一堆的东西，如果真的在实际项目中你也像我这样去做，估计你调试一个Bug的时间会比写一个脚本的时间还长很多。。。在实际情况下，我们应该养成拿到问题的第一时间，自行在脑海中排查问题，找到最有可能出现问题的点，如果没办法迅速的排查出最重要的点，那么你可以使用最麻烦但是很靠谱的方法，利用“逐语句执行”按钮将整个和问题相关的js依次去执行一遍，在执行的过程中，自己也跟着理清思路，同时注意下每个变量的值以及选择器选中的元素是否正确，一般来说，这样做一遍下来，bug都解决的差不多了。</p>
<p>所以个人认为，我们调试bug的思路应该是这样的：<em>首先，js是否成功的执行进来；其次，js是否存在逻辑问题，变量问题，参数问题等等；最后，如果上述都没有问题，请仔细查看各种符号。。。</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js断点调试心得（以chrome浏览器为例）

## 原文链接
[https://segmentfault.com/a/1190000005113673](https://segmentfault.com/a/1190000005113673)

