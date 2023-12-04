const connectToMongo=require('./db');
connectToMongo();
const express = require('express')

const app = express()
const port = 5000

app.use(express.json())
//cors
const cors=require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Nani')
})

app.use('/api/blogs',require('./routes/blogs'))
app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`e-blog listening on port ${port}`)
})