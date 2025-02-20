import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  container: {
    width: "100%",
    margin: "0 auto",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e293b",
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    padding: 6,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    color: "#1e293b",
    marginBottom: 6,
    marginLeft: "5",
  },
  table: {
    width: "100%",
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e5e7eb",
    paddingVertical: 4,
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 4,
    fontSize: 12,
    color: "#1e293b",
    marginLeft: 20,
    alignItems: "center",
  },
  sectionPadding: {
    marginBottom: 10,
  },
  detailItem: {
    marginBottom: 4,
    display: "flex",
    padding: 10,
  },
  detailLabel: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#374151",
  },
  detailValue: {
    fontSize: 12,
    color: "#1e293b",
    marginLeft: "20%",
    position: "absolute",
  },
  inlineList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  inlineListItem: {
    fontSize: 12,
    color: "#1e293b",
    marginLeft: "5",
  },
});

// PDF Document Component
const MyDocument = ({ resumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Resume Heading */}
        <Text style={styles.heading}>Resume</Text>

        {/* Summary Section */}
        <View style={styles.sectionPadding}>
          <Text style={styles.sectionHeading}>Summary</Text>
          <Text style={styles.text}>{resumeData?.summary || "Loading..."}</Text>
        </View>

        {/* Personal Details Section */}
        <View style={styles.sectionPadding}>
          <Text style={styles.sectionHeading}>Personal Details</Text>
          <View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailValue}>{resumeData?.name || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailValue}>{resumeData?.email || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Phone:</Text>
              <Text style={styles.detailValue}>{resumeData?.phone || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailValue}>{resumeData?.gender || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Martial Status:</Text>
              <Text style={styles.detailValue}>{resumeData?.maritalStatus || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Experience:</Text>
              <Text style={styles.detailValue}>{resumeData?.experience || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date of Birth:</Text>
              <Text style={styles.detailValue}>
                {resumeData?.dob ? new Date(resumeData.dob).toLocaleDateString() : "N/A"}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Nationality:</Text>
              <Text style={styles.detailValue}>{resumeData?.nationality || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Education Section */}
        <View style={styles.sectionPadding}>
          <Text style={styles.sectionHeading}>Education</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Education</Text>
              <Text style={styles.tableCell}>Institute</Text>
              <Text style={styles.tableCell}>Percentage</Text>
              <Text style={styles.tableCell}>Passing Year</Text>
            </View>
            {resumeData?.educations?.map((edu, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{edu.education || "N/A"}</Text>
                <Text style={styles.tableCell}>{edu.institute || "N/A"}</Text>
                <Text style={styles.tableCell}>{edu.percentage || "N/A"}</Text>
                <Text style={styles.tableCell}>
                  {edu.passingYear ? new Date(edu.passingYear).toLocaleDateString() : "N/A"}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Skills Section */}
        {resumeData?.skills && (
          <View style={styles.sectionPadding}>
            <Text style={styles.sectionHeading}>Skills</Text>
            <View style={styles.inlineList}>
              {resumeData.skills.split(",").map((skill, index) => (
                <Text key={index} style={styles.inlineListItem}>
                  {skill.trim()}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Hobbies Section */}
        {resumeData?.hobbies && (
          <View style={styles.sectionPadding}>
            <Text style={styles.sectionHeading}>Hobbies</Text>
            <View style={styles.inlineList}>
              {resumeData.hobbies.split(",").map((hobby, index) => (
                <Text key={index} style={styles.inlineListItem}>
                  {hobby.trim()}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </Page>
  </Document>
);

// Main Component
const ResumePreview = () => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("resumeData"));
    setResumeData(data);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8 border-t-4"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Resume</h2>

        {/* Summary Section */}
        <div className="mb-6 ml-4">
          <h3 className="text-2xl text-left bg-gray-200 text-gray-700 font-semibold p-2">Summary</h3>
          <p className=" text-gray-800 text-left p-2">{resumeData?.summary || "Loading..."}</p>
        </div>

        {/* Personal Details Section */}
        <div className="block xl:hidden mb-6 ml-4">
        <h3 className="text-2xl text-left bg-gray-200 text-gray-700 font-semibold p-2">Personal Details</h3>
          <div className="p-3">
            <p>
              <span className="font-semibold">Name:</span> {resumeData?.name || "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {resumeData?.email || "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {resumeData?.phone || "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Adress:</span> {resumeData?.address || "Loading..."}
            </p>
            
            <p>
              <span className="font-semibold">Gender:</span> {resumeData?.gender || "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Martial Status:</span> {resumeData?.maritalStatus || "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Experience:</span> {resumeData?.experience || "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {resumeData?.dob ? new Date(resumeData.dob).toLocaleDateString() : "Loading..."}
            </p>
            <p>
              <span className="font-semibold">Nationality:</span> {resumeData?.nationality || "Loading..."}
            </p>
          </div>
        </div>

        <div className="hidden xl:block mb-6 ml-4">
        <h3 className="text-2xl text-left bg-gray-200 text-gray-700 font-semibold p-2">Personal Details</h3>
          <table className="w-full table-auto border-gray-300 text-left p-5">
            <tbody className="p-2">
              <tr>
                <td className="p-3 font-semibold">Name</td>
                <td className="p-3">{resumeData?.name || "Loading..."}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Email</td>
                <td className="p-3">{resumeData?.email || "Loading..."}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Phone</td>
                <td className="p-3">{resumeData?.phone || "Loading..."}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Address</td>
                <td className="p-3">{resumeData?.address || "Loading..."}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Gender</td>
                <td className="p-3">{resumeData?.gender || "Loading..."}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Martial Status</td>
                <td className="p-3">{resumeData?.maritalStatus || "Loading..."}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Experience</td>
                <td className="p-3">{resumeData?.experience || "Loading..."}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Date of Birth</td>
                <td className="p-3">
                  {resumeData?.dob ? new Date(resumeData.dob).toLocaleDateString() : "Loading..."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Nationality</td>
                <td className="p-3">{resumeData?.nationality || "Loading..."}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Education Section */}
        <div className="block xl:hidden mb-6 ml-4">
          {resumeData?.educations && resumeData.educations.length > 0 ? (
            resumeData.educations.map((edu, index) => (
              <div key={index} className="border p-3 rounded mb-2">
                <p>
                  <span className="font-semibold">Education:</span> {edu.education || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Institute:</span> {edu.institute || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Percentage:</span> {edu.percentage || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Passing Year:</span>{" "}
                  {edu.passingYear ? new Date(edu.passingYear).toLocaleDateString() : "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="hidden xl:block mb-6 ml-4">
          {resumeData?.educations && resumeData.educations.length > 0 && (
            <>
              <table className="w-full border-collapse table-auto text-left">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-3 border-b">Education</th>
                    <th className="p-3 border-b">Institute</th>
                    <th className="p-3 border-b">Percentage</th>
                    <th className="p-3 border-b">Passing Year</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeData.educations.map((edu, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="p-3">{edu.education || "N/A"}</td>
                      <td className="p-3">{edu.institute || "N/A"}</td>
                      <td className="p-3">{edu.percentage || "N/A"}</td>
                      <td className="p-3">
                        {edu.passingYear ? new Date(edu.passingYear).toLocaleDateString() : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        {/* Skills Section */}
        {resumeData?.skills && (
          <div className="mb-6 ml-4">
            <h3 className="text-2xl text-left bg-gray-200 text-gray-700 font-semibold p-2">Skills</h3>
            <div className="flex p-2">
              {resumeData.skills.split(",").map((skill, idx) => (
                <span key={idx} className="text-lg text-gray-800 p-1">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies Section */}
        {resumeData?.hobbies && (
          <div className="mb-6 ml-4">
            <h6 className="text-2xl text-left bg-gray-200 font-semibold text-gray-700 p-2">Hobbies</h6>
            <div className="flex p-2">
              {resumeData.hobbies.split(",").map((hobby, idx) => (
                <span key={idx} className="text-lg text-gray-800 p-2">
                  {hobby.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="text-center mt-6">
          <PDFDownloadLink
            document={<MyDocument resumeData={resumeData} />}
            fileName={`${resumeData?.name || "Resume"}.pdf`}
          >
            {({ loading }) => (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> {loading ? "Preparing PDF..." : "Download Resume (PDF)"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePreview;