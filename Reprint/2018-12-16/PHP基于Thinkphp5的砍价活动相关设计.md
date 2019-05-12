---
title: 'PHP基于Thinkphp5的砍价活动相关设计' 
date: 2018-12-16 2:30:10
hidden: true
slug: vgsff9du7jm
categories: [reprint]
---

{{< raw >}}

                    
<p>近期我们公司项目里陆陆续续有很多为了招引新用户的活动推出，砍价的活动由我来负责，我们的项目是在微信浏览器里供用户浏览访问。</p>
<p>大概描述：进入砍价活动列表页选择有意向的商品，用户点击商品图片可以看到WEB商城中所卖的商品价格与详细参数等信息，点击列表中对应商品标识下的'马上抢购'可以进入砍价页面，该页面有两个主要按钮，一个是'请土豪帮忙'（点击之后起引导分享作用）、'买买买'（砍到一定价位后可以购买），其次包括价格的进度条等信息，用户分享到朋友圈引来朋友帮忙砍价，在触发砍价按钮的同时，如果帮忙的朋友不是本站用户，那么帮忙的朋友会成为本站的会员，同时会是该分享用户的下级，然后根据产品运营采购针对每个商品的讨论，会给商品定义好要砍价的活动价和最低价，以及每砍一次所能砍掉的价格区间和要参与的人数做计算，比如（商品原价3000，最低价1000，那么所能砍掉的价格是2000，规定参与的人数是500人，那么平均一个人砍掉4块钱，可以设定区间为1~7元，来设定砍价的起伏大小，来提高用户的参与兴趣），当用户砍到规定的价格区间内购买时，跳转到订单确认页面，然后下单支付一系列流程。</p>
<p>页面截图：</p>
<p><span class="img-wrap"><img data-src="/img/bV2EGi?w=682&amp;h=576" src="https://static.alili.tech/img/bV2EGi?w=682&amp;h=576" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV2EGn?w=663&amp;h=568" src="https://static.alili.tech/img/bV2EGn?w=663&amp;h=568" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV2EGr?w=677&amp;h=571" src="https://static.alili.tech/img/bV2EGr?w=677&amp;h=571" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>实现相关：</p>
<p>通过看到几张图片大概我想大家也会考虑到所涉及的相关信息。</p>
<p>想要发布参与活动的商品就有一个商品区分表示，在数据库的设计当中，我没有修改商品表来增加一个区分的字段，而是新创建了一个数据表作为专门放置砍价活动的相关信息。</p>
<p>来看一下后台的前台展示我是这么设计的，没有经过专业前端之手，仅仅在复制了后台商品列表模块代码的基础上自己简单的做了一下布局。</p>
<p><span class="img-wrap"><img data-src="/img/bV2EGx?w=679&amp;h=184" src="https://static.alili.tech/img/bV2EGx?w=679&amp;h=184" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>我的数据表设计：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#活动商品设置表：
CREATE TABLE `hp_activity_bargain` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品ID',
  `product_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品名称',
  `activity_money` decimal(7,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '活动价',
  `bargain_section` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '砍价区间',
  `bargain_section2` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '砍价区间2【用户线上砍价(新用户砍价区间)】',   #忽略，此处是迭代后期地推而加上的
  `join_count` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '参与人数',
  `product_desc` varchar(80) COLLATE utf8_unicode_ci NOT NULL COMMENT '活动商品描述',
  `attr1_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT 'attr1属性',
  `attr2_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT 'attr2属性',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0是线上，1是地推',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `attr2_id` (`attr2_id`),
  KEY `attr1_id` (`attr1_id`),
  KEY `type` (`type`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>#活动商品设置表：
<span class="hljs-keyword">CREATE</span> TABLE <span class="hljs-symbol">`hp_activity_bargain`</span> (
  <span class="hljs-symbol">`id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> AUTO_INCREMENT COMMENT <span class="hljs-string">'主键'</span>,
  <span class="hljs-symbol">`product_id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'商品ID'</span>,
  <span class="hljs-symbol">`product_name`</span> varchar(<span class="hljs-number">200</span>) <span class="hljs-keyword">COLLATE</span> utf8_unicode_ci <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> COMMENT <span class="hljs-string">'商品名称'</span>,
  <span class="hljs-symbol">`activity_money`</span> decimal(<span class="hljs-number">7</span>,<span class="hljs-number">2</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0.00'</span> COMMENT <span class="hljs-string">'活动价'</span>,
  <span class="hljs-symbol">`bargain_section`</span> varchar(<span class="hljs-number">20</span>) <span class="hljs-keyword">COLLATE</span> utf8_unicode_ci <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">''</span> COMMENT <span class="hljs-string">'砍价区间'</span>,
  <span class="hljs-symbol">`bargain_section2`</span> varchar(<span class="hljs-number">20</span>) <span class="hljs-keyword">COLLATE</span> utf8_unicode_ci <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">''</span> COMMENT <span class="hljs-string">'砍价区间2【用户线上砍价(新用户砍价区间)】'</span>,   #忽略，此处是迭代后期地推而加上的
  <span class="hljs-symbol">`join_count`</span> smallint(<span class="hljs-number">3</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'参与人数'</span>,
  <span class="hljs-symbol">`product_desc`</span> varchar(<span class="hljs-number">80</span>) <span class="hljs-keyword">COLLATE</span> utf8_unicode_ci <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> COMMENT <span class="hljs-string">'活动商品描述'</span>,
  <span class="hljs-symbol">`attr1_id`</span> smallint(<span class="hljs-number">5</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'attr1属性'</span>,
  <span class="hljs-symbol">`attr2_id`</span> smallint(<span class="hljs-number">5</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'attr2属性'</span>,
  <span class="hljs-symbol">`type`</span> tinyint(<span class="hljs-number">1</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'0是线上，1是地推'</span>,
  <span class="hljs-keyword">PRIMARY</span> <span class="hljs-keyword">KEY</span> (<span class="hljs-symbol">`id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`product_id`</span> (<span class="hljs-symbol">`product_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`attr2_id`</span> (<span class="hljs-symbol">`attr2_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`attr1_id`</span> (<span class="hljs-symbol">`attr1_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`type`</span> (<span class="hljs-symbol">`type`</span>)
) ENGINE=MyISAM AUTO_INCREMENT=<span class="hljs-number">7</span> DEFAULT CHARSET=utf8 <span class="hljs-keyword">COLLATE</span>=utf8_unicode_ci;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#用户参与进度信息表
CREATE TABLE `hp_activity_bargainirg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `activity_bargain_id` int(10) unsigned NOT NULL COMMENT 'activity_prodcuts主键id',
  `product_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '参与活动的商品',
  `attr1_id` smallint(5) unsigned NOT NULL COMMENT 'attr1属性id',
  `attr2_id` smallint(5) unsigned NOT NULL COMMENT 'attr2属性id',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '砍价商品发起的用户ID',
  `bargain_count` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '被砍价次数',
  `deal_money` decimal(7,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '最终交易价格',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '发起时间',
  `is_addorder` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否下单(0:未下单，1已下单)',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0是线上，1是地推',    #可以忽略，后期地推加上去的
  PRIMARY KEY (`id`),
  KEY `activity_bargain_id` (`activity_bargain_id`),
  KEY `attr1_id` (`attr1_id`),
  KEY `attr2_id` (`attr2_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  KEY `is_addorder` (`is_addorder`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>#用户参与进度信息表
<span class="hljs-keyword">CREATE</span> TABLE <span class="hljs-symbol">`hp_activity_bargainirg`</span> (
  <span class="hljs-symbol">`id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> AUTO_INCREMENT COMMENT <span class="hljs-string">'主键ID'</span>,
  <span class="hljs-symbol">`activity_bargain_id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> COMMENT <span class="hljs-string">'activity_prodcuts主键id'</span>,
  <span class="hljs-symbol">`product_id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'参与活动的商品'</span>,
  <span class="hljs-symbol">`attr1_id`</span> smallint(<span class="hljs-number">5</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> COMMENT <span class="hljs-string">'attr1属性id'</span>,
  <span class="hljs-symbol">`attr2_id`</span> smallint(<span class="hljs-number">5</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> COMMENT <span class="hljs-string">'attr2属性id'</span>,
  <span class="hljs-symbol">`user_id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'砍价商品发起的用户ID'</span>,
  <span class="hljs-symbol">`bargain_count`</span> smallint(<span class="hljs-number">5</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'被砍价次数'</span>,
  <span class="hljs-symbol">`deal_money`</span> decimal(<span class="hljs-number">7</span>,<span class="hljs-number">2</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0.00'</span> COMMENT <span class="hljs-string">'最终交易价格'</span>,
  <span class="hljs-symbol">`create_time`</span> int(<span class="hljs-number">11</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'发起时间'</span>,
  <span class="hljs-symbol">`is_addorder`</span> tinyint(<span class="hljs-number">1</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'是否下单(0:未下单，1已下单)'</span>,
  <span class="hljs-symbol">`type`</span> tinyint(<span class="hljs-number">1</span>) <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'0是线上，1是地推'</span>,    #可以忽略，后期地推加上去的
  <span class="hljs-keyword">PRIMARY</span> <span class="hljs-keyword">KEY</span> (<span class="hljs-symbol">`id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`activity_bargain_id`</span> (<span class="hljs-symbol">`activity_bargain_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`attr1_id`</span> (<span class="hljs-symbol">`attr1_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`attr2_id`</span> (<span class="hljs-symbol">`attr2_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`product_id`</span> (<span class="hljs-symbol">`product_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`user_id`</span> (<span class="hljs-symbol">`user_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`is_addorder`</span> (<span class="hljs-symbol">`is_addorder`</span>)
) ENGINE=InnoDB AUTO_INCREMENT=<span class="hljs-number">12</span> DEFAULT CHARSET=utf8 <span class="hljs-keyword">COLLATE</span>=utf8_unicode_ci;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#参与砍价详情表
CREATE TABLE `hp_activity_bargain_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `bargain_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'activity_bargainirg表主键id',
  `assistor_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '帮助者ID',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '参与时间',
  `bargain_money` decimal(5,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '砍掉价格',
  PRIMARY KEY (`id`),
  KEY `assistor_id` (`assistor_id`),
  KEY `bargain_id` (`bargain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>#参与砍价详情表
<span class="hljs-keyword">CREATE</span> TABLE <span class="hljs-symbol">`hp_activity_bargain_list`</span> (
  <span class="hljs-symbol">`id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> AUTO_INCREMENT COMMENT <span class="hljs-string">'主键ID'</span>,
  <span class="hljs-symbol">`bargain_id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'activity_bargainirg表主键id'</span>,
  <span class="hljs-symbol">`assistor_id`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'帮助者ID'</span>,
  <span class="hljs-symbol">`create_time`</span> int(<span class="hljs-number">10</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0'</span> COMMENT <span class="hljs-string">'参与时间'</span>,
  <span class="hljs-symbol">`bargain_money`</span> decimal(<span class="hljs-number">5</span>,<span class="hljs-number">2</span>) unsigned <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span> DEFAULT <span class="hljs-string">'0.00'</span> COMMENT <span class="hljs-string">'砍掉价格'</span>,
  <span class="hljs-keyword">PRIMARY</span> <span class="hljs-keyword">KEY</span> (<span class="hljs-symbol">`id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`assistor_id`</span> (<span class="hljs-symbol">`assistor_id`</span>),
  <span class="hljs-keyword">KEY</span> <span class="hljs-symbol">`bargain_id`</span> (<span class="hljs-symbol">`bargain_id`</span>)
) ENGINE=InnoDB AUTO_INCREMENT=<span class="hljs-number">3</span> DEFAULT CHARSET=utf8 <span class="hljs-keyword">COLLATE</span>=utf8_unicode_ci;</code></pre>
<p>控制器几个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //线上砍价活动列表
    public function bargainirgAction() 
    {
        $type = 0;
        $way = input('param.way', '','string');
        if (is_not_empty_string($way) &amp;&amp; $way == 'live') {
            $type = 1;
        }
        $pageSize = 10;
        if (Request::isAjax()) {
            $page = input('post.page', 0, 'intval');
            $product_list = Hmodel\Activity::getActivityBargainProducts($type, $pageSize,  $page * $pageSize);
            if (is_not_empty_array($product_list)) {
                return json_encode(['status' => 1, 'info' => $product_list]);    
            } else {
                return json_encode(['status' => 0]);
            }
        }
        $product_list = Hmodel\Activity::getActivityBargainProducts($type, 10, 0);
        $view = new view();
        $view->assign('bargainirgList',$product_list);
        if ($type == 0) {
            return $view->fetch('bargainirg');
        } else {
            return $view->fetch('bargainirg_live');
        }
        
    }

    //砍价活动\商品详情\查看贡献度\请帮忙
    public function bargaindetailAction() 
    {

        $this->checkUserLogin();
        $uid = session('userinfo.uid');
        // $uid = 3;
        $seting_id = input('param.id',0,'int');
        $seting_info = Hmodel\Activity::getActivityProductsSeting($seting_id);  //砍价活动商品设置
        $bargain_section2 = !empty($seting_info['bargain_section2']) ? $seting_info['bargain_section2'] : 'no seting';
        if (!is_not_empty_array($seting_info)) notFund(); 

        $bargain_progress = Hmodel\Activity::returnProgressData( $seting_id, $seting_info['product_id'], $uid, $seting_info['attr1_id'],$seting_info['attr2_id'], 
$seting_info['add_money'],$seting_info['type']);
    
        if (!is_not_empty_array($bargain_progress) || $bargain_progress['user_id'] != $uid) notFund();
      
        $username       = session('userinfo.username');
        $user_info      = Hmodel\User::getuser_info($uid);
        $invite_code    = $user_info['invite_code'];
        $encrypt_code   = encrypt_hopeband($bargain_progress['id'] . '(&amp;)' .$bargain_progress['activity_bargain_id'] . '(&amp;)' .$uid . '(&amp;)' . $invite_code . '(&amp;)' 
. $seting_info['product_id'] . '(&amp;)' . $seting_info['activity_money'] . '(&amp;)' . $seting_info['bargain_section'] .  '(&amp;)' . $seting_info['bargain_section2'] .'(&amp;)' 
. $seting_info['join_count'] . '(&amp;)'. $bargain_progress['type'], 'E', 'Hp_HopeBand_Bargainirg');

        //是否已经下单
        // $is_addorder    = Hmodel\Activity::checkIsAddorder($bargain_progress['id']);
        $is_addorder    = $bargain_progress['is_addorder'];

        //帮助列表
        $assistor_list = Hmodel\Activity::getAssistorList($bargain_progress['id']);

        $view = new view();
        $view->assign([
            'bar_code'           => $encrypt_code,
            'seting_info'        => $seting_info,
            'bargain_progress'   => $bargain_progress,
            'assistor_list'      => $assistor_list,
            'seting'             => $seting_id,
            'is_addorder'        => $is_addorder
        ]);
        $view->assign();
        return $view->fetch();

    }

    //帮忙砍价\进度\底部砍价商品列表
    public function bargainirgingAction ()
    {
        $url = $_SERVER['REQUEST_URI'];
        $encrypt_code = substr(substr($url,29),0,strpos(substr($url,29), '?invite_code'));

        $bargain_param = self::retrunBargainCode($encrypt_code);
        $bargain_id          = $bargain_param['bargain_id'];
        $bargainInfo         = Hmodel\Activity::getBargainirgProgress($bargain_id);
        if ( !is_not_empty_array($bargain_param) || !is_not_empty_array($bargainInfo)) {
            notFund();
        }

        $is_addorder = $bargainInfo['is_addorder'] == 1 ? true : false;
  
        $uid = session('userinfo.uid');
        $activity_product_id = $bargain_param['activity_product_id'];

         if ($bargain_param['sponsor_uid'] == $uid) {
            $this->redirect('bargaindetail',['id' => $activity_product_id]);
        }
        $product_id          = $bargain_param['product_id'];
        
        $bargain_list        = Hmodel\Activity::getActivityBargainProducts($bargain_param['type'], 999); //所有参与砍价活动的商品

        foreach ($bargain_list as $v) {
            if ( $v['id'] == $activity_product_id) {
                $product_info = $v;
            }
        }

        if (!is_not_empty_array($product_info)) notFund();
        $type = $bargain_param['type'];
        $activity_bargain_url = url('activity/bargainirg') ;

        $view = new view();
        $view->assign([
            'bar_code'      => $encrypt_code,   //邀请码
            'bargainInfo'   => $bargainInfo,    //当前砍价进度
            'product_info'  => $product_info,   //商品详情
            'bargain_list'  => $bargain_list,   //底部相关推荐 
            'is_addorder'   => $is_addorder,     //是否入库
            'activity_bargain_url' => $activity_bargain_url
        ]);
        
        return $view->fetch();


    }

    //ajax砍价
    public function goBargainAction () 
    {
        if (Request::isAjax()) {

            $uid = session('userinfo.uid');
            $username = session('userinfo.username');
            $encrypt_code  = input('post.bar_code', '', 'string');
            if (empty($uid) || empty($username)) {
                $this->checkUserLogin();
            }
            $bargain_param = self::retrunBargainCode($encrypt_code);
            if (!is_not_empty_array($bargain_param)) {
                echo json_encode(array('status' => -3, 'info' => '不明错误,请联系客服'));die;
            }

            $seting_info = Hmodel\Activity::getActivityProductsSeting($bargain_param['activity_product_id']);  //砍价活动商品设置
            $stock = Hmodel\CategoryAttr::getproductstockbyidsonattr($seting_info['product_id'],$seting_info['attr1_id'],$seting_info['attr2_id']);

            if ($stock['category_sum'] < 1) {
                echo json_encode(['status' => -1, 'info' => '已抢光!']);die;
            }

            
            $userinfo = Hmodel\User::getuser_info($uid);
            $register_time = $userinfo['create_time']; 
            $is_new_user = false;           //用户状态[default:老用户]
            if (($register_time + (60 * 60 * 8)) > time() &amp;&amp; Hmodel\Activity::checkUserIsbargainEd($uid) === false) {
                $is_new_user  = true;       //是新用户
            }
    
            $sponsor_uid   = $bargain_param['sponsor_uid'];              //发起者id
            $bargain_id    = $bargain_param['bargain_id'];               //[activity_bargainirg]表主键id
            $join_count    = $bargain_param['join_count'];               //设置砍价次数 
            $section       = $bargain_param['bargain_section'];          //砍价区间（老用户）
            $section2      = $bargain_param['bargain_section2'];         //砍价区间（新用户）
            $type          = $bargain_param['type'] == $seting_info['type'] ? $bargain_param['type'] : ''; //0：线上；  1：地推
            $activity_money= $bargain_param['activity_money'];           //活动最低价
           
            if (!is_not_empty_string($type)) {
                echo json_encode(array('status' => -3, 'info' => '不明错误,请联系客服'));die;
            }

            if ($uid == $sponsor_uid) {
                echo json_encode(array('status' => -1, 'info' => '不能给自己砍价'));die;
            }

            $state = Hmodel\Activity::checkPartBargain($bargain_id, $uid);  //是否帮伙伴砍过当前参与的进度

            if ( $state !== false) {
                echo  json_encode(array('status' => -2, 'info' => '您已帮伙伴砍掉' . $state . '元啦，不要再砍啦!'));die;
            }
            if ($type == 1 &amp;&amp; $is_new_user === false) {
                echo json_encode(array('status' => -4, 'info' => '抱歉，该活动仅限新用户参加！'));die;
            }
           
            $state = Hmodel\Activity::givePartBargain($bargain_id, $sponsor_uid, $uid, $section, $section2, $join_count, $is_new_user,
            $activity_money, $type);
            if ($state == -1) {
                 echo json_encode(array('status' => -3, 'info' => '已经最低价啦，不能再砍啦！'));die;
            }
            if ($state === false) {
                echo json_encode(array('status' => -3, 'info' => '哎呀，失败了！稍后帮我砍一次！'));die;
            } else {
                if ($is_new_user === true) {
                    echo json_encode(array('status' => 2, 'info' => '砍掉了' . $state .'元', 'deal_money' => $state));die;
                } else {
                    echo json_encode(array('status' => 1, 'info' => '成功帮伙伴砍掉' . $state .'元!', 'deal_money' => $state));die; 
                }
            }

        }
    }
   
    //返回砍价活动相关数据
    public static function retrunBargainCode( $encrypt_str = '') 
    {
        $data   = [];
        $code_str     = encrypt_hopeband($encrypt_str, 'D', 'Hp_HopeBand_Bargainirg');

        $code_arr     = explode('(&amp;)', $code_str);
  
   
        if (is_not_empty_array($code_arr) &amp;&amp; count($code_arr) == 10) {
            $data['bargain_id']             = $code_arr[0];             //砍价活动表主键id
            $data['activity_product_id']    = $code_arr[1];
            $data['sponsor_uid']            = $code_arr[2];             //砍价活动发起者uid
            $data['sponsor_invite_code']    = $code_arr[3];             //砍价活动发起者邀请码
            $data['product_id']             = $code_arr[4];             //砍价活动发起的商品id
            $data['activity_money']         = $code_arr[5];             //活动最低价格
            $data['bargain_section']        = $code_arr[6];             //老用户砍价区间
            $data['bargain_section2']       = $code_arr[7];             //新用户砍价区间
            $data['join_count']             = $code_arr[8];             //设置砍价次数
            $data['type']                   = $code_arr[9];             //设置砍价次数

        }

        return $data;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code> <span class="hljs-comment">//线上砍价活动列表</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bargainirgAction</span><span class="hljs-params">()</span> 
    </span>{
        $type = <span class="hljs-number">0</span>;
        $way = input(<span class="hljs-string">'param.way'</span>, <span class="hljs-string">''</span>,<span class="hljs-string">'string'</span>);
        <span class="hljs-keyword">if</span> (is_not_empty_string($way) &amp;&amp; $way == <span class="hljs-string">'live'</span>) {
            $type = <span class="hljs-number">1</span>;
        }
        $pageSize = <span class="hljs-number">10</span>;
        <span class="hljs-keyword">if</span> (Request::isAjax()) {
            $page = input(<span class="hljs-string">'post.page'</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'intval'</span>);
            $product_list = Hmodel\Activity::getActivityBargainProducts($type, $pageSize,  $page * $pageSize);
            <span class="hljs-keyword">if</span> (is_not_empty_array($product_list)) {
                <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">1</span>, <span class="hljs-string">'info'</span> =&gt; $product_list]);    
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">0</span>]);
            }
        }
        $product_list = Hmodel\Activity::getActivityBargainProducts($type, <span class="hljs-number">10</span>, <span class="hljs-number">0</span>);
        $view = <span class="hljs-keyword">new</span> view();
        $view-&gt;assign(<span class="hljs-string">'bargainirgList'</span>,$product_list);
        <span class="hljs-keyword">if</span> ($type == <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> $view-&gt;fetch(<span class="hljs-string">'bargainirg'</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> $view-&gt;fetch(<span class="hljs-string">'bargainirg_live'</span>);
        }
        
    }

    <span class="hljs-comment">//砍价活动\商品详情\查看贡献度\请帮忙</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bargaindetailAction</span><span class="hljs-params">()</span> 
    </span>{

        <span class="hljs-keyword">$this</span>-&gt;checkUserLogin();
        $uid = session(<span class="hljs-string">'userinfo.uid'</span>);
        <span class="hljs-comment">// $uid = 3;</span>
        $seting_id = input(<span class="hljs-string">'param.id'</span>,<span class="hljs-number">0</span>,<span class="hljs-string">'int'</span>);
        $seting_info = Hmodel\Activity::getActivityProductsSeting($seting_id);  <span class="hljs-comment">//砍价活动商品设置</span>
        $bargain_section2 = !<span class="hljs-keyword">empty</span>($seting_info[<span class="hljs-string">'bargain_section2'</span>]) ? $seting_info[<span class="hljs-string">'bargain_section2'</span>] : <span class="hljs-string">'no seting'</span>;
        <span class="hljs-keyword">if</span> (!is_not_empty_array($seting_info)) notFund(); 

        $bargain_progress = Hmodel\Activity::returnProgressData( $seting_id, $seting_info[<span class="hljs-string">'product_id'</span>], $uid, $seting_info[<span class="hljs-string">'attr1_id'</span>],$seting_info[<span class="hljs-string">'attr2_id'</span>], 
$seting_info[<span class="hljs-string">'add_money'</span>],$seting_info[<span class="hljs-string">'type'</span>]);
    
        <span class="hljs-keyword">if</span> (!is_not_empty_array($bargain_progress) || $bargain_progress[<span class="hljs-string">'user_id'</span>] != $uid) notFund();
      
        $username       = session(<span class="hljs-string">'userinfo.username'</span>);
        $user_info      = Hmodel\User::getuser_info($uid);
        $invite_code    = $user_info[<span class="hljs-string">'invite_code'</span>];
        $encrypt_code   = encrypt_hopeband($bargain_progress[<span class="hljs-string">'id'</span>] . <span class="hljs-string">'(&amp;)'</span> .$bargain_progress[<span class="hljs-string">'activity_bargain_id'</span>] . <span class="hljs-string">'(&amp;)'</span> .$uid . <span class="hljs-string">'(&amp;)'</span> . $invite_code . <span class="hljs-string">'(&amp;)'</span> 
. $seting_info[<span class="hljs-string">'product_id'</span>] . <span class="hljs-string">'(&amp;)'</span> . $seting_info[<span class="hljs-string">'activity_money'</span>] . <span class="hljs-string">'(&amp;)'</span> . $seting_info[<span class="hljs-string">'bargain_section'</span>] .  <span class="hljs-string">'(&amp;)'</span> . $seting_info[<span class="hljs-string">'bargain_section2'</span>] .<span class="hljs-string">'(&amp;)'</span> 
. $seting_info[<span class="hljs-string">'join_count'</span>] . <span class="hljs-string">'(&amp;)'</span>. $bargain_progress[<span class="hljs-string">'type'</span>], <span class="hljs-string">'E'</span>, <span class="hljs-string">'Hp_HopeBand_Bargainirg'</span>);

        <span class="hljs-comment">//是否已经下单</span>
        <span class="hljs-comment">// $is_addorder    = Hmodel\Activity::checkIsAddorder($bargain_progress['id']);</span>
        $is_addorder    = $bargain_progress[<span class="hljs-string">'is_addorder'</span>];

        <span class="hljs-comment">//帮助列表</span>
        $assistor_list = Hmodel\Activity::getAssistorList($bargain_progress[<span class="hljs-string">'id'</span>]);

        $view = <span class="hljs-keyword">new</span> view();
        $view-&gt;assign([
            <span class="hljs-string">'bar_code'</span>           =&gt; $encrypt_code,
            <span class="hljs-string">'seting_info'</span>        =&gt; $seting_info,
            <span class="hljs-string">'bargain_progress'</span>   =&gt; $bargain_progress,
            <span class="hljs-string">'assistor_list'</span>      =&gt; $assistor_list,
            <span class="hljs-string">'seting'</span>             =&gt; $seting_id,
            <span class="hljs-string">'is_addorder'</span>        =&gt; $is_addorder
        ]);
        $view-&gt;assign();
        <span class="hljs-keyword">return</span> $view-&gt;fetch();

    }

    <span class="hljs-comment">//帮忙砍价\进度\底部砍价商品列表</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bargainirgingAction</span> <span class="hljs-params">()</span>
    </span>{
        $url = $_SERVER[<span class="hljs-string">'REQUEST_URI'</span>];
        $encrypt_code = substr(substr($url,<span class="hljs-number">29</span>),<span class="hljs-number">0</span>,strpos(substr($url,<span class="hljs-number">29</span>), <span class="hljs-string">'?invite_code'</span>));

        $bargain_param = <span class="hljs-keyword">self</span>::retrunBargainCode($encrypt_code);
        $bargain_id          = $bargain_param[<span class="hljs-string">'bargain_id'</span>];
        $bargainInfo         = Hmodel\Activity::getBargainirgProgress($bargain_id);
        <span class="hljs-keyword">if</span> ( !is_not_empty_array($bargain_param) || !is_not_empty_array($bargainInfo)) {
            notFund();
        }

        $is_addorder = $bargainInfo[<span class="hljs-string">'is_addorder'</span>] == <span class="hljs-number">1</span> ? <span class="hljs-keyword">true</span> : <span class="hljs-keyword">false</span>;
  
        $uid = session(<span class="hljs-string">'userinfo.uid'</span>);
        $activity_product_id = $bargain_param[<span class="hljs-string">'activity_product_id'</span>];

         <span class="hljs-keyword">if</span> ($bargain_param[<span class="hljs-string">'sponsor_uid'</span>] == $uid) {
            <span class="hljs-keyword">$this</span>-&gt;redirect(<span class="hljs-string">'bargaindetail'</span>,[<span class="hljs-string">'id'</span> =&gt; $activity_product_id]);
        }
        $product_id          = $bargain_param[<span class="hljs-string">'product_id'</span>];
        
        $bargain_list        = Hmodel\Activity::getActivityBargainProducts($bargain_param[<span class="hljs-string">'type'</span>], <span class="hljs-number">999</span>); <span class="hljs-comment">//所有参与砍价活动的商品</span>

        <span class="hljs-keyword">foreach</span> ($bargain_list <span class="hljs-keyword">as</span> $v) {
            <span class="hljs-keyword">if</span> ( $v[<span class="hljs-string">'id'</span>] == $activity_product_id) {
                $product_info = $v;
            }
        }

        <span class="hljs-keyword">if</span> (!is_not_empty_array($product_info)) notFund();
        $type = $bargain_param[<span class="hljs-string">'type'</span>];
        $activity_bargain_url = url(<span class="hljs-string">'activity/bargainirg'</span>) ;

        $view = <span class="hljs-keyword">new</span> view();
        $view-&gt;assign([
            <span class="hljs-string">'bar_code'</span>      =&gt; $encrypt_code,   <span class="hljs-comment">//邀请码</span>
            <span class="hljs-string">'bargainInfo'</span>   =&gt; $bargainInfo,    <span class="hljs-comment">//当前砍价进度</span>
            <span class="hljs-string">'product_info'</span>  =&gt; $product_info,   <span class="hljs-comment">//商品详情</span>
            <span class="hljs-string">'bargain_list'</span>  =&gt; $bargain_list,   <span class="hljs-comment">//底部相关推荐 </span>
            <span class="hljs-string">'is_addorder'</span>   =&gt; $is_addorder,     <span class="hljs-comment">//是否入库</span>
            <span class="hljs-string">'activity_bargain_url'</span> =&gt; $activity_bargain_url
        ]);
        
        <span class="hljs-keyword">return</span> $view-&gt;fetch();


    }

    <span class="hljs-comment">//ajax砍价</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">goBargainAction</span> <span class="hljs-params">()</span> 
    </span>{
        <span class="hljs-keyword">if</span> (Request::isAjax()) {

            $uid = session(<span class="hljs-string">'userinfo.uid'</span>);
            $username = session(<span class="hljs-string">'userinfo.username'</span>);
            $encrypt_code  = input(<span class="hljs-string">'post.bar_code'</span>, <span class="hljs-string">''</span>, <span class="hljs-string">'string'</span>);
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">empty</span>($uid) || <span class="hljs-keyword">empty</span>($username)) {
                <span class="hljs-keyword">$this</span>-&gt;checkUserLogin();
            }
            $bargain_param = <span class="hljs-keyword">self</span>::retrunBargainCode($encrypt_code);
            <span class="hljs-keyword">if</span> (!is_not_empty_array($bargain_param)) {
                <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-3</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'不明错误,请联系客服'</span>));<span class="hljs-keyword">die</span>;
            }

            $seting_info = Hmodel\Activity::getActivityProductsSeting($bargain_param[<span class="hljs-string">'activity_product_id'</span>]);  <span class="hljs-comment">//砍价活动商品设置</span>
            $stock = Hmodel\CategoryAttr::getproductstockbyidsonattr($seting_info[<span class="hljs-string">'product_id'</span>],$seting_info[<span class="hljs-string">'attr1_id'</span>],$seting_info[<span class="hljs-string">'attr2_id'</span>]);

            <span class="hljs-keyword">if</span> ($stock[<span class="hljs-string">'category_sum'</span>] &lt; <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">echo</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-1</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'已抢光!'</span>]);<span class="hljs-keyword">die</span>;
            }

            
            $userinfo = Hmodel\User::getuser_info($uid);
            $register_time = $userinfo[<span class="hljs-string">'create_time'</span>]; 
            $is_new_user = <span class="hljs-keyword">false</span>;           <span class="hljs-comment">//用户状态[default:老用户]</span>
            <span class="hljs-keyword">if</span> (($register_time + (<span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">8</span>)) &gt; time() &amp;&amp; Hmodel\Activity::checkUserIsbargainEd($uid) === <span class="hljs-keyword">false</span>) {
                $is_new_user  = <span class="hljs-keyword">true</span>;       <span class="hljs-comment">//是新用户</span>
            }
    
            $sponsor_uid   = $bargain_param[<span class="hljs-string">'sponsor_uid'</span>];              <span class="hljs-comment">//发起者id</span>
            $bargain_id    = $bargain_param[<span class="hljs-string">'bargain_id'</span>];               <span class="hljs-comment">//[activity_bargainirg]表主键id</span>
            $join_count    = $bargain_param[<span class="hljs-string">'join_count'</span>];               <span class="hljs-comment">//设置砍价次数 </span>
            $section       = $bargain_param[<span class="hljs-string">'bargain_section'</span>];          <span class="hljs-comment">//砍价区间（老用户）</span>
            $section2      = $bargain_param[<span class="hljs-string">'bargain_section2'</span>];         <span class="hljs-comment">//砍价区间（新用户）</span>
            $type          = $bargain_param[<span class="hljs-string">'type'</span>] == $seting_info[<span class="hljs-string">'type'</span>] ? $bargain_param[<span class="hljs-string">'type'</span>] : <span class="hljs-string">''</span>; <span class="hljs-comment">//0：线上；  1：地推</span>
            $activity_money= $bargain_param[<span class="hljs-string">'activity_money'</span>];           <span class="hljs-comment">//活动最低价</span>
           
            <span class="hljs-keyword">if</span> (!is_not_empty_string($type)) {
                <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-3</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'不明错误,请联系客服'</span>));<span class="hljs-keyword">die</span>;
            }

            <span class="hljs-keyword">if</span> ($uid == $sponsor_uid) {
                <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-1</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'不能给自己砍价'</span>));<span class="hljs-keyword">die</span>;
            }

            $state = Hmodel\Activity::checkPartBargain($bargain_id, $uid);  <span class="hljs-comment">//是否帮伙伴砍过当前参与的进度</span>

            <span class="hljs-keyword">if</span> ( $state !== <span class="hljs-keyword">false</span>) {
                <span class="hljs-keyword">echo</span>  json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-2</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'您已帮伙伴砍掉'</span> . $state . <span class="hljs-string">'元啦，不要再砍啦!'</span>));<span class="hljs-keyword">die</span>;
            }
            <span class="hljs-keyword">if</span> ($type == <span class="hljs-number">1</span> &amp;&amp; $is_new_user === <span class="hljs-keyword">false</span>) {
                <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-4</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'抱歉，该活动仅限新用户参加！'</span>));<span class="hljs-keyword">die</span>;
            }
           
            $state = Hmodel\Activity::givePartBargain($bargain_id, $sponsor_uid, $uid, $section, $section2, $join_count, $is_new_user,
            $activity_money, $type);
            <span class="hljs-keyword">if</span> ($state == <span class="hljs-number">-1</span>) {
                 <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-3</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'已经最低价啦，不能再砍啦！'</span>));<span class="hljs-keyword">die</span>;
            }
            <span class="hljs-keyword">if</span> ($state === <span class="hljs-keyword">false</span>) {
                <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-3</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'哎呀，失败了！稍后帮我砍一次！'</span>));<span class="hljs-keyword">die</span>;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">if</span> ($is_new_user === <span class="hljs-keyword">true</span>) {
                    <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">2</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'砍掉了'</span> . $state .<span class="hljs-string">'元'</span>, <span class="hljs-string">'deal_money'</span> =&gt; $state));<span class="hljs-keyword">die</span>;
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">1</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'成功帮伙伴砍掉'</span> . $state .<span class="hljs-string">'元!'</span>, <span class="hljs-string">'deal_money'</span> =&gt; $state));<span class="hljs-keyword">die</span>; 
                }
            }

        }
    }
   
    <span class="hljs-comment">//返回砍价活动相关数据</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">retrunBargainCode</span><span class="hljs-params">( $encrypt_str = <span class="hljs-string">''</span>)</span> 
    </span>{
        $data   = [];
        $code_str     = encrypt_hopeband($encrypt_str, <span class="hljs-string">'D'</span>, <span class="hljs-string">'Hp_HopeBand_Bargainirg'</span>);

        $code_arr     = explode(<span class="hljs-string">'(&amp;)'</span>, $code_str);
  
   
        <span class="hljs-keyword">if</span> (is_not_empty_array($code_arr) &amp;&amp; count($code_arr) == <span class="hljs-number">10</span>) {
            $data[<span class="hljs-string">'bargain_id'</span>]             = $code_arr[<span class="hljs-number">0</span>];             <span class="hljs-comment">//砍价活动表主键id</span>
            $data[<span class="hljs-string">'activity_product_id'</span>]    = $code_arr[<span class="hljs-number">1</span>];
            $data[<span class="hljs-string">'sponsor_uid'</span>]            = $code_arr[<span class="hljs-number">2</span>];             <span class="hljs-comment">//砍价活动发起者uid</span>
            $data[<span class="hljs-string">'sponsor_invite_code'</span>]    = $code_arr[<span class="hljs-number">3</span>];             <span class="hljs-comment">//砍价活动发起者邀请码</span>
            $data[<span class="hljs-string">'product_id'</span>]             = $code_arr[<span class="hljs-number">4</span>];             <span class="hljs-comment">//砍价活动发起的商品id</span>
            $data[<span class="hljs-string">'activity_money'</span>]         = $code_arr[<span class="hljs-number">5</span>];             <span class="hljs-comment">//活动最低价格</span>
            $data[<span class="hljs-string">'bargain_section'</span>]        = $code_arr[<span class="hljs-number">6</span>];             <span class="hljs-comment">//老用户砍价区间</span>
            $data[<span class="hljs-string">'bargain_section2'</span>]       = $code_arr[<span class="hljs-number">7</span>];             <span class="hljs-comment">//新用户砍价区间</span>
            $data[<span class="hljs-string">'join_count'</span>]             = $code_arr[<span class="hljs-number">8</span>];             <span class="hljs-comment">//设置砍价次数</span>
            $data[<span class="hljs-string">'type'</span>]                   = $code_arr[<span class="hljs-number">9</span>];             <span class="hljs-comment">//设置砍价次数</span>

        }

        <span class="hljs-keyword">return</span> $data;
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public function checkOrder2PayAction()
    {
        $this->checkUserLogin();
        if (!Request::isAjax()) { notFund(); }
        $seting_id = input('post.seting',0,'intval');
        $user_id   = session('userinfo.uid');
        //拿付款的额度和商品id
        $BargainPayData = Hmodel\Activity::getBargainResult2Pay($seting_id, $user_id);
        $stock = Hmodel\CategoryAttr::getproductstockbyidsonattr($BargainPayData['product_id'],$BargainPayData['attr1_id'],$BargainPayData['attr2_id']);
        if ($stock['category_sum'] < 1) {
            return json_encode(['status' => -2, 'info' => '已抢光!']);die;
        }
        if ($BargainPayData['is_addorder'] == 1) {
             return json_encode(['status' => -2, 'info' => '此商品已经购买过，不能重复购买！']);die;
        }
        if (!is_not_empty_array( $BargainPayData)) {
            return json_encode(['status' => -1, 'info' => '不明错误,请联系客服!']);die;
        }

        $product_id = $BargainPayData['product_id'];

        $attr1_name = '';
        $attr2_name = '';
        if (is_not_empty_array($attr1_info = Hmodel\Activity::getAttr1NameByAttrId($BargainPayData['attr1_id'], $product_id))){
            $attr1_name = $attr1_info['attr'];
        }
        if (is_not_empty_array($attr2_info = Hmodel\Activity::getAttr2NameByAttrId($BargainPayData['attr2_id'], $product_id))){
            $attr2_name = $attr2_info['attr'];
        }
        $data = [
            'product_id'  => $product_id,
            'prodcut_num' => 1,
            'attr1'       => $attr1_name,
            'attr2'       => $attr2_name,
            'seting_id'   => $seting_id
        ];
        return json_encode(['status' => 1, 'info' => $data]);
    
    }

     //查看砍价后的预付款订单信息
    public function createActivityOrderAction ()
    {
        $this->checkUserLogin();

        $uid = session('userinfo.uid');

        $product_num = 1;
        $attr1 = input(&quot;param.attr1&quot;, &quot;&quot; , &quot;trim,string&quot;);
        $attr2 = input(&quot;param.attr2&quot;, &quot;&quot; , &quot;trim,string&quot;);
        $seting_id = intval(input('param.seting_id', 0, 'intval'));
        $product_id  = intval(input(&quot;param.product_id&quot;, &quot;&quot; , &quot;intval&quot;));

        $pay_price_money = Hmodel\Activity::returnPayMoney($product_id, $seting_id, $uid);

        $type = $pay_price_money['type'];

        if (!is_not_empty_array($pay_price_money)) notFund();
        Cookie::set('ready_finish_bargain', encrypt_hopeband($pay_price_money['id'] . '(&amp;)', 'E', 'hp_ready_bargain_pay'));
        $pay_info = $this->calculateFromProduct($product_id, $product_num, $attr1, $attr2, $uid , $pay_price_money['deal_money'], $type);
        $def_address = Hmodel\UserAddress::getDefAddress($uid);
        $view = new View();
        $view->assign('def_address',$def_address);
        $view->assign('product_carlist_bymerchantid',$pay_info['product_carlist_bymerchantid']);
        $view->assign('total_price',sprintf(&quot;%.2f&quot;,$pay_info['total_price']));

        $view->assign('total_delivery',$pay_info['total_delivery']);
        $view->assign('seting_id',$seting_id);


        

        return $view->fetch('createorder');
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkOrder2PayAction</span><span class="hljs-params">()</span>
    </span>{
        <span class="hljs-keyword">$this</span>-&gt;checkUserLogin();
        <span class="hljs-keyword">if</span> (!Request::isAjax()) { notFund(); }
        $seting_id = input(<span class="hljs-string">'post.seting'</span>,<span class="hljs-number">0</span>,<span class="hljs-string">'intval'</span>);
        $user_id   = session(<span class="hljs-string">'userinfo.uid'</span>);
        <span class="hljs-comment">//拿付款的额度和商品id</span>
        $BargainPayData = Hmodel\Activity::getBargainResult2Pay($seting_id, $user_id);
        $stock = Hmodel\CategoryAttr::getproductstockbyidsonattr($BargainPayData[<span class="hljs-string">'product_id'</span>],$BargainPayData[<span class="hljs-string">'attr1_id'</span>],$BargainPayData[<span class="hljs-string">'attr2_id'</span>]);
        <span class="hljs-keyword">if</span> ($stock[<span class="hljs-string">'category_sum'</span>] &lt; <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-2</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'已抢光!'</span>]);<span class="hljs-keyword">die</span>;
        }
        <span class="hljs-keyword">if</span> ($BargainPayData[<span class="hljs-string">'is_addorder'</span>] == <span class="hljs-number">1</span>) {
             <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-2</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'此商品已经购买过，不能重复购买！'</span>]);<span class="hljs-keyword">die</span>;
        }
        <span class="hljs-keyword">if</span> (!is_not_empty_array( $BargainPayData)) {
            <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">-1</span>, <span class="hljs-string">'info'</span> =&gt; <span class="hljs-string">'不明错误,请联系客服!'</span>]);<span class="hljs-keyword">die</span>;
        }

        $product_id = $BargainPayData[<span class="hljs-string">'product_id'</span>];

        $attr1_name = <span class="hljs-string">''</span>;
        $attr2_name = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">if</span> (is_not_empty_array($attr1_info = Hmodel\Activity::getAttr1NameByAttrId($BargainPayData[<span class="hljs-string">'attr1_id'</span>], $product_id))){
            $attr1_name = $attr1_info[<span class="hljs-string">'attr'</span>];
        }
        <span class="hljs-keyword">if</span> (is_not_empty_array($attr2_info = Hmodel\Activity::getAttr2NameByAttrId($BargainPayData[<span class="hljs-string">'attr2_id'</span>], $product_id))){
            $attr2_name = $attr2_info[<span class="hljs-string">'attr'</span>];
        }
        $data = [
            <span class="hljs-string">'product_id'</span>  =&gt; $product_id,
            <span class="hljs-string">'prodcut_num'</span> =&gt; <span class="hljs-number">1</span>,
            <span class="hljs-string">'attr1'</span>       =&gt; $attr1_name,
            <span class="hljs-string">'attr2'</span>       =&gt; $attr2_name,
            <span class="hljs-string">'seting_id'</span>   =&gt; $seting_id
        ];
        <span class="hljs-keyword">return</span> json_encode([<span class="hljs-string">'status'</span> =&gt; <span class="hljs-number">1</span>, <span class="hljs-string">'info'</span> =&gt; $data]);
    
    }

     <span class="hljs-comment">//查看砍价后的预付款订单信息</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createActivityOrderAction</span> <span class="hljs-params">()</span>
    </span>{
        <span class="hljs-keyword">$this</span>-&gt;checkUserLogin();

        $uid = session(<span class="hljs-string">'userinfo.uid'</span>);

        $product_num = <span class="hljs-number">1</span>;
        $attr1 = input(<span class="hljs-string">"param.attr1"</span>, <span class="hljs-string">""</span> , <span class="hljs-string">"trim,string"</span>);
        $attr2 = input(<span class="hljs-string">"param.attr2"</span>, <span class="hljs-string">""</span> , <span class="hljs-string">"trim,string"</span>);
        $seting_id = intval(input(<span class="hljs-string">'param.seting_id'</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'intval'</span>));
        $product_id  = intval(input(<span class="hljs-string">"param.product_id"</span>, <span class="hljs-string">""</span> , <span class="hljs-string">"intval"</span>));

        $pay_price_money = Hmodel\Activity::returnPayMoney($product_id, $seting_id, $uid);

        $type = $pay_price_money[<span class="hljs-string">'type'</span>];

        <span class="hljs-keyword">if</span> (!is_not_empty_array($pay_price_money)) notFund();
        Cookie::set(<span class="hljs-string">'ready_finish_bargain'</span>, encrypt_hopeband($pay_price_money[<span class="hljs-string">'id'</span>] . <span class="hljs-string">'(&amp;)'</span>, <span class="hljs-string">'E'</span>, <span class="hljs-string">'hp_ready_bargain_pay'</span>));
        $pay_info = <span class="hljs-keyword">$this</span>-&gt;calculateFromProduct($product_id, $product_num, $attr1, $attr2, $uid , $pay_price_money[<span class="hljs-string">'deal_money'</span>], $type);
        $def_address = Hmodel\UserAddress::getDefAddress($uid);
        $view = <span class="hljs-keyword">new</span> View();
        $view-&gt;assign(<span class="hljs-string">'def_address'</span>,$def_address);
        $view-&gt;assign(<span class="hljs-string">'product_carlist_bymerchantid'</span>,$pay_info[<span class="hljs-string">'product_carlist_bymerchantid'</span>]);
        $view-&gt;assign(<span class="hljs-string">'total_price'</span>,sprintf(<span class="hljs-string">"%.2f"</span>,$pay_info[<span class="hljs-string">'total_price'</span>]));

        $view-&gt;assign(<span class="hljs-string">'total_delivery'</span>,$pay_info[<span class="hljs-string">'total_delivery'</span>]);
        $view-&gt;assign(<span class="hljs-string">'seting_id'</span>,$seting_id);


        

        <span class="hljs-keyword">return</span> $view-&gt;fetch(<span class="hljs-string">'createorder'</span>);
    }
    </code></pre>
<p>Model层部分方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//根据主键id查询活动产品相关属性设置
    public static function getActivityProductsSeting( $id = 0) {
        $data = [];
        if (!is_positive_integer($id)) {
            return $data;
        }
        $sql = &quot;SELECT a.`id`,a.`product_id`,a.`activity_money`,a.`bargain_section`,a.`join_count`,a.`product_desc`,a.`product_name`,
                a.`attr1_id`,a.`attr2_id`,
                b.`give_score`,b.`category_img`,b.`add_money`,b.`category_sum`
                FROM `hp_activity_bargain` AS a
                LEFT JOIN `hp_category_attr` AS b
                ON a.`attr1_id` = b.`attr1_son_id` AND a.`attr2_id` = b.`attr2_son_id` AND a.`product_id` = b.`category_id`
                WHERE a.`id` = $id
                LIMIT 1&quot;;
        $res = Db::query($sql);
        if (is_not_empty_array($res)) {
            $data = $res[0];
        }
        return $data;
    }
    //通过主键id拿砍价活动表的相关信息
    public static function getBargainirgProgress($id = 0) {
        $data = [];
        $sql = &quot;SELECT `id`,`activity_bargain_id`,`product_id`,`attr1_id`,`attr2_id`,`user_id`,`bargain_count`,`deal_money`,`is_addorder` 
                FROM `hp_activity_bargainirg` 
                WHERE `id` = $id LIMIT 1&quot;;
        $res = self::query($sql);
        if (is_not_empty_array($res)) {
            $data = $res[0];
        }
        return $data;
    }
    //返回要砍
    public static function returnProgressData($a_b_id = 0, $product_id = 0, $user_id = 0, $attr1_son_id = 0, $attr2_son_id = 0, $deal_money= 0){
        $data = [];
        $sql = &quot;SELECT `id`,`activity_bargain_id`,`product_id`,`attr1_id`,`attr2_id`,`user_id`,`bargain_count`,`deal_money`,`is_addorder`
                FROM `hp_activity_bargainirg` 
                WHERE `activity_bargain_id` = $a_b_id AND `attr1_id` = $attr1_son_id AND `attr2_id` = $attr2_son_id AND `product_id` = $product_id AND `user_id` = $user_id 
                LIMIT 1&quot;;

        $res = self::query($sql);
        if (is_not_empty_array($res)) {
            $data = $res[0];
        } else {
            $data['activity_bargain_id'] = $a_b_id;
            $data['product_id']          = $product_id;
            $data['user_id']             = $user_id;
            $data['deal_money']          = $deal_money; 
            $data['attr1_id']            = $attr1_son_id; 
            $data['attr2_id']            = $attr2_son_id;   
            $data['create_time']         = time(); 
            $data['bargain_count']       = 0; 
            Db::name('activity_bargainirg')->insert($data);
            $insertId =  Db::name('activity_bargainirg')->getLastInsID();
            $data['id']                  = $insertId;
            // $data = self::getBargainirgProgress($insert_id);
        }
        return $data;
    }
    //通过 表[activity_products] 主键id 和 user_id 拿到用户购买前要付款的额度和购买商品
    public static function getBargainResult2Pay($a_b_id = 0, $user_id = 0) {
        $data  = [];
        if ( !is_positive_integer($a_b_id) || !is_positive_integer($user_id)) {
            return $data;
        }
        $sql = &quot;SELECT `id`,`deal_money`,`product_id`,`attr1_id`,`attr2_id` FROM `hp_activity_bargainirg`
                WHERE `activity_bargain_id` = $a_b_id AND `user_id` = $user_id
                LIMIT 1&quot;;
        $res = Db::query($sql);
        if (is_not_empty_array($res)) {
            $data = $res[0];
        }
        return $data;
    }

    //检测是否帮助伙伴砍价
    //$bargain_id       [activity_bargainirg]表主键id
    //$assistor_id      帮助砍价者用户id
    public static function checkPartBargain ($bargain_id = 0, $assistor_id = 0) {
        $state = false;
        if (!is_positive_integer($bargain_id) || !is_positive_integer($assistor_id)) {
            return $state;
        }
        $sql = &quot;SELECT `bargain_money` FROM `hp_activity_bargain_list`
                WHERE  `bargain_id` = $bargain_id AND  `assistor_id` = $assistor_id 
                LIMIT 1&quot;;

        $res = self::query($sql);

        if (is_not_empty_array($res)) {

            return $res[0]['bargain_money'];
        }
        return $state;

    }

    //查询帮忙砍价的伙伴列表
    public static function getAssistorList ( $bargain_id = 0){
        $data = [];
        if (is_positive_integer($bargain_id) &amp;&amp; is_positive_integer($assistor_id)) 
            return $data;
        $sql = &quot;SELECT a.`create_time`, a.`bargain_money`, b.`nickname`, b.`headimgurl` 
                FROM `hp_activity_bargain_list` AS a
                LEFT JOIN `hp_user_auths` AS b
                ON a.`assistor_id` = b.`user_id`
                WHERE a.`bargain_id` = $bargain_id
                ORDER BY a.`id` DESC&quot;;

        $data = self::query($sql);
        return $data;
    }

    //拿到上次所砍掉的价格
    public static function getBeforeMoney ( $bargain_id = 0, $limit = 1) {
        $beforemoney_sum = 0;
        $sql = &quot;SELECT SUM(`bargain_money`) AS beforemoney_sum FROM 
                (SELECT `bargain_money` FROM `hp_activity_bargain_list` 
                WHERE `bargain_id` = $bargain_id
                ORDER BY `id` DESC
                LIMIT $limit) sum&quot;;
         
        $res = Db::query($sql);
        if (is_not_empty_array($res)) {
            $beforemoney_sum = $res[0]['beforemoney_sum'];
        }
        return $beforemoney_sum;
    }
    
     /**
     * 砍价相关数据操作
     *$bargain_id    [activity_bargainirg] 表主键id
     *$sponsor_id    砍价发起者id
     *$assistor_id   帮助砍价者id
     *$min           最小值
     *$max           最大值
     *$join_count    设置要参与砍价的人数
     *return bool
     */
    public static function givePartBargain($bargain_id = 0, $sponsor_id = 0, $assistor_id = 0, $min = 0, $max = 0,$join_count = 0) {
        $state = false;
        if (is_positive_integer($assistor_id) &amp;&amp; $bargain_id > 0 &amp;&amp; is_positive_integer($sponsor_id)) {
            $bargainirg_info = Db::name('activity_bargainirg')->find($bargain_id);

            if ( !$bargainirg_info ) {
                return $state;
            }

            $fp = fopen('./bargain_lock.txt','r');
            $try = 5; 
            do {
                $lock = flock($fp,LOCK_EX);
                if(!$lock)
                    usleep(5000); 
            } while (!$lock &amp;&amp; --$try >= 0) ;
            if ($lock) {
                Db::startTrans();
                try {
                    $bargain_money = self::returnRandMoney($bargain_id, $min, $max, $join_count);
                    /*-------------*/
                    $id  = 0;
                    $sql = &quot;UPDATE `hp_activity_bargainirg` 
                            SET `deal_money` = `deal_money` - $bargain_money,`bargain_count` = `bargain_count`+ 1 
                            WHERE `id` = $bargain_id AND `user_id` = $sponsor_id AND `deal_money` > $bargain_money
                            AND `bargain_count` < $join_count&quot;;
                    $row = self::execute($sql);
                    if ( $row > 0) {
                        $insert_data = [];
                        $insert_data['bargain_id']      = $bargain_id;
                        $insert_data['assistor_id']     = $assistor_id;
                        $insert_data['bargain_money']   = $bargain_money;
                        $insert_data['create_time']     = time();
                        $id = Db::name('activity_bargain_list')->insert($insert_data);
                    }
                    /*-------------*/
                    if ($id > 0) 
                        $state = true; 
                    Db::commit();
                }catch(\Exception $e){
                    $state = false;
                    Db::rollback();
                }
　　　　　　　　flock($lock,LOCK_UN);
　　　　　　　　fclose($lock);

            } 
        }
        if ($state !== false ) {
            return $bargain_money;
        }
        return $state;
    }

    //返回要砍的价格
    public static function returnRandMoney ($bargain_id = 0, $min = 0 ,$max = 0, $join_count = 0 ){
        $randMoney       = self::randomFloat( $min, $max);                  //返回随机价格  
        $prev_Progress   = self::getBargainirgProgress($bargain_id);            
        $prev_bargain_count = $prev_Progress['bargain_count'];              //返回已经被砍价的次数  
        $remainder = $prev_bargain_count % 3; 

        $bout_count = floor($join_count / 3) * 3;  //最后一轮结束的刀数       39
        $last_num = $join_count - $bout_count;
        $avg = ($min + $max) / 2;
        $before_sum  = self::getBeforeMoney($bargain_id, $remainder);

        if ($prev_bargain_count >= $bout_count) {
            if ($last_num == 1){
                return $avg;
            } elseif ($last_num == 2) {
                $end = $join_count - $prev_Progress['bargain_count'] ;
                if ($end == 2) {
                    return $randMoney;
                } elseif($end == 1) {
                    return $avg * 2 - $before_sum;
                }
            }  
        }
        // $remainder_num   = $join_count % 3;         //总回合数的余数
        if ($remainder > 0) {
            if ( $remainder == 1) { 
                $point      = $max * 0.8;    //最大额度的80%
                $bout_sum   = 3 * $avg;
                if ($before_sum >= $point) {
                    $randMoney = self::randomFloat($min, ($bout_sum - $before_sum) / 2);
                } else {
                    $randMoney = self::randomFloat(($bout_sum - $before_sum) / 2 , $point);
                }
            }
            if ($remainder == 2) {
                $round_sum_money = 3 * $avg;            
                $randMoney       = $round_sum_money - $before_sum;
            }
        } 
        return $randMoney;
                
    }
    //拿随机价格
    public static function randomFloat($min = 0, $max = 1) {
         return round($min + mt_rand() / mt_getrandmax() * ($max - $min),2);
    }



   //拿砍价活动下所有商品
    public static function getActivityBargainProducts ( $limit = 0, $offset = 0) {
        $data = [];
        $sql = &quot;SELECT a.`id`,a.`product_id`,a.`activity_money`,a.`bargain_section`,a.`join_count`,a.`product_desc`,a.`product_name`,
                a.`attr1_id`,a.`attr2_id`,
                b.`give_score`,b.`category_img`,b.`add_money`,b.`category_sum`
                FROM `hp_activity_bargain` AS a
                LEFT JOIN `hp_category_attr` AS b
                ON a.`attr1_id` = b.`attr1_son_id` AND a.`attr2_id` = b.`attr2_son_id` AND a.`product_id` = b.`category_id`
                WHERE 1 = 1
                ORDER BY a.`id` DESC
                LIMIT $limit OFFSET $offset&quot;;
        $data = self::query($sql);        
        return $data;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>//根据主键id查询活动产品相关属性设置
    public static function getActivityProductsSeting( $id = 0) {
        $data = [];
        if (!is_positive_integer($id)) {
            return $data;
        }
        $sql = "SELECT a.`id`,a.`product_id`,a.`activity_money`,a.`bargain_section`,a.`join_count`,a.`product_desc`,a.`product_name`,
                a.`attr1_id`,a.`attr2_id`,
                b.`give_score`,b.`category_img`,b.`add_money`,b.`category_sum`
                FROM `hp_activity_bargain` AS a
                LEFT JOIN `hp_category_attr` AS b
                ON a.`attr1_id` = b.`attr1_son_id` AND a.`attr2_id` = b.`attr2_son_id` AND a.`product_id` = b.`category_id`
                WHERE a.`id` = $id
                LIMIT 1";
        $res = Db::query($sql);
        if (is_not_empty_array($res)) {
            $data = $res[0];
        }
        return $data;
    }
    //通过主键id拿砍价活动表的相关信息
    public static function getBargainirgProgress($id = 0) {
        $data = [];
        $sql = "SELECT `id`,`activity_bargain_id`,`product_id`,`attr1_id`,`attr2_id`,`user_id`,`bargain_count`,`deal_money`,`is_addorder` 
                FROM `hp_activity_bargainirg` 
                WHERE `id` = $id LIMIT 1";
        $res = self::query($sql);
        if (is_not_empty_array($res)) {
            $data = $res[0];
        }
        return $data;
    }
    //返回要砍
    public static function returnProgressData($a_b_id = 0, $product_id = 0, $user_id = 0, $attr1_son_id = 0, $attr2_son_id = 0, $deal_money= 0){
        $data = [];
        $sql = "SELECT `id`,`activity_bargain_id`,`product_id`,`attr1_id`,`attr2_id`,`user_id`,`bargain_count`,`deal_money`,`is_addorder`
                FROM `hp_activity_bargainirg` 
                WHERE `activity_bargain_id` = $a_b_id AND `attr1_id` = $attr1_son_id AND `attr2_id` = $attr2_son_id AND `product_id` = $product_id AND `user_id` = $user_id 
                LIMIT 1";

        $res = self::query($sql);
        if (is_not_empty_array($res)) {
            $data = $res[0];
        } else {
            $data['activity_bargain_id'] = $a_b_id;
            $data['product_id']          = $product_id;
            $data['user_id']             = $user_id;
            $data['deal_money']          = $deal_money; 
            $data['attr1_id']            = $attr1_son_id; 
            $data['attr2_id']            = $attr2_son_id;   
            $data['create_time']         = time(); 
            $data['bargain_count']       = 0; 
            Db::name('activity_bargainirg')-&gt;insert($data);
            $insertId =  Db::name('activity_bargainirg')-&gt;getLastInsID();
            $data['id']                  = $insertId;
            // $data = self::getBargainirgProgress($insert_id);
        }
        return $data;
    }
    //通过 表[activity_products] 主键id 和 user_id 拿到用户购买前要付款的额度和购买商品
    public static function getBargainResult2Pay($a_b_id = 0, $user_id = 0) {
        $data  = [];
        if ( !is_positive_integer($a_b_id) || !is_positive_integer($user_id)) {
            return $data;
        }
        $sql = "SELECT `id`,`deal_money`,`product_id`,`attr1_id`,`attr2_id` FROM `hp_activity_bargainirg`
                WHERE `activity_bargain_id` = $a_b_id AND `user_id` = $user_id
                LIMIT 1";
        $res = Db::query($sql);
        if (is_not_empty_array($res)) {
            $data = $res[0];
        }
        return $data;
    }

    //检测是否帮助伙伴砍价
    //$bargain_id       [activity_bargainirg]表主键id
    //$assistor_id      帮助砍价者用户id
    public static function checkPartBargain ($bargain_id = 0, $assistor_id = 0) {
        $state = false;
        if (!is_positive_integer($bargain_id) || !is_positive_integer($assistor_id)) {
            return $state;
        }
        $sql = "SELECT `bargain_money` FROM `hp_activity_bargain_list`
                WHERE  `bargain_id` = $bargain_id AND  `assistor_id` = $assistor_id 
                LIMIT 1";

        $res = self::query($sql);

        if (is_not_empty_array($res)) {

            return $res[0]['bargain_money'];
        }
        return $state;

    }

    //查询帮忙砍价的伙伴列表
    public static function getAssistorList ( $bargain_id = 0){
        $data = [];
        if (is_positive_integer($bargain_id) &amp;&amp; is_positive_integer($assistor_id)) 
            return $data;
        $sql = "SELECT a.`create_time`, a.`bargain_money`, b.`nickname`, b.`headimgurl` 
                FROM `hp_activity_bargain_list` AS a
                LEFT JOIN `hp_user_auths` AS b
                ON a.`assistor_id` = b.`user_id`
                WHERE a.`bargain_id` = $bargain_id
                ORDER BY a.`id` DESC";

        $data = self::query($sql);
        return $data;
    }

    //拿到上次所砍掉的价格
    public static function getBeforeMoney ( $bargain_id = 0, $limit = 1) {
        $beforemoney_sum = 0;
        $sql = "SELECT SUM(`bargain_money`) AS beforemoney_sum FROM 
                (SELECT `bargain_money` FROM `hp_activity_bargain_list` 
                WHERE `bargain_id` = $bargain_id
                ORDER BY `id` DESC
                LIMIT $limit) sum";
         
        $res = Db::query($sql);
        if (is_not_empty_array($res)) {
            $beforemoney_sum = $res[0]['beforemoney_sum'];
        }
        return $beforemoney_sum;
    }
    
     /**
     * 砍价相关数据操作
     *$bargain_id    [activity_bargainirg] 表主键id
     *$sponsor_id    砍价发起者id
     *$assistor_id   帮助砍价者id
     *$min           最小值
     *$max           最大值
     *$join_count    设置要参与砍价的人数
     *return bool
     */
    public static function givePartBargain($bargain_id = 0, $sponsor_id = 0, $assistor_id = 0, $min = 0, $max = 0,$join_count = 0) {
        $state = false;
        if (is_positive_integer($assistor_id) &amp;&amp; $bargain_id &gt; 0 &amp;&amp; is_positive_integer($sponsor_id)) {
            $bargainirg_info = Db::name('activity_bargainirg')-&gt;find($bargain_id);

            if ( !$bargainirg_info ) {
                return $state;
            }

            $fp = fopen('./bargain_lock.txt','r');
            $try = 5; 
            do {
                $lock = flock($fp,LOCK_EX);
                if(!$lock)
                    usleep(5000); 
            } while (!$lock &amp;&amp; --$try &gt;= 0) ;
            if ($lock) {
                Db::startTrans();
                try {
                    $bargain_money = self::returnRandMoney($bargain_id, $min, $max, $join_count);
                    /*-------------*/
                    $id  = 0;
                    $sql = "UPDATE `hp_activity_bargainirg` 
                            SET `deal_money` = `deal_money` - $bargain_money,`bargain_count` = `bargain_count`+ 1 
                            WHERE `id` = $bargain_id AND `user_id` = $sponsor_id AND `deal_money` &gt; $bargain_money
                            AND `bargain_count` &lt; $join_count";
                    $row = self::execute($sql);
                    if ( $row &gt; 0) {
                        $insert_data = [];
                        $insert_data['bargain_id']      = $bargain_id;
                        $insert_data['assistor_id']     = $assistor_id;
                        $insert_data['bargain_money']   = $bargain_money;
                        $insert_data['create_time']     = time();
                        $id = Db::name('activity_bargain_list')-&gt;insert($insert_data);
                    }
                    /*-------------*/
                    if ($id &gt; 0) 
                        $state = true; 
                    Db::commit();
                }catch(\Exception $e){
                    $state = false;
                    Db::rollback();
                }
　　　　　　　　flock($lock,LOCK_UN);
　　　　　　　　fclose($lock);

            } 
        }
        if ($state !== false ) {
            return $bargain_money;
        }
        return $state;
    }

    //返回要砍的价格
    public static function returnRandMoney ($bargain_id = 0, $min = 0 ,$max = 0, $join_count = 0 ){
        $randMoney       = self::randomFloat( $min, $max);                  //返回随机价格  
        $prev_Progress   = self::getBargainirgProgress($bargain_id);            
        $prev_bargain_count = $prev_Progress['bargain_count'];              //返回已经被砍价的次数  
        $remainder = $prev_bargain_count % 3; 

        $bout_count = floor($join_count / 3) * 3;  //最后一轮结束的刀数       39
        $last_num = $join_count - $bout_count;
        $avg = ($min + $max) / 2;
        $before_sum  = self::getBeforeMoney($bargain_id, $remainder);

        if ($prev_bargain_count &gt;= $bout_count) {
            if ($last_num == 1){
                return $avg;
            } elseif ($last_num == 2) {
                $end = $join_count - $prev_Progress['bargain_count'] ;
                if ($end == 2) {
                    return $randMoney;
                } elseif($end == 1) {
                    return $avg * 2 - $before_sum;
                }
            }  
        }
        // $remainder_num   = $join_count % 3;         //总回合数的余数
        if ($remainder &gt; 0) {
            if ( $remainder == 1) { 
                $point      = $max * 0.8;    //最大额度的80%
                $bout_sum   = 3 * $avg;
                if ($before_sum &gt;= $point) {
                    $randMoney = self::randomFloat($min, ($bout_sum - $before_sum) / 2);
                } else {
                    $randMoney = self::randomFloat(($bout_sum - $before_sum) / 2 , $point);
                }
            }
            if ($remainder == 2) {
                $round_sum_money = 3 * $avg;            
                $randMoney       = $round_sum_money - $before_sum;
            }
        } 
        return $randMoney;
                
    }
    //拿随机价格
    public static function randomFloat($min = 0, $max = 1) {
         return round($min + mt_rand() / mt_getrandmax() * ($max - $min),2);
    }



   //拿砍价活动下所有商品
    public static function getActivityBargainProducts ( $limit = 0, $offset = 0) {
        $data = [];
        $sql = "SELECT a.`id`,a.`product_id`,a.`activity_money`,a.`bargain_section`,a.`join_count`,a.`product_desc`,a.`product_name`,
                a.`attr1_id`,a.`attr2_id`,
                b.`give_score`,b.`category_img`,b.`add_money`,b.`category_sum`
                FROM `hp_activity_bargain` AS a
                LEFT JOIN `hp_category_attr` AS b
                ON a.`attr1_id` = b.`attr1_son_id` AND a.`attr2_id` = b.`attr2_son_id` AND a.`product_id` = b.`category_id`
                WHERE 1 = 1
                ORDER BY a.`id` DESC
                LIMIT $limit OFFSET $offset";
        $data = self::query($sql);        
        return $data;
    }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PHP基于Thinkphp5的砍价活动相关设计

## 原文链接
[https://segmentfault.com/a/1190000012987076](https://segmentfault.com/a/1190000012987076)

