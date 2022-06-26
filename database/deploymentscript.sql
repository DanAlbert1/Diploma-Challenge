DROP VIEW IF EXISTS view_TREATMENT;
DROP TABLE IF EXISTS TREATMENT;
DROP TABLE IF EXISTS PET;
DROP TABLE IF EXISTS [OWNER];
DROP TABLE IF EXISTS [PROCEDURE];

GO 

CREATE TABLE OWNER(
    OwnerId INT IDENTITY(1,1) PRIMARY KEY,
    SurName NVARCHAR(300),
    FirstName NVARCHAR(300),
    Phone NVARCHAR(300)
    CONSTRAINT UN_OWNER UNIQUE (Phone)
);

GO

CREATE TABLE PET(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OwnerId INT FOREIGN KEY REFERENCES OWNER,
    PetName NVARCHAR(300),
    Type NVARCHAR(300)
    CONSTRAINT UN_PetOwner UNIQUE (OwnerId, PetName)
)

GO

CREATE TABLE [PROCEDURE](
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProcedureId INT,
    Description NVARCHAR(300),
    Price DECIMAL
)

GO 

CREATE TABLE TREATMENT(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FK_PetId INT FOREIGN KEY REFERENCES PET,
    FK_ProcedureId INT FOREIGN KEY REFERENCES [PROCEDURE],
    Date DATETIME,
    Notes NVARCHAR(300),
    Payment DECIMAL
)

GO 

CREATE VIEW view_TREATMENT
AS 
SELECT p.OwnerId, T.Id AS TreatmentId, T.FK_PetId, P.PetName, PR.Id as ProcedureId, PR.[DESCRIPTION] AS [ProcedureName], T.Date, T.Notes, T.Payment, (PR.Price - T.Payment) AS AmountOwed
FROM TREATMENT as T
INNER JOIN PET AS P ON T.FK_PetId = P.Id
INNER JOIN [PROCEDURE] AS PR ON PR.Id = T.FK_ProcedureId

GO

INSERT INTO [OWNER]
(
    Surname,
    FirstName,
    Phone
)

VALUES
    ('Sinatra', 'Frank', '400111222'),
    ('Ellington', 'Duke', '400222333'),
    ('Fitzgerald', 'Ella', '400333444');


GO 

INSERT INTO PET(
    OwnerId,
    PetName,
    Type
)
VALUES
    (1, 'Buster', 'Dog'),
    (1, 'Fluffy', 'Cat'),
    (2, 'Stew', 'Rabbit'),
    (3, 'Buster', 'Echidna');

GO

INSERT INTO [PROCEDURE](
    ProcedureId,
    Description,
    Price
)

VALUES
    (1, 'Rabies Vaccination', '24.00 '),
    (10, 'Examine and Treat Wound', '30.00 '),
    (5, 'Heart Worm Test', '25.00 '),
    (8, 'Tetnus Vaccination', '17.00 ');

GO 

INSERT INTO TREATMENT(
    FK_PetId,
    FK_ProcedureId,
    Date,
    Notes,
    Payment
)

VALUES
    (1, 1, '20-Jun-17', 'Routine Vaccination', 22.00),
    (1, 1, '15-May-18', 'Booster Shot', 24.00 ),
    (2, 2, '10-May-18', 'Wounds sustained in apparent cat fight.', 30.00),
    (3, 2, '10-May-18', 'Wounds sustained during attempt to cook the stew.', 30.00),
    (4, 4, '20-Jun-17', 'Stepped on a Rusty Nail', 17.00),
    (4, 1, '20-Jun-17', 'Routine Vaccination', 22.00);