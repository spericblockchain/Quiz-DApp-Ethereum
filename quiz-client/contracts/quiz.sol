pragma solidity ^0.5.0;

contract quiz{
    //Variables
    address public university;
    uint public idProf = 0;
    uint public idStud = 0;
    uint public idQuest = 0;
    uint public idQuiz = 0;
    //Structures
    struct prof{
        uint profId;
        string name;
        string department;
        string phno;
        string email;
        address addr;
    }
    struct stud{
        uint studId;
        string name;
        uint batch;
        string phno;
        string email;
        address addr;
        mapping(uint=>uint) submit;
        mapping(uint=>uint) score;
    }
    //Mappings
    mapping(uint=>prof) public Professors;
    mapping(uint=>stud) public Students;
    mapping(uint=> string) answers;
    mapping(uint => string) public Quiz;
    mapping(uint=>string) public QuizName;
    mapping(uint => uint) public QuizBatch;
    mapping(uint => uint) public assignedProf;
    //Constructor
    constructor() public{
        university = msg.sender;
    }
    //Modifiers
    modifier onlyUniversity{
        require(msg.sender == university,"Only University can call this function.");
        _;
    }
    modifier onlyProfessors(uint _id){
        require(Professors[_id].addr == msg.sender,"Only Professors can call this function.");
        _;
    }
    modifier onlyUniProf(uint _id){
        require(Professors[_id].addr == msg.sender || msg.sender == university,"Only University or Professor can call this function.");
        _;
    }
    //Functions
    function addProfessor(string memory _name, string memory _department, string memory _phno, string memory _email, address _addr) public onlyUniversity {
        idProf++;
        Professors[idProf] = prof(idProf,_name,_department,_phno,_email,_addr);
    }
    function deleteProf(uint _profId) public {
        delete Professors[_profId];
    }
    function addStudent(string memory _name, uint _batch, string memory _phno, string memory _email, address _addr) public onlyUniversity{
        idStud++;
        Students[idStud] = stud(idStud,_name,_batch,_phno,_email,_addr);
    }
       function deleteStud(uint _studId) public onlyUniversity{
        delete Students[_studId];
    }
    // function createQuiz(uint _id, uint _batch, string memory _quiz, uint _answers) public onlyProfessors(_id){
    function createQuiz(uint _id, uint _batch, string memory _quiz, string memory _answers, string memory _quizName) public onlyProfessors(_id) {
        idQuiz++;
        Quiz[idQuiz] = _quiz;
        answers[idQuiz] = _answers;
        QuizBatch[idQuiz] = _batch;
        QuizName[idQuiz] = _quizName;
        assignedProf[idQuiz] = _id;
    }
    function deleteQuiz(uint _id, uint _quizId) public onlyProfessors(_id) {
        delete Quiz[_quizId];
        delete answers[_quizId];
        delete QuizBatch[_quizId];
        delete QuizName[_quizId];
        delete assignedProf[idQuiz];
    }
    function getQuiz(uint _profId, uint _id) public onlyUniProf(_profId) view returns(string memory quiz, uint batch, string memory quizName){
        quiz = Quiz[_id];
        batch = QuizBatch[_id];
        quizName = QuizName[_id];
    }
    function checkStudent() public view returns (uint status) {
        for (uint index = 1; index <= idStud; index++) {
            if (msg.sender == Students[index].addr) {
               return index;
             }
        }
        return 0;
    }
    function checkProfessor() public view returns (uint status) {
        for (uint index = 1; index <= idProf; index++) {
            if (msg.sender == Professors[index].addr) {
               return index;
             }
        }
        return 0;
    }
    function getAnswers(uint _id,uint _profId) public onlyUniProf(_profId) view returns(string memory answer) {
       answer = answers[_id];
    }
    function setScore(uint _quizId, uint _studId, uint _score) public onlyUniversity{
        Students[_studId].score[_quizId] =_score;
    }
    function setSubmit(uint _studId, uint _quizId) public onlyUniversity{
        Students[_studId].submit[_quizId] = 1;
    }
    function getSubmit(uint _studId, uint _quizId) public view returns (uint submit){
        submit = Students[_studId].submit[_quizId];
    }
    function getScore(uint _studId, uint _quizId) public view returns (uint score){
        score = Students[_studId].score[_quizId];
    }


}