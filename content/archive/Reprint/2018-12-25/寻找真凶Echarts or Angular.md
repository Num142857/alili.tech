---
title: '寻找真凶Echarts or Angular' 
date: 2018-12-25 2:30:11
hidden: true
slug: 9oqkxji3c8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">寻找真凶Echarts or Angular</h1>
<p>这是一篇故事，就如同技术，我们所追求的不是一个结局，而是那些深受启发与共鸣的过程，那是我们成长的经验与生产力的积淀！</p>
<h3 id="articleHeader1">故事开始于“疯了”的ionic3应用</h3>
<p>页面打开，什么也没做5s里angular的代码似乎一直在跑！<br><span class="img-wrap"><img data-src="/img/bVYJkn?w=1587&amp;h=102" src="https://static.alili.tech/img/bVYJkn?w=1587&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>打开chrome性能调试工具，recorded 5秒，密密麻麻的调用栈，惨不忍睹！<br><span class="img-wrap"><img data-src="/img/bVYJjr?w=1533&amp;h=689" src="https://static.alili.tech/img/bVYJjr?w=1533&amp;h=689" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>Qustion1：难道真凶是angular脏检查，发生了循环脏检查？？要弄清这个问题前，我们先来介绍angular脏检查这个大人物。</em></strong></p>
<h3 id="articleHeader2"><strong>Rope1：angular2及以上版本脏检查方式</strong></h3>
<p>新一代的angular一改angularjs（ng1）中受人唾弃的脏检查策略。</p>
<h4>数据流的改变</h4>
<p><strong>angularjs的策略：</strong>：是again and again直到稳定。也就是说在异步事件触发脏检查后，脏检查发生过程中某一个scope值改变后，会再次触发一次脏检查直到scope上数据稳定不变。这样一个过程很难找到一次脏检查是哪一次、哪一个对象发生改变导致的dom更新。    <br><strong>angular的策略：</strong>：从组件树顶至下，各组件依次做自己的脏检查。如下图，左边是model右边是dom树也是组件树，每一次model数据的改变，触发一次脏检查，每次检查从跟节点开始单向向下，在这次检查时间片段中不会允许对model做修改，model数据处于稳定状态。<br><span class="img-wrap"><img data-src="/img/bVCLYD?w=554&amp;h=356" src="https://static.alili.tech/img/bVCLYD?w=554&amp;h=356" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>谁告诉angular做脏检查的改变</h4>
<p><strong>angularjs的方式：</strong> 注入ng事件来通知脏检查，例如，你不能在js原生的setTimeout里改变model值，必须注入ng事件$setTimeout。<br><strong>angularjs的方式：</strong> zone.js （它也是个big man，想了解它可以看我的一篇NgZone.js文章<a href="https://segmentfault.com/a/1190000006820819">https://segmentfault.com/a/11...</a>）。什么都不用做，原生随意写，自然有家伙帮你通知angular去做脏检查。     <br><strong><em>answer1：从以上线索可以断定，不是angular发生了循环脏检查</em></strong>     </p>
<p><strong><em>Qustion2：是不是从组件树顶向下逐一组件进行脏检查，会不会是组件树太庞大log了太多checked，执行了太多次单个组件脏检查？</em></strong></p>
<h3 id="articleHeader3"><strong>Rope2： angular脏检查策略</strong></h3>
<p><span class="img-wrap"><img data-src="/img/bVYQWi?w=886&amp;h=423" src="https://static.alili.tech/img/bVYQWi?w=886&amp;h=423" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>先来看看现场，上面的图中圈出了一段代码changeDetection: ChangeDetectionStrategy.OnPush,它是做什么的呢？它可以改变脏检查的策略。上面提到一颗组件树中某一个节点某个event触发了脏检查，整棵组件树每一个节点都会跟着做脏检查对吧？对的，默认的策略是这样的。但angular可以更聪明点，使用OnPush策略。这个策略会让该个组件在input对象引用指针没发生变化时跳过该节点及该节点子节点脏检查（注意：是对象引用指针的变化）。<br>example 1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'echart',
  template: `<div class=&quot;charts&quot; #root></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  @Input('option') option: any;
  constructor() {
  }

  ngOnInit(): void {
    window.addEventListener('resize', this.resize, true);
  }

  click():void{
     this.option= {
     title:'hi'
     }
  }   

  resize() {
    this.option.title = 'Hi'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">'echart'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div class="charts" #root&gt;&lt;/div&gt;`</span>,
  <span class="hljs-attr">changeDetection</span>: ChangeDetectionStrategy.OnPush
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChartComponent</span> </span>{
  @Input(<span class="hljs-string">'option'</span>) option: any;
  <span class="hljs-keyword">constructor</span>() {
  }

  ngOnInit(): <span class="hljs-keyword">void</span> {
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, <span class="hljs-keyword">this</span>.resize, <span class="hljs-literal">true</span>);
  }

  click():<span class="hljs-keyword">void</span>{
     <span class="hljs-keyword">this</span>.option= {
     <span class="hljs-attr">title</span>:<span class="hljs-string">'hi'</span>
     }
  }   

  resize() {
    <span class="hljs-keyword">this</span>.option.title = <span class="hljs-string">'Hi'</span>
  }
}</code></pre>
<p>这个例子中，当页面窗口发生变化是resize中修改title，，dom不会有任何更新。如下图：   </p>
<p><span class="img-wrap"><img data-src="/img/bVYQZP?w=825&amp;h=591" src="https://static.alili.tech/img/bVYQZP?w=825&amp;h=591" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>而当click方法触发时，该组件会进行脏检查并更新dom。  </p>
<p>如果使用了OnPush策略，又想让resize中的修改能能更新dom怎么办？代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(private ref: ChangeDetectorRef) {}
  resize() {
    this.option.title = 'Hi'
    this.ref.markForCheck();
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">constructor</span>(private ref: ChangeDetectorRef) {}
  resize() {
    <span class="hljs-keyword">this</span>.option.title = <span class="hljs-string">'Hi'</span>
    <span class="hljs-keyword">this</span>.ref.markForCheck();
  }</code></pre>
<p>依然是从上到下，angular会找到包含该组件的路径的所有component进行逐一脏检查（即使顶层组件设置了onPush策略）如下图：    <br><span class="img-wrap"><img data-src="/img/bVYQUQ?w=925&amp;h=637" src="https://static.alili.tech/img/bVYQUQ?w=925&amp;h=637" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong><em>answer2：很显然组件树庞大不会引起脏检查多，因为我们已经加了onPush策略,input也未改变，该组件及该组件向下的组件都不应该发生脏检查</em></strong>   <br>虽然加了onPush策略但页面上依然有很多不该运行的代码一直在执行，下图为页面稳定静止状态下记录5s内的浏览器执行情况，左图为未加onPush策略的记录，右图为已加onPush策略的记录，可以看见已加onPush策略的依然有script,render,Painting在执行。     </p>
<p><span class="img-wrap"><img data-src="/img/bVYQ6M?w=377&amp;h=137" src="https://static.alili.tech/img/bVYQ6M?w=377&amp;h=137" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVYRiZ?w=418&amp;h=178" src="https://static.alili.tech/img/bVYRiZ?w=418&amp;h=178" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们再来看一下调用栈，如下图：   </p>
<p><span class="img-wrap"><img data-src="/img/bVYRmd?w=654&amp;h=595" src="https://static.alili.tech/img/bVYRmd?w=654&amp;h=595" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>从图中我们发现了一个调用栈NgZone的代码执行过，还记得Rope1里提到NgZone吗？发起脏检查的通知者，它代理了原生事件，任何一个原生异步事件的触发都会导致NgZone的运行。那么一定是有原生事件在一直Loop执行！     </p>
<p>【注：细心的人可能还发现图里有一些同学会发现有angular.core的代码在执行，不是在answer2中已经说了不会脏检查了吗？确实不会在做脏检查，rope2中也说明过脏检查策略的原理，别忘了再脏检查前还会check组件input引用来决定是否该组件做脏检查呢】     </p>
<p><strong><em>Qustion3：谁在调戏NgZone？</em></strong>    <br>我们再继续看下性能分析里的调用栈，只要该函数进入过"犯罪现场"我们都能找到它的足迹。Look this！我们找到了一个animation.js执行的step函数。     </p>
<p><span class="img-wrap"><img data-src="/img/bVYRtb?w=391&amp;h=509" src="https://static.alili.tech/img/bVYRtb?w=391&amp;h=509" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>look this！果然有一个requestAnimationFrame定时器（）原生事件一直在执行，且从未销毁！   <br><span class="img-wrap"><img data-src="/img/bVYRtt?w=724&amp;h=299" src="https://static.alili.tech/img/bVYRtt?w=724&amp;h=299" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong><em>answer3：原来流氓是echarts的animation.js或者说是echarts核心组件zrender在动画结束后没调用animation中的stop方法，总之真凶是echarts！（如果你正在使用echarts，可以打开调试工具，可以看到那段代码一直在loop执行） </em></strong>  </p>
<p>凶手找到了，受害者还需要安抚解决，如何解决？弃用echarts？你要知道有一种流氓叫让你讨厌又让你干不掉，不得不承认echarts的绘制效率在移动端还是不错的，还有地图，用其它chart plugin谁来给你画某某市地图...    <br>此时不得不再捧一把Angular，虽然我们管不了echarts，但NgZone是一个很开放的家伙。给我们很多自由操作的空间，就像下面的sample，使用runOutsideAngular将包裹的函数内部执行的代码都跳过zone.js的包装。那个echarts的requestAnimationFrame再也不会骚扰咱们的NgZone了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class EChartsComponent implements OnInit, OnDestroy {
  @Input() chartid: string;
  @Input('option') option: any;
  private chart: any;

  @ViewChild('root')
  private root;
  constructor(private ngZone: NgZone) {
  }
  resizeListener = () => this.resize();

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.chart = echarts.init(this.root.nativeElement);
      this.chart.setOption(this.option, true);
      window.addEventListener('resize', this.resizeListener, true);
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EChartsComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span>, <span class="hljs-title">OnDestroy</span> </span>{
  @Input() chartid: string;
  @Input(<span class="hljs-string">'option'</span>) option: any;
  private chart: any;

  @ViewChild(<span class="hljs-string">'root'</span>)
  private root;
  <span class="hljs-keyword">constructor</span>(private ngZone: NgZone) {
  }
  resizeListener = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.resize();

  ngOnInit(): <span class="hljs-keyword">void</span> {
    <span class="hljs-keyword">this</span>.ngZone.runOutsideAngular(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.chart = echarts.init(<span class="hljs-keyword">this</span>.root.nativeElement);
      <span class="hljs-keyword">this</span>.chart.setOption(<span class="hljs-keyword">this</span>.option, <span class="hljs-literal">true</span>);
      <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, <span class="hljs-keyword">this</span>.resizeListener, <span class="hljs-literal">true</span>);
    })
  }
}</code></pre>
<p>优化后5s内perfermance如图：    </p>
<p><span class="img-wrap"><img data-src="/img/bVYRNM?w=407&amp;h=161" src="https://static.alili.tech/img/bVYRNM?w=407&amp;h=161" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">故事的结局</h3>
<p>虽然优化的结果不是最完美的，从图上可以看到页面稳定静止状态下还是有script（echarts的bad code）在执行。如何去解决echarts的loop requestAnimationFrame问题，后续提issue留给echarts团队去解决吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
寻找真凶Echarts or Angular

## 原文链接
[https://segmentfault.com/a/1190000012084251](https://segmentfault.com/a/1190000012084251)

