//moduł odpowiedzialny za widok tworzenia nowego kontaktu
ContactManager.module("ContactsApp.New", function(New, ContactManager, Backbone, Marionette, $, _){
  New.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({//nasz widok tworzenia nowego kontaktu to roszerzony widok formularza
    title: "New Contact"// ustawiamy tytuł okna
  });
});
