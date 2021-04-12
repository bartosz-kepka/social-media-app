Team members:

[Jakub Cywiński](https://github.com/xjakubcywinski)

[Dorota Nowakowska](https://github.com/doritos12)

[Patryk Kaca](https://github.com/Patrykaca)

[Jakub Podwysocki](https://github.com/Topeeerz)

[Bartosz Kępka](https://github.com/bartosz-kepka)

# social-media-app

# IMPORTANT: To test on other devices (e.g. smartphone): 
- enable ports used by the backend and frontend (8080, 8180 and 8280 by default) for tcp connections in your firewall service
- in files <b>src/axios/index.js</b> (line 4) and <b>src/main.js</b> (line 17) replace ```localhost``` with your computer's local IP address (displayed in console by ```npn run serve``` when app is running)
- use your computer's local network IP address (e.g. http://192.168.31.5:8280/login), not localhost (e.g. http://localhost:8280/login) when change from previous point is applied
- the other device (e.g. smartphone) must be connected to the same local network as your computer is 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
