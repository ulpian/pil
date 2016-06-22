# pil
Koa middleware for setting rules HTTP method parameters to endpoints.
Make parameter validation as easy-as-pil

`npm install pil`

<img src="media/redpillbluepill.png"><br>


### pil.set({opts})

Set parameter options;

| Key | Type | Description |
| --- | --- | --- |
| name | String | Name of your parameter, you must include this in your options. |
| required | Boolean | Required if true, optional if false - true by default |
| type | String | Parameter data type; boolean - number - string - object - array |
| error | Object | Set custom error messages in specific scenarios |

* Must be running node with `v4.3.*` or higher

* For POST / PUT methods pil works with works with the official `koa-bodyparser` best or other body parsing libraries which set data to `this.request.body`. This libraries will extend to support pure koa post requests.

Authors;
[Ulpian Morina](https://github.com/ulpian)