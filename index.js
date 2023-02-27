import express from 'express';
import { fetchLinks, fetchTable, fetchImages, fetchCustom } from './functions.js'

var app = express()
const port = 3000 || process.env.PORT

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post('/api/scrape', async (req, res) => {
  switch(req.body.option){
    case 'Links':{
      let r = await fetchLinks(req.body)
      res.json(r)
      break;
    }
    case 'Table':{
      let r = await fetchTable(req.body)
      res.json(r)
      break;
    }
    case 'Images':{
      let r = await fetchImages(req.body)
      res.json(r)
      break;
    }
    case 'Custom Value':{
      let r = await fetchCustom(req.body)
      res.json(r)
      break;
    }
    default:
    res.json({success: false})
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})