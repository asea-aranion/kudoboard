import { useSearchParams } from "react-router-dom";

const BoardPage = () => {
    const [params, setParams] = useSearchParams();
    const boardId = Number(params.get("id"));

    return <h1>Board id: {boardId}</h1>;
};

export default BoardPage;
