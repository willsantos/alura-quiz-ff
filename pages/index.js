import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import db from "../db.json";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Widget from "../src/components/Widget";

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
  return (
    <>
      <Head>
        <title>Meu Quiz</title>
        <meta property="og:title" content="Quiz Futebol Feminino" key="title" />
        <meta property="og:description" content={db.description} key="title" />
        <meta property="og:image" content="/screenshot.jpg" />
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
            <Widget.Content>
              <p>{db.description}</p>
              <Widget.Input defaultValue="Qual o seu nome?" type="text" />

              <Link href="/quiz">
                <Widget.Button>Jogar</Widget.Button>
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
        <GitHubCorner projectUrl="https://github.com/willsantos" />
      </QuizBackground>
    </>
  );
}
