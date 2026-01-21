const BuyLessonsRevolut = () => {
    const plans = [
        {
            title: "Single Lesson",
            price: "70 zł",
            link: "https://revolut.me/olgakhn?currency=PLN&amount=7000¬e=1%20lesson",
        },
        {
            title: "Package of 5 Lessons",
            price: "330 zł",
            link: "https://revolut.me/olgakhn?currency=PLN&amount=33000¬e=5%20lessons%20package",
        },
        {
            title: "Package of 10 Lessons",
            price: "600 zł",
            link: "https://revolut.me/olgakhn?currency=PLN&amount=60000¬e=10%20lessons%20package"
        },
    ];

    return (
        <div className="buy-lessons">
            <h2>Book a Lesson</h2>
            <div className="plans">
                {plans.map((plan) => (
                    <a
                        key={plan.title}
                        href={plan.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-button"
                    >
                        {plan.title} - {plan.price}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BuyLessonsRevolut;