import React, { useState, useEffect } from "react";
import { Heading, Box, Button } from "@chakra-ui/react";

function QuestionCard() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const enterFullScreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      setIsFullScreen(false);
    }
  };
  useEffect(() => {
    // Fetching questions from the API
    fetch("https://drab-jade-eagle-vest.cyclic.app/users")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 1) {
        setTimer(timer - 1);
      } else {
        submitAnswer(null);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  const submitAnswer = (selectedOption) => {
    const updatedUserAnswers = [...userAnswers, selectedOption];

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswers(updatedUserAnswers);
      setTimer(30);
      setSelectedOption(selectedOption);
    } else {
      setUserAnswers(updatedUserAnswers);
      setShowScore(true);
      exitFullScreen();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <Box className="App" backgroundColor="black">
      <Box className="quiz-container" backgroundColor="black">
        {questions.length === 0 ? (
          <p>Loading questions...</p>
        ) : showScore ? (
          <Box className="score" textAlign="center">
            <Heading size="lg" color="white">
              Your score:{" "}
              {
                userAnswers
                  .filter(
                    (answer, index) =>
                      answer === questions[index]?.correctanswer
                  )
                  .filter(Boolean).length
              }{" "}
              / {questions.length}
            </Heading>
          </Box>
        ) : (
          <Box
            className="question-container"
            w={{ base: "90%", sm: "90%", md: "90%", lg: "100%", xl: "100%" }}
            marginLeft={{ base: "20px", sm: "20px" }}
          >
            <Box
              display="flex"
              padding="20px"
              paddingRight="300px"
              justifyContent="space-between"
            >
              <Heading size="lg" color="white" marginRight="500px">
                Question {currentQuestionIndex + 1}/10
              </Heading>
              <Heading
                paddingLeft="200px"
                marginRight="-250px"
                color="white"
                size="lg"
              >
                Remaining Time: {timer} Sec
              </Heading>
            </Box>

            <Heading color="white" size="lg" marginBottom="5%">
              {currentQuestionIndex + 1}.{currentQuestion.question}
            </Heading>

            <Box
              display="grid"
              gridTemplateColumns={{
                xl: "1fr",
              }}
              gap="30px"
              justifyContent="center"
            >
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => submitAnswer(option)}
                  textAlign="center"
                  w="400px"
                  h="60px"
                  backgroundColor={
                    selectedOption === option ? "blue.600" : "blue.300"
                  }
                  color="white"
                >
                  {option}
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default QuestionCard;