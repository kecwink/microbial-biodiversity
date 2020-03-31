metadata=[{"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}, {"id": 941, "ethnicity": "Caucasian/Midleastern", "gender": "F", "age": 34.0, "location": "Chicago/IL", "bbtype": "I", "wfreq": 1.0}, {"id": 943, "ethnicity": "Caucasian", "gender": "F", "age": 49.0, "location": "Omaha/NE", "bbtype": "I", "wfreq": 1.0}, {"id": 944, "ethnicity": "European", "gender": "M", "age": 44.0, "location": "NewHaven/CT", "bbtype": "I", "wfreq": 1.0}, {"id": 945, "ethnicity": "Caucasian", "gender": "F", "age": 48.0, "location": "Philidelphia/PA", "bbtype": "I", "wfreq": 1.0}, {"id": 946, "ethnicity": "Caucasian", "gender": "F", "age": 42.0, "location": "Deerfield/MA", "bbtype": "I", "wfreq": 3.0}]
names=["940", "941", "943", "944", "945", "946", "947", "948", "949", "950", "952", "953", "954", "955", "956", "958", "959", "960", "961", "962", "963", "964", "966", "967", "968", "969", "970", "971", "972", "973", "974", "975", "978", "1233", "1234", "1235", "1236", "1237", "1238", "1242", "1243", "1246", "1253", "1254", "1258", "1259", "1260", "1264", "1265", "1273", "1275", "1276", "1277", "1278", "1279", "1280", "1281", "1282", "1283", "1284", "1285", "1286", "1287", "1288", "1289", "1290", "1291", "1292", "1293", "1294", "1295", "1296", "1297", "1298", "1308", "1309", "1310", "1374", "1415", "1439", "1441", "1443", "1486", "1487", "1489", "1490", "1491", "1494", "1495", "1497", "1499", "1500", "1501", "1502", "1503", "1504", "1505", "1506", "1507", "1508", "1510", "1511", "1512", "1513", "1514", "1515", "1516", "1517", "1518", "1519", "1521", "1524", "1526", "1527", "1530", "1531", "1532", "1533", "1534", "1535", "1536", "1537", "1539", "1540", "1541", "1542", "1543", "1544", "1545", "1546", "1547", "1548", "1549", "1550", "1551", "1552", "1553", "1554", "1555", "1556", "1557", "1558", "1561", "1562", "1563", "1564", "1572", "1573", "1574", "1576", "1577", "1581", "1601"]

function init(){
    //select dropDown menu
    var dropDown = d3.select('#selTestSubject');
   
    //read the data
    d3.json('data/samples.json').then((data)=>{
        //console.log(data) 
        //get the id data to the dropdown menu
        data.names.forEach(function(name){
            dropDown.append('option').text(name).property('value');
        });
       
        });
        
    };
    function getInfo(){
        //select demographic box
        var demoBox = d3.select('#demographicInfo');
    
        //read the data
        d3.json('samples.json').then((data)=>{
            //console.log(data.metadata )
            for (var i=0; i < data.names.length; i ++){
                Object.entries(data.metadata[i]).forEach(([key, value]) => demoBox.append('p').text(`${key} : ${value}`));
                //  console.log(`${key} : ${value}`));
            };
            
            });
            
        };
  
 getInfo()
 
