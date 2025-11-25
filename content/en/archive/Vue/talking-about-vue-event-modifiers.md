---
title: Talking About Vue Event Modifiers
tags: [Vue]
slug: talking-about-vue-event-modifiers
keywords: vue,event,modifier
date: 2017-05-25 19:33:33
---
## Event Modifiers
Speaking of Vue's event modifiers, compared to AngularJS, it's really great, greatly improving readability.

In daily development, we often need to call methods like event.preventDefault or event.stopPropagation.

Without event modifiers, we would write like this:
```javascript
//AngularJS
$scope.fn=function(message,event){
    if (event) event.preventDefault()
    alert(message)
  }
}
```

```javascript
//vue can also do this
methods: {
  fn: function (message, event) {
    // Now we can access native event object
    if (event) event.preventDefault()
    alert(message)
  }
}
```

Vue provides a more convenient way:

``` html
<!-- Prevent click event bubbling -->
<a v-on:click.stop="doThis"></a>

<!-- Submit event no longer reloads page -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- Modifiers can be chained  -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- Only modifiers -->
<form v-on:submit.prevent></form>

<!-- Use event capture mode when adding event listeners -->
<div v-on:click.capture="doThis">...</div>

<!-- Only trigger callback when event is triggered on the element itself (not child elements) -->
<div v-on:click.self="doThat">...</div>

<!-- Click event will only trigger once -->
<a v-on:click.once="doThis"></a>
```

## Modifier Keys
In keyboard events, Vue also provides very convenient handling.

```html
<!-- Only call vm.submit() when keyCode is 13 -->
<input v-on:keyup.13="submit">
```

There are also more convenient key aliases:

```html
<!-- Same as above -->
<input v-on:keyup.enter="submit">
<!-- Shorthand syntax -->
<input @keyup.enter="submit">
```

Vue's key aliases:

* .enter
* .tab
* .delete (captures "Delete" and "Backspace" keys)
* .esc
* .space
* .up
* .down
* .left
* .right
* .ctrl
* .alt
* .shift
* .meta


## Key Combinations

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```


With these modifiers, we avoid magic numbers and greatly improve readability.

