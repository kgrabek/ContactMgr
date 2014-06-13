//moduł odpowiedzialny za edycję kontaktu
ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
  Edit.Controller = {//tworzymy nasz kontroler edycji kontaktu
    editContact: function(id){//tworzymy metodę editContact
      var loadingView = new ContactManager.Common.Views.Loading({//tworzymy zmienną loadingView która będzie zawiarać widok ładowania
        title: "Edycja kontaktu",//nadajemy tytuł loadingu
        message: "Przetwarzanie nowych danych."
      });
      ContactManager.mainRegion.show(loadingView);// wysyłamy widok do głównego regionu renderowania naszej aplikacji

      var fetchingContact = ContactManager.request("contact:entity", id);// pobieramy encje kontaktu o danym id
      $.when(fetchingContact).done(function(contact){//czekamy aż pobieranie encji sie zakończy, następnie wywołujemy funkcję z danym parametrem
        var view;//tworzymy pustą zmienną view która czeka na wypełnienie widokiem konkretnego kontaktu
        if(contact !== undefined){//sprawdzamy czy widok nie jest pusty
          view = new Edit.Contact({//tworzymy nowy widok kontaktu
            model: contact//a dane modelu wypełniamy danymi kontaktu który został przesłany jako argument wywołania funkcji
          });

          view.on("form:submit", function(data){//bindujemy event form:submit i tworzymy callback'a
            if(contact.save(data)){//gdy zostanie wywołany event form:submit probojemy zapisać nasz model czyli kontakt z danymi które zostały przesłane w funkcji
              ContactManager.trigger("contact:show", contact.get("id"));// wywołujemy event contact:show który pobiera i wyświetla dany model czyli nasz kontkakt
            }
            else{//jeśli zapis się nie powiedzie
              view.triggerMethod("form:data:invalid", contact.validationError);//wywołujemy event form:data:invalid i funkcje validacji danego kontaktu
            }
          });
        }
        else{//jeśli widok jest pusty
          view = new ContactManager.ContactsApp.Show.MissingContact();// view przyjmie widok brakującego kontaktu
        }

        ContactManager.mainRegion.show(view);//wysyłamy view do głównego regionu
      });
    }
  };
});
