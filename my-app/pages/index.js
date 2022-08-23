import Head from 'next/head'
import Image from 'next/image'
import { Card } from '../components/Card/Card'
import styles from '../styles/Home.module.css'

export default function Home({games}) {
  console.log(games.results[0]);
  return (
    <div className={styles.container}>
      {games.results.map(({id, name, background_image, rating, released}) => {
        return <Card key={id} name={name} background_image={background_image} rating={rating} released={released} />
      })}
    </div>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch('https://api.rawg.io/api/games?key=2516c1a213f748d4b2f1ef169998a412');
  const games = await response.json();
  
  return {
    props: {games}, // will be passed to the page component as props
  }
}
