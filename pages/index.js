import Head from "next/head";
import Image from "next/image";
import Weather from "../src/sections/Weather";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Weather />
    </>
  );
}
