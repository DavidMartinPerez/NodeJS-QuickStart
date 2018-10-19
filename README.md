# NodeJS-QuickStart

## Aprendiendo NodeJs

## Proyecto Pocket Monsters
Crea, evoluciona y visita tus propias criaturas

- Backend: Api rest en NodeJs
- FrontEnd: Angular
- BBDD: MongoDB

----
Es una pequeña Aplicación para empezar con NodeJS, simplmente tenemos una pequeña interfaz en frontal con Angular 6 y una pequeña api rest en NodeJS que se encarga de guardar y recuperar la información de la base de datos de MongoDB.

En la app puedes crear 'Monsters', editarlos, eliminarlos e incluso subir su propia imagen, todo echo desde NodeJS en servidor.

-----
# Arrancar el proyecto
- Tendremos que tener instalado MongoDB y creado una BBDD llamada 'pocketMonster' con una colección llamada 'monsters', el fichero de la BBDD esta en la carpeta /mongodb/... , mis BBDD estan en el puerto :27017, puerto por defecto.

- 'npm i' para las dependencias tanto en /backend-rest-nodejs como en /pocket-monsters.

- 'npm start' para arrancar la ApiRest (en su carpeta)

- ng serve -o para el frontal de Angular (en su carpeta)