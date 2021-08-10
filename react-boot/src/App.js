import './register-form.css'
import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {

  const [id, setId] = useState("");
  const [tc, setTc] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");

  const [cityList, setCityList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [openNewStudentArea, setOpenNewStudentArea] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/cities')
      .then(response => setCityList(response.data))
      .catch(console.error("cannot get cities"));

    axios.get('http://localhost:8080/students')
      .then(response => setStudentList(response.data))
      .catch(console.error("cannot get students"));
  }, []);

  useEffect(() => {
    if (city) {
      axios.get(`http://localhost:8080/towns/${city}`)
        .then(response => setTownList(response.data[0].towns))
        .catch(console.error("cannot get towns"));
    }
  }, [city])

  const registerStudent = () => {
    const newStudent = { tc: tc, name: name, phone: phone, city: city, town: town };
    axios.post('http://localhost:8080/addstudent', newStudent)
      .then(setStudentList(studentList => [...studentList, newStudent]))
      .catch(console.error("cannot register"));
    setOpenNewStudentArea(false)
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:8080/deletestudent/${id}`)
      .then(setStudentList(studentList.filter((student) => student.id !== id)))
      .catch(console.error("cannot delete"));
  };

  const editStudent = () => {
    const newStudent = { id: id, tc: tc, name: name, phone: phone, city: city, town: town };
    axios.put('http://localhost:8080/editstudent', newStudent)
      .then(console.log("edited"))
      .catch(console.error("cannot edit"));
  };

  const openEditStudent = (student) => {
    setId(student.id);
    setTc(student.tc);
    setName(student.name);
    setPhone(student.phone);
    setCity(student.city);
    setTown(student.town);
    setOpenNewStudentArea(true);
    setIsEdit(true);
  }

  const openNewStudent = () => {
    setOpenNewStudentArea(true);
    setIsEdit(false);
  }

  const changeCity = (val) => {
    setCity(val);
    setTown("");
  }

  return (
    <div className="student-body">
      <table>
        <thead>
          <tr>
            <th>T.C. Kimlik No.</th>
            <th>Öğrenci Adı</th>
            <th>Telefon</th>
            <th>Şehir</th>
            <th>İlçe</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) =>
            <tr>
              <td>{student.tc}</td>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.city}</td>
              <td>{student.town}</td>
              <td style={{color: "blue", cursor:"pointer"}} onClick={() => openEditStudent(student)}>Düzenle</td>
              <td style={{color: "red", cursor:"pointer"}}onClick={() => deleteStudent(student.id)}>Sil</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => openNewStudent(true)}>Ekle</button>
      {openNewStudentArea &&
        <form className="register-form" onSubmit={isEdit ? editStudent : registerStudent}>
          <label>
            T.C. Kimlik No
            <input maxLength="11" minLength="11" type="text" value={tc} onChange={(e) => setTc(e.target.value)} required />
          </label>
          <label>
            Öğrenci Adı
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Telefon
            <input maxLength="10" minLength="10" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <select value={city} onChange={(e) => changeCity(e.target.value)} required>
            <option value="" selected disabled >İl Seçiniz</option>
            {
              cityList.map(c => (<option value={c.name}>{c.name}</option>))
            }
          </select>
          <select value={town} onChange={(e) => setTown(e.target.value)} required>
            <option value="" selected disabled >İlçe Seçiniz</option>
            {
              townList.map(t => (<option value={t}>{t}</option>))
            }
          </select>
          <input type="submit" value="Kaydet" />
          <button onClick={() => setOpenNewStudentArea(false)}><b>İptal</b></button>
        </form>
      }
    </div>
  );
}
export default App;
