import AddForm from "./components/AddForm";
import Header from "./components/Header";
import Table from "./components/Table";

function App() {
  return (
    <div className="container">
      <Header title={"Restaurant Finder"}/>
      <AddForm />
      <Table />
    </div>
  );
}

export default App;
