---
title: 'webpack+vue+mint-ui 实现上拉加载更多（Loadmore组件）' 
date: 2019-01-17 2:30:25
hidden: true
slug: 866xvsjx1kk
categories: [reprint]
---

{{< raw >}}

                    
<p>因为业务的需要界面需要实现分页的功能，所以我就研究了一下如何利用<code>mint-ui</code>自带的loadmore组件实现上拉加载更多功能。<br>   首先在文件中引入组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Indicator, Loadmore} from 'mint-ui';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {Indicator, Loadmore} <span class="hljs-keyword">from</span> <span class="hljs-string">'mint-ui'</span>;
</code></pre>
<p>参考了一下组件中的一些参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bottomMethod 是上拉刷新执行的方法
bottomPullText  为 pull 时加载提示区域的文字 默认值为上拉刷新，一般我会定义为上拉加载更多
bottomAllLoaded 若为真，则 bottomMethod 不会被再次触发" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">bottomMethod </span>是上拉刷新执行的方法
<span class="hljs-keyword">bottomPullText </span> 为 pull 时加载提示区域的文字 默认值为上拉刷新，一般我会定义为上拉加载更多
<span class="hljs-keyword">bottomAllLoaded </span>若为真，则 <span class="hljs-keyword">bottomMethod </span>不会被再次触发</code></pre>
<p>然后在HTML中写法如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<mt-loadmore :bottom-method=&quot;loadBottomUse&quot;
                     :bottom-all-loaded=&quot;allUseLoad&quot; :bottomPullText='bottomText'
                     ref=&quot;loadmore&quot;>
          <div class=&quot;tab-list&quot; v-for='item in useScoreLog'>
            <div class=&quot;tab-list-top&quot;>
              <span class=&quot;tab-name&quot;>"{{"item.remark"}}"</span>
              <span class=&quot;tab-num&quot;>"{{"item.score"}}"</span>
            </div>
            <div class=&quot;tab-list-bottom&quot;>
              <span class=&quot;tab-time&quot;>"{{"item.operateTime"}}"</span>
              <span class=&quot;tab-class&quot;>"{{"item.recordTypeName"}}"</span>
            </div>
          </div>
        </mt-loadmore>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">mt-loadmore</span> <span class="hljs-attr">:bottom-method</span>=<span class="hljs-string">"loadBottomUse"</span>
                     <span class="hljs-attr">:bottom-all-loaded</span>=<span class="hljs-string">"allUseLoad"</span> <span class="hljs-attr">:bottomPullText</span>=<span class="hljs-string">'bottomText'</span>
                     <span class="hljs-attr">ref</span>=<span class="hljs-string">"loadmore"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-list"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">'item in useScoreLog'</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-list-top"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-name"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.remark"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-num"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.score"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-list-bottom"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-time"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.operateTime"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-class"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.recordTypeName"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mt-loadmore</span>&gt;</span></span></code></pre>
<p>js中写法如下</p>
<p>首先在data的方法中定义初始化加载中的数组getScoreLog，当前页数pageNo，是否加载allLoaded，上拉时加载的文字bottomText，初始化方法中的数量总数totalCount。</p>
<p>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" data(){
      return {
        getScoreLog: [],
        pageNo: 1,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        totalCount: '',
      }
    },

初始化方法如下

getData(){
        this.$http.post(commonUrl + &quot;/restful/&quot;, {
          typeFlag: '1'
        }).then(response => {
          if (response.data.errcode == 0) {
            this.getScoreLog = response.data.scoreLog;
            this.totalGetCount = (response.data.recordCount + 9) / 10;
          }
        }, response => {
        });
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> <span class="hljs-keyword">data</span>(){
      <span class="hljs-keyword">return</span> {
        getScoreLog: [],
        pageNo: <span class="hljs-number">1</span>,
        allLoaded: <span class="hljs-literal">false</span>,
        bottomText: <span class="hljs-string">'上拉加载更多...'</span>,
        totalCount: <span class="hljs-string">''</span>,
      }
    },

初始化方法如下

getData(){
        <span class="hljs-keyword">this</span>.$http.post(commonUrl + <span class="hljs-string">"/restful/"</span>, {
          typeFlag: <span class="hljs-string">'1'</span>
        }).then(response =&gt; {
          <span class="hljs-keyword">if</span> (response.<span class="hljs-keyword">data</span>.errcode == <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">this</span>.getScoreLog = response.<span class="hljs-keyword">data</span>.scoreLog;
            <span class="hljs-keyword">this</span>.totalGetCount = (response.<span class="hljs-keyword">data</span>.recordCount + <span class="hljs-number">9</span>) / <span class="hljs-number">10</span>;
          }
        }, response =&gt; {
        });
      },</code></pre>
<p>下面便是上拉加载更多的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loadBottom() {
        this.pageNo += 1;
        if (this.pageNo == this.totalGetCount) {
          this.allLoaded = true;
        }
        setTimeout(() => {
          this.$http.post(commonUrl + &quot;/restful/&quot;, {
            pageNo: this.pageNo,
            typeFlag: '1'
          }).then(response => {
            if (response.data.errcode == 0) {
              this.getScoreLog = this.getScoreLog.concat(response.data.scoreLog);
            }
          }, response => {
          });
        }, 1500);
      },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>loadBottom() {
        <span class="hljs-keyword">this</span>.pageNo += <span class="hljs-number">1</span>;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNo == <span class="hljs-keyword">this</span>.totalGetCount) {
          <span class="hljs-keyword">this</span>.allLoaded = <span class="hljs-literal">true</span>;
        }
        setTimeout(() =&gt; {
          <span class="hljs-keyword">this</span>.$http.post(commonUrl + <span class="hljs-string">"/restful/"</span>, {
            pageNo: <span class="hljs-keyword">this</span>.pageNo,
            typeFlag: <span class="hljs-string">'1'</span>
          }).then(response =&gt; {
            <span class="hljs-keyword">if</span> (response.<span class="hljs-keyword">data</span>.errcode == <span class="hljs-number">0</span>) {
              <span class="hljs-keyword">this</span>.getScoreLog = <span class="hljs-keyword">this</span>.getScoreLog.concat(response.<span class="hljs-keyword">data</span>.scoreLog);
            }
          }, response =&gt; {
          });
        }, <span class="hljs-number">1500</span>);
      },
</code></pre>
<p>这样就大功告成啦~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue+mint-ui 实现上拉加载更多（Loadmore组件）

## 原文链接
[https://segmentfault.com/a/1190000008955098](https://segmentfault.com/a/1190000008955098)

