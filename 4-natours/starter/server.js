const doten = require('dotenv');
doten.config({ path: './config.env' });
const app = require('./app');
console.log(process.env);
const port = process.env.PORT;
app.listen(port, () => {
  console.log('server listening on port 3000');
});
