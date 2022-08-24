const fs = require('fs');

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
        }

        async createObj (objUser) {
            const data = await fs.promises.readFile("data/productos.json", "utf8");
            const objetos = JSON.parse(data);
            const id = objetos.length + 1;
            objUser.id = id;
            objetos.push(objUser);
            await fs.promises.writeFile("data/productos.json", JSON.stringify(objetos));
            return objetos;
           
        }
        async getObjById (id) {
            const data = await fs.promises.readFile("data/productos.json", "utf8");
            const objetos = JSON.parse(data);
            const objeto = objetos.find((objeto) => objeto.id == id);
            if(objeto) {
                return objeto;
            } else{
            return "Producto no existe"}
        }
        
        async getAllObjs () {
        const data = await fs.promises.readFile("data/productos.json", "utf8");
            return JSON.parse(data);
      
        }

        async deleteObjById (id) {
            const data = await fs.promises.readFile("data/productos.json", "utf8");
            const objetos = JSON.parse(data);
            const objeto = objetos.find((objeto) => objeto.id == id);
            if(objeto) {
                const index = objetos.indexOf(objeto);
                objetos.splice(index, 1);
                await fs.promises.writeFile("data/productos.json", JSON.stringify(objetos));
                return objetos;
            } else{
            return "Producto no existe"}
        }

        async deleteAllObjs () {
            const data = await fs.promises.readFile("data/productos.json", "utf8");
            const objetos = JSON.parse(data);
            objetos.splice(0, objetos.length);
            await fs.promises.writeFile("data/productos.json", JSON.stringify(objetos));
            if(objetos.lengt > 1) {
                return objetos;
            }else {
            return "NO HAY MAS PRODUCTOS"}
        }
    }



async function start () {
    const db = new Contenedor("data");

    //CREADOR DE PRODUCTO 
    const objeto = 
    await db.createObj({ title:"escuadra", precio: "100", id:1, thubnail: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"});
    console.log(objeto);
    
    // BUSCADOR DE TODOS LOS PRODUCTOS
    // const objs = await db.getAllObjs();
    // console.log(await objs);

    // BUSCADOR DE PRODUCTO POR ID
    // const producto = await db.getObjById(3)
    // console.log(producto);

    // ELIMINADOR DE PRODUCTO POR ID
    // const producto = await db.deleteObjById(4)
    // console.log(producto);

    // ELIMINADOR DE TODOS LOS PRODUCTOS
    // const producto = await db.deleteAllObjs()
    // console.log(producto);

    }
    start();