<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskCollection;
use App\Services\TaskService;
use App\Http\Resources\TaskResource;


class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index()
    {
        $tasks = $this->taskService->getAllTasks();
        return new TaskCollection($tasks);
    }

    public function store(TaskRequest $request)
    {
        $task = $this->taskService->createTask($request->all());
        return new TaskResource($task);
    }

    public function show($id)
    {
        $task = $this->taskService->getTaskById($id);
        return new TaskResource($task);
    }

    public function update(TaskRequest $request, $id)
    {
        $task = $this->taskService->updateTask($id, $request->all());
        return new TaskResource($task);
    }

    public function destroy($id)
    {
        $this->taskService->deleteTask($id);
        return response()->json(null, 204);
    }
}
