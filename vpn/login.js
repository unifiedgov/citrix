var loginPrefilled = false;

function setCookie(name, value, expiry) { // use: setCookie("name", value, expiry);
		document.cookie=name + "=" + encodeURIComponent(value) + ";Secure; path=/; expires=" + expiry.toGMTString();
}
	
function UnsetCookie(cookieName) {
document.cookie=cookieName+"=nothing;expires=Thursday, 1 Jan 1970 00:00:00 GMT; path=/";
}
var pwc = ns_getcookie("pwcount");
function ns_check(event)
{
	var login = document.forms['vpnForm'].login.value;
	var passwd = document.forms['vpnForm'].passwd.value;
	if(login == "") {
		window.alert(_("You need to enter login name"));
		event.preventDefault();
		return;
	}
	if (passwd == "") {
		window.alert(_("You need to enter passwd"));
		event.preventDefault();
		return;
	}
	return true;
}

function ns_disperrmsg(field_errormsg)
{
   var vpnerrCookieVal = ns_getcookie("NSC_VPNERR");
   if( !(isNaN(vpnerrCookieVal)) && (vpnerrCookieVal >= "4001") && (vpnerrCookieVal <= _("errorMessageLabelMax"))) {
	
	//var left_errormsg =  $("<div>").addClass('left');
	var error_container = $("<div>").attr({"class":"error","id":"feedbackStyle"});
	var msg = _(_("errorMessageLabelBase") + vpnerrCookieVal);
	var errormsg = $("<span>").attr("id","errorMessageLabel").text(msg);
	field_errormsg.append(error_container.append(errormsg));
		
	UnsetCookie("NSC_VPNERR");
	return field_errormsg;
   }
}

UnsetCookie("NSC_USER");
function ns_getcookie(name)
{
   var cookie=document.cookie;
   if(cookie.length > 0) {
        begin=cookie.indexOf(name+"=");
        if(begin!=-1) {
                begin+=name.length+1;
                end=cookie.indexOf(";", begin);
                if(end==-1) end=cookie.length;
                return decodeURIComponent(cookie.substring(begin, end));
        }
   }
   return null;
}
function ns_fillName()
{
   var value=ns_getcookie("NSC_NAME");
   var mutable=ns_getcookie("NSC_NAME1");

   if(mutable!=null) {
	document.vpnForm.login.value = mutable;
	document.vpnForm.login.style.color = "#777";
	document.vpnForm.passwd.focus();
   } else if(value!=null) {
	document.vpnForm.login.value = value;
	loginPrefilled = true;
	document.vpnForm.login.readOnly = true;
	document.vpnForm.login.style.color = "#777";
	document.vpnForm.passwd.focus();
   } else
   	document.vpnForm.login.focus();

}
function loginFieldCheck()
{
	if(loginPrefilled == true)
	{
		$("[id='Enter user name']").blur();
		$('#passwd').focus();
	}
}

function clean_name_cookie()
{
	UnsetCookie("NSC_NAME");
	UnsetCookie("NSC_NAME1");
	UnsetCookie("pwcount");
	UnsetCookie("eula");
	UnsetCookie("userDomains");
}
