# Base de Conocimiento Banistmo (B.O.B)

## Descripción

En este repositorio se estará trabajando el backend de B.O.B, mientras no se tenga el código de aplicación. Una vez se tenga, se eliminará este repositorio, y se creará uno que haga referencia al código de la aplicación.

## Prerrequisitos

- NodeJS v.16.
- Cuenta AWS

## Crear tabla de Base de datos

Se debe agregar la plantilla `bob-dev.yml` en el CloudFormation

## Crear archivo .env

Se debe crear el archivo .env dentro de la carpeta src/
```
BOB_TABLE = 'nombreDeTuTabla'
ENVIRONMENT_AREA_TABLE = 'nombreDeTuTabla'
region = 'tuRegion'
```

## Instalación 

Instalar dependencias
`npm install`

Compilar la aplicación
`npm run build`

## Pruebas unitarias

Test
`npm run test`

Cobertura
`npm run test:cov`

## Correr la aplicación

Despliegue offline
Se debe descomentar el plugin en el serverless.yml, y correr el siguiente comando `npm run local`

Despliegue de la aplicación en sandbox
`npm run deploy`

Remover de la aplicación en sandbox
`npm run remove`

## Contribución
Desarrollado por Ingenieria de Software Banistmo

Para conocer mas de Ingeniería de Software puedes ingresar a nuestra wiki:
- [Ingeniería de Software](https://dev.azure.com/banistmo/VP%20Servicios%20Corporativos/_wiki/wikis/VP-Servicios-Corporativos.wiki/2806/6.-Ingenier%C3%ADa-de-Software)
