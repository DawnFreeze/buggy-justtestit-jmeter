## Functional bugs observed during test development / manual testing
  
###Functional:

**Title:** Misleading UI behaviour
**Category:** Broken Functionality / UX odd behaviour
**Desc:** Vehicle image returns to landing page (possible UX issue - clicking on image should expand image)
**Path:** /model/c4u1mqnarscc72is00e0%7Cc4u1mqnarscc72is00kg
**Steps:**  Navigate to page, click on the primary vehicle image
**Sev:** Low
**Note:** Observed on multiple pages

**Title:** Table filtering not functioning correctly
**Category:** Broken Functionality
**Desc:** Filters not working correctly
**Path:** /make/c4u1mqnarscc72is00e0  
**Steps:** Navigate to page, and click on the 'Rank' or 'Model' filter link
**Sev:** Medium - this is core functionality on a site where ranking is a key theme
**Note:** Observed on multiple pages

**Title:** Home logo hyperlink broken
**Category:** Broken Functionality
**Desc:** Banner Home logo link not working
**Path:**  /make/c4u1mqnarscc72is00e0 
**Steps:** Navigate to page, and click the 'Buggy Rating' logo text, which results in no action
**Sev:** Medium
**Note:** Observed on multiple pages

**Title:** Table not loading/rendering content correctly
**Category:** Broken Functionality
**Desc:** Content missing for 'Author' column in table
**Path:** /model/c4u1mqnarscc72is00e0%7Cc4u1mqnarscc72is00kg
**Steps:** Navigate to page, scroll down to comment table
**Sev:** Medium
**Note:** Observed on multiple pages

**Title:** Broken image link
**Category:** Broken UI
**Desc:** Primary vehicle image broken on page
**Path:** /model/c4u1mqnarscc72is013g%7Cc4u1mqnarscc72is0150
**Steps:** Navigate to page
**Sev:** High - critical aspect of page unavailable
**Note:** 

**Title:** Multiple broken features on page
**Category:** Broken Functionality / Broken UI
**Desc:** Page non-functional, broken images, missing critical functionality
**Path:** /model/c4u1mqnarscc72is013g%7Cc4u1mqnarscc72is0170
**Steps:** Navigate to page
**Sev:** Critical - multiple broken features, including some browser functionality. Observable from parent page(s)
**Note:** 

**Title:** Third party link not working
**Category:** Broken Functionality
**Desc:** Link to third party website broken 
**Path:** /overall
**Steps:** Navigate to page, scroll to the bottom of the page, click the 'Twitter' hyperlinked icon (t)
**Sev:** Low
**Note:** 

**Title:** App behaviour causing UX issues
**Category:** UX
**Desc:** Middle mouse button (open in new tab) returning to landing page when used on 'Profile banner button'
**Path:** /<any>
**Steps:** Navigate to any page, and use the middle mouse button to attempt to open Profile page in a new tab
**Sev:** Low
**Note:** Obscure functionality, and may be a biproduct of the framework being used, but could cause user inconveniences

**Title:** Page not rendering nicely
**Category:** UX
**Desc:** Poor formatting on voting/comment table
**Path:** /model/c4u1mqnarscc72is00ng%7Cc4u1mqnarscc72is00sg
**Steps:** Navigate to page and view table
**Sev:** Medium - could cause bad UX experience in isolated cases
**Note:** Could be state dependent - may require certain manipulation of data retrieved from the database to recreate

**Title:** Broken page theme/format
**Category:** UX
**Desc:** Inconsistent use of font formatting / style on description
**Path:** /model/c4u1mqnarscc72is00ng%7Cc4u1mqnarscc72is00r0
**Steps:** Navigate to page and observe description text
**Sev:** Low
**Note:** Observed on multiple pages within the 'Alpha Romeo' make category

**Title:** Poor page formatting
**Category:** UX
**Desc:** Inconsistent formatting of images causing skewed rendering
**Path:** /model/c4u1mqnarscc72is0100%7Cc4u1mqnarscc72is0120
**Steps:** Navigate to page and observe image sizing and page layout
**Sev:** Low
**Note:**  

**Title:** Broken restricted data submission field
**Category:** Broken Functionality
**Desc:** Gender dropdown accepts random text, not restricted to pre-defined listed options returned from server
**Path:** /profile
**Steps:** As an authenticated user with a current, valid session, navigate to the 'Profile Update' page, enter random characters into the 'Gender' text field, and save changes
**Sev:** Critical
**Note:** Could potentially lead to data corruption. Also, possible post-2016 feature?

**Title:** Refreshing page leads re-routes to different page
**Category:** Broken Functionality
**Desc:** Browser refresh returns to landing page
**Path:** /profile
**Steps:** Navigate to page, and refresh at the browser level
**Sev:** Low
**Note:** 

**Title:** Error message formatting / data exposure
**Category:** UX
**Desc:** Invalid age renders an error message that is not very user-friendly or easily interpreted, possible UX
**Path:** /profile
**Steps:** As an authenticated user with a current, valid session, navigate to the 'Profile Update' page, enter random characters into the 'Age' text field, and save changes
**Sev:** Low
**Note:** 

**Title:** Max user age limit concern
**Category:** UX
**Desc:** Age field limited to 95, possible UX
**Path:** /profile
**Steps:** As an authenticated user with a current, valid session, navigate to the 'Profile Update' page, enter a numeric value that exceeds 95, and attempt to save changes
**Sev:** Low
**Note:** Edge case - necessary to restrict to 95 years? 

---

Further testing that could be carried out
- Vote with content vs. no content
- Monitor vote counting values
- Spelling throughout site
- Review browser console output during testing
- Client-side restriction bypass (content length, etc)
- Security / pentesting
- Client testing (browser make, browser size, etc)

