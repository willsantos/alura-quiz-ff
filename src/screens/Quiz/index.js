import { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
/* import db from "../../../db.json"; */
import Footer from "../../components/Footer";
import GitHubCorner from "../../components/GitHubCorner";
import QuizBackground from "../../components/QuizBackground";
import QuizLogo from "../../components/QuizLogo";
import Widget from "../../components/Widget";
import Input from "../../components/Input";
import Button from "../../components/Button";
import QuizContainer from "../../components/QuizContainer";
import AlternativesForm from "../../components/AlternativesForm";
import { useRouter } from "next/router";
import BackLinkArrow from "../../components/BackLinkArrow";

function ResultsWidget({ results, totalQuestions }) {
  const router = useRouter();
  const player = router.query.name;
  return (
    <Widget>
      <Widget.Header>{`Parabéns ${player} seus resultados:`}</Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {" " +
            results.reduce((total, current) => {
              if (current === true) {
                return total + 1;
              }

              return total;
            }, 0) +
            " "}
          de {` ${totalQuestions} `} perguntas.
        </p>
        <ul>
          {results.map((result, index) => {
            const alternative = index + 1;
            return (
              <li key={`result_${index}`}>
                Pergunta {alternative}:{result === true ? " Acertou" : " Errou"}
              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        Loading simulando internet ruim
        <img
          src="https://media.giphy.com/media/5tbHEVjW4qTFsVrD1W/giphy.gif"
          alt="Carregando..."
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
          }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);

  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  function handleSubmit(event) {
    event.preventDefault();
    setIsQuestionSubmited(true);
    setTimeout(() => {
      addResult(isCorrect);
      onSubmit();
      setIsQuestionSubmited(false);
      setSelectedAlternative(undefined);
    }, 2 * 1000);
  }
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h1>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h1>
      </Widget.Header>
      <img
        src={question.image}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={handleSubmit}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <>
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                  key={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  {alternative}
                  <input
                    style={{ display: "none" }}
                    id={alternativeId}
                    type="radio"
                    name="alternatives"
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                    default="false"
                  />
                </Widget.Topic>
                <br />
              </>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

export default function Quiz({ externalQuestions }) {
  const [screenState, setSecreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = externalQuestions.questions.length;
  const question = externalQuestions.questions[questionIndex];

  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setSecreenState(screenStates.QUIZ);
    }, 3 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    } else {
      setSecreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <Head>
        <title>Quiz Futebol Feminino</title>
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@willsantos" />
        <meta property="og:title" content="Quiz Futebol Feminino" key="title" />
        <meta
          property="og:description"
          content={externalQuestions.description}
          key="title"
        />
        <meta property="og:image" content="/screenshot.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <QuizBackground backgroundImage={externalQuestions.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmit}
              addResult={addResult}
            />
          )}
          {screenState === screenStates.RESULT && (
            <ResultsWidget results={results} totalQuestions={totalQuestions} />
          )}

          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/willsantos/alura-quiz-ff" />
      </QuizBackground>
    </>
  );
}
