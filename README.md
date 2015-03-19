# ricevi
Receive and send things

## Install

`git clone https://github.com/underr/ricevi.git`

`npm install`

## Use

Copy `config.example.js` to `config.js`, configure it and run `node .`

## Privata

You can send private data at `/sendi/privata` (only param is **data** which is a string), you'll get a secret key after sending it.

Use it at `/ricevi/privata/`**<id>**. For example, `http://localhost:5000/ricevi/privata/TsSfUXc8sL5tMxmiWqzd1um58hIFO3`
