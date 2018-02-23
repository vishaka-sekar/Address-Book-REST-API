

module.exports = function(app) {
  var contactList = require('../controllers/AddressBookController');

  // AddressBook Routes
  app.route('/contact')
    .get(contactList.list_all_contacts);
    


  
};
