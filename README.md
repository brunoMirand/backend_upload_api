# :file_folder: Backend Upload API

## :warning: Project dependencies

- [mongo-express_app][1]

> Clone de project [mongo-express_app][1] and start application.

## :pencil: Pre-requisites

`NPM version 5.0.0+` See how to download and install in [NPM documentation.][2]

`Node version 10+` See how to download and install in [NPM documentation.][2]

`Git 2.13.0+` See how to download and install in [Git update version.][3]

## :clipboard: Setup

First clone the repository
```sh
$    git clone git@github.com:brunoMiranda8922/backend_upload_api.git
$    cd backend_upload_api
```

Copy env vars:
```sh
$    cp .env.example .env   # you can edit if necessary
```

## :computer: Usage

```sh
$    npm install    # and the application will be available on http:localhost:5000/
```

```sh
$    npm run dev    # and the application will be available on http:localhost:5000/
```
## :minidisc: Storage Files

- Today we can choose two forms of storage, upload **locally** or on **AWS s3**.
- How to control it? simply by changing the enviroment variable `STORAGE_TYPE`. Values can be:
    - `local` or `s3`

## :book: Resources

### `POST` /upload
- Save files

#### `POST` Headers
| name | value  | description |
| :--- | :----- | :---------- |
| Content-Type | string | multipart/form-data |
| content-type | string | multipart/form-data; boundary=---011000010111000001101001' |

#### `POST` Body request

- Choose the Multipart form option and fill in the field with following value: `file` and choose option `file`. After that just upload the files  you need.

##### Response example

```json
{
  "_id": "5f9f5aedab156a537346b191",
  "name": "tony-and-staphien-coffe.jpg",
  "size": 265913,
  "key": "3ba64f0c3d1eff2a89e04cf846be6769-tony-and-staphien-coffe.jpg",
  "url": "localhost:5000/files/3ba64f0c3d1eff2a89e04cf846be6769-tony-and-staphien-coffe.jpg",
  "createdAt": "2020-11-02T01:03:41.768Z",
  "__v": 0
}
```

---
### `GET` /upload
- Get all files

##### Response example

```json
[
  {
    "_id": "5f9608dcdf07121b143c64d6",
    "name": "tony-and-friends.jpg",
    "size": 246022,
    "key": "cea274f16614b9f0321079b8f54bcfaf-tony-and-friends.jpg",
    "url": "",
    "createdAt": "2020-10-25T23:23:08.544Z",
    "__v": 0
  },
  {
    "_id": "5f9f28f5a37a3c6203b1e2e5",
    "name": "tony-dance-staphie.jpg",
    "size": 53255,
    "key": "70bbefaf8de7baee592c91155679e087-tony-dance-staphie.jpg",
    "url": "",
    "createdAt": "2020-11-01T21:30:29.646Z",
    "__v": 0
  }
]
```

---
### `DELETE` /upload/{id}/
- Delete file by id

##### Response example

```json
{
  "message": "The file 5f9f4b531a5f642ff7d8f280 has been deleted"
}
```
## :facepunch: How to contribute

Access the link to know how to [Contribute](./CONTRIBUTING.md)


## :boy: Author

![Bruno Miranda](https://avatars3.githubusercontent.com/u/36895444?s=460&u=1050d3ca39dd6abf623f239b965dbf6508541f11&v=4)

[1]:https://github.com/brunoMiranda8922/mongo-express_app
[2]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
[3]: https://gist.github.com/YuMS/6d7639d80b17523f6f01d90f285da509
