<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	class Quiz_controller extends CI_Controller {
		public function QuestionNumber()
		{
			$this->load->model("quistions");

			$calculate = $this->quistions->getOnlyQuestionAll();
			
			 if($calculate == null){
				echo "no";
			}else{
				echo count($calculate);
			} 
		}
		public function setQuestion()
			{
				$this->load->model("quistions");
				$int_idOfQuestion =  $this->quistions->InsertQuestion();
				$i = 0;
				while (array_key_exists(strval($i), $_POST)) {
					$this->quistions-> insertAwnsers($int_idOfQuestion,$_POST[strval($i)]);
					$i++;
				}
				
			}	
	}
	
?>