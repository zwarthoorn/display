<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	/**
	* 
	*/
	class Quistions extends  CI_Model
	{
		
		function __construct()
		{
			$this->load->database();
		}
		public function GetQuestion()
		{
			$this->db->select($_POST['QuizId']);
			$this->db->from('vragen');
			$this->db->join('antwoorden', 'antwoorden.vragen_id = vragen.id');
			$this->db->get();

		}
		public function InsertQuestion()
		{
			$this->db->insert('vragen',array('vraag'=>$_POST['Question'],'vraagnummer'=>intval($_POST['Questionnum']),'quiz_id'=>intval($_POST['Quiz_id'])));
			return $this->db->insert_id();
		}
		public function getLastInserted()
		{
			
		}
		public function getOnlyQuestionAll()
		{
			$querry = $this->db->get_where('vragen',array('quiz_id'=>intval($_POST['QuizId'])));
			$result = $querry->result_array();

			return $result;
		}
		public function insertAwnsers($questionId,$antwoord)
		{
			$this->db->insert('antwoorden',array('antwoord'=>$antwoord,'vragen_id'=>$questionId));
		}
	}
?>
