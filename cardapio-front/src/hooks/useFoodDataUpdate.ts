import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FoodData } from "../interface/FoodData";

const API_URL = "http://localhost:8080";

const updateData = async (data: FoodData) => {
    return await axios.put(`${API_URL}/food/${data.id}`, data);
};

export function useFoodDataUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateData,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["food-data"],
            });
        },
    });
}