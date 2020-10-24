CREATE TABLE USERS
    (Username         VARCHAR(45)       NOT NULL,
     Password         VARCHAR(45)       NOT NULL,
    PRIMARY KEY (Username));
CREATE TABLE USER_DETAILS
    (Username         VARCHAR(45)       NOT NULL,
     First_name       VARCHAR(45),
     Birthdate        DATE,            
     Sex              CHAR(1),           
     Spayed_neutered  BIT,               
     Weight           INT,               
     Breed            VARCHAR(45),
     Zip_code         INT,               
     Bio              VARCHAR(500),
     Age_min_pref     INT,
     Age_max_pref     INT,
     Sex_pref         CHAR(1),
     Weight_min_pref  INT,
     Weight_max_pref  INT,
     Breed_pref       VARCHAR(45),
     Dist_pref        INT,
     Spayed_neutered_pref CHAR(1),
    PRIMARY KEY (Username),
    FOREIGN KEY (Username) REFERENCES USERS(Username)   ON DELETE CASCADE  ON UPDATE CASCADE);
CREATE TABLE MATCHES
    (Liker            VARCHAR(45)       NOT NULL,
     Likee            VARCHAR(45)       NOT NULL,
     Reciprocated     BIT               NOT NULL,
    PRIMARY KEY (Liker, Likee),
    FOREIGN KEY (Liker) REFERENCES USERS (Username)     ON DELETE CASCADE    ON UPDATE CASCADE,
    FOREIGN KEY (Likee) REFERENCES USERS (Username)     ON DELETE NO ACTION    ON UPDATE NO ACTION);
CREATE TABLE PHOTOS
    (Username         VARCHAR(45)         NOT NULL,
     PhotoID          VARCHAR(45)         NOT NULL,
    PRIMARY KEY (Username, PhotoID),
    FOREIGN KEY (Username) REFERENCES USERS (Username)   ON DELETE CASCADE    ON UPDATE CASCADE);