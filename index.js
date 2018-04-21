const app = require('./backend/server');
const config = require('./config');

app.listen(config.port, () => {
  console.log('Server running on port 4000');
});