import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-center mb-6">Terms and Conditions</h1>

            <p className="text-lg mb-6">Effective Date: <strong>25/11/2024</strong></p>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">1. Use of the Website</h2>
                <p className="text-base">
                    You agree to use <strong>Furry Friend</strong> only for lawful purposes and in a manner that does not infringe on the rights of others or restrict their use and enjoyment of the site. You must not use the site in any way that could damage, disable, overburden, or impair the website.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">2. Services</h2>
                <p className="text-base">
                    <strong>Furry Friend</strong> provides a platform for pet care services, including veterinary consultations and pet medication purchases. By using our services, you acknowledge and agree that:
                    <ul className="list-disc ml-6">
                        <li>You will provide accurate information regarding your pet's health when contacting a vet.</li>
                        <li>All purchases are made at your own risk, and we do not guarantee the efficacy of any prescribed medications.</li>
                        <li>We are not liable for any issues that arise from improper use of the medication or any medical treatment.</li>
                    </ul>
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">3. User Responsibility</h2>
                <p className="text-base">
                    As a user of <strong>Furry Friend</strong>, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-heading font-bold mb-2">4. Contact Information</h2>
                <p className="text-base">
                    If you have any questions regarding these terms and conditions, feel free to reach out to us at:
                </p>
                <ul className="list-none mt-4">
                    <li>Email: <a href="mailto:shreyashegdeplus06@gmail.com" className="text-blue-500">shreyashegdeplus06@gmail.com</a></li>
                    <li>Phone: <a href="tel:+917820982771" className="text-blue-500">+91 78209 82771</a></li>
                    <li>Address: Kumaraswamy Layout, Bengaluru, Karnataka, India</li>
                </ul>
            </section>
        </div>
    );
};

export default TermsAndConditions;
