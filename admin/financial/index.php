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
Developer: Ahmed Alaa Hagag (thilina.hasantha[at]gmail.com / facebook.com/thilinah)
 */

$moduleName = 'Financial';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

?><div class="span9">
			  
	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabTaxes" href="#tabPageTaxes">Taxes</a></li>
		<li><a id="tabTaxesSegments" href="#tabPageTaxesSegments">Taxes Segments</a></li>
		<li><a id="tabBanks" href="#tabPageBanks">Banks</a></li>
		<li><a id="tabBanksBranches" href="#tabPageBanksBranches">Banks Branches</a></li>
	</ul>
	 
	<div class="tab-content">
		<div class="tab-pane active" id="tabPageTaxes">
			<div id="Taxes" class="reviewBlock" data-content="List" style="padding-left:5px;">
		
			</div>
			<div id="TaxesForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">
		
			</div>
		</div>
		<div class="tab-pane" id="tabPageTaxesSegments">
			<div id="TaxesSegments" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="TaxesSegmentsForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageBanks">
			<div id="Banks" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="BanksForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageBanksBranches">
			<div id="BanksBranches" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="BanksBranchesForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
	</div>

</div>
<script>
var modJsList = new Array();
modJsList['tabTaxes'] = new TaxesAdapter('Taxes');
modJsList['tabTaxesSegments'] = new TaxesSegmentsAdapter('TaxesSegments');
modJsList['tabBanks'] = new BanksAdapter('Banks');
modJsList['tabBanksBranches'] = new BanksBranchesAdapter('BanksBranches');
var modJs = modJsList['tabTaxes'];

</script>
<?php include APP_BASE_PATH.'footer.php';?>