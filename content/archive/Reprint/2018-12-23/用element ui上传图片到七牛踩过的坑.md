---
title: '用element ui上传图片到七牛踩过的坑' 
date: 2018-12-23 2:30:07
hidden: true
slug: swmx5a8118
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前端上传图片到七牛云的流程</h2>
<ol>
<li>请求后端接口获取上传凭证</li>
<li>请求七牛云地址上传图片到七牛云</li>
<li>上传完毕将获得七牛云返回的图片地址</li>
</ol>
<h2 id="articleHeader1">七牛云地址</h2>
<p>说到七牛云地址，奴家真的是一把鼻涕一把泪<br> 刚开始做图片上传的时候，没有好好看七牛云文档，结果跌了个大坑<br> 后台把将预览地址当成上传地址给我，结果一直报错：Document not found</p>
<p><span class="img-wrap"><img data-src="/img/bVZAmT?w=793&amp;h=164" src="https://static.alili.tech/img/bVZAmT?w=793&amp;h=164" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>心塞，幸苦一位大神耐心指点，才从坑里跳出来<br> 每个七牛云存储区域都对应着相应的服务器端客户端上传域名<br><a href="https://developer.qiniu.com/kodo/manual/1671/region-endpoint" rel="nofollow noreferrer" target="_blank">https://developer.qiniu.com/k...</a></p>
<p><span class="img-wrap"><img data-src="/img/bVZAjX?w=1818&amp;h=561" src="https://static.alili.tech/img/bVZAjX?w=1818&amp;h=561" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>token有了，域有了，我以为我离成功只有一步之遥了（其实还差十万八千里）</p>
<h2 id="articleHeader2">多张图片上传</h2>
<p><span class="img-wrap"><img data-src="/img/bVZAsR?w=650&amp;h=171" src="https://static.alili.tech/img/bVZAsR?w=650&amp;h=171" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>element ui里面的upload组件默认是立即上传图片，而我们的需求是点击确定按钮之后再上传多张图片</p>
<p><span class="img-wrap"><img data-src="/img/bVZFH4?w=828&amp;h=336" src="https://static.alili.tech/img/bVZFH4?w=828&amp;h=336" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>查看element ui关于upload组件的介绍发现auto-upload属性可以控制选取图片是否立即上传</p>
<p><span class="img-wrap"><img data-src="/img/bVZFUj?w=839&amp;h=43" src="https://static.alili.tech/img/bVZFUj?w=839&amp;h=43" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>所以下一步我把代码改成这样</p>
<p><span class="img-wrap"><img data-src="/img/bVZFUX?w=436&amp;h=423" src="https://static.alili.tech/img/bVZFUX?w=436&amp;h=423" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZFWr?w=544&amp;h=347" src="https://static.alili.tech/img/bVZFWr?w=544&amp;h=347" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZFWh?w=689&amp;h=347" src="https://static.alili.tech/img/bVZFWh?w=689&amp;h=347" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这样做确实可以将多张图片上传到七牛云<br>哇，做到这一步真的是好开心（第一次用element ui上传图片到七牛云，见谅见谅！！！）<br>but。。。。。。<br>项目经理说，上传到七牛云的照片必须按照上传时间的格式重新命名，这个好说呀，我又将代码改成这个样子了</p>
<p><span class="img-wrap"><img data-src="/img/bVZF3t?w=1223&amp;h=308" src="https://static.alili.tech/img/bVZF3t?w=1223&amp;h=308" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>这下应该完美了吧！！！<br>测试一下，简直要炸了，炸了！！！<br>不管我提交几张图片，最后能上传的就只有一张图片，除了成功上传图片的那个请求，其他请求都返回错误：图片已存在。<br>what???宝宝心里想哭！！！<br>慌了，重新看一遍文档，各种百度，一筹莫展，还好在我绝望的前一秒，迎来了柳暗花明，哈哈哈。。。。。。</p>
<h2 id="articleHeader3">element ui上传多张图片到七牛云并对图片重命名</h2>
<p>既然element ui默认的上传方式不行，那就只能用http-request属性来重写上传方式</p>
<p><span class="img-wrap"><img data-src="/img/bVZGd0?w=875&amp;h=63" src="https://static.alili.tech/img/bVZGd0?w=875&amp;h=63" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>于是，我的代码升级成这个样子</p>
<p><span class="img-wrap"><img data-src="/img/bVZGfe?w=774&amp;h=486" src="https://static.alili.tech/img/bVZGfe?w=774&amp;h=486" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZGhA?w=1031&amp;h=640" src="https://static.alili.tech/img/bVZGhA?w=1031&amp;h=640" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZGkg?w=1059&amp;h=864" src="https://static.alili.tech/img/bVZGkg?w=1059&amp;h=864" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><strong>多张图片上传到七牛云之前对图片重命名，压缩，都在重写http-request时解决了</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用element ui上传图片到七牛踩过的坑

## 原文链接
[https://segmentfault.com/a/1190000012278498](https://segmentfault.com/a/1190000012278498)

