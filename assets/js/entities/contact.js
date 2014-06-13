//moduł Entities który zawiera reprezentacje encji naszej aplikacji,
ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Contact = Backbone.Model.extend({//pierwsza encja jaką jest Contact jest pojedyńczym rekordem w naszej aplikcji, jednym kontaktem
//      Contact dziedziczy po Backbone.Model
    urlRoot: "contacts", //parametr urlRoot odpowiada za podstawe tworzenia linków do kontaktów. Czyli każdy kontakt będzie miał adres url ./contacts/id

    defaults: { //ustawiamy wartości domyślne
      firstName: "",
      lastName: "",
      phoneNumber: ""
    },
//    metoda validate jest walidatorem poprawności wprowadzanych danych w formularzu przy edycji i dodawaniu kontaktu
    validate: function(attrs, options) {
      var errors = {};//słownik przechowujący komunikaty błędów dla kolejnych atrybutów
      if (! attrs.firstName) { // jeśli firstName jest puste
        errors.firstName = "can't be blank";
      }
      if (! attrs.lastName) { // jeśli lastName jest puste
        errors.lastName = "can't be blank";
      }
      else{
        if (attrs.lastName.length < 2) { // jestli lastName jest krótsze niż 2 znaki
          errors.lastName = "is too short";
        }
      }
      if( ! _.isEmpty(errors)){ //jeśli errors zawiera jakieś dane zwracamy je
        return errors;
      }
    }
  });
//dodajemy do localStorage miejsce na Contact
  Entities.configureStorage(Entities.Contact);
//kolejna encja naszej aplikcji która reprezentuje zbiór kontaktów. Dziedziczy po Backbone.Collection
  Entities.ContactCollection = Backbone.Collection.extend({
    url: "contacts",//adres url
    model: Entities.Contact,//kolekcja składa się z modelu Contact,zdefiniowanego wyżej
    comparator: "firstName"//ustalamy z której wartości ma korzystać comparator przy wyświetlaniu kolekcji
  });
//konfiguracja localStorage
  Entities.configureStorage(Entities.ContactCollection);
//inicjalizacja listy kontaktów
  var initializeContacts = function(){
    contacts = new Entities.ContactCollection([//tworzymy nowy obiekt contacts który jest naszą kolekcji kontatków zdefiniowa wyżej
      { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184" },
      { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
      { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
    ]);
    contacts.forEach(function(contact){//dla każdego kontaktu
      contact.save();//zapisujemy kontakt w localStorage
    });
    return contacts.models;//zwracamy kolekcje
  };
// definiujemy API, jest zbiorem metod do których mamy dostęp na zewnątrz modułu
  var API = {
//      metoda zwracająca naszą kolekcje
    getContactEntities: function(){
      var contacts = new Entities.ContactCollection(); // tworzymy nową zmieną contacts i inicjujemy ją wywołaniem kontrukora ContactCollecion zdefiniowanym wyżej
      var defer = $.Deferred(); //tworzymy obiekt deferred
      contacts.fetch({//wyciągamy modele z kolekcji i przypisujemy je do obiektu contacts
        success: function(data){
          defer.resolve(data);//wywołujemy callbacki z defer
        }
      });
      var promise = defer.promise();// tworzymy promise
      $.when(promise).done(function(contacts){//odpalamy dopiero kiedy callbacki z promise zostaną wykonane
        if(contacts.length === 0){//sprawdzamy czy lista kontaktów nie jest pusta
          var models = initializeContacts();//inicjujemy zmienną models kolekcja naszych kontatktów
          contacts.reset(models);// dzięki metodzie reset widok zostanie odswieżony(aktualizajca kolekcji i rendering widoku)
        }
      });
      return promise;// zwracamy promise
    },

    getContactEntity: function(contactId){//metoda zwracająca pojedynczy kontakt
      var contact = new Entities.Contact({id: contactId});//zmienna przechowuje model,encje naszeego kontatktu o danym id
      var defer = $.Deferred();//tworzymy obiekt
      setTimeout(function(){
        contact.fetch({//pobieramy dane kontaktu
          success: function(data){//jeśli poprawnie pobrano dane kontaktu
            defer.resolve(data);//wywołujemy metode resolve z paramatrami data
          },
          error: function(data){//jeśli nie pobrano danych
            defer.resolve(undefined);//wywołujemy metode resolve z obiektem undefined
          }
        });
      }, 2000);
      return defer.promise();//zwracamy promise
    }
  };

  ContactManager.reqres.setHandler("contact:entities", function(){ // tworzymy handler contact:entities
    return API.getContactEntities();//który będzie zwracał encje kontaktów
  });

  ContactManager.reqres.setHandler("contact:entity", function(id){ //tworzymy handler contact:entity
    return API.getContactEntity(id);//który będzie zwracał encję.
  });
});
