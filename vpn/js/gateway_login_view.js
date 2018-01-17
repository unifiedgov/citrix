rdx.gateway_login_view = function(parent, view_definition, resource, base_view)
{   
    this._base_view = base_view;
    this._parent = parent;
        
    this._DEFAULT_PROPERTIES =
    {
    };
 
 
};
rdx.gateway_login_view.prototype.make_view = function()
{
	this._base_view.set_crumb_handler("") ;
	
	//start header code
	var header_row1= $("<tr></tr>").attr("id","row1").append($("<td></td>").attr("class","header_left"));
	var header_row2 = $("<tr></tr>").attr("id","row2").append($("<td></td>").attr({"colspan":"2","class":"navbar"}));
	var header_table = $("<table></table>").attr("class","full_width").append(header_row1,header_row2);
	var logonbelt_topshadow= $("<div></div>").attr('id','logonbelt-topshadow');
	logonbelt_topshadow.append(header_table);
	//end header code
	//generic logonbox markup:can be used on majority gateway pages
	var authentication = $("<div></div>").attr('id','authentication');
	
	
	var logonbox_container = $("<div></div>").attr('id','logonbox-container');
	var logonbelt_bottomshadow = $("<div></div>").attr('id','logonbelt-bottomshadow');
	
	var logonbox_innerbox = $("<div></div>").attr('id','logonbox-innerbox');
	var logonbox_logoarea = $("<div></div>").attr('id','logonbox-logoarea');
	var logonbox_logonform = $("<div></div>").attr({'id':'logonbox-logonform','class':'clearfix'});
	var logoimage = logonbox_logoarea.append($("<div></div>").attr('id','logonbox-logoimage'));
	
	authentication.append(logonbelt_topshadow,logonbox_container,logonbelt_bottomshadow);
	logonbox_container.append(logonbox_innerbox);
	logonbox_innerbox.append(logonbox_logoarea,logonbox_logonform);
	this._parent.append(authentication);
	switch(window.location.pathname)
	{
	case "/epa/epa.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("epa_view"));
		break;
	}
	case "/vpn/index.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("gateway_login_form_view"));
		break;
	}
	case "/vpn/":  //handling this exception case, since server doesnt redirect to index.html for this pathname.
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("gateway_login_form_view"));
		break;
	}
	case "/vpn/tmindex.html":
	{
        $("#logonbox-logoarea").addClass("NS-AAA");
        $(".header_left").addClass("NS-AAA");
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("tmindex_view"));
		break;
	}
	case "/vpns/postepa.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("postepa_view"));
		break;		
	}
	case "/epa/posterrorpage.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("epa_errorpage_view"));
		break;
	}
	case "/epa/errorpage.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("epa_errorpage_view"));
		break;
	}
	case "/vpns/f_ndisagent.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("vpn_process_view"));
		break;
	}
	case "/vpns/f_services_linux.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("vpn_process_linux_view"));
		break;
	}
	case "/vpns/m_services.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("vpn_process_mac_view"));
		break;
	}
	case "/vpns/f_services.html":
	{
		var box_view = new rdx.base_view(logonbox_logonform, rdx.utils.get_view("services_view"));
		break;
	}
	
		}
	
	logonbox_logonform.append(box_view);
	var login_footer=$("<div style='text-align:center;color:white;font-size:15px;'><br> Any new Modern Desktop Password MUST be at least 12 characters. <br>  <br> It will need to include characters from at least three of the four following categories: <br>   -  uppercase letters <br>  -  lowercase letters <br>  -  numbers <br>  -  special characters, for example: ~!@#$%^&*_-+' |(){}[];:<>,.?<br><br> For further information on password rules -  <br> <a style='text-alighn:center;color:white;text-decoration:underline' href=https://desktop.unifiedgov.co.uk/vpn/PasswordPolicy.html>CLICK HERE</a></div>").appendTo(logonbox_container);box_view.prepare_view();
	
};

rdx.gateway_login_view.prototype.get_callback_data = function()
{
    return {};  
};
