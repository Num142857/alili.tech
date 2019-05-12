---
title: '让我们开始用es6来写代码--gulp构建es6' 
date: 2019-02-11 2:30:49
hidden: true
slug: 9d93vptwy6n
categories: [reprint]
---

{{< raw >}}

                    
<p>想构建一个前端自动化环境，来处理image，css，js（es6，jsx）的处理和保存刷新，让jser专注写代码</p>
<p>我当初选择gulp，但是接触到了es6和react后又在gulp加入了gulp-babel, babel-preset-es2015和gulp-react。一路很多坑，这里总结一下。</p>
<p>A):首先是gulp来处理es6<br>先装nodejs，之后通过npm装gulp, gulp-babel, babel-preset-es2015, gulp-webpack（ADM模块调用时会用到）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g gulp
npm init
npm install --save-dev gulp gulp-babel babel-preset-es2015 gulp-webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>npm <span class="hljs-keyword">install </span>-g gulp
npm init
npm <span class="hljs-keyword">install </span>--save-dev gulp gulp-<span class="hljs-keyword">babel </span><span class="hljs-keyword">babel-preset-es2015 </span>gulp-webpack
</code></pre>
<p>B):然后写gulpfile.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp=require(&quot;gulp&quot;),
  babel = require(&quot;gulp-babel&quot;),
  es2015 = require(&quot;babel-preset-es2015&quot;),
  webpack = require(&quot;gulp-webpack&quot;);

gulp.task(&quot;default&quot;,function(){
  gulp.src(&quot;./js/es6/*.es6&quot;)
    .pipe(babel({presets:[es2015]}))
    .pipe(gulp.dest(&quot;./js&quot;))//es6转js必须在webpack之前，否则webpack找不到要包装的js会报错
    .pipe(webpack({//babel编译import会转成require，webpack再包装以下代码让代码里支持require
      output:{
        filename:&quot;all.js&quot;,
      },
      stats:{
        colors:true
      }
    }))
    .pipe(gulp.dest(&quot;./js&quot;));//包装好的js目录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> gulp=<span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp"</span>),
  babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-babel"</span>),
  es2015 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-preset-es2015"</span>),
  webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-webpack"</span>);

gulp.task(<span class="hljs-string">"default"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  gulp.src(<span class="hljs-string">"./js/es6/*.es6"</span>)
    .pipe(babel({<span class="hljs-attr">presets</span>:[es2015]}))
    .pipe(gulp.dest(<span class="hljs-string">"./js"</span>))<span class="hljs-comment">//es6转js必须在webpack之前，否则webpack找不到要包装的js会报错</span>
    .pipe(webpack({<span class="hljs-comment">//babel编译import会转成require，webpack再包装以下代码让代码里支持require</span>
      output:{
        <span class="hljs-attr">filename</span>:<span class="hljs-string">"all.js"</span>,
      },
      <span class="hljs-attr">stats</span>:{
        <span class="hljs-attr">colors</span>:<span class="hljs-literal">true</span>
      }
    }))
    .pipe(gulp.dest(<span class="hljs-string">"./js"</span>));<span class="hljs-comment">//包装好的js目录</span></code></pre>
<p>});</p>
<p>到这里构建工具就完成了待下面的es6编写完成执行gulp即可。</p>
<p>C):写es6喽<br>animal.es6</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Animal{
  constructor(){
    console.log(&quot;==constructor animal==&quot;);
  }
  sayHello(){
    console.log(&quot;==sayHello animal==&quot;);
  }
}

export default Animal;//这个必须，否则require到的模块将会是空Object，webpack里导出模块其实是(module.exports = Animal)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span></span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"==constructor animal=="</span>);
  }
  sayHello(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"==sayHello animal=="</span>);
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Animal;<span class="hljs-comment">//这个必须，否则require到的模块将会是空Object，webpack里导出模块其实是(module.exports = Animal)</span>
</code></pre>
<p>dog.es6</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Animal from &quot;./animal&quot;//导入模块，其实是var Animal = require(&quot;./animal&quot;);与export想对应出现
class Dog extends Animal{
  constructor(){
    super();//执行一次父类的构造，否则会报错
    console.log(&quot;==constructor dog==&quot;);
  }
}

var dog = new Dog();
dog.sayHello();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">Animal</span> from <span class="hljs-string">"./animal"</span><span class="hljs-comment">//导入模块，其实是var Animal = require("./animal");与export想对应出现</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Animal</span></span>{
  constructor(){
    <span class="hljs-keyword">super</span>();<span class="hljs-comment">//执行一次父类的构造，否则会报错</span>
    console.log(<span class="hljs-string">"==constructor dog=="</span>);
  }
}

<span class="hljs-keyword">var</span> dog = <span class="hljs-keyword">new</span> <span class="hljs-type">Dog</span>();
dog.sayHello();
</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;all.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"all.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在chrome的console下会看到输出结果</p>
<p>总结：gulp+webpack+es6，这里我们只用到了webpack的AMD的一个功能，gulp和webpack都有压缩合并的功能，有兴趣的看下面的网站进一步学习：<br>gulp学习:<a href="http://www.gulpjs.com.cn/docs/getting-started/" rel="nofollow noreferrer" target="_blank">http://www.gulpjs.com.cn/docs/getting-st...</a><br>webpack学习：<a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs/</a><br>webpack配置：<a href="http://www.tuicool.com/articles/uQfmqie" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articles/uQfmqie</a><br>babel学习：<a href="http://babeljs.io/docs/setup/" rel="nofollow noreferrer" target="_blank">http://babeljs.io/docs/setup/</a></p>
<p>之后会在此基础上介绍让React的jsx用上es6。。。。。尽请期待。。。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让我们开始用es6来写代码--gulp构建es6

## 原文链接
[https://segmentfault.com/a/1190000004939789](https://segmentfault.com/a/1190000004939789)

