import axios from "axios";
import * as React from "react";
import MyLoader from "../components/MyLoader";

export const AuthContext = React.createContext(null);

const AuthContextProvider = (props) => {
    const [userData, setUserData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function getUserData() {
            axios
                .get(
                    `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/user/liff/U16844612535a2bcc9801c6cfa13a24fa`
                )
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setIsLoading(false));
        }

        getUserData();
    }, []);

    if (isLoading) {
        return <MyLoader />;
    }

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
