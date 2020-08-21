// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add('customerUploadFile', function(fixtureName) {
//     return cy.fixture(fixtureName).then(function(fixture) {
//       const { file, fileName, fileType } = fixture;
//       return customerUploadFile(file, fileName, fileType);
//     });
//   });

// Cypress.Commands.add('fileRequest', (filePath, requestOptions) => {
//     return cy
//       .fixture(filePath, 'binary')
//       .then(binary => Cypress.Blob.binaryStringToBlob(binary))
//       .then(blob => {
//         const formData = new FormData();
//         formData.set('file', blob);
  
//         return cy.request({ ...requestOptions, form: true, body: formData });
//       });
//   }); //


Cypress.Commands.add('form_request', (method, url, formData, done) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
        done(xhr);
    };
    xhr.onerror = function () {
        done(xhr);
    };
    xhr.send(formData);
})