## Performance test approach (buggy.justtestit.org)

Develop a simple JMeter performance script to target the primary functionality of the website 'buggy.justtestit.org' for both registered and unregistered flows.  
Given there are no current production based runtime models, the main target of this test suite will be functional coverage against the heaviest resources, based on API response content:  
  
* Login of existing users
* Registering users
* Navigate to most popular make based on dynamic landing page
* Navigate to most popular model based on dynamic landing page
* Data submission as authenticated users
  
  
Development notes:  
* Currently data submission is restricted to new users (not existing users) to prevent voiding existing user scenarios
* Resource caching manually implemented on Landing page only