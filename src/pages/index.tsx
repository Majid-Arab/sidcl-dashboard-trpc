import { FeaturesCards } from "@Components/Card";
import { Title } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import AppShellDemo from "../../components/Shell";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>Dashboard</Title>
      {/* <FeaturesCards/> */}
    </>
  );
};

export default Home;
