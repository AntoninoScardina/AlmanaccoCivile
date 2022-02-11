require('dotenv').config();

const app = (require('express')());
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const { findAncestor, WatchDirectoryFlags } = require("typescript");

const port = 3000;

const bcryptInfo = {
    saltRounds: 10
};

app.use(cors({
    // TODO FIX
    origin: '*',
    // origin: 'https://4200-antoninoscardin-almanacc-whoxzp4i6jz.ws-eu30.gitpod.io',
    // credentials: true,
}));

let connection;
const handleConnection = () => {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'AlmanaccoCivile',
        password: ''
    });

    connection.connect();

    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
            handleConnection();                         
        } else {                                      
            throw err;                                 
        }
    });
}
handleConnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const query = (queryString) => {
    return new Promise((res, rej) => {
        connection.query(queryString, (err, rows, fields) => {
            if (err) rej(err);
            res(rows);
        });
    })
}

app.get('/tables', (req, res) => {
    query('show tables').then((rows) => {
        res.json({ data: rows });
    }, err => console.error(err));
});

app.get('/admin/:nickname', (req, res) => {
    query(`
        select nickname, has_admin
        from utente 
        inner join admin on fk_idadmin = idadmin 
        where nickname = '${req.params.nickname}'
    `).then((rows) => {
        res.json({ admin: Boolean(rows[0].has_admin) });
    }, err => console.error(err));
});

app.get('/event/:day/', (req, res) => {
            query(`
        select idevento, titolo, descrizione, path_immagine, link_articolo, visualizzazioni, rilevanza, DATE_FORMAT(data, '%d/%m/%Y') as data
        from evento 
        inner join data_evento on fk_iddata_evento = iddata_evento 
        where day(data) = ${req.params.day} 
        ${req.query.month ? `and month(data) = ${req.query.month}` : ''} 
        ${req.query.year ? `and year(data) = ${req.query.year}` : ''} 
        ${req.query.orderby ? `order by ${req.query.orderby} ${req.query.ot ? req.query.ot : 'ASC'}` : ''}   
    `).then((rows) => {
        res.json({ events: rows });
    }, err => console.error(err));
});

app.get('/user/:nickname', (req, res) => {
    query(`
        select nome, cognome from utente where nickname = '${req.params.nickname}'
    `).then((rows) => {
        res.json({ data: rows[0] });
    }, err => console.error(err));
});

app.get('/favs/:nickname', (req, res) => {
    query(`
        select idevento, nickname, titolo, descrizione, path_immagine, link_articolo, visualizzazioni, rilevanza
        from utente 
        inner join utente_has_evento on nickname = fk_nickname left join evento on fk_idevento = idevento
        where nickname = '${req.params.nickname}'
        ${req.query.orderby ? `order by ${req.query.orderby} ${req.query.ot ? req.query.ot : 'ASC'}` : ''}   
    `).then((rows) => {
        res.json({ favs: rows });
    }, err => console.error(err));
});

app.post('/add_fav', (req, res) => {
    const info = {
        nickname: req.body.nickname,  
        id_post: req.body.id
    };
    query(`INSERT INTO utente_has_evento () VALUES ('${info.nickname}', ${info.id_post});`).then((rows) => {
        res.json({ res: 'ok' });
    }, err => console.error(err));
});

app.post('/rem_fav', (req, res) => {
    const info = {
        nickname: req.body.nickname,  
        id_post: req.body.id
    };
    query(`DELETE FROM utente_has_evento WHERE fk_nickname = '${info.nickname}' AND fk_idevento = ${info.id_post};`).then((rows) => {
        res.json({ res: 'ok' });
    }, err => console.error(err));
});

app.post('/register', (req, res) => { 
    const info = {
        nickname: req.body.nickname,  
        nome: req.body.nome,
        cognome: req.body.cognome,
    };
    const password = bcrypt.hashSync(req.body.password, bcryptInfo.saltRounds);
    query(`INSERT INTO utente () VALUES ('${info.nickname}', '${info.nome}', '${info.cognome}', '${password}', 1);`).then((rows) => {
        res.json({ res: 'ok' });
    }, err => console.error(err));
});

app.post('/increase_v', (req, res) => {
    const info = {
        id_post: req.body.id
    };
    query(`UPDATE evento SET visualizzazioni = visualizzazioni + 1 WHERE idevento = ${info.id_post};`).then((rows) => {
        res.json({ res: 'ok' });
    }, err => console.error(err));
});

// mmmh
app.get('/hot_events', (req, res) => {
    query(`
        select idevento, titolo, descrizione, path_immagine, link_articolo, visualizzazioni, rilevanza, DATE_FORMAT(data, '%d/%m/%Y') as data
        from evento 
        inner join data_evento on fk_iddata_evento = iddata_evento 
        order by visualizzazioni DESC limit 10
    `).then((rows) => {
        res.json({ events: rows });
    }, err => console.error(err)); 
});

app.post('/login', (req, res) => { 
    const info = {
        nickname: req.body.nickname,  
    };
    query(`
        select password from utente where nickname = '${info.nickname}'
    `).then((rows) => {
        console.log(req.body.password);
        if (bcrypt.compareSync(req.body.password, rows[0].password)) {
            res.json({ data: 'ok' });
        } else {
            res.json({ data: 'non ok' });
        }
    }, err => console.error(err));
});


setInterval(() => {
    connection.destroy();
    console.log('DSITER');
}, 2000);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});