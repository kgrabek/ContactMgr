ContactManager.module("ContactApp", function(ContactApp, ContactManager, Backbone, Marionette, $, _){
    ContactApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "contacts": "listContacts"
        }
    });

    var API = {
        listContacts: function(){
            console.log("route to list contacts was triggered");
        }
    };

    ContactManager.addInitializer(function(){
        new ContactsApp.Router({
            controller: API
        });
    });
});