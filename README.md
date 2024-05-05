Detta repository är ett REST API byggt med Express. API:et hanterar ett CV, det vill säga min arbetslivserfarenhet. Funktionalitet för CRUD är implementerad.

Databas
API:et använder sqlite3 som databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. Installations-skriptet skapar databastabell enligt nedanstående:

Namn: cv
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyname TEXT NOT NULL,
        jobtitle TEXT NOT NULL,
        location TEXT,
        startdate TEXT,
        enddate TEXT,
        description TEXT

Användning
För att nå API:et, använd "localhost" eller "http://127.0.0.1".
GET och POST: localhost:2788/cv
PUT och DELETE: localhost:2788/cv/:id

Vid hämtning från API:et returneras ett objekt i JSON-format enligt följande:
  {
    "id": 1,
    "companyname": "Gröna Lund",
    "jobtitle": "HR-koordinator",
    "location": "Stockholm",
    "startdate": "2009-01-01",
    "enddate": "2013-10-06",
    "description": "schemaläggning, bemanning, parkansvarig"
  }


