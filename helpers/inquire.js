const inquire = require ('inquirer');
require ('colors');

const preguntas=[{
    type:'list',
    name: 'opcion',
    message:'¿Qué desea hacer?...',
    choices:[{
        value: 1,
        name:`${'1'.green}. Buscar Ciudad.-`
    },
    {
        value:2,
        name:`${'2'.green}. Historial de Ciudades.-`
    },
    {
        value:0,
        name:`${'0'.green}. Salir de la App.-`
    }]
}];

const inquireMenu = async ()=>{

    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opcion'.green);
    console.log('=======================\n'.green);

    const {opcion} = await inquire.prompt(preguntas);
    return opcion;

}

const inquirePausa=async ()=>{
const pausa = [{
    type:'input',
    name:'pausa',
    message:`Para continuar presione ${'Enter'.green}:...`
}]
    return await inquire.prompt( pausa );
}

const leerInput = async ( message )=>{
    const pregunta = [{
        type:'input',
        name:'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Por favor ingresa un valor...'.red;
            }else{
                return true;
            }
        }
    }]

    const {desc} = await inquire.prompt(pregunta);
    return desc;
}

const seleccionarCiudad = async ( ciudades =[]) =>{

    const choices= ciudades.map((ciudad, indice)=>{
        const idx=`${indice+1}.`.green;
        return {
            value:`${ciudad.id}`,
            name:`${idx}${ciudad.nombre}`
        }
    })
    choices.unshift({
        value:'0',
        name:'0.'.green + 'Cancelar'
    })
    const question=[{
        type:'list',
        name:'id',
        message:'Seleccione la ciudad que busca...',
        choices
    }]

    let {id} = await inquire.prompt(question);
    return id;
}

const confirmar = async (message)=> {

    const question = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];

    const {ok}= await inquire.prompt(question);
    return ok;

}

const menuMarcaCompletadas = async ( tareas =[]) =>{

    const choices= tareas.map((tarea, indice)=>{
        const idx=`${indice+1}.`.green;
        return {
            value:`${tarea.id}`,
            name:`${idx}${tarea.descripcion}`,
            checked: (tarea.completadoEn)? true : false
        }
    })
    const questions=[{
        type:'checkbox',
        name:'ids',
        message:'Marque las que haya completado',
        choices
    }]

    let {ids} = await inquire.prompt(questions);
    return ids;
    // {
    //     value: '1',
    //     name:`${'01'.green}. Crear tarea.-`
    // }

}
module.exports={
    inquireMenu,
    inquirePausa,
    leerInput,
    seleccionarCiudad,
    confirmar,
    menuMarcaCompletadas
}

