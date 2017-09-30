/**
 * @description
 * Aquarius Manager App Cloud Functions
 *
 * @author http://www.github.com/nncl
 */

const functions = require('firebase-functions')
    , admin = require('firebase-admin')
    , config = require('./config')
    , OneSignal = require('./onesignal');

admin.initializeApp(functions.config().firebase);

/**
 * @description
 *
 * Cloud function responsável por disparar Push Notification
 * quando o PH e Temperatura saem do nível regular especificado
 * pelo cliente no nosso banco de dados Firebase.
 *
 */

const addToLog = (message, type) => {
    admin.database().ref('/logs').push({message: message, type: type});
};

const sendNotification = (message) => {

    OneSignal.sendNotification(message).then(
        (res) => {
            addToLog(res, 'success');
        }
        , (err) => {
            addToLog(err, 'error');
        }
    );

};

exports.verifyPH = functions.database.ref('/-KtEei-K13DSQCJfSJKd/ph_atual').onWrite(event => {

    function doStuff() {
        const currentValue = event.data.val()
            , log = 'O valor do PH atual mudou para ' + currentValue;

        addToLog(log, 'PH');
    }

    return doStuff();

});

exports.verifyTemperature = functions.database.ref('/-KtEei-K13DSQCJfSJKd/temp_atual').onWrite(event => {

    function doStuff() {
        const currentValue = event.data.val()
            , log = 'O valor da Temperatura atual mudou para ' + currentValue;

        addToLog(log, 'temperature');
    }

    return doStuff();

});
