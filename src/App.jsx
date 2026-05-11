import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SecretsVault from "./pages/Vault.jsx";
import ChangeSettings from "./pages/Settings.jsx";
import TotpChallenge from "./pages/TotpChallenge.jsx";
import SSLChecker from "./components/SSLChecker.jsx";
import Base64EncoderDecoder from "./components/Base64EncDec.jsx";
import JWTDecode from "./components/JWTDecode.jsx";
import GenerateHash from "./components/HashGenerator.jsx";
import SecurityTools from "./pages/SecurityTools.jsx";
import HashChecker from "./components/HashChecker.jsx";
import DNSLookup from "./components/DNSLookup.jsx";
import HTTPHeadersCheck from "./components/HTTPChecker.jsx";
import IPRepChecker from "./components/IPRepChecker.jsx";
import CVESearch from "./components/CVESearch.jsx";
import CatchAll from "./components/CatchAll.jsx";

import { AuthProvider } from "./services/AuthContext.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx"
import NewsPage from "./pages/NewsPage.jsx";

function App()
{
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />   
          <Route path="/vault" element={
            <ProtectedRoute>
              <SecretsVault />
            </ProtectedRoute>
            } />
          <Route path="/security-tools" element={<SecurityTools />}/>
          <Route path="/settings" element={
            <ChangeSettings />} />
          <Route path="/totp-challenge" element={<TotpChallenge />} />
          <Route path="/ssl-checker" element={<SSLChecker />}/>
          <Route path="/encoder-decoder" element={<Base64EncoderDecoder />}/>
          <Route path="/jwt-decoder" element={<JWTDecode />}/>
          <Route path="/generate-hash" element={<GenerateHash />}/>
          <Route path="/hash-checker" element={<HashChecker />}/>
          <Route path="/dns-lookup" element={<DNSLookup />}/>
          <Route path="/headers" element={<HTTPHeadersCheck />}/>
          <Route path="/ip-reputation" element={<IPRepChecker />}/>
          <Route path="/cve-checker" element={<CVESearch />}/>
          <Route path="/news" element={<NewsPage />} />
          <Route path="/*" element={<CatchAll />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;