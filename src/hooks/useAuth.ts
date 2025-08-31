export type authBody = {
    username: string;
    password: string;
};

const post = async (apiUrl: string, value: authBody): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_API_URL}${apiUrl}`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        },
    );
}

function useLogin() {
    const handleSubmit = async (value: authBody): Promise<Response> => {
        return post('/api/auth/login', value)
            .then((res) => res)
            .catch((e) => e);
    };

    return { handleSubmit };
}

function useRegister() {
    const handleSubmit = async (value: authBody): Promise<Response> => {
        return post('/api/auth/register', value)
            .then((res) => res)
            .catch((e) => e);
    };

    return { handleSubmit };
}

export { useLogin, useRegister };