const userController = require("../controllers/usersController")
const request = require('supertest')
const app = require('../app')


let userToken = null
let emailId = null
let id = null

describe('Auth Endpoints', () => {


    it('Post/ login - field required ', async () => {
        const res = await request(app).post('/login')
            .send({
                "email": "",
                "password": ""
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty("msg", "All field required")
    })

    it('Post/ login - Wrong credential ', async () => {
        const res = await request(app).post('/login')
            .send({
                "email": "yash@gmail.com",
                "password": "wrongpassword"
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Please enter correct email and password !!")
    })

    it('Post/ login - success ', async () => {
        const res = await request(app).post('/login')
            .send({
                "email": "yash@gmail.com",
                "password": "yash"
            })
        userToken = res.header
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("msg", "Login Sucessfully")
    })

})

describe('Users(CRUD) Endpoints', () => {



    // get all users unit testing 
    it('get/ all users - fail, Token not found  ', async () => {
        const res = await request(app).get('/getusers')
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "token not found")

    })

    it('get/ all users - fail, Invalid Token  ', async () => {
        const res = await request(app).get('/getusers')
            .set('Accept', 'application/json')
            .set({
                'Authorization': "hbc73" + userToken['authorization']
            })
        // here token make invalid by adding additional string

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Invalid Token")

    })

    it('get/ all users - success ', async () => {
        const res = await request(app).get('/getusers')
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("msg", "success")
    })





    // create user unit test's
    it('post/ create users - fail, Token not found', async () => {
        const res = await request(app)
            .post('/createuser')
            .send({
                "name": "",
                "email": "",
                "mobile": "",
                "password": "",
                "token": ""
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "token not found")
    })

    it('post/ create users - fail, Invalid Token', async () => {
        const res = await request(app)
            .post('/createuser')
            .set('Accept', 'application/json')
            .set({'Authorization': "ckbscb" + userToken['authorization']}) // add string to make invalid token 
            .send({
                "name": "",
                "email": "",
                "mobile": "",
                "password": "",
                "token": ""
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Invalid Token")
    })

    it('post/ create users - fail, all field required', async () => {
        const res = await request(app)
            .post('/createuser')
            .set('Accept', 'application/json')
            .set({'Authorization': userToken['authorization']})
            .send({
                "name": "",
                "email": "",
                "mobile": "",
                "password": "",
                "token": ""
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty("msg", "All field required")
    })

    it('post/ create users - fail , email id already use ', async () => {
        emailId = `yash@gmail.com`  // this id alreday use
        const res = await request(app)
            .post('/createuser')
            .set('Accept', 'application/json')
            .set({'Authorization': userToken['authorization']})
            .send({
                "name": "test",
                "email": emailId,
                "mobile": "+91 1231231234",
                "password": "test",
                "token": ""
            })
        expect(res.statusCode).toEqual(500)
    })

    it('post/ create users - success ', async () => {
        let n = Math.random()
        emailId = `testing${n}@gmail.com`
        const res = await request(app)
            .post('/createuser')
            .set('Accept', 'application/json')
            .set({'Authorization': userToken['authorization']})
            .send({
                "name": "test",
                "email": emailId,
                "mobile": "+91 1231231234",
                "password": "test",
                "token": ""
            })
        id = res.body.data['_id']
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })





    // get single use unit test's

    it('get/ single users data - fail, Token not found', async () => {
        const res = await request(app)
            .get(`/getsingleuser/${id}`)

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "token not found")
    })

    it('get/ single users data - fail, Invalid Token', async () => {
        const res = await request(app)
            .get(`/getsingleuser/${id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': "bcjbjc" + userToken['authorization']
            })

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Invalid Token")
    })

    it('get/ single users data - fail, Invalid user Id', async () => {
        let Inavlid_id = "63dcb3e449899aa8906f4ece5fe"
        const res = await request(app)
            .get(`/getsingleuser/${Inavlid_id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Id not valid")
    })

    it('get/ single users data - success', async () => {
        const res = await request(app)
            .get(`/getsingleuser/${id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })
        expect(res.statusCode).toEqual(200)
    })





    // update user unit test's

    it('post/ update users- fail, token not found', async () => {
        const res = await request(app)
            .post(`/edituser/${id}`)
            .send({
                "name": "test",
                "email": emailId,
                "mobile": "+91 0909090909",
                "password": "test",
                "token": ""
            })

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "token not found")

    })

    it('post/ update users - fail, Invalid token', async () => {
        const res = await request(app)
            .post(`/edituser/${id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': "nkjhds" + userToken['authorization']
            })
            .send({
                "name": "test",
                "email": emailId,
                "mobile": "+91 0909090909",
                "password": "test",
                "token": ""
            })

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Invalid Token")

    })

    it('post/ update users - fail, All field required', async () => {
        const res = await request(app)
            .post(`/edituser/${id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })
            .send({
                "name": "",
                "email": "",
                "mobile": "",
                "password": "",
                "token": ""
            })

        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty("msg","All field required")
    })

    it('post/ update users - fail, invalid user id', async () => {
        let Inavlid_id = "63dcb3e449899aa8906f4ece5fe"
        const res = await request(app)
            .post(`/edituser/${Inavlid_id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })
            .send({
                "name": "test",
                "email": emailId,
                "mobile": "+91 0909090909",
                "password": "test",
                "token": ""
            })

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Id not valid")

    })

    it('post/ update users - success', async () => {
        const res = await request(app)
            .post(`/edituser/${id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })
            .send({
                "name": "test",
                "email": emailId,
                "mobile": "+91 0909090909",
                "password": "test",
                "token": ""
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("msg", "Data Update Sucessfully")

    })




    // delete use unit test's

    it('post/ delete users - fail, token not found ', async () => {
        const res = await request(app)
            .get(`/deleteuser/${id}`)
            
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "token not found")

    })

    it('post/ delete users - fail, Invalid Token ', async () => {
        const res = await request(app)
            .get(`/deleteuser/${id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': "djssd" + userToken['authorization']
            })

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Invalid Token")

    })

    it('post/ delete users - fail, invalid user Id ', async () => {
        let Inavlid_id = "63dcb3e449899aa8906f4ece5fe"
        const res = await request(app)
            .get(`/deleteuser/${Inavlid_id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("msg", "Id not valid")
    })

    it('post/ delete users - success ', async () => {
        const res = await request(app)
            .get(`/deleteuser/${id}`)
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })

        expect(res.statusCode).toBe(200)

    })




    // logout unit test's
    it('get- logout usres', async () => {
        const res = await request(app)
            .get('/logout')
            .set('Accept', 'application/json')
            .set({
                'Authorization': userToken['authorization']
            })

        expect(res.statusCode).toBe(200)
    })

})