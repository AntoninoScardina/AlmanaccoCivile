const csv = require('csv-parser');
const fs = require('fs');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb',
    password: ''
});
connection.connect();

const query = (queryString) => {
    return new Promise((res, rej) => {
        connection.query(queryString, (err, rows, fields) => {
            if (err) rej(err);
            res(rows);
        });
    })
}

const insertDate = (data) => {
    return new Promise((ser) => {
        query(`SELECT EXISTS (SELECT * FROM data_evento WHERE data = '${data}') AS DATA_EXISTS`)
            .then(async(res) => {
                const exists = Boolean(res[0].DATA_EXISTS);
                if (!exists) {
                    try {
                        await query(`INSERT INTO data_evento (iddata_evento, data) VALUES (NULL, '${data}')`);
                    } catch (_) { console.error(_); }
                }
                try {
                    ser(await query(`SELECT iddata_evento FROM data_evento WHERE data = '${data}'`));
                } catch (_) { console.error(_); }
            })
    });
}

const insertEvent = ({ titolo, descrizione, path_immagine, link_articolo, data }) => {
    insertDate(data)
        .then(async key => {
            try {
                await query(`INSERT INTO evento () VALUES (NULL, "${connection.escape(titolo)}", ${connection.escape(descrizione)},"${path_immagine}","${link_articolo}",'0', '0','${key[0].iddata_evento}');`);
            } catch (_) { console.error(_); }
        })
        .catch((err) => console.log(err));
}

const results = [];
fs.createReadStream('dicembre.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async() => {
        for (const result of results) {
            insertEvent({
                titolo: result['titolo'],
                descrizione: result['descrizione'],
                path_immagine: result['path_immagine'],
                link_articolo: result['link_articolo'],
                data: result['data']
            });
        }
    });