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
import Button from "../src/components/Button";
import QuizContainer from "../src/components/QuizContainer";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
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
              <form onSubmit={handleSubmit}>
                <Input
                  name="username"
                  placeholder="Qual o seu nome?"
                  type="text"
                  onChange={handleChangeName}
                  value={name}
                />

                <Button type="submit" disabled={name.length < 3}>
                  Jogar
                </Button>
              </form>
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
