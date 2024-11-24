import { addNewContact, getAllContact } from "../controllers/crmController"
import { login, loginRequest, register } from "../controllers/userController"

const routes=(app)=>{
    app.route("/contact")
    .get(loginRequest, getAllContact)

    .post(loginRequest, addNewContact)

    app.route("/contact/contactId")
    .put((req, res)=>{
        res.send("PUT Successfully")
    })

    .delete((req, res)=>{
        res.send("PUT Successfully")
    })

    app.route("/auth/register")
    .post(register)

    app.route("/login")
    .post(login)
}

export default routes;