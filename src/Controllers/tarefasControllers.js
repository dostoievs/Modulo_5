import sqlite3 from 'sqilite3'
import { open } from 'sqlite'
function tarefasControllers(app) {
    app.get('/tarefas', listar)
    app.get('/tarefas/id:', buscarPorTarefas)
    app.post('/tarefas', inserir)
    app.delete('/tarefas', deletar)
    app.put('/tarefas/id:', atualizar)

    function listar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bd.Tarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Tarefas')
            res.send(result)
        })()
        const tarefas = bdTarefas
        res.send(tarefas)
    }
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bd.Tarefas.db',
                driver: sqlite3.Database
            })
            const tarefasAdd = req.body
            console.log(tarefasAdd)
            const result = await db.run(
                `INSERT INTO Tarefas (id_tarefas, titulo, descricao, dataCriacao, status) 
                VALUES(?,?,?)`,
                [tarefasAdd.id_tarefas, tarefasAdd.titulo, tarefasAdd.descricao, tarefasAdd.dataCriacao, tarefasAdd.status]
            )
        })()
        res.send('Tarefa realizada com sucesso!')
    }
}
        function deletar(req, res) {
            (async () => {
        const db = await open({
            filename: './src/infra/bd.Tarefas.db',
            driver: sqlite3.Database
        })
        const busca = req.params.id
        const result = await db.all(`DELETE FROM Tarefas where id_tarefas like ?`, busca)
        if (!result) {
            res.status(404).send('Taferas não encontradas!')
        }
        res.send(result)
    })()
    }
    function atualizar(req, res) {
    (async () => {
        const db = await open({
            filename: './src/infra/bd.Tarefas.db',
            driver: sqlite3.Database
        })
        const busca = req.params.id
        const result = await db.all(`UPDATE Tarefas SET id_tarefas=?, titulo=?, descricao=?, dataCriacao=? status=?
        where id_tarefas like ?`, req.body.id_tarefas, req.body.titulo, req.body.descricao, req.body.dataCriacao, req.body.status, busca)
        if (!result) {
            res.status(404).send('Tarefas não encontrados!')
        }
        res.send({ mensagem: 'Tarefas alterada com sucesso!' })
    })()

    }

export default tarefasControllers