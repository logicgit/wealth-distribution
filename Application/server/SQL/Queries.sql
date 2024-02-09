INSERT INTO json_data
VALUES ('Book data', '[{"id":1,"title":"Test title"}]' );

INSERT INTO json_data
VALUES ('Interest Rates', '{"InterestRates" : {"UK" : "5.25"}}' );

INSERT INTO json_data
VALUES ('Poverty Data', '{"Poverty" : {"Total" : "15400000", "Children" : "4200000",  "Adults" : "8100000",  "Pensioners" : "2100000"}}' );

INSERT INTO json_data
VALUES ('Comparison Data', '{"ComparisonItems" : [{"Name" : "iPhone","Cost" : "1000","Image" : "../images/phone.png"},{"Name" : "Ferrari","Cost" : "200000","Image" : "images/ferrari.png"},{"Name" : "Super Yacht","Cost" : "20000000","Image" : "images/boat.png"}]}' );

INSERT INTO json_data
VALUES ('Wealth Data',
'{
    "Wealth" : [
        {"Rank" : "#","Name" : "Total","Wealth" : "290.480","Yearly Change" : "6.528","Industry" : ""},
        {"Rank" : "1","Name" : "Gopi Hinduja and family","Wealth" : "35","Yearly Change" : "6.528","Industry" : "Industry and finance: Hinduja Group"},
        {"Rank" : "2","Name" : "Sir Jim Ratcliffe","Wealth" : "29.688","Yearly Change" : "23.613","Industry" : "Chemicals: Ineos"},
        {"Rank" : "3","Name" : "Sir Leonard Blavatnik","Wealth" : "28.625","Yearly Change" : "8.625","Industry" : "Investment, music and media: Access Industries"},
        {"Rank" : "4","Name" : "David and Simon Reuben and family","Wealth" : "24.399","Yearly Change" : "2.134","Industry" : "Property and internet: Reuben Brothers"},
        {"Rank" : "5","Name" : "Sir James Dyson and family","Wealth" : "23","Yearly Change" : "0","Industry" : "Technology: Dyson Group"},
        {"Rank" : "6","Name" : "Lakshmi Mittal and family","Wealth" : "16","Yearly Change" : "-1","Industry" : "Steel: ArcelorMittal"},
        {"Rank" : "7","Name" : "Guy, George, Alannah and Galen Weston and family","Wealth" : "14.5","Yearly Change" : "1","Industry" : "Retail: Primark"},
        {"Rank" : "8","Name" : "Charlene de Carvalho-Heineken and Michel de Carvalho","Wealth" : "13.122","Yearly Change" : "1.701","Industry" : "Inheritance, brewing and banking: Heineken"},
        {"Rank" : "9","Name" : "Kirsten and Jorn Rausing","Wealth" : "12","Yearly Change" : "0","Industry" : "Inheritance and investment: Tetra Laval"},
        {"Rank" : "10","Name" : "Michael Platt","Wealth" : "11.5","Yearly Change" : "1.5","Industry" : "Hedge fund: BlueCrest Capital"},
        {"Rank" : "11","Name" : "The Duke of Westminster and the Grosvenor family","Wealth" : "9.878","Yearly Change" : "0.152","Industry" : "Property: Grosvenor Group"},
        {"Rank" : "12","Name" : "Marit, Lisbet, Sigrid and Hans Rausing","Wealth" : "9.348","Yearly Change" : "-0.142","Industry" : "Inheritance: Tetra Laval"},
        {"Rank" : "13","Name" : "Andy Currie","Wealth" : "9.176","Yearly Change" : "7.058","Industry" : "Chemicals: Ineos"},
        {"Rank" : "14","Name" : "John Reece","Wealth" : "9.132","Yearly Change" : "7.025","Industry" : "Chemicals: Ineos"},
        {"Rank" : "15","Name" : "Alex Gerko","Wealth" : "9.129","Yearly Change" : "7.129","Industry" : "Finance: XTX Markets"},
        {"Rank" : "16","Name" : "Denise, John and Peter Coates and family","Wealth" : "8.795","Yearly Change" : "0.158","Industry" : "Gambling: Bet365"},
        {"Rank" : "17","Name" : "Anders Holch Povlsen","Wealth" : "8.5","Yearly Change" : "2","Industry" : "Fashion: Bestseller and Asos"},
        {"Rank" : "18","Name" : "Barnaby and Merlin Swire and family","Wealth" : "8.38","Yearly Change" : "-1.22","Industry" : "Industry, transport and property: Swire Group"},
        {"Rank" : "19","Name" : "John Fredriksen and family","Wealth" : "8.311","Yearly Change" : "0","Industry" : "Shipping and oil services"},
        {"Rank" : "20","Name" : "Mikhail Fridman","Wealth" : "8.222","Yearly Change" : "0","Industry" : "Industry: Alfa Group and Letter One"}       
    ]
}'
);

SELECT JSON from json_data

DELETE FROM json_data
WHERE Description = 'Comparison Data'
WHERE Description = 'Book data'
 UPDATE json_data SET JSON = '{"Interest Rates": {"UK": "5.25}}' WHERE Description = 'Interest Rates'
