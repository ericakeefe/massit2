'use strict';

/**
 * @ngdoc function
 * @name eeaDoerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eeaDoerApp
 */
angular.module('eeaDoerApp')
    .controller('GlosCtrl', function($scope) {

        $('#footer').css('position', 'relative');
        console.log('something fired');
        // $scope.something = [];
        $scope.data = [
            {
                text: '<ul ><li><b><em class="title">Biomass</em> :</b> in the context of energy, often used to describe plant based material.</li></ul>'
            },
           {
              text:'<ul><li><em class="title"><a href="http://www.eia.gov/energyexplained/index.cfm?page=biofuel_home">Biomass</a></em><b>:</b>transportation fuels like <a href="http://www.eia.gov/energyexplained/index.cfm?page=biofuel_ethanol_home">ethabol</a>&nbsp;and '+
              '<a href="http://www.eia.gov/energyexplained/index.cfm?page=biofuel_biodiesel_home">biodiesel</a>&nbsp;that are made from biomass materials. These fuels are usually blended with petroleum fuels (gasoline and diesel fuel), but they can also be used on their own. Using ethanol or biodiesel means less gasoline and diesel fuel is burned, which can reduce the amount of crude oil imported from other countries. Ethanol and biodiesel are also cleaner-burning fuels than pure gasoline and diesel fuel.</li></ul>'
            },
            {
                text:'<ul><li><b><em class="title"><a href="http://www.eia.gov/energyexplained/index.cfm?page=about_btu">(British Thermal Unit)BTU</a></em> :</b> a measure of the heat content of fuels. It is the quantity of heat required to raise the temperature of 1 pound of liquid water by 1 degree Fahrenheit at the temperature that water has its greatest density (approximately 39 degrees Fahrenheit).</li> </ul>'
            },

             {
                text: '<ul><li><b><em class="title"><a href="http://www.eia.gov/energyexplained/index.cfm?page=electricity_home">Electricity</a></em> :</b> a secondary energy source, also referred to as an energy carrier. That means that customers get electricity from the conversion of other sources of energy, such as coal, natural gas, nuclear, solar, or wind energy. These sources of energy are called primary energy sources. The energy sources used to make electricity can be renewable or nonrenewable, but electricity itself is not renewable or nonrenewable.</li> </ul>'
            }, {
                text: '<ul ><li><b><em class="title">Geothermal</em> :</b> heat (thermal) derived from the Earth (geo) that can be harnessed to heat homes</li></ul>'
            },
             {
                text: '<ul ><li><b><em class="title"><a href="http://www.eia.gov/energyexplained/index.cfm?page=geothermal_heat_pumps">Geothermal Heat Pumps</a></em> :</b> this technology uses the earth is constant temperatures to heat and cool buildings. Geothermal heat pumps transfer heat from the ground (or water) into buildings during the winter and reverse the process in the summer.</li> '
            },

             {
                text: '<ul ><li><b><em class="title">Fuel Cell</em> :</b> an electrochemical generator that produces a continuous electric current directly from the chemical reaction between Oxygen and Hydrogen. </li></ul>'
            },

             {
                text: '<ul ><li><b><em class="title"><a href="http://www.eia.gov/energyexplained/index.cfm?page=heating_oil_home">Heating Oil</a></em> :</b> a petroleum product used by many Americans, especially in the Northeast, to heat their homes. At refineries, crude oil is processed into different fuels including gasoline, heating oil and diesel fuel, jet fuel/kerosene, and lubricating oil.</li></ul>'
            },

             {
                text: '<ul ><li><b><em class="title">Hydroelectric</em> :</b> the generation of power derived from the energy of falling water or any other hydraulic source.</li></ul>'
            }, {
                text: '<ul ><li><b><em class="title">HVAC</em> :</b> an acronym for Heating, Ventilation, and Air Conditioning. This system is used to provide heating and cooling services to buildings. This all-inclusive system has become the industrial standard for construction of new buildings. </li></ul>'
            }, {
                text: '<ul ><li><b><em class="title">Insulation</em> :</b> a material that prevents the transmission of heat, electricity, moisture, sound, and shock from one medium to another.</li></ul>'
            }, {
                text: '<ul ><li><b><em class="title">Natural Gas </em> :</b> a fossil fuel that is formed when layers of buried plants and gases and are exposed. </li></ul>'
            }, {
                text: '<ul ><li><b><em class="title">Organics</em> :</b> a method for generating electric power by the use of solar cells to convert energy from the sun into a flow of electrons.</li></ul>'
            }, {
                text: '<ul ><li><b><em class="title"><a href="http://www.eia.gov/energyexplained/index.cfm?page=propane_home">Propane</a></em> : </b>an energy-rich gas, C3H8. It is one of the liquefied petroleum gases (LP-gases or LPGs) that are found mixed with natural gas and oil used to heat homes and cook similar to natural gas but delivered like heating oil.</li></ul>'
            },
             {
                text: '<ul ><li><b><em class="title">Solar Energy </em> :</b> relates to the sun emitting light. Solar utilizes the sun’s energy to produce heat or electricity.</li></ul>'
            },
             {
                text: '<ul ><li><b><em class="title">Wind Energy </em> :</b> power derived from wind; used to generate mechanical or electrical power.</li></ul>'
            },
             {
                text: '<ul ><li><b><em class="title">Wood </em> :</b>arises from many sources including forests, co-products from wood processing, processed wood-based fuels and post-consumer recovered wood.</li></ul>'
            }

        ]
    })
    .filter('highlight', function($sce) {
        return function(text, phrase) {
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    })
