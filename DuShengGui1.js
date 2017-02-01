/*
 * 心得: 1.定位问题:absolute 子元素是跟随父元素走的,所以切忌偏移位置 除非同级
    2.同源策略结论:
       1.ajax是严格遵守同源策略的。
       2.完成跨域访问文件,只要有src的都可以加载外部文件 img  script iframe
       但iframe加载进来的数据不可操作的,即不可用dom获取。而img只对图片解析.script只对js文件解析.此时要使用本地文本文件只有一种办法:js本质上可以看成json数据文件,虽然js文件是文件内部执行式(只开发执行命令的窗口,利用对象获取其绑定的数据是不能做的。)这时唯有利用dom把数据解析完毕返回页面即可，把解析的工作都放到js文件中。
       3.访问服务器端的数据,（同源策略外） 约定好格式后可以访问,这也是引用网络引用跨同源的解决方案。
       
     ajax访问的底层应该是 根据url请求数据 , 数据来到本机后,根据传入的函数名把json数据放到参数中。 其实浏览器中也可以内置相关功能,只是在更底层。无外接口
       
       终极解答跨域问题:其实就是在客户端新建一个函数    然后传给服务器       服务器新建一个js脚本 脚本中有函数的调用传值。   浏览器拿到脚本后执行就把值传到了客户端。
 * 
 */

/* 命名空间 */
var DuShengGUI = {};

/** *******内部调用的id******** */
var $ = function(id) {
	return document.getElementById(id);
};

/* 1. 自定义下拉列表控件 1.构造映射表 目标元素-链接元素 整合成名为DuShengGui空间的网页控件集合 */
/*
 * 元素映射表 var ele = { n1 : "na1" };
 */
/* xialaliebiao(ele); */

(function() {
	var xialaliebiao = function(ele) {
		/*
		 * 元素映射表 var ele = { n1 : "na1" }; <!-- 导航下拉列表测试 -->
		 * <ul class="nav" id="nav"> <li><a href="#" id="n1" style="border:
		 * solid 1px red;">sdsdf</a></li>
		 * <ul class="nav1" id="na1" style="border: solid 1px red;"> <li><a
		 * href="#">sdsdf</a></li> <li><a href="#">sdsdf</a></li> </ul>
		 * </ul> 1.注意样式上下的距离链接 例如:border可能造成鼠标覆盖范围断裂
		 * 2.lineheight设置后padding-bottom部分是不会计算进去的。 3.注意元素定位的特点,可能造成不适配
		 * 4:浮动对其也有很大影响,最好使用position+margin
		 */

		/* 状态码 1是显示 */
		window.onload = function() {
			var index;
			var index1;
			/* console.info(ele); */
			for ( var key in ele) {
				/* 闭包做缓存 */
				(function() {
					var ev = $(ele[key]);
					var k = $(key);
					/* console.info($(ele[key]) + "------" + key); */
					$(ele[key]).onmouseover = function(e) {
						index1 = 1;
						ev.style.display = "block";
						ev.style.backgroundColor = "white";
						k.style.backgroundColor = "white";
					};
				})();
				(function() {
					var ev = $(ele[key]);
					var k = $(key);

					$(key).onmouseover = function(e) {
						index = 1;
						ev.style.display = "block";
						ev.style.backgroundColor = "white";
						k.style.backgroundColor = "white";
					};
				})();

				(function() {
					var ev = $(ele[key]);
					var k = $(key);
					$(ele[key]).onmouseout = function(e) {
						index1 = 0;
						ev.style.display = "none";
						ev.style.backgroundColor = "buttonface";
						k.style.backgroundColor = "buttonface";
					};
				})();

				(function() {
					var ev = $(ele[key]);
					var k = $(key);
					$(key).onmouseout = function(e) {
						index = 0;
						ev.style.display = "none";
						ev.style.backgroundColor = "buttonface";
						k.style.backgroundColor = "buttonface";
					};
				})();

				/*
				 * function listener(ev, k) { console.info(index + "--" +
				 * index1); }
				 */
				/*
				 * Concurrent.Thread.create(function(index, index1) { while
				 * (true) { console.info(index + "--" + index1); if (index == 0 &&
				 * index1 == 0) { ev.style.display = "none";
				 * ev.style.backgroundColor = "buttonface";
				 * k.style.backgroundColor = "buttonface"; } } });
				 */

			}

		}
	};
	DuShengGUI.xialaliebiao = xialaliebiao;
})();

/* * ****************************************** */
/* 2 */
(function() {
	var getClassByName = function(name) {
		var list = document.getElementsByTagName("*");
		for ( var key in list) {
			if (list[key].className == name) {
				return list[key];
			}
		}
	}
	DuShengGUI.getClassByName = getClassByName;
})();
/* 3获取元素的绝对定位 */
// 获取某个html元素的定位
(function() {
	// 获取某个html元素的定位
	var GetPos = function(obj) {
		var pos = new Object();
		pos.x = obj.offsetLeft;
		pos.y = obj.offsetTop;
		while (obj = obj.offsetParent) {
			pos.x += obj.offsetLeft;
			pos.y += obj.offsetTop;
		}
		return pos;
	};
	DuShengGUI.GetPos = GetPos;
})();

/** *************************图片轮转***************** */
/** **imgUrl图片链接集合 srcDiv作用div 图片下标********** */
(function() {
	var lunzhuan = function(imgUrl, srcDiv, index) {
		/* window.onload = function() { */
		if (document.all) {
			window.attachEvent("onload", function() {
				/** *****清空加载前的动态效果图******** */
				$("yujiazai").style.display = "none";
				/** ****正式加载图片 ******** */
				$(srcDiv).style.backgroundImage = "url(" + imgUrl[index] + ")";
				/** ******图片上图标在图片加载后显示******* */
				$("yincang").style.display = "block";
				window.detachEvent("onload");
				/* zidong(); */
			});
		} else {
			window.addEventListener("load", function loadSetting() {
				/* alert("sdf"); */
				/** *****清空加载前的动态效果图******** */
				$("yujiazai").style.display = "none";
				console.info($("yujiazai"));
				$(srcDiv).style.backgroundImage = "url(" + imgUrl[index] + ")";
				/** ****正式加载图片 ******** */
				window.removeEventListener("load", loadSetting);
				$("yincang").style.display = "block";
				/* zidong(); */
			}, false);
		}

		function zidong(imgUrl, srcDiv, index) {
			/* console.info(imgUrl, srcDiv, index); */
			while (true) {
				var date = new Date().getTime();
				if (date % 5000 == 0) {
					if (index == (imgUrl.length - 1)) {
						$(srcDiv).style.backgroundImage = "url("
								+ imgUrl[index] + ")";
						index--;
					} else if (index >= 0 && index <= (imgUrl.length - 1)) {
						$(srcDiv).style.backgroundImage = "url("
								+ imgUrl[index] + ")";
						index++;
					}
				}
			}

		}
		/* setInterval(zidong, 5000); */
		Concurrent.Thread.create(zidong, imgUrl, srcDiv, index);

	}
	DuShengGUI.lunzhuan = lunzhuan;
})();
/** ***********获取class集合**************** 待深入 */
(function() {
	var $$ = function(className) {
		var clas;
		/*
		 * try { clas = document.getElementsByClassName(className); } catch (e) { }
		 */

		/* if (clas == undefined) { */
		var temp = document.getElementsByTagName("*");
		clas = [];
		for ( var key in temp) {
			if (temp[key].className == className) {
				clas.push(temp[key]);
			}
		}
		/* } */
		/* console.info(clas); */
		if (clas.length == 1) {
			return clas[0];
		} else {
			return clas;
		}
	}
	DuShengGUI.$$ = $$;
})();
/** *********浏览器版本判定******SB google不认为-1为false** * */
(function() {
	var browerVersion = function() {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		console.info(navigator.userAgent);
		if (window.ActiveXObject)
			Sys.ie = ua.match(/msie ([\d.]+)/)[1]
		else if ((ua.indexOf("firefox") == -1) ? false : true)
			Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
		else if (window.MessageEvent && !document.getBoxObjectFor)
			Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
		else if (window.opera)
			Sys.opera = ua.match(/opera.([\d.]+)/)[1]
		else if (window.openDatabase)
			Sys.safari = ua.match(/version\/([\d.]+)/)[1];
		// 以下进行测试
		if (Sys.ie)
			return 'IE: ' + Sys.ie;
		if (Sys.firefox)
			return 'Firefox: ' + Sys.firefox;
		if (Sys.chrome)
			return 'Chrome: ' + Sys.chrome;
		if (Sys.opera)
			return 'Opera: ' + Sys.opera;
		if (Sys.safari)
			return 'Safari: ' + Sys.safari;
	}
	DuShengGUI.browerVersion = browerVersion;
})();
/** **音频长度和模拟进度条匹配算法******* */
function match(borderRadius, player, position) {
	var currentTime = Math.round($(player).currentTime);
	var temp = $(player).currentTime;
	var duration = $(player).duration;
	var distance = parseInt(getComputedStyle($(borderRadius)).width);

	/** **速度匹配start* 弃用**** */
	/*
	 * $(player).defaultPlaybackRate = 1.0; var time = $(player).duration; var
	 * distance = parseInt(getComputedStyle($(borderRadius)).width); var speed =
	 * distance / time; speed=speed*3;
	 */
	/** *每秒步进speed的距离,每三秒步进一次**** */
	/** **速度匹配end***** */

	/** *拉进时偏移位置的匹配 和步进的距离 关联video真实时间距离**** */
	var offsetPosition = temp / duration * distance;
	console.info(offsetPosition);

	/** 设置偏移 以时间为单位**** */
	console.info(position);
	var child = $(position).firstChild;
	if (child) {
		$(position).removeChild(child);
	}
	var minute = 00, second = 00;
	if (currentTime >= 60) {
		minute = "0" + parseInt(currentTime / 60);
		second = currentTime % 60;
	} else {
		second = currentTime;
	}
	if (second < 10) {
		second = "0" + second;
	}
	$(position).appendChild(document.createTextNode(minute + ":" + second));
	return offsetPosition;
}
/** **进度条自移动 ****** */
function selfMove(prograssBar, wp_processBtn, borderRadius, player, position) {
	/* console.info(prograssBar, wp_processBtn); */
	var width;
	var left;
	if (document.all) {
		width = parseInt($(prograssBar).currentStyle.width);
		left = parseInt($(wp_processBtn).currentStyle.left);
	} else {
		width = parseInt(getComputedStyle($(prograssBar)).width);
		left = parseInt(getComputedStyle($(wp_processBtn)).left);
	}

	width = match(borderRadius, player, position);
	$(prograssBar).style.width = width + "px";
	left = match(borderRadius, player, position);
	$(wp_processBtn).style.left = left + 'px';
}

/** *****************进度条**************************** */
(function() {
	/*
	 * <!--拖拽控件 --> <div class="borderRadius" id="borderRadius"> <div
	 * class="prograssBar" id="prograssBar"></div> <!--拖拽按钮--> <a
	 * href="javascript:void(0);" class="schedule_btn" id="wp_processBtn"></a>
	 * </div> direction 用来指示控件的方向 panel 竖直方向时的外框 position 结果输出位置
	 */
	var processBar = function(borderRadius, prograssBar, wp_processBtn,
			borderRadiusWidth, direction, panel, position, player) {
		/* alert(position); */
		var number;
		/*
		 * console.info(borderRadius, prograssBar, wp_processBtn,
		 * borderRadiusWidth, direction, panel);
		 */
		var processBarga = function() {
			/* alert("df1"); */
			var $ = function(id) {
				return document.getElementById(id);
			}
			/* 获取borderRadius在整个网页中的位置 */
			function getElePos(eleId) {
				var obj = {};
				var left = $(eleId).offsetLeft;
				var top = $(eleId).offsetTop;
				/* console.info(left); */
				var parentNode = $(eleId).parentNode;
				while (parentNode.tagName != "BODY") {
					top += parentNode.offsetTop;
					left += parentNode.offsetLeft;
					parentNode = parentNode.parentNode;
				}
				obj.left = left;
				obj.top = top;
				return obj;
			}
			if (document.all) {/* 未完善 */
				$(wp_processBtn).attachEvent("onmousedown", function() {
					$(wp_processBtn).attachEvent("onmousemove", move);
				});
				function move(e) {
					var ex = e ? e : (window.event ? window.event : null);
					var x = ex.x ? ex.x : (ex.pageX ? ex.pageX : null);
					/* alert(x); */
					/* $("prograssBar"). */
				}
				window.attachEvent("onmouseup", function() {
					$(wp_processBtn).detchEvent("onmousemove", move);
				});
			} else {
				/* **** 自移动 * ****** */
				/**
				 * *1.试图使用音乐播放的速度 结合进度条比例来确定进度条自移动效果 同时利用线程交互
				 * 把点击事件的值传入concurrent线程中,但是线程始终停止不下来。*****
				 */
				/*
				 * *
				 * *2.进度条的移动是根据video中的进度条位置来确定的,意味着暂停后video的进度条不动,则当前页面concurrent线程中不断修改,样式的进度条也是不动的。但也可能线程占用太厉害,修改只是暂时的,立马又变了回去,此方法无效
				 * 。*****************************
				 */
				/* console.info($(player).playbackRate); */
				/*
				 * Concurrent.Thread.create(selfMove, prograssBar,
				 * wp_processBtn); function selfMove(prograssBar, wp_processBtn) {
				 * var width = parseInt(getComputedStyle($(prograssBar)).width);
				 * var left = parseInt(getComputedStyle($(wp_processBtn)).left);
				 * while (true) { console.info(width); width += 0.0001;
				 * $(prograssBar).style.width = width + "px";
				 * 
				 * left += 0.0001; $(wp_processBtn).style.left = left+'px';
				 * if(width){ } } }
				 *//***********************************************************
					 * /****3.使用js引擎的setInteral线程
					 **********************************************************/
				/* selfMove(prograssBar, wp_processBtn); */

				/* alert("sdf");以下是拖拽 和跳动 */
				$(wp_processBtn)
						.addEventListener("mousedown", startMove, false);

				function startMove(e) {
					if (direction == "horizontal") {
						window.addEventListener("mousemove", move, false);
					} else if (direction == "vertical") {
						/* alert("ssss"); */
						if (panel) {
							if (panel == window) {
								/* alert("ffff"); */
								window.addEventListener("mousemove", move,
										false);
							} else {
								/* alert(panel); */
								$(panel).addEventListener("mousemove", move,
										false);
							}
						}
					}
				}
				/* screenX:屏幕左上角 pageX网页左上角 clientX网页可视区域的左上角与滚动条有关 */
				function move(e) {
					var ex = e ? e : (window.event ? window.event : null);
					reset(ex, direction);

				}
				/* 鼠标松开时 */
				$(wp_processBtn).addEventListener("mouseup", function() {
					end(position, player);
				}, false);
				console.info(position + "---");
				function end(position, player) {
					console.info(position + "-+-");
					console.info($(position) + "0-0-");
					/** *松开时对position中的时间做重设start*** */
					var temp = $(position).firstChild;
					if (temp) {
						$(position).removeChild(temp);
					}
					var currentTime = Math.round($(player).currentTime);
					var minute = 00, second = 00;
					if (currentTime >= 60) {
						minute = "0" + parseInt(currentTime / 60);
						second = currentTime % 60;
					} else {
						second = currentTime;
					}
					if (second < 10) {
						second = "0" + second;
					}
					$(position).appendChild(
							document.createTextNode(minute + ":" + second));
					/** *松开时对position中的时间做重设end*** */
					window.removeEventListener("mousemove", move);
				}
				/* 水平方向 */
				window.addEventListener("mouseup", function() {
					window.removeEventListener("mousemove", move);
				}, false);
				/* 垂直方向 */

				if (panel) {
					if (panel == window) {
						window.addEventListener("mouseup", function() {
							window.removeEventListener("mousemove", move);
						}, false);
					} else {
						$(panel).addEventListener("mouseup", function() {
							$(panel).removeEventListener("mousemove", move);
						}, false);
					}
				}

				/* borderRadius绑定点击事件 点击跳点 */
				$(borderRadius).addEventListener("mousedown", function(e) {
					var ex = e ? e : (window.event ? window.event : null);
					reset(ex, direction);
				}, false);

				/* 具体操作函数 direction horizontal vertical */
				function reset(ex, direction) {
					/* console.info(ex, direction); */
					/*
					 * 别用x,因为它会相对于当前框的外框变化 var x = ex.x ? ex.x : (ex.pageX ?
					 * ex.pageX : null); var y = ex.y ? ex.y : (ex.pageY ?
					 * ex.pageY : null);
					 */
					var x = ex.pageX ? ex.pageX : null;
					var y = ex.pageY ? ex.pageY : null;
					if (direction == "horizontal") {
						/* 可复用代码,重建函数 start debuilder */
						var obj = getElePos(borderRadius);
						var eleLeft = obj.left;
						/* console.info(eleLeft); */
						/* console.info(x); */
						/* 特别注意鼠标在元素中的位置问题 有可能焦点太小导致失去焦点状况,例如不能回拖 */
						var temp = x - eleLeft;
						/* 判断鼠标位置,防止超出 */
						/* console.info(temp+"-----"+borderRadiusWidth); */
						if (temp >= (parseInt(borderRadiusWidth) - 3)
								|| temp <= 3) {
							window.removeEventListener("mousemove", move);
							return;
						}
						/** ******元素坐标设置start********* */
						$(prograssBar).style.width = temp + "px";
						$(wp_processBtn).style.left = temp
								- $(wp_processBtn).offsetWidth / 2 + "px";
						/** ******元素坐标设置end********* */
						/** **设置音频的偏移start**** */
						var duration = $(player).duration;
						var currentTime = Math.round(temp
								/ parseInt(borderRadiusWidth) * duration);
						$(player).currentTime = currentTime;
						/** **设置音频的偏移end**** */
						/* console.info($(prograssBar).style.width); */
						/** ****number的数值处理start*******弃用 */
						/*
						 * number = temp - $(wp_processBtn).offsetWidth + 6;
						 * number = Math.ceil((number + 7) / 3); var duration =
						 * $(player).duration; var currentTime = (number / 100) *
						 * duration; console.info(currentTime);
						 * console.info(currentTime / 60); var date = new
						 * Date("yyyy,mth,dd,hh,mm,ss");
						 * date.setTime(currentTime * 1000); var outputTime; if
						 * (date.getSeconds() < 10) { outputTime = "0" +
						 * date.getMinutes() + ":" + "0" + date.getSeconds(); }
						 * else { outputTime = "0" + date.getMinutes() + ":" +
						 * date.getSeconds(); } $(player).currentTime =
						 * currentTime; var a =
						 * document.createTextNode(outputTime);
						 * console.info(position); var firstC =
						 * $(position).firstChild; if (firstC) {
						 * $(position).removeChild(firstC); }
						 * $(position).appendChild(a);
						 */
						/** ****number的数值处理end******* */
						/* 可复用代码,重建函数 end debuilder */
					} else if (direction == "vertical") {
						/* console.info(borderRadius); */
						/* alert("fff"); */
						var obj = getElePos(borderRadius);
						/*
						 * console.info($(borderRadius).offsetHeight,obj.top);
						 * console.info(y);
						 */

						if (y >= (parseInt(borderRadiusWidth) + obj.top + 3)
								|| y <= (obj.top + 3)) {
							/* console.info(y,borderRadiusWidth+obj.top+3); */
							if (panel) {
								if (panel == window) {
									window.removeEventListener("mousemove",
											move);
									return;
								} else {
									$(panel).removeEventListener("mousemove",
											move);
									return;
								}
							}
						}

						/* alert("sdf"); */
						$(prograssBar).style.height = y - obj.top + "px";
						/* console.info((y)); */
						/* console.info(y,obj.top); */
						$(wp_processBtn).style.top = y - obj.top + "px";
						/** ***填写垂直方向的 修改音量** */
						number = obj.top + parseInt(borderRadiusWidth) - y;
						console.info(position);
						var tempC = $(position).firstChild;
						if (tempC) {
							$(position).removeChild(tempC);
						}
						var number = (number + 2) * 2;
						if (number >= 100) {
							number = 100;
						}
						$(player).volume = number / 100;
						/*
						 * $(position)
						 * .appendChild(document.createTextNode(number));
						 */
					}
				}

			}
			if (document.all) {
				window.detachEvent("onload", processBarga);
			} else {
				window.removeEventListener("load", processBarga, false);
			}
		}
		/** 页面载入判断 *** */
		if (document.all) {
			window.attachEvent("onload", processBarga);
		} else {
			window.addEventListener("load", processBarga, false);
		}
	}
	DuShengGUI.processBar = processBar;
})();
/** **************页面载入判断******************* */
(function() {
	var load = function(functionName) {
		if (document.all) {
			window.attachEvent("onload", functionName);
		} else {
			window.addEventListener("load", functionName, false);
		}
	}
	DuShengGUI.load = load;
})();

/** ************双控开关按钮***************** */
/** *******一个元素对另外一个元素控制 另外一个元素也可对本元素控制********************* */
(function() {
	var OffOn = function(idName1, idName2, player, prograssBar, wp_processBtn,
			borderRadius, position) {

		var OffOn1 = function() {
			var interval = setInterval(function() {
				selfMove(prograssBar, wp_processBtn, borderRadius, player,
						position);
			}, 3000);
			var $ = function(id) {
				return document.getElementById(id);
			}
			if (document.all) {
				$(idName1).attachEvent("onclick", function() {
					$(idName1).style.display = "none";
					$(idName2).style.display = "block";
				});
				$(idName2).attachEvent("onclick", function() {
					$(idName2).style.display = "none";
					$(idName1).style.display = "block";
				});
			} else {
				$(idName1).addEventListener("click", function() {
					$(idName1).style.display = "none";
					$(idName2).style.display = "block";
					$(player).pause();
					clearInterval(interval);
					/* console.info(Concurrent.Thread.self()); */

				});
				$(idName2).addEventListener(
						"click",
						function() {
							$(idName2).style.display = "none";
							$(idName1).style.display = "block";
							$(player).play();
							interval = setInterval(function() {
								selfMove(prograssBar, wp_processBtn,
										borderRadius, player, position);
							}, 3000);
							/*
							 * Concurrent.Thread.self().sleep
							 * .$Concurrent_Thread_compiled();
							 */
							/* selfMove("prograssBar-x", "wp_processBtn-x"); */
						});
			}

			/** *对音频的结束控制 * */
			if (document.all) {
                $(player).attachEvent("ended",function(){
                	clearInterval(interval);
                });
			} else {
				$(player).addEventListener("ended", function() {
					clearInterval(interval);
					/** ***对显示的进度条控件复位***** */

				}, false);
			}
		}
		DuShengGUI.load(OffOn1);
	}
	DuShengGUI.OffOn = OffOn;
})();
/** ************单控开关按钮**一个元素对另外一个元素的控制*************** */
(function() {
	var OffToOn = function(ele1, ele2) {
		var OffToOn1 = function() {
			var $ = function(id) {
				return document.getElementById(id);
			}
			if (document.all) {
				$(ele1).attachEvent("onclick", function() {
					var temp = ($(ele2)).currentStyle.display;
					/* console.info(temp); */
					/* console.info(temp=="block"); */
					if (temp == "block") {
						/* console.info("1111"); */
						$(ele2).style.display = "none";
						/* $(ele1).style.backgroundColor = "gray"; */
					} else {
						$(ele2).style.display = "block";
						/* $(ele1).style.backgroundColor = "red"; */
					}
				});
			} else {
				$(ele1).addEventListener("click", function() {
					var temp = getComputedStyle($(ele2)).display;
					/* console.info(temp); */
					/* console.info(temp=="block"); */
					if (temp == "block") {
						/* console.info("1111"); */
						$(ele2).style.display = "none";
						$(ele1).firstChild.nodeValue = "展开";
						/* $(ele1).style.backgroundColor = "gray"; */
					} else {
						$(ele2).style.display = "block";
						$(ele1).firstChild.nodeValue = "隐藏";
						/* $(ele1).style.backgroundColor = "red"; */
					}
				});

			}
		}
		DuShengGUI.load(OffToOn1);
	}
	DuShengGUI.OffToOn = OffToOn;
})();

/* 英文切换插件ele1 被绑定的父类 ele2切入的元素 ele3播放器元素 ele4 图片位置元素 */
(function() {
	var handover = function(ele1, ele2, ele3, ele4, obj) {
		var $ = function(id) {
			return document.getElementById(id);
		}
		var handover1 = function() {
			$(ele1).onclick = function(e) {
				var ex = e ? e : (window.event ? window.event : null);
				var src = ex.srcElement ? ex.srcElement
						: (ex.target ? ex.target : null);
				var name = src.name;
				var title = src.title;
				$(ele2).src = name;
				$(ele4).style.backgroundImage = "url(" + title + ")";
				$(ele3).load();
				$(obj.prograssBar).style.width = 0;
				$(obj.wp_processBtn).style.left = 0;
			}
		}
		if (document.all) {
			window.attachEvent("onload", handover1);
		} else {
			window.addEventListener("load", handover1, false);
		}
	}
	DuShengGUI.handover = handover;
})();

// 滚动条插件
// Ie(onmousewheel window.event.wheelDelta（下负上正） attachEvent
// $("one").currentStyle.top)
// firefox(DOMMouseScroll event.detail(上负下正 ) getComputedStyle($("one")).top)
// chrome (mousewheel 下负上正)
/* var mousewheel = document.all ? "onmousewheel" :() "DOMMouseScroll"; */
(function() {
	var $ = function(id) {
		return document.getElementById(id);
	}
	var Wheel = function(ele) {
		if (window.all) {
			window.attachEvent("onload", Iewheel);
		} else {
			window.addEventListener("load", otherWheel, false);
		}
		function Iewheel() {
			$(ele).attachEvent("onmousewheel", function(event) {
				console.info(event.wheelDelta + "----");
				console.info(event.x);
				// 火狐中的
				/* console.info(); */
				// Ie中的 currentStyle
				var top = parseInt($("one").currentStyle.top);
				console.info(top);
				top += 1;
				$(ele).style.top = top + "px";
			});
		}

		function otherWheel() {
			var brower = DuShengGUI.browerVersion().toLowerCase();
			console.info(brower);
			if ((brower.indexOf('firefox') == -1) ? false : true) {
				$(ele).addEventListener("DOMMouseScroll", function(event) {
					console.info(event.detail + "----");
					var top = parseInt(getComputedStyle($("one")).top);
					console.info(top);
					top += 1;
					$("one").style.top = top + "px";
				}, false);
			} else if ((brower.indexOf('chrome') > -1) ? true : false) {
				$(ele).addEventListener("mousewheel", function(event) {
					console.info(event.wheelDelta + "----");
					var top = parseInt(getComputedStyle($("one")).top);
					console.info(top);
					top += 1;
					$("one").style.top = top + "px";
				}, false);
			}
		}

	}
	DuShengGUI.Wheel = Wheel;
})();
// $("two").onclick = function(e) {
// onclick说明书 之坐标
// Ie window.event x
// firefox e pageX
// chrome e pageX
/* console.info(e.pageX); */
// console.info(window.event.pageX);
// }
