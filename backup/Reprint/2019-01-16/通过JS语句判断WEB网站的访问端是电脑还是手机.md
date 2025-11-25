---
title: '通过JS语句判断WEB网站的访问端是电脑还是手机' 
date: 2019-01-16 2:30:08
hidden: true
slug: va87r1gjm8j
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;> 
<!-- 
        //平台、设备和操作系统 
        var system = { 
            win: false, 
            mac: false, 
            xll: false, 
            ipad:false 
        }; 
        //检测平台 
        var p = navigator.platform; 
        system.win = p.indexOf(&quot;Win&quot;) == 0; 
        system.mac = p.indexOf(&quot;Mac&quot;) == 0; 
        system.x11 = (p == &quot;X11&quot;) || (p.indexOf(&quot;Linux&quot;) == 0); 
        system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false; 
        //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面 
        if (system.win || system.mac || system.xll||system.ipad) { 
 
        } else { 
 
            window.location.href = &quot;http://www.jdpatro.com/3g/&quot;; 
        } 
--> 
</script> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript"> 
&lt;!-- 
        <span class="hljs-comment">//平台、设备和操作系统 </span>
        <span class="hljs-keyword">var</span> system = { 
            <span class="hljs-attr">win</span>: <span class="hljs-literal">false</span>, 
            <span class="hljs-attr">mac</span>: <span class="hljs-literal">false</span>, 
            <span class="hljs-attr">xll</span>: <span class="hljs-literal">false</span>, 
            <span class="hljs-attr">ipad</span>:<span class="hljs-literal">false</span> 
        }; 
        <span class="hljs-comment">//检测平台 </span>
        <span class="hljs-keyword">var</span> p = navigator.platform; 
        system.win = p.indexOf(<span class="hljs-string">"Win"</span>) == <span class="hljs-number">0</span>; 
        system.mac = p.indexOf(<span class="hljs-string">"Mac"</span>) == <span class="hljs-number">0</span>; 
        system.x11 = (p == <span class="hljs-string">"X11"</span>) || (p.indexOf(<span class="hljs-string">"Linux"</span>) == <span class="hljs-number">0</span>); 
        system.ipad = (navigator.userAgent.match(<span class="hljs-regexp">/iPad/i</span>) != <span class="hljs-literal">null</span>)?<span class="hljs-literal">true</span>:<span class="hljs-literal">false</span>; 
        <span class="hljs-comment">//跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面 </span>
        <span class="hljs-keyword">if</span> (system.win || system.mac || system.xll||system.ipad) { 
 
        } <span class="hljs-keyword">else</span> { 
 
            <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"http://www.jdpatro.com/3g/"</span>; 
        } 
--&gt; 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> </code></pre>
<h2 id="articleHeader0">腾讯网的适配代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>  
if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){ 
    if(window.location.href.indexOf(&quot;?mobile&quot;)<0){ 
        try{ 
            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){ 
                window.location.href=&quot;http://shipei.qq.com/index.htm&quot;; 
            }else if(/iPad/i.test(navigator.userAgent)){ 
            }else{ 
                window.location.href=&quot;http://shipei.qq.com/simple/s/index/&quot; 
            } 
        }catch(e){} 
    } 
} 
</script> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;  
<span class="hljs-keyword">if</span>(/AppleWebKit.*Mobile/i.test(navigator.userAgent) |<span class="hljs-type">| (/MIDP</span>|<span class="hljs-type">SymbianOS</span>|<span class="hljs-type">NOKIA</span>|<span class="hljs-type">SAMSUNG</span>|<span class="hljs-type">LG</span>|<span class="hljs-type">NEC</span>|<span class="hljs-type">TCL</span>|<span class="hljs-type">Alcatel</span>|<span class="hljs-type">BIRD</span>|<span class="hljs-type">DBTEL</span>|<span class="hljs-type">Dopod</span>|<span class="hljs-type">PHILIPS</span>|<span class="hljs-type">HAIER</span>|<span class="hljs-type">LENOVO</span>|<span class="hljs-type">MOT</span>-|<span class="hljs-type">Nokia</span>|<span class="hljs-type">SonyEricsson</span>|<span class="hljs-type">SIE</span>-|<span class="hljs-type">Amoi</span>|<span class="hljs-type">ZTE</span>/.test(navigator.userAgent))){ 
    <span class="hljs-keyword">if</span>(window.location.href.indexOf(<span class="hljs-string">"?mobile"</span>)&lt;<span class="hljs-number">0</span>){ 
        <span class="hljs-built_in">try</span>{ 
            <span class="hljs-keyword">if</span>(/Android|<span class="hljs-type">webOS</span>|<span class="hljs-type">iPhone</span>|<span class="hljs-type">iPod</span>|<span class="hljs-type">BlackBerry</span>/i.test(navigator.userAgent)){ 
                window.location.href=<span class="hljs-string">"http://shipei.qq.com/index.htm"</span>; 
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(/iPad/i.test(navigator.userAgent)){ 
            }<span class="hljs-keyword">else</span>{ 
                window.location.href=<span class="hljs-string">"http://shipei.qq.com/simple/s/index/"</span> 
            } 
        }catch(e){} 
    } 
} 
&lt;/script&gt; </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;> 
    var browser = { 
        versions : function() { 
            var u = navigator.userAgent, app = navigator.appVersion; 
            return {//移动终端浏览器版本信息                                  
            trident : u.indexOf('Trident') > -1, //IE内核                                  
            presto : u.indexOf('Presto') > -1, //opera内核                                  
            webKit : u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                                  
            gecko : u.indexOf('Gecko') > -1 &amp;&amp; u.indexOf('KHTML') == -1, //火狐内核                                 
            mobile : !!u.match(/AppleWebKit.*Mobile.*/) 
                    || !!u.match(/AppleWebKit/), //是否为移动终端                                  
            ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                  
            android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                                  
            iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                     
            iPad: u.indexOf('iPad') > -1, //是否iPad        
            webApp : u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部 
            google:u.indexOf('Chrome')>-1 
        }; 
    }(), 
    language : (navigator.browserLanguage || navigator.language).toLowerCase() 
    } 
    document.writeln(&quot;语言版本: &quot;+browser.language); 
    document.writeln(&quot; 是否为移动终端: &quot;+browser.versions.mobile); 
</script> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript"> 
    <span class="hljs-keyword">var</span> browser = { 
        <span class="hljs-attr">versions</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ 
            <span class="hljs-keyword">var</span> u = navigator.userAgent, app = navigator.appVersion; 
            <span class="hljs-keyword">return</span> {<span class="hljs-comment">//移动终端浏览器版本信息                                  </span>
            trident : u.indexOf(<span class="hljs-string">'Trident'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//IE内核                                  </span>
            presto : u.indexOf(<span class="hljs-string">'Presto'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//opera内核                                  </span>
            webKit : u.indexOf(<span class="hljs-string">'AppleWebKit'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//苹果、谷歌内核                                  </span>
            gecko : u.indexOf(<span class="hljs-string">'Gecko'</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; u.indexOf(<span class="hljs-string">'KHTML'</span>) == <span class="hljs-number">-1</span>, <span class="hljs-comment">//火狐内核                                 </span>
            mobile : !!u.match(<span class="hljs-regexp">/AppleWebKit.*Mobile.*/</span>) 
                    || !!u.match(<span class="hljs-regexp">/AppleWebKit/</span>), <span class="hljs-comment">//是否为移动终端                                  </span>
            ios : !!u.match(<span class="hljs-regexp">/\(i[^;]+;( U;)? CPU.+Mac OS X/</span>), <span class="hljs-comment">//ios终端                  </span>
            android : u.indexOf(<span class="hljs-string">'Android'</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">'Linux'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//android终端或者uc浏览器                                  </span>
            iPhone : u.indexOf(<span class="hljs-string">'iPhone'</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">'Mac'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否为iPhone或者QQHD浏览器                     </span>
            iPad: u.indexOf(<span class="hljs-string">'iPad'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否iPad        </span>
            webApp : u.indexOf(<span class="hljs-string">'Safari'</span>) == <span class="hljs-number">-1</span>,<span class="hljs-comment">//是否web应该程序，没有头部与底部 </span>
            google:u.indexOf(<span class="hljs-string">'Chrome'</span>)&gt;<span class="hljs-number">-1</span> 
        }; 
    }(), 
    <span class="hljs-attr">language</span> : (navigator.browserLanguage || navigator.language).toLowerCase() 
    } 
    <span class="hljs-built_in">document</span>.writeln(<span class="hljs-string">"语言版本: "</span>+browser.language); 
    <span class="hljs-built_in">document</span>.writeln(<span class="hljs-string">" 是否为移动终端: "</span>+browser.versions.mobile); 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> </code></pre>
<h2 id="articleHeader1">JS 判断浏览器客户端类型(ipad,iphone,android)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>  
   var bForcepc 
= fGetQuery(&quot;dv&quot;) == &quot;pc&quot;;   
   function 
fBrowserRedirect(){   
       var sUserAgent = navigator.userAgent.toLowerCase();  
       var bIsIpad = sUserAgent.match(/ipad/i) == 
&quot;ipad&quot;;    
       var bIsIphoneOs = sUserAgent.match(/iphone os/i) == &quot;iphone os&quot;;  
       var bIsMidp = sUserAgent.match(/midp/i) == &quot;midp&quot;;  
       var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == &quot;rv:1.2.3.4&quot;;  
       var bIsUc = sUserAgent.match(/ucweb/i) == &quot;ucweb&quot;;  
       var bIsAndroid = sUserAgent.match(/android/i) == &quot;android&quot;;  
       var bIsCE = sUserAgent.match(/windows ce/i) == &quot;windows ce&quot;;  
       var bIsWM = sUserAgent.match(/windows mobile/i) == &quot;windows 
mobile&quot;;   
       if(bIsIpad){   
           var sUrl = 
location.href;      
           if(!bForcepc){   
               window.location.href = &quot;http://ipad.mail.163.com/&quot;;  
           }   
       }   
       if(bIsIphoneOs || bIsAndroid){   
           var sUrl = 
location.href;      
           if(!bForcepc){   
               window.location.href = &quot;http://smart.mail.163.com/&quot;;  
           }   
       }   
       if(bIsMidp||bIsUc7||bIsUc||bIsCE||bIsWM){   
           var sUrl = 
location.href;      
           if(!bForcepc){   
               window.location.href = &quot;http://m.mail.163.com/&quot;;  
           }   
       }   
   }  
   function 
fGetQuery(name){//获取参数值   
       var sUrl = window.location.search.substr(1);  
       var r = sUrl.match(new RegExp(&quot;(^|&amp;)&quot; + name + 
&quot;=([^&amp;]*)(&amp;|$)&quot;));  
       return (r == null ? null : (r[2]));  
   }  
   function 
fShowVerBlock(){     
       if(bForcepc){   
           document.getElementByIdx_x(&quot;dv_block&quot;).style.display = &quot;block&quot;;  
       }   
       else{   
           document.getElementByIdx_x(&quot;ad_block&quot;).style.display = &quot;block&quot;;  
       }   
   }  
   fBrowserRedirect();   
   </script> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;script <span class="hljs-keyword">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;  
   <span class="hljs-keyword">var</span> bForcepc 
= fGetQuery(<span class="hljs-string">"dv"</span>) == <span class="hljs-string">"pc"</span>;   
   function 
fBrowserRedirect(){   
       <span class="hljs-keyword">var</span> sUserAgent = navigator.userAgent.toLowerCase();  
       <span class="hljs-keyword">var</span> bIsIpad = sUserAgent.<span class="hljs-built_in">match</span>(/ipad/i) == 
<span class="hljs-string">"ipad"</span>;    
       <span class="hljs-keyword">var</span> bIsIphoneOs = sUserAgent.<span class="hljs-built_in">match</span>(/iphone os/i) == <span class="hljs-string">"iphone os"</span>;  
       <span class="hljs-keyword">var</span> bIsMidp = sUserAgent.<span class="hljs-built_in">match</span>(/midp/i) == <span class="hljs-string">"midp"</span>;  
       <span class="hljs-keyword">var</span> bIsUc7 = sUserAgent.<span class="hljs-built_in">match</span>(/rv:1.2.3.4/i) == <span class="hljs-string">"rv:1.2.3.4"</span>;  
       <span class="hljs-keyword">var</span> bIsUc = sUserAgent.<span class="hljs-built_in">match</span>(/ucweb/i) == <span class="hljs-string">"ucweb"</span>;  
       <span class="hljs-keyword">var</span> bIsAndroid = sUserAgent.<span class="hljs-built_in">match</span>(/android/i) == <span class="hljs-string">"android"</span>;  
       <span class="hljs-keyword">var</span> bIsCE = sUserAgent.<span class="hljs-built_in">match</span>(/windows ce/i) == <span class="hljs-string">"windows ce"</span>;  
       <span class="hljs-keyword">var</span> bIsWM = sUserAgent.<span class="hljs-built_in">match</span>(/windows mobile/i) == "windows 
mobile";   
       <span class="hljs-keyword">if</span>(bIsIpad){   
           <span class="hljs-keyword">var</span> sUrl = 
location.href;      
           <span class="hljs-keyword">if</span>(!bForcepc){   
               <span class="hljs-keyword">window</span>.location.href = <span class="hljs-string">"http://ipad.mail.163.com/"</span>;  
           }   
       }   
       <span class="hljs-keyword">if</span>(bIsIphoneOs || bIsAndroid){   
           <span class="hljs-keyword">var</span> sUrl = 
location.href;      
           <span class="hljs-keyword">if</span>(!bForcepc){   
               <span class="hljs-keyword">window</span>.location.href = <span class="hljs-string">"http://smart.mail.163.com/"</span>;  
           }   
       }   
       <span class="hljs-keyword">if</span>(bIsMidp||bIsUc7||bIsUc||bIsCE||bIsWM){   
           <span class="hljs-keyword">var</span> sUrl = 
location.href;      
           <span class="hljs-keyword">if</span>(!bForcepc){   
               <span class="hljs-keyword">window</span>.location.href = <span class="hljs-string">"http://m.mail.163.com/"</span>;  
           }   
       }   
   }  
   function 
fGetQuery(name){<span class="hljs-comment">//获取参数值   </span>
       <span class="hljs-keyword">var</span> sUrl = <span class="hljs-keyword">window</span>.location.<span class="hljs-keyword">search</span>.<span class="hljs-built_in">substr</span>(1);  
       <span class="hljs-keyword">var</span> r = sUrl.<span class="hljs-built_in">match</span>(new RegExp(<span class="hljs-string">"(^|&amp;)"</span> + name + 
<span class="hljs-string">"=([^&amp;]*)(&amp;|$)"</span>));  
       <span class="hljs-keyword">return</span> (r == null ? null : (r[2]));  
   }  
   function 
fShowVerBlock(){     
       <span class="hljs-keyword">if</span>(bForcepc){   
           document.getElementByIdx_x(<span class="hljs-string">"dv_block"</span>).style.<span class="hljs-keyword">display</span> = <span class="hljs-string">"block"</span>;  
       }   
       <span class="hljs-keyword">else</span>{   
           document.getElementByIdx_x(<span class="hljs-string">"ad_block"</span>).style.<span class="hljs-keyword">display</span> = <span class="hljs-string">"block"</span>;  
       }   
   }  
   fBrowserRedirect();   
   &lt;/script&gt; </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过JS语句判断WEB网站的访问端是电脑还是手机

## 原文链接
[https://segmentfault.com/a/1190000009153213](https://segmentfault.com/a/1190000009153213)

