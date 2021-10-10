import { store } from "../store";
import { Provider } from "react-redux";
import CalendarPage from "./CalendarPage";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <CalendarPage />
        </Provider>
    );
};

export default App;
