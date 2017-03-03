'use strict';

//
// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBEyLvk5uNbqE3DCVdOeFaFyUG6W5ez_X8",
//   authDomain: "eliane-imoveis.firebaseapp.com",
//   databaseURL: "https://eliane-imoveis.firebaseio.com",
//   storageBucket: "eliane-imoveis.appspot.com",
//   messagingSenderId: "51582427423"
// };
// firebase.initializeApp(config);

template.set('imovel', [
  {name: 'title', value: 'Terreno baldio'}
])

window.addEventListener('hashchange', router.run);
window.addEventListener('load', router.run);
