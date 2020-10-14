in TablePlus

SELECT ShippedDate
FROM "Order"
WHERE Id = 19520;

SELECT *
FROM "Order"
WHERE OrderDate > 2016
ORDER BY OrderDate DESC
LIMIT 3;

SELECT *
FROM "Product"
ORDER BY UnitPrice DESC
LIMIT 1;


--INSERT INTO <table> (>columns>)
--VALUES <VALUES>


--Creating categories and values in database
INSERT INTO Category (CategoryName, Description)
VALUES ('Frozen', 'Ready-To-Eat Meals');


-- Descending (DESC) : z/y/x/w
-- Ascending (ASC) (default) : a/b/c/d
-- limit 3, only top three results 

--update data
UPDATE Category
SET Description = 'Desserts and ready-to-eat meals'
WHERE Id = 9;