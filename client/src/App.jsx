import { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './src/features/counter/counterSlice';
import axios from 'axios';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [classNames, setClassNames] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [bookName, setBookName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/options")
      .then((res) => res.json())
      .then((data) => {
        setClassNames(data.classNames);
        setMediums(data.mediums);
        setSubjects(data.subjects);
      });
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3001/api/v1/crud')
      .then((data) => {
        setData(data.data.data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId ? `http://localhost:3001/api/v1/crud/${editId}` : "http://localhost:3001/api/v1/crud";
    const method = editId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        className: selectedClass,
        medium: selectedMedium,
        subjects: selectedSubjects,
        bookName
      })
    });

    if (response.ok) {
      alert(editId ? "Entry updated successfully!" : "Entry created successfully!");
      fetchData();
      setEditId(null);
      setSelectedClass("");
      setSelectedMedium("");
      setSelectedSubjects([]);
      setBookName("");
    } else {
      alert(editId ? "Error updating entry." : "Error creating entry.");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setSelectedClass(item.className._id);
    setSelectedMedium(item.medium._id);
    setSelectedSubjects(item.subjects._id);
    setBookName(item.bookName);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3001/api/v1/crud/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      alert("Entry deleted successfully!");
      fetchData();
    } else {
      alert("Error deleting entry.");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
        <div>counter : {count}</div>
        <button onClick={() => dispatch(increment(count))}>increment</button>
        <br />
        <button onClick={() => dispatch(decrement(count))}>decrement</button>
        <br />
        <button onClick={() => dispatch(incrementByAmount(5))}>jump</button>
      </h1>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Table Data</h2>
        <ul className="space-y-4">
          {data.map((item) => (
            <li key={item._id} className="p-4 border rounded shadow-md">
              <p><strong>Class:</strong> {item?.className?.name}</p>
              <p><strong>Medium:</strong> {item?.medium?.name}</p>
              <p><strong>Subject:</strong> {item?.subjects?.name}</p>
              <p><strong>Book Name:</strong> {item?.bookName}</p>
              <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{editId ? "Edit" : "Create"} Table Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Class Name */}
          <div>
            <label className="block text-sm font-medium">Class Name</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Class</option>
              {classNames.map(cls => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>
          </div>

          {/* Medium */}
          <div>
            <label className="block text-sm font-medium">Medium</label>
            <select value={selectedMedium} onChange={(e) => setSelectedMedium(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Medium</option>
              {mediums.map(med => (
                <option key={med._id} value={med._id}>{med.name}</option>
              ))}
            </select>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium">Subjects</label>
            <select
              value={selectedSubjects}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedSubjects(selectedOptions);
              }}
              className="w-full p-2 border rounded"
            >
              {subjects.map(sub => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium">Book Name</label>
            <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter book name" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">{editId ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
}

export default App;
