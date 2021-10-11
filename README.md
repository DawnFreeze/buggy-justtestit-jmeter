# buggy-justtestit-jmeter

## Description
A simple JMeter template targeting the the website buggy.justtestit.org

## Resources
Developed against JMeter 5.4.1 (download link: https://jmeter.apache.org/download_jmeter.cgi)

## CLI commands
Test run:
```
root_path~$ <path_to_bin>\jmeter -n -t buggy.justtestit.opg.jmx -l .\reporting\res_out.jtl -j .\logs\run.log
```
Generate report:   
```
root_path~$ <path_to_bin>\jmeter -g .\reporting\res_out.jtl -o .\reporting\report
```
  
GUI example:  
![ui_cap](https://user-images.githubusercontent.com/6401440/136859198-29811d4c-1eaf-4cdf-9f16-b842d07c9ca8.jpg)
  
CLI example:  
![cli_cap](https://user-images.githubusercontent.com/6401440/136859230-72351ced-8058-4dbe-849b-74decce62ad8.jpg)
  
Report example:  
![report-cap](https://user-images.githubusercontent.com/6401440/136859253-ecf453a4-7169-4b2b-bd57-1eabe596ae78.jpg)
