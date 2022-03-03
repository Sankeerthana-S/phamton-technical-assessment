const multer = require('multer')
const express = require('express')

const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cd)=>{
       cd(null, 'assests') 
    },
    filename: (req, file, cb)=>{
        const error = file.mimetype === 'image/jpeg' ? null : new Error('wrong file');
        cb(error, `${file.fieldname}-${now()}`);
    }
})

const upload = multer({storage: storage})

app.post('/upload', upload.single("image"), (req, res)=>{
    res.send('uploaded successfully')
})


app.use(express.static('view.html'))
app.listen(8081, ()=>{
    console.log('Navigate to localhost:8081');
})