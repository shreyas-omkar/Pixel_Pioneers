import React from "react";

const FAQ = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-center mb-6">Frequently Asked Questions (FAQ)</h1>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">1. How do I contact a vet?</h2>
                <p className="text-base">
                    You can contact a vet directly through our platform by filling out the form with your pet's symptoms and health details. Our vets will respond to you via email to provide consultation.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">2. How do I purchase medications?</h2>
                <p className="text-base">
                    After receiving a prescription from the vet, you can directly purchase the recommended medications through our app. We offer a range of pet medications that can be delivered to your doorstep.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">3. Are the medications safe?</h2>
                <p className="text-base">
                    The medications available on <strong>Furry Friend</strong> are prescribed by licensed veterinarians and are sourced from trusted suppliers. However, we recommend you follow the prescribed dosage and consult the vet if you have any concerns.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">4. What should I do if my pet is not improving?</h2>
                <p className="text-base">
                    If your pet’s condition does not improve after following the prescribed treatment, please reach out to the vet who prescribed the medication for a follow-up consultation. You can contact them directly through the app.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">5. Can I return the medications?</h2>
                <p className="text-base">
                    Unfortunately, due to the nature of our products, we do not accept returns or exchanges for medications once they have been delivered. Please double-check your order before purchasing.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">6. How do I track my order?</h2>
                <p className="text-base">
                    You can track your order through the app after purchase. We provide real-time updates on the status of your order, from dispatch to delivery.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">7. How do I create an account?</h2>
                <p className="text-base">
                    To create an account, simply click on the "Sign Up" button on our homepage and fill in the required details. You will need to provide a valid email address and create a secure password to access your account.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">8. Do you offer emergency services?</h2>
                <p className="text-base">
                    While our platform allows you to consult with vets, we do not provide emergency services. For urgent pet health concerns, please visit a nearby veterinary clinic or emergency pet hospital.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">9. How do I get in touch with customer support?</h2>
                <p className="text-base">
                    You can reach out to our customer support team by emailing us at <a href="mailto:shreyashegdeplus06@gmail.com" className="text-blue-500">shreyashegdeplus06@gmail.com</a> or call us at <a href="tel:+917820982771" className="text-blue-500">+91 78209 82771</a>.
                </p>
            </section>
        </div>
    );
};

export default FAQ;
