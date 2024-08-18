import logo from './logo.svg';
import './App.css';
import NetworkGraph from './components/NetworkGraph';
import eth from "./assets/eth-logo.svg"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/Navbar';
import CrossChainActivity from './components/CrossChainActivity';

function App() {
  return (
    <div style={{background: '#000'}}>
      {/* <Navbar/> */}
      <CrossChainActivity/>
     <NetworkGraph/>
    </div>
  );
}

export default App;
