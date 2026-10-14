/* Theme: ./th0
*/body,html,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,pre,cite,code,em,img,samp,small,strong,var,dl,dt,dd,ol,ul,li,table,caption,tbody,tfoot,thead,tr,th,td,form {
border:0;
outline:0;
margin:0;
padding:0;
}
input, select, option, table, textarea {



}
input.required, select.required textarea.required {
}

        color: #a1b2c3; text-shadow: 0px -1px 0px #38506b;
    }

body {
    background-color:#eef;
    font-family:Arial, Tahoma;
    font-size:90%;
    margin:0;
    padding:5px;
    font: 14px/90% Verdana, sans-serif;
    font: normal 14px/90% "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;

}
a { color:black; }
a:hover { color:black; }
div,
table {
    box-sizing: border-box;/* CSS3-ONLY */ 
    -ms-box-sizing: border-box


}
.info,
#info,#info2 {
    background-color:yellow;
    padding:1ex;


    border: 1px solid yellow;
	border-radius: 8px;/* CSS3-ONLY */ 

    
}
#info ul,
#info2 ul {
	list-style-type: none;
}
a img {
    text-decoration: none;
    border: none;
}
div.info {
    text-align:center;
    margin:0 auto;
    max-width:80%;
}

#verinfo {
text-align: right;
font-size:70%;
color: #007;
}
#copyright {
    border-top:1px dotted gray;
    clear:both;
    background-color:#eeF;
    color:#777;
    font-size: 90%;
    text-align:center;
    margin: 0 auto;
    padding: 3px 1ex;
}
.p100 {
    width:99%;    
}
.p50 {
    width:49% !important;    
}
.c , .center{
    text-align:center;
    margin: 0 auto;
}
.r , .right {
    text-align:right;
}
.l {
    text-align:left;
}
.b {
    font-weight:bold;
}
.c {
    text-align:center;
    margin: 0 auto;
}
.red {
    color: red !important;
}
#counter {
    opacity: .8;
    padding:.5ex;
    margin:.5ex;
    background-color:#f88;
     cursor: pointer;
    position: fixed;
   right:2px;
    top: 2px;
    display:block; /* hidden by default */
}
#counter em {
    background-color:#ff8;
}
form table select {
    min-width:8em;
    width:98%;
}
div#body {
    /* border:1px solid black; */
    min-height: 400px;

}
div.verticalfill {
	height:400px;
}
.top,
.formtable td ,
.auto td 
{
    vertical-align:top;
}
.bgreen {
    background-color:#6e6;
}
.bggray {
    background-color:#ddd;
}
.bgred {
    background-color:#e66;
}
div#adminnotice {
    width:40%;
    text-align:center;
    padding:.5ex !important;
    margin: 0 auto;



    border: 1px solid #b33;
	border-radius: 8px;/* CSS3-ONLY */ 
}
.nowrap, .nw {
white-space:nowrap !important;
}

.noul {
    text-decoration:none !important;
}
table.colorpicker {
	width:12em;
	background-color:#777;
}
table.colorpicker td {
	width:1em;
	height:1em;
}
/* Form label should line up */
form label {
	white-space:nowrap;
}
/* Date Input Box */
#dateid {
    min-width:40px;
}
.button {
	display: inline-block;
	zoom: 1; /* zoom and *display = ie7 hack for display:inline-block */
	*display: inline;
	vertical-align: baseline;
	margin: 0 2px;
	outline: none;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	font: 14px/100% Arial, Helvetica, sans-serif;
	padding: .5em 2em .55em;
	text-shadow: 0 1px 1px rgba(0,0,0,.3);


	border-radius: .5em;/* CSS3-ONLY */ 


	box-shadow: 0 1px 2px rgba(0,0,0,.2); /* CSS3-ONLY */
}
.bigrounded {


	border-radius: 2em;/* CSS3-ONLY */ 
}
.medium {
	font-size: 12px;
	padding: .4em 1.5em .42em;
}
input.button {
	padding: 0;
}
.small {
	font-size: 11px;
	padding: .2em 1em .275em;
}

.button:hover {
	text-decoration: none;
}
.button:active {
	position: relative;
	top: 1px;
}
/* black */
.black {
	color: #d7d7d7;
	border: solid 1px #333;
	background: #333;



}
.black:hover {
	background: #000;



}
.black:active {
	color: #666;



}

/* gray */
.fb[disabled=disabled],
.gray {
	color: #e9e9e9;
	border: solid 1px #555;
	background: #6e6e6e;



}
.gray:hover {
	background: #616161;



}
.gray:active {
	color: #afafaf;



}

/* white */
.white {
	color: #606060;
	border: solid 1px #b7b7b7;
	background: #fff;



}
.white:hover {
	background: #ededed;



}
.white:active {
	color: #999;



}

/* orange */
a.fb .selected,
a .selected,
.fb .selected,
.selected .fb ,
.orange {
	color: #fef4e9;
	border: solid 1px #da7c0c;
	background: #f78d1d;



}
a .selected:hover,
.fb .selected:hover,
.orange:hover {
	background: #f47c20;



}
.button .selected:active,
.fb .selected:active,
.orange:active {
	color: #fcd3a5;



}

/* red */
.red {
	color: #faddde;
	border: solid 1px #980c10;
	background: #d81b21;



}
.red:hover {
	background: #b61318;



}
.red:active {
	color: #de898c;



}

/* blue */
.blue {
	color: #d9eef7;
	border: solid 1px #0076a3;
	background: #0095cd;



}
.blue:hover {
	background: #007ead;



}
.blue:active {
	color: #80bed6;



}

/* rosy */
.rosy {
	color: #fae7e9;
	border: solid 1px #b73948;
	background: #da5867;



}
.rosy:hover {
	background: #ba4b58;



}
.rosy:active {
	color: #dca4ab;



}

/* green */
.green {
	color: #e8f0de;
	border: solid 1px #538312;
	background: #64991e;



}
.green:hover {
	background: #538018;



}
.green:active {
	color: #a9c08c;



}

/* pink */
.pink {
	color: #feeef5;
	border: solid 1px #d2729e;
	background: #f895c2;



}
.pink:hover {
	background: #d57ea5;



}
.pink:active {
	color: #f3c3d9;



}

.button .disabled {
    color:gray;
}
button.fb,
a.fb,
input.fb {
    display:inline-block;
    /* height:34px; */
    padding:0;
    position:relative;
    top:1px;
    margin-left:5px;
    font-family:helvetica,arial,freesans,clean,sans-serif;
    font-weight:bold;
    font-size:12px;
    color:#333;
    text-shadow:1px 1px 0 #fff;
    white-space:nowrap;
    border:none;
    overflow:visible;
    background:#ddd;



    border-bottom:1px solid #ebebeb;


    border-radius:4px;/* CSS3-ONLY */ 


    box-shadow:0 1px 4px rgba(0,0,0,0.3); /* CSS3-ONLY */
    cursor:pointer;
    padding:0 .5ex;

    }
a.fb {
    height:auto;
}

a.fb:hover,
button.fb:hover,
input.fb:hover {
    color:#fff;
    text-shadow:-1px -1px 0 rgba(0,0,0,0.3);
    border-bottom-color:#0770a0;

    background:#0770a0;



}
#menu {
   background-color: #aaf; 

    background:linear-gradient(0,#2040a0,#f0f0f0);


/* border-bottom: 2px solid #203894; padding-bottom: 4px; */
/* background:#203894 url(img/toolbar-bg.png) repeat-x; */
}
#footermenu {
border-top: 2px solid #24A; padding-top: 4px;
  background-color: #24A;
   background-color: #aaf; 
    background:linear-gradient(0,#2040a0,#f0f0f0);



}
.menuitem li { padding-top: 3px; } 

#footermenu #menu, #noticearea { font-size: 8pt; }

#footermenu,
#menu {
/*  float: left; */
  display: block;
  color: #000;
  padding: 0px;
  margin: 0px; /* changed */
  width: 100%;
  height: 31px;
/*  background-color: #00a;
/*  background:#203894 url(img/toolbar-bg.png); */
 margin-right: 240px; 
vertical-align:bottom;
}

#menu {
    margin-top:2px;
}
#footermenu ul,
#menu ul {
  margin: 0;
  padding: 0;
  border: 0;
  list-style-type: none;
  background-color:transparent;
}

#footermenu li ,
#menu li {
  margin: 0;
  padding: 0; /* 2px 4px; */
  border: 0;
  display: block;
  float: left;
  position: relative;
  background-color: #203894;
/* background:#203894 url(img/toolbar-bg.png) repeat-x; */
/* border-right: 1px solid white; */
margin-right:1ex;
}
#menu li.right {
	float:right;
}
#footermenu  > ul > li {

	border-radius: 0px 0px 8px 8px;/* CSS3-ONLY */ 
}
#menu >  ul   >li {

}
#footermenu  > ul  li li ,
#menu  > ul  li li {
     opacity: .9;

}

#footermenu li:hover ,
#menu li:hover {
}


#footermenu a ,
#menu a {
  display: block;
  text-decoration: none;
  text-align: center;
  color: #fff; /* #5B5B5B; */
  padding: 0.25em 0.8em 0.25em 0.8em;
}

#menu a.greyed, #menu a.greyed:hover { color: #C6C3C6; }

#footermenu li a ,
#menu li a {
  position: relative;
}

#footermenu li:hover>a, #menu a:hover ,
#menu li:hover>a, #menu a:hover {
  color: #205D94;
  color: orange;
background-color: #203894; 
}

#footermenu li ul ,
#menu li ul {
  visibility: hidden;
  position: absolute;
  z-index: 10;
  color: #000;
  background-color: #FFFFFF;
  /*padding-top: 14px; */
  padding-bottom: 0px;
  /* line-height: 14px; */
  width: 130px;
  left: -1px;
}

html>body #menu li ul {  display: none; }

#sidemenu {
	margin:0;
	padding:0;
	background-color: #ddd;
}
#sidemenu li,
#menu li li {
  width: 100%;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: #C5C5C5;
  background: #fff;
  background-image:url(img/toolbar-bg.png);
  background-repeat: repeat-x;
}

#menu li li ul {
  top: 0;
  left: 100%;
}

div#menu li:hover ul,
#menu li:hover li:hover ul,
#menu li:hover li:hover li:hover ul {
    visibility: visible;
}
div#menu li:hover li ul,
#menu li:hover li:hover li ul,
#menu li:hover li:hover li:hover li ul {
    visibility: hidden;
}

#menu ul li:hover>ul {
  display: block;
  visibility: visible;
}

#menu li ul a {
  text-align: left;
  font-weight: normal;
  word-spacing: 0px;
}

#menu li ul a:hover
{
}

#menu li ul li ul {
  padding-top: 0px;
  border-top-width: 1px;
  left: 130px;
}

#menu li li ul {
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: #C5C5C5;
}

#menu li.menuitem {
  /* background: url('img/menu_divider.gif') no-repeat right center; */
}


#menu li li.submenu {
    background-image: url(img/menuarrow.gif);
    background-repeat: no-repeat;
    background-position: right;
background-color:#203894 
}
#menu li li.submenu a {
}

#menu li ul a:hover > li.submenu
{
    background-image: url(img/menuarrow.gif);
    background-repeat: no-repeat;
    background-position: 100% 5px;
}

#menu>  ul > li > ul > li > ul > li.selected >a,
#menu>  ul > li > ul > li.selected  > a,
#menu>  ul > li.selected  > a
{
  color: black;
  background-color: orange !important;
}
#menu  a.disabled,
#menu  a.disabled:hover
{
  color: #ddd;
  background-color: #779 !important;
  cursor: default;
}

div.tabcontainer {
	margin:0 auto ;
	padding:0;



}
div.tabheader ul {
	list-style-type:none;
	background-color:transparent;
	padding:0;



}
div.tabheader ul li {
display:inline;
	background-color:#ddd;
	border-right:1px solid #FFF;
	border-top:1px solid #ddd;
margin:0;
padding:.5ex;



}

div.tabheader ul li.selected {
	background-color:#FFF;

}

div.tabheader ul li a {
	text-decoration:none;
color:#000;
}
.tabheader {
width:100%;
      background-color:white;
	margin:0;
	padding:.5ex;
	/* height: 3em; */



}
.tabheader .tab {
	text-align:center; 
position:relative; 
	 /* height:8em; */



}
.box {
position:relative; 
float:left; 
top:0px;
    border-bottom: 10px solid #06a;



}
.tabheader .tab a, .tab a:visited {
position:relative; 
	 text-decoration:none; 
	 background-color:#06a; 
color:#fff; 
display:block; 
height:1.5em;
padding:5px;
min-width:70px; 
}
.tabheader .tab a .topleft, .tab a .topright {
position:absolute; 
top:0; 
width:0; 
height:0; 
overflow:hidden;
	 border-top:10px solid #fff;
}
.tabheader .tab a .topleft {
left:0; 
     border-right:10px solid #06a; 
}
.tabheader .tab a .topright {
left:70px; 
     border-left:10px solid #06a; 
}
.tabheader .tab a:hover {
	background-color:#000; 
}
.tabheader .tab a:hover .topleft {
	border-right:10px solid #000; 
	border-top:10px solid #fff;
}
.tabheader .tab a:hover .topright {
	border-left:10px solid #000; 
	border-top:10px solid #fff;
}
.tabbody {
margin:0;
       background-color:white;
border: 1px dotted #06a;
}
#gadgetcontainer {
	width: 98%;
	text-align:center;
	margin:0 auto;
}
div.gadget {
        width: 200px;
        float:left;
        padding:.5ex;
        margin:.5ex;
        text-align:center;
        color:black;
        min-height: 7.5em;
        max-height: 7.5em;

        /* height: 8em; */
        background-color: #eef;


	border-radius: 8px 8px 8px 8px;/* CSS3-ONLY */ 
        border-left:1px solid #ddd;
        border-top:1px solid #ddd;
        border-right:1px solid #777;
        border-bottom:1px solid #777;


    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) inset, 0 1px 0 rgba(255, 255, 255, 0.9);/* CSS3-ONLY */

}
.gadgetcontainer .isensix {
        background-color: #a77;

}
div.gadget div.scroll {
        overflow: auto;
        width: 98%;
        height: 8em;
}
div.gadget:hover {
        background-color: #ddf;

	border-radius: 8px 8px 8px 8px;/* CSS3-ONLY */ 
        border-left:1px solid #777;
        border-top:1px solid #777;
        border-right:1px solid #ddd;
        border-bottom:1px solid #ddd;
}
.gadgetcontainer .isensix:hover {
        background-color: #f87;

}
div.gadget a {
        text-decoration:none;
        color: black;
}
div.gadget a img {
border:none;
	width: 64px;


    box-shadow: none;

}
div.gadget  span {
        font-weight:bolder;
}

.atoolbar a, 
div.navbar a ,
div.toolbar a {
text-decoration:none;
}
.atoolbar,
div.navigation,table.navigation {
width:auto;
max-width:50%;
margin:0 auto;
white-space:nowrap;
}

/* breadcrumb */
.uc {
/* background-color:#ddf; 
padding:1px; */
    font-style:italic;
    font-size:80%
}
.uc #bc {
    list-style-type:none;
    display: inline;
    display: inline-block;
}
.uc #bc li 
{
display:inline;
display:inline-block;

 text-transform:lowercase;  
white-space:nowrap;
padding:.5ex .5ex;
}
 .navigation ul {
list-style-type:none;

text-align:center;
padding:1ex;
background-color: transparent; /* #aaa; */
}
.navigation li {
/* background-color:#aaa; */
display:inline;
display:inline-block;

/* text-transform:uppercase; */
white-space:nowrap;
padding:.5ex 1em;
}
.navigation a { color:black; }

.navigation li:hover {
background-color:#ddd;
}
/* decorate Links */
.navigation li a.navlink,
.navigation li a.mlink,
.navigation li a {
    color:#00a;
}
.navigation li.check {
		background-image: url('img/icons/table_error.png');
    background-position: center left;
    background-repeat: no-repeat;
		padding-left: 24px; 
		min-height: 16px;
}
.navigation li.graph {
		background-image: url('img/icons/chart_curve.png');
    background-position: center left;
    background-repeat: no-repeat;
		padding-left: 24px; 
		min-height: 16px;
}
.navigation li.event {
		background-image: url('img/icons/table_delete.png');
    background-position: center left;
    background-repeat: no-repeat;
		padding-left: 24px; 
		min-height: 16px;
}
.navigation li.table {
		background-image: url('img/icons/table.png');
    background-position: center left;
    background-repeat: no-repeat;
		padding-left: 24px; 
		min-height: 16px;
}
table.arms {
width:100%;

}
.sortable caption,
.arms caption
{
padding: 0 0 5px 0;
margin:0 auto;


padding:3px;
        border-bottom-color:#0770a0;
        text-align:center;
        font-weight: bolder;
color:white;	

	border-radius: 8px 8px 0 0;/* CSS3-ONLY */ 
      background-color: #24a;



}
.arms tbody th {
width:30%;
      text-align:right;
      padding-right:1em;
      /* text-transform: uppercase; */
        white-space: nowrap;
}
.sortable thead th
{
font-weight: bold ;
color: #4f6b72;
       border-right: 1px solid #C1DAD7;
       border-bottom: 1px solid #C1DAD7;
       border-top: 1px solid #C1DAD7;
       letter-spacing: 1px;
       text-transform: uppercase;
       text-align: left;
padding: 8px 12px 4px 12px;
background: #CAE8EA url(img/bg_header.jpg) no-repeat;
            vertical-align:middle;
}
.arms td.total
{
    border-top: 0;
    border-left: 0;
    border-right: 1px solid #C1DAD7;
background: none;
            text-align:right;
            font-weight:bold;
            text-transform:uppercase;
            letter-spacing:1px;
}
.arms th.sortable,
    .arms th.sortable-text,
    .arms th.sortable-date,
    .arms th.sortable-keep,
    .arms th.sortable-date-dmy,
    .arms th.sortable-numeric,
    .arms th.sortable-currency,
    .arms th.sortable-sortByTwelveHourTimestamp,
    .arms th.sortable-sortIPAddress,
    .arms th.sortable-sortEnglishLonghandDateFormat,
    .arms th.sortable-sortScientificNotation,
    .arms th.sortable-sortImage,
    .arms th.sortable-sortFileSize,
    .arms th.sortable-sortAlphaNumeric,
    .arms th.sortable-sortEnglishDateTime

{
cursor:pointer;
background: #CAE8EA url(./img/bg_header_sortable.jpg) no-repeat;
padding: 8px 12px 4px 16px;
}
.arms th.forwardSort
{
background:#CAE8EA url(/img/bg_header_down.jpg) no-repeat 0 0;
}
.arms th.reverseSort
{
background:#CAE8EA url(/img/bg_header_up.jpg) no-repeat 0 0;
}
table.arms  thead th.forwardSort a,
    table.arms  thead th.reverseSort a
{
color:#000;
      text-decoration:none;
}
/*
   These styles should be added when very long tables are expected
   .arms th.sort-active
   {
cursor:wait;
}
.arms th.sort-active a
{
color:#a80000 !important;
cursor:wait;
}
 */
.arms th a
{
    text-decoration:none;
color: #4f6b72;
background:transparent;
}
.arms td a
{
    text-decoration:none;
color:#239;
background:transparent;
}
.arms td a:hover
{
color:#a84444;
      border-bottom:1px dotted #a80000;
background:transparent;
}
.arms td
{
    border-right: 1px solid #C1DAD7;
    border-bottom: 1px solid #C1DAD7;
color: #4f6b72;
}
td.lft
{
    text-align:left;
}
tr.alt
{
background: #F5FAFA;
color: #797268;
}

form table.arms thead th ,
table.formtable thead th {
	background:#CAE8EA url(img/bg_header.jpg) no-repeat 0 0;
	color: #4f6b72;
	padding:.5ex;
}
form table.table tbody th ,
table.formtable tbody th {
	min-width:30%;
	background:#CAE8EA url(img/bg_header.jpg) no-repeat 0 0;
	padding-top:2px;
	padding-bottom:2px;
	color: #4f6b72;
		
}
table.arms {
	margin-bottom:1ex;
	margin-top:1ex;
}
table.arms tr.selected td {
	border:1px dotted yellow;
}
/* $Id: portal.css.php,v 1.6 2013/08/26 22:14:53 mlc Exp $
 * vim: set expandtab tabstop=4 shiftwidth=4 encoding=utf-8 syntax=css : 
 */
table.portal {
width:100%;
}
table.portal caption {
padding:3px;
	border-bottom-color:#0770a0;
	text-align:center;
	font-weight: bolder;
color:white;	
	border-radius: 8px 8px 0 0;/* CSS3-ONLY */ 
      background-color: #24a;

}
.portalbox iframe {
margin:0 auto;
padding:0;
height: 380px;
width:100%;



}
table.portal caption,table.arms2 caption {
	background-color:#247;
	color:#FFF;
      border-bottom:2px solid #136;
	border-radius: 4px 4px 0 0;/* CSS3-ONLY */ 
width:auto;
padding:.3ex;
}

table.portal {
width:100%;
border: none;
border-bottom:1px dotted #247;
       background-color:#FFF;
margin:0;
padding:3px;
}

/*

*/
.bold {
	font-weight:bolder;
}
td.SENSOR,
span.ALRM {
	border-left:2px solid red;
	padding-left:1px;
}
td.GOOD{
	border-left:2px solid green;
	padding-left:1px;
}
td.warnhi,
span.HIGH {
	border-left:2px solid red;
	padding-left:1px;
} 
td.warnlo,
span.LOW {
	border-left:2px solid blue;
	padding-left:1px;
} 
td.SEN,
span.SEN,
td.INIT,
td.NET,
span.PWR {
	border-left:2px solid black;
	padding-left:1px;
} 
td.POWER,
.LINK {
	border-left:2px solid brown;
	padding-left:1px;
}
td.INIT,
.INIT {
	border-left:2px solid yellow;
	padding-left:1px;
}
td.ZONE,
.ZONE {
	border-left:2px solid yellow;
	padding-left:1px;
}
/* UA Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36 */body {
    background-color:#eef;
    font-family:Arial
    font-size:80%;
    margin:0;
    padding:5px;
    font: normal 14px/80% Arial, Helvetica, sans-serif;

}

/* $Id: icolors.css.php,v 3.0 2013/10/25 14:18:03 mlc Exp $ <pre> */
/* Monitoring *//** special */

		.th, .th a {
			background-color:#ff0  !important ;
			color:	red  !important ;
		}
		.thoff, .thoff a {
			background-color:red  !important ;
			color:	#ff0  !important ;
		}

		.chkbtn, .chkbtn a {
			background-color:#09a  !important ;
			color:	#FFFFCC  !important ;
		}
		.chkbtnoff, .chkbtnoff a {
			background-color:#3333FF  !important ;
			color:	#FFFF33  !important ;
		}

		.door, .door a {
			background-color:#FF0000  !important ;
			color:	#009999  !important ;
		}
		.dooroff, .dooroff a {
			background-color:red  !important ;
			color:	#ff0  !important ;
		}

		.tlow, .tlow a {
			background-color:#0000FF  !important ;
			color:	#FFFF00  !important ;
		}
		.tlowoff, .tlowoff a {
			background-color:#3333FF  !important ;
			color:	#FFFF00  !important ;
		}

		.thigh, .thigh a {
			background-color:#FF0000  !important ;
			color:	#000000  !important ;
		}
		.thighoff, .thighoff a {
			background-color:#FF0000  !important ;
			color:	#000000  !important ;
		}

		.bactwarn, .bactwarn a {
			background-color:#00f  !important ;
			color:	#0ff  !important ;
		}
		.bactwarnoff, .bactwarnoff a {
			background-color:#0ff  !important ;
			color:	#00f  !important ;
		}

		.bactpos, .bactpos a {
			background-color:#00f  !important ;
			color:	#0ff  !important ;
		}
		.bactposoff, .bactposoff a {
			background-color:#0ff  !important ;
			color:	#00f  !important ;
		}

		.tnet, .tnet a {
			background-color:#000000  !important ;
			color:	#eee  !important ;
		}
		.tnetoff, .tnetoff a {
			background-color:#660000  !important ;
			color:	#FFFF33  !important ;
		}

		.tlink, .tlink a {
			background-color:#000  !important ;
			color:	#eee  !important ;
		}
		.tlinkoff, .tlinkoff a {
			background-color:#000  !important ;
			color:	#fee  !important ;
		}

		.tnos, .tnos a {
			background-color:#ff0  !important ;
			color:	red  !important ;
		}
		.tnosoff, .tnosoff a {
			background-color:red  !important ;
			color:	#ff0  !important ;
		}

		.tnorm, .tnorm a {
			background-color:#0c0  !important ;
			color:	#000  !important ;
		}
		.tnormoff, .tnormoff a {
			background-color:#0c0  !important ;
			color:	#000  !important ;
		}

		.door, .door a {
			background-color:#FF0000  !important ;
			color:	#009999  !important ;
		}
		.dooroff, .dooroff a {
			background-color:red  !important ;
			color:	#ff0  !important ;
		}

		.tsen, .tsen a {
			background-color:#000  !important ;
			color:	#eee  !important ;
		}
		.tsenoff, .tsenoff a {
			background-color:#999999  !important ;
			color:	#000000  !important ;
		}/* <br /> */
#evttable td.LNK {  
		background-color: #000;
		color: #eee }
span.LNK {  
		background-color: #000;
		color: #eee }
#evttable td.NET {  
		background-color: #000000;
		color: #eee }
span.NET {  
		background-color: #000000;
		color: #eee }
#evttable td.WIRE {  
		background-color: #000;
		color: #eee }
span.WIRE {  
		background-color: #000;
		color: #eee }
#evttable td.LOW {  
		background-color: #0000FF;
		color: #FFFF00 }
span.LOW {  
		background-color: #0000FF;
		color: #FFFF00 }
#evttable td.HIGH {  
		background-color: #FF0000;
		color: #000000 }
span.HIGH {  
		background-color: #FF0000;
		color: #000000 }/* <br /> */
 div.zonebar,
 div.zonebar a,
 table.zonebar a,
 table.zonebar  {
	color:#000;
	background-color: #CCCCCC;
}

		.door-armed, .door-armed a {
			background-color:#0c0  !important ;
			color:	#000  !important ;
		}
		.door-armedoff, .door-armedoff a {
			background-color:#0c0  !important ;
			color:	#000  !important ;
		}/* eof */tr.links td a,
tr.links td,
div.senhead a {
	/* background-color: white; */
	/* color:black !important; */
	text-decoration:none;
}
/*tr.links td a,
div.senhead a {
	border-bottom:1px dotted black;
} */
table.sencell tr.val td {
	padding:.5ex;
	font-weight:bold;
	text-align:center;
}
table.sencell tr.links td {
	width:33%;
	white-space:nowrap;
	padding:.5ex;
	padding-left:.5ex;
	padding-right:.5ex;
	font-weight:normal;
}
body { font-family: default;}.dhtmlwindow {
position: absolute;
visibility: hidden;
background: #ddd;

	    border-radius:4px;/* CSS3-ONLY */


	   border-bottom:1px solid #ebebeb;


	 opacity: .9; 
}

.drag-handle{ /*CSS for Drag Handle*/
padding: 1px;
	 text-indent: 3px;
	 font-size: 14px ;
	 font-weight: bold;
	 background-color: #c00;
	color: #eee;
	cursor: move;
	overflow: hidden;
	width: auto;
	height:16px;
	background:#0770a0;



}

.drag-handle .drag-controls{ /*CSS for controls (min, close etc) within Drag Handle*/
	position: absolute;
	right: 1px;
	top: 2px;
     /* cursor: hand; */
	cursor: pointer;
}

* html .drag-handle{ /*IE6 and below CSS hack. Width must be set to 100% in order for opaque title bar to render*/
width: 100%;
}


.drag-contentarea{ /*CSS for Content Display Area div*/
	border-top: 1px solid #334;
	background-color: #eee;
color: black;
height: 150px;
padding: 2px;
overflow: auto;
}

.drag-statusarea{ /*CSS for Status Bar div (includes resizearea)*/
	border-top: 1px solid gray;
	background-color: #fff;
	padding:1px;
	height: 13px; /*height of resize image*/
}


.drag-resizearea{ /*CSS for Resize Area itself*/
	float: right;
	width: 13px; /*width of resize image*/
	height: 13px; /*height of resize image*/
	cursor: nw-resize;
	font-size: 0;
}
.drag-handle{ /*Overwrite default drag handle bar background color with below*/
	background-color: #03277C;
}

#interVeil{ /*CSS for veil that covers entire page while modal window is visible*/
	position: absolute;
	background: #008 url(img/blackdot.gif);
	width: 10px;
	left: 0;
	top: 0;
	z-index: 5;
	visibility: hidden;
	opacity: 0.4;



}
/* Misc stuff for all themes */
.em15{
	width: 15em;
}
.dhtmlwindow {
 background-color: #eee;
    /* border-radius: 10px 10px 10px 10px; */
    color: #111;
    min-width: 450px;
    min-height: 450px;
    padding: 1px;
    box-shadow: 5px 5px 2px #555;
}

.zonebar  {
border-radius: 5px;
border-right: 1px solid gray;
border-bottom: 1px solid gray;
width:100%;
color:#000;
vertical-align:middle;
white-space:nowrap;
/* background: url("img/toolbar-bg2.png") repeat-x scroll 0 0 #E8E8FF;  */
padding:2px;
}
table.zonebar td {
vertical-align: top;
/* width: 50%; */
}

td.zonename {
	vertical-align: middle;
	white-space:nowrap;
}
td.tbord {
/* border:2ex outset gray; */
}
.zonebar .right {
	text-align:right;
	
}
div.senhead  {
	background-color:#fff;
	color:black !important;
}
tr.links td a,
tr.links td,
div.senhead a {
	text-decoration:none;
}
tr.links td a,
div.senhead a {
	/* border-bottom:1px dotted black; */
}
table.sencell tr td {
	padding:.5ex;
	white-space:nowrap;
}
table.sencell tr.val td {
	padding:.5ex;
	font-weight:bold;
	text-align:center;
}
table.sencell tr.links td {
	padding:.5ex;
	width:33%;
	font-weight:normal;
	white-space:nowrap;
	padding:1px;
    margin:1px;
}
.sencell {
	width:100%;
	background-color:white;
    text-decoration: none;
    white-space:nowrap;

}
.indhead {
}
.lid {
font-size:10px;
font-weight:400;
text-align:right;
vertical-align:top;
}

.lname {
font-size:12px;
font-weight:400;
text-align:left;
vertical-align:middle;
}
/* Linke for zone (bar) and Alarm-types to show */
.atoolbar a,
a.zonelink {
	color:black;
	text-decoration: none;
}
.atoolbar  {
	width:80%;
	margin:0 auto;
	text-align:center;
	background-color: transparent;
}

/* .norm {
color:#000;
background:transparent;
}
 .btn-on,.btn-off {
background-color:#4E85C8;
border:1px outset #4E85C8;
color:#FFF;
cursor:pointer;
font-family:Verdana,"MS Sans Serif",Charcoal,Chicago,Arial;
font-size:9px;
font-weight:400;
height:16px;
}
.btn-off {
background-color:#00A;
border:1px outset #00B;
color:#FF0;
cursor:pointer;
font-family:Verdana,"MS Sans Serif",Charcoal,Chicago,Arial;
font-size:9px;
font-weight:400;
height:16px;
}
*/
.senhead {
padding:4px;
}
.senhead a img {
    text-decoration:none !important;
    border:0px solid white !important;
}
.tbord td a {
    text-decoration:none !important;
}
.tbord img {
    border:0px solid white !important;
}
table.tbord tr.links td  {
}
table.zone tbody tr td.tbord {
}
.tbord img:hover {
    cursor: pointer;
}
.senbox {
    border:1px dotted gray;
	padding:1px;margin:0;
}
/*
Special Styles

*/
/* #evttable td.PWR  { background-color:#300; color:#fff; min-width:5em; }
#evttable td.LNK  { background-color:#20F; color:#fff; }
#evttable td.INIT { background-color:#aa0; color:#000; }
#evttable td.SEN  { background-color:#440; color:#fff; }
#evttable td.NET  { background-color:#440; color:#fff; }
#evttable td.HIGH { background-color:#f00; color:#aa0; }
#evttable td.WIRE { background-color:#100; color:#fff; }
#evttable td.LOW  { background-color:#115; color:#55f; } */
#evttable td.PWR  { background-color:#535; color:#fff; }
#evttable td.INFO  { background-color:yellow; color:black; }
#evttable td.info span.INFO  { background-color:inherit; border:none!important; }
span.HIGH { font-weight:bolder; }
span.LOW { font-weight:bolder; }
#evttable tbody tr td span { border:none; padding: 0; text-decoration:none; }
form {
	margin-bottom:1em;
}
/* body {

	overflow-x: hidden;
	overflow-x: scroll;
	overflow-y: scroll;
} */
td.NO {
	background-color: #c99;
	padding:.5ex;
}
td.YES {
	background-color: #9c9;
	padding:.5ex;
}
/** timing */
tr.compact td img { border-radius:4px ; }
tr.compact td img:hover { cursor:pointer ;
box-shadow:0 1px 4px rgba(0,0,0,0.3);


 }
th,
caption {


-khtml-user-select: none;

-ms-user-select: none;
user-select: none;

}
iframe {
	background-color:#eee;
}
div.gadget {
	white-space: nowrap;
	_width: 250px;
}
div.gadget span {
	font-size: 75%;
}
select.yesno,
select.yesno0 {
    background-color: #988;
}
select.yesno1 {
    background-color: #9f9;
}
div.zones ul {
	margin-left:1ex;
	padding-left:1ex;
	list-style-type: square;
}
div.zones ul ul{
	list-style-image: url(icons/arrow_right.png);
	list-style-type: square;
	list-style-position: inside;
}
/** after each table add some space */
table + div {
 margin-top:1ex;
}
input.date {
 background-image:url(/arms/images/date_icon1.png);
 background-position:1px 50%;
 margin-left:1ex;
 padding-left:1.5em;
 background-repeat:no-repeat;
}
tooltip {  
    position: absolute;  
    display: block;  
    top: -25px;  
    width: 35px;  
    height: 20px;  
    color: #fff;  
    text-align: center;  
    font: 10pt Tahoma, Arial, sans-serif ;  
    border-radius: 3px;  
    border: 1px solid #333;  
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, .3);  
    box-sizing: border-box;  
    background: linear-gradient(top, rgba(69,72,77,0.5) 0%,rgba(0,0,0,0.5) 100%);  
} 
div.uc ul#bc,
div.uc ul#bc li {
	display:inline !important;
	display:inline-block;
}
div.uc {
	margin-bottom:2px;
}
a.ckpd,
a.chkbtnoff,
a.chkbtn {
	margin:1ex !important;
	border-radius:3px;
	border:1px solid black;
	text-decoration: none;
	box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, .3);
	vertical-align:center;

}
a.fb {
	white-space:nowrap;
}
.hide {
	display:none;
}
table.arms tbody tr.selected  td {
	background-color:rgba(90,90,20,0.5);
}
table.isensix caption,
table.isensix tr th,
label.isensix,
caption.isensix,
table thead th.isensix,
th.isensix,
tr.isensix th {
	background-color:#a77;
	color:white;
}
blackbg {
	background-color:black;
	color:white;
}
/** Tooltip (multiline) */
p#qtip {
	position:absolute;
	border:1px solid #001;
	background:#f7f5d1;
	background:#f0f0f0;
	padding:2px 5px;
	color:#001;
	display:none;
	opacity: 0.9;
	line-height:120%;
	box-shadow:0 1px 4px rgba(0,0,0,0.3);
}
span.on,
p#qtip .on {
	background-color:green;
	color:#eff;
}
span.off,
span.OFF,
p#qtip .OFF {
	background-color:red;
	color:#eff;
}
select[multiple] option {
	padding: 3px 4px; border-bottom: 1px solid #dddddd; cursor: pointer;
}
table.mon {
	width:100%;
	border:none;
}
/** Monitoring page */
table.mon tr td {
	white-space: nowrap;
	vertical-align:middle;
}
table.zonebar {
border-radius: 0 3px 0 0 ;
border: 1px solid #fff;
	box-shadow:0 1px 3px rgba(0,0,0,0.3);
}
table.zonebar td {
	vertical-align:middle;
}
table tr td.senbox {
	border:none;
	box-shadow:0 1px 3px rgba(0,0,0,0.3);
}
#popit {
	background-color:#eee;
	border:2px solid white;
	border-radius:3px;
	box-shadow:6px 6px 9px rgba(0,0,0,0.3);
	min-width:300px;
	min-height:300px;
}
#ipop {
	overflow: scroll;
	z-index: 100000;
	min-width:300px;
	min-height:300px;
	max-width:1024px;
	max-height:800px;

	
}
#overlay
{
    border-radius: 10px;


    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: rgba(0,0,0,0.4);
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
.ui-widget-overlay {
	opacity: 0.2;
}
.ui-widget {
	font-size: inherit;
	font-family: inherit;
	font-size: 80%;
}
.ui-dialog-tile {
	margin:0 auto;
	font-size: 90%;
	font-family: inherit;
}
.ui-dialog {
	font-family: inherit;
	box-shadow:12px 12px 9px rgba(0,0,0,0.3);
}
.ui-button .ui-button-text,
.ui-button, .ui-button-text
{
 line-height: 1.0 !important;
   padding: 2px 1ex 2px 1ex !important;
}
.ui-button, button {
	box-shadow:2px 2px 3px rgba(0,0,0,0.3);
}
/** graphs */
.round {
    border-radius: 10px;
}
.shadow {
	box-shadow:2px 2px 4px rgba(0,0,0,0.2);
	border-radius: 2px;
}
#viewimg{
	box-shadow:3px 3px 5px rgba(0,0,0,0.3);
	border-radius: 10px;
}
div.graphprev{
 margin:8px;
 float:left;
 padding:1em;
 text-align:center;
 background-color:white;
box-shadow:3px 3px 5px rgba(0,0,0,0.3);
    border-radius: 10px;
}
div.graphprev a img{
box-shadow: none;
}
#info ul li {
	border:none !important;
}
#info {
	box-shadow:3px 3px 5px rgba(0,0,0,0.3);
	margin-bottom:1ex;

}
table.arms tbody tr td.info span.info {
	border-radius:0px;
	border:none !important;
	box-shadow: none !important;
}
table.arms table.arms {
	border:none !important;
}
div#main {
	min-height:640px;
}
.progress {
	width:300px;
	height:40px;
	background-color:#a37;
}
table.grid {
	margin:1ex auto;
	padding:1ex;
	box-shadow:3px 3px 5px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color:#eee;
}
table.grid tr {
	background-color:#eee;
}
table.grid tr td {
		width:4em;
		text-align:center;
		cursor:pointer ;
	padding:3px;
	box-shadow:2px 2px 3px rgba(0,0,0,0.3);
}
table.grid tr .disabled {
	background-color:gray;
}

fieldset {
	margin:3px;
	padding:1ex;
	border:1px solid white;
	box-shadow:3px 3px 5px rgba(0,0,0,0.3);
}
table.arms tbody tr td.USER span.USER, 
table.arms tbody tr td.USER {
	background-color: yellow;
}


.ui-widget {
	font-size: 1.1em;
	/* font-family: Verdana,Arial,sans-serif; */
	font: normal 14px/90% "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	font-size:90%;
}
.ui-widget .ui-widget {
	font-size: 1em;
	font-size:90%;
}
.ui-widget input,
.ui-widget select,
.ui-widget textarea,
.ui-widget button {
	font-family: Verdana,Arial,sans-serif;
	font-size: 1em;
}

table tr td.x16 {
        width:16px;
}
.footermenu {
	clear:both;
}
input[type="submit"]:disabled {
	color: gray!important;
}
.filledg {
/* background-image: radial-gradient(circle farthest-corner at center, #DBDBDB 0%, #000E14 100%); */
background-image: linear-gradient(to top right, #CCCCCC 0%, #444444 100%);
}
.bar_chart { position: relative; margin: auto;}
.bar_inner {
        border-radius: 2px;

        height: 18px;
        background-color: #b7cce2; }
.bar_text { position: absolute; line-height: 18px;
        font-size: 12px; text-indent: 2px; text-align: center; width: 100%;
}

.bar_inner_redgreen {
        border-radius: 2px;

        height: 18px;

	background: linear-gradient(to right, red, yellow, green);
}
textarea[disabled],
input[disabled],
select[disabled] { background-color: #baa;}
span.degC:after {
	content: "°C";
}
span.degF:after {
	content: "°F";
}
ul.tree {
	border: 1px solid white;
	margin:1ex;
	padding:1ex;
}
ul.tree ul.tree {
	border: none;
	margin:0;
	padding:0;
}
 ul.tree, ul.tree ul {
     list-style-type: none;

     background: #fff url(/arms/images/vline.png) repeat-y;
     margin: 0px;
     padding: 0px;
    
   }

   ul.tree ul {
     margin-left: 10px;
   }

   ul.tree li {
     margin: 0;
     padding: 0 12px;
     line-height: 20px;
     background: url(/arms/images/node.png) no-repeat;
     /* color: #369;
     font-weight: bold; */
   }

   ul.tree li.last {
	background-color: white;
     background-image: url(/arms/images/lastnode.png);
background-repeat: no-repeat;
     /* background: #fff url(/arms/images/lastnode.png) no-repeat; */
   }

.flat ul.tree li.last ,
.flat ul.tree * ,
.flat ul.tree {
	background: none;
	display:inline;
	padding: 0;
	margin:0;
}
.flat * ul.tree {
	box-shadow:0 1px 2px rgba(0,0,0,0.3);
	margin: 1ex;
}
/** 2 and 3 column display for lists */
ol.col3,
ul.col3,
ol.col2,
ul.col2 {
  margin-bottom:20px;
  overflow:hidden;
}
ul.col2 .ul li { border-bottom:1px solid #bbb;}
ul.col2 li {
	width:50%;
	float:left;
	display:inline;
	line-height:1.5em;
}
ul.col3 li {
	width:33%;
	float:left;
	display:inline;
	line-height:1.5em;
}
/* Rows */
ul.col3 li:nth-child(odd){background-color:rgba(255,255,255,0.06);}
ul.col3 li:nth-child(even){background-color:rgba(20,20,20,0.05);}
/* Columns */
ul.col3 li:nth-child(3n){background-color:rgba(255,255,255,0.03);}
ul.col3 li:nth-child(3n+1){background-color:rgba(20,20,20,0.03);}
/*`
a.poplink {
	cursor: url(/arms/css/img/popupcursor.png), auto !important;
}*/

.blink {
    animation-duration: 1s;
    animation-name: blink;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
}
@keyframes blink {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
a.small {
   font-size: .8em !important;
   margin: inherit !important;
}
canvas {
 font:12px/17px Arial, sans-serif;
  border:1px dotted #000;
}
span.disabled {
	font-size: 80%;
	color:red;
}
.fb.red {
    background-color: rgb(190,190,100) !important;
}
a.button.orange ,
.fb.orange {
    background-color: rgb(210,130,10) !important;
}
a.button.black ,
.fb.black {
    background-color: rgb(40,40,40) !important;
    color: white;
}
a.button.green ,
.fb.green {
    background-color: rgb(100,190,100) !important;
}
.inline {
	display: inline;
}
span.ac_power {
        display:inline-block;
        min-width:64px;
        min-height:24px;
        background-image:url(/arms/images/nm-adhoc.png);
        background-repeat:no-repeat;
        background-position:bottom right;
}
span.battery_power{
        display:inline-block;
        min-width:64px;
        min-height:24px;
        background-image:url(/arms/images/xfpm-battery-040.png);
        background-image:url(/arms/css/img/notification-battery-100.png);
        background-repeat:no-repeat;
        background-position:bottom right;
}

table td span.info {
	padding: 1px 1ex;
}
.mon  tbody tr td.eclink ,
.mon  tbody tr td.eclink a {
	background-color:yellow !important;
	text-decoration:none;
	color:black !important;
	width:2em;
}
table.hid td {
	text-align:center;
	width:2em;
	overflow:hidden;
}
table tbody tr.DISABLED {
	color:gray !important;
}
.example {
	background-color:#ee3;
	padding-left:1ex;
	padding-right:2ex;
}
table.atimes thead tr th,
table.atimes tbody tr td {
	background-color: white !important;
	width:2em;
}
table.atimes tbody tr td.on {
	background-color: #afa !important;
}
table.atimes tbody tr td.off {
	background-color: #e88 !important;
}
span.mc a {


-khtml-user-select: none;

-ms-user-select: none;
user-select: none;
	cursor: pointer;
	display:inline-block;
	width:4em !important;
	text-align:center;
	font-weight:bold;
	text-decoration:none !important;
	color:gray;
	font: 14px/100% Arial, Helvetica, sans-serif;
	box-shadow: 0 1px 2px rgba(0,0,0,.2);

}
/* blue */
span.mc a:first-child {
}
span.mc a.yes.checked {
	border-radius:5px;
	color: #d9eef7;
	border: solid 1px #0076a3;
	background: #0095cd;



	font-weight:bolder;
}
span.mc a.yes.checked:hover {
	background: #007ead;



}
span.mc a.yes.checked:active {
	color: #80bed6;



}
/* gray */
span.mc.gray a.no.checked {
	color: #e9e9e9;
	border: solid 1px #555;
	background: #6e6e6e;



}
span.mc.gray a.no.checked:hover {
	background: #616161;



}
span.mc.gray a.no.checked:active {
	color: #afafaf;



}

:focus {
	outline: 0;
}
label.error {
font-weight:bold;
background-color:yellow;
background-color: rgba(255,255,0,.3);
color:red;
padding: .5ex;
border: 1px dotted red;

}

#tooltip.pretty {
	font-family: Arial;
	border: none;
	width: 210px;
	padding:20px;
	height: 135px;
	opacity: 0.8;
	background: url('/arms/images/shadow.png');
}
#tooltip.pretty h3 {
	margin-bottom: 0.75em;
	font-size: 12pt;
	width: 220px;
	text-align: center;
}
#tooltip.pretty div { width: 220px; text-align: left; }

#tooltip.fancy {
	background: url('/arms/images/shadow2.png');
	padding-top: 5em;
	height: 100px;
}
#tooltip.fancy.viewport-right {
	background: url('/arms/images/shadow2-reverse.png');
}
#right, #right2 { text-align: right; }
#tooltip.right { width: 250px; }
#fancy2 { float: right; }
/* Upload */
.uploadifyQueueItem {
        background-color: #F5F5F5;
        border: 2px solid #E5E5E5;
        font: 11px Verdana, Geneva, sans-serif;
        margin-top: 5px;
        padding: 10px;
        width: 350px;
}
.uploadifyError {
        background-color: #FDE5DD !important;
        border: 2px solid #FBCBBC !important;
}
.uploadifyQueueItem .cancel {
        float: right;
}
.uploadifyQueue .completed {
        background-color: #E5E5E5;
}
.uploadifyProgress {
        background-color: #E5E5E5;
        margin-top: 10px;
        width: 100%;
}
.uploadifyProgressBar {
        background-color: #0099FF;
        height: 3px;
        width: 1px;
}
/* eof upload */

.qq-uploader { position:relative; width: 100%;}

.qq-upload-button {
    display:block; /* or inline-block */
    width: 105px; padding: 7px 0; text-align:center;    
    background:#880000; border-bottom:1px solid #ddd;color:#fff;
}
.qq-upload-button-hover {background:#cc0000;}
.qq-upload-button-focus {outline:1px dotted black;}

.qq-upload-drop-area {
    position:absolute; top:0; left:0; width:100%; height:100%; min-height: 70px; z-index:2;
    background:#FF9797; text-align:center; 
}
.qq-upload-drop-area span {
    display:block; position:absolute; top: 50%; width:100%; margin-top:-8px; font-size:16px;
}
.qq-upload-drop-area-active {background:#FF7171;}

.qq-upload-list {margin:15px 35px; padding:0; list-style:disc;}
.qq-upload-list li { margin:0; padding:0; line-height:15px; font-size:12px;}
.qq-upload-file, .qq-upload-spinner, .qq-upload-size, .qq-upload-cancel, .qq-upload-failed-text {
    margin-right: 7px;
}

.qq-upload-file {}
.qq-upload-spinner {display:inline-block; background: url("../images/loading2.gif"); width:15px; height:15px; vertical-align:text-bottom;}
.qq-upload-size,.qq-upload-cancel {font-size:11px;}

.qq-upload-failed-text {display:none;}
.qq-upload-fail .qq-upload-failed-text {display:inline;}

#info ul li {
	line-height:1.5em;
	border-bottom:3px solid white;
	margin-bottom:3px;
	padding-left:2em;
}
#info ul li a[href$='.pdf'] {
    display:inline-block;
    padding-left:20px;
    line-height:18px;
    background:transparent url(img/pdf.png) center left no-repeat;
}
a.PDF {
    padding-left:20px;
    line-height:18px;
    background:transparent url(img/pdf.png) center left no-repeat;
}
.tooltip {
	display:none;
	background:transparent url(img/black.png);
	font-size:12px;
	height:70px;
	width:160px;
	padding:25px;
	color:#fff;	
}
table.sortable thead tr th {
	cursor: pointer;
}
tr.hover {
	 background-color: #69f !important; 
}
td.hover, tr.hover
{


box-shadow: 0 0 5px #888;
}
th.hover, tfoot td.hover
{
	background-color: ivory !important;
}
td.hovercell, th.hovercell
{
	border-bottom:1px solid #69f !important;
}
td.hoverrow, th.hoverrow
{
	border-bottom:1px solid #69f !important;
}
.shadow {


box-shadow: 10px 10px 5px #888;
}
span.ICO_ERROR {
	background-repeat: no-repeat;
	background-image: url(icons/error.png);
		padding-left: 18px; 
}
span.ICO_INFORMATION {
	background-repeat: no-repeat;
	background-image: url(icons/information.png);
		padding-left: 18px; 
}
span.ICO_TAG_FORM_ERROR {
	background-repeat: no-repeat;
	background-image: url(icons/flag_red.png);
		padding-left: 18px; 
}
span.ICO_TAG_ORANGE {
	background-repeat: no-repeat;
	background-image: url(icons/comment_yellow.png);
		padding-left: 18px; 
}
.nb {
	white-space: nowrap;
}
a.LNK 
a.LINK 
{
	background-color:white;
	border-left: 3px dotted black;
	border-right: 3px dotted black;
	padding-right: .5ex;
}
a.WIRE {
	background-color:white;
	border-left: 3px dotted yellow;
	border-right: 3px dotted yellow;
	padding-right: .5ex;
}
a.NET {
	border-left: 3px dotted yellow;
	border-right: 3px dotted yellow;
	padding-right: .5ex;
}
a.LOW {
	border-left: 3px dotted rgb(10,10,180);
	border-right: 3px dotted rgb(10,10,180);
	padding-right: .5ex;
}
a.HIGH {
	border-left: 3px dotted rgb(180,10,10);
	border-right: 3px dotted rgb(180,10,10);
	padding-right: .5ex;
}
/** time picker */
/* css for timepicker */
.ui-timepicker-div .ui-widget-header { margin-bottom: 8px; }
.ui-timepicker-div dl { text-align: left; }
.ui-timepicker-div dl dt { height: 25px; margin-bottom: -25px; }
.ui-timepicker-div dl dd { margin: 0 10px 10px 65px; }
.ui-timepicker-div td { font-size: 90%; }
.ui-tpicker-grid-label { background: none; border: none; margin: 0; padding: 0; }

.ui-timepicker-rtl{ direction: rtl; }
.ui-timepicker-rtl dl { text-align: right; }
.ui-timepicker-rtl dl dd { margin: 0 65px 10px 10px; }
#outer {
padding-top:1em;
	box-sizing:border-box;


	margin:0 auto;
	width:100%;
	height:100%;
	background-color:#fff;
	/* overflow:hidden; */
}
INPUT.error, TEXTAREA.error {
   border:1px inset red;
   background-color:#FFDADA;
}

