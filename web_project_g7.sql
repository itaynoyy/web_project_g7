DROP DATABASE web_project_g7;
CREATE DATABASE web_project_g7;
USE web_project_g7;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_type` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `max_participants` int(11) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `lecturer` varchar(100) NOT NULL,
   `Date` datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `class_join` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `message` text NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `credit_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `number` varchar(30) NOT NULL,
  `expiry_year` int(11) NOT NULL,
  `expiry_month` int(11) NOT NULL,
  `cvv` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `customize_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `size` varchar(11) NOT NULL,
  `price` float NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `customize_product_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customize_id` int(11) NOT NULL,
  `flower_id` int(11) NOT NULL,
      PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `flower` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(100) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_type` varchar(20) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `delivery_method` varchar(100) NOT NULL,
  `delivery_price` float NOT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `recipient_address` varchar(256) NOT NULL,
  `recipient_phone` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `picture` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `description` text NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `special_dates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `title` varchar(100) NOT NULL,
      PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address_city` varchar(100) NULL,
  `address_street` varchar(100) NULL,
  `address_zipcode` int(100) NULL,
  `address_number` varchar(100) NULL,
  `date_of_birth` date NULL,
  `picture` varchar(100) NULL,
  `role` varchar(20) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;






ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `class_join`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `credit_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `customize_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `customize_product_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `flower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `special_dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;



insert into product
(id,name, price, picture,type,description) 
values 
 ('1','gozmania','120','8c643497-ed25-42b6-bf9b-9b01d62437f1.jpg','Flower pots','fresh-gozmania')
,('2','gozmania12-grey','125','ee070328-abf5-479b-aec8-dad5605a9fcc.jpg','Flower pots','fresh- gray gozmania')
,('3','Anturiom','250','d6933da3-5652-4884-a8d0-d6edba0529a5.jpg','Flower pots','Red')
,('4','Anturiom white','260','3326a755-8c5e-48bc-a62b-f1457f6e2ca2.jpg','Flower pots','white')
,('5','Sorento','510','c831df2b-8edb-485d-b234-f3b4c1c759e6.jpg','Flower pots','green')
,('6','Positano','600','dc28b9b5-4c6b-4b6a-98d1-dfd6324a26a7.jpg','Flower pots','green'),
 ('7','gozmania16','120','8c643497-ed25-42b6-bf9b-9b01d62437f1.jpg','Flower pots','fresh-gozmania')
,('8','gozmania14-grey','125','ee070328-abf5-479b-aec8-dad5605a9fcc.jpg','Flower pots','fresh- gray gozmania')
,('9','Anturiom12','250','d6933da3-5652-4884-a8d0-d6edba0529a5.jpg','Flower pots','Red')
,('10','Anturiom white12','260','3326a755-8c5e-48bc-a62b-f1457f6e2ca2.jpg','Flower pots','white')
,('11','Sorento12','510','c831df2b-8edb-485d-b234-f3b4c1c759e6.jpg','Flower pots','green')
,('12','Positano18','600','dc28b9b5-4c6b-4b6a-98d1-dfd6324a26a7.jpg','Flower pots','green')
,('13','gozmania20','120','8c643497-ed25-42b6-bf9b-9b01d62437f1.jpg','Flower pots','fresh-gozmania')
,('14','gozmania21-grey','125','ee070328-abf5-479b-aec8-dad5605a9fcc.jpg','Flower pots','fresh- gray gozmania')
,('15','Anturiom-grey','250','d6933da3-5652-4884-a8d0-d6edba0529a5.jpg','Flower pots','Red')
,('16','Anturiom ppp','260','3326a755-8c5e-48bc-a62b-f1457f6e2ca2.jpg','Flower pots','white')
,('17','SorentoKI','510','c831df2b-8edb-485d-b234-f3b4c1c759e6.jpg','Flower pots','green')
,('18','PositanoC','600','dc28b9b5-4c6b-4b6a-98d1-dfd6324a26a7.jpg','Flower pots','green')




,('37','WHITE','120','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','WHITE')
,('38','RED WHITE','125','7fe25a93-ca5a-4229-a982-ce5bde1a76e2.png','Bouquets','RED')
,('39','BLUE','250','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('40','Roses-Plakona','260','61ZkSIkmtfL._SL1200_.jpg','Bouquets','green')
,('41','WHITE','500','179fdcab-7f3a-4d6c-bb8e-b2200e16b81e.jpg','Bouquets','WHITE')
,('42','RED WHITE','510','6fb94067-acc0-4ba1-9f92-0a643ea3a60f.jpg','Bouquets','RED')
,('43','BLUE','600','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('44','GREEN','125','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','green')
,('45','GREEN-ROSE','260','PH-bouquet-rename-LR-04_1200x.jpg','Bouquets','green')
,('46','WHITE','500','179fdcab-7f3a-4d6c-bb8e-b2200e16b81e.jpg','Bouquets','WHITE')
,('47','RED WHITE','510','6fb94067-acc0-4ba1-9f92-0a643ea3a60f.jpg','Bouquets','RED')
,('48','BLUE','600','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('49','GREEN','125','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','green')
,('76','WHITE-12','130','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','WHITE')
,('77','RED WHITE-17','125','7fe25a93-ca5a-4229-a982-ce5bde1a76e2.png','Bouquets','RED')
,('78','BLUE','250','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('79','Hamania','260','A003-copy.jpg','Bouquets','green')
,('50','WHITE','500','179fdcab-7f3a-4d6c-bb8e-b2200e16b81e.jpg','Bouquets','WHITE')
,('51','RED WHITE-Y','517','6fb94067-acc0-4ba1-9f92-0a643ea3a60f.jpg','Bouquets','RED')
,('52','BLUE','600','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('53','GREEN','125','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','green')
,('54','ROSES','265','61ZkSIkmtfL._SL1200_.jpg','Bouquets','green')
,('55','WHITE','500','179fdcab-7f3a-4d6c-bb8e-b2200e16b81e.jpg','Bouquets','WHITE')
,('56','RED WHITE','510','6fb94067-acc0-4ba1-9f92-0a643ea3a60f.jpg','Bouquets','RED')
,('57','BLUE','600','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('58','GREEN13','139','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','green')
,('59','WHITE','120','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','WHITE')
,('60','RED WHITE','125','7fe25a93-ca5a-4229-a982-ce5bde1a76e2.png','Bouquets','RED')
,('61','BLUE','250','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('62','GREEN','260','PH-bouquet-rename-LR-04_1200x.jpg','Bouquets','green')
,('63','WHITE','500','179fdcab-7f3a-4d6c-bb8e-b2200e16b81e.jpg','Bouquets','WHITE')
,('64','RED WHITE','510','6fb94067-acc0-4ba1-9f92-0a643ea3a60f.jpg','Bouquets','RED')
,('65','BLUE','600','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('66','GREEN','125','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','green')
,('67','Hamania17','260','A003-copy.jpg','Bouquets','green')
,('68','WHITE','500','179fdcab-7f3a-4d6c-bb8e-b2200e16b81e.jpg','Bouquets','WHITE')
,('69','RED WHITE','510','6fb94067-acc0-4ba1-9f92-0a643ea3a60f.jpg','Bouquets','RED')
,('70','BLUE','600','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','BLUE')
,('71','GREEN','125','69fac2f9-2877-4d8a-94ef-9c7b9d3f9160.png','Bouquets','green')

,('72','WHITE','120','zer1.jpg','Flower crowns','WHITE')
,('73','RED WHITE','125','zer2.jpg','Flower crowns','RED')
,('74','BLUE','250','zer3.jpg','Flower crowns','BLUE')
,('75','PH','260','zer2.jpg','Flower crowns','green')
,('19','WHITE','500','zer1.jpg','Flower crowns','WHITE')
,('20','RED WHITE','510','zer2.jpg','Flower crowns','RED')
,('21','BLUE','600','zer2.jpg','Flower crowns','BLUE')
,('22','GREEN','125','7224e951-a6e2-4528-a227-57826b7a78f7.jpg','Flower crowns','green')

,('23','table e','120','ea8e70cd-b557-4141-aff9-2002849920b5.png','Table arrangements','WHITE')
,('24','sivan','125','17932d2b-a80f-4bac-9f29-e8187753d94d.png','Table arrangements','RED')
,('25','rosh hashana','250','sidur1.jpg','Table arrangements','BLUE')
,('26','table two','260','sidur2.jpg','Table arrangements','green')
,('100','table TLOK','275','sidur3.jpg','Table arrangements','BLUE')
,('27','table rd','500','sidur3.jpg','Table arrangements','WHITE')
,('28','table th','510','sidur1.jpg','Table arrangements','RED')
,('29','table hte','600','sidur3.jpg','Table arrangements','BLUE')


,('30','wed','120','cala1.jpg','Bridal bouquet','WHITE')
,('31','weda','125','cala2.jpg','Bridal bouquet','RED')
,('32','wedb','250','0156b901-4301-4c4b-a757-4958bae2e3fd.webp','Bridal bouquet','BLUE')
,('33','wedc','260','b73b932d-8c73-4e39-8826-cbc096a2db58.webp','Bridal bouquet','green')
,('34','wedd','500','3306a10b-8a05-4e5a-be8c-2a9eeb1d5b5d.webp','Bridal bouquet','WHITE')
,('35','wede','510','53255826-a97e-4736-b700-2b2023f76606.webp','Bridal bouquet','RED')
,('36','wedf','600','e1e674e5-3bdc-474f-865f-fe40244bd4d0.webp','Bridal bouquet','BLUE')
;



insert into cart(id,user_id,product_type,product_id,quantity)
values
('1','2', 'Flower pots','2','1'),
('2','2','Flower pots','3','1'),
('3','2', 'Flower pots','2','4'),
('4','3', 'Bouquets','3','1'),
('5','3', 'Bouquets','4','3'),
('6','3', 'Bouquets','1','1'),
('7','2', 'Flower pots','1','1'),
('8','2','Flower pots','3','1'),
('9','2', 'Flower pots','2','1'),
('10','3', 'Bouquets','3','1'),
('11','3', 'Bouquets','4','2'),
('12','3', 'Bouquets','2','1')
;

insert into flower  ( id,name,description,picture)
values 
('1','Ranunculus', 'A spring flower that symbolizes good grades','a017cf27-b639-4136-bbe3-94e8d685755f.jpg'),
('2','Roses','roses ','roses.jpg'),
('3','White-flower', 'A spring flower that symbolizes new Beginnings','roshHashana.jpg'),
('4','Sachlav', 'The Orchidaceae are a diverse and widespread family of flowering plants.','sachlav-dimond.jpg'),
('5','The red', 'A spring flower that symbolizes good grades','067cb049-7a16-49d9-8321-54b7c98964df.jpg'),
('6','Sivan', 'A spring uniq flower that symbolizes love','f1ad57cd-a95f-4dee-867e-261724f476d2.png')
;

INSERT INTO class
	(id,max_participants,description,name,price,lecturer,Date)
VALUES

('116','5','Beginners course for learning weaving','Bouquet creation course','100','DANI','2021-10-04 00:00:00'),	
('7','2','Advanced course Bouquet','Bouquet creation course','200','YARDEN','2021-10-04 00:00:00'),	
('8','5','Beginners course Bouquetg','Bouquet creation course','210','YARDEN','2021-10-05 00:00:00'),	
('9','2','Advanced course Bouquet','Bouquet creation course','210','DANIELLE','2021-10-06 00:00:00'),
('10','5','Advanced course Bouquet','Bouquet creation course','210','NOAM','2021-10-07 00:00:00'),
('11','4','Beginners course Bouquet','Bouquet creation course','110','RONI','2021-10-08 00:00:00'),
('12','5','Advanced course for learning weaving','Bouquet creation course','110','GILLI','2021-10-09 00:00:00'),
('13','3','Beginners course for learning weaving','Bouquet creation course','110','GILLI','2021-10-10 00:00:00'),
('16','5','Beginners course for learning weaving','Bouquet creation course','100','DANI','2021-10-11 00:00:00'),	
('17','2','Advanced course Bouquet','Bouquet creation course','200','YARDEN','2021-10-12 00:00:00'),	
('18','5','Beginners course Bouquetg','Bouquet creation course','210','YARDEN','2021-10-13 00:00:00'),	
('19','2','Advanced course Bouquet','Bouquet creation course','210','DANIELLE','2021-10-14 00:00:00'),
('110','5','Advanced course Bouquet','Bouquet creation course','210','NOAM','2021-10-15 00:00:00'),
('111','4','Beginners course Bouquet','Bouquet creation course','110','RONI','2021-10-16 00:00:00'),
('121','5','Advanced course for learning weaving','Bouquet creation course','110','GILLI','2021-10-18 00:00:00'),
('113','3','Beginners course for learning weaving','Bouquet creation course','110','GILLI','2021-10-20 00:00:00'),
('28','3','Beginners course for learning weaving','Bouquet creation course','110','GILLI','2021-10-21 00:00:00'),
('20','5','Beginners course for learning weaving','Bouquet creation course','100','DANI','2021-10-22 00:00:00'),	
('21','2','Advanced course Bouquet','Bouquet creation course','200','YARDEN','2021-10-23 00:00:00'),	
('22','5','Beginners course Bouquetg','Bouquet creation course','210','YARDEN','2021-10-24 00:00:00'),	
('23','2','Advanced course Bouquet','Bouquet creation course','210','DANIELLE','2021-11-01 00:00:00'),
('24','5','Advanced course Bouquet','Bouquet creation course','210','NOAM','2021-11-02 00:00:00'),
('25','4','Beginners course Bouquet','Bouquet creation course','110','RONI','2021-10-28 00:00:00'),
('26','5','Advanced course for learning weaving','Bouquet creation course','110','GILLI','2021-11-03 00:00:00'),
('27','3','Beginners course for learning weaving','Bouquet creation course','110','GILLI','2021-11-04 00:00:00'),
('1116','5','Beginners course for learning weaving','Bouquet creation course','100','DANI','2021-10-25 00:00:00'),	
('77','2','Advanced course Bouquet','Bouquet creation course','200','YARDEN','2021-10-26 00:00:00'),	
('78','5','Beginners course Bouquetg','Bouquet creation course','210','YARDEN','2021-10-27 00:00:00'),	
('79','2','Advanced course Bouquet','Bouquet creation course','210','DANIELLE','2021-11-05 00:00:00'),
('710','5','Advanced course Bouquet','Bouquet creation course','210','NOAM','2021-11-06 00:00:00'),
('711','4','Beginners course Bouquet','Bouquet creation course','110','RONI','2021-10-28 00:00:00'),
('712','5','Advanced course for learning weaving','Bouquet creation course','110','GILLI','2021-10-29 00:00:00'),
('713','3','Beginners course for learning weaving','Bouquet creation course','110','GILLI','2021-10-08 00:00:00'),
('716','5','Beginners course for learning weaving','Bouquet creation course','100','DANI','2021-10-09 00:00:00'),	
('717','2','Advanced course Bouquet','Bouquet creation course','200','YARDEN','2021-10-10 00:00:00'),	
('7118','5','Beginners course Bouquetg','Bouquet creation course','210','YARDEN','2021-10-11 00:00:00'),	
('119','2','Advanced course Bouquet','Bouquet creation course','210','DANIELLE','2021-11-07 00:00:00'),
('7110','5','Advanced course Bouquet','Bouquet creation course','210','NOAM','2021-11-07 00:00:00'),
('1111','4','Beginners course Bouquet','Bouquet creation course','110','RONI','2021-10-18 00:00:00'),
('1121','5','Advanced course for learning weaving','Bouquet creation course','110','GILLI','2021-10-20 00:00:00'),
('1113','3','Beginners course for learning weaving','Bouquet creation course','110','GILLI','2021-10-21 00:00:00'),
('7128','3','Beginners course for learning weaving','Bouquet creation course','110','GILLI','2021-10-22 00:00:00'),
('7120','5','Beginners course for learning weaving','Bouquet creation course','100','DANI','2021-10-23 00:00:00'),	
('1211','2','Advanced course Bouquet','Bouquet creation course','200','YARDEN','2021-10-24 00:00:00'),	
('122','5','Beginners course Bouquetg','Bouquet creation course','210','YARDEN','2021-10-25 00:00:00'),	
('1237','2','Advanced course Bouquet','Bouquet creation course','210','DANIELLE','2021-11-08 00:00:00'),
('1247','5','Advanced course Bouquet','Bouquet creation course','210','NOAM','2021-11-09 00:00:00'),
('1257','4','Beginners course Bouquet','Bouquet creation course','110','RONI','2021-10-28 00:00:00'),
('1267','5','Advanced course for learning weaving','Bouquet creation course','110','GILLI','2021-11-10 00:00:00'),
('1277','3','Beginners course for learning weaving','Bouquet creation course','110','GILLI','2021-10-11 00:00:00');

;
insert into class_join (id,user_id,date,class_id)
values ('2','2','2021-10-04','7'),
('3','3','2021-10-04','7'),
('4','4','2021-10-04','116'),
('5','2','2021-10-05','8'),
('6','3','2021-10-05','8'),
('7','4','2021-10-04','116');
insert into orders
(id,date,delivery_method,delivery_price,recipient_name,recipient_address,recipient_phone,user_id)
values ('2','2021-08-07 00:00:00','car delivery','20','noam','Rotshild TLV','052-8656987','2'),
('3','2021-11-11 00:00:00','car delivery','20','noam','Rotshild TLV','052-8656987','3'),
('4','2021-06-11 00:00:00','car delivery','20','danielle','Rotshild TLV','052-8656987','3'),
('5','2021-10-07 00:00:00','car delivery','20','lee','Rotshild TLV','052-8656987','3'),
('6','2021-10-02 00:00:00','car delivery','20','itay','Rotshild TLV','052-8656987','2'),
('7','2021-09-07 00:00:00','car delivery','20','noam','Rotshild TLV','052-8656987','2');


insert into orderitem(id,order_id,item_id,item_type)
values ('2','2','33','product'),
('3','3','33','product'),
('4','4','33','product'),
('5','5','33','product'),
('6','6','33','product'),
('7','7','2','product'),
('8','2','2','product');

insert into users (id,first_name,last_name,email,password,address_city,address_street,address_zipcode,address_number,date_of_birth,picture,role)
values 
('2','danielle','borreda','1233@gmail.com','1233','RISHON LEZION','ljkhkh','23333','23333','1995-04-03','user-girl.png','customer'),
('3','noam','zion','nznoam@gmail.com','1234','TEL AVIV','ljkhkh','23333','23333','1992-04-03','user-boy.png','admin'),
('4','itay','noy','itay@gmail.com','1233','RISHON LEZION','ljkhkh','23333','23333','1992-04-03','user-boy.png','admin'),
('5','liraz','noy','liraz@gmail.com','1233','RISHON LEZION','ljkhkh','23333','23333','1992-04-03','woman-user.png','customer')