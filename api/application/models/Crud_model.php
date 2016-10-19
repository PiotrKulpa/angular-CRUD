<?php
class Crud_model extends CI_Model {

        public function __construct()
        {
            parent::__construct();
			$this->load->database();
        }
		
		public function add(){
			$indata = json_decode(file_get_contents('php://input'));
			
			try
			{
				if(isset($indata)){
					//Przechwytuje dane POST
					
					$Username = $indata->Username;
					$First_name = $indata->First_Name;
					$Last_name = $indata->Last_Name;
					$Email = $indata->Email;
					$Status = $indata->Status;
					//Query Builder Class automatycznie wykonuje Escaping Queries
					$data = array(
					'Username' => $Username,
					'First_name' => $First_name,
					'Last_name' => $Last_name,
					'Email' => $Email,
					'Status' => $Status
					);

					$this->db->insert('customers', $data);	
				}
			}
			catch(mysqli_sql_exception $e)
			{
				echo '{"error":{"text":'. $e->errorMessage() .'}}';
				echo 'Błąd';
			}
		}
		
		public function customerListModel()
		{
			
			
			try
			{
				$sql = 'SELECT * FROM customers';
				$query = $this->db->query($sql);
				// Fetch the result array from the result object and return it
				$result = json_encode($query->result());
				echo '{"records": ';
				echo $result;
				echo '}';
			}
			catch(mysqli_sql_exception $e)
			{
				echo '{"error":{"text":'. $e->errorMessage() .'}}';
			}
		}
		
		public function customerEditModel($id)
		{
			
			try
			{
				$sql = "SELECT * FROM customers WHERE id='$id'";
				$query = $this->db->query($sql);
				// Fetch the result array from the result object and return it
				$result = json_encode($query->result());
				echo '{"records": ';
				echo $result;
				echo '}';
			}
			catch(mysqli_sql_exception $e)
			{
				echo '{"error":{"text":'. $e->errorMessage() .'}}';
			}
		}
		
		public function update($id){
			$indata = json_decode(file_get_contents('php://input'));
			
			try
			{
				if(isset($indata)){
					//Przechwytuje dane POST
					
					$Username = $indata->Username;
					$First_name = $indata->First_Name;
					$Last_name = $indata->Last_Name;
					$Email = $indata->Email;
					$Status = $indata->Status;
					//Query Builder Class automatycznie wykonuje Escaping Queries
					$data = array(
					'Username' => $Username,
					'First_name' => $First_name,
					'Last_name' => $Last_name,
					'Email' => $Email,
					'Status' => $Status
					);
					
					$this->db->where('id', $id);
					$this->db->update('customers', $data);
	
				}
			}
			catch(mysqli_sql_exception $e)
			{
				echo '{"error":{"text":'. $e->errorMessage() .'}}';
			}
		}
		
		public function deleteModel($id)
		{
			try
			{
				$this->db->delete('customers', array('id' => $id));
			}
			catch(mysqli_sql_exception $e)
			{
				echo '{"error":{"text":'. $e->errorMessage() .'}}';
			}
	
		}

}