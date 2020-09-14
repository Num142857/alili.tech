---
title: 'WebVR开发教程——交互事件（三）Cardboard与注视' 
date: 2018-12-27 2:30:12
hidden: true
slug: hm3yqkepb3
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000011814846?w=1240&amp;h=587" src="https://static.alili.tech/img/remote/1460000011814846?w=1240&amp;h=587" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Cardboard可以说是手机VR头显的元老了，狭义上指的是Google推出的一个带有双凸透镜的盒子，广义上则表示智能手机+盒子的VR体验平台。</p>
<h3 id="articleHeader0">Cardboard与gaze注视</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011814847?w=209&amp;h=241" src="https://static.alili.tech/img/remote/1460000011814847?w=209&amp;h=241" alt="cardboard" title="cardboard" style="cursor: pointer; display: inline;"></span></p>
<p>它的交互方式较为简单，利用了手机的陀螺仪，采用gaze注视行为来触发场景里的事件，比如用户在虚拟商店中注视一款商品时，弹出这个商品的价格信息。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011814848?w=800&amp;h=600" src="https://static.alili.tech/img/remote/1460000011814848?w=800&amp;h=600" alt="gaze交互" title="gaze交互" style="cursor: pointer;"></span></p>
<p>注视事件是WebVR最基本的交互方式，用户通过头部运动改变视线朝向，当用户视线正对着物体时，触发物体绑定的事件，具体分为三个基本事件，分别是<code>gazeEnter</code>,<code>gazeTrigger</code>,<code>gazeLeave</code>。<br>我们可以设置一个位于相机中心的准心来描述这三个基本事件（准确的说，在VR模式下是两个，分别位于左右相机的中心）</p>
<ul>
<li>gazeEnter：当准心进入物体时，即用户注视了物体，触发一次</li>
<li>gazeLeave：当准心离开物体时，即用户停止注视该物体时，触发一次</li>
<li>gazeTrigger：当准心处于物体时触发，不同于gazeEnter，gazeTrigger会在每一帧刷触发，直到准心离开物体</li>
</ul>
<h3 id="articleHeader1">注视事件原理</h3>
<p>注视事件触发条件其实就是物体被用户视线“击中”。在每帧动画渲染中，从准心处沿z轴负方向发出射线，如果射线与物体相交，即物体被射线击中，说明前方的物体被用户注视，这里使用Three提供的raycaster对象,对场景里的3d物体进行射线拾取。</p>
<p>下面是使用<code>THREE.Raycaster</code>拾取物体的简单例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建射线发射器实例raycaster
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(origin,camera); // 设置射线源点
raycaster.intersectObjects(targetList); // 检测targetList的object物体是否与射线相交
if (intersects.length > 0) {
    // 获取从源点触发，与射线相交的首个物体
    const target = intersects[0].object;
    // TODO
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-comment">// 创建射线发射器实例raycaster</span>
<span class="hljs-keyword">const</span> raycaster = <span class="hljs-keyword">new</span> THREE.Raycaster();
raycaster.setFromCamera(origin,camera); <span class="hljs-comment">// 设置射线源点</span>
raycaster.intersectObjects(targetList); <span class="hljs-comment">// 检测targetList的object物体是否与射线相交</span>
<span class="hljs-keyword">if</span> (intersects.length &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// 获取从源点触发，与射线相交的首个物体</span>
    <span class="hljs-keyword">const</span> <span class="hljs-keyword">target</span> = intersects[<span class="hljs-number">0</span>].object;
    <span class="hljs-comment">// TODO</span>
}</code></pre>
<p>主要分为三步：</p>
<ol>
<li>
<code> new THREE.Raycaster()</code>创建一个射线发射器；</li>
<li>调用<code>.setFromCamera(origin,camera)</code>设置射线发射源位置，第一个参数origin传入NDC标准化设备坐标，即归一化的屏幕坐标，第二个参数传入相机，此时射线将在屏幕的origin处，沿垂直于相机的近切面的方向进行投射；</li>
<li>调用<code>.intersectObjects(targetList)</code>检测targetList的物体是否相交<br><code>Raycaster</code>借鉴了<a href="https://en.wikipedia.org/wiki/Ray_casting" rel="nofollow noreferrer" target="_blank">光线投射法</a>进行物体拾取，更多用法可参考<a href="https://threejs.org/docs/#api/core/Raycaster" rel="nofollow noreferrer" target="_blank">three.js官方文档</a>
</li>
</ol>
<h3 id="articleHeader2">gazeEnter, gazeLeave, gazeTrigger实现</h3>
<p>根据上文对gaze基本事件的描述，现在开始创建注视监听器<code>Gazer</code>类，提供事件绑定<code>on</code>、解绑<code>off</code>、更新<code>update</code>的公用方法，物体可注册<code>gazeEnter</code>,<code>gazeLeave</code>,<code>gazeTrigger</code>事件回调，以下是完整代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注视事件监听器
class Gazer {
    constructor() {
        // 初始化射线发射源
        this.raycaster = new THREE.Raycaster();
        this._center = new THREE.Vector2();
        this.rayList = {},this.targetList = [];
        this._lastTarget = null;
    }
    /** 物体绑定gaze事件的公用方法
     * @param {THREE.Object3D} target 监听的3d网格
     * @param {String} eventType 事件类型 
     * @param {Function} callback 事件回调
     **/
    on(target, eventType, callback) {
        const noop = () => {};
        // target首次绑定事件，则创建监听对象，加入raylist监听列表，并将三个基本事件的回调初始为空方法
        if (!this.rayList[target.id]) this.rayList[target.id] = { target, gazeEnter: noop, gazeTrigger: noop, gazeLeave: noop };
        // 根据传入的 eventType与callback更新事件回调
        this.rayList[target.id][eventType] = callback;
        this.targetList = Object.keys(this.rayList).map(key => this.rayList[key].target);
    }
    off(target) {
        delete this.rayList[target.id];
        this.targetList = Object.keys(this.rayList).map(key => this.rayList[key].target);
    }
    update(camera) {
        if (this.targetList.length <= 0) return;
        //更新射线位置
        this.raycaster.setFromCamera(this._center,camera);
        const intersects = this.raycaster.intersectObjects(this.targetList);
        if (intersects.length > 0) { // 当前帧射线击中物体
            const currentTarget = intersects[0].object;
            if (this._lastTarget) { // 上一帧射线击中物体
                if (this._lastTarget.id !== currentTarget.id) { // 上一帧射线击中物体与当前帧不同
                    this.rayList[this._lastTarget.id].gazeLeave(); 
                    this.rayList[currentTarget.id].gazeEnter();
                }
            } else { // 上一帧射线未击中物体
                this.rayList[currentTarget.id].gazeEnter(); // 触发当前帧物体的gazeEnter事件
            }
            this.rayList[currentTarget.id].gazeTrigger(); // 当前帧射线击中物体，触发物体的gazeTrigger事件
            this._lastTarget = currentTarget;
        } else { // 当前帧我击中物体
            if ( this._lastTarget ) this.rayList[this._lastTarget.id].gazeLeave(); // 触发上一帧物体gazeLeave
            this._lastTarget = null;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 注视事件监听器</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Gazer</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-comment">// 初始化射线发射源</span>
        <span class="hljs-keyword">this</span>.raycaster = new THREE.Raycaster();
        <span class="hljs-keyword">this</span>._center = new THREE.Vector2();
        <span class="hljs-keyword">this</span>.rayList = {},<span class="hljs-keyword">this</span>.targetList = [];
        <span class="hljs-keyword">this</span>._lastTarget = <span class="hljs-literal">null</span>;
    }
    <span class="hljs-comment">/** 物体绑定gaze事件的公用方法
     * <span class="hljs-doctag">@param</span> {THREE.Object3D} target 监听的3d网格
     * <span class="hljs-doctag">@param</span> {String} eventType 事件类型 
     * <span class="hljs-doctag">@param</span> {Function} callback 事件回调
     **/</span>
    on(target, eventType, callback) {
        const noop = () =&gt; {};
        <span class="hljs-comment">// target首次绑定事件，则创建监听对象，加入raylist监听列表，并将三个基本事件的回调初始为空方法</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.rayList[target.id]) <span class="hljs-keyword">this</span>.rayList[target.id] = { target, gazeEnter: noop, gazeTrigger: noop, gazeLeave: noop };
        <span class="hljs-comment">// 根据传入的 eventType与callback更新事件回调</span>
        <span class="hljs-keyword">this</span>.rayList[target.id][eventType] = callback;
        <span class="hljs-keyword">this</span>.targetList = Object.keys(<span class="hljs-keyword">this</span>.rayList).map(key =&gt; <span class="hljs-keyword">this</span>.rayList[key].target);
    }
    off(target) {
        delete <span class="hljs-keyword">this</span>.rayList[target.id];
        <span class="hljs-keyword">this</span>.targetList = Object.keys(<span class="hljs-keyword">this</span>.rayList).map(key =&gt; <span class="hljs-keyword">this</span>.rayList[key].target);
    }
    update(camera) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.targetList.length &lt;= <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;
        <span class="hljs-comment">//更新射线位置</span>
        <span class="hljs-keyword">this</span>.raycaster.setFromCamera(<span class="hljs-keyword">this</span>._center,camera);
        const intersects = <span class="hljs-keyword">this</span>.raycaster.intersectObjects(<span class="hljs-keyword">this</span>.targetList);
        <span class="hljs-keyword">if</span> (intersects.length &gt; <span class="hljs-number">0</span>) { <span class="hljs-comment">// 当前帧射线击中物体</span>
            const currentTarget = intersects[<span class="hljs-number">0</span>].<span class="hljs-keyword">object</span>;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._lastTarget) { <span class="hljs-comment">// 上一帧射线击中物体</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._lastTarget.id !== currentTarget.id) { <span class="hljs-comment">// 上一帧射线击中物体与当前帧不同</span>
                    <span class="hljs-keyword">this</span>.rayList[<span class="hljs-keyword">this</span>._lastTarget.id].gazeLeave(); 
                    <span class="hljs-keyword">this</span>.rayList[currentTarget.id].gazeEnter();
                }
            } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// 上一帧射线未击中物体</span>
                <span class="hljs-keyword">this</span>.rayList[currentTarget.id].gazeEnter(); <span class="hljs-comment">// 触发当前帧物体的gazeEnter事件</span>
            }
            <span class="hljs-keyword">this</span>.rayList[currentTarget.id].gazeTrigger(); <span class="hljs-comment">// 当前帧射线击中物体，触发物体的gazeTrigger事件</span>
            <span class="hljs-keyword">this</span>._lastTarget = currentTarget;
        } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// 当前帧我击中物体</span>
            <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>._lastTarget ) <span class="hljs-keyword">this</span>.rayList[<span class="hljs-keyword">this</span>._lastTarget.id].gazeLeave(); <span class="hljs-comment">// 触发上一帧物体gazeLeave</span>
            <span class="hljs-keyword">this</span>._lastTarget = <span class="hljs-literal">null</span>;
        }
    }
}</code></pre>
<p>下面一起来看<code>Gazer</code>实现的三步曲，这里用“击中”表示射线与物体相交。</p>
<h6>第一步，使用构造函数<code>constructor</code>初始化：</h6>
<ol>
<li>初始化射线发射器<code>raycaster</code>实例；</li>
<li>创建<code>rayList</code>以记录注册gaze事件的物体对象；</li>
<li>创建<code>lastTarget</code>记录前一帧被射线击中的物体，初始为null。</li>
</ol>
<h6>第二步，创建<code>on</code>方法提供事件绑定API</h6>
<p>通过调用<code>gazer.on(target,eventType,callback)</code>方式，传入绑定事件的Obect3D对象<code>target</code>，绑定事件类型<code>eventType</code>以及事件回调<code>callback</code>三个参数。</p>
<ol>
<li>
<p>判断这个target是否存在，不存在，则创建一个监听对象，存在则更新对象里的事件函数。这个对象包括传入的target本身，以及三个基本事件的回调函数（初始值为空方法）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.rayList[target.id] = { 
   target, 
   gazeEnter, 
   gazeTrigger, 
   gazeLeave
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">this</span>.rayList[<span class="hljs-keyword">target</span>.id] = { 
   <span class="hljs-keyword">target</span>, 
   gazeEnter, 
   gazeTrigger, 
   gazeLeave
}</code></pre>
<p>将这个对象以键值对形式赋值给<code>raylist[target.id]</code>监听序列对象；</p>
</li>
<li>将<code>raylist</code>对象处理成<code>[ target1, ..., targetN ]</code>的形式赋值给<code>this.targetList</code>，作为<code>raycaster.intersectObjects</code>的入参。</li>
</ol>
<h6>第三步，创建<code>update</code>方法，在动画帧中监听三个基本事件是否触发</h6>
<ol>
<li>调用<code>raycaster.setFromCamera</code>更新射线起点与方向；</li>
<li>调用<code>raycaster.intersectObjects</code>检测监听序列<code>this.targetList</code>是否有物体与射线相交；</li>
<li>根据<code>gazeEnter</code>和<code>gazeLeave</code>和<code>gazeTrigger</code>实现的情况，总结了以下这三个事件触发的逻辑图。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011814849?w=1240&amp;h=570" src="https://static.alili.tech/img/remote/1460000011814849?w=1240&amp;h=570" alt="gaze基本事件逻辑图" title="gaze基本事件逻辑图" style="cursor: pointer;"></span></p>
<p>逻辑图里的三个条件用代码表示如下：</p>
<blockquote><p>当前帧射线是否击中物体：<code>if (intersects.length &gt; 0)</code><br>上一帧射线是否击中物体：<code>if (this._lastTarget)</code><br>当前帧射线击中物体是否与上一帧不同：<code>if (this._lastTarget.id !== currentTarget.id)</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (intersects.length > 0) { // 当前帧射线击中物体
    const currentTarget = intersects[0].object;
    if (this._lastTarget) { // 上一帧射线击中物体
        if (this._lastTarget.id !== currentTarget.id) { 
            // 上一帧射线击中物体与当前帧不同，触发上一帧物体的gazeLeave事件，触发当前帧物体的gazeEnter事件
            this.rayList[this._lastTarget.id].gazeLeave(); 
            this.rayList[currentTarget.id].gazeEnter();
        }
    } else { // 上一帧射线未击中物体
        this.rayList[currentTarget.id].gazeEnter(); // 上一帧射线没有击中物体，触发当前帧物体的gazeEnter事件
    }
    this.rayList[currentTarget.id].gazeTrigger(); // 当前帧射线击中物体，触发物体的gazeTrigger事件
    this._lastTarget = currentTarget;
} else { // 当前帧我击中物体
    if ( this._lastTarget ) this.rayList[this._lastTarget.id].gazeLeave(); // 上一帧射线击中物体，触发上一帧物体gazeLeave
    this._lastTarget = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">if</span> (intersects.length &gt; <span class="hljs-number">0</span>) { <span class="hljs-comment">// 当前帧射线击中物体</span>
    const currentTarget = intersects[<span class="hljs-number">0</span>].<span class="hljs-keyword">object</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._lastTarget) { <span class="hljs-comment">// 上一帧射线击中物体</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._lastTarget.id !== currentTarget.id) { 
            <span class="hljs-comment">// 上一帧射线击中物体与当前帧不同，触发上一帧物体的gazeLeave事件，触发当前帧物体的gazeEnter事件</span>
            <span class="hljs-keyword">this</span>.rayList[<span class="hljs-keyword">this</span>._lastTarget.id].gazeLeave(); 
            <span class="hljs-keyword">this</span>.rayList[currentTarget.id].gazeEnter();
        }
    } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// 上一帧射线未击中物体</span>
        <span class="hljs-keyword">this</span>.rayList[currentTarget.id].gazeEnter(); <span class="hljs-comment">// 上一帧射线没有击中物体，触发当前帧物体的gazeEnter事件</span>
    }
    <span class="hljs-keyword">this</span>.rayList[currentTarget.id].gazeTrigger(); <span class="hljs-comment">// 当前帧射线击中物体，触发物体的gazeTrigger事件</span>
    <span class="hljs-keyword">this</span>._lastTarget = currentTarget;
} <span class="hljs-keyword">else</span> { <span class="hljs-comment">// 当前帧我击中物体</span>
    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">this</span>._lastTarget ) <span class="hljs-keyword">this</span>.rayList[<span class="hljs-keyword">this</span>._lastTarget.id].gazeLeave(); <span class="hljs-comment">// 上一帧射线击中物体，触发上一帧物体gazeLeave</span>
    <span class="hljs-keyword">this</span>._lastTarget = <span class="hljs-literal">null</span>;
}</code></pre>
<p>最后，我们需要更新<code>this._lastTarget</code>值，供下一帧进行逻辑判断，如果当前帧有物体击中，则<code>this._lastTarget = currentTarget</code>，否则执行<code>this._lastTarget = null</code>。</p>
<h3 id="articleHeader3">事件绑定示例</h3>
<p>接下来，我们调用前面定义的<code>Gazer</code>类开发gaze交互，实现一个简单例子：随机创建100个cube立方体，当用户注视立方体时，立方体半透明。<br>首先创建准心，设置为一个圆点作为展现给用户的光标，当然你可以创建其它准心形状，比如十字形或环形等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建准心
createCrosshair () {
    const geometry = new THREE.CircleGeometry( 0.002, 16 );
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.5,
        transparent: true
    });
    const crosshair = new THREE.Mesh(geometry,material);
    crosshair.position.z = -0.5;
    return crosshair;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-comment">// 创建准心</span>
createCrosshair () {
    <span class="hljs-keyword">const</span> geometry = <span class="hljs-built_in">new</span> THREE.CircleGeometry( <span class="hljs-number">0.002</span>, <span class="hljs-number">16</span> );
    <span class="hljs-keyword">const</span> material = <span class="hljs-built_in">new</span> THREE.MeshBasicMaterial({
        color: <span class="hljs-number">0xffffff</span>,
        opacity: <span class="hljs-number">0.5</span>,
        transparent: <span class="hljs-literal">true</span>
    });
    <span class="hljs-keyword">const</span> crosshair = <span class="hljs-built_in">new</span> THREE.Mesh(geometry,material);
    crosshair.position.z = <span class="hljs-number">-0.5</span>;
    <span class="hljs-keyword">return</span> crosshair;
}</code></pre>
<p>接下来，在<code>start()</code>方法创建物体并绑定事件，在<code>update</code>监听事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 场景物体初始化
start() {
    const { scene, camera } = this;
    ... 创建灯光、地板等
    // 添加准心到相机
    camera.add(this.createCrosshair());
    this.gazer = new Gazer();
    // 创建立方体
    for (let i = 0; i < 100; i++) {
        const cube = this.createCube(2,2,2 );
        cube.position.set( 100*Math.random() - 50, 50*Math.random() -10, 100*Math.random() - 50 );
        scene.add(cube);
        // 绑定注视事件
        this.gazer.on(cube,'gazeEnter',() => {
            cube.material.opacity = 0.5;
        });
        this.gazer.on(cube,'gazeLeave',() => {
            cube.material.opacity = 1;
        });
    }
}
// 动画更新
update() {
    const { scene, camera, renderer, gazer } = this;
    gazer.update(camera);
    renderer.render(scene, camera);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// 场景物体初始化</span>
start() {
    <span class="hljs-keyword">const</span> { scene, <span class="hljs-built_in">camera</span> } = <span class="hljs-keyword">this</span>;
    ... 创建灯光、地板等
    <span class="hljs-comment">// 添加准心到相机</span>
    <span class="hljs-built_in">camera</span>.<span class="hljs-built_in">add</span>(<span class="hljs-keyword">this</span>.createCrosshair());
    <span class="hljs-keyword">this</span>.gazer = <span class="hljs-keyword">new</span> Gazer();
    <span class="hljs-comment">// 创建立方体</span>
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++) {
        <span class="hljs-keyword">const</span> cube = <span class="hljs-keyword">this</span>.createCube(<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span> );
        cube.position.<span class="hljs-built_in">set</span>( <span class="hljs-number">100</span>*Math.<span class="hljs-built_in">random</span>() - <span class="hljs-number">50</span>, <span class="hljs-number">50</span>*Math.<span class="hljs-built_in">random</span>() <span class="hljs-number">-10</span>, <span class="hljs-number">100</span>*Math.<span class="hljs-built_in">random</span>() - <span class="hljs-number">50</span> );
        scene.<span class="hljs-built_in">add</span>(cube);
        <span class="hljs-comment">// 绑定注视事件</span>
        <span class="hljs-keyword">this</span>.gazer.on(cube,<span class="hljs-string">'gazeEnter'</span>,() =&gt; {
            cube.material.opacity = <span class="hljs-number">0.5</span>;
        });
        <span class="hljs-keyword">this</span>.gazer.on(cube,<span class="hljs-string">'gazeLeave'</span>,() =&gt; {
            cube.material.opacity = <span class="hljs-number">1</span>;
        });
    }
}
<span class="hljs-comment">// 动画更新</span>
update() {
    <span class="hljs-keyword">const</span> { scene, <span class="hljs-built_in">camera</span>, renderer, gazer } = <span class="hljs-keyword">this</span>;
    gazer.update(<span class="hljs-built_in">camera</span>);
    renderer.render(scene, <span class="hljs-built_in">camera</span>);
}</code></pre>
<p>在示例中，我们遵循上一期WebVRApp的代码结构，在<code>start</code>方法里增加了一个准心，为100个cube立方体绑定<code>gazeEnter</code>事件和<code>gazeLeave</code>事件，触发<code>gazeEnter</code>时，立方体半透明，触发<code>gazeLeave</code>时，立方体恢复不透明。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011814850?w=640&amp;h=350" src="https://static.alili.tech/img/remote/1460000011814850?w=640&amp;h=350" alt="gaze注视交互" title="gaze注视交互" style="cursor: pointer;"></span></p>
<blockquote><p>演示地址：<a href="https://yonechen.github.io/WebVR-helloworld/cardboard.html" rel="nofollow noreferrer" target="_blank">yonechen.github.io/WebVR-helloworld/cardboard.html</a><br>源码地址：<a href="https://github.com/YoneChen/WebVR-helloworld/blob/master/cardboard.html" rel="nofollow noreferrer" target="_blank">github.com/YoneChen/WebVR-helloworld/blob/master/cardboard.html</a></p></blockquote>
<hr>
<p>注视事件除了以上三种基本事件外，还衍生了像注视延迟事件和注视点击事件，这些gaze事件都可以在<code>gazeTrigger</code>里进行拓展。</p>
<h5>注视点击事件</h5>
<p>cardboard二代在盒子上提供了一个按钮，当用户通过注视物体并点击按钮，由按钮点击屏幕触发。<br>实现思路：在<code>window</code>绑定click事件，触发click时改变标志位，在<code>gazeTrigger</code>方法内根据标志位来判断是否执行回调，关键代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//按钮事件监听
window.addEventListener('click', e => this.state._clicked = true);
this.gazer.on(cube,'gazeTrigger',() => {
    // 当用户点击时触发
    if (this.state._clicked) {
        this.state._clicked = false; // 重置点击标志位
        cube.scale.set(1.5,1.5,1.5); // TODO
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//按钮事件监听</span>
window.addEventListener(<span class="hljs-string">'click'</span>, e =&gt; <span class="hljs-keyword">this</span>.state._clicked = <span class="hljs-literal">true</span>);
<span class="hljs-keyword">this</span>.gazer.on(cube,<span class="hljs-string">'gazeTrigger'</span>,() =&gt; {
    <span class="hljs-comment">// 当用户点击时触发</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state._clicked) {
        <span class="hljs-keyword">this</span>.state._clicked = <span class="hljs-literal">false</span>; <span class="hljs-comment">// 重置点击标志位</span>
        cube.scale.<span class="hljs-keyword">set</span>(<span class="hljs-number">1.5</span>,<span class="hljs-number">1.5</span>,<span class="hljs-number">1.5</span>); <span class="hljs-comment">// TODO</span>
    }
});</code></pre>
<h5>注视延迟事件</h5>
<p>当准心在物体上超过一定时间时触发，一般会在准心处设置一个进度条动画。<br><span class="img-wrap"><img data-src="/img/remote/1460000011814851?w=480&amp;h=270" src="https://static.alili.tech/img/remote/1460000011814851?w=480&amp;h=270" alt="注视延迟事件" title="注视延迟事件" style="cursor: pointer;"></span></p>
<p>实现思路：在<code>gazeEnter</code>时记录开始时间点，在<code>gazeTrigger</code>计算出时间差是否超过预设延迟时间，如果是则执行回调，关键代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//准心进入物体，开启事件触发计时
this.gazer.on(cube,'gazeEnter',() => {
    this.state._wait = true; // 计时已开始
    this.animate.loader.start(); // 开启准心进度条动画
    this.state.gazeEnterTime = Date.now(); // 记录计时开始时间点
});
this.gazer.on(cube,'gazeTrigger',() => {
    // 当计时已开始，且延迟时长超过1.5秒触发
    if (this.state._wait &amp;&amp; Date.now() - this.state.gazeEnterTime > 1500) {
        this.animate.loader.stop(); // 停止准心进度条动画
        this.state._wait = false; // 计时结束
        cube.material.opacity = 0.5; // TODO
    }
});
this.gazer.on(cube,'gazeLeave',() => {
    this.animate.loader.stop(); // 停止准心进度条动画
    this.state._wait = false; // 计时结束
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//准心进入物体，开启事件触发计时</span>
<span class="hljs-keyword">this</span>.gazer.on(cube,<span class="hljs-string">'gazeEnter'</span>,() =&gt; {
    <span class="hljs-keyword">this</span>.state._wait = <span class="hljs-literal">true</span>; <span class="hljs-comment">// 计时已开始</span>
    <span class="hljs-keyword">this</span>.animate.loader.start(); <span class="hljs-comment">// 开启准心进度条动画</span>
    <span class="hljs-keyword">this</span>.state.gazeEnterTime = Date.now(); <span class="hljs-comment">// 记录计时开始时间点</span>
});
<span class="hljs-keyword">this</span>.gazer.on(cube,<span class="hljs-string">'gazeTrigger'</span>,() =&gt; {
    <span class="hljs-comment">// 当计时已开始，且延迟时长超过1.5秒触发</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state._wait &amp;&amp; Date.now() - <span class="hljs-keyword">this</span>.state.gazeEnterTime &gt; <span class="hljs-number">1500</span>) {
        <span class="hljs-keyword">this</span>.animate.loader.stop(); <span class="hljs-comment">// 停止准心进度条动画</span>
        <span class="hljs-keyword">this</span>.state._wait = <span class="hljs-literal">false</span>; <span class="hljs-comment">// 计时结束</span>
        cube.material.opacity = <span class="hljs-number">0.5</span>; <span class="hljs-comment">// TODO</span>
    }
});
<span class="hljs-keyword">this</span>.gazer.on(cube,<span class="hljs-string">'gazeLeave'</span>,() =&gt; {
    <span class="hljs-keyword">this</span>.animate.loader.stop(); <span class="hljs-comment">// 停止准心进度条动画</span>
    <span class="hljs-keyword">this</span>.state._wait = <span class="hljs-literal">false</span>; <span class="hljs-comment">// 计时结束</span>
    ...
});</code></pre>
<p>这里准心计时进度条loader动画使用了<code>Tween.js</code>，这里就不展开了，更多可在源码地址查看。</p>
<blockquote><p>演示地址：<a href="https://yonechen.github.io/WebVR-helloworld/cardboard2.html" rel="nofollow noreferrer" target="_blank">yonechen.github.io/WebVR-helloworld/cardboard2.html</a><br>源码地址：<a href="https://github.com/YoneChen/WebVR-helloworld/blob/master/cardboard2.html" rel="nofollow noreferrer" target="_blank">github.com/YoneChen/WebVR-helloworld/blob/master/cardboard2.html</a></p></blockquote>
<hr>
<h3 id="articleHeader4">小结</h3>
<p>以上介绍了Cardboard的gaze事件概念与原理，以及三个基本事件的开发过程，通过例子展示gaze交互实现方法，最后文末补充了gaze事件的扩展。<br>上文提及的注视点击也是Gear VR最常用的交互方式，不过Gear VR提供了更为丰富的touchpad而不是按钮，下一期将详细介绍Gear VR与touchpad的事件开发，敬请期待。</p>
<hr>
<h5>WebVR开发传送门：</h5>
<p><a href="https://zhuanlan.zhihu.com/p/29888602" rel="nofollow noreferrer" target="_blank">WebVR开发教程——交互事件（一）头显与手柄</a><br><a href="https://zhuanlan.zhihu.com/p/30630559" rel="nofollow noreferrer" target="_blank">WebVR开发教程——交互事件（二）使用Gamepad</a><br><a href="https://zhuanlan.zhihu.com/p/28324884" rel="nofollow noreferrer" target="_blank">WebVR开发教程——深度剖析</a> 关于WebVR的开发调试方案以及原理机制<br><a href="https://zhuanlan.zhihu.com/p/25567905" rel="nofollow noreferrer" target="_blank">WebVR开发教程——标准入门</a> 使用Three.js开发WebVR场景的入门教程</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebVR开发教程——交互事件（三）Cardboard与注视

## 原文链接
[https://segmentfault.com/a/1190000011814841](https://segmentfault.com/a/1190000011814841)

