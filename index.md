# Práctica 11 - Cliente y servidor para una aplicación de procesamiento de notas de texto

## Introducción

En esta práctica tendrá que partir de la implementación de la aplicación de procesamiento de notas de texto que llevó a cabo en la Práctica 9 para escribir un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo net de Node.js.

## Tareas Previas

1. Acepte la asignación de GitHub Classroom asociada a esta práctica.
2. Familiarízarse con el módulo ```net``` de Node.js.
3. Familiarízarse con la clase ```EventEmitter``` del módulo Events de Node.js.
4. En esta práctica se tendrá que volver a utilizar los paquetes yargs y chalk, de un modo similar al empleado en la Práctica 9. 

## Implementación

Antes de comenzar a hablar sobre la implementación del servidor y del cliente, primero se comentarán los principales cambios que han sufrido las operaciones que se implementaron en la práctica 9 que son iguales a las que se deben implementar en está práctica. 

### Operaciones de la Aplicación de Notas

Las operaciones de la aplicación se encuentran en la carpeta ```NoteOperations``` como en la práctica 9 donde cada fichero contiene una clase donde se definen sus operaciones. 

En cada fichero se han incluido los siguientes cambios con respecto a la Aplicación de Procesamiento de Notas de la práctica 9:

  - Las operaciones que debe realizar la Aplicación de Procesamiento de Notas se han implementado usando la API asíncrona para la manipulación del sistema de ficheros. 

  - Las operaciones se ha implementado usando el patrón callback para facilitar las pruebas con código asíncrono. 
  
  - De cara a enviar mensajes al cliente a tráves del servidor, cada operación devuelve una variable en formato JSON, en el fichero ```types.ts``` podemos ver los datos que se necesitan para la respuesta al cliente:

  ```typescript
  export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Note[];
    error?: string;
  }

  export type Note = {
    title: string;
    body: string;
    color: string;
  };
  ```

  > Primero se define la operación que realiza la respuesta, después se indica si la operación fue satisfactoria o tuvo algún error, y por útimo se definen dos variables opcionales; por un lado si la operación es exitosa la aplicación debe insertar la Nota en una array de notas, y por otro lado devolver un string en caso de que haya algún error. También se puede ver que el atríbuto ```notes``` uso el tipo ```Note```, definido en este archivo.

### Cliente y Servidor

En este apartado se hablará sobre la implementación del cliente y del servidor en la Aplicación de Procesamiento de Notas.

#### Cliente

El cliente por definición realiza peticiones a un servidor para que el servidor procese dicha petición y le mande la respuesta al cliente. En este cliente lo que se realiza es una petición en formato JSON al servidor usando el tipo de dato ```RequestType``` que define los atríbutos necesarios para realizar la petición.

```typescript
export type RequestType = {
  user: string;
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  title?: string;
  body?: string;
  color?: string;
}
```

> En este caso una petición contiene los mismos atríbutos que debe recibir cada comando de la línea de comandos que se procesan usando el paquete yargs, los atríbutos title, body y color son opcionales ya que cada comando no tienen que definir todos los comandos.

Para generar está petición, al ser una aplicación con la que se interactua a través de la línea de comandos. Se debe generar la petición usando los argumentos pasados por la línea de comandos por el usuario. Los comandos de yargs para generar la petición se encuentran en el fichero ```Client-app.ts```, la petición se genera como una variable de tipo ```RequestType```. 

La petición generada se le pasa al fichero ```client.ts``` donde se define la clase client, en está clase se manda la petición al servidor usando la clase ```EventEmmiter```. En el fichero ```Client-app.ts``` se crean un objeto ```Client``` donde se le pasa como parámetro al cliente la petición realizada por el cliente.

En la clase ```Client``` nos encontramos con dos métodos:

  - El método ```client```, se crea una conexión con el servidor y se envían la petición al servidor usando la clase ```MyEventEmmiter``` y por otro lado se reciben los datos del servidor emitiendo un evento ```response``` en la clase ```MyEventEmmiter```.

  - El método ```printResult``` imprime los datos que recibe como respuesta del servidor, y dependiendo del tipo de dato se muestra una información u otra. 

Como se comento anteriormente, usando la clase ```MyEventEmmiter``` se envían los datos del cliente y se reciben los datos del servidor. Está clase la utilizo principalemente para evitar usar el método ```end``` del socket. Está clase funciona de la siguiente manera, usando el método ```writeData``` que recibe la petición como parámetro, donde primero se manda la petición al servidor y el cliente recibe los datos del servidor como respuesta y se emite un evento ```response``` que es procesado en el cliente para imprimir el resultado recibido por el servidor.

#### Servidor

Por último y no menos importante, tenemos el servidor donde se recibe la petición del cliente y se invocan a las operaciones dentro de ```NoteOperations``` con la petición que se haya recibido. 

En el fichero ```server.ts``` se crea la clase ```Server``` que tiene dos métodos:

  - El método ```server```, donde se crea el servidor y se recibe la petición del cliente.

  - El método ```serverData```, que recibe como parámetros los datos del cliente y la conexión generada por el servidor para poder cerrar la conexión parcialmente usando el método ```end``` al enviar datos al cliente.

En el primer método se crea el servidor y se emite un evento ```data``` al recibir los datos del cliente, dentro del manejador de dicho evento se guardan los datos en la variable ```clientData``` y se invoca al método ```serverData``` donde se genera la respuesta invocando a las operaciones correspondiente con ayuda de las atríbutos de ```type``` de cada ```ResquestType``` y la respuesta se manda usando el tipo de dato ```ResponseType```.

En el segundo método se reciben los datos del cliente y se invoca a cada función de la aplicación de notas dependiendo de que tipo de petición haya solicitado el cliente y tras formar el paquete de respuesta este es enviado al cliente después de que el servidor haya usado en método ```end``` y cierra la conexión con el cliente. 