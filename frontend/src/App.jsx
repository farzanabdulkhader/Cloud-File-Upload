import SingleLocal from "./components/SingleLocal";
import SingleCloud from "./components/SingleCloud";
import MultipleLocal from "./components/MultipleLocal";
import MultipleCloud from "./components/MultipleCloud";

function App() {
  return (
    <div className="App">
      <h1>Cloudinary File Upload with Preview</h1>
      <SingleLocal />
      <SingleCloud />
      <MultipleLocal />
      <MultipleCloud />
    </div>
  );
}

export default App;
