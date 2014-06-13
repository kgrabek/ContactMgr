//Tworzymy nowy region dla okna dialogowego które będzie wykorzystywała aplikacja
Marionette.Region.Dialog = Marionette.Region.extend({
  onShow: function(view){//tworzymy metode onShow która będzie wyświetlać okno
    this.listenTo(view, "dialog:close", this.closeDialog);//nasłuchujemy na event dialog:close i jeśli wywołujemy closeDialog

    var self = this;//tworzymy kopie obiektu
    this.$el.dialog({//ustawiamy nasze okno dialogowe
      modal: true,
      title: view.title,
      width: "auto",
      close: function(e, ui){//klikięcie krzyżyka wywoła funkcję
        self.closeDialog();
      }
    });
  },

  closeDialog: function(){//metoda zamykająca okno dialogowe
    this.stopListening();//przestajemy nasłuchiwać na event
    this.close();//zamykamy okno
    this.$el.dialog("destroy");//niszczymy obiekt z pamięci
  }
});