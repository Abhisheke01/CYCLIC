const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const PORT = process.env.PORT || 4000;



// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

// AMPLE  patient data
let patients = [
  {
    id: 1,
    name: 'Abhishek Naidu',
    age: 22,
    ward: 'NONE',
    bloodType: 'A+',
    disease: 'NONE'
  },
  {
    id: 2,
    name: 'CHUCK',
    age: 45,
    ward: 'Neurology',
    bloodType: 'O-',
    disease: 'Parkinson\'s disease'
  },
 
   {"id":3,"name":"David Kim","age":45,"ward":"SW","bloodType":"A-","disease":"NONE"},  {"id":4,"name":"Karen Chen","age":29,"ward":"NW","bloodType":"O+","disease":"NONE"},  {"id":5,"name":"Michael Brown","age":55,"ward":"SE","bloodType":"AB-","disease":"NONE"},  {"id":6,"name":"Jennifer Lee","age":23,"ward":"NONE","bloodType":"A+","disease":"NONE"},  {"id":7,"name":"Matthew Johnson","age":41,"ward":"NE","bloodType":"O-","disease":"NONE"},  {"id":8,"name":"Emily Davis","age":30,"ward":"SW","bloodType":"B+","disease":"NONE"},  {"id":9,"name":"William Smith","age":48,"ward":"NW","bloodType":"AB+","disease":"NONE"},  {"id":10,"name":"Avery Brown","age":26,"ward":"SE","bloodType":"A-","disease":"NONE"}

  
];

// GET all patients
app.get('/patients', (req, res) => {
  res.json(patients);
});

// GET a patient by ID
app.get('/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  res.json(patient);
});

// POST a new patient
app.post('/patients', (req, res) => {
  const patient = {
    id: patients.length + 1,
    name: req.body.name,
    age: req.body.age,
    ward: req.body.ward,
    bloodType: req.body.bloodType,
    disease: req.body.disease
  };
  patients.push(patient);
  res.json(patient);
});

// PUT (update) an existing patient
app.put('/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  patient.name = req.body.name;
  patient.age = req.body.age;
  patient.ward = req.body.ward;
  patient.bloodType = req.body.bloodType;
  patient.disease = req.body.disease;
  res.json(patient);
});

// DELETE a patient
app.delete('/patients/:id', (req, res) => {
  const patientIndex = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (patientIndex === -1) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  patients.splice(patientIndex, 1);
  res.json({ message: 'Patient deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
