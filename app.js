const express = require('express');
const routers = require('./router/routes');
const ejs = require('ejs');
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static('views'))
app.set('view engine','ejs')
app.use(routers)


app.listen(PORT,()=>{
    console.log(`app is running on http://localhost:${PORT}`);
})