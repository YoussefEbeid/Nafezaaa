using Microsoft.AspNetCore.Mvc;

namespace Nafeza.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FAQController : ControllerBase
    {
        // GET: api/faq
        [HttpGet]
        public IActionResult GetFAQs()
        {
            var faqs = new[]
            {
                new
                {
                    id = 1,
                    category = "Registration",
                    question = "Who is responsible for registering on Nafeza?",
                    answer = "All parties involved in foreign trade operations must register on Nafeza, including importers, exporters, customs brokers, shipping agents, and freight forwarders. Each entity must create their own account and complete the registration process with the required documentation."
                },
                new
                {
                    id = 2,
                    category = "Registration",
                    question = "How can I register on the Nafeza platform?",
                    answer = "To register on Nafeza, visit the registration page and click 'Register'. You will need to provide your company information, contact details, and upload required documents such as commercial registration, tax card, and authorized signatory documents. After submission, your account will be reviewed and activated within 2-3 business days."
                },
                new
                {
                    id = 3,
                    category = "ACI Filing",
                    question = "What is Advance Cargo Information (ACI) and why is it required?",
                    answer = "Advance Cargo Information (ACI) is a mandatory requirement that requires exporters to submit cargo information at least 48 hours before shipping. This allows Egyptian customs and relevant authorities to review and pre-approve shipments, reducing clearance time and ensuring compliance with regulations."
                },
                new
                {
                    id = 4,
                    category = "ACI Filing",
                    question = "How can a shipping agent get an ACID for the shipment and how can it verify its validity?",
                    answer = "Shipping agents can obtain an ACID (Advance Cargo Information Document) by submitting the required cargo information through the Nafeza platform. The ACID is generated automatically after successful submission and validation. You can verify the ACID validity by using the 'Validate ACID' feature on the Nafeza homepage, entering the ACID number to check its status and authenticity."
                },
                new
                {
                    id = 5,
                    category = "Blockchain & CargoX",
                    question = "How can the foreign exporter register on Block Chain Cargox platform, and what is the number of registrations allowed?",
                    answer = "Foreign exporters can register on the CargoX blockchain platform by visiting the CargoX website and completing the registration process. Each exporter can create one main account, and there is no limit on the number of shipments that can be processed through a single account. However, each exporter should maintain only one active account to ensure proper tracking and compliance."
                },
                new
                {
                    id = 6,
                    category = "e-Signature",
                    question = "Where can I get the e-Token and the names of the companies that deal with it?",
                    answer = "e-Tokens (USB tokens) can be obtained from authorized certification service providers in Egypt. These providers are licensed by the Egyptian National Telecommunications Regulatory Authority (NTRA). You can find a list of authorized providers on the NTRA website or contact Nafeza support for assistance. The e-Token is required for digitally signing customs declarations and other official documents on the platform."
                },
                new
                {
                    id = 7,
                    category = "Broker Services",
                    question = "Can the broker add data for the stakeholder?",
                    answer = "Yes, customs brokers can add and manage data on behalf of their clients (stakeholders) if they have been authorized through a proper delegation process. The stakeholder must first create an account on Nafeza and then authorize the broker through the 'Delegate Management' section. The broker will then be able to submit declarations and manage transactions on behalf of the authorized stakeholder."
                },
                new
                {
                    id = 8,
                    category = "Documentation",
                    question = "What if the exporter does not submit the electronic invoice and only submits the paper invoice and the data listed by the Egyptian importer?",
                    answer = "Electronic invoices are mandatory for ACI filing. If an exporter only submits a paper invoice, the shipment will not be processed and will be rejected at the port of entry. The exporter must submit the electronic invoice through the CargoX blockchain platform, which will be automatically linked to the ACID. Paper invoices alone are not sufficient for customs clearance."
                },
                new
                {
                    id = 9,
                    category = "Payment",
                    question = "How can I pay customs duties and fees on Nafeza?",
                    answer = "You can pay customs duties and fees through the integrated payment gateway on the Nafeza platform. Accepted payment methods include bank transfers, credit cards, and electronic wallets. After submitting your declaration, you will receive a payment notification with the total amount due. Payment must be completed before customs clearance can proceed."
                },
                new
                {
                    id = 10,
                    category = "Tariff Search",
                    question = "How do I find the correct HS Code for my goods?",
                    answer = "You can use the Tariff Search feature on Nafeza to find HS codes. Simply enter a description of your goods or search by item name. The system will display matching HS codes with their descriptions, duty rates, and applicable taxes. You can also browse by chapter or use the item number search for more precise results."
                },
                new
                {
                    id = 11,
                    category = "Status Tracking",
                    question = "How can I track the status of my customs declaration?",
                    answer = "You can track your declaration status in real-time through the Nafeza dashboard. After logging in, navigate to 'My Declarations' where you will see all your submissions with their current status (Draft, Submitted, Under Review, Approved, Rejected). You can also set up email notifications to receive updates automatically."
                },
                new
                {
                    id = 12,
                    category = "Technical Support",
                    question = "What should I do if I encounter technical issues on the platform?",
                    answer = "If you experience technical issues, first check the Help Center for common solutions. You can also contact Nafeza support through the 'Contact Support' section, email support@nafeza.gov.eg, or call the support hotline at +20 2 2794 0000. For urgent matters, visit your nearest logistics service center for in-person assistance."
                },
                new
                {
                    id = 13,
                    category = "Account Management",
                    question = "How do I update my company information or change authorized signatories?",
                    answer = "To update company information, log into your Nafeza account and navigate to 'Company Profile'. You can update contact information, addresses, and other details. For changes to authorized signatories, you must submit a new 'Declaration and Undertaking Form' through the platform, which will be reviewed and approved by the authorities."
                },
                new
                {
                    id = 14,
                    category = "Compliance",
                    question = "What documents are required for customs clearance?",
                    answer = "Required documents typically include: Commercial Invoice, Packing List, Bill of Lading or Air Waybill, Certificate of Origin (if applicable), Import License (for restricted goods), ACID (Advance Cargo Information Document), and any other documents specific to your goods category. All documents must be submitted electronically through the Nafeza platform."
                },
                new
                {
                    id = 15,
                    category = "Logistics Centers",
                    question = "Where are the Nafeza logistics service centers located?",
                    answer = "Nafeza operates logistics service centers at major ports, airports, and border crossings across Egypt, including Cairo International Airport, Port Said, Alexandria, Damietta, Suez, Ain Sokhna, and various border crossings. You can find the complete list with addresses and contact information on the Services/Logistic Centers page."
                }
            };

            var pageContent = new
            {
                title = "Frequently Asked Questions",
                subtitle = "Find answers to common questions about Nafeza platform and services",
                description = "Browse through our frequently asked questions to find quick answers about registration, ACI filing, e-signatures, payments, and more. If you can't find what you're looking for, please contact our support team.",
                categories = new[] { "All", "Registration", "ACI Filing", "Blockchain & CargoX", "e-Signature", "Broker Services", "Documentation", "Payment", "Tariff Search", "Status Tracking", "Technical Support", "Account Management", "Compliance", "Logistics Centers" },
                faqs = faqs
            };

            return Ok(pageContent);
        }
    }
}

