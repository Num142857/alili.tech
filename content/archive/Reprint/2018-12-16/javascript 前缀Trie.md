---
title: 'javascript 前缀Trie' 
date: 2018-12-16 2:30:10
hidden: true
slug: 1ikf3jh0hjn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引子</h2>
<p>前缀Trie, 又叫字符Tire, trie来自单词retrieval, 一开始念作tree，后来改念try， 毕竟它与树是不一样的东西。网上许多文章都搞混了trie与树。 trie是通过”边“来储存字符的一种树状结构，所谓边就是节点与节点间的连接。trie每条边只能存放一个字符。</p>
<p><span class="img-wrap"><img data-src="/img/bV2MZW?w=388&amp;h=325" src="https://static.alili.tech/img/bV2MZW?w=388&amp;h=325" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>它与hash树很相似，或者说它是哈希树的变种，哈希树是用边来存放一个整数（可以是一位数或两位数）。前树Tire与哈希树都是多叉树，换言之，父节点有N个子节点。</p>
<p>前缀Tire主要用于字符串的快速检索，查询效率比哈希表高。</p>
<p>前缀Trie的核心思想是空间换时间。利用字符串的公共前缀来降低查询时间的开销以达到提高效率的目的。</p>
<p>前缀Trie树也有它的缺点, 假定我们只对字母与数字进行处理，那么每个节点至少有52＋10个子节点。为了节省内存，我们可以用链表或数组。在JS中我们直接用数组，因为JS的数组是动态的，自带优化。</p>
<h2 id="articleHeader1">基本性质</h2>
<ol>
<li>根节点不包含字符，除根节点外的每一个子节点都包含一个字符</li>
<li>从根节点到某一节点。路径上经过的字符连接起来，就是该节点对应的字符串</li>
<li>每个节点的所有子节点包含的字符都不相同</li>
</ol>
<h2 id="articleHeader2">程序实现</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// by 司徒正美
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  isValid(str) {
    return /^[a-z1-9]+$/i.test(str);
  }
  insert(word) {
    // addWord
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c -= 48; //减少”0“的charCode
        var node = cur.edges[c];
        if (node == null) {
          var node = (cur.edges[c] = new TrieNode());
          node.value = word.charAt(i);
          node.numPass = 1; //有N个字符串经过它
        } else {
          node.numPass++;
        }
        cur = node;
      }
      cur.isEnd = true; //樯记有字符串到此节点已经结束
      cur.numEnd++; //这个字符串重复次数

      return true;
    } else {
      return false;
    }
  }
  remove(word){
      if (this.isValid(word)) {
          var cur = this.root;
          var array = [], n = word.length
          for (var i = 0; i < n; i++) {
              var c = word.charCodeAt(i);
              c = this.getIndex(c)
              var node = cur.edges[c];
              if(node){
                  array.push(node)
                  cur = node
              }else{
                  return false
              }
  
          }
          if(array.length === n){
              array.forEach(function(){
                  el.numPass--
              })
              cur.numEnd --
              if( cur.numEnd == 0){
                  cur.isEnd = false
              } 
          }
      }else{
          return false
      }
  }
  preTraversal(cb){//先序遍历
        function preTraversalImpl(root, str, cb){  
            cb(root, str);
            for(let i = 0,n = root.edges.length; i < n; i ++){
                let node = root.edges[i];
                if(node){
                    preTraversalImpl(node, str + node.value, cb);
                }
            }
        }  
        preTraversalImpl(this.root, &quot;&quot;, cb);
   }
  // 在字典树中查找是否存在某字符串为前缀开头的字符串(包括前缀字符串本身)
  isContainPrefix(word) {
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c -= 48; //减少”0“的charCode
        if (cur.edges[c]) {
          cur = cur.edges[c];
        } else {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  isContainWord(str) {
    // 在字典树中查找是否存在某字符串(不为前缀)
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c -= 48; //减少”0“的charCode
        if (cur.edges[c]) {
          cur = cur.edges[c];
        } else {
          return false;
        }
      }
      return cur.isEnd;
    } else {
      return false;
    }
  }
  countPrefix(word) {
    // 统计以指定字符串为前缀的字符串数量
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c -= 48; //减少”0“的charCode
        if (cur.edges[c]) {
          cur = cur.edges[c];
        } else {
          return 0;
        }
      }
      return cur.numPass;
    } else {
      return 0;
    }
  }
  countWord(word) {
    // 统计某字符串出现的次数方法
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c -= 48; //减少”0“的charCode
        if (cur.edges[c]) {
          cur = cur.edges[c];
        } else {
          return 0;
        }
      }
      return cur.numEnd;
    } else {
      return 0;
    }
  }
}

class TrieNode {
  constructor() {
    this.numPass = 0;//有多少个单词经过这节点
    this.numEnd = 0; //有多少个单词就此结束
    this.edges = [];
    this.value = &quot;&quot;; //value为单个字符
    this.isEnd = false;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// by 司徒正美</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Trie</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.root = new TrieNode();
  }
  isValid(str) {
    <span class="hljs-keyword">return</span> /^[a-z1<span class="hljs-number">-9</span>]+$/i.test(str);
  }
  insert(word) {
    <span class="hljs-comment">// addWord</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isValid(word)) {
      <span class="hljs-keyword">var</span> cur = <span class="hljs-keyword">this</span>.root;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; word.length; i++) {
        <span class="hljs-keyword">var</span> c = word.charCodeAt(i);
        c -= <span class="hljs-number">48</span>; <span class="hljs-comment">//减少”0“的charCode</span>
        <span class="hljs-keyword">var</span> node = cur.edges[c];
        <span class="hljs-keyword">if</span> (node == <span class="hljs-literal">null</span>) {
          <span class="hljs-keyword">var</span> node = (cur.edges[c] = new TrieNode());
          node.value = word.charAt(i);
          node.numPass = <span class="hljs-number">1</span>; <span class="hljs-comment">//有N个字符串经过它</span>
        } <span class="hljs-keyword">else</span> {
          node.numPass++;
        }
        cur = node;
      }
      cur.isEnd = <span class="hljs-literal">true</span>; <span class="hljs-comment">//樯记有字符串到此节点已经结束</span>
      cur.numEnd++; <span class="hljs-comment">//这个字符串重复次数</span>

      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }
  remove(word){
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isValid(word)) {
          <span class="hljs-keyword">var</span> cur = <span class="hljs-keyword">this</span>.root;
          <span class="hljs-keyword">var</span> array = [], n = word.length
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
              <span class="hljs-keyword">var</span> c = word.charCodeAt(i);
              c = <span class="hljs-keyword">this</span>.getIndex(c)
              <span class="hljs-keyword">var</span> node = cur.edges[c];
              <span class="hljs-keyword">if</span>(node){
                  array.push(node)
                  cur = node
              }<span class="hljs-keyword">else</span>{
                  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
              }
  
          }
          <span class="hljs-keyword">if</span>(array.length === n){
              array.forEach(function(){
                  el.numPass--
              })
              cur.numEnd --
              <span class="hljs-keyword">if</span>( cur.numEnd == <span class="hljs-number">0</span>){
                  cur.isEnd = <span class="hljs-literal">false</span>
              } 
          }
      }<span class="hljs-keyword">else</span>{
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      }
  }
  preTraversal(cb){<span class="hljs-comment">//先序遍历</span>
        function preTraversalImpl(root, str, cb){  
            cb(root, str);
            <span class="hljs-keyword">for</span>(let i = <span class="hljs-number">0</span>,n = root.edges.length; i &lt; n; i ++){
                let node = root.edges[i];
                <span class="hljs-keyword">if</span>(node){
                    preTraversalImpl(node, str + node.value, cb);
                }
            }
        }  
        preTraversalImpl(<span class="hljs-keyword">this</span>.root, <span class="hljs-string">""</span>, cb);
   }
  <span class="hljs-comment">// 在字典树中查找是否存在某字符串为前缀开头的字符串(包括前缀字符串本身)</span>
  isContainPrefix(word) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isValid(word)) {
      <span class="hljs-keyword">var</span> cur = <span class="hljs-keyword">this</span>.root;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; word.length; i++) {
        <span class="hljs-keyword">var</span> c = word.charCodeAt(i);
        c -= <span class="hljs-number">48</span>; <span class="hljs-comment">//减少”0“的charCode</span>
        <span class="hljs-keyword">if</span> (cur.edges[c]) {
          cur = cur.edges[c];
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }
  isContainWord(str) {
    <span class="hljs-comment">// 在字典树中查找是否存在某字符串(不为前缀)</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isValid(word)) {
      <span class="hljs-keyword">var</span> cur = <span class="hljs-keyword">this</span>.root;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; word.length; i++) {
        <span class="hljs-keyword">var</span> c = word.charCodeAt(i);
        c -= <span class="hljs-number">48</span>; <span class="hljs-comment">//减少”0“的charCode</span>
        <span class="hljs-keyword">if</span> (cur.edges[c]) {
          cur = cur.edges[c];
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
      }
      <span class="hljs-keyword">return</span> cur.isEnd;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }
  countPrefix(word) {
    <span class="hljs-comment">// 统计以指定字符串为前缀的字符串数量</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isValid(word)) {
      <span class="hljs-keyword">var</span> cur = <span class="hljs-keyword">this</span>.root;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; word.length; i++) {
        <span class="hljs-keyword">var</span> c = word.charCodeAt(i);
        c -= <span class="hljs-number">48</span>; <span class="hljs-comment">//减少”0“的charCode</span>
        <span class="hljs-keyword">if</span> (cur.edges[c]) {
          cur = cur.edges[c];
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
        }
      }
      <span class="hljs-keyword">return</span> cur.numPass;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    }
  }
  countWord(word) {
    <span class="hljs-comment">// 统计某字符串出现的次数方法</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isValid(word)) {
      <span class="hljs-keyword">var</span> cur = <span class="hljs-keyword">this</span>.root;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; word.length; i++) {
        <span class="hljs-keyword">var</span> c = word.charCodeAt(i);
        c -= <span class="hljs-number">48</span>; <span class="hljs-comment">//减少”0“的charCode</span>
        <span class="hljs-keyword">if</span> (cur.edges[c]) {
          cur = cur.edges[c];
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
        }
      }
      <span class="hljs-keyword">return</span> cur.numEnd;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    }
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TrieNode</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.numPass = <span class="hljs-number">0</span>;<span class="hljs-comment">//有多少个单词经过这节点</span>
    <span class="hljs-keyword">this</span>.numEnd = <span class="hljs-number">0</span>; <span class="hljs-comment">//有多少个单词就此结束</span>
    <span class="hljs-keyword">this</span>.edges = [];
    <span class="hljs-keyword">this</span>.value = <span class="hljs-string">""</span>; <span class="hljs-comment">//value为单个字符</span>
    <span class="hljs-keyword">this</span>.isEnd = <span class="hljs-literal">false</span>;
  }
}</code></pre>
<p>我们重点看一下TrieNode与Trie的insert方法。 由于字典树是主要用在词频统计，因此它的节点属性比较多, 包含了numPass, numEnd但非常重要的属性。</p>
<p>insert方法是用于插入重词，在开始之前，我们必须判定单词是否合法，不能出现 特殊字符与空白。在插入时是打散了一个个字符放入每个节点中。每经过一个节点都要修改numPass。</p>
<h2 id="articleHeader3">优化</h2>
<p>现在我们每个方法中，都有一个<code>c=-48</code>的操作，其实数字与大写字母与小写字母间其实还有其他字符的，这样会造成无谓的空间的浪费</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// by 司徒正美
getIndex(c){
      if(c < 58){//48-57
          return c - 48
      }else if(c < 91){//65-90
          return c - 65 + 11
      }else {//> 97 
          return c - 97 + 26+ 11
      }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-comment">// by 司徒正美</span>
getIndex(<span class="hljs-built_in">c</span>){
      <span class="hljs-keyword">if</span>(<span class="hljs-built_in">c</span> &lt; <span class="hljs-number">58</span>){<span class="hljs-comment">//48-57</span>
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">c</span> - <span class="hljs-number">48</span>
      }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">c</span> &lt; <span class="hljs-number">91</span>){<span class="hljs-comment">//65-90</span>
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">c</span> - <span class="hljs-number">65</span> + <span class="hljs-number">11</span>
      }<span class="hljs-keyword">else</span> {<span class="hljs-comment">//&gt; 97 </span>
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">c</span> - <span class="hljs-number">97</span> + <span class="hljs-number">26</span>+ <span class="hljs-number">11</span>
      }
  }
</code></pre>
<p>然后相关方法将<code>c-= 48</code>改成<code>c = this.getIndex(c)</code>即可</p>
<h2 id="articleHeader4">测试</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var trie = new Trie();  
    trie.insert(&quot;I&quot;);  
    trie.insert(&quot;Love&quot;);  
    trie.insert(&quot;China&quot;);  
    trie.insert(&quot;China&quot;);  
    trie.insert(&quot;China&quot;);  
    trie.insert(&quot;China&quot;);  
    trie.insert(&quot;China&quot;);  
    trie.insert(&quot;xiaoliang&quot;);  
    trie.insert(&quot;xiaoliang&quot;);  
    trie.insert(&quot;man&quot;);  
    trie.insert(&quot;handsome&quot;);  
    trie.insert(&quot;love&quot;);  
    trie.insert(&quot;Chinaha&quot;);  
    trie.insert(&quot;her&quot;);  
    trie.insert(&quot;know&quot;);  
    var map = {}
    trie.preTraversal(function(node, str){
       if(node.isEnd){
          map[str] = node.numEnd
       }
    })
    for(var i in map){
        console.log(i+&quot; 出现了&quot;+ map[i]+&quot; 次&quot;)
    }
    console.log(&quot;包含Chin（包括本身）前缀的单词及出现次数：&quot;);  
    //console.log(&quot;China&quot;)
    var map = {}
    trie.preTraversal(function(node, str){
        if(str.indexOf(&quot;Chin&quot;) === 0 &amp;&amp; node.isEnd){
           map[str] = node.numEnd
        }
     })
    for(var i in map){
        console.log(i+&quot; 出现了&quot;+ map[i]+&quot; 次&quot;)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>var trie = new Trie();  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"I"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"Love"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"China"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"China"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"China"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"China"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"China"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"xiaoliang"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"xiaoliang"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"man"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"handsome"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"love"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"Chinaha"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"her"</span>);  
    trie.<span class="hljs-keyword">insert</span>(<span class="hljs-string">"know"</span>);  
    var <span class="hljs-keyword">map</span> = {}
    trie.preTraversal(<span class="hljs-keyword">function</span>(node, str){
       if(node.isEnd){
          map[str] = node.numEnd
       }
    })
    <span class="hljs-keyword">for</span>(var i <span class="hljs-keyword">in</span> <span class="hljs-keyword">map</span>){
        console.log(i+<span class="hljs-string">" 出现了"</span>+ map[i]+<span class="hljs-string">" 次"</span>)
    }
    console.log(<span class="hljs-string">"包含Chin（包括本身）前缀的单词及出现次数："</span>);  
    //console.log(<span class="hljs-string">"China"</span>)
    var <span class="hljs-keyword">map</span> = {}
    trie.preTraversal(<span class="hljs-keyword">function</span>(node, str){
        if(str.indexOf(<span class="hljs-string">"Chin"</span>) === <span class="hljs-number">0</span> &amp;&amp; node.isEnd){
           map[str] = node.numEnd
        }
     })
    <span class="hljs-keyword">for</span>(var i <span class="hljs-keyword">in</span> <span class="hljs-keyword">map</span>){
        console.log(i+<span class="hljs-string">" 出现了"</span>+ map[i]+<span class="hljs-string">" 次"</span>)
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV2MWK?w=662&amp;h=688" src="https://static.alili.tech/img/bV2MWK?w=662&amp;h=688" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">前缀Trie和其它数据结构的比较</h2>
<h3 id="articleHeader6">前缀Trie与二叉搜索树</h3>
<p>二叉搜索树应该是我们最早接触的树结构了，我们知道，数据规模为n时，二叉搜索树插入、查找、删除操作的时间复杂度通常只有O(log n)，最坏情况下整棵树所有的节点都只有一个子节点，退变成一个线性表，此时插入、查找、删除操作的时间复杂度是O(n)。</p>
<p>通常情况下，前缀Trie的高度n要远大于搜索字符串的长度m，故查找操作的时间复杂度通常为O(m)，最坏情况下的时间复杂度才为O(n)。很容易看出，前缀Trie最坏情况下的查找也快过二叉搜索树。</p>
<p>文中前缀Trie都是拿字符串举例的，其实它本身对key的适宜性是有严格要求的，如果key是浮点数的话，就可能导致整个前缀Trie巨长无比，节点可读性也非常差，这种情况下是不适宜用前缀Trie来保存数据的；而二叉搜索树就不存在这个问题。</p>
<h3 id="articleHeader7">前缀Trie与Hash表</h3>
<p>   考虑一下Hash冲突的问题。Hash表通常我们说它的复杂度是O(1)，其实严格说起来这是接近完美的Hash表的复杂度，另外还需要考虑到hash函数本身需要遍历搜索字符串，复杂度是O(m)。在不同键被映射到“同一个位置”（考虑closed hashing，这“同一个位置”可以由一个普通链表来取代）的时候，需要进行查找的复杂度取决于这“同一个位置”下节点的数目，因此，在最坏情况下，Hash表也是可以成为一张单向链表的。</p>
<p>   前缀Trie可以比较方便地按照key的字母序来排序（整棵树先序遍历一次就好了），这跟绝大多数Hash表是不同的（Hash表一般对于不同的key来说是无序的）。</p>
<p>   在较理想的情况下，Hash表可以以O(1)的速度迅速命中目标，如果这张表非常大，需要放到磁盘上的话，Hash表的查找访问在理想情况下只需要一次即可；但是Trie树访问磁盘的数目需要等于节点深度。</p>
<p>   很多时候前缀Trie比Hash表需要更多的空间，我们考虑这种一个节点存放一个字符的情况的话，在保存一个字符串的时候，没有办法把它保存成一个单独的块。前缀Trie的节点压缩可以明显缓解这个问题，后面会讲到。</p>
<h2 id="articleHeader8">前缀Trie树的改进</h2>
<h3 id="articleHeader9">按位Trie树（Bitwise Trie）</h3>
<p>原理上和普通Trie树差不多，只不过普通Trie树存储的最小单位是字符，但是Bitwise Trie存放的是位而已。位数据的存取由CPU指令一次直接实现，对于二进制数据，它理论上要比普通Trie树快。</p>
<h3 id="articleHeader10">节点压缩</h3>
<p>分支压缩：将一些连结线与节点进行合并，比如i-n-n可以合并成inn。这种压缩后的Tire被唤作前缀压缩Tire，或直接叫前缀树， 字典树。</p>
<p><span class="img-wrap"><img data-src="/img/bV2SCr?w=542&amp;h=520" src="https://static.alili.tech/img/bV2SCr?w=542&amp;h=520" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>节点映射表：这种方式也是在前缀Trie的节点可能已经几乎完全确定的情况下采用的，针对前缀Trie中节点的每一个状态，如果状态总数重复很多的话，通过一个元素为数字的多维数组（比如Triple Array Trie）来表示，这样存储Trie树本身的空间开销会小一些，虽说引入了一张额外的映射表。</p>
<h2 id="articleHeader11">前缀Trie的应用</h2>
<p>前缀树还是很好理解，它的应用也是非常广的。</p>
<p>（1）字符串的快速检索</p>
<p>字典树的查询时间复杂度是O(logL)，L是字符串的长度。所以效率还是比较高的。字典树的效率比hash表高。</p>
<p>（2）字符串排序</p>
<p>从上图我们很容易看出单词是排序的，先遍历字母序在前面。减少了没必要的公共子串。</p>
<p>（3）最长公共前缀</p>
<p>inn和int的最长公共前缀是in，遍历字典树到字母n时，此时这些单词的公共前缀是in。</p>
<p>（4）自动匹配前缀显示后缀</p>
<p>我们使用辞典或者是搜索引擎的时候，输入appl，后面会自动显示一堆前缀是appl的东东吧。那么有可能是通过前缀Trie实现的，前面也说了前缀Trie可以找到公共前缀，我们只需要把剩余的后缀遍历显示出来即可。</p>
<h2 id="articleHeader12">参考链接</h2>
<ul>
<li><a href="http://blog.csdn.net/abcd_d_/article/details/40116485" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/abcd_d_/...</a></li>
<li><a href="http://blog.csdn.net/u013949069/article/details/78056102" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/u0139490...</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript 前缀Trie

## 原文链接
[https://segmentfault.com/a/1190000013018855](https://segmentfault.com/a/1190000013018855)

