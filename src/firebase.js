import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyB8jr04gCJTwmPE7RTOCBBS3_GoQvRthUk',
    authDomain: 'upload-file-with-progressbar.firebaseapp.com',
    databaseURL: 'https://upload-file-with-progressbar.firebaseio.com',
    projectId: 'upload-file-with-progressbar',
    storageBucket: 'upload-file-with-progressbar.appspot.com',
    messagingSenderId: '136301588472',
    appId: '1:136301588472:web:dcad274bd4de7411aa300d',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
