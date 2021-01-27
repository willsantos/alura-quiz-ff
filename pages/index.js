import { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import db from "../db.json";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Widget from "../src/components/Widget";
import Input from "../src/components/Input";

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const [name, setName] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  return (
    <>
      <Head>
        <title>Quiz Futebol Feminino</title>
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@willsantos" />
        <meta property="og:title" content="Quiz Futebol Feminino" key="title" />
        <meta property="og:description" content={db.description} key="title" />
        <meta property="og:image" content="/screenshot.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <center>{name}</center>
            <Widget.Content>
              <p>{db.description}</p>
              <Input
                placeholder="Qual o seu nome?"
                type="text"
                onChange={handleChangeName}
              />

              <Link href="/quiz">
                <Widget.Button type="submit">Jogar</Widget.Button>
              </Link>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera Alura</h1>
              <p>Aqui vão os outros quizes</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/willsantos/alura-quiz-ff" />
      </QuizBackground>
    </>
  );
}
