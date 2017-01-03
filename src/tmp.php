<?php
if ( ! defined('BASEPATH')) {
    exit('No direct script access allowed');
}    
date_default_timezone_set("Asia/Chongqing");

/**
 * angular单页面入口文件
 */
class tmp extends CI_Controller {
    private $log;
    private $result = null;
    private $userId = 'nobody';

    public function __Construct(){
        parent::__Construct();
        //init log
        require_once(dirname(dirname(__FILE__)).'/log4php/Logger.php');
        Logger::configure(dirname(dirname(__FILE__)).'/log4php/config.xml');
        $this->log = Logger::getLogger(__CLASS__);
        //init cas
        $this->load->helper('constant');
        $this->load->model('uvpv_model', 'uvpv');
        casValidate();
        $user = phpCAS::getUser();
        $this->userId = str_replace("@baidu.com","",$user);
        $this->baseurl = getBaseurl();
    }

    public function index() {
        $this->cismarty->assign('baseurl',$this->baseurl);
		$this->cismarty->assign('username',$this->userId);
        $this->cismarty->assign('title', '###');
		$username = $this->userId;
		$cookie = isset($_COOKIE["BAIDUID"]) ? $_COOKIE["BAIDUID"] : $username;
        $this->cismarty->display("tmp_home.tpl.html");
    }
    public function uvpvPost() {
        $page = $this->input->get('page');
        $username = $this->userId;
        $trade = $this->input->get('trade');
        $cookie = isset($_COOKIE["BAIDUID"]) ? $_COOKIE["BAIDUID"] : $username;
        $uvpv = $this->uvpv->curlMethod($trade, $page, $cookie, $username);
    }
    public function getUvpvLine() {
        $data = $this->uvpv->getWeekAvg();
        echo json_encode($data);
    }
}
