/*
Tällä ohjelmalla voi lisätä minun phonebook tietokantaan uusia ihmisiä
käyttöohje:
node mongo.js <salasana> <lisättävän henkilön nimi> <lisättävän henkilön puhelinnumero>

jos haluat tarkastella tietokantaa, jätä lisättävän henkilön tiedot pois (node mongo.js <salasana>)
*/

console.clear();

if(process.argv.length < 3) {
	console.log('*****TOO FEW ARGUMENTS*****');
	return process.exit;
}

const mongoose = require('mongoose');

const personSchema =  new mongoose.Schema(
	{
		name: {type: String, unique: true },
		number: String,
	}
);

const database = 'phonebook';
const password = process.argv[2];

const Person = mongoose.model('Person', personSchema);

const url =
`mongodb+srv://fullstack:${password}@fullstackopen.fsx6v.mongodb.net/${database}?retryWrites=true&w=majority`;

if(process.argv[2] && !process.argv[3])		// Haetaan nimet ja tulostetaan ne komentoriville
{
	console.log('Fetching phonebook . . . ');
	mongoose.connect(url);
	
	Person.find({})
		.then(result => {
			console.clear();
			console.log('phonebook:');
			result.forEach(_person => {
				console.log(`${_person.name} ${_person.number}`);
			});
			
			mongoose.connection.close();
		});
}
else if (process.argv[3] && process.argv[4])	// Lisätään henkilö puhelinluetteloon
{
	console.log('Adding . . .');
	mongoose.connect(url);
	
	const person = new Person(
		{
			name: process.argv[3],
			number: process.argv[4],
		}
	);
	
	person.save()
		.then( () => {	// response =>
			console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`);
			mongoose.connection.close();
		});
}
else
{
	console.log('*****MISSING NUMBER*****');
}
