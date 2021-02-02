const mongoose = require('mongoose');
const Product = require('../models/product');
const db = require('../db/db');
db();

const products = [
    new Product({
        imgPath: "https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y",
        title: "Cozy Dog",
        description: "Man's Best Friend!!!",
        price: 250
    }),
    new Product({
        imgPath: "https://picsum.photos/536/354",
        title: "Cutie Pup",
        description: "Bestest Bud!!!",
        price: 150
    }),
    new Product({
        imgPath: "https://picsum.photos/id/237/200/300",
        title: "Black Canary",
        description: "Back is Beautiful!!!",
        price:300
    }),
    new Product({
        imgPath: "https://picsum.photos/id/1024/1920/1280",
        title: "Rising Eagle",
        description: "Keep Soaring!!!",
        price:1200
    }),
    new Product({
        imgPath: "https://picsum.photos/id/1074/367/267",
        title: "Cheetah le cheater",
        description: "growl!!!",
        price:3400
    }),
    new Product({
        imgPath: "https://picsum.photos/id/169/367/267",
        title: "It's Bingo time",
        description: "Man has so may friends!!!",
        price:400
    })

];

let done = 0;

for(let i= 0; i < products.length; i++){
    products[i].save((err, result) => {
        done++;
        if(done === products.length){
            mongoose.disconnect();
            console.log('added and disconnected');
        }
    })
}