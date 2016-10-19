angular.module('inputCookies', ['ngCookies'])
.directive('inputCookie', function ($cookies) {

	return {
		restrict: 'A',
		require: '^ngModel',
		scope:{
			ngModel: "=",
		},
		link: function(scope, element, attrs, ngController) {
			
			scope.getList =  function(){
				
				if(getCookies(attrs.cookieName)){
					
					return  getCookies(attrs.cookieName).split(",");
				}
				
				return new Array();
			}
			
			if((element.is("input") && attrs.type === 'button') || (element.is("button"))){
				element.on('click', function() {
					
					removeAllCokies();
					
				});

			}
			
			if(element.is("input")){
				
				if(attrs.type === 'checkbox'){
					
					element.on('click', function() {
						
						var lista = scope.getList();
						
						if(scope.ngModel){
							
							lista.push( attrs.cookieValue);
						}else{
							
							for (var i = 0; i < lista.length; i++) {
								if(lista[i] === attrs.cookieValue){
									lista.splice(i, 1);
								}
							}
							
						}
						
						setCookie(attrs.cookieName,lista);
					});

				}else{
					
					element.on('keyup', function() {

						setCookie(attrs.cookieName,attrs.cookieValue);
					
					});
					
				}
			}else if(element.is("select")){
				
				element.on('change', function() {
					
					setCookie(attrs.cookieName,attrs.cookieValue);
					
				});

			}
			
			function removeAllCokies() {
				var cookies = $cookies.getAll();
				var path = document.location.pathname;

				angular.forEach(cookies, function (v, k) {
				    $cookies.remove(k, {path: path});
				    $cookies.remove(k, {path: "/"});
				});
				
				window.location.assign(window.location.href);
			}

			function setCookie(name, value) {
				
				if(attrs.cookieDisablePath){
					
					$cookies.put(name, value, {path: "/"});
				}else{
					var path = document.location.pathname;
					$cookies.put(name, value, {path: path});
				}
				
			}

			function getCookies(name) {
				return $cookies.get(name);
			}

			(function loadValues() {
				
				var lista = scope.getList();
				
				if(attrs.type === 'checkbox'){
					
					for(var i = 0; i < lista.length; i++){

						if(lista[i] === attrs.cookieValue){
							
							ngController.$setViewValue(lista);
							element.attr("checked","checked");
							
						}
					}
					
					scope.ngModel = lista;

				}else{
					scope.ngModel = getCookies(attrs.cookieName);
				}

			})();

		}
	}
})