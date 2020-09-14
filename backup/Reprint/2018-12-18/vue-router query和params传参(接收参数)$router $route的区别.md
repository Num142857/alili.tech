---
title: 'vue-router query和params传参(接收参数)$router $route的区别' 
date: 2018-12-18 2:30:11
hidden: true
slug: b4uuqtfsdcd
categories: [reprint]
---

{{< raw >}}

                    
<h4>今天做项目时踩到了vue-router传参的坑（query和params），所以决定总结一下二者的区别。</h4>
<h2 id="articleHeader0">直接总结干货！！！</h2>
<h3 id="articleHeader1">1.query方式传参和接收参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="传参: 
this.$router.push({
        path:'/xxx'
        query:{
          id:id
        }
      })
  
接收参数:
this.$route.query.id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>传参: 
this.<span class="hljs-variable">$router</span>.push({
        path:<span class="hljs-string">'/xxx'</span>
        query:{
          id:id
        }
      })
  
接收参数:
this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.id</span></code></pre>
<p><code>注意:传参是this.$router,接收参数是this.$route,这里千万要看清了！！！</code><br><br><strong> this.$router 和this.$route有何区别？</strong><br>在控制台打印两者可以很明显的看出两者的一些区别：</p>
<p><span class="img-wrap"><img data-src="/img/bVbbI7f?w=652&amp;h=425" src="https://static.alili.tech/img/bVbbI7f?w=652&amp;h=425" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>1.$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法</li>
<li>2.$route为当前router跳转对象，里面可以获取name、path、query、params等</li>
</ul>
<h3 id="articleHeader2">2.params方式传参和接收参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="传参: 
this.$router.push({
        name:'xxx'
        params:{
          id:id
        }
      })
  
接收参数:
this.$route.params.id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>传参: 
this.<span class="hljs-variable">$router</span>.push({
        name:<span class="hljs-string">'xxx'</span>
        params:{
          id:id
        }
      })
  
接收参数:
this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.id</span></code></pre>
<p><code>注意:params传参，push里面只能是 name:'xxxx',不能是path:'/xxx',因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！</code></p>
<h3 id="articleHeader3">另外，二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013825226?w=700&amp;h=940" src="https://static.alili.tech/img/remote/1460000013825226?w=700&amp;h=940" alt="加油" title="加油" style="cursor: pointer; display: inline;"></span></p>
<p><strong>vue的自学之路还得继续走，坑还会继续踩，下一个坑会是神马...</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-router query和params传参(接收参数)$router $route的区别

## 原文链接
[https://segmentfault.com/a/1190000012735168](https://segmentfault.com/a/1190000012735168)

