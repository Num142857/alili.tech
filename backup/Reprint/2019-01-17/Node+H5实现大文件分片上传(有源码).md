---
title: 'Node+H5实现大文件分片上传(有源码)' 
date: 2019-01-17 2:30:25
hidden: true
slug: n9sky2zvbk
categories: [reprint]
---

{{< raw >}}

                    
<h4>话前</h4>
<p>上传大文件上传的教程网上很多, 但是大部分没给出一个比较完整的出来, 这个博客给出的是前后端一套完整的解决方案, 其中前端没有使用第三方上传库, 希望能帮到有同样需求的朋友们.</p>
<p>大文件分片上传的好处在这里就不用多说了, 之前不管是上传单文件还是分片文件上传都是依靠Flash来实现, 现在H5能原生支持, 而且性能要比Flash高很多, 所以正好公司的一个需求就是要分片上传, 借机分享给大家</p>
<h4>分片上传的思路如下:</h4>
<ul>
<li><p>第一步:先对文件进行MD5的加密, 这样有两个好处, 即可以对文件进行唯一的标识, 为秒传做准备, 也可以为后台进行文件完整性的校验进行比对</p></li>
<li><p>第二步:拿到MD5值以后, 要查询一下, 这个文件是否已经上传过了, 如果上传过了, 就不用再次重复上传, 也就是能够秒传, 网盘里的秒传, 原理也是一样的</p></li>
<li><p>第三步:对文件进行切片, 假如文件是500M, 一个切片大小我们定义为50M, 那么整个文件就为分为100次上传</p></li>
<li><p>第四步:向后台请求一个接口, 接口里面的数据是该文件已经上传过的文件块, 为什么要有这个请求呢? 我们经常用网盘, 网盘里面有续传的功能, 一个文件传到一半, 由于各种原因, 不想再传了, 那么再次上传的时候, 服务器应该保留我之前上传过的文件块, 跳过这些已经上传过的块, 再次上传其他文件块, 当然续传方案有很多, 目前来看, 单独发一次请求, 这样效率最高</p></li>
<li><p>第五步:开始对未上传过的块进行POST上传</p></li>
<li><p>第六步:当上传成功后, 通知服务器进行文件的合并, 至此, 上传完成!</p></li>
</ul>
<h4>为了直观起见, 我画了一个流程图</h4>
<p><span class="img-wrap"><img data-src="/img/bVLu9f?w=756&amp;h=763" src="https://static.alili.tech/img/bVLu9f?w=756&amp;h=763" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>最终前端的效果图</h4>
<p><span class="img-wrap"><img data-src="/img/bVLvbI?w=574&amp;h=261" src="https://static.alili.tech/img/bVLvbI?w=574&amp;h=261" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>后端的最终文件目录结构</h4>
<p><span class="img-wrap"><img data-src="/img/bVLvcm?w=588&amp;h=332" src="https://static.alili.tech/img/bVLvcm?w=588&amp;h=332" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>下面我们说下主要的代码</h4>
<ul>
<li><p>GIF图里的校验文件就是对文件进行MD5+拿这个MD5值, 看下文件是否已经上传</p></li>
<li><ul>
<li><p>对文件的MD5小文件还好, 大文件的话会比较慢, 经我测试, 4G的文件, MD5的时间大约在2分钟</p></li>
<li><p>对文件进行MD5, 我们使用的是<code>spark-md5</code>, 因为这步是浏览器来做, 所以需要引入这个js</p></li>
<li><p>因为MD5的大文件时间比较长, 所以要和GIF图一样, 做成带进度的, 这样就需要把文件进行分片的MD5, spark也支持这种方式, 最终的MD5值为<code>spark.end()</code></p></li>
<li><p>和服务器校验文件的ajax请求, 需要传递文件名称和文件的MD5值</p></li>
<li><p><span class="img-wrap"><img data-src="/img/bVLvgC?w=1580&amp;h=362" src="https://static.alili.tech/img/bVLvgC?w=1580&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
</ul></li>
<ul>
<li><p>Node端会处理两件事件, 1.看文件是否存在 2.文件不存在, 返回已上传文件块的list, 文件没上传过, 则list为空</p></li>
<li><p><span class="img-wrap"><img data-src="/img/bVLvhs?w=1536&amp;h=414" src="https://static.alili.tech/img/bVLvhs?w=1536&amp;h=414" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>下面我们会对文件进行切片处理(File的API提供slice操作), 序号0-n, (服务器存储的文件形式也是MD5作为文件夹名, 0-n为文件名, 如上面那张服务器结果所示), 然后循环每个分片, 和上面的服务器返回的List做比对, 未在List上的文件进行上传</p></li>
<li><p>前端代码:<br><span class="img-wrap"><img data-src="/img/bVLviG?w=1150&amp;h=728" src="https://static.alili.tech/img/bVLviG?w=1150&amp;h=728" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>node端代码<br><span class="img-wrap"><img data-src="/img/bVLviU?w=1124&amp;h=974" src="https://static.alili.tech/img/bVLviU?w=1124&amp;h=974" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVLvi1?w=946&amp;h=642" src="https://static.alili.tech/img/bVLvi1?w=946&amp;h=642" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>最后一步, 当所有文件都上传完成, 告知Node端合并文件</p></li>
<li><p>前端代码<br><span class="img-wrap"><img data-src="/img/bVLvjd?w=1652&amp;h=288" src="https://static.alili.tech/img/bVLvjd?w=1652&amp;h=288" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>Node端代码<br><span class="img-wrap"><img data-src="/img/bVLvjj?w=1086&amp;h=454" src="https://static.alili.tech/img/bVLvjj?w=1086&amp;h=454" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
</ul>
<h2 id="articleHeader0">最后上源码: <a href="https://github.com/sunhaikuo/uploadDemo" rel="nofollow noreferrer" target="_blank">点击跳转GitHUb</a>
</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node+H5实现大文件分片上传(有源码)

## 原文链接
[https://segmentfault.com/a/1190000008899001](https://segmentfault.com/a/1190000008899001)

