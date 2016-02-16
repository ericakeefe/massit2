'use strict';

/**
 * @ngdoc function
 * @name eeaDoerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eeaDoerApp
 */

angular.module('eeaDoerApp')
    .controller('MainCtrl', function($scope, Tabletop, $window, $timeout, $q, lodash, $anchorScroll, $location) {


        //Media Queries checking 
        //when the browser is between 759px and 1000 px 
        var mq = $window.matchMedia("(min-height: 759px) and (max-height: 1200px )");
        if (mq.matches) {
            $('#footer').css('position', 'fixed');
        } else {
            $('#footer').css('position', 'relative');
        }

        //Hover functionality
        $scope.searchHoverIn = function() {
            $('#searchdata').show();
        }
        $scope.searchHoverOut = function() {
            $('#searchdata').hide();
        };
        $scope.learnHoverIn = function() {
            $('#learndata').show();
        }
        $scope.learnHoverOut = function() {
            $('#learndata').hide();
        };

        $scope.applyHoverIn = function() {
            $('#applydata').show();
        }
        $scope.applyHoverOut = function() {
            $('#applydata').hide();
        };

        //Scrolling focus
        $location.hash('home');
        $anchorScroll();

        //set the default sort type
        $scope.sortType = 'programName';

        // set the default sort order
        $scope.sortReverse = false;

        // set the default search/filter term
        $scope.searchIncentives = '';

        //functionality for checking without zipcode data in searchbox
        function woZipcodewRadioButton() {
            var empty_info = [];
            if ($scope.searchIncentives.incentiveProgram != undefined && $scope.searchIncentives.incentiveCategory != undefined) {

                var iData = $window.incentiveData;

                for (var i = 0; i < iData.length; i++) {
                    if (iData[i].incentiveCategory == $scope.searchIncentives.incentiveCategory && iData[i].incentiveProgram == $scope.searchIncentives.incentiveProgram) {
                        empty_info.push(iData[i]);
                    }
                }

            } else if ($scope.searchIncentives.incentiveProgram == undefined && $scope.searchIncentives.incentiveCategory != undefined) {

                var iData = $window.incentiveData;

                for (var i = 0; i < iData.length; i++) {
                    if (iData[i].incentiveCategory == $scope.searchIncentives.incentiveCategory) {
                        empty_info.push(iData[i]);
                    }
                }

            } else if ($scope.searchIncentives.incentiveProgram != undefined && $scope.searchIncentives.incentiveCategory == undefined) {
                var iData = $window.incentiveData;

                for (var i = 0; i < iData.length; i++) {
                    if (iData[i].incentiveProgram == $scope.searchIncentives.incentiveProgram) {
                        empty_info.push(iData[i]);
                    }
                }
            }
            $scope.tableData3 = empty_info;
        }

        //Data Filtering Method
        function  dataFiltering() {
            var inData = $window.incentiveData;
            for (var i = 0; i < inData.length; i++) {
                var p_utility_array = $window.p_utility[i];
                var comp = p_utility_array.split(',')
                for (var j = 0; j < comp.length; j++) {
                    var clea = comp[j].trim();
                    new_comp.push(clea);
                }
                var combined_array = [$window.utilityArray, $window.new_comp];

                var result = combined_array.shift().filter(function(v) {
                    return combined_array.every(function(a) {
                        return a.indexOf(v) !== -1;
                    });
                });

                if (result.length > 0) {

                    $window.extracted_info.push(inData[i]);

                }
                new_comp = [];
            }
            utilityArray = [];
            $scope.tableData3 = '';
            $scope.tableData3 = [];
            $scope.tableData3 = extracted_info;
        }


        //show me function 
        $scope.showMe = function() {

            $location.hash('home');
            $anchorScroll();
            $('#footer').css('position', 'relative');
            $scope.show = true;
            woZipcodewRadioButton();
        }
        //Getting informaiton from the spreadsheet
        function asyncdata() {
            var deferred = $q.defer();
            $timeout(function() {
                if ($window.incentiveData) {
                    deferred.resolve({
                        iData: $window.incentiveData,
                        zdata: $window.zipcodeData
                    });
                } else {
                    deferred.reject({
                        data: "Internal error"
                    })
                }
            }, 2000)
            return deferred.promise;
        }
        var utiltiyArray = [];
        asyncdata().then(function(data) {
            console.log(zipcodeData)
            $scope.tableData = data.iData;
            console.log($scope.tableData);
            $scope.tableData2 = data.zdata;
            console.log($scope.tableData2)
        });

        $scope.clearFilters = function() {

            $scope.searchIncentives = '';
            $scope.tableData3 = '';
            $scope.modalDialog = '';

        };


        //Zipcode search functionality
        $scope.zipSearch = function() {
            $location.hash('home');
            $anchorScroll();
            $('#footer').css('position', 'relative');

            //Search box textbox empty
            if ($scope.searchIncentives.ZIPCODE == "") {
                woZipcodewRadioButton();
            } else {
                //   $scope.searchIncentives = '';
                $scope.sortType = 'programName';
                // set the default sort order
                $scope.sortReverse = false;
                $window.utilityArray = [];
                $window.new_comp = [];
                $window.extracted_info = [];
                $scope.show = true;

                $location.hash('home');
                $anchorScroll();

                var textData = $scope.searchIncentives.ZIPCODE;
                console.log(textData)
                var output = lodash.where($window.zipcodeData, {
                    ZIPCODE: textData
                });
               
                //trying to figure out duplicate name double sorting
                if (output.length == 1) {
                    utilityArray.push(output[0]["Electric Utility 1"]);
                    utilityArray.push(output[0]["Gas Utility 2"]);
                    utilityArray.push(output[0]["Electric Utility 2"]);
                    utilityArray.push(output[0]["GasUtility1"]);
                    utilityArray.push(output[0]["Napplicable"]);

                    for (var j = 0; j < utilityArray.length; j++) {
                        if (utilityArray[j] == "Eversource - NSTAR" || utilityArray[j] == "Eversource - WMECO") {
                            utilityArray.push("Eversource")
                        }
                        if (utilityArray[j] == "Training and Certifications") {
                            utilityArray.push("Commercial");
                        }
                    }

                    utilityArray = lodash.without(utilityArray, '');
                    $window.p_utility = lodash.pluck($window.incentiveData, 'participatingUtility');
                    dataFiltering();

                    /*  var inData = $window.incentiveData;
                      for (var i = 0; i < inData.length; i++) {
                          var p_utility_array = p_utility[i];
                          var comp = p_utility_array.split(',')
                          for (var j = 0; j < comp.length; j++) {
                              var clea = comp[j].trim();
                              new_comp.push(clea);
                          }
                          var combined_array = [utilityArray, new_comp];
                         
                          var result = combined_array.shift().filter(function(v) {
                              return combined_array.every(function(a) {
                                  return a.indexOf(v) !== -1;
                              });
                          });

                          if (result.length > 0) {
                              
                              extracted_info.push(inData[i]);

                          }
                          new_comp = [];
                      }
                      utilityArray = [];
                      //debugger;
                      $scope.tableData3 = '';
                      $scope.tableData3 = [];

                      $scope.tableData3 = extracted_info;
                      // $location.hash('scrolltesting');
                      //  $anchorScroll();
                      console.log($scope.tableData3);*/

                } else if (output.length == 2) {

                    $('#myModal').modal('show');
                    for (var i = 0; i < output.length; i++) {
                        utilityArray.push(output[i]["Electric Utility 1"]);
                        utilityArray.push(output[i]["Gas Utility 2"]);
                        utilityArray.push(output[i]["Electric Utility 2"]);
                        utilityArray.push(output[i]["GasUtility1"]);
                        utilityArray.push(output[i]["Napplicable"]);

                    }
                    //Replacing Eversource - NSTAR and Eversource - WMECO as Eversource
                    for (var j = 0; j < utilityArray.length; j++) {
                        if (utilityArray[j] == "Eversource - NSTAR" || utilityArray[j] == "Eversource - WMECO") {
                            utilityArray[j] = "Eversource";
                        }
                    }

                    utilityArray = lodash.without(utilityArray, '');
                    utilityArray = lodash.without(utilityArray, 'none');
                    utilityArray = lodash.uniq(utilityArray);
                    var utility_array_Napplicable = lodash.without(utilityArray, 'Not Applicable');
                    $scope.modalDialog = utility_array_Napplicable;
                    $scope.user = {
                        roles: ['user']
                    };

                    //  debugger;
                    $scope.sbmit = function() {

                        $('#myModal').modal('hide');
                        $window.p_utility = lodash.pluck($window.incentiveData, 'participatingUtility');
                          dataFiltering();
                        /*     var inData = $window.incentiveData;
                             for (var i = 0; i < inData.length; i++) {
                                 var p_utility_array = p_utility[i];
                                 var comp = p_utility_array.split(',')
                                 for (var j = 0; j < comp.length; j++) {
                                     var clea = comp[j].trim();
                                     new_comp.push(clea);
                                 }
                                 console.log($scope.user.role);
                                 var combined_array = [$scope.user.role, new_comp];

                                 var result = combined_array.shift().filter(function(v) {
                                     return combined_array.every(function(a) {
                                         return a.indexOf(v) !== -1;
                                     });
                                 });

                                 if (result.length > 0) {

                                     extracted_info.push(inData[i]);

                                 }
                                 new_comp = [];
                             }
                             utilityArray = [];
                             //debugger;
                             $scope.tableData3 = '';
                             $scope.tableData3 = [];

                             $scope.tableData3 = extracted_info;

                             console.log($scope.tableData3);*/

                    }
                } else if (output.length == 0) {
                    console.log("hello empty data")
                    $scope.tableData3 = '';
                }

            }
            //Submit function
        }


    })
    .filter('zipcodeFilter', function() {
        //  debugger;
        return function(items, searchIncentives) {

            var filtered = [];
            angular.forEach(items, function(item) {
                if (searchIncentives.incentiveProgram == undefined && searchIncentives.incentiveCategory == undefined) {
                    filtered.push(item);
                }

                if (searchIncentives.incentiveProgram == item.incentiveProgram && searchIncentives.incentiveCategory == undefined) {
                    filtered.push(item);
                } else if (searchIncentives.incentiveCategory == item.incentiveCategory && searchIncentives.incentiveProgram == undefined) {
                    filtered.push(item);

                } else if (searchIncentives.incentiveCategory == item.incentiveCategory && searchIncentives.incentiveProgram == item.incentiveProgram) {
                    filtered.push(item);
                }

            });

            return filtered;
        };
    });
//End Ctrl