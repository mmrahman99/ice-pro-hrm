/*
This file is part of iCE Hrm.

iCE Hrm is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

iCE Hrm is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with iCE Hrm. If not, see <http://www.gnu.org/licenses/>.

------------------------------------------------------------------

Original work Copyright (c) 2012 [Gamonoid Media Pvt. Ltd]  
Developer: Thilina Hasantha (thilina.hasantha[at]gmail.com / facebook.com/thilinah)
 */

function EmployeeAdapter(endPoint) {
	this.initAdapter(endPoint);
    this.fieldNameMap = {};
    this.hiddenFields = {};
    this.tableFields = {};
    this.formOnlyFields = {};
    this.customFields = [];
}

EmployeeAdapter.inherits(AdapterBase);

this.currentUserId = null;

EmployeeAdapter.method('setFieldNameMap', function(fields) {
    var field;
    for(var i=0;i<fields.length;i++){
        field = fields[i];
        this.fieldNameMap[field.name] = field;
        if(field.display == "Hidden"){
            this.hiddenFields[field.name] = field;
        }else{
            if(field.display == "Table and Form"){
                this.tableFields[field.name] = field;
            }else{
                this.formOnlyFields[field.name] = field;
            }

        }
    }
});

EmployeeAdapter.method('setCustomFields', function(fields) {
	  var field, parsed;
	  for(var i=0;i<fields.length;i++){
	      field = fields[i];
	      if(field.display != "Hidden" && field.data != "" && field.data != undefined){
	    	  try{
	    		parsed = JSON.parse(field.data);
	    		if(parsed == undefined || parsed == null){
	    			continue;
	    		}else if(parsed.length != 2){
	    			continue;
	    		}else if(parsed[1].type == undefined || parsed[1].type == null){
	    			continue;
	    		}
	    		this.customFields.push(parsed);
	    	  }catch(e){
	    		  
	    	  }
	      }
	  }
	});

EmployeeAdapter.method('getDataMapping', function() {
	return [
	        "id",
	        "employee_id",
	        "first_name",
	        "last_name",
	        "mobile_phone",
	        "department",
	        "gender",
	        "supervisor"
	];
});

EmployeeAdapter.method('getHeaders', function() {
	return [
			{ "sTitle": "ID" },
			{ "sTitle": "Employee Number" },
			{ "sTitle": "First Name" },
			{ "sTitle": "Last Name"},
			{ "sTitle": "Mobile"},
			{ "sTitle": "Department"},
			{ "sTitle": "Gender"},
			{ "sTitle": "Supervisor"}
	];
});

EmployeeAdapter.method('getFormFields', function() {
	var fields, newFields = [];
	var employee_id, ssn_num, employment_status, job_title, pay_grade, joined_date, department, work_email, country, emergnecycontact;
	
	if(this.checkPermission("Edit Employee Number") == "Yes"){
		employee_id = [ "employee_id", {"label":"Employee Number","type":"placeholder","validation":""}];
	}else{
		employee_id = [ "employee_id", {"label":"Employee Number","type":"placeholder","validation":""}];
	}
	
	if(this.checkPermission("Edit EPF/CPF Number") == "Yes"){
		ssn_num = [ "ssn_num", {"label":"EPF/CPF/SS No","type":"placeholder","validation":"none"}];
	}else{
		ssn_num = [ "ssn_num", {"label":"EPF/CPF/SS No","type":"placeholder","validation":"none"}];
	}
	
	if(this.checkPermission("Edit Employment Status") == "Yes"){
		employment_status = [ "employment_status", {"label":"Employment Status","type":"placeholder","remote-source":["EmploymentStatus","id","name"]}];
	}else{
		employment_status = [ "employment_status", {"label":"Employment Status","type":"placeholder","remote-source":["EmploymentStatus","id","name"]}];
	}
	
	if(this.checkPermission("Edit Job Title") == "Yes"){
		job_title = [ "job_title", {"label":"Job Title","type":"placeholder","remote-source":["JobTitles","id","name"]}];
	}else{
		job_title = [ "job_title", {"label":"Job Title","type":"placeholder","remote-source":["JobTitles","id","name"]}];
	}
	
	if(this.checkPermission("Edit Pay Grade") == "Yes"){
		pay_grade = [ "pay_grade", {"label":"Pay Grade Level","type":"placeholder","allow-null":true,"remote-source":["PayGrades","id","name"]}];
	}else{
		pay_grade = [ "pay_grade", {"label":"Pay Grade Level","type":"placeholder","allow-null":true,"remote-source":["PayGrades","id","name"]}];
	}
	
	if(this.checkPermission("Edit Joined Date") == "Yes"){
		joined_date = [ "joined_date", {"label":"Joined Date","type":"placeholder","validation":""}];
	}else{
		joined_date = [ "joined_date", {"label":"Joined Date","type":"placeholder","validation":""}];
	}
	
	if(this.checkPermission("Edit Department") == "Yes"){
		department = [ "department", {"label":"Department","type":"placeholder","remote-source":["CompanyStructure","id","title"]}];
	}else{
		department = [ "department", {"label":"Department","type":"placeholder","remote-source":["CompanyStructure","id","title"]}];
	}
	
	if(this.checkPermission("Edit Work Email") == "Yes"){
		work_email = [ "work_email", {"label":"Work Email","type":"placeholder","validation":"email"}];
	}else{
		work_email = [ "work_email", {"label":"Work Email","type":"placeholder","validation":"emailOrEmpty"}];
	}
	
	if(this.checkPermission("Edit Country") == "Yes"){
		country = [ "country", {"label":"Country","type":"placeholder","remote-source":["Country","code","name"]}];
	}else{
		country = [ "country", {"label":"Country","type":"placeholder","remote-source":["Country","code","name"]}];
	}
    fields = [
	        employee_id,
		[ "id", {"label":"ID","type":"hidden","validation":""}],
		[ "employee_id", {"label":"Employee Number","type":"placeholder","validation":""}],
		[ "first_name", {"label":"First Name","type":"placeholder","validation":""}],
		[ "middle_name", {"label":"Middle Name","type":"placeholder","validation":"none"}],
		[ "last_name", {"label":"Last Name","type":"placeholder","validation":""}],
		[ "nationality", {"label":"Nationality","type":"placeholder","remote-source":["Nationality","id","name"]}],
		[ "birthday", {"label":"Date of Birth","type":"placeholder","validation":""}],
		[ "gender", {"label":"Gender","type":"placeholder","source":[["Male","Male"],["Female","Female"]]}],
		[ "marital_status", {"label":"Marital Status","type":"placeholder","source":[["Married","Married"],["Single","Single"],["Divorced","Divorced"],["Widowed","Widowed"],["Other","Other"]]}],
		[ "military_status", {"label":"Military Status","type":"placeholder","source":[["Completed","Completed"],["NotApplied","Not Applied"],["Exempted","Exempted"]]}],
		[ "id_number", {"label":"ID Number","type":"placeholder", "required":true }],
		[ "id_expdate", {"label":"ID Expire Date","type":"placeholder", "required":true }],
		[ "postal_code", {"label":"Postal/Zip Code","type":"placeholder","validation":"none"}],
		[ "home_phone", {"label":"Home Phone","type":"placeholder","validation":"none"}],
		[ "mobile_phone", {"label":"Mobile Phone","type":"placeholder","validation":"none"}],
		[ "work_phone", {"label":"Work Phone","type":"placeholder","validation":"none"}],
		[ "work_email", {"label":"Work Email","type":"placeholder","validation":"emailOrEmpty"}],
		[ "address1", {"label":"Address Line 1","type":"placeholder","validation":"none"}],
		[ "address2", {"label":"Address Line 2","type":"placeholder","validation":"none"}],
		[ "city", {"label":"City","type":"placeholder","validation":"none"}],
		[ "country", {"label":"Country","type":"placeholder","remote-source":["Country","code","name"]}],
		[ "province", {"label":"Province","type":"placeholder","allow-null":true,"null-label":'None',"remote-source":["Province","id","name"]}],
		[ "private_email", {"label":"Private Email","type":"placeholder","validation":"emailOrEmpty"}],
		[ "car_owner", {"label":"Car Owner?","type":"placeholder","validation":"","source":[["Yes","Yes"],["No","No"]]}],
		[ "driving_license", {"label":"Driving License No","type":"placeholder","validation":"none","name":"dl"}],
		[ "driving_license_exp_date", {"label":"License Exp Date","type":"placeholder","validation":"none"}],
		[ "bank_account", {"label":"Bank Account Number","type":"placeholder","validation":"none"}],
		[ "contract_startdate", {"label":"Contract Signature Date","type":"placeholder","require":true}],
		[ "contract_enddate", {"label":"Contract End Date","type":"placeholder","require":true}],
		[ "employment_status", {"label":"Employment Status","type":"placeholder","remote-source":["EmploymentStatus","id","name"]}],
		[ "job_title", {"label":"Job Title","type":"placeholder","remote-source":["JobTitles","id","name"]}],
		[ "salary", {"label":"Gross Salary","type":"placeholder"}],
		[ "work_station_id", {"label":"Work Station Id","type":"placeholder","validation":"none"}],
		[ "joined_date", {"label":"Joined Date","type":"placeholder","validation":""}],
		[ "department", {"label":"Department","type":"placeholder","remote-source":["CompanyStructure","id","title"]}],
		[ "supervisor", {"label":"Supervisor","type":"placeholder","allow-null":true,"remote-source":["Employee","id","first_name+last_name"]}],

	];
    
    for(var i=0;i<this.customFields.length;i++){
		fields.push(this.customFields[i]);
	}


    for(var i=0;i<fields.length;i++){
    	tempField = fields[i];
        if(this.hiddenFields[tempField[0]] == undefined || this.hiddenFields[tempField[0]] == null ){
            if(this.fieldNameMap[tempField[0]] != undefined && this.fieldNameMap[tempField[0]] != null){
                title = this.fieldNameMap[tempField[0]].textMapped;
                tempField[1]['label'] = title;
            }
            newFields.push(tempField);
        }
    }

    return newFields;
});

EmployeeAdapter.method('getSourceMapping' , function() {
	var k = this.sourceMapping ;
	k['supervisor'] = ["Employee","id","first_name+last_name"];
	return k;
});


EmployeeAdapter.method('get', function() {
	var that = this;
	var sourceMappingJson = JSON.stringify(this.getSourceMapping());
	
	var req = {"map":sourceMappingJson};
	var reqJson = JSON.stringify(req);
	
	var callBackData = [];
	callBackData['callBackData'] = [];
	callBackData['callBackSuccess'] = 'modEmployeeGetSuccessCallBack';
	callBackData['callBackFail'] = 'modEmployeeGetFailCallBack';
	
	this.customAction('get','modules_employees',reqJson,callBackData);
});

EmployeeAdapter.method('deleteProfileImage', function(empId) {
	var that = this;
	
	var req = {"id":empId};
	var reqJson = JSON.stringify(req);
	
	var callBackData = [];
	callBackData['callBackData'] = [];
	callBackData['callBackSuccess'] = 'modEmployeeDeleteProfileImageCallBack';
	callBackData['callBackFail'] = 'modEmployeeDeleteProfileImageCallBack';
	
	this.customAction('deleteProfileImage','modules_employees',reqJson,callBackData);
});

EmployeeAdapter.method('modEmployeeDeleteProfileImageCallBack', function(data) {
	top.location.href = top.location.href;
});

EmployeeAdapter.method('modEmployeeGetSuccessCallBack' , function(data) {
    var fields = this.getFormFields();
	var currentEmpId = data[1];
	var userEmpId = data[2];
	data = data[0];
	var html = this.getCustomTemplate('myDetails.html');

    for(var i=0;i<fields.length;i++) {
        if(this.fieldNameMap[fields[i][0]] != undefined && this.fieldNameMap[fields[i][0]] != null){
            title = this.fieldNameMap[fields[i][0]].textMapped;
            html = html.replace("#_label_"+fields[i][0]+"_#",title);
        }
    }

    html = html.replace(/#_.+_#/i,"");

	html = html.replace(/_id_/g,data.id);
	
	$("#"+this.getTableName()).html(html);

	for(var i=0;i<fields.length;i++) {
		$("#"+this.getTableName()+" #" + fields[i][0]).html(data[fields[i][0]]);
        $("#"+this.getTableName()+" #" + fields[i][0]+"_Name").html(data[fields[i][0]+"_Name"]);
	}
	
	var subordinates = "";
	for(var i=0;i<data.subordinates.length;i++){
		if(data.subordinates[i].first_name != undefined && data.subordinates[i].first_name != null){
			subordinates += data.subordinates[i].first_name+" ";
		}
		+data.subordinates[i].middle_name
		if(data.subordinates[i].middle_name != undefined && data.subordinates[i].middle_name != null && data.subordinates[i].middle_name != ""){
			subordinates += data.subordinates[i].middle_name+" ";
		}
		
		if(data.subordinates[i].last_name != undefined && data.subordinates[i].last_name != null && data.subordinates[i].last_name != ""){
			subordinates += data.subordinates[i].last_name;
		}
		subordinates += "<br/>";
	}
	
	$("#"+this.getTableName()+" #subordinates").html(subordinates);

	
	$("#"+this.getTableName()+" #name").html(data.first_name + " " + data.last_name);
	this.currentUserId = data.id;
	
	$("#"+this.getTableName()+" #profile_image_"+data.id).attr('src',data.image);
	
	if(this.checkPermission("Upload/Delete Profile Image") == "No"){
		$("#employeeUploadProfileImage").remove();
		$("#employeeDeleteProfileImage").remove();
	}
	
	if(this.checkPermission("Edit Employee Details") == "No"){
		$("#employeeProfileEditInfo").remove();
	}
	
	if(currentEmpId != userEmpId){
		$("#employeeUpdatePassword").remove();
	}
	
	this.cancel();
	this.getEmergencyContacts(data.id);
	this.getDepentants(data.id);
	this.getQualifications(data.id);
});

EmployeeAdapter.method('getEmergencyContacts', function(id) {
	var object = {"id":id};
	var reqJson = JSON.stringify(object);
	$.get(this.moduleRelativeURL, {'a': 'ca', 'req': id , 'mod': 'admin_employees', 'sa': 'getEmergencyContacts'}, function (callBackData) {
		console.log(callBackData);
		$("#EmergencyContact").html(callBackData);
	})
});

EmployeeAdapter.method('getQualifications', function(id) {
	var object = {"id":id};
	var reqJson = JSON.stringify(object);
	$.get(this.moduleRelativeURL, {'a': 'ca', 'req': id , 'mod': 'admin_employees', 'sa': 'getQualifications'}, function (callBackData) {
		console.log(callBackData);
		$("#Qualifications").html(callBackData);
	})
});

EmployeeAdapter.method('getDepentants', function(id) {
	var object = {"id":id};
	var reqJson = JSON.stringify(object);
	$.get(this.moduleRelativeURL, {'a': 'ca', 'req': id , 'mod': 'admin_employees', 'sa': 'getDepentants'}, function (callBackData) {
		console.log(callBackData);
		$("#Dependants").html(callBackData);
	})
});

EmployeeAdapter.method('modEmployeeGetFailCallBack' , function(data) {
	
});

EmployeeAdapter.method('editEmployee' , function() {
	this.edit(this.currentUserId);
});

EmployeeAdapter.method('changePassword', function() {
	$('#adminUsersModel').modal('show');
	$('#adminUsersChangePwd #newpwd').val('');
	$('#adminUsersChangePwd #conpwd').val('');
});

EmployeeAdapter.method('changePasswordConfirm', function() {
	$('#adminUsersChangePwd_error').hide();
	
	var passwordValidation =  function (str) {  
		var val = /^[a-zA-Z0-9]\w{6,}$/;  
		return str != null && val.test(str);  
	};
	
	var password = $('#adminUsersChangePwd #newpwd').val();
	
	if(!passwordValidation(password)){
		$('#adminUsersChangePwd_error').html("Password may contain only letters, numbers and should be longer than 6 characters");
		$('#adminUsersChangePwd_error').show();
		return;
	}
	
	var conPassword = $('#adminUsersChangePwd #conpwd').val();
	
	if(conPassword != password){
		$('#adminUsersChangePwd_error').html("Passwords don't match");
		$('#adminUsersChangePwd_error').show();
		return;
	}
	
	var req = {"pwd":conPassword};
	var reqJson = JSON.stringify(req);
	
	var callBackData = [];
	callBackData['callBackData'] = [];
	callBackData['callBackSuccess'] = 'changePasswordSuccessCallBack';
	callBackData['callBackFail'] = 'changePasswordFailCallBack';
	
	this.customAction('changePassword','modules_employees',reqJson,callBackData);
	
});

EmployeeAdapter.method('closeChangePassword', function() {
	$('#adminUsersModel').modal('hide');
});

EmployeeAdapter.method('changePasswordSuccessCallBack', function(callBackData,serverData) {
	this.closeChangePassword();
	this.showMessage("Password Change","Password changed successfully");
});

EmployeeAdapter.method('changePasswordFailCallBack', function(callBackData,serverData) {
	this.closeChangePassword();
	this.showMessage("Error",callBackData);
});




/*
 * Company Graph
 */

function CompanyStructureAdapter(endPoint) {
	this.initAdapter(endPoint);
}

CompanyStructureAdapter.inherits(AdapterBase);



CompanyStructureAdapter.method('getDataMapping', function() {
	return [
	        "id",
	        "title",
	        "address",
	        "type",
	        "country",
	        "parent"
	];
});

CompanyStructureAdapter.method('getHeaders', function() {
	return [
			{ "sTitle": "ID","bVisible":false },
			{ "sTitle": "Name" },
			{ "sTitle": "Address"},
			{ "sTitle": "Type"},
			{ "sTitle": "Country", "sClass": "center" },
			{ "sTitle": "Parent Structure"}
	];
});

CompanyStructureAdapter.method('getFormFields', function() {
	return [
	        [ "id", {"label":"ID","type":"hidden","validation":""}],
	        [ "title", {"label":"Name","type":"text","validation":""}],
	        [ "description", {"label":"Details","type":"textarea","validation":""}],
	        [ "address", {"label":"Address","type":"textarea","validation":"none"}],
	        [ "type", {"label":"Type","type":"select","source":[["Company","Company"],["Head Office","Head Office"],["Regional Office","Regional Office"],["Department","Department"],["Unit","Unit"],["Sub Unit","Sub Unit"],["Other","Other"]]}],
			[ "country", {"label":"Country","type":"select","remote-source":["Country","code","name"]}],
			[ "parent", {"label":"Parent Structure","type":"select","allow-null":true,"remote-source":["CompanyStructure","id","title"]}]
	];
});



function CompanyGraphAdapter(endPoint) {
	this.initAdapter(endPoint);
	this.nodeIdCounter = 0;
}

CompanyGraphAdapter.inherits(CompanyStructureAdapter);


CompanyGraphAdapter.method('convertToTree', function(data) {
	var ice = {};
	ice['id'] = -1;
	ice['title'] = '';
	ice['name'] = '';
	ice['children'] = [];
	
	var parent = null;
	
	var added = {};
	
	
	for(var i=0;i<data.length;i++){
		
		data[i].name = data[i].title;
		
		if(data[i].parent != null && data[i].parent != undefined){
			parent = this.findParent(data,data[i].parent);
			if(parent != null){
				if(parent.children == undefined || parent.children == null){
					parent.children = [];
				}
				parent.children.push(data[i]);
			}
		}
		
	}
	
	for(var i=0;i<data.length;i++){
		if(data[i].parent == null || data[i].parent == undefined){
			ice['children'].push(data[i]);
		}
	}
	
	return ice;
	
});


CompanyGraphAdapter.method('findParent', function(data, parent) {
	for(var i=0;i<data.length;i++){
		if(data[i].title == parent || data[i].title == parent){
			return data[i];
		}
	}
	return null;
});


CompanyGraphAdapter.method('createTable', function(elementId) {
	$("#tabPageCompanyGraph").html("");
	var that = this;
	var sourceData = this.sourceData;
	
	//this.fixCyclicParent(sourceData);
	var treeData = this.convertToTree(sourceData);
	
	var m = [20, 120, 20, 120],
    w = 5000 - m[1] - m[3],
    h = 1000 - m[0] - m[2],
    root;

	var tree = d3.layout.tree()
	    .size([h, w]);
	
	this.diagonal  = d3.svg.diagonal()
	    .projection(function(d) { return [d.y, d.x]; });
	
	this.vis = d3.select("#tabPageCompanyGraph").append("svg:svg")
	    .attr("width", w + m[1] + m[3])
	    .attr("height", h + m[0] + m[2])
	    .append("svg:g")
	    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
	
	  root = treeData;
	  root.x0 = h / 2;
	  root.y0 = 0;
	
	  function toggleAll(d) {
	    if (d.children) {
	      console.log(d.name);
	      d.children.forEach(toggleAll);
	      that.toggle(d);
	    }
	  }
	  this.update(root, tree, root);
	  
	  
	
});

CompanyGraphAdapter.method('update', function(source, tree, root) {
	var that = this;
	  var duration = d3.event && d3.event.altKey ? 5000 : 500;

	  // Compute the new tree layout.
	  var nodes = tree.nodes(root).reverse();

	  // Normalize for fixed-depth.
	  nodes.forEach(function(d) { d.y = d.depth * 180; });

	  // Update the nodes�
	  var node = that.vis.selectAll("g.node")
	      .data(nodes, function(d) { return d.id || (d.id = ++that.nodeIdCounter); });

	  // Enter any new nodes at the parent's previous position.
	  var nodeEnter = node.enter().append("svg:g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	      .on("click", function(d) { that.toggle(d); that.update(d, tree, root); });

	  nodeEnter.append("svg:circle")
	      .attr("r", 1e-6)
	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

	  nodeEnter.append("svg:text")
	      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
	      .attr("dy", ".35em")
	      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	      .text(function(d) { return d.name; })
	      .style("fill-opacity", 1e-6);

	  // Transition nodes to their new position.
	  var nodeUpdate = node.transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

	  nodeUpdate.select("circle")
	      .attr("r", 4.5)
	      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

	  nodeUpdate.select("text")
	      .style("fill-opacity", 1);

	  // Transition exiting nodes to the parent's new position.
	  var nodeExit = node.exit().transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	      .remove();

	  nodeExit.select("circle")
	      .attr("r", 1e-6);

	  nodeExit.select("text")
	      .style("fill-opacity", 1e-6);

	  // Update the links�
	  var link = that.vis.selectAll("path.link")
	      .data(tree.links(nodes), function(d) { return d.target.id; });

	  // Enter any new links at the parent's previous position.
	  link.enter().insert("svg:path", "g")
	      .attr("class", "link")
	      .attr("d", function(d) {
	        var o = {x: source.x0, y: source.y0};
	        return that.diagonal({source: o, target: o});
	      })
	    .transition()
	      .duration(duration)
	      .attr("d", that.diagonal);

	  // Transition links to their new position.
	  link.transition()
	      .duration(duration)
	      .attr("d", that.diagonal);

	  // Transition exiting nodes to the parent's new position.
	  link.exit().transition()
	      .duration(duration)
	      .attr("d", function(d) {
	        var o = {x: source.x, y: source.y};
	        return that.diagonal({source: o, target: o});
	      })
	      .remove();

	  // Stash the old positions for transition.
	  nodes.forEach(function(d) {
	    d.x0 = d.x;
	    d.y0 = d.y;
	  });
});

// Toggle children.
CompanyGraphAdapter.method('toggle', function(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
});


CompanyGraphAdapter.method('getSourceDataById', function(id) {

	for(var i=0; i< this.sourceData.length; i++){
		if(this.sourceData[i].id == id){
			return this.sourceData[i];
		}
	}
	
	return null;
	
});

CompanyGraphAdapter.method('fixCyclicParent', function(sourceData) {
	var errorMsg = "";
	for(var i=0; i< sourceData.length; i++){
		var obj = sourceData[i];
		
		
		var curObj = obj;
		var parentIdArr = {};
		parentIdArr[curObj.id] = 1;
		
		while(curObj.parent != null && curObj.parent != undefined){
			var parent = this.getSourceDataById(curObj.parent);
			if(parent == null){
				break;
			}else if(parentIdArr[parent.id] == 1){
				errorMsg = obj.title +"'s parent structure set to "+parent.title+"<br/>";
				obj.parent = null;
				break;
			}
			parentIdArr[parent.id] = 1;
			curObj = parent;
		}
	}
	
	if(errorMsg != ""){
		this.showMessage("Company Structure is having a cyclic dependency","We found a cyclic dependency due to following reasons:<br/>"+errorMsg);
		return false;
	}
	
	return true;
	
});

CompanyGraphAdapter.method('getHelpLink', function () {
	return 'http://blog.icehrm.com/?page_id=61';
});

