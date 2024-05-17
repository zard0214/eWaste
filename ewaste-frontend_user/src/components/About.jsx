import background from "../img/background.jpg"
export default function About(){
    return(
        <div className="card m-5 border-0">
            <div className="card-title text-center">
                <h1 className="display-4">What is <b>E-Waste</b>?</h1>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <div className="container d-flex justify-content-center"
                             style={{maxWidth: '600px', maxHeight: '400px', width: 'auto', height: 'auto'}}>
                            <img src={background} alt="background"
                                 style={{maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto'}}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 mt-3">
                        <p>
                            <b>E-waste</b> is a leader in sustainable electronic waste management, dedicated to providing
                            efficient, safe, and environmentally friendly solutions for electronic product recycling and
                            disposal. As a socially responsible enterprise, we not only strive to reduce the negative
                            impact of discarded electronic products on the environment and human health but also aim to
                            promote the development of a circular economy to create a better living environment for the
                            future.
                        </p>
                        <p>
                            At E-waste, we firmly believe that every discarded electronic product holds immense value for
                            reuse. Therefore, we employ advanced technology and rigorous processing standards to
                            effectively recycle and reuse electronic waste, minimizing resource waste and environmental
                            pollution.
                        </p>
                        <p>
                            Our Mission:
                        </p>
                        <ul>
                            <li><b>Environmental Protection:</b> Through standardized electronic waste processing procedures,
                                we aim to minimize the negative impact on the environment and protect the ecological
                                balance of the Earth.
                            </li>
                            <li><b>Promoting Circular Economy:</b> Advocating the concept of sustainable development, we
                                encourage the recycling and reuse of electronic products to reduce resource consumption,
                                achieving a win-win situation for both the economy and the environment.
                            </li>
                            <li><b>Data Security Assurance:</b> We provide secure and reliable data destruction services to
                                protect the privacy information of individuals and businesses from leakage and misuse.
                            </li>
                            <li><b>Social Responsibility:</b> Actively participating in public welfare activities and community
                                services, we spread environmental protection concepts and inspire social attention and
                                participation in sustainable development.
                            </li>
                        </ul>
                        <p>
                            Whether you are a business or an individual user, regardless of your region or industry, we
                            welcome you to join ewaste and work together to create a cleaner, healthier future.
                        </p>
                        <p>
                            Join ewaste, and let's contribute our efforts to the green tomorrow of the Earth!
                        </p>
                        <p>
                            Thank you for your support and trust!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}