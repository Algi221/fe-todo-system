export type Task = {
    id?: string;
    userId?: string;
    title: string;
    desc: string;
    label: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ListTaskResponse = {
    data: Task[];
    success: boolean;
    message: string;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    }
}

export type CreateTaskResponse = {
    data: Task;
    success: boolean;
    message: string;
}

export type DeleteTaskResponse = CreateTaskResponse
