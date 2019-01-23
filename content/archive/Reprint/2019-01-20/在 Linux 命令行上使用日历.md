---
title: '在 Linux 命令行上使用日历' 
date: 2019-01-20 2:30:11
hidden: true
slug: m78yle891i
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-linux-命令行上使用日历"></a>在 Linux 命令行上使用日历</h1>
<blockquote>
<p>通过 Linux 上的日历，不仅仅可以提醒你今天是星期几。诸如 date、cal、 ncal 和 calendar 等命令可以提供很多有用信息。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/00de822a44c4e8ecb827ccb1a18105557ace427f/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031382f30332f63616c656e646172732d3130303735333137332d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t01c862daa5614fd4f5.jpg" alt=""></a></p>
<p>Linux 系统可以为你的日程安排提供更多帮助，而不仅仅是提醒你今天是星期几。日历显示有很多选项 —— 有些可能很有帮助，有些可能会让你大开眼界。</p>
<h3><a href="#日期"></a>日期</h3>
<p>首先，你可能知道可以使用 <code>date</code> 命令显示当前日期。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> date</span>
Mon Mar 26 08:01:41 EDT 2018

</code></pre><h3><a href="#cal-和-ncal"></a>cal 和 ncal</h3>
<p>你可以使用 <code>cal</code> 命令显示整个月份。没有参数时，<code>cal</code> 显示当前月份，默认情况下，通过反转前景色和背景颜色来突出显示当天。</p>
<pre><code class="hljs lsl">$ cal
     March <span class="hljs-number">2018</span>
Su Mo Tu We Th Fr Sa
             <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>
 <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span>
<span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span>
<span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span>
<span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span> <span class="hljs-number">31</span>

</code></pre><p>如果你想以“横向”格式显示当前月份，则可以使用 <code>ncal</code> 命令。</p>
<pre><code class="hljs lsl">$ ncal
    March <span class="hljs-number">2018</span>
Su     <span class="hljs-number">4</span> <span class="hljs-number">11</span> <span class="hljs-number">18</span> <span class="hljs-number">25</span>
Mo     <span class="hljs-number">5</span> <span class="hljs-number">12</span> <span class="hljs-number">19</span> <span class="hljs-number">26</span>
Tu     <span class="hljs-number">6</span> <span class="hljs-number">13</span> <span class="hljs-number">20</span> <span class="hljs-number">27</span>
We     <span class="hljs-number">7</span> <span class="hljs-number">14</span> <span class="hljs-number">21</span> <span class="hljs-number">28</span>
Th  <span class="hljs-number">1</span>  <span class="hljs-number">8</span> <span class="hljs-number">15</span> <span class="hljs-number">22</span> <span class="hljs-number">29</span>
Fr  <span class="hljs-number">2</span>  <span class="hljs-number">9</span> <span class="hljs-number">16</span> <span class="hljs-number">23</span> <span class="hljs-number">30</span>
Sa  <span class="hljs-number">3</span> <span class="hljs-number">10</span> <span class="hljs-number">17</span> <span class="hljs-number">24</span> <span class="hljs-number">31</span>

</code></pre><p>例如，如果你只想查看特定周几的日期，这个命令可能特别有用。</p>
<pre><code class="hljs lsl">$ ncal | grep Th
Th  <span class="hljs-number">1</span>  <span class="hljs-number">8</span> <span class="hljs-number">15</span> <span class="hljs-number">22</span> <span class="hljs-number">29</span>

</code></pre><p><code>ncal</code> 命令还可以以“横向”格式显示一整年，只需在命令后提供年份。</p>
<pre><code class="hljs lsl">$ ncal <span class="hljs-number">2018</span>
                                  <span class="hljs-number">2018</span>
    January           February          March             April
Su     <span class="hljs-number">7</span> <span class="hljs-number">14</span> <span class="hljs-number">21</span> <span class="hljs-number">28</span>        <span class="hljs-number">4</span> <span class="hljs-number">11</span> <span class="hljs-number">18</span> <span class="hljs-number">25</span>        <span class="hljs-number">4</span> <span class="hljs-number">11</span> <span class="hljs-number">18</span> <span class="hljs-number">25</span>     <span class="hljs-number">1</span>  <span class="hljs-number">8</span> <span class="hljs-number">15</span> <span class="hljs-number">22</span> <span class="hljs-number">29</span>
Mo  <span class="hljs-number">1</span>  <span class="hljs-number">8</span> <span class="hljs-number">15</span> <span class="hljs-number">22</span> <span class="hljs-number">29</span>        <span class="hljs-number">5</span> <span class="hljs-number">12</span> <span class="hljs-number">19</span> <span class="hljs-number">26</span>        <span class="hljs-number">5</span> <span class="hljs-number">12</span> <span class="hljs-number">19</span> <span class="hljs-number">26</span>     <span class="hljs-number">2</span>  <span class="hljs-number">9</span> <span class="hljs-number">16</span> <span class="hljs-number">23</span> <span class="hljs-number">30</span>
Tu  <span class="hljs-number">2</span>  <span class="hljs-number">9</span> <span class="hljs-number">16</span> <span class="hljs-number">23</span> <span class="hljs-number">30</span>        <span class="hljs-number">6</span> <span class="hljs-number">13</span> <span class="hljs-number">20</span> <span class="hljs-number">27</span>        <span class="hljs-number">6</span> <span class="hljs-number">13</span> <span class="hljs-number">20</span> <span class="hljs-number">27</span>     <span class="hljs-number">3</span> <span class="hljs-number">10</span> <span class="hljs-number">17</span> <span class="hljs-number">24</span>
We  <span class="hljs-number">3</span> <span class="hljs-number">10</span> <span class="hljs-number">17</span> <span class="hljs-number">24</span> <span class="hljs-number">31</span>        <span class="hljs-number">7</span> <span class="hljs-number">14</span> <span class="hljs-number">21</span> <span class="hljs-number">28</span>        <span class="hljs-number">7</span> <span class="hljs-number">14</span> <span class="hljs-number">21</span> <span class="hljs-number">28</span>     <span class="hljs-number">4</span> <span class="hljs-number">11</span> <span class="hljs-number">18</span> <span class="hljs-number">25</span>
Th  <span class="hljs-number">4</span> <span class="hljs-number">11</span> <span class="hljs-number">18</span> <span class="hljs-number">25</span>        <span class="hljs-number">1</span>  <span class="hljs-number">8</span> <span class="hljs-number">15</span> <span class="hljs-number">22</span>        <span class="hljs-number">1</span>  <span class="hljs-number">8</span> <span class="hljs-number">15</span> <span class="hljs-number">22</span> <span class="hljs-number">29</span>     <span class="hljs-number">5</span> <span class="hljs-number">12</span> <span class="hljs-number">19</span> <span class="hljs-number">26</span>
Fr  <span class="hljs-number">5</span> <span class="hljs-number">12</span> <span class="hljs-number">19</span> <span class="hljs-number">26</span>        <span class="hljs-number">2</span>  <span class="hljs-number">9</span> <span class="hljs-number">16</span> <span class="hljs-number">23</span>        <span class="hljs-number">2</span>  <span class="hljs-number">9</span> <span class="hljs-number">16</span> <span class="hljs-number">23</span> <span class="hljs-number">30</span>     <span class="hljs-number">6</span> <span class="hljs-number">13</span> <span class="hljs-number">20</span> <span class="hljs-number">27</span>
Sa  <span class="hljs-number">6</span> <span class="hljs-number">13</span> <span class="hljs-number">20</span> <span class="hljs-number">27</span>        <span class="hljs-number">3</span> <span class="hljs-number">10</span> <span class="hljs-number">17</span> <span class="hljs-number">24</span>        <span class="hljs-number">3</span> <span class="hljs-number">10</span> <span class="hljs-number">17</span> <span class="hljs-number">24</span> <span class="hljs-number">31</span>     <span class="hljs-number">7</span> <span class="hljs-number">14</span> <span class="hljs-number">21</span> <span class="hljs-number">28</span>
...

</code></pre><p>你也可以使用 <code>cal</code> 命令显示一整年。请记住，你需要输入年份的四位数字。如果你输入 <code>cal 18</code>，你将获得公元 18 年的历年，而不是 2018 年。</p>
<pre><code class="hljs lsl">$ cal <span class="hljs-number">2018</span>
                            <span class="hljs-number">2018</span>
      January               February               March
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
    <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>               <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>               <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>
 <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span>   <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span>   <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span>
<span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span>  <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span>  <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span>
<span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span>  <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span>  <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span>
<span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span> <span class="hljs-number">31</span>           <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span>           <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span> <span class="hljs-number">31</span>


       April                  May                   June
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
 <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>         <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>                  <span class="hljs-number">1</span>  <span class="hljs-number">2</span>
 <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span>   <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span>   <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span>
<span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span>  <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span>  <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span>
<span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span>  <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span>  <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span>
<span class="hljs-number">29</span> <span class="hljs-number">30</span>                 <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span> <span class="hljs-number">31</span>        <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span>


        July                 August              September
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
 <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>            <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>                     <span class="hljs-number">1</span>
 <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span>   <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span>   <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>
<span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span>  <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span>   <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span>
<span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span>  <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span>  <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span>
<span class="hljs-number">29</span> <span class="hljs-number">30</span> <span class="hljs-number">31</span>              <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span> <span class="hljs-number">31</span>     <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span>
                                            <span class="hljs-number">30</span>

      October               November              December
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
    <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>               <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>                     <span class="hljs-number">1</span>
 <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span>   <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span>   <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>  <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>
<span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span>  <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span>   <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span> <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span>
<span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span>  <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span>  <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span> <span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span>
<span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span> <span class="hljs-number">31</span>           <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span>     <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span>
                                            <span class="hljs-number">30</span> <span class="hljs-number">31</span>

</code></pre><p>要指定年份和月份，使用 <code>-d</code> 选项，如下所示：</p>
<pre><code class="hljs lsl">$ cal -d <span class="hljs-number">1949</span><span class="hljs-number">-03</span>
     March <span class="hljs-number">1949</span>
Su Mo Tu We Th Fr Sa
       <span class="hljs-number">1</span>  <span class="hljs-number">2</span>  <span class="hljs-number">3</span>  <span class="hljs-number">4</span>  <span class="hljs-number">5</span>
 <span class="hljs-number">6</span>  <span class="hljs-number">7</span>  <span class="hljs-number">8</span>  <span class="hljs-number">9</span> <span class="hljs-number">10</span> <span class="hljs-number">11</span> <span class="hljs-number">12</span>
<span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span> <span class="hljs-number">18</span> <span class="hljs-number">19</span>
<span class="hljs-number">20</span> <span class="hljs-number">21</span> <span class="hljs-number">22</span> <span class="hljs-number">23</span> <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span>
<span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span> <span class="hljs-number">31</span>

</code></pre><p>另一个可能有用的日历选项是 <code>cal</code> 命令的 <code>-j</code> 选项。让我们来看看它显示的是什么。</p>
<pre><code class="hljs lsl">$ cal -j
        March <span class="hljs-number">2018</span>
 Su  Mo  Tu  We  Th  Fr  Sa
                 <span class="hljs-number">60</span>  <span class="hljs-number">61</span>  <span class="hljs-number">62</span>
 <span class="hljs-number">63</span>  <span class="hljs-number">64</span>  <span class="hljs-number">65</span>  <span class="hljs-number">66</span>  <span class="hljs-number">67</span>  <span class="hljs-number">68</span>  <span class="hljs-number">69</span>
 <span class="hljs-number">70</span>  <span class="hljs-number">71</span>  <span class="hljs-number">72</span>  <span class="hljs-number">73</span>  <span class="hljs-number">74</span>  <span class="hljs-number">75</span>  <span class="hljs-number">76</span>
 <span class="hljs-number">77</span>  <span class="hljs-number">78</span>  <span class="hljs-number">79</span>  <span class="hljs-number">80</span>  <span class="hljs-number">81</span>  <span class="hljs-number">82</span>  <span class="hljs-number">83</span>
 <span class="hljs-number">84</span>  <span class="hljs-number">85</span>  <span class="hljs-number">86</span>  <span class="hljs-number">87</span>  <span class="hljs-number">88</span>  <span class="hljs-number">89</span>  <span class="hljs-number">90</span>

</code></pre><p>你可能会问：“什么鬼？？？” OK， <code>-j</code> 选项显示 Julian 日期 -- 一年中从 1 到 365 年的数字日期。所以，1 是 1 月 1 日，32 是 2 月 1 日。命令 <code>cal -j 2018</code> 将显示一整年的数字，像这样：</p>
<pre><code class="hljs lsl">$ cal -j <span class="hljs-number">2018</span> | tail <span class="hljs-number">-9</span>

         November                     December
 Su  Mo  Tu  We  Th  Fr  Sa   Su  Mo  Tu  We  Th  Fr  Sa
                <span class="hljs-number">305</span> <span class="hljs-number">306</span> <span class="hljs-number">307</span>                          <span class="hljs-number">335</span>
<span class="hljs-number">308</span> <span class="hljs-number">309</span> <span class="hljs-number">310</span> <span class="hljs-number">311</span> <span class="hljs-number">312</span> <span class="hljs-number">313</span> <span class="hljs-number">314</span>  <span class="hljs-number">336</span> <span class="hljs-number">337</span> <span class="hljs-number">338</span> <span class="hljs-number">339</span> <span class="hljs-number">340</span> <span class="hljs-number">341</span> <span class="hljs-number">342</span>
<span class="hljs-number">315</span> <span class="hljs-number">316</span> <span class="hljs-number">317</span> <span class="hljs-number">318</span> <span class="hljs-number">319</span> <span class="hljs-number">320</span> <span class="hljs-number">321</span>  <span class="hljs-number">343</span> <span class="hljs-number">344</span> <span class="hljs-number">345</span> <span class="hljs-number">346</span> <span class="hljs-number">347</span> <span class="hljs-number">348</span> <span class="hljs-number">349</span>
<span class="hljs-number">322</span> <span class="hljs-number">323</span> <span class="hljs-number">324</span> <span class="hljs-number">325</span> <span class="hljs-number">326</span> <span class="hljs-number">327</span> <span class="hljs-number">328</span>  <span class="hljs-number">350</span> <span class="hljs-number">351</span> <span class="hljs-number">352</span> <span class="hljs-number">353</span> <span class="hljs-number">354</span> <span class="hljs-number">355</span> <span class="hljs-number">356</span>
<span class="hljs-number">329</span> <span class="hljs-number">330</span> <span class="hljs-number">331</span> <span class="hljs-number">332</span> <span class="hljs-number">333</span> <span class="hljs-number">334</span>      <span class="hljs-number">357</span> <span class="hljs-number">358</span> <span class="hljs-number">359</span> <span class="hljs-number">360</span> <span class="hljs-number">361</span> <span class="hljs-number">362</span> <span class="hljs-number">363</span>
                             <span class="hljs-number">364</span> <span class="hljs-number">365</span>

</code></pre><p>这种显示可能有助于提醒你，自从你做了新年计划之后，你已经有多少天没有采取行动了。</p>
<p>运行类似的命令，对于 2020 年，你会注意到这是一个闰年：</p>
<pre><code class="hljs lsl">$ cal -j <span class="hljs-number">2020</span> | tail <span class="hljs-number">-9</span>

         November                     December
 Su  Mo  Tu  We  Th  Fr  Sa   Su  Mo  Tu  We  Th  Fr  Sa
<span class="hljs-number">306</span> <span class="hljs-number">307</span> <span class="hljs-number">308</span> <span class="hljs-number">309</span> <span class="hljs-number">310</span> <span class="hljs-number">311</span> <span class="hljs-number">312</span>          <span class="hljs-number">336</span> <span class="hljs-number">337</span> <span class="hljs-number">338</span> <span class="hljs-number">339</span> <span class="hljs-number">340</span>
<span class="hljs-number">313</span> <span class="hljs-number">314</span> <span class="hljs-number">315</span> <span class="hljs-number">316</span> <span class="hljs-number">317</span> <span class="hljs-number">318</span> <span class="hljs-number">319</span>  <span class="hljs-number">341</span> <span class="hljs-number">342</span> <span class="hljs-number">343</span> <span class="hljs-number">344</span> <span class="hljs-number">345</span> <span class="hljs-number">346</span> <span class="hljs-number">347</span>
<span class="hljs-number">320</span> <span class="hljs-number">321</span> <span class="hljs-number">322</span> <span class="hljs-number">323</span> <span class="hljs-number">324</span> <span class="hljs-number">325</span> <span class="hljs-number">326</span>  <span class="hljs-number">348</span> <span class="hljs-number">349</span> <span class="hljs-number">350</span> <span class="hljs-number">351</span> <span class="hljs-number">352</span> <span class="hljs-number">353</span> <span class="hljs-number">354</span>
<span class="hljs-number">327</span> <span class="hljs-number">328</span> <span class="hljs-number">329</span> <span class="hljs-number">330</span> <span class="hljs-number">331</span> <span class="hljs-number">332</span> <span class="hljs-number">333</span>  <span class="hljs-number">355</span> <span class="hljs-number">356</span> <span class="hljs-number">357</span> <span class="hljs-number">358</span> <span class="hljs-number">359</span> <span class="hljs-number">360</span> <span class="hljs-number">361</span>
<span class="hljs-number">334</span> <span class="hljs-number">335</span>                      <span class="hljs-number">362</span> <span class="hljs-number">363</span> <span class="hljs-number">364</span> <span class="hljs-number">365</span> <span class="hljs-number">366</span>

</code></pre><h3><a href="#calendar"></a>calendar</h3>
<p>另一个有趣但潜在的令人沮丧的命令可以告诉你关于假期的事情，这个命令有很多选项，但我们这里介绍下你想看到即将到来的假期和值得注意的日历列表。日历的 <code>-l</code> 选项允许你选择今天想要查看的天数，因此 <code>0</code> 表示“仅限今天”。</p>
<pre><code class="hljs lsl">$ calendar -l <span class="hljs-number">0</span>
Mar <span class="hljs-number">26</span>  Benjamin Thompson born, <span class="hljs-number">1753</span>, Count Rumford; physicist
Mar <span class="hljs-number">26</span>  David Packard died, <span class="hljs-number">1996</span>; age of <span class="hljs-number">83</span>
Mar <span class="hljs-number">26</span>  Popeye statue unveiled, Crystal City TX Spinach Festival, <span class="hljs-number">1937</span>
Mar <span class="hljs-number">26</span>  Independence Day in Bangladesh
Mar <span class="hljs-number">26</span>  Prince Jonah Kuhio Kalanianaole Day in Hawaii
Mar <span class="hljs-number">26</span>* Seward's Day in Alaska (last Monday)
Mar <span class="hljs-number">26</span>  Emerson, Lake, and Palmer record <span class="hljs-string">"Pictures at an Exhibition"</span> live, <span class="hljs-number">1971</span>
Mar <span class="hljs-number">26</span>  Ludwig van Beethoven dies in Vienna, Austria, <span class="hljs-number">1827</span>
Mar <span class="hljs-number">26</span>  Bonne fête aux Lara !
Mar <span class="hljs-number">26</span>  Aujourd'hui, c'est la St(e) Ludger.
Mar <span class="hljs-number">26</span>  N'oubliez pas les Larissa !
Mar <span class="hljs-number">26</span>  Ludwig van Beethoven in Wien gestorben, <span class="hljs-number">1827</span>
Mar <span class="hljs-number">26</span>  Emánuel

</code></pre><p>对于我们大多数人来说，这庆祝活动有点多。如果你看到类似这样的内容，可以将其归咎于你的 <code>calendar.all</code> 文件，该文件告诉系统你希望包含哪些国际日历。当然，你可以通过删除此文件中包含其他文件的一些行来削减此问题。文件看起来像这样：</p>
<pre><code class="hljs autoit"><span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.world&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.argentina&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.australia&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.belgium&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.birthday&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.christian&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.computer&gt;</span></span>

</code></pre><p>假设我们只通过移除除上面显示的第一个 <code>#include</code> 行之外的所有行，将我们的显示切换到世界日历。 我们会看到这个：</p>
<pre><code class="hljs lsl">$ calendar -l <span class="hljs-number">0</span>
Mar <span class="hljs-number">26</span> Benjamin Thompson born, <span class="hljs-number">1753</span>, Count Rumford; physicist
Mar <span class="hljs-number">26</span> David Packard died, <span class="hljs-number">1996</span>; age of <span class="hljs-number">83</span>
Mar <span class="hljs-number">26</span> Popeye statue unveiled, Crystal City TX Spinach Festival, <span class="hljs-number">1937</span>
Mar <span class="hljs-number">26</span> Independence Day in Bangladesh
Mar <span class="hljs-number">26</span> Prince Jonah Kuhio Kalanianaole Day in Hawaii
Mar <span class="hljs-number">26</span>* Seward's Day in Alaska (last Monday)
Mar <span class="hljs-number">26</span> Emerson, Lake, and Palmer record <span class="hljs-string">"Pictures at an Exhibition"</span> live, <span class="hljs-number">1971</span>
Mar <span class="hljs-number">26</span> Ludwig van Beethoven dies in Vienna, Austria, <span class="hljs-number">1827</span>

</code></pre><p>显然，世界日历的特殊日子非常多。但是，像这样的展示可以让你不要忘记所有重要的“大力水手雕像”揭幕日以及在庆祝“世界菠菜之都”中它所扮演的角色。</p>
<p>更有用的日历选择可能是将与工作相关的日历放入特殊文件中，并在 <code>calendar.all</code> 文件中使用该日历来确定在运行命令时将看到哪些事件。</p>
<pre><code class="hljs cpp">$ cat /usr/share/calendar/calendar.all
<span class="hljs-comment">/*
 * International and national calendar files
 *
 * This is the calendar master file.  In the standard setup, it is
 * included by /etc/calendar/default, so you can make any system-wide
 * changes there and they will be kept when you upgrade.  If you want
 * to edit this file, copy it into /etc/calendar/calendar.all and
 * edit it there.
 *
 */</span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">ifndef</span> _calendar_all_</span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> _calendar_all_</span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.usholiday&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;calendar.work&gt;            &lt;==</span></span>

<span class="hljs-meta">#<span class="hljs-meta-keyword">endif</span> <span class="hljs-comment">/* !_calendar_all_ */</span></span>

</code></pre><p>日历文件的格式非常简单 - <code>mm/dd</code> 格式日期，空格和事件描述。</p>
<pre><code class="hljs lsl">$ cat calendar.work
<span class="hljs-number">03</span>/<span class="hljs-number">26</span>   Describe how the cal and calendar commands work
<span class="hljs-number">03</span>/<span class="hljs-number">27</span>   Throw a party!

</code></pre><h3><a href="#注意事项和怀旧"></a>注意事项和怀旧</h3>
<p>注意，有关日历的命令可能不适用于所有 Linux 发行版，你可能必须记住自己的“大力水手”雕像。</p>
<p>如果你想知道，你可以显示一个日历，远至 9999 —— 即使是预言性的 <a href="https://www.youtube.com/watch?v=izQB2-Kmiic">2525</a>。</p>
<p>在 <a href="https://www.facebook.com/NetworkWorld/">Facebook</a> 和 <a href="https://www.linkedin.com/company/network-world">LinkedIn</a> 上加入网络社区，对那些重要的话题发表评论。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3265752/linux/working-with-calendars-on-linux.html">https://www.networkworld.com/article/3265752/linux/working-with-calendars-on-linux.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Linux 命令行上使用日历

## 原文链接
[https://www.zcfy.cc/article/working-with-calendars-on-linux](https://www.zcfy.cc/article/working-with-calendars-on-linux)

