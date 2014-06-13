//moduł który zawiera wspólne elementy naszych widoków
ContactManager.module("ContactsApp.Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){
  Views.Form = Marionette.ItemView.extend({// tworzymy widok Form który roszerza ItemView
    template: "#contact-form",//dajemy mu template

    events: {//przypisujemy eventy
      "click button.js-submit": "submitClicked"
    },

    submitClicked: function(e){//metoda submitClicked która jest wywoływana przez klikinęcie submita w formularzu
      e.preventDefault();//blokujemy zachowanie domyślne
      var data = Backbone.Syphon.serialize(this);//serializujemy obiekt i przypisujemy do zmiennej data
      this.trigger("form:submit", data);//i wywołujemy event form:submit i przesyłamy obiekt data do eventu
    },

    onRender: function(){// metoda onRender
      if( ! this.options.asModal){//sprawdzamy wartość asModal danego obiektu.
        var $title = $("<h1>", { text: this.title });// jeśli false -> ustawiamy selektor jquery
        this.$el.prepend($title);//dodajemy go
      }
    },

    onShow: function(){//metoda onShow
      if(this.options.asModal){//spradzamy asModal
        this.$el.dialog({//
          modal: true,
          title: this.title,
          width: "auto"
        });
      }
    },
//metoda która odpowiada za błędnie wypełniony formularz. pobiera argument errors
    onFormDataInvalid: function(errors){
      var $view = this.$el;//ustawiamy $view jako selektor el

      var clearFormErrors = function(){//funkcja
        var $form = $view.find("form");//znajdujemy form i przypisujemy do $form
        $form.find(".help-inline.error").each(function(){//szukamy klasy help-inline-error i dla każdego elementu
          $(this).remove();//wywołujemy metode remove jquery która usuwa dany element z DOM
        });
        $form.find(".control-group.error").each(function(){//szukamy obiektów z klasą control-group.error
          $(this).removeClass("error");//usuwamy ze znalezionych obiektów klasę error
        });
      };

      var markErrors = function(value, key){//funkcja zaznaczajaca element
        var $controlGroup = $view.find("#contact-" + key).parent();//szukamy elementów o id contact-xxx
        var $errorEl = $("<span>", { class: "help-inline error", text: value });//tworzymy obiekt jquery zawierający tag span i klase help-inline error i tekst value
        $controlGroup.append($errorEl).addClass("error");//dodajemy element do DOM i ustawiamy klase znalezionego elementu
      };

      clearFormErrors();//wywołujemy metodę clearFormError
      _.each(errors, markErrors);//i dla każdego oznaczamy error
    }
  });
});
