import React, { useState, useEffect } from "react";
import "./css/CaseRegistration.css";

const CaseRegistration = () => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    title: "",
    description: "",
    status: "OPEN",
    officerId: "",
    crimeType: "",
    crimeDate: "",
    location: "",
    crimeDescription: "",
    criminalSelections: [""], // new: dynamic dropdowns
    evidences: [{ evidenceType: "", description: "" }],
  });

  const [officers, setOfficers] = useState([]);
  const [criminals, setCriminals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setOfficers(data))
      .catch((err) => console.error("Error fetching officers:", err));

    fetch("http://localhost:8080/api/criminals")
      .then((res) => res.json())
      .then((data) => setCriminals(data))
      .catch((err) => console.error("Error fetching criminals:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCriminalChange = (index, value) => {
    const updatedSelections = [...formData.criminalSelections];
    updatedSelections[index] = value;
    setFormData({ ...formData, criminalSelections: updatedSelections });
  };

  const handleAddCriminal = () => {
    setFormData({
      ...formData,
      criminalSelections: [...formData.criminalSelections, ""],
    });
  };

  const getAvailableCriminals = (currentIndex) => {
    const selected = formData.criminalSelections.filter((_, i) => i !== currentIndex);
    return criminals.filter((c) => !selected.includes(c.id.toString()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      caseNumber: formData.caseNumber,
      title: formData.title,
      officerId: parseInt(formData.officerId),
      description: formData.description,
      year: new Date(formData.crimeDate).getFullYear(),
      month: new Date(formData.crimeDate).getMonth() + 1,
      crimeType: formData.crimeType,
      crimeDate: formData.crimeDate,
      location: formData.location,
      crimeDescription: formData.crimeDescription,
      criminalIds: formData.criminalSelections.map((id) => parseInt(id)),
      evidences: formData.evidences,
    };
    const userId = sessionStorage.getItem("userId"); 

    console.log("Submitting Case:", requestBody);

    fetch(`http://localhost:8080/api/cases/create/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        setLoading(false);
        if (!res.ok) throw new Error("Failed to register case");
        return res.json();
      })
      .then((data) => {
        alert(`✅ ${data.ans}`);;
        setFormData({
          caseNumber: "",
          title: "",
          description: "",
          status: "OPEN",
          officerId: "",
          crimeType: "",
          crimeDate: "",
          location: "",
          crimeDescription: "",
          criminalSelections: [""],
          evidences: [{ evidenceType: "", description: "" }],
        });
      })
      .catch((err) => {
        setLoading(false);
        alert("❌ Failed to register case.");
        console.error(err);
      });
  };

  return (
    <div className="case-registration-container">
      <h2>Register a New Case</h2>
      <form onSubmit={handleSubmit}>
        <label>Case Number:</label>
        <input type="text" name="caseNumber" value={formData.caseNumber} onChange={handleChange} required />

        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Assign Officer:</label>
        <select name="officerId" value={formData.officerId} onChange={handleChange} required>
          <option value="">Select Officer</option>
          {officers.map((officer) => (
            <option key={officer.id} value={officer.id}>{officer.name}</option>
          ))}
        </select>

        <label>Crime Type:</label>
        <input type="text" name="crimeType" value={formData.crimeType} onChange={handleChange} required />

        <label>Crime Date:</label>
        <input type="date" name="crimeDate" value={formData.crimeDate} onChange={handleChange} required />

        <label>Crime Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Crime Description:</label>
        <textarea name="crimeDescription" value={formData.crimeDescription} onChange={handleChange} required />

        <label>Suspected Criminals:</label>
        {formData.criminalSelections.map((value, index) => (
          <div key={index} className="criminal-row">
            <select
              value={value}
              onChange={(e) => handleCriminalChange(index, e.target.value)}
              required
            >
              <option value="">Select Criminal</option>
              {getAvailableCriminals(index).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.alias})
                </option>
              ))}
            </select>
          </div>
        ))}
        {formData.criminalSelections.length < criminals.length && (
          <button type="button" onClick={handleAddCriminal}>
            ➕ Add Criminal
          </button>
        )}
        <label>Evidence List:</label>
{formData.evidences.map((evidence, index) => (
  <div key={index} className="evidence-row">
    <input
      type="text"
      placeholder="Evidence Type"
      value={evidence.evidenceType}
      onChange={(e) => {
        const updated = [...formData.evidences];
        updated[index].evidenceType = e.target.value;
        setFormData({ ...formData, evidences: updated });
      }}
      required
    />
    <input
      type="text"
      placeholder="Description"
      value={evidence.description}
      onChange={(e) => {
        const updated = [...formData.evidences];
        updated[index].description = e.target.value;
        setFormData({ ...formData, evidences: updated });
      }}
      required
    />
  </div>
))}
<button
  type="button"
  onClick={() =>
    setFormData({
      ...formData,
      evidences: [...formData.evidences, { evidenceType: "", description: "" }],
    })
  }
>
  ➕ Add Evidence
</button>


        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Registering..." : "Register Case"}
        </button>
      </form>
    </div>
  );
};

export default CaseRegistration;
