document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.querySelector('.start-btn');
    const quiz = document.querySelector('.quiz');
    const questionElem = document.querySelector('.question');
    const optionButtons = document.querySelectorAll('.option-btn');
    const feedback = document.querySelector('.feedback');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const accuracyElem = document.querySelector('.accuracy');

    const questions = [
        { question: "同方向近距高跟车行驶", answer: "近光灯" },
        { question: "在照明良好的道路上行驶", answer: "近光灯" },
        { question: "与机动车会车", answer: "近光灯" },
        { question: "信号灯控制的路口转弯", answer: "近光灯" },
        { question: "在无照明道路行驶", answer: "远光灯" },
        { question: "在照明不良道路行驶", answer: "远光灯" },
        { question: "超车", answer: "远近光交替" },
        { question: "通过急弯", answer: "远近光交替" },
        { question: "通过坡路", answer: "远近光交替" },
        { question: "通过拱桥", answer: "远近光交替" },
        { question: "通过人行横道", answer: "远近光交替" },
        { question: "通过没有交通信号灯控制的路口", answer: "远近光交替" },
        { question: "路边临时停车", answer: "示廓灯" },
    ];

    let currentQuestionIndex = 0;
    let usedIndexes = [];
    let correctCount = 0;
    let totalCount = 0;

    function getRandomQuestionIndex() {
        let index;
        do {
            index = Math.floor(Math.random() * questions.length);
        } while (usedIndexes.includes(index));
        return index;
    }

    function startQuiz() {
        startBtn.style.display = 'none';
        quiz.style.display = 'block';
        currentQuestionIndex = getRandomQuestionIndex();
        usedIndexes.push(currentQuestionIndex);
        loadQuestion(currentQuestionIndex);
    }

    function loadQuestion(index) {
        const question = questions[index];
        questionElem.textContent = question.question;
        feedback.textContent = '';
    }

    function checkAnswer(selectedAnswer) {
        totalCount++;
        if (selectedAnswer === questions[currentQuestionIndex].answer) {
            correctCount++;
            feedback.textContent = '正确!';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = '错误!';
            feedback.style.color = 'red';
        }
        updateAccuracy();
        setTimeout(() => {
            if (usedIndexes.length === questions.length) {
                usedIndexes = [];
            }
            currentQuestionIndex = getRandomQuestionIndex();
            usedIndexes.push(currentQuestionIndex);
            loadQuestion(currentQuestionIndex);
        }, 1000);
    }

    function updateAccuracy() {
        const accuracy = (correctCount / totalCount * 100).toFixed(2);
        accuracyElem.textContent = `正确率: ${accuracy}%`;
    }

    startBtn.addEventListener('click', startQuiz);

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedAnswer = button.getAttribute('data-answer');
            checkAnswer(selectedAnswer);
        });
    });

    prevBtn.addEventListener('click', () => {
        if (usedIndexes.length > 1) {
            usedIndexes.pop();
            currentQuestionIndex = usedIndexes[usedIndexes.length - 1];
            loadQuestion(currentQuestionIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (usedIndexes.length === questions.length) {
            usedIndexes = [];
        }
        currentQuestionIndex = getRandomQuestionIndex();
        usedIndexes.push(currentQuestionIndex);
        loadQuestion(currentQuestionIndex);
    });
});
