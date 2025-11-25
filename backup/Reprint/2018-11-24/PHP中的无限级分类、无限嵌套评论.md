---
title: 'PHP中的无限级分类、无限嵌套评论' 
date: 2018-11-24 2:30:10
hidden: true
slug: rr7r3rmp2c9
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x56DE;&#x987E;</h3><p>&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x6211;&#x4EEC;&#x8BB2;&#x5230;<a href="https://segmentfault.com/a/1190000015372165">&#x5B9E;&#x6218;PHP&#x6570;&#x636E;&#x7ED3;&#x6784;&#x57FA;&#x7840;&#x4E4B;&#x9012;&#x5F52;</a>&#x3002;&#x6765;&#x56DE;&#x987E;&#x4E0B;&#x4EC0;&#x4E48;&#x662F;&#x9012;&#x5F52;&#xFF1F;</p><p>&#x4E00;&#x822C;&#x6765;&#x8BF4;&#xFF0C;&#x9012;&#x5F52;&#x88AB;&#x79F0;&#x4E3A;&#x51FD;&#x6570;&#x81EA;&#x8EAB;&#x7684;&#x8C03;&#x7528;&#x3002;</p><h3 id="articleHeader1">&#x9012;&#x5F52;&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x5B9E;&#x9645;&#x8FD0;&#x7528;</h3><h4>N&#x7EA7;&#x5206;&#x7C7B;</h4><p>&#x65E0;&#x9650;&#x7EA7;&#x7684;&#x5206;&#x7C7B;&#x5728;&#x5E73;&#x5E38;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#x662F;&#x5E38;&#x89C1;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x4E0D;&#x5C11;&#x9762;&#x8BD5;&#x9898;&#x4E2D;&#x90FD;&#x4F1A;&#x78B0;&#x5230;&#x3002;&#x4E0D;&#x7BA1;&#x4F60;&#x505A;&#x4EC0;&#x4E48;&#x9879;&#x76EE;&#xFF0C;&#x5E94;&#x8BE5;&#x90FD;&#x78B0;&#x5230;&#x8FC7;&#x7C7B;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#x3002;&#x4E0B;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4F7F;&#x7528;&#x9012;&#x5F52;&#x7684;&#x601D;&#x60F3;&#xFF0C;&#x5B9E;&#x6218;&#x4E00;&#x628A;&#x3002;</p><ul><li>SQL&#x7ED3;&#x6784;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) NOT NULL,
  `parentCategory` int(11) DEFAULT &apos;0&apos;,
  `sortInd` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="sql hljs"><code class="SQL"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-string">`categories`</span> (
  <span class="hljs-string">`id`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> AUTO_INCREMENT,
  <span class="hljs-string">`categoryName`</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">100</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  <span class="hljs-string">`parentCategory`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">&apos;0&apos;</span>,
  <span class="hljs-string">`sortInd`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  PRIMARY <span class="hljs-keyword">KEY</span> (<span class="hljs-string">`id`</span>)
) <span class="hljs-keyword">ENGINE</span>=<span class="hljs-keyword">InnoDB</span> AUTO_INCREMENT=<span class="hljs-number">11</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-keyword">CHARSET</span>=utf8;</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x865A;&#x62DF;&#x51FA;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#x51FA;&#x6765;&#xFF0C;&#x6700;&#x540E;&#x957F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015555745?w=672&amp;h=482" src="https://static.alili.tech/img/remote/1460000015555745?w=672&amp;h=482" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E0B;&#x9762; &#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x770B;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;?php
$dsn = &quot;mysql:host=127.0.0.1;port=3306;dbname=light-tips;charset=UTF8;&quot;;
$username = &apos;root&apos;;
$password = &apos;admin&apos;;
$pdo = new PDO($dsn, $username, $password);
$sql = &apos;SELECT * FROM `categories` ORDER BY `parentCategory`, `sortInd`&apos;;
$result = $pdo-&gt;query($sql, PDO::FETCH_OBJ);
$categories = [];
foreach ($result as $category) {
    $categories[$category-&gt;parentCategory][] = $category;
}
function showCategoryTree($categories, $n)
{
    if (isset($categories[$n])) {
        foreach ($categories[$n] as $category) {
            echo str_repeat(&apos;-&apos;, $n) . $category-&gt;categoryName . PHP_EOL;
            showCategoryTree($categories, $category-&gt;id);
        }
    }
    return;
}
showCategoryTree($categories, 0);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="php hljs"><code class="PHP"><span class="hljs-meta">&lt;?php</span>
$dsn = <span class="hljs-string">&quot;mysql:host=127.0.0.1;port=3306;dbname=light-tips;charset=UTF8;&quot;</span>;
$username = <span class="hljs-string">&apos;root&apos;</span>;
$password = <span class="hljs-string">&apos;admin&apos;</span>;
$pdo = <span class="hljs-keyword">new</span> PDO($dsn, $username, $password);
$sql = <span class="hljs-string">&apos;SELECT * FROM `categories` ORDER BY `parentCategory`, `sortInd`&apos;</span>;
$result = $pdo-&gt;query($sql, PDO::FETCH_OBJ);
$categories = [];
<span class="hljs-keyword">foreach</span> ($result <span class="hljs-keyword">as</span> $category) {
    $categories[$category-&gt;parentCategory][] = $category;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showCategoryTree</span><span class="hljs-params">($categories, $n)</span>
</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($categories[$n])) {
        <span class="hljs-keyword">foreach</span> ($categories[$n] <span class="hljs-keyword">as</span> $category) {
            <span class="hljs-keyword">echo</span> str_repeat(<span class="hljs-string">&apos;-&apos;</span>, $n) . $category-&gt;categoryName . PHP_EOL;
            showCategoryTree($categories, $category-&gt;id);
        }
    }
    <span class="hljs-keyword">return</span>;
}
showCategoryTree($categories, <span class="hljs-number">0</span>);</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x83B7;&#x53D6;&#x5230;&#x4E86;&#x6240;&#x6709;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x6309;&#x7167;&#x7236;&#x7EA7;ID&#x5F52;&#x7C7B;&#x3002;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x68D2;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;&#x60F3;&#x8C61;&#x4E00;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x5C55;&#x793A;&#x9876;&#x7EA7;&#x76EE;&#x5F55;&#x4E0B;&#x6240;&#x6709;&#x5B50;&#x76EE;&#x5F55;&#x7684;&#x95EE;&#x9898;&#x5206;&#x89E3;&#x6210;&#x4E86;&#x5C55;&#x793A;&#x81EA;&#x5DF1;&#x7684;&#x7C7B;&#x76EE;&#x6807;&#x9898;&#x548C;&#x5C55;&#x793A;&#x6570;&#x636E;&#x4E2D;parentCategory&#x4E3A;&#x5F53;&#x524D;&#x76EE;&#x5F55;id&#x7684;&#x5B50;&#x76EE;&#x5F55;&#xFF0C;&#x7136;&#x540E;&#x4F7F;&#x7528;&#x5F00;&#x59CB;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x3002;&#x6700;&#x540E;&#x7684;&#x8F93;&#x51FA;&#x662F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x7684;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015555746?w=378&amp;h=378" src="https://static.alili.tech/img/remote/1460000015555746?w=378&amp;h=378" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h4>&#x65E0;&#x9650;&#x5D4C;&#x5957;&#x8BC4;&#x8BBA;</h4><p>&#x5148;&#x6765;&#x770B;&#x4E0B;&#x8FD9;&#x4E2A; &#x65E0;&#x9650;&#x5D4C;&#x5957;&#x8BC4;&#x8BBA;&#x957F;&#x4EC0;&#x4E48;&#x6837;&#x5B50;&#x3002;&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015555747?w=800&amp;h=715" src="https://static.alili.tech/img/remote/1460000015555747?w=800&amp;h=715" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x9762;&#x7684;&#x6817;&#x5B50;&#xFF0C;&#x53C8;&#x662F;&#x4E00;&#x4E2A;&#x7ECF;&#x5178;&#x7684;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x9012;&#x5F52;&#x89E3;&#x51B3;&#x7684;&#x6848;&#x4F8B;&#x3002;&#x8FD8;&#x662F;&#x6765;&#x770B;&#x4E0B;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(500) NOT NULL,
  `username` varchar(50) NOT NULL,
  `datetime` datetime NOT NULL,
  `parentID` int(11) NOT NULL,
  `postID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="sql hljs"><code class="SQL"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-string">`comments`</span> (
  <span class="hljs-string">`id`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> AUTO_INCREMENT,
  <span class="hljs-string">`comment`</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">500</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  <span class="hljs-string">`username`</span> <span class="hljs-built_in">varchar</span>(<span class="hljs-number">50</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  <span class="hljs-string">`datetime`</span> datetime <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  <span class="hljs-string">`parentID`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  <span class="hljs-string">`postID`</span> <span class="hljs-built_in">int</span>(<span class="hljs-number">11</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>,
  PRIMARY <span class="hljs-keyword">KEY</span> (<span class="hljs-string">`id`</span>)
) <span class="hljs-keyword">ENGINE</span>=<span class="hljs-keyword">InnoDB</span> AUTO_INCREMENT=<span class="hljs-number">11</span> <span class="hljs-keyword">DEFAULT</span> <span class="hljs-keyword">CHARSET</span>=latin1;</code></pre><p>&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5B9E;&#x8DF5;&#x4E00;&#x904D;&#xFF0C;&#x5148;&#x4E0D;&#x8981;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;?php
$dsn = &quot;mysql:host=127.0.0.1;port=3306;dbname=light-tips;charset=UTF8;&quot;;
$username = &apos;root&apos;;
$password = &apos;admin&apos;;
$pdo = new PDO($dsn, $username, $password);
$sql = &apos;SELECT * FROM `comments` WHERE `postID` = :id ORDER BY `parentId`, `datetime`&apos;;
$stmt = $pdo-&gt;prepare($sql);
$stmt-&gt;setFetchMode(PDO::FETCH_OBJ);
$stmt-&gt;execute([&apos;:id&apos; =&gt; 1]);
$result = $stmt-&gt;fetchAll();
$comments = [];
foreach ($result as $comment) {
    $comments[$comment-&gt;parentID][] = $comment;
}
function showComments(array $comments, $n)
{
    if (isset($comments[$n])) {
        foreach ($comments[$n] as $comment) {
            echo str_repeat(&apos;-&apos;, $n) . $comment-&gt;comment . PHP_EOL;
            showComments($comments, $comment-&gt;id);
        }
    }
    return;
}
showComments($comments, 0);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="php hljs"><code class="PHP"><span class="hljs-meta">&lt;?php</span>
$dsn = <span class="hljs-string">&quot;mysql:host=127.0.0.1;port=3306;dbname=light-tips;charset=UTF8;&quot;</span>;
$username = <span class="hljs-string">&apos;root&apos;</span>;
$password = <span class="hljs-string">&apos;admin&apos;</span>;
$pdo = <span class="hljs-keyword">new</span> PDO($dsn, $username, $password);
$sql = <span class="hljs-string">&apos;SELECT * FROM `comments` WHERE `postID` = :id ORDER BY `parentId`, `datetime`&apos;</span>;
$stmt = $pdo-&gt;prepare($sql);
$stmt-&gt;setFetchMode(PDO::FETCH_OBJ);
$stmt-&gt;execute([<span class="hljs-string">&apos;:id&apos;</span> =&gt; <span class="hljs-number">1</span>]);
$result = $stmt-&gt;fetchAll();
$comments = [];
<span class="hljs-keyword">foreach</span> ($result <span class="hljs-keyword">as</span> $comment) {
    $comments[$comment-&gt;parentID][] = $comment;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showComments</span><span class="hljs-params">(array $comments, $n)</span>
</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">isset</span>($comments[$n])) {
        <span class="hljs-keyword">foreach</span> ($comments[$n] <span class="hljs-keyword">as</span> $comment) {
            <span class="hljs-keyword">echo</span> str_repeat(<span class="hljs-string">&apos;-&apos;</span>, $n) . $comment-&gt;comment . PHP_EOL;
            showComments($comments, $comment-&gt;id);
        }
    }
    <span class="hljs-keyword">return</span>;
}
showComments($comments, <span class="hljs-number">0</span>);</code></pre><h4>&#x6587;&#x4EF6;&#x626B;&#x63CF;</h4><p>&#x4F7F;&#x7528;&#x9012;&#x5F52;&#x8FDB;&#x884C;&#x76EE;&#x5F55;&#x6587;&#x4EF6;&#x7684;&#x626B;&#x63CF;&#x7684;&#x6817;&#x5B50;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;?php
function showFiles(string $dir, array &amp;$allFiles)
{
    $files = scandir($dir);
    foreach ($files as $key =&gt; $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            $allFiles[] = $path;
        } else if ($value != &quot;.&quot; &amp;&amp; $value != &quot;..&quot;) {
            showFiles($path, $allFiles);
            $allFiles[] = $path;
        }
    }
    return;
}
$files = [];
showFiles(&apos;.&apos;, $files);
foreach ($files as $file) {
    echo $file . PHP_EOL;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="php hljs"><code class="PHP"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showFiles</span><span class="hljs-params">(string $dir, array &amp;$allFiles)</span>
</span>{
    $files = scandir($dir);
    <span class="hljs-keyword">foreach</span> ($files <span class="hljs-keyword">as</span> $key =&gt; $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        <span class="hljs-keyword">if</span> (!is_dir($path)) {
            $allFiles[] = $path;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ($value != <span class="hljs-string">&quot;.&quot;</span> &amp;&amp; $value != <span class="hljs-string">&quot;..&quot;</span>) {
            showFiles($path, $allFiles);
            $allFiles[] = $path;
        }
    }
    <span class="hljs-keyword">return</span>;
}
$files = [];
showFiles(<span class="hljs-string">&apos;.&apos;</span>, $files);
<span class="hljs-keyword">foreach</span> ($files <span class="hljs-keyword">as</span> $file) {
    <span class="hljs-keyword">echo</span> $file . PHP_EOL;
}</code></pre><h4>&#x66F4;&#x591A;&#x5185;&#x5BB9;</h4><p>PHP&#x57FA;&#x7840;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x4E13;&#x9898;&#x7CFB;&#x5217;&#x76EE;&#x5F55;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/xx19941215/light-tips" rel="nofollow noreferrer" target="_blank">&#x5730;&#x5740;</a> &#x4E3B;&#x8981;&#x4F7F;&#x7528;PHP&#x8BED;&#x6CD5;&#x603B;&#x7ED3;&#x57FA;&#x7840;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x548C;&#x7B97;&#x6CD5;&#x3002;&#x8FD8;&#x6709;&#x6211;&#x4EEC;&#x65E5;&#x5E38;PHP&#x5F00;&#x53D1;&#x4E2D;&#x5BB9;&#x6613;&#x5FFD;&#x7565;&#x7684;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#x548C;&#x73B0;&#x4EE3;PHP&#x5F00;&#x53D1;&#x4E2D;&#x5173;&#x4E8E;&#x89C4;&#x8303;&#x3001;&#x90E8;&#x7F72;&#x3001;&#x4F18;&#x5316;&#x7684;&#x4E00;&#x4E9B;&#x5B9E;&#x6218;&#x6027;&#x5EFA;&#x8BAE;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x6709;&#x5BF9;Javascript&#x8BED;&#x8A00;&#x7279;&#x70B9;&#x7684;&#x6DF1;&#x5165;&#x7814;&#x7A76;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PHP中的无限级分类、无限嵌套评论

## 原文链接
[https://segmentfault.com/a/1190000015555742](https://segmentfault.com/a/1190000015555742)

