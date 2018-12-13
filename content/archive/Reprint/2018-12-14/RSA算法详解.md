---
title: 'RSA算法详解' 
date: 2018-12-14 2:30:11
hidden: true
slug: c58cgg8zq99
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><strong>总括：</strong> 本文详细讲述了RSA算法详解，包括内部使用数学原理以及产生的过程。</p>
<ul>
<li>原文博客地址：<a href="http://blog.damonare.cn/2017/12/31/RSA%E7%AE%97%E6%B3%95%E8%AF%A6%E8%A7%A3/#more" rel="nofollow noreferrer" target="_blank">RSA算法详解</a>
</li>
<li>知乎专栏&amp;&amp;简书专题：<a href="https://zhuanlan.zhihu.com/damonare" rel="nofollow noreferrer" target="_blank">前端进击者（知乎）</a>&amp;&amp;<a href="http://www.jianshu.com/collection/bbaa63e264f5" rel="nofollow noreferrer" target="_blank">前端进击者（简书）</a>
</li>
<li>博主博客地址：<a href="http://damonare.cn" rel="nofollow noreferrer" target="_blank">Damonare的个人博客</a>
</li>
</ul>
<p><strong>相濡以沫。到底需要爱淡如水。</strong></p>
<h2 id="articleHeader1">正文</h2>
<p>之前写过一篇文章<a href="http://blog.damonare.cn/2017/12/29/SSL%E5%8D%8F%E8%AE%AE%E4%B9%8B%E6%95%B0%E6%8D%AE%E5%8A%A0%E5%AF%86%E8%BF%87%E7%A8%8B%E8%AF%A6%E8%A7%A3/#more" rel="nofollow noreferrer" target="_blank">SSL协议之数据加密过程</a>，里面详细讲述了数据加密的过程以及需要的算法。SSL协议很巧妙的利用对称加密和非对称加密两种算法来对数据进行加密。这篇文章主要是针对一种最常见的非对称加密算法——RSA算法进行讲解。其实也就是对私钥和公钥产生的一种方式进行描述。首先先来了解下这个算法的历史：</p>
<h3 id="articleHeader2">RSA算法的历史</h3>
<p>RSA是1977年由<a href="https://zh.wikipedia.org/wiki/%E7%BD%97%E7%BA%B3%E5%BE%B7%C2%B7%E6%9D%8E%E7%BB%B4%E6%96%AF%E7%89%B9" rel="nofollow noreferrer" target="_blank">罗纳德·李维斯特</a>（Ron Rivest）、<a href="https://zh.wikipedia.org/wiki/%E9%98%BF%E8%BF%AA%C2%B7%E8%90%A8%E8%8E%AB%E5%B0%94" rel="nofollow noreferrer" target="_blank">阿迪·萨莫尔</a>（Adi Shamir）和<a href="https://zh.wikipedia.org/wiki/%E4%BC%A6%E7%BA%B3%E5%BE%B7%C2%B7%E9%98%BF%E5%BE%B7%E6%9B%BC" rel="nofollow noreferrer" target="_blank">伦纳德·阿德曼</a>（Leonard Adleman）一起提出的。当时他们三人都在<a href="https://zh.wikipedia.org/wiki/%E9%BA%BB%E7%9C%81%E7%90%86%E5%B7%A5%E5%AD%A6%E9%99%A2" rel="nofollow noreferrer" target="_blank">麻省理工学院</a>工作。RSA就是他们三人姓氏开头字母拼在一起组成的。</p>
<p>但实际上，在1973年，在英国政府通讯总部工作的数学家<a href="https://zh.wikipedia.org/w/index.php?title=%E5%85%8B%E5%88%A9%E7%A6%8F%E5%BE%B7%C2%B7%E6%9F%AF%E5%85%8B%E6%96%AF&amp;action=edit&amp;redlink=1" rel="nofollow noreferrer" target="_blank">克利福德·柯克斯</a>（Clifford Cocks）在一个内部文件中提出了一个相同的算法，但他的发现被列入机密，一直到1997年才被发表。</p>
<p>所以谁是RSA算法的发明人呢？不好说，就好像贝尔并不是第一个发明电话的人但大家都记住的是贝尔一样，这个地方我们作为旁观者倒不用较真，重要的是这个算法的内容：</p>
<h3 id="articleHeader3">RSA算法的过程</h3>
<p>RSA算法用到的数学知识特别多，所以在中间介绍这个算法生成私钥和公钥的过程中会穿插一些数学知识。生成步骤如下：</p>
<h4>1. 寻找两个不相同的质数</h4>
<p>随意选择两个大的质数p和q，p不等于q，计算N=p*q;</p>
<p>什么是质数?我想可能会有一部分人已经忘记了，定义如下：</p>
<blockquote>除了1和该数自身外，无法被其他自然数整除的数（也可定义为只有1该数本身两个正因数]的数）。</blockquote>
<p>比如2，3，5，7这些都是质数，9就不是了，因为3*3=9了</p>
<h4>2. 根据欧拉函数获取r</h4>
<p><em>r = φ(N) = φ(p)φ(q) = (p-1)(q-1)</em>。</p>
<p>这里的数学概念就是什么是欧拉函数了，什么是欧拉函数呢？</p>
<p><strong>欧拉函数</strong>的定义：</p>
<blockquote>
<strong>欧拉函数</strong> <em>φ(n)</em>是小于或等于<em>n</em>的正整数中与<em>n</em>互质的数的数目。</blockquote>
<p><strong>互质</strong>的定义：</p>
<blockquote>如果两个或两个以上的整数的最大公约数是 1，则称它们为<strong>互质</strong>
</blockquote>
<p>例如：<em>φ(8) = 4</em>，因为<em>1,3,5,7</em>均和<em>8</em>互质。</p>
<p><strong>推导欧拉函数:</strong></p>
<p>（1）如果<em>n = 1</em>, <em>φ(1) = 1</em>；(小于等于1的正整数中唯一和1互质的数就是1本身)；</p>
<p>（2）如果<em>n</em>为质数，<em>φ(n) = n - 1</em>；因为质数和每一个比它小的数字都互质。比如5，比它小的正整数1,2,3,4都和他互质；</p>
<p>(3)  如果<em>n</em>是<em>a</em>的<em>k</em>次幂，则 <em>φ(n) =  φ(a^k)  = a^k - a^(k-1) = (a-1)a^(k-1)</em>；</p>
<p>(4)  若<em>m</em>,<em>n</em>互质，则<em>φ(mn) = φ(m)φ(n)</em></p>
<p><strong>证明：</strong>设<em>A</em>, <em>B</em>, <em>C</em>是跟<em>m</em>, <em>n</em>, <em>mn</em>互质的数的集，据<a href="https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9C%8B%E5%89%A9%E9%A4%98%E5%AE%9A%E7%90%86" rel="nofollow noreferrer" target="_blank">中国剩余定理</a>(经常看数学典故的童鞋应该了解，剩余定理又叫韩信点兵，也叫孙子定理)，<em>A</em>*<em>B</em>和<em>C</em>可建立双射一一对应)的关系。（或者也可以从初等代数角度给出<a href="https://zh.wikipedia.org/w/index.php?title=%E6%AC%A7%E6%8B%89%E5%87%BD%E6%95%B0%E7%A7%AF%E6%80%A7%E7%9A%84%E7%AE%80%E5%8D%95%E8%AF%81%E6%98%8E&amp;action=edit&amp;redlink=1" rel="nofollow noreferrer" target="_blank">欧拉函数积性的简单证明</a>） 因此的φ(n)值使用<a href="https://zh.wikipedia.org/wiki/%E7%AE%97%E8%A1%93%E5%9F%BA%E6%9C%AC%E5%AE%9A%E7%90%86" rel="nofollow noreferrer" target="_blank">算术基本定理</a>便知。（来自维基百科）</p>
<h4>3. 选择一个小于r并与r互质的整数e</h4>
<p>选择一个小于r并与r互质的整数e，求得e关于r的模反元素，命名为<em>d</em>（<em>ed = 1(mod r)</em>模反元素存在，当且仅当e与r互质），<em>e</em>我们通常取65537。</p>
<p><strong>模反元素：</strong></p>
<blockquote>如果两个正整数a和n互质，那么一定可以找到整数<em>b</em>，使得 ab-1 被n整除，或者说ab被n除的余数是1。</blockquote>
<p>比如<em>3</em>和<em>5</em>互质，<em>3</em>关于<em>5</em>的模反元素就可能是2，因为<em>3*2-1=5</em>可以被5整除。所以很明显模反元素不止一个，2加减5的整数倍都是3关于5的模反元素<em>{...-3, 2,7,12…}</em>  放在公式里就是<em>3*2 = 1 (mod 5)</em></p>
<p>上面所提到的欧拉函数用处实际上在于欧拉定理：</p>
<p><strong>欧拉定理：</strong></p>
<blockquote>如果两个正整数<em>a</em>和<em>n</em>互质，则<em>n</em>的欧拉函数 <em>φ(n)</em> 可以让下面的等式成立：<p><em>a^φ(n) = 1(mod n)</em></p>
<p>由此可得：<em>a</em>的<em>φ(n - 1)</em>次方肯定是<em>a</em>关于<em>n</em>的模反元素。</p>
</blockquote>
<p>欧拉定理就可以用来证明模反元素必然存在。</p>
<p>由模反元素的定义和欧拉定理我们知道，<em>a</em>的<em>φ(n)</em>次方减去1，可以被n整除。比如，3和5互质，而<em>5</em>的欧拉函数<em>φ(5)</em>等于4，所以<em>3</em>的<em>4</em>次方<em>(81)</em>减去1，可以被<em>5</em>整除（<em>80/5=16</em>）。</p>
<p><strong>小费马定理：</strong></p>
<blockquote>假设正整数a与质数p互质，因为质数p的<em>φ(p)</em>等于<em>p-1</em>，则欧拉定理可以写成<p><em>a^(p-1) = 1 (mod p)</em></p>
<p>这其实是欧拉定理的一个特例。</p>
</blockquote>
<h4>4. 销毁p和q</h4>
<p>此时我们的<em>(N , e)</em>是公钥，<em>(N, d)</em>为私钥，爱丽丝会把公钥<em>(N, e)</em>传给鲍勃，然后将<em>(N, d)</em>自己藏起来。一对公钥和私钥就产生了，然后具体的使用方法呢？请看：<a href="http://blog.damonare.cn/2017/12/29/SSL%E5%8D%8F%E8%AE%AE%E4%B9%8B%E6%95%B0%E6%8D%AE%E5%8A%A0%E5%AF%86%E8%BF%87%E7%A8%8B%E8%AF%A6%E8%A7%A3/#more" rel="nofollow noreferrer" target="_blank">SSL协议之数据加密过程详解</a></p>
<h3 id="articleHeader4">RSA算法的安全性</h3>
<p>我们知道像RSA这种非对称加密算法很安全，那么到底为啥子安全呢？<br>我们来看看上面这几个过程产生的几个数字：</p>
<ul>
<li>
<em>p,q</em>：我们随机挑选的两个大质数；</li>
<li>
<em>N</em>：是由两个大质数<em>p</em>和<em>q</em>相乘得到的。<em>N = p * q</em>；</li>
<li>
<em>r</em>：由欧拉函数得到的<em>N</em>的值，<em>r = φ(N) = φ(p)φ(q) = (p-1)(q-1)</em>。</li>
<li>
<em>e</em>：随机选择和和<em>r</em>互质的数字，实际中通常选择65537；</li>
<li>
<em>d</em>： d是以欧拉定理为基础求得的e关于r的模反元素，<em>ed = 1 (mod r)</em>；</li>
</ul>
<p><em>N</em>和<em>e</em>我们都会公开使用，最为重要的就是私钥中的<em>d</em>，<em>d</em>一旦泄露，加密也就失去了意义。那么得到d的过程是如何的呢？如下:</p>
<ol>
<li>比如知道e和r，因为d是e关于r的模反元素；r是φ(N) 的值</li>
<li>而<em>φ(N)=(p-1)(q-1)</em>，所以知道p和q我们就能得到d;</li>
<li>
<em>N = pq</em>，从公开的数据中我们只知道N和e，所以问题的关键就是对N做因式分解能不能得出p和q</li>
</ol>
<p>所以得出了在上篇博客说到的结论，非对称加密的原理：</p>
<p><strong>将a和b相乘得出乘积c很容易，但要是想要通过乘积c推导出a和b极难。即对一个大数进行因式分解极难</strong></p>
<p>目前公开破译的位数是768位，实际使用一般是1024位或是2048位，所以理论上特别的安全。</p>
<h2 id="articleHeader5">后记</h2>
<p>RSA算法的核心就是欧拉定理，根据它我们才能得到私钥，从而保证整个通信的安全。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RSA算法详解

## 原文链接
[https://segmentfault.com/a/1190000013128367](https://segmentfault.com/a/1190000013128367)

