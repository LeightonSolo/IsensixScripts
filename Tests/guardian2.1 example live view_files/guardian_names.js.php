var sensornames= [];
var apnames= [];
var zonenames= [];
"use strict";
function getSensorName(a) {
 if (a in sensornames) return sensornames[a];
 return '#'+a;
}
function hasSensorName(a) { 
 return (a in sensornames);
}

function getAPName(a) {
 if (a in apnames) return apnames[a];
 return '#'+a;
}
function getZoneName(a) {
 if (a in zonenames) return zonenames[a];
 return '#'+a;
}
function getVolumeSetting() {
 return 0.1;
}
/* Settings */
