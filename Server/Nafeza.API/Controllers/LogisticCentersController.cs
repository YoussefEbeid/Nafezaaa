using Microsoft.AspNetCore.Mvc;

namespace Nafeza.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogisticCentersController : ControllerBase
    {
        // GET: api/logisticcenters
        [HttpGet]
        public IActionResult GetLogisticCenters()
        {
            var centers = new[]
            {
                new
                {
                    id = 1,
                    name = "Cairo International Airport",
                    location = "Cairo, Egypt",
                    address = "Cairo International Airport, Terminal 3",
                    phone = "+20 2 2265 0000",
                    email = "cairo.airport@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Document Processing", "Customs Clearance", "Cargo Inspection" },
                    workingHours = "24/7",
                    coordinates = new { lat = 30.1127, lng = 31.4000 }
                },
                new
                {
                    id = 2,
                    name = "Port Said Port",
                    location = "Port Said, Egypt",
                    address = "Port Said Port Authority, Eastern Port",
                    phone = "+20 64 322 0000",
                    email = "portsaid@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Maritime Cargo Processing", "Customs Clearance", "Container Inspection" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 31.2653, lng = 32.3019 }
                },
                new
                {
                    id = 3,
                    name = "Alexandria Port",
                    location = "Alexandria, Egypt",
                    address = "Alexandria Port Authority, Main Terminal",
                    phone = "+20 3 480 9000",
                    email = "alexandria@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Maritime Cargo Processing", "Customs Clearance", "Document Verification" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 31.2001, lng = 29.9187 }
                },
                new
                {
                    id = 4,
                    name = "Damietta Port",
                    location = "Damietta, Egypt",
                    address = "Damietta Port Authority, Container Terminal",
                    phone = "+20 57 240 0000",
                    email = "damietta@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Container Processing", "Customs Clearance", "Cargo Inspection" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 31.4165, lng = 31.8133 }
                },
                new
                {
                    id = 5,
                    name = "Suez Port",
                    location = "Suez, Egypt",
                    address = "Suez Port Authority, Main Terminal",
                    phone = "+20 62 333 0000",
                    email = "suez@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Maritime Cargo Processing", "Customs Clearance", "Document Processing" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 29.9668, lng = 32.5498 }
                },
                new
                {
                    id = 6,
                    name = "Ain Sokhna Port",
                    location = "Ain Sokhna, Suez Governorate",
                    address = "Ain Sokhna Port, Industrial Zone",
                    phone = "+20 62 340 0000",
                    email = "ainsokhna@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Industrial Cargo Processing", "Customs Clearance", "Bulk Cargo Handling" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 29.6667, lng = 32.3500 }
                },
                new
                {
                    id = 7,
                    name = "Taba Border Crossing",
                    location = "Taba, South Sinai",
                    address = "Taba Border Crossing, Egypt-Israel Border",
                    phone = "+20 69 350 0000",
                    email = "taba@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Land Cargo Processing", "Customs Clearance", "Border Inspection" },
                    workingHours = "24/7",
                    coordinates = new { lat = 29.4917, lng = 34.8950 }
                },
                new
                {
                    id = 8,
                    name = "Rafah Border Crossing",
                    location = "Rafah, North Sinai",
                    address = "Rafah Border Crossing, Egypt-Gaza Border",
                    phone = "+20 68 280 0000",
                    email = "rafah@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Land Cargo Processing", "Customs Clearance", "Humanitarian Aid Processing" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 31.2306, lng = 34.2500 }
                },
                new
                {
                    id = 9,
                    name = "Salloum Border Crossing",
                    location = "Salloum, Matruh Governorate",
                    address = "Salloum Border Crossing, Egypt-Libya Border",
                    phone = "+20 46 350 0000",
                    email = "salloum@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Land Cargo Processing", "Customs Clearance", "Border Inspection" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 31.5667, lng = 25.1500 }
                },
                new
                {
                    id = 10,
                    name = "Adabiya Port",
                    location = "Adabiya, Suez Governorate",
                    address = "Adabiya Port, Petroleum Terminal",
                    phone = "+20 62 330 0000",
                    email = "adabiya@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Petroleum Cargo Processing", "Customs Clearance", "Specialized Cargo Handling" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 29.8833, lng = 32.5167 }
                },
                new
                {
                    id = 11,
                    name = "Dekheila Port",
                    location = "Alexandria, Egypt",
                    address = "Dekheila Port, Container Terminal",
                    phone = "+20 3 420 0000",
                    email = "dekheila@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Container Processing", "Customs Clearance", "Cargo Inspection" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 31.1833, lng = 29.8167 }
                },
                new
                {
                    id = 12,
                    name = "El Arish Port",
                    location = "El Arish, North Sinai",
                    address = "El Arish Port, Main Terminal",
                    phone = "+20 68 330 0000",
                    email = "elarish@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Maritime Cargo Processing", "Customs Clearance", "Document Processing" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 31.1333, lng = 33.8000 }
                },
                new
                {
                    id = 13,
                    name = "Nuweiba Port",
                    location = "Nuweiba, South Sinai",
                    address = "Nuweiba Port, Ferry Terminal",
                    phone = "+20 69 350 1000",
                    email = "nuweiba@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Ferry Cargo Processing", "Customs Clearance", "Passenger Vehicle Processing" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 29.0333, lng = 34.6667 }
                },
                new
                {
                    id = 14,
                    name = "Safaga Port",
                    location = "Safaga, Red Sea Governorate",
                    address = "Safaga Port, Main Terminal",
                    phone = "+20 65 325 0000",
                    email = "safaga@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Maritime Cargo Processing", "Customs Clearance", "Mineral Export Processing" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 26.7333, lng = 33.9333 }
                },
                new
                {
                    id = 15,
                    name = "Hurghada Port",
                    location = "Hurghada, Red Sea Governorate",
                    address = "Hurghada Port, Tourist Terminal",
                    phone = "+20 65 354 0000",
                    email = "hurghada@nafeza.gov.eg",
                    services = new[] { "ACI Filing", "Tourist Cargo Processing", "Customs Clearance", "Yacht and Boat Processing" },
                    workingHours = "Sunday - Thursday: 8:00 AM - 4:00 PM",
                    coordinates = new { lat = 27.2574, lng = 33.8129 }
                }
            };

            var pageContent = new
            {
                title = "Logistics Service Centers",
                subtitle = "Our logistics services centers are present and available all over Egypt to facilitate your work and accomplish it in a timely manner",
                description = "NAFEZA operates through a comprehensive network of logistics service centers across Egypt, ensuring accessibility and support for traders nationwide. Each center provides a full range of services including ACI filing, customs clearance, document processing, and cargo inspection.",
                centers = centers,
                totalCenters = centers.Length,
                services = new[]
                {
                    "ACI Filing and Processing",
                    "Customs Declaration Services",
                    "Document Verification and Processing",
                    "Cargo Inspection and Clearance",
                    "Payment Processing",
                    "24/7 Online Support",
                    "Real-time Status Tracking"
                }
            };

            return Ok(pageContent);
        }
    }
}

