CREATE TABLE
    Airport (
        id VARCHAR(10),
        name VARCHAR(100),
        code VARCHAR(10) PRIMARY KEY,
        city VARCHAR(50),
        country VARCHAR(50),
        terminals INT
    );

CREATE TABLE
    Controller (
        id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(50),
        position VARCHAR(50),
        airportcode VARCHAR(10),
        contactnumber VARCHAR(15),
        email VARCHAR(50),
        FOREIGN KEY (airportcode) REFERENCES Airport (code)
    );

CREATE TABLE
    Flight (
        id VARCHAR(10) PRIMARY KEY,
        flightnumber VARCHAR(10),
        airline VARCHAR(50),
        departureairport VARCHAR(10),
        arrivalairport VARCHAR(10),
        departuretime VARCHAR(25),
        arrivaltime VARCHAR(25),
        status VARCHAR(20),
        aircraft VARCHAR(50),
        gate VARCHAR(10),
        terminal VARCHAR(10),
        assignedcontroller VARCHAR(10),
        FOREIGN KEY (departureairport) REFERENCES Airport (code),
        FOREIGN KEY (arrivalairport) REFERENCES Airport (code),
        FOREIGN KEY (assignedcontroller) REFERENCES Controller (id)
    );

CREATE TABLE
    Passenger (
        id VARCHAR(10),
        name VARCHAR(50),
        email VARCHAR(50),
        nationality VARCHAR(30),
        passportnumber VARCHAR(15) PRIMARY KEY,
        contactnumber VARCHAR(15)
    );

CREATE TABLE
    Tickets (
        id SERIAL PRIMARY KEY,
        flightid VARCHAR(10),
        passengerpassportnumber VARCHAR(15),
        bookingdate VARCHAR(25),
        price INT,
        seat VARCHAR(10),
        class VARCHAR(10),
        status VARCHAR(20),
        FOREIGN KEY (flightid) REFERENCES Flight (id),
        FOREIGN KEY (passengerpassportnumber) REFERENCES Passenger (passportnumber)
    );

INSERT INTO
    Airport (id, name, code, city, country, terminals)
VALUES
    (
        'AP001',
        'Indira Gandhi International Airport',
        'DEL',
        'Delhi',
        'India',
        1
    ),
    (
        'AP002',
        'Chhatrapati Shivaji Maharaj International Airport',
        'BOM',
        'Mumbai',
        'India',
        3
    ),
    (
        'AP003',
        'Chennai International Airport',
        'MAA',
        'Chennai',
        'India',
        3
    ),
    (
        'AP004',
        'Kempegowda International Airport',
        'BLR',
        'Bangalore',
        'India',
        2
    ),
    (
        'AP005',
        'Rajiv Gandhi International Airport',
        'HYD',
        'Hyderabad',
        'India',
        2
    ),
    (
        'AP006',
        'Netaji Subhas Chandra Bose International Airport',
        'CCU',
        'Kolkata',
        'India',
        1
    ),
    (
        'AP007',
        'Goa International Airport',
        'GOI',
        'Goa',
        'India',
        2
    ),
    (
        'AP008',
        'Sardar Vallabhbhai Patel International Airport',
        'AMD',
        'Ahmedabad',
        'India',
        1
    ),
    (
        'AP009',
        'Pune Airport',
        'PNQ',
        'Pune',
        'India',
        3
    ),
    (
        'AP010',
        'Cochin International Airport',
        'COK',
        'Kochi',
        'India',
        2
    );

INSERT INTO
    Controller (
        id,
        name,
        position,
        airportcode,
        contactnumber,
        email
    )
VALUES
    (
        'C001',
        'Gautami Sura',
        'ATC Officer',
        'HYD',
        '07080095814',
        'lprasad@example.net'
    ),
    (
        'C002',
        'Baghyawati Karan',
        'ATC Officer',
        'COK',
        '08066495201',
        'haritacomar@example.net'
    ),
    (
        'C003',
        'Vedhika Jayaraman',
        'Senior Controller',
        'DEL',
        '02306389378',
        'vpadmanabhan@example.net'
    ),
    (
        'C004',
        'Vedika Randhawa',
        'Senior Controller',
        'AMD',
        '6811652590',
        'wakeetaluthra@example.net'
    ),
    (
        'C005',
        'Ubika Mukhopadhyay',
        'Junior Controller',
        'BLR',
        '+916778812090',
        'warda39@example.com'
    ),
    (
        'C006',
        'Guneet Nori',
        'Senior Controller',
        'BOM',
        '+912455757503',
        'janujamemon@example.net'
    ),
    (
        'C007',
        'Neelima Kant',
        'ATC Officer',
        'GOI',
        '07203565738',
        'deochavvi@example.org'
    ),
    (
        'C008',
        'Nathaniel Brahmbhatt',
        'Junior Controller',
        'DEL',
        '07002438965',
        'chanchallalal@example.org'
    ),
    (
        'C009',
        'Aarnav Pillay',
        'Junior Controller',
        'AMD',
        '+919540533501',
        'oliver86@example.com'
    ),
    (
        'C010',
        'Ucchal Cherian',
        'ATC Officer',
        'COK',
        '7068140828',
        'suhanibhatia@example.org'
    ),
    (
        'C011',
        'Qasim Suri',
        'Senior Controller',
        'BLR',
        '+918655322415',
        'reyanshlanka@example.net'
    ),
    (
        'C012',
        'Teerth Brar',
        'ATC Officer',
        'PNQ',
        '+919548680873',
        'xkara@example.com'
    ),
    (
        'C013',
        'Xavier Yogi',
        'ATC Officer',
        'MAA',
        '08034381202',
        'singhaarnav@example.net'
    ),
    (
        'C014',
        'Vaishnavi Lal',
        'Senior Controller',
        'PNQ',
        '+911055390706',
        'vohramugdha@example.com'
    ),
    (
        'C015',
        'William Bera',
        'Junior Controller',
        'DEL',
        '+912458116043',
        'bahadurjit91@example.com'
    ),
    (
        'C016',
        'Warhi Kashyap',
        'Senior Controller',
        'BLR',
        '+916043678853',
        'bnigam@example.com'
    ),
    (
        'C017',
        'Deepa Gade',
        'Junior Controller',
        'CCU',
        '04863675570',
        'sundaramunni@example.org'
    ),
    (
        'C018',
        'Eshana Shan',
        'Senior Controller',
        'MAA',
        '+919897266323',
        'saksham30@example.com'
    ),
    (
        'C019',
        'Pratyush Guha',
        'Senior Controller',
        'HYD',
        '+912035485651',
        'manya91@example.net'
    ),
    (
        'C020',
        'Rajata Dayal',
        'Senior Controller',
        'GOI',
        '+918785446906',
        'kavyavarughese@example.com'
    );

INSERT INTO
    Passenger (
        id,
        name,
        email,
        nationality,
        passportnumber,
        contactnumber
    )
VALUES
    (
        'P001',
        'Om Yadav',
        'ysaha@example.com',
        'Indian',
        'IN5841004',
        '+918251422726'
    ),
    (
        'P002',
        'Patrick Upadhyay',
        'raaginijain@example.org',
        'Indian',
        'IN4026985',
        '+919755023178'
    ),
    (
        'P003',
        'Amaira Bala',
        'vihaan02@example.org',
        'Indian',
        'IN5327624',
        '+918661020253'
    ),
    (
        'P004',
        'Faqid Dave',
        'morarjhalak@example.net',
        'Indian',
        'IN8599016',
        '+917149925235'
    ),
    (
        'P005',
        'Orinder Kashyap',
        'pvarughese@example.net',
        'Indian',
        'IN9682796',
        '+917442161323'
    ),
    (
        'P006',
        'Qarin Soni',
        'gchoudhary@example.com',
        'Indian',
        'IN9494669',
        '+918115041842'
    ),
    (
        'P007',
        'Max Kanda',
        'nmurthy@example.com',
        'Indian',
        'IN7186059',
        '+918837658082'
    ),
    (
        'P008',
        'Wyatt Swamy',
        'vasajanya@example.org',
        'Indian',
        'IN9253772',
        '+919763389524'
    ),
    (
        'P009',
        'Ojasvi Nath',
        'lvenkatesh@example.com',
        'Indian',
        'IN9292879',
        '+919694283833'
    ),
    (
        'P010',
        'Januja Chad',
        'imarandoshi@example.net',
        'Indian',
        'IN7028949',
        '+919127031219'
    ),
    (
        'P011',
        'Samesh Hayre',
        'eshana73@example.org',
        'Indian',
        'IN6032173',
        '+917352931515'
    ),
    (
        'P012',
        'Ekiya Shukla',
        'rohan55@example.org',
        'Indian',
        'IN7523344',
        '+919595182669'
    ),
    (
        'P013',
        'Ekanta Raj',
        'aahanayogi@example.com',
        'Indian',
        'IN7816294',
        '+917105166801'
    ),
    (
        'P014',
        'Lila Lanka',
        'ganeshharsh@example.org',
        'Indian',
        'IN1695933',
        '+919344100212'
    ),
    (
        'P015',
        'Ekaraj Dhillon',
        'nandaekta@example.com',
        'Indian',
        'IN1028505',
        '+918979613654'
    ),
    (
        'P016',
        'Qarin Sethi',
        'pandeyvyanjana@example.org',
        'Indian',
        'IN8735833',
        '+918251387850'
    ),
    (
        'P017',
        'Dhriti Kari',
        'faqidmanne@example.com',
        'Indian',
        'IN2858439',
        '+919853011121'
    ),
    (
        'P018',
        'Rajata Grewal',
        'teerthpatla@example.net',
        'Indian',
        'IN3563171',
        '+917755083536'
    ),
    (
        'P019',
        'Anirudh Biswas',
        'oanand@example.net',
        'Indian',
        'IN7140490',
        '+918105012020'
    ),
    (
        'P020',
        'Ekbal Ratta',
        'anirudh02@example.com',
        'Indian',
        'IN4827367',
        '+917096503982'
    );

INSERT INTO
    Flight (
        id,
        flightnumber,
        airline,
        departureairport,
        arrivalairport,
        departuretime,
        arrivaltime,
        status,
        aircraft,
        gate,
        terminal,
        assignedcontroller
    )
VALUES
    (
        'FL001',
        '6E173',
        'Go First',
        'DEL',
        'COK',
        '2025-04-19 22:38:36',
        '2025-04-19 23:38:36',
        'Delayed',
        'Airbus A321',
        'C4',
        '2',
        'C020'
    ),
    (
        'FL002',
        'SG826',
        'Vistara',
        'BLR',
        'COK',
        '2025-04-19 11:12:57',
        '2025-04-19 12:12:57',
        'Delayed',
        'Boeing 737',
        'C2',
        '3',
        'C015'
    ),
    (
        'FL003',
        'AI951',
        'IndiGo',
        'DEL',
        'MAA',
        '2025-04-18 16:09:11',
        '2025-04-18 19:09:11',
        'On Time',
        'Boeing 737',
        'C2',
        '1',
        'C003'
    ),
    (
        'FL004',
        'UK402',
        'SpiceJet',
        'CCU',
        'GOI',
        '2025-04-19 02:25:40',
        '2025-04-19 05:25:40',
        'On Time',
        'Airbus A321',
        'C2',
        '1',
        'C015'
    ),
    (
        'FL005',
        'AI857',
        'Go First',
        'MAA',
        'HYD',
        '2025-04-20 18:22:55',
        '2025-04-20 21:22:55',
        'Cancelled',
        'Boeing 737',
        'B2',
        '2',
        'C012'
    ),
    (
        'FL006',
        'SG498',
        'SpiceJet',
        'DEL',
        'GOI',
        '2025-04-19 08:33:37',
        '2025-04-19 11:33:37',
        'On Time',
        'Boeing 737',
        'C3',
        '1',
        'C004'
    ),
    (
        'FL007',
        'AI655',
        'Air India',
        'HYD',
        'BOM',
        '2025-04-19 23:12:02',
        '2025-04-20 00:12:02',
        'Cancelled',
        'Airbus A321',
        'B4',
        '1',
        'C007'
    ),
    (
        'FL008',
        'AI490',
        'Go First',
        'MAA',
        'DEL',
        '2025-04-21 05:02:47',
        '2025-04-21 08:02:47',
        'Cancelled',
        'Airbus A320',
        'A5',
        '1',
        'C011'
    ),
    (
        'FL009',
        'SG190',
        'SpiceJet',
        'CCU',
        'HYD',
        '2025-04-18 09:33:18',
        '2025-04-18 12:33:18',
        'Delayed',
        'Boeing 737',
        'B1',
        '3',
        'C012'
    ),
    (
        'FL010',
        'SG166',
        'Vistara',
        'DEL',
        'COK',
        '2025-04-21 00:00:13',
        '2025-04-21 03:00:13',
        'Delayed',
        'Airbus A320',
        'A1',
        '2',
        'C010'
    ),
    (
        'FL011',
        '6E119',
        'Vistara',
        'GOI',
        'HYD',
        '2025-04-19 11:41:16',
        '2025-04-19 13:41:16',
        'Delayed',
        'Airbus A321',
        'C5',
        '1',
        'C016'
    ),
    (
        'FL012',
        'UK317',
        'Go First',
        'CCU',
        'BLR',
        '2025-04-17 20:56:48',
        '2025-04-17 23:56:48',
        'Delayed',
        'Airbus A321',
        'B1',
        '2',
        'C019'
    ),
    (
        'FL013',
        'UK972',
        'Go First',
        'DEL',
        'COK',
        '2025-04-21 17:57:49',
        '2025-04-21 20:57:49',
        'Delayed',
        'Airbus A321',
        'B5',
        '2',
        'C006'
    ),
    (
        'FL014',
        'SG109',
        'SpiceJet',
        'CCU',
        'COK',
        '2025-04-18 22:08:43',
        '2025-04-19 00:08:43',
        'Cancelled',
        'Airbus A321',
        'C1',
        '1',
        'C004'
    ),
    (
        'FL015',
        'AI959',
        'Vistara',
        'HYD',
        'GOI',
        '2025-04-21 14:29:32',
        '2025-04-21 17:29:32',
        'On Time',
        'Boeing 737',
        'C4',
        '3',
        'C009'
    ),
    (
        'FL016',
        '6E310',
        'Air India',
        'HYD',
        'COK',
        '2025-04-21 08:50:21',
        '2025-04-21 11:50:21',
        'Delayed',
        'Boeing 737',
        'B5',
        '3',
        'C006'
    ),
    (
        'FL017',
        'AI342',
        'IndiGo',
        'BLR',
        'PNQ',
        '2025-04-20 17:27:08',
        '2025-04-20 18:27:08',
        'On Time',
        'Airbus A320',
        'A1',
        '2',
        'C002'
    ),
    (
        'FL018',
        'SG186',
        'SpiceJet',
        'AMD',
        'PNQ',
        '2025-04-21 07:52:00',
        '2025-04-21 09:52:00',
        'Cancelled',
        'Boeing 737',
        'C3',
        '3',
        'C001'
    ),
    (
        'FL019',
        '6E209',
        'Vistara',
        'BOM',
        'DEL',
        '2025-04-21 02:02:23',
        '2025-04-21 04:02:23',
        'On Time',
        'Airbus A321',
        'A5',
        '2',
        'C009'
    ),
    (
        'FL020',
        'UK709',
        'Go First',
        'AMD',
        'HYD',
        '2025-04-18 10:56:22',
        '2025-04-18 11:56:22',
        'Delayed',
        'Airbus A321',
        'C4',
        '1',
        'C006'
    );

INSERT INTO
    Tickets (
        flightid,
        passengerpassportnumber,
        bookingdate,
        price,
        seat,
        class,
        status
    )
VALUES
    (
        'FL011',
        'IN4026985',
        '2025-04-12 05:02:50',
        4052,
        '28B',
        'First',
        'Pending'
    ),
    (
        'FL018',
        'IN9292879',
        '2025-04-07 23:22:18',
        12777,
        '10B',
        'Business',
        'Cancelled'
    ),
    (
        'FL011',
        'IN1028505',
        '2025-04-08 01:58:53',
        8847,
        '8C',
        'Business',
        'Pending'
    ),
    (
        'FL002',
        'IN9682796',
        '2025-04-12 06:24:19',
        7033,
        '1A',
        'First',
        'Confirmed'
    ),
    (
        'FL008',
        'IN7028949',
        '2025-04-12 08:18:54',
        12832,
        '18C',
        'Economy',
        'Cancelled'
    ),
    (
        'FL012',
        'IN7186059',
        '2025-04-11 07:34:55',
        6300,
        '18C',
        'Economy',
        'Confirmed'
    ),
    (
        'FL019',
        'IN8735833',
        '2025-04-16 09:59:38',
        4781,
        '5D',
        'Business',
        'Confirmed'
    ),
    (
        'FL014',
        'IN8735833',
        '2025-04-13 12:24:23',
        12062,
        '6B',
        'Business',
        'Confirmed'
    ),
    (
        'FL008',
        'IN7186059',
        '2025-04-16 03:33:07',
        8061,
        '19B',
        'First',
        'Cancelled'
    ),
    (
        'FL005',
        'IN8599016',
        '2025-04-08 16:06:59',
        13786,
        '13F',
        'First',
        'Cancelled'
    ),
    (
        'FL016',
        'IN8735833',
        '2025-04-10 08:50:47',
        6348,
        '2F',
        'First',
        'Confirmed'
    ),
    (
        'FL018',
        'IN4827367',
        '2025-04-07 18:43:28',
        4553,
        '14F',
        'Economy',
        'Confirmed'
    ),
    (
        'FL006',
        'IN6032173',
        '2025-04-08 20:51:20',
        12074,
        '3F',
        'Business',
        'Confirmed'
    ),
    (
        'FL017',
        'IN8735833',
        '2025-04-08 06:04:14',
        12838,
        '2B',
        'Economy',
        'Cancelled'
    ),
    (
        'FL011',
        'IN9253772',
        '2025-04-14 16:34:06',
        13307,
        '29D',
        'First',
        'Cancelled'
    ),
    (
        'FL015',
        'IN9292879',
        '2025-04-15 14:24:12',
        7798,
        '9B',
        'Business',
        'Cancelled'
    ),
    (
        'FL004',
        'IN7140490',
        '2025-04-09 02:24:07',
        7507,
        '23C',
        'Business',
        'Confirmed'
    ),
    (
        'FL001',
        'IN5841004',
        '2025-04-14 14:53:02',
        12574,
        '15C',
        'Economy',
        'Cancelled'
    ),
    (
        'FL004',
        'IN9494669',
        '2025-04-14 23:10:20',
        10880,
        '30D',
        'Economy',
        'Confirmed'
    ),
    (
        'FL008',
        'IN9682796',
        '2025-04-13 12:27:52',
        10058,
        '6C',
        'Business',
        'Pending'
    );
