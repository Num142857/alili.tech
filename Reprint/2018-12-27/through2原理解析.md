---
title: 'through2原理解析' 
date: 2018-12-27 2:30:13
hidden: true
slug: 676ii2h8p1
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p><code>through2</code>经常被用于处理<code>node</code>的<code>stream</code>，假如使用过<code>gulp</code>的话，对于这个包一定不会陌生，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp.task('rewrite', () => {
  return gulp.src('./through/enter.txt')
    .pipe(through2.obj(function(chunk, enc, callback) {
      const { contents } = chunk;
      for (var i = 0; i < contents.length; i++) {
        if (contents[i] === 97) {
          contents[i] = 122;
        }
      }

      chunk.contents = contents;
      this.push(chunk);

      callback();
    }))
    .pipe(gulp.dest('./dist'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">gulp.task(<span class="hljs-string">'rewrite'</span>, () =&gt; {
  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'./through/enter.txt'</span>)
    .pipe(through2.obj(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk, enc, callback</span>) </span>{
      <span class="hljs-keyword">const</span> { contents } = chunk;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; contents.length; i++) {
        <span class="hljs-keyword">if</span> (contents[i] === <span class="hljs-number">97</span>) {
          contents[i] = <span class="hljs-number">122</span>;
        }
      }

      chunk.contents = contents;
      <span class="hljs-keyword">this</span>.push(chunk);

      callback();
    }))
    .pipe(gulp.dest(<span class="hljs-string">'./dist'</span>));
});</code></pre>
<p>这里将文件中所有的字符<code>a</code>转换为字符<code>z</code>，在写<code>gulp</code>插件时一定会应用到这个包，下面就来窥探一下这个使用率非常高的包。</p>
<h2 id="articleHeader1">Transform stream</h2>
<p><code>through2</code>的源码仅仅就100多行，本质上就是对于<code>node</code>原生的<code>transform</code>流进行的封装，先来看下<code>Transform stream</code>。<code>Transform</code>是一个双工流，既可读，也可写，但是与<code>Duplex</code>还是有着一些区别，<code>Duplex</code>的写和读可以说是没有任何的关联，是两个缓冲区和管道互补干扰，而<code>Transform</code>将其输入和输出是存在相互关联的，中间做了处理。具体差别可以参考下面图片对比：</p>
<p><code>Duplex stream</code>:</p>
<p><span class="img-wrap"><img data-src="/img/bVXikC?w=561&amp;h=340" src="https://static.alili.tech/img/bVXikC?w=561&amp;h=340" alt="Duplex 图示" title="Duplex 图示" style="cursor: pointer; display: inline;"></span></p>
<p><code>Transform stream</code>:</p>
<p><span class="img-wrap"><img data-src="/img/bVXih2?w=555&amp;h=346" src="https://static.alili.tech/img/bVXih2?w=555&amp;h=346" alt="transform 图示" title="transform 图示" style="cursor: pointer; display: inline;"></span></p>
<p><code>Transform stream</code>的两个缓存区相互关联，对于每个缓冲区来说，<code>highWaterMark</code>为阈值，超过阈值后，将会停止读或者写操作，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let i = 0;
const readable = Readable({
  highWaterMark: 2,
  read: function () {
    var data = i < 26 ? String.fromCharCode(i++ + 97) : null;
    console.log('push', data);
    this.push(data);
  }
});

const transform = Transform({
  highWaterMark: 2,
  transform: function (buf, enc, next) {
    console.log('transform', buf.toString());
    next(null, buf);
  }
})

readable.pipe(transform);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
<span class="hljs-keyword">const</span> readable = Readable({
  <span class="hljs-attr">highWaterMark</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">read</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> data = i &lt; <span class="hljs-number">26</span> ? <span class="hljs-built_in">String</span>.fromCharCode(i++ + <span class="hljs-number">97</span>) : <span class="hljs-literal">null</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'push'</span>, data);
    <span class="hljs-keyword">this</span>.push(data);
  }
});

<span class="hljs-keyword">const</span> transform = Transform({
  <span class="hljs-attr">highWaterMark</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">transform</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">buf, enc, next</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'transform'</span>, buf.toString());
    next(<span class="hljs-literal">null</span>, buf);
  }
})

readable.pipe(transform);</code></pre>
<p><code>stream</code>流向为：</p>
<p><span class="img-wrap"><img data-src="/img/bVXiRw?w=451&amp;h=205" src="https://static.alili.tech/img/bVXiRw?w=451&amp;h=205" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>由于阈值为<code>2</code>，所以只能<code>push</code>到<code>f</code>，这时<code>readable</code>的缓存区已满，<code>transform</code>的读缓存区和写缓存区已经满了（由于<code>transform</code>的两个缓存区的阈值为<code>2</code>，所以写缓存区在写入<code>b</code>之后就已经满了，后续不能继续写入），全部满之后，自然停止了读取，最终<code>e,f</code>存在<code>A</code>中，<code>c,d</code>存在<code>B</code>中，<code>a,b</code>存在<code>C</code>中，想要解决很简单，在添加一个流向就可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="readable.pipe(transform).pipe(process.stdout);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">readable.pipe(transform).pipe(process.stdout);</code></pre>
<h2 id="articleHeader2">through2源码</h2>
<p>在了解<code>Transform stream</code>之后，<code>through2</code>的源码非常的简单，就是对于其的一层封装，暴露出三个<code>api</code>(<code>through2</code>，<code>through2.obj</code>，<code>through2.ctor</code>)而且三者接收的参数一致，因为都是由一个工厂方法创造出的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function through2 (construct) {
  return function (options, transform, flush) {
    // 做了一些参数整理
    if (typeof options == 'function') {
      flush     = transform
      transform = options
      options   = {}
    }

    if (typeof transform != 'function')
      transform = noop

    if (typeof flush != 'function')
      flush = null

    return construct(options, transform, flush)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">through2</span> (<span class="hljs-params">construct</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options, transform, flush</span>) </span>{
    <span class="hljs-comment">// 做了一些参数整理</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options == <span class="hljs-string">'function'</span>) {
      flush     = transform
      transform = options
      options   = {}
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> transform != <span class="hljs-string">'function'</span>)
      transform = noop

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> flush != <span class="hljs-string">'function'</span>)
      flush = <span class="hljs-literal">null</span>

    <span class="hljs-keyword">return</span> construct(options, transform, flush)
  }
}</code></pre>
<p>来看一下<code>through2</code>对于<code>Transform stream</code>的再加工，也就是源码中的<code>DestroyableTransform</code>，与其名字一样，就是一个替我们实现好了<code>destory</code>方法的<code>Transform stream</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DestroyableTransform.prototype.destroy = function(err) {
  if (this._destroyed) return
  this._destroyed = true

  var self = this
  // 触发destory后，close掉流
  process.nextTick(function() {
    if (err)
      self.emit('error', err)
    self.emit('close')
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>DestroyableTransform.prototype.destroy = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span> </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._destroyed) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">this</span>._destroyed = <span class="hljs-literal">true</span>

  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-comment">// 触发destory后，close掉流</span>
  process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (err)
      self.emit(<span class="hljs-string">'error'</span>, err)
    self.emit(<span class="hljs-string">'close'</span>)
  })
}</code></pre>
<p><code>through2</code>与<code>through2.obj</code>全部是创造出一个再加工后的<code>Transform</code>，区别如下：</p>
<ul>
<li>后者开启了对象模式（<code>objectMode</code>属性为<code>true</code>），写入的参数不仅仅限制在<code>string or uint8Array</code>
</li>
<li>后者降低了阈值（<code>highWaterMark</code>为<code>16</code>，而不是默认的<code>16kb</code>），这样做的原因，是为了和<code>node</code>的默认保持一致，具体可以参见<a href="https://github.com/rvagg/through2/pull/18" rel="nofollow noreferrer" target="_blank">这里</a>
</li>
</ul>
<p><code>through2.ctor</code>可以用来再次定制，其返回的是一个构造函数，用法可以参考下面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Tran = through.ctor(function(chunk, enc, callback) {
  console.log('transform', chunk.toString());
  callback(null, chunk);
});
const transform = new Tran();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Tran = through.ctor(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk, enc, callback</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'transform'</span>, chunk.toString());
  callback(<span class="hljs-literal">null</span>, chunk);
});
<span class="hljs-keyword">const</span> transform = <span class="hljs-keyword">new</span> Tran();</code></pre>
<h2 id="articleHeader3">写在最后</h2>
<p><code>stream</code>在<code>node</code>中有着非常广泛的应用，但是它使用起来却不是那么友好，<code>throgh2</code>的出现可以减少使用上的麻烦，其原理也非常的简单；以上内容均为本人理解，如有错误还请指出，不胜感激~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
through2原理解析

## 原文链接
[https://segmentfault.com/a/1190000011740894](https://segmentfault.com/a/1190000011740894)

