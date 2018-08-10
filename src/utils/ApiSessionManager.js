import Expo from "expo";
import fetch from "cross-fetch";

const {manifest} = Expo.Constants;
const host = manifest.packagerOpts.dev ? manifest.debuggerHost.split(':').shift().concat(':3000') : 'http://produrl.com';


const unAuthClient = {
    fetch: (path, options) => fetch(`http://${host}${path}`, Object.assign({
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }, options))
};
const authClient = {
    init: (token) => {
        return ({
            fetch: (path, options) => {
                if(!token) {
                    return error('no token provided');
                }
                return fetch(`http://${host}${path}`, Object.assign({
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    })
                }, options));
            }
        });
    },

};

export { unAuthClient, authClient };
