function show_hide_calc(si_ip) { //панель калькулятора
 var p_si_initial = 101325;
 var tdb_si_initial = 20;
 var h_initial = 0; 
 var p_ip_initial = 29.9212;
 var tdb_ip_initial = 68;
  var fi_initial ='';
  var number_check;
 if(si_ip) { 
  if (document.getElementById("fi_check")) {number_check=1}
  if (document.getElementById("twb_check")) {number_check=2}
  if (document.getElementById("tdp_check")) {number_check=3}
  
 if (document.getElementsByName('group1')[0].checked) { p_si_initial =(document.getElementById("p").value*1000/0.2953).toFixed(0); 
  tdb_si_initial = (document.getElementById("tdb").value*1-32)*5/9;
  h_initial = heightFromPressure(p_si_initial).toFixed(0);
}
   else  {p_ip_initial = (document.getElementById("p").value/1000*0.2953).toFixed(4);
 tdb_ip_initial = (document.getElementById("tdb").value*9/5)+32;
 h_initial = ((heightFromPressure(document.getElementById("p").value))*3.28).toFixed(0);
 }
   if (document.getElementById("fi")){ fi_initial = document.getElementById("fi").value;}
   if (document.getElementById("fi_check")){ fi_initial = document.getElementById("fi_check").value;};
 
 var elem = document.getElementById("psi_calc");
elem.parentNode.removeChild(elem);

}
 if (!document.getElementById("psi_calc"))
 { if (document.getElementsByName('group1')[0].checked) {
 var textnode = "<p onClick='show_hide_calc ()' style='font-size:20;cursor:pointer'/>>></p><table border=1 cellspacing=0 bordercolor=black align=center style=border-collapse:collapse;table-layout:fixed width=200px><tr><td colspan='6'><p align=center style='font-weight:bold;' >Psychrometric Calculator</p></td></tr><tr align=center><td colspan='3' style='border-bottom-color:transparent'>Pressure, Pa</td><td colspan='3' style='border-bottom-color:transparent' >Altitude, m</td></tr><tr align=center><td colspan='3' style='padding-right:10px;border-top-color:transparent'><input id='p' type='text' size=6em value=" + p_si_initial + " onchange=javascript:document.getElementById('h').value=heightFromPressure(document.getElementById('p').value).toFixed(2);calc_psi_si.dryBulb()>   </td> <td colspan='3' style= 'padding-left:10px;border-top-color:transparent'  > <input id='h'  size=6em  type='text' value=" + h_initial+  " onchange=javascript:document.getElementById('p').value=pressureFromHeight(document.getElementById('h').value).toFixed(0);calc_psi_si.dryBulb()> </td> </tr><tr align=center style='border-top: 1px solid black'> <td colspan='6' style='border-bottom-color:transparent'> <span class='tooltip'>Tdb,</span> °C </td></tr><tr align=center style='border-top-color:transparent'><td colspan='6'> <input id='tdb' type='text' size=7em value=" + tdb_si_initial+ " onchange=calc_psi_si.dryBulb()> </td></tr><tr align=center> <td colspan='2' style='border-bottom-color:transparent'> <span class='tooltip'>φ,</span> % </td> <td colspan='2' style='border-bottom-color:transparent'><span class='tooltip'>Twb,</span> °C</td> <td colspan='2' style='border-bottom-color:transparent'> <span class='tooltip'>Tdp,</span> °C</td> </tr><tr align=center> <td colspan='2' style='border-top-color:transparent'> <div style='position:relative'><input id='fi' type='text' size=4em value='" + fi_initial+ "' onchange=switch_parametres('select_11');calc_psi_si.relHum()> <div id='select_11' class='select_1' style='position:absolute;'   onclick=switch_parametres('select_11')></div><div id='select_12' class='select_2' style='position:absolute;' > </div> </div></td> <td colspan='2' style='border-top-color:transparent'> <div style='position:relative'> <input id='twb' type='text' size=4em onchange=javascript:switch_parametres('select_21');calc_psi_si.wetBulb()><div id='select_21' class='select_1' style='position:absolute;'   onclick = switch_parametres('select_21')> </div><div id='select_22' class='select_2' style='position:absolute;' > </div></div> </td> <td colspan='2' style='border-top-color:transparent' > <div style='position:relative'> <input id='tdp' type='text' size=4em onchange=javascript:switch_parametres('select_31');calc_psi_si.dewPoint()> <div id='select_31' class='select_1' style='position:absolute;'   onclick=switch_parametres('select_31') > </div><div id='select_32' class='select_2' style='position:absolute;' > </div></div> </td> </tr><tr><td colspan='6' style='padding:0px;'><div id='psi_calc_result'></div> </td></tr></table>";
 }
 else 
 {
 var textnode = "<p onClick='show_hide_calc ()' style='font-size:20;cursor:pointer'/>>></p><table border=1 cellspacing=0 bordercolor=black align=center style=border-collapse:collapse;table-layout:fixed width=200px><tr><td colspan='6'><p align=center style='font-weight:bold;' >Psychrometric Calculator</p></td></tr><tr align=center><td colspan='3' style='border-bottom-color:transparent'>Pressure, in Hg</td><td colspan='3' style='border-bottom-color:transparent' >Altitude, ft</td></tr><tr align=center><td colspan='3' style='padding-right:10px;border-top-color:transparent'><input id='p' type='text' size=6em value=" + p_ip_initial + " onchange=javascript:document.getElementById('h').value=((heightFromPressure(document.getElementById('p').value*1000/0.2953))*3.28).toFixed(2);calc_psi_ip.dryBulb()>   </td> <td colspan='3' style= 'padding-left:10px;border-top-color:transparent'  > <input id='h'  size=6em  type='text' value=" + h_initial+  " onchange=javascript:document.getElementById('p').value=((pressureFromHeight(document.getElementById('h').value*1/3.28))/1000*0.2953).toFixed(4);calc_psi_ip.dryBulb()> </td> </tr><tr align=center style='border-top: 1px solid black'> <td colspan='6' style='border-bottom-color:transparent'> <span class='tooltip'>Tdb,</span> °F </td></tr><tr align=center style='border-top-color:transparent'><td colspan='6'> <input id='tdb' type='text' size=7em value=" + tdb_ip_initial+ " onchange=calc_psi_ip.dryBulb()> </td></tr><tr align=center> <td colspan='2' style='border-bottom-color:transparent'> <span class='tooltip'>φ,</span> % </td> <td colspan='2' style='border-bottom-color:transparent'><span class='tooltip'>Twb,</span> °F</td> <td colspan='2' style='border-bottom-color:transparent'> <span class='tooltip'>Tdp,</span> °F</td> </tr><tr align=center> <td colspan='2' style='border-top-color:transparent'> <div style='position:relative'><input id='fi' type='text' size=4em value='" + fi_initial+ "' onchange=switch_parametres('select_11');calc_psi_ip.relHum()> <div id='select_11' class='select_1' style='position:absolute;'   onclick=switch_parametres('select_11')></div><div id='select_12' class='select_2' style='position:absolute;' > </div> </div></td> <td colspan='2' style='border-top-color:transparent'> <div style='position:relative'> <input id='twb' type='text' size=4em onchange=javascript:switch_parametres('select_21');calc_psi_ip.wetBulb()><div id='select_21' class='select_1' style='position:absolute;'   onclick = switch_parametres('select_21')> </div><div id='select_22' class='select_2' style='position:absolute;' > </div></div> </td> <td colspan='2' style='border-top-color:transparent' > <div style='position:relative'> <input id='tdp' type='text' size=4em onchange=javascript:switch_parametres('select_31');calc_psi_ip.dewPoint()> <div id='select_31' class='select_1' style='position:absolute;'   onclick=switch_parametres('select_31') > </div><div id='select_32' class='select_2' style='position:absolute;' > </div></div> </td> </tr><tr><td colspan='6' style='padding:0px;'><div id='psi_calc_result'></div> </td></tr></table>";
 }
 
 
var elem = document.createElement('div');

elem.id = 'psi_calc';
elem.innerHTML = textnode;

document.getElementById('container').appendChild(elem);
handler();//всплывающие подсказки
 if(si_ip) { 
 previous_select=0;
   if (number_check==1) {switch_parametres('select_11')}
  if (number_check==2) {switch_parametres('select_21')}
  if (number_check==3) {switch_parametres('select_31')}
  
  if ( document.getElementById('fi')) {
  if (document.getElementById('fi').value!=''){
if (document.getElementsByName('group1')[0].checked){
  calc_psi_si.relHum();
  }
  else {
  calc_psi_ip.relHum();
  }
  }
  }
  
    if ( document.getElementById('fi_check') ) {
  if (document.getElementById('fi_check').value!=''){
if (document.getElementsByName('group1')[0].checked){
  calc_psi_si.relHum();
  }
  else {
  calc_psi_ip.relHum();
  }
  }
  }
  }
 document.getElementById("psi_calc_hide").style.display = 'none';
  document.getElementById("info").style.marginRight = '200px';
    document.getElementById("map_initial").style.marginRight = '200px';
 
 }
 else { 
 var elem = document.getElementById("psi_calc");
elem.parentNode.removeChild(elem);
 document.getElementById("psi_calc_hide").style.display = 'block';
 document.getElementById("info").style.marginRight = '55px';
 document.getElementById("map_initial").style.marginRight = '15px';
 }
 }


 
function switch_parametres (select){  //select 11,21,31 постановка одной галки из трёх
//снятие предыдущих галок 
if (previous_select!=0){
    var pattern = /_check/;
    document.getElementById((previous_select.substring(0,select.length-1))+'2').style.display='none';
	document.getElementById(previous_select).style.display='block';
	for (i in document.getElementById(previous_select).parentNode.childNodes){

   if (pattern.test(document.getElementById(previous_select).parentNode.childNodes[i].id)){
    document.getElementById(previous_select).parentNode.childNodes[i].id=document.getElementById(previous_select).parentNode.childNodes[i].id.replace(/_check/, '');
   }
   }
   }
   // постановка новых галок
	document.getElementById(select).style.display='none';
    document.getElementById((select.substring(0,select.length-1))+'2').style.display='block';
	for (i in document.getElementById(select).parentNode.childNodes){
   if (document.getElementById(select).parentNode.childNodes[i].id =='fi' || document.getElementById(select).parentNode.childNodes[i].id =='twb' || document.getElementById(select).parentNode.childNodes[i].id =='tdp') {
    document.getElementById(select).parentNode.childNodes[i].id = document.getElementById(select).parentNode.childNodes[i].id + '_check';
	previous_select = select;
   }
 }
 }
 
 var calc_psi_si=function  () { //загон значений в psychrometrics.js и выдача результата

 return {
 dryBulb:function () {
 if (document.getElementById("fi_check")) {this.relHum()}
 if (document.getElementById("twb_check")) {this.wetBulb()}
 if (document.getElementById("tdp_check")) {this.dewPoint()}
 },
  relHum:function () { if (document.getElementById("fi_check")) {
 document.getElementById("psi_calc_result").innerHTML=(calcPsychrometricsFromRelHum({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,fi:document.getElementById("fi_check").value})).html;
 var twb_si = (calcPsychrometricsFromRelHum({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,fi:document.getElementById("fi_check").value})).twb;
 var tdp_si = (calcPsychrometricsFromRelHum({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,fi:document.getElementById("fi_check").value})).tdp;
  if (twb_si!='' || tdp_si!=''){
document.getElementById("twb").value=twb_si.toFixed(1);
document.getElementById("tdp").value=tdp_si.toFixed(1);
}
else {
document.getElementById("twb").value='';
document.getElementById("tdp").value='';f
}
 }
 else { 
  document.getElementById("psi_calc_result").innerHTML=(calcPsychrometricsFromRelHum({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,fi:document.getElementById("fi").value})).html;
  
if (document.getElementById("twb_check")) 
 document.getElementById("twb_check").value=((calcPsychrometricsFromRelHum({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,fi:document.getElementById("fi").value})).twb).toFixed(1);
 else  document.getElementById("twb").value=((calcPsychrometricsFromRelHum({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,fi:document.getElementById("fi").value})).twb).toFixed(1);
  if (document.getElementById("tdp_check")) 
 document.getElementById("tdp_check").value=((calcPsychrometricsFromRelHum({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,fi:document.getElementById("fi").value})).tdp).toFixed(1);
 else  document.getElementById("tdp").value=((calcPsychrometricsFromRelHum({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,fi:document.getElementById("fi").value})).tdp).toFixed(1);
 }
 handler();
 },
 wetBulb:function () {
 document.getElementById("psi_calc_result").innerHTML=(calcPsychrometricsFromTWetBulb({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,twb:document.getElementById("twb_check").value})).html;
 fi_si = (calcPsychrometricsFromTWetBulb({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,twb:document.getElementById("twb_check").value})).fi;
 tdp_si = (calcPsychrometricsFromTWetBulb({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,twb:document.getElementById("twb_check").value})).tdp;
 if (fi_si!='' || tdp_si!=''){
 document.getElementById("fi").value=fi_si;
 document.getElementById("tdp").value=tdp_si.toFixed(1);
 }
 else {
  document.getElementById("fi").value='';
 document.getElementById("tdp").value='';
 }
 
 handler();
 },
 dewPoint:function () {
 document.getElementById("psi_calc_result").innerHTML=(calcPsychrometricsFromTDewPoint({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,tdp:document.getElementById("tdp_check").value})).html;
 var fi_si = (calcPsychrometricsFromTDewPoint({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,tdp:document.getElementById("tdp_check").value})).fi;
 var twb_si = (calcPsychrometricsFromTDewPoint({tdb:document.getElementById("tdb").value,p:document.getElementById("p").value,tdp:document.getElementById("tdp_check").value})).twb;
  if (fi_si!='' || twb_si!=''){
 document.getElementById("fi").value=fi_si;
 document.getElementById("twb").value=twb_si.toFixed(1);
 }
 else {
   document.getElementById("fi").value='';
 document.getElementById("twb").value='';
 }
  handler()
  }

 }
 }();
 
  var calc_psi_ip=function  () { //загон значений в psychrometrics.js и выдача результата

 return {
 dryBulb:function () {
 if (document.getElementById("fi_check")) {this.relHum()}
 if (document.getElementById("twb_check")) {this.wetBulb()}
 if (document.getElementById("tdp_check")) {this.dewPoint()}
 },
 
 
  relHum:function () { if (document.getElementById("fi_check")) {
 document.getElementById("psi_calc_result").innerHTML=(calcPsychrometricsFromRelHum({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,fi:document.getElementById("fi_check").value})).html;
 var twb_ip = (calcPsychrometricsFromRelHum({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,fi:document.getElementById("fi_check").value})).twb;
 var tdp_ip = (calcPsychrometricsFromRelHum({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,fi:document.getElementById("fi_check").value})).tdp;
 if (tdp_ip!='' || twb_ip!='') {
 document.getElementById("twb").value=(((twb_ip)*9/5)+32).toFixed(1);
 document.getElementById("tdp").value=(((tdp_ip)*9/5)+32).toFixed(1)
 }
 else { document.getElementById("twb").value = '';
  document.getElementById("tdp").value = '';
  }
 }
 else {
  document.getElementById("psi_calc_result").innerHTML=(calcPsychrometricsFromRelHum({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,fi:document.getElementById("fi").value})).html;

  var twb_ip = (calcPsychrometricsFromRelHum({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,fi:document.getElementById("fi").value})).twb;
  var tdp_ip = (calcPsychrometricsFromRelHum({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,fi:document.getElementById("fi").value})).tdp;
    if (document.getElementById("twb_check")) {
  if (twb_ip!='' || tdp_ip!=''){
 document.getElementById("twb_check").value=(((twb_ip)*9/5)+32).toFixed(1);
 document.getElementById("tdp").value=(((tdp_ip)*9/5)+32).toFixed(1); }
 else { 
  document.getElementById("twb_check").value = '';
  document.getElementById("tdp").value = ''
 }
 }
 else {
 if (twb_ip!='' || tdp_ip!='') {
 document.getElementById("twb").value=(((twb_ip)*9/5)+32).toFixed(1);
 document.getElementById("tdp_check").value=(((tdp_ip)*9/5)+32).toFixed(1)}
  else {
    document.getElementById("twb").value = '';
  document.getElementById("tdp_check").value = ''
  }
  }
  }
  handler();
 },
 wetBulb:function () {
 document.getElementById("psi_calc_result").innerHTML=(calcPsychrometricsFromTWetBulb({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,twb:(document.getElementById("twb_check").value*1-32)*5/9})).html;
 var fi_ip = (calcPsychrometricsFromTWetBulb({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,twb:(document.getElementById("twb_check").value*1-32)*5/9})).fi
 var tdp_ip = (calcPsychrometricsFromTWetBulb({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,twb:(document.getElementById("twb_check").value*1-32)*5/9})).tdp
 if (fi_ip!='' || tdp_ip!=''){
 document.getElementById("fi").value=fi_ip;
 document.getElementById("tdp").value=(((tdp_ip)*9/5)+32).toFixed(1);
 }
 else {
 document.getElementById("fi").value='';
 document.getElementById("tdp").value='';
 }
  handler();
 },
 dewPoint:function () {
 document.getElementById("psi_calc_result").innerHTML=(calcPsychrometricsFromTDewPoint({tdb:(document.getElementById("tdb").value-32)*5/9,p:document.getElementById("p").value*1000/0.2953,tdp:(document.getElementById("tdp_check").value-32)*5/9})).html;
  var fi_ip = (calcPsychrometricsFromTDewPoint({tdb:(document.getElementById("tdb").value*1-32)*5/9,p:document.getElementById("p").value*1000/0.2953,tdp:(document.getElementById("tdp_check").value*1-32)*5/9})).fi;
  var twb_ip = (calcPsychrometricsFromTDewPoint({tdb:(document.getElementById("tdb").value-32)*5/9,p:document.getElementById("p").value*1000/0.2953,tdp:(document.getElementById("tdp_check").value*1-32)*5/9})).twb;
   if (fi_ip!='' || twb_ip!='') {
 document.getElementById("fi").value=fi_ip;
 document.getElementById("twb").value=((twb_ip*9/5)+32).toFixed(1);
 }
 else {
  document.getElementById("fi").value='';
 document.getElementById("twb").value='';
 }
  handler();
  }
 }
 }();
 
 dd = function (element) {
 if (document.getElementsByClassName('show_picked_line_1')[0]) {document.getElementsByClassName('show_picked_line_1')[0].style.display = 'none';document.getElementsByClassName('show_picked_line_1')[0].className = 'show_picked_line';}
if(element.firstChild.className == 'show_picked_line')
element.firstChild.style.display='block';
}


 dd_1 = function (element) {
 if (element.firstChild.style.display=='block'){
 element.firstChild.className = 'show_picked_line_1';
 document.getElementById('container').onmousedown =  function () {if (document.getElementsByClassName('show_picked_line_1')[0]){document.getElementsByClassName('show_picked_line_1')[0].style.display = 'none';document.getElementsByClassName('show_picked_line_1')[0].className = 'show_picked_line';}};
}
}