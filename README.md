# Backbone.listenFor

Backbone.listenFor is a pub/sub add-on for Backbone objects. It allows you to listen for an event from any Backbone object that triggers it. The object that triggered the event will be passed to the callback as the first argument, allowing you to inspect it and perform actions on it or its attributes. It works with the following objects: Event, View, Model, Collection, Router, History, and the Backbone object itself. Any listeners created on a Backbone View will automatically be removed when the view's remove method is called. Just like with the standard Backbone Events, trigger can pass additional arguments to the callback.

## Methods

**listenFor(event, callback, [context])**  
Tell an object to listen for event from any object that triggers it. The triggering object will be passed to the callback as the first argument. Context of the callback is bound to the object doing the listening, but can be changed by passing in another object as the last argument.

listenFor also supports the event map syntax and listening for the all event. When listening for the all event the event name is the first argument in the callback and the object that triggered the event will be second.

**listenForOnce(event, callback, [context])**  
Just like listenFor except the callback will only be called once before being removed.

**stopListeningFor([event], [callback], [context])**  
Works just like Backbone's off event method, removing events set up with listenFor or listenForOnce.

## Using

Just include Backbone.listenFor after backbone.js and it's dependencies:

```html
<script src="jquery.js"></script>
<script src="underscore.js"></script>
<script src="backbone.js"></script>
<script src="Backbone.listenFor.js"></script>
```

## Example

In this simple example, we create a Band view that listens for an event triggered by any of the Member views and displays the members name and the instrument they play. The Member views will trigger the event when clicked.

```javascript
var Band = Backbone.View.extend({
	initialize: function(){
		this.listenFor("showMember", this.showMember);
		this.$el.text('Choose a band member');
	},
	showMember: function(view){
		this.$el.text(view.model.get("name") + " plays the " + view.model.get("instrument"));
	}
});

var Member = Backbone.View.extend({
	events:{
		"click": "clicked"
	},
	initialize: function(options){
		this.model = new Backbone.Model(options);
		this.$el.text(options.name);
	},
	clicked: function(){
		this.trigger("showMember");
	}
});

var dirk = new Member({
	name: "Dirk",
	instrument: "Bass"
});

var lerxst = new Member({
	name: "Lerxst",
	instrument: "Guitar"
});

var pratt = new Member({
	name: "Pratt",
	instrument: "Drums"
});

var band = new Band();

$('body').append(band.$el)
	.append(dirk.$el)
	.append(lerxst.$el)
	.append(pratt.$el);
```

