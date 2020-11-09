INSERT INTO USERS
VALUES ('Remi_01', 'remi123'),
('Gus_01', 'gus123'),
('Kona_01', 'kona123');

INSERT INTO USER_DETAILS
VALUES ('Remi_01', 'Remi', '2019-09-23', 'M', 1, 23, 'French Bulldog', 21090, 
'I like to play frisbee.', 0, 10, 'X', 10, 60, 'Any', 15, 'x'),
('Gus_01', 'Gus', '2017-01-15', 'M', 1, 45, 'Bull Terrier', 21090, 
'I like to chew furniture.', 1, 10, 'X', 15, 100, 'Any', 20, 'x'),
('Kona_01', 'Kona', '2008-06-30', 'M', 1, 70, 'Australian Shepherd', 21090, 
'I like to sleep and bark.', 2, 16, 'X', 25, 100, 'Any', 25, 'x');

INSERT INTO PHOTOS
VALUES ('Remi_01', 'remi-pic1'),
('Remi_01', 'remi-pic2'),
('Remi_01', 'remi-pic3'),
('Remi_01', 'remi-pic4'),
('Gus_01', 'gus-pic1'),
('Gus_01', 'gus-pic2'),
('Gus_01', 'gus-pic3'),
('Gus_01', 'gus-pic4'),
('Kona_01', 'kona-pic1'),
('Kona_01', 'kona-pic2'),
('Kona_01', 'kona-pic3');

INSERT INTO MATCHES
VALUES('Remi_01', 'Gus_01', 1),
('Kona_01', 'Gus_01', 1),
('Remi_01', 'Kona_01', 0);



