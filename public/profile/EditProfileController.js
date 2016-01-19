angular.module("quacker").controller("EditProfileController", ["user", "$state",
	function(user, $state) {
		var self = this;

		this.update = function() {
			user.update(this.profile).then(function(){
				$state.go('profile.view');
			});
		}
	}
]);