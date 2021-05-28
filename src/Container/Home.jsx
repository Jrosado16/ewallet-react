import React from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Information from '../components/Information'

const Home = () => {
    return ( 
        <>
            <Header />
            <Information />
            <Contact />
            <Footer />
        </>
     );
}
 
export default Home;