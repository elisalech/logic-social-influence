import { useState } from "react";
import NetworksContainer from "./components/NetworksContainer";
import Controls from "./components/Controls";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {
  const [canUpdate, setCanUpdate] = useState(false);
  const [initialModel, setInitialModel] = useState(null);
  const [counter, setCounter] = useState(1);

  const handleClickUpdate = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <main>
      <Controls
        canUpdate={canUpdate}
        handleClickUpdate={handleClickUpdate}
        setInitialModel={setInitialModel}
      />
      {
        <NetworksContainer
          initialModel={initialModel}
          setCanUpdate={setCanUpdate}
          counter={counter}
        />
      }
    </main>
  );
}

export default App;
