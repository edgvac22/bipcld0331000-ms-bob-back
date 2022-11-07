# Demo NestJS - Serverless - DynamoDB (local) 

## Descripción

En este repositorio se estará trabajando el backend de B.O.B. de manera local, mientras no se tenga el código de aplicación. Una vez se tenga, se eliminará este repositorio, y se creará uno que haga referencia al código de la aplicación.

## Prerrequisitos

- [DynamoDB local (Docker)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html): crea un archivo docker-compose.yml, usa el primer script y haz el punto 3.
- NodeJS v.16.
- AWS CLI

## Crear tabla de Base de datos

Copiar el siguiente código en algún CLI.

```bash
aws dynamodb create-table `
      --table-name bob `
      --attribute-definitions `
          AttributeName=issueId,AttributeType=S `
          AttributeName=verify,AttributeType=S `
          AttributeName=solutionId,AttributeType=S `
      --key-schema AttributeName=issueId,KeyType=HASH `
      --provisioned-throughput ReadCapacityUnits=100,WriteCapacityUnits=100 `
      --global-secondary-indexes `
          '[
              {
                 \"IndexName\": \"verify-index\",
                 \"KeySchema\": [
                     {\"AttributeName\":\"verify\",\"KeyType\":\"HASH\"}
                 ],
             \"Projection\": {
                 \"ProjectionType\":\"ALL\"
             },
             \"ProvisionedThroughput\": {
                  \"ReadCapacityUnits\": 100,
                  \"WriteCapacityUnits\": 100
                  }
              },
              {
                 \"IndexName\": \"solutionId-index\",
                 \"KeySchema\": [
                     {\"AttributeName\":\"solutionId\",\"KeyType\":\"HASH\"}
                 ],
             \"Projection\": {
                 \"ProjectionType\":\"INCLUDE\",
                 \"NonKeyAttributes\":[\"area\", \"environment\", \"solutionUser\", \"solutionTitle\", \"solutionDetail\", \"solutionAttachment\", \"dateUpdated\"]
             }, 
             \"ProvisionedThroughput\": {
                  \"ReadCapacityUnits\": 100,
                  \"WriteCapacityUnits\": 100
                  }
              }]' `
      --endpoint-url http://localhost:8000
```

## Crear archivo .env

Se debe crear el archivo con los siguientes valores dentro de la carpeta src/
```
DYNAMODB_ENDPOINT = 'http://localhost:8000'
IS_OFFLINE = 'true'
REGION = 'localhost'
```

## Instalación 

```bash
$ npm install
```

```bash
$ npm run build
```

## Correr la aplicación

```bash
$ npm run local
```
