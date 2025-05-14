# Instalación desde cero

## Setup del proyecto

Instalamos las dependecias dentro del proyecto:

```bash
npm init -y
npm install @cucumber/cucumber
npm install --save-dev typescript ts-node @types/node
npx tsc --init
```

**NOTA:** Se recomienda instalar además la extensión de highlighting de Cucumber

Luego creamos una carpeta donde crearemos los ejemplos de las features:

```bash
mkdir features
cd features
```

### Agregamos el script de ejecución al *package.json*:

```json
  "scripts": {
    "test": "cucumber-js --require-module ts-node/register --require features/**/*.ts"
  }
```

Este nos ayudará a ejecutar los test con:

```bash
npm test
```

### Copiamos dentro del *tsconfig.json*:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "outDir": "dist",
    "rootDir": "."
  },
  "include": ["features/**/*.ts"]
}
```

## Setup de Cucumber

Dentro de features creamos dos directorios:

```bash
mkdir support
mkdir step_definitions
```

Entramos en la carpeta support y creamos el world:

```bash
cd support
touch world.ts
```

Dentro del mismo copiaremos el siguiente código:

```typescript
import { setWorldConstructor, World } from "@cucumber/cucumber";

class CustomWorld extends World {
  // Aqui deben ir las inicializaciones de las variables que vayamos a usar
}

setWorldConstructor(CustomWorld);
export type { CustomWorld };
```

**Ejemplo:**

Para nuestro ejemplo utilizaremos el siguiente mundo:

```typescript
import { setWorldConstructor, World } from "@cucumber/cucumber";

class CustomWorld extends World {
  currentPage: string = "";
  username?: string;
  password?: string;
  loggedIn: boolean = false;
  registeredUsers: Record<string, string> = {};
  registerResult?: string;
  validationErrorMessage?: string;
}

setWorldConstructor(CustomWorld);
export type { CustomWorld };
```

## Creacion de casos de uso

Para crear un caso de uso debemos crear un archivo .feature y dentro del mismo especificar en formato gherkin el scenario: 

```bash
touch <nombre de la feature>.feature
```

**Ejemplo:**

Creación de *login.feature*:

```bash
cd features
touch login.feature
```

*login.feature*

```gherkin
Feature: User login

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters valid credentials
    And clicks the login button
    Then the user should see the dashboard
```

## Desarrrollo y ejecución de los casos de uso

Los caso de uso por si solos solo nos aportan una visión del negocion mas no una automatización, desarrollo y ejecución del código y las pruebas pertinentes. Para esto, existen los archivos *.step*. 

Es dentro de estos archivos *.step* que haremos el desarrollo de nuestra aplicación basandonos en el marco de BDD.

Entonces:

Entramos *step_definitions* y creamos el archivo correspondiente a la feature, en el mismo especificaremos las pruebas:

```bash
cd steps_definitions
touch <nombre de la feature>.steps.ts
```

Y dentro del mismo copiamos el siguiente código:


```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';

Given('the given condition', function (this: CustomWorld) {
  // TO DO: Inicializamos variables del given
});

When('the when condition', function (this: CustomWorld) {
    // TO DO: Especificamos (con código) las condiciones que se deben cumplir
});

Then('Thats happening when the conditions are fullfiled', function (this: CustomWorld) {
    // TO DO: Codeamos lo que ocurre cuando se cumplen las condiciones 
});
```

**Ejemplo:**

Creación de *login.steps.ts*:

```bash
cd steps_definitions
touch login.steps.ts
```

Y copiamos el código:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';

Given('the user is on the login page', function (this: CustomWorld) {
  this.currentPage = 'login';
});

When('the user enters valid credentials', function (this: CustomWorld) {
  if (this.currentPage !== 'login') throw new Error('Not on login page');
  this.username = 'validUser';
  this.password = 'validPass';
});

When('clicks the login button', function (this: CustomWorld) {
  if (this.username === 'validUser' && this.password === 'validPass') {
    this.loggedIn = true;
    this.currentPage = 'dashboard';
  }
});

Then('the user should see the dashboard', function (this: CustomWorld) {
  assert.strictEqual(this.loggedIn, true);
  assert.strictEqual(this.currentPage, 'dashboard');
});
```

## Verificamos que se cumplan las condiciones

Para verificar que especificamos correctamente y que se cumplen las condiciones corremos:

```bash
npm test
```

# Instalación de un proyecto existente

Simplemente ejecutar parado en la raíz del proyecto:

```bash
npm install
```

