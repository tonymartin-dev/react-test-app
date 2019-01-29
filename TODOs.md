1. Modal service: 
    * add component modal function
    * add backdrop functionality
2. SingUp component:
    * *DONE:* add info edit functionality
    * *DONE:* "SingUp" and "return to login" buttons
3. Logout
    * *DONE:* cookie is not being removed
    * *DONE:* Logout message is not being displayed in login page
4. Managing errors
    * 401 => open a modal and, when dismissing, force a refresh token and redirect to login page if it's expired.
    * Not managed: when writing a post with an existing title.
5. Validations
    * Validate special data fields (email, phone, website, ¿password?)
6. Blog
    * *DONE:* Order posts by date
7. Other
    * Move sorting function in blog into a service or as a component, and make it more generic.