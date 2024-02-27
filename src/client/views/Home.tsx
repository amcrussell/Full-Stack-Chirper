import React from 'react';

interface HomeProps {}

const Home = (props: HomeProps) => {

    return <>
        <main className="container mt-6">
            <section className="row justify-content-center">
                <h1 className="text-cent text-primary">
                    Chirper
                </h1>
            </section>
        </main>
    </>

}

export default Home;