import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8080";

const deleteData = async (id: number) => {
    return await axios.delete(`${API_URL}/food/${id}`);
};

export function useFoodDataDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["food-data"],
            });
        },
    });
}