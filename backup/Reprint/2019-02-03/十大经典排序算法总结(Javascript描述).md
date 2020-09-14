---
title: '十大经典排序算法总结(Javascript描述)' 
date: 2019-02-03 2:30:40
hidden: true
slug: 9jsfpnutsx9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><strong>读者自行尝试可以<a href="https://github.com/damonare/Sorts" rel="nofollow noreferrer" target="_blank">想看源码戳这</a>，博主在github建了个库，读者可以Clone下来本地尝试。此博文配合源码体验更棒哦~~~</strong></p>
<p><strong>个人博客：<a href="http://damonare.cn" rel="nofollow noreferrer" target="_blank">Damonare的个人博客</a></strong></p>
<p><strong>原文地址：<a href="http://damonare.github.io/2016/09/16/%E5%8D%81%E5%A4%A7%E7%BB%8F%E5%85%B8%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%80%BB%E7%BB%93%EF%BC%88javascript%E6%8F%8F%E8%BF%B0%EF%BC%89/#more" rel="nofollow noreferrer" target="_blank">十大经典算法总结</a></strong></p>
<blockquote><ul>
<li><p>这世界上总存在着那么一些看似相似但有完全不同的东西，比如雷锋和雷峰塔，小平和小平头，玛丽和马里奥，Java和javascript....当年javascript为了抱Java大腿恬不知耻的让自己变成了Java的干儿子，哦，不是应该是跪舔，毕竟都跟了Java的姓了。可如今，javascript来了个咸鱼翻身，几乎要统治web领域，Nodejs，React Native的出现使得javascript在后端和移动端都开始占有了一席之地。可以这么说,在Web的江湖，&lt;mark&gt;JavaScript可谓风头无两，已经坐上了头把交椅。&lt;/mark&gt;</p></li>
<li><p>在传统的计算机算法和数据结构领域，大多数专业教材和书籍的默认语言都是Java或者C/C+ +，O’REILLY家倒是出了一本叫做《数据结构与算法javascript描述》的书，但不得不说，不知道是作者吃了shit还是译者根本就没校对，满书的小错误，这就像那种无穷无尽的小bug一样,简直就是让人有种嘴里塞满了shit的感觉，吐也不是咽下去也不是。对于一个前端来说，尤其是笔试面试的时候，算法方面考的其实不难（&lt;mark&gt;十大排序算法或是和十大排序算法同等难度的&lt;/mark&gt;），但就是之前没用javascript实现过或是没仔细看过相关算法的原理，导致写起来浪费很多时间。所以撸一撸袖子决定自己查资料自己总结一篇博客等用到了直接看自己的博客就OK了，正所谓靠天靠地靠大牛不如靠自己(ˉ(∞)ˉ)。</p></li>
<li><p>算法的由来：9世纪波斯数学家提出的：“al-Khowarizmi”就是下图这货（感觉重要数学元素提出者貌似都戴了顶白帽子），开个玩笑，阿拉伯人对于数学史的贡献还是值得人敬佩的。<br><span class="img-wrap"><img data-src="/img/remote/1460000006921372?w=277&amp;h=344" src="https://static.alili.tech/img/remote/1460000006921372?w=277&amp;h=344" alt="大大" title="大大" style="cursor: pointer;"></span></p></li>
</ul></blockquote>
<h2 id="articleHeader1">正文</h2>
<h3 id="articleHeader2">排序算法说明</h3>
<p><strong>（1）排序的定义：对一序列对象根据某个关键字进行排序；</strong></p>
<p>输入：n个数：a1,a2,a3,...,an<br>输出：n个数的排列:a1',a2',a3',...,an'，使得a1'&lt;=a2'&lt;=a3'&lt;=...&lt;=an'。</p>
<p>再讲的形象点就是排排坐，调座位，高的站在后面，矮的站在前面咯。</p>
<p><strong>（3）对于评述算法优劣术语的说明</strong></p>
<p><strong>稳定</strong>：如果a原本在b前面，而a=b，排序之后a仍然在b的前面；<br><strong>不稳定</strong>：如果a原本在b的前面，而a=b，排序之后a可能会出现在b的后面；</p>
<p><strong>内排序</strong>：所有排序操作都在内存中完成；<br><strong>外排序</strong>：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；</p>
<p><strong>时间复杂度</strong>: 一个算法执行所耗费的时间。<br><strong>空间复杂度</strong>: 运行完一个程序所需内存的大小。</p>
<p>关于时间空间复杂度的更多了解请戳<a href="http://blog.csdn.net/booirror/article/details/7707551/" rel="nofollow noreferrer" target="_blank">这里</a>，或是看书程杰大大编写的《大话数据结构》还是很赞的，通俗易懂。</p>
<p><strong>（4）排序算法图片总结(图片来源于网络):</strong></p>
<p>排序对比：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921373?w=966&amp;h=588" src="https://static.alili.tech/img/remote/1460000006921373?w=966&amp;h=588" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p><strong>图片名词解释：</strong><br>n: 数据规模<br>k:“桶”的个数<br>In-place: 占用常数内存，不占用额外内存<br>Out-place: 占用额外内存</p>
<p>排序分类：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921374?w=528&amp;h=363" src="https://static.alili.tech/img/remote/1460000006921374?w=528&amp;h=363" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">1.冒泡排序（Bubble Sort）</h3>
<blockquote><p>好的，开始总结第一个排序算法，冒泡排序。我想对于它每个学过C语言的都会了解的吧，这可能是很多人接触的第一个排序算法。</p></blockquote>
<h4>(1)算法描述</h4>
<blockquote><p>冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;.比较相邻的元素。如果第一个比第二个大，就交换它们两个；</p></li>
<li><p>&lt;2&gt;.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；</p></li>
<li><p>&lt;3&gt;.针对所有的元素重复以上的步骤，除了最后一个；</p></li>
<li><p>&lt;4&gt;.重复步骤1~3，直到排序完成。</p></li>
</ul>
<p><strong>JavaScript代码实现：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function bubbleSort(arr) {
    var len = arr.length;
    for (var i = <span class="hljs-number">0</span>; i &lt; len; i++) {
        for (var j = <span class="hljs-number">0</span>; j &lt; len - <span class="hljs-number">1</span> - i; j++) {
            if (arr[j] &gt; arr[j+<span class="hljs-number">1</span>]) {        <span class="hljs-comment">//相邻元素两两对比</span>
                var temp = arr[j+<span class="hljs-number">1</span>];        <span class="hljs-comment">//元素交换</span>
                arr[j+<span class="hljs-number">1</span>] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
var arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
console.log(bubbleSort(arr));<span class="hljs-comment">//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]</span></code></pre>
<blockquote><p><strong>改进冒泡排序： </strong>设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。</p></blockquote>
<p>改进后算法如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++)
            if (arr[j]> arr[j+1]) {
                pos= j; //记录交换的位置
                var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        i= pos; //为下一趟排序作准备
     }
     console.timeEnd('改进后冒泡排序耗时');
     return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort2(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>
function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length<span class="hljs-number">-1</span>;  <span class="hljs-comment">//初始时,最后位置保持不变</span>
    while ( i&gt; <span class="hljs-number">0</span>) {
        var pos= <span class="hljs-number">0</span>; <span class="hljs-comment">//每趟开始时,无记录交换</span>
        for (var j= <span class="hljs-number">0</span>; j&lt; i; j++)
            if (arr[j]&gt; arr[j+<span class="hljs-number">1</span>]) {
                pos= j; <span class="hljs-comment">//记录交换的位置</span>
                var tmp = arr[j]; arr[j]=arr[j+<span class="hljs-number">1</span>];arr[j+<span class="hljs-number">1</span>]=tmp;
            }
        i= pos; <span class="hljs-comment">//为下一趟排序作准备</span>
     }
     console.timeEnd('改进后冒泡排序耗时');
     return arr;
}
var arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
console.log(bubbleSort2(arr));<span class="hljs-comment">//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]</span></code></pre>
<blockquote><p>传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,我们考虑利用在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半。</p></blockquote>
<p>改进后的算法实现为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bubbleSort3(arr3) {
    var low = 0;
    var high= arr.length-1; //设置变量的初始值
    var tmp,j;
    console.time('2.改进后冒泡排序耗时');
    while (low < high) {
        for (j= low; j< high; ++j) //正向冒泡,找到最大者
            if (arr[j]> arr[j+1]) {
                tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        --high;                 //修改high值, 前移一位
        for (j=high; j>low; --j) //反向冒泡,找到最小者
            if (arr[j]<arr[j-1]) {
                tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
            }
        ++low;                  //修改low值,后移一位
    }
    console.timeEnd('2.改进后冒泡排序耗时');
    return arr3;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort3(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function bubbleSort3(arr3) {
    var low = <span class="hljs-number">0</span>;
    var high= arr.length<span class="hljs-number">-1</span>; <span class="hljs-comment">//设置变量的初始值</span>
    var tmp,j;
    console.time('<span class="hljs-number">2.</span>改进后冒泡排序耗时');
    while (low &lt; high) {
        for (j= low; j&lt; high; ++j) <span class="hljs-comment">//正向冒泡,找到最大者</span>
            if (arr[j]&gt; arr[j+<span class="hljs-number">1</span>]) {
                tmp = arr[j]; arr[j]=arr[j+<span class="hljs-number">1</span>];arr[j+<span class="hljs-number">1</span>]=tmp;
            }
        --high;                 <span class="hljs-comment">//修改high值, 前移一位</span>
        for (j=high; j&gt;low; --j) <span class="hljs-comment">//反向冒泡,找到最小者</span>
            if (arr[j]&lt;arr[j<span class="hljs-number">-1</span>]) {
                tmp = arr[j]; arr[j]=arr[j<span class="hljs-number">-1</span>];arr[j<span class="hljs-number">-1</span>]=tmp;
            }
        ++low;                  <span class="hljs-comment">//修改low值,后移一位</span>
    }
    console.timeEnd('<span class="hljs-number">2.</span>改进后冒泡排序耗时');
    return arr3;
}
var arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
console.log(bubbleSort3(arr));<span class="hljs-comment">//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]</span></code></pre>
<p>三种方法耗时对比：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921375?w=537&amp;h=350" src="https://static.alili.tech/img/remote/1460000006921375?w=537&amp;h=350" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>由图可以看出改进后的冒泡排序明显的时间复杂度更低，耗时更短了。读者自行尝试可以戳这，博主在github建了个库，读者可以Clone下来本地尝试。此博文配合源码体验更棒哦~~~</p></blockquote>
<p><strong>冒泡排序动图演示:</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921376?w=826&amp;h=257" src="https://static.alili.tech/img/remote/1460000006921376?w=826&amp;h=257" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p><strong>(3)算法分析</strong></p>
<ul><li><p>最佳情况：T(n) = O(n)</p></li></ul>
<blockquote><p>当输入的数据已经是正序时（都已经是正序了，为毛何必还排序呢....）</p></blockquote>
<ul><li><p>最差情况：T(n) = O(n2)</p></li></ul>
<blockquote><p>当输入的数据是反序时(卧槽，我直接反序不就完了....)</p></blockquote>
<ul><li><p>平均情况：T(n) = O(n2)</p></li></ul>
<h3 id="articleHeader4">2.选择排序（Selection Sort）</h3>
<blockquote><p>表现最稳定的排序算法之一(这个稳定不是指算法层面上的稳定哈，相信聪明的你能明白我说的意思2333)，因为无论什么数据进去都是O(n²)的时间复杂度.....所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。理论上讲，选择排序可能也是平时排序一般人想到的最多的排序方法了吧。</p></blockquote>
<h4>(1)算法简介</h4>
<blockquote><p>选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;.初始状态：无序区为R[1..n]，有序区为空；</p></li>
<li><p>&lt;2&gt;.第i趟排序(i=1,2,3...n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；</p></li>
<li><p>&lt;3&gt;.n-1趟结束，数组有序化了。</p></li>
</ul>
<p><strong>Javascript代码实现:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    console.time('选择排序耗时');
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(selectionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    console.time('选择排序耗时');
    for (var i = <span class="hljs-number">0</span>; i &lt; len - <span class="hljs-number">1</span>; i++) {
        minIndex = i;
        for (var j = i + <span class="hljs-number">1</span>; j &lt; len; j++) {
            if (arr[j] &lt; arr[minIndex]) {     <span class="hljs-comment">//寻找最小的数</span>
                minIndex = j;                 <span class="hljs-comment">//将最小数的索引保存</span>
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}
var arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
console.log(selectionSort(arr));<span class="hljs-comment">//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]</span>

</code></pre>
<p><strong>选择排序动图演示：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921377?w=811&amp;h=248" src="https://static.alili.tech/img/remote/1460000006921377?w=811&amp;h=248" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h4>(3)算法分析</h4>
<ul>
<li><p>最佳情况：T(n) = O(n2)</p></li>
<li><p>最差情况：T(n) = O(n2)</p></li>
<li><p>平均情况：T(n) = O(n2)</p></li>
</ul>
<h2 id="articleHeader5">3.插入排序（Insertion Sort）</h2>
<blockquote><p>插入排序的代码实现虽然没有冒泡排序和选择排序那么简单粗暴，但它的原理应该是最容易理解的了，因为只要打过扑克牌的人都应该能够秒懂。当然，如果你说你打扑克牌摸牌的时候从来不按牌的大小整理牌，那估计这辈子你对插入排序的算法都不会产生任何兴趣了.....</p></blockquote>
<h4>(1)算法简介</h4>
<blockquote><p>插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>一般来说，插入排序都采用in-place在数组上实现。具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;.从第一个元素开始，该元素可以认为已经被排序；</p></li>
<li><p>&lt;2&gt;.取出下一个元素，在已经排序的元素序列中从后向前扫描；</p></li>
<li><p>&lt;3&gt;.如果该元素（已排序）大于新元素，将该元素移到下一位置；</p></li>
<li><p>&lt;4&gt;.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；</p></li>
<li><p>&lt;5&gt;.将新元素插入到该位置后；</p></li>
<li><p>&lt;6&gt;.重复步骤2~5。</p></li>
</ul>
<p><strong>Javascript代码实现:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function insertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('插入排序耗时：');
        for (var i = 1; i < array.length; i++) {
            var key = array[i];
            var j = i - 1;
            while (j >= 0 &amp;&amp; array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
        console.timeEnd('插入排序耗时：');
        return array;
    } else {
        return 'array is not an Array!';
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function insertionSort(<span class="hljs-built_in">array</span>) {
    <span class="hljs-keyword">if</span> (Object.prototype.toString.call(<span class="hljs-built_in">array</span>).slice(<span class="hljs-number">8</span>, -<span class="hljs-number">1</span>) === 'Array') {
        console.<span class="hljs-built_in">time</span>('插入排序耗时：');
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>; i++) {
            <span class="hljs-built_in">var</span> <span class="hljs-built_in">key</span> = <span class="hljs-built_in">array</span>[i];
            <span class="hljs-built_in">var</span> j = i - <span class="hljs-number">1</span>;
            <span class="hljs-keyword">while</span> (j &gt;= <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-built_in">array</span>[j] &gt; <span class="hljs-built_in">key</span>) {
                <span class="hljs-built_in">array</span>[j + <span class="hljs-number">1</span>] = <span class="hljs-built_in">array</span>[j];
                j--;
            }
            <span class="hljs-built_in">array</span>[j + <span class="hljs-number">1</span>] = <span class="hljs-built_in">key</span>;
        }
        console.timeEnd('插入排序耗时：');
        <span class="hljs-built_in">return</span> <span class="hljs-built_in">array</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">return</span> '<span class="hljs-built_in">array</span> <span class="hljs-built_in">is</span> <span class="hljs-keyword">not</span> an Array!';
    }
}
</code></pre>
<blockquote><p><strong>改进插入排序：</strong> 查找插入位置时使用二分查找的方式</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function binaryInsertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        console.time('二分插入排序耗时：');

        for (var i = 1; i < array.length; i++) {
            var key = array[i], left = 0, right = i - 1;
            while (left <= right) {
                var middle = parseInt((left + right) / 2);
                if (key < array[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (var j = i - 1; j >= left; j--) {
                array[j + 1] = array[j];
            }
            array[left] = key;
        }
        console.timeEnd('二分插入排序耗时：');

        return array;
    } else {
        return 'array is not an Array!';
    }
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(binaryInsertionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function binaryInsertionSort(<span class="hljs-built_in">array</span>) {
    <span class="hljs-keyword">if</span> (Object.prototype.toString.call(<span class="hljs-built_in">array</span>).slice(<span class="hljs-number">8</span>, -<span class="hljs-number">1</span>) === 'Array') {
        console.<span class="hljs-built_in">time</span>('二分插入排序耗时：');

        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>; i++) {
            <span class="hljs-built_in">var</span> <span class="hljs-built_in">key</span> = <span class="hljs-built_in">array</span>[i], left = <span class="hljs-number">0</span>, right = i - <span class="hljs-number">1</span>;
            <span class="hljs-keyword">while</span> (left &lt;= right) {
                <span class="hljs-built_in">var</span> middle = parseInt((left + right) / <span class="hljs-number">2</span>);
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">key</span> &lt; <span class="hljs-built_in">array</span>[middle]) {
                    right = middle - <span class="hljs-number">1</span>;
                } <span class="hljs-keyword">else</span> {
                    left = middle + <span class="hljs-number">1</span>;
                }
            }
            <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> j = i - <span class="hljs-number">1</span>; j &gt;= left; j--) {
                <span class="hljs-built_in">array</span>[j + <span class="hljs-number">1</span>] = <span class="hljs-built_in">array</span>[j];
            }
            <span class="hljs-built_in">array</span>[left] = <span class="hljs-built_in">key</span>;
        }
        console.timeEnd('二分插入排序耗时：');

        <span class="hljs-built_in">return</span> <span class="hljs-built_in">array</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">return</span> '<span class="hljs-built_in">array</span> <span class="hljs-built_in">is</span> <span class="hljs-keyword">not</span> an Array!';
    }
}
<span class="hljs-built_in">var</span> arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
console.<span class="hljs-built_in">log</span>(binaryInsertionSort(arr));//[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">15</span>, <span class="hljs-number">19</span>, <span class="hljs-number">26</span>, <span class="hljs-number">27</span>, <span class="hljs-number">36</span>, <span class="hljs-number">38</span>, <span class="hljs-number">44</span>, <span class="hljs-number">46</span>, <span class="hljs-number">47</span>, <span class="hljs-number">48</span>, <span class="hljs-number">50</span>]</code></pre>
<blockquote><p>改进前后对比：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921378?w=535&amp;h=320" src="https://static.alili.tech/img/remote/1460000006921378?w=535&amp;h=320" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p><strong>插入排序动图演示:</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921379?w=811&amp;h=505" src="https://static.alili.tech/img/remote/1460000006921379?w=811&amp;h=505" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h4>(3)算法分析</h4>
<ul>
<li><p>最佳情况：输入数组按升序排列。T(n) = O(n)</p></li>
<li><p>最坏情况：输入数组按降序排列。T(n) = O(n2)</p></li>
<li><p>平均情况：T(n) = O(n2)</p></li>
</ul>
<h3 id="articleHeader6">4.希尔排序（Shell Sort）</h3>
<blockquote><p>1959年Shell发明；</p></blockquote>
<p>第一个突破O(n^2)的排序算法；是简单插入排序的改进版；它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序</p>
<h4>(1)算法简介</h4>
<blockquote><p>希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。动态定义间隔序列的算法是《算法（第4版》的合著者Robert Sedgewick提出的。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：</p>
<ul>
<li><p>&lt;1&gt;. 选择一个增量序列t1，t2，…，tk，其中ti&gt;tj，tk=1；</p></li>
<li><p>&lt;2&gt;.按增量序列个数k，对序列进行k 趟排序；</p></li>
<li><p>&lt;3&gt;.每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。</p></li>
</ul>
<p><strong>Javascript代码实现：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while(gap < len/5) {          //动态定义间隔序列
        gap =gap*5+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 &amp;&amp; arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(shellSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shellSort</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> len = arr.length,
        temp,
        gap = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'希尔排序耗时:'</span>);
    <span class="hljs-keyword">while</span>(gap &lt; len/<span class="hljs-number">5</span>) {          <span class="hljs-comment">//动态定义间隔序列</span>
        gap =gap*<span class="hljs-number">5</span>+<span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">for</span> (gap; gap &gt; <span class="hljs-number">0</span>; gap = <span class="hljs-built_in">Math</span>.floor(gap/<span class="hljs-number">5</span>)) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = gap; i &lt; len; i++) {
            temp = arr[i];
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i-gap; j &gt;= <span class="hljs-number">0</span> &amp;&amp; arr[j] &gt; temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'希尔排序耗时:'</span>);
    <span class="hljs-keyword">return</span> arr;
}
<span class="hljs-keyword">var</span> arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
<span class="hljs-built_in">console</span>.log(shellSort(arr));<span class="hljs-comment">//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]</span>
</code></pre>
<p><strong>希尔排序图示（图片来源网络）：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921380?w=480&amp;h=469" src="https://static.alili.tech/img/remote/1460000006921380?w=480&amp;h=469" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h4>（3）算法分析</h4>
<ul>
<li><p>最佳情况：T(n) = O(nlog2 n)</p></li>
<li><p>最坏情况：T(n) = O(nlog2 n)</p></li>
<li><p>平均情况：T(n) =O(nlog n)</p></li>
</ul>
<h3 id="articleHeader7">5.归并排序（Merge Sort）</h3>
<blockquote><p>和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(n log n）的时间复杂度。代价是需要额外的内存空间。</p></blockquote>
<h4>(1)算法简介</h4>
<blockquote><p>　归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;.把长度为n的输入序列分成两个长度为n/2的子序列；</p></li>
<li><p>&lt;2&gt;.对这两个子序列分别采用归并排序；</p></li>
<li><p>&lt;3&gt;.将两个排序好的子序列合并成一个最终的排序序列。</p></li>
</ul>
<p><strong>Javscript代码实现:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];
    console.time('归并排序耗时');
    while (left.length &amp;&amp; right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());
    console.timeEnd('归并排序耗时');
    return result;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(mergeSort(arr));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>function mergeSort(arr) {  <span class="hljs-comment">//采用自上而下的递归方法</span>
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">if</span>(len &lt; <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">return</span> arr;
    }
    <span class="hljs-keyword">var</span> middle = <span class="hljs-type">Math</span>.floor(len / <span class="hljs-number">2</span>),
        <span class="hljs-keyword">left</span> = arr.slice(<span class="hljs-number">0</span>, middle),
        <span class="hljs-keyword">right</span> = arr.slice(middle);
    <span class="hljs-keyword">return</span> merge(mergeSort(<span class="hljs-keyword">left</span>), mergeSort(<span class="hljs-keyword">right</span>));
}

function merge(<span class="hljs-keyword">left</span>, <span class="hljs-keyword">right</span>)
{
    <span class="hljs-keyword">var</span> result = [];
    console.time('归并排序耗时');
    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">left</span>.length &amp;&amp; <span class="hljs-keyword">right</span>.length) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">left</span>[<span class="hljs-number">0</span>] &lt;= <span class="hljs-keyword">right</span>[<span class="hljs-number">0</span>]) {
            result.push(<span class="hljs-keyword">left</span>.shift());
        } <span class="hljs-keyword">else</span> {
            result.push(<span class="hljs-keyword">right</span>.shift());
        }
    }

    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">left</span>.length)
        result.push(<span class="hljs-keyword">left</span>.shift());

    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">right</span>.length)
        result.push(<span class="hljs-keyword">right</span>.shift());
    console.timeEnd('归并排序耗时');
    <span class="hljs-keyword">return</span> result;
}
<span class="hljs-keyword">var</span> arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
console.log(mergeSort(arr));
</code></pre>
<p><strong>归并排序动图演示:</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921381?w=811&amp;h=505" src="https://static.alili.tech/img/remote/1460000006921381?w=811&amp;h=505" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h4>(3)算法分析</h4>
<ul>
<li><p>最佳情况：T(n) = O(n)</p></li>
<li><p>最差情况：T(n) = O(nlogn)</p></li>
<li><p>平均情况：T(n) = O(nlogn)</p></li>
</ul>
<h3 id="articleHeader8">6.快速排序（Quick Sort）</h3>
<blockquote><p>快速排序的名字起的是简单粗暴，因为一听到这个名字你就知道它存在的意义，就是快，而且效率高! 它是处理大数据最快的排序算法之一了。</p></blockquote>
<h4>(1)算法简介</h4>
<blockquote><p>快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;.从数列中挑出一个元素，称为 "基准"（pivot）；</p></li>
<li><p>&lt;2&gt;.重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；</p></li>
<li><p>&lt;3&gt;.递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。</p></li>
</ul>
<p><strong>Javascript代码实现：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*方法说明：快速排序
@param  array 待排序数组*/
//方法一
function quickSort(array, left, right) {
    console.time('1.快速排序耗时');
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' &amp;&amp; typeof left === 'number' &amp;&amp; typeof right === 'number') {
        if (left < right) {
            var x = array[right], i = left - 1, temp;
            for (var j = left; j <= right; j++) {
                if (array[j] <= x) {
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            quickSort(array, left, i - 1);
            quickSort(array, i + 1, right);
        }
        console.timeEnd('1.快速排序耗时');
        return array;
    } else {
        return 'array is not an Array or left or right is not a number!';
    }
}

//方法二
var quickSort2 = function(arr) {
    console.time('2.快速排序耗时');
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
console.timeEnd('2.快速排序耗时');
　　return quickSort2(left).concat([pivot], quickSort2(right));
};

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(arr,0,arr.length-1));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(quickSort2(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-comment">/*方法说明：快速排序
@param  array 待排序数组*/</span>
//方法一
function quickSort(<span class="hljs-built_in">array</span>, left, right) {
    console.<span class="hljs-built_in">time</span>('<span class="hljs-number">1</span>.快速排序耗时');
    <span class="hljs-keyword">if</span> (Object.prototype.toString.call(<span class="hljs-built_in">array</span>).slice(<span class="hljs-number">8</span>, -<span class="hljs-number">1</span>) === 'Array' &amp;&amp; typeof left === 'number' &amp;&amp; typeof right === 'number') {
        <span class="hljs-keyword">if</span> (left &lt; right) {
            <span class="hljs-built_in">var</span> x = <span class="hljs-built_in">array</span>[right], i = left - <span class="hljs-number">1</span>, temp;
            <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> j = left; j &lt;= right; j++) {
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">array</span>[j] &lt;= x) {
                    i++;
                    temp = <span class="hljs-built_in">array</span>[i];
                    <span class="hljs-built_in">array</span>[i] = <span class="hljs-built_in">array</span>[j];
                    <span class="hljs-built_in">array</span>[j] = temp;
                }
            }
            quickSort(<span class="hljs-built_in">array</span>, left, i - <span class="hljs-number">1</span>);
            quickSort(<span class="hljs-built_in">array</span>, i + <span class="hljs-number">1</span>, right);
        }
        console.timeEnd('<span class="hljs-number">1</span>.快速排序耗时');
        <span class="hljs-built_in">return</span> <span class="hljs-built_in">array</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">return</span> '<span class="hljs-built_in">array</span> <span class="hljs-built_in">is</span> <span class="hljs-keyword">not</span> an Array <span class="hljs-keyword">or</span> left <span class="hljs-keyword">or</span> right <span class="hljs-built_in">is</span> <span class="hljs-keyword">not</span> a number!';
    }
}

//方法二
<span class="hljs-built_in">var</span> quickSort2 = function(arr) {
    console.<span class="hljs-built_in">time</span>('<span class="hljs-number">2</span>.快速排序耗时');
　　<span class="hljs-keyword">if</span> (arr.<span class="hljs-built_in">length</span> &lt;= <span class="hljs-number">1</span>) { <span class="hljs-built_in">return</span> arr; }
　　<span class="hljs-built_in">var</span> pivotIndex = Math.<span class="hljs-built_in">floor</span>(arr.<span class="hljs-built_in">length</span> / <span class="hljs-number">2</span>);
　　<span class="hljs-built_in">var</span> pivot = arr.<span class="hljs-built_in">splice</span>(pivotIndex, <span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
　　<span class="hljs-built_in">var</span> left = [];
　　<span class="hljs-built_in">var</span> right = [];
　　<span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.<span class="hljs-built_in">length</span>; i++){
　　　　<span class="hljs-keyword">if</span> (arr[i] &lt; pivot) {
　　　　　　left.<span class="hljs-built_in">push</span>(arr[i]);
　　　　} <span class="hljs-keyword">else</span> {
　　　　　　right.<span class="hljs-built_in">push</span>(arr[i]);
　　　　}
　　}
console.timeEnd('<span class="hljs-number">2</span>.快速排序耗时');
　　<span class="hljs-built_in">return</span> quickSort2(left).<span class="hljs-built_in">concat</span>([pivot], quickSort2(right));
};

<span class="hljs-built_in">var</span> arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
console.<span class="hljs-built_in">log</span>(quickSort(arr,<span class="hljs-number">0</span>,arr.<span class="hljs-built_in">length</span>-<span class="hljs-number">1</span>));//[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">15</span>, <span class="hljs-number">19</span>, <span class="hljs-number">26</span>, <span class="hljs-number">27</span>, <span class="hljs-number">36</span>, <span class="hljs-number">38</span>, <span class="hljs-number">44</span>, <span class="hljs-number">46</span>, <span class="hljs-number">47</span>, <span class="hljs-number">48</span>, <span class="hljs-number">50</span>]
console.<span class="hljs-built_in">log</span>(quickSort2(arr));//[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">15</span>, <span class="hljs-number">19</span>, <span class="hljs-number">26</span>, <span class="hljs-number">27</span>, <span class="hljs-number">36</span>, <span class="hljs-number">38</span>, <span class="hljs-number">44</span>, <span class="hljs-number">46</span>, <span class="hljs-number">47</span>, <span class="hljs-number">48</span>, <span class="hljs-number">50</span>]

</code></pre>
<p><strong>快速排序动图演示：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921382?w=811&amp;h=252" src="https://static.alili.tech/img/remote/1460000006921382?w=811&amp;h=252" alt="快速排序" title="快速排序" style="cursor: pointer;"></span></p>
<h4>(3)算法分析</h4>
<ul>
<li><p>最佳情况：T(n) = O(nlogn)</p></li>
<li><p>最差情况：T(n) = O(n2)</p></li>
<li><p>平均情况：T(n) = O(nlogn)</p></li>
</ul>
<h3 id="articleHeader9">7.堆排序（Heap Sort）</h3>
<blockquote><p>堆排序可以说是一种利用堆的概念来排序的选择排序。</p></blockquote>
<h4>(1)算法简介</h4>
<blockquote><p>堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;.将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无序区；</p></li>
<li><p>&lt;2&gt;.将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),且满足R[1,2...n-1]&lt;=R[n]；</p></li>
<li><p>&lt;3&gt;.由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。</p></li>
</ul>
<p><strong>Javascript代码实现：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*方法说明：堆排序
@param  array 待排序数组*/
function heapSort(array) {
    console.time('堆排序耗时');
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        //建堆
        var heapSize = array.length, temp;
        for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            heapify(array, i, heapSize);
        }

        //堆排序
        for (var j = heapSize - 1; j >= 1; j--) {
            temp = array[0];
            array[0] = array[j];
            array[j] = temp;
            heapify(array, 0, --heapSize);
        }
        console.timeEnd('堆排序耗时');
        return array;
    } else {
        return 'array is not an Array!';
    }
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
    if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' &amp;&amp; typeof x === 'number') {
        var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
        if (l < len &amp;&amp; arr[l] > arr[largest]) {
            largest = l;
        }
        if (r < len &amp;&amp; arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heapify(arr, largest, len);
        }
    } else {
        return 'arr is not an Array or x is not a number!';
    }
}
var arr=[91,60,96,13,35,65,46,65,10,30,20,31,77,81,22];
console.log(heapSort(arr));//[10, 13, 20, 22, 30, 31, 35, 46, 60, 65, 65, 77, 81, 91, 96]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/*方法说明：堆排序
<span class="hljs-doctag">@param</span>  array 待排序数组*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">heapSort</span><span class="hljs-params">(array)</span> </span>{
    console.time(<span class="hljs-string">'堆排序耗时'</span>);
    <span class="hljs-keyword">if</span> (Object.prototype.toString.call(<span class="hljs-keyword">array</span>).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Array'</span>) {
        <span class="hljs-comment">//建堆</span>
        <span class="hljs-keyword">var</span> heapSize = <span class="hljs-keyword">array</span>.length, temp;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = Math.floor(heapSize / <span class="hljs-number">2</span>) - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
            heapify(<span class="hljs-keyword">array</span>, i, heapSize);
        }

        <span class="hljs-comment">//堆排序</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = heapSize - <span class="hljs-number">1</span>; j &gt;= <span class="hljs-number">1</span>; j--) {
            temp = <span class="hljs-keyword">array</span>[<span class="hljs-number">0</span>];
            <span class="hljs-keyword">array</span>[<span class="hljs-number">0</span>] = <span class="hljs-keyword">array</span>[j];
            <span class="hljs-keyword">array</span>[j] = temp;
            heapify(<span class="hljs-keyword">array</span>, <span class="hljs-number">0</span>, --heapSize);
        }
        console.timeEnd(<span class="hljs-string">'堆排序耗时'</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">array</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'array is not an Array!'</span>;
    }
}
<span class="hljs-comment">/*方法说明：维护堆的性质
<span class="hljs-doctag">@param</span>  arr 数组
<span class="hljs-doctag">@param</span>  x   数组下标
<span class="hljs-doctag">@param</span>  len 堆大小*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">heapify</span><span class="hljs-params">(arr, x, len)</span> </span>{
    <span class="hljs-keyword">if</span> (Object.prototype.toString.call(arr).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Array'</span> &amp;&amp; typeof x === <span class="hljs-string">'number'</span>) {
        <span class="hljs-keyword">var</span> l = <span class="hljs-number">2</span> * x + <span class="hljs-number">1</span>, r = <span class="hljs-number">2</span> * x + <span class="hljs-number">2</span>, largest = x, temp;
        <span class="hljs-keyword">if</span> (l &lt; len &amp;&amp; arr[l] &gt; arr[largest]) {
            largest = l;
        }
        <span class="hljs-keyword">if</span> (r &lt; len &amp;&amp; arr[r] &gt; arr[largest]) {
            largest = r;
        }
        <span class="hljs-keyword">if</span> (largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heapify(arr, largest, len);
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'arr is not an Array or x is not a number!'</span>;
    }
}
<span class="hljs-keyword">var</span> arr=[<span class="hljs-number">91</span>,<span class="hljs-number">60</span>,<span class="hljs-number">96</span>,<span class="hljs-number">13</span>,<span class="hljs-number">35</span>,<span class="hljs-number">65</span>,<span class="hljs-number">46</span>,<span class="hljs-number">65</span>,<span class="hljs-number">10</span>,<span class="hljs-number">30</span>,<span class="hljs-number">20</span>,<span class="hljs-number">31</span>,<span class="hljs-number">77</span>,<span class="hljs-number">81</span>,<span class="hljs-number">22</span>];
console.log(heapSort(arr));<span class="hljs-comment">//[10, 13, 20, 22, 30, 31, 35, 46, 60, 65, 65, 77, 81, 91, 96]</span>
</code></pre>
<p><strong>堆排序动图演示：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921383?w=547&amp;h=364" src="https://static.alili.tech/img/remote/1460000006921383?w=547&amp;h=364" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>(3)算法分析</h4>
<ul>
<li><p>最佳情况：T(n) = O(nlogn)</p></li>
<li><p>最差情况：T(n) = O(nlogn)</p></li>
<li><p>平均情况：T(n) = O(nlogn)</p></li>
</ul>
<h3 id="articleHeader10">8.计数排序（Counting Sort）</h3>
<blockquote><p>计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。</p></blockquote>
<p>作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。</p>
<h4>(1)算法简介</h4>
<blockquote><p>计数排序(Counting sort)是一种稳定的排序算法。计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将A中的元素排到正确的位置。它只能对整数进行排序。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;. 找出待排序的数组中最大和最小的元素；</p></li>
<li><p>&lt;2&gt;. 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；</p></li>
<li><p>&lt;3&gt;. 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；</p></li>
<li><p>&lt;4&gt;. 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。</p></li>
</ul>
<p><strong>Javascript代码实现：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function countingSort(array) {
    var len = array.length,
        B = [],
        C = [],
        min = max = array[0];
    console.time('计数排序耗时');
    for (var i = 0; i < len; i++) {
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
        C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1;
    }
    for (var j = min; j < max; j++) {
        C[j + 1] = (C[j + 1] || 0) + (C[j] || 0);
    }
    for (var k = len - 1; k >= 0; k--) {
        B[C[array[k]] - 1] = array[k];
        C[array[k]]--;
    }
    console.timeEnd('计数排序耗时');
    return B;
}
var arr = [2, 2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2];
console.log(countingSort(arr)); //[1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9, 9]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function countingSort(<span class="hljs-built_in">array</span>) {
    <span class="hljs-built_in">var</span> len = <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>,
        B = [],
        C = [],
        <span class="hljs-built_in">min</span> = <span class="hljs-built_in">max</span> = <span class="hljs-built_in">array</span>[<span class="hljs-number">0</span>];
    console.<span class="hljs-built_in">time</span>('计数排序耗时');
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
        <span class="hljs-built_in">min</span> = <span class="hljs-built_in">min</span> &lt;= <span class="hljs-built_in">array</span>[i] ? <span class="hljs-built_in">min</span> : <span class="hljs-built_in">array</span>[i];
        <span class="hljs-built_in">max</span> = <span class="hljs-built_in">max</span> &gt;= <span class="hljs-built_in">array</span>[i] ? <span class="hljs-built_in">max</span> : <span class="hljs-built_in">array</span>[i];
        C[<span class="hljs-built_in">array</span>[i]] = C[<span class="hljs-built_in">array</span>[i]] ? C[<span class="hljs-built_in">array</span>[i]] + <span class="hljs-number">1</span> : <span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> j = <span class="hljs-built_in">min</span>; j &lt; <span class="hljs-built_in">max</span>; j++) {
        C[j + <span class="hljs-number">1</span>] = (C[j + <span class="hljs-number">1</span>] || <span class="hljs-number">0</span>) + (C[j] || <span class="hljs-number">0</span>);
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> k = len - <span class="hljs-number">1</span>; k &gt;= <span class="hljs-number">0</span>; k--) {
        B[C[<span class="hljs-built_in">array</span>[k]] - <span class="hljs-number">1</span>] = <span class="hljs-built_in">array</span>[k];
        C[<span class="hljs-built_in">array</span>[k]]--;
    }
    console.timeEnd('计数排序耗时');
    <span class="hljs-built_in">return</span> B;
}
<span class="hljs-built_in">var</span> arr = [<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">8</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">9</span>, <span class="hljs-number">2</span>];
console.<span class="hljs-built_in">log</span>(countingSort(arr)); //[<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">9</span>]
</code></pre>
<p><strong>JavaScript动图演示：</strong>、</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921384?w=1012&amp;h=557" src="https://static.alili.tech/img/remote/1460000006921384?w=1012&amp;h=557" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h4>(3)算法分析</h4>
<blockquote><p>当输入的元素是n 个0到k之间的整数时，它的运行时间是 O(n + k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。由于用来计数的数组C的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。</p></blockquote>
<ul>
<li><p>最佳情况：T(n) = O(n+k)</p></li>
<li><p>最差情况：T(n) = O(n+k)</p></li>
<li><p>平均情况：T(n) = O(n+k)</p></li>
</ul>
<h3 id="articleHeader11">9.桶排序（Bucket Sort）</h3>
<blockquote><p>桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。</p></blockquote>
<h4>(1)算法简介</h4>
<blockquote><p>桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;.设置一个定量的数组当作空桶；</p></li>
<li><p>&lt;2&gt;.遍历输入数据，并且把数据一个一个放到对应的桶里去；</p></li>
<li><p>&lt;3&gt;.对每个不是空的桶进行排序；</p></li>
<li><p>&lt;4&gt;.从不是空的桶里把排好序的数据拼接起来。</p></li>
</ul>
<p><strong>Javascript代码实现:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*方法说明：桶排序
@param  array 数组
@param  num   桶的数量*/
function bucketSort(array, num) {
    if (array.length <= 1) {
        return array;
    }
    var len = array.length, buckets = [], result = [], min = max = array[0], regex = '/^[1-9]+[0-9]*$/', space, n = 0;
    num = num || ((num > 1 &amp;&amp; regex.test(num)) ? num : 10);
    console.time('桶排序耗时');
    for (var i = 1; i < len; i++) {
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
    }
    space = (max - min + 1) / num;
    for (var j = 0; j < len; j++) {
        var index = Math.floor((array[j] - min) / space);
        if (buckets[index]) {   //  非空桶，插入排序
            var k = buckets[index].length - 1;
            while (k >= 0 &amp;&amp; buckets[index][k] > array[j]) {
                buckets[index][k + 1] = buckets[index][k];
                k--;
            }
            buckets[index][k + 1] = array[j];
        } else {    //空桶，初始化
            buckets[index] = [];
            buckets[index].push(array[j]);
        }
    }
    while (n < num) {
        result = result.concat(buckets[n]);
        n++;
    }
    console.timeEnd('桶排序耗时');
    return result;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bucketSort(arr,4));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-comment">/*方法说明：桶排序
@param  array 数组
@param  num   桶的数量*/</span>
function bucketSort(<span class="hljs-built_in">array</span>, <span class="hljs-built_in">num</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span> &lt;= <span class="hljs-number">1</span>) {
        <span class="hljs-built_in">return</span> <span class="hljs-built_in">array</span>;
    }
    <span class="hljs-built_in">var</span> len = <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>, buckets = [], result = [], <span class="hljs-built_in">min</span> = <span class="hljs-built_in">max</span> = <span class="hljs-built_in">array</span>[<span class="hljs-number">0</span>], regex = '/^[<span class="hljs-number">1</span>-<span class="hljs-number">9</span>]+[<span class="hljs-number">0</span>-<span class="hljs-number">9</span>]*$/', <span class="hljs-built_in">space</span>, n = <span class="hljs-number">0</span>;
    <span class="hljs-built_in">num</span> = <span class="hljs-built_in">num</span> || ((<span class="hljs-built_in">num</span> &gt; <span class="hljs-number">1</span> &amp;&amp; regex.test(<span class="hljs-built_in">num</span>)) ? <span class="hljs-built_in">num</span> : <span class="hljs-number">10</span>);
    console.<span class="hljs-built_in">time</span>('桶排序耗时');
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt; len; i++) {
        <span class="hljs-built_in">min</span> = <span class="hljs-built_in">min</span> &lt;= <span class="hljs-built_in">array</span>[i] ? <span class="hljs-built_in">min</span> : <span class="hljs-built_in">array</span>[i];
        <span class="hljs-built_in">max</span> = <span class="hljs-built_in">max</span> &gt;= <span class="hljs-built_in">array</span>[i] ? <span class="hljs-built_in">max</span> : <span class="hljs-built_in">array</span>[i];
    }
    <span class="hljs-built_in">space</span> = (<span class="hljs-built_in">max</span> - <span class="hljs-built_in">min</span> + <span class="hljs-number">1</span>) / <span class="hljs-built_in">num</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> j = <span class="hljs-number">0</span>; j &lt; len; j++) {
        <span class="hljs-built_in">var</span> index = Math.<span class="hljs-built_in">floor</span>((<span class="hljs-built_in">array</span>[j] - <span class="hljs-built_in">min</span>) / <span class="hljs-built_in">space</span>);
        <span class="hljs-keyword">if</span> (buckets[index]) {   //  非空桶，插入排序
            <span class="hljs-built_in">var</span> k = buckets[index].<span class="hljs-built_in">length</span> - <span class="hljs-number">1</span>;
            <span class="hljs-keyword">while</span> (k &gt;= <span class="hljs-number">0</span> &amp;&amp; buckets[index][k] &gt; <span class="hljs-built_in">array</span>[j]) {
                buckets[index][k + <span class="hljs-number">1</span>] = buckets[index][k];
                k--;
            }
            buckets[index][k + <span class="hljs-number">1</span>] = <span class="hljs-built_in">array</span>[j];
        } <span class="hljs-keyword">else</span> {    //空桶，初始化
            buckets[index] = [];
            buckets[index].<span class="hljs-built_in">push</span>(<span class="hljs-built_in">array</span>[j]);
        }
    }
    <span class="hljs-keyword">while</span> (n &lt; <span class="hljs-built_in">num</span>) {
        result = result.<span class="hljs-built_in">concat</span>(buckets[n]);
        n++;
    }
    console.timeEnd('桶排序耗时');
    <span class="hljs-built_in">return</span> result;
}
<span class="hljs-built_in">var</span> arr=[<span class="hljs-number">3</span>,<span class="hljs-number">44</span>,<span class="hljs-number">38</span>,<span class="hljs-number">5</span>,<span class="hljs-number">47</span>,<span class="hljs-number">15</span>,<span class="hljs-number">36</span>,<span class="hljs-number">26</span>,<span class="hljs-number">27</span>,<span class="hljs-number">2</span>,<span class="hljs-number">46</span>,<span class="hljs-number">4</span>,<span class="hljs-number">19</span>,<span class="hljs-number">50</span>,<span class="hljs-number">48</span>];
console.<span class="hljs-built_in">log</span>(bucketSort(arr,<span class="hljs-number">4</span>));//[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">15</span>, <span class="hljs-number">19</span>, <span class="hljs-number">26</span>, <span class="hljs-number">27</span>, <span class="hljs-number">36</span>, <span class="hljs-number">38</span>, <span class="hljs-number">44</span>, <span class="hljs-number">46</span>, <span class="hljs-number">47</span>, <span class="hljs-number">48</span>, <span class="hljs-number">50</span>]
</code></pre>
<p><strong>桶排序图示（图片来源网络）：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921385?w=435&amp;h=298" src="https://static.alili.tech/img/remote/1460000006921385?w=435&amp;h=298" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>关于桶排序<a href="http://www.cnblogs.com/lonelyxmas/p/3561938.html" rel="nofollow noreferrer" target="_blank">更多</a></p>
<h4>(3)算法分析</h4>
<blockquote><p>　桶排序最好情况下使用线性时间O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为O(n)。很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。但相应的空间消耗就会增大。</p></blockquote>
<ul>
<li><p>最佳情况：T(n) = O(n+k)</p></li>
<li><p>最差情况：T(n) = O(n+k)</p></li>
<li><p>平均情况：T(n) = O(n2)</p></li>
</ul>
<h3 id="articleHeader12">10.基数排序（Radix Sort）</h3>
<blockquote><p>基数排序也是非比较的排序算法，对每一位进行排序，从最低位开始排序，复杂度为O(kn),为数组长度，k为数组中的数的最大的位数；</p></blockquote>
<h4>(1)算法简介</h4>
<blockquote><p>基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是稳定的。</p></blockquote>
<h4>(2)算法描述和实现</h4>
<p>具体算法描述如下：</p>
<ul>
<li><p>&lt;1&gt;.取得数组中的最大数，并取得位数；</p></li>
<li><p>&lt;2&gt;.arr为原始数组，从最低位开始取每个位组成radix数组；</p></li>
<li><p>&lt;3&gt;.对radix进行计数排序（利用计数排序适用于小范围数的特点）；</p></li>
</ul>
<p><strong>Javascript代码实现：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 基数排序适用于：
 *  (1)数据范围较小，建议在小于1000
 *  (2)每个数值都要大于等于0
 * @author xiazdong
 * @param  arr 待排序数组
 * @param  maxDigit 最大位数
 */
//LSD Radix Sort

function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    var counter = [];
    console.time('基数排序耗时');
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]== null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    console.timeEnd('基数排序耗时');
    return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(radixSort(arr,2)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * 基数排序适用于：
 *  (1)数据范围较小，建议在小于1000
 *  (2)每个数值都要大于等于0
 * @author xiazdong
 * @param  arr 待排序数组
 * @param  maxDigit 最大位数
 */</span>
<span class="hljs-comment">//LSD Radix Sort</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">radixSort</span>(<span class="hljs-params">arr, maxDigit</span>) </span>{
    <span class="hljs-keyword">var</span> mod = <span class="hljs-number">10</span>;
    <span class="hljs-keyword">var</span> dev = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">var</span> counter = [];
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'基数排序耗时'</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; maxDigit; i++, dev *= <span class="hljs-number">10</span>, mod *= <span class="hljs-number">10</span>) {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length; j++) {
            <span class="hljs-keyword">var</span> bucket = <span class="hljs-built_in">parseInt</span>((arr[j] % mod) / dev);
            <span class="hljs-keyword">if</span>(counter[bucket]== <span class="hljs-literal">null</span>) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        <span class="hljs-keyword">var</span> pos = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; counter.length; j++) {
            <span class="hljs-keyword">var</span> value = <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">if</span>(counter[j]!=<span class="hljs-literal">null</span>) {
                <span class="hljs-keyword">while</span> ((value = counter[j].shift()) != <span class="hljs-literal">null</span>) {
                      arr[pos++] = value;
                }
          }
        }
    }
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'基数排序耗时'</span>);
    <span class="hljs-keyword">return</span> arr;
}
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">3</span>, <span class="hljs-number">44</span>, <span class="hljs-number">38</span>, <span class="hljs-number">5</span>, <span class="hljs-number">47</span>, <span class="hljs-number">15</span>, <span class="hljs-number">36</span>, <span class="hljs-number">26</span>, <span class="hljs-number">27</span>, <span class="hljs-number">2</span>, <span class="hljs-number">46</span>, <span class="hljs-number">4</span>, <span class="hljs-number">19</span>, <span class="hljs-number">50</span>, <span class="hljs-number">48</span>];
<span class="hljs-built_in">console</span>.log(radixSort(arr,<span class="hljs-number">2</span>)); <span class="hljs-comment">//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]</span>
</code></pre>
<p><strong>基数排序LSD动图演示：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006921386?w=1012&amp;h=574" src="https://static.alili.tech/img/remote/1460000006921386?w=1012&amp;h=574" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<h4>(3)算法分析</h4>
<ul>
<li><p>最佳情况：T(n) = O(n * k)</p></li>
<li><p>最差情况：T(n) = O(n * k)</p></li>
<li><p>平均情况：T(n) = O(n * k)</p></li>
</ul>
<p>基数排序有两种方法：</p>
<ul>
<li><p>MSD 从高位开始进行排序</p></li>
<li><p>LSD 从低位开始进行排序</p></li>
</ul>
<p><strong>基数排序 vs 计数排序 vs 桶排序</strong></p>
<p>这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：</p>
<ol>
<li><p>基数排序：根据键值的每位数字来分配桶</p></li>
<li><p>计数排序：每个桶只存储单一键值</p></li>
<li><p>桶排序：每个桶存储一定范围的数值</p></li>
</ol>
<h2 id="articleHeader13">后记</h2>
<blockquote><p>十大排序算法的总结到这里就算告一段落了。博主总结完之后只有一个感觉，排序算法博大精深，前辈们用了数年甚至一辈子的心血研究出来的算法更值得我们推敲。站在十大算法的门前心里还是诚惶诚恐的，身为一个小学生，博主的总结难免会有所疏漏，欢迎各位批评指定。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
十大经典排序算法总结(Javascript描述)

## 原文链接
[https://segmentfault.com/a/1190000006921369](https://segmentfault.com/a/1190000006921369)

