---
title: '【译】相对完整的Gulp4升级指南' 
date: 2019-02-09 2:30:59
hidden: true
slug: l5i4i60ylo9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：<a href="https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/" rel="nofollow noreferrer" target="_blank">The Complete-Ish Guide to Upgrading to Gulp 4</a></p></blockquote>
<p>虽然Gulp4始终在开发中，但是你要坚信在将来的某一天你一定可以等到它的正式版。嗯，某一天。所以现在我想先向你们介绍Gulp3.x和Gulp4之间的不同，同时希望能够帮助你将来能相对无痛的迁移到新的版本。</p>
<h3 id="articleHeader0">安装</h3>
<p>在你开始使用最新版的Gulp之前，你必须要先检查一下你Gulp的版本。通常，你只需要更新你的<code>package.json</code>中的版本号就行了，不过有时候你也有可能碰到一些额外的麻烦。最可能的原因是你分别在项目文件夹下和全局环境中都安装了Gulp（如果你读过了这篇文章<a href="https://www.joezimjs.com/javascript/no-more-global-npm-packages/" rel="nofollow noreferrer" target="_blank">the practice of using npm scripts to access the locally installed version of CLI’s</a>，那就好办多了。虽然在这里它可能还是帮不了你太多）。因此，首先你要把你项目文件夹下的Gulp删除，如果你在全局环境中也安装了Gulp，最好也把它删了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
npm uninstall gulp --save-dev
npm uninstall gulp -g
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>
npm <span class="hljs-keyword">uninstall</span> gulp <span class="hljs-comment">--save-dev</span>
npm <span class="hljs-keyword">uninstall</span> gulp -g
</code></pre>
<p>现在你就可以在你的项目中安装Gulp4。由于它还没有正式发布，我们只能直接通过Github来安装它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install gulpjs/gulp.git#4.0  --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> gulpjs/gulp.git<span class="hljs-comment">#4.0  --save-dev</span>
</code></pre>
<p>当它提交到npm库之后，你就可以像平常一样使用<code>npm install gulp --save-dev</code>了。并且当它发布正式版本后，我们也最好不要从Github上安装，改为直接从npm上进行安装。好了，现在我们还有另一个东西需要安装：命令行工具。跟现在的Grunt类似的，Gulp4把命令行工具从Gulp的核心代码中剥离了。Gulp3和Gulp4都能使用独立出来的命令行工具。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install gulp-cli --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm install gulp-cli --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
</code></pre>
<p>如果你不想在你的项目中使用npm scripts，你需要使用<code>-g</code>替换<code>-save-dev</code>来进行全局安装。现在你就可以像以前一样使用<code>gulp</code>命令了，但是你应该会得到一个错误信息，因为你需要更新你的<code>gulpfile.js</code>来兼容最新版的Gulp。</p>
<h3 id="articleHeader1">任务重构</h3>
<p>如果你原来的任务代码结构十分简单，任务之前没有相互的依赖。那很走运，你将不需要做任何修改！不过令人哀伤的是，大部分人都不得不做一些调整。Gulp4最大的一个改变就是<code>gulp.task</code>函数现在只支持两个参数，分别是任务名和运行任务的函数。举个例子，下面的任务代码可以很好的运行在Gulp3和Gulp4上面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
gulp.task('clean', function() {...})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>
gulp.task('clean', function() <span class="hljs-meta">{...}</span>)
</code></pre>
<p>但是当你使用三个参数时该怎么办？我们要如何指定任务之间的依赖关系？这时新的<code>gulp.series</code>和<code>gulp.parallel</code>函数应该能帮助你解决难题。这两个函数都可以接受数个函数或任务名作为参数，经过组合后，返回一个新的函数。<code>gulp.series</code>会返回一个函数用来顺序执行它所接受的任务/函数，而<code>gulp.parallel</code>返回的函数则会并行的运行它们。Gulp总算能够让我们自由的选择以串行或并行的方式来执行任务而不再需要其他的第三方依赖（比如常用的<a href="https://www.npmjs.com/package/run-sequence" rel="nofollow noreferrer" target="_blank">run-sequence</a>），也不用再定义一堆让人看不懂的任务依赖。</p>
<p>如果你以前是这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('styles', ['clean'], function() {
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gulp.task(<span class="hljs-string">'styles'</span>, [<span class="hljs-string">'clean'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    ...
});</code></pre>
<p>那你现在可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('styles', gulp.series('clean', function() {
    ...
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gulp.task(<span class="hljs-string">'styles'</span>, gulp.series(<span class="hljs-string">'clean'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    ...
}));</code></pre>
<p>在改写的时候，不要忘了其实现在你处理主要任务的函数也是放在gulp.series里面调用，所以不要忘了在结尾加上括号。很多人经常犯这个错误。</p>
<p>注意，由于<code>gulp.series</code>和<code>gulp.parallel</code>返回的是一个函数，所以他们是可以被嵌套调用的。如果您的任务往往有多个依赖任务，你会经常嵌套调用它们。比如这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('default', ['scripts', 'styles'], function() {
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gulp.task(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'scripts'</span>, <span class="hljs-string">'styles'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    ...
});</code></pre>
<p>你可以改写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('default', gulp.series(gulp.parallel('scripts', 'styles'), function() {
    ...
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gulp.task(<span class="hljs-string">'default'</span>, gulp.series(gulp.parallel(<span class="hljs-string">'scripts'</span>, <span class="hljs-string">'styles'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    ...
}));</code></pre>
<p>看过去，这样代码读起来非常吃力。不过考虑到这样会使你任务流程控制更加的灵活，这点牺牲也就无所谓了。当然我觉得你也可以自己封装一些helper/alias函数来优化的你的代码，提高可读性，但我应该不会这么去做。</p>
<h3 id="articleHeader2">依赖陷阱</h3>
<p>在Gulp3中，假设你设定几个有相同依赖的任务，然后运行它们，Gulp会检测出这些将要运行的任务的依赖是一样的，然后只会运行一次依赖任务。然而现在我们不再显式的指定任务之间的依赖，而是通过series和parallel函数来组合任务，这样会导致那些本应该只运行一次的任务，变成多次运行。Gulp4是无法做出相应的区分的。所以我们要改变我们指定任务依赖的思路。</p>
<p>让我们看一下这个Gulp3的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// default任务，需要依赖scripts和styles
gulp.task('default', ['scripts', 'styles'], function() {...});

// script折styles任务都依赖clean
gulp.task('styles', ['clean'], function() {...});
gulp.task('scripts', ['clean'], function() {...});

// clean任务用来清空目录
gulp.task('clean', function() {...});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>// default任务，需要依赖scripts和styles
gulp.task('default', ['scripts', 'styles'], function() <span class="hljs-meta">{...}</span>);

// script折styles任务都依赖clean
gulp.task('styles', ['clean'], function() <span class="hljs-meta">{...}</span>);
gulp.task('scripts', ['clean'], function() <span class="hljs-meta">{...}</span>);

// clean任务用来清空目录
gulp.task('clean', function() <span class="hljs-meta">{...}</span>);</code></pre>
<p>我们注意到<code>styles</code>和<code>scripts</code>任务都依赖<code>clean</code>任务。当你运行<code>default</code>任务时，Gulp3会率先运行<code>styles</code>和<code>scripts</code>任务，又因为检测到这两个任务都有各自的依赖，所以需要优先运行它们的依赖任务，这时Gulp注意到这两个任务都依赖于<code>clean</code>，于是Gulp3将确保在回到<code>styles</code>和<code>scripts</code>任务之前，<code>clean</code>任务会被执行且执行一次。这很有用！但遗憾的是，我们在新版本中将没办法运用这个特性。如果你在迁移到Gulp4的过程中只像下面的例子一样做了简单的改变，<code>clean</code>任务将会被执行两次：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('clean', function() {...});
gulp.task('styles', gulp.series('clean', function() {...}));
gulp.task('scripts', gulp.series('clean', function() {...}));

gulp.task('default', gulp.parallel('scripts', 'styles'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>gulp.task('clean', function() <span class="hljs-meta">{...}</span>);
gulp.task('styles', gulp.series('clean', function() <span class="hljs-meta">{...}</span>));
gulp.task('scripts', gulp.series('clean', function() <span class="hljs-meta">{...}</span>));

gulp.task('default', gulp.parallel('scripts', 'styles'));</code></pre>
<p>这是因为<code>parallel</code>和<code>series</code>不是用来解决依赖的；他们只是用来把多个任务合并成一个。所以我们需要把共同依赖的任务抽离出来，然后用一个更大的串行任务来包裹它们，以此来模拟任务依赖关系：</p>
<p><strong><em>友情提示：</em></strong>你最好不要在定义那些小任务之前就用它们来组合你的<code>default</code>任务。因为在你调用<code>gulp.series("taskName")</code>之前，你<strong><em>必须</em></strong>已经定义好了一个名为<code>"taskName"</code>的任务。所以一般在Gulp4中，我们会在代码的最后才定义<code>default</code>，而在Gulp3中你可以把它放在任何地方。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 任务直接不再有依赖
gulp.task('styles', function() {...});
gulp.task('scripts', function() {...});
gulp.task('clean', function() {...});

// default任务，需要依赖scripts和styles
gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'styles')));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>// 任务直接不再有依赖
gulp.task('styles', function() <span class="hljs-meta">{...}</span>);
gulp.task('scripts', function() <span class="hljs-meta">{...}</span>);
gulp.task('clean', function() <span class="hljs-meta">{...}</span>);

// default任务，需要依赖scripts和styles
gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'styles')));
</code></pre>
<p>如果照这么写，当你单独运行<code>styles</code>和<code>scripts</code>任务时，<code>clean</code>任务就不会优先自动执行。不过这问题也不大，在之前单独运行<code>clean</code>任务就可以了，一样能把scripts和styles的文件夹清空。又或者你可以重新定义一下你的任务，随你，我也不确定怎样会更好。</p>
<h3 id="articleHeader3">异步任务支持</h3>
<p>如果你执行的是同步任务，在Gulp3中不需要写任何其他代码，但是在Gulp4中就不能如此轻松了：现在也你必须运行done回调（这可能是我最早发现的一个变化）。然后如果你执行的是异步任务，你则有三个选择来确保Gulp能够检测到你的任务真的完成了，方法如下：</p>
<h4>1) 回调</h4>
<p>你可以在你的任务函数的参数中提供一个回调函数并且在你的任务完成后调用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var del = require('del');

gulp.task('clean', function(done) {
    del(['.build/'], done);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> del = <span class="hljs-built_in">require</span>(<span class="hljs-string">'del'</span>);

gulp.task(<span class="hljs-string">'clean'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">done</span>) </span>{
    del([<span class="hljs-string">'.build/'</span>], done);
});</code></pre>
<h4>2) 流</h4>
<p>你也可以返回一个流，通常通过<code>gulp.src</code>或<a href="https://www.npmjs.com/package/vinyl-source-stream" rel="nofollow noreferrer" target="_blank">vinyl-source-stream</a>这个库来创建。这一般也是最常用的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('somename', function() {
    return gulp.src('client/**/*.js')
        .pipe(minify())
        .pipe(gulp.dest('build'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>gulp.task(<span class="hljs-string">'somename'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'client/**/*.js'</span>)
        .pipe(minify())
        .pipe(gulp.dest(<span class="hljs-string">'build'</span>));
});</code></pre>
<h4>3) Promise</h4>
<p>Promise这个技术早已声名鹊起而且在Node中已经有了完整的实现，所以这也会是一个很有用的方式。你只需要返回一个promise对象，Gulp就能知道任务在什么时候完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var promisedDel = require('promised-del');

gulp.task('clean', function() {
    return promisedDel(['.build/']);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> promisedDel = <span class="hljs-built_in">require</span>(<span class="hljs-string">'promised-del'</span>);

gulp.task(<span class="hljs-string">'clean'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> promisedDel([<span class="hljs-string">'.build/'</span>]);
});</code></pre>
<h3 id="articleHeader4">其他的异步任务支持</h3>
<p>感谢Gulp现在引入了<a href="https://www.npmjs.com/package/async-done" rel="nofollow noreferrer" target="_blank">async-done</a>库，在最新的版本中我们有更多的方式来确认异步任务的完成。</p>
<h4>4)子进程</h4>
<p>你可以在你的任务中创建一些子进程并返回！比如，你可以把你的npm scripts放到Gulp中执行，这样你就不需要为你的package.json中加载了百万条命令而烦恼。你也可以通过这样的封装摆脱那些随时可能过时的gulp插件。尽管这看上去像一个反模式，不过你还是有很多可以优化它们的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spawn = require('child_process').spawn;

gulp.task('clean', function() {
  return spawn('rm', ['-rf', path.join(__dirname, 'build')]);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;

gulp.task(<span class="hljs-string">'clean'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> spawn(<span class="hljs-string">'rm'</span>, [<span class="hljs-string">'-rf'</span>, path.join(__dirname, <span class="hljs-string">'build'</span>)]);
});</code></pre>
<h4>5)RxJS observable</h4>
<p>我没用过RxJS，它好像挺小众的。不过对于那些RxJS的死忠粉丝，他们会很高兴可以返回一个observable对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Observable = require('rx').Observable;

gulp.task('sometask', function() {
    return Observable.return(42);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> Observable = <span class="hljs-keyword">require</span>(<span class="hljs-string">'rx'</span>).Observable;

gulp.task(<span class="hljs-string">'sometask'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> Observable.<span class="hljs-keyword">return</span>(<span class="hljs-number">42</span>);
});</code></pre>
<h3 id="articleHeader5">监听</h3>
<p>处理文件系统的监听和响应的API也有了一点进步。之前的API中，在我们传入一个glob通配符和可选参数后，我们可以再指定一个任务数组或者一个回调函数用来处理事件数据。可是现在，任务队列都是由serise或者parallel函数合并而成，这样你就无法用一个回调来区分这些任务，所以我们取消了这种简单监听回调的方式。取而代之的是，<code>gulp.watch</code>将像之前一样会返回一个的“观察”对象，不过你可以对它添加各种事件监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 旧版
gulp.watch('js/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

// 新版:
var watcher = gulp.watch('js/**/*.js' /* 你可以在这里传一些参数或者函数 */);
watcher.on('all', function(event, path, stats) {
  console.log('File ' + path + ' was ' + event + ', running tasks...');
});

// 单个事件的监听
watcher.on('change', function(path, stats) {
  console.log('File ' + path + ' was changed, running tasks...');
});

watcher.on('add', function(path) {
  console.log('File ' + path + ' was added, running tasks...');
});

watcher.on('unlink', function(path) {
  console.log('File ' + path + ' was removed, running tasks...');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 旧版</span>
gulp.watch(<span class="hljs-string">'js/**/*.js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'File '</span> + event.path + <span class="hljs-string">' was '</span> + event.type + <span class="hljs-string">', running tasks...'</span>);
});

<span class="hljs-comment">// 新版:</span>
<span class="hljs-keyword">var</span> watcher = gulp.watch(<span class="hljs-string">'js/**/*.js'</span> <span class="hljs-comment">/* 你可以在这里传一些参数或者函数 */</span>);
watcher.on(<span class="hljs-string">'all'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event, path, stats</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'File '</span> + path + <span class="hljs-string">' was '</span> + event + <span class="hljs-string">', running tasks...'</span>);
});

<span class="hljs-comment">// 单个事件的监听</span>
watcher.on(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path, stats</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'File '</span> + path + <span class="hljs-string">' was changed, running tasks...'</span>);
});

watcher.on(<span class="hljs-string">'add'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'File '</span> + path + <span class="hljs-string">' was added, running tasks...'</span>);
});

watcher.on(<span class="hljs-string">'unlink'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">path</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'File '</span> + path + <span class="hljs-string">' was removed, running tasks...'</span>);
});</code></pre>
<p>正如所看到的，在<code>all</code>和<code>change</code>的事件处理中，你还可以接受一个stats对象。stats对象只在他们可用的时候出现（我也不确定他们什么时候可用什么时候不可用），不过你可以设置<code>alwaysStat</code>选项的值为<code>true</code>来让它始终出现。Gulp使用了<a href="https://github.com/paulmillr/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a>库来实现这些东西，阅读chokidar的文档能让你了解的更多，尽管chokidar并不支持在事件回调中指定第三个参数。</p>
<h3 id="articleHeader6">使用函数</h3>
<p>由于现在每个任务基本上就是一个函数，不需要任何依赖或其他的什么，实际上他们也仅仅是需要一个任务运行器来确认异步任务何时结束，我们可以把函数定义从<code>gulp.task</code>中独立出来，而不仅仅作为一个简单回调函数传给<code>gulp.task</code>。举个例子，这个代码之前我们在“依赖陷阱”那个章节的结论：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('styles', function() {...});
gulp.task('scripts', function() {...});
gulp.task('clean', function() {...});

gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'styles')));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>gulp.task('styles', function() <span class="hljs-meta">{...}</span>);
gulp.task('scripts', function() <span class="hljs-meta">{...}</span>);
gulp.task('clean', function() <span class="hljs-meta">{...}</span>);

gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'styles')));</code></pre>
<p>我把它变成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只需要在`series` 和 `parallel` 中间引用函数名就能组成一个新任务
gulp.task('default', gulp.series(clean, gulp.parallel(scripts, styles)));

// 把单个任务变成一个函数
function styles() {...}
function scripts() {...}
function clean() {...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>// 只需要在`series` 和 `parallel` 中间引用函数名就能组成一个新任务
gulp.task('default', gulp.series(clean, gulp.parallel(scripts, styles)));

// 把单个任务变成一个函数
function styles() <span class="hljs-meta">{...}</span>
function scripts() <span class="hljs-meta">{...}</span>
function clean() <span class="hljs-meta">{...}</span></code></pre>
<p>这里有几点要注意的地方：<br>1.由于js是有函数定义提升的，函数的定义可以放在你定义default任务之后，不像之前说的，如果你要用一些小任务组成一个新任务的时候，你就必须要先定义那些小任务。这样就使得你可以在一开始就定义好实际要运行的任务，这样别人阅读起来也更方便一些，以免别人还要在翻阅了一堆其他任务代码后，才能发现藏在最后的实际要运行的那些。<br>2.<code>styles</code>, <code>scripts</code>, 和 <code>clean</code> 现在都相当于“私有”任务，他们无法通过gulp命令行来运行。<br>3.这样就没有那么多匿名函数了。<br>4.也没有那么多被引号包裹住的“任务”名了，这样意味着你可以通过你的代码编辑器/IDE帮你检查拼写错误，而不用在运行Gulp的时候才能发现错误。<br>5.即使把“任务”函数放在多个文件中定义，也能方便的把它们引用到同一个文件中，然后再通过<code>gulp.task</code>把它们变成实际可用的任务。<br>6.这些任务都是可以独立测试的（如果你要测试）而不需要gulp。</p>
<p>当然第2点也是可以修改的，如果你希望它们是可以被gulp命令行所执行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task(styles);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">gulp.task(styles)<span class="hljs-comment">;</span></code></pre>
<p>这样你就能新建了一个可以运行在命令行的“styles”任务。注意你可从来没有在代码中定义过它的名字。gulp.task可以很智能的把函数名转成任务名。当然，匿名函数是不行的：Gulp会抛出一个错误当你想要把匿名函数指定成一个任务，却没有给它起一个新名字。</p>
<p>如果你想给函数起个别名，你可以在函数的<code>displayName</code>属性中指定它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function styles(){...}
styles.displayName = &quot;pseudoStyles&quot;;
gulp.task(styles);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>function styles()<span class="hljs-meta">{...}</span>
styles.displayName = <span class="hljs-string">"pseudoStyles"</span>;
gulp.task(styles);</code></pre>
<p>现在任务名将会从“styles”变成“pseudoStyles”。你也可以通过指定description属性来给你的任务添加描述。你可以通过gulp --tasks命令来查看这些描述：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function styles(){...}
styles.displayName = &quot;pseudoStyles&quot;;
styles.description = &quot;Does something with the stylesheets.&quot;
gulp.task(styles);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>function styles()<span class="hljs-meta">{...}</span>
styles.displayName = <span class="hljs-string">"pseudoStyles"</span>;
styles.description = <span class="hljs-string">"Does something with the stylesheets."</span>
gulp.task(styles);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ gulp --tasks
[12:00:00] Tasks for ~/project/gulpfile.js
[12:00:00] └── pseudoStyles  Does something with the stylesheets." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>$ gulp <span class="hljs-comment">--tasks</span>
[<span class="hljs-number">12</span>:<span class="hljs-number">00</span>:<span class="hljs-number">00</span>] Tasks <span class="hljs-keyword">for</span> ~/project/gulpfile.js
[<span class="hljs-number">12</span>:<span class="hljs-number">00</span>:<span class="hljs-number">00</span>] └── pseudoStyles  Does something <span class="hljs-keyword">with</span> the stylesheets.</code></pre>
<p>你甚至可以给你其他已经注册的任务添加描述，比如<code>default</code>。首先你要运行<code>gulp.task('taskName')</code>来取人这个任务已经被定义过了，然后才给它添加描述：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('default', gulp.series(clean, gulp.parallel(scripts, styles)));

// Use gulp.task to retrieve the task
var defaultTask = gulp.task('default');
// give it a description
defaultTask.description = &quot;Does Default Stuff&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'default'</span>, gulp.series(clean, gulp.parallel(scripts, styles)));

<span class="hljs-comment">// Use gulp.task to retrieve the task</span>
var defaultTask = gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'default'</span>);
<span class="hljs-comment">// give it a description</span>
defaultTask.<span class="hljs-keyword">description</span> = <span class="hljs-string">"Does Default Stuff"</span>;</code></pre>
<p>我们也可以简化它，取消中间值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('default', gulp.series(clean, gulp.parallel(scripts, styles)));
gulp.task('default').description = &quot;Does Default Stuff&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'default'</span>, gulp.series(clean, gulp.parallel(scripts, styles)));
gulp.<span class="hljs-keyword">task</span>(<span class="hljs-string">'default'</span>).<span class="hljs-keyword">description</span> = <span class="hljs-string">"Does Default Stuff"</span>;</code></pre>
<p>对那些不熟悉你的项目的人来说，这些描述是相当有用的。所以我建议在任何情况下都要添加它：有时它比注释还更有用。最后总结一下，这是我推荐的Gulp4的最佳实践：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('default', gulp.series(clean, gulp.parallel(scripts, styles)));
gulp.task('default').description = &quot;This is the default task and it does certain things&quot;;

function styles() {...}
function scripts() {...}
function clean() {...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>gulp.task('default', gulp.series(clean, gulp.parallel(scripts, styles)));
gulp.task('default').description = <span class="hljs-string">"This is the default task and it does certain things"</span>;

function styles() <span class="hljs-meta">{...}</span>
function scripts() <span class="hljs-meta">{...}</span>
function clean() <span class="hljs-meta">{...}</span></code></pre>
<p>如果你运行<code>gulp --tasks</code>，你将会看到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ gulp --tasks
[12:00:00] Tasks for ~\localhost\gulp4test\gulpfile.js
[12:00:00] └─┬ default  This is the default task and it does certain things
[12:00:00]   └─┬ <series>
[12:00:00]     ├── clean
[12:00:00]     └─┬ <parallel>
[12:00:00]       ├── scripts
[12:00:00]       └── styles" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>$ gulp --tasks
<span class="hljs-selector-attr">[12:00:00]</span> Tasks for ~\localhost\gulp4test\gulpfile<span class="hljs-selector-class">.js</span>
<span class="hljs-selector-attr">[12:00:00]</span> └─┬ default  This is the default task and it does certain things
<span class="hljs-selector-attr">[12:00:00]</span>   └─┬ &lt;series&gt;
<span class="hljs-selector-attr">[12:00:00]</span>     ├── clean
<span class="hljs-selector-attr">[12:00:00]</span>     └─┬ &lt;parallel&gt;
<span class="hljs-selector-attr">[12:00:00]</span>       ├── scripts
<span class="hljs-selector-attr">[12:00:00]</span>       └── styles</code></pre>
<p>你会发现这里不仅有你添加的描述，你还能看到完整的运行队列树。我也很乐意听到你对最佳实践有其他看法，不过在阐述结论前最好先跟你的团队讨论一下。</p>
<p>不管怎么样，我还是很高兴看到Gulp4有很多有用的改进，但是它们也给迁移带来了不少痛苦。我希望这份指南能帮助你顺利迁移到Gulp4当它正式发布后（可能过几天……也可能……）。上帝保佑~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】相对完整的Gulp4升级指南

## 原文链接
[https://segmentfault.com/a/1190000005357048](https://segmentfault.com/a/1190000005357048)

