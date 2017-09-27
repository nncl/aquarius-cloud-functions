/**
 * @description
 * Arquivo gerado para testes.
 */

const OneSignal = require("./onesignal");

OneSignal.sendNotification('Testing bro').then(
    (res) => {
        console.log(res);
    }
    , (err) => {
        console.error(err);
    }
);