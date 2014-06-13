//Tworzymy model który zawiera funkcjonalność która jest wspólna dla innych widoków które tworzymy w naszej aplikacji
ContactManager.module("Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){
  Views.Loading = Marionette.ItemView.extend({//tworzmy nasz widok loadingu. Nasz loading będzie rozszerzeniem widoku itemu
    template: "#loading-view",//dajemy mu szablon

    initialize: function(options){//tworzymy inicjator, pobiera on obiekt opcji
      var options = options || {};//tworzymy zmienną options która będzie przechowywać nasze opcje przesłane przez parametr funkcji, jeśli nie to będzie pustym słownikiem
      this.title = options.title || "Przygotowywanie kontaktu";// wyciągamy z options porządane wartości.
      this.message = options.message || "Proszę czekać.";
    },

    serializeData: function(){//serializacja danych
      return {//zwracamy słownik który zawiera tytuł i komunikat
        title: this.title,
        message: this.message
      }
    },

    onShow: function(){// metoda onShow
      var opts = {//parametry loadingu
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: "#000", // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: "spinner", // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: "30px", // Top position relative to parent in px
        left: "auto" // Left position relative to parent in px
      };
      $("#spinner").spin(opts);//wywołujemy selektor jQuery, szukamy elementu o id spinner i wywołujemy spin z naszymi parametrami
    }
  });
});
