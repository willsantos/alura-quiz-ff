import QuizScreen from "../../src/screens/Quiz";

export default function ExternalQuiz({ externalDb }) {
  return (
    <div>
      <QuizScreen externalQuestions={externalDb} />

      {/* <pre style={{ backgroundColor: "black", color: "green" }}>
        {JSON.stringify(externalDb, null, 4)}
      </pre> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split("___");
  try {
    const externalDb = await fetch(
      `https://${projectName}.${githubUser}.vercel.app/api/db`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetch db");
      })
      .then((resObj) => resObj);

    return {
      props: {
        externalDb,
      },
    };
  } catch (error) {
    throw new Error();
  }
}
