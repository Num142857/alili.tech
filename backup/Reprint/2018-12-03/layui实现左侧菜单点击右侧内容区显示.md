---
title: 'layui实现左侧菜单点击右侧内容区显示' 
date: 2018-12-03 2:30:08
hidden: true
slug: 5ho99f3eig3
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>layui这个前端框架对后端人员来说提供了极大的方便，很大一部分同学在刚接触到这个框架就迫不及待的要动手实践了，刚好最近需要开发一个后台管理项目，就拿layui来进行学习和实践．</blockquote>
<p>还没有接触到的同学可以先通读一遍文档，这样在遇到问题的时候才能够对症下药，仔细研究相关的板块<br>今天我们先来学习一下使用layui来实现左侧点击菜单，内容区显示tab</p>
<h2>实验效果</h2>
<p><span class="img-wrap"><img data-src="/img/bV9uxa?w=802&amp;h=366" src="https://static.alili.tech/img/bV9uxa?w=802&amp;h=366" alt="图片描述" title="图片描述"></span></p>
<h2>实现过程</h2>
<p>html代码</p>
<pre><code class="html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
    &lt;title&gt;&lt;?php echo $curTitle;?&gt;&lt;/title&gt;
    &lt;link rel="stylesheet" href="js/layui/css/layui.css"&gt;
&lt;/head&gt;
&lt;body class="layui-layout-body"&gt;
&lt;div class="layui-layout layui-layout-admin"&gt;
    &lt;div class="layui-header"&gt;
        &lt;div class="layui-logo"&gt;XXXX业务管理平台&lt;/div&gt;
        &lt;ul class="layui-nav layui-layout-right"&gt;
            &lt;li class="layui-nav-item"&gt;
                欢迎光临，商户001
            &lt;/li&gt;
            &lt;li class="layui-nav-item"&gt;&lt;a href=""&gt;安全退出&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;

    &lt;div class="layui-side layui-bg-black"&gt;
        &lt;div class="layui-side-scroll"&gt;
            &lt;!-- 左侧垂直导航区域--&gt;
            &lt;ul class="layui-nav layui-nav-tree" lay-filter="test"&gt;
                &lt;li class="layui-nav-item"&gt;
                    &lt;a class="" href="javascript:;"&gt;管理员管理&lt;/a&gt;
                    &lt;dl class="layui-nav-child"&gt;
                        &lt;dd&gt;
                            &lt;a href="javascript:;" data-id="1" data-title="管理员列表" data-url="index.php?&amp;a=adminList"
                               class="site-demo-active" data-type="tabAdd"&gt;管理员列表&lt;/a&gt;&lt;/dd&gt;
                        &lt;dd&gt;&lt;a href="javascript:;" data-id="2" data-title="管理员日志" data-url="index.php?&amp;a=adminLogList"
                               class="site-demo-active" data-type="tabAdd"&gt;管理员日志&lt;/a&gt;&lt;/dd&gt;
                    &lt;/dl&gt;
                &lt;/li&gt;
                &lt;li class="layui-nav-item"&gt;
                    &lt;a href="javascript:;"&gt;交易管理&lt;/a&gt;
                    &lt;dl class="layui-nav-child"&gt;
                        &lt;dd&gt;&lt;a href="javascript:;" data-id="" data-id="3" data-title="存款列表"
                               　data-url="index.php?&amp;a=adminList" class="site-demo-active" data-type="tabAdd"&gt;存款列表&lt;/a&gt;
                        &lt;/dd&gt;
                        &lt;dd&gt;&lt;a href="javascript:;"&gt;代付列表&lt;/a&gt;&lt;/dd&gt;
                    &lt;/dl&gt;
                &lt;/li&gt;
                &lt;li class="layui-nav-item"&gt;
                    &lt;a href="javascript:;"&gt;系统管理&lt;/a&gt;
                    &lt;dl class="layui-nav-child"&gt;
                        &lt;dd&gt;&lt;a href="javascript:;"&gt;支付API设置&lt;/a&gt;&lt;/dd&gt;
                        &lt;dd&gt;&lt;a href="javascript:;"&gt;公告设置&lt;/a&gt;&lt;/dd&gt;
                        &lt;dd&gt;&lt;a href="javascript:;"&gt;控制台&lt;/a&gt;&lt;/dd&gt;
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;!--tab标签--&gt;
    &lt;div class="layui-tab" lay-filter="demo" lay-allowclose="true" style="margin-left: 200px;"&gt;
        &lt;ul class="layui-tab-title"&gt;&lt;/ul&gt;
        &lt;div class="layui-tab-content"&gt;&lt;/div&gt;
    &lt;/div&gt;

&lt;div class="layui-footer" style="text-align:center;"&gt;
    &lt;!-- 底部固定区域 --&gt;
    © sunway.tk XXXX业务管理平台
&lt;/div&gt;
&lt;/div&gt;
&lt;script src="/js/layui/layui.js"&gt;&lt;/script&gt;
&lt;script&gt;
&lt;!--这里是放置js代码区域--&gt;
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>javascript代码：</p>
<pre><code class="javascript">    layui.use(['element', 'layer', 'jquery'], function () {
        var element = layui.element;
        // var layer = layui.layer;
        var $ = layui.$;
        // 配置tab实践在下面无法获取到菜单元素
        $('.site-demo-active').on('click', function () {
            var dataid = $(this);
            //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
            if ($(".layui-tab-title li[lay-id]").length &lt;= 0) {
                //如果比零小，则直接打开新的tab项
                active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("data-title"));
            } else {
                //否则判断该tab项是否以及存在
                var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
                $.each($(".layui-tab-title li[lay-id]"), function () {
                    //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                    if ($(this).attr("lay-id") == dataid.attr("data-id")) {
                        isData = true;
                    }
                })
                if (isData == false) {
                    //标志为false 新增一个tab项
                    active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("data-title"));
                }
            }
            //最后不管是否新增tab，最后都转到要打开的选项页面上
            active.tabChange(dataid.attr("data-id"));
        });

        var active = {
            //在这里给active绑定几项事件，后面可通过active调用这些事件
            tabAdd: function (url, id, name) {
                //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
                //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
                element.tabAdd('demo', {
                    title: name,
                    content: '&lt;iframe data-frameid="' + id + '" scrolling="auto" frameborder="0" src="' + url + '" style="width:100%;height:99%;"&gt;&lt;/iframe&gt;',
                    id: id //规定好的id
                })
                FrameWH();  //计算ifram层的大小
            },
            tabChange: function (id) {
                //切换到指定Tab项
                element.tabChange('demo', id); //根据传入的id传入到指定的tab项
            },
            tabDelete: function (id) {
                element.tabDelete("demo", id);//删除
            }
        };
        function FrameWH() {
            var h = $(window).height();
            $("iframe").css("height",h+"px");
        }
    });</code></pre>
<p>实现逻辑：动态判断所点击的菜单元素，利用元素上设置的data属性值，在右侧内容区生成页面iframe进行动态显示<br>参考文献：<a href="http://www.layui.com/doc/element/tab.html#del" rel="nofollow noreferrer">layui官网</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
layui实现左侧菜单点击右侧内容区显示

## 原文链接
[https://segmentfault.com/a/1190000014617129](https://segmentfault.com/a/1190000014617129)

