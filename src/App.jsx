import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Column from './components/Column';

const COLUMNS = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'Work in Progress' },
  { id: 'DONE', title: 'Completed' },
];

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Brainstorm Features',
    description: 'Identify key features to include in the project.',
    status: 'TODO',
  },
  {
    id: '2',
    title: 'Design Wireframes',
    description: 'Sketch out basic layouts for the application.',
    status: 'TODO',
  },
  {
    id: '3',
    title: 'Develop Core Components',
    description: 'Build and test the main components of the app.',
    status: 'IN_PROGRESS',
  },
  {
    id: '4',
    title: 'Deploy Application',
    description: 'Set up hosting and deploy the final build.',
    status: 'DONE',
  },
];

const App = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !active) return;

    const sourceColumn = active.id; //1
    const targetColumn = over.id; //inpregress

    if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) return;

    setTasks((prevTask) =>
      prevTask.map((task) =>
        active.id === task.id ? { ...task, status: targetColumn } : task
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-4 bg-teal-950">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default App;
