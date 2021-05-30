import Dexie from 'dexie'

const db = new Dexie('DoonDukan');
db.version(1).stores(
    { cart: "++id,product_id,quantity,product" }
)

export const cart_read = () => {
    let data = [];
    return new Promise((resolve, reject) =>{
        db.cart.each(item => data.push(item))
        .then(() =>{
            resolve(data)
        }).catch((err) =>{
            reject(err)
        })
    })
}

export const cart_insert = (item) => {
    return new Promise((resolve, reject) =>{
        db.cart.add(item)
        .then((response) =>{
            resolve(response)
        }).catch((err) =>{
            reject(err)
        })
    })
}

export const cart_update = (id, quantity) => {
    return new Promise((resolve, reject) =>{
        db.cart.update(id, {quantity:quantity})
        .then((response) =>{
            resolve(response)
        }).catch((err) =>{
            reject(err)
        })
    })
}

export const cart_delete = (id) => {
    return new Promise((resolve, reject) =>{
        db.cart.delete(id)
        .then((response) =>{
            resolve(response)
        }).catch((err) =>{
            reject(err)
        })
    })
}

export const cart_truncate = () => {
    return new Promise((resolve, reject) =>{
        db.cart.where("id").above(0).delete()
        .then((response) =>{
            resolve(response)
        }).catch((err) =>{
            reject(err)
        })
    })
}

