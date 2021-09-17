const {leerInput, 
    inquireMenu,
    inquirePausa,
    seleccionarCiudad} = require ('./helpers/inquire');
const Busquedas = require('./models/Busquedas');


const main = async ()=>{
    const busquedas = new Busquedas;
     let opt;
    do {
        opt = await inquireMenu();
        switch (opt) {
            case 1: 
                const lugarQueBusca = await leerInput('Ciudad:...');
                const opcionesDeCiudades = await busquedas.ciudad(lugarQueBusca);
                const ciudadQueSelect = await seleccionarCiudad(opcionesDeCiudades);
                if(ciudadQueSelect === '0') continue;
                const ciudadMostrarClima = opcionesDeCiudades.find(ciudad=>ciudad.id===ciudadQueSelect);
                busquedas.agregarCiudad(ciudadMostrarClima.nombre);
                const clima = await busquedas.clima(ciudadMostrarClima.lat, ciudadMostrarClima.lng);


                
                const encabezado = '='.repeat(ciudadMostrarClima.nombre.length+19);
                
                console.clear();
                console.log();
                console.log(`${encabezado}`.green);
                console.log('  Informacion de',ciudadMostrarClima.nombre);
                console.log(`${encabezado}`.green);
                console.log()
                
                console.log(`Clima: ${clima.clima}`.green);
                console.log(`Temperatura: ${clima.temp} C.`.green);
                console.log(`Sensación: ${clima.sensacion} C.`.green);
                console.log(`Humedad: ${clima.humedad}%`.green);
                console.log(`Temperatura Máxima: ${clima.max}C.`.green);
                console.log(`Temperatura Mínima: ${clima.min}C.`.green);
                console.log(`Longitud: ${ciudadMostrarClima.lng}`.green);
                console.log(`Latitud: ${ciudadMostrarClima.lat}`.green);
               
                break;
            case 2: 
                busquedas.historialCapitalizado;
                
                break;
        }
        
        if ( opt !== 0 ) await inquirePausa();

    } while ( opt !==0);

    console.clear();

}



main();