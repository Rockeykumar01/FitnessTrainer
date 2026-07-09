import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)      // email+password
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        next()   // callback function 
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// req.body.userId = token_decode.id   -> we don't have to send any id in the request because there is only one admin 
export default authAdmin;

// what is the use of this middleware -> 
//  if a person has authentication of a admin than only he can add or remove trainers 

/*
### Admin Authentication Middleware Explanation

This function is responsible for **authorizing admin users** before allowing them to access protected admin routes. It acts as a security layer between the client request and the backend controllers.

When an admin successfully logs in, the server generates a **JSON Web Token (JWT)** containing the admin's identity and other required information. This token is digitally signed using a secret key and is sent back to the client. The client stores this token (typically in local storage, session storage, or a cookie) and includes it in the **Authorization header** of every request made to protected admin endpoints.

Whenever a request reaches an admin-only route (such as adding, updating, or deleting trainers, or accessing the admin dashboard), this middleware executes before the actual controller function.

The middleware performs the following steps:

1. Retrieves the JWT from the request headers.
2. Verifies the token using `jwt.verify()` and the server's secret key.
3. If the token is valid, it confirms that the request is coming from an authenticated admin. The request is then allowed to continue to the next middleware or controller using `next()`.
4. If the token is missing, expired, tampered with, or invalid, the verification fails. In this case, the middleware immediately stops the request and returns an error response such as **"Not Authorized. Login Again."**

Because every protected admin route passes through this middleware, only authenticated administrators can perform sensitive operations such as:

* Accessing the admin dashboard.
* Adding new trainers.
* Updating trainer information.
* Removing trainers.
* Managing other admin-only resources.

Regular users who do not possess a valid admin JWT cannot access these routes, even if they manually try to call the API. This approach ensures that administrative functionalities remain secure and inaccessible to unauthorized users.

### Request Flow

```
Admin Login
      │
      ▼
Server validates credentials
      │
      ▼
JWT Token Generated
      │
      ▼
Token sent to Client
      │
      ▼
Client stores the token
      │
      ▼
Client sends token in Authorization Header
      │
      ▼
Admin Authentication Middleware
      │
      ▼
jwt.verify(token, SECRET_KEY)
      │
 ┌────┴────┐
 │         │
Valid    Invalid
 │         │
 ▼         ▼
next()   Return Error
 │     "Not Authorized. Login Again."
 ▼
Protected Admin Controller
      │
      ▼
Admin Dashboard / Trainer Management
```

This middleware follows the **authentication and authorization** process using JWT. Authentication verifies the identity of the admin through a valid token, while authorization ensures that only authenticated admins can access protected resources. This mechanism improves the application's security by preventing unauthorized users from performing administrative actions.




*/


































































































