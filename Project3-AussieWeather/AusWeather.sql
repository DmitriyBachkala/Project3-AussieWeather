COPY weatherAUS FROM '/path/to/yourfile.csv' WITH CSV HEADER DELIMITER ',';

-- Create table
CREATE TABLE weatherAUS (
    "Date" DATE NOT NULL,
    "Location" VARCHAR(20) NOT NULL,
    "MinTemp" VARCHAR(10) NOT NULL,
    "MaxTemp" VARCHAR(10) NOT NULL,
    "Rainfall" VARCHAR(10) NOT NULL,
    "Evaporation" VARCHAR(10) NOT NULL,
    "Sunshine" VARCHAR(10) NOT NULL,
    "WindGustDir" VARCHAR(10) NOT NULL,
    "WindGustSpeed" VARCHAR(10) NOT NULL,
    "WindDir9am" VARCHAR(10) NOT NULL,
    "WindDir3pm" VARCHAR(10) NOT NULL,
    "WindSpeed9am" VARCHAR(10) NOT NULL,
    "WindSpeed3pm" VARCHAR(10) NOT NULL,
    "Humidity9am" VARCHAR(10) NOT NULL,
    "Humidity3pm" VARCHAR(10) NOT NULL,
    "Pressure9am" VARCHAR(10) NOT NULL,
    "Pressure3pm" VARCHAR(10) NOT NULL,
    "Cloud9am" VARCHAR(10) NOT NULL,
    "Cloud3pm" VARCHAR(10) NOT NULL,
    "Temp9am" VARCHAR(10) NOT NULL,
    "Temp3pm" VARCHAR(10) NOT NULL,
    "RainToday" VARCHAR(5) NOT NULL,
    "RainTomorrow" VARCHAR(5) NOT NULL
);

-- view 1 
CREATE VIEW weatherAUS_view AS
SELECT
    "Date",
    "Location" AS "Location",
	 CASE "Location"
        WHEN 'Hobart' THEN 'Tasmania'
        WHEN 'Launceston' THEN 'Tasmania'
        WHEN 'Uluru' THEN 'Northern Territory'
        WHEN 'BadgerysCreek' THEN 'New South Wales'
        WHEN 'Albany' THEN 'Western Australia'
        WHEN 'Walpole' THEN 'Western Australia'
        WHEN 'Katherine' THEN 'Northern Territory'
        WHEN 'SalmonGums' THEN 'Western Australia'
        WHEN 'Melbourne' THEN 'Victoria'
        WHEN 'NorfolkIsland' THEN 'Norfolk Island'
        WHEN 'Perth' THEN 'Western Australia'
        WHEN 'Tuggeranong' THEN 'Australian Capital Territory'
        WHEN 'CoffsHarbour' THEN 'New South Wales'
        WHEN 'Watsonia' THEN 'Victoria'
        WHEN 'Nhil' THEN 'Victoria'
        WHEN 'Penrith' THEN 'New South Wales'
        WHEN 'Moree' THEN 'New South Wales'
        WHEN 'SydneyAirport' THEN 'New South Wales'
        WHEN 'Albury' THEN 'New South Wales'
        WHEN 'GoldCoast' THEN 'Queensland'
        WHEN 'Sale' THEN 'Victoria'
        WHEN 'Sydney' THEN 'New South Wales'
        WHEN 'Townsville' THEN 'Queensland'
        WHEN 'PerthAirport' THEN 'Western Australia'
        WHEN 'Cobar' THEN 'New South Wales'
        WHEN 'Brisbane' THEN 'Queensland'
        WHEN 'MelbourneAirport' THEN 'Victoria'
        WHEN 'Woomera' THEN 'South Australia'
        WHEN 'Mildura' THEN 'Victoria'
        WHEN 'Witchcliffe' THEN 'Western Australia'
        WHEN 'NorahHead' THEN 'New South Wales'
        WHEN 'PearceRAAF' THEN 'Western Australia'
        WHEN 'AliceSprings' THEN 'Northern Territory'
        WHEN 'Cairns' THEN 'Queensland'
        WHEN 'Newcastle' THEN 'New South Wales'
        WHEN 'Ballarat' THEN 'Victoria'
        WHEN 'WaggaWagga' THEN 'New South Wales'
        WHEN 'Portland' THEN 'Victoria'
        WHEN 'Canberra' THEN 'Australian Capital Territory'
        WHEN 'Adelaide' THEN 'South Australia'
        WHEN 'Richmond' THEN 'New South Wales'
        WHEN 'Williamtown' THEN 'New South Wales'
        WHEN 'Bendigo' THEN 'Victoria'
        WHEN 'Darwin' THEN 'Northern Territory'
        WHEN 'MountGambier' THEN 'South Australia'
        WHEN 'Dartmoor' THEN 'Victoria'
        WHEN 'MountGinini' THEN 'New South Wales'
        WHEN 'Wollongong' THEN 'New South Wales'
        WHEN 'Nuriootpa' THEN 'South Australia'
        ELSE 'Unknown'
    END AS "State",
	  CASE 
        WHEN "Location" = 'Hobart' THEN '-42.8826'
        WHEN "Location" = 'Launceston' THEN '-41.4298'
        WHEN "Location" = 'Uluru' THEN '-25.3444'
        WHEN "Location" = 'BadgerysCreek' THEN '-33.8891'
        WHEN "Location" = 'Albany' THEN '-35.0031'
        WHEN "Location" = 'Walpole' THEN '-34.9844'
        WHEN "Location" = 'Katherine' THEN '-14.4644'
        WHEN "Location" = 'SalmonGums' THEN '-32.9814'
        WHEN "Location" = 'Melbourne' THEN '-37.8136'
        WHEN "Location" = 'NorfolkIsland' THEN '-29.0408'
        WHEN "Location" = 'Perth' THEN '-31.9505'
        WHEN "Location" = 'Tuggeranong' THEN '-35.4244'
        WHEN "Location" = 'CoffsHarbour' THEN '-30.2963'
        WHEN "Location" = 'Watsonia' THEN '-37.7117'
        WHEN "Location" = 'Nhil' THEN '-36.3329'
        WHEN "Location" = 'Penrith' THEN '-33.7580'
        WHEN "Location" = 'Moree' THEN '-29.4598'
        WHEN "Location" = 'SydneyAirport' THEN '-33.9399'
        WHEN "Location" = 'Albury' THEN '-36.0737'
        WHEN "Location" = 'GoldCoast' THEN '-28.0167'
        WHEN "Location" = 'Sale' THEN '-38.1094'
        WHEN "Location" = 'Sydney' THEN '-33.8688'
        WHEN "Location" = 'Townsville' THEN '-19.2580'
        WHEN "Location" = 'PerthAirport' THEN '-31.9406'
        WHEN "Location" = 'Cobar' THEN '-31.4953'
        WHEN "Location" = 'Brisbane' THEN '-27.4698'
        WHEN "Location" = 'MelbourneAirport' THEN '-37.6690'
        WHEN "Location" = 'Woomera' THEN '-31.1996'
        WHEN "Location" = 'Mildura' THEN '-34.2083'
        WHEN "Location" = 'Witchcliffe' THEN '-34.0153'
        WHEN "Location" = 'NorahHead' THEN '-33.2833'
        WHEN "Location" = 'PearceRAAF' THEN '-31.6676'
        WHEN "Location" = 'AliceSprings' THEN '-23.6980'
        WHEN "Location" = 'Cairns' THEN '-16.9203'
        WHEN "Location" = 'Newcastle' THEN '-32.9283'
        WHEN "Location" = 'Ballarat' THEN '-37.5622'
        WHEN "Location" = 'WaggaWagga' THEN '-35.1150'
        WHEN "Location" = 'Portland' THEN '-38.3510'
        WHEN "Location" = 'Canberra' THEN '-35.2809'
        WHEN "Location" = 'Adelaide' THEN '-34.9285'
        WHEN "Location" = 'Richmond' THEN '-33.5989'
        WHEN "Location" = 'Williamtown' THEN '-32.8150'
        WHEN "Location" = 'Bendigo' THEN '-36.7570'
        WHEN "Location" = 'Darwin' THEN '-12.4634'
        WHEN "Location" = 'MountGambier' THEN '-37.8244'
        WHEN "Location" = 'Dartmoor' THEN '-37.9228'
        WHEN "Location" = 'MountGinini' THEN '-35.5297'
        WHEN "Location" = 'Wollongong' THEN '-34.4240'
        WHEN "Location" = 'Nuriootpa' THEN '-34.4667'
        ELSE NULL
    END AS "Latitude",
    CASE 
        WHEN "Location" = 'Hobart' THEN '147.3238'
        WHEN "Location" = 'Launceston' THEN '147.1571'
        WHEN "Location" = 'Uluru' THEN '131.0369'
        WHEN "Location" = 'BadgerysCreek' THEN '150.7970'
        WHEN "Location" = 'Albany' THEN '117.8814'
        WHEN "Location" = 'Walpole' THEN '116.7311'
        WHEN "Location" = 'Katherine' THEN '132.2627'
        WHEN "Location" = 'SalmonGums' THEN '121.6547'
        WHEN "Location" = 'Melbourne' THEN '144.9631'
        WHEN "Location" = 'NorfolkIsland' THEN '167.9547'
        WHEN "Location" = 'Perth' THEN '115.8605'
        WHEN "Location" = 'Tuggeranong' THEN '149.0860'
        WHEN "Location" = 'CoffsHarbour' THEN '153.1149'
        WHEN "Location" = 'Watsonia' THEN '145.0821'
        WHEN "Location" = 'Nhil' THEN '141.6503'
        WHEN "Location" = 'Penrith' THEN '150.6940'
        WHEN "Location" = 'Moree' THEN '149.8417'
        WHEN "Location" = 'SydneyAirport' THEN '151.1753'
        WHEN "Location" = 'Albury' THEN '146.9135'
        WHEN "Location" = 'GoldCoast' THEN '153.4000'
        WHEN "Location" = 'Sale' THEN '147.0657'
        WHEN "Location" = 'Sydney' THEN '151.2093'
        WHEN "Location" = 'Townsville' THEN '146.8169'
        WHEN "Location" = 'PerthAirport' THEN '115.9720'
        WHEN "Location" = 'Cobar' THEN '145.8383'
        WHEN "Location" = 'Brisbane' THEN '153.0251'
        WHEN "Location" = 'MelbourneAirport' THEN '144.8487'
        WHEN "Location" = 'Woomera' THEN '136.8058'
        WHEN "Location" = 'Mildura' THEN '142.1490'
        WHEN "Location" = 'Witchcliffe' THEN '115.1014'
        WHEN "Location" = 'NorahHead' THEN '151.5736'
        WHEN "Location" = 'PearceRAAF' THEN '116.0300'
        WHEN "Location" = 'AliceSprings' THEN '133.8807'
        WHEN "Location" = 'Cairns' THEN '145.7545'
        WHEN "Location" = 'Newcastle' THEN '151.7817'
        WHEN "Location" = 'Ballarat' THEN '143.8503'
        WHEN "Location" = 'WaggaWagga' THEN '147.3694'
        WHEN "Location" = 'Portland' THEN '141.6067'
        WHEN "Location" = 'Canberra' THEN '149.1300'
        WHEN "Location" = 'Adelaide' THEN '138.6007'
        WHEN "Location" = 'Richmond' THEN '150.7471'
        WHEN "Location" = 'Williamtown' THEN '151.8432'
        WHEN "Location" = 'Bendigo' THEN '144.2800'
        WHEN "Location" = 'Darwin' THEN '130.8456'
        WHEN "Location" = 'MountGambier' THEN '140.7828'
        WHEN "Location" = 'Dartmoor' THEN '141.2635'
        WHEN "Location" = 'MountGinini' THEN '148.7723'
        WHEN "Location" = 'Wollongong' THEN '150.8931'
        WHEN "Location" = 'Nuriootpa' THEN '138.9950'
        ELSE NULL
    END AS "Longitude",
	"MinTemp"  AS "MinTemp_C",
	"MaxTemp"  AS "MaxTemp_C",
    CASE WHEN "MinTemp" = 'NA' THEN 'NA' ELSE (CAST("MinTemp" AS NUMERIC) * 9/5 + 32)::VARCHAR END AS "MinTemp_F",
    CASE WHEN "MaxTemp" = 'NA' THEN 'NA' ELSE (CAST("MaxTemp" AS NUMERIC) * 9/5 + 32)::VARCHAR END AS "MaxTemp_F",
   
    COALESCE(NULLIF("Rainfall", 'NA'), '0') AS "Rainfall",
    COALESCE(NULLIF("Evaporation", 'NA'), '0') AS "Evaporation",
    COALESCE(NULLIF("Sunshine", 'NA'), '0') AS "Sunshine",
    "WindGustDir",
    COALESCE(NULLIF("WindGustSpeed", 'NA'), '0') AS "WindGustSpeed",
    COALESCE(NULLIF("WindDir9am", 'NA'), '0') AS "WindDir9am",
    COALESCE(NULLIF("WindDir3pm", 'NA'), '0') AS "WindDir3pm",
    COALESCE(NULLIF("WindSpeed9am", 'NA'), '0') AS "WindSpeed9am",
    COALESCE(NULLIF("WindSpeed3pm", 'NA'), '0') AS "WindSpeed3pm",
    COALESCE(NULLIF("Humidity9am", 'NA'), '0') AS "Humidity9am",
    COALESCE(NULLIF("Humidity3pm", 'NA'), '0') AS "Humidity3pm",
    COALESCE(NULLIF("Pressure9am", 'NA'), '0') AS "Pressure9am",
    COALESCE(NULLIF("Pressure3pm", 'NA'), '0') AS "Pressure3pm",
    COALESCE(NULLIF("Cloud9am", 'NA'), '0') AS "Cloud9am",
    COALESCE(NULLIF("Cloud3pm", 'NA'), '0') AS "Cloud3pm",
    COALESCE(NULLIF("Temp9am", 'NA'), '0') AS "Temp9am",
    COALESCE(NULLIF("Temp3pm", 'NA'), '0') AS "Temp3pm",
    "RainToday",
    "RainTomorrow"
FROM "weatherAUS";
-- view location
CREATE VIEW  weatheraus_location AS
SELECT 
    "Location" AS "Location",
	 CASE "Location"
        WHEN 'Hobart' THEN 'Tasmania'
        WHEN 'Launceston' THEN 'Tasmania'
        WHEN 'Uluru' THEN 'Northern Territory'
        WHEN 'BadgerysCreek' THEN 'New South Wales'
        WHEN 'Albany' THEN 'Western Australia'
        WHEN 'Walpole' THEN 'Western Australia'
        WHEN 'Katherine' THEN 'Northern Territory'
        WHEN 'SalmonGums' THEN 'Western Australia'
        WHEN 'Melbourne' THEN 'Victoria'
        WHEN 'NorfolkIsland' THEN 'Norfolk Island'
        WHEN 'Perth' THEN 'Western Australia'
        WHEN 'Tuggeranong' THEN 'Australian Capital Territory'
        WHEN 'CoffsHarbour' THEN 'New South Wales'
        WHEN 'Watsonia' THEN 'Victoria'
        WHEN 'Nhil' THEN 'Victoria'
        WHEN 'Penrith' THEN 'New South Wales'
        WHEN 'Moree' THEN 'New South Wales'
        WHEN 'SydneyAirport' THEN 'New South Wales'
        WHEN 'Albury' THEN 'New South Wales'
        WHEN 'GoldCoast' THEN 'Queensland'
        WHEN 'Sale' THEN 'Victoria'
        WHEN 'Sydney' THEN 'New South Wales'
        WHEN 'Townsville' THEN 'Queensland'
        WHEN 'PerthAirport' THEN 'Western Australia'
        WHEN 'Cobar' THEN 'New South Wales'
        WHEN 'Brisbane' THEN 'Queensland'
        WHEN 'MelbourneAirport' THEN 'Victoria'
        WHEN 'Woomera' THEN 'South Australia'
        WHEN 'Mildura' THEN 'Victoria'
        WHEN 'Witchcliffe' THEN 'Western Australia'
        WHEN 'NorahHead' THEN 'New South Wales'
        WHEN 'PearceRAAF' THEN 'Western Australia'
        WHEN 'AliceSprings' THEN 'Northern Territory'
        WHEN 'Cairns' THEN 'Queensland'
        WHEN 'Newcastle' THEN 'New South Wales'
        WHEN 'Ballarat' THEN 'Victoria'
        WHEN 'WaggaWagga' THEN 'New South Wales'
        WHEN 'Portland' THEN 'Victoria'
        WHEN 'Canberra' THEN 'Australian Capital Territory'
        WHEN 'Adelaide' THEN 'South Australia'
        WHEN 'Richmond' THEN 'New South Wales'
        WHEN 'Williamtown' THEN 'New South Wales'
        WHEN 'Bendigo' THEN 'Victoria'
        WHEN 'Darwin' THEN 'Northern Territory'
        WHEN 'MountGambier' THEN 'South Australia'
        WHEN 'Dartmoor' THEN 'Victoria'
        WHEN 'MountGinini' THEN 'New South Wales'
        WHEN 'Wollongong' THEN 'New South Wales'
        WHEN 'Nuriootpa' THEN 'South Australia'
        ELSE 'Unknown'
    END AS "State",
	  CASE 
        WHEN "Location" = 'Hobart' THEN '-42.8826'
        WHEN "Location" = 'Launceston' THEN '-41.4298'
        WHEN "Location" = 'Uluru' THEN '-25.3444'
        WHEN "Location" = 'BadgerysCreek' THEN '-33.8891'
        WHEN "Location" = 'Albany' THEN '-35.0031'
        WHEN "Location" = 'Walpole' THEN '-34.9844'
        WHEN "Location" = 'Katherine' THEN '-14.4644'
        WHEN "Location" = 'SalmonGums' THEN '-32.9814'
        WHEN "Location" = 'Melbourne' THEN '-37.8136'
        WHEN "Location" = 'NorfolkIsland' THEN '-29.0408'
        WHEN "Location" = 'Perth' THEN '-31.9505'
        WHEN "Location" = 'Tuggeranong' THEN '-35.4244'
        WHEN "Location" = 'CoffsHarbour' THEN '-30.2963'
        WHEN "Location" = 'Watsonia' THEN '-37.7117'
        WHEN "Location" = 'Nhil' THEN '-36.3329'
        WHEN "Location" = 'Penrith' THEN '-33.7580'
        WHEN "Location" = 'Moree' THEN '-29.4598'
        WHEN "Location" = 'SydneyAirport' THEN '-33.9399'
        WHEN "Location" = 'Albury' THEN '-36.0737'
        WHEN "Location" = 'GoldCoast' THEN '-28.0167'
        WHEN "Location" = 'Sale' THEN '-38.1094'
        WHEN "Location" = 'Sydney' THEN '-33.8688'
        WHEN "Location" = 'Townsville' THEN '-19.2580'
        WHEN "Location" = 'PerthAirport' THEN '-31.9406'
        WHEN "Location" = 'Cobar' THEN '-31.4953'
        WHEN "Location" = 'Brisbane' THEN '-27.4698'
        WHEN "Location" = 'MelbourneAirport' THEN '-37.6690'
        WHEN "Location" = 'Woomera' THEN '-31.1996'
        WHEN "Location" = 'Mildura' THEN '-34.2083'
        WHEN "Location" = 'Witchcliffe' THEN '-34.0153'
        WHEN "Location" = 'NorahHead' THEN '-33.2833'
        WHEN "Location" = 'PearceRAAF' THEN '-31.6676'
        WHEN "Location" = 'AliceSprings' THEN '-23.6980'
        WHEN "Location" = 'Cairns' THEN '-16.9203'
        WHEN "Location" = 'Newcastle' THEN '-32.9283'
        WHEN "Location" = 'Ballarat' THEN '-37.5622'
        WHEN "Location" = 'WaggaWagga' THEN '-35.1150'
        WHEN "Location" = 'Portland' THEN '-38.3510'
        WHEN "Location" = 'Canberra' THEN '-35.2809'
        WHEN "Location" = 'Adelaide' THEN '-34.9285'
        WHEN "Location" = 'Richmond' THEN '-33.5989'
        WHEN "Location" = 'Williamtown' THEN '-32.8150'
        WHEN "Location" = 'Bendigo' THEN '-36.7570'
        WHEN "Location" = 'Darwin' THEN '-12.4634'
        WHEN "Location" = 'MountGambier' THEN '-37.8244'
        WHEN "Location" = 'Dartmoor' THEN '-37.9228'
        WHEN "Location" = 'MountGinini' THEN '-35.5297'
        WHEN "Location" = 'Wollongong' THEN '-34.4240'
        WHEN "Location" = 'Nuriootpa' THEN '-34.4667'
        ELSE NULL
    END AS "Latitude",
    CASE 
        WHEN "Location" = 'Hobart' THEN '147.3238'
        WHEN "Location" = 'Launceston' THEN '147.1571'
        WHEN "Location" = 'Uluru' THEN '131.0369'
        WHEN "Location" = 'BadgerysCreek' THEN '150.7970'
        WHEN "Location" = 'Albany' THEN '117.8814'
        WHEN "Location" = 'Walpole' THEN '116.7311'
        WHEN "Location" = 'Katherine' THEN '132.2627'
        WHEN "Location" = 'SalmonGums' THEN '121.6547'
        WHEN "Location" = 'Melbourne' THEN '144.9631'
        WHEN "Location" = 'NorfolkIsland' THEN '167.9547'
        WHEN "Location" = 'Perth' THEN '115.8605'
        WHEN "Location" = 'Tuggeranong' THEN '149.0860'
        WHEN "Location" = 'CoffsHarbour' THEN '153.1149'
        WHEN "Location" = 'Watsonia' THEN '145.0821'
        WHEN "Location" = 'Nhil' THEN '141.6503'
        WHEN "Location" = 'Penrith' THEN '150.6940'
        WHEN "Location" = 'Moree' THEN '149.8417'
        WHEN "Location" = 'SydneyAirport' THEN '151.1753'
        WHEN "Location" = 'Albury' THEN '146.9135'
        WHEN "Location" = 'GoldCoast' THEN '153.4000'
        WHEN "Location" = 'Sale' THEN '147.0657'
        WHEN "Location" = 'Sydney' THEN '151.2093'
        WHEN "Location" = 'Townsville' THEN '146.8169'
        WHEN "Location" = 'PerthAirport' THEN '115.9720'
        WHEN "Location" = 'Cobar' THEN '145.8383'
        WHEN "Location" = 'Brisbane' THEN '153.0251'
        WHEN "Location" = 'MelbourneAirport' THEN '144.8487'
        WHEN "Location" = 'Woomera' THEN '136.8058'
        WHEN "Location" = 'Mildura' THEN '142.1490'
        WHEN "Location" = 'Witchcliffe' THEN '115.1014'
        WHEN "Location" = 'NorahHead' THEN '151.5736'
        WHEN "Location" = 'PearceRAAF' THEN '116.0300'
        WHEN "Location" = 'AliceSprings' THEN '133.8807'
        WHEN "Location" = 'Cairns' THEN '145.7545'
        WHEN "Location" = 'Newcastle' THEN '151.7817'
        WHEN "Location" = 'Ballarat' THEN '143.8503'
        WHEN "Location" = 'WaggaWagga' THEN '147.3694'
        WHEN "Location" = 'Portland' THEN '141.6067'
        WHEN "Location" = 'Canberra' THEN '149.1300'
        WHEN "Location" = 'Adelaide' THEN '138.6007'
        WHEN "Location" = 'Richmond' THEN '150.7471'
        WHEN "Location" = 'Williamtown' THEN '151.8432'
        WHEN "Location" = 'Bendigo' THEN '144.2800'
        WHEN "Location" = 'Darwin' THEN '130.8456'
        WHEN "Location" = 'MountGambier' THEN '140.7828'
        WHEN "Location" = 'Dartmoor' THEN '141.2635'
        WHEN "Location" = 'MountGinini' THEN '148.7723'
        WHEN "Location" = 'Wollongong' THEN '150.8931'
        WHEN "Location" = 'Nuriootpa' THEN '138.9950'
        ELSE NULL
    END AS "Longitude"
FROM "weatherAUS";
-- summary by location 
CREATE VIEW weatherAUS_summary_view AS
SELECT
    "Location",
    EXTRACT(MONTH FROM "Date") AS "Month",
    AVG(CASE WHEN "MinTemp" <> 'NA' THEN CAST("MinTemp" AS NUMERIC) ELSE NULL END) AS "Avg_MinTemp",
    AVG(CASE WHEN "MaxTemp" <> 'NA' THEN CAST("MaxTemp" AS NUMERIC) ELSE NULL END) AS "Avg_MaxTemp",
    AVG(CASE WHEN "Rainfall" <> 'NA' THEN CAST("Rainfall" AS NUMERIC) ELSE NULL END) AS "Avg_Rainfall",
    AVG(CASE WHEN "Evaporation" <> 'NA' THEN CAST("Evaporation" AS NUMERIC) ELSE NULL END) AS "Avg_Evaporation",
    AVG(CASE WHEN "Sunshine" <> 'NA' THEN CAST("Sunshine" AS NUMERIC) ELSE NULL END) AS "Avg_Sunshine",
    AVG(CASE WHEN "WindGustSpeed" <> 'NA' THEN CAST("WindGustSpeed" AS NUMERIC) ELSE NULL END) AS "Avg_WindGustSpeed",
    AVG(CASE WHEN "WindSpeed9am" <> 'NA' THEN CAST("WindSpeed9am" AS NUMERIC) ELSE NULL END) AS "Avg_WindSpeed9am",
    AVG(CASE WHEN "WindSpeed3pm" <> 'NA' THEN CAST("WindSpeed3pm" AS NUMERIC) ELSE NULL END) AS "Avg_WindSpeed3pm",
    AVG(CASE WHEN "Humidity9am" <> 'NA' THEN CAST("Humidity9am" AS NUMERIC) ELSE NULL END) AS "Avg_Humidity9am",
    AVG(CASE WHEN "Humidity3pm" <> 'NA' THEN CAST("Humidity3pm" AS NUMERIC) ELSE NULL END) AS "Avg_Humidity3pm",
    AVG(CASE WHEN "Pressure9am" <> 'NA' THEN CAST("Pressure9am" AS NUMERIC) ELSE NULL END) AS "Avg_Pressure9am",
    AVG(CASE WHEN "Pressure3pm" <> 'NA' THEN CAST("Pressure3pm" AS NUMERIC) ELSE NULL END) AS "Avg_Pressure3pm",
    AVG(CASE WHEN "Cloud9am" <> 'NA' THEN CAST("Cloud9am" AS NUMERIC) ELSE NULL END) AS "Avg_Cloud9am",
    AVG(CASE WHEN "Cloud3pm" <> 'NA' THEN CAST("Cloud3pm" AS NUMERIC) ELSE NULL END) AS "Avg_Cloud3pm",
    AVG(CASE WHEN "Temp9am" <> 'NA' THEN CAST("Temp9am" AS NUMERIC) ELSE NULL END) AS "Avg_Temp9am",
    AVG(CASE WHEN "Temp3pm" <> 'NA' THEN CAST("Temp3pm" AS NUMERIC) ELSE NULL END) AS "Avg_Temp3pm"
FROM
    "weatherAUS"
GROUP BY
    "Location", EXTRACT(MONTH FROM "Date");
--Summary by state 
CREATE VIEW weatherAUS_state_summary_view AS
SELECT
    "State",
    EXTRACT(MONTH FROM "Date") AS "Month",
    AVG(CASE WHEN "MinTemp_C" <> 'NA' THEN CAST("MinTemp_C" AS NUMERIC) ELSE NULL END) AS "Avg_MinTemp",
    AVG(CASE WHEN "MaxTemp_C" <> 'NA' THEN CAST("MaxTemp_C" AS NUMERIC) ELSE NULL END) AS "Avg_MaxTemp",
    AVG(CASE WHEN "Rainfall" <> 'NA' THEN CAST("Rainfall" AS NUMERIC) ELSE NULL END) AS "Avg_Rainfall",
    AVG(CASE WHEN "Evaporation" <> 'NA' THEN CAST("Evaporation" AS NUMERIC) ELSE NULL END) AS "Avg_Evaporation",
    AVG(CASE WHEN "Sunshine" <> 'NA' THEN CAST("Sunshine" AS NUMERIC) ELSE NULL END) AS "Avg_Sunshine",
    AVG(CASE WHEN "WindGustSpeed" <> 'NA' THEN CAST("WindGustSpeed" AS NUMERIC) ELSE NULL END) AS "Avg_WindGustSpeed",
    AVG(CASE WHEN "WindSpeed9am" <> 'NA' THEN CAST("WindSpeed9am" AS NUMERIC) ELSE NULL END) AS "Avg_WindSpeed9am",
    AVG(CASE WHEN "WindSpeed3pm" <> 'NA' THEN CAST("WindSpeed3pm" AS NUMERIC) ELSE NULL END) AS "Avg_WindSpeed3pm",
    AVG(CASE WHEN "Humidity9am" <> 'NA' THEN CAST("Humidity9am" AS NUMERIC) ELSE NULL END) AS "Avg_Humidity9am",
    AVG(CASE WHEN "Humidity3pm" <> 'NA' THEN CAST("Humidity3pm" AS NUMERIC) ELSE NULL END) AS "Avg_Humidity3pm",
    AVG(CASE WHEN "Pressure9am" <> 'NA' THEN CAST("Pressure9am" AS NUMERIC) ELSE NULL END) AS "Avg_Pressure9am",
    AVG(CASE WHEN "Pressure3pm" <> 'NA' THEN CAST("Pressure3pm" AS NUMERIC) ELSE NULL END) AS "Avg_Pressure3pm",
    AVG(CASE WHEN "Cloud9am" <> 'NA' THEN CAST("Cloud9am" AS NUMERIC) ELSE NULL END) AS "Avg_Cloud9am",
    AVG(CASE WHEN "Cloud3pm" <> 'NA' THEN CAST("Cloud3pm" AS NUMERIC) ELSE NULL END) AS "Avg_Cloud3pm",
    AVG(CASE WHEN "Temp9am" <> 'NA' THEN CAST("Temp9am" AS NUMERIC) ELSE NULL END) AS "Avg_Temp9am",
    AVG(CASE WHEN "Temp3pm" <> 'NA' THEN CAST("Temp3pm" AS NUMERIC) ELSE NULL END) AS "Avg_Temp3pm"
FROM
    "weatheraus_view"
GROUP BY
    "State", EXTRACT(MONTH FROM "Date");
	