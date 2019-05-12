---
title: 'javascript 哈希表' 
date: 2018-12-14 2:30:11
hidden: true
slug: h1b0itxsqln
categories: [reprint]
---

{{< raw >}}

                    
<p>其实javascript的对象就是一个哈希表，为了学习真正的数据结构，我们还是有必要自己重新实现一下。</p>
<h2 id="articleHeader0">基本概念</h2>
<p>哈希表（hash table ）是一种根据关键字直接访问内存存储位置的数据结构，通过哈希表，数据元素的存放位置和数据元素的关键字之间建立起某种对应关系，建立这种对应关系的函数称为哈希函数</p>
<p><span class="img-wrap"><img data-src="/img/bV3f9x?w=608&amp;h=325" src="https://static.alili.tech/img/bV3f9x?w=608&amp;h=325" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">哈希表的构造方法</h2>
<p>假设要存储的数据元素个数是n，设置一个长度为m(m &gt; n)的连续存储单元，分别以每个数据元素的关键字Ki(0&lt;=i&lt;=n-1)为自变量，通过哈希函数hash(Ki)，把Ki映射为内存单元的某个地址hash(Ki),并将数据元素存储在内存单元中</p>
<p>从数学的角度看，哈希函数实际上是关键字到内存单元的映射，因此我们希望通过哈希函数通过尽量简单的运算使得哈希函数计算出的花溪地址尽量均匀的背影射到一系列的内存单元中，构造哈希函数有三个要点：（1）运算过程要尽量简单高效，以提高哈希表的插入和检索效率；（2）哈希函数应该具有较好的散列型，以降低哈希冲突的概率；第三，哈希函数应具有较大的压缩性，以节省内存。</p>
<p>以下有三种常用方法：</p>
<ul>
<li>直接地址法：以关键字的某个线性函数值为哈希地址，可以表示为hash(K)=aK+C;优点是不会产生冲突，缺点是空间复杂度可能会较高，适用于元素较少的情况</li>
<li>除留余数法：它是由数据元素关键字除以某个常数所留的余数为哈希地址，该方法计算简单，适用范围广，是经常使用的一种哈希函数，可以表示为：</li>
</ul>
<blockquote>hash(K=K mod C;该方法的关键是常数的选取，一般要求是接近或等于哈希表本身的长度，研究理论表明，该常数选素数时效果最好</blockquote>
<ul>
<li>数字分析法：该方法是取数据元素关键字中某些取值较均匀的数字来作为哈希地址的方法，这样可以尽量避免冲突，但是该方法只适合于所有关键字已知的情况，对于想要设计出更加通用的哈希表并不适用</li>
<li>平方求和法：对当前字串转化为Unicode值，并求出这个值的平方，去平方值中间的几位为当前数字的hash值，具体取几位要取决于当前哈希表的大小。</li>
<li>分段求和法：根据当前哈希表的位数把所要插入的数值分成若干段，把若干段进行相加，舍去调最高位结果就是这个值的哈希值。</li>
</ul>
<h2 id="articleHeader2">哈希冲突的解决方案</h2>
<p>在构造哈希表时，存在这样的问题：对于两个不同的关键字，通过我们的哈希函数计算哈希地址时却得到了相同的哈希地址，我们将这种现象称为哈希冲突</p>
<p><span class="img-wrap"><img data-src="/img/bV3f92?w=783&amp;h=312" src="https://static.alili.tech/img/bV3f92?w=783&amp;h=312" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>哈希冲突主要与两个因素有关，（1）填装因子，填装因子是指哈希表中已存入的数据元素个数与哈希地址空间的大小的比值，a=n/m ; a越小，冲突的可能性就越小，相反则冲突可能性较大；但是a越小空间利用率也就越小，a越大，空间利用率越高，为了兼顾哈希冲突和存储空间利用率，通常将a控制在0.6-0.9之间，而.net中的HashTable则直接将a的最大值定义为0.72 （虽然微软官方MSDN中声明HashTable默认填装因子为1.0，但实际上都是0.72的倍数），（2）与所用的哈希函数有关，如果哈希函数得当，就可以使哈希地址尽可能的均匀分布在哈希地址空间上，从而减少冲突的产生，但一个良好的哈希函数的得来很大程度上取决于大量的实践，不过幸好前人已经总结实践了很多高效的哈希函数，可以参考大神Lucifer文章：数据结构：HahTable：   <a href="http://www.cnblogs.com/lucifer1982/archive/2008/06/18/1224319.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/lucife...</a></p>
<p>1）开放定址法</p>
<blockquote>Hi=(H(key) + di) MOD m i=1,2,...k(k&lt;=m-1)<br>其中H(key)为哈希函数；m为哈希表表长；di为增量序列。有3中增量序列：<br>1）线性探测再散列：di=1,2,3,...,m-1<br>2）二次探测再散列：di=1^2,-1^2,2^2,-2^2,....+-k^2(k&lt;=m/2)<br>3）伪随机探测再散列：di=伪随机数序列</blockquote>
<p>缺点：</p>
<p>我们可以看到一个现象：当表中i,i+1,i+2位置上已经填有记录时，下一个哈希地址为i,i+1,i+2和i+3的记录都将填入i+3的位置，这种在处理冲突过程中发生的两个第一个哈希地址不同的记录争夺同一个后继哈希地址的现象称为“二次聚集”，即在处理同义词的冲突过程中又添加了非同义词的冲突。但另一方面，用线性探测再散列处理冲突可以保证做到：只要哈希表未填满，总能找到一个不发生冲突的地址Hk。而二次探测再散列只有在哈希表长m为形如4j+3（j为整数）的素数时才可能。即开放定址法会造成二次聚集的现象，对查找不利。</p>
<p><span class="img-wrap"><img data-src="/img/bV3gaj?w=701&amp;h=312" src="https://static.alili.tech/img/bV3gaj?w=701&amp;h=312" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2)再哈希法<br>Hi = RHi（key），i=1,2,...k RHi均是不同的哈希函数，即在同义词产生地址冲突时计算另一个哈希函数地址，直到不发生冲突为止。这种方法不易产生聚集，但是增加了计算时间。</p>
<p>缺点：增加了计算时间。</p>
<p>3)链地址法（拉链法）</p>
<p>将所有关键字为同义词的记录存储在同一线性链表中。</p>
<p>优点:</p>
<p>①拉链法处理冲突简单，且无堆积现象，即非同义词决不会发生冲突，因此平均查找长度较短；<br>②由于拉链法中各链表上的结点空间是动态申请的，故它更适合于造表前无法确定表长的情况；<br>③开放定址法为减少冲突，要求装填因子α较小，故当结点规模较大时会浪费很多空间。而拉链法中可取α≥1，且结点较大时，拉链法中增加的指针域可忽略不计，因此节省空间；<br>④在用拉链法构造的散列表中，删除结点的操作易于实现。只要简单地删去链表上相应的结点即可。而对开放地址法构造的散列表，删除结点不能简单地将被删结 点的空间置为空，否则将截断在它之后填人散列表的同义词结点的查找路径。这是因为各种开放地址法中，空地址单元(即开放地址)都是查找失败的条件。因此在 用开放地址法处理冲突的散列表上执行删除操作，只能在被删结点上做删除标记，而不能真正删除结点</p>
<p>缺点：<br>拉链法的缺点是：指针需要额外的空间，故当结点规模较小时，开放定址法较为节省空间，而若将节省的指针空间用来扩大散列表的规模，可使装填因子变小，这又减少了开放定址法中的冲突，从而提高平均查找速度</p>
<p><span class="img-wrap"><img data-src="/img/bV3gav?w=816&amp;h=316" src="https://static.alili.tech/img/bV3gav?w=816&amp;h=316" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>4)建立一个公共溢出区<br>假设哈希函数的值域为[0,m-1]，则设向量HashTable[0...m-1]为基本表，每个分量存放一个记录，另设立向量OverTable[0....v]为溢出表。所有关键字和基本表中关键字为同义词的记录，不管他们由哈希函数得到的哈希地址是什么，一旦发生冲突，都填入溢出表。</p>
<p>一个简单哈希函数不做冲突处理的哈希表实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// by 司徒正美
class Hash{
    constructor(){
        this.table = new Array(1024);
    }
    hash(data) {
    //就将字符串中的每个字符的ASCLL码值相加起来，再对数组的长度取余
        var total = 0;
        for(var i = 0; i < data.length; i++) {
            total += data.charCodeAt(i);
        }
        console.log(&quot;Hash Value: &quot; +data+ &quot; -> &quot; +total);
        return total % this.table.length;
    }
    insert(key, val){
        var pos = this.hash(key);
        this.table[pos] = val;
    }
    get(key){
        var pos = this.hash(key);
        return this.table[pos] 
    }
    show(){
        for(var i = 0; i < this.table.length; i++) {
            if(this.table[i] != undefined) {
                console.log(i + &quot;:&quot; +this.table[i]);
            }
        }
    }
    }
    var someNames = [&quot;David&quot;,&quot;Jennifer&quot;,&quot;Donnie&quot;,&quot;Raymond&quot;,&quot;Cynthia&quot;,&quot;Mike&quot;,&quot;Clayton&quot;,&quot;Danny&quot;,&quot;Jonathan&quot;];
    var hash = new Hash();
    for(var i = 0; i < someNames.length; ++i) {
    hash.insert(someNames[i],someNames[i]);
    }
    
    hash.show(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// by 司徒正美</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hash</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.table = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1024</span>);
    }
    hash(data) {
    <span class="hljs-comment">//就将字符串中的每个字符的ASCLL码值相加起来，再对数组的长度取余</span>
        <span class="hljs-keyword">var</span> total = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; data.length; i++) {
            total += data.charCodeAt(i);
        }
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hash Value: "</span> +data+ <span class="hljs-string">" -&gt; "</span> +total);
        <span class="hljs-keyword">return</span> total % <span class="hljs-keyword">this</span>.table.length;
    }
    insert(key, val){
        <span class="hljs-keyword">var</span> pos = <span class="hljs-keyword">this</span>.hash(key);
        <span class="hljs-keyword">this</span>.table[pos] = val;
    }
    get(key){
        <span class="hljs-keyword">var</span> pos = <span class="hljs-keyword">this</span>.hash(key);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.table[pos] 
    }
    show(){
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.table.length; i++) {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.table[i] != <span class="hljs-literal">undefined</span>) {
                <span class="hljs-built_in">console</span>.log(i + <span class="hljs-string">":"</span> +<span class="hljs-keyword">this</span>.table[i]);
            }
        }
    }
    }
    <span class="hljs-keyword">var</span> someNames = [<span class="hljs-string">"David"</span>,<span class="hljs-string">"Jennifer"</span>,<span class="hljs-string">"Donnie"</span>,<span class="hljs-string">"Raymond"</span>,<span class="hljs-string">"Cynthia"</span>,<span class="hljs-string">"Mike"</span>,<span class="hljs-string">"Clayton"</span>,<span class="hljs-string">"Danny"</span>,<span class="hljs-string">"Jonathan"</span>];
    <span class="hljs-keyword">var</span> hash = <span class="hljs-keyword">new</span> Hash();
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; someNames.length; ++i) {
    hash.insert(someNames[i],someNames[i]);
    }
    
    hash.show(); </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3gfL?w=834&amp;h=650" src="https://static.alili.tech/img/bV3gfL?w=834&amp;h=650" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>采用的是平方取中法构建哈希函数，开放地址法线性探测法进行解决冲突。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Hash{
    constructor(){
        this.table = new Array(1000);
    }
    hash(data) {
        var total = 0;
        for(var i = 0; i < data.length; i++) {
            total += data.charCodeAt(i);
        }
            //把字符串转化为字符用来求和之后进行平方运算
        var s = total * total + &quot;&quot;
            //保留中间2位
        var index = s.charAt( s.length/2 -1) *10 + s.charAt( s.length/2  ) * 1
        console.log(&quot;Hash Value: &quot; +data+ &quot; -> &quot; +index);
        return index;
    }
    solveClash(index, value){
        var table = this.table
        //进行线性开放地址法解决冲突
        for(var i=0; index+i<1000;i++){
            if(table[index+i] == null){
                table[index+i] = value;
                break;
            }
        }
    }
    insert(key, val){
        var index = this.hash(key);
        //把取中当做哈希表中索引
        if(this.table[index] == null){
            this.table[index] = val;
        }else{
            this.solveClash(index, val);
        }
    }
    get(key){
        var pos = this.hash(key);
        return this.table[pos] 
    }
    show(){
        for(var i = 0; i < this.table.length; i++) {
            if(this.table[i] != undefined) {
                console.log(i + &quot;:&quot; +this.table[i]);
            }
        }
    }
}
var someNames = [&quot;David&quot;,&quot;Jennifer&quot;,&quot;Donnie&quot;,&quot;Raymond&quot;,&quot;Cynthia&quot;,&quot;Mike&quot;,&quot;Clayton&quot;,&quot;Danny&quot;,&quot;Jonathan&quot;];
var hash = new Hash();
for(var i = 0; i < someNames.length; ++i) {
    hash.insert(someNames[i],someNames[i]);
}

hash.show(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hash</span></span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-keyword">this</span>.table = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">1000</span>);
    }
    hash(data) {
        <span class="hljs-keyword">var</span> total = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; data.length; i++) {
            total += data.charCodeAt(i);
        }
            <span class="hljs-comment">//把字符串转化为字符用来求和之后进行平方运算</span>
        <span class="hljs-keyword">var</span> s = total * total + <span class="hljs-string">""</span>
            <span class="hljs-comment">//保留中间2位</span>
        <span class="hljs-keyword">var</span> index = s.charAt( s.length/<span class="hljs-number">2</span> <span class="hljs-number">-1</span>) *<span class="hljs-number">10</span> + s.charAt( s.length/<span class="hljs-number">2</span>  ) * <span class="hljs-number">1</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hash Value: "</span> +data+ <span class="hljs-string">" -&gt; "</span> +index);
        <span class="hljs-keyword">return</span> index;
    }
    solveClash(index, value){
        <span class="hljs-keyword">var</span> table = <span class="hljs-keyword">this</span>.table
        <span class="hljs-comment">//进行线性开放地址法解决冲突</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; index+i&lt;<span class="hljs-number">1000</span>;i++){
            <span class="hljs-keyword">if</span>(table[index+i] == <span class="hljs-literal">null</span>){
                table[index+i] = value;
                <span class="hljs-keyword">break</span>;
            }
        }
    }
    insert(key, val){
        <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.hash(key);
        <span class="hljs-comment">//把取中当做哈希表中索引</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.table[index] == <span class="hljs-literal">null</span>){
            <span class="hljs-keyword">this</span>.table[index] = val;
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">this</span>.solveClash(index, val);
        }
    }
    get(key){
        <span class="hljs-keyword">var</span> pos = <span class="hljs-keyword">this</span>.hash(key);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.table[pos] 
    }
    show(){
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.table.length; i++) {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.table[i] != <span class="hljs-literal">undefined</span>) {
                <span class="hljs-built_in">console</span>.log(i + <span class="hljs-string">":"</span> +<span class="hljs-keyword">this</span>.table[i]);
            }
        }
    }
}
<span class="hljs-keyword">var</span> someNames = [<span class="hljs-string">"David"</span>,<span class="hljs-string">"Jennifer"</span>,<span class="hljs-string">"Donnie"</span>,<span class="hljs-string">"Raymond"</span>,<span class="hljs-string">"Cynthia"</span>,<span class="hljs-string">"Mike"</span>,<span class="hljs-string">"Clayton"</span>,<span class="hljs-string">"Danny"</span>,<span class="hljs-string">"Jonathan"</span>];
<span class="hljs-keyword">var</span> hash = <span class="hljs-keyword">new</span> Hash();
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; someNames.length; ++i) {
    hash.insert(someNames[i],someNames[i]);
}

hash.show(); </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3gjB?w=562&amp;h=652" src="https://static.alili.tech/img/bV3gjB?w=562&amp;h=652" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">几种常见的hash函数</h2>
<h3 id="articleHeader4">DJBHash</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="unsigned int DJBHash(char *str)    
{    
    unsigned int hash = 5381;    
     
    while (*str){    
        hash = ((hash << 5) + hash) + (*str++); /* times 33 */    
    }    
    hash &amp;= ~(1 << 31); /* strip the highest bit */    
    return hash;    
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="cpp hljs"><code class="cpp"><span class="hljs-function"><span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">int</span> <span class="hljs-title">DJBHash</span><span class="hljs-params">(<span class="hljs-keyword">char</span> *str)</span>    
</span>{    
    <span class="hljs-keyword">unsigned</span> <span class="hljs-keyword">int</span> hash = <span class="hljs-number">5381</span>;    
     
    <span class="hljs-keyword">while</span> (*str){    
        hash = ((hash &lt;&lt; <span class="hljs-number">5</span>) + hash) + (*str++); <span class="hljs-comment">/* times 33 */</span>    
    }    
    hash &amp;= ~(<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">31</span>); <span class="hljs-comment">/* strip the highest bit */</span>    
    <span class="hljs-keyword">return</span> hash;    
}
</code></pre>
<p>javascript版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function DJBHash(str)    {    
    var hash = 5381;   
    var len = str.length , i = 0
     
    while (len--){    
        hash = (hash << 5) + hash + str.charCodeAt(i++); /* times 33 */    
    }    
    hash &amp;= ~(1 << 31); /* strip the highest bit */    
    return hash;    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DJBHash</span>(<span class="hljs-params">str</span>)    </span>{    
    <span class="hljs-keyword">var</span> hash = <span class="hljs-number">5381</span>;   
    <span class="hljs-keyword">var</span> len = str.length , i = <span class="hljs-number">0</span>
     
    <span class="hljs-keyword">while</span> (len--){    
        hash = (hash &lt;&lt; <span class="hljs-number">5</span>) + hash + str.charCodeAt(i++); <span class="hljs-comment">/* times 33 */</span>    
    }    
    hash &amp;= ~(<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">31</span>); <span class="hljs-comment">/* strip the highest bit */</span>    
    <span class="hljs-keyword">return</span> hash;    
}</code></pre>
<h3 id="articleHeader5">JS</h3>
<p>Justin Sobel写的一个位操作的哈希函数。<br>原版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public long JSHash(String str)  
   {  
      long hash = 1315423911;  
      for(int i = 0; i < str.length(); i++)  
      {  
         hash ^= ((hash << 5) + str.charAt(i) + (hash >> 2));  
      }  
      return hash;  
   }  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">long</span> JSHash(<span class="hljs-keyword">String</span> <span class="hljs-built_in">str</span>)  
   {  
      <span class="hljs-keyword">long</span> hash = <span class="hljs-number">1315423911</span>;  
      <span class="hljs-keyword">for</span>(<span class="hljs-built_in">int</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">str</span>.length(); i++)  
      {  
         hash ^= ((hash &lt;&lt; <span class="hljs-number">5</span>) + <span class="hljs-built_in">str</span>.charAt(i) + (hash &gt;&gt; <span class="hljs-number">2</span>));  
      }  
      <span class="hljs-keyword">return</span> hash;  
   }  </code></pre>
<p>javascript版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function JSHash(str)  {  
      var hash = 1315423911;  
      for(var i = 0; i < str.length; i++)  {  
         hash ^= ((hash << 5) + str.charCodeAt(i) + (hash >> 2));  
      }  
      return hash;  
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">JSHash</span><span class="hljs-params">(str)</span>  {  </span>
      var hash = <span class="hljs-number">1315423911</span>;  
      <span class="hljs-keyword">for</span>(var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; str.<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span>++)  {  
         hash ^= ((hash &lt;&lt; <span class="hljs-number">5</span>) + str.charCodeAt(i) + (hash &gt;&gt; <span class="hljs-number">2</span>));  
      }  
      <span class="hljs-keyword">return</span> hash;  
}  </code></pre>
<h3 id="articleHeader6">PJW</h3>
<p>该散列算法是基于贝尔实验室的彼得J温伯格的的研究。在Compilers一书中（原则，技术和工具），建议采用这个算法的散列函数的哈希方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public long PJWHash(String str)  
   {  
      long BitsInUnsignedInt = (long)(4 * 8);  
      long ThreeQuarters     = (long)((BitsInUnsignedInt  * 3) / 4);  
      long OneEighth         = (long)(BitsInUnsignedInt / 8);  
      long HighBits          = (long)(0xFFFFFFFF) << (BitsInUnsignedInt - OneEighth);  
      long hash              = 0;  
      long test              = 0;  
      for(int i = 0; i < str.length(); i++)  
      {  
         hash = (hash << OneEighth) + str.charAt(i);  
         if((test = hash &amp; HighBits)  != 0)  
         {  
            hash = (( hash ^ (test >> ThreeQuarters)) &amp; (~HighBits));  
         }  
      }  
      return hash;  
   }  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">long</span> <span class="hljs-title">PJWHash</span><span class="hljs-params">(String str)</span>  
   </span>{  
      <span class="hljs-keyword">long</span> BitsInUnsignedInt = (<span class="hljs-keyword">long</span>)(<span class="hljs-number">4</span> * <span class="hljs-number">8</span>);  
      <span class="hljs-keyword">long</span> ThreeQuarters     = (<span class="hljs-keyword">long</span>)((BitsInUnsignedInt  * <span class="hljs-number">3</span>) / <span class="hljs-number">4</span>);  
      <span class="hljs-keyword">long</span> OneEighth         = (<span class="hljs-keyword">long</span>)(BitsInUnsignedInt / <span class="hljs-number">8</span>);  
      <span class="hljs-keyword">long</span> HighBits          = (<span class="hljs-keyword">long</span>)(<span class="hljs-number">0xFFFFFFFF</span>) &lt;&lt; (BitsInUnsignedInt - OneEighth);  
      <span class="hljs-keyword">long</span> hash              = <span class="hljs-number">0</span>;  
      <span class="hljs-keyword">long</span> test              = <span class="hljs-number">0</span>;  
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; str.length(); i++)  
      {  
         hash = (hash &lt;&lt; OneEighth) + str.charAt(i);  
         <span class="hljs-keyword">if</span>((test = hash &amp; HighBits)  != <span class="hljs-number">0</span>)  
         {  
            hash = (( hash ^ (test &gt;&gt; ThreeQuarters)) &amp; (~HighBits));  
         }  
      }  
      <span class="hljs-keyword">return</span> hash;  
   }  </code></pre>
<p>javascript版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function PJWHash( str)  {  
      var BitsInUnsignedInt = 4 * 8;  
      var ThreeQuarters     =  (BitsInUnsignedInt  * 3) / 4;  
      var OneEighth         = (BitsInUnsignedInt / 8);  
      var HighBits          = (0xFFFFFFFF) << (BitsInUnsignedInt - OneEighth);  
      var hash              = 0;  
      var test              = 0;  
      for(var i = 0; i < str.length; i++)  {  
         hash = (hash << OneEighth) + str.charCodeAt(i);  
         if((test = hash &amp; HighBits)  != 0)  
         {  
            hash = (( hash ^ (test >> ThreeQuarters)) &amp; (~HighBits));  
         }  
      }  
      return hash;  
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PJWHash</span>(<span class="hljs-params"> str</span>)  </span>{  
      <span class="hljs-keyword">var</span> BitsInUnsignedInt = <span class="hljs-number">4</span> * <span class="hljs-number">8</span>;  
      <span class="hljs-keyword">var</span> ThreeQuarters     =  (BitsInUnsignedInt  * <span class="hljs-number">3</span>) / <span class="hljs-number">4</span>;  
      <span class="hljs-keyword">var</span> OneEighth         = (BitsInUnsignedInt / <span class="hljs-number">8</span>);  
      <span class="hljs-keyword">var</span> HighBits          = (<span class="hljs-number">0xFFFFFFFF</span>) &lt;&lt; (BitsInUnsignedInt - OneEighth);  
      <span class="hljs-keyword">var</span> hash              = <span class="hljs-number">0</span>;  
      <span class="hljs-keyword">var</span> test              = <span class="hljs-number">0</span>;  
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; str.length; i++)  {  
         hash = (hash &lt;&lt; OneEighth) + str.charCodeAt(i);  
         <span class="hljs-keyword">if</span>((test = hash &amp; HighBits)  != <span class="hljs-number">0</span>)  
         {  
            hash = (( hash ^ (test &gt;&gt; ThreeQuarters)) &amp; (~HighBits));  
         }  
      }  
      <span class="hljs-keyword">return</span> hash;  
} </code></pre>
<p>如果将上面的哈表的hash函数改成这个，打印如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3gpD?w=534&amp;h=684" src="https://static.alili.tech/img/bV3gpD?w=534&amp;h=684" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>性能会大幅下隆，因为这让我们的table数组表得非常庞大。</p>
<h3 id="articleHeader7">ELF</h3>
<p>和PJW很相似，在Unix系统中使用的较多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public long ELFHash(String str)  
   {  
      long hash = 0;  
      long x    = 0;  
      for(int i = 0; i < str.length(); i++)  
      {  
         hash = (hash << 4) + str.charAt(i);  
         if((x = hash &amp; 0xF0000000L) != 0)  
         {  
            hash ^= (x >> 24);  
         }  
         hash &amp;= ~x;  
      }  
      return hash;  
   }  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">long</span> <span class="hljs-title">ELFHash</span><span class="hljs-params">(String str)</span>  
   </span>{  
      <span class="hljs-keyword">long</span> hash = <span class="hljs-number">0</span>;  
      <span class="hljs-keyword">long</span> x    = <span class="hljs-number">0</span>;  
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; str.length(); i++)  
      {  
         hash = (hash &lt;&lt; <span class="hljs-number">4</span>) + str.charAt(i);  
         <span class="hljs-keyword">if</span>((x = hash &amp; <span class="hljs-number">0xF0000000L</span>) != <span class="hljs-number">0</span>)  
         {  
            hash ^= (x &gt;&gt; <span class="hljs-number">24</span>);  
         }  
         hash &amp;= ~x;  
      }  
      <span class="hljs-keyword">return</span> hash;  
   }  </code></pre>
<h3 id="articleHeader8">BKDR</h3>
<p>这个算法来自Brian Kernighan 和 Dennis Ritchie的 The C Programming Language。这是一个很简单的哈希算法,使用了一系列奇怪的数字,形式如31,3131,31...31,看上去和DJB算法很相似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public long BKDRHash(String str)  
   {  
      long seed = 131; // 31 131 1313 13131 131313 etc..  
      long hash = 0;  
      for(int i = 0; i < str.length(); i++)  
      {  
         hash = (hash * seed) + str.charAt(i);  
      }  
      return hash;  
   }  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">long</span> <span class="hljs-title">BKDRHash</span><span class="hljs-params">(String str)</span>  
   </span>{  
      <span class="hljs-keyword">long</span> seed = <span class="hljs-number">131</span>; <span class="hljs-comment">// 31 131 1313 13131 131313 etc..  </span>
      <span class="hljs-keyword">long</span> hash = <span class="hljs-number">0</span>;  
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; str.length(); i++)  
      {  
         hash = (hash * seed) + str.charAt(i);  
      }  
      <span class="hljs-keyword">return</span> hash;  
   }  </code></pre>
<h3 id="articleHeader9">SDBM</h3>
<p>这个算法在开源的SDBM中使用，似乎对很多不同类型的数据都能得到不错的分布。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public long SDBMHash(String str)  
   {  
      long hash = 0;  
      for(int i = 0; i < str.length(); i++)  
      {  
         hash = str.charAt(i) + (hash << 6) + (hash << 16) - hash;  
      }  
      return hash;  
   }  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">long</span> <span class="hljs-title">SDBMHash</span><span class="hljs-params">(String str)</span>  
   </span>{  
      <span class="hljs-keyword">long</span> hash = <span class="hljs-number">0</span>;  
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; str.length(); i++)  
      {  
         hash = str.charAt(i) + (hash &lt;&lt; <span class="hljs-number">6</span>) + (hash &lt;&lt; <span class="hljs-number">16</span>) - hash;  
      }  
      <span class="hljs-keyword">return</span> hash;  
   }  </code></pre>
<h3 id="articleHeader10">DJB</h3>
<p>这个算法是Daniel J.Bernstein 教授发明的，是目前公布的最有效的哈希函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public long DJBHash(String str)  
   {  
      long hash = 5381;  
      for(int i = 0; i < str.length(); i++)  
      {  
         hash = ((hash << 5) + hash) + str.charAt(i);  
      }  
      return hash;  
   }  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">long</span> <span class="hljs-title">DJBHash</span><span class="hljs-params">(String str)</span>  
   </span>{  
      <span class="hljs-keyword">long</span> hash = <span class="hljs-number">5381</span>;  
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; str.length(); i++)  
      {  
         hash = ((hash &lt;&lt; <span class="hljs-number">5</span>) + hash) + str.charAt(i);  
      }  
      <span class="hljs-keyword">return</span> hash;  
   }  </code></pre>
<h3 id="articleHeader11">DEK</h3>
<p>由伟大的Knuth在《编程的艺术 第三卷》的第六章排序和搜索中给出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public long DEKHash(String str)  
   {  
      long hash = str.length();  
      for(int i = 0; i < str.length(); i++)  
      {  
         hash = ((hash << 5) ^ (hash >> 27)) ^ str.charAt(i);  
      }  
      return hash;  
   }  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">long</span> <span class="hljs-title">DEKHash</span><span class="hljs-params">(String str)</span>  
   </span>{  
      <span class="hljs-keyword">long</span> hash = str.length();  
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; str.length(); i++)  
      {  
         hash = ((hash &lt;&lt; <span class="hljs-number">5</span>) ^ (hash &gt;&gt; <span class="hljs-number">27</span>)) ^ str.charAt(i);  
      }  
      <span class="hljs-keyword">return</span> hash;  
   }  </code></pre>
<h3 id="articleHeader12">AP</h3>
<p>由Arash Partow贡献的一个哈希函数，继承了上面以旋转以为和加操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public long APHash(String str)  
{  
      long hash = 0xAAAAAAAA;  
      for(int i = 0; i < str.length(); i++)  
      {  
         if ((i &amp; 1) == 0)  
         {  
            hash ^= ((hash << 7) ^ str.charAt(i) * (hash >> 3));  
         }  
         else  
         {  
            hash ^= (~((hash << 11) + str.charAt(i) ^ (hash >> 5)));  
         }  
      }  
      return hash;  
   }   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">long</span> <span class="hljs-title">APHash</span><span class="hljs-params">(String str)</span>  
</span>{  
      <span class="hljs-keyword">long</span> hash = <span class="hljs-number">0xAAAAAAAA</span>;  
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; str.length(); i++)  
      {  
         <span class="hljs-keyword">if</span> ((i &amp; <span class="hljs-number">1</span>) == <span class="hljs-number">0</span>)  
         {  
            hash ^= ((hash &lt;&lt; <span class="hljs-number">7</span>) ^ str.charAt(i) * (hash &gt;&gt; <span class="hljs-number">3</span>));  
         }  
         <span class="hljs-keyword">else</span>  
         {  
            hash ^= (~((hash &lt;&lt; <span class="hljs-number">11</span>) + str.charAt(i) ^ (hash &gt;&gt; <span class="hljs-number">5</span>)));  
         }  
      }  
      <span class="hljs-keyword">return</span> hash;  
   }   </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3gr6?w=1544&amp;h=836" src="https://static.alili.tech/img/bV3gr6?w=1544&amp;h=836" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>其中数据1为100000个字母和数字组成的随机串哈希冲突个数。数据2为100000个有意义的英文句子哈希冲突个数。数据3为数据1的哈希值与 1000003(大素数)求模后存储到线性表中冲突的个数。数据4为数据1的哈希值与10000019(更大素数)求模后存储到线性表中冲突的个数。</p>
<p>经过比较，得出以上平均得分。平均数为平方平均数。可以发现，BKDRHash无论是在实际效果还是编码实现中，效果都是最突出的。APHash也是较为优秀的算法。DJBHash,JSHash,RSHash与SDBMHash各有千秋。PJWHash与ELFHash效果最差，但得分相似，其算法本质是相似的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript 哈希表

## 原文链接
[https://segmentfault.com/a/1190000013132249](https://segmentfault.com/a/1190000013132249)

