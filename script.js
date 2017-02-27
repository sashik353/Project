function PersonTableController(table, form) {

  this.table = table;
  this.form = form;
  this.fieldsNames = ['first_name', 'last_name', 'gender', 'phone_number', 'age'];

  this.deleteRow = function() {
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
  }

  this.initDeleteButtons = function() {
    var deleteButtons = document.getElementsByClassName('delete_button');
    for (var index in deleteButtons) {
        deleteButtons[index].onclick = this.deleteRow;
    }
  }

  this.checkName = function(nameString) {
    return /^[a-zA-Z]+$/.test(nameString);
  };

  this.checkGender = function(genderString) {
    return genderString == 'male' || genderString == 'female';
  };

  this.checkPhoneNumber = function(phoneNumberString) {
    return /^\d+$/.test(phoneNumberString) && phoneNumberString.length == 10;
  };

  this.checkAge = function(ageNumber) {
    return 0 < ageNumber < 250;
  };

  this.highlightField = function(fieldName) {
    this.form.elements.namedItem(fieldName).focus();
    alert('Please correct the mistake in field ' + fieldName);
  };

  this.validateForm = function() {
    var fields = this.form.elements;
    if (!(this.checkName(fields.namedItem('first_name').value))) {
      return 'first_name';
    }
    else if (!(this.checkName(fields.namedItem('last_name').value))) {
      return 'last_name';
    }
    else if (!(this.checkGender(fields.namedItem('gender').value))) {
      return 'gender';
    }
    else if (!(this.checkPhoneNumber(fields.namedItem('phone_number').value))) {
      return 'phone_number';
    }
    else if (!(this.checkAge(Number(fields.namedItem('age').value)))) {
      return 'age';
    }
  };

  this.addRecord = function() {
    var invalidFieldName = this.validateForm();
    if (invalidFieldName) {
      this.highlightField(invalidFieldName);
    }
    else {
      var row = this.table.insertRow(-1);
      for (var index in this.fieldsNames) {
        var cell = row.insertCell(-1);
        cell.innerHTML = this.form.elements.namedItem(this.fieldsNames[index]).value;
      }
      var cell = row.insertCell(-1);
      cell.innerHTML = '<button class="delete_button btn btn-danger">X</button>';
      this.initDeleteButtons();
      this.form.reset();
    }
  };

  var self = this;
  this.form.onsubmit = function(e) {
    e.preventDefault();
    self.addRecord();
  };

  this.initDeleteButtons();

}


window.onload = function() {
  var table = document.getElementById('persons_table');
  var form = document.getElementById('persons_form');
  var personTableController = new PersonTableController(table, form);
}
