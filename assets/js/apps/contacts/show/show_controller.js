ContactManager.module("ContactApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Controller = {
        showContact: function(model){
            console.log("showContact called for model", model)
        }
    }
});