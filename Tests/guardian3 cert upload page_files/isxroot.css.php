
:root {
--isx-chkbtn-bg: #ffa500 !important ;
--isx-chkbtn-fg: #000000 !important ;
--isx-chkbtn-bg_map: #ffa500 !important ;
--isx-chkbtn-fg_map: #000000 !important ;
--isx-chkbtn-bg_dark: #ffa500 !important ;
--isx-chkbtn-fg_dark: #000000 !important ;
--isx-chkbtn-animation: none !important ;
--isx-chkbtn-fontweight: normal !important ;

--isx-tlow-bg: #add8e6 !important ;
--isx-tlow-fg: #000000 !important ;
--isx-tlow-bg_map: #add8e6 !important ;
--isx-tlow-fg_map: #000000 !important ;
--isx-tlow-bg_dark: #add8e6 !important ;
--isx-tlow-fg_dark: #000000 !important ;
--isx-tlow-animation: none !important ;
--isx-tlow-fontweight: normal !important ;

--isx-thigh-bg: #ff8681 !important ;
--isx-thigh-fg: #000000 !important ;
--isx-thigh-bg_map: #ff8681 !important ;
--isx-thigh-fg_map: #000000 !important ;
--isx-thigh-bg_dark: #ff8681 !important ;
--isx-thigh-fg_dark: #000000 !important ;
--isx-thigh-animation: none !important ;
--isx-thigh-fontweight: normal !important ;

--isx-tnet-bg: #333333 !important ;
--isx-tnet-fg: #cccccc !important ;
--isx-tnet-bg_map: #333333 !important ;
--isx-tnet-fg_map: #cccccc !important ;
--isx-tnet-bg_dark: #333333 !important ;
--isx-tnet-fg_dark: #cccccc !important ;
--isx-tnet-animation: none !important ;
--isx-tnet-fontweight: normal !important ;

--isx-tlink-bg: #333333 !important ;
--isx-tlink-fg: #cccccc !important ;
--isx-tlink-bg_map: #333333 !important ;
--isx-tlink-fg_map: #cccccc !important ;
--isx-tlink-bg_dark: #333333 !important ;
--isx-tlink-fg_dark: #cccccc !important ;
--isx-tlink-animation: none !important ;
--isx-tlink-fontweight: normal !important ;

--isx-tsleep-bg: #99aabb !important ;
--isx-tsleep-fg: #333333 !important ;
--isx-tsleep-bg_map: #99aabb !important ;
--isx-tsleep-fg_map: #333333 !important ;
--isx-tsleep-bg_dark: #99aabb !important ;
--isx-tsleep-fg_dark: #333333 !important ;
--isx-tsleep-animation: none !important ;
--isx-tsleep-fontweight: normal !important ;

--isx-tnorm-bg: #98fb98 !important ;
--isx-tnorm-fg: #000000 !important ;
--isx-tnorm-bg_map: #98fb98 !important ;
--isx-tnorm-fg_map: #000000 !important ;
--isx-tnorm-bg_dark: #98fb98 !important ;
--isx-tnorm-fg_dark: #000000 !important ;
--isx-tnorm-animation: none !important ;
--isx-tnorm-fontweight: normal !important ;

--isx-door-bg: #cc0000 !important ;
--isx-door-fg: #333333 !important ;
--isx-door-bg_map: #cc0000 !important ;
--isx-door-fg_map: #333333 !important ;
--isx-door-bg_dark: #cc0000 !important ;
--isx-door-fg_dark: #333333 !important ;
--isx-door-animation: none !important ;
--isx-door-fontweight: normal !important ;

--isx-tsen-bg: #333333 !important ;
--isx-tsen-fg: #cccccc !important ;
--isx-tsen-bg_map: #333333 !important ;
--isx-tsen-fg_map: #cccccc !important ;
--isx-tsen-bg_dark: #333333 !important ;
--isx-tsen-fg_dark: #cccccc !important ;
--isx-tsen-animation: none !important ;
--isx-tsen-fontweight: normal !important ;

--isx-tdis-bg: #bbbbbb !important ;
--isx-tdis-fg: #333333 !important ;
--isx-tdis-bg_map: #bbbbbb !important ;
--isx-tdis-fg_map: #333333 !important ;
--isx-tdis-bg_dark: #bbbbbb !important ;
--isx-tdis-fg_dark: #333333 !important ;
--isx-tdis-animation: none !important ;
--isx-tdis-fontweight: normal !important ;

--isx-tretired-bg: #888888 !important ;
--isx-tretired-fg: #333333 !important ;
--isx-tretired-bg_map: #888888 !important ;
--isx-tretired-fg_map: #333333 !important ;
--isx-tretired-bg_dark: #888888 !important ;
--isx-tretired-fg_dark: #333333 !important ;
--isx-tretired-animation: none !important ;
--isx-tretired-fontweight: normal !important ;

--isx-travel-bg: #8899bb !important ;
--isx-travel-fg: #333333 !important ;
--isx-travel-bg_map: #8899bb !important ;
--isx-travel-fg_map: #333333 !important ;
--isx-travel-bg_dark: #8899bb !important ;
--isx-travel-fg_dark: #333333 !important ;
--isx-travel-animation: none !important ;
--isx-travel-fontweight: normal !important ;

 --isx-font-size: 90%;

}
.chkbtn {
			 background-color: var( --isx-chkbtn-bg) !important; 
			 color: var( --isx-chkbtn-fg) !important;

			animation: animchkbtn 1s linear infinite ;
			 animation-name: var( --isx-chkbtn-animation,animchkbtn );
			 font-weight: var( --isx-chkbtn-fontweight);
			}
svg .chkbtn,svg .chkbtnoff  {
			fill: var( --isx-chkbtn-bg_map) !important;
			stroke: var( --isx-chkbtn-fg_map) !important;
			font-weight: var( --isx-chkbtn-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .chkbtnoff {
			opacity: .5;
		}
svg .animate-chkbtn, svg .animate .chkbtn {
			opacity:.8; animation: animchkbtn 1s linear infinite ;
		}
.darkmode .chkbtn {
			background-color: var( --isx-chkbtn-bg_dark) !important;
			color: var( --isx-chkbtn-fg_dark) !important;
			animation-name: var( --isx-chkbtn-animation);
			font-weight: var( --isx-chkbtn-fontweight);
		}
table  .chkbtn {
			animation: none !important;
			opacity: .9;
		} .tlow {
			 background-color: var( --isx-tlow-bg) !important; 
			 color: var( --isx-tlow-fg) !important;

			animation: animtlow 1s linear infinite ;
			 animation-name: var( --isx-tlow-animation,animtlow );
			 font-weight: var( --isx-tlow-fontweight);
			}
svg .tlow,svg .tlowoff  {
			fill: var( --isx-tlow-bg_map) !important;
			stroke: var( --isx-tlow-fg_map) !important;
			font-weight: var( --isx-tlow-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .tlowoff {
			opacity: .5;
		}
svg .animate-tlow, svg .animate .tlow {
			opacity:.8; animation: animtlow 1s linear infinite ;
		}
.darkmode .tlow {
			background-color: var( --isx-tlow-bg_dark) !important;
			color: var( --isx-tlow-fg_dark) !important;
			animation-name: var( --isx-tlow-animation);
			font-weight: var( --isx-tlow-fontweight);
		}
table  .tlow {
			animation: none !important;
			opacity: .9;
		} .thigh {
			 background-color: var( --isx-thigh-bg) !important; 
			 color: var( --isx-thigh-fg) !important;

			animation: animthigh 1s linear infinite ;
			 animation-name: var( --isx-thigh-animation,animthigh );
			 font-weight: var( --isx-thigh-fontweight);
			}
svg .thigh,svg .thighoff  {
			fill: var( --isx-thigh-bg_map) !important;
			stroke: var( --isx-thigh-fg_map) !important;
			font-weight: var( --isx-thigh-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .thighoff {
			opacity: .5;
		}
svg .animate-thigh, svg .animate .thigh {
			opacity:.8; animation: animthigh 1s linear infinite ;
		}
.darkmode .thigh {
			background-color: var( --isx-thigh-bg_dark) !important;
			color: var( --isx-thigh-fg_dark) !important;
			animation-name: var( --isx-thigh-animation);
			font-weight: var( --isx-thigh-fontweight);
		}
table  .thigh {
			animation: none !important;
			opacity: .9;
		} .tnet {
			 background-color: var( --isx-tnet-bg) !important; 
			 color: var( --isx-tnet-fg) !important;

			animation: animtnet 1s linear infinite ;
			 animation-name: var( --isx-tnet-animation,animtnet );
			 font-weight: var( --isx-tnet-fontweight);
			}
svg .tnet,svg .tnetoff  {
			fill: var( --isx-tnet-bg_map) !important;
			stroke: var( --isx-tnet-fg_map) !important;
			font-weight: var( --isx-tnet-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .tnetoff {
			opacity: .5;
		}
svg .animate-tnet, svg .animate .tnet {
			opacity:.8; animation: animtnet 1s linear infinite ;
		}
.darkmode .tnet {
			background-color: var( --isx-tnet-bg_dark) !important;
			color: var( --isx-tnet-fg_dark) !important;
			animation-name: var( --isx-tnet-animation);
			font-weight: var( --isx-tnet-fontweight);
		}
table  .tnet {
			animation: none !important;
			opacity: .9;
		} .tlink {
			 background-color: var( --isx-tlink-bg) !important; 
			 color: var( --isx-tlink-fg) !important;

			animation: animtlink 1s linear infinite ;
			 animation-name: var( --isx-tlink-animation,animtlink );
			 font-weight: var( --isx-tlink-fontweight);
			}
svg .tlink,svg .tlinkoff  {
			fill: var( --isx-tlink-bg_map) !important;
			stroke: var( --isx-tlink-fg_map) !important;
			font-weight: var( --isx-tlink-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .tlinkoff {
			opacity: .5;
		}
svg .animate-tlink, svg .animate .tlink {
			opacity:.8; animation: animtlink 1s linear infinite ;
		}
.darkmode .tlink {
			background-color: var( --isx-tlink-bg_dark) !important;
			color: var( --isx-tlink-fg_dark) !important;
			animation-name: var( --isx-tlink-animation);
			font-weight: var( --isx-tlink-fontweight);
		}
table  .tlink {
			animation: none !important;
			opacity: .9;
		} .tsleep {
			 background-color: var( --isx-tsleep-bg) !important; 
			 color: var( --isx-tsleep-fg) !important;

			animation: animtsleep 1s linear infinite ;
			 animation-name: var( --isx-tsleep-animation,animtsleep );
			 font-weight: var( --isx-tsleep-fontweight);
			}
svg .tsleep,svg .tsleepoff  {
			fill: var( --isx-tsleep-bg_map) !important;
			stroke: var( --isx-tsleep-fg_map) !important;
			font-weight: var( --isx-tsleep-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .tsleepoff {
			opacity: .5;
		}
svg .animate-tsleep, svg .animate .tsleep {
			opacity:.8; animation: animtsleep 1s linear infinite ;
		}
.darkmode .tsleep {
			background-color: var( --isx-tsleep-bg_dark) !important;
			color: var( --isx-tsleep-fg_dark) !important;
			animation-name: var( --isx-tsleep-animation);
			font-weight: var( --isx-tsleep-fontweight);
		}
table  .tsleep {
			animation: none !important;
			opacity: .9;
		} .tnorm {
			 background-color: var( --isx-tnorm-bg) !important; 
			 color: var( --isx-tnorm-fg) !important;

			animation: animtnorm 1s linear infinite ;
			 animation-name: var( --isx-tnorm-animation,animtnorm );
			 font-weight: var( --isx-tnorm-fontweight);
			}
svg .tnorm,svg .tnormoff  {
			fill: var( --isx-tnorm-bg_map) !important;
			stroke: var( --isx-tnorm-fg_map) !important;
			font-weight: var( --isx-tnorm-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .tnormoff {
			opacity: .5;
		}
svg .animate-tnorm, svg .animate .tnorm {
			opacity:.8; animation: animtnorm 1s linear infinite ;
		}
.darkmode .tnorm {
			background-color: var( --isx-tnorm-bg_dark) !important;
			color: var( --isx-tnorm-fg_dark) !important;
			animation-name: var( --isx-tnorm-animation);
			font-weight: var( --isx-tnorm-fontweight);
		}
table  .tnorm {
			animation: none !important;
			opacity: .9;
		} .door {
			 background-color: var( --isx-door-bg) !important; 
			 color: var( --isx-door-fg) !important;

			animation: animdoor 1s linear infinite ;
			 animation-name: var( --isx-door-animation,animdoor );
			 font-weight: var( --isx-door-fontweight);
			}
svg .door,svg .dooroff  {
			fill: var( --isx-door-bg_map) !important;
			stroke: var( --isx-door-fg_map) !important;
			font-weight: var( --isx-door-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .dooroff {
			opacity: .5;
		}
svg .animate-door, svg .animate .door {
			opacity:.8; animation: animdoor 1s linear infinite ;
		}
.darkmode .door {
			background-color: var( --isx-door-bg_dark) !important;
			color: var( --isx-door-fg_dark) !important;
			animation-name: var( --isx-door-animation);
			font-weight: var( --isx-door-fontweight);
		}
table  .door {
			animation: none !important;
			opacity: .9;
		} .tsen {
			 background-color: var( --isx-tsen-bg) !important; 
			 color: var( --isx-tsen-fg) !important;

			animation: animtsen 1s linear infinite ;
			 animation-name: var( --isx-tsen-animation,animtsen );
			 font-weight: var( --isx-tsen-fontweight);
			}
svg .tsen,svg .tsenoff  {
			fill: var( --isx-tsen-bg_map) !important;
			stroke: var( --isx-tsen-fg_map) !important;
			font-weight: var( --isx-tsen-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .tsenoff {
			opacity: .5;
		}
svg .animate-tsen, svg .animate .tsen {
			opacity:.8; animation: animtsen 1s linear infinite ;
		}
.darkmode .tsen {
			background-color: var( --isx-tsen-bg_dark) !important;
			color: var( --isx-tsen-fg_dark) !important;
			animation-name: var( --isx-tsen-animation);
			font-weight: var( --isx-tsen-fontweight);
		}
table  .tsen {
			animation: none !important;
			opacity: .9;
		} .tdis {
			 background-color: var( --isx-tdis-bg) !important; 
			 color: var( --isx-tdis-fg) !important;

			animation: animtdis 1s linear infinite ;
			 animation-name: var( --isx-tdis-animation,animtdis );
			 font-weight: var( --isx-tdis-fontweight);
			}
svg .tdis,svg .tdisoff  {
			fill: var( --isx-tdis-bg_map) !important;
			stroke: var( --isx-tdis-fg_map) !important;
			font-weight: var( --isx-tdis-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .tdisoff {
			opacity: .5;
		}
svg .animate-tdis, svg .animate .tdis {
			opacity:.8; animation: animtdis 1s linear infinite ;
		}
.darkmode .tdis {
			background-color: var( --isx-tdis-bg_dark) !important;
			color: var( --isx-tdis-fg_dark) !important;
			animation-name: var( --isx-tdis-animation);
			font-weight: var( --isx-tdis-fontweight);
		}
table  .tdis {
			animation: none !important;
			opacity: .9;
		} .tretired {
			 background-color: var( --isx-tretired-bg) !important; 
			 color: var( --isx-tretired-fg) !important;

			animation: animtretired 1s linear infinite ;
			 animation-name: var( --isx-tretired-animation,animtretired );
			 font-weight: var( --isx-tretired-fontweight);
			}
svg .tretired,svg .tretiredoff  {
			fill: var( --isx-tretired-bg_map) !important;
			stroke: var( --isx-tretired-fg_map) !important;
			font-weight: var( --isx-tretired-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .tretiredoff {
			opacity: .5;
		}
svg .animate-tretired, svg .animate .tretired {
			opacity:.8; animation: animtretired 1s linear infinite ;
		}
.darkmode .tretired {
			background-color: var( --isx-tretired-bg_dark) !important;
			color: var( --isx-tretired-fg_dark) !important;
			animation-name: var( --isx-tretired-animation);
			font-weight: var( --isx-tretired-fontweight);
		}
table  .tretired {
			animation: none !important;
			opacity: .9;
		} .travel {
			 background-color: var( --isx-travel-bg) !important; 
			 color: var( --isx-travel-fg) !important;

			animation: animtravel 1s linear infinite ;
			 animation-name: var( --isx-travel-animation,animtravel );
			 font-weight: var( --isx-travel-fontweight);
			}
svg .travel,svg .traveloff  {
			fill: var( --isx-travel-bg_map) !important;
			stroke: var( --isx-travel-fg_map) !important;
			font-weight: var( --isx-travel-fontweight);
			opacity: .7;
			transition: opacity 1s, visibility 0.3s;
		}
		svg .traveloff {
			opacity: .5;
		}
svg .animate-travel, svg .animate .travel {
			opacity:.8; animation: animtravel 1s linear infinite ;
		}
.darkmode .travel {
			background-color: var( --isx-travel-bg_dark) !important;
			color: var( --isx-travel-fg_dark) !important;
			animation-name: var( --isx-travel-animation);
			font-weight: var( --isx-travel-fontweight);
		}
table  .travel {
			animation: none !important;
			opacity: .9;
		} 