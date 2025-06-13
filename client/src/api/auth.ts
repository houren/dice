const apiUrl = process.env.REACT_APP_API_URL;
if (!apiUrl) {
  throw new Error("REACT_APP_API_URL is not defined in your environment variables.");
}

export const registerUser = async (
    username: string,
    password: string
): Promise<{ success: boolean; message?: string }> => {
    try{
        const res = await fetch(`${apiUrl}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if(!res.ok){
            let message = "予期せぬエラーが発生しました";
            if(res.status === 409){
                message = "このユーザー名は既に使われています";
            }else if(res.status === 500){
                message = "サーバーエラーが発生しました"
            }
            return {success: false, message};
        }
        return {success: true};
    }catch(err) {
        return { success: false, message: "通信エラーが発生しました" };
    }
};

export const loginUser = async (
    username: string,
    password: string
): Promise<{ success: boolean; token?: string; message?: string }> => {
    try{
        const res = await fetch(`${apiUrl}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if(!res.ok){
            let message = "予期せぬエラーが発生しました";
            if(res.status === 402){
                message = "ユーザーが存在しません";
            }else if(res.status === 403){
                message = "パスワードが間違っています";
            }else if(res.status === 500){
                message = "サーバーエラーが発生しました"
            }
            return {success: false, message};
        }
        const data = await res.json();
        return {success: true, token: data.token};
    }catch(err) {
        return { success: false, message: "通信エラーが発生しました" };
    }
};