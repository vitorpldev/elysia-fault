# Elysia Fault

You can add error middleware to APIs made with Elysia.




## Instalation

```bash
  bun add elysia-fault
```
    
## Usage
_It is important to remember that as it is an error handling middleware, it must be used before controllers or anything that will need to have error handling_

Standard usage
```typescript
import { elysiaFault, Errors } from 'elysia-fault'
import Elysia from 'elysia'

const app = new Elysia()
    .use(elysiaFault())
    .get('/', () => {
        throw new Errors.BadRequest('Example for Bad Request Error')
    })
    .listen(3333)

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
```

Output of standard usage with status code 400
```json
{
    "name": "BadRequest",
    "message": "Example for Bad Request Error"
}
```

The middleware changes the NotFound and Validation standard errors

```typescript
import { elysiaFault } from 'elysia-fault'
import Elysia from 'elysia'

const app = new Elysia()
    .use(elysiaFault())
    .get('/', () => 'Hello World')
    .listen(3333)

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
```

This will be the 404 error that your app will return by default when attempting a request using the http://localhost:3333/notfound route in the GET method
```json
{
    "message": "GET http://localhost/notfound is not a valid endpoint."
}
```

But if you don't like the new default error, you can customize it

```typescript
import { elysiaFault } from 'elysia-fault'
import Elysia from 'elysia'

const app = new Elysia()
    .use(elysiaFault({
        found: (err) => `My custom error on ${err.url} with method ${err.method}`
    }))
    .get('/', () => 'Hello World')
    .listen(3333)

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
```

With this modified error, we just told it to return a string, so it will still do it with the status code 404
```json
"My custom error on http://localhost/notfound with method GET"
```

But if you like json, you can also ask it to return an object
```typescript
import { elysiaFault } from 'elysia-fault'
import Elysia from 'elysia'

const app = new Elysia()
    .use(elysiaFault({
        found: (err) => ({ message: `My custom error with an object` })
    }))
    .get('/', () => 'Hello World')
    .listen(3333)

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
```

So it returns this error in a not found error
```json
{
    "message": "My custom error with an object"
}
```

But if you still think you need more customization, you can create your own errors with these class extensions
```typescript
import { elysiaFault, Errors } from 'elysia-fault'
import Elysia from 'elysia'

class MyCustomError extends Errors.ApiError {
    constructor(message: string) {
        super(message, 500, 'MyCustomError')
        //super(error message, status code, error name)
    }
}

const app = new Elysia()
    .use(elysiaFault())
    .get('/', () => {
        throw new MyCustomError('Custom error made by myself')
    })
    .listen(3333)

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
```

Custom error output
```json
{
    "name": "MyCustomError",
    "message": "Custom error made by myself"
}
```

But if you still don't like how these custom errors are returning, you can still customize the format of these errors as well.
```typescript
import { elysiaFault, Errors } from 'elysia-fault'
import Elysia from 'elysia'

const app = new Elysia()
    .use(elysiaFault({
        config: (err) => err.message
    }))
    .get('/', () => {
        throw new Errors.BadRequest('Example for Bad Request Error with only text')
    })
    .listen(3333)

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
```

Output of standard usage with status code 400
```json
"Example for Bad Request Error with only text"
```