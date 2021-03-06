<?php
/*
 Copyright (c) 2018 [Glacies UG, Berlin, Germany] (http://glacies.de)
 Developer: Thilina Hasantha (http://lk.linkedin.com/in/thilinah | https://github.com/thilinah)
 */

$moduleName = 'fieldnames';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';
?><div class="span9">

	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
        <li class="active"><a id="tabEmployeeFieldName" href="#tabPageEmployeeFieldName"><?=t('Employee Field Names')?></a></li>
    </ul>

	<div class="tab-content">
        <div class="tab-pane active" id="tabPageEmployeeFieldName">
            <div id="EmployeeFieldName" class="reviewBlock" data-content="List" style="padding-left:5px;">

            </div>
        </div>
	</div>

</div>
<script>
var modJsList = [];

modJsList['tabEmployeeFieldName'] = new FieldNameAdapter('FieldNameMapping','EmployeeFieldName',{"type":"Employee"});
modJsList['tabEmployeeFieldName'].setRemoteTable(true);
modJsList['tabEmployeeFieldName'].setShowDelete(false);
modJsList['tabEmployeeFieldName'].setShowAddNew(false);


var modJs = modJsList['tabEmployeeFieldName'];

</script>
<?php include APP_BASE_PATH.'footer.php';?>
