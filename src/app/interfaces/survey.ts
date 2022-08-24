export interface Survey {

    id: Number, 
    name: string,
    fecha_creacion: Date,
    creado_por:string,
    activo: Boolean
    preguntas:[_pregunta ]

}


export interface _pregunta {
    id:Number,
    text:string,
    options:any[]
}
