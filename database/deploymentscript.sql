USE DiplomaChallengeSem1;
--USE challenge;


DROP VIEW IF EXISTS view_TREATMENT;
DROP VIEW IF EXISTS view_PROCEDURE;
DROP TABLE IF EXISTS ProcedureSelection;
DROP TABLE IF EXISTS TREATMENT;
DROP TABLE IF EXISTS PETSelection;
DROP TABLE IF EXISTS [PROCEDURE];
DROP TABLE IF EXISTS PET;
DROP TABLE IF EXISTS [OWNER];

GO

CREATE TABLE [OWNER]
(   
    OwnerId INT IDENTITY(1,1) PRIMARY Key,
    UserID NVARCHAR(300),
    Surname NVARCHAR(300),
    Firstname NVARCHAR(300),
    Email NVARCHAR(300),
    Phone NVARCHAR(300),    
);

GO

-- CREATE TABLE tbl_USER(
--     ID int IDENTITY(1,1),
    
-- )

-- GO

CREATE TABLE PET
(
	ID INT IDENTITY(1,1) PRIMARY KEY,
    OwnerId INT FOREIGN KEY REFERENCES [OWNER],    
    PetName NVARCHAR(300),
    [Type] NVARCHAR(300),
	UNIQUE (OwnerID, PetName)
);

GO

CREATE TABLE [PROCEDURE]
(
    ProcedureID INT PRIMARY KEY,
    [Description] NVARCHAR(300),
    Price MONEY
);

GO

CREATE TABLE TREATMENT
(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    OwnerID INT FOREIGN KEY REFERENCES [OWNER],
    PetName NVARCHAR(300),
    ProcedureID INT FOREIGN key REFERENCES [PROCEDURE],
    [Date] DATE,
    Notes NVARCHAR(300),
    Payment MONEY
);

GO

CREATE VIEW view_TREATMENT AS
SELECT T.*, (P.Price - T.Payment) AS AmountOwed
FROM TREATMENT AS T
INNER JOIN [PROCEDURE] AS P ON T.ProcedureID = P.ProcedureID;

GO


CREATE VIEW view_PROCEDURE AS 
SELECT t.OwnerID,t.PetName,t.[Date],p.ProcedureID, p.[Description], p.Price
FROM TREATMENT AS T
INNER JOIN [PROCEDURE] AS P ON T.ProcedureID = P.ProcedureID;

GO

INSERT INTO [OWNER] (UserID, Surname,Firstname,Phone, email )
VALUES
    ('auth0|62aadf7f430b9f209305db7a','Sinatra', 'Frank', '400111222','Sinatra@example.com' ),
    ('auth0|62aadfb55f91adecb61b9bd9','Ellington', 'Duke', '400222333','Ellington@example.com'),
    ('auth0|62aadfd8dc7486a3ede1c34e','Fitzgerald', 'Ella', '400333444','Fitzgerald@example.com');

GO
INSERT INTO [dbo].[PROCEDURE]
			([ProcedureID], [Description],[Price])
VALUES
	(1, 'Rabies Vaccination', 24.00 ),
	(10, 'Examine and Treat Wound', 30.00),
	(5, 'Heart Worm Test', 25.00 ),
    (8, 'Heart Worm Test', 25.00 );
           
GO

INSERT INTO PET (OwnerID,PetName,Type )
VALUES
    (1, 'Buster', 'Dog '),
    (1, 'Fluffy', 'Cat '),
    (2, 'Stew', 'Rabbit '),
    (3, 'Buster', 'Echidna ');

GO

INSERT INTO TREATMENT ([OwnerID],[PetName],[ProcedureID],[Date],[Notes],[Payment] )
VALUES
    (1, 'Buster', 1, '20-Jun-17', 'Routine Vaccination', ' 22.00  '),
    (1, 'Buster', 1, '15-May-18', 'Booster Shot', ' 24.00  '),
    (1, 'Fluffy', 10, '10-May-18', 'Wounds sustained in apparent cat fight.', ' 30.00  '),
    (2, 'Stew', 10, '10-May-18', 'Wounds sustained during attempt to cook the stew.', ' 30.00  '),
    (3, 'Buster', 8, '20-Jun-17', 'Stepped on a Rusty Nail', ' 17.00  ');