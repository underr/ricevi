# ricevi
Receive and send things

## Install

`git clone https://github.com/underr/ricevi.git`

`npm install`

## Use

Copy `config.example.js` to `config.js`, configure it and run `node .`

## API Paths

### Ricevi

`/ricevi` will return items in alphabetical order.

`/ricevi/random` will return a random item.

`/ricevi/id/${id}` will return given ID item

### Sendi

`/sendi` only takes a **data** parameter, which may contain a string. You can send it with curl, for example: `curl -d "data=Testing" http://localhost:5000/sendi`

### Privata
You can send private data at `/sendi/privata`, you'll get a secret key after sending it.

Receive it at `/ricevi/privata/${secret key}`. For example, `http://localhost:5000/ricevi/privata/TsSfUXc8sL5tMxmiWqzd1um58hIFO3`
