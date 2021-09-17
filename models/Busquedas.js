const fs = require ('fs');

require('dotenv').config()
const axios = require ('axios');




class Busquedas {

    historial=[];
    archivoPath = './db/DataBase.json'

    constructor(){
        this.leerDB();

    }

    get historialCapitalizado(){ //el historial (this.historial) esta guardado en la data base como toLowerCase

        this.mostrarHistorial( this.historial.map( lugar=>{
            let palabra=lugar.split(' ').map( p => p[0].toUpperCase()+p.slice(1));
            return palabra.join(' '); 
            }));

    }

    get paramsMapBox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }

    
    async ciudad( lugar ){
        try {
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
    
            const resp = await instance.get();
            return resp.data.features.map( lugar =>({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
            
        } catch (error) {
            console.log(error)
        }

    }

    async clima( lat, lon){
        try {
            const instancia = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{
                    lat,
                    lon,
                    'appid':process.env.OPENWEATHER_KEY,
                    'units':'metric',
                    'lang':'es'
                }
            });

            const infoClima = await instancia.get();
            const { weather, main } = infoClima.data;

            return{
                'clima':weather[0].description,
                'temp':main.temp,
                'sensacion':main.feels_like,
                'humedad':main.humidity,
                'max':main.temp_max,
                'min':main.temp_min
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarCiudad (lugar = ''){
        if(!this.historial.includes(lugar.toLocaleLowerCase())){
            this.historial = this.historial.slice(0,4);
            this.historial.unshift(lugar.toLocaleLowerCase())
            this.escribirDB();
        }

    }

    mostrarHistorial( historialMostrar ){
        historialMostrar.forEach( (lugar, i)=>{
            const indice = `${i+1}.`.green;
            console.log(`${indice}${lugar}`);
        })
    }

    escribirDB(){

        const paraGrabar={
            historial:this.historial
        }

        fs.writeFileSync( this.archivoPath, JSON.stringify(paraGrabar) );

    }

    leerDB(){

        if(fs.existsSync(this.archivoPath)){
           const info = fs.readFileSync(this.archivoPath,{encoding:'utf-8'});
           const data = JSON.parse(info).historial;
           this.historial = data;
        }
    }
};



module.exports=Busquedas;