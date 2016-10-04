var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },

  p1: Number,
  p2: Number,
  p3: Number,
  p4: Number,
  p5: Number,
  p6: Number,
  p7: Number,
  p8: Number,
  p9: Number,
  p10: Number,
  p11: Number,
  totalTrees: { type: Number, default: ''},

  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Por favor escribe una dirección de email correcta"]
  },
  username: {
    type: String,
    unique: true,
    required: 'Nombre de usuario es obligatorio',
    trim: true
  },
  
  provider: {
    type: String,
    
  },
  providerId: String,
  providerData: {
    picture: { type: String, default: 'avatar.jpg'}
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Configurar la propiedad virtual 'fullname'
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});



//Encontrar posibles username no usados
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;

  //Añadir un sufijo 'username'
  var possibleUsername = username + (suffix || '');

//Usar el método 'findOne' del model 'User' para encontrar un username único disponible
  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    //Si ocurre un error llama al callback con un valor null, en otro caso encuentra un username disponible único
    if (!err) {
        //si un username único disponible fue encontrado llama al método callback, en otro caso llama al método 'findUniqueUsername' de nuevo con un nuevo sufijo
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

//Configura el 'ArticleSchema' para usar getters y virtuals cuando se transforme a JSON
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);