# Admin
The admin form would take in a username and token.

## Token(Login) Generation
The token would be generated at startup of the backend.  This token should not be confused with the request token.

### Login
- Username
- Token

## Resulting Response
The backend sends a JSON back in and the frontend has to unmarshal it to retrieve the token.  The token is different from the login token and is used as a session token.

### Response
```json
{
    "token": "d3474044-17c8-4ded-969c-f0bbfe708b10",
    "message": "success"
}
```

![interconnect](/docs/admin/interconnect.png)