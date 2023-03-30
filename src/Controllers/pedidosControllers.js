import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


function pedidoControllers(app) {
    app.get('/usuario', listar)
    app.get('/pedido/id:', buscarPorPedido)
    app.post('/pedido', inserir)
    app.delete('/pedido', deletar)
    app.put('/pedido/id:', atualizar)
    
    function listar(req, res) {

        (async () => {
        
            const db = await open({
                filename: './src/infra/bd.Pedidos.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Pedidos')
            res.send(result)
        })()
    }
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bd.Pedidos.db',
                driver: sqlite3.Database
            })
            const PedidosAdd = req.body
            console.log(PedidosAdd)
            const result = await db.run(
                `INSERT INTO Pedidos(id_pedidos, nomeCliente, numeroCliente, numeroCartao, valorTotal, itens, observacao, status) 
                VALUES(?,?,?)`,
                [PedidosAdd.id_pedidos, PedidosAdd.nomeCliente, PedidosAdd.numeroCartao, PedidosAdd.valorTotal, PedidosAdd.itens, PedidosAdd.observacao, PedidosAdd.status, buscarPorPedido]
            )
        })()

        res.send('Pedido realizado com sucesso!')

    }
    
    }
    function deletar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bd.Pedidos.db',
                driver: sqlite3.Database
            })
            const busca = req.params.id
            const result = await db.all(`DELETE FROM Pedidos where id_pedidos like ?`, busca)
            if (!result) {
                res.status(404).send('Pedido não encontrado!')
            }
            res.send(result)
        })()
    }
    function atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bd.Pedidos.db',
                driver: sqlite3.Database
            })
            const busca = req.params.id
            const result = await db.all(`UPDATE Pedidos SET id_pedidos=?, nomeCliente=?, numeroCliente=?, numeroCartao=?, valorTotal=?, itens=?, observacao=?, status=?
            Onde está o pedido?`, req.body.id_pedidos, req.body.nomeCliente, req.body.numeroCliente,req.body.numeroCartao, req.body.valorTotal, req.body.itens, req.body.observacao, req.body.status, busca)
            if (!result) {
                res.status(404).send('Pedido não encontrado!')
            }
            res.send({ mensagem: 'Pedido alterado com sucesso!' })
        })()

    }

export default pedidoControllers
