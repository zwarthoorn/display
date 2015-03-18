<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax_controller extends CI_Controller {

	public function ajax_view()
	{
		$this->load->view('ajax/view');
	}

	public function getMessage($id)
	{
		$this->load->model("messages");
		$result = $this->messages->getMessageId($id);

		echo json_encode($result);
	}

	public function postMessage()
	{
		$this->load->model("messages");
		$this->form_validation->set_rules('QuizName', 'QuizName', 'required');
		$temertje = $this->form_validation->error_string();
		if($this->form_validation->run() == true)
		{
			$this->messages->ajaxInsert();
			$returner = $this->messages->QuizOphaal();

			echo json_encode($returner);
		}else{
			echo $this->form_validation->error_string();
		}

	}
	public function QuizGet()
		{
			$this->load->model("messages");
			$returner = $this->messages->QuizOphaal();
			echo json_encode($returner);
		}
	public function QuizDelete()
	{
		$this->load->model("messages");
		$this->messages->DeleteQuiz();
		$this->QuizGet();
	}

		public function QuestionNumber()
		{


		}
	

}



/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */