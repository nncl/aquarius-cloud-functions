/**
 * @description
 * Aquarius Manager App Cloud Functions
 *
 * @author www.github.com/nncl
 */

const functions = require('firebase-functions')
    , admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

/**
 * @description
 *
 * Cloud function responsável por disparar Push Notification
 * quando o PH e Temperatura saem do nível regular especificado
 * pelo cliente no nosso banco de dados Firebase.
 *
 */

exports.addMessage = functions.https.onRequest((req, res) => {
    const original = req.query.text;
    admin.database().ref('/messages').push({original: original}).then(snapshot => {
        res.send('Message saved into database successfully');
    });
});

