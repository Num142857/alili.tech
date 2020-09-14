---
title: '微信小程序-用户拒绝授权使用 wx.openSetting({}) 重新调起授权用户信息' 
date: 2019-01-14 2:30:07
hidden: true
slug: 6dinzpol18j
categories: [reprint]
---

{{< raw >}}

                    
<p>场景模拟：<br>   用户进入微信小程序-程序调出授权<br><span class="img-wrap"><img data-src="/img/bVNwm5?w=750&amp;h=1334" src="https://static.alili.tech/img/bVNwm5?w=750&amp;h=1334" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>选择拒绝之后，需要用到用户授权才能正常使用的页面，就无法正常使用了。</p>
<p><strong>解决方法：</strong><br>  在用户选择拒绝之后，弹窗提示用户 拒绝授权之后无法使用，让用户重新授权（<strong>微信小程序在第一次调起授权之后 ，要重新再调起，需要自己手动删除程序 或者是退出小程序 等待一段时间再进去才能调起授权，这种情况用户体验比较差</strong>）针对用户拒绝授权这种情况 监听 wx.getUserInfo -fail的回调使用  wx.showModal 提示用户 如图：<br><span class="img-wrap"><img data-src="/img/bVNwyx?w=750&amp;h=1334" src="https://static.alili.tech/img/bVNwyx?w=750&amp;h=1334" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>监听 wx.showModal confirm 调起设置管理 代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                      wx.openSetting({
                        success:function(res){
                          if (!res.authSetting[&quot;scope.userInfo&quot;] || !res.authSetting[&quot;scope.userLocation&quot;]) {
                               //这里是授权成功之后 填写你重新获取数据的js
                               //参考:
                                that.getLogiCallback('',      function(){
                                  callback('')
                                })                                   
                          }
                        }
                      })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>                      <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.openSetting</span>({
                        <span class="hljs-attribute">success</span>:<span class="hljs-built_in">function</span>(res){
                          if (!res.authSetting[<span class="hljs-string">"scope.userInfo"</span>] || !res.authSetting[<span class="hljs-string">"scope.userLocation"</span>]) {
                               //这里是授权成功之后 填写你重新获取数据的js
                               //参考:
                                that.<span class="hljs-built_in">getLogiCallback</span>(<span class="hljs-string">''</span>,      function(){
                                  <span class="hljs-built_in">callback</span>(<span class="hljs-string">''</span>)
                                })                                   
                          }
                        }
                      })
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVNwCP?w=840&amp;h=314" src="https://static.alili.tech/img/bVNwCP?w=840&amp;h=314" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>设置管理界面：<br><span class="img-wrap"><img data-src="/img/bVNwC9?w=750&amp;h=1334" src="https://static.alili.tech/img/bVNwC9?w=750&amp;h=1334" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>选择之后 就能重新成功获取用户的信息了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序-用户拒绝授权使用 wx.openSetting({}) 重新调起授权用户信息

## 原文链接
[https://segmentfault.com/a/1190000009381711](https://segmentfault.com/a/1190000009381711)

