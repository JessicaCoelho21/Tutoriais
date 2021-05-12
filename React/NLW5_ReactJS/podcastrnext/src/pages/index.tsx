import React from "react";

export default function Home(props) {
  //SPA -> single-page application
  /*
  React.useEffect(() => {
    fetch("http://localhost:3333/episodes")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  */

  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

//SSR -> server-side rendering
/*
export async function getServerSideProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    //o nome precisa de ser sempre props
    props: {
      episodes: data,
    },
  };
}*/

//SSG -> static-side generation
export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    //o nome precisa de ser sempre props
    props: {
      episodes: data,
    },

    revalidate: 60 * 60 * 8,
  };
}
