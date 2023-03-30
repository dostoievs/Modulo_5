import express from 'express'
import itemControllers from './Controllers/itemControllers.js'
import loginControllers from './Controllers/loginControllers.js'
import pagamentoControllers from './Controllers/pagamentoControllers.js'
import pedidoControllers from './Controllers/pedidosControllers.js'
import tarefaControllers from './Controllers/tarefaControllers.js'
import usuarioControllers from './Controllers/usuarioControllers.js'

import cors from 'cors'
const app = express() 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type, Authorization")
  app.use(cors())
  next()
})
app.use(express.json())

itemControllers(app)
loginControllers(app)
pagamentoControllers(app)
pedidoControllers(app)
tarefaControllers(app)
usuarioControllers(app)

export default app