---
title: '自定义 Forge Viewer 右键菜单（Context Menu）' 
date: 2018-12-26 2:30:14
hidden: true
slug: b6mo2s0u32f
categories: [reprint]
---

{{< raw >}}

                    
<p>前阵子有些 Autodesk Forge 圈的朋友们都在询问同一个问题『要怎么在 Viewer 的自带右键菜单上添加自定义项目或是只显示自订义项目』～ 以下将针对『在自带右键菜单上添加自定义项目』和『只显示自订义项目的右键菜单』进行说明。</p>
<p>一、 在自带右键菜单上添加自定义项目:</p>
<p>在自带右键菜单上添加自定义项目是非常容易的，Forge Viewer 提供了一个 API 让使用者可以非常轻易的在自带菜单上添加自个的项目，而你需要做的就是像下面这段代码一样做一个简单的 API 调用。下面这个例子会在右键菜单上添加两个新项目，一个是『改变已选构件的颜色成红色（Override color of selected elements to red）』，另一个是『回复颜色变更（Clear overridden corlor）』：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="viewer.registerContextMenuCallback(  'MyChangingColorMenuItems', ( menu, status ) => {
    if( status.hasSelected ) {
        menu.push({
            title: 'Override color of selected elements to red',
            target: () => {
                const selSet = this.viewer.getSelection();
                this.viewer.clearSelection();

                const color = new THREE.Vector4( 255 / 255, 0, 0, 1 );
                for( let i = 0; i < selSet.length; i++ ) {
                    this.viewer.setThemingColor( selSet[i], color );
                }
            }
        });
    } else {
        menu.push({
            title: 'Clear overridden corlor',
            target: () => {
                this.viewer.clearThemingColors();
            }
        });
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>viewer.registerContextMenuCallback(  <span class="hljs-string">'MyChangingColorMenuItems'</span>, <span class="hljs-function"><span class="hljs-params">( menu, status )</span> =&gt;</span> {
    <span class="hljs-keyword">if</span>( status.hasSelected ) {
        menu.push({
            title: <span class="hljs-string">'Override color of selected elements to red'</span>,
            target: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                const selSet = <span class="hljs-keyword">this</span>.viewer.getSelection();
                <span class="hljs-keyword">this</span>.viewer.clearSelection();

                const color = <span class="hljs-keyword">new</span> THREE.Vector4( <span class="hljs-number">255</span> / <span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span> );
                <span class="hljs-keyword">for</span>( let i = <span class="hljs-number">0</span>; i &lt; selSet.length; i++ ) {
                    <span class="hljs-keyword">this</span>.viewer.setThemingColor( selSet[i], color );
                }
            }
        });
    } <span class="hljs-keyword">else</span> {
        menu.push({
            title: <span class="hljs-string">'Clear overridden corlor'</span>,
            target: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-keyword">this</span>.viewer.clearThemingColors();
            }
        });
    }
});</code></pre>
<p>在执行完上面的代码后就在右键菜单上看到这两个项目：</p>
<ol>
<li>『改变已选构件的颜色成红色（Override color of selected elements to red）』项目将会在有构件被选中时在菜单上显示：<br><span class="img-wrap"><img data-src="/img/bVXXtY?w=997&amp;h=592" src="https://static.alili.tech/img/bVXXtY?w=997&amp;h=592" alt="改变已选构件的颜色成红色" title="改变已选构件的颜色成红色" style="cursor: pointer; display: inline;"></span>
</li>
<li>『回复颜色变更（Clear overridden corlor）』项目会在没有选中任何构件时出现：<br><span class="img-wrap"><img data-src="/img/bVXXt2?w=1030&amp;h=615" src="https://static.alili.tech/img/bVXXt2?w=1030&amp;h=615" alt="回复颜色变更" title="回复颜色变更" style="cursor: pointer; display: inline;"></span>
</li>
</ol>
<p>但一般情况下，我们会将上面的代码放到一个自定义括展里头，让我们可以灵活的使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyMenuItemExtension extends Autodesk.Viewing.Extension {
  constructor( viewer, options ) {
    super( viewer, options );

    this.onBuildingContextMenuItem = this.onBuildingContextMenuItem.bind( this );
  }

  get menuId() {
    return 'MyColorContextMenu';
  }

  onBuildingContextMenuItem( menu, status ) {
    if( status.hasSelected ) {
      menu.push({
        title: 'Override color of selected elements to red',
        target: () => {
          const selSet = this.viewer.getSelection();
          this.viewer.clearSelection();

          // Change color of selected elements to the red
          const color = new THREE.Vector4( 255 / 255, 0, 0, 1 );
          for( let i = 0; i < selSet.length; i++ ) {
            this.viewer.setThemingColor( selSet[i], color );
          }
        }
      });

    } else {
      menu.push({
        title: 'Clear overridden corlor',
        target: () => {
          this.viewer.clearThemingColors();
        }
      });
    }
  }

  load() {
    // Add my owned menu items
    this.viewer.registerContextMenuCallback(
      this.menuId,
      this.onBuildingContextMenuItem
    );

    return true;
  }

  unload() {
    // Remove all menu items added from this extension
    this.viewer.unregisterContextMenuCallback( this.menuId );

    return true;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension( 'DemoMenuExtension', MyMenuItemExtension );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyMenuItemExtension</span> <span class="hljs-title">extends</span> <span class="hljs-title">Autodesk</span>.<span class="hljs-title">Viewing</span>.<span class="hljs-title">Extension</span> </span>{
  <span class="hljs-keyword">constructor</span>( viewer, options ) {
    <span class="hljs-keyword">super</span>( viewer, options );

    <span class="hljs-keyword">this</span>.onBuildingContextMenuItem = <span class="hljs-keyword">this</span>.onBuildingContextMenuItem.bind( <span class="hljs-keyword">this</span> );
  }

  <span class="hljs-keyword">get</span> menuId() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'MyColorContextMenu'</span>;
  }

  onBuildingContextMenuItem( menu, status ) {
    <span class="hljs-keyword">if</span>( status.hasSelected ) {
      menu.push({
        title: <span class="hljs-string">'Override color of selected elements to red'</span>,
        target: () =&gt; {
          const selSet = <span class="hljs-keyword">this</span>.viewer.getSelection();
          <span class="hljs-keyword">this</span>.viewer.clearSelection();

          <span class="hljs-comment">// Change color of selected elements to the red</span>
          const color = new THREE.Vector4( <span class="hljs-number">255</span> / <span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span> );
          <span class="hljs-keyword">for</span>( let i = <span class="hljs-number">0</span>; i &lt; selSet.length; i++ ) {
            <span class="hljs-keyword">this</span>.viewer.setThemingColor( selSet[i], color );
          }
        }
      });

    } <span class="hljs-keyword">else</span> {
      menu.push({
        title: <span class="hljs-string">'Clear overridden corlor'</span>,
        target: () =&gt; {
          <span class="hljs-keyword">this</span>.viewer.clearThemingColors();
        }
      });
    }
  }

  load() {
    <span class="hljs-comment">// Add my owned menu items</span>
    <span class="hljs-keyword">this</span>.viewer.registerContextMenuCallback(
      <span class="hljs-keyword">this</span>.menuId,
      <span class="hljs-keyword">this</span>.onBuildingContextMenuItem
    );

    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  unload() {
    <span class="hljs-comment">// Remove all menu items added from this extension</span>
    <span class="hljs-keyword">this</span>.viewer.unregisterContextMenuCallback( <span class="hljs-keyword">this</span>.menuId );

    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension( <span class="hljs-string">'DemoMenuExtension'</span>, MyMenuItemExtension );</code></pre>
<p><br></p>
<p>二、 只显示自订义项目的右键菜单:</p>
<p>如果上头的代码与你的需求不符合，你可以考虑编写一自订义的右键菜单，一样的他也不会太困难。现在举个例子来说明，像现在如果我想让自带右键菜单上除了自带项目外，还会在点击到不同构件时显示不同的项目；我需要做的就是通过继承 <code>Autodesk.Viewing.Extensions.ViewerObjectContextMenu</code> 和加入 <code>hitTest</code> 相关的逻辑到自定义右键菜单的 <code>buildMenu</code> 函数，就像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyContextMenu extends Autodesk.Viewing.Extensions.ViewerObjectContextMenu {
  constructor( viewer ) {
    super( viewer );
  }

  isWall( dbId ) {
    //Logics for determining if selected element is wall or not.
    return new Promise( ( resolve, reject ) => {
        $.get(
            '/api/walls/' + dbId,
            ( response ) => {
                if( response &amp;&amp; response.id != 0 ) {
                    return resolve( true );
                }
                return resolve( false );
            }
        )
        .error( ( error ) => reject( error ) );
    });
  }

  async buildMenu( event, status ) {
    // Get defulat menu items from the super class
    const menu = super.buildMenu( event, status );

    // Do hitTest to get dbIds
    const viewport = this.viewer.container.getBoundingClientRect();
    const canvasX = event.clientX - viewport.left;
    const canvasY = event.clientY - viewport.top;

    const result = this.viewer.impl.hitTest( canvasX, canvasY, false );

    if( !result || !result.dbId ) return menu;

    let isWall = false;
    try {
        isWall = await this.isWall( result.dbId );
    } catch ( error ) {
        isWall = false;
    }

    if( status.hasSelected &amp;&amp; isWall ) {
      menu.push({
          title: 'Show current surface temperature map',
          target: () => {
              $.post(
                    '/api/walls/temperature',
                    ( response ) => {
                        ViewerUtil.showWallTemperatureMap( response.values );
                    }
              );
          }
      });
    }

    return menu;
   }

   /**
    * @override
    */
   async show( event ) {
    const numSelected = this.viewer.getSelectionCount();
    const visibility = this.viewer.getSelectionVisibility();
    const status = {
      numSelected: numSelected,
      hasSelected: ( numSelected > 0 ),
      hasVisible: visibility.hasVisible,
      hasHidden: visibility.hasHidden
    };
    const menu = await this.buildMenu( event, status );

    this.viewer.runContextMenuCallbacks( menu, status );

    if( menu &amp;&amp; menu.length > 0 ) {
      this.contextMenu.show( event, menu );
    }
   }
}

class MyContextMenuExtension extends Autodesk.Viewing.Extension {
    constructor( viewer, options ) {
        super( viewer, options );
    }

    load() {
        // Use my owned context menu.
        this.viewer.setContextMenu( new MyContextMenu( this.viewer ) );
        return true;
    }

    unload() {
        // Restore default context menu
        this.viewer.setContextMenu( new Autodesk.Viewing.Extensions.ViewerObjectContextMenu( this.viewer ) );
        return true;
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension( 'DemoWallMenuExtension', MyContextMenuExtension );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">class</span> MyContextMenu <span class="hljs-keyword">extends</span> Autodesk.Viewing.Extensions.ViewerObjectContextMenu {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"> viewer </span>) {
    <span class="hljs-keyword">super</span>( viewer );
  }

  isWall( dbId ) {
    <span class="hljs-comment">//Logics for determining if selected element is wall or not.</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params"> resolve, reject </span>) =&gt;</span> {
        $.<span class="hljs-keyword">get</span>(
            <span class="hljs-string">'/api/walls/'</span> + dbId,
            <span class="hljs-function">(<span class="hljs-params"> response </span>) =&gt;</span> {
                <span class="hljs-keyword">if</span>( response &amp;&amp; response.id != <span class="hljs-number">0</span> ) {
                    <span class="hljs-keyword">return</span> resolve( <span class="hljs-literal">true</span> );
                }
                <span class="hljs-keyword">return</span> resolve( <span class="hljs-literal">false</span> );
            }
        )
        .error( <span class="hljs-function">(<span class="hljs-params"> error </span>) =&gt;</span> reject( error ) );
    });
  }

  <span class="hljs-keyword">async</span> buildMenu( event, status ) {
    <span class="hljs-comment">// Get defulat menu items from the super class</span>
    <span class="hljs-keyword">const</span> menu = <span class="hljs-keyword">super</span>.buildMenu( event, status );

    <span class="hljs-comment">// Do hitTest to get dbIds</span>
    <span class="hljs-keyword">const</span> viewport = <span class="hljs-keyword">this</span>.viewer.container.getBoundingClientRect();
    <span class="hljs-keyword">const</span> canvasX = event.clientX - viewport.left;
    <span class="hljs-keyword">const</span> canvasY = event.clientY - viewport.top;

    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">this</span>.viewer.impl.hitTest( canvasX, canvasY, <span class="hljs-literal">false</span> );

    <span class="hljs-keyword">if</span>( !result || !result.dbId ) <span class="hljs-keyword">return</span> menu;

    <span class="hljs-keyword">let</span> isWall = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">try</span> {
        isWall = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.isWall( result.dbId );
    } <span class="hljs-keyword">catch</span> ( error ) {
        isWall = <span class="hljs-literal">false</span>;
    }

    <span class="hljs-keyword">if</span>( status.hasSelected &amp;&amp; isWall ) {
      menu.push({
          title: <span class="hljs-string">'Show current surface temperature map'</span>,
          target: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
              $.post(
                    <span class="hljs-string">'/api/walls/temperature'</span>,
                    <span class="hljs-function">(<span class="hljs-params"> response </span>) =&gt;</span> {
                        ViewerUtil.showWallTemperatureMap( response.values );
                    }
              );
          }
      });
    }

    <span class="hljs-keyword">return</span> menu;
   }

   <span class="hljs-comment">/**
    * @override
    */</span>
   <span class="hljs-keyword">async</span> show( event ) {
    <span class="hljs-keyword">const</span> numSelected = <span class="hljs-keyword">this</span>.viewer.getSelectionCount();
    <span class="hljs-keyword">const</span> visibility = <span class="hljs-keyword">this</span>.viewer.getSelectionVisibility();
    <span class="hljs-keyword">const</span> status = {
      numSelected: numSelected,
      hasSelected: ( numSelected &gt; <span class="hljs-number">0</span> ),
      hasVisible: visibility.hasVisible,
      hasHidden: visibility.hasHidden
    };
    <span class="hljs-keyword">const</span> menu = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.buildMenu( event, status );

    <span class="hljs-keyword">this</span>.viewer.runContextMenuCallbacks( menu, status );

    <span class="hljs-keyword">if</span>( menu &amp;&amp; menu.length &gt; <span class="hljs-number">0</span> ) {
      <span class="hljs-keyword">this</span>.contextMenu.show( event, menu );
    }
   }
}

<span class="hljs-keyword">class</span> MyContextMenuExtension <span class="hljs-keyword">extends</span> Autodesk.Viewing.Extension {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"> viewer, options </span>) {
        <span class="hljs-keyword">super</span>( viewer, options );
    }

    load() {
        <span class="hljs-comment">// Use my owned context menu.</span>
        <span class="hljs-keyword">this</span>.viewer.setContextMenu( <span class="hljs-keyword">new</span> MyContextMenu( <span class="hljs-keyword">this</span>.viewer ) );
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    unload() {
        <span class="hljs-comment">// Restore default context menu</span>
        <span class="hljs-keyword">this</span>.viewer.setContextMenu( <span class="hljs-keyword">new</span> Autodesk.Viewing.Extensions.ViewerObjectContextMenu( <span class="hljs-keyword">this</span>.viewer ) );
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension( <span class="hljs-string">'DemoWallMenuExtension'</span>, MyContextMenuExtension );</code></pre>
<p>这样子就会在点击到墙构件显示这个项目『Show current surface temperature map』：<br><span class="img-wrap"><img data-src="/img/bVXXw2?w=991&amp;h=578" src="https://static.alili.tech/img/bVXXw2?w=991&amp;h=578" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>相反的，如果你不想显示菜单上自带的项目，你可以改成继承 <code>Autodesk.Viewing.UI.ObjectContextMenu</code>。但你点击到墙构件的时候就只会显示『Show current surface temperature map』这个项目，就像下面这个样子：<br><span class="img-wrap"><img data-src="/img/bVXXxl?w=992&amp;h=583" src="https://static.alili.tech/img/bVXXxl?w=992&amp;h=583" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>希望上面的说明对各位使用 Autodesk Forge 的朋友们有些帮助～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
自定义 Forge Viewer 右键菜单（Context Menu）

## 原文链接
[https://segmentfault.com/a/1190000011867872](https://segmentfault.com/a/1190000011867872)

