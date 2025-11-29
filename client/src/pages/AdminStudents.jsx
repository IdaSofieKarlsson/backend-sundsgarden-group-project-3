export default function AdminStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    apiFetch("/api/admin/students").then(setStudents);
  }, []);

  return (
    <div>
      <h2>Student Accounts</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Personnr</th><th>Phone</th><th>Address</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.personnr}</td>
              <td>{s.phone}</td>
              <td>{s.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
