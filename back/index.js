require("dotenv").config();
var express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mysql = require("mysql");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db;

var configuracaoMSQL = {
  host: process.env.login_host,
  user: process.env.login_user,
  password: process.env.login_password,
  database: process.env.dbName,
};

function handleDisconnect() {
  db = mysql.createConnection(configuracaoMSQL);

  db.connect(function (err) {
    if (err) {
      console.log("Erro de conexão a base de dados:", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Com conexão a base de dados");
    }
  });

  db.on("error", function (err) {
    console.log("Base de dados _ error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else if (err.code === "ECONNRESET") {
      handleDisconnect();
    } else throw err;
  });
}
handleDisconnect();

app.get("/getPlayers", function (req, res) {
  // adicionar um where para pegar apenas o jogadores do time do usuario
  db.query("SELECT * FROM jogadores", function (err, rows) {
    if (err) {
      console.log("Erro ao selecionar dados", err);
      res.sendStatus(500);
    } else {
      res.json({ jogadores: rows });
    }
  });
});

app.get("/getEventos/:tipoDeJogo", function (req, res) {
  const { tipoDeJogo } = req.params;
  // adicionar um where para pegar apenas o jogadores do time do usuario
  db.query(
    `SELECT * FROM eventos WHERE tipo_de_jogo = '${tipoDeJogo}'`,
    function (err, rows) {
      if (err) {
        console.log("Erro ao selecionar dados", err);
        res.sendStatus(500);
      } else {
        res.json({ eventos: rows });
      }
    }
  );
});

app.post("/createGame", function (req, res) {
  const { data_de_inicio, adversario, tempo, tipo_de_jogo } = req.body;
  db.query(
    `INSERT INTO partida (data_de_inicio, adversario, tempo, tipo_de_jogo) VALUES ('${new Date(
      data_de_inicio
    )
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}', '${adversario}', ${tempo}, '${tipo_de_jogo}')`,
    function (err, rows) {
      if (err) {
        console.log("Erro ao selecionar dados", err);
        res.sendStatus(500);
      } else {
        res.json({ game: rows });
      }
    }
  );
});

app.get("/getGame/:id", function (req, res) {
  const { id } = req.params;
  db.query(`SELECT * FROM partida WHERE id = ${id}`, function (err, rows) {
    if (err) {
      console.log("Erro ao selecionar dados", err);
      res.sendStatus(500);
    } else {
      res.json({ game: rows });
    }
  });
});

app.put("/updateGameTime", function (req, res) {
  const { id, tempo } = req.body;
  db.query(
    `UPDATE partida SET tempo = ${tempo} WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        console.log("Erro ao selecionar dados", err);
        res.sendStatus(500);
      } else {
        res.json({ game: rows });
      }
    }
  );
});

app.put("/finishGame", function (req, res) {
  const { id } = req.body;
  db.query(
    `UPDATE partida SET data_de_termino = '${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}' WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        console.log("Erro ao selecionar dados", err);
        res.sendStatus(500);
      } else {
        res.json({ game: rows });
      }
    }
  );
});

app.post("/createGameEvent", function (req, res) {
  const { partida_id, jogador_id, evento_id, area_campo } = req.body;
  db.query(
    `INSERT INTO partida_eventos (partida_id, jogador_id, evento_id, area_campo) VALUES (${partida_id}, ${jogador_id}, ${evento_id}, ${area_campo})`,
    function (err, rows) {
      if (err) {
        console.log("Erro ao selecionar dados", err);
        res.sendStatus(500);
      } else {
        res.json({ game: rows });
      }
    }
  );
});

app.get("/getGameEvents/:partida_id", function (req, res) {
  const { partida_id } = req.params;

  db.query(
    `SELECT * FROM partida_eventos pe 
    JOIN eventos e ON pe.evento_id = e.id 
    JOIN partida p ON pe.partida_id = p.id WHERE p.id = ${partida_id}`,
    function (err, rows) {
      if (err) {
        console.log("Erro ao selecionar dados", err);
        res.sendStatus(500);
      } else {
        res.json({ eventos: rows });
      }
    }
  );
});

var server = app.listen(3001, function () {
  console.log("Listening on port " + server.address().port);
});
