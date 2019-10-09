/* eslint-disable func-names */
// 🎙️ I have used faker.js to generate the random data
// 🎙️ With the following code
function generateFakeUsers(faker) {
  const users = [];
  for (let i = 0; i < 11; i++) {
    const fName = faker.name.firstName();
    const lName = faker.name.lastName();
    users[i] = {
      fName,
      lName,
      email: faker.internet.email(fName, lName),
      username: faker.internet.userName(fName, lName),
      joined: faker.date.recent(365).toISOString(),
      address: {
        streetAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        zip: faker.address.zipCode(),
      },
    };
  }
  return users;
}
// 🎙️ Go to faker.js website
// 🎙️ https://rawgit.com/Marak/faker.js/master/examples/browser/index.html
// 🎙️ Open console and paste the above function
// 🎙️ Now run JSON.stringify(generateFakeUsers(faker))

module.exports = [
  {
    fName: 'Reta',
    lName: 'Swaniawski',
    email: 'Reta67@hotmail.com',
    username: 'Reta89',
    joined: '2018-08-09T11:55:20.512Z',
    address: {
      streetAddress: '03273 Swaniawski Ramp',
      city: 'Flaviefort',
      state: 'Oregon',
      country: 'Paraguay',
      zip: '24626',
    },
  },
  {
    fName: 'Aileen',
    lName: 'Jakubowski',
    email: 'Aileen.Jakubowski72@gmail.com',
    username: 'Aileen_Jakubowski',
    joined: '2018-10-10T08:05:42.137Z',
    address: {
      streetAddress: '584 Anderson Manors',
      city: 'New Clotilde',
      state: 'Massachusetts',
      country: 'Samoa',
      zip: '94311',
    },
  },
  {
    fName: 'Marianna',
    lName: 'Nader',
    email: 'Marianna_Nader65@gmail.com',
    username: 'Marianna_Nader',
    joined: '2018-05-21T14:41:46.229Z',
    address: {
      streetAddress: '502 Ankunding Ville',
      city: 'North Tanya',
      state: 'New Jersey',
      country: 'Liechtenstein',
      zip: '93819-7250',
    },
  },
  {
    fName: 'Cody',
    lName: 'Raynor',
    email: 'Cody_Raynor46@yahoo.com',
    username: 'Cody77',
    joined: '2018-10-30T15:09:41.741Z',
    address: {
      streetAddress: '243 Beier Port',
      city: 'Stehrberg',
      state: 'Alabama',
      country: 'Uruguay',
      zip: '32853-0737',
    },
  },
  {
    fName: 'Kelli',
    lName: 'Beatty',
    email: 'Kelli.Beatty54@gmail.com',
    username: 'Kelli_Beatty',
    joined: '2018-08-10T07:28:00.044Z',
    address: {
      streetAddress: '934 Celine Creek',
      city: 'Windlerchester',
      state: 'Massachusetts',
      country: 'Cayman Islands',
      zip: '25990-6987',
    },
  },
  {
    fName: 'Micah',
    lName: 'Mante',
    email: 'Micah_Mante@hotmail.com',
    username: 'Micah_Mante52',
    joined: '2018-03-23T17:34:15.098Z',
    address: {
      streetAddress: '27018 Eliseo Row',
      city: 'South Caden',
      state: 'New Mexico',
      country: 'Australia',
      zip: '54631',
    },
  },
  {
    fName: 'Price',
    lName: 'Kutch',
    email: 'Price.Kutch@yahoo.com',
    username: 'Price_Kutch',
    joined: '2018-12-14T20:44:56.607Z',
    address: {
      streetAddress: '60261 Nya Fork',
      city: 'Keiratown',
      state: 'Mississippi',
      country: 'Greece',
      zip: '77884-2567',
    },
  },
  {
    fName: 'Clyde',
    lName: 'Friesen',
    email: 'Clyde.Friesen@gmail.com',
    username: 'Clyde46',
    joined: '2018-11-17T07:42:49.990Z',
    address: {
      streetAddress: "308 O'Reilly Springs",
      city: 'Annamaehaven',
      state: 'Maryland',
      country: 'Latvia',
      zip: '72534',
    },
  },
  {
    fName: 'Geoffrey',
    lName: 'Reinger',
    email: 'Geoffrey.Reinger@gmail.com',
    username: 'Geoffrey26',
    joined: '2018-05-23T00:38:18.678Z',
    address: {
      streetAddress: '856 Laverna Junctions',
      city: 'New Vincehaven',
      state: 'Rhode Island',
      country: 'Turks and Caicos Islands',
      zip: '49469-0401',
    },
  },
  {
    fName: 'Julien',
    lName: 'Luettgen',
    email: 'Julien.Luettgen@hotmail.com',
    username: 'Julien_Luettgen36',
    joined: '2018-07-31T12:43:39.847Z',
    address: {
      streetAddress: '71385 Runolfsdottir Falls',
      city: 'Jasonview',
      state: 'Kansas',
      country: 'Luxembourg',
      zip: '47527',
    },
  },
  {
    fName: 'Jordan',
    lName: 'Fisher',
    email: 'Jordan45@gmail.com',
    username: 'Jordan_Fisher',
    joined: '2018-08-15T00:48:44.792Z',
    address: {
      streetAddress: '81153 Tillman Keys',
      city: 'Lake Lethaburgh',
      state: 'Oregon',
      country: 'Solomon Islands',
      zip: '04623',
    },
  },
];
