module("Backbone.listenFor", {
    
});

test("basic listenFor & stopListeningFor view test", function() {

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

    $('#qunit-fixture')
        .append(band.$el)
        .append(dirk.$el)
        .append(lerxst.$el)
        .append(pratt.$el);

    strictEqual(band.$el.text(), 'Choose a band member');

    pratt.$el.trigger("click");
    strictEqual(band.$el.text(), 'Pratt plays the Drums');

    lerxst.$el.trigger("click");
    strictEqual(band.$el.text(), 'Lerxst plays the Guitar');

    dirk.$el.trigger("click");
    strictEqual(band.$el.text(), 'Dirk plays the Bass');

    band.stopListeningFor("showMember");
    pratt.$el.trigger("click");
    strictEqual(band.$el.text(), 'Dirk plays the Bass');

});

test("basic listenForOnce view test", function() {

    var Band = Backbone.View.extend({
        initialize: function(){
            this.listenForOnce("showMember", this.showMember);
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

    $('#qunit-fixture')
        .append(band.$el)
        .append(dirk.$el)
        .append(lerxst.$el)
        .append(pratt.$el);

    strictEqual(band.$el.text(), 'Choose a band member');

    pratt.$el.trigger("click");
    strictEqual(band.$el.text(), 'Pratt plays the Drums');

    lerxst.$el.trigger("click"); 
    strictEqual(band.$el.text(), 'Pratt plays the Drums');

    dirk.$el.trigger("click");
    strictEqual(band.$el.text(), 'Pratt plays the Drums');

});