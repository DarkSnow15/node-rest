// ====Puerto=====
process.env.PORT = process.env.PORT || 3000


// ====Puerto=====
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/first'
}else{
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;

// ====Vencimiento token=====
// 60 seg
// 60 min
// 24 h
// 30 d
process.env.CADUCIDAD_TOKEN= 60 * 60 * 24 * 30;


// ====SEED autenticacion =====

process.env.SEED = process.env.SEED || 'SECRET'


// ====Google CLIENT_ID=====
process.env.CLIENT_ID = process.env.CLIENT_ID || '282954723664-2av6k0n6h2318obmkbkik0p4c24ngqhp.apps.googleusercontent.com';
