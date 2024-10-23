"use client";

import React from 'react';
import Header from './Header';
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { Trash2 } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip"; // Importar Tooltip

interface Comment {
  id: number;
  user: string;
  text: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  status: "pending" | "in-progress" | "completed";
  comments: Comment[];
}

const TaskApp = () => {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: "Diseñar interfaz de usuario",
      description: "Crear mockups para la nueva función",
      assignee: "María García",
      status: "in-progress",
      comments: [{ id: 1, user: "Juan", text: "Ya tengo los wireframes listos" }]
    }
  ]);

  const [newTask, setNewTask] = React.useState({
    title: "",
    description: ""
  });

  const [newComment, setNewComment] = React.useState("");

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        id: tasks.length + 1,
        ...newTask,
        status: "pending",
        assignee: "Sin asignar",
        comments: []
      }]);
      setNewTask({ title: "", description: "" });
    }
  };

  const handleAddComment = (taskId: number) => {
    if (newComment.trim()) {
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            comments: [...task.comments, {
              id: task.comments.length + 1,
              user: "Usuario",
              text: newComment
            }]
          };
        }
        return task;
      }));
      setNewComment("");
    }
  };

  const handleStatusChange = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const getStatusConfig = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return { color: 'success' as const, text: 'Completado' };
      case 'in-progress':
        return { color: 'warning' as const, text: 'En Progreso' };
      default:
        return { color: 'primary' as const, text: 'Pendiente' };
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Header /> {/* Agregar el Header aquí */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>

        {/* Formulario para nueva tarea */}
        <Card className="mb-4">
          <CardBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Título de la tarea"
                placeholder="Ingresa el título"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Input
                label="Descripción"
                placeholder="Describe la tarea"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <Button 
                color="primary"
                onClick={handleAddTask}
              >
                Agregar Tarea
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Lista de tareas */}
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="w-full">
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <Badge 
                      color={getStatusConfig(task.status).color}
                      className="cursor-pointer"
                    >
                      {getStatusConfig(task.status).text}
                    </Badge>
                    {/* Dropdown para cambiar el estado */}
                    <Tooltip content="Cambiar estado de la tarea">
                      <select 
                        value={task.status} 
                        onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                        className="border rounded p-1"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="in-progress">En Progreso</option>
                        <option value="completed">Completado</option>
                      </select>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src="https://i.pravatar.cc/150"
                      name={task.assignee}
                    />
                    <Tooltip content="Eliminar tarea">
                      <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        onClick={() => handleDeleteTask(task.id)}
                        className="min-w-unit-8 w-unit-8 h-unit-8 ml-2" // Añadido margen izquierdo
                      >
                        <Trash2 size={20} />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{task.description}</p>
                
                {/* Sección de comentarios */}
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-2">Comentarios</h4>
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2 mb-2">
                      <Avatar
                        name={comment.user}
                        size="sm"
                      />
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <p className="text-sm font-medium mb-1">{comment.user}</p>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-2">
                    <Input
                      placeholder="Agregar un comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      endContent={
                        <Button 
                          size="sm" 
                          color="primary"
                          onClick={() => handleAddComment(task.id)}
                        >
                          Enviar
                        </Button>
                      }
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default TaskApp;
