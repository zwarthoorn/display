<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Messages extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
	}

	public function getMessages()
	{
		$query = $this->db->get('messages');

		return $query->result_array();
	}

	public function insert()
	{
		$this->db->insert('messages', array('author' => $this->input->post('author'), 'message' => $this->input->post('message')));
	}

	public function getMessageId($id)
	{
		$query = $this->db->get_where('messages', array('id' => $id));
		$result = $query->result_array();

		return $result;
	}

	public function ajaxInsert()
	{
		$this->db->insert('quiz', array('title' => $_POST['QuizName'],'users_idusers' => 6 , 'categorie' => 'test'));
	}
	public function QuizOphaal()
	{
		$querry = $this->db->order_by('title','asc')->get('quiz');
		$result = $querry->result_array();

		return $result; 
	}
	public function DeleteQuiz()
	{
		$this->db->delete('quiz', array('id'=>$_POST['QuizId']));
	}
}