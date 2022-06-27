DROP VIEW IF EXISTS [view_orders];
DROP TABLE IF EXISTS [Order];
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Segment;
DROP TABLE IF EXISTS Region;
DROP TABLE IF EXISTS Shipping;

CREATE TABLE Category(
    CatId INT IDENTITY(1,1) PRIMARY KEY,
    CatName NVARCHAR(300),
);

GO

CREATE TABLE Segment(
    Id INT IDENTITY(1,1) PRIMARY key,
    SegName NVARCHAR(300)
)

GO

CREATE TABLE Shipping(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ShipMode NVARCHAR(300)
)

GO

CREATE TABLE Region(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Region NVARCHAR(300)
)

GO 

CREATE TABLE Customer(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustId NVARCHAR(300),
    FullName NVARCHAR(300),
    SegId INT FOREIGN KEY REFERENCES Segment,
    Country NVARCHAR(300),
    City NVARCHAR(300),
    [State] NVARCHAR(300),
    PostCode INT,
    Region INT FOREIGN KEY REFERENCES Region
);

GO

CREATE TABLE Product(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProdId NVARCHAR(300),
    CatId INT FOREIGN KEY REFERENCES Category,
    [Description] NVARCHAR(300),
    UnitPrice DECIMAL
);

GO

CREATE TABLE [Order](
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT FOREIGN key REFERENCES Customer,
    ProductId int FOREIGN key REFERENCES Product,
    OrderDate DATETIME,
    Quantity INT,
    ShipDate DATETIME,
    ShipMode INT REFERENCES Shipping
);

GO

CREATE VIEW view_orders 
AS
SELECT o.Id,c.Id AS CustId ,p.[Description], o.OrderDate, o.Quantity, o.ShipDate, s.ShipMode
FROM Customer AS C
INNER JOIN [Order] AS O ON C.Id = O.CustomerId
INNER JOIN Product AS P ON P.Id = o.ProductId
INNER JOIN Shipping AS S ON S.Id = o.ShipMode;

GO

INSERT INTO Region (Region )
VALUES
    ('South'),
    ('Central'),
    ('West'),
    ('East'),
    ('North');

GO

INSERT INTO Segment (SegName)
VALUES
    ('Consumer'),
    ('Corporate'),
    ('Home Office');
GO

INSERT INTO Category (CatName )
VALUES
    ('Furniture '),
    ('Office Supplies '),
    ('Technology ');

GO

INSERT INTO Shipping (ShipMode )
VALUES
    ('Second Class'),
    ('Standard Class'),
    ('First Class'),
    ('Overnight Express');

GO

INSERT INTO Product (ProdID,CatID,[Description],UnitPrice )
VALUES
    ('FUR-BO-10001798', 1, 'Bush Somerset Collection Bookcase', '261.96 '),
    ('FUR-CH-10000454', 3, 'Mitel 5320 IP Phone VoIP phone', '731.94 '),
    ('OFF-LA-10000240', 2, 'Self-Adhesive Address Labels for Typewriters by Universal', '14.62 ');

GO


INSERT INTO Customer (CustID,FullName,SegID,Country,City,[State],PostCode,Region )
VALUES
    ('CG-12520', 'Claire Gute', 1, 'United States', 'Henderson', 'Oklahoma', '42420', 2),
    ('DV-13045', 'Darrin Van Huff', 2, 'United States', 'Los Angeles', 'California', '90036', 3),
    ('SO-20335', 'Sean O''Donnell', 1, 'United States', 'Fort Lauderdale', 'Florida', '33311', 1),
    ('BH-11710', 'Brosina Hoffman', 3, 'United States', 'Los Angeles', 'California', '90032', 3);
GO

INSERT INTO [Order] (CustomerID,ProductID,OrderDate,Quantity,ShipDate,ShipMode )
VALUES
    (1,1, '2016-11-08', '2', '2016-11-11',1),
    (1,2, '2016-11-08', '3', '2016-11-11',1),
    (1,3, '2016-06-12', '2', '2016-06-16',1),
    (2,3, '2015-11-21', '2', '2015-11-26',1),
    (2,3, '2014-10-11', '1', '2014-10-15',2),
    (2,2, '2016-11-12', '9', '2016-11-16',2),
    (3,3, '2016-09-02', '5', '2016-09-08',2),
    (3,1, '2017-08-25', '2', '2017-08-29',4),
    (3,2, '2017-06-22', '2', '2017-06-26',2),
    (3, 1, '2017-05-01', '3', '2017-05-02',3);