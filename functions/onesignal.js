/**
 * @description
 * Módulo responsável por enviar notificação via One Signal API
 *
 * @type {*}
 */

const request = require("request")
    , Q = require("q")
    , config = require("./config");

/**
 * @description
 * Envia notificação para todos os segmentos do app
 *
 * @param message
 */

module.exports.sendNotification = (message) => {

    let d = Q.defer();

    const options = {
        url: 'https://onesignal.com/api/v1/notifications'
        , headers: {
            'Authorization': 'Basic ' + config.oneSignal.API_KEY
            , 'Content-Type' : 'application/json'
        }
        , form: {
            "app_id": config.oneSignal.APP_ID,
            "contents": {"en": message},
            "included_segments": "All"
        }
    };

    request.post(options, (err, httpResponse, body) => {
        if (err) {
            d.reject(err)
        } else {
            d.resolve(body);
        }
    });

    return d.promise;

};
