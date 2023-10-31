CREATE TABLE jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    numero_da_camisa INT
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

insert into jogadores (nome, numero_da_camisa) values
    ('Henrique', 2),
    ('Joao', 3),
    ('Miguel', 4),
    ('Carlos', 5),
    ('Rui', 6),
    ('Matheus', 7),
    ('Gabriela', 8),
    ('Joel', 9),
    ('Joana', 10),
    ('Fernanda', 11),
    ('Carla', 12),
    ('Mafalda', 13);

