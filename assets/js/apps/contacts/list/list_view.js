//moduł który zawiera widok naszej listy kontaktów
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Layout = Marionette.Layout.extend({//Tworzymy layout dla naszej listy.
    template: "#contact-list-layout",//dajemy mu szablon
    // przypisujemy regiony
    regions: {
      panelRegion: "#panel-region", // region na panel
      contactsRegion: "#contacts-region" // region na kontakty
    }
  });

  List.Panel = Marionette.ItemView.extend({//Tworzymy widok panela naszej listy
    template: "#contact-list-panel",//dajemy mu szablon

    triggers: {//przypisujemy triggery
      "click button.js-new": "contact:new"//jeśli button o klasie js-new zostanie kliknięty wywołujemy trigger contact:new
    }
  });

  List.Contact = Marionette.ItemView.extend({//tworzymy widok na nasz kontakt
    tagName: "tr",//zmieniamy domyślny tag na tr
    template: "#contact-list-item",//dajemy template

    events: {//przypisujemy eventy
      "click": "highlightName",//wywołanie metody highlightName dla kliknięcia w kontakt
      "click td a.js-show": "showClicked",//wywołanie metody showClicked dla klikinęcia w link o klasie js-show znajdujący sie wewnątrz znacznika <td>
      "click td a.js-edit": "editClicked",//wywołanie metody editClicked dla klikinęcia  w link o klasie js-edit znajdujący sie wewnątrz znacznika <td>
      "click button.js-delete": "deleteClicked"////wywołanie metody deleteClicked dla klikinęcia w button oklasie js-delete
    },

    flash: function(cssClass){//metoda flash tworząca "błysk" która pobiera klasę css
      var $view = this.$el;//tworzymy zmienną $view i przypisujemy jej selektor
      $view.hide().toggleClass(cssClass).fadeIn(800, function(){//korzystając z jquery tworzymy efekt błyśnięcia dla obiektu o danej klasie css
        setTimeout(function(){
          $view.toggleClass(cssClass)
        }, 500);
      });
    },

    highlightName: function(e){//metoda highlightName podświetla klikinęty element listy
      this.$el.toggleClass("warning");//dzięki wywołaniu funkcji toggleClass jquery
    },
    //metoda showClicked
    showClicked: function(e){//pobiera argument e który oznacza element DOM
      e.preventDefault();//korzystając z funkcji jquery preventDefault blokujemy zachowanie domyślne elementu
      e.stopPropagation();//blokujemy wyskakiwanie elementu w strukturze DOM
      this.trigger("contact:show", this.model);// wywołujemy event contact:show na rzecz modelu
    },

    editClicked: function(e){
      e.preventDefault();
      e.stopPropagation();
      this.trigger("contact:edit", this.model);
    },

    deleteClicked: function(e){
      e.stopPropagation();
      this.trigger("contact:delete", this.model);
    },

    remove: function(){//metoda remove
      var self = this;//tworzymy zmienną self która będzie kopią naszego obiektu
      this.$el.fadeOut(function(){//odpalamy efekt fadeOut a po jago zakończeniu wywołujemy funkcję
        Marionette.ItemView.prototype.remove.call(self);//która kasuje dany element
      });
    }
  });

  List.Contacts = Marionette.CompositeView.extend({//Tworzymy widok kompozytowy czyli taki który składa się z wielu modeli
    tagName: "table",//zmieniamy domyśla tag na table
    className: "table table-hover",//dajemy klase
    template: "#contact-list",//dajemy szablon
    itemView: List.Contact,//ustawiamy elementy widoku. z jakich modeli będzie stworzony widok
    itemViewContainer: "tbody",//ustawiamy tag który będzie wrappował nasz widok

    initialize: function(){//tworzymy inicjator
      this.listenTo(this.collection, "reset", function(){ //ustawiamy nasłuchiwanie na event reset
        this.appendHtml = function(collectionView, itemView, index){// appendujemy html do strony index
          collectionView.$el.append(itemView.el);//
        }
      });
    },

    onCompositeCollectionRendered: function(){
      this.appendHtml = function(collectionView, itemView, index){
        collectionView.$el.prepend(itemView.el);
      }
    }
  });
});
