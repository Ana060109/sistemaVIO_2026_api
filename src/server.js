const app = require("./index");
const cors= require('cors');

const corsOptions = {
    origin: '*', // substitua pela origem permitida
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.listen(5000);