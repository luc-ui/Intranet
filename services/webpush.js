import { allReq } from './services'

var sub = false

export function registerServiceWorker() {
    return navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {return registration})
        .catch((err) => console.error('Unable to register service worker.', err))
}
  
export function subscribeUserToPush(service) {
    Notification.requestPermission()
    .then((permissionResult) => {
        if (permissionResult == 'granted' && !sub) {
            sub = true

            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                'BPNcl00407yCXIsAvcKK0thzmO08rDIY1DlMyzIH0SG2dt_5G1y5gp7dHuYkBPEr-t_g--V-FSBHYiP3qXHTtjc',
                ),
            }
            console.log(subscribeOptions)
            service.then((registration) => registration.pushManager.subscribe(subscribeOptions))
            .then((pushSubscription) => allReq('/profile', "POST", {user: "lucas.dolizy.2021", push: JSON.stringify(pushSubscription)}))
        }
    })
    .catch(() => console.log("erreur"))
}
  
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4)
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
  
    var rawData = window.atob(base64)
    var outputArray = new Uint8Array(rawData.length)
  
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}
