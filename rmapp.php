<?php
include 'config.php';
exec('rm ../application/controllers/'.$moduleName.'.php&rm ../application/views/'.$moduleName.'_home.tpl.html&rm -rf ../assets/'.$moduleName, $res, $rc);
if ($rc == 0) {
    echo '平台'.$moduleName.'删除成功';
}
?>
