---
title: 'vue从创建到完整的饿了么（14）shop.vue' 
date: 2018-12-31 2:30:29
hidden: true
slug: ice5non3nng
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">说明</h2>
<p>1.上一章--<a href="https://segmentfault.com/a/1190000011108061">饿了么loading图</a>、<br>2.苍渡大神源码--<a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">项目源码地址</a><br>3.UI框架--<a href="https://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">Mint UI</a><br>4.数据接口--<a href="https://github.com/bailicangdu/node-elm/blob/master/API.md" rel="nofollow noreferrer" target="_blank">接口API</a><br>5.下一章--<a href="https://segmentfault.com/a/1190000011330281">组件动画</a></p>
<h2 id="articleHeader1">开始</h2>
<p>1.UI图如下<br><span class="img-wrap"><img data-src="/img/bVU1Ni?w=750&amp;h=1334" src="https://static.alili.tech/img/bVU1Ni?w=750&amp;h=1334" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.shop.vue页面代码修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;shop&quot; class=&quot;bgfff&quot;>
        <div class=&quot;topbg&quot;>
                <img class=&quot;topbgimg&quot; :src=&quot;imgpath+shopinfo.image_path&quot;>
        </div>
        <div class=&quot;shoptop&quot;>
            <div class=&quot;toptop ih30&quot;>
              <icon class=&quot;backicon&quot; name=&quot;back&quot;></icon>
              <span class=&quot;right&quot;>
                  <icon class=&quot;backicon2&quot; name=&quot;cart&quot;></icon>
                  <icon class=&quot;backicon2&quot; name=&quot;more&quot;></icon> 
              </span>
            </div>
            <div class=&quot;topfoot&quot;>
                <div class=&quot;topleft&quot;>
                    <img src=&quot;&quot;>
                </div>
                <div class=&quot;topright nowarp&quot;>
                    <div class=&quot;foota&quot;>
                        <div class=&quot;footamain fs1-2 nowarp&quot;>超出回音长么哈哈哈哈哈音长么</div>
                        <icon name=&quot;right&quot; class=&quot; icon3&quot;></icon>
                    </div>
                    <div class=&quot;footb nowarp&quot;>
                        <div class=&quot;nowarp&quot;>公告:这是一条公司拟水电费可死定了房价酸辣粉机</div>
                    </div>
                    <div class=&quot;footc&quot;>
                        <span class=&quot;footcmain&quot;><span>蜂鸟专送</span>•<span>约31分钟</span></span>
                    </div>
                </div>
            </div>
        </div>

        <div class=&quot;shopmid mgtop10&quot;>
            <div class=&quot;midtop&quot;><span class=&quot;te&quot;>特</span><span>16元特价秒杀</span><span class=&quot;right&quot;>3个活动 <icon name=&quot;down&quot; class=&quot;icon4&quot;></icon></span></div>
            <div class=&quot;mytab&quot;>
                <div class=&quot;on&quot;>商品</div>
                <div>评价4.8分</div>
            </div>
        </div>

    <div class=&quot;shopmain&quot;>
        <div class=&quot;mianleft&quot;>
            <div class=&quot;leftdiv on&quot;>
                <div >
                    <icon class=&quot;icon5&quot; name=&quot;hot&quot;></icon>
                    <span>热销</span>
                </div>
            </div>
            <div class=&quot;leftdiv&quot;>
              <div>
                 <icon class=&quot;icon5&quot; name=&quot;discount&quot;></icon>
                  <span>优惠</span>
              </div>
            </div>
            <div class=&quot;leftdiv&quot;>
              <div> 
                <span>很长的蔡明</span>
              </div>  
            </div>
            <div class=&quot;leftdiv&quot;>
              <div>
                <span>段蔡明</span>
              </div>
            </div>
             <div class=&quot;leftdiv&quot;>
              <div>
                <span>菜名</span>
              </div>
            </div>
             <div class=&quot;leftdiv&quot;>
               <div>
                <span>菜名</span>
              </div>
            </div>
             <div class=&quot;leftdiv&quot;>
              <div>
                <span>菜名</span>
              </div>
            </div>
        </div>
        <div class=&quot;mainright&quot;>
            <div class=&quot;item&quot;>
                <div class=&quot;itemtop ih30 after&quot;>
                    <span class=&quot;fs15&quot;>热销</span>
                    <span class=&quot;fs0-8 col9f&quot;>大家都爱吃才是真的好吃</span>
                </div>
                <div class=&quot;itemmain&quot;>
                    <div class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img src=&quot;&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>宫保鸡丁</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>月售857份</span><span class=&quot;fs10 mgl&quot;>好评率97%</span></div>
                            <div class=&quot;ih15&quot;><span class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;><span class=&quot;colred fs12&quot;>￥</span><span class=&quot;colred mgr5&quot;>25</span><span class=&quot;fs12 col9f midline&quot;>￥56</span><icon name=&quot;add&quot; class=&quot;addicon right&quot; ></icon></div>
                        </div>
                    </div>
                    <div class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img src=&quot;&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>宫保鸡丁</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>月售857份</span><span class=&quot;fs10 mgl&quot;>好评率97%</span></div>
                            <div class=&quot;ih15&quot;><span class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;><span class=&quot;colred fs12&quot;>￥</span><span class=&quot;colred mgr5&quot;>25</span><span class=&quot;fs12 col9f midline&quot;>￥56</span><icon name=&quot;add&quot; class=&quot;addicon right&quot; ></icon></div>
                        </div>
                    </div>
                    <div class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img src=&quot;&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>宫保鸡丁</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>月售857份</span><span class=&quot;fs10 mgl&quot;>好评率97%</span></div>
                            <div class=&quot;ih15&quot;><span class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;><span class=&quot;colred fs12&quot;>￥</span><span class=&quot;colred mgr5&quot;>25</span><span class=&quot;fs12 col9f midline&quot;>￥56</span><icon name=&quot;add&quot; class=&quot;addicon right&quot; ></icon></div>
                        </div>
                    </div>
                    <div class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img src=&quot;&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>宫保鸡丁</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>月售857份</span><span class=&quot;fs10 mgl&quot;>好评率97%</span></div>
                            <div class=&quot;ih15&quot;><span class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;><span class=&quot;colred fs12&quot;>￥</span><span class=&quot;colred mgr5&quot;>25</span><span class=&quot;fs12 col9f midline&quot;>￥56</span><icon name=&quot;add&quot; class=&quot;addicon right&quot; ></icon></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=&quot;foot&quot;>
      <div class=&quot;footleft&quot;>
          <div class=&quot;footlogo&quot;><icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon></div>
          <div class=&quot;footmain&quot;>未选购商品</div>
      </div>
      <div class=&quot;footright&quot;>
          ￥20起送
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  components:{
  //注册组件

  },
  mounted:function(){
  //生命周期
    
  },
  computed:{
  //计算属性

  },
  methods:{
  //函数

  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
.shoptop{
  height:120px;
  background-color: rgba(119,103,137,.43);
  box-sizing:border-box;
  padding:10px 10px 0px 10px;
  position: relative;
}
.topbg{
  position: absolute;
  width:100%;
  height:120px;
  left:0px;
  right:0px;
  overflow:hidden;
}
.topbgimg{
  width:100%;
  filter: blur(10px);
}
.backicon{
  height:30px;
  width:30px;
}
.backicon2{
  height:25px;
  width:25px;
}
.toptop{
  margin-bottom:10px;
}
.topfoot{
  height:70px;
  display:flex;
}
.topleft{
  height:80px;
  width:80px;
  background-color:#3c3c3c;
  margin-right:10px;
  border-radius:3px;
  box-shadow:0 0 5px #3c3c3c;  
}
.topleft>img{
  max-width:100%;
  max-height:100%;
}
.topright,.topleft{
  float:left;
}
.topright{
  height:100%;
  flex:1;
}
.foota{
  height:30px;
  color:white;
  line-height:30px;
  display:flex;
}
.icon3{
  width:20px;
  height:20px;
  margin-top:5px;
}
.footc{
  height:20px;
  line-height:20px;
  font-size:12px;
}
.footb{
  font-size:12px;
  color:white;
}
.footcmain{
  background-color:#0097FF;
  color:white;
  padding:0px 5px; 
}
.shopmid{
  padding:10px 10px 0px 10px;
  margin-bottom:10px;
  border-bottom:2px solid #F8F8F8;
}
.midtop{
  font-size:12px;
}
.te{
  background-color:#F08449;
  padding:0px 1px;
  color:white;
}
.mytab{
  overflow:hidden;
  margin-top:10px;
}
.mytab>div{
  float:left;
  padding-bottom:10px;
  margin-right:10px;
  border-bottom:2px solid white;
}
.mytab>div.on{
  color:#0B89FF;
  border-color:#0B89FF;
}
.leftdiv{
  width:60px;
  padding:0px 10px;
  color:#727272;
  background-color:#F8F8F8;
}
.leftdiv>div{
  padding:15px 0px;
  border-bottom:1px solid #F1F1F1;
}
.leftdiv.on{
  background-color:white;
  color:#080808;
}
.leftdiv.on>div{
  border:0px;
}
.icon5{
  width:15px;
  height:15px;
}
.mianleft{
  width:80px;
  box-sizing:border-box;
  overflow:scroll;
}
#shop{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}
.shopmain{
  -webkit-box-flex:1;
  display:-webkit-box;
  overflow:hidden;
}
.mainright{
  -webkit-box-flex:1;
  overflow:scroll;
  padding-left:10px;
}
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.itemmain{
  padding-right:10px;
 
}
.iteminfo{
   height:70px;
   display:flex;
   padding:10px 0px;
}
.infoimgbox{
  width:70px;
  height:70px;
  margin-right:5px;
  background-color:red;
}
.infoimgbox>img{
  width:100%;
  height:100%;
}
.inforight{
  flex:1;
}
.ih20{
  height:20px;
  line-height:20px;
}
.ih15{
  height:15px;
  line-height:15px;
}
.addicon{
  width:20px;
  height:20px;
}
.zk{
  background-color:#FF5F15;
  padding:0px 3px;
  color:white;
  border:1px solid #FF5F15;

}
.yh{
  padding:0px 3px;
  color:#FF5F15;
  border:1px solid #FF5F15;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>&lt;template&gt;
  &lt;div id="shop" class="bgfff"&gt;
        &lt;div class="topbg"&gt;
                &lt;img class="topbgimg" :src="imgpath+shopinfo.image_path"&gt;
        &lt;/div&gt;
        &lt;div class="shoptop"&gt;
            &lt;div class="toptop ih30"&gt;
              &lt;icon class="backicon" name="back"&gt;&lt;/icon&gt;
              &lt;span class="right"&gt;
                  &lt;icon class="backicon2" name="cart"&gt;&lt;/icon&gt;
                  &lt;icon class="backicon2" name="more"&gt;&lt;/icon&gt; 
              &lt;/span&gt;
            &lt;/div&gt;
            &lt;div class="topfoot"&gt;
                &lt;div class="topleft"&gt;
                    &lt;img src=""&gt;
                &lt;/div&gt;
                &lt;div class="topright nowarp"&gt;
                    &lt;div class="foota"&gt;
                        &lt;div class="footamain fs1-2 nowarp"&gt;超出回音长么哈哈哈哈哈音长么&lt;/div&gt;
                        &lt;icon name="right" class=" icon3"&gt;&lt;/icon&gt;
                    &lt;/div&gt;
                    &lt;div class="footb nowarp"&gt;
                        &lt;div class="nowarp"&gt;公告:这是一条公司拟水电费可死定了房价酸辣粉机&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="footc"&gt;
                        &lt;span class="footcmain"&gt;&lt;span&gt;蜂鸟专送&lt;/span&gt;•&lt;span&gt;约31分钟&lt;/span&gt;&lt;/span&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="shopmid mgtop10"&gt;
            &lt;div class="midtop"&gt;&lt;span class="te"&gt;特&lt;/span&gt;&lt;span&gt;16元特价秒杀&lt;/span&gt;&lt;span class="right"&gt;3个活动 &lt;icon name="down" class="icon4"&gt;&lt;/icon&gt;&lt;/span&gt;&lt;/div&gt;
            &lt;div class="mytab"&gt;
                &lt;div class="on"&gt;商品&lt;/div&gt;
                &lt;div&gt;评价4.8分&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;

    &lt;div class="shopmain"&gt;
        &lt;div class="mianleft"&gt;
            &lt;div class="leftdiv on"&gt;
                &lt;div &gt;
                    &lt;icon class="icon5" name="hot"&gt;&lt;/icon&gt;
                    &lt;span&gt;热销&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="leftdiv"&gt;
              &lt;div&gt;
                 &lt;icon class="icon5" name="discount"&gt;&lt;/icon&gt;
                  &lt;span&gt;优惠&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="leftdiv"&gt;
              &lt;div&gt; 
                &lt;span&gt;很长的蔡明&lt;/span&gt;
              &lt;/div&gt;  
            &lt;/div&gt;
            &lt;div class="leftdiv"&gt;
              &lt;div&gt;
                &lt;span&gt;段蔡明&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
             &lt;div class="leftdiv"&gt;
              &lt;div&gt;
                &lt;span&gt;菜名&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
             &lt;div class="leftdiv"&gt;
               &lt;div&gt;
                &lt;span&gt;菜名&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
             &lt;div class="leftdiv"&gt;
              &lt;div&gt;
                &lt;span&gt;菜名&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="mainright"&gt;
            &lt;div class="item"&gt;
                &lt;div class="itemtop ih30 after"&gt;
                    &lt;span class="fs15"&gt;热销&lt;/span&gt;
                    &lt;span class="fs0-8 col9f"&gt;大家都爱吃才是真的好吃&lt;/span&gt;
                &lt;/div&gt;
                &lt;div class="itemmain"&gt;
                    &lt;div class="iteminfo after"&gt;
                        &lt;div class="infoimgbox"&gt;
                            &lt;img src=""&gt;
                        &lt;/div&gt;
                        &lt;div class="inforight"&gt;
                            &lt;div class="fs15 ih20"&gt;宫保鸡丁&lt;/div&gt;
                            &lt;div class="ih15 col9f"&gt;&lt;span class="fs10 mgl"&gt;月售857份&lt;/span&gt;&lt;span class="fs10 mgl"&gt;好评率97%&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih15"&gt;&lt;span class="fs10 mgl"&gt;&lt;span class="zk"&gt;7折&lt;/span&gt;&lt;span class="yh"&gt;每单限1份优惠&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih20"&gt;&lt;span class="colred fs12"&gt;￥&lt;/span&gt;&lt;span class="colred mgr5"&gt;25&lt;/span&gt;&lt;span class="fs12 col9f midline"&gt;￥56&lt;/span&gt;&lt;icon name="add" class="addicon right" &gt;&lt;/icon&gt;&lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="iteminfo after"&gt;
                        &lt;div class="infoimgbox"&gt;
                            &lt;img src=""&gt;
                        &lt;/div&gt;
                        &lt;div class="inforight"&gt;
                            &lt;div class="fs15 ih20"&gt;宫保鸡丁&lt;/div&gt;
                            &lt;div class="ih15 col9f"&gt;&lt;span class="fs10 mgl"&gt;月售857份&lt;/span&gt;&lt;span class="fs10 mgl"&gt;好评率97%&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih15"&gt;&lt;span class="fs10 mgl"&gt;&lt;span class="zk"&gt;7折&lt;/span&gt;&lt;span class="yh"&gt;每单限1份优惠&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih20"&gt;&lt;span class="colred fs12"&gt;￥&lt;/span&gt;&lt;span class="colred mgr5"&gt;25&lt;/span&gt;&lt;span class="fs12 col9f midline"&gt;￥56&lt;/span&gt;&lt;icon name="add" class="addicon right" &gt;&lt;/icon&gt;&lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="iteminfo after"&gt;
                        &lt;div class="infoimgbox"&gt;
                            &lt;img src=""&gt;
                        &lt;/div&gt;
                        &lt;div class="inforight"&gt;
                            &lt;div class="fs15 ih20"&gt;宫保鸡丁&lt;/div&gt;
                            &lt;div class="ih15 col9f"&gt;&lt;span class="fs10 mgl"&gt;月售857份&lt;/span&gt;&lt;span class="fs10 mgl"&gt;好评率97%&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih15"&gt;&lt;span class="fs10 mgl"&gt;&lt;span class="zk"&gt;7折&lt;/span&gt;&lt;span class="yh"&gt;每单限1份优惠&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih20"&gt;&lt;span class="colred fs12"&gt;￥&lt;/span&gt;&lt;span class="colred mgr5"&gt;25&lt;/span&gt;&lt;span class="fs12 col9f midline"&gt;￥56&lt;/span&gt;&lt;icon name="add" class="addicon right" &gt;&lt;/icon&gt;&lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="iteminfo after"&gt;
                        &lt;div class="infoimgbox"&gt;
                            &lt;img src=""&gt;
                        &lt;/div&gt;
                        &lt;div class="inforight"&gt;
                            &lt;div class="fs15 ih20"&gt;宫保鸡丁&lt;/div&gt;
                            &lt;div class="ih15 col9f"&gt;&lt;span class="fs10 mgl"&gt;月售857份&lt;/span&gt;&lt;span class="fs10 mgl"&gt;好评率97%&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih15"&gt;&lt;span class="fs10 mgl"&gt;&lt;span class="zk"&gt;7折&lt;/span&gt;&lt;span class="yh"&gt;每单限1份优惠&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih20"&gt;&lt;span class="colred fs12"&gt;￥&lt;/span&gt;&lt;span class="colred mgr5"&gt;25&lt;/span&gt;&lt;span class="fs12 col9f midline"&gt;￥56&lt;/span&gt;&lt;icon name="add" class="addicon right" &gt;&lt;/icon&gt;&lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="foot"&gt;
      &lt;div class="footleft"&gt;
          &lt;div class="footlogo"&gt;&lt;icon name="footcar" class="footicon"&gt;&lt;/icon&gt;&lt;/div&gt;
          &lt;div class="footmain"&gt;未选购商品&lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="footright"&gt;
          ￥20起送
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;

export default {
  data () {
    return {
      
    }
  },
  components:{
  //注册组件

  },
  mounted:function(){
  //生命周期
    
  },
  computed:{
  //计算属性

  },
  methods:{
  //函数

  }
}
&lt;/script&gt;

&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
.shoptop{
  height:120px;
  background-color: rgba(119,103,137,.43);
  box-sizing:border-box;
  padding:10px 10px 0px 10px;
  position: relative;
}
.topbg{
  position: absolute;
  width:100%;
  height:120px;
  left:0px;
  right:0px;
  overflow:hidden;
}
.topbgimg{
  width:100%;
  filter: blur(10px);
}
.backicon{
  height:30px;
  width:30px;
}
.backicon2{
  height:25px;
  width:25px;
}
.toptop{
  margin-bottom:10px;
}
.topfoot{
  height:70px;
  display:flex;
}
.topleft{
  height:80px;
  width:80px;
  background-color:#3c3c3c;
  margin-right:10px;
  border-radius:3px;
  box-shadow:0 0 5px #3c3c3c;  
}
.topleft&gt;img{
  max-width:100%;
  max-height:100%;
}
.topright,.topleft{
  float:left;
}
.topright{
  height:100%;
  flex:1;
}
.foota{
  height:30px;
  color:white;
  line-height:30px;
  display:flex;
}
.icon3{
  width:20px;
  height:20px;
  margin-top:5px;
}
.footc{
  height:20px;
  line-height:20px;
  font-size:12px;
}
.footb{
  font-size:12px;
  color:white;
}
.footcmain{
  background-color:#0097FF;
  color:white;
  padding:0px 5px; 
}
.shopmid{
  padding:10px 10px 0px 10px;
  margin-bottom:10px;
  border-bottom:2px solid #F8F8F8;
}
.midtop{
  font-size:12px;
}
.te{
  background-color:#F08449;
  padding:0px 1px;
  color:white;
}
.mytab{
  overflow:hidden;
  margin-top:10px;
}
.mytab&gt;div{
  float:left;
  padding-bottom:10px;
  margin-right:10px;
  border-bottom:2px solid white;
}
.mytab&gt;div.on{
  color:#0B89FF;
  border-color:#0B89FF;
}
.leftdiv{
  width:60px;
  padding:0px 10px;
  color:#727272;
  background-color:#F8F8F8;
}
.leftdiv&gt;div{
  padding:15px 0px;
  border-bottom:1px solid #F1F1F1;
}
.leftdiv.on{
  background-color:white;
  color:#080808;
}
.leftdiv.on&gt;div{
  border:0px;
}
.icon5{
  width:15px;
  height:15px;
}
.mianleft{
  width:80px;
  box-sizing:border-box;
  overflow:scroll;
}
#shop{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}
.shopmain{
  -webkit-box-flex:1;
  display:-webkit-box;
  overflow:hidden;
}
.mainright{
  -webkit-box-flex:1;
  overflow:scroll;
  padding-left:10px;
}
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.itemmain{
  padding-right:10px;
 
}
.iteminfo{
   height:70px;
   display:flex;
   padding:10px 0px;
}
.infoimgbox{
  width:70px;
  height:70px;
  margin-right:5px;
  background-color:red;
}
.infoimgbox&gt;img{
  width:100%;
  height:100%;
}
.inforight{
  flex:1;
}
.ih20{
  height:20px;
  line-height:20px;
}
.ih15{
  height:15px;
  line-height:15px;
}
.addicon{
  width:20px;
  height:20px;
}
.zk{
  background-color:#FF5F15;
  padding:0px 3px;
  color:white;
  border:1px solid #FF5F15;

}
.yh{
  padding:0px 3px;
  color:#FF5F15;
  border:1px solid #FF5F15;
}
&lt;/style&gt;</code></pre>
<p>3.页面如下<br><span class="img-wrap"><img data-src="/img/bVU1PH?w=377&amp;h=608" src="https://static.alili.tech/img/bVU1PH?w=377&amp;h=608" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>4.请求数据<br>先请求一个固定餐馆的数据，参数写死，api如下<br><span class="img-wrap"><img data-src="/img/bVU1Tk?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVU1Tk?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>4.1在<code>data</code>中命名变量<code>shopinfo</code>来存放餐馆信息<br>4.2在<code>mounted</code>中写餐馆数据的请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" mounted:function(){
  //生命周期
      //餐馆详情
      this.$http.get('http://cangdu.org:8001/shopping/restaurant/1').then(response => {
        console.log(response);
        this.shopinfo=response.body;
      }, response => {
        console.log(response);
      });
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code> mounted:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">//生命周期</span>
      <span class="hljs-comment">//餐馆详情</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/shopping/restaurant/1'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.shopinfo=response.body;
      }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
      });
  },</code></pre>
<p>结果如下<br><span class="img-wrap"><img data-src="/img/bVU1VV?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVU1VV?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>ok！数据请求成功！</p>
<p>4.3渲染餐馆数据<br>渲染后页面如下<br><span class="img-wrap"><img data-src="/img/bVU2dU?w=427&amp;h=627" src="https://static.alili.tech/img/bVU2dU?w=427&amp;h=627" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这里有两个问题<br>（1）不能获取配送时间，这个是API没有给，但是在商家列表有配送时间，点击列表进入商家详情时可以传过来，先不                    管。<br>（2）图片是有域名地址的，API返回图片地址不完全，所以我们先设置一个变量<code>imgpath</code>来存放图片域名，再加上API返回的图片地址就能显示了，<code>data</code>修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
    return {
      imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
      shopinfo:&quot;&quot;
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      imgpath:<span class="hljs-string">'http://cangdu.org:8001/img/'</span>,    <span class="hljs-comment">//商家头像的路径地址path</span>
      shopinfo:<span class="hljs-string">""</span>
    }
  },</code></pre>
<p>html修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;shop&quot; class=&quot;bgfff&quot;>
        <div class=&quot;topbg&quot;>
                <img class=&quot;topbgimg&quot; :src=&quot;imgpath+shopinfo.image_path&quot;>
        </div>
        <div class=&quot;shoptop&quot;>
            <div class=&quot;toptop ih30&quot;>
              <icon class=&quot;backicon&quot; name=&quot;back&quot;></icon>
              <span class=&quot;right&quot;>
                  <icon class=&quot;backicon2&quot; name=&quot;cart&quot;></icon>
                  <icon class=&quot;backicon2&quot; name=&quot;more&quot;></icon> 
              </span>
            </div>
            <div class=&quot;topfoot&quot;>
                <div class=&quot;topleft&quot;>
                    <img :src=&quot;imgpath+shopinfo.image_path&quot;>
                </div>
                <div class=&quot;topright nowarp&quot;>
                    <div class=&quot;foota&quot;>
                        <div class=&quot;footamain fs1-2 nowarp&quot;>"{{"shopinfo.name"}}"</div>
                        <icon name=&quot;right&quot; class=&quot; icon3&quot;></icon>
                    </div>
                    <div class=&quot;footb nowarp&quot;>
                        <div class=&quot;nowarp&quot;>公告:"{{"shopinfo.promotion_info"}}"</div>
                    </div>
                    <div class=&quot;footc&quot;>
                        <span class=&quot;footcmain&quot;><span v-if=&quot;shopinfo.delivery_mode&quot;>"{{"shopinfo.delivery_mode.text"}}"•</span><span>约"{{"shopinfo.order_lead_time"}}"</span></span>
                    </div>
                </div>
            </div>
            
        </div>

        <div class=&quot;shopmid mgtop10&quot;>
            <div v-if=&quot;shopinfo.activities&quot; class=&quot;midtop&quot;><span class=&quot;te mgr5&quot;>"{{"shopinfo.activities[0].icon_name"}}"</span><span>"{{"shopinfo.activities[0].description"}}"</span><span class=&quot;right&quot;>"{{"shopinfo.activities.length"}}"个活动 <icon name=&quot;down&quot; class=&quot;icon4&quot;></icon></span></div>
            <div class=&quot;mytab&quot;>
                <div class=&quot;on&quot;>商品</div>
                <div>评价"{{"shopinfo.rating"}}"分</div>
            </div>
        </div>

    <div class=&quot;shopmain&quot;>
        <div class=&quot;mianleft&quot;>
            <div class=&quot;leftdiv on&quot;>
                <div >
                    <icon class=&quot;icon5&quot; name=&quot;hot&quot;></icon>
                    <span>热销</span>
                </div>
            </div>
            <div class=&quot;leftdiv&quot;>
              <div>
                 <icon class=&quot;icon5&quot; name=&quot;discount&quot;></icon>
                  <span>优惠</span>
              </div>
            </div>
            <div class=&quot;leftdiv&quot;>
              <div> 
                <span>很长的蔡明</span>
              </div>  
            </div>
            <div class=&quot;leftdiv&quot;>
              <div>
                <span>段蔡明</span>
              </div>
            </div>
             <div class=&quot;leftdiv&quot;>
              <div>
                <span>菜名</span>
              </div>
            </div>
             <div class=&quot;leftdiv&quot;>
               <div>
                <span>菜名</span>
              </div>
            </div>
             <div class=&quot;leftdiv&quot;>
              <div>
                <span>菜名</span>
              </div>
            </div>
        </div>
        <div class=&quot;mainright&quot;>
            <div class=&quot;item&quot;>
                <div class=&quot;itemtop ih30 after&quot;>
                    <span class=&quot;fs15&quot;>热销</span>
                    <span class=&quot;fs0-8 col9f&quot;>大家都爱吃才是真的好吃</span>
                </div>
                <div class=&quot;itemmain&quot;>
                    <div class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img src=&quot;&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>宫保鸡丁</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>月售857份</span><span class=&quot;fs10 mgl&quot;>好评率97%</span></div>
                            <div class=&quot;ih15&quot;><span class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;><span class=&quot;colred fs12&quot;>￥</span><span class=&quot;colred mgr5&quot;>25</span><span class=&quot;fs12 col9f midline&quot;>￥56</span><icon name=&quot;add&quot; class=&quot;addicon right&quot; ></icon></div>
                        </div>
                    </div>
                    <div class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img src=&quot;&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>宫保鸡丁</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>月售857份</span><span class=&quot;fs10 mgl&quot;>好评率97%</span></div>
                            <div class=&quot;ih15&quot;><span class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;><span class=&quot;colred fs12&quot;>￥</span><span class=&quot;colred mgr5&quot;>25</span><span class=&quot;fs12 col9f midline&quot;>￥56</span><icon name=&quot;add&quot; class=&quot;addicon right&quot; ></icon></div>
                        </div>
                    </div>
                    <div class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img src=&quot;&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>宫保鸡丁</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>月售857份</span><span class=&quot;fs10 mgl&quot;>好评率97%</span></div>
                            <div class=&quot;ih15&quot;><span class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;><span class=&quot;colred fs12&quot;>￥</span><span class=&quot;colred mgr5&quot;>25</span><span class=&quot;fs12 col9f midline&quot;>￥56</span><icon name=&quot;add&quot; class=&quot;addicon right&quot; ></icon></div>
                        </div>
                    </div>
                    <div class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img src=&quot;&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>宫保鸡丁</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>月售857份</span><span class=&quot;fs10 mgl&quot;>好评率97%</span></div>
                            <div class=&quot;ih15&quot;><span class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;><span class=&quot;colred fs12&quot;>￥</span><span class=&quot;colred mgr5&quot;>25</span><span class=&quot;fs12 col9f midline&quot;>￥56</span><icon name=&quot;add&quot; class=&quot;addicon right&quot; ></icon></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=&quot;foot&quot;>
      <div class=&quot;footleft&quot;>
          <div class=&quot;footlogo&quot;><icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon></div>
          <div class=&quot;footmain&quot;>未选购商品</div>
      </div>
      <div class=&quot;footright&quot;>
          ￥20起送
      </div>
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shop"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bgfff"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topbg"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topbgimg"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"imgpath+shopinfo.image_path"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shoptop"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toptop ih30"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"backicon"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"back"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"backicon2"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"cart"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"backicon2"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"more"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span> 
              <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topfoot"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topleft"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"imgpath+shopinfo.image_path"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topright nowarp"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"foota"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footamain fs1-2 nowarp"</span>&gt;</span></span><span class="hljs-template-variable">"{{"shopinfo.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">" icon3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footb nowarp"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nowarp"</span>&gt;</span>公告:</span><span class="hljs-template-variable">"{{"shopinfo.promotion_info"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footc"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footcmain"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"shopinfo.delivery_mode"</span>&gt;</span></span><span class="hljs-template-variable">"{{"shopinfo.delivery_mode.text"}}"</span><span class="xml">•<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>约</span><span class="hljs-template-variable">"{{"shopinfo.order_lead_time"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shopmid mgtop10"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"shopinfo.activities"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"midtop"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"te mgr5"</span>&gt;</span></span><span class="hljs-template-variable">"{{"shopinfo.activities[0].icon_name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"shopinfo.activities[0].description"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span></span><span class="hljs-template-variable">"{{"shopinfo.activities.length"}}"</span><span class="xml">个活动 <span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"down"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mytab"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"on"</span>&gt;</span>商品<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>评价</span><span class="hljs-template-variable">"{{"shopinfo.rating"}}"</span><span class="xml">分<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"shopmain"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mianleft"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"leftdiv on"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> &gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon5"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hot"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>热销<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"leftdiv"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                 <span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon5"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"discount"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>优惠<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"leftdiv"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span> 
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>很长的蔡明<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"leftdiv"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>段蔡明<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"leftdiv"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>菜名<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"leftdiv"</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>菜名<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"leftdiv"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>菜名<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mainright"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"itemtop ih30 after"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs15"</span>&gt;</span>热销<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs0-8 col9f"</span>&gt;</span>大家都爱吃才是真的好吃<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"itemmain"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iteminfo after"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"infoimgbox"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inforight"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs15 ih20"</span>&gt;</span>宫保鸡丁<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih15 col9f"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span>月售857份<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span>好评率97%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih15"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zk"</span>&gt;</span>7折<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"yh"</span>&gt;</span>每单限1份优惠<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred fs12"</span>&gt;</span>￥<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred mgr5"</span>&gt;</span>25<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs12 col9f midline"</span>&gt;</span>￥56<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon right"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iteminfo after"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"infoimgbox"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inforight"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs15 ih20"</span>&gt;</span>宫保鸡丁<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih15 col9f"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span>月售857份<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span>好评率97%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih15"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zk"</span>&gt;</span>7折<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"yh"</span>&gt;</span>每单限1份优惠<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred fs12"</span>&gt;</span>￥<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred mgr5"</span>&gt;</span>25<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs12 col9f midline"</span>&gt;</span>￥56<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon right"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iteminfo after"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"infoimgbox"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inforight"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs15 ih20"</span>&gt;</span>宫保鸡丁<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih15 col9f"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span>月售857份<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span>好评率97%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih15"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zk"</span>&gt;</span>7折<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"yh"</span>&gt;</span>每单限1份优惠<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred fs12"</span>&gt;</span>￥<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred mgr5"</span>&gt;</span>25<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs12 col9f midline"</span>&gt;</span>￥56<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon right"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iteminfo after"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"infoimgbox"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inforight"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs15 ih20"</span>&gt;</span>宫保鸡丁<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih15 col9f"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span>月售857份<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span>好评率97%<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih15"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zk"</span>&gt;</span>7折<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"yh"</span>&gt;</span>每单限1份优惠<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred fs12"</span>&gt;</span>￥<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"colred mgr5"</span>&gt;</span>25<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fs12 col9f midline"</span>&gt;</span>￥56<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"add"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon right"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"foot"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footleft"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footlogo"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"footcar"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footicon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footmain"</span>&gt;</span>未选购商品<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footright"</span>&gt;</span>
          ￥20起送
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>4.4请求餐馆的菜品信息，API如下<br><span class="img-wrap"><img data-src="/img/bVU1QT?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVU1QT?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>在data中设置<code>shopmean</code>来存放食品信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
    return {
      imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
      shopinfo:&quot;&quot;,                              //商家信息
      shopmean:&quot;&quot;                               //食品信息
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span> () {
    <span class="hljs-selector-tag">return</span> {
      <span class="hljs-attribute">imgpath</span>:<span class="hljs-string">'http://cangdu.org:8001/img/'</span>,    <span class="hljs-comment">//商家头像的路径地址path</span>
      <span class="hljs-attribute">shopinfo</span>:<span class="hljs-string">""</span>,                              <span class="hljs-comment">//商家信息</span>
      <span class="hljs-attribute">shopmean</span>:<span class="hljs-string">""</span>                               <span class="hljs-comment">//食品信息</span>
    }
  },</code></pre>
<p>在<code>mounted</code>添加请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //食品详情
      this.$http.get('http://cangdu.org:8001/shopping/v2/menu?restaurant_id=1').then(response => {
        console.log(response);
        this.shopmean=response.body;
      }, response => {
        console.log(response);
      });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code> <span class="hljs-comment">//食品详情</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/shopping/v2/menu?restaurant_id=1'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.shopmean=response.body;
      }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
      });</code></pre>
<p>结果如下<br><span class="img-wrap"><img data-src="/img/bVU2jI?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVU2jI?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>请求成功！</p>
<p>4.5渲染食品页面<br>页面如下<br><span class="img-wrap"><img data-src="/img/bVU2Aq?w=399&amp;h=637" src="https://static.alili.tech/img/bVU2Aq?w=399&amp;h=637" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>注意<br>（1）热销榜和优惠API貌似返回icon图片了，但是我用一直报错，还是用咱们的svg吧，写死就行了。<br>（2）多了一个功能就是有的商品可以选择样式。<br>（3）灰色的价格与折扣API并没有返回，咱们直接<code>v-if="false"</code>隐藏了就行，万一后面又加了呢</p>
<p>页面html代码修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;shop&quot; class=&quot;bgfff&quot;>
        <div class=&quot;topbg&quot;>
                <img class=&quot;topbgimg&quot; :src=&quot;imgpath+shopinfo.image_path&quot;>
        </div>
        <div class=&quot;shoptop&quot;>
            <div class=&quot;toptop ih30&quot;>
              <icon class=&quot;backicon&quot; name=&quot;back&quot;></icon>
              <span class=&quot;right&quot;>
                  <icon class=&quot;backicon2&quot; name=&quot;cart&quot;></icon>
                  <icon class=&quot;backicon2&quot; name=&quot;more&quot;></icon> 
              </span>
            </div>
            <div class=&quot;topfoot&quot;>
                <div class=&quot;topleft&quot;>
                    <img :src=&quot;imgpath+shopinfo.image_path&quot;>
                </div>
                <div class=&quot;topright nowarp&quot;>
                    <div class=&quot;foota&quot;>
                        <div class=&quot;footamain fs1-2 nowarp&quot;>"{{"shopinfo.name"}}"</div>
                        <icon name=&quot;right&quot; class=&quot; icon3&quot;></icon>
                    </div>
                    <div class=&quot;footb nowarp&quot;>
                        <div class=&quot;nowarp&quot;>公告:"{{"shopinfo.promotion_info"}}"</div>
                    </div>
                    <div class=&quot;footc&quot;>
                        <span class=&quot;footcmain&quot;><span v-if=&quot;shopinfo.delivery_mode&quot;>"{{"shopinfo.delivery_mode.text"}}"•</span><span>约"{{"shopinfo.order_lead_time"}}"</span></span>
                    </div>
                </div>
            </div>
            
        </div>

        <div class=&quot;shopmid mgtop10&quot;>
            <div v-if=&quot;shopinfo.activities&quot; class=&quot;midtop&quot;><span class=&quot;te mgr5&quot;>"{{"shopinfo.activities[0].icon_name"}}"</span><span>"{{"shopinfo.activities[0].description"}}"</span><span class=&quot;right&quot;>"{{"shopinfo.activities.length"}}"个活动 <icon name=&quot;down&quot; class=&quot;icon4&quot;></icon></span></div>
            <div class=&quot;mytab&quot;>
                <div class=&quot;on&quot;>商品</div>
                <div>评价"{{"shopinfo.rating"}}"分</div>
            </div>
        </div>

    <div class=&quot;shopmain&quot;>
        <div class=&quot;mianleft&quot;>
            <div v-for=&quot;(item,index) in shopmean&quot; class=&quot;leftdiv on&quot;>
                <div >
                    <icon v-if=&quot;index==0&quot; class=&quot;icon5&quot; name=&quot;hot&quot;></icon>
                    <icon v-if=&quot;index==1&quot; class=&quot;icon5&quot; name=&quot;discount&quot;></icon>
                    <span class=&quot;fs0-8&quot;>"{{"item.name"}}"</span>
                </div>
            </div>
        </div>
        <div class=&quot;mainright&quot;>
            <div class=&quot;item&quot; v-for=&quot;item in shopmean&quot;>
                <div class=&quot;itemtop ih30 after&quot;>
                    <span class=&quot;fs15&quot;>"{{"item.name"}}"</span>
                    <span class=&quot;fs0-8 col9f&quot;>"{{"item.description"}}"</span>
                </div>
                <div class=&quot;itemmain&quot;>
                    <div v-for=&quot;items in item.foods&quot; class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img :src=&quot;imgpath+items.image_path&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>"{{"items.name"}}"</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>"{{"items.tips"}}"</span></div>
                            <div class=&quot;ih15&quot;><span v-if=&quot;false&quot; class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>7折</span><span class=&quot;yh&quot;>每单限1份优惠</span></span></div>
                            <div class=&quot;ih20&quot;>
                              <span class=&quot;colred fs12&quot;>￥</span>
                              <span class=&quot;colred mgr5&quot;>"{{"items.specfoods[0].price"}}"</span>
                              <span v-if=&quot;false&quot; class=&quot;fs12 col9f midline&quot;>￥56</span>
                              <icon v-if=&quot;items.specfoods.length==1&quot; name=&quot;add&quot; class=&quot;addicon right&quot; ></icon>
                              <span class=&quot;fs12 right gz&quot; v-if=&quot;items.specfoods.length>1&quot;>选规则</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=&quot;foot&quot;>
      <div class=&quot;footleft&quot;>
          <div class=&quot;footlogo&quot;><icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon></div>
          <div class=&quot;footmain&quot;>未选购商品</div>
      </div>
      <div class=&quot;footright&quot;>
          ￥20起送
      </div>
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;template&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"shop"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"bgfff"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"topbg"</span>&gt;
                &lt;img <span class="hljs-built_in">class</span>=<span class="hljs-string">"topbgimg"</span> :src=<span class="hljs-string">"imgpath+shopinfo.image_path"</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"shoptop"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"toptop ih30"</span>&gt;
              &lt;icon <span class="hljs-built_in">class</span>=<span class="hljs-string">"backicon"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"back"</span>&gt;&lt;/icon&gt;
              &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;
                  &lt;icon <span class="hljs-built_in">class</span>=<span class="hljs-string">"backicon2"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"cart"</span>&gt;&lt;/icon&gt;
                  &lt;icon <span class="hljs-built_in">class</span>=<span class="hljs-string">"backicon2"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"more"</span>&gt;&lt;/icon&gt; 
              &lt;/span&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"topfoot"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"topleft"</span>&gt;
                    &lt;img :src=<span class="hljs-string">"imgpath+shopinfo.image_path"</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"topright nowarp"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"foota"</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footamain fs1-2 nowarp"</span>&gt;"{{"shopinfo.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
                        &lt;icon <span class="hljs-built_in">name</span>=<span class="hljs-string">"right"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">" icon3"</span>&gt;&lt;/icon&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footb nowarp"</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"nowarp"</span>&gt;公告:"{{"shopinfo.promotion_info"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footc"</span>&gt;
                        &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"footcmain"</span>&gt;&lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"shopinfo.delivery_mode"</span>&gt;"{{"shopinfo.delivery_mode.<span class="hljs-built_in">text</span>"}}"•&lt;/span&gt;&lt;span&gt;约"{{"shopinfo.order_lead_time"}}"&lt;/span&gt;&lt;/span&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            
        &lt;/<span class="hljs-keyword">div</span>&gt;

        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"shopmid mgtop10"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"shopinfo.activities"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"midtop"</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"te mgr5"</span>&gt;"{{"shopinfo.activities[<span class="hljs-number">0</span>].icon_name"}}"&lt;/span&gt;&lt;span&gt;"{{"shopinfo.activities[<span class="hljs-number">0</span>].description"}}"&lt;/span&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;"{{"shopinfo.activities.<span class="hljs-built_in">length</span>"}}"个活动 &lt;icon <span class="hljs-built_in">name</span>=<span class="hljs-string">"down"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"icon4"</span>&gt;&lt;/icon&gt;&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mytab"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"on"</span>&gt;商品&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span>&gt;评价"{{"shopinfo.rating"}}"分&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;

    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"shopmain"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mianleft"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,index) in shopmean"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"leftdiv on"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> &gt;
                    &lt;icon v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"index==0"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"icon5"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"hot"</span>&gt;&lt;/icon&gt;
                    &lt;icon v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"index==1"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"icon5"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"discount"</span>&gt;&lt;/icon&gt;
                    &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs0-8"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"&lt;/span&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mainright"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item"</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in shopmean"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"itemtop ih30 after"</span>&gt;
                    &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"&lt;/span&gt;
                    &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs0-8 col9f"</span>&gt;"{{"<span class="hljs-built_in">item</span>.description"}}"&lt;/span&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"itemmain"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"items in item.foods"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"iteminfo after"</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"infoimgbox"</span>&gt;
                            &lt;img :src=<span class="hljs-string">"imgpath+items.image_path"</span>&gt;
                        &lt;/<span class="hljs-keyword">div</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inforight"</span>&gt;
                            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 ih20"</span>&gt;"{{"items.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
                            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih15 col9f"</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;"{{"items.tips"}}"&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih15"</span>&gt;&lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"false"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs10 mgl"</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"zk"</span>&gt;<span class="hljs-number">7</span>折&lt;/span&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"yh"</span>&gt;每单限<span class="hljs-number">1</span>份优惠&lt;/span&gt;&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih20"</span>&gt;
                              &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"colred fs12"</span>&gt;￥&lt;/span&gt;
                              &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"colred mgr5"</span>&gt;"{{"items.specfoods[<span class="hljs-number">0</span>].price"}}"&lt;/span&gt;
                              &lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"false"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs12 col9f midline"</span>&gt;￥<span class="hljs-number">56</span>&lt;/span&gt;
                              &lt;icon v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"items.specfoods.length==1"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"add"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"addicon right"</span> &gt;&lt;/icon&gt;
                              &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs12 right gz"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"items.specfoods.length&gt;1"</span>&gt;选规则&lt;/span&gt;
                            &lt;/<span class="hljs-keyword">div</span>&gt;
                        &lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"foot"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footleft"</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footlogo"</span>&gt;&lt;icon <span class="hljs-built_in">name</span>=<span class="hljs-string">"footcar"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footicon"</span>&gt;&lt;/icon&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footmain"</span>&gt;未选购商品&lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footright"</span>&gt;
          ￥<span class="hljs-number">20</span>起送
      &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;</code></pre>
<h2 id="articleHeader2">商品与评价切换</h2>
<p>咱们商家评价页面还没有写<br>1.在data中新建变量<code>shoporscore</code>来控制显示商品还是评价（true显示商品false显示评价）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" data () {
    return {
      imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
      shopinfo:&quot;&quot;,                              //商家信息
      shopmean:&quot;&quot;,                              //食品信息
      shoporscore:true                               //商家还是评价
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-selector-tag">data</span> () {
    <span class="hljs-selector-tag">return</span> {
      <span class="hljs-attribute">imgpath</span>:<span class="hljs-string">'http://cangdu.org:8001/img/'</span>,    <span class="hljs-comment">//商家头像的路径地址path</span>
      <span class="hljs-attribute">shopinfo</span>:<span class="hljs-string">""</span>,                              <span class="hljs-comment">//商家信息</span>
      <span class="hljs-attribute">shopmean</span>:<span class="hljs-string">""</span>,                              <span class="hljs-comment">//食品信息</span>
      <span class="hljs-attribute">shoporscore</span>:true                               <span class="hljs-comment">//商家还是评价</span>
    }
  },</code></pre>
<p>2.将数据绑定到元素上来控制显示隐藏<br>在<code>shopmain</code>，<code>foot</code>div上添加判断<br><code>v-if="shoporscore"</code><br>在<code>foot</code>div下新建评价div</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div v-if=&quot;!shoporscore&quot;>
        评价div
 </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!shoporscore"</span>&gt;
        评价<span class="hljs-selector-tag">div</span>
 &lt;/div&gt;</code></pre>
<p>3.点击事件来改变<code>shoporscore</code>的值，同时绑定class<code>on</code>来改变元素的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;mytab&quot;>
                <div @click=&quot;shoporscore=true&quot; :class=&quot;{ on:shoporscore }&quot;>商品</div>
                <div @click=&quot;shoporscore=false&quot; :class=&quot;{ on:!shoporscore }&quot; >评价"{{"shopinfo.rating"}}"分</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mytab"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> @click=<span class="hljs-string">"shoporscore=true"</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">"{ on:shoporscore }"</span>&gt;商品&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> @click=<span class="hljs-string">"shoporscore=false"</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">"{ on:!shoporscore }"</span> &gt;评价"{{"shopinfo.rating"}}"分&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>4.结果如下<br><span class="img-wrap"><img data-src="/img/bVU4XT?w=387&amp;h=633" src="https://static.alili.tech/img/bVU4XT?w=387&amp;h=633" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVU4XY?w=374&amp;h=619" src="https://static.alili.tech/img/bVU4XY?w=374&amp;h=619" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>ok！转换成功，下面就来写评价的样式。</p>
<p>4.1UI图<br><span class="img-wrap"><img data-src="/img/bVU42Q?w=378&amp;h=611" src="https://static.alili.tech/img/bVU42Q?w=378&amp;h=611" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>4.2样式<br>评论div的html如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;score&quot; v-if=&quot;!shoporscore&quot;>
        <div class=&quot;scoretop&quot;>
          <div class=&quot;scoretopleft&quot;>
              <div class=&quot;fs1-2 colf60&quot;>4.4</div>
              <div class=&quot;fs15 col9f&quot;>综合评价</div>
              <div class=&quot;fs0-8 col9f&quot;>高于周边商家76.9%</div>
          </div>
          <div class=&quot;scoretopright&quot;>
              <div><span class=&quot;fs15 col9f&quot;>评价服务</span></div>
              <div><span class=&quot;fs15 col9f&quot;>菜品评价</span></div>
              <div><span class=&quot;fs15 col9f&quot;>送达时间</span></div>
          </div>
        </div>
        <div class=&quot;scoremain&quot;>
              <div class=&quot;scoremaintop after&quot;>
                <div class=&quot;ih30 fs0-8 sty1 on&quot;>全部(759)</div>
                <div class=&quot;ih30 fs0-8 sty1&quot;>很好啊的(759)</div><div class=&quot;ih30 fs0-8 sty1&quot;>很好啊的(759)</div>
                <div class=&quot;ih30 fs0-8 sty1&quot;>很好啊的(759)</div><div class=&quot;ih30 fs0-8 sty1&quot;>很好啊的(759)</div>
                <div class=&quot;ih30 fs0-8 sty2&quot;>差评(759)</div>
              </div>
              <div class=&quot;scoremaininfo&quot;>
                  <div class=&quot;scoreitem after&quot;>
                      <div class=&quot;scoreitemleft&quot;>
                          <img >
                      </div>
                      <div class=&quot;scoreitemright fs12 col9f&quot;>
                          <div>
                              <span>姓名</span>
                              <span class=&quot;right&quot;>2017-02-06</span>
                          </div>
                          <div>
                              星星
                          </div>
                          <div>
                              很好吃的评论
                          </div>
                          <div class=&quot;scoreimgbox&quot;>
                            <img><img>
                          </div>
                          <div class=&quot;namebox&quot;>
                              <div>炒鸡好吃煲</div>
                              <div>无敌辣鸡翅</div>
                          </div>

                      </div>
                  </div>
                  <div class=&quot;scoreitem&quot;>
                      <div class=&quot;scoreitemleft&quot;>
                          <img >
                      </div>
                      <div class=&quot;scoreitemright fs12 col9f&quot;>
                          <div>
                              <span>姓名</span>
                              <span class=&quot;right&quot;>2017-02-06</span>
                          </div>
                          <div>
                              星星
                          </div>
                          <div>
                              很好吃的评论
                          </div>
                          <div>
                            <img><img>
                          </div>
                          <div class=&quot;namebox&quot;>
                              <div>炒鸡好吃煲</div>
                              <div>无敌辣鸡翅</div>
                          </div>

                      </div>
                  </div>
              </div>
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"score"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!shoporscore"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoretop"</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoretopleft"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs1-2 colf60"</span>&gt;<span class="hljs-number">4.4</span>&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 col9f"</span>&gt;综合评价&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs0-8 col9f"</span>&gt;高于周边商家<span class="hljs-number">76.9</span>%&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoretopright"</span>&gt;
              &lt;<span class="hljs-keyword">div</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 col9f"</span>&gt;评价服务&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 col9f"</span>&gt;菜品评价&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 col9f"</span>&gt;送达时间&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoremain"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoremaintop after"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 sty1 on"</span>&gt;全部(<span class="hljs-number">759</span>)&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 sty1"</span>&gt;很好啊的(<span class="hljs-number">759</span>)&lt;/<span class="hljs-keyword">div</span>&gt;&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 sty1"</span>&gt;很好啊的(<span class="hljs-number">759</span>)&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 sty1"</span>&gt;很好啊的(<span class="hljs-number">759</span>)&lt;/<span class="hljs-keyword">div</span>&gt;&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 sty1"</span>&gt;很好啊的(<span class="hljs-number">759</span>)&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8 sty2"</span>&gt;差评(<span class="hljs-number">759</span>)&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoremaininfo"</span>&gt;
                  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitem after"</span>&gt;
                      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitemleft"</span>&gt;
                          &lt;img &gt;
                      &lt;/<span class="hljs-keyword">div</span>&gt;
                      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitemright fs12 col9f"</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              &lt;span&gt;姓名&lt;/span&gt;
                              &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;<span class="hljs-number">2017</span><span class="hljs-number">-02</span><span class="hljs-number">-06</span>&lt;/span&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              星星
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              很好吃的评论
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreimgbox"</span>&gt;
                            &lt;img&gt;&lt;img&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"namebox"</span>&gt;
                              &lt;<span class="hljs-keyword">div</span>&gt;炒鸡好吃煲&lt;/<span class="hljs-keyword">div</span>&gt;
                              &lt;<span class="hljs-keyword">div</span>&gt;无敌辣鸡翅&lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;

                      &lt;/<span class="hljs-keyword">div</span>&gt;
                  &lt;/<span class="hljs-keyword">div</span>&gt;
                  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitem"</span>&gt;
                      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitemleft"</span>&gt;
                          &lt;img &gt;
                      &lt;/<span class="hljs-keyword">div</span>&gt;
                      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitemright fs12 col9f"</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              &lt;span&gt;姓名&lt;/span&gt;
                              &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;<span class="hljs-number">2017</span><span class="hljs-number">-02</span><span class="hljs-number">-06</span>&lt;/span&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              星星
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              很好吃的评论
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                            &lt;img&gt;&lt;img&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"namebox"</span>&gt;
                              &lt;<span class="hljs-keyword">div</span>&gt;炒鸡好吃煲&lt;/<span class="hljs-keyword">div</span>&gt;
                              &lt;<span class="hljs-keyword">div</span>&gt;无敌辣鸡翅&lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;

                      &lt;/<span class="hljs-keyword">div</span>&gt;
                  &lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>css如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".scoretop{
  display:flex;
  padding:0px 10px 10px 10px;
  border-bottom:10px solid #F5F5F5;
}
.scoretopleft{
  flex:1;
  text-align:center;
}
.scoretopright{
  flex:1;
}
.scoremain{
  padding:0px 10px;
}
.scoremaintop{
  padding:10px 0px 5px 0px;
  display:flex;
  flex-wrap:wrap;
}
.scoremaintop>div{
  padding:0px 8px;
  border-radius:5px;
  margin-right:5px;
  margin-bottom:5px;
}
.sty1{
  background-color:#EBF5FF;
  color:#9f9f9f;
}
.sty1.on{
  background-color:#3190E8;
  color:#fff;
}
.sty2{
  background-color:#F5F5F5;
  color:#AFAFAF;
}
.scoreitem{
  display:flex;
  margin-top:10px;
}
.scoreitemleft{
  width:50px;
  height:50px;
  margin-right:10px;
  background-color:red;
}
.scoreitemleft>img{
  width:100%;
  border-radius:50%; 
}
.scoreitemright{
  flex:1;
}
.namebox{
  display:flex;
  flex-wrap: wrap;
}
.namebox>div{
  border:1px solid;
  padding:3px 3px;
  margin-right:5px;
  border-radius:3px;
  margin-bottom:5px;
}
.score{
  padding-top:10px;
  flex:1;
  overflow: scroll;
}
.scoreimgbox>img{
  width:4rem;
  height:4rem;
  background-color:red;
  margin-right:10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.scoretop</span>{
  <span class="hljs-attribute">display</span>:flex;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">10px</span> solid <span class="hljs-number">#F5F5F5</span>;
}
<span class="hljs-selector-class">.scoretopleft</span>{
  <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
  <span class="hljs-attribute">text-align</span>:center;
}
<span class="hljs-selector-class">.scoretopright</span>{
  <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.scoremain</span>{
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0px</span> <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.scoremaintop</span>{
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-number">5px</span> <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">display</span>:flex;
  <span class="hljs-attribute">flex-wrap</span>:wrap;
}
<span class="hljs-selector-class">.scoremaintop</span>&gt;<span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0px</span> <span class="hljs-number">8px</span>;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">5px</span>;
  <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">5px</span>;
  <span class="hljs-attribute">margin-bottom</span>:<span class="hljs-number">5px</span>;
}
<span class="hljs-selector-class">.sty1</span>{
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#EBF5FF</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#9f9f9f</span>;
}
<span class="hljs-selector-class">.sty1</span><span class="hljs-selector-class">.on</span>{
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#3190E8</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.sty2</span>{
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#F5F5F5</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#AFAFAF</span>;
}
<span class="hljs-selector-class">.scoreitem</span>{
  <span class="hljs-attribute">display</span>:flex;
  <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.scoreitemleft</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">10px</span>;
  <span class="hljs-attribute">background-color</span>:red;
}
<span class="hljs-selector-class">.scoreitemleft</span>&gt;<span class="hljs-selector-tag">img</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">50%</span>; 
}
<span class="hljs-selector-class">.scoreitemright</span>{
  <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.namebox</span>{
  <span class="hljs-attribute">display</span>:flex;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
}
<span class="hljs-selector-class">.namebox</span>&gt;<span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">3px</span> <span class="hljs-number">3px</span>;
  <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">5px</span>;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">3px</span>;
  <span class="hljs-attribute">margin-bottom</span>:<span class="hljs-number">5px</span>;
}
<span class="hljs-selector-class">.score</span>{
  <span class="hljs-attribute">padding-top</span>:<span class="hljs-number">10px</span>;
  <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
  <span class="hljs-attribute">overflow</span>: scroll;
}
<span class="hljs-selector-class">.scoreimgbox</span>&gt;<span class="hljs-selector-tag">img</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">4rem</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">4rem</span>;
  <span class="hljs-attribute">background-color</span>:red;
  <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">10px</span>;
}</code></pre>
<p>页面如下<br><span class="img-wrap"><img data-src="/img/bVU6d8?w=398&amp;h=641" src="https://static.alili.tech/img/bVU6d8?w=398&amp;h=641" alt="" title="" style="cursor: pointer;"></span></p>
<p>（星星没有写是因为在miste.vue里咱们已经写过了）</p>
<p>5.请求评价数据<br>在<code>data</code>中创建变量<code>score</code>,<code>scorerating</code>,<code>scoretags</code>,来存放评价数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
    return {
      imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
      shopinfo:&quot;&quot;,                              //商家信息
      shopmean:&quot;&quot;,                              //食品信息
      shoporscore:true,                         //商家还是评价
      score:&quot;&quot;,                                 //评价信息
      scorerating:&quot;&quot;,                           //评价分数  
      scoretags:&quot;&quot;,                             //评价分类
      scoreindex:0                              //选中第几个评价分类
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">data</span> () {
    <span class="hljs-selector-tag">return</span> {
      <span class="hljs-attribute">imgpath</span>:<span class="hljs-string">'http://cangdu.org:8001/img/'</span>,    <span class="hljs-comment">//商家头像的路径地址path</span>
      <span class="hljs-attribute">shopinfo</span>:<span class="hljs-string">""</span>,                              <span class="hljs-comment">//商家信息</span>
      <span class="hljs-attribute">shopmean</span>:<span class="hljs-string">""</span>,                              <span class="hljs-comment">//食品信息</span>
      <span class="hljs-attribute">shoporscore</span>:true,                         <span class="hljs-comment">//商家还是评价</span>
      <span class="hljs-attribute">score</span>:<span class="hljs-string">""</span>,                                 <span class="hljs-comment">//评价信息</span>
      <span class="hljs-attribute">scorerating</span>:<span class="hljs-string">""</span>,                           <span class="hljs-comment">//评价分数  </span>
      <span class="hljs-attribute">scoretags</span>:<span class="hljs-string">""</span>,                             <span class="hljs-comment">//评价分类</span>
      <span class="hljs-attribute">scoreindex</span>:<span class="hljs-number">0</span>                              <span class="hljs-comment">//选中第几个评价分类</span>
    }
  },</code></pre>
<p><a href="https://github.com/bailicangdu/node-elm/blob/master/API.md#17%E8%8E%B7%E5%8F%96%E8%AF%84%E4%BB%B7%E4%BF%A1%E6%81%AF" rel="nofollow noreferrer" target="_blank">接口API</a>如图（参数先传个死值）<br><span class="img-wrap"><img data-src="/img/bVU6lN?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVU6lN?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在<code>mounted</code>中写请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //评论详情
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings?offset=0&amp;limit=10').then(response => {
        console.log(response);
        this.score=response.body;
      }, response => {
        console.log(response);
      });
      //评论分数
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/scores').then(response => {
        console.log(response);
        this.scorerating=response.body;
      }, response => {
        console.log(response);
      });
       //评论分类
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/tags').then(response => {
        console.log(response);
        this.scoretags=response.body;
      }, response => {
        console.log(response);
      });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code> <span class="hljs-comment">//评论详情</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/ugc/v2/restaurants/1/ratings?offset=0&amp;limit=10'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.score=response.body;
      }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
      });
      <span class="hljs-comment">//评论分数</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/scores'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.scorerating=response.body;
      }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
      });
       <span class="hljs-comment">//评论分类</span>
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/tags'</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
        <span class="hljs-keyword">this</span>.scoretags=response.body;
      }, <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(response);
      });</code></pre>
<p>结果如图<br><span class="img-wrap"><img data-src="/img/bVU6of?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVU6of?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>ok！请求成功</p>
<h2 id="articleHeader3">渲染评论页面</h2>
<p>1.写评价星星的组件<br>在src文件夹下的的 components下新建stars/stars.vue，页面代码如下（在miste.vue一章中咱们写过）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
      <div class=&quot;xxbox fs10 mgl&quot;>
            <span v-for=&quot;(itemxx,index) in 5&quot; class=&quot;xxspan1&quot;><icon v-if=&quot;index+1<=num&quot; name=&quot;xx&quot; class=&quot;xx&quot;></icon><icon v-if=&quot;index+1>num&quot; name=&quot;xx2&quot; class=&quot;xx&quot;></icon><span v-if=&quot;num-(index)>0&amp;&amp;num-(index)<1&quot; :class=&quot;xxclass+(num*10-index*10)&quot;><icon name=&quot;xx&quot; class=&quot;xx&quot;></icon></span></span>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
       xxclass:&quot;xxspan2 w&quot;,     //星星的class
    }
  },
  props:[
    &quot;num&quot;
  ]
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
.xxdiv{
  height:25px;
  line-height:25px;
}
.xxbox{
  display:inline-block;
  height:25px;
  box-sizing:border-box;
}
.xxbox>span{
    margin-right:-2px;
}
.xxspan1{
  position:relative;
  display:inline-block;
  margin-right:1px !important;
}
.xxspan2{
  display:inline-block;
  position:absolute;
  left:0px;
  overflow: hidden;
}
.w1{
  width:10%;
}
.w2{
  width:20%;
}
.w3{
  width:30%;
}
.w4{
  width:40%;
}
.w5{
  width:50%;
}
.w6{
  width:60%;
}
.w7{
  width:70%;
}
.w8{
  width:80%;
}
.w9{
  width:90%;
}
.xx{
  width:10px;
  height:10px; 
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"xxbox fs10 mgl"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(itemxx,index) in 5"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"xxspan1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"index+1&lt;=num"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"xx"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"xx"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"index+1&gt;num"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"xx2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"xx"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"num-(index)&gt;0&amp;&amp;num-(index)&lt;1"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"xxclass+(num*10-index*10)"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"xx"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"xx"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
       <span class="hljs-attr">xxclass</span>:<span class="hljs-string">"xxspan2 w"</span>,     <span class="hljs-comment">//星星的class</span>
    }
  },
  <span class="hljs-attr">props</span>:[
    <span class="hljs-string">"num"</span>
  ]
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.xxdiv</span>{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">25px</span>;
  <span class="hljs-attribute">line-height</span>:<span class="hljs-number">25px</span>;
}
<span class="hljs-selector-class">.xxbox</span>{
  <span class="hljs-attribute">display</span>:inline-block;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">25px</span>;
  <span class="hljs-attribute">box-sizing</span>:border-box;
}
<span class="hljs-selector-class">.xxbox</span>&gt;<span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">margin-right</span>:-<span class="hljs-number">2px</span>;
}
<span class="hljs-selector-class">.xxspan1</span>{
  <span class="hljs-attribute">position</span>:relative;
  <span class="hljs-attribute">display</span>:inline-block;
  <span class="hljs-attribute">margin-right</span>:<span class="hljs-number">1px</span> <span class="hljs-meta">!important</span>;
}
<span class="hljs-selector-class">.xxspan2</span>{
  <span class="hljs-attribute">display</span>:inline-block;
  <span class="hljs-attribute">position</span>:absolute;
  <span class="hljs-attribute">left</span>:<span class="hljs-number">0px</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.w1</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">10%</span>;
}
<span class="hljs-selector-class">.w2</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">20%</span>;
}
<span class="hljs-selector-class">.w3</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">30%</span>;
}
<span class="hljs-selector-class">.w4</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">40%</span>;
}
<span class="hljs-selector-class">.w5</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">50%</span>;
}
<span class="hljs-selector-class">.w6</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">60%</span>;
}
<span class="hljs-selector-class">.w7</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">70%</span>;
}
<span class="hljs-selector-class">.w8</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">80%</span>;
}
<span class="hljs-selector-class">.w9</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">90%</span>;
}
<span class="hljs-selector-class">.xx</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">10px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">10px</span>; 
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>这里注意，props是父组件传递给子组件的值，在子组件直接调用即可。这里的num代表评分的等级如4.8,3.2等<br>在shop.vue中引入并注册</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import stars from '../../components/stars/stars'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> stars <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/stars/stars'</span></code></pre>
<p>在<code>components</code>中注册组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" components:{
  //注册组件
      stars
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol"> components:</span>{
  <span class="hljs-comment">//注册组件</span>
      stars
  },</code></pre>
<p>在代码中直接调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<stars num=&quot;你要传递给子组件的值&quot;></stars>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">stars</span> <span class="hljs-attr">num</span>=<span class="hljs-string">"你要传递给子组件的值"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">stars</span>&gt;</span></code></pre>
<p>2.评价div代码修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;score&quot; v-if=&quot;!shoporscore&quot;>
        <div class=&quot;scoretop&quot;>
          <div class=&quot;scoretopleft&quot;>
              <div class=&quot;fs1-2 colf60&quot;>"{{"shopinfo.rating"}}"</div>
              <div class=&quot;fs15 col9f&quot;>综合评价</div>
              <div class=&quot;fs0-8 col9f&quot;>高于周边商家"{{"parseInt(scorerating.compare_rating*100)"}}"%</div>
          </div>
          <div class=&quot;scoretopright&quot;>
              <div><span class=&quot;fs15 col9f mgr5&quot;>评价服务</span><stars :num=&quot;scorerating.service_score.toFixed(1)&quot;></stars><span class=&quot;colf60 right&quot;>"{{"scorerating.service_score.toFixed(1)"}}"</span></div>
              <div><span class=&quot;fs15 col9f mgr5&quot;>菜品评价</span><stars :num=&quot;scorerating.food_score.toFixed(1)&quot;></stars><span class=&quot;colf60 right&quot;>"{{"scorerating.food_score.toFixed(1)"}}"</span></div>
              <div><span class=&quot;fs15 col9f mgr5&quot;>送达时间</span><span class=&quot;fs15 colf60&quot;>"{{"scorerating.deliver_time"}}"分钟</span></div>
          </div>
        </div>
        <div class=&quot;scoremain&quot;>
              <div class=&quot;scoremaintop after&quot;>
                <div v-for=&quot;(item,index) in scoretags&quot; class=&quot;ih30 fs0-8&quot; :class=&quot;{sty2:item.unsatisfied,sty1:!(item.unsatisfied),on:index==scoreindex}&quot;>"{{"item.name"}}"("{{"item.count"}}")</div>
              </div>
              <div class=&quot;scoremaininfo&quot;>
                  <div v-for=&quot;item in score&quot; class=&quot;scoreitem after&quot;>
                      <div class=&quot;scoreitemleft&quot;>
                          <img :src=&quot;imgaddpath(item.avatar)&quot; >
                      </div>
                      <div class=&quot;scoreitemright fs12 col9f&quot;>
                          <div>
                              <span>"{{"item.username"}}"</span>
                              <span class=&quot;right&quot;>"{{"item.rated_at"}}"</span>
                          </div>
                          <div>
                              <stars :num=&quot;item.rating_star&quot;></stars>
                          </div>
                          <div>
                              "{{"item.time_spent_desc"}}"
                          </div>
                          <div class=&quot;scoreimgbox&quot;>
                            <img v-for=&quot;itema in item.item_ratings&quot; :src=&quot;imgaddpath(itema.image_hash)&quot;>
                          </div>
                          <div class=&quot;namebox&quot;>
                              <div v-for=&quot;itemb in item.item_ratings&quot;>"{{"itemb.food_name"}}"</div>
                          </div>

                      </div>
                  </div>
                
              </div>
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"score"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!shoporscore"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoretop"</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoretopleft"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs1-2 colf60"</span>&gt;"{{"shopinfo.rating"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 col9f"</span>&gt;综合评价&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs0-8 col9f"</span>&gt;高于周边商家"{{"parseInt(scorerating.compare_rating*<span class="hljs-number">100</span>)"}}"%&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoretopright"</span>&gt;
              &lt;<span class="hljs-keyword">div</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 col9f mgr5"</span>&gt;评价服务&lt;/span&gt;&lt;stars :num=<span class="hljs-string">"scorerating.service_score.toFixed(1)"</span>&gt;&lt;/stars&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"colf60 right"</span>&gt;"{{"scorerating.service_score.toFixed(<span class="hljs-number">1</span>)"}}"&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 col9f mgr5"</span>&gt;菜品评价&lt;/span&gt;&lt;stars :num=<span class="hljs-string">"scorerating.food_score.toFixed(1)"</span>&gt;&lt;/stars&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"colf60 right"</span>&gt;"{{"scorerating.food_score.toFixed(<span class="hljs-number">1</span>)"}}"&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span>&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 col9f mgr5"</span>&gt;送达时间&lt;/span&gt;&lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"fs15 colf60"</span>&gt;"{{"scorerating.deliver_time"}}"分钟&lt;/span&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoremain"</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoremaintop after"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,index) in scoretags"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs0-8"</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">"{sty2:item.unsatisfied,sty1:!(item.unsatisfied),on:index==scoreindex}"</span>&gt;"{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">name</span>"}}"("{{"<span class="hljs-built_in">item</span>.<span class="hljs-built_in">count</span>"}}")&lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;/<span class="hljs-keyword">div</span>&gt;
              &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoremaininfo"</span>&gt;
                  &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"item in score"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitem after"</span>&gt;
                      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitemleft"</span>&gt;
                          &lt;img :src=<span class="hljs-string">"imgaddpath(item.avatar)"</span> &gt;
                      &lt;/<span class="hljs-keyword">div</span>&gt;
                      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreitemright fs12 col9f"</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              &lt;span&gt;"{{"<span class="hljs-built_in">item</span>.username"}}"&lt;/span&gt;
                              &lt;span <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;"{{"<span class="hljs-built_in">item</span>.rated_at"}}"&lt;/span&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              &lt;stars :num=<span class="hljs-string">"item.rating_star"</span>&gt;&lt;/stars&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span>&gt;
                              "{{"<span class="hljs-built_in">item</span>.time_spent_desc"}}"
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"scoreimgbox"</span>&gt;
                            &lt;img v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"itema in item.item_ratings"</span> :src=<span class="hljs-string">"imgaddpath(itema.image_hash)"</span>&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"namebox"</span>&gt;
                              &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"itemb in item.item_ratings"</span>&gt;"{{"itemb.food_name"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
                          &lt;/<span class="hljs-keyword">div</span>&gt;

                      &lt;/<span class="hljs-keyword">div</span>&gt;
                  &lt;/<span class="hljs-keyword">div</span>&gt;
                
              &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>页面如图<br><span class="img-wrap"><img data-src="/img/bVVj9D?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVVj9D?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>不显示图片我看了看是API没有返回数据<br>shop.vue最终修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;shop&quot; class=&quot;bgfff&quot;>
        <div class=&quot;topbg&quot;>
                <img class=&quot;topbgimg&quot; :src=&quot;imgpath+shopinfo.image_path&quot;>
        </div>
        <div class=&quot;shoptop&quot;>
            <div class=&quot;toptop ih30&quot;>
              <icon class=&quot;backicon&quot; name=&quot;back&quot;></icon>
              <span class=&quot;right&quot;>
                  <icon class=&quot;backicon2&quot; name=&quot;cart&quot;></icon>
                  <icon class=&quot;backicon2&quot; name=&quot;more&quot;></icon> 
              </span>
            </div>
            <div class=&quot;topfoot&quot;>
                <div class=&quot;topleft&quot;>
                    <img :src=&quot;imgpath+shopinfo.image_path&quot;>
                </div>
                <div class=&quot;topright nowarp&quot;>
                    <div class=&quot;foota&quot;>
                        <div class=&quot;footamain fs1-2 nowarp&quot;>"{{"shopinfo.name"}}"</div>
                        <icon name=&quot;right&quot; class=&quot; icon3&quot;></icon>
                    </div>
                    <div class=&quot;footb nowarp&quot;>
                        <div class=&quot;nowarp&quot;>公告:"{{"shopinfo.promotion_info"}}"</div>
                    </div>
                    <div class=&quot;footc&quot;>
                        <span class=&quot;footcmain&quot;><span v-if=&quot;shopinfo.delivery_mode&quot;>"{{"shopinfo.delivery_mode.text"}}"•</span><span>约"{{"shopinfo.order_lead_time"}}"</span></span>
                    </div>
                </div>
            </div>
            
        </div>

        <div class=&quot;shopmid mgtop10&quot;>
            <div v-if=&quot;shopinfo.activities&quot; class=&quot;midtop&quot;><span class=&quot;te mgr5&quot;>"{{"shopinfo.activities[0].icon_name"}}"</span><span>"{{"shopinfo.activities[0].description"}}"</span><span class=&quot;right&quot;>"{{"shopinfo.activities.length"}}"个活动 <icon name=&quot;down&quot; class=&quot;icon4&quot;></icon></span></div>
            <div class=&quot;mytab&quot;>
                <div @click=&quot;shoporscore=true&quot; :class=&quot;{ on:shoporscore }&quot;>商品</div>
                <div @click=&quot;shoporscore=false&quot; :class=&quot;{ on:!shoporscore }&quot; >评价"{{"shopinfo.rating"}}"分</div>
            </div>
        </div>

    <div v-if=&quot;shoporscore&quot; class=&quot;shopmain&quot;>
        <div class=&quot;mianleft&quot;>
            <div v-for=&quot;(item,index) in shopmean&quot; class=&quot;leftdiv&quot;>
                <div >
                    <icon v-if=&quot;index==0&quot; class=&quot;icon5&quot; name=&quot;hot&quot;></icon>
                    <icon v-if=&quot;index==1&quot; class=&quot;icon5&quot; name=&quot;discount&quot;></icon>
                    <span class=&quot;fs0-8&quot;>"{{"item.name"}}"</span>
                </div>
            </div>
        </div>
        <div class=&quot;mainright&quot;>
            <div class=&quot;item&quot; v-for=&quot;item in shopmean&quot;>
                <div class=&quot;itemtop padtop10 ih30 after&quot;>
                    <span class=&quot;fs15&quot;>"{{"item.name"}}"</span>
                    <span class=&quot;fs0-8 col9f&quot;>"{{"item.description"}}"</span>
                </div>
                <div class=&quot;itemmain&quot;>
                    <div v-for=&quot;items in item.foods&quot; class=&quot;iteminfo after&quot;>
                        <div class=&quot;infoimgbox&quot;>
                            <img :src=&quot;imgpath+items.image_path&quot;>
                        </div>
                        <div class=&quot;inforight&quot;>
                            <div class=&quot;fs15 ih20&quot;>"{{"items.name"}}"</div>
                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>"{{"items.tips"}}"</span></div>
                            <div class=&quot;ih15&quot;><span v-if=&quot;false&quot; class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>包装费</span><span class=&quot;yh&quot;>"{{""}}"</span></span></div>
                            <div class=&quot;ih20&quot;>
                              <span class=&quot;colred fs12&quot;>￥</span>
                              <span class=&quot;colred mgr5&quot;>"{{"items.specfoods[0].price"}}"</span>
                              <span v-if=&quot;items.specfoods[0].original_price&quot; class=&quot;fs12 col9f midline&quot;>￥56</span>
                              <icon v-if=&quot;items.specfoods.length==1&quot; name=&quot;add&quot; class=&quot;addicon right&quot; ></icon>
                              <span class=&quot;fs12 right gz&quot; v-if=&quot;items.specfoods.length>1&quot;>选规则</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if=&quot;shoporscore&quot; class=&quot;foot&quot;>
      <div class=&quot;footleft&quot;>
          <div class=&quot;footlogo&quot;><icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon></div>
          <div class=&quot;footmain&quot;>未选购商品</div>
      </div>
      <div class=&quot;footright&quot;>
          ￥20起送
      </div>
    </div>
    <div class=&quot;score&quot; v-if=&quot;!shoporscore&quot;>
        <div class=&quot;scoretop&quot;>
          <div class=&quot;scoretopleft&quot;>
              <div class=&quot;fs1-2 colf60&quot;>"{{"shopinfo.rating"}}"</div>
              <div class=&quot;fs15 col9f&quot;>综合评价</div>
              <div class=&quot;fs0-8 col9f&quot;>高于周边商家"{{"parseInt(scorerating.compare_rating*100)"}}"%</div>
          </div>
          <div class=&quot;scoretopright&quot;>
              <div><span class=&quot;fs15 col9f mgr5&quot;>评价服务</span><stars :num=&quot;scorerating.service_score.toFixed(1)&quot;></stars><span class=&quot;colf60 right&quot;>"{{"scorerating.service_score.toFixed(1)"}}"</span></div>
              <div><span class=&quot;fs15 col9f mgr5&quot;>菜品评价</span><stars :num=&quot;scorerating.food_score.toFixed(1)&quot;></stars><span class=&quot;colf60 right&quot;>"{{"scorerating.food_score.toFixed(1)"}}"</span></div>
              <div><span class=&quot;fs15 col9f mgr5&quot;>送达时间</span><span class=&quot;fs15 colf60&quot;>"{{"scorerating.deliver_time"}}"分钟</span></div>
          </div>
        </div>
        <div class=&quot;scoremain&quot;>
              <div class=&quot;scoremaintop after&quot;>
                <div v-for=&quot;(item,index) in scoretags&quot; class=&quot;ih30 fs0-8&quot; :class=&quot;{sty2:item.unsatisfied,sty1:!(item.unsatisfied),on:index==scoreindex}&quot;>"{{"item.name"}}"("{{"item.count"}}")</div>
              </div>
              <div class=&quot;scoremaininfo&quot;>
                  <div v-for=&quot;item in score&quot; class=&quot;scoreitem after&quot;>
                      <div class=&quot;scoreitemleft&quot;>
                          <img :src=&quot;imgaddpath(item.avatar)&quot; >
                      </div>
                      <div class=&quot;scoreitemright fs12 col9f&quot;>
                          <div>
                              <span>"{{"item.username"}}"</span>
                              <span class=&quot;right&quot;>"{{"item.rated_at"}}"</span>
                          </div>
                          <div>
                              <stars :num=&quot;item.rating_star&quot;></stars>
                          </div>
                          <div>
                              "{{"item.time_spent_desc"}}"
                          </div>
                          <div class=&quot;scoreimgbox&quot;>
                            <img v-for=&quot;itema in item.item_ratings&quot; :src=&quot;imgaddpath(itema.image_hash)&quot;>
                          </div>
                          <div class=&quot;namebox&quot;>
                              <div v-for=&quot;itemb in item.item_ratings&quot;>"{{"itemb.food_name"}}"</div>
                          </div>

                      </div>
                  </div>
                
              </div>
        </div>
    </div>
  </div>
</template>

<script>
import stars from '../../components/stars/stars'


export default {
  data () {
    return {
      imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
      shopinfo:&quot;&quot;,                              //商家信息
      shopmean:&quot;&quot;,                              //食品信息
      shoporscore:true,                         //商家还是评价
      score:&quot;&quot;,                                 //评价信息
      scorerating:&quot;&quot;,                           //评价分数  
      scoretags:&quot;&quot;,                             //评价分类
      scoreindex:0                              //选中第几个评价分类
    }
  },
  components:{
  //注册组件
      stars
  },
  mounted:function(){
  //生命周期
      //餐馆详情
      this.$http.get('http://cangdu.org:8001/shopping/restaurant/1').then(response => {
        console.log(response);
        this.shopinfo=response.body;
      }, response => {
        console.log(response);
      });
      //食品详情
      this.$http.get('http://cangdu.org:8001/shopping/v2/menu?restaurant_id=1').then(response => {
        console.log(response);
        this.shopmean=response.body;
      }, response => {
        console.log(response);
      });
      //评论详情
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings?offset=0&amp;limit=10').then(response => {
        console.log(response);
        this.score=response.body;
      }, response => {
        console.log(response);
      });
      //评论分数
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/scores').then(response => {
        console.log(response);
        this.scorerating=response.body;
      }, response => {
        console.log(response);
      });
       //评论分类
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/tags').then(response => {
        console.log(response);
        this.scoretags=response.body;
      }, response => {
        console.log(response);
      });
  },
  computed:{
  //计算属性

  },
  methods:{
  //函数
      imgaddpath:function(e){
        return &quot;https://fuss10.elemecdn.com/&quot;+e+&quot;.jpeg&quot;
      }
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
.shoptop{
  height:120px;
  background-color: rgba(119,103,137,.43);
  box-sizing:border-box;
  padding:10px 10px 0px 10px;
  position: relative;
}
.topbg{
  position: absolute;
  width:100%;
  height:120px;
  left:0px;
  right:0px;
  overflow:hidden;
}
.topbgimg{
  width:100%;
  filter: blur(10px);
}
.backicon{
  height:30px;
  width:30px;
}
.backicon2{
  height:25px;
  width:25px;
}
.toptop{
  margin-bottom:10px;
}
.topfoot{
  height:70px;
  display:flex;
}
.topleft{
  height:80px;
  width:80px;
  background-color:#3c3c3c;
  margin-right:10px;
  border-radius:3px;
  box-shadow:0 0 5px #3c3c3c;  
}
.topleft>img{
  max-width:100%;
  max-height:100%;
  border-radius:3px;
}
.topright,.topleft{
  float:left;
}
.topright{
  height:100%;
  flex:1;
}
.foota{
  height:30px;
  color:white;
  line-height:30px;
  display:flex;
}
.icon3{
  width:20px;
  height:20px;
  margin-top:5px;
}
.footc{
  height:20px;
  line-height:20px;
  font-size:12px;
}
.footb{
  font-size:12px;
  color:white;
}
.footcmain{
  background-color:#0097FF;
  color:white;
  padding:0px 5px; 
}
.shopmid{
  padding:10px 10px 0px 10px;
  border-bottom:2px solid #F8F8F8;
}
.midtop{
  font-size:12px;
}
.te{
  background-color:#F08449;
  padding:0px 1px;
  color:white;
}
.mytab{
  overflow:hidden;
  margin-top:10px;
}
.mytab>div{
  float:left;
  padding-bottom:10px;
  margin-right:10px;
  border-bottom:2px solid white;
}
.mytab>div.on{
  color:#0B89FF;
  border-color:#0B89FF;
}
.leftdiv{
  width:60px;
  padding:0px 10px;
  color:#727272;
  background-color:#F8F8F8;
}
.leftdiv>div{
  padding:15px 0px;
  border-bottom:1px solid #F1F1F1;
}
.leftdiv.on{
  background-color:white;
  color:#080808;
}
.leftdiv.on>div{
  border:0px;
}
.icon5{
  width:15px;
  height:15px;
}
.mianleft{
  width:80px;
  box-sizing:border-box;
  overflow:scroll;
}
#shop{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}
.shopmain{
  -webkit-box-flex:1;
  display:-webkit-box;
  overflow:hidden;
}
.mainright{
  -webkit-box-flex:1;
  overflow:scroll;
  padding-left:10px;
}
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.itemmain{
  padding-right:10px;
 
}
.iteminfo{
   height:70px;
   display:flex;
   padding:10px 0px;
}
.infoimgbox{
  width:70px;
  height:70px;
  margin-right:5px;
  background-color:red;
}
.infoimgbox>img{
  width:100%;
  height:100%;
}
.inforight{
  flex:1;
}
.ih20{
  height:20px;
  line-height:20px;
}
.ih15{
  height:15px;
  line-height:15px;
}
.addicon{
  width:20px;
  height:20px;
}
.zk{
  background-color:#FF5F15;
  padding:0px 3px;
  color:white;
  border:1px solid #FF5F15;
}
.yh{
  padding:0px 3px;
  color:#FF5F15;
  border:1px solid #FF5F15;
}
.gz{
  display:inline-block;
  background-color:#3190E8;
  color:white;
  padding:0px 2px;
  border-radius:2px;
}

.scoretop{
  display:flex;
  padding:0px 10px 10px 10px;
  border-bottom:10px solid #F5F5F5;
}
.scoretopleft{
  flex:2;
  text-align:center;
}
.scoretopright{
  flex:3;
}
.scoretopright>div{
  display:flex;
}
.scoremain{
  padding:0px 10px;
}
.scoremaintop{
  padding:10px 0px 5px 0px;
  display:flex;
  flex-wrap:wrap;
}
.scoremaintop>div{
  padding:0px 8px;
  border-radius:5px;
  margin-right:5px;
  margin-bottom:5px;
}
.sty1{
  background-color:#EBF5FF;
  color:#9f9f9f;
}
.sty1.on{
  background-color:#3190E8;
  color:#fff;
}
.sty2{
  background-color:#F5F5F5;
  color:#AFAFAF;
}
.scoreitem{
  display:flex;
  margin-top:10px;
}
.scoreitemleft{
  width:50px;
  height:50px;
  margin-right:10px;
}
.scoreitemleft>img{
  width:100%;
  border-radius:50%; 
}
.scoreitemright{
  flex:1;
}
.namebox{
  display:flex;
  flex-wrap: wrap;
}
.namebox>div{
  border:1px solid;
  padding:3px 3px;
  margin-right:5px;
  border-radius:3px;
  margin-bottom:5px;
}
.score{
  padding-top:10px;
  flex:1;
  overflow: scroll;
}
.scoreimgbox>img{
  width:4rem;
  height:4rem;
  margin-right:10px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>&lt;template&gt;
  &lt;div id="shop" class="bgfff"&gt;
        &lt;div class="topbg"&gt;
                &lt;img class="topbgimg" :src="imgpath+shopinfo.image_path"&gt;
        &lt;/div&gt;
        &lt;div class="shoptop"&gt;
            &lt;div class="toptop ih30"&gt;
              &lt;icon class="backicon" name="back"&gt;&lt;/icon&gt;
              &lt;span class="right"&gt;
                  &lt;icon class="backicon2" name="cart"&gt;&lt;/icon&gt;
                  &lt;icon class="backicon2" name="more"&gt;&lt;/icon&gt; 
              &lt;/span&gt;
            &lt;/div&gt;
            &lt;div class="topfoot"&gt;
                &lt;div class="topleft"&gt;
                    &lt;img :src="imgpath+shopinfo.image_path"&gt;
                &lt;/div&gt;
                &lt;div class="topright nowarp"&gt;
                    &lt;div class="foota"&gt;
                        &lt;div class="footamain fs1-2 nowarp"&gt;"{{"shopinfo.name"}}"&lt;/div&gt;
                        &lt;icon name="right" class=" icon3"&gt;&lt;/icon&gt;
                    &lt;/div&gt;
                    &lt;div class="footb nowarp"&gt;
                        &lt;div class="nowarp"&gt;公告:"{{"shopinfo.promotion_info"}}"&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="footc"&gt;
                        &lt;span class="footcmain"&gt;&lt;span v-if="shopinfo.delivery_mode"&gt;"{{"shopinfo.delivery_mode.text"}}"•&lt;/span&gt;&lt;span&gt;约"{{"shopinfo.order_lead_time"}}"&lt;/span&gt;&lt;/span&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            
        &lt;/div&gt;

        &lt;div class="shopmid mgtop10"&gt;
            &lt;div v-if="shopinfo.activities" class="midtop"&gt;&lt;span class="te mgr5"&gt;"{{"shopinfo.activities[0].icon_name"}}"&lt;/span&gt;&lt;span&gt;"{{"shopinfo.activities[0].description"}}"&lt;/span&gt;&lt;span class="right"&gt;"{{"shopinfo.activities.length"}}"个活动 &lt;icon name="down" class="icon4"&gt;&lt;/icon&gt;&lt;/span&gt;&lt;/div&gt;
            &lt;div class="mytab"&gt;
                &lt;div @click="shoporscore=true" :class="{ on:shoporscore }"&gt;商品&lt;/div&gt;
                &lt;div @click="shoporscore=false" :class="{ on:!shoporscore }" &gt;评价"{{"shopinfo.rating"}}"分&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;

    &lt;div v-if="shoporscore" class="shopmain"&gt;
        &lt;div class="mianleft"&gt;
            &lt;div v-for="(item,index) in shopmean" class="leftdiv"&gt;
                &lt;div &gt;
                    &lt;icon v-if="index==0" class="icon5" name="hot"&gt;&lt;/icon&gt;
                    &lt;icon v-if="index==1" class="icon5" name="discount"&gt;&lt;/icon&gt;
                    &lt;span class="fs0-8"&gt;"{{"item.name"}}"&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="mainright"&gt;
            &lt;div class="item" v-for="item in shopmean"&gt;
                &lt;div class="itemtop padtop10 ih30 after"&gt;
                    &lt;span class="fs15"&gt;"{{"item.name"}}"&lt;/span&gt;
                    &lt;span class="fs0-8 col9f"&gt;"{{"item.description"}}"&lt;/span&gt;
                &lt;/div&gt;
                &lt;div class="itemmain"&gt;
                    &lt;div v-for="items in item.foods" class="iteminfo after"&gt;
                        &lt;div class="infoimgbox"&gt;
                            &lt;img :src="imgpath+items.image_path"&gt;
                        &lt;/div&gt;
                        &lt;div class="inforight"&gt;
                            &lt;div class="fs15 ih20"&gt;"{{"items.name"}}"&lt;/div&gt;
                            &lt;div class="ih15 col9f"&gt;&lt;span class="fs10 mgl"&gt;"{{"items.tips"}}"&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih15"&gt;&lt;span v-if="false" class="fs10 mgl"&gt;&lt;span class="zk"&gt;包装费&lt;/span&gt;&lt;span class="yh"&gt;"{{""}}"&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;
                            &lt;div class="ih20"&gt;
                              &lt;span class="colred fs12"&gt;￥&lt;/span&gt;
                              &lt;span class="colred mgr5"&gt;"{{"items.specfoods[0].price"}}"&lt;/span&gt;
                              &lt;span v-if="items.specfoods[0].original_price" class="fs12 col9f midline"&gt;￥56&lt;/span&gt;
                              &lt;icon v-if="items.specfoods.length==1" name="add" class="addicon right" &gt;&lt;/icon&gt;
                              &lt;span class="fs12 right gz" v-if="items.specfoods.length&gt;1"&gt;选规则&lt;/span&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div v-if="shoporscore" class="foot"&gt;
      &lt;div class="footleft"&gt;
          &lt;div class="footlogo"&gt;&lt;icon name="footcar" class="footicon"&gt;&lt;/icon&gt;&lt;/div&gt;
          &lt;div class="footmain"&gt;未选购商品&lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="footright"&gt;
          ￥20起送
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="score" v-if="!shoporscore"&gt;
        &lt;div class="scoretop"&gt;
          &lt;div class="scoretopleft"&gt;
              &lt;div class="fs1-2 colf60"&gt;"{{"shopinfo.rating"}}"&lt;/div&gt;
              &lt;div class="fs15 col9f"&gt;综合评价&lt;/div&gt;
              &lt;div class="fs0-8 col9f"&gt;高于周边商家"{{"parseInt(scorerating.compare_rating*100)"}}"%&lt;/div&gt;
          &lt;/div&gt;
          &lt;div class="scoretopright"&gt;
              &lt;div&gt;&lt;span class="fs15 col9f mgr5"&gt;评价服务&lt;/span&gt;&lt;stars :num="scorerating.service_score.toFixed(1)"&gt;&lt;/stars&gt;&lt;span class="colf60 right"&gt;"{{"scorerating.service_score.toFixed(1)"}}"&lt;/span&gt;&lt;/div&gt;
              &lt;div&gt;&lt;span class="fs15 col9f mgr5"&gt;菜品评价&lt;/span&gt;&lt;stars :num="scorerating.food_score.toFixed(1)"&gt;&lt;/stars&gt;&lt;span class="colf60 right"&gt;"{{"scorerating.food_score.toFixed(1)"}}"&lt;/span&gt;&lt;/div&gt;
              &lt;div&gt;&lt;span class="fs15 col9f mgr5"&gt;送达时间&lt;/span&gt;&lt;span class="fs15 colf60"&gt;"{{"scorerating.deliver_time"}}"分钟&lt;/span&gt;&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="scoremain"&gt;
              &lt;div class="scoremaintop after"&gt;
                &lt;div v-for="(item,index) in scoretags" class="ih30 fs0-8" :class="{sty2:item.unsatisfied,sty1:!(item.unsatisfied),on:index==scoreindex}"&gt;"{{"item.name"}}"("{{"item.count"}}")&lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="scoremaininfo"&gt;
                  &lt;div v-for="item in score" class="scoreitem after"&gt;
                      &lt;div class="scoreitemleft"&gt;
                          &lt;img :src="imgaddpath(item.avatar)" &gt;
                      &lt;/div&gt;
                      &lt;div class="scoreitemright fs12 col9f"&gt;
                          &lt;div&gt;
                              &lt;span&gt;"{{"item.username"}}"&lt;/span&gt;
                              &lt;span class="right"&gt;"{{"item.rated_at"}}"&lt;/span&gt;
                          &lt;/div&gt;
                          &lt;div&gt;
                              &lt;stars :num="item.rating_star"&gt;&lt;/stars&gt;
                          &lt;/div&gt;
                          &lt;div&gt;
                              "{{"item.time_spent_desc"}}"
                          &lt;/div&gt;
                          &lt;div class="scoreimgbox"&gt;
                            &lt;img v-for="itema in item.item_ratings" :src="imgaddpath(itema.image_hash)"&gt;
                          &lt;/div&gt;
                          &lt;div class="namebox"&gt;
                              &lt;div v-for="itemb in item.item_ratings"&gt;"{{"itemb.food_name"}}"&lt;/div&gt;
                          &lt;/div&gt;

                      &lt;/div&gt;
                  &lt;/div&gt;
                
              &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import stars from '../../components/stars/stars'


export default {
  data () {
    return {
      imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
      shopinfo:"",                              //商家信息
      shopmean:"",                              //食品信息
      shoporscore:true,                         //商家还是评价
      score:"",                                 //评价信息
      scorerating:"",                           //评价分数  
      scoretags:"",                             //评价分类
      scoreindex:0                              //选中第几个评价分类
    }
  },
  components:{
  //注册组件
      stars
  },
  mounted:function(){
  //生命周期
      //餐馆详情
      this.$http.get('http://cangdu.org:8001/shopping/restaurant/1').then(response =&gt; {
        console.log(response);
        this.shopinfo=response.body;
      }, response =&gt; {
        console.log(response);
      });
      //食品详情
      this.$http.get('http://cangdu.org:8001/shopping/v2/menu?restaurant_id=1').then(response =&gt; {
        console.log(response);
        this.shopmean=response.body;
      }, response =&gt; {
        console.log(response);
      });
      //评论详情
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings?offset=0&amp;limit=10').then(response =&gt; {
        console.log(response);
        this.score=response.body;
      }, response =&gt; {
        console.log(response);
      });
      //评论分数
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/scores').then(response =&gt; {
        console.log(response);
        this.scorerating=response.body;
      }, response =&gt; {
        console.log(response);
      });
       //评论分类
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/1/ratings/tags').then(response =&gt; {
        console.log(response);
        this.scoretags=response.body;
      }, response =&gt; {
        console.log(response);
      });
  },
  computed:{
  //计算属性

  },
  methods:{
  //函数
      imgaddpath:function(e){
        return "https://fuss10.elemecdn.com/"+e+".jpeg"
      }
  }
}
&lt;/script&gt;

&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
.shoptop{
  height:120px;
  background-color: rgba(119,103,137,.43);
  box-sizing:border-box;
  padding:10px 10px 0px 10px;
  position: relative;
}
.topbg{
  position: absolute;
  width:100%;
  height:120px;
  left:0px;
  right:0px;
  overflow:hidden;
}
.topbgimg{
  width:100%;
  filter: blur(10px);
}
.backicon{
  height:30px;
  width:30px;
}
.backicon2{
  height:25px;
  width:25px;
}
.toptop{
  margin-bottom:10px;
}
.topfoot{
  height:70px;
  display:flex;
}
.topleft{
  height:80px;
  width:80px;
  background-color:#3c3c3c;
  margin-right:10px;
  border-radius:3px;
  box-shadow:0 0 5px #3c3c3c;  
}
.topleft&gt;img{
  max-width:100%;
  max-height:100%;
  border-radius:3px;
}
.topright,.topleft{
  float:left;
}
.topright{
  height:100%;
  flex:1;
}
.foota{
  height:30px;
  color:white;
  line-height:30px;
  display:flex;
}
.icon3{
  width:20px;
  height:20px;
  margin-top:5px;
}
.footc{
  height:20px;
  line-height:20px;
  font-size:12px;
}
.footb{
  font-size:12px;
  color:white;
}
.footcmain{
  background-color:#0097FF;
  color:white;
  padding:0px 5px; 
}
.shopmid{
  padding:10px 10px 0px 10px;
  border-bottom:2px solid #F8F8F8;
}
.midtop{
  font-size:12px;
}
.te{
  background-color:#F08449;
  padding:0px 1px;
  color:white;
}
.mytab{
  overflow:hidden;
  margin-top:10px;
}
.mytab&gt;div{
  float:left;
  padding-bottom:10px;
  margin-right:10px;
  border-bottom:2px solid white;
}
.mytab&gt;div.on{
  color:#0B89FF;
  border-color:#0B89FF;
}
.leftdiv{
  width:60px;
  padding:0px 10px;
  color:#727272;
  background-color:#F8F8F8;
}
.leftdiv&gt;div{
  padding:15px 0px;
  border-bottom:1px solid #F1F1F1;
}
.leftdiv.on{
  background-color:white;
  color:#080808;
}
.leftdiv.on&gt;div{
  border:0px;
}
.icon5{
  width:15px;
  height:15px;
}
.mianleft{
  width:80px;
  box-sizing:border-box;
  overflow:scroll;
}
#shop{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}
.shopmain{
  -webkit-box-flex:1;
  display:-webkit-box;
  overflow:hidden;
}
.mainright{
  -webkit-box-flex:1;
  overflow:scroll;
  padding-left:10px;
}
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.itemmain{
  padding-right:10px;
 
}
.iteminfo{
   height:70px;
   display:flex;
   padding:10px 0px;
}
.infoimgbox{
  width:70px;
  height:70px;
  margin-right:5px;
  background-color:red;
}
.infoimgbox&gt;img{
  width:100%;
  height:100%;
}
.inforight{
  flex:1;
}
.ih20{
  height:20px;
  line-height:20px;
}
.ih15{
  height:15px;
  line-height:15px;
}
.addicon{
  width:20px;
  height:20px;
}
.zk{
  background-color:#FF5F15;
  padding:0px 3px;
  color:white;
  border:1px solid #FF5F15;
}
.yh{
  padding:0px 3px;
  color:#FF5F15;
  border:1px solid #FF5F15;
}
.gz{
  display:inline-block;
  background-color:#3190E8;
  color:white;
  padding:0px 2px;
  border-radius:2px;
}

.scoretop{
  display:flex;
  padding:0px 10px 10px 10px;
  border-bottom:10px solid #F5F5F5;
}
.scoretopleft{
  flex:2;
  text-align:center;
}
.scoretopright{
  flex:3;
}
.scoretopright&gt;div{
  display:flex;
}
.scoremain{
  padding:0px 10px;
}
.scoremaintop{
  padding:10px 0px 5px 0px;
  display:flex;
  flex-wrap:wrap;
}
.scoremaintop&gt;div{
  padding:0px 8px;
  border-radius:5px;
  margin-right:5px;
  margin-bottom:5px;
}
.sty1{
  background-color:#EBF5FF;
  color:#9f9f9f;
}
.sty1.on{
  background-color:#3190E8;
  color:#fff;
}
.sty2{
  background-color:#F5F5F5;
  color:#AFAFAF;
}
.scoreitem{
  display:flex;
  margin-top:10px;
}
.scoreitemleft{
  width:50px;
  height:50px;
  margin-right:10px;
}
.scoreitemleft&gt;img{
  width:100%;
  border-radius:50%; 
}
.scoreitemright{
  flex:1;
}
.namebox{
  display:flex;
  flex-wrap: wrap;
}
.namebox&gt;div{
  border:1px solid;
  padding:3px 3px;
  margin-right:5px;
  border-radius:3px;
  margin-bottom:5px;
}
.score{
  padding-top:10px;
  flex:1;
  overflow: scroll;
}
.scoreimgbox&gt;img{
  width:4rem;
  height:4rem;
  margin-right:10px;
}
&lt;/style&gt;
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从创建到完整的饿了么（14）shop.vue

## 原文链接
[https://segmentfault.com/a/1190000011239861](https://segmentfault.com/a/1190000011239861)

