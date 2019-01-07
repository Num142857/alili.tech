---
title: '高级PHP（初级架构师）面试题' 
date: 2019-01-08 2:30:11
hidden: true
slug: 9sky2k1fw
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">PHP 篇</h1>
<h2 id="articleHeader1">GC</h2>
<ul>
<li>
<code>PHP 5</code> 的内存回收原理？<p>请详细描述<code>ZendMM</code>的工作原理</p>
</li>
<li>
<code>PHP 7</code> 的垃圾回收和 <code>PHP 5</code> 有什么区别？</li>
</ul>
<h2 id="articleHeader2">结构</h2>
<ul>
<li>
<code>PHP 7</code> 中对<code>zVal</code>做了哪些修改？</li>
<li>
<code>PHP 7</code> 中哪些变量类型在<strong>栈</strong>，哪些变量类型在<strong>堆</strong>？<p>变量在栈会有什么优势？<code>PHP 7</code>是如何让变量新建在栈的？</p>
</li>
<li>详细描述<code>PHP</code>中<code>HashMap</code>的结构是如何实现的？</li>
<li>
<p>下面代码中，在<code>PHP 7</code>下， <code>$a</code> 和 <code>$b</code>、<code>$c</code>、<code>$d</code> 分别指向什么<code>zVal</code>结构？</p>
<p><code>$d</code> 被修改的时候，<code>PHP 7</code> / <code>PHP 5</code> 的内部分别会有哪些操作？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$a = 'string';
$b = &amp;$a;
$c = &amp;$b;
$d = $b;
$d = 'to';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>$a = <span class="hljs-string">'string'</span><span class="hljs-comment">;</span>
$b = &amp;$a<span class="hljs-comment">;</span>
$c = &amp;$b<span class="hljs-comment">;</span>
$d = $b<span class="hljs-comment">;</span>
$d = <span class="hljs-string">'to'</span><span class="hljs-comment">;</span></code></pre>
</li>
<li>JIT 是做了哪些优化，从而对PHP的速度有不少提升？</li>
</ul>
<h2 id="articleHeader3">字符串操作</h2>
<ul>
<li>
<code>strtr</code> 和 <code>str_replace</code> 有什么区别，两者分别用在什么场景下？<p><code>strtr</code>的程序是如何实现的？</p>
</li>
<li>字符串在手册中介绍，「PHP的字符串是二进制安全的」，这句话怎么理解，为什么是二进制安全？</li>
<li>字符串连接符<code>.</code>，在内核中有哪些操作？<p>多次<code>.</code>连接，是否会造成内存碎片过多？</p>
</li>
</ul>
<h2 id="articleHeader4">多线程</h2>
<ul>
<li>
<code>PHP</code>中创建多线程、多进程有哪些方式？<p>互斥信号该如何实现？</p>
</li>
<li>
<code>PHP</code>中使用多线程和多进程分别有哪些优缺点？</li>
<li>线上环境中，<code>PHP进程</code>偶尔会卡死（死锁），请问如何检测本质问题？</li>
</ul>
<h2 id="articleHeader5">管道</h2>
<ul>
<li>
<code>Laravel</code>的中间件的顺序执行，是如何实现的？</li>
<li>
<p>实现管道的<code>makeFn</code>函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function pipe($input, $list) {
    $fn = makeFn($list); 
    return $fn($input);
}
$r = pipe(0, [$a, $b, $c]);
echo $r;

//$a, $b, $c 类似于
$a = function($input, $next) {
    $input++;
    $output = $next($input);
    return $output;
};

function makeFn($list){
    //请实现

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pipe</span><span class="hljs-params">($input, $list)</span> </span>{
    $fn = makeFn($list); 
    <span class="hljs-keyword">return</span> $fn($input);
}
$r = pipe(<span class="hljs-number">0</span>, [$a, $b, $c]);
<span class="hljs-keyword">echo</span> $r;

<span class="hljs-comment">//$a, $b, $c 类似于</span>
$a = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">($input, $next)</span> </span>{
    $input++;
    $output = $next($input);
    <span class="hljs-keyword">return</span> $output;
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeFn</span><span class="hljs-params">($list)</span></span>{
    <span class="hljs-comment">//请实现</span>

}
</code></pre>
</li>
</ul>
<h2 id="articleHeader6">内存优化</h2>
<ul>
<li>使用<code>cUrl</code>下载大文件时，占用内存太大，有没比较优化的方式？</li>
<li>
<code>PHP</code> 上传大文件（比如：<code>2 GiB</code>的视频），需要修改<code>php.ini</code>的哪些配置以免受到上传的大小限制？或者你有其它更好的方式？</li>
</ul>
<h2 id="articleHeader7">Cli</h2>
<ul><li>用PHP实现一个定时任务器？</li></ul>
<h2 id="articleHeader8">安全</h2>
<ul><li>
<code>PHP</code>中密码加密，使用什么方式加密？<p>这种加密的优点是什么？<br>PHP 7.2 新增的加密方法的名称是？</p>
</li></ul>
<h2 id="articleHeader9">反射</h2>
<ul>
<li>
<p>实现如下函数(PHP 7)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="echo a(1, 3); //4
echo a(3)(5); //8
echo a(1, 2)(3, 4, 5)(6); //21" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>echo a(<span class="hljs-number">1</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">//4</span>
echo a(<span class="hljs-number">3</span>)(<span class="hljs-number">5</span>); <span class="hljs-comment">//8</span>
echo a(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)(<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>)(<span class="hljs-number">6</span>); <span class="hljs-comment">//21</span></code></pre>
</li>
<li>如何读取某函数的参数列表，以及参数的默认值。</li>
<li>描述下<code>IoC</code> （<code>DI</code>）的实现原理</li>
</ul>
<h1 id="articleHeader10">数据库篇</h1>
<ul>
<li>搭建<code>MySQL</code>分布式，有哪些方式？</li>
<li>
<code>MySQL</code>主从同步，和主主同步有哪些区别，以及优劣势？</li>
<li>
<code>Laravel</code>中，多态一对多，多对多，数据库要怎么设计？<p>比如一个关键词表<code>tags</code>，需要关联用户、帖子、评论、视频等表。</p>
</li>
<li>
<code>MySQL</code>防止注入有哪些方式？</li>
<li>描述<code>MySQL</code>的注入原理？</li>
<li>
<p>怎么解决数据库中常见的 N+1 效率问题</p>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$users = SELECT * FROM `users` WHERE `gender` = 'male';
foreach ($users as &amp;$user)
    $user['posts'] = SELECT * FROM `posts` WHERE `user_id` = $user['id'];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>$users = <span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> <span class="hljs-symbol">`users`</span> <span class="hljs-keyword">WHERE</span> <span class="hljs-symbol">`gender`</span> = <span class="hljs-string">'male'</span>;
foreach ($users as &amp;$user)
    $user['posts'] = <span class="hljs-keyword">SELECT</span> * <span class="hljs-keyword">FROM</span> <span class="hljs-symbol">`posts`</span> <span class="hljs-keyword">WHERE</span> <span class="hljs-symbol">`user_id`</span> = $<span class="hljs-keyword">user</span>[<span class="hljs-string">'id'</span>];</code></pre>
</li>
<li>哪些情况下字段允许<code>null</code>，哪些情况下不允许？</li>
<li>
<code>MySQL</code>中脏读应该怎么处理？<p>引申：比如京东的库存，0点多人抢购的时候库存问题？</p>
</li>
<li>
<p>如下数据库中会有哪些值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="START TRANSACTION;
  INSERT INTO `users` (`name`) VALUES('a');
  START TRANSACTION;
    INSERT INTO `users` (`name`) VALUES('b');
    START TRANSACTION;
      INSERT INTO `users` (`name`) VALUES('c');
    ROLLBACK;
  COMMIT;
ROLLBACK;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-keyword">START</span> <span class="hljs-keyword">TRANSACTION</span>;
  <span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> <span class="hljs-string">`users`</span> (<span class="hljs-string">`name`</span>) <span class="hljs-keyword">VALUES</span>(<span class="hljs-string">'a'</span>);
  <span class="hljs-keyword">START</span> <span class="hljs-keyword">TRANSACTION</span>;
    <span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> <span class="hljs-string">`users`</span> (<span class="hljs-string">`name`</span>) <span class="hljs-keyword">VALUES</span>(<span class="hljs-string">'b'</span>);
    <span class="hljs-keyword">START</span> <span class="hljs-keyword">TRANSACTION</span>;
      <span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> <span class="hljs-string">`users`</span> (<span class="hljs-string">`name`</span>) <span class="hljs-keyword">VALUES</span>(<span class="hljs-string">'c'</span>);
    <span class="hljs-keyword">ROLLBACK</span>;
  <span class="hljs-keyword">COMMIT</span>;
<span class="hljs-keyword">ROLLBACK</span>;</code></pre>
</li>
<li>
<code>Elasticsearch</code> 如何实现类似SQL的 <code>WHERE `id` = 12 AND `gender` IN ('male', 'unknow');</code>
</li>
</ul>
<h1 id="articleHeader11">前端篇</h1>
<ul>
<li>描述<code>XSS</code>注入原理，以及如何防止？</li>
<li><del>描述<code>HTML 5</code>中新增的 <code>EventSource</code> 的功能和应用场景？</del></li>
</ul>
<h2 id="articleHeader12">ES 6</h2>
<ul>
<li>
<code>ES 6</code>中的 <code>Promise</code> 对象是做什么的？</li>
<li>解释<code>ES 6</code>中<code>async、await</code>的使用场景？</li>
<li>
<code>ES 6</code>中 <code>遍历器Iterator</code> 怎么写，其作用是什么？<p>回调地狱(<code>callback hell</code>) 如何使用 <code>遍历器Iterator</code> 实现，提示：<code>Thunk</code></p>
</li>
<li>
<p>写出下面代码执行后输出的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = new Promise(resolve => {
    console.log(1);
    resolve(2);
})
let p2 = new Promise(resolve => {
    console.log(3);
    resolve(p1);
});
p1.then(re => {
    console.log(re);
});
p2.then(re => {
    console.log(re);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    resolve(<span class="hljs-number">2</span>);
})
<span class="hljs-keyword">let</span> p2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
    resolve(p1);
});
p1.then(<span class="hljs-function"><span class="hljs-params">re</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(re);
});
p2.then(<span class="hljs-function"><span class="hljs-params">re</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(re);
});</code></pre>
</li>
</ul>
<h2 id="articleHeader13">Vue</h2>
<ul>
<li>
<code>vue</code> 和 <code>angularJS</code> 中检测<code>脏数据</code>的原理有什么区别？</li>
<li>
<code>vue</code>中，<code>vuex</code>的主要作用是什么？</li>
<li>
<p><code>vue</code>中 <code>data</code> 和<code>computed</code> 有什么区别？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    computed: {
        now() {
            return new Date();
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">computed</span>: {
        <span class="hljs-built_in">now</span>() {
            return new <span class="hljs-built_in">Date</span>();
        }
    }
}</code></pre>
<p>上面的<code>now</code>变量，是否能够在每次调用时得到当前时间？</p>
</li>
<li>
<code>vuex</code>中<code>mutations</code> 和<code>actions</code> 有什么区别？</li>
<li>
<code>vuex</code>中如何在外部（可以理解为任意一段&lt;script&gt;中）设置变量的值，以及如何调用<code>mutations</code>
</li>
</ul>
<h1 id="articleHeader14">通讯协议篇</h1>
<ul>
<li>详细描述 <code>HTTPS</code>（<code>SSL</code>）工作原理？</li>
<li>服务器使用<code>PHP</code>时，客户端的<code>IP</code>能伪造吗？如果能，列出伪造方法；如果不能，说明原因？</li>
<li>描述域名劫持的各种方法，为什么<code>HTTPS</code>不能被劫持？</li>
<li>描述<code>HTTP协议</code>是什么，以及<code>HTTP 2</code> 和 <code>HTTP 1.1</code> 有什么区别？</li>
<li>详细描述<code>IP协议</code>、<code>TCP协议</code>，以及<code>UDP协议</code>与它们的区别。</li>
<li>
<code>TCP协议</code>中，最大传输单元<code>MTU</code>一般最大是多少，在<code>TCP协议</code>中，如果一个数据被分割成多个包，这些包结构中什么字段会被标记相同。<br><code>UDP</code>分包和<code>TCP</code>分包会有哪些区别？</li>
<li>
<code>HTTP协议</code>中 <code>Transfer-Encoding: Chunked</code> 适用于哪些应用场景，这个与使用<code>Content-Length: xxx</code>在收到的报文包上有哪些区别？</li>
</ul>
<h1 id="articleHeader15">分布式篇</h1>
<ul>
<li>描述<code>epoll</code>和<code>poll、select</code>的区别，为什么<code>epoll</code>会具备性能优势？</li>
<li>描述下<code>惊群</code>的原因？有什么有效的方法可以避免惊群？</li>
<li>什么是<code>Hash一致性</code>，这个方法主要运用在什么场景？</li>
<li>设计一个<code>多重缓存</code>的拓扑结构</li>
</ul>
<h1 id="articleHeader16">综合篇</h1>
<ul>
<li>描述<code>OAuth2</code>的工作原理？</li>
<li>列出几个中文分词工具？</li>
<li>
<code>git</code> 放弃未提交的文件有哪些方法？<br><code>git</code>删除远程分支、<code>Tag</code>有什么方法？<br><code>git</code>覆盖远程仓库有什么办法？</li>
<li>
<code>CentOS</code> 下安装<code>php扩展</code>有哪些方法？</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高级PHP（初级架构师）面试题

## 原文链接
[https://segmentfault.com/a/1190000010262869](https://segmentfault.com/a/1190000010262869)

