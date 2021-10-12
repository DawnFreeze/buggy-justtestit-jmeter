
### [PERFORMANCE] Release Strategy - [buggy.justtestit](https://buggy.justtestit.org)
---
#### 1. Executive Summary
**1.1 Overview**
This document is to sumamrize the test cases, requirements, observations, and objectives of the performance testing phace for the public website 'buggy.justtestit.org'

**1.2 Performace SLA**
*[TODO: production analysis, currently using placeholders]*

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

Database Requirements:
Baseline user base:1.4 Million Registered Users
Target user base: 2.1 Million Registered Users

![buggy justtestit-DB-Projection-MOCK](https://user-images.githubusercontent.com/6401440/136873147-5ee7ed14-657e-4610-a8a7-2dfb4718c557.JPG)

Metric Definitions:
RPS = 

**1.3 Performance Lab Infrastructure**
[TBD]

**1.4 Server-side analysis**
[TBD]
