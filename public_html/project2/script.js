var card = document.getElementById("card");

function testLength(value , length , exactLength ) {
	switch (exactLength) {
		case true:
			return (value.length == length ? true : false);
			break;
		case false:
			return (value.length >= length ? true : false);
			break;
	}
}

function testNumber(value) {
	return (isNaN(value) ? false : true);
}

function updateForm(control) {
	card = document.getElementById("card");
	var fn = document.getElementById("fn");
	var ln = document.getElementById("ln");
	var ad = document.getElementById("ad");
	var ct = document.getElementById("ct");
	var zp = document.getElementById("zp");
	var em = document.getElementById("em");
	var nc = document.getElementById("nc");
	var cn = document.getElementById("cn");
	var cv = document.getElementById("cv");
	var ss = document.getElementById("ss");
	var ed = document.getElementById("ed");
	var e2 = document.getElementById("e2");
	var pw = document.getElementById("pw");
	var fnl = document.getElementById("fnl");
	var lnl = document.getElementById("lnl");
	var adl = document.getElementById("adl");
	var ctl = document.getElementById("ctl");
	var zpl = document.getElementById("zpl");
	var eml = document.getElementById("eml");
	var ncl = document.getElementById("ncl");
	var cnl = document.getElementById("cnl");
	var cvl = document.getElementById("cvl");
	var ssl = document.getElementById("ssl");
	var edl = document.getElementById("edl");
	var e2l = document.getElementById("e2l");
	var pwl = document.getElementById("pwl");
	switch (card.checked) {
		case true:
			fn.setAttribute("required", "");
			fn.removeAttribute("disabled", "");
			ln.setAttribute("required", "");
			ln.removeAttribute("disabled", "");
			ad.setAttribute("required", "");
			ad.removeAttribute("disabled", "");
			ct.setAttribute("required", "");
			ct.removeAttribute("disabled", "");
			zp.setAttribute("required", "");
			zp.removeAttribute("disabled", "");
			em.setAttribute("required", "");
			em.removeAttribute("disabled", "");
			nc.setAttribute("required", "");
			nc.removeAttribute("disabled", "");
			cn.setAttribute("required", "");
			cn.removeAttribute("disabled", "");
			cv.setAttribute("required", "");
			cv.removeAttribute("disabled", "");
			ss.setAttribute("required", "");
			ss.removeAttribute("disabled", "");
			ed.setAttribute("required", "");
			ed.removeAttribute("disabled", "");
			e2.setAttribute("disabled", "");
			e2.removeAttribute("required", "");
			pw.setAttribute("disabled", "");
			pw.removeAttribute("required", "");
			fnl.style.display = "grid";
			lnl.style.display = "grid";
			adl.style.display = "grid";
			ctl.style.display = "grid";
			zpl.style.display = "grid";
			eml.style.display = "grid";
			ncl.style.display = "grid";
			cnl.style.display = "grid";
			cvl.style.display = "grid";
			ssl.style.display = "grid";
			edl.style.display = "grid";
			e2l.style.display = "none";
			pwl.style.display = "none";
			break;
		case false:
			fn.setAttribute("disabled", "");
			fn.removeAttribute("required", "");
			ln.setAttribute("disabled", "");
			ln.removeAttribute("required", "");
			ad.setAttribute("disabled", "");
			ad.removeAttribute("required", "");
			ct.setAttribute("disabled", "");
			ct.removeAttribute("required", "");
			zp.setAttribute("disabled", "");
			zp.removeAttribute("required", "");
			em.setAttribute("disabled", "");
			em.removeAttribute("required", "");
			nc.setAttribute("disabled", "");
			nc.removeAttribute("required", "");
			cn.setAttribute("disabled", "");
			cn.removeAttribute("required", "");
			cv.setAttribute("disabled", "");
			cv.removeAttribute("required", "");
			ss.setAttribute("disabled", "");
			ss.removeAttribute("required", "");
			ed.setAttribute("disabled", "");
			ed.removeAttribute("required", "");
			e2.removeAttribute("disabled", "");
			e2.setAttribute("required", "");
			pw.removeAttribute("disabled", "");
			pw.setAttribute("required", "");
			fnl.style.display = "none";
			lnl.style.display = "none";
			adl.style.display = "none";
			ctl.style.display = "none";
			zpl.style.display = "none";
			eml.style.display = "none";
			ncl.style.display = "none";
			cnl.style.display = "none";
			cvl.style.display = "none";
			ssl.style.display = "none";
			edl.style.display = "none";
			e2l.style.display = "grid";
			pwl.style.display = "grid";
			break;
	}
}

function validateControl(control, name, length) {
	if (!testLength(control.toString(), length, true)) {
		alert(name + " is the incorrect length.\nPlease enter " + length + " numbers");
		return false;
	} 
	if (!testNumber(control)) {
		alert(name + " must be a number");
		return false;
	}
	return true;
}

function validateCreditCard(value) {
	value = value.replace(/\s/g,'');
	switch (value.charAt(0)) {
		case '3':
			if (!testLength(value, 15, true)) {
				alert("Incorrect Credit Card Number Length");
				return false;
			}
			break;
		case '4':
		case '5':
		case '6':
			if (!testLength(value, 16, true)) {
				alert("Incorrect Credit Card Number Length");
				return false;
			}
			break;
		default:
			alert("Incorrect Credit Card Number");
			return false;
			break;
	}
	if (!testNumber(value)) {
		alert("Invalid Input for Credit Card Number");
		return false;
	}
	return true;
}

function validateDate(value) {
	var d = new Date();
	if (d.getFullYear() > Number(value.substr(0,4))) {
		alert("Credit Card is Expired");
		return false;
	} else if (d.getFullYear() == Number(value.substr(5,7))) {
		if (d.getMonth() < value.getMonth()) {
			return true;
		} else {
			alert("Credit Card is Expired");
			return false;
		}
	} else {
		return true;
	}
}

function validateEmail(value) {
	var x = value.indexOf("@");
	//test that the email address has an @ and that the first and last characters are letters
	if (x < 0 || value.charAt(0).toLowerCase() == value.charAt(0).toUpperCase() || value.charAt(value.length-1).toLowerCase() == value.charAt(value.length-1).toUpperCase()) {
		alert("Invalid Email Address");
		return false;
	}
	return true;
}

function validateForm() {
	card = document.getElementById("card");
	var zp = document.getElementById("zp");
	var em = document.getElementById("em");
	var nc = document.getElementById("nc");
	var cn = document.getElementById("cn");
	var cv = document.getElementById("cv");
	var ss = document.getElementById("ss");
	var ed = document.getElementById("ed");
	var e2 = document.getElementById("e2");
	var pw = document.getElementById("pw");
	var formValidated = true;
	switch (card.checked) {
		case true:
		
			formValidated = validateControl(zp.value, "Zip", 5);
			if (!formValidated) { break; }
			formValidated = validateEmail(em.value);
			if (!formValidated) { break; }
			formValidated = validateCreditCard(cn.value);
			if (!formValidated) { break; }
			formValidated = validateControl(cv.value, "CVV2/CVC", 3);
			if (!formValidated) { break; }
			formValidated = validateState(ss.value);
			if (!formValidated) { break; }
			formValidated = validateDate(ed.value);
			break;
		case false:
			formValidated = validateEmail(e2.value);
			if (!formValidated) { break; }
			formValidated = validatePassword(pw.value, 8);
			break;
	}
	if (formValidated) {
		alert("Payment Successful");
	}
	return formValidated;
}

function validatePassword(value, minLength) {
	if (!testLength(value, minLength, false)) {
		alert("Password too short.\nPassword must be minimum " + minLength + " characters");
		return false;	
	} else {
		return true;
	}
}

function validateState(value) {
	switch (value == "SS") {
		case true:
			alert("Please Select a State");
			return false;
			break;
		case false:
			return true;
			break;
	}
}

