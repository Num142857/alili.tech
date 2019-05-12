---
title: 'NodeJs爬虫抓取古代典籍，共计16000个页面心得体会总结及项目分享' 
date: 2018-12-20 2:30:10
hidden: true
slug: ei5zzughtel
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>之前研究数据，零零散散的写过一些数据抓取的爬虫，不过写的比较随意。有很多地方现在看起来并不是很合理 这段时间比较闲，本来是想给之前的项目做重构的。<br>后来 利用这个周末，索性重新写了一个项目，就是本项目 guwen-spider。目前这个爬虫还是比较简单的类型的， 直接抓取页面，然后在页面中提取数据，保存数据到数据库。<br>通过与之前写的对比，我觉得难点在于整个程序的健壮性，以及相应的容错机制。在昨天写代码的过程中其实也有反映， 真正的主体代码其实很快就写完了 ，花了大部分时间是在<br>做稳定性的调试， 以及寻求一种更合理的方式来处理数据与流程控制的关系。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012561778?w=1200&amp;h=498" src="https://static.alili.tech/img/remote/1460000012561778?w=1200&amp;h=498" alt="spider-shortcut1.png" title="spider-shortcut1.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">背景</h3>
<p>项目的背景是抓取一个一级页面是目录列表 ，点击一个目录进去 是一个章节 及篇幅列表 ，点击章节或篇幅进入具体的内容页面。</p>
<h3 id="articleHeader2">概述</h3>
<p>本项目github地址 : <a href="https://github.com/yangfan0095/guwen-spider" rel="nofollow noreferrer" target="_blank">guwen-spider</a>  （PS:最后面还有彩蛋 ~~逃</p>
<p><strong>项目技术细节</strong><br>   项目大量用到了 ES7 的async 函数, 更直观的反应程序了的流程。为了方便，在对数据遍历的过程中直接使用了著名的async这个库，所以不可避免的还是用到了回调promise ，因为数据的处理发生在回调函数中，不可避免的会遇到一些数据传递的问题，其实也可以直接用ES7的async await 写一个方法来实现相同的功能。这里其实最赞的一个地方是使用了 Class 的 static 方法封装对数据库的操作， static 顾名思义 静态方法 就跟 prototype 一样 ，不会占用额外空间。<br>项目主要用到了</p>
<ul>
<li>1 ES7的 async await 协程做异步有关的逻辑处理。</li>
<li>2 使用 npm的 async库 来做循环遍历，以及并发请求操作。</li>
<li>3 使用 log4js 来做日志处理</li>
<li>4 使用 cheerio 来处理dom的操作。</li>
<li>5 使用 mongoose 来连接mongoDB 做数据的保存以及操作。</li>
</ul>
<p><strong>目录结构</strong></p>
<p>&lt;pre&gt;<br>├── bin              // 入口<br>│&nbsp;  ├── booklist.js         // 抓取书籍逻辑<br>│&nbsp;  ├── chapterlist.js      // 抓取章节逻辑<br>│&nbsp;  ├── content.js          // 抓取内容逻辑<br>│&nbsp;  └── index.js            // 程序入口<br>├── config             // 配置文件<br>├── dbhelper           // 数据库操作方法目录<br>├── logs             // 项目日志目录<br>├── model         // mongoDB 集合操作实例<br>├── node_modules         <br>├── utils         // 工具函数<br>├── package.json       <br>&lt;/pre&gt;</p>
<p><strong>项目实现方案分析</strong></p>
<p>项目是一个典型的多级抓取案例，目前只有三级，即 书籍列表， 书籍项对应的 章节列表，一个章节链接对应的内容。 抓取这样的结构可以采用两种方式， 一是 直接从外层到内层 内层抓取完以后再执行下一个外层的抓取， 还有一种就是先把外层抓取完成保存到数据库，然后根据外层抓取到所有内层章节的链接，再次保存，然后从数据库查询到对应的链接单元 对之进行内容抓取。这两种方案各有利弊，其实两种方式我都试过， 后者有一个好处，因为对三个层级是分开抓取的， 这样就能够更方便，尽可能多的保存到对应章节的相关数据。 可以试想一下 ，如果采用前者 按照正常的逻辑<br>对一级目录进行遍历抓取到对应的二级章节目录， 再对章节列表进行遍历 抓取内容，到第三级 内容单元抓取完成 需要保存时，如果需要很多的一级目录信息，就需要 这些分层的数据之间进行数据传递 ，想想其实应该是比较复杂的一件事情。所以分开保存数据 一定程度上避开了不必要的复杂的数据传递。</p>
<p>目前我们考虑到 其实我们要抓取到的古文书籍数量并不多，古文书籍大概只有180本囊括了各种经史。其和章节内容本身是一个很小的数据 ，即一个集合里面有180个文档记录。 这180本书所有章节抓取下来一共有一万六千个章节，对应需要访问一万六千个页面爬取到对应的内容。所以选择第二种应该是合理的。</p>
<p><strong>项目实现</strong></p>
<p>主程有三个方法 bookListInit ,chapterListInit,contentListInit, 分别是抓取书籍目录，章节列表，书籍内容的方法对外公开暴露的初始化方法。通过async 可以实现对这三个方法的运行流程进行控制，书籍目录抓取完成将数据保存到数据库，然后执行结果返回到主程序，如果运行成功 主程序则执行根据书籍列表对章节列表的抓取，同理对书籍内容进行抓取。 </p>
<p><strong>项目主入口</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 爬虫抓取主入口
 */
const start = async() => {
    let booklistRes = await bookListInit();
    if (!booklistRes) {
        logger.warn('书籍列表抓取出错，程序终止...');
        return;
    }
    logger.info('书籍列表抓取成功，现在进行书籍章节抓取...');

    let chapterlistRes = await chapterListInit();
    if (!chapterlistRes) {
        logger.warn('书籍章节列表抓取出错，程序终止...');
        return;
    }
    logger.info('书籍章节列表抓取成功，现在进行书籍内容抓取...');

    let contentListRes = await contentListInit();
    if (!contentListRes) {
        logger.warn('书籍章节内容抓取出错，程序终止...');
        return;
    }
    logger.info('书籍内容抓取成功');
}
// 开始入口
if (typeof bookListInit === 'function' &amp;&amp; typeof chapterListInit === 'function') {
    // 开始抓取
    start();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">/**
 * 爬虫抓取主入口
 */</span>
<span class="hljs-keyword">const</span> start = <span class="hljs-keyword">async</span>() =&gt; {
    <span class="hljs-keyword">let</span> booklistRes = <span class="hljs-keyword">await</span> bookListInit();
    <span class="hljs-keyword">if</span> (!booklistRes) {
        logger.warn(<span class="hljs-string">'书籍列表抓取出错，程序终止...'</span>);
        <span class="hljs-keyword">return</span>;
    }
    logger.info(<span class="hljs-string">'书籍列表抓取成功，现在进行书籍章节抓取...'</span>);

    <span class="hljs-keyword">let</span> chapterlistRes = <span class="hljs-keyword">await</span> chapterListInit();
    <span class="hljs-keyword">if</span> (!chapterlistRes) {
        logger.warn(<span class="hljs-string">'书籍章节列表抓取出错，程序终止...'</span>);
        <span class="hljs-keyword">return</span>;
    }
    logger.info(<span class="hljs-string">'书籍章节列表抓取成功，现在进行书籍内容抓取...'</span>);

    <span class="hljs-keyword">let</span> contentListRes = <span class="hljs-keyword">await</span> contentListInit();
    <span class="hljs-keyword">if</span> (!contentListRes) {
        logger.warn(<span class="hljs-string">'书籍章节内容抓取出错，程序终止...'</span>);
        <span class="hljs-keyword">return</span>;
    }
    logger.info(<span class="hljs-string">'书籍内容抓取成功'</span>);
}
<span class="hljs-comment">// 开始入口</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> bookListInit === <span class="hljs-string">'function'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> chapterListInit === <span class="hljs-string">'function'</span>) {
    <span class="hljs-comment">// 开始抓取</span>
    start();
}
</code></pre>
<p>引入的 bookListInit ,chapterListInit,contentListInit,  三个方法</p>
<p>booklist.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 初始化方法 返回抓取结果 true 抓取成果 false 抓取失败
 */
const bookListInit = async() => {
    logger.info('抓取书籍列表开始...');
    const pageUrlList = getPageUrlList(totalListPage, baseUrl);
    let res = await getBookList(pageUrlList);
    return res;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">/**
 * 初始化方法 返回抓取结果 true 抓取成果 false 抓取失败
 */</span>
<span class="hljs-keyword">const</span> bookListInit = <span class="hljs-keyword">async</span>() =&gt; {
    logger.info(<span class="hljs-string">'抓取书籍列表开始...'</span>);
    <span class="hljs-keyword">const</span> pageUrlList = getPageUrlList(totalListPage, baseUrl);
    <span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> getBookList(pageUrlList);
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
<p>chapterlist.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 初始化入口
 */
const chapterListInit = async() => {
    const list = await bookHelper.getBookList(bookListModel);
    if (!list) {
        logger.error('初始化查询书籍目录失败');
    }
    logger.info('开始抓取书籍章节列表，书籍目录共：' + list.length + '条');
    let res = await asyncGetChapter(list);
    return res;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/**
 * 初始化入口
 */</span>
<span class="hljs-keyword">const</span> chapterListInit = <span class="hljs-keyword">async</span>() =&gt; {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">list</span> = <span class="hljs-keyword">await</span> bookHelper.getBookList(bookListModel);
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">list</span>) {
        logger.error(<span class="hljs-string">'初始化查询书籍目录失败'</span>);
    }
    logger.info(<span class="hljs-string">'开始抓取书籍章节列表，书籍目录共：'</span> + <span class="hljs-built_in">list</span>.length + <span class="hljs-string">'条'</span>);
    <span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> asyncGetChapter(<span class="hljs-built_in">list</span>);
    <span class="hljs-keyword">return</span> res;
};</code></pre>
<p>content.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 初始化入口
 */
const contentListInit = async() => {
    //获取书籍列表
    const list = await bookHelper.getBookLi(bookListModel);
    if (!list) {
        logger.error('初始化查询书籍目录失败');
        return;
    }
    const res = await mapBookList(list);
    if (!res) {
        logger.error('抓取章节信息，调用 getCurBookSectionList() 进行串行遍历操作，执行完成回调出错，错误信息已打印，请查看日志!');
        return;
    }
    return res;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/**
 * 初始化入口
 */</span>
<span class="hljs-keyword">const</span> contentListInit = <span class="hljs-keyword">async</span>() =&gt; {
    <span class="hljs-comment">//获取书籍列表</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">list</span> = <span class="hljs-keyword">await</span> bookHelper.getBookLi(bookListModel);
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">list</span>) {
        logger.error(<span class="hljs-string">'初始化查询书籍目录失败'</span>);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> mapBookList(<span class="hljs-built_in">list</span>);
    <span class="hljs-keyword">if</span> (!res) {
        logger.error(<span class="hljs-string">'抓取章节信息，调用 getCurBookSectionList() 进行串行遍历操作，执行完成回调出错，错误信息已打印，请查看日志!'</span>);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
<p><strong>内容抓取的思考</strong></p>
<p>书籍目录抓取其实逻辑非常简单，只需要使用async.mapLimit做一个遍历就可以保存数据了,但是我们在保存内容的时候 简化的逻辑其实就是 遍历章节列表 抓取链接里的内容。但是实际的情况是链接数量多达几万 我们从内存占用角度也不能全部保存到一个数组中，然后对其遍历，所以我们需要对内容抓取进行单元化。<br>普遍的遍历方式 是每次查询一定的数量，来做抓取，这样缺点是只是以一定数量做分类，数据之间没有关联，以批量方式进行插入，如果出错 则容错会有一些小问题，而且我们想一本书作为一个集合单独保存会遇到问题。因此我们采用第二种就是以一个书籍单元进行内容抓取和保存。<br>这里使用了 <code>async.mapLimit(list, 1, (series, callback) =&gt; {})</code>这个方法来进行遍历，不可避免的用到了回调，感觉很恶心。async.mapLimit()的第二个参数可以设置同时请求数量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /* 
 * 内容抓取步骤：
 * 第一步得到书籍列表， 通过书籍列表查到一条书籍记录下 对应的所有章节列表， 
 * 第二步 对章节列表进行遍历获取内容保存到数据库中 
 * 第三步 保存完数据后 回到第一步 进行下一步书籍的内容抓取和保存
 */

/**
 * 初始化入口
 */
const contentListInit = async() => {
    //获取书籍列表
    const list = await bookHelper.getBookList(bookListModel);
    if (!list) {
        logger.error('初始化查询书籍目录失败');
        return;
    }
    const res = await mapBookList(list);
    if (!res) {
        logger.error('抓取章节信息，调用 getCurBookSectionList() 进行串行遍历操作，执行完成回调出错，错误信息已打印，请查看日志!');
        return;
    }
    return res;
}
/**
 * 遍历书籍目录下的章节列表
 * @param {*} list 
 */
const mapBookList = (list) => {
    return new Promise((resolve, reject) => {
        async.mapLimit(list, 1, (series, callback) => {
            let doc = series._doc;
            getCurBookSectionList(doc, callback);
        }, (err, result) => {
            if (err) {
                logger.error('书籍目录抓取异步执行出错!');
                logger.error(err);
                reject(false);
                return;
            }
            resolve(true);
        })
    })
}

/**
 * 获取单本书籍下章节列表 调用章节列表遍历进行抓取内容
 * @param {*} series 
 * @param {*} callback 
 */
const getCurBookSectionList = async(series, callback) => {

    let num = Math.random() * 1000 + 1000;
    await sleep(num);
    let key = series.key;
    const res = await bookHelper.querySectionList(chapterListModel, {
        key: key
    });
    if (!res) {
        logger.error('获取当前书籍: ' + series.bookName + ' 章节内容失败，进入下一部书籍内容抓取!');
        callback(null, null);
        return;
    }
    //判断当前数据是否已经存在
    const bookItemModel = getModel(key);
    const contentLength = await bookHelper.getCollectionLength(bookItemModel, {});
    if (contentLength === res.length) {
        logger.info('当前书籍：' + series.bookName + '数据库已经抓取完成，进入下一条数据任务');
        callback(null, null);
        return;
    }
    await mapSectionList(res);
    callback(null, null);
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code> <span class="hljs-comment">/* 
 * 内容抓取步骤：
 * 第一步得到书籍列表， 通过书籍列表查到一条书籍记录下 对应的所有章节列表， 
 * 第二步 对章节列表进行遍历获取内容保存到数据库中 
 * 第三步 保存完数据后 回到第一步 进行下一步书籍的内容抓取和保存
 */</span>

<span class="hljs-comment">/**
 * 初始化入口
 */</span>
<span class="hljs-keyword">const</span> contentListInit = <span class="hljs-keyword">async</span>() =&gt; {
    <span class="hljs-comment">//获取书籍列表</span>
    <span class="hljs-keyword">const</span> list = <span class="hljs-keyword">await</span> bookHelper.getBookList(bookListModel);
    <span class="hljs-keyword">if</span> (!list) {
        logger.error(<span class="hljs-string">'初始化查询书籍目录失败'</span>);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> mapBookList(list);
    <span class="hljs-keyword">if</span> (!res) {
        logger.error(<span class="hljs-string">'抓取章节信息，调用 getCurBookSectionList() 进行串行遍历操作，执行完成回调出错，错误信息已打印，请查看日志!'</span>);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">return</span> res;
}
<span class="hljs-comment">/**
 * 遍历书籍目录下的章节列表
 * @param {*} list 
 */</span>
<span class="hljs-keyword">const</span> mapBookList = <span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">async</span>.mapLimit(list, <span class="hljs-number">1</span>, <span class="hljs-function">(<span class="hljs-params">series, callback</span>) =&gt;</span> {
            <span class="hljs-keyword">let</span> doc = series._doc;
            getCurBookSectionList(doc, callback);
        }, <span class="hljs-function">(<span class="hljs-params">err, result</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) {
                logger.error(<span class="hljs-string">'书籍目录抓取异步执行出错!'</span>);
                logger.error(err);
                reject(<span class="hljs-literal">false</span>);
                <span class="hljs-keyword">return</span>;
            }
            resolve(<span class="hljs-literal">true</span>);
        })
    })
}

<span class="hljs-comment">/**
 * 获取单本书籍下章节列表 调用章节列表遍历进行抓取内容
 * @param {*} series 
 * @param {*} callback 
 */</span>
<span class="hljs-keyword">const</span> getCurBookSectionList = <span class="hljs-keyword">async</span>(series, callback) =&gt; {

    <span class="hljs-keyword">let</span> num = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1000</span> + <span class="hljs-number">1000</span>;
    <span class="hljs-keyword">await</span> sleep(num);
    <span class="hljs-keyword">let</span> key = series.key;
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> bookHelper.querySectionList(chapterListModel, {
        key: key
    });
    <span class="hljs-keyword">if</span> (!res) {
        logger.error(<span class="hljs-string">'获取当前书籍: '</span> + series.bookName + <span class="hljs-string">' 章节内容失败，进入下一部书籍内容抓取!'</span>);
        callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">//判断当前数据是否已经存在</span>
    <span class="hljs-keyword">const</span> bookItemModel = getModel(key);
    <span class="hljs-keyword">const</span> contentLength = <span class="hljs-keyword">await</span> bookHelper.getCollectionLength(bookItemModel, {});
    <span class="hljs-keyword">if</span> (contentLength === res.length) {
        logger.info(<span class="hljs-string">'当前书籍：'</span> + series.bookName + <span class="hljs-string">'数据库已经抓取完成，进入下一条数据任务'</span>);
        callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">await</span> mapSectionList(res);
    callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>);
}

</code></pre>
<p><strong>数据抓取完了 怎么保存是个问题</strong></p>
<p>这里我们通过key 来给数据做分类，每次按照key来获取链接，进行遍历，这样的好处是保存的数据是一个整体，现在思考数据保存的问题</p>
<ul>
<li>1 可以以整体的方式进行插入 <p>优点 : 速度快 数据库操作不浪费时间。 </p>
<p>缺点 : 有的书籍可能有几百个章节 也就意味着要先保存几百个页面的内容再进行插入，这样做同样很消耗内存，有可能造成程序运行不稳定。</p>
</li>
<li>2可以以每一篇文章的形式插入数据库。<p>优点 : 页面抓取即保存的方式 使得数据能够及时保存，即使后续出错也不需要重新保存前面的章节， </p>
<p>缺点 : 也很明显 就是慢 ，仔细想想如果要爬几万个页面 做 几万次*N 数据库的操作 这里还可以做一个缓存器一次性保存一定条数 当条数达到再做保存这样也是一个不错的选择。</p>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 遍历单条书籍下所有章节 调用内容抓取方法
 * @param {*} list 
 */
const mapSectionList = (list) => {
    return new Promise((resolve, reject) => {
        async.mapLimit(list, 1, (series, callback) => {
            let doc = series._doc;
            getContent(doc, callback)
        }, (err, result) => {
            if (err) {
                logger.error('书籍目录抓取异步执行出错!');
                logger.error(err);
                reject(false);
                return;
            }
            const bookName = list[0].bookName;
            const key = list[0].key;

            // 以整体为单元进行保存
            saveAllContentToDB(result, bookName, key, resolve);

            //以每篇文章作为单元进行保存
            // logger.info(bookName + '数据抓取完成，进入下一部书籍抓取函数...');
            // resolve(true);

        })
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">/**
 * 遍历单条书籍下所有章节 调用内容抓取方法
 * @param {*} list 
 */</span>
<span class="hljs-keyword">const</span> mapSectionList = <span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-keyword">async</span>.mapLimit(list, <span class="hljs-number">1</span>, <span class="hljs-function">(<span class="hljs-params">series, callback</span>) =&gt;</span> {
            <span class="hljs-keyword">let</span> doc = series._doc;
            getContent(doc, callback)
        }, <span class="hljs-function">(<span class="hljs-params">err, result</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) {
                logger.error(<span class="hljs-string">'书籍目录抓取异步执行出错!'</span>);
                logger.error(err);
                reject(<span class="hljs-literal">false</span>);
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-keyword">const</span> bookName = list[<span class="hljs-number">0</span>].bookName;
            <span class="hljs-keyword">const</span> key = list[<span class="hljs-number">0</span>].key;

            <span class="hljs-comment">// 以整体为单元进行保存</span>
            saveAllContentToDB(result, bookName, key, resolve);

            <span class="hljs-comment">//以每篇文章作为单元进行保存</span>
            <span class="hljs-comment">// logger.info(bookName + '数据抓取完成，进入下一部书籍抓取函数...');</span>
            <span class="hljs-comment">// resolve(true);</span>

        })
    })
}
</code></pre>
<p>两者各有利弊，这里我们都做了尝试。 准备了两个错误保存的集合,errContentModel, errorCollectionModel,在插入出错时 分别保存信息到对应的集合中，二者任选其一即可。增加集合来保存数据的原因是 便于一次性查看以及后续操作， 不用看日志。</p>
<p>（PS ，其实完全用 errorCollectionModel 这个集合就可以了  ，errContentModel这个集合可以完整保存章节信息）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//保存出错的数据名称
const errorSpider = mongoose.Schema({
    chapter: String,
    section: String,
    url: String,
    key: String,
    bookName: String,
    author: String,
})
// 保存出错的数据名称 只保留key 和 bookName信息
const errorCollection = mongoose.Schema({
    key: String,
    bookName: String,
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//保存出错的数据名称</span>
<span class="hljs-keyword">const</span> errorSpider = mongoose.Schema({
    chapter: <span class="hljs-keyword">String</span>,
    section: <span class="hljs-keyword">String</span>,
    url: <span class="hljs-keyword">String</span>,
    <span class="hljs-built_in">key</span>: <span class="hljs-keyword">String</span>,
    bookName: <span class="hljs-keyword">String</span>,
    author: <span class="hljs-keyword">String</span>,
})
<span class="hljs-comment">// 保存出错的数据名称 只保留key 和 bookName信息</span>
<span class="hljs-keyword">const</span> errorCollection = mongoose.Schema({
    <span class="hljs-built_in">key</span>: <span class="hljs-keyword">String</span>,
    bookName: <span class="hljs-keyword">String</span>,
})
</code></pre>
<p>我们将每一条书籍信息的内容 放到一个新的集合中，集合以key来进行命名。</p>
<h2 id="articleHeader3">总结</h2>
<p>写这个项目 其实主要的难点在于程序稳定性的控制，容错机制的设置，以及错误的记录，目前这个项目基本能够实现直接运行 一次性跑通整个流程。 但是程序设计也肯定还存在许多问题 ，欢迎指正和交流。</p>
<h2 id="articleHeader4">彩蛋</h2>
<p>写完这个项目 做了一个基于React开的前端网站用于页面浏览 和一个基于koa2.x开发的服务端, 整体技术栈相当于是 React + Redux + Koa2 ,前后端服务是分开部署的，各自独立可以更好的去除前后端服务的耦合性，比如同一套服务端代码，不仅可以给web端 还可以给 移动端 ，app 提供支持。目前整个一套还很简陋，但是可以满足基本的查询浏览功能。希望后期有时间可以把项目变得更加丰富。</p>
<ul>
<li>本项目地址  地址 : <a href="https://github.com/yangfan0095/guwen-spider" rel="nofollow noreferrer" target="_blank">guwen-spider</a>
</li>
<li>对应前端 React + Redux + semantic-ui   地址 : <a href="https://github.com/yangfan0095/guwen-react" rel="nofollow noreferrer" target="_blank">guwen-react</a>
</li>
<li>对应Node端 Koa2.2 + mongoose  地址 : <a href="https://github.com/yangfan0095/guwen-node" rel="nofollow noreferrer" target="_blank">guwen-node</a>
</li>
</ul>
<p>项目挺简单的 ，但是多了一个学习和研究 从前端到服务端的开发的环境。</p>
<p>以上です</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
NodeJs爬虫抓取古代典籍，共计16000个页面心得体会总结及项目分享

## 原文链接
[https://segmentfault.com/a/1190000012561786](https://segmentfault.com/a/1190000012561786)

