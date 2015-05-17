angular.module('AddressBook',[])
.service("contactService",function($http,$q, validationService){
	var contactUrl = 'http://localhost:3000/contacts';
	var contacts = undefined;	
	
	function getContacts(){
		var deferral = $q.defer();
		
		$http.get(contactUrl)
		.then(function(res){
			contacts = res.data;		
			deferral.resolve(res.data);
		})
		
		return deferral.promise;
	};
	
	function addContact(contact){
		contacts.push(contact);
		$http.post(contactUrl+'/new',contact);;
	}
	
	
	return {
		getContacts:getContacts,
		addContact:addContact
	}
})

.service("validationService",function(){
	
	function isValidContact(contact){
		if (!contact) return null;
		
		var valid = true;
		
		if (!contact.name || contact.name && !isValidName(contact.name)) valid = false;
		if (!contact.email || contact.email && !isValidEmail(contact.email)) valid = false;
		if (contact.age && !isValidAge(contact.age)) valid = false;
		if (contact.occupation && !isValidOccupation(contact.occupation)) valid = false;
		
		return valid;
	}
	
	function isValidName(name){
		return typeof name === 'string' && name.length > 1;
	};
	
	function isValidOccupation(occupation){
		return isValidName(occupation);
	}
	
	function isValidEmail(email){
		/* this is a great function to write tests for, since it certainly isn't clear
		 by reading it if it works correctly. */
		return 	/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
	};
	
	function isValidAge(age){
		return typeof age === 'number' && age >= 18;
	};
	
	return {
		isValidName:isValidName,
		isValidContact:isValidContact,
		isValidAge:isValidAge,
		isValidEmail:isValidEmail,
	}
})

.controller("ContactList",function($scope,contactService){
	contactService.getContacts().then(function(contacts){
		$scope.contacts = contacts;
	})
})

.controller("AddContact",function($scope,contactService,validationService){
	$scope.addContact = function(){
		if (!validationService.isValidContact($scope.contact)){
			$scope.errorMessage = true;
			return false;
		};
		
		contactService.addContact($scope.contact);		
	}
})