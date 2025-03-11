# API Dokumentaatio

## Yleistä
Tämä API tarjoaa pääsyn päiväkirjasovelluksen tietoihin, kuten käyttäjiin, unipäiväkirjamerkintöihin, treenimerkintöihin ja mielialamerkintöihin.

### Base URL
```
http://localhost:3000/api
```

## Autentikointi
Kaikki suojatut reitit vaativat Bearer-tokenin `Authorization`-otsikossa.

### 1. Kirjautuminen
**POST** `/auth/login`

#### Pyyntö:
```json
{
  "username": "testikäyttäjä",
  "password": "salasana"
}
```

#### Vastaus (onnistunut):
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "user_id": 1,
    "username": "testikäyttäjä",
    "email": "test@example.com"
  }
}
```

---
### 2. Käyttäjätilin luonti
**POST** `/users`

#### Pyyntö:
```json
{
  "username": "uusiKayttaja",
  "password": "vahvaSalasana",
  "email": "newuser@example.com"
}
```

#### Vastaus (onnistunut):
```json
{
  "message": "User registered successfully"
}
```

---
### 3. Hae kirjautunut käyttäjä
**GET** `/auth/me`

#### Vastaus (onnistunut):
```json
{
  "user_id": 1,
  "username": "testikäyttäjä",
  "email": "test@example.com"
}
```

## Käyttäjät
### 4. Käyttäjän poistaminen
**DELETE** `/users/:id`

#### Vastaus (onnistunut):
```json
{
  "message": "User deleted."
}
```

## Päiväkirjamerkinnät
### 5. Lisää unipäiväkirjamerkintä
**POST** `/entries`

#### Pyyntö:
```json
{
  "sleep_duration": 7.5,
  "sleep_quality": 4,
  "dream_description": "Näin unta merestä",
  "date": "2025-03-10"
}
```

#### Vastaus (onnistunut):
```json
{
  "message": "Sleep entry added successfully"
}
```

---
### 6. Hae kaikki unipäiväkirjamerkinnät
**GET** `/entries`

#### Vastaus (onnistunut):
```json
[
  {
    "id": 1,
    "sleep_duration": 7.5,
    "sleep_quality": 4,
    "dream_description": "Näin unta merestä",
    "date": "2025-03-10"
  }
]
```

## Muut päiväkirjat (treeni, mieliala)
Treenipäiväkirjan ja mielialapäiväkirjan reitit toimivat samalla tavalla kuin unipäiväkirjan.

### Treenipäiväkirja
- **POST** `/exercise` – Lisää uusi treenimerkintä
- **GET** `/exercise` – Hae kaikki treenimerkinnät

### Mielialapäiväkirja
- **POST** `/mood` – Lisää uusi mielialamerkintä
- **GET** `/mood` – Hae kaikki mielialamerkinnät

---
## Virheilmoitukset
| Statuskoodi | Selitys |
|------------|---------|
| 400 | Virheellinen pyyntö (esim. puuttuvat tiedot) |
| 401 | Käyttäjä ei ole kirjautunut sisään |
| 403 | Käyttäjällä ei ole oikeuksia |
| 404 | Pyydettyä resurssia ei löydy |
| 500 | Palvelimen virhe |

---
## Huomioitavaa
- API vaatii autentikoinnin useimpiin reitteihin.


