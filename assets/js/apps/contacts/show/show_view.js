//Tworzymy nowy moduł który będzie odpowiadał za pokazywanie kontaktu na stornie
ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  Show.MissingContact = Marionette.ItemView.extend({//tworzymy widok który będzie odpowiedzialny za probe wyświetlenie nieistniejącego kontaktu
    template: "#missing-contact-view"//ustawiamy template widoku
  });

  Show.Contact = Marionette.ItemView.extend({//tworzymy widok w którym będziemy wyświetlać pojedyńczy kontakt
    template: "#contact-view",//ustawiamy template

    events: {//tworzymy słownik eventów, czyli powiązania pomiędzy eventami przegladarki a naszymi funkcjami
      "click a.js-edit": "editClicked"//event editClicked który jest powiązany z kliknięcie na element strony który jest linkiem o classie js-edit
    },

    editClicked: function(e){//tworzymy ciało eventa
      e.preventDefault();//zapobiegamy domyślnemu działaniu elementu. w tym przypadku będzie to link i nie chcemy żeby stron sie przeładowywała gdy w niego klikniemy
      this.trigger("contact:edit", this.model);//wywołujemy event contact:edit
    }
  });
});
