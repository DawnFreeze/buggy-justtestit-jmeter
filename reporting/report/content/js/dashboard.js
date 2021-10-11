/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9355345911949685, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "get_model"], "isController": false}, {"data": [1.0, 500, 1500, "globals"], "isController": false}, {"data": [0.9375, 500, 1500, "get_home_nocache"], "isController": false}, {"data": [1.0, 500, 1500, "api_vote_opt"], "isController": false}, {"data": [1.0, 500, 1500, "runtime-controller"], "isController": false}, {"data": [1.0, 500, 1500, "api_reg_users_init"], "isController": false}, {"data": [1.0, 500, 1500, "api_login_opt"], "isController": false}, {"data": [1.0, 500, 1500, "get_register"], "isController": false}, {"data": [0.8181818181818182, 500, 1500, "tx-make"], "isController": true}, {"data": [0.9545454545454546, 500, 1500, "tx-model"], "isController": true}, {"data": [1.0, 500, 1500, "vars-overwrite"], "isController": false}, {"data": [1.0, 500, 1500, "get_home_cache"], "isController": false}, {"data": [0.9545454545454546, 500, 1500, "api_make"], "isController": false}, {"data": [1.0, 500, 1500, "api_vote_submit"], "isController": false}, {"data": [0.9545454545454546, 500, 1500, "api_dashboard"], "isController": false}, {"data": [1.0, 500, 1500, "api_reg_users"], "isController": false}, {"data": [0.8636363636363636, 500, 1500, "tx-landing"], "isController": true}, {"data": [0.5, 500, 1500, "tx-vote"], "isController": true}, {"data": [0.7272727272727273, 500, 1500, "tx-overall"], "isController": true}, {"data": [1.0, 500, 1500, "get_overall"], "isController": false}, {"data": [1.0, 500, 1500, "api_login_auth"], "isController": false}, {"data": [0.9545454545454546, 500, 1500, "api_overall_page"], "isController": false}, {"data": [0.9375, 500, 1500, "get_home_nocache-0"], "isController": false}, {"data": [1.0, 500, 1500, "get_home_nocache-2"], "isController": false}, {"data": [1.0, 500, 1500, "get_home_nocache-1"], "isController": false}, {"data": [1.0, 500, 1500, "get_home_nocache-4"], "isController": false}, {"data": [1.0, 500, 1500, "api_login_current"], "isController": false}, {"data": [1.0, 500, 1500, "get_home_nocache-3"], "isController": false}, {"data": [1.0, 500, 1500, "get_home_nocache-6"], "isController": false}, {"data": [1.0, 500, 1500, "get_home_nocache-5"], "isController": false}, {"data": [0.9615384615384616, 500, 1500, "api_model"], "isController": false}, {"data": [1.0, 500, 1500, "get_home_nocache-7"], "isController": false}, {"data": [1.0, 500, 1500, "get_make"], "isController": false}, {"data": [0.5, 500, 1500, "tx-login-existing"], "isController": true}, {"data": [0.5, 500, 1500, "tx-login-new"], "isController": true}, {"data": [0.5, 500, 1500, "tx-register"], "isController": true}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 253, 0, 0.0, 147.92490118577072, 3, 1184, 99.0, 380.2, 408.59999999999997, 818.6000000000008, 1.9749115973366014, 45.64334830942103, 1.5822039876821719], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["get_model", 14, 0, 0.0, 106.7142857142857, 5, 340, 98.5, 295.0, 340.0, 340.0, 0.11233791244062138, 0.1373506507574785, 0.0838616307854025], "isController": false}, {"data": ["globals", 11, 0, 0.0, 47.54545454545455, 8, 381, 11.0, 310.60000000000025, 381.0, 381.0, 0.3459772284078757, 0.0, 0.0], "isController": false}, {"data": ["get_home_nocache", 8, 0, 0.0, 352.375, 139, 1184, 274.5, 1184.0, 1184.0, 1184.0, 0.25444483317960626, 86.69400126427277, 1.4185796412327853], "isController": false}, {"data": ["api_vote_opt", 2, 0, 0.0, 186.0, 186, 186, 186.0, 186.0, 186.0, 186.0, 0.5159958720330237, 0.2771462203302374, 0.3260247355521156], "isController": false}, {"data": ["runtime-controller", 11, 0, 0.0, 21.545454545454547, 12, 64, 18.0, 55.60000000000003, 64.0, 64.0, 0.350050916496945, 0.0, 0.0], "isController": false}, {"data": ["api_reg_users_init", 7, 0, 0.0, 88.71428571428571, 42, 113, 101.0, 113.0, 113.0, 113.0, 0.05740716441411888, 0.03083392619898963, 0.03268396177092901], "isController": false}, {"data": ["api_login_opt", 12, 0, 0.0, 93.66666666666666, 42, 167, 101.5, 151.10000000000005, 167.0, 167.0, 0.0983574309039048, 0.052828698239401985, 0.05676683756270286], "isController": false}, {"data": ["get_register", 7, 0, 0.0, 48.42857142857142, 5, 176, 47.0, 176.0, 176.0, 176.0, 0.057436839989169056, 0.07022551139300748, 0.04287730619169135], "isController": false}, {"data": ["tx-make", 11, 0, 0.0, 485.90909090909093, 338, 811, 414.0, 788.0000000000001, 811.0, 811.0, 0.36489086445962976, 1.8632952443939494, 0.516205249038015], "isController": true}, {"data": ["tx-model", 11, 0, 0.0, 416.3636363636363, 275, 907, 393.0, 822.8000000000003, 907.0, 907.0, 0.08950875965270601, 1.3814895122179456, 0.13082232867209687], "isController": true}, {"data": ["vars-overwrite", 7, 0, 0.0, 18.0, 8, 39, 13.0, 39.0, 39.0, 39.0, 0.05742034977195918, 0.0, 0.0], "isController": false}, {"data": ["get_home_cache", 9, 0, 0.0, 84.33333333333333, 3, 229, 52.0, 229.0, 229.0, 229.0, 0.31308703819661865, 0.38337535004870243, 0.21089890767411118], "isController": false}, {"data": ["api_make", 11, 0, 0.0, 407.3636363636364, 333, 691, 373.0, 647.4000000000001, 691.0, 691.0, 0.0895189576738092, 0.3476727486999406, 0.061893966829157133], "isController": false}, {"data": ["api_vote_submit", 2, 0, 0.0, 152.5, 101, 204, 152.5, 204.0, 204.0, 204.0, 0.5286809410520751, 0.28963867961934975, 0.9468758260639704], "isController": false}, {"data": ["api_dashboard", 11, 0, 0.0, 218.72727272727272, 111, 768, 169.0, 652.6000000000004, 768.0, 768.0, 0.36355223584625046, 0.2818949953729715, 0.06035535165416267], "isController": false}, {"data": ["api_reg_users", 7, 0, 0.0, 313.5714285714286, 226, 396, 321.0, 396.0, 396.0, 396.0, 0.05729955388204478, 0.03167143310277084, 0.04713943488314984], "isController": false}, {"data": ["tx-landing", 11, 0, 0.0, 544.0, 237, 2125, 383.0, 1815.2000000000012, 2125.0, 2125.0, 0.3472989612603795, 86.67621944361129, 1.6572548977046697], "isController": true}, {"data": ["tx-vote", 2, 0, 0.0, 904.0, 864, 944, 904.0, 944.0, 944.0, 944.0, 0.441306266548985, 7.244490567078553, 1.7139404512356575], "isController": true}, {"data": ["tx-overall", 11, 0, 0.0, 484.3636363636363, 330, 596, 512.0, 590.6, 596.0, 596.0, 0.08979811750491848, 0.37436344104345415, 0.11919934773912831], "isController": true}, {"data": ["get_overall", 11, 0, 0.0, 89.63636363636364, 4, 275, 46.0, 254.20000000000007, 275.0, 275.0, 0.09016910806357742, 0.11024582353085834, 0.06363230113613076], "isController": false}, {"data": ["api_login_auth", 12, 0, 0.0, 386.33333333333337, 347, 488, 380.0, 465.80000000000007, 488.0, 488.0, 0.09810975210935967, 0.3301862628973445, 0.07311923094218066], "isController": false}, {"data": ["api_overall_page", 11, 0, 0.0, 394.72727272727275, 321, 503, 398.0, 497.6, 503.0, 503.0, 0.09000163639338897, 0.26517083691294385, 0.05595538526836852], "isController": false}, {"data": ["get_home_nocache-0", 8, 0, 0.0, 248.24999999999997, 72, 878, 191.5, 878.0, 878.0, 878.0, 0.2549882067954357, 0.3130079843182253, 0.1716937193217314], "isController": false}, {"data": ["get_home_nocache-2", 8, 0, 0.0, 7.875, 6, 17, 6.0, 17.0, 17.0, 17.0, 0.26255333114538887, 4.544428946504759, 0.18576160978011158], "isController": false}, {"data": ["get_home_nocache-1", 8, 0, 0.0, 4.875, 3, 9, 4.0, 9.0, 9.0, 9.0, 0.26255333114538887, 0.9666270101739416, 0.18063361503117822], "isController": false}, {"data": ["get_home_nocache-4", 8, 0, 0.0, 7.5, 7, 9, 7.0, 9.0, 9.0, 9.0, 0.2641222886196309, 8.129498332728053, 0.18093924361979596], "isController": false}, {"data": ["api_login_current", 12, 0, 0.0, 152.91666666666669, 65, 206, 167.5, 204.5, 206.0, 206.0, 0.09833325138895717, 0.059921825065145776, 0.16395277135880162], "isController": false}, {"data": ["get_home_nocache-3", 8, 0, 0.0, 4.0, 3, 6, 4.0, 6.0, 6.0, 6.0, 0.2641222886196309, 0.25741605863514805, 0.18609788206939812], "isController": false}, {"data": ["get_home_nocache-6", 8, 0, 0.0, 30.875, 26, 47, 27.0, 47.0, 47.0, 47.0, 0.2639828411153275, 45.05360862481439, 0.18625742451740637], "isController": false}, {"data": ["get_home_nocache-5", 8, 0, 0.0, 12.75, 12, 14, 12.5, 14.0, 14.0, 14.0, 0.26409613099168094, 19.303196285322855, 0.18711107718209427], "isController": false}, {"data": ["api_model", 13, 0, 0.0, 335.3846153846154, 236, 567, 311.0, 499.3999999999999, 567.0, 567.0, 0.10607828577490189, 1.5058462905239451, 0.07582939959690252], "isController": false}, {"data": ["get_home_nocache-7", 8, 0, 0.0, 9.000000000000002, 8, 12, 9.0, 12.0, 12.0, 12.0, 0.26432300270931075, 11.362275325447698, 0.1857230473138175], "isController": false}, {"data": ["get_make", 11, 0, 0.0, 78.54545454545453, 5, 338, 44.0, 306.4000000000001, 338.0, 338.0, 0.37345102699032423, 0.4566022322186386, 0.27010879943982347], "isController": false}, {"data": ["tx-login-existing", 5, 0, 0.0, 564.2, 513, 620, 573.0, 620.0, 620.0, 620.0, 0.37169194171870357, 1.67464642804044, 1.1100666954727922], "isController": true}, {"data": ["tx-login-new", 7, 0, 0.0, 682.0, 603, 834, 658.0, 834.0, 834.0, 834.0, 0.05711534852601604, 0.2579672723953361, 0.17089186381661078], "isController": true}, {"data": ["tx-register", 7, 0, 0.0, 1150.7142857142858, 1061, 1252, 1132.0, 1252.0, 1252.0, 1252.0, 0.05692306441251332, 0.3887333881217828, 0.29204835614321845], "isController": true}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 253, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
