var allData;


d3.json('samples.json').then((data) => {   

    allData = data;
    init()
});


function init() {
    //select dropdown menu
    var dropDown = d3.select('#selTestSubject');
    //get the id data to the dropdown menu
    allData.names.forEach(function (name) {
        dropDown.append('option').text(name).property('value', name);
    });
    //print the first subject's metadata to the home screen
    getInfo(allData.names[0])
};
function getInfo(sample) {

    //select demographic box
    var demoBox = d3.select('#demographicInfo');

    //clear the previous information
    demoBox.html("")

    //loop through all the metadata and find the object with the id that matches sample    
    var data = allData.metadata.filter(obj => obj.id == sample)[0]

    //print each piece of the metadata under the dropdown box
    Object.entries(data).forEach(([key, value]) => demoBox.append('p').text(`${key} : ${value}`));
    
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
   

    //select the otu_id data
    var bacteria = data.otu_ids    

    
    //select the sample values
    var samples = data.sample_values
    

    //create labels that have OTU added to the otu_id
    var bacteriaIdLabel = []
    for (var k = 0; k < bacteria.length; k++) {
        bacteriaIdLabel.push(`OTU ${bacteria[k]}`)
    };

    

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


function onChange(sampleID) {
    getInfo(sampleID)
    getPlot(sampleID)
    getBubbleChart(sampleID)
}
