import Expo from "expo";
import fetch from "cross-fetch";

const {manifest} = Expo.Constants;
const host = manifest.packagerOpts.dev ? manifest.debuggerHost.split(':').shift().concat(':3000') : 'http://produrl.com';

export default function (path, options) {
    return fetch(`http://${host}${path}`, options)
}