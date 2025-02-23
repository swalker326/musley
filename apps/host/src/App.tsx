import { RemoteEntry } from "email/RemoteEntry";
import "./index.css";

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div>
        <RemoteEntry />
      </div>
    </div>
  );
};

export default App;
