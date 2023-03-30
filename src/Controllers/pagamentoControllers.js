import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

function pagamentoControllers(app) {
    app.get('/pagamento', listar)
    app.get('/pagamento/:id', buscarPorPagamento)
    app.post('/pagamento', inserir)
    app.delete('/pagamento/:id', deletar)
    app.put('/pagamento/id:', atualizar)
    function listar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/Tarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Pagamento')
            res.send(result)
        })()
    }
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/db.Pagamento.db',
                driver: sqlite3.Database
            })
            const pagamentoAdd = req.body
            console.log(pagamentoAdd)
            const result = await db.run(
                `INSERT INTO Pagamento( id_pagamento, pedidos, tipoCartao, numeroCartao, bandeiraCartao, valorTotal, status)
                 VALUES(?,?,?,?,?,?,?)`,
                [pagamentoAdd.id_pagamento, pagamentoAdd.pedidos, pagamentoAdd.tipoCartao, pagamentoAdd.numeroCartao, pagamentoAdd.bandeiraCartao, pagamentoAdd.valorTotal, pagamentoAdd.status]
            )
        })()

        res.send('Pagamento realizado com sucesso!')
    }

}
function deletar(req, res) {
    (async () => {

        const db = await open({
            filename: './src/infra/db.Pagamento.db',
            driver: sqlite3.Database
        })
        const busca = req.params.id
        const result = await db.all(`DELETE FROM Pagamento where Pagamento like ?`, busca)
        if (!result) {
            res.status(404).send('Pagamento não realizada!')
        }

        res.send(result)
    })()
}
function atualizar(req, res) {
    (async () => {

        const db = await open({
            filename: './src/infra/bd.Pagamento.db',
            driver: sqlite3.Database
        })
        const busca = req.params.id
        const result = await db.all(`UPDATE Pagamento SET id_pagamento=?, tipoCartao=?, numeroCartao=?, bandeiraCartao=?, valorTotal=?, status=?
            Onde está o pagamento?`, req.body.id_pagamento, req.body.tipoCartao, req.body.numeroCartao, req.body.bandeiraCartao, req.body.valorTotal, req.body.status, busca)
        if (!result) {
            res.status(404).send('Pagamento não encontrado')
        }
        res.send({ mensagem: 'Pagamento alterado com sucesso' })
    })()

}

export default pagamentoControllers