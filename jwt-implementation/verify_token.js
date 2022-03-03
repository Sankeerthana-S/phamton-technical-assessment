const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const secretKey = 'Its_secret'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..','/config/users.json'))).users

app.post('/login', (req,res)=>{
    const {userName, password} = req.body
    console.log(userName+ ' '+ password);
    const user = users.find(usr => {return usr.name === userName && usr.password === password})
    if(user){
        const JWT_token =jwt.sign({user: user.name, id: user.id}, secretKey)
        res.json({
            JWT_token
        })
    }
    else{
        console.log('Invalid user Name and password');
        res.send('Invalid user Name and password')
    }
})

app.get('/hi', user_verification ,(req,res)=>{
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            console.log(err);
            res.sendStatus(403)
        }
        else{
            res.json({
                message: 'Am an authorised user',
                authData
            })
        }
    })
})

function user_verification(req, res, next){
    const request_header = req.headers['authorization']
    console.log(request_header);
    if(typeof request_header !== undefined){
        req.token = request_header.split(' ')[1]
        next()
    }
    else{
        console.log('user is not verified');
        res.sendStatus(403)
    }
}


app.listen(8082, ()=>{
    console.log('Navigate to URL http://localhost:8082/login. \nRefer config/user.json for username and password ');
})