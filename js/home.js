$(document).ready(function() {
  // alert('hola');
  var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // firebase.auth().signInWithPopup(provider).then(function(result) {
  /* var token = result.credential.accessToken;
        var user = result.user;*/
  // });
  $('#btn-hola').on('click', function() {
    // alert('hola');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      /* var token = result.credential.accessToken;
            var user = result.user;*/
      /* console.log(result);
            console.log(result.user.email);
            console.log(result.user.displayName);
            console.log(result.user.photoURL);
            console.log(result.user.uid);
            console.log(result.additionalUserInfo.profile.gender);*/
      saveData(result.user);
    });
  });
  function saveData(user) {
    var userToSave = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      preference: ['ninguno']
    };
    console.log(userToSave);
    firebase.database().ref('users/' + user.uid).set(userToSave);
  };
  
  $('#btn-estreno').on('click', function() {
    firebase.database().ref('estrenos').on('value', function(snapshot) {
      console.log(snapshot.val()[0].Title);
      var a = Object.keys(snapshot.val());
      var b = a.length;
      for (var i = 0; i < b; i++) {
        var poster = snapshot.val()[i]['Poster'];
        // console.log(snapshot.val()[i]['Title']);
        // $('.peliculas').append('<img src="' + poster + '">');
        var $imgMovies = '<img  class="img-movies" src="' + poster + '">';
        $('.peliculas').append('<div class="div-movies">' + $imgMovies + '</div>');
      }
    });
  });
  // ----------- imagenes oscars -----------
  
  firebase.database().ref('oscar').on('value', function(snapshot) {
    console.log(snapshot.val()[0].Title);
    var keysOscars = Object.keys(snapshot.val());
    var oscarsLength = keysOscars.length;
    for (var i = 0; i < oscarsLength; i++) {
      var posterOscar = snapshot.val()[i]['Poster'];
      // console.log(snapshot.val()[i]['Title']);
      // $('.peliculas').append('<img src="' + poster + '">');
      // '<img  class="img-autoplay" src="' + posterOscar + '">';
      $('.slider-nav').append('<div data-toggle="modal" data-target="#myModal"><img src="' + posterOscar + '" alt=""></div>');
    }
  });
   
  // --------- imagenes las mas premiadas ----------
  $('#btn-oscars').on('click', function() {
    firebase.database().ref('oscar').on('value', function(snapshot) {
      console.log(snapshot.val()[0].Title);
      var keysOscars = Object.keys(snapshot.val());
      var oscarsLength = keysOscars.length;
      for (var i = 0; i < oscarsLength; i++) {
        var posterOscar = snapshot.val()[i]['Poster'];
        // console.log(snapshot.val()[i]['Title']);
        // $('.peliculas').append('<img src="' + poster + '">');
        var $imgMoviesOscars = '<img  class="img-movies" src="' + posterOscar + '">';
        $('.peliculas').append('<div class="div-movies">' + $imgMoviesOscars + '</div>');
      }
    });
  });
  // --------------- imagenes para mis colecciones-------------
  $('#btn-oscars').on('click', function() {
    firebase.database().ref('oscar').on('value', function(snapshot) {
      console.log(snapshot.val()[0].Title);
      var keysOscars = Object.keys(snapshot.val());
      var oscarsLength = keysOscars.length;
      for (var i = 0; i < oscarsLength; i++) {
        var posterOscar = snapshot.val()[i]['Poster'];
        // console.log(snapshot.val()[i]['Title']);
        // $('.peliculas').append('<img src="' + poster + '">');
        var $imgMoviesOscars = '<img  class="img-movies" src="' + posterOscar + '">';
        $('.peliculas').append('<div class="div-movies">' + $imgMoviesOscars + '</div>');
      }
    });
  });
  /* $('#btn-user').on('click', function() {
        firebase.database().ref('users.uid').on('value',function(snapshot){
            console.log('snapshot');
        });
    });*/
  // -------------------------------------------------------------
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    initialSlide: 2,
    arrows: true
  });
});