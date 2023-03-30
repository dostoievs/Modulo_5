import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
function usuarioControllers(app) {
    app.get('/usuario', listar)
    app.get('/usuario/email/:email', buscarPorEmail)
    app.post('/usuario', inserir)
    app.delete('/usuario/email/:email', deletar)
    app.put('/usuario/email/:email', atualizar)
    function listar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bd.Usuario.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario')
            res.send(result)
        })()
    }
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bd.Usuario.db',
                driver: sqlite3.Database
            })
            const usuarioAdd = req.body
            console.log(usuarioAdd)
            const result = await db.run(
                `INSERT INTO Usuario(nome, sobrenome, cpf, email,senha, tipo, status) 
                VALUES(?,?,?)`,
                [usuarioAdd.nome, usuarioAdd.sobrenome, usuarioAdd.cpf, usuarioAdd.email, usuarioAdd.senha, usuarioAdd.tipo, usuarioAdd.status]
            )
        })()

        res.send('Usuário inserido com sucesso')

    }
    function buscarPorEmail(req, res) {

        (async () => {

            const db = await open({
                filename: './src/infra/bd.Usuario.db',
                driver: sqlite3.Database
            })
            const busca = req.params.email
            const result = await db.all(`SELECT * FROM Usuario where email like ?`, busca)
            if (!result) {
                res.status(404).send('Usuário não encontrado')
            }
            res.send(result)
        })()

    }
    function deletar(req, res) {
        (async () => {

            const db = await open({
                filename: './src/infra/bd.Usuario.db',
                driver: sqlite3.Database
            })
            const busca = req.params.email
            const result = await db.all(`DELETE FROM Usuario where email like ?`, busca)
            if (!result) {
                res.status(404).send('Usuário não encontrado')
            }

            res.send(result)
        })()
    }
    function atualizar(req, res) {
        (async () => {

            const db = await open({
                filename: './src/infra/bd.Usuario.db',
                driver: sqlite3.Database
            })
            const busca = req.params.email
            const result = await db.all(`UPDATE Usuario SET nome=?, sobrenome=?, cpf=? ,email=?, senha=?, tipo=?, status=? 
            where email like ?`, req.body.nome, req.body.sobrenome, req.body.cpf, req.body.email, req.body.senha, req.body.tipo, req.body.status, busca)
            if (!result) {
                res.status(404).send('Usuário não encontrado')
            }
            res.send({ mensagem: 'Usuário alterado com sucesso' })
        })()

    }
}
export default usuarioControllers