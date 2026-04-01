create table Utilizador ( 
uti_id bigint not null auto_increment, 
uti_nome varchar(255) not null,
uti_email varchar(255) unique not null, 
uti_password varchar(255) not null,
uti_data_nascimento date, 
uti_genero varchar(255),
uti_estado boolean default true,
uti_verificado boolean default false,
uti_token_recuperacao varchar(255),
uti_ultimo_login datetime,
uti_tentativas_login int default 0 
primary key (uti_id), 
) engine=InnoDB; 

create table tipo_anomalia (
tipo_id bigint not null auto_increment, 
tipo_nome varchar(255) not null unique,
primary key (tipo_id) 
) engine=InnoDB; 

create table Anomalia ( 
ano_id bigint not null auto_increment, 
tipo_id bigint, 
ano_descricao varchar (255), 
ano_data_detecao date default (current_date),
ano_estado varchar(255),
ano_severidade varchar(255),
ano_grau_perigo enum('Baixo','Médio','Alto'), 
uti_id bigint, 
loc_id bigint,
data_registo timestamp default current_timestamp,
foreign key (tipo_id) references tipo_anomalia(tipo_id)
  on delete set null on update cascade,
foreign key (uti_id) references Utilizador(uti_id)
   on delete set null on update cascade,
foreign key (loc_id) references localicao(loc_id)
on delete set null on update cascade 
primary key (ano_id) 

) engine=InnoDB; 

create table Zona ( 
zon_id bigint not null auto_increment primary key, 
ano_id bigint not null, 
localizacao varchar(225) not null, 
foreign key (ano_id) references Anomalia( ano_id) 
) engine= InnoDB; 

create table localizacao (
loc_id bigint not null auto_increment, 
loc_latitide double, 
loc_longitude double, 
loc_descricao varchar(255),
loc_endereco varchar(255),
primary key (loc_id)
) engine=InnoDB;

create table Notificacao ( 
not_id bigint auto_increment primary key,
not_mensagem varchar (255) not null,
not_tipo varchar(255), 
ano_id bigint not null,
not_uti_id bigint not null,
not_lida boolean default false, 
loc_id bigint not null, 
not_data_envio datetime default current_timestamp, 
foreign key (ano_id) references Anomalia(ano_id)
  on delete cascade on update cascade,
foreign key (loc_id) references Localizacao(loc_id)
  on delete cascade on update cascade,
foreign key (not_uti_id) references utilizador(uti_id)
on delete cascade on update cascade 
) engine=innoDB; 


create table comentario ( 
com_id bigint auto_increment primary key,
 ano_id bigint not null, 
uti_id bigint not null, 
texto varchar(255) not null, 
data datetime default current_timestamp, 
foreign key (ano_id) references Anomalia(ano_id), 
foreign key (uti_id) references Utilizador(uti_id)
) engine=InnoDB;

create table Reporte (
rep_id bigint auto_increment primary key, 
rep_uti_id bigint not null,
rep_ano_id bigint not null,
rep_loc_id nullable,
rep_foto_url varchar (255),
rep_estado enum ('Pendente', 'em analise', 'resolvido'), 
rep_data timestamp default current_timestamp,
rep_descricao varchar (255),
rep_tipo_personalizado varchar (255), 
foreign key (rep_uti_id) references Utilizador(uti_id)
  on delete cascade on update cascade,
foreign key (rep_ano_id) references Anomalia (ano_id)
 on delete cascade on update cascade,
foreign key (rep_loc_id) references Localizacao (loc_id)
  on delete set null on update cascade,
) engine=InnoDB; 

create table Fotografia (
foto_id bigint auto_increment primary key, 
foto_nome varchar(100),
foto_caminho varchar(255),
foto_mime varchar (50),
foto_tamanho bigint,
foto_descricao varchar(255),
fot_data_upload datetime default current_timestamp,
foto_rep_id bigint, 
fot_ano_id bigint,
fot_uti_id bigint,
foto_url varchar(225),  
foreign key (fot_ano_id) references Anomalia( ano_id),
foreign key (fot_rep_id) references reporte(rep_id), 
foreign key(fot_uti_id) references utilizador(uti_id) 
) engine=InnoDB; 
----------------------------------------------------------------

CREATE TABLE Role (
  role_id BIGINT NOT NULL AUTO_INCREMENT,
  role_nome VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (role_id)
) ENGINE=InnoDB;

ALTER TABLE Utilizador
ADD COLUMN role_id BIGINT,
ADD FOREIGN KEY (role_id) REFERENCES Role(role_id)
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE TipoRota (
  tipo_rota_id BIGINT NOT NULL AUTO_INCREMENT,
  tipo_rota_nome VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (tipo_rota_id)
) ENGINE=InnoDB;

CREATE TABLE RotaAlternativa (
  rota_id BIGINT NOT NULL AUTO_INCREMENT,
  ano_id BIGINT NOT NULL,
  tipo_rota_id BIGINT NOT NULL,
  rota_descricao VARCHAR(255),
  rota_distancia DOUBLE,
  rota_tempo_estimado INT,
  PRIMARY KEY (rota_id),
  FOREIGN KEY (ano_id) REFERENCES Anomalia(ano_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (tipo_rota_id) REFERENCES TipoRota(tipo_rota_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;



