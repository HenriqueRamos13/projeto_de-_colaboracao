CREATE TABLE jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    numero_da_camisa INT,
    jogando BOOLEAN DEFAULT false
);

CREATE TABLE partida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_de_inicio DATETIME,
    data_de_termino DATETIME,
    adversario VARCHAR(255) NOT NULL,
    tempo INT DEFAULT 1,
    tipo_de_jogo ENUM('futsal', 'basket') NOT NULL,
    pontuacao INT DEFAULT 0,
    pontuacao_rival INT DEFAULT 0
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo_de_jogo ENUM('futsal', 'basket') NOT NULL
);

CREATE TABLE partida_eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partida_id INT,
    evento_id INT,
    jogador_id INT,
    area_campo INT,
    FOREIGN KEY (partida_id) REFERENCES partida(id),
    FOREIGN KEY (evento_id) REFERENCES eventos(id),
    FOREIGN KEY (jogador_id) REFERENCES jogadores(id)
);

insert into eventos (nome, tipo_de_jogo) values 
    ('cesta de 3 pontos', 'basket'),
    ('cesta de 2 pontos', 'basket'),
    ('cesta de 1 ponto', 'basket'),
    ('sofreu falta', 'basket'),
    ('marcou falta', 'basket'),
    ('impedimento', 'basket');

insert into jogadores (nome, numero_da_camisa, jogando) values
    ('Henrique', 2, true),
    ('Joao', 3, true),
    ('Miguel', 4, true),
    ('Carlos', 5, true),
    ('Rui', 6, true),
    ('Matheus', 7, false),
    ('Gabriela', 8, false),
    ('Joel', 9, false),
    ('Joana', 10, false),
    ('Fernanda', 11, false),
    ('Carla', 12, false),
    ('Mafalda', 13, false);

