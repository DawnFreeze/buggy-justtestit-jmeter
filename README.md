# buggy-justtestit-jmeter
A simple JMeter template targeting the the website buggy.justtestit.org

Developed against JMeter 5.4.1 
Download link: https://jmeter.apache.org/download_jmeter.cgi

CLI commands:
Test run:          root_path~$ <path_to_bin>\jmeter -n -t buggy.justtestit.opg.jmx -l .\reporting\res_out.jtl -j .\logs\run.log
Generate report:   root_path~$ <path_to_bin>\jmeter -g .\reporting\res_out.jtl -o .\reporting\report
