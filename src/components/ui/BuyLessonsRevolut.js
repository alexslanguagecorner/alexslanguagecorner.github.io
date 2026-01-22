import './BuyLessonsRevolut.scss'

const BuyLessonsRevolut = () => {
    const plans = [
        {
            title: "Single Lesson",
            price: "70 zł",
            duration: "60 min",
            save: "",
            link: "https://revolut.me/olgakhn?currency=PLN&amount=7000¬e=1%20lesson",
        },
        {
            title: "Package of 5 Lessons",
            price: "320 zł",
            duration: "",
            save: "30 zł",
            link: "https://revolut.me/olgakhn?currency=PLN&amount=33000¬e=5%20lessons%20package",
        },
        {
            title: "Package of 10 Lessons",
            price: "630 zł",
            duration: "",
            save: "70 zł",
            link: "https://revolut.me/olgakhn?currency=PLN&amount=60000¬e=10%20lessons%20package"
        },
    ];

    return (
        <div id="buy-lessons-revolut" className="buy-lessons-revolut">
            <h2 className='revolut-tagline'>Book a Lesson</h2>
            <div className="plans">
                {plans.map((plan) => (
                    <a
                        key={plan.title}
                        href={plan.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-revolut-card"
                    >
                       <p className='plan-title'> {plan.title}</p>  
                       <p className='plan-price'> {plan.price} </p>
                       {plan.duration ? <p className='plan-duration'> {plan.duration} </p> : ''}
                       {plan.save ? <p className='plan-save' >Save: {plan.save} </p> : ''}                      
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BuyLessonsRevolut;