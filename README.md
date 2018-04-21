# movies

## Installation

### Docker
To setup the project with docker just run
```
sudo docker-compose up -d
```
Then just open [http://localhost:4000/](http://localhost:4000/)<br>

### Manual
To setup the project manually run `npm install`. If buildMode in config.js is set to production run `npm run build`<br>
Specify the mongodb connection string in config.js file. If database runs locally it should be

```
...
db: 'mongodb://localhost/movies',
...
```
Run `npm start` and open [http://localhost:4000/](http://localhost:4000/)

## Config
All the config is stored in the config.js file.<br>
`port` - port on which the app will be served<br>
`db` - mongodb connection string<br>
`buildMode` - app build mode, either production or development

>Tip: to run the app inside docker with nodemon, change command in the docker-compose.yml file to `npm run dev`
```yml
...
movies:
    build: .
    command: npm run dev
...
```