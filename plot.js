var allData;

//read the data
d3.json('./data/samples.json').then((data) => {
    //console.log(data) 

    allData = data;
    init()
});
//console.log(allData)
function init() {
    //select dropDown menu
    var dropDown = d3.select('#selTestSubject');
    //get the id data to the dropdown menu
    allData.names.forEach(function (name) {
        dropDown.append('option').text(name).property('value', name);
    });
    //print the first sample metadata to the home screen
    getInfo(allData.names[0])
};
function getInfo(sample) {

    //select demographic box
    var demoBox = d3.select('#demographicInfo');

    //clear the previous information
    demoBox.html("")

    //loop through all the metadata and find the object with the id that matches sample
    //[0] gives the found object as an object, not an array of arrays
    var data = allData.metadata.filter(obj => obj.id == sample)[0]

    //print each piece of the metadata under the dropdown box
    Object.entries(data).forEach(([key, value]) => demoBox.append('p').text(`${key} : ${value}`));
    //  console.log(`${key} : ${value}`));



    getPlot(allData.names[0])
};

function getPlot(sample) {

    //select plot area
    var barChart = d3.select('#sampleBacteria');

    //clear the previous information
    barChart.html("")

    //find the sampledata that matches the sample
    var data = allData.samples.filter(obj => obj.id == sample)[0]
    console.log(data)


    //isolate the top ten most common bacteria
    var bacteriaSamples = data.sample_values.slice(0, 10)

    //isolate the top ten bacteria ids    
    var graphLabel = []

    //create an otu label and make each element of the bacteriaId array a string
    var bacteriaId = data.otu_ids.slice(0, 10)
    for (var j = 0; j < bacteriaId.length; j++) {
        graphLabel.push(`OTU ${bacteriaId[j]}`)
    };

    //  Create the Traces
    var trace1 = {
        x: bacteriaSamples,
        y: graphLabel,
        type: "bar",
        orientation: 'h',
        text: bacteriaId
    };


    // Create the data array for the plot
    var graphData = [trace1];


    //scale the x-axis
    var axisTemplate ={
        nticks:  4,
        title:  "Number of Specimen",
    };
    // Define the plot layout
    var layout = {
        xaxis: axisTemplate
    };

    Plotly.newPlot("sampleBacteria", graphData, layout);

    getBubbleChart(allData.names[0])

}

//create a bubble chart
function getBubbleChart(sample) {
    //select plot area
    var chartArea = d3.select('#bubbleChart');

    //clear the previous information
    chartArea.html("")

    //find the sampledata that matches the sample
    var data = allData.samples.filter(obj => obj.id == sample)[0]
    //console.log(data)

    //select the otu_id data
    var bacteria = data.otu_ids
    //console.log(bacteria.length)

    //verify that all otu_ids are different
    // var sameOtu = []
    // for (var m = 0; m <bacteria.length; m++){
    //     if (bacteria[m] != bacteria[m+1]){
    //         continue
    //     }
    //     else{
    //         sameOtu.push(bacteria[m])
    //     }
    //     }
    // console.log(sameOtu)


    //select the sample values
    var samples = data.sample_values
    //console.log(samples.length)

    //create labels that have OTU added to the otu_id
    var bacteriaIdLabel = []
    for (var k = 0; k < bacteria.length; k++) {
        bacteriaIdLabel.push(`OTU ${bacteria[k]}`)
    };

    // var bubbleColor = ['#d6cbd3','#eca1a6', '#bdcebe', '#ada397', '#d5e1df','#e3eaa7','#b5e7a0','#86af49','#b9936c','#dac292','#e6e2d3','#3e4444','#92a8d1','#034f84', '#f7786b', '#deeaee','#c94c4c','#ffef96','#50394c','#80ced6','#b2c2bf','#3b3a30','#b0aac0','#c2d4dd','#563f46','#625750', '#484f4f','#7e4a35','#cab577','#587e76','#a96e5b','#454140','#bd5734','','','', '', '','','','','','','','','','', '', '','','','','','','','','','','', '','','','','','','','','','','', '','','','','','','','','',''] 
    //console.log(bubbleColor.length)

    var trace1 = {
        x: bacteria,
        y: samples,
        text: bacteriaIdLabel,
        mode: 'markers',
        marker: {
            size: samples,
            color: bacteria,
        }
    };
    var data = [trace1];
    var layout = {
        title: 'OTU ID (Microbial Species)',
        showlegend: false        
    };
    Plotly.newPlot('bubbleChart', data, layout)
}

//sampleID is a variable only defined within the onChange function and is set on the index.html page. it equals this.value, which is the value
// selected in the drop down box

function onChange(sampleID) {
    getInfo(sampleID)
    getPlot(sampleID)
    getBubbleChart(sampleID)
}
