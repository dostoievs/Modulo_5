import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
function loginControllers(app) {
    app.get('/login', listar)
    app.get('/login/email/:email', buscarPorEmail)
    app.post('/login', inserir)
    app.delete('/login/email/:email', deletar)
    app.put('/login/email/:email', atualizar)
    function listar(req, res) {
        (async () => {

            const db = await open({
                filename: './src/infra/db.Login.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Login')
            res.send(result)
        })()
    }
    function inserir(req, res) {
        (async () => {
            // open the database
            const db = await open({
                filename: './src/infra/db.Login.db',
                driver: sqlite3.Database
            })
            const loginAdd = req.body
            console.log(loginAdd)
            const result = await db.run(
                `INSERT INTO Usuario(nome,email,senha) 
                VALUES(?,?,?)`,
                [loginAdd.nome, loginAdd.email, loginAdd.senha]
            )
        })()

        res.send('Login realizado com sucesso')

    }
    function buscarPorEmail(req, res) {
        (async () => {

            const db = await open({
                filename: './src/infra/db.Login.db',
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
                filename: './src/infra/bd.Login.db',
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
                filename: './src/infra/db.Login.db',
                driver: sqlite3.Database
            })
            const busca = req.params.email
            const result = await db.all(`UPDATE Usuario SET nome=?, eamil=?, senha=? 
            where email like ?`, req.body.nome, req.body.email, req.body.senha, busca)
            if (!result) {
                res.status(404).send('Usuário não encontrado')
            }
            res.send({ mensagem: 'Usuário alterado com sucesso' })
        })()

    }
}
export default loginControllers