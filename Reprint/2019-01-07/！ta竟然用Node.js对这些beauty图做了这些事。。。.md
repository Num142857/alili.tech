---
title: '！ta竟然用Node.js对这些beauty图做了这些事。。。' 
date: 2019-01-07 2:30:11
hidden: true
slug: mjkudrqaglo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">做了什么</h2>
<p>一个用于爬取<a>www.nvshens.com</a>上妹子图片的爬虫。如有侵权，马上关闭<br><span class="img-wrap"><img data-src="/img/bVRkLK?w=1366&amp;h=727" src="https://static.alili.tech/img/bVRkLK?w=1366&amp;h=727" alt="爬虫" title="爬虫" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">原因</h2>
<p>一张张下实在太麻烦了<br><span class="img-wrap"><img data-src="/img/bVRkMe?w=1366&amp;h=768" src="https://static.alili.tech/img/bVRkMe?w=1366&amp;h=768" alt="爬虫结果" title="爬虫结果" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">如何使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0. node -v >= 7.6
1. git clone https://github.com/laihaibo/beauty-spider.git
2. npm i
3. npm run start (爬取相册图片链接，并保存为json)
4. npm run calc (获取爬取的相册数和文件数)
5. npm run download (下载图片文件)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-number">0</span>. <span class="hljs-keyword">node</span> <span class="hljs-title">-v</span> &gt;= <span class="hljs-number">7.6</span>
<span class="hljs-number">1</span>. git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/laihaibo/beauty-spider.git
<span class="hljs-number">2</span>. npm i
<span class="hljs-number">3</span>. npm run <span class="hljs-literal">start</span> (爬取相册图片链接，并保存为json)
<span class="hljs-number">4</span>. npm run calc (获取爬取的相册数和文件数)
<span class="hljs-number">5</span>. npm run download (下载图片文件)</code></pre>
<h2 id="articleHeader3">update</h2>
<h3 id="articleHeader4">against反爬虫</h3>
<p>图片下载完之后会发现变成了盗链图片。于是观察浏览器正常浏览行为。在请求头中设置<code>referer</code>, <code>accept</code>和<code>user-agent</code>。解决该问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request.get(url).set({
        'Referer': 'https://www.google.com',
        'Accept': 'image/webp,image/*,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3091.0 Safari/537.36'
      }).end((err, res) => {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>request.get(url).set({
        <span class="hljs-string">'Referer'</span>: <span class="hljs-string">'https://www.google.com'</span>,
        <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'image/webp,image/*,*/*;q=0.8'</span>,
        <span class="hljs-string">'User-Agent'</span>: <span class="hljs-string">'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3091.0 Safari/537.36'</span>
      }).end(<span class="hljs-function"><span class="hljs-params">(err, res)</span> =&gt;</span> {})</code></pre>
<h3 id="articleHeader5">断线继续下载</h3>
<p>图片下载700个文件时，经常断线。应该是网站的饭爬虫机制起了作用，暂时无法解决。重新下载时理应跳过已经下载的文件。于是在保存图片时会先判断图片是否存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let isExit = fs.existsSync(path);
if (!isExit) {
  saveOne(...args)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">let</span> isExit = fs.existsSync(path);
<span class="hljs-keyword">if</span> (!isExit) {
  saveOne(...args)
}</code></pre>
<h3 id="articleHeader6">获取理应下载的相册数和文件数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = JSON.parse(fs.readFileSync(path));

let count = data.reduce((prev, cur) => prev + cur.imgList.length, 0);

console.log(`共${data.length}个相册，共${count}张图片`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">let</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = <span class="hljs-type">JSON</span>.parse(<span class="hljs-title">fs</span>.<span class="hljs-title">readFileSync</span>(<span class="hljs-title">path</span>));</span>

<span class="hljs-title">let</span> count = <span class="hljs-class"><span class="hljs-keyword">data</span>.reduce((<span class="hljs-title">prev</span>, <span class="hljs-title">cur</span>) =&gt; prev + cur.imgList.length, 0);</span>

<span class="hljs-title">console</span>.log(`共${<span class="hljs-class"><span class="hljs-keyword">data</span>.length}个相册，共${<span class="hljs-title">count</span>}张图片`);</span></code></pre>
<h2 id="articleHeader7">步骤</h2>
<ol>
<li>
<p>引入所需的库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&quot;fs&quot;);
const mkdirp = require('mkdirp');
const cheerio = require('cheerio');
const request = require('superagent');
require('superagent-charset')(request);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">const</span> mkdirp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mkdirp'</span>);
<span class="hljs-keyword">const</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cheerio'</span>);
<span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'superagent'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'superagent-charset'</span>)(request);</code></pre>
</li>
<li>
<p>页面分析，配置config文件   <br>分析相册地址，以<code>韩国</code>这个标签为例，首页为<code>https://www.nvshens.com/gallery/hanguo/</code>,    第二页为<code>https://www.nvshens.com/gallery/hanguo/2.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = {
  current: 'hanguo',
  allTags: {
    rougan: `https://www.nvshens.com/gallery/rougan/`,
    hanguo: 'https://www.nvshens.com/gallery/hanguo/'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const config = {
  curren<span class="hljs-variable">t:</span> <span class="hljs-string">'hanguo'</span>,
  allTag<span class="hljs-variable">s:</span> {
    rougan: `http<span class="hljs-variable">s:</span>//www.nvshens.<span class="hljs-keyword">com</span>/gallery/rougan/`,
    hanguo: <span class="hljs-string">'https://www.nvshens.com/gallery/hanguo/'</span>
  }
}</code></pre>
</li>
<li>
<p>封装获取指定url的html内容函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//该网站编码为utf-8
const getHtml = url => {
  return new Promise((resolve, reject) => {
    request.get(url).charset('utf-8').end((err, res) => {
      err ? reject(err) : resolve(cheerio.load(res.text));
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//该网站编码为utf-8</span>
<span class="hljs-keyword">const</span> getHtml = <span class="hljs-function"><span class="hljs-params">url</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    request.get(url).charset(<span class="hljs-string">'utf-8'</span>).end(<span class="hljs-function">(<span class="hljs-params">err, res</span>) =&gt;</span> {
      err ? reject(err) : resolve(cheerio.load(res.text));
    })
  })
}</code></pre>
</li>
<li>
<p>获取本分类下所有相册的标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} startUrl 标签首页的url地址
 */
const getAlbums = (startUrl) => {
  return new Promise((resolve, reject) => {
    let albums = [];  // 用于保存该标签的所有相册信息

    let getQuery = async startUrl => {
      try {
        let $ = await getHtml(startUrl);
        let pages = $('#listdiv .pagesYY a').length;  // 获取页数

        for (let i = 1; i <= pages; i++) {
          let pageUrl = `${startUrl + i}.html`  // 设置每页的url
          let $ = await getHtml(pageUrl);

          // 动态设置pages的值
          let compare = $('#listdiv .pagesYY a').map(function (i, el) {
            return parseInt($(this).text(), 0);
          }).get().filter(x => x > 0);
          pages = conmpare.length < 2 ? pages : compare.reduce((prev, cur) => Math.max(prev, cur));

          $('.galleryli_title a').each(function () {
            albums.push({
              title: $(this).text(),
              url: `https://www.nvshens.com${$(this).attr(&quot;href&quot;)}`,
              imgList: [],
              id: parseInt($(this).attr(&quot;href&quot;).split('/')[2], 10)
            })
          })
        }

        resolve(albums);  // 返回相册信息
      } catch (error) {
        console.log(error);
      }
    }

    getQuery(startUrl);
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @param {string} startUrl 标签首页的url地址
 */</span>
<span class="hljs-keyword">const</span> getAlbums = <span class="hljs-function">(<span class="hljs-params">startUrl</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> albums = [];  <span class="hljs-comment">// 用于保存该标签的所有相册信息</span>

    <span class="hljs-keyword">let</span> getQuery = <span class="hljs-keyword">async</span> startUrl =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> $ = <span class="hljs-keyword">await</span> getHtml(startUrl);
        <span class="hljs-keyword">let</span> pages = $(<span class="hljs-string">'#listdiv .pagesYY a'</span>).length;  <span class="hljs-comment">// 获取页数</span>

        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt;= pages; i++) {
          <span class="hljs-keyword">let</span> pageUrl = <span class="hljs-string">`<span class="hljs-subst">${startUrl + i}</span>.html`</span>  <span class="hljs-comment">// 设置每页的url</span>
          <span class="hljs-keyword">let</span> $ = <span class="hljs-keyword">await</span> getHtml(pageUrl);

          <span class="hljs-comment">// 动态设置pages的值</span>
          <span class="hljs-keyword">let</span> compare = $(<span class="hljs-string">'#listdiv .pagesYY a'</span>).map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i, el</span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>($(<span class="hljs-keyword">this</span>).text(), <span class="hljs-number">0</span>);
          }).get().filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x &gt; <span class="hljs-number">0</span>);
          pages = conmpare.length &lt; <span class="hljs-number">2</span> ? pages : compare.reduce(<span class="hljs-function">(<span class="hljs-params">prev, cur</span>) =&gt;</span> <span class="hljs-built_in">Math</span>.max(prev, cur));

          $(<span class="hljs-string">'.galleryli_title a'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            albums.push({
              <span class="hljs-attr">title</span>: $(<span class="hljs-keyword">this</span>).text(),
              <span class="hljs-attr">url</span>: <span class="hljs-string">`https://www.nvshens.com<span class="hljs-subst">${$(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"href"</span>)}</span>`</span>,
              <span class="hljs-attr">imgList</span>: [],
              <span class="hljs-attr">id</span>: <span class="hljs-built_in">parseInt</span>($(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">"href"</span>).split(<span class="hljs-string">'/'</span>)[<span class="hljs-number">2</span>], <span class="hljs-number">10</span>)
            })
          })
        }

        resolve(albums);  <span class="hljs-comment">// 返回相册信息</span>
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">console</span>.log(error);
      }
    }

    getQuery(startUrl);
  })
}</code></pre>
</li>
<li>
<p>获取所有相册的图片信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} startUrl 该相册首页的url地址
 */
const getImgList = (startUrl) => {
  return new Promise((resolve, reject) => {
    let albums = [];  // 存储本相册的所有图片信息

    let getQuery = async startUrl => {
      try {
        let $ = await getHtml(startUrl);
        let pages = $('#pages a').length;

        for (let i = 1; i <= pages; i++) {
          let pageUrl = `${startUrl + i}.html`
          let $ = await getHtml(pageUrl);

          $('#hgallery img').each(function () {

            let url = $(this).attr('src');  //图片地址
            let fileName = url.split('/').pop();  //文件名
            let id = parseInt(fileName.split('.')[0], 10); //id

            albums.push({
              url,
              fileName,
              id
            })
          })
        }

        resolve(albums); // 返回本相册的所有图片信息
      } catch (error) {
        console.log(error);
      }
    }

    getQuery(startUrl);
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @param {string} startUrl 该相册首页的url地址
 */</span>
<span class="hljs-keyword">const</span> getImgList = <span class="hljs-function">(<span class="hljs-params">startUrl</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> albums = [];  <span class="hljs-comment">// 存储本相册的所有图片信息</span>

    <span class="hljs-keyword">let</span> getQuery = <span class="hljs-keyword">async</span> startUrl =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> $ = <span class="hljs-keyword">await</span> getHtml(startUrl);
        <span class="hljs-keyword">let</span> pages = $(<span class="hljs-string">'#pages a'</span>).length;

        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt;= pages; i++) {
          <span class="hljs-keyword">let</span> pageUrl = <span class="hljs-string">`<span class="hljs-subst">${startUrl + i}</span>.html`</span>
          <span class="hljs-keyword">let</span> $ = <span class="hljs-keyword">await</span> getHtml(pageUrl);

          $(<span class="hljs-string">'#hgallery img'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

            <span class="hljs-keyword">let</span> url = $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">'src'</span>);  <span class="hljs-comment">//图片地址</span>
            <span class="hljs-keyword">let</span> fileName = url.split(<span class="hljs-string">'/'</span>).pop();  <span class="hljs-comment">//文件名</span>
            <span class="hljs-keyword">let</span> id = <span class="hljs-built_in">parseInt</span>(fileName.split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">0</span>], <span class="hljs-number">10</span>); <span class="hljs-comment">//id</span>

            albums.push({
              url,
              fileName,
              id
            })
          })
        }

        resolve(albums); <span class="hljs-comment">// 返回本相册的所有图片信息</span>
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-built_in">console</span>.log(error);
      }
    }

    getQuery(startUrl);
  })
}</code></pre>
</li>
<li>
<p>保存相册信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {string} path 保存数据的路径
 * @param {array} albums 相册信息数组
 */
const saveData = (path, albums) => {
    fs.writeFile(path, JSON.stringify(albums, null, ' '), function (err) {
        err ? console.log(err) : console.log('Data saved');
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @param {string} path 保存数据的路径
 * @param {array} albums 相册信息数组
 */</span>
<span class="hljs-keyword">const</span> saveData = <span class="hljs-function">(<span class="hljs-params">path, albums</span>) =&gt;</span> {
    fs.writeFile(path, <span class="hljs-built_in">JSON</span>.stringify(albums, <span class="hljs-literal">null</span>, <span class="hljs-string">' '</span>), <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
        err ? <span class="hljs-built_in">console</span>.log(err) : <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Data saved'</span>);
    });
}</code></pre>
</li>
<li>
<p>保存图片</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 12. @param {string} title 图片所在文件夹名
 13. @param {string} url 图片url
 14. @param {string} fileName 图片名
 15. @param {array} imgList 单个相册的图片信息
 */
// 保存一张图片
const saveOne = (title, url, fileName) => {
  return new Promise((resolve, reject) => {
    let path = `./img/${currentImgType}/${title}/${fileName}`;
    request.get(url).end((err, res) => {
      if (err) {
        console.log(`Error: ${err} in getting ${url}`)
      }
      fs.writeFile(path, res.body, function (err) {
        if (err) console.log(`Error: ${err} in downloading ${url}`)
      });
      resolve();
    })
  })
}

//保存一个相册下的多张图片
const saveImg = ({title,imgList}) => {
  // 创建文件夹
  mkdirp(`./img/${currentImgType}/${title}`, function (err) {
    if (err) {
      console.log(`Error: ${err} in makedir ${title}`);
    }
  });

  let getQuery = async() => {
    try {
      for (let {url,fileName} of imgList) {
        await saveOne(title, url, fileName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 打印下载一个相册所需时间
  console.time(`download ${title}...`)
  getQuery();
  console.timeEnd(`download ${title}...`)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 12. @param {string} title 图片所在文件夹名
 13. @param {string} url 图片url
 14. @param {string} fileName 图片名
 15. @param {array} imgList 单个相册的图片信息
 */</span>
<span class="hljs-comment">// 保存一张图片</span>
<span class="hljs-keyword">const</span> saveOne = <span class="hljs-function">(<span class="hljs-params">title, url, fileName</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> path = <span class="hljs-string">`./img/<span class="hljs-subst">${currentImgType}</span>/<span class="hljs-subst">${title}</span>/<span class="hljs-subst">${fileName}</span>`</span>;
    request.get(url).end(<span class="hljs-function">(<span class="hljs-params">err, res</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Error: <span class="hljs-subst">${err}</span> in getting <span class="hljs-subst">${url}</span>`</span>)
      }
      fs.writeFile(path, res.body, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
        <span class="hljs-keyword">if</span> (err) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Error: <span class="hljs-subst">${err}</span> in downloading <span class="hljs-subst">${url}</span>`</span>)
      });
      resolve();
    })
  })
}

<span class="hljs-comment">//保存一个相册下的多张图片</span>
<span class="hljs-keyword">const</span> saveImg = <span class="hljs-function">(<span class="hljs-params">{title,imgList}</span>) =&gt;</span> {
  <span class="hljs-comment">// 创建文件夹</span>
  mkdirp(<span class="hljs-string">`./img/<span class="hljs-subst">${currentImgType}</span>/<span class="hljs-subst">${title}</span>`</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Error: <span class="hljs-subst">${err}</span> in makedir <span class="hljs-subst">${title}</span>`</span>);
    }
  });

  <span class="hljs-keyword">let</span> getQuery = <span class="hljs-keyword">async</span>() =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> {url,fileName} <span class="hljs-keyword">of</span> imgList) {
        <span class="hljs-keyword">await</span> saveOne(title, url, fileName);
      }
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-built_in">console</span>.log(error);
    }
  }

  <span class="hljs-comment">// 打印下载一个相册所需时间</span>
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">`download <span class="hljs-subst">${title}</span>...`</span>)
  getQuery();
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">`download <span class="hljs-subst">${title}</span>...`</span>)
}</code></pre>
</li>
<li>
<p>执行爬虫</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const doSpider = async() => {
  try {
    // 获取相册信息
    let albums = await getAlbums(allTags[current]);

    // 获取每张图片信息
    for (let album of albums) {
      let imgList = await getImgList(album.url);
      album.imgList = imgList;
    }

    // 保存json
    let jsonPath = `./data`;
    mkdirp(jsonPath, function (err) {
      if (err) {
        console.log(`Error: ${err} in makedir of Json`);
      }
    });
    saveData(`${jsonPath}/${currentImgType}.json`, albums);

    // 保存图片
    for (let value of albums) {
      saveImg(value)
    }

  } catch (error) {
    console.log(error);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> doSpider = <span class="hljs-keyword">async</span>() =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 获取相册信息</span>
    <span class="hljs-keyword">let</span> albums = <span class="hljs-keyword">await</span> getAlbums(allTags[current]);

    <span class="hljs-comment">// 获取每张图片信息</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> album <span class="hljs-keyword">of</span> albums) {
      <span class="hljs-keyword">let</span> imgList = <span class="hljs-keyword">await</span> getImgList(album.url);
      album.imgList = imgList;
    }

    <span class="hljs-comment">// 保存json</span>
    <span class="hljs-keyword">let</span> jsonPath = <span class="hljs-string">`./data`</span>;
    mkdirp(jsonPath, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
      <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Error: <span class="hljs-subst">${err}</span> in makedir of Json`</span>);
      }
    });
    saveData(<span class="hljs-string">`<span class="hljs-subst">${jsonPath}</span>/<span class="hljs-subst">${currentImgType}</span>.json`</span>, albums);

    <span class="hljs-comment">// 保存图片</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> albums) {
      saveImg(value)
    }

  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-built_in">console</span>.log(error);
  }
}</code></pre>
</li>
</ol>
<h2 id="articleHeader8">心得体会</h2>
<ol>
<li><p>有些坑如果不踩过一遍是不会吐血的，比如cheerio的操作和fs的操作</p></li>
<li><p>just do it</p></li>
</ol>
<h2 id="articleHeader9">感谢</h2>
<p>本文有参考<code>nieheyong</code>的<a href="https://github.com/nieheyong/HanhandeSpider" rel="nofollow noreferrer" target="_blank">HanhandeSpider</a>和其他的爬虫文章，得到很多启发</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
！ta竟然用Node.js对这些beauty图做了这些事。。。

## 原文链接
[https://segmentfault.com/a/1190000010289099](https://segmentfault.com/a/1190000010289099)

