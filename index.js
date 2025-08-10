const dotenv = require('dotenv');
let port, app;

dotenv.config();
app = require('./app');
port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
