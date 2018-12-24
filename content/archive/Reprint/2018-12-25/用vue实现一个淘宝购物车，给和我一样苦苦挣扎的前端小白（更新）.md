---
title: '用vue实现一个淘宝购物车，给和我一样苦苦挣扎的前端小白（更新）' 
date: 2018-12-25 2:30:11
hidden: true
slug: r9pa4rwmbu9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近后端的同事要我写一个购物车，一开始我用jQuery写，但写着写着发现逻辑太混乱了，写不下去。最后花了五分钟找了个demo丢给了他。后来我不甘心，毕竟水平菜还不求上进就完蛋了。所以我想着用vue来实现一个。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="本来想看看别人的代码，但搜索了下github发现，能找到的购物车都是两级分类的。而京东、淘宝之流都是三级分类的：  
1. 全选        
2. 店铺全选  
3. 商品选中   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>本来想看看别人的代码，但搜索了下github发现，能找到的购物车都是两级分类的。而京东、淘宝之流都是三级分类的：  
<span class="hljs-bullet">1. </span>全选        
<span class="hljs-bullet">2. </span>店铺全选  
<span class="hljs-bullet">3. </span>商品选中   </code></pre>
<p>这样的貌似才有实用价值</p>
<h1 id="articleHeader0">html部分，不过多赘述</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;cart&quot;>
    <section class=&quot;cartMain&quot;>
        <div class=&quot;cartMain_hd&quot;>
            <ul class=&quot;order_lists cartTop&quot;>
                <li class=&quot;list_chk&quot;>
                    <!--所有商品全选-->
                    <input type=&quot;checkbox&quot; id=&quot;all&quot; class=&quot;whole_check&quot;>
                    <label for=&quot;all&quot; :class=&quot;fetchData.status?'mark':''&quot; @click=&quot;cartchoose()&quot;></label>
                    全选
                </li>
                <li class=&quot;list_con&quot;>商品信息</li>
                <li class=&quot;list_info&quot;>商品参数</li>
                <li class=&quot;list_price&quot;>单价</li>
                <li class=&quot;list_amount&quot;>数量</li>
                <li class=&quot;list_sum&quot;>金额</li>
                <li class=&quot;list_op&quot;>操作</li>
               
            </ul>
        </div>

         <div class=&quot;cartBox&quot; v-for=&quot;item in fetchData.list&quot; key=&quot;index&quot;>
            <div class=&quot;shop_info&quot;>
                <div class=&quot;all_check&quot;>
                    <input type=&quot;checkbox&quot; id=&quot;shop_a&quot; class=&quot;shopChoice&quot;>
                    <label for=&quot;shop_a&quot; class=&quot;shop&quot; :class=&quot;item.check?'mark':''&quot; @click=&quot;shopchoose(item)&quot;></label>
                </div>
                <div class=&quot;shop_name&quot;>
                    店铺：<a href=&quot;javascript:;&quot;>"{{"item.shop_name"}}"</a>
                </div>
            </div>
            <div class=&quot;order_content&quot;>
                <ul class=&quot;order_lists&quot; v-for=&quot;pro in item.products&quot;>
                    <li class=&quot;list_chk&quot;>
                        <input type=&quot;checkbox&quot; id=&quot;checkbox_2&quot; class=&quot;son_check&quot;>
                        <label for=&quot;checkbox_2&quot; :class=&quot;pro.checked?'mark':''&quot; @click=&quot;choose(item,pro)&quot;></label>
                    </li>
                    <li class=&quot;list_con&quot;>
                        <div class=&quot;list_img&quot;><a href=&quot;javascript:;&quot;><img :src=&quot;pro.img&quot; alt=&quot;&quot;></a></div>
                        <div class=&quot;list_text&quot;><a href=&quot;javascript:;&quot;>"{{"pro.text"}}"</a>
                        <span class=&quot;list_custom&quot;>定制</span>
                        </div>
                    </li>
                    <li class=&quot;list_info&quot;>
                        <p>规格：默认</p>
                        <p>尺寸：16*16*3(cm)</p>
                    </li>
                    <li class=&quot;list_price&quot;>
                        <p class=&quot;price&quot;>￥"{{"pro.price"}}"</p>
                        <div class=&quot;charge&quot;>
                            <p>更多促销</p>
                            <div class=&quot;chargebox&quot;>
                                测试
                            </div>
                        </div>
                    </li>
                    <li class=&quot;list_amount&quot;>
                        <div class=&quot;amount_box&quot;>
                            <a href=&quot;javascript:;&quot; class=&quot;reduce reSty&quot; @click=&quot;reduce(pro)&quot;>-</a>
                            <input type=&quot;text&quot; v-model=&quot;pro.num&quot; class=&quot;sum&quot;>
                            <a href=&quot;javascript:;&quot; class=&quot;plus&quot; @click=&quot;add(pro)&quot;>+</a>
                        </div>
                    </li>
                    <li class=&quot;list_sum&quot;>
                        <p class=&quot;sum_price&quot;>￥"{{"pro.sum"}}"</p>
                    </li>
                    <li class=&quot;list_op&quot;>
                        <p class=&quot;collect&quot;><a href=&quot;javascript:;&quot; class=&quot;colBtn&quot;>收藏商品</a></p>
                        <p class=&quot;del&quot;><a href=&quot;javascript:;&quot; class=&quot;delBtn&quot;>移除商品</a></p>
                        <p class=&quot;custom&quot;><a href=&quot;javascript:;&quot; class=&quot;cusBtn&quot;>定制商品</a></p>
                        <div class=&quot;custombox&quot;>
                                测试
                        </div>
                    </li>
                </ul>
            </div>
        </div> 

        
        
        <!--底部-->
        <div class=&quot;bar-wrapper&quot;>
            <div class=&quot;bar-right&quot;>
                <div class=&quot;piece&quot;>已选商品<strong class=&quot;piece_num&quot;>"{{"this.fetchData.allnum"}}"</strong>件</div>
                <div class=&quot;totalMoney&quot;>共计: <strong class=&quot;total_text&quot;>￥"{{"this.fetchData.allsum"}}"</strong></div>
                <div class=&quot;calBtn&quot;><a href=&quot;javascript:;&quot;>结算</a></div>
            </div>
        </div>
    </section>
    <section class=&quot;model_bg&quot;></section>
    <section class=&quot;my_model&quot;>
        <p class=&quot;title&quot;>删除宝贝<span class=&quot;closeModel&quot;>X</span></p>
        <p>您确认要删除该宝贝吗？</p>
        <div class=&quot;opBtn&quot;><a href=&quot;javascript:;&quot; class=&quot;dialog-sure&quot;>确定</a><a href=&quot;javascript:;&quot; class=&quot;dialog-close&quot;>关闭</a></div>
    </section>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"cart"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cartMain"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cartMain_hd"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"order_lists cartTop"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_chk"</span>&gt;</span>
                    <span class="hljs-comment">&lt;!--所有商品全选--&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"all"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"whole_check"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"all"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"fetchData.status?'mark':''"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"cartchoose()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    全选
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_con"</span>&gt;</span>商品信息<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_info"</span>&gt;</span>商品参数<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_price"</span>&gt;</span>单价<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_amount"</span>&gt;</span>数量<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_sum"</span>&gt;</span>金额<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_op"</span>&gt;</span>操作<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
               
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

         <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cartBox"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in fetchData.list"</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"index"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shop_info"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"all_check"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shop_a"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shopChoice"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"shop_a"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shop"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"item.check?'mark':''"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"shopchoose(item)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shop_name"</span>&gt;</span>
                    店铺：<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.shop_name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"order_content"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"order_lists"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"pro in item.products"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_chk"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"checkbox_2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"son_check"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox_2"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"pro.checked?'mark':''"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"choose(item,pro)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_con"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_img"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"pro.img"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span></span><span class="hljs-template-variable">"{{"pro.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_custom"</span>&gt;</span>定制<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_info"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>规格：默认<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>尺寸：16*16*3(cm)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_price"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"price"</span>&gt;</span>￥</span><span class="hljs-template-variable">"{{"pro.price"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"charge"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>更多促销<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"chargebox"</span>&gt;</span>
                                测试
                            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_amount"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"amount_box"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"reduce reSty"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"reduce(pro)"</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"pro.num"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sum"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"plus"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"add(pro)"</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_sum"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sum_price"</span>&gt;</span>￥</span><span class="hljs-template-variable">"{{"pro.sum"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list_op"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collect"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colBtn"</span>&gt;</span>收藏商品<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"del"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"delBtn"</span>&gt;</span>移除商品<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"custom"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cusBtn"</span>&gt;</span>定制商品<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"custombox"</span>&gt;</span>
                                测试
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 

        
        
        <span class="hljs-comment">&lt;!--底部--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bar-wrapper"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bar-right"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"piece"</span>&gt;</span>已选商品<span class="hljs-tag">&lt;<span class="hljs-name">strong</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"piece_num"</span>&gt;</span></span><span class="hljs-template-variable">"{{"this.fetchData.allnum"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"totalMoney"</span>&gt;</span>共计: <span class="hljs-tag">&lt;<span class="hljs-name">strong</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"total_text"</span>&gt;</span>￥</span><span class="hljs-template-variable">"{{"this.fetchData.allsum"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"calBtn"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span>&gt;</span>结算<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"model_bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"my_model"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>删除宝贝<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"closeModel"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>您确认要删除该宝贝吗？<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"opBtn"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-sure"</span>&gt;</span>确定<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-close"</span>&gt;</span>关闭<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVYAJB?w=1208&amp;h=973" src="https://static.alili.tech/img/bVYAJB?w=1208&amp;h=973" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>大概长这个样子，很普通的一个购物车页面，另外html和css部分不是我写的，是下载的jQuery购物车的demo里的代码，这样比较省事情。</p>
<h1 id="articleHeader1">购物车逻辑分析</h1>
<p>1.三级选中按钮的实现  <br>2.每件商品总价的变动<br>3.商品总件数、商品总计价格的变动<br>4.输入商品数量导致2，3的变动（未实现）</p>
<h2 id="articleHeader2">先上数据</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
                return{
                    fetchData:{
                        list:[
                            {
                                shop_id:1,
                                shop_name:'搜猎人艺术生活',
                                products:[
                                    {
                                        pro_id:101,
                                        text:'洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶',
                                        price:480,
                                        num:1,
                                        img:'./images/1.png',
                                        sum:480,
                                        checked:false//商品选中状态
                                    },
                                    {
                                        pro_id:102,
                                        text:'花露水花露水花露水花露水花露水花露水花露水花露水',
                                        price:680,
                                        num:1,
                                        img:'./images/2.png',
                                        sum:680,
                                        checked:false
                                    },
                                    {
                                        pro_id:103,
                                        text:'燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片',
                                        price:380,
                                        num:1,
                                        img:'./images/3.png',
                                        sum:380,
                                        checked:false
                                    }
                                ],
                                check:false,//店铺选中状态
                                choose:0,//商品选中个数
                            },
                            {
                                shop_id:2,
                                shop_name:'卷卷旗舰店',
                                products:[
                                    {
                                        pro_id:201,
                                        text:'剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀',
                                        price:580,
                                        num:1,
                                        img:'./images/4.png',
                                        sum:580,
                                        checked:false
                                    },
                                    {
                                        pro_id:202,
                                        text:'卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸',
                                        price:780,
                                        num:1,
                                        img:'./images/5.png',
                                        sum:780,
                                        checked:false
                                    }
                                ],
                                check:false,
                                choose:0,
                            },
                            {
                                shop_id:3,
                                shop_name:'瓜皮的神秘商店',
                                products:[
                                    {
                                        pro_id:301,
                                        text:'眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片',
                                        price:180,
                                        num:1,
                                        img:'./images/6.png',
                                        sum:180,
                                        checked:false
                                    },
                                    {
                                        pro_id:302,
                                        text:'凑数的凑数的凑数的凑数的凑数的凑数的凑数的凑数的',
                                        price:280,
                                        num:1,
                                        img:'./images/7.png',
                                        sum:280,
                                        checked:false
                                    }                                
                                ],
                                check:false,
                                choose:0,
                            }
                        ],
                    status:false,//全选选中状态
                    allchoose:0,//店铺选中个数
                    allsum:0,//总计价格
                    allnum:0//总计数量
                    }
                }
            }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span>(){
                <span class="hljs-selector-tag">return</span>{
                    <span class="hljs-attribute">fetchData</span>:{
                        <span class="hljs-attribute">list</span>:[
                            {
                                <span class="hljs-attribute">shop_id</span>:<span class="hljs-number">1</span>,
                                <span class="hljs-attribute">shop_name</span>:<span class="hljs-string">'搜猎人艺术生活'</span>,
                                <span class="hljs-attribute">products</span>:[
                                    {
                                        <span class="hljs-attribute">pro_id</span>:<span class="hljs-number">101</span>,
                                        <span class="hljs-attribute">text</span>:<span class="hljs-string">'洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶'</span>,
                                        <span class="hljs-attribute">price</span>:<span class="hljs-number">480</span>,
                                        <span class="hljs-attribute">num</span>:<span class="hljs-number">1</span>,
                                        <span class="hljs-attribute">img</span>:<span class="hljs-string">'./images/1.png'</span>,
                                        <span class="hljs-attribute">sum</span>:<span class="hljs-number">480</span>,
                                        <span class="hljs-attribute">checked</span>:false<span class="hljs-comment">//商品选中状态</span>
                                    },
                                    {
                                        <span class="hljs-attribute">pro_id</span>:<span class="hljs-number">102</span>,
                                        <span class="hljs-attribute">text</span>:<span class="hljs-string">'花露水花露水花露水花露水花露水花露水花露水花露水'</span>,
                                        <span class="hljs-attribute">price</span>:<span class="hljs-number">680</span>,
                                        <span class="hljs-attribute">num</span>:<span class="hljs-number">1</span>,
                                        <span class="hljs-attribute">img</span>:<span class="hljs-string">'./images/2.png'</span>,
                                        <span class="hljs-attribute">sum</span>:<span class="hljs-number">680</span>,
                                        <span class="hljs-attribute">checked</span>:false
                                    },
                                    {
                                        <span class="hljs-attribute">pro_id</span>:<span class="hljs-number">103</span>,
                                        <span class="hljs-attribute">text</span>:<span class="hljs-string">'燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片'</span>,
                                        <span class="hljs-attribute">price</span>:<span class="hljs-number">380</span>,
                                        <span class="hljs-attribute">num</span>:<span class="hljs-number">1</span>,
                                        <span class="hljs-attribute">img</span>:<span class="hljs-string">'./images/3.png'</span>,
                                        <span class="hljs-attribute">sum</span>:<span class="hljs-number">380</span>,
                                        <span class="hljs-attribute">checked</span>:false
                                    }
                                ],
                                <span class="hljs-attribute">check</span>:false,<span class="hljs-comment">//店铺选中状态</span>
                                <span class="hljs-attribute">choose</span>:<span class="hljs-number">0</span>,<span class="hljs-comment">//商品选中个数</span>
                            },
                            {
                                <span class="hljs-attribute">shop_id</span>:<span class="hljs-number">2</span>,
                                <span class="hljs-attribute">shop_name</span>:<span class="hljs-string">'卷卷旗舰店'</span>,
                                <span class="hljs-attribute">products</span>:[
                                    {
                                        <span class="hljs-attribute">pro_id</span>:<span class="hljs-number">201</span>,
                                        <span class="hljs-attribute">text</span>:<span class="hljs-string">'剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀'</span>,
                                        <span class="hljs-attribute">price</span>:<span class="hljs-number">580</span>,
                                        <span class="hljs-attribute">num</span>:<span class="hljs-number">1</span>,
                                        <span class="hljs-attribute">img</span>:<span class="hljs-string">'./images/4.png'</span>,
                                        <span class="hljs-attribute">sum</span>:<span class="hljs-number">580</span>,
                                        <span class="hljs-attribute">checked</span>:false
                                    },
                                    {
                                        <span class="hljs-attribute">pro_id</span>:<span class="hljs-number">202</span>,
                                        <span class="hljs-attribute">text</span>:<span class="hljs-string">'卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸'</span>,
                                        <span class="hljs-attribute">price</span>:<span class="hljs-number">780</span>,
                                        <span class="hljs-attribute">num</span>:<span class="hljs-number">1</span>,
                                        <span class="hljs-attribute">img</span>:<span class="hljs-string">'./images/5.png'</span>,
                                        <span class="hljs-attribute">sum</span>:<span class="hljs-number">780</span>,
                                        <span class="hljs-attribute">checked</span>:false
                                    }
                                ],
                                <span class="hljs-attribute">check</span>:false,
                                <span class="hljs-attribute">choose</span>:<span class="hljs-number">0</span>,
                            },
                            {
                                <span class="hljs-attribute">shop_id</span>:<span class="hljs-number">3</span>,
                                <span class="hljs-attribute">shop_name</span>:<span class="hljs-string">'瓜皮的神秘商店'</span>,
                                <span class="hljs-attribute">products</span>:[
                                    {
                                        <span class="hljs-attribute">pro_id</span>:<span class="hljs-number">301</span>,
                                        <span class="hljs-attribute">text</span>:<span class="hljs-string">'眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片眼镜片'</span>,
                                        <span class="hljs-attribute">price</span>:<span class="hljs-number">180</span>,
                                        <span class="hljs-attribute">num</span>:<span class="hljs-number">1</span>,
                                        <span class="hljs-attribute">img</span>:<span class="hljs-string">'./images/6.png'</span>,
                                        <span class="hljs-attribute">sum</span>:<span class="hljs-number">180</span>,
                                        <span class="hljs-attribute">checked</span>:false
                                    },
                                    {
                                        <span class="hljs-attribute">pro_id</span>:<span class="hljs-number">302</span>,
                                        <span class="hljs-attribute">text</span>:<span class="hljs-string">'凑数的凑数的凑数的凑数的凑数的凑数的凑数的凑数的'</span>,
                                        <span class="hljs-attribute">price</span>:<span class="hljs-number">280</span>,
                                        <span class="hljs-attribute">num</span>:<span class="hljs-number">1</span>,
                                        <span class="hljs-attribute">img</span>:<span class="hljs-string">'./images/7.png'</span>,
                                        <span class="hljs-attribute">sum</span>:<span class="hljs-number">280</span>,
                                        <span class="hljs-attribute">checked</span>:false
                                    }                                
                                ],
                                <span class="hljs-attribute">check</span>:false,
                                <span class="hljs-attribute">choose</span>:<span class="hljs-number">0</span>,
                            }
                        ],
                    <span class="hljs-attribute">status</span>:false,<span class="hljs-comment">//全选选中状态</span>
                    <span class="hljs-attribute">allchoose</span>:<span class="hljs-number">0</span>,<span class="hljs-comment">//店铺选中个数</span>
                    <span class="hljs-attribute">allsum</span>:<span class="hljs-number">0</span>,<span class="hljs-comment">//总计价格</span>
                    <span class="hljs-attribute">allnum</span>:<span class="hljs-number">0</span><span class="hljs-comment">//总计数量</span>
                    }
                }
            },</code></pre>
<p>意义不明的部分写了注释，其他数据一目了然</p>
<h2 id="articleHeader3">单个商品的选中按钮</h2>
<p>单个商品的选中按钮很容易实现，一般是添加一个点击方法，值取反。但在购物车中这样的方法是不行的，单个商品的选中以及取消所执行的逻辑有部分不同，所以我选择将其拆分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="choosetrue(item,pro){
                    pro.checked=true//将商品选中状态改为true
                    ++item.choose===item.products.length?item.check=true:''//这里执行了两部，选中商品数量先+1，再与该店铺商品数量比较，如果相等就更改店铺选中状态为true
                    item.check?++this.fetchData.allchoose===this.fetchData.list.length?this.fetchData.status=true:this.fetchData.status=false:''//如果店铺选中状态改为true，选中店铺数量先+1，再与店铺数量比较，如果相等就更改全选选中状态为true      
                },
choosefalse(item,pro){
                    pro.checked=false//将商品选中状态改为false
                    --item.choose//选中商品数量-1
                    if(item.check){//如果店铺是被选中的，更改店铺选中状态
                        item.check=false
                        --this.fetchData.allchoose//并且选中店铺数量-1
                    }
                    this.fetchData.status=false//无论之前全选的状态，将其改为false就行
                },
choose(item,pro){
                    !pro.checked?this.choosetrue(item,pro):this.choosefalse(item,pro)
                },//这里是绑定到html上的方法，取反是由于你在触发方法的时候取的是之前的状态" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="Javascript">choosetrue(item,pro){
                    pro.checked=<span class="hljs-literal">true</span><span class="hljs-comment">//将商品选中状态改为true</span>
                    ++item.choose===item.products.length?item.check=<span class="hljs-literal">true</span>:<span class="hljs-string">''</span><span class="hljs-comment">//这里执行了两部，选中商品数量先+1，再与该店铺商品数量比较，如果相等就更改店铺选中状态为true</span>
                    item.check?++<span class="hljs-keyword">this</span>.fetchData.allchoose===<span class="hljs-keyword">this</span>.fetchData.list.length?<span class="hljs-keyword">this</span>.fetchData.status=<span class="hljs-literal">true</span>:<span class="hljs-keyword">this</span>.fetchData.status=<span class="hljs-literal">false</span>:<span class="hljs-string">''</span><span class="hljs-comment">//如果店铺选中状态改为true，选中店铺数量先+1，再与店铺数量比较，如果相等就更改全选选中状态为true      </span>
                },
choosefalse(item,pro){
                    pro.checked=<span class="hljs-literal">false</span><span class="hljs-comment">//将商品选中状态改为false</span>
                    --item.choose<span class="hljs-comment">//选中商品数量-1</span>
                    <span class="hljs-keyword">if</span>(item.check){<span class="hljs-comment">//如果店铺是被选中的，更改店铺选中状态</span>
                        item.check=<span class="hljs-literal">false</span>
                        --<span class="hljs-keyword">this</span>.fetchData.allchoose<span class="hljs-comment">//并且选中店铺数量-1</span>
                    }
                    <span class="hljs-keyword">this</span>.fetchData.status=<span class="hljs-literal">false</span><span class="hljs-comment">//无论之前全选的状态，将其改为false就行</span>
                },
choose(item,pro){
                    !pro.checked?<span class="hljs-keyword">this</span>.choosetrue(item,pro):<span class="hljs-keyword">this</span>.choosefalse(item,pro)
                },<span class="hljs-comment">//这里是绑定到html上的方法，取反是由于你在触发方法的时候取的是之前的状态</span></code></pre>
<p>相信有的人看了代码还是觉得能把三个函数写在一起，其实我之前就是这么干的，然后就悲剧了，可能是我功底不够。先不管这些。现在分析下店铺全选的逻辑：</p>
<ol>
<li><p>选中之后，店铺下的所有商品选中，并且判断全选按钮是否要选中</p></li>
<li><p>取消选中，店铺下的所有商品取消选中</p></li>
</ol>
<p>这是基本逻辑，但如果照这个思路写，用循环将商品状态更改，很轻松，但是还是需要判断是否要选中全选按钮。我们换个思路吧，因为我发现“判断是否要选中全选按钮”已经在之前写过了。店铺选中按钮的前半部分逻辑其实就是choosetrue函数执行了一定的次数，我是这样写的：</p>
<h2 id="articleHeader4">单个店铺的选中按钮</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shoptrue(item){
                    item.products.forEach((pro)=>{
                        pro.checked===false?this.choosetrue(item,pro):''
                    })
                },//循环店铺中的商品，先筛选出目前没选中的商品，给它执行choosetrue函数
shopfalse(item){
                    item.products.forEach((pro)=>{
                        pro.checked===true?this.choosefalse(item,pro):''
                    })
                },//循环店铺中的商品，先筛选出目前被选中的商品，给它执行choosefalse函数
shopchoose(item){
                    !item.check?this.shoptrue(item):this.shopfalse(item)
                },  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>shoptrue(item){
                    item.products.forEach(<span class="hljs-function"><span class="hljs-params">(pro)</span>=&gt;</span>{
                        pro.checked===<span class="hljs-literal">false</span>?<span class="hljs-keyword">this</span>.choosetrue(item,pro):<span class="hljs-string">''</span>
                    })
                },<span class="hljs-regexp">//</span>循环店铺中的商品，先筛选出目前没选中的商品，给它执行choosetrue函数
shopfalse(item){
                    item.products.forEach(<span class="hljs-function"><span class="hljs-params">(pro)</span>=&gt;</span>{
                        pro.checked===<span class="hljs-literal">true</span>?<span class="hljs-keyword">this</span>.choosefalse(item,pro):<span class="hljs-string">''</span>
                    })
                },<span class="hljs-regexp">//</span>循环店铺中的商品，先筛选出目前被选中的商品，给它执行choosefalse函数
shopchoose(item){
                    !item.check?<span class="hljs-keyword">this</span>.shoptrue(item):<span class="hljs-keyword">this</span>.shopfalse(item)
                },  </code></pre>
<p>刚才分开写的好处就出现啦，至于为什么要筛选一下，这和之后计算商品总价有关系（如果只是写多选按钮的逻辑，有人会图方便不筛选，比如一小时之前的我）</p>
<h2 id="articleHeader5">全选按钮</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cartchoose(){
                    this.fetchData.status=!this.fetchData.status//取反改变状态
                    this.fetchData.status?this.fetchData.list.forEach((item)=>this.shoptrue(item)):this.fetchData.list.forEach((item)=>this.shopfalse(item))
                },//根据取反后的状态进行相应的店铺按钮操作   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>cartchoose(){
                    <span class="hljs-keyword">this</span>.fetchData.status=!<span class="hljs-keyword">this</span>.fetchData.status<span class="hljs-comment">//取反改变状态</span>
                    <span class="hljs-keyword">this</span>.fetchData.status?<span class="hljs-keyword">this</span>.fetchData.list.forEach((item)=&gt;<span class="hljs-keyword">this</span>.shoptrue(item)):<span class="hljs-keyword">this</span>.fetchData.list.forEach((item)=&gt;<span class="hljs-keyword">this</span>.shopfalse(item))
                },<span class="hljs-comment">//根据取反后的状态进行相应的店铺按钮操作   </span></code></pre>
<p>有人可能发现为什么全选不进行筛选，其实是不需要筛选。之前选中的店铺按钮下的商品状态必然全部是true，只是空跑了一遍，总结起来的逻辑是：没选中的店铺改变状态-&gt;没选中的商品改变状态</p>
<h2 id="articleHeader6">增加按钮&amp;减少按钮</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" add(pro){
                    pro.num++//商品数量+1
                    pro.sum+=pro.price//商品总价变动
                   
                },
reduce(pro){
                    if(pro.num===1){
                        pro.num//当商品数量=1，不变
                    }else{
                        pro.num--//否则-1
                        pro.sum-=pro.price//商品总价变动
                     
                    }
                }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code> add(<span class="hljs-keyword">pro</span>){
                    <span class="hljs-keyword">pro</span>.num++<span class="hljs-comment">//商品数量+1</span>
                    <span class="hljs-keyword">pro</span>.<span class="hljs-keyword">sum</span>+=<span class="hljs-keyword">pro</span>.price<span class="hljs-comment">//商品总价变动</span>
                   
                },
reduce(<span class="hljs-keyword">pro</span>){
                    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">pro</span>.num===1){
                        <span class="hljs-keyword">pro</span>.num<span class="hljs-comment">//当商品数量=1，不变</span>
                    }<span class="hljs-keyword">else</span>{
                        <span class="hljs-keyword">pro</span>.num--<span class="hljs-comment">//否则-1</span>
                        <span class="hljs-keyword">pro</span>.<span class="hljs-keyword">sum</span>-=<span class="hljs-keyword">pro</span>.price<span class="hljs-comment">//商品总价变动</span>
                     
                    }
                }</code></pre>
<p>这里的逻辑比较简单，不细说。  <br>   接下来就是商品总计价格的变动，这里又要分析一下：首先，选中的商品才会影响总计价格的变动，那我们只需要将逻辑写着choosetrue函数中就行，而不需要去一遍一遍循环选中商品的总价格去计算总计价格，稍微调整下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="choosetrue(item,pro){
                    pro.checked=true
                    ++item.choose===item.products.length?item.check=true:''
                    item.check?++this.fetchData.allchoose===this.fetchData.list.length?this.fetchData.status=true:this.fetchData.status=false:''
                    this.fetchData.allsum+=pro.sum//当触发商品选中按钮，将商品总价格添加到总计价格
                },
choosefalse(item,pro){
                    pro.checked=false
                    --item.choose
                    if(item.check){
                        item.check=false
                        --this.fetchData.allchoose
                    }
                    this.fetchData.status=false
                    this.fetchData.allsum-=pro.sum//当触发商品取消按钮，将商品总价格从总计价格删去                 
                },
add(pro){
                    pro.num++
                    pro.sum+=pro.price
                    pro.checked?this.fetchData.allsum+=pro.price:this.fetchData.allsum//这里判断下商品的状态决定是不是要改变总计价格
                },
reduce(pro){
                    if(pro.num===1){
                        pro.num
                    }else{
                        pro.num--
                        pro.sum-=pro.price
                        pro.checked?this.fetchData.allsum-=pro.price:this.fetchData.allsum//同上
                    }
                }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>choosetrue(item,pro){
                    <span class="hljs-attribute">pro.checked=true
                    ++item.choose===item.products.length?item.check=true</span>:''
                    item<span class="hljs-variable">.check</span>?++this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.allchoose</span>===this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.list</span><span class="hljs-variable">.length</span>?this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.status</span>=true:this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.status</span>=false:''
                    this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.allsum</span>+=pro<span class="hljs-variable">.sum</span>//当触发商品选中按钮，将商品总价格添加到总计价格
                },
choosefalse(item,pro){
                    pro<span class="hljs-variable">.checked</span>=false
                    --item<span class="hljs-variable">.choose</span>
                    if(item<span class="hljs-variable">.check</span>){
                        item<span class="hljs-variable">.check</span>=false
                        --this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.allchoose</span>
                    }
                    this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.status</span>=false
                    this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.allsum-</span>=pro<span class="hljs-variable">.sum</span>//当触发商品取消按钮，将商品总价格从总计价格删去                 
                },
add(pro){
                    pro<span class="hljs-variable">.num</span>++
                    pro<span class="hljs-variable">.sum</span>+=pro<span class="hljs-variable">.price</span>
                    pro<span class="hljs-variable">.checked</span>?this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.allsum</span>+=pro<span class="hljs-variable">.price</span>:this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.allsum</span>//这里判断下商品的状态决定是不是要改变总计价格
                },
reduce(pro){
                    if(pro<span class="hljs-variable">.num</span>===1){
                        pro<span class="hljs-variable">.num</span>
                    }else{
                        pro<span class="hljs-variable">.num--</span>
                        pro<span class="hljs-variable">.sum-</span>=pro<span class="hljs-variable">.price</span>
                        pro<span class="hljs-variable">.checked</span>?this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.allsum-</span>=pro<span class="hljs-variable">.price</span>:this<span class="hljs-variable">.fetchData</span><span class="hljs-variable">.allsum</span>//同上
                    }
                }</code></pre>
<h2 id="articleHeader7">未完成部分</h2>
<p>商品数量的计算，这个淘宝和京东对数量的计算不同，淘宝是商品种类的数量，京东是商品总件数量，逻辑也较简单，跟商品价格后面相应添加就行。<br>当手动输入商品数量时，价格随之变动，我思考了半天只想到数据监测，但数据嵌套太深了，如果监测fetchData，监测函数会多次无意义触发，监测键盘也不现实，最好的办法是监测num这个数据，但我没继续实验，对watch用的不太熟。有小伙伴有实现方法麻烦告知</p>
<h2 id="articleHeader8">更新</h2>
<p>之前所有未完成部分已经解决，小伙伴们可以去github看源码。主要包括（商品数量计算，监控输入数字引起价格变动，输入数字的各种限制，避免有人填写负数和小数之类的）</p>
<h2 id="articleHeader9">源码</h2>
<blockquote><p><a href="https://github.com/yuyeqianxun/vue-cart" rel="nofollow noreferrer" target="_blank">https://github.com/yuyeqianxu...</a></p></blockquote>
<p>有bug麻烦告知一声，谢谢</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue实现一个淘宝购物车，给和我一样苦苦挣扎的前端小白（更新）

## 原文链接
[https://segmentfault.com/a/1190000012020677](https://segmentfault.com/a/1190000012020677)

