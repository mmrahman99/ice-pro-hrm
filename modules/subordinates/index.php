<?php 
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

$moduleName = 'subordinates';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';
$fieldNameMap = BaseService::getInstance()->getFieldNameMappings("Employee");
$customFields = BaseService::getInstance()->getCustomFields("Employee");
?><div class="span9">
			  
	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabSubordinate" href="#tabPageSubordinate">Subordinates</a></li>
	</ul>
	 
	<div class="tab-content">
		<div class="tab-pane active" id="tabPageSubordinate">
			<div id="Subordinate" class="reviewBlock" data-content="List" style="padding-left:5px;">
		
			</div>
			<div id="SubordinateForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">
		
			</div>
		</div>
	</div>

</div>
<script>
var modJsList = new Array();
modJsList['tabSubordinate'] = new SubordinateAdapter('Employee','Subordinate',{"supervisor":"__myid__"},'');
modJsList['tabSubordinate'].setShowAddNew(false);
modJsList['tabSubordinate'].setShowDelete(false);
modJsList['tabSubordinate'].setFieldNameMap(<?=json_encode($fieldNameMap)?>);
modJsList['tabSubordinate'].setCustomFields(<?=json_encode($customFields)?>);
var modJs = modJsList['tabSubordinate'];

</script>
<?php include APP_BASE_PATH.'footer.php';?>      