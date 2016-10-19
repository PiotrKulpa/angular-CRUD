<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Customeradd extends CI_Controller {
	 
	 public function __construct()
	{
		parent::__construct();
		$this->load->model('Crud_model');
	}
	
	public function index()
	{
		
		$this->Crud_model->add();
			
		
	}
}
