---
title: '使用nodejs自动生成前端项目组件' 
date: 2019-01-09 2:30:12
hidden: true
slug: qr7s0jig03i
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">脚本编写背景</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010109165" src="https://static.alili.tech/img/remote/1460000010109165" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>写这个小脚本的初衷是，项目本身添加一个组件太繁琐了，比如我想要去建立一个login的组件，那么我需要手动去IDE中，创建index.js(组件出口文件)，login.js(业务文件)，login.html，login.less这四个文件。因为每个组件都有一些输出的代码，还要把之前组件的那几行拷贝过来，这种作业真的烦，于是乎写了一个小脚本去自动完成这些功能。</p>
<p><strong><em>PS:本脚本运行环境是nodeV7以上，当前时间2017/07，stable版本还是V6，最新的node版本为V8.1.3（current版本），如要运行，请升级node版本为current版本。</em></strong></p>
<h2 id="articleHeader1">预期效果</h2>
<p>在命令行输入：<code>node set login</code> <br>在conponents文件夹下面自动生成4个文件，并填写index.js , login.js的文件公共内容。<br>如果输入多层文件如： <code>node set login/foo</code><br>则会先检测conponents文件夹下是否存在login，如不存在，先创建login文件夹，然后创建foo的组件。本脚本主要使用nodejs的fs模块来完成需求。</p>
<h2 id="articleHeader2">fs模块</h2>
<p>fs模块用于对系统文件及目录进行读写操作，本次主要用到的fs模块的功能有：</p>
<ol>
<li><p><strong>fs.existsSync(path)</strong> 检测文件夹是否存在，一个同步的API，只接受一个路径参数，当前版本异步的废弃了。</p></li>
<li><p><strong>fs.mkdir(path,callback)</strong> 创建文件夹，异步，两个必填参数，路径和回掉。</p></li>
<li><p><strong>fs.readFileSync(path)</strong> 读取文件，接受一个参数，文件路径。</p></li>
<li><p><strong>fs.writeFile(path,data,callback)</strong> 写文件，接受三个参数，文件路径，向文件中写的数据，回掉。</p></li>
</ol>
<h2 id="articleHeader3">代码实施</h2>
<h3 id="articleHeader4">流程图</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010109166" src="https://static.alili.tech/img/remote/1460000010109166" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function creatCpt() {
    try {
        await exists(); // 检测文件夹
        await readFile(); // 读取模板内容
        await writeFile(await readFile()); //写入组件
    }
    catch (err) {
        console.error(err);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">creatCpt</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> exists(); <span class="hljs-comment">// 检测文件夹</span>
        <span class="hljs-keyword">await</span> readFile(); <span class="hljs-comment">// 读取模板内容</span>
        <span class="hljs-keyword">await</span> writeFile(<span class="hljs-keyword">await</span> readFile()); <span class="hljs-comment">//写入组件</span>
    }
    <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-built_in">console</span>.error(err);
    }
}</code></pre>
<h3 id="articleHeader5">获取命令行参数</h3>
<p>以node set login为例，想要创建一个login文件夹，首先先要获取命令行当中的login。在nodejs当中，获取命令行参数使用<code>process.argv</code>这条命令返回一个数组，第一个参数为nodejs.exe的应用所在绝对路径，第二个参数为当前脚本所在的绝对路径，之后所输入的参数以空格分隔，如输入node set aaa,得到：<br><span class="img-wrap"><img data-src="/img/remote/1460000010109167" src="https://static.alili.tech/img/remote/1460000010109167" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">检测文件夹是否存在</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let exists = function () {
    return new Promise((res) => {
        (async function () {
            for (let a of path) {
                fs.existsSync(basepath + a) ? basepath = `${basepath}${a}/` : await mkdir(a);
            }
            res(basepath);
        })()
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> exists = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        (<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> a <span class="hljs-keyword">of</span> path) {
                fs.existsSync(basepath + a) ? basepath = <span class="hljs-string">`<span class="hljs-subst">${basepath}</span><span class="hljs-subst">${a}</span>/`</span> : <span class="hljs-keyword">await</span> mkdir(a);
            }
            res(basepath);
        })()
    })
}</code></pre>
<p>判断是否存在文件夹，如果存在，重新拼接路径继续检查，如不存在则生成文件夹。</p>
<h3 id="articleHeader7">创建文件夹</h3>
<p>node set foo/bar<br><span class="img-wrap"><img data-src="/img/remote/1460000010109168" src="https://static.alili.tech/img/remote/1460000010109168" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let mkdir = function (a) {
    return new Promise((res, rej) => {
        fs.mkdir(basepath + a, (err) => {
            if (err) rej(err);
            basepath = `${basepath}${a}/`
            res(basepath);
        });
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> mkdir = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res, rej</span>) =&gt;</span> {
        fs.mkdir(basepath + a, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (err) rej(err);
            basepath = <span class="hljs-string">`<span class="hljs-subst">${basepath}</span><span class="hljs-subst">${a}</span>/`</span>
            res(basepath);
        });
    })
}</code></pre>
<p>创建文件夹成功后，重新拼接路径，以便于继续查找。</p>
<h3 id="articleHeader8">读取模板内容</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reads = [`${basepath}cptTemp/index.js`, `${basepath}cptTemp/cptTemp.js`];//要读取的文件

let readFile = function () {
    return new Promise((res) => {
        for (let a of reads) {
            let text = fs.readFileSync(a).toString();
            text = text.replace(/time/g, moment().format('YYYY/MM/DD'))
                .replace(/temp/g, name);
            file.push(text)
        }
        res(file);
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> reads = [<span class="hljs-string">`<span class="hljs-subst">${basepath}</span>cptTemp/index.js`</span>, <span class="hljs-string">`<span class="hljs-subst">${basepath}</span>cptTemp/cptTemp.js`</span>];<span class="hljs-comment">//要读取的文件</span>

<span class="hljs-keyword">let</span> readFile = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> a <span class="hljs-keyword">of</span> reads) {
            <span class="hljs-keyword">let</span> text = fs.readFileSync(a).toString();
            text = text.replace(<span class="hljs-regexp">/time/g</span>, moment().format(<span class="hljs-string">'YYYY/MM/DD'</span>))
                .replace(<span class="hljs-regexp">/temp/g</span>, name);
            file.push(text)
        }
        res(file);
    })
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010109169" src="https://static.alili.tech/img/remote/1460000010109169" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>每个生成好的文件都需要一个创建的时间，及作者，包括文件的输出，以及class等结构，这些都是比较公用的，把他们写在模板当中，然后读取出来，替换其中的关键词，如时间，组件名等。</p>
<h3 id="articleHeader9">生成文件并写入内容</h3>
<p>提前建立好要生成的文件和要读取的文件。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let writes = [`${name}.js`, `${name}.html`, `${name}.less`, `index.js`];

let writeFile = function (file) {
    return new Promise((res, rej) => {
        (async function () {
            for (let a of writes) {
                await fs.writeFile(`${basepath}${a}`,
                    a == writes[3] ? file[0] : a == writes[0] ? file[1] : '', (err) => {
                        if (err) rej(err)
                    })
            }
            res('succ');
        })()
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> writes = [<span class="hljs-string">`<span class="hljs-subst">${name}</span>.js`</span>, <span class="hljs-string">`<span class="hljs-subst">${name}</span>.html`</span>, <span class="hljs-string">`<span class="hljs-subst">${name}</span>.less`</span>, <span class="hljs-string">`index.js`</span>];

<span class="hljs-keyword">let</span> writeFile = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">file</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res, rej</span>) =&gt;</span> {
        (<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> a <span class="hljs-keyword">of</span> writes) {
                <span class="hljs-keyword">await</span> fs.writeFile(<span class="hljs-string">`<span class="hljs-subst">${basepath}</span><span class="hljs-subst">${a}</span>`</span>,
                    a == writes[<span class="hljs-number">3</span>] ? file[<span class="hljs-number">0</span>] : a == writes[<span class="hljs-number">0</span>] ? file[<span class="hljs-number">1</span>] : <span class="hljs-string">''</span>, (err) =&gt; {
                        <span class="hljs-keyword">if</span> (err) rej(err)
                    })
            }
            res(<span class="hljs-string">'succ'</span>);
        })()
    })
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010109170" src="https://static.alili.tech/img/remote/1460000010109170" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span><br>目前只写了2个要读取的模板，在生成文件之后，会将模板中的内容填充进去。</p>
<h2 id="articleHeader10">总结</h2>
<p>以上就完成了一个自动生成前端项目组件的小脚本了，当然，还可以继续扩充，比如这些组件其实还需要再到，组件管理的那个js中去注入，这些都可以用脚本完成，本文就到这里为止了。</p>
<p>项目地址：<a href="https://github.com/jiwenjiang/angularSeed" rel="nofollow noreferrer" target="_blank">https://github.com/jiwenjiang...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用nodejs自动生成前端项目组件

## 原文链接
[https://segmentfault.com/a/1190000010109160](https://segmentfault.com/a/1190000010109160)

