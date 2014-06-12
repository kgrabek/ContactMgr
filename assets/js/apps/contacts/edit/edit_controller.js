ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
  Edit.Controller = {
    editContact: function(id){
      var loadingView = new ContactManager.Common.Views.Loading({
        title: "CZEKA!",
        message: "bo się nie doczeka"
      });
      ContactManager.mainRegion.show(loadingView);

      var fetchingContact = ContactManager.request("contact:entity", id);
      $.when(fetchingContact).done(function(contact){
        var view;
        if(contact !== undefined){
          view = new Edit.Contact({
            model: contact
          });
        }
        else{
          view = new ContactManager.ContactsApp.Show.MissingContact();
        }
        ContactManager.mainRegion.show(view);
      });
    }
  };
});
