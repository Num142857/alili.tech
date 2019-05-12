---
title: 'vue.js+vux项目总结' 
date: 2018-12-04 2:30:05
hidden: true
slug: 8y62ao8vnts
categories: [reprint]
---

{{< raw >}}

                    
<p>最近做完一个vue.js+vux的移动端项目，刚刚完成上线，记录一下开发过程中遇到的问题，避免以后再次遇到时，可以翻阅查看。</p>
<hr>
<h2><strong>1. 无法设置服务器发送过来的cookie</strong></h2>
<p>这是一个保存登录状态的问题，后台发送过来的session前端无法保存，解决办法<br>在main.js设置</p>
<pre><code>axios.defaults.withCredentials = true;        </code></pre>
<h2><strong>2. 请求接口跨域</strong></h2>
<p>这个问题主要时后台处理的，前端这边做的比较少</p>
<h2><strong>3. axios post请求后台无法收到数据的问题</strong></h2>
<p>先要设置请求头</p>
<pre><code>axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';</code></pre>
<h2>传数据：1、URLSearchParams();</h2>
<pre><code>const url ='http://****你的接口****';
var params = new URLSearchParams();
params.append('key1', 'value1');       //你要传给后台的参数值 key/value
params.append('key2', 'value2');
params.append('key3', 'value3');
this.$axios({
    method: 'post',
    url:url,
    data:params
}).then((res)=&gt;{
    
});</code></pre>
<p>这样的话  后台是可以收到数据的 但是兼容性非常不好 ，ie完全不兼容。所以放弃</p>
<h2>2、使用qs</h2>
<p>安装qs,在 main.js里引入</p>
<pre><code>import axios from 'axios';
import qs from 'qs';
Vue.prototype.$qs = qs;</code></pre>
<p>请求方法</p>
<pre><code> let postData = this.$qs.stringify({
    key1:value1,
    key2:value2,
    key3:value3,
});
this.$axios({
    method: 'post',
    url:'url',
    data:postData
}).then((res)=&gt;{
    
});</code></pre>
<p>这样后台就能收到数据了</p>
<h2><strong>4. vux 的x-button添加@click点击事件无效</strong></h2>
<p>这个问题 主要是刚使用vux ，没有认真看文档<br>解决办法很简单  使用 <code>@click.native</code><br>关于为什么要加 <code>.native</code> 修饰符，可以看这个回答：<br><a href="https://segmentfault.com/q/1010000011186651/a-1020000011187890"></a><a href="https://segmentfault.com/q/10...">https://segmentfault.com/q/10...</a></p>
<h2><strong>5. 图片上传方法</strong></h2>
<pre><code>&lt;input type='file' accept='images/*' @onchange='onChange'&gt;</code></pre>
<p>但是<code>input</code> 的<code>onchange</code>事件在微信 无法起作用<br>所以用了一个vue组件<code>vue-img-inputer</code><br><a href="https://github.com/waynecz/vue-img-inputer/blob/master/README-CN.MD" rel="nofollow noreferrer">vue-img-inputer组件使用方法</a></p>
<pre><code> &lt;VueImgInputer
      class="idCardImg"
      v-model="idCardBackImg"
      theme="light"
      accept="image/*"
      :imgSrc="idCardBackUrl"
      :onChange="onChange"
      :maxSize="5242880"
      placeholder="请上传身份证反面图片"
      noMask
      size="small"&gt;
  &lt;/VueImgInputer&gt;


onChange(file){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        reader.result
    };
},</code></pre>
<h2><strong>6. vue签名</strong></h2>
<pre><code>vue-signature组件[3]</code></pre>
<pre><code>&lt;vueSignature class="vueSignature" ref="signature" :sigOption="option" :w="'100%'" :h="'100vh'"&gt;&lt;/vueSignature&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV80HY?w=433&amp;h=852" src="https://static.alili.tech/img/bV80HY?w=433&amp;h=852" alt="图片描述" title="图片描述"></span></p>
<h2><strong>7.移动端横竖屏问题</strong></h2>
<p>用css来判断</p>
<pre><code>   /*竖屏（portrait）：*/
    @media screen and (orientation:portrait){
  
    }

    /*横屏（landscape）：*/
    @media screen and (orientation:landscape){
        
    }</code></pre>
<h2><strong>8.判断是否是安卓还是ios</strong></h2>
<pre><code>//判断是否是安卓还是ios  
function isAndroid_ios(){  
    var u = navigator.userAgent, app = navigator.appVersion;  
    var isAndroid = u.indexOf('Android') &gt; -1 || u.indexOf('Linux') &gt; -1; //android终端或者uc浏览器  
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
    return isAndroid==true?true:false;  
}  </code></pre>
<h2><strong>9.微信支付</strong></h2>
<pre><code>      getWxPayData(){
            var vm = this;
            let orderid = this.$route.query.orderid;
            console.log(orderid);
            let postData = this.$qs.stringify({
                is_apple:1,
                orderid:orderid
            })
            this.$axios({
                method: 'post',
                url:'',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data:postData
            }).then((res)=&gt;{
                if(res.data.errCode==201){
                    this.$vux.toast.show({
                        type:'warn',
                        text: res.data.retMsg
                    })
                }else {
                    vm.weixinPay(JSON.parse(res.data));
                }
            });
        },
        weixinPay(data){
            var vm= this;
            if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
                    document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
                }
            }else{
                vm.onBridgeReady(data);
            }
        },
        onBridgeReady:function(data) {
            var vm = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": data.appId,     //公众号名称，由商户传入
                    "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
                    "nonceStr": data.nonceStr, //随机串
                    "package": data.package,
                    "signType": data.signType, //微信签名方式：
                    "paySign": data.paySign //微信签名
                },
                function (res) {
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        vm.$vux.toast.show({
                            text: '支付成功',
                            type:'success',
                            onHide () {
                                vm.$router.push('/home');
                            }
                        })
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        vm.$vux.toast.show({
                            text: '支付失败' + res.err_msg,
                            type:'warn',
                            onHide () {
                                vm.$router.push('/home');
                            }
                        })
                    }
                }
            );
        },</code></pre>
<h2>参考：</h2>
<p><a href="https://www.jianshu.com/p/ebae956a2adb" rel="nofollow noreferrer">【移动端】移动端判断横竖屏的5种解决方案</a><br><a href="https://blog.csdn.net/u010934423/article/details/78867605" rel="nofollow noreferrer">移动端如何让页面强制横屏</a><br><a href="https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&amp;index=6" rel="nofollow noreferrer">微信内H5调起支付</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js+vux项目总结

## 原文链接
[https://segmentfault.com/a/1190000014502018](https://segmentfault.com/a/1190000014502018)

