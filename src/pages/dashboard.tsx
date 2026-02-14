import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  listTaskService,
  createTaskService,
  deleteTaskService,
} from "@/services/task";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Dashboard() {
  const [isDialogForeOpen, setIsDialogForOpen] = useState<boolean>(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);

  const [currentTaskId, setCurrentTaskId] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getListTask = async () => {
    listTaskService(currentPage, 12).then((data) => {
      setTasks(data.data);
    });
  };

  useEffect(() => {
    getListTask();
  }, [currentPage]);

  const createTask = () => {
    createTaskService({
      title: title,
      desc: description,
      label: "Todo",
    }).then((isSuccess) => {
      if (isSuccess) {
        alert("Berhasil");
        getListTask();
      }
    });
  };

  const handleDeleteTask = (id: string) => {
    setCurrentTaskId(id);
    setIsDialogDeleteOpen(true);
  };

  const deleteTask = () => {
    deleteTaskService(currentTaskId).then((isSuccess) => {
      if (isSuccess) {
        alert("Berhasil dihapus");
        getListTask();
        setIsDialogDeleteOpen(false);
      }
    });
  };

  const renderPageNumber = () => {
    const pageNumberComponent = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumberComponent.push(
        <PaginationItem key={i} onClick={() => setCurrentPage(i + 1)}>
          <PaginationLink className="cursor-pointer">{i + 1}</PaginationLink>
        </PaginationItem>,
      );
    }
    return pageNumberComponent;
  };

  return (
    <SidebarProvider
      style={
        {
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card className="@container/card m-16">
                  <CardHeader className="border-b flex flex-row">
                    <div>
                      <CardTitle>Task list</CardTitle>
                      <CardDescription>Your current tasks list</CardDescription>
                    </div>
                    <Button
                      className="ml-auto my-auto bg-black text-white"
                      onClick={() => setIsDialogForOpen(true)}
                    >
                      Add Task
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3">
                      {tasks.map((task) => (
                        <li key={task.id} className="flex items-start gap-3">
                          <Checkbox className="my-auto" />
                          <button
                            className={cn("text-left flex-1 space-y-0.5")}
                          >
                            <h1 className={cn("font-medium ")}>{task.title}</h1>
                            <p className={cn("text-muted-foreground text-sm")}>
                              {task.desc}
                            </p>
                          </button>
                          <Button
                            variant="ghost"
                            className="text-red-600"
                            onClick={() => handleDeleteTask(task.id!)}
                          >
                            <Trash2 />
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious />
                        </PaginationItem>

                        {renderPageNumber()}

                        <PaginationItem>
                          <PaginationNext />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isDialogForeOpen} onOpenChange={setIsDialogForOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle> New Task </DialogTitle>
              <DialogDescription>
                fill in the details for the new task.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label> Title </Label>
                <Input
                  onChange={(event) => setTitle(event.currentTarget.value)}
                />
              </Field>
              <Field>
                <Label> Description </Label>
                <Textarea
                  onChange={(event) =>
                    setDescription(event.currentTarget.value)
                  }
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline"> Close </Button>
              </DialogClose>
              <Button onClick={createTask}> Save Changes </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={isDialogDeleteOpen}
          onOpenChange={setIsDialogDeleteOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteTask}>
                Yes, Delete it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
