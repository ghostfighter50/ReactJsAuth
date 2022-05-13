
# React + Typescript + Express Authentication system

Full stack Authentication system (Login, Register) made with typescript, react and express.



## TODO

- More secure application

- Dashboard (Blog system)

- User roles (eg: admin or moderator)

- Cleaner frontend (Hopefully)


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## API Reference


```
  POST /api/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Name` | `string` | **Required**. User's name    |
| `email` | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password    |
| `passwordValidation` | `string` | **Required**. Confirmation of the password    |

#### Get item

```http
  POST /api/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. User's email |
| `password`      | `string` | **Required**. User's password |

```
  GET /api/logout //logs out current session
```
```
  GET /api/currentUser //Returns User's data
```
```
  GET /api/session //returns user's session
```
```
  GET /api/users //returns all the data of the users
```
```
  GET /api/users/:userId //returns the data of the specified user
```

Takes two numbers and returns the sum.


## Authors

- [@Ghostfighter50](https://www.github.com/Ghostfighter50)

