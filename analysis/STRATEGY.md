
### [PERFORMANCE] Release Strategy - [buggy.justtestit](https://buggy.justtestit.org)
---
### 1. Executive Summary  
**1.1 Overview**  
This document is to sumamrize the test cases, requirements, observations, and objectives of the performance testing phace for the public website 'buggy.justtestit.org'

**1.2 Performace SLA**  
[TBD] *Production metrics required, currently using placeholders*

***Metric Definitions:***  
**RPS** = Server-side calculation of backend processing (ex: perfmon-ASP.NET / counter-Requests/Sec / instance-&#95;&#95;TOTAL&#95;&#95;)  
**Response Time** = End-to-End processing time for client request/transaction

Client Web Transaction SLA (pages):
| Route | Path | Metric (sec) |
| ----------- | ----------- | ----------- |
| Landing | / | 2 |
| Make | /make/<make_id> | 4 |
| Model | /model/<make_id>&#124;<model_id> | 4 |
| Overall | /overall | 4 |

Client Web Transaction SLA (transactions):
| Transaction | Name | Metric (sec) |
| ----------- | ----------- | ----------- |
| Login | tx-login-existing | 6 |
| Register | tx-register | 6 |
| Vote with comment | tx-vote | 4 |

![buggy justtestit-SLA-vis](https://user-images.githubusercontent.com/6401440/136873133-84358532-3540-45d2-aa41-91e5302b4614.JPG)
  
Target RPS: *3500* 

Database Requirements:  
Baseline user base: *1.4 Million Registered Users*  
Target user base: *2.1 Million Registered Users*  

![buggy justtestit-DB-Projection-MOCK](https://user-images.githubusercontent.com/6401440/136873665-92d2dae7-dc58-43e1-ac02-f35ce084c971.JPG)

**1.3 Performance Lab Infrastructure**  
[TBD] *Present infrastructure diagram and machine specification of hardware/cloud performacne lab environment*

**1.4 Server-side analysis**  
[TBD] *Present tools being used for server-side metric capture and reporting*

---
### 2. Test scenarios  
**2.1 Baseline**  
[TBD] *Present baseline test results and observations*

**2.2 Functional flow**   

| Action| Chance |
| ----------- | ----------- |
| Landing | 100% |
| Login (existing user) | 50% |
| Navigate to Make | 100% |
| Navigate to Model | 100% |
| Navigate to Overall | 100% |
| Perform User Registration | 50% |
| [If Register] Submit Vote | 30% |
| [If Register] Update Profile | 10% |

**2.3 Performance run outline**  

#### Peak Efficiency
*Identify maximum operational capacity*
- [ ] **Ramp-up**: 30 minutes
- [ ] **Peak load**: 3300 virtual users
- [ ] **Duration**: 6 hours

#### Endurance/Stress test
*Production volume replication, sustained for 36 hours*
- [ ] **Ramp-up**: 30 minutes
- [ ] **Peak load**: 1200 virtual users
- [ ] **Duration**: 36 hours

#### Network latency test
- [ ] **Ramp-up**: 30 minutes
- [ ] **Peak load**: 3300 virtual users
- [ ] **Duration**: 2 hours
- [ ] **Backend Latency**: 1.5 second network lag for 5 minutes @ 1 hour mark
---
