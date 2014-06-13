// Tworzymy obiekt ContactManager i wywołujemy dla niego kontruktor aplikacji Marionette
var ContactManager = new Marionette.Application();

//Dodajemy regiony do naszej aplikacji dzięki którym będziemy mieli przestrzeń do wyświetlania naszych działań/wyników pracy aplikacji
ContactManager.addRegions({
  mainRegion: "#main-region", //głowyn region
  dialogRegion: "#dialog-region" //region okna dialogowego
});

//metoda navigate która dodaje do historii przeglądarki adres gdy poruszamy się po aplikacji
ContactManager.navigate = function(route,  options){ //route jest adresem url a option słownikiem zawierającym opcje
  options || (options = {}); // jeśli options jest falsem dajemy pusty obiekt typu słownik
  Backbone.history.navigate(route, options);
};

//metoda zwracająca obecny adres url
ContactManager.getCurrentRoute = function(){
  return Backbone.history.fragment
};

//ustalamy co ma robic nasza aplikacja po tym jak zostanie odpalona.
ContactManager.on("initialize:after", function(){
  if(Backbone.history){//sprawdzamy czy backbone.history jest aktywny
    Backbone.history.start();//odpalamy router metodą start()

    if(this.getCurrentRoute() === ""){//sprawdzamy czy obecny url jest pusty
      ContactManager.trigger("contacts:list");//jeśli tak ustawiamy jego wartość na contacts:list. bedzie to wartosc domyślna
    }
  }
});