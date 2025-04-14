CREATE TABLE
    airport (
        id SERIAL,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(10) PRIMARY KEY,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        terminals INT NOT NULL
    );

CREATE TABLE
    controller (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        position VARCHAR(100),
        contactNumber VARCHAR(20),
        email VARCHAR(100)
    );

CREATE TABLE
    passenger (
        id SERIAL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        nationality VARCHAR(50),
        passportNumber VARCHAR(20) PRIMARY KEY,
        contactNumber VARCHAR(20)
    );

CREATE TABLE
    flight (
        id SERIAL PRIMARY KEY,
        flightNumber VARCHAR(20) NOT NULL,
        airline VARCHAR(100) NOT NULL,
        departureTime TIMESTAMP NOT NULL,
        arrivalTime TIMESTAMP NOT NULL,
        status VARCHAR(50),
        aircraft VARCHAR(50),
        gate VARCHAR(10),
        terminal VARCHAR(10),
        departureAirport VARCHAR(10) REFERENCES airport (code) ON DELETE CASCADE,
        arrivalAirport VARCHAR(10) REFERENCES airport (code) ON DELETE CASCADE,
        assignedController INT REFERENCES controller (id) ON DELETE SET NULL
    );

CREATE TABLE
    ticket (
        id SERIAL PRIMARY KEY,
        flightId INT REFERENCES flight (id) ON DELETE CASCADE,
        passengerPassportNumber VARCHAR(20) REFERENCES passenger (passportNumber) ON DELETE CASCADE,
        seat VARCHAR(10),
        class VARCHAR(50),
        bookingDate TIMESTAMP NOT NULL,
        price DECIMAL(10, 2),
        status VARCHAR(50)
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'North Judithbury International',
        'AP000',
        'East Jill',
        'Philippines',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'New Roberttown International',
        'AP001',
        'East Jessetown',
        'Moldova',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Lake Debra International',
        'AP002',
        'Robinsonshire',
        'Fiji',
        3
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Port Lindachester International',
        'AP003',
        'Joshuaborough',
        'Serbia',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Curtisfurt International',
        'AP004',
        'West Melanieview',
        'Sri Lanka',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Lake Stephenville International',
        'AP005',
        'Millerport',
        'Switzerland',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Barbaraland International',
        'AP006',
        'Lake Jeremyport',
        'Belgium',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Port Craig International',
        'AP007',
        'Shawnstad',
        'Central African Republic',
        5
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Michaelview International',
        'AP008',
        'New Cynthiaside',
        'Saint Lucia',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'East Steven International',
        'AP009',
        'Veronicaside',
        'Cyprus',
        5
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Meganton International',
        'AP010',
        'Port Antonio',
        'Germany',
        4
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Adamsborough International',
        'AP011',
        'Jasonfort',
        'Indonesia',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Thomasberg International',
        'AP012',
        'Lake Anna',
        'Estonia',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Hurstfurt International',
        'AP013',
        'Jeffreyberg',
        'Madagascar',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Daviston International',
        'AP014',
        'East Courtneychester',
        'Nauru',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'South Patrickmouth International',
        'AP015',
        'Tashatown',
        'Pitcairn Islands',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Lake Nicoleview International',
        'AP016',
        'Danielchester',
        'Cayman Islands',
        5
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Smithview International',
        'AP017',
        'New Rita',
        'Trinidad and Tobago',
        5
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Meaganhaven International',
        'AP018',
        'East Nathaniel',
        'Central African Republic',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'New Mariotown International',
        'AP019',
        'West Natashaport',
        'Dominican Republic',
        5
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'East Natalieland International',
        'AP020',
        'Lake Toddland',
        'Senegal',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'East Donna International',
        'AP021',
        'West Allison',
        'Netherlands',
        5
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Brandtside International',
        'AP022',
        'Lake Larry',
        'Paraguay',
        4
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Samuelhaven International',
        'AP023',
        'Martinezbury',
        'Bahrain',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Andrewside International',
        'AP024',
        'New Jeffrey',
        'Barbados',
        4
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'East Carloston International',
        'AP025',
        'Chadbury',
        'Fiji',
        5
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Lewisberg International',
        'AP026',
        'Sanchezfort',
        'Sri Lanka',
        3
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Leeville International',
        'AP027',
        'Gomezchester',
        'Lao Peoples Democratic Republic',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Lake Deniseville International',
        'AP028',
        'South Jessicaville',
        'Egypt',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'East Amanda International',
        'AP029',
        'South Isaiah',
        'Kyrgyz Republic',
        4
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Port Sandra International',
        'AP030',
        'Mortonside',
        'Bolivia',
        3
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Lake Yvettetown International',
        'AP031',
        'Port Melindaburgh',
        'Ireland',
        3
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Olsonfurt International',
        'AP032',
        'East Nicholasfurt',
        'Estonia',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Mitchellside International',
        'AP033',
        'Mooreport',
        'Cuba',
        2
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'New Jillton International',
        'AP034',
        'Brianshire',
        'Lesotho',
        3
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'North Susan International',
        'AP035',
        'Port Jacobland',
        'Peru',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'South David International',
        'AP036',
        'New Brooke',
        'Nicaragua',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'South Dianeshire International',
        'AP037',
        'Sarahborough',
        'Paraguay',
        4
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Johnfurt International',
        'AP038',
        'Lake Debbie',
        'Kuwait',
        1
    );

INSERT INTO
    airport (name, code, city, country, terminals)
VALUES
    (
        'Sarahland International',
        'AP039',
        'South Christineshire',
        'Bolivia',
        3
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Daniel Baker',
        'Magazine journalist',
        '+45-7887950851',
        'mikemoore@warner.net'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Robert Evans',
        'Civil Service administrator',
        '+6-8429141456',
        'darrell18@nelson.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Christina Walters',
        'Geneticist, molecular',
        '+69-9256195745',
        'rebecca01@hotmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Donald Smith',
        'Conservator, furniture',
        '+11-7665963761',
        'joycearnold@yahoo.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Ashley Landry',
        'Database administrator',
        '+81-8995970241',
        'brandi26@williams.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Christine Wright',
        'Civil engineer, contracting',
        '+74-1298737106',
        'vdickson@gmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Cynthia Martin',
        'Editor, film/video',
        '+85-5728765136',
        'whitesandra@yahoo.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Sharon Cochran',
        'Geologist, engineering',
        '+36-8877444318',
        'reyesbenjamin@walker-velasquez.info'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Robert Savage',
        'Environmental health practitioner',
        '+21-6884882440',
        'raymondramirez@rasmussen.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Jennifer Zavala',
        'Software engineer',
        '+27-8173347748',
        'wilsontara@gmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Victoria Johnson',
        'Therapist, occupational',
        '+90-3783290795',
        'jessica56@hotmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Mrs. Stephanie Lee',
        'Armed forces operational officer',
        '+78-3727210979',
        'meyerlindsay@hotmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Natalie Lambert',
        'Medical physicist',
        '+69-4131575764',
        'rushsamantha@hotmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Ryan Cortez',
        'Hydrologist',
        '+21-7280359794',
        'snguyen@yahoo.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Cheryl Ortega',
        'Museum education officer',
        '+35-3392080953',
        'richard04@clark-floyd.org'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Julie Ramos',
        'Engineer, production',
        '+88-1240251661',
        'donnacampbell@hotmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Frances Cardenas',
        'Farm manager',
        '+5-8752612686',
        'lindsayhernandez@gmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'John Atkinson',
        'Buyer, industrial',
        '+52-2149938334',
        'kmercado@gmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Janet Ross',
        'Data scientist',
        '+28-8378385615',
        'osbornejeffery@holmes.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Robert Contreras',
        'Surveyor, land/geomatics',
        '+28-8110054933',
        'usalazar@hotmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Terry Griffin',
        'Designer, interior/spatial',
        '+51-8055995058',
        'pgreen@hotmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Richard Washington',
        'Field trials officer',
        '+19-2137651678',
        'sjones@gmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Francisco Fernandez',
        'Corporate investment banker',
        '+32-7609857128',
        'patrickhernandez@brown.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Jennifer Clark',
        'Petroleum engineer',
        '+96-7805745017',
        'gateskathy@yahoo.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Tommy Evans',
        'Newspaper journalist',
        '+75-7010379415',
        'tracynelson@yahoo.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'George Shelton',
        'Ophthalmologist',
        '+29-3119634399',
        'ncalhoun@johnson.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Jeffrey Camacho',
        'Education officer, environmental',
        '+97-1470939445',
        'nicholas37@rogers-hobbs.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Sandra King',
        'Ceramics designer',
        '+81-8217611860',
        'currybrett@yahoo.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Barry Bernard',
        'Architect',
        '+77-5567816720',
        'jamessmith@allen.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Claudia Lyons',
        'Merchandiser, retail',
        '+49-5047709743',
        'stricklandfrank@rodriguez-johnson.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Susan Brooks',
        'Engineer, civil (contracting)',
        '+88-4095476665',
        'curtisbarton@burke.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Jeffrey Wood',
        'Risk manager',
        '+88-8519962896',
        'atkinsonlynn@gmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Jack Snow',
        'Psychiatric nurse',
        '+99-8047877267',
        'hthompson@nelson.info'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Roger Vargas',
        'IT trainer',
        '+15-6555540744',
        'ramirezshannon@hudson-barnett.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Samuel White',
        'Engineer, petroleum',
        '+21-2948728483',
        'matthew94@hotmail.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Travis Miller',
        'Optometrist',
        '+93-4919706735',
        'hannahbrewer@yahoo.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Alan Phillips',
        'Ophthalmologist',
        '+81-3615507143',
        'elizabeth57@schmidt.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Jesse Parker',
        'Exercise physiologist',
        '+20-4944899549',
        'leslienewton@lopez.org'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Kelly Campbell',
        'Chiropodist',
        '+77-6687206971',
        'jeremy24@erickson.com'
    );

INSERT INTO
    controller (name, position, contactNumber, email)
VALUES
    (
        'Anthony Carter',
        'Computer games developer',
        '+3-8760038701',
        'salasaudrey@yahoo.com'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Jennifer Jones',
        'edwardhart@miller-wright.net',
        'Serbia',
        'Eh775204',
        '+31-1248786714'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Elizabeth Chapman',
        'ashley09@hotmail.com',
        'Bolivia',
        'yC699938',
        '+73-5067116918'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Aaron Hayes',
        'antonio44@hotmail.com',
        'Tokelau',
        'lJ334123',
        '+11-8438486479'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Maria Kerr',
        'brownlaura@curry.com',
        'Lao Peoples Democratic Republic',
        'Bh713493',
        '+9-1540137296'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Stacy Navarro',
        'davissuzanne@hotmail.com',
        'Myanmar',
        'Cf464887',
        '+85-3361388464'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Donald Shea',
        'ecosta@yahoo.com',
        'Ireland',
        'HP049027',
        '+34-7900268326'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Tony Cervantes',
        'qmiller@wilson-barton.net',
        'Sweden',
        'SF551256',
        '+28-3962958940'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Kathleen Ramos',
        'josephanderson@kim-wolfe.com',
        'Antarctica (the territory South of 60 deg S)',
        'Hx087603',
        '+92-6633778586'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Willie Durham',
        'hollanderic@hotmail.com',
        'French Guiana',
        'JA932480',
        '+86-8086172302'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Connor Greene',
        'hillkristy@morgan-french.com',
        'Swaziland',
        'DJ846773',
        '+57-2939118223'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Haley Arnold',
        'mcantu@hotmail.com',
        'Dominican Republic',
        'jC044997',
        '+32-1965067727'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Roberta Hughes',
        'ihanna@sanford.info',
        'Bolivia',
        'VE963605',
        '+44-9680276057'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Deborah Hanson',
        'christianmelissa@hotmail.com',
        'Hong Kong',
        'eE870262',
        '+71-1945826486'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Donna Perez',
        'wgood@padilla.com',
        'United Kingdom',
        'pO578091',
        '+10-1252860896'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Joseph Knight',
        'gregorylynch@harvey-allen.org',
        'Cambodia',
        'xB005045',
        '+9-4888749350'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Megan Moore',
        'vanessa46@hotmail.com',
        'El Salvador',
        'ZD374740',
        '+43-9894264595'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Laura Haney',
        'spencedominique@yahoo.com',
        'Algeria',
        'py743671',
        '+31-3084839399'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Mark Oliver',
        'bergerdebbie@kramer-johnson.com',
        'Saint Martin',
        'MZ909743',
        '+70-3030106617'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Sherri Diaz',
        'jonathansummers@yahoo.com',
        'Sri Lanka',
        'mi214562',
        '+61-8763140509'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Misty Whitney',
        'gibbsalexander@hotmail.com',
        'British Virgin Islands',
        'Wo451712',
        '+25-1405126228'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Alexander Henson',
        'deborahreid@yahoo.com',
        'United States of America',
        'gR754965',
        '+85-7146318035'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'David Medina',
        'vwatson@hotmail.com',
        'Yemen',
        'tF461200',
        '+55-7060638140'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Trevor Johnson',
        'scottsampson@yahoo.com',
        'Bolivia',
        'FN869261',
        '+94-9822598054'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Samantha Davis',
        'williamsmatthew@buchanan.com',
        'Switzerland',
        'mh585064',
        '+84-1422701550'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Linda Ramirez',
        'amberlindsey@guerrero.com',
        'American Samoa',
        'Xj839335',
        '+52-8422620843'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Jason Wilson',
        'xwest@wheeler.org',
        'Aruba',
        'qd539502',
        '+14-2067970820'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Katherine Browning',
        'morriseddie@hill.org',
        'Mayotte',
        'zB847007',
        '+25-7598297060'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Ricky Wilson',
        'ohayes@morgan-chavez.biz',
        'Saint Lucia',
        'GM569847',
        '+18-2811967841'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Andrea Decker',
        'vdavis@cain-hawkins.org',
        'Zimbabwe',
        'jR156545',
        '+36-2986972437'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Thomas Williams',
        'michael98@gmail.com',
        'Cape Verde',
        'QW885165',
        '+10-3363629219'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Darrell Patterson',
        'anthony44@bell-white.com',
        'Monaco',
        'hW731585',
        '+7-2015242176'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Glen Wood',
        'wareeric@hotmail.com',
        'Australia',
        'ny612018',
        '+53-7380780055'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Paul Wilson',
        'campbellerika@yahoo.com',
        'Mali',
        'CA147679',
        '+28-9008612465'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Daniel Taylor',
        'mark07@hotmail.com',
        'Jersey',
        'an403690',
        '+8-6002078344'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Andrea Hensley',
        'esmith@johnston-berry.biz',
        'French Guiana',
        'JQ226838',
        '+1-9526836552'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Anita Richard',
        'hchapman@foster.com',
        'Cyprus',
        'DS160529',
        '+34-8667072205'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Hannah Luna',
        'curtisscott@morrison.com',
        'Christmas Island',
        'Gm521818',
        '+37-8380507338'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Mrs. Tricia Stewart',
        'harrisoncrystal@yahoo.com',
        'Namibia',
        'PO779979',
        '+20-6110572428'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Ronald Jones',
        'jford@huang.com',
        'Gibraltar',
        'Cc058147',
        '+28-5160575046'
    );

INSERT INTO
    passenger (
        name,
        email,
        nationality,
        passportNumber,
        contactNumber
    )
VALUES
    (
        'Gwendolyn Klein',
        'wrightsamuel@warren-bishop.com',
        'Holy See (Vatican City State)',
        'gZ978207',
        '+75-9851745355'
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL665',
        'Harper, Mccormick and Holland',
        '2025-04-28 12:01:20',
        '2025-04-28 18:01:20',
        'Delayed',
        'Attorney 614',
        'B2',
        'T1',
        'AP003',
        'AP003',
        38
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL186',
        'King-York',
        '2025-04-30 18:32:42',
        '2025-05-01 03:32:42',
        'Cancelled',
        'What 169',
        'B2',
        'T2',
        'AP005',
        'AP011',
        5
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL251',
        'Alvarado, Rangel and Collins',
        '2025-05-14 00:37:29',
        '2025-05-14 02:37:29',
        'Cancelled',
        'Reality 140',
        'A1',
        'T2',
        'AP036',
        'AP015',
        38
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL291',
        'Hansen-Schneider',
        '2025-05-03 19:05:29',
        '2025-05-04 06:05:29',
        'Delayed',
        'Get 367',
        'B2',
        'T3',
        'AP037',
        'AP036',
        34
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL816',
        'Cox, Cox and White',
        '2025-04-20 23:19:04',
        '2025-04-21 11:19:04',
        'Delayed',
        'Difficult 234',
        'C3',
        'T2',
        'AP020',
        'AP015',
        17
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL733',
        'Moore LLC',
        '2025-05-01 08:34:28',
        '2025-05-01 14:34:28',
        'Cancelled',
        'Three 676',
        'A1',
        'T1',
        'AP004',
        'AP000',
        30
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL888',
        'Stanley PLC',
        '2025-04-19 16:15:54',
        '2025-04-20 01:15:54',
        'On Time',
        'Catch 457',
        'A1',
        'T1',
        'AP013',
        'AP032',
        17
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL622',
        'Guerra PLC',
        '2025-05-13 18:16:12',
        '2025-05-14 00:16:12',
        'Cancelled',
        'Table 820',
        'C3',
        'T3',
        'AP018',
        'AP010',
        29
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL706',
        'Rhodes-Young',
        '2025-04-22 19:17:40',
        '2025-04-23 06:17:40',
        'Delayed',
        'Life 779',
        'A1',
        'T1',
        'AP033',
        'AP000',
        36
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL473',
        'Allen, Sheppard and Mueller',
        '2025-05-14 09:49:21',
        '2025-05-14 14:49:21',
        'On Time',
        'Well 378',
        'C3',
        'T3',
        'AP007',
        'AP006',
        36
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL597',
        'Hammond-Strickland',
        '2025-04-24 04:28:21',
        '2025-04-24 08:28:21',
        'Cancelled',
        'Morning 600',
        'C3',
        'T1',
        'AP021',
        'AP013',
        17
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL623',
        'Taylor, Wright and Davidson',
        '2025-05-10 08:57:45',
        '2025-05-10 10:57:45',
        'On Time',
        'Two 441',
        'B2',
        'T3',
        'AP027',
        'AP017',
        3
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL818',
        'Mitchell and Sons',
        '2025-05-02 18:55:15',
        '2025-05-02 23:55:15',
        'Cancelled',
        'Explain 537',
        'A1',
        'T1',
        'AP010',
        'AP028',
        36
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL826',
        'Potts and Sons',
        '2025-05-06 13:55:20',
        '2025-05-06 15:55:20',
        'Delayed',
        'Technology 696',
        'B2',
        'T2',
        'AP009',
        'AP034',
        3
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL506',
        'Sanders LLC',
        '2025-05-06 16:01:46',
        '2025-05-06 19:01:46',
        'On Time',
        'Eat 466',
        'B2',
        'T3',
        'AP002',
        'AP019',
        24
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL153',
        'Flores Inc',
        '2025-05-03 12:20:37',
        '2025-05-03 16:20:37',
        'Delayed',
        'Those 735',
        'B2',
        'T1',
        'AP006',
        'AP022',
        36
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL220',
        'Lowery-Kennedy',
        '2025-05-01 01:04:08',
        '2025-05-01 04:04:08',
        'On Time',
        'Theory 854',
        'C3',
        'T2',
        'AP011',
        'AP026',
        2
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL779',
        'Bullock Inc',
        '2025-04-21 12:07:57',
        '2025-04-21 23:07:57',
        'Cancelled',
        'Establish 210',
        'D4',
        'T1',
        'AP015',
        'AP017',
        11
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL289',
        'Henderson, Parsons and Young',
        '2025-04-25 05:41:00',
        '2025-04-25 13:41:00',
        'Delayed',
        'Campaign 412',
        'B2',
        'T1',
        'AP014',
        'AP012',
        30
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL369',
        'Brown-Copeland',
        '2025-04-17 02:03:34',
        '2025-04-17 03:03:34',
        'Delayed',
        'Money 985',
        'A1',
        'T2',
        'AP012',
        'AP025',
        22
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL808',
        'Allen, Thomas and Patterson',
        '2025-05-13 17:40:43',
        '2025-05-13 23:40:43',
        'Delayed',
        'Possible 128',
        'A1',
        'T2',
        'AP032',
        'AP025',
        35
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL396',
        'Beck Inc',
        '2025-05-01 21:29:16',
        '2025-05-02 00:29:16',
        'On Time',
        'Need 710',
        'D4',
        'T2',
        'AP037',
        'AP016',
        3
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL188',
        'Hartman, Romero and Smith',
        '2025-05-02 06:33:40',
        '2025-05-02 18:33:40',
        'Cancelled',
        'Tv 218',
        'D4',
        'T3',
        'AP020',
        'AP027',
        39
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL065',
        'Burgess-Kelly',
        '2025-05-07 14:10:28',
        '2025-05-07 18:10:28',
        'On Time',
        'Author 632',
        'B2',
        'T2',
        'AP016',
        'AP002',
        28
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL319',
        'Sherman, Anderson and Bell',
        '2025-05-01 12:09:05',
        '2025-05-01 19:09:05',
        'Delayed',
        'Ground 779',
        'A1',
        'T3',
        'AP004',
        'AP021',
        40
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL772',
        'Brown Group',
        '2025-04-23 06:25:16',
        '2025-04-23 11:25:16',
        'Delayed',
        'Although 512',
        'C3',
        'T3',
        'AP032',
        'AP019',
        27
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL303',
        'Stewart LLC',
        '2025-04-29 00:18:46',
        '2025-04-29 03:18:46',
        'Cancelled',
        'Myself 866',
        'B2',
        'T3',
        'AP012',
        'AP026',
        25
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL874',
        'Mullins and Sons',
        '2025-05-04 02:23:31',
        '2025-05-04 12:23:31',
        'On Time',
        'Feeling 411',
        'C3',
        'T1',
        'AP019',
        'AP025',
        36
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL054',
        'Lloyd Group',
        '2025-05-02 02:19:57',
        '2025-05-02 09:19:57',
        'Delayed',
        'Visit 552',
        'D4',
        'T3',
        'AP037',
        'AP038',
        21
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL765',
        'Crawford Group',
        '2025-05-04 04:29:11',
        '2025-05-04 08:29:11',
        'Cancelled',
        'Hold 186',
        'C3',
        'T3',
        'AP032',
        'AP030',
        11
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL416',
        'Jordan and Sons',
        '2025-05-09 23:25:39',
        '2025-05-10 10:25:39',
        'On Time',
        'Offer 788',
        'C3',
        'T1',
        'AP039',
        'AP021',
        6
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL511',
        'Guerrero-Parker',
        '2025-04-29 00:41:24',
        '2025-04-29 04:41:24',
        'On Time',
        'Player 586',
        'A1',
        'T2',
        'AP009',
        'AP001',
        3
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL275',
        'Williams-Berg',
        '2025-05-05 10:53:19',
        '2025-05-05 17:53:19',
        'Delayed',
        'Head 509',
        'B2',
        'T1',
        'AP036',
        'AP012',
        25
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL640',
        'Lambert Group',
        '2025-05-14 14:46:53',
        '2025-05-15 01:46:53',
        'On Time',
        'Himself 280',
        'D4',
        'T1',
        'AP000',
        'AP006',
        28
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL202',
        'Gregory, Kim and Martinez',
        '2025-05-09 16:12:57',
        '2025-05-10 01:12:57',
        'On Time',
        'Eat 920',
        'D4',
        'T3',
        'AP015',
        'AP007',
        30
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL569',
        'Jacobs Ltd',
        '2025-05-02 13:13:51',
        '2025-05-02 22:13:51',
        'Delayed',
        'Listen 727',
        'D4',
        'T3',
        'AP035',
        'AP038',
        21
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL571',
        'Taylor, Richardson and Edwards',
        '2025-05-02 18:37:56',
        '2025-05-03 02:37:56',
        'Delayed',
        'Family 869',
        'B2',
        'T3',
        'AP010',
        'AP030',
        29
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL102',
        'Holmes-Mcintyre',
        '2025-04-26 21:14:46',
        '2025-04-27 02:14:46',
        'Delayed',
        'Buy 550',
        'A1',
        'T3',
        'AP033',
        'AP031',
        16
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL473',
        'Mitchell, Hendricks and Henry',
        '2025-04-27 11:25:09',
        '2025-04-27 16:25:09',
        'Delayed',
        'Can 653',
        'A1',
        'T1',
        'AP015',
        'AP017',
        22
    );

INSERT INTO
    flight (
        flightNumber,
        airline,
        departureTime,
        arrivalTime,
        status,
        aircraft,
        gate,
        terminal,
        departureAirport,
        arrivalAirport,
        assignedController
    )
VALUES
    (
        'FL172',
        'Wallace, Miller and Fleming',
        '2025-04-21 08:33:45',
        '2025-04-21 11:33:45',
        'Cancelled',
        'Through 319',
        'A1',
        'T2',
        'AP014',
        'AP024',
        10
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        27,
        'SF551256',
        '18C',
        'Business',
        '2025-03-31 06:46:27',
        474.19,
        'Confirmed'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        27,
        'gZ978207',
        '20D',
        'Economy',
        '2025-04-01 15:12:26',
        871.05,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        25,
        'DJ846773',
        '20D',
        'Economy',
        '2025-03-18 22:05:13',
        948.46,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        25,
        'Cc058147',
        '20D',
        'Economy',
        '2025-04-11 11:13:14',
        539.40,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        28,
        'pO578091',
        '20D',
        'Economy',
        '2025-04-11 02:06:10',
        449.97,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        26,
        'lJ334123',
        '14B',
        'Business',
        '2025-03-29 20:43:26',
        927.58,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        35,
        'an403690',
        '12A',
        'Business',
        '2025-03-30 07:54:08',
        632.70,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        2,
        'Hx087603',
        '12A',
        'Business',
        '2025-03-23 09:56:03',
        222.13,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        12,
        'DS160529',
        '12A',
        'Business',
        '2025-03-24 05:15:29',
        441.19,
        'Confirmed'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        30,
        'MZ909743',
        '18C',
        'Business',
        '2025-04-02 07:35:47',
        785.10,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        18,
        'JA932480',
        '20D',
        'Business',
        '2025-04-09 11:10:15',
        851.41,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        2,
        'FN869261',
        '12A',
        'Business',
        '2025-03-26 15:41:16',
        301.80,
        'Confirmed'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        3,
        'zB847007',
        '12A',
        'Economy',
        '2025-03-21 15:49:30',
        279.42,
        'Confirmed'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        40,
        'Xj839335',
        '14B',
        'Economy',
        '2025-03-25 12:35:11',
        213.60,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        8,
        'Eh775204',
        '14B',
        'Business',
        '2025-03-22 12:13:50',
        729.51,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        11,
        'Cf464887',
        '12A',
        'Economy',
        '2025-03-27 06:14:42',
        968.24,
        'Confirmed'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        38,
        'mi214562',
        '12A',
        'Business',
        '2025-04-08 18:00:17',
        618.21,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        26,
        'ZD374740',
        '14B',
        'Economy',
        '2025-03-17 01:03:02',
        632.88,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        16,
        'yC699938',
        '12A',
        'Business',
        '2025-04-02 06:54:08',
        865.26,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        8,
        'mh585064',
        '12A',
        'Business',
        '2025-04-11 15:54:33',
        579.47,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        24,
        'CA147679',
        '12A',
        'Business',
        '2025-04-12 13:10:44',
        111.39,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        32,
        'Wo451712',
        '12A',
        'Business',
        '2025-04-02 16:14:24',
        964.70,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        30,
        'QW885165',
        '14B',
        'Business',
        '2025-04-07 10:59:41',
        258.52,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        18,
        'VE963605',
        '20D',
        'Business',
        '2025-04-11 13:08:33',
        492.01,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        38,
        'tF461200',
        '18C',
        'Business',
        '2025-03-22 01:37:18',
        866.53,
        'Confirmed'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        18,
        'HP049027',
        '20D',
        'Economy',
        '2025-04-14 11:23:56',
        775.42,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        40,
        'gR754965',
        '20D',
        'Business',
        '2025-03-19 22:52:32',
        125.83,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        12,
        'hW731585',
        '20D',
        'Economy',
        '2025-03-18 23:01:46',
        419.34,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        22,
        'Gm521818',
        '18C',
        'Business',
        '2025-03-30 18:46:38',
        600.21,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        13,
        'ny612018',
        '12A',
        'Economy',
        '2025-04-04 02:19:02',
        748.06,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        36,
        'GM569847',
        '14B',
        'Business',
        '2025-04-08 00:06:45',
        681.31,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        29,
        'jC044997',
        '12A',
        'Economy',
        '2025-04-10 06:54:26',
        364.81,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        16,
        'JQ226838',
        '18C',
        'Business',
        '2025-04-04 17:02:18',
        525.93,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        23,
        'qd539502',
        '20D',
        'Business',
        '2025-04-04 15:27:07',
        416.63,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        18,
        'Bh713493',
        '18C',
        'Business',
        '2025-04-12 16:14:06',
        307.48,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        13,
        'PO779979',
        '18C',
        'Economy',
        '2025-03-19 08:21:11',
        768.59,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        12,
        'py743671',
        '14B',
        'Economy',
        '2025-03-21 20:26:37',
        764.74,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        38,
        'eE870262',
        '18C',
        'Economy',
        '2025-03-31 03:47:29',
        849.36,
        'Cancelled'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        15,
        'xB005045',
        '18C',
        'Economy',
        '2025-03-19 08:50:09',
        372.04,
        'Pending'
    );

INSERT INTO
    ticket (
        flightId,
        passengerPassportNumber,
        seat,
        class,
        bookingDate,
        price,
        status
    )
VALUES
    (
        35,
        'jR156545',
        '14B',
        'Business',
        '2025-04-06 14:41:08',
        140.96,
        'Confirmed'
    );