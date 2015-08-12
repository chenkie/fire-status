(function() {

	'use strict';

	angular
		.module('statusApp')
		.controller('StatusController', StatusController);

	function StatusController($rootScope, Status, md5) {

		var vm = this;

		vm.addStatus = addStatus;
		vm.deleteStatus = deleteStatus;
		vm.md5 = md5;
		vm.statusData = Status;

		function addStatus() {
			if(vm.statusText) {

				// Add the status data to Firebase
				vm.statusData.$add({
					date: Firebase.ServerValue.TIMESTAMP,
					text: vm.statusText,
					user: {
						username: $rootScope.loggedInUserData.username,
						email: $rootScope.loggedInUserData.email
					}
				});
				vm.statusText = '';
			}
		}

		function deleteStatus(status) {

			// Remove the status that was passed in
			// from the views
			vm.statusData.$remove(status);
		}
	}

})();