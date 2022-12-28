self.addEventListener('push', function(event) {
    var data = JSON.parse(event.data.text())

    const options = {
        icon: '/infal.jpg',
        body: data.body,
        tag: 'publication',
        renotify: 'true'
    }

    const promiseChain = self.registration.showNotification(data.title, options)

    event.waitUntil(promiseChain)
})

self.addEventListener('notificationclick', (event) => {
    const clickedNotification = event.notification
    clickedNotification.close()
    
    const urlToOpen = new URL('http://localhost:3000', self.location.origin).href;

    const promiseChain = clients
    .matchAll({
        type: 'window',
        includeUncontrolled: true,
    })
    .then((windowClients) => {
        let matchingClient = null;

        for (let i = 0; i < windowClients.length; i++) {
            const windowClient = windowClients[i]

            if (windowClient.url === urlToOpen) {
                matchingClient = windowClient
                break
            }
        }

        if (matchingClient) {
            return matchingClient.focus()
        } else {
            return clients.openWindow(urlToOpen)
        }
    })

    event.waitUntil(promiseChain)
});