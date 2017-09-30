/**
 * @description
 * Arquivo gerado para testes.
 */

const OneSignal = require("./onesignal");

OneSignal.sendNotification('Hi you').then(
    (res) => {
        console.log(res);
    }
    , (err) => {
        console.error(err);
    }
);