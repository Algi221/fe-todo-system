import type { CreateTaskResponse,DeleteTaskResponse, ListTaskResponse, Task } from "@/types/task";
import http from "@/utils/http";


export const listTaskService = async () : Promise<Task[]> => {
    const {data} = await http.get<ListTaskResponse>("/task");
    return data.data;
}

export const createTaskService = async (task: Partial<Task>) : Promise<boolean> => {
    const {data} = await http.post<CreateTaskResponse>("/task", {
        title: task.title,
        desc: task.desc,
        label: task.label,
    });
    return data.success;
}

export const deleteTaskService = async (id: string) : Promise<boolean> => {
    const {data} = await http.delete<DeleteTaskResponse>(`/task/${id}`);
    return data.success;
}
