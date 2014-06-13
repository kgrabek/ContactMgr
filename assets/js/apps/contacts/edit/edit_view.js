//moduł odpowiedzialny za wyświetlenie widoku edycji
ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
  Edit.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({//Tworzymy obiekt Edit.Contact który jest widokiem formularza
    initialize: function(){//przy inicjacji przesyłamy do formularza dane by wypełnic go
      this.title = "Edit " + this.model.get("firstName") + " " + this.model.get("lastName");// ustawiamy tytuł formularza który zostanie stworzony
    }
  });
});
