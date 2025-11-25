---
title: 'PHP框架性能不权威对比' 
date: 2019-01-11 2:30:08
hidden: true
slug: vrv87msh3f
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">测试环境</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="OS        : Deepin 15.4 unstable
Kernel    : x86_64 Linux 4.9.0-deepin4-amd64
Uptime    : 3d 22h 42m
Packages  : 2050
Shell     : zsh 5.2
Resolution: 1920x1080
WM        : Mutter(DeepinGala)
WM Theme  : Adwaita
GTK Theme : deepin-dark [GTK2/3]
Icon Theme: flattr
CPU       : Intel Core i5-6200U CPU @ 2.8GHz
GPU       : Mesa DRI Intel(R) HD Graphics 520 (Skylake GT2)
RAM       : 2445MiB / 3854MiB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">OS        :</span> Deepin <span class="hljs-number">15.4</span> unstable
<span class="hljs-string">Kernel    :</span> x86_64 Linux <span class="hljs-number">4.9</span><span class="hljs-number">.0</span>-deepin4-amd64
<span class="hljs-string">Uptime    :</span> <span class="hljs-number">3</span>d <span class="hljs-number">22</span>h <span class="hljs-number">42</span>m
<span class="hljs-string">Packages  :</span> <span class="hljs-number">2050</span>
<span class="hljs-string">Shell     :</span> zsh <span class="hljs-number">5.2</span>
<span class="hljs-string">Resolution:</span> <span class="hljs-number">1920</span>x1080
<span class="hljs-string">WM        :</span> Mutter(DeepinGala)
WM <span class="hljs-string">Theme  :</span> Adwaita
GTK <span class="hljs-string">Theme :</span> deepin-dark [GTK2/<span class="hljs-number">3</span>]
Icon <span class="hljs-string">Theme:</span> flattr
<span class="hljs-string">CPU       :</span> Intel Core i5<span class="hljs-number">-6200</span>U CPU @ <span class="hljs-number">2.8</span>GHz
<span class="hljs-string">GPU       :</span> Mesa DRI Intel(R) HD Graphics <span class="hljs-number">520</span> (Skylake GT2)
<span class="hljs-string">RAM       :</span> <span class="hljs-number">2445</span>MiB / <span class="hljs-number">3854</span>MiB</code></pre>
<h1 id="articleHeader1">测试前预热</h1>
<blockquote>ab -c 100 -n 100000 "http://easy-php.local/Demo/Index/hello"</blockquote>
<h1 id="articleHeader2">测试</h1>
<p>预热结束之后，各个框架分别输出"hello world".</p>
<p>本地ab压测：</p>
<blockquote>ab -c 100 -n 10000 domain</blockquote>
<h3 id="articleHeader3">Thinkphp 3.2</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Benchmarking tp3.local (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.10.2
Server Hostname:        tp3.local
Server Port:            80

Document Path:          /
Document Length:        11 bytes

Concurrency Level:      100
Time taken for tests:   4.495 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      3430000 bytes
HTML transferred:       110000 bytes
Requests per second:    2224.73 [#/sec] (mean)
Time per request:       44.949 [ms] (mean)
Time per request:       0.449 [ms] (mean, across all concurrent requests)
Transfer rate:          745.20 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       3
Processing:     4   45  11.0     41      88
Waiting:        4   45  11.0     41      88
Total:          7   45  11.0     41      88

Percentage of the requests served within a certain time (ms)
  50%     41
  66%     42
  75%     44
  80%     45
  90%     68
  95%     73
  98%     77
  99%     79
 100%     88 (longest request)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>Benchmarking tp3.local (be patient)
Completed<span class="hljs-number"> 1000 </span>requests
Completed<span class="hljs-number"> 2000 </span>requests
Completed<span class="hljs-number"> 3000 </span>requests
Completed<span class="hljs-number"> 4000 </span>requests
Completed<span class="hljs-number"> 5000 </span>requests
Completed<span class="hljs-number"> 6000 </span>requests
Completed<span class="hljs-number"> 7000 </span>requests
Completed<span class="hljs-number"> 8000 </span>requests
Completed<span class="hljs-number"> 9000 </span>requests
Completed<span class="hljs-number"> 10000 </span>requests
Finished<span class="hljs-number"> 10000 </span>requests


Server Software:        nginx/1.10.2
Server Hostname:        tp3.local
Server Port:            80

Document Path:          /
Document Length:       <span class="hljs-number"> 11 </span>bytes

Concurrency Level:      100
Time taken for tests:   4.495 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:     <span class="hljs-number"> 3430000 </span>bytes
HTML transferred:      <span class="hljs-number"> 110000 </span>bytes
Requests per second:    2224.73 [<span class="hljs-comment">#/sec] (mean)</span>
Time per request:       44.949 [ms] (mean)
Time per request:       0.449 [ms] (mean, across all concurrent requests)
Transfer rate:          745.20 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       <span class="hljs-number"> 0 </span>  <span class="hljs-number"> 0 </span>  0.2     <span class="hljs-number"> 0 </span>      3
Processing:    <span class="hljs-number"> 4 </span> <span class="hljs-number"> 45 </span> 11.0    <span class="hljs-number"> 41 </span>     88
Waiting:       <span class="hljs-number"> 4 </span> <span class="hljs-number"> 45 </span> 11.0    <span class="hljs-number"> 41 </span>     88
Total:         <span class="hljs-number"> 7 </span> <span class="hljs-number"> 45 </span> 11.0    <span class="hljs-number"> 41 </span>     88

Percentage of the requests served within a certain time (ms)
  50%     41
  66%     42
  75%     44
  80%     45
  90%     68
  95%     73
  98%     77
  99%     79
 100%    <span class="hljs-number"> 88 </span>(longest request)</code></pre>
<h3 id="articleHeader4">Thinkphp 5</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Benchmarking tp5.local (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.10.2
Server Hostname:        tp5.local
Server Port:            80

Document Path:          /
Document Length:        13 bytes

Concurrency Level:      100
Time taken for tests:   5.570 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      1570000 bytes
HTML transferred:       130000 bytes
Requests per second:    1795.28 [#/sec] (mean)
Time per request:       55.702 [ms] (mean)
Time per request:       0.557 [ms] (mean, across all concurrent requests)
Transfer rate:          275.25 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       6
Processing:    12   55   9.5     52      96
Waiting:       12   55   9.5     52      96
Total:         18   55   9.4     52      96

Percentage of the requests served within a certain time (ms)
  50%     52
  66%     54
  75%     56
  80%     57
  90%     71
  95%     80
  98%     84
  99%     87
 100%     96 (longest request)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>Benchmarking tp5.local (be patient)
Completed<span class="hljs-number"> 1000 </span>requests
Completed<span class="hljs-number"> 2000 </span>requests
Completed<span class="hljs-number"> 3000 </span>requests
Completed<span class="hljs-number"> 4000 </span>requests
Completed<span class="hljs-number"> 5000 </span>requests
Completed<span class="hljs-number"> 6000 </span>requests
Completed<span class="hljs-number"> 7000 </span>requests
Completed<span class="hljs-number"> 8000 </span>requests
Completed<span class="hljs-number"> 9000 </span>requests
Completed<span class="hljs-number"> 10000 </span>requests
Finished<span class="hljs-number"> 10000 </span>requests


Server Software:        nginx/1.10.2
Server Hostname:        tp5.local
Server Port:            80

Document Path:          /
Document Length:       <span class="hljs-number"> 13 </span>bytes

Concurrency Level:      100
Time taken for tests:   5.570 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:     <span class="hljs-number"> 1570000 </span>bytes
HTML transferred:      <span class="hljs-number"> 130000 </span>bytes
Requests per second:    1795.28 [<span class="hljs-comment">#/sec] (mean)</span>
Time per request:       55.702 [ms] (mean)
Time per request:       0.557 [ms] (mean, across all concurrent requests)
Transfer rate:          275.25 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       <span class="hljs-number"> 0 </span>  <span class="hljs-number"> 0 </span>  0.4     <span class="hljs-number"> 0 </span>      6
Processing:   <span class="hljs-number"> 12 </span> <span class="hljs-number"> 55 </span>  9.5    <span class="hljs-number"> 52 </span>     96
Waiting:      <span class="hljs-number"> 12 </span> <span class="hljs-number"> 55 </span>  9.5    <span class="hljs-number"> 52 </span>     96
Total:        <span class="hljs-number"> 18 </span> <span class="hljs-number"> 55 </span>  9.4    <span class="hljs-number"> 52 </span>     96

Percentage of the requests served within a certain time (ms)
  50%     52
  66%     54
  75%     56
  80%     57
  90%     71
  95%     80
  98%     84
  99%     87
 100%    <span class="hljs-number"> 96 </span>(longest request)</code></pre>
<h3 id="articleHeader5">Yii2</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Benchmarking yii2.local (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.10.2
Server Hostname:        yii2.local
Server Port:            80

Document Path:          /
Document Length:        11 bytes

Concurrency Level:      100
Time taken for tests:   15.307 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      1480000 bytes
HTML transferred:       110000 bytes
Requests per second:    653.31 [#/sec] (mean)
Time per request:       153.067 [ms] (mean)
Time per request:       1.531 [ms] (mean, across all concurrent requests)
Transfer rate:          94.42 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       4
Processing:    22  152  12.0    151     228
Waiting:       22  152  12.0    151     228
Total:         26  152  11.8    151     228

Percentage of the requests served within a certain time (ms)
  50%    151
  66%    154
  75%    155
  80%    157
  90%    160
  95%    165
  98%    182
  99%    205
 100%    228 (longest request)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>Benchmarking yii2.local (be patient)
Completed<span class="hljs-number"> 1000 </span>requests
Completed<span class="hljs-number"> 2000 </span>requests
Completed<span class="hljs-number"> 3000 </span>requests
Completed<span class="hljs-number"> 4000 </span>requests
Completed<span class="hljs-number"> 5000 </span>requests
Completed<span class="hljs-number"> 6000 </span>requests
Completed<span class="hljs-number"> 7000 </span>requests
Completed<span class="hljs-number"> 8000 </span>requests
Completed<span class="hljs-number"> 9000 </span>requests
Completed<span class="hljs-number"> 10000 </span>requests
Finished<span class="hljs-number"> 10000 </span>requests


Server Software:        nginx/1.10.2
Server Hostname:        yii2.local
Server Port:            80

Document Path:          /
Document Length:       <span class="hljs-number"> 11 </span>bytes

Concurrency Level:      100
Time taken for tests:   15.307 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:     <span class="hljs-number"> 1480000 </span>bytes
HTML transferred:      <span class="hljs-number"> 110000 </span>bytes
Requests per second:    653.31 [<span class="hljs-comment">#/sec] (mean)</span>
Time per request:       153.067 [ms] (mean)
Time per request:       1.531 [ms] (mean, across all concurrent requests)
Transfer rate:          94.42 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       <span class="hljs-number"> 0 </span>  <span class="hljs-number"> 0 </span>  0.4     <span class="hljs-number"> 0 </span>      4
Processing:   <span class="hljs-number"> 22 </span><span class="hljs-number"> 152 </span> 12.0   <span class="hljs-number"> 151 </span>    228
Waiting:      <span class="hljs-number"> 22 </span><span class="hljs-number"> 152 </span> 12.0   <span class="hljs-number"> 151 </span>    228
Total:        <span class="hljs-number"> 26 </span><span class="hljs-number"> 152 </span> 11.8   <span class="hljs-number"> 151 </span>    228

Percentage of the requests served within a certain time (ms)
  50%    151
  66%    154
  75%    155
  80%    157
  90%    160
  95%    165
  98%    182
  99%    205
 100%   <span class="hljs-number"> 228 </span>(longest request)</code></pre>
<h3 id="articleHeader6">Laravel 5.4</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Benchmarking laravel.local (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.10.2
Server Hostname:        laravel.local
Server Port:            80

Document Path:          /api/test/
Document Length:        18 bytes

Concurrency Level:      100
Time taken for tests:   37.053 seconds
Complete requests:      10000
Failed requests:        0
Non-2xx responses:      10000
Total transferred:      3390000 bytes
HTML transferred:       180000 bytes
Requests per second:    269.88 [#/sec] (mean)
Time per request:       370.535 [ms] (mean)
Time per request:       3.705 [ms] (mean, across all concurrent requests)
Transfer rate:          89.35 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.6      0       7
Processing:    16  369  66.9    360     574
Waiting:       16  369  66.9    360     574
Total:         18  369  66.7    360     574

Percentage of the requests served within a certain time (ms)
  50%    360
  66%    407
  75%    426
  80%    437
  90%    462
  95%    477
  98%    494
  99%    505
 100%    574 (longest request)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>Benchmarking laravel.local (be patient)
Completed<span class="hljs-number"> 1000 </span>requests
Completed<span class="hljs-number"> 2000 </span>requests
Completed<span class="hljs-number"> 3000 </span>requests
Completed<span class="hljs-number"> 4000 </span>requests
Completed<span class="hljs-number"> 5000 </span>requests
Completed<span class="hljs-number"> 6000 </span>requests
Completed<span class="hljs-number"> 7000 </span>requests
Completed<span class="hljs-number"> 8000 </span>requests
Completed<span class="hljs-number"> 9000 </span>requests
Completed<span class="hljs-number"> 10000 </span>requests
Finished<span class="hljs-number"> 10000 </span>requests


Server Software:        nginx/1.10.2
Server Hostname:        laravel.local
Server Port:            80

Document Path:          /api/test/
Document Length:       <span class="hljs-number"> 18 </span>bytes

Concurrency Level:      100
Time taken for tests:   37.053 seconds
Complete requests:      10000
Failed requests:        0
Non-2xx responses:      10000
Total transferred:     <span class="hljs-number"> 3390000 </span>bytes
HTML transferred:      <span class="hljs-number"> 180000 </span>bytes
Requests per second:    269.88 [<span class="hljs-comment">#/sec] (mean)</span>
Time per request:       370.535 [ms] (mean)
Time per request:       3.705 [ms] (mean, across all concurrent requests)
Transfer rate:          89.35 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       <span class="hljs-number"> 0 </span>  <span class="hljs-number"> 0 </span>  0.6     <span class="hljs-number"> 0 </span>      7
Processing:   <span class="hljs-number"> 16 </span><span class="hljs-number"> 369 </span> 66.9   <span class="hljs-number"> 360 </span>    574
Waiting:      <span class="hljs-number"> 16 </span><span class="hljs-number"> 369 </span> 66.9   <span class="hljs-number"> 360 </span>    574
Total:        <span class="hljs-number"> 18 </span><span class="hljs-number"> 369 </span> 66.7   <span class="hljs-number"> 360 </span>    574

Percentage of the requests served within a certain time (ms)
  50%    360
  66%    407
  75%    426
  80%    437
  90%    462
  95%    477
  98%    494
  99%    505
 100%   <span class="hljs-number"> 574 </span>(longest request)</code></pre>
<h3 id="articleHeader7">Lumen</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Benchmarking lumen.local (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.10.2
Server Hostname:        lumen.local
Server Port:            80

Document Path:          /test
Document Length:        11 bytes

Concurrency Level:      100
Time taken for tests:   7.816 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      1820000 bytes
HTML transferred:       110000 bytes
Requests per second:    1279.46 [#/sec] (mean)
Time per request:       78.158 [ms] (mean)
Time per request:       0.782 [ms] (mean, across all concurrent requests)
Transfer rate:          227.40 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0       5
Processing:    11   78   5.1     77      97
Waiting:       11   78   5.1     77      97
Total:         16   78   4.9     77      97

Percentage of the requests served within a certain time (ms)
  50%     77
  66%     79
  75%     80
  80%     81
  90%     83
  95%     85
  98%     87
  99%     88
 100%     97 (longest request)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>Benchmarking lumen.local (be patient)
Completed<span class="hljs-number"> 1000 </span>requests
Completed<span class="hljs-number"> 2000 </span>requests
Completed<span class="hljs-number"> 3000 </span>requests
Completed<span class="hljs-number"> 4000 </span>requests
Completed<span class="hljs-number"> 5000 </span>requests
Completed<span class="hljs-number"> 6000 </span>requests
Completed<span class="hljs-number"> 7000 </span>requests
Completed<span class="hljs-number"> 8000 </span>requests
Completed<span class="hljs-number"> 9000 </span>requests
Completed<span class="hljs-number"> 10000 </span>requests
Finished<span class="hljs-number"> 10000 </span>requests


Server Software:        nginx/1.10.2
Server Hostname:        lumen.local
Server Port:            80

Document Path:          /test
Document Length:       <span class="hljs-number"> 11 </span>bytes

Concurrency Level:      100
Time taken for tests:   7.816 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:     <span class="hljs-number"> 1820000 </span>bytes
HTML transferred:      <span class="hljs-number"> 110000 </span>bytes
Requests per second:    1279.46 [<span class="hljs-comment">#/sec] (mean)</span>
Time per request:       78.158 [ms] (mean)
Time per request:       0.782 [ms] (mean, across all concurrent requests)
Transfer rate:          227.40 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       <span class="hljs-number"> 0 </span>  <span class="hljs-number"> 0 </span>  0.3     <span class="hljs-number"> 0 </span>      5
Processing:   <span class="hljs-number"> 11 </span> <span class="hljs-number"> 78 </span>  5.1    <span class="hljs-number"> 77 </span>     97
Waiting:      <span class="hljs-number"> 11 </span> <span class="hljs-number"> 78 </span>  5.1    <span class="hljs-number"> 77 </span>     97
Total:        <span class="hljs-number"> 16 </span> <span class="hljs-number"> 78 </span>  4.9    <span class="hljs-number"> 77 </span>     97

Percentage of the requests served within a certain time (ms)
  50%     77
  66%     79
  75%     80
  80%     81
  90%     83
  95%     85
  98%     87
  99%     88
 100%    <span class="hljs-number"> 97 </span>(longest request)</code></pre>
<h3 id="articleHeader8">Easy PHP</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Benchmarking easy-php.local (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        nginx/1.10.3
Server Hostname:        easy-php.local
Server Port:            80

Document Path:          /
Document Length:        53 bytes

Concurrency Level:      100
Time taken for tests:   3.259 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      1970000 bytes
HTML transferred:       530000 bytes
Requests per second:    3068.87 [#/sec] (mean)
Time per request:       32.585 [ms] (mean)
Time per request:       0.326 [ms] (mean, across all concurrent requests)
Transfer rate:          590.40 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0       4
Processing:     6   32   4.0     31      68
Waiting:        6   32   4.0     31      68
Total:          8   32   4.0     31      68

Percentage of the requests served within a certain time (ms)
  50%     31
  66%     32
  75%     33
  80%     34
  90%     39
  95%     41
  98%     43
  99%     46
 100%     68 (longest request)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>Benchmarking easy-php.local (be patient)
Completed<span class="hljs-number"> 1000 </span>requests
Completed<span class="hljs-number"> 2000 </span>requests
Completed<span class="hljs-number"> 3000 </span>requests
Completed<span class="hljs-number"> 4000 </span>requests
Completed<span class="hljs-number"> 5000 </span>requests
Completed<span class="hljs-number"> 6000 </span>requests
Completed<span class="hljs-number"> 7000 </span>requests
Completed<span class="hljs-number"> 8000 </span>requests
Completed<span class="hljs-number"> 9000 </span>requests
Completed<span class="hljs-number"> 10000 </span>requests
Finished<span class="hljs-number"> 10000 </span>requests


Server Software:        nginx/1.10.3
Server Hostname:        easy-php.local
Server Port:            80

Document Path:          /
Document Length:       <span class="hljs-number"> 53 </span>bytes

Concurrency Level:      100
Time taken for tests:   3.259 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:     <span class="hljs-number"> 1970000 </span>bytes
HTML transferred:      <span class="hljs-number"> 530000 </span>bytes
Requests per second:    3068.87 [<span class="hljs-comment">#/sec] (mean)</span>
Time per request:       32.585 [ms] (mean)
Time per request:       0.326 [ms] (mean, across all concurrent requests)
Transfer rate:          590.40 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       <span class="hljs-number"> 0 </span>  <span class="hljs-number"> 0 </span>  0.3     <span class="hljs-number"> 0 </span>      4
Processing:    <span class="hljs-number"> 6 </span> <span class="hljs-number"> 32 </span>  4.0    <span class="hljs-number"> 31 </span>     68
Waiting:       <span class="hljs-number"> 6 </span> <span class="hljs-number"> 32 </span>  4.0    <span class="hljs-number"> 31 </span>     68
Total:         <span class="hljs-number"> 8 </span> <span class="hljs-number"> 32 </span>  4.0    <span class="hljs-number"> 31 </span>     68

Percentage of the requests served within a certain time (ms)
  50%     31
  66%     32
  75%     33
  80%     34
  90%     39
  95%     41
  98%     43
  99%     46
 100%    <span class="hljs-number"> 68 </span>(longest request)</code></pre>
<h1 id="articleHeader9">最后</h1>
<p>从结果上来看EasyPHP表现不俗，后期会用wrk再测试一下。</p>
<p>以上仅供参考，希望后期不断优化让EasyPHP变得更快更好。</p>
<blockquote><a href="http://php.tigerb.cn/" rel="nofollow noreferrer" target="_blank">Easy PHP：一个极速轻量级的PHP全栈框架</a></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVbb7Dw?w=258&amp;h=258" src="https://static.alili.tech/img/bVbb7Dw?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PHP框架性能不权威对比

## 原文链接
[https://segmentfault.com/a/1190000009909143](https://segmentfault.com/a/1190000009909143)

