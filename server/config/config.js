// ====Puerto=====
process.env.PORT = process.env.PORT || 3000


// ====Puerto=====
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/first'
}else{
    urlDB = 'mongodb+srv://antonio:Motorola1512@cluster0-ly5cn.mongodb.net/test'
}

process.env.URLDB = urlDB;