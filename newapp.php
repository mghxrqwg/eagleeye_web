<?php
include "config.php";

$path = "../application/controllers/";
$viewpath = "../application/views/";
$viewFile = $viewpath.$moduleName."_home.tpl.html";
$controllerFile = $path.$moduleName.".php";
$assetsDir = "../assets/".$moduleName."/";

exec('rm ../application/controllers/test.php&rm ../application/views/test_home.tpl.html&rm -rf ../assets/test');
if (file_exists($path)) {
    if (file_exists($viewpath)) {
        if (file_exists($viewFile)) {
            echo $viewFile."已经存在,请重命名您 的模块名称\n";
        } else {
            echo $viewFile."文件不存在,可创建\n";
            if (file_exists($controllerFile)) {
                echo $controllerFile."文件已存在,请重命名您的模块名称\n";
            } else {
                echo $controllerFile."文件不存在,可创建\n";
                if (file_exists($assetsDir)) {
                    echo $assetsDir."目录已存在,请重命名您 的模块名称\n";    
                } else {
                    echo $assetsDir."目录不存在,可创建\n";    
                    echo "检查完毕,可以创建模块名为".$moduleName."的平台\n请稍等正在修改配置文件...\n";
                    $sh = "cp ./src/tmp_home.tpl.html ".$viewFile."&cp ./src/tmp.php ".$controllerFile."&mkdir ".$assetsDir."&cp -r ./src/tmp/* ".$assetsDir;

                    //echo $sh;
                    exec($sh, $res, $rc);
                    if ($rc == 0) {
                        exec("sed -i 's/tmp/".$moduleName."/g;s/###/".$title."/g' ".$controllerFile, $res, $rc);
                        if ($rc == 0) {
                            exec("sed -i 's/tmp/".$moduleName."/g' ".$viewFile, $res, $rc);
                            echo "新平台已搭建完成,访问地址为'鹰眼环境主机地址:端口/".$moduleName."'\n";
                        }
                    }
                }
            }
        }
    } else {
        echo "directory /application/views donnot exist";
    }
} else {
    echo "directory /application/controllers donnot exist";
}
?>
