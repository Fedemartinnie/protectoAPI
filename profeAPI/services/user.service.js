// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}


exports.checkUserExists = async function (email) {
    try {
        const existingUser = await User.findOne({ email });       
        return existingUser !== null;
    } catch (error) {
        console.error(error);
        throw new Error("Error al verificar la existencia del usuario");
    }
};

exports.createUser = async function (newUser) {    
    //var hashedPassword = bcrypt.hashSync(user.password, 8);
    try {
        newUser.password = bcrypt.hashSync(newUser.password, 8);
        console.log("email: ",newUser.email);
        const userExists = await exports.checkUserExists(newUser.email);
        console.log(userExists)
        if (!userExists) {
            // Guardar el usuario
            const savedUser = await User.create(newUser);

            // Crear un token para el nuevo usuario
            const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
                expiresIn: 86400 // expira en 24 horas
            });
        
            return { user: savedUser, token };
        }
        else{
            return res.status(409).json({message: "usuario ya registrado"})
        }    
    }   catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        res.status(400).json({message: "error al registrar usuario"})
    }
}

exports.updateUser = async function (user) {
    
    //var id = {_id :user.id}
    var id = {name: user.name}
    console.log(id)
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne(id);
        console.log (oldUser)
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.name = user.name
    oldUser.email = user.email
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("An Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {
    console.log(id)
    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {
    
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:" ,user)
        console.log("email:" ,user.email)
        console.log("password:" ,user.password)
        var _details = await User.findOne({
            email: user.email
        });
        if(!_details){
            res.status(400).json({message: "email invalido"})
        }
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        console.log("valida??? "+passwordIsValid)
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}


exports.logout = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    // Verifica si la ruta es de logout y realiza las acciones correspondientes
    if (req.path === '/api/users/logout') {
        // Invalida el token y responde con éxito
        const decoded = jwt.decode(token, { complete: true });
        revokedTokens.push(decoded); // Agrega el token a la lista de revocados
        console.log("revoked Token: ================================\n",
                    revokedTokens)
        return res.json({ message: 'Logout exitoso' });
      }
      // Resto del middleware de autorización
    var msg = { auth: false, message: 'No token provided.' };
    if (!token) return res.status(500).send(msg);

    let sec = process.env.SECRET;
    jwt.verify(token, sec, function (err, decoded) {
        var msg = { auth: false, message: 'Failed to authenticate token.' };
        if (err) return res.status(500).send(msg);

        // Verifica si el token está revocado
        if (revokedTokens.some((revoked) => revoked.payload.jti === decoded.jti)) {
        return res.status(401).json({ message: 'Token revocado' });
        }

        req.userId = decoded.id;
        next();
    });
  };
  