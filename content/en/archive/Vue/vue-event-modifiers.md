---
title: Talking About Vue Event Modifiers
tags: [Vue]
slug: 9ca26edd
keywords: vue,Event,Modifier
date: 2017-05-25 19:33:33
---

## Event Modifiers
Speaking of vue event modifiers, compared to angularJs, really too comfortable, greatly increases readability.

In daily development, often need to call event.preventDefault or event.stopPropagation and other methods.

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
//vue can also write like this
methods: {
  fn: function (message, event) {
    // Now we can access native event object
    if (event) event.preventDefault()
    alert(message)
  }
}
```

Vue provides more convenient writing:

```html
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

<!-- Only trigger callback when event triggers on element itself (not child elements) -->
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

Even more comfortable key aliases:

```html
<!-- Same as above -->
<input v-on:keyup.enter="submit">
<!-- Abbreviated syntax -->
<input @keyup.enter="submit">
```

Vue key aliases:

* .enter
* .tab
* .delete (captures "delete" and "backspace" keys)
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


With these modifiers, avoid magic numbers, greatly improves readability.

