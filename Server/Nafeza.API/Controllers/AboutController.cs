using Microsoft.AspNetCore.Mvc;

namespace Nafeza.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutController : ControllerBase
    {
        // GET: api/about
        [HttpGet]
        public IActionResult GetAboutContent()
        {
            var aboutContent = new
            {
                overview = new
                {
                    title = "About Nafeza",
                    description = "NAFEZA is the National Single Window for Foreign Trade Facilitation in Egypt. It serves as a unified electronic platform that connects all parties involved in foreign trade operations, including importers, exporters, customs, ports, and various government agencies.",
                    subtitle = "Connecting Egypt's Trade Ecosystem"
                },
                singleWindow = new
                {
                    title = "Single Window Concept",
                    description = "The Single Window system simplifies and accelerates foreign trade procedures by providing a one-stop-shop for all trade-related services. Through NAFEZA, businesses can submit all required documents electronically, eliminating the need for multiple visits to different government offices.",
                    benefits = new[]
                    {
                        "Unified platform for all trade procedures",
                        "Reduced processing time and costs",
                        "Enhanced transparency and efficiency",
                        "24/7 online access to services",
                        "Real-time tracking of application status"
                    }
                },
                services = new
                {
                    title = "Our Services",
                    items = new[]
                    {
                        new
                        {
                            name = "ACI Filing",
                            description = "Submit Advance Cargo Information 48 hours before shipping to expedite customs clearance.",
                            icon = "FileText"
                        },
                        new
                        {
                            name = "Tariff Search",
                            description = "Check HS Codes, Customs Duties, and Taxes instantly with our comprehensive tariff database.",
                            icon = "Search"
                        },
                        new
                        {
                            name = "e-Signature",
                            description = "Sign declarations securely using your e-Token USB for legally binding digital signatures.",
                            icon = "ShieldCheck"
                        },
                        new
                        {
                            name = "Document Management",
                            description = "Upload, manage, and track all your trade-related documents in one secure location.",
                            icon = "Folder"
                        },
                        new
                        {
                            name = "Payment Gateway",
                            description = "Pay customs duties, fees, and charges securely through integrated payment systems.",
                            icon = "CreditCard"
                        },
                        new
                        {
                            name = "Status Tracking",
                            description = "Monitor the real-time status of your declarations and applications throughout the process.",
                            icon = "Activity"
                        }
                    }
                },
                mission = new
                {
                    title = "Our Mission",
                    description = "To transform Egypt's foreign trade ecosystem by providing a seamless, transparent, and efficient digital platform that connects all stakeholders and facilitates international trade operations."
                },
                vision = new
                {
                    title = "Our Vision",
                    description = "To become the leading digital trade facilitation platform in the Middle East and Africa, empowering businesses and government agencies through innovative technology and exceptional service."
                },
                values = new
                {
                    title = "Our Values",
                    items = new[]
                    {
                        new { name = "Transparency", description = "Open and clear communication in all processes" },
                        new { name = "Efficiency", description = "Streamlined procedures that save time and resources" },
                        new { name = "Security", description = "Protecting data and ensuring secure transactions" },
                        new { name = "Innovation", description = "Continuously improving through technology and best practices" },
                        new { name = "Service Excellence", description = "Committed to providing exceptional user experience" }
                    }
                },
                statistics = new
                {
                    title = "Platform Impact",
                    items = new[]
                    {
                        new { label = "Active Users", value = "50,000+", description = "Registered businesses and traders" },
                        new { label = "Declarations Processed", value = "2M+", description = "Annual declarations handled" },
                        new { label = "Processing Time", value = "70%", description = "Reduction in average processing time" },
                        new { label = "Ports Connected", value = "15+", description = "Major ports and border crossings" }
                    }
                },
                network = new
                {
                    title = "Centers Network",
                    description = "NAFEZA operates through a comprehensive network of logistics service centers across Egypt, ensuring accessibility and support for traders nationwide.",
                    locations = new[]
                    {
                        "Cairo International Airport",
                        "Port Said Port",
                        "Alexandria Port",
                        "Damietta Port",
                        "Suez Port",
                        "Ain Sokhna Port",
                        "Taba Border Crossing",
                        "Rafah Border Crossing"
                    }
                },
                development = new
                {
                    title = "Sustainable Development",
                    description = "NAFEZA is committed to supporting Egypt's sustainable development goals by facilitating trade, reducing environmental impact through paperless processes, and contributing to economic growth.",
                    principles = new[]
                    {
                        "Digital transformation of trade procedures",
                        "Environmental sustainability through paperless operations",
                        "Economic growth facilitation",
                        "Compliance with international trade standards",
                        "Continuous improvement `and innovation"
                    }
                },
                contact = new
                {
                    title = "Get in Touch",
                    email = "support@nafeza.gov.eg",
                    phone = "+20 2 2794 0000",
                    address = "Misr Technology Services (MTS), Cairo, Egypt"
                }
            };

            return Ok(aboutContent);
        }
    }
}

