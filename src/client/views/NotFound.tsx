import React from 'react';

interface NotFoundProps {}

const NotFound = (props: NotFoundProps) => {

    return <>
        <main className="container mt-6">
            <section className="row justify-content-center">
                <h1 className="text-cent text-primary">404 Page Not Found</h1>
            </section>
        </main>
    </>

}

export default NotFound;