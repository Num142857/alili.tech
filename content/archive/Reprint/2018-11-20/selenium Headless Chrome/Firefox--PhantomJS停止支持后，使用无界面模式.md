---
title: 'selenium Headless Chrome/Firefox--PhantomJS停止支持后，使用无界面模式' 
date: 2018-11-20 2:30:10
hidden: true
slug: 2m26uebpgvr
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x7B80;&#x4ECB;&#xFF1A;</h2><p>&#x4F7F;&#x7528;PhantomJS&#x6765;&#x8FDB;&#x884C;&#x65E0;&#x754C;&#x9762;&#x6A21;&#x5F0F;&#x7684;&#x81EA;&#x52A8;&#x5316;&#x6D4B;&#x8BD5;&#xFF0C;&#x6216;&#x8005;&#x722C;&#x53D6;&#x67D0;&#x4E9B;&#x52A8;&#x6001;&#x9875;&#x9762;&#xFF0C;&#x6700;&#x8FD1;selenium&#x66F4;&#x65B0;&#x4EE5;&#x540E;&#xFF0C;&apos;Selenium support for PhantomJS has been deprecated, please use headless &apos;&#x63D0;&#x793A;&#x4E0D;&#x652F;&#x6301;PhantomJs&#xFF0C;&#x8BF7;&#x4F7F;&#x7528;headless&#x6A21;&#x5F0F;&#x3002;<br>&#x6211;&#x4EEC;&#x7814;&#x7A76;&#x4E00;&#x4E0B;&#x4F7F;&#x7528;Firefox Chrome&#x7684;headless&#x6A21;&#x5F0F;&#x5427;</p><hr><h3 id="articleHeader1">&#x4E00;&#xFF1A;&#x7248;&#x672C;</h3><h4>1.windows&#x4E0B;</h4><p><strong>chrome &#x5BF9;&#x5E94;chromedriver &#x5177;&#x4F53;&#x6D4F;&#x89C8;&#x5668;&#x7248;&#x672C;&#x5BF9;&#x5E94;driver&#x7248;&#x672C;&#x53F7;&#x9700;&#x8981;&#x767E;&#x5EA6;&#x4E00;&#x4E00;&#x67E5;&#x770B;&#x5BF9;&#x5E94;</strong><br><strong>firefox &#x5BF9;&#x5E94;geckodriver &#x5177;&#x4F53;&#x6D4F;&#x89C8;&#x5668;&#x7248;&#x672C;&#x5BF9;&#x5E94;driver&#x7248;&#x672C;&#x53F7;&#x9700;&#x8981;&#x767E;&#x5EA6;&#x4E00;&#x4E00;&#x67E5;&#x770B;&#x5BF9;&#x5E94;</strong><br>selenium 3.9.0<br>&#x6211;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x7684;selenium&#xFF0C;&#x5DF2;&#x7ECF;&#x63D0;&#x793A;&#x505C;&#x6B62;&#x652F;&#x6301;&#x4E86;&#x3002;&#x4F60;&#x80FD;&#x67E5;&#x5230;&#x8FD9;&#x4E2A;&#x6587;&#x7AE0;&#xFF0C;&#x8BC1;&#x660E;&#x4F60;&#x7684;&#x7248;&#x672C;&#x4E5F;&#x4E0D;&#x4F1A;&#x592A;&#x4F4E;&#x3002;</p><p>firefox 58.0.2 (64 &#x4F4D;)<br>&#x8FD9;&#x4E2A;&#x662F;&#x957F;&#x671F;&#x652F;&#x6301;&#x7248;&#xFF0C;&#x6CA1;&#x7528;&#x6700;&#x65B0;&#x7248;&#xFF0C;&#x6709;&#x4E9B;&#x529F;&#x80FD;&#x8C8C;&#x4F3C;&#x4E0D;&#x7A33;&#x5B9A;&#xFF0C;&#x8FD8;&#x7ECF;&#x5E38;&#x66F4;&#x65B0;&#x3002;</p><p>chrome &#x7248;&#x672C; 64.0.3282.119&#xFF08;&#x6B63;&#x5F0F;&#x7248;&#x672C;&#xFF09; &#xFF08;64 &#x4F4D;&#xFF09;<br>&#x8FD9;&#x4E2A;&#x5C31;&#x968F;&#x4FBF;&#x8DDF;&#x968F;&#x5E94;&#x7528;&#x7BA1;&#x5BB6;&#x5347;&#x7EA7;&#x7684;&#xFF0C;&#x6BD5;&#x7ADF;&#x8FDE;&#x4E0D;&#x4E0A;google&#x7684;&#x5347;&#x7EA7;&#x670D;&#x52A1;&#x5668;&#x3002;</p><p>python 3.6.3 amd64<br>&#x786E;&#x5B9E;&#x662F;&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x3002;</p><h4>2.linux</h4><p>&#x8FD8;&#x6CA1;&#x6D4B;&#x8BD5;&#x3002;&#x8FC7;&#x51E0;&#x5929;&#x90E8;&#x7F72;&#x4E00;&#x4E2A;linux&#x9879;&#x76EE;&#xFF0C;&#x518D;&#x7ED9;&#x5927;&#x5BB6;&#x5206;&#x4EAB;&#x7248;&#x672C;&#x3002;</p><h3 id="articleHeader2">&#x4E8C;&#xFF1A;firefox headless&#x6A21;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="from selenium import webdriver
options = webdriver.FirefoxOptions()
options.set_headless()
# options.add_argument(&apos;-headless&apos;)
options.add_argument(&apos;--disable-gpu&apos;)
driver=webdriver.Firefox(firefox_options=options)
driver.get(&apos;http://httpbin.org/user-agent&apos;)
driver.get_screenshot_as_file(&apos;test.png&apos;)
driver.close()
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code><span class="hljs-keyword">from</span> selenium <span class="hljs-keyword">import</span> webdriver
<span class="hljs-keyword">options</span> = webdriver.FirefoxOptions()
<span class="hljs-keyword">options</span>.set_headless()
# <span class="hljs-keyword">options</span>.add_argument(<span class="hljs-string">&apos;-headless&apos;</span>)
<span class="hljs-keyword">options</span>.add_argument(<span class="hljs-string">&apos;--disable-gpu&apos;</span>)
driver=webdriver.Firefox(firefox_options=<span class="hljs-keyword">options</span>)
driver.get(<span class="hljs-string">&apos;http://httpbin.org/user-agent&apos;</span>)
driver.get_screenshot_as_file(<span class="hljs-string">&apos;test.png&apos;</span>)
driver.close()
</code></pre><p>&#x5B9E;&#x4F8B;&#x5316;FirefoxOptions &#x7136;&#x540E;&#x8BBE;&#x7F6E;<code>set_headless</code> &#x6216; <code>add_headless</code><br>&#x5B9E;&#x4F8B;&#x5316;firefox&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x589E;&#x52A0;&#x53C2;&#x6570;<code>firefox_options=options</code><br>&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;<br><code>&apos;--disable-gpu&apos;</code><br>&#x8FD9;&#x53E5;&#x662F;&#x7981;&#x7528;GPU&#x52A0;&#x901F;&#x3002;</p><h3 id="articleHeader3">&#x4E09;&#xFF1A;chrome headless&#x6A21;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="from selenium import webdriver
options=webdriver.ChromeOptions()
options.set_headless()
# options.add_argument(&apos;--headless&apos;)
options.add_argument(&apos;--disable-gpu&apos;)
driver=webdriver.Chrome(options=options)
driver.get(&apos;http://httpbin.org/user-agent&apos;)
driver.get_screenshot_as_file(&apos;test.png&apos;)
driver.close()
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code><span class="hljs-keyword">from</span> selenium <span class="hljs-keyword">import</span> webdriver
<span class="hljs-keyword">options</span>=webdriver.ChromeOptions()
<span class="hljs-keyword">options</span>.set_headless()
# <span class="hljs-keyword">options</span>.add_argument(<span class="hljs-string">&apos;--headless&apos;</span>)
<span class="hljs-keyword">options</span>.add_argument(<span class="hljs-string">&apos;--disable-gpu&apos;</span>)
driver=webdriver.Chrome(<span class="hljs-keyword">options</span>=<span class="hljs-keyword">options</span>)
driver.get(<span class="hljs-string">&apos;http://httpbin.org/user-agent&apos;</span>)
driver.get_screenshot_as_file(<span class="hljs-string">&apos;test.png&apos;</span>)
driver.close()
</code></pre><p>&#x548C;&#x4E0A;&#x9762;firefox&#x4E00;&#x6837;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
selenium Headless Chrome/Firefox--PhantomJS停止支持后，使用无界面模式

## 原文链接
[https://segmentfault.com/a/1190000015789007](https://segmentfault.com/a/1190000015789007)

