-- Active: 1740001390614@@127.0.0.1@3306
CREATE TABLE address( 
cep TEXT NOT NULL PRIMARY KEY UNIQUE,
state TEXT NOT NULL,
city TEXT NOT NULL,
neighborhood TEXT NOT NULL,
street TEXT NOT NULL,
service TEXT NOT NULL
);
CREATE TABLE user ( 
id TEXT PRIMARY KEY UNIQUE NOT NULL, 
name TEXT NOT NULL, 
email TEXT UNIQUE NOT NULL, 
user_cep TEXT NOT NULL,
FOREIGN KEY (user_cep) REFERENCES address(cep)
); 
 INSERT INTO address (cep, state, city, neighborhood,street,service) 
VALUES 
 
("02248001","SP","São Paulo","Parada Inglesa", "Rua Cruz de Malta","on");

  INSERT INTO user (id, name, email, user_cep) 
VALUES 
 ('c001', 'Fulana', 'fulana@email.com', "02471210"), 
  ('c002', 'Ciclano', 'ciclano@email.com', "02471210"), 
  ('c003', 'Beltrana', 'beltrano@email.com', "02248001"); 

SELECT * FROM address 
INNER JOIN user
ON user.user_cep = address.cep;

select* from user;
DROP TABLE user;
DROP TABLE address;
