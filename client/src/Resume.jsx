import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import MobileResume from "./MobileResume";

const ResumeBuilder = () => {
  const nationalities = [
    "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan",
    "Antiguan", "Argentine", "Armenian", "Australian", "Austrian", "Azerbaijani",
    "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian",
    "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Botswanan",
    "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabé", "Burmese",
    "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African",
    "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese (Congo-Brazzaville)",
    "Congolese (Congo-Kinshasa)", "Costa Rican", "Croatian", "Cuban", "Cypriot",
    "Czech", "Danish", "Djiboutian", "Dominican", "Dutch", "East Timorese", "Ecuadorean",
    "Egyptian", "Emirati", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian",
    "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian",
    "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinean",
    "Guinea-Bissauan", "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelandic",
    "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian",
    "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Kiribati",
    "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan",
    "Liechtenstein", "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", "Malawian",
    "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian",
    "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian",
    "Montenegrin", "Moroccan", "Mozambican", "Namibian", "Nauruan", "Nepalese",
    "New Zealander", "Nicaraguan", "Nigerian", "Nigerien", "North Korean", "Norwegian",
    "Omani", "Pakistani", "Palauan", "Palestinian", "Panamanian", "Papua New Guinean",
    "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian",
    "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean",
    "Saudi", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean",
    "Slovak", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean",
    "Spanish", "Sri Lankan", "Sudanese", "Surinamese", "Swazi", "Swedish", "Swiss",
    "Syrian", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian",
    "Tunisian", "Turkish", "Turkmen", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan",
    "Uzbek", "Vanuatuan", "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean"
  ];

  const experience = [
    "Fresher", "1 yr", "2 yr", "3 yr", "4 yr", "5 yr", "6 yr", "7 yr", "8 yr", "9 yr", "10 yr",
    "11 yr", "12 yr", "13 yr", "14 yr", "15 yr", "16 yr", "17 yr", "18 yr", "19 yr", "20 yr"
  ];

  const educationOptions = [
    "HSC", "SSC", "BSC", "BCS", "BCA", "BCOM", "BBA", "MBA", "PHD", "BTECH", "MCA", "MSC", "MCS", "MCOM"
  ];

  const [formData, setFormData] = useState({
    summary: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    experience: "",
    skills: "",
    hobbies: "",
    educations: [
      { education: "", institute: "", percentage: "", passingYear: "" }
    ]
  });
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneRegex = /^\d{10}$/;
  const percentageRegex = /^[0-9]{1,2}%$/; 




  const navigate = useNavigate();

  const handleInputChange = (field, value, index = null, section = null) => {
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[index][field] = value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddSection = (section) => {
    const newSection =
      section === "educations"
        ? { education: "", institute: "", percentage: "", passingYear: "" }
        : {};
    setFormData({ ...formData, [section]: [...formData[section], newSection] });
  };

  const handleRemoveSection = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSave = async () => {
    const mandatoryFields = [
      { field: "summary", label: "Summary" },
      { field: "name", label: "Name" },
      { field: "email", label: "Email" },
      { field: "phone", label: "Phone" },
      { field: "dob", label: "Date of Birth" },
      { field: "address", label: "address" },
      { field: "gender", label: "Gender" },
      { field: "maritalStatus", label: "Marital Status" },
      { field: "nationality", label: "Nationality" },
      { field: "experience", label: "Experience" },
      { field: "skills", label: "Skills" },
      { field: "hobbies", label: "Hobbies" }
    ];

    for (let field of mandatoryFields) {
      if (!formData[field.field]) {
        alert(`${field.label} is required.`);
        return;
      }
      else if (!validRegex.test(formData.email)) {
        alert("Please enter a valid email ID");
        return;
      }
      else if (!phoneRegex.test(formData.phone.toString())) {
        alert("Please enter valid 10 digit phone number");
        return;
      }
      for (let ed of formData.educations) {
        if (!percentageRegex.test(ed.percentage)) {
          alert("Please enter a valid percentage with the '%' sign (e.g., 85%)");
          return;
        }
      }
    }

    // Check if at least one education section is filled
    const isAtLeastOneEducationFilled = formData.educations.some(
      (ed) => ed.education && ed.institute && ed.percentage && ed.passingYear
    );

    if (!isAtLeastOneEducationFilled) {
      alert("At least one Education section must be fully filled.");
      return;
    }

    localStorage.setItem("resumeData", JSON.stringify(formData));

    try {
      const response = await fetch("https://resume-builder-servers.vercel.app/saveResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Resume saved successfully!");
        navigate("/resumePreview");
      } else {
        const errorData = await response.json();
        alert(`Failed to save resume: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error saving resume", err);
      alert("Failed to save resume. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-5xl mx-auto my-8 p-4 sm:p-6 md:p-8 bg-white shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-lg">
        <h2 className="text-center text-3xl font-bold mb-6">Resume Builder</h2>

        {/* Mobile/Small Devices Version */}
        <MobileResume />
        {/* Extra Large Devices Version */}
        <div className="hidden xl:block">
          <form>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Summary
                </label>
                <textarea
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none"
                  rows="4"
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nationality
                </label>
                <select
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {nationalities.map((nation, idx) => (
                    <option key={idx} value={nation}>
                      {nation}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <select
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {experience.map((exp, idx) => (
                    <option key={idx} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none"
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hobbies (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none"
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange("hobbies", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              {formData.educations.map((education, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Education
                      </label>
                      <select
                        className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        value={education.education}
                        onChange={(e) =>
                          handleInputChange("education", e.target.value, index, "educations")
                        }
                        required
                      >
                        <option value="">Select</option>
                        {educationOptions.map((edu, idx) => (
                          <option key={idx} value={edu}>
                            {edu}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Institute
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        value={education.institute}
                        onChange={(e) =>
                          handleInputChange("institute", e.target.value, index, "educations")
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Percentage
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        value={education.percentage}
                        onChange={(e) =>
                          handleInputChange("percentage", e.target.value, index, "educations")
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Passing Year
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        value={education.passingYear}
                        onChange={(e) =>
                          handleInputChange("passingYear", e.target.value, index, "educations")
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveSection("educations", index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                onClick={() => handleAddSection("educations")}
              >
                Add Education
              </button>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
                onClick={handleSave}
              >
                Save Resume
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;
