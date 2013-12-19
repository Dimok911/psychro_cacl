
//*****************************************************************************
//       Conversions between dew point, wet bulb, and relative humidity
//*****************************************************************************

///////////////////////////////////////////////////////////////////////////////
// Wet-bulb temperature given dry-bulb temperature and dew-point temperature
// ASHRAE Fundamentals (2005) ch. 6
// ASHRAE Fundamentals (2009) ch. 1
//
getTWetBulbFromTDewPoint = function(args){  //tdb, tdp, p


  var w = getHumRatioFromTDewPoint({t_c:args.tdp, p:args.p});
  return getTWetBulbFromHumRatio({w:w, tdb:args.tdb, p:args.p});

}

///////////////////////////////////////////////////////////////////////////////
// Wet-bulb temperature given dry-bulb temperature and relative humidity
// ASHRAE Fundamentals (2005) ch. 6
// ASHRAE Fundamentals (2009) ch. 1
//
getTWetBulbFromRelHum  = function(args) {  // tdb, fi, p

 
  var w = getHumRatioFromRelHum(args);
  return getTWetBulbFromHumRatio({tdb:args.tdb,p:args.p,w:args.w});

}

///////////////////////////////////////////////////////////////////////////////
// Relative Humidity given dry-bulb temperature and dew-point temperature
// ASHRAE Fundamentals (2005) ch. 6
// ASHRAE Fundamentals (2009) ch. 1
//
getRelHumFromTDewPoint = function(args) { // tdb, tdp


  var pv = getSatVapPres(args.tdp);     // Eqn. 36
  var psv = getSatVapPres(args.tdb);
  return pv/psv;              // Eqn. 24

}

///////////////////////////////////////////////////////////////////////////////
// Relative Humidity given dry-bulb temperature and wet bulb temperature
// ASHRAE Fundamentals (2005) ch. 6
// ASHRAE Fundamentals (2009) ch. 1
//
getRelHumFromTWetBulb = function(args) { //tdb,twb,p


  var w = getHumRatioFromTWetBulb(args);
  return getRelHumFromHumRatio({t_c:args.tdb,w:w,p:args.p});

}

///////////////////////////////////////////////////////////////////////////////
// Dew Point Temperature given dry bulb temperature and relative humidity
// ASHRAE Fundamentals (2005) ch. 6 eqn 24
// ASHRAE Fundamentals (2009) ch. 1 eqn 24
//
getTDewPointFromRelHum = function(args) {   // tdb, fi


  var pv = getVapPresFromRelHum(args);
  return getTDewPointFromVapPres({t_c:args.tdb,pv:pv});
}


///////////////////////////////////////////////////////////////////////////////
// Dew Point Temperature given dry bulb temperature and wet bulb temperature
// ASHRAE Fundamentals (2005) ch. 6
// ASHRAE Fundamentals (2009) ch. 1
//
getTDewPointFromTWetBulb = function(args) {// tdb, twb, p

  var w = getHumRatioFromTWetBulb(args);
  return getTDewPointFromHumRatio({tdb:args.tdb,w:w,p:args.p});

}

//*****************************************************************************
//  Conversions between dew point, or relative humidity and vapor pressure
//*****************************************************************************

///////////////////////////////////////////////////////////////////////////////
// Partial pressure of water vapor as a function of relative humidity and
// temperature in C
// ASHRAE Fundamentals (2005) ch. 6, eqn. 24
// ASHRAE Fundamentals (2009) ch. 1, eqn. 24
//

getVapPresFromRelHum  = function(args) {  //tdb,fi  

  return args.fi*getSatVapPres(args.tdb);
}

///////////////////////////////////////////////////////////////////////////////
// Relative Humidity given dry bulb temperature and vapor pressure
// ASHRAE Fundamentals (2005) ch. 6, eqn. 24
// ASHRAE Fundamentals (2009) ch. 1, eqn. 24
//
getRelHumFromVapPres = function(args) { //pv,tdb

  return args.pv/getSatVapPres(args.t_c);
}

///////////////////////////////////////////////////////////////////////////////
// Dew point temperature given vapor pressure and dry bulb temperature
// ASHRAE Fundamentals (2005) ch. 6, eqn. 39 and 40
// ASHRAE Fundamentals (2009) ch. 1, eqn. 39 and 40
//
getTDewPointFromVapPres = function(args) { //t_c, pv

  pv = args.pv/1000;
  alpha = Math.log(pv);
  if (args.t_c >= 0 && args.t_c <= 93)
  td = 6.54+14.526*alpha+0.7389*alpha*alpha+0.09486*Math.pow(alpha,3)
    +0.4569*Math.pow(pv, 0.1984);                            // (39)
  else if (args.t_c < 0)
  td = 6.09+12.608*alpha+0.4959*alpha*alpha;     // (40)
  else
    td = -1000;                                // Invalid value
  return td;
}

	   
	   	   
//*****************************************************************************
//        Conversions from wet bulb temperature, dew point temperature,
//                or relative humidity to humidity ratio
//*****************************************************************************

///////////////////////////////////////////////////////////////////////////////
// Wet bulb temperature given humidity ratio
// ASHRAE Fundamentals (2005) ch. 6 eqn. 35
// ASHRAE Fundamentals (2009) ch. 1 eqn. 35
//

getTWetBulbFromHumRatio = function(args) { //tdb, p, w


 var tdp = getTDewPointFromHumRatio(args);

  var tWetBulbSup = args.t_c;
  var tWetBulbInf = tdp;
  var twb = (tWetBulbInf*1 + tWetBulbSup*1)/2;

  while((tWetBulbSup - tWetBulbInf) > 0.001)
  {
   var wstar = getHumRatioFromTWetBulb({tdb:args.t_c,twb:twb,p:args.p});
   
   if (wstar*1 > args.w*1){
    tWetBulbSup = twb;
	}
   else {
    tWetBulbInf = twb;
	}
   twb = (tWetBulbSup*1+tWetBulbInf*1)/2;
   
  }

  return twb;
}


///////////////////////////////////////////////////////////////////////////////
// Humidity ratio given wet bulb temperature and dry bulb temperature
// ASHRAE Fundamentals (2005) ch. 6 eqn. 35
// ASHRAE Fundamentals (2009) ch. 1 eqn. 35
//

getHumRatioFromTWetBulb = function(args)//tdb,twb,p
{
  var wsstar = getSatHumRatio({t_c:args.twb, p:args.p});

  return (((2501 - 2.326*args.twb)*wsstar - 1.006*(args.tdb - args.twb)) / (2501 + 1.86*args.tdb -4.186*args.twb));
}

///////////////////////////////////////////////////////////////////////////////
// Humidity ratio given relative humidity
// ASHRAE Fundamentals (2005) ch. 6 eqn. 38
// ASHRAE Fundamentals (2009) ch. 1 eqn. 38
//
getHumRatioFromRelHum = function(args) {  //tdb,fi,p

	var vapPres = getVapPresFromRelHum({tdb:args.tdb, fi:args.fi});
	return getHumRatioFromVapPres({pv:vapPres, p:args.p});
}



///////////////////////////////////////////////////////////////////////////////
// Relative humidity given humidity ratio
// ASHRAE Fundamentals (2005) ch. 6
// ASHRAE Fundamentals (2009) ch. 1
//
getRelHumFromHumRatio  = function(args) { //t_c, p,w

  var pv = getVapPresFromHumRatio({w:args.w, p:args.p});
  return getRelHumFromVapPres({pv:pv, t_c:args.t_c});
}

///////////////////////////////////////////////////////////////////////////////
// Humidity ratio given dew point temperature and pressure.
// ASHRAE Fundamentals (2005) ch. 6 eqn. 22
// ASHRAE Fundamentals (2009) ch. 1 eqn. 22
//
getHumRatioFromTDewPoint = function(args) { 
  var vapPres = getSatVapPres(args.t_c);
  return getHumRatioFromVapPres({pv:vapPres, p:args.p});
}

///////////////////////////////////////////////////////////////////////////////
// Dew point temperature given dry bulb temperature, humidity ratio, and pressure
// ASHRAE Fundamentals (2005) ch. 6
// ASHRAE Fundamentals (2009) ch. 1
//
getTDewPointFromHumRatio = function(args) { //tdb,p,w


  var vapPres = getVapPresFromHumRatio({w:args.w, p:args.p});
  return getTDewPointFromVapPres({t_c:args.t_c, pv:vapPres});
}
	   
//*****************************************************************************
//       Conversions between humidity ratio and vapor pressure
//*****************************************************************************

///////////////////////////////////////////////////////////////////////////////
// Humidity ratio given water vapor pressure and atmospheric pressure
// ASHRAE Fundamentals (2005) ch. 6 eqn. 22
// ASHRAE Fundamentals (2009) ch. 1 eqn. 22
//

getHumRatioFromVapPres = function (args) {
return 0.621945*args.pv/(args.p-args.pv);
}

///////////////////////////////////////////////////////////////////////////////
// Vapor pressure given humidity ratio and pressure
// ASHRAE Fundamentals (2005) ch. 6 eqn. 22
// ASHRAE Fundamentals (2009) ch. 1 eqn. 22
//

getVapPresFromHumRatio = function(args) {
return args.p*args.w/(0.621945 +args.w);
}


//*****************************************************************************
//                             Dry Air Calculations
//*****************************************************************************

///////////////////////////////////////////////////////////////////////////////
// Dry air enthalpy given dry bulb temperature.
// ASHRAE Fundamentals (2005) ch. 6 eqn. 30
// ASHRAE Fundamentals (2009) ch. 1 eqn. 30
//
getDryAirEnthalpy = function(t_c) {
return 1.006*t_c*1000;  
}

///////////////////////////////////////////////////////////////////////////////
// Dry air density given dry bulb temperature and pressure.
// ASHRAE Fundamentals (2005) ch. 6 eqn. 28
// ASHRAE Fundamentals (2009) ch. 1 eqn. 28
//

getDryAirDensity = function(args) {
return (args.p/1000)*0.028966/(8.314472*CTOK(args.t_c));
}

///////////////////////////////////////////////////////////////////////////////
// Dry air volume given dry bulb temperature and pressure.
// ASHRAE Fundamentals (2005) ch. 6 eqn. 28
// ASHRAE Fundamentals (2009) ch. 1 eqn. 28
//

getDryAirVolume = function(args) {
return 8.314472*CTOK(args.t_c)/((args.p/1000)*0.028966);
}


//*****************************************************************************
//                       Saturated Air Calculations
//*****************************************************************************

///////////////////////////////////////////////////////////////////////////////
// Saturation vapor pressure as a function of temperature
// ASHRAE Fundamentals (2005) ch. 6 eqn. 5, 6
// ASHRAE Fundamentals (2009) ch. 1 eqn. 5, 6
// pws = saturation pressure, Pa

ctok = function(t_c) {return (t_c*1+273.15)}

getSatVapPres = function(t_c) {

   var t_k = ctok(t_c);
   if (t_c >= -100 && t_c <= 0) {
		var lnPws = (-5.6745359E+03/t_k + 6.3925247 - 9.677843E-03*t_k + 6.2215701E-07*t_k*t_k + 2.0747825E-09*Math.pow(t_k, 3) - 9.484024E-13*Math.pow(t_k, 4) + 4.1635019*Math.log(t_k)) 
		}
	
   else if (t_c <= 200 && t_c >= 0) {
		var lnPws = -5.8002206E+03/t_k + 1.3914993 - 4.8640239E-02*t_k + 4.1764768E-05*t_k*t_k - 1.4452093E-08*Math.pow(t_k, 3) + 6.5459673*Math.log(t_k);
		}
	return(Math.exp(lnPws));
	
}

///////////////////////////////////////////////////////////////////////////////
// Humidity ratio of saturated air given dry bulb temperature and pressure.
// ASHRAE Fundamentals (2005) ch. 6 eqn. 23
// ASHRAE Fundamentals (2009) ch. 1 eqn. 23
//
getSatHumRatio = function(args)//t_c,p 
{
return (0.621945*getSatVapPres(args.t_c)/(args.p-getSatVapPres(args.t_c)));
}

///////////////////////////////////////////////////////////////////////////////
// Saturated air enthalpy given dry bulb temperature and pressure
// ASHRAE Fundamentals (2005) ch. 6 eqn. 32
//

GetSatAirEnthalpy = function(args) {

return getMoistAirEnthalpy({t_c:args.t_c, pws:getSatHumRatio(args)});
}

//*****************************************************************************
//                       Moist Air Calculations
//*****************************************************************************

///////////////////////////////////////////////////////////////////////////////
// Vapor pressure deficit in Pa given humidity ratio, dry bulb temperature, and
// pressure.
// See Oke (1987) eqn. 2.13a
//

getVPD = function(args) {
return getSatVapPres(args.t_c)*(1-getRelHumFromHumRatio(args)); 
}

///////////////////////////////////////////////////////////////////////////////
// ASHRAE Fundamentals (2005) ch. 6 eqn. 12
// ASHRAE Fundamentals (2009) ch. 1 eqn. 12
//

getDegreeOfSaturation = function(args) {
return args.w/getSatHumRatio({t_c:args.t_c, p:args.p});
}

///////////////////////////////////////////////////////////////////////////////
// Moist air enthalpy given dry bulb temperature and humidity ratio
// ASHRAE Fundamentals (2005) ch. 6 eqn. 32
// ASHRAE Fundamentals (2009) ch. 1 eqn. 32
//
getMoistAirEnthalpy = function(args) {

return (1.006*args.t_c + args.w*(2501. + 1.86*args.t_c))*1000;

}

///////////////////////////////////////////////////////////////////////////////
// Moist air volume given dry bulb temperature, humidity ratio, and pressure.
// ASHRAE Fundamentals (2005) ch. 6 eqn. 28
// ASHRAE Fundamentals (2009) ch. 1 eqn. 28
//

getMoistAirVolume = function(args) {

return 0.287042 *(ctok(args.t_c))*(1.+1.607858*args.w)/(args.p/1000);
}

///////////////////////////////////////////////////////////////////////////////
// Moist air density given humidity ratio, dry bulb temperature, and pressure
// ASHRAE Fundamentals (2005) ch. 6 6.8 eqn. 11
// ASHRAE Fundamentals (2009) ch. 1 1.8 eqn 11
//

getMoistAirDensity = function(args) {

 return (1+args.w)/getMoistAirVolume(args);
}

//*****************************************************************************
//                Functions to set all psychrometric values
//*****************************************************************************

calcPsychrometricsFromTWetBulb  = function(args) { //tdb, twb, p
  if (isNaN(args.tdb) || isNaN(args.twb) || isNaN(args.p)) {return {html:"<p style=color:red>Incorrect value</p>", fi:'',tdp:''}  }
  if (args.tdb>93 || args.tdb<-100) {return {html:"<p style=color:red>Dry bulb temperature is outside range [-100,93]C [-148;199]F</p>", fi:'',tdp:''}  }
  if (args.tdb*1<args.twb*1) {return {html:"<p style=color:red>Wet bulb temperature is above dry bulb temperature</p>", fi:'',tdp:''}  }
  if (args.twb<-100) {return {html:"<p style=color:red>Wet bulb temperature is outside range [-100,93]C [-148;199]F</p>", fi:'',tdb:''}  }
  var w = getHumRatioFromTWetBulb(args);
  var tdp = getTDewPointFromHumRatio({w:w,t_c:args.tdb,p:args.p});
  var fi = getRelHumFromHumRatio({t_c:args.tdb,w:w,p:args.p});
  var pv = getVapPresFromHumRatio({w:w,p:args.p});
  var ima = getMoistAirEnthalpy({t_c:args.tdb,w:w});
  var vma = getMoistAirVolume({t_c:args.tdb,w:w,p:args.p});
  var degSaturation = getDegreeOfSaturation({t_c:args.tdb,w:w,p:args.p});
  var satVapPres = getSatVapPres(args.tdb);
    if (w*1<=0 || pv*1<=0 ) { return {html:"<p style=color:red>Incorrect values</p>", fi:'',tdp:''}  }
  return {html:psi_calc_getHtml(w, vma, degSaturation, ima, pv,satVapPres), fi:(fi*100).toFixed(1),tdp:tdp}  ;
}

calcPsychrometricsFromTDewPoint = function(args) { //tdb, tdp, p
if (isNaN(args.tdb) || isNaN(args.tdp) || isNaN(args.p)) {return {html:"<p style=color:red>Incorrect value</p>", fi:'',twb:''}  }
if (args.tdb>93 || args.tdb<-100) {return {html:"<p style=color:red>Dry bulb temperature is outside range [-100,93]C [-148;199]F</p>", fi:'',twb:''}  }
  if (args.tdb*1<args.tdp*1) {return {html:"<p style=color:red>Dew point temperature is above dry bulb temperature</p>", fi:'',twb:''}  }
  if (args.tdp<-100) {return {html:"<p style=color:red>Dew point temperature is outside range [-100,93]C [-148;199]F</p>", fi:'',twb:''}  }
  var w = getHumRatioFromTDewPoint({t_c:args.tdp, p:args.p});
  var twb = getTWetBulbFromHumRatio({t_c:args.tdb, p:args.p, w:w});
  var fi = getRelHumFromHumRatio({t_c:args.tdb,w:w,p:args.p});
  var pv = getVapPresFromHumRatio({w:w,p:args.p});
  var ima = getMoistAirEnthalpy({t_c:args.tdb,w:w});
  var vma = getMoistAirVolume({t_c:args.tdb,w:w,p:args.p});
  var degSaturation = getDegreeOfSaturation({t_c:args.tdb,w:w,p:args.p});
  var satVapPres = getSatVapPres(args.tdb);
    if (w*1<=0 || pv*1<=0 ) { return {html:"<p style=color:red>Incorrect values</p>", fi:'',tdp:''}  }
  return {html:psi_calc_getHtml(w, vma, degSaturation, ima, pv,satVapPres), fi:(fi*100).toFixed(1),twb:twb}  ;
}

calcPsychrometricsFromRelHum = function(args){ //tdb, fi, p
if (isNaN(args.tdb) || isNaN(args.fi) || isNaN(args.p)) {return {html:"<p style=color:red>Incorrect value</p>", twb:'',tdp:''}  }
if (args.tdb>93 || args.tdb<-100) {return {html:"<p style=color:red>Dry bulb temperature is outside range [-100,93]C [-148;199]F</p>", twb:'',tdp:''}  }
  if (args.fi*1>100 || args.fi*1<=0) {return {html:"<p style=color:red>Relative humidity is outside range [0,100]</p>", twb:'',tdp:''}  }
  var w = getHumRatioFromRelHum({tdb:args.tdb, fi:args.fi/100, p:args.p});
  var twb = getTWetBulbFromHumRatio({t_c:args.tdb, p:args.p, w:w});
  var tdp = getTDewPointFromHumRatio({w:w,t_c:args.tdb,p:args.p});
  var pv = getVapPresFromHumRatio({w:w,p:args.p});
  var ima = getMoistAirEnthalpy({t_c:args.tdb,w:w});
  var vma = getMoistAirVolume({t_c:args.tdb,w:w,p:args.p});
  var degSaturation = getDegreeOfSaturation({t_c:args.tdb,w:w,p:args.p});
  var satVapPres = getSatVapPres(args.tdb);
  if (w*1<=0 || pv*1<=0 ) { return {html:"<p style=color:red>Incorrect values</p>", twb:'',tdp:''}  }
  return {html:psi_calc_getHtml(w, vma, degSaturation, ima, pv,satVapPres), twb:twb,tdp:tdp}  ;
  
}

psi_calc_getHtml = function (w, vma, degSaturation, ima, pv,satVapPres) {
if (document.getElementsByName('group1')[0].checked){
return "<table border=1 cellspacing=0 bordercolor=black style=background:ghostwhite;border-collapse:collapse;width:100%;table-layout:auto;><tr align=center><td><span class='tooltip'>HR</span></td><td>" + (w*1000).toFixed(2) +"</td><td>gH2O/kgAir </td></tr>" + "<tr align=center><td><span class='tooltip'>v</span></td><td>" + vma.toFixed(3) +"</td><td> m3/kg </td></tr>" + "<tr align=center><td><span class='tooltip'>MU</span></td><td> " + degSaturation.toFixed(3) +"</td><td></td></tr><tr align=center><td><span class='tooltip'>h</span></td><td> " + (ima/1000).toFixed(2) +"</td><td> kJ/kg </td></tr><tr align=center><td><span class='tooltip'>VP</span></td><td> " + pv.toFixed(2) + "</td><td>Pa </td></tr><tr align=center><td><span class='tooltip'>SVP</span></td><td> " + satVapPres.toFixed(2) + "</td><td>Pa </td></tr></table>"
}
else {
return "<table border=1 cellspacing=0 bordercolor=black style=background:ghostwhite;border-collapse:collapse;width:100%;table-layout:auto;><tr align=center><td><span class='tooltip'>HR</span></td><td>" + (w*1000*15.43/2.2).toFixed(2) +"</td><td>grainsH2O/lbAir </td></tr>" + "<tr align=center><td><span class='tooltip'>v</span></td><td>" + (vma*3.2808*3.2808*3.2808/2.2046).toFixed(3) +"</td><td> ft3/lb </td></tr>" + "<tr align=center><td><span class='tooltip'>MU</span></td><td> " + degSaturation.toFixed(3) +"</td><td></td></tr><tr align=center><td><span class='tooltip'>h</span></td><td> " + ((ima/1000)*0.9478/2.2046).toFixed(2) +"</td><td> BTU/lb </td></tr><tr align=center><td><span class='tooltip'>VP</span></td><td> " + (pv*0.0000098692326700).toFixed(2) + "</td><td>Atm </td></tr><tr align=center><td><span class='tooltip'>SVP</span></td><td> " + (satVapPres*0.0000098692326700).toFixed(2) + "</td><td>Atm </td></tr></table>"
}
}

pressureFromHeight = function(h) {
  var p = 101325*Math.exp(-h/8435.2);
  return p;
  }
  
heightFromPressure = function(p) {
 var h = -8435.2*Math.log(p/101325);
 return h;
 }
 


