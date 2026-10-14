     var perline = 9;
     var divSet = false;
     var curId;
     var colorLevels = Array('0', '3', '6', '9', 'C', 'F');
     var colorArray = Array();
     var ie = false;
     var nocolor = 'none';
	 if (document.all) { ie = true; nocolor = ''; }

     function addColor(r, g, b) {
     	var red = colorLevels[r];
     	var green = colorLevels[g];
     	var blue = colorLevels[b];
     	addColorValue(red, green, blue);
     }

     function addColorValue(r, g, b) {
     	colorArray[colorArray.length] = '#' + r + r + g + g + b + b;
     }
     
     function setColor(color) {
     	var link = byid('s'+curId);
     	var field = byid(curId );
     	var picker = byid('colorpicker');
     	field.value = color;
     	if (color == '') {
	     	link.style.background = nocolor;
	     	link.style.color = nocolor;
	     	color = nocolor;
     	} else {
	     	link.style.background = color;
	     	link.style.color = color;
	    }
     	picker.style.display = 'none';
	    eval(byid(curId ).title);
     }
        
     function setDiv() {     
     	if (!document.createElement) { return; }
        var elemDiv = document.createElement('div');
        if (typeof(elemDiv.innerHTML) != 'string') { return; }
        genColors();
        elemDiv.id = 'colorpicker';
	    elemDiv.style.position = 'absolute';
        elemDiv.style.display = 'none';
        elemDiv.style.border = '#000000 1px solid';
        elemDiv.style.background = '#FFFFFF';
        elemDiv.innerHTML =  getColorTable() +'';
        document.body.appendChild(elemDiv);
        divSet = true;
     }
     
     function pickColor(id) {
     	if (!divSet) { setDiv(); }
     	var picker = byid('colorpicker');     	
		if (id == curId && picker.style.display == 'block') {
			picker.style.display = 'none';
			return;
		}
     	curId = id;
     	var thelink = byid('s'+id);
     	picker.style.top = (getAbsoluteOffsetTop(thelink) + 20)+'px';
     	picker.style.left = (getAbsoluteOffsetLeft(thelink))+'px';     
	picker.style.display = 'block';
     }
     
     function genColors() {
        addColorValue('0','0','0');
        addColorValue('3','3','3');
        addColorValue('6','6','6');
        addColorValue('8','8','8');
        addColorValue('9','9','9');                
        addColorValue('A','A','A');
        addColorValue('C','C','C');
        addColorValue('E','E','E');
        addColorValue('F','F','F');                                
			
        for (a = 1; a < colorLevels.length; a++)
			addColor(0,0,a);
        for (a = 1; a < colorLevels.length - 1; a++)
			addColor(a,a,5);

        for (a = 1; a < colorLevels.length; a++)
			addColor(0,a,0);
        for (a = 1; a < colorLevels.length - 1; a++)
			addColor(a,5,a);
			
        for (a = 1; a < colorLevels.length; a++)
			addColor(a,0,0);
        for (a = 1; a < colorLevels.length - 1; a++)
			addColor(5,a,a);
			
			
        for (a = 1; a < colorLevels.length; a++)
			addColor(a,a,0);
        for (a = 1; a < colorLevels.length - 1; a++)
			addColor(5,5,a);
			
        for (a = 1; a < colorLevels.length; a++)
			addColor(0,a,a);
        for (a = 1; a < colorLevels.length - 1; a++)
			addColor(a,5,5);

        for (a = 1; a < colorLevels.length; a++)
			addColor(a,0,a);			
        for (a = 1; a < colorLevels.length - 1; a++)
			addColor(5,a,5);
			
       	return colorArray;
     }
     function getColorTable() {
         var colors = colorArray;
      	 var tableCode = '';
         tableCode += '<table class="colorpicker" summary=""><tbody>';
         for (i = 0; i < colors.length; i++) {
              if (i % perline == 0) { tableCode += '<tr>'; }
              tableCode += '<td  onclick="setColor(\''+colors[i]+'\');" style="background-color:'+colors[i]+'">';
		tableCode += '&#160;</td>';
/*
              	  + colors[i] + '; background: ' + colors[i] + ';font-size: 10px;" title="' 
              	  + colors[i] + '" href="javascript:setColor(\'' + colors[i] + '\');">&#160;</a></td>';
*/
              if (i % perline == perline - 1) { tableCode += '</tr>'; }
         }
         if (i % perline != 0) { tableCode += '</tr>'; }
         tableCode += '</tbody></table>';
      	 return tableCode;
     }
     function relateColor(id, color) {
     	var link = byid('s'+id);
     	if (color == '') {
	     	link.style.background = nocolor;
	     	link.style.color = nocolor;
	     	color = nocolor;
     	} else {
	     	link.style.background = color;
	     	link.style.color = color;
	    }
	    eval(g+byid(id).title);
     }
     function getAbsoluteOffsetTop(obj) {
     	var top = obj.offsetTop;
     	var parent = obj.offsetParent;
     	while (parent != document.body) {
     		top += parent.offsetTop;
     		parent = parent.offsetParent;
     	}
     	return top;
     }
     
     function getAbsoluteOffsetLeft(obj) {
     	var left = obj.offsetLeft;
     	var parent = obj.offsetParent;
     	while (parent != document.body) {
     		left += parent.offsetLeft;
     		parent = parent.offsetParent;
     	}
     	return left;
     }


var weekend = [0,6];
var weekendColor = "#e0e0e0";
var fontface = "Verdana";
var fontsize = 8;			// in "pt" units; used with "font-size" style element

var gNow = new Date();
var ggWinContent;
var ggPosX = -1;
var ggPosY = -1;

Calendar.Months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(p_item, p_month, p_year, p_format) {
	if ((p_month == null) && (p_year == null))	return;

	if (p_month == null) {
		this.gMonthName = null;
		this.gMonth = null;
		this.gYearly = true;
	} else {
		this.gMonthName = Calendar.get_month(p_month);
		this.gMonth = new Number(p_month);
		this.gYearly = false;
	}

	this.gYear = p_year;
	this.gFormat = p_format;
	this.gBGColor = "white";
	this.gFGColor = "black";
	this.gTextColor = "black";
	this.gHeaderColor = "black";
	this.gReturnItem = p_item;
}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;

function Calendar_get_month(monthNo) {
	return Calendar.Months[monthNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) {
	/* 
	Check for leap year ..
	1.Years evenly divisible by four are normally leap years, except for... 
	2.Years also evenly divisible by 100 are not leap years, except for... 
	3.Years also evenly divisible by 400 are leap years. 
	*/
	if ((p_year % 4) == 0) {
		if ((p_year % 100) == 0 && (p_year % 400) != 0)
			return Calendar.DOMonth[monthNo];
	
		return Calendar.lDOMonth[monthNo];
	} else
		return Calendar.DOMonth[monthNo];
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();
	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}
	
	return ret_arr;
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();
	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}
	
	return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function() {
	var vCode = "";
	var vHeader_Code = "";
	var vData_Code = "";
	
	// Begin Table Drawing code here..
	vCode += ("<div align=center><TABLE BORDER=1 BGCOLOR=\"" + this.gBGColor + "\" style='font-size:" + fontsize + "pt;'>");
	
	vHeader_Code = this.cal_header();
	vData_Code = this.cal_data();
	vCode += (vHeader_Code + vData_Code);
	
	vCode += "</TABLE></div>";
	
	return vCode;
}

Calendar.prototype.show = function() {
	var vCode = "";

	// build content into global var ggWinContent
	ggWinContent += ("<FONT FACE='" + fontface + "' ><B>");
	ggWinContent += (this.gMonthName + " " + this.gYear);
	ggWinContent += "</B><BR>";
	
	// Show navigation buttons
	var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
	var prevMM = prevMMYYYY[0];
	var prevYYYY = prevMMYYYY[1];

	var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
	var nextMM = nextMMYYYY[0];
	var nextYYYY = nextMMYYYY[1];
	
	ggWinContent += ("<TABLE WIDTH='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0' style='font-size:" + fontsize + "pt;'><TR><TD ALIGN=center>");
	ggWinContent += ("<A HREF=\"javascript:void(0);\" " +
		"onMouseOver=\"window.status='Go back one year'; return true;\" " +
		"onMouseOut=\"window.status=''; return true;\" " +
		"onClick=\"Build(" + 
		"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "'" +
		");" +
		"\">&lt;&lt;Year<\/A></TD><TD ALIGN=center>");
	ggWinContent += ("<A HREF=\"javascript:void(0);\" " +
		"onMouseOver=\"window.status='Go back one month'; return true;\" " +
		"onMouseOut=\"window.status=''; return true;\" " +
		"onClick=\"Build(" + 
		"'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\">&lt;Mon<\/A></TD><TD ALIGN=center>");
	ggWinContent += "       </TD><TD ALIGN=center>";
	ggWinContent += ("<A HREF=\"javascript:void(0);\" " +
		"onMouseOver=\"window.status='Go forward one month'; return true;\" " +
		"onMouseOut=\"window.status=''; return true;\" " +
		"onClick=\"Build(" + 
		"'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\">Mon&gt;<\/A></TD><TD ALIGN=center>");
	ggWinContent += ("<A HREF=\"javascript:void(0);\" " +
		"onMouseOver=\"window.status='Go forward one year'; return true;\" " +
		"onMouseOut=\"window.status=''; return true;\" " +
		"onClick=\"Build(" + 
		"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "'" +
		");" +
		"\">Year&gt;&gt;<\/A></TD></TR></TABLE><BR>");

	// Get the complete calendar code for the month, and add it to the
	//	content var
	vCode = this.getMonthlyCalendarCode();
	ggWinContent += vCode;
}

Calendar.prototype.showY = function() {
	var vCode = "";
	var i;

	ggWinContent += "<FONT FACE='" + fontface + "' ><B>"
	ggWinContent += ("Year : " + this.gYear);
	ggWinContent += "</B><BR>";

	// Show navigation buttons
	var prevYYYY = parseInt(this.gYear) - 1;
	var nextYYYY = parseInt(this.gYear) + 1;
	
	ggWinContent += ("<TABLE WIDTH='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0' style='font-size:" + fontsize + "pt;'><TR><TD ALIGN=center>");
	ggWinContent += ("[<A HREF=\"javascript:void(0);\" " +
		"onMouseOver=\"window.status='Go back one year'; return true;\" " +
		"onMouseOut=\"window.status=''; return true;\" " +
		"onClick=\"Build(" + 
		"'" + this.gReturnItem + "', null, '" + prevYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\"><<Year<\/A>]</TD><TD ALIGN=center>");
	ggWinContent += "       </TD><TD ALIGN=center>";
	ggWinContent += ("[<A HREF=\"javascript:void(0);\" " +
		"onMouseOver=\"window.status='Go forward one year'; return true;\" " +
		"onMouseOut=\"window.status=''; return true;\" " +
		"onClick=\"Build(" + 
		"'" + this.gReturnItem + "', null, '" + nextYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\">Year>><\/A>]</TD></TR></TABLE><BR>");

	// Get the complete calendar code for each month.
	// start a table and first row in the table
	ggWinContent += ("<TABLE WIDTH='100%' BORDER=0 CELLSPACING=0 CELLPADDING=5 style='font-size:" + fontsize + "pt;'><TR>");
	var j;
	for (i=0; i<12; i++) {
		// start the table cell
		ggWinContent += "<TD ALIGN='center' VALIGN='top'>";
		this.gMonth = i;
		this.gMonthName = Calendar.get_month(this.gMonth);
		vCode = this.getMonthlyCalendarCode();
		ggWinContent += (this.gMonthName + "/" + this.gYear + "<BR>");
		ggWinContent += vCode;
		ggWinContent += "</TD>";
		if (i == 3 || i == 7) {
			ggWinContent += "</TR><TR>";
			}

	}

	ggWinContent += "</TR></TABLE></font><BR>";
}

Calendar.prototype.cal_header = function() {
	var vCode = "";
	
	vCode = vCode + "<TR>";
	vCode = vCode + "<TD WIDTH='14%'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Sun</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Mon</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Tue</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Wed</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Thu</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Fri</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='16%'><FONT FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Sat</B></FONT></TD>";
	vCode = vCode + "</TR>";
	
	return vCode;
}

Calendar.prototype.cal_data = function() {
	var vDate = new Date();
	vDate.setDate(1);
	vDate.setMonth(this.gMonth);
	vDate.setFullYear(this.gYear);

	var vFirstDay=vDate.getDay();
	var vDay=1;
	var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
	var vOnLastDay=0;
	var vCode = "";

	/*
	Get day for the 1st of the requested month/year..
	Place as many blank cells before the 1st day of the month as necessary. 
	*/
	vCode = vCode + "<TR>";
	for (i=0; i<vFirstDay; i++) {
		vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(i) + "><FONT FACE='" + fontface + "'> </FONT></TD>";
	}

	// Write rest of the 1st week
	for (j=vFirstDay; j<7; j++) {
		vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j) + "><FONT FACE='" + fontface + "'>" + 
			"<A HREF='javascript:void(0);' " + 
				"onMouseOver=\"window.status='set date to " + this.format_data(vDay) + "'; return true;\" " +
				"onMouseOut=\"window.status=' '; return true;\" " +
				"onClick=\"document." + this.gReturnItem + ".value='" + 
				this.format_data(vDay) + 
				"';ggPosX=-1;ggPosY=-1;nd();nd();\">" + 
				this.format_day(vDay) + 
			"</A>" + 
			"</FONT></TD>";
		vDay=vDay + 1;
	}
	vCode = vCode + "</TR>";

	// Write the rest of the weeks
	for (k=2; k<7; k++) {
		vCode = vCode + "<TR>";

		for (j=0; j<7; j++) {
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j) + "><FONT FACE='" + fontface + "'>" + 
				"<a href='javascript:void(0);' " +
					"onmouseover=\"window.status='set date to " + this.format_data(vDay) + "'; return true;\" " +
					"onmouseout=\"window.status=' '; return true;\" " +
					"onclick=\"document." + this.gReturnItem + ".value='" + 
					this.format_data(vDay) + 
					"';window.scroll(0,ggPosY);ggPosX=-1;ggPosY=-1;nd();nd();\">" + 
				this.format_day(vDay) + 
				"</A>" + 
				"</FONT></TD>";
			vDay=vDay + 1;

			if (vDay > vLastDay) {
				vOnLastDay = 1;
				break;
			}
		}

		if (j == 6)
			vCode = vCode + "</TR>";
		if (vOnLastDay == 1)
			break;
	}
	
	// Fill up the rest of last week with proper blanks, so that we get proper square blocks
	for (m=1; m<(7-j); m++) {
		if (this.gYearly)
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) + 
			"><FONT FACE='" + fontface + "' COLOR='gray'> </FONT></TD>";
		else
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) + 
			"><FONT FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>";
	}
	
	return vCode;
}

Calendar.prototype.format_day = function(vday) {
	var vNowDay = gNow.getDate();
	var vNowMonth = gNow.getMonth();
	var vNowYear = gNow.getFullYear();

	if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear)
		return ("<FONT COLOR=\"RED\"><B>" + vday + "</B></FONT>");
	else
		return (vday);
}

Calendar.prototype.write_weekend_string = function(vday) {
	var i;

	// Return special formatting for the weekend day.
	for (i=0; i<weekend.length; i++) {
		if (vday == weekend[i])
			return (" BGCOLOR=\"" + weekendColor + "\"");
	}
	
	return "";
}

Calendar.prototype.format_data = function(p_day) {
	var vData;
	var vMonth = 1 + this.gMonth;
	vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
	var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
	var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
	var vY4 = new String(this.gYear);
	var vY2 = new String(this.gYear.substr(2,2));
	var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;

	switch (this.gFormat) {
		case "MM\/DD\/YYYY" :
			vData = vMonth + "\/" + vDD + "\/" + vY4;
			break;
		case "MM\/DD\/YY" :
			vData = vMonth + "\/" + vDD + "\/" + vY2;
			break;
		case "MM-DD-YYYY" :
			vData = vMonth + "-" + vDD + "-" + vY4;
			break;
		case "YYYY-MM-DD" :
			vData = vY4 + "-" + vMonth + "-" + vDD;
			break;
		case "MM-DD-YY" :
			vData = vMonth + "-" + vDD + "-" + vY2;
			break;
		case "DD\/MON\/YYYY" :
			vData = vDD + "\/" + vMon + "\/" + vY4;
			break;
		case "DD\/MON\/YY" :
			vData = vDD + "\/" + vMon + "\/" + vY2;
			break;
		case "DD-MON-YYYY" :
			vData = vDD + "-" + vMon + "-" + vY4;
			break;
		case "DD-MON-YY" :
			vData = vDD + "-" + vMon + "-" + vY2;
			break;
		case "DD\/MONTH\/YYYY" :
			vData = vDD + "\/" + vFMon + "\/" + vY4;
			break;
		case "DD\/MONTH\/YY" :
			vData = vDD + "\/" + vFMon + "\/" + vY2;
			break;
		case "DD-MONTH-YYYY" :
			vData = vDD + "-" + vFMon + "-" + vY4;
			break;
		case "DD-MONTH-YY" :
			vData = vDD + "-" + vFMon + "-" + vY2;
			break;
		case "DD\/MM\/YYYY" :
			vData = vDD + "\/" + vMonth + "\/" + vY4;
			break;
		case "DD\/MM\/YY" :
			vData = vDD + "\/" + vMonth + "\/" + vY2;
			break;
		case "DD-MM-YYYY" :
			vData = vDD + "-" + vMonth + "-" + vY4;
			break;
		case "DD-MM-YY" :
			vData = vDD + "-" + vMonth + "-" + vY2;
			break;
		default :
			vData = vMonth + "\/" + vDD + "\/" + vY4;
	}

	return vData;
}

function Build(p_item, p_month, p_year, p_format) {
	gCal = new Calendar(p_item, p_month, p_year, p_format);

	// Customize your Calendar here..
	gCal.gBGColor="white";
	gCal.gLinkColor="black";
	gCal.gTextColor="black";
	gCal.gHeaderColor="darkgreen";

	// initialize the content string
	ggWinContent = "";

	// Choose appropriate show function
	if (gCal.gYearly) {
		// and, since the yearly calendar is so large, override the positioning and fontsize
		// warning: in IE6, it appears that "select" fields on the form will still show
		//	through the "over" div; Note: you can set these variables as part of the onClick
		//	javascript code before you call the show_yearly_calendar function
		if (ggPosX == -1) ggPosX = 10;
		if (ggPosY == -1) ggPosY = 10;
		if (fontsize == 8) fontsize = 6;
		// generate the calendar
		gCal.showY();
		}
	else {
		gCal.show();
		}

	// if this is the first calendar popup, use autopositioning with an offset
/*
	if (ggPosX == -1 && ggPosY == -1) {
		overlib(ggWinContent, AUTOSTATUSCAP, STICKY, CLOSECLICK, CSSSTYLE,
			TEXTSIZEUNIT, "pt", TEXTSIZE, 8, CAPTIONSIZEUNIT, "pt", CAPTIONSIZE, 8, CLOSESIZEUNIT, "pt", CLOSESIZE, 8,
			CAPTION, "Select a date", CENTER);
//			CAPTION, "Select a date", OFFSETX, 20, OFFSETY, -20);
		// save where the 'over' div ended up; we want to stay in the same place if the user
		//	clicks on one of the year or month navigation links
		if ( (ns4) || (ie4) ) {
		        ggPosX = parseInt(over.left);
		        ggPosY = parseInt(over.top);
			} else if (ns6) {
			ggPosX = parseInt(over.style.left);
			ggPosY = parseInt(over.style.top);
			}
		}
	else {
		// we have a saved X & Y position, so use those with the FIXX and FIXY options
		overlib(ggWinContent, AUTOSTATUSCAP, STICKY, CLOSECLICK, CSSSTYLE,
			TEXTSIZEUNIT, "pt", TEXTSIZE, 8, CAPTIONSIZEUNIT, "pt", CAPTIONSIZE, 8, CLOSESIZEUNIT, "pt", CLOSESIZE, 8,
			CAPTION, "Select a date", FIXX, ggPosX, FIXY, ggPosY);
		}
	window.scroll(ggPosX, ggPosY);
*/
}

function show_calendar() {
	/* 
		p_month : 0-11 for Jan-Dec; 12 for All Months.
		p_year	: 4-digit year
		p_format: Date format (mm/dd/yyyy, dd/mm/yy, ...)
		p_item	: Return Item.
	*/

	p_item = arguments[0];
	if (arguments[1] == null)
		p_month = new String(gNow.getMonth());
	else
		p_month = arguments[1];
	if (arguments[2] == "" || arguments[2] == null)
		p_year = new String(gNow.getFullYear().toString());
	else
		p_year = arguments[2];
	if (arguments[3] == null)
		p_format = "YYYY-MM-DD";
	else
		p_format = arguments[3];

	Build(p_item, p_month, p_year, p_format);
}
/*
Yearly Calendar Code Starts here
*/
function show_yearly_calendar() {
	// Load the defaults..
	//if (p_year == null || p_year == "")
	//	p_year = new String(gNow.getFullYear().toString());
	//if (p_format == null || p_format == "")
	//	p_format = "YYYY-MM-DD";

	p_item = arguments[0];
	if (arguments[1] == "" || arguments[1] == null)
		p_year = new String(gNow.getFullYear().toString());
	else
		p_year = arguments[1];
	if (arguments[2] == null)
		p_format = "YYYY-MM-DD";
	else
		p_format = arguments[2];

	Build(p_item, null, p_year, p_format);
}


function urlencode( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // %          note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
                             
    var histogram = {}, unicodeStr='', hexEscStr='';
    var ret = (str+'').toString();
    
    var replacer = function(search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };
    
    // The histogram is identical to the one in urldecode.
    histogram["'"]   = '%27';
    histogram['(']   = '%28';
    histogram[')']   = '%29';
    histogram['*']   = '%2A';
    histogram['~']   = '%7E';
    histogram['!']   = '%21';
    histogram['%20'] = '+';
    histogram['\u00DC'] = '%DC';
    histogram['\u00FC'] = '%FC';
    histogram['\u00C4'] = '%D4';
    histogram['\u00E4'] = '%E4';
    histogram['\u00D6'] = '%D6';
    histogram['\u00F6'] = '%F6';
    histogram['\u00DF'] = '%DF';
    histogram['\u20AC'] = '%80';
    histogram['\u0081'] = '%81';
    histogram['\u201A'] = '%82';
    histogram['\u0192'] = '%83';
    histogram['\u201E'] = '%84';
    histogram['\u2026'] = '%85';
    histogram['\u2020'] = '%86';
    histogram['\u2021'] = '%87';
    histogram['\u02C6'] = '%88';
    histogram['\u2030'] = '%89';
    histogram['\u0160'] = '%8A';
    histogram['\u2039'] = '%8B';
    histogram['\u0152'] = '%8C';
    histogram['\u008D'] = '%8D';
    histogram['\u017D'] = '%8E';
    histogram['\u008F'] = '%8F';
    histogram['\u0090'] = '%90';
    histogram['\u2018'] = '%91';
    histogram['\u2019'] = '%92';
    histogram['\u201C'] = '%93';
    histogram['\u201D'] = '%94';
    histogram['\u2022'] = '%95';
    histogram['\u2013'] = '%96';
    histogram['\u2014'] = '%97';
    histogram['\u02DC'] = '%98';
    histogram['\u2122'] = '%99';
    histogram['\u0161'] = '%9A';
    histogram['\u203A'] = '%9B';
    histogram['\u0153'] = '%9C';
    histogram['\u009D'] = '%9D';
    histogram['\u017E'] = '%9E';
    histogram['\u0178'] = '%9F';
    
    // Begin with encodeURIComponent, which most resembles PHP's encoding functions
    ret = encodeURIComponent(ret);
 
    for (unicodeStr in histogram) {
        hexEscStr = histogram[unicodeStr];
        ret = replacer(unicodeStr, hexEscStr, ret); // Custom replace. No regexing
    }
    
    // Uppercase for full PHP compatibility
    return ret.replace(/(\%([a-z0-9]{2}))/g, function(full, m1, m2) {
        return "%"+m2.toUpperCase();
    });
}
/*
* FastInit
* http://tetlaw.id.au/view/javascript/fastinit
* Andrew Tetlaw
* Version 1.4.1 (2007-03-15)
*/
var FastInit = {
	onload : function() {
		if (FastInit.done) { return; }
		FastInit.done = true;
		for(var x = 0, al = FastInit.f.length; x < al; x++) {
			FastInit.f[x]();
		}
	},
	addOnLoad : function() {
		var a = arguments;
		for(var x = 0, al = a.length; x < al; x++) {
			if(typeof a[x] === 'function') {
				if (FastInit.done ) {
					a[x]();
				} else {
					FastInit.f.push(a[x]);
				}
			}
		}
	},
	listen : function() {
		if (/WebKit|khtml/i.test(navigator.userAgent)) {
			FastInit.timer = setInterval(function() {
				if (/loaded|complete/.test(document.readyState)) {
					clearInterval(FastInit.timer);
					delete FastInit.timer;
					FastInit.onload();
				}}, 10);
		} else if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', FastInit.onload, false);
		} else if(!FastInit.iew32) {
			if(window.addEventListener) {
				window.addEventListener('load', FastInit.onload, false);
			} else if (window.attachEvent) {
				return window.attachEvent('onload', FastInit.onload);
			}
		}
	},
	f:[],done:false,timer:null,iew32:false
};
/*@cc_on @*/
/*@if (@_win32)
FastInit.iew32 = true;
document.write('<script id="__ie_onload" defer src="' + ((location.protocol == 'https:') ? '//0' : 'javascript:void(0)') + '"><\/script>');
document.getElementById('__ie_onload').onreadystatechange = function(){if (this.readyState == 'complete') { FastInit.onload(); }};
/*@end @*/
FastInit.listen();

     // var $j = jQuery.noConflict();
     
     /* Use jQuery via $j(...)
     $j(document).ready(function(){
       $j("div").hide();
     });
     
     // Use Prototype with $(...), etc.
     $('someid').hide();
     */
function gotourl(loc) {

	if (top.location != self.location)
	top.location.href=loc; // open all links in our main window - don't use the frame
	else
	document.location.href=loc;
}
function gotoASK(txt,loc) {
	if (confirm(txt)) {

	if (top.location != self.location)
	top.location.href=loc; // open all links in our main window - don't use the frame
	else
	document.location.href=loc;
	}
}
/**
 * Disable the given form (id)
 */
function disableForm(id) {
    var form = $(id);
    form['disable']();

}
/** Tab control */
function        hideDIV(id) {
var v=document.getElementById(id);
if (v)
document.getElementById(id).style.display='none';
}
function        showDIV(id) {
var v=document.getElementById(id);
if (v)
document.getElementById(id).style.display='block';
else alert(v);
}
function        showTab(baseid,id,maxid) {
var i;
        for(i=1;i<=maxid;i++) {
		$('#'+baseid+i).hide();
               // hideDIV(baseid+''+i);
        if ( document.getElementById(baseid+'h'+i) ) document.getElementById(baseid+'h'+i).className='';
        }
        // showDIV(baseid+''+id);
	$('#'+baseid+id).show();
        if ( document.getElementById(baseid+'h'+id)) document.getElementById(baseid+'h'+id).className='selected';
}
var Drag = {

	obj : null,

	init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
	{
		o.onmousedown	= Drag.start;

		o.hmode			= bSwapHorzRef ? false : true ;
		o.vmode			= bSwapVertRef ? false : true ;

		o.root = oRoot && oRoot != null ? oRoot : o ;

		if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
		if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
		if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
		if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

		o.minX	= typeof minX != 'undefined' ? minX : null;
		o.minY	= typeof minY != 'undefined' ? minY : null;
		o.maxX	= typeof maxX != 'undefined' ? maxX : null;
		o.maxY	= typeof maxY != 'undefined' ? maxY : null;

		o.xMapper = fXMapper ? fXMapper : null;
		o.yMapper = fYMapper ? fYMapper : null;

		o.root.onDragStart	= new Function();
		o.root.onDragEnd	= new Function();
		o.root.onDrag		= new Function();
	},

	start : function(e)
	{
		var o = Drag.obj = this;
		e = Drag.fixE(e);
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		o.root.onDragStart(x, y);

		o.lastMouseX	= e.clientX;
		o.lastMouseY	= e.clientY;

		if (o.hmode) {
			if (o.minX != null)	o.minMouseX	= e.clientX - x + o.minX;
			if (o.maxX != null)	o.maxMouseX	= o.minMouseX + o.maxX - o.minX;
		} else {
			if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
			if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
		}

		if (o.vmode) {
			if (o.minY != null)	o.minMouseY	= e.clientY - y + o.minY;
			if (o.maxY != null)	o.maxMouseY	= o.minMouseY + o.maxY - o.minY;
		} else {
			if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
			if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove	= Drag.drag;
		document.onmouseup		= Drag.end;

		return false;
	},

	drag : function(e)
	{
		e = Drag.fixE(e);
		var o = Drag.obj;

		var ey	= e.clientY;
		var ex	= e.clientX;
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		var nx, ny;

		if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
		if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
		if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
		if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

		nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
		ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

		if (o.xMapper)		nx = o.xMapper(y)
		else if (o.yMapper)	ny = o.yMapper(x)

		Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
		Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
		Drag.obj.lastMouseX	= ex;
		Drag.obj.lastMouseY	= ey;

		Drag.obj.root.onDrag(nx, ny);
		return false;
	},

	end : function()
	{
		document.onmousemove = null;
		document.onmouseup   = null;
		Drag.obj.root.onDragEnd(	parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
									parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
		Drag.obj = null;
	},

	fixE : function(e)
	{
		if (typeof e == 'undefined') e = window.event;
		if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
		if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
		return e;
	}
};
function toggleonoff(img,url,inputfield) {
	var val=byid(inputfield).value;
	if (val=='1') val='0'; else val='1';
	byid(inputfield).value=val;
	img.src=url+'?onoff='+val;
}
function checkAll(img,name) {
	// TODO
}

function sensor_type_change(me) {
	if (me.checked)
	 sensor_type_change_type(me.id);
   }	
function sensor_type_change_type(type) {
 
	if (typeof type == 'undefined') return;
	// alert(type);
	updateAccessPoint(type);
	$('.snaponly').hide();
	$('.nosnaponly').hide();
	if (type=="smond" || type=="system") {
		$('tr.nosnaponly').show();
			// $('#addr').show();
			// $('#pri').show();
	}
	else {
		$('tr.snaponly').show();
	}
}
function sensor_ap_rp_connect() {
    // browser test possibilities ...
    // navigator.appName
    // navigator.appVarsion
    // navigator.userAgent
    var conn_ap_row = byid("sensor_connect_ap");
    // var conn_rp_row = document.getElementById("sensor_connect_rp");

    var conn_use_ap = byid("connect_use_ap");
    // var conn_use_rp = document.getElementById("connect_use_rp");

    if(conn_use_ap && /Firefox/.test(navigator.userAgent)) {
        // Firefox uses 'table-row' display value
        conn_ap_row.style.display=conn_use_ap.checked ? "table-row" : "none";
      //   conn_rp_row.style.display=conn_use_rp.checked ? "table-row" : "none";
    }

    if(conn_ap_row.style && /MSIE\s[67]/.test(navigator.userAgent)) {
        // MSIE 6 or 7 use 'block' display value
        conn_ap_row.style.display=conn_use_ap.checked ? "block" : "none";
       //  conn_rp_row.style.display=conn_use_rp.checked ? "block" : "none";
    }
}

function updateSensorDetailPage_OLD() {
    // show or hide various config setting controls depending on sensor type
    var TYPE_DOOR=1;
    var TYPE_RH=6;
    var TYPE_4TO20=21;

    var doortyperow =$("#row_sens_doortype");
    var rhtempcompenrow = $("#row_sens_rhtempcompen");
    var rhtarow = $("#row_sens_rhta");
    // var prof420row = $("row_4to20_profile");

    var stype = document.getElementById("stype");
    updateProfiles(stype);
        doortyperow.hide();
        rhtempcompenrow.hide();
        rhtarow.hide();
	switch(stype.value) {
		case TYPE_DOOR:
			doortyperow.show(); break;
		case TYPE_RH: 
			rhtempcompenrow.show();
			rhtarow.show();
	}
	sensor_type_change_type($('[name=sensor_category]:checked').val());
	
}
function updateSensorDetailPage() {
	// FIXME sensor_type_change_type($('[name=sensor_category]:checked').val());
    // show or hide various config setting controls depending on sensor type
    var TYPE_DOOR=1;
    var TYPE_RH=6;
    var TYPE_4TO20=21;

    var stype=$('#stype').val();
    var doortyperow =$("#row_sens_doortype");
    var rhtempcompenrow = $("#row_sens_rhtempcompen");
    var rhtarow = $("#row_sens_rhta");
    doortyperow.hide();
    rhtempcompenrow.hide();
    rhtarow.hide();
    switch (parseInt(stype)) {
	
	case TYPE_RH:
		    rhtempcompenrow.show();
		    rhtarow.show();
	break;
	case TYPE_DOOR:
		doortyperow.show();
	break;
   }	
    var selectedtype = $("#temp_profile").val();
	// alert(stype+'/'+selectedtype);
    new Ajax_Updater('sel_profile', 'ajax/get_stype_profiles.php?stype='+stype+';sel='+selectedtype);
// 	updateProfiles(stype);
}

function updateChkLC(zone,id,ncp) {
    // new Ajax.Updater(id, 'ajax/get_last_checkpt.php?z='+zone+';ncp='+ncp);
    new Ajax_Updater(id, 'ajax/get_last_checkpt.php?z='+zone+';ncp=2'); // 2 = cp done
}
function updateProfiles2(stype) {
}
function updateProfiles(newstype) {
    // var nstype = document.getElementById("stype");
	if (newstype == null)  newstype= document.getElementById("stype");
	if (newstype == null) return;
    // var selectedtype = document.getElementById("temp_profile");
    var selectedtype = $("#temp_profile").val();
    new Ajax_Updater('sel_profile', 'ajax/get_stype_profiles.php?stype='+newstype.value+';sel='+selectedtype);
}
function updateAccessPoint(handler) {
    var selectedtype = document.getElementById("ap");
    new Ajax_Updater('sel_ap', 'ajax/get_sel_ap.php?sel='+selectedtype.value+';handler='+handler);
}
function updateContactsList() {
    var newzone = document.getElementById("owner");
    var selectedcontact = document.getElementById("contact");
    new Ajax_Updater('sel_contact', 'ajax/get_zone_users.php?zone='+newzone.value+';sel='+selectedcontact.value);
}
function updateContactsList2(val) {
    var newzone = document.getElementById("owner");
    var selectedcontact = document.getElementById("contact");
    new Ajax_Updater('sel_contact', 'ajax/get_zone_users.php?zone='+newzone.value+';sel='+val);
}
function catchEscape(e) {
	e=(window.event)? window.event:e;
	if (popupdiv != null && e.keyCode == 27) {
          popupdiv.hide();
          popupdiv.close();
          popupdiv=null;
	}
}

function updateAP(sid,obj) {

    var fname = obj.name;
    var value = obj.value;
    if ($(obj).is(':checkbox')){
	// This is the CURRENT situation, so:
	if ($(obj).attr('checked')=='checked') value=1; else value=0; 
	}

		comment=prompt('Enter reason ','no comment');
		if (comment == null) {
			// We have to UNDO the click (visually)
			var checkboxID = $(this).attr("ref");
			var checkbox = $('#' + checkboxID);
			if (checkbox.is(":checked")) {
			checkbox.removeAttr("checked");
			} else {
			checkbox.attr("checked", "true");
			}
			$(this).parent().children().toggleClass("checked");
	
			document.body.style.cursor = 'default';
			return true;
		}
	
    var url = "ajax/update_sensor_settings.php?aid=" + sid;
    url = url + ";fname=" + urlencode(fname);
    url = url + ";value=" + urlencode(value);
    url = url + ";comment=" + urlencode(comment)

	$.post(url,function(data) {
			appendInfo(data);
	} );
 return true;
}
function updateSensor(sid,obj) {
	var value=$(obj).attr('checked')?1:0;
	var en=$(obj).attr('checked')?'enable':'disable';
	var fname = $(obj).attr('name');
	var comment=prompt('Reason to '+en+'  this Sensor?','');
	if (comment == null) {
		 return false;
	}
    var url = "ajax/update_sensor_settings.php?sid=" + sid;
    url = url + ";fname=" + urlencode(fname);
    url = url + ";value=" + urlencode(value);
    url = url + ";comment=" + urlencode(comment)

	$.post(url,function(data) {
			appendInfo(data);
	} );
 return true;
}
function viewUser(userid) {
	pop_view_user(userid);
}
function	viewGraph(id,width,height) {
	pop_graph_edi(id);
	resetCountDown();
}


function openPhotoWindow(id,name,pwidth,pheight)
{
  pop_photo_id(id);return
}
function	printpage() {
	resetCountDown();
	var f = $('.noprint');
	for(var i=0; i<f.length; i++){
		f[i].style.display='none';
		f[i].style.visibilty='hidden';
	}
	var f = $('#footer');
	for(var i=0; i<f.length; i++){
		f[i].style.display='none';
		f[i].style.visibilty='hidden';
		f[i].style.height='0px';
	}
	var f = $('#head');
	for(var i=0; i<f.length; i++){
		f[i].style.visibilty='hidden';
		f[i].style.display='none';
		f[i].style.height='0px';
	}
	var f = $('#header');
	for(var i=0; i<f.length; i++){
		f[i].style.visibilty='hidden';
		f[i].style.display='none';
		f[i].style.height='0px';
	}
	var f = $('#counter');
	for(var i=0; i<f.length; i++){
		f[i].style.display='none';
		f[i].style.visibilty='hidden';
	}
	var f = $('#ajaxcontent');
	for(var i=0; i<f.length; i++){
		f[i].style.display='none';
		f[i].style.visibilty='hidden';
	}
	// Convert all tabs:
	   $('.ui-tabs-panel').show();
	window.print();	
	
	$('.ui-tabs-panel[aria-hidden=true]').hide();
	this.document.location=this.document.location;
	// for(var i=0; i<f.length; i++){
		// f[i].style.display='none';
	//	f[i].style.height='0px';
	// }
}
function	ajaxInfoUpdate(url,btn,extra) {
	$.post(url,function(data) {
			appendInfo(data);
	} );
    /*new Ajax.Request(url, {
        method: 'get',
        onSuccess: function(done) {
		appendInfo(done.responseText);	
		document.body.style.cursor = 'default';
        }
    }); */
   btn.disabled='disabled';
   btn.className='btn-disable2';
	
}
function	appendInfo(txt) {
	var info=$('#info');
	if (info.length>0) {
		// fin ul
		var lst=$('#info ul');
		if (lst.length >0) {
			// we have already our list
		}
		else {
			info.html('<ul></ul>');
		}
		lst=$('#info ul');
		//var infotxt='<li><span class="ICO_INFORMATION">'+(new Date()) +': '+txt+'</span></li>';
		var infotxt='<li><span class="ICO_INFORMATION">'+txt+'</span></li>';
		lst.append(infotxt);
		info.show();
	}
/*
	
	var info=byid('info');
	var children = info.getElementsByTagName('ul'); // HtmlCollection
	var par=info;
	infotxt='<li><span class="ICO_INFORMATION">'+(new Date()) +': '+txt+'</span></li>';
	if (children.length != 0) {
		par=children[0];
		infotxt=par.innerHTML+infotxt;
	} else  infotxt="<ul>"+infotxt+"</ul>";
	par.innerHTML=infotxt;
		
	par.style.display='block';
*/
}
function lppp(url,divid,title,width,height) {
	loadPagePartPopup(url,divid,title,width,height) ;
}
function evtDetail(eid,sid) {
	loadPagePartPopup("evtdetail_v2.php?eid="+eid+";sid="+sid+";embedded=1;popup=1",'body','Event Action',400);
}
function scrollToCenterOfElement(id){
  // Cache element and property lookups...

  var element = $(id);
  var height = element.measure('height');
  var top = element.cumulativeOffset().top;
  var scroll = document.viewport.getScrollOffsets();
  var dimensions = document.viewport.getDimensions();

  // Checks to see if the top offset plus the height of the element is greater
  // than the sum of the viewport height and vertical scroll offset, which means
  // that the element has yet to be fully scrolled in to view, or if the 
  // top offset is smaller than the vertical scroll offset, which means the element
  // has already been (at least partly) scrolled out of view..

  if ((top + height > dimensions.height + scroll.top) || (top < dimensions.height + scroll.top)) {

    // Scroll window to sum of top offset plus half the height of the element
    // minus half of the viewport height, thus centering the element vertically.
    window.scrollTo(0, top + (height / 2) - (dimensions.height / 2));

  }

}

// Form Validation

function Ajax_Updater(elem,myurl) {
	//$.ajax({ type: 'POST', url: myurl});
	$.post(myurl, function(data) {
		$('#'+elem).html(data);
	} );
}
function Ajax_Request(myurl) {
	$.ajax({ url: myurl});
}
function scrollIntoView(element, container) {
  var containerTop = $(container).scrollTop(); 
  var containerBottom = containerTop + $(container).height(); 
  var elemTop = element.offsetTop;
  var elemBottom = elemTop + $(element).height(); 
  if (elemTop < containerTop) {
    $(container).scrollTop(elemTop);
  } else if (elemBottom > containerBottom) {
    $(container).scrollTop(elemBottom - $(container).height());
  }
}
function	byid(id) {
	return document.getElementById(id);
}
    $(function (){
	$.extend($.ui.dialog.prototype.options.position, { collision: 'none' }); // fix for center
	jQuery.curCSS =jQuery.css; // fix because we use an OLD jquery... TODO
        $('a.popup').click(function() {
            var url = this.href;
	    var part= this.rel;
	    this.href='';
	    if(!(/\?/.test(url))) { url+="?"; } else url+=";"
	    resetCountDown(); // no refersh now
	    

            // show a spinner or something via css
        $('<div>').dialog({
            modal: true,
	    minHeight: 200,
	    maxWidth: 1024,
		position: 'center',
	    width: 'auto',
		height: 'auto',
            open: function () {
                $(this).load(url+'ajax'+part);
            },
            close: function(event, ui) {
                    $(this).remove();
                },
            title: 'Ajax Page',
	    position: {  my: "center", at: "center" }
        });

        return false;
    })
    });
// Arguments: number to round, number of decimal places
function roundNumber(num, decimals) {
	var newnumber = new Number(num+'').toFixed(parseInt(decimals));
	return parseFloat(newnumber); 
}


var last_tt=0;
function	hideTips() {
	var tt= $(last_tt).data('tooltip');
	if ( tt != null && typeof(tt) != 'undefined') tt.hide();
}
function addtipurl(id,url) {
	$(id).attr('title','');
	$(id).tooltip({ content: function(callback) {
		hideTips();
		last_tt=id;
		$.get(url, function(data) {
			callback(data);
		});
	}});
	// $('#'+id).tooltip({ content: "WTF!"});
}
function addtip(id,tip) {
	$(id).attr('title',tip);
	$(id).tooltip({ content: tip});
	// $('#'+id).tooltip({ content: "WTF!"});
}
function addtipOLD(id,tip) {
        var defaults = {
            xOffset: 10,
            yOffset: 35,
            useElement: ""
        };

        var options = defaults; // $.extend(defaults, options);
        var content;

            $(id).hover(function (e) {
                    var $tooltip = $("<p id='qtip'>" + tip + "</p>");
                    $("body").append($tooltip);

                    if ($(window).width() < (e.pageX + $tooltip.width() + options.xOffset+20)) { // +20 for css padding
                        $tooltip
                            .css("top", (e.pageY - options.yOffset) + "px")
                            .css("left", (e.pageX - $tooltip.outerWidth() - options.xOffset) + "px")
                            .show();
                    } else {
                        $tooltip
                            .css("top", (e.pageY - options.yOffset) + "px")
                            .css("left", (e.pageX + options.xOffset) + "px")
                            .show();
                    }
            },
            function () {
                $("#qtip").remove();
            });
            $(id).mousemove(function (e) {
                var $tooltip = $("#qtip");
                if ($(window).width() < (e.pageX + $tooltip.width() + options.xOffset)+20) {
                    $tooltip
                            .css("top", (e.pageY - options.yOffset) + "px")
                            .css("left", (e.pageX - $tooltip.outerWidth() - options.xOffset) + "px")
                            .show();
                } else {
                    $tooltip
                            .css("top", (e.pageY - options.yOffset) + "px")
                            .css("left", (e.pageX + options.xOffset) + "px")
                            .show();
                }
            });
}
function addtipsimple(sel,html){
	/* CONFIG */		
		xOffset = 10;
		yOffset = 15;		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result		
	/* END CONFIG */		
	$(sel).hover(function(e){											  
		this.t = html; // this.title;
		this.title = "";									  
		
		$("body").append("<p id='qtip'>"+ this.t +"</p>");
		$("#qtip").css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px")
			.show();		
		if (e.pageX > ($(window).width()/2) )  {
			$("#qtip").css('left',(e.PageX+xOffset-$('#qtip').width())+"px");
		}
    },
	function(){
		this.title = this.t;		
		$("#qtip").remove();
    });	
	$("a.qtip").mousemove(function(e){
		$("#qtip")
			.css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px");
	});			
};
jQuery.fn.elasticArea = function() {
  return this.each(function(){
    function resizeTextarea() {
      this.style.height = (this.scrollHeight/2+4) + 'px';
      this.style.height = (this.scrollHeight +4) + 'px';
    }
    $(this).keypress(resizeTextarea)
    .keydown(resizeTextarea)
    .keyup(resizeTextarea)
    .css('overflow','hidden');
    resizeTextarea.call(this);
  });
};

function markTable(cssclass){
 var last=''
 $('table tbody tr td.'+cssclass+' span').each(function(i){
 if ($(this).text() == last) $(this).css('color','gray');
 last=$(this).text();
 });
 }
/**
 * Allow only digits or dot as input
 */
function numeralsOnly(evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
       ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

/**
 * Image Popup
 */
function PreviewImage(uri) {

	$('body').append(
	'<div id="previewdialog" title="Preview" style="display: none;"><img id="previewimage" src=""/></div>'
	);
  //Get the HTML Elements
  imageDialog = $("#previewdialog");
  imageTag = $('#previewimage');
 
  //Split the URI so we can get the file name

  //Set the image src
  imageTag.attr('src', uri);
 
  //When the image has loaded, display the dialog
  imageTag.load(function(){

    imageDialog.dialog({
      modal: true,
      resizable: false,
      draggable: false,
      width: 'auto',
      title: uriParts[uriParts.length - 1],
                           close: function (event, ui) {
                                $('#previewdialog').remove();
                            }
    });
  });  
}
function beep( url ){
        $('#sound').remove();
        $('body').append(
        '<embed id="sound" src="/arms/css/beep.wav" hidden="true" autostart="true" loop="false" />'
        )
}
/**
 * Form validation
 */
function	doValidate(form) {
$(form).validate( {
        errorPlacement: function(error, element) {
		if ($(element).hasClass('cancel'))  {
				return; // no validate here
		}
		beep();
		$(element).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            return ;
        }
	}
);
}

if (!Date.now) {
    Date.now = function() { return Math.round(new Date().getTime()/1000); };
}
/*{{{ Scroll to top */
    (function() {

      var toTopHidden = true;
      var toTop = $('#toTop');
          toTop.hide();
      
      toTop.click(function(e) {
        e.preventDefault();
        $.scrollTo(0, 200) ; // , {easing: settings.easingType});
      });
      
      $(window).scroll(function() {
        var sd = $(this).scrollTop();
        if (sd > 200 && toTopHidden)
        {
          toTop.fadeIn(600);
	  toTop.show();
          toTopHidden = false;
		console.log("false");
        }
        else if(sd <= 200 && ! toTopHidden)
        {
          toTop.fadeOut(300);
	  toTop.hide();
          toTopHidden = true;
		console.log("true");
        }
      });   

    })();
/*}}}*/

/* $Id: arms2.0.js,v 3.0 2013/10/25 14:18:02 mlc Exp $ */
/* vim: set expandtab tabstop=4 shiftwidth=4 encoding=utf-8  autoindent smartindent: */
var usePrototype=false;
function addLoadEvent(func) {
       // Event_observe($(window), 'load', func);
       $(document).ready(func); // jquery
    /* var onloadBak=window.onload;
    if (typeof window.onload!='function') { window.onload=func; }
    else {
        window.onload=
            function() {
                onloadBak();
                func();
            }
    } */
} 
function getScreenWidth() {

    if (window.screen) {
        return(screen.width);
    } else {
        return(0);
    }
}
/** Ajax function */
function    showLoader() {
    //alert('aja start');
    $('ajaxmsg').style.display='block';
}
/** Ajax function */
function    hideLoader() {
    $('ajaxmsg').style.display='none';
}

/**
 * @return the screenwidth (or 0)
 */
function getScreenHeight() {
    if (window.screen) {
        return(screen.height);
    } else {
        return(0);
    }
}

function getAllSheets() {
    if( document.getElementsByTagName ) {
        var Lt = document.getElementsByTagName('link'),
            St = document.getElementsByTagName('style');
    }
    else if( document.styleSheets && document.all )
    {
        var Lt = document.all.tags('LINK'), St = document.all.tags('STYLE');
    }
    else
    {
        return [];
    }
    for( var x = 0, os = []; Lt[x]; x++ ) {
        var rel = Lt[x].rel ? Lt[x].rel : Lt[x].getAttribute ? Lt[x].getAttribute('rel') : '';
        if( typeof( rel ) == 'string' && rel.toLowerCase().indexOf('style') + 1 ) { os[os.length] = Lt[x]; }
    } for( var x = 0; St[x]; x++ ) { os[os.length] = St[x]; } return os;
}
function changeStyle() {
    for( var x = 0, ss = getAllSheets(); ss[x]; x++ ) {
        if( ss[x].title ) { ss[x].disabled = true; }
        for( var y = 0; y < arguments.length; y++ ) {
            if( ss[x].title == arguments[y] ) { ss[x].disabled = false; }
        }
    }
}
/**  */
function changecss(G,C,F)
{
    var A;
    if(document.all)
    {
        A="rules"
    }
    else
    {
        if(document.getElementById)
        {
            A="cssRules"
        }
    }
    var E=false;
    for(var B=0;B<document.styleSheets.length;B++)
    {
        try { for(var D=0;D<document.styleSheets[B][A].length;D++)
            {
                if(document.styleSheets[B][A][D].selectorText==G)
                {
                    // alert('OH');
                    if(document.styleSheets[B][A][D].style[C])
                    {
                        document.styleSheets[B][A][D].style[C]=F;
                        E=true;
                        break
                    }
                }
            }
        } catch(e) {}
        try { if(!E){
            if(document.styleSheets[B].insertRule){
                document.styleSheets[B].insertRule(G+" { "+C+": "+F+"; } ",document.styleSheets[B][A].length)
            }
            else{
                if(document.styleSheets[B].addRule){
                    document.styleSheets[B].addRule(G,C+": "+F+";")
                }
            }
        }
        } catch(e) {}
    }
}

function	scrollTop() {
    $('outer').scrollTop=0;
}
function	toggleDisplay(elem) {
    if ($(elem).style.display=='block' )
        $(elem).style.display='none';
    else
        $(elem).style.display='block';
}
function	toggleTop() {
    toggeDisplay('top');
}
var modified_element=false;
function	checkSave() {
}
function setModified() {
    modified_element=true;
}

// This code snipped will add even/odd class to all table rows with the classname alternate
function doStyleTR(trs) {
    for (var l=0; l<trs.length; l++) {
        var oc=tr[l].className;
        if (oc == 'odd' || oc == "even") oc=''; // reset 
        else oc=oc+' ';
        tr[l].className=oc+( (l%2)?'odd':'even');
    }
} 
function styleTables() {
    var tb=document.getElementsByTagName("table");
    for (var r=0; r<tb.length; r++) {
        if (tb[r].className=="alternate") {
        tr=tb[r].getElementsByTagName("tr");
        doStyleTR(tr);
            }
    }
}
var screenHeight = getScreenHeight();
var screenWidth = getScreenWidth();

    /* drag and drop for views */
    function    addDNDSensor(id) {
        new Draggable('sensor_'+id, {
                // revert: true,
                }
                );

    }
    function    addDNDNewSensor(id) {
        if ($('n_'+id)) {
            new Draggable('n_'+id, {
        revert: true
    }
    );
    } /* else alert(id+" not found "); */

}
var maxsen=1000
function    insertDropElement(element,par,extra) {
    if (parent.id == 'delete') {
        parent.src="http://192.168.0.96/img/openclipart-0.18-full/clipart/office/cestino_pieno_architetto_01.png";
        // element.display="none";
    }
    var i;
    var id=element.id
        var isnew=id.substr(0,2)=='n_' ;
    var alldivs=par.childNodes;
    /* alert ('top:'+element.offsetTop
       + " height"+element.style.height
       ); */
    var ibef=null;
    for (i=0;i<alldivs.length;i++) {
        //alert ('top:'+alldivs[i].offsetTop);
        if (alldivs[i].offsetTop > element.offsetTop) {

            ibef=alldivs[i];
            //  alldivs[i].style.backgroundColor='Blue';
            break;
        }
    }
    element.style.top=''
        element.style.left=''
        if (ibef != null) {
            par.insertBefore(element,ibef);
        }
        else
            par.appendChild(element);
    // now add the new location information
    // for simplicity we renumber all in this column
    if (isnew) {
        // alert('new Sensor');
        // add our unput field
        // var n1=createElement('INPUT');
        // n1.id='scol_'+maxsen;
        // element.appendChild(n1);
        // var n2=createElement('INPUT');
        // n2.id='sssrt_'+maxsen;
        // element.appendChild(n1);
        //element.id='sensor_'+maxsen
        maxsen=maxsen+1
            element.className='viewsensor'

    }
    if (parent.id == 'delete') 
        element.style.backgroundColor='#a58';
    else if (isnew)
        element.style.backgroundColor='#2a8';

    else element.style.backgroundColor='Orange';
    var sortnum=1
        var colid=par.id
        colid=colid.substr(4); // col_
    //       alert(colid);
    var alldivs=par.childNodes;
    for (i=0;i<alldivs.length;i++) {
        var elm=alldivs[i];
        if (elm.tagName=='DIV' || elm.tagName=='div') {

            var sid=elm.id
                nsid=sid.substr(2); // sensor_
            sid=sid.substr(7); // sensor_
            if (sid<1) {
                sid=nsid
                    // alert(sid+"!");
                    $('ncol_'+sid).value=colid
                    $('nsrt_'+sid).value=sortnum
            }
            else  {
                $('scol_'+sid).value=colid
                    $('ssrt_'+sid).value=sortnum
            }
            sortnum=sortnum+1
        }
    }
}

function    addDNDArea(id) {
    Droppables.add(id, {
hoverclass: 'hover',
greedy : false,
onDrop: function(element,par) {
insertDropElement(element,par);    
}
});
}
var countdown = 180;
var initialCountdown = 180;
var refreshURL = '';
function updatecounter(count)
{
    var o = $('#counter');
    if (o) {
            // called every second, so
            var sec=count % 60;
            var min=(count-sec)/60;
            var t=min+":";
            if (sec<10) t=t+"0";
            t=t+sec;
            if (min <1) { t='<em class="red">'+t+'</em>';
                if (sec < 30 && sec >10)
                wobble();
            }
            o.html(t); // =t;
    }
}
var countdown_disabled=false;
function    toggle_countdown() {
    countdown_disabled=!countdown_disabled;
    var o = $('#counter');
    if (countdown_disabled) {
    o.html("<em>No Refresh</em>");
            //o.addEventListener('click',toggle_countdown,false);
    }
    else {
        refresh();
    }
           wobble();
}
function refresh()
{
    if (countdown_disabled) {
    }
    else {
    countdown--;
    updatecounter(countdown);
    if (countdown <= 0) {

        countdown = initialCountdown;
        //window.location.href = ('/arms2/index.php?x=');
        // window.location.href = refreshURL;
        gotourl(refreshURL);
    }
        }
}
function     startCountDown(t,url ) {
     // console.log('startCountdown('+t+','+url+')');
     initialCountdown = t;
     countdown = t;
     refreshURL = url;
    setInterval('refresh()', 1000);
   //  $.every(1,'second', refresh);
    Event_observe($('#counter'),'click',toggle_countdown);

}
function     startCountDown2(t,url ) {
    var o = $('#counter');
    if (o) {
     if (o.addEventListener) {
            o.addEventListener('click',toggle_countdown,false);
        }
     initialCountdown = t;
     countdown = t;
     refreshURL = url;

    setInterval('refresh()', 1000);
    }
    
}
        var isAnimate=false;
function wobble(){
        if (isAnimate) return;
        isAnimate=true;
        var e='#counter';
        var old=$(e).top;
        $(e).animate({top: '15px'},200, function() {
            isAnimate=false;
            $(e).animate({top: '2px'},200)})
}
function    colorOnOffCombo(self) {
        self.style.backgroundColor=parseInt(self.options[self.selectedIndex].value)? '#9f9':'#988';
}
function    resetCountDown() {
        countdown=initialCountdown;
        wobble();
        //var o = $('#counter');
    /*
    if (o)  {
           o.style.top=parseInt(document.body.scrollTop)+'px';
           // o.style.top=parseInt(document.body.scrollTop)+'px';
           // alert(o.style.top);
    }
    */
}

function setCheckBoxes(formName,value)   {
// toggle Check Boxes using Prototype Library
    var form=$(formName);
    var i=form.getElements('checkbox');
    i.each(function(item)
        {
            item.checked=value;
        }
    );
}
function toggleCheckBoxes(formName)   {
// toggle Check Boxes using Prototype Library
    var form=$(formName);
    var i=form.getElements('checkbox');
    i.each(function(item)
        {
        if (item.checked){
            item.checked=false;
        }
        else {
            item.checked=true;
        }
        }
    );
}
function    setVar(k,v) {
     Ajax_Request('ajax/setvar.php?k='+k+";v="+v);
}

// body.onscroll='resetCountDown()';
function c2f(o1, o2)
{ 
        var c = new Number(o1.value);
        o1.value = c.toFixed(3);
        var f = new Number(((c * 9.0) / 5.0) + 32.0);
        o2.value = f.toFixed(3);
} 
function f2c(o1, o2)
{
        var f = new Number(o1.value);
        o1.value = f.toFixed(3);
        var c = new Number((f - 32.0) * 5.0 / 9.0);
        o2.value = c.toFixed(3);
} 
function blankValidation(theField,alertmsg)
{ 
        with (theField)
        {
                if (value == null || value == '')
                {
                        if (alertmsg != '')
                        {
                                alert(alertmsg);
                        }
                        return false;
                }
                else
                {
                        return true;
                }
        }
}

function  bstable(id,options) 
{

    tdn = jQuery(id+' td').length;
    trn = jQuery(id+' tr').length;

    tdc = tdn / trn;

    for(cnr = 0;cnr <= trn-1;cnr++) {

         for(cnc = 0;cnc <= tdc-1;cnc++) {

              mp = cnr*tdc + cnc;
                jQuery(id+' td').eq(mp).addClass('c'+cnc+'n');
                 
                  
                   }

    }


    defaultc = "red";
    defaultbg = "black";
    defaultfg = "white";
    cols = 5;


    if(options) {
        if(!options.color) {
            color = defaultc;
        }else {
            color = options.color;
        }

        if(!options.background) {
            background = defaultbg;
        }else {
            background = options.background;
        }

        if(!options.foreground) {
            foreground = defaultfg;
        }else {
            foreground = options.foreground;
        }


    }else {
        color = defaultc;
        background = defaultbg;
    }

        alert('ok');
    chtd = jQuery(id+' td');
    chtd.each(function(){

        jQuery(this).mouseover(function(){

            cv = jQuery(this).attr('class');
            jQuery(cv).each(function(){
                jQuery(this).css({
                    'background-color' : background,
                    'color' : foreground
                });
            });

            jQuery(this).css({
                'background-color' : color,
                'color' : foreground
            });


        });


        jQuery(this).mouseout(function(){
            jQuery(this).css({
                'background-color' : '',
                'color' : ''
            });

            cv = jQuery(this).attr('class');
            jQuery(cv).each(function(){
                jQuery(this).css({
                    'background-color' : '',
                    'color' : ''
                });
            });


        });


    });

    chtr = jQuery(id+' tr');
    chtr.each(function(){

        jQuery(this).mouseover(function(){
            jQuery(this).css({
                'background-color' : background,
                'color' : foreground
            });
        });


        jQuery(this).mouseout(function(){
            jQuery(this).css({
                'background-color' : '',
                'color' : ''
            });
        });


    });


}
function catchScrollEvent() {

}

if (usePrototype) {
Ajax.Responders.register({ onCreate : showLoader,
            onComplete : hideLoader 
            });
}
else {
        //FIXME
}
//function Event.observe('counter','click',toggle_countdown);
function Event_observe(obj,event,func) {
    if (usePrototype) {
        Event.observe(obj,event,func); 
    } else {
            // use jquerys function ..
         if (!(obj.bind)) alert(event+'/'+obj+'/'+func);
            obj.bind(event,func);
           }
  } 

addLoadEvent(styleTables);
addLoadEvent(catchScrollEvent);
document.cookie = 'scwidth='+screenWidth+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/'
document.cookie = 'scheight='+screenHeight+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=/'

function hideInfo() {
        $('#info').hide('blind');
        $('#info2').hide('blind');
           // alert('hi');
}
function    sizeTo(id,w,h) {
    $('#'+id).effect('resize', { to : { width: w, height: h }});
}
/** for the slider */
function getTime(hours, minutes) {
    var time = null;
    minutes = minutes + "";
    if (hours < 12) {time = "AM";}
    else {  time = "PM";}
    if (hours == 0) {hours = 12;}
    if (hours > 12) {hours = hours - 12; }
    if (minutes.length == 1) {minutes = "0" + minutes;}
    return hours + ":" + minutes + " " + time;
}
function checkMax() {
    var size = $("#slider-range").slider("values", 1) - $("#slider-range").slider("values", 0);
    if( size >= 1435) {
        $("#slider-range div")
            .addClass("ui-state-error")
            .removeClass("ui-widget-header");
        $("#scheduleSubmit")
            .attr("disabled","disabled")
            .addClass("ui-state-disabled")
            .removeClass("ui-state-default");
        $("#SlideMax").text("Cannot be more than 24 hours");
    }
    else {
        $("#slider-range div")
            .addClass("ui-widget-header")
            .removeClass("ui-state-error");
        $("#scheduleSubmit")
            .removeAttr("disabled")
            .addClass("ui-state-default")
            .removeClass("ui-state-disabled");
        $("#SlideMax").text("");
    }
}
/**
$("#scheduleSubmit").on('click', function(){
    console.log(startTime);
    console.log(endTime);
    $('#Schedule tbody').append('<tr>' +
        '<td>' + startTime + '</td>' +
        '<td>' + endTime + '</td>' +
        '</tr>');
});
slideTime();
*/
$(function($){
    $.extend({
        playSound: function(){
            if ($('#audio').length == 0) {
            $("<audio autoplay='autoplay' id=\"audio\" '><source src='"+arguments[0]+"' /></audio>").appendTo('body');
                alert("Playing");
            }
            $('#audio')[0].play();
        }
    });
});
function mbeep() {
       $.playSound('/arms/sound/beep-26.wav');
}
/*
  SortTable
  version 2
  7th April 2007
  Stuart Langridge, http://www.kryogenix.org/code/browser/sorttable/
  
  Instructions:
  Download this file
  Add <script src="sorttable.js"></script> to your HTML
  Add class="sortable" to any table you'd like to make sortable
  Click on the headers to sort
  
  Thanks to many, many people for contributions and suggestions.
  Licenced as X11: http://www.kryogenix.org/code/browser/licence.html
  This basically means: do what you want with it.
*/

 
var stIsIE = /*@cc_on!@*/false;

var sorttable = {
  reinit: function(d) {
    if (_timer) clearInterval(_timer);
//	alert('reinit'+d);
	var doc= d ? d: document;
    forEach(doc.getElementsByTagName('table'), function(table) {
      if (table.className.search(/\bsortable\b/) != -1) {
        sorttable.makeSortable(table);
      }
	})
	},
  init: function() {
    // quit if this function has already been called
    if (arguments.callee.done) return;
    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;
    // kill the timer
    if (_timer) clearInterval(_timer);
    
    if (!document.createElement || !document.getElementsByTagName) return;
    
    sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
    
    forEach(document.getElementsByTagName('table'), function(table) {
      if (table.className.search(/\bsortable\b/) != -1) {
        sorttable.makeSortable(table);
      }
    });
    
  },
  
  makeSortable: function(table) {
    if (table.getElementsByTagName('thead').length == 0) {
      // table doesn't have a tHead. Since it should have, create one and
      // put the first table row in it.
      the = document.createElement('thead');
      the.appendChild(table.rows[0]);
      table.insertBefore(the,table.firstChild);
    }
    // Safari doesn't support table.tHead, sigh
    if (table.tHead == null) table.tHead = table.getElementsByTagName('thead')[0];
    
    if (table.tHead.rows.length != 1) return; // can't cope with two header rows
    
    // Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
    // "total" rows, for example). This is B&R, since what you're supposed
    // to do is put them in a tfoot. So, if there are sortbottom rows,
    // for backwards compatibility, move them to tfoot (creating it if needed).
    sortbottomrows = [];
    for (var i=0; i<table.rows.length; i++) {
      if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
        sortbottomrows[sortbottomrows.length] = table.rows[i];
      }
    }
    if (sortbottomrows) {
      if (table.tFoot == null) {
        // table doesn't have a tfoot. Create one.
        tfo = document.createElement('tfoot');
        table.appendChild(tfo);
      }
      for (var i=0; i<sortbottomrows.length; i++) {
        tfo.appendChild(sortbottomrows[i]);
      }
      delete sortbottomrows;
    }
    
    // work through each column and calculate its type
    headrow = table.tHead.rows[0].cells;
    for (var i=0; i<headrow.length; i++) {
      // manually override the type with a sorttable_type attribute
      if (!headrow[i].className.match(/\bsorttable_nosort\b/)) { // skip this col
        mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
        if (mtch) { override = mtch[1]; }
	      if (mtch && typeof sorttable["sort_"+override] == 'function') {
	        headrow[i].sorttable_sortfunction = sorttable["sort_"+override];
	      } else {
	        headrow[i].sorttable_sortfunction = sorttable.guessType(table,i);
	      }
	      // make it clickable to sort
	      headrow[i].sorttable_columnindex = i;
	      headrow[i].sorttable_tbody = table.tBodies[0];
	      dean_addEvent(headrow[i],"click", function(e) {

          if (this.className.search(/\bsorttable_sorted\b/) != -1) {
            // if we're already sorted by this column, just 
            // reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
            this.className = this.className.replace('sorttable_sorted',
                                                    'sorttable_sorted_reverse');
            this.removeChild(document.getElementById('sorttable_sortfwdind'));
            sortrevind = document.createElement('span');
            sortrevind.id = "sorttable_sortrevind";
            sortrevind.innerHTML = stIsIE ? '&#160;<font face="webdings">5</font>' : '&#160;&#x25B4;';
            this.appendChild(sortrevind);
            return;
          }
          if (this.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
            // if we're already sorted by this column in reverse, just 
            // re-reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
            this.className = this.className.replace('sorttable_sorted_reverse',
                                                    'sorttable_sorted');
            this.removeChild(document.getElementById('sorttable_sortrevind'));
            sortfwdind = document.createElement('span');
            sortfwdind.id = "sorttable_sortfwdind";
            sortfwdind.innerHTML = stIsIE ? '&#160;<font face="webdings">6</font>' : '&#160;&#x25BE;';
            this.appendChild(sortfwdind);
            return;
          }
          
          // remove sorttable_sorted classes
          theadrow = this.parentNode;
          forEach(theadrow.childNodes, function(cell) {
            if (cell.nodeType == 1) { // an element
              cell.className = cell.className.replace('sorttable_sorted_reverse','');
              cell.className = cell.className.replace('sorttable_sorted','');
            }
          });
          sortfwdind = document.getElementById('sorttable_sortfwdind');
          if (sortfwdind) { sortfwdind.parentNode.removeChild(sortfwdind); }
          sortrevind = document.getElementById('sorttable_sortrevind');
          if (sortrevind) { sortrevind.parentNode.removeChild(sortrevind); }
          
          this.className += ' sorttable_sorted';
          sortfwdind = document.createElement('span');
          sortfwdind.id = "sorttable_sortfwdind";
          sortfwdind.innerHTML = stIsIE ? '&#160;<font face="webdings">6</font>' : '&#160;&#x25BE;';
          this.appendChild(sortfwdind);

	        // build an array to sort. This is a Schwartzian transform thing,
	        // i.e., we "decorate" each row with the actual sort key,
	        // sort based on the sort keys, and then put the rows back in order
	        // which is a lot faster because you only do getInnerText once per row
	        row_array = [];
	        col = this.sorttable_columnindex;
	        rows = this.sorttable_tbody.rows;
	        for (var j=0; j<rows.length; j++) {
	          row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
	        }
	        /* If you want a stable sort, uncomment the following line */
	        sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
	        /* and comment out this one */
	        //row_array.sort(this.sorttable_sortfunction);
	        
	        tb = this.sorttable_tbody;
	        for (var j=0; j<row_array.length; j++) {
	          tb.appendChild(row_array[j][1]);
	        }
	        
	        delete row_array;
	      });
	    }
    }
  },
  
  guessType: function(table, column) {
    // guess the type of a column based on its first non-blank row
    sortfn = sorttable.sort_alpha;
    for (var i=0; i<table.tBodies[0].rows.length; i++) {
      text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
      if (text != '') {
        if (text.match(/^-?[£$¤]?[\d,.]+%?$/)) {
          return sorttable.sort_numeric;
        }
        // check for a date: dd/mm/yyyy or dd/mm/yy 
        // can have / or . or - as separator
        // can be mm/dd as well
        possdate = text.match(sorttable.DATE_RE)
        if (possdate) {
          // looks like a date
          first = parseInt(possdate[1]);
          second = parseInt(possdate[2]);
          if (first > 12) {
            // definitely dd/mm
            return sorttable.sort_ddmm;
          } else if (second > 12) {
            return sorttable.sort_mmdd;
          } else {
            // looks like a date, but we can't tell which, so assume
            // that it's dd/mm (English imperialism!) and keep looking
            sortfn = sorttable.sort_ddmm;
          }
        }
      }
    }
    return sortfn;
  },
  
  getInnerText: function(node) {
    // gets the text we want to use for sorting for a cell.
    // strips leading and trailing whitespace.
    // this is *not* a generic getInnerText function; it's special to sorttable.
    // for example, you can override the cell text with a customkey attribute.
    // it also gets .value for <input> fields.
	if (node == null) return '';
    
    hasInputs = (typeof node.getElementsByTagName == 'function') &&
                 node.getElementsByTagName('input').length;
    
    if (node.getAttribute("sorttable_customkey") != null) {
      return node.getAttribute("sorttable_customkey");
    }
    else if (typeof node.textContent != 'undefined' && !hasInputs) {
      return node.textContent.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.innerText != 'undefined' && !hasInputs) {
      return node.innerText.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.text != 'undefined' && !hasInputs) {
      return node.text.replace(/^\s+|\s+$/g, '');
    }
    else {
      switch (node.nodeType) {
        case 3:
          if (node.nodeName.toLowerCase() == 'input') {
            return node.value.replace(/^\s+|\s+$/g, '');
          }
        case 4:
          return node.nodeValue.replace(/^\s+|\s+$/g, '');
          break;
        case 1:
        case 11:
          var innerText = '';
          for (var i = 0; i < node.childNodes.length; i++) {
            innerText += sorttable.getInnerText(node.childNodes[i]);
          }
          return innerText.replace(/^\s+|\s+$/g, '');
          break;
        default:
          return '';
      }
    }
  },
  
  reverse: function(tbody) {
    // reverse the rows in a tbody
    newrows = [];
    for (var i=0; i<tbody.rows.length; i++) {
      newrows[newrows.length] = tbody.rows[i];
    }
    for (var i=newrows.length-1; i>=0; i--) {
       tbody.appendChild(newrows[i]);
    }
    delete newrows;
  },
  
  /* sort functions
     each sort function takes two parameters, a and b
     you are comparing a[0] and b[0] */
  sort_numeric: function(a,b) {
    aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
  },
  sort_alpha: function(a,b) {
    if (a[0]==b[0]) return 0;
    if (a[0]<b[0]) return -1;
    return 1;
  },
  sort_ddmm: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  sort_mmdd: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  
  shaker_sort: function(list, comp_func) {
    // A stable sort function to allow multi-level sorting of data
    // see: http://en.wikipedia.org/wiki/Cocktail_sort
    // thanks to Joseph Nahmias
    var b = 0;
    var t = list.length - 1;
    var swap = true;

    while(swap) {
        swap = false;
        for(var i = b; i < t; ++i) {
            if ( comp_func(list[i], list[i+1]) > 0 ) {
                var q = list[i]; list[i] = list[i+1]; list[i+1] = q;
                swap = true;
            }
        } // for
        t--;

        if (!swap) break;

        for(var i = t; i > b; --i) {
            if ( comp_func(list[i], list[i-1]) < 0 ) {
                var q = list[i]; list[i] = list[i-1]; list[i-1] = q;
                swap = true;
            }
        } // for
        b++;

    } // while(swap)
  }  
}

/* ******************************************************************
   Supporting functions: bundled here to avoid depending on a library
   ****************************************************************** */

// Dean Edwards/Matthias Miller/John Resig

/* for Mozilla/Opera9 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", sorttable.init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
    document.write('<script id="__ie_onload" defer="defer" src="javascript:void(0)"><\/script>');
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            sorttable.init(); // call the onload handler
        }
    };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            sorttable.init(); // call the onload handler
        }
    }, 10);
}

/* for other browsers */
window.onload = sorttable.init;

// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function dean_addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = dean_addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
dean_addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
}

// Dean's forEach: http://dean.edwards.name/base/forEach.js
/*
	forEach, version 1.0
	Copyright 2006, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

// array-like enumeration
if (!Array.forEach) { // mozilla already supports this
	Array.forEach = function(array, block, context) {
		for (var i = 0; i < array.length; i++) {
			block.call(context, array[i], i, array);
		}
	};
}

// generic enumeration
Function.prototype.forEach = function(object, block, context) {
	for (var key in object) {
		if (typeof this.prototype[key] == "undefined") {
			block.call(context, object[key], key, object);
		}
	}
};

// character enumeration
String.forEach = function(string, block, context) {
	Array.forEach(string.split(""), function(chr, index) {
		block.call(context, chr, index, string);
	});
};

// globally resolve forEach enumeration
var forEach = function(object, block, context) {
	if (object) {
		var resolve = Object; // default
		if (object instanceof Function) {
			// functions have a "length" property
			resolve = Function;
		} else if (object.forEach instanceof Function) {
			// the object implements a custom forEach method so use that
			object.forEach(block, context);
			return;
		} else if (typeof object == "string") {
			// the object is a string
			resolve = String;
		} else if (typeof object.length == "number") {
			// the object is array-like
			resolve = Array;
		}
		resolve.forEach(object, block, context);
	}
};


/*
Lightbox v2.6
by Lokesh Dhakar - http://www.lokeshdhakar.com

For more information, visit:
http://lokeshdhakar.com/projects/lightbox2/

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
- free for use in both personal and commercial projects
- attribution requires leaving author name, author link, and the license info intact
*/


(function() {
  var $, Lightbox, LightboxOptions;

  $ = jQuery;

  LightboxOptions = (function() {
    function LightboxOptions() {
      this.fadeDuration = 500;
      this.fitImagesInViewport = true;
      this.resizeDuration = 700;
      this.showImageNumberLabel = true;
      this.wrapAround = false;
    }

    LightboxOptions.prototype.albumLabel = function(curImageNum, albumSize) {
      return "Image " + curImageNum + " of " + albumSize;
    };

    return LightboxOptions;

  })();

  Lightbox = (function() {
    function Lightbox(options) {
      this.options = options;
      this.album = [];
      this.currentImageIndex = void 0;
      this.init();
    }

    Lightbox.prototype.init = function() {
      this.enable();
      return this.build();
    };

    Lightbox.prototype.enable = function() {
      var _this = this;
      return $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(e) {
        _this.start($(e.currentTarget));
        return false;
      });
    };

    Lightbox.prototype.build = function() {
      var _this = this;
      $("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo($('body'));
      this.$lightbox = $('#lightbox');
      this.$overlay = $('#lightboxOverlay');
      this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
      this.$container = this.$lightbox.find('.lb-container');
      this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
      this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
      this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
      this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);
      this.$overlay.hide().on('click', function() {
        _this.end();
        return false;
      });
      this.$lightbox.hide().on('click', function(e) {
        if ($(e.target).attr('id') === 'lightbox') {
          _this.end();
        }
        return false;
      });
      this.$outerContainer.on('click', function(e) {
        if ($(e.target).attr('id') === 'lightbox') {
          _this.end();
        }
        return false;
      });
      this.$lightbox.find('.lb-prev').on('click', function() {
        if (_this.currentImageIndex === 0) {
          _this.changeImage(_this.album.length - 1);
        } else {
          _this.changeImage(_this.currentImageIndex - 1);
        }
        return false;
      });
      this.$lightbox.find('.lb-next').on('click', function() {
        if (_this.currentImageIndex === _this.album.length - 1) {
          _this.changeImage(0);
        } else {
          _this.changeImage(_this.currentImageIndex + 1);
        }
        return false;
      });
      return this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
        _this.end();
        return false;
      });
    };

    Lightbox.prototype.start = function($link) {
      var $window, a, dataLightboxValue, i, imageNumber, left, top, _i, _j, _len, _len1, _ref, _ref1;
      $(window).on("resize", this.sizeOverlay);
      $('select, object, embed').css({
        visibility: "hidden"
      });
      this.$overlay.width($(document).width()).height($(document).height()).fadeIn(this.options.fadeDuration);
      this.album = [];
      imageNumber = 0;
      dataLightboxValue = $link.attr('data-lightbox');
      if (dataLightboxValue) {
        _ref = $($link.prop("tagName") + '[data-lightbox="' + dataLightboxValue + '"]');
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          a = _ref[i];
          this.album.push({
            link: $(a).attr('href'),
            title: $(a).attr('title')
          });
          if ($(a).attr('href') === $link.attr('href')) {
            imageNumber = i;
          }
        }
      } else {
        if ($link.attr('rel') === 'lightbox') {
          this.album.push({
            link: $link.attr('href'),
            title: $link.attr('title')
          });
        } else {
          _ref1 = $($link.prop("tagName") + '[rel="' + $link.attr('rel') + '"]');
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            a = _ref1[i];
            this.album.push({
              link: $(a).attr('href'),
              title: $(a).attr('title')
            });
            if ($(a).attr('href') === $link.attr('href')) {
              imageNumber = i;
            }
          }
        }
      }
      $window = $(window);
      top = $window.scrollTop() + $window.height() / 10;
      left = $window.scrollLeft();
      this.$lightbox.css({
        top: top + 'px',
        left: left + 'px'
      }).fadeIn(this.options.fadeDuration);
      this.changeImage(imageNumber);
    };

    Lightbox.prototype.changeImage = function(imageNumber) {
      var $image, preloader,
        _this = this;
      this.disableKeyboardNav();
      $image = this.$lightbox.find('.lb-image');
      this.sizeOverlay();
      this.$overlay.fadeIn(this.options.fadeDuration);
      $('.lb-loader').fadeIn('slow');
      this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
      this.$outerContainer.addClass('animating');
      preloader = new Image();
      preloader.onload = function() {
        var $preloader, imageHeight, imageWidth, maxImageHeight, maxImageWidth, windowHeight, windowWidth;
        $image.attr('src', _this.album[imageNumber].link);
        $preloader = $(preloader);
        $image.width(preloader.width);
        $image.height(preloader.height);
        if (_this.options.fitImagesInViewport) {
          windowWidth = $(window).width();
          windowHeight = $(window).height();
          maxImageWidth = windowWidth - _this.containerLeftPadding - _this.containerRightPadding - 20;
          maxImageHeight = windowHeight - _this.containerTopPadding - _this.containerBottomPadding - 110;
          if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
            if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
              imageWidth = maxImageWidth;
              imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
              $image.width(imageWidth);
              $image.height(imageHeight);
            } else {
              imageHeight = maxImageHeight;
              imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
              $image.width(imageWidth);
              $image.height(imageHeight);
            }
          }
        }
        return _this.sizeContainer($image.width(), $image.height());
      };
      preloader.src = this.album[imageNumber].link;
      this.currentImageIndex = imageNumber;
    };

    Lightbox.prototype.sizeOverlay = function() {
      return $('#lightboxOverlay').width($(document).width()).height($(document).height());
    };

    Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
      var newHeight, newWidth, oldHeight, oldWidth,
        _this = this;
      oldWidth = this.$outerContainer.outerWidth();
      oldHeight = this.$outerContainer.outerHeight();
      newWidth = imageWidth + this.containerLeftPadding + this.containerRightPadding;
      newHeight = imageHeight + this.containerTopPadding + this.containerBottomPadding;
      this.$outerContainer.animate({
        width: newWidth,
        height: newHeight
      }, this.options.resizeDuration, 'swing');
      setTimeout(function() {
        _this.$lightbox.find('.lb-dataContainer').width(newWidth);
        _this.$lightbox.find('.lb-prevLink').height(newHeight);
        _this.$lightbox.find('.lb-nextLink').height(newHeight);
        _this.showImage();
      }, this.options.resizeDuration);
    };

    Lightbox.prototype.showImage = function() {
      this.$lightbox.find('.lb-loader').hide();
      this.$lightbox.find('.lb-image').fadeIn('slow');
      this.updateNav();
      this.updateDetails();
      this.preloadNeighboringImages();
      this.enableKeyboardNav();
    };

    Lightbox.prototype.updateNav = function() {
      this.$lightbox.find('.lb-nav').show();
      if (this.album.length > 1) {
        if (this.options.wrapAround) {
          this.$lightbox.find('.lb-prev, .lb-next').show();
        } else {
          if (this.currentImageIndex > 0) {
            this.$lightbox.find('.lb-prev').show();
          }
          if (this.currentImageIndex < this.album.length - 1) {
            this.$lightbox.find('.lb-next').show();
          }
        }
      }
    };

    Lightbox.prototype.updateDetails = function() {
      var _this = this;
      if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
        this.$lightbox.find('.lb-caption').html(this.album[this.currentImageIndex].title).fadeIn('fast');
      }
      if (this.album.length > 1 && this.options.showImageNumberLabel) {
        this.$lightbox.find('.lb-number').text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn('fast');
      } else {
        this.$lightbox.find('.lb-number').hide();
      }
      this.$outerContainer.removeClass('animating');
      this.$lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration, function() {
        return _this.sizeOverlay();
      });
    };

    Lightbox.prototype.preloadNeighboringImages = function() {
      var preloadNext, preloadPrev;
      if (this.album.length > this.currentImageIndex + 1) {
        preloadNext = new Image();
        preloadNext.src = this.album[this.currentImageIndex + 1].link;
      }
      if (this.currentImageIndex > 0) {
        preloadPrev = new Image();
        preloadPrev.src = this.album[this.currentImageIndex - 1].link;
      }
    };

    Lightbox.prototype.enableKeyboardNav = function() {
      $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
    };

    Lightbox.prototype.disableKeyboardNav = function() {
      $(document).off('.keyboard');
    };

    Lightbox.prototype.keyboardAction = function(event) {
      var KEYCODE_ESC, KEYCODE_LEFTARROW, KEYCODE_RIGHTARROW, key, keycode;
      KEYCODE_ESC = 27;
      KEYCODE_LEFTARROW = 37;
      KEYCODE_RIGHTARROW = 39;
      keycode = event.keyCode;
      key = String.fromCharCode(keycode).toLowerCase();
      if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
        this.end();
      } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
        if (this.currentImageIndex !== 0) {
          this.changeImage(this.currentImageIndex - 1);
        }
      } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
        if (this.currentImageIndex !== this.album.length - 1) {
          this.changeImage(this.currentImageIndex + 1);
        }
      }
    };

    Lightbox.prototype.end = function() {
      this.disableKeyboardNav();
      $(window).off("resize", this.sizeOverlay);
      this.$lightbox.fadeOut(this.options.fadeDuration);
      this.$overlay.fadeOut(this.options.fadeDuration);
      return $('select, object, embed').css({
        visibility: "visible"
      });
    };

    return Lightbox;

  })();

  $(function() {
    var lightbox, options;
    options = new LightboxOptions();
    return lightbox = new Lightbox(options);
  });

}).call(this);

// Popupwrapper
// $Id: popupwrapper.js,v 3.2 2014/02/16 21:46:24 mlc Exp $
// mlc 6/2013
var popupdiv=null;

function closePopup() {
	$('#popit').dialog('close');
	$('#popit').remove();

}

// var dpopupdiv=null;
var divid='';
function loadPagePartPopup(url,thedivid,title,width,height) {
	resetCountDown();
	hideTips();
	divid=thedivid;
	var id='ipop';
	
	if (typeof width == 'undefined') width = Math.round($(window).width()/2); //retrieve current window width
	if (typeof height == 'undefined') height = Math.round($(window).height()/2); //retrieve current window width
	if (width ==0) {
		width='auto';
		height='auto';
	} else {
	height=height+48; //  header+border
	width=width+12; //  header+border
	if (width<400 || width>950)
		width=400;
	if (height<400 || height>800) height='auto';
	if(typeof height == 'undefined') height=width;
	}

	if(!(/\?/.test(url))) { url+="?"; } else url+=";"
		url+='embedded=1;ajax='+divid;
	var pop=$('<div id="popit"></div>').load(url, function(response,status,xhr) {
			// Change Cancel Button
			var cbtn=$('#popit').find('.cancel'); // .find('input[value="Cancel"]');
			$(cbtn).click( function(event) { 
				event.preventDefault();
				$('#popit').dialog('close');
				$('#popit').remove();

				});

			// Make sure we style our buttons for jquery-ui:
			$('#popit a.ckpd,#popit  a.chkbtn,#popit  a.button,#popit a.fb,#popit input.fb,#popit button ').button();
			} )
	var dlg=pop.dialog( {
title: title,
resizable: true,
width: width,
//maxHeight: height,
// height: 'auto', // height,
height: height,
autoResize: true,
// height: width,
show: 'slow',
modal:true,
autoOpen:true,
close: function(event,ui) { $('#popit').remove(); /* check */ },
open: function(event,ui) {
}
});
return;
}
function debugPopup(a) {
	var w=$('#'+divid);
	alert(w.innerHeight());
}
$(document).ready(function()
		{
		$(this).ajaxStart(function()
			{
			$("#counter").append("<img id=\"overlay\" src='./images/ajax-loading.gif' /></div>");
			});


		$(this).ajaxStop(function()
			{
			$("#overlay").remove();
			});

		});
// Shortcuts
// ~sensor Details
if (!window.location.origin)
	window.location.origin = window.location.protocol+"//"+window.location.host;
	var pref= window.location.origin+'/'+window.location.href.split('/')[3]+'/';
	// Sensor Detail Popup
function pop_calinfo_sensor(sid) {
	
		return lppp(pref+'calreport.php?cid=1;sid='+sid, 'calrep','Calibration Detail',600,400);
	}
function pop_calinfo(sid) {
	
		return lppp(pref+'calreport.php?cid='+sid, 'calrep','Calibration Detail',900,500);
	}
function pop_sd(id) {
	
		return lppp(pref+'sensor_details.php?id='+id, 'sdp','Sensor #'+id+' Detail',800,500);
	}
function pop_toplogy(id) {
		
		var retval= lppp(pref+'viewhierarchy.php?id='+id, 'toplogoy','Sensor #'+id+' Mesh Toplogoy',500,500);
		return retval;
	}
function pop_audit(id) {
	
		return lppp(pref+'auditdetail.php?dhtml=1;id='+id, 'audit','Audit  #'+id+' Detail',600,500);
	}

// AP Detail Popup
function pop_ad(id) {
	return lppp(pref+'apdetail2.php?dhtml=1;id='+id, 'apdetail','Access Point #'+id+' Detail',500,500);
}
// Contact Detail Popup (id=user)
function pop_ci(id) {
	return lppp(pref+'contactdetail.php?dhtml=1;id='+id, 'cif','Contact Detail',500,500);
}
function pop_cilist(id) {
	return lppp(pref+'contactlist.php?dhtml=1;sid='+id, 'cif','Contact List',700,500);
}
function pop_evtdtl(eid) {
	return lppp(pref+'evtdetail.php?dhtml=1;eid='+eid, 'evtd','Event ('+eid+') Detail',700,500);
}
function pop_action_sid(sid) {
	return lppp(pref+'logaction.php?dhtml=1;autoid='+sid,'ca','Log Action', 850,600);
}
function pop_action(monitoring,id,eid,z) {
	return lppp(pref+'logaction.php?monitoring='+monitoring+';z='+z+';eid='+eid+';id='+id, 'ca','Log Action for Event #'+eid,750,500);
}
function pop_eventidx(sid) {
	return lppp(pref+'eventindex.php?id='+sid, 'evttable','Event List for  Sensor #'+sid,550,300);
}
function pop_addevt(sid) {
	return lppp(pref+'ajax/add_event.php?id='+sid, 'frm','Add User-Event for Sensor #'+sid,450,300);
}
function pop_zonenote(zone) {
	var txt="Zone Note";
	if (zone ==0) txt="Master Zone Note"; 
	return lppp(pref+'zonenote.php?pu=1;z='+zone, 'newnote',txt,650,400);
}
function pop_map(mapid,sid) {
	return lppp(pref+'maps/mapimg.php?hid='+mapid+';sid='+sid, ',ap','Map #'+mapid+' Sensor #'+sid,0,0);
}
function pop_photo_id(id) {
	// return lppp(pref+'viewphoto.php?id='+id+';dim=400x400', 'img','Photo #'+id,450,450);
	return lppp(pref+'viewphoto.php?id='+id, 'map','Photo #'+id+' Photo',450,450);
}
function pop_photo(sid) {
	//return lppp(pref+'thumb.php?hid='+sid+';dim=400x400', 'img','Sensor #'+sid+' Photo',450,450);
	return lppp(pref+'viewphoto.php?sid='+sid, 'map','Sensor #'+sid+' Photo',450,450);
}
function pop_security(sid) {
	return lppp(pref+'security.php?id='+sid, 'sec','Sensor #'+sid+' Security Log',750,500);
}
function pop_graph_edi_signal(sid) {
	return lppp(pref+'viewsensor_popup.php?id='+sid+';signal=2', 'ca','Sensor #'+sid+' Signal Graph',750,500);
}
function pop_graph_edi(sid,eid) {
	return lppp(pref+'viewsensor_popup.php?id='+sid+';eid='+eid, 'ca','Graph Sensor #'+sid+' Event #'+eid,750,500);
}
function pop_select_photo(sid,pid) {
	return lppp(pref+'imagedb.php?select='+sid+';pid='+pid, 'imgdb','Assign Photo',600,600);
}
function pop_del_user(uid) {
	return lppp(pref+'users.php?m=d;id='+uid,'delUser','Delete this User ?',600,450);
}
function pop_view_user(uid) {
	return pop_ci(uid);
	// return lppp(pref+'contactdetail.php?id='+uid,'ci','Contact Details',600,300);
}
function pop_view_profile(id) {
	return lppp(pref+'tpdetail.php?id='+id,'tprofile','Profile #'+id+' Details',800,600);
}
function pop_version() {
	return lppp(pref+'version.php','cpy','About',400,400);
}
function	updateLazyImages() {
$("img.photo").lazyload({
                effect: "fadeIn"
        });
$(document).ajaxStop(function(){
    $("img.photo").lazyload({ 
        effect: "fadeIn" 
    });
});

        $("img.photo").css('cursor','pointer');
        $("img.photo").bind('click', function(event) {
                var id=event.target.id.substr(1);
                alert(id);
                // gotourl('/arms/PhotoOverview.php?id='+id);
        });
}

jQuery.fn.progressreport = function (total, amount, label, barclass) {

	if (isNaN(total)) total = 0;
	if (isNaN(amount)) amount = 0;
	if (typeof barclass == 'undefined') {
		var barclass = '';
	} else {
		barclass = ' ' + barclass;
	}
	var percent = Math.round(((amount / total) * 100), 2);
	if (isNaN(percent)) percent = 0;
	var percentlabel = percent;
	if (percentlabel < 1) {
		percentlabel = 'less than 1'
	}
	var displaytotal = total;
	if (displaytotal > 1000000000) {
		displaytotal = (Math.round((displaytotal / 1000000000) * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2) + ' billion';
	} else {
		if (displaytotal > 1000000) {
			displaytotal = (Math.round((displaytotal / 1000000) * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2) + ' million';
		} else {
			displaytotal = format_number(displaytotal, 2, '.', ',');
		}
	}
	var displayamount = amount;
	if (displayamount > 1000000000) {
		displayamount = (Math.round((displayamount / 1000000000) * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2) + ' billion';
	} else {
		if (displayamount > 1000000) {
			displayamount = (Math.round((displayamount / 1000000) * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2) + ' million';
		} else {
			// displayamount = format_number(displayamount, 2, '.', ',');
		}
	}
	label = label.replace('%1', displaytotal);
	label = label.replace('%2', displayamount);
	label = label.replace('%3', percentlabel);
	return this.each(function () {
			$(this).html(' ' + label + ' ');
			if (percent > 100) {
			percent = 100;
			} else {
			if (percent < 1) {
			percent = 1;
			}
			}
			$(this).children('.barwrap').children('.bar').animate({ width: percent + '%' }, 3000);
			});
};

function  confirmDelete(txt,url) {
$('<div></div>').appendTo('#body')
                        .html('<div><span class="ui-icon ui-icon-alert" style="float:left; margin:5px 7px 20px 0;"></span><h2>Delete&#160;' + txt+' ? </h2></div>')
                        .dialog({
                            modal: true, title: 'Are you sure ?', zIndex: 100, autoOpen: true,
                            width: 'auto', resizable: false,
                            buttons: {
                                No: function () {
                                    $(this).dialog("close");
                                },
                                Yes: function () {
                                    gotourl(url); 
                                    $(this).dialog("close");
                                }
                            },
                            close: function (event, ui) {
                                $(this).remove();
                            }
                        });
}
function  confirmSubmit(txt,form) {
$('<div></div>').appendTo('#body')
                        .html('<div class="l"><hr style="width:300px" style="margin:0 auto"/><em>' + txt+' </em></div>')
                        .dialog({
                            modal: true, title: 'Confirm?', zIndex: 100, autoOpen: true,
                            width: 'auto', resizable: false,
                            buttons: {
                                No: function () {
                                    $(this).dialog("close");
                                },
                                Yes: function () {
                                    $(this).dialog("close");
                           		 form.submit(); 
                           		// works!         $("form:first").submit(); 
                                }
                            },
                            close: function (event, ui) {
                                $(this).remove();
                            }
                        });
}
/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */

/*
 * Interfaces:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */

(function() {

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	c1 = str.charCodeAt(i++) & 0xff;
	if(i == len)
	{
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
	    out += "==";
	    break;
	}
	c2 = str.charCodeAt(i++);
	if(i == len)
	{
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
	    out += "=";
	    break;
	}
	c3 = str.charCodeAt(i++);
	out += base64EncodeChars.charAt(c1 >> 2);
	out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
	out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

if (!window.btoa) window.btoa = base64encode;
if (!window.atob) window.atob = base64decode;

})();
