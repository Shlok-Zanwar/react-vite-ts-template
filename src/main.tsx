import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Reducers/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { APP_BASE_URL, APP_TOKEN_KEY, antdThemeconfig } from "./constants.ts";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = APP_BASE_URL;
axios.defaults.headers.common["Authorization"] = localStorage.getItem(APP_TOKEN_KEY);

// errorComposer will compose a handleGlobally function
const errorComposer = (error: any, prefixMessage: string) => {
  const statusCode = error.response ? error.response.status : null;
  const m = error.response ? error.response.data.detail : null;
  const errorMessage = m ? m : error.message;
  let message = "";

  if (!statusCode) {
    message = prefixMessage + " : Network Error";
    return;
  } else if (errorMessage) {
    message = prefixMessage + " : " + errorMessage;
  } else if (statusCode === 404) {
    message = prefixMessage + " : Not Found";
  }

  if (statusCode === 401) {
    message = prefixMessage + " : Unauthorized";
    localStorage.removeItem(APP_TOKEN_KEY);
    window.location.href = `/login?next=${window.location.href}`;
  }

  console.log(message);
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

// apiName comes as a when handling error globally
axios.interceptors.response.use(undefined, (error) => {
  console.log("shlok", error);
  error.handleGlobally = (prefixMessage: string) => {
    errorComposer(error, prefixMessage);
  };

  return Promise.reject(error);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider theme={antdThemeconfig}>
        <ToastContainer />
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
  // {/* </React.StrictMode> */}
);
