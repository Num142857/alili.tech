---
title: 'LKU：一套在 Ubuntu/LinuxMint 上编译、安装和更新最新内核的 Shell 脚本' 
date: 2019-01-22 2:30:08
hidden: true
slug: 2on0nvsmrzn
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#lku一套在-ubuntulinuxmint-上编译安装和更新最新内核的-shell-脚本"></a>LKU：一套在 Ubuntu/LinuxMint 上编译、安装和更新最新内核的 Shell 脚本</h1>
<p>以手动方式安装和升级最新的 Linux 内核对于每个人来说都不是一件小事，甚至包括一些有经验的人也是如此。它需要对 Linux 内核有深入的了解。过去我们已经介绍了 UKUU（Ubuntu Kernel Upgrade Utility），它可以从 kernel.ubuntu.com 网站上自动检测最新的主线内核，并弹出一个不错的窗口界面进行安装。</p>
<p><a href="https://github.com/mtompkins/linux-kernel-utilities">Linux Kernel Utilities</a> （LKU）提供一组 shell 脚本（三个 Shell 脚本），可以帮助用户从 kernel.org 获取并编译和安装最新的 Linux 内核，也可以从 kernel.ubuntu.com 获取安装最新的预编译的 Ubuntu 内核。甚至可以根据需要选择所需的内核（手动内核选择）。</p>
<p>该脚本还将根据 PGP 签名文件检查下载的归档文件，并且可以选择通用和低延迟版内核。</p>
<p>建议阅读：<a href="http://www.2daygeek.com/ukuu-install-upgrade-linux-kernel-in-linux-mint-ubuntu-debian-elementary-os/">ukuu：一种在基于 Ubuntu 的系统上轻松安装升级 Linux 内核的方式</a></p>
<p>它可以删除或清除所有非活动的内核，并且不会为了安全目的留下备份的内核。强烈建议在执行此脚本之前重新启动一次。</p>
<ul>
<li><code>compile_linux_kernel.sh</code> ：用户可以从 kernel.org 编译和安装所需的或最新的内核</li>
<li><code>update_ubuntu_kernel.sh</code> ：用户可以从 kernel.ubuntu.com 安装并更新所需或最新的预编译 Ubuntu 内核</li>
<li><code>remove_old_kernels.sh</code> ：这将删除或清除所有非活动内核，并且只保留当前加载的版本</li>
</ul>
<p>kernel.org 有固定的发布周期（每三个月一次），发布的内核包括了新的功能，改进了硬件和系统性能。由于它具有标准的发布周期，除了滚动发布的版本（如 Arch Linux，openSUSE Tumbleweed 等），大多数发行版都不提供最新的内核。</p>
<h3><a href="#如何安装-linux-kernel-utilities-lku"></a>如何安装 Linux Kernel Utilities (LKU)</h3>
<p>正如我们在文章的开头所说的，它的 shell 脚本集只是克隆开发人员的 github 仓库并运行相应的 shell 文件来执行这个过程。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> git <span class="hljs-built_in">clone</span> https://github.com/mtompkins/linux-kernel-utilities.git &amp;&amp; <span class="hljs-built_in">cd</span> linux-kernel-utilities</span>

</code></pre><h3><a href="#安装指定版本内核"></a>安装指定版本内核</h3>
<p>为了测试的目的，我们将安装 Linux v4.4.10-xenial 内核。在安装新内核之前，我们需要通过 <code>uanme -a</code> 命令检查当前安装的内核版本，以便我们可以检查新内核是否可以安装。</p>
<pre><code class="hljs llvm">$ uname -a
Linux magi-VirtualBox <span class="hljs-number">4.4</span>.<span class="hljs-number">0</span><span class="hljs-number">-21</span>-generic <span class="hljs-symbol">#37</span>-Ubuntu SMP Mon Apr <span class="hljs-number">18</span> <span class="hljs-number">18</span>:<span class="hljs-number">33</span>:<span class="hljs-number">37</span> UTC <span class="hljs-number">2016</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> GNU/Linux

</code></pre><p>根据上面的输出，我们的系统使用的是 4.4.0-21 通用内核。</p>
<p>只需运行 <code>update_ubuntu_kernel.sh</code> shell 脚本。第一次运行脚本时会检查是否满足所有的依赖关系，然后自动安装缺少的依赖项。它会检测系统使用的发行版，并检索 kernel.ubuntu.com 中可用的预编译内核。现在，从列表中选择你需要的内核并输入序号，然后按回车键，它将下载内核映像（linux-headers-4.4.10，linux-headers-4.4.10-xxx-generic　和 linux-image-4.4.10-xxx-generic）。</p>
<p>一旦内核镜像被下载，它将要求输入 <code>sudo</code> 密码来启动新内核的安装。</p>
<pre><code class="hljs x86asm">$ ./update_ubuntu_kernel.sh

[+] Checking Distro
 \_ Distro identified as LinuxMint.

[+] Checking Dependencies
    curl                    Found
    dkms                    Found
    git                     Found
    sudo                    Found
    wget                    Found
    whiptail                Found
    lynx                    <span class="hljs-keyword">Not</span> Found

-- Installing Dependencies --

[!] The first time this script is run missing dependencies will be installed.
    For compiling a kernel this may take a bit of time. Feedback will be provided.

[+] Dependencies
 \_Elevating permissions as necessary . . .
[%] Elevated

[+] Testing for previous held packages <span class="hljs-keyword">and</span> trying to correct any found.
 \_Passed

[+] Updating package cache . . .
 \_Complete

[+] Installing dependencies . . .
 \_Complete

    curl                    Found
    dkms                    Found
    git                     Found
    sudo                    Found
    wget                    Found
    whiptail                Found
    lynx                    Found

[+] Changing to temporary directory to work <span class="hljs-keyword">in</span> . . .
 \_ Temporary directory access granted:    /tmp/tmp.97eHDsmg2K

[+] Removing any conflicting remnants . . .
 \_ Done

[+] Retrieving available kernel choices . . .
 \_ Precompiled kernels available from kernel.ubuntu.com:

 <span class="hljs-number">1</span>)  Linux v4<span class="hljs-meta">.11</span>                <span class="hljs-number">2</span>)  Linux v4<span class="hljs-meta">.11</span><span class="hljs-meta">.3</span>              <span class="hljs-number">3</span>)  Linux v4<span class="hljs-meta">.11</span><span class="hljs-meta">.2</span>              <span class="hljs-number">4</span>)  Linux v4<span class="hljs-meta">.11</span><span class="hljs-meta">.1</span>             
 <span class="hljs-number">5</span>)  Linux v4<span class="hljs-meta">.10</span>                <span class="hljs-number">6</span>)  Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.17</span>             <span class="hljs-number">7</span>)  Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.16</span>             <span class="hljs-number">8</span>)  Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.15</span>            
 <span class="hljs-number">9</span>)  Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.14</span>             <span class="hljs-number">10</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.13</span>             <span class="hljs-number">11</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.12</span>             <span class="hljs-number">12</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.11</span>            
 <span class="hljs-number">13</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.10</span>             <span class="hljs-number">14</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.9</span>              <span class="hljs-number">15</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.8</span>              <span class="hljs-number">16</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.7</span>             
 <span class="hljs-number">17</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.6</span>              <span class="hljs-number">18</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.5</span>              <span class="hljs-number">19</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.4</span>              <span class="hljs-number">20</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.3</span>             
 <span class="hljs-number">21</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.2</span>              <span class="hljs-number">22</span>) Linux v4<span class="hljs-meta">.10</span><span class="hljs-meta">.1</span>              <span class="hljs-number">23</span>) Linux v4<span class="hljs-meta">.9</span>                 <span class="hljs-number">24</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.30</span>             
 <span class="hljs-number">25</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.29</span>              <span class="hljs-number">26</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.28</span>              <span class="hljs-number">27</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.27</span>              <span class="hljs-number">28</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.26</span>             
 <span class="hljs-number">29</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.25</span>              <span class="hljs-number">30</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.24</span>              <span class="hljs-number">31</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.23</span>              <span class="hljs-number">32</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.22</span>             
 <span class="hljs-number">33</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.21</span>              <span class="hljs-number">34</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.20</span>              <span class="hljs-number">35</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.19</span>              <span class="hljs-number">36</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.18</span>             
 <span class="hljs-number">37</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.17</span>              <span class="hljs-number">38</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.16</span>              <span class="hljs-number">39</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.15</span>              <span class="hljs-number">40</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.14</span>             
 <span class="hljs-number">41</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.13</span>              <span class="hljs-number">42</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.12</span>              <span class="hljs-number">43</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.11</span>              <span class="hljs-number">44</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.10</span>             
 <span class="hljs-number">45</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.9</span>               <span class="hljs-number">46</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.8</span>               <span class="hljs-number">47</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.7</span>               <span class="hljs-number">48</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.6</span>              
 <span class="hljs-number">49</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.5</span>               <span class="hljs-number">50</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.4</span>               <span class="hljs-number">51</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.3</span>               <span class="hljs-number">52</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.2</span>              
 <span class="hljs-number">53</span>) Linux v4<span class="hljs-meta">.9</span><span class="hljs-meta">.1</span>               <span class="hljs-number">54</span>) Linux v4<span class="hljs-meta">.8</span>                 <span class="hljs-number">55</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.17</span>              <span class="hljs-number">56</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.16</span>             
 <span class="hljs-number">57</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.15</span>              <span class="hljs-number">58</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.14</span>              <span class="hljs-number">59</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.13</span>              <span class="hljs-number">60</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.12</span>             
 <span class="hljs-number">61</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.11</span>              <span class="hljs-number">62</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.10</span>              <span class="hljs-number">63</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.9</span>               <span class="hljs-number">64</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.8</span>              
 <span class="hljs-number">65</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.7</span>               <span class="hljs-number">66</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.6</span>               <span class="hljs-number">67</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.5</span>               <span class="hljs-number">68</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.4</span>              
 <span class="hljs-number">69</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.3</span>               <span class="hljs-number">70</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.2</span>               <span class="hljs-number">71</span>) Linux v4<span class="hljs-meta">.8</span><span class="hljs-meta">.1</span>               <span class="hljs-number">72</span>) Linux v4<span class="hljs-meta">.7</span>                
 <span class="hljs-number">73</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.10</span>              <span class="hljs-number">74</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.9</span>               <span class="hljs-number">75</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.8</span>               <span class="hljs-number">76</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.7</span>              
 <span class="hljs-number">77</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.6</span>               <span class="hljs-number">78</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.5</span>               <span class="hljs-number">79</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.4</span>               <span class="hljs-number">80</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.3</span>              
 <span class="hljs-number">81</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.2</span>               <span class="hljs-number">82</span>) Linux v4<span class="hljs-meta">.7</span><span class="hljs-meta">.1</span>               <span class="hljs-number">83</span>) Linux v4<span class="hljs-meta">.6</span><span class="hljs-meta">.7</span>               <span class="hljs-number">84</span>) Linux v4<span class="hljs-meta">.6</span><span class="hljs-meta">.6</span>              
 <span class="hljs-number">85</span>) Linux v4<span class="hljs-meta">.6</span><span class="hljs-meta">.5</span>               <span class="hljs-number">86</span>) Linux v4<span class="hljs-meta">.6</span><span class="hljs-meta">.4</span>               <span class="hljs-number">87</span>) Linux v4<span class="hljs-meta">.6</span><span class="hljs-meta">.3</span>-yakkety       <span class="hljs-number">88</span>) Linux v4<span class="hljs-meta">.6</span><span class="hljs-meta">.2</span>-yakkety      
 <span class="hljs-number">89</span>) Linux v4<span class="hljs-meta">.6</span><span class="hljs-meta">.1</span>-yakkety       <span class="hljs-number">90</span>) Linux v4<span class="hljs-meta">.6</span>-yakkety         <span class="hljs-number">91</span>) Linux v4<span class="hljs-meta">.5</span><span class="hljs-meta">.7</span>-yakkety       <span class="hljs-number">92</span>) Linux v4<span class="hljs-meta">.5</span><span class="hljs-meta">.6</span>-yakkety      
 <span class="hljs-number">93</span>) Linux v4<span class="hljs-meta">.5</span><span class="hljs-meta">.5</span>-yakkety       <span class="hljs-number">94</span>) Linux v4<span class="hljs-meta">.5</span><span class="hljs-meta">.4</span>-yakkety       <span class="hljs-number">95</span>) Linux v4<span class="hljs-meta">.5</span><span class="hljs-meta">.3</span>-wily          <span class="hljs-number">96</span>) Linux v4<span class="hljs-meta">.5</span><span class="hljs-meta">.2</span>-wily         
 <span class="hljs-number">97</span>) Linux v4<span class="hljs-meta">.5</span><span class="hljs-meta">.1</span>-wily          <span class="hljs-number">98</span>) Linux v4<span class="hljs-meta">.5</span>-wily            <span class="hljs-number">99</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.70</span>              <span class="hljs-number">100</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.69</span>             
 <span class="hljs-number">101</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.68</span>              <span class="hljs-number">102</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.67</span>              <span class="hljs-number">103</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.66</span>              <span class="hljs-number">104</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.65</span>             
 <span class="hljs-number">105</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.64</span>              <span class="hljs-number">106</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.63</span>              <span class="hljs-number">107</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.62</span>              <span class="hljs-number">108</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.61</span>             
 <span class="hljs-number">109</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.60</span>              <span class="hljs-number">110</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.59</span>              <span class="hljs-number">111</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.58</span>              <span class="hljs-number">112</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.57</span>             
 <span class="hljs-number">113</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.56</span>              <span class="hljs-number">114</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.55</span>              <span class="hljs-number">115</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.54</span>              <span class="hljs-number">116</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.53</span>             
 <span class="hljs-number">117</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.52</span>              <span class="hljs-number">118</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.51</span>              <span class="hljs-number">119</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.50</span>              <span class="hljs-number">120</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.49</span>             
 <span class="hljs-number">121</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.48</span>              <span class="hljs-number">122</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.47</span>              <span class="hljs-number">123</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.46</span>              <span class="hljs-number">124</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.45</span>             
 <span class="hljs-number">125</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.44</span>              <span class="hljs-number">126</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.43</span>              <span class="hljs-number">127</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.42</span>              <span class="hljs-number">128</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.41</span>             
 <span class="hljs-number">129</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.40</span>              <span class="hljs-number">130</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.39</span>              <span class="hljs-number">131</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.38</span>              <span class="hljs-number">132</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.37</span>             
 <span class="hljs-number">133</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.36</span>              <span class="hljs-number">134</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.35</span>              <span class="hljs-number">135</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.34</span>              <span class="hljs-number">136</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.33</span>             
 <span class="hljs-number">137</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.32</span>              <span class="hljs-number">138</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.31</span>              <span class="hljs-number">139</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.30</span>              <span class="hljs-number">140</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.29</span>             
 <span class="hljs-number">141</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.28</span>              <span class="hljs-number">142</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.27</span>              <span class="hljs-number">143</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.26</span>              <span class="hljs-number">144</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.25</span>             
 <span class="hljs-number">145</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.24</span>              <span class="hljs-number">146</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.23</span>              <span class="hljs-number">147</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.22</span>              <span class="hljs-number">148</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.21</span>             
 <span class="hljs-number">149</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.20</span>              <span class="hljs-number">150</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.19</span>              <span class="hljs-number">151</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.17</span>              <span class="hljs-number">152</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.16</span>             
 <span class="hljs-number">153</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.15</span>              <span class="hljs-number">154</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.14</span>-xenial       <span class="hljs-number">155</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.13</span>-xenial       <span class="hljs-number">156</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.12</span>-xenial      
 <span class="hljs-number">157</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.11</span>-xenial       <span class="hljs-number">158</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.10</span>-xenial       <span class="hljs-number">159</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.9</span>-xenial        <span class="hljs-number">160</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.8</span>-wily         
 <span class="hljs-number">161</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.7</span>-wily          <span class="hljs-number">162</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.6</span>-wily          <span class="hljs-number">163</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.5</span>-wily          <span class="hljs-number">164</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.4</span>-wily         
 <span class="hljs-number">165</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.3</span>-wily          <span class="hljs-number">166</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.2</span>-wily          <span class="hljs-number">167</span>) Linux v4<span class="hljs-meta">.4</span><span class="hljs-meta">.1</span>-wily          <span class="hljs-number">168</span>) Linux v4<span class="hljs-meta">.4</span>-wily           
 <span class="hljs-number">169</span>) Linux v4<span class="hljs-meta">.3</span><span class="hljs-meta">.6</span>-wily          <span class="hljs-number">170</span>) Linux v4<span class="hljs-meta">.3</span><span class="hljs-meta">.5</span>-wily          <span class="hljs-number">171</span>) Linux v4<span class="hljs-meta">.3</span><span class="hljs-meta">.4</span>-wily          <span class="hljs-number">172</span>) Linux v4<span class="hljs-meta">.3</span><span class="hljs-meta">.3</span>-wily         
 <span class="hljs-number">173</span>) Linux v4<span class="hljs-meta">.3</span><span class="hljs-meta">.2</span>-wily          <span class="hljs-number">174</span>) Linux v4<span class="hljs-meta">.3</span><span class="hljs-meta">.1</span>-wily          <span class="hljs-number">175</span>) Linux v4<span class="hljs-meta">.3</span>-wily            <span class="hljs-number">176</span>) Linux v4<span class="hljs-meta">.3</span>-unstable       
 <span class="hljs-number">177</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-wily          <span class="hljs-number">178</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt13         <span class="hljs-number">179</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt12-wily    <span class="hljs-number">180</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt10-yakkety
 <span class="hljs-number">181</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt9-wily     <span class="hljs-number">182</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt8-wily     <span class="hljs-number">183</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt7-wily     <span class="hljs-number">184</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt6-wily    
 <span class="hljs-number">185</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt5-wily     <span class="hljs-number">186</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt4-wily     <span class="hljs-number">187</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt3-wily     <span class="hljs-number">188</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt2-wily    
 <span class="hljs-number">189</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.8</span>-ckt1-wily     <span class="hljs-number">190</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.7</span>-wily          <span class="hljs-number">191</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.6</span>-wily          <span class="hljs-number">192</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.5</span>-wily         
 <span class="hljs-number">193</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.4</span>-wily          <span class="hljs-number">194</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.4</span>-unstable      <span class="hljs-number">195</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.3</span>-unstable      <span class="hljs-number">196</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.2</span>-unstable     
 <span class="hljs-number">197</span>) Linux v4<span class="hljs-meta">.2</span><span class="hljs-meta">.1</span>-unstable      <span class="hljs-number">198</span>) Linux v4<span class="hljs-meta">.2</span>-wily            <span class="hljs-number">199</span>) Linux v4<span class="hljs-meta">.2</span>-unstable        <span class="hljs-number">200</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.40</span>             
 <span class="hljs-number">201</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.39</span>              <span class="hljs-number">202</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.38</span>              <span class="hljs-number">203</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.37</span>              <span class="hljs-number">204</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.36</span>             
 <span class="hljs-number">205</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.35</span>              <span class="hljs-number">206</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.34</span>              <span class="hljs-number">207</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.33</span>              <span class="hljs-number">208</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.32</span>             
 <span class="hljs-number">209</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.31</span>              <span class="hljs-number">210</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.30</span>              <span class="hljs-number">211</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.29</span>              <span class="hljs-number">212</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.28</span>             
 <span class="hljs-number">213</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.27</span>-wily         <span class="hljs-number">214</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.26</span>-wily         <span class="hljs-number">215</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.25</span>-wily         <span class="hljs-number">216</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.24</span>-wily        
 <span class="hljs-number">217</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.23</span>-wily         <span class="hljs-number">218</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.22</span>-wily         <span class="hljs-number">219</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.21</span>-wily         <span class="hljs-number">220</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.20</span>-wily        
 <span class="hljs-number">221</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.19</span>-wily         <span class="hljs-number">222</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.18</span>-wily         <span class="hljs-number">223</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.17</span>-wily         <span class="hljs-number">224</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.16</span>-wily        
 <span class="hljs-number">225</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.15</span>-wily         <span class="hljs-number">226</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.14</span>-wily         <span class="hljs-number">227</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.13</span>-wily         <span class="hljs-number">228</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.12</span>-wily        
 <span class="hljs-number">229</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.11</span>-wily         <span class="hljs-number">230</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.11</span>-unstable     <span class="hljs-number">231</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.10</span>-unstable     <span class="hljs-number">232</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.9</span>-unstable     
 <span class="hljs-number">233</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.8</span>-unstable      <span class="hljs-number">234</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.7</span>-unstable      <span class="hljs-number">235</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.6</span>-unstable      <span class="hljs-number">236</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.5</span>-unstable     
 <span class="hljs-number">237</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.4</span>-unstable      <span class="hljs-number">238</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.3</span>-unstable      <span class="hljs-number">239</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.2</span>-unstable      <span class="hljs-number">240</span>) Linux v4<span class="hljs-meta">.1</span><span class="hljs-meta">.1</span>-unstable     
 <span class="hljs-number">241</span>) Linux v4<span class="hljs-meta">.1</span>-wily            <span class="hljs-number">242</span>) Linux v4<span class="hljs-meta">.1</span>-unstable        <span class="hljs-number">243</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.9</span>-wily          <span class="hljs-number">244</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.8</span>-wily         
 <span class="hljs-number">245</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.7</span>-wily          <span class="hljs-number">246</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.6</span>-wily          <span class="hljs-number">247</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.5</span>-wily          <span class="hljs-number">248</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.4</span>-wily         
 <span class="hljs-number">249</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.3</span>-wily          <span class="hljs-number">250</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.2</span>-wily          <span class="hljs-number">251</span>) Linux v4<span class="hljs-meta">.0</span><span class="hljs-meta">.1</span>-wily          <span class="hljs-number">252</span>) Linux v4<span class="hljs-meta">.0</span>-vivid          

Select your desired kernel: <span class="hljs-number">158</span>

<span class="hljs-built_in">Do</span> you want the lowlatency kernel? (y/[n]):

[+] Processing selection
 \_ Determining <span class="hljs-meta">CPU</span> type: amd64
 \_ Locating source of v4<span class="hljs-meta">.4</span><span class="hljs-meta">.10</span>-xenial generic kernel packages.
 \_ Done

[+] Checking AntiVirus flag <span class="hljs-keyword">and</span> disabling if necessary
[+] Installing kernel . . .
[sudo] password for magi:
Selecting previously unselected package linux-headers-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>.
(Reading database ... <span class="hljs-number">230647</span> files <span class="hljs-keyword">and</span> directories currently installed.)
Preparing to unpack linux-headers-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410_4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.</span>201605110631_all.deb ...
Unpacking linux-headers-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span> (<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.201605110631</span>) ...
Selecting previously unselected package linux-headers-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic.
Preparing to unpack linux-headers-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic_4<span class="hljs-meta">.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.</span>201605110631_amd64.deb ...
Unpacking linux-headers-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic (<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.201605110631</span>) ...
Selecting previously unselected package linux-image-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic.
Preparing to unpack linux-image-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic_4<span class="hljs-meta">.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.</span>201605110631_amd64.deb ...
Done.
Unpacking linux-image-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic (<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.201605110631</span>) ...
Setting <span class="hljs-meta">up</span> linux-headers-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span> (<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.201605110631</span>) ...
Setting <span class="hljs-meta">up</span> linux-headers-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic (<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.201605110631</span>) ...
Examining /etc/kernel/header_postinst.d.
run-parts: executing /etc/kernel/header_postinst.d/dkms <span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
Setting <span class="hljs-meta">up</span> linux-image-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic (<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410.201605110631</span>) ...
Running depmod.
update-initramfs: deferring update (hook will be called later)
Examining /etc/kernel/postinst.d.
run-parts: executing /etc/kernel/postinst.d/apt-auto-removal <span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
run-parts: executing /etc/kernel/postinst.d/dkms <span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
run-parts: executing /etc/kernel/postinst.d/initramfs-tools <span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
update-initramfs: Generating /boot/initrd.img-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
<span class="hljs-symbol">Warning:</span> No support for locale: en_IN
run-parts: executing /etc/kernel/postinst.d/pm-utils <span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
run-parts: executing /etc/kernel/postinst.d/unattended-upgrades <span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
run-parts: executing /etc/kernel/postinst.d/zz-update-grub <span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
Generating grub configuration file ...
<span class="hljs-symbol">Warning:</span> Setting GRUB_TIMEOUT to a non-<span class="hljs-meta">zero</span> value when GRUB_HIDDEN_TIMEOUT is set is no longer supported.
Found linux image: /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
Found initrd image: /boot/initrd.img-<span class="hljs-number">4.4</span><span class="hljs-meta">.10</span>-<span class="hljs-number">040410</span>-generic
Found linux image: /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.9</span>-<span class="hljs-number">040409</span>-lowlatency
Found initrd image: /boot/initrd.img-<span class="hljs-number">4.4</span><span class="hljs-meta">.9</span>-<span class="hljs-number">040409</span>-lowlatency
Found linux image: /boot/vmlinuz-<span class="hljs-number">4.4</span><span class="hljs-meta">.0</span>-<span class="hljs-number">21</span>-generic
Found initrd image: /boot/initrd.img-<span class="hljs-number">4.4</span><span class="hljs-meta">.0</span>-<span class="hljs-number">21</span>-generic
Found memtest86+ image: /boot/memtest86+.elf
Found memtest86+ image: /boot/memtest86+.bin
done
 \_ Done

</code></pre><p>安装后需要重新启动以使用新安装的内核。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo reboot now</span>

</code></pre><p>现在，你正在使用的就是新安装的 4.4.10-040410-generic 版本内核。</p>
<pre><code class="hljs llvm">$ uname -a
Linux magi-VirtualBox <span class="hljs-number">4.4</span>.<span class="hljs-number">10</span><span class="hljs-number">-040410</span>-generic <span class="hljs-symbol">#201605110631</span> SMP Wed May <span class="hljs-number">11</span> <span class="hljs-number">10</span>:<span class="hljs-number">33</span>:<span class="hljs-number">23</span> UTC <span class="hljs-number">2016</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> GNU/Linux

</code></pre><h3><a href="#安装最新版本内核"></a>安装最新版本内核</h3>
<p>过程与上述相同，它将自动安装最新版本的内核。</p>
<pre><code class="hljs groovy">$ ./update_ubuntu_kernel.sh --latest

[+] Checking Distro
 \_ Distro identified <span class="hljs-keyword">as</span> LinuxMint.

[+] Checking Dependencies
    curl                    Found
    dkms                    Found
    git                     Found
    sudo                    Found
    wget                    Found
    whiptail                Found
    lynx                    Found

[+] Changing to temporary directory to work <span class="hljs-keyword">in</span> . . .
 \_ Temporary directory access <span class="hljs-string">granted:</span>    <span class="hljs-regexp">/tmp/</span>tmp.pLPYmCze6S

[+] Removing any conflicting remnants . . .
 \_ Done

[+] Retrieving available kernel choices . . .
 \_ Precompiled kernels available from kernel.ubuntu.<span class="hljs-string">com:</span>
.
.
.
.
<span class="hljs-string">Warning:</span> Setting GRUB_TIMEOUT to a non-zero value when GRUB_HIDDEN_TIMEOUT is set is no longer supported.
Found linux <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>vmlinuz<span class="hljs-number">-4.11</span><span class="hljs-number">.3</span><span class="hljs-number">-041103</span>-generic
Found initrd <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>initrd.img<span class="hljs-number">-4.11</span><span class="hljs-number">.3</span><span class="hljs-number">-041103</span>-generic
Found linux <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>vmlinuz<span class="hljs-number">-4.4</span><span class="hljs-number">.10</span><span class="hljs-number">-040410</span>-generic
Found initrd <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>initrd.img<span class="hljs-number">-4.4</span><span class="hljs-number">.10</span><span class="hljs-number">-040410</span>-generic
Found linux <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>vmlinuz<span class="hljs-number">-4.4</span><span class="hljs-number">.9</span><span class="hljs-number">-040409</span>-lowlatency
Found initrd <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>initrd.img<span class="hljs-number">-4.4</span><span class="hljs-number">.9</span><span class="hljs-number">-040409</span>-lowlatency
Found linux <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>vmlinuz<span class="hljs-number">-4.4</span><span class="hljs-number">.0</span><span class="hljs-number">-21</span>-generic
Found initrd <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>initrd.img<span class="hljs-number">-4.4</span><span class="hljs-number">.0</span><span class="hljs-number">-21</span>-generic
Found memtest86+ <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>memtest86+.elf
Found memtest86+ <span class="hljs-string">image:</span> <span class="hljs-regexp">/boot/</span>memtest86+.bin
done
 \_ Done

</code></pre><p>安装后需要重新启动以使用新安装的内核。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo reboot now</span>

</code></pre><p>现在，你正在使用的就是最新版本 4.11.3-041103-generic 的内核。</p>
<pre><code class="hljs llvm">$ uname -a
Linux magi-VirtualBox <span class="hljs-number">4.11</span>.<span class="hljs-number">3</span><span class="hljs-number">-041103</span>-generic <span class="hljs-symbol">#201705251233</span> SMP Thu May <span class="hljs-number">25</span> <span class="hljs-number">16</span>:<span class="hljs-number">34</span>:<span class="hljs-number">52</span> UTC <span class="hljs-number">2017</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> <span class="hljs-keyword">x</span><span class="hljs-number">86</span>_<span class="hljs-number">64</span> GNU/Linux

</code></pre><h3><a href="#删除或清除旧内核"></a>删除或清除旧内核</h3>
<p>只需要运行 <code>remove_old_kernels.sh</code> shell 脚本即可删除或清除所有非活动状态的内核。</p>
<pre><code class="hljs routeros">$ ./remove_old_kernels.sh

        ++++++++++++++++++++++++++++++++
        +++       W A R N I N G      +++
        ++++++++++++++++++++++++++++++++

A reboot is recommended before running this<span class="hljs-built_in"> script </span><span class="hljs-keyword">to</span> ensure the current kernel tagged
as the boot kernel is indeed registered <span class="hljs-keyword">and</span> old kernels properly marked <span class="hljs-keyword">for</span> removal.
<span class="hljs-keyword">If</span> you have just installed <span class="hljs-keyword">or</span> modified your existing kernel <span class="hljs-keyword">and</span> <span class="hljs-keyword">do</span> <span class="hljs-keyword">not</span> reboot before
running this<span class="hljs-built_in"> script </span>it may render you<span class="hljs-built_in"> system </span>INOPERABLE <span class="hljs-keyword">and</span> that would indeed suck.

You have been warned.
~the Mgmt

[?]Continue <span class="hljs-keyword">to</span> automagically <span class="hljs-builtin-name">remove</span> ALL old kernels? (y/N)y
\_ Removing ALL old kernels . . .
[sudo] password <span class="hljs-keyword">for</span> magi:
Reading package lists<span class="hljs-built_in">..</span>. Done
Building dependency tree       
Reading state information<span class="hljs-built_in">..</span>. Done
The following packages will be REMOVED:
  linux-headers-4.4.0-21* linux-headers-4.4.0-21-generic* linux-headers-4.4.10-040410*
  linux-headers-4.4.10-040410-generic* linux-headers-4.4.9-040409* linux-headers-4.4.9-040409-lowlatency*
  linux-image-4.4.0-21-generic* linux-image-4.4.10-040410-generic* linux-image-4.4.9-040409-lowlatency*
  linux-image-extra-4.4.0-21-generic* linux-kernel-generic*
0 upgraded, 0 newly installed, 11 <span class="hljs-keyword">to</span> <span class="hljs-builtin-name">remove</span> <span class="hljs-keyword">and</span> 547 <span class="hljs-keyword">not</span> upgraded.
After this operation, 864 MB disk space will be freed.
(Reading database <span class="hljs-built_in">..</span>. 296860 files <span class="hljs-keyword">and</span> directories currently installed.)
Removing linux-kernel-generic (4.4.0-21) <span class="hljs-built_in">..</span>.
Removing linux-headers-4.4.0-21-generic (4.4.0-21.37) <span class="hljs-built_in">..</span>.
Removing linux-headers-4.4.0-21 (4.4.0-21.37) <span class="hljs-built_in">..</span>.
Removing linux-headers-4.4.10-040410-generic (4.4.10-040410.201605110631) <span class="hljs-built_in">..</span>.
Removing linux-headers-4.4.10-040410 (4.4.10-040410.201605110631) <span class="hljs-built_in">..</span>.
Removing linux-headers-4.4.9-040409-lowlatency (4.4.9-040409.201605041832) <span class="hljs-built_in">..</span>.
Removing linux-headers-4.4.9-040409 (4.4.9-040409.201605041832) <span class="hljs-built_in">..</span>.
Removing linux-image-extra-4.4.0-21-generic (4.4.0-21.37) <span class="hljs-built_in">..</span>.
.
.
.
done
Purging configuration files <span class="hljs-keyword">for</span> linux-image-4.4.9-040409-lowlatency (4.4.9-040409.201605041832) <span class="hljs-built_in">..</span>.
Examining /etc/kernel/postrm.d .
run-parts: executing /etc/kernel/postrm.d/initramfs-tools 4.4.9-040409-lowlatency /boot/vmlinuz-4.4.9-040409-lowlatency
run-parts: executing /etc/kernel/postrm.d/zz-update-grub 4.4.9-040409-lowlatency /boot/vmlinuz-4.4.9-040409-lowlatency

</code></pre><hr>
<p>via: <a href="http://www.2daygeek.com/lku-linux-kernel-utilities-compile-install-update-latest-kernel-in-linux-mint-ubuntu/">http://www.2daygeek.com/lku-linux-kernel-utilities-compile-install-update-latest-kernel-in-linux-mint-ubuntu/</a></p>
<p>作者：<a href="http://www.2daygeek.com/author/2daygeek/">2DAYGEEK</a> 译者：<a href="https://github.com/firmianay">firmianay</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
LKU：一套在 Ubuntu/LinuxMint 上编译、安装和更新最新内核的 Shell 脚本

## 原文链接
[https://www.zcfy.cc/article/linux-kernel-utilities-a-set-of-shell-scripts-to-compile-install-update-latest-kernel-in-ubuntu-linuxmint](https://www.zcfy.cc/article/linux-kernel-utilities-a-set-of-shell-scripts-to-compile-install-update-latest-kernel-in-ubuntu-linuxmint)

