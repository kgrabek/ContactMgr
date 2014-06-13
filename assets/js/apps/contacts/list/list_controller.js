//Moduł zajmujący się kotrolowanie widoku listy
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {//Tworzymy kontroler
    listContacts: function(){//metoda wyświetlająca listę kontaktów
      var loadingView = new ContactManager.Common.Views.Loading();//tworzymy widok loadingu
      ContactManager.mainRegion.show(loadingView);//wysyłamy do go głównego regionu

      var fetchingContacts = ContactManager.request("contact:entities");//rządamy eventu contact:entities i jego wartość wywołania przypisujemy do fetchingContacts

      var contactsListLayout = new List.Layout();//tworyzmy obiekt layout'a
      var contactsListPanel = new List.Panel();//obiekt panelu do layout

      $.when(fetchingContacts).done(function(contacts){//czekamy aż wszystkie dane zostaną załadowane a potem wywołujemy funkcję
        var contactsListView = new List.Contacts({//Tworzymy obiekt widoku listy
          collection: contacts //widok będzie zawierał kolekcje collection
        });

        contactsListLayout.on("show", function(){//bindujemy event show do naszego layout'a i tworzymy funckję dla niego
          contactsListLayout.panelRegion.show(contactsListPanel);//renderujemy panel layout'a
          contactsListLayout.contactsRegion.show(contactsListView);//renderujemy widok kontaktów
        });

        contactsListPanel.on("contact:new", function(){//bindujemy event contact:new i tworzymy funkcje
          var newContact = new ContactManager.Entities.Contact();//tworzymy obiekt i inicjujemy go

          var view = new ContactManager.ContactsApp.New.Contact({//tworzymy nowy widok na kontakt
            model: newContact,//dajemy mu model
            asModal: true
          });

          view.on("form:submit", function(data){//bindujemy do widoku nowego kotantktu event form:submit i piszemy dla niego funkcję
            var highestId = contacts.max(function(c){ return c.id; }).get("id");// tworzymy zmienna highestID która bedzie zawierac wartość największego id
            data.id = highestId + 1;//ustawiamy id naszego nowego kontaktu jako najwyższe id + 1
            if(newContact.save(data)){//zapisujemy kontakt
              contacts.add(newContact);//dodajemy nowy kontakt
              ContactManager.dialogRegion.close();//zamykamy okno dialogowe w którym byliśmy
              contactsListView.children.findByModel(newContact).flash("success");//z listy kontaktów sprawdzamy elementy dzieci czyli kontakty i z nich wyszukujemy po modelu rządanego kontaktu i uruchamiany funkcję flash
            }
            else{// jeśli zapisywanie nie powiodło się
              view.triggerMethod("form:data:invalid", newContact.validationError);//wywołujemy event formdatainvalid
            }
          });

          ContactManager.dialogRegion.show(view);//i renderujemy view
        });

        contactsListView.on("itemview:contact:show", function(childView, model){//bindujemy event itemview:contact:show do listy kontaktów i piszemy dla niego funkcję
          ContactManager.trigger("contact:show", model.get("id"));//wywołujemy event contact:show i wysyłamy do niego id modelu
        });

        contactsListView.on("itemview:contact:edit", function(childView, model){//bindujemy event itemview:contact:edit do listy kontaktów i tworzymy dla niego funkcje
          var view = new ContactManager.ContactsApp.Edit.Contact({//tworzymy nowy widok i dajemy mu widok edycji kontaktu
            model: model,//ustawiamy model widoku
            asModal: true//
          });

          view.on("form:submit", function(data){//bindujemy event form:submit do naszego widoku
            if(model.save(data)){//jeśli zapisanie przebiegnie poprawnie
              childView.render();//renderujemy widok dziecka obiektu
              ContactManager.dialogRegion.close();//zamykamy okno dialogowe
              childView.flash("success");//wywołujemy flash na odpowiednim elemencie listy
            }
            else{//jeśli zapis nie powiedzie się
              view.triggerMethod("form:data:invalid", model.validationError); // wywołujemy event form:data:invalid
            }
          });

          ContactManager.dialogRegion.show(view);//renderujemy
        });

        contactsListView.on("itemview:contact:delete", function(childView, model){
          model.destroy();
        });

        ContactManager.mainRegion.show(contactsListLayout);
      });
    }
  }
});
