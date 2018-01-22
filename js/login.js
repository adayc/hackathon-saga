$(document).ready(function() {
  var $loginEmail = $('#email-login');
  var $email = $('#email');
  var $password = $('#password');

  var $loginGoogle = $('#google-login');

  
  $('#continue').css('display', 'none');

  // Login con Google
  var providerGoogle = new firebase.auth.GoogleAuthProvider();

  $loginGoogle.click(function() {
    firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
      console.log(result.user);
      window.localStorage.setItem('storageUID', result.user.uid);
      saveData(result.user);
      // Guardando el UID en el localstorage
      var UID = window.localStorage.getItem('storageUID');
      console.log(UID);

      // Redireccionando al perfil
      alert('Registro exitoso');

      $loginGoogle.css('display', 'none');
      
      $('#continue').css('display', 'inline-block');
  
      // window.location.href = 'home.html';
    });
  });

  $('#continue').click(function() {
    // Redireccionando al perfil

    window.location.href = 'home.html';
  });
 

  function saveData(user) {
    console.log(user);
    var userToSave = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    };
      // probando es el nombre de tu rama
    firebase.database().ref('users/' + user.uid).set(userToSave); // push añade un registro 
  }
});

