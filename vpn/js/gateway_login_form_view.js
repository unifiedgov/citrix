rdx.gateway_login_form_view = function(parent, view_definition, resource, base_view)
{   
    this._base_view = base_view;
    this._parent = parent;
        
    this._DEFAULT_PROPERTIES =
    {
    };
    //this._properties = $.extend({}, this._DEFAULT_PROPERTIES, view_definition.view_properties);
    //this._form_controller = new rdx.form_controller(base_view, parent, true);
};

rdx.gateway_login_form_view.prototype.make_view = function()
{
	var cookie_action = ns_getcookie("NSC_TMAC"); 
	var action_url= '/cgi/login'; 
	if (cookie_action) { 
		action_url = '/cgi/tmlogin';
		UnsetCookie("NSC_TMAC");
	}	
	this._base_view.set_crumb_handler("") ;
	//creating Form elements markup
	var form = $("<form></form>").attr({method:'post',action: action_url ,name:'vpnForm',autocomplete:'off', style : 'magin:0',"id":"vpnForm"}).submit(function(event){send_Domain_Cookie(this); revertNames(); clean_name_cookie();ns_check(event);});
	var title = $("<div></div>").attr({'id':'ctl08_loginAgentCdaHeaderText2' , 'class' : 'CTX_ContentTitleHeader login_page'});
	var field_username = $("<div></div>").addClass('field clearfix').addClass('CredentialTypeusername');
	var left_user =  $("<div></div>").addClass('left');
	var left_pass =  $("<div></div>").addClass('left');
	var left_pass2 =  $("<div></div>").addClass('left');
	var right_user =  $("<div></div>").addClass('right');
	var right_pass =  $("<div></div>").addClass('right');
	var right_pass2 =  $("<div></div>").addClass('right');
	var username = $("<span></span>").addClass('plain input_labels form_text').attr("id","User_name");
	var enter_user = $("<input type='text'></input>").attr({'id':'Enter user name','class':'prePopulatedCredentials','autocomplete':'off', 'spellcheck' : 'false','name' :'login', 'size':'30', 'maxlength' : '127',"width":"180px","autofocus":true}).focus(function(){loginFieldCheck();});
	//The dummy username and password fields are added to confuse the browser and not let the autocomplete feature kick in(Since browsers dont honour the autocomplete=off attribute anymore). The browser searches for first password field and assumes the above filed to be username. SO the dummy username is below the original one and the dummy password field is above the original one. 
	var username_dummy =$("<input></input>").attr({"id":"dummy_username","name":"dummy_username","type":"text","style":"display:none"});
	var field_pass = $("<div></div>").addClass('field clearfix').addClass('CredentialTypepassword');
	var field_pass2 = $("<div></div>").addClass('field clearfix').addClass('CredentialTypepassword');
	var password1 = $("<span></span>").addClass('plain input_labels form_text').attr("id","Password");
	var password2 = $("<span></span>").addClass('plain input_labels form_text').attr("id","Password2");
	var enter_passwd = $("<input type='password'></input>").attr({'id':'passwd','class':'prePopulatedCredentials','autocomplete':'off', 'spellcheck' : 'false',  'name' :'passwd', 'size':'30', 'maxlength' : '127',"width":"180px"});
	var enter_passwd_dummy = $("<input type='password'></input>").attr({"id":"dummy_pass1","name":"dummy_pass1","style":"display:none"});
	var enter_passwd2 = $("<input type='password'></input>").attr({'id':'passwd1','class':'prePopulatedCredentials','autocomplete':'off', 'spellcheck' : 'false',  'name' :'passwd1', 'size':'30', 'maxlength' : '127',"width":"180px"});
	var enter_passwd2_dummy = $("<input type='password'></input>").attr({"id":"dummy_pass2","name":"dummy_pass2","style":"display:none"});
	
	//domain drop down markup
	var domain = ns_getcookie("userDomains");
	
	function create_drop_down(domain)
	{
		var field_domain = $("<div></div>").addClass('field clearfix');
		var left_domain = $("<div></div>").addClass('left');
		var domain_span = $("<span></span>").addClass('plain input_labels form_text').attr("id","domain");
		var right_domain =  $("<div></div>").addClass('right');
		var select = $('<select name="domainvalue"></select>').attr({"size":"1","class":"domain_select"});
		var domains = domain.split(',');
		for (j=0; j < domains.length ;j++)
		{
			var option = $("<option></option>").attr({"value":domains[j]}).text(domains[j]);
			select.append(option);
		}
		right_domain.append(select);
		field_domain.append(left_domain.append(domain_span),right_domain);
		return field_domain;
	}
	
	var today = new Date();
    var month_expiry = new Date(today.getTime() + 28 * 24 * 3600 * 1000); // plus 28 days
    var expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours
	function send_Domain_Cookie(form) {
		if(form.domainvalue)
		setCookie("domainvalue", form.domainvalue.value, month_expiry);
		return true;
    }
		
    var field_login=$("<div></div>").addClass('field').addClass('buttons');
	var eula_section = $("<div></div>").addClass("eula_check");
	var eula_check = $("<input type='checkbox'></input>").attr({"id":"eula_check","name":"eula_check"});
	var eula_agreement = $("<span></span>").attr({"class":"plain form_text","style":"padding-left: 5px;","id":"eula_agreement"});
	var terms = $('<a id="terms" class="plain form_text"></a>');

	
	var eula_div = $("<div></div>").attr({"class":"eula","id":"eula_div","style":"display:none;"});
	
	var header = $("<div></div>").addClass("header").append($("<div></div>").addClass("branding").append($("<div></div>").addClass("custom_logo")));
	var eula_title = $("<div></div>").attr({"class":"eula_title","id":"eula_title"});
	var agreement = $("<div></div>").attr({"class":"agreement form_text","id":"agreement"});
	var button_bar = $("<div></div>").attr({"class":"button_bar","id":"button_bar"});
	var back_button = $('<button type="button"></button>').attr({"id":"eulaback","class":"custombutton"});
	
	var maindiv = $("<div></div>").append(header,eula_title,agreement,button_bar);
	button_bar.append(back_button);
	eula_div.append(maindiv); 
	
	eula_section.append(eula_check,eula_agreement,terms);
	
	form.append(title,field_username,field_pass);
	field_username.append(left_user,right_user);
	username.appendTo(left_user);
	enter_user.appendTo(right_user);
	username_dummy.appendTo(right_user);
	field_pass.append(left_pass,right_pass);
	password1.appendTo(left_pass);
	enter_passwd_dummy.appendTo(right_pass);
	enter_passwd.appendTo(right_pass);
	field_pass2.append(left_pass2,right_pass2);
	password2.appendTo(left_pass2);
	enter_passwd2_dummy.appendTo(right_pass2);
	enter_passwd2.appendTo(right_pass2);
	if (pwc ==2)
	{
		form.append(field_pass2);
	}
	//append domain drop down after password fields
	if (domain){
		form.append(create_drop_down(domain));
	}
	
	var field_errormsg = $("<div></div>").addClass('field').addClass('CredentialTypenone');
	ns_disperrmsg(field_errormsg);
	form.append(field_errormsg);
	var left_loginbutton =$("<div></div>").addClass('left').appendTo(field_login);
	var right_loginbutton=$("<div></div>").addClass('right').appendTo(field_login);
	var Login = $("<input type='submit'></input>").attr({'id':'Log_On','value':'Log On','class':'custombutton login_page','disabled':'disabled'}).appendTo(right_loginbutton);
	
	eula_check.change(function(){
		if(this.checked){
		Login.removeAttr("disabled");
		}
		else
		Login.attr("disabled","disabled");
	});
	
	
	$(document).delegate("#terms","click",function()
							{	$("#authentication").addClass("override_height");
								$("#eula_div").show();
								$("#logonbox-container").hide();
							}
						);
		back_button.click(function(){
		eula_div.hide();
		$("#authentication").removeClass("override_height");
		$("#logonbox-container").show();
		resize();
	});			

	var eula_cookie = ns_getcookie("eula");
	
	if (eula_cookie)				// If eula hasnt been configured, Login button to be enabled and eula section not to be shown.
	{
	form.append(eula_section,field_login);
	this._parent.append(form);
	$("#authentication").append(eula_div);
    eula.Load();            //Load the eula strings depending on cookie value.
	}
	else{
	Login.removeAttr("disabled");
	form.append(field_login);
	this._parent.append(form);
	}
	
	changePage();           // Prefill names if cert auth
	Resources.Load(); 		//Load all string's globalized labels.
	loginFieldCheck();

};

rdx.gateway_login_form_view.prototype.get_callback_data = function()
{
    return {};  
};
