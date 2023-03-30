import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

function itemControllers(app) {
    app.get('/item', listar)
    app.get('/item/id:', buscarPorItem)
    app.post('/item', inserir)
    app.delete('/item/id:', deletar)
    app.put('/item/id:email', atualizar)
    
    function listar(req, res) {
    
        (async () => {

            const db = await open({
                filename: './src/infra/bd.Item.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Item')
            res.send(result)
        })()
    }
    function inserir(req, res) {
        (async () => {
    
            const db = await open({
                filename: './src/infra/bd.Item.db',
                driver: sqlite3.Database
            })
            const itemAdd = req.body
            console.log(itemAdd)
            const result = await db.run(
                `INSERT INTO Item(id_itens, categoria, estoque, quantidade, status) 
                VALUES(?,?,?,?,?)`,
                [itemAdd.id_itens, itemAdd.categoria, itemAdd.estoque, itemAdd.quantidade, itemAdd.status, busca]
            )
        })()

        res.send('Item inserido com sucesso')

    }
    
    }
    function deletar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/db.Item.db',
                driver: sqlite3.Database
            })
            const busca = req.params.id
            const result = await db.all(`DELETE FROM Item where id_itens like ?`, busca)
            if (!result) {
                res.status(404).send('Item não encontrado')
            }
            res.send(result)
        })()
    }
    function atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bd.Itens.db',
                driver: sqlite3.Database
            })
            const busca = req.params.itens
            const result = await db.all(`UPDATE Item SET id_itens=?, categoria=?, quantidade=?, status=?
            where item like ?`, req.body.id_itens, req.body.categoria, req.body.quantidade, req.body.status, busca)
            if (!result) {
                res.status(404).send('Item não encontrado')
            }
            res.send({ mensagem: 'Item alterado com sucesso' })
        })()

    }

export default itemControllers