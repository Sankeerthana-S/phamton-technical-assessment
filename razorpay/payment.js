const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const Razorpay = require('razorpay')
const { param } = require('express/lib/request')
require('dotenv').config()

const app = express()
const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.set('view engine', 'ejs')

app.get('/payment', (req,res)=>{
    res.render('payment', {key: process.env.KEY_ID})
})

app.post('/payment/order', (req,res)=>{
    let params = req.body
    instance.orders
        .create(params)
        .then((data)=>{
            res.send({ sub: data, status: 'success'})
        })
        .catch((err)=>{
            res.send({sub: err, status:'failed'})
        })
})

app.post('/payment/verify', (req, res)=>{
    
    let body = req.body.response.razorpay_order_id+ "|"+ req.body.response.razorpay_payment_id

    var expectedSign = crypto.createHmac('sha256', process.env.KEY_SECRET)
                .update(body.toString())
                .digest('hex')

    console.log('Gotsig - '+ req.body.response.razorpay_signature);
    console.log('Expsig - '+ expectedSign);
    var response = {status: 'Failure'}
    if(req.body.response.razorpay_signature === expectedSign)
        response = {status: 'Success'}

    res.send(response)
})

app.listen(8086, ()=>{
    console.log('Navigate to URL http://localhost:8086/payment');
})
