import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC4Q8EMrvma5Imt4ZsLKMetbpYIPXSsBsI",
    authDomain: "pokedex-8070d.firebaseapp.com",
    databaseURL: "https://pokedex-8070d.firebaseio.com",
    projectId: "pokedex-8070d",
    storageBucket: "pokedex-8070d.appspot.com",
    messagingSenderId: "862022056271",
    appId: "1:862022056271:web:dbae114b3f420034696d3a"
};
firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();