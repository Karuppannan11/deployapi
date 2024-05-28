const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

// Enable CORS for all requests
const app = express();
app.use(cors());

const port = 3020;

// MySQL Connection Pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: 'localhost',
  user: 'root',
  database: 'dhan',
  password: 'Harihara11!+'
});

app.get('/state', (req, res) => {
  const query = 'SELECT * FROM state';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching states data:', err);
      res.status(500).json({ error: 'Error fetching states data' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/district', (req, res) => {
  const { state_scode } = req.query;
  console.log('State Code:', state_scode);
  const query = 'SELECT * FROM district WHERE state_scode = ?';
  pool.query(query, [state_scode], (err, results) => {
    if (err) {
      console.error('Error fetching districts data:', err);
      res.status(500).json({ error: 'Error fetching districts data' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/location', (req, res) => {
  const { district_dcode } = req.query;
  console.log('district_dcode', district_dcode);
  const query = 'SELECT * FROM location WHERE district_dcode = ?';
  pool.query(query, [district_dcode], (err, results) => {
    if (err) {
      console.error('Error fetching locations data:', err);
      res.status(500).json({ error: 'Error fetching locations data' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/cluster', (req, res) => {
  const { location_lcode } = req.query;
  console.log('location_lcode', location_lcode);
  const query = 'SELECT * FROM cluster WHERE location_lcode=?';
  pool.query(query, [location_lcode], (err, results) => {
    if (err) {
      console.error('Error fetching clusters data:', err);
      res.status(500).json({ error: 'Error fetching clusters data' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/grp', (req, res) => {
  const { cluster_ccode } = req.query;
  console.log('cluster_ccode', cluster_ccode);
  const query = 'SELECT * FROM grp WHERE cluster_ccode=?';
  pool.query(query, [cluster_ccode], (err, results) => {
    if (err) {
      console.error('Error fetching groups data:', err);
      res.status(500).json({ error: 'Error fetching groups data' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/members', (req, res) => {
  const { group_gcode } = req.query;
  console.log('group_gcode', group_gcode);
  const query = 'SELECT * FROM members WHERE group_gcode=?';
  pool.query(query, [group_gcode], (err, results) => {
    if (err) {
      console.error('Error fetching members data:', err);
      res.status(500).json({ error: 'Error fetching members data' });
    } else {
      res.json(results);
    }
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Submit API
app.post('/submit', (req, res) => {
  const formData = req.body;
  const sql = `INSERT INTO myfarmers_data 
  SET 
  state = '${formData.state}',
  district = '${formData.district}',
  location = '${formData.location}',
  cluster = '${formData.cluster}',
  grp = '${formData.grp}',
  mbr = '${formData.mbr}',
  doorNo = '${formData.doorNo}',
  street = '${formData.street}',
  aadharNumber = '${formData.aadharNumber}',
  farmerName = '${formData.farmerName}',
  spouseName = '${formData.spouseName}',
  fatherName = '${formData.fatherName}',
  datebirth = '${formData.datebirth}',
  gender='${formData.gender}',
  farmerMobile = '${formData.farmerMobile}',
  alternateNumber = '${formData.alternateNumber}',
  isMemberinFPO = '${formData.isMemberinFPO ? 1 : 0}',
  nameoftheFPO = '${formData.nameoftheFPO}',
  latitude = '${formData.latitude}',
  longitude = '${formData.longitude}',
  irrigationType = '${formData.irrigationType}',
  totalAcresinTankfed = '${formData.totalAcresinTankfed}',
  areaofCultivationinTankfed = '${formData.areaofCultivationinTankfed}',
  soilType = '${formData.soilType}',
  landownership = '${formData.landownership}',
  cultivationpractice = '${formData.cultivationpractice}',
  landposition = '${formData.landposition}',
  landtype = '${formData.landtype}',
  cropname = '${formData.cropname}',
  variety = '${formData.variety}',
  subvariety = '${formData.subvariety}',
  season = '${formData.season}',
  fertilizer = '${formData.fertilizer}',
  biofertilizer = '${formData.biofertilizer}',
  lastyearyields = '${formData.lastyearyields}',
  rateofsales = '${formData.rateofsales}',
  availabilityofMachinery = '${formData.availabilityofMachinery }',
  cropInsurance = '${formData.cropInsurance }',


  totalAcresinRainfed = '${formData.totalAcresinRainfed}',
  areaofCultivationinRainfed = '${formData.areaofCultivationinRainfed}',
  soilType1 = '${formData.soilType1}',
  landownership1 = '${formData.landownership1}',
  cultivationpractice1 = '${formData.cultivationpractice1}',
  landposition1 = '${formData.landposition1}',
  landtype1 = '${formData.landtype1}',
  cropname1 = '${formData.cropname1}',
  variety1 = '${formData.variety1}',
  subvariety1 = '${formData.subvariety1}',
  season1 = '${formData.season1}',
  fertilizer1 = '${formData.fertilizer1}',
  biofertilizer1 = '${formData.biofertilizer1}',
  lastyearyields1 = '${formData.lastyearyields1}',
  rateofsales1 = '${formData.rateofsales1}',
  availabilityofMachinery1 = '${formData.availabilityofMachinery1 }',
  cropInsurance1 = '${formData.cropInsurance1 }',

  totalAcresinBorewell = '${formData.totalAcresinBorewell}',
  areaofCultivationinBorewell = '${formData.areaofCultivationinBorewell}',
  soilType2 = '${formData.soilType2}',
  landownership2 = '${formData.landownership2}',
  cultivationpractice2 = '${formData.cultivationpractice2}',
  landposition2 = '${formData.landposition2}',
  landtype2 = '${formData.landtype2}',
  cropname2 = '${formData.cropname2}',
  variety2 = '${formData.variety2}',
  subvariety2 = '${formData.subvariety2}',
  season2= '${formData.season2}',
  fertilizer2 = '${formData.fertilizer2}',
  biofertilizer2 = '${formData.biofertilizer2}',
  lastyearyields2 = '${formData.lastyearyields2}',
  rateofsales2 = '${formData.rateofsales2}',
  availabilityofMachinery2 = '${formData.availabilityofMachinery2 }',
  cropInsurance2 = '${formData.cropInsurance2 }',

  totalAcresinDripOpenWellCanalIrrigation = '${formData.totalAcresinDripOpenWellCanalIrrigation}',
  areaofCultivationinDripOpenWellCanalIrrigation ='${formData.areaofCultivationinDripOpenWellCanalIrrigation}',
  soilType3 = '${formData.soilType3}',
  landownership3 = '${formData.landownership3}',
  cultivationpractice3 = '${formData.cultivationpractice3}',
  landposition3 = '${formData.landposition3}',
  landtype3 = '${formData.landtype3}',
  cropname3 = '${formData.cropname3}',
  variety3 = '${formData.variety3}',
  subvariety3 = '${formData.subvariety3}',
  season3 = '${formData.season3}',
  fertilizer3 = '${formData.fertilizer3}',
  biofertilizer3 = '${formData.biofertilizer3}',
  lastyearyields3 = '${formData.lastyearyields3}',
  rateofsales3 = '${formData.rateofsales3}',
  availabilityofMachinery3 = '${formData.availabilityofMachinery3 }',
  cropInsurance3 = '${formData.cropInsurance3}',

  liveStockDetails = '${formData.liveStockDetails}',
  NoofLivestockCow = '${formData.NoofLivestockCow}',
  VarietyBreadCow = '${formData.VarietyBreadCow}',
  FeedingTypeCow = '${formData.FeedingTypeCow}',
  WhetherFodderCultivatedCow = '${formData.WhetherFodderCultivatedCow}',
  NoofMilkYieldingAnimalCow = '${formData.NoofMilkYieldingAnimalCow}',
  MilkYieldDayAnimalCow ='${formData.MilkYieldDayAnimalCow}',
  FrequencyofSalesCow = '${formData.FrequencyofSalesCow}',
  AverageIncomeCow = '${formData.AverageIncomeCow}',
  NearbyVeterinaryHospitalCow = '${formData.NearbyVeterinaryHospitalCow}',
  AnyseasonaldiseaseoutbreakCow = '${formData.AnyseasonaldiseaseoutbreakCow}',
  TreatmentMethodFollowedCow = '${formData.TreatmentMethodFollowedCow}',
  NoofLivestockBuffalow = '${formData.NoofLivestockBuffalow}',
  VarietyBreadBuffalow = '${formData.VarietyBreadBuffalow}',
  FeedingTypeBuffalow = '${formData.FeedingTypeBuffalow}',
  WhetherFodderCultivatedBuffalow = '${formData.WhetherFodderCultivatedBuffalow}',
  NoofMilkYieldingAnimalBuffalow = '${formData.NoofMilkYieldingAnimalBuffalow}',
  MilkYieldDayAnimalBuffalow = '${formData.MilkYieldDayAnimalBuffalow}',
  FrequencyofSalesBuffalow = '${formData.FrequencyofSalesBuffalow}',
  AverageIncomeBuffalow = '${formData.AverageIncomeBuffalow}',
  NearbyVeterinaryHospitalBuffalow = '${formData.NearbyVeterinaryHospitalBuffalow}',
  AnyseasonaldiseaseoutbreakBuffalow = '${formData.AnyseasonaldiseaseoutbreakBuffalow}',
  TreatmentMethodFollowedBuffalow = '${formData.TreatmentMethodFollowedBuffalow}',
  NoofLivestockGoat = '${formData.NoofLivestockGoat}',
  VarietyBreadGoat = '${formData.VarietyBreadGoat}',
  FeedingTypeGoat = '${formData.FeedingTypeGoat}',
  WhetherFodderCultivatedGoat = '${formData.WhetherFodderCultivatedGoat}',
  NoofMilkYieldingAnimalGoat = '${formData.NoofMilkYieldingAnimalGoat}',
  MilkYieldDayAnimalGoat = '${formData.MilkYieldDayAnimalGoat}',
  FrequencyofSalesGoat = '${formData.FrequencyofSalesGoat}',
  AverageIncomeGoat = '${formData.AverageIncomeGoat}',
  NearbyVeterinaryHospitalGoat = '${formData.NearbyVeterinaryHospitalGoat}',
  AnyseasonaldiseaseoutbreakGoat = '${formData.AnyseasonaldiseaseoutbreakGoat}',
  TreatmentMethodFollowedGoat = '${formData.TreatmentMethodFollowedGoat}',
  NoofLivestockSheep = '${formData.NoofLivestockSheep}',
  VarietyBreadSheep = '${formData.VarietyBreadSheep}',
  FeedingTypeSheep = '${formData.FeedingTypeSheep}',
  WhetherFodderCultivatedSheep = '${formData.WhetherFodderCultivatedSheep}',
  NoofMilkYieldingAnimalSheep = '${formData.NoofMilkYieldingAnimalSheep}',
  MilkYieldDayAnimalSheep = '${formData.MilkYieldDayAnimalSheep}',
  FrequencyofSalesSheep = '${formData.FrequencyofSalesSheep}',
  AverageIncomeSheep = '${formData.AverageIncomeSheep}',
  NearbyVeterinaryHospitalSheep = '${formData.NearbyVeterinaryHospitalSheep}',
  AnyseasonaldiseaseoutbreakSheep = '${formData.AnyseasonaldiseaseoutbreakSheep}',
  TreatmentMethodFollowedSheep = '${formData.TreatmentMethodFollowedSheep}',
  LiveStockInsuranceDetails= '${formData.LiveStockInsuranceDetails}',


  LiveStockInsuranceDetailsCow20= '${formData.LiveStockInsuranceDetailsCow20}',
  LiveStockInsuranceDetailsCow21= '${formData.LiveStockInsuranceDetailsCow21}',
  LiveStockInsuranceDetailsCow22= '${formData.LiveStockInsuranceDetailsCow22}',
  LiveStockInsuranceDetailsCow23= '${formData.LiveStockInsuranceDetailsCow23}',
  LiveStockInsuranceDetailsCow24= '${formData.LiveStockInsuranceDetailsCow24}',
  LiveStockInsuranceDetailsbuffalo20= '${formData.LiveStockInsuranceDetailsbuffalo20}',
  LiveStockInsuranceDetailsbuffalo21= '${formData.LiveStockInsuranceDetailsbuffalo21}',
  LiveStockInsuranceDetailsbuffalo22= '${formData.LiveStockInsuranceDetailsbuffalo22}',
  LiveStockInsuranceDetailsbuffalo23= '${formData.LiveStockInsuranceDetailsbuffalo23}',
  LiveStockInsuranceDetailsbuffalo24= '${formData.LiveStockInsuranceDetailsbuffalo24}',



 LiveStockInsuranceDetailsgoat20= '${formData.LiveStockInsuranceDetailsgoat20}',
 LiveStockInsuranceDetailsgoat21= '${formData.LiveStockInsuranceDetailsgoat21}',
 LiveStockInsuranceDetailsgoat22= '${formData.LiveStockInsuranceDetailsgoat22}',
LiveStockInsuranceDetailsgoat23= '${formData.LiveStockInsuranceDetailsgoat23}',
LiveStockInsuranceDetailsgoat24= '${formData.LiveStockInsuranceDetailsgoat24}',


  LiveStockInsuranceDetailssheep20= '${formData.LiveStockInsuranceDetailssheep20}',
  LiveStockInsuranceDetailssheep21= '${formData.LiveStockInsuranceDetailssheep21}',
  LiveStockInsuranceDetailssheep22= '${formData.LiveStockInsuranceDetailssheep22}',
  LiveStockInsuranceDetailssheep23= '${formData.LiveStockInsuranceDetailssheep23}',
  LiveStockInsuranceDetailssheep24= '${formData.LiveStockInsuranceDetailssheep24}',

  irrigationtyperainfed='${formData.irrigationtyperainfed}',
  irrigationtypeborewell='${formData.irrigationtypeborewell}',
  irrigationtypedrip='${formData.irrigationtypedrip}',

Livestockbuffalow='${formData.Livestockbuffalow}',
Livestockgoat='${formData.Livestockgoat}',
Livestocksheep='${formData.Livestocksheep}',



  LiveStockInsuranceDetailsothers20= '${formData.LiveStockInsuranceDetailsothers20}',
  LiveStockInsuranceDetailsothers21= '${formData.LiveStockInsuranceDetailsothers21}',
  LiveStockInsuranceDetailsothers22= '${formData.LiveStockInsuranceDetailsothers22}',
LiveStockInsuranceDetailsothers23= '${formData.LiveStockInsuranceDetailsothers23}',
 LiveStockInsuranceDetailsothers24= '${formData.LiveStockInsuranceDetailsothers24}'`;
  pool.query(sql, formData, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data');
      return;
    }
    console.log('Data added successfully');
    res.status(200).send('Data added successfully');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

});