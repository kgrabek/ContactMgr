//moduł ContactApp.Show . kontroler wyświetlania kontaktu
ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  Show.Controller = {//tworzymy Controller
    showContact: function(id){//tworzymy metode showContact kontrolera. pobiera id kontaktu
      var loadingView = new ContactManager.Common.Views.Loading({//tworzymy widok ładowania
        title: "Artificial Loading Delay",//nadajemy mu tytuł
        message: "Data loading is delayed to demonstrate using a loading view."//i komunikat
      });
      ContactManager.mainRegion.show(loadingView);//renderujemy mainRegion wysyłając do niego widok ładowania

      var fetchingContact = ContactManager.request("contact:entity", id);//wyciągamy kontakt
      $.when(fetchingContact).done(function(contact){//czekamy aż wyciąganie kontaktu skończy się na następnie wywołujemy funkcje
        var contactView;//zmienna przetrzymująca widok kontaktu
        if(contact !== undefined){//jeśli contact nie jest pusty
          contactView = new Show.Contact({// nadajemy zmiennej contactView wartosc wywołania Show.Contact
            model: contact// z modelem contact
          });

          contactView.on("contact:edit", function(contact){//jeśli kontakt będzie edytowany
            ContactManager.trigger("contact:edit", contact.get("id"));// pobieramy kontakt o danym id gdy event contact:edit zostanie wywołany
          });
        }
        else{//inaczej
          contactView = new Show.MissingContact();// ustawiamy widok na missingContact
        }

        ContactManager.mainRegion.show(contactView);//renderujemy widok na głowny region
      });
    }
  }
});
