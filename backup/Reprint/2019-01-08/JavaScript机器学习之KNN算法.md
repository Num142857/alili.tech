---
title: 'JavaScript机器学习之KNN算法' 
date: 2019-01-08 2:30:11
hidden: true
slug: mlraiweouce
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按:</strong> 机器学习原来很简单啊，不妨动手试试！</p>
<p>原文: <a href="https://hackernoon.com/machine-learning-with-javascript-part-2-da994c17d483" rel="nofollow noreferrer" target="_blank">Machine Learning with JavaScript : Part 2</a></p>
<p>译者: <a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a></p>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。另外，我们修正了原文代码中的错误</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVQWLI?w=700&amp;h=450" src="https://static.alili.tech/img/bVQWLI?w=700&amp;h=450" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>上图使用<a href="http://plot.ly/" rel="nofollow noreferrer" target="_blank">plot.ly</a>所画。</p>
<p>上次我们用JavaScript实现了<a href="https://blog.fundebug.com/2017/07/03/javascript-machine-learning-regression/" rel="nofollow noreferrer" target="_blank">线性规划</a>，这次我们来聊聊KNN算法。</p>
<p>KNN是<strong>k-Nearest-Neighbours</strong>的缩写，它是一种监督学习算法。KNN算法可以用来做分类，也可以用来解决回归问题。</p>
<p>GitHub仓库： <a href="https://github.com/abhisheksoni27/machine-learning-with-js" rel="nofollow noreferrer" target="_blank">machine-learning-with-js</a></p>
<h4>KNN算法简介</h4>
<p>简单地说，<strong>KNN算法由那离自己最近的K个点来投票决定待分类数据归为哪一类</strong>。</p>
<p>如果待分类的数据有这些邻近数据，<em>NY</em>: <strong>7</strong>, <em>NJ</em>: <strong>0</strong>, <em>IN</em>: <strong>4</strong>，即它有7个<strong>NY</strong>邻居，0个<strong>NJ</strong>邻居，4个<strong>IN</strong>邻居，则这个数据应该归类为<strong>NY</strong>。</p>
<p>假设你在邮局工作，你的任务是为邮递员分配信件，目标是最小化到各个社区的投递旅程。不妨假设一共有7个街区。这就是一个实际的分类问题。你需要将这些信件分类，决定它属于哪个社区，比如<strong>上东城</strong>、<strong>曼哈顿下城</strong>等。</p>
<p>最坏的方案是随意分配信件分配给邮递员，这样每个邮递员会拿到各个社区的信件。</p>
<p>最佳的方案是根据信件地址进行分类，这样每个邮递员只需要负责邻近社区的信件。</p>
<p>也许你是这样想的："将邻近3个街区的信件分配给同一个邮递员"。这时，邻近街区的个数就是<strong>k</strong>。你可以不断增加<strong>k</strong>，直到获得最佳的分配方案。这个<strong>k</strong>就是分类问题的最佳值。</p>
<h3 id="articleHeader0">KNN代码实现</h3>
<p>像<a href="https://blog.fundebug.com/2017/07/03/javascript-machine-learning-regression/" rel="nofollow noreferrer" target="_blank">上次</a>一样，我们将使用<a href="https://github.com/mljs" rel="nofollow noreferrer" target="_blank">mljs</a>的<strong>KNN</strong>模块<a href="https://github.com/mljs/knn" rel="nofollow noreferrer" target="_blank">ml-knn</a>来实现。</p>
<p>每一个机器学习算法都需要数据，这次我将使用<strong>IRIS数据集</strong>。其数据集包含了150个样本，都属于<a href="https://zh.wikipedia.org/wiki/%E9%B8%A2%E5%B0%BE%E5%B1%9E" rel="nofollow noreferrer" target="_blank">鸢尾属</a>下的三个亚属，分别是<a href="https://zh.wikipedia.org/wiki/%E5%B1%B1%E9%B8%A2%E5%B0%BE" rel="nofollow noreferrer" target="_blank">山鸢尾</a>、<a href="https://zh.wikipedia.org/wiki/%E5%8F%98%E8%89%B2%E9%B8%A2%E5%B0%BE" rel="nofollow noreferrer" target="_blank">变色鸢尾</a>和<a href="https://zh.wikipedia.org/w/index.php?title=%E7%BB%B4%E5%90%89%E5%B0%BC%E4%BA%9A%E9%B8%A2%E5%B0%BE&amp;action=edit&amp;redlink=1" rel="nofollow noreferrer" target="_blank">维吉尼亚鸢尾</a>。四个特征被用作样本的定量分析，它们分别是<a href="https://zh.wikipedia.org/wiki/%E8%8A%B1%E8%90%BC" rel="nofollow noreferrer" target="_blank">花萼</a>和<a href="https://zh.wikipedia.org/wiki/%E8%8A%B1%E7%93%A3" rel="nofollow noreferrer" target="_blank">花瓣</a>的长度和宽度。</p>
<h3 id="articleHeader1">1. 安装模块</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install ml-knn@2.0.0 csvtojson prompt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>npm install ml-knn<span class="hljs-variable">@2</span>.<span class="hljs-number">0</span>.<span class="hljs-number">0</span> csvtojson prompt</code></pre>
<p><a href="https://github.com/mljs/knn" rel="nofollow noreferrer" target="_blank">ml-knn</a>: <strong>k-Nearest-Neighbours</strong>模块，不同版本的接口可能不同，这篇博客使用了2.0.0</p>
<p><a href="https://github.com/Keyang/node-csvtojson" rel="nofollow noreferrer" target="_blank">csvtojson</a>: 用于将CSV数据转换为JSON</p>
<p><a href="https://github.com/flatiron/prompt" rel="nofollow noreferrer" target="_blank">prompt</a>: 在控制台输入输出数据</p>
<h3 id="articleHeader2">2. 初始化并导入数据</h3>
<p><strong><a href="https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data" rel="nofollow noreferrer" target="_blank">IRIS数据集</a></strong>由加州大学欧文分校提供。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data > iris.csv" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">curl https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data &gt; iris.csv</code></pre>
<p>假设你已经初始化了一个NPM项目，请在<strong>index.js</strong>中输入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const KNN = require('ml-knn');
const csv = require('csvtojson');
const prompt = require('prompt');

var knn;

const csvFilePath = 'iris.csv'; // 数据集
const names = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'type'];

let seperationSize; // 分割训练和测试数据

let data = [],
    X = [],
    y = [];

let trainingSetX = [],
    trainingSetY = [],
    testSetX = [],
    testSetY = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> KNN = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ml-knn'</span>);
<span class="hljs-keyword">const</span> csv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'csvtojson'</span>);
<span class="hljs-keyword">const</span> prompt = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prompt'</span>);

<span class="hljs-keyword">var</span> knn;

<span class="hljs-keyword">const</span> csvFilePath = <span class="hljs-string">'iris.csv'</span>; <span class="hljs-comment">// 数据集</span>
<span class="hljs-keyword">const</span> names = [<span class="hljs-string">'sepalLength'</span>, <span class="hljs-string">'sepalWidth'</span>, <span class="hljs-string">'petalLength'</span>, <span class="hljs-string">'petalWidth'</span>, <span class="hljs-string">'type'</span>];

<span class="hljs-keyword">let</span> seperationSize; <span class="hljs-comment">// 分割训练和测试数据</span>

<span class="hljs-keyword">let</span> data = [],
    X = [],
    y = [];

<span class="hljs-keyword">let</span> trainingSetX = [],
    trainingSetY = [],
    testSetX = [],
    testSetY = [];</code></pre>
<ul><li><p><strong>seperationSize</strong>用于分割数据和测试数据</p></li></ul>
<p>使用csvtojson模块的fromFile方法加载数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="csv(
    {
        noheader: true,
        headers: names
    })
    .fromFile(csvFilePath)
    .on('json', (jsonObj) =>
    {
        data.push(jsonObj); // 将数据集转换为JS对象数组
    })
    .on('done', (error) =>
    {
        seperationSize = 0.7 * data.length;
        data = shuffleArray(data);
        dressData();
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">csv(
    {
        <span class="hljs-attr">noheader</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">headers</span>: names
    })
    .fromFile(csvFilePath)
    .on(<span class="hljs-string">'json'</span>, (jsonObj) =&gt;
    {
        data.push(jsonObj); <span class="hljs-comment">// 将数据集转换为JS对象数组</span>
    })
    .on(<span class="hljs-string">'done'</span>, (error) =&gt;
    {
        seperationSize = <span class="hljs-number">0.7</span> * data.length;
        data = shuffleArray(data);
        dressData();
    });</code></pre>
<p>我们将<strong>seperationSize</strong>设为样本数目的0.7倍。注意，如果训练数据集太小的话，分类效果将变差。</p>
<p>由于数据集是根据种类排序的，所以需要使用<strong>shuffleArray</strong>函数对数据进行混淆，这样才能方便分割出训练数据。这个函数的定义请参考StackOverflow的提问<a href="https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array" rel="nofollow noreferrer" target="_blank">How to randomize (shuffle) a JavaScript array?</a>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shuffleArray(array)
{
    for (var i = array.length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shuffleArray</span>(<span class="hljs-params">array</span>)
</span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = array.length - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i--)
    {
        <span class="hljs-keyword">var</span> j = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (i + <span class="hljs-number">1</span>));
        <span class="hljs-keyword">var</span> temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    <span class="hljs-keyword">return</span> array;
}</code></pre>
<h3 id="articleHeader3">3. 转换数据</h3>
<p>数据集中每一条数据可以转换为一个JS对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
 sepalLength: ‘5.1’,
 sepalWidth: ‘3.5’,
 petalLength: ‘1.4’,
 petalWidth: ‘0.2’,
 type: ‘Iris-setosa’ 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>{
<span class="hljs-symbol"> sepalLength:</span> ‘<span class="hljs-number">5.1</span>’,
<span class="hljs-symbol"> sepalWidth:</span> ‘<span class="hljs-number">3.5</span>’,
<span class="hljs-symbol"> petalLength:</span> ‘<span class="hljs-number">1.4</span>’,
<span class="hljs-symbol"> petalWidth:</span> ‘<span class="hljs-number">0.2</span>’,
<span class="hljs-symbol"> type:</span> ‘Iris-setosa’ 
}</code></pre>
<p>在使用<strong>KNN</strong>算法训练数据之前，需要对数据进行这些处理：</p>
<ol>
<li><p>将属性(sepalLength, sepalWidth,petalLength,petalWidth)由字符串转换为浮点数. (<strong>parseFloat</strong>)</p></li>
<li><p>将分类 (type)用数字表示</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function dressData()
{
    let types = new Set(); 
    data.forEach((row) =>
    {
        types.add(row.type);
    });
    let typesArray = [...types]; 

    data.forEach((row) =>
    {
        let rowArray, typeNumber;
        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, 4);
        typeNumber = typesArray.indexOf(row.type); // Convert type(String) to type(Number)

        X.push(rowArray);
        y.push(typeNumber);
    });

    trainingSetX = X.slice(0, seperationSize);
    trainingSetY = y.slice(0, seperationSize);
    testSetX = X.slice(seperationSize);
    testSetY = y.slice(seperationSize);

    train();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dressData</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">let</span> types = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(); 
    data.forEach(<span class="hljs-function">(<span class="hljs-params">row</span>) =&gt;</span>
    {
        types.add(row.type);
    });
    <span class="hljs-keyword">let</span> typesArray = [...types]; 

    data.forEach(<span class="hljs-function">(<span class="hljs-params">row</span>) =&gt;</span>
    {
        <span class="hljs-keyword">let</span> rowArray, typeNumber;
        rowArray = <span class="hljs-built_in">Object</span>.keys(row).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> <span class="hljs-built_in">parseFloat</span>(row[key])).slice(<span class="hljs-number">0</span>, <span class="hljs-number">4</span>);
        typeNumber = typesArray.indexOf(row.type); <span class="hljs-comment">// Convert type(String) to type(Number)</span>

        X.push(rowArray);
        y.push(typeNumber);
    });

    trainingSetX = X.slice(<span class="hljs-number">0</span>, seperationSize);
    trainingSetY = y.slice(<span class="hljs-number">0</span>, seperationSize);
    testSetX = X.slice(seperationSize);
    testSetY = y.slice(seperationSize);

    train();
}</code></pre>
<h3 id="articleHeader4">4. 训练数据并测试</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function train()
{
    knn = new KNN(trainingSetX, trainingSetY,
    {
        k: 7
    });
    test();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">train</span>(<span class="hljs-params"></span>)
</span>{
    knn = <span class="hljs-keyword">new</span> KNN(trainingSetX, trainingSetY,
    {
        <span class="hljs-attr">k</span>: <span class="hljs-number">7</span>
    });
    test();
}</code></pre>
<p><strong>train</strong>方法需要2个必须的参数: 输入数据，即<a href="https://zh.wikipedia.org/wiki/%E8%8A%B1%E8%90%BC" rel="nofollow noreferrer" target="_blank">花萼</a>和<a href="https://zh.wikipedia.org/wiki/%E8%8A%B1%E7%93%A3" rel="nofollow noreferrer" target="_blank">花瓣</a>的长度和宽度；实际分类，即<a href="https://zh.wikipedia.org/wiki/%E5%B1%B1%E9%B8%A2%E5%B0%BE" rel="nofollow noreferrer" target="_blank">山鸢尾</a>、<a href="https://zh.wikipedia.org/wiki/%E5%8F%98%E8%89%B2%E9%B8%A2%E5%B0%BE" rel="nofollow noreferrer" target="_blank">变色鸢尾</a>和<a href="https://zh.wikipedia.org/w/index.php?title=%E7%BB%B4%E5%90%89%E5%B0%BC%E4%BA%9A%E9%B8%A2%E5%B0%BE&amp;action=edit&amp;redlink=1" rel="nofollow noreferrer" target="_blank">维吉尼亚鸢尾</a>。另外，第三个参数是可选的，用于提供调整<strong>KNN</strong>算法的内部参数。我将<strong>k</strong>参数设为7，其默认值为5。</p>
<p>训练好模型之后，就可以使用测试数据来检查准确性了。我们主要对预测出错的个数比较感兴趣。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test()
{
    const result = knn.predict(testSetX);
    const testSetLength = testSetX.length;
    const predictionError = error(result, testSetY);
    console.log(`Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`);
    predict();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">const</span> result = knn.predict(testSetX);
    <span class="hljs-keyword">const</span> testSetLength = testSetX.length;
    <span class="hljs-keyword">const</span> predictionError = error(result, testSetY);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Test Set Size = <span class="hljs-subst">${testSetLength}</span> and number of Misclassifications = <span class="hljs-subst">${predictionError}</span>`</span>);
    predict();
}</code></pre>
<p>比较预测值与真实值，就可以得到出错个数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function error(predicted, expected)
{
    let misclassifications = 0;
    for (var index = 0; index < predicted.length; index++)
    {
        if (predicted[index] !== expected[index])
        {
            misclassifications++;
        }
    }
    return misclassifications;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">error</span>(<span class="hljs-params">predicted, expected</span>)
</span>{
    <span class="hljs-keyword">let</span> misclassifications = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; predicted.length; index++)
    {
        <span class="hljs-keyword">if</span> (predicted[index] !== expected[index])
        {
            misclassifications++;
        }
    }
    <span class="hljs-keyword">return</span> misclassifications;
}</code></pre>
<h3 id="articleHeader5">5. 进行预测(可选)</h3>
<p>任意输入属性值，就可以得到预测值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function predict()
{
    let temp = [];
    prompt.start();
    prompt.get(['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'], function(err, result)
    {
        if (!err)
        {
            for (var key in result)
            {
                temp.push(parseFloat(result[key]));
            }
            console.log(`With ${temp} -- type =  ${knn.predict(temp)}`);
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">predict</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">let</span> temp = [];
    prompt.start();
    prompt.get([<span class="hljs-string">'Sepal Length'</span>, <span class="hljs-string">'Sepal Width'</span>, <span class="hljs-string">'Petal Length'</span>, <span class="hljs-string">'Petal Width'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>)
    </span>{
        <span class="hljs-keyword">if</span> (!err)
        {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> result)
            {
                temp.push(<span class="hljs-built_in">parseFloat</span>(result[key]));
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`With <span class="hljs-subst">${temp}</span> -- type =  <span class="hljs-subst">${knn.predict(temp)}</span>`</span>);
        }
    });
}</code></pre>
<h3 id="articleHeader6">6. 完整程序</h3>
<p>完整的程序<strong>index.js</strong>是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const KNN = require('ml-knn');
const csv = require('csvtojson');
const prompt = require('prompt');

var knn;

const csvFilePath = 'iris.csv'; // 数据集
const names = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'type'];

let seperationSize; // 分割训练和测试数据

let data = [],
    X = [],
    y = [];

let trainingSetX = [],
    trainingSetY = [],
    testSetX = [],
    testSetY = [];


csv(
    {
        noheader: true,
        headers: names
    })
    .fromFile(csvFilePath)
    .on('json', (jsonObj) =>
    {
        data.push(jsonObj); // 将数据集转换为JS对象数组
    })
    .on('done', (error) =>
    {
        seperationSize = 0.7 * data.length;
        data = shuffleArray(data);
        dressData();
    });

function dressData()
{
    let types = new Set(); 
    data.forEach((row) =>
    {
        types.add(row.type);
    });
    let typesArray = [...types]; 

    data.forEach((row) =>
    {
        let rowArray, typeNumber;
        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, 4);
        typeNumber = typesArray.indexOf(row.type); // Convert type(String) to type(Number)

        X.push(rowArray);
        y.push(typeNumber);
    });

    trainingSetX = X.slice(0, seperationSize);
    trainingSetY = y.slice(0, seperationSize);
    testSetX = X.slice(seperationSize);
    testSetY = y.slice(seperationSize);

    train();
}


// 使用KNN算法训练数据
function train()
{
    knn = new KNN(trainingSetX, trainingSetY,
    {
        k: 7
    });
    test();
}


// 测试训练的模型
function test()
{
    const result = knn.predict(testSetX);
    const testSetLength = testSetX.length;
    const predictionError = error(result, testSetY);
    console.log(`Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`);
    predict();
}


// 计算出错个数
function error(predicted, expected)
{
    let misclassifications = 0;
    for (var index = 0; index < predicted.length; index++)
    {
        if (predicted[index] !== expected[index])
        {
            misclassifications++;
        }
    }
    return misclassifications;
}


// 根据输入预测结果
function predict()
{
    let temp = [];
    prompt.start();
    prompt.get(['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'], function(err, result)
    {
        if (!err)
        {
            for (var key in result)
            {
                temp.push(parseFloat(result[key]));
            }
            console.log(`With ${temp} -- type =  ${knn.predict(temp)}`);
        }
    });
}


// 混淆数据集的顺序
function shuffleArray(array)
{
    for (var i = array.length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> KNN = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ml-knn'</span>);
<span class="hljs-keyword">const</span> csv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'csvtojson'</span>);
<span class="hljs-keyword">const</span> prompt = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prompt'</span>);

<span class="hljs-keyword">var</span> knn;

<span class="hljs-keyword">const</span> csvFilePath = <span class="hljs-string">'iris.csv'</span>; <span class="hljs-comment">// 数据集</span>
<span class="hljs-keyword">const</span> names = [<span class="hljs-string">'sepalLength'</span>, <span class="hljs-string">'sepalWidth'</span>, <span class="hljs-string">'petalLength'</span>, <span class="hljs-string">'petalWidth'</span>, <span class="hljs-string">'type'</span>];

<span class="hljs-keyword">let</span> seperationSize; <span class="hljs-comment">// 分割训练和测试数据</span>

<span class="hljs-keyword">let</span> data = [],
    X = [],
    y = [];

<span class="hljs-keyword">let</span> trainingSetX = [],
    trainingSetY = [],
    testSetX = [],
    testSetY = [];


csv(
    {
        <span class="hljs-attr">noheader</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">headers</span>: names
    })
    .fromFile(csvFilePath)
    .on(<span class="hljs-string">'json'</span>, (jsonObj) =&gt;
    {
        data.push(jsonObj); <span class="hljs-comment">// 将数据集转换为JS对象数组</span>
    })
    .on(<span class="hljs-string">'done'</span>, (error) =&gt;
    {
        seperationSize = <span class="hljs-number">0.7</span> * data.length;
        data = shuffleArray(data);
        dressData();
    });

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dressData</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">let</span> types = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(); 
    data.forEach(<span class="hljs-function">(<span class="hljs-params">row</span>) =&gt;</span>
    {
        types.add(row.type);
    });
    <span class="hljs-keyword">let</span> typesArray = [...types]; 

    data.forEach(<span class="hljs-function">(<span class="hljs-params">row</span>) =&gt;</span>
    {
        <span class="hljs-keyword">let</span> rowArray, typeNumber;
        rowArray = <span class="hljs-built_in">Object</span>.keys(row).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> <span class="hljs-built_in">parseFloat</span>(row[key])).slice(<span class="hljs-number">0</span>, <span class="hljs-number">4</span>);
        typeNumber = typesArray.indexOf(row.type); <span class="hljs-comment">// Convert type(String) to type(Number)</span>

        X.push(rowArray);
        y.push(typeNumber);
    });

    trainingSetX = X.slice(<span class="hljs-number">0</span>, seperationSize);
    trainingSetY = y.slice(<span class="hljs-number">0</span>, seperationSize);
    testSetX = X.slice(seperationSize);
    testSetY = y.slice(seperationSize);

    train();
}


<span class="hljs-comment">// 使用KNN算法训练数据</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">train</span>(<span class="hljs-params"></span>)
</span>{
    knn = <span class="hljs-keyword">new</span> KNN(trainingSetX, trainingSetY,
    {
        <span class="hljs-attr">k</span>: <span class="hljs-number">7</span>
    });
    test();
}


<span class="hljs-comment">// 测试训练的模型</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">const</span> result = knn.predict(testSetX);
    <span class="hljs-keyword">const</span> testSetLength = testSetX.length;
    <span class="hljs-keyword">const</span> predictionError = error(result, testSetY);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Test Set Size = <span class="hljs-subst">${testSetLength}</span> and number of Misclassifications = <span class="hljs-subst">${predictionError}</span>`</span>);
    predict();
}


<span class="hljs-comment">// 计算出错个数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">error</span>(<span class="hljs-params">predicted, expected</span>)
</span>{
    <span class="hljs-keyword">let</span> misclassifications = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; predicted.length; index++)
    {
        <span class="hljs-keyword">if</span> (predicted[index] !== expected[index])
        {
            misclassifications++;
        }
    }
    <span class="hljs-keyword">return</span> misclassifications;
}


<span class="hljs-comment">// 根据输入预测结果</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">predict</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">let</span> temp = [];
    prompt.start();
    prompt.get([<span class="hljs-string">'Sepal Length'</span>, <span class="hljs-string">'Sepal Width'</span>, <span class="hljs-string">'Petal Length'</span>, <span class="hljs-string">'Petal Width'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>)
    </span>{
        <span class="hljs-keyword">if</span> (!err)
        {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> result)
            {
                temp.push(<span class="hljs-built_in">parseFloat</span>(result[key]));
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`With <span class="hljs-subst">${temp}</span> -- type =  <span class="hljs-subst">${knn.predict(temp)}</span>`</span>);
        }
    });
}


<span class="hljs-comment">// 混淆数据集的顺序</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shuffleArray</span>(<span class="hljs-params">array</span>)
</span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = array.length - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i--)
    {
        <span class="hljs-keyword">var</span> j = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (i + <span class="hljs-number">1</span>));
        <span class="hljs-keyword">var</span> temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    <span class="hljs-keyword">return</span> array;
}</code></pre>
<p>在控制台执行<strong>node index.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js</code></pre>
<p>输出如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Test Set Size = 45 and number of Misclassifications = 2
prompt: Sepal Length:  1.7
prompt: Sepal Width:  2.5
prompt: Petal Length:  0.5
prompt: Petal Width:  3.4
With 1.7,2.5,0.5,3.4 -- type =  2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>Test <span class="hljs-keyword">Set</span> <span class="hljs-keyword">Size</span> = <span class="hljs-number">45</span> <span class="hljs-keyword">and</span> <span class="hljs-built_in">number</span> <span class="hljs-keyword">of</span> Misclassifications = <span class="hljs-number">2</span>
<span class="hljs-keyword">prompt</span>: Sepal <span class="hljs-keyword">Length</span>:  <span class="hljs-number">1.7</span>
<span class="hljs-keyword">prompt</span>: Sepal Width:  <span class="hljs-number">2.5</span>
<span class="hljs-keyword">prompt</span>: Petal <span class="hljs-keyword">Length</span>:  <span class="hljs-number">0.5</span>
<span class="hljs-keyword">prompt</span>: Petal Width:  <span class="hljs-number">3.4</span>
<span class="hljs-keyword">With</span> <span class="hljs-number">1.7</span>,<span class="hljs-number">2.5</span>,<span class="hljs-number">0.5</span>,<span class="hljs-number">3.4</span> <span class="hljs-comment">-- type =  2</span></code></pre>
<h3 id="articleHeader7">参考链接</h3>
<ul>
<li><p><a href="http://coolshell.cn/articles/8052.html" rel="nofollow noreferrer" target="_blank">K NEAREST NEIGHBOR 算法</a></p></li>
<li><p><a href="https://zh.wikipedia.org/wiki/%E5%AE%89%E5%BE%B7%E6%A3%AE%E9%B8%A2%E5%B0%BE%E8%8A%B1%E5%8D%89%E6%95%B0%E6%8D%AE%E9%9B%86" rel="nofollow noreferrer" target="_blank">安德森鸢尾花卉数据集</a></p></li>
</ul>
<p>欢迎加入<a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">我们Fundebug</a>的<strong>全栈BUG监控交流群: 622902485</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVNPvB?w=270&amp;h=370" src="https://static.alili.tech/img/bVNPvB?w=270&amp;h=370" alt="" title="" style="cursor: pointer;"></span></p>
<hr>
<p>版权声明:<br>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2017/07/10/javascript-machine-learning-knn/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2017/07/10/javascript-machine-learning-knn/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript机器学习之KNN算法

## 原文链接
[https://segmentfault.com/a/1190000010196636](https://segmentfault.com/a/1190000010196636)

