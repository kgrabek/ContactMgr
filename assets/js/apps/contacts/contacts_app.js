//moduł ContactsApp
ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
  ContactsApp.Router = Marionette.AppRouter.extend({//tworzymy router który pomoże nam wyświetlić adres url aplikacji i zapisać go do historii
    appRoutes: {//zawiera słownik który będzie ustawiał odpowiednio adres url
      "contacts": "listContacts",
      "contacts/:id": "showContact",
      "contacts/:id/edit": "editContact"
    }
  });
// API do sterowania aplikcja
  var API = {//
    listContacts: function(){// listContacts wywołuje kontroler który wyświetla listę kontaktów
      ContactsApp.List.Controller.listContacts();
    },

    showContact: function(id){ // wywołuje kontroler który pokazuje kontakt
      ContactsApp.Show.Controller.showContact(id);
    },

    editContact: function(id){// wywołuje kontrole odpowiedzialny za edycje kontaktu
      ContactsApp.Edit.Controller.editContact(id);
    }
  };

  ContactManager.on("contacts:list", function(){//jeśli event to contacts:list wywołujemy funkcje która:
    ContactManager.navigate("contacts");//ustawia adres URL
    API.listContacts();//wyswietla listę kontaktów
  });

  ContactManager.on("contact:show", function(id){// jeśli event to contact:show wywołujemy funkcję która:
    ContactManager.navigate("contacts/" + id);//zmienia adres URL
    API.showContact(id);//pokazuje kontakt
  });

  ContactManager.on("contact:edit", function(id){//jeśli event to contact:edit wywołujemy funckję która
    ContactManager.navigate("contacts/" + id + "/edit");//zmienia adres URL
    API.editContact(id);//odpala edycję kontaktu
  });

  ContactManager.addInitializer(function(){//dodajemy inicjator naszej aplikacji który zostanie odpalony po uruchomieniu aplikacji
    new ContactsApp.Router({//tworzymy nowy router do osbługi adresu url i historii
      controller: API//kontrolerem routera bedzie API
    });
  });
});
