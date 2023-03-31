import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list"/>
      </Head>
      <MeetUpList meetups={props.meetups} />
    </Fragment>
  );
}
// export async function getServerSideProps(context){
//     const req=context.req
//     const res=context.res
//     return {
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://abbash7:abbasH123@cluster0.jrhha.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
export default HomePage;
